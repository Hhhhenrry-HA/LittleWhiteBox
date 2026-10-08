import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { createCampaign, recordFact } from '../apps/game/expedition/campaign/rules.ts';
import { buildConversationPrompt, conversationContext } from '../apps/game/expedition/narrative/prompt.ts';
import { generateConversation } from '../apps/game/expedition/narrative/conversation.ts';
import { loadNarrativeCanon } from '../apps/game/expedition/narrative/canon.ts';
import { narrativeOptions, loadCanon } from './fixtures/expedition-narrative.js';
import { OpenAICompatibleAdapter } from '../../agent-core/adapters/openai-compatible.js';
import { OpenAIResponsesAdapter } from '../../agent-core/adapters/openai-responses.js';
const campaign = () => createCampaign('chapter', 7, 'blade', 'traveler');
const signal = () => new AbortController().signal;
const turn = (id, player = 'question', reply = 'answer', action = null) => ({ id, kind: 'dialogue', player, reply, action, facts: [], scene: 'camp' });
const agentFor = run => ({ loadConfig: async () => ({}), openSession: async () => ({ providerConfig: { model: 'fixture' }, run }) });

test('personal witnesses stay personal; returning to camp does not disclose unseen progress', () => {
    const c = campaign();
    recordFact(c, 'receiving_arranged', ['laobai']);
    c.location.scene = 'cells';
    recordFact(c, 'captives_released');
    c.location.scene = 'camp';
    assert.deepEqual(conversationContext(c, 'laobai').events.map(e => e.id), ['receiving_arranged']);
    assert.deepEqual(conversationContext(c, 'sanniang').events, []);
    for (const id of ['anian', 'kouzi']) assert.deepEqual(conversationContext(c, id).events.map(e => e.id), ['captives_released']);
});

test('canon loading uses public documents and exactly one private card and opening', async () => {
    const requested = [];
    const canon = await loadNarrativeCanon('kouzi', signal(), async name => {
        requested.push(name);
        if (name.endsWith('-stages')) return readFile(new URL(`../docs/expedition-cards/${name}.md`, import.meta.url), 'utf8');
        return name === 'openings' ? '<!-- opening:sanniang.initial -->private-a<!-- /opening --><!-- opening:kouzi.initial -->private-b<!-- /opening --><!-- opening:kouzi.returned -->after-b<!-- /opening -->' : name;
    });
    assert.deepEqual(requested, ['system-prompt', 'world', 'kouzi', 'openings', 'kouzi-stages']);
    assert.equal(canon.character, 'kouzi'); assert.deepEqual(canon.opening, { initial: 'private-b', returned: 'after-b' });
});

test('history replays the actual action and only the current participant with chronological results', async () => {
    const c = campaign(); recordFact(c, 'briefed', ['sanniang']);
    c.conversations.sanniang = [turn('one', 'question', 'answer', 'briefing')];
    const prompt = buildConversationPrompt(c, 'sanniang', 'remember?', await loadCanon('sanniang', signal()));
    assert.equal(prompt.messages[1].content, 'question');
    assert.equal(JSON.parse(prompt.messages[2].content).action, 'briefing');
    assert.equal(buildConversationPrompt(c, 'laobai', 'hello', await loadCanon('laobai', signal())).messages.length, 2);
    assert.ok(!conversationContext(c, 'sanniang').actions.includes('briefing'));
});

test('one complete JSON fence and omitted action preserve a paid response, without guessing actions from prose', async () => {
    for (const text of ['{"reply":"ok","action":null}', '```json\n{"reply":"ok","action":"briefing"}\n```', '{"reply":"ok"}']) {
        let calls = 0, received;
        const result = await generateConversation(agentFor(async () => { calls++; return { text }; }), campaign(), 'sanniang', 'hello', signal(),
            { ...narrativeOptions, received: value => { received = value; } });
        assert.equal(result.reply, 'ok'); assert.equal(calls, 1); assert.equal(received.text, text);
    }
});

test('invalid or truncated responses remain available at the receipt boundary and never manufacture game changes', async () => {
    for (const response of [{ text: '{' }, { text: '{"reply":"","action":null}' },
        { text: '{"reply":"x","action":"briefing","affection":"up"}', truncated: true },
        { text: 'prose {"reply":"x"} prose' }]) {
        let received;
        const c = campaign();
        const result = await generateConversation(agentFor(async () => response), c, 'sanniang', 'hello', signal(),
            { ...narrativeOptions, received: value => { received = value; } });
        assert.equal(result.kind, 'receipt'); assert.equal(result.reply, response.text);
        assert.equal(result.action, null); assert.equal(result.affection, null);
        assert.equal(result.issue, response.truncated ? 'reply_incomplete' : 'reply_invalid');
        assert.deepEqual(received, response); assert.deepEqual(c.facts, []);
    }
});

