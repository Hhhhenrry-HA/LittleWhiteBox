import { parseMapDomain as parseV1 } from './v1/invariants.js';
import { MAP_DOMAIN_SCHEMA_VERSION, parseMapDomain } from '../invariants.js';
import type { MapDomain } from '../types.js';
import { ATLAS_FRAME, mapFrameId } from '../space/frames.js';
import type { MapFrame } from '../space/types.js';

/** The sole historical read boundary. No write, renderer or tool accepts the old coordinate shape. */
export function readMapPartition(value: unknown, path = 'partitions.map'): MapDomain {
    if (!value || typeof value !== 'object' || !('schemaVersion' in value) || value.schemaVersion !== 1) { return parseMapDomain(value, path); }
    const old = parseV1(value, path);
    const frames = new Map<string, MapFrame>([[ATLAS_FRAME, { id: ATLAS_FRAME }]]);
    const locations = old.atlas.locations.map(location => {
        const { position, ...rest } = location;
        if (!position) { return rest; }
        const frame = mapFrameId(location.parent);
        if (!frames.has(frame)) { frames.set(frame, { id: frame, ...(location.parent ? { owner: location.parent } : {}) }); }
        return { ...rest, position: { frame, at: position } };
    });
    return parseMapDomain({ ...old, schemaVersion: MAP_DOMAIN_SCHEMA_VERSION, atlas: { ...old.atlas, locations, frames: [...frames.values()], features: [] } }, path);
}
