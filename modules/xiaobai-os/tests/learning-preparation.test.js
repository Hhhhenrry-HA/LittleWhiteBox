import test from 'node:test';
import assert from 'node:assert/strict';
import { setImmediate } from 'node:timers';
import { createClassroomFixture, fixtureLesson } from './fixtures/learning-classroom.js';
import { learningPreparation } from '../domains/learning/preparation.js';
import { learningUnitStage } from '../domains/learning/stage.js';
import { createLearningService } from '../apps/learning/application/service.js';

const call = (name, args) => ({ id: name, name, arguments: JSON.stringify(args) });
const input = request => JSON.parse(request.messages.findLast(entry => entry.role === 'user' && entry.content.includes('<learning_request>'))
    .content.split('<learning_request>\n')[1].split('\n</learning_request>')[0]);
const send = (h, action, extra = {}) => h.bridge.request(`learning/${action}`, { chatIdentity: h.state().chatIdentity, ...extra });
async function until(check) {
    const deadline = Date.now() + 3000;
    while (!check()) {
        assert.ok(Date.now() < deadline, 'Expected state was not published');
        await new Promise(resolve => setImmediate(resolve));
    }
}
async function setup() {
    const h = await createClassroomFixture();
    await h.command('teacher', { teacher: { name: '林老师', note: '' } });
    await h.command('settings', { value: { level: 'B1', targetLevel: 'B2' } });
    return h;
}
function teacher(h, intercept = async () => null) {
    const requests = [];
    h.flags.teacherResponse = async (request, round) => {
        const data = input(request);
        requests.push(data.action);
        const special = await intercept(data, request);
        if (special) { return special; }
        switch (data.action.kind) {
        case 'reading-article': return { toolCalls: [call('LearningArticle', { title: fixtureLesson.title, goal: fixtureLesson.goal,
            tier: 'short', kind: 'authored', text: fixtureLesson.materials[0].text })] };
        case 'reading-notes': return { toolCalls: [call('LearningReadingNotes', { explanations: data.action.paragraphIds.map(paragraphId => ({
            paragraphId, explanation: '用主题句组织段落，注意连接词。', terms: [] })) })] };
        case 'reading-essay': return { toolCalls: [call('LearningEssayTask', { prompt: 'Should cities plant more trees? Write about 300 words.' })] };
        default: return round === 1 ? { toolCalls: [call('LearningHelp', { exerciseIds: [], materialIds: [] })] } : { text: '我在，继续说。' };
        }
    };
    return requests;
}
async function startOriginal(h) {
    await send(h, 'prepare', { kind: 'reading-writing', message: '开始读写。' });
    await until(() => h.state().sourceChoice && !h.state().busy);
    await send(h, 'choose-original');
}

test('missing research configuration offers a choice before any model request; chatting remains available', async () => {
    const h = await setup();
    try {
        await h.command('prepare', { kind: 'reading-writing', message: '开始读写。' });
        assert.equal(h.counts.provider, 0);
        assert.equal(h.state().sourceChoice, true);
        assert.equal(h.state().unit, null);
        await h.command('talk', { message: '你好。' });
        assert.ok(h.counts.provider > 0);
        assert.equal(h.state().unit, null);
        await h.command('dismiss-source');
        assert.equal(h.state().sourceChoice, false);
    } finally { await h.dispose(); }
});

test('published text and summary boxes precede notes; preparation commutes with learner answers and conversation', async () => {
    const h = await setup();
    let release;
    const held = new Promise(resolve => { release = resolve; });
    const requests = teacher(h, async data => { if (data.action.kind === 'reading-notes') { await held; } });
    try {
        await startOriginal(h);
        await until(() => h.state().preparation?.phase === 'notes');
        const published = structuredClone(h.profile().unit);
        assert.equal(h.state().busy, false);
        assert.equal(published.exercises.length, published.materials[0].paragraphs.length);
        assert.equal(learningPreparation(published).ready, false);
        assert.equal(requests.filter(action => action.kind === 'reading-article').length, 1);
        await send(h, 'submit', { unitId: published.id, exerciseId: published.exercises[0].id, answer: { kind: 'text', text: 'Trees make cities more comfortable.' } });
        await until(() => !h.state().busy && h.profile().unit.attempts.length === 1);
        await send(h, 'talk', { message: '我可以先读下一段吗？' });
        await until(() => !h.state().chatBusy);
        release();
        await until(() => !h.state().preparation?.running);
        const ready = h.profile().unit;
        assert.equal(learningPreparation(ready).ready, true);
        assert.deepEqual(ready.materials, published.materials);
        assert.deepEqual(ready.exercises.slice(0, 2), published.exercises);
        assert.equal(ready.attempts[0].answer.text, 'Trees make cities more comfortable.');
        assert.equal(learningUnitStage(ready).stage, 'writing');
        assert.deepEqual(requests.filter(action => action.kind.startsWith('reading-')).map(action => action.kind), ['reading-article', 'reading-notes', 'reading-essay']);
        const calls = h.counts.provider;
        await h.reenter();
        await h.command('prepare', { kind: 'reading-writing', message: '继续读。' });
        assert.equal(h.counts.provider, calls);
        assert.equal(h.profile().unit.id, published.id);
    } finally { release(); await h.dispose(); }
});

