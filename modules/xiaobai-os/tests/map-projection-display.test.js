import assert from 'node:assert/strict';
import test from 'node:test';
import { parseHTML } from 'linkedom';
import { createMapProjectionDisplay } from '../apps/map/host/projection-display.js';
import { createMainGenerationRuntime } from '../host/main-generation-runtime.js';
import { createEmptyMapDomain } from '../domains/map/state.js';
import { isDiceContinuationPending } from '../apps/dice/application/continuation-state.js';
import { prepareActionCheck } from '../apps/dice/application/prepare-action-check.js';
import { DICE_MESSAGE_KEY } from '../apps/dice/domain/check-records.js';
import { mapBrowseFixture } from './fixtures/map-browse.js';

function displayDom() {
    const { document, window } = parseHTML('<html><body><div id="chat"></div></body></html>');
    const globals = new Map();
    const frames = new Map();
    let sequence = 0;
    // linkedom implements compareDocumentPosition but omits the DOM constant on its Node constructor.
    for (const [key, value] of Object.entries({ document, Node: { DOCUMENT_POSITION_FOLLOWING: 4 }, MutationObserver: window.MutationObserver,
        requestAnimationFrame: fn => { frames.set(++sequence, fn); return sequence; }, cancelAnimationFrame: id => frames.delete(id) })) {
        globals.set(key, Object.getOwnPropertyDescriptor(globalThis, key));
        Object.defineProperty(globalThis, key, { value, configurable: true });
    }
    const cleanup = () => { for (const [key, descriptor] of globals) {
        if (descriptor) { Object.defineProperty(globalThis, key, descriptor); } else { delete globalThis[key]; }
    } };
    const flush = async () => { await Promise.resolve(); const work = [...frames.values()]; frames.clear(); work.forEach(fn => fn()); };
    return { document, frames, flush, cleanup };
}

