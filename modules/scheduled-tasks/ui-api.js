// ═══════════════════════════════════════════════════════════════════════════
// 导入
// ═══════════════════════════════════════════════════════════════════════════

import { extension_settings, getContext } from "../../../../../extensions.js";
import { saveSettings, saveSettingsDebounced, characters, this_chid, chat, callPopup, eventSource, getRequestHeaders } from "../../../../../../script.js";
import { getPresetManager } from "../../../../../preset-manager.js";
import { oai_settings } from "../../../../../openai.js";
import { SlashCommandParser } from "../../../../../slash-commands/SlashCommandParser.js";
import { SlashCommand } from "../../../../../slash-commands/SlashCommand.js";
import { ARGUMENT_TYPE, SlashCommandArgument, SlashCommandNamedArgument } from "../../../../../slash-commands/SlashCommandArgument.js";
import { callGenericPopup, POPUP_TYPE } from "../../../../../popup.js";
import { accountStorage } from "../../../../../util/AccountStorage.js";
import { download, getFileText, uuidv4, debounce, getSortableDelay } from "../../../../../utils.js";
import { executeSlashCommand } from "../../core/slash-command.js";
import { EXT_ID } from "../../core/constants.js";
import { createModuleEvents, event_types } from "../../core/event-manager.js";
import { xbLog, CacheRegistry } from "../../core/debug-core.js";
import { TasksStorage } from "../../core/server-storage.js";
import { allocateTaskNamesForDraft, countChatFloors, createTaskRecord, normalizeTaskName, parseTaskImport, pickTaskFloor, prepareTasksForPersistence } from './task-model.js';
import { selectDueTaskRecords } from './task-scheduler.js';
import { ScheduledTaskDispatcher } from './task-dispatcher.js';
import { CharacterTaskRepository, commitGlobalTaskRemoval, commitTaskMove, GlobalTaskRepository, PresetTaskRepository, ScheduledTaskCatalog, withTaskRepositoryReservations } from './task-repositories.js';
import { createScheduledTasksHostAdapter, saveCharacterTaskFieldStrict, saveExtensionSettingsStrict } from './host-adapter.js';
import { TaskOriginTracker } from './task-origin.js';
import { ScheduledTaskRuntime } from './task-runtime.js';

// ═══════════════════════════════════════════════════════════════════════════
// 常量和默认值
// ═══════════════════════════════════════════════════════════════════════════

const TASKS_MODULE_NAME = "xiaobaix-tasks";
// processedMessages 已改为纯内存过程状态；字段保留只为不改动存量设置文件形状。
const defaultSettings = { enabled: true, globalTasks: [], processedMessages: [], character_allowed_tasks: [] };
const CONFIG = { MAX_PROCESSED: 20, MAX_COOLDOWN: 10, CLEANUP_INTERVAL: 30000, TASK_COOLDOWN: 50 };
const events = createModuleEvents('scheduledTasks');

// ═══════════════════════════════════════════════════════════════════════════
// 状态
// ═══════════════════════════════════════════════════════════════════════════

let state = {
    currentEditingIndex: -1, currentEditingId: null, currentEditingScope: 'global', currentEditingOwner: 'global', currentEditingLocator: null,
    lastChatId: null,
    taskLastExecutionTime: new Map(), cleanupTimer: null, taskBarVisible: true,
    processedMessagesSet: new Set(),
    qrObserver: null,
};

const taskOrigin = new TaskOriginTracker();
const mutatingTaskKeys = new Set();
const manualResolutionControllers = new Map();

// ═══════════════════════════════════════════════════════════════════════════
// 工具函数
// ═══════════════════════════════════════════════════════════════════════════

const normalizeTaskKey = (name) => String(name || '').trim();
const isGloballyEnabled = () => (window.isXiaobaixEnabled !== undefined ? window.isXiaobaixEnabled : true) && getSettings().enabled;
const nowMs = () => Date.now();

function cancelManualResolutions(taskKey, reason = 'task_changed') {
    const controllers = manualResolutionControllers.get(taskKey);
    if (!controllers) return;
    manualResolutionControllers.delete(taskKey);
    controllers.forEach(controller => controller.abort(reason));
}

function cancelAllManualResolutions(reason) {
    for (const key of [...manualResolutionControllers.keys()]) cancelManualResolutions(key, reason);
}

let taskCatalog = null;
let taskRepositories = null;
let taskDispatcher = null;
let taskRuntime = null;
let hostAdapter = null;
let slashCommandsRegistered = false;

function getCharacterOwner() {
    const character = this_chid !== undefined && this_chid !== null ? characters[this_chid] : null;
    return character?.avatar || (character ? `chid:${this_chid}` : 'no-character');
}

function getTaskCatalog() {
    if (!taskCatalog) {
        taskCatalog = new ScheduledTaskCatalog({
            repositories: getTaskRepositories().all,
        });
    }
    return taskCatalog;
}

const allTaskRecords = () => getTaskCatalog().records();
const allTasksMeta = () => allTaskRecords().map(record => record.definition);
const allTasks = allTasksMeta;

function findTaskRecordByName(name, scope = 'all') {
    const normalizedName = normalizeTaskName(name);
    return allTaskRecords().find(record => {
        if (scope !== 'all' && record.ref.scope !== scope) return false;
        return normalizeTaskName(record.definition.name) === normalizedName;
    }) || null;
}

function findTaskRecordByCommandName(name) {
    const expected = String(name ?? '').toLowerCase();
    return allTaskRecords().find(record => String(record.definition.name ?? '').toLowerCase() === expected) || null;
}

// ═══════════════════════════════════════════════════════════════════════════
// 设置管理
// ═══════════════════════════════════════════════════════════════════════════

function getSettings() {
    const ext = extension_settings[EXT_ID] || (extension_settings[EXT_ID] = {});
    if (!ext.tasks) ext.tasks = structuredClone(defaultSettings);
    const t = ext.tasks;
    if (typeof t.enabled !== 'boolean') t.enabled = defaultSettings.enabled;
    if (!Array.isArray(t.globalTasks)) t.globalTasks = [];
    if (!Array.isArray(t.character_allowed_tasks)) t.character_allowed_tasks = [];
    return t;
}

function scheduleCleanup() {
    if (state.cleanupTimer) return;
    state.cleanupTimer = setInterval(() => {
        const n = nowMs();
        for (const [taskKey, entry] of state.taskLastExecutionTime.entries()) {
            const lastTime = typeof entry === 'number' ? entry : entry?.at;
            if (!Number.isFinite(lastTime) || n - lastTime > CONFIG.TASK_COOLDOWN * 2) state.taskLastExecutionTime.delete(taskKey);
        }
        if (state.taskLastExecutionTime.size > CONFIG.MAX_COOLDOWN) {
            const entries = [...state.taskLastExecutionTime.entries()]
                .sort((a, b) => (typeof b[1] === 'number' ? b[1] : b[1]?.at || 0) - (typeof a[1] === 'number' ? a[1] : a[1]?.at || 0))
                .slice(0, CONFIG.MAX_COOLDOWN);
            state.taskLastExecutionTime.clear();
            entries.forEach(([k, v]) => state.taskLastExecutionTime.set(k, v));
        }
    }, CONFIG.CLEANUP_INTERVAL);
}

const isTaskInCooldown = (taskKey, t = nowMs()) => {
    const entry = state.taskLastExecutionTime.get(taskKey);
    const last = typeof entry === 'number' ? entry : entry?.at;
    return Number.isFinite(last) && (t - last) < CONFIG.TASK_COOLDOWN;
};

const setTaskCooldown = (taskKey, name = taskKey) => state.taskLastExecutionTime.set(taskKey, { at: nowMs(), name: String(name || taskKey) });

// 只用于当前运行内去重同一个宿主事件，切聊天即失效，没有重启恢复价值。
const isMessageProcessed = (key) => state.processedMessagesSet.has(key);
const markMessageAsProcessed = key => {
    if (state.processedMessagesSet.has(key)) return;
    state.processedMessagesSet.add(key);
    if (state.processedMessagesSet.size > CONFIG.MAX_PROCESSED) {
        state.processedMessagesSet = new Set([...state.processedMessagesSet].slice(-Math.floor(CONFIG.MAX_PROCESSED / 2)));
    }
};

// ═══════════════════════════════════════════════════════════════════════════
// 角色任务
// ═══════════════════════════════════════════════════════════════════════════

function findCharacterByOwner(owner = getCharacterOwner()) {
    if (!owner || owner === 'no-character') return { character: null, characterId: null };
    if (owner.startsWith('chid:')) {
        const characterId = Number(owner.slice(5));
        return { character: characters[characterId] || null, characterId };
    }
    const characterId = characters.findIndex(character => character?.avatar === owner);
    return { character: characterId >= 0 ? characters[characterId] : null, characterId: characterId >= 0 ? characterId : null };
}

function getCharacterTasks(owner = getCharacterOwner()) {
    const { character: c } = findCharacterByOwner(owner);
    if (!c) return [];
    if (!c.data) c.data = {};
    if (!c.data.extensions) c.data.extensions = {};
    if (!c.data.extensions[TASKS_MODULE_NAME]) c.data.extensions[TASKS_MODULE_NAME] = { tasks: [] };
    const list = c.data.extensions[TASKS_MODULE_NAME].tasks;
    if (!Array.isArray(list)) c.data.extensions[TASKS_MODULE_NAME].tasks = [];
    return c.data.extensions[TASKS_MODULE_NAME].tasks;
}

function cloneTasksForPersistence(tasks) {
    return prepareTasksForPersistence(tasks, uuidv4);
}

async function saveCharacterTasks(tasks, owner = getCharacterOwner()) {
    const { character, characterId } = findCharacterByOwner(owner);
    if (!character) throw new Error('要保存任务的角色已不存在');
    const avatar = character.avatar;
    const snapshot = cloneTasksForPersistence(tasks);
    await saveCharacterTaskFieldStrict({
        character,
        characterId,
        getCurrentCharacterId: () => getContext().characterId,
        fieldName: TASKS_MODULE_NAME,
        tasks: snapshot,
        getRequestHeaders,
        updateCurrentCharacterJson: value => $('#character_json_data').val(value),
    });
    const settings = getSettings();
    if (avatar && !settings.character_allowed_tasks?.includes(avatar)) {
        settings.character_allowed_tasks ??= [];
        settings.character_allowed_tasks.push(avatar);
        saveSettingsDebounced();
    }
    return snapshot;
}

// ═══════════════════════════════════════════════════════════════════════════
// 预设任务
// ═══════════════════════════════════════════════════════════════════════════

const PRESET_TASK_FIELD = 'scheduledTasks';
const PRESET_PROMPT_ORDER_CHARACTER_ID = 100000;
const presetTasksState = { name: '', tasks: [] };

