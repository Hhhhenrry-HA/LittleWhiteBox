export const RENDER_BUDGET = { maxPixels: 1600000, maxDpr: 2, shadow: 1024, slowMs: 32, fastMs: 19, slowSamples: 90, fastSamples: 600 } as const;
export type Quality = 0 | 1 | 2;
export function pixelRatio(width: number, height: number, device: number, quality: Quality): number {
    return Math.min(device, [1, 1.5, RENDER_BUDGET.maxDpr][quality], Math.sqrt(RENDER_BUDGET.maxPixels / Math.max(1, width * height)));
}
/** Hysteresis counts actual rendering frames, never changes the gameplay clock. */
export function createQualityController() {
    let quality: Quality = 2, slow = 0, fast = 0, requested: Quality | null = null;
    return {
        sample(milliseconds: number) {
            if (milliseconds > 250) { slow = 0; fast = 0; return; }
            slow = milliseconds > RENDER_BUDGET.slowMs ? slow + 1 : 0;
            fast = milliseconds < RENDER_BUDGET.fastMs ? fast + 1 : 0;
            if (slow >= RENDER_BUDGET.slowSamples && quality > 0) { requested = (quality - 1) as Quality; }
            if (fast >= RENDER_BUDGET.fastSamples && quality < 2) { requested = (quality + 1) as Quality; }
        },
        boundary() { if (requested !== null) { quality = requested; requested = null; slow = 0; fast = 0; } return quality; },
        current: () => quality,
    };
}
