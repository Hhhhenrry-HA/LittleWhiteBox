import assert from 'node:assert/strict';
import test from 'node:test';
import { Box3 } from 'three';
import { HOUSES, HOUSE_KINDS } from '../apps/game/stacking/policy.ts';
import { createResources } from '../apps/game/stacking/scene/resources.ts';
import { createHouse } from '../apps/game/stacking/scene/houses.ts';
import { createCompanion } from '../apps/game/stacking/scene/companion.ts';

test('refined houses keep their rule-owned height and bottom plane in both orientations', () => {
    const resources = createResources();
    try {
        for (const kind of HOUSE_KINDS) {
            for (const direction of [1, -1]) {
                const model = createHouse(resources, kind, direction, 1, false);
                const before = new Box3().setFromObject(model.root);
                assert.ok(Math.abs(before.min.y) < 0.00001);
                assert.ok(Math.abs(before.max.y - HOUSES[kind].height / 1000) < 0.00001);
                model.lightWindows(true);
                assert.ok(new Box3().setFromObject(model.root).equals(before));
                // Batching keeps facade detail from multiplying mobile draw calls.
                let meshes = 0; model.root.traverse(object => { if (object.isMesh) { meshes++; } });
                assert.ok(meshes <= 12);
                model.dispose();
            }
        }
    } finally { resources.dispose(); }
});

test('the operator and platform stay above the rail in every reaction, outside the cargo envelope', () => {
    const resources = createResources(), companion = createCompanion(resources);
    try {
        for (const reaction of ['watch', 'careful', 'happy', 'sad']) {
            for (const progress of [0, 0.5, 1]) {
                companion.update(reaction, progress, -3, 0, true);
                // Every cargo hangs below the rail, regardless of house width, direction or travel position.
                assert.ok(new Box3().setFromObject(companion.root).min.y > 0);
            }
        }
    } finally { companion.dispose(); resources.dispose(); }
});
