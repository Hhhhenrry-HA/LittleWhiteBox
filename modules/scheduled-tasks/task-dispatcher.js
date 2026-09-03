function normalizeRequests(records, occurrence, epoch, getVersion) {
    const seen = new Set();
    const requests = [];
    for (const record of Array.isArray(records) ? records : []) {
        if (!record?.key || seen.has(record.key)) continue;
        seen.add(record.key);
        requests.push({
            key: record.key,
            ref: record.ref,
            epoch,
            version: getVersion(record.key),
            occurrence,
            mergedCount: 0,
        });
    }
    return requests;
}

export class ScheduledTaskDispatcher {
    constructor({ execute, onError = () => {}, onMerge = () => {}, onStateChange = () => {} } = {}) {
        if (typeof execute !== 'function') throw new TypeError('dispatcher execute 必须是函数');
        this.execute = execute;
        this.onError = onError;
        this.onMerge = onMerge;
        this.onStateChange = onStateChange;
        this.epoch = 0;
        this.active = null;
        this.pending = new Map();
        this.versions = new Map();
        this.closed = false;
    }

    get isRunning() {
        return this.active !== null;
    }

    get pendingSize() {
        return this.pending.size;
    }

    get signal() {
        return this.active?.abortController?.signal || null;
    }

    invalidate(reason = 'context_changed') {
        this.epoch++;
        this.pending.clear();
        this.versions.clear();
        if (this.active) {
            this.active.invalidated = true;
            this.active.abortController.abort(reason);
            this.active.currentRequest?.abortController.abort(reason);
        }
        this.#notify();
        return this.epoch;
    }

    cancel(key, reason = 'task_changed') {
        const taskKey = String(key || '');
        if (!taskKey) return false;
        this.versions.set(taskKey, this.#version(taskKey) + 1);
        const removedPending = this.pending.delete(taskKey);
        const current = this.active?.currentRequest;
        const abortedCurrent = current?.key === taskKey;
        if (abortedCurrent) current.abortController.abort(reason);
        if (removedPending || abortedCurrent) this.#notify();
        return removedPending || abortedCurrent;
    }

    close(reason = 'module_cleanup') {
        this.closed = true;
        this.invalidate(reason);
    }

    async submit(records, occurrence = {}) {
        if (this.closed) return { status: 'closed' };
        const requests = normalizeRequests(records, Object.freeze({ ...occurrence }), this.epoch, key => this.#version(key));

        if (this.active) {
            this.#merge(requests);
            return { status: 'pending', count: requests.length };
        }

        const queued = this.#takePendingForEpoch(this.epoch);
        for (const request of requests) {
            const existing = queued.find(item => item.key === request.key);
            if (existing) {
                existing.occurrence = request.occurrence;
                existing.mergedCount++;
            } else {
                queued.push(request);
            }
        }
        if (queued.length === 0) return { status: 'empty' };
        return await this.#start(queued, this.epoch);
    }

    #merge(requests) {
        for (const request of requests) {
            const existing = this.pending.get(request.key);
            if (existing && existing.epoch === request.epoch) {
                existing.occurrence = request.occurrence;
                existing.mergedCount++;
                this.onMerge({ ...existing });
            } else {
                this.pending.set(request.key, request);
            }
        }
        this.#notify();
    }

    #takePendingForEpoch(epoch) {
        const requests = [];
        for (const [key, request] of this.pending.entries()) {
            if (request.epoch !== epoch) continue;
            this.pending.delete(key);
            requests.push(request);
        }
        return requests;
    }

    async #start(primary, epoch) {
        const cycle = {
            epoch,
            abortController: new AbortController(),
            invalidated: false,
            phase: 'primary',
            currentRequest: null,
            promise: null,
        };
        this.active = cycle;
        this.#notify();

        cycle.promise = this.#runCycle(primary, cycle)
            .finally(() => {
                if (this.active === cycle) this.active = null;
                this.#notify();
                this.#handOffToNewEpoch(cycle.epoch);
            });
        return await cycle.promise;
    }

    /**
     * 旧周期在失效后才真正结束，期间到达的新 epoch 请求已经并入 pending。
     * 这里做一次交接，否则切聊天时提交的 chat_changed / character_init 任务
     * 会一直躺在 pending 里，等下一条消息才被顺带取出，甚至被下一次 invalidate 清掉。
     *
     * 只交接跨 epoch 的请求：同 epoch 的 catch-up 余量仍留给下一次宿主事件，
     * 补跑永远只补一轮，不退化成 while (pending) 的无限排空。
     */
    #handOffToNewEpoch(finishedEpoch) {
        if (this.closed || this.active) return;
        if (this.epoch === finishedEpoch) return;
        const queued = this.#takePendingForEpoch(this.epoch);
        if (queued.length === 0) return;
        void this.#start(queued, this.epoch).catch(() => {});
    }

    async #runCycle(primary, cycle) {
        const primaryResults = await this.#runBatch(primary, cycle, false);
        if (cycle.invalidated || cycle.epoch !== this.epoch) {
            return { status: 'invalidated', primary: primaryResults, catchUp: [] };
        }

        cycle.phase = 'catch_up';
        const catchUp = this.#takePendingForEpoch(cycle.epoch);
        const catchUpResults = await this.#runBatch(catchUp, cycle, true);
        if (cycle.invalidated || cycle.epoch !== this.epoch) {
            return { status: 'invalidated', primary: primaryResults, catchUp: catchUpResults };
        }
        return { status: 'completed', primary: primaryResults, catchUp: catchUpResults };
    }

    async #runBatch(requests, cycle, catchUp) {
        const results = [];
        for (const request of requests) {
            if (cycle.invalidated || cycle.epoch !== this.epoch || cycle.abortController.signal.aborted) break;
            if (request.version !== this.#version(request.key)) continue;
            const abortController = new AbortController();
            cycle.currentRequest = { key: request.key, version: request.version, abortController };
            try {
                const value = await this.execute({
                    ...request,
                    catchUp,
                    signal: abortController.signal,
                });
                results.push({ key: request.key, status: 'fulfilled', value });
            } catch (error) {
                results.push({ key: request.key, status: 'rejected', error });
                const requestCancelled = abortController.signal.aborted || request.version !== this.#version(request.key);
                if (!cycle.invalidated && cycle.epoch === this.epoch && !requestCancelled) {
                    try { this.onError(error, request); } catch {}
                }
            } finally {
                if (cycle.currentRequest?.abortController === abortController) cycle.currentRequest = null;
            }
        }
        return results;
    }

    #version(key) {
        return this.versions.get(key) || 0;
    }

    #notify() {
        try {
            this.onStateChange({
                running: this.isRunning,
                pending: this.pending.size,
                epoch: this.epoch,
                phase: this.active?.phase || 'idle',
            });
        } catch {}
    }
}
