import assert from 'node:assert/strict';
import test from 'node:test';

import { createLearningSession } from '../apps/learning/agent/session.js';
import { learningTools } from '../apps/learning/agent/tool-contract.js';
import { buildLearningContext } from '../apps/learning/agent/context.js';
import { createLearningService } from '../apps/learning/application/service.js';
import { createLearningRepository } from '../apps/learning/storage/repository.js';
import { learningUnitStage } from '../domains/learning/stage.js';
import { learningScheduleAt, newLearningSchedule } from '../domains/learning/schedule.js';
import { assessLearning } from '../domains/learning/assessment.js';
import { createSillyTavernUserJsonFilePort } from '../storage/sillytavern-file-storage.js';
import { createClassroomFixture } from './fixtures/learning-classroom.js';
import { declaredTeacher } from './fixtures/learning-reply.js';

const scope = { kind: 'public' };
const T0 = '2026-09-01T08:00:00.000Z';
const article = { id: 'm1', title: 'Parks', provenance: { kind: 'authored' }, transcriptRevealed: false,
    paragraphs: [{ id: 'p1', text: 'Parks cool cities in summer.' }, { id: 'p2', text: 'Trees give people shade.' }] };
const writing = (id, paragraphId) => ({ id, skill: 'writing', materialIds: ['m1'], prompt: paragraphId ? '概括这一段。' : '写一篇短文。',
    response: { kind: 'text' }, rule: { kind: 'semantic' }, hint: '', ...(paragraphId ? { paragraphId } : {}) });
const rwUnit = (unitScope = scope, osId = 'story-a') => ({ id: 'u1', kind: 'reading-writing', title: '城市公园', goal: '概括并写作', scope: unitScope, originOsId: osId,
    reward: { tier: 'short', amount: 17 }, materials: [article], exercises: [writing('s1', 'p1'), writing('s2', 'p2'), writing('e1')],
    attempts: [], assessments: [], revealed: { answers: [], hints: [] }, modelEssay: null, revisionSkipped: false,
    explanations: [{ materialId: 'm1', paragraphId: 'p1', explanation: '公园让城市变凉。', terms: [] }, { materialId: 'm1', paragraphId: 'p2', explanation: '树提供阴凉。', terms: [] }] });
const help = { answer: false, hint: false, feedback: false, transcript: false, replays: 0, slowPlayback: false };
const attempt = (id, exerciseId, text, unitScope = scope) => ({ id, exerciseId, answer: { kind: 'text', text }, submittedAt: T0, help, scope: unitScope });
const graded = (attemptId, unitScope = scope) => ({ attemptId, verdict: 'correct', understanding: '', expression: '', guidance: '清楚。', scope: unitScope });
const names = action => learningTools(action).map(tool => tool.function.name);
const snapshot = { player: { displayName: '玩家', persona: '' }, characters: [], storyEvents: '', recentMessages: [], worldInfo: { before: '', after: '', depth: [] } };
/** The focus a request injects for the model to work on. */
function focusOf(data, action) {
    const { messages } = buildLearningContext({ data, language: 'en', osId: 'story-a', teacher: { name: '老师', note: '' }, asOf: T0,
        action, message: '', context: { teacherDetails: '', snapshot } });
    const text = messages[0].content;
    return JSON.parse(text.slice(text.indexOf('<learning_request>') + 18, text.lastIndexOf('</learning_request>'))).focus;
}

