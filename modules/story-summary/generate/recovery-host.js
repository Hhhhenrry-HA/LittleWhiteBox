import { throwIfSignalAborted, waitForAbortableDelay } from '../../../shared/common/abort-utils.js';
import { getGenerationRetryOwner } from '../../../shared/common/generation-retry-owner.js';

const REPLAY_GUARD = 'story-summary-replay-guard';

// ST 1.14 and 1.18: Generate reads/clears the textarea before interceptors;
// 'regenerate' deletes the previous answer before that point. Replay must not
// repeat either operation. Group replay uses its public wrapper in auto mode.
export function createRecallRecoveryHost({ getContext, isGenerating, generateGroup,
    setAbortController, protectDraft, registerInterceptor, unregisterInterceptor }) {
    let replay = null;
    let expectedStops = 0;
    let removeListeners = null;

    function stopForRetry(request) {
        request?.owner?.requestRetry();
        expectedStops++;
        getContext().stopGeneration();
    }

    return {
        stopForRetry,
        ownsReplay: params => !!replay && (replay.owner
            ? getGenerationRetryOwner(params?.signal) === replay.owner
            : params?.signal === replay.controller.signal),
        install(onStop) {
            const { eventSource, eventTypes } = getContext();
            const listener = () => {
                if (expectedStops) { expectedStops--; return; }
                onStop();
            };
            // The native emitter awaits listeners. First registration lets us
            // classify our own stop synchronously, before any async listener.
            eventSource.makeFirst(eventTypes.GENERATION_STOPPED, listener);
            const started = (_type, params, dryRun) => {
                if (!dryRun && replay && params?.signal === replay.controller.signal) replay.protectInput();
            };
            // A group can call Generate for multiple members. Each preamble
            // needs its own lease, including command processing before AFTER_COMMANDS.
            eventSource.makeFirst(eventTypes.GENERATION_STARTED, started);
            removeListeners = () => {
                eventSource.removeListener(eventTypes.GENERATION_STOPPED, listener);
                eventSource.removeListener(eventTypes.GENERATION_STARTED, started);
            };
        },
        dispose() {
            replay?.owner?.cancel();
            replay?.controller.abort();
            removeListeners?.();
            removeListeners = null;
            expectedStops = 0;
        },
        cancelReplay() { replay?.owner?.cancel(); replay?.controller.abort(); },
        afterReplay(release) {
            if (replay) replay.afterCleanup.push(release);
            else release();
        },
        async waitForIdle(signal) {
            do {
                await waitForAbortableDelay(20, signal);
            } while (isGenerating() || expectedStops || replay);
        },
        async replay(request, signal) {
            throwIfSignalAborted(signal);
            if (request.owner) {
                const attempt = { owner: request.owner, controller: new AbortController(), afterCleanup: [] };
                replay = attempt;
                const cancel = () => request.owner.cancel();
                signal.addEventListener('abort', cancel, { once: true });
                try { await request.owner.replay(); }
                finally {
                    signal.removeEventListener('abort', cancel);
                    if (replay === attempt) replay = null;
                    for (const release of attempt.afterCleanup) release();
                }
                return;
            }
            const context = getContext();
            const controller = new AbortController();
            let draftLease = null;
            const releaseDraft = () => { draftLease?.(); draftLease = null; };
            const attempt = { controller, afterCleanup: [], protectInput: () => { draftLease ??= protectDraft(); } };
            replay = attempt;
            const abort = () => controller.abort();
            signal.addEventListener('abort', abort, { once: true });
            try {
                attempt.protectInput();
                registerInterceptor(REPLAY_GUARD, (_chat, _size, abortGeneration) => {
                    releaseDraft();
                    if (controller.signal.aborted || getContext().chatId !== context.chatId
                        || getContext().chat !== context.chat) abortGeneration(true);
                }, -100);
                setAbortController(controller);
                const type = request.type === 'regenerate' ? 'normal' : request.type;
                const params = { ...request.params, automatic_trigger: true, signal: controller.signal };
                if (context.groupId != null) await generateGroup(true, type, params);
                else await context.generate(type, params);
            } catch (error) {
                // Native group cancellation rejects after its finally cleanup.
                // Only a genuinely aborted attempt is an expected completion.
                if (!controller.signal.aborted) throw error;
            } finally {
                releaseDraft();
                signal.removeEventListener('abort', abort);
                unregisterInterceptor(REPLAY_GUARD);
                if (replay === attempt) replay = null;
                for (const release of attempt.afterCleanup) release();
            }
        },
    };
}
