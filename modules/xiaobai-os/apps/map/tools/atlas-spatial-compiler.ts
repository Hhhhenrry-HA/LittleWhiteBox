import type { MapDomain } from '../../../domains/map/types.js';
import type { MapFeature, MapFrame, MapPosition } from '../../../domains/map/space/types.js';
import { frameTransform, mapFrameId } from '../../../domains/map/space/frames.js';
import { transformGeometry } from '../../../domains/map/space/geometry.js';
import { intentId, isRecord } from './intent-common.js';
import { spacePoint, validateSpaceCrossings, validateSpaceGeometry } from '../../../domains/map/space/invariants.js';
import { requireDimension } from '../../../domains/map/invariants.js';

export function mapOwner(value: unknown): string | undefined {
    if (value === null) { return undefined; }
    const id = intentId(value);
    if (!id) { throw new Error('space_map_required'); }
    return id;
}
export function spatialPosition(value: unknown): MapPosition {
    if (!isRecord(value) || Object.keys(value).some(k => !['map', 'at'].includes(k)) || !Object.hasOwn(value, 'at')) { throw new Error('space_position_invalid'); }
    return { frame: mapFrameId(mapOwner(value.map)), at: value.at as MapPosition['at'] };
}
export function compileFrameDeclaration(domain: MapDomain, raw: Record<string, unknown>): MapFrame {
    if (Object.keys(raw).some(k => !['map', 'mapping', 'boundary'].includes(k))) { throw new Error('space_map_has_unsupported_fields'); }
    const owner = mapOwner(raw.map), id = mapFrameId(owner);
    const frame: MapFrame = { ...domain.atlas.frames.find(f => f.id === id), id, ...(owner ? { owner } : {}) };
    if (raw.mapping === null) { delete frame.mapping; }
    else if (raw.mapping !== undefined) {
        if (!isRecord(raw.mapping) || Object.keys(raw.mapping).some(k => !['map', 'scale', 'offset'].includes(k))) { throw new Error('space_mapping_invalid'); }
        frame.mapping = { frame: mapFrameId(mapOwner(raw.mapping.map)), scale: requireDimension(raw.mapping.scale, 'mapping.scale'), offset: spacePoint(raw.mapping.offset, 'mapping.offset') };
    }
    if (raw.boundary === null) { delete frame.boundary; }
    else if (raw.boundary !== undefined) { frame.boundary = intentId(raw.boundary); }
    return frame;
}
export function compileFeatureDeclaration(domain: MapDomain, raw: Record<string, unknown>): MapFeature {
    if (Object.keys(raw).some(k => !['id', 'owner', 'map', 'role', 'material', 'geometry', 'name', 'form', 'destination', 'support', 'crosses', 'reframe'].includes(k))) { throw new Error('space_feature_has_unsupported_fields'); }
    const id = intentId(raw.id);
    if (!id) { throw new Error('space_feature_id_required'); }
    const existing = domain.atlas.features.find(f => f.id === id);
    const feature = { ...existing, id } as MapFeature;
    if (Object.hasOwn(raw, 'map')) { feature.frame = mapFrameId(mapOwner(raw.map)); }
    if (!existing || Object.hasOwn(raw, 'owner')) {
        const owner = mapOwner(Object.hasOwn(raw, 'owner') ? raw.owner : raw.map);
        if (owner) { feature.owner = owner; } else { delete feature.owner; }
    }
    for (const key of ['role', 'material', 'geometry', 'name', 'form', 'destination', 'support', 'crosses'] as const) {
        if (raw[key] === null && ['name', 'form', 'destination', 'support', 'crosses'].includes(key)) { delete feature[key]; }
        else if (raw[key] !== undefined) { Object.assign(feature, { [key]: structuredClone(raw[key]) }); }
    }
    if (Object.hasOwn(raw, 'reframe')) {
        if (!existing || raw.map !== undefined || raw.geometry !== undefined) { throw new Error('space_reframe_requires_existing_geometry'); }
        feature.frame = mapFrameId(mapOwner(raw.reframe));
    }
    if (existing && existing.frame !== feature.frame && raw.geometry === undefined) {
        const mapping = frameTransform(domain.atlas.frames, existing.frame, feature.frame);
        if (!mapping) { throw new Error('space_reframe_unmapped'); }
        feature.geometry = transformGeometry(existing.geometry, mapping);
    }
    validateSpaceGeometry(feature.geometry, 'feature.geometry');
    validateSpaceCrossings(feature.crosses, feature.role, 'feature.crosses');
    return feature;
}
