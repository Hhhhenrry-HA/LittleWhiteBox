import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { createBattle, tickBattle } from '../apps/game/expedition/combat.ts';
import { companion, spawn } from '../apps/game/expedition/combat/events.ts';
import { companionsTick } from '../apps/game/expedition/combat/actions.ts';
import { CONTRACT, WEAPONS } from '../apps/game/expedition/content.ts';
import { advanceExpedition, emptyExpedition } from '../apps/game/expedition/domain.ts';
import { EXPEDITION_PARTITION } from '../apps/game/expedition/partition.ts';

const idle = { move: 0, dash: false, skill: false }, cast = { ...idle, skill: true };
const gear = { weapon: 'grimoire', relics: [], oaths: [] };
function setup(loadout = gear) {
    const b = createBattle({ seed: 7, zone: 0, chapter: 0, bossKind: 'warden', encounter: 'skirmish', elite: false, boss: false, hp: 100 }, loadout);
    b.enemies = []; b.player.attack = 1000;
    return b;
}
function targetAt(b, position) {
    const target = spawn(b, 'soldier', position);
    target.hp = target.maxHp = 10000; target.stun = 1000;
    return target;
}
function strike(b, ally, damage, period) {
    b.enemies = []; const target = targetAt(b, ally); ally.cooldown = 0;
    const before = target.hp;
    companionsTick(b, gear);
    assert.equal(before - target.hp, damage); assert.equal(ally.cooldown, period);
}

test('casting before the first summon grants actual empowered damage and attack speed', () => {
    const b = setup(); b.player.resource = CONTRACT.maxPower;
    tickBattle(b, cast, gear);
    assert.equal(b.player.resource, 0); assert.equal(b.player.skill, WEAPONS.grimoire.skillCooldown);
    assert.equal(b.player.resonance, CONTRACT.resonanceTicks + CONTRACT.maxPower - 1);
    assert.equal(b.companions.length, 1); assert.ok(b.effects.some(e => e.kind === 'resonance'));
    const ally = b.companions[0], target = targetAt(b, ally);
    for (let i = 0; i < 11; i++) tickBattle(b, idle, gear);
    assert.equal(target.maxHp - target.hp, CONTRACT.empoweredDamage);
    assert.equal(ally.cooldown, CONTRACT.empoweredAttackTicks);
});

test('replacement summons share the original window even after every familiar has died', () => {
    const b = setup(); b.player.resource = CONTRACT.maxPower;
    tickBattle(b, cast, gear); const fallen = b.companions[0]; fallen.hp = 0;
    targetAt(b, { x: -9, y: -9 });
    for (let i = 0; i < 45; i++) tickBattle(b, idle, gear);
    assert.equal(b.tick, 46); assert.equal(b.companions.length, 1);
    assert.notEqual(b.companions[0].id, fallen.id);
    assert.equal(b.player.resonance, CONTRACT.resonanceTicks + CONTRACT.maxPower - b.tick);
    strike(b, b.companions[0], CONTRACT.empoweredDamage, CONTRACT.empoweredAttackTicks);
});

test('cooldown rejects a second cast; expiry restores base strength for all familiars', () => {
    const b = setup(); tickBattle(b, cast, gear);
    const before = b.player.resonance; tickBattle(b, cast, gear);
    assert.equal(b.player.resonance, before - 1);
    assert.equal(b.effects.filter(e => e.kind === 'resonance').length, 1);
    b.player.resonance = 1;
    strike(b, b.companions[0], CONTRACT.damage, CONTRACT.attackTicks);
    assert.equal(b.player.resonance, 0);
    b.companions = [];
    b.tick = 46; companionsTick(b, gear);
    strike(b, b.companions[0], CONTRACT.damage, CONTRACT.attackTicks);
});

test('resonance heals living familiars without reviving dead or expired ones or swallowing martyr', () => {
    const loadout = { ...gear, relics: [{ id: 'martyr', rank: 1 }] }, b = setup(loadout);
    b.player.hp = 50;
    const dead = companion(b, 'familiar', b.player, 50), expired = companion(b, 'familiar', b.player, 0), alive = companion(b, 'familiar', b.player, 50);
    dead.hp = 0; alive.hp = 3;
    tickBattle(b, cast, loadout);
    assert.equal(dead.hp, 0); assert.equal(alive.hp, CONTRACT.familiarHp); assert.equal(b.player.hp, 51);
    assert.equal(b.companions.some(c => c.id === dead.id || c.id === expired.id), false);
});

const oldCheckpoint = async () => JSON.parse(await readFile(new URL('./fixtures/expedition-v2-resonance.json', import.meta.url), 'utf8'));
test('real v2 checkpoint converts once, preserving progress, reward identities and the remaining buff', async () => {
    // Captured from the v2 simulation: seed-7 sword victory, new grimoire run, 46 idle ticks then a cast.
    const old = await oldCheckpoint(), original = structuredClone(old), result = EXPEDITION_PARTITION.parse(old);
    assert.equal(result.ok, true);
    const expected = structuredClone(old); expected.formatVersion = emptyExpedition().formatVersion;
    expected.active.battle.player.resonance = Math.max(...old.active.battle.companions.map(c => c.empowered));
    expected.active.battle.companions.forEach(c => c.empowered = 0);
    assert.deepEqual(result.value, expected); assert.deepEqual(old, original);
    assert.deepEqual(EXPEDITION_PARTITION.parse(EXPEDITION_PARTITION.serialize(result.value)).value, expected);
    const variant = structuredClone(old), allies = variant.active.battle.companions;
    allies[0].hp = 0; allies[0].empowered = 150;
    allies[1].empowered = 35;
    allies.push({ ...allies[1], id: ++variant.active.battle.serial, kind: 'turret', empowered: 2 });
    allies.push({ ...allies[1], id: ++variant.active.battle.serial, kind: 'shade', empowered: 3 });
    const upgraded = EXPEDITION_PARTITION.parse(variant); assert.equal(upgraded.ok, true);
    assert.equal(upgraded.value.active.battle.player.resonance, 35);
    assert.deepEqual(upgraded.value.active.battle.companions.slice(2).map(c => c.empowered), [2, 3]);
    allies[1].life = 0;
    assert.equal(EXPEDITION_PARTITION.parse(variant).value.active.battle.player.resonance, 0);
    allies[0].empowered = -1;
    assert.equal(EXPEDITION_PARTITION.parse(variant).ok, false);
    const malformed = structuredClone(expected); delete malformed.active.battle.player.resonance;
    assert.equal(EXPEDITION_PARTITION.parse(malformed).ok, false);
});

test('a resonance checkpoint resumes identically to uninterrupted input replay and never enters a new room', async () => {
    const initial = EXPEDITION_PARTITION.parse(await oldCheckpoint()).value;
    const send = (data, ticks, id) => advanceExpedition(data, { type: 'input', spans: [{ ...idle, ticks }] }, id, 0);
    const uninterrupted = send(initial, 70, 'continuous');
    const first = send(initial, 20, 'before-reload');
    const restored = EXPEDITION_PARTITION.parse(EXPEDITION_PARTITION.serialize(first)); assert.equal(restored.ok, true);
    const resumed = send(restored.value, 50, 'after-reload');
    assert.deepEqual(resumed.active, uninterrupted.active); assert.deepEqual(resumed.awards, uninterrupted.awards);
    assert.equal(setup().player.resonance, 0);
});
