import assert from 'node:assert/strict';
import test from 'node:test';

import {
    elementPresentation,
} from '../apps/map/ui/map-presentation.js';
import { sceneElementPath } from '../apps/map/ui/scene-geometry.js';

import { connectedPlaces } from '../apps/map/ui/world-map.js';

test('connection details preserve direction even without map positions', () => {
    const atlas = { locations: [{ key: 'a' }, { key: 'b' }], links: [{ id: 'route', from: 'a', to: 'b', kind: 'path', bidirectional: false }], actors: [] };
    assert.equal(connectedPlaces(atlas, 'a')[0].outgoing, true);
    assert.equal(connectedPlaces(atlas, 'b')[0].outgoing, false);
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