// DOM ownership is the contract: no message/body writes, duplicate surfaces or stale chat data.
test('projection follows only the final assistant, survives rerenders, and owns no message data', async t => {
    const { document, frames, flush, cleanup } = displayDom();
    const source = { identityKey: 'a', messages: [{ is_user: true }, { is_user: false }, { is_user: true }] };
    const state = { chatIdentity: 'a', projectToChat: false, map: null };
    const posts = [], channels = [];
    let notify, disposed = 0, reads = 0, captures = 0, theme = 'light';
    function floor(index) {
        const root = document.createElement('div'); root.className = 'mes'; root.setAttribute('mesid', index);
        const body = document.createElement('div'); body.className = 'mes_text'; body.textContent = `floor-${index}`;
        root.append(body); document.getElementById('chat').append(root); return root;
    }
    const first = floor(0), assistant = floor(1); floor(2);
    const original = structuredClone(source.messages);
    const display = createMapProjectionDisplay({ enabled: () => state.projectToChat, readState: () => { reads++; return structuredClone(state); }, captureChat: () => { captures++; return source; },
        isGenerationActive: () => false,
        readTheme: () => theme, frameSrc: '/projection.html', subscribe(handlers) { notify = handlers; return () => { notify = null; }; },
        bridgeFactory(options) {
            channels.push(options);
            return { post: (type, payload) => { posts.push({ type, payload: structuredClone(payload) }); return true; }, dispose: () => { disposed++; } };
        },
    });
    t.after(() => { display.stop(); cleanup(); });
    display.start(); await flush(); assert.equal(document.querySelector('iframe'), null);
    assert.equal(reads, 0, 'disabled projection never reads map data');
    state.projectToChat = true; notify.stateChanged(); await flush();
    assert.equal(document.querySelector('.xb-map-projection'), null, 'no saved map must leave no wrapper or reserved space');
    state.map = createEmptyMapDomain(); notify.stateChanged(); await flush();
    assert.equal(document.querySelector('.xb-map-projection'), null, 'an empty map document must not reserve space either');
    assert.equal(channels.length, 0, 'empty maps never create a projection iframe channel');
    state.map = mapBrowseFixture(); notify.stateChanged(); await flush();
    const frame = document.querySelector('iframe');
    assert.equal(frame.closest('.mes'), assistant);
    assert.equal(frame.parentElement.previousElementSibling, assistant.querySelector('.mes_text'));
    assert.equal(first.querySelector('iframe'), null);
    assert.equal(channels[0].onMessage, undefined, 'projection channel has no write/request handler');
    const beforeReady = reads;
    channels[0].onReady(); await flush();
    assert.equal(reads, beforeReady, 'iframe readiness reuses the display snapshot');
    state.map.revision = 2; notify.stateChanged(); await flush();
    assert.equal(document.querySelector('iframe'), frame);
    assert.equal(posts.at(-1).payload.state.map.revision, 2);
    const beforeStream = { reads, captures, posts: posts.length };
    for (let chunk = 0; chunk < 10; chunk++) {
        const paragraph = document.createElement('p'); paragraph.textContent = `stream-${chunk}`;
        assistant.querySelector('.mes_text').replaceChildren(paragraph); await flush();
    }
    assert.deepEqual({ reads, captures, posts: posts.length }, beforeStream,
        'streaming text never schedules projection work, reads a map, or pushes a snapshot');
    assistant.querySelector('.mes_text').textContent = 'edited'; notify.messagesChanged(); await flush();
    assert.equal(document.querySelector('iframe'), frame);
    assert.equal(reads, beforeStream.reads, 'an edit completion checks placement without reading the map');
    first.querySelector('.mes_text').textContent = 'old floor swipe'; notify.messagesChanged(); await flush();
    assert.equal(document.querySelector('iframe'), frame, 'an old-floor swipe leaves projection on the final assistant');
    assert.equal(reads, beforeStream.reads);
    const sent = posts.length; notify.stateChanged(); await flush(); assert.equal(posts.length, sent, 'unchanged snapshots do not reset the map renderer');
    const beforeTheme = reads;
    theme = 'dark'; document.documentElement.classList.add('theme-dark'); await flush();
    assert.equal(reads, beforeTheme, 'theme changes do not reread map data');
    assert.equal(posts.at(-1).payload.theme, 'dark');
    const other = document.createElement('aside'); assistant.querySelector('.mes_text').after(other); await flush();
    assert.equal(document.querySelector('iframe'), frame, 'other message decorations do not fight projection placement');
    assert.deepEqual(source.messages, original);

    const replacementBody = document.createElement('div'); replacementBody.className = 'mes_text';
    assistant.replaceChildren(replacementBody);
    const beforeRerender = reads;
    notify.messagesChanged(); await flush();
    const restoredFrame = document.querySelector('iframe');
    assert.equal(restoredFrame.closest('.mes'), assistant, 'a completed host rerender restores the surface');
    assert.equal(reads, beforeRerender, 'host rerenders reuse the snapshot');

    source.messages.push({ is_user: false }); const latest = floor(3); await flush();
    assert.equal(document.querySelector('iframe'), restoredFrame, 'a streaming floor alone does not move projection');
    const beforeRendered = reads;
    const beforeMove = disposed;
    notify.messagesChanged(); await flush();
    assert.equal(document.querySelector('iframe').closest('.mes'), latest);
    assert.equal(assistant.querySelector('iframe'), null);
    assert.equal(document.querySelectorAll('iframe').length, 1);
    assert.equal(disposed, beforeMove + 1);
    assert.equal(reads, beforeRendered, 'AI render completion reuses map data for the new floor');
    latest.remove(); source.messages.pop(); notify.messagesChanged(); await flush();
    assert.equal(document.querySelector('iframe').closest('.mes'), assistant);

    source.identityKey = 'b'; notify.messagesChanged(); await flush();
    assert.equal(document.querySelector('iframe'), null, 'identity mismatch never projects an old map');
    state.chatIdentity = 'b'; state.map = null; notify.chatChanged(); await flush();
    assert.equal(document.querySelector('.xb-map-projection'), null, 'switching to an empty chat leaves no projection wrapper');
    state.map = mapBrowseFixture(); notify.stateChanged(); await flush();
    assert.equal(document.querySelectorAll('iframe').length, 1, 'a later map publication shows the projection without toggling');
    assert.equal(posts.at(-1).payload.state.chatIdentity, 'b');
    for (const empty of [null, createEmptyMapDomain()]) {
        const released = disposed;
        state.map = empty; notify.stateChanged(); await flush();
        assert.equal(document.querySelector('.xb-map-projection'), null, 'clearing existing map data removes the entire region');
        assert.equal(disposed, released + 1, 'clearing releases the old projection channel');
        state.map = mapBrowseFixture(); notify.stateChanged(); await flush();
        assert.equal(document.querySelectorAll('iframe').length, 1);
    }
    display.chatChanged(); assert.equal(document.querySelector('iframe'), null); await flush();
    state.projectToChat = false; notify.stateChanged(); await flush(); assert.equal(document.querySelector('iframe'), null);
    state.projectToChat = true; notify.stateChanged(); await flush(); display.stop();
    assert.equal(notify, null); assert.equal(document.querySelector('iframe'), null);
    assert.equal(frames.size, 0);
    source.messages = [{ is_user: true }]; display.start(); await flush();
    assert.equal(document.querySelector('iframe'), null, 'a chat without an assistant has no projection target');
});

