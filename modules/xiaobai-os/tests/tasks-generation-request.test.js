import assert from 'node:assert/strict';
import test from 'node:test';

import { createTaskGenerationRequests } from '../apps/tasks/generation/request.js';
import { normalizeTaskGenerationContext } from '../apps/tasks/generation/context.js';
import { createTaskGenerationRuntime } from '../apps/tasks/generation/runtime.js';

function validConfig() {
    return {
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
    beforeProviderReturns = () => {},
    records = [],
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
    const view = { domain: null, records, playerBalance: 100, writeState: 'ready' };
    async function replace(_input, guard) {
        if (!await guard()) {throw new Error('tasks_commit_guard_failed');}
        if (changeBeforeFinalGuard) {state.capture = snapshot('已经变化的身份');}
        if (!await guard()) {throw new Error('tasks_commit_guard_failed');}
        state.writes += 1;
        return { changed: true, view };
    }
    const tasks = {
        readCurrent: () => structuredClone(view),
        getWriteState: () => 'ready',
        createActionId: () => 'task-action-unused',
        replaceBoard: replace,
        replaceCandidates: replace,
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
                    beforeProviderReturns(state);
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

test('generation exposes actionable API errors without raw provider details or automatic retries', async () => {
    const secret = 'sensitive-key-and-response-body';
    for (const scenario of [
        { loadConfig: () => ({}), expected: /API.*配置模型/ },
        { loadConfig: () => { throw new Error(secret); }, expected: /读取模型配置/ },
        ...[[401, /身份验证.*密钥/], [403, /使用权限/], [400, /不接受本次请求/], [404, /模型名称/],
            [413, /上下文长度/], [429, /限流或额度不足/], [503, /服务暂时不可用/], [504, /超时/], [undefined, /API 配置与连接/]]
            .map(([status, expected]) => ({ status, expected })),
    ]) {
        let calls = 0;
        const { requests } = createHarness({
            loadConfig: scenario.loadConfig,
            openSession: async () => ({ run: async () => { calls++; throw Object.assign(new Error(secret), { status: scenario.status }); } }),
        });
        let done;
        const finished = new Promise(resolve => { done = resolve; });
        const runtime = createTaskGenerationRuntime({ requests, getChatIdentity: () => 'chat', report() {},
            onChange() { if (runtime.getState('chat').state === 'idle') { done(); } } });
        runtime.startBoard('chat');
        await finished;
        const result = runtime.getState('chat');
        assert.match(result.message, scenario.expected);
        assert.doesNotMatch(result.message, /sensitive-key|response-body/);
        runtime.reconcileSave('chat', true);
        assert.deepEqual(runtime.getState('chat'), result, 'unrelated storage recovery must not clear an API failure');
        assert.equal(calls, scenario.loadConfig ? 0 : 1);
    }
});

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

test('a legacy disabled flag cannot block a configured Agent request', async () => {
    const { requests, state } = createHarness({
        loadConfig: () => ({ ...validConfig(), enabled: false }),
    });
    const result = await requests.refreshBoard();

    assert.equal(result.changed, true);
    assert.equal(state.openSessionCount, 1);
    assert.equal(state.requests.length, 1);
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

test('world reference updates do not cancel board or candidate generation, but story changes still do', async t => {
    const publication = { overview: '港城近况', news: [{ id: 'canal', title: '运河通航', summary: '运河恢复通航。', body: '第一艘船经过石桥。' }] };
    const candidate = { name: '船工', description: '熟悉港口，想赚运费。', pitch: '我来送。', capability: '识水路', risk: '不擅陆路' };
    const record = { taskId: 'delivery', taskRevision: 1, eventId: 'posted', source: 'published', status: 'recruiting',
        issuer: { displayName: '玩家' }, title: '送箱子', objective: '送到仓库', location: '港口', risk: '破损', reward: 100, candidates: [] };
    for (const kind of ['board', 'candidates']) {
        for (const changeStory of [false, true]) {
            await t.test(`${kind}, story changed: ${changeStory}`, async () => {
                const { requests, state } = createHarness({
                    records: [record], providerText: kind === 'board' ? response() : JSON.stringify({ candidates: [candidate] }),
                    beforeProviderReturns(state) {
                        state.capture.worldContent.news[0].body += ' 船上挂着蓝旗。';
                        if (changeStory) { state.capture.recentMessages.push({ role: 'assistant', speakerName: '旁白', text: '玩家离开港口。' }); }
                    },
                });
                state.capture = normalizeTaskGenerationContext({ ...snapshot(), worldContent: publication });
                const result = await (kind === 'board' ? requests.refreshBoard() : requests.refreshCandidates({
                    taskId: record.taskId, expectedTaskRevision: record.taskRevision, expectedEventId: record.eventId,
                }));
                assert.equal(result.status === 'cancelled', changeStory);
                assert.equal(result.changed, !changeStory);
                assert.equal(state.writes, changeStory ? 0 : 1);
                assert.equal(state.requests.length, 1);
                assert.deepEqual(state.reports, []);
            });
        }
    }
});
