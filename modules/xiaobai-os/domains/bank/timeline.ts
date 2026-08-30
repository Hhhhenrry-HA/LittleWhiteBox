import { EMPTY_STORY_PREFIX_HASH } from '../../types.js';
import { validateBankAction, validateBankDomain, validateBankState } from './invariants.js';
import {
    BANK_SCHEMA_VERSION,
    throwBankError,
    type BankAction,
    type BankActivityRecord,
    type BankAppendEventInput,
    type BankCasToken,
    type BankChange,
    type BankCommandResult,
    type BankDomainV1,
    type BankEvent,
    type BankRestoreImpact,
    type BankState,
} from './types.js';

const HASH_PATTERN = /^sha256:[0-9a-f]{64}$/;
const MAX_DATE_MS = 8_640_000_000_000_000;

interface StoryPrefixLookup {
    readonly prefixHashes: readonly string[];
}

export function createEmptyBankDomain(): BankDomainV1 {
    return { schemaVersion: BANK_SCHEMA_VERSION, events: [] };
}

export function createEmptyBankState(): BankState {
    return { openDeposits: [], openInvestments: [] };
}

function applyChange(state: BankState, change: BankChange): void {
    if (change.kind === 'deposit-opened') {
        state.openDeposits.push(structuredClone(change.position));
    } else if (change.kind === 'fund-opened') {
        state.openInvestments.push(structuredClone(change.position));
    } else if (change.kind === 'positions-closed') {
        state.openDeposits = state.openDeposits.filter((position) => !change.positionIds.includes(position.id));
        state.openInvestments = state.openInvestments.filter((position) => !change.positionIds.includes(position.id));
    }
}

/** Rebuilds current private state without retaining references to persisted events. */
export function replayBankEvents(domain: BankDomainV1): BankState {
    validateBankDomain(domain);
    const state = createEmptyBankState();
    for (const event of domain.events) {
        for (const change of event.result.changes) {applyChange(state, change);}
    }
    return state;
}

export const replayBankState = replayBankEvents;

/** Flattens embedded facts in chronological order and inherits their event boundary. */
export function flattenBankActivities(domain: BankDomainV1): BankActivityRecord[] {
    validateBankDomain(domain);
    return domain.events.flatMap((event) => event.result.activities.map((activity) => ({
        ...structuredClone(activity),
        revision: event.revision,
        eventId: event.eventId,
        actionId: event.actionId,
        anchor: structuredClone(event.anchor),
        assistantTurn: event.assistantTurn,
        createdAt: event.createdAt,
    })));
}

export function getBankCasToken(domain: BankDomainV1): BankCasToken {
    validateBankDomain(domain);
    return {
        expectedRevision: domain.events.length,
        expectedEventId: domain.events.at(-1)?.eventId ?? '',
    };
}

function canonicalJson(value: unknown): string {
    return JSON.stringify(value, (_key, entry) => {
        if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {return entry;}
        return Object.fromEntries(Object.entries(entry as Record<string, unknown>).sort(([left], [right]) => (
            left.localeCompare(right)
        )));
    });
}

function sameAction(left: BankAction, right: BankAction): boolean {
    return canonicalJson(left) === canonicalJson(right);
}

function requireCasToken(input: BankCasToken): void {
    if (!Number.isSafeInteger(input.expectedRevision) || input.expectedRevision < 0
        || typeof input.expectedEventId !== 'string'
        || input.expectedEventId !== input.expectedEventId.trim()
        || Array.from(input.expectedEventId).length > 200
        || (input.expectedRevision === 0) !== (input.expectedEventId === '')) {
        throwBankError('bank_invalid_context', 'cas');
    }
}

function requireAppendContext(input: BankAppendEventInput): void {
    if (typeof input.actionId !== 'string' || !input.actionId || input.actionId !== input.actionId.trim()
        || Array.from(input.actionId).length > 200
        || /[\u0000-\u001f\u007f-\u009f]/u.test(input.actionId)) {
        throwBankError('bank_action_required');
    }
    if (!input.anchor || !Number.isSafeInteger(input.anchor.floor) || input.anchor.floor < -1
        || !HASH_PATTERN.test(input.anchor.prefixHash || '')
        || (input.anchor.floor === -1 && input.anchor.prefixHash !== EMPTY_STORY_PREFIX_HASH)
        || !Number.isSafeInteger(input.assistantTurn) || input.assistantTurn < 0
        || !Number.isSafeInteger(input.createdAt) || input.createdAt < 0 || input.createdAt > MAX_DATE_MS) {
        throwBankError('bank_invalid_context', 'event');
    }
}

