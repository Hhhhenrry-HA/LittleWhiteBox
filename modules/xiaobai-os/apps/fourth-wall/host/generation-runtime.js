function isAbortError(error) {
    return error?.name === 'AbortError'
        || /abort|aborted|已取消/i.test(String(error?.message || error || ''));
}

export function createFourthWallGenerationRuntime({ generateResponse, loadAgentConfig }) {
    if (typeof generateResponse !== 'function' || typeof loadAgentConfig !== 'function') {
        throw new TypeError('generation runtime requires generateResponse and loadAgentConfig');
    }

    let sequence = 0;
    let active = null;

    function isCurrent(run) {
        return active === run && run.sequence === sequence && !run.controller.signal.aborted;
    }

    function cancel(reason = 'cancelled') {
        if (!active) return false;
        const run = active;
        active = null;
        sequence += 1;
        run.controller.abort(reason);
        run.onCancelled?.(reason);
        return true;
    }

    function start(options = {}) {
        cancel('superseded');
        const run = {
            sequence: ++sequence,
            requestId: String(options.requestId || ''),
            controller: new AbortController(),
            onCancelled: options.onCancelled,
        };
        active = run;

        const done = Promise.resolve().then(async () => {
            const config = await loadAgentConfig();
            if (!isCurrent(run)) return { status: 'cancelled' };
            const result = await generateResponse({
                config,
                builtPrompt: options.builtPrompt,
                stream: options.stream === true,
                disableAssistantPrefill: options.disableAssistantPrefill === true,
                signal: run.controller.signal,
                onStreamProgress(snapshot) {
                    if (isCurrent(run)) options.onProgress?.(snapshot || {});
                },
            });
            if (!isCurrent(run)) return { status: 'cancelled' };
            await options.onComplete?.(result || {});
            if (active === run) active = null;
            return { status: 'completed', result };
        }).catch(async (error) => {
            if (run.controller.signal.aborted || run.sequence !== sequence || isAbortError(error)) {
                return { status: 'cancelled' };
            }
            active = null;
            await options.onError?.(error);
            return { status: 'failed', error };
        });

        return Object.freeze({ requestId: run.requestId, done });
    }

    return Object.freeze({
        start,
        cancel,
        isRunning: () => active !== null,
        getRequestId: () => active?.requestId || '',
    });
}
