import { isRetryableEmbeddingFailure, readEmbeddingFailure } from '../llm/embedding-failure.js';

// Foreground query requests only; not the whole recall or main-model budget.
export const QUERY_EMBEDDING_TIMEOUT_MS = 3000;
export const QUERY_EMBEDDING_ATTEMPTS = 2;
export const QUERY_EMBEDDING_RETRY_DELAY_MS = 1000;

// Both retries inside a request and restarts across host generations use this
// foreground decision. Background maintenance keeps its existing backoff.
export function canRetryRecallEmbedding(error) {
    const failure = readEmbeddingFailure(error);
    return isRetryableEmbeddingFailure(error)
        && !(failure?.kind === 'http' && Number(failure.status) === 429);
}
