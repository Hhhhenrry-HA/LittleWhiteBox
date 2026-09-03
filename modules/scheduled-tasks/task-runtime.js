import { awaitWithAbort, createAbortError, isAbortError, throwIfAborted } from './task-abort.js';

function normalizeKey(value, fallback = 'AnonymousTask') {
    const key = String(value || '').trim();
    return key || fallback;
}

/**
 * 任务脚本公开契约：`taskContext.codeSig` 必须与历史版本逐位一致，
 * 存量脚本用它判断"代码是否变了、要不要重新初始化"。不得替换算法。
 */
function legacyCodeSig(source) {
    try {
        const text = String(source || '');
        let hash = 5381;
        for (let index = 0; index < text.length; index++) {
            hash = ((hash << 5) + hash) ^ text.charCodeAt(index);
        }
        return (hash >>> 0).toString(36);
    } catch {
        return Math.random().toString(36).slice(2);
    }
}

function settleCallback(value, onError) {
    if (value && typeof value.then === 'function') value.catch(onError);
}

export class ScheduledTaskRuntime {
    constructor({ executeSlashCommand, createId, log = {}, getChatId = () => '', origin = null } = {}) {
        if (typeof executeSlashCommand !== 'function') throw new TypeError('executeSlashCommand 必须是函数');
        if (typeof createId !== 'function') throw new TypeError('createId 必须是函数');
        this.executeSlashCommand = executeSlashCommand;
        this.createId = createId;
        this.log = log;
        this.getChatId = getChatId;
        this.origin = origin;
        this.runs = new Map();
        this.floorCallbacks = new Map();
        this.epoch = 0;
        this.activeExecutions = 0;
        this.closed = false;
    }

    get size() {
        return this.runs.size;
    }

    get callbackCount() {
        return this.floorCallbacks.size;
    }

    get isExecuting() {
        return this.activeExecutions > 0;
    }

