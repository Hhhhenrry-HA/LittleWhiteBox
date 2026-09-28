import assert from 'node:assert/strict';
import test from 'node:test';
import { emptyTower, place, sequence, solve, generate, topSurface } from '../apps/game/stacking/rules.ts';
import { cashout, craneX, STACKING_POLICY as P } from '../apps/game/stacking/policy.ts';

test('random admission certification produces a reproducible full legal route, within a fixed search budget', async () => {
    for (let seed = 0; seed < 100; seed++) {
        const accepted = await generate(seed), route = solve(accepted);
        assert.equal(route.length, P.houses);
        assert.deepEqual(sequence(accepted), sequence(accepted));
        let tower = emptyTower();
        sequence(accepted).forEach((kind, i) => { tower = place(tower, kind, route[i]); assert.equal(tower.failure, null); });
    }
});
test('opening placement can miss; every lower joint checks the mass of all houses above it', () => {
    assert.equal(place(emptyTower(), 'wide', { x: P.rail, direction: 1 }).failure, 'miss');
    let tower = place(emptyTower(), 'wide', { x: 700, direction: 1 });
    assert.equal(tower.failure, null);
    tower = place(tower, 'wide', { x: 1400, direction: 1 });
    assert.equal(tower.failure, null);
    const failed = place(tower, 'wide', { x: 1900, direction: 1 });
    assert.equal(failed.failure, 'balance');
    assert.ok(failed.supports[0].margin < 0);
    const rescued = place(tower, 'wide', { x: 700, direction: 1 });
    assert.equal(rescued.failure, null);
    assert.ok(rescued.supports[0].margin > tower.supports[0].margin);
});
test('balcony direction changes mass; step direction changes the next visible support surface', () => {
    const base = place(emptyTower(), 'wide', { x: 300, direction: 1 });
    assert.equal(place(base, 'balcony', { x: 850, direction: 1 }).failure, 'balance');
    assert.equal(place(base, 'balcony', { x: 850, direction: -1 }).failure, null);
    const left = topSurface(place(base, 'step', { x: 0, direction: -1 }));
    const right = topSurface(place(base, 'step', { x: 0, direction: 1 }));
    assert.ok(left.right < right.right);
});
test('prizes are milestones not cumulative; motion is a function of active time not frames', () => {
    assert.deepEqual([0, 7, 8, 11, 12, 15, 16, 19, 20].map(cashout), [0, 0, 50, 50, 80, 80, 120, 120, 200]);
    assert.equal(craneX(5, 8, 3), craneX(5, 8, 3));
    assert.notEqual(craneX(5, 8, 3), craneX(5, 8, 4));
});
