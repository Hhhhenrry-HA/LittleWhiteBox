import assert from 'node:assert/strict';
import test from 'node:test';
import { parseHTML } from 'linkedom';
import { createMapProjectionDisplay } from '../apps/map/host/projection-display.js';
import { createEmptyMapDomain } from '../domains/map/state.js';
import { mapBrowseFixture } from './fixtures/map-browse.js';

// DOM ownership is the contract: no message/body writes, duplicate surfaces or stale chat data.
test('projection follows only the final assistant, survives rerenders, and owns no message data', async t => {
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
        readTheme: () => theme, frameSrc: '/projection.html', subscribe(handlers) { notify = handlers; return () => { notify = null; }; },
        bridgeFactory(options) {
            channels.push(options);
            return { post: (type, payload) => { posts.push({ type, payload: structuredClone(payload) }); return true; }, dispose: () => { disposed++; } };
        },
    });
    t.after(() => { display.stop(); for (const [key, descriptor] of globals) {
        if (descriptor) { Object.defineProperty(globalThis, key, descriptor); } else { delete globalThis[key]; }
    } });
    const flush = async () => { await Promise.resolve(); const work = [...frames.values()]; frames.clear(); work.forEach(fn => fn()); };
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
