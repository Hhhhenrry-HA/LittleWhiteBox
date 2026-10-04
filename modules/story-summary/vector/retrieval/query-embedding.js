import { embed } from '../utils/embedder.js';
import { throwIfSignalAborted, waitForAbortableDelay } from '../../../../shared/common/abort-utils.js';
import { xbLog } from '../../../../core/debug-core.js';
import { SUMMARY_FEEDBACK_COPY } from '../../feedback-copy.js';
import { observeVectorActivity } from '../runtime/vector-activity.js';
import { QUERY_EMBEDDING_TIMEOUT_MS, QUERY_EMBEDDING_ATTEMPTS, QUERY_EMBEDDING_RETRY_DELAY_MS, canRetryRecallEmbedding } from './query-embedding-policy.js';

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

async function requestQueryVectors(texts, vectorConfig, { signal, onFailure, onRetryWait, stage = 'round1-embed' }) {
    const errors = [];
    for (let index = 0; index < QUERY_EMBEDDING_ATTEMPTS; index++) {
        throwIfSignalAborted(signal);
        const startedAt = performance.now();
        try {
            const vectors = await embed(texts, vectorConfig, { timeout: QUERY_EMBEDDING_TIMEOUT_MS, signal });
            throwIfSignalAborted(signal);
            return vectors;
        } catch (cause) {
            throwIfSignalAborted(signal);
            errors.push(cause);
            onFailure?.({ attempt: index + 1, error: cause, elapsedMs: Math.round(performance.now() - startedAt) });
            if (!canRetryRecallEmbedding(cause) || index === QUERY_EMBEDDING_ATTEMPTS - 1) {
                const error = new globalThis.AggregateError(errors, SUMMARY_FEEDBACK_COPY.recallEmbeddingRequestFailed, { cause });
                error.code = 'RECALL_EMBEDDING_FAILED';
                error.stage = stage;
                throw error;
            }
            xbLog.warn('recall', SUMMARY_FEEDBACK_COPY.recallEmbeddingRetry(QUERY_EMBEDDING_RETRY_DELAY_MS), cause);
        }
        const waitStartedAt = performance.now();
        try {
            await waitForAbortableDelay(QUERY_EMBEDDING_RETRY_DELAY_MS, signal);
        } finally {
            onRetryWait?.(Math.round(performance.now() - waitStartedAt));
        }
    }
}