test('projection stays absent throughout main generation and resumes passively from the latest state', async t => {
    const { document, frames, flush, cleanup } = displayDom();
    let hostGenerating = false, lifecycle, notify, reads = 0, captures = 0, disposed = 0;
    const generation = createMainGenerationRuntime({ readHostGenerating: () => hostGenerating,
        subscribe(handlers) { lifecycle = handlers; return () => { lifecycle = null; }; } });
    generation.startBackground();
    const source = { identityKey: 'a', messages: [{ is_user: false }] };
    const state = { chatIdentity: 'a', projectToChat: true, map: mapBrowseFixture() };
    const posts = [];
    function mountFloor(index) {
        const floor = document.createElement('div'); floor.className = 'mes'; floor.setAttribute('mesid', index);
        const body = document.createElement('div'); body.className = 'mes_text'; floor.append(body);
        document.getElementById('chat').append(floor); return floor;
    }
    let latest = mountFloor(0);
    const display = createMapProjectionDisplay({ enabled: () => state.projectToChat, isGenerationActive: generation.isActive,
        isReplyPaused: isDiceContinuationPending,
        readState: () => { reads++; return structuredClone(state); }, captureChat: () => { captures++; return source; },
        readTheme: () => 'light', frameSrc: '/projection.html', subscribe(handlers) {
            notify = handlers;
            const unsubscribe = generation.subscribe(handlers.activityChanged);
            return () => { unsubscribe(); notify = null; };
        },
        bridgeFactory: () => ({ post: (_type, payload) => { posts.push(payload); return true; }, dispose: () => { disposed++; } }),
    });
    t.after(() => { display.stop(); generation.stopBackground(); cleanup(); });
    const surface = () => document.querySelector('.xb-map-projection');
    function hostState(active) { hostGenerating = active; lifecycle.hostStateChanged(); }
    display.start(); await flush(); assert.ok(surface());

    for (const type of ['normal', 'regenerate', 'continue', 'swipe']) {
        lifecycle.started({ type, dryRun: false });
        const before = { reads, captures, posts: posts.length, disposed };
        notify.messagesChanged(); // A pending completed-floor event must not beat generation start.
        hostState(true);
        assert.equal(surface(), null, 'generation immediately removes the entire surface');
        assert.equal(disposed, before.disposed + 1);
        assert.equal(frames.size, 0, 'pending placement work is cancelled');
        source.messages.push({ is_user: false }); latest = mountFloor(source.messages.length - 1);
        for (let chunk = 0; chunk < 10; chunk++) {
            latest.querySelector('.mes_text').textContent += 'chunk';
            state.map.revision++; notify.stateChanged();
            notify.messagesChanged(); // Includes intermediate tool/message completion.
            document.documentElement.classList.toggle('theme-dark');
            await flush();
            assert.equal(surface(), null);
        }
        state.projectToChat = false; notify.stateChanged();
        state.projectToChat = true; notify.stateChanged(); await flush();
        assert.deepEqual({ reads, captures, posts: posts.length }, { reads: before.reads, captures: before.captures, posts: before.posts },
            'stream, domain, settings and theme changes cannot read or publish a map during generation');
        hostState(false);
        assert.equal(surface(), null, 'generation end schedules attachment instead of mounting inside the host event');
        await flush();
        assert.equal(surface().closest('.mes'), latest);
        assert.equal(reads, before.reads + 1, 'coalesced map changes are read once at completion');
        assert.equal(posts.at(-1).state.map.revision, state.map.revision);
    }

    lifecycle.groupStarted({ type: 'normal', dryRun: false });
    lifecycle.started({ type: 'normal', dryRun: false }); hostState(true);
    hostState(false); notify.messagesChanged(); await flush();
    assert.equal(surface(), null, 'a completed group member cannot reveal the projection mid-turn');
    lifecycle.groupFinished(); await flush(); assert.ok(surface());

    const beforePause = reads;
    lifecycle.started({ type: 'normal', dryRun: false }); hostState(true);
    const reply = source.messages.at(-1);
    const request = '<xb_action_check>{"action":"Climb","stat":"Agility","difficulty":"hard"}</xb_action_check>\n</fictional_scenarios>';
    reply.mes = request; notify.activityChanged(); hostState(false);
    state.map.revision++; notify.stateChanged(); notify.messagesChanged(); await flush();
    assert.equal(surface(), null, 'native stop at a Dice choice is not a completed reply');
    assert.equal(reads, beforePause, 'map publications remain deferred throughout a Dice pause');
    const candidate = prepareActionCheck({ body: request, generatedFrom: 0, id: 'projection-check', random: () => .3 });
    assert.equal(candidate.kind, 'candidate');
    reply.mes = candidate.body; reply.extra = { [DICE_MESSAGE_KEY]: candidate.records };
    source.messages.push({ is_user: true, mes: 'Continue' }, { is_system: true, extra: { type: 'narrator' }, mes: 'Note' });
    notify.activityChanged(); notify.messagesChanged(); await flush();
    assert.equal(surface(), null, 'a later User/system message cannot release the target AI floor');
    assert.equal(reads, beforePause);
    display.stop(); display.start(); await flush();
    assert.equal(surface(), null, 'a restored Dice pause does not depend on seeing generation start');
    lifecycle.started({ type: 'continue', dryRun: false }); hostState(true);
    reply.mes += '\nAfterward.'; notify.activityChanged(); await flush();
    assert.equal(surface(), null, 'releasing Dice cannot reveal the map during native continuation');
    hostState(false); await flush(); assert.equal(surface().closest('.mes'), latest);
    const beforePausedSwipe = disposed;
    reply.mes = candidate.body; notify.messagesChanged(); await flush();
    assert.equal(surface(), null, 'switching to a saved paused swipe hides an already visible map');
    assert.equal(disposed, beforePausedSwipe + 1, 'a content pause disposes the projection channel');
    reply.mes += '\nAfterward.'; notify.activityChanged(); await flush(); assert.ok(surface());
    reply.mes += '\n' + request; notify.messagesChanged(); await flush();
    assert.equal(surface(), null, 'editing in another executable request hides the projection');
    reply.mes = candidate.body + '\nAfterward.'; notify.messagesChanged(); await flush(); assert.ok(surface());

    const beforePreflight = surface();
    lifecycle.started({ type: 'normal', dryRun: false }); lifecycle.hostStateChanged(); await flush();
    assert.equal(surface(), beforePreflight, 'failed preflight cannot strand the projection hidden');
    lifecycle.started({ type: 'quiet', dryRun: false }); hostState(true); await flush();
    assert.equal(surface(), beforePreflight, 'background generation does not hide the chat map');
    hostState(false);

    lifecycle.started({ type: 'swipe', dryRun: false }); hostState(true);
    const beforeRestart = reads;
    display.stop(); display.start(); await flush();
    assert.equal(surface(), null, 'restarting the projection during generation leaves no placeholder');
    assert.equal(reads, beforeRestart);
    hostState(false); await flush(); assert.ok(surface(), 'stop/error recovery needs no message-rendered event');

    display.stop(); generation.stopBackground();
    hostGenerating = true;
    generation.startBackground(); display.start(); await flush();
    assert.equal(surface(), null, 'starting OS mid-reply cannot expose an existing map without a start event');
    hostState(false); await flush();
    assert.ok(surface(), 'late-started projection receives the real completion boundary');

    lifecycle.started({ type: 'continue', dryRun: false }); hostState(true);
    state.map = null; notify.stateChanged(); hostState(false); await flush();
    assert.equal(surface(), null, 'completion cannot restore a map that was cleared during generation');
    state.map = mapBrowseFixture(); notify.stateChanged(); await flush(); assert.ok(surface());

    lifecycle.started({ type: 'normal', dryRun: false }); hostState(true);
    source.identityKey = 'b'; state.chatIdentity = 'b'; notify.chatChanged(); await flush();
    assert.equal(surface(), null);
    hostState(false); await flush(); assert.equal(posts.at(-1).state.chatIdentity, 'b');

    lifecycle.started({ type: 'normal', dryRun: false }); hostState(true);
    state.projectToChat = false; notify.stateChanged(); hostState(false); await flush();
    assert.equal(surface(), null, 'turning the setting off during generation prevents remount');
    display.stop(); hostState(true); hostState(false);
    assert.equal(frames.size, 0, 'shutdown releases generation subscriptions');
});

