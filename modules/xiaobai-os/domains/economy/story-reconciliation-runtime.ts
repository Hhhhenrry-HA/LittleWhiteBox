import type { XiaobaiOsAppRuntime } from '../../types.js';
import type { XiaobaiOsStoryAdapter } from '../../host/story-adapter.js';
import {
    buildStoryFingerprint,
    storyMessagesEqual,
    type StorySnapshot,
} from '../../host/story-fingerprint.js';
import type { EconomyRepository } from './repository.js';
import type { StoryWriteGate } from './story-write-gate.js';

export type EconomyStoryReconciliationStatus = 'ready' | 'reconciling' | 'blocked';

export interface EconomyStoryReconciliationState {
    identityKey: string;
    status: EconomyStoryReconciliationStatus;
    message: string;
}

export interface EconomyStoryReconciliationRuntime extends Pick<
    XiaobaiOsAppRuntime,
    'startBackground' | 'stopBackground' | 'handleChatChanged' | 'cancelAll'
> {
    reconcileNow: () => Promise<EconomyStoryReconciliationState>;
    getState: () => EconomyStoryReconciliationState;
    subscribe: (listener: (state: EconomyStoryReconciliationState) => void) => () => void;
}

interface RuntimeOptions {
    retryDelayMs?: number;
    timeoutMs?: number;
    now?: () => number;
    setTimer?: (callback: () => void, milliseconds: number) => ReturnType<typeof setTimeout>;
    clearTimer?: (timer: ReturnType<typeof setTimeout>) => void;
}

function waitForTimer(
    milliseconds: number,
    setTimer: NonNullable<RuntimeOptions['setTimer']>,
    clearTimer: NonNullable<RuntimeOptions['clearTimer']>,
): { promise: Promise<void>; cancel: () => void } {
    let timer: ReturnType<typeof setTimeout> | null = null;
    let settle: (() => void) | null = null;
    const promise = new Promise<void>((resolve) => {
        settle = resolve;
        timer = setTimer(resolve, milliseconds);
    });
    return {
        promise,
        cancel() {
            if (timer !== null) {clearTimer(timer);}
            timer = null;
            settle?.();
            settle = null;
        },
    };
}

function describeError(error: unknown): string {
    return error instanceof Error ? error.message : String(error || 'unknown_error');
}