function harness() {
    let file = null; let id = 0;
    const files = createSillyTavernUserJsonFilePort({ fetch: async (_url, options) => {
        if (options.method === 'POST') {
            const body = JSON.parse(options.body);
            file = JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(body.data), char => char.charCodeAt(0))));
            return new Response('{}');
        }
        return new Response(file === null ? '' : JSON.stringify(file), { status: file === null ? 404 : 200 });
    } });
    const createId = () => `id-${++id}`;
    const now = () => T0;
    const repository = createLearningRepository(files, { createId, now });
    const service = createLearningService(repository, { createId, now });
    const read = () => repository.snapshot().document.data.profiles[0];
    const write = async change => {
        const document = repository.snapshot().document;
        const data = structuredClone(document.data);
        change(data.profiles[0]);
        assert.equal((await repository.save(document, data, () => true)).status, 'confirmed');
    };
    const session = action => createLearningSession(repository, { language: 'en', osId: 'story-a', inputScope: scope, action, createId, now });
    const assess = (attemptId, extra = {}) => ({ attemptId, verdict: 'correct', understanding: '', expression: '', guidance: '好。', ...extra });
    return { repository, service, read, write, session, assess };
}

test('each request offers only the tools its step needs', () => {
    assert.deepEqual(names({ kind: 'summary-review', unitId: 'u1', attemptId: 'a1' }).sort(), ['LearningHelp', 'LearningRead']);
    // A companion remark writes nothing, not even a help declaration.
    assert.deepEqual(names({ kind: 'companion' }), ['LearningRead']);
    for (const kind of ['grade', 'revision-review', 'review-assess']) {
        const offered = names({ kind, unitId: 'u1' });
        assert.ok(offered.includes('LearningAssess'), kind);
        assert.ok(!offered.includes('LearningLessonEdit') && !offered.includes('LearningComplete') && !offered.includes('LearningModelEssay'), kind);
    }
    assert.deepEqual(names({ kind: 'model-essay', unitId: 'u1' }).sort(), ['LearningHelp', 'LearningModelEssay', 'LearningRead']);
    assert.ok(names({ kind: 'review-prepare', itemIds: ['i1'], asOf: T0 }).includes('LearningLessonEdit'));
    assert.ok(!names({ kind: 'talk' }).includes('LearningModelEssay'));
    for (const action of [{ kind: 'talk' }, { kind: 'prepare' }, { kind: 'summary-review', unitId: 'u1', attemptId: 'a1' }, { kind: 'model-essay', unitId: 'u1' }]) {
        assert.ok(names(action).includes('LearningHelp'), action.kind);
    }
});

test('a public article does not grant grading or model-essay access to another story’s saved writing', () => {
    const other = { kind: 'story', osId: 'story-b' };
    const unit = { ...rwUnit(), attempts: [attempt('a1', 's1', 'Private summary.', other), attempt('a2', 's2', 'Trees give shade.'), attempt('a3', 'e1', 'Private essay.', other)] };
    const data = { profiles: [{ language: 'en', unit, review: null, items: [], completions: [], goal: {} }] };
    for (const action of [{ kind: 'summary-review', attemptId: 'a1' }, { kind: 'grade', unitId: 'u1' }, { kind: 'model-essay', unitId: 'u1' }]) {
        assert.throws(() => focusOf(data, action), error => error.path === 'attemptId');
    }
    unit.attempts.forEach(entry => { entry.scope = scope; });
    unit.assessments = [graded('a1'), graded('a2'), { ...graded('a3', other), annotations: [note] }];
    unit.attempts.push({ ...attempt('a4', 'e1', 'Edited essay.'), revisesAttemptId: 'a3' });
    assert.throws(() => focusOf(data, { kind: 'revision-review', unitId: 'u1' }), error => error.path === 'attemptId');
    assert.throws(() => focusOf(data, { kind: 'model-essay', unitId: 'u1' }), error => error.path === 'attemptId');
});

