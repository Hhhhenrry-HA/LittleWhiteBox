import assert from 'node:assert/strict';
import { Buffer } from 'node:buffer';
import { setImmediate } from 'node:timers';
import test from 'node:test';
import { crc32, inflateSync } from 'node:zlib';
import { atlasCamera, atlasFocus } from '../apps/map/ui/atlas/camera.js';
import { atlasFractal, atlasNoise } from '../apps/map/ui/atlas/noise.js';
import { atlasFinestLevel, atlasPreviewLevel, atlasSurfaceKey, atlasTileLevel, atlasTileRect, atlasTilesInView, ATLAS_TILE_SIZE, prepareAtlasSurface, renderAtlasTile } from '../apps/map/ui/atlas/surface.js';
import { atlasPngBytes, encodeAtlasPng } from '../apps/map/ui/atlas/tile-render.js';
import { AtlasTileCache, AtlasTileScheduler } from '../apps/map/ui/atlas/tiles.js';
import { atlasPlanBytes, planAtlasTiles } from '../apps/map/ui/atlas/tile-plan.js';
import { atlasTileSession, ATLAS_TILE_BUDGET } from '../apps/map/ui/atlas/tile-session.js';

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
test('tiles are repeatable and independent of names, owner and projected frame', () => {
    const feature = { id: 'grove', frame: 'atlas', role: 'cover', material: 'forest', geometry: { shape: 'rect', x: 20, y: -40, width: 110, height: 80 } };
    const original = structuredClone(feature), tile = { level: -1, tx: 0, ty: -1 };
    const first = renderAtlasTile(prepareAtlasSurface(feature), tile);
    const renamed = { ...feature, name: 'Renamed grove', owner: 'region', frame: 'other' };
    assert.deepEqual(first, renderAtlasTile(prepareAtlasSurface(renamed), tile));
    assert.equal(atlasSurfaceKey(feature), atlasSurfaceKey(renamed));
    assert.deepEqual(feature, original);
    assert.notDeepEqual(first.pixels, renderAtlasTile(prepareAtlasSurface({ ...feature, id: 'different-grove' }), tile).pixels);
    assert.notEqual(atlasSurfaceKey(feature), atlasSurfaceKey({ ...feature, geometry: { ...feature.geometry, width: 111 } }));
    assert.equal(first.pixels.length, first.rect[2] * first.rect[3] * 4);
});

test('the tile level follows screen density down to the finest authored detail', () => {
    const forest = { id: 'f', role: 'cover', material: 'forest', geometry: { shape: 'rect', x: 0, y: 0, width: 10, height: 10 } };
    const grass = { id: 'g', role: 'surface', material: 'grass', geometry: forest.geometry };
    assert.equal(atlasTileLevel(forest, .001), -2);
    assert.equal(atlasTileLevel(grass, .001), -1);
    for (const units of [.7, 1, 3, 40, 900]) {
        const level = atlasTileLevel(grass, units);
        // Never coarser than the screen by more than 2^.25, never finer than it needs by more than 2^.75.
        assert.ok(2 ** level <= units * 2 ** .25 + 1e-9 && 2 ** level > units * 2 ** -.75, String(units));
    }
    assert.equal(atlasPreviewLevel(grass, [0, 0, 5000, 300]), Math.ceil(Math.log2(5000 / ATLAS_TILE_SIZE)));
});

