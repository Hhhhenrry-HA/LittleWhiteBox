import { getContext } from '../../../../../../../../extensions.js';
import { addOneMessage, updateMessageBlock, saveChat, isChatSaving, getRequestHeaders, default_avatar } from '../../../../../../../../../script.js';
import { saveGroupChat } from '../../../../../../../../group-chats.js';
import { getMessageTimeStamp } from '../../../../../../../../RossAscends-mods.js';
import { createModuleEvents, event_types } from '../../../../../core/event-manager.js';
import { getSillyTavernChatIdentity } from '../../../host/sillytavern-context.js';
import { PRIVATE_MESSAGE_MARKER, projectionMarker, type ChatMessage } from '../application/projection.js';
import type { MessagesChatPort } from '../application/timeline.js';
import { getStorySummaryCommittedThrough } from '../../../../story-summary/story-summary.js';

interface HostContext {
    chat: ChatMessage[];
    chatId: string;
    groupId?: string;
    characterId?: string;
    characters: Record<string, { avatar: string; name: string }>;
    chatMetadata: Record<string, unknown>;
    eventSource: { emit(name: string, ...args: unknown[]): Promise<void> };
}

function context(): HostContext {return getContext() as unknown as HostContext;}
function identity(): string {return getSillyTavernChatIdentity()?.key ?? '';}
function same(left: unknown, right: unknown): boolean {return JSON.stringify(left) === JSON.stringify(right);}

