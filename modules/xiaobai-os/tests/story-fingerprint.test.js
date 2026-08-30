import assert from 'node:assert/strict';
import test from 'node:test';

import {
    buildStoryFingerprint,
    storyAnchorAt,
} from '../host/story-fingerprint.js';
import { EMPTY_STORY_PREFIX_HASH } from '../types.js';

const identityKey = 'character:1:chat-a';

test('story fingerprint is stable and exposes the fixed empty-story anchor', async () => {
    const empty = await buildStoryFingerprint({ identityKey, messages: [] });
    assert.deepEqual(empty.latestAnchor, { floor: -1, prefixHash: EMPTY_STORY_PREFIX_HASH });
    assert.deepEqual(storyAnchorAt(empty, -1), empty.latestAnchor);

    const messages = [
        { role: 'user', name: '小白', text: '去车站。' },
        { role: 'assistant', name: '角色', text: '已经到了。' },
    ];
    const first = await buildStoryFingerprint({ identityKey, messages });
    const second = await buildStoryFingerprint({ identityKey, messages: structuredClone(messages) });
    assert.deepEqual(first.prefixHashes, second.prefixHashes);
    assert.deepEqual(storyAnchorAt(first, 0), { floor: 0, prefixHash: first.prefixHashes[0] });
});

test('story fingerprint invalidates the affected suffix for edits, swipes, deletion and movement', async () => {
    const originalMessages = [
        { role: 'user', name: '小白', text: '第一层' },
        { role: 'assistant', name: '角色', text: '第二层' },
        { role: 'user', name: '小白', text: '第三层' },
    ];
    const original = await buildStoryFingerprint({ identityKey, messages: originalMessages });

    for (const messages of [
        [{ ...originalMessages[0], text: '编辑后的第一层' }, ...originalMessages.slice(1)],
        [originalMessages[0], { ...originalMessages[1], text: '另一个 swipe' }, originalMessages[2]],
        [originalMessages[0], originalMessages[2]],
        [originalMessages[1], originalMessages[0], originalMessages[2]],
    ]) {
        const changed = await buildStoryFingerprint({ identityKey, messages });
        assert.notEqual(changed.latestAnchor.prefixHash, original.latestAnchor.prefixHash);
    }
});
