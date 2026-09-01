import type { MaintenanceFunctionDeclaration } from '../../../host/maintenance/registry.js';
import {
    MAX_MAP_ACTORS,
    MAX_MAP_LINKS,
    MAX_MAP_LOCATIONS,
    MAX_MAP_POINTS,
    MAX_SCENE_ELEMENTS,
} from '../../../domains/map/invariants.js';
import {
    MAP_CERTAINTIES,
    MAP_ELEMENT_CATEGORIES,
    MAP_ELEMENT_KINDS,
    MAP_ELEMENT_SHAPES,
    MAP_ICON_TOKENS,
    MAP_MATERIALS,
} from '../../../domains/map/semantics.js';
import { MAX_ATLAS_READ_LIMIT } from './atlas-reader.js';

export const MAP_MAINTENANCE_TOOL_NAMES = Object.freeze({
    ATLAS_READ: 'MapAtlasRead',
    ATLAS_EDIT: 'MapAtlasEdit',
    SCENE_READ: 'MapSceneRead',
    SCENE_EDIT: 'MapSceneEdit',
});

const locationScale = ['city', 'district', 'building', 'floor', 'room', 'outdoor'];
const locationStatus = ['mentioned', 'visited'];
const linkKind = ['door', 'stairs', 'elevator', 'path', 'road', 'portal', 'passage'];
const mood = ['neutral', 'warm', 'cold', 'dark', 'mystic', 'danger', 'calm'];

