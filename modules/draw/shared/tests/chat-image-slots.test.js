import assert from 'node:assert/strict';
import test from 'node:test';
import { Buffer } from 'node:buffer';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
import { build } from 'esbuild';
import { indexedDB, IDBObjectStore } from 'fake-indexeddb';
import { parseHTML } from 'linkedom';
import showdown from 'showdown';
import { prepareTauriTavernDrawBranches } from '../../../../integrations/tauritavern/features/draw/chat-branches.js';

// Real markup, gallery transactions, chat save/readback, executor and UI. Only
// SillyTavern boundaries and image-provider responses are simulated; no paid API.
const host = { ctx: null, events: new Map(), afterAi: null, errors: [] };
globalThis.__chatImageSlotsTest = host;
globalThis.indexedDB = indexedDB;
globalThis.BroadcastChannel = undefined;
const markdown = new showdown.Converter({ simpleLineBreaks: true, tables: true });
host.format = value => markdown.makeHtml(value);
const stubs = {
    'extensions.js': 'export const getContext = () => globalThis.__chatImageSlotsTest.ctx;',
    'script.js': 'export const messageFormatting = text => globalThis.__chatImageSlotsTest.format(text); export const getRequestHeaders = () => ({});',
    'utils.js': 'export const uuidv4 = () => crypto.randomUUID(); export const saveBase64AsFile = async () => { throw new Error("unexpected upload"); };',
    'event-manager.js': `
        const host = globalThis.__chatImageSlotsTest;
        export const event_types = new Proxy({}, { get: (_, key) => key });
        export const createModuleEvents = () => ({
            on(key, fn) { host.events.set(key, fn); }, cleanup() { host.events.clear(); }
        });`,
    'generate-interceptor.js': `export const GENERATE_INTERCEPTOR_ORDER = {};
        export const registerGenerateInterceptor = () => {}; export const unregisterGenerateInterceptor = () => {};`,
    'after-ai-gate.js': `export const initAfterAiGate = () => {};
        export const notifyAfterAiHint = () => globalThis.__chatImageSlotsTest.afterAi?.();
        export const registerAfterAiHandler = (_, fn) => { globalThis.__chatImageSlotsTest.afterAi = fn;
            return () => { globalThis.__chatImageSlotsTest.afterAi = null; }; };`,
    'debug-core.js': 'export const xbLog = { error(...args) { globalThis.__chatImageSlotsTest.errors.push(args.at(-1)?.message); }, warn() {}, info() {} };',
    'draw-run-recovery-runtime.js': 'export const runDrawRunRecoveryPass = async () => {};',
};
const bundle = await build({
    stdin: { contents: [
        'draw-common', 'gallery-cache', 'prepared-chat-images', 'chat-message-images',
        'chat-image-tag-migration', 'card-tag-editor', 'image-card-actions', 'generated-image-runtime',
        'pending-image-jobs', 'image-job-recovery-runtime',
    ].map(name => `export * from './${name}.js';`).join('\n'), resolveDir: fileURLToPath(new URL('..', import.meta.url)) },
    bundle: true, write: false, format: 'esm', platform: 'node', plugins: [{ name: 'host', setup(builder) {
        builder.onResolve({ filter: /\.js$/ }, ({ path }) => {
            const name = path.split('/').at(-1);
            return Object.hasOwn(stubs, name) ? { path: name, namespace: 'host' } : null;
        });
        builder.onLoad({ filter: /.*/, namespace: 'host' }, ({ path }) => ({ contents: stubs[path] }));
    } }],
});
// Executes the local production bundle above, not untrusted generated code.
// eslint-disable-next-line no-unsanitized/method
const api = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);
const tick = () => new Promise(resolve => setTimeout(resolve, 10));
async function until(predicate) {
    for (let i = 0; i < 100; i++) { if (await predicate()) return; await tick(); }
    assert.fail('condition not reached: ' + JSON.stringify(host.errors));
}

