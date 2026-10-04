import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createRecallRecovery } from '../generate/recall-recovery.js';
import { createRecallRecoveryHost } from '../generate/recovery-host.js';
import { createRecallPrefetchCoordinator } from '../generate/recall-prefetch.js';
import { runRequiredRecall } from '../generate/required-recall.js';
import { protectGenerationDraft } from '../generate/recovery-ui.js';
import { createEnaPlannerSendInterceptor } from '../../ena-planner/ena-planner-interceptor.js';
import { waitForAbortableDelay } from '../../../shared/common/abort-utils.js';
import { getGenerationRetryOwner, runOwnedGeneration } from '../../../shared/common/generation-retry-owner.js';

const flush = async () => { for (let i = 0; i < 60; i++) await Promise.resolve(); };
const embeddingError = () => Object.assign(new Error('fixture', {
    cause: Object.assign(new Error(), { embeddingFailure: { kind: 'timeout', timeoutMs: 3000 } }),
}), { code: 'RECALL_EMBEDDING_FAILED' });

// Native boundaries are represented by their observed 1.14/1.18 contracts:
// input consumption -> interceptor -> unblock -> group finally. Everything
// controlling recovery, recall cancellation, draft protection and planning is
// production code. No network, model requests or real chats.
function fixture(t, { group = false, type = 'normal', cleanupMs = 40, preambleMs = 0, groupMembers = 1 } = {}) {
    t.mock.timers.enable({ apis: ['setTimeout', 'Date'], now: 0 });
    const state = { busy: true, ui: false, plans: 0, rounds: 0, main: 0, commits: 0, notices: 0,
        stops: 0, history: [], errors: [], requests: [], prepares: 0, released: 0 };
    const textarea = { value: '', disabled: false, selectionStart: 0, selectionEnd: 0,
        selectionDirection: 'none', scrollTop: 0, dispatchEvent() {},
        setSelectionRange(start, end, direction) { Object.assign(this, { selectionStart: start, selectionEnd: end, selectionDirection: direction }); } };
    const document = { getElementById: () => textarea };
    const context = { chatId: 'chat', groupId: group ? 'group' : null, chat: [],
        eventTypes: { GENERATION_STOPPED: 'stop', GENERATION_STARTED: 'start' } };
    const handlers = new Map();
    const listeners = new Map();
    context.eventSource = {
        makeFirst: (name, fn) => listeners.set(name, fn),
        removeListener: (name, fn) => { if (listeners.get(name) === fn) listeners.delete(name); },
    };
    let nativeController = new AbortController();
    context.stopGeneration = () => {
        state.stops++;
        nativeController.abort();
        listeners.get('stop')?.();
    };
    let prepare = async (_type, signal) => {
        await waitForAbortableDelay(7_000, signal);
        throw embeddingError();
    };
    const coordinator = createRecallPrefetchCoordinator({ getContext: () => context, now: () => Date.now(),
        prepare: (...args) => { state.prepares++; return prepare(...args); } });
    let request = { type, params: {} };
    let recovery;
    const host = createRecallRecoveryHost({
        getContext: () => context, isGenerating: () => state.busy,
        generateGroup: async (automatic, replayType, params) => {
            assert.equal(automatic, true);
            for (let i = 0; i < groupMembers && !params.signal.aborted; i++) await generate(replayType, params);
        },
        setAbortController: controller => { nativeController = controller; },
        protectDraft: () => protectGenerationDraft(document, () => context),
        registerInterceptor: (id, fn, order) => handlers.set(id, { fn, order }),
        unregisterInterceptor: id => handlers.delete(id),
    });
    recovery = createRecallRecovery({
        getContext: () => context, host, now: () => Date.now(),
        acquireUi: () => { state.ui = true; return () => { state.ui = false; state.released++; }; },
        createNotice: () => ({ show: () => state.notices++, clear() {} }),
        onError: error => state.errors.push(error),
    });
    host.install(() => cancel('generation-stopped'));
    handlers.set('memory', { order: 200, async fn(_chat, _size, abort, roundType, runContext) {
        const { slot: run } = coordinator.join({ chatId: context.chatId, type: roundType, focusRef: context.chat.at(-1), runContext });
        const outcome = await runRequiredRecall({ coordinator, run, abort,
            commit: value => { state.commits++; return value; },
            onRetry: () => recovery.retry({ request, startedAt: run.computeStartedAt }),
            onFailure: () => recovery.cancel('recall-failed'),
        });
        if (outcome.ok) recovery.succeeded();
    } });

    async function generate(roundType, params = {}) {
        state.rounds++;
        state.history.push(['start', Date.now(), roundType]);
        state.requests.push(params);
        listeners.get('start')?.(roundType, params, false);
        if (host.ownsReplay(params)) coordinator.cancel('superseded', { abortDispatch: true });
        request = { type: roundType, params: { ...params, signal: undefined }, owner: getGenerationRetryOwner(params.signal) };
        if (preambleMs) await waitForAbortableDelay(preambleMs);
        state.busy = true;
        if (!['swipe', 'regenerate'].includes(roundType)) {
            const input = textarea.value;
            textarea.value = '';
            if (!params.automatic_trigger && input) context.chat.push({ is_user: true, mes: input });
        } else if (roundType === 'regenerate' && !context.chat.at(-1)?.is_user) {
            context.chat.pop();
        }
        let aborted = false;
        const dispatch = new AbortController();
        const abort = () => { aborted = true; dispatch.abort(); };
        const runContext = { signal: dispatch.signal, abort };
        for (const { fn } of [...handlers.values()].sort((a, b) => a.order - b.order)) {
            await fn([], 0, abort, roundType, runContext);
            if (aborted) break;
        }
        if (!aborted) state.main++;
        state.history.push(['unblock', Date.now()]);
        await waitForAbortableDelay(cleanupMs);
        state.busy = false;
        state.history.push(['idle', Date.now()]);
    }
    context.generate = generate;

    function cancel(reason) {
        recovery.cancel(reason);
        coordinator.cancel(reason, { abortDispatch: true, retainForJoin: true, chatId: context.chatId });
    }
    const advance = async ms => { t.mock.timers.tick(ms); await flush(); };
    t.after(() => { cancel('test-ended'); host.dispose(); });
    return { state, context, textarea, recovery, host, coordinator, handlers, advance, cancel,
        setPrepare: fn => { prepare = fn; }, generate,
        start: () => generate(type),
        startOwned(logical = new AbortController()) {
            return runOwnedGeneration(logical.signal, async bind => {
                nativeController = new AbortController();
                bind(nativeController.signal);
                return generate(type, { signal: nativeController.signal, depth: 1 });
            }, () => logical.abort());
        },
    };
}

