import { validateLedger } from './invariants.js';
import {
    ECONOMY_SCHEMA_VERSION,
    EconomyError,
    type EconomyLedgerV2,
    type EconomyTransaction,
} from './types.js';

const LEGACY_ECONOMY_SCHEMA_VERSION = 1 as const;
const LEGACY_EMPTY_STORY_PREFIX_HASH =
    'sha256:7d0895b5e4a7170fe97ae325c8d441725fd5973b733dc8938469f794c01feee3';
const LEGACY_HASH_PATTERN = /^sha256:[0-9a-f]{64}$/;
const LEGACY_TRANSACTION_KEYS = [
    'id',
    'sequence',
    'idempotencyKey',
    'actionId',
    'fromAccountId',
    'toAccountId',
    'amount',
    'kind',
    'title',
    'note',
    'sourceDomain',
    'sourceId',
    'anchor',
    'createdAt',
] as const;

interface LegacyStoryAnchorV1 {
    floor: number;
    prefixHash: string;
}

interface LegacyEconomyTransactionV1 {
    id: string;
    sequence: number;
    idempotencyKey: string;
    actionId: string;
    fromAccountId: string;
    toAccountId: string;
    amount: number;
    kind: string;
    title: string;
    note: string;
    sourceDomain: string;
    sourceId: string;
    anchor: LegacyStoryAnchorV1;
    createdAt: number;
    reversalOfTransactionId?: string;
}

function exactRecord(value: unknown, keys: readonly string[], field: string): Record<string, unknown> {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        throw new EconomyError('economy_invalid_legacy_data', `${field} must be an object`);
    }
    const prototype = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) {
        throw new EconomyError('economy_invalid_legacy_data', `${field} must be a plain object`);
    }
    const actual = Object.keys(value).sort();
    const expected = [...keys].sort();
    if (actual.length !== expected.length || actual.some((key, index) => key !== expected[index])) {
        throw new EconomyError('economy_invalid_legacy_data', `${field} has non-canonical fields`);
    }
    return value as Record<string, unknown>;
}

function readLegacyAnchor(value: unknown, field: string): LegacyStoryAnchorV1 {
    const anchor = exactRecord(value, ['floor', 'prefixHash'], field);
    if (!Number.isInteger(anchor.floor) || Number(anchor.floor) < -1) {
        throw new EconomyError('economy_invalid_legacy_data', `${field}.floor must be an integer at least -1`);
    }
    if (typeof anchor.prefixHash !== 'string' || !LEGACY_HASH_PATTERN.test(anchor.prefixHash)) {
        throw new EconomyError('economy_invalid_legacy_data', `${field}.prefixHash must be a SHA-256 hash`);
    }
    return { floor: Number(anchor.floor), prefixHash: anchor.prefixHash };
}

function assertLegacyAnchorSequence(transactions: readonly LegacyEconomyTransactionV1[]): void {
    const opening = transactions[0];
    if (
        opening.anchor.floor !== -1
        || opening.anchor.prefixHash !== LEGACY_EMPTY_STORY_PREFIX_HASH
    ) {
        throw new EconomyError(
            'economy_invalid_legacy_data',
            'legacy economy opening grant must use the empty story anchor',
        );
    }
    for (let index = 1; index < transactions.length; index += 1) {
        const previous = transactions[index - 1];
        const transaction = transactions[index];
        if (previous.actionId === transaction.actionId) {
            if (
                previous.anchor.floor !== transaction.anchor.floor
                || previous.anchor.prefixHash !== transaction.anchor.prefixHash
            ) {
                throw new EconomyError(
                    'economy_invalid_legacy_data',
                    'legacy transactions for one action must share a story anchor',
                );
            }
        } else if (transaction.anchor.floor < previous.anchor.floor) {
            throw new EconomyError(
                'economy_invalid_legacy_data',
                'legacy economy action anchors cannot move backward',
            );
        }
    }
}

/**
 * Converts the one real pre-V2 Economy format. Current V2 data returns null;
 * malformed V1 data is rejected instead of being cleaned permissively.
 */
export function upgradeEconomyLedger(value: unknown): EconomyLedgerV2 | null {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {return null;}
    const schemaVersion = (value as Record<string, unknown>).schemaVersion;
    if (schemaVersion === ECONOMY_SCHEMA_VERSION) {return null;}
    if (schemaVersion !== LEGACY_ECONOMY_SCHEMA_VERSION) {return null;}

    const ledger = exactRecord(value, ['schemaVersion', 'transactions'], 'legacy economy ledger');
    if (!Array.isArray(ledger.transactions) || ledger.transactions.length === 0) {
        throw new EconomyError(
            'economy_invalid_legacy_data',
            'legacy economy ledger must contain the opening grant',
        );
    }

    const legacyTransactions: LegacyEconomyTransactionV1[] = [];
    const transactions: EconomyTransaction[] = [];
    ledger.transactions.forEach((value, index) => {
        const hasReversal = !!value
            && typeof value === 'object'
            && !Array.isArray(value)
            && Object.hasOwn(value, 'reversalOfTransactionId');
        const record = exactRecord(
            value,
            hasReversal
                ? [...LEGACY_TRANSACTION_KEYS, 'reversalOfTransactionId']
                : LEGACY_TRANSACTION_KEYS,
            `legacy economy transaction ${index + 1}`,
        );
        const anchor = readLegacyAnchor(record.anchor, `legacy economy transaction ${index + 1}.anchor`);
        const { anchor: _legacyAnchor, ...currentFields } = record;
        const current = currentFields as unknown as EconomyTransaction;
        legacyTransactions.push({ ...current, anchor });
        transactions.push(current);
    });

    assertLegacyAnchorSequence(legacyTransactions);
    const upgraded: EconomyLedgerV2 = {
        schemaVersion: ECONOMY_SCHEMA_VERSION,
        transactions,
    };
    validateLedger(upgraded);
    return upgraded;
}
