import { embed } from '../utils/embedder.js';
import { throwIfSignalAborted } from '../../../../shared/common/abort-utils.js';
import { SUMMARY_FEEDBACK_COPY } from '../../feedback-copy.js';
import { observeVectorActivity } from '../runtime/vector-activity.js';
import { QUERY_EMBEDDING_TIMEOUT_MS } from './query-embedding-policy.js';

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

async function requestQueryVectors(texts, vectorConfig, { signal, onFailure, stage = 'round1-embed' }) {
    throwIfSignalAborted(signal);
    const startedAt = performance.now();
    try {
        const vectors = await embed(texts, vectorConfig, { timeout: QUERY_EMBEDDING_TIMEOUT_MS, signal });
        throwIfSignalAborted(signal);
        return vectors;
    } catch (cause) {
        throwIfSignalAborted(signal);
        onFailure?.({ attempt: 1, error: cause, elapsedMs: Math.round(performance.now() - startedAt) });
        const error = new globalThis.AggregateError([cause], SUMMARY_FEEDBACK_COPY.recallEmbeddingRequestFailed, { cause });
        error.code = 'RECALL_EMBEDDING_FAILED';
        error.stage = stage;
        error.requestStartedAt = startedAt;
        throw error;
    }
}
