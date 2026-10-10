import { Box3, Ray, Raycaster, Vector3, type Group, type Intersection } from 'three';
import type { SceneKit } from '../scene-kit.js';
import type { Point } from '../types.js';
import { insideFootprint, type Footprint, type Landscape } from '../world/landscape.js';
import { landscapeFeature, lamp } from './landscape-models.js';
import { LAND } from './world-palette.js';
import { WORLD_CAMERA } from '../visuals.js';
import { buildRoads } from './landscape-roads.js';

export interface LandscapeScenery { dispose(): void; update(player: Point, bearing: number): void }

function subtract(source: Footprint, hole: Footprint): Footprint[] {
    const l = source.x - source.width / 2, r = l + source.width, t = source.z - source.depth / 2, b = t + source.depth;
    const hl = Math.max(l, hole.x - hole.width / 2), hr = Math.min(r, hole.x + hole.width / 2);
    const ht = Math.max(t, hole.z - hole.depth / 2), hb = Math.min(b, hole.z + hole.depth / 2);
    if (hl >= hr || ht >= hb) { return [source]; }
    return [[l, t, r, ht], [l, hb, r, b], [l, ht, hl, hb], [hr, ht, r, hb]]
        .filter(([x1, z1, x2, z2]) => x2 > x1 && z2 > z1)
        .map(([x1, z1, x2, z2]) => ({ x: (x1 + x2) / 2, z: (z1 + z2) / 2, width: x2 - x1, depth: z2 - z1 }));
}

function roadDistance(p: Point, a: readonly number[], b: readonly number[]) {
    const dx = b[0] - a[0], dz = b[1] - a[1], t = Math.max(0, Math.min(1, ((p.x - a[0]) * dx + (p.y - a[1]) * dz) / (dx * dx + dz * dz)));
    return Math.hypot(p.x - a[0] - dx * t, p.y - a[1] - dz * t);
}

