import { pathToFileURL } from 'node:url';
import process from 'node:process';
import { appendInput, createBattle, tickBattle } from '../../apps/game/expedition/combat.ts';
import { advanceExpedition, emptyExpedition, isFinished } from '../../apps/game/expedition/domain.ts';
import { validateExpedition } from '../../apps/game/expedition/partition.ts';
import { REGIONS, RULES, WEAPON_LIST } from '../../apps/game/expedition/content.ts';
import { chooseRelic, pilot, routeChoice } from './expedition-pilot.mjs';

export function simulate(seed, weapon = 'blade', oaths = [], naked = false) {
    let data = emptyExpedition(), serial = 0;
    if (weapon !== 'blade' || oaths.length) {
        data.awards = Array.from({ length: RULES.zones }, (_, zone) => ({ key: `boss-${zone}`, actionId: `prior-${zone}`, runId: 'prior-run', amount: RULES.firstBossAward }));
        data.victories = 1;
    }
    const act = command => { data = advanceExpedition(data, command, `sim-${++serial}`, seed); validateExpedition(data); };
    act({ type: 'start', weapon, outfit: 'traveler', oaths });
    const rooms = [];
    while (!isFinished(data.active)) {
        const r = data.active;
        // A diagnostic policy can get stuck even when a human can approach the enemy.
        // Stop the experiment explicitly; never turn its budget into a product defeat.
        if (r.phase === 'battle' && r.battle.tick > RULES.hz * 180) break;
        if (r.phase === 'route') { act({ type: 'route', id: routeChoice(r).id }); }
        else if (r.phase === 'battle') {
            const b = structuredClone(r.battle), spans = [];
            for (let i = 0; i < RULES.maxInputTicks && b.status === 'fighting'; i++) { const input = pilot(b, weapon); appendInput(spans, input); tickBattle(b, input, r); }
            act({ type: 'input', spans });
            if (data.active.phase !== 'battle') rooms.push({ step: r.step, hp: Math.round(data.active.hp), seconds: Math.round(b.tick / RULES.hz), status: b.status });
        } else if (r.phase === 'reward') { act(naked ? { type: 'leave' } : chooseRelic(r)); }
        else if (r.phase === 'camp') { act({ type: 'rest' }); }
        else if (r.phase === 'shrine') { act(r.hp > 65 && !naked ? { type: 'sacrifice' } : { type: 'leave' }); }
        else if (r.phase === 'merchant') { act(r.shards >= RULES.shopCost && !naked ? chooseRelic(r) : { type: 'leave' }); }
    }
    return { seed, weapon, oaths, outcome: isFinished(data.active) ? data.active.phase : 'inconclusive', step: data.active.step, seconds: Math.round(data.active.ticks / RULES.hz), hp: data.active.hp, relics: data.active.relics, rooms, data };
}
// Deliberately unaware of enemies and warning shapes: audits the old effortless-kiting exploit.
export function circleRoom(seed, weapon, zone, elite = false) {
    const gear = { weapon, relics: [], oaths: ['haste', 'scarcity', 'legion'] };
    const b = createBattle({ seed, zone, chapter: zone % RULES.zones, elite, boss: false,
        bossKind: REGIONS[zone].bosses[0], encounter: 'skirmish', hp: RULES.maxHp }, gear);
    const points = [{ x: 7, y: 7 }, { x: -7, y: 7 }, { x: -7, y: -7 }, { x: 7, y: -7 }];
    let corner = 0;
    while (b.status === 'fighting' && b.tick < RULES.hz * 120) {
        const p = b.player, target = points[corner];
        if (Math.hypot(target.x - p.x, target.y - p.y) < .7) corner = (corner + 1) % points.length;
        const next = points[corner], angle = Math.atan2(next.y - p.y, next.x - p.x);
        const move = ((Math.round((angle + Math.PI / 2) / (Math.PI / 4)) % 8 + 8) % 8) + 1;
        tickBattle(b, { move, dash: false, skill: true }, gear);
    }
    return { weapon, zone, elite, outcome: b.status, hp: Math.round(b.player.hp), seconds: Math.round(b.tick / RULES.hz) };
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    for (const weapon of WEAPON_LIST) {
        if (process.argv.includes('--circle')) {
            for (let zone = 0; zone < REGIONS.length; zone++) for (const elite of [false, true]) console.log(JSON.stringify(circleRoom(7, weapon, zone, elite)));
        } else {
            for (const seed of [7, 18, 42]) { const summary = simulate(seed, weapon); delete summary.data; console.log(JSON.stringify(summary)); }
        }
    }
}
