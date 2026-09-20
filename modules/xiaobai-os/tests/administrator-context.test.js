import assert from 'node:assert/strict';
import test from 'node:test';
import { createAdministratorCheckpoint, runAdministratorLoop } from '../apps/administrator/agent/provider-loop.js';
import { ADMINISTRATOR_POLICY } from '../apps/administrator/domain/policy.js';
import { estimateTokenCount } from '../../agent-core/runtime/context-tokens.js';

const turn = (id, text) => ({ id, createdAt: 1, user: { text }, assistant: text, operations: [], status: 'finished', error: '' });
function options(checkpoint, gateway, execute = async () => ({ status: 'read', data: 'evidence' })) {
    return { checkpoint, gateway, config: {}, system: 'administrator fixture', prefix: [], request: { role: 'user', content: 'current request' }, requestForCounting: { role: 'user', content: 'current request' }, imageCount: 0,
        tools: [{ type: 'function', function: { name: 'Read', parameters: {} } }], signal: new AbortController().signal, execute, onText() {}, onPhase() {}, onContext() {} };
}
test('explicit context overflow compacts full exchanges, reopens native session, and retries the model once without replaying business tools', async () => {
    const state = createAdministratorCheckpoint([turn('old', 'Earlier user request. '.repeat(200)), turn('recent', 'Recent facts. '.repeat(100))], '');
    let sessions = 0, requests = 0, executions = 0, summaries = 0; const replayed = [];
    const gateway = { async openSession() { sessions++; return { supportsSessionToolLoop: true, providerConfig: {}, async run(request) {
        if (!request.tools.length) { summaries++; return { text: 'Old request and confirmed facts.' }; }
        requests++; replayed.push(request);
        if (requests === 1) { return { toolCalls: [{ id: 'provider-call', name: 'Read', arguments: '{}' }] }; }
        if (requests === 2) { throw Object.assign(new Error('context exhausted'), { code: 'context_length_exceeded' }); }
        return { text: 'Done.' };
    } }; } };
    assert.equal(await runAdministratorLoop(options(state, gateway, async () => { executions++; return { status: 'saved' }; })), 'Done.');
    assert.equal(executions, 1); assert.equal(summaries, 1); assert.equal(requests, 3); assert.equal(sessions, 3);
    assert.ok(replayed[1].toolResponses); assert.equal(replayed[1].messages.length, 0);
    assert.ok(replayed[2].messages.length); assert.equal(replayed[2].toolResponses, undefined);
    const call = replayed[2].messages.find(m => m.tool_calls), result = replayed[2].messages.find(m => m.role === 'tool');
    assert.equal(call.tool_calls[0].id, result.tool_call_id); assert.equal(state.compactedThrough, 'old');
});
test('failed or non-shrinking compression does not drop retained history and overflow gets at most one retry', async () => {
    for (const failure of ['throws', 'grows', 'overflows-again']) {
        const original = [turn('old', 'old content '.repeat(100))], state = createAdministratorCheckpoint(original, ''); let requests = 0;
        const gateway = { async openSession() { return { supportsSessionToolLoop: false, providerConfig: {}, async run(request) {
            if (!request.tools.length) { if (failure === 'throws') { throw new Error('summary offline'); } return { text: failure === 'grows' ? 'longer '.repeat(10000) : 'brief' }; }
            requests++; throw Object.assign(new Error('too long'), { code: 'context_length_exceeded' });
        } }; } };
        await assert.rejects(runAdministratorLoop(options(state, gateway)));
        assert.equal(requests, failure === 'overflows-again' ? 2 : 1);
        if (failure !== 'overflows-again') { assert.deepEqual(state.history, original); assert.equal(state.summary, ''); }
    }
});
test('reused provider call IDs in separate rounds do not alias execution checkpoints', async () => {
    const state = createAdministratorCheckpoint([], ''); let requests = 0; const keys = [];
    const gateway = { async openSession() { return { supportsSessionToolLoop: false, providerConfig: {}, async run() { return requests++ < 2
        ? { toolCalls: [{ id: 'same-id', name: 'Read', arguments: '{}' }] } : { text: 'finished' }; } }; } };
    await runAdministratorLoop(options(state, gateway, async (_, __, id) => { keys.push(id); return {}; }));
    assert.equal(keys.length, 2); assert.notEqual(keys[0], keys[1]);
});

test('very long histories are summarized in complete bounded exchanges rather than one oversized request', async () => {
    const state = createAdministratorCheckpoint(Array.from({ length: 20 }, (_, i) => turn(String(i), '已核实的沟通事实。'.repeat(1000))), '');
    let summaries = 0;
    const gateway = { async openSession() { return { supportsSessionToolLoop: false, providerConfig: {}, async run(request) {
        if (!request.tools.length) {
            summaries++;
            assert.ok(estimateTokenCount(request.systemPrompt) + estimateTokenCount(request.messages[0].content) + request.maxTokens < ADMINISTRATOR_POLICY.inputBudget);
            const exchanges = JSON.parse(request.messages[0].content).exchanges;
            assert.equal(exchanges.length % 2, 0);
            return { text: '已核实此前沟通，未遗留写入。' };
        }
        return { text: '完成核对。' };
    } }; } };
    await runAdministratorLoop(options(state, gateway));
    assert.ok(summaries > 1);
});
