import { BoxGeometry, CylinderGeometry, SphereGeometry, MeshStandardMaterial, Mesh, type Group, type Material, type BufferGeometry } from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
export function createResources() {
    const geometry = { box: new RoundedBoxGeometry(1, 1, 1, 2, 0.06), flat: new BoxGeometry(1, 1, 1),
        sphere: new SphereGeometry(1, 12, 8), rod: new CylinderGeometry(1, 1, 1, 8) };
    const materials = new Map<string, MeshStandardMaterial>();
    function material(color: number, glow = false) {
        const key = `${color}:${glow}`;
        if (!materials.has(key)) { materials.set(key, new MeshStandardMaterial({ color, roughness: 0.78,
            emissive: glow ? color : 0, emissiveIntensity: glow ? 0.3 : 0 })); }
        return materials.get(key)!;
    }
    function mesh(parent: Group, kind: keyof typeof geometry, color: number, size: [number, number, number],
        position: [number, number, number], glow = false): Mesh<BufferGeometry, Material> {
        const object = new Mesh(geometry[kind], material(color, glow)); object.scale.set(...size); object.position.set(...position);
        object.castShadow = true; object.receiveShadow = true; parent.add(object); return object;
    }
    return { mesh, material, dispose() { Object.values(geometry).forEach(g => g.dispose()); materials.forEach(m => m.dispose()); materials.clear(); } };
}
export type Resources = ReturnType<typeof createResources>;
