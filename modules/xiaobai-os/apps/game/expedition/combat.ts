import { BOSSES, ENEMIES, isBoss, RELIC_RULES as R, RULES, WEAPONS } from './content.js';
import { random } from './random.js';
import type { Battle, Enemy, EnemyKind, InputFrame, InputSpan, Loadout, Point, Relic } from './types.js';

const TAU = Math.PI * 2;
export const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);
const angleTo = (a: Point, b: Point) => Math.atan2(b.y - a.y, b.x - a.x);
const has = (loadout: Loadout, relic: Relic) => loadout.relics.includes(relic);
const direction = (move: number) => (move - 1) * Math.PI / 4 - Math.PI / 2;

export function moveBody(b: Battle, body: Point, angle: number, speed: number, radius: number) {
    body.x = Math.max(-RULES.arena + radius, Math.min(RULES.arena - radius, body.x + Math.cos(angle) * speed));
    body.y = Math.max(-RULES.arena + radius, Math.min(RULES.arena - radius, body.y + Math.sin(angle) * speed));
    for (const obstacle of b.obstacles) {
        const d = distance(body, obstacle), min = radius + obstacle.radius;
        if (d < min) { const angle = d < .001 ? 0 : angleTo(obstacle, body); body.x = obstacle.x + Math.cos(angle) * min; body.y = obstacle.y + Math.sin(angle) * min; }
    }
}
function effect(b: Battle, p: Point, kind: Battle['effects'][number]['kind'], size = 1, angle = 0) {
    b.effects.push({ id: ++b.serial, x: p.x, y: p.y, kind, size, angle, life: kind === 'slash' ? 9 : 15 });
}
function spawn(b: Battle, kind: EnemyKind, p: Point) {
    const spec = ENEMIES[kind], hp = spec.hp * (isBoss(kind) ? 1 : 1 + b.zone * .22 + (b.elite ? .35 : 0));
    b.enemies.push({ id: ++b.serial, kind, x: p.x, y: p.y, hp, maxHp: hp, angle: Math.PI / 2,
        cooldown: 25 + Math.floor(random(b) * 35), windup: 0, target: { ...p }, pattern: 0, phase: 1, chill: 0, burn: 0, marked: 0 });
}
function spawnWave(b: Battle, loadout: Loadout) {
    b.wave++;
    if (b.boss) { spawn(b, BOSSES[b.zone], { x: 0, y: -5 }); return; }
    const kinds: EnemyKind[] = ['soldier', 'archer', 'guard', ...(b.zone > 0 ? ['priest', 'charger'] as EnemyKind[] : ['charger'] as EnemyKind[])];
    const count = 3 + b.zone + (b.elite ? 2 : 0) + (loadout.oaths.includes('legion') ? 2 : 0);
    for (let i = 0; i < count; i++) {
        const angle = TAU * i / count + random(b) * .5;
        spawn(b, kinds[Math.floor(random(b) * kinds.length)], { x: Math.cos(angle) * 8.4, y: Math.sin(angle) * 8.4 });
    }
}
export function createBattle(seed: number, zone: number, elite: boolean, boss: boolean, hp: number, loadout: Loadout): Battle {
    const b: Battle = { tick: 0, seed, serial: 0, player: { x: 0, y: 5, hp, facing: -Math.PI / 2, attack: 0, dash: 0, skill: 0,
        invulnerable: 30, dashTime: 0, dashAngle: 0, swing: 0, shield: 0, combo: 0 }, enemies: [], shots: [], hazards: [], effects: [],
        obstacles: boss ? [] : zone === 1 ? [{ x: -3.5, y: 0, radius: 1.1 }, { x: 3.5, y: 0, radius: 1.1 }]
            : [{ x: -5, y: -3, radius: .9 }, { x: 5, y: 3, radius: .9 }],
        wave: 0, waves: boss ? 1 : elite ? 3 : 2, nextWave: 0, kills: 0, damageTaken: 0, status: 'fighting', zone, elite, boss };
    spawnWave(b, loadout); return b;
}
function heal(b: Battle, amount: number) { if (b.player.hp <= 0) { return; } b.player.hp = Math.min(RULES.maxHp, b.player.hp + amount); effect(b, b.player, 'heal'); }
function hurtEnemy(b: Battle, e: Enemy, amount: number, loadout: Loadout, source: 'attack' | 'skill' | 'passive' | 'lightning', origin: Point = b.player) {
    if (e.hp <= 0) { return; }
    let damage = amount * (has(loadout, 'blood-price') ? R.bloodDamage : 1);
    if (has(loadout, 'execution') && e.hp / e.maxHp < R.executeThreshold) { damage *= R.executeDamage; }
    if (e.kind === 'guard' && source === 'attack' && Math.cos(angleTo(e, origin) - e.angle) > .4) { damage *= .25; }
    if (e.kind !== 'priest' && !isBoss(e.kind) && b.enemies.some(other => other.kind === 'priest' && other.hp > 0 && distance(e, other) < 4)) { damage *= .6; }
    if (source === 'skill' && e.chill > 0 && has(loadout, 'shatter')) {
        damage += 22; e.chill = 0; effect(b, e, 'burst', 2.2);
        for (const other of b.enemies) { if (other.id !== e.id && distance(e, other) < 2.2) { hurtEnemy(b, other, 12, loadout, 'passive', e); } }
    }
    e.hp = Math.max(0, e.hp - damage); e.marked = 5;
    if (source === 'attack' || source === 'skill') {
        if (has(loadout, 'cinder')) { e.burn = 120; }
        if (has(loadout, 'frost')) { e.chill = 90; }
    }
    if (source === 'lightning' && has(loadout, 'momentum')) { b.player.dash = Math.max(0, b.player.dash - 6); }
    if (e.hp > 0) { return; }
    b.kills++; effect(b, e, 'burst', isBoss(e.kind) ? 3 : .8);
    if (has(loadout, 'wildfire') && e.burn > 0) { b.hazards.push({ id: ++b.serial, x: e.x, y: e.y, radius: 2, wait: 0, life: 90, damage: 4, friendly: true, kind: 'fire' }); }
    if (has(loadout, 'siphon') && (b.kills % R.siphonEvery === 0 || isBoss(e.kind))) { heal(b, isBoss(e.kind) ? R.siphonBossHeal : R.siphonHeal); }
}
function lightning(b: Battle, target: Enemy, loadout: Loadout, damage: number) {
    const targets = [target];
    if (has(loadout, 'conductor')) { targets.push(...b.enemies.filter(e => e.id !== target.id && e.hp > 0 && distance(e, target) < 4).sort((a, c) => distance(a, target) - distance(c, target)).slice(0, 2)); }
    for (const e of targets) { effect(b, e, 'lightning', 1); hurtEnemy(b, e, damage, loadout, 'lightning'); }
}
function hurtPlayer(b: Battle, damage: number, loadout: Loadout) {
    if (b.player.invulnerable > 0 || b.player.hp <= 0) { return; }
    const amount = b.player.shield > 0 ? 0 : damage * (has(loadout, 'blood-price') ? R.bloodHurt : 1);
    b.player.hp = Math.max(0, b.player.hp - amount); b.damageTaken += amount; b.player.invulnerable = 20;
    effect(b, b.player, 'hit', 1);
    if (has(loadout, 'thorns')) {
        for (const e of b.enemies) { if (distance(e, b.player) < 3) { hurtEnemy(b, e, 18, loadout, 'passive'); if (!isBoss(e.kind)) { moveBody(b, e, angleTo(b.player, e), 1.1, ENEMIES[e.kind].radius); } } }
    }
}
function shot(b: Battle, from: Point, angle: number, damage: number, friendly: boolean, pierce = 0, speed = .19, source: 'attack' | 'skill' = 'attack') {
    b.shots.push({ id: ++b.serial, x: from.x, y: from.y, angle, speed, damage, friendly, source, pierce, hits: [], life: 150 });
}
function slam(b: Battle, p: Point, radius: number, delay: number, damage: number) {
    b.hazards.push({ id: ++b.serial, x: p.x, y: p.y, radius, wait: delay, life: 12, damage, friendly: false, kind: 'slam' });
}
function attack(b: Battle, loadout: Loadout, target: Enemy, extra = false) {
    const spec = WEAPONS[loadout.weapon], p = b.player, angle = angleTo(p, target);
    p.facing = angle; p.swing = 9;
    if (loadout.weapon === 'blade') {
        const range = spec.range + (has(loadout, 'piercing') ? .7 : 0);
        effect(b, p, 'slash', range, angle);
        for (const e of b.enemies) {
            if (distance(p, e) <= range + ENEMIES[e.kind].radius && Math.cos(angleTo(p, e) - angle) > -.1) { hurtEnemy(b, e, spec.damage * (extra ? .65 : 1), loadout, 'attack'); }
        }
    } else { shot(b, p, angle + (extra ? .12 : 0), spec.damage * (extra ? .65 : 1), true, has(loadout, 'piercing') ? R.extraPierce : 0, loadout.weapon === 'bow' ? .36 : .25); }
}
function skill(b: Battle, loadout: Loadout) {
    const p = b.player, spec = WEAPONS[loadout.weapon];
    p.skill = Math.round(RULES.skillCooldown * (has(loadout, 'focus') ? R.focusSkill : 1));
    if (has(loadout, 'aegis') || loadout.weapon === 'blade') { p.shield = 32; }
    if (loadout.weapon === 'blade') {
        effect(b, p, 'slash', 3.5, p.facing);
        for (const e of b.enemies) { if (distance(p, e) < 3.5 + ENEMIES[e.kind].radius) { hurtEnemy(b, e, spec.skill, loadout, 'skill'); if (!isBoss(e.kind)) { moveBody(b, e, angleTo(p, e), 1.7, ENEMIES[e.kind].radius); e.windup = 0; e.cooldown = 35; } } }
    } else if (loadout.weapon === 'bow') {
        for (let i = -2; i <= 2; i++) { shot(b, p, p.facing + i * .15, spec.skill, true, 8, .4, 'skill'); }
    } else {
        const target = b.enemies.filter(e => e.hp > 0).sort((a, c) => distance(p, a) - distance(p, c))[0] ?? p;
        for (let i = 0; i < 3; i++) { b.hazards.push({ id: ++b.serial, x: target.x + (i - 1) * 1.1, y: target.y, radius: 2.4, wait: 10 + i * 8, life: 1, damage: spec.skill, friendly: true, kind: 'slam' }); }
    }
}
function bossAttack(b: Battle, e: Enemy, loadout: Loadout) {
    const spec = ENEMIES[e.kind], pattern = e.pattern++ % 3;
    if (pattern === 0) {
        slam(b, e.target, e.kind === 'warden' ? 3 : 2.2, 20, spec.damage);
        if (e.phase > 1) { slam(b, { x: e.target.x + 3, y: e.target.y }, 2.5, 35, spec.damage); slam(b, { x: e.target.x - 3, y: e.target.y }, 2.5, 35, spec.damage); }
    } else if (pattern === 1) {
        const count = (e.kind === 'weaver' ? 14 : 10) + e.phase * 2;
        for (let i = 0; i < count; i++) { shot(b, e, i * TAU / count + b.tick * .008, spec.damage * .7, false, 0, .12 + e.phase * .016); }
    } else if (e.kind === 'warden') {
        const angle = angleTo(e, e.target);
        for (let i = 1; i <= 5; i++) { slam(b, { x: e.x + Math.cos(angle) * i * 1.8, y: e.y + Math.sin(angle) * i * 1.8 }, 1.5, 8 + i * 6, spec.damage); }
    } else {
        for (let i = 0; i < 5 + e.phase; i++) { const a = i * TAU / (5 + e.phase); slam(b, { x: Math.cos(a) * 5, y: Math.sin(a) * 5 }, 2.3, 28 + i * 3, spec.damage); }
        shot(b, e, angleTo(e, b.player), spec.damage, false, 0, .22);
    }
    const phase = e.hp / e.maxHp < .32 && e.kind === 'king' ? 3 : e.hp / e.maxHp < .6 ? 2 : 1;
    if (phase > e.phase) {
        e.phase = phase; effect(b, e, 'burst', 5); e.cooldown = 55;
        // Phase transitions alter the encounter, not only hit points.
        if (e.kind !== 'warden' || loadout.oaths.includes('legion')) {
            spawn(b, 'guard', { x: -6, y: -5 }); spawn(b, e.kind === 'king' ? 'priest' : 'archer', { x: 6, y: -5 });
        }
        if (loadout.oaths.includes('legion')) { spawn(b, 'charger', { x: 0, y: -8 }); }
    }
}
function enemiesTick(b: Battle, loadout: Loadout) {
    for (const e of [...b.enemies]) {
        if (e.hp <= 0) { continue; }
        e.marked = Math.max(0, e.marked - 1); e.chill = Math.max(0, e.chill - 1);
        if (e.burn > 0) { e.burn--; if (b.tick % 15 === 0) { hurtEnemy(b, e, 3, loadout, 'passive'); } }
        if (e.hp <= 0) { continue; }
        const spec = ENEMIES[e.kind], d = distance(e, b.player), haste = loadout.oaths.includes('haste');
        if (e.windup > 0) {
            e.windup--;
            if (e.windup > 0) { continue; }
            if (isBoss(e.kind)) { bossAttack(b, e, loadout); }
            else if (e.kind === 'archer') { shot(b, e, e.angle, spec.damage, false); }
            else if (e.kind === 'priest') {
                for (let i = -1; i <= 1; i++) { shot(b, e, e.angle + i * .2, spec.damage, false, 0, .13); }
            } else if (e.kind === 'charger') { e.cooldown = -18; }
            else if (distance(e.target, b.player) < spec.reach + .4 && d < spec.reach + .8) { hurtPlayer(b, spec.damage, loadout); effect(b, e.target, 'slash', spec.reach, e.angle); }
            if (e.cooldown >= 0) { e.cooldown = Math.round(spec.cooldown * (haste ? .8 : 1) / (isBoss(e.kind) ? 1 + (e.phase - 1) * .12 : 1)); }
            continue;
        }
        if (e.cooldown < 0) {
            moveBody(b, e, e.angle, .29, spec.radius); if (distance(e, b.player) < spec.radius + .4) { hurtPlayer(b, spec.damage, loadout); }
            e.cooldown++; if (!e.cooldown) { e.cooldown = spec.cooldown; } continue;
        }
        e.cooldown = Math.max(0, e.cooldown - 1);
        e.angle = angleTo(e, b.player);
        if (!e.cooldown && d < spec.reach) {
            e.target = { x: b.player.x, y: b.player.y }; e.windup = Math.round(spec.windup * (haste ? .75 : 1)); continue;
        }
        const ranged = e.kind === 'archer' || e.kind === 'priest';
        if (d > (ranged ? 5 : isBoss(e.kind) ? 3 : .95) || ranged && d < 3) {
            moveBody(b, e, e.angle + (ranged && d < 3 ? Math.PI : 0), spec.speed * (e.chill ? isBoss(e.kind) ? .8 : .5 : 1), spec.radius);
        }
        for (const other of b.enemies) {
            if (other.id === e.id || other.hp <= 0) { continue; }
            const separation = spec.radius + ENEMIES[other.kind].radius;
            if (distance(e, other) < separation) { moveBody(b, e, angleTo(other, e), .024, spec.radius); }
        }
    }
}
function projectilesTick(b: Battle, loadout: Loadout) {
    for (const s of b.shots) {
        s.x += Math.cos(s.angle) * s.speed; s.y += Math.sin(s.angle) * s.speed; s.life--;
        if (Math.abs(s.x) > RULES.arena || Math.abs(s.y) > RULES.arena || b.obstacles.some(o => distance(o, s) < o.radius)) { s.life = 0; continue; }
        if (!s.friendly) {
            if (distance(s, b.player) < .6) {
                if (b.player.shield > 0) { s.friendly = true; s.source = 'skill'; s.angle += Math.PI; s.damage *= 2; s.hits = []; effect(b, b.player, 'lightning'); }
                else { hurtPlayer(b, s.damage, loadout); s.life = 0; }
            }
            continue;
        }
        for (const e of b.enemies) {
            if (e.hp <= 0 || s.hits.includes(e.id) || distance(e, s) > ENEMIES[e.kind].radius + .2) { continue; }
            s.hits.push(e.id);
            const damage = s.damage * (has(loadout, 'hunter') && distance(e, b.player) > R.hunterRange ? R.hunterDamage : 1);
            hurtEnemy(b, e, damage, loadout, s.source, s);
            if (loadout.weapon === 'staff') { effect(b, e, 'burst', 1.5); for (const other of b.enemies) { if (other.id !== e.id && distance(other, e) < 1.6) { hurtEnemy(b, other, damage * .5, loadout, 'attack', e); } } }
            if (s.pierce-- <= 0) { s.life = 0; break; }
        }
    }
    for (const h of [...b.hazards]) {
        if (h.wait > 0) { h.wait--; continue; }
        h.life--;
        if (!h.friendly) { if (distance(h, b.player) < h.radius + .25) { hurtPlayer(b, h.damage, loadout); } continue; }
        if (h.kind !== 'slam' && b.tick % 15 !== 0) { continue; }
        const targets = b.enemies.filter(e => e.hp > 0 && distance(e, h) < h.radius + ENEMIES[e.kind].radius);
        for (const e of targets) {
            if (h.kind === 'storm') { lightning(b, e, loadout, h.damage); }
            else { if (h.kind === 'fire') { e.burn = Math.max(e.burn, 45); } hurtEnemy(b, e, h.damage, loadout, h.kind === 'slam' ? 'skill' : 'passive', h); }
        }
    }
    b.shots = b.shots.filter(s => s.life > 0); b.hazards = b.hazards.filter(h => h.life > 0);
}
/** Mutates only this battle. No wall clock, DOM, random source, storage or network. */
export function tickBattle(b: Battle, input: InputFrame, loadout: Loadout): void {
    if (b.status !== 'fighting') { return; }
    b.tick++;
    const p = b.player;
    for (const key of ['attack', 'dash', 'skill', 'invulnerable', 'swing', 'shield'] as const) { p[key] = Math.max(0, p[key] - 1); }
    b.effects = b.effects.filter(e => --e.life > 0).slice(-80);
    if (input.dash && !p.dash && !p.dashTime) {
        p.dash = RULES.dashCooldown; p.dashTime = RULES.dashTicks; p.dashAngle = input.move ? direction(input.move) : p.facing;
        p.invulnerable = RULES.dashTicks + 2;
        if (has(loadout, 'storm-step')) { b.hazards.push({ id: ++b.serial, x: p.x, y: p.y, radius: 1.7, wait: 0, life: 70, damage: 9, friendly: true, kind: 'storm' }); }
    }
    if (p.dashTime > 0) {
        moveBody(b, p, p.dashAngle, RULES.speed * 3.6, RULES.playerRadius); p.dashTime--;
        if (!p.dashTime && has(loadout, 'momentum')) { const target = b.enemies.find(e => e.hp > 0 && distance(p, e) < 2.5); if (target) { lightning(b, target, loadout, 14); } }
    } else if (input.move) { p.facing = direction(input.move); moveBody(b, p, p.facing, RULES.speed, RULES.playerRadius); }
    const target = b.enemies.filter(e => e.hp > 0).sort((a, c) => distance(p, a) - distance(p, c))[0];
    if (input.skill && !p.skill) { if (target) { p.facing = angleTo(p, target); } skill(b, loadout); }
    if (target && !p.attack && distance(p, target) <= WEAPONS[loadout.weapon].range + ENEMIES[target.kind].radius + (loadout.weapon === 'blade' && has(loadout, 'piercing') ? .7 : 0)) {
        attack(b, loadout, target); p.combo++; if (has(loadout, 'echo') && p.combo % R.echoEvery === 0) { attack(b, loadout, target, true); }
        p.attack = Math.round(WEAPONS[loadout.weapon].period * (has(loadout, 'focus') ? R.focusAttack : 1));
    }
    if (has(loadout, 'orbit') && b.tick % R.orbitTicks === 0 && target && distance(p, target) < 4) { lightning(b, target, loadout, 14); }
    enemiesTick(b, loadout); projectilesTick(b, loadout);
    b.enemies = b.enemies.filter(e => e.hp > 0);
    if (p.hp <= 0) { b.status = 'lost'; p.hp = 0; }
    else if (!b.enemies.length) {
        if (b.wave >= b.waves) { b.status = 'won'; b.shots = []; b.hazards = []; }
        else if (++b.nextWave >= 45) { b.nextWave = 0; spawnWave(b, loadout); }
    }
}
export function replayInputs(battle: Battle, spans: readonly InputSpan[], loadout: Loadout): Battle {
    const next = structuredClone(battle);
    for (const span of spans) { for (let i = 0; i < span.ticks; i++) { tickBattle(next, span, loadout); } }
    return next;
}
export function appendInput(spans: InputSpan[], frame: InputFrame) {
    const last = spans.at(-1);
    if (last && last.move === frame.move && last.dash === frame.dash && last.skill === frame.skill) { last.ticks++; }
    else { spans.push({ ...frame, ticks: 1 }); }
}
