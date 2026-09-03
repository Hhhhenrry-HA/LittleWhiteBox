import test from 'node:test';
import assert from 'node:assert/strict';

import { createScheduledTasksHostAdapter, saveCharacterTaskFieldStrict, saveExtensionSettingsStrict } from '../host-adapter.js';

test('host event registration is idempotent and has one cleanup owner', () => {
    const registered = [];
    let cleanups = 0;
    const events = {
        on: (type, handler) => registered.push([type, handler]),
        cleanup: () => { cleanups++; },
    };
    const handlers = {
        onGenerationStarted() {}, onGenerationStopped() {}, onGenerationEnded() {},
        onMessageReceived() {}, onUserMessage() {}, onChatChanged() {},
        onChatCreated() {}, onMessageDeleted() {}, onMessageSwiped() {}, onCharacterDeleted() {},
        onPresetChanged() {}, onMainApiChanged() {},
    };
    const eventTypes = {
        GENERATION_STARTED: 'generation-started', GENERATION_STOPPED: 'generation-stopped',
        GENERATION_ENDED: 'generation', USER_MESSAGE_RENDERED: 'user', CHAT_CHANGED: 'chat',
        CHAT_CREATED: 'created', MESSAGE_DELETED: 'deleted', MESSAGE_SWIPED: 'swiped',
        CHARACTER_DELETED: 'character-deleted', PRESET_CHANGED: 'preset',
        OAI_PRESET_CHANGED_AFTER: 'preset-after', MAIN_API_CHANGED: 'api',
    };
    const adapter = createScheduledTasksHostAdapter({ events, eventTypes, handlers });

    adapter.start();
    adapter.start();
    assert.equal(registered.length, 11);
    assert.deepEqual(registered.slice(0, 2).map(([type]) => type), [
        'generation-started', 'generation',
    ]);
    adapter.stop();
    adapter.stop();
    assert.equal(cleanups, 1);
});

test('hosts without generation-ended preserve generation ownership until rendered-message fallback', () => {
    const registered = [];
    const events = { on: type => registered.push(type), cleanup() {} };
    const eventTypes = {
        GENERATION_STARTED: 'started', GENERATION_STOPPED: 'stopped',
        CHARACTER_MESSAGE_RENDERED: 'rendered', USER_MESSAGE_RENDERED: 'user',
    };
    createScheduledTasksHostAdapter({
        events,
        eventTypes,
        handlers: {
            onGenerationStarted() {}, onMessageReceived() {}, onUserMessage() {},
        },
    }).start();
    assert.deepEqual(registered.slice(0, 3), ['started', 'rendered', 'user']);
});

test('strict character save does not mutate captured owner on HTTP failure', async () => {
    const character = {
        avatar: 'owner.png',
        data: { extensions: { 'xiaobaix-tasks': { tasks: [{ id: 'old' }] } } },
        json_data: JSON.stringify({ data: { extensions: { 'xiaobaix-tasks': { tasks: [{ id: 'old' }] } } } }),
    };
    const before = structuredClone(character);

    await assert.rejects(saveCharacterTaskFieldStrict({
        fetchImpl: async () => ({ ok: false, status: 503 }),
        character,
        characterId: 0,
        currentCharacterId: 0,
        fieldName: 'xiaobaix-tasks',
        tasks: [{ id: 'new' }],
    }), /HTTP 503/);
    assert.deepEqual(character, before);
});

test('strict character save commits the captured character and editor JSON only after success', async () => {
    const character = {
        avatar: 'owner.png',
        data: { extensions: {} },
        json_data: JSON.stringify({ data: { extensions: {} } }),
    };
    let request;
    let editorJson = '';
    await saveCharacterTaskFieldStrict({
        fetchImpl: async (url, options) => {
            request = { url, options };
            return { ok: true, status: 200 };
        },
        getRequestHeaders: () => ({ 'X-Test': '1' }),
        character,
        characterId: 0,
        currentCharacterId: 0,
        fieldName: 'xiaobaix-tasks',
        tasks: [{ id: 'new' }],
        updateCurrentCharacterJson: value => { editorJson = value; },
    });

    assert.equal(request.url, '/api/characters/merge-attributes');
    assert.equal(request.options.headers['X-Test'], '1');
    assert.deepEqual(character.data.extensions['xiaobaix-tasks'].tasks, [{ id: 'new' }]);
    assert.deepEqual(JSON.parse(editorJson).data.extensions['xiaobaix-tasks'].tasks, [{ id: 'new' }]);
});

test('strict character save does not overwrite the editor after the active character changes', async () => {
    const character = {
        avatar: 'owner.png',
        data: { extensions: {} },
        json_data: JSON.stringify({ data: { extensions: {} } }),
    };
    let currentCharacterId = 0;
    let editorJson = '';
    await saveCharacterTaskFieldStrict({
        fetchImpl: async () => {
            currentCharacterId = 1;
            return { ok: true, status: 200 };
        },
        character,
        characterId: 0,
        getCurrentCharacterId: () => currentCharacterId,
        fieldName: 'xiaobaix-tasks',
        tasks: [{ id: 'new' }],
        updateCurrentCharacterJson: value => { editorJson = value; },
    });

    assert.deepEqual(character.data.extensions['xiaobaix-tasks'].tasks, [{ id: 'new' }]);
    assert.equal(editorJson, '');
});

test('strict character save validates local JSON before committing remotely', async () => {
    let fetchCalls = 0;
    await assert.rejects(saveCharacterTaskFieldStrict({
        fetchImpl: async () => { fetchCalls++; return { ok: true, status: 200 }; },
        character: { avatar: 'owner.png', data: { extensions: {} }, json_data: '{invalid' },
        characterId: 0,
        fieldName: 'xiaobaix-tasks',
        tasks: [{ id: 'new' }],
    }), SyntaxError);
    assert.equal(fetchCalls, 0);
});

test('strict character save preserves concurrent editor JSON changes', async () => {
    const character = {
        avatar: 'owner.png',
        data: { extensions: {} },
        json_data: JSON.stringify({ data: { extensions: {} }, concurrent: 'before' }),
    };
    await saveCharacterTaskFieldStrict({
        fetchImpl: async () => {
            character.json_data = JSON.stringify({ data: { extensions: {} }, concurrent: 'after' });
            return { ok: true, status: 200 };
        },
        character,
        characterId: 0,
        currentCharacterId: 0,
        fieldName: 'xiaobaix-tasks',
        tasks: [{ id: 'new' }],
    });
    const saved = JSON.parse(character.json_data);
    assert.equal(saved.concurrent, 'after');
    assert.deepEqual(saved.data.extensions['xiaobaix-tasks'].tasks, [{ id: 'new' }]);
});

test('extension settings save requires the host commit event', async () => {
    const listeners = new Set();
    const eventSource = {
        on: (_event, listener) => listeners.add(listener),
        removeListener: (_event, listener) => listeners.delete(listener),
    };
    await assert.rejects(saveExtensionSettingsStrict({
        saveSettings: async () => {}, eventSource, committedEvent: 'saved',
    }), /未能提交/);
    assert.equal(listeners.size, 0);

    await saveExtensionSettingsStrict({
        saveSettings: async () => { listeners.forEach(listener => listener()); },
        eventSource,
        committedEvent: 'saved',
    });
    assert.equal(listeners.size, 0);
});