test('optional action errors keep valid dialogue without guessing or executing unavailable actions', async () => {
    for (const action of ['', 'none', 'invented', 'finish', [], {}, 1, undefined, null, 'follow ']) {
        let calls = 0;
        const result = await generateConversation(agentFor(async () => { calls++; return { text: JSON.stringify({ reply: 'body', action }) }; }),
            campaign(), 'sanniang', 'hello', signal(), narrativeOptions);
        assert.equal(result.kind, 'dialogue'); assert.equal(result.reply, 'body'); assert.equal(calls, 1);
        assert.equal(result.action, action === 'follow ' ? 'follow' : null);
        assert.equal(result.issue, action == null || action === 'follow ' ? undefined : 'action_rejected');
    }
});

test('real adapters preserve incomplete response text as a receipt, without a second request or invented action', async () => {
    for (const protocol of ['chat', 'responses']) {
        let calls = 0;
        const text = '{"reply":"received","action":"briefing","affection":"up"}';
        const adapter = protocol === 'chat'
            ? new OpenAICompatibleAdapter({ apiKey: 'fixture', model: 'fixture' })
            : new OpenAIResponsesAdapter({ apiKey: 'fixture', model: 'fixture' });
        if (protocol === 'chat') adapter.client.chat.completions.create = async () => {
            calls++; return { choices: [{ message: { role: 'assistant', content: text }, finish_reason: 'length' }] };
        };
        else adapter.client.responses.create = async () => {
            calls++; return { status: 'incomplete', incomplete_details: { reason: 'max_output_tokens' },
                output: [{ type: 'message', content: [{ type: 'output_text', text }] }] };
        };
        const c = campaign(), result = await generateConversation(agentFor(request => adapter.chat(request)), c, 'sanniang', 'hello', signal(), narrativeOptions);
        assert.deepEqual(result, { kind: 'receipt', reply: text, action: null, affection: null, issue: 'reply_incomplete' });
        assert.equal(calls, 1); assert.deepEqual(c.facts, []);
        c.conversations.sanniang.push({ ...turn('receipt', 'hello', text), kind: result.kind, issue: result.issue });
        const prompt = buildConversationPrompt(c, 'sanniang', 'next', await loadCanon('sanniang', signal()));
        assert.equal(prompt.messages.length, 2); assert.ok(JSON.parse(prompt.messages[0].content).opening);
    }
});

test('long history compresses before dialogue, retains five full exchanges and commits memory only after complete reduction', async () => {
    const c = campaign();
    c.conversations.sanniang = Array.from({ length: 130 }, (_, i) => turn('t' + i, 'a'.repeat(2000), 'b'.repeat(8000)));
    let summaries = 0, dialogue = 0, saved = null;
    const agent = agentFor(async request => {
        if (request.maxTokens === 6000) { summaries++; return { text: 'Retained attributable promise and preference.', finishReason: 'STOP' }; }
        dialogue++;
        assert.ok(saved); assert.equal(request.messages.at(-1).content, 'pending');
        assert.equal(request.messages.filter(m => m.role === 'assistant').length, 5);
        return { text: '{"reply":"ok"}' };
    });
    await generateConversation(agent, c, 'sanniang', 'pending', signal(), { ...narrativeOptions, saveMemory: async memory => { saved = memory; } });
    assert.ok(summaries >= 1); assert.equal(dialogue, 1); assert.equal(saved.throughId, 't124');
    assert.equal(c.conversations.sanniang.length, 130);
});

test('failed summary never advances the memory boundary or buys a dialogue response', async () => {
    const c = campaign();
    c.conversations.sanniang = Array.from({ length: 130 }, (_, i) => turn('t' + i, 'a'.repeat(2000), 'b'.repeat(8000)));
    let saves = 0, calls = 0;
    const agent = agentFor(async () => { calls++; return { text: 'partial', finishReason: 'length', truncated: true }; });
    await assert.rejects(generateConversation(agent, c, 'sanniang', 'pending', signal(),
        { ...narrativeOptions, saveMemory: async () => { saves++; } }), { code: 'expedition_memory_incomplete' });
    assert.equal(saves, 0); assert.equal(calls, 1); assert.equal(c.memories.sanniang, null);
});

