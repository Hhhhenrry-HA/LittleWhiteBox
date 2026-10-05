import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { userEconomyHarness } from './user-economy-harness.js';
import { EXPEDITION_PARTITION } from '../apps/game/expedition/partition.ts';
import { createExpeditionService } from '../apps/game/expedition/service.ts';
import { OUTFITS, ownsOutfit } from '../apps/game/expedition/outfits.ts';

const fixture = JSON.parse(await readFile(new URL('./fixtures/expedition-v1.json', import.meta.url), 'utf8'));
async function setup(files) {
    const h = await userEconomyHarness({ files, initialPartitions: async () => structuredClone(fixture) }); await h.economy.ensureOpen();
    const service = createExpeditionService(h.store(EXPEDITION_PARTITION), h.transactions, h.economy); await service.refresh();
    const request = command => ({ actionId: crypto.randomUUID(), revision: service.view().data.revision, command });
    return { ...h, service, request, act: command => service.act(request(command), () => true) };
}
test('purchase, wallet debit, ownership and reload are one transaction without altering awards or the active outfit', async () => {
    const h = await setup(), before = h.service.view();
    assert.ok(ownsOutfit(before.data, 'sovereign'));
    const purchase = h.request({ type: 'purchase', id: 'witch' }); await h.service.act(purchase, () => true);
    const bought = h.service.view(); assert.equal(bought.balance, before.balance - OUTFITS.witch.price); assert.ok(ownsOutfit(bought.data, 'witch'));
    assert.deepEqual(bought.data.awards, before.data.awards); assert.deepEqual(bought.data.active, before.data.active);
    await h.service.act(purchase, () => true); assert.equal(h.service.view().balance, bought.balance);
    await assert.rejects(h.act({ type: 'purchase', id: 'witch' }), { code: 'expedition_locked' });
    await h.act({ type: 'equip', id: 'witch' }); assert.equal(h.service.view().data.equippedOutfit, 'witch');
    const reloaded = await setup(h.state.files); assert.equal(reloaded.service.view().balance, bought.balance); assert.equal(reloaded.service.view().data.equippedOutfit, 'witch');
});
test('insufficient funds and achievement-only outfits never leave partial ownership', async () => {
    const h = await setup(); await h.act({ type: 'purchase', id: 'stargazer' }); const before = h.service.view();
    await assert.rejects(h.act({ type: 'purchase', id: 'frostbound' }), { code: 'expedition_funds' });
    await assert.rejects(h.act({ type: 'purchase', id: 'sovereign' }), { code: 'expedition_locked' });
    assert.deepEqual(h.service.view().data, before.data); assert.equal(h.service.view().balance, before.balance); assert.equal(h.service.view().pending, false);
});
for (const mode of ['rejected', 'unknown', 'lost-response']) {
    test(`outfit purchase recovers ${mode} persistence exactly once`, async () => {
        const h = await setup(), before = h.service.view(), request = h.request({ type: 'purchase', id: 'ranger' });
        h.state.mode = mode;
        if (mode === 'lost-response') { await h.service.act(request, () => true); assert.equal(h.service.view().balance, before.balance - OUTFITS.ranger.price); }
        else { await assert.rejects(h.service.act(request, () => true)); assert.equal(h.service.view().balance, before.balance); assert.equal(ownsOutfit(h.service.view().data, 'ranger'), false); }
        h.state.mode = 'confirmed'; await h.service.confirm(() => true); await h.service.confirm(() => true);
        assert.equal(h.service.view().balance, before.balance - OUTFITS.ranger.price); assert.equal(h.service.view().data.purchases.length, 1);
        await h.service.act(request, () => true); assert.equal(h.service.view().data.purchases.length, 1);
        const reloaded = await setup(h.state.files); assert.equal(reloaded.service.view().balance, h.service.view().balance);
    });
}
