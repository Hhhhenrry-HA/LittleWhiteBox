import assert from 'node:assert/strict';
import test from 'node:test';

import { buildStoryFingerprint } from '../host/story-fingerprint.js';
import { ensureEconomy, postTransaction } from '../domains/economy/ledger.js';
import { reconcileLedgerWithStory } from '../domains/economy/timeline.js';

test('rollback removes the first invalid action as a whole and every later transaction', async () => {
    let id = 0;
    const deps = { now: () => 1000 + id, createId: () => `tx-${++id}` };
    const original = await buildStoryFingerprint({
        identityKey: 'character:1:chat-a',
        messages: [
            { role: 'user', name: '小白', text: '第一层' },
            { role: 'assistant', name: '角色', text: '第二层' },
        ],
    });
    let ledger = ensureEconomy(undefined, deps);
    for (const leg of [
        { key: 'task:one:hold', from: 'player', to: 'escrow:task:one', amount: 20 },
        { key: 'task:one:fee', from: 'escrow:task:one', to: 'counterparty:task:issuer', amount: 5 },
    ]) {
        ledger = postTransaction(ledger, {
            idempotencyKey: leg.key,
            actionId: 'task:one',
            fromAccountId: leg.from,
            toAccountId: leg.to,
            amount: leg.amount,
            kind: 'task',
            title: '任务动作',
            sourceDomain: 'task',
            sourceId: 'task:one',
            anchor: original.latestAnchor,
        }, deps).ledger;
    }
    ledger = postTransaction(ledger, {
        idempotencyKey: 'shop:later',
        actionId: 'shop:later',
        fromAccountId: 'player',
        toAccountId: 'counterparty:shop:later',
        amount: 10,
        kind: 'purchase',
        title: '后续购买',
        sourceDomain: 'shop',
        sourceId: 'shop:later',
        anchor: original.latestAnchor,
    }, deps).ledger;

    const appended = await buildStoryFingerprint({
        identityKey: original.identityKey,
        messages: [...original.messages, { role: 'user', name: '小白', text: '第三层' }],
    });
    assert.equal(reconcileLedgerWithStory(ledger, appended).impact.changed, false);

    const edited = await buildStoryFingerprint({
        identityKey: original.identityKey,
        messages: [
            { role: 'user', name: '小白', text: '改写第一层' },
            original.messages[1],
        ],
    });
    const rolledBack = reconcileLedgerWithStory(ledger, edited);
    assert.equal(rolledBack.ledger.transactions.length, 1);
    assert.equal(rolledBack.impact.firstInvalidSequence, 2);
    assert.deepEqual(rolledBack.impact.removedActionIds, ['task:one', 'shop:later']);
    assert.equal(rolledBack.impact.nextBalance, 100);
});
