export const TASK_SCOPES = Object.freeze(['global', 'character', 'preset']);
export const TASK_FLOOR_TYPES = Object.freeze(['all', 'user', 'llm']);
export const TASK_TIMINGS = Object.freeze([
    'after_ai',
    'before_user',
    'any_message',
    'character_init',
    'plugin_init',
    'only_this_floor',
    'chat_changed',
]);

export function normalizeTaskTiming(value) {
    const timing = String(value || '').toLowerCase();
    return timing === 'initialization' ? 'character_init' : timing;
}

export function normalizeTaskName(value) {
    return String(value ?? '').normalize('NFKC').replace(/[\u200B-\u200D\uFEFF]/g, '').trim().toLowerCase();
}

export function allocateUniqueTaskName(name, usedNames) {
    const desired = String(name || '').trim();
    const used = usedNames instanceof Set ? usedNames : new Set();
    let candidate = desired;
    let suffix = 1;
    while (used.has(normalizeTaskName(candidate))) candidate = `${desired}${suffix++}`;
    used.add(normalizeTaskName(candidate));
    return candidate;
}

export function allocateTaskNamesForDraft(tasks, draft, { existingNames = [], excludedIndexes = [] } = {}) {
    const excluded = new Set(excludedIndexes);
    const usedNames = new Set(existingNames.map(normalizeTaskName));
    for (let index = 0; index < (Array.isArray(draft) ? draft.length : 0); index++) {
        if (!excluded.has(index)) usedNames.add(normalizeTaskName(draft[index]?.name));
    }
    return (Array.isArray(tasks) ? tasks : []).map(task => ({
        ...task,
        name: allocateUniqueTaskName(task?.name, usedNames),
    }));
}

export function parseTaskImport(raw, { createId, now = () => new Date(), existingNames = [] } = {}) {
    if (typeof createId !== 'function') throw new TypeError('导入任务需要 ID 生成器');
    let incomingTasks;
    let type = 'global';
    if (Array.isArray(raw)) {
        incomingTasks = raw;
    } else if (raw && Array.isArray(raw.tasks)) {
        incomingTasks = raw.tasks;
        if (TASK_SCOPES.includes(raw.type)) type = raw.type;
    } else if (raw && typeof raw === 'object' && raw.name && (raw.commands || raw.interval !== undefined)) {
        incomingTasks = [raw];
        if (TASK_SCOPES.includes(raw.type)) type = raw.type;
    } else {
        throw new Error('无效的任务文件格式');
    }

    const validFloorTypes = new Set(TASK_FLOOR_TYPES);
    const validTimings = new Set([...TASK_TIMINGS, 'initialization']);
    const usedNames = new Set(existingNames.map(normalizeTaskName));
    const importedAt = now().toISOString();
    const tasks = incomingTasks
        .filter(task => String(task?.name || '').trim() && (String(task?.commands || '').trim() || task.interval === 0))
        .map(source => ({
            ...structuredClone(source),
            id: createId(),
            name: allocateUniqueTaskName(source.name, usedNames),
            commands: String(source.commands || '').trim(),
            interval: Number.isFinite(+source.interval) ? Math.max(0, Math.min(99999, +source.interval)) : 0,
            floorType: validFloorTypes.has(source.floorType) ? source.floorType : 'all',
            triggerTiming: validTimings.has(source.triggerTiming) ? source.triggerTiming : 'after_ai',
            disabled: !!source.disabled,
            buttonActivated: !!source.buttonActivated,
            createdAt: source.createdAt || importedAt,
            importedAt,
            x: source.x && typeof source.x === 'object' ? structuredClone(source.x) : {},
        }));
    if (tasks.length === 0) throw new Error('没有可导入的任务');
    return { type, tasks };
}

export function prepareTasksForPersistence(tasks, createId) {
    if (typeof createId !== 'function') throw new TypeError('保存任务需要 ID 生成器');
    return (Array.isArray(tasks) ? tasks : []).filter(Boolean).map(task => ({
        ...structuredClone(task),
        id: String(task.id || '').trim() || createId(),
    }));
}

export function countChatFloors(messages) {
    let all = 0;
    let user = 0;
    let llm = 0;
    if (!Array.isArray(messages)) return { all, user, llm };

    for (const message of messages) {
        all++;
        if (message?.is_system) continue;
        if (message?.is_user) user++;
        else llm++;
    }
    return { all, user, llm };
}

export function pickTaskFloor(floorType, counts) {
    const source = counts || {};
    if (floorType === 'user') return Math.max(0, Number(source.user || 0) - 1);
    if (floorType === 'llm') return Math.max(0, Number(source.llm || 0) - 1);
    return Math.max(0, Number(source.all || 0) - 1);
}

function hashText(value) {
    let hash = 2166136261;
    const text = String(value || '');
    for (let index = 0; index < text.length; index++) {
        hash ^= text.charCodeAt(index);
        hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(36);
}

export function createTaskRef(task, { scope, owner = '', index = 0 } = {}) {
    const normalizedScope = scope === 'dynamic' ? 'dynamic' : (TASK_SCOPES.includes(scope) ? scope : 'global');
    const persistedId = String(task?.id || '').trim();
    const runtimeId = persistedId || `legacy-${index}-${hashText(JSON.stringify([
        task?.name || '',
        task?.createdAt || '',
        task?.interval ?? '',
        task?.floorType || '',
        task?.triggerTiming || '',
    ]))}`;

    return Object.freeze({
        scope: normalizedScope,
        owner: String(owner || normalizedScope),
        id: runtimeId,
        persistedId: persistedId || null,
    });
}

export function taskRefKey(ref) {
    return JSON.stringify([ref?.scope || 'global', ref?.owner || '', ref?.id || '']);
}

export function createTaskRecord(task, source) {
    const ref = createTaskRef(task, source);
    return Object.freeze({
        key: taskRefKey(ref),
        ref,
        definition: Object.freeze({
            ...task,
            triggerTiming: normalizeTaskTiming(task?.triggerTiming) || 'after_ai',
        }),
    });
}
