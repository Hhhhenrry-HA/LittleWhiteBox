import assert from 'node:assert/strict';
import test from 'node:test';

import { createTaskIdFactory } from '../apps/tasks/application/ids.js';
import { createTasksService } from '../apps/tasks/application/service.js';
import { validateTaskEconomyConsistency } from '../apps/tasks/application/root-protocol.js';
import { validateLedger } from '../domains/economy/invariants.js';
import { projectBalances } from '../domains/economy/ledger.js';
import { createEconomyRepository } from '../domains/economy/repository.js';
import { validateTaskDomain } from '../domains/tasks/invariants.js';
import { createChatDataStore } from '../host/chat-data-store.js';

const allowCommit = () => true;

function listing() {
    return {
        grade: 'B',
        tags: ['禁忌', '旧城'],
        posture: '中介入',
        title: '封蜡信',
        hook: '匿名委托人留下了一封不能拆开的信。',
        objective: '把封蜡信交给钟楼守卫',
        requirements: '不得拆封',
        location: '旧城钟楼',
        timing: '任意时候',
        risk: '可能被巡逻者盘问',
        reward: 150,
    };
}

function publishedForm() {
    return {
        title: '护送药箱',
        objective: '把药箱送到南门诊所',
        requirements: '保持药箱直立',
        location: '南门诊所',
        risk: '道路可能封锁',
        reward: 80,
    };
}

function candidate() {
    return {
        name: '艾拉',
        description: '熟悉旧城路线的佣兵',
        pitch: '我能避开巡逻路线。',
        capability: '潜行与路线规划',
        risk: '不愿伤及无辜',
    };
}

function createHarness() {
    const identity = { key: 'character:tasks:chat-a', chatId: 'chat-a' };
    const chat = { metadata: {}, persisted: undefined, assistantCount: 3 };
    const state = {
        saveCount: 0,
        transactionId: 0,
        opaqueId: 0,
        saveImpl: null,
        persist(transaction) {
            chat.persisted = structuredClone(transaction.xiaobaiOs);
        },
    };
    state.saveImpl = async transaction => state.persist(transaction);
    const store = createChatDataStore({
        getChatIdentity: () => identity,
        getChatMetadata: () => chat.metadata,
        async saveChatMetadata(transaction) {
            state.saveCount += 1;
            await state.saveImpl(transaction);
        },
        readPersistedXiaobaiOs: async () => structuredClone(chat.persisted),
    }, {
        domains: { economy: validateLedger, tasks: validateTaskDomain },
        root: validateTaskEconomyConsistency,
    });
    let clock = 1_000;
    const now = () => ++clock;
    const economy = createEconomyRepository(store, {
        now,
        createId: () => `tx-${++state.transactionId}`,
    });
    const tasks = createTasksService(store, {
        now,
        ids: createTaskIdFactory({ randomUuid: () => `opaque-${++state.opaqueId}`, now }),
        createTransactionId: () => `tx-${++state.transactionId}`,
        getPlayerDisplayName: () => '主人',
        getObservedAssistantCount: () => chat.assistantCount,
    });
    return { chat, economy, state, store, tasks };
}

async function openEconomy(harness) {
    await harness.economy.ensureCurrent();
    harness.state.saveCount = 0;
}

test('reading Tasks before Economy exists returns an empty local view', () => {
    const harness = createHarness();
    assert.deepEqual(harness.tasks.readCurrent(), {
        domain: null,
        records: [],
        playerBalance: 0,
        writeState: 'ready',
    });
});

async function publishAndAssign(harness, prefix, form = publishedForm()) {
    const published = await harness.tasks.publish({
        actionId: `${prefix}-publish`,
        form,
    }, allowCommit);
    const task = published.record;
    const replaced = await harness.tasks.replaceCandidates({
        actionId: `${prefix}-candidates`,
        taskId: task.taskId,
        expectedTaskRevision: task.taskRevision,
        expectedEventId: task.eventId,
        candidates: [candidate()],
        observedAssistantCount: harness.chat.assistantCount,
    }, allowCommit);
    const candidateId = replaced.record.candidates[0].candidateId;
    return harness.tasks.assignCandidate({
        actionId: `${prefix}-assign`,
        taskId: task.taskId,
        expectedTaskRevision: replaced.record.taskRevision,
        expectedEventId: replaced.record.eventId,
        candidateId,
    }, allowCommit);
}

