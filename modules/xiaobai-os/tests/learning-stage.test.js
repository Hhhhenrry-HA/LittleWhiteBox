import assert from 'node:assert/strict';
import test from 'node:test';

import { parseLearningUnit, parseLearningData } from '../domains/learning/data.js';
import { learningUnitStage } from '../domains/learning/stage.js';
import { assessLearning } from '../domains/learning/assessment.js';
import { checkLearningAnnotations } from '../domains/learning/facts.js';
import { learningScheduleAt, newLearningSchedule } from '../domains/learning/schedule.js';
import { createLearningService } from '../apps/learning/application/service.js';
import { createLearningLessonCompiler } from '../apps/learning/application/lesson.js';
import { learningClassView } from '../apps/learning/application/projection.js';
import { createLearningRepository } from '../apps/learning/storage/repository.js';
import { createSillyTavernUserJsonFilePort } from '../storage/sillytavern-file-storage.js';

const scope = { kind: 'public' };
const T0 = '2026-09-01T08:00:00.000Z';
const article = { id: 'm1', title: 'Parks', provenance: { kind: 'authored' }, transcriptRevealed: false,
    paragraphs: [{ id: 'p1', text: 'Parks cool cities in summer.' }, { id: 'p2', text: 'Trees give people shade.' }] };
const writing = (id, paragraphId) => ({ id, skill: 'writing', materialIds: ['m1'], prompt: paragraphId ? '概括这一段。' : '写一篇短文。',
    response: { kind: 'text' }, rule: { kind: 'semantic' }, hint: '', ...(paragraphId ? { paragraphId } : {}) });
const explanations = [
    { materialId: 'm1', paragraphId: 'p1', explanation: '公园让城市变凉。', terms: [{ text: 'cool', note: '使凉爽' }] },
    { materialId: 'm1', paragraphId: 'p2', explanation: '树提供阴凉。', terms: [] },
];
const rwUnit = (overrides = {}) => ({ id: 'u1', kind: 'reading-writing', title: '城市公园', goal: '概括并写作', scope, originOsId: 'story-a',
    reward: { tier: 'short', amount: 17 }, materials: [article], exercises: [writing('s1', 'p1'), writing('s2', 'p2'), writing('e1')],
    attempts: [], assessments: [], revealed: { answers: [], hints: [] }, explanations, modelEssay: null, revisionSkipped: false, ...overrides });
const help = { answer: false, hint: false, feedback: false, transcript: false, replays: 0, slowPlayback: false };
const attempt = (id, exerciseId, text, extra = {}) => ({ id, exerciseId, answer: { kind: 'text', text }, submittedAt: T0, help, scope, ...extra });
const assessment = (attemptId, extra = {}) => ({ attemptId, verdict: 'correct', understanding: '', expression: '', guidance: '清楚。', scope, ...extra });
const annotation = (id, extra = {}) => ({ id, category: 'grammar', severity: 'error', paragraphIndex: 0, quote: 'is go', explanation: '时态', suggestion: 'went', ...extra });
const drafts = [attempt('a1', 's1', 'Parks cool cities.'), attempt('a2', 's2', 'Trees give shade.'), attempt('a3', 'e1', 'I like parks.\nYesterday he is go there.')];
const stage = unit => learningUnitStage(parseLearningUnit(unit)).stage;

test('reading-writing stage is derived from saved drafts, feedback, revision and the model essay', () => {
    assert.equal(stage(rwUnit()), 'writing');
    assert.equal(stage(rwUnit({ attempts: drafts.slice(0, 2) })), 'writing');
    assert.equal(stage(rwUnit({ attempts: drafts, assessments: [assessment('a1')] })), 'grading');
    const clean = [assessment('a1'), assessment('a2'), assessment('a3')];
    assert.equal(stage(rwUnit({ attempts: drafts, assessments: clean })), 'model');
    const marked = [assessment('a1'), assessment('a2'), assessment('a3', { verdict: 'partial', annotations: [annotation('n1', { paragraphIndex: 1 })] })];
    const graded = rwUnit({ attempts: drafts, assessments: marked });
    const derived = learningUnitStage(parseLearningUnit(graded));
    assert.equal(derived.stage, 'revising');
    assert.deepEqual(derived.exercises.map(row => row.status), ['done', 'done', 'revising']);
    // Alternatives are offered, not demanded.
    const offered = [...marked.slice(0, 2), assessment('a3', { annotations: [annotation('n1', { paragraphIndex: 1, severity: 'alternative' })] })];
    assert.equal(stage(rwUnit({ attempts: drafts, assessments: offered })), 'model');
    assert.equal(stage({ ...graded, revisionSkipped: true }), 'model');
    // Disputed feedback waits for a new judgement.
    assert.equal(stage(rwUnit({ attempts: drafts, assessments: [...marked.slice(0, 2), { ...marked[2], verdict: 'disputed' }] })), 'grading');
    const revision = attempt('a4', 'e1', 'I like parks.\nYesterday he went there.', { revisesAttemptId: 'a3', help: { ...help, feedback: true } });
    assert.equal(stage({ ...graded, attempts: [...drafts, revision] }), 'reviewing');
    const reviewed = { ...graded, attempts: [...drafts, revision], assessments: [...marked, assessment('a4', { resolvedAnnotationIds: ['n1'] })] };
    assert.equal(stage(reviewed), 'model');
    assert.equal(stage({ ...reviewed, modelEssay: { text: 'Parks matter.', level: 'B1' } }), 'complete');
});

