import { CARD_SKILL, CARD_FILES } from '../../../card-workspace/assistant-contract.js';
import { loadedSkillIds } from '../../shared/skill-tools.js';
import { COMPOSER_COPY } from '../ui/composer-copy.js';
import { callReadableWorkspaceTool } from '../../shared/workspace-tool-paths.js';

// Record a confirmed manual reload using the same paired receipts as tool calls.
export async function loadCardIntoConversation(run, { state, appendMessage, callHostTool, openCard, buildToolFailureResult, createRequestId, persistSession, render, setToolActivity }) {
    run.controller.signal.throwIfAborted();
    appendMessage({ role: 'user', localOperation: true, content: COMPOSER_COPY.loadCard });
    async function record(name, args, execute) {
        run.controller.signal.throwIfAborted();
        const call = { id: createRequestId('card-load'), name, arguments: JSON.stringify(args) };
        appendMessage({ role: 'assistant', content: '', toolCalls: [call] });
        const stored = state.messages.at(-1).toolCalls[0];
        setToolActivity(stored, run, 'preparing');
        render();
        let result;
        try {
            result = await callReadableWorkspaceTool(name, args, () => execute({ runId: run.id, signal: run.controller.signal,
                onDispatched: () => { setToolActivity(stored, run, 'running'); render(); } }));
        } catch (error) {
            result = buildToolFailureResult(name, args, error);
        }
        appendMessage({ role: 'tool', toolCallId: call.id, toolName: name, content: JSON.stringify(result) });
        const saved = await persistSession();
        if (saved?.ok === false) throw new Error(saved.error);
        render();
        run.controller.signal.throwIfAborted();
        if (result?.ok === false) throw new Error(result.message || result.error);
        return result;
    }
    if (!loadedSkillIds(state.messages, state.archivedSkillIds).includes(CARD_SKILL.id)) {
        const args = { id: CARD_SKILL.id };
        await record('ReadSkill', args, options => callHostTool('ReadSkill', args, options));
    }
    const card = await record(CARD_FILES, { action: 'open' }, openCard);
    appendMessage({ role: 'assistant', content: COMPOSER_COPY.cardLoaded(card.name) });
    const saved = await persistSession();
    if (saved?.ok === false) throw new Error(saved.error);
    render();
    return card;
}
