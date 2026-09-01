import assert from 'node:assert/strict';
import test from 'node:test';

import {
    elementPresentation,
    layoutMapAtlas,
    sceneElementPath,
} from '../apps/map/ui/map-presentation.js';

function atlas(locations, links) {
    return {
        locations,
        links,
        actors: [],
    };
}

test('Atlas layout is deterministic across source collection order and preserves hierarchy depth', () => {
    const locations = [
        { key: 'room-b', name: 'Beta', scale: 'room', status: 'visited', parent: 'house', sceneKey: 'beta' },
        { key: 'town', name: 'Town', scale: 'city', status: 'visited' },
        { key: 'house', name: 'House', scale: 'building', status: 'visited', parent: 'town' },
        { key: 'room-a', name: 'Alpha', scale: 'room', status: 'mentioned', parent: 'house', sceneKey: 'alpha' },
    ];
    const links = [
        { id: 'hallway', from: 'room-b', to: 'room-a', kind: 'passage', bidirectional: true },
        { id: 'front-door', from: 'house', to: 'room-a', kind: 'door', bidirectional: true },
    ];

    const ordered = layoutMapAtlas(atlas(locations, links));
    const reversed = layoutMapAtlas(atlas([...locations].reverse(), [...links].reverse()));

    assert.deepEqual(reversed, ordered);
    assert.equal(ordered.nodes.find(node => node.key === 'town').depth, 0);
    assert.equal(ordered.nodes.find(node => node.key === 'house').depth, 1);
    assert.equal(ordered.nodes.find(node => node.key === 'room-a').depth, 2);
    assert.equal(ordered.hierarchy.length, 3);
    assert.deepEqual(ordered.routes.map(route => route.id), ['front-door', 'hallway']);
});

test('Scene paths close area semantics while routes remain open and curves stay smooth', () => {
    const geometry = { points: [[0, 0], [20, 0], [20, 20]] };
    const terrain = { id: 'yard', category: 'terrain', shape: 'path', geometry };
    const road = { id: 'road', category: 'road', shape: 'path', geometry };
    const river = { id: 'river', category: 'water', shape: 'curve', geometry };

    assert.equal(sceneElementPath(terrain), 'M 0 0 L 20 0 L 20 20 Z');
    assert.equal(sceneElementPath(road), 'M 0 0 L 20 0 L 20 20');
    assert.match(sceneElementPath(river), /^M 0 0 C .+ Z$/);
});

test('Element presentation resolves closed semantic recipes without accepting arbitrary styling', () => {
    const presentation = elementPresentation({
        id: 'exit',
        category: 'door',
        shape: 'icon',
        geometry: { x: 12, y: 8 },
        kind: 'door',
        material: 'wood',
        certainty: 'inferred',
    }, 'scene-one');

    assert.equal(presentation.icon, 'door_open');
    assert.equal(presentation.fallback, 'D');
    assert.equal(presentation.fill, 'none');
    assert.equal(presentation.dash, '8 6');
    assert.equal(presentation.opacity, 0.72);
});
