import { extension_settings, getContext } from '../../../../../../extensions.js';
import {
    default_avatar,
    default_user_avatar,
    getRequestHeaders,
    saveSettings as saveSillyTavernSettings,
} from '../../../../../../../script.js';
import { EXT_ID } from '../../../core/constants.js';
import type {
    FourthWallCapturedCommentary,
    FourthWallChatSnapshot,
    FourthWallCommentaryKind,
    XiaobaiOsChatIdentity,
    XiaobaiOsChatIdentityInput,
} from '../apps/fourth-wall/types.js';
import type { XiaobaiOsChatAdapter, XiaobaiOsChatSaveTransaction } from './chat-metadata-repository.js';
import type { XiaobaiOsSettingsAdapter } from './settings-repository.js';

type UnknownRecord = Record<string, unknown>;
const CHAT_READBACK_TIMEOUT_MS = 15_000;
const HOST_SAVE_TIMEOUT_MS = 15_000;

interface SillyTavernMessage {
    name?: unknown;
    is_user?: boolean;
    mes?: unknown;
}

interface SillyTavernContext {
    chatId?: unknown;
    groupId?: unknown;
    characterId?: unknown;
    characters?: Record<string, { avatar?: unknown; name?: unknown }>;
    user_avatar?: unknown;
    persona?: { avatar?: unknown };
    name1?: unknown;
    name2?: unknown;
    chat?: SillyTavernMessage[];
    chatMetadata?: unknown;
    saveMetadata?: () => Promise<void> | void;
}

interface PersistedChatHeader {
    chat_metadata?: unknown;
}

interface XiaobaiOsSaveError extends Error {
    code: 'CHAT_CHANGED' | 'SAVE_UNAVAILABLE' | 'SAVE_UNCONFIRMED';
    uncertain?: boolean;
    cause?: unknown;
    saveError?: unknown;
}

export interface CommentaryEventInput {
    kind?: string;
    chatId?: unknown;
    messageId?: unknown;
    data?: unknown;
}

export interface XiaobaiOsShellSnapshot {
    theme: 'light' | 'dark';
    chat: null | {
        identity: string;
        characterName: string;
        characterAvatar: string;
        userAvatar: string;
    };
}

function isRecord(value: unknown): value is UnknownRecord {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function getSillyTavernContext(): SillyTavernContext {
    return getContext() as unknown as SillyTavernContext;
}

function captureIdentity(context: SillyTavernContext = getSillyTavernContext()): XiaobaiOsChatIdentity | null {
    const chatId = typeof context?.chatId === 'string' ? context.chatId : '';
    if (!chatId) {
        return null;
    }
    const groupId = context.groupId === null || context.groupId === undefined ? '' : String(context.groupId);
    const characterId =
        context.characterId === null || context.characterId === undefined ? '' : String(context.characterId);
    const kind = groupId ? 'group' : 'character';
    const ownerId = groupId || characterId;
    return Object.freeze({
        key: `${kind}:${ownerId}:${chatId}`,
        kind,
        ownerId,
        chatId,
    });
}

function sameIdentity(left: XiaobaiOsChatIdentityInput | null, right: XiaobaiOsChatIdentityInput | null): boolean {
    if (typeof left === 'string' || typeof right === 'string') {
        return left === right;
    }
    return !!left && !!right && left.key === right.key;
}

function createSaveError(
    code: XiaobaiOsSaveError['code'],
    message: string,
    { cause, saveError, uncertain = false }: { cause?: unknown; saveError?: unknown; uncertain?: boolean } = {},
): XiaobaiOsSaveError {
    const error = new Error(message) as XiaobaiOsSaveError;
    error.code = code;
    if (cause !== undefined) {
        error.cause = cause;
    }
    if (saveError !== undefined) {
        error.saveError = saveError;
    }
    if (uncertain) {
        error.uncertain = true;
    }
    return error;
}

async function waitForHostSave(save: () => Promise<void> | void): Promise<void> {
    let timeout: number | undefined;
    const timedOut = new Promise<never>((_resolve, reject) => {
        timeout = window.setTimeout(() => reject(new Error('等待 SillyTavern 保存聊天超时')), HOST_SAVE_TIMEOUT_MS);
    });
    try {
        await Promise.race([Promise.resolve().then(save), timedOut]);
    } finally {
        if (timeout !== undefined) {
            window.clearTimeout(timeout);
        }
    }
}

function getPersistedXiaobaiOs(value: unknown): unknown {
    if (!isRecord(value)) {
        return undefined;
    }
    const extensions = value.extensions;
    if (!isRecord(extensions)) {
        return undefined;
    }
    const littleWhiteBox = extensions.LittleWhiteBox;
    return isRecord(littleWhiteBox) ? littleWhiteBox.xiaobaiOs : undefined;
}

async function readPersistedChat(
    context: SillyTavernContext,
    identity: XiaobaiOsChatIdentity,
): Promise<PersistedChatHeader[]> {
    let endpoint: string;
    let body: UnknownRecord;
    if (identity.kind === 'group') {
        endpoint = '/api/chats/group/get';
        body = { id: identity.chatId };
    } else {
        const character = context.characters?.[identity.ownerId];
        const avatar = typeof character?.avatar === 'string' ? character.avatar : '';
        if (!character || !avatar) {
            throw createSaveError('SAVE_UNAVAILABLE', '当前角色聊天缺少可读回的持久化标识');
        }
        endpoint = '/api/chats/get';
        body = {
            ch_name: String(character.name || ''),
            file_name: identity.chatId,
            avatar_url: avatar,
        };
    }
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), CHAT_READBACK_TIMEOUT_MS);
    let response: Response;
    try {
        response = await fetch(endpoint, {
            method: 'POST',
            headers: getRequestHeaders(),
            body: JSON.stringify(body),
            cache: 'no-cache',
            signal: controller.signal,
        });
    } finally {
        window.clearTimeout(timeout);
    }
    if (!response.ok) {
        throw new Error(`聊天数据读回失败（HTTP ${response.status}）`);
    }
    const persisted: unknown = await response.json();
    if (!Array.isArray(persisted) || !isRecord(persisted[0])) {
        throw new Error('聊天数据读回格式无效');
    }
    return persisted as PersistedChatHeader[];
}

