import assert from 'node:assert/strict';
import test from 'node:test';
import { userEconomyHarness } from './user-economy-harness.js';
import { EXPEDITION_PARTITION } from '../apps/game/expedition/partition.ts';
import { createExpeditionService } from '../apps/game/expedition/service.ts';
import { RULES } from '../apps/game/expedition/content.ts';
import { appendInput, tickBattle } from '../apps/game/expedition/combat.ts';
import { pilot } from './fixtures/expedition-pilot.mjs';
import { driveExpedition } from './fixtures/expedition-service-driver.mjs';
const start = { type: 'start', weapon: 'blade', cloak: 0, oaths: [] };
async function setup(files, dependencies = {}) {
    const h = await userEconomyHarness({ files }); await h.economy.ensureOpen();
    const service = createExpeditionService(h.store(EXPEDITION_PARTITION), h.transactions, h.economy, { seed: () => 7, ...dependencies });
    await service.refresh();
    const request = command => ({ actionId: crypto.randomUUID(), revision: service.view().data.revision, command });
    return { ...h, service, request, act: command => service.act(request(command), () => true) };
}

test('full legal campaign awards only confirmed achievements, unlocks content and restores after restart', async () => {
    const h = await setup(); const initialBalance = h.service.view().balance;
    const begin = h.request(start); await h.service.act(begin, () => true); await h.service.act(begin, () => true);
    assert.equal(h.service.view().balance, initialBalance);
    const { view: end, lastRequest } = await driveExpedition(h.service);
    assert.equal(end.data.active.phase, 'won'); assert.deepEqual(end.data.bossClears, [0, 1, 2]); assert.deepEqual(end.data.mastered, ['blade']);
    assert.equal(end.balance, initialBalance + RULES.firstBossAward * 3 + RULES.firstVictoryAward + RULES.masteryAward);
    await h.service.act(lastRequest, () => true); assert.equal(h.service.view().balance, end.balance);
    const reloaded = await setup(h.state.files); assert.deepEqual(reloaded.service.view().data, end.data);
    await reloaded.act(start); const repeated = await driveExpedition(reloaded.service);
    assert.equal(repeated.view.data.active.phase, 'won'); assert.equal(repeated.view.balance, end.balance);
    assert.equal(repeated.view.data.victories, 2); assert.equal(repeated.view.data.records.length, 2);
});

test('rejected save keeps original random candidate; retry cannot buy a reroll or duplicate an action', async () => {
    let draws = 0; const h = await setup(undefined, { seed: () => { draws++; return 7; } });
    const request = h.request(start); h.state.mode = 'rejected';
    await assert.rejects(h.service.act(request, () => true), { code: 'expedition_save_failed' });
    assert.equal(h.service.view().data.active, null); assert.equal(h.service.view().pending, true);
    h.state.mode = 'confirmed'; await h.service.confirm(() => true);
    assert.equal(draws, 1); assert.equal(h.service.view().data.active.id, request.actionId);
    await h.service.act(request, () => true); assert.equal(draws, 1); assert.equal(h.service.view().data.revision, 1);
    await assert.rejects(h.service.act({ ...request, command: { ...start, cloak: 1 } }, () => true), { code: 'expedition_identity' });
});

test('an unknown award save is recovered once, with wallet and boss-clear facts together', async () => {
    const h = await setup(); await h.act(start);
    await driveExpedition(h.service, r => r.step === 4 && r.phase === 'battle');
    const balance = h.service.view().balance;
    for (;;) {
        const r = h.service.view().data.active, b = structuredClone(r.battle), spans = [];
        for (let i = 0; i < RULES.maxInputTicks && b.status === 'fighting'; i++) { const input = pilot(b, r.weapon); appendInput(spans, input); tickBattle(b, input, r); }
        if (b.status === 'won') { h.state.mode = 'unknown'; await assert.rejects(h.act({ type: 'input', spans }), { code: 'expedition_save_unconfirmed' }); break; }
        assert.notEqual(b.status, 'lost'); await h.act({ type: 'input', spans });
    }
    const old = h.service.view(); assert.equal(old.balance, balance);
    h.state.mode = 'confirmed'; await h.service.confirm(() => true);
    assert.ok(h.service.view().data.revision > old.data.revision);
    const awarded = h.service.view(); assert.equal(awarded.balance, balance + RULES.firstBossAward);
    await h.service.confirm(() => true); assert.equal(h.service.view().balance, awarded.balance);
    const restored = await setup(h.state.files); assert.deepEqual(restored.service.view().data.bossClears, [0]); assert.equal(restored.service.view().balance, awarded.balance);
});

test('checkpoint progress survives chat changes and stale or oversized commands cannot alter it', async () => {
    const h = await setup(); await h.act(start); await h.act({ type: 'route', id: 0 });
    const input = h.request({ type: 'input', spans: [{ move: 3, dash: false, skill: false, ticks: 120 }] });
    await h.service.act(input, () => true); const checkpoint = h.service.view().data;
    h.switchStory('b'); await h.service.refresh(); assert.deepEqual(h.service.view().data, checkpoint);
    await assert.rejects(h.service.act({ ...input, actionId: 'stale-action' }, () => true), { code: 'expedition_stale' });
    await assert.rejects(h.act({ type: 'input', spans: [{ move: 3, dash: false, skill: false, ticks: 1e9 }] }), { code: 'expedition_invalid' });
    const restored = await setup(h.state.files); assert.deepEqual(restored.service.view().data.active.battle, checkpoint.active.battle);
});

test('story generation and identity guards block writes without consuming a fresh seed', async () => {
    let idle = false, draws = 0;
    const h = await setup(undefined, { idle: () => idle, seed: () => { draws++; return 7; } });
    await assert.rejects(h.act(start), { code: 'expedition_unavailable' }); idle = true;
    await assert.rejects(h.service.act(h.request(start), () => false), { code: 'expedition_unavailable' }); assert.equal(draws, 0);
});