test('grading, revision review and review assessment each accept only the answers they wait on', async () => {
    const h = harness(); await h.repository.read();
    await h.service.saveSettings('en', {}, () => true);
    const drafts = [attempt('a1', 's1', 'Parks cool cities.'), attempt('a2', 's2', 'Trees give shade.'), attempt('a3', 'e1', 'I like parks.\nYesterday he is go there.')];
    await h.write(profile => {
        profile.unit = { ...rwUnit(), attempts: drafts };
        profile.items = [{ id: 'i1', label: 'shade', scope, skill: 'vocabulary', evidence: [], schedule: learningScheduleAt('2026-08-30T08:00:00.000Z') }];
    });
    // Summaries get a brief reply that saves nothing.
    const summary = h.session({ kind: 'summary-review', unitId: 'u1', attemptId: 'a1' });
    assert.equal(summary.executeTool('LearningAssess', h.assess('a1')).ok, false);
    const focus = focusOf(h.repository.snapshot().document.data, { kind: 'grade', unitId: 'u1' });
    assert.deepEqual(focus.drafts.map(entry => entry.attempt?.id ?? entry.id), ['a1', 'a2', 'a3']);

    const grade = h.session({ kind: 'grade', unitId: 'u1' });
    assert.equal(grade.executeTool('LearningLessonEdit', { title: 'x' }).ok, false);
    for (const id of ['a1', 'a2']) { assert.equal(grade.executeTool('LearningAssess', h.assess(id)).ok, true, id); }
    const marked = grade.executeTool('LearningAssess', h.assess('a3', { verdict: 'partial',
        annotations: [{ category: 'grammar', severity: 'error', paragraphIndex: 1, quote: 'is go', explanation: '过去时', suggestion: 'went' }] }));
    assert.equal(marked.ok, true, JSON.stringify(marked));
    assert.equal(grade.executeTool('LearningHelp', { exerciseIds: [], materialIds: [] }).ok, true);
    assert.equal((await grade.commit(() => true)).status, 'confirmed');
    assert.equal(learningUnitStage(h.read().unit).stage, 'revising');

    await h.service.submitRevision('en', 'u1', [{ attemptId: 'a3', text: 'I like parks.\nYesterday he went there.' }], () => true);
    const revision = h.read().unit.attempts.at(-1);
    const noteId = h.read().unit.assessments.find(entry => entry.attemptId === 'a3').annotations[0].id;
    assert.equal(h.session({ kind: 'grade', unitId: 'u1' }).executeTool('LearningAssess', h.assess(revision.id)).ok, false);
    const review = h.session({ kind: 'revision-review', unitId: 'u1' });
    assert.equal(review.executeTool('LearningAssess', h.assess('a3')).ok, false);
    assert.equal(review.executeTool('LearningAssess', h.assess(revision.id, { resolvedAnnotationIds: [noteId] })).ok, true);
    assert.equal(review.executeTool('LearningHelp', { exerciseIds: [], materialIds: [] }).ok, true);
    await review.commit(() => true);
    assert.equal(learningUnitStage(h.read().unit).stage, 'model');

    assert.equal(h.session({ kind: 'review-assess', unitId: 'u1' }).executeTool('LearningAssess', h.assess('a1')).ok, false);
    // A lesson edit outside a review request never creates a review.
    assert.equal(h.session({ kind: 'talk' }).executeTool('LearningLessonEdit', { kind: 'review', title: '复习', goal: '回忆', exercises: [] }).ok, false);

    const essay = h.session({ kind: 'model-essay', unitId: 'u1' });
    assert.equal(essay.executeTool('LearningModelEssay', { unitId: 'u1', text: 'Parks keep cities cool.', level: 'B1' }).ok, true);
    assert.equal(essay.executeTool('LearningHelp', { exerciseIds: [], materialIds: [] }).ok, true);
    await essay.commit(() => true);
    assert.equal(learningUnitStage(h.read().unit).stage, 'complete');
    assert.deepEqual(h.read().completions.map(entry => entry.unitId), ['u1']);
});

