import type { SpaceBounds, SpacePoint } from '../../../../domains/map/space/types.js';

/** Screen occlusion only. These values never participate in a map's coordinate mapping. */
export type AtlasInsets = readonly [top: number, right: number, bottom: number, left: number];
export function atlasCamera(bounds: SpaceBounds, size: SpacePoint, insets: AtlasInsets, overview: boolean, anchor?: SpacePoint): SpaceBounds {
    const [top, right, bottom, left] = insets;
    const width = Math.max(80, size[0] - left - right), height = Math.max(80, size[1] - top - bottom);
    const fit = Math.max(bounds[2] / width, bounds[3] / height);
    // Opening a map is looking into it, not fitting a model onto a presentation board.
    const scale = overview ? fit : Math.min(bounds[2] / size[0], bounds[3] / size[1]) * .78;
    const center = !overview && anchor ? anchor : [bounds[0] + bounds[2] / 2, bounds[1] + bounds[3] / 2];
    const x = center[0] - (left + width / 2) * scale, y = center[1] - (top + height / 2) * scale;
    const w = size[0] * scale, h = size[1] * scale;
    return [overview ? x : Math.max(bounds[0], Math.min(bounds[0] + bounds[2] - w, x)),
        overview ? y : Math.max(bounds[1], Math.min(bounds[1] + bounds[3] - h, y)), w, h];
}

export function atlasFocus(point: SpacePoint, viewport: SpaceBounds, size: SpacePoint, insets: AtlasInsets): SpaceBounds {
    const [top, right, bottom, left] = insets;
    const scale = Math.min(viewport[2] / size[0], 620 / Math.max(80, size[0] - left - right));
    return [point[0] - (left + (size[0] - left - right) / 2) * scale,
        point[1] - (top + (size[1] - top - bottom) / 2) * scale, size[0] * scale, size[1] * scale];
}
