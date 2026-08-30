import assert from 'node:assert/strict';
import test from 'node:test';

import {
    createShopCatalog,
    getShopItem,
    listShopCatalog,
} from '../domains/shop/catalog.js';
import { normalizeShopParameters, validateShopDomain } from '../domains/shop/invariants.js';
import {
    activateShopItem,
    createEmptyShopState,
    deactivateShopItem,
    getShopCasToken,
    isShopActivationActive,
    projectShopState,
    purchaseShopItem,
    reconcileShopWithStory,
    resolveShopGenerationTimeline,
    shopRemainingAssistantTurns,
} from '../domains/shop/timeline.js';

const HASH_A = `sha256:${'a'.repeat(64)}`;
const HASH_B = `sha256:${'b'.repeat(64)}`;
const HASH_C = `sha256:${'c'.repeat(64)}`;

function dependencies() {
    let sequence = 0;
    return {
        now: () => 1_000 + sequence,
        createEventId: () => `shop-event-${++sequence}`,
    };
}

function command(domain, actionId, input = {}) {
    return {
        ...getShopCasToken(domain),
        actionId,
        anchor: { floor: 0, prefixHash: HASH_A },
        assistantTurn: 0,
        ...input,
    };
}

test('catalog is an immutable reviewed set of exactly twenty five products', () => {
    const catalog = listShopCatalog();
    assert.equal(catalog.length, 25);
    assert.equal(new Set(catalog.map(item => item.id)).size, 25);
    for (const item of catalog) {
        assert.ok(Number.isSafeInteger(item.price) && item.price > 0, item.id);
        assert.ok(item.trustedRule.trim(), item.id);
        assert.equal(Object.isFrozen(item), true);
        assert.equal(Object.isFrozen(item.inputs), true);
    }
    assert.equal(getShopItem('privacy-camera').price, 1_200);
    assert.deepEqual(getShopItem('time-stop-watch').duration, { kind: 'permanent' });
    assert.equal(getShopItem('time-stop-watch').purchaseLimit, 1);
    assert.throws(() => getShopItem('missing'), error => error.code === 'shop_item_missing');

    const flower = getShopItem('flower');
    assert.throws(
        () => createShopCatalog([flower, { ...flower }]),
        error => error.code === 'shop_invalid_catalog',
    );
    assert.throws(
        () => createShopCatalog([{
            ...flower,
            id: 'invalid-permanent',
            duration: { kind: 'permanent' },
            deactivationRule: 'must not be allowed',
        }]),
        error => error.code === 'shop_invalid_catalog',
    );
});

test('parameters use NFKC, remove controls, fold whitespace and cap Unicode code points', () => {
    const flower = getShopItem('flower');
    assert.deepEqual(
        normalizeShopParameters(flower, { targetName: '  Ａ\u0000\n　Ｂ  ', ignored: 'not persisted' }),
        { targetName: 'A B' },
    );
    const emoji = normalizeShopParameters(flower, { targetName: '😀'.repeat(50) }).targetName;
    assert.equal(Array.from(emoji).length, 40);
    assert.throws(
        () => normalizeShopParameters(flower, { targetName: '\u0000\n' }),
        error => error.code === 'shop_parameters_invalid',
    );
    assert.deepEqual(
        normalizeShopParameters(getShopItem('invisibility-cloak'), { targetName: 'ignored' }),
        {},
    );
});

test('commands append a linear event chain, preserve inputs and expose CAS without snapshots', () => {
    const deps = dependencies();
    const empty = createEmptyShopState();
    assert.throws(
        () => activateShopItem(empty, command(empty, 'use-missing-flower', {
            itemId: 'flower', activationId: 'missing-flower', parameters: { targetName: '艾拉' },
        }), deps),
        error => error.code === 'shop_quantity_insufficient',
    );
    const bought = purchaseShopItem(empty, command(empty, 'buy-flower', { itemId: 'flower' }), deps);
    const beforeActivation = structuredClone(bought.domain);
    const activated = activateShopItem(bought.domain, command(bought.domain, 'use-flower', {
        itemId: 'flower',
        activationId: 'activation-flower',
        parameters: { targetName: '  艾　拉\n ' },
    }), deps);

    assert.deepEqual(empty, createEmptyShopState());
    assert.deepEqual(bought.domain, beforeActivation);
    assert.equal(activated.domain.events.length, 2);
    assert.deepEqual(activated.domain.events[1].action.parameters, { targetName: '艾 拉' });
    assert.deepEqual(getShopCasToken(activated.domain), {
        expectedRevision: 2,
        expectedEventId: 'shop-event-2',
    });
    assert.equal(Object.hasOwn(activated.domain, 'currentState'), false);
    assert.equal(activated.domain.events.some(event => Object.hasOwn(event, 'state')), false);
    assert.equal(projectShopState(activated.domain).inventory.flower.quantity, 0);
    validateShopDomain(activated.domain);
});

