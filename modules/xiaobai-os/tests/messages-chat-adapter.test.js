import assert from 'node:assert/strict';
import { Buffer } from 'node:buffer';
import process from 'node:process';
import test from 'node:test';
import { build } from 'esbuild';
import { PRIVATE_MESSAGE_MARKER } from '../apps/messages/application/projection.js';

// Bundle the production adapter with only native SillyTavern imports substituted.
// The real read/confirm/publish/retry code runs against a controlled HTTP boundary.
const compiled = await build({
    stdin: { contents: `export { createMessagesChatAdapter } from './modules/xiaobai-os/apps/messages/host/chat-adapter.ts';
        export { host } from 'messages-test-host';`, resolveDir: process.cwd() },
    bundle: true, write: false, format: 'esm', platform: 'node', logLevel: 'silent',
    plugins: [{ name: 'native-chat-fixture', setup(builder) {
        builder.onResolve({ filter: /(?:^messages-test-host$|\/(?:extensions|script|group-chats|RossAscends-mods|event-manager|sillytavern-context|story-summary)\.js$)/ },
            () => ({ path: 'host', namespace: 'fixture' }));
        builder.onLoad({ filter: /.*/, namespace: 'fixture' }, () => ({ contents: `
            export const host = { context: null, identity: 'chat', save: null };
            export const getContext = () => host.context;
            export const getSillyTavernChatIdentity = () => ({ key: host.identity });
            export const getStorySummaryCommittedThrough = () => -1;
            export const getRequestHeaders = () => ({});
            export const default_avatar = 'default.png';
            export const isChatSaving = false;
            export const saveChat = () => host.save('character');
            export const saveGroupChat = () => host.save('group');
            export const getMessageTimeStamp = () => '2026-09-06T00:00:00.000Z';
            export const addOneMessage = () => {};
            export const updateMessageBlock = () => {};
            export const event_types = {};
            export const createModuleEvents = () => ({ on() {}, cleanup() {} });
        ` }));
    } }],
});
// eslint-disable-next-line no-unsanitized/method -- Only trusted repository code and the fixed native test fixture are bundled here.
const { createMessagesChatAdapter, host } = await import(`data:text/javascript;base64,${Buffer.from(compiled.outputFiles[0].text).toString('base64')}`);

function harness(t, group) {
    host.identity = 'chat';
    host.context = { chat: [{ mes: 'The story begins.', is_user: false }], chatId: 'chat',
        ...(group ? { groupId: 'group' } : { characterId: '0' }), characters: { 0: { name: 'NPC', avatar: 'npc.png' } },
        chatMetadata: {}, eventSource: { async emit() {} } };
    const h = { remote: structuredClone(host.context.chat), saveMode: 'confirm', failRead: false, reads: [], saves: [] };
    t.mock.method(globalThis, 'fetch', async (url, options) => {
        h.reads.push({ url, body: JSON.parse(options.body) });
        if (h.failRead) {throw new Error('offline read');}
        return new Response(JSON.stringify(h.remote));
    });
    host.save = async kind => {
        h.saves.push(kind);
        if (h.saveMode === 'reject') {throw new Error('offline save');}
        h.remote = structuredClone(host.context.chat);
        if (h.saveMode === 'lose-readback') {h.failRead = true;}
    };
    const { port } = createMessagesChatAdapter(() => false);
    const input = seq => ({ identity: 'chat', index: seq === 1 ? null : 1, text: `Private messages through ${seq}`,
        marker: { version: 1, segmentId: 'segment', throughSeq: seq, digest: String(seq).repeat(64) }, guard: () => true });
    return { h, port, input };
}

for (const group of [false, true]) {
    test(`${group ? 'group' : 'character'} chat confirmation retires the old retry baseline before the next failed save`, async t => {
        const { h, port, input } = harness(t, group);
        h.saveMode = 'lose-readback';
        const first = input(1);
        await assert.rejects(port.publish(first), /offline read/);
        assert.equal(h.remote.length, 2);
        h.failRead = false;
        assert.equal(await port.confirm('chat', first.marker, first.text), true);
        h.saveMode = 'reject';
        const second = input(2);
        await assert.rejects(port.publish(second), /offline save/);
        assert.equal(await port.confirm('chat', second.marker, second.text), false);
        h.saveMode = 'confirm';
        assert.equal(await port.publish(second), true);
        assert.equal(h.remote.length, 2); assert.equal(h.remote[1].mes, second.text);
        assert.equal(h.remote[1].extra[PRIVATE_MESSAGE_MARKER].throughSeq, 2);
        assert.deepEqual(h.saves, [group ? 'group' : 'character', group ? 'group' : 'character', group ? 'group' : 'character']);
        assert.ok(h.reads.every(read => read.url === (group ? '/api/chats/group/get' : '/api/chats/get')));
    });
}

test('a fresh remote baseline is used even without confirm; real external edits still block overwrite', async t => {
    const { h, port, input } = harness(t, false);
    h.saveMode = 'lose-readback'; await assert.rejects(port.publish(input(1)));
    h.failRead = false; h.saveMode = 'reject'; await assert.rejects(port.publish(input(2)), /offline save/);
    h.saveMode = 'confirm'; assert.equal(await port.publish(input(2)), true);
    h.remote[0].mes = 'Edited on another device';
    const native = structuredClone(host.context.chat); const saves = h.saves.length;
    await assert.rejects(port.publish(input(3)), /messages_chat_diverged/);
    assert.deepEqual(host.context.chat, native); assert.equal(h.saves.length, saves);
});

test('a confirmation that finishes after switching chats cannot confirm the new chat', async t => {
    const { h, port, input } = harness(t, false);
    const first = input(1); await port.publish(first);
    t.mock.method(globalThis, 'fetch', async () => {
        host.identity = 'another'; host.context = { ...host.context, chat: [], chatId: 'another' };
        return new Response(JSON.stringify(h.remote));
    });
    assert.equal(await port.confirm('chat', first.marker, first.text), false);
});
