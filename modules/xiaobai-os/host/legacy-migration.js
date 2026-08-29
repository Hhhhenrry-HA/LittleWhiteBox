import {
    createDefaultFourthWallChatState,
    createDefaultFourthWallGlobalSettings,
} from '../apps/fourth-wall/domain/defaults.js';

export const XIAOBAI_OS_SCHEMA_VERSION = 1;

export const LEGACY_FOURTH_WALL_SETTING_KEYS = Object.freeze([
    'fourthWall',
    'fourthWallImage',
    'fourthWallVoice',
    'fourthWallCommentary',
    'fourthWallPromptTemplates',
    'dynamicPrompt',
]);

export class XiaobaiOsDataError extends Error {
    constructor(code, message, path = '') {
        super(message);
        this.name = 'XiaobaiOsDataError';
        this.code = code;
        this.path = path;
    }
}

function isRecord(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function clone(value) {
    return structuredClone(value);
}

function fail(code, path, expectation) {
    throw new XiaobaiOsDataError(code, `${path} ${expectation}`, path);
}

function requireRecord(value, path, code = 'INVALID_CURRENT_DATA') {
    if (!isRecord(value)) fail(code, path, 'must be an object');
    return value;
}

function requireBoolean(value, path, code = 'INVALID_CURRENT_DATA') {
    if (typeof value !== 'boolean') fail(code, path, 'must be a boolean');
    return value;
}

function requireString(value, path, code = 'INVALID_CURRENT_DATA') {
    if (typeof value !== 'string') fail(code, path, 'must be a string');
    return value;
}

function requireInteger(value, path, min, max, code = 'INVALID_CURRENT_DATA') {
    if (!Number.isInteger(value) || value < min || value > max) {
        fail(code, path, `must be an integer from ${min} to ${max}`);
    }
    return value;
}

function legacyBoolean(value, fallback, path) {
    if (value === undefined) return fallback;
    return requireBoolean(value, path, 'INVALID_LEGACY_DATA');
}

function legacyString(value, fallback, path) {
    if (value === undefined) return fallback;
    return requireString(value, path, 'INVALID_LEGACY_DATA');
}

function legacyInteger(value, fallback, path, min, max) {
    if (value === undefined) return fallback;
    return requireInteger(value, path, min, max, 'INVALID_LEGACY_DATA');
}

function validatePromptTemplates(value, path, code = 'INVALID_CURRENT_DATA') {
    const templates = requireRecord(value, path, code);
    requireString(templates.topuser, `${path}.topuser`, code);
    requireString(templates.confirm, `${path}.confirm`, code);
    requireString(templates.metaProtocol, `${path}.metaProtocol`, code);
    requireString(templates.bottom, `${path}.bottom`, code);
}

function validateFourthWallGlobalSettings(value, path) {
    const settings = requireRecord(value, path);
    requireBoolean(requireRecord(settings.image, `${path}.image`).enablePrompt, `${path}.image.enablePrompt`);
    requireBoolean(requireRecord(settings.voice, `${path}.voice`).enabled, `${path}.voice.enabled`);
    const commentary = requireRecord(settings.commentary, `${path}.commentary`);
    requireBoolean(commentary.enabled, `${path}.commentary.enabled`);
    requireInteger(commentary.probability, `${path}.commentary.probability`, 1, 99);
    validatePromptTemplates(settings.promptTemplates, `${path}.promptTemplates`);
}

function validateMessage(value, path) {
    const message = requireRecord(value, path);
    if (message.role !== 'user' && message.role !== 'ai') {
        fail('INVALID_CURRENT_DATA', `${path}.role`, 'must be "user" or "ai"');
    }
    requireString(message.content, `${path}.content`);
    if (message.thinking !== undefined) requireString(message.thinking, `${path}.thinking`);
    if (!Number.isFinite(message.ts)) fail('INVALID_CURRENT_DATA', `${path}.ts`, 'must be a finite number');
    if (message.type !== undefined) requireString(message.type, `${path}.type`);
}

function validateFourthWallChatState(value, path) {
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
        if (!id || ids.has(id)) fail('INVALID_CURRENT_DATA', `${sessionPath}.id`, 'must be non-empty and unique');
        ids.add(id);
        requireString(session.name, `${sessionPath}.name`);
        if (!Number.isFinite(session.createdAt)) {
            fail('INVALID_CURRENT_DATA', `${sessionPath}.createdAt`, 'must be a finite number');
        }
        if (!Array.isArray(session.history)) fail('INVALID_CURRENT_DATA', `${sessionPath}.history`, 'must be an array');
        session.history.forEach((message, messageIndex) => validateMessage(message, `${sessionPath}.history[${messageIndex}]`));
    });

    const activeSessionId = requireString(state.activeSessionId, `${path}.activeSessionId`);
    if (!ids.has(activeSessionId)) fail('INVALID_CURRENT_DATA', `${path}.activeSessionId`, 'must reference an existing session');
}

