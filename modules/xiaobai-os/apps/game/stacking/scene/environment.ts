import { Group, CanvasTexture, Color, SRGBColorSpace } from 'three';
import { STACKING_POLICY as P } from '../policy.js';
import { PALETTE as C } from './palette.js';
import type { Resources } from './resources.js';

export function createEnvironment(r: Resources) {
    const world = new Group(), clouds = new Group(), farClouds = new Group(), crane = new Group();
    r.mesh(world, 'box', C.milk, [P.groundWidth / 1000, 0.22, 1.72], [0, -0.11, 0]);
    r.mesh(world, 'box', C.mint, [2.48, 0.22, 1.98], [0, -0.33, 0], 'enamel');
    r.mesh(world, 'box', C.porcelain, [2.65, 0.1, 2.12], [0, -0.49, 0]);
    for (const x of [-0.92, 0, 0.92]) {
        r.mesh(world, 'box', C.timber, [0.12, 0.42, 1.73], [x, -0.52, 0]);
    }
    for (const x of [-0.77, 0.77]) {
        const bracket = r.mesh(world, 'box', C.brass, [0.08, 0.6, 0.08], [x, -0.5, 0.91], 'metal');
        bracket.rotation.z = x < 0 ? -0.55 : 0.55;
    }
    r.batch(world);
    // Clouds sit below the foundations and behind the building, never on its bearing plane.
    for (let cluster = 0; cluster < 11; cluster++) {
        const angle = cluster * 2.399, radius = cluster < 5 ? 3.6 : 7.4;
        for (let puff = 0; puff < 4; puff++) {
            const distant = cluster >= 5, group = distant ? farClouds : clouds;
            r.mesh(group, 'sphere', distant ? C.distantCloud : C.cloud,
                [0.92 + puff * 0.13, 0.38 + (puff % 3) * 0.18, 0.84 + puff * 0.08],
                [Math.sin(angle) * radius + puff * 0.55, -1.2 - (cluster % 3) * 0.35 + (puff === 1 ? 0.18 : 0), Math.cos(angle) * radius + puff * 0.22], 'cloud');
        }
    }
    // Repeated braces give the rail a tangible construction without adding gameplay geometry.
    r.mesh(crane, 'box', C.milk, [8.1, 0.16, 0.33], [-0.35, 0, 0], 'enamel');
    r.mesh(crane, 'box', C.brass, [8.1, 0.065, 0.36], [-0.35, 0.3, 0], 'metal');
    for (let i = 0; i < 15; i++) {
        const strut = r.mesh(crane, 'box', C.timber, [0.035, 0.43, 0.06], [-4.12 + i * 0.53, 0.16, 0.14]);
        strut.rotation.z = i % 2 ? -0.9 : 0.9;
    }
    r.batch(crane);
    const carriage = new Group(), cable = new Group(), grip = new Group();
    crane.add(carriage); carriage.add(cable, grip);
    r.mesh(carriage, 'box', C.mint, [0.48, 0.26, 0.48], [0, -0.12, 0], 'enamel');
    for (const x of [-0.16, 0.16]) {
        const wheel = r.mesh(carriage, 'rod', C.steel, [0.085, 0.1, 0.085], [x, -0.03, 0.23], 'metal');
        wheel.rotation.x = Math.PI / 2;
    }
    for (const x of [-0.11, 0.11]) { r.mesh(cable, 'rod', C.steel, [0.012, 1, 0.012], [x, -0.5, 0], 'metal'); }
    r.mesh(grip, 'box', C.brass, [0.52, 0.09, 0.23], [0, 0, 0], 'metal');
    const jaws = [-1, 1].map(direction => {
        const jaw = r.mesh(grip, 'box', C.steel, [0.045, 0.16, 0.16], [direction * 0.22, -0.09, 0], 'metal');
        return { jaw, direction };
    });
    const canvas = document.createElement('canvas'); canvas.width = 2; canvas.height = 128;
    const context = canvas.getContext('2d');
    if (!context) { throw new Error('stacking_sky_canvas'); }
    const gradient = context.createLinearGradient(0, 0, 0, 128);
    gradient.addColorStop(0, new Color(C.sky).getStyle()); gradient.addColorStop(1, new Color(C.horizon).getStyle());
    context.fillStyle = gradient; context.fillRect(0, 0, 2, 128);
    const sky = new CanvasTexture(canvas); sky.colorSpace = SRGBColorSpace;
    return {
        world, clouds, farClouds, crane, carriage, sky,
        hoist(length: number, opening: number) {
            cable.scale.y = length; grip.position.y = -length;
            jaws.forEach(({ jaw, direction }) => { jaw.rotation.z = direction * opening * 0.6; });
        },
        dispose() { sky.dispose(); },
    };
}
