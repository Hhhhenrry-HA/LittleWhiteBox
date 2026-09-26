import { MapDomainError, MAX_MAP_COORDINATE, MAX_MAP_NAME_LENGTH, MAX_MAP_POINTS, requireCoordinate, requireDimension, requireEnum, requireId, requireKeys, requireRecord, requireString } from '../invariants.js';
import { MAP_MATERIALS } from '../semantics.js';
import type { MapLink, MapLocation } from '../types.js';
import { ATLAS_FRAME, createFrameResolver, frameTransform, mapFrameId, transformPoint } from './frames.js';
import { geometryBounds, geometryClosed, geometryPoints, simpleContour, transformGeometry } from './geometry.js';
import { spaceSurfaceConflicts } from './surface-conflicts.js';
import { MAX_MAP_FEATURES, MAX_MAP_FRAMES, SPACE_EXTRA_MATERIALS, SPACE_FORMS, SPACE_ROLES, type MapFeature, type MapFrame, type MapPosition, type SpaceGeometry, type SpacePoint } from './types.js';

export function spaceFailure(code: string): never { throw new MapDomainError('map_invalid_domain', code); }
export function spacePoint(value: unknown, path: string): SpacePoint {
    if (!Array.isArray(value) || value.length !== 2) { spaceFailure('space_point_invalid'); }
    return [requireCoordinate(value[0], `${path}.0`), requireCoordinate(value[1], `${path}.1`)];
}
export function validateMapPosition(value: unknown, path: string): MapPosition {
    const record = requireRecord(value, path);
    requireKeys(record, ['frame', 'at'], [], path);
    return { frame: requireId(record.frame, `${path}.frame`), at: spacePoint(record.at, `${path}.at`) };
}
export function validateSpaceCrossings(value: unknown, role: unknown, path: string): void {
    if (value === undefined) { return; }
    if (!Array.isArray(value) || !value.length || value.length > MAX_MAP_FEATURES || !['surface', 'structure', 'channel'].includes(String(role))) { spaceFailure('space_crossing_invalid'); }
    value.forEach(v => requireId(v, path));
    if (new Set(value).size !== value.length) { spaceFailure('space_crossing_duplicate'); }
}
export function validateSpaceGeometry(value: unknown, path: string): SpaceGeometry {
    const g = requireRecord(value, path);
    if (g.shape === 'rect' || g.shape === 'circle' || g.shape === 'point') {
        requireKeys(g, ['shape', 'x', 'y', ...(g.shape === 'rect' ? ['width', 'height'] : g.shape === 'circle' ? ['radius'] : [])], [], path);
        requireCoordinate(g.x, `${path}.x`); requireCoordinate(g.y, `${path}.y`);
        if (g.shape === 'rect') { requireDimension(g.width, `${path}.width`); requireDimension(g.height, `${path}.height`); }
        if (g.shape === 'circle') { requireDimension(g.radius, `${path}.radius`); }
    } else if (g.shape === 'path' || g.shape === 'curve') {
        requireKeys(g, ['shape', 'points'], ['closed', 'width'], path);
        if (g.closed !== undefined && typeof g.closed !== 'boolean') { spaceFailure('space_closed_invalid'); }
        if (!Array.isArray(g.points) || g.points.length < (g.closed ? 3 : 2) || g.points.length > MAX_MAP_POINTS) { spaceFailure('space_points_invalid'); }
        g.points.forEach((p, i) => spacePoint(p, `${path}.points.${i}`));
        if (g.width !== undefined) { requireDimension(g.width, `${path}.width`); }
        if (g.closed && g.width !== undefined) { spaceFailure('space_closed_width_invalid'); }
        if (new Set(g.points.map(p => JSON.stringify(p))).size !== g.points.length) { spaceFailure('space_duplicate_point'); }
    } else { spaceFailure('space_shape_invalid'); }
    const geometry = g as unknown as SpaceGeometry;
    validateGeometryExtent(geometry, path);
    if (geometryClosed(geometry)) {
        const points = geometryPoints(geometry);
        const area = points.reduce((sum, p, i) => { const q = points[(i + 1) % points.length]; return sum + p[0] * q[1] - p[1] * q[0]; }, 0);
        if (Math.abs(area) < 1e-8) { spaceFailure('space_area_empty'); }
        if ('points' in geometry && !simpleContour(points)) { spaceFailure('space_contour_self_intersection'); }
    }
    return geometry;
}

