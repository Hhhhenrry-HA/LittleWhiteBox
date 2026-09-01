import assert from 'node:assert/strict';
import test from 'node:test';

import {
    MAP_DOMAIN_SCHEMA_VERSION,
    MAX_MAP_BYTES,
    MAX_SCENE_ELEMENTS,
    parseMapDomain,
    validateMapDomain,
} from '../domains/map/invariants.js';
import { applyMapDomainEdits } from '../domains/map/edit.js';
import { buildMapPromptBlock, MAX_MAP_PROMPT_CHARS } from '../domains/map/projection.js';
import { createEmptyMapDomain, readMapDomain } from '../domains/map/state.js';

function location(key, fields = {}) {
    return { key, name: key, scale: 'room', status: 'visited', ...fields };
}

function scene(key, elements = []) {
    return { key, name: key, status: 'active', viewBox: [0, 0, 100, 80], elements };
}

function validDomain() {
    return {
        schemaVersion: MAP_DOMAIN_SCHEMA_VERSION,
        revision: 3,
        atlas: {
            locations: [
                location('inn', { scale: 'building' }),
                location('hall', { parent: 'inn', sceneKey: 'hall-scene', brief: 'The public hall.' }),
                location('street', { scale: 'outdoor' }),
            ],
            links: [{ id: 'front-door', from: 'hall', to: 'street', kind: 'door', bidirectional: true }],
            actors: [
                { actorKey: 'player', displayName: 'Player', locationKey: 'hall' },
                { actorKey: 'keeper', displayName: 'Keeper', locationKey: 'hall' },
            ],
        },
        scenes: {
            'hall-scene': scene('hall-scene', [
                {
                    id: 'player-icon', category: 'actor', shape: 'icon', geometry: { x: 10, y: 20 },
                    kind: 'player', actorKey: 'player', certainty: 'confirmed',
                },
                {
                    id: 'counter', category: 'furniture', shape: 'rect',
                    geometry: { x: 30, y: 20, width: 20, height: 8 }, icon: 'counter', material: 'wood',
                    label: 'Counter', certainty: 'confirmed',
                },
                {
                    id: 'exit', category: 'door', shape: 'icon', geometry: { x: 50, y: 0 },
                    kind: 'door', label: 'Street door', certainty: 'confirmed',
                },
            ]),
        },
    };
}

test('empty state and root reads return isolated validated values', () => {
    const empty = createEmptyMapDomain();
    assert.deepEqual(empty, {
        schemaVersion: 1,
        revision: 0,
        atlas: { locations: [], links: [], actors: [] },
        scenes: {},
    });
    assert.doesNotThrow(() => validateMapDomain(empty));
    assert.equal(readMapDomain({ schemaVersion: 2, domains: {} }), null);

    const root = { schemaVersion: 2, domains: { map: validDomain() } };
    const read = readMapDomain(root);
    read.atlas.locations[0].name = 'changed clone';
    assert.equal(root.domains.map.atlas.locations[0].name, 'inn');
});

test('strict invariants reject unknown fields, cycles, dangling refs, duplicate actors and invalid geometry', () => {
    const cases = [];
    const styled = validDomain();
    styled.scenes['hall-scene'].elements[0].style = 'fill:url(https://invalid.example)';
    cases.push(styled);

    const cycle = validDomain();
    cycle.atlas.locations[0].parent = 'hall';
    cases.push(cycle);

    const dangling = validDomain();
    dangling.atlas.links[0].to = 'missing';
    cases.push(dangling);

    const duplicatePlayer = validDomain();
    duplicatePlayer.atlas.actors.push({ actorKey: 'player', displayName: 'Other', locationKey: 'street' });
    cases.push(duplicatePlayer);

    const wrongGeometry = validDomain();
    wrongGeometry.scenes['hall-scene'].elements[1].geometry = { x: 1, y: 2, radius: 3 };
    cases.push(wrongGeometry);

    const wrongActorScene = validDomain();
    wrongActorScene.atlas.actors[0].locationKey = 'street';
    cases.push(wrongActorScene);

    const removedAliases = validDomain();
    removedAliases.atlas.locations[0].aliases = ['old-name'];
    cases.push(removedAliases);

    for (const value of cases) {
        assert.throws(() => validateMapDomain(value), error => error.code === 'map_invalid_domain');
    }
});

test('scene and serialized collection bounds reject the whole candidate', () => {
    const domain = validDomain();
    const template = domain.scenes['hall-scene'].elements[1];
    domain.scenes['hall-scene'].elements = Array.from({ length: MAX_SCENE_ELEMENTS + 1 }, (_, index) => ({
        ...structuredClone(template),
        id: `element-${index}`,
    }));
    assert.throws(() => validateMapDomain(domain), error => error.code === 'map_collection_limit');

    const oversized = createEmptyMapDomain();
    oversized.atlas.locations = Array.from({ length: 512 }, (_, index) => location(`place-${index}`, {
        brief: 'x'.repeat(500),
    }));
    oversized.atlas.links = Array.from({ length: 1_024 }, (_, index) => ({
        id: `route-${index}`,
        from: `place-${index % 512}`,
        to: `place-${(index + 1) % 512}`,
        kind: 'road',
        label: 'x'.repeat(160),
        bidirectional: true,
    }));
    assert.ok(new TextEncoder().encode(JSON.stringify(oversized)).byteLength > MAX_MAP_BYTES);
    assert.throws(() => validateMapDomain(oversized), error => error.code === 'map_size_limit');
});

