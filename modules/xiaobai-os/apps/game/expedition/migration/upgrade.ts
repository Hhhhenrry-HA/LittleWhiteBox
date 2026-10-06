import { RULES } from '../content.js';
import { EXPEDITION_FORMAT_VERSION } from '../ids.js';
import { compatibleRelics } from '../relics.js';
import type { Battle, BossKind, Command, ExpeditionData, Outfit, Relic, Run } from '../types.js';
import { validateV1 } from './v1-parser.js';
import type * as V1 from './v1-types.js';

const outfits: readonly Outfit[] = ['traveler', 'guardian', 'moonweaver', 'sovereign'];
const bosses: BossKind[] = ['warden', 'weaver', 'king'];
// v1 exposed a ranged-only item to the sword. At the upgrade boundary its slot becomes the sword's dueling relic.
const relic = (id: V1.Relic, weapon: V1.Weapon): Relic => id === 'hunter' && weapon === 'blade' ? 'duelist' : id;
function command(v: V1.Command): Command {
    if (v.type === 'start') { return { type: 'start', weapon: v.weapon, outfit: outfits[v.cloak], oaths: [...v.oaths] }; }
    return structuredClone(v);
}
function battle(v: V1.Battle): Battle {
    return { ...structuredClone(v), chapter: v.zone, bossKind: bosses[v.zone], encounter: 'skirmish',
        player: { ...v.player, guard: 0, resource: 0, resonance: 0, ward: 0, lastHit: v.tick, travel: 0, rescues: 0 },
        enemies: v.enemies.map(e => ({ ...structuredClone(e), cooldown: Math.max(0, e.cooldown),
            stun: 0, bleed: 0, poison: 0, exposed: 0, motion: Math.max(0, -e.cooldown), motionAngle: e.angle, stagger: 0, memory: [] })),
        shots: v.shots.map(s => ({ ...structuredClone(s), radius: .16, splash: 0, bounce: 0 })),
        hazards: v.hazards.map(h => ({ ...h, angle: 0, length: 0, width: .65, inner: 0, source: h.friendly ? h.kind === 'slam' ? 'skill' : 'passive' : 'attack' })),
        companions: [], objective: { x: 0, y: 0, hp: 100, progress: 0, target: 0 } };
}
function run(v: V1.Run): Run {
    const { cloak, ...rest } = structuredClone(v);
    const pool = [...new Set(v.relicPool.map(id => relic(id, v.weapon)).concat(compatibleRelics(v.weapon)))].slice(0, RULES.relicPoolSize);
    return { ...rest, outfit: outfits[cloak], regions: [0, 1, 2], bosses: [...bosses], relicPool: pool,
        relics: v.relics.map(id => ({ id: relic(id, v.weapon), rank: 1 })), offers: v.offers.map(id => ({ id: relic(id, v.weapon), rank: 1 })),
        routes: v.routes.map(r => ({ ...r, encounter: 'skirmish' })), battle: v.battle ? battle(v.battle) : null };
}
/** Only an import/parse boundary calls this. Runtime commands and simulation recognize the current format alone. */
export function upgradeV1(raw: unknown): ExpeditionData {
    validateV1(raw);
    const v = structuredClone(raw), active = v.active ? run(v.active) : null;
    return { ...v, formatVersion: EXPEDITION_FORMAT_VERSION, last: v.last ? { id: v.last.id, command: command(v.last.command) } : null, active,
        records: v.records.map(r => ({ ...r, relics: r.relics.map(id => ({ id: relic(id, r.weapon), rank: 1 })) })),
        discoveries: [...new Set([...v.discoveries, ...v.records.flatMap(r => r.relics.map(id => relic(id, r.weapon))), ...(active?.relics.map(r => r.id) ?? [])])],
        purchases: [], equippedOutfit: active?.outfit ?? 'traveler' };
}
