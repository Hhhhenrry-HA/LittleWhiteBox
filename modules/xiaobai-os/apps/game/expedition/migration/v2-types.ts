/** Frozen v2 save format. Retained for the user's existing expedition checkpoints; remove only when that import support is retired. */
export const WEAPON_IDS = ['blade', 'bow', 'staff', 'daggers', 'grimoire', 'cannon'] as const;
export const OATH_IDS = ['haste', 'scarcity', 'legion'] as const;
export const MOB_IDS = ['soldier', 'archer', 'guard', 'priest', 'charger', 'stalker', 'bomber', 'wisp'] as const;
export const BOSS_IDS = ['warden', 'thornheart', 'weaver', 'astrologer', 'king', 'phoenix', 'forgemaster', 'colossus', 'frostqueen', 'leviathan', 'archivist', 'voidknight'] as const;
export const RELIC_IDS = [
    'storm-step', 'conductor', 'momentum', 'cinder', 'wildfire', 'blood-price', 'frost', 'shatter', 'echo', 'hunter', 'piercing', 'orbit', 'thorns', 'aegis', 'siphon', 'focus', 'renewal', 'execution',
    'last-stand', 'quicksilver', 'magnet', 'wardstone', 'pilgrim', 'gambit',
    'riposte', 'shield-break', 'cleave-wave', 'duelist', 'blood-dance', 'valor',
    'ricochet', 'split-arrow', 'pinning', 'distance-draw', 'hunter-mark', 'trapper',
    'nova', 'inferno', 'fracture', 'overload', 'orbitals', 'convergence',
    'backstab', 'shadowstep', 'hemorrhage', 'execution-chain', 'smoke', 'venom',
    'pack-bond', 'martyr', 'covenant', 'frenzy', 'soul-harvest', 'command',
    'shrapnel', 'minefield', 'overclock', 'bunker', 'salvage', 'railgun',
] as const;
export const OUTFIT_IDS = ['traveler', 'guardian', 'moonweaver', 'sovereign', 'ranger', 'paladin', 'witch', 'assassin', 'machinist', 'beastcaller', 'frostbound', 'stargazer'] as const;
export const ENCOUNTER_IDS = ['skirmish', 'pursuit', 'siege', 'ritual', 'survival', 'crossfire'] as const;
export const EFFECT_IDS = ['hit', 'heal', 'slash', 'lightning', 'burst', 'guard', 'block', 'parry', 'ward-hit', 'ward-break'] as const;


export type Weapon = typeof WEAPON_IDS[number];
export type Oath = typeof OATH_IDS[number];
export type Relic = typeof RELIC_IDS[number];
export type Outfit = typeof OUTFIT_IDS[number];
export type BossKind = typeof BOSS_IDS[number];
export type MobKind = typeof MOB_IDS[number];
export type EnemyKind = BossKind | MobKind;
export type EncounterKind = typeof ENCOUNTER_IDS[number];
export type RouteKind = 'battle' | 'elite' | 'camp' | 'shrine' | 'merchant' | 'boss';
export interface Point { x: number; y: number }
export interface InputFrame { move: number; dash: boolean; skill: boolean }
/** RLE of fixed-step world-space input. No client damage or outcomes cross this boundary. */
export interface InputSpan extends InputFrame { ticks: number }
export interface RelicStack { id: Relic; rank: number }
export interface Player extends Point {
    hp: number; facing: number; attack: number; dash: number; skill: number; invulnerable: number;
    dashTime: number; dashAngle: number; swing: number; shield: number; combo: number;
    guard: number; resource: number; ward: number; lastHit: number; travel: number; rescues: number;
}
export interface Enemy extends Point {
    id: number; kind: EnemyKind; hp: number; maxHp: number; angle: number; cooldown: number;
    windup: number; target: Point; pattern: number; phase: number; chill: number; burn: number; marked: number;
    stun: number; bleed: number; poison: number; exposed: number; motion: number; motionAngle: number; stagger: number; memory: Point[];
}
export type DamageSource = 'attack' | 'skill' | 'passive' | 'lightning' | 'companion';
export interface Shot extends Point {
    id: number; angle: number; speed: number; damage: number; life: number; friendly: boolean; source: DamageSource;
    pierce: number; hits: number[]; radius: number; splash: number; bounce: number;
}
export interface Hazard extends Point {
    id: number; radius: number; wait: number; life: number; damage: number; friendly: boolean;
    kind: 'storm' | 'fire' | 'slam' | 'frost' | 'poison' | 'beam' | 'ring' | 'mine';
    angle: number; length: number; width: number; inner: number; source: DamageSource;
}
export interface Effect extends Point { id: number; kind: typeof EFFECT_IDS[number]; life: number; angle: number; size: number }
export interface Obstacle extends Point { radius: number }
export interface Companion extends Point { id: number; kind: 'familiar' | 'turret' | 'shade'; hp: number; life: number; cooldown: number; angle: number; empowered: number }
export interface Objective extends Point { hp: number; progress: number; target: number }
export interface Battle {
    tick: number; seed: number; serial: number; player: Player; enemies: Enemy[]; shots: Shot[];
    hazards: Hazard[]; effects: Effect[]; obstacles: Obstacle[]; companions: Companion[];
    wave: number; waves: number; nextWave: number; kills: number; damageTaken: number;
    status: 'fighting' | 'won' | 'lost'; zone: number; chapter: number; elite: boolean; boss: boolean;
    bossKind: BossKind; encounter: EncounterKind; objective: Objective;
}
export type BattleHud = Pick<Battle, 'player' | 'enemies' | 'wave' | 'waves' | 'tick' | 'objective' | 'encounter'>;
export type PresentationError = 'rendering' | 'sound';
export interface Route { id: number; kind: RouteKind; encounter: EncounterKind }
export interface Run {
    id: string; seed: number; weapon: Weapon; outfit: Outfit; oaths: Oath[]; step: number; regions: number[]; bosses: BossKind[];
    hp: number; shards: number; relics: RelicStack[]; relicPool: Relic[]; routes: Route[]; offers: RelicStack[];
    phase: 'route' | 'battle' | 'reward' | 'camp' | 'shrine' | 'merchant' | 'won' | 'lost' | 'abandoned';
    battle: Battle | null; kills: number; ticks: number;
}
export interface RecordEntry { id: string; weapon: Weapon; oaths: Oath[]; outcome: 'won' | 'lost' | 'abandoned'; step: number; kills: number; ticks: number; relics: RelicStack[] }
export interface Award { key: string; actionId: string; runId: string; amount: number }
export interface Purchase { id: Outfit; actionId: string; amount: number }
export type Command =
    | { type: 'start'; weapon: Weapon; outfit: Outfit; oaths: Oath[] }
    | { type: 'route'; id: number }
    | { type: 'input'; spans: InputSpan[] }
    | { type: 'relic'; id: Relic; replace: Relic | null }
    | { type: 'purchase' | 'equip'; id: Outfit }
    | { type: 'supply' }
    | { type: 'leave' } | { type: 'rest' } | { type: 'sacrifice' } | { type: 'abandon' };
export interface ExpeditionData {
    formatVersion: 2; revision: number; last: { id: string; command: Command } | null; active: Run | null;
    victories: number; discoveries: Relic[]; records: RecordEntry[]; awards: Award[];
    purchases: Purchase[]; equippedOutfit: Outfit;
}
export interface Loadout { weapon: Weapon; relics: readonly RelicStack[]; oaths: readonly Oath[] }
