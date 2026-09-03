import { pickTaskFloor } from './task-model.js';

export function shouldSkipTaskContext(taskTiming, triggerContext) {
    if (taskTiming === 'character_init') return triggerContext !== 'chat_created';
    if (taskTiming === 'plugin_init') return triggerContext !== 'plugin_initialized';
    if (taskTiming === 'chat_changed') return triggerContext !== 'chat_changed';
    if (taskTiming === 'only_this_floor' || taskTiming === 'any_message') {
        return triggerContext !== 'before_user' && triggerContext !== 'after_ai';
    }
    return taskTiming !== triggerContext;
}

export function matchesTaskInterval(task, counts) {
    const interval = Number(task?.interval);
    const currentFloor = pickTaskFloor(task?.floorType || 'all', counts);
    if (currentFloor <= 0 || !Number.isFinite(interval) || interval <= 0) return false;
    if (task?.triggerTiming === 'only_this_floor') return currentFloor === interval;
    return currentFloor % interval === 0;
}

export function selectDueTaskRecords(records, context) {
    const {
        triggerContext = 'after_ai',
        counts = { all: 0, user: 0, llm: 0 },
        coolingDownKeys = new Set(),
    } = context || {};

    return (Array.isArray(records) ? records : []).filter(record => {
        const task = record?.definition;
        if (!task || task.disabled || coolingDownKeys.has(record.key)) return false;
        const timing = task.triggerTiming || 'after_ai';
        if (timing === 'chat_changed') return triggerContext === 'chat_changed';
        if (timing === 'character_init') return triggerContext === 'chat_created';
        if (timing === 'plugin_init') return triggerContext === 'plugin_initialized';
        const interval = Number(task.interval);
        if (!Number.isFinite(interval) || interval <= 0) return false;
        if (shouldSkipTaskContext(timing, triggerContext)) return false;
        return matchesTaskInterval(task, counts);
    });
}
