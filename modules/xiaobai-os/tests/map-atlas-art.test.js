import assert from 'node:assert/strict';
import test from 'node:test';
import { atlasCamera, atlasFocus } from '../apps/map/ui/atlas/camera.js';
import { createAtlasSurface, atlasSurfaceSize, atlasTextureDensity, MAX_ATLAS_TEXTURE_PIXELS } from '../apps/map/ui/atlas/surface.js';
import { atlasTextureLayout, MAX_ATLAS_SHEET_SIDE } from '../apps/map/ui/atlas/texture-sheet.js';

// The old fitted SVG tests cannot detect a postage-stamp opening camera or focus under floating UI.
test('Atlas opening fills the viewport, while explicit overview keeps all geography outside the controls', () => {
    const bounds = [-80, -80, 1160, 760], insets = [180, 64, 100, 20];
    for (const size of [[390, 800], [900, 800], [800, 390]]) {
        const opening = atlasCamera(bounds, size, insets, false, [230, 220]);
        const overview = atlasCamera(bounds, size, insets, true);
        assert.ok(opening[2] < overview[2]);
        assert.equal(opening[2] / size[0], opening[3] / size[1]);
        const scale = overview[2] / size[0];
        assert.ok((bounds[0] - overview[0]) / scale >= insets[3] - 1e-9);
        assert.ok((bounds[1] - overview[1]) / scale >= insets[0] - 1e-9);
        assert.ok((bounds[0] + bounds[2] - overview[0]) / scale <= size[0] - insets[1] + 1e-9);
        assert.ok((bounds[1] + bounds[3] - overview[1]) / scale <= size[1] - insets[2] + 1e-9);
    }
});

test('focusing a real point respects the current details sheet without altering its coordinates', () => {
    const point = [120, 280], size = [390, 800], insets = [170, 64, 310, 20];
    const focused = atlasFocus(point, [0, 0, 800, 1600], size, insets);
    const scale = focused[2] / size[0];
    assert.equal((point[0] - focused[0]) / scale, 173);
    assert.equal((point[1] - focused[1]) / scale, 330);
    assert.deepEqual(point, [120, 280]);
});

// These are generated pixels, not snapshots: geographical source identity is the stable contract.
test('material generation is repeatable and independent of names, owner and projected frame', () => {
    const feature = { id: 'grove', frame: 'atlas', role: 'cover', material: 'forest', geometry: { shape: 'rect', x: 20, y: -40, width: 110, height: 80 } };
    const original = structuredClone(feature), first = createAtlasSurface(feature);
    const other = createAtlasSurface({ ...feature, name: 'Renamed grove', owner: 'region', frame: 'other' });
    assert.deepEqual(first, other);
    assert.deepEqual(feature, original);
    assert.notDeepEqual(first.pixels, createAtlasSurface({ ...feature, id: 'different-grove' }).pixels);
    assert.equal(first.pixels.length, first.width * first.height * 4);
});

test('large collections lower texture resolution rather than dropping geographical features', () => {
    const features = Array.from({ length: 256 }, (_, i) => ({ id: `terrain-${i}`, frame: 'atlas', role: 'surface', material: 'grass', geometry: { shape: 'rect', x: i * 100, y: 0, width: 10000, height: 7000 } }));
    const density = atlasTextureDensity(features);
    const dimensions = features.map(f => atlasSurfaceSize(f, density));
    assert.equal(dimensions.length, 256);
    assert.ok(dimensions.every(([w, h]) => w >= 2 && h >= 2));
    assert.ok(dimensions.reduce((sum, [w, h]) => sum + w * h, 0) <= MAX_ATLAS_TEXTURE_PIXELS);
});

// Texture sampling and canvas allocation have different limits: narrow tiles can leave huge shelf gaps.
test('mixed horizontal and vertical terrain fits the allocated texture sheet without dropping tiles', () => {
    const features = Array.from({ length: 256 }, (_, i) => ({ id: `strip-${i}`, frame: 'atlas', role: 'cover', material: 'forest', geometry: { shape: 'rect', x: i * 4, y: 0, width: i % 2 ? 1 : 1000, height: i % 2 ? 1000 : 1 } }));
    for (const input of [features, [...features].reverse()]) {
        const { width, height, rectangles } = atlasTextureLayout(input, atlasTextureDensity(input));
        assert.ok(width <= MAX_ATLAS_SHEET_SIDE && height <= MAX_ATLAS_SHEET_SIDE);
        assert.equal(rectangles.length, input.length);
        for (const [x, y, w, h] of rectangles) { assert.ok(x > 0 && y > 0 && w >= 2 && h >= 2 && x + w < width && y + h < height); }
        for (let i = 0; i < rectangles.length; i++) for (let j = i + 1; j < rectangles.length; j++) {
            const [x, y, w, h] = rectangles[i], [a, b, c, d] = rectangles[j];
            assert.ok(x + w < a || a + c < x || y + h < b || b + d < y);
        }
    }
});

test('narrow forest and ridge surfaces retain visible pixels even at minimum resolution', () => {
    for (const [material, form] of [['forest', 'forest'], ['rock', 'ridge']]) for (const [width, height] of [[1000, 1], [1, 1000], [.01, .01]]) {
        const feature = { id: 'thin', frame: 'atlas', role: 'cover', material, form, geometry: { shape: 'rect', x: 0, y: 0, width, height } };
        const surface = createAtlasSurface(feature);
        assert.ok(surface.pixels.some((v, i) => i % 4 === 3 && v > 0), JSON.stringify({ material, width, height }));
    }
});