test('new swipe preflight hides projection and native rollback restores it without generation-end events', async t => {
    const { document, flush, cleanup } = displayDom();
    const message = { is_user: false, mes: 'saved', swipe_id: 0, swipes: ['saved', 'other saved'] };
    const source = { identityKey: 'a', messages: [message] };
    const state = { chatIdentity: 'a', projectToChat: true, map: mapBrowseFixture() };
    let reads = 0, captures = 0, notify;
    const floor = () => {
        const root = document.createElement('div'); root.className = 'mes last_mes'; root.setAttribute('mesid', '0'); root.setAttribute('swipeid', '0');
        const body = document.createElement('div'); body.className = 'mes_text'; body.textContent = message.mes;
        root.append(body); return root;
    };
    const chat = document.getElementById('chat');
    let latest = floor(); chat.append(latest);
    const display = createMapProjectionDisplay({ enabled: () => state.projectToChat, isGenerationActive: () => false,
        readState: () => { reads++; return structuredClone(state); }, captureChat: () => { captures++; return source; },
        readTheme: () => 'light', frameSrc: '/projection.html', subscribe(handlers) { notify = handlers; return () => {}; },
        bridgeFactory: () => ({ post: () => true, dispose() {} }),
    });
    t.after(() => { display.stop(); cleanup(); });
    const surface = () => document.querySelector('.xb-map-projection');
    display.start(); await flush(); assert.ok(surface());
    for (const version of ['1.14', '1.18']) {
        // Native selection precedes Generate('swipe') and its awaited server ping.
        message.swipe_id = message.swipes.length;
        latest.querySelector('.mes_text').textContent = '...';
        notify.messagesChanged(); await flush();
        assert.equal(surface(), null, `${version}: pending candidate is not a completed floor`);
        const before = { reads, captures };
        latest.querySelector('.mes_text').textContent = 'changed prose'; await flush();
        assert.deepEqual({ reads, captures }, before, 'waiting for rollback does not observe streaming text');
        state.map.revision++; notify.stateChanged(); await flush();
        assert.equal(surface(), null); assert.equal(reads, before.reads, 'preflight defers dirty map reads too');

        // Frozen native rollback boundaries: addOneMessage writes swipeid in 1.14;
        // redisplayChat replaces direct #chat children in 1.18. Neither emits completion.
        message.swipe_id = 0;
        if (version === '1.14') {
            latest.querySelector('.mes_text').textContent = message.mes;
            latest.setAttribute('swipeid', '0');
        } else {
            latest = floor(); chat.replaceChildren(latest);
        }
        await flush();
        assert.ok(surface(), `${version}: failed ping and native rollback must not strand the map hidden`);
        assert.equal(reads, before.reads + 1);
        message.swipe_id = 1; notify.messagesChanged(); await flush();
        assert.ok(surface(), 'existing candidates remain browsable');
    }
    message.swipe_id = message.swipes.length; notify.messagesChanged(); await flush();
    assert.equal(surface(), null);
    message.swipes.push('generated'); notify.messagesChanged(); await flush();
    assert.ok(surface(), 'successful candidate becomes eligible at completion');
    message.swipe_id = message.swipes.length; notify.messagesChanged(); await flush();
    display.stop(); const stopped = captures;
    latest.setAttribute('swipeid', '0'); await flush();
    assert.equal(captures, stopped, 'stop removes native rollback observation');
});