test('a prepared review asks about exactly the items that were due when the learner started it', async () => {
    const h = harness(); await h.repository.read();
    await h.service.saveSettings('en', {}, () => true);
    await h.write(profile => {
        profile.items = ['i1', 'i2', 'i3'].map((id, index) => ({ id, label: `word ${id}`, scope, skill: 'vocabulary', evidence: [],
            schedule: learningScheduleAt(index === 2 ? '2026-09-05T08:00:00.000Z' : '2026-08-30T08:00:00.000Z') }));
    });
    const due = h.service.reviewSelection('en', T0, 'story-a');
    assert.deepEqual(due.itemIds, ['i1', 'i2']);
    const action = { kind: 'review-prepare', itemIds: due.itemIds, asOf: T0 };
    assert.deepEqual(focusOf(h.repository.snapshot().document.data, action).items.map(item => item.id), ['i1', 'i2']);
    const choice = (key, itemId) => ({ key, skill: 'vocabulary', materialKeys: [], prompt: `Which means ${itemId}?`, itemId,
        response: { kind: 'choice', options: [{ id: 'a', text: 'A' }, { id: 'b', text: 'B' }], multiple: false },
        rule: { kind: 'exact', answer: { kind: 'choice', ids: ['a'] }, explanation: '选 A。' } });
    const run = h.session(action);
    assert.equal(run.executeTool('LearningLessonEdit', { title: '复习', goal: '回忆', exercises: [choice('q1', 'i1'), choice('q3', 'i3')] }).ok, false);
    assert.equal(run.executeTool('LearningLessonEdit', { title: '复习', goal: '回忆', exercises: [choice('q1', 'i1'), choice('q2', 'i2')] }).ok, true);
    assert.equal(run.executeTool('LearningHelp', { exerciseIds: [], materialIds: [] }).ok, true);
    assert.equal((await run.commit(() => true)).status, 'confirmed');
    assert.deepEqual(h.read().review.exercises.map(exercise => exercise.itemId), ['i1', 'i2']);
    assert.equal(h.read().unit, null);
});

test('a unit completed by its facts is paid automatically, exactly once', async t => {
    const h = await createClassroomFixture(); t.after(h.dispose);
    await h.openLesson(); await h.economy.ensureOpen();
    const lesson = h.profile().unit;
    const document = h.repository.snapshot().document;
    const data = structuredClone(document.data);
    const unitScope = lesson.scope;
    data.profiles[0].unit = { ...rwUnit(unitScope, lesson.originOsId),
        attempts: [attempt('a1', 's1', 'Parks cool cities.', unitScope), attempt('a2', 's2', 'Trees give shade.', unitScope), attempt('a3', 'e1', 'I like parks.', unitScope)],
        assessments: ['a1', 'a2', 'a3'].map(id => graded(id, unitScope)) };
    assert.equal((await h.repository.save(document, data, () => true)).status, 'confirmed');
    assert.equal(learningUnitStage(h.profile().unit).stage, 'model');
    const before = h.economy.getPlayerBalance();
    h.flags.teacherResponse = declaredTeacher((request, step) => step === 1
        ? { toolCalls: [{ id: 'essay', name: 'LearningModelEssay', arguments: JSON.stringify({ unitId: 'u1', text: 'Parks keep cities cool.', level: 'B1' }) }] }
        : { text: '范文先写要点，再给例子。' });
    const after = await h.command('grade', { unitId: 'u1' });
    assert.equal(learningUnitStage(h.profile().unit).stage, 'complete');
    assert.equal(after.pending, null);
    assert.equal(after.completions.find(entry => entry.unitId === 'u1').rewardStatus, 'paid');
    assert.equal(h.economy.getPlayerBalance(), before + 17);
    const calls = h.counts.provider;
    await h.command('grade', { unitId: 'u1' }); await h.command('reward', { unitId: 'u1' }); await h.reenter(); await h.command('read');
    assert.equal(h.counts.provider, calls);
    assert.equal(h.economy.getPlayerBalance(), before + 17);
    assert.deepEqual(h.failures, []);
});

const markedDrafts = () => [attempt('a1', 's1', 'Parks cool cities.'), attempt('a2', 's2', 'Trees give shade.'), attempt('a3', 'e1', 'I like parks.\nYesterday he is go there.')];
const note = { id: 'n1', category: 'grammar', severity: 'error', paragraphIndex: 1, quote: 'is go', explanation: '过去时', suggestion: 'went' };

