import { OrthographicCamera, Vector3 } from 'three';

export function createStackingCamera() {
    const camera = new OrthographicCamera(-5, 5, 5, -5, 0.1, 160), target = new Vector3();
    let half = 4.8, center = 1.9, yaw = 0.24, zoom = 1;
    let aspect = 1;
    function project() {
        camera.left = -half * aspect; camera.right = half * aspect; camera.top = half; camera.bottom = -half;
        camera.updateProjectionMatrix();
    }
    return {
        camera,
        resize(width: number, height: number) { aspect = Math.max(0.2, width / Math.max(1, height)); project(); },
        update(top: number, overview: boolean, delta: number, immediate: boolean) {
            const desiredHalf = Math.max(overview ? (top + 2.7) / 2 : 3.8, (overview ? 2.7 : 4.45) / aspect) * zoom;
            const desiredCenter = overview ? top / 2 + 0.2 : Math.max(1.7, top + 1.3);
            const amount = immediate ? 1 : 1 - Math.exp(-delta / 170);
            half += (desiredHalf - half) * amount; center += (desiredCenter - center) * amount;
            target.set(-0.18, center, 0);
            camera.position.set(Math.sin(yaw) * 18 - 0.18, center + 6.4, Math.cos(yaw) * 18);
            camera.lookAt(target); project();
            return { center, settling: Math.abs(desiredHalf - half) > 0.005 || Math.abs(desiredCenter - center) > 0.005 };
        },
        rotate(delta: number) { yaw += delta; },
        zoom(delta: number) { zoom = Math.max(0.7, Math.min(1.5, zoom + delta)); },
    };
}
