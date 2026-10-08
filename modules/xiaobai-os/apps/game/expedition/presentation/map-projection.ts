import type { Campaign } from '../campaign/types.js';
import { COURTYARD } from '../content/courtyard.js';
import type { CourtyardScene } from '../content/world-types.js';
import { visibleInteractions } from '../world/exploration.js';
import type { Point } from '../types.js';

export function discoveredRoutes(campaign: Campaign) {
    const scenes = new Set(campaign.location.visited), facts = new Set(campaign.facts);
    const links = new Map<string, { id: string; from: CourtyardScene; to: CourtyardScene }>();
    for (const from of campaign.location.visited) {
        for (const exit of visibleInteractions(COURTYARD[from], facts)) {
            if (exit.kind !== 'exit') { continue; }
            const to = exit.target.to, id = [from, to].sort().join('/');
            scenes.add(to); links.set(id, { id, from, to });
        }
    }
    return { scenes: [...scenes], links: [...links.values()] };
}
/** Bounded label placement. A dense cluster may overlap; it never escapes the map or loops forever. */
export function mapMarkers(points: readonly Point[], bounds: { x: number; z: number; width: number; depth: number }) {
    const inset = 3, placed: Point[] = [];
    const clamp = (point: Point) => ({
        x: Math.max(bounds.x - bounds.width / 2 + inset, Math.min(bounds.x + bounds.width / 2 - inset, point.x)),
        y: Math.max(bounds.z - bounds.depth / 2 + inset, Math.min(bounds.z + bounds.depth / 2 - inset, point.y)),
    });
    for (const point of points) {
        let chosen = clamp(point), best = -1;
        for (let step = 0; step <= 48; step++) {
            const radius = Math.ceil(step / 8) * 5.2, angle = step * Math.PI / 4;
            const candidate = clamp({ x: point.x + Math.cos(angle) * radius, y: point.y + Math.sin(angle) * radius });
            const space = Math.min(Infinity, ...placed.map(p => Math.hypot(p.x - candidate.x, p.y - candidate.y)));
            if (space > best) { chosen = candidate; best = space; }
            if (space >= 5.2) { break; }
        }
        placed.push(chosen);
    }
    return placed;
}