    listFloorCallbacks() {
        const entries = [];
        for (const entry of this.floorCallbacks.values()) {
            if (!this.#isCurrent(entry.run)) continue;
            entries.push({
                id: entry.id,
                taskKey: entry.run.key,
                taskName: entry.run.name,
                chatId: entry.run.chatId,
                options: { ...entry.options },
            });
        }
        return entries;
    }

    async invokeFloorCallback(id, context, signal) {
        const entry = this.floorCallbacks.get(id);
        if (!entry || !this.#isCurrent(entry.run)) return null;
        const run = entry.run;
        throwIfAborted(signal);
        throwIfAborted(run.abortController.signal);

        // 必须在调用回调之前登记在途：回调可能同步注销自己，
        // 否则 run 会在自己的回调还没跑完时就被判定空闲并中止。
        run.pendingCallbacks++;
        try {
            const owned = awaitWithAbort(entry.callback(context), run.abortController.signal);
            const result = await awaitWithAbort(owned, signal);
            throwIfAborted(signal);
            throwIfAborted(run.abortController.signal);
            return result;
        } finally {
            run.pendingCallbacks = Math.max(0, run.pendingCallbacks - 1);
            this.#releaseIfIdle(run);
        }
    }

    async executeCommands(commands, { taskKey, taskName = 'AnonymousTask', taskRef = null, signal = null } = {}) {
        const source = String(commands || '');
        if (this.closed) throw createAbortError('定时任务模块已清理');
        throwIfAborted(signal);

        const key = normalizeKey(taskKey, normalizeKey(taskName));
        const previousRun = this.runs.get(key) || null;
        if (previousRun) this.#disposeRun(previousRun, 'rerun');
        if (!source.trim()) return null;

        // 历史契约：普通任务重跑前会等待上一段 TaskJS 真正落定；只有 [x]
        // 允许不等旧实例。abort 能让受管操作尽快退出，但不能假设任意用户
        // Promise 都合作式响应，否则两次普通脚本会在后台重叠。
        if (previousRun && !normalizeKey(taskName).startsWith('[x]')) {
            await Promise.allSettled([...previousRun.unsettledBodies]);
            if (this.closed) throw createAbortError('定时任务模块已清理');
            throwIfAborted(signal);
        }

        const run = this.#createRun(key, taskName, taskRef, signal);
        this.runs.set(key, run);
        this.activeExecutions++;

        try {
            return await this.#processCommands(source, run);
        } finally {
            run.commandActive = false;
            this.activeExecutions = Math.max(0, this.activeExecutions - 1);
            this.#releaseIfIdle(run);
        }
    }

    stopTask(taskKey, reason = 'task_stopped') {
        const key = normalizeKey(taskKey, '');
        if (!key) return false;
        const run = this.runs.get(key);
        if (!run) return false;
        this.#disposeRun(run, reason);
        return true;
    }

    stopByName(taskName, reason = 'task_stopped') {
        const name = normalizeKey(taskName, '');
        let count = 0;
        for (const run of [...this.runs.values()]) {
            if (run.name !== name) continue;
            this.#disposeRun(run, reason);
            count++;
        }
        return count;
    }

    stopScope(scope, reason = 'scope_changed') {
        let count = 0;
        for (const run of [...this.runs.values()]) {
            let runScope = run.ref?.scope;
            if (!runScope) {
                try { runScope = JSON.parse(run.key)?.[0]; } catch {}
            }
            if (runScope !== scope) continue;
            this.#disposeRun(run, reason);
            count++;
        }
        return count;
    }

    invalidate(reason = 'context_changed') {
        this.epoch++;
        this.stopAll(reason);
        return this.epoch;
    }

    stopAll(reason = 'module_cleanup') {
        for (const run of [...this.runs.values()]) this.#disposeRun(run, reason);
        this.floorCallbacks.clear();
    }

    close(reason = 'module_cleanup') {
        this.closed = true;
        this.invalidate(reason);
    }

    getStats() {
        let timeouts = 0;
        let intervals = 0;
        let listeners = 0;
        for (const run of this.runs.values()) {
            timeouts += run.timeouts.size;
            intervals += run.intervals.size;
            listeners += run.listeners.size;
        }
        return {
            runs: this.runs.size,
            callbacks: this.floorCallbacks.size,
            activeExecutions: this.activeExecutions,
            timeouts,
            intervals,
            listeners,
        };
    }

    /**
     * 所有斜杠命令的唯一出口：命令执行期间宿主发出的事件归属于任务。
     * 登记必须覆盖命令的同步阶段，因此在调用前进入、在底层 Promise 落定后退出，
     * 而不是在 awaitWithAbort 提前中断时退出。
     */
    #invokeSlashCommand(command, run) {
        const originToken = this.origin?.beginCommand(command);
        let promise;
        try {
            promise = Promise.resolve(this.executeSlashCommand(command, {
                signal: run?.abortController?.signal || null,
            }));
        } catch (error) {
            this.origin?.endCommand(originToken);
            throw error;
        }
        const release = () => this.origin?.endCommand(originToken);
        promise.then(release, release);
        return promise;
    }

    #createRun(key, taskName, taskRef, outerSignal) {
        const abortController = new AbortController();
        const run = {
            key,
            rawName: taskName,
            name: normalizeKey(taskName),
            ref: taskRef ? { ...taskRef } : null,
            epoch: this.epoch,
            chatId: String(this.getChatId() || ''),
            abortController,
            outerSignal,
            outerAbortHandler: null,
            timeouts: new Set(),
            intervals: new Set(),
            listeners: new Set(),
            callbackIds: new Set(),
            pendingBodies: 0,
            pendingCallbacks: 0,
            unsettledBodies: new Set(),
            commandActive: true,
            cleanupRecords: [],
            cleanupDispatched: false,
        };
        if (outerSignal) {
            run.outerAbortHandler = () => this.#disposeRun(run, outerSignal.reason || 'dispatch_invalidated');
            outerSignal.addEventListener('abort', run.outerAbortHandler, { once: true });
        }
        return run;
    }

