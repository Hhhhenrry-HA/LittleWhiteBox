import { normalizePermissionMode } from '../../agent-core/config.js';
import { ASSISTANT_PERMISSION_KEY as MODE_KEY, readLegacyAssistantPermissionMode } from '../../agent-core/settings-migration.js';

export async function loadAssistantPermission(storage, readLegacy) {
    const saved = await storage.getStrict(MODE_KEY);
    if (saved !== null) return normalizePermissionMode(saved);
    const legacy = await readLegacy();
    return normalizePermissionMode(await storage.getStrict(MODE_KEY, readLegacyAssistantPermissionMode(legacy || {})));
}

export async function saveAssistantPermission(storage, permissionMode) {
    if (normalizePermissionMode(permissionMode) !== permissionMode) throw new Error('无效的助手权限');
    if (!await storage.setAndSave(MODE_KEY, permissionMode, { silent: false })) throw new Error('执行权限保存失败');
}

export function createAssistantPermissionPreference(storage, readLegacy) {
    let mode;
    return {
        async read() {
            if (!mode) {
                const saved = await loadAssistantPermission(storage, readLegacy);
                mode ??= saved;
            }
            return mode;
        },
        select(next) {
            if (normalizePermissionMode(next) !== next) throw new Error('无效的助手权限');
            mode = next;
            // StorageFile serializes writes in selection order. A failed save
            // does not undo the live preference or an even newer selection.
            return saveAssistantPermission(storage, next);
        },
    };
}
