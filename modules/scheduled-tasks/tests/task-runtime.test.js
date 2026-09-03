import test from 'node:test';
import assert from 'node:assert/strict';

import { TaskOriginTracker } from '../task-origin.js';
import { ScheduledTaskRuntime } from '../task-runtime.js';

function deferred() {
    let resolve;
    const promise = new Promise(done => { resolve = done; });
    return { promise, resolve };
}

function runtime(executeSlashCommand = async command => command, origin = null) {
    let id = 0;
    return new ScheduledTaskRuntime({
        executeSlashCommand,
        createId: () => `id-${++id}`,
        getChatId: () => 'chat-a',
        log: { info() {}, warn() {}, error() {} },
        origin,
    });
}

test('ordinary slash and taskjs segments remain serial', async t => {
    const order = [];
    globalThis.__scheduledRuntimeOrder = order;
    t.after(() => { delete globalThis.__scheduledRuntimeOrder; });
    const taskRuntime = runtime(async command => {
        order.push(command);
        return command;
    });

    const result = await taskRuntime.executeCommands(`
/one
<<taskjs>>globalThis.__scheduledRuntimeOrder.push('js'); return 'body';<</taskjs>>
/two
`, { taskKey: 'global:a', taskName: 'serial' });

    assert.deepEqual(order, ['/one', 'js', '/two']);
    assert.equal(result, '/two');
    assert.equal(taskRuntime.size, 0);
});

test('ordinary reruns wait for the previous taskjs body to settle', async t => {
    const gate = deferred();
    const order = [];
    globalThis.__scheduledRerunGate = gate.promise;
    globalThis.__scheduledRerunOrder = order;
    t.after(() => {
        delete globalThis.__scheduledRerunGate;
        delete globalThis.__scheduledRerunOrder;
    });
    const taskRuntime = runtime();

    const first = taskRuntime.executeCommands(`<<taskjs>>
        globalThis.__scheduledRerunOrder.push('first-start');
        await globalThis.__scheduledRerunGate;
        globalThis.__scheduledRerunOrder.push('first-end');
    <</taskjs>>`, { taskKey: 'global:rerun', taskName: 'ordinary' }).catch(error => error);
    await Promise.resolve();

    const second = taskRuntime.executeCommands(`<<taskjs>>
        globalThis.__scheduledRerunOrder.push('second');
    <</taskjs>>`, { taskKey: 'global:rerun', taskName: 'ordinary' });
    await Promise.resolve();
    assert.deepEqual(order, ['first-start']);

    gate.resolve();
    const firstResult = await first;
    assert.equal(firstResult?.name, 'AbortError');
    await second;
    assert.deepEqual(order, ['first-start', 'first-end', 'second']);
});

test('safe timers and listeners remain owned without holding command execution open', async t => {
    const target = new EventTarget();
    globalThis.__scheduledRuntimeTarget = target;
    globalThis.__scheduledRuntimeEvents = 0;
    t.after(() => {
        delete globalThis.__scheduledRuntimeTarget;
        delete globalThis.__scheduledRuntimeEvents;
    });
    const taskRuntime = runtime();

    await taskRuntime.executeCommands(`<<taskjs>>
        setIntervalSafe(() => {}, 60000);
        addListener(globalThis.__scheduledRuntimeTarget, 'tick', () => globalThis.__scheduledRuntimeEvents++);
    <</taskjs>>`, { taskKey: 'global:resources', taskName: 'resources' });

    assert.deepEqual(taskRuntime.getStats(), {
        runs: 1, callbacks: 0, activeExecutions: 0, timeouts: 0, intervals: 1, listeners: 1,
    });
    target.dispatchEvent(new Event('tick'));
    assert.equal(globalThis.__scheduledRuntimeEvents, 1);

    taskRuntime.stopTask('global:resources');
    target.dispatchEvent(new Event('tick'));
    assert.equal(globalThis.__scheduledRuntimeEvents, 1);
    assert.equal(taskRuntime.size, 0);
});

