async (page) => {
    const base = 'http://127.0.0.1:8765/output/map-production-check/dist/';
    const check = (value, detail) => { if (!value) throw new Error(detail); };
    const settle = () => page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
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
    const pixels = await page.evaluate(async () => {
        const source = document.querySelector('.map-atlas-space').cloneNode(true);
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 1000 600'); svg.setAttribute('width', '1000'); svg.setAttribute('height', '600'); svg.append(source);
        const image = new Image(); image.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(new XMLSerializer().serializeToString(svg)); await image.decode();
        const canvas = document.createElement('canvas'); canvas.width = 1000; canvas.height = 600;
        const ctx = canvas.getContext('2d'); ctx.drawImage(image, 0, 0);
        const read = (x, y) => [...ctx.getImageData(x, y, 1, 1).data];
        const water = [];
        for (let x = 20; x < 390; x += 7) for (let y = 265; y <= 335; y += 7) water.push(read(x, y));
        return { water, deck: read(550, 310), grove: read(430, 290), outsideNestedSupport: read(370, 290) };
    });
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
    await page.evaluate(() => window.mapCheck.unmount()); await settle();
    check(await page.locator('.map-atlas-space').count() === 0, 'large SVG retained after unmount');
    check(await page.evaluate(() => window.mapCheck.requests.length) === 0, 'composition called host');
    return { maskPixels: { sampledWater: pixels.water.length, deck: pixels.deck, grove: pixels.grove, outsideNestedSupport: pixels.outsideNestedSupport }, load, passed: true };
}