function maintenanceCommand(kind, actionId, record, summary) {
    return {
        kind,
        actionId,
        taskId: record.taskId,
        expectedTaskRevision: record.taskRevision,
        expectedEventId: record.eventId,
        ...(kind === 'progress' ? { progressSummary: summary } : { resultSummary: summary }),
    };
}

test('received tasks atomically fund escrow and settle or refund through their frozen world party', async t => {
    for (const terminal of ['complete', 'fail']) {
        await t.test(terminal, async () => {
            const harness = createHarness();
            await openEconomy(harness);
            const board = await harness.tasks.replaceBoard({
                expectedBoardId: null,
                listings: [listing()],
                generatedAt: 10,
            }, allowCommit);
            const accepted = await harness.tasks.acceptListing({
                actionId: `received-${terminal}-accept`,
                boardId: board.view.domain.board.boardId,
                listingId: board.view.domain.board.listings[0].listingId,
            }, allowCommit);
            const record = accepted.record;
            const balances = projectBalances(harness.economy.readCurrent());
            assert.equal(balances[`escrow:task:${record.taskId}`], 150);
            assert.equal(balances[`counterparty:task:board:${record.taskId}`], -150);
            assert.equal(harness.state.saveCount, 2);

            const ended = await harness.tasks.commitMaintenance({
                commands: [maintenanceCommand(terminal, `received-${terminal}`, record, '封蜡信已有明确结果')],
                observedAssistantCount: 4,
            }, allowCommit);
            const finalBalances = projectBalances(harness.economy.readCurrent());
            assert.equal(finalBalances[`escrow:task:${record.taskId}`], 0);
            assert.equal(ended.record.status, terminal === 'complete' ? 'completed' : 'failed');
            assert.equal(finalBalances.player ?? 0, terminal === 'complete' ? 250 : 100);
            assert.doesNotThrow(() => validateTaskEconomyConsistency(harness.store.readCurrent()));
        });
    }
});

test('published tasks atomically refund cancellation and pay only the assigned candidate on completion', async t => {
    await t.test('cancel', async () => {
        const harness = createHarness();
        await openEconomy(harness);
        const published = await harness.tasks.publish({ actionId: 'cancel-publish', form: publishedForm() }, allowCommit);
        assert.equal(published.view.playerBalance, 20);
        const cancelled = await harness.tasks.cancel({
            actionId: 'cancel-task',
            taskId: published.record.taskId,
            expectedTaskRevision: published.record.taskRevision,
            expectedEventId: published.record.eventId,
        }, allowCommit);
        assert.equal(cancelled.view.playerBalance, 100);
        assert.equal(cancelled.record.status, 'cancelled');
    });

    for (const terminal of ['complete', 'fail']) {
        await t.test(terminal, async () => {
            const harness = createHarness();
            await openEconomy(harness);
            const assigned = await publishAndAssign(harness, terminal);
            const candidateId = assigned.record.assignee.partyId;
            const ended = await harness.tasks.commitMaintenance({
                commands: [maintenanceCommand(terminal, `${terminal}-task`, assigned.record, '药箱任务已有明确结果')],
                observedAssistantCount: 5,
            }, allowCommit);
            const balances = projectBalances(harness.economy.readCurrent());
            assert.equal(balances[`escrow:task:${assigned.record.taskId}`], 0);
            assert.equal(balances.player, terminal === 'fail' ? 100 : 20);
            assert.equal(balances[`counterparty:task:${candidateId}`] ?? 0, terminal === 'complete' ? 80 : 0);
            assert.equal(ended.record.status, terminal === 'complete' ? 'completed' : 'failed');
        });
    }
});

test('action replay is idempotent and a rejected commit guard installs neither task nor money', async () => {
    const harness = createHarness();
    await openEconomy(harness);
    const input = { actionId: 'publish-once', form: publishedForm() };
    const first = await harness.tasks.publish(input, allowCommit);
    const saves = harness.state.saveCount;
    const transactions = harness.economy.readCurrent().transactions.length;
    const replay = await harness.tasks.publish(input, allowCommit);
    assert.equal(replay.changed, false);
    assert.equal(replay.record.taskId, first.record.taskId);
    assert.equal(harness.state.saveCount, saves);
    assert.equal(harness.economy.readCurrent().transactions.length, transactions);

    const before = harness.store.readCurrent();
    let guardCalls = 0;
    await assert.rejects(harness.tasks.publish({
        actionId: 'guarded',
        form: { ...publishedForm(), reward: 20 },
    }, () => {
        guardCalls += 1;
        return guardCalls === 1;
    }), /tasks_commit_guard_failed/);
    assert.equal(guardCalls, 2);
    assert.deepEqual(harness.store.readCurrent(), before);
    assert.equal(harness.state.saveCount, saves);
});