test('an unawaited STscript call remains owned until the command settles', async () => {
    const gate = deferred();
    let commandSignal = null;
    const taskRuntime = runtime((command, options) => {
        assert.equal(command, '/slow');
        commandSignal = options?.signal || null;
        return gate.promise;
    });

    await taskRuntime.executeCommands(`<<taskjs>>
        STscript('/slow');
        return 'body-finished';
    <</taskjs>>`, { taskKey: 'global:unawaited-command', taskName: 'unawaited-command' });

    assert.equal(taskRuntime.size, 1);
    assert.equal(commandSignal?.aborted, false);
    gate.resolve('command-finished');
    await new Promise(resolve => setTimeout(resolve, 0));
    assert.equal(taskRuntime.size, 0);
    assert.equal(commandSignal?.aborted, true);
});

test('rerunning a task with an empty script disposes resources from its previous run', async () => {
    const taskRuntime = runtime();
    await taskRuntime.executeCommands('<<taskjs>>setIntervalSafe(() => {}, 60000);<</taskjs>>', {
        taskKey: 'global:empty', taskName: 'empty',
    });
    assert.equal(taskRuntime.getStats().intervals, 1);

    assert.equal(await taskRuntime.executeCommands('', {
        taskKey: 'global:empty', taskName: 'empty',
    }), null);
    assert.equal(taskRuntime.size, 0);
    assert.equal(taskRuntime.getStats().intervals, 0);
});

test('[x] taskjs body runs in the background', async t => {
    globalThis.__scheduledRuntimeBackgroundDone = false;
    t.after(() => {
        delete globalThis.__scheduledRuntimeBackgroundDone;
        delete globalThis.__scheduledRuntimeBackgroundRelease;
    });
    const taskRuntime = runtime();

    await taskRuntime.executeCommands(`<<taskjs>>
        await new Promise(resolve => { globalThis.__scheduledRuntimeBackgroundRelease = resolve; });
        globalThis.__scheduledRuntimeBackgroundDone = true;
    <</taskjs>>`, { taskKey: 'global:bg', taskName: '[x] background' });

    assert.equal(globalThis.__scheduledRuntimeBackgroundDone, false);
    assert.equal(taskRuntime.size, 1);
    globalThis.__scheduledRuntimeBackgroundRelease();
    await new Promise(resolve => setTimeout(resolve, 0));
    assert.equal(globalThis.__scheduledRuntimeBackgroundDone, true);
    assert.equal(taskRuntime.size, 0);
});

test('floor listeners survive initial JS completion and are removed on rerun', async t => {
    globalThis.__scheduledRuntimeFloors = [];
    t.after(() => { delete globalThis.__scheduledRuntimeFloors; });
    const taskRuntime = runtime();

    await taskRuntime.executeCommands(`<<taskjs>>
        addFloorListener(payload => globalThis.__scheduledRuntimeFloors.push(payload.currentFloor), {
            interval: 2, timing: 'after_ai', floorType: 'all'
        });
    <</taskjs>>`, { taskKey: 'global:floor', taskName: 'floor' });

    const [listener] = taskRuntime.listFloorCallbacks();
    assert.equal(listener.id.startsWith('floor_fl_'), true);
    assert.deepEqual(listener.options, { interval: 2, timing: 'after_ai', floorType: 'all' });
    await taskRuntime.invokeFloorCallback(listener.id, { currentFloor: 4 }, null);
    assert.deepEqual(globalThis.__scheduledRuntimeFloors, [4]);

    await taskRuntime.executeCommands('/noop', { taskKey: 'global:floor', taskName: 'floor' });
    assert.equal(taskRuntime.callbackCount, 0);
});

test('a floor callback may unregister itself before its async body settles', async t => {
    const gate = deferred();
    globalThis.__scheduledFloorGate = gate.promise;
    globalThis.__scheduledFloorDone = false;
    t.after(() => {
        delete globalThis.__scheduledFloorGate;
        delete globalThis.__scheduledFloorDone;
    });
    const taskRuntime = runtime();

    await taskRuntime.executeCommands(`<<taskjs>>
        const off = addFloorListener(async () => {
            off();
            await globalThis.__scheduledFloorGate;
            globalThis.__scheduledFloorDone = true;
        });
    <</taskjs>>`, { taskKey: 'global:self-off', taskName: 'self-off' });

    const [listener] = taskRuntime.listFloorCallbacks();
    const invocation = taskRuntime.invokeFloorCallback(listener.id, { currentFloor: 1 }, null);
    assert.equal(taskRuntime.callbackCount, 0);
    assert.equal(taskRuntime.size, 1);
    gate.resolve();
    await invocation;
    assert.equal(globalThis.__scheduledFloorDone, true);
    assert.equal(taskRuntime.size, 0);
});

