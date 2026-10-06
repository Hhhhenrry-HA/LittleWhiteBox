import { finite, list, object } from '../validation.js';
import { EXPEDITION_FORMAT_VERSION } from '../ids.js';
import type { Battle, ExpeditionData, Run } from '../types.js';
import type * as V2 from './v2-types.js';

function battle(v: V2.Battle): Battle {
    const raw = object(v); object(raw.player);
    let resonance = 0;
    list(raw.companions, 15, raw => {
        const ally = object(raw);
        // Validate the retired field before consuming it, not after overwriting it.
        const empowered = finite(ally.empowered, 0, 500);
        if (ally.kind === 'familiar' && finite(ally.hp, -1e5, 1000) > 0 && finite(ally.life, 0, 36000) > 0) { resonance = Math.max(resonance, empowered); }
        return ally;
    });
    return { ...v, player: { ...v.player, resonance }, companions: v.companions.map(ally => ({ ...ally, empowered: ally.kind === 'familiar' ? 0 : ally.empowered })) };
}
function run(v: V2.Run): Run {
    object(v);
    return { ...v, battle: v.battle === null ? null : battle(v.battle) };
}
/**
 * v2 kept resonance on each familiar. Only the save/import boundary calls this;
 * unchanged fields are validated by the current partition after conversion.
 */
export function upgradeV2(raw: unknown): ExpeditionData {
    const v = structuredClone(object(raw)) as unknown as V2.ExpeditionData;
    return { ...v, formatVersion: EXPEDITION_FORMAT_VERSION, active: v.active === null ? null : run(v.active) };
}
