import { throwIfSignalAborted } from '../../../shared/common/abort-utils.js';
import { usesStoryRecall } from './recall-policy.js';
import { canRetryRecallEmbedding } from '../vector/retrieval/query-embedding-policy.js';

// One invocation belongs to exactly one host Generate. A failed query exits
// that Generate; the recovery owner, not this gate, starts the next one.
export async function runRequiredRecall({ coordinator, run, commit, abort, onRetry, onProgress, onFailure }) {
    let completed = false;
    let retryError = null;
    try {
        onProgress?.(run.diagnostics);
        for (;;) {
            const revision = run.revision;
            const outcome = await coordinator.waitForOutcome(run);
            if (revision !== run.revision) continue;
            if (!outcome.ok) throw outcome.error;
            const value = await commit(outcome.value, run.controller.signal);
            throwIfSignalAborted(run.controller.signal);
            if (revision !== run.revision) continue;
            completed = true;
            return { ok: true, value };
        }
    } catch (error) {
        if (usesStoryRecall(run.type)
            && !run.cancelReason && !run.controller.signal.aborted
            && error?.code === 'RECALL_EMBEDDING_FAILED' && canRetryRecallEmbedding(error)) {
            retryError = error;
        } else {
            await onFailure?.(error);
        }
        return { ok: false };
    } finally {
        // Detach before aborting the dispatch: a real failure must not be
        // overwritten by a second, synthetic "dispatch cancelled" report.
        coordinator.finish(run);
        if (!completed) abort(true);
        if (retryError) onRetry(retryError, run.diagnostics);
    }
}
