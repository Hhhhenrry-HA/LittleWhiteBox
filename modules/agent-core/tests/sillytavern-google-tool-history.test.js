import assert from 'node:assert/strict';
import test from 'node:test';
import { SillyTavernGoogleAdapter } from '../adapters/sillytavern-google.js';
import { buildProviderAssistantToolCallMessage, buildProviderMessagesFromHistory, buildProviderToolResultMessage, resolveResultToolCalls } from '../runtime/protocol.js';

const event = (...parts) => ({ candidates: [{ content: { role: 'model', parts } }] });
const stop = { candidates: [{ finishReason: 'STOP' }] };

// Replaying a saved assistant-generated exchange must not make Gemini reject the next user message.
test('SillyTavern Google marks synthetic calls when sending a saved conversation to Gemini 4', () => {
    const saved = [
        { role: 'user', content: 'First question' },
        { role: 'assistant', content: 'Reading requirements', toolCalls: [
            { id: 'delivery-read', name: 'read_work_requirements', arguments: '{}' },
        ] },
        { role: 'tool', toolName: 'read_work_requirements', toolCallId: 'delivery-read', content: '{"ok":true}' },
        { role: 'assistant', error: true, content: 'No reply' },
        { role: 'user', content: 'Continue' },
    ];
    const task = { messages: buildProviderMessagesFromHistory(saved) };
    const original = structuredClone(task);
    const adapter = new SillyTavernGoogleAdapter({ model: 'gemini-4-carbon' });
    const { messages } = adapter.buildPayload(task);
    assert.deepEqual(messages[1].tool_calls[0], {
        id: 'delivery-read',
        type: 'function',
        function: { name: 'read_work_requirements', arguments: '{}' },
        signature: 'skip_thought_signature_validator',
    });
    assert.equal(messages[2].tool_call_id, 'delivery-read');
    assert.deepEqual(task, original);
});

test('switching to hosted Gemini replays the first signature and keeps parallel tool receipts paired', () => {
    const adapter = new SillyTavernGoogleAdapter({ model: 'gemini-4-carbon' });
    const fallback = 'skip_thought_signature_validator';
    for (const [id, provider, expected] of [
        ['first', 'claude', fallback], ['first', 'openai', fallback], ['first', 'google', fallback],
        ['first', 'signed-openai', 'original+/='], ['first__thought__relay+/=', 'openai', 'relay+/='],
    ]) {
        const ids = [id, 'second'];
        const toolCalls = ids.map(id => ({ id, name: 'read', arguments: '{}' }));
        const openaiCalls = toolCalls.map(call => ({
            id: call.id, type: 'function', function: { name: call.name, arguments: call.arguments },
        }));
        if (provider === 'signed-openai') openaiCalls[0].extra_content = { google: { thought_signature: expected } };
        const providerPayload = provider === 'google'
            ? { googleContent: { role: 'model', parts: toolCalls.map(call => ({ functionCall: { id: call.id, name: call.name, args: {} } })) } }
            : provider === 'claude' ? { anthropicContent: toolCalls.map(call => ({ type: 'tool_use', id: call.id, name: call.name, input: {} })) }
                : { openaiCompatibleMessage: { role: 'assistant', tool_calls: openaiCalls } };
        const task = { messages: buildProviderMessagesFromHistory([
            { role: 'assistant', toolCalls, providerPayload },
            ...ids.map(toolCallId => ({ role: 'tool', toolCallId, toolName: 'read', content: '{}' })),
        ]) };
        const original = structuredClone(task);
        const { messages: [reply, ...receipts] } = adapter.buildPayload(task);
        const calls = reply.tool_calls ?? reply.content.find(part => part.type === 'tool_calls').tool_calls;
        assert.deepEqual(calls.map(call => call.signature), [expected, undefined], provider);
        assert.deepEqual(calls.map(call => call.id), receipts.map(item => item.tool_call_id));
        assert.deepEqual(task, original);
    }
});

test('SillyTavern Google pairs idless tool calls with their receipts across streamed turns', async () => {
    const thought = { thought: true, text: 'fixture', thoughtSignature: 'thought-signature' };
    const anonymous = { functionCall: { name: 'lookup', args: {} }, thoughtSignature: 'call-signature' };
    const identified = { functionCall: { id: 'provider-id', name: 'record', args: { value: 1 } } };
    const turns = [[event(thought), event(anonymous, identified), event(anonymous), stop], [event(anonymous), stop], [stop]];
    const requestReceipts = [];
    const replayedCalls = [];
    const hostClient = {
        async buildHostChatCompletionGenerateRequest(body) { return { body }; },
        async createHostChatCompletion() { assert.fail('Expected streamed response'); },
        async streamHostChatCompletion({ messages }, accept) {
            // SillyTavern 1.18 resolves functionResponse.name by ID, not position or toolName.
            const nameById = new Map();
            const receipts = [];
            const calls = [];
            for (const message of messages) {
                for (const call of message.content?.find?.(part => part.type === 'tool_calls')?.tool_calls || []) {
                    nameById.set(call.id, call.function.name);
                    calls.push(call);
                }
                if (message.role === 'tool') {
                    receipts.push({ id: message.tool_call_id, name: nameById.get(message.tool_call_id) ?? 'unknown' });
                }
            }
            requestReceipts.push(receipts);
            replayedCalls.push(calls);
            for (const chunk of turns.shift()) accept(chunk);
        },
    };
    const adapter = new SillyTavernGoogleAdapter({ model: 'gemini-3-pro-preview' }, hostClient);
    const history = [];
    const expectedReceipts = [];
    const expectedSignatures = [];
    for (const expectedParts of [[anonymous, identified, anonymous], [anonymous]]) {
        const drafts = [];
        const result = await adapter.chat({ messages: history, onStreamProgress: draft => drafts.push(draft) });
        const calls = resolveResultToolCalls(result);
        const native = result.providerPayload.googleContent.parts.filter(part => part.functionCall);
        assert.deepEqual(calls.map(call => call.name), expectedParts.map(part => part.functionCall.name));
        assert.ok(calls.every(call => call.id));
        assert.deepEqual(native, expectedParts.map((part, index) => ({
            ...part, functionCall: { ...part.functionCall, id: part.functionCall.id || calls[index].id },
        })));
        assert.deepEqual(result.providerPayload.googleContents[0], result.providerPayload.googleContent);
        assert.deepEqual(drafts.at(-1).toolCalls, calls);
        if (!history.length) {
            assert.deepEqual(result.providerPayload.googleContent.parts[0], thought);
            assert.equal(calls[1].id, identified.functionCall.id);
            assert.deepEqual(drafts.find(draft => draft.toolCalls)?.toolCalls, calls.slice(0, 2));
        }
        history.push(buildProviderAssistantToolCallMessage(result, calls));
        history.push(...calls.map(call => buildProviderToolResultMessage({ toolCallId: call.id, content: '{}' })));
        expectedReceipts.push(...calls.map(({ id, name }) => ({ id, name })));
        expectedSignatures.push(...expectedParts.map(part => part.thoughtSignature));
    }
    assert.equal(new Set(expectedReceipts.map(receipt => receipt.id)).size, expectedReceipts.length);
    await adapter.chat({ messages: JSON.parse(JSON.stringify(history)) });
    assert.deepEqual(requestReceipts[1], expectedReceipts.slice(0, 3));
    assert.deepEqual(requestReceipts[2], expectedReceipts);
    assert.deepEqual(replayedCalls[2].map(call => call.signature), expectedSignatures);
    assert.equal(Object.hasOwn(anonymous.functionCall, 'id'), false);
});
