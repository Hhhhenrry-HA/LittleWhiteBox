/** Frozen v1 parser. Compatibility exists only for user-confirmed expedition saves; remove only with an explicit save retirement policy. */
import { fault } from '../random.js';
import type { Battle, Command, ExpeditionData, InputSpan, Oath, Weapon } from './v1-types.js';
const WEAPONS = { blade: 0, bow: 0, staff: 0 };
const ENEMIES = { soldier: 0, archer: 0, guard: 0, priest: 0, charger: 0, warden: 0, weaver: 0, king: 0 };
const RELICS = ['storm-step', 'conductor', 'momentum', 'cinder', 'wildfire', 'blood-price', 'frost', 'shatter', 'echo', 'hunter', 'piercing', 'orbit', 'thorns', 'aegis', 'siphon', 'focus', 'renewal', 'execution'] as const;
const OATHS = ['haste', 'scarcity', 'legion'] as const;
const RULES = { maxHp: 100, maxInputTicks: 900, relicSlots: 6, relicPoolSize: 12, zoneSteps: 5, zones: 3, recordLimit: 20 } as const;
const awardKeys = () => ['boss-0', 'boss-1', 'boss-2', 'victory', 'mastery-blade', 'mastery-bow', 'mastery-staff', 'oath-haste', 'oath-scarcity', 'oath-legion'];
const expeditionProgress = (data: ExpeditionData) => ({ bossClears: [0, 1, 2].filter(n => data.awards.some(a => a.key === `boss-${n}`)) });
function object(value: unknown): Record<string, unknown> { if (!value || typeof value !== 'object' || Array.isArray(value)) { fault('invalid'); } return value as Record<string, unknown>; }
function integer(value: unknown, min = 0, max = Number.MAX_SAFE_INTEGER): number { if (!Number.isSafeInteger(value) || Number(value) < min || Number(value) > max) { fault('invalid'); } return value as number; }
function finite(value: unknown, min: number, max: number): number { if (typeof value !== 'number' || !Number.isFinite(value) || value < min || value > max) { fault('invalid'); } return value; }
function member<T extends string>(value: unknown, items: readonly T[]): T { if (typeof value !== 'string' || !items.includes(value as T)) { fault('invalid'); } return value as T; }
function list<T>(value: unknown, max: number, parse: (v: unknown) => T): T[] { if (!Array.isArray(value) || value.length > max) { fault('invalid'); } return value.map(parse); }
function unique<T>(values: T[]): T[] { if (new Set(values).size !== values.length) { fault('invalid'); } return values; }
const weapon = (v: unknown) => member(v, Object.keys(WEAPONS) as Weapon[]);
const relic = (v: unknown) => member(v, RELICS);
const oaths = (v: unknown): Oath[] => unique(list(v, OATHS.length, x => member(x, OATHS)));
export function expeditionId(value: unknown): string { if (typeof value !== 'string' || !/^[a-zA-Z0-9_-]{1,100}$/.test(value)) { fault('identity'); } return value; }
export function parseCommand(value: unknown): Command {
    const v = object(value);
    switch (v.type) {
        case 'start': return { type: 'start', weapon: weapon(v.weapon), cloak: integer(v.cloak, 0, 3), oaths: oaths(v.oaths) };
        case 'route': return { type: 'route', id: integer(v.id, 0, 2) };
        case 'input': {
            const spans: InputSpan[] = list(v.spans, RULES.maxInputTicks, raw => {
                const s = object(raw); if (typeof s.dash !== 'boolean' || typeof s.skill !== 'boolean') { fault('invalid'); }
                return { move: integer(s.move, 0, 8), dash: s.dash, skill: s.skill, ticks: integer(s.ticks, 1, RULES.maxInputTicks) };
            });
            if (!spans.length || spans.reduce((sum, s) => sum + s.ticks, 0) > RULES.maxInputTicks) { fault('invalid'); }
            return { type: 'input', spans };
        }
        case 'relic': return { type: 'relic', id: relic(v.id), replace: v.replace === null ? null : relic(v.replace) };
        case 'leave': case 'rest': case 'sacrifice': case 'abandon': return { type: v.type };
        default: return fault('invalid');
    }
}
function point(raw: unknown) { const p = object(raw); finite(p.x, -40, 40); finite(p.y, -40, 40); return p; }
function battle(raw: unknown): asserts raw is Battle {
    const b = object(raw); integer(b.tick); integer(b.seed, 0, 0xffffffff); integer(b.serial);
    integer(b.zone, 0, 2); integer(b.wave, 1, 3); integer(b.waves, 1, 3); integer(b.nextWave, 0, 45); integer(b.kills); finite(b.damageTaken, 0, 1e8);
    if (typeof b.elite !== 'boolean' || typeof b.boss !== 'boolean') { fault('invalid'); }
    member(b.status, ['fighting', 'won', 'lost']);
    const p = point(b.player); finite(p.hp, 0, RULES.maxHp); finite(p.facing, -100, 100); finite(p.dashAngle, -100, 100);
    for (const k of ['attack', 'dash', 'skill', 'invulnerable', 'dashTime', 'swing', 'shield', 'combo']) { integer(p[k]); }
    list(b.enemies, 50, raw => { const e = point(raw); integer(e.id); member(e.kind, Object.keys(ENEMIES)); finite(e.hp, 0, 1e5); finite(e.maxHp, .01, 1e5);
        finite(e.angle, -100, 100); integer(e.cooldown, -18, 1000); integer(e.windup, 0, 100); integer(e.pattern); integer(e.phase, 1, 3);
        for (const k of ['chill', 'burn', 'marked']) { integer(e[k], 0, 1000); } point(e.target); return e; });
    list(b.shots, 1000, raw => { const s = point(raw); integer(s.id); finite(s.angle, -1e5, 1e5); finite(s.speed, 0, 2); finite(s.damage, 0, 1e5); integer(s.life, 0, 200); integer(s.pierce, -1, 10);
        member(s.source, ['attack', 'skill']); if (typeof s.friendly !== 'boolean') { fault('invalid'); } list(s.hits, 50, n => integer(n)); return s; });
    list(b.hazards, 1000, raw => { const h = point(raw); integer(h.id); finite(h.radius, 0, 10); integer(h.wait, 0, 200); integer(h.life, 0, 200); finite(h.damage, 0, 1e5);
        member(h.kind, ['storm', 'fire', 'slam']); if (typeof h.friendly !== 'boolean') { fault('invalid'); } return h; });
    list(b.effects, 2000, raw => { const e = point(raw); integer(e.id); member(e.kind, ['hit', 'heal', 'slash', 'lightning', 'burst']); integer(e.life, 0, 20); finite(e.angle, -100, 100); finite(e.size, 0, 10); return e; });
    list(b.obstacles, 10, raw => { const p = point(raw); finite(p.radius, .1, 5); return p; });
}
export function validateV1(value: unknown): asserts value is ExpeditionData {
    const v = object(value); const revision = integer(v.revision);
    if (v.last === null) { if (revision !== 0) { fault('invalid'); } }
    else { const last = object(v.last); expeditionId(last.id); parseCommand(last.command); if (!revision) { fault('invalid'); } }
    integer(v.victories); unique(list(v.discoveries, RELICS.length, relic));
    const keys = awardKeys();
    unique(list(v.awards, keys.length, raw => { const a = object(raw); expeditionId(a.actionId); expeditionId(a.runId); integer(a.amount, 1); return member(a.key, keys); }));
    if (expeditionProgress(value as ExpeditionData).bossClears.some((n, i) => n !== i)) { fault('invalid'); }
    list(v.records, RULES.recordLimit, raw => { const r = object(raw); expeditionId(r.id); weapon(r.weapon); oaths(r.oaths); member(r.outcome, ['won', 'lost', 'abandoned']); integer(r.step, 0, 14); integer(r.kills); integer(r.ticks); unique(list(r.relics, RULES.relicSlots, relic)); return r; });
    if (v.active !== null) {
        const r = object(v.active); expeditionId(r.id); integer(r.seed, 0, 0xffffffff); weapon(r.weapon); integer(r.cloak, 0, 3); oaths(r.oaths);
        integer(r.step, 0, RULES.zoneSteps * RULES.zones - 1); finite(r.hp, 0, RULES.maxHp); integer(r.shards); integer(r.kills); integer(r.ticks);
        const owned = unique(list(r.relics, RULES.relicSlots, relic)), offered = unique(list(r.offers, 4, relic)); if (offered.some(id => owned.includes(id))) { fault('invalid'); }
        const pool = unique(list(r.relicPool, RELICS.length, relic)); if (pool.length !== RULES.relicPoolSize || [...owned, ...offered].some(id => !pool.includes(id))) { fault('invalid'); }
        const phase = member(r.phase, ['route', 'battle', 'reward', 'camp', 'shrine', 'merchant', 'won', 'lost', 'abandoned']);
        list(r.routes, 3, raw => { const route = object(raw); integer(route.id, 0, 2); member(route.kind, ['battle', 'elite', 'camp', 'shrine', 'merchant', 'boss']); return route; });
        if (r.battle !== null) { battle(r.battle); }
        if (phase === 'battle' && (!r.battle || (r.battle as Battle).status !== 'fighting')) { fault('invalid'); }
    }
}
