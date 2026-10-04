// Request-scoped handoff. A consumer asks for another attempt; only the
// original caller knows how to create it. Nothing here knows about memory/Dice.
const owners = new WeakMap();
const recoveries = new Set();

export function getGenerationRetryOwner(signal) {
    return signal ? owners.get(signal) ?? null : null;
}

export function holdGenerationRecovery() {
    const lease = {};
    recoveries.add(lease);
    return () => recoveries.delete(lease);
}

export function hasGenerationRecovery() {
    return recoveries.size > 0;
}

function deferred() {
    let resolve;
    const promise = new Promise(done => { resolve = done; });
    return { promise, resolve };
}

export async function runOwnedGeneration(signal, attempt, cancelOwner) {
    let pending = null;
    let replayFinished = null;
    let cancelled = false;
    let ended = false;
    const owner = {
        get retryPending() { return pending !== null; },
        requestRetry() { if (!cancelled && !ended) pending ??= deferred(); },
        replay() {
            if (cancelled || ended) return Promise.resolve();
            const next = deferred();
            replayFinished = next;
            pending.resolve();
            return next.promise;
        },
        cancel() {
            if (cancelled || ended) return;
            cancelled = true;
            pending?.resolve();
            cancelOwner();
        },
    };
    signal.addEventListener('abort', owner.cancel, { once: true });
    try {
        while (!cancelled && !signal.aborted) {
            pending = null;
            let requestSignal = null;
            let value;
            try {
                value = await attempt(currentSignal => {
                    requestSignal = currentSignal;
                    owners.set(currentSignal, owner);
                });
            } finally {
                if (requestSignal) owners.delete(requestSignal);
                replayFinished?.resolve();
                replayFinished = null;
            }
            if (!pending) return value;
            await pending.promise;
        }
        return null;
    } finally {
        ended = true;
        pending = null;
        // Cancellation can exit between replay's wakeup and the next attempt.
        // Its host cleanup must settle even when that attempt never starts.
        replayFinished?.resolve();
        replayFinished = null;
        signal.removeEventListener('abort', owner.cancel);
    }
}