test('action replay is idempotent before CAS while conflicting or stale commands fail', () => {
    const deps = dependencies();
    const empty = createEmptyShopState();
    const input = command(empty, 'buy-once', { itemId: 'flower' });
    const first = purchaseShopItem(empty, input, deps);
    const second = purchaseShopItem(first.domain, command(first.domain, 'buy-later', { itemId: 'flower' }), deps);
    const replay = purchaseShopItem(second.domain, input, deps);

    assert.equal(replay.created, false);
    assert.equal(replay.event.eventId, first.event.eventId);
    assert.equal(replay.domain.events.length, 2);
    assert.equal(replay.projection.inventory.flower.quantity, 2);
    assert.throws(
        () => purchaseShopItem(second.domain, { ...input, itemId: 'gift-box' }, deps),
        error => error.code === 'shop_action_conflict',
    );
    assert.throws(
        () => purchaseShopItem(second.domain, command(empty, 'stale-buy', { itemId: 'flower' }), deps),
        error => error.code === 'shop_revision_conflict',
    );
    assert.throws(
        () => purchaseShopItem(second.domain, {
            ...command(second.domain, 'wrong-event-head', { itemId: 'flower' }),
            expectedEventId: 'wrong-event',
        }, deps),
        error => error.code === 'shop_event_id_conflict',
    );
});

test('activation consumes one item and enforces per-parameter and global stacking', () => {
    const deps = dependencies();
    let domain = createEmptyShopState();
    domain = purchaseShopItem(domain, command(domain, 'buy-flower-a', { itemId: 'flower' }), deps).domain;
    domain = purchaseShopItem(domain, command(domain, 'buy-flower-b', { itemId: 'flower' }), deps).domain;
    domain = activateShopItem(domain, command(domain, 'use-flower-a', {
        itemId: 'flower', activationId: 'flower-a', parameters: { targetName: '艾拉' },
    }), deps).domain;
    const unchanged = structuredClone(domain);
    assert.throws(
        () => activateShopItem(domain, command(domain, 'use-flower-duplicate', {
            itemId: 'flower', activationId: 'flower-duplicate', parameters: { targetName: '艾拉' },
        }), deps),
        error => error.code === 'shop_activation_duplicate',
    );
    assert.deepEqual(domain, unchanged);
    domain = activateShopItem(domain, command(domain, 'use-flower-b', {
        itemId: 'flower', activationId: 'flower-b', parameters: { targetName: '贝尔' },
    }), deps).domain;
    assert.equal(projectShopState(domain).inventory.flower.quantity, 0);

    domain = purchaseShopItem(domain, command(domain, 'buy-identity-a', { itemId: 'identity-card' }), deps).domain;
    domain = purchaseShopItem(domain, command(domain, 'buy-identity-b', { itemId: 'identity-card' }), deps).domain;
    domain = activateShopItem(domain, command(domain, 'use-identity-a', {
        itemId: 'identity-card', activationId: 'identity-a', parameters: { identity: '商人' },
    }), deps).domain;
    assert.throws(
        () => activateShopItem(domain, command(domain, 'use-identity-b', {
            itemId: 'identity-card', activationId: 'identity-b', parameters: { identity: '旅人' },
        }), deps),
        error => error.code === 'shop_activation_duplicate',
    );
    assert.equal(projectShopState(domain).inventory['identity-card'].quantity, 1);
});