test('lessons have no steps; a review is answered, graded, then complete', () => {
    const lesson = { ...rwUnit({ kind: 'lesson' }), exercises: [writing('q1')] };
    delete lesson.explanations; delete lesson.modelEssay; delete lesson.revisionSkipped;
    assert.equal(stage(lesson), 'lesson');
    const review = { ...lesson, kind: 'review', exercises: [{ ...writing('r1'), skill: 'vocabulary', itemId: 'i1' }, { ...writing('r2'), skill: 'vocabulary', itemId: 'i2' }] };
    assert.equal(stage(review), 'answering');
    const answered = { ...review, attempts: [attempt('b1', 'r1', 'cool'), attempt('b2', 'r2', 'shade')] };
    assert.equal(stage(answered), 'grading');
    assert.equal(stage({ ...answered, assessments: [assessment('b1', { signal: 'hesitant' }), assessment('b2')] }), 'complete');
    assert.throws(() => parseLearningUnit({ ...answered, attempts: [...answered.attempts, attempt('b3', 'r1', 'again')] }), /attempts/);
    assert.throws(() => parseLearningUnit({ ...review, exercises: [review.exercises[0], { ...review.exercises[1], itemId: 'i1' }] }));
    assert.throws(() => parseLearningUnit({ ...lesson, exercises: [{ ...writing('q1'), itemId: 'i1' }] }));
    assert.throws(() => parseLearningUnit({ ...lesson, attempts: [attempt('c1', 'q1', 'x')], assessments: [assessment('c1', { signal: 'clean' })] }), /signal/);
});

test('reading-writing units keep one explained article, one summary per paragraph, one essay and one revision per draft', () => {
    parseLearningUnit(rwUnit());
    const second = { ...article, id: 'm2' };
    for (const [change, bad] of [
        ['two articles', { materials: [article, second] }],
        ['reordered explanations', { explanations: [...explanations].reverse() }],
        ['missing summary', { exercises: [writing('s1', 'p1'), writing('e1')] }],
        ['two essays', { exercises: [writing('s1', 'p1'), writing('s2', 'p2'), writing('e1'), writing('e2')] }],
        ['objective summary', { exercises: [{ ...writing('s1', 'p1'), skill: 'reading' }, writing('s2', 'p2'), writing('e1')] }],
        ['revision of ungraded draft', { attempts: [...drafts, attempt('a4', 'e1', 'x', { revisesAttemptId: 'a3' })] }],
        ['two revisions', { attempts: [...drafts, attempt('a4', 'e1', 'x', { revisesAttemptId: 'a3' }), attempt('a5', 'e1', 'y', { revisesAttemptId: 'a3' })],
            assessments: [assessment('a3')] }],
        ['resolved outside draft', { attempts: [...drafts, attempt('a4', 'e1', 'x', { revisesAttemptId: 'a3' })],
            assessments: [assessment('a3'), assessment('a4', { resolvedAnnotationIds: ['nope'] })] }],
        ['missing model essay key', { modelEssay: undefined }],
    ]) { assert.throws(() => parseLearningUnit(JSON.parse(JSON.stringify(rwUnit(bad)))), undefined, change); }
    const lesson = { ...rwUnit({ kind: 'lesson' }), exercises: [writing('q1')] };
    assert.throws(() => parseLearningUnit(lesson), /explanations|model essay/);
});

