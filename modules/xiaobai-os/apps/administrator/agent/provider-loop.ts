import { buildProviderAssistantToolCallMessage, buildProviderToolResultMessage, resolveResultToolCalls } from '../../../../agent-core/runtime/protocol.js';
import type { XiaobaiOsAgentGateway } from '../../../capabilities/agent/gateway.js';
import { safePromptJson } from '../../../capabilities/maintenance/prompt-safety.js';
import { ADMINISTRATOR_POLICY as POLICY } from '../domain/policy.js';
import type { AdministratorContextUsage, AdministratorTurn } from '../domain/types.js';
import { administratorTurnMessages, contextUsage, referenceSummary, summarizeAdministrator, summaryBatch, type AgentRecord } from './history.js';

interface ToolCall { id: string; name: string; arguments: string; providerId?: unknown }
interface PendingRound { assistant: AgentRecord; calls: ToolCall[]; results: AgentRecord[]; responses: AgentRecord[]; index: number }
export interface AdministratorLoopCheckpoint {
    history: AdministratorTurn[]; summary: string; runtimeSummary: string; blocks: AgentRecord[][];
    pending: PendingRound | null; rounds: number; compactedThrough: string | null;
}
export function createAdministratorCheckpoint(history: AdministratorTurn[], summary: string): AdministratorLoopCheckpoint {
    return { history: [...history], summary, runtimeSummary: '', blocks: [], pending: null, rounds: 0, compactedThrough: null };
}
// These are provider protocol errors, not a guessed window size or a generic HTTP 400.
export function isAdministratorContextOverflow(error: unknown): boolean {
    if (!error || typeof error !== 'object') { return false; }
    const value = error as { status?: number; code?: string; message?: string; error?: { code?: string } };
    return [value.code, value.error?.code].includes('context_length_exceeded')
        || [400, 413, 422].includes(value.status ?? 0) && /maximum context length|context (?:window|length).*(?:exceed|too (?:long|large))|prompt is too long|input token count.*exceeds/iu.test(value.message ?? '');
}

