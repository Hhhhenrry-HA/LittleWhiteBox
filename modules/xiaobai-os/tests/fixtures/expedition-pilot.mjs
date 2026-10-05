// Deterministic diagnostic player. Sends legal inputs; does not set health, results or rewards.
import { distance } from '../../apps/game/expedition/combat.ts';
import { ENEMIES, isBoss, RULES } from '../../apps/game/expedition/content.ts';
export function pilot(battle, weapon) {
    const p = battle.player;
    const target = [...battle.enemies].sort((a, b) => (distance(a, p) - (a.kind === 'priest' ? 4 : 0)) - (distance(b, p) - (b.kind === 'priest' ? 4 : 0)))[0];
    if (!target) return { move: 0, dash: false, skill: false };
    const danger = pos => {
        let value = 0;
        for (const e of battle.enemies) {
            const d = distance(e, pos), r = ENEMIES[e.kind];
            if (e.windup && !isBoss(e.kind) && e.kind !== 'archer' && e.kind !== 'priest') {
                if (e.kind === 'charger') {
                    const dx = pos.x - e.x, dy = pos.y - e.y, forward = dx * Math.cos(e.angle) + dy * Math.sin(e.angle), side = Math.abs(-dx * Math.sin(e.angle) + dy * Math.cos(e.angle));
                    if (forward > 0 && forward < 8 && side < 1.3) value += 20 * (1.3 - side);
                } else if (distance(e.target, pos) < r.reach + 1) value += 16 * (r.reach + 1 - distance(e.target, pos));
            }
            if (d < r.radius + .9) value += 8 * (r.radius + .9 - d);
        }
        for (const h of battle.hazards) {
            if (!h.friendly && h.wait < 40 && distance(h, pos) < h.radius + .7) value += 22 * (h.radius + .7 - distance(h, pos));
        }
        for (const s of battle.shots) {
            if (s.friendly) continue;
            for (const dt of [0, 4, 8]) { const d = distance({ x: s.x + Math.cos(s.angle) * s.speed * dt, y: s.y + Math.sin(s.angle) * s.speed * dt }, pos); if (d < .95) value += 10 * (.95 - d); }
        }
        for (const o of battle.obstacles) { if (distance(o, pos) < o.radius + .8) value += 6; }
        if (Math.abs(pos.x) > 9 || Math.abs(pos.y) > 9) value += 10;
        return value;
    };
    const desired = weapon === 'blade' ? ENEMIES[target.kind].radius + 1.4 : 6;
    let best = { score: Infinity, move: 0 };
    const immediateDanger = danger(p);
    for (let move = 0; move <= 8; move++) {
        const angle = (move - 1) * Math.PI / 4 - Math.PI / 2, stride = move ? 1.05 : 0;
        const pos = { x: p.x + Math.cos(angle) * stride, y: p.y + Math.sin(angle) * stride };
        let score = danger(pos) + Math.abs(distance(pos, target) - desired) * 1.3;
        if (weapon === 'blade' && target.kind === 'guard') score += Math.max(0, Math.cos(Math.atan2(pos.y - target.y, pos.x - target.x) - target.angle)) * 3;
        // Mild orbiting breaks stalemates without a hidden aim or information channel.
        score += move ? Math.sin(angle - Math.atan2(p.y - target.y, p.x - target.x)) * .18 : .1;
        if (score < best.score) best = { score, move };
    }
    return { move: best.move, dash: !p.dash && immediateDanger > 7 && best.move !== 0,
        skill: !p.skill && distance(p, target) < (weapon === 'blade' ? 3.5 : 10) };
}
export function chooseRelic(run) {
    const priorities = run.weapon === 'blade' ? ['cinder', 'siphon', 'frost', 'orbit', 'storm-step', 'conductor', 'momentum', 'echo', 'aegis', 'renewal']
        : ['cinder', 'piercing', 'hunter', 'echo', 'frost', 'siphon', 'execution', 'wildfire', 'renewal'];
    const rank = id => { const i = priorities.indexOf(id); return i < 0 ? 30 : i; };
    const id = [...run.offers].sort((a, b) => rank(a) - rank(b))[0];
    const replace = run.relics.length === RULES.relicSlots ? [...run.relics].sort((a, b) => rank(b) - rank(a))[0] : null;
    return replace && rank(replace) < rank(id) ? { type: 'leave' } : { type: 'relic', id, replace };
}
export function routeChoice(run) {
    return run.routes.find(r => r.kind === 'camp' && run.hp < 80)
        ?? run.routes.find(r => r.kind === 'merchant' && run.shards >= RULES.shopCost)
        ?? run.routes.find(r => r.kind === 'battle') ?? run.routes[0];
}
