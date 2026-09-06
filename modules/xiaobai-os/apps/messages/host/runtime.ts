import type { MessagesService } from '../application/service.js';
import type { MessagesTimeline } from '../application/timeline.js';
import { sendPrivateMessage, type SendDependencies } from '../application/send.js';
import type { OutgoingMessage } from '../application/image-upload.js';
import { unsyncedIds } from '../application/projection.js';

export function createMessagesRuntime(deps: SendDependencies & {
    identity(): string; isGenerating(): boolean; changed(): void;
}) {
    let epoch = 0;
    let active: { controller: AbortController; contactId: string; messageId: string; stage: string; identity: string } | null = null;
    let error = '';
    let task: Promise<void> | null = null;
    function cancel() {epoch++; active?.controller.abort();}
    function guard() {
        const captured = epoch; const identity = deps.identity();
        return () => !!identity && captured === epoch && identity === deps.identity() && !deps.isGenerating();
    }
    function start(contactId: string, messageId: string, payload?: OutgoingMessage): void {
        if (active) {
            if (active.messageId === messageId && active.identity === deps.identity()) {return;}
            throw new Error('messages_busy');
        }
        if (deps.isGenerating() || deps.service.pending() || deps.service.fileState() !== 'ready') {throw new Error('messages_not_ready');}
        error = '';
        const run = { contactId, messageId, stage: 'saving', controller: new AbortController(), identity: deps.identity() };
        active = run;
        const current = guard();
        deps.changed();
        task = sendPrivateMessage(deps, {
            contactId, messageId, payload, signal: run.controller.signal, guard: current,
            stage(stage) {run.stage = stage; deps.changed();},
        }).catch(cause => {
            console.warn('[LittleWhiteBox] 私人信息未完成', cause);
            if (deps.identity() === run.identity) {
                const hasImages = deps.service.current().messages.some(message => message.contactId === contactId
                    && message.payload.type === 'image' && message.payload.attachment);
                error = run.controller.signal.aborted ? '故事或聊天已有变化，这次回复已停止。已发送的消息保留，可以重试。'
                    : deps.service.pending() ? '消息还在等待保存确认，请先检查保存。'
                        : run.stage === 'uploading' ? '图片未能完成上传，尚未发出，请重试发送。'
                            : cause instanceof Error && cause.message === 'messages_image_missing' ? '消息里的原图暂时无法读取，可恢复图片后重试，或删除这条图片消息后继续。'
                                : run.stage === 'syncing' ? '消息已保留，尚未写入主聊天。点上方「查看」继续处理。'
                                    : run.stage === 'saving' ? '消息暂时没能保存，请检查保存后再试。'
                                        : '暂时没有收到回复。请检查 API 配置或网络，再重试这条消息。'
                                            + (hasImages ? '若模型不支持图片，可更换模型，或点图片下方「删除图片消息」后继续。' : '');
            }
        }).finally(() => {if (active === run) {active = null;} deps.changed();});
    }
    return {
        start, cancel, guard,
        get active() {return active;}, get error() {return error;},
        clearError() {error = '';},
        async stop() {cancel(); await task;},
    };
}

export async function syncCurrentMessages(service: MessagesService, timeline: MessagesTimeline, guard: () => boolean): Promise<void> {
    await service.refresh();
    const state = service.current();
    for (const segment of [...state.segments].reverse()) {
        const missing = new Set(unsyncedIds(service.current()));
        if (segment.messageIds.some(id => missing.has(id))) {await timeline.sync(segment.id, guard);}
    }
}