test('only a live manual activation can be closed and purchase limits survive consumption', () => {
    const deps = dependencies();
    let domain = createEmptyShopState();
    domain = purchaseShopItem(domain, command(domain, 'buy-camera', { itemId: 'privacy-camera' }), deps).domain;
    domain = activateShopItem(domain, command(domain, 'use-camera', {
        itemId: 'privacy-camera', activationId: 'camera-a', parameters: { targetName: '艾拉' },
    }), deps).domain;
    domain = deactivateShopItem(domain, command(domain, 'close-camera', {
        itemId: 'privacy-camera', activationId: 'camera-a', assistantTurn: 2,
    }), deps).domain;
    assert.throws(
        () => deactivateShopItem(domain, command(domain, 'close-camera-again', {
            itemId: 'privacy-camera', activationId: 'camera-a', assistantTurn: 2,
        }), deps),
        error => error.code === 'shop_activation_not_active',
    );

    domain = purchaseShopItem(domain, command(domain, 'buy-obedience', {
        itemId: 'absolute-obedience', assistantTurn: 2,
    }), deps).domain;
    domain = activateShopItem(domain, command(domain, 'use-obedience', {
        itemId: 'absolute-obedience',
        activationId: 'obedience-a',
        parameters: { targetName: '艾拉' },
        assistantTurn: 2,
    }), deps).domain;
    assert.throws(
        () => deactivateShopItem(domain, command(domain, 'close-obedience', {
            itemId: 'absolute-obedience', activationId: 'obedience-a', assistantTurn: 2,
        }), deps),
        error => error.code === 'shop_activation_not_manual',
    );

    domain = purchaseShopItem(domain, command(domain, 'buy-flower-turns', {
        itemId: 'flower', assistantTurn: 2,
    }), deps).domain;
    domain = activateShopItem(domain, command(domain, 'use-flower-turns', {
        itemId: 'flower', activationId: 'flower-turns', parameters: { targetName: '艾拉' }, assistantTurn: 2,
    }), deps).domain;
    assert.throws(
        () => deactivateShopItem(domain, command(domain, 'close-flower-turns', {
            itemId: 'flower', activationId: 'flower-turns', assistantTurn: 2,
        }), deps),
        error => error.code === 'shop_activation_not_manual',
    );

    domain = purchaseShopItem(domain, command(domain, 'buy-watch', {
        itemId: 'time-stop-watch', assistantTurn: 2,
    }), deps).domain;
    domain = activateShopItem(domain, command(domain, 'use-watch', {
        itemId: 'time-stop-watch', activationId: 'watch-a', parameters: {}, assistantTurn: 2,
    }), deps).domain;
    assert.throws(
        () => purchaseShopItem(domain, command(domain, 'buy-watch-again', {
            itemId: 'time-stop-watch', assistantTurn: 2,
        }), deps),
        error => error.code === 'shop_purchase_limit_reached',
    );
});

test('effects use target Assistant turns and regenerate, swipe and continue do not consume turns', () => {
    const deps = dependencies();
    let domain = createEmptyShopState();
    domain = purchaseShopItem(domain, command(domain, 'buy-sticker', {
        itemId: 'no-anger-sticker', assistantTurn: 1,
    }), deps).domain;
    domain = activateShopItem(domain, command(domain, 'use-sticker', {
        itemId: 'no-anger-sticker',
        activationId: 'sticker-a',
        parameters: { targetName: '艾拉' },
        assistantTurn: 1,
    }), deps).domain;
    const activation = projectShopState(domain).activations[0];
    const item = getShopItem('no-anger-sticker');
    assert.equal(isShopActivationActive(activation, item, 1), false);
    for (let turn = 2; turn <= 6; turn += 1) {
        assert.equal(isShopActivationActive(activation, item, turn), true, `turn ${turn}`);
    }
    assert.equal(isShopActivationActive(activation, item, 7), false);
    assert.equal(shopRemainingAssistantTurns(activation, item, 6), 1);

    const messages = [
        { role: 'user', name: '玩家', text: '第一轮' },
        { role: 'assistant', name: '角色', text: '旧回复' },
    ];
    assert.equal(resolveShopGenerationTimeline(messages, 'normal').targetAssistantTurn, 2);
    for (const mode of ['regenerate', 'swipe']) {
        const resolved = resolveShopGenerationTimeline(messages, mode);
        assert.equal(resolved.targetAssistantTurn, 1);
        assert.deepEqual(resolved.storyPrefix, messages.slice(0, 1));
    }
    const continued = resolveShopGenerationTimeline(messages, 'continue');
    assert.equal(continued.targetAssistantTurn, 1);
    assert.deepEqual(continued.storyPrefix, messages);
});

test('story reconciliation cuts the first invalid event and the complete later suffix', () => {
    const deps = dependencies();
    let domain = createEmptyShopState();
    domain = purchaseShopItem(domain, command(domain, 'buy-flower', {
        itemId: 'flower', anchor: { floor: 0, prefixHash: HASH_A },
    }), deps).domain;
    domain = activateShopItem(domain, command(domain, 'use-flower', {
        itemId: 'flower',
        activationId: 'flower-a',
        parameters: { targetName: '艾拉' },
        anchor: { floor: 1, prefixHash: HASH_B },
        assistantTurn: 1,
    }), deps).domain;
    domain = purchaseShopItem(domain, command(domain, 'buy-gift', {
        itemId: 'gift-box',
        anchor: { floor: 1, prefixHash: HASH_B },
        assistantTurn: 1,
    }), deps).domain;

    const fingerprint = {
        identityKey: 'character:1:chat-a',
        messages: [],
        prefixHashes: [HASH_A, HASH_C],
        latestAnchor: { floor: 1, prefixHash: HASH_C },
    };
    const reconciled = reconcileShopWithStory(domain, fingerprint);
    assert.equal(reconciled.impact.firstInvalidRevision, 2);
    assert.deepEqual(reconciled.impact.removedActionIds, ['use-flower', 'buy-gift']);
    assert.equal(reconciled.domain.events.length, 1);
    assert.equal(projectShopState(reconciled.domain).inventory.flower.quantity, 1);
});
