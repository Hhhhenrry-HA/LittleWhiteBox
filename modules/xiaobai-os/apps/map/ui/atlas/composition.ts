import type { AtlasFeatureProjection } from '../../../../domains/map/space/projection.js';
import { boundsOverlap, geometryClosed } from '../../../../domains/map/space/geometry.js';

const ROLE_ORDER = { environment: 0, surface: 1, cover: 2, relief: 3, channel: 4, structure: 5, zone: 6, landmark: 7, boundary: 8 };
export function atlasPaintOrder(features: AtlasFeatureProjection[]): AtlasFeatureProjection[] {
    const pending = [...features].sort((a, b) => ROLE_ORDER[a.source.role] - ROLE_ORDER[b.source.role] || a.source.id.localeCompare(b.source.id));
    const done = new Set<string>(), result: AtlasFeatureProjection[] = [];
    const ids = new Set(pending.map(f => f.source.id));
    while (pending.length) {
        const index = pending.findIndex(f => [f.source.support, ...(f.source.crosses || [])].every(id => !id || !ids.has(id) || done.has(id)));
        if (index < 0) { throw new Error('space_support_cycle'); }
        const item = pending.splice(index, 1)[0]; done.add(item.source.id); result.push(item);
    }
    return result;
}
/** Masks clip the whole glyph and shadow, not only its sample point. */
export function atlasOccluders(feature: AtlasFeatureProjection, all: AtlasFeatureProjection[]): AtlasFeatureProjection[] {
    const source = feature.source;
    return all.filter(other => {
        const b = other.source;
        if (!boundsOverlap(feature.bounds, other.bounds)) { return false; }
        if (source.id === b.id || source.support !== b.support || source.crosses?.includes(b.id)) { return false; }
        if (b.material === 'water' && b.role !== 'environment' && source.material !== 'water' && ['surface', 'cover', 'relief', 'structure'].includes(source.role)) { return true; }
        const sameCrossings = (source.crosses || []).length === (b.crosses || []).length && (source.crosses || []).every(id => b.crosses?.includes(id));
        if (b.role === source.role && b.material === source.material && b.form === source.form && sameCrossings && b.id < source.id) { return true; }
        if (['scattered', 'compact', 'blocks', 'towers'].includes(source.form || '')) {
            return b.role === 'channel' || b.role === 'cover' || (b.role === 'structure' && !!b.destination && geometryClosed(b.geometry));
        }
        return false;
    });
}
