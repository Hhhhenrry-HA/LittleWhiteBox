// CLI-driven browser scenarios. Helper placements go through the actual Host, not a fake client state.
const origin = 'http://127.0.0.1:18913';
async function api(page, path, body) {
    const response = body ? await page.request.post(`${origin}/__stacking/${path}`, { data: body }) : await page.request.get(`${origin}/__stacking/${path}`);
    const result = await response.json(); if (!result.ok) { throw new Error(JSON.stringify(result)); } return result.result;
}
function frame(page) { return page.frameLocator('iframe'); }
async function enter(page) {
    await page.goto(origin); await frame(page).getByRole('button', { name: '游戏', exact: true }).click();
    await frame(page).getByRole('button', { name: '云上叠叠屋 去搭小楼' }).click();
    await frame(page).locator('.stack-controls').waitFor();
}
async function start(page) {
    await frame(page).getByRole('button', { name: '开工 · 50 金币', exact: true }).click();
    await frame(page).locator('.stack-dialog').getByRole('button', { name: '开工 · 50 金币', exact: true }).click();
    await frame(page).getByRole('button', { name: '落下 ↓', exact: true }).waitFor();
}
async function prepared(page, count, seed = 17) {
    await api(page, `reset?seed=${seed}`); await enter(page); await start(page);
    let inspection = await api(page, 'inspect');
    for (let i = 0; i < count; i++) {
        await api(page, 'action', { type: 'game/stacking/act', payload: { chatIdentity: 'stacking-preview', actionId: `browser-${Date.now()}-${i}`,
            revision: inspection.view.revision, command: { type: 'drop', ...inspection.route[i] } } });
        inspection = await api(page, 'inspect');
    }
    // Re-enter via production navigation: production client reads the confirmed Host result.
    await frame(page).getByRole('button', { name: '返回游戏大厅', exact: true }).click();
    await frame(page).getByRole('button', { name: '云上叠叠屋 去搭小楼' }).click();
    await frame(page).locator('.stack-hud').waitFor();
    return inspection;
}
export async function cashouts(page) {
    const evidence = [];
    for (const [count, prize] of [[8, 50], [12, 80], [16, 120], [20, 200]]) {
        await prepared(page, count);
        if (count < 20) {
            await frame(page).getByRole('button', { name: `收工 +${prize}`, exact: true }).click();
            await frame(page).locator('.stack-dialog').getByRole('button', { name: `收工 +${prize}`, exact: true }).click();
        }
        await frame(page).locator('.stack-result').waitFor();
        await page.waitForTimeout(900);
        const result = await api(page, 'inspect');
        if (result.view.balance !== 50 + prize || result.view.award !== prize) { throw new Error('wallet mismatch'); }
        evidence.push({ count, balance: result.view.balance, award: result.view.award, moves: result.view.active.moves.length,
            ledger: result.document.partitions.economy.transactions.filter(t => t.kind.startsWith('stacking_')).map(t => ({ kind: t.kind, amount: t.amount })) });
        await page.screenshot({ path: `output/playwright/stacking-${count}-result.png` });
    }
    return evidence;
}
export async function lossRecovery(page) {
    await api(page, 'reset'); await enter(page); await start(page);
    await frame(page).getByRole('button', { name: '调头', exact: true }).click();
    await api(page, 'mode?value=unknown');
    await frame(page).getByRole('button', { name: '落下 ↓', exact: true }).click();
    await frame(page).getByRole('button', { name: '复核原操作' }).waitFor();
    const pending = await api(page, 'inspect');
    if (pending.view.balance !== 50 || pending.view.active.moves.length !== 0) { throw new Error('unconfirmed state published'); }
    const disabled = await frame(page).getByRole('button', { name: '落下 ↓', exact: true }).isDisabled();
    const content = page.frames().find(f => f.url().includes('xiaobai-os.html'));
    const intent = await content.evaluate(() => JSON.parse(localStorage.getItem('LittleWhiteBox:stacking:pending')));
    // Discard Host RAM and reload the actual page before confirmation.
    await api(page, 'reload'); await enter(page);
    await frame(page).getByRole('button', { name: '复核原操作' }).waitFor();
    await frame(page).getByRole('button', { name: '复核原操作' }).click();
    await frame(page).getByRole('button', { name: '复核原操作' }).waitFor({ state: 'hidden' });
    const confirmed = await api(page, 'inspect');
    if (confirmed.view.active.moves.length !== 1 || confirmed.view.balance !== 50 || !disabled) { throw new Error('recovery mismatch'); }
    if (confirmed.view.active.moves[0].x !== intent.request.command.x || confirmed.view.active.moves[0].direction !== intent.request.command.direction) { throw new Error('hard reload changed pose'); }
    await api(page, 'reload'); await enter(page);
    const reloaded = await api(page, 'inspect');
    if (JSON.stringify(reloaded.view.active) !== JSON.stringify(confirmed.view.active)) { throw new Error('reload changed run'); }
    await page.screenshot({ path: 'output/playwright/stacking-recovered-drop.png' });
    return { disabledWhileUnknown: disabled, acceptedPose: confirmed.view.active.moves[0], balance: confirmed.view.balance, restoredSameRun: true };
}
export async function presentation(page) {
    await prepared(page, 20);
    if (await frame(page).getByRole('button', { name: '声音开', exact: true }).count()) { await frame(page).getByRole('button', { name: '声音开', exact: true }).click(); }
    await frame(page).getByRole('button', { name: '声音关', exact: true }).waitFor();
    await api(page, 'reload'); await enter(page);
    if (!await frame(page).getByRole('button', { name: '声音关', exact: true }).count()) { throw new Error('sound reset'); }
    await frame(page).getByRole('button', { name: '向右转动小楼' }).click();
    const downloadPromise = page.waitForEvent('download');
    await frame(page).getByRole('button', { name: '保存留影' }).click();
    const download = await downloadPromise; await download.saveAs('output/playwright/stacking-export.png');
    await page.setViewportSize({ width: 390, height: 844 }); await page.waitForTimeout(900); await page.screenshot({ path: 'output/playwright/stacking-mobile.png' });
    await page.evaluate(() => window.stackingPreview.theme('dark')); await page.screenshot({ path: 'output/playwright/stacking-dark.png' });
    const content = page.frames().find(f => f.url().includes('xiaobai-os.html'));
    const sizes = await content.evaluate(() => {
        const canvas = document.querySelector('.stack-canvas canvas'), room = document.querySelector('.stacking-room');
        return { pixels: canvas.width * canvas.height, width: canvas.width, height: canvas.height, overflowX: room.scrollWidth > room.clientWidth };
    });
    await frame(page).getByRole('button', { name: '玩法', exact: true }).click(); await page.screenshot({ path: 'output/playwright/stacking-rules-mobile.png' });
    await frame(page).locator('.stack-dialog').getByRole('button', { name: '关闭', exact: true }).click();
    await content.evaluate(() => {
        window.__stackFontSizes = [...document.querySelectorAll('.stacking-room, .stacking-room *')].map(el => [el, el.style.fontSize, parseFloat(getComputedStyle(el).fontSize)]);
        window.__stackFontSizes.forEach(([el, , size]) => { el.style.fontSize = size * 2 + 'px'; });
    });
    await page.waitForTimeout(900); await page.screenshot({ path: 'output/playwright/stacking-text-200.png' });
    await content.evaluate(() => { window.__stackFontSizes.forEach(([el, size]) => { el.style.fontSize = size; }); delete window.__stackFontSizes; });
    await page.setViewportSize({ width: 844, height: 390 }); await page.waitForTimeout(900); await page.screenshot({ path: 'output/playwright/stacking-landscape.png' });
    const before = await api(page, 'inspect');
    await content.evaluate(() => { const canvas = document.querySelector('.stack-canvas canvas'); canvas.getContext('webgl2').getExtension('WEBGL_lose_context').loseContext(); });
    await frame(page).getByRole('button', { name: '重载画面', exact: true }).waitFor();
    await frame(page).getByRole('button', { name: '重载画面', exact: true }).click();
    await frame(page).getByRole('button', { name: '重载画面', exact: true }).waitFor({ state: 'hidden' });
    const after = await api(page, 'inspect');
    if (JSON.stringify(before.view.active) !== JSON.stringify(after.view.active) || before.view.balance !== after.view.balance) { throw new Error('graphics changed run'); }
    return { soundPersisted: true, export: download.suggestedFilename(), ...sizes, graphicsRestored: true };
}

