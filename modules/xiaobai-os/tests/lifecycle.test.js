import assert from 'node:assert/strict';
import test from 'node:test';
import { parseHTML } from 'linkedom';

import { createXiaobaiOsLifecycle } from '../host/lifecycle.js';

function createHarness({ appRuntime = {} } = {}) {
    const { document, window } = parseHTML(`<!doctype html><html><head></head><body>
        <div id="send-controls"><button id="message_preview_btn"></button><button id="send_but"></button></div>
    </body></html>`);
    let chatChanged = null;
    let subscriptions = 0;
    let unsubscriptions = 0;
    let bridgeDisposals = 0;
    let bridgeOptions = null;
    const posts = [];
    const bridgeFactory = (options) => {
        bridgeOptions = options;
        const instance = {
            post(type, payload, requestId) {
                posts.push({ type, payload, requestId });
                return true;
            },
            isReady: () => true,
            dispose() { bridgeDisposals += 1; },
        };
        bridgeOptions.bridge = instance;
        return instance;
    };
    const runtimeCalls = [];
    const lifecycle = createXiaobaiOsLifecycle({
        documentTarget: document,
        windowTarget: window,
        stylesheetHref: '/xiaobai-os/host.css',
        frameSrc: '/xiaobai-os/shell.html',
        bridgeFactory,
        subscribeChatChanged(handler) {
            subscriptions += 1;
            chatChanged = handler;
            return () => {
                unsubscriptions += 1;
                chatChanged = null;
            };
        },
        getInitSnapshot: () => ({ theme: 'dark', chat: null }),
        getAppDescriptors: () => [{ id: 'fourth-wall', name: '四次元壁' }],
        appRuntime: {
            cancelAll: reason => runtimeCalls.push(['cancelAll', reason]),
            cancelForeground: reason => runtimeCalls.push(['cancelForeground', reason]),
            deactivate: (id, reason) => runtimeCalls.push(['deactivate', id, reason]),
            startBackground: () => runtimeCalls.push(['startBackground']),
            stopBackground: () => runtimeCalls.push(['stopBackground']),
            ...appRuntime,
        },
    });
    return {
        bridgeDisposals: () => bridgeDisposals,
        bridgeOptions: () => bridgeOptions,
        chatChanged: () => chatChanged,
        document,
        lifecycle,
        posts,
        runtimeCalls,
        subscriptions: () => subscriptions,
        unsubscriptions: () => unsubscriptions,
        window,
    };
}

test('init is idempotent and mounts one launcher before preview and send', () => {
    const harness = createHarness();

    assert.equal(harness.lifecycle.init(), true);
    assert.equal(harness.lifecycle.init(), true);

    const controls = harness.document.getElementById('send-controls');
    assert.deepEqual(Array.from(controls.children).map(element => element.id), [
        'xiaobaix-os-button',
        'message_preview_btn',
        'send_but',
    ]);
    assert.equal(harness.document.querySelectorAll('#xiaobaix-os-button').length, 1);
    assert.equal(harness.document.querySelectorAll('#xiaobaix-os-host-styles').length, 1);
    assert.equal(harness.subscriptions(), 1);
    assert.deepEqual(harness.runtimeCalls, [['startBackground']]);
});

test('open is idempotent and closing a window preserves host resources', () => {
    const harness = createHarness();
    harness.lifecycle.init();

    assert.equal(harness.lifecycle.open(), true);
    assert.equal(harness.lifecycle.open(), true);
    assert.equal(harness.document.querySelectorAll('#xiaobaix-os-overlay').length, 1);

    harness.lifecycle.closeWindow('test-close');
    assert.equal(harness.document.getElementById('xiaobaix-os-overlay'), null);
    assert.ok(harness.document.getElementById('xiaobaix-os-button'));
    assert.ok(harness.document.getElementById('xiaobaix-os-host-styles'));
    assert.equal(harness.bridgeDisposals(), 1);
});

