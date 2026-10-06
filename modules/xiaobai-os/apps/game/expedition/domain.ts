import { createBattle, replayInputs } from './combat.js';
import { EXPEDITION_FORMAT_VERSION } from './ids.js';
import { BOSSES, BOSS_SPECS, OATHS, REGION_TIERS, REGIONS, RELIC_RULES, RULES, WEAPONS } from './content.js';
import { OUTFITS, ownsOutfit } from './outfits.js';
import { fault, random, sample } from './random.js';
import { breaksRelicTrigger, compatibleRelics, eligibleRelics, relicPrice, relicRank, relicReady } from './relics.js';
import type { Command, ExpeditionData, RelicStack, RouteKind, Run, Weapon } from './types.js';

export function emptyExpedition(): ExpeditionData {
    return { formatVersion: EXPEDITION_FORMAT_VERSION, revision: 0, last: null, active: null, victories: 0, discoveries: [], records: [], awards: [], purchases: [], equippedOutfit: 'traveler' };
}
export function expeditionProgress(data: ExpeditionData) {
    const earned = new Set(data.awards.map(a => a.key));
    return { bossClears: BOSSES.filter(id => earned.has(BOSS_SPECS[id].awardKey)),
        mastered: (Object.keys(WEAPONS) as Weapon[]).filter(id => earned.has(`mastery-${id}`)),
        oathWins: OATHS.filter(id => earned.has(`oath-${id}`)) };
}
export const isFinished = (run: Run) => ['won', 'lost', 'abandoned'].includes(run.phase);
export const chapterOf = (run: Run) => Math.floor(run.step / RULES.zoneSteps);
export const zoneOf = (run: Run) => run.regions[chapterOf(run)];
export function weaponUnlocked(data: ExpeditionData, weapon: Weapon) { return expeditionProgress(data).bossClears.length >= WEAPONS[weapon].unlock; }
export function restAmount(run: Run) { return Math.floor(RULES.restHeal * (run.oaths.includes('scarcity') ? .5 : 1)); }
function routes(run: Run) {
    const stage = run.step % RULES.zoneSteps;
    const kinds: RouteKind[] = stage === RULES.zoneSteps - 1 ? ['boss'] : stage === 0 ? ['battle', 'elite']
        : stage === 2 ? ['battle', 'elite', 'shrine'] : ['battle', ...sample<RouteKind>(run, ['camp', 'shrine', 'merchant', 'elite'], 2)];
    const encounters = sample(run, REGIONS[zoneOf(run)].encounters, kinds.length);
    run.routes = kinds.map((kind, id) => ({ kind, id, encounter: encounters[id % encounters.length] }));
    run.phase = 'route'; run.battle = null; run.offers = [];
}
function nextRoom(run: Run) { run.step++; routes(run); }
function offers(run: Run, count: number) {
    const chapter = Math.min(RULES.zones - 1, chapterOf(run) + (run.phase === 'reward' && run.battle?.boss ? 1 : 0));
    const available = eligibleRelics(run, run.relicPool, chapter);
    const upgrades = available.filter(r => relicRank(run, r.id) > 0);
    const guaranteed = sample(run, upgrades, run.phase === 'merchant' ? count : run.battle?.elite || run.battle?.boss ? 2 : 1);
    run.offers = guaranteed.concat(sample(run, available.filter(r => !guaranteed.some(g => g.id === r.id)), count - guaranteed.length));
}
function finish(data: ExpeditionData, run: Run, outcome: 'won' | 'lost' | 'abandoned') {
    run.phase = outcome; run.routes = []; run.offers = [];
    data.records.unshift({ id: run.id, weapon: run.weapon, oaths: [...run.oaths], outcome, step: run.step, kills: run.kills, ticks: run.ticks, relics: structuredClone(run.relics) });
    data.records = data.records.slice(0, RULES.recordLimit);
}
function award(data: ExpeditionData, run: Run, actionId: string, key: string, amount: number) {
    if (!data.awards.some(entry => entry.key === key)) { data.awards.push({ key, actionId, runId: run.id, amount }); }
}
function wonBattle(data: ExpeditionData, run: Run, actionId: string) {
    const b = run.battle!;
    run.shards += b.boss ? RULES.bossShards : b.elite ? RULES.eliteShards : RULES.battleShards;
    if (b.boss) {
        award(data, run, actionId, BOSS_SPECS[b.bossKind].awardKey, RULES.firstBossAward);
        if (!run.oaths.includes('scarcity')) { run.hp = Math.min(RULES.maxHp, run.hp + 20); }
        run.hp = Math.min(RULES.maxHp, run.hp + relicRank(run, 'renewal') * RELIC_RULES.renewalZoneHeal);
        if (b.chapter === RULES.zones - 1) {
            if (!data.victories) { award(data, run, actionId, 'victory', RULES.firstVictoryAward); }
            award(data, run, actionId, `mastery-${run.weapon}`, RULES.masteryAward);
            for (const oath of run.oaths) { award(data, run, actionId, `oath-${oath}`, RULES.oathAward); }
            data.victories++; finish(data, run, 'won'); return;
        }
    }
    run.phase = 'reward'; offers(run, b.elite || b.boss ? 4 : 3);
}
function takeRelic(data: ExpeditionData, run: Run, offer: RelicStack, replace: Command & { type: 'relic' }) {
    if (breaksRelicTrigger(run, offer.id, replace.replace)) { fault('invalid'); }
    const owned = run.relics.find(r => r.id === offer.id);
    if (owned) {
        if (replace.replace !== null || offer.rank !== owned.rank + 1) { fault('invalid'); }
        owned.rank = offer.rank;
    } else {
        if (run.relics.length === RULES.relicSlots) {
            if (!replace.replace || !run.relics.some(r => r.id === replace.replace)) { fault('invalid'); }
            run.relics = run.relics.filter(r => r.id !== replace.replace);
        } else if (replace.replace !== null) { fault('invalid'); }
        run.relics.push({ ...offer });
    }
    if (!data.discoveries.includes(offer.id)) { data.discoveries.push(offer.id); }
    run.hp = Math.min(RULES.maxHp, run.hp + relicRank(run, 'renewal') * RELIC_RULES.renewalHeal);
}
export function advanceExpedition(current: ExpeditionData, command: Command, actionId: string, seed: number): ExpeditionData {
    if (current.last?.id === actionId) { if (JSON.stringify(current.last.command) !== JSON.stringify(command)) { fault('identity'); } return current; }
    const data = structuredClone(current);
    if (command.type === 'purchase') {
        const spec = OUTFITS[command.id];
        if (ownsOutfit(data, command.id) || spec.price <= 0 || spec.achievement !== null) { fault('locked'); }
        data.purchases.push({ id: command.id, actionId, amount: spec.price });
    } else if (command.type === 'equip') {
        if (!ownsOutfit(data, command.id)) { fault('locked'); }
        data.equippedOutfit = command.id;
    } else if (command.type === 'start') {
        if (data.active && !isFinished(data.active)) { fault('unavailable'); }
        if (!weaponUnlocked(data, command.weapon) || !ownsOutfit(data, command.outfit) || command.oaths.length && !data.victories) { fault('locked'); }
        const run: Run = { id: actionId, seed, weapon: command.weapon, outfit: command.outfit, oaths: [...command.oaths], step: 0, regions: [], bosses: [], hp: RULES.maxHp,
            shards: 0, relics: [], relicPool: [], routes: [], offers: [], phase: 'route', battle: null, kills: 0, ticks: 0 };
        run.regions = REGION_TIERS.map(tier => sample(run, tier, 1)[0]);
        run.bosses = run.regions.map(region => sample(run, REGIONS[region].bosses, 1)[0]);
        run.relicPool = sample(run, compatibleRelics(run.weapon), RULES.relicPoolSize);
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
                    const battleSeed = Math.floor(random(run) * 4294967296), chapter = chapterOf(run);
                    run.battle = createBattle({ seed: battleSeed, zone: zoneOf(run), chapter, elite: route.kind === 'elite', boss: route.kind === 'boss', bossKind: run.bosses[chapter], encounter: route.encounter, hp: run.hp }, run);
                    run.phase = 'battle';
                } else { run.phase = route.kind as 'camp' | 'shrine' | 'merchant'; if (run.phase === 'merchant') { offers(run, 4); } }
                break;
            }
            case 'input': {
                if (run.phase !== 'battle' || !run.battle) { fault('invalid'); }
                const next = replayInputs(run.battle, command.spans, run);
                run.kills += next.kills - run.battle.kills; run.ticks += next.tick - run.battle.tick;
                next.effects = [];
                run.battle = next; run.hp = next.player.hp;
                if (next.status === 'lost') { finish(data, run, 'lost'); }
                else if (next.status === 'won') { wonBattle(data, run, actionId); }
                break;
            }
            case 'relic': {
                const offer = run.offers.find(r => r.id === command.id);
                if (!['reward', 'merchant'].includes(run.phase) || !offer) { fault('invalid'); }
                if (run.phase === 'merchant') { const price = relicPrice(offer); if (run.shards < price) { fault('invalid'); } run.shards -= price; }
                takeRelic(data, run, offer, command);
                if (run.phase === 'merchant') { run.offers = run.offers.filter(r => r.id !== command.id && r.rank === relicRank(run, r.id) + 1 && relicReady(run, r.id)); }
                else { nextRoom(run); }
                break;
            }
            case 'supply':
                if (run.phase !== 'merchant' || run.shards < RULES.supplyCost || run.hp >= RULES.maxHp) { fault('invalid'); }
                run.shards -= RULES.supplyCost; run.hp = Math.min(RULES.maxHp, run.hp + RULES.supplyHeal * (run.oaths.includes('scarcity') ? .5 : 1)); break;
            case 'rest': if (run.phase !== 'camp') { fault('invalid'); } run.hp = Math.min(RULES.maxHp, run.hp + restAmount(run)); nextRoom(run); break;
            case 'sacrifice': if (run.phase !== 'shrine' || run.hp <= RULES.sacrificeHp) { fault('invalid'); } run.hp -= RULES.sacrificeHp; run.phase = 'reward'; offers(run, 4); break;
            case 'leave': if (!['reward', 'merchant', 'shrine'].includes(run.phase)) { fault('invalid'); } nextRoom(run); break;
            case 'abandon': finish(data, run, 'abandoned'); break;
        }
    }
    data.revision++; data.last = { id: actionId, command: structuredClone(command) }; return data;
}
export const awardKeys = (): string[] => BOSSES.map(id => BOSS_SPECS[id].awardKey).concat('victory',
    (Object.keys(WEAPONS) as Weapon[]).map(id => `mastery-${id}`), OATHS.map(id => `oath-${id}`));
export function awardAmount(key: string) {
    if (BOSSES.some(id => BOSS_SPECS[id].awardKey === key)) { return RULES.firstBossAward; }
    if (key === 'victory') { return RULES.firstVictoryAward; }
    return key.startsWith('mastery-') ? RULES.masteryAward : RULES.oathAward;
}
