import test from 'node:test';
import assert from 'node:assert/strict';

import { countChatFloors, createTaskRecord } from '../task-model.js';
import { selectDueTaskRecords } from '../task-scheduler.js';

function record(overrides = {}) {
    return createTaskRecord({
        id: 'task-1',
        name: 'matrix',
        interval: 2,
        floorType: 'all',
        triggerTiming: 'after_ai',
        disabled: false,
        ...overrides,
    }, { scope: 'global', owner: 'global' });
}

function conversationEvents(turns = 6) {
    const events = [];
    for (let turn = 1; turn <= turns; turn++) {
        events.push({
            label: `before:${turn}`,
            triggerContext: 'before_user',
            counts: { all: turn * 2, user: turn, llm: turn },
        });
        events.push({
            label: `after:${turn}`,
            triggerContext: 'after_ai',
            counts: { all: turn * 2 + 1, user: turn, llm: turn + 1 },
        });
    }
    return events;
}

function dueLabels(task) {
    const taskRecord = record(task);
    return conversationEvents().filter(event => selectDueTaskRecords([taskRecord], event).length > 0).map(event => event.label);
}

test('chat snapshot counting preserves zero-based floor semantics and counts system messages only in all', () => {
    const counts = countChatFloors([
        { is_user: false, is_system: false },
        { is_user: true, is_system: false },
        { is_user: false, is_system: true },
        { is_user: false, is_system: false },
    ]);
    assert.deepEqual(counts, { all: 4, user: 1, llm: 2 });
});

test('historical absolute-floor trigger matrix remains unchanged', () => {
    assert.deepEqual(dueLabels({ interval: 2, floorType: 'all', triggerTiming: 'after_ai' }), [
        'after:1', 'after:2', 'after:3', 'after:4', 'after:5', 'after:6',
    ]);
    assert.deepEqual(dueLabels({ interval: 2, floorType: 'all', triggerTiming: 'before_user' }), []);
    assert.deepEqual(dueLabels({ interval: 3, floorType: 'all', triggerTiming: 'any_message' }), [
        'before:2', 'after:3', 'before:5', 'after:6',
    ]);
    assert.deepEqual(dueLabels({ interval: 2, floorType: 'user', triggerTiming: 'any_message' }), [
        'before:3', 'after:3', 'before:5', 'after:5',
    ]);
    assert.deepEqual(dueLabels({ interval: 2, floorType: 'llm', triggerTiming: 'any_message' }), [
        'after:2', 'before:3', 'after:4', 'before:5', 'after:6',
    ]);
});

test('event timing, initialization alias, one-shot floor, disabled state and cooldown preserve the public contract', () => {
    const initialization = record({ id: 'init', triggerTiming: 'initialization', interval: 99 });
    assert.equal(initialization.definition.triggerTiming, 'character_init');
    assert.deepEqual(selectDueTaskRecords([initialization], { triggerContext: 'chat_created' }), [initialization]);
    const zeroIntervalInit = record({ id: 'zero-init', triggerTiming: 'initialization', interval: 0 });
    assert.deepEqual(selectDueTaskRecords([zeroIntervalInit], { triggerContext: 'chat_created' }), [zeroIntervalInit]);
    const eventTasks = [
        record({ id: 'zero-chat', triggerTiming: 'chat_changed', interval: 0 }),
        record({ id: 'invalid-chat', triggerTiming: 'chat_changed', interval: 'not-a-number' }),
    ];
    assert.deepEqual(selectDueTaskRecords(eventTasks, { triggerContext: 'chat_changed' }), eventTasks);
    assert.equal(selectDueTaskRecords([
        record({ id: 'manual-floor', triggerTiming: 'after_ai', interval: 0 }),
    ], { triggerContext: 'after_ai', counts: { all: 3, user: 1, llm: 2 } }).length, 0);

    const oneShot = record({ id: 'once', triggerTiming: 'only_this_floor', floorType: 'user', interval: 2 });
    assert.deepEqual(dueLabels(oneShot.definition), ['before:3', 'after:3']);
    assert.equal(selectDueTaskRecords([record({ disabled: true })], {
        triggerContext: 'after_ai', counts: { all: 3, user: 1, llm: 2 },
    }).length, 0);
    assert.equal(selectDueTaskRecords([record()], {
        triggerContext: 'after_ai', counts: { all: 3, user: 1, llm: 2 }, coolingDownKeys: new Set([record().key]),
    }).length, 0);
});