function assertCas(domain: BankDomainV1, input: BankCasToken): void {
    if (input.expectedRevision !== domain.events.length) {throwBankError('bank_revision_conflict');}
    if (input.expectedEventId !== (domain.events.at(-1)?.eventId ?? '')) {
        throwBankError('bank_event_id_conflict');
    }
}

/**
 * Appends one complete event. Existing actionIds replay before CAS and compare
 * only the canonical command, because the stored result is authoritative.
 */
export function appendBankEvent(domain: BankDomainV1, input: BankAppendEventInput): BankCommandResult {
    validateBankDomain(domain);
    requireCasToken(input);
    requireAppendContext(input);
    const command = validateBankAction(input.command);
    const existing = domain.events.find((event) => event.actionId === input.actionId);
    if (existing) {
        if (!sameAction(existing.command, command)) {throwBankError('bank_action_conflict');}
        const current = structuredClone(domain);
        return {
            domain: current,
            event: structuredClone(existing),
            state: replayBankEvents(current),
            created: false,
        };
    }
    assertCas(domain, input);
    const event: BankEvent = {
        revision: domain.events.length + 1,
        eventId: input.eventId,
        actionId: input.actionId,
        command,
        result: structuredClone(input.result),
        anchor: structuredClone(input.anchor),
        assistantTurn: input.assistantTurn,
        createdAt: input.createdAt,
    };
    const next: BankDomainV1 = {
        schemaVersion: BANK_SCHEMA_VERSION,
        events: [...structuredClone(domain.events), event],
    };
    validateBankDomain(next);
    return {
        domain: next,
        event: structuredClone(event),
        state: replayBankEvents(next),
        created: true,
    };
}

export function calculateBankLockedAmount(state: BankState): number {
    validateBankState(state);
    const locked = [...state.openDeposits, ...state.openInvestments]
        .reduce((total, position) => total + position.principal, 0);
    if (!Number.isSafeInteger(locked) || locked < 0) {throwBankError('bank_invalid_domain', 'locked-amount');}
    return locked;
}

function isAnchorValid(event: BankEvent, fingerprint: StoryPrefixLookup): boolean {
    if (event.anchor.floor === -1) {return event.anchor.prefixHash === EMPTY_STORY_PREFIX_HASH;}
    return fingerprint.prefixHashes[event.anchor.floor] === event.anchor.prefixHash;
}

function collectAffectedPositionIds(events: readonly BankEvent[]): string[] {
    const positions = new Set<string>();
    for (const event of events) {
        const command = event.command;
        command.settledPositionIds.forEach((id) => positions.add(id));
        if ('positionId' in command) {positions.add(command.positionId);}
        for (const change of event.result.changes) {
            if (change.kind === 'deposit-opened' || change.kind === 'fund-opened') {positions.add(change.position.id);}
            if (change.kind === 'positions-closed') {change.positionIds.forEach((id) => positions.add(id));}
        }
        event.result.activities.forEach((activity) => positions.add(activity.sourceId));
    }
    return [...positions];
}

/** Cuts the complete suffix from the first event whose story prefix no longer exists. */
export function reconcileBankWithStory(
    domain: BankDomainV1,
    fingerprint: StoryPrefixLookup,
): { domain: BankDomainV1; impact: BankRestoreImpact } {
    validateBankDomain(domain);
    const previousLockedAmount = calculateBankLockedAmount(replayBankEvents(domain));
    const firstInvalidIndex = domain.events.findIndex((event) => !isAnchorValid(event, fingerprint));
    if (firstInvalidIndex < 0) {
        return {
            domain: structuredClone(domain),
            impact: {
                changed: false,
                firstInvalidRevision: null,
                removedEventIds: [],
                removedActionIds: [],
                removedActivityIds: [],
                affectedPositionIds: [],
                previousLockedAmount,
                nextLockedAmount: previousLockedAmount,
                lockedAmountChange: 0,
            },
        };
    }
    const removed = domain.events.slice(firstInvalidIndex);
    const next: BankDomainV1 = {
        schemaVersion: BANK_SCHEMA_VERSION,
        events: structuredClone(domain.events.slice(0, firstInvalidIndex)),
    };
    validateBankDomain(next);
    const nextLockedAmount = calculateBankLockedAmount(replayBankEvents(next));
    const affectedPositionIds = collectAffectedPositionIds(removed);
    return {
        domain: next,
        impact: {
            changed: true,
            firstInvalidRevision: removed[0]?.revision ?? null,
            removedEventIds: removed.map((event) => event.eventId),
            removedActionIds: removed.map((event) => event.actionId),
            removedActivityIds: removed.flatMap((event) => event.result.activities.map((activity) => activity.id)),
            affectedPositionIds,
            previousLockedAmount,
            nextLockedAmount,
            lockedAmountChange: nextLockedAmount - previousLockedAmount,
        },
    };
}
