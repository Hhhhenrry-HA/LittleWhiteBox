import assert from 'node:assert/strict';
import test from 'node:test';

import { createWalletController } from '../apps/wallet/host/controller.js';
import { ensureEconomy, postTransaction } from '../domains/economy/ledger.js';
import { createEconomyRepository } from '../domains/economy/repository.js';
import { createChatDataStore } from '../host/chat-data-store.js';

function nextTask() {
    return new Promise(resolve => setTimeout(resolve, 0));
}

function deferred() {
    let resolve;
    const promise = new Promise(resolvePromise => {resolve = resolvePromise;});
    return { promise, resolve };
}

async function waitForPost(host, type) {
    for (let attempt = 0; attempt < 10; attempt += 1) {
        const found = host.posts.findLast(item => item.type === type);
        if (found) {return found;}
        await nextTask();
    }
    assert.fail(`Timed out waiting for ${type}`);
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
        saveGate: null,
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
            if (host.saveGate) {await host.saveGate.promise;}
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
    const controller = createWalletController({
        economy,
        getChatIdentity: () => host.identity,
        subscribeData: store.subscribe,
    });
    controller.startBackground();
    return { controller, economy, host, store };
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
        }, dependencies).ledger;
    }
    return ledger;
}

function ledgerWithGameStake() {
    let id = 0;
    const dependencies = { now: () => 3_000 + id, createId: () => `game-fixture-${++id}` };
    const opening = ensureEconomy(undefined, dependencies);
    return postTransaction(opening, {
        idempotencyKey: 'game:historical:stake',
        actionId: 'game-ui:historical:1',
        fromAccountId: 'player',
        toAccountId: 'escrow:game:historical',
        amount: 10,
        kind: 'game_stake',
        title: 'Game stake escrow',
        sourceDomain: 'game',
        sourceId: 'historical',
    }, dependencies).ledger;
}

test('wallet activation opens exactly once and an existing wallet is immediately ready', async () => {
    const { controller, host } = createHarness();
    const state = await controller.activate({
        post: (type, payload) => { host.posts.push({ type, payload }); return true; },
    });

    assert.equal(state.status, 'loading');
    assert.equal(state.balance, 0);
    assert.equal(host.saveCount, 0);

    const ready = (await waitForPost(host, 'wallet/state')).payload.state;
    assert.equal(ready.balance, 100);
    assert.equal(ready.transactions.length, 1);
    assert.equal(ready.transactions[0].title, '开户赠礼');
    assert.equal(host.saveCount, 1);

    await controller.handleMessage({ type: 'wallet/refresh', payload: { chatIdentity: host.identity.key } });
    assert.equal(host.saveCount, 1);
    await assert.rejects(
        controller.handleMessage({ type: 'wallet/post', payload: { chatIdentity: host.identity.key } }),
        /未知的钱包操作/,
    );

    const existing = createHarness({ ledger: ledgerWithTransactions(2) });
    const existingState = existing.controller.activate({
        post: (type, payload) => {existing.host.posts.push({ type, payload }); return true;},
    });
    assert.equal(existingState.status, 'ready');
    assert.equal(existingState.balance, 101);
    assert.equal(existing.host.saveCount, 0);
    await nextTask();
    assert.equal(existing.host.posts.length, 0);
});

test('wallet localizes a canonical historical Game transaction without rewriting the ledger', () => {
    const ledger = ledgerWithGameStake();
    const { controller, host } = createHarness({ ledger });
    const state = controller.activate({
        post: (type, payload) => {host.posts.push({ type, payload }); return true;},
    });

    assert.equal(state.transactions[0].title, '游戏下注');
    assert.equal(ledger.transactions.find(transaction => transaction.sourceDomain === 'game').title, 'Game stake escrow');
});

test('an unconfirmed opening still opens the wallet with its frozen candidate and can be confirmed', async () => {
    const { controller, host } = createHarness({ openingResult: 'unconfirmed-confirmed' });
    const state = await controller.activate({
        post: (type, payload) => {host.posts.push({ type, payload }); return true;},
    });

    assert.equal(state.status, 'loading');
    const candidate = (await waitForPost(host, 'wallet/state')).payload.state;
    assert.equal(candidate.balance, 100);
    assert.equal(candidate.status, 'unconfirmed');
    const result = await controller.handleMessage({
        type: 'wallet/confirm-save',
        payload: { chatIdentity: host.identity.key },
    });
    assert.equal(result.confirmation, 'confirmed');
    assert.equal(result.state.status, 'ready');
    assert.equal(result.state.balance, 100);
});

test('a rejected or explicitly failed opening never remains visible as a successful wallet', async (t) => {
    t.mock.method(console, 'error', () => undefined);
    const rejected = createHarness({ openingResult: 'unconfirmed-rejected' });
    rejected.controller.activate({
        post: (type, payload) => {rejected.host.posts.push({ type, payload }); return true;},
    });
    const candidate = (await waitForPost(rejected.host, 'wallet/state')).payload.state;
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
    const opening = failed.controller.activate({
        post: (type, payload) => {failed.host.posts.push({ type, payload }); return true;},
    });
    assert.equal(opening.status, 'loading');
    const failure = (await waitForPost(failed.host, 'wallet/state')).payload.state;
    assert.equal(failure.status, 'blocked');
    assert.equal(failure.message, '钱包数据暂时无法读取，请稍后重试。');
    assert.equal(failed.economy.hasCurrent(), false);
    assert.equal(failed.economy.getWriteState(), 'ready');
});

test('wallet invalidates its active page when the chat changes', async () => {
    const { controller, host } = createHarness({ ledger: ledgerWithTransactions(2) });
    const initial = controller.activate({
        post: (type, payload) => {host.posts.push({ type, payload }); return true;},
    });
    assert.equal(initial.status, 'ready');
    host.identity = { key: 'character:2:chat-b', chatId: 'chat-b' };
    await assert.rejects(
        controller.handleMessage({ type: 'wallet/refresh', payload: { chatIdentity: 'character:1:chat-a' } }),
        /聊天已切换/,
    );
    controller.handleChatChanged();
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

test('wallet leaves a background saving state when the root commit finishes', async () => {
    const { controller, economy, host } = createHarness({ ledger: ledgerWithTransactions(2) });
    const state = controller.activate({
        post: (type, payload) => {host.posts.push({ type, payload }); return true;},
    });
    const saveGate = deferred();
    host.saveGate = saveGate;

    const write = economy.postCurrent({
        idempotencyKey: 'background:grant',
        actionId: 'background:grant',
        fromAccountId: 'system:mint',
        toAccountId: 'player',
        amount: 5,
        kind: 'background_grant',
        title: '后台入账',
        sourceDomain: 'test',
        sourceId: 'background-grant',
    });
    await nextTask();
    let pushed = host.posts.findLast(post => post.type === 'wallet/state').payload.state;
    assert.equal(pushed.status, 'saving');
    assert.equal(pushed.balance, state.balance + 5);

    saveGate.resolve();
    await write;
    pushed = host.posts.findLast(post => post.type === 'wallet/state').payload.state;
    assert.equal(pushed.status, 'ready');
    assert.equal(pushed.balance, state.balance + 5);
});
