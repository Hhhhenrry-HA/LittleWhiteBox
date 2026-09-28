import { Group } from 'three';
import { HOUSES, type HouseKind } from '../policy.js';
import type { Resources } from './resources.js';
/** The flat cap is the exact rule-owned top interval. Details never extend above it. */
export function createHouse(resources: Resources, kind: HouseKind, direction: number, index: number, occupied = true): Group {
    const root = new Group(), body = new Group(); root.add(body); body.scale.x = direction;
    const spec = HOUSES[kind], w = spec.foot / 1000, h = spec.height / 1000, top = spec.top / 1000, offset = spec.offset / 1000;
    const box = (color: number, size: [number, number, number], position: [number, number, number], glow = false) => resources.mesh(body, 'box', color, size, position, glow);
    box(spec.color, [w, kind === 'step' ? h * 0.64 : h - 0.12, 1.12], [0, kind === 'step' ? h * 0.32 : (h - 0.12) / 2, 0]);
    if (kind === 'step') { box(spec.color, [top, h * 0.4, 1.12], [offset, h * 0.77, 0]); }
    if (kind === 'balcony') {
        box(0xcba7d4, [0.66, 0.7, 0.94], [0.9, 0.48, 0.03]);
        box(occupied ? 0xffe5a4 : 0x8babba, [0.4, 0.37, 0.05], [0.92, 0.52, 0.52], occupied);
        box(0xfff8ec, [0.78, 0.1, 1.04], [0.92, 0.17, 0.03]);
    }
    box(0xfffaf0, [top, 0.12, 1.2], [offset, h - 0.06, 0]);
    // Small repeated lit windows make a full twenty-house tower readable without extra lights.
    for (const x of w > 1.4 ? [-0.45, 0.4] : [-0.24, 0.23]) {
        box(0x879da7, [0.29, 0.36, 0.055], [x, 0.48, 0.579]);
        box(occupied ? 0xffe7ab : 0x8babba, [0.22, 0.29, 0.025], [x, 0.48, 0.615], occupied);
        box(0xfff7eb, [0.028, 0.31, 0.025], [x, 0.48, 0.632]);
    }
    box(0x78999a, [0.2, 0.36, 0.035], [0, 0.2, 0.575]);
    // A tiny resident, and a clothesline on every third facade. Neither is structural.
    if (occupied && index % 2 === 0) {
        const resident = new Group(); body.add(resident); root.userData.resident = resident;
        resources.mesh(resident, 'sphere', 0xffe1c0, [0.065, 0.075, 0.06], [-0.24, 0.46, 0.7]);
        resources.mesh(resident, 'box', 0x8fbdb4, [0.11, 0.1, 0.065], [-0.24, 0.36, 0.7]);
    }
    if (index % 3 === 1) {
        box(0x849da4, [0.62, 0.018, 0.018], [0, 0.72, 0.71]);
        [-0.17, 0.08].forEach((x, i) => box(i ? 0xfcf5dd : 0xe8aaa3, [0.14, 0.18, 0.03], [x, 0.63, 0.71]));
    }
    return root;
}
