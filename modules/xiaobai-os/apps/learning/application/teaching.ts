import type { XiaobaiOsAgentGateway } from '../../../capabilities/agent/gateway.js';
import type { LearningSelection } from '../../../domains/learning/notes.js';
import { classifyProviderFailure } from '../../../capabilities/agent/provider-failure.js';
import { learningText, LearningValidationError, type LearningTeacherPreference } from '../../../domains/learning/profile.js';
import { buildLearningContext, type LearningDialogue, type LearningTeacherContext } from '../agent/context.js';
import { createLearningBackground, learningBackgroundTool } from '../agent/background.js';
import type { LearningTurn } from '../agent/history.js';
import { learningReplyText } from '../agent/messages.js';
import { buildLearningSystemPrompt } from '../agent/prompt.js';
import { runLearningProviderLoop } from '../agent/provider-loop.js';
import { learningResearchTools } from '../agent/research-tools.js';
import { createLearningSession, type LearningAction } from '../agent/session.js';
import { learningTools } from '../agent/tool-contract.js';
import { createLearningSourceRegistry } from '../materials/lesson-sources.js';
import { createLearningResearch, createLearningResearchCache } from '../materials/research.js';
import { LearningStorageError } from '../storage/repository.js';
import { sameLearningDocument } from '../storage/document.js';
import { confirmedLearning, type LearningRepository } from './service.js';
import { reportLearningFailure, type LearningFailureDetails, type LearningProgress } from './feedback.js';
import { learningMessageView, type LearningDialogueView } from './message-view.js';
import { createLearningPublication } from './publication.js';
import { isLearningConversation } from '../agent/access.js';
import type { LearningDelegation } from './delegation.js';

export interface LearningClassroom {
    language: string; osId: string; chatIdentity: string;
    teacher: NonNullable<LearningTeacherPreference['teacher']>;
}
export type LearningTeachingResult =
    | { status: 'finished'; text: string; changed: boolean; appliedTools: string[]; delegation?: LearningDelegation }
    | { status: 'unconfirmed' | 'conflict' | 'cancelled' | 'busy' }
    | { status: 'failed'; reason: string; message: string };
interface TeachingRequest {
    action: LearningAction; message: string; exerciseId?: string; displayMessage?: string; selection?: LearningSelection | null;
}

