import { EMPTY_STORY_PREFIX_HASH } from '../../types.js';
import { getShopItem } from './catalog.js';
import {
    normalizeShopParameters,
    shopActivationKey,
    validateShopDomain,
} from './invariants.js';
import {
    SHOP_SCHEMA_VERSION,
    ShopError,
    type ActivateShopItemInput,
    type DeactivateShopItemInput,
    type PurchaseShopItemInput,
    type ShopAction,
    type ShopActivation,
    type ShopCasToken,
    type ShopCatalogItem,
    type ShopCommandContext,
    type ShopCommandDependencies,
    type ShopCommandResult,
    type ShopDomainV1,
    type ShopEvent,
    type ShopGenerationMode,
    type ShopRollbackImpact,
    type ShopStateProjection,
} from './types.js';

const HASH_PATTERN = /^sha256:[0-9a-f]{64}$/;
const MAX_DATE_MS = 8_640_000_000_000_000;

interface StoryPrefixLookup {
    readonly prefixHashes: readonly string[];
}

interface ShopStoryMessageSnapshot {
    readonly role: 'user' | 'assistant' | 'system';
    readonly name: string;
    readonly text: string;
}

function defaultCreateEventId(): string {
    return globalThis.crypto?.randomUUID
        ? `shop-event-${globalThis.crypto.randomUUID()}`
        : `shop-event-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function normalizeId(value: unknown, code: 'shop_action_required' | 'shop_activation_id_required'): string {
    const id = String(value ?? '').trim();
    if (!id || Array.from(id).length > 200) {throw new ShopError(code);}
    return id;
}

function normalizeContext(input: ShopCommandContext): ShopCommandContext {
    if (
        !Number.isSafeInteger(input.assistantTurn)
        || input.assistantTurn < 0
        || !input.anchor
        || !Number.isSafeInteger(input.anchor.floor)
        || input.anchor.floor < -1
        || !HASH_PATTERN.test(input.anchor.prefixHash || '')
        || (input.anchor.floor === -1 && input.anchor.prefixHash !== EMPTY_STORY_PREFIX_HASH)
    ) {
        throw new ShopError('shop_invalid_context', 'shop command story context is invalid');
    }
    if (
        !Number.isSafeInteger(input.expectedRevision)
        || input.expectedRevision < 0
        || typeof input.expectedEventId !== 'string'
        || (input.expectedRevision === 0) !== (input.expectedEventId === '')
    ) {
        throw new ShopError('shop_invalid_context', 'shop command CAS token is invalid');
    }
    return {
        actionId: normalizeId(input.actionId, 'shop_action_required'),
        anchor: structuredClone(input.anchor),
        assistantTurn: input.assistantTurn,
        expectedRevision: input.expectedRevision,
        expectedEventId: input.expectedEventId,
    };
}

function sameAction(left: ShopAction, right: ShopAction): boolean {
    if (left.kind !== right.kind || left.itemId !== right.itemId) {return false;}
    if (left.kind === 'purchase' || right.kind === 'purchase') {return left.kind === right.kind;}
    if (left.activationId !== right.activationId) {return false;}
    if (left.kind === 'deactivate' || right.kind === 'deactivate') {return left.kind === right.kind;}
    const leftKeys = Object.keys(left.parameters).sort();
    const rightKeys = Object.keys(right.parameters).sort();
    return leftKeys.length === rightKeys.length
        && leftKeys.every((key, index) => key === rightKeys[index] && left.parameters[key] === right.parameters[key]);
}

function replayExisting(
    domain: ShopDomainV1,
    actionId: string,
    action: ShopAction,
): ShopCommandResult | null {
    const existing = domain.events.find((event) => event.actionId === actionId);
    if (!existing) {return null;}
    if (!sameAction(existing.action, action)) {
        throw new ShopError('shop_action_conflict', 'actionId was reused with a different normalized action');
    }
    const current = structuredClone(domain);
    return {
        domain: current,
        event: structuredClone(existing),
        projection: projectShopState(current),
        created: false,
    };
}

function assertCas(domain: ShopDomainV1, context: ShopCommandContext): void {
    const currentRevision = domain.events.length;
    const currentEventId = domain.events.at(-1)?.eventId || '';
    if (context.expectedRevision !== currentRevision) {
        throw new ShopError('shop_revision_conflict', 'shop revision changed');
    }
    if (context.expectedEventId !== currentEventId) {
        throw new ShopError('shop_event_id_conflict', 'shop event head changed');
    }
}

function appendEvent(
    domain: ShopDomainV1,
    context: ShopCommandContext,
    action: ShopAction,
    { now = Date.now, createEventId = defaultCreateEventId }: ShopCommandDependencies,
): ShopCommandResult {
    assertCas(domain, context);
    const previous = domain.events.at(-1);
    if (
        previous
        && (context.anchor.floor < previous.anchor.floor || context.assistantTurn < previous.assistantTurn)
    ) {
        throw new ShopError('shop_invalid_context', 'shop command timeline cannot move backward');
    }
    const eventId = String(createEventId() || '').trim();
    const createdAt = now();
    if (!eventId || Array.from(eventId).length > 200 || domain.events.some((event) => event.eventId === eventId)) {
        throw new ShopError('shop_invalid_context', 'event id is missing, too long or duplicated');
    }
    if (!Number.isSafeInteger(createdAt) || createdAt < 0 || createdAt > MAX_DATE_MS) {
        throw new ShopError('shop_invalid_context', 'event timestamp is invalid');
    }
    const event: ShopEvent = {
        revision: domain.events.length + 1,
        eventId,
        actionId: context.actionId,
        action: structuredClone(action),
        anchor: structuredClone(context.anchor),
        assistantTurn: context.assistantTurn,
        createdAt,
    };
    const next: ShopDomainV1 = {
        schemaVersion: SHOP_SCHEMA_VERSION,
        events: [...structuredClone(domain.events), event],
    };
    validateShopDomain(next);
    return {
        domain: next,
        event: structuredClone(event),
        projection: projectShopState(next),
        created: true,
    };
}

export function createEmptyShopState(): ShopDomainV1 {
    return { schemaVersion: SHOP_SCHEMA_VERSION, events: [] };
}

export function getShopCasToken(domain: ShopDomainV1): ShopCasToken {
    validateShopDomain(domain);
    return {
        expectedRevision: domain.events.length,
        expectedEventId: domain.events.at(-1)?.eventId || '',
    };
}

/** Replays the event chain without persisting a second current-state fact. */
export function projectShopState(domain: ShopDomainV1): ShopStateProjection {
    validateShopDomain(domain);
    const projection: ShopStateProjection = {
        revision: domain.events.length,
        eventId: domain.events.at(-1)?.eventId || '',
        inventory: {},
        activations: [],
    };
    const activationById = new Map<string, ShopActivation>();
    for (const event of domain.events) {
        const action = event.action;
        let inventory = projection.inventory[action.itemId];
        if (!inventory) {
            inventory = { itemId: action.itemId, quantity: 0, purchasedCount: 0 };
            projection.inventory[action.itemId] = inventory;
        }
        if (action.kind === 'purchase') {
            inventory.quantity += 1;
            inventory.purchasedCount += 1;
            continue;
        }
        if (action.kind === 'activate') {
            inventory.quantity -= 1;
            const activation: ShopActivation = {
                activationId: action.activationId,
                itemId: action.itemId,
                parameters: { ...action.parameters },
                startsAtAssistantTurn: event.assistantTurn + 1,
                activatedByEventId: event.eventId,
                activatedAtRevision: event.revision,
            };
            projection.activations.push(activation);
            activationById.set(activation.activationId, activation);
            continue;
        }
        const activation = activationById.get(action.activationId);
        if (!activation) {throw new ShopError('shop_invalid_domain', 'validated deactivation target disappeared');}
        activation.deactivatedByEventId = event.eventId;
        activation.transitionAtAssistantTurn = event.assistantTurn + 1;
    }
    return projection;
}

export function isShopActivationActive(
    activation: ShopActivation,
    item: Readonly<ShopCatalogItem>,
    targetAssistantTurn: number,
): boolean {
    if (!Number.isSafeInteger(targetAssistantTurn) || targetAssistantTurn < 1) {
        throw new ShopError('shop_invalid_context', 'target Assistant turn must be a positive safe integer');
    }
    if (targetAssistantTurn < activation.startsAtAssistantTurn) {return false;}
    if (
        activation.transitionAtAssistantTurn !== undefined
        && targetAssistantTurn >= activation.transitionAtAssistantTurn
    ) {
        return false;
    }
    return item.duration.kind !== 'turns'
        || targetAssistantTurn < activation.startsAtAssistantTurn + item.duration.rounds;
}

export function shopRemainingAssistantTurns(
    activation: ShopActivation,
    item: Readonly<ShopCatalogItem>,
    targetAssistantTurn: number,
): number | null {
    if (item.duration.kind !== 'turns') {return null;}
    if (!isShopActivationActive(activation, item, targetAssistantTurn)) {return 0;}
    return activation.startsAtAssistantTurn + item.duration.rounds - targetAssistantTurn;
}

export function purchaseShopItem(
    domain: ShopDomainV1,
    input: PurchaseShopItemInput,
    dependencies: ShopCommandDependencies = {},
): ShopCommandResult {
    validateShopDomain(domain);
    const item = getShopItem(input.itemId);
    const context = normalizeContext(input);
    const action: ShopAction = { kind: 'purchase', itemId: item.id };
    const replay = replayExisting(domain, context.actionId, action);
    if (replay) {return replay;}
    assertCas(domain, context);
    const purchasedCount = projectShopState(domain).inventory[item.id]?.purchasedCount || 0;
    if (item.purchaseLimit !== undefined && purchasedCount >= item.purchaseLimit) {
        throw new ShopError('shop_purchase_limit_reached', `purchase limit reached: ${item.id}`);
    }
    return appendEvent(domain, context, action, dependencies);
}

export function activateShopItem(
    domain: ShopDomainV1,
    input: ActivateShopItemInput,
    dependencies: ShopCommandDependencies = {},
): ShopCommandResult {
    validateShopDomain(domain);
    const item = getShopItem(input.itemId);
    const context = normalizeContext(input);
    const activationId = normalizeId(input.activationId, 'shop_activation_id_required');
    const parameters = normalizeShopParameters(item, input.parameters);
    const action: ShopAction = { kind: 'activate', itemId: item.id, activationId, parameters };
    const replay = replayExisting(domain, context.actionId, action);
    if (replay) {return replay;}
    assertCas(domain, context);
    const projection = projectShopState(domain);
    if (projection.activations.some((activation) => activation.activationId === activationId)) {
        throw new ShopError('shop_activation_id_conflict', `activationId already exists: ${activationId}`);
    }
    if ((projection.inventory[item.id]?.quantity || 0) < 1) {
        throw new ShopError('shop_quantity_insufficient', `no inventory available: ${item.id}`);
    }
    const targetAssistantTurn = context.assistantTurn + 1;
    const key = shopActivationKey(item, parameters);
    const duplicate = projection.activations.some((activation) => (
        activation.itemId === item.id
        && isShopActivationActive(activation, item, targetAssistantTurn)
        && (item.stacking === 'global-single' || shopActivationKey(item, activation.parameters) === key)
    ));
    if (duplicate) {throw new ShopError('shop_activation_duplicate', `effect is already active: ${item.id}`);}
    return appendEvent(domain, context, action, dependencies);
}

export function deactivateShopItem(
    domain: ShopDomainV1,
    input: DeactivateShopItemInput,
    dependencies: ShopCommandDependencies = {},
): ShopCommandResult {
    validateShopDomain(domain);
    const item = getShopItem(input.itemId);
    const context = normalizeContext(input);
    const activationId = normalizeId(input.activationId, 'shop_activation_id_required');
    const action: ShopAction = { kind: 'deactivate', itemId: item.id, activationId };
    const replay = replayExisting(domain, context.actionId, action);
    if (replay) {return replay;}
    assertCas(domain, context);
    const activation = projectShopState(domain).activations.find((entry) => entry.activationId === activationId);
    if (!activation || activation.itemId !== item.id) {
        throw new ShopError('shop_activation_missing', `activation does not exist for item: ${activationId}`);
    }
    if (item.duration.kind !== 'manual') {
        throw new ShopError('shop_activation_not_manual', `item is not manually closable: ${item.id}`);
    }
    if (activation.deactivatedByEventId) {
        throw new ShopError('shop_activation_not_active', `activation is already closed: ${activationId}`);
    }
    return appendEvent(domain, context, action, dependencies);
}

function isAnchorValid(event: ShopEvent, fingerprint: StoryPrefixLookup): boolean {
    if (event.anchor.floor === -1) {return event.anchor.prefixHash === EMPTY_STORY_PREFIX_HASH;}
    return fingerprint.prefixHashes[event.anchor.floor] === event.anchor.prefixHash;
}

export function reconcileShopWithStory(
    domain: ShopDomainV1,
    fingerprint: StoryPrefixLookup,
): { domain: ShopDomainV1; impact: ShopRollbackImpact } {
    validateShopDomain(domain);
    const firstInvalidIndex = domain.events.findIndex((event) => !isAnchorValid(event, fingerprint));
    if (firstInvalidIndex < 0) {
        return {
            domain: structuredClone(domain),
            impact: {
                changed: false,
                firstInvalidRevision: null,
                removedEventIds: [],
                removedActionIds: [],
            },
        };
    }
    const removed = domain.events.slice(firstInvalidIndex);
    const next: ShopDomainV1 = {
        schemaVersion: SHOP_SCHEMA_VERSION,
        events: structuredClone(domain.events.slice(0, firstInvalidIndex)),
    };
    validateShopDomain(next);
    return {
        domain: next,
        impact: {
            changed: true,
            firstInvalidRevision: removed[0]?.revision ?? null,
            removedEventIds: removed.map((event) => event.eventId),
            removedActionIds: removed.map((event) => event.actionId),
        },
    };
}

function assistantTurnCount(messages: readonly ShopStoryMessageSnapshot[]): number {
    return messages.reduce((count, message) => count + Number(message.role === 'assistant'), 0);
}

/** Resolves the request's virtual story prefix and target Assistant reply number. */
export function resolveShopGenerationTimeline(
    messages: readonly ShopStoryMessageSnapshot[],
    mode: ShopGenerationMode,
): { storyPrefix: ShopStoryMessageSnapshot[]; targetAssistantTurn: number } {
    const story = messages.map((message) => ({ ...message }));
    if (mode === 'normal') {
        return { storyPrefix: story, targetAssistantTurn: assistantTurnCount(story) + 1 };
    }
    let lastAssistantIndex = -1;
    for (let index = story.length - 1; index >= 0; index -= 1) {
        if (story[index].role === 'assistant') {
            lastAssistantIndex = index;
            break;
        }
    }
    if (lastAssistantIndex < 0) {
        throw new ShopError('shop_invalid_generation_timeline', `${mode} requires a target Assistant reply`);
    }
    if (mode === 'continue') {
        return { storyPrefix: story, targetAssistantTurn: assistantTurnCount(story) };
    }
    if (mode !== 'regenerate' && mode !== 'swipe') {
        throw new ShopError('shop_invalid_generation_timeline', `unknown Shop generation mode: ${String(mode)}`);
    }
    const storyPrefix = story.slice(0, lastAssistantIndex);
    return {
        storyPrefix,
        targetAssistantTurn: assistantTurnCount(storyPrefix) + 1,
    };
}
