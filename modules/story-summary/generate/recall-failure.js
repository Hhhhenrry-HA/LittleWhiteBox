import { SUMMARY_FEEDBACK_COPY } from '../feedback-copy.js';

export const RECALL_TIMEOUT_MS = 30_000;
export const RECALL_TIMEOUT_REASONS = Object.freeze({
    host: 'host-wait-timeout',
    compute: 'recall-timeout',
});

function embeddingFailureNotice(error) {
    const failure = error.cause?.embeddingFailure;
    const status = failure?.status;
    let reason = 'unknown';
    if (failure?.kind === 'http') {
        if (status === 401 || status === 403) reason = 'credentials';
        else if (status === 429) reason = 'rate_limit';
        else if (status === 408) reason = 'request_timeout';
        else if (status >= 500 && status <= 599) reason = 'server';
        else reason = 'http';
    } else if (failure) {
        reason = failure.kind;
    } else if (error.code === 'RECALL_EMBEDDING_INVALID_RESPONSE') {
        reason = 'invalid_response';
    }
    const timeouts = (error.errors || []).flatMap((attemptError, index) => {
        const detail = attemptError.embeddingFailure;
        return detail?.kind === 'timeout' && Number.isFinite(detail.timeoutMs)
            ? [{ attempt: index + 1, timeoutMs: detail.timeoutMs }]
            : [];
    });
    const copy = SUMMARY_FEEDBACK_COPY.embeddingRecallReasons;
    return {
        issueCode: 'recall_embedding_failed',
        reason,
        httpStatus: failure?.kind === 'http' ? status : null,
        timeouts,
        notice: SUMMARY_FEEDBACK_COPY.embeddingRecall(copy[reason](reason === 'timeout' ? timeouts : status)),
    };
}

/** Cancellation is not failure; report only the deadline that actually expired. */
export function recallFailureNotice(cancelReason, error, timeoutMs = RECALL_TIMEOUT_MS) {
    const seconds = timeoutMs / 1000;
    if (cancelReason === RECALL_TIMEOUT_REASONS.host) {
        return {
            issueCode: 'recall_host_wait_timeout',
            notice: SUMMARY_FEEDBACK_COPY.recallHostTimeout(seconds),
        };
    }
    if (cancelReason === RECALL_TIMEOUT_REASONS.compute) {
        return {
            issueCode: 'recall_timeout',
            notice: SUMMARY_FEEDBACK_COPY.recallComputeTimeout(seconds),
        };
    }
    if (cancelReason) return null;
    if (error?.code === 'RECALL_EMBEDDING_FAILED' || error?.code === 'RECALL_EMBEDDING_INVALID_RESPONSE') {
        return embeddingFailureNotice(error);
    }
    return {
        issueCode: 'recall_failed',
        notice: SUMMARY_FEEDBACK_COPY.recallFailed,
    };
}
