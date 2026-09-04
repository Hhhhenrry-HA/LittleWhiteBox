import assert from 'node:assert/strict';
import test from 'node:test';

import {
    logDrawRunPlannerFailures,
    resetDrawRunPlannerFailureLogsForTests,
} from '../draw-run-debug.js';

test('new Planner validation failures enter DEBUG Log once with the model output and schema error', () => {
    resetDrawRunPlannerFailureLogsForTests();
    const entries = [];
    const logger = {
        isEnabled: () => true,
        warn(moduleId, message) { entries.push({ moduleId, message }); },
    };
    const run = {
        id: 'run-debug-1',
        progress: {
            validationFailures: [{
                attempt: 1,
                errorCode: 'TOOL_ARGUMENTS_SCHEMA_INVALID',
                errorMessage: 'images[0].characters must be an array',
                errorPath: 'images[0].characters',
                errorRule: 'must be an array',
                received: 'none',
                expected: [],
                modelOutput: '{"toolCalls":[{"name":"submit_scene_plan","arguments":"bad"}]}',
                modelOutputTruncated: false,
            }],
        },
    };

    assert.equal(logDrawRunPlannerFailures(run, logger), 1);
    assert.equal(logDrawRunPlannerFailures(run, logger), 0);
    assert.equal(entries.length, 1);
    assert.equal(entries[0].moduleId, 'drawScenePlanner');
    assert.match(entries[0].message, /错误位置: images\[0\]\.characters/);
    assert.match(entries[0].message, /违反规则: must be an array/);
    assert.match(entries[0].message, /submit_scene_plan/);
});

test('Planner failures remain available when DEBUG Log is enabled after the first poll', () => {
    resetDrawRunPlannerFailureLogsForTests();
    const entries = [];
    let enabled = false;
    const logger = {
        isEnabled: () => enabled,
        warn(_moduleId, message) { entries.push(message); },
    };
    const run = {
        id: 'run-debug-2',
        progress: {
            validationFailures: [{ attempt: 2, errorCode: 'TOOL_CALL_MISSING', modelOutput: '{"text":"plain answer"}' }],
        },
    };

    assert.equal(logDrawRunPlannerFailures(run, logger), 0);
    enabled = true;
    assert.equal(logDrawRunPlannerFailures(run, logger), 1);
    assert.match(entries[0], /错误码: TOOL_CALL_MISSING/);
});