export async function timedTower(page) {
    // Browser-controlled active time, real click handlers and original crane formula. No pose injection.
    await page.clock.resume(); await page.setViewportSize({ width: 390, height: 844 }); await api(page, 'reset'); await enter(page);
    await page.clock.install({ time: new Date(0) }); await page.clock.pauseAt(new Date(10000)); await start(page);
    const accepted = []; let direction = 1, timeMs = 0;
    for (let i = 0; i < 20; i++) {
        const before = await api(page, 'inspect'), target = before.route[i], motion = before.motion;
        if (direction !== target.direction) { await frame(page).getByRole('button', { name: '调头', exact: true }).click(); direction = target.direction; }
        const theta = Math.asin(target.x / motion.rail), tau = Math.PI * 2;
        const wait = Math.min(...[theta, Math.PI - theta].map(angle => ((angle - motion.phase) % tau + tau) % tau / motion.speed));
        const milliseconds = Math.round(wait * 1000); timeMs += milliseconds;
        await page.clock.runFor(milliseconds);
        await frame(page).getByRole('button', { name: '落下 ↓', exact: true }).click();
        // The semantic presentation state begins only after the Host confirms this move.
        await frame(page).locator('[data-stack-presenting="true"]').waitFor();
        let presentationTime = 0;
        while (await frame(page).locator('.stacking-room').getAttribute('data-stack-presenting') === 'true') {
            if (presentationTime > 5000) { throw new Error('confirmed placement did not finish presenting'); }
            await page.clock.runFor(16); presentationTime += 16; timeMs += 16;
        }
        const after = await api(page, 'inspect');
        if (after.view.board.failure || after.view.active.moves.length !== i + 1) { throw new Error(JSON.stringify({ at: i, target, actual: after.view.active.moves.at(-1), failure: after.view.board.failure })); }
        accepted.push(after.view.active.moves.at(-1));
        if (i === 7 || i === 15) { await page.screenshot({ path: `output/playwright/stacking-timed-${i + 1}.png` }); }
    }
    await page.clock.runFor(1500); await page.screenshot({ path: 'output/playwright/stacking-timed-20.png' });
    await page.clock.resume();
    return { actualUiDrops: accepted.length, accepted, simulatedActiveSeconds: timeMs / 1000, result: (await api(page, 'inspect')).view.award };
}

