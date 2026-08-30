import assert from 'node:assert/strict';
import test from 'node:test';

import { createEconomyStoryReconciliationRuntime } from '../domains/economy/story-reconciliation-runtime.js';
import { createStoryWriteGate } from '../domains/economy/story-write-gate.js';

function deferred() {
    let resolve;
    let reject;
    const promise = new Promise((resolvePromise, rejectPromise) => {
        resolve = resolvePromise;
        reject = rejectPromise;
    });
    return { promise, reject, resolve };
}

function tick() {
    return new Promise(resolve => globalThis.setImmediate(resolve));
}

async function waitUntil(predicate, attempts = 100) {
    for (let attempt = 0; attempt < attempts; attempt += 1) {
        if (predicate()) return;
        await new Promise(resolve => setTimeout(resolve, 5));
    }
    throw new Error('condition_not_reached');
}

test('story events return immediately, freeze economy writes and release only after persisted-story reconciliation', async () => {
    const identityKey = 'character:1:chat-a';
    const snapshot = {
        identityKey,
        messages: [{ role: 'user', name: '主人', text: '修改后的剧情' }],
    };
    const persisted = deferred();
    let storyHandler = null;
    let reconciliations = 0;
    const gate = createStoryWriteGate();
    const runtime = createEconomyStoryReconciliationRuntime({
        captureCurrent: () => structuredClone(snapshot),
        readPersistedCurrent: () => persisted.promise,
        subscribeChanges(handler) {
            storyHandler = handler;
            return () => { storyHandler = null; };
        },
    }, {
        hasCurrent: () => true,
        reconcileCurrent: async () => { reconciliations += 1; },
    }, gate);

    runtime.startBackground();
    assert.equal(storyHandler(), undefined);
    assert.equal(runtime.getState().status, 'reconciling');
    assert.throws(() => gate.assertWritable(identityKey), /economy_story_reconciliation_required/);

    persisted.resolve(structuredClone(snapshot));
    await waitUntil(() => runtime.getState().status === 'ready');
    assert.equal(reconciliations, 1);
    assert.equal(runtime.getState().status, 'ready');
    assert.doesNotThrow(() => gate.assertWritable(identityKey));
    runtime.stopBackground();
});

test('a newer story event invalidates a late reconciliation from the previous snapshot', async () => {
    const identityKey = 'character:1:chat-a';
    const first = { identityKey, messages: [{ role: 'user', name: '主人', text: '版本一' }] };
    const second = { identityKey, messages: [{ role: 'user', name: '主人', text: '版本二' }] };
    const firstRead = deferred();
    const secondRead = deferred();
    const reads = [firstRead, secondRead];
    const reconciledTexts = [];
    let current = first;
    let storyHandler = null;
    const gate = createStoryWriteGate();
    const runtime = createEconomyStoryReconciliationRuntime({
        captureCurrent: () => structuredClone(current),
        readPersistedCurrent: () => reads.shift().promise,
        subscribeChanges(handler) {
            storyHandler = handler;
            return () => {};
        },
    }, {
        hasCurrent: () => true,
        reconcileCurrent: async fingerprint => { reconciledTexts.push(fingerprint.messages[0].text); },
    }, gate);

    runtime.startBackground();
    storyHandler();
    current = second;
    storyHandler();
    firstRead.resolve(structuredClone(first));
    secondRead.resolve(structuredClone(second));
    await tick();
    await tick();
    await tick();

    assert.deepEqual(reconciledTexts, ['版本二']);
    assert.equal(runtime.getState().status, 'ready');
    assert.doesNotThrow(() => gate.assertWritable(identityKey));
});

test('an identity jump releases the previous chat gate even without a chat-changed callback', async () => {
    const chatA = {
        identityKey: 'character:1:chat-a',
        messages: [{ role: 'user', name: '主人', text: '聊天 A' }],
    };
    const chatB = {
        identityKey: 'character:2:chat-b',
        messages: [{ role: 'user', name: '主人', text: '聊天 B' }],
    };
    const firstRead = deferred();
    const secondRead = deferred();
    const reads = [firstRead, secondRead];
    let current = chatA;
    let storyHandler = null;
    const gate = createStoryWriteGate();
    const runtime = createEconomyStoryReconciliationRuntime({
        captureCurrent: () => structuredClone(current),
        readPersistedCurrent: () => reads.shift().promise,
        subscribeChanges(handler) {
            storyHandler = handler;
            return () => {};
        },
    }, {
        hasCurrent: () => true,
        reconcileCurrent: async () => {},
    }, gate);

    runtime.startBackground();
    storyHandler();
    assert.throws(() => gate.assertWritable(chatA.identityKey), /economy_story_reconciliation_required/);

    current = chatB;
    storyHandler();
    assert.doesNotThrow(() => gate.assertWritable(chatA.identityKey));
    assert.throws(() => gate.assertWritable(chatB.identityKey), /economy_story_reconciliation_required/);

    secondRead.resolve(structuredClone(chatB));
    await waitUntil(() => runtime.getState().status === 'ready');
    assert.doesNotThrow(() => gate.assertWritable(chatB.identityKey));
    firstRead.resolve(structuredClone(chatA));
    runtime.stopBackground();
});

test('a persistence timeout keeps writes frozen and an explicit retry can recover', async () => {
    const identityKey = 'character:1:chat-a';
    const current = { identityKey, messages: [{ role: 'user', name: '主人', text: '新剧情' }] };
    const stale = { identityKey, messages: [{ role: 'user', name: '主人', text: '旧剧情' }] };
    let persisted = stale;
    let clock = 0;
    const gate = createStoryWriteGate();
    const runtime = createEconomyStoryReconciliationRuntime({
        captureCurrent: () => structuredClone(current),
        readPersistedCurrent: async () => structuredClone(persisted),
        subscribeChanges: () => () => {},
    }, {
        hasCurrent: () => true,
        reconcileCurrent: async () => {},
    }, gate, {
        retryDelayMs: 5,
        timeoutMs: 10,
        now: () => clock,
        setTimer(callback, milliseconds) {
            return globalThis.setImmediate(() => {
                clock += milliseconds;
                callback();
            });
        },
        clearTimer: globalThis.clearImmediate,
    });

    const blocked = await runtime.reconcileNow();
    assert.equal(blocked.status, 'blocked');
    assert.throws(() => gate.assertWritable(identityKey), /economy_story_reconciliation_required/);

    persisted = current;
    const recovered = await runtime.reconcileNow();
    assert.equal(recovered.status, 'ready');
    assert.doesNotThrow(() => gate.assertWritable(identityKey));
});
