import {
    createDefaultFourthWallChatState,
    createDefaultFourthWallGlobalSettings,
} from '../apps/fourth-wall/domain/defaults.js';
import type {
    FourthWallChatState,
    FourthWallGlobalSettings,
    FourthWallMessageData,
} from '../apps/fourth-wall/types.js';
import type {
    XiaobaiOsChatData as XiaobaiOsChatDataRoot,
    XiaobaiOsSettings as XiaobaiOsSettingsRoot,
} from '../types.js';

type XiaobaiOsSettings = XiaobaiOsSettingsRoot<{ fourthWall: FourthWallGlobalSettings }>;
type XiaobaiOsChatData = XiaobaiOsChatDataRoot<
    { fourthWall?: FourthWallChatState; [appId: string]: unknown },
    Record<string, unknown>
>;

type UnknownRecord = Record<string, unknown>;

export const XIAOBAI_OS_SETTINGS_SCHEMA_VERSION = 1 as const;
export const XIAOBAI_OS_CHAT_SCHEMA_VERSION = 2 as const;

export const LEGACY_FOURTH_WALL_SETTING_KEYS = Object.freeze([
    'fourthWall',
    'fourthWallImage',
    'fourthWallVoice',
    'fourthWallCommentary',
    'fourthWallPromptTemplates',
    'dynamicPrompt',
] as const);

export type LegacyFourthWallSettingKey = (typeof LEGACY_FOURTH_WALL_SETTING_KEYS)[number];

export class XiaobaiOsDataError extends Error {
    readonly code: string;
    readonly path: string;

    constructor(code: string, message: string, path = '') {
        super(message);
        this.name = 'XiaobaiOsDataError';
        this.code = code;
        this.path = path;
    }
}