export async function lifecycle(page) {
    await page.addInitScript(() => {
        const probe = window.__stackProbe = { draws: 0, created: 0, lost: 0, audioCreated: 0, audioClosed: 0, tones: [] };
        const seen = new WeakSet(), original = HTMLCanvasElement.prototype.getContext;
        HTMLCanvasElement.prototype.getContext = function (...args) {
            const context = original.apply(this, args);
            if (args[0] === 'webgl2' && context && !seen.has(context)) {
                seen.add(context); probe.created++; this.addEventListener('webglcontextlost', () => probe.lost++);
                for (const method of ['drawArrays', 'drawElements']) {
                    const draw = context[method]; context[method] = function (...inputs) { probe.draws++; return draw.apply(this, inputs); };
                }
            }
            return context;
        };
        const NativeAudio = window.AudioContext;
        window.AudioContext = class extends NativeAudio {
            constructor(...args) { super(...args); probe.audioCreated++; }
            close() { probe.audioClosed++; return super.close(); }
            createOscillator() { const node = super.createOscillator(), start = node.start;
                node.start = function (...args) { probe.tones.push(node.frequency.value); return start.apply(this, args); }; return node; }
        };
    });
    await api(page, 'reset'); await page.setViewportSize({ width: 390, height: 844 }); await enter(page);
    if (await frame(page).getByRole('button', { name: '声音关', exact: true }).count()) { await frame(page).getByRole('button', { name: '声音关', exact: true }).click(); }
    await start(page); await page.waitForTimeout(900);
    const content = page.frames().find(f => f.url().includes('xiaobai-os.html'));
    const probe = () => content.evaluate(() => ({ ...window.__stackProbe }));
    const before = await probe(); await page.waitForTimeout(300); const active = await probe();
    if (active.draws <= before.draws) { throw new Error('crane not drawing'); }
    // This automated Chromium reports visible even when another tab is frontmost.
    // Exercise the actual browser event gate explicitly; do not claim a native background-device test.
    await content.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, get: () => true }); document.dispatchEvent(new Event('visibilitychange')); });
    await page.waitForTimeout(200); const hiddenBefore = await probe(); await page.waitForTimeout(300); const hiddenAfter = await probe();
    await content.evaluate(() => { delete document.hidden; document.dispatchEvent(new Event('visibilitychange')); });
    if (hiddenBefore.draws !== hiddenAfter.draws) { throw new Error('background renderer not paused'); }
    await frame(page).locator('.stacking-room').focus(); await page.keyboard.press('ArrowLeft'); await page.keyboard.press('Space');
    await page.waitForTimeout(800);
    const keyboard = await api(page, 'inspect');
    if (keyboard.view.active.moves.length !== 1 || keyboard.view.active.moves[0].direction !== -1) { throw new Error('keyboard action mismatch'); }
    await frame(page).getByRole('button', { name: '返回游戏大厅' }).click(); await page.waitForTimeout(200);
    const left = await probe(); await page.waitForTimeout(300); const quiet = await probe();
    if (quiet.draws !== left.draws) { throw new Error('cached room is still drawing'); }
    await frame(page).getByRole('button', { name: '小白搬家 两章 · 3D 解谜' }).click(); await page.waitForTimeout(300);
    const disposed = await probe();
    if (disposed.lost < 1 || disposed.audioClosed < 1) { throw new Error('eviction did not release stacking resources'); }
    await api(page, 'reset'); await enter(page);
    const cdp = await page.context().newCDPSession(page);
    await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true });
    async function tap(locator) {
        const box = await locator.boundingBox();
        await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: box.x + box.width / 2, y: box.y + box.height / 2 }] });
        await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    }
    await tap(frame(page).getByRole('button', { name: '开工 · 50 金币', exact: true }));
    await frame(page).locator('.stack-dialog').waitFor();
    await tap(frame(page).locator('.stack-dialog').getByRole('button', { name: '开工 · 50 金币', exact: true }));
    await frame(page).getByRole('button', { name: '落下 ↓', exact: true }).waitFor();
    await tap(frame(page).getByRole('button', { name: '落下 ↓', exact: true })); await page.waitForTimeout(800);
    const touch = await api(page, 'inspect');
    if (touch.view.active.moves.length !== 1) { throw new Error('touch duplicated or lost drop'); }
    await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: false }); await cdp.detach();
    return { visibilitySource: 'emulated-document-hidden-event', activeDrawCalls: active.draws - before.draws, backgroundDrawCalls: hiddenAfter.draws - hiddenBefore.draws,
        deactivatedDrawCalls: quiet.draws - left.draws, releasedContexts: disposed.lost, audioContextsClosed: disposed.audioClosed,
        tonesScheduled: disposed.tones.length, keyboardPose: keyboard.view.active.moves[0], touchDrops: touch.view.active.moves.length };
}

