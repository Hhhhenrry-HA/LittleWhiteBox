import type { MapElement } from '../../../../domains/map/types.js';

// Only these icon/footprint combinations have a faithful local 3D recipe.
export const SCENE_TEMPLATES = {
    table: ['rect', 'circle'], counter: ['rect'], chair: ['rect'], bed: ['rect'],
    shelf: ['rect'], sofa: ['rect'], bridge: ['rect'], tree: ['rect', 'circle'], rock: ['rect', 'circle'],
} as const;
export type SceneTemplate = keyof typeof SCENE_TEMPLATES;
export function isSceneMarker(element: MapElement): boolean {
    return element.shape === 'icon' || element.shape === 'label' || element.category === 'actor' || element.category === 'door'
        || element.kind === 'stairs' || element.icon === 'stairs';
}
export function sceneTemplate(element: MapElement): SceneTemplate | undefined {
    if (isSceneMarker(element) || element.category === 'wall' || !element.icon || !Object.hasOwn(SCENE_TEMPLATES, element.icon)) {return undefined;}
    const key = element.icon as SceneTemplate;
    return (SCENE_TEMPLATES[key] as readonly string[]).includes(element.shape) ? key : undefined;
}
