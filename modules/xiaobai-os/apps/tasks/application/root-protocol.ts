import type { XiaobaiOsChatData } from '../../../types.js';
import { validateLedger } from '../../../domains/economy/invariants.js';
import { projectBalances } from '../../../domains/economy/ledger.js';
import type { EconomyLedgerV2, PostTransactionInput } from '../../../domains/economy/types.js';
import { createEmptyTaskDomain, validateTaskDomain } from '../../../domains/tasks/invariants.js';
import { replayTaskEvents, visitProjectedTaskEvents } from '../../../domains/tasks/projection.js';
import { TaskError, type TaskDomainV1, type TaskEvent, type TaskRecord } from '../../../domains/tasks/types.js';

const TASK_SOURCE_DOMAIN = 'tasks';
const TASK_ESCROW_PREFIX = 'escrow:task:';
const TASK_COUNTERPARTY_PREFIX = 'counterparty:task:';

export interface PreparedTaskRoot {
    root: XiaobaiOsChatData;
    domain: TaskDomainV1;
    ledger: EconomyLedgerV2;
}

function inconsistent(detail: string): never {
    throw new TaskError('task_invalid_domain', `economy.${detail}`);
}

export function emptyTaskRoot(): XiaobaiOsChatData {
    return { schemaVersion: 2, apps: {}, domains: {} };
}

export function readTaskDomain(root: XiaobaiOsChatData | null): TaskDomainV1 | null {
    const value = root?.domains.tasks;
    if (value === undefined) {return null;}
    validateTaskDomain(value);
    return structuredClone(value);
}

export function readTaskEconomyLedger(root: XiaobaiOsChatData | null): EconomyLedgerV2 | null {
    const value = root?.domains.economy;
    if (value === undefined) {return null;}
    validateLedger(value);
    return structuredClone(value);
}

export function prepareTaskRoot(current: XiaobaiOsChatData | null): PreparedTaskRoot {
    const root = current ? structuredClone(current) : emptyTaskRoot();
    const ledger = readTaskEconomyLedger(root);
    if (!ledger) {throw new Error('tasks_economy_not_opened');}
    return {
        root,
        ledger,
        domain: readTaskDomain(root) ?? createEmptyTaskDomain(),
    };
}

export function taskEscrowAccount(taskId: string): string {
    return `${TASK_ESCROW_PREFIX}${taskId}`;
}

export function taskCounterpartyAccount(partyId: string): string {
    return `${TASK_COUNTERPARTY_PREFIX}${partyId}`;
}

function taskTransactionKind(event: TaskEvent): 'funding' | 'settlement' | 'refund' | null {
    if (event.kind === 'accepted' || event.kind === 'published') {return 'funding';}
    if (event.kind === 'completed') {return 'settlement';}
    if (event.kind === 'failed' || event.kind === 'cancelled') {return 'refund';}
    return null;
}

export function buildTaskTransactionForRecord(event: TaskEvent, record: Readonly<TaskRecord>): PostTransactionInput | null {
    const transactionKind = taskTransactionKind(event);
    if (!transactionKind) {return null;}
    const escrow = taskEscrowAccount(event.taskId);
    let fromAccountId: string;
    let toAccountId: string;
    let title: string;
    if (transactionKind === 'funding') {
        fromAccountId = event.kind === 'accepted'
            ? taskCounterpartyAccount(event.issuer.partyId)
            : 'player';
        toAccountId = escrow;
        title = '任务报酬托管';
    } else if (transactionKind === 'settlement') {
        if (!record.assignee) {return inconsistent(`assignee:${event.taskId}`);}
        fromAccountId = escrow;
        toAccountId = record.assignee.kind === 'player'
            ? 'player'
            : taskCounterpartyAccount(record.assignee.partyId);
        title = '任务完成结算';
    } else {
        fromAccountId = escrow;
        toAccountId = record.issuer.kind === 'player'
            ? 'player'
            : taskCounterpartyAccount(record.issuer.partyId);
        title = '任务报酬退回';
    }
    return {
        idempotencyKey: `tasks:event:${event.eventId}:${transactionKind}`,
        actionId: event.actionId,
        fromAccountId,
        toAccountId,
        amount: record.reward,
        kind: `task_${transactionKind}`,
        title,
        sourceDomain: TASK_SOURCE_DOMAIN,
        sourceId: event.taskId,
    };
}

