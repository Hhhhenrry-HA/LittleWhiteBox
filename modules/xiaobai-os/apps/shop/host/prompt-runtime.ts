import { buildShopPromptBlock } from '../../../domains/shop/prompt.js';
import { projectShopState, reconcileShopWithStory, resolveShopGenerationTimeline } from '../../../domains/shop/timeline.js';
import type { ShopDomainV1, ShopGenerationMode } from '../../../domains/shop/types.js';
import type { XiaobaiOsAppRuntime } from '../../../types.js';
import { buildStoryFingerprint, type StorySnapshot } from '../../../host/story-fingerprint.js';

interface ShopGenerationEvent {
    type: string;
}

interface ShopPromptEventHandlers {
    intercept: (event: ShopGenerationEvent) => Promise<void> | void;
    finished: () => void;
}

interface ShopPromptRuntimeDependencies {
    captureStory: () => StorySnapshot | null;
    readShop: () => ShopDomainV1 | null;
    setPrompt: (value: string) => void;
    subscribe: (handlers: ShopPromptEventHandlers) => () => void;
    onError?: (error: unknown) => void;
}

export type ShopPromptRuntime = Pick<
    XiaobaiOsAppRuntime,
    'startBackground' | 'stopBackground' | 'handleChatChanged' | 'cancelAll'
>;

function generationMode(type: string): ShopGenerationMode | null {
    if (!type || type === 'normal') {return 'normal';}
    if (type === 'regenerate' || type === 'swipe' || type === 'continue') {return type;}
    return null;
}

export function createShopPromptRuntime({
    captureStory,
    readShop,
    setPrompt,
    subscribe,
    onError = (error) => console.error('[LittleWhiteBox] 商店效果 Prompt 投影失败', error),
}: ShopPromptRuntimeDependencies): ShopPromptRuntime {
    let unsubscribe: (() => void) | null = null;
    let generation = 0;

    function clear(): void {
        setPrompt('');
    }

    function invalidate(): void {
        generation += 1;
        clear();
    }

    async function intercept(event: ShopGenerationEvent): Promise<void> {
        const mode = generationMode(event.type);
        const requestGeneration = ++generation;
        clear();
        if (!mode) {return;}
        try {
            const snapshot = captureStory();
            const domain = readShop();
            if (!snapshot || !domain) {return;}
            const timeline = resolveShopGenerationTimeline(snapshot.messages, mode);
            const fingerprint = await buildStoryFingerprint({
                identityKey: snapshot.identityKey,
                messages: timeline.storyPrefix,
            });
            if (requestGeneration !== generation) {return;}
            const reconciled = reconcileShopWithStory(domain, fingerprint).domain;
            const prompt = buildShopPromptBlock(projectShopState(reconciled), timeline.targetAssistantTurn);
            if (requestGeneration === generation) {setPrompt(prompt);}
        } catch (error) {
            if (requestGeneration === generation) {clear();}
            onError(error);
        }
    }

    function startBackground(): void {
        if (!unsubscribe) {unsubscribe = subscribe({ intercept, finished: invalidate });}
    }

    function stopBackground(): void {
        unsubscribe?.();
        unsubscribe = null;
        invalidate();
    }

    return Object.freeze({
        startBackground,
        stopBackground,
        handleChatChanged: invalidate,
        cancelAll: invalidate,
    });
}