async function readPersistedSettings(): Promise<unknown> {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), CHAT_READBACK_TIMEOUT_MS);
    try {
        const response = await fetch('/api/settings/get', {
            method: 'POST',
            headers: getRequestHeaders(),
            body: JSON.stringify({}),
            cache: 'no-cache',
            signal: controller.signal,
        });
        if (!response.ok) {
            throw new Error(`设置读回失败（HTTP ${response.status}）`);
        }
        return await response.json();
    } finally {
        window.clearTimeout(timeout);
    }
}

function resolveCharacterAvatar(context: SillyTavernContext): string {
    const characterId =
        context.characterId === null || context.characterId === undefined ? '' : String(context.characterId);
    const character = context.characters?.[characterId];
    const avatar = typeof character?.avatar === 'string' ? character.avatar : '';
    if (!avatar) {
        return '';
    }
    if (/^(?:data:|blob:|https?:|\/)/i.test(avatar)) {
        return avatar;
    }
    return `/characters/${avatar
        .split('/')
        .map((segment) => encodeURIComponent(segment))
        .join('/')}`;
}

function resolveAssetUrl(path: unknown, prefix = ''): string {
    const value = String(path || '');
    if (!value) {
        return '';
    }
    if (/^(?:data:|blob:|https?:|\/)/i.test(value)) {
        return value;
    }
    const normalized = value.includes('/') || !prefix ? value : `${prefix}/${value}`;
    return `/${normalized
        .split('/')
        .map((segment) => encodeURIComponent(segment))
        .join('/')}`;
}

function resolveUserAvatar(context: SillyTavernContext): string {
    const avatar = context?.user_avatar || context?.persona?.avatar || default_user_avatar || '';
    return resolveAssetUrl(avatar, 'User Avatars');
}

function normalizeMessageIndex(event: unknown, context: SillyTavernContext): number {
    const direct = isRecord(event) ? (event.messageId ?? event.id ?? event.index) : event;
    const parsed = Number(direct);
    if (Number.isInteger(parsed) && parsed >= 0) {
        return parsed;
    }
    return context?.chat?.length ? context.chat.length - 1 : -1;
}

export function createSillyTavernSettingsAdapter(): XiaobaiOsSettingsAdapter {
    const settingsRoot = extension_settings as unknown as Record<string, UnknownRecord | undefined>;
    return {
        getExtensionSettings() {
            settingsRoot[EXT_ID] ||= {};
            return settingsRoot[EXT_ID];
        },
        async saveSettings() {
            const expected = JSON.stringify(settingsRoot[EXT_ID]?.xiaobaiOs);
            let saveError: unknown;
            try {
                await waitForHostSave(saveSillyTavernSettings);
            } catch (error) {
                saveError = error;
            }
            try {
                const payload = await readPersistedSettings();
                const settings = isRecord(payload) && typeof payload.settings === 'string' ? payload.settings : '';
                const persisted: unknown = settings ? JSON.parse(settings) : null;
                const persistedSettings =
                    isRecord(persisted) && isRecord(persisted.extension_settings) ? persisted.extension_settings : null;
                const persistedExtension =
                    persistedSettings && isRecord(persistedSettings[EXT_ID]) ? persistedSettings[EXT_ID] : null;
                if (JSON.stringify(persistedExtension?.xiaobaiOs) !== expected) {
                    throw new Error('服务端设置不包含本次小白 OS 修改');
                }
            } catch (cause) {
                throw createSaveError('SAVE_UNCONFIRMED', '无法确认小白 OS 设置已经保存', {
                    cause,
                    saveError,
                    uncertain: true,
                });
            }
        },
    };
}

