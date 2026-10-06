import { isRetryableEmbeddingFailure, readEmbeddingFailure } from '../llm/embedding-failure.js';

// Foreground query requests only; not the whole recall or main-model budget.
export const QUERY_EMBEDDING_TIMEOUT_MS = 3000;

// Failed foreground queries can only retry across host generations.
// Background maintenance keeps its existing backoff.
export function canRetryRecallEmbedding(error) {
    const failure = readEmbeddingFailure(error);
    return isRetryableEmbeddingFailure(error)
        && !(failure?.kind === 'http' && Number(failure.status) === 429);
}
