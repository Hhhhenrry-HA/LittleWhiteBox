import assert from 'node:assert/strict';
import test from 'node:test';

import { validateBankDomain } from '../domains/bank/invariants.js';
import { createBankService } from '../apps/bank/application/service.js';
import {
    reconcileBankRootWithStory,
    validateBankEconomyConsistency,
} from '../apps/bank/application/root-protocol.js';
import { validateLedger } from '../domains/economy/invariants.js';
import { projectBalances } from '../domains/economy/ledger.js';
import { createEconomyRepository } from '../domains/economy/repository.js';
import { createChatDataStore } from '../host/chat-data-store.js';
import { createStoryActionRunner } from '../host/story-action-runner.js';
import { createStoryReconciliationRuntime } from '../host/story-reconciliation-runtime.js';
import { createStoryWriteGate } from '../host/story-write-gate.js';

function createHarness(randomValues = []) {
    const identity = { key: 'character:1:bank-chat', chatId: 'bank-chat' };
    const chat = {
        metadata: {},
        persisted: undefined,
        story: {
            identityKey: identity.key,
            messages: [{ role: 'user', name: '主人', text: '开场' }],
        },
    };
    const state = {
        saveCount: 0,
        saves: [],
        saveImpl: null,
        generationActive: false,
        persist(transaction) {
            chat.persisted = structuredClone(transaction.xiaobaiOs);
        },
    };
    state.saveImpl = async transaction => { state.persist(transaction); };

    const store = createChatDataStore({
        getChatIdentity: () => identity,
        getChatMetadata: () => chat.metadata,
        async saveChatMetadata(transaction) {
            state.saveCount += 1;
            state.saves.push(structuredClone(transaction));
            await state.saveImpl(transaction);
        },
        readPersistedXiaobaiOs: async () => structuredClone(chat.persisted),
    }, {
        domains: { economy: validateLedger, bank: validateBankDomain },
        root: validateBankEconomyConsistency,
    });
    const storyAdapter = {
        captureCurrent: () => structuredClone(chat.story),
        readPersistedCurrent: async () => structuredClone(chat.story),
        subscribeChanges: () => () => {},
    };
    const gate = createStoryWriteGate();
    const runner = createStoryActionRunner(store, storyAdapter, gate, async () => {});
    let clock = 1_000;
    let transactionId = 0;
    let eventId = 0;
    let positionId = 0;
    let activityId = 0;
    let randomCalls = 0;
    const randomQueue = [...randomValues];
    const now = () => ++clock;
    const createTransactionId = () => `tx-${++transactionId}`;
    const economy = createEconomyRepository(store, {
        now,
        createId: createTransactionId,
        actionRunner: runner,
    });
    const bank = createBankService(store, runner, {
        now,
        createEventId: () => `bank-event-${++eventId}`,
        createPositionId: () => `bank-position-${++positionId}`,
        createActivityId: () => `bank-activity-${++activityId}`,
        createTransactionId,
        random: {
            nextInt(maxExclusive) {
                randomCalls += 1;
                const value = randomQueue.shift();
                assert.notEqual(value, undefined, 'test random sequence exhausted');
                assert.ok(value >= 0 && value < maxExclusive);
                return value;
            },
        },
        getCurrentAssistantTurn: () => chat.story.messages.filter(message => message.role === 'assistant').length,
        isMainGenerationActive: () => state.generationActive,
    });

    return {
        bank,
        chat,
        economy,
        gate,
        randomQueue,
        runner,
        state,
        store,
        storyAdapter,
        calls() {
            return { eventId, positionId, activityId, random: randomCalls, transactionId };
        },
        addAssistant(count, prefix = '回复') {
            for (let index = 0; index < count; index += 1) {
                chat.story.messages.push({ role: 'assistant', name: '角色', text: `${prefix}${index + 1}` });
            }
        },
    };
}

