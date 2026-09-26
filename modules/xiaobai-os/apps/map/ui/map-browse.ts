import type { MapLocation } from '../../../domains/map/types.js';
import type { MapBrowseScope, MapBrowseFilter } from '../../../domains/map/space/projection.js';

/** The input is already scoped; searching never widens it to the full atlas. */
export function searchMapScope(scope: MapBrowseScope, query: string, filter: MapBrowseFilter): MapLocation[] {
    const term = query.trim().toLocaleLowerCase();
    return scope.locations.filter(place =>
        [place.name, place.brief].some(value => value?.toLocaleLowerCase().includes(term))
        && (filter === 'all' || (filter === 'visited' ? place.status === 'visited' : place.status !== 'visited')),
    );
}
