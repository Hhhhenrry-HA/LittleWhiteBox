import { type Group, type Object3D, type Vector3 } from 'three';

export const MASCOT_RUN_DURATION_MS = 1100;

// Motion belongs to the performer, not to the game that happens to host it.
export function createMascotPerformer(mascot: Group, home: Vector3) {
    return {
        rest(carried: Object3D) {
            mascot.position.copy(home);
            mascot.rotation.y = 0;
            carried.visible = false;
        },
        carry(progress: number, destinationX: number, carried: Object3D) {
            const walk = Math.max(0, (progress - .2) / .8);
            carried.visible = walk > 0 && walk < .92;
            mascot.position.x = home.x + walk * (destinationX - home.x);
            mascot.position.y = home.y + Math.abs(Math.sin(walk * 22)) * .1;
            mascot.rotation.y = .6;
        },
    };
}
