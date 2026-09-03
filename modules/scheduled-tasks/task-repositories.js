import { awaitWithAbort, throwIfAborted } from './task-abort.js';
import { createTaskRecord, taskRefKey } from './task-model.js';

class ScheduledTaskRepository {
    constructor({ scope, getOwner, getTasks, saveTasks } = {}) {
        this.scope = scope;
        this.getOwner = getOwner;
        this.getTasks = getTasks;
        this.saveTasks = saveTasks;
        this.mutationQueues = new Map();
    }

    owner() {
        return String(this.getOwner?.() || `no-${this.scope}`);
    }

    list(owner = this.owner()) {
        const tasks = this.getTasks?.(owner);
        return Array.isArray(tasks) ? tasks : [];
    }

    records(owner = this.owner(), tasks = this.list(owner)) {
        return tasks.map((task, index) => createTaskRecord(task, {
            scope: this.scope,
            owner,
            index,
        }));
    }

    async mutate(mutator, { owner = this.owner() } = {}) {
        if (typeof mutator !== 'function') throw new TypeError('任务修改必须是函数');
        if (typeof this.saveTasks !== 'function') throw new Error(`${this.scope} 任务仓储不可写`);

        // owner 必须在入队时捕获。队列真正执行时，UI 可能已经切到了另一个
        // 角色或预设；此处仍应读写用户发起操作时的那个任务集合。
        const capturedOwner = String(owner || `no-${this.scope}`);
        return await this.#enqueue(capturedOwner, () => this.#commitMutation(mutator, capturedOwner));
    }

    async mutateReserved(mutator, { owner = this.owner() } = {}) {
        if (typeof mutator !== 'function') throw new TypeError('任务修改必须是函数');
        if (typeof this.saveTasks !== 'function') throw new Error(`${this.scope} 任务仓储不可写`);
        const capturedOwner = String(owner || `no-${this.scope}`);
        return await this.#commitMutation(mutator, capturedOwner);
    }

    reserve(owner = this.owner()) {
        const capturedOwner = String(owner || `no-${this.scope}`);
        let markAcquired;
        let releaseHold;
        let released = false;
        const acquired = new Promise(resolve => { markAcquired = resolve; });
        const hold = new Promise(resolve => { releaseHold = resolve; });
        const completion = this.#enqueue(capturedOwner, async () => {
            markAcquired();
            await hold;
        });
        return {
            acquired,
            completion,
            release: () => {
                if (released) return;
                released = true;
                releaseHold();
            },
        };
    }

    async #commitMutation(mutator, capturedOwner) {
        const before = structuredClone(this.list(capturedOwner));
        const draft = structuredClone(before);
        const value = await mutator(draft, { scope: this.scope, owner: capturedOwner });
        const submitted = structuredClone(draft);
        const saved = await this.saveTasks(draft, capturedOwner);
        const after = structuredClone(Array.isArray(saved) ? saved : this.list(capturedOwner));
        return { scope: this.scope, owner: capturedOwner, before, submitted, after, value };
    }

    #enqueue(capturedOwner, operation) {
        const previous = this.mutationQueues.get(capturedOwner) || Promise.resolve();
        const result = previous.then(operation, operation);
        const tail = result.then(() => undefined, () => undefined);
        this.mutationQueues.set(capturedOwner, tail);
        void tail.then(() => {
            if (this.mutationQueues.get(capturedOwner) === tail) this.mutationQueues.delete(capturedOwner);
        });
        return result;
    }

    async resolve(record) {
        return record;
    }
}

export async function withTaskRepositoryReservations(entries, operation) {
    if (typeof operation !== 'function') throw new TypeError('任务仓储预留需要操作函数');
    const unique = [];
    for (const entry of Array.isArray(entries) ? entries : []) {
        const repository = entry?.repository;
        if (!repository || typeof repository.reserve !== 'function') throw new TypeError('无效的任务仓储预留');
        const owner = String(entry.owner || repository.owner());
        if (unique.some(item => item.repository === repository && item.owner === owner)) continue;
        unique.push({ repository, owner });
    }
    const reservations = unique.map(item => item.repository.reserve(item.owner));
    try {
        await Promise.all(reservations.map(item => item.acquired));
        return await operation();
    } finally {
        reservations.forEach(item => item.release());
        await Promise.all(reservations.map(item => item.completion));
    }
}

export class GlobalTaskRepository extends ScheduledTaskRepository {
    constructor({ getTasks, saveTasks, loadCommands } = {}) {
        super({ scope: 'global', getOwner: () => 'global', getTasks, saveTasks });
        this.loadCommands = loadCommands;
    }

    async resolve(record) {
        if (!record.ref.persistedId) {
            if (Object.prototype.hasOwnProperty.call(record.definition, 'commands')) return record;
            throw new Error(`全局任务“${record.definition.name || '未命名'}”缺少持久化 ID，且没有内嵌脚本`);
        }
        const commands = await this.loadCommands(record.ref.persistedId);
        if (commands === null || commands === undefined) {
            throw new Error(`全局任务“${record.definition.name || '未命名'}”的脚本不存在`);
        }
        return Object.freeze({
            ...record,
            definition: Object.freeze({ ...record.definition, commands: String(commands) }),
        });
    }
}

export class CharacterTaskRepository extends ScheduledTaskRepository {
    constructor({ getOwner, getTasks, saveTasks } = {}) {
        super({ scope: 'character', getOwner, getTasks, saveTasks });
    }
}

export class PresetTaskRepository extends ScheduledTaskRepository {
    constructor({ getOwner, getTasks, saveTasks } = {}) {
        super({ scope: 'preset', getOwner, getTasks, saveTasks });
    }
}

export class ScheduledTaskCatalog {
    constructor({ repositories = [] } = {}) {
        this.repositories = [...repositories];
    }

    records() {
        return this.repositories.flatMap(repository => repository.records());
    }

    find(refOrKey) {
        const key = typeof refOrKey === 'string' ? refOrKey : taskRefKey(refOrKey);
        return this.records().find(record => record.key === key) || null;
    }

    async resolve(refOrKey, { signal } = {}) {
        throwIfAborted(signal);
        const record = this.find(refOrKey);
        if (!record) throw new Error('任务已不存在或所属上下文已改变');
        const repository = this.repositories.find(item => item.scope === record.ref.scope && item.owner() === record.ref.owner);
        if (!repository) throw new Error('任务所属上下文已改变');
        // 脚本读取可能是网络请求，卡住时不能一直占着 dispatcher 的执行权。
        // 底层请求无法物理取消，但它的结果不再被消费，也就不会启动已失效的任务。
        return await awaitWithAbort(repository.resolve(record), signal);
    }
}

export async function commitTaskMove({ saveTarget, deleteSource } = {}) {
    if (typeof saveTarget !== 'function' || typeof deleteSource !== 'function') {
        throw new TypeError('任务移动需要目标保存与源删除操作');
    }
    await saveTarget();
    try {
        await deleteSource();
        return { moved: true, duplicateRetained: false, sourceError: null };
    } catch (sourceError) {
        return { moved: true, duplicateRetained: true, sourceError };
    }
}

export async function commitGlobalTaskRemoval({ saveMetadata, deleteCommands } = {}) {
    if (typeof saveMetadata !== 'function' || typeof deleteCommands !== 'function') {
        throw new TypeError('全局任务删除需要元数据保存与脚本清理操作');
    }
    await saveMetadata();
    try {
        await deleteCommands();
        return { removed: true, cleanupError: null };
    } catch (cleanupError) {
        return { removed: true, cleanupError };
    }
}