export function createDefaultXiaobaiOsSettings() {
    return {
        schemaVersion: XIAOBAI_OS_SCHEMA_VERSION,
        enabled: false,
        apps: {
            fourthWall: createDefaultFourthWallGlobalSettings(),
        },
    };
}

export function createDefaultXiaobaiOsChatData(createdAt = Date.now()) {
    return {
        schemaVersion: XIAOBAI_OS_SCHEMA_VERSION,
        apps: {
            fourthWall: createDefaultFourthWallChatState(createdAt),
        },
    };
}

export function validateXiaobaiOsSettings(value) {
    const root = requireRecord(value, 'xiaobaiOs');
    if (root.schemaVersion !== XIAOBAI_OS_SCHEMA_VERSION) {
        fail('UNSUPPORTED_SETTINGS_VERSION', 'xiaobaiOs.schemaVersion', `must equal ${XIAOBAI_OS_SCHEMA_VERSION}`);
    }
    requireBoolean(root.enabled, 'xiaobaiOs.enabled');
    const apps = requireRecord(root.apps, 'xiaobaiOs.apps');
    validateFourthWallGlobalSettings(apps.fourthWall, 'xiaobaiOs.apps.fourthWall');
    return true;
}

export function validateXiaobaiOsChatData(value) {
    const root = requireRecord(value, 'xiaobaiOs');
    if (root.schemaVersion !== XIAOBAI_OS_SCHEMA_VERSION) {
        fail('UNSUPPORTED_CHAT_VERSION', 'xiaobaiOs.schemaVersion', `must equal ${XIAOBAI_OS_SCHEMA_VERSION}`);
    }
    const apps = requireRecord(root.apps, 'xiaobaiOs.apps');
    if (apps.fourthWall !== undefined) {
        validateFourthWallChatState(apps.fourthWall, 'xiaobaiOs.apps.fourthWall');
    }
    return true;
}

export function migrateLegacySettings(extensionSettings) {
    const source = requireRecord(extensionSettings, 'LittleWhiteBox', 'INVALID_LEGACY_DATA');
    const defaults = createDefaultFourthWallGlobalSettings();
    const hasFourthWall = Object.hasOwn(source, 'fourthWall');
    const fourthWall = source.fourthWall === undefined
        ? undefined
        : requireRecord(source.fourthWall, 'fourthWall', 'INVALID_LEGACY_DATA');
    const dynamicPrompt = source.dynamicPrompt === undefined
        ? undefined
        : requireRecord(source.dynamicPrompt, 'dynamicPrompt', 'INVALID_LEGACY_DATA');
    const image = source.fourthWallImage === undefined
        ? {}
        : requireRecord(source.fourthWallImage, 'fourthWallImage', 'INVALID_LEGACY_DATA');
    const voice = source.fourthWallVoice === undefined
        ? {}
        : requireRecord(source.fourthWallVoice, 'fourthWallVoice', 'INVALID_LEGACY_DATA');
    const commentary = source.fourthWallCommentary === undefined
        ? {}
        : requireRecord(source.fourthWallCommentary, 'fourthWallCommentary', 'INVALID_LEGACY_DATA');
    const templates = source.fourthWallPromptTemplates === undefined
        ? {}
        : requireRecord(source.fourthWallPromptTemplates, 'fourthWallPromptTemplates', 'INVALID_LEGACY_DATA');

    const value = {
        schemaVersion: XIAOBAI_OS_SCHEMA_VERSION,
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
                    topuser: legacyString(templates.topuser, defaults.promptTemplates.topuser, 'fourthWallPromptTemplates.topuser'),
                    confirm: legacyString(templates.confirm, defaults.promptTemplates.confirm, 'fourthWallPromptTemplates.confirm'),
                    metaProtocol: legacyString(templates.metaProtocol, defaults.promptTemplates.metaProtocol, 'fourthWallPromptTemplates.metaProtocol'),
                    bottom: legacyString(templates.bottom, defaults.promptTemplates.bottom, 'fourthWallPromptTemplates.bottom'),
                },
            },
        },
    };
    validateXiaobaiOsSettings(value);

    return {
        value,
        legacyKeys: LEGACY_FOURTH_WALL_SETTING_KEYS.filter(key => Object.hasOwn(source, key)),
    };
}

