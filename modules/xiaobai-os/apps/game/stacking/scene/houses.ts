import { Group } from 'three';
import { HOUSES, type HouseKind } from '../policy.js';
import { PALETTE as C } from './palette.js';
import type { Resources } from './resources.js';

/** Bottom footprint and pale roof cap remain the rule-owned bearing surfaces. */
export function createHouse(r: Resources, kind: HouseKind, direction: number, index: number, occupied = true) {
    const root = new Group(), body = new Group(); root.add(body); body.scale.x = direction;
    const spec = HOUSES[kind], w = spec.foot / 1000, h = spec.height / 1000;
    const top = spec.top / 1000, offset = spec.offset / 1000, front = 0.572;
    const box = (color: number, size: [number, number, number], position: [number, number, number], finish: 'chalk' | 'enamel' | 'glass' | 'metal' = 'chalk') => r.mesh(body, 'box', color, size, position, finish);
    const wallHeight = kind === 'step' ? h * 0.59 : h - 0.14;
    box(C.milk, [w, wallHeight, 1.12], [0, wallHeight / 2, 0]);
    box(spec.color, [w, 0.1, 1.13], [0, 0.06, 0], 'enamel');
    for (const x of [-w / 2 + 0.065, w / 2 - 0.065]) {
        box(C.porcelain, [0.1, wallHeight - 0.1, 0.08], [x, wallHeight / 2 + 0.03, front]);
    }
    if (kind === 'step') {
        box(C.milk, [top, h - wallHeight - 0.12, 1.12], [offset, (h + wallHeight - 0.12) / 2, 0]);
        box(spec.color, [w, 0.065, 1.15], [0, wallHeight, 0], 'enamel');
    }
    box(spec.color, [top, 0.085, 1.16], [offset, h - 0.13, 0], 'enamel');
    box(C.porcelain, [top, 0.12, 1.2], [offset, h - 0.06, 0]);
    // Flush roof panels never enlarge or hide the usable support interval.
    for (const x of [-0.28, 0.28]) {
        box(C.stone, [Math.min(0.36, top * 0.28), 0.006, 0.75], [offset + x * top, h - 0.004, 0]);
    }
    function window(x: number, y: number, width: number, height: number, z = front) {
        box(spec.color, [width + 0.09, height + 0.09, 0.075], [x, y, z], 'enamel');
        box(C.glass, [width, height, 0.035], [x, y, z + 0.05], 'glass');
        box(C.porcelain, [0.024, height + 0.01, 0.026], [x, y, z + 0.075]);
        box(C.porcelain, [width + 0.025, 0.022, 0.025], [x, y - height * 0.05, z + 0.075]);
        box(C.porcelain, [width + 0.13, 0.048, 0.16], [x, y - height / 2 - 0.065, z + 0.055]);
    }
    if (kind === 'wide') {
        window(-0.51, 0.51, 0.31, 0.37); window(0.51, 0.51, 0.31, 0.37);
        box(C.mint, [0.32, 0.56, 0.06], [0, 0.3, front], 'enamel');
        box(C.glass, [0.2, 0.19, 0.025], [0, 0.44, front + 0.045], 'glass');
        r.mesh(body, 'sphere', C.brass, [0.025, 0.025, 0.025], [0.1, 0.26, front + 0.07], 'metal');
        box(C.porcelain, [0.42, 0.055, 0.24], [0, 0.035, front + 0.05]);
    } else if (kind === 'loft') {
        window(0, 0.68, 0.48, 0.5);
        box(spec.color, [0.72, 0.09, 0.27], [0, 1.01, front + 0.025], 'enamel');
        box(C.timber, [0.5, 0.095, 0.15], [0, 0.34, front + 0.1]);
        for (const x of [-0.17, 0, 0.17]) { r.mesh(body, 'sphere', C.leaves, [0.1, 0.065, 0.085], [x, 0.425, front + 0.1]); }
    } else if (kind === 'balcony') {
        window(-0.17, 0.55, 0.44, 0.41);
        box(spec.color, [0.68, 0.64, 0.99], [0.85, 0.48, 0.005], 'enamel');
        window(0.88, 0.53, 0.35, 0.38, 0.51);
        box(C.porcelain, [0.79, 0.1, 1.12], [0.89, 0.12, 0.04]);
        box(C.brass, [0.73, 0.025, 0.025], [0.89, 0.38, 0.64], 'metal');
        for (const x of [0.58, 0.79, 1, 1.21]) { box(C.porcelain, [0.025, 0.22, 0.025], [x, 0.25, 0.64]); }
        // A solid projecting bay makes the heavy side visually legible.
        box(C.steel, [0.085, 0.12, 0.9], [1.13, 0.075, 0]);
    } else {
        window(-0.34, 0.3, 0.37, 0.27); window(offset, 0.77, 0.39, 0.25);
        box(C.timber, [0.2, 0.26, 0.06], [0.22, 0.15, front], 'enamel');
    }
    if (index % 3 === 1 && kind === 'wide') {
        box(C.brass, [0.65, 0.017, 0.017], [-0.46, 0.82, front + 0.12], 'metal');
        for (const [x, color] of [[-0.62, C.rose], [-0.39, C.mint]]) {
            box(color, [0.16, 0.15, 0.035], [x, 0.735, front + 0.12]);
        }
    }
    const model = r.batch(body);
    const dark = r.material(C.glass, 'glass'), light = r.material(C.windowLight, 'light');
    function lightWindows(value: boolean) { model.replace(value ? dark : light, value ? light : dark); }
    lightWindows(occupied);
    return { root, lightWindows, dispose: model.dispose };
}
export type HouseModel = ReturnType<typeof createHouse>;
