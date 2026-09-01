import type { AcceptedTurnPlayer } from '../../../host/maintenance/accepted-turn-source.js';
import type { MapDomainEdit } from '../../../domains/map/edit.js';
import { MAX_SCENE_ELEMENTS } from '../../../domains/map/invariants.js';
import {
    MAP_CERTAINTIES,
    MAP_ELEMENT_CATEGORIES,
    MAP_ELEMENT_KINDS,
    MAP_ELEMENT_SHAPES,
    MAP_ICON_TOKENS,
    MAP_MATERIALS,
    MAP_TERRAIN_CATEGORY_ALIASES,
} from '../../../domains/map/semantics.js';
import type {
    MapDomainV1,
    MapElement,
    MapElementCategory,
    MapElementShape,
    MapLocation,
    MapLocationScale,
    MapLocationStatus,
    MapSceneMood,
} from '../../../domains/map/types.js';
import { mapToolResult, type MapToolItemReport, type MapToolResult } from './result.js';
import {
    applyIntentEdits,
    enumToken,
    errorText,
    finiteNumber,
    intentId,
    intentText,
    isRecord,
    point,
    points,
    positivePair,
} from './intent-common.js';

const LOCATION_SCALES: readonly MapLocationScale[] = ['city', 'district', 'building', 'floor', 'room', 'outdoor'];
const LOCATION_STATUSES: readonly MapLocationStatus[] = ['mentioned', 'visited'];
const SCENE_MOODS: readonly MapSceneMood[] = ['neutral', 'warm', 'cold', 'dark', 'mystic', 'danger', 'calm'];

export interface SceneIntentCompileResult {
    readonly domain: MapDomainV1;
    readonly edits: readonly MapDomainEdit[];
    readonly result: MapToolResult;
}

function category(value: unknown, shape: MapElementShape, warnings: string[], id: string): MapElementCategory {
    const raw = String(value || '').trim().toLowerCase();
    if (MAP_TERRAIN_CATEGORY_ALIASES.has(raw)) {
        warnings.push(`Normalized terrain category alias "${raw}" for ${id}.`);
        return 'terrain';
    }
    const normalized = enumToken(raw, MAP_ELEMENT_CATEGORIES);
    if (normalized) {return normalized;}
    if (raw) {warnings.push(`Ignored unsupported category "${raw}" for ${id}.`);}
    if (shape === 'label') {return 'label';}
    if (shape === 'path' || shape === 'curve') {return 'road';}
    if (shape === 'icon') {return 'marker';}
    return 'terrain';
}

function usableShape(shape: MapElementShape, geo: Record<string, unknown>, label: string): boolean {
    if (shape === 'rect') {return !!point(geo.center) && !!positivePair(geo.size);}
    if (shape === 'circle') {return !!point(geo.at) && (finiteNumber(geo.radius) || 0) > 0;}
    if (shape === 'path') {return !!points(geo.points);}
    if (shape === 'curve') {return !!points(geo.curve);}
    if (shape === 'icon') {return !!point(geo.at);}
    return !!point(geo.at) && !!label;
}

function shapeOrder(value: unknown): readonly MapElementShape[] {
    const raw = String(value || '').trim().toLowerCase();
    const cat = MAP_TERRAIN_CATEGORY_ALIASES.has(raw)
        ? 'terrain'
        : enumToken(raw, MAP_ELEMENT_CATEGORIES);
    if (cat === 'door') {return ['icon', 'path', 'rect', 'circle', 'label'];}
    if (cat === 'actor') {return ['icon', 'circle', 'label'];}
    if (cat === 'light') {return ['circle', 'rect', 'icon', 'label'];}
    if (cat === 'road') {return ['path', 'curve', 'rect', 'label'];}
    if (cat === 'wall') {return ['rect', 'path', 'curve', 'label'];}
    if (cat === 'label') {return ['label'];}
    if (cat === 'terrain' || cat === 'water' || cat === 'magic' || cat === 'danger') {
        return ['rect', 'circle', 'path', 'curve', 'icon', 'label'];
    }
    if (cat === 'furniture' || cat === 'decoration') {return ['rect', 'circle', 'icon', 'label'];}
    return ['rect', 'circle', 'path', 'curve', 'icon', 'label'];
}

function inferShape(cat: unknown, geo: Record<string, unknown>, label: string): MapElementShape | null {
    for (const shape of shapeOrder(cat)) {
        if (usableShape(shape, geo, label)) {return shape;}
    }
    return null;
}

