import { createFrameResolver } from './frames.js';
import { transformGeometry } from './geometry.js';
import { areasOverlap } from './area-overlap.js';
import type { MapFeature, MapFrame, SpaceGeometry } from './types.js';

interface Surface { source: MapFeature; root: string; geometry: SpaceGeometry }
interface SurfaceState { features: readonly MapFeature[]; frames: readonly MapFrame[] }

function surfaces({ features, frames }: SurfaceState): Surface[] {
    const resolve = createFrameResolver(frames), roots = frames.filter(f => !f.mapping);
    return features.filter(f => f.role === 'surface').flatMap(source => {
        for (const root of roots) {
            const mapping = resolve(source.frame, root.id);
            if (mapping) { return [{ source, root: root.id, geometry: transformGeometry(source.geometry, mapping) }]; }
        }
        // A draft with an unresolved/cyclic frame has no comparable coordinates. Its frame
        // references still form one edit group, and domain validation rejects that group.
        return [];
    });
}
function conflicts(a: Surface, b: Surface): boolean {
    const x = a.source, y = b.source;
    return x.id !== y.id && a.root === b.root && x.material !== y.material && x.material !== 'water' && y.material !== 'water'
        && x.support === y.support && !x.crosses?.includes(y.id) && !y.crosses?.includes(x.id) && areasOverlap(a.geometry, b.geometry);
}
export function spaceSurfaceConflicts(features: readonly MapFeature[], frames: readonly MapFrame[]): Array<[string, string]> {
    const projected = surfaces({ features, frames });
    return projected.flatMap((a, i) => projected.slice(i + 1).filter(b => conflicts(a, b)).map(b => [a.source.id, b.source.id] as [string, string]));
}

/**
 * Occupying an edited surface's old space depends on that surface moving/removing too.
 * Resolve each version with its own mappings: frame moves are spatial edits as well.
 */
export function spaceSurfaceTransitionConflicts(before: SurfaceState, after: SurfaceState): Array<[string, string]> {
    const old = surfaces(before), next = surfaces(after);
    return old.flatMap(a => next.filter(b => conflicts(a, b)).map(b => [a.source.id, b.source.id] as [string, string]));
}
