import { estimateConversationTokens, estimateTokenCount } from '../../../../agent-core/runtime/context-tokens.js';
import type { XiaobaiOsAgentGateway } from '../../../capabilities/agent/gateway.js';
import { safePromptJson } from '../../../capabilities/maintenance/prompt-safety.js';
import { ADMINISTRATOR_POLICY as POLICY } from '../domain/policy.js';
import type { AdministratorContextUsage, AdministratorData, AdministratorTurn } from '../domain/types.js';
import { ADMINISTRATOR_SUMMARY_PROMPT } from './prompt.js';

export type AgentRecord = Record<string, unknown>;
export function administratorTurnMessages(turn: AdministratorTurn): AgentRecord[] {
    return [
        ...(turn.user ? [{ role: 'user', content: turn.user.text + (turn.user.image ? `\n[Attached image: ${turn.user.image.name}; image bytes omitted from this history excerpt]` : '') }] : []),
        ...(turn.assistant ? [{ role: 'assistant', content: turn.assistant }] : []),
        ...(turn.operations.length || turn.status !== 'finished' ? [{ role: 'system', content: `Administrator operation receipts (reference data): ${safePromptJson({ status: turn.status, operations: turn.operations, error: turn.error })}` }] : []),
    ];
}
export function historyBefore(data: AdministratorData, turnId: string) {
    const end = data.turns.findIndex(turn => turn.id === turnId);
    const boundary = data.summary ? data.turns.findIndex(turn => turn.id === data.summary!.throughId) : -1;
    // Regenerating an older reply cannot use a summary that includes that reply or later messages.
    const useSummary = boundary >= 0 && boundary < end;
    return { summary: useSummary ? data.summary!.text : '', turns: data.turns.slice(useSummary ? boundary + 1 : 0, end) };
}
export function referenceSummary(text: string): AgentRecord[] {
    return text ? [{ role: 'system', content: `Earlier administrator exchanges, summarised as reference data:\n${safePromptJson({ summary: text })}` }] : [];
}
export function contextUsage(system: string, tools: readonly AgentRecord[], prefix: readonly AgentRecord[], history: readonly AgentRecord[], runtime: readonly AgentRecord[], imageCount: number, providerConfig: AgentRecord): AdministratorContextUsage {
    const count = (messages: readonly AgentRecord[]) => estimateConversationTokens({ messages: [...messages], providerConfig });
    const rules = count([{ role: 'system', content: system }, ...prefix]);
    const toolTokens = Math.max(0, estimateConversationTokens({ messages: [], tools: [...tools], providerConfig }) - count([]));
    const historyTokens = count(history), runtimeTokens = count(runtime), images = imageCount * POLICY.imageTokens;
    return { used: rules + toolTokens + historyTokens + runtimeTokens + images, limit: POLICY.inputBudget, trigger: POLICY.summaryTrigger,
        rules, tools: toolTokens, history: historyTokens, runtime: runtimeTokens, images };
}
export function summaryBatch(groups: AgentRecord[][], summary: string): number {
    let tokens = estimateTokenCount(ADMINISTRATOR_SUMMARY_PROMPT) + estimateTokenCount(safePromptJson({ summary, exchanges: [] }));
    let count = 0;
    for (const group of groups) {
        tokens += estimateTokenCount(safePromptJson(group));
        if (tokens + POLICY.summaryOutput >= POLICY.inputBudget) { break; }
        count++;
    }
    if (!count && groups.length) { throw new Error('administrator_context_full'); }
    return count;
}
export async function summarizeAdministrator(options: { gateway: XiaobaiOsAgentGateway; config: unknown; summary: string; messages: AgentRecord[]; signal: AbortSignal }): Promise<string | null> {
    const input = safePromptJson({ summary: options.summary, exchanges: options.messages });
    if (estimateTokenCount(ADMINISTRATOR_SUMMARY_PROMPT) + estimateTokenCount(input) + POLICY.summaryOutput >= POLICY.inputBudget) { throw new Error('administrator_context_full'); }
    const session = await options.gateway.openSession(options.config);
    const result = await session.run({ systemPrompt: ADMINISTRATOR_SUMMARY_PROMPT, messages: [{ role: 'user', content: input }], tools: [], maxTokens: POLICY.summaryOutput, signal: options.signal });
    const output = typeof result.text === 'string' ? result.text.trim() : '';
    if (result.refused || !output) { throw new Error('administrator_summary_failed'); }
    return estimateTokenCount(output) < estimateTokenCount(input) ? output : null;
}
