import assert from 'node:assert/strict';
import test from 'node:test';

import { createWalletController } from '../apps/wallet/host/controller.js';
import { ensureEconomy, postTransaction } from '../domains/economy/ledger.js';
import { createEconomyRepository } from '../domains/economy/repository.js';
import { createChatDataStore } from '../host/chat-data-store.js';
import { EMPTY_STORY_PREFIX_HASH } from '../types.js';

function deferred() {
    let resolve;
    const promise = new Promise(resolvePromise => { resolve = resolvePromise; });
    return { promise, resolve };
}

function createHarness({ openingResult = 'confirmed', ledger = null } = {}) {
    const identity = { key: 'character:1:chat-a', chatId: 'chat-a' };
    const metadata = {};
    const host = {
        identity,
        metadata,
        persisted: undefined,
        posts: [],
        saveCount: 0,
    };
    if (ledger) {
        const root = { schemaVersion: 2, apps: {}, domains: { economy: structuredClone(ledger) } };
        host.metadata.extensions = { LittleWhiteBox: { xiaobaiOs: root } };
        host.persisted = structuredClone(root);
    }
    const store = createChatDataStore({
        getChatIdentity: () => host.identity,
        getChatMetadata: current => current?.key === host.identity.key ? host.metadata : null,
        async saveChatMetadata(transaction) {
            host.saveCount += 1;
            if (openingResult === 'failed' && host.saveCount === 1) {
                throw Object.assign(new Error('save unavailable'), { code: 'SAVE_UNAVAILABLE' });
            }
            if (openingResult !== 'unconfirmed-rejected') {
                host.persisted = structuredClone(transaction.xiaobaiOs);
            }
            if (openingResult.startsWith('unconfirmed') && host.saveCount === 1) {
                throw Object.assign(new Error('read-back unavailable'), {
                    code: 'SAVE_UNCONFIRMED',
                    uncertain: true,
                });
            }
        },
        readPersistedXiaobaiOs: async () => structuredClone(host.persisted),
    });
    let id = 0;
    const economy = createEconomyRepository(store, {
        now: () => 1_000 + id,
        createId: () => `tx-${++id}`,
    });
    let storyState = { identityKey: identity.key, status: 'ready', message: '' };
    const storyListeners = new Set();
    const storyRuntime = {
        reconcileNow: async () => storyState,
        getState: () => storyState,
        subscribe(listener) {
            storyListeners.add(listener);
            return () => storyListeners.delete(listener);
        },
        publish(next) {
            storyState = next;
            storyListeners.forEach(listener => listener(next));
        },
    };
    const controller = createWalletController({
        economy,
        storyRuntime,
        getChatIdentity: () => host.identity,
    });
    controller.startBackground();
    return { controller, economy, host, storyRuntime };
}

function ledgerWithTransactions(count) {
    let id = 0;
    const dependencies = { now: () => 2_000 + id, createId: () => `fixture-${++id}` };
    let ledger = ensureEconomy(undefined, dependencies);
    for (let index = 1; index < count; index += 1) {
        ledger = postTransaction(ledger, {
            idempotencyKey: `fixture:${index}`,
            actionId: `fixture:${index}`,
            fromAccountId: 'system:mint',
            toAccountId: 'player',
            amount: 1,
            kind: 'fixture_grant',
            title: `第 ${index} 笔`,
            sourceDomain: 'fixture',
            sourceId: String(index),
            anchor: { floor: -1, prefixHash: EMPTY_STORY_PREFIX_HASH },
        }, dependencies).ledger;
    }
    return ledger;
}