test('a draft whose revision answered its feedback cannot be disputed; the revision can', async () => {
    const h = harness(); await h.repository.read();
    await h.service.saveSettings('en', {}, () => true);
    const revision = { ...attempt('a4', 'e1', 'I like parks.\nYesterday he went there.'), revisesAttemptId: 'a3', help: { ...help, feedback: true } };
    await h.write(profile => {
        profile.unit = { ...rwUnit(), attempts: [...markedDrafts(), revision],
            assessments: [graded('a1'), graded('a2'), { ...graded('a3'), verdict: 'partial', annotations: [note] }, { ...graded('a4'), resolvedAnnotationIds: ['n1'] }] };
    });
    assert.equal(learningUnitStage(h.read().unit).stage, 'model');
    await assert.rejects(async () => h.service.dispute('en', 'a3', () => true), /修改稿/);
    assert.equal(h.read().unit.assessments.find(entry => entry.attemptId === 'a3').verdict, 'partial');
    assert.equal((await h.service.dispute('en', 'a4', () => true)).status, 'confirmed');
    assert.equal(h.read().unit.assessments.find(entry => entry.attemptId === 'a4').verdict, 'disputed');
});

test('a workbench step re-judges disputed feedback without a separate review flag', async () => {
    const h = harness(); await h.repository.read();
    await h.service.saveSettings('en', {}, () => true);
    await h.write(profile => {
        profile.unit = { ...rwUnit(), attempts: markedDrafts(), assessments: [{ ...graded('a1'), verdict: 'disputed' }, graded('a2'), graded('a3')] };
    });
    const grade = h.session({ kind: 'grade', unitId: 'u1' });
    assert.deepEqual(focusOf(h.repository.snapshot().document.data, { kind: 'grade', unitId: 'u1' }).drafts.map(entry => entry.attempt.id), ['a1']);
    assert.equal(grade.executeTool('LearningAssess', h.assess('a1', { verdict: 'partial' })).ok, true);
    // Feedback that was not disputed still changes only in an explicit review.
    assert.equal(grade.executeTool('LearningAssess', h.assess('a2', { verdict: 'partial' })).ok, false);
    assert.equal(grade.executeTool('LearningAssess', h.assess('a2', { verdict: 'partial', review: true })).ok, false);
    const ordinary = h.session({ kind: 'assess', attemptId: 'a2', review: false });
    assert.equal(ordinary.executeTool('LearningAssess', h.assess('a2', { verdict: 'partial', review: true })).ok, false);
    assert.equal(grade.executeTool('LearningHelp', { exerciseIds: [], materialIds: [] }).ok, true);
    assert.equal((await grade.commit(() => true)).status, 'confirmed');
    assert.equal(h.read().unit.assessments.find(entry => entry.attemptId === 'a1').verdict, 'partial');
});

test('a typed answer that rewrites an ungraded reading-writing draft replaces it', async () => {
    const h = harness(); await h.repository.read();
    await h.service.saveSettings('en', {}, () => true);
    await h.write(profile => { profile.unit = { ...rwUnit(), attempts: [attempt('a1', 's1', 'Parks cool cities.')] }; });
    const pending = h.service.prepareAttempt({ language: 'en', unitId: 'u1', exerciseId: 's1', scope, osId: 'story-a',
        answer: { kind: 'text', text: 'City parks keep summer streets cool.' }, replays: 0, slowPlayback: false });
    assert.equal((await pending.save(() => true)).status, 'confirmed');
    const drafts = h.read().unit.attempts.filter(entry => entry.exerciseId === 's1');
    assert.deepEqual(drafts.map(entry => entry.answer.text), ['City parks keep summer streets cool.']);
});

