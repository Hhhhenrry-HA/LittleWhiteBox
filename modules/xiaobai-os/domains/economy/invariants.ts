import { EMPTY_STORY_PREFIX_HASH } from '../../types.js';
import {
    ECONOMY_SCHEMA_VERSION,
    OPENING_GRANT_ACTION_ID,
    OPENING_GRANT_AMOUNT,
    OPENING_GRANT_IDEMPOTENCY_KEY,
    EconomyError,
    type EconomyLedgerV1,
    type EconomyTransaction,
} from './types.js';

const HASH_PATTERN = /^sha256:[0-9a-f]{64}$/;
const ACCOUNT_PATTERN = /^(?:player|system:(?:mint|sink)|(?:counterparty|escrow):[a-z0-9_-]+:[a-zA-Z0-9._:-]+)$/;
const MAX_DATE_MS = 8_640_000_000_000_000;

function requireString(value: unknown, field: string, maxLength: number): string {
    if (typeof value !== 'string' || value.length === 0 || value.length > maxLength) {
        throw new EconomyError('economy_invalid_transaction', `${field} must be a non-empty string up to ${maxLength} characters`);
    }
    return value;
}

function validateAnchor(transaction: EconomyTransaction): void {
    if (!Number.isInteger(transaction.anchor?.floor) || transaction.anchor.floor < -1) {
        throw new EconomyError('economy_invalid_anchor', 'story anchor floor must be an integer at least -1');
    }
    if (!HASH_PATTERN.test(transaction.anchor?.prefixHash || '')) {
        throw new EconomyError('economy_invalid_anchor', 'story anchor hash is invalid');
    }
}

function assertOpeningGrant(transaction: EconomyTransaction): void {
    if (
        transaction.sequence !== 1 ||
        transaction.idempotencyKey !== OPENING_GRANT_IDEMPOTENCY_KEY ||
        transaction.actionId !== OPENING_GRANT_ACTION_ID ||
        transaction.fromAccountId !== 'system:mint' ||
        transaction.toAccountId !== 'player' ||
        transaction.amount !== OPENING_GRANT_AMOUNT ||
        transaction.kind !== 'opening_grant' ||
        transaction.sourceDomain !== 'economy' ||
        transaction.sourceId !== 'opening-grant:v1' ||
        transaction.anchor.floor !== -1 ||
        transaction.anchor.prefixHash !== EMPTY_STORY_PREFIX_HASH ||
        transaction.reversalOfTransactionId !== undefined
    ) {
        throw new EconomyError('economy_invalid_opening_grant', 'economy ledger must start with the fixed opening grant');
    }
}