test('external listener signal removes both DOM and runtime ownership', async t => {
    const target = new EventTarget();
    const controller = new AbortController();
    globalThis.__scheduledSignalTarget = target;
    globalThis.__scheduledSignalController = controller;
    t.after(() => {
        delete globalThis.__scheduledSignalTarget;
        delete globalThis.__scheduledSignalController;
    });
    const taskRuntime = runtime();

    await taskRuntime.executeCommands(`<<taskjs>>
        addListener(globalThis.__scheduledSignalTarget, 'tick', () => {}, {
            signal: globalThis.__scheduledSignalController.signal,
        });
    <</taskjs>>`, { taskKey: 'global:signal', taskName: 'signal' });
    assert.equal(taskRuntime.getStats().listeners, 1);

    controller.abort();
    assert.equal(taskRuntime.getStats().listeners, 0);
    assert.equal(taskRuntime.size, 0);
});

test('duplicate addListener calls retain native single-registration semantics', async t => {
    const target = new EventTarget();
    globalThis.__scheduledDuplicateTarget = target;
    globalThis.__scheduledDuplicateCalls = 0;
    t.after(() => {
        delete globalThis.__scheduledDuplicateTarget;
        delete globalThis.__scheduledDuplicateCalls;
        delete globalThis.__scheduledDuplicateOff;
    });
    const taskRuntime = runtime();

    await taskRuntime.executeCommands(`<<taskjs>>
        const handler = () => globalThis.__scheduledDuplicateCalls++;
        addListener(globalThis.__scheduledDuplicateTarget, 'tick', handler);
        globalThis.__scheduledDuplicateOff = addListener(globalThis.__scheduledDuplicateTarget, 'tick', handler);
    <</taskjs>>`, { taskKey: 'global:duplicate-listener', taskName: 'duplicate-listener' });

    assert.equal(taskRuntime.getStats().listeners, 1);
    target.dispatchEvent(new Event('tick'));
    assert.equal(globalThis.__scheduledDuplicateCalls, 1);
    globalThis.__scheduledDuplicateOff();
    assert.equal(taskRuntime.size, 0);
});

test('an async DOM listener may unregister itself without aborting its own body', async t => {
    const target = new EventTarget();
    const gate = deferred();
    globalThis.__scheduledSelfOffTarget = target;
    globalThis.__scheduledSelfOffGate = gate.promise;
    globalThis.__scheduledSelfOffDone = false;
    t.after(() => {
        delete globalThis.__scheduledSelfOffTarget;
        delete globalThis.__scheduledSelfOffGate;
        delete globalThis.__scheduledSelfOffDone;
        delete globalThis.__scheduledSelfOff;
    });
    const taskRuntime = runtime();

    await taskRuntime.executeCommands(`<<taskjs>>
        globalThis.__scheduledSelfOff = addListener(globalThis.__scheduledSelfOffTarget, 'tick', async () => {
            globalThis.__scheduledSelfOff();
            await globalThis.__scheduledSelfOffGate;
            globalThis.__scheduledSelfOffDone = true;
        });
    <</taskjs>>`, { taskKey: 'global:listener-self-off', taskName: 'listener-self-off' });

    target.dispatchEvent(new Event('tick'));
    assert.equal(taskRuntime.getStats().listeners, 0);
    assert.equal(taskRuntime.size, 1);
    gate.resolve();
    await new Promise(resolve => setTimeout(resolve, 0));
    assert.equal(globalThis.__scheduledSelfOffDone, true);
    assert.equal(taskRuntime.size, 0);
});

