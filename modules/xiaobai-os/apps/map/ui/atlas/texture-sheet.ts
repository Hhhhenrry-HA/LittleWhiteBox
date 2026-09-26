import type { MapFeature, SpaceBounds } from '../../../../domains/map/space/types.js';
import { atlasSurfaceSize, createAtlasSurface } from './surface.js';

export interface AtlasTextureTile { bounds: SpaceBounds; rect: SpaceBounds }
export interface AtlasTextureSheet { href: string; width: number; height: number; tiles: Map<string, AtlasTextureTile> }
export const MAX_ATLAS_SHEET_SIDE = 2048;

/** Pack tallest tiles first. Budget the allocated rectangle, including shelf gaps and gutters. */
export function atlasTextureLayout(features: MapFeature[], density: number) {
    const gutter = 1;
    for (;;) {
        const sizes = features.map((feature, index) => ({ size: atlasSurfaceSize(feature, density), index }))
            .sort((a, b) => b.size[1] - a.size[1] || b.size[0] - a.size[0]);
        const area = sizes.reduce((sum, { size: [w, h] }) => sum + (w + gutter * 2) * (h + gutter * 2), 0);
        let width = Math.min(MAX_ATLAS_SHEET_SIDE, 2 ** Math.ceil(Math.log2(Math.max(2, Math.sqrt(area), ...sizes.map(s => s.size[0] + gutter * 2)))));
        for (;;) {
            let x = 0, y = 0, row = 0;
            const rectangles: SpaceBounds[] = [];
            for (const { size: [w, h], index } of sizes) {
                if (x + w + gutter * 2 > width) { x = 0; y += row; row = 0; }
                rectangles[index] = [x + gutter, y + gutter, w, h]; x += w + gutter * 2; row = Math.max(row, h + gutter * 2);
            }
            const height = Math.max(2, y + row);
            if (height <= MAX_ATLAS_SHEET_SIDE) { return { width, height, density, rectangles }; }
            if (width === MAX_ATLAS_SHEET_SIDE) { break; }
            width = Math.min(MAX_ATLAS_SHEET_SIDE, width * 2);
        }
        // All accepted collections fit at their minimum tile size; keep every feature.
        density *= 2;
    }
}

/** One encoded/decoded image for all surfaces, rather than one browser image resource per feature. */
export function createAtlasTextureSheet(features: MapFeature[], density: number): AtlasTextureSheet {
    const layout = atlasTextureLayout(features, density), { width, height, rectangles } = layout;
    const canvas = document.createElement('canvas');
    canvas.width = width; canvas.height = height;
    const context = canvas.getContext('2d');
    if (!context) { throw new Error('atlas_surface_context_unavailable'); }
    const tiles = new Map<string, AtlasTextureTile>();
    features.forEach((feature, index) => {
        const surface = createAtlasSurface(feature, layout.density), rect = rectangles[index];
        const data = context.createImageData(surface.width, surface.height);
        data.data.set(surface.pixels); context.putImageData(data, rect[0], rect[1]);
        tiles.set(feature.id, { bounds: surface.bounds, rect });
    });
    const href = canvas.toDataURL('image/png');
    if (!href.startsWith('data:image/png;')) { throw new Error('atlas_surface_encoding_failed'); }
    return { href, width, height, tiles };
}
