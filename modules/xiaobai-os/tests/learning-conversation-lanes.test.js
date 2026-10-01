import assert from 'node:assert/strict';
import test from 'node:test';
import { createClassroomFixture, fixtureLesson } from './fixtures/learning-classroom.js';
import { createLearningSession } from '../apps/learning/agent/session.js';

const requestData = request => {
    const message = request.messages.find(entry => entry.role === 'user' && entry.content.includes('<learning_request>'));
    return message && JSON.parse(message.content.split('<learning_request>\n')[1].split('\n</learning_request>')[0]);
};
const call = (name, args) => ({ id: name, name, arguments: JSON.stringify(args) });
function until(h, predicate) {
    if (predicate(h.state())) { return Promise.resolve(); }
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => { unsubscribe(); reject(new Error('Expected runtime state was not published')); }, 2000);
        const unsubscribe = h.bridge.subscribe(() => { if (predicate(h.state())) { clearTimeout(timeout); unsubscribe(); resolve(); } });
    });
}
async function send(h, action, input = {}) { return h.bridge.request(`learning/${action}`, { chatIdentity: h.state().chatIdentity, target: 'companion', ...input }); }

test('a learner can chat during preparation, and stopping the conversation does not stop that work', async t => {
    let releaseWork;
    const h = await createClassroomFixture(); t.after(() => { releaseWork?.(); return h.dispose(); });
    await h.command('teacher', { teacher: { name: '林老师', note: '' } });
    await h.command('settings', { value: {} });
    const workGate = new Promise(resolve => { releaseWork = resolve; });
    let workCalls = 0;
    h.flags.teacherResponse = (async request => {
        const data = requestData(request);
        if (data?.action.kind === 'prepare') {
            if (++workCalls === 1) { await workGate; return { toolCalls: [call('LearningLessonEdit', fixtureLesson)] }; }
            return { text: 'The article is ready.' };
        }
        assert.equal(request.tools.some(tool => ['LearningLessonEdit', 'LearningAssess', 'LearningComplete', 'LearningProfileEdit'].includes(tool.function.name)), false);
        return { text: 'Of course, we can talk while that is being prepared.' };
    });
    await send(h, 'prepare', { kind: 'lesson', message: 'Prepare a short lesson.' });
    await until(h, state => state.busy);
    await send(h, 'talk', { message: 'Can we chat meanwhile?' });
    await until(h, state => !state.chatBusy && state.conversation.turns.some(turn => turn.purpose === 'talk' && turn.status === 'finished'));
    assert.equal(h.state().busy, true);
    await send(h, 'cancel-chat');
    assert.equal(h.state().busy, true);
    releaseWork();
    await until(h, state => !state.busy);
    assert.equal(h.state().unit.title, fixtureLesson.title);
    assert.equal(h.state().conversation.turns.filter(turn => turn.status === 'finished').length, 1);
});

test('a chat request starts the native workbench action; ordinary conversation does not write a lesson', async t => {
    const h = await createClassroomFixture(); t.after(h.dispose);
    await h.command('teacher', { teacher: { name: '林老师', note: '' } });
    await h.command('settings', { value: {} });
    const before = h.counts.userWrites;
    await h.command('talk', { message: 'Just saying hello.' });
    assert.equal(h.counts.userWrites, before);
    const counts = new Map();
    h.flags.teacherResponse = (request => {
        const kind = requestData(request)?.action.kind;
        const count = (counts.get(kind) ?? 0) + 1; counts.set(kind, count);
        if (kind === 'talk' && count === 1) { return { toolCalls: [call('LearningRequest', { action: 'prepare', kind: 'lesson', instruction: 'Prepare a lesson.' })] }; }
        if (kind === 'prepare' && count === 1) { return { toolCalls: [call('LearningLessonEdit', fixtureLesson)] }; }
        return { text: kind === 'prepare' ? 'The lesson is ready.' : 'I will prepare that.' };
    });
    await h.command('talk', { message: 'Prepare a lesson.' });
    assert.equal(h.state().unit.title, fixtureLesson.title);
    assert.equal(counts.has('prepare'), true);
});