function isRecord(value: unknown): value is UnknownRecord {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function clone<T>(value: T): T {
    return structuredClone(value);
}

function fail(code: string, path: string, expectation: string): never {
    throw new XiaobaiOsDataError(code, `${path} ${expectation}`, path);
}

function requireRecord(value: unknown, path: string, code = 'INVALID_CURRENT_DATA'): UnknownRecord {
    if (!isRecord(value)) {
        fail(code, path, 'must be an object');
    }
    return value;
}

function requireBoolean(value: unknown, path: string, code = 'INVALID_CURRENT_DATA'): boolean {
    if (typeof value !== 'boolean') {
        fail(code, path, 'must be a boolean');
    }
    return value;
}

function requireString(value: unknown, path: string, code = 'INVALID_CURRENT_DATA'): string {
    if (typeof value !== 'string') {
        fail(code, path, 'must be a string');
    }
    return value;
}

function requireInteger(value: unknown, path: string, min: number, max: number, code = 'INVALID_CURRENT_DATA'): number {
    if (typeof value !== 'number' || !Number.isInteger(value) || value < min || value > max) {
        fail(code, path, `must be an integer from ${min} to ${max}`);
    }
    return value;
}

function requireFiniteNumber(value: unknown, path: string, code = 'INVALID_CURRENT_DATA'): number {
    if (typeof value !== 'number' || !Number.isFinite(value)) {
        fail(code, path, 'must be a finite number');
    }
    return value;
}

function legacyBoolean(value: unknown, fallback: boolean, path: string): boolean {
    if (value === undefined) {
        return fallback;
    }
    return requireBoolean(value, path, 'INVALID_LEGACY_DATA');
}

function legacyString(value: unknown, fallback: string, path: string): string {
    if (value === undefined) {
        return fallback;
    }
    return requireString(value, path, 'INVALID_LEGACY_DATA');
}

function legacyInteger(value: unknown, fallback: number, path: string, min: number, max: number): number {
    if (value === undefined) {
        return fallback;
    }
    return requireInteger(value, path, min, max, 'INVALID_LEGACY_DATA');
}

function validatePromptTemplates(value: unknown, path: string, code = 'INVALID_CURRENT_DATA'): void {
    const templates = requireRecord(value, path, code);
    requireString(templates.topuser, `${path}.topuser`, code);
    requireString(templates.confirm, `${path}.confirm`, code);
    requireString(templates.metaProtocol, `${path}.metaProtocol`, code);
    requireString(templates.bottom, `${path}.bottom`, code);
}

function validateFourthWallGlobalSettings(value: unknown, path: string): asserts value is FourthWallGlobalSettings {
    const settings = requireRecord(value, path);
    requireBoolean(requireRecord(settings.image, `${path}.image`).enablePrompt, `${path}.image.enablePrompt`);
    requireBoolean(requireRecord(settings.voice, `${path}.voice`).enabled, `${path}.voice.enabled`);
    const commentary = requireRecord(settings.commentary, `${path}.commentary`);
    requireBoolean(commentary.enabled, `${path}.commentary.enabled`);
    requireInteger(commentary.probability, `${path}.commentary.probability`, 1, 99);
    validatePromptTemplates(settings.promptTemplates, `${path}.promptTemplates`);
}

function validateMessage(
    value: unknown,
    path: string,
    code = 'INVALID_CURRENT_DATA',
): asserts value is FourthWallMessageData {
    const message = requireRecord(value, path);
    if (message.role !== 'user' && message.role !== 'ai') {
        fail(code, `${path}.role`, 'must be "user" or "ai"');
    }
    requireString(message.content, `${path}.content`, code);
    if (message.thinking !== undefined) {
        requireString(message.thinking, `${path}.thinking`, code);
    }
    requireFiniteNumber(message.ts, `${path}.ts`, code);
    if (message.type !== undefined) {
        requireString(message.type, `${path}.type`, code);
    }
}

export function validateFourthWallChatState(value: unknown, path: string): asserts value is FourthWallChatState {
    const state = requireRecord(value, path);
    if (Object.hasOwn(state, 'history')) {
        fail('INVALID_CURRENT_DATA', `${path}.history`, 'is a legacy field');
    }

    const settings = requireRecord(state.settings, `${path}.settings`);
    requireInteger(settings.maxChatLayers, `${path}.settings.maxChatLayers`, 1, 9999);
    requireInteger(settings.maxMetaTurns, `${path}.settings.maxMetaTurns`, 1, 9999);
    requireBoolean(settings.stream, `${path}.settings.stream`);
    requireBoolean(settings.disableAssistantPrefill, `${path}.settings.disableAssistantPrefill`);

    if (!Array.isArray(state.sessions) || state.sessions.length === 0) {
        fail('INVALID_CURRENT_DATA', `${path}.sessions`, 'must contain at least one session');
    }
    const ids = new Set();
    state.sessions.forEach((value, index) => {
        const sessionPath = `${path}.sessions[${index}]`;
        const session = requireRecord(value, sessionPath);
        const id = requireString(session.id, `${sessionPath}.id`);
        if (!id || ids.has(id)) {
            fail('INVALID_CURRENT_DATA', `${sessionPath}.id`, 'must be non-empty and unique');
        }
        ids.add(id);
        requireString(session.name, `${sessionPath}.name`);
        if (!Number.isFinite(session.createdAt)) {
            fail('INVALID_CURRENT_DATA', `${sessionPath}.createdAt`, 'must be a finite number');
        }
        if (!Array.isArray(session.history)) {
            fail('INVALID_CURRENT_DATA', `${sessionPath}.history`, 'must be an array');
        }
        session.history.forEach((message, messageIndex) =>
            validateMessage(message, `${sessionPath}.history[${messageIndex}]`),
        );
    });

    const activeSessionId = requireString(state.activeSessionId, `${path}.activeSessionId`);
    if (!ids.has(activeSessionId)) {
        fail('INVALID_CURRENT_DATA', `${path}.activeSessionId`, 'must reference an existing session');
    }
}

export function createDefaultXiaobaiOsSettings(): XiaobaiOsSettings {
    return {
        schemaVersion: XIAOBAI_OS_SETTINGS_SCHEMA_VERSION,
        enabled: false,
        apps: {
            fourthWall: createDefaultFourthWallGlobalSettings(),
        },
    };
}

export function validateXiaobaiOsSettings(value: unknown): value is XiaobaiOsSettings {
    const root = requireRecord(value, 'xiaobaiOs');
    if (root.schemaVersion !== XIAOBAI_OS_SETTINGS_SCHEMA_VERSION) {
        fail('UNSUPPORTED_SETTINGS_VERSION', 'xiaobaiOs.schemaVersion', `must equal ${XIAOBAI_OS_SETTINGS_SCHEMA_VERSION}`);
    }
    requireBoolean(root.enabled, 'xiaobaiOs.enabled');
    const apps = requireRecord(root.apps, 'xiaobaiOs.apps');
    validateFourthWallGlobalSettings(apps.fourthWall, 'xiaobaiOs.apps.fourthWall');
    return true;
}

export function validateXiaobaiOsChatData(value: unknown): value is XiaobaiOsChatData {
    const root = requireRecord(value, 'xiaobaiOs');
    if (root.schemaVersion !== XIAOBAI_OS_CHAT_SCHEMA_VERSION) {
        fail('UNSUPPORTED_CHAT_VERSION', 'xiaobaiOs.schemaVersion', `must equal ${XIAOBAI_OS_CHAT_SCHEMA_VERSION}`);
    }
    requireRecord(root.apps, 'xiaobaiOs.apps');
    requireRecord(root.domains, 'xiaobaiOs.domains');
    return true;
}

export function migrateLegacySettings(extensionSettings: unknown): {
    value: XiaobaiOsSettings;
    legacyKeys: LegacyFourthWallSettingKey[];
} {
    const source = requireRecord(extensionSettings, 'LittleWhiteBox', 'INVALID_LEGACY_DATA');
    const defaults = createDefaultFourthWallGlobalSettings();
    const hasFourthWall = Object.hasOwn(source, 'fourthWall');
    const fourthWall =
        source.fourthWall === undefined
            ? undefined
            : requireRecord(source.fourthWall, 'fourthWall', 'INVALID_LEGACY_DATA');
    const dynamicPrompt =
        source.dynamicPrompt === undefined
            ? undefined
            : requireRecord(source.dynamicPrompt, 'dynamicPrompt', 'INVALID_LEGACY_DATA');
    const image =
        source.fourthWallImage === undefined
            ? {}
            : requireRecord(source.fourthWallImage, 'fourthWallImage', 'INVALID_LEGACY_DATA');
    const voice =
        source.fourthWallVoice === undefined
            ? {}
            : requireRecord(source.fourthWallVoice, 'fourthWallVoice', 'INVALID_LEGACY_DATA');
    const commentary =
        source.fourthWallCommentary === undefined
            ? {}
            : requireRecord(source.fourthWallCommentary, 'fourthWallCommentary', 'INVALID_LEGACY_DATA');
    const templates =
        source.fourthWallPromptTemplates === undefined
            ? {}
            : requireRecord(source.fourthWallPromptTemplates, 'fourthWallPromptTemplates', 'INVALID_LEGACY_DATA');

    const value = {
        schemaVersion: XIAOBAI_OS_SETTINGS_SCHEMA_VERSION,
        enabled: hasFourthWall
            ? legacyBoolean(fourthWall?.enabled, false, 'fourthWall.enabled')
            : legacyBoolean(dynamicPrompt?.enabled, false, 'dynamicPrompt.enabled'),
        apps: {
            fourthWall: {
                image: {
                    enablePrompt: legacyBoolean(image.enablePrompt, false, 'fourthWallImage.enablePrompt'),
                },
                voice: {
                    enabled: legacyBoolean(voice.enabled, false, 'fourthWallVoice.enabled'),
                },
                commentary: {
                    enabled: legacyBoolean(commentary.enabled, false, 'fourthWallCommentary.enabled'),
                    probability: legacyInteger(commentary.probability, 30, 'fourthWallCommentary.probability', 1, 99),
                },
                promptTemplates: {
                    topuser: legacyString(
                        templates.topuser,
                        defaults.promptTemplates.topuser,
                        'fourthWallPromptTemplates.topuser',
                    ),
                    confirm: legacyString(
                        templates.confirm,
                        defaults.promptTemplates.confirm,
                        'fourthWallPromptTemplates.confirm',
                    ),
                    metaProtocol: legacyString(
                        templates.metaProtocol,
                        defaults.promptTemplates.metaProtocol,
                        'fourthWallPromptTemplates.metaProtocol',
                    ),
                    bottom: legacyString(
                        templates.bottom,
                        defaults.promptTemplates.bottom,
                        'fourthWallPromptTemplates.bottom',
                    ),
                },
            },
        },
    };
    validateXiaobaiOsSettings(value);

    return {
        value,
        legacyKeys: LEGACY_FOURTH_WALL_SETTING_KEYS.filter((key) => Object.hasOwn(source, key)),
    };
}

function copyLegacyMessage(value: unknown, path: string): FourthWallMessageData {
    const message = requireRecord(value, path, 'INVALID_LEGACY_DATA');
    if (message.role !== 'user' && message.role !== 'ai') {
        fail('INVALID_LEGACY_DATA', `${path}.role`, 'must be "user" or "ai"');
    }
    const copy: FourthWallMessageData = {
        role: message.role,
        content: requireString(message.content, `${path}.content`, 'INVALID_LEGACY_DATA'),
        ts: requireFiniteNumber(message.ts, `${path}.ts`, 'INVALID_LEGACY_DATA'),
    };
    if (Object.hasOwn(message, 'thinking')) {
        copy.thinking = requireString(message.thinking, `${path}.thinking`, 'INVALID_LEGACY_DATA');
    }
    if (Object.hasOwn(message, 'type')) {
        copy.type = requireString(message.type, `${path}.type`, 'INVALID_LEGACY_DATA');
    }
    return copy;
}

function copyLegacyHistory(value: unknown, path: string): FourthWallMessageData[] {
    if (!Array.isArray(value)) {
        fail('INVALID_LEGACY_DATA', path, 'must be an array');
    }
    return value.map((message, index) => copyLegacyMessage(message, `${path}[${index}]`));
}

export function getLegacyFourthWallChat(metadata: unknown, chatId: string): UnknownRecord | null {
    if (!isRecord(metadata) || !chatId) {
        return null;
    }
    const chatRoot = metadata[chatId];
    if (!isRecord(chatRoot)) {
        return null;
    }
    const extensions = chatRoot.extensions;
    if (!isRecord(extensions)) {
        return null;
    }
    const littleWhiteBox = extensions.LittleWhiteBox;
    if (!isRecord(littleWhiteBox)) {
        return null;
    }
    const legacy = littleWhiteBox.fw;
    return isRecord(legacy) ? legacy : null;
}

export function migrateLegacyFourthWallChat(
    metadata: unknown,
    chatId: string,
    createdAt = Date.now(),
): XiaobaiOsChatData | null {
    const legacy = getLegacyFourthWallChat(metadata, chatId);
    if (!legacy) {
        return null;
    }
    const defaults = createDefaultFourthWallChatState(createdAt);
    const legacySettings =
        legacy.settings === undefined ? {} : requireRecord(legacy.settings, 'fw.settings', 'INVALID_LEGACY_DATA');
    const settings = {
        maxChatLayers: legacyInteger(legacySettings.maxChatLayers, 9999, 'fw.settings.maxChatLayers', 1, 9999),
        maxMetaTurns: legacyInteger(legacySettings.maxMetaTurns, 9999, 'fw.settings.maxMetaTurns', 1, 9999),
        stream: legacyBoolean(legacySettings.stream, true, 'fw.settings.stream'),
        disableAssistantPrefill: legacyBoolean(
            legacySettings.disableAssistantPrefill,
            false,
            'fw.settings.disableAssistantPrefill',
        ),
    };

    let sessions: FourthWallChatState['sessions'];
    if (legacy.sessions !== undefined) {
        if (!Array.isArray(legacy.sessions)) {
            fail('INVALID_LEGACY_DATA', 'fw.sessions', 'must be an array');
        }
        sessions = legacy.sessions.map((value, index) => {
            const path = `fw.sessions[${index}]`;
            const session = requireRecord(value, path, 'INVALID_LEGACY_DATA');
            return {
                id: requireString(session.id, `${path}.id`, 'INVALID_LEGACY_DATA'),
                name: requireString(session.name, `${path}.name`, 'INVALID_LEGACY_DATA'),
                createdAt: requireFiniteNumber(session.createdAt, `${path}.createdAt`, 'INVALID_LEGACY_DATA'),
                history: copyLegacyHistory(session.history, `${path}.history`),
            };
        });
    } else {
        sessions = [
            {
                ...defaults.sessions[0],
                history: copyLegacyHistory(legacy.history ?? [], 'fw.history'),
            },
        ];
    }

    const sessionIds = new Set(sessions.map((session) => session.id));
    const activeSessionId =
        typeof legacy.activeSessionId === 'string' && sessionIds.has(legacy.activeSessionId)
            ? legacy.activeSessionId
            : sessions[0]?.id;
    const fourthWall = { settings, sessions, activeSessionId: activeSessionId || '' };
    const value: XiaobaiOsChatData = {
        schemaVersion: XIAOBAI_OS_CHAT_SCHEMA_VERSION,
        apps: { fourthWall },
        domains: {},
    };
    try {
        validateXiaobaiOsChatData(value);
        validateFourthWallChatState(fourthWall, 'xiaobaiOs.apps.fourthWall');
    } catch (error) {
        if (error instanceof XiaobaiOsDataError && error.code === 'INVALID_CURRENT_DATA') {
            throw new XiaobaiOsDataError('INVALID_LEGACY_DATA', error.message, error.path);
        }
        throw error;
    }
    return value;
}

export function cloneXiaobaiOsData<T>(value: T): T {
    return clone(value);
}
