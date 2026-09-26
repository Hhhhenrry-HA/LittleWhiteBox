import { createEmptyMapDomain } from '../../domains/map/state.js';
import { mapFrameId } from '../../domains/map/space/frames.js';

/** Explicit atlas setup for tests that exercise scene geometry rather than place creation. */
export function mapAtlasFixture(locations) {
    const domain = createEmptyMapDomain();
    domain.atlas.frames.push({ id: mapFrameId('fixture-region'), owner: 'fixture-region' });
    domain.atlas.locations = [
        { key: 'fixture-region', name: 'Fixture Region', scale: 'region', status: 'mentioned' },
        ...locations.map(location => ({ name: location.key, scale: 'room', status: 'mentioned', parent: 'fixture-region', ...location })),
    ];
    return domain;
}
