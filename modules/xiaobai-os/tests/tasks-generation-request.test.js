import assert from 'node:assert/strict';
import test from 'node:test';

import { createTaskGenerationRequests } from '../apps/tasks/generation/request.js';

function validConfig() {
    return {
        enabled: true,
        currentPresetName: 'tasks',
        presets: {
            tasks: {
                provider: 'sillytavern-openai-compatible',
                modelConfigs: {
                    'sillytavern-openai-compatible': { model: 'test-model', apiKey: '' },
                },
            },
        },
    };
}

function snapshot(persona = '谨慎的旅人') {
    return {
        player: { displayName: '玩家', persona },
        characters: [],
        recentMessages: [],
        worldInfo: { before: '', after: '', depth: [] },
    };
}

function response() {
    return JSON.stringify({
        tasks: [{
            grade: 'B',
            tags: ['禁忌'],
            posture: '易介入',
            title: '封蜡箱',
            hook: '后门刚送来一只写着陌生名字的箱子。',
            objective: '替收件人签收封蜡箱',
            requirements: '不要拆封',
            location: '教学楼后门',
            timing: '现在就行',
            risk: '签收记录会留下玩家姓名',
            reward: 180,
        }],
    });
}

function createHarness({
    changeBeforeFinalGuard = false,
    changeWhenProviderReturns = false,
    providerText = response(),
    loadConfig,
    openSession,
} = {}) {
    const state = {
        capture: snapshot(),
        captureCount: 0,
        writes: 0,
        reports: [],
        requests: [],
        mainGenerationActive: false,
        openSessionCount: 0,
    };
    const view = { domain: null, records: [], playerBalance: 100, writeState: 'ready' };
    const tasks = {
        readCurrent: () => structuredClone(view),
        getWriteState: () => 'ready',
        createActionId: () => 'task-action-unused',
        async replaceBoard(_input, guard) {
            if (!await guard()) {throw new Error('tasks_commit_guard_failed');}
            if (changeBeforeFinalGuard) {state.capture = snapshot('已经变化的身份');}
            if (!await guard()) {throw new Error('tasks_commit_guard_failed');}
            state.writes += 1;
            return { changed: true, view };
        },
    };
    const context = {
        currentChatIdentity: () => 'character:1:chat-a',
        async capture() {
            state.captureCount += 1;
            return {
                chatIdentity: 'character:1:chat-a',
                contextSnapshot: structuredClone(state.capture),
                assistantCount: 4,
            };
        },
    };
    const gateway = {
        async loadConfig() {return loadConfig ? await loadConfig() : validConfig();},
        async openSession() {
            state.openSessionCount += 1;
            if (openSession) {return await openSession();}
            return {
                async run(request) {
                    state.requests.push({ ...request, signal: undefined });
                    if (changeWhenProviderReturns) {state.capture = snapshot('请求期间变化的身份');}
                    return { text: providerText };
                },
            };
        },
    };
    const requests = createTaskGenerationRequests({
        gateway,
        tasks,
        context,
        isMainGenerationActive: () => state.mainGenerationActive,
        now: () => 123,
        report: error => state.reports.push(error),
    });
    return { requests, state };
}

test('board generation uses one tool-free provider round and commits only after every boundary check', async () => {
    const { requests, state } = createHarness();
    const result = await requests.refreshBoard();

    assert.equal(result.status, 'partial');
    assert.equal(result.changed, true);
    assert.equal(state.writes, 1);
    assert.equal(state.requests.length, 1);
    assert.deepEqual(state.requests[0].tools, []);
    assert.deepEqual(state.requests[0].messages.map(message => message.role), ['system', 'system', 'user', 'user']);
    assert.equal(state.captureCount, 4);
    assert.deepEqual(state.reports, []);
});

test('a context change at the final commit guard cancels the board result without a write or error report', async () => {
    const { requests, state } = createHarness({ changeBeforeFinalGuard: true });
    const result = await requests.refreshBoard();

    assert.equal(result.status, 'cancelled');
    assert.equal(result.changed, false);
    assert.equal(state.writes, 0);
    assert.equal(state.captureCount, 4);
    assert.deepEqual(state.reports, []);
});

test('a stale tool-free response is cancelled even when it would not write anything', async () => {
    const { requests, state } = createHarness({
        changeWhenProviderReturns: true,
        providerText: '{"tasks":[]}',
    });
    const result = await requests.refreshBoard();

    assert.equal(result.status, 'cancelled');
    assert.equal(result.changed, false);
    assert.equal(state.writes, 0);
    assert.equal(state.captureCount, 2);
    assert.deepEqual(state.reports, []);
});

test('main generation starting while Agent config loads cancels before opening a session or calling the provider', async () => {
    let resolveConfig;
    const config = new Promise(resolve => {resolveConfig = resolve;});
    const { requests, state } = createHarness({ loadConfig: () => config });
    const pending = requests.refreshBoard();
    while (state.captureCount === 0) {await Promise.resolve();}

    state.mainGenerationActive = true;
    resolveConfig(validConfig());
    const result = await pending;

    assert.equal(result.status, 'cancelled');
    assert.equal(state.openSessionCount, 0);
    assert.equal(state.requests.length, 0);
    assert.equal(state.writes, 0);
    assert.deepEqual(state.reports, []);
});
