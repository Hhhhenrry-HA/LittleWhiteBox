/* eslint-env node */
// Offline conversion only. Pass the directory containing extracted furniture/ and nature/ packs.
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { Box3, BufferGeometry, Float32BufferAttribute, Vector3 } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const sourceRoot = process.argv[2];
if (!sourceRoot) throw new Error('Usage: node scripts/prepare-map-scene-assets.mjs <extracted-pack-directory>');
const target = 'modules/xiaobai-os/apps/map/ui/three/assets/kenney';
const files = [
    ['furniture', 'table'], ['furniture', 'chairRounded'], ['furniture', 'bedSingle'],
    ['furniture', 'bookcaseOpenLow'], ['nature', 'tree_oak'], ['nature', 'stone_largeE'],
];
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const manifest = [];
await mkdir(target, { recursive: true });
for (const [pack, name] of files) {
    const originalFile = `${pack}/Models/GLTF format/${name}.glb`;
    const bytes = await readFile(path.join(sourceRoot, originalFile));
    const gltf = await new GLTFLoader().parseAsync(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength), '');
    gltf.scene.updateMatrixWorld(true);
    const bounds = new Box3().setFromObject(gltf.scene);
    const center = bounds.getCenter(new Vector3());
    const batches = new Map();
    gltf.scene.traverse(mesh => {
        if (!mesh.isMesh) return;
        if (Array.isArray(mesh.material)) throw new Error('Unexpected multi-material primitive');
        const role = name === 'tree_oak' && mesh.material.name === 'woodBark' ? 'bark'
            : name === 'bedSingle' && mesh.material.name === 'carpetWhite' ? 'soft'
                : name === 'bedSingle' && ['wood', 'metal'].includes(mesh.material.name) ? 'detail' : 'main';
        const source = mesh.geometry.index ? mesh.geometry.toNonIndexed() : mesh.geometry.clone();
        source.applyMatrix4(mesh.matrixWorld).translate(-center.x, -bounds.min.y, -center.z);
        const positions = source.getAttribute('position'), normals = source.getAttribute('normal');
        const uv = [];
        for (let i = 0; i < positions.count; i++) {
            const axis = [Math.abs(normals.getX(i)), Math.abs(normals.getY(i)), Math.abs(normals.getZ(i))];
            const dominant = axis.indexOf(Math.max(...axis));
            uv.push(dominant === 0 ? positions.getZ(i) : positions.getX(i), dominant === 1 ? positions.getZ(i) : positions.getY(i));
        }
        const geometry = new BufferGeometry();
        geometry.setAttribute('position', positions.clone()); geometry.setAttribute('normal', normals.clone());
        geometry.setAttribute('uv', new Float32BufferAttribute(uv, 2));
        if (!batches.has(role)) batches.set(role, []);
        batches.get(role).push(geometry);
        source.dispose();
    });
    // Minimal static GLB: baked transforms, semantic surfaces, no images, lights, extras or extensions.
    const json = { asset: { version: '2.0', generator: 'LittleWhiteBox/prepare-map-scene-assets' }, scene: 0,
        scenes: [{ nodes: [0] }], nodes: [{ mesh: 0 }], meshes: [{ primitives: [] }],
        materials: [], accessors: [], bufferViews: [], buffers: [{ byteLength: 0 }] };
    const chunks = [];
    let triangles = 0;
    for (const [role, parts] of batches) {
        const geometry = mergeGeometries(parts); geometry.computeBoundingBox();
        const attributes = {};
        for (const [key, semantic, type] of [['position', 'POSITION', 'VEC3'], ['normal', 'NORMAL', 'VEC3'], ['uv', 'TEXCOORD_0', 'VEC2']]) {
            const attribute = geometry.getAttribute(key), buffer = Buffer.from(attribute.array.buffer);
            const accessor = { bufferView: json.bufferViews.length, componentType: 5126, count: attribute.count, type };
            if (key === 'position') { accessor.min = geometry.boundingBox.min.toArray(); accessor.max = geometry.boundingBox.max.toArray(); }
            attributes[semantic] = json.accessors.length; json.accessors.push(accessor);
            json.bufferViews.push({ buffer: 0, byteOffset: json.buffers[0].byteLength, byteLength: buffer.length, target: 34962 });
            chunks.push(buffer); json.buffers[0].byteLength += buffer.length;
        }
        triangles += geometry.getAttribute('position').count / 3;
        json.meshes[0].primitives.push({ attributes, material: json.materials.length, mode: 4 });
        json.materials.push({ name: role, pbrMetallicRoughness: { baseColorFactor: [1, 1, 1, 1], metallicFactor: 0, roughnessFactor: 1 } });
        geometry.dispose(); parts.forEach(part => part.dispose());
    }
    const text = Buffer.from(JSON.stringify(json)), padding = (4 - text.length % 4) % 4;
    const jsonChunk = Buffer.concat([text, Buffer.alloc(padding, 32)]), bin = Buffer.concat(chunks);
    const header = Buffer.alloc(20); header.writeUInt32LE(0x46546c67); header.writeUInt32LE(2, 4);
    header.writeUInt32LE(28 + jsonChunk.length + bin.length, 8); header.writeUInt32LE(jsonChunk.length, 12); header.writeUInt32LE(0x4e4f534a, 16);
    const binHeader = Buffer.alloc(8); binHeader.writeUInt32LE(bin.length); binHeader.writeUInt32LE(0x004e4942, 4);
    const output = Buffer.concat([header, jsonChunk, binHeader, bin]);
    await writeFile(`${target}/${name}.glb`, output);
    manifest.push({ file: `${name}.glb`, originalFile, sourceSha256: hash(bytes), sha256: hash(output), bytes: output.length,
        triangles, batches: batches.size, geometryBytes: bin.length, size: bounds.getSize(new Vector3()).toArray() });
}
for (const pack of ['furniture', 'nature']) await copyFile(path.join(sourceRoot, pack, 'License.txt'), `${target}/LICENSE-${pack}.txt`);
await writeFile(`${target}/manifest.json`, JSON.stringify(manifest, null, 2) + '\n');
console.log(JSON.stringify(manifest, null, 2));