test('a delegated answer retains its message-time conditions even when the reply gives a hint first', async t => {
    const lesson = structuredClone(fixtureLesson);
    lesson.exercises[0].response = { kind: 'text' };
    lesson.exercises[0].rule = { kind: 'semantic' };
    const h = await createClassroomFixture({ lesson }); t.after(h.dispose);
    await h.openLesson();
    const exerciseId = h.state().unit.exercises[0].id;
    const message = 'Please submit this: Trees make city life more comfortable.';
    let round = 0;
    h.flags.teacherResponse = async request => {
        const data = requestData(request);
        if (data?.action.kind === 'talk') {
            round++;
            if (round === 1) { return { toolCalls: [call('LearningRequest', { action: 'submit', exerciseId, instruction: 'Please submit this:' })] }; }
            return { text: 'I will submit your answer. Notice how the second paragraph broadens the idea.' };
        }
        return { text: 'Your answer has been received.' };
    };
    await h.command('talk', { message });
    const saved = h.profile().unit.attempts.at(-1);
    assert.equal(saved.answer.text, message);
    assert.equal(saved.help.hint, false);
    assert.deepEqual(h.profile().unit.revealed.hints, []);
});

test('conversation tools reject direct writes and invented requests; replacement preserves its kind and waits for confirmation', async t => {
    const h = await createClassroomFixture(); t.after(h.dispose);
    await h.openLesson();
    const before = structuredClone(h.profile());
    const message = 'Replace this with a lesson. Set my target to B2.';
    const session = createLearningSession(h.repository, { language: 'en', osId: before.unit.originOsId,
        inputScope: before.unit.scope, action: { kind: 'talk' }, learnerMessage: message });
    for (const name of ['LearningLessonEdit', 'LearningAssess', 'LearningProfileEdit', 'LearningComplete', 'LearningAnswer']) {
        assert.equal(session.executeTool(name, {}).ok, false);
    }
    assert.equal(session.executeTool('LearningRequest', { action: 'prepare', instruction: 'An invented learner request.' }).ok, false);
    assert.equal(session.delegation(), null);
    assert.equal(session.executeTool('LearningRequest', { action: 'prepare', kind: 'lesson', instruction: 'Replace this with a lesson.' }).status, 'confirmation');
    assert.equal(session.presentation().unitKind, 'lesson');
    assert.equal(session.delegation(), null);
    assert.equal(session.executeTool('LearningRequest', { action: 'settings', instruction: 'Set my target to B2.', value: { targetLevel: 'B2' } }).ok, false);
    assert.equal((await session.commit(() => true)).status, 'unchanged');
    assert.deepEqual(h.profile(), before);
    const passive = createLearningSession(h.repository, { language: 'en', osId: before.unit.originOsId,
        inputScope: before.unit.scope, action: { kind: 'companion' }, learnerMessage: message });
    assert.equal(passive.executeTool('LearningRequest', { action: 'settings', instruction: message, value: { targetLevel: 'B2' } }).ok, false);
});

test('an explicit chat delegation is rejected while work is running, without queuing it', async t => {
    let release;
    const h = await createClassroomFixture(); t.after(() => { release?.(); return h.dispose(); });
    await h.openLesson();
    const gate = new Promise(resolve => { release = resolve; });
    let response;
    let workCalls = 0;
    let chatCalls = 0;
    h.flags.teacherResponse = (async request => {
        if (requestData(request)?.action.kind === 'prepare') { workCalls++; await gate; return { text: 'Preparation remains unchanged.' }; }
        if (++chatCalls === 1) { return { toolCalls: [call('LearningRequest', { action: 'settings', instruction: 'Set my target to B2.', value: { targetLevel: 'B2' } })] }; }
        response = JSON.parse(request.messages.findLast(entry => entry.role === 'tool' && entry.toolName === 'LearningRequest').content);
        return { text: 'That operation has not run while preparation is active.' };
    });
    const before = h.profile().goal.targetLevel;
    await send(h, 'prepare', { kind: 'lesson', message: 'Prepare this lesson.' });
    await until(h, state => state.busy);
    const native = await send(h, 'settings', { value: { targetLevel: 'C1' } });
    assert.equal(native.result.rejected, 'busy');
    assert.equal(h.profile().goal.targetLevel, before);
    await send(h, 'talk', { message: 'Set my target to B2.' });
    await until(h, state => !state.chatBusy);
    assert.deepEqual(response, { ok: false, status: 'busy' });
    release(); await until(h, state => !state.busy);
    assert.equal(h.profile().goal.targetLevel, before);
    assert.equal(workCalls, 1);
});

test('a quiet companion opportunity makes one request and leaves no message, unread turn or failed reply', async t => {
    const h = await createClassroomFixture(); t.after(h.dispose); await h.openLesson();
    h.flags.teacherResponse = () => ({ text: '' });
    const before = h.state().conversation.turns.length;
    const calls = h.counts.provider;
    await send(h, 'companion');
    await until(h, state => !state.companionBusy);
    assert.equal(h.counts.provider, calls + 1);
    assert.equal(h.state().conversation.turns.length, before);
    assert.equal(h.state().remark, null);
    assert.equal(h.state().chatMessage, '');
    assert.deepEqual(h.failures, []);
});