function expectedTransactions(domain: TaskDomainV1): PostTransactionInput[] {
    const expected: PostTransactionInput[] = [];
    visitProjectedTaskEvents(domain.events, (event, record) => {
        const transaction = buildTaskTransactionForRecord(event, record);
        if (transaction) {expected.push(transaction);}
    });
    return expected;
}

function isTaskTransaction(
    transaction: EconomyLedgerV2['transactions'][number],
    actionIds: ReadonlySet<string>,
): boolean {
    return transaction.sourceDomain === TASK_SOURCE_DOMAIN
        || transaction.kind.startsWith('task_')
        || actionIds.has(transaction.actionId)
        || transaction.fromAccountId.startsWith(TASK_ESCROW_PREFIX)
        || transaction.toAccountId.startsWith(TASK_ESCROW_PREFIX)
        || transaction.fromAccountId.startsWith(TASK_COUNTERPARTY_PREFIX)
        || transaction.toAccountId.startsWith(TASK_COUNTERPARTY_PREFIX);
}

function sameTransaction(
    actual: EconomyLedgerV2['transactions'][number],
    expected: PostTransactionInput,
): boolean {
    return actual.idempotencyKey === expected.idempotencyKey
        && actual.actionId === expected.actionId
        && actual.fromAccountId === expected.fromAccountId
        && actual.toAccountId === expected.toAccountId
        && actual.amount === expected.amount
        && actual.kind === expected.kind
        && actual.title === expected.title
        && actual.note === (expected.note ?? '')
        && actual.sourceDomain === expected.sourceDomain
        && actual.sourceId === expected.sourceId
        && actual.reversalOfTransactionId === undefined;
}

/** Validates both event-to-ledger legs and ledger-to-event ownership. */
export function validateTaskEconomyConsistency(value: unknown, path = 'xiaobaiOs'): void {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
        throw new Error(`${path} must be an object`);
    }
    const root = value as XiaobaiOsChatData;
    const domain = readTaskDomain(root);
    const ledger = readTaskEconomyLedger(root);
    if (domain && !ledger) {inconsistent(`${path}.ledger-missing`);}
    const events = domain?.events ?? [];
    const actionIds = new Set(events.map(event => event.actionId));
    const actual = ledger?.transactions.filter(transaction => isTaskTransaction(transaction, actionIds)) ?? [];
    const expected = domain ? expectedTransactions(domain) : [];
    if (actual.length !== expected.length) {inconsistent(`${path}.transaction-count`);}
    for (let index = 0; index < expected.length; index += 1) {
        if (!sameTransaction(actual[index], expected[index])) {
            inconsistent(`${path}.transaction:${expected[index]?.actionId ?? index}`);
        }
    }
    if (!ledger || !domain) {return;}
    const balances = projectBalances(ledger);
    for (const record of replayTaskEvents(domain.events)) {
        const expectedEscrow = record.status === 'recruiting' || record.status === 'active' ? record.reward : 0;
        if ((balances[taskEscrowAccount(record.taskId)] ?? 0) !== expectedEscrow) {
            inconsistent(`${path}.escrow:${record.taskId}`);
        }
    }
}

export function installPreparedTaskRoot(
    prepared: PreparedTaskRoot,
    domain: TaskDomainV1,
    ledger: EconomyLedgerV2,
): XiaobaiOsChatData {
    prepared.root.domains.tasks = structuredClone(domain);
    prepared.root.domains.economy = structuredClone(ledger);
    validateTaskEconomyConsistency(prepared.root);
    return prepared.root;
}
