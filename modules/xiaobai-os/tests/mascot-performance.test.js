import test from 'node:test';
import assert from 'node:assert/strict';
import { Group, Vector3 } from 'three';
import { createMascotPerformer } from '../brand/mascot/performance.ts';

test('Xiaobai pauses, runs with a box, then returns to the same resting pose', () => {
    const mascot = new Group();
    const carried = new Group();
    const home = new Vector3(-3.05, .52, 3.55);
    mascot.position.copy(home);
    const performer = createMascotPerformer(mascot, home);

    performer.carry(0, 3.6, carried);
    assert.equal(carried.visible, false);
    assert.equal(mascot.position.x, home.x);

    performer.carry(.3, 3.6, carried);
    assert.equal(carried.visible, true);
    assert.ok(mascot.position.x > home.x);
    assert.ok(mascot.position.y > home.y);

    performer.carry(1, 3.6, carried);
    assert.equal(carried.visible, false);
    performer.rest(carried);
    assert.deepEqual(mascot.position.toArray(), home.toArray());
    assert.equal(mascot.rotation.y, 0);
});