test('a disputed review answer moves its item again from the re-judged verdict, in the review or archived', async () => {
    const h = harness(); await h.repository.read();
    await h.service.saveSettings('en', {}, () => true);
    const exercise = { id: 'r1', skill: 'vocabulary', materialIds: [], prompt: 'Say shade in a sentence.', response: { kind: 'text' }, rule: { kind: 'semantic' }, hint: '', itemId: 'i1' };
    const answer = attempt('b1', 'r1', 'The trees give shade.');
    const judged = graded('b1');
    const moved = { ef: 2.6, repetitions: 2, intervalDays: 6, dueAt: '2026-09-07T08:00:00.000Z', lastAttemptId: 'b1', lastQuality: 5 };
    const evidence = { unitId: 'old-review', scope, exercise, materials: [], attempt: answer, assessment: judged };
    const item = (schedule, entries = [evidence]) => ({ id: 'i1', label: 'shade', scope, skill: 'vocabulary', evidence: entries, schedule });
    const options = { attemptId: 'b1', review: true, inputScope: scope, osId: 'story-a', createId: () => 'x', now: () => T0 };
    const rejudge = verdict => assessLearning(h.read(), h.assess('b1', { verdict }), options).profile.items[0].schedule;

    // Archived: the dispute withdraws the move, then the re-judged verdict moves the item once.
    await h.write(profile => { profile.items = [item(moved)]; });
    await h.service.dispute('en', 'b1', () => true);
    assert.deepEqual(h.read().items[0].schedule, newLearningSchedule(T0));
    const incorrect = rejudge('incorrect');
    assert.deepEqual([incorrect.repetitions, incorrect.intervalDays, incorrect.lastAttemptId, incorrect.lastQuality], [0, 1, 'b1', 1]);
    const upheld = rejudge('correct');
    assert.deepEqual([upheld.repetitions, upheld.lastAttemptId, upheld.lastQuality], [1, 'b1', 5]);

    // A later review moved the item since; the old answer's new verdict leaves that schedule alone.
    const later = { ...moved, lastAttemptId: 'b9' };
    await h.write(profile => { profile.items = [item(later)]; });
    await h.service.dispute('en', 'b1', () => true);
    assert.deepEqual(rejudge('incorrect'), later);

    // In the review slot the re-judged verdict moves the item as well.
    await h.write(profile => {
        profile.items = [item(moved, [])];
        profile.review = { id: 'rv', kind: 'review', title: '复习', goal: '回忆', scope, originOsId: 'story-a', reward: { tier: 'short', amount: 17 },
            materials: [], exercises: [exercise], attempts: [answer], assessments: [judged], revealed: { answers: [], hints: [] } };
    });
    await h.service.dispute('en', 'b1', () => true);
    const review = rejudge('partial');
    assert.deepEqual([review.repetitions, review.lastAttemptId, review.lastQuality], [0, 'b1', 2]);
});

const until = async (read, check) => {
    for (let tries = 0; tries < 400 && !check(read()); tries++) { await new Promise(resolve => setTimeout(resolve, 5)); }
    assert.ok(check(read()), JSON.stringify(read().remark));
};
const learningRequestOf = request => {
    const original = request.messages.find(entry => entry.role === 'user' && entry.content.includes('<learning_request>'));
    return original ? JSON.parse(original.content.split('<learning_request>\n').at(-1).split('\n</learning_request>')[0]) : null;
};

