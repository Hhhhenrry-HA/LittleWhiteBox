import assert from 'node:assert/strict';
import test from 'node:test';
import { appendInput, createBattle, replayInputs, tickBattle } from '../apps/game/expedition/combat.ts';
import { advanceExpedition, emptyExpedition } from '../apps/game/expedition/domain.ts';
import { parseCommand, validateExpedition } from '../apps/game/expedition/partition.ts';
import { RULES } from '../apps/game/expedition/content.ts';
import { pilot } from './fixtures/expedition-pilot.mjs';
const idle = { move: 0, dash: false, skill: false };
const loadout = (relics = [], weapon = 'blade', oaths = []) => ({ weapon, relics, oaths });

test('fixed-step local combat and compressed Host replay are identical across checkpoints', () => {
    const gear = loadout(['storm-step', 'conductor', 'momentum', 'cinder']), initial = createBattle(18, 1, false, false, 100, gear), local = structuredClone(initial), tape = [];
    for (let i = 0; i < 600 && local.status === 'fighting'; i++) { const input = pilot(local, gear.weapon); appendInput(tape, input); tickBattle(local, input, gear); }
    const host = replayInputs(initial, tape, gear); assert.deepEqual(host, local); assert.ok(host.kills > 0);
    const next = structuredClone(host), more = [];
    for (let i = 0; i < 200; i++) { const input = pilot(next, gear.weapon); appendInput(more, input); tickBattle(next, input, gear); }
    assert.deepEqual(replayInputs(host, more, gear), next);
});

test('dashing avoids an active strike; standing in the same hazard takes damage', () => {
    const gear = loadout(), b = createBattle(1, 0, false, false, 100, gear);
    b.player.invulnerable = 0; b.hazards.push({ id: 999, x: 0, y: 5, radius: 2, wait: 0, life: 5, damage: 18, friendly: false, kind: 'slam' });
    const still = replayInputs(b, [{ ...idle, ticks: 1 }], gear), dash = replayInputs(b, [{ ...idle, move: 3, dash: true, ticks: 1 }], gear);
    assert.equal(still.player.hp, 82); assert.equal(dash.player.hp, 100); assert.ok(dash.player.dash > 0);
});

test('blade skill blocks and reflects enemy projectiles without granting permanent invulnerability', () => {
    const gear = loadout(), b = createBattle(1, 0, false, false, 100, gear);
    b.player.invulnerable = 0; b.shots = [{ id: 99, x: 0, y: 4.5, angle: Math.PI / 2, speed: .15, damage: 10, life: 100, friendly: false, source: 'attack', pierce: 0, hits: [] }];
    tickBattle(b, { ...idle, skill: true }, gear); assert.equal(b.player.hp, 100); assert.equal(b.shots[0].friendly, true);
    for (let i = 0; i < 40; i++) tickBattle(b, idle, gear);
    assert.equal(b.player.shield, 0);
});

test('lightning combination changes dash economy and affects more enemies than the base relic', () => {
    const initial = createBattle(3, 0, false, false, 100, loadout());
    initial.player.attack = 100; initial.player.dash = 35; initial.tick = 14;
    initial.enemies.forEach((e, i) => { e.x = i * 1.3; e.y = 5; e.hp = 1000; e.maxHp = 1000; e.cooldown = 100; });
    initial.hazards = [{ id: 99, x: 0, y: 5, radius: .6, wait: 0, life: 60, damage: 9, friendly: true, kind: 'storm' }];
    const base = replayInputs(initial, [{ ...idle, ticks: 1 }], loadout(['storm-step']));
    const combo = replayInputs(initial, [{ ...idle, ticks: 1 }], loadout(['storm-step', 'conductor', 'momentum']));
    assert.ok(combo.enemies.filter(e => e.hp < 1000).length > base.enemies.filter(e => e.hp < 1000).length);
    assert.ok(combo.player.dash < base.player.dash);
});