test('Bank rejects turn-sensitive writes throughout a main generation', async () => {
    const harness = createHarness();
    await openEconomy(harness);
    const initial = harness.bank.readCurrent();
    const committedInput = command(initial, 'committed-before-generation', {
        productId: 'short-term',
        amount: 100,
    });
    const committed = await harness.bank.openDeposit(committedInput);
    const committedCalls = harness.calls();
    harness.state.saveCount = 0;
    harness.state.generationActive = true;

    const replay = await harness.bank.openDeposit(committedInput);
    assert.equal(replay.revision, committed.revision);
    assert.deepEqual(harness.calls(), committedCalls);

    await assert.rejects(harness.bank.openDeposit(command(committed, 'generation-write', {
        productId: 'short-term',
        amount: 100,
    })), /bank_main_generation_active/);
    assert.deepEqual(harness.calls(), committedCalls);
    assert.equal(harness.state.saveCount, 0);
});

async function openEconomy(harness, grant = 0) {
    await harness.economy.ensureCurrent();
    if (grant > 0) {
        await harness.economy.postCurrent({
            idempotencyKey: `test:bank-grant:${grant}`,
            actionId: `test:bank-grant:${grant}`,
            fromAccountId: 'system:mint',
            toAccountId: 'player',
            amount: grant,
            kind: 'test_grant',
            title: '测试资金',
            sourceDomain: 'test',
            sourceId: `grant-${grant}`,
        });
    }
    harness.state.saveCount = 0;
    harness.state.saves.length = 0;
}

function command(view, actionId, intent = {}) {
    return {
        actionId,
        expectedRevision: view.revision,
        expectedEventId: view.eventId,
        ...intent,
    };
}

function bankTransactions(harness, actionId) {
    return harness.economy.readCurrent().transactions.filter(transaction => transaction.actionId === actionId);
}

test('read-only view stays safe and opening a deposit atomically commits Bank and Economy once', async () => {
    const harness = createHarness();
    await openEconomy(harness);

    const empty = harness.bank.readCurrent();
    assert.equal(empty.balance, 100);
    assert.equal(empty.revision, 0);
    assert.equal(empty.writeState, 'ready');
    assert.equal(harness.store.readCurrent().domains.bank, undefined);
    assert.equal(harness.state.saveCount, 0);

    const opened = await harness.bank.openDeposit(command(empty, 'open-deposit', {
        productId: 'short-term',
        amount: 100,
    }));

    assert.equal(harness.state.saveCount, 1);
    assert.equal(opened.balance, 0);
    assert.equal(opened.lockedAmount, 100);
    assert.equal(opened.deposits[0].id, 'bank-position-1');
    assert.equal(Object.hasOwn(opened, 'domain'), false);
    const saved = harness.state.saves[0].xiaobaiOs;
    assert.equal(saved.domains.bank.events.length, 1);
    assert.equal(saved.domains.economy.transactions.length, 2);
    assert.deepEqual(saved.domains.economy.transactions[1], {
        id: 'tx-2',
        sequence: 2,
        idempotencyKey: 'bank:event:1:leg:1',
        actionId: 'open-deposit',
        fromAccountId: 'player',
        toAccountId: 'escrow:bank:bank-position-1',
        amount: 100,
        kind: 'bank_position_open',
        title: '银行头寸开立',
        note: '',
        sourceDomain: 'bank',
        sourceId: 'open-deposit',
        anchor: saved.domains.bank.events[0].anchor,
        createdAt: saved.domains.economy.transactions[1].createdAt,
    });
    assert.deepEqual(harness.chat.persisted, harness.store.readCurrent());
});

