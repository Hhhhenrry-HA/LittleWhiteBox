import assert from 'node:assert/strict';
import test from 'node:test';

import { createLearningSession } from '../apps/learning/agent/session.js';
import { learningTools } from '../apps/learning/agent/tool-contract.js';
import { buildLearningDataMessage, readLearning } from '../apps/learning/agent/data-projection.js';
import { createLearningService } from '../apps/learning/application/service.js';
import { createLearningSourceRegistry } from '../apps/learning/materials/lesson-sources.js';
import { createLearningRepository } from '../apps/learning/storage/repository.js';
import { parseLearningDocument } from '../apps/learning/storage/document.js';
import { independentLearningSuccess, learningProgress } from '../domains/learning/progress.js';
import { learningEvidence } from '../domains/learning/assessment.js';
import { learningClassView } from '../apps/learning/application/projection.js';
import { createSillyTavernUserJsonFilePort } from '../storage/sillytavern-file-storage.js';

const publicScope = { kind: 'public' };
// Fixture prices exercise a frozen agreement; they are not a production pricing decision.
const prices = { short: 17, regular: 29, deep: 41 };
const authored = text => ({ key: 'article', title: '短文', kind: 'authored', text });
const question = (overrides = {}) => ({ key: 'q', skill: 'writing', materialKeys: ['article'], prompt: '用一句英文总结主要观点。',
    response: { kind: 'text' }, rule: { kind: 'semantic' }, ...overrides });
const lesson = (overrides = {}) => ({ title: '短文概括', goal: '用自己的英文概括主要观点', tier: 'short',
    materials: [authored('Trees help cool streets.')], exercises: [question()], ...overrides });

async function harness() {
    let file = null;
    let nextId = 0;
    let date = '2026-09-06T08:00:00.000Z';
    let hold = false;
    let held = null;
    const files = createSillyTavernUserJsonFilePort({ fetch: async (_url, options) => {
        if (options.method === 'POST') {
            const body = JSON.parse(options.body);
            const doc = JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(body.data), char => char.charCodeAt(0))));
            if (hold) { held = doc; throw new TypeError('network interrupted'); }
            file = doc;
            return new Response('{}');
        }
        return new Response(file === null ? '' : JSON.stringify(file), { status: file === null ? 404 : 200 });
    } });
    const createId = () => `learning-${++nextId}`;
    const now = () => date;
    const repo = createLearningRepository(files, { createId, locks: null });
    await repo.read();
    const service = createLearningService(repo, { createId, now });
    const sources = createLearningSourceRegistry();
    const session = (action, scope = publicScope, osId = 'story-a') => createLearningSession(repo, {
        language: 'en', osId, inputScope: scope, action, createId, now, sources,
    });
    const invoke = (run, action, name, args) => {
        assert.ok(learningTools(action).some(tool => tool.function.name === name));
        return run.executeTool(name, args);
    };
    const profileAction = { kind: 'profile' };
    const setup = session(profileAction);
    assert.equal(invoke(setup, profileAction, 'LearningProfileEdit', { explanationLanguage: 'zh-CN', selfAssessment: '初学', goal: { description: '英文阅读和表达' } }).ok, true);
    assert.equal((await setup.commit(() => true)).status, 'confirmed');
    const read = () => repo.snapshot().document.data.profiles[0];
    const prepare = async (input = lesson(), scope = publicScope) => {
        const action = { kind: 'prepare', replaceCurrent: true, prices };
        const run = session(action, scope);
        const result = invoke(run, action, 'LearningLessonEdit', input);
        assert.equal(result.ok, true, JSON.stringify(result));
        assert.equal((await run.commit(() => true)).status, 'confirmed');
        return read().unit;
    };
    const submit = async (answer = { kind: 'text', text: 'Trees make streets cooler.' }, scope = publicScope) => {
        const unit = read().unit;
        const pending = service.prepareAttempt({ language: 'en', unitId: unit.id, exerciseId: unit.exercises[0].id,
            answer, scope, osId: 'story-a', replays: 0, slowPlayback: false });
        assert.equal((await pending.save(() => true)).status, 'confirmed');
        return pending.attemptId;
    };
    const feedback = (attemptId, items = [{ label: '概括要点' }]) => ({ attemptId, verdict: 'correct', understanding: '抓住主要观点。', expression: '句子清楚。', guidance: '下次补充一个依据。', items });
    const assess = async (attemptId, { items, scope = publicScope, review = false, complete = false } = {}) => {
        const action = { kind: 'assess', attemptId, review };
        const run = session(action, scope);
        const result = invoke(run, action, 'LearningAssess', feedback(attemptId, items));
        assert.equal(result.ok, true, JSON.stringify(result));
        if (complete) { assert.equal(invoke(run, action, 'LearningComplete', { unitId: read().unit.id, attemptIds: [attemptId], summary: '练习了概括要点。' }).ok, true); }
        await run.commit(() => true);
        return result;
    };
    return { repo, service, sources, session, invoke, read, prepare, submit, feedback, assess,
        setDate: value => { date = value; }, hold: () => { hold = true; }, release: () => { file = held; hold = false; },
        reopen: async () => { const reopened = createLearningRepository(files, { locks: null }); return (await reopened.read()).document; } };
}