// A hairline between tiles is the usual cost of tiling; overlap texels and apron hillshade remove it.
test('adjacent tiles share an identical overlap texel column and row', () => {
    const at = ({ rect, pixels }, x, y) => { const o = ((y - rect[1]) * rect[2] + x - rect[0]) * 4; return [...pixels.subarray(o, o + 4)]; };
    for (const [material, form] of [['rock', 'ridge'], ['forest', 'forest'], ['stone', 'blocks'], ['water', undefined]]) {
        const s = prepareAtlasSurface({ id: `seam-${material}`, role: 'surface', material, form, geometry: { shape: 'rect', x: -300, y: -290, width: 700, height: 610 } });
        const a = renderAtlasTile(s, { level: 0, tx: -1, ty: -1 }), right = renderAtlasTile(s, { level: 0, tx: 0, ty: -1 }), below = renderAtlasTile(s, { level: 0, tx: -1, ty: 0 });
        assert.equal(a.rect[0] + a.rect[2] - 1, 0);
        for (let y = a.rect[1]; y < a.rect[1] + a.rect[3]; y++) { assert.deepEqual(at(a, 0, y), at(right, 0, y), `${material} x=0 y=${y}`); }
        for (let x = a.rect[0]; x < a.rect[0] + a.rect[2]; x++) { assert.deepEqual(at(a, x, 0), at(below, x, 0), `${material} y=0 x=${x}`); }
    }
});

test('texture texels in a view stay bounded however large the world or deep the zoom', () => {
    const screen = [1000, 800];
    for (const size of [50, 5000, 5e6]) {
        const feature = { id: 'world', role: 'surface', material: 'grass', geometry: { shape: 'rect', x: -size / 2, y: -size / 2, width: size, height: size } };
        const bounds = [-size / 2, -size / 2, size, size];
        for (const units of [.01, .3, 1, 17, 4000]) {
            const view = [-screen[0] * units / 2, -screen[1] * units / 2, screen[0] * units, screen[1] * units];
            const tiles = atlasTilesInView(bounds, view, atlasTileLevel(feature, units));
            const texels = tiles.reduce((sum, t) => { const r = atlasTileRect(bounds, t); return sum + r[2] * r[3]; }, 0);
            assert.ok(texels <= 72 * 257 ** 2, JSON.stringify({ size, units, tiles: tiles.length }));
        }
    }
});

test('narrow forest and ridge surfaces keep visible material at every level', () => {
    for (const [material, form] of [['forest', 'forest'], ['rock', 'ridge']]) for (const [width, height] of [[1000, 1], [1, 1000], [.01, .01]]) {
        const feature = { id: 'thin', role: 'cover', material, form, geometry: { shape: 'rect', x: 0, y: 0, width, height } };
        const s = prepareAtlasSurface(feature), bounds = [0, 0, width, height];
        for (let level = atlasFinestLevel(feature); level <= atlasPreviewLevel(feature, bounds); level++) {
            const visible = atlasTilesInView(bounds, bounds, level).some(tile => renderAtlasTile(s, tile).pixels.some((v, i) => i % 4 === 3 && v > 0));
            assert.ok(visible, JSON.stringify({ material, width, height, level }));
        }
    }
});

test('unresolvable noise octaves settle to their mean, and full resolution keeps the original fractal', () => {
    const original = (x, y, seed) => atlasNoise(x, y, seed) * .55 + atlasNoise(x * 2.07, y * 2.07, seed + 71) * .27
        + atlasNoise(x * 4.13, y * 4.13, seed + 137) * .13 + atlasNoise(x * 8.23, y * 8.23, seed + 211) * .05;
    for (let i = 0; i < 200; i++) {
        const x = i * 1.37 - 90, y = i * .71 + 12;
        assert.ok(Math.abs(atlasFractal(x, y, 9) - original(x, y, 9)) < 1e-12);
        assert.equal(atlasFractal(x, y, 9, 1), .5);
    }
});