test('boss thresholds change phases and summon an encounter mechanic', () => {
    const gear = loadout([], 'bow', ['legion']), b = createBattle(3, 2, false, true, 100, gear);
    const boss = b.enemies[0]; boss.hp = boss.maxHp * .25; boss.windup = 1;
    tickBattle(b, idle, gear); assert.equal(boss.phase, 3); assert.ok(b.enemies.length > 1); assert.ok(b.hazards.length > 0);
});

test('lifesteal cannot resurrect a player killed earlier in the same simulation tick', () => {
    const gear = loadout(['siphon']), b = createBattle(3, 0, false, false, 1, gear);
    b.player.invulnerable = 0; b.player.attack = 100; b.kills = 4;
    const e = b.enemies[0]; e.x = 4; e.y = 5; e.hp = 1; e.cooldown = 100;
    const base = { angle: 0, speed: 0, life: 20, damage: 100, pierce: 0, hits: [], source: 'attack' };
    b.shots = [{ ...base, id: 100, x: 0, y: 5, friendly: false }, { ...base, hits: [], id: 101, x: 4, y: 5, friendly: true }];
    tickBattle(b, idle, gear); assert.equal(b.status, 'lost'); assert.equal(b.player.hp, 0); assert.equal(b.kills, 5);
});

test('input protocol rejects forged results, unbounded work and illegal controls', () => {
    for (const command of [{ type: 'win' }, { type: 'input', spans: [] }, { type: 'input', spans: [{ ...idle, move: 9, ticks: 1 }] },
        { type: 'input', spans: [{ ...idle, ticks: RULES.maxInputTicks + 1 }] }, { type: 'input', spans: [{ ...idle, dash: 'yes', ticks: 1 }] }]) {
        assert.throws(() => parseCommand(command), { code: 'expedition_invalid' });
    }
});

test('routes, discovered offers and selected loadouts survive serialization without rerolling', () => {
    const start = { type: 'start', weapon: 'blade', cloak: 0, oaths: [] };
    const data = advanceExpedition(emptyExpedition(), start, 'one', 18); validateExpedition(data);
    assert.deepEqual(advanceExpedition(data, start, 'one', 999), data);
    const entered = advanceExpedition(JSON.parse(JSON.stringify(data)), { type: 'route', id: 0 }, 'two', 0); validateExpedition(entered);
    assert.equal(entered.active.phase, 'battle'); assert.equal(entered.active.hp, 100);
    assert.throws(() => advanceExpedition(data, { ...start, weapon: 'bow' }, 'one', 0), { code: 'expedition_identity' });
    assert.throws(() => advanceExpedition(emptyExpedition(), { ...start, weapon: 'bow' }, 'locked', 0), { code: 'expedition_locked' });
    const abandoned = advanceExpedition(entered, { type: 'abandon' }, 'three', 0); validateExpedition(abandoned);
    const restarted = advanceExpedition(abandoned, start, 'four', 33); assert.deepEqual(restarted.active.relics, []); assert.equal(restarted.active.shards, 0);
});

test('finite slots require an explicit sacrifice; discarding an offer preserves the build', () => {
    const data = advanceExpedition(emptyExpedition(), { type: 'start', weapon: 'blade', cloak: 0, oaths: [] }, 'one', 2);
    data.active.phase = 'reward'; data.active.routes = []; data.active.offers = ['cinder'];
    data.active.relics = ['frost', 'shatter', 'echo', 'hunter', 'aegis', 'siphon'];
    assert.throws(() => advanceExpedition(data, { type: 'relic', id: 'cinder', replace: null }, 'two', 0), { code: 'expedition_invalid' });
    const swapped = advanceExpedition(data, { type: 'relic', id: 'cinder', replace: 'hunter' }, 'two', 0);
    assert.equal(swapped.active.relics.length, RULES.relicSlots); assert.ok(!swapped.active.relics.includes('hunter')); assert.ok(swapped.discoveries.includes('cinder'));
    const skipped = advanceExpedition(data, { type: 'leave' }, 'two', 0); assert.deepEqual(skipped.active.relics, data.active.relics); assert.equal(skipped.active.step, 1);
});
