import assert from 'node:assert/strict';
import test from 'node:test';
import { createRevealTimeline, REVEAL_TIMING as T } from '../apps/game/stacking/scene/timeline.ts';

test('a pending command has no result performance; contact happens once after a confirmed drop', () => {
    const cues = [], timeline = createRevealTimeline(cue => cues.push(cue));
    timeline.advance(10000, false);
    assert.equal(timeline.sample().active, false); assert.deepEqual(cues, []);
    timeline.start('placed'); timeline.advance(T.fall - 1, false);
    assert.deepEqual(cues, []); assert.ok(timeline.sample().fall < 1);
    timeline.advance(1, false); assert.deepEqual(cues, ['land']);
    timeline.advance(T.settle, false); timeline.advance(10000, false);
    assert.equal(timeline.sample().active, false); assert.deepEqual(cues, ['land']);
});

test('loss and winning performances preserve cue order even when frames skip or motion is reduced', () => {
    for (const reduced of [false, true]) {
        for (const [kind, expected] of [['lost', ['land', 'lose']], ['won', ['land', 'reward']], ['cashed', ['reward']]]) {
            const cues = [], timeline = createRevealTimeline(cue => cues.push(cue));
            timeline.start(kind); timeline.advance(10000, reduced); timeline.advance(10000, reduced);
            assert.deepEqual(cues, expected); assert.equal(timeline.sample().active, false);
        }
    }
});

test('pausing and replacing a scene cannot advance or replay its old result', () => {
    const cues = [], timeline = createRevealTimeline(cue => cues.push(cue));
    timeline.start('lost'); timeline.advance(T.fall / 2, false);
    const before = timeline.sample(); timeline.advance(0, false);
    assert.deepEqual(timeline.sample(), before);
    timeline.clear(); timeline.advance(10000, false);
    assert.deepEqual(cues, []); assert.equal(timeline.sample().kind, null);
    timeline.start('cashed'); timeline.advance(0, false); assert.deepEqual(cues, ['reward']);
});

test('a missed support falls through without a fake contact or settling beat', () => {
    const cues = [], timeline = createRevealTimeline(cue => cues.push(cue));
    timeline.start('lost', false); timeline.advance(T.fall + 1, false);
    assert.deepEqual(cues, ['lose']); assert.equal(timeline.sample().settle, 0);
    assert.ok(timeline.sample().collapse > 0);
    timeline.advance(T.collapse, false); assert.equal(timeline.sample().active, false);
});
