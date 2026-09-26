import { memoryFailureCode } from './errors.js';

/** In-memory only. A settings page never owns this queue or revives paid work on reload. */
export function createMemoryScheduler({ enabled, run, changed = () => {} }) {
    let active = null;
    let pending = null;
    let last = null;
    let drainPromise = null;
    const seen = new WeakSet();
    const notify = () => changed();

    async function drain() {
        while (pending) {
            const task = pending;
            pending = null;
            const controller = new AbortController();
            active = { ...task, controller, phase: 'running' };
            notify();
            try {
                const result = await run(task, controller.signal, phase => {
                    if (active) active.phase = phase;
                    notify();
                });
                last = { chatId: task.chatId, status: 'saved', receiptId: result.receipt.id, index: result.index };
            } catch (error) {
                last = { chatId: task.chatId, status: error.uncertain ? 'unconfirmed' : controller.signal.aborted ? 'cancelled' : 'failed',
                    code: memoryFailureCode(error), receiptId: error.receiptId };
                // A new summary can change memory before its confirmed-save notification arrives.
                // Keep only the abandoned scope, never the draft or a request to retry the model.
                if (last.status === 'failed' && last.code === 'conflict') last.scope = task;
            } finally {
                active = null;
                notify();
            }
        }
        drainPromise = null;
    }

    function enqueue(task) {
        if (task.mode === 'auto' && !enabled()) return;
        if (active && active.chatId !== task.chatId) active.controller.abort();
        const inherited = active?.chatId === task.chatId && active.phase === 'running' ? active : null;
        const queued = pending?.chatId === task.chatId ? pending : null;
        const abandoned = last?.chatId === task.chatId && task.cutoff > last.scope?.cutoff ? last.scope : null;
        pending = { ...task,
            start: Math.min(task.start, inherited?.start ?? task.start, queued?.start ?? task.start, abandoned?.start ?? task.start),
            mode: [task.mode, inherited?.mode, queued?.mode, abandoned?.mode].includes('manual') ? 'manual' : 'auto',
        };
        // A newer batch invalidates the old summary baseline. Preserve its scope, not its draft.
        if (inherited && inherited.cutoff !== task.cutoff && inherited.phase !== 'saving') inherited.controller.abort();
        if (!drainPromise) drainPromise = Promise.resolve().then(drain);
        notify();
    }

    return {
        submitted(batch) {
            if (seen.has(batch)) return;
            seen.add(batch);
            enqueue({ ...batch, mode: 'auto' });
        },
        review(task) {
            if (active?.chatId === task.chatId || pending?.chatId === task.chatId) return;
            enqueue({ ...task, start: 0, mode: 'manual' });
        },
        cancel({ automaticOnly = false } = {}) {
            if (pending && (!automaticOnly || pending.mode === 'auto')) pending = null;
            if (active && (!automaticOnly || active.mode === 'auto')) active.controller.abort();
            if (last?.scope && (!automaticOnly || last.scope.mode === 'auto')) delete last.scope;
            notify();
        },
        snapshot(chatId) {
            const outcome = { ...last };
            delete outcome.scope;
            return active?.chatId === chatId ? { status: active.phase, mode: active.mode, cutoff: active.cutoff + 1 }
                : pending?.chatId === chatId ? { status: 'queued' } : last?.chatId === chatId ? outcome : { status: 'idle' };
        },
        settled: () => drainPromise || Promise.resolve(),
    };
}
