import assert from 'node:assert/strict';
import test from 'node:test';
import { parseHTML } from 'linkedom';
import { Group, Mesh, OrthographicCamera, Vector3 } from 'three';
import { createControls } from '../apps/game/expedition/controls.ts';
import { CAMERA_EIGHTH_TURNS } from '../apps/game/expedition/visuals.ts';
import { createBattle as initializeBattle, tickBattle } from '../apps/game/expedition/combat.ts';
import { createSceneKit } from '../apps/game/expedition/scene-kit.ts';
import { buildWorld } from '../apps/game/expedition/scene-world.ts';
import { createHero } from '../apps/game/expedition/scene-actors.ts';
import { createWardShell } from '../apps/game/expedition/scene-defense.ts';

import { REGIONS, WEAPON_LIST } from '../apps/game/expedition/content.ts';
import { OUTFIT_IDS } from '../apps/game/expedition/ids.ts';
const createBattle = (seed, zone, elite, boss, hp, gear) => initializeBattle({ seed, zone, chapter: zone % 3, elite, boss, hp, bossKind: REGIONS[zone].bosses[0], encounter: 'skirmish' }, gear);

function withControls(run) {
    const { window } = parseHTML('<main tabindex="0"><button></button></main>');
    const previousWindow = globalThis.window, previousElement = globalThis.HTMLElement;
    globalThis.window = window; globalThis.HTMLElement = window.HTMLElement;
    const host = window.document.querySelector('main'); let pauses = 0;
    const controls = createControls(host, () => pauses++, () => {});
    function key(code, target = host) { const event = new window.Event('keydown', { bubbles: true, cancelable: true }); event.code = code; target.dispatchEvent(event); return event; }
    try { run({ controls, key, host, window, pauses: () => pauses }); }
    finally { controls.dispose(); globalThis.window = previousWindow; globalThis.HTMLElement = previousElement; }
}

test('keyboard and touch move towards the requested screen direction under the battle camera', () => {
    withControls(({ controls, key }) => {
        const bearing = CAMERA_EIGHTH_TURNS * Math.PI / 4, camera = new OrthographicCamera(-12, 12, 12, -12, .1, 180);
        camera.position.set(Math.sin(bearing) * 25, 28, Math.cos(bearing) * 25); camera.lookAt(0, 0, 0); camera.updateMatrixWorld();
        const loadout = { weapon: 'blade', relics: [], oaths: [] };
        for (const [code, x, y] of [['KeyW', 0, -1], ['KeyD', 1, 0], ['KeyS', 0, 1], ['KeyA', -1, 0]]) {
            controls.clear(); key(code); const keyboard = controls.frame(); controls.clear(); controls.stick(x, y);
            assert.deepEqual(controls.frame(), keyboard);
            const b = createBattle(1, 0, false, false, 100, loadout), before = new Vector3(b.player.x, 0, b.player.y).project(camera);
            tickBattle(b, keyboard, loadout); const after = new Vector3(b.player.x, 0, b.player.y).project(camera).sub(before);
            if (x) { assert.ok(after.x * x > 0); assert.ok(Math.abs(after.y) < .00001); }
            else { assert.ok(after.y * -y > 0); assert.ok(Math.abs(after.x) < .00001); }
        }
    });
});

test('focus loss clears movement/actions and Space does not hijack a focused action button', () => {
    withControls(({ controls, key, host, window, pauses }) => {
        key('KeyW'); controls.dash(); controls.skill(); window.dispatchEvent(new window.Event('blur'));
        assert.equal(pauses(), 1); assert.deepEqual(controls.frame(), { move: 0, dash: false, skill: false });
        const event = key('Space', host.querySelector('button'));
        assert.equal(event.defaultPrevented, false); assert.equal(controls.frame().dash, false);
        key('Space'); assert.equal(controls.frame().dash, true); assert.equal(controls.frame().dash, false);
    });
});

// Real Three.js geometry boundary: type checks cannot catch incompatible indexed attributes.
test('every region builds valid camp, ordinary and boss geometry without changing combat state', () => {
    const kit = createSceneKit(), root = new Group();
    try {
        for (let zone = 0; zone < REGIONS.length; zone++) {
            for (const boss of [null, false, true]) {
                const battle = boss === null ? null : createBattle(7, zone, false, boss, 100, { weapon: 'blade', relics: [], oaths: [] });
                const before = structuredClone(battle), dispose = buildWorld(kit, root, zone, battle);
                assert.deepEqual(battle, before); assert.ok(root.children.length > 0);
                root.traverse(object => {
                    if (!(object instanceof Mesh)) return;
                    object.geometry.computeBoundingBox(); const bounds = object.geometry.boundingBox;
                    assert.ok([...bounds.min, ...bounds.max].every(Number.isFinite));
                });
                dispose(); assert.equal(root.children.length, 0);
            }
        }
    } finally { kit.dispose(); }
});

test('equipped defense and casting poses remain finite across outfit changes, and the ward owns its material lifetime', () => {
    const kit = createSceneKit(), root = new Group(), hero = createHero(kit, root), wardRoot = new Group();
    const ward = createWardShell(kit, wardRoot), b = createBattle(7, 0, false, false, 100, { weapon: 'blade', relics: [], oaths: [] });
    try {
        b.player.ward = 20;
        const before = structuredClone(b);
        for (const outfit of OUTFIT_IDS) for (const weapon of WEAPON_LIST) {
            for (const reduced of [false, true]) {
                for (let tick = 0; tick < 12; tick++) {
                    hero.update({ ...b.player, facing: tick < 6 ? 3.1 : -3.1, shield: tick < 6 ? 5 : 0, guard: 0, resonance: 50 }, weapon, outfit, tick, reduced, false, tick < 6);
                }
            }
        }
        root.updateMatrixWorld(true);
        root.traverse(object => {
            assert.ok(object.matrixWorld.elements.every(Number.isFinite));
            if (!(object instanceof Mesh)) return;
            object.geometry.computeBoundingBox();
            assert.ok([...object.geometry.boundingBox.min, ...object.geometry.boundingBox.max].every(Number.isFinite));
        });
        ward.update(b.player, .5); assert.equal(wardRoot.children[0].visible, true);
        const shell = wardRoot.children[0].children[0]; let disposed = false;
        shell.material.addEventListener('dispose', () => disposed = true);
        ward.update(null, 0); assert.equal(wardRoot.children[0].visible, false);
        ward.dispose(); assert.equal(disposed, true); assert.equal(wardRoot.children.length, 0);
        assert.deepEqual(b, before);
    } finally { ward.dispose(); kit.dispose(); }
});