export async function endings(page) {
    await page.setViewportSize({ width: 390, height: 844 });
    const preparedRun = await prepared(page, 8);
    await api(page, 'action', { type: 'game/stacking/act', payload: { chatIdentity: 'stacking-preview', actionId: 'browser-losing-placement',
        revision: preparedRun.view.revision, command: { type: 'drop', x: 2900, direction: 1 } } });
    await enter(page); await frame(page).locator('[data-stack-action="replay"]').waitFor(); await page.waitForTimeout(900);
    const failed = await api(page, 'inspect');
    if (failed.view.award !== 0 || failed.view.balance !== 50 || !failed.view.board.failure) { throw new Error('loss paid unbanked coins'); }
    const photo = page.waitForEvent('download'); await frame(page).getByRole('button', { name: '保存留影' }).click();
    await (await photo).saveAs('output/playwright/stacking-pre-collapse.png');
    await page.screenshot({ path: 'output/playwright/stacking-failure.png' });
    await frame(page).locator('[data-stack-action="replay"]').click();
    await frame(page).locator('[data-stack-presenting="false"]').waitFor();
    await page.screenshot({ path: 'output/playwright/stacking-collapse.png' });
    await start(page); await frame(page).getByRole('button', { name: '放弃本局' }).click();
    await frame(page).locator('.stack-dialog').getByRole('button', { name: '确定', exact: true }).click();
    await frame(page).locator('.stack-result').waitFor();
    const abandoned = await api(page, 'inspect');
    if (abandoned.view.balance !== 0 || abandoned.view.award !== 0 || abandoned.view.active.end !== 'abandon') { throw new Error('abandon wallet mismatch'); }
    await frame(page).getByRole('button', { name: '最高 8 间', exact: true }).click();
    await frame(page).getByRole('button', { name: '返回本局' }).waitFor(); await page.screenshot({ path: 'output/playwright/stacking-best.png' });
    await frame(page).getByRole('button', { name: '返回本局' }).click();
    await api(page, 'chat?id=stacking-other-chat'); await enter(page);
    const switched = await api(page, 'inspect');
    if (JSON.stringify(abandoned.view.active) !== JSON.stringify(switched.view.active) || switched.view.balance !== 0) { throw new Error('chat reset run'); }
    return { lossBalance: failed.view.balance, lossAward: failed.view.award, abandonedBalance: abandoned.view.balance,
        abandonedAward: abandoned.view.award, bestStableHouses: 8, chatPreserved: true };
}