// Uncompressed encoding must still be a valid lossless PNG: checked chunk CRCs, zlib stream and every RGBA byte.
test('tile PNG encoding is lossless and valid across stored deflate blocks', () => {
    for (const [width, height] of [[1, 1], [257, 4], [257, 257]]) {
        const s = prepareAtlasSurface({ id: 'png', role: 'cover', material: 'forest', form: 'forest', geometry: { shape: 'rect', x: 0, y: 0, width: width * 4, height: height * 4 } });
        const { rect, pixels } = renderAtlasTile(s, { level: 2, tx: 0, ty: 0 });
        const png = Buffer.from(encodeAtlasPng(pixels, rect[2], rect[3])), chunks = {};
        assert.equal(png.length, atlasPngBytes(rect[2], rect[3]));
        assert.deepEqual([...png.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
        for (let o = 8; o < png.length;) {
            const length = png.readUInt32BE(o), type = png.toString('latin1', o + 4, o + 8);
            assert.equal(png.readUInt32BE(o + 8 + length), crc32(png.subarray(o + 4, o + 8 + length)), type);
            chunks[type] = png.subarray(o + 8, o + 8 + length); o += 12 + length;
        }
        assert.equal(chunks.IHDR.readUInt32BE(0), rect[2]);
        assert.equal(chunks.IHDR.readUInt32BE(4), rect[3]);
        const raw = inflateSync(chunks.IDAT), row = rect[2] * 4 + 1;
        assert.equal(raw.length, row * rect[3]);
        for (let y = 0; y < rect[3]; y++) {
            assert.equal(raw[y * row], 0);
            assert.ok(raw.subarray(y * row + 1, (y + 1) * row).equals(Buffer.from(pixels.subarray(y * rect[2] * 4, (y + 1) * rect[2] * 4))), `row ${y}`);
        }
        assert.ok('IEND' in chunks);
    }
});

test('the tile cache rejects over-budget admissions without evicting displayed images', () => {
    const revoked = [], cache = new AtlasTileCache(3 * 10 * 10 * 4, url => revoked.push(url)), rect = [0, 0, 10, 10];
    cache.set('a', 'url:a', rect, new Set());
    cache.set('b', 'url:b', rect, new Set());
    cache.set('c', 'url:c', rect, new Set());
    cache.get('a');
    cache.set('d', 'url:d', rect, new Set(['b']));
    assert.deepEqual(revoked, ['url:c']);
    assert.ok(cache.has('a') && cache.has('b') && cache.has('d'));
    assert.equal(cache.set('e', 'url:e', rect, new Set(['a', 'b', 'd', 'e'])), false);
    assert.equal(cache.size, 3);
    assert.equal(cache.bytes, cache.budget);
    assert.ok(revoked.includes('url:e'));
    assert.ok(cache.bytes <= cache.budget);
    cache.clear();
    assert.equal(cache.bytes, 0);
    assert.equal(revoked.length, 5);
});

test('changing or deleting geography releases its tiles without invalidating unchanged surfaces', () => {
    const revoked = [], cache = new AtlasTileCache(1000, url => revoked.push(url));
    cache.set('woods#old@0/0/0', 'old', [0, 0, 2, 2], new Set());
    cache.set('river#same@0/0/0', 'kept', [0, 0, 2, 2], new Set());
    cache.retainSurfaceKeys(new Set(['woods#new', 'river#same']));
    assert.deepEqual(revoked, ['old']);
    assert.equal(cache.has('river#same@0/0/0'), true);
});

test('the scheduler renders on the fallback after its worker fails, without losing the queued tile', async () => {
    const events = [], fallbackJobs = [];
    const job = id => ({ id, surfaceKey: 'k', source: {}, tile: { level: 0, tx: 0, ty: 0 } });
    let failWorker;
    const worker = { render: () => failWorker(worker), dispose: () => events.push('disposed') };
    const scheduler = new AtlasTileScheduler({
        cache: new AtlasTileCache(1e9, () => {}), createUrl: () => 'url', revokeUrl() {}, decode: async () => {},
        renderers: (_, fail) => { failWorker = fail; return [worker]; },
        fallback: deliver => ({ render: j => { fallbackJobs.push(j.id); deliver({ id: j.id, blob: new Blob(), rect: [0, 0, 2, 2] }); }, dispose() {} }),
        onTile: () => events.push('tile'),
    });
    scheduler.request([job('x'), job('y')], new Set());
    await new Promise(resolve => setImmediate(resolve));
    assert.deepEqual(fallbackJobs, ['x', 'y']);
    assert.deepEqual(events, ['disposed', 'tile', 'tile']);
    assert.equal(scheduler.pending, 0);
    // Cached tiles are not rendered again.
    scheduler.request([job('x'), job('y')], new Set());
    assert.deepEqual(fallbackJobs, ['x', 'y']);
});

// A per-feature cap cannot detect the combined DPR3 working-set overflow observed in the browser.
test('visible tile plans share the real encoded + decoded budget without losing geography', () => {
    const layer = (id, x = 0) => ({ source: { id, role: 'cover', material: 'forest', form: 'forest', geometry: { shape: 'rect', x, y: 0, width: 5000, height: 4000 } }, sourceBounds: [x, 0, 5000, 4000], mapping: { scale: 1, offset: [0, 0] } });
    for (const count of [1, 8, 32, 256]) {
        const layers = Array.from({ length: count }, (_, i) => layer(`wood-${i}`));
        const plans = planAtlasTiles([...layers, layer('offscreen', 1e5)], [2322, 1353, 355, 730], 355 / 390 / 3, ATLAS_TILE_BUDGET / 2);
        assert.equal(plans.length, count);
        assert.ok(plans.every(plan => plan.tiles.length && plan.previews.length));
        assert.ok(atlasPlanBytes(plans) <= ATLAS_TILE_BUDGET / 2);
    }
});

test('chat-scoped images survive component closing, but reset and new chats release them', () => {
    const listeners = new Set(), bridge = { subscribe: fn => { listeners.add(fn); return () => listeners.delete(fn); } };
    const first = atlasTileSession(bridge, 'a');
    first.cache.set('forest#1@0/0/0', URL.createObjectURL(new Blob()), [0, 0, 2, 2], new Set());
    assert.equal(atlasTileSession(bridge, 'a'), first);
    assert.equal(first.cache.size, 1);
    const second = atlasTileSession(bridge, 'b');
    assert.notEqual(second, first);
    assert.equal(first.cache.bytes, 0);
    assert.ok(first.signal.aborted);
    assert.equal(listeners.size, 1);
    listeners.forEach(fn => fn({ type: 'os/init' }));
    assert.ok(second.signal.aborted);
    assert.equal(listeners.size, 0);
});

test('decoding and stale results cannot replace a ready image or leak after closing', async () => {
    const cache = new AtlasTileCache(1e6, () => {}), revoked = [], rendered = [];
    let deliver, finishDecode, notifications = 0;
    const scheduler = new AtlasTileScheduler({
        cache, createUrl: () => 'blob:new', revokeUrl: url => revoked.push(url),
        decode: () => new Promise(resolve => { finishDecode = resolve; }),
        renderers: send => { deliver = send; return [{ render: job => rendered.push(job.id), dispose() {} }]; },
        fallback: () => { throw new Error('unexpected fallback'); }, onTile: () => { notifications++; },
    });
    const job = { id: 'new', surfaceKey: 's', source: {}, tile: { level: 0, tx: 0, ty: 0 } };
    scheduler.request([job], new Set([job.id]));
    deliver({ id: job.id, blob: new Blob(), rect: [0, 0, 2, 2] });
    assert.equal(cache.has(job.id), false);
    finishDecode();
    await new Promise(resolve => setImmediate(resolve));
    assert.equal(cache.has(job.id), true);
    assert.equal(notifications, 1);
    scheduler.request([job], new Set([job.id]));
    assert.deepEqual(rendered, [job.id]);
    scheduler.request([{ ...job, id: 'stale' }], new Set());
    deliver({ id: 'stale', blob: new Blob(), rect: [0, 0, 2, 2] });
    scheduler.dispose();
    finishDecode();
    await new Promise(resolve => setImmediate(resolve));
    assert.equal(cache.has(job.id), true);
    assert.equal(cache.has('stale'), false);
    assert.deepEqual(revoked, ['blob:new']);
});