test('recovery delegates each fresh request signal to the initiating owner', async t => {
    const f = fixture(t, { type: 'continue' });
    f.context.chat.push({ is_user: false, mes: 'retained result' });
    const pending = f.startOwned();
    await flush();
    await f.advance(7000); await f.advance(0);
    assert.equal(f.state.main, 0);
    assert.equal(f.state.requests[0].signal.aborted, true);
    f.setPrepare(async () => ({ text: 'memory' }));
    await f.advance(40); await f.advance(20); await f.advance(40);
    await pending;
    assert.equal(f.state.rounds, 2);
    assert.equal(f.state.main, 1);
    assert.notEqual(f.state.requests[0].signal, f.state.requests[1].signal);
    assert.equal(f.state.requests[1].depth, 1);
    assert.equal(f.state.requests[1].automatic_trigger, undefined);
    assert.deepEqual(f.context.chat.map(message => message.mes), ['retained result']);
});

test('cancelling the initiating continuation in the recovery gap releases UI and later generations', async t => {
    const f = fixture(t, { type: 'continue' });
    f.context.chat.push({ is_user: false, mes: 'retained result' });
    const logical = new AbortController();
    const pending = f.startOwned(logical);
    await flush();
    await f.advance(7000); await f.advance(0); await f.advance(40);
    assert.equal(f.state.busy, false);
    assert.equal(f.state.ui, true);
    assert.equal(f.state.rounds, 1);

    // The card cancels its own logical continuation, not the recovery controller.
    logical.abort();
    await pending;
    await f.advance(20);
    assert.equal(f.recovery.getCurrent(), null);
    assert.equal(f.state.ui, false);
    assert.equal(f.state.released, 1);
    assert.equal(f.state.rounds, 1);

    // Another normal send can recover too: no stale replay can trap waitForIdle.
    const next = f.generate('normal');
    await flush(); await f.advance(7000); await f.advance(0);
    assert.equal(f.state.ui, true);
    f.setPrepare(async () => ({ text: 'memory' }));
    await f.advance(40); await f.advance(20); await f.advance(40);
    await next;
    assert.equal(f.state.main, 1);
    assert.equal(f.state.ui, false);
    assert.equal(f.recovery.getCurrent(), null);
    assert.deepEqual(f.state.errors, []);
});

