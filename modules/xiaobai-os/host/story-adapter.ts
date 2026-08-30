import type { StorySnapshot } from './story-fingerprint.js';

export interface XiaobaiOsStoryAdapter {
    captureCurrent: () => StorySnapshot | null;
    readPersistedCurrent: (expectedIdentityKey: string) => Promise<StorySnapshot>;
    subscribeChanges: (handler: () => void) => () => void;
}
