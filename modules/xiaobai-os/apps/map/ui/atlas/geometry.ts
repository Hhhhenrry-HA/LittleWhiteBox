import { geometryClosed, geometryPoints } from '../../../../domains/map/space/geometry.js';
import type { SpaceGeometry } from '../../../../domains/map/space/types.js';

export function atlasGeometryPath(g: SpaceGeometry): string {
    if (g.shape === 'point') { return `M${g.x - 2} ${g.y}a2 2 0 1 0 4 0a2 2 0 1 0 -4 0`; }
    const points = geometryPoints(g);
    return points.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join(' ') + (geometryClosed(g) ? 'Z' : '');
}
export function atlasLineWidth(g: SpaceGeometry): number { return 'points' in g && !g.closed ? g.width || 1 : 0; }
