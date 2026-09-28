import { Group } from 'three';
import type { Resources } from './resources.js';
import { STACKING_POLICY as P } from '../policy.js';
export function createEnvironment(r: Resources) {
    const world = new Group(), clouds = new Group(), crane = new Group();
    r.mesh(world, 'box', 0xf9f5e9, [P.groundWidth / 1000, 0.26, 1.65], [0, -0.13, 0]);
    r.mesh(world, 'box', 0xb7d7c9, [2.5, 0.22, 1.95], [0, -0.36, 0]);
    for (let i = 0; i < 16; i++) {
        const angle = i * 2.4, radius = i % 2 ? 4.5 : 2.3;
        r.mesh(clouds, 'sphere', i % 3 ? 0xf6faf9 : 0xe2f0f1,
            [1.35 + i % 3 * 0.5, 0.4 + i % 2 * 0.2, 1.2], [Math.sin(angle) * radius, -0.75 - (i % 3) * 0.22, Math.cos(angle) * radius]);
    }
    world.add(clouds);
    r.mesh(crane, 'box', 0xe6b67e, [7, 0.17, 0.23], [0, 0, 0]);
    r.mesh(crane, 'box', 0xffedc9, [7, 0.055, 0.26], [0, 0.11, 0]);
    const carriage = new Group(); crane.add(carriage);
    r.mesh(carriage, 'box', 0x829ea9, [0.45, 0.22, 0.36], [0, -0.1, 0]);
    r.mesh(carriage, 'rod', 0x647d8b, [0.022, 0.7, 0.022], [0, -0.53, 0]);
    r.mesh(carriage, 'box', 0xd8a16b, [0.35, 0.09, 0.18], [0, -0.9, 0]);
    return { world, clouds, crane, carriage };
}