test('annotations quote the learner\'s own words inside the paragraph they name', () => {
    const essay = drafts[2];
    checkLearningAnnotations(assessment('a3', { annotations: [annotation('n1', { paragraphIndex: 1 })] }), essay);
    assert.throws(() => checkLearningAnnotations(assessment('a3', { annotations: [annotation('n1', { paragraphIndex: 0 })] }), essay), /exact words/);
    assert.throws(() => checkLearningAnnotations(assessment('a3', { annotations: [annotation('n1', { paragraphIndex: 1, quote: 'he was go' })] }), essay), /exact words/);
    assert.throws(() => checkLearningAnnotations(assessment('a3', { annotations: [annotation('n1', { paragraphIndex: 2 })] }), essay), /exact words/);
    // Blank lines do not count as paragraphs.
    checkLearningAnnotations(assessment('a3', { annotations: [annotation('n1', { paragraphIndex: 1 })] }), { ...essay, answer: { kind: 'text', text: 'I like parks.\r\n\r\nYesterday he is go there.' } });
    assert.throws(() => parseLearningUnit(rwUnit({ attempts: drafts, assessments: [assessment('a3', { annotations: [annotation('n1')] })] })), /exact words/);
    assert.throws(() => parseLearningUnit(rwUnit({ attempts: drafts,
        assessments: [assessment('a3', { annotations: [annotation('n1', { paragraphIndex: 1, category: 'content', itemId: 'i1' })] })] })), /itemId/);
});

function harness() {
    let file = null; let id = 0; let date = T0;
    const files = createSillyTavernUserJsonFilePort({ fetch: async (_url, options) => {
        if (options.method === 'POST') {
            const body = JSON.parse(options.body);
            file = JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(body.data), char => char.charCodeAt(0))));
            return new Response('{}');
        }
        return new Response(file === null ? '' : JSON.stringify(file), { status: file === null ? 404 : 200 });
    } });
    const createId = () => `id-${++id}`;
    const now = () => date;
    const repository = createLearningRepository(files, { createId, now });
    const service = createLearningService(repository, { createId, now });
    const read = () => repository.snapshot().document.data.profiles[0];
    const write = async change => {
        const document = repository.snapshot().document;
        const data = structuredClone(document.data);
        change(data.profiles[0]);
        assert.equal((await repository.save(document, data, () => true)).status, 'confirmed');
    };
    const submit = async (unitId, exerciseId, text) => {
        const pending = service.prepareAttempt({ language: 'en', unitId, exerciseId, answer: { kind: 'text', text }, scope, osId: 'story-a', replays: 0, slowPlayback: false });
        assert.equal((await pending.save(() => true)).status, 'confirmed');
        return pending.attemptId;
    };
    const assess = (attemptId, args, review = false) => write(profile => {
        Object.assign(profile, assessLearning(profile, { attemptId, verdict: 'correct', understanding: '', expression: '', guidance: '好。', ...args },
            { attemptId, review, inputScope: scope, osId: 'story-a', createId, now }).profile);
    });
    return { repository, service, read, write, submit, assess, setDate: value => { date = value; }, createId };
}

test('settings create a profile with defaults before any lesson', async () => {
    const h = harness(); await h.repository.read();
    await h.service.saveSettings('EN', { level: 'B1', exam: 'IELTS', interests: '城市和自然' }, () => true);
    const profile = h.read();
    assert.equal(profile.language, 'en');
    assert.equal(profile.explanationLanguage, 'zh-CN');
    assert.deepEqual([profile.level, profile.goal.exam, profile.goal.targetLevel, profile.interests], ['B1', 'IELTS', null, '城市和自然']);
    assert.deepEqual([profile.unit, profile.review, profile.items, profile.completions], [null, null, [], []]);
    await h.service.saveSettings('en', { level: null, explanationLanguage: null, targetLevel: 'C1' }, () => true);
    assert.deepEqual([h.read().level, h.read().explanationLanguage, h.read().goal.targetLevel, h.read().goal.exam], [null, 'zh-CN', 'C1', 'IELTS']);
    assert.throws(() => h.service.saveSettings('en', { teacher: 'x' }, () => true), /Unsupported/);
    assert.equal(learningClassView(h.repository.snapshot().document.data, 'en', 'story-a').profile.settings.targetLevel, 'C1');
});

