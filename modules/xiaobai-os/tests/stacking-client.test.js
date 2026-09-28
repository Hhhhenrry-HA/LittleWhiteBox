import assert from 'node:assert/strict';
import test from 'node:test';
import { createStackingClient } from '../apps/game/stacking/client.ts';
import { withStackingRuntime } from '../apps/game/stacking/host.ts';
import { createSettingsRepository } from '../host/settings-repository.ts';
import { createRecoveryJournal } from '../apps/game/stacking/recovery.ts';
const state = (extra = {}) => ({ revision: 0, completed: [], active: null, board: null, balance: 100,
    award: 0, best: null, writeState: 'ready', pending: false, ready: true,
    soundEnabled: true, ...extra });
function harness(journal = createRecoveryJournal({ getItem: () => null, setItem() {}, removeItem() {} })) {
    let subscriber, handler = async () => ({ result: state() });
    const calls = [];
    const client = createStackingClient({
        subscribe(fn) { subscriber = fn; return () => { subscriber = null; }; },
        request(type, payload) { calls.push({ type, payload }); return handler(type, payload); },
    }, 'chat-a', journal);
    return { client, calls, handle(fn) { handler = fn; }, push(value, chatIdentity = 'chat-a') { subscriber?.({ type: 'game/stacking/state', payload: { chatIdentity, state: value } }); } };
}
test('a newer host push survives a late reply; wrong-chat pushes and disposed replies cannot replace state', async () => {
    const h = harness(); await h.client.read();
    let finish;
    h.handle(() => new Promise(resolve => { finish = resolve; }));
    const read = h.client.read();
    h.push(state({ revision: 2, balance: 150 }));
    finish({ result: state({ revision: 1 }) }); await read;
    assert.equal(h.client.view.value.revision, 2);
    assert.equal(h.client.view.value.balance, 150);
    h.push(state({ revision: 99 }), 'chat-b');
    assert.equal(h.client.view.value.revision, 2);
    const late = h.client.read(); h.client.dispose(); finish({ result: state({ revision: 3 }) }); await late;
    assert.equal(h.client.view.value.revision, 2);
});
test('uncertain admission freezes new actions and confirmation never buys a second run', async () => {
    const h = harness(); await h.client.read();
    h.handle(async () => { throw Object.assign(new Error('timeout'), { code: 'host_request_timeout' }); });
    await h.client.act({ type: 'start' });
    const original = h.calls.at(-1).payload;
    assert.equal(h.client.blocked.value, true);
    await h.client.act({ type: 'start' });
    assert.equal(h.calls.length, 2);
    h.handle(async () => ({ result: state({ revision: 1, balance: 50 }) }));
    await h.client.recover();
    assert.equal(h.calls.length, 3);
    assert.equal(h.client.failed.value, null);
    assert.equal(h.client.view.value.balance, 50);
    assert.ok(original.actionId);
});
test('a definitely unapplied request retries its identical identity, but business rejections do not trap the UI', async () => {
    const h = harness(); await h.client.read();
    h.handle(async () => { throw Object.assign(new Error('timeout'), { code: 'host_request_timeout' }); });
    await h.client.act({ type: 'start' });
    const original = h.calls.at(-1).payload;
    h.handle(async type => ({ result: state(type.endsWith('/act') ? { revision: 1, balance: 50 } : {}) }));
    await h.client.recover();
    assert.deepEqual(h.calls.at(-1).payload, original);
    h.handle(async () => { throw Object.assign(new Error('funds'), { code: 'stacking_funds' }); });
    await h.client.act({ type: 'start' });
    assert.equal(h.client.failed.value, null);
    assert.equal(h.client.blocked.value, false);
});

test('sound preference is an independent request and save errors cannot masquerade as a pending game move', async () => {
    const h = harness(); await h.client.read();
    h.handle(async (type, payload) => {
        assert.equal(type, 'game/stacking/sound');
        assert.deepEqual(payload, { chatIdentity: 'chat-a', enabled: false });
        return { result: state({ soundEnabled: false }) };
    });
    assert.equal(await h.client.setSoundEnabled(false), true);
    assert.equal(h.client.view.value.soundEnabled, false);
    h.handle(async () => { throw new Error('offline'); });
    await assert.rejects(h.client.setSoundEnabled(true), /offline/);
    assert.equal(h.client.view.value.soundEnabled, false);
    assert.equal(h.client.failed.value, null);
});

