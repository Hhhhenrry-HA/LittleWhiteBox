import assert from 'node:assert/strict';
import { Buffer } from 'node:buffer';
import test from 'node:test';
import { XiaobaiOsPartitionRegistry } from '../kernel/partition-registry.js';
import { createTransactionCoordinator } from '../kernel/transaction-coordinator.js';
import { MESSAGES_PARTITION } from '../apps/messages/partition.js';
import { createMessagesService } from '../apps/messages/application/service.js';
import { createMessagesTimeline } from '../apps/messages/application/timeline.js';
import { sendPrivateMessage } from '../apps/messages/application/send.js';
import { addContact, appendMessages, deleteContact, deleteImageMessage } from '../domains/messages/commands.js';
import { branchMessages } from '../apps/messages/application/branch.js';
import { PRIVATE_MESSAGE_MARKER, projectionMarker, unsyncedIds } from '../apps/messages/application/projection.js';
import { normalizePromptContext } from '../host/prompt-context/normalize.js';
import { createMessagesRuntime, syncCurrentMessages } from '../apps/messages/host/runtime.js';
import { createMessagesController } from '../apps/messages/host/controller.js';
import { createMessageImages } from '../apps/messages/host/image-attachments.js';
import { parseOutgoingMessage } from '../apps/messages/application/image-upload.js';

const clone = structuredClone;
async function harness() {
    const binding = { kind: 'character', ownerLocator: 'test.png', chatId: 'chat' };
    const h = { identity: 'chat', persisted: null, writes: 0, replace: null, messages: [], remote: [], publishes: 0, failProjection: false, apiCalls: 0, response: null,
        images: new Map(), uploads: 0, upload: null, requests: [] };
    h.persisted = { formatVersion: 1, osId: 'os', binding, revision: 0, commitId: 'initial', partitions: {} };
    let serial = 0; const id = () => `id-${++serial}`;
    const capture = () => ({ identityKey: h.identity, binding, reference: { formatVersion: 1, osId: 'os' } });
    const registry = new XiaobaiOsPartitionRegistry(); registry.register(MESSAGES_PARTITION);
    const coordinator = createTransactionCoordinator({ partitions: registry, createId: id,
        chatReferences: { capture, isCurrent: value => value.identityKey === h.identity, install: async () => ({ status: 'confirmed' }) },
        storage: {
            async read() {return clone(h.persisted);},
            async replace(input) {h.writes++; if (h.replace) {return h.replace(input);} h.persisted = clone(input.candidate); return { status: 'confirmed' };},
            async delete() {return 'deleted';},
        },
    });
    const service = createMessagesService(coordinator.createScopedStore(MESSAGES_PARTITION), coordinator);
    const chat = {
        identity: () => h.identity, messages: () => h.messages,
        finalizedThrough: () => h.finalizedThrough ?? -1,
        async confirm(identity, marker, text) {return identity === h.identity && h.remote.some(message => message.mes === text && projectionMarker(message)?.digest === marker.digest);},
        async publish({ index, text, marker, guard }) {
            assert.equal(guard(), true); h.publishes++;
            const message = { name: '私人信息', is_user: false, is_system: false, mes: text, extra: { swipeable: false, [PRIVATE_MESSAGE_MARKER]: marker } };
            if (index === null) {h.messages.push(message);} else {h.messages[index] = message;}
            if (h.failProjection) {return false;}
            h.remote = clone(h.messages); return true;
        },
    };
    let timeline = createMessagesTimeline(service, chat, id);
    const images = createMessageImages(async (data, folder, name, format) => {
        h.uploads++;
        if (h.upload) {await h.upload();}
        const path = `/user/images/${folder}/${name}.${format}`;
        h.images.set(path, Buffer.from(data, 'base64'));
        return path;
    }, async path => h.images.has(path) ? new Response(h.images.get(path)) : new Response(null, { status: 404 }));
    const deps = { service, timeline, images, context: { capture: async () => ({ ...normalizePromptContext({}), people: [] }) },
        agent: { loadConfig: async () => ({}), openSession: async () => ({ providerConfig: { model: 'fixture' }, run: async request => {
            h.requests.push(request);
            h.apiCalls++; if (h.response) {return h.response();}
            return { text: '{"replies":[{"type":"text","text":"马上到。"},{"type":"voice","transcript":"等我一下。"}]}' };
        } }) }, playerName: () => '玩家', id,
    };
    await service.change(state => {
        for (const name of ['甲', '乙']) {addContact(state, { id: name, name, note: '', createdAt: 0, summary: null });}
    });
    const send = (contactId, messageId, payload = { type: 'text', text: '来吗？' }) => sendPrivateMessage(deps, { contactId, messageId, payload, guard: () => true, signal: new AbortController().signal, stage: () => undefined });
    return Object.assign(h, { service, deps, send, chat, coordinator, get timeline() {return timeline;}, restart() {timeline = createMessagesTimeline(service, chat, id); deps.timeline = timeline;} });
}

