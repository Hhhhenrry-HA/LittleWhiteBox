import { buildProviderAssistantToolCallMessage, buildProviderToolResultMessage, resolveResultToolCalls } from '../../../../agent-core/runtime/protocol.js';
import type { XiaobaiOsAgentSession } from '../../../capabilities/agent/gateway.js';
import { classifyProviderFailure } from '../../../capabilities/agent/provider-failure.js';
import { safePromptJson } from '../../../capabilities/maintenance/prompt-safety.js';

export const MAX_LEARNING_CONTEXT = 32_000;
export const MAX_LEARNING_ROUNDS = 8;
type RecordValue = Record<string, unknown>;
export type LearningLoopResult = { status: 'finished'; text: string } | { status: 'failed'; reason: string } | { status: 'cancelled' };

/** Learning owns its finish semantics; provider-specific wire formats stay in Agent Core. */
export async function runLearningProviderLoop(options: {
    agent: XiaobaiOsAgentSession; systemPrompt: string; messages: readonly RecordValue[];
    tools: readonly RecordValue[]; signal: AbortSignal; guard: () => boolean;
    executeTool: (name: string, args: unknown) => unknown | Promise<unknown>;
}): Promise<LearningLoopResult> {
    const { agent, signal, guard } = options;
    const messages = structuredClone([...options.messages]);
    const tools = new Set(options.tools.map(tool => String((tool.function as RecordValue).name)));
    let responses: RecordValue[] | undefined;
    const cancelled = () => signal.aborted || !guard();
    for (let round = 1; round <= MAX_LEARNING_ROUNDS; round++) {
        if (cancelled()) { return { status: 'cancelled' }; }
        // Count accumulated context even when the provider keeps its own continuation session.
        if ([...safePromptJson(messages)].length > MAX_LEARNING_CONTEXT) { return { status: 'failed', reason: 'learning_context_full' }; }
        let result: RecordValue;
        try {
            result = await agent.run({ systemPrompt: options.systemPrompt, tools: options.tools, signal,
                messages: agent.supportsSessionToolLoop && responses ? [] : messages,
                ...(agent.supportsSessionToolLoop && responses ? { toolResponses: responses } : {}) });
        } catch (error) {
            return cancelled() ? { status: 'cancelled' } : { status: 'failed', reason: classifyProviderFailure(error) };
        }
        if (cancelled()) { return { status: 'cancelled' }; }
        const calls = resolveResultToolCalls(result, agent.providerConfig, { fallbackPrefix: `learning-${round}` });
        if (!calls.length) {
            const text = typeof result.text === 'string' ? result.text.trim() : '';
            return text ? { status: 'finished', text } : { status: 'failed', reason: 'learning_empty_response' };
        }
        if (calls.length > 16) { return { status: 'failed', reason: 'learning_tool_limit' }; }
        messages.push(buildProviderAssistantToolCallMessage(result, calls));
        if ([...safePromptJson(messages)].length > MAX_LEARNING_CONTEXT) { return { status: 'failed', reason: 'learning_context_full' }; }
        responses = [];
        for (const call of calls) {
            if (cancelled()) { return { status: 'cancelled' }; }
            if (!tools.has(call.name)) { return { status: 'failed', reason: 'learning_unknown_tool' }; }
            let args: unknown = null;
            try { args = JSON.parse(call.arguments); } catch { /* The owning tool records an invalid proposal. */ }
            let value: unknown;
            try { value = await options.executeTool(call.name, args); }
            catch { return cancelled() ? { status: 'cancelled' } : { status: 'failed', reason: 'learning_tool_failed' }; }
            if (cancelled()) { return { status: 'cancelled' }; }
            messages.push(buildProviderToolResultMessage({ toolCallId: call.id, toolName: call.name, content: safePromptJson(value) }));
            responses.push({ id: call.id, name: call.name, response: value,
                ...(Object.hasOwn(call, 'providerId') ? { providerId: call.providerId } : {}) });
        }
    }
    return { status: 'failed', reason: 'learning_round_limit' };
}
