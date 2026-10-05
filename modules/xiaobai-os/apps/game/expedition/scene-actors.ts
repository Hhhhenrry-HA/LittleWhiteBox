import { Mesh, type Group, type Material } from 'three';
import { createMascot } from '../../../brand/mascot/model.js';
import { createMascotFighter } from '../../../brand/mascot/performance.js';
import { ENEMIES, isBoss } from './content.js';
import type { Enemy, EnemyKind, Player, Weapon } from './types.js';
import type { SceneKit } from './scene-kit.js';
import { CLOAK_COLORS, type Palette } from './visuals.js';

function addBow(k: SceneKit, parent: Group, scale = 1) {
    const bow = k.group(parent); bow.scale.setScalar(scale);
    k.shape(bow, [[.02, -.44], [.11, -.41], [.27, -.2], [.29, .12], [.18, .42], [.04, .51], [.1, .28], [.14, 0], [.08, -.25]], '#ceac6e', [0, 0, .06]);
    k.mesh(bow, 'box', '#f5f3dc', [.012, .94, .015], [.04, .03, .07]);
    k.mesh(bow, 'box', '#705444', [.09, .18, .09], [.12, 0, .06]);
}

export function createHero(k: SceneKit, parent: Group) {
    const root = k.group(parent), body = createMascot({ group: k.group, ball(p, s, c, at) { return k.mesh(p, 'sphere', c, s, at); } }, root, [0, .78, 0]);
    body.scale.setScalar(2.1);
    const fighter = createMascotFighter(body);
    const shadow = k.ring(root, '#193f49', .6, 0, 0, .14, true);
    const equipment = k.group(body), hand = k.group(equipment, [.3, .05, .17]), cape = k.group(equipment, [0, .2, -.21]);
    const scarf = k.mesh(equipment, 'torus', CLOAK_COLORS[0], [.24, .18, .23], [0, -.04, 0]); scarf.rotation.x = Math.PI / 2;
    let weapon: Weapon | null = null, cloak = -1, lastX = 0, lastY = 0;
    function equip(nextWeapon: Weapon, nextCloak: number) {
        if (nextWeapon === weapon && nextCloak === cloak) { return; }
        weapon = nextWeapon; cloak = nextCloak; cape.clear(); hand.clear(); scarf.material = k.material(CLOAK_COLORS[cloak]);
        k.shape(cape, [[-.23, 0], [.23, 0], [.37, -.5], [.12, -.62], [-.35, -.52]], CLOAK_COLORS[cloak]);
        k.shape(cape, [[-.04, -.06], [.04, -.06], [.05, -.49], [0, -.55], [-.05, -.49]], '#e6c88f', [0, 0, -.009]);
        k.mesh(hand, 'sphere', '#fffaf2', [.1, .1, .09]);
        if (weapon === 'blade') {
            k.mesh(hand, 'cylinder', '#624d42', [.035, .28, .035], [0, -.08, .06]);
            k.mesh(hand, 'box', '#d4b470', [.32, .05, .11], [0, .07, .06], false, 1, true);
            k.shape(hand, [[-.07, .1], [.07, .1], [.07, .65], [0, .83], [-.07, .65]], '#f5f8ef', [0, 0, .07]);
            k.shape(hand, [[0, .1], [.07, .1], [.07, .65], [0, .83]], '#9cc6ce', [0, 0, .076]);
        } else if (weapon === 'bow') {
            addBow(k, hand);
        } else {
            k.mesh(hand, 'cylinder', '#796889', [.035, 1.12, .035], [0, .18, .04]);
            k.mesh(hand, 'torus', '#d8bc80', [.19, .24, .18], [0, .85, .04], false, 1, true);
            k.mesh(hand, 'rock', '#b9ecff', [.11, .18, .1], [0, .85, .04]);
        }
    }
    return { root,
        update(p: Player | null, nextWeapon: Weapon, nextCloak: number, time: number, reduced: boolean, portrait: boolean) {
            equip(nextWeapon, nextCloak);
            const moving = !!p && (Math.abs(p.x - lastX) + Math.abs(p.y - lastY) > .001), dash = !!p?.dashTime;
            root.position.set(p?.x ?? 0, portrait ? .3 : 0, p?.y ?? -8);
            root.scale.setScalar(portrait ? 1.65 : 1);
            fighter.pose(0, 0, portrait ? Math.PI / 2 + .23 : p?.facing ?? Math.PI / 2, time, moving, dash, reduced);
            body.position.y += .3;
            cape.rotation.x = !reduced ? -.15 - (moving ? .5 : .06) - Math.sin(time * .15) * .12 : -.15;
            hand.rotation.z = p?.swing && !reduced ? -1.7 * Math.sin(p.swing / 9 * Math.PI) + .3 : -.2;
            hand.rotation.x = p?.swing && !reduced ? .8 : .1;
            shadow.scale.set(.6 + (dash ? .25 : 0), .6, 1);
            if (p) { lastX = p.x; lastY = p.y; }
        },
    };
}