test('wallet activation opens exactly once, exposes a read-only ledger and publishes story status', async () => {
    const { controller, host, storyRuntime } = createHarness();
    const state = await controller.activate({
        post: (type, payload) => { host.posts.push({ type, payload }); return true; },
    });

    assert.equal(state.balance, 100);
    assert.equal(state.transactions.length, 1);
    assert.equal(state.transactions[0].title, '开户赠礼');
    assert.equal(host.saveCount, 1);

    await controller.handleMessage({ type: 'wallet/refresh', payload: { chatIdentity: host.identity.key } });
    assert.equal(host.saveCount, 1);
    await assert.rejects(
        controller.handleMessage({ type: 'wallet/post', payload: { chatIdentity: host.identity.key } }),
        /未知的钱包操作/,
    );

    storyRuntime.publish({
        identityKey: host.identity.key,
        status: 'reconciling',
        message: '剧情已变化，正在核对账本',
    });
    const pushed = host.posts.findLast(item => item.type === 'wallet/state');
    assert.equal(pushed.payload.state.status, 'reconciling');
});

test('an unconfirmed opening still opens the wallet with its frozen candidate and can be confirmed', async () => {
    const { controller, host } = createHarness({ openingResult: 'unconfirmed-confirmed' });
    const state = await controller.activate({ post: () => true });

    assert.equal(state.balance, 100);
    assert.equal(state.status, 'unconfirmed');
    const result = await controller.handleMessage({
        type: 'wallet/confirm-save',
        payload: { chatIdentity: host.identity.key },
    });
    assert.equal(result.confirmation, 'confirmed');
    assert.equal(result.state.status, 'ready');
    assert.equal(result.state.balance, 100);
});

test('a rejected or explicitly failed opening never remains visible as a successful wallet', async () => {
    const rejected = createHarness({ openingResult: 'unconfirmed-rejected' });
    const candidate = await rejected.controller.activate({ post: () => true });
    assert.equal(candidate.status, 'unconfirmed');
    assert.equal(candidate.balance, 100);
    const confirmation = await rejected.controller.handleMessage({
        type: 'wallet/confirm-save',
        payload: { chatIdentity: rejected.host.identity.key },
    });
    assert.equal(confirmation.confirmation, 'rejected');
    assert.equal(confirmation.state.balance, 0);
    assert.equal(confirmation.state.status, 'blocked');
    assert.equal(rejected.economy.hasCurrent(), false);

    const failed = createHarness({ openingResult: 'failed' });
    await assert.rejects(failed.controller.activate({ post: () => true }), error => error.code === 'SAVE_UNAVAILABLE');
    assert.equal(failed.economy.hasCurrent(), false);
    assert.equal(failed.economy.getWriteState(), 'ready');
});

test('wallet activation cannot finish in a chat that changed while reconciliation was pending', async () => {
    const { controller, host, storyRuntime } = createHarness({ ledger: ledgerWithTransactions(2) });
    const pending = deferred();
    storyRuntime.reconcileNow = () => pending.promise;
    const activation = controller.activate({ post: () => true });
    host.identity = { key: 'character:2:chat-b', chatId: 'chat-b' };
    pending.resolve({ identityKey: 'character:1:chat-a', status: 'ready', message: '' });

    await assert.rejects(activation, /聊天已切换/);
    await assert.rejects(
        controller.handleMessage({ type: 'wallet/refresh', payload: { chatIdentity: 'character:1:chat-a' } }),
        /钱包 APP 未激活/,
    );
});

test('wallet loads ledger pages without duplicating or skipping the cursor boundary', async () => {
    const { controller, host } = createHarness({ ledger: ledgerWithTransactions(22) });
    const state = await controller.activate({ post: () => true });

    assert.equal(state.transactions.length, 18);
    assert.deepEqual(state.transactions.map(transaction => transaction.sequence), [
        22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5,
    ]);
    assert.equal(state.nextCursor, 5);
    const page = await controller.handleMessage({
        type: 'wallet/load-more',
        payload: { chatIdentity: host.identity.key, beforeSequence: state.nextCursor },
    });
    assert.deepEqual(page.transactions.map(transaction => transaction.sequence), [4, 3, 2, 1]);
    assert.equal(page.nextCursor, null);
    assert.equal(page.hasMore, false);
});
