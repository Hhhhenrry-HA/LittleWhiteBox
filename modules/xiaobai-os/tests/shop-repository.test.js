import assert from 'node:assert/strict';
import test from 'node:test';

import { validateLedger } from '../domains/economy/invariants.js';
import { createEconomyRepository } from '../domains/economy/repository.js';
import { validateShopDomain } from '../domains/shop/invariants.js';
import { createShopService } from '../apps/shop/application/service.js';
import {
    reconcileShopRootWithStory,
    validateShopEconomyConsistency,
} from '../apps/shop/application/root-protocol.js';
import { createChatDataStore } from '../host/chat-data-store.js';
import { createStoryActionRunner } from '../host/story-action-runner.js';
import { createStoryReconciliationRuntime } from '../host/story-reconciliation-runtime.js';
import { createStoryWriteGate } from '../host/story-write-gate.js';

function deferred() {
    let resolve;
    const promise = new Promise(resolvePromise => { resolve = resolvePromise; });
    return { promise, resolve };
}

async function waitUntil(predicate, attempts = 100) {
    for (let attempt = 0; attempt < attempts; attempt += 1) {
        if (predicate()) return;
        await new Promise(resolve => globalThis.setImmediate(resolve));
    }
    throw new Error('condition_not_reached');
}

function createHarness() {
    const identities = {
        a: { key: 'character:1:chat-a', chatId: 'chat-a' },
        b: { key: 'character:2:chat-b', chatId: 'chat-b' },
    };
    const chats = new Map(Object.values(identities).map(identity => [identity.key, {
        metadata: {},
        persisted: undefined,
        story: {
            identityKey: identity.key,
            messages: [{ role: 'user', name: '主人', text: `开场 ${identity.chatId}` }],
        },
    }]));
    const state = {
        identity: identities.a,
        identityReads: 0,
        generationActive: false,
        saveCount: 0,
        saves: [],
        persist(transaction) {
            chats.get(transaction.identity.key).persisted = structuredClone(transaction.xiaobaiOs);
        },
        saveImpl: null,
    };
    state.saveImpl = async transaction => { state.persist(transaction); };

    const store = createChatDataStore({
        getChatIdentity() {
            state.identityReads += 1;
            return state.identity;
        },
        getChatMetadata: identity => chats.get(identity?.key)?.metadata ?? null,
        async saveChatMetadata(transaction) {
            state.saveCount += 1;
            state.saves.push(structuredClone(transaction));
            await state.saveImpl(transaction);
        },
        readPersistedXiaobaiOs: async identity => structuredClone(chats.get(identity.key)?.persisted),
    }, {
        domains: { economy: validateLedger, shop: validateShopDomain },
        root: validateShopEconomyConsistency,
    });
    const storyAdapter = {
        captureCurrent() {
            return structuredClone(chats.get(state.identity.key).story);
        },
        async readPersistedCurrent(expectedIdentityKey) {
            return structuredClone(chats.get(expectedIdentityKey).story);
        },
        subscribeChanges: () => () => {},
    };
    const gate = createStoryWriteGate();
    const runner = createStoryActionRunner(store, storyAdapter, gate, async () => {});
    let clock = 1_000;
    let transactionId = 0;
    let eventId = 0;
    let activationId = 0;
    const now = () => ++clock;
    const createTransactionId = () => `tx-${++transactionId}`;
    const economy = createEconomyRepository(store, {
        now,
        createId: createTransactionId,
        actionRunner: runner,
    });
    const shop = createShopService(store, runner, {
        now,
        createEventId: () => `shop-event-${++eventId}`,
        createTransactionId,
        createActivationId: () => `shop-activation-${++activationId}`,
        isMainGenerationActive: () => state.generationActive,
    });

    return {
        chats,
        economy,
        gate,
        identities,
        shop,
        state,
        store,
        storyAdapter,
        currentChat() {
            return chats.get(state.identity.key);
        },
        switchChat(chat) {
            state.identity = identities[chat];
        },
    };
}

