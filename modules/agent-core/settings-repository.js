import { normalizeWebSettings } from './web/settings.js';
import { migrateAssistantPermission, upgradeAgentSettings } from './settings-migration.js';
import {
    AGENT_SETTINGS_CONFIG_VERSION,
    normalizeAgentSettings,
    normalizePresetName,
} from './config.js';

export const SHARED_AGENT_SETTINGS_KEY = 'settings';

let assistantStoragePromise = null;

function describeError(error) {
    return error instanceof Error ? error.message : String(error || 'unknown_error');
}

async function resolveStorage(storage) {
    if (storage) return storage;
    assistantStoragePromise ||= import('../../core/server-storage.js')
        .then((storageModule) => storageModule.AssistantStorage)
        .catch((error) => {
            assistantStoragePromise = null;
            throw error;
        });
    return await assistantStoragePromise;
}

export async function readSharedAgentSettings(options = {}) {
    const storage = await resolveStorage(options.storage);
    const saved = typeof storage?.getStrict === 'function'
        ? await storage.getStrict(SHARED_AGENT_SETTINGS_KEY, null)
        : await storage.get(SHARED_AGENT_SETTINGS_KEY, null);
    return upgradeAgentSettings(saved || {});
}

export function mergeSharedAgentSettings(current = {}, patch = {}, options = {}) {
    const normalizeOptions = options.normalizeOptions || {};
    const normalizedCurrent = normalizeAgentSettings(current || {}, normalizeOptions);
    const requestedUpdatedAt = Number(options.now?.() ?? Date.now());
    const updatedAt = Math.max(
        Number.isFinite(requestedUpdatedAt) ? requestedUpdatedAt : 0,
        Number(normalizedCurrent.updatedAt || 0) + 1,
    );
    return normalizeAgentSettings({
        ...normalizedCurrent,
        workspaceFileName: patch.workspaceFileName ?? normalizedCurrent.workspaceFileName,
        ...normalizeWebSettings(patch, normalizedCurrent),
        currentPresetName: normalizePresetName(patch.currentPresetName || normalizedCurrent.currentPresetName),
        delegatePresetName: normalizePresetName(
            patch.delegatePresetName
            || normalizedCurrent.delegatePresetName
            || patch.currentPresetName
            || normalizedCurrent.currentPresetName,
        ),
        delegateConfig: patch.delegateConfig && typeof patch.delegateConfig === 'object'
            ? patch.delegateConfig
            : normalizedCurrent.delegateConfig,
        delegateConfigured: typeof patch.delegateConfigured === 'boolean'
            ? patch.delegateConfigured
            : normalizedCurrent.delegateConfigured,
        presets: patch.presets && typeof patch.presets === 'object'
            ? patch.presets
            : normalizedCurrent.presets,
        updatedAt,
        configVersion: AGENT_SETTINGS_CONFIG_VERSION,
    }, normalizeOptions);
}

export async function loadSharedAgentSettings(options = {}) {
    const saved = await readSharedAgentSettings(options);
    return normalizeAgentSettings(saved || {}, options.normalizeOptions || {});
}

export async function loadSharedAgentSettingsResult(options = {}) {
    try {
        return {
            ok: true,
            config: await loadSharedAgentSettings(options),
            error: '',
        };
    } catch (error) {
        return {
            ok: false,
            config: null,
            error: `共享 Agent API 配置读取失败：${describeError(error)}`,
        };
    }
}

export async function saveSharedAgentSettings(patch = {}, options = {}) {
    const storage = await resolveStorage(options.storage);
    const normalizeOptions = options.normalizeOptions || {};
    /** @type {{ current: ReturnType<typeof normalizeAgentSettings> | null, next: ReturnType<typeof normalizeAgentSettings> | null }} */
    const config = { current: null, next: null };
    try {
        const saved = await storage.updateAndSave(async record => {
            const previous = record[SHARED_AGENT_SETTINGS_KEY] || {};
            config.current = normalizeAgentSettings(upgradeAgentSettings(previous), normalizeOptions);
            config.next = mergeSharedAgentSettings(config.current, patch, options);
            await migrateAssistantPermission(previous, async () =>
                options.permissionStorage ?? (await import('../../core/server-storage.js')).AssistantPermissionStorage);
            record[SHARED_AGENT_SETTINGS_KEY] = config.next;
        }, { silent: options.silent !== false });
        if (saved !== true) throw new Error('共享 Agent API 配置保存失败');
        return { ok: true, config: config.next };
    } catch (error) {
        return {
            ok: false,
            config: config.current,
            error: describeError(error),
        };
    }
}

export function resetSharedAgentSettingsRepositoryForTests() {
    assistantStoragePromise = null;
}
