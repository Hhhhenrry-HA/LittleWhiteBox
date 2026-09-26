// Isolated production components. No storage bridge or model connection.
async (page) => {
    const base = 'http://127.0.0.1:8765/output/map-production-check/dist/';
    const check = (ok, detail) => { if (!ok) throw new Error(detail); };
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
    const tab = i => page.locator('.map-view-switch button').nth(i);
    const box = () => page.locator('.map-viewport-svg').getAttribute('viewBox');
    const back = async () => { await page.evaluate(() => window.mapCheck.back()); await settle(); };
    const errors = []; page.on('pageerror', e => errors.push(e.message));
    const report = { browser: page.context().browser().version(), themes: [], checks: [] };
    for (const width of [1280, 390, 320]) for (const dark of [false, true]) {
        await page.setViewportSize({ width, height: 844 });
        for (const theme of ['nature', 'desert', 'city', 'ocean', 'megastructure', 'space', 'fantasy']) {
            await page.goto(base + '?scene=atlas-' + theme);
            if (dark) await page.locator('.check-controls button').nth(0).click();
            await settle();
            const original = await page.evaluate(() => JSON.stringify(window.mapCheck.map()));
            check(await page.locator('.map-atlas-space [data-feature]').count() > 0, `${theme}: no spatial rendering`);
            check(await page.locator('.map-place').count() === 2, `${theme}: world membership`);
            if ((width === 1280 && !dark) || (width === 390 && dark) || (width === 320 && !dark)) await page.screenshot({ path: `output/playwright/atlas-${theme}-${width}-${dark ? 'dark' : 'light'}.png` });
            await page.locator('.map-region-card').click();
            check(await page.locator('.map-search-result').count() === 1, 'world banner must list only the one unvisited region');
            await back();
            await tab(1).click(); await settle();
            check(await page.locator('.map-place').count() === 1, 'region must render only its located destination');
            const before = await box();
            await page.locator('.map-region-card').click();
            check(await page.locator('.map-search-result').count() === 1, 'unlocated destination must remain in unvisited list');
            await page.locator('.map-search-result').click(); await settle();
            check(await page.locator('.map-place-detail').isVisible(), 'missing position detail did not open');
            check(await box() === before, 'unlocated destination caused fake focus');
            await page.locator('.map-place-actions button').click();
            check(await tab(2).getAttribute('aria-pressed') === 'true', 'unlocated destination cannot open Scene');
            await back(); await settle();
            const bounds = await page.locator('.map-app').evaluate(root => ({ overflow: root.scrollWidth - root.clientWidth, height: root.querySelector('.map-canvas').clientHeight }));
            check(bounds.overflow <= 1 && bounds.height >= 180, 'map clipped on narrow screen');
            check(await page.evaluate(() => JSON.stringify(window.mapCheck.map())) === original, 'browsing changed facts');
            check(await page.evaluate(() => window.mapCheck.requests.length) === 0, 'browsing requested host');
            report.themes.push({ theme, width, dark, passed: true });
        }
    }
    await page.goto(base + '?scene=atlas-empty-places');
    check(await page.locator('.map-atlas-space [data-feature]').count() === 1, 'pure terrain not mounted');
    check(await page.locator('.map-place').count() === 0 && await page.locator('.map-empty').count() === 0, 'empty list concealed pure terrain');
    await page.locator('.map-region-card').click();
    check(await page.locator('.map-search-result').count() === 0, 'terrain created destinations');
    await back();
    await page.locator('.map-fit').click();
    const terrainBox = await box();
    await page.getByRole('button', { name: '放大地图', exact: true }).click();
    check(await box() !== terrainBox, 'pure terrain cannot zoom');
    await page.locator('.map-fit').click();
    check(await box() === terrainBox, 'pure terrain cannot fit');
    await page.screenshot({ path: 'output/playwright/atlas-pure-terrain.png' });
    report.checks.push('pure terrain, empty list, zoom and fit');

    await page.goto(base + '?scene=atlas-nature');
    await page.evaluate(() => {
        const map = window.mapCheck.map(); map.atlas.locations = map.atlas.locations.filter(l => l.scale === 'region');
        map.atlas.actors[0].locationKey = 'west'; window.mapCheck.push(map);
    });
    await tab(1).click(); await settle();
    check(await page.locator('.map-atlas-space [data-feature]').count() > 0 && await page.locator('.map-place').count() === 0, 'region with terrain but no child places did not render');
    await page.locator('.map-region-card').click();
    check(await page.locator('.map-search-result').count() === 0, 'empty terrain region borrowed destinations');
    await back(); report.checks.push('terrain-only region and local empty list');

    await page.goto(base + '?scene=atlas-nature'); await tab(1).click();
    const before = await box();
    await page.evaluate(() => {
        const map = window.mapCheck.map();
        map.atlas.actors[0].locationKey = 'unlocated'; window.mapCheck.push(map);
    });
    await page.getByRole('button', { name: '回到我的位置', exact: true }).click(); await settle();
    check(await box() === before && await page.locator('.map-place-detail').isVisible(), 'unknown player location was guessed');
    await back(); await tab(0).click();
    await page.evaluate(() => {
        const map = window.mapCheck.map(); map.atlas.actors[0].locationKey = 'west'; window.mapCheck.push(map);
    });
    await page.getByRole('button', { name: '回到我的位置', exact: true }).click(); await settle();
    check(await tab(0).getAttribute('aria-pressed') === 'true' && await page.locator('.map-place.is-current.is-selected').count() === 1, 'region-only player marker lost');
    await back(); await page.locator('.map-fit').click();
    await page.getByRole('button', { name: '放大地图', exact: true }).click();
    const moved = await box();
    await page.evaluate(() => {
        const map = window.mapCheck.map(); map.atlas.features.push({ id: 'far', frame: 'atlas', role: 'landmark', material: 'rock', geometry: { shape: 'circle', x: 5000, y: 3000, radius: 100 } }); window.mapCheck.push(map);
    });
    await settle(); check(await box() === moved, 'incremental terrain reset viewport');
    await page.locator('.map-fit').click();
    check(Number((await box()).split(' ')[2]) > 5000, 'fit excluded distant terrain');
    report.checks.push('unknown and region-level player, unchanged update viewport, distant terrain fit');

    await page.goto(base + '?scene=atlas-nature'); await page.setViewportSize({ width: 1280, height: 844 }); await settle();
    // Tile keys are surface identity plus level/x/y: the same forest keeps its key, and a tile present in both maps keeps its pixels.
    const details = async () => { await tilesSettled(); return page.locator('[data-feature="forest"] .map-atlas-tile').evaluateAll(async nodes => Object.fromEntries(await Promise.all(nodes.map(async node => {
        const img = new Image(); img.src = node.getAttribute('href'); await img.decode();
        const canvas = document.createElement('canvas'); canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
        canvas.getContext('2d').drawImage(img, 0, 0);
        return [node.dataset.tile, canvas.toDataURL()];
    })))); };
    const worldDetails = await details();
    await tab(1).click(); await settle(); const regionalDetails = await details();
    const surfaces = tiles => new Set(Object.keys(tiles).map(key => key.split('@')[0]));
    check(Object.keys(worldDetails).length > 0 && Object.keys(regionalDetails).length > 0, 'forest has no texture tiles');
    check(surfaces(worldDetails).size === 1 && JSON.stringify([...surfaces(worldDetails)]) === JSON.stringify([...surfaces(regionalDetails)]), 'same forest changed its source material');
    const shared = Object.keys(worldDetails).filter(key => key in regionalDetails);
    check(shared.every(key => worldDetails[key] === regionalDetails[key]), 'same forest tile differs between maps');
    report.sharedForestTiles = shared.length;
    await page.screenshot({ path: 'output/playwright/atlas-nature-region.png' });
    const client = await page.context().newCDPSession(page);
    await client.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 2 });
    const canvas = await page.locator('.map-viewport-svg').boundingBox();
    const x = canvas.x + canvas.width / 2, y = canvas.y + canvas.height / 2;
    const oldView = await box();
    await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
    await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x + 70, y: y + 30 }] });
    await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    check(await box() !== oldView, 'touch pan failed');
    await client.send('Emulation.setTouchEmulationEnabled', { enabled: false }); await client.detach();
    await page.locator('.map-region-card').focus(); await page.keyboard.press('Enter');
    await page.locator('.map-search-dialog').waitFor(); await page.keyboard.press('Escape');
    await page.locator('.map-search-dialog').waitFor({ state: 'detached' });
    check(await page.locator('.map-region-card').evaluate(n => n === document.activeElement), 'keyboard focus not restored');
    await page.evaluate(() => { document.querySelector('.device').style.zoom = '1.25'; }); await settle();
    check(await page.locator('.map-view-switch button').count() === 3, 'text scale lost navigation');
    await page.evaluate(() => window.mapCheck.unmount()); await settle();
    check(await page.locator('.map-atlas-space').count() === 0, 'spatial SVG not released');
    await page.evaluate(() => window.mapCheck.mount()); await settle();
    check(await page.evaluate(() => window.mapCheck.requests.length) === 0, 'lifecycle called host');
    check(errors.length === 0, errors.join('\n'));
    report.checks.push('source-stable cross-map details, native touch pan, keyboard return, zoom, unmount/remount');
    await page.evaluate(result => { window.mapAtlasReport = result; }, report);
    return { browser: report.browser, themeCases: report.themes.length, checks: report.checks, sharedForestTiles: report.sharedForestTiles, errors };
}
