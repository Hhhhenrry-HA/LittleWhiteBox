import { geometryBounds, geometryClosed, geometryPoints } from './geometry.js';
import type { SpaceGeometry, SpacePoint } from './types.js';

function crossings(points: SpacePoint[], y: number): number[] {
    const result: number[] = [];
    for (let i = 0; i < points.length; i++) {
        const a = points[i], b = points[(i + 1) % points.length];
        if ((a[1] > y) !== (b[1] > y)) { result.push(a[0] + (y - a[1]) * (b[0] - a[0]) / (b[1] - a[1])); }
    }
    return result.sort((a, b) => a - b);
}

/** Positive-area intersection of the same simple contours used by the renderer, not their bounding boxes. */
export function areasOverlap(first: SpaceGeometry, second: SpaceGeometry): boolean {
    if (!geometryClosed(first) || !geometryClosed(second)) { return false; }
    const a = geometryBounds(first), b = geometryBounds(second);
    const epsilon = Number.EPSILON * Math.max(...a.map(Math.abs), ...b.map(Math.abs)) * 8;
    const top = Math.max(a[1], b[1]), bottom = Math.min(a[1] + a[3], b[1] + b[3]);
    if (bottom - top <= epsilon || Math.min(a[0] + a[2], b[0] + b[2]) - Math.max(a[0], b[0]) <= epsilon) { return false; }
    const p = geometryPoints(first), q = geometryPoints(second);
    // A proper boundary crossing guarantees an interior intersection. Endpoint touches do not.
    const side = (a: SpacePoint, b: SpacePoint, p: SpacePoint) => ((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])) / Math.hypot(b[0] - a[0], b[1] - a[1]);
    const opposite = (a: number, b: number) => (a > epsilon && b < -epsilon) || (b > epsilon && a < -epsilon);
    for (let i = 0; i < p.length; i++) { for (let j = 0; j < q.length; j++) {
        const a = p[i], b = p[(i + 1) % p.length], c = q[j], d = q[(j + 1) % q.length];
        if (opposite(side(a, b, c), side(a, b, d)) && opposite(side(c, d, a), side(c, d, b))) { return true; }
    } }
    // Without proper crossings, interval order is fixed between vertex heights. This also
    // handles containment, concavity and coincident boundaries in either winding direction.
    const levels = [...new Set([top, bottom, ...p.map(v => v[1]), ...q.map(v => v[1])].filter(y => y >= top && y <= bottom))].sort((a, b) => a - b);
    for (let k = 1; k < levels.length; k++) {
        if (levels[k] - levels[k - 1] <= epsilon) { continue; }
        const y = (levels[k] + levels[k - 1]) / 2, a = crossings(p, y), b = crossings(q, y);
        let i = 0, j = 0;
        while (i + 1 < a.length && j + 1 < b.length) {
            if (Math.min(a[i + 1], b[j + 1]) - Math.max(a[i], b[j]) > epsilon) { return true; }
            if (a[i + 1] < b[j + 1]) { i += 2; } else { j += 2; }
        }
    }
    return false;
}