const PresetTasksStore = (() => {
    const isPlainObject = (value) => !!value && typeof value === 'object' && !Array.isArray(value);
    const deepClone = (value) => {
        if (value === undefined) return undefined;
        if (typeof structuredClone === 'function') {
            try { return structuredClone(value); } catch {}
        }
        try { return JSON.parse(JSON.stringify(value)); } catch { return value; }
    };

    const getPresetManagerSafe = () => {
        try { return getPresetManager('openai'); } catch { return null; }
    };

    const getPresetSnapshot = (manager, name) => {
        if (!manager || !name) return { source: null, clone: null };
        let source = null;
        try {
            if (typeof manager.getCompletionPresetByName === 'function') {
                source = manager.getCompletionPresetByName(name) || null;
            }
        } catch {}
        if (!source) {
            try { source = manager.getPresetSettings?.(name) || null; } catch { source = null; }
        }
        if (!source) return { source: null, clone: null };
        return { source, clone: deepClone(source) };
    };

    const syncTarget = (target, source) => {
        if (!target || !source) return;
        Object.keys(target).forEach((key) => {
            if (!Object.prototype.hasOwnProperty.call(source, key)) delete target[key];
        });
        Object.assign(target, source);
    };

    const ensurePromptOrderEntry = (preset, create = false) => {
        if (!preset) return null;
        if (!Array.isArray(preset.prompt_order)) {
            if (!create) return null;
            preset.prompt_order = [];
        }
        let entry = preset.prompt_order.find(item => Number(item?.character_id) === PRESET_PROMPT_ORDER_CHARACTER_ID);
        if (!entry && create) {
            entry = { character_id: PRESET_PROMPT_ORDER_CHARACTER_ID, order: [] };
            preset.prompt_order.push(entry);
        }
        return entry || null;
    };

    const currentName = () => {
        try { return getPresetManagerSafe()?.getSelectedPresetName?.() || ''; } catch { return ''; }
    };

    const read = (name) => {
        if (!name) return [];
        const manager = getPresetManagerSafe();
        if (!manager) return [];
        const { clone } = getPresetSnapshot(manager, name);
        if (!clone) return [];
        const entry = ensurePromptOrderEntry(clone, false);
        if (!entry || !isPlainObject(entry.xiaobai_ext)) return [];
        const tasks = entry.xiaobai_ext[PRESET_TASK_FIELD];
        return Array.isArray(tasks) ? deepClone(tasks) : [];
    };

    const write = async (name, tasks) => {
        if (!name) throw new Error('当前没有可保存任务的预设');
        const manager = getPresetManagerSafe();
        if (!manager) throw new Error('OpenAI 预设管理器不可用');
        const { source, clone } = getPresetSnapshot(manager, name);
        if (!clone) throw new Error(`找不到预设：${name}`);
        const shouldCreate = Array.isArray(tasks) && tasks.length > 0;
        const entry = ensurePromptOrderEntry(clone, shouldCreate);
        if (entry) {
            entry.xiaobai_ext = isPlainObject(entry.xiaobai_ext) ? entry.xiaobai_ext : {};
            if (shouldCreate) {
                entry.xiaobai_ext[PRESET_TASK_FIELD] = deepClone(tasks);
            } else {
                if (entry.xiaobai_ext) delete entry.xiaobai_ext[PRESET_TASK_FIELD];
                if (entry.xiaobai_ext && Object.keys(entry.xiaobai_ext).length === 0) delete entry.xiaobai_ext;
            }
        }
        await manager.savePreset(name, clone, { skipUpdate: true });
        syncTarget(source, clone);
        const activeName = manager.getSelectedPresetName?.();
        if (activeName && activeName === name && Object.prototype.hasOwnProperty.call(clone, 'prompt_order')) {
            try { oai_settings.prompt_order = structuredClone(clone.prompt_order); } catch { oai_settings.prompt_order = clone.prompt_order; }
        }
    };

    return { currentName, read, write };
})();

function resetPresetTasksCache() {
    presetTasksState.name = '';
    presetTasksState.tasks = [];
}

function getPresetTasks(owner = PresetTasksStore.currentName()) {
    const name = owner === 'no-preset' ? '' : owner;
    if (!name) {
        if (!PresetTasksStore.currentName()) resetPresetTasksCache();
        return [];
    }
    if (name !== PresetTasksStore.currentName()) {
        return PresetTasksStore.read(name) || [];
    }
    if (presetTasksState.name !== name || !presetTasksState.tasks.length) {
        const loaded = PresetTasksStore.read(name) || [];
        presetTasksState.name = name;
        presetTasksState.tasks = Array.isArray(loaded) ? loaded : [];
    }
    return presetTasksState.tasks;
}

async function savePresetTasks(tasks, owner = PresetTasksStore.currentName()) {
    const name = owner === 'no-preset' ? '' : owner;
    if (!name) throw new Error('要保存任务的预设已不存在');
    const list = cloneTasksForPersistence(tasks);
    await PresetTasksStore.write(name, list);
    if (PresetTasksStore.currentName() === name || presetTasksState.name === name) {
        presetTasksState.name = name;
        presetTasksState.tasks = list;
    }
    updatePresetTaskHint();
    return list;
}

// ═══════════════════════════════════════════════════════════════════════════
// 任务列表操作
// ═══════════════════════════════════════════════════════════════════════════

async function saveGlobalTasks(tasks) {
    const invalidLegacy = (Array.isArray(tasks) ? tasks : []).find(task => task && !task.id && !Object.prototype.hasOwnProperty.call(task, 'commands'));
    if (invalidLegacy) {
        throw new Error(`全局任务“${invalidLegacy.name || '未命名'}”缺少 ID 和内嵌脚本，无法安全保存`);
    }
    const beforeMetadata = structuredClone(getSettings().globalTasks);
    const snapshot = cloneTasksForPersistence(tasks);
    const scripts = snapshot.filter(task => Object.prototype.hasOwnProperty.call(task, 'commands'));
    const scriptIds = new Set(scripts.map(task => String(task.id || '').trim()));
    const metaOnly = snapshot.map(task => {
        const meta = { ...task };
        delete meta.commands;
        return meta;
    });
    const beforeRecords = beforeMetadata.map((task, index) => createTaskRecord(task, { scope: 'global', owner: 'global', index }));
    const afterRecords = metaOnly.map((task, index) => createTaskRecord(task, { scope: 'global', owner: 'global', index }));
    const changedKeys = new Set();
    beforeRecords.forEach((record, index) => {
        const current = record.ref.persistedId
            ? afterRecords.find(item => item.ref.persistedId === record.ref.persistedId)
            : afterRecords[index];
        if (!current || scriptIds.has(record.ref.persistedId) || JSON.stringify(current.definition) !== JSON.stringify(record.definition)) {
            changedKeys.add(record.key);
            if (current) changedKeys.add(current.key);
        }
    });
    afterRecords.forEach((record, index) => {
        const previous = record.ref.persistedId
            ? beforeRecords.find(item => item.ref.persistedId === record.ref.persistedId)
            : beforeRecords[index];
        if (!previous || scriptIds.has(record.ref.persistedId) || JSON.stringify(previous.definition) !== JSON.stringify(record.definition)) {
            changedKeys.add(record.key);
        }
    });
    const blockedKeys = [...changedKeys];
    blockedKeys.forEach(key => {
        mutatingTaskKeys.add(key);
        taskDispatcher?.cancel(key, 'task_changing');
        taskRuntime?.stopTask(key, 'task_changing');
        cancelManualResolutions(key, 'task_changing');
    });
    const previousScripts = new Map();
    try {
        if (scripts.length > 0) {
            await Promise.all(scripts.map(async task => {
                previousScripts.set(task.id, await TasksStorage.getStrict(task.id, null));
            }));
            await TasksStorage.updateAndSave(draft => {
                for (const task of scripts) draft[task.id] = String(task.commands ?? '');
            }, { silent: false });
        }

        getSettings().globalTasks = metaOnly;
        try {
            await saveExtensionSettingsStrict({
                saveSettings,
                eventSource,
                committedEvent: event_types.SETTINGS_UPDATED,
            });
        } catch (error) {
            getSettings().globalTasks = beforeMetadata;
            if (scripts.length > 0) {
                try {
                    await TasksStorage.updateAndSave(draft => {
                        for (const [id, commands] of previousScripts.entries()) {
                            if (commands === null) delete draft[id];
                            else draft[id] = commands;
                        }
                    }, { silent: false });
                } catch (rollbackError) {
                    const combinedError = new Error(`全局任务设置提交失败，脚本回滚也失败：${rollbackError?.message || rollbackError}`);
                    combinedError.cause = error;
                    throw combinedError;
                }
            }
            throw error;
        }
        return metaOnly;
    } finally {
        blockedKeys.forEach(key => mutatingTaskKeys.delete(key));
    }
}

function getTaskRepositories() {
    if (!taskRepositories) {
        const global = new GlobalTaskRepository({
            getTasks: () => getSettings().globalTasks,
            saveTasks: saveGlobalTasks,
            loadCommands: id => TasksStorage.getStrict(id, null),
        });
        const character = new CharacterTaskRepository({
            getOwner: getCharacterOwner,
            getTasks: getCharacterTasks,
            saveTasks: saveCharacterTasks,
        });
        const preset = new PresetTaskRepository({
            getOwner: () => PresetTasksStore.currentName() || 'no-preset',
            getTasks: getPresetTasks,
            saveTasks: savePresetTasks,
        });
        taskRepositories = { global, character, preset, all: [global, character, preset] };
    }
    return taskRepositories;
}

function getTaskRepositoryByScope(scope) {
    const repositories = getTaskRepositories();
    return scope === 'character' ? repositories.character : (scope === 'preset' ? repositories.preset : repositories.global);
}

const getTaskListByScope = (scope, owner) => getTaskRepositoryByScope(scope).list(owner);
const getTaskOwnerByScope = scope => getTaskRepositoryByScope(scope).owner();
const captureTaskOwners = () => ({
    global: getTaskOwnerByScope('global'),
    character: getTaskOwnerByScope('character'),
    preset: getTaskOwnerByScope('preset'),
});

async function mutateTaskListByScope(scope, mutator, { owner = getTaskOwnerByScope(scope), reserved = false } = {}) {
    const repository = getTaskRepositoryByScope(scope);
    const result = await (reserved ? repository.mutateReserved(mutator, { owner }) : repository.mutate(mutator, { owner }));
    // Only global task commands live outside repository metadata. Character and
    // preset records include commands in their definitions, so normal comparison
    // can identify the changed task without stopping every run in that scope.
    const explicitScriptIds = new Set(scope === 'global' ? result.submitted
        .filter(task => task?.id && Object.prototype.hasOwnProperty.call(task, 'commands'))
        .map(task => task.id) : []);
    const beforeRecords = repository.records(result.owner, result.before);
    const afterRecords = repository.records(result.owner, result.after);
    beforeRecords.forEach((record, index) => {
        const current = record.ref.persistedId
            ? afterRecords.find(item => item.ref.persistedId === record.ref.persistedId)
            : afterRecords[index];
        if (!current || explicitScriptIds.has(record.ref.persistedId) || JSON.stringify(current.definition) !== JSON.stringify(record.definition)) {
            taskDispatcher?.cancel(record.key, 'task_changed');
            taskRuntime?.stopTask(record.key, 'task_changed');
            cancelManualResolutions(record.key, 'task_changed');
        }
    });
    return result;
}

const captureTaskLocator = (task, index) => ({
    id: task?.id || null,
    index,
    legacyCreatedAt: String(task?.createdAt || ''),
    legacyName: String(task?.name || ''),
});

function findTaskIndex(tasks, locator) {
    if (locator?.id) {
        return tasks.findIndex(task => task?.id === locator.id);
    }
    const matchesLegacyIdentity = locator?.legacyCreatedAt
        ? task => String(task?.createdAt || '') === locator.legacyCreatedAt
        : (locator?.legacyName ? task => String(task?.name || '') === locator.legacyName : null);
    if (matchesLegacyIdentity) {
        const matches = tasks.map((task, index) => matchesLegacyIdentity(task) ? index : -1).filter(index => index >= 0);
        if (matches.length === 1) return matches[0];
        if (matches.includes(locator.index)) return locator.index;
        return -1;
    }
    return Number.isInteger(locator?.index) && locator.index >= 0 && locator.index < tasks.length ? locator.index : -1;
}

function updateTaskInDraft(draft, locator, updater) {
    const index = findTaskIndex(draft, locator);
    if (index < 0) throw new Error('任务已不存在');
    const updated = updater(draft[index], index);
    if (updated !== undefined) draft[index] = updated;
    return draft[index];
}

function allocateNamesInTaskDraft(tasks, draft, scope, owner, { excludedIndexes = [], excludedRecord = null } = {}) {
    const existingNames = allTaskRecords()
        .filter(record => {
            if (record.ref.scope === scope && record.ref.owner === owner) return false;
            if (!excludedRecord || record.ref.scope !== excludedRecord.scope || record.ref.owner !== excludedRecord.owner) return true;
            if (excludedRecord.locator?.id) {
                return record.ref.persistedId !== String(excludedRecord.locator.id).trim();
            }
            if (excludedRecord.locator?.legacyCreatedAt) {
                return String(record.definition.createdAt || '') !== excludedRecord.locator.legacyCreatedAt;
            }
            return String(record.definition.name || '') !== excludedRecord.locator?.legacyName;
        })
        .map(record => record.definition.name);
    return allocateTaskNamesForDraft(tasks, draft, { existingNames, excludedIndexes });
}