let chatNumber = 0;
function setup(t, source, { legacy = false } = {}) {
    host.errors = [];
    const { document, window } = parseHTML('<html><head></head><body><div id="chat"><div class="mes" mesid="0"><div class="mes_text"></div></div></div></body></html>');
    globalThis.document = document;
    globalThis.window = window;
    const observed = new Set();
    globalThis.IntersectionObserver = class {
        constructor(callback) { this.callback = callback; host.observer = this; }
        observe(node) { observed.add(node); }
        unobserve(node) { observed.delete(node); }
        disconnect() { observed.clear(); }
    };
    const message = { name: 'Alice', mes: source, swipe_id: 0, swipes: [source], extra: {} };
    let persisted;
    let saves = 0;
    let responses = 0;
    let deliver;
    let hold = false;
    let saveMode = 'ok';
    let cacheReadsFail = false;
    let onSave;
    const ctx = host.ctx = { chatId: `chat-${++chatNumber}`, chat: [message], characterId: 0,
        characters: [{ name: 'Alice', avatar: 'alice.png' }],
        chatMetadata: legacy ? {} : { [api.CHAT_IMAGE_TAG_FORMAT_KEY]: api.CHAT_IMAGE_TAG_FORMAT_VERSION },
        getRequestHeaders: () => ({}), saveChat: async () => {
            saves++;
            await onSave?.();
            if (saveMode === 'uncertain') throw new Error('save disconnected');
            persisted = structuredClone([{ chat_metadata: ctx.chatMetadata }, ...ctx.chat]);
        } };
    globalThis.fetch = async () => {
        if (saveMode === 'uncertain') throw new Error('readback disconnected');
        return new Response(JSON.stringify(persisted));
    };
    window.xiaobaixDraw = {
        getStatus: () => ({ enabled: true, ready: true }), getProvider: () => 'novelai',
        prepareGeneration(input) {
            if (cacheReadsFail) throw new Error('cache descriptor failed');
            return { fingerprint: { provider: 'novelai', promptData: { positive: input.prompt,
                characterPrompts: [], negativePrompt: '' } }, execute: async () => { throw new Error('legacy generation forbidden'); } };
        },
    };
    const submissions = [];
    const dispose = api.registerPreparedImageProvider('novelai', input => {
        submissions.push(input);
        return api.submitPreparedChatImages({ ...input, backend: false,
            metadata: input.tasks.map(task => ({ tags: task.scene, positive: task.scene,
                characterPrompts: task.characterPrompts, negativePrompt: task.negativePrompt ?? '' })),
            run: async callbacks => {
                responses++;
                if (hold) await new Promise(resolve => { deliver = resolve; });
                for (const index of input.tasks.keys()) await callbacks.onItemReady({ index, base64: 'YWJj' });
            } });
    });
    const root = document.querySelector('.mes_text');
    function format() {
        // Test-owned message formatted through Markdown, as the host would.
        // eslint-disable-next-line no-unsanitized/property
        root.innerHTML = host.format(message.mes);
    }
    format();
    t.after(() => {
        api.stopImageJobRecovery(); api.configureChatImageTagMigration();
        api.cleanupChatMessageImages(); api.clearPreviewObjectUrls(); dispose();
    });
    return { ctx, message, root, observed, submissions, format,
        get persisted() { return structuredClone(persisted); },
        trigger(nodes = [...observed]) { host.observer.callback(nodes.map(target => ({ target, isIntersecting: true }))); },
        get saves() { return saves; }, get requests() { return responses; },
        set hold(value) { hold = value; }, finish() { deliver?.(); },
        set saveMode(value) { saveMode = value; }, set cacheReadsFail(value) { cacheReadsFail = value; },
        set onSave(value) { onSave = value; },
    };
}

test('lazy new tags batch once, persist both swipes, survive repeat events and remount without redraw', async t => {
    const h = setup(t, 'before [img: same] middle [img: other] end [img: same]');
    api.initChatMessageImages();
    await until(() => h.observed.size === 3);
    assert.equal(h.requests, 0);
    const nodes = [...h.observed];
    h.trigger(nodes); h.trigger(nodes);
    await until(() => h.root.querySelectorAll('.xb-nd-img img').length === 3);
    assert.equal(h.requests, 1);
    assert.equal(h.saves, 1);
    assert.equal(h.message.swipes[0], h.message.mes);
    assert.equal(new Set(h.root.querySelectorAll('[data-slot-id]')).size, 3);
    const slots = [...h.root.querySelectorAll('[data-slot-id]')].map(node => node.dataset.slotId);
    assert.equal(new Set(slots).size, 3);
    for (const id of slots) assert.equal((await api.getPreviewsBySlot(id)).length, 1);
    h.format();
    const release = api.mountChatMessageImages(h.root, 0);
    await api.renderPreviewsForMessage(0);
    await tick(); release();
    assert.equal(h.requests, 1);
    assert.equal(h.root.querySelectorAll('.xb-nd-img img').length, 3);
});

