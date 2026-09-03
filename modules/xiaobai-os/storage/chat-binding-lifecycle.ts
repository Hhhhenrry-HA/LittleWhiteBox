import type { ChatBindingManager } from './chat-binding.js';

type EventListener = (...args: unknown[]) => void;

export interface ChatBindingEventSource {
    on(event: string, listener: EventListener): void;
    removeListener(event: string, listener: EventListener): void;
}

export interface ChatBindingEventNames {
    chatChanged: string;
    chatRenamed: string;
    chatDeleted: string;
    groupChatDeleted: string;
    characterRenamed: string;
}

export interface ChatBindingLifecycleOptions {
    manager: ChatBindingManager;
    refreshSidecar: () => Promise<void>;
    invalidateSidecar?: () => void;
    events: ChatBindingEventSource;
    eventNames: ChatBindingEventNames;
    windowTarget?: Pick<Window, 'addEventListener' | 'removeEventListener'>;
    documentTarget?: Pick<Document, 'visibilityState' | 'addEventListener' | 'removeEventListener'>;
    onError?: (error: unknown) => void;
}

export interface ChatBindingLifecycle {
    start(): void;
    stop(): Promise<void>;
    refresh(): Promise<void>;
}

export function createChatBindingLifecycle(options: ChatBindingLifecycleOptions): ChatBindingLifecycle {
    const {
        manager,
        refreshSidecar,
        invalidateSidecar = () => undefined,
        events,
        eventNames,
        windowTarget = window,
        documentTarget = document,
        onError = error => console.error('[LittleWhiteBox] 小白 OS 聊天生命周期刷新失败', error),
    } = options;
    let active = false;
    let generation = 0;
    let refreshRequested = false;
    let refreshPromise: Promise<void> | null = null;

    function refresh(): Promise<void> {
        if (!active) { return Promise.resolve(); }
        refreshRequested = true;
        if (!refreshPromise) {
            const refreshGeneration = generation;
            refreshPromise = Promise.resolve().then(async () => {
                while (active && generation === refreshGeneration && refreshRequested) {
                    refreshRequested = false;
                    const result = await manager.resolveCurrent();
                    if (!active || generation !== refreshGeneration) { return; }
                    if (result.status === 'ready' || result.status === 'empty') { await refreshSidecar(); }
                    else { invalidateSidecar(); }
                }
            }).catch(error => {
                invalidateSidecar();
                onError(error);
            }).finally(() => {
                refreshPromise = null;
                if (active && refreshRequested) { void refresh(); }
            });
        }
        return refreshPromise;
    }

    const handleRefresh: EventListener = () => { void refresh(); };
    const handleFocus = () => { void refresh(); };
    const handleVisibility = () => {
        if (documentTarget.visibilityState === 'visible') { void refresh(); }
    };
    const handleChatDeleted: EventListener = (chatId) => {
        void manager.handleChatDeleted(String(chatId || '')).catch(onError);
    };
    const handleCharacterRenamed: EventListener = (oldOwnerLocator, newOwnerLocator) => {
        void manager.handleCharacterRenamed(String(oldOwnerLocator || ''), String(newOwnerLocator || ''))
            .then(refresh)
            .catch(onError);
    };

    function start(): void {
        if (active) { return; }
        active = true;
        generation += 1;
        events.on(eventNames.chatChanged, handleRefresh);
        events.on(eventNames.chatRenamed, handleRefresh);
        events.on(eventNames.chatDeleted, handleChatDeleted);
        events.on(eventNames.groupChatDeleted, handleChatDeleted);
        events.on(eventNames.characterRenamed, handleCharacterRenamed);
        windowTarget.addEventListener('focus', handleFocus);
        documentTarget.addEventListener('visibilitychange', handleVisibility);
        void refresh();
    }

    async function stop(): Promise<void> {
        if (!active) {
            if (refreshPromise) { await refreshPromise; }
            return;
        }
        active = false;
        generation += 1;
        refreshRequested = false;
        events.removeListener(eventNames.chatChanged, handleRefresh);
        events.removeListener(eventNames.chatRenamed, handleRefresh);
        events.removeListener(eventNames.chatDeleted, handleChatDeleted);
        events.removeListener(eventNames.groupChatDeleted, handleChatDeleted);
        events.removeListener(eventNames.characterRenamed, handleCharacterRenamed);
        windowTarget.removeEventListener('focus', handleFocus);
        documentTarget.removeEventListener('visibilitychange', handleVisibility);
        if (refreshPromise) { await refreshPromise; }
    }

    return Object.freeze({ start, stop, refresh });
}