/** Local batches preserve frustum culling. Upper architecture cuts away when it hides the player. */
export function buildLandscape(k: SceneKit, root: Group, land: Landscape): LandscapeScenery {
    const cleanups: (() => void)[] = [], chunks = new Map<string, Group>();
    const occluders: { root: Group; bounds: Box3 }[] = [], sight = new Ray(), direction = new Vector3();
    const raycaster = new Raycaster(), hits: Intersection[] = [];
    function chunk(x: number, z: number) {
        const id = `${Math.floor(x / 16)}:${Math.floor(z / 16)}`;
        let group = chunks.get(id);
        if (!group) { group = k.group(root); chunks.set(id, group); }
        return group;
    }
    let ground = [land.bounds];
    for (const item of land.features.filter(f => f.kind === 'water')) { ground = ground.flatMap(piece => subtract(piece, item.footprint)); }
    const grass = land.surface === 'grass', marble = land.surface === 'marble';
    const floor = grass ? LAND.grass : land.surface === 'wet' ? LAND.wetStone : marble ? LAND.marble : LAND.stone;
    for (const piece of ground) {
        // Flat contiguous surfaces, not visible navigation cells.
        k.mesh(chunk(piece.x, piece.z), 'box', floor, [piece.width, .6, piece.depth], [piece.x, -.32, piece.z]).castShadow = false;
        if (!grass) {
            for (let x = piece.x - piece.width / 2; x < piece.x + piece.width / 2; x += 4) {
                for (let z = piece.z - piece.depth / 2; z < piece.z + piece.depth / 2; z += 4) {
                    const w = Math.min(4, piece.x + piece.width / 2 - x), d = Math.min(4, piece.z + piece.depth / 2 - z);
                    const tone = marble ? (Math.round(x / 4 + z / 4) % 2 ? LAND.marble : LAND.marbleLight) : floor;
                    k.mesh(chunk(x, z), 'box', tone, [w - .04, .018, d - .04], [x + w / 2, -.009, z + d / 2]).castShadow = false;
                }
            }
        }
    }
    buildRoads(k, land.roads, marble, chunk);
    if (marble) {
        const seal = chunk(0, -17);
        for (const radius of [4, 4.4, 5.5]) { k.ring(seal, LAND.brass, radius, 0, -17, 1, false, .09); }
        for (let i = 0; i < 12; i++) {
            const t = i * Math.PI / 6, leaf = k.shape(seal, [[0, 0], [.35, .7], [0, 2.5], [-.35, .7]], LAND.brass, [Math.sin(t) * 4.6, .095, -17 + Math.cos(t) * 4.6]);
            leaf.rotation.set(-Math.PI / 2, 0, t);
        }
    }
    if (land.vista === 'camp') {
        const plaza = chunk(0, 8);
        k.ring(plaza, LAND.mortar, 10.7, 0, 8, 1, true, .08);
        k.ring(plaza, LAND.stone, 10.35, 0, 8, 1, true, .085);
        // Staggered cut-stone courses belong to the old courtyard, not to the navigation grid.
        for (let course = 0; course < 6; course++) {
            const inner = 2 + course * 1.29, outer = inner + 1.23, count = 10 + course * 6;
            for (let stone = 0; stone < count; stone++) {
                const a = (stone + course % 2 * .5) / count * Math.PI * 2 + .008, b = a + Math.PI * 2 / count - .02;
                const points: [number, number][] = [[Math.cos(a) * inner, Math.sin(a) * inner], [Math.cos(b) * inner, Math.sin(b) * inner],
                    [Math.cos(b) * outer, Math.sin(b) * outer], [Math.cos(a) * outer, Math.sin(a) * outer]];
                const slab = k.shape(plaza, points, (course * 7 + stone) % 5 ? LAND.stone : LAND.pavingAccent, [0, .096, 8]); slab.rotation.x = -Math.PI / 2;
            }
        }
        k.ring(plaza, LAND.mortar, 4.5, 0, 6, 1, false, .11);
        for (let i = 0; i < 20; i++) {
            const t = i * Math.PI / 10, stone = k.mesh(plaza, 'box', LAND.light, [.15, .025, .75], [Math.sin(t) * 9.65, .12, 8 + Math.cos(t) * 9.65]); stone.rotation.y = t;
        }
    }
    // Seeded positions are authored decoration, not a runtime foliage simulation.
    const { bounds } = land;
    for (let i = 0; i < (grass ? 420 : 0); i++) {
        const x = bounds.x + Math.sin(i * 127.13) * (bounds.width / 2 - 3), z = bounds.z + Math.cos(i * 53.71) * (bounds.depth / 2 - 3);
        const p = { x, y: z };
        if (land.features.some(f => insideFootprint(p, { ...f.footprint, width: f.footprint.width + 1.5, depth: f.footprint.depth + 1.5 }))
            || land.roads.some(road => road.points.slice(1).some((b, j) => roadDistance(p, road.points[j], b) < road.width / 2 + 1))
            || land.vista === 'camp' && Math.hypot(x, z - 8) < 11) { continue; }
        const g = chunk(x, z);
        if (i % 4 === 0) {
            const points: [number, number][] = Array.from({ length: 9 }, (_, j) => {
                const t = j * Math.PI * 2 / 9, r = 1 + Math.sin(j * 7 + i) * .3;
                return [Math.cos(t) * r * (1.2 + i % 3), Math.sin(t) * r * (.7 + i % 2)];
            });
            const patch = k.shape(g, points, i % 8 ? LAND.grassDark : LAND.grassLight, [x, .005, z]); patch.rotation.x = -Math.PI / 2;
        } else {
            for (let j = 0; j < 3; j++) {
                const stem = k.mesh(g, 'cone', i % 3 ? LAND.grassDark : LAND.leafLight, [.035, .3 + j * .09, .035], [x + (j - 1) * .16, .15, z]); stem.rotation.z = (j - 1) * .35;
            }
            if (i % 11 === 0) { k.mesh(g, 'rock', LAND.light, [.12, .13, .12], [x, .38, z]); }
        }
    }
    for (const item of land.features) {
        const f = item.footprint, alongX = f.width > f.depth;
        const length = Math.max(f.width, f.depth), count = item.kind === 'wall' ? Math.ceil(length / 7) : 1;
        const feature = k.group(root); feature.name = item.id;
        for (let i = 0; i < count; i++) {
            // Local cutaways keep distant battlements intact. Collision still uses the authored footprint.
            const offset = -length / 2 + (i + .5) * length / count;
            const piece = count === 1 ? f : { ...f, x: f.x + (alongX ? offset : 0), z: f.z + (alongX ? 0 : offset),
                width: alongX ? length / count : f.width, depth: alongX ? f.depth : length / count };
            const upper = count === 1 ? feature : k.group(feature), base = chunk(piece.x, piece.z);
            if (landscapeFeature(k, base, upper, { ...item, footprint: piece }, land.vista === 'interior')) {
                cleanups.push(k.bake(upper));
                occluders.push({ root: upper, bounds: new Box3().setFromObject(upper).expandByScalar(.35) });
            } else { upper.removeFromParent(); }
        }
    }
    for (const road of land.roads.slice(0, 1)) {
        for (let i = 1; i < road.points.length; i++) {
            const [x, z] = road.points[i];
            if (land.vista === 'camp' && Math.hypot(x, z - 8) < 13) { continue; }
            for (const side of [-1, 1]) { lamp(k, chunk(x, z), x + side * (road.width / 2 + .6), z); }
        }
    }
    // Distant city occupies its own cheap batches; it is not loaded as an offscreen playable district.
    const vista = k.group(root);
    const interior = land.vista === 'interior';
    k.mesh(vista, 'box', interior ? LAND.undercroft : LAND.distantGround, [300, 8, 300], [0, -4.65, 0]).castShadow = false;
    for (let i = 0; i < (interior ? 0 : 12); i++) {
        const side = i % 2 ? 1 : -1, x = side * (bounds.width / 2 + 15 + i % 3 * 8), z = bounds.z - 25 + i * 7;
        k.mesh(vista, 'crown', i % 3 ? LAND.distantGround : LAND.distantLeaf, [17 + i % 4 * 3, 6 + i % 3 * 2, 22], [x, -3, z]);
    }
    for (let i = 0; i < (interior || land.vista === 'garden' ? 0 : 9); i++) {
        const x = (i - 4) * 12, z = bounds.z - bounds.depth / 2 - 15 - i % 3 * 6;
        const h = 9 + i % 4 * 3;
        k.mesh(vista, 'box', LAND.distantWall, [9, h, 9], [x, h / 2 - 2, z]);
        k.mesh(vista, 'cone', LAND.distantRoof, [7, 6, 7], [x, h + 1, z]);
        for (let j = -1; j <= 1; j++) { k.mesh(vista, 'box', LAND.distantGround, [.8, 2.5, .08], [x + j * 2.2, h - 4, z + 4.55]); }
    }
    if (!interior && land.vista !== 'garden') {
    const clockZ = bounds.z - bounds.depth / 2 - 25;
    k.mesh(vista, 'box', LAND.distantWall, [8, 35, 8], [-17, 15.5, clockZ]);
    k.mesh(vista, 'cone', LAND.slate, [7, 13, 7], [-17, 39, clockZ]);
    k.mesh(vista, 'torus', LAND.brass, [2.5, 2.5, .6], [-17, 28, clockZ + 4.1]);
    k.mesh(vista, 'box', LAND.shadow, [.13, 1.8, .1], [-17, 28.8, clockZ + 4.2]);
    k.mesh(vista, 'box', LAND.shadow, [1.4, .13, .1], [-16.4, 28, clockZ + 4.2]);
    }
    cleanups.push(k.bake(vista));
    for (const group of chunks.values()) { cleanups.push(k.bake(group)); }
    return {
        update(player, bearing) {
            sight.direction.copy(direction.set(Math.sin(bearing), WORLD_CAMERA.height / WORLD_CAMERA.distance, Math.cos(bearing)).normalize());
            for (const item of occluders) {
                // An awning's enclosing box can include the visitor standing in front of it.
                // Only real opaque geometry crossing the sight ray should cut away.
                hits.length = 0;
                for (const height of [.1, 1.6]) {
                    sight.origin.set(player.x, height, player.y); raycaster.ray.copy(sight);
                    if (sight.intersectsBox(item.bounds)) { raycaster.intersectObject(item.root, true, hits); }
                    if (hits.length) { break; }
                }
                item.root.visible = hits.length === 0;
            }
        },
        dispose() { cleanups.forEach(dispose => dispose()); root.clear(); },
    };
}
