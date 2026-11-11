import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { createAgentAdapter } from '../provider-config.js';
import { accumulateStreamedAssistantSnapshot, getStreamedSnapshotToolCalls, extractTaggedToolCalls } from '../adapters/openai-compatible.js';
import { normalizeToolCalls, resolveResultToolCalls } from '../runtime/protocol.js';

// Acceptance contracts (cost: wrong file operations, broken tool history, paid retries):
// - Indexed or ID-addressed fragments retain every call's identity and exact arguments.
// - An ambiguous fragment never merges two calls or releases a corrupted executable batch.
// - Concatenated argument objects remain invalid, rather than becoming plausible tool input.
// - Literal JSON in file content and existing single-call streams remain intact.
const root = 'local/cards/回西厢1.png/';
const calls = [
    { id: 'grep', name: 'Grep', arguments: JSON.stringify({ pattern: 'comment', path: root + 'world_book/回西厢', scope: 'local', useRegex: false }) },
    ...['description.md', 'personality.md'].map((file, index) => ({ id: `read-${index}`, name: 'Read',
        arguments: JSON.stringify({ filePath: root + file, scope: 'local' }) })),
];
const native = (call, argumentsText = call.arguments) => ({ id: call.id, type: 'function', function: { name: call.name, arguments: argumentsText } });
const event = tool_calls => ({ choices: [{ delta: { tool_calls } }] });

function fragments(indexed, separate) {
    const starts = calls.map((call, index) => ({ ...(indexed ? { index } : {}), ...native(call, call.arguments.slice(0, 20)) }));
    const tails = calls.map((call, index) => ({ ...(indexed ? { index } : { id: call.id }), function: { arguments: call.arguments.slice(20) } })).reverse();
    return [...(separate ? starts.map(call => event([call])) : [event(starts)]), ...tails.map(call => event([call])),
        { choices: [{ delta: {}, finish_reason: 'tool_calls' }] }];
}

test('tool identities survive omitted indexes, separate chunks and interleaved same-name calls', () => {
    for (const indexed of [false, true]) for (const separate of [false, true]) {
        const snapshot = {};
        for (const chunk of fragments(indexed, separate)) accumulateStreamedAssistantSnapshot(snapshot, chunk.choices[0]);
        assert.deepEqual(getStreamedSnapshotToolCalls(snapshot), calls);
        assert.deepEqual(snapshot.tool_calls, calls.map(call => native(call)));
    }
});

test('a single call can still continue without repeated identity fields', () => {
    const snapshot = {};
    accumulateStreamedAssistantSnapshot(snapshot, { delta: { tool_calls: [native(calls[1], calls[1].arguments.slice(0, 20))] } });
    accumulateStreamedAssistantSnapshot(snapshot, { delta: { tool_calls: [{ function: { arguments: calls[1].arguments.slice(20) } }] } });
    assert.deepEqual(getStreamedSnapshotToolCalls(snapshot), [calls[1]]);
});

test('ambiguous and conflicting identities cannot corrupt already received calls', () => {
    for (const fragment of [
        { function: { arguments: '"local"}' } },
        { index: 0, id: 'different-call', function: { name: 'Read', arguments: '{}' } },
    ]) {
        const snapshot = {};
        accumulateStreamedAssistantSnapshot(snapshot, { delta: { tool_calls: calls.map((call, index) => ({ index, ...native(call) })) } });
        const before = structuredClone(snapshot);
        assert.throws(() => accumulateStreamedAssistantSnapshot(snapshot, { delta: { tool_calls: [fragment] } }),
            { code: 'OPENAI_COMPATIBLE_TOOL_CALL_IDENTITY_INVALID' });
        assert.deepEqual(snapshot, before);
    }
});

