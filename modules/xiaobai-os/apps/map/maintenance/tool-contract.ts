import type { MaintenanceFunctionDeclaration } from '../../../capabilities/maintenance/registry.js';
import {
    MAX_MAP_ACTORS,
    MAX_MAP_BRIEF_LENGTH,
    MAX_MAP_COORDINATE,
    MAX_MAP_DIMENSION,
    MAX_MAP_ID_LENGTH,
    MAX_MAP_LABEL_LENGTH,
    MAX_MAP_LINKS,
    MAX_MAP_LOCATIONS,
    MAX_MAP_NAME_LENGTH,
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
import { MAX_ATLAS_QUERY_LENGTH, MAX_ATLAS_READ_LIMIT } from './atlas-reader.js';

export const MAP_MAINTENANCE_TOOL_NAMES = Object.freeze({
    ATLAS_READ: 'MapAtlasRead',
    ATLAS_EDIT: 'MapAtlasEdit',
    SCENE_READ: 'MapSceneRead',
    SCENE_EDIT: 'MapSceneEdit',
});

const locationScale = ['world', 'region', 'city', 'district', 'building', 'floor', 'room', 'outdoor'];
const locationStatus = ['mentioned', 'visited'];
const linkKind = ['door', 'stairs', 'elevator', 'path', 'road', 'portal', 'passage'];
const mood = ['neutral', 'warm', 'cold', 'dark', 'mystic', 'danger', 'calm'];

const coordinatePair = {
    type: 'array',
    items: { type: 'number', minimum: -MAX_MAP_COORDINATE, maximum: MAX_MAP_COORDINATE },
    minItems: 2,
    maxItems: 2,
} as const;

const pointList = {
    type: 'array',
    minItems: 2,
    maxItems: MAX_MAP_POINTS,
    items: coordinatePair,
} as const;

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
                    query: { type: 'string', maxLength: MAX_ATLAS_QUERY_LENGTH, description: 'Case-insensitive text filter for the selected collection.' },
                    parent: { type: 'string', maxLength: MAX_MAP_ID_LENGTH, description: 'Optional exact parent key filter for locations.' },
                    status: { type: 'string', enum: locationStatus, description: 'Optional location status filter.' },
                    from: { type: 'string', maxLength: MAX_MAP_ID_LENGTH, description: 'Optional endpoint filter for links.' },
                    to: { type: 'string', maxLength: MAX_MAP_ID_LENGTH, description: 'Optional other-endpoint filter for links.' },
                    kind: { type: 'string', enum: linkKind, description: 'Optional link kind filter.' },
                    actorKey: { type: 'string', maxLength: MAX_MAP_ID_LENGTH, description: 'Optional exact actor key filter.' },
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
                'Build and maintain an explorable world from the supplied setting, adding coherent geography where it is unspecified. Actor movement and visited status still require story evidence. Do not send internal domain commands.',
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
                        description: 'Upsert setting-authored or coherently created places, including unvisited destinations. Parents may appear anywhere in the same call.',
                        items: {
                            type: 'object',
                            properties: {
                                key: { type: 'string', maxLength: MAX_MAP_ID_LENGTH, description: 'Stable identity; keep it unchanged when the display name changes.' },
                                name: { type: 'string', maxLength: MAX_MAP_NAME_LENGTH, description: 'Stable in-world place name; respect author-provided names.' },
                                scale: { type: 'string', enum: locationScale, description: 'Place hierarchy scale; default room for a new location.' },
                                status: { type: 'string', enum: locationStatus, description: 'Confirmed discovery state. New places default to mentioned; the player\'s actual location is always visited.' },
                                parent: {
                                    type: ['string', 'null'],
                                    maxLength: MAX_MAP_ID_LENGTH,
                                    description: 'Existing or same-call parent location key. Use null to move the location to the Atlas root.',
                                },
                                brief: { type: 'string', maxLength: MAX_MAP_BRIEF_LENGTH, description: 'Short in-world description: what distinguishes this place and why someone might visit. Do not invent events that already happened.' },
                                position: { ...coordinatePair, type: ['array', 'null'], description: 'Use null to clear. Stable [x,y] map position inside the parent region (root places share the world plane). North is smaller y. Use roughly 0..1000 with 160+ separation; follow authored directions, otherwise establish plausible geography. Preserve existing positions.' },
                                terrain: { type: ['string', 'null'], enum: ['urban', 'plain', 'forest', 'water', 'mountain', 'desert', 'snow', null], description: 'Use null to clear. Landscape of this place, used on the world map. Match the setting.' },
                            },
                            required: ['key', 'name'], additionalProperties: false,
                        },
                    },
                    links: {
                        type: 'array',
                        maxItems: MAX_MAP_LINKS,
                        description: 'Upsert world routes between existing or same-call locations. Respect authored connections and add plausible connections for newly created destinations.',
                        items: {
                            type: 'object',
                            properties: {
                                id: { type: 'string', maxLength: MAX_MAP_ID_LENGTH, description: 'Optional. Omit for the stable endpoint/kind-derived id; use an explicit id only for parallel same-kind routes.' },
                                from: { type: 'string', maxLength: MAX_MAP_ID_LENGTH, description: 'Existing or same-call source location key.' },
                                to: { type: 'string', maxLength: MAX_MAP_ID_LENGTH, description: 'Existing or same-call destination location key.' },
                                kind: { type: 'string', enum: linkKind, description: 'Route type connecting the two places.' },
                                label: { type: 'string', maxLength: MAX_MAP_LABEL_LENGTH, description: 'Optional short route name.' },
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
                                actorKey: { type: 'string', maxLength: MAX_MAP_ID_LENGTH, description: 'Stable actor identity. The player is always "player".' },
                                displayName: { type: 'string', maxLength: MAX_MAP_NAME_LENGTH, description: 'Optional current display name. Omit it to preserve an existing actor name.' },
                                locationKey: { type: 'string', maxLength: MAX_MAP_ID_LENGTH, description: 'Existing or same-call location key the actor is now in.' },
                            },
                            required: ['actorKey', 'locationKey'], additionalProperties: false,
                        },
                    },
                    remove: {
                        type: 'object',
                        description: 'Explicit correction/destruction only. Location removal cascades through descendants and owned Map data.',
                        properties: {
                            locationKeys: { type: 'array', maxItems: MAX_MAP_LOCATIONS, items: { type: 'string', maxLength: MAX_MAP_ID_LENGTH } },
                            linkIds: { type: 'array', maxItems: MAX_MAP_LINKS, items: { type: 'string', maxLength: MAX_MAP_ID_LENGTH } },
                            actorKeys: { type: 'array', maxItems: MAX_MAP_ACTORS, items: { type: 'string', maxLength: MAX_MAP_ID_LENGTH } },
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
            description: [
                'Read one detailed scene when you need its current layout or element ids. Existing elements can be patched without resending unchanged fields.',
                'The key is the same value passed as MapSceneEdit.scene: a scene key, or the location key that owns it.',
            ].join('\n'),
            parameters: {
                type: 'object',
                properties: {
                    scene: { type: 'string', maxLength: MAX_MAP_ID_LENGTH, description: 'Scene key or owning location key.' },
                },
                required: ['scene'], additionalProperties: false,
            },
        },
    },
    {
        type: 'function',
        function: {
            name: MAP_MAINTENANCE_TOOL_NAMES.SCENE_EDIT,
            description: [
                'Create or edit one scene from high-level drawing intent. The runtime creates and links its atlas location, so never pass sceneKey to MapAtlasEdit.',
                'Existing elements are patched by id: omitted fields are preserved and null clears optional fields. Category and actor identity are stable. A supplied geo is a complete geometry replacement, never a deep merge.',
                'New elements need cat and complete valid geo. Elements you do not send are untouched. Use remove for explicit element deletion.',
                'Give one shape and the geo it needs: rect={center,size}; circle={at,radius}; path={points}; curve={curve}; icon={at}; label={at}+label.',
                'Bad elements are skipped independently. Keep the applied ids and retry only the skipped ids.',
            ].join('\n'),
            parameters: {
                type: 'object',
                properties: {
                    scene: {
                        type: 'string',
                        maxLength: MAX_MAP_ID_LENGTH,
                        description: 'Stable scene key, or the location key that owns the scene. Reused on every later edit of the same place.',
                    },
                    title: {
                        type: 'string',
                        maxLength: MAX_MAP_NAME_LENGTH,
                        description: 'Display name of the place. Defaults to the existing name, or to the scene key for a new place.',
                    },
                    scale: { type: 'string', enum: ['city', 'district', 'building', 'floor', 'room', 'outdoor'], description: 'Concrete scene scale; default room. Use the world atlas for worlds and regions.' },
                    status: { type: 'string', enum: locationStatus, description: 'Confirmed discovery state. Preserves an existing value; a new place defaults to mentioned unless the player is placed here, which makes it visited.' },
                    playerHere: { type: 'boolean', description: 'True when the player is inside this scene now. This makes the place visited. Also send a player element so the visible position updates.' },
                    viewBox: {
                        type: 'array',
                        items: { type: 'number', minimum: -MAX_MAP_COORDINATE, maximum: MAX_MAP_COORDINATE },
                        minItems: 4,
                        maxItems: 4,
                        description: 'Camera as [x, y, width, height]: top-left corner then size. Width and height must be positive. Defaults to [0, 0, 400, 300].',
                    },
                    mood: { type: ['string', 'null'], enum: [...mood, null], description: 'Optional scene atmosphere used for rendering. Use null to clear it.' },
                    elements: {
                        type: 'array',
                        maxItems: MAX_SCENE_ELEMENTS,
                        description: 'Element patches addressed by id. For an existing id, omitted fields are preserved; for a new id, send cat and complete geometry.',
                        items: {
                            type: 'object',
                            properties: {
                                id: { type: 'string', maxLength: MAX_MAP_ID_LENGTH, description: 'Stable element identity inside this scene.' },
                                cat: { type: 'string', enum: [...MAP_ELEMENT_CATEGORIES], description: 'What the element is. Required for a new id. An existing id keeps its stored category; use another id for a different entity.' },
                                kind: { type: ['string', 'null'], enum: [...MAP_ELEMENT_KINDS, null], description: 'Optional closed-system meaning, such as a door or the player. Use null to clear it.' },
                                shape: { type: 'string', enum: [...MAP_ELEMENT_SHAPES], description: 'Optional. Inferred from geo when omitted; a shape that does not match its geo is corrected to the inferred one.' },
                                geo: {
                                    type: 'object',
                                    description: 'Geometry for the chosen shape. Send only the keys that shape needs.',
                                    properties: {
                                        center: { ...coordinatePair, description: 'Rect center [x, y].' },
                                        at: { ...coordinatePair, description: 'Single anchor point [x, y] for circle, icon and label.' },
                                        size: {
                                            type: 'array',
                                            items: { type: 'number', exclusiveMinimum: 0, maximum: MAX_MAP_DIMENSION },
                                            minItems: 2,
                                            maxItems: 2,
                                            description: 'Rect size [width, height]; both must be positive.',
                                        },
                                        radius: { type: 'number', exclusiveMinimum: 0, maximum: MAX_MAP_DIMENSION, description: 'Circle radius.' },
                                        points: { ...pointList, description: 'Polyline vertices for shape "path".' },
                                        curve: { ...pointList, description: 'Control points for shape "curve".' },
                                    },
                                    additionalProperties: false,
                                },
                                label: { type: ['string', 'null'], maxLength: MAX_MAP_LABEL_LENGTH, description: 'Optional short visible text. Required for shape "label". Use null to clear it.' },
                                actorKey: { type: ['string', 'null'], maxLength: MAX_MAP_ID_LENGTH, description: 'Stable actor identity for a new cat "actor" element. The player is always "player". An existing actor keeps its stored actorKey.' },
                                icon: {
                                    type: ['string', 'null'],
                                    enum: [...MAP_ICON_TOKENS, null],
                                    description: 'Optional canonical icon token. Use null to clear it. This is an element field, never a key inside geo.',
                                },
                                material: { type: ['string', 'null'], enum: [...MAP_MATERIALS, null], description: 'Optional semantic evidence of what the surface is, not styling. Use null to clear it.' },
                                certainty: { type: ['string', 'null'], enum: [...MAP_CERTAINTIES, null], description: 'Optional. Omit for ordinary confirmed facts; use null to clear it; never use it as opacity styling.' },
                                closed: { type: ['boolean', 'null'], description: 'Optional. Closes a path or curve back to its first point. Use null to clear it.' },
                            },
                            required: ['id'], additionalProperties: false,
                        },
                    },
                    remove: {
                        type: 'array',
                        maxItems: MAX_SCENE_ELEMENTS,
                        items: { type: 'string', maxLength: MAX_MAP_ID_LENGTH },
                        description: 'Element ids to delete from this scene. Use only for explicit correction, disappearance, or destruction.',
                    },
                },
                required: ['scene'], additionalProperties: false,
            },
        },
    },
]);