function compileElement(
    raw: unknown,
    index: number,
    player: AcceptedTurnPlayer,
    warnings: string[],
): { id: string; element: MapElement } {
    if (!isRecord(raw)) {throw new Error('element_must_be_object');}
    const id = intentId(raw.id);
    if (!id) {throw new Error(`element_id_required:${index + 1}`);}
    const geo = isRecord(raw.geo) ? raw.geo : {};
    const label = intentText(raw.label, '', 160);
    const explicitShape = enumToken(raw.shape, MAP_ELEMENT_SHAPES);
    const inferred = inferShape(raw.cat, geo, label);
    let shape = explicitShape;
    if (shape && !usableShape(shape, geo, label) && inferred && inferred !== shape) {
        warnings.push(`Shape "${shape}" for ${id} had unusable geo; used "${inferred}" instead.`);
        shape = inferred;
    } else if (!shape && inferred) {
        shape = inferred;
        warnings.push(`Inferred shape "${shape}" for ${id}.`);
    }
    if (!shape) {throw new Error(`shape_or_matching_geo_required:${id}`);}

    const cat = category(raw.cat, shape, warnings, id);
    let geometry: MapElement['geometry'];
    if (shape === 'rect') {
        const center = point(geo.center);
        const size = positivePair(geo.size);
        if (!center || !size) {throw new Error(`rect_requires_center_and_size:${id}`);}
        geometry = { x: center[0] - size[0] / 2, y: center[1] - size[1] / 2, width: size[0], height: size[1] };
    } else if (shape === 'circle') {
        const at = point(geo.at);
        const radius = finiteNumber(geo.radius);
        if (!at || radius === null || radius <= 0) {throw new Error(`circle_requires_at_and_radius:${id}`);}
        geometry = { x: at[0], y: at[1], radius };
    } else if (shape === 'path' || shape === 'curve') {
        const list = points(shape === 'path' ? geo.points : geo.curve);
        if (!list) {throw new Error(`${shape}_requires_two_points:${id}`);}
        geometry = { points: list };
    } else {
        const at = point(geo.at);
        if (!at) {throw new Error(`${shape}_requires_at:${id}`);}
        if (shape === 'label' && !label) {throw new Error(`label_text_required:${id}`);}
        geometry = { x: at[0], y: at[1] };
    }

    const element: MapElement = { id, category: cat, shape, geometry };
    const kind = enumToken(raw.kind, MAP_ELEMENT_KINDS);
    if (kind) {element.kind = kind;}
    else if (raw.kind !== undefined) {warnings.push(`Ignored unsupported kind for ${id}.`);}
    const icon = enumToken(raw.icon ?? geo.icon, MAP_ICON_TOKENS);
    if (icon) {element.icon = icon;}
    else if (raw.icon !== undefined || geo.icon !== undefined) {warnings.push(`Ignored unsupported icon for ${id}.`);}
    if (label) {element.label = label;}
    const material = enumToken(raw.material, MAP_MATERIALS);
    if (material) {element.material = material;}
    else if (raw.material !== undefined) {warnings.push(`Ignored unsupported material for ${id}.`);}
    const certainty = enumToken(raw.certainty, MAP_CERTAINTIES);
    if (certainty) {element.certainty = certainty;}
    else if (raw.certainty !== undefined) {warnings.push(`Ignored unsupported certainty for ${id}.`);}
    if ((shape === 'path' || shape === 'curve') && raw.closed === true) {element.closed = true;}

    if (cat === 'actor') {
        const requestedActorKey = intentId(raw.actorKey, id);
        const isPlayer = requestedActorKey === 'player' || requestedActorKey === 'user' || kind === 'player';
        element.actorKey = isPlayer ? 'player' : requestedActorKey;
        element.kind = isPlayer ? 'player' : (kind || 'actor');
        if (isPlayer) {element.label = player.displayName;}
    } else if (raw.actorKey !== undefined) {
        warnings.push(`Ignored actorKey on non-actor element ${id}.`);
    }
    return { id, element };
}

function findLocation(domain: MapDomainV1, scene: string): MapLocation | undefined {
    return domain.atlas.locations.find(location => (
        location.key === scene
        || location.sceneKey === scene
        || location.name === scene
    ));
}

function actorMoveEdits(
    domain: MapDomainV1,
    actorKey: string,
    displayName: string,
    locationKey: string,
    keep?: { sceneKey: string; elementId?: string },
): MapDomainEdit[] {
    const edits: MapDomainEdit[] = [];
    for (const scene of Object.values(domain.scenes)) {
        for (const element of scene.elements) {
            if (
                element.category === 'actor'
                && element.actorKey === actorKey
                && (!keep || scene.key !== keep.sceneKey || (keep.elementId !== undefined && element.id !== keep.elementId))
            ) {
                edits.push({ op: 'remove-element', sceneKey: scene.key, elementId: element.id });
            }
        }
    }
    edits.push({ op: 'set-actor-position', position: { actorKey, displayName, locationKey } });
    return edits;
}