test('lesson tools preserve actual source text through submission, assessment, completion and storage reopen', async () => {
    const h = await harness();
    h.sources.add({ id: 'source-1', url: 'https://www.bbc.com/example', title: 'Fixture source', retrievedAt: '2026-09-06T07:00:00.000Z',
        paragraphs: [{ id: 'p1', text: 'Trees help cool streets.' }, { id: 'p2', text: 'They also provide shade.' }] });
    const unit = await h.prepare(lesson({ materials: [{ key: 'article', title: '节选', kind: 'original', sourceId: 'source-1', from: 1, through: 1 }] }));
    assert.equal(unit.materials[0].paragraphs[0].text, 'Trees help cool streets.');
    const attemptId = await h.submit();
    assert.equal(h.read().unit.assessments.length, 0);
    await h.assess(attemptId, { complete: true });
    const profile = (await h.reopen()).data.profiles[0];
    assert.equal(profile.unit.attempts[0].id, attemptId);
    assert.equal(profile.items[0].evidence[0].attempt.answer.text, 'Trees make streets cooler.');
    assert.equal(profile.completions.length, 1);
    assert.equal(profile.completions[0].reward.amount, 17);
    assert.equal(profile.completions[0].reward.originOsId, 'story-a');
    assert.equal(learningProgress(profile.items[0]).independent, false);
    const run = h.session({ kind: 'complete' });
    assert.equal(run.executeTool('LearningComplete', { unitId: unit.id, attemptIds: [attemptId], summary: '另一个说法' }).changed, false);
    assert.equal((await run.commit(() => true)).status, 'unchanged');
});

test('failed proposals are atomic, correction retains IDs, unrelated reads do not permit publishing', async () => {
    const h = await harness();
    const action = { kind: 'prepare', replaceCurrent: false, prices };
    const run = h.session(action);
    const good = run.executeTool('LearningLessonEdit', lesson());
    const bad = run.executeTool('LearningLessonEdit', lesson({ exercises: [question(), question({ key: 'bad', materialKeys: ['missing'] })] }));
    assert.equal(bad.ok, false);
    assert.equal(run.executeTool('LearningRead', { section: 'unit' }).data.exercises.length, 1);
    assert.equal(h.read().unit, null);
    await assert.rejects(run.commit(() => true));
    const corrected = run.executeTool('LearningLessonEdit', lesson());
    assert.deepEqual(corrected.ids, good.ids);
    assert.equal(corrected.changed, false);
    await run.commit(() => true);
    assert.equal(h.read().unit.exercises.length, 1);
    const immutable = h.session(action);
    assert.equal(immutable.executeTool('LearningLessonEdit', lesson({ title: '暗中改题' })).ok, false);
});

