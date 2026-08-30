import assert from 'node:assert/strict';
import test from 'node:test';

import { createFourthWallRepository } from '../apps/fourth-wall/host/repository.js';
import { createChatDataStore } from '../host/chat-data-store.js';

function createHarness() {
    const chats = new Map([
        ['character:a', {}],
        ['character:b', {}],
    ]);
    const identities = {
        a: { key: 'character:a', chatId: 'a' },
        b: { key: 'character:b', chatId: 'b' },
    };
    const state = {
        identity: identities.a,
        saves: [],
        saveImpl: async transaction => state.saves.push(transaction.identity.key),
    };
    const store = createChatDataStore({
        getChatIdentity: () => state.identity,
        getChatMetadata: identity => chats.get(identity?.key) ?? null,
        saveChatMetadata: transaction => state.saveImpl(transaction),
        readPersistedXiaobaiOs: async identity => chats.get(identity?.key)?.extensions?.LittleWhiteBox?.xiaobaiOs,
    });
    const repository = createFourthWallRepository(store, { now: () => 1000 });
    return { chats, identities, repository, state, store };
}

test('read does not create current chat data', () => {
    const { chats, repository } = createHarness();

    assert.equal(repository.readCurrentChatFourthWall(), null);
    assert.deepEqual(chats.get('character:a'), {});
});

test('keeps chat A and B data isolated without a chat-id wrapper in the current root', async () => {
    const { chats, identities, repository, state } = createHarness();
    await repository.prepareCurrentChatFourthWall();
    await repository.mutateCurrentChatFourthWall((next) => {
        next.sessions[0].history.push({ role: 'user', content: 'only A', ts: 1001 });
        return next;
    });

    state.identity = identities.b;
    assert.equal(repository.readCurrentChatFourthWall(), null);
    await repository.prepareCurrentChatFourthWall();
    assert.deepEqual(repository.readCurrentChatFourthWall().sessions[0].history, []);
    assert.equal(Object.hasOwn(chats.get('character:a'), 'a'), false);
    assert.equal(Object.hasOwn(chats.get('character:b'), 'b'), false);

    state.identity = identities.a;
    assert.equal(repository.readCurrentChatFourthWall().sessions[0].history[0].content, 'only A');
});

test('rejects a mutation when chat identity changes before save and restores the previous state', async () => {
    const { identities, repository, state } = createHarness();
    await repository.prepareCurrentChatFourthWall();
    const before = repository.readCurrentChatFourthWall();
    state.saveImpl = async () => {};

    await assert.rejects(repository.mutateCurrentChatFourthWall((next) => {
        next.sessions[0].name = 'must not persist';
        state.identity = identities.b;
        return next;
    }), error => error.code === 'CHAT_CHANGED');

    state.identity = identities.a;
    assert.deepEqual(repository.readCurrentChatFourthWall(), before);
});

test('a queued mutation stays bound to the chat that issued it', async () => {
    const { chats, identities, repository, state } = createHarness();
    await repository.prepareCurrentChatFourthWall();
    let releaseSave;
    let markSaveStarted;
    const saveStarted = new Promise(resolve => { markSaveStarted = resolve; });
    const saveGate = new Promise(resolve => { releaseSave = resolve; });
    state.saveImpl = async () => {
        markSaveStarted();
        await saveGate;
    };

    const first = repository.mutateCurrentChatFourthWall((next) => {
        next.sessions[0].name = 'first A write';
        return next;
    });
    await saveStarted;
    let queuedActionRan = false;
    const queued = repository.mutateCurrentChatFourthWall((next) => {
        queuedActionRan = true;
        next.sessions[0].name = 'must not reach B';
        return next;
    });
    const queuedRejection = assert.rejects(queued, error => error.code === 'CHAT_CHANGED');
    const firstRejection = assert.rejects(first, error => error.code === 'CHAT_CHANGED');

    state.identity = identities.b;
    releaseSave();
    await firstRejection;
    await queuedRejection;

    assert.equal(queuedActionRan, false);
    assert.deepEqual(chats.get('character:b'), {});
    state.identity = identities.a;
    assert.equal(repository.readCurrentChatFourthWall().sessions[0].name, 'first A write');
});

test('restores the previous branch when a mutation save fails', async () => {
    const { repository, state } = createHarness();
    await repository.prepareCurrentChatFourthWall();
    const before = repository.readCurrentChatFourthWall();
    state.saveImpl = async () => { throw new Error('save failed'); };

    await assert.rejects(repository.mutateCurrentChatFourthWall((next) => {
        next.sessions[0].name = 'unsaved';
        return next;
    }), /save failed/);

    assert.deepEqual(repository.readCurrentChatFourthWall(), before);
});

test('keeps the candidate when the server save result cannot be confirmed', async () => {
    const { repository, state } = createHarness();
    await repository.prepareCurrentChatFourthWall();
    state.saveImpl = async () => {
        throw Object.assign(new Error('read-back failed'), { code: 'SAVE_UNCONFIRMED', uncertain: true });
    };

    await assert.rejects(repository.mutateCurrentChatFourthWall((next) => {
        next.sessions[0].name = 'pending confirmation';
        return next;
    }), error => error.code === 'SAVE_UNCONFIRMED');

    assert.equal(repository.readCurrentChatFourthWall().sessions[0].name, 'pending confirmation');
});

test('rejects an unknown chat schema without changing or saving it', async () => {
    const { chats, repository, state } = createHarness();
    chats.get('character:a').extensions = {
        LittleWhiteBox: {
            xiaobaiOs: { schemaVersion: 7, apps: {} },
        },
    };
    const before = structuredClone(chats.get('character:a'));

    await assert.rejects(repository.prepareCurrentChatFourthWall(), error => error.code === 'UNSUPPORTED_CHAT_VERSION');
    assert.deepEqual(chats.get('character:a'), before);
    assert.deepEqual(state.saves, []);
});

test('deletes only the fourth-wall app and removes an empty OS root', async () => {
    const { chats, repository } = createHarness();
    await repository.prepareCurrentChatFourthWall();

    assert.equal(await repository.deleteCurrentChatFourthWall(), true);
    assert.equal(chats.get('character:a').extensions, undefined);
    assert.equal(await repository.deleteCurrentChatFourthWall(), false);
});
