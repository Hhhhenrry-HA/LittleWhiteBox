import { PreviewStatus, DRAW_SLOT_COPY, DRAW_SLOT_ERRORS } from './image-record.js';
import { isPendingJobLeaseLost } from './recoverable-image-jobs.js';
import { commitSceneSlotDelivery } from './scene-placement.js';

// Both prepared scene plans and shorthand tags use this lifecycle. The host owns
// placement; providers own transport; neither may acknowledge an unstored image.
export async function executePreparedSlots({ items, backend, store, remove, select, commit,
    run, resolveTarget, render, activity, signal, classifyError, onStateChange,
    onRenderError = error => console.error(DRAW_SLOT_COPY.renderFailed, error) }) {
    const results = new Map();
    const deliveryErrors = new Set();
    let committed = false;
    let uncertain = false;
    const refresh = async () => { try { await render(); } catch (error) { onRenderError(error); } };
    const commitOnce = async () => {
        if (committed) return true;
        signal?.throwIfAborted();
        try {
            if (await commit() === false) throw new Error(DRAW_SLOT_COPY.sourceChanged);
            committed = true;
        } catch (error) {
            committed = error?.placementsCommitted === true;
            uncertain = error?.uncertain === true;
            throw error;
        }
        await refresh();
        return true;
    };
    const deliver = async (index, patch, guard = async () => {}) => {
        const item = items[index];
        const delivered = await commitSceneSlotDelivery({
            committedEarly: true, guard,
            resolveTarget: () => resolveTarget(item.slotId),
            persist: target => store({ ...item, ...patch, messageId: target.messageId }),
            select: () => select(item.slotId, item.imgId),
        });
        if (!delivered) { await guard(); await remove(item.imgId); return; }
        results.set(index, { slotId: item.slotId, imgId: item.imgId, tags: item.tags,
            success: patch.status === PreviewStatus.SUCCESS });
        activity(item.slotId, null);
        await refresh();
    };
    const fail = async (index, error, guard) => {
        if (results.has(index) || deliveryErrors.has(index)) return;
        const kind = signal?.aborted ? DRAW_SLOT_ERRORS.interrupted : classifyError(error);
        await deliver(index, { status: PreviewStatus.FAILED,
            errorType: kind.label, errorMessage: error?.message || kind.desc }, guard);
    };
    try {
        for (const [index, item] of items.entries()) {
            activity(item.slotId, { index, total: items.length, label: DRAW_SLOT_COPY.saving });
            await store({ ...item, status: PreviewStatus.PENDING });
        }
        if (!backend) await commitOnce();
        for (const [index, item] of items.entries()) activity(item.slotId, { index, total: items.length, label: DRAW_SLOT_COPY.queued });
        await refresh();
        onStateChange?.('gen', { current: 0, total: items.length });
        await run({
            signal,
            recoverable: {
                plan: {
                    delivery: { ...items[0].delivery, preserveSlotsOnCancel: true },
                    gallery: { chatId: items[0].chatId, messageId: String(items[0].messageId),
                        characterName: items[0].characterName },
                    items: items.map((item, index) => ({ index, slotId: item.slotId, imgId: item.imgId,
                        previewMetadata: { tags: item.tags, positive: item.positive,
                            characterPrompts: item.characterPrompts, negativePrompt: item.negativePrompt } })),
                },
                commitPlacements: commitOnce,
                settlePlacements: async ({ error, guard } = {}) => {
                    if (error && committed) for (const index of items.keys()) await fail(index, error, guard);
                },
                resolveSettlement: ({ error } = {}) => error
                    ? { mode: 'fail', errorType: classifyError(error) } : { mode: 'complete' },
                afterForget: refresh,
            },
            onStateChange: (state, data) => {
                for (const [index, item] of items.entries()) {
                    if (!results.has(index)) activity(item.slotId, { index, total: items.length,
                        label: state === 'queued' ? DRAW_SLOT_COPY.queued : DRAW_SLOT_COPY.generating });
                }
                onStateChange?.(state, data);
                void refresh();
            },
            onItemReady: async ({ index, base64, guard }) => {
                if (!base64) throw new Error(DRAW_SLOT_COPY.emptyResult);
                try {
                    await deliver(index, { base64, status: PreviewStatus.SUCCESS, errorType: null, errorMessage: null }, guard);
                } catch (error) {
                    deliveryErrors.add(index);
                    error.preserveBackendResult = true;
                    throw error;
                }
            },
            onItemSettled: async ({ index, state, error, guard }) => {
                if (state !== 'ready' && state !== 'consumed') await fail(index, error, guard);
            },
        });
        if (deliveryErrors.size) throw new Error(DRAW_SLOT_COPY.storageFailed);
        const output = { success: [...results.values()].filter(item => item.success).length,
            total: items.length, results: [...results.values()], aborted: signal?.aborted === true };
        onStateChange?.('success', output);
        return output;
    } catch (error) {
        if (!backend && !committed && uncertain) {
            // Chat persistence is uncertain, but image submission is not: the
            // local transport has not run. Retain the input as a failed attempt,
            // not as a backend job waiting for a recovery worker that cannot exist.
            const problem = DRAW_SLOT_ERRORS.placement;
            const failure = new Error(problem.desc, { cause: error });
            failure.code = problem.code;
            for (const item of items) await store({ ...item, status: PreviewStatus.FAILED,
                errorType: problem.label, errorMessage: problem.desc });
            throw failure;
        }
        if (!committed && !uncertain) {
            for (const item of items) await remove(item.imgId);
        } else if (committed && !error?.detached && !isPendingJobLeaseLost(error)
            && !error?.preserveBackendResult && !deliveryErrors.size) {
            for (const index of items.keys()) await fail(index, error);
        }
        throw error;
    } finally {
        for (const item of items) activity(item.slotId, null);
        if (committed || uncertain) await refresh();
    }
}
