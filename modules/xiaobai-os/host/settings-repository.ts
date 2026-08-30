import {
    cloneXiaobaiOsData,
    LEGACY_FOURTH_WALL_SETTING_KEYS,
    migrateLegacySettings,
    type LegacyFourthWallSettingKey,
    validateXiaobaiOsSettings,
    XiaobaiOsDataError,
} from './legacy-migration.js';
import type { FourthWallGlobalSettings } from '../apps/fourth-wall/types.js';
import type { XiaobaiOsSettings as XiaobaiOsSettingsRoot } from '../types.js';

type XiaobaiOsSettings = XiaobaiOsSettingsRoot<{ fourthWall: FourthWallGlobalSettings }>;

type UnknownRecord = Record<string, unknown>;

export interface XiaobaiOsSettingsAdapter {
    getExtensionSettings: () => UnknownRecord;
    saveSettings: () => Promise<void> | void;
}

export interface XiaobaiOsSettingsRepository {
    prepare: () => Promise<XiaobaiOsSettings>;
    read: () => XiaobaiOsSettings | null;
    setEnabled: (enabled: boolean) => Promise<XiaobaiOsSettings>;
    mutateFourthWall: (
        action: (current: FourthWallGlobalSettings) => FourthWallGlobalSettings,
    ) => Promise<XiaobaiOsSettings>;
    legacyKeys: readonly LegacyFourthWallSettingKey[];
}

function isRecord(value: unknown): value is UnknownRecord {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function assertValidSettings(value: unknown): asserts value is XiaobaiOsSettings {
    if (!validateXiaobaiOsSettings(value)) {
        throw new XiaobaiOsDataError('INVALID_CURRENT_DATA', 'Xiaobai OS settings are invalid');
    }
}

function isUnconfirmedSave(error: unknown): boolean {
    return isRecord(error) && (error.code === 'SAVE_UNCONFIRMED' || error.uncertain === true);
}

function requireSettingsRoot(adapter: XiaobaiOsSettingsAdapter): UnknownRecord {
    const root = adapter.getExtensionSettings();
    if (!isRecord(root)) {
        throw new XiaobaiOsDataError('SETTINGS_UNAVAILABLE', 'LittleWhiteBox settings are unavailable');
    }
    return root;
}

function createWriteQueue() {
    let tail: Promise<unknown> = Promise.resolve();
    return <T>(task: () => Promise<T> | T): Promise<T> => {
        const result = tail.then(task);
        tail = result.catch(() => {});
        return result;
    };
}

function restoreLegacySettings(root: UnknownRecord, snapshots: ReadonlyMap<LegacyFourthWallSettingKey, unknown>): void {
    for (const [key, value] of snapshots) {
        if (!Object.hasOwn(root, key)) {
            root[key] = value;
        }
    }
}

/**
 * Creates the sole repository for persistent Xiaobai OS extension settings.
 *
 */
export function createSettingsRepository(adapter: XiaobaiOsSettingsAdapter): XiaobaiOsSettingsRepository {
    if (typeof adapter?.getExtensionSettings !== 'function' || typeof adapter?.saveSettings !== 'function') {
        throw new TypeError('settings repository requires getExtensionSettings and saveSettings');
    }
    const enqueueWrite = createWriteQueue();

    function read(): XiaobaiOsSettings | null {
        const root = requireSettingsRoot(adapter);
        if (!Object.hasOwn(root, 'xiaobaiOs')) {
            return null;
        }
        assertValidSettings(root.xiaobaiOs);
        return cloneXiaobaiOsData(root.xiaobaiOs);
    }

    async function prepare(): Promise<XiaobaiOsSettings> {
        return enqueueWrite(async () => {
            const root = requireSettingsRoot(adapter);
            if (Object.hasOwn(root, 'xiaobaiOs')) {
                assertValidSettings(root.xiaobaiOs);
                return cloneXiaobaiOsData(root.xiaobaiOs);
            }

            const migration = migrateLegacySettings(root);
            const legacySnapshots = new Map(migration.legacyKeys.map((key) => [key, cloneXiaobaiOsData(root[key])]));
            const installed = migration.value;
            root.xiaobaiOs = installed;
            migration.legacyKeys.forEach((key) => delete root[key]);

            try {
                await adapter.saveSettings();
            } catch (error) {
                if (!isUnconfirmedSave(error)) {
                    if (root.xiaobaiOs === installed) {
                        delete root.xiaobaiOs;
                    }
                    restoreLegacySettings(root, legacySnapshots);
                }
                throw error;
            }
            return cloneXiaobaiOsData(installed);
        });
    }

    async function mutate(action: (current: XiaobaiOsSettings) => XiaobaiOsSettings): Promise<XiaobaiOsSettings> {
        if (typeof action !== 'function') {
            throw new TypeError('settings mutation action must be a function');
        }
        return enqueueWrite(async () => {
            const root = requireSettingsRoot(adapter);
            if (!Object.hasOwn(root, 'xiaobaiOs')) {
                throw new XiaobaiOsDataError('SETTINGS_NOT_PREPARED', 'Xiaobai OS settings have not been prepared');
            }
            assertValidSettings(root.xiaobaiOs);
            const previous = cloneXiaobaiOsData(root.xiaobaiOs);
            const next = action(cloneXiaobaiOsData(previous));
            if (!isRecord(next)) {
                throw new TypeError('settings mutation action must return the complete next state');
            }
            assertValidSettings(next);
            const installed = cloneXiaobaiOsData(next);
            root.xiaobaiOs = installed;
            try {
                await adapter.saveSettings();
            } catch (error) {
                if (!isUnconfirmedSave(error) && root.xiaobaiOs === installed) {
                    root.xiaobaiOs = previous;
                }
                throw error;
            }
            return cloneXiaobaiOsData(installed);
        });
    }

    function setEnabled(enabled: boolean): Promise<XiaobaiOsSettings> {
        if (typeof enabled !== 'boolean') {
            throw new TypeError('enabled must be a boolean');
        }
        return mutate((next) => {
            next.enabled = enabled;
            return next;
        });
    }

    function mutateFourthWall(
        action: (current: FourthWallGlobalSettings) => FourthWallGlobalSettings,
    ): Promise<XiaobaiOsSettings> {
        if (typeof action !== 'function') {
            throw new TypeError('fourth-wall settings action must be a function');
        }
        return mutate((next) => {
            const result = action(cloneXiaobaiOsData(next.apps.fourthWall));
            if (!isRecord(result)) {
                throw new TypeError('fourth-wall settings action must return the complete next state');
            }
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