/** One workbench run and one conversation may coexist; their public history has one owner. */
export function createLearningTeaching(options: {
    repository: LearningRepository; gateway: XiaobaiOsAgentGateway;
    current: () => LearningClassroom | null;
    capture: (name: string, chatIdentity: string) => Promise<LearningTeacherContext>;
    createId?: () => string; now?: () => string;
    onProgress?: (progress: LearningProgress, action: LearningAction) => void;
    onConversation?: () => void;
    canDelegate?: () => boolean;
}) {
    type Lane = 'work' | 'conversation';
    const active = new Map<Lane, { controller: AbortController; turn: LearningTurn | null }>();
    let dialogueKey = '';
    let turns: LearningTurn[] = [];
    // References to the same published turns, retained for the current work even if chat history is compacted.
    const summaryReviews = new Map<string, LearningTurn>();
    let removedTurns = 0;
    let historySummary = '';
    // Only this exact commit can publish pending text and enable the corresponding activity.
    let awaitingSave: { commitId: string; turn: LearningTurn; presentation: LearningDialogue['presentation']; result: Extract<LearningTeachingResult, { status: 'finished' }>;
        request: TeachingRequest; publication: ReturnType<typeof createLearningPublication> } | null = null;
    let sources = createLearningSourceRegistry();
    let cache = createLearningResearchCache();
    function reset() {
        for (const run of active.values()) { run.controller.abort(); }
        active.clear(); turns = []; dialogueKey = ''; removedTurns = 0; historySummary = ''; awaitingSave = null;
        summaryReviews.clear();
        sources = createLearningSourceRegistry(); cache = createLearningResearchCache();
    }
    function settle(turn: LearningTurn, status: LearningDialogue['status'], message = '') {
        turn.status = status; turn.message = message;
    }
    return {
        cancel(lane?: Lane) {
            for (const [key, run] of active) {
                if (lane && key !== lane) { continue; }
                run.controller.abort(); active.delete(key);
                if (run.turn) { settle(run.turn, 'cancelled', '已停止。已展示的内容保留；本次教学草稿未确认保存。'); }
            }
            options.onConversation?.();
        },
        reset,
        recoverConfirmed() {
            const saved = options.repository.snapshot();
            if (!awaitingSave || saved.status !== 'ready') { return null; }
            const recovered = awaitingSave;
            awaitingSave = null;
            if (saved.document?.commitId !== recovered.commitId || dialogueKey !== JSON.stringify(options.current())) { return null; }
            recovered.turn.presentation = recovered.presentation;
            recovered.publication.confirmSave();
            recovered.turn.teacher = learningReplyText(recovered.turn.messages);
            recovered.result.text = recovered.turn.teacher;
            settle(recovered.turn, 'finished');
            options.onConversation?.();
            return { result: recovered.result, request: recovered.request };
        },
        conversation(): { turns: LearningDialogueView[]; removedTurns: number; summaryReviews: { attemptId: string; text: string }[] } {
            const classroom = options.current();
            const attempts = options.repository.snapshot().document?.data.profiles.find(profile => profile.language === classroom?.language)?.unit?.attempts ?? [];
            for (const id of summaryReviews.keys()) { if (!attempts.some(attempt => attempt.id === id)) { summaryReviews.delete(id); } }
            return dialogueKey === JSON.stringify(options.current())
                ? { turns: structuredClone(turns.map(turn => ({ ...turn,
                    messages: turn.messages.filter(message => message.role === 'assistant' || message.role === 'tool').map(learningMessageView),
                }))), removedTurns, summaryReviews: [...summaryReviews].filter(([, turn]) => turn.status === 'finished')
                    .map(([attemptId, turn]) => ({ attemptId, text: turn.teacher })) }
                : { turns: [], removedTurns: 0, summaryReviews: [] };
        },
        async run(input: TeachingRequest): Promise<LearningTeachingResult> {
            const conversation = isLearningConversation(input.action);
            const lane = conversation ? 'conversation' : 'work';
            if (active.has(lane)) { return { status: 'busy' }; }
            const classroom = structuredClone(options.current());
            if (!classroom?.chatIdentity || !classroom.osId) { return { status: 'cancelled' }; }
            const key = JSON.stringify(classroom);
            if (key !== dialogueKey) { reset(); dialogueKey = key; }
            const controller = new AbortController();
            const running = { controller, turn: null as LearningTurn | null };
            active.set(lane, running);
            const guard = () => active.get(lane) === running && !controller.signal.aborted && JSON.stringify(options.current()) === key;
            let draft: ReturnType<typeof createLearningSession> | null = null;
            let publication: ReturnType<typeof createLearningPublication> | null = null;
            let visible: LearningTurn | null = null;
            let progress: LearningProgress = { stage: 'context' };
            const advance = (next: LearningProgress) => {
                if (guard()) { progress = next; if (visible) { visible.progress = next; } options.onProgress?.(next, input.action); }
            };
            const failure = (reason: string, details: LearningFailureDetails = progress): LearningTeachingResult => {
                const message = reportLearningFailure(input.action.kind, reason, details);
                publication?.discard();
                if (visible) { settle(visible, 'failed', message); }
                return { status: 'failed', reason, message };
            };
            try {
                advance(progress);
                const request = structuredClone(input);
                learningText(request.message, 'message', 4000, request.action.kind === 'companion');
                const storage = options.repository.snapshot();
                if (storage.status === 'unconfirmed' || storage.status === 'conflict') { return { status: storage.status }; }
                if (storage.status === 'unloaded') { return failure('learning_read_failed'); }
                let baseline = confirmedLearning(options.repository);
                visible = { user: request.displayMessage ?? request.message, teacher: '', status: 'running', message: '', messages: [], purpose: request.action.kind, progress };
                if (request.action.kind === 'summary-review') { summaryReviews.set(request.action.attemptId, visible); }
                // A companion remark saves nothing and has no help to declare; it is shown as soon as it arrives.
                const remark = request.action.kind === 'companion';
                publication = createLearningPublication(visible.messages, { declared: () => remark || (draft?.helpDeclared() ?? false),
                    helpIsPublished: () => remark || (draft?.helpIsPublished() ?? false), current: guard });
                controller.signal.addEventListener('abort', publication.discard, { once: true });
                running.turn = visible;
                const history = turns.filter(turn => turn.status !== 'running');
                let compactedCount = 0;
                let summaryAtStart = historySummary;
                turns.push(visible); options.onConversation?.();
                const context = await options.capture(classroom.teacher.name, classroom.chatIdentity);
                if (!guard()) { return { status: 'cancelled' }; }
                const asOf = options.now?.() ?? new Date().toISOString();
                const background = createLearningBackground(context);
                advance({ stage: 'config' });
                const config = await options.gateway.loadConfig();
                if (!guard()) { return { status: 'cancelled' }; }
                advance({ stage: 'session' });
                const agent = await options.gateway.openSession(config);
                if (!guard()) { return { status: 'cancelled' }; }
                if (conversation) { baseline = confirmedLearning(options.repository); }
                if (!sameLearningDocument(baseline, confirmedLearning(options.repository))) {
                    settle(visible, 'conflict', '学习记录已变化，本次请求未继续。请重新加载后再试。');
                    return { status: 'conflict' };
                }
                const research = createLearningResearch(config, { sources, cache, signal: controller.signal, createId: options.createId, now: options.now });
                // One story-aware teacher for every action, including web research. Free-form derivatives retain this story scope.
                draft = createLearningSession(options.repository, { ...classroom, action: request.action,
                    inputScope: { kind: 'story', osId: classroom.osId }, sources, learnerMessage: request.message,
                    createId: options.createId, now: options.now, asOf, canDelegate: options.canDelegate });
                const { prefix, messages, turn } = buildLearningContext({ ...classroom, ...request, context, asOf,
                    data: baseline?.data ?? { profiles: [] } });
                visible.messages.push(turn);
                const session = draft;
                let helpError: unknown;
                async function saveHelp() {
                    try {
                        const helpSave = await session.saveHelp(guard);
                        if (helpSave.status !== 'confirmed' && helpSave.status !== 'unchanged') { throw new LearningStorageError('learning_resolve_pending_first'); }
                    } catch (error) { helpError = error; throw error; }
                }
                if (request.exerciseId && request.action.kind === 'explain') {
                    session.markExplained(request.exerciseId);
                    advance({ stage: 'save' });
                    await saveHelp();
                }
                const outcome = await runLearningProviderLoop({ agent, systemPrompt: buildLearningSystemPrompt(classroom.teacher.name, request.action), prefix, messages,
                    history, historySummary: summaryAtStart, reopen: () => options.gateway.openSession(config),
                    onCompact: (count, summary) => {
                        const compacted = history.slice(compactedCount, compactedCount + count);
                        // Another lane may have already compacted this prefix. Never remove its running turn
                        // or replace a newer summary with one produced from an older history snapshot.
                        if (summaryAtStart === historySummary && compacted.every((turn, index) => turns[index] === turn)) {
                            turns.splice(0, count); removedTurns += count; historySummary = summary; summaryAtStart = summary;
                            options.onConversation?.();
                        }
                        compactedCount += count;
                    },
                    // Research is for choosing lesson material; stage purposes work on the saved unit.
                    tools: [...learningTools(request.action), learningBackgroundTool,
                        ...(research.available && request.action.kind === 'prepare' ? learningResearchTools() : [])],
                    signal: controller.signal, guard, onProgress: advance,
                    allowSilence: remark,
                    onResponseStart: publication.begin, onResponseComplete: publication.complete,
                    transcript: visible.messages, onMessages: options.onConversation,
                    executeTool: async (name, args) => {
                        if (name === 'LearningSearch' || name === 'LearningExtract') { return research.executeTool(name, args); }
                        if (name === 'LearningContextRead') { return background.execute(args); }
                        const result = session.executeTool(name, args);
                        const mutation = result as { ok?: boolean; changed?: boolean };
                        if (name === 'LearningLessonEdit' && mutation.ok && mutation.changed) {
                            publication!.discard();
                        }
                        if (name === 'LearningHelp' && mutation.ok) { await saveHelp(); }
                        return result;
                    } });
                if (outcome.status === 'cancelled') { return outcome; }
                if (helpError) { return failure(helpError instanceof LearningStorageError ? helpError.code : 'learning_save_failed', { stage: 'save', cause: helpError }); }
                if (outcome.status === 'failed') { return failure(outcome.reason, outcome.details); }
                const appliedTools = session.appliedTools();
                visible.teacher = learningReplyText(visible.messages);
                options.onConversation?.();
                advance({ stage: 'save' });
                const saved = await session.commit(guard);
                const presentation = session.presentation();
                const delegation = session.delegation();
                const result = { status: 'finished' as const, text: visible.teacher, changed: saved.status !== 'unchanged', appliedTools,
                    ...(delegation ? { delegation } : {}) };
                const commitId = saved.commitId;
                if (commitId && guard() && (saved.status === 'unconfirmed' || saved.status === 'conflict')) {
                    awaitingSave = { commitId, turn: visible, presentation: presentation ?? undefined, result, request, publication };
                }
                if (!guard()) { return { status: 'cancelled' }; }
                if (saved.status !== 'confirmed' && saved.status !== 'unchanged') {
                    settle(visible, saved.status, saved.status === 'unconfirmed' ? '回复已收到，学习修改尚未确认保存，请检查保存。'
                        : saved.status === 'conflict' ? '回复已收到，学习记录有冲突，请检查保存。' : '已停止，本次教学草稿未保存。');
                    return { status: saved.status };
                }
                visible.presentation = presentation ?? undefined;
                publication.confirmSave();
                visible.teacher = learningReplyText(visible.messages);
                result.text = visible.teacher;
                settle(visible, 'finished');
                return result;
            } catch (error) {
                if (!guard()) { return { status: 'cancelled' }; }
                const details = { ...progress, cause: error };
                if (error instanceof LearningStorageError) { return failure(error.code, details); }
                if (error instanceof LearningValidationError) {
                    return failure('learning_input_invalid', details);
                }
                const reason = progress.stage === 'provider' ? classifyProviderFailure(error)
                    : progress.stage === 'context' ? 'learning_context_failed' : progress.stage === 'config' ? 'learning_config_failed'
                        : progress.stage === 'save' ? 'learning_save_failed' : 'learning_session_failed';
                return failure(reason, details);
            } finally {
                if (publication) { controller.signal.removeEventListener('abort', publication.discard); }
                if (awaitingSave?.turn !== visible) { publication?.discard(); }
                draft?.invalidate();
                if (visible?.status === 'running') { settle(visible, 'cancelled', '已停止，本次教学草稿未保存。'); }
                // An unfinished remark is not part of the conversation the next request continues from.
                if (visible && visible.purpose === 'companion' && (visible.status !== 'finished' || !visible.teacher.trim())) {
                    const index = turns.indexOf(visible);
                    if (index >= 0) { turns.splice(index, 1); options.onConversation?.(); }
                }
                if (active.get(lane) === running) { active.delete(lane); options.onConversation?.(); }
            }
        },
    };
}