test('a reading-writing unit runs draft, grading, revision, review and model essay, then completes by itself', async () => {
    const h = harness(); await h.repository.read();
    await h.service.saveSettings('en', {}, () => true);
    await h.write(profile => { profile.unit = rwUnit(); });
    const first = await h.submit('u1', 's1', 'Parks are cool.');
    await h.submit('u1', 's2', 'Trees give shade.');
    await assert.rejects(async () => h.assess(first, {}), /every draft is written/);
    const resubmitted = await h.submit('u1', 's1', 'Parks cool cities.');
    assert.deepEqual(h.read().unit.attempts.map(entry => entry.exerciseId), ['s2', 's1']);
    const essay = await h.submit('u1', 'e1', 'I like parks.\nYesterday he is go there.');
    assert.equal(learningClassView(h.repository.snapshot().document.data, 'en', 'story-a').unit.stage.stage, 'grading');

    await h.service.bookmarkTerm('en', 'u1', 'm1', 'p1', 'cool', () => true);
    await h.service.bookmarkTerm('en', 'u1', 'm1', 'p1', 'cool', () => true);
    assert.throws(() => h.service.bookmarkTerm('en', 'u1', 'm1', 'p2', 'cool', () => true), /termText/);
    assert.deepEqual(h.read().items.map(item => [item.label, item.skill, item.evidence.length, item.schedule.dueAt]), [['cool', 'vocabulary', 0, newLearningSchedule(T0).dueAt]]);

    const draftIds = h.read().unit.attempts.map(entry => entry.id);
    await h.assess(resubmitted, {});
    await h.assess(draftIds[0], {});
    assert.throws(() => h.service.prepareAttempt({ language: 'en', unitId: 'u1', exerciseId: 's1', answer: { kind: 'text', text: 'late' },
        scope, osId: 'story-a', replays: 0, slowPlayback: false }), /Grading has started/);
    await h.assess(essay, { verdict: 'partial', annotations: [{ category: 'grammar', severity: 'error', paragraphIndex: 1, quote: 'is go',
        explanation: '过去的事用过去时', suggestion: 'went', item: { label: 'past simple' } }] });
    const grammar = h.read().items.find(item => item.label === 'past simple');
    assert.equal(grammar.skill, 'grammar');
    assert.ok(grammar.schedule);
    // An essay's evidence keeps the learner's text and feedback, not the article.
    assert.deepEqual(grammar.evidence[0].materials, []);
    const noteId = h.read().unit.assessments.find(entry => entry.attemptId === essay).annotations[0].id;
    assert.equal(h.read().unit.assessments.find(entry => entry.attemptId === essay).annotations[0].itemId, grammar.id);

    await assert.rejects(async () => h.service.saveModelEssay('en', 'u1', { text: 'x', level: 'B1' }, () => true), /model essay/);
    assert.throws(() => h.service.submitRevision('en', 'u1', [{ attemptId: resubmitted, text: 'x' }], () => true), /corrections/);
    await h.service.submitRevision('en', 'u1', [{ attemptId: essay, text: 'I like parks.\nYesterday he went there.' }], () => true);
    const revision = h.read().unit.attempts.at(-1);
    assert.equal(revision.revisesAttemptId, essay);
    assert.equal(revision.help.feedback, true);
    assert.equal(learningUnitStage(h.read().unit).stage, 'reviewing');
    assert.throws(() => h.service.skipRevision('en', 'u1', () => true), /skipped/);
    await h.assess(revision.id, { resolvedAnnotationIds: [noteId] });
    assert.equal(learningUnitStage(h.read().unit).stage, 'model');
    assert.equal(h.read().completions.length, 0);
    await h.service.saveModelEssay('en', 'u1', { text: 'Parks keep cities cool.', level: 'B1' }, () => true);
    assert.equal(learningUnitStage(h.read().unit).stage, 'complete');
    assert.deepEqual(h.read().completions.map(entry => [entry.unitId, entry.reward.amount, entry.attemptIds.length]), [['u1', 17, 4]]);

    // Deleting a graded draft takes its revision along; that exercise may then be written again.
    await h.service.deleteAttempt('en', essay, () => true);
    assert.equal(h.read().unit.attempts.some(entry => entry.exerciseId === 'e1'), false);
    assert.equal(h.read().items.find(item => item.id === grammar.id).evidence.length, 0);
    await h.submit('u1', 'e1', 'A new essay.');
});

test('skipping a revision goes straight to the model essay', async () => {
    const h = harness(); await h.repository.read();
    await h.service.saveSettings('en', {}, () => true);
    await h.write(profile => { profile.unit = rwUnit(); });
    const ids = [await h.submit('u1', 's1', 'Parks cool cities.'), await h.submit('u1', 's2', 'Trees give shade.'), await h.submit('u1', 'e1', 'He is go.')];
    await h.assess(ids[0], {}); await h.assess(ids[1], {});
    await h.assess(ids[2], { annotations: [{ category: 'content', severity: 'improve', paragraphIndex: 0, quote: 'He', explanation: '主语不清', suggestion: '' }] });
    await h.service.skipRevision('en', 'u1', () => true);
    assert.equal(learningUnitStage(h.read().unit).stage, 'model');
});

