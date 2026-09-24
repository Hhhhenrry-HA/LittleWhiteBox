import assert from 'node:assert/strict';
import test from 'node:test';
import { createReplyProgressRuntime } from '../runtime.js';
import { createPlaceholderPresenter } from '../placeholder.js';
import { formatReplyProgress, interceptorLabel, recallLabel, REPLY_PROGRESS_COPY } from '../copy.js';
import { registerGenerateInterceptor, unregisterGenerateInterceptor } from '../../../shared/common/generate-interceptor.js';

const TYPES = Object.fromEntries([
    'GENERATION_STARTED', 'GENERATION_AFTER_COMMANDS', 'MESSAGE_SENT', 'USER_MESSAGE_RENDERED',
    'WORLDINFO_ENTRIES_LOADED', 'WORLDINFO_SCAN_DONE', 'WORLD_INFO_ACTIVATED',
    'GENERATE_BEFORE_COMBINE_PROMPTS', 'GENERATE_AFTER_COMBINE_PROMPTS', 'GENERATE_AFTER_DATA',
    'STREAM_TOKEN_RECEIVED', 'MESSAGE_RECEIVED', 'GENERATION_STOPPED',
    'GENERATION_ENDED', 'CHAT_CHANGED', 'GROUP_WRAPPER_FINISHED',
].map(name => [name, name]));

function deferred() {
    let resolve;
    const promise = new Promise(done => { resolve = done; });
    return { promise, resolve };
}

function harness(t, beforeEnable = () => {}) {
    const listeners = new Map();
    // ST's emitter snapshots listeners and awaits each one in order. A
    // synchronous emitter cannot expose delays in earlier extension listeners.
    const events = {
        on(event, fn) {
            const list = listeners.get(event) || [];
            list.push(fn);
            listeners.set(event, list);
        },
        makeFirst(event, fn) {
            this.removeListener(event, fn);
            listeners.set(event, [fn, ...(listeners.get(event) || [])]);
        },
        removeListener(event, fn) {
            const list = listeners.get(event);
            const index = list?.indexOf(fn) ?? -1;
            if (index !== -1) list.splice(index, 1);
        },
        async emit(event, ...args) {
            for (const fn of [...(listeners.get(event) || [])]) await fn(...args);
        },
    };
    beforeEnable(events);
    const attributes = new Map([['placeholder', 'original']]);
    const textarea = {
        value: 'user draft',
        getAttribute: name => attributes.get(name) ?? null,
        setAttribute: (name, value) => attributes.set(name, value),
        removeAttribute: name => attributes.delete(name),
    };
    let changePlaceholder = null;
    let tick = null;
    let clock = 0;
    let busy = false;
    let preparationAccepted = true;
    let preparations = 0;
    let connected = true;
    let chat = [];
    let stream = null;
    let progress = null;
    const runtime = createReplyProgressRuntime({
        events, eventTypes: TYPES, getTextarea: () => textarea,
        getChat: () => chat, getStream: () => stream, isGenerating: () => busy,
        markHostPreparing: () => {
            if (!preparationAccepted) return false;
            busy = true;
            preparations++;
            return true;
        },
        isConnected: () => connected, now: () => clock,
        schedule: fn => { tick = fn; return 1; },
        unschedule: () => { tick = null; },
        createPresenter: element => {
            const presenter = createPlaceholderPresenter(element, {
                watch: (_textarea, onChange) => {
                    changePlaceholder = onChange;
                    return () => { changePlaceholder = null; };
                },
            });
            return {
                show(value) { progress = value; presenter.show(value); },
                restore() { progress = null; presenter.restore(); },
            };
        },
    });
    runtime.setEnabled(true);
    t.after(() => runtime.destroy());
    return {
        events, textarea, runtime,
        chat: () => chat,
        switchChat: value => { chat = value; },
        stream: value => { stream = value; },
        progress: () => progress,
        current: () => textarea.getAttribute('placeholder'),
        advance: ms => { clock += ms; tick?.(); },
        busy: value => { busy = value; },
        isBusy: () => busy,
        preparations: () => preparations,
        acceptPreparation: value => { preparationAccepted = value; },
        connected: value => { connected = value; },
        changePlaceholder(value) {
            textarea.setAttribute('placeholder', value);
            changePlaceholder?.();
        },
    };
}

function register(t, id, handler = async () => {}) {
    registerGenerateInterceptor(id, handler);
    t.after(() => unregisterGenerateInterceptor(id));
}