test('tools cannot manufacture attempts, change published money or edit profiles in ordinary teaching', async () => {
    const h = await harness();
    const unit = await h.prepare();
    let run = h.session({ kind: 'complete' });
    assert.equal(run.executeTool('LearningComplete', { unitId: unit.id, attemptIds: ['invented'], summary: '做完了' }).ok, false);
    assert.equal(run.executeTool('LearningProfileEdit', { selfAssessment: '精通' }).ok, false);
    const attemptId = await h.submit();
    run = h.session({ kind: 'assess', attemptId, review: false });
    assert.equal(run.executeTool('LearningAssess', { ...h.feedback(attemptId), answer: '伪造原答' }).ok, false);
    assert.equal(run.executeTool('LearningAssess', h.feedback(attemptId)).ok, true);
    assert.equal(run.executeTool('LearningComplete', { unitId: unit.id, attemptIds: [attemptId], summary: '完成', amount: 999 }).ok, false);
    await assert.rejects(run.commit(() => true));
    assert.equal(run.executeTool('LearningComplete', { discard: true }).ok, true);
    await run.commit(() => true);
    assert.equal(h.read().completions.length, 0);
    assert.equal(h.read().unit.attempts[0].answer.text, 'Trees make streets cooler.');
});

test('all native objective forms use published answers and real help, without a model call', async () => {
    const cases = [
        { response: { kind: 'choice', options: [{ id: 'a', text: 'shade' }, { id: 'b', text: 'heat' }], multiple: false }, answer: { kind: 'choice', ids: ['a'] } },
        { response: { kind: 'order', options: [{ id: 'a', text: 'Trees' }, { id: 'b', text: 'help.' }] }, answer: { kind: 'order', ids: ['a', 'b'] } },
        { response: { kind: 'match', left: [{ id: 'a', text: 'tree' }, { id: 'b', text: 'street' }], right: [{ id: 'x', text: '树' }, { id: 'y', text: '街道' }] }, answer: { kind: 'match', pairs: [{ left: 'a', right: 'x' }, { left: 'b', right: 'y' }] } },
        { response: { kind: 'evidence', materialKey: 'article' }, answer: { kind: 'evidence', ids: ['p1'] } },
        { response: { kind: 'gaps', slots: [{ id: 'a', text: 'Trees ___ streets.' }] }, answer: { kind: 'gaps', values: [{ id: 'a', text: 'COOL!' }] },
            rule: { kind: 'gaps', accepted: [{ id: 'a', forms: ['cool'] }], caseSensitive: false, punctuationSensitive: false, explanation: 'cool 可以作动词。' } },
    ];
    for (const entry of cases) {
        const h = await harness();
        const unit = await h.prepare(lesson({ exercises: [question({ skill: 'reading', response: entry.response, hint: '留意第一段对树荫的描述。',
            rule: entry.rule ?? { kind: 'exact', answer: entry.answer, explanation: '依据第一段。' } })] }));
        await h.service.reveal('en', unit.id, 'hints', unit.exercises[0].id, 'story-a', () => true);
        const attemptId = await h.submit(entry.answer);
        assert.equal(h.read().unit.assessments[0].verdict, 'correct');
        assert.equal(h.read().unit.attempts[0].help.hint, true);
        const complete = h.session({ kind: 'complete' });
        assert.equal(complete.executeTool('LearningAssess', { attemptId, items: [{ label: '依据原文理解' }] }).ok, true);
        assert.equal(complete.executeTool('LearningComplete', { unitId: unit.id, attemptIds: [attemptId], summary: '练习结束。' }).ok, true);
        await complete.commit(() => true);
        assert.equal(h.read().completions[0].reward.amount, 17);
        assert.equal(learningProgress(h.read().items[0]).independent, false);
    }
});

