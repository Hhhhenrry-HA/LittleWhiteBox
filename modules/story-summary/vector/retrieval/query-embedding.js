import { embed } from '../utils/embedder.js';
import { isRetryableEmbeddingFailure } from '../llm/embedding-failure.js';
import { throwIfSignalAborted, waitForAbortableDelay } from '../../../../shared/common/abort-utils.js';
import { xbLog } from '../../../../core/debug-core.js';
import { SUMMARY_FEEDBACK_COPY } from '../../feedback-copy.js';
import { observeVectorActivity } from '../runtime/vector-activity.js';

const QUERY_TIMEOUTS_MS = [3000, 6000];
const RETRY_DELAY_MS = 500;

// Foreground query policy only; background batch retry policy is independent.
export async function embedRecallQuery(texts, vectorConfig, options = {}) {
    const activity = observeVectorActivity(vectorConfig?.embeddingApi);
    try {
        return await requestQueryVectors(texts, vectorConfig, options);
    } finally {
        const trace = activity.finish();
        options.onActivity?.(trace);
    }
}

async function requestQueryVectors(texts, vectorConfig, { signal, onFailure, onRetryWait }) {
    const errors = [];
    for (const [index, timeout] of QUERY_TIMEOUTS_MS.entries()) {
        throwIfSignalAborted(signal);
        const startedAt = performance.now();
        try {
            const vectors = await embed(texts, vectorConfig, { timeout, signal });
            throwIfSignalAborted(signal);
            return vectors;
        } catch (cause) {
            throwIfSignalAborted(signal);
            errors.push(cause);
            onFailure?.({ attempt: index + 1, error: cause, elapsedMs: Math.round(performance.now() - startedAt) });
            if (index === QUERY_TIMEOUTS_MS.length - 1 || !isRetryableEmbeddingFailure(cause)) {
                const error = new globalThis.AggregateError(errors, SUMMARY_FEEDBACK_COPY.recallEmbeddingRequestFailed, { cause });
                error.code = 'RECALL_EMBEDDING_FAILED';
                error.stage = 'round1-embed';
                throw error;
            }
            xbLog.warn('recall', SUMMARY_FEEDBACK_COPY.recallEmbeddingRetry(RETRY_DELAY_MS), cause);
        }
        const waitStartedAt = performance.now();
        try {
            await waitForAbortableDelay(RETRY_DELAY_MS, signal);
        } finally {
            onRetryWait?.(Math.round(performance.now() - waitStartedAt));
        }
    }
}
