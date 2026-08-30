import assert from 'node:assert/strict';
import test from 'node:test';

import { createStoryReconciliationRuntime } from '../host/story-reconciliation-runtime.js';
import { createStoryActionRunner } from '../host/story-action-runner.js';
import { createStoryWriteGate } from '../host/story-write-gate.js';

function createTestStoryRuntime(adapter, repository, gate, options) {
    const root = { schemaVersion: 2, apps: {}, domains: { test: {} } };
    const store = {
        readCurrent: () => repository.hasCurrent() ? root : null,
        async mutateCurrent(mutation, mutationOptions = {}) {
            const snapshot = adapter.captureCurrent();
            const plan = await mutation(root, { identityKey: snapshot?.identityKey || '' });
            await mutationOptions.beforeCommit?.();
            return plan.result;
        },
    };
    return createStoryReconciliationRuntime(adapter, store, gate, [{
        key: 'test',
        hasData: () => repository.hasCurrent(),
        reconcile(current, fingerprint) {
            repository.reconcileCurrent(fingerprint);
            return { root: current, impact: null };
        },
    }], options);
}

function deferred() {
    let resolve;
    let reject;
    const promise = new Promise((resolvePromise, rejectPromise) => {
        resolve = resolvePromise;
        reject = rejectPromise;
    });
    return { promise, reject, resolve };
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
    const runtime = createTestStoryRuntime({
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
    assert.throws(() => gate.assertWritable(identityKey), /story_reconciliation_required/);

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
    const runtime = createTestStoryRuntime({
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
    await waitUntil(() => runtime.getState().status === 'ready');

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
    const runtime = createTestStoryRuntime({
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
    assert.throws(() => gate.assertWritable(chatA.identityKey), /story_reconciliation_required/);

    current = chatB;
    storyHandler();
    assert.doesNotThrow(() => gate.assertWritable(chatA.identityKey));
    assert.throws(() => gate.assertWritable(chatB.identityKey), /story_reconciliation_required/);

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
    const runtime = createTestStoryRuntime({
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
    assert.throws(() => gate.assertWritable(identityKey), /story_reconciliation_required/);

    persisted = current;
    const recovered = await runtime.reconcileNow();
    assert.equal(recovered.status, 'ready');
    assert.doesNotThrow(() => gate.assertWritable(identityKey));
});

test('a story-bound write reconciles every registered domain before its command runs', async () => {
    const snapshot = {
        identityKey: 'character:1:chat-moved',
        messages: [{ role: 'user', name: '主人', text: '移动后的剧情' }],
    };
    let root = {
        schemaVersion: 2,
        apps: {},
        domains: { first: { story: '旧剧情' }, second: { story: '旧剧情' } },
    };
    const adapter = {
        captureCurrent: () => structuredClone(snapshot),
        readPersistedCurrent: async () => structuredClone(snapshot),
        subscribeChanges: () => () => {},
    };
    const store = {
        readCurrent: () => structuredClone(root),
        getWriteState: () => 'ready',
        async mutateCurrent(command, options = {}) {
            const plan = await command(structuredClone(root), { identityKey: snapshot.identityKey });
            await options.beforeCommit?.();
            root = structuredClone(plan.next);
            return plan.result;
        },
    };
    const gate = createStoryWriteGate();
    const reconciled = [];
    const runtime = createStoryReconciliationRuntime(adapter, store, gate, ['first', 'second'].map(key => ({
        key,
        hasData: current => current?.domains[key] !== undefined,
        reconcile(current, fingerprint) {
            reconciled.push(key);
            const next = structuredClone(current);
            next.domains[key].story = fingerprint.messages[0].text;
            return { root: next, impact: null };
        },
    })));
    const runner = createStoryActionRunner(store, adapter, gate, runtime.reconcileNow);

    const result = await runner.run((current) => {
        assert.equal(current.domains.first.story, '移动后的剧情');
        assert.equal(current.domains.second.story, '移动后的剧情');
        return { next: current, result: 'committed' };
    });

    assert.equal(result, 'committed');
    assert.deepEqual(reconciled, ['first', 'second']);
});
