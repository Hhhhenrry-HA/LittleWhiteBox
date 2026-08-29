import {
    cloneXiaobaiOsData,
    LEGACY_FOURTH_WALL_SETTING_KEYS,
    migrateLegacySettings,
    validateXiaobaiOsSettings,
    XiaobaiOsDataError,
} from './legacy-migration.js';

function isRecord(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function requireSettingsRoot(adapter) {
    const root = adapter.getExtensionSettings();
    if (!isRecord(root)) {
        throw new XiaobaiOsDataError('SETTINGS_UNAVAILABLE', 'LittleWhiteBox settings are unavailable');
    }
    return root;
}

function createWriteQueue() {
    let tail = Promise.resolve();
    return (task) => {
        const result = tail.then(task);
        tail = result.catch(() => {});
        return result;
    };
}

function restoreLegacySettings(root, snapshots) {
    for (const [key, value] of snapshots) {
        if (!Object.hasOwn(root, key)) root[key] = value;
    }
}

/**
 * Creates the sole repository for persistent Xiaobai OS extension settings.
 *
 * @param {{getExtensionSettings: () => object, saveSettings: () => Promise<void>|void}} adapter
 */
export function createSettingsRepository(adapter) {
    if (typeof adapter?.getExtensionSettings !== 'function' || typeof adapter?.saveSettings !== 'function') {
        throw new TypeError('settings repository requires getExtensionSettings and saveSettings');
    }
    const enqueueWrite = createWriteQueue();

    function read() {
        const root = requireSettingsRoot(adapter);
        if (!Object.hasOwn(root, 'xiaobaiOs')) return null;
        validateXiaobaiOsSettings(root.xiaobaiOs);
        return cloneXiaobaiOsData(root.xiaobaiOs);
    }

    async function prepare() {
        return enqueueWrite(async () => {
            const root = requireSettingsRoot(adapter);
            if (Object.hasOwn(root, 'xiaobaiOs')) {
                validateXiaobaiOsSettings(root.xiaobaiOs);
                return cloneXiaobaiOsData(root.xiaobaiOs);
            }

            const migration = migrateLegacySettings(root);
            const legacySnapshots = new Map(
                migration.legacyKeys.map(key => [key, cloneXiaobaiOsData(root[key])]),
            );
            const installed = migration.value;
            root.xiaobaiOs = installed;
            migration.legacyKeys.forEach(key => delete root[key]);

            try {
                await adapter.saveSettings();
            } catch (error) {
                if (root.xiaobaiOs === installed) delete root.xiaobaiOs;
                restoreLegacySettings(root, legacySnapshots);
                throw error;
            }
            return cloneXiaobaiOsData(installed);
        });
    }

    async function mutate(action) {
        if (typeof action !== 'function') throw new TypeError('settings mutation action must be a function');
        return enqueueWrite(async () => {
            const root = requireSettingsRoot(adapter);
            if (!Object.hasOwn(root, 'xiaobaiOs')) {
                throw new XiaobaiOsDataError('SETTINGS_NOT_PREPARED', 'Xiaobai OS settings have not been prepared');
            }
            validateXiaobaiOsSettings(root.xiaobaiOs);
            const previous = cloneXiaobaiOsData(root.xiaobaiOs);
            const next = action(cloneXiaobaiOsData(previous));
            if (!isRecord(next)) throw new TypeError('settings mutation action must return the complete next state');
            validateXiaobaiOsSettings(next);
            const installed = cloneXiaobaiOsData(next);
            root.xiaobaiOs = installed;
            try {
                await adapter.saveSettings();
            } catch (error) {
                if (root.xiaobaiOs === installed) root.xiaobaiOs = previous;
                throw error;
            }
            return cloneXiaobaiOsData(installed);
        });
    }

    function setEnabled(enabled) {
        if (typeof enabled !== 'boolean') throw new TypeError('enabled must be a boolean');
        return mutate((next) => {
            next.enabled = enabled;
            return next;
        });
    }

    function mutateFourthWall(action) {
        if (typeof action !== 'function') throw new TypeError('fourth-wall settings action must be a function');
        return mutate((next) => {
            const result = action(cloneXiaobaiOsData(next.apps.fourthWall));
            if (!isRecord(result)) throw new TypeError('fourth-wall settings action must return the complete next state');
            next.apps.fourthWall = result;
            return next;
        });
    }

    return Object.freeze({
        prepare,
        read,
        setEnabled,
        mutateFourthWall,
        legacyKeys: LEGACY_FOURTH_WALL_SETTING_KEYS,
    });
}
