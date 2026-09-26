import assert from 'node:assert/strict';
import test from 'node:test';
import { mapBrowseScope, projectAtlas } from '../domains/map/space/projection.js';
import { searchMapScope } from '../apps/map/ui/map-browse.js';
import { mapFrameId } from '../domains/map/space/frames.js';
import { locationRegion } from '../domains/map/hierarchy.js';
import { locationInScope } from '../apps/map/ui/world-map.js';
import { validateMapDomain } from '../domains/map/invariants.js';
import { mapBrowseFixture } from './fixtures/map-browse.js';

// Protect the count/list scope contract in the pure projection; actual navigation is checked in the browser.
test('world counts and searches only regions; a region counts and searches only its scenes', () => {
    const map = mapBrowseFixture();
    validateMapDomain(map);
    const original = structuredClone(map);
    const world = mapBrowseScope(map.atlas, null);
    const region = mapBrowseScope(map.atlas, 'harbor');
    assert.equal(world.locations.length, 3);
    assert.equal(world.unvisited, 2);
    assert.deepEqual(searchMapScope(world, '', 'unvisited').map(place => place.key), ['mountains', 'islands']);
    assert.equal(searchMapScope(world, '酒馆', 'all').length, 0);
    assert.equal(region.locations.length, 10);
    assert.equal(region.unvisited, 5);
    assert.equal(searchMapScope(region, '', 'unvisited').length, region.unvisited);
    assert.equal(searchMapScope(region, '', 'visited').length, 5);
    assert.equal(searchMapScope(region, '群山', 'all').length, 0);
    assert.deepEqual(searchMapScope(region, '  酒馆  ', 'all').map(place => place.key), ['harbor-0']);
    assert.deepEqual(projectAtlas(map.atlas, world).nodes.map(node => node.location.key).sort(), world.locations.map(place => place.key).sort());
    assert.equal(locationInScope(map.atlas, 'harbor-0', world.locations), 'harbor');
    assert.deepEqual(map, original);
});

test('an empty or unknown region never borrows scenes from elsewhere', () => {
    const { atlas } = mapBrowseFixture();
    for (const key of ['mountains', 'islands', '', 'missing']) {
        const scope = mapBrowseScope(atlas, key);
        assert.equal(scope.kind, 'region');
        assert.equal(scope.locations.length, 0);
        assert.equal(scope.unvisited, 0);
        assert.deepEqual(searchMapScope(scope, '', 'all'), []);
    }
    assert.equal(mapBrowseScope(atlas, 'mountains').region.key, 'mountains');
    assert.equal(mapBrowseScope(atlas, '').region, undefined);
});

test('scene ownership follows the nearest region, not scene existence or direct parent depth', () => {
    const { atlas } = mapBrowseFixture();
    atlas.locations.push(
        { key: 'room', name: '二楼客房', scale: 'room', status: 'mentioned', parent: 'harbor-0', position: { frame: mapFrameId('harbor-0'), at: [10, 20] } },
        { key: 'inner-region', name: '内港区', scale: 'region', status: 'mentioned', parent: 'harbor' },
        { key: 'inner-place', name: '内港工坊', scale: 'building', status: 'mentioned', parent: 'inner-region' },
        { key: 'other-place', name: '山间旅舍', scale: 'building', status: 'mentioned', parent: 'mountains' },
        { key: 'unassigned', name: '归属未知', scale: 'outdoor', status: 'mentioned' },
    );
    const scope = mapBrowseScope(atlas, 'harbor');
    assert.equal(scope.locations.length, 11);
    assert.equal(locationRegion(atlas, 'room').key, 'harbor');
    assert.equal(locationRegion(atlas, 'inner-place').key, 'inner-region');
    assert.equal(locationRegion(atlas, 'unassigned'), undefined);
    assert.deepEqual(searchMapScope(scope, '旅舍', 'all').map(place => place.key), ['harbor-9']);
    assert.ok(!scope.locations.some(place => ['inner-region', 'inner-place', 'other-place', 'unassigned'].includes(place.key)));
    assert.equal(projectAtlas(atlas, scope).unlocated.find(item => item.location.key === 'room').reason, 'mapping_unknown');
    const world = mapBrowseScope(atlas, null);
    assert.equal(world.locations.length, 4);
    assert.equal(world.frame, 'atlas');
    assert.equal(locationInScope(atlas, 'inner-place', world.locations), 'inner-region');
});

test('connectivity without geometry never fabricates routes or ancestor endpoints', () => {
    const { atlas } = mapBrowseFixture();
    atlas.locations.push({ key: 'other-place', name: '山间旅舍', scale: 'building', status: 'mentioned', parent: 'mountains' });
    atlas.links.push({ id: 'mountain-road', from: 'harbor-0', to: 'other-place', kind: 'road', bidirectional: false });
    const local = projectAtlas(atlas, mapBrowseScope(atlas, 'harbor'));
    assert.deepEqual(local.routes, []);
    const world = projectAtlas(atlas, mapBrowseScope(atlas, null));
    assert.deepEqual(world.routes, []);
});

test('adding a nested region preserves authored outer-region coordinates', () => {
    const { atlas } = mapBrowseFixture();
    const before = projectAtlas(atlas, mapBrowseScope(atlas, null));
    atlas.locations.push({ key: 'inner', name: 'Inner', parent: 'harbor', scale: 'region', status: 'mentioned', position: { frame: mapFrameId('harbor'), at: [80, 100] } });
    const after = projectAtlas(atlas, mapBrowseScope(atlas, null));
    for (const original of before.nodes) {
        const node = after.nodes.find(item => item.location.key === original.location.key);
        assert.deepEqual([node.x, node.y], [original.x, original.y]);
    }
    assert.equal(after.unlocated.find(item => item.location.key === 'inner').reason, 'mapping_unknown');
});

test('visits to scenes determine containing-region visits without rewriting saved records', () => {
    const { atlas } = mapBrowseFixture();
    atlas.locations.find(item => item.key === 'harbor').status = 'mentioned';
    const saved = structuredClone(atlas);
    let world = mapBrowseScope(atlas, null);
    assert.equal(world.unvisited, 2);
    assert.equal(world.locations.find(item => item.key === 'harbor').status, 'visited');
    assert.deepEqual(searchMapScope(world, '', 'visited').map(item => item.key), ['harbor']);
    assert.deepEqual(atlas, saved);
    atlas.actors = [];
    world = mapBrowseScope(atlas, null);
    assert.equal(world.unvisited, 2);
    assert.deepEqual(searchMapScope(world, '', 'unvisited').map(item => item.key), ['mountains', 'islands']);
});