test('review reads, focused assessment and help all belong to the review rather than the neighbouring article', async () => {
    const h = harness(); await h.repository.read(); await h.service.saveSettings('en', {}, () => true);
    await h.write(profile => {
        profile.unit = rwUnit();
        profile.items = [{ id: 'i1', label: 'shade', scope, skill: 'vocabulary', evidence: [], schedule: learningScheduleAt(T0) }];
        profile.review = { id: 'rv', kind: 'review', title: 'Review', goal: 'Recall shade', scope, originOsId: 'story-a', reward: { tier: 'short', amount: 17 },
            materials: [{ ...article, id: 'rm', transcriptRevealed: true }],
            exercises: [{ ...writing('r1'), skill: 'vocabulary', materialIds: ['rm'], itemId: 'i1' }],
            attempts: [attempt('b1', 'r1', 'Trees provide shade.')], assessments: [{ ...graded('b1'), verdict: 'disputed' }], revealed: { answers: [], hints: [] } };
    });
    const actions = [{ kind: 'review-assess', unitId: 'rv' }, { kind: 'assess', attemptId: 'b1', review: true }];
    for (const action of actions) {
        const run = h.session(action);
        const options = { data: h.repository.snapshot().document.data, language: 'en', osId: 'story-a', teacher: { name: '老师', note: '' }, asOf: T0,
            action, message: '', context: { teacherDetails: '', snapshot } };
        const request = learningRequestOf(buildLearningContext(options));
        assert.equal(request.training.id, 'rv');
        assert.deepEqual(run.executeTool('LearningRead', { section: 'training' }).data, request.training);
        assert.equal(run.executeTool('LearningRead', {}).data.unit.id, 'rv');
        assert.equal(run.executeTool('LearningRead', { section: 'exercises' }).data[0].id, 'r1');
        assert.deepEqual(action.kind === 'review-assess' ? request.focus.answers.map(entry => entry.attempt.id) : [request.focus.attempt.id], ['b1']);
        assert.equal(run.executeTool('LearningHelp', { exerciseIds: ['s1'], materialIds: [] }).ok, false);
        assert.equal(run.executeTool('LearningHelp', { exerciseIds: ['r1'], materialIds: [] }).ok, true);
        assert.ok(['confirmed', 'unchanged'].includes((await run.saveHelp(() => true)).status));
        assert.equal(run.helpIsPublished(), true);
        assert.deepEqual(h.read().unit.revealed.hints, []);
        assert.deepEqual(h.read().review.revealed.hints, ['r1']);
        assert.equal(h.read().review.attempts[0].help.hint, false);
    }
});

test('submitting a semantic review answer grades it without any mounted review component', async t => {
    const h = await createClassroomFixture(); t.after(h.dispose); await h.openLesson();
    const document = h.repository.snapshot().document; const data = structuredClone(document.data);
    const unit = data.profiles[0].unit; const before = structuredClone(unit);
    data.profiles[0].items = [{ id: 'i1', label: 'shade', scope: unit.scope, skill: 'vocabulary', evidence: [], schedule: learningScheduleAt(T0) }];
    data.profiles[0].review = { id: 'rv', kind: 'review', title: 'Review', goal: 'Recall shade', scope: unit.scope, originOsId: unit.originOsId,
        reward: { tier: 'short', amount: 17 }, materials: [],
        exercises: [{ ...writing('r1'), skill: 'vocabulary', materialIds: [], itemId: 'i1' }], attempts: [], assessments: [], revealed: { answers: [], hints: [] } };
    assert.equal((await h.repository.save(document, data, () => true)).status, 'confirmed');
    const purposes = [];
    h.flags.teacherResponse = declaredTeacher((request, step) => {
        const input = learningRequestOf(request); purposes.push(input.action.kind);
        return step === 1 ? { toolCalls: input.focus.answers.map(({ attempt }) => ({ id: attempt.id, name: 'LearningAssess', arguments: JSON.stringify({
            attemptId: attempt.id, verdict: 'correct', understanding: 'Correct meaning.', expression: 'Clear.', guidance: 'Good use.', signal: 'clean',
        }) })) } : { text: 'That use of shade works.' };
    });
    await h.command('submit', { unitId: 'rv', exerciseId: 'r1', answer: { kind: 'text', text: 'Trees provide shade.' } });
    assert.ok(purposes.length > 0); assert.ok(purposes.every(kind => kind === 'review-assess'));
    assert.equal(h.profile().review.assessments.length, 1);
    assert.equal(learningUnitStage(h.profile().review).stage, 'complete');
    assert.equal(h.profile().items[0].schedule.lastAttemptId, h.profile().review.attempts[0].id);
    assert.deepEqual(h.profile().unit, before); assert.deepEqual(h.failures, []);
});

