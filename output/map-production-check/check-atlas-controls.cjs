async (page) => {
    const base = 'http://127.0.0.1:8765/output/map-production-check/dist/?scene=atlas-geography';
    const check = (ok, why) => { if (!ok) throw new Error(why); };
    const settle = () => page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    const report = [], errors = [];
    page.on('pageerror', error => errors.push(String(error)));
    const controls = () => page.locator('.map-atlas-toolbar button');
    const accessibleControls = async () => {
        const buttons = await controls().evaluateAll(nodes => nodes.map(node => {
            const box = node.getBoundingClientRect();
            const hit = document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2);
            return { width: box.width, height: box.height, hit: node.contains(hit) };
        }));
        check(buttons.length === 5 && buttons.every(button => button.hit && button.width >= 40 && button.height >= 40), 'Atlas control is covered, clipped or undersized');
    };
    const focusVisible = async () => {
        const result = await page.locator('.map-place.is-selected').evaluate(node => {
            const matrix = node.getScreenCTM(), app = document.querySelector('.map-app').getBoundingClientRect();
            const overlays = [...document.querySelectorAll('.map-top, .map-atlas-bottom')].map(element => element.getBoundingClientRect());
            const radius = 20;
            return { x: matrix.e, y: matrix.f, visible: matrix.e > app.left + radius && matrix.e < app.right - radius && matrix.f > app.top + radius && matrix.f < app.bottom - radius && overlays.every(box => matrix.e + radius < box.left || matrix.e - radius > box.right || matrix.f + radius < box.top || matrix.f - radius > box.bottom) };
        });
        check(result.visible, 'focused marker is covered by the detail or controls');
        return result;
    };
    for (const [width, height, embedded] of [[320, 600], [390, 600], [390, 844], [600, 390], [844, 390], [844, 390, true]]) for (const dark of [false, true]) {
        await page.setViewportSize(embedded ? { width: 1280, height: 1000 } : { width, height });
        await page.goto(base);
        if (embedded) await page.locator('.device').evaluate((node, size) => { node.style.width = size[0] + 'px'; node.style.height = size[1] + 'px'; node.style.flex = 'none'; }, [width, height - 43]);
        if (dark) await page.locator('.check-controls button').first().click();
        await page.evaluate(() => {
            const map = window.mapCheck.map();
            map.atlas.locations.forEach(place => { place.brief = '这是包含详细地理与历史介绍的地区。'.repeat(20); });
            window.mapCheck.push(map);
        });
        await settle(); await accessibleControls();
        const initial = await page.evaluate(() => JSON.stringify(window.mapCheck.map()));
        await page.locator('.map-region-card').click(); await page.locator('.map-search-result').first().click(); await settle();
        await accessibleControls();
        const focus = await focusVisible();
        const content = await page.locator('.map-place-content').evaluate(node => ({ height: node.clientHeight, scrollable: node.scrollHeight > node.clientHeight }));
        check(content.height >= 48 && content.scrollable, 'long detail has no usable scrolling area');
        const svgWidth = async () => Number((await page.locator('.map-viewport-svg').getAttribute('viewBox')).split(' ')[2]);
        const before = await svgWidth();
        await page.getByRole('button', { name: '放大地图', exact: true }).click();
        check(await svgWidth() < before, 'zoom-in control did not reach the Atlas camera');
        await page.getByRole('button', { name: '缩小地图', exact: true }).focus(); await page.keyboard.press('Enter');
        check(Math.abs(await svgWidth() - before) < .001, 'keyboard zoom-out did not undo zoom-in');
        await page.locator('.map-fit').click(); await settle();
        await page.getByRole('button', { name: '地图图例', exact: true }).click(); await settle();
        check(await page.locator('.map-key').isVisible(), 'legend did not open');
        await accessibleControls();
        await page.getByRole('button', { name: '地图图例', exact: true }).click();
        await page.getByRole('button', { name: '回到我的位置', exact: true }).click(); await settle();
        await accessibleControls(); await focusVisible();
        check(await page.locator('.map-place.is-current.is-selected').count() === 1, 'locating lost the current place');
        await page.screenshot({ path: `output/playwright/atlas-controls-${width}-${height}${embedded ? '-embedded' : ''}-${dark ? 'dark' : 'light'}.png` });
        await page.evaluate(() => window.mapCheck.back()); await settle();
        check(await page.locator('.map-place-detail').count() === 0, 'back failed to close detail');
        await accessibleControls();
        await page.locator('.map-view-switch button').first().click(); await settle(); await accessibleControls();
        check(await page.evaluate(() => JSON.stringify(window.mapCheck.map())) === initial, 'toolbar navigation changed map data');
        check(await page.evaluate(() => window.mapCheck.requests.length) === 0, 'toolbar navigation called the host');
        report.push({ width, height, embedded: !!embedded, dark, focus, content, controls: true });
    }
    await page.setViewportSize({ width: 390, height: 844 }); await page.goto(base);
    await page.evaluate(() => { document.querySelector('.device').style.zoom = '1.25'; }); await settle();
    await page.getByRole('button', { name: '回到我的位置', exact: true }).click(); await settle();
    await accessibleControls(); await focusVisible();
    await page.locator('.map-fit').click(); await settle();
    const client = await page.context().newCDPSession(page);
    const zoom = page.getByRole('button', { name: '放大地图', exact: true });
    const target = await zoom.boundingBox(), beforeTouch = await page.locator('.map-viewport-svg').getAttribute('viewBox');
    await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: target.x + target.width / 2, y: target.y + target.height / 2 }] });
    await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await page.waitForFunction(before => document.querySelector('.map-viewport-svg').getAttribute('viewBox') !== before, beforeTouch, { timeout: 5000 });
    await client.detach();
    await page.evaluate(() => {
        window.mapCheck.push(window.mapCheck.map(), { maintenanceStatus: 'maintaining' });
        window.mapCheck.push(window.mapCheck.map(), { maintenanceStatus: 'error', maintenanceMessage: 'fixture-maintenance-failure' });
    }); await settle();
    check(await page.locator('.map-notice.is-error').isVisible(), 'failure notice was hidden by the toolbar layout');
    await accessibleControls();
    report.push({ scaledControls: true, nativeTouch: true, notice: true });
    check(!errors.length, errors.join('\n'));
    return report;
}