/** Each enemy has a recognisable silhouette and articulated anticipation, independent of its collision body. */
export function createEnemyActor(k: SceneKit, parent: Group, kind: EnemyKind, c: Palette) {
    const { mesh, group } = k, root = group(parent), body = group(root), weapon = group(body), head = group(body), limbs: Group[] = [];
    const boss = isBoss(kind), radius = ENEMIES[kind].radius;
    k.ring(root, '#1d3540', radius * 1.15, 0, 0, .16, true);
    const gold = '#cfad70', eye = '#fff0b0', armor = c.dark;
    function leg(x: number, z: number, height: number) {
        const g = group(body, [x, height, z]); mesh(g, 'box', armor, [.32, height, .42], [0, -height / 2, 0]);
        mesh(g, 'box', c.stone, [.38, .22, .55], [0, -height + .11, .1]); limbs.push(g);
    }
    function sword(parent: Group, length: number, color = '#d9e8df') {
        mesh(parent, 'box', gold, [.55, .1, .24], [0, .25, 0], false, 1, true);
        mesh(parent, 'box', armor, [.11, .4, .11]);
        mesh(parent, 'box', color, [.2, length, .13], [0, length / 2 + .35, 0], false, 1, true);
        mesh(parent, 'cone', color, [.15, .4, .13], [0, length + .5, 0]);
    }
    if (kind === 'charger') {
        mesh(body, 'rock', c.stone, [.58, .58, .9], [0, .7, 0]);
        mesh(head, 'rock', armor, [.43, .45, .46], [0, .73, .7]);
        for (const x of [-.27, .27]) {
            const horn = mesh(head, 'cone', gold, [.15, .7, .15], [x, 1.15, .9]); horn.rotation.x = .55;
            mesh(head, 'sphere', eye, [.05, .04, .06], [x, .82, 1.02], true);
            leg(x, -.42, .45); leg(x, .45, .45);
        }
        for (let i = 0; i < 3; i++) { mesh(body, 'cone', c.accent, [.2, .45, .25], [0, 1.25, -.5 + i * .4]); }
    } else if (kind === 'weaver') {
        mesh(body, 'cone', '#63689d', [1.45, 3, 1.2], [0, 2.1, 0]);
        mesh(body, 'cone', c.light, [.8, 1.8, .65], [0, 2.65, .3]);
        mesh(head, 'sphere', armor, [.6, .72, .45], [0, 4, 0]);
        const moon = mesh(head, 'crescent', gold, [1.35, 1.35, .8], [0, 4.35, -.3], false, 1, true); moon.rotation.z = .87;
        for (const x of [-.23, .23]) { mesh(head, 'sphere', '#e4e3ff', [.09, .055, .05], [x, 4.08, .45], true); }
        for (const side of [-1, 1]) {
            const arm = group(body, [side * .8, 3.3, 0]); arm.rotation.z = side * .65;
            mesh(arm, 'cone', '#757caf', [.5, 1.8, .45], [0, -.65, 0]);
            mesh(arm, 'sphere', c.light, [.22, .25, .22], [0, -1.45, .1]); limbs.push(arm);
        }
        for (let i = 0; i < 5; i++) {
            const t = i / 5 * Math.PI * 2;
            const star = mesh(weapon, 'rock', c.accent, [.2, .34, .2], [Math.cos(t) * 1.95, 3.3 + Math.sin(t) * 1.1, -.3]); star.rotation.z = t;
        }
    } else if (kind === 'king') {
        leg(-.5, 0, .8); leg(.5, 0, .8);
        mesh(body, 'cone', '#7c4550', [1.8, 3.6, .8], [0, 2, -.3]);
        mesh(body, 'box', armor, [1.6, 1.7, 1], [0, 2.1, 0]);
        mesh(body, 'rock', gold, [.5, .9, .3], [0, 2.25, .62]);
        for (const side of [-1, 1]) { mesh(body, 'rock', c.stone, [.85, .5, .7], [side * .95, 2.95, 0]); }
        mesh(head, 'sphere', armor, [.65, .8, .5], [0, 3.6, 0]);
        mesh(head, 'box', eye, [.48, .08, .09], [0, 3.7, .51], true);
        mesh(head, 'torus', gold, [.86, .86, .86], [0, 4.6, 0], false, 1, true).rotation.x = Math.PI / 2;
        for (let i = 0; i < 7; i++) { const t = i * Math.PI * 2 / 7; mesh(head, 'cone', gold, [.17, .85, .17], [Math.cos(t) * .78, 4.85, Math.sin(t) * .78]); }
        weapon.position.set(1.55, 1.35, .2); weapon.rotation.z = -.3; sword(weapon, 3.4, '#f6dc9f');
        mesh(body, 'box', c.stone, [.5, 1.2, .5], [-1.15, 2, .1]);
    } else if (kind === 'warden') {
        leg(-.65, .05, .85); leg(.65, .05, .85);
        mesh(body, 'cylinder', armor, [1.1, 1.85, .8], [0, 1.9, 0]);
        mesh(body, 'box', c.stone, [1.1, 1.45, .35], [0, 2, .72]);
        mesh(body, 'rock', c.accent, [.28, .4, .14], [0, 2.1, .94]);
        for (const side of [-1, 1]) {
            mesh(body, 'rock', c.stone, [.83, .6, .7], [side * 1.03, 2.7, 0]);
            mesh(body, 'box', gold, [.7, .1, .8], [side * 1.08, 2.45, .1], false, 1, true);
        }
        mesh(head, 'sphere', c.stone, [.73, .77, .63], [0, 3.2, 0]);
        mesh(head, 'box', armor, [1.12, .33, .2], [0, 3.22, .54]);
        mesh(head, 'box', eye, [.74, .095, .05], [0, 3.22, .66], true);
        mesh(head, 'cone', c.foliage, [.27, 1.1, .5], [0, 4, -.2]);
        const shield = group(body, [-1.32, 1.5, .6]);
        mesh(shield, 'box', armor, [1.2, 1.8, .25]); mesh(shield, 'box', gold, [1, 1.58, .28]); mesh(shield, 'box', c.foliage, [.85, 1.42, .31]);
        mesh(shield, 'rock', c.light, [.28, .4, .1], [0, .1, .22]);
        weapon.position.set(1.5, 1.8, .25);
        mesh(weapon, 'cylinder', '#766450', [.1, 2.5, .1]); mesh(weapon, 'box', armor, [1.25, .9, .9], [0, 1.4, 0]);
        mesh(weapon, 'box', gold, [.24, .96, .94], [0, 1.4, 0], false, 1, true);
        mesh(weapon, 'box', c.light, [.22, .77, .74], [.65, 1.4, 0]);
    } else {
        const priest = kind === 'priest', guard = kind === 'guard';
        if (priest) { mesh(body, 'cone', '#767da5', [.55, 1.5, .5], [0, .95, 0]); }
        else { leg(-.22, 0, .5); leg(.22, 0, .5); mesh(body, 'box', armor, [.72, .85, .52], [0, .92, 0]); }
        mesh(body, 'box', c.stone, [.5, .55, .15], [0, 1, .3]);
        mesh(head, 'sphere', c.stone, [.43, .45, .38], [0, 1.63, 0]);
        mesh(head, 'box', armor, [.68, .17, .12], [0, 1.65, .32]); mesh(head, 'box', eye, [.39, .045, .05], [0, 1.65, .39], true);
        if (priest) {
            mesh(head, 'cone', '#626a9c', [.55, .8, .5], [0, 2.14, 0]);
            weapon.position.set(.52, 1, .1); mesh(weapon, 'cylinder', gold, [.04, 1.6, .04]);
            mesh(weapon, 'rock', '#d1dcff', [.22, .32, .22], [0, .95, 0]);
        } else {
            mesh(head, 'box', c.foliage, [.12, .38, .55], [0, 2, -.07]);
            for (const side of [-1, 1]) { mesh(body, 'rock', c.stone, [.28, .23, .3], [side * .45, 1.22, 0]); }
            weapon.position.set(.54, 1, .2);
            if (kind === 'archer') { addBow(k, weapon, 1.3); }
            else { weapon.rotation.z = -.3; sword(weapon, .75); }
            if (guard) { mesh(body, 'box', gold, [.85, 1.1, .18], [-.4, .95, .46]); mesh(body, 'box', c.foliage, [.72, .92, .22], [-.4, .95, .47]); }
        }
    }
    const bar = group(root, [0, boss ? 5.5 : kind === 'charger' ? 1.7 : 2.45, 0]);
    mesh(bar, 'box', '#233f48', [1.06, .105, .02], [0, 0, 0], true);
    const fill = mesh(bar, 'box', '#f0ba83', [1, .055, .03], [0, 0, .02], true);
    const originals: { mesh: Mesh; material: Material | Material[] }[] = [];
    body.traverse(o => { if (o instanceof Mesh) { originals.push({ mesh: o, material: o.material }); } });
    let previousWindup = 0, struckAt = -100, previousX = 0, previousY = 0;
    const baseWeaponZ = weapon.rotation.z;
    return { root, bar,
        update(e: Enemy, tick: number, reduced: boolean) {
            const moving = Math.abs(e.x - previousX) + Math.abs(e.y - previousY) > .005;
            previousX = e.x; previousY = e.y;
            if (previousWindup && !e.windup) { struckAt = tick; } previousWindup = e.windup;
            const anticipation = e.windup ? 1 - e.windup / ENEMIES[e.kind].windup : 0, strike = Math.max(0, 1 - (tick - struckAt) / 10);
            root.position.set(e.x, 0, e.y); body.rotation.y = Math.PI / 2 - e.angle;
            body.position.y = !reduced ? (kind === 'weaver' || kind === 'priest' ? .13 + Math.sin(tick * .055) * .1 : moving ? Math.abs(Math.sin(tick * .3)) * .055 : 0) : 0;
            body.rotation.x = reduced ? 0 : -anticipation * .16 + strike * .2;
            head.rotation.z = !reduced && kind === 'king' ? Math.sin(tick * .035) * .08 : 0;
            weapon.rotation.x = reduced ? 0 : anticipation * -1.3 + strike * 1.4;
            weapon.rotation.z = baseWeaponZ + (reduced ? 0 : anticipation * -.35);
            for (let i = 0; i < limbs.length; i++) { limbs[i].rotation.x = !reduced && moving ? Math.sin(tick * .32 + i * Math.PI) * .28 : 0; }
            for (const o of originals) { o.mesh.material = e.marked > 2 && !reduced ? k.material('#fff6dd') : o.material; }
            bar.visible = !boss && e.hp < e.maxHp;
            fill.scale.x = e.hp / e.maxHp; fill.position.x = (e.hp / e.maxHp - 1) * .5;
        },
    };
}
