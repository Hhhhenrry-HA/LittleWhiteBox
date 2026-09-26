import { loadSharedAgentSettings } from '../../agent-core/settings-repository.js';
import { resolveActiveProviderConfig, isSillyTavernProvider } from '../../agent-core/provider-resolution.js';
import { buildProviderAssistantToolCallMessage, buildProviderToolResultMessage, resolveResultToolCalls } from '../../agent-core/runtime/protocol.js';
import { MEMORY_MAINTENANCE_PROMPT } from './prompt.js';
import { MEMORY_TOOLS } from './tools.js';
import { MemoryMaintenanceError, requireMemory } from './errors.js';

// Execution ceilings, not a promise that a full history fits. Real-model calibration is tracked in the acceptance report.
export const REVIEW_LIMITS = Object.freeze({ turns: 48, inputChars: 240000 });

export async function createSharedMemoryAgent() {
    const settings = await loadSharedAgentSettings();
    const config = resolveActiveProviderConfig(settings);
    requireMemory(config.model?.trim() && (isSillyTavernProvider(config.provider) || config.baseUrl?.trim()), 'not_configured');
    const core = await import('../../agent-core/dist/agent-core-browser.js');
    const { getRequestHeaders } = await import('../../../../../../../script.js');
    core.setHostChatCompletionsRequestHeadersProvider(() => getRequestHeaders());
    return { adapter: core.createAgentAdapter(config), config };
}

/** Transport failures are not blindly retried: tool argument failures are repaired inside this paid session. */
export async function runMemoryAgent(session, { adapter, config, signal, onCall = () => {}, limits = REVIEW_LIMITS }) {
    const messages = [{ role: 'user', content: JSON.stringify({ ...session.initial(), budget: limits }) }];
    const inputSize = () => JSON.stringify({ systemPrompt: MEMORY_MAINTENANCE_PROMPT, tools: MEMORY_TOOLS, messages }).length;
    const calls = [];
    let responses = null;
    let summary = '';
    for (let turn = 0; turn < limits.turns; turn++) {
        requireMemory(!signal?.aborted, 'cancelled');
        requireMemory(inputSize() <= limits.inputChars, 'budget');
        const request = {
            systemPrompt: MEMORY_MAINTENANCE_PROMPT, tools: MEMORY_TOOLS, toolChoice: 'required',
            temperature: config.temperature, maxTokens: config.maxTokens, reasoning: config.reasoning,
            signal, captureRawAssistantMessage: true,
            ...(adapter.supportsSessionToolLoop && responses ? { toolResponses: responses } : { messages }),
        };
        const startedAt = Date.now();
        const result = await adapter.chat(request);
        const toolCalls = resolveResultToolCalls(result, config);
        const call = { turn: turn + 1, startedAt, durationMs: Date.now() - startedAt,
            usage: result.usage || null, provider: config.provider, model: config.model };
        calls.push(call);
        onCall({ call, result });
        requireMemory(!signal?.aborted, 'cancelled');
        messages.push(buildProviderAssistantToolCallMessage(result, toolCalls));
        responses = [];
        for (const [toolIndex, toolCall] of toolCalls.entries()) {
            let response;
            try {
                const args = JSON.parse(toolCall.arguments);
                requireMemory(toolCall.name !== 'FinishReview' || toolIndex === toolCalls.length - 1, 'incomplete_finish');
                requireMemory(toolCall.name !== 'FinishReview' || !responses.some(item => item.response.status === 'error'), 'finish_after_error');
                response = session.runTool(toolCall.name, args);
                if (toolCall.name === 'FinishReview') summary = response.summary;
            } catch (error) {
                if (!(error instanceof MemoryMaintenanceError) && !(error instanceof SyntaxError)) throw error;
                response = { status: 'error', code: error.code || 'invalid_json', message: error.message };
            }
            response.budget = { turnsRemaining: limits.turns - turn - 1, inputCharactersRemaining: Math.max(0, limits.inputChars - inputSize()) };
            responses.push({ id: toolCall.id, name: toolCall.name, response,
                ...(Object.hasOwn(toolCall, 'providerId') ? { providerId: toolCall.providerId } : {}) });
            messages.push(buildProviderToolResultMessage({ toolCallId: toolCall.id, toolName: toolCall.name, content: JSON.stringify(response) }));
        }
        if (session.finished) return { calls, summary };
        requireMemory(toolCalls.length > 0, 'incomplete_finish');
    }
    throw new MemoryMaintenanceError('budget');
}
