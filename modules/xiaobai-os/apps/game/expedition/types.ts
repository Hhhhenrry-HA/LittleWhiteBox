export type Weapon = 'blade' | 'bow' | 'staff';
export type Oath = 'haste' | 'scarcity' | 'legion';
export type Relic = 'storm-step' | 'conductor' | 'momentum' | 'cinder' | 'wildfire' | 'blood-price' | 'frost' | 'shatter' | 'echo' | 'hunter' | 'piercing' | 'orbit' | 'thorns' | 'aegis' | 'siphon' | 'focus' | 'renewal' | 'execution';
export type EnemyKind = 'soldier' | 'archer' | 'guard' | 'priest' | 'charger' | 'warden' | 'weaver' | 'king';
export type RouteKind = 'battle' | 'elite' | 'camp' | 'shrine' | 'merchant' | 'boss';
export interface Point { x: number; y: number }
export interface InputFrame { move: number; dash: boolean; skill: boolean }
/** RLE of 30 Hz inputs; movement 0 = idle, 1..8 = clockwise from north. */
export interface InputSpan extends InputFrame { ticks: number }
export interface Player extends Point {
    hp: number; facing: number; attack: number; dash: number; skill: number; invulnerable: number;
    dashTime: number; dashAngle: number; swing: number; shield: number; combo: number;
}
export interface Enemy extends Point {
    id: number; kind: EnemyKind; hp: number; maxHp: number; angle: number; cooldown: number;
    windup: number; target: Point; pattern: number; phase: number; chill: number; burn: number; marked: number;
}
export interface Shot extends Point { id: number; angle: number; speed: number; damage: number; life: number; friendly: boolean; source: 'attack' | 'skill'; pierce: number; hits: number[] }
export interface Hazard extends Point { id: number; radius: number; wait: number; life: number; damage: number; friendly: boolean; kind: 'storm' | 'fire' | 'slam' }
export interface Effect extends Point { id: number; kind: 'hit' | 'heal' | 'slash' | 'lightning' | 'burst'; life: number; angle: number; size: number }
export interface Obstacle extends Point { radius: number }
export interface Battle {
    tick: number; seed: number; serial: number; player: Player; enemies: Enemy[]; shots: Shot[];
    hazards: Hazard[]; effects: Effect[]; obstacles: Obstacle[]; wave: number; waves: number;
    nextWave: number; kills: number; damageTaken: number; status: 'fighting' | 'won' | 'lost';
    zone: number; elite: boolean; boss: boolean;
}
export type BattleHud = Pick<Battle, 'player' | 'enemies' | 'wave' | 'waves' | 'tick'>;
export type PresentationError = 'rendering' | 'sound';
export interface Route { id: number; kind: RouteKind }
export interface Run {
    id: string; seed: number; weapon: Weapon; cloak: number; oaths: Oath[]; step: number;
    hp: number; shards: number; relics: Relic[]; relicPool: Relic[]; routes: Route[]; offers: Relic[];
    phase: 'route' | 'battle' | 'reward' | 'camp' | 'shrine' | 'merchant' | 'won' | 'lost' | 'abandoned';
    battle: Battle | null; kills: number; ticks: number;
}
export interface RecordEntry { id: string; weapon: Weapon; oaths: Oath[]; outcome: 'won' | 'lost' | 'abandoned'; step: number; kills: number; ticks: number; relics: Relic[] }
export interface Award { key: string; actionId: string; runId: string; amount: number }
export type Command =
    | { type: 'start'; weapon: Weapon; cloak: number; oaths: Oath[] }
    | { type: 'route'; id: number }
    | { type: 'input'; spans: InputSpan[] }
    | { type: 'relic'; id: Relic; replace: Relic | null }
    | { type: 'leave' } | { type: 'rest' } | { type: 'sacrifice' } | { type: 'abandon' };
export interface ExpeditionData {
    revision: number; last: { id: string; command: Command } | null; active: Run | null;
    victories: number; discoveries: Relic[]; records: RecordEntry[]; awards: Award[];
}
export interface Loadout { weapon: Weapon; relics: readonly Relic[]; oaths: readonly Oath[] }
