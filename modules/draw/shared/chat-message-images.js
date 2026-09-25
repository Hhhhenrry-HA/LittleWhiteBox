import { getContext } from '../../../../../../extensions.js';
import { initAfterAiGate, notifyAfterAiHint, registerAfterAiHandler } from '../../../core/after-ai-gate.js';
import { xbLog } from '../../../core/debug-core.js';
import { createModuleEvents, event_types } from '../../../core/event-manager.js';
import { parseChatImageTags, findRenderedChatImageTags } from './chat-message-image-markup.js';
import { ensureChatImageTagFormat, markFreshImageTagChat } from './chat-image-tag-migration.js';
import { generatePreparedChatImages } from './prepared-chat-images.js';
import { buildPendingImageHtml, isMessageBeingEdited } from './draw-common.js';
import { DRAW_SLOT_COPY } from './image-record.js';

const events = createModuleEvents('chatMessageImages');
const leases = new Map();
const floors = new WeakMap();
let initialized = false;
let observer;
let afterAiDispose;
let timer;
let generating = false;

function available() { return initialized && window.xiaobaixDraw?.getStatus?.().ready === true; }
function hostBusy() { return generating || Boolean(document.body?.dataset.generating); }
function report(error) {
    xbLog.error('draw', DRAW_SLOT_COPY.tagAdoptionFailed, error);
    globalThis.toastr?.error(error.message, DRAW_SLOT_COPY.tagAdoptionFailed);
}

function releaseProvisional(lease) {
    for (const [node, candidate] of lease.nodes) {
        observer?.unobserve(node);
        if (node.isConnected) node.replaceWith(node.ownerDocument.createTextNode(candidate.marker));
    }
    lease.nodes.clear();
}

function requestRefresh() {
    clearTimeout(timer);
    timer = setTimeout(() => {
        if (initialized) void processAllMessages().catch(report);
    }, 0);
}

function queueClaim(lease, node) {
    const { message } = lease;
    if (!available() || hostBusy() || !node.isConnected) return;
    let floor = floors.get(message);
    if (!floor) {
        floor = { pending: new Map(), running: false, timer: null, failedSource: null };
        floors.set(message, floor);
    }
    if (floor.failedSource === message.mes) return;
    const candidate = lease.nodes.get(node);
    if (!candidate) return;
    floor.pending.set(`${lease.swipeIndex}:${candidate.start}`, { lease, candidate });
    if (floor.running || floor.timer) return;
    floor.timer = setTimeout(() => { floor.timer = null; void claimFloor(message, floor); }, 0);
}

async function claimFloor(message, floor) {
    if (floor.running) return;
    floor.running = true;
    let sourceText;
    try {
        const entries = [...floor.pending.values()];
        floor.pending.clear();
        const ctx = getContext();
        const messageId = ctx.chat.indexOf(message);
        sourceText = message.mes;
        const swipeIndex = message.swipe_id ?? 0;
        if (!available() || hostBusy() || messageId < 0 || isMessageBeingEdited(messageId)) return;
        const candidates = entries.filter(({ lease }) => String(lease.ctx.chatId) === String(ctx.chatId)
            && lease.source === sourceText && lease.swipeIndex === swipeIndex).map(item => item.candidate);
        if (!candidates.length || floor.failedSource === sourceText) return;
        await generatePreparedChatImages(window.xiaobaixDraw.getProvider(), {
            ctx, message, messageId, sourceText,
            tasks: candidates.map(candidate => ({ scene: candidate.tags, chars: [], characterPrompts: [],
                placement: { ...candidate, mode: 'replace' } })),
            onPlacement: requestRefresh,
        });
    } catch (error) {
        // Keep a failed claim quiet in this runtime. A rerender is not permission
        // to retry a request or an uncertain save. Durable slots use normal retry.
        floor.failedSource = message.mes === sourceText ? sourceText : null;
        report(error);
    } finally {
        floor.running = false;
        requestRefresh();
        if (floor.pending.size) {
            floor.timer = setTimeout(() => { floor.timer = null; void claimFloor(message, floor); }, 0);
        }
    }
}

