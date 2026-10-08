import type { AgentCapability } from '../../../../capabilities/agent/index.js';
import type { Campaign, ConversationMemory, ConversationTurn } from '../campaign/types.js';
import { CAMPAIGN_RULES } from '../campaign/rules.js';
import { isPerson, type Participant } from '../content/participants.js';
import { boundedText } from '../partition.js';
import { object } from '../validation.js';
import { conversationContext } from './prompt.js';
import type { NarrativeAction } from './actions.js';
import type { AffectionDirection } from '../campaign/relationships.js';
import { fault } from '../random.js';
import { loadNarrativeCanon } from './canon.js';
import { prepareConversation, type TokenCounter } from './memory.js';
import { runNarrativeRequest } from './provider.js';

export interface ConversationOptions {
    loadCanon?: typeof loadNarrativeCanon;
    countTokens?: TokenCounter;
    saveMemory: (memory: ConversationMemory) => Promise<void>;
    received: (response: Record<string, unknown>) => void;
}

type ConversationResult = Pick<ConversationTurn, 'reply' | 'action' | 'issue'> & { kind: 'dialogue' | 'receipt'; affection: AffectionDirection };
function receipt(text: unknown, issue: 'reply_invalid' | 'reply_incomplete'): ConversationResult {
    if (typeof text !== 'string' || !text.trim()) { fault(issue); }
    return { kind: 'receipt', reply: text, action: null, affection: null, issue };
}

export async function generateConversation(agent: AgentCapability, campaign: Campaign, person: Participant, text: string, signal: AbortSignal, options: ConversationOptions) {
    const check = () => { if (signal.aborted) { fault('cancelled'); } };
    const config = await agent.loadConfig(); check();
    const session = await agent.openSession(config); check();
    if (!String(session.providerConfig.model ?? '').trim()) { fault('agent_not_configured'); }
    const canon = await (options.loadCanon ?? loadNarrativeCanon)(person, signal); check();
    let memory = campaign.memories[person];
    const prepare = (force = false) => prepareConversation(session, campaign, person, text, canon, signal, {
        ...options, memory, force, async saveMemory(next) { await options.saveMemory(next); memory = next; },
    });
    const prompt = await prepare(); check();
    const requestDialogue = async (prepared: typeof prompt) => {
        try { return await runNarrativeRequest(session, { ...prepared, tools: [], maxTokens: 2400, signal }); }
        catch (error) {
            const cause = (error as { cause?: { partialResponse?: Record<string, unknown> } }).cause;
            if (!cause?.partialResponse) { throw error; }
            return { ...cause.partialResponse, truncated: true };
        }
    };
    let response;
    try { response = await requestDialogue(prompt); }
    catch (error) {
        if (!(error && typeof error === 'object' && 'code' in error && error.code === 'expedition_context_capacity')) { throw error; }
        const compacted = await prepare(true); check();
        response = await requestDialogue(compacted);
    }
    options.received(response); check();
    if (response.truncated) { return receipt(response.text, 'reply_incomplete'); }
    if (typeof response.text !== 'string') { fault('reply_invalid'); }
    try {
        const source = response.text.trim();
        // Accept one complete JSON fence, never extract a guessed object from prose.
        const fence = /^```(?:json)?\s*\n([\s\S]*?)\n```$/i.exec(source);
        const result = object(JSON.parse(fence ? fence[1] : source));
        const reply = boundedText(result.reply, CAMPAIGN_RULES.replyTextLimit);
        const submitted = typeof result.action === 'string' ? result.action.trim() : result.action;
        const action = typeof submitted === 'string' && conversationContext(campaign, person, canon.stages).actions.includes(submitted) ? submitted as NarrativeAction : null;
        const issue = submitted !== null && submitted !== undefined && !action ? 'action_rejected' as const : undefined;
        const affection: AffectionDirection = isPerson(person) && (result.affection === 'up' || result.affection === 'down') ? result.affection : null;
        return { kind: 'dialogue' as const, reply, action, affection, ...(issue ? { issue } : {}) };
    } catch { return receipt(response.text, 'reply_invalid'); }
}