test('canonical domain edits remain atomic and advance revision once', () => {
    const original = validDomain();
    const changed = applyMapDomainEdits(original, [
        {
            op: 'upsert-location',
            location: { ...location('cellar', { parent: 'inn', sceneKey: 'cellar-scene' }), name: 'Cellar' },
        },
        {
            op: 'initialize-scene',
            scene: { key: 'cellar-scene', name: 'Cellar', status: 'active', viewBox: [0, 0, 40, 30] },
        },
        {
            op: 'upsert-element',
            sceneKey: 'cellar-scene',
            element: {
                id: 'crate', category: 'furniture', shape: 'rect',
                geometry: { x: 2, y: 3, width: 8, height: 6 },
                kind: 'chest', material: 'wood', label: 'Crate', certainty: 'confirmed',
            },
        },
    ]);

    assert.equal(changed.revision, original.revision + 1);
    assert.equal(changed.atlas.locations.at(-1).name, 'Cellar');
    assert.deepEqual(changed.scenes['cellar-scene'].viewBox, [0, 0, 40, 30]);
    assert.deepEqual(changed.scenes['cellar-scene'].elements[0].geometry, { x: 2, y: 3, width: 8, height: 6 });
    assert.equal(original.atlas.locations.some(entry => entry.key === 'cellar'), false);

    const noOp = applyMapDomainEdits(changed, []);
    assert.notEqual(noOp, changed);
    assert.deepEqual(noOp, changed);
    assert.equal(noOp.revision, changed.revision);

    const snapshot = structuredClone(changed);
    assert.throws(() => applyMapDomainEdits(changed, [{ op: 'remove-location', locationKey: 'hall' }]), error => (
        error.code === 'map_invalid_domain'
    ));
    assert.deepEqual(changed, snapshot);
});

test('canonical player position keeps the actual location visited', () => {
    const domain = validDomain();
    const keptVisited = applyMapDomainEdits(domain, [{
        op: 'upsert-location',
        location: { ...domain.atlas.locations.find(entry => entry.key === 'hall'), status: 'mentioned' },
    }]);
    assert.equal(keptVisited.atlas.locations.find(entry => entry.key === 'hall').status, 'visited');

    const moved = applyMapDomainEdits(keptVisited, [
        {
            op: 'upsert-location',
            location: { ...keptVisited.atlas.locations.find(entry => entry.key === 'street'), status: 'mentioned' },
        },
        { op: 'remove-element', sceneKey: 'hall-scene', elementId: 'player-icon' },
        { op: 'set-actor-position', position: { actorKey: 'player', displayName: 'Player', locationKey: 'street' } },
    ]);
    assert.equal(moved.atlas.locations.find(entry => entry.key === 'street').status, 'visited');
});

test('dependent removals can be ordered freely when their final state is valid', () => {
    const domain = validDomain();
    const removed = applyMapDomainEdits(domain, [
        { op: 'remove-location', locationKey: 'hall' },
        { op: 'remove-scene', sceneKey: 'hall-scene' },
        { op: 'remove-link', linkId: 'front-door' },
        { op: 'remove-actor-position', actorKey: 'player' },
        { op: 'remove-actor-position', actorKey: 'keeper' },
    ]);
    assert.equal(removed.revision, domain.revision + 1);
    assert.equal(removed.atlas.locations.some(entry => entry.key === 'hall'), false);
    assert.equal(Object.hasOwn(removed.scenes, 'hall-scene'), false);
    assert.doesNotThrow(() => parseMapDomain(removed));
});

test('prompt projection is local, confirmed-only, escaped, and bounded', () => {
    const domain = validDomain();
    domain.atlas.locations[1].name = 'Hall <unsafe> {{macro}}';
    domain.atlas.actors[1].displayName = 'Keeper & "friend"';
    domain.scenes['hall-scene'].elements.push({
        id: 'rumor', category: 'marker', shape: 'icon', geometry: { x: 1, y: 1 },
        kind: 'trap', label: 'Secret rumor', certainty: 'unknown',
    });
    const prompt = buildMapPromptBlock(domain);

    assert.match(prompt, /<current /);
    assert.match(prompt, /<parent /);
    assert.match(prompt, /<adjacent /);
    assert.match(prompt, /Keeper &amp; &quot;friend&quot;/);
    assert.match(prompt, /Hall &lt;unsafe&gt; &#123;&#123;macro&#125;&#125;/);
    assert.match(prompt, /<exit /);
    assert.match(prompt, /<anchor /);
    assert.doesNotMatch(prompt, /Secret rumor|<unsafe>|\{\{macro\}\}/);
    assert.ok(prompt.length <= MAX_MAP_PROMPT_CHARS);

    const noPlayer = validDomain();
    noPlayer.atlas.actors = noPlayer.atlas.actors.filter(actor => actor.actorKey !== 'player');
    noPlayer.scenes['hall-scene'].elements = noPlayer.scenes['hall-scene'].elements.filter(element => (
        element.actorKey !== 'player'
    ));
    assert.equal(buildMapPromptBlock(noPlayer), '');
    assert.equal(buildMapPromptBlock({ malformed: true }), '');
});
