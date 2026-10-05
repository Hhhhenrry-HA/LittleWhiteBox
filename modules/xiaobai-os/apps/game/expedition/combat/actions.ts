import { ENEMIES, isBoss, RELIC_RULES as R, RULES, WEAPONS } from '../content.js';
import { relicRank as rank } from '../relics.js';
import type { Battle, Enemy, InputFrame, Loadout, Player } from '../types.js';
import { heal, hurtEnemy, lightning, stagger } from './damage.js';
import { companion, effect, hazard, shot } from './events.js';
import { angleTo, atAngle, direction, distance, moveBody, TAU } from './geometry.js';

function grantWard(player: Player, amount: number, capacity = 45) {
    // A source's capacity limits its own gain, never ward already granted by another source.
    player.ward += Math.max(0, Math.min(amount, capacity - player.ward));
}

function attack(b: Battle, loadout: Loadout, target: Enemy, extra = false) {
    const spec = WEAPONS[loadout.weapon], p = b.player, angle = angleTo(p, target);
    const power = (extra ? .6 : 1) * (rank(loadout, 'gambit') ? 1 + rank(loadout, 'gambit') * .12 : 1);
    p.facing = angle; p.swing = loadout.weapon === 'cannon' ? 15 : 8;
    if (loadout.weapon === 'blade' || loadout.weapon === 'daggers') {
        const reach = spec.range + rank(loadout, 'piercing') * .25;
        effect(b, p, 'slash', reach, angle);
        for (const e of b.enemies) {
            if (distance(p, e) > reach + ENEMIES[e.kind].radius || Math.cos(angleTo(p, e) - angle) < -.1) { continue; }
            hurtEnemy(b, e, spec.damage * power, loadout, 'attack');
            if (loadout.weapon === 'blade' && !extra && p.combo % 3 === 2) { stagger(b, e, 14); }
        }
        if (loadout.weapon === 'blade') {
            p.resource = Math.min(100, p.resource + 9);
            if (rank(loadout, 'cleave-wave') && p.combo % 3 === 2) { shot(b, p, angle, 14 * rank(loadout, 'cleave-wave'), true, { pierce: 5, radius: .4, speed: .3, source: 'passive' }); }
        }
        return;
    }
    let damage = spec.damage * power;
    if (rank(loadout, 'distance-draw')) { damage *= 1 + Math.min(1, distance(p, target) / 8) * .15 * rank(loadout, 'distance-draw'); }
    if (loadout.weapon === 'staff') { p.resource = Math.min(100, p.resource + 18); }
    if (loadout.weapon === 'grimoire') { p.resource = Math.min(100, p.resource + 12); }
    const pierce = rank(loadout, 'piercing') * R.extraPierce + rank(loadout, 'railgun') * 2;
    const projectile = shot(b, p, angle, damage, true, { pierce, speed: loadout.weapon === 'bow' ? .38 : .28,
        splash: loadout.weapon === 'staff' ? 1.4 : loadout.weapon === 'cannon' ? 1.8 + rank(loadout, 'shrapnel') * .3 : 0,
        bounce: rank(loadout, 'ricochet'), radius: loadout.weapon === 'cannon' ? .3 : .16 });
    if (loadout.weapon === 'bow' && rank(loadout, 'split-arrow') && p.combo % 3 === 2) {
        for (const offset of [-.18, .18]) { shot(b, p, angle + offset, damage * (.35 + rank(loadout, 'split-arrow') * .1), true, { speed: projectile.speed, pierce }); }
    }
}

