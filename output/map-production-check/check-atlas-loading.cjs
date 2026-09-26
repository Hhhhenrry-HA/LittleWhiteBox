async (page) => {
    // Real production geography, unchanged camera. Deliberately hold workers to inspect every loading phase.
    const check = (ok, why) => { if (!ok) throw new Error(why); };
    const frame = () => page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
    const client = await page.context().newCDPSession(page);
    const errors = [], report = [];
    page.on('pageerror', e => errors.push(String(e)));
    page.on('console', e => { if (e.type() === 'warning' && e.text().includes('atlas tile failed')) errors.push(e.text()); });
    await page.addInitScript(() => {
        const audit = window.atlasAudit = { held: true, jobs: [], results: [], live: new Map(), peak: 0, workers: new Set(), frames: [] };
        const create = URL.createObjectURL, revoke = URL.revokeObjectURL, Original = Worker;
        let bytes = 0;
        URL.createObjectURL = function(blob) {
            const url = create.call(this, blob);
            if (blob.type === 'image/png') {
                // Encoded PNG has a small positive overhead; twice its size bounds PNG + decoded RGBA.
                audit.live.set(url, blob.size * 2); bytes += blob.size * 2; audit.peak = Math.max(audit.peak, bytes);
            }
            return url;
        };
        URL.revokeObjectURL = function(url) { bytes -= audit.live.get(url) || 0; audit.live.delete(url); return revoke.call(this, url); };
        window.Worker = class extends Original {
            constructor(...args) { super(...args); this.queued = []; audit.workers.add(this); this.addEventListener('message', e => audit.results.push(e.data.id)); }
            postMessage(job) { audit.jobs.push(job.id); if (audit.held) this.queued.push(job); else super.postMessage(job); }
            flush() { for (const job of this.queued.splice(0)) super.postMessage(job); }
            terminate() { this.queued = []; audit.workers.delete(this); super.terminate(); }
        };
        audit.release = () => { audit.held = false; audit.workers.forEach(w => w.flush()); };
        const sample = () => {
            const svg = document.querySelector('.map-viewport-svg');
            if (svg) audit.frames.push({ at: performance.now(), view: svg.getAttribute('viewBox'), images: svg.querySelectorAll('.map-atlas-tile').length, placeholders: svg.querySelectorAll('.map-atlas-placeholder path').length });
            requestAnimationFrame(sample);
        };
        requestAnimationFrame(sample);
    });
    const ready = async () => {
        await page.waitForFunction(() => window.atlasAudit.jobs.length === window.atlasAudit.results.length && document.querySelectorAll('.map-atlas-tile').length > 0 && !document.querySelector('.map-atlas-fallback'), null, { timeout: 30000 });
        await frame();
    };
    const capture = label => page.screenshot({ path: `output/playwright/atlas-loading-${label}.png` });
    await page.context().tracing.start({ screenshots: true, snapshots: true });
    for (const [width, dpr] of [[1280, 1], [390, 3]]) {
        await page.setViewportSize({ width, height: 844 });
        await client.send('Emulation.setDeviceMetricsOverride', { width, height: 844, deviceScaleFactor: dpr, mobile: false });
        await page.goto('http://127.0.0.1:8765/output/map-production-check/dist/?scene=atlas-geography');
        await page.locator('.map-atlas-placeholder path').first().waitFor(); await frame();
        const opening = await page.evaluate(() => ({
            view: document.querySelector('.map-viewport-svg').getAttribute('viewBox'),
            images: document.querySelectorAll('.map-atlas-tile').length,
            missing: window.mapCheck.map().atlas.features.filter(f => f.form === 'ridge' || f.material === 'forest').filter(f => !document.querySelector(`[data-feature="${f.id}"] .map-atlas-placeholder path`)).map(f => f.id),
        }));
        check(opening.images === 0 && opening.missing.length === 0, 'cold opening omitted geography: ' + JSON.stringify(opening));
        await capture(`${width}-cold`);
        const start = Date.now();
        await page.evaluate(() => window.atlasAudit.release()); await ready();
        const loadedMs = Date.now() - start;
        check(await page.locator('.map-viewport-svg').getAttribute('viewBox') === opening.view, 'loading moved the camera');
        await capture(`${width}-ready`);
        const before = await page.locator('.map-atlas-tile').evaluateAll(nodes => nodes.map(n => n.getAttribute('href')));
        await page.evaluate(() => { window.atlasAudit.held = true; });
        for (let i = 0; i < 3; i++) await page.getByRole('button', { name: '放大地图', exact: true }).click();
        await frame();
        const zoomUrls = await page.locator('.map-atlas-tile').evaluateAll(nodes => nodes.map(n => n.getAttribute('href')));
        check(zoomUrls.length > 0 && zoomUrls.some(url => before.includes(url)), 'zoom discarded the previous images before replacements were available');
        await capture(`${width}-zoom-pending`);
        await page.evaluate(() => window.atlasAudit.release()); await ready();
        await page.evaluate(() => window.mapCheck.unmount()); await frame();
        const jobs = await page.evaluate(() => { window.atlasAudit.held = true; return window.atlasAudit.jobs.length; });
        await page.evaluate(() => window.mapCheck.mount()); await frame();
        const reopen = await page.evaluate(() => ({ images: document.querySelectorAll('.map-atlas-tile').length, jobs: window.atlasAudit.jobs.length, view: document.querySelector('.map-viewport-svg').getAttribute('viewBox') }));
        check(reopen.images > 0 && reopen.view === opening.view, 'same-chat reopen lost cached coverage or changed opening camera');
        await capture(`${width}-reopen`);
        await page.evaluate(() => window.atlasAudit.release());
        // The cache remains on app close; frame reinitialization releases it even while the app is closed.
        const peakMiB = await page.evaluate(() => window.atlasAudit.peak / 2 ** 20);
        check(peakMiB <= 48, 'live texture memory exceeded 48 MiB: ' + peakMiB);
        await page.evaluate(() => window.mapCheck.resetChat()); await frame();
        await page.waitForFunction(() => window.atlasAudit.live.size === 0);
        report.push({ width, dpr, loadedMs, peakMiB, firstFrameCovered: true, zoomReused: true, reopenImages: reopen.images, reopenJobs: reopen.jobs - jobs, resetUrls: 0, sampledFrames: await page.evaluate(() => window.atlasAudit.frames.length) });
    }
    await page.context().tracing.stop({ path: 'output/playwright/atlas-loading-continuous.zip' });
    await client.send('Emulation.clearDeviceMetricsOverride'); await client.detach();
    check(errors.length === 0, errors.join('\n'));
    return report;
}
