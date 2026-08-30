import { EMPTY_STORY_PREFIX_HASH } from '../../types.js';
import { getShopItem } from './catalog.js';
import {
    SHOP_SCHEMA_VERSION,
    ShopError,
    type ShopAction,
    type ShopActivation,
    type ShopCatalogItem,
    type ShopDomainV1,
    type ShopEvent,
} from './types.js';

const HASH_PATTERN = /^sha256:[0-9a-f]{64}$/;
const MAX_DATE_MS = 8_640_000_000_000_000;

function isRecord(value: unknown): value is Record<string, unknown> {
    return !!value && typeof value === 'object' && !Array.isArray(value);
}

function requireExactKeys(value: Record<string, unknown>, keys: readonly string[], field: string): void {
    const actual = Object.keys(value).sort();
    const expected = [...keys].sort();
    if (actual.length !== expected.length || actual.some((key, index) => key !== expected[index])) {
        throw new ShopError('shop_invalid_domain', `${field} has unexpected or missing fields`);
    }
}

function requireCanonicalId(value: unknown, field: string, maxLength: number): string {
    if (
        typeof value !== 'string'
        || !value
        || value !== value.trim()
        || Array.from(value).length > maxLength
    ) {
        throw new ShopError('shop_invalid_domain', `${field} must be a canonical non-empty string`);
    }
    return value;
}

function normalizeText(value: unknown, maxLength: number): string {
    const normalized = String(value ?? '')
        .normalize('NFKC')
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, ' ')
        .replace(/\s+/gu, ' ')
        .trim();
    return Array.from(normalized).slice(0, maxLength).join('');
}

/** Reduces untrusted values to the declared catalog fields and canonical text. */
export function normalizeShopParameters(
    item: Readonly<ShopCatalogItem>,
    rawParameters: Record<string, unknown> = {},
): Record<string, string> {
    const source = isRecord(rawParameters) ? rawParameters : {};
    const parameters: Record<string, string> = {};
    for (const definition of item.inputs) {
        const value = normalizeText(source[definition.key], definition.maxLength);
        if (definition.required && !value) {
            throw new ShopError(
                'shop_parameters_invalid',
                `required parameter is missing: ${item.id}.${definition.key}`,
            );
        }
        if (value) {parameters[definition.key] = value;}
    }
    return parameters;
}

export function shopActivationKey(
    item: Readonly<ShopCatalogItem>,
    parameters: Record<string, string>,
): string {
    return `${item.id}:${JSON.stringify(item.inputs.map((definition) => [
        definition.key,
        parameters[definition.key] || '',
    ]))}`;
}

function parametersAreCanonical(item: Readonly<ShopCatalogItem>, value: unknown): value is Record<string, string> {
    if (!isRecord(value) || Object.values(value).some((entry) => typeof entry !== 'string')) {return false;}
    try {
        const normalized = normalizeShopParameters(item, value);
        const keys = Object.keys(value).sort();
        const normalizedKeys = Object.keys(normalized).sort();
        return keys.length === normalizedKeys.length
            && keys.every((key, index) => key === normalizedKeys[index] && value[key] === normalized[key]);
    } catch {
        return false;
    }
}

function validateAction(value: unknown): ShopAction {
    if (!isRecord(value)) {throw new ShopError('shop_invalid_domain', 'event action must be an object');}
    const kind = value.kind;
    if (kind === 'purchase') {
        requireExactKeys(value, ['kind', 'itemId'], 'purchase action');
        const itemId = requireCanonicalId(value.itemId, 'action.itemId', 80);
        const item = getShopItem(itemId);
        return { kind, itemId: item.id };
    }
    if (kind === 'activate') {
        requireExactKeys(value, ['kind', 'itemId', 'activationId', 'parameters'], 'activate action');
        const itemId = requireCanonicalId(value.itemId, 'action.itemId', 80);
        const item = getShopItem(itemId);
        const activationId = requireCanonicalId(value.activationId, 'action.activationId', 200);
        if (!parametersAreCanonical(item, value.parameters)) {
            throw new ShopError('shop_invalid_domain', `activation parameters are not canonical: ${itemId}`);
        }
        return { kind, itemId: item.id, activationId, parameters: value.parameters };
    }
    if (kind === 'deactivate') {
        requireExactKeys(value, ['kind', 'itemId', 'activationId'], 'deactivate action');
        const itemId = requireCanonicalId(value.itemId, 'action.itemId', 80);
        const item = getShopItem(itemId);
        return {
            kind,
            itemId: item.id,
            activationId: requireCanonicalId(value.activationId, 'action.activationId', 200),
        };
    }
    throw new ShopError('shop_invalid_domain', 'event action kind is invalid');
}