export function createSillyTavernChatAdapter(): XiaobaiOsChatAdapter {
    return {
        getChatIdentity() {
            return captureIdentity();
        },
        getChatMetadata(identity) {
            const context = getSillyTavernContext();
            return sameIdentity(identity, captureIdentity(context)) && isRecord(context.chatMetadata)
                ? context.chatMetadata
                : null;
        },
        async saveChatMetadata({ identity, metadata, xiaobaiOs }: XiaobaiOsChatSaveTransaction) {
            const context = getSillyTavernContext();
            const capturedIdentity = captureIdentity(context);
            if (!capturedIdentity || !sameIdentity(identity, capturedIdentity) || context.chatMetadata !== metadata) {
                throw createSaveError('CHAT_CHANGED', '保存前聊天已经切换');
            }
            if (typeof context.saveMetadata !== 'function') {
                throw createSaveError('SAVE_UNAVAILABLE', '当前聊天不提供元数据保存能力');
            }
            let saveError: unknown;
            try {
                await waitForHostSave(() => context.saveMetadata?.());
            } catch (error) {
                saveError = error;
            }
            if (!sameIdentity(capturedIdentity, captureIdentity())) {
                throw createSaveError('CHAT_CHANGED', '保存期间聊天已经切换');
            }
            try {
                const persisted = await readPersistedChat(context, capturedIdentity);
                const actual = getPersistedXiaobaiOs(persisted[0].chat_metadata);
                if (JSON.stringify(actual) !== JSON.stringify(xiaobaiOs)) {
                    throw new Error('服务端聊天不包含本次小白 OS 修改');
                }
            } catch (cause) {
                throw createSaveError('SAVE_UNCONFIRMED', '无法确认四次元壁数据已经保存', {
                    cause,
                    saveError,
                    uncertain: true,
                });
            }
        },
    };
}

export function getSillyTavernChatIdentity(): XiaobaiOsChatIdentity | null {
    return captureIdentity();
}

export function getSillyTavernChatSnapshot(): FourthWallChatSnapshot | null {
    const context = getSillyTavernContext();
    const identity = captureIdentity(context);
    if (!identity) {
        return null;
    }
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

export function captureSillyTavernCommentaryEvent(
    event: CommentaryEventInput = {},
): FourthWallCapturedCommentary | null {
    const context = getSillyTavernContext();
    const identity = captureIdentity(context);
    if (!identity) {
        return null;
    }
    if (event.chatId && String(event.chatId) !== identity.chatId) {
        return null;
    }
    const messageIndex = normalizeMessageIndex(event.data ?? event.messageId, context);
    const message = context.chat?.[messageIndex];
    if (!message || !String(message.mes || '').trim()) {
        return null;
    }
    let kind = String(event.kind || '') as FourthWallCommentaryKind | 'edited';
    if (kind === 'edited') {
        kind = message.is_user ? 'edit_own' : 'edit_ai';
    }
    if (kind !== 'ai_message' && kind !== 'edit_own' && kind !== 'edit_ai') {
        return null;
    }
    if (kind === 'ai_message' && message.is_user) {
        return null;
    }
    return {
        chatIdentity: identity.key,
        messageIndex,
        text: String(message.mes),
        kind,
        chatSnapshot: getSillyTavernChatSnapshot() as FourthWallChatSnapshot,
    };
}

export function getSillyTavernAfterAiHint(data: unknown, source: string): { chatId: string; messageId: number } | null {
    const context = getSillyTavernContext();
    const identity = captureIdentity(context);
    if (!identity || !context.chat?.length) {
        return null;
    }
    const direct =
        source === 'generation_ended'
            ? context.chat.length - 1
            : isRecord(data)
              ? (data.messageId ?? data.id ?? data.index)
              : data;
    const messageId = Number(direct);
    if (!Number.isInteger(messageId) || messageId < 0 || context.chat[messageId]?.is_user) {
        return null;
    }
    return { chatId: identity.chatId, messageId };
}

export function getSillyTavernShellSnapshot(): XiaobaiOsShellSnapshot {
    const context = getSillyTavernContext();
    const identity = captureIdentity(context);
    const classNames = `${document.documentElement?.className || ''} ${document.body?.className || ''}`.toLowerCase();
    const theme = /(?:^|\s)(?:theme-dark|dark-theme|dark|neo-dark)(?:\s|$)/.test(classNames) ? 'dark' : 'light';
    return {
        theme,
        chat: identity
            ? {
                  identity: identity.key,
                  characterName: String(context.name2 || ''),
                  characterAvatar: resolveCharacterAvatar(context),
                  userAvatar: resolveUserAvatar(context),
              }
            : null,
    };
}