test('early withdrawal settles every other due position in the same action and closes each escrow', async () => {
    const harness = createHarness();
    await openEconomy(harness, 1_000);
    let view = harness.bank.readCurrent();
    view = await harness.bank.openDeposit(command(view, 'open-short', {
        productId: 'short-term', amount: 100,
    }));
    view = await harness.bank.openDeposit(command(view, 'open-mid', {
        productId: 'mid-term', amount: 200,
    }));
    harness.addAssistant(10);
    const savesBefore = harness.state.saveCount;

    const withdrawn = await harness.bank.withdrawDeposit(command(view, 'withdraw-mid', {
        positionId: 'bank-position-2',
    }));

    assert.equal(harness.state.saveCount, savesBefore + 1);
    assert.equal(withdrawn.deposits.length, 0);
    assert.equal(withdrawn.balance, 1_096);
    const event = harness.store.readCurrent().domains.bank.events.at(-1);
    assert.deepEqual(event.command, {
        kind: 'deposit-withdraw-early',
        positionId: 'bank-position-2',
        settledPositionIds: ['bank-position-1'],
    });
    assert.deepEqual(event.result.activities.map(activity => ({
        sourceId: activity.sourceId,
        payout: activity.payout,
        outcome: activity.detail.outcome,
    })), [
        { sourceId: 'bank-position-1', payout: 106, outcome: 'matured' },
        { sourceId: 'bank-position-2', payout: 190, outcome: 'withdrawn-early' },
    ]);
    const balances = projectBalances(harness.economy.readCurrent());
    assert.equal(balances['escrow:bank:bank-position-1'], 0);
    assert.equal(balances['escrow:bank:bank-position-2'], 0);
    assert.equal(balances['system:sink'], 10);
});

test('an early-withdraw target that became due fails atomically instead of being pre-settled', async () => {
    const harness = createHarness();
    await openEconomy(harness);
    const opened = await harness.bank.openDeposit(command(harness.bank.readCurrent(), 'open-due', {
        productId: 'short-term', amount: 100,
    }));
    harness.addAssistant(10);
    const before = harness.store.readCurrent();
    const savesBefore = harness.state.saveCount;

    await assert.rejects(
        harness.bank.withdrawDeposit(command(opened, 'late-early-withdraw', {
            positionId: 'bank-position-1',
        })),
        error => error.code === 'bank_position_state_changed',
    );

    assert.deepEqual(harness.store.readCurrent(), before);
    assert.equal(harness.state.saveCount, savesBefore);
    assert.equal(harness.bank.readCurrent().deposits[0].claimable, true);
    assert.equal(projectBalances(harness.economy.readCurrent())['escrow:bank:bank-position-1'], 100);
});

test('fund replay compares explicit intent before CAS and never regenerates IDs or resamples return', async () => {
    const harness = createHarness([2_500]);
    await openEconomy(harness, 200);
    const input = command(harness.bank.readCurrent(), 'stable-fund', {
        productId: 'steady-fund', amount: 200,
    });
    const first = await harness.bank.openFund(input);
    const callsAfterFirst = harness.calls();
    harness.addAssistant(1);

    const replay = await harness.bank.openFund({
        ...input,
        expectedRevision: -1,
        expectedEventId: ' stale ',
    });

    assert.equal(replay.revision, 1);
    assert.equal(replay.investments[0].claimable, false);
    assert.deepEqual(harness.calls(), callsAfterFirst);
    assert.equal(harness.state.saveCount, 1);
    assert.equal(harness.store.readCurrent().domains.bank.events[0].result.changes[0].position.resolvedReturnBps, 2_000);

    await assert.rejects(
        harness.bank.openFund({ ...input, amount: 201 }),
        error => error.code === 'bank_action_conflict',
    );
    assert.deepEqual(harness.calls(), callsAfterFirst);
    assert.equal(harness.state.saveCount, 1);
    assert.equal(first.eventId, replay.eventId);
});

test('replaying a retained action commits the reconciled Bank and Economy root', async () => {
    const harness = createHarness();
    await openEconomy(harness);
    const input = command(harness.bank.readCurrent(), 'branch-open', {
        productId: 'short-term', amount: 100,
    });
    const opened = await harness.bank.openDeposit(input);
    harness.addAssistant(10);
    await harness.bank.settleDue(command(opened, 'branch-settle'));
    harness.chat.story.messages[10].text = '改写后的回复';
    const callsBefore = harness.calls();
    const savesBefore = harness.state.saveCount;

    const replay = await harness.bank.openDeposit(input);

    assert.equal(replay.revision, 1);
    assert.equal(replay.deposits.length, 1);
    assert.equal(replay.balance, 0);
    assert.equal(harness.store.readCurrent().domains.bank.events.length, 1);
    assert.equal(harness.economy.readCurrent().transactions.length, 2);
    assert.equal(projectBalances(harness.economy.readCurrent())['escrow:bank:bank-position-1'], 100);
    assert.deepEqual(harness.calls(), callsBefore);
    assert.equal(harness.state.saveCount, savesBefore + 1);
});

