import type { XiaobaiOsAppRuntime, XiaobaiOsChatData } from '../types.js';
import type { XiaobaiOsChatDataStore } from './chat-data-store.js';
import type { XiaobaiOsStoryAdapter } from './story-adapter.js';
import {
    buildStoryFingerprint,
    storyMessagesEqual,
    type StoryFingerprint,
    type StorySnapshot,
} from './story-fingerprint.js';
import type { StoryWriteGate } from './story-write-gate.js';

export type StoryReconciliationStatus = 'ready' | 'reconciling' | 'blocked';

export interface StoryReconciliationState {
    identityKey: string;
    status: StoryReconciliationStatus;
    message: string;
}

export interface StoryDomainReconciler<TImpact = unknown> {
    key: string;
    hasData: (root: XiaobaiOsChatData | null) => boolean;
    reconcile: (
        root: XiaobaiOsChatData,
        fingerprint: StoryFingerprint,
    ) => { root: XiaobaiOsChatData; impact: TImpact };
}

export interface StoryReconciliationRuntime extends Pick<
    XiaobaiOsAppRuntime,
    'startBackground' | 'stopBackground' | 'handleChatChanged' | 'cancelAll'
> {
    reconcileNow: () => Promise<StoryReconciliationState>;
    getState: () => StoryReconciliationState;
    subscribe: (listener: (state: StoryReconciliationState) => void) => () => void;
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

export function createStoryReconciliationRuntime(
    adapter: XiaobaiOsStoryAdapter,
    store: XiaobaiOsChatDataStore,
    storyGate: StoryWriteGate,
    reconcilers: readonly StoryDomainReconciler[],
    {
        retryDelayMs = 250,
        timeoutMs = 15_000,
        now = Date.now,
        setTimer = globalThis.setTimeout,
        clearTimer = globalThis.clearTimeout,
    }: RuntimeOptions = {},
): StoryReconciliationRuntime {
    const listeners = new Set<(state: StoryReconciliationState) => void>();
    let state: StoryReconciliationState = { identityKey: '', status: 'ready', message: '' };
    let unsubscribe: (() => void) | null = null;
    let generation = 0;
    let activeWait: ReturnType<typeof waitForTimer> | null = null;
    let currentTask: Promise<StoryReconciliationState> | null = null;
    let activeGate: { identityKey: string; token: number } | null = null;

    function publish(next: StoryReconciliationState): StoryReconciliationState {
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

    function hasStoryData(): boolean {
        const root = store.readCurrent();
        return reconcilers.some((reconciler) => reconciler.hasData(root));
    }

    async function reconcilePersistedStory(
        snapshot: StorySnapshot,
        fingerprint: StoryFingerprint,
    ): Promise<void> {
        await store.mutateCurrent((current, context) => {
            if (context.identityKey !== snapshot.identityKey) {
                throw new Error('story_fingerprint_chat_mismatch');
            }
            if (!current) {return { next: current, result: undefined };}
            let root = structuredClone(current);
            for (const reconciler of reconcilers) {
                if (reconciler.hasData(root)) {
                    root = reconciler.reconcile(root, fingerprint).root;
                }
            }
            return { next: root, result: undefined };
        }, {
            beforeCommit() {
                const live = adapter.captureCurrent();
                if (
                    !live
                    || live.identityKey !== snapshot.identityKey
                    || !storyMessagesEqual(live.messages, snapshot.messages)
                ) {
                    throw new Error('story_changed_during_reconciliation');
                }
            },
        });
    }

    async function runReconciliation(
        snapshot: StorySnapshot,
        taskGeneration: number,
        gateToken: number,
    ): Promise<StoryReconciliationState> {
        publish({ identityKey: snapshot.identityKey, status: 'reconciling', message: '剧情已变化，正在核对小白 OS 数据' });
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
            await reconcilePersistedStory(snapshot, fingerprint);
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
                message: `剧情核对暂停：${describeError(error)}`,
            });
        }
    }

    function reconcileNow(): Promise<StoryReconciliationState> {
        const snapshot = adapter.captureCurrent();
        if (!snapshot) {
            cancel();
            return Promise.resolve(publish({ identityKey: '', status: 'blocked', message: '请先打开一个聊天' }));
        }
        if (!hasStoryData()) {
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

    function beginStoryReconciliation(clearAllGates: boolean): void {
        cancel();
        if (clearAllGates) {storyGate.clear();}
        const snapshot = adapter.captureCurrent();
        const gateToken = snapshot ? blockStory(snapshot.identityKey) : 0;
        let hasData = false;
        try {
            hasData = hasStoryData();
        } catch (error) {
            publish({
                identityKey: snapshot?.identityKey || '',
                status: 'blocked',
                message: `剧情数据读取失败：${describeError(error)}`,
            });
            return;
        }
        if (!hasData) {
            if (snapshot) {releaseActiveGate();}
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

    function handleStoryChange(): void {
        beginStoryReconciliation(false);
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
        beginStoryReconciliation(true);
    }

    return Object.freeze({
        startBackground,
        stopBackground,
        handleChatChanged,
        cancelAll: cancel,
        reconcileNow,
        getState: () => state,
        subscribe(listener: (next: StoryReconciliationState) => void) {
            listeners.add(listener);
            return () => listeners.delete(listener);
        },
    });
}
