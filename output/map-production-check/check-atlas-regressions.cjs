async (page) => {
    const base = 'http://127.0.0.1:8765/output/map-production-check/dist/?scene=atlas-geography';
    const check = (ok, why) => { if (!ok) throw new Error(why); };
    const settle = () => page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
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
    const report = { focus: [], bridges: [] }, errors = [];
    page.on('pageerror', error => errors.push(String(error)));
    await page.setViewportSize({ width: 390, height: 844 }); await page.goto(base);
    await page.evaluate(() => {
        const map = window.mapCheck.fixture('empty');
        map.atlas.features = [{ id: 'tall', frame: 'atlas', role: 'surface', material: 'grass', geometry: { shape: 'rect', x: 0, y: 0, width: 100, height: 10000 } }];
        window.mapCheck.push(map);
    });
    await settle(); await page.locator('.map-fit').click(); await settle();
    const width = async () => Number((await page.locator('.map-viewport-svg').getAttribute('viewBox')).split(' ')[2]);
    const overview = await width();
    await page.getByRole('button', { name: '缩小地图', exact: true }).click();
    check(await width() > overview, 'zoom-out reverses after fitting tall geography');
    await page.getByRole('button', { name: '放大地图', exact: true }).click();
    check(Math.abs(await width() - overview) < 1e-6, 'zoom-in is not the inverse of zoom-out');
    report.zoom = true;

    for (const height of [844, 600]) {
        await page.setViewportSize({ width: 390, height }); await page.goto(base);
        await page.evaluate(() => {
            const map = window.mapCheck.map();
            map.atlas.locations.forEach(place => { place.brief = '这是包含详细地理与历史介绍的地区。'.repeat(20); });
            window.mapCheck.push(map);
        });
        await settle(); await page.locator('.map-region-card').click(); await page.locator('.map-search-result').first().click(); await settle();
        const position = await page.locator('.map-place.is-selected').evaluate(node => {
            const transform = node.getScreenCTM(), top = document.querySelector('.map-top').getBoundingClientRect(), detail = document.querySelector('.map-place-detail').getBoundingClientRect();
            return { y: transform.f, above: transform.f - top.bottom, below: detail.top - transform.f };
        });
        check(position.above > 24 && position.below > 24, 'long detail sheet covers the focused marker');
        const focused = await page.locator('.map-viewport-svg').getAttribute('viewBox');
        await page.evaluate(() => { const map = window.mapCheck.map(); map.atlas.locations[0].brief = 'Updated'; window.mapCheck.push(map); });
        await settle();
        check(await page.locator('.map-viewport-svg').getAttribute('viewBox') === focused, 'ordinary detail updates unexpectedly refocus the map');
        await page.screenshot({ path: `output/playwright/atlas-fixed-focus-${height}.png` });
        report.focus.push({ height, ...position });
    }

    await page.setViewportSize({ width: 390, height: 844 }); await page.goto(base);
    await page.evaluate(() => {
        const map = window.mapCheck.fixture('empty');
        map.atlas.features = Array.from({ length: 256 }, (_, i) => ({ id: 'strip-' + String(i).padStart(3, '0'), frame: 'atlas', role: 'cover', material: 'forest', form: 'forest', geometry: { shape: 'rect', x: i * 4, y: 0, width: i % 2 ? 1 : 1000, height: i % 2 ? 1000 : 1 } }));
        window.mapCheck.push(map);
    });
    await settle(); await page.locator('.map-fit').click(); await settle();
    report.stripTiles = await tilesSettled();
    const bare = await page.locator('[data-feature]').evaluateAll(nodes => nodes.filter(node => !node.querySelector('.map-atlas-tile')).map(node => node.dataset.feature));
    check(bare.length === 0, 'strips without texture: ' + bare.join());
    check(await page.locator('[data-feature]').count() === 256, 'packed atlas dropped a feature');

    await page.setViewportSize({ width: 1280, height: 844 }); await page.goto(base);
    for (const id of ['stone-bridge', 'aaa-bridge']) {
        await page.evaluate(id => {
            const map = window.mapCheck.fixture('empty');
            const surface = (id, x, y, width, height, extra = {}) => ({ id, frame: 'atlas', role: 'surface', material: 'stone', geometry: { shape: 'rect', x, y, width, height }, ...extra });
            map.atlas.features = [surface('ground', 0, 0, 400, 300),
                { id: 'river', frame: 'atlas', role: 'channel', material: 'water', geometry: { shape: 'path', points: [[0, 150], [400, 150]], width: 40 } },
                surface(id, 180, 110, 40, 80, { crosses: ['river'] })];
            window.mapCheck.push(map);
        }, id);
        await settle(); await page.locator('.map-fit').click(); await settle();
        await tilesSettled();
        const [bridge, water] = await atlasPixels([[200, 150], [100, 150]]), pixels = { bridge, water };
        check(pixels.bridge[0] > 150 && Math.abs(pixels.bridge[2] - pixels.bridge[0]) < 30, 'ground removed the explicit stone crossing');
        check(pixels.water[2] > pixels.water[1] && pixels.water[1] > pixels.water[0], 'crossing filled the rest of the river');
        await page.screenshot({ path: `output/playwright/atlas-fixed-${id}.png` });
        report.bridges.push({ id, ...pixels });
    }
    check(errors.length === 0, errors.join('\n'));
    check(await page.evaluate(() => window.mapCheck.requests.length) === 0, 'browsing called the host');
    return report;
}
