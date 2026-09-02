import assert from 'node:assert/strict';
import test from 'node:test';

import { validateLedger } from '../domains/economy/invariants.js';
import { projectBalances } from '../domains/economy/ledger.js';
import { upgradeEconomyLedger } from '../domains/economy/migration.js';
import { upgradeXiaobaiOsChatData } from '../host/chat-data-upgrade.js';
import { createChatDataStore } from '../host/chat-data-store.js';

const EMPTY_PREFIX_HASH = 'sha256:7d0895b5e4a7170fe97ae325c8d441725fd5973b733dc8938469f794c01feee3';

function legacyLedger(purchaseAmount = 20) {
    return {
        schemaVersion: 1,
        transactions: [{
            id: 'tx-opening',
            sequence: 1,
            idempotencyKey: 'economy:opening-grant:v1',
            actionId: 'economy:opening-grant:v1',
            fromAccountId: 'system:mint',
            toAccountId: 'player',
            amount: 100,
            kind: 'opening_grant',
            title: '开户赠礼',
            note: '欢迎来到小白 OS',
            sourceDomain: 'economy',
            sourceId: 'opening-grant:v1',
            anchor: { floor: -1, prefixHash: EMPTY_PREFIX_HASH },
            createdAt: 1_000,
        }, {
            id: 'tx-purchase',
            sequence: 2,
            idempotencyKey: 'shop:purchase:one:payment',
            actionId: 'shop:purchase:one',
            fromAccountId: 'player',
            toAccountId: 'counterparty:shop:one',
            amount: purchaseAmount,
            kind: 'purchase',
            title: '购买物品',
            note: '',
            sourceDomain: 'shop',
            sourceId: 'purchase:one',
            anchor: { floor: 3, prefixHash: `sha256:${'a'.repeat(64)}` },
            createdAt: 2_000,
        }, {
            id: 'tx-reversal',
            sequence: 3,
            idempotencyKey: 'shop:purchase:one:refund',
            actionId: 'shop:purchase:one:refund',
            fromAccountId: 'counterparty:shop:one',
            toAccountId: 'player',
            amount: purchaseAmount,
            kind: 'reversal',
            title: '购买退款',
            note: '',
            sourceDomain: 'shop',
            sourceId: 'purchase:one',
            anchor: { floor: 4, prefixHash: `sha256:${'b'.repeat(64)}` },
            createdAt: 3_000,
            reversalOfTransactionId: 'tx-purchase',
        }],
    };
}

function legacyOpeningLedger() {
    const ledger = legacyLedger();
    ledger.transactions = ledger.transactions.slice(0, 1);
    return ledger;
}

function root(ledger = legacyOpeningLedger()) {
    return {
        schemaVersion: 2,
        apps: { futureApp: { keep: true } },
        domains: { economy: ledger, futureDomain: { keep: true } },
    };
}

function createHarness(initialRoot = root()) {
    const identity = { key: 'character:1:chat-a', chatId: 'chat-a' };
    const state = {
        identity,
        metadata: { extensions: { LittleWhiteBox: { xiaobaiOs: structuredClone(initialRoot) } } },
        persisted: structuredClone(initialRoot),
        saveCount: 0,
        save: async transaction => {state.persisted = structuredClone(transaction.xiaobaiOs);},
    };
    const store = createChatDataStore({
        getChatIdentity: () => state.identity,
        getChatMetadata: current => current?.key === state.identity.key ? state.metadata : null,
        async saveChatMetadata(transaction) {
            state.saveCount += 1;
            await state.save(transaction);
        },
        readPersistedXiaobaiOs: async () => structuredClone(state.persisted),
    }, {
        domains: { economy: validateLedger },
    }, {
        upgradeRoot: upgradeXiaobaiOsChatData,
    });
    return { state, store };
}

