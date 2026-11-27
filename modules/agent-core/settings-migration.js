import { AGENT_SETTINGS_CONFIG_VERSION, DEFAULT_PERMISSION_MODE, normalizePermissionMode, normalizePresetName } from './config.js';
import { DEFAULT_MODEL_LIST_AUTH } from './model-list-auth.js';

export const ASSISTANT_PERMISSION_KEY = 'permissionMode';

// Frozen settings v1: each named preset contained provider + modelConfigs[provider].
// Compatibility owner: saved Assistant settings (including pre-version records).
// Remove when v1 settings files are no longer accepted at the repository boundary.
const V1_CONNECTION_DEFAULTS = Object.freeze({
    'openai-compatible': { baseUrl: 'https://api.openai.com/v1', model: 'gpt-4o-mini', toolMode: 'tagged-json' },
    'openai-responses': { baseUrl: 'https://api.openai.com/v1', model: 'gpt-4.1-mini' },
    'sillytavern-openai-compatible': { baseUrl: '', model: 'gpt-4o-mini', toolMode: 'tagged-json' },
    'sillytavern-claude': { baseUrl: '', model: 'claude-sonnet-4-0' },
    'sillytavern-google': { baseUrl: '', model: 'gemini-2.5-pro' },
    anthropic: { baseUrl: 'https://api.anthropic.com', model: 'claude-sonnet-4-0' },
    google: { baseUrl: 'https://generativelanguage.googleapis.com/v1beta', model: 'gemini-2.5-pro' },
    'google-vertex': { baseUrl: '', model: 'gemini-3.8-flash' },
});

function upgradePresetV1(preset = {}, fallbackProvider = 'openai-compatible') {
    const { modelConfigs = {}, ...rest } = preset;
    const provider = preset.provider || fallbackProvider;
    const active = modelConfigs[provider] || {};
    return {
        ...rest, provider,
        apiKey: '', temperature: 1, maxTokens: 32000, sendTemperature: true,
        toolMode: 'native', reasoning: {}, sampling: {},
        modelListAuth: ['google', 'sillytavern-google'].includes(provider) ? 'x-goog-api-key' : 'x-api-key',
        ...V1_CONNECTION_DEFAULTS[provider],
        ...active,
        // These are extra fields, not alternative connection/model values.
        vertex: { authMode: 'relay', projectId: '', location: 'global', serviceAccountJson: '', streamFunctionCallArguments: true,
            ...modelConfigs['google-vertex']?.vertex },
    };
}

function upgradeSettingsV1(value) {
    const { modelConfigs, ...rest } = value;
    const name = value.currentPresetName || value.presetName || '默认';
    const presets = value.presets || (modelConfigs ? { [name]: value } : {});
    return {
        ...rest,
        configVersion: 2,
        presets: Object.fromEntries(Object.entries(presets).map(([key, preset]) => [key, upgradePresetV1(preset)])),
        ...(value.delegateConfig?.provider || value.delegateConfig?.modelConfigs
            ? { delegateConfig: upgradePresetV1(value.delegateConfig, presets[value.delegatePresetName || name]?.provider) } : {}),
    };
}

// Settings v1/v2 persisted native discovery defaults. Reset those existing
// presets once at the read/import boundary; v3 keeps subsequent manual choices.
// Remove with v1/v2 import support. No credentials or generation fields change.
export function upgradeAgentSettings(value = {}) {
    if (value.configVersion === AGENT_SETTINGS_CONFIG_VERSION) return value;
    const previous = [2, 3, 4].includes(value.configVersion) ? value : upgradeSettingsV1(value);
    const resetDiscovery = preset => ({ ...preset, modelListAuth: DEFAULT_MODEL_LIST_AUTH });
    const current = { ...previous };
    delete current.jsApiPermission;
    const upgradePreset = ({ permissionMode: _legacyPermission, ...preset }) =>
        previous.configVersion === 2 ? resetDiscovery(preset) : preset;
    return {
        ...current,
        configVersion: AGENT_SETTINGS_CONFIG_VERSION,
        presets: Object.fromEntries(Object.entries(previous.presets || {}).filter(([, preset]) =>
            preset && typeof preset === 'object').map(([name, preset]) => [name, upgradePreset(preset)])),
        ...(previous.delegateConfig ? { delegateConfig: upgradePreset(previous.delegateConfig) } : {}),
    };
}

// Permission was preset-owned in v1–v4. v1–v3 also had a JS gate;
// a disabled gate must not turn into unconfirmed JS execution during upgrade.
// Remove legacy extraction when these settings files are no longer supported.
export function readLegacyAssistantPermissionMode(legacy = {}) {
    if (legacy.configVersion === AGENT_SETTINGS_CONFIG_VERSION
        || (legacy.configVersion !== 4 && legacy.jsApiPermission !== 'allow')) return normalizePermissionMode();
    const activeName = normalizePresetName(legacy.currentPresetName);
    const presets = Object.fromEntries(Object.entries(legacy.presets || {}).filter(([, preset]) =>
        preset && typeof preset === 'object').map(([name, preset]) => [normalizePresetName(name), preset]));
    const activePreset = Object.hasOwn(presets, activeName) ? presets[activeName] : Object.values(presets)[0];
    return normalizePermissionMode((activePreset ?? legacy).permissionMode);
}

// The first API save can come from another panel. Copy a legacy full mode
// before discarding preset permissions, without overwriting a newer choice.
export async function migrateAssistantPermission(legacy, getStorage) {
    const mode = readLegacyAssistantPermissionMode(legacy);
    if (mode === DEFAULT_PERMISSION_MODE) return;
    const storage = await getStorage();
    if (await storage.getStrict(ASSISTANT_PERMISSION_KEY) !== null) return;
    await storage.updateAndSave(record => {
        record[ASSISTANT_PERMISSION_KEY] ??= mode;
    }, { silent: false });
}
