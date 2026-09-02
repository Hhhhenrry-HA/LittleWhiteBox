import type { XiaobaiOsChatData } from '../../../types.js';
import { validateLedger } from '../../../domains/economy/invariants.js';
import { projectBalances } from '../../../domains/economy/ledger.js';
import type { EconomyLedgerV2, PostTransactionInput } from '../../../domains/economy/types.js';
import { validateBankDomain } from '../../../domains/bank/invariants.js';
import { replayBankEvents } from '../../../domains/bank/timeline.js';
import {
    throwBankError,
    type BankActivity,
    type BankDomainV1,
    type BankEvent,
} from '../../../domains/bank/types.js';

const BANK_SOURCE_DOMAIN = 'bank';
const BANK_RESERVE_ACCOUNT = 'counterparty:bank:reserve';
const BANK_ESCROW_PREFIX = 'escrow:bank:';
type BankLeg = Omit<PostTransactionInput, 'actionId' | 'sourceDomain' | 'sourceId' | 'idempotencyKey'>;
export function emptyBankRoot(): XiaobaiOsChatData {
    return { schemaVersion: 2, apps: {}, domains: {} };
}

export function readEconomyLedger(root: XiaobaiOsChatData | null): EconomyLedgerV2 | null {
    const value = root?.domains.economy;
    if (value === undefined) {return null;}
    validateLedger(value);
    return structuredClone(value);
}

export function readBankDomain(root: XiaobaiOsChatData | null): BankDomainV1 | null {
    const value = root?.domains.bank;
    if (value === undefined) {return null;}
    validateBankDomain(value);
    return structuredClone(value);
}

function inconsistency(detail: string): never {
    return throwBankError('bank_economy_inconsistent', detail);
}

function actionSourceId(event: BankEvent): string {
    return event.actionId;
}

function closePositionLegs(activity: BankActivity): BankLeg[] {
    const escrow = `${BANK_ESCROW_PREFIX}${activity.sourceId}`;
    const legs: BankLeg[] = [];
    if (activity.payout > activity.amountIn) {
        legs.push({
            fromAccountId: BANK_RESERVE_ACCOUNT,
            toAccountId: escrow,
            amount: activity.payout - activity.amountIn,
            kind: 'bank_position_profit',
            title: '银行收益补足',
        });
    }
    if (activity.payout > 0) {
        legs.push({
            fromAccountId: escrow,
            toAccountId: 'player',
            amount: activity.payout,
            kind: 'bank_position_payout',
            title: '银行头寸结算',
        });
    }
    if (activity.payout < activity.amountIn) {
        legs.push({
            fromAccountId: escrow,
            toAccountId: 'system:sink',
            amount: activity.amountIn - activity.payout,
            kind: 'bank_position_loss',
            title: '银行亏损核销',
        });
    }
    return legs;
}

export function buildBankTransactions(event: BankEvent): PostTransactionInput[] {
    const activities = new Map(event.result.activities.map((activity) => [activity.sourceId, activity]));
    const closedIds = [...event.command.settledPositionIds];
    if (event.command.kind === 'deposit-withdraw-early') {closedIds.push(event.command.positionId);}
    const legs = closedIds.flatMap((positionId) => {
        const activity = activities.get(positionId);
        return activity ? closePositionLegs(activity) : inconsistency(`activity:${event.actionId}:${positionId}`);
    });
    if (event.command.kind === 'deposit-open' || event.command.kind === 'fund-open') {
        legs.push({
            fromAccountId: 'player',
            toAccountId: `${BANK_ESCROW_PREFIX}${event.command.positionId}`,
            amount: event.command.amount,
            kind: 'bank_position_open',
            title: '银行头寸开立',
        });
    }
    return legs.map((leg, index) => ({
        ...leg,
        idempotencyKey: `bank:event:${event.revision}:leg:${index + 1}`,
        actionId: event.actionId,
        sourceDomain: BANK_SOURCE_DOMAIN,
        sourceId: actionSourceId(event),
    }));
}

function isBankRelatedTransaction(
    transaction: EconomyLedgerV2['transactions'][number],
    bankActionIds: ReadonlySet<string>,
): boolean {
    return transaction.sourceDomain === BANK_SOURCE_DOMAIN
        || bankActionIds.has(transaction.actionId)
        || transaction.kind.startsWith('bank_')
        || transaction.fromAccountId === BANK_RESERVE_ACCOUNT
        || transaction.toAccountId === BANK_RESERVE_ACCOUNT
        || transaction.fromAccountId.startsWith(BANK_ESCROW_PREFIX)
        || transaction.toAccountId.startsWith(BANK_ESCROW_PREFIX);
}

function sameLeg(transaction: EconomyLedgerV2['transactions'][number], expected: PostTransactionInput): boolean {
    return transaction.idempotencyKey === expected.idempotencyKey
        && transaction.actionId === expected.actionId
        && transaction.fromAccountId === expected.fromAccountId
        && transaction.toAccountId === expected.toAccountId
        && transaction.amount === expected.amount
        && transaction.kind === expected.kind
        && transaction.title === expected.title
        && transaction.note === (expected.note || '')
        && transaction.sourceDomain === expected.sourceDomain
        && transaction.sourceId === expected.sourceId
        && transaction.reversalOfTransactionId === undefined;
}

export function validateBankEconomyConsistency(value: unknown, path = 'xiaobaiOs'): void {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        throw new Error(`${path} must be an object`);
    }
    const root = value as XiaobaiOsChatData;
    const bank = readBankDomain(root);
    const ledger = readEconomyLedger(root);
    if (bank && !ledger) {inconsistency(`${path}:ledger-missing`);}
    const actionIds = new Set(bank?.events.map((event) => event.actionId) || []);
    const related = ledger?.transactions.filter((transaction) => isBankRelatedTransaction(transaction, actionIds)) || [];
    const consumed = new Set<number>();
    for (const event of bank?.events || []) {
        const expected = buildBankTransactions(event);
        const actual = related.filter((transaction) => transaction.actionId === event.actionId);
        if (actual.length !== expected.length || actual.some((transaction, index) => !sameLeg(transaction, expected[index]))) {
            inconsistency(`${path}:action:${event.actionId}`);
        }
        actual.forEach((transaction) => consumed.add(transaction.sequence));
    }
    if (consumed.size !== related.length) {inconsistency(`${path}:orphan-transaction`);}

    if (ledger && bank) {
        const balances = projectBalances(ledger);
        const state = replayBankEvents(bank);
        const open = new Map(
            [...state.openDeposits, ...state.openInvestments].map((position) => [position.id, position.principal]),
        );
        const allPositionIds = new Set(bank.events.flatMap((event) => (
            event.command.kind === 'deposit-open' || event.command.kind === 'fund-open'
                ? [event.command.positionId]
                : []
        )));
        for (const positionId of allPositionIds) {
            if ((balances[`${BANK_ESCROW_PREFIX}${positionId}`] || 0) !== (open.get(positionId) || 0)) {
                inconsistency(`${path}:escrow:${positionId}`);
            }
        }
    }
}
