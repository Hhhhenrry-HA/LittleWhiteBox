import assert from 'node:assert/strict';
import { after, beforeEach, test } from 'node:test';
import {
    clearEmbeddingFailureNotice, notifyEmbeddingRecallFailure, notifyEmbeddingWarmupFailure,
    notifySummaryStartupFailure, notifyUnconfirmedMemory, runClearWithFeedback,
} from '../user-feedback.js';
import { recallFailureNotice } from '../generate/recall-failure.js';
import { clearWarningCooldowns } from '../vector/runtime/maintenance-coordinator.js';

// Only the host toast/console boundary is replaced. Exercise the real policy,
// including promotion, per-chat recall notices and loaded-memory ownership.
const originalToastr = globalThis.toastr;
const originalError = console.error;
let shown, visible, errors;
const probe = () => notifyEmbeddingWarmupFailure(120000);
const recall = (chatId = 'chat') => notifyEmbeddingRecallFailure(chatId,
    recallFailureNotice(null, { code: 'RECALL_EMBEDDING_FAILED' }).notice, 10000);

beforeEach(() => {
    clearEmbeddingFailureNotice();
    clearWarningCooldowns();
    shown = []; visible = new Set(); errors = [];
    const show = level => (_message, _title, options) => {
        const toast = { level, options, finish() { visible.delete(toast); } };
        shown.push(toast); visible.add(toast);
        return toast;
    };
    globalThis.toastr = {
        warning: show('warning'), error: show('error'), info: show('info'),
        clear(toast, options) {
            // Never clear unrelated host notifications, even if ours expired.
            assert.ok(toast);
            assert.equal(options.force, true);
        },
    };
    console.error = (...args) => errors.push(args);
});

after(() => {
    clearEmbeddingFailureNotice();
    if (originalToastr === undefined) delete globalThis.toastr;
    else globalThis.toastr = originalToastr;
    console.error = originalError;
});

test('only an unconfirmed save warns, once per loaded memory even after repeated reports', () => {
    const owner = {};
    for (const state of ['ready', 'saving', 'source_invalid']) {
        assert.equal(notifyUnconfirmedMemory(state, owner), false);
    }
    assert.equal(shown.length, 0);
    assert.equal(notifyUnconfirmedMemory('unconfirmed', owner), true);
    assert.equal(notifyUnconfirmedMemory('unconfirmed', owner), true);
    clearWarningCooldowns(); // Reopening/toggling is not a new save or memory load.
    notifyUnconfirmedMemory('unconfirmed', owner);
    assert.equal(shown.length, 1);
    assert.equal(shown[0].level, 'error');
    notifyUnconfirmedMemory('unconfirmed', {});
    assert.equal(shown.length, 2);
});

test('a real recall failure replaces the probe warning and renews its display duration', () => {
    probe(); probe();
    assert.equal(shown.length, 1);
    const first = shown[0];
    recall();
    assert.equal(shown.length, 2);
    assert.deepEqual([...visible], [shown[1]]);
    assert.equal(shown[1].options.timeOut, first.options.timeOut);
    probe(); recall();
    assert.equal(shown.length, 2);
    recall('another-chat'); // A new chat's actual failure must not be hidden.
    assert.equal(shown.length, 3);
    assert.equal(visible.size, 1);
});

test('a late probe cannot downgrade a real recall failure', () => {
    recall(); probe();
    assert.equal(shown.length, 1);
    assert.equal(visible.size, 1);
});

test('a recall failure renews probe suppression across the previous cooldown boundary', t => {
    let now = 1000000;
    t.mock.method(Date, 'now', () => now);
    probe();
    now += 119000;
    recall();
    const recallToast = shown[1];
    now += 2000;
    probe();
    assert.equal(shown.length, 2);
    assert.deepEqual([...visible], [recallToast]);
    now += 118000;
    probe();
    assert.equal(shown.length, 3);
});

test('replacing an expired probe and cleaning up never remove unrelated notices', () => {
    const unrelated = toastr.info('unrelated');
    probe();
    visible.delete(shown[1]); // The native timeout already removed it.
    recall();
    assert.equal(visible.size, 2);
    clearEmbeddingFailureNotice();
    assert.deepEqual([...visible], [unrelated]);
});

for (const kind of ['vectors', 'anchors']) {
    test(`${kind}: failed clearing has one failure receipt, preserves the cause and never retries`, async () => {
        const failure = new Error('storage failure');
        let calls = 0;
        await runClearWithFeedback({ kind, isCurrent: () => true, reportUnconfirmed: () => false,
            clear: async () => { calls++; throw failure; },
            refresh: () => assert.fail('no successful clear to refresh'),
        });
        assert.equal(calls, 1);
        assert.deepEqual(shown.map(toast => toast.level), ['error']);
        assert.equal(errors[0][1], failure);
    });

    test(`${kind}: failed statistics refresh does not report a failed data clear`, async () => {
        let cleared = false;
        await runClearWithFeedback({ kind, isCurrent: () => true, reportUnconfirmed: () => false,
            clear: async () => { cleared = true; return true; },
            refresh: async () => { throw new Error('statistics failure'); },
        });
        assert.equal(cleared, true);
        assert.deepEqual(shown.map(toast => toast.level), ['warning']);
    });
}

test('successful clearing refreshes and confirms once; skipped queued work stays silent', async () => {
    let refreshed = 0;
    const options = { kind: 'vectors', isCurrent: () => true, reportUnconfirmed: () => false,
        refresh: async () => { refreshed++; } };
    for (const result of [false, undefined]) {
        await runClearWithFeedback({ ...options, clear: async () => result });
    }
    assert.equal(shown.length, 0);
    await runClearWithFeedback({ ...options, clear: async () => true });
    assert.equal(refreshed, 1);
    assert.deepEqual(shown.map(toast => toast.level), ['info']);
});

test('old-chat operations do not publish success or failure into another chat', async () => {
    for (const failed of [false, true]) {
        await runClearWithFeedback({ kind: 'anchors', isCurrent: () => false, reportUnconfirmed: () => false,
            clear: async () => { if (failed) throw new Error('late failure'); return true; },
            refresh: () => assert.fail('old chat must not refresh current chat'),
        });
    }
    assert.equal(shown.length, 0);
    assert.equal(errors.length, 1);
});

test('a clear blocked by save uncertainty uses the safety notice, not an extra generic error', async () => {
    const owner = {};
    notifyUnconfirmedMemory('unconfirmed', owner);
    await runClearWithFeedback({ kind: 'anchors', isCurrent: () => true,
        reportUnconfirmed: () => notifyUnconfirmedMemory('unconfirmed', owner),
        clear: async () => { throw new Error('blocked'); }, refresh() {},
    });
    assert.equal(shown.length, 1);
});

test('a startup failure is visible and keeps its original diagnostic cause', () => {
    const failure = new Error('initialization failure');
    notifySummaryStartupFailure(failure);
    assert.deepEqual(shown.map(toast => toast.level), ['error']);
    assert.equal(errors[0][1], failure);
});

test('suppressing a duplicate or obsolete startup notice still preserves its cause', () => {
    const failure = new Error('initialization failure');
    notifySummaryStartupFailure(failure, false);
    assert.equal(shown.length, 0);
    assert.equal(errors[0][1], failure);
});
