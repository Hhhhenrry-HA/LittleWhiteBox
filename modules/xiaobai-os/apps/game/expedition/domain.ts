import { createBattle, replayInputs } from './combat.js';
import { BOSSES, OATHS, RELICS, RELIC_RULES, RULES, WEAPONS } from './content.js';
import { fault, random, sample } from './random.js';
import type { Command, ExpeditionData, RouteKind, Run, Weapon } from './types.js';

export function emptyExpedition(): ExpeditionData {
    return { revision: 0, last: null, active: null, victories: 0, discoveries: [], records: [], awards: [] };
}
export function expeditionProgress(data: ExpeditionData) {
    const earned = new Set(data.awards.map(a => a.key));
    return { bossClears: BOSSES.flatMap((_, zone) => earned.has(`boss-${zone}`) ? [zone] : []),
        mastered: (Object.keys(WEAPONS) as Weapon[]).filter(id => earned.has(`mastery-${id}`)),
        oathWins: OATHS.filter(id => earned.has(`oath-${id}`)) };
}
export const isFinished = (run: Run) => ['won', 'lost', 'abandoned'].includes(run.phase);
export const zoneOf = (run: Run) => Math.floor(run.step / RULES.zoneSteps);
export function weaponUnlocked(data: ExpeditionData, weapon: Weapon) { return WEAPONS[weapon].unlock < 0 || expeditionProgress(data).bossClears.includes(WEAPONS[weapon].unlock); }
export function restAmount(run: Run) { return Math.floor(RULES.restHeal * (run.oaths.includes('scarcity') ? .5 : 1)); }
function routes(run: Run) {
    const stage = run.step % RULES.zoneSteps;
    const kinds: RouteKind[] = stage === RULES.zoneSteps - 1 ? ['boss'] : stage === 0 ? ['battle', 'elite']
        : stage === 2 ? ['battle', 'elite', 'shrine'] : ['battle', ...sample<RouteKind>(run, ['camp', 'shrine', 'merchant', 'elite'], 2)];
    run.routes = kinds.map((kind, id) => ({ kind, id })); run.phase = 'route'; run.battle = null; run.offers = [];
}
function nextRoom(run: Run) { run.step++; routes(run); }
function offers(run: Run, count: number) { run.offers = sample(run, run.relicPool.filter(id => !run.relics.includes(id)), count); }
function finish(data: ExpeditionData, run: Run, outcome: 'won' | 'lost' | 'abandoned') {
    run.phase = outcome; run.routes = []; run.offers = [];
    data.records.unshift({ id: run.id, weapon: run.weapon, oaths: [...run.oaths], outcome, step: run.step, kills: run.kills, ticks: run.ticks, relics: [...run.relics] });
    data.records = data.records.slice(0, RULES.recordLimit);
}
function award(data: ExpeditionData, run: Run, actionId: string, key: string, amount: number) {
    if (data.awards.some(entry => entry.key === key)) { return; }
    data.awards.push({ key, actionId, runId: run.id, amount });
}
function wonBattle(data: ExpeditionData, run: Run, actionId: string) {
    const b = run.battle!;
    run.shards += b.boss ? RULES.bossShards : b.elite ? RULES.eliteShards : RULES.battleShards;
    if (b.boss) {
        award(data, run, actionId, `boss-${b.zone}`, RULES.firstBossAward);
        if (!run.oaths.includes('scarcity')) { run.hp = Math.min(RULES.maxHp, run.hp + 20); }
        if (run.relics.includes('renewal')) { run.hp = Math.min(RULES.maxHp, run.hp + RELIC_RULES.renewalZoneHeal); }
        if (b.zone === RULES.zones - 1) {
            if (!data.victories) { award(data, run, actionId, 'victory', RULES.firstVictoryAward); }
            award(data, run, actionId, `mastery-${run.weapon}`, RULES.masteryAward);
            for (const oath of run.oaths) { award(data, run, actionId, `oath-${oath}`, RULES.oathAward); }
            data.victories++; finish(data, run, 'won'); return;
        }
    }
    run.phase = 'reward'; offers(run, b.elite || b.boss ? 4 : 3);
}
export function advanceExpedition(current: ExpeditionData, command: Command, actionId: string, seed: number): ExpeditionData {
    if (current.last?.id === actionId) { if (JSON.stringify(current.last.command) !== JSON.stringify(command)) { fault('identity'); } return current; }
    const data = structuredClone(current);
    if (command.type === 'start') {
        if (data.active && !isFinished(data.active)) { fault('unavailable'); }
        if (!weaponUnlocked(data, command.weapon) || command.cloak > expeditionProgress(data).bossClears.length || command.oaths.length && !data.victories) { fault('locked'); }
        const run: Run = { id: actionId, seed, weapon: command.weapon, cloak: command.cloak, oaths: [...command.oaths], step: 0, hp: RULES.maxHp,
            shards: 0, relics: [], relicPool: [], routes: [], offers: [], phase: 'route', battle: null, kills: 0, ticks: 0 };
        run.relicPool = sample(run, RELICS, RULES.relicPoolSize);
        routes(run); data.active = run;
    } else {
        const run = data.active;
        if (!run || isFinished(run)) { fault('unavailable'); }
        switch (command.type) {
            case 'route': {
                if (run.phase !== 'route') { fault('invalid'); }
                const route = run.routes.find(r => r.id === command.id); if (!route) { fault('invalid'); }
                run.routes = [];
                if (['battle', 'elite', 'boss'].includes(route.kind)) {
                    const battleSeed = Math.floor(random(run) * 4294967296);
                    run.battle = createBattle(battleSeed, zoneOf(run), route.kind === 'elite', route.kind === 'boss', run.hp, run);
                    run.phase = 'battle';
                } else { run.phase = route.kind as 'camp' | 'shrine' | 'merchant'; if (run.phase === 'merchant') { offers(run, 3); } }
                break;
            }
            case 'input': {
                if (run.phase !== 'battle' || !run.battle) { fault('invalid'); }
                const next = replayInputs(run.battle, command.spans, run);
                run.kills += next.kills - run.battle.kills; run.ticks += next.tick - run.battle.tick;
                next.effects = []; // Sparks and slashes are presentation-only, never a saved animation timeline.
                run.battle = next; run.hp = next.player.hp;
                if (next.status === 'lost') { finish(data, run, 'lost'); }
                else if (next.status === 'won') { wonBattle(data, run, actionId); }
                break;
            }
            case 'relic': {
                if (!['reward', 'merchant'].includes(run.phase) || !run.offers.includes(command.id) || run.relics.includes(command.id)) { fault('invalid'); }
                if (run.phase === 'merchant') { if (run.shards < RULES.shopCost) { fault('invalid'); } run.shards -= RULES.shopCost; }
                if (run.relics.length === RULES.relicSlots) { if (!command.replace || !run.relics.includes(command.replace)) { fault('invalid'); } run.relics = run.relics.filter(id => id !== command.replace); }
                else if (command.replace !== null) { fault('invalid'); }
                run.relics.push(command.id);
                if (!data.discoveries.includes(command.id)) { data.discoveries.push(command.id); }
                if (run.relics.includes('renewal')) { run.hp = Math.min(RULES.maxHp, run.hp + RELIC_RULES.renewalHeal); }
                nextRoom(run); break;
            }
            case 'rest': if (run.phase !== 'camp') { fault('invalid'); } run.hp = Math.min(RULES.maxHp, run.hp + restAmount(run)); nextRoom(run); break;
            case 'sacrifice': if (run.phase !== 'shrine' || run.hp <= RULES.sacrificeHp) { fault('invalid'); } run.hp -= RULES.sacrificeHp; run.phase = 'reward'; offers(run, 4); break;
            case 'leave': if (!['reward', 'merchant', 'shrine'].includes(run.phase)) { fault('invalid'); } nextRoom(run); break;
            case 'abandon': finish(data, run, 'abandoned'); break;
        }
    }
    data.revision++; data.last = { id: actionId, command: structuredClone(command) }; return data;
}
export const awardKeys = (): string[] => BOSSES.map((_, i) => `boss-${i}`).concat('victory',
    (Object.keys(WEAPONS) as Weapon[]).map(id => `mastery-${id}`), OATHS.map(id => `oath-${id}`));
