import { EMPTY_STORY_PREFIX_HASH, type XiaobaiOsStoryAnchor } from '../types.js';

const STORY_SEED = 'xiaobai-os-story-fingerprint:v1';

export interface StoryMessageSnapshot {
    role: 'user' | 'assistant' | 'system';
    name: string;
    text: string;
}

export interface StorySnapshot {
    identityKey: string;
    messages: StoryMessageSnapshot[];
}

export interface StoryFingerprint {
    identityKey: string;
    messages: StoryMessageSnapshot[];
    prefixHashes: string[];
    latestAnchor: XiaobaiOsStoryAnchor;
}

async function sha256Hex(value: string): Promise<string> {
    if (!globalThis.crypto?.subtle) {
        throw new Error('story_fingerprint_web_crypto_unavailable');
    }
    const digest = await globalThis.crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
    return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function normalizeMessage(message: StoryMessageSnapshot): string {
    if (message.role !== 'user' && message.role !== 'assistant' && message.role !== 'system') {
        throw new TypeError('story message role is invalid');
    }
    return JSON.stringify(['xiaobai-os-story-message:v1', message.role, String(message.name), String(message.text)]);
}

export async function buildStoryFingerprint(snapshot: StorySnapshot): Promise<StoryFingerprint> {
    if (!snapshot.identityKey) {
        throw new Error('story_snapshot_identity_missing');
    }
    const messages = structuredClone(snapshot.messages);
    const seedHash = `sha256:${await sha256Hex(STORY_SEED)}`;
    if (seedHash !== EMPTY_STORY_PREFIX_HASH) {
        throw new Error('story_fingerprint_seed_mismatch');
    }
    const prefixHashes: string[] = [];
    let previous = seedHash;
    for (const message of messages) {
        previous = `sha256:${await sha256Hex(`${previous}\n${normalizeMessage(message)}`)}`;
        prefixHashes.push(previous);
    }
    return {
        identityKey: snapshot.identityKey,
        messages,
        prefixHashes,
        latestAnchor: {
            floor: messages.length - 1,
            prefixHash: messages.length === 0 ? EMPTY_STORY_PREFIX_HASH : prefixHashes[prefixHashes.length - 1],
        },
    };
}

export function storyMessagesEqual(left: readonly StoryMessageSnapshot[], right: readonly StoryMessageSnapshot[]): boolean {
    return left.length === right.length && left.every((message, index) => {
        const candidate = right[index];
        return candidate !== undefined &&
            message.role === candidate.role &&
            message.name === candidate.name &&
            message.text === candidate.text;
    });
}

export function storyAnchorAt(fingerprint: StoryFingerprint, floor: number): XiaobaiOsStoryAnchor | null {
    if (floor === -1) {
        return { floor, prefixHash: EMPTY_STORY_PREFIX_HASH };
    }
    const prefixHash = fingerprint.prefixHashes[floor];
    return prefixHash ? { floor, prefixHash } : null;
}