async function openEconomy(harness) {
    await harness.economy.ensureCurrent();
    harness.state.saveCount = 0;
    harness.state.saves.length = 0;
}

function purchaseInput(view, actionId, itemId = 'flower') {
    return {
        actionId,
        itemId,
        expectedRevision: view.projection.revision,
        expectedEventId: view.projection.eventId,
    };
}

function activateInput(view, actionId, itemId, parameters = {}) {
    return {
        actionId,
        itemId,
        parameters,
        expectedRevision: view.projection.revision,
        expectedEventId: view.projection.eventId,
    };
}

function deactivateInput(view, actionId, itemId, activationId) {
    return {
        actionId,
        itemId,
        activationId,
        expectedRevision: view.projection.revision,
        expectedEventId: view.projection.eventId,
    };
}

test('purchase commits balance and inventory together in one root save', async () => {
    const harness = createHarness();
    await openEconomy(harness);

    const purchased = await harness.shop.purchaseCurrent(
        purchaseInput(harness.shop.readCurrent(), 'buy-flower'),
    );

    assert.equal(harness.state.saveCount, 1);
    assert.equal(purchased.balance, 50);
    assert.equal(purchased.projection.inventory.flower.quantity, 1);
    assert.equal(purchased.domain.events.length, 1);
    assert.equal(harness.economy.readCurrent().transactions.length, 2);
    assert.equal(harness.state.saves[0].xiaobaiOs.domains.shop.events.length, 1);
    assert.equal(harness.state.saves[0].xiaobaiOs.domains.economy.transactions.length, 2);
    assert.deepEqual(harness.currentChat().persisted, harness.store.readCurrent());
});

test('insufficient funds and stale CAS leave both domains unchanged and do not save', async () => {
    const harness = createHarness();
    await openEconomy(harness);
    const empty = harness.shop.readCurrent();
    const beforeInsufficientFunds = harness.store.readCurrent();

    await assert.rejects(
        harness.shop.purchaseCurrent(purchaseInput(empty, 'buy-gift', 'gift-box')),
        error => error.code === 'economy_insufficient_funds',
    );
    assert.deepEqual(harness.store.readCurrent(), beforeInsufficientFunds);
    assert.equal(harness.state.saveCount, 0);

    await harness.shop.purchaseCurrent(purchaseInput(empty, 'buy-flower'));
    const beforeStaleCas = harness.store.readCurrent();
    await assert.rejects(
        harness.shop.purchaseCurrent(purchaseInput(empty, 'stale-buy')),
        error => error.code === 'shop_revision_conflict',
    );
    assert.deepEqual(harness.store.readCurrent(), beforeStaleCas);
    assert.equal(harness.state.saveCount, 1);
});

test('replaying one actionId does not charge, add inventory or save again', async () => {
    const harness = createHarness();
    await openEconomy(harness);
    const input = purchaseInput(harness.shop.readCurrent(), 'stable-purchase');
    const first = await harness.shop.purchaseCurrent(input);
    harness.currentChat().story.messages.push({ role: 'assistant', name: '角色', text: '后续剧情' });

    const replay = await harness.shop.purchaseCurrent(input);

    assert.equal(harness.state.saveCount, 1);
    assert.equal(replay.balance, 50);
    assert.equal(replay.projection.inventory.flower.quantity, 1);
    assert.equal(replay.domain.events.length, 1);
    assert.equal(replay.domain.events[0].eventId, first.domain.events[0].eventId);
    assert.equal(harness.economy.readCurrent().transactions.length, 2);
});