export async function balanceFailure(page) {
    await page.clock.resume(); await page.setViewportSize({ width: 390, height: 844 });
    const before = await prepared(page, 14);
    // Seed 17's certified prefix supports fourteen houses; a centred next house overloads a lower joint.
    await api(page, 'action', { type: 'game/stacking/act', payload: { chatIdentity: 'stacking-preview', actionId: 'browser-lower-joint',
        revision: before.view.revision, command: { type: 'drop', x: 0, direction: 1 } } });
    await enter(page); await frame(page).locator('[data-stack-action="replay"]').waitFor();
    const failed = await api(page, 'inspect');
    if (failed.view.board.failure !== 'balance' || failed.view.board.weak >= 14) { throw new Error('expected a lower bearing joint to fail'); }
    // Pause only after navigation: the Shell's route transitions must be allowed to finish.
    await page.clock.install({ time: new Date(0) }); await page.clock.pauseAt(new Date(10000));
    await frame(page).locator('[data-stack-action="replay"]').click();
    await frame(page).locator('[data-stack-presenting="true"]').waitFor();
    await page.clock.runFor(1150); await page.screenshot({ path: 'output/playwright/stacking-balance-falling.png' });
    await page.clock.runFor(1000); await frame(page).locator('[data-stack-presenting="false"]').waitFor();
    await page.screenshot({ path: 'output/playwright/stacking-balance-restored.png' });
    await frame(page).locator('[data-stack-action="replay"]').click(); await page.clock.runFor(2200);
    const replayed = await api(page, 'inspect');
    if (failed.view.balance !== 50 || failed.view.award !== 0 || JSON.stringify(failed.view.active) !== JSON.stringify(replayed.view.active)) { throw new Error('failure performance changed the run or reward'); }
    await page.clock.resume();
    return { failure: failed.view.board.failure, weakJoint: failed.view.board.weak, moves: failed.view.active.moves.length,
        balance: failed.view.balance, award: failed.view.award, replayPreservedRun: true };
}

