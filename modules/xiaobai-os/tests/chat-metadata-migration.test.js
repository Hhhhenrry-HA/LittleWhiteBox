import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { createFourthWallRepository } from '../apps/fourth-wall/host/repository.js';
import { createChatDataStore } from '../host/chat-data-store.js';

async function loadFixture(name) {
    const text = await readFile(new URL(`./fixtures/${name}`, import.meta.url), 'utf8');
    return JSON.parse(text);
}

function createHarness(metadata, chatId, saveChatMetadata = async () => {}) {
    const state = {
        identity: { key: `character:${chatId}`, chatId },
        metadata,
    };
    return {
        state,
        repository: createFourthWallRepository(createChatDataStore({
            getChatIdentity: () => state.identity,
            getChatMetadata: identity => identity?.key === state.identity?.key ? state.metadata : null,
            saveChatMetadata,
            readPersistedXiaobaiOs: async () => state.metadata.extensions?.LittleWhiteBox?.xiaobaiOs,
        }), { now: () => 1720000000000 }),
    };
}

test('migrates the upstream sessions format without losing observable message fields', async () => {
    const metadata = await loadFixture('upstream-fourth-wall-chat-sessions.json');
    const { repository } = createHarness(metadata, 'character-chat-a');

    const current = await repository.prepareCurrentChatFourthWall();

    assert.deepEqual(current.settings, {
        maxChatLayers: 42,
        maxMetaTurns: 17,
        stream: false,
        disableAssistantPrefill: true,
    });
    assert.equal(current.activeSessionId, 'sess_1710000003000');
    assert.deepEqual(current.sessions[0].history[1], {
        role: 'ai',
        content: 'first assistant message [voice:calm]',
        thinking: 'private reasoning',
        ts: 1710000002000,
    });
    assert.deepEqual(current.sessions[1].history[0], {
        role: 'ai',
        content: '(glanced at the last line) commentary',
        ts: 1710000004000,
        type: 'commentary',
    });
    assert.equal(metadata['character-chat-a'].extensions.LittleWhiteBox.fw, undefined);
    assert.deepEqual(metadata['character-chat-a'].extensions.LittleWhiteBox.keepSibling, { value: 1 });
    assert.deepEqual(metadata['character-chat-a'].extensions.OtherExtension, { keep: true });
    assert.equal(metadata['character-chat-a'].keepChatSibling, 'preserved');
    assert.equal(metadata.unrelatedMetadata, 'preserved');
    assert.equal(metadata.extensions.LittleWhiteBox.xiaobaiOs.schemaVersion, 2);
    assert.deepEqual(metadata.extensions.LittleWhiteBox.xiaobaiOs.domains, {});
});

test('converts the earlier root history format only at the migration boundary', async () => {
    const metadata = await loadFixture('upstream-fourth-wall-chat-history.json');
    const { repository } = createHarness(metadata, 'group-chat-b');

    const current = await repository.prepareCurrentChatFourthWall();

    assert.equal(current.sessions.length, 1);
    assert.equal(current.sessions[0].id, 'default');
    assert.equal(current.sessions[0].createdAt, 1720000000000);
    assert.equal(current.sessions[0].history[1].thinking, 'legacy thought');
    assert.equal(current.settings.disableAssistantPrefill, false);
    assert.equal(Object.hasOwn(current, 'history'), false);
    assert.equal(Object.hasOwn(metadata, 'group-chat-b'), false);
    assert.deepEqual(metadata.unrelatedMetadata, { keep: true });
});

test('restores the complete legacy branch and removes the candidate after a failed migration save', async () => {
    const metadata = await loadFixture('upstream-fourth-wall-chat-sessions.json');
    const before = structuredClone(metadata);
    const { repository } = createHarness(metadata, 'character-chat-a', async () => {
        throw new Error('metadata save failed');
    });

    await assert.rejects(repository.prepareCurrentChatFourthWall(), /metadata save failed/);
    assert.deepEqual(metadata, before);
});

test('reads only the current root after a successful migration', async () => {
    const metadata = await loadFixture('upstream-fourth-wall-chat-sessions.json');
    const { repository } = createHarness(metadata, 'character-chat-a');
    const migrated = await repository.prepareCurrentChatFourthWall();
    metadata['character-chat-a'] = {
        extensions: { LittleWhiteBox: { fw: { history: [] } } },
    };

    assert.deepEqual(repository.readCurrentChatFourthWall(), migrated);
});
