import assert from 'node:assert/strict';
import test from 'node:test';
import { parseHTML } from 'linkedom';
import { bindComposerActions, composerActionsMarkup } from '../app-src/ui/composer.js';
import { loadCardIntoConversation } from '../app-src/runtime/card-load.js';
import { loadedSkillIds } from '../shared/skill-tools.js';
import { buildProviderMessagesFromHistory } from '../../agent-core/runtime/protocol.js';
import { getMessageActions, getRerollUserIndex } from '../app-src/state/message-actions.js';
import { toolOutcome } from '../app-src/ui/tool-activity.js';
import { rootFor, storedCardWorkspacePath } from '../../card-workspace/paths.js';

// Contracts: cancellation performs no operation (paid requests / changed history);
// card loading needs no model and leaves paired evidence for the next request;
// failed or cancelled loads retain balanced receipts (broken provider protocol).
test('card preview starts before confirmation, compaction confirms, and permission stays usable during an action', () => {
    const { document, window } = parseHTML(`<html><body>${composerActionsMarkup()}</body></html>`);
    const state = {};
    let confirmed = false, confirmations = 0, loads = 0, summaries = 0, permissions = 0;
    bindComposerActions(document.body, { state,
        loadCard() { loads++; state.isBusy = true; }, compact() { summaries++; state.isBusy = true; },
        changePermission() { permissions++; }, confirm() { confirmations++; return confirmed; } });
    const click = id => document.getElementById(id).click();
    click('xb-assistant-compact');
    assert.deepEqual([loads, summaries, confirmations], [0, 0, 1]);
    click('xb-assistant-load-card'); click('xb-assistant-load-card');
    assert.deepEqual([loads, confirmations], [1, 1]);
    document.getElementById('xb-assistant-compose-permission').dispatchEvent(new window.Event('change'));
    assert.deepEqual([permissions, confirmations], [1, 1]);
    confirmed = true;
    state.isBusy = false;
    click('xb-assistant-compact'); click('xb-assistant-compact');
    assert.deepEqual([summaries, confirmations], [1, 2]);
});

for (const outcome of ['success', 'failure', 'timeout', 'cancel']) test(`local card load ${outcome} records only completed host evidence`, async () => {
    const run = { id: 'run', controller: new AbortController() };
    const state = { messages: [], archivedSkillIds: [] };
    const calls = [], saved = [];
    let serial = 0;
    const deps = { state, createRequestId: () => `call-${++serial}`, appendMessage: message => state.messages.push(message),
        persistSession() { saved.push(structuredClone(state.messages)); }, render() {}, setToolActivity() {},
        buildToolFailureResult(name, args, error) {
            assert.equal(name, 'CardFiles');
            assert.equal(args.action, 'open');
            return { ok: false, error: error.message, message: 'translated error' };
        },
        async callHostTool(name, args, options) {
            assert.equal(name, 'ReadSkill');
            calls.push({ name, args }); options.onDispatched();
            return { ok: true, builtin: true, id: args.id, content: 'Fixture skill instructions' };
        },
        async openCard(options) {
            calls.push({ name: 'CardFiles' }); options.onDispatched();
            if (outcome === 'failure') throw new Error('card unavailable');
            if (outcome === 'timeout') throw new Error('tool_timeout');
            if (outcome === 'cancel') { run.controller.abort(); throw new Error('tool_aborted'); }
            const root = rootFor('角色 1.png');
            return { root, name: '角色 1', files: [{ path: root + 'card.json' }] };
        } };
    if (outcome === 'success') {
        const result = await loadCardIntoConversation(run, deps);
        assert.equal(storedCardWorkspacePath(result.root), rootFor('角色 1.png'));
        await loadCardIntoConversation(run, deps);
        assert.deepEqual(calls.map(call => call.name), ['ReadSkill', 'CardFiles', 'CardFiles']);
    } else await assert.rejects(loadCardIntoConversation(run, deps));
    assert.deepEqual(loadedSkillIds(state.messages), ['builtin-card-files']);
    const next = buildProviderMessagesFromHistory(saved.at(-1));
    assert.equal(next[0].role, 'user');
    const requests = next.flatMap(message => message.tool_calls || []);
    const results = next.filter(message => message.role === 'tool');
    if (outcome === 'success') assert.equal(JSON.parse(results.at(-1).content).files[0].path, 'local/cards/角色 1.png/card.json');
    assert.deepEqual(requests.map(call => call.id), results.map(message => message.tool_call_id));
    assert.deepEqual(JSON.parse(requests[1].function.arguments), { action: 'open' });
    assert.equal(JSON.parse(results[0].content).content, 'Fixture skill instructions');
    if (outcome !== 'success') {
        const receipt = JSON.parse(results.at(-1).content);
        assert.equal(receipt.ok, false);
        assert.equal(toolOutcome(receipt, 'CardFiles').note, receipt.message);
    }
    const messages = saved.at(-1);
    const lastUser = messages.findLastIndex(message => message.role === 'user');
    for (const index of new Set([lastUser, messages.length - 1])) {
        assert.equal(getRerollUserIndex(messages, index), -1);
        assert.ok(!getMessageActions(messages, index).includes('reroll'));
    }
});
