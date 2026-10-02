import { Group } from 'three';
import { createMascot } from '../../../../brand/mascot/model.js';
import { createMascotReactions, type MascotReaction } from '../../../../brand/mascot/reactions.js';
import { PALETTE as C } from './palette.js';
import type { Resources } from './resources.js';

export function createCompanion(r: Resources) {
    const root = new Group(), platform = new Group(), mounts = new Group(); root.add(platform, mounts);
    r.mesh(platform, 'box', C.milk, [1.23, 0.16, 1], [0, 0, 0]);
    r.mesh(platform, 'box', C.mint, [1.15, 0.1, 0.94], [0, -0.11, 0], 'enamel');
    for (const x of [-0.53, 0.53]) {
        r.mesh(platform, 'rod', C.brass, [0.022, 0.43, 0.022], [x, 0.24, 0.39], 'metal');
        r.mesh(mounts, 'rod', C.steel, [0.024, 0.4, 0.024], [x, -0.26, -0.37], 'metal');
    }
    r.mesh(platform, 'box', C.brass, [1.1, 0.03, 0.03], [0, 0.45, 0.39], 'metal');
    r.mesh(platform, 'box', C.steel, [0.28, 0.23, 0.25], [0.38, 0.22, 0], 'enamel');
    const lever = r.mesh(platform, 'rod', C.brass, [0.022, 0.17, 0.022], [0.38, 0.41, 0], 'metal'); lever.rotation.z = -0.3;
    r.mesh(platform, 'sphere', C.rose, [0.052, 0.052, 0.052], [0.405, 0.48, 0]);
    const platformModel = r.batch(platform);
    const cloud = r.mesh(root, 'sphere', C.cloud, [0.7, 0.18, 0.52], [0, -0.28, 0], 'cloud');
    const mascot = createMascot({
        group(parent, position) { const group = new Group(); group.position.set(...position); parent.add(group); return group; },
        ball(parent, size, color, position) { return r.mesh(parent, 'sphere', color, size, position); },
    }, root, [-0.14, 0.47, 0]);
    mascot.scale.setScalar(1.12);
    const performer = createMascotReactions(mascot);
    return {
        root,
        update(reaction: MascotReaction, progress: number, cargoX: number, railY: number, operating: boolean) {
            // The operator's platform sits above the rail, outside every house's swept volume.
            root.position.set(operating ? -3.27 : -1.92, operating ? railY + 0.5 : 0.08, operating ? 0.2 : 0.85);
            performer.pose(reaction, progress, (cargoX - root.position.x) * 0.045);
            mounts.visible = operating; cloud.visible = !operating;
        },
        dispose: platformModel.dispose,
    };
}