test('settleDue builds exact profit and loss legs with one source and zeroes both escrows', async () => {
    const harness = createHarness([2_500, 0]);
    await openEconomy(harness, 2_000);
    let view = await harness.bank.openFund(command(harness.bank.readCurrent(), 'open-profit', {
        productId: 'steady-fund', amount: 200,
    }));
    view = await harness.bank.openFund(command(view, 'open-loss', {
        productId: 'growth-fund', amount: 500,
    }));
    harness.addAssistant(30);

    const settled = await harness.bank.settleDue(command(view, 'settle-funds'));

    assert.equal(settled.investments.length, 0);
    assert.equal(settled.balance, 2_040);
    assert.deepEqual(bankTransactions(harness, 'settle-funds').map(transaction => ({
        from: transaction.fromAccountId,
        to: transaction.toAccountId,
        amount: transaction.amount,
        kind: transaction.kind,
        sourceDomain: transaction.sourceDomain,
        sourceId: transaction.sourceId,
    })), [
        {
            from: 'counterparty:bank:reserve', to: 'escrow:bank:bank-position-1', amount: 40,
            kind: 'bank_position_profit', sourceDomain: 'bank', sourceId: 'settle-funds',
        },
        {
            from: 'escrow:bank:bank-position-1', to: 'player', amount: 240,
            kind: 'bank_position_payout', sourceDomain: 'bank', sourceId: 'settle-funds',
        },
        {
            from: 'escrow:bank:bank-position-2', to: 'player', amount: 400,
            kind: 'bank_position_payout', sourceDomain: 'bank', sourceId: 'settle-funds',
        },
        {
            from: 'escrow:bank:bank-position-2', to: 'system:sink', amount: 100,
            kind: 'bank_position_loss', sourceDomain: 'bank', sourceId: 'settle-funds',
        },
    ]);
    const balances = projectBalances(harness.economy.readCurrent());
    assert.equal(balances['escrow:bank:bank-position-1'], 0);
    assert.equal(balances['escrow:bank:bank-position-2'], 0);
    assert.equal(bankTransactions(harness, 'settle-funds').some(transaction => transaction.amount === 0), false);
});

test('insufficient funds, stale CAS and action conflicts do not sample or save', async () => {
    const harness = createHarness([0]);
    await openEconomy(harness);
    const empty = harness.bank.readCurrent();

    await assert.rejects(
        harness.bank.openFund(command(empty, 'insufficient-fund', {
            productId: 'steady-fund', amount: 200,
        })),
        error => error.code === 'economy_insufficient_funds',
    );
    assert.deepEqual(harness.calls(), {
        eventId: 0, positionId: 0, activityId: 0, random: 0, transactionId: 1,
    });
    assert.equal(harness.state.saveCount, 0);

    const opened = await harness.bank.openDeposit(command(empty, 'first-action', {
        productId: 'short-term', amount: 100,
    }));
    const before = harness.store.readCurrent();
    await assert.rejects(
        harness.bank.openFund(command(empty, 'stale-fund', {
            productId: 'steady-fund', amount: 200,
        })),
        error => error.code === 'bank_revision_conflict',
    );
    await assert.rejects(
        harness.bank.openDeposit(command(opened, 'first-action', {
            productId: 'short-term', amount: 101,
        })),
        error => error.code === 'bank_action_conflict',
    );
    assert.deepEqual(harness.store.readCurrent(), before);
    assert.equal(harness.calls().random, 0);
    assert.equal(harness.state.saveCount, 1);
});