test('taskContext retains legacy public identity while exposing the isolated run key', async t => {
    globalThis.__scheduledTaskContext = null;
    t.after(() => { delete globalThis.__scheduledTaskContext; });
    const taskRuntime = runtime();
    const js = 'globalThis.__scheduledTaskContext = { ...taskContext };';

    await taskRuntime.executeCommands(`<<taskjs>>${js}<</taskjs>>`, {
        taskKey: '["character","owner.png","task-id"]',
        taskName: '  Existing Task  ',
    });

    const context = globalThis.__scheduledTaskContext;
    assert.equal(context.taskName, '  Existing Task  ');
    assert.equal(context.stableKey, 'Existing Task');
    assert.equal(context.codeSig, '1waqi89');
    assert.equal(context.runKey, '["character","owner.png","task-id"]');
    assert.equal(context.chatId, 'chat-a');
});

test('task cleanup event retains the legacy task name and signature payload', async t => {
    const events = [];
    const previousWindow = globalThis.window;
    globalThis.window = { dispatchEvent: event => events.push(event) };
    globalThis.__scheduledCleanupSig = null;
    t.after(() => {
        if (previousWindow === undefined) delete globalThis.window;
        else globalThis.window = previousWindow;
        delete globalThis.__scheduledCleanupSig;
    });
    const taskRuntime = runtime();

    await taskRuntime.executeCommands(`<<taskjs>>
        globalThis.__scheduledCleanupSig = taskContext.codeSig;
    <</taskjs>>`, { taskKey: 'global:cleanup', taskName: '  cleanup task  ' });

    assert.equal(events.length, 1);
    assert.equal(events[0].type, 'xiaobaix-task-cleaned');
    assert.deepEqual(events[0].detail, {
        taskName: 'cleanup task',
        signature: globalThis.__scheduledCleanupSig,
    });
});

test('each taskjs block retains its own legacy cleanup event', async t => {
    const events = [];
    const previousWindow = globalThis.window;
    globalThis.window = { dispatchEvent: event => events.push(event.detail) };
    const taskRuntime = runtime();
    t.after(() => {
        if (previousWindow === undefined) delete globalThis.window;
        else globalThis.window = previousWindow;
        delete globalThis.__scheduledCleanupFirst;
        delete globalThis.__scheduledCleanupSecond;
    });

    await taskRuntime.executeCommands(`
        <<taskjs>>globalThis.__scheduledCleanupFirst = taskContext.codeSig;<</taskjs>>
        <<taskjs>>globalThis.__scheduledCleanupSecond = taskContext.codeSig;<</taskjs>>
    `, { taskKey: 'global:cleanup-many', taskName: 'cleanup many' });

    assert.deepEqual(events, [
        { taskName: 'cleanup many', signature: globalThis.__scheduledCleanupFirst },
        { taskName: 'cleanup many', signature: globalThis.__scheduledCleanupSecond },
    ]);
});

test('runtime command ownership covers the ordinary user-message shape emitted by /send exactly once', async () => {
    const gate = deferred();
    const origin = new TaskOriginTracker();
    const taskRuntime = runtime(() => gate.promise, origin);
    const execution = taskRuntime.executeCommands('/send generated', {
        taskKey: 'global:origin', taskName: 'origin',
    });
    await Promise.resolve();

    assert.equal(origin.consumeTaskMessage({ is_user: true, extra: {} }), true);
    assert.equal(origin.consumeTaskMessage({ is_user: true, extra: {} }), false);

    gate.resolve('sent');
    await execution;
    assert.equal(origin.consumeTaskMessage({ is_user: true, extra: {} }), false);
});

test('chat invalidation releases a non-cooperative awaited command and prevents later segments', async () => {
    const wait = deferred();
    const commands = [];
    let commandSignal = null;
    const taskRuntime = runtime((command, options) => {
        commands.push(command);
        commandSignal = options?.signal || null;
        return wait.promise;
    });
    const outer = new AbortController();

    const execution = taskRuntime.executeCommands('/wait\n<<taskjs>>globalThis.__mustNotRun = true;<</taskjs>>', {
        taskKey: 'global:abort', taskName: 'abort', signal: outer.signal,
    });
    outer.abort('chat_changed');
    await assert.rejects(execution, error => error?.name === 'AbortError');
    assert.deepEqual(commands, ['/wait']);
    assert.equal(commandSignal?.aborted, true);
    assert.equal(globalThis.__mustNotRun, undefined);
    assert.equal(taskRuntime.size, 0);
    wait.resolve();
});