export function createMessagesChatAdapter(isGenerating: () => boolean) {
    let writing: { index: number; text: string; segmentId: string } | null = null;
    const attempts = new Map<string, { before: ChatMessage[]; after: ChatMessage[] }>();

    async function readRemote(source: HostContext): Promise<ChatMessage[]> {
        const character = source.characters[String(source.characterId)];
        const endpoint = source.groupId ? '/api/chats/group/get' : '/api/chats/get';
        const body = source.groupId ? { id: source.chatId }
            : { ch_name: character?.name, avatar_url: character?.avatar, file_name: source.chatId };
        const abort = new AbortController();
        const timer = globalThis.setTimeout(() => abort.abort(), 15000);
        try {
            const response = await fetch(endpoint, { method: 'POST', headers: getRequestHeaders(),
                cache: 'no-store', body: JSON.stringify(body), signal: abort.signal });
            if (!response.ok) {throw new Error('messages_chat_read_failed');}
            const data: unknown = await response.json();
            if (!Array.isArray(data)) {throw new Error('messages_chat_read_invalid');}
            return data.filter(item => item && typeof item === 'object' && typeof item.mes === 'string') as ChatMessage[];
        } finally {globalThis.clearTimeout(timer);}
    }

    const port: MessagesChatPort = {
        identity,
        messages: () => context().chat ?? [],
        finalizedThrough: getStorySummaryCommittedThrough,
        async confirm(expected, marker, text) {
            if (identity() !== expected) {return false;}
            const remote = await readRemote(context());
            const matches = remote.filter(message => projectionMarker(message)?.segmentId === marker.segmentId);
            return matches.length === 1 && matches[0].mes === text && same(projectionMarker(matches[0]), marker);
        },
        async publish(input) {
            const source = context();
            const before = structuredClone(source.chat);
            const remote = await readRemote(source);
            const retry = attempts.get(input.marker.segmentId);
            const current = () => identity() === input.identity && context().chat === source.chat
                && input.guard() && !isGenerating() && !isChatSaving;
            if (!current() || !same(source.chat, before)) {throw new Error('messages_boundary_changed');}
            // Never replace a chat which another device or an unsaved native edit has changed.
            if (!same(remote, before) && !(retry && same(remote, retry.before) && same(before, retry.after))) {
                throw new Error('messages_chat_diverged');
            }
            writing = { index: input.index ?? source.chat.length, text: input.text, segmentId: input.marker.segmentId };
            try {
                const extra = { swipeable: false, isSmallSys: false, api: 'manual', model: '私人信息', gen_id: Date.now(),
                    [PRIVATE_MESSAGE_MARKER]: input.marker };
                const index = input.index ?? source.chat.length;
                let message: ChatMessage;
                if (input.index === null) {
                    message = { name: '私人信息', is_user: false, is_system: false,
                        force_avatar: default_avatar, original_avatar: default_avatar,
                        send_date: getMessageTimeStamp(), mes: input.text, extra, swipe_id: 0,
                        swipes: [input.text], swipe_info: [{ send_date: getMessageTimeStamp(), gen_started: null, gen_finished: null, extra: structuredClone(extra) }] };
                    source.chat.push(message);
                } else {
                    message = source.chat[index];
                    if (!message || index !== source.chat.length - 1
                        || index <= getStorySummaryCommittedThrough()
                        || projectionMarker(message)?.segmentId !== input.marker.segmentId) {throw new Error('messages_projection_closed');}
                    message.mes = input.text;
                    message.extra = { ...message.extra, ...extra };
                    message.swipes = [input.text]; message.swipe_id = 0;
                    message.swipe_info = [{ send_date: message.send_date, gen_started: null, gen_finished: null, extra: structuredClone(message.extra) }];
                }
                source.chatMetadata.tainted = true;
                attempts.set(input.marker.segmentId, { before: retry?.before ?? before, after: structuredClone(source.chat) });
                if (input.index === null) {
                    await source.eventSource.emit(event_types.MESSAGE_RECEIVED, index, 'command');
                    if (!current()) {return false;}
                    addOneMessage(message as never);
                    await source.eventSource.emit(event_types.CHARACTER_MESSAGE_RENDERED, index, 'command');
                } else {
                    await source.eventSource.emit(event_types.MESSAGE_EDITED, index);
                    if (!current()) {return false;}
                    updateMessageBlock(index, message as never);
                    await source.eventSource.emit(event_types.MESSAGE_UPDATED, index);
                }
                if (!current() || source.chat[index] !== message || message.mes !== input.text) {return false;}
                // Direct native saves bind their request body before their first await. The
                // conditional helper waits first and can otherwise save a newly selected chat.
                if (source.groupId) {await saveGroupChat(source.groupId, false);}
                else {await saveChat({ chatName: source.chatId });}
                const saved = await readRemote(source);
                const matches = saved.filter(item => projectionMarker(item)?.segmentId === input.marker.segmentId);
                const confirmed = matches.length === 1 && matches[0].mes === input.text && same(projectionMarker(matches[0]), input.marker);
                if (confirmed) {attempts.delete(input.marker.segmentId);}
                return confirmed;
            } finally {writing = null;}
        },
    };

    function subscribe(onChange: () => void, render: () => void): () => void {
        const events = createModuleEvents('xiaobaiOsMessages');
        const changed = (index: unknown) => {
            const current = writing && context().chat[writing.index];
            const ownEvent = writing && Number(index) === writing.index && current?.mes === writing.text
                && projectionMarker(current)?.segmentId === writing.segmentId;
            if (!ownEvent) {onChange();}
        };
        for (const event of [event_types.MESSAGE_RECEIVED, event_types.MESSAGE_SENT, event_types.MESSAGE_EDITED,
            event_types.MESSAGE_UPDATED, event_types.MESSAGE_DELETED, event_types.MESSAGE_SWIPED]) {events.on(event, changed);}
        events.on(event_types.CHARACTER_MESSAGE_RENDERED, render);
        events.on(event_types.MESSAGE_UPDATED, render);
        events.on(event_types.CHAT_CHANGED, () => {attempts.clear(); render();});
        events.on(event_types.MORE_MESSAGES_LOADED, render);
        return () => {events.cleanup(); attempts.clear();};
    }
    return { port, subscribe };
}
