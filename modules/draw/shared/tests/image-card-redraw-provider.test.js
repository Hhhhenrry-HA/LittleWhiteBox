import assert from 'node:assert/strict';
import test from 'node:test';
import { createImageCardRedrawProvider } from '../image-card-redraw-provider.js';

function setup(execute) {
    const message = { mes: '[image:slot]', swipe_id: 0 };
    const ctx = { chatId: 'original', chat: [{ mes: 'earlier' }, message] };
    const input = { ctx, message, messageId: 1, swipeIndex: 0,
        tasks: [{ scene: 'retained tags', placement: { mode: 'existing', slotId: 'slot' } }] };
    const jobs = new Map(), states = [];
    let currentContext = ctx;
    const options = {
        execute,
        createJob: messageId => {
            if (jobs.has(messageId)) throw new Error('occupied');
            const job = { messageId, controller: new AbortController() };
            jobs.set(messageId, job);
            return job;
        },
        releaseJob: job => { if (jobs.get(job.messageId) === job) jobs.delete(job.messageId); },
        ownsJob: job => jobs.get(job.messageId) === job,
        getCurrentContext: () => currentContext,
        setStateForMessage: (messageId, state, data) => states.push({ messageId, state, data }),
        classifyError: error => ({ code: error.code }),
    };
    return { input, jobs, states, options,
        switchContext: next => { currentContext = next; },
        run: () => createImageCardRedrawProvider(options)(input) };
}

test('card redraw replaces old feedback and uses the floor job that capsule cancellation targets', async () => {
    let received;
    const result = { success: 1, total: 1, aborted: false };
    const h = setup(async input => {
        received = input;
        assert.equal(h.jobs.get(1), input.job);
        assert.deepEqual(h.states.map(item => item.state), ['idle', 'queued']);
        input.onStateChange('progress', { current: 1, total: 1 });
        input.onStateChange('success', result);
        return result;
    });
    assert.equal(await h.run(), result);
    assert.equal(received.message, h.input.message);
    assert.equal(received.tasks, h.input.tasks);
    assert.deepEqual(h.states.map(item => item.state), ['idle', 'queued', 'gen', 'success']);
    assert.ok(h.states.every(item => item.messageId === 1));
    assert.equal(h.states.at(-1).data, result);
    assert.equal(h.jobs.size, 0);
});

for (const type of ['new-tags', 'owned-batch']) test(`${type} retains its existing UI and job ownership`, async () => {
    let received;
    const h = setup(async input => { received = input; });
    if (type === 'new-tags') h.input.tasks[0].placement = { mode: 'tail' };
    else h.input.job = { controller: new AbortController() };
    h.options.createJob = () => assert.fail('must not create another job');
    h.options.setStateForMessage = () => assert.fail('must not create another UI owner');
    await h.run();
    assert.equal(received, h.input);
    assert.equal(h.states.length, 0);
});

test('a conflicting floor task keeps its capsule and is not released by the rejected redraw', async () => {
    const h = setup(() => assert.fail('no second request'));
    const existing = h.options.createJob(1);
    await assert.rejects(h.run());
    assert.equal(h.jobs.get(1), existing);
    assert.equal(h.states.length, 0);
});

for (const kind of ['failure', 'cancel', 'uncertain', 'detached', 'lease-lost']) {
    test(`redraw ${kind} settles feedback without swallowing the error or losing recoverable work`, async () => {
        const error = new Error(kind);
        if (kind === 'uncertain') error.uncertain = true;
        if (kind === 'detached') error.detached = true;
        if (kind === 'lease-lost') error.code = 'PENDING_JOB_LEASE_LOST';
        const h = setup(async input => {
            if (kind === 'cancel') h.jobs.get(1).controller.abort();
            assert.equal(input.job.controller.signal.aborted, kind === 'cancel');
            throw error;
        });
        await assert.rejects(h.run(), caught => caught === error);
        assert.equal(h.states.at(-1).state, kind === 'failure' ? 'error' : kind === 'cancel' ? 'idle' : 'uncertain');
        assert.equal(h.jobs.size, 0);
    });
}

test('cancelled and partially delivered outcomes are not reported as full success', async () => {
    for (const result of [{ success: 0, total: 1, aborted: true }, { success: 0, total: 1, aborted: false }]) {
        const h = setup(async input => { input.onStateChange('success', result); return result; });
        await h.run();
        assert.equal(h.states.at(-1).state, result.aborted ? 'idle' : 'partial');
    }
});

for (const change of ['chat', 'message', 'swipe', 'owner']) {
    test(`redraw finishing after a ${change} change cannot overwrite another capsule`, async () => {
        const h = setup(async input => {
            if (change === 'chat') h.switchContext({ chatId: 'next', chat: h.input.ctx.chat });
            if (change === 'message') h.input.ctx.chat[1] = { ...h.input.message };
            if (change === 'swipe') h.input.message.swipe_id = 1;
            if (change === 'owner') h.jobs.set(1, { replacement: true });
            const count = h.states.length;
            input.onStateChange('progress', { current: 1, total: 1 });
            input.onStateChange('success', { success: 1, total: 1 });
            assert.equal(h.states.length, count);
            throw new Error('late error');
        });
        await assert.rejects(h.run());
        assert.deepEqual(h.states.map(item => item.state), ['idle', 'queued']);
        if (change === 'owner') assert.deepEqual(h.jobs.get(1), { replacement: true });
        else assert.equal(h.jobs.size, 0);
    });
}

test('a stale target is rejected before claiming a floor job or updating its capsule', async () => {
    const h = setup(() => assert.fail('stale target must not run'));
    h.input.message.swipe_id = 1;
    h.options.createJob = () => assert.fail('stale target must not claim a job');
    await assert.rejects(h.run());
    assert.equal(h.jobs.size, 0);
    assert.equal(h.states.length, 0);
});
