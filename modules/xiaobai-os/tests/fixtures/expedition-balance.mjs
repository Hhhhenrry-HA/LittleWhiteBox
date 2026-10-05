import { pathToFileURL } from 'node:url';
import { appendInput, tickBattle } from '../../apps/game/expedition/combat.ts';
import { advanceExpedition, emptyExpedition, isFinished } from '../../apps/game/expedition/domain.ts';
import { validateExpedition } from '../../apps/game/expedition/partition.ts';
import { RULES } from '../../apps/game/expedition/content.ts';
import { chooseRelic, pilot, routeChoice } from './expedition-pilot.mjs';

export function simulate(seed, weapon = 'blade', oaths = [], naked = false) {
    let data = emptyExpedition(), serial = 0;
    if (weapon !== 'blade' || oaths.length) {
        data.awards = Array.from({ length: RULES.zones }, (_, zone) => ({ key: `boss-${zone}`, actionId: `prior-${zone}`, runId: 'prior-run', amount: RULES.firstBossAward }));
        data.victories = 1;
    }
    const act = command => { data = advanceExpedition(data, command, `sim-${++serial}`, seed); validateExpedition(data); };
    act({ type: 'start', weapon, cloak: 0, oaths });
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
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    for (const weapon of ['blade', 'bow', 'staff']) {
        for (const seed of [7, 18, 42]) { const { data: _data, ...summary } = simulate(seed, weapon); console.log(JSON.stringify(summary)); }
    }
}