function skill(b: Battle, loadout: Loadout, target: Enemy | undefined) {
    const p = b.player, spec = WEAPONS[loadout.weapon], focus = rank(loadout, 'focus');
    p.skill = Math.round(spec.skillCooldown * (focus ? R.focusSkill - (focus - 1) * .06 : 1));
    if (rank(loadout, 'aegis')) { p.shield = 18 + rank(loadout, 'aegis') * 6; p.guard = 8; grantWard(p, rank(loadout, 'aegis') * 6); }
    switch (loadout.weapon) {
        case 'blade': {
            p.shield = 26 + rank(loadout, 'aegis') * 6; p.guard = 9;
            const power = 1 + p.resource / 100; p.resource = 0;
            effect(b, p, 'slash', 3.6, p.facing);
            for (const e of b.enemies) {
                if (e.hp <= 0 || distance(p, e) > 3.6 + ENEMIES[e.kind].radius) { continue; }
                if (rank(loadout, 'shield-break')) { e.exposed = 70 + 30 * rank(loadout, 'shield-break'); }
                hurtEnemy(b, e, spec.skill * power, loadout, 'skill'); stagger(b, e, 40);
                if (!isBoss(e.kind)) { moveBody(b, e, angleTo(p, e), 1.5, ENEMIES[e.kind].radius); }
            }
            if (rank(loadout, 'valor')) { grantWard(p, 12 * rank(loadout, 'valor') * power); }
            break;
        }
        case 'bow':
            for (let i = -2; i <= 2; i++) { shot(b, p, p.facing + i * .15, spec.skill, true, { pierce: 6, speed: .42, source: 'skill' }); }
            // Recoil is part of the action, not a free immunity window.
            moveBody(b, p, p.facing + Math.PI, .85, RULES.playerRadius);
            break;
        case 'staff': {
            const center = target ?? p, power = 1 + p.resource / 125;
            p.resource = 0;
            if (rank(loadout, 'convergence')) {
                for (const e of b.enemies) { if (distance(e, center) < 4 + rank(loadout, 'convergence')) { moveBody(b, e, angleTo(e, center), 1.2, ENEMIES[e.kind].radius); } }
            }
            for (let i = 0; i < 3; i++) { hazard(b, atAngle(center, i * TAU / 3, .7), 'slam', 2.3, 10 + i * 10, 1, spec.skill * power, true, { source: 'skill' }); }
            if (rank(loadout, 'nova')) {
                hazard(b, p, 'frost', 3 + rank(loadout, 'nova') * .5, 0, 32, 6 * rank(loadout, 'nova'), true, { source: 'skill' });
                for (const e of b.enemies) { if (distance(p, e) < 3.5) { e.chill = 120; stagger(b, e, 25); } }
            }
            break;
        }
        case 'daggers': {
            p.invulnerable = Math.max(p.invulnerable, 12);
            if (target) {
                // Land behind the locked target; body placement obeys the same arena obstacles.
                const behind = atAngle(target, target.angle + Math.PI, ENEMIES[target.kind].radius + .55);
                moveBody(b, p, angleTo(p, behind), Math.min(5, distance(p, behind)), RULES.playerRadius);
                p.facing = angleTo(p, target); target.exposed = 60;
                hurtEnemy(b, target, spec.skill, loadout, 'skill'); stagger(b, target, 20);
                effect(b, p, 'slash', 2, p.facing);
            }
            if (rank(loadout, 'shadowstep')) { companion(b, 'shade', p, 95 + rank(loadout, 'shadowstep') * 30, rank(loadout, 'shadowstep')); }
            break;
        }
        case 'grimoire': {
            const power = p.resource; p.resource = 0;
            for (const ally of b.companions) { if (ally.kind === 'familiar') { ally.empowered = 90 + power; ally.hp = Math.max(ally.hp, 38); ally.cooldown = 0; } }
            if (target) { target.exposed = 100; hurtEnemy(b, target, spec.skill + power * .3, loadout, 'skill'); }
            if (rank(loadout, 'command')) { hazard(b, target ?? p, 'storm', 2.4 + rank(loadout, 'command') * .3, 10, 65, 7 * rank(loadout, 'command'), true, { source: 'skill' }); }
            break;
        }
        case 'cannon': {
            const maxTurrets = 1 + (rank(loadout, 'overclock') >= 2 ? 1 : 0);
            const turrets = b.companions.filter(c => c.kind === 'turret');
            if (turrets.length >= maxTurrets) { turrets[0].life = 0; }
            companion(b, 'turret', atAngle(p, p.facing, .9), 240 + rank(loadout, 'overclock') * 45, rank(loadout, 'overclock'));
            if (rank(loadout, 'bunker')) { grantWard(p, 15 * rank(loadout, 'bunker')); }
            break;
        }
    }
}

