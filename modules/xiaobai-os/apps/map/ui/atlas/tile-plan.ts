import type { FrameMapping, MapFeature, SpaceBounds } from '../../../../domains/map/space/types.js';
import { atlasFinestLevel, atlasPreviewLevel, atlasSurfaceKey, atlasTileLevel, atlasTileRect, atlasTilesInView, type AtlasSurfaceSource, type AtlasTile } from './surface.js';
import { atlasPngBytes } from './tile-render.js';

export interface AtlasTileLayer { source: MapFeature; mapping: FrameMapping; sourceBounds: SpaceBounds }
export interface AtlasTilePlan {
    id: string; key: string; source: AtlasSurfaceSource; bounds: SpaceBounds; local: SpaceBounds;
    level: number; preview: number; tiles: AtlasTile[]; previews: AtlasTile[]; scale: number; offset: [number, number];
}
export const atlasTileId = (key: string, tile: AtlasTile) => `${key}@${tile.level}/${tile.tx}/${tile.ty}`;
export function atlasPlanBytes(plans: AtlasTilePlan[]): number {
    return plans.reduce((sum, plan) => {
        const unique = new Map([...plan.previews, ...plan.tiles].map(tile => [atlasTileId(plan.key, tile), tile]));
        return sum + [...unique.values()].reduce((bytes, tile) => {
            const rect = atlasTileRect(plan.bounds, tile)!;
            return bytes + rect[2] * rect[3] * 4 + atlasPngBytes(rect[2], rect[3]);
        }, 0);
    }, 0);
}

/** Visible geography owns the budget. Coarsen the largest allocation rather than omitting a feature. */
export function planAtlasTiles(layers: AtlasTileLayer[], view: SpaceBounds, perPixel: number, budget: number): AtlasTilePlan[] {
    const margin = .15, mx = view[2] * margin, my = view[3] * margin;
    const plans = layers.flatMap(({ source: feature, mapping: { scale, offset }, sourceBounds: bounds }) => {
        if (feature.form === 'asteroids' || feature.geometry.shape === 'point' || !bounds[2] || !bounds[3]) { return []; }
        const local: SpaceBounds = [(view[0] - mx - offset[0]) / scale, (view[1] - my - offset[1]) / scale, (view[2] + mx * 2) / scale, (view[3] + my * 2) / scale];
        const level = atlasTileLevel(feature, perPixel / scale), tiles = atlasTilesInView(bounds, local, level);
        if (!tiles.length) { return []; }
        // A 64-side whole-feature preview establishes coverage before any expensive detail jobs.
        const preview = Math.max(level, atlasPreviewLevel(feature, bounds) + 2);
        const source: AtlasSurfaceSource = JSON.parse(JSON.stringify({ id: feature.id, role: feature.role, material: feature.material, form: feature.form, geometry: feature.geometry }));
        return [{ id: feature.id, key: atlasSurfaceKey(source), source, bounds, local, level, preview, tiles,
            previews: atlasTilesInView(bounds, bounds, preview), scale, offset }];
    });
    const allocations = plans.map(plan => ({ plan, bytes: atlasPlanBytes([plan]), priority: atlasFinestLevel(plan.source) === -2 ? 4 : 1 }));
    let total = allocations.reduce((sum, allocation) => sum + allocation.bytes, 0);
    while (total > budget) {
        // Under pressure, broad ground colour yields one level before authored canopy/roof/ridge detail.
        const allocation = allocations.reduce((a, b) => a.bytes / a.priority >= b.bytes / b.priority ? a : b), largest = allocation.plan;
        total -= allocation.bytes;
        largest.level++;
        largest.preview = Math.max(largest.preview, largest.level);
        largest.tiles = atlasTilesInView(largest.bounds, largest.local, largest.level);
        largest.previews = atlasTilesInView(largest.bounds, largest.bounds, largest.preview);
        allocation.bytes = atlasPlanBytes([largest]);
        total += allocation.bytes;
    }
    return plans;
}
