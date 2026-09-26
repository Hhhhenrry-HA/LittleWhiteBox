import type { MapDomain, MapLocation } from '../../../domains/map/types.js';
import { MAX_MAP_BRIEF_LENGTH } from '../../../domains/map/invariants.js';
import { frameTransform, mapFrameId, transformPoint } from '../../../domains/map/space/frames.js';
import { intentId, intentText } from './intent-common.js';
import { mapOwner, spatialPosition } from './atlas-spatial-compiler.js';

export function compileLocationDeclaration(domain: MapDomain, raw: Record<string, unknown>): MapLocation {
    const fields = ['key', 'name', 'scale', 'status', 'parent', 'brief', 'position', 'terrain', 'reframe'];
    if (Object.keys(raw).some(key => !fields.includes(key))) { throw new Error('location_has_unsupported_fields'); }
    const key = intentId(raw.key), name = intentText(raw.name);
    if (!key || !name) { throw new Error('location_invalid_or_parent_missing'); }
    const existing = domain.atlas.locations.find(l => l.key === key);
    const location = { ...existing, key, name, scale: raw.scale ?? existing?.scale ?? 'room', status: raw.status ?? existing?.status ?? 'mentioned' } as MapLocation;
    if (raw.parent === null || raw.parent === '') { delete location.parent; }
    else if (raw.parent !== undefined) { location.parent = intentId(raw.parent); }
    if (raw.brief === null) { delete location.brief; }
    else if (raw.brief !== undefined) { location.brief = intentText(raw.brief, '', MAX_MAP_BRIEF_LENGTH); }
    if (raw.position === null) { delete location.position; }
    else if (raw.position !== undefined) { location.position = spatialPosition(raw.position); }
    if (Object.hasOwn(raw, 'reframe')) {
        if (raw.position !== undefined || !existing?.position) { throw new Error('space_reframe_requires_existing_position'); }
        const frame = mapFrameId(mapOwner(raw.reframe));
        const mapping = frameTransform(domain.atlas.frames, existing.position.frame, frame);
        if (!mapping) { throw new Error('space_reframe_unmapped'); }
        location.position = { frame, at: transformPoint(existing.position.at, mapping) };
    }
    if (raw.terrain === null) { delete location.terrain; }
    else if (raw.terrain !== undefined) { location.terrain = raw.terrain as MapLocation['terrain']; }
    return location;
}