test('real Economy V1 transactions upgrade to V2 without changing ledger facts', () => {
    const legacy = legacyLedger();
    const upgraded = upgradeEconomyLedger(legacy);

    assert.equal(upgraded.schemaVersion, 2);
    assert.equal(projectBalances(upgraded).player, 100);
    assert.deepEqual(
        upgraded.transactions.map(({ anchor: _anchor, ...transaction }) => transaction),
        legacy.transactions.map(({ anchor: _anchor, ...transaction }) => transaction),
    );
    assert.equal(upgraded.transactions.some(transaction => Object.hasOwn(transaction, 'anchor')), false);
    validateLedger(upgraded);
});

test('the V1 converter rejects non-canonical legacy data and ignores current V2', () => {
    const extraField = legacyLedger();
    extraField.transactions[0].unexpected = true;
    assert.throws(
        () => upgradeEconomyLedger(extraField),
        error => error.code === 'economy_invalid_legacy_data',
    );

    const invalidAnchor = legacyLedger();
    invalidAnchor.transactions[0].anchor.prefixHash = `sha256:${'c'.repeat(64)}`;
    assert.throws(
        () => upgradeEconomyLedger(invalidAnchor),
        error => error.code === 'economy_invalid_legacy_data',
    );

    const current = upgradeEconomyLedger(legacyLedger());
    assert.equal(upgradeEconomyLedger(current), null);
});

test('chat data projects legacy Economy immediately and persists one clean upgrade', async () => {
    const { state, store } = createHarness();

    const projected = store.readCurrent();
    assert.equal(projected.domains.economy.schemaVersion, 2);
    assert.equal(state.metadata.extensions.LittleWhiteBox.xiaobaiOs.domains.economy.schemaVersion, 1);

    await store.prepareCurrent();
    assert.equal(state.saveCount, 1);
    assert.equal(state.persisted.domains.economy.schemaVersion, 2);
    assert.equal(Object.hasOwn(state.persisted.domains.economy.transactions[0], 'anchor'), false);
    assert.deepEqual(state.persisted.apps.futureApp, { keep: true });
    assert.deepEqual(state.persisted.domains.futureDomain, { keep: true });

    await store.prepareCurrent();
    assert.equal(state.saveCount, 1);
});

test('a failed upgrade save restores V1 and a later preparation retries cleanly', async () => {
    const { state, store } = createHarness();
    state.save = async () => {
        throw Object.assign(new Error('save unavailable'), { code: 'SAVE_UNAVAILABLE' });
    };

    await assert.rejects(store.prepareCurrent(), error => error.code === 'SAVE_UNAVAILABLE');
    assert.equal(store.getWriteState(), 'ready');
    assert.equal(state.metadata.extensions.LittleWhiteBox.xiaobaiOs.domains.economy.schemaVersion, 1);
    assert.equal(store.readCurrent().domains.economy.schemaVersion, 2);

    state.save = async transaction => {state.persisted = structuredClone(transaction.xiaobaiOs);};
    await store.prepareCurrent();
    assert.equal(state.persisted.domains.economy.schemaVersion, 2);
});

test('adopting a valid V1 server root keeps it readable and upgrades it on the next preparation', async () => {
    const { state, store } = createHarness();
    state.save = async () => {
        throw Object.assign(new Error('unknown result'), { code: 'SAVE_UNCONFIRMED', uncertain: true });
    };
    await assert.rejects(store.prepareCurrent(), error => error.code === 'SAVE_UNCONFIRMED');

    state.persisted = root(legacyLedger(25));
    assert.deepEqual(await store.confirmPending(), { status: 'conflict' });
    assert.deepEqual(await store.adoptServerState(), { status: 'adopted' });
    assert.equal(store.getWriteState(), 'ready');
    assert.equal(projectBalances(store.readCurrent().domains.economy).player, 100);
    assert.equal(state.metadata.extensions.LittleWhiteBox.xiaobaiOs.domains.economy.schemaVersion, 1);

    state.save = async transaction => {state.persisted = structuredClone(transaction.xiaobaiOs);};
    await store.prepareCurrent();
    assert.equal(state.persisted.domains.economy.schemaVersion, 2);
});