test('a corrected retry carries prior feedback into retained evidence without changing first-attempt conditions', async () => {
    const h = await harness();
    const objective = question({ skill: 'reading', response: { kind: 'choice', options: [{ id: 'a', text: 'shade' }, { id: 'b', text: 'heat' }], multiple: false },
        rule: { kind: 'exact', answer: { kind: 'choice', ids: ['a'] }, explanation: 'Trees provide shade, not heat.' } });
    await h.prepare(lesson({ exercises: [objective] }));
    const first = await h.submit({ kind: 'choice', ids: ['b'] });
    const original = structuredClone(h.read().unit.attempts[0]);
    assert.equal(original.help.feedback, false);
    const retry = await h.submit({ kind: 'choice', ids: ['a'] });
    assert.deepEqual(h.read().unit.attempts[0], original);
    const run = h.session({ kind: 'complete' });
    assert.equal(run.executeTool('LearningAssess', { attemptId: retry, items: [{ label: '理解树荫的作用' }] }).ok, true);
    await run.commit(() => true);
    await h.service.deleteAttempt('en', first, () => true);
    await h.prepare();
    const reopened = (await h.reopen()).data.profiles[0];
    const evidence = learningEvidence(reopened, retry);
    assert.equal(evidence.attempt.help.feedback, true);
    assert.equal(evidence.attempt.help.hint, false); assert.equal(evidence.attempt.help.answer, false);
    assert.equal(independentLearningSuccess(evidence), false);
    assert.equal(h.session({ kind: 'explain' }).executeTool('LearningRead', { section: 'evidence' }).data[0].attempt.help.feedback, true);
});

test('unassessed retries and feedback on a different question do not invent prior assistance', async () => {
    const h = await harness();
    const unit = await h.prepare(lesson({ exercises: [question(), question({ key: 'other' })] }));
    await h.submit();
    await h.submit();
    assert.deepEqual(h.read().unit.attempts.map(attempt => attempt.help.feedback), [false, false]);
    await h.assess(h.read().unit.attempts[0].id);
    const intent = h.service.prepareAttempt({ language: 'en', unitId: unit.id, exerciseId: unit.exercises[1].id,
        answer: { kind: 'text', text: 'Trees are helpful.' }, scope: publicScope, osId: 'story-a', replays: 0, slowPlayback: false });
    await intent.save(() => true);
    assert.equal(h.read().unit.attempts.at(-1).help.feedback, false);
});

test('omitted or empty hints have no reveal action effect and do not contaminate independent attempts', async () => {
    for (const hint of [undefined, '', '   ']) {
        const h = await harness();
        const unit = await h.prepare(lesson({ exercises: [question({ ...(hint === undefined ? {} : { hint }) })] }));
        const before = h.repo.snapshot().document;
        const view = learningClassView(before.data, 'en', 'story-a');
        assert.equal(view.unit.exercises[0].hasHint, false); assert.equal(view.unit.exercises[0].hint, null);
        assert.equal((await h.service.reveal('en', unit.id, 'hints', unit.exercises[0].id, 'story-a', () => true)).status, 'unchanged');
        assert.deepEqual(h.repo.snapshot().document, before);
        const attemptId = await h.submit(); await h.assess(attemptId);
        assert.equal(h.read().unit.attempts[0].help.hint, false);
        assert.equal(independentLearningSuccess(learningEvidence(h.read(), attemptId)), true);
    }
});

test('private units, answers, feedback and item labels do not cross stories; only structured progress does', async () => {
    const h = await harness();
    const scope = { kind: 'story', osId: 'story-a' };
    await h.prepare(lesson({ title: '秘密地名', materials: [authored('A private promise at the tower.')] }), scope);
    const attemptId = await h.submit({ kind: 'text', text: '秘密约定' }, scope);
    await h.assess(attemptId, { scope, items: [{ label: '秘密例句' }], complete: true });
    const downgraded = await h.reopen();
    downgraded.data.profiles[0].completions[0].scope = publicScope;
    assert.throws(() => parseLearningDocument(downgraded));
    const other = h.session({ kind: 'explain' }, { kind: 'story', osId: 'story-b' }, 'story-b');
    assert.equal(other.executeTool('LearningRead', {}).data.blockedCurrentUnit, true);
    const items = other.executeTool('LearningRead', { section: 'items' }).data;
    assert.equal(items[0].label, null);
    assert.equal(items[0].skill, 'writing');
    assert.deepEqual(items[0].evidence, []);
    const projected = JSON.stringify([other.dataMessages, ...['unit', 'materials', 'exercises', 'attempts', 'evidence', 'completions'].map(section => other.executeTool('LearningRead', { section }))]);
    for (const secret of ['秘密', 'private promise', 'story-a']) { assert.equal(projected.includes(secret), false); }
    // The human's stored record remains intact; projection is not deletion.
    assert.equal(h.read().unit.title, '秘密地名');

    await h.prepare();
    const privateAnswer = await h.submit({ kind: 'text', text: 'Only the original teacher may see this answer.' }, scope);
    await h.assess(privateAnswer, { scope });
    const reader = h.session({ kind: 'explain' }, { kind: 'story', osId: 'story-b' }, 'story-b');
    assert.equal(reader.executeTool('LearningRead', { section: 'unit' }).data.attempts.length, 0);
});