test('untriggered new tag remains raw across reload and can generate for the first time', async t => {
    const h = setup(t, '[img: first] and [img: later]');
    api.initChatMessageImages();
    await until(() => h.observed.size === 2);
    h.trigger([h.root.querySelector('[data-xb-draw-tag]')]);
    await until(() => h.root.querySelectorAll('.xb-nd-img img').length === 1);
    assert.ok(h.message.mes.includes('[img: later]'));
    api.cleanupChatMessageImages(); h.format(); api.initChatMessageImages();
    await until(() => h.observed.size === 1);
    h.trigger();
    await until(() => h.requests === 2);
    await until(() => !h.message.mes.includes('[img:'));
});

test('content lease disposal does not cancel a claimed request', async t => {
    const h = setup(t, '[img: keep]'); h.hold = true;
    api.initChatMessageImages(); await until(() => h.observed.size === 1);
    h.trigger(); await until(() => h.requests === 1);
    const release = api.mountChatMessageImages(h.root, 0); release();
    h.finish();
    await until(() => h.root.querySelector('img'));
    assert.equal(h.requests, 1);
});

test('uncertain save retains registered input but makes zero generation requests', async t => {
    const h = setup(t, '[img: retain]'); h.saveMode = 'uncertain';
    api.initChatMessageImages(); await until(() => h.observed.size === 1);
    h.trigger(); await until(() => h.root.querySelector('[data-state="failed"]'));
    assert.equal(h.requests, 0);
    const card = h.root.querySelector('[data-slot-id]');
    assert.equal((await api.getCardPreview(card.dataset)).status, 'pending');
    assert.equal((await api.getCardPreview(card.dataset)).tags, 'retain');
    api.refreshChatMessageImages(); await tick();
    assert.equal(h.requests, 0);
});

test('edited tags persist for image and interrupted card, redraw reads the selected record rather than stale DOM', async t => {
    const h = setup(t, '[image:edit-slot]');
    await api.storePreview({ slotId: 'edit-slot', imgId: 'edit-img', messageId: 0, tags: 'old',
        positive: 'old', characterPrompts: [], negativePrompt: '', status: 'pending' });
    await api.renderPreviewsForMessage(0);
    let card = h.root.querySelector('.xb-nd-img');
    card.querySelector('textarea').value = 'new tags';
    await api.persistCardTagEdits(card, tags => ({ positive: tags }));
    h.format(); await api.renderPreviewsForMessage(0);
    card = h.root.querySelector('.xb-nd-img');
    assert.equal(card.dataset.tags, 'new tags');
    card.dataset.tags = 'stale DOM';
    await api.redrawImageCard('novelai', card);
    assert.equal(h.submissions[0].tasks[0].scene, 'new tags');
    assert.deepEqual(h.submissions[0].tasks[0].characterPrompts, []);
    assert.equal(h.root.querySelectorAll('img').length, 1);
});

test('removing a slot clears its active swipe, every version and selection; never restores shorthand', async t => {
    const h = setup(t, '[image:remove-slot]');
    await api.storePreview({ slotId: 'remove-slot', imgId: 'remove-img', tags: 'tag', messageId: 0, status: 'pending' });
    await api.setSlotSelection('remove-slot', 'remove-img');
    await api.renderPreviewsForMessage(0);
    await api.removeChatImageSlot(h.root.querySelector('.xb-nd-img'));
    assert.equal(h.message.mes, '');
    assert.equal(h.message.swipes[0], '');
    assert.equal((await api.getPreviewsBySlot('remove-slot')).length, 0);
    assert.equal(await api.getSlotSelection('remove-slot'), null);
});

test('failed redraw retains access to existing versions without another image request', async t => {
    const h = setup(t, '[image:retained-version]');
    await api.storePreview({ slotId: 'retained-version', imgId: 'retained-image', tags: 'old scene',
        messageId: 0, base64: 'YWJj' });
    await api.storePreview({ slotId: 'retained-version', imgId: 'failed-attempt', tags: 'edited scene',
        messageId: 0, status: 'failed' });
    await api.setSlotSelection('retained-version', 'failed-attempt');
    await api.renderPreviewsForMessage(0);
    const failedCard = h.root.querySelector('.xb-nd-img');
    assert.equal(failedCard.dataset.state, 'failed');
    assert.ok(failedCard.querySelector('[data-action="restore-image"]'));
    assert.equal(await api.restoreImageCard(failedCard), true);
    h.format(); await api.renderPreviewsForMessage(0);
    assert.equal(h.root.querySelector('.xb-nd-img').dataset.imgId, 'retained-image');
    assert.ok(h.root.querySelector('img'));
    assert.equal((await api.getPreview('failed-attempt')).tags, 'edited scene');
    assert.equal(h.requests, 0);
});