for (const group of [false, true]) {
    test(`${group ? 'group' : 'single'}: a failed host round ends before independent recovery; no empty-memory main request`, async t => {
        const f = fixture(t, { group });
        f.textarea.value = 'message with completed plan';
        void f.start(); await flush();
        await f.advance(7000);
        assert.equal(f.state.main, 0);
        assert.equal(f.state.stops, 1);
        assert.equal(f.state.ui, true);
        assert.equal(f.context.chat.length, 1);
        f.textarea.value = 'next draft';
        await f.advance(0); await f.advance(20);
        assert.equal(f.state.rounds, 1, 'must not replay during old cleanup');
        f.setPrepare(async () => ({ text: 'memory' }));
        await f.advance(20); await f.advance(20);
        assert.equal(f.state.rounds, 2);
        assert.equal(f.state.main, 1);
        assert.equal(f.state.commits, 1);
        assert.equal(f.state.ui, false);
        assert.equal(f.context.chat.length, 1);
        assert.equal(f.textarea.value, 'next draft');
        assert.equal(f.state.requests[1].automatic_trigger, true);
        assert.ok(f.state.history.findIndex(x => x[0] === 'idle') < f.state.history.findLastIndex(x => x[0] === 'start'));
        assert.deepEqual(f.state.errors, []);
    });
}

test('30 seconds is cumulative across actual host restarts, warns once, and does not stop recovery', async t => {
    const f = fixture(t);
    f.context.chat.push({ is_user: true, mes: 'source' });
    void f.start(); await flush();
    for (let i = 0; i < 4; i++) {
        await f.advance(7000); await f.advance(0); await f.advance(40); await f.advance(20);
    }
    assert.equal(f.state.rounds, 5);
    assert.equal(f.state.notices, 0);
    await f.advance(29999 - Date.now());
    assert.equal(f.state.notices, 0);
    await f.advance(1);
    assert.equal(f.state.notices, 1);
    assert.equal(f.state.ui, true);
    await f.advance(7000); await f.advance(0); await f.advance(40); await f.advance(20);
    assert.equal(f.state.rounds, 6);
    assert.equal(f.state.notices, 1);
    f.cancel('generation-stopped');
    await f.advance(100000);
    await f.advance(40);
    assert.equal(f.state.rounds, 6);
    assert.equal(f.state.ui, false);
    assert.equal(f.state.main, 0);
});

for (const reason of ['generation-stopped', 'chat-changed', 'message-edited', 'disabled', 'unregistered']) {
    for (const phase of ['idle-gap', 'preamble', 'query']) {
        test(`${reason} during ${phase} cancels the whole loop with no resurrection`, async t => {
            const f = fixture(t, { preambleMs: 100 });
            f.context.chat.push({ is_user: true, mes: 'source' });
            void f.start(); await f.advance(100);
            await f.advance(7000); await f.advance(0);
            if (phase !== 'idle-gap') { await f.advance(40); await f.advance(20); }
            if (phase === 'query') await f.advance(100);
            const before = f.state.rounds;
            f.textarea.value = phase === 'preamble' ? '' : 'kept';
            f.cancel(reason);
            if (reason === 'unregistered') f.handlers.delete('memory');
            await f.advance(100000); await f.advance(100000);
            assert.equal(f.state.rounds, before);
            assert.equal(f.state.main, 0);
            assert.equal(f.state.ui, false);
            assert.equal(f.textarea.disabled, false);
            assert.equal(f.recovery.getCurrent(), null);
            assert.deepEqual(f.state.errors, []);
        });
    }
}

test('regenerate does not delete a second old answer; swipe/continue preserve their host operation', async t => {
    const f = fixture(t, { type: 'regenerate' });
    f.context.chat.push({ is_user: false, mes: 'earlier answer' }, { is_user: false, mes: 'answer being rerolled' });
    void f.start(); await flush();
    await f.advance(7000); await f.advance(0);
    f.setPrepare(async () => ({ text: 'memory' }));
    await f.advance(40); await f.advance(20);
    assert.deepEqual(f.context.chat.map(x => x.mes), ['earlier answer']);
    assert.equal(f.state.history.filter(x => x[0] === 'start')[1][2], 'normal');
});

for (const type of ['swipe', 'continue', 'impersonate']) {
    test(`${type} recovery preserves generation type`, async t => {
        const f = fixture(t, { type });
        f.context.chat.push({ is_user: true, mes: 'source' }, { is_user: false, mes: 'answer' });
        void f.start(); await flush();
        await f.advance(7000); await f.advance(0);
        f.setPrepare(async () => ({ text: 'memory' }));
        await f.advance(40); await f.advance(20);
        assert.equal(f.context.chat.length, 2);
        assert.equal(f.state.history.filter(x => x[0] === 'start')[1][2], type);
    });
}

