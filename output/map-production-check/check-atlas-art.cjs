async (page) => {
    const base = 'http://127.0.0.1:8765/output/map-production-check/dist/';
    const check = (ok, why) => { if (!ok) throw new Error(why); };
    const settle = () => page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
    const report = [];
    for (const width of [1280, 390, 320]) for (const dark of [false, true]) {
        await page.setViewportSize({ width, height: 844 });
        await page.goto(base + '?scene=atlas-geography');
        if (dark) await page.locator('.check-controls button').nth(0).click();
        await settle();
        const state = await page.evaluate(() => JSON.stringify(window.mapCheck.map()));
        const root = await page.locator('.map-app').boundingBox(), canvas = await page.locator('.map-viewport-svg').boundingBox();
        check(Math.abs(canvas.width - root.width) < 1 && Math.abs(canvas.height - root.height) < 1, 'Atlas is boxed inside its controls');
        const opening = await page.locator('.map-viewport-svg').getAttribute('viewBox');
        await page.screenshot({ path: `output/playwright/atlas-geography-${width}-${dark ? 'dark' : 'light'}.png` });
        await page.locator('.map-fit').click(); await settle();
        check(await page.locator('.map-viewport-svg').getAttribute('viewBox') !== opening, 'opening camera is still fit-all');
        const allVisible = await page.locator('.map-viewport-svg').evaluate(svg => {
            const box = svg.getBoundingClientRect(), top = document.querySelector('.map-top').getBoundingClientRect().bottom;
            const bottom = document.querySelector('.map-atlas-bottom').getBoundingClientRect().top;
            return [...svg.querySelectorAll('.map-place')].every(node => {
                const m = node.getScreenCTM();
                return m.e > box.left && m.e < box.right && m.f > top && m.f < bottom;
            });
        });
        check(allVisible, 'overview hides a known region behind UI');
        await page.screenshot({ path: `output/playwright/atlas-geography-overview-${width}-${dark ? 'dark' : 'light'}.png` });
        await page.locator('.map-view-switch button').nth(1).click(); await settle();
        const before = await page.locator('.map-viewport-svg').getAttribute('viewBox');
        await page.locator('.map-region-card').click(); await page.locator('.map-search-result').first().click(); await settle();
        const position = await page.locator('.map-place.is-selected').evaluate(n => {
            const m = n.getScreenCTM(); return { x: m.e, y: m.f };
        });
        const top = await page.locator('.map-top').boundingBox(), bottom = await page.locator('.map-place-detail').boundingBox();
        check(position.y > top.y + top.height && position.y < bottom.y, 'selected place is behind floating UI');
        check(await page.locator('.map-viewport-svg').getAttribute('viewBox') !== before, 'located place did not focus');
        await page.evaluate(() => window.mapCheck.back()); await settle();
        await page.screenshot({ path: `output/playwright/atlas-geography-region-${width}-${dark ? 'dark' : 'light'}.png` });
        check(await page.evaluate(() => JSON.stringify(window.mapCheck.map())) === state, 'art or browsing changed spatial facts');
        check(await page.evaluate(() => window.mapCheck.requests.length) === 0, 'art called the host');
        report.push({ width, dark, continuousCanvas: true, overview: true, focus: true });
    }
    await page.setViewportSize({ width: 844, height: 390 });
    await page.goto(base + '?scene=atlas-geography'); await settle();
    const zoom = await page.locator('.map-viewport-controls').boundingBox(), tools = await page.locator('.map-floating-tools').boundingBox();
    check(zoom.x + zoom.width <= tools.x || tools.x + tools.width <= zoom.x || zoom.y + zoom.height <= tools.y || tools.y + tools.height <= zoom.y, 'short viewport overlaps zoom and location controls');
    await page.screenshot({ path: 'output/playwright/atlas-geography-landscape.png' });

    await page.setViewportSize({ width: 1280, height: 844 });
    await page.goto(base + '?scene=atlas-geography');
    await page.locator('.map-fit').click(); await settle();
    await page.evaluate(() => {
        const encode = HTMLCanvasElement.prototype.toDataURL;
        window.atlasEncodes = 0;
        HTMLCanvasElement.prototype.toDataURL = function (...args) { window.atlasEncodes++; return encode.apply(this, args); };
    });
    for (let i = 0; i < 3; i++) await page.getByRole('button', { name: '放大地图', exact: true }).click();
    await page.locator('.map-fit').click(); await settle();
    await page.evaluate(() => {
        const map = window.mapCheck.map(); map.atlas.features.find(f => f.id === 'silver-range').name = 'New geographical label'; window.mapCheck.push(map);
    });
    await settle();
    check(await page.evaluate(() => window.atlasEncodes) === 0, 'zoom or a renamed feature regenerated geographical materials');
    report.push({ landscapeControls: true, reusedTextures: true });
    return report;
}
