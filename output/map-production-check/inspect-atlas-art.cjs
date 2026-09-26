async (page) => {
    const base = 'http://127.0.0.1:8765/output/map-production-check/dist/';
    const result = [];
    for (const width of [1280, 390]) {
        await page.setViewportSize({ width, height: 844 });
        for (const theme of ['nature', 'desert', 'city', 'ocean', 'megastructure', 'space', 'fantasy']) {
            await page.goto(base + '?scene=atlas-' + theme);
            await page.locator('.map-atlas-space image').first().waitFor();
            await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
            await page.screenshot({ path: `output/playwright/atlas-art-${theme}-${width}.png` });
            result.push({ width, theme, viewBox: await page.locator('.map-viewport-svg').getAttribute('viewBox') });
        }
    }
    return result;
}