test('trusted frame ready receives a fresh snapshot and unknown apps stay inactive', async () => {
    const harness = createHarness();
    harness.lifecycle.init();
    harness.lifecycle.open();
    const options = harness.bridgeOptions();

    await options.onReady(options.bridge);
    assert.equal(harness.posts[0].type, 'os/init');
    assert.deepEqual(harness.posts[0].payload.apps, [{ id: 'fourth-wall', name: '四次元壁' }]);
});

test('leaving an app route invalidates an activation that is still pending', async () => {
    let finishActivation;
    const harness = createHarness({
        appRuntime: {
            activate: () => new Promise(resolve => { finishActivation = resolve; }),
        },
    });
    harness.lifecycle.init();
    harness.lifecycle.open();
    const options = harness.bridgeOptions();
    const pending = options.onMessage({
        type: 'app/activate',
        requestId: 'activate-1',
        payload: { appId: 'fourth-wall' },
    }, options.bridge);

    await Promise.resolve();
    await options.onMessage({ type: 'app/deactivate', requestId: 'deactivate-1' }, options.bridge);
    finishActivation({ stale: true });
    await pending;

    assert.equal(harness.posts.some(item => item.type === 'app/activation-result' && item.payload.ok === true), false);
    assert.equal(
        harness.posts.some(item => item.type === 'app/activation-result' && item.payload.error === 'activation_cancelled'),
        true,
    );
});

test('an async app request cannot settle as success after the same app is reopened', async () => {
    let finishRequest;
    const harness = createHarness({
        appRuntime: {
            activate: async () => ({}),
            handleMessage: () => new Promise(resolve => { finishRequest = resolve; }),
        },
    });
    harness.lifecycle.init();
    harness.lifecycle.open();
    const options = harness.bridgeOptions();
    await options.onMessage({
        type: 'app/activate',
        requestId: 'activate-1',
        payload: { appId: 'fourth-wall' },
    }, options.bridge);
    const pending = options.onMessage({
        type: 'fourth-wall/refresh',
        requestId: 'stale-request',
        payload: {},
    }, options.bridge);
    await Promise.resolve();
    await options.onMessage({ type: 'app/deactivate' }, options.bridge);
    await options.onMessage({
        type: 'app/activate',
        requestId: 'activate-2',
        payload: { appId: 'fourth-wall' },
    }, options.bridge);

    finishRequest({ stale: true });
    await pending;

    const response = harness.posts.find(item => item.requestId === 'stale-request');
    assert.equal(response.type, 'fourth-wall/result');
    assert.deepEqual(response.payload, { ok: false, error: 'app_inactive' });
});

test('chat changes close the foreground window without unloading the launcher', () => {
    const harness = createHarness();
    harness.lifecycle.init();
    harness.lifecycle.open();

    harness.chatChanged()();

    assert.equal(harness.document.getElementById('xiaobaix-os-overlay'), null);
    assert.ok(harness.document.getElementById('xiaobaix-os-button'));
    assert.deepEqual(harness.runtimeCalls.slice(-2), [
        ['cancelAll', 'chat-changed'],
        ['cancelForeground', 'chat-changed'],
    ]);
});

test('cleanup is repeatable and removes every owned host resource', () => {
    const harness = createHarness();
    harness.lifecycle.init();
    harness.lifecycle.open();

    harness.lifecycle.cleanup();
    harness.lifecycle.cleanup();

    assert.equal(harness.document.getElementById('xiaobaix-os-overlay'), null);
    assert.equal(harness.document.getElementById('xiaobaix-os-button'), null);
    assert.equal(harness.document.getElementById('xiaobaix-os-host-styles'), null);
    assert.equal(harness.unsubscriptions(), 1);
    assert.equal(harness.lifecycle.isInitialized(), false);
});

test('persisted pagehide preserves the runtime while a final pagehide cleans it', () => {
    const harness = createHarness();
    harness.lifecycle.init();
    const persisted = new harness.window.Event('pagehide');
    Object.defineProperty(persisted, 'persisted', { value: true });
    harness.window.dispatchEvent(persisted);
    assert.equal(harness.lifecycle.isInitialized(), true);

    const final = new harness.window.Event('pagehide');
    Object.defineProperty(final, 'persisted', { value: false });
    harness.window.dispatchEvent(final);
    assert.equal(harness.lifecycle.isInitialized(), false);
});