test('independent progress requires spaced active evidence; review and deletion recompute it', async () => {
    const h = await harness();
    await h.prepare();
    const first = await h.submit();
    await h.assess(first);
    const itemId = h.read().items[0].id;
    h.setDate('2026-09-08T08:00:00.000Z');
    await h.prepare(lesson({ materials: [authored('Libraries give everyone access to books.')] }));
    const second = await h.submit({ kind: 'text', text: 'Libraries make books available.' });
    await h.assess(second, { items: [{ itemId }] });
    assert.equal(learningProgress(h.read().items[0]).independent, true);
    assert.equal(learningProgress(h.read().items[0]).nextReviewAt, '2026-09-11T08:00:00.000Z');
    await h.service.dispute('en', second, () => true);
    assert.equal(learningProgress(h.read().items[0]).state, 'review');
    await h.assess(second, { items: [{ itemId }], review: true });
    assert.equal(learningProgress(h.read().items[0]).independent, true);
    // Recheck a retained answer from the previous unit, not a fabricated new attempt.
    await h.service.dispute('en', first, () => true);
    assert.equal(learningProgress(h.read().items[0]).independent, false);
    await h.assess(first, { items: [{ itemId }], review: true });
    assert.equal(learningProgress(h.read().items[0]).independent, true);
    await h.service.deleteAttempt('en', first, () => true);
    assert.equal(learningProgress(h.read().items[0]).independent, false);
    assert.equal(h.read().items[0].evidence.length, 1);
    await h.service.deleteItem('en', itemId, () => true);
    assert.equal(h.read().items.length, 0);
    assert.equal(h.read().unit.attempts[0].id, second);
    await h.service.deleteLanguage('en', () => true);
    assert.deepEqual((await h.reopen()).data.profiles, []);
});

test('unconfirmed assessment and completion remain unpublished; verification restores the same saved batch', async () => {
    const h = await harness();
    const unit = await h.prepare();
    const attemptId = await h.submit();
    const run = h.session({ kind: 'assess', attemptId, review: false });
    assert.equal(run.executeTool('LearningAssess', h.feedback(attemptId)).ok, true);
    assert.equal(run.executeTool('LearningComplete', { unitId: unit.id, attemptIds: [attemptId], summary: '完成本课。' }).ok, true);
    h.hold();
    assert.equal((await run.commit(() => true)).status, 'unconfirmed');
    assert.equal(h.read().unit.assessments.length, 0);
    assert.equal(h.read().completions.length, 0);
    assert.throws(() => h.session({ kind: 'complete' }));
    h.release();
    assert.equal((await h.repo.verify()).status, 'confirmed');
    assert.equal(h.read().unit.assessments[0].attemptId, attemptId);
    assert.equal(h.read().completions.length, 1);
});

test('data projection budget degrades without invalidating saved text; read and injection share sections', async () => {
    const h = await harness();
    await h.prepare(lesson({ materials: [authored('<>{}&'.repeat(1000))] }));
    const document = (await h.reopen());
    assert.deepEqual(parseLearningDocument(document), document);
    const message = buildLearningDataMessage(document.data, 'en', null);
    assert.ok([...message].length < 24000);
    const json = JSON.parse(message.slice(message.indexOf('{'), message.lastIndexOf('}') + 1));
    assert.deepEqual(json.overview, readLearning(document.data, 'en', null, {}));
    assert.equal(json.overview.data.unit.materials.length, 1);
    const chunks = [];
    let offset = 0;
    do {
        const page = readLearning(document.data, 'en', null, { section: 'materials', offset, limit: 1 });
        chunks.push(...page.data);
        offset = page.nextOffset;
    } while (offset !== null);
    assert.equal(chunks.map(chunk => chunk.text).join(''), '<>{}&'.repeat(1000));
    const run = h.session({ kind: 'prepare', replaceCurrent: true, prices });
    assert.equal(run.executeTool('LearningLessonEdit', lesson({ materials: [{ key: 'article', title: '伪原文', kind: 'original', sourceId: 'unknown', from: 1, through: 1, text: 'invented' }] })).ok, false);
    run.invalidate();
    await assert.rejects(run.commit(() => true));
});