function copyLegacyMessage(value, path) {
    const message = requireRecord(value, path, 'INVALID_LEGACY_DATA');
    const copy = {
        role: message.role,
        content: message.content,
        ts: message.ts,
    };
    if (Object.hasOwn(message, 'thinking')) copy.thinking = message.thinking;
    if (Object.hasOwn(message, 'type')) copy.type = message.type;
    return copy;
}

function copyLegacyHistory(value, path) {
    if (!Array.isArray(value)) fail('INVALID_LEGACY_DATA', path, 'must be an array');
    return value.map((message, index) => copyLegacyMessage(message, `${path}[${index}]`));
}

export function getLegacyFourthWallChat(metadata, chatId) {
    if (!isRecord(metadata) || !chatId) return null;
    const legacy = metadata[chatId]?.extensions?.LittleWhiteBox?.fw;
    return isRecord(legacy) ? legacy : null;
}

export function migrateLegacyFourthWallChat(metadata, chatId, createdAt = Date.now()) {
    const legacy = getLegacyFourthWallChat(metadata, chatId);
    if (!legacy) return null;
    const defaults = createDefaultFourthWallChatState(createdAt);
    const legacySettings = legacy.settings === undefined
        ? {}
        : requireRecord(legacy.settings, 'fw.settings', 'INVALID_LEGACY_DATA');
    const settings = {
        maxChatLayers: legacyInteger(legacySettings.maxChatLayers, 9999, 'fw.settings.maxChatLayers', 1, 9999),
        maxMetaTurns: legacyInteger(legacySettings.maxMetaTurns, 9999, 'fw.settings.maxMetaTurns', 1, 9999),
        stream: legacyBoolean(legacySettings.stream, true, 'fw.settings.stream'),
        disableAssistantPrefill: legacyBoolean(legacySettings.disableAssistantPrefill, false, 'fw.settings.disableAssistantPrefill'),
    };

    let sessions;
    if (legacy.sessions !== undefined) {
        if (!Array.isArray(legacy.sessions)) fail('INVALID_LEGACY_DATA', 'fw.sessions', 'must be an array');
        sessions = legacy.sessions.map((value, index) => {
            const path = `fw.sessions[${index}]`;
            const session = requireRecord(value, path, 'INVALID_LEGACY_DATA');
            return {
                id: session.id,
                name: session.name,
                createdAt: session.createdAt,
                history: copyLegacyHistory(session.history, `${path}.history`),
            };
        });
    } else {
        sessions = [{
            ...defaults.sessions[0],
            history: copyLegacyHistory(legacy.history ?? [], 'fw.history'),
        }];
    }

    const sessionIds = new Set(sessions.map(session => session.id));
    const activeSessionId = typeof legacy.activeSessionId === 'string' && sessionIds.has(legacy.activeSessionId)
        ? legacy.activeSessionId
        : sessions[0]?.id;
    const fourthWall = { settings, sessions, activeSessionId };
    const value = {
        schemaVersion: XIAOBAI_OS_SCHEMA_VERSION,
        apps: { fourthWall },
    };
    try {
        validateXiaobaiOsChatData(value);
    } catch (error) {
        if (error instanceof XiaobaiOsDataError && error.code === 'INVALID_CURRENT_DATA') {
            throw new XiaobaiOsDataError('INVALID_LEGACY_DATA', error.message, error.path);
        }
        throw error;
    }
    return value;
}

export function cloneXiaobaiOsData(value) {
    return clone(value);
}