test('save failure rolls back both domains and root validation rejects missing, forged and orphan legs', async () => {
    const harness = createHarness();
    await openEconomy(harness);
    const before = harness.store.readCurrent();
    harness.state.saveImpl = async () => {throw new Error('disk failed');};
    await assert.rejects(
        harness.tasks.publish({ actionId: 'save-failure', form: publishedForm() }, allowCommit),
        /disk failed/,
    );
    assert.deepEqual(harness.store.readCurrent(), before);

    harness.state.saveImpl = async transaction => harness.state.persist(transaction);
    const published = await harness.tasks.publish({ actionId: 'forgery-source', form: publishedForm() }, allowCommit);
    const root = published.view.domain ? harness.store.readCurrent() : null;
    const missing = structuredClone(root);
    missing.domains.economy.transactions.pop();
    assert.throws(() => validateTaskEconomyConsistency(missing), error => error.code === 'task_invalid_domain');
    const forged = structuredClone(root);
    forged.domains.economy.transactions.at(-1).toAccountId = 'escrow:task:forged';
    assert.throws(() => validateTaskEconomyConsistency(forged), error => error.code === 'task_invalid_domain');
    const orphan = structuredClone(root);
    const source = orphan.domains.economy.transactions.at(-1);
    orphan.domains.economy.transactions.push({
        ...source,
        id: 'tx-orphan',
        sequence: source.sequence + 1,
        idempotencyKey: 'tasks:event:orphan:funding',
        actionId: 'orphan-action',
        fromAccountId: 'counterparty:task:orphan',
        toAccountId: 'escrow:task:orphan',
        sourceId: 'orphan-task',
    });
    assert.throws(() => validateTaskEconomyConsistency(orphan), error => error.code === 'task_invalid_domain');
});

test('maintenance commits multiple task events as one root revision and rejects a stale batch atomically', async () => {
    const harness = createHarness();
    await openEconomy(harness);
    const lowRewardForm = { ...publishedForm(), reward: 20 };
    const first = await publishAndAssign(harness, 'batch-first', lowRewardForm);
    const second = await publishAndAssign(harness, 'batch-second', lowRewardForm);
    const beforeRevision = harness.tasks.readCurrent().domain.revision;
    const beforeSaves = harness.state.saveCount;

    await harness.tasks.commitMaintenance({
        commands: [
            maintenanceCommand('complete', 'batch-complete', first.record, '药箱已交付南门诊所'),
            maintenanceCommand('fail', 'batch-fail', second.record, '药箱已焚毁且无法替代'),
        ],
        observedAssistantCount: 7,
    }, allowCommit);

    const committed = harness.tasks.readCurrent();
    assert.equal(committed.domain.revision, beforeRevision + 1);
    assert.equal(committed.records.find(record => record.taskId === first.record.taskId).status, 'completed');
    assert.equal(committed.records.find(record => record.taskId === second.record.taskId).status, 'failed');
    assert.equal(harness.state.saveCount, beforeSaves + 1);

    const third = await publishAndAssign(harness, 'stale-first', lowRewardForm);
    const fourth = await publishAndAssign(harness, 'stale-second', lowRewardForm);
    const rootBeforeStale = harness.store.readCurrent();
    const savesBeforeStale = harness.state.saveCount;
    await assert.rejects(harness.tasks.commitMaintenance({
        commands: [
            maintenanceCommand('complete', 'stale-complete', third.record, '药箱已送达'),
            {
                ...maintenanceCommand('fail', 'stale-fail', fourth.record, '药箱已遗失'),
                expectedTaskRevision: fourth.record.taskRevision - 1,
            },
        ],
        observedAssistantCount: 8,
    }, allowCommit), error => error.code === 'task_revision_conflict');
    assert.deepEqual(harness.store.readCurrent(), rootBeforeStale);
    assert.equal(harness.state.saveCount, savesBeforeStale);
});

test('fallback task IDs are monotonic and retry occupied collisions', () => {
    const occupied = new Set(['task-10-1']);
    const factory = createTaskIdFactory({ randomUuid: null, now: () => 10 });
    assert.equal(factory.create('task', occupied), 'task-10-2');
    assert.equal(factory.create('action', occupied), 'task-action-10-3');
});
