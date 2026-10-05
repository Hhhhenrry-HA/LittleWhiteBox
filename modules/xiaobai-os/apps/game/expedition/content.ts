import type { EnemyKind, Oath, Relic, Weapon } from './types.js';

export const RULES = Object.freeze({ hz: 30, arena: 11, playerRadius: .34, speed: .115, maxHp: 100,
    dashTicks: 8, dashCooldown: 45, skillCooldown: 210, relicSlots: 6, relicPoolSize: 12, zoneSteps: 5, zones: 3,
    maxInputTicks: 900, checkpointTicks: 240, shopCost: 60,
    battleShards: 24, eliteShards: 45, bossShards: 70, restHeal: 32, sacrificeHp: 22,
    firstBossAward: 80, firstVictoryAward: 200, masteryAward: 120, oathAward: 100, recordLimit: 20 });
export const WEAPONS: Record<Weapon, { damage: number; period: number; range: number; skill: number; unlock: number }> = {
    blade: { damage: 17, period: 23, range: 2.15, skill: 38, unlock: -1 },
    bow: { damage: 13, period: 20, range: 10, skill: 23, unlock: 0 },
    staff: { damage: 20, period: 34, range: 8, skill: 31, unlock: 1 },
};
export const RELICS: readonly Relic[] = ['storm-step', 'conductor', 'momentum', 'cinder', 'wildfire', 'blood-price', 'frost', 'shatter', 'echo', 'hunter', 'piercing', 'orbit', 'thorns', 'aegis', 'siphon', 'focus', 'renewal', 'execution'];
export const OATHS: readonly Oath[] = ['haste', 'scarcity', 'legion'];
export const RELIC_RULES = Object.freeze({ bloodDamage: 1.45, bloodHurt: 1.25, hunterRange: 5, hunterDamage: 1.5,
    executeThreshold: .3, executeDamage: 1.6, echoEvery: 3, extraPierce: 2, orbitTicks: 60,
    siphonEvery: 5, siphonHeal: 4, siphonBossHeal: 8, focusSkill: .7, focusAttack: 1.15,
    renewalHeal: 8, renewalZoneHeal: 10 });
export const ENEMIES: Record<EnemyKind, { hp: number; speed: number; radius: number; damage: number; reach: number; windup: number; cooldown: number }> = {
    soldier: { hp: 43, speed: .046, radius: .4, damage: 10, reach: 1.2, windup: 24, cooldown: 45 },
    archer: { hp: 32, speed: .032, radius: .36, damage: 9, reach: 9, windup: 30, cooldown: 72 },
    guard: { hp: 80, speed: .027, radius: .55, damage: 16, reach: 1.8, windup: 36, cooldown: 66 },
    priest: { hp: 40, speed: .018, radius: .4, damage: 8, reach: 10, windup: 42, cooldown: 115 },
    charger: { hp: 58, speed: .037, radius: .48, damage: 15, reach: 8, windup: 36, cooldown: 85 },
    warden: { hp: 1300, speed: .025, radius: 1.25, damage: 19, reach: 20, windup: 40, cooldown: 38 },
    weaver: { hp: 1800, speed: .028, radius: 1.1, damage: 17, reach: 20, windup: 36, cooldown: 42 },
    king: { hp: 2500, speed: .03, radius: 1.4, damage: 22, reach: 20, windup: 38, cooldown: 34 },
};
export const BOSSES: readonly EnemyKind[] = ['warden', 'weaver', 'king'];
export function isBoss(kind: EnemyKind) { return BOSSES.includes(kind); }