function dash(b: Battle, input: InputFrame, loadout: Loadout) {
    const p = b.player, swift = rank(loadout, 'quicksilver');
    p.dash = Math.round(RULES.dashCooldown * (1 - swift * .08)); p.dashTime = RULES.dashTicks;
    p.dashAngle = input.move ? direction(input.move) : p.facing; p.invulnerable = RULES.dashTicks + 2;
    if (rank(loadout, 'storm-step')) { hazard(b, p, 'storm', 1.7 + rank(loadout, 'storm-step') * .15, 0, 70, 6 + rank(loadout, 'storm-step') * 3, true); }
    if (rank(loadout, 'trapper')) { hazard(b, p, 'frost', 1.8, 12, 110, 5 * rank(loadout, 'trapper'), true); }
    if (rank(loadout, 'minefield')) { hazard(b, p, 'mine', 2 + rank(loadout, 'minefield') * .2, 12, 180, 25 * rank(loadout, 'minefield'), true); }
    if (rank(loadout, 'smoke')) {
        for (const e of b.enemies) { if (distance(e, p) < 3 + rank(loadout, 'smoke') * .4) { stagger(b, e, 30 + rank(loadout, 'smoke') * 8); e.exposed = 65; } }
        effect(b, p, 'guard', 3);
    }
}

export function playerTick(b: Battle, input: InputFrame, loadout: Loadout) {
    const p = b.player;
    for (const key of ['attack', 'dash', 'skill', 'invulnerable', 'swing', 'shield', 'guard'] as const) { p[key] = Math.max(0, p[key] - 1); }
    const target = b.enemies.filter(e => e.hp > 0).sort((a, c) => distance(p, a) - distance(p, c))[0];
    if (input.dash && !p.dash && !p.dashTime) { dash(b, input, loadout); }
    const before = { x: p.x, y: p.y };
    if (p.dashTime > 0) {
        moveBody(b, p, p.dashAngle, RULES.speed * 3.6, RULES.playerRadius); p.dashTime--;
        if (!p.dashTime && rank(loadout, 'momentum') && target && distance(p, target) < 3) { lightning(b, target, loadout, 10 + rank(loadout, 'momentum') * 5); }
    } else if (input.move) {
        p.facing = direction(input.move);
        const aiming = p.swing > 0;
        let speed = RULES.speed * (aiming ? WEAPONS[loadout.weapon].moveFire : 1);
        if (rank(loadout, 'quicksilver') && p.dash > RULES.dashCooldown / 2) { speed *= 1 + rank(loadout, 'quicksilver') * .1; }
        if (b.hazards.some(h => !h.friendly && h.kind === 'frost' && !h.wait && distance(h, p) < h.radius)) { speed *= .65; }
        moveBody(b, p, p.facing, speed, RULES.playerRadius);
    }
    p.travel += distance(before, p);
    if (rank(loadout, 'pilgrim') && p.travel >= 28) { p.travel -= 28; grantWard(p, rank(loadout, 'pilgrim') * 6, 35); }
    if (rank(loadout, 'wardstone') && b.tick - p.lastHit > 150 && b.tick % 30 === 0) { grantWard(p, 2, rank(loadout, 'wardstone') * 10); }
    if (input.skill && !p.skill) { if (target) { p.facing = angleTo(p, target); } skill(b, loadout, target); }
    const reach = WEAPONS[loadout.weapon].range + (loadout.weapon === 'blade' || loadout.weapon === 'daggers' ? rank(loadout, 'piercing') * .25 : 0);
    if (target && !p.attack && distance(p, target) <= reach + ENEMIES[target.kind].radius) {
        attack(b, loadout, target); p.combo++;
        if (rank(loadout, 'echo') && p.combo % Math.max(2, R.echoEvery + 1 - rank(loadout, 'echo')) === 0) { attack(b, loadout, target, true); }
        p.attack = Math.round(WEAPONS[loadout.weapon].period * (rank(loadout, 'focus') ? R.focusAttack : 1));
    }
    if (rank(loadout, 'orbit') && b.tick % Math.round(R.orbitTicks / (1 + rank(loadout, 'orbit') * .25)) === 0 && target && distance(p, target) < 4.5) { lightning(b, target, loadout, 12 + rank(loadout, 'orbit') * 3); }
    if (rank(loadout, 'orbitals') && b.tick % 35 === 0) {
        for (const e of b.enemies) { if (distance(p, e) < 2.5 + rank(loadout, 'orbitals') * .35) { hurtEnemy(b, e, 12 * rank(loadout, 'orbitals'), loadout, 'passive'); e.chill = Math.max(e.chill, 30); } }
        effect(b, p, 'burst', 2.8);
    }
    return { x: p.x - before.x, y: p.y - before.y };
}

