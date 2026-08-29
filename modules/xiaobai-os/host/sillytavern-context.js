import { extension_settings, getContext } from '../../../../../../extensions.js';
import {
    default_avatar,
    default_user_avatar,
    getRequestHeaders,
    saveSettings as saveSillyTavernSettings,
} from '../../../../../../../script.js';
import { EXT_ID } from '../../../core/constants.js';

function isRecord(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function captureIdentity(context = getContext()) {
    const chatId = typeof context?.chatId === 'string' ? context.chatId : '';
    if (!chatId) return null;
    const groupId = context.groupId == null ? '' : String(context.groupId);
    const characterId = context.characterId == null ? '' : String(context.characterId);
    const kind = groupId ? 'group' : 'character';
    const ownerId = groupId || characterId;
    return Object.freeze({
        key: `${kind}:${ownerId}:${chatId}`,
        kind,
        ownerId,
        chatId,
    });
}

function sameIdentity(left, right) {
    return !!left && !!right && left.key === right.key;
}

function resolveCharacterAvatar(context) {
    const character = context?.characters?.[context.characterId];
    const avatar = typeof character?.avatar === 'string' ? character.avatar : '';
    if (!avatar) return '';
    if (/^(?:data:|blob:|https?:|\/)/i.test(avatar)) return avatar;
    return `/characters/${avatar.split('/').map(segment => encodeURIComponent(segment)).join('/')}`;
}

function resolveAssetUrl(path, prefix = '') {
    const value = String(path || '');
    if (!value) return '';
    if (/^(?:data:|blob:|https?:|\/)/i.test(value)) return value;
    const normalized = value.includes('/') || !prefix ? value : `${prefix}/${value}`;
    return `/${normalized.split('/').map(segment => encodeURIComponent(segment)).join('/')}`;
}

function resolveUserAvatar(context) {
    const avatar = context?.user_avatar || context?.persona?.avatar || default_user_avatar || '';
    return resolveAssetUrl(avatar, 'User Avatars');
}

function normalizeMessageIndex(event, context) {
    const direct = typeof event === 'object' && event !== null
        ? event.messageId ?? event.id ?? event.index
        : event;
    const parsed = Number(direct);
    if (Number.isInteger(parsed) && parsed >= 0) return parsed;
    return context?.chat?.length ? context.chat.length - 1 : -1;
}

export function createSillyTavernSettingsAdapter() {
    return {
        getExtensionSettings() {
            extension_settings[EXT_ID] ||= {};
            return extension_settings[EXT_ID];
        },
        async saveSettings() {
            const expected = JSON.stringify(extension_settings[EXT_ID]?.xiaobaiOs);
            await saveSillyTavernSettings();
            const response = await fetch('/api/settings/get', {
                method: 'POST',
                headers: getRequestHeaders(),
                body: JSON.stringify({}),
                cache: 'no-cache',
            });
            if (!response.ok) throw new Error('xiaobai_os_settings_verification_failed');
            const payload = await response.json();
            const persisted = payload?.settings ? JSON.parse(payload.settings) : null;
            if (JSON.stringify(persisted?.extension_settings?.[EXT_ID]?.xiaobaiOs) !== expected) {
                throw new Error('xiaobai_os_settings_save_failed');
            }
        },
    };
}

export function createSillyTavernChatAdapter() {
    return {
        getChatIdentity() {
            return captureIdentity();
        },
        getChatMetadata(identity) {
            const context = getContext();
            return sameIdentity(identity, captureIdentity(context)) && isRecord(context.chatMetadata)
                ? context.chatMetadata
                : null;
        },
        async saveChatMetadata({ identity, metadata }) {
            const context = getContext();
            if (!sameIdentity(identity, captureIdentity(context)) || context.chatMetadata !== metadata) {
                const error = new Error('chat_changed_before_metadata_save');
                error.code = 'CHAT_CHANGED';
                throw error;
            }
            if (typeof context.saveMetadata !== 'function') {
                const error = new Error('chat_metadata_save_unavailable');
                error.code = 'SAVE_UNAVAILABLE';
                throw error;
            }
            await context.saveMetadata();
        },
    };
}

export function getSillyTavernChatIdentity() {
    return captureIdentity();
}

export function getSillyTavernChatSnapshot() {
    const context = getContext();
    const identity = captureIdentity(context);
    if (!identity) return null;
    return {
        chatIdentity: identity.key,
        userName: String(context.name1 || 'User'),
        characterName: String(context.name2 || 'Assistant'),
        userAvatar: resolveUserAvatar(context),
        characterAvatar: resolveCharacterAvatar(context) || resolveAssetUrl(default_avatar, 'characters'),
        messages: (context.chat || []).map((message, index) => ({
            index,
            name: String(message?.name || (message?.is_user ? context.name1 : context.name2) || ''),
            isUser: message?.is_user === true,
            text: String(message?.mes || ''),
        })),
    };
}

export function captureSillyTavernCommentaryEvent(event = {}) {
    const context = getContext();
    const identity = captureIdentity(context);
    if (!identity) return null;
    if (event.chatId && String(event.chatId) !== identity.chatId) return null;
    const messageIndex = normalizeMessageIndex(event.data ?? event.messageId, context);
    const message = context.chat?.[messageIndex];
    if (!message || !String(message.mes || '').trim()) return null;
    let kind = String(event.kind || '');
    if (kind === 'edited') kind = message.is_user ? 'edit_own' : 'edit_ai';
    if (!['ai_message', 'edit_own', 'edit_ai'].includes(kind)) return null;
    if (kind === 'ai_message' && message.is_user) return null;
    return {
        chatIdentity: identity.key,
        messageIndex,
        text: String(message.mes),
        kind,
        chatSnapshot: getSillyTavernChatSnapshot(),
    };
}

export function getSillyTavernAfterAiHint(data, source) {
    const context = getContext();
    const identity = captureIdentity(context);
    if (!identity || !context.chat?.length) return null;
    const direct = source === 'generation_ended'
        ? context.chat.length - 1
        : (typeof data === 'object' && data !== null ? data.messageId ?? data.id ?? data.index : data);
    const messageId = Number(direct);
    if (!Number.isInteger(messageId) || messageId < 0 || context.chat[messageId]?.is_user) return null;
    return { chatId: identity.chatId, messageId };
}

export function getSillyTavernShellSnapshot() {
    const context = getContext();
    const identity = captureIdentity(context);
    const classNames = `${document.documentElement?.className || ''} ${document.body?.className || ''}`.toLowerCase();
    const theme = /(?:^|\s)(?:theme-dark|dark-theme|dark|neo-dark)(?:\s|$)/.test(classNames)
        ? 'dark'
        : 'light';
    return {
        theme,
        chat: identity ? {
            identity: identity.key,
            characterName: String(context.name2 || ''),
            characterAvatar: resolveCharacterAvatar(context),
            userAvatar: resolveUserAvatar(context),
        } : null,
    };
}
