async (page) => {
    const base = 'http://127.0.0.1:8765/output/map-production-check/dist/?scene=atlas-geography';
    const check = (ok, why) => { if (!ok) throw new Error(why); };
    const settle = () => page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
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
    report.sheet = await page.locator('.map-atlas-material image').first().evaluate(async node => {
        const image = new Image(); image.src = node.getAttribute('href'); await image.decode();
        return { width: image.naturalWidth, height: image.naturalHeight };
    });
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
        const pixels = await page.evaluate(async () => {
            const source = document.querySelector('.map-atlas-space').cloneNode(true), svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', '0 0 400 300'); svg.setAttribute('width', '400'); svg.setAttribute('height', '300'); svg.append(source);
            const image = new Image(); image.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(new XMLSerializer().serializeToString(svg)); await image.decode();
            const canvas = document.createElement('canvas'); canvas.width = 400; canvas.height = 300;
            const ctx = canvas.getContext('2d'); ctx.drawImage(image, 0, 0);
            return { bridge: [...ctx.getImageData(200, 150, 1, 1).data], water: [...ctx.getImageData(100, 150, 1, 1).data] };
        });
        check(pixels.bridge[0] > 150 && Math.abs(pixels.bridge[2] - pixels.bridge[0]) < 30, 'ground removed the explicit stone crossing');
        check(pixels.water[2] > pixels.water[1] && pixels.water[1] > pixels.water[0], 'crossing filled the rest of the river');
        await page.screenshot({ path: `output/playwright/atlas-fixed-${id}.png` });
        report.bridges.push({ id, ...pixels });
    }
    check(errors.length === 0, errors.join('\n'));
    check(await page.evaluate(() => window.mapCheck.requests.length) === 0, 'browsing called the host');
    return report;
}