async function begin(h, type = 'normal') {
    await h.events.emit(TYPES.GENERATION_STARTED, type, {}, false);
    await h.events.emit(TYPES.GENERATION_AFTER_COMMANDS, type, {}, false);
}

function dispatch(type = 'normal') {
    return globalThis.xiaobaixGenerateInterceptor([], 0, () => {}, type);
}

async function unattributedEvents(h, dryRun = false, entries = []) {
    await h.events.emit(TYPES.WORLDINFO_ENTRIES_LOADED, { globalLore: entries });
    if (entries.length) {
        await h.events.emit(TYPES.WORLDINFO_SCAN_DONE, { state: { next: 0 } });
        await h.events.emit(TYPES.WORLD_INFO_ACTIVATED, entries);
    }
    await h.events.emit(TYPES.GENERATE_BEFORE_COMBINE_PROMPTS, {});
    await h.events.emit(TYPES.GENERATE_AFTER_COMBINE_PROMPTS, { dryRun });
    await h.events.emit(TYPES.GENERATE_AFTER_DATA, {}, dryRun);
}

test('elapsed time is visible only before actual streaming text, without touching a draft', async t => {
    const h = harness(t);
    register(t, 'draw');
    await begin(h);
    h.busy(true);
    await dispatch();
    h.advance(1000);
    assert.deepEqual(h.progress(), { phase: 'waiting', detail: null, elapsedMs: 1000 });
    const stream = { type: 'normal', messageId: 0, result: '' };
    h.chat().push({ is_user: false, mes: '...' });
    h.stream(stream);
    await h.events.emit(TYPES.STREAM_TOKEN_RECEIVED, '');
    assert.ok(h.progress());
    stream.result = 'first response';
    await h.events.emit(TYPES.STREAM_TOKEN_RECEIVED, stream.result);
    assert.equal(h.progress(), null);
    assert.equal(h.current(), 'original');
    assert.equal(h.textarea.value, 'user draft');
    h.advance(1000);
    assert.equal(h.current(), 'original');
});

test('quiet, raw and preview prompt events cannot advance the foreground run or hide its own handlers', async t => {
    const h = harness(t);
    const observed = [];
    register(t, 'story-summary', async (_chat, _size, _abort, _type, context) => {
        context.reportProgress({ stage: 'event-rerank' });
        const before = h.progress();
        await unattributedEvents(h);
        observed.push([before, h.progress()]);
        context.reportProgress(null);
    });
    await h.events.emit(TYPES.GENERATION_STARTED, 'normal', {}, true);
    await h.events.emit(TYPES.GENERATION_STARTED, 'quiet', {}, false);
    assert.equal(h.progress(), null);
    await begin(h);
    const before = h.progress();
    await h.events.emit(TYPES.GENERATION_STARTED, 'quiet', {}, false);
    await h.events.emit(TYPES.GENERATION_AFTER_COMMANDS, 'quiet', {}, false);
    await h.events.emit(TYPES.GENERATION_STARTED, 'normal', {}, true);
    await h.events.emit(TYPES.GENERATION_AFTER_COMMANDS, 'normal', {}, true);
    await unattributedEvents(h, false, [{}]);
    await unattributedEvents(h, true, [{}]);
    // generateRaw emits prompt events without any GENERATION_STARTED event.
    await h.events.emit(TYPES.GENERATE_AFTER_COMBINE_PROMPTS, { dryRun: false });
    assert.deepEqual(h.progress(), before);
    await dispatch();
    assert.equal(observed[0][0].phase, 'recall');
    assert.deepEqual(observed[0][1], observed[0][0]);
    const waiting = h.progress();
    await unattributedEvents(h);
    await dispatch('quiet');
    await h.events.emit(TYPES.MESSAGE_RECEIVED, 0, 'quiet');
    assert.deepEqual(h.progress(), waiting);
});

test('empty and populated world books share the host interval, including later tokenization and request wait', async t => {
    const h = harness(t);
    register(t, 'draw');
    for (const entries of [[], [{}]]) {
        await begin(h);
        await dispatch();
        await unattributedEvents(h, false, entries);
        h.advance(8000);
        assert.deepEqual(h.progress(), { phase: 'waiting', detail: null, elapsedMs: 8000 });
        await h.events.emit(TYPES.GENERATION_STOPPED);
    }
});

