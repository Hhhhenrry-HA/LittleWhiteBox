export const MAP_MANAGEMENT_PROMPT = [
    '# Map domain',
    'The atlas holds places, routes and actor positions. A scene is the spatial layout of one place.',
    'You supply spatial facts; the map supplies appearance from categories, materials and geometry.',
    '',
    '## What you have',
    'The initial map data contains atlas counts and the player position, not a complete inventory.',
    'MapAtlasRead collections provide the place, route and actor keys needed for a record change. MapSceneRead provides the current layout before a scene edit.',
].join('\n');