test('an explicit save failure rolls back balance and inventory together', async () => {
    const harness = createHarness();
    await openEconomy(harness);
    const before = harness.store.readCurrent();
    harness.state.saveImpl = async () => {
        throw Object.assign(new Error('save unavailable'), { code: 'SAVE_UNAVAILABLE' });
    };

    await assert.rejects(
        harness.shop.purchaseCurrent(purchaseInput(harness.shop.readCurrent(), 'failed-purchase')),
        error => error.code === 'SAVE_UNAVAILABLE',
    );

    assert.deepEqual(harness.store.readCurrent(), before);
    assert.equal(harness.shop.readCurrent().balance, 100);
    assert.equal(harness.shop.readCurrent().domain, null);
    assert.equal(harness.state.saveCount, 1);
    assert.equal(harness.shop.getWriteState(), 'ready');
});

test('an unconfirmed purchase keeps one candidate, freezes writes and unlocks after confirmation', async () => {
    const harness = createHarness();
    await openEconomy(harness);
    harness.state.saveImpl = async transaction => {
        harness.state.persist(transaction);
        throw Object.assign(new Error('save result unknown'), { code: 'SAVE_UNCONFIRMED', uncertain: true });
    };

    await assert.rejects(
        harness.shop.purchaseCurrent(purchaseInput(harness.shop.readCurrent(), 'pending-purchase')),
        error => error.code === 'SAVE_UNCONFIRMED',
    );
    const candidate = harness.shop.readCurrent();
    assert.equal(candidate.balance, 50);
    assert.equal(candidate.projection.inventory.flower.quantity, 1);
    assert.equal(harness.shop.getWriteState(), 'unconfirmed');

    await assert.rejects(
        harness.shop.activateCurrent(activateInput(candidate, 'blocked-use', 'flower', { targetName: '艾拉' })),
        error => error.code === 'SAVE_UNCONFIRMED',
    );
    assert.equal(harness.state.saveCount, 1);
    assert.equal(harness.shop.readCurrent().projection.inventory.flower.quantity, 1);

    assert.deepEqual(await harness.shop.confirmPending(), { status: 'confirmed' });
    assert.equal(harness.shop.getWriteState(), 'ready');
    harness.state.saveImpl = async transaction => { harness.state.persist(transaction); };
    const activated = await harness.shop.activateCurrent(
        activateInput(harness.shop.readCurrent(), 'confirmed-use', 'flower', { targetName: '艾拉' }),
    );
    assert.equal(activated.projection.inventory.flower.quantity, 0);
    assert.equal(harness.economy.readCurrent().transactions.length, 2);
});

test('activate and deactivate are generation-guarded and never append Economy transactions', async () => {
    const harness = createHarness();
    await openEconomy(harness);
    await harness.economy.postCurrent({
        idempotencyKey: 'test:fund-manual-item',
        actionId: 'test:fund-manual-item',
        fromAccountId: 'system:mint',
        toAccountId: 'player',
        amount: 1_200,
        kind: 'test_grant',
        title: '测试资金',
        sourceDomain: 'test',
        sourceId: 'manual-item',
    });
    harness.state.saveCount = 0;
    harness.state.saves.length = 0;
    const purchased = await harness.shop.purchaseCurrent(
        purchaseInput(harness.shop.readCurrent(), 'buy-camera', 'privacy-camera'),
    );
    const transactionCount = harness.economy.readCurrent().transactions.length;

    harness.state.generationActive = true;
    await assert.rejects(
        harness.shop.activateCurrent(activateInput(
            purchased,
            'blocked-camera-use',
            'privacy-camera',
            { targetName: '艾拉' },
        )),
        /shop_main_generation_active/,
    );
    assert.equal(harness.state.saveCount, 1);
    assert.equal(harness.economy.readCurrent().transactions.length, transactionCount);

    harness.state.generationActive = false;
    const activated = await harness.shop.activateCurrent(activateInput(
        purchased,
        'use-camera',
        'privacy-camera',
        { targetName: '艾拉' },
    ));
    assert.equal(harness.economy.readCurrent().transactions.length, transactionCount);

    harness.state.generationActive = true;
    await assert.rejects(
        harness.shop.deactivateCurrent(deactivateInput(
            activated,
            'blocked-camera-close',
            'privacy-camera',
            'shop-activation-1',
        )),
        /shop_main_generation_active/,
    );
    assert.equal(harness.state.saveCount, 2);
    assert.equal(harness.economy.readCurrent().transactions.length, transactionCount);

    harness.state.generationActive = false;
    const deactivated = await harness.shop.deactivateCurrent(deactivateInput(
        activated,
        'close-camera',
        'privacy-camera',
        'shop-activation-1',
    ));
    assert.equal(deactivated.projection.activations[0].deactivatedByEventId, 'shop-event-3');
    assert.equal(harness.economy.readCurrent().transactions.length, transactionCount);
    assert.equal(harness.state.saveCount, 3);
});

