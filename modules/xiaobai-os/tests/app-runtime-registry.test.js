import assert from 'node:assert/strict';
import test from 'node:test';

import { createAppRuntimeRegistry } from '../host/app-runtime-registry.js';

test('runtime registry routes one app and keeps background services out of descriptors', async () => {
    const calls = [];
    const first = {
        activate: async () => ({ app: 'first' }),
        handleMessage: message => calls.push(['message', message.type]),
        deactivate: reason => calls.push(['deactivate', reason]),
    };
    const second = { activate: async () => ({ app: 'second' }) };
    const service = { startBackground: () => calls.push(['service-start']) };
    const registry = createAppRuntimeRegistry([
        { descriptor: { id: 'first', name: '一', accent: '#111' }, runtime: first },
        { descriptor: { id: 'second', name: '二', accent: '#222' }, runtime: second },
    ], [{ id: 'service:test', runtime: service }]);

    assert.deepEqual(registry.getDescriptors().map(item => item.id), ['first', 'second']);
    assert.deepEqual(await registry.activate('first', { post: () => true }), { app: 'first' });
    registry.handleMessage('first', { type: 'first/refresh' });
    registry.deactivate('first', 'home');
    registry.startBackground();
    assert.deepEqual(calls, [['message', 'first/refresh'], ['deactivate', 'home'], ['service-start']]);
    await assert.rejects(registry.activate('missing', { post: () => true }), /app_unavailable/);
});

test('one failed runtime does not interrupt other apps or background services', () => {
    const calls = [];
    const failures = [];
    const broken = {
        startBackground() {throw new Error('broken-start');},
        handleChatChanged() {throw new Error('broken-chat');},
    };
    const healthy = {
        startBackground: () => calls.push('healthy-start'),
        handleChatChanged: () => calls.push('healthy-chat'),
    };
    const registry = createAppRuntimeRegistry([
        { descriptor: { id: 'broken', name: '坏', accent: '#111' }, runtime: broken },
        { descriptor: { id: 'healthy', name: '好', accent: '#222' }, runtime: healthy },
    ], [{
        id: 'service:also-healthy',
        runtime: { startBackground: () => calls.push('service-start') },
    }], { onError: failure => failures.push(failure) });

    registry.startBackground();
    registry.handleChatChanged();

    assert.deepEqual(calls, ['healthy-start', 'service-start', 'healthy-chat']);
    assert.deepEqual(failures.map(({ runtimeId, operation, error }) => ({
        runtimeId,
        operation,
        message: error.message,
    })), [
        { runtimeId: 'app:broken', operation: 'startBackground', message: 'broken-start' },
        { runtimeId: 'app:broken', operation: 'handleChatChanged', message: 'broken-chat' },
    ]);
    assert.deepEqual(registry.getDescriptors().map(({ id }) => id), ['broken', 'healthy']);
});
