import { getContext } from '../../../../../../extensions.js';
import { uuidv4 } from '../../../../../../utils.js';
import { storePreview, deletePreview, setSlotSelection } from './gallery-cache.js';
import { createPlaceholder, renderPreviewsForMessage, syncRenderedMessageFromState,
    isMessageBeingEdited, classifyError, clearDrawSavedEntry } from './draw-common.js';
import { withConfirmableChatMutation, saveChatAndConfirm } from './confirmable-chat-save.js';
import { setActiveMessageText, insertScenePlacementsPreservingSlots, isSceneSlotAlive } from './scene-placement.js';
import { getImageJobDeliveryTextAt, findImageJobDeliverySlot } from './image-job-delivery-target.js';
import { executePreparedSlots } from './prepared-slot-executor.js';
import { setSlotActivity, clearSlotActivity } from './slot-activity.js';
import { DRAW_SLOT_COPY } from './image-record.js';

const providers = new Map();

export function registerPreparedImageProvider(provider, execute) {
    providers.set(provider, execute);
    return () => { if (providers.get(provider) === execute) providers.delete(provider); };
}

export function generatePreparedChatImages(provider, input) {
    const execute = providers.get(provider);
    if (!execute) throw new Error(DRAW_SLOT_COPY.unavailable);
    return execute(input);
}

export function createImageIdentifiers() {
    const id = uuidv4();
    return { slotId: `slot-${id}`, imgId: `img-${id}` };
}

export function placePreparedImageSlots(source, tasks, ids) {
    if (tasks.every(task => task.placement?.mode === 'existing')) {
        if (ids.some(item => !isSceneSlotAlive(source, item.slotId))) throw new Error(DRAW_SLOT_COPY.sourceChanged);
        return source;
    }
    if (!tasks.some(task => task.placement?.mode === 'replace')) {
        return insertScenePlacementsPreservingSlots(source, tasks.map((task, index) => ({
            placement: task.placement, content: createPlaceholder(ids[index].slotId),
        })), { block: true });
    }
    let result = source;
    let lastStart = source.length;
    const edits = tasks.map((task, index) => ({ ...task.placement, slotId: ids[index].slotId }))
        .sort((a, b) => b.start - a.start);
    for (const edit of edits) {
        if (edit.mode !== 'replace' || !Number.isInteger(edit.start) || !Number.isInteger(edit.end)
            || edit.start < 0 || edit.end > lastStart || edit.end <= edit.start
            || source.slice(edit.start, edit.end) !== edit.marker) throw new Error(DRAW_SLOT_COPY.sourceChanged);
        result = result.slice(0, edit.start) + createPlaceholder(edit.slotId) + result.slice(edit.end);
        lastStart = edit.start;
    }
    return result;
}

// The two input adapters supply already compiled metadata and the same provider
// batch runner. This is the only owner of pre-request chat placement for them.
export async function submitPreparedChatImages({ ctx, message, messageId, sourceText,
    tasks, metadata, backend, run, signal, onStateChange, onPlacement,
    swipeIndex = message.swipe_id ?? 0 }) {
    const chatId = String(ctx.chatId);
    const ids = tasks.map(task => ({ ...createImageIdentifiers(),
        ...(task.placement?.mode === 'existing' ? { slotId: task.placement.slotId } : {}) }));
    const plannedText = placePreparedImageSlots(sourceText, tasks, ids);
    const owner = {};
    const items = metadata.map((data, index) => ({ ...data, ...ids[index], messageId,
        chatId, characterName: message.name || '',
        delivery: { mode: 'slots', chatId, messageId: String(messageId), swipeIndex },
    }));
    const resolveTarget = slotId => {
        const live = getContext();
        // A local request may finish after navigating away. Its original message
        // remains the delivery target; never write into the newly opened chat.
        if (String(live.chatId) === chatId) return findImageJobDeliverySlot(live.chat, slotId);
        const original = findImageJobDeliverySlot([message], slotId);
        return original ? { ...original, messageId } : null;
    };
    const render = async () => {
        if (String(getContext().chatId) !== chatId) return;
        const byMessage = new Map();
        for (const item of items) {
            const target = resolveTarget(item.slotId);
            if (!target?.isActiveSwipe) continue;
            const slots = byMessage.get(target.messageId) || [];
            slots.push(item.slotId);
            byMessage.set(target.messageId, slots);
        }
        for (const [id, refreshSlotIds] of byMessage) await renderPreviewsForMessage(id, { refreshSlotIds });
    };
    return executePreparedSlots({ items, backend, store: storePreview, remove: deletePreview,
        select: async (slotId, imgId) => {
            await setSlotSelection(slotId, imgId);
            const target = resolveTarget(slotId);
            if (target && String(getContext().chatId) === chatId) await clearDrawSavedEntry(target.messageId, slotId);
        }, resolveTarget, render, run, signal, onStateChange, classifyError,
        activity: (slotId, state) => state
            ? setSlotActivity(slotId, { ...state, owner }) : clearSlotActivity(slotId, owner),
        commit: () => withConfirmableChatMutation(ctx, async () => {
            const live = getContext();
            if (String(live.chatId) !== chatId || live.chat?.[messageId] !== message
                || (message.swipe_id ?? 0) !== swipeIndex || message.mes !== sourceText
                || isMessageBeingEdited(messageId)) throw new Error(DRAW_SLOT_COPY.sourceChanged);
            signal?.throwIfAborted();
            setActiveMessageText(message, plannedText);
            try {
                await saveChatAndConfirm({ ctx, verify: persisted => {
                    const text = getImageJobDeliveryTextAt(persisted, { messageId, swipeIndex });
                    return items.every(item => isSceneSlotAlive(text, item.slotId));
                } });
            } catch (error) {
                if (error.saveAttempted === false && message.mes === plannedText) setActiveMessageText(message, sourceText);
                throw error;
            }
            if (String(getContext().chatId) !== chatId || ctx.chat[messageId] !== message
                || (message.swipe_id ?? 0) !== swipeIndex || message.mes !== plannedText
                || isMessageBeingEdited(messageId)) {
                const error = new Error(DRAW_SLOT_COPY.sourceChanged);
                error.placementsCommitted = true;
                throw error;
            }
            try {
                await syncRenderedMessageFromState(messageId, { chatId, expectedMessage: message });
                onPlacement?.();
            } catch (error) { console.error(DRAW_SLOT_COPY.renderFailed, error); }
            return true;
        }),
    });
}