export function compileSceneIntent(
    current: MapDomainV1,
    value: unknown,
    player: AcceptedTurnPlayer,
): SceneIntentCompileResult {
    if (!isRecord(value)) {
        return { domain: current, edits: [], result: mapToolResult({ skipped: [{ index: 0, id: '', reason: 'arguments_must_be_object' }] }) };
    }
    if (Array.isArray(value.elements) && value.elements.length > MAX_SCENE_ELEMENTS) {
        return {
            domain: current,
            edits: [],
            result: mapToolResult({
                skipped: [{
                    index: 0,
                    id: intentId(value.scene),
                    reason: 'scene_elements_exceed_limit',
                    hint: `Send at most ${MAX_SCENE_ELEMENTS} elements in one MapSceneEdit call.`,
                }],
            }),
        };
    }
    const sceneName = intentId(value.scene);
    if (!sceneName || !Array.isArray(value.elements)) {
        return { domain: current, edits: [], result: mapToolResult({ skipped: [{ index: 0, id: sceneName, reason: 'scene_and_elements_required' }] }) };
    }

    let working = current;
    const edits: MapDomainEdit[] = [];
    const warnings: string[] = [];
    const applied: MapToolItemReport[] = [];
    const skipped: MapToolItemReport[] = [];
    let changed = false;
    const existingLocation = findLocation(working, sceneName);
    const locationKey = existingLocation?.key || sceneName;
    const sceneKey = existingLocation?.sceneKey || sceneName;
    const title = intentText(value.title, existingLocation?.name || sceneName);
    const scale = enumToken(value.scale, LOCATION_SCALES) || existingLocation?.scale || 'room';
    const status = enumToken(value.status, LOCATION_STATUSES)
        || (value.playerHere === true ? 'visited' : existingLocation?.status || 'mentioned');
    const viewBox = Array.isArray(value.viewBox) && value.viewBox.length === 4
        ? value.viewBox.map(finiteNumber) : null;
    const validViewBox = viewBox?.every((entry): entry is number => entry !== null)
        && (viewBox[2] as number) > 0 && (viewBox[3] as number) > 0
        ? viewBox as [number, number, number, number]
        : undefined;
    if (value.viewBox !== undefined && !validViewBox) {warnings.push('Ignored invalid scene viewBox.');}
    const mood = enumToken(value.mood, SCENE_MOODS);
    if (value.mood !== undefined && !mood) {warnings.push('Ignored invalid scene mood.');}

    if (!existingLocation && value.elements.length === 0) {
        return {
            domain: current,
            edits: [],
            result: mapToolResult({
                skipped: [{ index: 0, id: sceneName, reason: 'new_scene_requires_elements', hint: 'Draw a main surface or boundary and confirmed anchors.' }],
            }),
        };
    }
    const setup: MapDomainEdit[] = [];
    const nextLocation: MapLocation = {
        ...(existingLocation || { key: locationKey, name: title, scale, status }),
        name: title,
        scale,
        status,
        sceneKey,
    };
    setup.push({ op: 'upsert-location', location: nextLocation });
    const existingScene = working.scenes[sceneKey];
    if (!existingScene) {
        setup.push({
            op: 'initialize-scene',
            scene: { key: sceneKey, name: title, status: 'active', viewBox: validViewBox || [0, 0, 400, 300], ...(mood ? { mood } : {}) },
        });
    } else {
        const changes: Record<string, unknown> = { name: title, status: 'active' };
        if (validViewBox) {changes.viewBox = validViewBox;}
        if (mood) {changes.mood = mood;}
        setup.push({ op: 'update-scene', sceneKey, changes });
    }
    if (value.playerHere === true) {
        setup.push(...actorMoveEdits(working, 'player', player.displayName, locationKey, { sceneKey }));
    }
    try {
        const next = applyIntentEdits(working, setup);
        working = next.domain;
        changed ||= next.changed;
        edits.push(...setup);
    } catch (error) {
        return {
            domain: current,
            edits: [],
            result: mapToolResult({ skipped: [{ index: 0, id: sceneName, reason: errorText(error), hint: 'Correct the scene identity or hierarchy and retry.' }], warnings }),
        };
    }

    value.elements.forEach((raw, index) => {
        const id = isRecord(raw) ? intentId(raw.id) : '';
        try {
            const compiled = compileElement(raw, index, player, warnings);
            const elementEdits: MapDomainEdit[] = [];
            if (compiled.element.category === 'actor' && compiled.element.actorKey) {
                elementEdits.push(...actorMoveEdits(
                    working,
                    compiled.element.actorKey,
                    compiled.element.label || compiled.element.actorKey,
                    locationKey,
                    { sceneKey, elementId: compiled.element.id },
                ));
            }
            elementEdits.push({ op: 'upsert-element', sceneKey, element: compiled.element });
            const next = applyIntentEdits(working, elementEdits);
            working = next.domain;
            changed ||= next.changed;
            edits.push(...elementEdits);
            applied.push({ collection: 'elements', index, id: compiled.id, changed: next.changed });
        } catch (error) {
            skipped.push({ collection: 'elements', index, id, reason: errorText(error), hint: 'Retry only this id with one shape and matching geo.' });
        }
    });

    if (value.elements.length > 0 && applied.length === 0 && skipped.length > 0) {
        return {
            domain: current,
            edits: [],
            result: mapToolResult({ applied, skipped, warnings, hint: 'No scene changes were staged; fix the skipped elements.' }),
        };
    }
    return { domain: working, edits, result: mapToolResult({ changed, applied, skipped, warnings }) };
}