    #isCurrent(run) {
        return !!run && !run.abortController.signal.aborted && run.epoch === this.epoch && this.runs.get(run.key) === run;
    }

    #assertCurrent(run) {
        if (!this.#isCurrent(run)) throw createAbortError('任务上下文已失效');
        throwIfAborted(run.outerSignal);
    }

    /** 监听登记的唯一删除入口：DOM、内部登记、外部 signal 处理器必须同时退场 */
    #detachListener(run, entry) {
        if (!run.listeners.delete(entry)) return false;
        try { entry.target.removeEventListener(entry.type, entry.wrapped, entry.capture); } catch {}
        if (entry.signal && entry.onSignalAbort) {
            try { entry.signal.removeEventListener('abort', entry.onSignalAbort); } catch {}
        }
        entry.onSignalAbort = null;
        return true;
    }

    #disposeRun(run, reason) {
        if (!run) return;
        if (this.runs.get(run.key) === run) this.runs.delete(run.key);
        try { run.abortController.abort(reason); } catch {}
        try {
            if (run.outerSignal && run.outerAbortHandler) {
                run.outerSignal.removeEventListener('abort', run.outerAbortHandler);
            }
        } catch {}
        for (const id of run.timeouts) clearTimeout(id);
        for (const id of run.intervals) clearInterval(id);
        for (const entry of [...run.listeners]) this.#detachListener(run, entry);
        for (const id of run.callbackIds) this.floorCallbacks.delete(id);
        run.timeouts.clear();
        run.intervals.clear();
        run.listeners.clear();
        run.callbackIds.clear();
        if (run.cleanupRecords.length > 0 && !run.cleanupDispatched) {
            const bodies = [...run.unsettledBodies];
            if (bodies.length === 0) this.#dispatchCleanup(run);
            else void Promise.allSettled(bodies).then(() => this.#dispatchCleanup(run));
        }
    }

    #dispatchCleanup(run) {
        if (run.cleanupDispatched || run.cleanupRecords.length === 0) return;
        run.cleanupDispatched = true;
        for (const detail of run.cleanupRecords) {
            try {
                globalThis.window?.dispatchEvent?.(new CustomEvent('xiaobaix-task-cleaned', {
                    detail: { ...detail },
                }));
            } catch {}
        }
    }

    #releaseIfIdle(run) {
        if (!this.#isCurrent(run)) return;
        if (run.commandActive || run.pendingBodies > 0 || run.pendingCallbacks > 0 || run.timeouts.size > 0 || run.intervals.size > 0 || run.listeners.size > 0 || run.callbackIds.size > 0) return;
        this.#disposeRun(run, 'completed');
    }

    async #processCommands(commands, run) {
        const jsTagRegex = /<<taskjs>>([\s\S]*?)<<\/taskjs>>/g;
        let lastIndex = 0;
        let result = null;
        let match;

        while ((match = jsTagRegex.exec(commands)) !== null) {
            this.#assertCurrent(run);
            const beforeJs = commands.slice(lastIndex, match.index).trim();
            if (beforeJs) {
                result = await awaitWithAbort(this.#invokeSlashCommand(beforeJs, run), run.abortController.signal);
                this.#assertCurrent(run);
            }
            const jsCode = match[1].trim();
            if (jsCode) result = await this.#executeTaskJS(jsCode, run);
            lastIndex = match.index + match[0].length;
        }

        this.#assertCurrent(run);
        if (lastIndex === 0) {
            result = await awaitWithAbort(this.#invokeSlashCommand(commands, run), run.abortController.signal);
            this.#assertCurrent(run);
        } else {
            const remaining = commands.slice(lastIndex).trim();
            if (remaining) {
                result = await awaitWithAbort(this.#invokeSlashCommand(remaining, run), run.abortController.signal);
                this.#assertCurrent(run);
            }
        }
        return result;
    }

    async #executeTaskJS(jsCode, run) {
        const isBackground = run.name.startsWith('[x]');
        run.pendingBodies++;
        const body = this.#runTaskJSBody(jsCode, run)
            .catch(error => {
                if (!isAbortError(error)) {
                    this.log.error?.('taskjs', { task: run.key, name: run.name }, error);
                    console.error(`[任务JS执行错误] ${error?.message || error}`);
                }
                if (!isBackground && !isAbortError(error)) return null;
                return null;
            })
            .finally(() => {
                run.pendingBodies = Math.max(0, run.pendingBodies - 1);
                this.#releaseIfIdle(run);
            });

        if (isBackground) {
            settleCallback(body, error => this.log.error?.('taskjs-background', { task: run.key }, error));
            return null;
        }
        return await body;
    }

    async #runTaskJSBody(jsCode, run) {
        this.#assertCurrent(run);
        const runtime = this;
        const abortSignal = run.abortController.signal;
        const codeSig = legacyCodeSig(jsCode);
        const stableKey = String(run.rawName ?? '').trim() || `js-${codeSig}`;
        // 旧版以 JS 块为清理事件单位；运行时所有权现在按整任务隔离，
        // 但每个已启动块的公开签名仍须在该 run 退场时逐一通知。
        run.cleanupRecords.push({ taskName: stableKey, signature: codeSig });
        const onCallbackError = error => {
            if (!isAbortError(error)) this.log.error?.('task-resource', { task: run.key }, error);
        };
        const invokeResourceCallback = (callback, receiver, args) => {
            // Acquire ownership before invoking user code: it may synchronously
            // call its own off()/clearTimeoutSafe() before returning a Promise.
            run.pendingCallbacks++;
            let result;
            try {
                result = callback?.apply(receiver, args);
            } catch (error) {
                onCallbackError(error);
                run.pendingCallbacks = Math.max(0, run.pendingCallbacks - 1);
                this.#releaseIfIdle(run);
                return;
            }
            if (!result || typeof result.then !== 'function') {
                run.pendingCallbacks = Math.max(0, run.pendingCallbacks - 1);
                this.#releaseIfIdle(run);
                return;
            }
            Promise.resolve(result)
                .catch(onCallbackError)
                .finally(() => {
                    run.pendingCallbacks = Math.max(0, run.pendingCallbacks - 1);
                    this.#releaseIfIdle(run);
                });
        };

        const setTimeoutSafe = (callback, delay, ...args) => {
            this.#assertCurrent(run);
            const id = setTimeout(() => {
                run.timeouts.delete(id);
                if (!this.#isCurrent(run)) return;
                invokeResourceCallback(callback, undefined, args);
                this.#releaseIfIdle(run);
            }, delay);
            run.timeouts.add(id);
            return id;
        };
        const clearTimeoutSafe = id => {
            clearTimeout(id);
            run.timeouts.delete(id);
            this.#releaseIfIdle(run);
        };
        const setIntervalSafe = (callback, delay, ...args) => {
            this.#assertCurrent(run);
            const id = setInterval(() => {
                if (!this.#isCurrent(run)) return;
                invokeResourceCallback(callback, undefined, args);
            }, delay);
            run.intervals.add(id);
            return id;
        };
        const clearIntervalSafe = id => {
            clearInterval(id);
            run.intervals.delete(id);
            this.#releaseIfIdle(run);
        };
        const removeListener = (target, type, handler, options = {}) => {
            const capture = !!(options === true || options?.capture);
            for (const entry of run.listeners) {
                if (entry.target !== target || entry.type !== type || entry.capture !== capture) continue;
                if (entry.original !== handler && entry.wrapped !== handler) continue;
                if (runtime.#detachListener(run, entry)) runtime.#releaseIfIdle(run);
                return;
            }
            try { target?.removeEventListener?.(type, handler, options); } catch {}
        };
        const addListener = (target, type, handler, options = {}) => {
            this.#assertCurrent(run);
            if (!target?.addEventListener || typeof handler !== 'function') return () => {};
            const normalized = typeof options === 'boolean' ? { capture: options } : { ...(options || {}) };
            const capture = !!normalized.capture;
            const externalSignal = normalized.signal || null;
            // 已经中止的 signal 不会有任何事件，也不该让 run 因为一条死登记而无法释放。
            if (externalSignal?.aborted) return () => {};
            // 与原生 addEventListener 一致：相同 type/handler/capture 的重复
            // 登记不会产生第二次回调，也不能留下第二条虚假的运行时所有权。
            const existing = [...run.listeners].find(entry => (
                entry.target === target
                && entry.type === type
                && entry.original === handler
                && entry.capture === capture
            ));
            if (existing) {
                return () => {
                    if (runtime.#detachListener(run, existing)) runtime.#releaseIfIdle(run);
                };
            }

            const entry = { target, type, original: handler, wrapped: null, capture, signal: externalSignal, onSignalAbort: null };
            entry.wrapped = function (...args) {
                if (normalized.once) runtime.#detachListener(run, entry);
                if (!run.abortController.signal.aborted) {
                    invokeResourceCallback(handler, this, args);
                }
                if (normalized.once) runtime.#releaseIfIdle(run);
            };
            if (externalSignal) {
                entry.onSignalAbort = () => {
                    if (runtime.#detachListener(run, entry)) runtime.#releaseIfIdle(run);
                };
                externalSignal.addEventListener('abort', entry.onSignalAbort, { once: true });
            }
            run.listeners.add(entry);
            try {
                target.addEventListener(type, entry.wrapped, normalized);
            } catch (error) {
                runtime.#detachListener(run, entry);
                throw error;
            }
            return () => {
                if (runtime.#detachListener(run, entry)) runtime.#releaseIfIdle(run);
            };
        };
        const addFloorListener = (callback, options = {}) => {
            this.#assertCurrent(run);
            if (typeof callback !== 'function') throw new TypeError('callback 必须是函数');
            // callback id 是旧版可观察值；内部所有权仍由 runKey/run.callbackIds 隔离。
            const id = `${stableKey}_fl_${this.createId()}`;
            const entry = {
                id,
                run,
                callback,
                options: {
                    interval: Number.isFinite(parseInt(options.interval)) ? parseInt(options.interval) : 0,
                    timing: options.timing || 'after_ai',
                    floorType: options.floorType || 'all',
                },
            };
            run.callbackIds.add(id);
            this.floorCallbacks.set(id, entry);
            return () => {
                run.callbackIds.delete(id);
                this.floorCallbacks.delete(id);
                this.#releaseIfIdle(run);
            };
        };
        const STscript = async command => {
            this.#assertCurrent(run);
            if (!command) return { error: '命令为空' };
            // 教程和存量脚本里存在 fire-and-forget 的 STscript 调用。即使调用方
            // 没有 await，已启动的命令仍属于本次 run；正常结束前保活，切聊天
            // 或重跑时则由同一个 abortSignal 取消。
            run.pendingCallbacks++;
            try {
                const normalized = String(command).startsWith('/') ? String(command) : `/${command}`;
                const result = await awaitWithAbort(this.#invokeSlashCommand(normalized, run), abortSignal);
                this.#assertCurrent(run);
                return result;
            } finally {
                run.pendingCallbacks = Math.max(0, run.pendingCallbacks - 1);
                this.#releaseIfIdle(run);
            }
        };

        const taskContext = {
            taskName: String(run.rawName || 'AnonymousTask'),
            // 历史公开契约：存量脚本用它做 localStorage 键和内容比对，语义必须保持"任务名"。
            stableKey,
            codeSig,
            // 内部身份（scope + owner + taskId），单实例、资源清理与 pending 都按它隔离。
            runKey: run.key,
            chatId: run.chatId,
            log: (message, extra) => this.log.info?.('taskjs', { task: stableKey, msg: String(message ?? ''), extra }),
            warn: (message, extra) => this.log.warn?.('taskjs', { task: stableKey, msg: String(message ?? ''), extra }),
            error: (message, error, extra) => this.log.error?.('taskjs', { task: stableKey, msg: String(message ?? ''), extra }, error),
        };

        // eslint-disable-next-line no-new-func -- 任务脚本是该功能公开且需兼容的运行时输入。
        const fn = new Function(
            'taskContext', 'ctx', 'STscript', 'addFloorListener',
            'addListener', 'removeListener', 'setTimeoutSafe', 'clearTimeoutSafe', 'setIntervalSafe', 'clearIntervalSafe', 'abortSignal',
            `return (async () => { ${jsCode} })();`,
        );
        const body = Promise.resolve(fn(
            taskContext, taskContext, STscript, addFloorListener,
            addListener, removeListener, setTimeoutSafe, clearTimeoutSafe, setIntervalSafe, clearIntervalSafe, abortSignal,
        ));
        run.unsettledBodies.add(body);
        void body.finally(() => run.unsettledBodies.delete(body)).catch(() => {});
        const result = await awaitWithAbort(body, abortSignal);
        this.#assertCurrent(run);
        return result;
    }
}