const photo = parseOutgoingMessage({ type: 'image', description: '', upload: {
    name: '照片.png', dataUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a2XsAAAAASUVORK5CYII=',
} });

test('device image is saved once, persists as a local reference, and reaches the reply model as pixels after rereading', async () => {
    const h = await harness();
    await h.send('甲', 'photo', photo);
    const stored = MESSAGES_PARTITION.parse(h.persisted.partitions.messages).value;
    const attachment = stored.messages[0].payload.attachment;
    assert.equal(attachment.name, '照片.png');
    assert.equal(h.images.has(attachment.path), true);
    assert.equal(JSON.stringify(stored).includes('data:image'), false);
    assert.match(h.messages[0].mes, /附件="\/user\/images\/xb-os-messages\//u);
    const pixels = request => request.messages.flatMap(m => Array.isArray(m.content) ? m.content : []).filter(p => p.type === 'image_url').map(p => p.image_url.url);
    assert.deepEqual(pixels(h.requests[0]), [photo.upload.dataUrl]);
    h.restart(); await h.send('甲', 'photo', photo);
    assert.equal(h.uploads, 1); assert.equal(h.apiCalls, 1);
    await h.send('甲', 'later');
    assert.deepEqual(pixels(h.requests[1]), [photo.upload.dataUrl]);
    await h.send('乙', 'other');
    assert.deepEqual(pixels(h.requests[2]), []);
    await h.service.change(state => deleteContact(state, '甲'));
    assert.equal(h.images.has(attachment.path), true); // native floors / other branches still refer to host media
});

test('failed upload publishes no outgoing message; retry keeps one image and missing pixels do not silently become a text-only request', async () => {
    const h = await harness(); h.upload = async () => {throw new Error('offline');};
    await assert.rejects(h.send('甲', 'photo', photo), /offline/);
    assert.equal(h.service.current().messages.length, 0); assert.equal(h.messages.length, 0); assert.equal(h.apiCalls, 0);
    h.upload = null; h.failProjection = true;
    await assert.rejects(h.send('甲', 'photo', photo), /projection_unconfirmed/);
    const uploads = h.uploads;
    h.failProjection = false; h.images.clear();
    await assert.rejects(h.send('甲', 'photo', photo), /image_missing/);
    assert.equal(h.uploads, uploads); assert.equal(h.apiCalls, 0);
    assert.equal(h.service.current().messages.length, 1);
});

test('an image-rejecting provider can recover by deleting the picture, then sending or retrying text without rolling back history', async t => {
    for (const older of [false, true]) {
        await t.test(older ? 'delete a historical picture and retry the latest text' : 'delete the failed picture and send text', async () => {
            const h = await harness();
            if (older) {await h.send('甲', 'photo', photo); await h.send('乙', 'other');}
            h.response = async () => {
                if (h.requests.at(-1).messages.some(m => Array.isArray(m.content) && m.content.some(p => p.type === 'image_url'))) {
                    throw Object.assign(new Error('image input unsupported'), { status: 400 });
                }
                return { text: '{"replies":[{"type":"text","text":"文字可以继续。"}]}' };
            };
            await assert.rejects(older ? h.send('甲', 'later') : h.send('甲', 'photo', photo), { status: 400 });
            const original = h.service.current(); const native = clone(h.messages); const apiCalls = h.apiCalls;
            const runtime = createMessagesRuntime({ ...h.deps, identity: () => h.identity, isGenerating: () => false, changed() {} });
            const controller = createMessagesController({ ...h.deps, runtime, identity: () => h.identity,
                context: { ...h.deps.context, knownPeople: () => [] }, media: { capabilities: () => ({ image: false, voice: false }) },
                isGenerating: () => false, subscribeGeneration: () => () => {}, subscribeChat: () => () => {} });
            controller.activate({ isCurrent: () => true, post() {} });
            const deletion = { type: 'messages/message/delete-image', payload: { chatIdentity: 'chat', contactId: '甲', messageId: 'photo' } };
            const result = await controller.handleMessage(deletion);
            assert.deepEqual(await controller.handleMessage(deletion), result); // retry after a lost acknowledgement
            assert.equal(result.retryMessageId, older ? 'later' : null);
            const retained = original.messages.filter(m => m.id !== 'photo').map(m => m.replyTo === 'photo' ? { ...m, replyTo: null } : m);
            assert.deepEqual(h.service.current().messages, retained);
            assert.deepEqual(h.messages, native); assert.equal(h.images.size, 1); assert.equal(h.apiCalls, apiCalls);
            assert.deepEqual(unsyncedIds(h.service.current()), []);
            assert.deepEqual(branchMessages(h.service.current(), h.messages).messages, retained);
            h.restart(); await h.send('甲', 'later');
            assert.equal(h.service.current().messages.at(-1).payload.text, '文字可以继续。');
            assert.equal(h.service.current().messages.filter(m => m.id === 'later').length, 1);
            assert.equal(h.requests.at(-1).messages.some(m => Array.isArray(m.content) && m.content.some(p => p.type === 'image_url')), false);
            assert.deepEqual(h.messages.slice(0, native.length), native);
        });
    }
});

test('failed or uncertain image deletion stays visible until storage confirms; a stale guard cannot delete it', async t => {
    for (const status of ['failed', 'unconfirmed']) {
        await t.test(status, async () => {
            const h = await harness(); await h.send('甲', 'photo', photo); await h.send('甲', 'later');
            const original = h.service.current();
            await assert.rejects(h.service.change(state => deleteImageMessage(state, '甲', 'photo'), () => false));
            assert.deepEqual(h.service.current(), original);
            h.replace = input => {
                if (status === 'unconfirmed') {h.persisted = clone(input.candidate); return { status, observed: null };}
                return { status, error: { code: 'network', message: 'offline', retryable: true } };
            };
            await assert.rejects(h.service.change(state => deleteImageMessage(state, '甲', 'photo')), new RegExp('save_' + status));
            assert.deepEqual(h.service.current(), original); assert.equal(h.service.pending(), true);
            h.replace = null; await h.service.confirm();
            assert.equal(h.service.current().messages.some(m => m.id === 'photo'), false);
            assert.equal(h.service.current().messages.at(-1).id, original.messages.at(-1).id);
            assert.equal(h.service.pending(), false); assert.equal(h.images.size, 1);
            assert.equal(MESSAGES_PARTITION.parse(h.persisted.partitions.messages).ok, true);
        });
    }
});

test('cancel during image upload cannot publish a late picture into the original or a different chat', async () => {
    const h = await harness(); let release; let started;
    const uploading = new Promise(resolve => {started = resolve;});
    h.upload = () => {started(); return new Promise(resolve => {release = resolve;});};
    const signal = new AbortController();
    const sending = sendPrivateMessage(h.deps, { contactId: '甲', messageId: 'photo', payload: photo,
        guard: () => h.identity === 'chat', signal: signal.signal, stage() {} });
    await uploading; h.identity = 'different'; signal.abort(); release();
    await assert.rejects(sending);
    assert.equal(h.service.current().messages.length, 0); assert.equal(h.apiCalls, 0);
});

test('cross-contact messages share one native assistant floor; ordinary story seals it permanently', async () => {
    const h = await harness(); await h.send('甲', 'a'); await h.send('乙', 'b');
    assert.equal(h.messages.length, 1); assert.equal(h.service.current().messages.length, 6);
    assert.equal(h.messages[0].extra.swipeable, false);
    const old = h.messages[0].mes;
    h.messages.push({ mes: '下一段剧情', is_user: false });
    await h.deps.timeline.seal(h.deps.timeline.observe(), () => true);
    h.messages.pop(); // deleting later story must not reopen the old timepoint
    await h.send('甲', 'c');
    assert.equal(h.messages.length, 2); assert.equal(h.messages[0].mes, old);
    assert.deepEqual(unsyncedIds(h.service.current()), []);
});

test('native edits/deletes never rewrite app history or resurrect a floor after restart', async () => {
    const h = await harness(); await h.send('甲', 'a');
    h.messages[0].mes = '主人改写的内容'; h.remote = clone(h.messages); h.restart();
    await h.send('乙', 'b'); assert.equal(h.messages[0].mes, '主人改写的内容'); assert.equal(h.messages.length, 2);
    h.messages.pop(); h.remote = clone(h.messages); h.restart();
    await h.send('乙', 'c'); assert.equal(h.messages.length, 2);
    assert.equal(h.service.current().messages.length, 9);
    assert.notEqual(projectionMarker(h.messages[1]).segmentId, h.service.current().segments[1].id);
});

test('a failed user-floor sync retries the same message; a confirmed reply retries sync without another Agent call', async () => {
    const h = await harness(); h.failProjection = true;
    await assert.rejects(h.send('甲', 'a'), /projection_unconfirmed/);
    assert.equal(h.apiCalls, 0); assert.equal(h.service.current().messages.length, 1);
    h.failProjection = false; await h.send('甲', 'a');
    assert.equal(h.messages.length, 1); assert.equal(h.apiCalls, 1); assert.equal(h.service.current().messages.length, 3);
    await h.send('甲', 'a'); assert.equal(h.apiCalls, 1); assert.equal(h.service.current().messages.length, 3);
});

test('chat confirmation recovers a missing sidecar receipt without publishing another floor', async () => {
    const h = await harness();
    const segmentId = await h.deps.timeline.select(() => true);
    await h.service.change(state => appendMessages(state, { segmentId, contactId: '甲', playerName: '玩家', replyTo: null,
        entries: [{ id: 'a', payload: { type: 'text', text: 'hello' } }], createdAt: 0 }));
    h.replace = () => ({ status: 'failed', error: { code: 'network', message: 'offline', retryable: true } });
    await assert.rejects(h.deps.timeline.sync(segmentId, () => true), /save_failed/);
    assert.equal(h.messages.length, 1); assert.equal(h.publishes, 1);
    h.replace = null; await h.service.confirm(); h.restart();
    await h.deps.timeline.sync(segmentId, () => true);
    assert.equal(h.publishes, 1); assert.deepEqual(unsyncedIds(h.service.current()), []);
});

test('ambiguous missing floor after restart needs explicit current-time recovery, never automatic recreation', async () => {
    const h = await harness(); h.failProjection = true;
    await assert.rejects(h.send('甲', 'a'));
    h.messages = []; h.remote = []; h.failProjection = false; h.restart();
    await assert.rejects(h.send('甲', 'a'), /projection_closed/);
    assert.equal(h.messages.length, 0);
    await h.deps.timeline.recover(() => true);
    assert.equal(h.messages.length, 1); assert.match(h.messages[0].mes, /补录说明/);
    await syncCurrentMessages(h.service, h.deps.timeline, () => true);
    await h.deps.timeline.recover(() => true);
    assert.equal(h.messages.length, 1);
    await h.send('甲', 'a'); assert.equal(h.apiCalls, 1); assert.equal(h.messages.length, 1);
});

test('uncertain reply save retains the complete candidate; confirming it never reruns generation', async () => {
    const h = await harness();
    h.response = async () => {
        h.replace = input => {h.persisted = clone(input.candidate); return { status: 'unconfirmed', observed: null };};
        return { text: '{"replies":[{"type":"text","text":"a"},{"type":"text","text":"b"}]}' };
    };
    await assert.rejects(h.send('甲', 'a'), /save_unconfirmed/);
    assert.equal(h.service.current().messages.length, 1);
    h.replace = null; await h.service.confirm();
    await h.send('甲', 'a');
    assert.equal(h.apiCalls, 1); assert.equal(h.service.current().messages.length, 3);
    assert.equal(h.messages.length, 1);
});

test('contact removal seals shared floors and keeps other contact history and native evidence intact', async () => {
    const h = await harness(); await h.send('甲', 'a'); await h.send('乙', 'b');
    const before = clone(h.messages);
    await h.service.change(state => deleteContact(state, '甲'));
    await h.send('乙', 'c');
    assert.deepEqual(h.messages[0], before[0]); assert.equal(h.messages.length, 2);
    assert.equal(h.service.current().messages.filter(m => m.contactId === '甲').length, 0);
});

test('a floor summarized while the producer was disabled cannot be extended when it resumes', async () => {
    const h = await harness(); await h.send('甲', 'a');
    const original = h.messages[0].mes;
    h.finalizedThrough = 0;
    h.restart();
    await h.send('乙', 'b');
    assert.equal(h.messages.length, 2);
    assert.equal(h.messages[0].mes, original);
    assert.equal(h.service.current().segments[0].sealed, true);
    assert.deepEqual(unsyncedIds(h.service.current()), []);
});

test('chat/run cancellation rejects a late Provider result while preserving the confirmed outgoing message', async () => {
    const h = await harness(); let release;
    const called = new Promise(resolve => {h.response = () => {resolve(); return new Promise(r => {release = r;});};});
    const runtime = createMessagesRuntime({ ...h.deps, identity: () => h.identity, isGenerating: () => false, changed: () => undefined });
    runtime.start('甲', 'a', { type: 'text', text: 'hi' }); await called;
    runtime.cancel(); h.identity = 'another'; h.identity = 'chat';
    release({ text: '{"replies":[{"type":"text","text":"late"}]}' }); await runtime.stop();
    assert.equal(h.service.current().messages.length, 1);
    assert.equal(h.messages.length, 1);
});

test('leaving the APP keeps an accepted reply running and reactivation reads the confirmed facts', async () => {
    const h = await harness(); let release;
    const called = new Promise(resolve => {h.response = () => {resolve(); return new Promise(r => {release = r;});};});
    let finished;
    const idle = new Promise(resolve => {finished = resolve;});
    const runtime = createMessagesRuntime({ ...h.deps, identity: () => h.identity, isGenerating: () => false,
        changed: () => {if (!runtime.active) {finished();}} });
    const controller = createMessagesController({ ...h.deps, runtime, identity: () => h.identity,
        context: { ...h.deps.context, knownPeople: () => [] }, media: { capabilities: () => ({ image: false, voice: false }), cancelAll() {} },
        isGenerating: () => false, subscribeGeneration: () => () => {}, subscribeChat: () => () => {} });
    const updates = [];
    const activation = { isCurrent: () => true, post(type, payload) {updates.push({ type, payload });} };
    controller.activate(activation);
    await controller.handleMessage({ type: 'messages/send', payload: { chatIdentity: 'chat', actionId: 'a', contactId: '甲', payload: { type: 'text', text: 'hi' } } });
    await called; controller.deactivate();
    release({ text: '{"replies":[{"type":"text","text":"still here"}]}' }); await idle;
    const view = controller.activate(activation);
    controller.emit();
    assert.equal(updates.at(-1).type, 'messages/state');
    assert.equal(updates.at(-1).payload.state.chatIdentity, 'chat');
    assert.equal(view.contacts.find(contact => contact.id === '甲').preview, 'still here');
    assert.equal(view.busy, null); assert.equal(h.apiCalls, 1); assert.equal(h.messages.length, 1);
    await runtime.stop();
});

test('cancellation after reply replace begins preserves its confirmed batch but defers chat projection', async () => {
    const h = await harness(); let release; let started;
    const writing = new Promise(resolve => {started = resolve;});
    h.replace = input => {
        if (input.candidate.partitions.messages.messages.length > 1) {
            started(); return new Promise(resolve => {release = () => {h.persisted = clone(input.candidate); resolve({ status: 'confirmed' });};});
        }
        h.persisted = clone(input.candidate); return { status: 'confirmed' };
    };
    const runtime = createMessagesRuntime({ ...h.deps, identity: () => h.identity, isGenerating: () => false, changed() {} });
    runtime.start('甲', 'a', { type: 'text', text: 'hi' }); await writing;
    const stopped = runtime.stop(); release(); await stopped;
    assert.equal(h.service.current().messages.length, 3);
    assert.equal(h.messages[0].mes.includes('马上到'), false);
    assert.equal(unsyncedIds(h.service.current()).length, 2);
    h.replace = null; await syncCurrentMessages(h.service, h.deps.timeline, () => true);
    assert.equal(h.messages[0].mes.includes('马上到'), true); assert.equal(h.apiCalls, 1);
});

test('consecutive native edit events persist the sealed timepoint even while generation starts', async () => {
    const h = await harness(); await h.send('甲', 'a'); let onChat; let generating = false;
    const runtime = createMessagesRuntime({ ...h.deps, identity: () => h.identity, isGenerating: () => generating, changed() {} });
    const controller = createMessagesController({ ...h.deps, runtime, identity: () => h.identity,
        context: { ...h.deps.context, knownPeople: () => [] }, media: { capabilities: () => ({ image: false, voice: false }), cancelAll() {} },
        isGenerating: () => generating, subscribeGeneration: () => () => {}, subscribeChat(listener) {onChat = listener; return () => {};},
    });
    controller.startBackground();
    h.messages[0].mes = 'edited'; onChat(); generating = true; onChat(); runtime.cancel();
    await h.service.change(() => {});
    assert.equal(h.service.current().segments[0].sealed, true);
    await controller.stopBackground();
});
