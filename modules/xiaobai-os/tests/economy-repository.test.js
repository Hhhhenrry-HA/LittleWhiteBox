import assert from 'node:assert/strict';
import test from 'node:test';

import { createEconomyRepository } from '../domains/economy/repository.js';
import { createChatDataStore } from '../host/chat-data-store.js';

function createHarness() {
    const identity = { key: 'character:1:chat-a', chatId: 'chat-a' };
    const metadata = {};
    const state = {
        identity,
        metadata,
        persisted: undefined,
        saveCount: 0,
        save: async transaction => { state.persisted = structuredClone(transaction.xiaobaiOs); },
    };
    const store = createChatDataStore({
        getChatIdentity: () => state.identity,
        getChatMetadata: current => current?.key === state.identity.key ? state.metadata : null,
        async saveChatMetadata(transaction) {
            state.saveCount += 1;
            await state.save(transaction);
        },
        readPersistedXiaobaiOs: async () => structuredClone(state.persisted),
    });
    let id = 0;
    const economy = createEconomyRepository(store, {
        now: () => 1_000 + id,
        createId: () => `tx-${++id}`,
    });
    return { economy, state };
}

function purchase(id, amount = 20) {
    return {
        idempotencyKey: `shop:${id}:payment`,
        actionId: `shop:${id}`,
        fromAccountId: 'player',
        toAccountId: `counterparty:shop:${id}`,
        amount,
        kind: 'purchase',
        title: '购买物品',
        sourceDomain: 'shop',
        sourceId: id,
    };
}

test('economy writes do not depend on conversation content and idempotent retries do not save twice', async () => {
    const { economy, state } = createHarness();
    await economy.ensureCurrent();
    const first = await economy.postCurrent(purchase('stable-retry'));
    const savesAfterFirst = state.saveCount;

    const retry = await economy.postCurrent(purchase('stable-retry'));

    assert.equal(retry.created, false);
    assert.equal(retry.transaction.id, first.transaction.id);
    assert.equal(state.saveCount, savesAfterFirst);
    assert.equal(economy.readCurrent().transactions.length, 2);
});

test('a multi-leg action uses one confirmed root save and fails without leaving half an action', async () => {
    const { economy, state } = createHarness();
    await economy.ensureCurrent();
    const savesBefore = state.saveCount;
    const action = await economy.postActionCurrent([{
        ...purchase('fund'),
        idempotencyKey: 'task:fund:hold',
        actionId: 'task:fund',
        fromAccountId: 'player',
        toAccountId: 'escrow:task:fund',
        amount: 20,
        kind: 'escrow',
        sourceDomain: 'task',
        sourceId: 'fund',
    }, {
        ...purchase('fund'),
        idempotencyKey: 'task:fund:fee',
        actionId: 'task:fund',
        fromAccountId: 'escrow:task:fund',
        toAccountId: 'counterparty:task:issuer',
        amount: 5,
        kind: 'fee',
        sourceDomain: 'task',
        sourceId: 'fund',
    }]);

    assert.equal(state.saveCount, savesBefore + 1);
    assert.equal(action.transactions.length, 2);
    assert.equal(economy.readCurrent().transactions.length, 3);
    assert.equal(economy.getPlayerBalance(), 80);

    const beforeFailure = economy.readCurrent();
    await assert.rejects(economy.postActionCurrent([{
        ...purchase('broken'),
        idempotencyKey: 'task:broken:hold',
        actionId: 'task:broken',
        fromAccountId: 'player',
        toAccountId: 'escrow:task:broken',
        amount: 10,
        sourceDomain: 'task',
        sourceId: 'broken',
    }, {
        ...purchase('broken'),
        idempotencyKey: 'task:broken:overdraw',
        actionId: 'task:broken',
        fromAccountId: 'escrow:task:broken',
        toAccountId: 'counterparty:task:issuer',
        amount: 11,
        sourceDomain: 'task',
        sourceId: 'broken',
    }]), error => error.code === 'economy_insufficient_funds');
    assert.deepEqual(economy.readCurrent(), beforeFailure);
    assert.equal(state.saveCount, savesBefore + 1);
});

test('an explicit save failure restores the confirmed ledger and leaves writes ready', async () => {
    const { economy, state } = createHarness();
    await economy.ensureCurrent();
    state.save = async () => {
        throw Object.assign(new Error('save unavailable'), { code: 'SAVE_UNAVAILABLE' });
    };

    await assert.rejects(economy.postCurrent(purchase('failed')), error => error.code === 'SAVE_UNAVAILABLE');
    assert.equal(economy.getPlayerBalance(), 100);
    assert.equal(economy.readCurrent().transactions.length, 1);
    assert.equal(economy.getWriteState(), 'ready');
});
