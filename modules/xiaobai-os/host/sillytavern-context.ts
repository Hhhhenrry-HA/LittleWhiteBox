import { extension_settings, getContext } from '../../../../../../extensions.js';
import { default_user_avatar, getRequestHeaders, saveSettingsDebounced } from '../../../../../../../script.js';
import { EXT_ID } from '../../../core/constants.js';
import type { XiaobaiOsChatIdentity, XiaobaiOsChatIdentityInput } from '../types.js';
import type {
    XiaobaiOsChatAdapter,
    XiaobaiOsChatSaveTransaction,
} from './chat-data-store.js';
import { jsonValuesEqual } from './json-values-equal.js';
import { countAssistantTurns } from './assistant-turn-count.js';
import type { XiaobaiOsSettingsAdapter } from './settings-repository.js';

type UnknownRecord = Record<string, unknown>;
const CHAT_READBACK_TIMEOUT_MS = 15_000;
const HOST_SAVE_TIMEOUT_MS = 15_000;
const DARK_THEME_CLASSES = new Set(['dark', 'dark-theme', 'theme-dark', 'neo-dark']);
const LIGHT_THEME_CLASSES = new Set(['light', 'light-theme', 'theme-light', 'neo-light']);

interface SillyTavernMessage {
    name?: unknown;
    is_user?: boolean;
    is_system?: boolean;
    mes?: unknown;
    extra?: unknown;
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

interface PersistedChatHeader extends SillyTavernMessage {
    chat_metadata?: unknown;
}

interface XiaobaiOsSaveError extends Error {
    code: 'CHAT_CHANGED' | 'SAVE_UNAVAILABLE' | 'SAVE_UNCONFIRMED';
    uncertain?: boolean;
    cause?: unknown;
    saveError?: unknown;
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

export interface XiaobaiOsChatSurface {
    identityKey: string;
    messages: unknown[];
    playerName: string;
    assistantName: string;
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

function explicitDocumentTheme(): XiaobaiOsShellSnapshot['theme'] | null {
    for (const element of [document.documentElement, document.body]) {
        if (!element) {continue;}
        const dataTheme = String(element.getAttribute('data-theme') || '').trim().toLowerCase();
        if (DARK_THEME_CLASSES.has(dataTheme) || dataTheme === 'dark') {return 'dark';}
        if (LIGHT_THEME_CLASSES.has(dataTheme) || dataTheme === 'light') {return 'light';}
        const classes = Array.from(element.classList, value => value.toLowerCase());
        if (classes.some(value => DARK_THEME_CLASSES.has(value))) {return 'dark';}
        if (classes.some(value => LIGHT_THEME_CLASSES.has(value))) {return 'light';}
    }
    return null;
}

function parseRgbColor(value: string): [number, number, number] | null {
    const normalized = value.trim().toLowerCase();
    const hex = normalized.match(/^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/u)?.[1];
    if (hex) {
        const expanded = hex.length <= 4
            ? Array.from(hex, character => `${character}${character}`).join('')
            : hex;
        if (expanded.length === 8 && Number.parseInt(expanded.slice(6), 16) === 0) {return null;}
        return [0, 2, 4].map(offset => Number.parseInt(expanded.slice(offset, offset + 2), 16)) as [number, number, number];
    }
    const rgb = normalized.match(/^rgba?\((.*)\)$/u)?.[1];
    if (!rgb) {return null;}
    const components = rgb.replaceAll(',', ' ').replace('/', ' / ').split(/\s+/u).filter(Boolean);
    const separator = components.indexOf('/');
    const colorComponents = separator < 0 ? components.slice(0, 3) : components.slice(0, separator);
    if (colorComponents.length !== 3) {return null;}
    if (separator >= 0) {
        const alpha = components[separator + 1] || '';
        const alphaValue = alpha.endsWith('%') ? Number.parseFloat(alpha) / 100 : Number.parseFloat(alpha);
        if (Number.isFinite(alphaValue) && alphaValue === 0) {return null;}
    } else if (components.length === 4 && Number.parseFloat(components[3]) === 0) {
        return null;
    }
    const channels = colorComponents.map(component => {
        const channel = Number.parseFloat(component);
        return component.endsWith('%') ? channel * 2.55 : channel;
    });
    return channels.every(Number.isFinite)
        ? channels.map(channel => Math.max(0, Math.min(255, channel))) as [number, number, number]
        : null;
}

function themeFromColor(value: string): XiaobaiOsShellSnapshot['theme'] | null {
    const channels = parseRgbColor(value);
    if (!channels) {return null;}
    const luminance = channels
        .map(channel => channel / 255)
        .map(channel => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
        .reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0);
    return luminance > 0.4 ? 'light' : 'dark';
}

function resolveDocumentTheme(): XiaobaiOsShellSnapshot['theme'] {
    const explicit = explicitDocumentTheme();
    if (explicit) {return explicit;}
    const rootStyle = getComputedStyle(document.documentElement);
    for (const value of [
        rootStyle.getPropertyValue('--SmartThemeChatTintColor'),
        rootStyle.getPropertyValue('--SmartThemeBlurTintColor'),
        document.body ? getComputedStyle(document.body).backgroundColor : '',
        rootStyle.backgroundColor,
    ]) {
        const theme = themeFromColor(value);
        if (theme) {return theme;}
    }
    return 'dark';
}

export function createSillyTavernSettingsAdapter(): XiaobaiOsSettingsAdapter {
    const settingsRoot = extension_settings as unknown as Record<string, UnknownRecord | undefined>;
    return {
        getExtensionSettings() {
            settingsRoot[EXT_ID] ||= {};
            return settingsRoot[EXT_ID];
        },
        saveSettings() {
            saveSettingsDebounced();
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
            try {
                const persisted = await readPersistedChat(context, capturedIdentity);
                const actual = getPersistedXiaobaiOs(persisted[0].chat_metadata);
                if (!jsonValuesEqual(actual, xiaobaiOs)) {
                    throw new Error('服务端聊天不包含本次小白 OS 修改');
                }
            } catch (cause) {
                throw createSaveError('SAVE_UNCONFIRMED', '无法确认小白 OS 聊天数据已经保存', {
                    cause,
                    saveError,
                    uncertain: true,
                });
            }
        },
        async readPersistedXiaobaiOs(identity) {
            const context = getSillyTavernContext();
            const capturedIdentity = captureIdentity(context);
            if (!capturedIdentity || !sameIdentity(identity, capturedIdentity)) {
                throw createSaveError('CHAT_CHANGED', '读取前聊天已经切换');
            }
            const persisted = await readPersistedChat(context, capturedIdentity);
            return structuredClone(getPersistedXiaobaiOs(persisted[0].chat_metadata));
        },
    };
}

export function getSillyTavernChatSurface(): XiaobaiOsChatSurface | null {
    const context = getSillyTavernContext();
    const identity = captureIdentity(context);
    if (!identity) {return null;}
    return {
        identityKey: identity.key,
        messages: context.chat || [],
        playerName: String(context.name1 || 'User').trim() || 'User',
        assistantName: String(context.name2 || 'Assistant').trim() || 'Assistant',
    };
}

export function getSillyTavernAssistantTurnCount(expectedIdentityKey?: string): number {
    const context = getSillyTavernContext();
    const identity = captureIdentity(context);
    if (!identity || (expectedIdentityKey && identity.key !== expectedIdentityKey)) {
        throw createSaveError('CHAT_CHANGED', '读取回合数前聊天已经切换');
    }
    return countAssistantTurns(context.chat || []);
}

export function getSillyTavernChatIdentity(): XiaobaiOsChatIdentity | null {
    return captureIdentity();
}

export function getSillyTavernShellSnapshot(): XiaobaiOsShellSnapshot {
    const context = getSillyTavernContext();
    const identity = captureIdentity(context);
    return {
        theme: resolveDocumentTheme(),
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