export function companionsTick(b: Battle, loadout: Loadout) {
    if (loadout.weapon === 'grimoire' && b.tick % 45 === 1) {
        const wanted = 2 + rank(loadout, 'pack-bond');
        if (b.companions.filter(c => c.kind === 'familiar' && c.hp > 0).length < wanted) { companion(b, 'familiar', atAngle(b.player, b.tick, 1), 36000); }
    }
    for (const ally of b.companions) {
        ally.life--; ally.cooldown = Math.max(0, ally.cooldown - 1);
        if (ally.kind === 'familiar') { ally.empowered = Math.max(0, ally.empowered - 1); }
        const target = b.enemies.filter(e => e.hp > 0).sort((a, c) => distance(a, ally) - distance(c, ally))[0];
        if (ally.hp <= 0 || ally.life <= 0 || !target) { continue; }
        ally.angle = angleTo(ally, target);
        if (ally.kind !== 'turret') {
            if (distance(ally, b.player) > 8) { moveBody(b, ally, angleTo(ally, b.player), .19, .25); }
            else if (distance(ally, target) > 1.3) { moveBody(b, ally, ally.angle, .14 + rank(loadout, 'frenzy') * .015, .25); }
        }
        const reach = ally.kind === 'turret' ? 8 : 1.8;
        if (!ally.cooldown && distance(ally, target) < reach) {
            if (ally.kind === 'turret') { shot(b, ally, ally.angle, WEAPONS.cannon.skill * (1 + ally.empowered * .15), true, { source: 'companion', speed: .35 }); ally.cooldown = 28 - ally.empowered * 3; }
            else {
                const empowered = ally.kind === 'familiar' && ally.empowered > 0;
                const damage = ally.kind === 'shade' ? 9 + ally.empowered * 4 : (empowered ? 17 : 10) * (1 + rank(loadout, 'covenant') * .15);
                hurtEnemy(b, target, damage, loadout, 'companion', ally); effect(b, ally, 'slash', 1.2, ally.angle);
                ally.cooldown = Math.round((empowered ? 20 : 32) / (1 + rank(loadout, 'frenzy') * .18));
            }
        }
    }
    for (const ally of b.companions) {
        if (ally.hp <= 0 && ally.kind === 'familiar' && rank(loadout, 'martyr')) {
            heal(b, rank(loadout, 'martyr')); hazard(b, ally, 'slam', 2.2, 0, 1, 15 * rank(loadout, 'martyr'), true);
        }
    }
    b.companions = b.companions.filter(c => c.hp > 0 && c.life > 0);
}
