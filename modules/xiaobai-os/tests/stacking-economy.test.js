import assert from 'node:assert/strict';
import test from 'node:test';
import { userEconomyHarness } from './user-economy-harness.js';
import { STACKING_PARTITION } from '../apps/game/stacking/partition.ts';
import { createStackingService } from '../apps/game/stacking/service.ts';
import { solve } from '../apps/game/stacking/rules.ts';
import { outcome, count } from '../apps/game/stacking/domain.ts';
import { STACKING_POLICY as P } from '../apps/game/stacking/policy.ts';
async function setup(files, dependencies = {}) {
    const h = await userEconomyHarness({ files }); let serial = 0;
    const service = createStackingService(h.store(STACKING_PARTITION), h.transactions, h.economy,
        { seed: () => 17, id: () => crypto.randomUUID(), ...dependencies });
    await h.economy.ensureOpen(); await service.refresh();
    const request = command => ({ actionId: `act-${++serial}-${crypto.randomUUID()}`, revision: service.view().revision, command });
    const act = command => service.act(request(command), () => true);
    async function build(n) { const route = solve(service.view().active.seed); for (let i = count(service.view().active); i < n; i++) { await act({ type: 'drop', ...route[i] }); } }
    return { ...h, service, act, request, build };
}
for (const tier of P.prizes) {
    test(`repeatable ${tier.count}-house settlement is atomic and does not accumulate milestones`, async () => {
        const h = await setup();
        for (let run = 0; run < 2; run++) {
            const before = h.service.view().balance;
            await h.act({ type: 'start' }); assert.equal(h.service.view().balance, before - P.fee);
            await h.build(tier.count - 1);
            assert.equal(h.service.view().balance, before - P.fee);
            await h.build(tier.count);
            if (tier.count < P.houses) { await h.act({ type: 'cashout' }); }
            assert.equal(h.service.view().balance, before - P.fee + tier.amount);
            assert.equal(h.service.view().award, tier.amount);
            await assert.rejects(h.act({ type: 'cashout' }));
        }
        const reopened = await setup(h.state.files); reopened.switchStory('another'); await reopened.service.refresh();
        assert.equal(reopened.service.view().balance, h.service.view().balance);
        assert.equal(count(reopened.service.view().best), tier.count);
        assert.equal(h.document().partitions.economy.transactions.filter(t => t.kind === 'stacking_prize').length, 2);
    });
}
test('loss and abandon keep the fee; invalid inputs cannot claim rewards or reroll a live run', async () => {
    const h = await setup(); await h.act({ type: 'start' });
    await assert.rejects(h.act({ type: 'start' })); await assert.rejects(h.act({ type: 'cashout' }));
    await assert.rejects(h.act({ type: 'drop', x: NaN, direction: 1 }));
    await assert.rejects(h.act({ type: 'drop', x: 0, direction: 0 }));
    await h.act({ type: 'drop', x: P.rail, direction: 1 });
    assert.equal(outcome(h.service.view().active), 'lost'); assert.equal(h.service.view().balance, 50);
    await h.act({ type: 'start' }); await h.act({ type: 'abandon' });
    assert.equal(h.service.view().balance, 0); await assert.rejects(h.act({ type: 'start' }));
});
for (const mode of ['rejected', 'unknown', 'written-unknown']) {
    test(`${mode}: retained admission and prize recover across chats without duplicate wallet legs`, async () => {
        const h = await setup(); const start = h.request({ type: 'start' });
        h.state.mode = mode;
        if (mode === 'written-unknown') { await h.service.act(start, () => true); }
        else { await assert.rejects(h.service.act(start, () => true)); }
        assert.equal(h.service.view().balance, mode === 'written-unknown' ? 50 : 100);
        const prepared = structuredClone(h.state.writes.at(-1).partitions.stacking.active);
        h.switchStory('b'); h.state.mode = 'confirmed'; await h.service.confirm(() => true);
        assert.deepEqual(h.service.view().active, prepared);
        await h.service.act(start, () => true); assert.equal(h.service.view().balance, 50);
        await h.build(8); const settle = h.request({ type: 'cashout' });
        h.state.mode = mode;
        if (mode === 'written-unknown') { await h.service.act(settle, () => true); }
        else { await assert.rejects(h.service.act(settle, () => true)); }
        h.state.mode = 'confirmed'; await h.service.confirm(() => true); await h.service.act(settle, () => true);
        assert.equal(h.service.view().balance, 100);
        const txs = h.document().partitions.economy.transactions;
        assert.equal(txs.filter(t => t.kind === 'stacking_fee').length, 1);
        assert.equal(txs.filter(t => t.kind === 'stacking_prize').length, 1);
    });
}
test('failed generation does not charge, and rejected drops retain exactly the selected pose', async () => {
    const rejected = await setup(undefined, { generate: async () => { throw new Error('generation'); } });
    await assert.rejects(rejected.act({ type: 'start' })); assert.equal(rejected.service.view().balance, 100);
    const h = await setup(); await h.act({ type: 'start' });
    const pose = solve(h.service.view().active.seed)[0], input = h.request({ type: 'drop', ...pose });
    h.state.mode = 'unknown'; await assert.rejects(h.service.act(input, () => true));
    h.state.mode = 'confirmed'; await h.service.confirm(() => true); await h.service.act(input, () => true);
    assert.deepEqual(h.service.view().active.moves, [pose]);
    await assert.rejects(h.service.act({ ...input, command: { type: 'drop', x: 222, direction: 1 } }, () => true));
});

test('a retained user-owned candidate survives its origin chat guard becoming false', async () => {
    const h = await setup(); let original = true;
    h.state.mode = 'unknown'; await assert.rejects(h.service.act(h.request({ type: 'start' }), () => original));
    const candidate = structuredClone(h.state.writes.at(-1).partitions.stacking.active);
    original = false; h.switchStory('new-chat'); h.state.mode = 'confirmed'; await h.service.confirm(() => true);
    assert.deepEqual(h.service.view().active, candidate); assert.equal(h.service.view().balance, 50);
});