test('save failure rolls back both domains while unconfirmed save freezes one sampled candidate', async () => {
    const failed = createHarness([0]);
    await openEconomy(failed, 100);
    const before = failed.store.readCurrent();
    failed.state.saveImpl = async () => {
        throw Object.assign(new Error('save unavailable'), { code: 'SAVE_UNAVAILABLE' });
    };

    await assert.rejects(
        failed.bank.openFund(command(failed.bank.readCurrent(), 'failed-fund', {
            productId: 'steady-fund', amount: 200,
        })),
        error => error.code === 'SAVE_UNAVAILABLE',
    );
    assert.deepEqual(failed.store.readCurrent(), before);
    assert.equal(failed.bank.readCurrent().revision, 0);
    assert.equal(failed.bank.readCurrent().balance, 200);
    assert.equal(failed.bank.getWriteState(), 'ready');
    assert.equal(failed.calls().random, 1);

    const pending = createHarness([2_500]);
    await openEconomy(pending, 100);
    pending.state.saveImpl = async transaction => {
        pending.state.persist(transaction);
        throw Object.assign(new Error('save result unknown'), { code: 'SAVE_UNCONFIRMED', uncertain: true });
    };
    const input = command(pending.bank.readCurrent(), 'pending-fund', {
        productId: 'steady-fund', amount: 200,
    });
    await assert.rejects(pending.bank.openFund(input), error => error.code === 'SAVE_UNCONFIRMED');
    assert.equal(pending.bank.readCurrent().revision, 1);
    assert.equal(pending.bank.getWriteState(), 'unconfirmed');
    assert.equal(pending.calls().random, 1);
    await assert.rejects(pending.bank.openFund(input), error => error.code === 'SAVE_UNCONFIRMED');
    assert.equal(pending.calls().random, 1);
    assert.equal(pending.state.saveCount, 1);

    assert.deepEqual(await pending.bank.confirmPending(), { status: 'confirmed' });
    assert.equal(pending.bank.getWriteState(), 'ready');
    assert.equal(pending.calls().random, 1);
});

test('story rollback restores Bank positions and Economy escrow on the same prefix', async () => {
    const harness = createHarness();
    await openEconomy(harness);
    const opened = await harness.bank.openDeposit(command(harness.bank.readCurrent(), 'rollback-open', {
        productId: 'short-term', amount: 100,
    }));
    harness.addAssistant(10);
    await harness.bank.settleDue(command(opened, 'rollback-settle'));
    const runtime = createStoryReconciliationRuntime(
        harness.storyAdapter,
        harness.store,
        harness.gate,
        [{
            key: 'bank',
            hasData: root => Boolean(root?.domains.bank)
                || Boolean(root?.domains.economy?.transactions?.some(transaction => transaction.sourceDomain === 'bank')),
            reconcile(root, fingerprint) {
                return { root: reconcileBankRootWithStory(root, fingerprint), impact: null };
            },
        }],
    );

    harness.chat.story.messages[10].text = '被重写的最后回复';
    assert.equal((await runtime.reconcileNow()).status, 'ready');
    let view = harness.bank.readCurrent();
    assert.equal(view.revision, 1);
    assert.equal(view.balance, 0);
    assert.equal(view.deposits[0].claimable, true);
    assert.equal(projectBalances(harness.economy.readCurrent())['escrow:bank:bank-position-1'], 100);
    validateBankEconomyConsistency(harness.store.readCurrent());

    harness.chat.story.messages[0].text = '被重写的开场';
    assert.equal((await runtime.reconcileNow()).status, 'ready');
    view = harness.bank.readCurrent();
    assert.equal(view.revision, 0);
    assert.equal(view.balance, 100);
    assert.equal(harness.store.readCurrent().domains.bank, undefined);
    assert.equal(harness.economy.readCurrent().transactions.length, 1);

    const corrupt = structuredClone(harness.state.saves[0].xiaobaiOs);
    corrupt.domains.economy.transactions[1].sourceId = 'wrong-action-source';
    assert.throws(
        () => validateBankEconomyConsistency(corrupt),
        error => error.code === 'bank_economy_inconsistent',
    );
});