test('message stage starts before slow existing listeners without reordering them', async t => {
    const entered = deferred();
    const release = deferred();
    const calls = [];
    const h = harness(t, events => {
        events.on(TYPES.MESSAGE_SENT, async () => {
            calls.push('first');
            entered.resolve();
            await release.promise;
        });
        events.on(TYPES.MESSAGE_SENT, () => calls.push('second'));
    });
    h.chat().push({ is_user: true, mes: 'hello' });
    await begin(h);
    const sending = h.events.emit(TYPES.MESSAGE_SENT, 0);
    try {
        await entered.promise;
        h.advance(6000);
        assert.deepEqual(h.progress(), { phase: 'message', detail: null, elapsedMs: 6000 });
        assert.deepEqual(calls, ['first']);
    } finally { release.resolve(); }
    await sending;
    assert.deepEqual(calls, ['first', 'second']);
    assert.equal(h.progress().elapsedMs, 6000);
    await h.events.emit(TYPES.USER_MESSAGE_RENDERED, 0);
    assert.deepEqual(h.progress(), { phase: 'context', detail: null, elapsedMs: 0 });
});

test('only an explicitly joined recall claims memory stages; stage changes reset its timer', async t => {
    const h = harness(t);
    const diagnostics = { stage: 'event-rerank' };
    const observed = [];
    register(t, 'story-summary', async (_chat, _size, _abort, _type, context) => {
        context.reportProgress(diagnostics);
        h.advance(3000);
        observed.push(h.progress());
        diagnostics.stage = 'prompt-assembly';
        h.advance(200);
        observed.push(h.progress());
        context.reportProgress(null);
        observed.push(h.progress());
    });
    await begin(h);
    await dispatch();
    assert.deepEqual(observed, [
        { phase: 'recall', detail: 'event-rerank', elapsedMs: 3000 },
        { phase: 'recall', detail: 'prompt-assembly', elapsedMs: 0 },
        { phase: 'context', detail: null, elapsedMs: 0 },
    ]);
    assert.equal(h.progress().phase, 'waiting');
});

test('/regenerate owns slow recall and host assembly, and ends on a non-stream reply', async t => {
    const h = harness(t);
    const release = deferred();
    const diagnostics = { stage: 'event-rerank' };
    register(t, 'story-summary', async (_chat, _size, _abort, _type, context) => {
        context.reportProgress(diagnostics);
        await release.promise;
        context.reportProgress(null);
    });

    // The outer slash-command invocation is consumed; its scheduled Generate
    // invocation emits both lifecycle events without setting busy first.
    h.textarea.value = '/regenerate';
    await h.events.emit(TYPES.GENERATION_STARTED, 'normal', {}, false);
    assert.equal(h.progress(), null);
    h.textarea.value = '';
    await begin(h, 'regenerate');
    const request = dispatch('regenerate');
    try {
        assert.equal(h.progress().phase, 'recall');
        h.advance(35000);
        assert.deepEqual(h.progress(), { phase: 'recall', detail: 'event-rerank', elapsedMs: 35000 });
        diagnostics.stage = 'prompt-assembly';
        h.advance(200);
        assert.deepEqual(h.progress(), { phase: 'recall', detail: 'prompt-assembly', elapsedMs: 0 });
    } finally {
        release.resolve();
        await request;
    }

    // Host assembly after interceptors can also take time before the request.
    h.advance(35000);
    assert.deepEqual(h.progress(), { phase: 'waiting', detail: null, elapsedMs: 35000 });
    h.busy(true);
    h.chat().push({ is_user: false, mes: 'regenerated reply' });
    await h.events.emit(TYPES.MESSAGE_RECEIVED, 0, 'normal');
    assert.equal(h.progress(), null);
    assert.equal(h.current(), 'original');
});

test('regeneration without enabled memory reaches request wait without memory stages', async t => {
    const h = harness(t);
    let duringSummary;
    register(t, 'story-summary', async () => {
        h.advance(1000);
        duringSummary = h.progress();
    });
    await begin(h, 'regenerate');
    await dispatch('regenerate');
    assert.deepEqual(duringSummary, { phase: 'context', detail: null, elapsedMs: 1000 });
    assert.deepEqual(h.progress(), { phase: 'waiting', detail: null, elapsedMs: 0 });
    h.busy(true);
    h.chat().push({ is_user: false, mes: 'regenerated reply' });
    await h.events.emit(TYPES.MESSAGE_RECEIVED, 0, 'normal');
    assert.equal(h.progress(), null);
});