test('legacy miss migration is cache-only across active and inactive swipes; new tags stay lazy', async t => {
    const h = setup(t, '[img: old]', { legacy: true });
    h.message.swipes.push('[图片: alternate]');
    await api.ensureChatImageTagFormat(h.ctx);
    assert.equal(h.ctx.chatMetadata[api.CHAT_IMAGE_TAG_FORMAT_KEY], api.CHAT_IMAGE_TAG_FORMAT_VERSION);
    for (const text of [h.message.mes, h.message.swipes[1]]) assert.match(text, /^\[image:/);
    assert.equal(h.requests, 0);
    h.message.mes += '[img: new]';
    await api.ensureChatImageTagFormat(h.ctx);
    assert.ok(h.message.mes.endsWith('[img: new]'));
});

test('legacy cache hit imports the exact old cache identity without calling generation', async t => {
    const h = setup(t, '[img: cached]', { legacy: true });
    const facade = window.xiaobaixDraw;
    const prepare = facade.prepareGeneration;
    facade.prepareGeneration = input => ({ ...prepare(input), execute: async () => 'YWJj' });
    await api.generateSharedImage({ prompt: 'cached', cacheNamespace: 'fourth-wall' });
    facade.prepareGeneration = prepare;
    await api.ensureChatImageTagFormat(h.ctx);
    await api.renderPreviewsForMessage(0);
    assert.equal(h.root.querySelectorAll('img').length, 1);
    assert.equal(h.requests, 0);
});

test('legacy read error aborts migration without marker or metadata writes and without generation', async t => {
    const h = setup(t, '[img: old]', { legacy: true }); h.cacheReadsFail = true;
    await assert.rejects(api.ensureChatImageTagFormat(h.ctx));
    assert.equal(h.message.mes, '[img: old]');
    assert.equal(h.ctx.chatMetadata[api.CHAT_IMAGE_TAG_FORMAT_KEY], undefined);
    assert.equal(h.requests, 0); assert.equal(h.saves, 0);
});

test('new chat format registration does not migrate or claim its first new tags', async t => {
    const h = setup(t, '[img: first]', { legacy: true });
    api.markFreshImageTagChat(h.ctx);
    await api.ensureChatImageTagFormat(h.ctx);
    assert.equal(h.message.mes, '[img: first]'); assert.equal(h.requests, 0);
    assert.equal(h.ctx.chatMetadata[api.CHAT_IMAGE_TAG_FORMAT_KEY], api.CHAT_IMAGE_TAG_FORMAT_VERSION);
});

test('migration identity follows chat metadata when SillyTavern reuses its chat array', async t => {
    const h = setup(t, '[img: old a]', { legacy: true });
    await api.ensureChatImageTagFormat(h.ctx);
    h.ctx.chatId = 'other-chat';
    h.ctx.chatMetadata = {};
    h.ctx.chat.splice(0, 1, { name: 'Bob', mes: '[img: old b]', extra: {} });
    await api.ensureChatImageTagFormat(h.ctx);
    assert.match(h.ctx.chat[0].mes, /^\[image:/);
    assert.equal(h.requests, 0);
});

test('SillyTavern 1.14 group metadata is confirmed from its group record, not a nonexistent chat header', async t => {
    const h = setup(t, '[img: old group]', { legacy: true });
    let savedChat, savedGroup;
    h.ctx.groupId = 'group-114';
    h.ctx.saveChat = async () => { savedChat = structuredClone(h.ctx.chat); };
    h.ctx.saveMetadata = async () => { savedGroup = { id: h.ctx.groupId, chat_id: h.ctx.chatId,
        chat_metadata: structuredClone(h.ctx.chatMetadata) }; };
    globalThis.fetch = async url => new Response(JSON.stringify(url === '/api/groups/all' ? [savedGroup] : savedChat));
    await api.ensureChatImageTagFormat(h.ctx);
    assert.equal(savedGroup.chat_metadata[api.CHAT_IMAGE_TAG_FORMAT_KEY], api.CHAT_IMAGE_TAG_FORMAT_VERSION);
    assert.match(savedChat[0].mes, /^\[image:/);
    assert.equal(h.requests, 0);
});

test('editing or swiping before placement cannot overwrite user changes', async t => {
    const h = setup(t, '[img: original]');
    const input = { ctx: h.ctx, message: h.message, messageId: 0, sourceText: h.message.mes,
        tasks: [{ scene: 'original', characterPrompts: [], placement: { mode: 'replace', start: 0, end: 15, marker: h.message.mes } }] };
    h.message.mes = 'user edit';
    await assert.rejects(api.generatePreparedChatImages('novelai', input));
    assert.equal(h.message.mes, 'user edit'); assert.equal(h.requests, 0);
});

test('switching branch during save stops submission and preserves both branch texts', async t => {
    const h = setup(t, '[img: branch]');
    h.message.swipes.push('alternate');
    h.onSave = () => { h.message.swipe_id = 1; h.message.mes = 'alternate'; };
    api.initChatMessageImages(); await until(() => h.observed.size === 1);
    h.trigger(); await until(() => host.errors.length > 0);
    assert.equal(h.message.mes, 'alternate');
    assert.match(h.message.swipes[0], /^\[image:/);
    assert.equal(h.requests, 0);
});

test('local delivery after navigation retains original gallery ownership despite a reused host array', async t => {
    const h = setup(t, '[img: original]'); h.hold = true;
    api.initChatMessageImages(); await until(() => h.observed.size === 1);
    h.trigger(); await until(() => h.requests === 1);
    const sourceId = h.ctx.chatId;
    const slot = h.message.mes.match(/\[image:([^\]]+)\]/)[1];
    host.ctx = { ...h.ctx, chatId: 'next', chatMetadata: {} };
    h.ctx.chat.splice(0, 1, { mes: 'next chat', name: 'Bob' });
    h.finish();
    await until(async () => (await api.getDisplayPreviewForSlot(slot)).hasData);
    const record = (await api.getDisplayPreviewForSlot(slot)).preview;
    assert.equal(record.chatId, sourceId);
    assert.equal(host.ctx.chat[0].mes, 'next chat');
});

test('deleting the selected image clears only its own selection', async t => {
    setup(t, '[image:delete-selection]');
    await api.storePreview({ slotId: 'delete-selection', imgId: 'selection-image', base64: 'YWJj', tags: 'x', messageId: 0 });
    await api.setSlotSelection('delete-selection', 'selection-image');
    await api.deletePreview('selection-image');
    assert.equal(await api.getSlotSelection('delete-selection'), null);
});

test('aborted TAG edit does not change card text, image or stored metadata', async t => {
    const h = setup(t, '[image:abort-edit]');
    await api.storePreview({ slotId: 'abort-edit', imgId: 'abort-img', base64: 'YWJj', tags: 'old',
        messageId: 0, characterPrompts: [], negativePrompt: 'negative' });
    await api.renderPreviewsForMessage(0);
    const card = h.root.querySelector('.xb-nd-img');
    card.querySelector('textarea').value = 'new';
    const put = IDBObjectStore.prototype.put;
    t.mock.method(IDBObjectStore.prototype, 'put', function (value, ...args) {
        if (value.imgId === 'abort-img') { this.transaction.abort(); return; }
        return put.call(this, value, ...args);
    });
    await assert.rejects(api.persistCardTagEdits(card, tags => ({ positive: tags })));
    assert.equal(card.dataset.tags, 'old');
    const record = await api.getPreview('abort-img');
    assert.equal(record.tags, 'old'); assert.equal(record.base64, 'YWJj'); assert.equal(record.negativePrompt, 'negative');
});

test('aborted legacy IndexedDB read is not treated as a cache miss or a generation request', async t => {
    const h = setup(t, '[img: cache failure]', { legacy: true });
    const get = IDBObjectStore.prototype.get;
    t.mock.method(IDBObjectStore.prototype, 'get', function (...args) {
        const request = get.apply(this, args);
        if (this.name === 'images') this.transaction.abort();
        return request;
    });
    await assert.rejects(api.ensureChatImageTagFormat(h.ctx));
    assert.equal(h.message.mes, '[img: cache failure]');
    assert.equal(h.ctx.chatMetadata[api.CHAT_IMAGE_TAG_FORMAT_KEY], undefined);
    assert.equal(h.saves, 0); assert.equal(h.requests, 0);
});

test('editing a saved card after preview cache loss keeps its saved image reference', async t => {
    const h = setup(t, '[image:saved-editor]');
    h.message.extra.xiaobaixDrawSaved = { 'saved-editor': { imgId: 'saved-editor-image', tags: 'old', savedUrl: '/existing-image.png' } };
    await api.renderPreviewsForMessage(0);
    const card = h.root.querySelector('.xb-nd-img');
    card.querySelector('textarea').value = 'changed';
    await api.persistCardTagEdits(card, tags => ({ positive: tags }));
    assert.equal((await api.getPreview('saved-editor-image')).savedUrl, '/existing-image.png');
    h.format(); await api.renderPreviewsForMessage(0);
    assert.equal(h.root.querySelector('.xb-nd-img').dataset.tags, 'changed');
    assert.equal(h.root.querySelector('img').getAttribute('src'), '/existing-image.png');
});

async function registerHeldRedraw(t, h, { oldImage = true, saved = true, cancelled = false } = {}) {
    const slotId = api.extractSlotIds(h.message.mes).values().next().value;
    const oldId = `${slotId}-old`;
    if (saved) h.message.extra.xiaobaixDrawSaved = { [slotId]: { imgId: oldId, savedUrl: '/old.png', tags: 'old' } };
    if (oldImage) {
        await api.storePreview({ slotId, imgId: oldId, tags: 'old', base64: 'YWJj', messageId: 0 });
        await api.setSlotSelection(slotId, oldId);
    }
    await h.ctx.saveChat();
    // Use the production prepared executor to create the local delivery plan;
    // the simulated backend pauses before delivering anything.
    let record;
    await assert.rejects(api.submitPreparedChatImages({ ctx: h.ctx, message: h.message, messageId: 0,
        sourceText: h.message.mes, tasks: [{ scene: 'new', placement: { mode: 'existing', slotId } }],
        metadata: [{ tags: 'new', positive: 'new', characterPrompts: [], negativePrompt: '' }], backend: true,
        run: async ({ recoverable }) => {
            record = await api.recordPendingImageJob({ ...recoverable.plan, jobId: `job-${slotId}`, provider: 'sd-webui' });
            await recoverable.commitPlacements();
            await api.markPendingImageJobActive(record.jobId, record.leaseId);
            if (cancelled) await api.markPendingImageJobCancelling(record.jobId, record.leaseId);
            await api.renewPendingImageJobLease(record.jobId, record.leaseId, { now: 0 });
            throw Object.assign(new Error('page detached'), { detached: true });
        } }), error => error.detached === true);
    t.after(async () => {
        const current = await api.getPendingImageJob(record.jobId);
        if (current) await api.forgetPendingImageJob(current.jobId, current.leaseId);
    });
    return { slotId, oldId, imgId: record.items[0].imgId, record };
}

test('refresh with an existing image and active redraw shows pending and cannot resubmit through a stale card', async t => {
    const h = setup(t, '[image:refresh-redraw]');
    const job = await registerHeldRedraw(t, h);
    h.format(); await api.renderPreviewsForMessage(0);
    assert.equal(h.root.querySelector('[data-state="pending"]')?.dataset.slotId, job.slotId);
    await api.redrawImageCard('novelai', { dataset: { slotId: job.slotId, imgId: job.oldId, mesid: '0', tags: 'old' } });
    assert.equal(h.submissions.length, 0);
    assert.ok(await api.getPendingImageJob(job.record.jobId));
});

test('journal read failure never authorizes another redraw', async t => {
    const h = setup(t, '[image:unreadable-journal]');
    const reports = t.mock.method(console, 'error', () => {});
    const getAll = IDBObjectStore.prototype.getAll;
    t.mock.method(IDBObjectStore.prototype, 'getAll', function (...args) {
        const request = getAll.apply(this, args);
        if (this.name === 'jobs') this.transaction.abort();
        return request;
    });
    await assert.rejects(api.redrawImageCard('novelai', { dataset: {
        slotId: 'unreadable-journal', mesid: '0', tags: 'scene',
    } }));
    assert.equal(h.submissions.length, 0);
    assert.ok(reports.mock.calls.length > 0);
});

test('already delivered item remains visible while its journal is awaiting final settlement', async t => {
    const h = setup(t, '[image:delivered-pending-settlement]');
    const job = await registerHeldRedraw(t, h);
    await api.storePreview({ slotId: job.slotId, imgId: job.imgId, base64: 'ZGVm', tags: 'new', messageId: 0 });
    await api.setSlotSelection(job.slotId, job.imgId);
    h.format(); await api.renderPreviewsForMessage(0);
    assert.ok(h.root.querySelector('img'));
    assert.equal(h.root.querySelector('.xb-nd-img').dataset.imgId, job.imgId);
    assert.ok(await api.getPendingImageJob(job.record.jobId));
});

for (const oldImage of [true, false]) test(`cancel recovery retains existing slot and editable input${oldImage ? ' with old image' : ' after old cache expired'}`, async t => {
    const h = setup(t, `[image:cancel-redraw-${oldImage}]`);
    const source = h.message.mes;
    const job = await registerHeldRedraw(t, h, { oldImage, cancelled: true });
    api.startImageJobRecovery({ client: { listJobs: async () => [] } });
    await api.reconcilePendingImageJobs(); api.stopImageJobRecovery();
    assert.equal(h.message.mes, source);
    assert.equal(h.message.swipes[0], source);
    assert.equal(h.persisted[1].mes, source);
    assert.equal(await api.getPendingImageJob(job.record.jobId), null);
    const interrupted = await api.getPreview(job.imgId);
    assert.equal(interrupted.status, 'failed');
    assert.equal(interrupted.tags, 'new');
    assert.deepEqual(interrupted.characterPrompts, []);
    assert.equal(interrupted.negativePrompt, '');
    assert.equal(h.root.querySelector('.xb-nd-img').dataset.imgId, job.imgId);
    if (oldImage) {
        assert.ok((await api.getPreview(job.oldId)).base64);
        assert.equal(await api.restoreImageCard(h.root.querySelector('.xb-nd-img')), true);
        assert.equal(h.root.querySelector('.xb-nd-img').dataset.imgId, job.oldId);
    }
    assert.equal(h.requests, 0);
});

test('recovered redraw selects and displays its new image over the old saved reference', async t => {
    const h = setup(t, '[image:recovered-version]');
    const job = await registerHeldRedraw(t, h);
    api.startImageJobRecovery({ client: {
        listJobs: async () => [{ id: job.record.jobId }],
        attachJob: async (_id, handlers) => {
            await handlers.onItemReady({ index: 0, response: new Response('simulated image') });
            return {};
        },
    }, decoders: { 'sd-webui': async () => 'ZGVm' } });
    await api.reconcilePendingImageJobs(); api.stopImageJobRecovery();
    assert.equal(await api.getSlotSelection(job.slotId), job.imgId);
    assert.equal(await api.getPendingImageJob(job.record.jobId), null);
    h.format(); await api.renderPreviewsForMessage(0);
    assert.equal(h.root.querySelector('.xb-nd-img').dataset.imgId, job.imgId);
    assert.notEqual(h.root.querySelector('img').getAttribute('src'), '/old.png');
});

test('redraw completed in another chat is selected on return without writing the current chat', async t => {
    const h = setup(t, '[image:detached-redraw]');
    const slotId = 'detached-redraw';
    h.message.extra.xiaobaixDrawSaved = { [slotId]: { imgId: 'detached-old', savedUrl: '/old.png', tags: 'old' } };
    await api.storePreview({ slotId, imgId: 'detached-old', tags: 'old', base64: 'YWJj', messageId: 0 });
    await api.setSlotSelection(slotId, 'detached-old');
    await h.ctx.saveChat();
    await api.renderPreviewsForMessage(0);
    h.hold = true;
    const operation = api.redrawImageCard('novelai', h.root.querySelector('.xb-nd-img'));
    await until(() => h.requests === 1);
    const sourceId = h.ctx.chatId;
    const originalSaved = h.persisted[1];
    let wrongChatSaves = 0;
    host.ctx = { ...h.ctx, chatId: 'other-chat', chatMetadata: {}, saveChat: async () => { wrongChatSaves++; } };
    h.ctx.chat.splice(0, 1, { name: 'Bob', mes: 'unrelated chat' });
    h.finish(); await operation;
    assert.equal(wrongChatSaves, 0);
    assert.equal(host.ctx.chat[0].mes, 'unrelated chat');
    const selected = await api.getSlotSelection(slotId);
    assert.notEqual(selected, 'detached-old');
    assert.equal((await api.getPreview(selected)).chatId, sourceId);
    // Returning loads the server's original saved reference, not the detached
    // in-memory message. The explicit gallery selection must still win.
    host.ctx = h.ctx;
    h.ctx.chat.splice(0, 1, originalSaved);
    h.root.textContent = originalSaved.mes;
    await api.renderPreviewsForMessage(0);
    assert.equal(h.root.querySelector('.xb-nd-img').dataset.imgId, selected);
    assert.notEqual(h.root.querySelector('img').getAttribute('src'), '/old.png');
});

test('saved selected image remains available after its preview cache expires', async t => {
    const h = setup(t, '[image:saved-fallback]');
    h.message.extra.xiaobaixDrawSaved = { 'saved-fallback': { imgId: 'saved-only', savedUrl: '/saved.png', tags: 'saved' } };
    await api.setSlotSelection('saved-fallback', 'saved-only');
    await api.renderPreviewsForMessage(0);
    assert.equal(h.root.querySelector('img').getAttribute('src'), '/saved.png');
    assert.equal(h.root.querySelector('.xb-nd-img').dataset.imgId, 'saved-only');
});

const coldSwipeFixture = JSON.parse(await readFile(new URL(
    '../../../../integrations/tauritavern/tests/fixtures/cold-swipes-2.3.json', import.meta.url,
), 'utf8'));

function setupColdChat(t) {
    const h = setup(t, 'current body', { legacy: true });
    const original = structuredClone(coldSwipeFixture.original);
    original.swipes[0] += ' [img: historic image]';
    Object.assign(h.message, original, structuredClone(coldSwipeFixture.projection));
    return { h, original };
}

test('Tauri cold historical branch is migrated before version commit and never auto-generated on first opening', async t => {
    const { h, original } = setupColdChat(t);
    let hydrationCalls = 0;
    api.configureChatImageTagMigration({ prepareBranches: ctx => prepareTauriTavernDrawBranches(ctx, async () => ({
        hydrateMessageSwipes: async message => {
            hydrationCalls++;
            for (const key of ['swipes', 'swipe_info']) original[key].forEach((value, i) => { message[key][i] ??= value; });
            delete message.tt_swipe_cold;
        },
    })) });
    await api.ensureChatImageTagFormat(h.ctx);
    assert.equal(hydrationCalls, 1);
    assert.equal(h.message.mes, original.mes);
    const slots = api.extractSlotIds(h.message.swipes[0]);
    assert.equal(slots.size, 1);
    const preview = (await api.getPreviewsBySlot([...slots][0]))[0];
    assert.equal(preview.tags, 'historic image');
    assert.equal(preview.status, 'failed');
    assert.equal(h.persisted[0].chat_metadata[api.CHAT_IMAGE_TAG_FORMAT_KEY], api.CHAT_IMAGE_TAG_FORMAT_VERSION);
    assert.equal(h.persisted[1].swipes[0], h.message.swipes[0]);
    h.message.swipe_id = 0; h.message.mes = h.message.swipes[0]; h.format();
    api.initChatMessageImages(); await tick(); await tick();
    assert.equal(h.observed.size, 0);
    assert.equal(h.requests, 0);
});

test('cold swipe read failure leaves migration and requests uncommitted', async t => {
    const { h } = setupColdChat(t);
    api.configureChatImageTagMigration({ prepareBranches: ctx => prepareTauriTavernDrawBranches(ctx, async () => ({
        hydrateMessageSwipes: async () => { throw new Error('cold source unavailable'); },
    })) });
    await assert.rejects(api.ensureChatImageTagFormat(h.ctx));
    assert.equal(h.ctx.chatMetadata[api.CHAT_IMAGE_TAG_FORMAT_KEY], undefined);
    assert.equal(h.message.swipes[0], null);
    assert.equal(h.saves, 0); assert.equal(h.requests, 0);
});

test('navigating while hydrating old branches never marks the next chat migrated', async t => {
    const { h } = setupColdChat(t);
    api.configureChatImageTagMigration({ prepareBranches: async () => {
        host.ctx = { ...h.ctx, chatId: 'next-cold-chat', chatMetadata: {} };
        h.ctx.chat.splice(0, 1, { name: 'Bob', mes: '[img: next chat]' });
    } });
    await assert.rejects(api.ensureChatImageTagFormat(h.ctx));
    assert.equal(host.ctx.chatMetadata[api.CHAT_IMAGE_TAG_FORMAT_KEY], undefined);
    assert.equal(host.ctx.chat[0].mes, '[img: next chat]');
    assert.equal(h.saves, 0); assert.equal(h.requests, 0);
});
