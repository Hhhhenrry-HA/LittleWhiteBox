import { MEMORY_DATA_COPY } from './data/memory-copy.js';
import { claimWarningCooldown } from './vector/runtime/maintenance-coordinator.js';
import { xbLog } from '../../core/debug-core.js';
import { SUMMARY_FEEDBACK_COPY } from './feedback-copy.js';

const MODULE_ID = 'story-summary-feedback';
const EMBEDDING_CHANNEL = 'embedding-connection';
const NOTICE_OPTIONS = Object.freeze({ timeOut: 12000, extendedTimeOut: 3000, closeButton: true, escapeHtml: true });
// The loaded memory object owns this lifetime. Reloading releases the old owner;
// toggling the feature or reopening its panel must not repeat the same warning.
const unconfirmedOwners = new WeakSet();
let embeddingToast = null;

export function notifyUnconfirmedMemory(state, owner) {
    if (state !== 'unconfirmed') return false;
    if (!unconfirmedOwners.has(owner)) {
        unconfirmedOwners.add(owner);
        toastr.error(MEMORY_DATA_COPY.unconfirmed, SUMMARY_FEEDBACK_COPY.title, NOTICE_OPTIONS);
    }
    return true;
}

export function notifySummaryStartupFailure(error, shouldNotify = true) {
    console.error(SUMMARY_FEEDBACK_COPY.startupFailed, error);
    xbLog.error(MODULE_ID, SUMMARY_FEEDBACK_COPY.startupFailed, error);
    if (shouldNotify) toastr.error(SUMMARY_FEEDBACK_COPY.startupFailed, SUMMARY_FEEDBACK_COPY.title, NOTICE_OPTIONS);
}

export function clearEmbeddingFailureNotice() {
    if (!embeddingToast) return;
    // Clear only our toast. Finishing the native hide animation avoids stacking
    // an upgraded recall failure over the old probe warning, and renews its timer.
    toastr.clear(embeddingToast, { force: true });
    embeddingToast.finish();
    embeddingToast = null;
}

function showEmbeddingFailure(message) {
    clearEmbeddingFailureNotice();
    embeddingToast = toastr.warning(message, SUMMARY_FEEDBACK_COPY.embeddingTitle, NOTICE_OPTIONS);
}

export function notifyEmbeddingWarmupFailure(cooldownMs, stage = 'embedding') {
    if (!claimWarningCooldown(EMBEDDING_CHANNEL, '', 'failed', cooldownMs)) return;
    showEmbeddingFailure(stage === 'embedding'
        ? SUMMARY_FEEDBACK_COPY.embeddingWarmup
        : SUMMARY_FEEDBACK_COPY.vectorInitialization[stage]);
}

export function notifyEmbeddingRecallFailure(chatId, message, recallCooldownMs) {
    // A late probe failure must not downgrade a real recall failure. Actual
    // recall outcomes retain their existing per-chat cooldown and are not hidden
    // merely because a probe warning was shown first.
    // Refresh the probe clock even if its previous cooldown has not expired.
    claimWarningCooldown(EMBEDDING_CHANNEL, '', 'failed', 0);
    if (!claimWarningCooldown('recall', chatId, 'recall_embedding_failed', recallCooldownMs)) return;
    showEmbeddingFailure(message);
}

/** One receipt for a user-requested clear; a cancelled queued action returns false. */
export async function runClearWithFeedback({ kind, clear, refresh, isCurrent, reportUnconfirmed }) {
    const copy = SUMMARY_FEEDBACK_COPY[kind];
    let cleared = false;
    try {
        if (!await clear()) return;
        cleared = true;
        if (!isCurrent()) return;
        await refresh();
        if (!isCurrent()) return;
        toastr.info(copy.success, SUMMARY_FEEDBACK_COPY.title);
    } catch (error) {
        const message = cleared ? copy.refreshFailed : copy.failed;
        console.error(message, error);
        xbLog.error(MODULE_ID, message, error);
        if (!isCurrent() || reportUnconfirmed()) return;
        toastr[cleared ? 'warning' : 'error'](message, SUMMARY_FEEDBACK_COPY.title, NOTICE_OPTIONS);
    }
}
