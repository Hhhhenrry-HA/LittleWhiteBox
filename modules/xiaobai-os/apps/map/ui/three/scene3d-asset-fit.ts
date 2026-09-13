import { InstancedMesh, Matrix4, type Group } from 'three';
import type { MapElement } from '../../../../domains/map/types.js';
import type { SceneAsset, SceneAssetKind } from './scene3d-assets.js';
import { sceneTemplate } from './scene3d-presentation.js';
import type { Scene3DResources } from './scene3d-resources.js';
import type { createSceneMaterials } from './scene3d-materials.js';
import { sceneElementBounds } from '../scene-geometry.js';

const ASSET_RATIOS: Record<SceneAssetKind, readonly [number, number]> = {
    table: [1.2, 3], chair: [.75, 1.35], bed: [.4, .85], shelf: [1, 8], tree: [.6, 1.7], rock: [.6, 1.7],
};

/** Limits are render choices, not new map semantics. Other proportions retain the old recipe. */
export function sceneAssetKind(element: MapElement): SceneAssetKind | undefined {
    const kind = sceneTemplate(element);
    if (!kind || !Object.hasOwn(ASSET_RATIOS, kind)) {return undefined;}
    if (element.shape === 'circle') {return kind === 'tree' || kind === 'rock' ? kind : undefined;}
    const { width, height } = sceneElementBounds(element), ratio = width / height;
    const [min, max] = ASSET_RATIOS[kind as SceneAssetKind];
    return ratio >= min && ratio <= max ? kind as SceneAssetKind : undefined;
}

export function fitSceneAsset(parent: Group, element: MapElement, kind: SceneAssetKind, asset: SceneAsset,
    width: number, depth: number, resources: Scene3DResources, materials: ReturnType<typeof createSceneMaterials>): number {
    const { size } = asset;
    // Repeated empty structural bays represent one shelf, not invented contents.
    const count = kind === 'shelf' ? Math.max(1, Math.ceil(width / depth / (size.x / size.z))) : 1;
    const scale = element.shape === 'circle' ? width / (2 * asset.radius) : Math.min(width / count / size.x, depth / size.z);
    const main = element.material ? element : {
        ...element, material: kind === 'tree' ? 'forest' as const : kind === 'rock' ? 'stone' as const : 'unknown' as const,
    };
    for (const part of asset.parts) {
        const geometry = resources.own(part.geometry.clone());
        geometry.scale(scale, scale, scale);
        // Expand only the middle span of a rectangular tabletop; end legs keep their thickness.
        if (kind === 'table') {
            const positions = geometry.getAttribute('position'), half = size.x * scale / 2;
            const extra = width / 2 - half;
            for (let i = 0; i < positions.count; i++) {
                if (positions.getY(i) < size.y * scale * .55) {continue;}
                const x = positions.getX(i);
                positions.setX(i, x + Math.max(-1, Math.min(1, x / (half * .5))) * extra);
            }
            geometry.computeVertexNormals();
        }
        geometry.computeBoundingBox(); geometry.computeBoundingSphere();
        const surface = part.role === 'soft' ? { ...element, material: 'bed-sheet' as const }
            : part.role === 'bark' && (!element.material || ['grass', 'forest'].includes(element.material)) ? { ...element, material: 'wood' as const } : main;
        const tint = part.role === 'detail' || part.role === 'bark' ? -.22 : part.role === 'soft' ? .12 : 0;
        const material = materials.mesh(surface, tint);
        const mesh = resources.own(new InstancedMesh(geometry, material, count));
        for (let i = 0; i < count; i++) {mesh.setMatrixAt(i, new Matrix4().makeTranslation((i - (count - 1) / 2) * size.x * scale, 0, 0));}
        mesh.castShadow = material.opacity >= .8; mesh.receiveShadow = true;
        parent.add(mesh);
    }
    return size.y * scale;
}