test('a review asks about exactly the due items, moves each schedule once, and completes by itself', async () => {
    const h = harness(); await h.repository.read();
    await h.service.saveSettings('en', {}, () => true);
    const past = '2026-08-30T08:00:00.000Z';
    await h.write(profile => {
        profile.items = ['i1', 'i2', 'i3'].map((id, index) => ({ id, label: `word ${id}`, scope, skill: 'vocabulary', evidence: [],
            schedule: learningScheduleAt(index === 2 ? '2026-09-05T08:00:00.000Z' : past) }));
    });
    assert.deepEqual(h.service.reviewSelection('en'), { itemIds: ['i1', 'i2'], tier: 'short' });
    assert.equal(h.service.reviewSelection('en', '2026-08-01T00:00:00.000Z'), null);
    const compile = createLearningLessonCompiler({ osId: 'story-a', language: 'en', scope, prices: { short: 17, regular: 29, deep: 41 }, createId: h.createId, sources: { get: () => undefined } });
    const choice = (key, itemId) => ({ key, skill: 'vocabulary', materialKeys: [], prompt: `Which means ${itemId}?`, itemId,
        response: { kind: 'choice', options: [{ id: 'a', text: 'A' }, { id: 'b', text: 'B' }], multiple: false },
        rule: { kind: 'exact', answer: { kind: 'choice', ids: ['a'] }, explanation: '选 A。' } });
    const context = { profile: h.read(), now: T0 };
    assert.throws(() => compile({ kind: 'review', title: '复习', goal: '回忆', exercises: [choice('q1', 'i1')] }, null, null, context), /each due item/);
    assert.throws(() => compile({ kind: 'review', title: '复习', goal: '回忆', exercises: [choice('q1', 'i1'), choice('q2', 'i3')] }, null, null, context), /each due item/);
    const review = compile({ kind: 'review', title: '复习', goal: '回忆', tier: 'deep', exercises: [choice('q1', 'i1'), choice('q2', 'i2')] }, null, null, context);
    assert.equal(review.reward.tier, 'short');
    await h.write(profile => { profile.review = review; });
    const [q1, q2] = review.exercises;
    const pending = answer => h.service.prepareAttempt({ language: 'en', unitId: review.id, exerciseId: answer.exerciseId,
        answer: { kind: 'choice', ids: [answer.id] }, scope, osId: 'story-a', replays: 0, slowPlayback: false });
    await pending({ exerciseId: q1.id, id: 'a' }).save(() => true);
    assert.throws(() => pending({ exerciseId: q1.id, id: 'b' }), /answered once/);
    const i1 = h.read().items.find(item => item.id === 'i1');
    assert.deepEqual([i1.schedule.repetitions, i1.schedule.lastQuality, i1.schedule.dueAt, i1.evidence.length], [1, 5, '2026-09-02T08:00:00.000Z', 1]);
    assert.equal(h.read().completions.length, 0);
    const wrong = pending({ exerciseId: q2.id, id: 'b' });
    await wrong.save(() => true);
    const i2 = h.read().items.find(item => item.id === 'i2');
    assert.deepEqual([i2.schedule.repetitions, i2.schedule.lastQuality, i2.schedule.intervalDays], [0, 1, 1]);
    assert.deepEqual(h.read().completions.map(entry => [entry.unitId, entry.reward.amount]), [[review.id, 17]]);
    const view = learningClassView(h.repository.snapshot().document.data, 'en', 'story-a', 0, '', undefined, '2026-09-10T00:00:00.000Z');
    assert.equal(view.review.stage.stage, 'complete');
    assert.equal(view.dueCount, 3);
    assert.equal(view.records.items.find(item => item.id === 'i1').scheduleReason, '上次独立答对，1 天后复习');

    // Disputing the judgement withdraws its schedule move; deleting an item removes its question.
    await h.service.dispute('en', wrong.attemptId, () => true);
    assert.deepEqual(h.read().items.find(item => item.id === 'i2').schedule, newLearningSchedule(T0));
    await h.service.deleteItem('en', 'i1', () => true);
    assert.deepEqual(h.read().review.exercises.map(exercise => exercise.itemId), ['i2']);
    await h.service.deleteItem('en', 'i2', () => true);
    assert.equal(h.read().review, null);
    await h.service.abandonReview('en', () => true);
    parseLearningData(h.repository.snapshot().document.data);
});
