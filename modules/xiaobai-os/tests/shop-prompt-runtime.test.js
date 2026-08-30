import assert from 'node:assert/strict';
import test from 'node:test';

import { createShopPromptRuntime } from '../apps/shop/host/prompt-runtime.js';
import { activateShopItem, createEmptyShopState, getShopCasToken, purchaseShopItem } from '../domains/shop/timeline.js';
import { buildStoryFingerprint } from '../host/story-fingerprint.js';

async function activeFlowerDomain(snapshot) {
    const fingerprint = await buildStoryFingerprint(snapshot);
    let sequence = 0;
    const dependencies = {
        now: () => 1_000 + sequence,
        createEventId: () => `event-${++sequence}`,
    };
    let domain = createEmptyShopState();
    domain = purchaseShopItem(domain, {
        ...getShopCasToken(domain),
        actionId: 'buy-flower',
        itemId: 'flower',
        anchor: fingerprint.latestAnchor,
        assistantTurn: 0,
    }, dependencies).domain;
    return activateShopItem(domain, {
        ...getShopCasToken(domain),
        actionId: 'use-flower',
        activationId: 'activation-flower',
        itemId: 'flower',
        parameters: { targetName: '艾拉' },
        anchor: fingerprint.latestAnchor,
        assistantTurn: 0,
    }, dependencies).domain;
}

async function createHarness() {
    const snapshot = {
        identityKey: 'character:1:chat-a',
        messages: [{ role: 'user', name: '主人', text: '请继续故事' }],
    };
    const domain = await activeFlowerDomain(snapshot);
    const prompts = [];
    const errors = [];
    let handlers = null;
    let captures = 0;
    const runtime = createShopPromptRuntime({
        captureStory() {captures += 1; return structuredClone(snapshot);},
        readShop: () => structuredClone(domain),
        setPrompt: value => prompts.push(value),
        subscribe(next) {handlers = next; return () => {handlers = null;};},
        onError: error => errors.push(error),
    });
    runtime.startBackground();
    return { errors, get captures() {return captures;}, handlers: () => handlers, prompts, runtime };
}

test('Shop prompt runtime projects at the real generation interceptor and clears after request data is built', async () => {
    const harness = await createHarness();
    const handlers = harness.handlers();
    await handlers.intercept({ type: 'normal' });

    assert.match(harness.prompts.at(-1), /艾拉/);
    assert.match(harness.prompts.at(-1), /^<xiaobai_os_shop_effects>/);
    handlers.finished();
    assert.equal(harness.prompts.at(-1), '');
    assert.deepEqual(harness.errors, []);
});

test('preflight failures and non-main generation types cannot leave a Shop prompt', async () => {
    const harness = await createHarness();
    const handlers = harness.handlers();

    // A host preflight failure never invokes the generation interceptor.
    assert.equal(harness.prompts.length, 0);
    await handlers.intercept({ type: 'quiet' });
    assert.equal(harness.captures, 0);
    assert.equal(harness.prompts.at(-1), '');
});

test('chat changes and runtime shutdown invalidate generation state and remove the prompt', async () => {
    const harness = await createHarness();
    const handlers = harness.handlers();
    await handlers.intercept({ type: 'normal' });
    assert.notEqual(harness.prompts.at(-1), '');

    harness.runtime.handleChatChanged();
    assert.equal(harness.prompts.at(-1), '');
    harness.runtime.stopBackground();
    assert.equal(harness.handlers(), null);
    assert.equal(harness.prompts.at(-1), '');
});
