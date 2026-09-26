async (page) => {
    const base = 'http://127.0.0.1:8765/output/map-production-check/dist/';
    const check = (value, detail) => { if (!value) throw new Error(detail); };
    const settle = () => page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
    // Tiles arrive from a worker: wait until no cell shows a neighbouring level and the tile set stops changing.
    const tilesSettled = async () => {
        let last = '', since = Date.now();
        for (const start = Date.now(); Date.now() - start < 20000;) {
            const [pending, keys] = await page.evaluate(() => [document.querySelectorAll('.map-atlas-fallback').length, [...document.querySelectorAll('.map-atlas-tile')].map(n => n.dataset.tile).join()]);
            if (pending || !keys || keys !== last) { last = keys; since = Date.now(); } else if (Date.now() - since > 400) { return keys.split(',').length; }
            await page.waitForTimeout(100);
        }
        throw new Error('atlas tiles did not settle');
    };
    // Screen pixels of the atlas layer alone, at source points: markers and controls are hidden, tiles stay as displayed.
    const atlasPixels = async points => {
        const screen = await page.locator('.map-atlas-space').evaluate((node, points) => { const m = node.getScreenCTM(); return points.map(([x, y]) => [m.a * x + m.c * y + m.e, m.b * x + m.d * y + m.f]); }, points);
        const style = await page.addStyleTag({ content: 'body * { visibility: hidden !important; } .map-atlas-space, .map-atlas-space * { visibility: visible !important; }' });
        const shot = await page.screenshot(); await style.evaluate(node => node.remove());
        return page.evaluate(async ({ data, screen }) => {
            const bitmap = await createImageBitmap(await (await fetch('data:image/png;base64,' + data)).blob());
            const canvas = new OffscreenCanvas(bitmap.width, bitmap.height), ctx = canvas.getContext('2d'); ctx.drawImage(bitmap, 0, 0);
            const scale = bitmap.width / innerWidth;
            return screen.map(([x, y]) => [...ctx.getImageData(Math.round(x * scale), Math.round(y * scale), 1, 1).data]);
        }, { data: shot.toString('base64'), screen });
    };
    await page.setViewportSize({ width: 1280, height: 844 }); await page.goto(base + '?scene=atlas-nature');
    await page.evaluate(() => {
        const map = window.mapCheck.map();
        const area = (id, role, material, x, y, width, height, extra = {}) => ({ id, frame: 'atlas', role, material, geometry: { shape: 'rect', x, y, width, height }, ...extra });
        map.atlas.features = [
            area('ground', 'surface', 'grass', 0, 0, 1000, 600),
            area('forest', 'cover', 'forest', 0, 0, 1000, 600, { form: 'forest' }),
            { id: 'river', frame: 'atlas', role: 'channel', material: 'water', geometry: { shape: 'path', points: [[0, 300], [1000, 300]], width: 80 } },
            area('deck', 'surface', 'metal', 400, 240, 200, 120, { crosses: ['river'] }),
            area('inner', 'surface', 'tile', 350, 270, 130, 50, { support: 'deck' }),
            area('inner-grove', 'cover', 'forest', 350, 270, 130, 50, { support: 'inner', form: 'forest' }),
        ];
        map.atlas.frames.forEach(f => { delete f.boundary; });
        window.mapCheck.push(map);
    });
    await settle(); await page.locator('.map-fit').click();
    await tilesSettled();
    const waterPoints = [];
    for (let x = 20; x < 390; x += 7) for (let y = 265; y <= 335; y += 7) waterPoints.push([x, y]);
    const sampled = await atlasPixels([...waterPoints, [550, 310], [430, 290], [370, 290]]);
    const [deck, grove, outsideNestedSupport] = sampled.slice(waterPoints.length), pixels = { water: sampled.slice(0, waterPoints.length), deck, grove, outsideNestedSupport };
    check(pixels.water.every(([r, g, b, a]) => b > g && g > r && a === 255), 'ground tree canopy or shadow painted over river');
    check(pixels.deck[0] > 145 && pixels.deck[1] < 215, 'water erased metal deck');
    check(pixels.grove[1] > pixels.grove[2], 'supported grove not visible');
    check(pixels.outsideNestedSupport[2] > pixels.outsideNestedSupport[1], 'nested support leaked beyond its ancestor');
    await page.screenshot({ path: 'output/playwright/atlas-water-deck-mask.png' });
    const load = await page.evaluate(async () => {
        const map = window.mapCheck.map();
        map.atlas.features = Array.from({ length: 256 }, (_, i) => ({ id: 'patch-' + i, frame: 'atlas', role: 'cover', material: 'forest', form: 'forest', geometry: { shape: 'rect', x: (i % 16) * 60, y: Math.floor(i / 16) * 38, width: 55, height: 32 } }));
        const start = performance.now(); window.mapCheck.push(map);
        await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
        return { elapsedMs: performance.now() - start, rendered: document.querySelectorAll('[data-feature]').length, svgElements: document.querySelector('.map-atlas-space').querySelectorAll('*').length };
    });
    check(load.rendered === 256, 'terrain silently truncated under load');
    load.tiles = await tilesSettled();
    const bare = await page.locator('[data-feature]').evaluateAll(nodes => nodes.filter(node => !node.querySelector('.map-atlas-tile')).map(node => node.dataset.feature));
    check(bare.length === 0, 'patches without texture under load: ' + bare.join());
    await page.evaluate(() => window.mapCheck.unmount()); await settle();
    check(await page.locator('.map-atlas-space').count() === 0, 'large SVG retained after unmount');
    check(await page.evaluate(() => window.mapCheck.requests.length) === 0, 'composition called host');
    return { maskPixels: { sampledWater: pixels.water.length, deck: pixels.deck, grove: pixels.grove, outsideNestedSupport: pixels.outsideNestedSupport }, load, passed: true };
}
