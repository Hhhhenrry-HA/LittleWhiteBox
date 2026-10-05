import { ENEMIES, isBoss } from '../content.js';
import { relicRank as rank } from '../relics.js';
import type { Battle, Enemy, Loadout, Point } from '../types.js';
import { bossAttack } from './bosses.js';
import { hurtEnemy, hurtPlayer } from './damage.js';
import { effect, fan, hazard, shot, slam } from './events.js';
import { angleTo, distance, moveBody } from './geometry.js';

function targetFor(b: Battle, e: Enemy): Point {
    if (!isBoss(e.kind)) {
        const ally = b.companions.filter(c => c.hp > 0 && c.life > 0 && distance(c, e) < 2.8).sort((a, c) => distance(a, e) - distance(c, e))[0];
        if (ally) { return ally; }
        if (b.encounter === 'siege' && !b.boss && (e.kind === 'soldier' || e.kind === 'guard' || e.kind === 'charger') && distance(e, b.player) > 3) { return b.objective; }
    }
    return b.player;
}
function strike(b: Battle, e: Enemy, loadout: Loadout, radius: number) {
    const spec = ENEMIES[e.kind];
    if (distance(e.target, b.player) < radius && distance(e, b.player) < spec.reach + 1) { hurtPlayer(b, spec.damage, loadout); }
    for (const ally of b.companions) { if (distance(e.target, ally) < radius && distance(e, ally) < spec.reach + 1) { ally.hp -= spec.damage; } }
    if (!b.boss && b.encounter === 'siege' && distance(e.target, b.objective) < radius && distance(e, b.objective) < spec.reach + 1) { b.objective.hp = Math.max(0, b.objective.hp - spec.damage * .5); }
    effect(b, e.target, 'slash', radius, e.angle);
}
function attack(b: Battle, e: Enemy, loadout: Loadout) {
    const spec = ENEMIES[e.kind];
    if (isBoss(e.kind)) { bossAttack(b, e, loadout); return; }
    switch (e.kind) {
        case 'archer': fan(b, e, e.angle, b.chapter > 0 ? 3 : 2, .36, spec.damage, .24); break;
        case 'priest':
            for (const other of b.enemies) { if (other.hp > 0 && !isBoss(other.kind) && distance(other, e) < 3.5) { other.hp = Math.min(other.maxHp, other.hp + 8); } }
            fan(b, e, e.angle, 3, .7, spec.damage, .18); effect(b, e, 'heal', 3.5); break;
        case 'charger': e.motion = 23; e.motionAngle = e.angle; break;
        case 'bomber': hazard(b, e.target, 'fire', 1.9, 23, 75, spec.damage); break;
        case 'wisp':
            shot(b, e, e.angle, spec.damage, false, { speed: .3 });
            e.motion = 7; e.motionAngle = e.angle + Math.PI / 2; break;
        case 'guard': slam(b, e.target, 1.7, 8, spec.damage); break;
        default: strike(b, e, loadout, spec.reach + .15);
    }
}
function motion(b: Battle, e: Enemy, loadout: Loadout) {
    const spec = ENEMIES[e.kind], before = { x: e.x, y: e.y }, speed = e.kind === 'leviathan' ? .44 : e.kind === 'wisp' ? .24 : .32;
    moveBody(b, e, e.motionAngle, speed, spec.radius); e.motion--;
    if (e.kind !== 'wisp') {
        if (distance(e, b.player) < spec.radius + .4) { hurtPlayer(b, spec.damage, loadout); }
        for (const ally of b.companions) { if (distance(e, ally) < spec.radius + .3) { ally.hp -= spec.damage; e.motion = 0; } }
        if (!b.boss && b.encounter === 'siege' && distance(e, b.objective) < spec.radius + .6) { b.objective.hp = Math.max(0, b.objective.hp - spec.damage * .5); e.motion = 0; }
        if (distance(before, e) < speed * .65) { e.motion = 0; e.exposed = 80; e.stun = 24; effect(b, e, 'guard', 2); }
    }
    if (!e.motion) { e.cooldown = Math.max(e.cooldown, 28); }
}
export function enemiesTick(b: Battle, loadout: Loadout, velocity: Point) {
    for (const e of [...b.enemies]) {
        if (e.hp <= 0) { continue; }
        for (const key of ['marked', 'chill', 'exposed'] as const) { e[key] = Math.max(0, e[key] - 1); }
        for (const key of ['burn', 'bleed', 'poison'] as const) {
            if (e[key] > 0) {
                e[key]--;
                if (b.tick % 15 === 0) {
                    const strength = key === 'burn' ? rank(loadout, 'cinder') + rank(loadout, 'inferno') : key === 'bleed' ? rank(loadout, 'hemorrhage') + rank(loadout, 'blood-dance') : rank(loadout, 'venom');
                    hurtEnemy(b, e, 2 + strength * 1.5, loadout, 'passive');
                }
            }
        }
        if (e.hp <= 0) { continue; }
        if (e.stun > 0) { e.stun--; continue; }
        if (e.motion > 0) { motion(b, e, loadout); continue; }
        const spec = ENEMIES[e.kind], haste = loadout.oaths.includes('haste');
        if (e.windup > 0) {
            if (--e.windup === 0) { attack(b, e, loadout); e.cooldown = Math.round(spec.cooldown * (haste ? .8 : 1) / (isBoss(e.kind) ? 1 + (e.phase - 1) * .12 : 1)); }
            continue;
        }
        const target = targetFor(b, e), d = distance(e, target);
        e.cooldown = Math.max(0, e.cooldown - 1); e.angle = angleTo(e, target);
        if (!e.cooldown && d < spec.reach) {
            e.target = { x: target.x, y: target.y }; e.windup = Math.round(spec.windup * (haste ? .8 : 1));
            // Aim ahead once, before the visible windup. A change of direction defeats the prediction.
            if (target === b.player && (e.kind === 'archer' || e.kind === 'bomber')) {
                const lead = Math.min(e.windup + d / .24, 4.5 / Math.max(.001, Math.hypot(velocity.x, velocity.y)));
                e.target.x = Math.max(-10, Math.min(10, target.x + velocity.x * lead));
                e.target.y = Math.max(-10, Math.min(10, target.y + velocity.y * lead));
                e.angle = angleTo(e, e.target);
            }
            continue;
        }
        const ranged = e.kind === 'archer' || e.kind === 'priest' || e.kind === 'bomber' || e.kind === 'wisp';
        const preferred = ranged ? 5 : isBoss(e.kind) ? 2.8 : .95;
        if (d > preferred || ranged && d < 3) {
            const flank = e.kind === 'stalker' && d > 3 ? (e.id % 2 ? .28 : -.28) : 0;
            moveBody(b, e, e.angle + (ranged && d < 3 ? Math.PI : flank), spec.speed * (e.chill ? isBoss(e.kind) ? .8 : .5 : 1) * (haste ? 1.08 : 1), spec.radius);
        }
        for (const other of b.enemies) { if (other.id !== e.id && other.hp > 0 && distance(e, other) < spec.radius + ENEMIES[other.kind].radius) { moveBody(b, e, angleTo(other, e), .027, spec.radius); } }
    }
}