test('an interceptor abort restores the placeholder without waiting for host completion', async t => {
    const h = harness(t);
    const release = deferred();
    let context;
    register(t, 'story-summary', async (_chat, _size, _abort, _type, runContext) => {
        context = runContext;
        context.reportProgress({ stage: 'event-rerank' });
        await release.promise;
    });
    await begin(h, 'regenerate');
    const request = dispatch('regenerate');
    try {
        assert.equal(h.progress().phase, 'recall');
        await h.events.emit(TYPES.GENERATION_STARTED, 'quiet', {}, false);
        context.abort(true);
        h.advance(200);
        assert.equal(h.progress(), null);
        assert.equal(h.current(), 'original');
    } finally {
        release.resolve();
        await request;
    }
    assert.equal(h.progress(), null);
});

test('dispatch ownership requires a matching foreground post-command lifecycle, not busy', async t => {
    const h = harness(t);
    register(t, 'draw');
    await dispatch('regenerate');
    assert.equal(h.progress(), null);
    await h.events.emit(TYPES.GENERATION_STARTED, 'regenerate', {}, false);
    const beforeCommands = h.progress();
    await dispatch('regenerate');
    assert.deepEqual(h.progress(), beforeCommands);
    await h.events.emit(TYPES.GENERATION_AFTER_COMMANDS, 'regenerate', {}, false);
    await dispatch('quiet');
    await dispatch('normal');
    assert.deepEqual(h.progress(), beforeCommands);
    await dispatch('regenerate');
    assert.equal(h.progress().phase, 'waiting');
});

test('disabled summary never claims memory work; late same-type dispatches cannot steal the host interval', async t => {
    const h = harness(t);
    let calls = 0;
    let disabledPhase;
    register(t, 'story-summary', async (_chat, _size, _abort, _type, context) => {
        if (++calls === 1) disabledPhase = h.progress().phase;
        else context.reportProgress({ stage: 'event-rerank' });
    });
    await begin(h);
    await dispatch();
    assert.equal(disabledPhase, 'context');
    const waiting = h.progress();
    assert.equal(waiting.phase, 'waiting');
    await dispatch();
    assert.deepEqual(h.progress(), waiting);
});

test('late progress and completion from a superseded dispatch cannot change the new run', async t => {
    const h = harness(t);
    const first = deferred();
    const second = deferred();
    let oldContext;
    register(t, 'story-summary', async (_chat, _size, _abort, _type, context) => {
        if (!oldContext) {
            oldContext = context;
            await first.promise;
        } else {
            context.reportProgress({ stage: 'event-rerank' });
            await second.promise;
        }
    });
    await begin(h);
    const oldRequest = dispatch();
    await begin(h);
    const newRequest = dispatch();
    try {
        const current = h.progress();
        assert.equal(current.phase, 'recall');
        oldContext.reportProgress({ stage: 'prompt-assembly' });
        assert.deepEqual(h.progress(), current);
        first.resolve();
        await oldRequest;
        assert.deepEqual(h.progress(), current);
    } finally {
        first.resolve();
        second.resolve();
        await Promise.all([oldRequest, newRequest]);
    }
    assert.equal(h.progress().phase, 'waiting');
});

test('pre-command waits stay visible, but slash commands with no reply leave no hint', async t => {
    const h = harness(t);
    await h.events.emit(TYPES.GENERATION_STARTED, 'normal', {}, false);
    h.advance(35000);
    assert.equal(h.progress().elapsedMs, 35000);
    await h.events.emit(TYPES.GENERATION_AFTER_COMMANDS, 'normal', {}, false);
    h.advance(30001);
    assert.deepEqual(h.progress(), { phase: 'context', detail: null, elapsedMs: 65001 });
    await h.events.emit(TYPES.GENERATION_STOPPED);
    assert.equal(h.progress(), null);
    h.textarea.value = '/help';
    await h.events.emit(TYPES.GENERATION_STARTED, 'normal', {}, false);
    assert.equal(h.progress(), null);
});

test('slow post-command listeners cannot expire regeneration before its dispatch arrives', async t => {
    const entered = deferred();
    const release = deferred();
    const h = harness(t, events => {
        events.on(TYPES.GENERATION_AFTER_COMMANDS, async () => {
            entered.resolve();
            await release.promise;
        });
    });
    register(t, 'draw');
    const starting = begin(h, 'regenerate');
    try {
        await entered.promise;
        h.advance(35000);
        assert.deepEqual(h.progress(), { phase: 'context', detail: null, elapsedMs: 35000 });
    } finally {
        release.resolve();
        await starting;
    }
    await dispatch('regenerate');
    assert.deepEqual(h.progress(), { phase: 'waiting', detail: null, elapsedMs: 0 });
});