test('a failed notes batch leaves text usable and does not prevent the essay; resume buys only missing notes', async () => {
    const h = await setup();
    let fail = true;
    const requests = teacher(h, async data => {
        if (fail && data.action.kind === 'reading-notes') { throw Object.assign(new Error('fixture'), { status: 503 }); }
    });
    try {
        await startOriginal(h);
        await until(() => h.state().unit && !h.state().preparation?.running);
        const first = structuredClone(h.profile().unit);
        assert.equal(learningPreparation(first).essay, true);
        assert.equal(learningPreparation(first).missing.length, 2);
        assert.ok(h.state().preparation.message);
        fail = false;
        await h.command('resume-preparation', { unitId: first.id });
        assert.equal(learningPreparation(h.profile().unit).ready, true);
        assert.deepEqual(h.profile().unit.exercises, first.exercises);
        assert.equal(requests.filter(action => action.kind === 'reading-article').length, 1);
        assert.equal(requests.filter(action => action.kind === 'reading-essay').length, 1);
        assert.equal(requests.filter(action => action.kind === 'reading-notes').length, 2);
    } finally { await h.dispose(); }
});

test('stopping supplementary work retains the article and rejects a late model result', async () => {
    const h = await setup();
    let release;
    const held = new Promise(resolve => { release = resolve; });
    teacher(h, async data => { if (data.action.kind === 'reading-notes') { await held; } });
    try {
        await startOriginal(h);
        await until(() => h.state().preparation?.phase === 'notes');
        const published = structuredClone(h.profile().unit);
        await send(h, 'cancel-preparation');
        release();
        await new Promise(resolve => setTimeout(resolve, 20));
        assert.deepEqual(h.profile().unit, published);
        assert.equal(h.state().preparation.running, false);
        await h.reenter();
        assert.equal(h.profile().unit.id, published.id);
        assert.equal(h.state().busy, false);
    } finally { release(); await h.dispose(); }
});

test('queued supplement before an answer preserves both, without moving incomplete reading into grading', async () => {
    const h = await setup();
    let release;
    const held = new Promise(resolve => { release = resolve; });
    teacher(h, async data => { if (data.action.kind === 'reading-notes') { await held; } });
    try {
        await startOriginal(h);
        await until(() => h.state().preparation?.phase === 'notes');
        await send(h, 'cancel-preparation');
        const before = structuredClone(h.profile().unit);
        const service = createLearningService(h.repository);
        const answer = service.prepareAttempt({ language: 'en', unitId: before.id, exerciseId: before.exercises[0].id,
            answer: { kind: 'text', text: 'A tree gives shade.' }, scope: before.scope, osId: before.originOsId, replays: 0, slowPlayback: false });
        const prepared = structuredClone(before);
        prepared.explanations = before.materials[0].paragraphs.map(paragraph => ({ materialId: before.materials[0].id, paragraphId: paragraph.id,
            explanation: 'Use a topic sentence.', terms: [] }));
        const [notesSave, answerSave] = await Promise.all([
            h.repository.supplement('en', before, prepared, () => true), answer.save(() => true),
        ]);
        assert.equal(notesSave.status, 'confirmed');
        assert.equal(answerSave.status, 'confirmed');
        assert.equal(h.profile().unit.explanations.length, 2);
        assert.equal(h.profile().unit.attempts.length, 1);
        const second = service.prepareAttempt({ language: 'en', unitId: before.id, exerciseId: before.exercises[1].id,
            answer: { kind: 'text', text: 'Trees help cities.' }, scope: before.scope, osId: before.originOsId, replays: 0, slowPlayback: false });
        await second.save(() => true);
        assert.equal(learningUnitStage(h.profile().unit).stage, 'writing');
    } finally { release(); await h.dispose(); }
});

test('an explicit chat submission uses the same available answer path while supplementary preparation runs', async () => {
    const h = await setup();
    let release;
    const held = new Promise(resolve => { release = resolve; });
    const answer = '请把这条作为我的第一段总结提交：Trees provide shade.';
    teacher(h, async (data, request) => {
        if (data.action.kind === 'reading-notes') { await held; }
        if (data.action.kind === 'talk' && !request.messages.some(message => message.role === 'tool')) {
            return { toolCalls: [call('LearningRequest', { action: 'submit', instruction: answer, exerciseId: data.training.exercises[0].id }),
                call('LearningHelp', { exerciseIds: [], materialIds: [] })] };
        }
    });
    try {
        await startOriginal(h);
        await until(() => h.state().preparation?.phase === 'notes');
        await send(h, 'talk', { message: answer });
        await until(() => h.profile().unit.attempts.length === 1 && !h.state().chatBusy && !h.state().busy);
        assert.equal(h.profile().unit.attempts[0].answer.text, answer);
        assert.equal(h.state().preparation.running, true);
    } finally { release(); await h.dispose(); }
});
