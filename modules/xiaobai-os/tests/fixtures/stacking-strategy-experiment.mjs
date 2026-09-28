// Offline strategy/error analysis, not human win-rate or fraud prevention evidence.
import { performance } from 'node:perf_hooks';
import { emptyTower, place, sequence, solve, topSurface } from '../../apps/game/stacking/rules.ts';
import { STACKING_POLICY as P, cashout } from '../../apps/game/stacking/policy.ts';
const seedCount = 500, results = {};
let failures = 0, maxMs = 0, totalMs = 0;
const strategies = ['center', 'top-center', 'certified', 'error-40', 'error-100', 'error-200'];
for (const name of strategies) { results[name] = { meanHouses: 0, reach: [0, 0, 0, 0], net: [0, 0, 0, 0] }; }
for (let seed = 0; seed < seedCount; seed++) {
    const begin = performance.now(), route = solve(seed), duration = performance.now() - begin;
    maxMs = Math.max(maxMs, duration); totalMs += duration;
    if (!route) { failures++; continue; }
    for (const name of strategies) {
        let tower = emptyTower(), randomState = (seed + 7) >>> 0;
        const uniform = () => { randomState = (Math.imul(randomState, 1664525) + 1013904223) >>> 0; return Math.max(0.000001, randomState / 0x100000000); };
        for (const [index, kind] of sequence(seed).entries()) {
            const surface = topSurface(tower);
            const pose = name === 'center' ? { x: 0, direction: 1 } : name === 'top-center'
                ? { x: Math.round((surface.left + surface.right) / 2), direction: 1 } : { ...route[index] };
            if (name.startsWith('error-')) {
                const sigma = Number(name.slice(6));
                pose.x += Math.round(Math.sqrt(-2 * Math.log(uniform())) * Math.cos(2 * Math.PI * uniform()) * sigma);
            }
            pose.x = Math.max(-P.rail, Math.min(P.rail, pose.x)); tower = place(tower, kind, pose); if (tower.failure) { break; }
        }
        const count = tower.placed.length - Number(!!tower.failure), row = results[name]; row.meanHouses += count;
        for (const [index, tier] of P.prizes.entries()) { row.reach[index] += Number(count >= tier.count); row.net[index] += (count >= tier.count ? cashout(tier.count) : 0) - P.fee; }
    }
}
for (const row of Object.values(results)) {
    row.meanHouses /= seedCount; row.reach = row.reach.map(n => n / seedCount); row.net = row.net.map(n => n / seedCount);
}
console.log(JSON.stringify({ seedCount, certification: { failures, meanMs: totalMs / seedCount, maxMs },
    milestones: P.prizes.map(t => t.count), assumptions: 'Gaussian placement errors against the certified route; no human skill model, network delay or adaptive correction.', results }, null, 2));