test('automatic replay never enters the send interceptor or duplicates the completed plan', async t => {
    const f = fixture(t);
    const listeners = new Map();
    const button = { isConnected: true, classList: { contains: () => false, add() {}, remove() {} },
        getAttribute() {}, setAttribute() {}, removeAttribute() {}, contains: target => target === button,
        click() {
            let blocked = false;
            listeners.get('click')?.({ target: button, preventDefault() { blocked = true; }, stopImmediatePropagation() {} });
            if (!blocked) void f.start();
        },
    };
    const planner = createEnaPlannerSendInterceptor({
        eventTarget: { addEventListener: (event, fn) => listeners.set(event, fn), removeEventListener: event => listeners.delete(event) },
        getChatIdentity: () => f.context.chatId, getSettings: () => ({ enabled: true }),
        getTextarea: () => f.textarea, getSendButton: () => button, shouldSendOnEnter: () => true,
        readStorySummary: () => '', plan: async () => { f.state.plans++; return { filtered: '<plot>completed</plot>' }; },
    });
    planner.install(); t.after(() => planner.cleanup());
    f.textarea.value = 'user input';
    button.click(); await flush();
    assert.equal(f.state.plans, 1);
    const sent = structuredClone(f.context.chat);
    await f.advance(7000); await f.advance(0);
    f.setPrepare(async () => ({ text: 'memory' }));
    await f.advance(40); await f.advance(20);
    assert.equal(f.state.rounds, 2);
    assert.equal(f.state.main, 1);
    assert.equal(f.state.plans, 1);
    assert.deepEqual(f.context.chat, sent);
});

test('non-Embedding errors stop once instead of replaying or releasing an empty main request', async t => {
    const f = fixture(t);
    f.context.chat.push({ is_user: true, mes: 'source' });
    f.setPrepare(async () => { throw new Error('storage failure'); });
    void f.start(); await flush(); await f.advance(100000);
    assert.equal(f.state.main, 0);
    assert.equal(f.state.rounds, 1);
    assert.equal(f.state.ui, false);
});

for (const failure of [{ kind: 'http', status: 401 }, { kind: 'http', status: 429 }, { kind: 'invalid_response' }, { kind: 'configuration' }, {}]) {
    test(`terminal Embedding failure never enters a host recovery: ${JSON.stringify(failure)}`, async t => {
        const f = fixture(t);
        f.context.chat.push({ is_user: true, mes: 'source' });
        f.setPrepare(async () => {
            throw Object.assign(new globalThis.AggregateError([], '', {
                cause: new Error('', { cause: Object.assign(new Error(), { embeddingFailure: failure }) }),
            }), { code: 'RECALL_EMBEDDING_FAILED' });
        });
        void f.start(); await flush(); await f.advance(100000);
        assert.equal(f.state.rounds, 1);
        assert.equal(f.state.main, 0);
        assert.equal(f.state.stops, 0);
        assert.equal(f.recovery.getCurrent(), null);
    });
}

test('a recovered group protects the next draft again before every subsequent member', async t => {
    const f = fixture(t, { group: true, groupMembers: 3 });
    f.context.chat.push({ is_user: true, mes: 'source' });
    void f.start(); await flush();
    await f.advance(7000); await f.advance(0);
    f.textarea.value = '/a command for a later message';
    f.setPrepare(async () => ({ text: 'memory' }));
    await f.advance(40); await f.advance(20);
    await f.advance(40); await f.advance(40); await f.advance(40);
    assert.equal(f.state.rounds, 4);
    assert.equal(f.state.main, 3);
    assert.equal(f.textarea.value, '/a command for a later message');
    assert.equal(f.textarea.disabled, false);
    assert.equal(f.context.chat.length, 1);
});

test('stop during host input preparation keeps the send gate until that cancelled preamble actually exits', async t => {
    const f = fixture(t, { preambleMs: 100 });
    f.context.chat.push({ is_user: true, mes: 'source' });
    void f.start(); await f.advance(100);
    await f.advance(7000); await f.advance(0); await f.advance(40); await f.advance(20);
    assert.equal(f.textarea.disabled, true);
    f.cancel('generation-stopped');
    assert.equal(f.recovery.getCurrent(), null);
    assert.equal(f.state.ui, true, 'do not expose Send while the old host can still consume input');
    await f.advance(100); await f.advance(40);
    assert.equal(f.state.ui, false);
    assert.equal(f.textarea.disabled, false);
    assert.equal(f.state.main, 0);
});
