import test from 'node:test';
import assert from 'node:assert/strict';

import { TaskOriginTracker } from '../task-origin.js';

test('task message commands consume only the host events they can identify', () => {
    const tracker = new TaskOriginTracker();
    const normal = { is_user: true, extra: {} };
    const slash = { is_user: true, extra: { model: 'slash command' } };

    const delay = tracker.beginCommand('/delay 10000');
    assert.equal(tracker.consumeTaskMessage(normal), false);
    assert.equal(tracker.consumeTaskMessage(slash), false);

    const send = tracker.beginCommand('/send hello');
    assert.equal(tracker.consumeTaskMessage(normal), true);
    assert.equal(tracker.consumeTaskMessage(normal), false);
    tracker.endCommand(send);

    const markedBatch = tracker.beginCommand('/sendas name=A hello | /comment note');
    assert.equal(tracker.consumeTaskMessage(slash, 'command'), true);
    assert.equal(tracker.consumeTaskMessage(slash), true);
    assert.equal(tracker.consumeTaskMessage(slash), false);
    tracker.endCommand(markedBatch);

    const chainedSend = tracker.beginCommand('/delay 1000 | /send later | /send again');
    assert.equal(tracker.consumeTaskMessage(normal), true);
    assert.equal(tracker.consumeTaskMessage(normal), true);
    assert.equal(tracker.consumeTaskMessage(normal), false);
    tracker.endCommand(chainedSend);

    const quotedPipe = tracker.beginCommand('/echo "not | /send a command" | /send real');
    assert.equal(tracker.consumeTaskMessage(normal), true);
    assert.equal(tracker.consumeTaskMessage(normal), false);
    tracker.endCommand(quotedPipe);
    tracker.endCommand(delay);
});

test('only generation commands that still await their generation establish task origin', () => {
    const tracker = new TaskOriginTracker();

    const detached = tracker.beginCommand('/trigger await=false');
    tracker.endCommand(detached);
    assert.equal(tracker.noteGenerationStarted(), false);
    assert.equal(tracker.consumeGenerationSettled(), false);

    const awaited = tracker.beginCommand('/trigger await=true');
    assert.equal(tracker.noteGenerationStarted(), true);
    assert.equal(tracker.consumeGenerationSettled(), true);
    assert.equal(tracker.consumeGenerationSettled(), false);
    tracker.endCommand(awaited);

    const chainedGeneration = tracker.beginCommand('/delay 1000 | /trigger await=true');
    assert.equal(tracker.noteGenerationStarted(), true);
    assert.equal(tracker.consumeGenerationSettled(), true);
    tracker.endCommand(chainedGeneration);

    const swipe = tracker.beginCommand('/swipe await=on');
    assert.equal(tracker.noteGenerationStarted(), true);
    assert.equal(tracker.consumeGenerationSettled(), true);
    tracker.endCommand(swipe);

    const quietGeneration = tracker.beginCommand('/echo start | /gen prompt');
    assert.equal(tracker.noteGenerationStarted(), true);
    assert.equal(tracker.consumeGenerationSettled(), true);
    tracker.endCommand(quietGeneration);

    const unsupportedBoolean = tracker.beginCommand('/trigger await=yes');
    assert.equal(tracker.noteGenerationStarted(), false);
    tracker.endCommand(unsupportedBoolean);
});

test('/ask owns both its ordinary user prompt and awaited generation', () => {
    const tracker = new TaskOriginTracker();
    const ask = tracker.beginCommand('/ask name=Alice Hello');

    assert.equal(tracker.consumeTaskMessage({ is_user: true, extra: {} }), true);
    assert.equal(tracker.consumeTaskMessage({ is_user: true, extra: {} }), false);
    assert.equal(tracker.noteGenerationStarted(), true);
    assert.equal(tracker.consumeGenerationSettled(), true);
    tracker.endCommand(ask);
});

test('reset invalidates all command and generation ownership from the old chat', () => {
    const tracker = new TaskOriginTracker();
    tracker.beginCommand('/send old chat');
    tracker.beginCommand('/ask Character');
    assert.equal(tracker.noteGenerationStarted(), true);

    tracker.reset();
    assert.equal(tracker.consumeTaskMessage({ extra: { model: 'slash command' } }), false);
    assert.equal(tracker.consumeGenerationSettled(), false);
});