function validateGeometryExtent(geometry: SpaceGeometry, path: string): void {
    const b = geometryBounds(geometry);
    if (![b[0], b[1], b[0] + b[2], b[1] + b[3]].every(n => Number.isFinite(n) && Math.abs(n) <= MAX_MAP_COORDINATE)) { spaceFailure('space_geometry_out_of_bounds'); }
    if (geometry.shape === 'rect') { requireDimension(geometry.width, path); requireDimension(geometry.height, path); }
    if (geometry.shape === 'circle') { requireDimension(geometry.radius, path); }
    if ('width' in geometry && geometry.width !== undefined) { requireDimension(geometry.width, path); }
}

export function validateMapSpace(atlas: Record<string, unknown>, locations: MapLocation[], links: MapLink[], path: string): void {
    if (!Array.isArray(atlas.frames) || atlas.frames.length > MAX_MAP_FRAMES || !Array.isArray(atlas.features) || atlas.features.length > MAX_MAP_FEATURES) { spaceFailure('space_collection_invalid'); }
    const keys = new Set(locations.map(l => l.key));
    const frames = new Map<string, MapFrame>();
    const features = new Map<string, MapFeature>();
    for (const value of atlas.frames) {
        const frame = requireRecord(value, `${path}.frames`);
        requireKeys(frame, ['id'], ['owner', 'mapping', 'boundary'], `${path}.frames`);
        const id = requireId(frame.id, `${path}.frames.id`);
        if (frame.owner !== undefined && !keys.has(requireId(frame.owner, `${path}.frames.owner`))) { spaceFailure('space_owner_missing'); }
        if (id !== mapFrameId(frame.owner as string | undefined) || frames.has(id)) { spaceFailure('space_frame_id_invalid'); }
        if (frame.mapping !== undefined) {
            const m = requireRecord(frame.mapping, `${path}.mapping`);
            requireKeys(m, ['frame', 'scale', 'offset'], [], `${path}.mapping`);
            requireId(m.frame, `${path}.mapping.frame`);
            requireDimension(m.scale, `${path}.mapping.scale`);
            spacePoint(m.offset, `${path}.mapping.offset`);
        }
        if (frame.boundary !== undefined) { requireId(frame.boundary, `${path}.boundary`); }
        frames.set(id, frame as unknown as MapFrame);
    }
    if (!frames.has(ATLAS_FRAME) || frames.get(ATLAS_FRAME)?.mapping) { spaceFailure('space_atlas_frame_required'); }
    for (const frame of frames.values()) {
        const visited = new Set([frame.id]);
        let cursor = frame;
        while (cursor.mapping) {
            const parent = frames.get(cursor.mapping.frame);
            if (!parent) { spaceFailure('space_frame_missing'); }
            if (visited.has(parent.id)) { spaceFailure('space_frame_cycle'); }
            visited.add(parent.id); cursor = parent;
        }
        if (!frameTransform([...frames.values()], frame.id, cursor.id)) { spaceFailure('space_mapping_out_of_bounds'); }
    }
    for (const value of atlas.features) {
        const f = requireRecord(value, `${path}.features`);
        requireKeys(f, ['id', 'frame', 'role', 'material', 'geometry'], ['owner', 'name', 'form', 'destination', 'support', 'crosses'], `${path}.features`);
        const id = requireId(f.id, `${path}.features.id`);
        if (features.has(id)) { spaceFailure('space_feature_duplicate'); }
        if (f.owner !== undefined && !keys.has(requireId(f.owner, `${path}.owner`))) { spaceFailure('space_owner_missing'); }
        if (!frames.has(requireId(f.frame, `${path}.frame`))) { spaceFailure('space_frame_missing'); }
        requireEnum(f.role, new Set(SPACE_ROLES), `${path}.role`);
        requireEnum(f.material, new Set([...MAP_MATERIALS, ...SPACE_EXTRA_MATERIALS]), `${path}.material`);
        const geometry = validateSpaceGeometry(f.geometry, `${path}.geometry`);
        if (['environment', 'surface', 'cover', 'relief', 'zone', 'boundary'].includes(String(f.role)) && !geometryClosed(geometry)) { spaceFailure('space_area_required'); }
        if (f.name !== undefined) { requireString(f.name, `${path}.name`, MAX_MAP_NAME_LENGTH); }
        if (f.form !== undefined) { requireEnum(f.form, new Set(SPACE_FORMS), `${path}.form`); }
        if (f.destination !== undefined && !keys.has(requireId(f.destination, `${path}.destination`))) { spaceFailure('space_destination_missing'); }
        if (f.destination !== undefined && f.name !== undefined) { spaceFailure('space_name_owned_by_destination'); }
        if (f.support !== undefined) { requireId(f.support, `${path}.support`); }
        validateSpaceCrossings(f.crosses, f.role, `${path}.crosses`);
        features.set(id, f as unknown as MapFeature);
    }
    const list = [...frames.values()];
    const resolve = createFrameResolver(list);
    for (const frame of frames.values()) {
        if (frame.boundary) {
            const boundary = features.get(frame.boundary);
            if (!boundary || boundary.frame !== frame.id || !geometryClosed(boundary.geometry)) { spaceFailure('space_boundary_invalid'); }
        }
    }
    const footprints = new Set<string>();
    for (const feature of features.values()) {
        if (feature.destination && feature.role === 'structure' && geometryClosed(feature.geometry)) {
            if (footprints.has(feature.destination)) { spaceFailure('space_footprint_duplicate'); }
            footprints.add(feature.destination);
        }
        const visiting = new Set<string>();
        const checked = new Set<string>();
        function walk(item: MapFeature): void {
            if (checked.has(item.id)) { return; }
            if (visiting.has(item.id)) { spaceFailure('space_support_cycle'); }
            visiting.add(item.id);
            for (const ref of [...(item.support ? [item.support] : []), ...(item.crosses || [])]) {
                const target = features.get(ref);
                if (!target) { spaceFailure('space_support_missing'); }
                if (ref === item.support && (!geometryClosed(target.geometry) || !['surface', 'structure', 'environment'].includes(target.role))) { spaceFailure('space_support_not_surface'); }
                if (!resolve(item.frame, target.frame)) { spaceFailure('space_support_unmapped'); }
                walk(target);
            }
            visiting.delete(item.id);
            checked.add(item.id);
        }
        walk(feature);
        for (const target of frames.values()) {
            const mapping = resolve(feature.frame, target.id);
            // Positive affine maps preserve topology; only numeric bounds need checking again.
            if (mapping) { validateGeometryExtent(transformGeometry(feature.geometry, mapping), `${path}.projection`); }
        }
    }
    // Different opaque surfaces on one support cannot be ordered by input array position.
    if (spaceSurfaceConflicts([...features.values()], list).length) { spaceFailure('space_surface_conflict'); }
    for (const location of locations) {
        if (!location.position) { continue; }
        if (!frames.has(location.position.frame)) { spaceFailure('space_frame_missing'); }
        for (const target of frames.values()) {
            const mapping = resolve(location.position.frame, target.id);
            if (mapping) { transformPoint(location.position.at, mapping).forEach(n => requireCoordinate(n, `${path}.projection`)); }
        }
    }
    for (const link of links) {
        if (link.feature) {
            const f = features.get(link.feature);
            if (!f || f.role !== 'channel' || geometryClosed(f.geometry) || f.geometry.shape === 'point') { spaceFailure('space_route_geometry_invalid'); }
        }
    }
}
