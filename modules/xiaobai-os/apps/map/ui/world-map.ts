import type { MapAtlas, MapLocation } from '../../../domains/map/types.js';
import { locationTrail } from '../../../domains/map/hierarchy.js';


/** The closest visible ancestor represents off-scope actors and route endpoints. */
export function locationInScope(atlas: MapAtlas, key: string, locations: readonly MapLocation[]): string {
    const visible = new Set(locations.map(location => location.key));
    return locationTrail(atlas, key).reverse().find(location => visible.has(location.key))?.key || '';
}

export function connectedPlaces(atlas: MapAtlas, key: string) {
    return atlas.links.flatMap(link => {
        if (link.from !== key && link.to !== key) {return [];}
        const location = atlas.locations.find(item => item.key === (link.from === key ? link.to : link.from));
        return location ? [{ location, link, outgoing: link.bidirectional || link.from === key }] : [];
    });
}
