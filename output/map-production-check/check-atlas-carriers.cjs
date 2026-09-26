async (page) => {
    // Region view of houses whose support is a world-frame plain: the half on the plain paints, the half off it stays hidden.
    const check = (ok, why) => { if (!ok) throw new Error(why); };
    const settle = () => page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    const errors = [], report = [];
    page.on('pageerror', error => errors.push(String(error)));
    for (const width of [1280, 390]) {
        await page.setViewportSize({ width, height: 844 });
        await page.goto('http://127.0.0.1:8765/output/map-production-check/dist/?scene=atlas-carrier');
        // Town has no world position, so enter it through the region list and its detail action.
        await page.locator('.map-region-card').click(); await page.locator('.map-search-result', { hasText: 'Town' }).click();
        await page.locator('.map-place-actions button').click(); await settle();
        await page.locator('.map-fit').click(); await settle(); await page.waitForTimeout(400);
        check(await page.locator('[data-feature="houses"]').count() === 1, 'houses layer missing');
        check(await page.locator('[data-feature="plain"]').count() === 0, 'mask-only carrier was painted');
        // Town-frame points: x=-60 lies off the plain, x=-40 on it; y=25 is the house middle row.
        const points = await page.locator('.map-atlas-space').evaluate(node => [[-60, 25], [-40, 25], [-40, 60]].map(([x, y]) => {
            const m = node.getScreenCTM(); return [m.a * x + m.c * y + m.e, m.b * x + m.d * y + m.f];
        }));
        const shot = await page.screenshot();
        const pixels = await page.evaluate(async ({ data, points }) => {
            const bitmap = await createImageBitmap(await (await fetch('data:image/png;base64,' + data)).blob());
            const canvas = new OffscreenCanvas(bitmap.width, bitmap.height), ctx = canvas.getContext('2d'); ctx.drawImage(bitmap, 0, 0);
            const scale = bitmap.width / innerWidth;
            return points.map(([x, y]) => [...ctx.getImageData(Math.round(x * scale), Math.round(y * scale), 1, 1).data]);
        }, { data: shot.toString('base64'), points });
        const [off, on, ground] = pixels, differs = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]) > 30;
        check(differs(on, ground), 'supported half of houses is not painted');
        check(!differs(off, ground), 'houses painted beyond their world support');
        await page.screenshot({ path: `output/playwright/atlas-carrier-${width}.png` });
        report.push({ width, off, on, ground });
    }
    check(errors.length === 0, errors.join('\n'));
    return report;
}
