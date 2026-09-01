import assert from 'node:assert/strict';
import test from 'node:test';

import { createMapController } from '../apps/map/host/controller.js';

function createHarness() {
    const host = {
        identity: { key: 'character:1:chat-a' },
        posts: [],
        dataListener: null,
        settingsListener: null,
        statusListener: null,
        autoMaintenance: false,
        enabled: true,
        writeState: 'ready',
        status: { state: 'idle', mode: null, message: '', lastRunAt: null },
        calls: [],
        mapData: null,
        manualOutcome: { status: 'unchanged', mode: 'manual', participantIds: ['map'], committedParticipantIds: [], failedParticipantIds: [], participantResults: [{ participantId: 'map', status: 'unchanged', changed: false }] },
        rebuildOutcome: { status: 'updated', mode: 'rebuild', participantIds: ['map'], committedParticipantIds: ['map'], failedParticipantIds: [], participantResults: [{ participantId: 'map', status: 'updated', changed: true }] },
    };
    const map = {
        readCurrent: () => ({ map: host.mapData, writeState: host.writeState }),
        getWriteState: () => host.writeState,
        confirmPending: async () => ({ status: 'confirmed' }),
        adoptServerState: async () => {host.writeState = 'ready'; return { status: 'adopted' };},
    };
    const settings = {
        read: () => ({ apps: { map: { enabled: host.enabled, autoMaintenance: host.autoMaintenance } } }),
        async setMapAutoMaintenance(enabled) {
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
        async runManual() {
            host.calls.push(['manual']);
            return host.manualOutcome;
        },
        async runRebuild() {
            host.calls.push(['rebuild']);
            return host.rebuildOutcome;
        },
        cancelForeground(_participantId, reason) {host.calls.push(['cancel', reason]);},
        getStatus: () => host.status,
        subscribeStatus(listener) {
            host.statusListener = listener;
            return () => {host.statusListener = null;};
        },
    };
    const controller = createMapController({
        map,
        settings,
        maintenance,
        getChatIdentity: () => host.identity,
        subscribeData(listener) {
            host.dataListener = listener;
            return () => {host.dataListener = null;};
        },
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

test('Map activation is read-only and its maintenance endpoints return stable outcome copy', async () => {
    const { controller, host } = createHarness();
    const state = controller.activate(activation(host));

    assert.equal(state.status, 'ready');
    assert.equal(state.map, null);
    assert.equal(host.calls.some(call => call[0] === 'manual' || call[0] === 'rebuild'), false);

    const payload = { chatIdentity: host.identity.key };
    assert.equal((await controller.handleMessage({ type: 'map/refresh', payload })).status, 'ready');
    assert.equal((await controller.handleMessage({
        type: 'map/set-auto-maintenance',
        payload: { ...payload, enabled: true },
    })).autoMaintenance, true);
    assert.equal((await controller.handleMessage({ type: 'map/confirm-save', payload })).confirmation, 'confirmed');
    const manual = await controller.handleMessage({ type: 'map/maintain-once', payload });
    const rebuild = await controller.handleMessage({ type: 'map/rebuild', payload });
    assert.equal(manual.message, '地图无需更新。');
    assert.equal(rebuild.message, '地图已建立并保存。');
    assert.deepEqual(host.calls.filter(call => call[0] !== 'cancel'), [['manual'], ['rebuild']]);
});

test('Map subscriptions publish only for the active chat and expose maintenance state', () => {
    const { controller, host } = createHarness();
    controller.activate(activation(host));

    host.dataListener({ identityKey: 'other', writeState: 'ready' });
    assert.equal(host.posts.length, 0);

    host.status = { state: 'running', mode: 'rebuild', message: '', lastRunAt: null };
    host.statusListener('map', host.status);
    assert.equal(host.posts.at(-1).type, 'map/state');
    assert.equal(host.posts.at(-1).payload.state.maintenanceStatus, 'rebuilding');

    host.identity = { key: 'character:1:chat-b' };
    host.dataListener({ identityKey: 'character:1:chat-a', writeState: 'ready' });
    assert.equal(host.posts.length, 1);
});

test('leaving Map cancels foreground work and rejects stale page requests', async () => {
    const { controller, host } = createHarness();
    controller.activate(activation(host));
    controller.deactivate('route-left');

    assert.deepEqual(host.calls.at(-1), ['cancel', 'route-left']);
    await assert.rejects(
        controller.handleMessage({
            type: 'map/refresh',
            payload: { chatIdentity: 'character:1:chat-a' },
        }),
        /地图 APP 未激活/,
    );
});

test('write-gated maintenance is delegated to the runner and conflict recovery adopts server data', async () => {
    const { controller, host } = createHarness();
    host.writeState = 'unconfirmed';
    controller.activate(activation(host));
    const payload = { chatIdentity: host.identity.key };

    assert.equal((await controller.handleMessage({ type: 'map/maintain-once', payload })).message, '地图无需更新。');
    host.writeState = 'conflict';
    const adoption = await controller.handleMessage({ type: 'map/adopt-server-state', payload });
    assert.equal(adoption.adoption, 'adopted');
    assert.equal(adoption.state.status, 'ready');
});

test('failed outcomes never expose internal reasons to the Map page', async () => {
    const { controller, host } = createHarness();
    host.manualOutcome = {
        status: 'failed', mode: 'manual', participantIds: ['map'], committedParticipantIds: [],
        failedParticipantIds: ['map'], participantResults: [{ participantId: 'map', status: 'failed', changed: false }],
        reason: 'provider_secret_stack_and_key',
    };
    controller.activate(activation(host));
    const result = await controller.handleMessage({
        type: 'map/maintain-once', payload: { chatIdentity: host.identity.key },
    });
    assert.equal(result.message, '地图维护失败，请检查 Agent API 设置后重试。');
    assert.doesNotMatch(result.message, /provider_secret/);
});