export function createEconomyStoryReconciliationRuntime(
    adapter: XiaobaiOsStoryAdapter,
    economy: EconomyRepository,
    storyGate: StoryWriteGate,
    {
        retryDelayMs = 250,
        timeoutMs = 15_000,
        now = Date.now,
        setTimer = globalThis.setTimeout,
        clearTimer = globalThis.clearTimeout,
    }: RuntimeOptions = {},
): EconomyStoryReconciliationRuntime {
    const listeners = new Set<(state: EconomyStoryReconciliationState) => void>();
    let state: EconomyStoryReconciliationState = { identityKey: '', status: 'ready', message: '' };
    let unsubscribe: (() => void) | null = null;
    let generation = 0;
    let activeWait: ReturnType<typeof waitForTimer> | null = null;
    let currentTask: Promise<EconomyStoryReconciliationState> | null = null;
    let activeGate: { identityKey: string; token: number } | null = null;

    function publish(next: EconomyStoryReconciliationState): EconomyStoryReconciliationState {
        state = Object.freeze({ ...next });
        for (const listener of listeners) {listener(state);}
        return state;
    }

    function releaseActiveGate(): void {
        if (!activeGate) {return;}
        storyGate.release(activeGate.identityKey, activeGate.token);
        activeGate = null;
    }

    function blockStory(identityKey: string): number {
        const token = storyGate.block(identityKey);
        activeGate = { identityKey, token };
        return token;
    }

    function cancel(): void {
        generation += 1;
        activeWait?.cancel();
        activeWait = null;
        currentTask = null;
        releaseActiveGate();
    }

    async function runReconciliation(
        snapshot: StorySnapshot,
        taskGeneration: number,
        gateToken: number,
    ): Promise<EconomyStoryReconciliationState> {
        publish({ identityKey: snapshot.identityKey, status: 'reconciling', message: '剧情已变化，正在核对账本' });
        const deadline = now() + timeoutMs;
        try {
            let persisted: StorySnapshot | null = null;
            while (taskGeneration === generation && now() <= deadline) {
                const candidate = await adapter.readPersistedCurrent(snapshot.identityKey);
                if (candidate.identityKey === snapshot.identityKey && storyMessagesEqual(candidate.messages, snapshot.messages)) {
                    persisted = candidate;
                    break;
                }
                activeWait = waitForTimer(retryDelayMs, setTimer, clearTimer);
                await activeWait.promise;
                activeWait = null;
            }
            if (taskGeneration !== generation) {return state;}
            if (!persisted) {throw new Error('story_persistence_confirmation_timeout');}
            const fingerprint = await buildStoryFingerprint(persisted);
            if (taskGeneration !== generation) {return state;}
            await economy.reconcileCurrent(fingerprint, {
                beforeCommit() {
                    const live = adapter.captureCurrent();
                    if (
                        taskGeneration !== generation ||
                        !live ||
                        live.identityKey !== snapshot.identityKey ||
                        !storyMessagesEqual(live.messages, snapshot.messages)
                    ) {
                        throw new Error('story_changed_during_reconciliation');
                    }
                },
            });
            if (taskGeneration !== generation) {return state;}
            if (activeGate?.identityKey === snapshot.identityKey && activeGate.token === gateToken) {
                releaseActiveGate();
            } else {
                storyGate.release(snapshot.identityKey, gateToken);
            }
            return publish({ identityKey: snapshot.identityKey, status: 'ready', message: '' });
        } catch (error) {
            if (taskGeneration !== generation) {return state;}
            return publish({
                identityKey: snapshot.identityKey,
                status: 'blocked',
                message: `账本核对暂停：${describeError(error)}`,
            });
        }
    }

    function reconcileNow(): Promise<EconomyStoryReconciliationState> {
        const snapshot = adapter.captureCurrent();
        if (!snapshot) {
            cancel();
            return Promise.resolve(publish({ identityKey: '', status: 'blocked', message: '请先打开一个聊天' }));
        }
        if (!economy.hasCurrent()) {
            cancel();
            storyGate.clear(snapshot.identityKey);
            return Promise.resolve(publish({ identityKey: snapshot.identityKey, status: 'ready', message: '' }));
        }
        if (currentTask && state.identityKey === snapshot.identityKey && state.status === 'reconciling') {
            return currentTask;
        }
        cancel();
        const taskGeneration = generation;
        const gateToken = blockStory(snapshot.identityKey);
        currentTask = runReconciliation(snapshot, taskGeneration, gateToken).finally(() => {
            if (taskGeneration === generation) {currentTask = null;}
        });
        return currentTask;
    }

    function handleStoryChange(): void {
        cancel();
        const snapshot = adapter.captureCurrent();
        const gateToken = snapshot ? blockStory(snapshot.identityKey) : 0;
        let hasEconomy = false;
        try {
            hasEconomy = economy.hasCurrent();
        } catch (error) {
            publish({
                identityKey: snapshot?.identityKey || '',
                status: 'blocked',
                message: `账本读取失败：${describeError(error)}`,
            });
            return;
        }
        if (!hasEconomy) {
            if (snapshot) {
                releaseActiveGate();
            }
            publish({ identityKey: snapshot?.identityKey || '', status: 'ready', message: '' });
            return;
        }
        if (!snapshot) {
            publish({ identityKey: '', status: 'blocked', message: '请先打开一个聊天' });
            return;
        }
        const taskGeneration = generation;
        currentTask = runReconciliation(snapshot, taskGeneration, gateToken).finally(() => {
            if (taskGeneration === generation) {currentTask = null;}
        });
        void currentTask;
    }

    function startBackground(): void {
        if (!unsubscribe) {unsubscribe = adapter.subscribeChanges(handleStoryChange);}
    }

    function stopBackground(): void {
        cancel();
        storyGate.clear();
        unsubscribe?.();
        unsubscribe = null;
        listeners.clear();
    }

    function handleChatChanged(): void {
        cancel();
        storyGate.clear();
        const snapshot = adapter.captureCurrent();
        publish({ identityKey: snapshot?.identityKey || '', status: 'ready', message: '' });
    }

    return Object.freeze({
        startBackground,
        stopBackground,
        handleChatChanged,
        cancelAll() {
            cancel();
            storyGate.clear();
        },
        reconcileNow,
        getState: () => state,
        subscribe(listener: (next: EconomyStoryReconciliationState) => void) {
            listeners.add(listener);
            return () => listeners.delete(listener);
        },
    });
}