test('provider failures retain their cause and never automatically retry', async () => {
    for (const status of [401, 403, 500, undefined]) {
        const cause = Object.assign(new Error('provider failure'), { status }); let calls = 0;
        const agent = agentFor(async () => { calls++; throw cause; });
        await assert.rejects(generateConversation(agent, campaign(), 'sanniang', 'hello', signal(), narrativeOptions), error => {
            assert.equal(error.code, status === 401 || status === 403 ? 'expedition_agent_auth' : 'expedition_agent_failed');
            assert.equal(error.cause, cause); return true;
        });
        assert.equal(calls, 1);
    }
});

test('summary provider or persistence failures leave history untouched and do not buy a dialogue request', async () => {
    for (const failure of ['auth', 'save']) {
        const c = campaign();
        c.conversations.sanniang = Array.from({ length: 130 }, (_, i) => turn('t' + i, 'a'.repeat(2000), 'b'.repeat(8000)));
        const before = structuredClone(c); let dialogue = 0, saves = 0;
        const agent = agentFor(async request => {
            if (request.maxTokens !== 6000) { dialogue++; }
            if (failure === 'auth') { throw Object.assign(new Error('unauthorized'), { status: 401 }); }
            return { text: 'Attributable promise.', finishReason: 'stop' };
        });
        await assert.rejects(generateConversation(agent, c, 'sanniang', 'pending', signal(), {
            ...narrativeOptions, saveMemory: async () => { saves++; throw Object.assign(new Error('save'), { code: 'expedition_save_failed' }); },
        }), { code: failure === 'auth' ? 'expedition_agent_auth' : 'expedition_save_failed' });
        assert.equal(dialogue, 0); assert.equal(saves, failure === 'auth' ? 0 : 1); assert.deepEqual(c, before);
    }
});

test('explicit provider capacity rejection compresses below the policy threshold, splits rejected summary batches and retries dialogue once', async () => {
    const c = campaign();
    c.conversations.sanniang = Array.from({ length: 13 }, (_, i) => turn('t' + i, 'a'.repeat(500), 'b'.repeat(1500)));
    let dialogue = 0, summaries = 0, saved;
    const agent = agentFor(async request => {
        if (request.maxTokens === 6000) {
            summaries++;
            const source = JSON.parse(request.messages[0].content);
            if (source.conversation.length > 8) { throw { code: 'context_length_exceeded' }; }
            return { text: 'Retained events with attribution.', finishReason: 'stop' };
        }
        dialogue++;
        if (dialogue === 1) { throw { error: { code: 'context_length_exceeded' } }; }
        assert.equal(request.messages.filter(m => m.role === 'assistant').length, 5);
        assert.equal(request.messages.at(-1).content, 'pending');
        return { text: '{"reply":"ok"}' };
    });
    await generateConversation(agent, c, 'sanniang', 'pending', signal(), { ...narrativeOptions, saveMemory: async value => { saved = value; } });
    assert.equal(dialogue, 2); assert.equal(summaries, 3); assert.equal(saved.throughId, 't7');
    assert.equal(c.memories.sanniang, null); assert.equal(c.conversations.sanniang.length, 13);
});

test('capacity rejection with no archivable prefix stops without replaying the same paid request', async () => {
    let calls = 0;
    await assert.rejects(generateConversation(agentFor(async () => { calls++; throw { code: 'context_length_exceeded' }; }),
        campaign(), 'sanniang', 'pending', signal(), narrativeOptions), { code: 'expedition_context_capacity' });
    assert.equal(calls, 1);
});

test('incomplete forced summary is not a character reply and never advances memory or retries dialogue', async () => {
    const c = campaign();
    c.conversations.sanniang = Array.from({ length: 13 }, (_, i) => turn('t' + i, 'a'.repeat(500), 'b'.repeat(1500)));
    const before = structuredClone(c);
    let calls = 0, saves = 0, receipts = 0;
    const adapter = new OpenAICompatibleAdapter({ apiKey: 'fixture', model: 'fixture' });
    adapter.client.chat.completions.create = async () => {
        if (++calls === 1) { throw { code: 'context_length_exceeded' }; }
        return { choices: [{ message: { role: 'assistant', content: 'unfinished memory' }, finish_reason: 'length' }] };
    };
    await assert.rejects(generateConversation(agentFor(request => adapter.chat(request)), c, 'sanniang', 'pending', signal(), {
        ...narrativeOptions, saveMemory: async () => { saves++; }, received: () => { receipts++; },
    }), { code: 'expedition_agent_failed' });
    assert.equal(calls, 2); assert.equal(saves, 0); assert.equal(receipts, 0); assert.deepEqual(c, before);
});
