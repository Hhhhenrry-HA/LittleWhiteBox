import { createAbortError, waitForAbortableDelay } from '../../../shared/common/abort-utils.js';
import { holdGenerationRecovery } from '../../../shared/common/generation-retry-owner.js';

export const RECALL_RECOVERY_NOTICE_MS = 30_000;
const RECALL_RECOVERY_MIN_INTERVAL_MS = 1000;

// Owns only the unresolved logical recall, across independent host generations.
// No persisted retry state, no recursion, and no host restart before cleanup.
export function createRecallRecovery({ getContext, host, acquireUi, createNotice, onError, now = () => performance.now() }) {
    let current = null;

    function matches(session) {
        const context = getContext();
        return context.chatId === session.chatId && context.chat === session.chat
            && context.chat.length === session.length && context.chat.at(-1) === session.last;
    }

    function release(session, success = false) {
        if (current !== session) return;
        current = null;
        clearTimeout(session.noticeTimer);
        session.notice.clear();
        session.releaseRecovery();
        if (success) session.releaseUi(true);
        else host.afterReplay(() => session.releaseUi(false));
    }

    function cancel(reason = 'cancelled') {
        const session = current;
        if (!session) return;
        session.controller.abort(createAbortError(reason));
        session.request.owner?.cancel();
        host.cancelReplay();
        release(session);
    }

    async function pump(session) {
        try {
            // Let the failed interceptor return so the real host can unblock.
            await waitForAbortableDelay(0, session.controller.signal);
            while (current === session && session.pending) {
                // Pace rapid failures from the actual query start. Host cleanup
                // overlaps this wait; an expired 3s query adds no delay here.
                const delay = session.retryAt - now();
                if (delay > 0) await waitForAbortableDelay(delay, session.controller.signal);
                await host.waitForIdle(session.controller.signal);
                if (current !== session) return;
                if (!matches(session)) { cancel('history-changed'); return; }
                session.pending = false;
                session.cycle++;
                await host.replay(session.request, session.controller.signal);
                // A host refusal/another interceptor's abort must not become
                // an unbounded retry: only our Embedding failure sets pending.
                if (current === session && !session.pending) release(session);
            }
        } catch (error) {
            if (session.controller.signal.aborted) return;
            release(session);
            onError(error);
        }
    }

    function retry({ request, startedAt, requestStartedAt }) {
        const retryAt = requestStartedAt + RECALL_RECOVERY_MIN_INTERVAL_MS;
        let session = current;
        if (!session) {
            const context = getContext();
            session = {
                request, chatId: context.chatId, chat: context.chat,
                length: context.chat.length, last: context.chat.at(-1),
                controller: new AbortController(), cycle: 1, pending: true, retryAt,
                notice: createNotice(), releaseUi: acquireUi(() => cancel('generation-stopped')),
                releaseRecovery: holdGenerationRecovery(),
                noticeTimer: null,
            };
            current = session;
            session.noticeTimer = setTimeout(() => {
                if (current === session) session.notice.show();
            }, Math.max(0, RECALL_RECOVERY_NOTICE_MS - (now() - startedAt)));
            host.stopForRetry(request);
            void pump(session);
        } else {
            session.pending = true;
            session.retryAt = retryAt;
            host.stopForRetry(session.request);
        }
    }

    return {
        retry, cancel,
        succeeded() { if (current) release(current, true); },
        getCurrent: () => current,
    };
}
