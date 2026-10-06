import type { PartitionRegistration } from '../../../kernel/contracts.js';
import { BOSS_SPECS, OATHS, REGIONS, RELICS, RULES, WEAPON_LIST } from './content.js';
import { awardAmount, awardKeys, chapterOf, emptyExpedition, zoneOf } from './domain.js';
import { BOSS_IDS, ENCOUNTER_IDS, EXPEDITION_FORMAT_VERSION, OUTFIT_IDS } from './ids.js';
import { OUTFITS, ownsOutfit } from './outfits.js';
import { upgradeV1 } from './migration/upgrade.js';
import { upgradeV2 } from './migration/upgrade-v2.js';
import { validateBattle } from './battle-validation.js';
import { fault } from './random.js';
import { compatibleRelics } from './relics.js';
import type { Battle, Command, ExpeditionData, InputSpan, RelicStack, Run } from './types.js';
import { boolean, expeditionId, finite, integer, list, member, object, unique } from './validation.js';
export { expeditionId } from './validation.js';

const weapon = (v: unknown) => member(v, WEAPON_LIST);
const relic = (v: unknown) => member(v, RELICS);
const outfit = (v: unknown) => member(v, OUTFIT_IDS);
const oaths = (v: unknown) => unique(list(v, OATHS.length, x => member(x, OATHS)));
function stacks(v: unknown, max: number): RelicStack[] {
    const entries = list(v, max, raw => { const r = object(raw); return { id: relic(r.id), rank: integer(r.rank, 1, RULES.maxRelicRank) }; });
    unique(entries.map(r => r.id)); return entries;
}
export function parseCommand(value: unknown): Command {
    const v = object(value);
    switch (v.type) {
        case 'start': return { type: 'start', weapon: weapon(v.weapon), outfit: outfit(v.outfit), oaths: oaths(v.oaths) };
        case 'purchase': case 'equip': return { type: v.type, id: outfit(v.id) };
        case 'route': return { type: 'route', id: integer(v.id, 0, 2) };
        case 'input': {
            const spans: InputSpan[] = list(v.spans, RULES.maxInputTicks, raw => {
                const s = object(raw); boolean(s.dash); boolean(s.skill);
                return { move: integer(s.move, 0, 8), dash: s.dash, skill: s.skill, ticks: integer(s.ticks, 1, RULES.maxInputTicks) };
            });
            if (!spans.length || spans.reduce((sum, s) => sum + s.ticks, 0) > RULES.maxInputTicks) { fault('invalid'); }
            return { type: 'input', spans };
        }
        case 'relic': return { type: 'relic', id: relic(v.id), replace: v.replace === null ? null : relic(v.replace) };
        case 'supply': case 'leave': case 'rest': case 'sacrifice': case 'abandon': return { type: v.type };
        default: return fault('invalid');
    }
}
function validateRun(raw: unknown, data: ExpeditionData) {
    const r = object(raw); expeditionId(r.id); integer(r.seed, 0, 0xffffffff); const w = weapon(r.weapon); oaths(r.oaths);
    if (!ownsOutfit(data, outfit(r.outfit))) { fault('invalid'); }
    const regions = list(r.regions, RULES.zones, n => integer(n, 0, REGIONS.length - 1)), bosses = list(r.bosses, RULES.zones, b => member(b, BOSS_IDS));
    if (regions.length !== RULES.zones || bosses.length !== RULES.zones || new Set(regions).size !== RULES.zones || bosses.some((b, i) => BOSS_SPECS[b].region !== regions[i])) { fault('invalid'); }
    integer(r.step, 0, RULES.zoneSteps * RULES.zones - 1); finite(r.hp, 0, RULES.maxHp); integer(r.shards); integer(r.kills); integer(r.ticks);
    const owned = stacks(r.relics, RULES.relicSlots), offered = stacks(r.offers, 4);
    const pool = unique(list(r.relicPool, RULES.relicPoolSize, relic)), compatible = compatibleRelics(w);
    if (!pool.length || pool.some(id => !compatible.includes(id)) || [...owned, ...offered].some(s => !pool.includes(s.id))) { fault('invalid'); }
    for (const offer of offered) { if (offer.rank !== (owned.find(s => s.id === offer.id)?.rank ?? 0) + 1) { fault('invalid'); } }
    const phase = member(r.phase, ['route', 'battle', 'reward', 'camp', 'shrine', 'merchant', 'won', 'lost', 'abandoned']);
    const routes = list(r.routes, 3, raw => { const route = object(raw); integer(route.id, 0, 2); member(route.kind, ['battle', 'elite', 'camp', 'shrine', 'merchant', 'boss']); member(route.encounter, ENCOUNTER_IDS); return route; });
    unique(routes.map(r => r.id));
    if (phase === 'route' ? routes.length === 0 : routes.length !== 0) { fault('invalid'); }
    if (!['merchant', 'reward'].includes(phase) && offered.length) { fault('invalid'); }
    if (r.battle !== null) {
        validateBattle(r.battle); const b = r.battle as Battle, run = raw as Run;
        if (b.chapter !== chapterOf(run) || b.zone !== zoneOf(run) || b.bossKind !== run.bosses[b.chapter] || b.tick > Number(r.ticks)) { fault('invalid'); }
        if (phase === 'battle' && (b.status !== 'fighting' || b.player.hp !== r.hp)) { fault('invalid'); }
    } else if (phase === 'battle') { fault('invalid'); }
}
export function validateExpedition(value: unknown): asserts value is ExpeditionData {
    const v = object(value); if (v.formatVersion !== EXPEDITION_FORMAT_VERSION) { fault('invalid'); }
    const revision = integer(v.revision);
    if (v.last === null) { if (revision !== 0) { fault('invalid'); } }
    else { const last = object(v.last); expeditionId(last.id); parseCommand(last.command); if (!revision) { fault('invalid'); } }
    integer(v.victories); unique(list(v.discoveries, RELICS.length, relic));
    const keys = awardKeys();
    unique(list(v.awards, keys.length, raw => { const a = object(raw); expeditionId(a.actionId); expeditionId(a.runId); const key = member(a.key, keys); if (integer(a.amount, 1) !== awardAmount(key)) { fault('invalid'); } return key; }));
    unique(list(v.purchases, OUTFIT_IDS.length, raw => {
        const p = object(raw), id = outfit(p.id), spec = OUTFITS[id]; expeditionId(p.actionId);
        if (spec.price <= 0 || spec.achievement !== null || integer(p.amount, 1) !== spec.price) { fault('invalid'); }
        return id;
    }));
    const data = value as ExpeditionData;
    if (!ownsOutfit(data, outfit(v.equippedOutfit))) { fault('invalid'); }
    list(v.records, RULES.recordLimit, raw => { const r = object(raw); expeditionId(r.id); weapon(r.weapon); oaths(r.oaths); member(r.outcome, ['won', 'lost', 'abandoned']); integer(r.step, 0, RULES.zoneSteps * RULES.zones - 1); integer(r.kills); integer(r.ticks); stacks(r.relics, RULES.relicSlots); return r; });
    if (v.active !== null) { validateRun(v.active, data); }
}
export const EXPEDITION_PARTITION: PartitionRegistration<ExpeditionData> = {
    key: 'expedition', ownerId: 'game', storage: 'user', schemaVersion: EXPEDITION_FORMAT_VERSION, createInitial: emptyExpedition,
    parse(raw) {
        try {
            const version = object(raw).formatVersion;
            const value = version === undefined ? upgradeV1(raw) : version === 2 ? upgradeV2(raw) : structuredClone(raw);
            validateExpedition(value); return { ok: true, value };
        } catch (error) { return { ok: false, error: { code: 'partition_invalid', message: error instanceof Error ? error.message : 'expedition_invalid' } }; }
    },
    serialize(value) { validateExpedition(value); return structuredClone(value); },
};