test('host completion restores the composer even after background overlap, without re-locking it', async t => {
    const h = harness(t);
    register(t, 'draw');
    for (const terminal of [TYPES.GENERATION_ENDED, TYPES.GROUP_WRAPPER_FINISHED]) {
        await begin(h);
        await dispatch();
        const preparations = h.preparations();
        await h.events.emit(TYPES.GENERATION_STARTED, 'quiet', {}, false);
        await h.events.emit(TYPES.GENERATION_AFTER_COMMANDS, 'quiet', {}, false);
        await dispatch('quiet');
        assert.equal(h.progress().phase, 'waiting');
        h.busy(false);
        await h.events.emit(terminal);
        assert.equal(h.progress(), null);
        assert.equal(h.current(), 'original');
        h.advance(35000);
        await dispatch();
        assert.equal(h.progress(), null);
        assert.equal(h.isBusy(), false);
        assert.equal(h.preparations(), preparations);
    }
});

test('foreground API failure after quiet overlap clears on host release even without another ENDED event', async t => {
    const h = harness(t);
    register(t, 'draw');
    await begin(h);
    await dispatch();
    await h.events.emit(TYPES.GENERATION_STARTED, 'quiet', {}, false);
    await h.events.emit(TYPES.GENERATION_AFTER_COMMANDS, 'quiet', {}, false);
    await dispatch('quiet');
    h.busy(false);
    h.advance(200);
    assert.equal(h.progress(), null);
    assert.equal(h.current(), 'original');
});

test('preflight rejection before dispatch releases the hint without an ENDED event or timeout', async t => {
    const h = harness(t);
    assert.equal(h.isBusy(), false);
    await begin(h, 'regenerate');
    assert.equal(h.isBusy(), true);
    assert.equal(h.preparations(), 1);
    // ST clears its native flag when ping/preflight rejects. No dispatch or
    // visible stop button exists yet, and it need not emit GENERATION_ENDED.
    h.busy(false);
    h.advance(200);
    assert.equal(h.progress(), null);
    assert.equal(h.current(), 'original');
    assert.equal(h.isBusy(), false);
});

test('preparation does not reserve host state for previews, background calls, commands or a disabled feature', async t => {
    const h = harness(t);
    for (const [type, params, dryRun] of [
        ['quiet', {}, false], ['impersonate', {}, false],
        ['normal', {}, true], ['normal', { automatic_trigger: true }, false],
    ]) {
        await h.events.emit(TYPES.GENERATION_STARTED, type, params, dryRun);
        await h.events.emit(TYPES.GENERATION_AFTER_COMMANDS, type, params, dryRun);
    }
    h.textarea.value = '/help';
    await h.events.emit(TYPES.GENERATION_STARTED, 'normal', {}, false);
    assert.equal(h.preparations(), 0);
    assert.equal(h.isBusy(), false);
    h.runtime.setEnabled(false);
    await begin(h, 'regenerate');
    assert.equal(h.preparations(), 0);
    assert.equal(h.isBusy(), false);
    assert.equal(h.progress(), null);
});

test('a deferred outer group call leaves no hint or send reservation; a member call can start normally', async t => {
    const h = harness(t);
    register(t, 'draw');
    h.acceptPreparation(false);
    await begin(h);
    h.advance(35000);
    assert.equal(h.progress(), null);
    assert.equal(h.current(), 'original');
    assert.equal(h.isBusy(), false);
    assert.equal(h.preparations(), 0);
    h.acceptPreparation(true);
    await begin(h);
    await dispatch();
    assert.equal(h.progress().phase, 'waiting');
    assert.equal(h.preparations(), 1);
});

test('hiding or disabling the hint never clears a native generation that still owns the send state', async t => {
    const h = harness(t);
    await begin(h);
    assert.equal(h.isBusy(), true);
    h.runtime.setEnabled(false);
    h.advance(1000);
    assert.equal(h.isBusy(), true);
    assert.equal(h.preparations(), 1);
    assert.equal(h.progress(), null);
    assert.equal(h.textarea.value, 'user draft');
});

