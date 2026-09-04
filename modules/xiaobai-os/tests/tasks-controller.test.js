import assert from 'node:assert/strict';
import test from 'node:test';

import { createTaskController } from '../apps/tasks/host/controller.js';

function deferred() {
    let resolve;
    const promise = new Promise(resolvePromise => {resolve = resolvePromise;});
    return { promise, resolve };
}

function createHarness() {
    const initialMaintenanceStatus = { state: 'idle', mode: null, message: '', reason: '', lastRunAt: null };
    const host = {
        identity: { key: 'character:1:chat-a' },
        posts: [],
        calls: [],
        reports: [],
        autoMaintenance: false,
        economyReady: true,
        mainGenerationActive: false,
        writeState: 'ready',
        dataListener: null,
        generationListener: null,
        settingsListener: null,
        maintenanceListener: null,
        maintenanceStatus: initialMaintenanceStatus,
        maintenanceStatuses: new Map([['character:1:chat-a', initialMaintenanceStatus]]),
        boardRequest: null,
        refreshRequest: null,
        taskError: null,
    };
    const emptyView = () => ({
        domain: null,
        records: [],
        playerBalance: 100,
        writeState: host.writeState,
    });
    const tasks = {
        readCurrent: emptyView,
        refreshCurrent: async () => {
            await host.refreshRequest?.promise;
            return emptyView();
        },
        getWriteState: () => host.writeState,
        createActionId: () => 'action-1',
        confirmPending: async () => ({ status: 'confirmed' }),
        adoptServerState: async () => {host.writeState = 'ready'; return { status: 'adopted' };},
        publish: async () => {
            if (host.taskError) {throw host.taskError;}
            return { changed: false, view: emptyView() };
        },
        subscribe(listener) {
            host.dataListener = listener;
            return () => {host.dataListener = null;};
        },
    };
    const economy = {
        isOpen: () => host.economyReady,
        refresh: async () => undefined,
        ensureOpen: async () => {host.economyReady = true; return 'opened';},
    };
    const generation = {
        refreshBoard() {
            host.calls.push(['refresh-board']);
            return host.boardRequest?.promise ?? Promise.resolve({ kind: 'board', status: 'updated', changed: true, compile: { data: { listings: [] } } });
        },
        refreshCandidates: async () => ({ kind: 'candidates', status: 'unchanged', changed: false }),
        cancelBoard: reason => host.calls.push(['cancel-board', reason]),
        cancelCandidates: reason => host.calls.push(['cancel-candidates', reason]),
        cancelAll: reason => host.calls.push(['cancel-generation', reason]),
    };
    const settings = {
        read: () => ({ apps: { tasks: { autoMaintenance: host.autoMaintenance } } }),
        async setTasksAutoMaintenance(enabled) {
            host.autoMaintenance = enabled;
            host.settingsListener?.(settings.read());
            return settings.read();
        },
        subscribe(listener) {
            host.settingsListener = listener;
            return () => {host.settingsListener = null;};
        },
    };
    const maintenance = {
        startManual() {
            host.calls.push(['manual']);
            host.maintenanceStatus = {
                state: 'running', mode: 'manual', message: '', reason: '', lastRunAt: null,
            };
            host.maintenanceStatuses.set(host.identity.key, host.maintenanceStatus);
            host.maintenanceListener?.('tasks', host.identity.key, host.maintenanceStatus);
            return { status: 'started', mode: 'manual', completion: new Promise(() => {}) };
        },
        cancelRequested: (_id, reason) => host.calls.push(['cancel-maintenance', reason]),
        invalidateAutomatic: (_id, reason) => host.calls.push(['invalidate-automatic', reason]),
        getStatus: (_participantId, chatIdentity) => host.maintenanceStatuses.get(chatIdentity)
            ?? { state: 'idle', mode: null, message: '', reason: '', lastRunAt: null },
        subscribeStatus(listener) {
            host.maintenanceListener = listener;
            return () => {host.maintenanceListener = null;};
        },
    };
    const controller = createTaskController({
        tasks,
        economy,
        generation,
        settings,
        maintenance,
        getChatIdentity: () => host.identity,
        isMainGenerationActive: () => host.mainGenerationActive,
        subscribeGeneration(listener) {
            host.generationListener = listener;
            return () => {host.generationListener = null;};
        },
        report: error => host.reports.push(error),
    });
    controller.startBackground();
    return { controller, host };
}

function activation(host) {
    return {
        post(type, payload) {
            host.posts.push({ type, payload });
            return true;
        },
    };
}

test('Tasks activation is local-only and maintenance returns after Host admission', async () => {
    const { controller, host } = createHarness();
    const state = await controller.activate(activation(host));
    host.calls.length = 0;

    assert.equal(state.status, 'ready');
    assert.equal(state.board, null);
    assert.equal(host.calls.length, 0);
    const payload = { chatIdentity: host.identity.key };
    assert.equal((await controller.handleMessage({
        type: 'tasks/settings/update', payload: { ...payload, autoMaintenance: true },
    })).settings.autoMaintenance, true);
    const maintenance = await controller.handleMessage({ type: 'tasks/maintenance/run', payload });
    assert.equal(maintenance.started, true);
    assert.equal(maintenance.state.maintenance.state, 'running');
    assert.equal((await controller.handleMessage({ type: 'tasks/save/confirm', payload })).confirmation, 'confirmed');
    host.writeState = 'conflict';
    assert.equal((await controller.handleMessage({ type: 'tasks/save/adopt-server', payload })).adoption, 'adopted');
});