function reorderTaskDraft(draft, locators) {
    const used = new Set();
    const reordered = [];
    for (const locator of locators) {
        const index = findTaskIndex(draft, locator);
        if (index >= 0 && !used.has(index)) {
            used.add(index);
            reordered.push(draft[index]);
        }
    }
    draft.forEach((task, index) => {
        if (!used.has(index)) reordered.push(task);
    });
    draft.splice(0, draft.length, ...reordered);
}

async function removeTaskByScope(scope, locator, owner = getTaskOwnerByScope(scope), { reserved = false } = {}) {
    let removedTask = null;
    const removeMetadata = () => mutateTaskListByScope(scope, draft => {
        const index = findTaskIndex(draft, locator);
        if (index < 0) throw new Error('任务已不存在');
        [removedTask] = draft.splice(index, 1);
        return removedTask;
    }, { owner, reserved });

    if (scope === 'global') {
        const result = await commitGlobalTaskRemoval({
            saveMetadata: removeMetadata,
            deleteCommands: () => removedTask?.id
                ? TasksStorage.updateAndSave(draft => { delete draft[removedTask.id]; }, { silent: false })
                : Promise.resolve(),
        });
        if (result.cleanupError) {
            console.error('全局任务已删除，但分离脚本清理失败:', result.cleanupError);
            toastr?.warning?.(`任务已删除，但遗留脚本清理失败；该脚本不会再执行。${result.cleanupError?.message ? `（${result.cleanupError.message}）` : ''}`);
        }
    } else {
        await removeMetadata();
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 任务运行管理
// ═══════════════════════════════════════════════════════════════════════════

function getTaskRuntime() {
    if (!window.__XB_TASKS_INITIALIZED__) throw new Error('循环任务模块未启用');
    if (!taskRuntime || taskRuntime.closed) {
        taskRuntime = new ScheduledTaskRuntime({
            executeSlashCommand,
            createId: uuidv4,
            getChatId: () => getContext().chatId || '',
            origin: taskOrigin,
            log: {
                info: (category, payload) => { try { xbLog.info('scheduledTasks', payload ?? category); } catch {} },
                warn: (category, payload) => { try { xbLog.warn('scheduledTasks', payload ?? category); } catch {} },
                error: (category, payload, error) => { try { xbLog.error('scheduledTasks', payload ?? category, error || null); } catch {} },
            },
        });
    }
    return taskRuntime;
}

function resetAllTaskRuns() {
    taskDispatcher?.invalidate('manual_reset');
    taskRuntime?.stopAll('manual_reset');
    cancelAllManualResolutions('manual_reset');
    clearTaskCooldown();
    return { ok: true };
}

CacheRegistry.register('scheduledTasks', {
    name: '循环任务状态',
    getSize: () => {
        try {
            const a = state.processedMessagesSet?.size || 0;
            const b = state.taskLastExecutionTime?.size || 0;
            const runtime = taskRuntime?.getStats?.() || {};
            const c = (runtime.runs || 0) + (runtime.callbacks || 0) + (runtime.timeouts || 0) + (runtime.intervals || 0) + (runtime.listeners || 0);
            const d = TasksStorage.getCacheSize() || 0;
            return a + b + c + d;
        } catch { return 0; }
    },
    getBytes: () => {
        try {
            let total = 0;
            const addStr = (v) => { total += String(v ?? '').length * 2; };
            const addSet = (s) => { if (!s?.forEach) return; s.forEach(v => addStr(v)); };
            const addMap = (m, addValue = null) => {
                if (!m?.forEach) return;
                m.forEach((v, k) => { addStr(k); if (typeof addValue === 'function') addValue(v); });
            };
            addSet(state.processedMessagesSet);
            addMap(state.taskLastExecutionTime, (v) => addStr(v));
            const runtime = taskRuntime?.getStats?.() || {};
            total += ((runtime.runs || 0) + (runtime.callbacks || 0) + (runtime.timeouts || 0) + (runtime.intervals || 0) + (runtime.listeners || 0)) * 16;
            total += TasksStorage.getCacheBytes();
            return total;
        } catch { return 0; }
    },
    clear: () => {
        try {
            state.processedMessagesSet?.clear?.();
            state.taskLastExecutionTime?.clear?.();
            TasksStorage.clearCache();
        } catch {}
        try { resetAllTaskRuns(); } catch {}
    },
    getDetail: () => {
        try {
            return {
                processedMessages: state.processedMessagesSet?.size || 0,
                cooldown: state.taskLastExecutionTime?.size || 0,
                dynamicCallbacks: taskRuntime?.callbackCount || 0,
                runningSingleInstances: taskRuntime?.size || 0,
                executingTasks: taskRuntime?.activeExecutions || 0,
                scriptCache: TasksStorage.getCacheSize() || 0,
            };
        } catch { return {}; }
    },
});

// ═══════════════════════════════════════════════════════════════════════════
// 命令执行
// ═══════════════════════════════════════════════════════════════════════════

async function executeCommands(commands, taskName, options = {}) {
    return await getTaskRuntime().executeCommands(commands, {
        taskKey: options.taskKey || normalizeTaskKey(taskName),
        taskName: taskName || 'AnonymousTask',
        taskRef: options.taskRef || null,
        signal: options.signal || null,
    });
}

async function withResolvedManualTask(record, callback, { allowDisabled = false } = {}) {
    if (typeof callback !== 'function') throw new TypeError('手动任务执行器必须是函数');
    if (mutatingTaskKeys.has(record.key)) throw new Error('任务正在保存，请稍后重试');
    const controller = new AbortController();
    const controllers = manualResolutionControllers.get(record.key) || new Set();
    controllers.add(controller);
    manualResolutionControllers.set(record.key, controllers);
    try {
        const resolved = await getTaskCatalog().resolve(record.ref, { signal: controller.signal });
        if (controller.signal.aborted || mutatingTaskKeys.has(record.key)) throw new Error('任务在执行前已改变');
        const current = getTaskCatalog().find(record.ref);
        if (!current || JSON.stringify(current.definition) !== JSON.stringify(record.definition)) throw new Error('任务在执行前已改变');
        if (!allowDisabled && current.definition.disabled) throw new Error(`任务 "${current.definition.name}" 已被禁用`);
        return await callback(resolved, controller.signal);
    } finally {
        controllers.delete(controller);
        if (controllers.size === 0 && manualResolutionControllers.get(record.key) === controllers) {
            manualResolutionControllers.delete(record.key);
        }
    }
}

function handleTaskMessage(event) {
    if (!event.data || event.data.source !== 'xiaobaix-iframe' || event.data.type !== 'executeTaskJS') return;
    try {
        const script = document.createElement('script');
        script.textContent = event.data.code;
        event.source.document.head.appendChild(script);
        event.source.document.head.removeChild(script);
    } catch (error) { console.error('执行任务JS失败:', error); }
}

function getDynamicTaskRecords() {
    const records = [];
    let index = 0;
    for (const entry of getTaskRuntime().listFloorCallbacks()) {
        const { id: callbackId, options, chatId } = entry;
        records.push(createTaskRecord({
            id: callbackId,
            name: callbackId,
            disabled: false,
            interval: Number.isFinite(parseInt(options?.interval)) ? parseInt(options.interval) : 0,
            floorType: options?.floorType || 'all',
            triggerTiming: options?.timing || 'after_ai',
            __dynamic: true,
        }, { scope: 'dynamic', owner: `chat:${chatId || ''}`, index: index++ }));
    }
    return records;
}

function getTaskDispatcher() {
    if (!taskDispatcher || taskDispatcher.closed) {
        taskDispatcher = new ScheduledTaskDispatcher({
            execute: async request => {
                if (request.signal?.aborted || mutatingTaskKeys.has(request.key)) return null;
                if (request.ref.scope === 'dynamic') {
                    const counts = request.occurrence?.counts || getFloorCounts();
                    setTaskCooldown(request.key, request.ref.id);
                    const dynamicRecord = getDynamicTaskRecords().find(record => record.ref.id === request.ref.id);
                    const options = dynamicRecord?.definition || {};
                    return await getTaskRuntime().invokeFloorCallback(request.ref.id, {
                        timing: request.occurrence?.triggerContext || options.triggerTiming || 'after_ai',
                        floors: counts,
                        currentFloor: pickFloorByType(options.floorType || 'all', counts),
                        interval: Number(options.interval || 0),
                        floorType: options.floorType || 'all',
                        catchUp: request.catchUp,
                        mergedCount: request.mergedCount,
                    }, request.signal);
                }

                const record = await getTaskCatalog().resolve(request.ref, { signal: request.signal });
                if (request.signal?.aborted || mutatingTaskKeys.has(request.key) || record.definition.disabled) return null;
                setTaskCooldown(request.key, record.definition.name);
                return await executeCommands(record.definition.commands, record.definition.name, {
                    taskKey: request.key,
                    taskRef: request.ref,
                    signal: request.signal,
                });
            },
            onError: (error, request) => {
                console.error('[定时任务执行失败]', request?.ref, error);
                try { xbLog.error('scheduledTasks', { task: request?.key, phase: 'dispatch' }, error); } catch {}
            },
            onMerge: request => {
                try { xbLog.info('scheduledTasks', { task: request.key, pendingMerged: request.mergedCount }); } catch {}
            },
            onStateChange: () => {},
        });
    }
    return taskDispatcher;
}

// ═══════════════════════════════════════════════════════════════════════════
// 楼层计数
// ═══════════════════════════════════════════════════════════════════════════

function getFloorCounts() {
    return countChatFloors(chat);
}

const pickFloorByType = pickTaskFloor;

// ═══════════════════════════════════════════════════════════════════════════
// 任务触发
// ═══════════════════════════════════════════════════════════════════════════

async function checkAndExecuteTasks(triggerContext = 'after_ai') {
    if (!window.__XB_TASKS_INITIALIZED__ || !isGloballyEnabled()) return;

    const n = nowMs();
    const counts = getFloorCounts();
    const records = [...allTaskRecords(), ...getDynamicTaskRecords()];
    const dispatcher = getTaskDispatcher();
    const coolingDownKeys = new Set(mutatingTaskKeys);
    if (!dispatcher.isRunning) {
        records.filter(record => isTaskInCooldown(record.key, n)).forEach(record => coolingDownKeys.add(record.key));
    }
    const tasksToExecute = selectDueTaskRecords(records, {
        triggerContext,
        counts,
        coolingDownKeys,
    });

    if (tasksToExecute.length === 0 && dispatcher.pendingSize === 0) return;
    await dispatcher.submit(tasksToExecute, {
        triggerContext,
        counts,
        chatId: getContext().chatId,
        timestamp: n,
    });

}

// ═══════════════════════════════════════════════════════════════════════════
// 事件处理
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 任务自己跑命令产生的宿主事件不参与调度，否则 /send、/trigger 会让任务触发自己。
 * 楼层仍按聊天快照计算，这条消息依然是真实楼层，只是不由它发起新一轮调度。
 *
 * 已知宿主协议缺口：`/trigger` 等生成命令在 await=false 时会等命令返回后才
 * 调用 Generate()，宿主没有提供任何可关联的句柄。这种情况无法判定来源，
 * 此处不做超时猜测。
 */
function consumeTaskOriginEvent(message, source, messageKey) {
    if (!taskOrigin.consumeTaskMessage(message, source)) return false;
    if (messageKey) markMessageAsProcessed(messageKey);
    return true;
}

function onGenerationStarted() {
    taskOrigin.noteGenerationStarted();
}

async function onMessageReceived(messageId, source) {
    if (typeof messageId !== 'number' || messageId < 0 || !chat[messageId]) return;
    const message = chat[messageId];
    if (message.is_user || message.is_system || message.mes === '...' ||
        (message.swipe_id !== undefined && message.swipe_id > 0)) return;
    if (!isGloballyEnabled()) return;
    const chatId = getContext().chatId;
    const messageKey = `${chatId}_${messageId}_${message.send_date || ''}`;
    if (isMessageProcessed(messageKey)) return;
    // Older hosts without GENERATION_ENDED fall back to CHARACTER_MESSAGE_RENDERED.
    if (taskOrigin.consumeGenerationSettled()) {
        markMessageAsProcessed(messageKey);
        return;
    }
    if (consumeTaskOriginEvent(message, source, messageKey)) return;
    markMessageAsProcessed(messageKey);
    await checkAndExecuteTasks('after_ai');
}

async function onGenerationEnded(chatLen) {
    const len = Number(chatLen);
    const fromTask = taskOrigin.consumeGenerationSettled();
    if (!Number.isFinite(len) || len <= 0) return;
    if (fromTask) {
        const messageId = len - 1;
        const message = chat[messageId];
        if (message) markMessageAsProcessed(`${getContext().chatId}_${messageId}_${message.send_date || ''}`);
        return;
    }
    await onMessageReceived(len - 1);
}

async function onUserMessage(renderedMessageId, source) {
    if (!isGloballyEnabled()) return;
    const chatId = getContext().chatId;
    const messageId = Number.isInteger(renderedMessageId) ? renderedMessageId : Math.max(0, chat.length - 1);
    const message = chat[messageId];
    const messageKey = `${chatId}_${messageId}_${message?.send_date || ''}`;
    if (isMessageProcessed(messageKey)) return;
    if (consumeTaskOriginEvent(message, source, messageKey)) return;
    markMessageAsProcessed(messageKey);
    await checkAndExecuteTasks('before_user');
}

function onMessageDeleted() {
    const prefix = `${getContext().chatId}_`;
    for (const key of [...state.processedMessagesSet]) {
        if (key.startsWith(prefix)) state.processedMessagesSet.delete(key);
    }
}

async function onChatChanged(chatId) {
    const previousChatId = state.lastChatId;
    if (previousChatId === null || previousChatId !== chatId) {
        taskDispatcher?.invalidate('chat_changed');
        taskRuntime?.invalidate('chat_changed');
        cancelAllManualResolutions('chat_changed');
        taskOrigin.reset();
    }
    state.lastChatId = chatId;
    state.processedMessagesSet.clear();
    state.taskLastExecutionTime.clear();
    TasksStorage.clearCache();

    // CHAT_CHANGED 在宿主完成 getChat()/printMessages() 之后才发出，chat 已就绪，
    // 任务语义不需要等任何帧；rAF 只用于让任务栏在 DOM 稳定后重绘。
    checkEmbeddedTasks();
    refreshTaskLists();
    requestAnimationFrame(() => { try { updateTaskBar(); } catch {} });
    await checkAndExecuteTasks('chat_changed');
}

async function onChatCreated() {
    const chatId = getContext().chatId;
    if (state.lastChatId !== chatId) {
        taskDispatcher?.invalidate('chat_created');
        taskRuntime?.invalidate('chat_created');
        cancelAllManualResolutions('chat_created');
        taskOrigin.reset();
        state.lastChatId = chatId;
    }
    await checkAndExecuteTasks('chat_created');
}

function stopPresetTaskActivity(reason) {
    if (presetTasksState.name) {
        const repository = getTaskRepositoryByScope('preset');
        repository.records(presetTasksState.name, presetTasksState.tasks).forEach(record => {
            taskDispatcher?.cancel(record.key, reason);
            cancelManualResolutions(record.key, reason);
        });
    }
    taskRuntime?.stopScope('preset', reason);
}

function onPresetChanged(event) {
    const apiId = event?.apiId;
    if (apiId && apiId !== 'openai') return;
    stopPresetTaskActivity('preset_changed');
    resetPresetTasksCache();
    refreshUI();
}

function onMainApiChanged() {
    stopPresetTaskActivity('main_api_changed');
    resetPresetTasksCache();
    refreshUI();
}

// ═══════════════════════════════════════════════════════════════════════════
// UI 列表
// ═══════════════════════════════════════════════════════════════════════════

const getTaskUiId = (task, scope, index) => task?.id || `legacy-${scope}-${index}`;
const getTaskIndexFromItem = (item, list) => {
    const id = $(item).attr('data-task-id');
    if (id) return list.findIndex(task => task?.id === id);
    const index = Number($(item).attr('data-task-index'));
    return Number.isInteger(index) ? index : -1;
};

function createTaskItemSimple(task, scope = 'global', index = 0) {
    const taskType = scope || 'global';
    const uiId = getTaskUiId(task, taskType, index);
    const floorTypeText = { user: '用户楼层', llm: 'LLM楼层' }[task.floorType] || '全部楼层';
    const triggerTimingText = {
        before_user: '用户前',
        any_message: '任意对话',
        initialization: '角色卡初始化',
        character_init: '角色卡初始化',
        plugin_init: '插件初始化',
        only_this_floor: '仅该楼层',
        chat_changed: '切换聊天后'
    }[task.triggerTiming] || 'AI后';

    let displayName;
    if (task.interval === 0) {
        displayName = `${task.name} (手动触发)`;
    } else if (task.triggerTiming === 'initialization' || task.triggerTiming === 'character_init') {
        displayName = `${task.name} (角色卡初始化)`;
    } else if (task.triggerTiming === 'plugin_init') {
        displayName = `${task.name} (插件初始化)`;
    } else if (task.triggerTiming === 'chat_changed') {
        displayName = `${task.name} (切换聊天后)`;
    } else if (task.triggerTiming === 'only_this_floor') {
        displayName = `${task.name} (仅第${task.interval}${floorTypeText})`;
    } else {
        displayName = `${task.name} (每${task.interval}${floorTypeText}·${triggerTimingText})`;
    }

    const taskElement = $('#task_item_template').children().first().clone();
    taskElement.attr({ id: uiId, 'data-task-id': task.id || '', 'data-task-index': index, 'data-type': taskType });
    taskElement.find('.task_name').attr('title', task.name).text(displayName);
    taskElement.find('.disable_task').attr('id', `task_disable_${uiId}`).prop('checked', task.disabled);
    taskElement.find('label.checkbox').attr('for', `task_disable_${uiId}`);
    return taskElement;
}

function initSortable($list, onUpdate) {
    const inst = (() => { try { return $list.sortable('instance'); } catch { return undefined; } })();
    if (inst) return;
    $list.sortable({
        delay: getSortableDelay?.() || 0,
        handle: '.drag-handle.menu-handle',
        items: '> .task-item',
        update: onUpdate
    });
}

function updateTaskCounts(globalCount, characterCount, presetCount) {
    const globalEl = document.getElementById('global_task_count');
    const characterEl = document.getElementById('character_task_count');
    const presetEl = document.getElementById('preset_task_count');
    if (globalEl) globalEl.textContent = globalCount > 0 ? `(${globalCount})` : '';
    if (characterEl) characterEl.textContent = characterCount > 0 ? `(${characterCount})` : '';
    if (presetEl) presetEl.textContent = presetCount > 0 ? `(${presetCount})` : '';
}

async function saveTaskOrder(scope, $list) {
    const owner = getTaskOwnerByScope(scope);
    const current = getTaskListByScope(scope, owner);
    const newOrderIds = $list.sortable('toArray');
    const locators = newOrderIds.map(id => {
        const index = current.findIndex((task, taskIndex) => getTaskUiId(task, scope, taskIndex) === id);
        return index >= 0 ? captureTaskLocator(current[index], index) : null;
    }).filter(Boolean);
    await mutateTaskListByScope(scope, draft => reorderTaskDraft(draft, locators), { owner });
}

async function saveTaskOrderFromUi(scope, $list) {
    try {
        await saveTaskOrder(scope, $list);
    } catch (error) {
        console.error('保存任务顺序失败:', error);
        toastr?.error?.(`保存任务顺序失败：${error?.message || error}`);
    } finally {
        refreshTaskLists();
    }
}

function refreshTaskLists() {
    updatePresetTaskHint();

    const $globalList = $('#global_tasks_list');
    const $charList = $('#character_tasks_list');
    const $presetList = $('#preset_tasks_list');

    const globalTasks = getSettings().globalTasks;
    const characterTasks = getCharacterTasks();
    const presetTasks = getPresetTasks();

    updateTaskCounts(globalTasks.length, characterTasks.length, presetTasks.length);

    const globalFragment = document.createDocumentFragment();
    globalTasks.forEach((task, index) => { globalFragment.appendChild(createTaskItemSimple(task, 'global', index)[0]); });
    $globalList.empty().append(globalFragment);

    const charFragment = document.createDocumentFragment();
    characterTasks.forEach((task, index) => { charFragment.appendChild(createTaskItemSimple(task, 'character', index)[0]); });
    $charList.empty().append(charFragment);

    if ($presetList.length) {
        const presetFragment = document.createDocumentFragment();
        presetTasks.forEach((task, index) => { presetFragment.appendChild(createTaskItemSimple(task, 'preset', index)[0]); });
        $presetList.empty().append(presetFragment);
    }

    initSortable($globalList, function () {
        void saveTaskOrderFromUi('global', $globalList);
    });

    initSortable($charList, function () {
        void saveTaskOrderFromUi('character', $charList);
    });

    if ($presetList.length) {
        initSortable($presetList, function () {
            void saveTaskOrderFromUi('preset', $presetList);
        });
    }

    updateTaskBar();
}

function updatePresetTaskHint() {
    const hint = document.getElementById('preset_tasks_hint');
    if (!hint) return;
    const presetName = PresetTasksStore.currentName();
    if (!presetName) {
        hint.textContent = '未选择';
        hint.classList.add('no-preset');
        hint.title = '请在OpenAI设置中选择预设';
    } else {
        hint.textContent = `${presetName}`;
        hint.classList.remove('no-preset');
        hint.title = `当前OpenAI预设：${presetName}`;
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 任务栏
// ═══════════════════════════════════════════════════════════════════════════

const cache = { bar: null, btns: null, ownsBar: false, sig: '', ts: 0 };

const getActivatedTasks = () => isGloballyEnabled() ? allTasks().filter(t => t.buttonActivated && !t.disabled) : [];

const getBar = () => {
    if (cache.bar?.isConnected) return cache.bar;
    cache.bar = document.getElementById('qr--bar') || document.getElementById('qr-bar');
    cache.ownsBar = cache.bar?.dataset?.xiaobaixTaskBar === 'true';
    if (!cache.bar && !(window.quickReplyApi?.settings?.isEnabled || extension_settings?.quickReplyV2?.isEnabled)) {
        const parent = document.getElementById('send_form') || document.body;
        cache.bar = parent.insertBefore(
            Object.assign(document.createElement('div'), {
                id: 'qr-bar',
                className: 'flex-container flexGap5',
                innerHTML: '<div class="qr--buttons" style="display:flex;flex-wrap:wrap;justify-content:center"></div>'
            }),
            parent.firstChild
        );
        cache.bar.dataset.xiaobaixTaskBar = 'true';
        cache.ownsBar = true;
    }
    cache.btns = cache.bar?.querySelector('.qr--buttons');
    return cache.bar;
};

function createTaskBar() {
    if (!window.__XB_TASKS_INITIALIZED__) return;
    const tasks = getActivatedTasks();
    const sig = state.taskBarVisible ? tasks.map(t => t.name).join() : '';
    if (sig === cache.sig && Date.now() - cache.ts < 100) return;
    const bar = getBar();
    if (!bar) return;
    const btns = cache.btns || bar;
    btns.querySelectorAll('.xiaobaix-task-button').forEach(button => {
        button.style.display = state.taskBarVisible ? '' : 'none';
    });
    if (!state.taskBarVisible) return;
    const exist = new Map([...btns.querySelectorAll('.xiaobaix-task-button')].map(el => [el.dataset.taskName, el]));
    const names = new Set(tasks.map(t => t.name));
    exist.forEach((el, name) => !names.has(name) && el.remove());
    const frag = document.createDocumentFragment();
    tasks.forEach(t => {
        if (!exist.has(t.name)) {
            const btn = Object.assign(document.createElement('button'), {
                className: 'menu_button menu_button_icon xiaobaix-task-button interactable',
                innerHTML: `<span>${t.name}</span>`
            });
            btn.dataset.taskName = t.name;
            frag.appendChild(btn);
        }
    });
    frag.childNodes.length && btns.appendChild(frag);
    cache.sig = sig;
    cache.ts = Date.now();
}

const updateTaskBar = debounce(createTaskBar, 100);

function toggleTaskBarVisibility() {
    state.taskBarVisible = !state.taskBarVisible;
    const bar = getBar();
    bar?.querySelectorAll?.('.xiaobaix-task-button').forEach(button => {
        button.style.display = state.taskBarVisible ? '' : 'none';
    });
    createTaskBar();
    const btn = document.getElementById('toggle_task_bar');
    const txt = btn?.querySelector('small');
    if (txt) {
        txt.style.cssText = state.taskBarVisible ? 'opacity:1;text-decoration:none' : 'opacity:.5;text-decoration:line-through';
        btn.title = state.taskBarVisible ? '隐藏任务栏' : '显示任务栏';
    }
}

async function onTaskBarClick(e) {
    const btn = e.target.closest('.xiaobaix-task-button');
    if (!btn) return;
    if (!isGloballyEnabled()) return;
    window.xbqte(btn.dataset.taskName).catch(console.error);
}

// ═══════════════════════════════════════════════════════════════════════════
// 任务编辑器
// ═══════════════════════════════════════════════════════════════════════════

async function showTaskEditor(task = null, isEdit = false, scope = 'global') {
    const initialScope = scope || 'global';
    const sourceOwner = getTaskOwnerByScope(initialScope);
    const sourceList = getTaskListByScope(initialScope, sourceOwner);
    const sourceIndex = isEdit ? sourceList.indexOf(task) : -1;

    if (task && scope === 'global' && task.id) {
        const commands = await TasksStorage.getStrict(task.id, null);
        if (commands === null) throw new Error(`全局任务“${task.name || '未命名'}”的脚本不存在`);
        task = { ...task, commands };
    }

    state.currentEditingScope = initialScope;
    state.currentEditingOwner = sourceOwner;
    state.currentEditingIndex = sourceIndex;
    state.currentEditingId = task?.id || null;
    state.currentEditingLocator = isEdit ? captureTaskLocator(task, sourceIndex) : null;

    const editorTemplate = $('#task_editor_template').clone().removeAttr('id').show();
    editorTemplate.find('.task_name_edit').val(task?.name || '');
    editorTemplate.find('.task_commands_edit').val(task?.commands || '');
    editorTemplate.find('.task_interval_edit').val(task?.interval ?? 3);
    editorTemplate.find('.task_floor_type_edit').val(task?.floorType || 'all');
    const editorTiming = task?.triggerTiming === 'character_init' ? 'initialization' : (task?.triggerTiming || 'after_ai');
    editorTemplate.find('.task_trigger_timing_edit').val(editorTiming);
    editorTemplate.find('.task_type_edit').val(initialScope);
    editorTemplate.find('.task_enabled_edit').prop('checked', !task?.disabled);
    editorTemplate.find('.task_button_activated_edit').prop('checked', task?.buttonActivated || false);

    function updateWarningDisplay() {
        const interval = parseInt(editorTemplate.find('.task_interval_edit').val()) || 0;
        const triggerTiming = editorTemplate.find('.task_trigger_timing_edit').val();
        const floorType = editorTemplate.find('.task_floor_type_edit').val();
        let warningElement = editorTemplate.find('.trigger-timing-warning');
        if (warningElement.length === 0) {
            warningElement = $('<div class="trigger-timing-warning" style="color:#ff6b6b;font-size:.8em;margin-top:4px;"></div>');
            editorTemplate.find('.task_trigger_timing_edit').parent().append(warningElement);
        }
        const shouldShowWarning = interval > 0 && floorType === 'all' && (triggerTiming === 'after_ai' || triggerTiming === 'before_user');
        if (shouldShowWarning) {
            warningElement.html('⚠️ 警告：选择"全部楼层"配合"AI消息后"或"用户消息前"可能因楼层编号不匹配而不触发').show();
        } else {
            warningElement.hide();
        }
    }

    function updateControlStates() {
        const interval = parseInt(editorTemplate.find('.task_interval_edit').val()) || 0;
        const triggerTiming = editorTemplate.find('.task_trigger_timing_edit').val();
        const intervalControl = editorTemplate.find('.task_interval_edit');
        const floorTypeControl = editorTemplate.find('.task_floor_type_edit');
        const triggerTimingControl = editorTemplate.find('.task_trigger_timing_edit');

        if (interval === 0) {
            floorTypeControl.prop('disabled', true).css('opacity', '0.5');
            triggerTimingControl.prop('disabled', true).css('opacity', '0.5');
            let manualTriggerHint = editorTemplate.find('.manual-trigger-hint');
            if (manualTriggerHint.length === 0) {
                manualTriggerHint = $('<small class="manual-trigger-hint" style="color:#888;">手动触发</small>');
                triggerTimingControl.parent().append(manualTriggerHint);
            }
            manualTriggerHint.show();
        } else {
            floorTypeControl.prop('disabled', false).css('opacity', '1');
            triggerTimingControl.prop('disabled', false).css('opacity', '1');
            editorTemplate.find('.manual-trigger-hint').hide();
            if (triggerTiming === 'initialization' || triggerTiming === 'plugin_init' || triggerTiming === 'chat_changed') {
                intervalControl.prop('disabled', true).css('opacity', '0.5');
                floorTypeControl.prop('disabled', true).css('opacity', '0.5');
            } else {
                intervalControl.prop('disabled', false).css('opacity', '1');
                floorTypeControl.prop('disabled', false).css('opacity', '1');
            }
        }
        updateWarningDisplay();
    }

    editorTemplate.find('.task_interval_edit').on('input', updateControlStates);
    editorTemplate.find('.task_trigger_timing_edit').on('change', updateControlStates);
    editorTemplate.find('.task_floor_type_edit').on('change', updateControlStates);
    updateControlStates();

    callGenericPopup(editorTemplate, POPUP_TYPE.CONFIRM, '', { okButton: '保存' }).then(async (result) => {
        if (result) {
            const desiredName = String(editorTemplate.find('.task_name_edit').val() || '').trim();
            const existingNames = new Set(allTasks().map(t => normalizeTaskName(t?.name)));
            let uniqueName = desiredName;
            if (desiredName && (!isEdit || (isEdit && normalizeTaskName(task?.name) !== normalizeTaskName(desiredName)))) {
                if (existingNames.has(normalizeTaskName(desiredName))) {
                    let idx = 1;
                    while (existingNames.has(normalizeTaskName(`${desiredName}${idx}`))) idx++;
                    uniqueName = `${desiredName}${idx}`;
                }
            }

            const base = task ? structuredClone(task) : {};
            const newTask = {
                ...base,
                id: base.id || uuidv4(),
                name: uniqueName,
                commands: String(editorTemplate.find('.task_commands_edit').val() || '').trim(),
                interval: parseInt(String(editorTemplate.find('.task_interval_edit').val() || '0'), 10) || 0,
                floorType: editorTemplate.find('.task_floor_type_edit').val() || 'all',
                triggerTiming: editorTemplate.find('.task_trigger_timing_edit').val() || 'after_ai',
                disabled: !editorTemplate.find('.task_enabled_edit').prop('checked'),
                buttonActivated: editorTemplate.find('.task_button_activated_edit').prop('checked'),
                createdAt: base.createdAt || new Date().toISOString(),
            };
            const targetScope = String(editorTemplate.find('.task_type_edit').val() || initialScope);
            try {
                await saveTaskFromEditor(newTask, targetScope);
            } catch (error) {
                console.error('保存任务失败:', error);
                toastr?.error?.(`保存任务失败：${error?.message || error}`);
            }
        }
    });
}

function resetTaskEditorState() {
    state.currentEditingIndex = -1;
    state.currentEditingId = null;
    state.currentEditingScope = 'global';
    state.currentEditingOwner = 'global';
    state.currentEditingLocator = null;
}

async function saveTaskFromEditor(task, scope) {
    const targetScope = scope === 'character' || scope === 'preset' ? scope : 'global';
    const isManual = (task?.interval === 0);
    if (!task.name || (!isManual && !task.commands)) return;

    const isEditingExistingTask = state.currentEditingIndex >= 0 || !!state.currentEditingId;
    const previousScope = state.currentEditingScope || 'global';
    const previousOwner = state.currentEditingOwner || getTaskOwnerByScope(previousScope);
    const editingLocator = state.currentEditingLocator || { id: state.currentEditingId || null, index: state.currentEditingIndex };
    const taskTypeChanged = isEditingExistingTask && previousScope !== targetScope;
    const targetOwner = targetScope === previousScope ? previousOwner : getTaskOwnerByScope(targetScope);

    if (targetScope === 'preset' && targetOwner === 'no-preset') {
        toastr?.warning?.('请先选择一个OpenAI预设。');
        return;
    }

    if (taskTypeChanged) {
        const moveResult = await withTaskRepositoryReservations([
            { repository: getTaskRepositoryByScope(previousScope), owner: previousOwner },
            { repository: getTaskRepositoryByScope(targetScope), owner: targetOwner },
        ], () => commitTaskMove({
            saveTarget: () => mutateTaskListByScope(targetScope, draft => {
                const normalizedTaskId = String(task.id || '').trim();
                const existingIndex = normalizedTaskId
                    ? draft.findIndex(item => String(item?.id || '').trim() === normalizedTaskId)
                    : -1;
                if (existingIndex >= 0) throw new Error(`目标位置已存在相同 ID 的任务：${task.id}`);
                const nameWasChanged = String(task.name || '') !== String(editingLocator.legacyName || '');
                const [taskToSave] = nameWasChanged
                    ? allocateNamesInTaskDraft(
                        [task], draft, targetScope, targetOwner, {
                            excludedRecord: { scope: previousScope, owner: previousOwner, locator: editingLocator },
                        },
                    )
                    : [{ ...task, name: editingLocator.legacyName }];
                draft.push(taskToSave);
            }, { owner: targetOwner, reserved: true }),
            deleteSource: () => removeTaskByScope(previousScope, editingLocator, previousOwner, { reserved: true }),
        }));
        if (moveResult.sourceError) {
            console.error('任务已保存到目标位置，但删除原任务失败:', moveResult.sourceError);
            toastr?.error?.(`任务已保存到新位置，但原位置删除失败；已保留两份，请确认后手动删除。${moveResult.sourceError?.message ? `（${moveResult.sourceError.message}）` : ''}`);
        }
    } else {
        await mutateTaskListByScope(targetScope, draft => {
            const editingIndex = isEditingExistingTask ? findTaskIndex(draft, editingLocator) : -1;
            if (isEditingExistingTask && editingIndex < 0) throw new Error('任务已不存在');
            const current = editingIndex >= 0 ? draft[editingIndex] : null;
            const nameWasChanged = !current || String(task.name || '') !== String(current.name || '');
            const [taskToSave] = nameWasChanged
                ? allocateNamesInTaskDraft(
                    [task], draft, targetScope, targetOwner, {
                        excludedIndexes: editingIndex >= 0 ? [editingIndex] : [],
                    },
                )
                : [{ ...task, name: current.name }];
            if (editingIndex >= 0) draft[editingIndex] = taskToSave;
            else draft.push(taskToSave);
        }, { owner: targetOwner });
    }

    resetTaskEditorState();
    refreshUI();
}


async function editTask(index, scope) {
    const list = getTaskListByScope(scope);
    const task = list[index];
    if (!task) return;
    try {
        await showTaskEditor(task, true, scope);
    } catch (error) {
        console.error('读取任务失败:', error);
        toastr?.error?.(`读取任务失败：${error?.message || error}`);
    }
}

async function deleteTask(index, scope) {
    const owner = getTaskOwnerByScope(scope);
    const list = getTaskListByScope(scope, owner);
    const task = list[index];
    if (!task) return;

    try {
        const styleId = 'temp-dialog-style';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = '#dialogue_popup_ok, #dialogue_popup_cancel { width: auto !important; }';
            document.head.appendChild(style);
        }
        const result = await callPopup(`确定要删除任务 "${task.name}" 吗？`, 'confirm');
        document.getElementById(styleId)?.remove();
        if (result) {
            await removeTaskByScope(scope, captureTaskLocator(task, index), owner);
            if (state.currentEditingId === task.id || (state.currentEditingScope === scope && state.currentEditingIndex === index)) {
                resetTaskEditorState();
            }
            refreshUI();
        }
    } catch (error) {
        console.error('删除任务时出错:', error);
        toastr?.error?.(`删除任务失败：${error?.message || error}`);
        document.getElementById('temp-dialog-style')?.remove();
    }
}

const getAllTaskNames = () => allTasks().filter(t => !t.disabled).map(t => t.name);

// ═══════════════════════════════════════════════════════════════════════════
// 嵌入式任务
// ═══════════════════════════════════════════════════════════════════════════

async function checkEmbeddedTasks() {
    if (this_chid === undefined || this_chid === null) return;
    const avatar = characters[this_chid]?.avatar;
    const tasks = characters[this_chid]?.data?.extensions?.[TASKS_MODULE_NAME]?.tasks;

    if (Array.isArray(tasks) && tasks.length > 0 && avatar) {
        const settings = getSettings();
        settings.character_allowed_tasks ??= [];

        if (!settings.character_allowed_tasks.includes(avatar)) {
            const checkKey = `AlertTasks_${avatar}`;
            if (!accountStorage.getItem(checkKey)) {
                accountStorage.setItem(checkKey, 'true');
                let result;
                try {
                    const templateFilePath = `scripts/extensions/third-party/LittleWhiteBox/modules/scheduled-tasks/embedded-tasks.html`;
                    const templateContent = await fetch(templateFilePath).then(r => r.text());
                    const templateElement = $(templateContent);
                    const taskListContainer = templateElement.find('#embedded-tasks-list');
                    tasks.forEach(task => {
                        const taskPreview = $('#task_preview_template').children().first().clone();
                        taskPreview.find('.task-preview-name').text(task.name);
                        taskPreview.find('.task-preview-interval').text(`(每${task.interval}回合)`);
                        taskPreview.find('.task-preview-commands').text(task.commands);
                        taskListContainer.append(taskPreview);
                    });
                    result = await callGenericPopup(templateElement, POPUP_TYPE.CONFIRM, '', { okButton: '允许' });
                } catch {
                    result = await callGenericPopup(`此角色包含 ${tasks.length} 个定时任务。是否允许使用？`, POPUP_TYPE.CONFIRM, '', { okButton: '允许' });
                }
                if (result) {
                    settings.character_allowed_tasks.push(avatar);
                    saveSettingsDebounced();
                }
            }
        }
    }
    refreshTaskLists();
}

// ═══════════════════════════════════════════════════════════════════════════
// 云端任务
// ═══════════════════════════════════════════════════════════════════════════

const CLOUD_TASKS_API = 'https://task.whitelittlebox.qzz.io/';

async function fetchCloudTasks() {
    try {
        const response = await fetch(CLOUD_TASKS_API, {
            method: 'GET',
            headers: { 'Accept': 'application/json', 'X-Plugin-Key': 'xbaix', 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' },
            cache: 'no-store'
        });
        if (!response.ok) throw new Error(`HTTP错误: ${response.status}`);
        const data = await response.json();
        return data.items || [];
    } catch (error) {
        console.error('获取云端任务失败:', error);
        throw error;
    }
}

async function downloadAndImportCloudTask(taskUrl, taskType) {
    const targetOwners = captureTaskOwners();
    try {
        const response = await fetch(taskUrl);
        if (!response.ok) throw new Error(`下载失败: ${response.status}`);
        const taskData = await response.json();
        const jsonString = JSON.stringify(taskData);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const file = new File([blob], 'cloud_task.json', { type: 'application/json' });
        await importGlobalTasks(file, { targetOwners });
    } catch (error) {
        console.error('下载并导入云端任务失败:', error);
        await callGenericPopup(`导入失败: ${error.message}`, POPUP_TYPE.TEXT, '', { okButton: '确定' });
    }
}

async function showCloudTasksModal() {
    const modalTemplate = $('#cloud_tasks_modal_template').children().first().clone();
    const loadingEl = modalTemplate.find('.cloud-tasks-loading');
    const contentEl = modalTemplate.find('.cloud-tasks-content');
    const errorEl = modalTemplate.find('.cloud-tasks-error');

    callGenericPopup(modalTemplate, POPUP_TYPE.TEXT, '', { okButton: '关闭' });

    try {
        const cloudTasks = await fetchCloudTasks();
        if (!cloudTasks || cloudTasks.length === 0) throw new Error('云端没有可用的任务');
        const globalTasks = cloudTasks.filter(t => t.type === 'global');
        const characterTasks = cloudTasks.filter(t => t.type === 'character');

        const globalList = modalTemplate.find('.cloud-global-tasks');
        if (globalTasks.length === 0) {
            globalList.html('<div style="color: #888; padding: 10px;">暂无全局任务</div>');
        } else {
            globalTasks.forEach(task => { globalList.append(createCloudTaskItem(task)); });
        }

        const characterList = modalTemplate.find('.cloud-character-tasks');
        if (characterTasks.length === 0) {
            characterList.html('<div style="color: #888; padding: 10px;">暂无角色任务</div>');
        } else {
            characterTasks.forEach(task => { characterList.append(createCloudTaskItem(task)); });
        }

        loadingEl.hide();
        contentEl.show();
    } catch (error) {
        loadingEl.hide();
        errorEl.text(`加载失败: ${error.message}`).show();
    }
}

function createCloudTaskItem(taskInfo) {
    const item = $('#cloud_task_item_template').children().first().clone();
    item.find('.cloud-task-name').text(taskInfo.name || '未命名任务');
    item.find('.cloud-task-intro').text(taskInfo.简介 || taskInfo.intro || '无简介');
    item.find('.cloud-task-download').on('click', async function () {
        $(this).prop('disabled', true).find('i').removeClass('fa-download').addClass('fa-spinner fa-spin');
        try {
            await downloadAndImportCloudTask(taskInfo.url, taskInfo.type);
            $(this).find('i').removeClass('fa-spinner fa-spin').addClass('fa-check');
            $(this).find('small').text('已导入');
            setTimeout(() => {
                $(this).find('i').removeClass('fa-check').addClass('fa-download');
                $(this).find('small').text('导入');
                $(this).prop('disabled', false);
            }, 2000);
        } catch (error) {
            $(this).find('i').removeClass('fa-spinner fa-spin').addClass('fa-download');
            $(this).prop('disabled', false);
        }
    });
    return item;
}

// ═══════════════════════════════════════════════════════════════════════════
// 导入导出
// ═══════════════════════════════════════════════════════════════════════════


async function exportSingleTask(index, scope) {
    const owner = getTaskOwnerByScope(scope);
    const list = getTaskListByScope(scope, owner);
    if (index < 0 || index >= list.length) return;

    let task = list[index];
    if (!task.id) {
        const assignedId = uuidv4();
        const locator = captureTaskLocator(task, index);
        const result = await mutateTaskListByScope(scope, draft => {
            updateTaskInDraft(draft, locator, current => ({ ...current, id: assignedId }));
        }, { owner });
        task = result.after.find(item => item?.id === assignedId);
        if (!task) throw new Error('任务保存后无法重新定位');
    }
    if (scope === 'global' && task.id) {
        const commands = await TasksStorage.getStrict(task.id, null);
        if (commands === null) throw new Error(`全局任务“${task.name || '未命名'}”的脚本不存在`);
        task = { ...task, commands };
    }

    const fileName = `${scope}_task_${task?.name || 'unnamed'}_${new Date().toISOString().split('T')[0]}.json`;
    const fileData = JSON.stringify({ type: scope, exportDate: new Date().toISOString(), tasks: [task] }, null, 4);
    download(fileData, fileName, 'application/json');
}

async function importGlobalTasks(file, { targetOwners = captureTaskOwners() } = {}) {
    if (!file) return;
    try {
        const fileText = await getFileText(file);
        const raw = JSON.parse(fileText);
        const imported = parseTaskImport(raw, {
            createId: uuidv4,
            existingNames: allTasks().map(task => task?.name),
        });
        const fileType = imported.type;
        const tasksToImport = imported.tasks;

        if (fileType === 'character') {
            if (targetOwners.character === 'no-character') {
                toastr?.warning?.('角色任务请先在角色聊天界面导入。');
                return;
            }
            await mutateTaskListByScope('character', draft => {
                draft.push(...allocateNamesInTaskDraft(tasksToImport, draft, 'character', targetOwners.character));
            }, { owner: targetOwners.character });
        } else if (fileType === 'preset') {
            if (targetOwners.preset === 'no-preset') {
                toastr?.warning?.('请先选择一个OpenAI预设后再导入预设任务。');
                return;
            }
            await mutateTaskListByScope('preset', draft => {
                draft.push(...allocateNamesInTaskDraft(tasksToImport, draft, 'preset', targetOwners.preset));
            }, { owner: targetOwners.preset });
        } else {
            await mutateTaskListByScope('global', draft => {
                draft.push(...allocateNamesInTaskDraft(tasksToImport, draft, 'global', targetOwners.global));
            }, { owner: targetOwners.global });
        }

        refreshTaskLists();
        toastr?.success?.(`已导入 ${tasksToImport.length} 个任务`);
    } catch (error) {
        console.error('任务导入失败:', error);
        toastr?.error?.(`导入失败：${error.message}`);
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 调试工具
// ═══════════════════════════════════════════════════════════════════════════

function clearProcessedMessages() {
    state.processedMessagesSet.clear();
    const settings = getSettings();
    if (Array.isArray(settings.processedMessages) && settings.processedMessages.length > 0) {
        settings.processedMessages = [];
        saveSettingsDebounced();
    }
}

function clearTaskCooldown(taskName = null) {
    if (!taskName) {
        state.taskLastExecutionTime.clear();
        return;
    }
    state.taskLastExecutionTime.delete(taskName);
    const record = findTaskRecordByCommandName(taskName);
    if (record) {
        state.taskLastExecutionTime.delete(record.key);
        return;
    }
    const normalizedName = String(taskName ?? '').toLowerCase();
    for (const [key, entry] of state.taskLastExecutionTime.entries()) {
        if (String(entry?.name ?? '').toLowerCase() !== normalizedName) continue;
        state.taskLastExecutionTime.delete(key);
        break;
    }
}

function getTaskCooldownStatus() {
    const status = {};
    for (const [taskKey, entry] of state.taskLastExecutionTime.entries()) {
        const lastTime = typeof entry === 'number' ? entry : entry?.at;
        const name = typeof entry === 'number' ? taskKey : (entry?.name || taskKey);
        const remaining = Math.max(0, CONFIG.TASK_COOLDOWN - (nowMs() - lastTime));
        if (!Object.prototype.hasOwnProperty.call(status, name)) {
            status[name] = { lastExecutionTime: lastTime, remainingCooldown: remaining, isInCooldown: remaining > 0 };
        }
    }
    return status;
}

function getMemoryUsage() {
    return {
        processedMessages: state.processedMessagesSet.size,
        taskCooldowns: state.taskLastExecutionTime.size,
        globalTasks: getSettings().globalTasks.length,
        characterTasks: getCharacterTasks().length,
        scriptCache: TasksStorage.getCacheSize(),
        maxProcessedMessages: CONFIG.MAX_PROCESSED,
        maxCooldownEntries: CONFIG.MAX_COOLDOWN
    };
}

// ═══════════════════════════════════════════════════════════════════════════
// UI 刷新和清理
// ═══════════════════════════════════════════════════════════════════════════

function refreshUI() {
    refreshTaskLists();
    updateTaskBar();
}

function onMessageSwiped() {
    // 楼层始终从当前聊天快照读取；重 roll 不再操作运行锁或手工计数。
}

function onCharacterDeleted({ character }) {
    const avatar = character?.avatar;
    const settings = getSettings();
    if (avatar && settings.character_allowed_tasks?.includes(avatar)) {
        const index = settings.character_allowed_tasks.indexOf(avatar);
        if (index !== -1) {
            settings.character_allowed_tasks.splice(index, 1);
            saveSettingsDebounced();
        }
    }
}

function cleanup() {
    // 先关入口，再释放资源；cleanup 事件处理器可能同步回调 XBTasks.exec，
    // 不能让它在旧 runtime 正在销毁时重建一个无人负责的新 runtime。
    delete window.__XB_TASKS_INITIALIZED__;
    if (state.cleanupTimer) {
        clearInterval(state.cleanupTimer);
        state.cleanupTimer = null;
    }
    taskDispatcher?.close('module_cleanup');
    taskDispatcher = null;
    taskRuntime?.close('module_cleanup');
    taskRuntime = null;
    taskOrigin.reset();
    cancelAllManualResolutions('module_cleanup');
    mutatingTaskKeys.clear();
    state.processedMessagesSet.clear();
    state.taskLastExecutionTime.clear();
    TasksStorage.clearCache();

    hostAdapter?.stop();
    hostAdapter = null;
    window.removeEventListener('message', handleTaskMessage);
    document.removeEventListener('click', onTaskBarClick);
    $(window).off('beforeunload.tasks', cleanup);
    $('#scheduled_tasks_enabled, #add_global_task, #add_character_task, #add_preset_task, #toggle_task_bar, #import_global_tasks, #cloud_tasks_button, #import_tasks_file').off('.tasks');
    $('#global_tasks_list, #character_tasks_list, #preset_tasks_list').off('.tasks');

    try {
        const $qrButtons = $('#qr--bar .qr--buttons, #qr--bar, #qr-bar');
        $qrButtons.find('.xiaobaix-task-button').remove();
        if (cache.ownsBar && cache.bar?.isConnected) cache.bar.remove();
    } catch {}

    try { state.qrObserver?.disconnect(); } catch {}
    state.qrObserver = null;
    Object.assign(cache, { bar: null, btns: null, ownsBar: false, sig: '', ts: 0 });
    resetPresetTasksCache();
}

// ═══════════════════════════════════════════════════════════════════════════
// 公共 API
// ═══════════════════════════════════════════════════════════════════════════

(function () {
    if (window.__XB_TASKS_FACADE__) return;

    const norm = s => String(s ?? '').normalize('NFKC').replace(/[\u200B-\u200D\uFEFF]/g, '').trim().toLowerCase();

    function list(scope = 'all') {
        const g = getSettings().globalTasks || [];
        const c = getCharacterTasks() || [];
        const p = getPresetTasks() || [];
        const map = t => ({
            id: t.id, name: t.name, interval: t.interval,
            floorType: t.floorType, timing: t.triggerTiming, disabled: !!t.disabled
        });
        if (scope === 'global') return g.map(map);
        if (scope === 'character') return c.map(map);
        if (scope === 'preset') return p.map(map);
        return { global: g.map(map), character: c.map(map), preset: p.map(map) };
    }

    function find(name, scope = 'all') {
        const n = norm(name);
        if (scope !== 'character' && scope !== 'preset') {
            const g = getSettings().globalTasks || [];
            const gi = g.findIndex(t => norm(t?.name) === n);
            if (gi !== -1) return { scope: 'global', list: g, index: gi, task: g[gi] };
        }
        if (scope !== 'global' && scope !== 'preset') {
            const c = getCharacterTasks() || [];
            const ci = c.findIndex(t => norm(t?.name) === n);
            if (ci !== -1) return { scope: 'character', list: c, index: ci, task: c[ci] };
        }
        if (scope !== 'global' && scope !== 'character') {
            const p = getPresetTasks() || [];
            const pi = p.findIndex(t => norm(t?.name) === n);
            if (pi !== -1) return { scope: 'preset', list: p, index: pi, task: p[pi] };
        }
        return null;
    }

    async function setCommands(name, commands, opts = {}) {
        const { mode = 'replace', scope = 'all' } = opts;
        const hit = find(name, scope);
        if (!hit) throw new Error(`找不到任务: ${name}`);
        const owner = getTaskOwnerByScope(hit.scope);

        const locator = captureTaskLocator(hit.task, hit.index);
        const body = String(commands ?? '');
        const result = await mutateTaskListByScope(hit.scope, async draft => {
            const index = findTaskIndex(draft, locator);
            if (index < 0) throw new Error(`任务已不存在: ${name}`);
            const current = draft[index];
            let old = current.commands || '';
            if (hit.scope === 'global' && current.id) {
                old = await TasksStorage.getStrict(current.id, null);
                if (old === null) throw new Error(`全局任务“${current.name || '未命名'}”的脚本不存在`);
            }
            let newCommands;
            if (mode === 'append') newCommands = old ? (old + '\n' + body) : body;
            else if (mode === 'prepend') newCommands = old ? (body + '\n' + old) : body;
            else newCommands = body;
            draft[index] = { ...current, commands: newCommands };
            return current.name;
        }, { owner });
        refreshTaskLists();
        return { ok: true, scope: hit.scope, name: result.value };
    }

    async function setJS(name, jsCode, opts = {}) {
        const commands = `<<taskjs>>${jsCode}<</taskjs>>`;
        return await setCommands(name, commands, opts);
    }

    async function setProps(name, props, scope = 'all') {
        const hit = find(name, scope);
        if (!hit) throw new Error(`找不到任务: ${name}`);
        const owner = getTaskOwnerByScope(hit.scope);
        const locator = captureTaskLocator(hit.task, hit.index);
        const patch = structuredClone(props || {});
        if (Object.prototype.hasOwnProperty.call(patch, 'id')) throw new Error('任务 ID 不可修改');
        if (Object.prototype.hasOwnProperty.call(patch, 'timing')) {
            if (!Object.prototype.hasOwnProperty.call(patch, 'triggerTiming')) patch.triggerTiming = patch.timing;
            delete patch.timing;
        }
        const result = await mutateTaskListByScope(hit.scope, draft => updateTaskInDraft(
            draft,
            locator,
            current => ({ ...current, ...patch }),
        ), { owner });
        refreshTaskLists();
        return { ok: true, scope: hit.scope, name: result.value.name };
    }

    async function exec(name) {
        const record = findTaskRecordByName(name, 'all');
        if (!record) throw new Error(`找不到任务: ${name}`);
        return await withResolvedManualTask(record, (resolved, signal) => executeCommands(
            resolved.definition.commands,
            resolved.definition.name,
            { taskKey: resolved.key, taskRef: resolved.ref, signal },
        ), { allowDisabled: true });
    }

    async function dump(scope = 'all') {
        const g = await Promise.all((getSettings().globalTasks || []).map(async task => {
            if (!task.id && Object.prototype.hasOwnProperty.call(task, 'commands')) return structuredClone(task);
            const commands = await TasksStorage.getStrict(task.id, null);
            if (commands === null) throw new Error(`全局任务“${task.name || '未命名'}”的脚本不存在`);
            return { ...structuredClone(task), commands };
        }));
        const c = structuredClone(getCharacterTasks() || []);
        const p = structuredClone(getPresetTasks() || []);
        if (scope === 'global') return g;
        if (scope === 'character') return c;
        if (scope === 'preset') return p;
        return { global: g, character: c, preset: p };
    }

    window.XBTasks = {
        list, dump, find, setCommands, setJS, setProps, exec,
        get global() { return getSettings().globalTasks; },
        get character() { return getCharacterTasks(); },
        get preset() { return getPresetTasks(); },
    };

    try { if (window.top && window.top !== window) window.top.XBTasks = window.XBTasks; } catch {}
    window.__XB_TASKS_FACADE__ = true;
})();

window.xbqte = async (name) => {
    try {
        if (!name?.trim()) throw new Error('请提供任务名称');
        const record = findTaskRecordByCommandName(name);
        if (!record) throw new Error(`找不到名为 "${name}" 的任务`);
        if (record.definition.disabled) throw new Error(`任务 "${name}" 已被禁用`);
        const hadPendingResolution = manualResolutionControllers.has(record.key);
        cancelManualResolutions(record.key, 'manual_rerun');
        const restarted = getTaskRuntime().stopTask(record.key, 'manual_rerun');
        const cancelledDispatch = taskDispatcher?.cancel(record.key, 'manual_rerun') || false;
        if (restarted || cancelledDispatch || hadPendingResolution) {
            clearTaskCooldown(record.key);
        }
        const result = await withResolvedManualTask(record, async (resolved, signal) => {
            const task = resolved.definition;
            if (isTaskInCooldown(resolved.key)) {
                const entry = state.taskLastExecutionTime.get(resolved.key);
                const lastTime = typeof entry === 'number' ? entry : entry?.at;
                const remaining = Math.max(0, CONFIG.TASK_COOLDOWN - (nowMs() - lastTime));
                throw new Error(`任务 "${name}" 仍在冷却中，剩余 ${remaining}ms`);
            }
            setTaskCooldown(resolved.key, task.name);
            return await executeCommands(task.commands, task.name, { taskKey: resolved.key, taskRef: resolved.ref, signal });
        });
        const task = record.definition;
        return result || `已执行任务: ${task.name}`;
    } catch (error) {
        console.error(`执行任务失败: ${error.message}`);
        throw error;
    }
};

window.xbtaskreset = async () => {
    resetAllTaskRuns();
    return '已清理所有运行中任务、动态回调、冷却和执行状态';
};

window.setScheduledTaskInterval = async (name, interval) => {
    if (!name?.trim()) throw new Error('请提供任务名称');
    const intervalNum = parseInt(interval);
    if (isNaN(intervalNum) || intervalNum < 0 || intervalNum > 99999) {
        throw new Error('间隔必须是 0-99999 之间的数字');
    }

    const settings = getSettings();
    const gi = settings.globalTasks.findIndex(t => t.name.toLowerCase() === name.toLowerCase());
    if (gi !== -1) {
        const owner = getTaskOwnerByScope('global');
        const locator = captureTaskLocator(settings.globalTasks[gi], gi);
        await mutateTaskListByScope('global', draft => updateTaskInDraft(
            draft,
            locator,
            task => ({ ...task, interval: intervalNum }),
        ), { owner });
        refreshTaskLists();
        return `已设置全局任务 "${name}" 的间隔为 ${intervalNum === 0 ? '手动激活' : `每${intervalNum}楼层`}`;
    }

    const cts = getCharacterTasks();
    const ci = cts.findIndex(t => t.name.toLowerCase() === name.toLowerCase());
    if (ci !== -1) {
        const owner = getTaskOwnerByScope('character');
        const locator = captureTaskLocator(cts[ci], ci);
        await mutateTaskListByScope('character', draft => updateTaskInDraft(
            draft,
            locator,
            task => ({ ...task, interval: intervalNum }),
        ), { owner });
        refreshTaskLists();
        return `已设置角色任务 "${name}" 的间隔为 ${intervalNum === 0 ? '手动激活' : `每${intervalNum}楼层`}`;
    }
    throw new Error(`找不到名为 "${name}" 的任务`);
};

Object.assign(window, {
    clearTasksProcessedMessages: clearProcessedMessages,
    clearTaskCooldown,
    getTaskCooldownStatus,
    getTasksMemoryUsage: getMemoryUsage
});

// ═══════════════════════════════════════════════════════════════════════════
// 斜杠命令
// ═══════════════════════════════════════════════════════════════════════════

function registerSlashCommands() {
    try {
        SlashCommandParser.addCommandObject(SlashCommand.fromProps({
            name: 'xbqte',
            callback: async (args, value) => {
                if (!value) return '请提供任务名称。用法: /xbqte 任务名称';
                try { return await window.xbqte(value); } catch (error) { return `错误: ${error.message}`; }
            },
            unnamedArgumentList: [SlashCommandArgument.fromProps({
                description: '要执行的任务名称',
                typeList: [ARGUMENT_TYPE.STRING],
                isRequired: true,
                enumProvider: getAllTaskNames
            })],
            helpString: '执行指定名称的定时任务。例如: /xbqte 我的任务名称'
        }));

        SlashCommandParser.addCommandObject(SlashCommand.fromProps({
            name: 'xbtaskreset',
            callback: async () => {
                try { return await window.xbtaskreset(); } catch (error) { return `错误: ${error.message}`; }
            },
            helpString: '清理所有运行中任务、动态回调、冷却和执行状态'
        }));

        SlashCommandParser.addCommandObject(SlashCommand.fromProps({
            name: 'xbset',
            callback: async (namedArgs, taskName) => {
                const name = String(taskName || '').trim();
                if (!name) throw new Error('请提供任务名称');

                const settings = getSettings();
                let task = null, isCharacter = false, taskIndex = -1;

                taskIndex = settings.globalTasks.findIndex(t => t.name.toLowerCase() === name.toLowerCase());
                if (taskIndex !== -1) {
                    task = settings.globalTasks[taskIndex];
                } else {
                    const cts = getCharacterTasks();
                    taskIndex = cts.findIndex(t => t.name.toLowerCase() === name.toLowerCase());
                    if (taskIndex !== -1) {
                        task = cts[taskIndex];
                        isCharacter = true;
                    }
                }
                if (!task) throw new Error(`找不到任务 "${name}"`);

                const changed = [];
                const patch = {};

                if (namedArgs.status !== undefined) {
                    const val = String(namedArgs.status).toLowerCase();
                    if (val === 'on' || val === 'true') { patch.disabled = false; changed.push('状态=启用'); }
                    else if (val === 'off' || val === 'false') { patch.disabled = true; changed.push('状态=禁用'); }
                    else throw new Error('status 仅支持 on/off');
                }

                if (namedArgs.interval !== undefined) {
                    const num = parseInt(namedArgs.interval);
                    if (isNaN(num) || num < 0 || num > 99999) throw new Error('interval 必须为 0-99999');
                    patch.interval = num;
                    changed.push(`间隔=${num}`);
                }

                if (namedArgs.timing !== undefined) {
                    const val = String(namedArgs.timing).toLowerCase();
                    const valid = ['after_ai', 'before_user', 'any_message', 'initialization', 'character_init', 'plugin_init', 'only_this_floor', 'chat_changed'];
                    if (!valid.includes(val)) throw new Error(`timing 必须为: ${valid.join(', ')}`);
                    patch.triggerTiming = val;
                    changed.push(`时机=${val}`);
                }

                if (namedArgs.floorType !== undefined) {
                    const val = String(namedArgs.floorType).toLowerCase();
                    if (!['all', 'user', 'llm'].includes(val)) throw new Error('floorType 必须为: all, user, llm');
                    patch.floorType = val;
                    changed.push(`楼层=${val}`);
                }

                if (changed.length === 0) throw new Error('未提供要修改的参数');

                const targetScope = isCharacter ? 'character' : 'global';
                const owner = getTaskOwnerByScope(targetScope);
                const locator = captureTaskLocator(task, taskIndex);
                await mutateTaskListByScope(targetScope, draft => updateTaskInDraft(
                    draft,
                    locator,
                    current => ({ ...current, ...patch }),
                ), { owner });
                refreshTaskLists();

                return `已更新任务 "${name}": ${changed.join(', ')}`;
            },
            namedArgumentList: [
                SlashCommandNamedArgument.fromProps({ name: 'status', description: '启用/禁用', typeList: [ARGUMENT_TYPE.STRING], enumList: ['on', 'off'] }),
                SlashCommandNamedArgument.fromProps({ name: 'interval', description: '楼层间隔(0=手动)', typeList: [ARGUMENT_TYPE.NUMBER] }),
                SlashCommandNamedArgument.fromProps({ name: 'timing', description: '触发时机', typeList: [ARGUMENT_TYPE.STRING], enumList: ['after_ai', 'before_user', 'any_message', 'initialization', 'character_init', 'plugin_init', 'only_this_floor', 'chat_changed'] }),
                SlashCommandNamedArgument.fromProps({ name: 'floorType', description: '楼层类型', typeList: [ARGUMENT_TYPE.STRING], enumList: ['all', 'user', 'llm'] }),
            ],
            unnamedArgumentList: [SlashCommandArgument.fromProps({ description: '任务名称', typeList: [ARGUMENT_TYPE.STRING], isRequired: true, enumProvider: getAllTaskNames })],
            helpString: `设置任务属性。用法: /xbset status=on/off interval=数字 timing=时机 floorType=类型 任务名`
        }));
    } catch (error) {
        console.error("注册斜杠命令时出错:", error);
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 初始化
// ═══════════════════════════════════════════════════════════════════════════

async function initTasks() {
    if (window.__XB_TASKS_INITIALIZED__) {
        console.log('[小白X任务] 已经初始化，跳过重复注册');
        return;
    }
    window.__XB_TASKS_INITIALIZED__ = true;

    taskOrigin.reset();
    scheduleCleanup();
    if (!extension_settings[EXT_ID].tasks) {
        extension_settings[EXT_ID].tasks = structuredClone(defaultSettings);
    }
    // 兼容 v2.5.0-v3.0.6：旧版误把当前会话的去重状态写进了全局设置。
    // 在升级入口清空一次；此后该字段只作为现行文件格式中的空占位保留。
    clearProcessedMessages();

    if (window.registerModuleCleanup) {
        window.registerModuleCleanup('tasks', cleanup);
    }

    // eslint-disable-next-line no-restricted-syntax -- legacy task bridge; keep behavior unchanged.
    window.addEventListener('message', handleTaskMessage);
    document.addEventListener('click', onTaskBarClick);
    state.qrObserver = new MutationObserver(updateTaskBar);
    state.qrObserver.observe(document.body, { childList: true, subtree: true });

    $('#scheduled_tasks_enabled').on('input.tasks', e => {
        const enabled = $(e.target).prop('checked');
        getSettings().enabled = enabled;
        saveSettingsDebounced();
        try { createTaskBar(); } catch {}
    });

    $('#add_global_task').on('click.tasks', () => showTaskEditor(null, false, 'global'));
    $('#add_character_task').on('click.tasks', () => showTaskEditor(null, false, 'character'));
    $('#add_preset_task').on('click.tasks', () => showTaskEditor(null, false, 'preset'));
    $('#toggle_task_bar').on('click.tasks', toggleTaskBarVisibility);
    $('#import_global_tasks').on('click.tasks', () => $('#import_tasks_file').trigger('click'));
    $('#cloud_tasks_button').on('click.tasks', () => showCloudTasksModal());
    $('#import_tasks_file').on('change.tasks', function (e) {
        const file = e.target.files[0];
        if (file) { importGlobalTasks(file); $(this).val(''); }
    });

    $('#global_tasks_list')
        .on('input.tasks', '.disable_task', async function () {
            const owner = getTaskOwnerByScope('global');
            const list = getTaskListByScope('global', owner);
            const idx = getTaskIndexFromItem($(this).closest('.task-item'), list);
            if (idx !== -1) {
                const disabled = $(this).prop('checked');
                const locator = captureTaskLocator(list[idx], idx);
                try {
                    await mutateTaskListByScope('global', draft => updateTaskInDraft(
                        draft,
                        locator,
                        task => ({ ...task, disabled }),
                    ), { owner });
                    refreshTaskLists();
                } catch (error) {
                    $(this).prop('checked', !disabled);
                    toastr?.error?.(`保存任务失败：${error?.message || error}`);
                }
            }
        })
        .on('click.tasks', '.edit_task', function () {
            const list = getSettings().globalTasks;
            const idx = getTaskIndexFromItem($(this).closest('.task-item'), list);
            if (idx !== -1) editTask(idx, 'global');
        })
        .on('click.tasks', '.export_task', function () {
            const list = getSettings().globalTasks;
            const idx = getTaskIndexFromItem($(this).closest('.task-item'), list);
            if (idx !== -1) exportSingleTask(idx, 'global').catch(error => {
                console.error('导出任务失败:', error);
                toastr?.error?.(`导出任务失败：${error?.message || error}`);
            });
        })
        .on('click.tasks', '.delete_task', function () {
            const list = getSettings().globalTasks;
            const idx = getTaskIndexFromItem($(this).closest('.task-item'), list);
            if (idx !== -1) deleteTask(idx, 'global');
        });

    $('#character_tasks_list')
        .on('input.tasks', '.disable_task', async function () {
            const owner = getTaskOwnerByScope('character');
            const list = getTaskListByScope('character', owner);
            const idx = getTaskIndexFromItem($(this).closest('.task-item'), list);
            if (idx !== -1) {
                const disabled = $(this).prop('checked');
                const locator = captureTaskLocator(list[idx], idx);
                try {
                    await mutateTaskListByScope('character', draft => updateTaskInDraft(
                        draft,
                        locator,
                        task => ({ ...task, disabled }),
                    ), { owner });
                    refreshTaskLists();
                } catch (error) {
                    $(this).prop('checked', !disabled);
                    toastr?.error?.(`保存任务失败：${error?.message || error}`);
                }
            }
        })
        .on('click.tasks', '.edit_task', function () {
            const list = getCharacterTasks();
            const idx = getTaskIndexFromItem($(this).closest('.task-item'), list);
            if (idx !== -1) editTask(idx, 'character');
        })
        .on('click.tasks', '.export_task', function () {
            const list = getCharacterTasks();
            const idx = getTaskIndexFromItem($(this).closest('.task-item'), list);
            if (idx !== -1) exportSingleTask(idx, 'character').catch(error => {
                console.error('导出任务失败:', error);
                toastr?.error?.(`导出任务失败：${error?.message || error}`);
            });
        })
        .on('click.tasks', '.delete_task', function () {
            const list = getCharacterTasks();
            const idx = getTaskIndexFromItem($(this).closest('.task-item'), list);
            if (idx !== -1) deleteTask(idx, 'character');
        });

    $('#preset_tasks_list')
        .on('input.tasks', '.disable_task', async function () {
            const owner = getTaskOwnerByScope('preset');
            const list = getTaskListByScope('preset', owner);
            const idx = getTaskIndexFromItem($(this).closest('.task-item'), list);
            if (idx !== -1) {
                const disabled = $(this).prop('checked');
                const locator = captureTaskLocator(list[idx], idx);
                try {
                    await mutateTaskListByScope('preset', draft => updateTaskInDraft(
                        draft,
                        locator,
                        task => ({ ...task, disabled }),
                    ), { owner });
                    refreshTaskLists();
                } catch (error) {
                    $(this).prop('checked', !disabled);
                    toastr?.error?.(`保存任务失败：${error?.message || error}`);
                }
            }
        })
        .on('click.tasks', '.edit_task', function () {
            const list = getPresetTasks();
            const idx = getTaskIndexFromItem($(this).closest('.task-item'), list);
            if (idx !== -1) editTask(idx, 'preset');
        })
        .on('click.tasks', '.export_task', function () {
            const list = getPresetTasks();
            const idx = getTaskIndexFromItem($(this).closest('.task-item'), list);
            if (idx !== -1) exportSingleTask(idx, 'preset').catch(error => {
                console.error('导出任务失败:', error);
                toastr?.error?.(`导出任务失败：${error?.message || error}`);
            });
        })
        .on('click.tasks', '.delete_task', function () {
            const list = getPresetTasks();
            const idx = getTaskIndexFromItem($(this).closest('.task-item'), list);
            if (idx !== -1) deleteTask(idx, 'preset');
        });

    $('#scheduled_tasks_enabled').prop('checked', getSettings().enabled);
    refreshTaskLists();

    hostAdapter = createScheduledTasksHostAdapter({
        events,
        eventTypes: event_types,
        handlers: {
            onGenerationStarted,
            onGenerationEnded,
            onMessageReceived,
            onUserMessage,
            onChatChanged,
            onChatCreated,
            onMessageDeleted,
            onMessageSwiped,
            onCharacterDeleted,
            onPresetChanged,
            onMainApiChanged,
        },
    });
    hostAdapter.start();

    $(window).on('beforeunload.tasks', cleanup);
    if (!slashCommandsRegistered) {
        registerSlashCommands();
        slashCommandsRegistered = true;
    }
    setTimeout(() => {
        if (window.__XB_TASKS_INITIALIZED__) checkEmbeddedTasks();
    }, 1000);

    setTimeout(() => {
        if (!window.__XB_TASKS_INITIALIZED__) return;
        try { checkAndExecuteTasks('plugin_initialized'); } catch (e) { console.debug(e); }
    }, 0);
}

export { initTasks };
