/** Millimetre-like integer world units. Rendering derives geometry from these facts. */
export const STACKING_POLICY = {
    houses: 20, fee: 50,
    prizes: [{ count: 8, amount: 50 }, { count: 12, amount: 80 }, { count: 16, amount: 120 }, { count: 20, amount: 200 }],
    groundWidth: 2200, rail: 2900, contact: 240, margin: 35,
    solverBudget: 10000, seedAttempts: 12,
} as const;
export function cashout(count: number): number {
    return STACKING_POLICY.prizes.reduce((amount, tier) => count >= tier.count ? tier.amount : amount, 0);
}
export const HOUSE_KINDS = ['wide', 'loft', 'balcony', 'step'] as const;
export type HouseKind = typeof HOUSE_KINDS[number];
export interface HouseSpec { foot: number; top: number; offset: number; height: number; mass: number; center: number; color: number }
export const HOUSES: Record<HouseKind, HouseSpec> = {
    wide: { foot: 1800, top: 1600, offset: 0, height: 1000, mass: 5, center: 0, color: 0xf1ceb4 },
    loft: { foot: 1040, top: 960, offset: 0, height: 1200, mass: 3, center: 0, color: 0xcbdcee },
    balcony: { foot: 1260, top: 1040, offset: 160, height: 1000, mass: 6, center: 490, color: 0xe4cde8 },
    step: { foot: 1520, top: 820, offset: 520, height: 1050, mass: 4, center: 180, color: 0xc6ddcd },
};
export function stage(index: number) { return index < 4 ? 0 : index < 10 ? 1 : index < 15 ? 2 : 3; }
export const CRANE_SPEEDS = [0.68, 0.9, 1.1, 1.3] as const;
export function cranePhase(seed: number, index: number) { return ((seed * 0.61803398875 + index * 0.381966) % 1) * Math.PI * 2; }
export function craneX(seed: number, index: number, seconds: number): number {
    return Math.round(Math.sin(cranePhase(seed, index) + seconds * CRANE_SPEEDS[stage(index)]) * STACKING_POLICY.rail);
}
