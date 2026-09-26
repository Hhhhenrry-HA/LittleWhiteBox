async (page) => {
    // View-bounded texture tiles: worker rendering, bounded decoded pixels, density following zoom, seams, pan reuse and main-thread stalls.
    const base = 'http://127.0.0.1:8765/output/map-production-check/dist/';
    const check = (ok, why) => { if (!ok) throw new Error(why); };
    const settle = () => page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    const tilesSettled = async () => {
        let last = '', since = Date.now();
        for (const start = Date.now(); Date.now() - start < 30000;) {
            const [pending, keys] = await page.evaluate(() => [document.querySelectorAll('.map-atlas-fallback').length, [...document.querySelectorAll('.map-atlas-tile')].map(n => n.dataset.tile).join()]);
            if (pending || !keys || keys !== last) { last = keys; since = Date.now(); } else if (Date.now() - since > 400) { return keys.split(',').length; }
            await page.waitForTimeout(100);
        }
        throw new Error('atlas tiles did not settle');
    };
    const zoom = async (name, times) => { for (let i = 0; i < times; i++) { await page.getByRole('button', { name, exact: true }).click(); await settle(); } };
    // Displayed tiles: key, href, level, decoded size and device pixels per texel.
    const displayed = feature => page.locator(`[data-feature="${feature}"] .map-atlas-tile`).evaluateAll(async nodes => Promise.all(nodes.map(async node => {
        const img = new Image(); img.src = node.getAttribute('href'); await img.decode();
        const cell = [...node.closest('.map-atlas-material').querySelectorAll('.map-atlas-cell')].find(n => n.dataset.tile === node.dataset.tile);
        const box = cell.getBoundingClientRect(), scale = box.width / Number(cell.getAttribute('width'));
        return { key: node.dataset.tile, href: node.getAttribute('href'), level: Number(node.dataset.tile.split('@')[1].split('/')[0]), texels: img.naturalWidth * img.naturalHeight, perTexel: Number(node.getAttribute('width')) * scale * devicePixelRatio / img.naturalWidth, left: box.left, top: box.top, right: box.right, bottom: box.bottom };
    })));
    const errors = [], report = {};
    page.on('pageerror', error => errors.push(String(error)));
    page.on('console', message => { if (message.type() === 'warning' && message.text().includes('atlas tile failed')) errors.push(message.text()); });

    await page.setViewportSize({ width: 1280, height: 844 }); await page.goto(base + '?scene=atlas-geography');
    await page.evaluate(() => {
        const map = window.mapCheck.fixture('empty');
        map.atlas.features = [
            { id: 'ground', frame: 'atlas', role: 'surface', material: 'grass', geometry: { shape: 'rect', x: 0, y: 0, width: 6000, height: 4000 } },
            { id: 'wood', frame: 'atlas', role: 'cover', material: 'forest', form: 'forest', geometry: { shape: 'rect', x: 500, y: 400, width: 5000, height: 3200 } },
            { id: 'river', frame: 'atlas', role: 'channel', material: 'water', geometry: { shape: 'path', points: [[0, 2000], [3000, 1700], [6000, 2300]], width: 120 } },
            { id: 'range', frame: 'atlas', role: 'relief', material: 'rock', form: 'ridge', geometry: { shape: 'rect', x: 3600, y: 300, width: 1800, height: 900 } },
        ];
        window.mapCheck.push(map);
    });
    await settle(); await page.locator('.map-fit').click(); await settle();
    await tilesSettled();
    report.worker = await page.evaluate(() => performance.getEntriesByType('resource').filter(e => /atlas-tiles\.worker-[\w-]+\.js/.test(e.name)).map(e => e.name.split('/').pop()));
    check(report.worker.length > 0, 'tile worker script was not loaded');

    // Screen density targets 2^.25 px; this overlapping stress fixture may trade one level for the hard working-set budget.
    report.density = [];
    for (const step of [0, 2, 2, 2]) {
        await zoom('放大地图', step); await tilesSettled();
        const tiles = await displayed('wood'), finest = -2, level = Math.min(...tiles.map(t => t.level));
        const coarse = tiles.filter(t => t.level > finest && t.perTexel > 2 ** 1.25 + .02);
        const texels = (await Promise.all(['ground', 'wood', 'river', 'range'].map(displayed))).flat().reduce((sum, t) => sum + t.texels, 0);
        check(coarse.length === 0, 'tiles coarser than the screen: ' + JSON.stringify(coarse.slice(0, 3)));
        check(texels * 4 <= 48 * 2 ** 20, 'displayed tiles exceed the decoded budget: ' + texels * 4);
        check(new Set(tiles.map(t => t.level)).size === 1, 'settled view mixes levels for one feature');
        report.density.push({ level, tiles: tiles.length, perTexel: Math.max(...tiles.map(t => t.perTexel)).toFixed(3), decodedMB: (texels * 4 / 2 ** 20).toFixed(1) });
    }
    // One zoom step is about 1.25x, so a level can span two steps; zooming in never coarsens and ends finer.
    check(report.density.every((d, i) => !i || d.level <= report.density[i - 1].level) && report.density.at(-1).level < report.density[0].level, 'tile level did not follow zoom: ' + JSON.stringify(report.density));

    // Seam: across a tile boundary the column difference must look like the texture, not a hairline.
    const tiles = await displayed('wood');
    const pair = tiles.flatMap(a => tiles.filter(b => Math.abs(b.left - a.right) < 3 && b.top === a.top && a.bottom - a.top > 60 && b.left > 20 && b.left < 1240).map(b => [a, b]))[0];
    check(pair, 'no horizontal tile boundary on screen');
    const seamX = pair[1].left, y0 = Math.max(pair[0].top, 120) + 10;
    const style = await page.addStyleTag({ content: 'body * { visibility: hidden !important; } .map-atlas-space, .map-atlas-space * { visibility: visible !important; }' });
    const shot = await page.screenshot(); await style.evaluate(node => node.remove());
    report.seam = await page.evaluate(async ({ data, seamX, y0 }) => {
        const bitmap = await createImageBitmap(await (await fetch('data:image/png;base64,' + data)).blob());
        const canvas = new OffscreenCanvas(bitmap.width, bitmap.height), ctx = canvas.getContext('2d'); ctx.drawImage(bitmap, 0, 0);
        const scale = bitmap.width / innerWidth, x = Math.round(seamX * scale), rows = 40;
        const pixels = ctx.getImageData(x - 12, Math.round(y0 * scale), 24, rows).data, diffs = [];
        for (let c = 1; c < 24; c++) {
            let sum = 0;
            for (let r = 0; r < rows; r++) { for (let k = 0; k < 3; k++) { sum += Math.abs(pixels[(r * 24 + c) * 4 + k] - pixels[(r * 24 + c - 1) * 4 + k]); } }
            diffs.push(sum / rows);
        }
        const at = [10, 11, 12].map(i => diffs[i]), rest = diffs.filter((_, i) => i < 9 || i > 13);
        return { boundary: Math.max(...at).toFixed(1), textureMax: Math.max(...rest).toFixed(1), textureMean: (rest.reduce((a, b) => a + b, 0) / rest.length).toFixed(1) };
    }, { data: shot.toString('base64'), seamX, y0 });
    check(Number(report.seam.boundary) <= Number(report.seam.textureMax) * 1.25 + 2, 'visible seam at tile boundary: ' + JSON.stringify(report.seam));

    // Pan within one level keeps the tiles still on screen: same keys, same images, no re-render.
    const before = Object.fromEntries((await displayed('wood')).map(t => [t.key, t.href]));
    const client = await page.context().newCDPSession(page);
    await client.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 2 });
    const touch = async (dx, dy) => {
        const x = 640, y = 420;
        await client.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
        for (let i = 1; i <= 6; i++) { await client.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x + dx * i / 6, y: y + dy * i / 6 }] }); }
        await client.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    };
    const viewBefore = await page.locator('.map-viewport-svg').getAttribute('viewBox');
    await touch(-180, -60); await settle();
    check(await page.locator('.map-viewport-svg').getAttribute('viewBox') !== viewBefore, 'touch pan did not move the map');
    await tilesSettled();
    const after = Object.fromEntries((await displayed('wood')).map(t => [t.key, t.href]));
    const kept = Object.keys(before).filter(key => key in after);
    check(kept.length > 0 && kept.every(key => before[key] === after[key]), 'pan re-rendered tiles that stayed on screen');
    report.pan = { before: Object.keys(before).length, after: Object.keys(after).length, kept: kept.length };

    // Main-thread stalls while tiles stream under 4x CPU throttling. Desktop emulation, not a phone measurement.
    await page.evaluate(() => { window.atlasLongTasks = []; new PerformanceObserver(list => { for (const e of list.getEntries()) { window.atlasLongTasks.push(e.duration); } }).observe({ type: 'longtask' }); });
    await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    const started = Date.now();
    await page.locator('.map-fit').click(); await settle(); await tilesSettled();
    await zoom('放大地图', 3); await touch(220, 90); await settle(); await touch(-160, 140); await settle(); await tilesSettled();
    await zoom('缩小地图', 2); await tilesSettled();
    const streamMs = Date.now() - started;
    await client.send('Emulation.setCPUThrottlingRate', { rate: 1 });
    await client.send('Emulation.setTouchEmulationEnabled', { enabled: false }); await client.detach();
    const long = await page.evaluate(() => [...window.atlasLongTasks]);
    // Control: a deliberate 120ms block must be observed, so zero stalls above is a measurement, not a silent observer.
    const control = await page.evaluate(async () => { setTimeout(() => { const t = performance.now(); while (performance.now() - t < 120); }); await new Promise(r => setTimeout(r, 400)); return window.atlasLongTasks.length; });
    check(control > long.length, 'long task observer recorded nothing');
    report.throttled = { streamMs, longTasks: long.length, maxMs: Math.round(Math.max(0, ...long)), totalMs: Math.round(long.reduce((a, b) => a + b, 0)) };

    await page.screenshot({ path: 'output/playwright/atlas-tiles-1280.png' });
    await page.evaluate(() => window.mapCheck.unmount()); await settle();
    check(await page.locator('.map-atlas-tile').count() === 0, 'tiles retained after unmount');
    check(errors.length === 0, errors.join('\n'));
    check(await page.evaluate(() => window.mapCheck.requests.length) === 0, 'browsing called the host');
    return report;
}