function validateEventShape(value: unknown, expectedRevision: number): ShopEvent {
    if (!isRecord(value)) {throw new ShopError('shop_invalid_domain', 'shop event must be an object');}
    requireExactKeys(
        value,
        ['revision', 'eventId', 'actionId', 'action', 'anchor', 'assistantTurn', 'createdAt'],
        'shop event',
    );
    if (!Number.isSafeInteger(value.revision) || value.revision !== expectedRevision) {
        throw new ShopError('shop_invalid_domain', 'event revisions must be contiguous from 1');
    }
    if (!isRecord(value.anchor)) {throw new ShopError('shop_invalid_domain', 'event anchor must be an object');}
    requireExactKeys(value.anchor, ['floor', 'prefixHash'], 'event anchor');
    if (!Number.isSafeInteger(value.anchor.floor) || Number(value.anchor.floor) < -1) {
        throw new ShopError('shop_invalid_domain', 'story anchor floor is invalid');
    }
    if (typeof value.anchor.prefixHash !== 'string' || !HASH_PATTERN.test(value.anchor.prefixHash)) {
        throw new ShopError('shop_invalid_domain', 'story anchor hash is invalid');
    }
    if (value.anchor.floor === -1 && value.anchor.prefixHash !== EMPTY_STORY_PREFIX_HASH) {
        throw new ShopError('shop_invalid_domain', 'empty-story anchor hash is invalid');
    }
    if (!Number.isSafeInteger(value.assistantTurn) || Number(value.assistantTurn) < 0) {
        throw new ShopError('shop_invalid_domain', 'assistantTurn must be a non-negative safe integer');
    }
    if (
        !Number.isSafeInteger(value.createdAt)
        || Number(value.createdAt) < 0
        || Number(value.createdAt) > MAX_DATE_MS
    ) {
        throw new ShopError('shop_invalid_domain', 'createdAt must be a valid non-negative integer timestamp');
    }
    return {
        revision: Number(value.revision),
        eventId: requireCanonicalId(value.eventId, 'event.eventId', 200),
        actionId: requireCanonicalId(value.actionId, 'event.actionId', 200),
        action: validateAction(value.action),
        anchor: {
            floor: Number(value.anchor.floor),
            prefixHash: value.anchor.prefixHash,
        },
        assistantTurn: Number(value.assistantTurn),
        createdAt: Number(value.createdAt),
    };
}

function isActiveAt(activation: ShopActivation, item: Readonly<ShopCatalogItem>, targetAssistantTurn: number): boolean {
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

/** Validates both serialized shape and every invariant implied by event replay. */
export function validateShopDomain(value: unknown): asserts value is ShopDomainV1 {
    if (!isRecord(value)) {throw new ShopError('shop_invalid_domain', 'shop domain must be an object');}
    if (value.schemaVersion !== SHOP_SCHEMA_VERSION) {
        throw new ShopError('shop_unsupported_version', 'unsupported shop schema version');
    }
    requireExactKeys(value, ['schemaVersion', 'events'], 'shop domain');
    if (!Array.isArray(value.events)) {throw new ShopError('shop_invalid_domain', 'shop events must be an array');}

    const eventIds = new Set<string>();
    const actionIds = new Set<string>();
    const activationIds = new Set<string>();
    const quantities = new Map<string, number>();
    const purchaseCounts = new Map<string, number>();
    const activations = new Map<string, ShopActivation>();
    let previousAnchorFloor = -1;
    let previousAssistantTurn = 0;

    for (let index = 0; index < value.events.length; index += 1) {
        const event = validateEventShape(value.events[index], index + 1);
        if (eventIds.has(event.eventId) || actionIds.has(event.actionId)) {
            throw new ShopError('shop_invalid_domain', 'eventId and actionId must be unique');
        }
        eventIds.add(event.eventId);
        actionIds.add(event.actionId);
        if (event.anchor.floor < previousAnchorFloor || event.assistantTurn < previousAssistantTurn) {
            throw new ShopError('shop_invalid_domain', 'shop event timeline cannot move backward');
        }
        previousAnchorFloor = event.anchor.floor;
        previousAssistantTurn = event.assistantTurn;

        const action = event.action;
        const item = getShopItem(action.itemId);
        if (action.kind === 'purchase') {
            const purchasedCount = (purchaseCounts.get(item.id) || 0) + 1;
            if (item.purchaseLimit !== undefined && purchasedCount > item.purchaseLimit) {
                throw new ShopError('shop_invalid_domain', `purchase limit exceeded: ${item.id}`);
            }
            purchaseCounts.set(item.id, purchasedCount);
            quantities.set(item.id, (quantities.get(item.id) || 0) + 1);
            continue;
        }
        if (action.kind === 'activate') {
            if (activationIds.has(action.activationId)) {
                throw new ShopError('shop_invalid_domain', `activationId is duplicated: ${action.activationId}`);
            }
            if ((quantities.get(item.id) || 0) < 1) {
                throw new ShopError('shop_invalid_domain', `activation has no inventory: ${item.id}`);
            }
            const targetTurn = event.assistantTurn + 1;
            const activationKey = shopActivationKey(item, action.parameters);
            for (const existing of activations.values()) {
                if (existing.itemId !== item.id || !isActiveAt(existing, item, targetTurn)) {continue;}
                if (item.stacking === 'global-single' || shopActivationKey(item, existing.parameters) === activationKey) {
                    throw new ShopError('shop_invalid_domain', `activation scope overlaps: ${item.id}`);
                }
            }
            activationIds.add(action.activationId);
            quantities.set(item.id, (quantities.get(item.id) || 0) - 1);
            activations.set(action.activationId, {
                activationId: action.activationId,
                itemId: item.id,
                parameters: { ...action.parameters },
                startsAtAssistantTurn: targetTurn,
                activatedByEventId: event.eventId,
                activatedAtRevision: event.revision,
            });
            continue;
        }
        const activation = activations.get(action.activationId);
        if (!activation || activation.itemId !== item.id) {
            throw new ShopError('shop_invalid_domain', `deactivation target is missing: ${action.activationId}`);
        }
        if (item.duration.kind !== 'manual' || activation.deactivatedByEventId) {
            throw new ShopError('shop_invalid_domain', `deactivation target is not an active manual effect: ${action.activationId}`);
        }
        activation.deactivatedByEventId = event.eventId;
        activation.transitionAtAssistantTurn = event.assistantTurn + 1;
    }
}