export async function recoveryPresentation(page) {
    const evidence = {};
    const content = () => page.frames().find(f => f.url().includes('xiaobai-os.html'));
    const visibleNumber = async name => Number(await frame(page).locator(`[data-stack-${name}]`).getAttribute(`data-stack-${name}`));
    async function reloadGraphics() {
        await content().evaluate(() => document.querySelector('.stack-canvas canvas').getContext('webgl2').getExtension('WEBGL_lose_context').loseContext());
        await frame(page).getByRole('button', { name: '重载画面', exact: true }).click();
        await frame(page).getByRole('button', { name: '重载画面', exact: true }).waitFor({ state: 'hidden' });
        await page.clock.runFor(1500);
    }
    await page.clock.resume(); await page.setViewportSize({ width: 390, height: 844 });
    await prepared(page, 8);
    await page.clock.install({ time: new Date(0) }); await page.clock.pauseAt(new Date(10000));
    await frame(page).getByRole('button', { name: '收工 +50', exact: true }).click();
    await frame(page).locator('.stack-dialog').getByRole('button', { name: '收工 +50', exact: true }).click();
    await frame(page).locator('[data-stack-presenting="true"]').waitFor();
    if (await visibleNumber('balance') !== 50) { throw new Error('reward was displayed before presentation'); }
    await reloadGraphics();
    const cash = await api(page, 'inspect');
    if (await visibleNumber('balance') !== cash.view.balance || await visibleNumber('count') !== 8) { throw new Error('reload left stale reward counters'); }
    evidence.cashoutReload = { shownBalance: await visibleNumber('balance'), authoritativeBalance: cash.view.balance };
    await page.screenshot({ path: 'output/playwright/stacking-fixed-wallet.png' });

    await page.clock.resume(); await api(page, 'reset'); await enter(page);
    await page.clock.install({ time: new Date(0) }); await page.clock.pauseAt(new Date(10000)); await start(page);
    const { motion } = await api(page, 'inspect'), tau = Math.PI * 2;
    const wait = Math.min(...[0, Math.PI].map(angle => ((angle - motion.phase) % tau + tau) % tau / motion.speed));
    await page.clock.runFor(Math.round(wait * 1000));
    await frame(page).getByRole('button', { name: '落下 ↓', exact: true }).click();
    await frame(page).locator('[data-stack-presenting="true"]').waitFor();
    if (await visibleNumber('count') !== 0) { throw new Error('landing count was displayed before contact'); }
    await reloadGraphics();
    if (await visibleNumber('count') !== 1 || (await api(page, 'inspect')).view.board.failure) { throw new Error('reload left stale landing count'); }
    evidence.landingReload = { shownCount: await visibleNumber('count') };

    await page.clock.resume(); await api(page, 'reset'); await enter(page);
    await page.clock.install({ time: new Date(0) }); await page.clock.pauseAt(new Date(10000)); await start(page);
    const poses = [];
    await page.route('**/__stacking/action', async route => {
        const request = route.request().postDataJSON();
        if (request.type === 'game/stacking/act' && request.payload.command.type === 'drop') {
            poses.push(request.payload.command);
            if (poses.length <= 2) {
                const error = poses.length === 1 ? 'host_request_timeout' : 'stacking_unavailable';
                await route.fulfill({ json: { ok: false, error, message: error } }); return;
            }
        }
        await route.continue();
    });
    try {
        await frame(page).getByRole('button', { name: '落下 ↓', exact: true }).click();
        await frame(page).getByRole('button', { name: '复核原操作', exact: true }).waitFor();
        if (!await frame(page).getByRole('button', { name: '落下 ↓', exact: true }).isDisabled()) { throw new Error('unknown placement unlocked'); }
        await page.clock.runFor(1000);
        await frame(page).getByRole('button', { name: '复核原操作', exact: true }).click();
        await frame(page).locator('.stack-actions .stack-primary:not(:disabled)').waitFor();
        if (await content().evaluate(() => localStorage.getItem('LittleWhiteBox:stacking:pending')) !== null) { throw new Error('definitive rejection retained the intent'); }
        await page.clock.runFor(1200);
        await frame(page).getByRole('button', { name: '落下 ↓', exact: true }).click();
        await frame(page).locator('[data-stack-presenting="true"]').waitFor();
        await page.clock.runFor(2200);
        const resumed = await api(page, 'inspect');
        if (poses.length !== 3 || poses[0].x !== poses[1].x || Math.abs(poses[2].x - poses[0].x) < 100 || resumed.view.active.moves.length !== 1) {
            throw new Error('rejected recovery did not resume the crane, or changed the pending pose');
        }
        evidence.rejectedRecovery = { originalX: poses[0].x, retriedX: poses[1].x, resumedX: poses[2].x, moves: resumed.view.active.moves.length };
    } finally { await page.unroute('**/__stacking/action'); await page.clock.resume(); }

    await api(page, 'reset');
    await page.addInitScript(() => {
        const original = HTMLCanvasElement.prototype.getContext, seen = new WeakSet();
        const probe = window.__stackInitProbe = { created: 0, lost: 0 };
        HTMLCanvasElement.prototype.getContext = function (...args) {
            if (args[0] === '2d' && this.width === 2 && this.height === 128 && !window.__stackSkyFailed) {
                window.__stackSkyFailed = true; return null;
            }
            const context = original.apply(this, args);
            if (args[0] === 'webgl2' && context && !seen.has(context)) {
                seen.add(context); probe.created++; this.addEventListener('webglcontextlost', () => probe.lost++);
            }
            return context;
        };
    });
    await enter(page); await frame(page).getByRole('button', { name: '重载画面', exact: true }).waitFor();
    const canvasesBefore = await frame(page).locator('.stack-canvas canvas').count();
    await frame(page).getByRole('button', { name: '重载画面', exact: true }).click();
    await frame(page).getByRole('button', { name: '重载画面', exact: true }).waitFor({ state: 'hidden' });
    await page.waitForTimeout(1000);
    const canvasesAfter = await frame(page).locator('.stack-canvas canvas').count(), probe = await content().evaluate(() => window.__stackInitProbe);
    if (canvasesBefore !== 0 || canvasesAfter !== 1 || probe.created !== 2 || probe.lost !== 1) { throw new Error('partial construction leaked graphics resources'); }
    evidence.initialization = { canvasesBefore, canvasesAfter, ...probe };
    await page.screenshot({ path: 'output/playwright/stacking-fixed-initialization.png' });
    return evidence;
}

export async function companionFraming(page) {
    await page.clock.resume(); await api(page, 'reset'); await enter(page);
    await page.clock.install({ time: new Date(0) }); await page.clock.pauseAt(new Date(10000)); await start(page);
    const { motion } = await api(page, 'inspect'), tau = Math.PI * 2;
    let elapsed = 0;
    for (const [width, height] of [[390, 844], [844, 390], [320, 568]]) {
        await page.setViewportSize({ width, height }); await page.clock.runFor(1000); elapsed += 1000;
        const phase = motion.phase + elapsed / 1000 * motion.speed;
        const wait = ((-Math.PI / 2 - phase) % tau + tau) % tau / motion.speed;
        const milliseconds = Math.round(wait * 1000); await page.clock.runFor(milliseconds); elapsed += milliseconds;
        await page.screenshot({ path: `output/playwright/stacking-companion-${width}x${height}.png` });
    }
    await page.clock.resume();
    return { viewports: 3, scenario: 'opening cargo at the left rail limit' };
}