test('payment follows only a new completion, including one a cleanup finishes', async t => {
    const h = await createClassroomFixture(); t.after(h.dispose);
    await h.openLesson();
    const lesson = h.profile().unit;
    const unitScope = lesson.scope;
    const choice = (id, itemId) => ({ id, skill: 'vocabulary', materialIds: [], prompt: `Which means ${itemId}?`, hint: '', itemId,
        response: { kind: 'choice', options: [{ id: 'a', text: 'A' }, { id: 'b', text: 'B' }], multiple: false },
        rule: { kind: 'exact', answer: { kind: 'choice', ids: ['a'] }, explanation: '选 A。' } });
    const document = h.repository.snapshot().document;
    const data = structuredClone(document.data);
    data.profiles[0].items = ['i1', 'i2'].map(id => ({ id, label: `word ${id}`, scope: unitScope, skill: 'vocabulary', evidence: [],
        schedule: learningScheduleAt('2026-08-30T08:00:00.000Z') }));
    data.profiles[0].review = { id: 'rv', kind: 'review', title: '复习', goal: '回忆', scope: unitScope, originOsId: lesson.originOsId,
        reward: { tier: 'short', amount: 17 }, materials: [], exercises: [choice('q1', 'i1'), choice('q2', 'i2')], attempts: [], assessments: [],
        revealed: { answers: [], hints: [] } };
    assert.equal((await h.repository.save(document, data, () => true)).status, 'confirmed');
    const before = h.economy.getPlayerBalance();
    await h.command('submit', { unitId: 'rv', exerciseId: 'q1', answer: { kind: 'choice', ids: ['a'] } });
    assert.equal(h.profile().completions.length, 0);
    // Removing the last unanswered item completes the review; that cleanup pays it like any other save.
    const cleaned = await h.command('delete-item', { id: 'i2' });
    assert.deepEqual(h.profile().completions.map(entry => entry.unitId), ['rv']);
    assert.equal(cleaned.completions.find(entry => entry.unitId === 'rv').rewardStatus, 'paid');
    assert.equal(h.economy.getPlayerBalance(), before + 17);
    // Later actions, reads and reopening never pay again; copy is not the payment contract.
    await h.command('settings', { value: {} });
    await h.command('read'); await h.reenter();
    assert.equal(h.economy.getPlayerBalance(), before + 17);
    assert.deepEqual(h.failures, []);
});

test('a companion remark needs no help declaration, gives way to the learner and leaves no cancelled turn', async t => {
    const h = await createClassroomFixture(); t.after(h.dispose);
    await h.openLesson();
    let hold = null;
    const teacher = declaredTeacher(() => ({ text: '可以，我们慢慢来。' }));
    h.flags.teacherResponse = async (request, round) => {
        if (learningRequestOf(request)?.action.kind !== 'companion') { return teacher(request, round); }
        assert.ok(!request.tools.some(tool => tool.function.name === 'LearningHelp'));
        if (hold) { await hold; }
        return { text: '这段写得真轻快。' };
    };
    await h.command('companion', {});
    await until(h.state, state => state.remark?.text === '这段写得真轻快。');
    let release;
    hold = new Promise(resolve => { release = resolve; });
    await h.command('companion', {});
    const talking = h.command('talk', { message: '这里的 shade 是什么意思？' });
    release();
    const talked = await talking;
    assert.equal(talked.remark, null);
    assert.equal(talked.conversation.turns.at(-1).teacher, '可以，我们慢慢来。');
    assert.equal(talked.conversation.turns.some(turn => turn.purpose === 'companion' && turn.status !== 'finished'), false);
    assert.deepEqual(h.failures, []);
});