test('wrap-up cannot hide a failed assessment behind success on another attempt', async () => {
    const h = await harness();
    await h.prepare(lesson({ exercises: [question({ skill: 'reading', response: { kind: 'choice', multiple: false,
        options: [{ id: 'a', text: 'cool' }, { id: 'b', text: 'warm' }] },
    rule: { kind: 'exact', answer: { kind: 'choice', ids: ['a'] }, explanation: 'See the text.' } })] }));
    const first = await h.submit({ kind: 'choice', ids: ['a'] });
    const second = await h.submit({ kind: 'choice', ids: ['b'] });
    const run = h.session({ kind: 'complete' });
    assert.equal(run.executeTool('LearningAssess', { attemptId: first, items: [{ itemId: 'missing' }] }).ok, false);
    assert.equal(run.executeTool('LearningAssess', { attemptId: second, items: [{ label: '读懂原因' }] }).ok, true);
    await assert.rejects(run.commit(() => true));
    assert.equal(h.read().items.length, 0);
    assert.equal(run.executeTool('LearningAssess', { discard: true }).ok, true);
    await run.commit(() => true);
    assert.equal(h.read().items[0].evidence[0].attempt.id, second);
});

test('out-of-range lessons and mismatched answers are rejected without replacing the current lesson', async () => {
    const h = await harness();
    const unit = await h.prepare();
    const action = { kind: 'prepare', replaceCurrent: true, prices };
    const invalid = [
        lesson({ exercises: Array.from({ length: 9 }, (_, index) => question({ key: `q${index}` })) }),
        lesson({ materials: Array.from({ length: 4 }, (_, index) => ({ ...authored('text'), key: `m${index}` })) }),
        lesson({ materials: [authored('x'.repeat(6001))] }),
        lesson({ exercises: [question({ skill: 'speaking' })] }),
    ];
    for (const input of invalid) {
        const run = h.session(action);
        assert.equal(run.executeTool('LearningLessonEdit', input).ok, false);
        await assert.rejects(run.commit(() => true));
    }
    assert.equal(h.read().unit.id, unit.id);
    await assert.rejects(h.submit({ kind: 'choice', ids: ['fabricated'] }));
    assert.equal(h.read().unit.attempts.length, 0);
    const edit = h.session({ kind: 'profile' });
    assert.equal(edit.executeTool('LearningProfileEdit', { explanationLanguage: null }).ok, false);
    assert.equal(edit.executeTool('LearningProfileEdit', { goal: { targetLevel: 'B1', exam: '自测' } }).ok, true);
    await edit.commit(() => true);
    const clear = h.session({ kind: 'profile' });
    assert.equal(clear.executeTool('LearningProfileEdit', { goal: { exam: null } }).ok, true);
    await clear.commit(() => true);
    assert.equal(h.read().goal.targetLevel, 'B1');
    assert.equal(h.read().goal.exam, null);
});

test('transcript exposure survives reopening and reused text without changing earlier attempt conditions', async () => {
    const h = await harness();
    const unit = await h.prepare(lesson({ exercises: [question({ skill: 'listening' })] }));
    const first = await h.submit();
    await h.assess(first);
    await h.service.reveal('en', unit.id, 'transcripts', unit.materials[0].id, 'story-a', () => true);
    const reopened = (await h.reopen()).data.profiles[0];
    assert.equal(reopened.unit.materials[0].transcriptRevealed, true);
    assert.equal(reopened.items[0].evidence[0].materials[0].transcriptRevealed, true);
    assert.equal(reopened.unit.attempts[0].help.transcript, false);
    await h.prepare(lesson({ exercises: [question({ skill: 'listening' })] }));
    await h.submit();
    assert.equal(h.read().unit.attempts[0].help.transcript, true);
});