export const MAP_MAINTENANCE_TOOLS: readonly MaintenanceFunctionDeclaration[] = Object.freeze([
    {
        type: 'function',
        function: {
            name: MAP_MAINTENANCE_TOOL_NAMES.ATLAS_READ,
            description: [
                'Read the ordinary OS world atlas: locations, links and actor positions.',
                'Default summary returns counts and the player position only. Use a paged collection mode for normal inspection; request document only when the complete Atlas is genuinely required.',
            ].join('\n'),
            parameters: {
                type: 'object',
                properties: {
                    mode: { type: 'string', enum: ['summary', 'document', 'locations', 'links', 'actors'], description: 'Default summary. Collection modes are paged.' },
                    query: { type: 'string', maxLength: 120, description: 'Case-insensitive text filter for the selected collection.' },
                    parent: { type: 'string', maxLength: 80, description: 'Optional exact parent key filter for locations.' },
                    status: { type: 'string', enum: locationStatus, description: 'Optional location status filter.' },
                    from: { type: 'string', maxLength: 80, description: 'Optional endpoint filter for links.' },
                    to: { type: 'string', maxLength: 80, description: 'Optional other-endpoint filter for links.' },
                    kind: { type: 'string', enum: linkKind, description: 'Optional link kind filter.' },
                    actorKey: { type: 'string', maxLength: 80, description: 'Optional exact actor key filter.' },
                    limit: { type: 'integer', minimum: 1, maximum: MAX_ATLAS_READ_LIMIT, description: 'Page size; default 30.' },
                    offset: { type: 'integer', minimum: 0, description: 'Zero-based page offset.' },
                },
                additionalProperties: false,
            },
        },
    },
    {
        type: 'function',
        function: {
            name: MAP_MAINTENANCE_TOOL_NAMES.ATLAS_EDIT,
            description: [
                'Declaratively maintain confirmed world locations, routes and actor positions. Do not send internal domain commands.',
                'Location keys are stable identities. Scene links are owned by MapSceneEdit and are not tool input.',
                'Omit a link id for the stable endpoint/kind-derived id. Bidirectional defaults true.',
                'Removal is for explicit correction or destruction, never merely because an actor left a place.',
            ].join('\n'),
            parameters: {
                type: 'object',
                properties: {
                    locations: {
                        type: 'array',
                        maxItems: MAX_MAP_LOCATIONS,
                        description: 'Upsert confirmed places. Parents may appear anywhere in the same call.',
                        items: {
                            type: 'object',
                            properties: {
                                key: { type: 'string', maxLength: 80, description: 'Stable identity; keep it unchanged when the display name changes.' },
                                name: { type: 'string', maxLength: 120, description: 'Current confirmed display name.' },
                                scale: { type: 'string', enum: locationScale, description: 'Place hierarchy scale; default room for a new location.' },
                                status: { type: 'string', enum: locationStatus, description: 'Confirmed discovery state; default mentioned.' },
                                parent: {
                                    type: ['string', 'null'],
                                    maxLength: 80,
                                    description: 'Existing or same-call parent location key. Use null to move the location to the Atlas root.',
                                },
                                brief: { type: 'string', maxLength: 500, description: 'Optional short confirmed description used to identify the place.' },
                            },
                            required: ['key', 'name'], additionalProperties: false,
                        },
                    },
                    links: {
                        type: 'array',
                        maxItems: MAX_MAP_LINKS,
                        description: 'Upsert confirmed routes between existing or same-call location keys.',
                        items: {
                            type: 'object',
                            properties: {
                                id: { type: 'string', description: 'Optional. Omit for the stable endpoint/kind-derived id; use an explicit id only for parallel same-kind routes.' },
                                from: { type: 'string', maxLength: 80 }, to: { type: 'string', maxLength: 80 },
                                kind: { type: 'string', enum: linkKind }, label: { type: 'string', maxLength: 160 },
                                bidirectional: { type: 'boolean', description: 'Defaults true.' },
                            },
                            required: ['from', 'to', 'kind'], additionalProperties: false,
                        },
                    },
                    actors: {
                        type: 'array',
                        maxItems: MAX_MAP_ACTORS,
                        description: 'Set world-level actor locations. Use MapSceneEdit for visible player coordinates inside a scene.',
                        items: {
                            type: 'object',
                            properties: {
                                actorKey: { type: 'string', maxLength: 80 },
                                displayName: { type: 'string', maxLength: 120 },
                                locationKey: { type: 'string', maxLength: 80 },
                            },
                            required: ['actorKey', 'locationKey'], additionalProperties: false,
                        },
                    },
                    remove: {
                        type: 'object',
                        description: 'Explicit correction/destruction only. Location removal cascades through descendants and owned Map data.',
                        properties: {
                            locationKeys: { type: 'array', maxItems: MAX_MAP_LOCATIONS, items: { type: 'string', maxLength: 80 } },
                            linkIds: { type: 'array', maxItems: MAX_MAP_LINKS, items: { type: 'string', maxLength: 80 } },
                            actorKeys: { type: 'array', maxItems: MAX_MAP_ACTORS, items: { type: 'string', maxLength: 80 } },
                        },
                        additionalProperties: false,
                    },
                },
                additionalProperties: false,
            },
        },
    },
    {
        type: 'function',
        function: {
            name: MAP_MAINTENANCE_TOOL_NAMES.SCENE_READ,
            description: 'Read one detailed scene by explicit scene or place key.',
            parameters: {
                type: 'object', properties: { scene: { type: 'string' } }, required: ['scene'], additionalProperties: false,
            },
        },
    },
    {
        type: 'function',
        function: {
            name: MAP_MAINTENANCE_TOOL_NAMES.SCENE_EDIT,
            description: [
                'Create or edit one scene from high-level drawing intent. The runtime creates and links its atlas location.',
                'Use one shape with matching geo: rect={center,size}; circle={at,radius}; path={points}; curve={curve}; icon={at}; label={at}+label.',
                'Bad elements are skipped independently. Keep successful ids and retry only skipped ids.',
            ].join('\n'),
            parameters: {
                type: 'object',
                properties: {
                    scene: { type: 'string' }, title: { type: 'string' },
                    scale: { type: 'string', enum: locationScale },
                    status: { type: 'string', enum: locationStatus },
                    playerHere: { type: 'boolean' },
                    viewBox: { type: 'array', items: { type: 'number' }, minItems: 4, maxItems: 4 },
                    mood: { type: 'string', enum: mood },
                    elements: {
                        type: 'array',
                        maxItems: MAX_SCENE_ELEMENTS,
                        items: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                cat: { type: 'string', enum: [...MAP_ELEMENT_CATEGORIES] },
                                kind: { type: 'string', enum: [...MAP_ELEMENT_KINDS] },
                                shape: { type: 'string', enum: [...MAP_ELEMENT_SHAPES] },
                                geo: {
                                    type: 'object',
                                    properties: {
                                        center: { type: 'array', items: { type: 'number' }, minItems: 2, maxItems: 2 },
                                        at: { type: 'array', items: { type: 'number' }, minItems: 2, maxItems: 2 },
                                        size: { type: 'array', items: { type: 'number' }, minItems: 2, maxItems: 2 },
                                        radius: { type: 'number', exclusiveMinimum: 0 },
                                        points: { type: 'array', minItems: 2, maxItems: MAX_MAP_POINTS, items: { type: 'array', items: { type: 'number' }, minItems: 2, maxItems: 2 } },
                                        curve: { type: 'array', minItems: 2, maxItems: MAX_MAP_POINTS, items: { type: 'array', items: { type: 'number' }, minItems: 2, maxItems: 2 } },
                                    },
                                    additionalProperties: false,
                                },
                                label: { type: 'string' }, actorKey: { type: 'string' },
                                icon: {
                                    type: 'string',
                                    enum: [...MAP_ICON_TOKENS],
                                    description: 'Optional canonical icon token. This is an element field, never part of geo.',
                                },
                                material: { type: 'string', enum: [...MAP_MATERIALS] },
                                certainty: { type: 'string', enum: [...MAP_CERTAINTIES] },
                                closed: { type: 'boolean' },
                            },
                            required: ['id'], additionalProperties: false,
                        },
                    },
                },
                required: ['scene', 'elements'], additionalProperties: false,
            },
        },
    },
]);