export function validateLedger(value: unknown): asserts value is EconomyLedgerV1 {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        throw new EconomyError('economy_invalid_ledger', 'economy ledger must be an object');
    }
    const ledger = value as Partial<EconomyLedgerV1>;
    if (ledger.schemaVersion !== ECONOMY_SCHEMA_VERSION) {
        throw new EconomyError('economy_unsupported_version', 'unsupported economy schema version');
    }
    if (!Array.isArray(ledger.transactions) || ledger.transactions.length === 0) {
        throw new EconomyError('economy_invalid_ledger', 'economy ledger must contain the opening grant');
    }

    const ids = new Set<string>();
    const idempotencyKeys = new Set<string>();
    const closedActions = new Set<string>();
    const balances = new Map<string, number>();
    const reversedTransactions = new Set<string>();
    let previous: EconomyTransaction | null = null;

    for (let index = 0; index < ledger.transactions.length; index += 1) {
        const transaction = ledger.transactions[index] as EconomyTransaction;
        requireString(transaction.id, 'id', 160);
        requireString(transaction.idempotencyKey, 'idempotencyKey', 200);
        requireString(transaction.actionId, 'actionId', 200);
        requireString(transaction.kind, 'kind', 80);
        requireString(transaction.title, 'title', 160);
        if (typeof transaction.note !== 'string' || transaction.note.length > 1000) {
            throw new EconomyError('economy_invalid_transaction', 'note must be a string up to 1000 characters');
        }
        requireString(transaction.sourceDomain, 'sourceDomain', 80);
        requireString(transaction.sourceId, 'sourceId', 200);
        if (
            typeof transaction.fromAccountId !== 'string' ||
            typeof transaction.toAccountId !== 'string' ||
            transaction.fromAccountId.length > 240 ||
            transaction.toAccountId.length > 240 ||
            !ACCOUNT_PATTERN.test(transaction.fromAccountId) ||
            !ACCOUNT_PATTERN.test(transaction.toAccountId)
        ) {
            throw new EconomyError('economy_invalid_account', 'transaction account id is invalid');
        }
        if (transaction.fromAccountId === transaction.toAccountId) {
            throw new EconomyError('economy_invalid_transaction', 'transaction accounts must differ');
        }
        if (!Number.isSafeInteger(transaction.amount) || transaction.amount <= 0) {
            throw new EconomyError('economy_invalid_amount', 'transaction amount must be a positive safe integer');
        }
        if (!Number.isSafeInteger(transaction.sequence) || transaction.sequence !== index + 1) {
            throw new EconomyError('economy_invalid_sequence', 'transaction sequence must be contiguous from 1');
        }
        if (!Number.isSafeInteger(transaction.createdAt) || transaction.createdAt < 0 || transaction.createdAt > MAX_DATE_MS) {
            throw new EconomyError('economy_invalid_transaction', 'createdAt must be a valid non-negative integer timestamp');
        }
        validateAnchor(transaction);
        if (ids.has(transaction.id) || idempotencyKeys.has(transaction.idempotencyKey)) {
            throw new EconomyError('economy_duplicate_transaction', 'transaction id and idempotency key must be unique');
        }
        ids.add(transaction.id);
        idempotencyKeys.add(transaction.idempotencyKey);

        if (index > 0 && transaction.actionId === OPENING_GRANT_ACTION_ID) {
            throw new EconomyError('economy_invalid_opening_grant', 'the fixed opening grant can only appear once');
        }

        const isReversal = transaction.reversalOfTransactionId !== undefined;
        if ((transaction.kind === 'reversal') !== isReversal) {
            throw new EconomyError('economy_invalid_reversal', 'reversal kind and target must be declared together');
        }

        if (previous && previous.actionId !== transaction.actionId) {closedActions.add(previous.actionId);}
        if (closedActions.has(transaction.actionId)) {
            throw new EconomyError('economy_non_contiguous_action', 'transactions for one action must be contiguous');
        }
        if (previous?.actionId === transaction.actionId) {
            if (
                previous.anchor.floor !== transaction.anchor.floor ||
                previous.anchor.prefixHash !== transaction.anchor.prefixHash ||
                previous.sourceDomain !== transaction.sourceDomain ||
                previous.sourceId !== transaction.sourceId
            ) {
                throw new EconomyError('economy_inconsistent_action', 'transactions for one action must share source and anchor');
            }
        } else if (previous && transaction.anchor.floor < previous.anchor.floor) {
            throw new EconomyError('economy_anchor_regression', 'new economy actions cannot move backward in the story');
        }

        if (isReversal) {
            requireString(transaction.reversalOfTransactionId, 'reversalOfTransactionId', 160);
            const original = ledger.transactions.slice(0, index).find((item) => item.id === transaction.reversalOfTransactionId);
            if (
                !original ||
                original.actionId === OPENING_GRANT_ACTION_ID ||
                original.reversalOfTransactionId !== undefined
            ) {
                throw new EconomyError('economy_invalid_reversal', 'reversal must reference an earlier non-reversal transaction');
            }
            if (reversedTransactions.has(original.id)) {
                throw new EconomyError('economy_already_reversed', 'a transaction can only be reversed once');
            }
            if (
                transaction.fromAccountId !== original.toAccountId ||
                transaction.toAccountId !== original.fromAccountId ||
                transaction.amount !== original.amount
            ) {
                throw new EconomyError('economy_invalid_reversal', 'reversal must mirror the original transaction');
            }
            reversedTransactions.add(original.id);
        }

        const fromBalance = (balances.get(transaction.fromAccountId) || 0) - transaction.amount;
        const toBalance = (balances.get(transaction.toAccountId) || 0) + transaction.amount;
        if (!Number.isSafeInteger(fromBalance) || !Number.isSafeInteger(toBalance)) {
            throw new EconomyError('economy_balance_overflow', 'account balance exceeds safe integer range');
        }
        balances.set(transaction.fromAccountId, fromBalance);
        balances.set(transaction.toAccountId, toBalance);
        for (const [accountId, balance] of [[transaction.fromAccountId, fromBalance], [transaction.toAccountId, toBalance]] as const) {
            if ((accountId === 'player' || accountId.startsWith('escrow:')) && balance < 0) {
                throw new EconomyError('economy_insufficient_funds', `${accountId} cannot be overdrawn`);
            }
        }
        previous = transaction;
    }

    assertOpeningGrant(ledger.transactions[0]);
}
