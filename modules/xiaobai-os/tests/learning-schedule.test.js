import assert from 'node:assert/strict';
import test from 'node:test';

import {
    advanceLearningSchedule, correctLearningSchedules, learningReviewQuality, learningReviewTier, learningScheduleAt, learningScheduled,
    learningScheduleReason, newLearningSchedule, parseLearningSchedule, selectDueLearningItems,
} from '../domains/learning/schedule.js';

const T0 = '2026-09-01T08:00:00.000Z';
const day = (n, from = T0) => new Date(Date.parse(from) + n * 86400000).toISOString();
const help = (overrides = {}) => ({ answer: false, hint: false, feedback: false, transcript: false, replays: 0, slowPlayback: false, ...overrides });
const item = (id, dueAt, extra = {}) => ({ id, label: id, scope: { kind: 'public' }, skill: 'vocabulary', evidence: [], schedule: learningScheduleAt(dueAt), ...extra });

test('only grammar and vocabulary are scheduled; a new item is first due the next day', () => {
    assert.deepEqual(['grammar', 'vocabulary', 'reading', 'writing', 'listening'].map(learningScheduled), [true, true, false, false, false]);
    assert.deepEqual(newLearningSchedule(T0), { ef: 2.5, repetitions: 0, intervalDays: 0, dueAt: day(1), lastAttemptId: null, lastQuality: null });
    assert.deepEqual(parseLearningSchedule(newLearningSchedule(T0)), newLearningSchedule(T0));
    for (const bad of [{ ef: 1.2 }, { ef: Infinity }, { ef: '2.5' }, { lastQuality: 6 }, { repetitions: -1 }, { dueAt: 'tomorrow' }, { extra: 1 }]) {
        assert.throws(() => parseLearningSchedule({ ...newLearningSchedule(T0), ...bad }));
    }
});

test('review quality comes from verdict, help and recall signal; a disputed judgement does not move memory', () => {
    const q = (verdict, signal, h = help()) => learningReviewQuality({ help: h }, { verdict, ...(signal ? { signal } : {}) });
    assert.equal(q('correct'), 5);
    assert.equal(q('correct', 'clean'), 5);
    assert.equal(q('correct', 'hesitant'), 4);
    assert.equal(q('correct', undefined, help({ hint: true })), 3);
    assert.equal(q('correct', 'hesitant', help({ answer: true })), 3);
    assert.equal(q('partial'), 2);
    assert.equal(q('incorrect'), 1);
    assert.equal(q('incorrect', 'blank'), 0);
    assert.equal(q('correct', 'blank'), 0);
    assert.equal(q('disputed', 'clean'), null);
});

test('SM-2 steps 1, 6, then interval x ease; a lapse restarts without losing ease; one attempt advances once', () => {
    let s = newLearningSchedule(T0);
    s = advanceLearningSchedule(s, 5, 'a1', day(1));
    assert.deepEqual(s, { ef: 2.6, repetitions: 1, intervalDays: 1, dueAt: day(2), lastAttemptId: 'a1', lastQuality: 5 });
    assert.equal(advanceLearningSchedule(s, 1, 'a1', day(3)), s);
    s = advanceLearningSchedule(s, 4, 'a2', day(2));
    assert.deepEqual(s, { ef: 2.6, repetitions: 2, intervalDays: 6, dueAt: day(8), lastAttemptId: 'a2', lastQuality: 4 });
    s = advanceLearningSchedule(s, 3, 'a3', day(8));
    assert.deepEqual(s, { ef: 2.46, repetitions: 3, intervalDays: 16, dueAt: day(24), lastAttemptId: 'a3', lastQuality: 3 });
    s = advanceLearningSchedule(s, 0, 'a4', day(24));
    assert.deepEqual(s, { ef: 2.46, repetitions: 0, intervalDays: 1, dueAt: day(25), lastAttemptId: 'a4', lastQuality: 0 });
    let low = learningScheduleAt(T0);
    for (let i = 0; i < 12; i++) { low = advanceLearningSchedule(low, 3, `low${i}`, T0); }
    assert.equal(low.ef, 1.3);
});

test('a deleted, disputed or re-judged attempt returns only the items it last moved to the entry state', () => {
    const moved = item('moved', T0);
    moved.schedule = advanceLearningSchedule(moved.schedule, 5, 'a1', T0);
    const other = item('other', T0);
    other.schedule = advanceLearningSchedule(other.schedule, 5, 'a2', T0);
    const before = structuredClone(other.schedule);
    correctLearningSchedules([moved, other], 'a1', day(3));
    assert.deepEqual(moved.schedule, newLearningSchedule(day(3)));
    assert.deepEqual(other.schedule, before);
});

test('due selection is sorted, readable in this story, and at most twenty; the tier follows the count', () => {
    const items = [
        item('late', day(2)), item('first', day(-3)), item('private', day(-5), { scope: { kind: 'story', osId: 'story-b' } }),
        item('reading', day(-9), { skill: 'reading', schedule: undefined }), item('second', day(-1)), item('now', T0),
    ];
    delete items[3].schedule;
    assert.deepEqual(selectDueLearningItems({ items }, T0, 'story-a').map(entry => entry.id), ['first', 'second', 'now']);
    assert.deepEqual(selectDueLearningItems({ items }, T0).map(entry => entry.id), ['private', 'first', 'second', 'now']);
    const many = Array.from({ length: 25 }, (_, index) => item(`i${index}`, day(-index)));
    const due = selectDueLearningItems({ items: many }, T0);
    assert.equal(due.length, 20);
    assert.equal(due[0].id, 'i24');
    assert.deepEqual([1, 5, 6, 12, 13, 20].map(learningReviewTier), ['short', 'short', 'regular', 'regular', 'deep', 'deep']);
    assert.throws(() => learningReviewTier(0));
    assert.throws(() => learningReviewTier(21));
});

test('each schedule explains its next review in one line', () => {
    assert.equal(learningScheduleReason(newLearningSchedule(T0)), '还没有复习记录，从头开始');
    const reasons = [0, 1, 3, 4, 5].map(quality => learningScheduleReason(advanceLearningSchedule(newLearningSchedule(T0), quality, 'a', T0)));
    assert.deepEqual(reasons, ['上次没想起来，明天再复习', '上次没答对，明天再复习', '上次借助提示答对，1 天后复习', '上次答对但有犹豫，1 天后复习', '上次独立答对，1 天后复习']);
});