test('a queued purchase stays bound to its original chat when the active chat changes', async () => {
    const harness = createHarness();
    await openEconomy(harness);
    const saveStarted = deferred();
    const releaseSave = deferred();
    harness.state.saveImpl = async transaction => {
        harness.state.persist(transaction);
        saveStarted.resolve();
        await releaseSave.promise;
    };

    const first = harness.shop.purchaseCurrent(
        purchaseInput(harness.shop.readCurrent(), 'first-a-purchase'),
    );
    const firstRejection = assert.rejects(first, error => error.code === 'CHAT_CHANGED');
    await saveStarted.promise;
    const identityReadsBeforeQueue = harness.state.identityReads;
    const queued = harness.shop.purchaseCurrent({
        actionId: 'queued-a-purchase',
        itemId: 'flower',
        expectedRevision: 1,
        expectedEventId: 'shop-event-1',
    });
    const queuedRejection = assert.rejects(queued, error => error.code === 'CHAT_CHANGED');
    await waitUntil(() => harness.state.identityReads > identityReadsBeforeQueue + 1);

    harness.switchChat('b');
    releaseSave.resolve();
    await firstRejection;
    await queuedRejection;

    assert.deepEqual(harness.chats.get(harness.identities.b.key).metadata, {});
    const chatARoot = harness.chats.get(harness.identities.a.key).metadata.extensions.LittleWhiteBox.xiaobaiOs;
    assert.equal(chatARoot.domains.shop.events.length, 1);
    assert.equal(chatARoot.domains.economy.transactions.length, 2);
    assert.equal(harness.state.saveCount, 1);
});

test('story rollback keeps Shop inventory and Economy balance on the same valid prefix', async () => {
    const harness = createHarness();
    await openEconomy(harness);
    const purchased = await harness.shop.purchaseCurrent(
        purchaseInput(harness.shop.readCurrent(), 'rollback-purchase'),
    );
    harness.currentChat().story.messages.push({ role: 'assistant', name: '角色', text: '原回复' });
    await harness.shop.activateCurrent(
        activateInput(purchased, 'rollback-use', 'flower', { targetName: '艾拉' }),
    );
    const runtime = createStoryReconciliationRuntime(
        harness.storyAdapter,
        harness.store,
        harness.gate,
        [{
            key: 'shop',
            hasData: root => Boolean(root?.domains.shop),
            reconcile(root, fingerprint) {
                return { root: reconcileShopRootWithStory(root, fingerprint), impact: null };
            },
        }],
    );

    harness.currentChat().story.messages[1].text = '重写回复';
    assert.equal((await runtime.reconcileNow()).status, 'ready');
    let view = harness.shop.readCurrent();
    assert.equal(view.balance, 50);
    assert.equal(view.projection.inventory.flower.quantity, 1);
    assert.equal(view.domain.events.length, 1);
    assert.equal(harness.economy.readCurrent().transactions.length, 2);

    harness.currentChat().story.messages[0].text = '重写开场';
    assert.equal((await runtime.reconcileNow()).status, 'ready');
    view = harness.shop.readCurrent();
    assert.equal(view.balance, 100);
    assert.equal(view.domain, null);
    assert.equal(view.projection.revision, 0);
    assert.equal(harness.economy.readCurrent().transactions.length, 1);
});