test('concatenated arguments cannot be repaired into a bogus scope or write payload', () => {
    const write = JSON.stringify({ filePath: root + 'description.md', content: 'first' });
    for (const [name, raw] of [
        ['Read', calls.slice(1).map(call => call.arguments).join('')],
        ['Read', calls.map(call => call.arguments).join('')],
        ['Grep', calls[0].arguments + calls[0].arguments],
        ['Write', write + write],
        ['Read', calls[1].arguments + '\n{"filePath":'],
    ]) {
        const call = { id: 'bad-args', name, arguments: raw };
        assert.equal(normalizeToolCalls([call])[0].arguments, raw);
        const tagged = `<tool_call>${JSON.stringify(call)}</tool_call>`;
        assert.equal(extractTaggedToolCalls(tagged)[0].arguments, raw);
        assert.throws(() => JSON.parse(normalizeToolCalls([call])[0].arguments), SyntaxError);
        assert.throws(() => resolveResultToolCalls({ completion: 'complete', toolCalls: [calls[1], call] }),
            { code: 'AGENT_TOOL_ARGUMENTS_INVALID', toolCallId: 'bad-args' });
    }
    const content = 'literal }{ and {"scope":"local"}{"scope":"project"}\n第二行';
    const raw = JSON.stringify({ filePath: root + 'description.md', content });
    for (const input of [raw, raw.replace('\\n', '\n')]) {
        assert.deepEqual(JSON.parse(normalizeToolCalls([{ name: 'Write', arguments: input }])[0].arguments), JSON.parse(raw));
    }
});

for (const target of ['direct', 'hosted', 'browser-bundle', 'backend-bundle']) {
    test(`${target} keeps parallel tool arguments and replay identities through the full stream`, async t => {
        let factory = createAgentAdapter;
        let resolveCalls = resolveResultToolCalls;
        if (target === 'browser-bundle') {
            const manifest = JSON.parse(await readFile(new URL('../../../dist/manifest.json', import.meta.url), 'utf8'));
            const entry = new URL(`../../../dist/${manifest.entries['runtime/agent-core'].file}`, import.meta.url);
            // eslint-disable-next-line no-unsanitized/method -- Entry is owned by the local build manifest.
            const bundle = await import(entry.href);
            factory = bundle.createAgentAdapter;
            resolveCalls = bundle.resolveResultToolCalls;
        } else if (target === 'backend-bundle') {
            const bundle = createRequire(import.meta.url)('../../../server-plugin/littlewhitebox-server/tests/runtime-fixture.js').bundle.agentCore;
            factory = bundle.createAgentAdapter;
            resolveCalls = bundle.resolveResultToolCalls;
        }
        let wire = [];
        let requests = 0;
        const originalFetch = globalThis.fetch;
        t.after(() => { globalThis.fetch = originalFetch; });
        globalThis.fetch = async () => {
            requests++;
            return new Response(wire.map(chunk => `data: ${JSON.stringify(chunk)}\n\n`).join('') + 'data: [DONE]\n\n');
        };
        const hostClient = {
            buildHostChatCompletionGenerateRequest: async body => ({ body }),
            createHostChatCompletion: async () => { throw new Error('Unexpected non-streaming request'); },
            streamHostChatCompletion: async (_request, accept) => { requests++; for (const chunk of wire) accept(chunk); },
        };
        const adapter = factory({ provider: target === 'hosted' ? 'sillytavern-openai-compatible' : 'openai-compatible',
            apiKey: 'unused', baseUrl: 'https://example.invalid/v1', model: 'fixture', toolMode: 'native' }, { hostClient });
        const task = { messages: [{ role: 'user', content: 'Read card files.' }],
            tools: ['Read', 'Grep'].map(name => ({ type: 'function', function: { name, parameters: { type: 'object' } } })),
            onStreamProgress() {} };
        for (const indexed of [false, true]) for (const separate of [false, true]) {
            wire = fragments(indexed, separate);
            const before = requests;
            const result = await adapter.chat(task);
            assert.deepEqual(result.toolCalls, calls);
            assert.deepEqual(resolveCalls(result), calls);
            assert.deepEqual(result.providerPayload.openaiCompatibleMessage.tool_calls, calls.map(call => native(call)));
            assert.equal(requests, before + 1);
        }
        wire = [event(calls.map((call, index) => ({ index, ...native(call) }))), event([{ function: { arguments: '{}' } }])];
        const before = requests;
        await assert.rejects(adapter.chat(task), { code: 'OPENAI_COMPATIBLE_TOOL_CALL_IDENTITY_INVALID' });
        assert.equal(requests, before + 1);
        assert.throws(() => resolveCalls({ completion: 'complete', toolCalls: [calls[0], {
            id: 'merged-read', name: 'Read', arguments: calls[1].arguments + calls[2].arguments,
        }] }), { code: 'AGENT_TOOL_ARGUMENTS_INVALID', toolCallId: 'merged-read' });
    });
}
