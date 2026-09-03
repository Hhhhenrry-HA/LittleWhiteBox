import test from 'node:test';
import assert from 'node:assert/strict';

import { ScheduledTaskDispatcher } from '../task-dispatcher.js';

const request = id => ({
    key: `key:${id}`,
    ref: { scope: 'global', owner: 'global', id },
});

function deferred() {
    let resolve;
    const promise = new Promise(done => { resolve = done; });
    return { promise, resolve };
}

test('execution ownership is synchronous and one hundred busy hits occupy one pending entry', async () => {
    const gate = deferred();
    const executions = [];
    const dispatcher = new ScheduledTaskDispatcher({
        execute: async item => {
            executions.push(item);
            if (executions.length === 1) await gate.promise;
        },
    });

    const primary = dispatcher.submit([request('a')], { floor: 2 });
    assert.equal(dispatcher.isRunning, true);
    for (let index = 0; index < 100; index++) {
        void dispatcher.submit([request('a')], { floor: index + 3 });
    }
    assert.equal(dispatcher.pendingSize, 1);

    gate.resolve();
    const result = await primary;
    assert.equal(result.status, 'completed');
    assert.equal(executions.length, 2);
    assert.equal(executions[1].catchUp, true);
    assert.equal(executions[1].mergedCount, 99);
    assert.equal(executions[1].occurrence.floor, 102);
    assert.equal(dispatcher.pendingSize, 0);
});

test('a trigger produced by catch-up remains pending until a later host submission', async () => {
    const task = request('a');
    let calls = 0;
    let dispatcher;
    dispatcher = new ScheduledTaskDispatcher({
        execute: async item => {
            calls++;
            if (calls <= 2) await dispatcher.submit([task], { generatedBy: item.catchUp ? 'catch-up' : 'primary' });
        },
    });

    const first = await dispatcher.submit([task], { generatedBy: 'host' });
    assert.equal(first.status, 'completed');
    assert.equal(calls, 2);
    assert.equal(dispatcher.pendingSize, 1);

    await dispatcher.submit([], { generatedBy: 'next-host-event' });
    assert.equal(calls, 3);
    assert.equal(dispatcher.pendingSize, 0);
});

test('one failed task is recorded and does not prevent the rest of its batch', async () => {
    const calls = [];
    const errors = [];
    const dispatcher = new ScheduledTaskDispatcher({
        execute: async item => {
            calls.push(item.key);
            if (item.key === 'key:a') throw new Error('broken task');
            return 'ok';
        },
        onError: (error, item) => errors.push([item.key, error.message]),
    });

    const result = await dispatcher.submit([request('a'), request('b')]);
    assert.deepEqual(calls, ['key:a', 'key:b']);
    assert.deepEqual(errors, [['key:a', 'broken task']]);
    assert.deepEqual(result.primary.map(item => item.status), ['rejected', 'fulfilled']);
});

test('changing epoch clears pending work, aborts the active batch and permits the new chat', async () => {
    const calls = [];
    const dispatcher = new ScheduledTaskDispatcher({
        execute: item => new Promise((resolve, reject) => {
            calls.push(item.key);
            if (item.key !== 'key:a') return resolve();
            item.signal.addEventListener('abort', () => reject(new Error('aborted')), { once: true });
        }),
    });

    const oldChat = dispatcher.submit([request('a')]);
    await dispatcher.submit([request('b')]);
    assert.equal(dispatcher.pendingSize, 1);
    dispatcher.invalidate('chat_changed');
    const oldResult = await oldChat;
    assert.equal(oldResult.status, 'invalidated');
    assert.equal(dispatcher.pendingSize, 0);

    await dispatcher.submit([request('c')]);
    assert.deepEqual(calls, ['key:a', 'key:c']);
});

test('new-epoch work submitted while the old cycle exits is handed off exactly once', async () => {
    const oldGate = deferred();
    const calls = [];
    const dispatcher = new ScheduledTaskDispatcher({
        execute: async item => {
            calls.push({ key: item.key, catchUp: item.catchUp });
            if (item.key === 'key:old') await oldGate.promise;
        },
    });

    const oldCycle = dispatcher.submit([request('old')]);
    dispatcher.invalidate('chat_changed');
    const pendingResult = await dispatcher.submit([request('new')]);
    assert.equal(pendingResult.status, 'pending');
    assert.equal(dispatcher.pendingSize, 1);

    oldGate.resolve();
    assert.equal((await oldCycle).status, 'invalidated');
    await new Promise(resolve => setTimeout(resolve, 0));

    assert.deepEqual(calls, [
        { key: 'key:old', catchUp: false },
        { key: 'key:new', catchUp: false },
    ]);
    assert.equal(dispatcher.pendingSize, 0);
    assert.equal(dispatcher.isRunning, false);
});

test('cancelling a task drops its queued request and aborts its active request without reporting an error', async () => {
    const calls = [];
    const errors = [];
    const dispatcher = new ScheduledTaskDispatcher({
        execute: item => new Promise((resolve, reject) => {
            calls.push(item.key);
            if (item.key !== 'key:a') return resolve();
            item.signal.addEventListener('abort', () => reject(new Error('cancelled')), { once: true });
        }),
        onError: error => errors.push(error),
    });

    const cycle = dispatcher.submit([request('a'), request('b')]);
    assert.equal(dispatcher.cancel('key:b'), false);
    assert.equal(dispatcher.cancel('key:a'), true);
    const result = await cycle;

    assert.equal(result.status, 'completed');
    assert.deepEqual(calls, ['key:a']);
    assert.deepEqual(errors, []);
});

test('invalidation during catch-up is reported as invalidated', async () => {
    const catchUpStarted = deferred();
    const catchUpGate = deferred();
    let dispatcher;
    dispatcher = new ScheduledTaskDispatcher({
        execute: async item => {
            if (!item.catchUp) {
                await dispatcher.submit([request('b')]);
                return;
            }
            catchUpStarted.resolve();
            await catchUpGate.promise;
        },
    });

    const cycle = dispatcher.submit([request('a')]);
    await catchUpStarted.promise;
    dispatcher.invalidate('chat_changed');
    catchUpGate.resolve();

    assert.equal((await cycle).status, 'invalidated');
});
