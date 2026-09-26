import { DRAW_SLOT_COPY } from './image-record.js';
import { isPendingJobLeaseLost } from './recoverable-image-jobs.js';

// Only existing-slot requests originate from card redraws. New tag expansion
// and planned floor batches keep their existing lifecycle and UI owners.
export function createImageCardRedrawProvider({ execute, createJob, releaseJob, ownsJob,
    getCurrentContext, setStateForMessage, classifyError }) {
    return async input => {
        if (input.job || !input.tasks.every(task => task.placement?.mode === 'existing')) {
            return execute(input);
        }
        const { ctx, message, messageId } = input;
        const chatId = String(ctx.chatId);
        const swipeIndex = input.swipeIndex ?? message.swipe_id ?? 0;
        const isCurrentTarget = () => {
            const live = getCurrentContext();
            return String(live.chatId) === chatId && live.chat?.[messageId] === message
                && (message.swipe_id ?? 0) === swipeIndex;
        };
        if (!isCurrentTarget()) throw new Error(DRAW_SLOT_COPY.sourceChanged);

        // Use the actual floor job, not the tag-expansion job key: the existing
        // capsule cancel button and generation-phase lookup must find this run.
        // A conflicting job rejects before changing that job's capsule.
        const job = createJob(messageId);
        const update = (state, data) => {
            if (ownsJob(job) && isCurrentTarget()) setStateForMessage(messageId, state, data);
        };
        const onStateChange = (state, data = {}) => {
            input.onStateChange?.(state, data);
            if (state === 'success') {
                update(data.aborted && data.success === 0 ? 'idle'
                    : data.aborted || data.success < data.total ? 'partial' : 'success', data);
            } else if (state === 'delivering') {
                update('accepted', { ...data, stage: 'delivering' });
            } else {
                update(state === 'progress' ? 'gen' : state, data);
            }
        };
        try {
            // Reset both the previous result and its auto-reset timer before any
            // asynchronous save/compile work; it must not reset this new run.
            update('idle');
            update('queued', { total: input.tasks.length });
            return await execute({ ...input, job, onStateChange });
        } catch (error) {
            if (error?.detached || error?.uncertain || isPendingJobLeaseLost(error)) {
                update('uncertain');
            } else if (job.controller.signal.aborted) {
                update('idle');
            } else {
                update('error', { error: classifyError(error) });
            }
            throw error;
        } finally {
            releaseJob(job);
        }
    };
}
