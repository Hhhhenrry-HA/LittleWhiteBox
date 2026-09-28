import assert from 'node:assert/strict';
import test from 'node:test';
import { createQualityController, pixelRatio, RENDER_BUDGET as B } from '../apps/game/stacking/scene/quality.ts';
test('pixel budget is bounded before the first frame, even on very large high-DPR displays', () => {
    for (const [w, h, dpr] of [[390, 844, 3], [3840, 2160, 3], [1280, 720, 2]]) {
        for (const q of [0, 1, 2]) { const ratio = pixelRatio(w, h, dpr, q); assert.ok(w * h * ratio * ratio <= B.maxPixels + 1); }
    }
});
test('quality only changes at a safe boundary after sustained load, with slower upgrades and no background-gap penalty', () => {
    const q = createQualityController();
    for (let i = 0; i < B.slowSamples; i++) q.sample(40);
    assert.equal(q.current(), 2); assert.equal(q.boundary(), 1);
    for (let i = 0; i < B.fastSamples - 1; i++) q.sample(16);
    assert.equal(q.boundary(), 1); q.sample(16); assert.equal(q.boundary(), 2);
    for (let i = 0; i < B.slowSamples; i++) q.sample(1000);
    assert.equal(q.boundary(), 2);
    for (let i = 0; i < B.slowSamples * 4; i++) { q.sample(45); q.boundary(); }
    assert.equal(q.current(), 0);
});