export async function runAdministratorLoop(options: {
    gateway: XiaobaiOsAgentGateway; config: unknown; system: string; prefix: AgentRecord[];
    request: AgentRecord; requestForCounting: AgentRecord; imageCount: number;
    tools: AgentRecord[]; checkpoint: AdministratorLoopCheckpoint; signal: AbortSignal;
    execute(name: string, args: unknown, callId: string): Promise<unknown>;
    onText(text: string): void; onPhase(phase: 'replying' | 'summarizing'): void;
    onContext(usage: AdministratorContextUsage): void;
    onToolPreview?(names: string[]): void;
}): Promise<string> {
    const { checkpoint: state, signal } = options;
    let agent = await options.gateway.openSession(options.config);
    let responses: AgentRecord[] | undefined;
    let overflowRetried = false;
    const history = () => [...referenceSummary(state.summary), ...state.history.flatMap(administratorTurnMessages)];
    const runtime = (counting = false) => [...referenceSummary(state.runtimeSummary), counting ? options.requestForCounting : options.request, ...state.blocks.flat()];
    const usage = () => contextUsage(options.system, options.tools, options.prefix, history(), runtime(true), options.imageCount, agent.providerConfig);
    const replay = () => [...options.prefix, ...history(), ...runtime()];
    async function compact(force = false): Promise<boolean> {
        const before = usage().used;
        const count = Math.max(force ? 1 : 0, state.history.length - POLICY.preservedTurns);
        let older = count > 0 ? state.history.slice(0, count) : [];
        let blocks = older.length ? [] : state.blocks.slice(0, Math.max(0, state.blocks.length - 1));
        if (!older.length && !blocks.length) { return false; }
        if (older.length) { older = older.slice(0, summaryBatch(older.map(administratorTurnMessages), state.summary)); }
        else { blocks = blocks.slice(0, summaryBatch(blocks, state.runtimeSummary)); }
        options.onPhase('summarizing');
        const result = await summarizeAdministrator({ gateway: options.gateway, config: options.config, signal,
            summary: older.length ? state.summary : state.runtimeSummary,
            messages: older.length ? older.flatMap(administratorTurnMessages) : blocks.flat() });
        if (!result) { return false; }
        const oldSummary = state.summary, oldRuntime = state.runtimeSummary;
        if (older.length) { state.summary = result; state.history.splice(0, older.length); }
        else { state.runtimeSummary = result; state.blocks.splice(0, blocks.length); }
        if (usage().used >= before) {
            state.summary = oldSummary; state.runtimeSummary = oldRuntime;
            if (older.length) { state.history.unshift(...older); } else { state.blocks.unshift(...blocks); }
            return false;
        }
        if (older.length) { state.compactedThrough = older.at(-1)!.id; }
        return true;
    }
    async function finishTools() {
        const pending = state.pending!;
        while (pending.index < pending.calls.length) {
            signal.throwIfAborted();
            const call = pending.calls[pending.index];
            let args: unknown;
            try { args = JSON.parse(call.arguments); } catch { args = null; }
            const result = await options.execute(call.name, args, `${state.rounds}:${call.id}`);
            pending.results.push(buildProviderToolResultMessage({ toolName: call.name, toolCallId: call.id, content: safePromptJson(result) }));
            pending.responses.push({ id: call.id, name: call.name, response: result, ...(Object.hasOwn(call, 'providerId') ? { providerId: call.providerId } : {}) });
            pending.index++;
        }
        state.blocks.push([pending.assistant, ...pending.results]);
        state.pending = null;
        return pending.responses;
    }
    // A resumed run replays completed calls but never re-executes them. The unfinished call is recovered by its executor.
    if (state.pending) { await finishTools(); }
    while (state.rounds < POLICY.maxToolRounds) {
        signal.throwIfAborted();
        let compacted = false;
        while (usage().used > POLICY.summaryTrigger) {
            if (!await compact()) { break; }
            compacted = true;
        }
        if (compacted && responses) { agent = await options.gateway.openSession(options.config); responses = undefined; }
        const currentUsage = usage(); options.onContext(currentUsage);
        if (currentUsage.used > POLICY.inputBudget) { throw new Error('administrator_context_full'); }
        options.onPhase('replying');
        let result: AgentRecord;
        try {
            const native = agent.supportsSessionToolLoop && responses !== undefined;
            result = await agent.run({ systemPrompt: options.system, messages: native ? [] : replay(), tools: options.tools, signal,
                ...(native ? { toolResponses: responses } : {}), onStreamProgress: snapshot => {
                    options.onText(String(snapshot.text ?? ''));
                    options.onToolPreview?.(Array.isArray(snapshot.toolCalls) ? snapshot.toolCalls.map(call => String(call.name ?? '')).filter(Boolean) : []);
                } });
        } catch (error) {
            if (!signal.aborted && !overflowRetried && isAdministratorContextOverflow(error) && await compact(true)) {
                overflowRetried = true; agent = await options.gateway.openSession(options.config); responses = undefined; continue;
            }
            throw error;
        }
        state.rounds++;
        options.onToolPreview?.([]);
        signal.throwIfAborted();
        if (result.refused) { throw new Error('administrator_model_refused'); }
        const calls = resolveResultToolCalls(result, agent.providerConfig, { fallbackPrefix: `administrator-${state.rounds}` }) as ToolCall[];
        if (!calls.length) {
            const text = String(result.text ?? '').trim();
            if (!text) { throw new Error('administrator_empty_response'); }
            options.onText(text);
            return text;
        }
        if (calls.length > 24) { throw new Error('administrator_tool_batch_too_large'); }
        state.pending = { assistant: buildProviderAssistantToolCallMessage(result, calls), calls, results: [], responses: [], index: 0 };
        responses = await finishTools();
    }
    throw new Error('administrator_tool_round_limit');
}