async function enhance(lease) {
    if (!available() || hostBusy() || lease.released) return;
    const ctx = getContext();
    if (!ctx.chatId || !ctx.chat?.length) return;
    await ensureChatImageTagFormat(ctx);
    if (lease.released || !available() || hostBusy() || getContext().chatMetadata !== ctx.chatMetadata) return;
    const message = ctx.chat[lease.messageId];
    if (!message || isMessageBeingEdited(lease.messageId)) return;
    releaseProvisional(lease);
    Object.assign(lease, { ctx, message, source: message.mes, swipeIndex: message.swipe_id ?? 0 });
    if (floors.get(message)?.failedSource === message.mes) return;
    const { matched, unmatched } = findRenderedChatImageTags(lease.content, parseChatImageTags(message.mes));
    if (unmatched.length && lease.unresolvedSource !== message.mes) {
        lease.unresolvedSource = message.mes;
        xbLog.warn('draw', DRAW_SLOT_COPY.sourceUnresolved, { messageId: lease.messageId });
    }
    // Reverse DOM order preserves offsets when several tags share a text node.
    for (const { node, offset, marker, candidate } of matched.reverse()) {
        const suffix = node.ownerDocument.createTextNode(node.nodeValue.slice(offset + marker.length));
        node.nodeValue = node.nodeValue.slice(0, offset);
        const template = lease.content.ownerDocument.createElement('template');
        // Shared escaped renderer; this provisional card is not a registered image.
        // eslint-disable-next-line no-unsanitized/property
        template.innerHTML = buildPendingImageHtml({ slotId: '', messageId: lease.messageId, label: DRAW_SLOT_COPY.waiting });
        const card = template.content.firstElementChild;
        card.dataset.xbDrawTag = '1';
        node.after(card, suffix);
        lease.nodes.set(card, candidate);
        observer.observe(card);
    }
}

// Content leases only own rendering subscriptions, never drawing jobs.
export function mountChatMessageImages(content, messageId = Number(content.closest('.mes')?.getAttribute('mesid'))) {
    leases.get(content)?.release();
    const lease = { content, messageId, nodes: new Map(), released: false };
    lease.release = () => {
        lease.released = true;
        releaseProvisional(lease);
        if (leases.get(content) === lease) leases.delete(content);
    };
    leases.set(content, lease);
    requestRefresh();
    return lease.release;
}

async function processAllMessages() {
    if (!available() || hostBusy()) return;
    for (const [content, lease] of leases) if (!content.isConnected) lease.release();
    for (const content of document.querySelectorAll('#chat .mes .mes_text')) {
        if (!leases.has(content)) {
            const messageId = Number(content.closest('.mes').getAttribute('mesid'));
            const lease = { content, messageId, nodes: new Map(), released: false };
            lease.release = () => { lease.released = true; releaseProvisional(lease); leases.delete(content); };
            leases.set(content, lease);
        }
    }
    for (const lease of leases.values()) await enhance(lease);
}

function notifyAfterAi(data, source) {
    const ctx = getContext();
    const id = source === 'generation_ended' ? ctx.chat.length - 1
        : (typeof data === 'object' ? data?.messageId ?? data?.id ?? data?.index ?? data?.mesId : data);
    if (ctx.chatId && Number.isInteger(id) && id >= 0) notifyAfterAiHint({
        chatId: String(ctx.chatId), messageId: id, source, kind: 'chatMessageImages',
    });
}

export function initChatMessageImages() {
    if (initialized) { requestRefresh(); return true; }
    initialized = true;
    observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            observer.unobserve(entry.target);
            for (const lease of leases.values()) if (lease.nodes.has(entry.target)) {
                queueClaim(lease, entry.target);
                break;
            }
        }
    }, { rootMargin: '200px 0px', threshold: 0.01 });
    initAfterAiGate();
    afterAiDispose = registerAfterAiHandler('chatMessageImages', () => { generating = false; requestRefresh(); });
    events.on(event_types.CHAT_CREATED, () => { markFreshImageTagChat(getContext()); requestRefresh(); });
    events.on(event_types.GROUP_CHAT_CREATED, () => { markFreshImageTagChat(getContext()); requestRefresh(); });
    events.on(event_types.CHAT_CHANGED, () => {
        generating = false;
        for (const lease of leases.values()) lease.release();
        requestRefresh();
    });
    events.on(event_types.GENERATION_STARTED, () => { generating = true; });
    events.on(event_types.GENERATION_STOPPED, () => { generating = false; requestRefresh(); });
    events.on(event_types.GENERATION_ENDED, data => notifyAfterAi(data, 'generation_ended'));
    events.on(event_types.MESSAGE_RECEIVED, data => notifyAfterAi(data, 'message_received'));
    for (const event of [event_types.USER_MESSAGE_RENDERED, event_types.MESSAGE_EDITED,
        event_types.MESSAGE_UPDATED, event_types.MESSAGE_SWIPED, event_types.MESSAGE_DELETED]) events.on(event, requestRefresh);
    requestRefresh();
    return true;
}

export function refreshChatMessageImages() {
    if (!initialized) return false;
    if (!available()) for (const lease of leases.values()) lease.release();
    requestRefresh();
    return true;
}

export function cleanupChatMessageImages() {
    if (!initialized) return false;
    initialized = false;
    generating = false;
    clearTimeout(timer);
    events.cleanup();
    afterAiDispose?.();
    afterAiDispose = null;
    observer?.disconnect();
    for (const lease of leases.values()) lease.release();
    observer = null;
    return true;
}