test('an ordinary read cannot forget a timed-out drop and permit a different placement at the same revision', async () => {
    const h = harness(); await h.client.read();
    h.handle(async () => { throw Object.assign(new Error('timeout'), { code: 'host_request_timeout' }); });
    await h.client.act({ type: 'drop', x: 180, direction: -1 });
    const original = h.client.failed.value;
    h.handle(async () => ({ result: state() })); await h.client.read();
    assert.deepEqual(h.client.failed.value, original); assert.equal(h.client.blocked.value, true);
    h.handle(async type => ({ result: state(type.endsWith('/act') ? { revision: 1 } : {}) }));
    await h.client.recover(); assert.deepEqual(h.calls.at(-1).payload.command, original.command);
    assert.equal(h.client.blocked.value, false);
});

test('a hard-reloaded client restores the same paid-run intent before accepting another placement', async () => {
    const values = new Map();
    const journal = createRecoveryJournal({ getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) });
    const initial = state({ revision: 1, active: { id: 'paid-run' } });
    const h = harness(journal); h.handle(async () => ({ result: initial })); await h.client.read();
    h.handle(async () => { throw Object.assign(new Error('timeout'), { code: 'host_request_timeout' }); });
    await h.client.act({ type: 'drop', x: -780, direction: -1 });
    const original = h.client.failed.value; h.client.dispose();
    assert.equal(values.size, 1);
    const reopened = harness(journal); reopened.handle(async () => ({ result: initial })); await reopened.client.read();
    assert.deepEqual(reopened.client.failed.value, original); assert.equal(reopened.client.blocked.value, true);
    reopened.handle(async type => ({ result: type.endsWith('/act') ? { ...initial, revision: 2 } : initial }));
    await reopened.client.recover();
    assert.deepEqual(reopened.calls.at(-1).payload.command, original.command);
    assert.equal(reopened.calls.at(-1).payload.actionId, original.actionId);
    assert.equal(values.size, 0); assert.equal(reopened.client.blocked.value, false);
});

test('a confirmed or replaced run retires local intent; unavailable local storage never sends the drop', async () => {
    let raw = null, fail = false;
    const journal = createRecoveryJournal({ getItem: () => raw, setItem: (_key, value) => { if (fail) { throw new Error('storage'); } raw = value; }, removeItem: () => { raw = null; } });
    const initial = state({ revision: 3, active: { id: 'current-run' } });
    journal.write({ runId: 'another-run', request: { actionId: 'old-action', revision: 3, command: { type: 'drop', x: 0, direction: 1 } } });
    const h = harness(journal); h.handle(async () => ({ result: initial })); await h.client.read();
    assert.equal(raw, null); assert.equal(h.client.blocked.value, false);
    fail = true; await h.client.act({ type: 'drop', x: 99, direction: 1 });
    assert.equal(h.calls.length, 1); assert.equal(h.client.blocked.value, true);
    fail = false; h.handle(async type => ({ result: type.endsWith('/act') ? { ...initial, revision: 4 } : initial })); await h.client.recover();
    assert.equal(h.calls.at(-1).payload.command.x, 99); assert.equal(raw, null);
});

test('stacking sound defaults on and a saved choice survives a new run and a reopened settings repository', async () => {
    const root = {};
    let saved, fail = false;
    const settings = createSettingsRepository({ getExtensionSettings: () => root, saveSettings() {
        if (fail) { throw new Error('offline'); }
        saved = structuredClone(root);
    } });
    await settings.prepare();
    let run = 'first';
    const stacking = { view: () => ({ active: { id: run }, soundEnabled: settings.read().apps.game.stackingSoundEnabled }) };
    const runtime = withStackingRuntime({}, stacking, () => 'chat-a', settings);
    const pushes = [];
    await runtime.activate({ post: (type, payload) => pushes.push({ type, payload }) });
    assert.equal(stacking.view().soundEnabled, true);

    const off = await runtime.handleMessage({ type: 'game/stacking/sound', payload: { chatIdentity: 'chat-a', enabled: false } });
    assert.equal(off.soundEnabled, false);
    assert.equal(pushes.at(-1).payload.state.soundEnabled, false);
    run = 'second';
    assert.deepEqual(stacking.view(), { active: { id: 'second' }, soundEnabled: false });
    const reopened = createSettingsRepository({ getExtensionSettings: () => structuredClone(saved), saveSettings() {} });
    assert.equal((await reopened.prepare()).apps.game.stackingSoundEnabled, false);

    fail = true;
    await assert.rejects(runtime.handleMessage({ type: 'game/stacking/sound', payload: { chatIdentity: 'chat-a', enabled: true } }), /offline/);
    assert.equal(settings.read().apps.game.stackingSoundEnabled, false);
    assert.equal(pushes.at(-1).payload.state.soundEnabled, false);
});