test('explicit stop and chat switch clear the hint even after background generation', async t => {
    const h = harness(t);
    for (const event of [TYPES.GENERATION_STOPPED, TYPES.CHAT_CHANGED]) {
        await begin(h);
        await h.events.emit(TYPES.GENERATION_STARTED, 'quiet', {}, false);
        await h.events.emit(event);
        assert.equal(h.progress(), null);
    }
});

test('foreign streams and the previous stream cannot end this reply before its own text', async t => {
    const h = harness(t);
    register(t, 'draw');
    h.chat().push({ is_user: false, mes: 'old reply' });
    const previous = { type: 'normal', messageId: 0, result: 'old reply' };
    h.stream(previous);
    await begin(h);
    await dispatch();
    const waiting = h.progress();
    for (const stream of [previous, { type: 'impersonate', messageId: 0, result: 'other text' }]) {
        h.stream(stream);
        await h.events.emit(TYPES.STREAM_TOKEN_RECEIVED, stream.result);
        assert.deepEqual(h.progress(), waiting);
    }
    h.stream(null);
    await h.events.emit(TYPES.STREAM_TOKEN_RECEIVED, 'unowned token');
    assert.deepEqual(h.progress(), waiting);
});

test('non-stream replies restore only for an actual AI reply, including normalized regeneration and continuation', async t => {
    const h = harness(t);
    register(t, 'draw');
    for (const [type, receivedType] of [['normal', 'normal'], ['regenerate', 'normal'], ['swipe', 'swipe'], ['continue', 'appendFinal']]) {
        h.chat().splice(0, h.chat().length, { is_user: false, mes: 'existing reply' });
        await begin(h, type);
        await dispatch(type);
        const waiting = h.progress();
        if (type === 'continue') {
            await h.events.emit(TYPES.MESSAGE_RECEIVED, 0, receivedType);
            assert.deepEqual(h.progress(), waiting);
        }
        h.chat().push({ is_user: true, mes: 'user text' });
        await h.events.emit(TYPES.MESSAGE_RECEIVED, 1, receivedType);
        assert.deepEqual(h.progress(), waiting);
        h.chat().pop();
        if (type === 'continue') h.chat()[0].mes += ' next sentence';
        // A new swipe can legitimately contain the same text as the old one.
        else if (type !== 'swipe') h.chat().push({ is_user: false, mes: 'answer' });
        await h.events.emit(TYPES.MESSAGE_RECEIVED, h.chat().length - 1, receivedType);
        assert.equal(h.progress(), null);
        assert.equal(h.current(), 'original');
    }
});

test('stop, chat switch, offline, disable and host placeholder edits restore without touching drafts', async t => {
    const h = harness(t);
    for (const terminal of [TYPES.GENERATION_STOPPED, TYPES.GENERATION_ENDED, TYPES.CHAT_CHANGED, TYPES.GROUP_WRAPPER_FINISHED]) {
        await begin(h);
        await h.events.emit(terminal);
        assert.equal(h.current(), 'original');
        assert.equal(h.progress(), null);
    }
    await begin(h);
    h.changePlaceholder('new host text');
    h.advance(1000);
    h.runtime.setEnabled(false);
    assert.equal(h.current(), 'new host text');
    await begin(h);
    assert.equal(h.progress(), null);
    h.runtime.setEnabled(true);
    await begin(h);
    h.changePlaceholder('disconnected host text');
    h.connected(false);
    h.advance(200);
    assert.equal(h.current(), 'disconnected host text');
    assert.equal(h.progress(), null);
    h.connected(true);
    await begin(h);
    h.switchChat([]);
    h.advance(200);
    assert.equal(h.progress(), null);
    assert.equal(h.textarea.value, 'user draft');
});

test('host failure without ENDED is cleared by the busy-state watchdog', async t => {
    const h = harness(t);
    await begin(h);
    h.busy(true);
    h.advance(0);
    h.busy(false);
    h.advance(200);
    assert.equal(h.current(), 'original');
    assert.equal(h.progress(), null);
});

test('stage text respects the explicitly required composer length budget', () => {
    const labels = [
        ...Object.values(REPLY_PROGRESS_COPY),
        ...['draw', 'story-summary', 'xiaobai_os_dice', 'unknown'].map(interceptorLabel),
        ...['event-rerank', 'round1-embed', 'prompt-assembly', 'unknown'].map(recallLabel),
    ];
    for (const label of labels) {
        assert.ok(formatReplyProgress(label, 999999999).length <= 12);
        assert.ok(formatReplyProgress(label, 5000).length <= 10);
    }
});
