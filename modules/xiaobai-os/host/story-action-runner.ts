import type { XiaobaiOsChatData, XiaobaiOsStoryAnchor } from '../types.js';
import type {
    RootMutationContext,
    RootMutationOptions,
    RootMutationPlan,
    XiaobaiOsChatDataStore,
} from './chat-data-store.js';
import type { XiaobaiOsStoryAdapter } from './story-adapter.js';
import {
    buildStoryFingerprint,
    storyMessagesEqual,
    type StoryFingerprint,
    type StorySnapshot,
} from './story-fingerprint.js';
import type { StoryWriteGate } from './story-write-gate.js';

export interface StoryBoundActionContext {
    identityKey: string;
    snapshot: StorySnapshot;
    fingerprint: StoryFingerprint;
    anchor: XiaobaiOsStoryAnchor;
}

export interface StoryActionRunner {
    run: <T>(
        command: (
            current: XiaobaiOsChatData | null,
            rootContext: RootMutationContext,
            storyContext: StoryBoundActionContext,
        ) => RootMutationPlan<T> | Promise<RootMutationPlan<T>>,
        options?: RootMutationOptions,
    ) => Promise<T>;
}

export function createStoryActionRunner(
    store: XiaobaiOsChatDataStore,
    adapter: Pick<XiaobaiOsStoryAdapter, 'captureCurrent'>,
    gate: StoryWriteGate,
    reconcileBeforeWrite: () => Promise<unknown>,
): StoryActionRunner {
    function assertStoryCurrent(snapshot: StorySnapshot): void {
        gate.assertWritable(snapshot.identityKey);
        const live = adapter.captureCurrent();
        if (
            !live
            || live.identityKey !== snapshot.identityKey
            || !storyMessagesEqual(live.messages, snapshot.messages)
        ) {
            throw new Error('story_changed_during_bound_action');
        }
    }

    async function run<T>(
        command: (
            current: XiaobaiOsChatData | null,
            rootContext: RootMutationContext,
            storyContext: StoryBoundActionContext,
        ) => RootMutationPlan<T> | Promise<RootMutationPlan<T>>,
        options: RootMutationOptions = {},
    ): Promise<T> {
        if (typeof command !== 'function') {
            throw new TypeError('story action runner requires a command');
        }
        const snapshot = adapter.captureCurrent();
        if (!snapshot) {
            throw new Error('story_chat_unavailable');
        }
        const writeState = store.getWriteState();
        if (writeState !== 'unconfirmed' && writeState !== 'conflict') {
            await reconcileBeforeWrite();
        }
        gate.assertWritable(snapshot.identityKey);
        const fingerprint = await buildStoryFingerprint(snapshot);
        assertStoryCurrent(snapshot);
        const storyContext: StoryBoundActionContext = Object.freeze({
            identityKey: snapshot.identityKey,
            snapshot: structuredClone(snapshot),
            fingerprint,
            anchor: structuredClone(fingerprint.latestAnchor),
        });
        return store.mutateCurrent(async (current, rootContext) => {
            if (rootContext.identityKey !== snapshot.identityKey) {
                throw new Error('story_snapshot_chat_mismatch');
            }
            assertStoryCurrent(snapshot);
            return command(current, rootContext, storyContext);
        }, {
            async beforeCommit() {
                assertStoryCurrent(snapshot);
                await options.beforeCommit?.();
                assertStoryCurrent(snapshot);
            },
        });
    }

    return Object.freeze({ run });
}
