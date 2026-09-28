import { HOUSES, STACKING_POLICY as P, type HouseKind, stage } from './policy.js';
export interface Placement { x: number; direction: 1 | -1 }
export interface Placed extends Placement { kind: HouseKind; y: number; left: number; right: number }
export interface Support { index: number; center: number; margin: number; ratio: number }
export interface Tower { placed: Placed[]; supports: Support[]; failure: 'miss' | 'contact' | 'balance' | null; weak: number }
export function emptyTower(): Tower { return { placed: [], supports: [], failure: null, weak: -1 }; }
export function topSurface(tower: Tower): { left: number; right: number; y: number } {
    const last = tower.placed.at(-1);
    if (!last) { return { left: -P.groundWidth / 2, right: P.groundWidth / 2, y: 0 }; }
    const spec = HOUSES[last.kind], center = last.x + spec.offset * last.direction;
    return { left: center - spec.top / 2, right: center + spec.top / 2, y: last.y + spec.height };
}
export function validPlacement(value: Placement): boolean {
    return Number.isSafeInteger(value.x) && Math.abs(value.x) <= P.rail && (value.direction === 1 || value.direction === -1);
}
export function place(tower: Tower, kind: HouseKind, pose: Placement): Tower {
    if (tower.failure || tower.placed.length >= P.houses || !validPlacement(pose)) { throw new Error('stacking_invalid'); }
    const spec = HOUSES[kind], top = topSurface(tower);
    const placed = [...tower.placed, { ...pose, kind, y: top.y,
        left: Math.max(top.left, pose.x - spec.foot / 2), right: Math.min(top.right, pose.x + spec.foot / 2) }];
    const newest = placed.at(-1)!;
    let failure: Tower['failure'] = newest.right <= newest.left ? 'miss' : newest.right - newest.left < P.contact ? 'contact' : null;
    let mass = 0, moment = 0;
    const supports: Support[] = [];
    for (let i = placed.length - 1; i >= 0; i--) {
        const house = placed[i], shape = HOUSES[house.kind];
        mass += shape.mass; moment += shape.mass * (house.x + shape.center * house.direction);
        const center = moment / mass, margin = Math.min(center - house.left, house.right - center) - P.margin;
        supports.unshift({ index: i, center, margin, ratio: margin / Math.max(1, (house.right - house.left) / 2 - P.margin) });
        if (margin <= 0) { failure ??= 'balance'; }
    }
    const weak = supports.reduce((best, support) => support.ratio < supports[best].ratio ? support.index : best, 0);
    return { placed, supports, failure, weak };
}
export function sequence(seed: number): HouseKind[] {
    let state = seed >>> 0;
    function random() { state = (Math.imul(state, 1664525) + 1013904223) >>> 0; return state / 0x100000000; }
    const pools: HouseKind[][] = [['wide', 'wide', 'loft'], ['wide', 'balcony', 'balcony', 'loft'], ['step', 'loft', 'balcony'], ['step', 'balcony', 'loft', 'step']];
    return Array.from({ length: P.houses }, (_, i) => { const pool = pools[stage(i)]; return pool[Math.floor(random() * pool.length)]; });
}
/** Bounded beam certification. Never exposed as a safe-drop marker in the UI. */
export function solve(seed: number): Placement[] | null {
    let beam: { tower: Tower; moves: Placement[]; score: number }[] = [{ tower: emptyTower(), moves: [], score: 0 }];
    let nodes = 0;
    for (const kind of sequence(seed)) {
        const next: typeof beam = [];
        for (const entry of beam) {
            const top = topSurface(entry.tower), middle = (top.left + top.right) / 2;
            for (const direction of [1, -1] as const) {
                const positions = new Set([0, middle - HOUSES[kind].center * direction,
                    ...[-600, -400, -200, 0, 200, 400, 600].map(offset => middle + offset)]);
                for (const raw of positions) {
                    if (++nodes > P.solverBudget) { return null; }
                    const pose = { x: Math.round(raw), direction };
                    if (!validPlacement(pose)) { continue; }
                    const tower = place(entry.tower, kind, pose);
                    if (tower.failure) { continue; }
                    const surface = topSurface(tower);
                    const score = Math.min(...tower.supports.map(s => s.margin)) - Math.abs(surface.left + surface.right) * 0.08;
                    next.push({ tower, moves: [...entry.moves, pose], score });
                }
            }
        }
        if (!next.length) { return null; }
        beam = next.sort((a, b) => b.score - a.score).slice(0, 20);
    }
    return beam[0].moves;
}
export async function generate(seed: number): Promise<number> {
    for (let attempt = 0; attempt < P.seedAttempts; attempt++) {
        const candidate = (seed + Math.imul(attempt, 2654435761)) >>> 0;
        if (solve(candidate)) { return candidate; }
        await new Promise(resolve => setTimeout(resolve, 0));
    }
    throw Object.assign(new Error('stacking_generation'), { code: 'stacking_generation' });
}
