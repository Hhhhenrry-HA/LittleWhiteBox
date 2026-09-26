import type { MapDomain } from '../../../domains/map/types.js';

export function resolveInitialMapView(map: MapDomain | null): 'scene' | 'world' {
    const player = map?.atlas.actors.find(actor => actor.actorKey === 'player');
    const place = map?.atlas.locations.find(location => location.key === player?.locationKey);
    return place?.sceneKey && map?.scenes[place.sceneKey]?.status === 'active' ? 'scene' : 'world';
}