test('route changes cancel only the generation owned by the page', async () => {
    const { controller, host } = createHarness();
    await controller.activate(activation(host));
    host.calls.length = 0;
    const payload = { chatIdentity: host.identity.key };

    await controller.handleMessage({ type: 'tasks/activate', payload: { ...payload, page: 'active' } });
    assert.deepEqual(host.calls, [['cancel-board', 'route-left'], ['cancel-candidates', 'route-left']]);
    host.calls.length = 0;
    await controller.handleMessage({ type: 'tasks/activate', payload: { ...payload, page: 'published' } });
    assert.deepEqual(host.calls, [['cancel-board', 'route-left']]);
});

test('leaving Tasks does not cancel Host-owned maintenance', async () => {
    const { controller, host } = createHarness();
    await controller.activate(activation(host));
    host.calls.length = 0;
    await controller.handleMessage({
        type: 'tasks/maintenance/run', payload: { chatIdentity: host.identity.key },
    });

    controller.deactivate('route-left');
    assert.equal(host.calls.some(call => call[0] === 'cancel-maintenance'), false);
});

test('activation consumes the OS snapshot without starting another storage refresh', async () => {
    const { controller, host } = createHarness();
    let refreshCalls = 0;
    host.refreshRequest = {
        get promise() {
            refreshCalls += 1;
            return Promise.resolve();
        },
    };
    await controller.activate(activation(host));
    await controller.activate(activation(host));

    assert.equal(refreshCalls, 0);
    await assert.rejects(
        controller.handleMessage({
            type: 'tasks/settings/update', payload: { chatIdentity: 'other-chat', autoMaintenance: true },
        }),
        /tasks_chat_changed/,
    );
});

test('canonical Kernel write failures retain their specific public Tasks errors', async () => {
    const { controller, host } = createHarness();
    await controller.activate(activation(host));
    const payload = { chatIdentity: host.identity.key, form: {
        title: '护送药箱',
        objective: '送达南门诊所',
        location: '南门诊所',
        risk: '道路封锁',
        reward: 80,
    } };

    host.taskError = Object.assign(new Error('frozen'), { code: 'storage_unconfirmed' });
    await assert.rejects(
        controller.handleMessage({ type: 'tasks/publish', payload }),
        /tasks_save_unconfirmed/,
    );
    host.taskError = Object.assign(new Error('changed'), { code: 'chat_changed' });
    await assert.rejects(
        controller.handleMessage({ type: 'tasks/publish', payload }),
        /tasks_chat_changed/,
    );
});

test('late generation results are rejected after chat change without publishing stale state or expected-error logs', async () => {
    const { controller, host } = createHarness();
    await controller.activate(activation(host));
    host.posts.length = 0;
    host.calls.length = 0;
    const request = deferred();
    host.boardRequest = request;
    const pending = controller.handleMessage({
        type: 'tasks/refresh', payload: { chatIdentity: host.identity.key },
    });
    host.identity = { key: 'character:1:chat-b' };
    controller.handleChatChanged();
    request.resolve({ kind: 'board', status: 'cancelled', changed: false });

    await assert.rejects(pending, /tasks_app_inactive/);
    assert.deepEqual(host.reports, []);
    assert.equal(host.posts.some(post => post.payload?.state?.chatIdentity === 'character:1:chat-b'), false);
    assert.deepEqual(host.calls.slice(-3), [
        ['cancel-generation', 'chat-changed'],
        ['cancel-maintenance', 'chat-changed'],
        ['invalidate-automatic', 'chat-changed'],
    ]);
});

test('subscriptions publish only for the active chat and expose Tasks maintenance state', async () => {
    const { controller, host } = createHarness();
    await controller.activate(activation(host));
    host.posts.length = 0;

    host.identity = { key: 'character:1:chat-b' };
    host.dataListener();
    assert.equal(host.posts.length, 0);
    host.identity = { key: 'character:1:chat-a' };
    host.maintenanceStatus = { state: 'running', mode: 'manual', message: '', reason: '', lastRunAt: null };
    host.maintenanceStatuses.set('character:1:chat-a', host.maintenanceStatus);
    host.maintenanceListener('tasks', 'character:1:chat-a', host.maintenanceStatus);
    assert.equal(host.posts.at(-1).payload.state.maintenance.state, 'running');
    host.identity = { key: 'character:1:chat-b' };
    host.generationListener();
    assert.equal(host.posts.length, 1);

    const next = await controller.activate(activation(host));
    assert.equal(next.maintenance.state, 'idle');
    host.maintenanceListener('tasks', 'character:1:chat-a', host.maintenanceStatus);
    assert.equal(host.posts.length, 1);
});

test('main generation start aborts in-flight Tasks generation before publishing the new state', async () => {
    const { controller, host } = createHarness();
    await controller.activate(activation(host));
    host.calls.length = 0;
    const request = deferred();
    host.boardRequest = request;
    const pending = controller.handleMessage({
        type: 'tasks/refresh', payload: { chatIdentity: host.identity.key },
    });

    host.mainGenerationActive = true;
    host.generationListener(true);
    request.resolve({ kind: 'board', status: 'cancelled', changed: false });
    const result = await pending;

    assert.equal(result.outcome.status, 'cancelled');
    assert.deepEqual(host.calls.slice(-1), [['cancel-generation', 'main-generation-started']]);
});

test('manual maintenance cannot bypass unopened economy or the root write gate', async () => {
    const { controller, host } = createHarness();
    await controller.activate(activation(host));
    const payload = { chatIdentity: host.identity.key };
    host.economyReady = false;

    await assert.rejects(
        controller.handleMessage({ type: 'tasks/maintenance/run', payload }),
        /tasks_state_unavailable/,
    );
    host.economyReady = true;
    host.writeState = 'unconfirmed';
    await assert.rejects(
        controller.handleMessage({ type: 'tasks/maintenance/run', payload }),
        /tasks_write_blocked/,
    );
});
