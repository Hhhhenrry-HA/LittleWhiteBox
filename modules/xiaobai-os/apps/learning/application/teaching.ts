import { learningConversationScope, learningReferencedIds, learningReferenceScopes } from './conversation-references.js';
import type { XiaobaiOsAgentGateway } from '../../../capabilities/agent/gateway.js';
import type { LearningSelection } from '../../../domains/learning/notes.js';
import { classifyProviderFailure } from '../../../capabilities/agent/provider-failure.js';
import { combineLearningScope, requireLearning } from '../../../domains/learning/validation.js';
import { canReadLearningScope, type LearningScope } from '../../../domains/learning/types.js';
import type { LearningActor, LearningConversationMemory } from '../domain/conversation.js';
import type { LearningConversationPort } from './conversation-storage.js';
import { learningHistoryPrompt } from '../agent/history-prompt.js';
import { createLearningId } from './identity.js';
import { LEARNING_CONVERSATION_COPY as copy } from './conversation-copy.js';
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
import { isLearningConversation, learningAccessOsId, learningReadUnit, learningReviewScope } from '../agent/access.js';
import type { LearningDelegation } from './delegation.js';
import { learningPreparationTool } from '../agent/preparation-tools.js';

export interface LearningClassroom {
    language: string; osId: string; chatIdentity: string;
    teacher: LearningTeacherPreference['teacher'];
    sessionId?: string;
}
export type LearningTeachingResult =
    | { status: 'finished'; text: string; changed: boolean; appliedTools: string[]; delegation?: LearningDelegation }
    | { status: 'unconfirmed' | 'conflict' | 'cancelled' | 'busy' }
    | { status: 'failed'; reason: string; message: string; displayed: boolean };
interface TeachingRequest {
    action: LearningAction; message: string; exerciseId?: string; displayMessage?: string; selection?: LearningSelection | null;
}

/** One persona owns its history. Workbench requests and private companionship use separate instances. */
export function createLearningTeaching(options: {
    repository: LearningRepository; gateway: XiaobaiOsAgentGateway;
    actor: LearningActor;
    memory: () => LearningConversationPort;
    current: () => LearningClassroom | null;
    capture: (name: string, chatIdentity: string) => Promise<LearningTeacherContext>;
    createId?: () => string; now?: () => string;
    onProgress?: (progress: LearningProgress, action: LearningAction) => void;
    onConversation?: () => void;
    canDelegate?: (action: LearningDelegation['action']) => boolean;
}) {
    type Lane = 'work' | 'conversation' | 'preparation';
    const active = new Map<Lane, { controller: AbortController; turn: LearningTurn | null }>();
    let dialogueKey = '';
    let turns: LearningTurn[] = [];
    // References to the same published turns, retained for the current work even if chat history is compacted.
    const summaryReviews = new Map<string, LearningTurn>();
    let removedTurns = 0;
    let historySummary = '';
    let summaryReferences: string[] = [];
    let summaryScope: LearningScope = { kind: 'public' };
    let loading: Promise<void> | null = null;
    // Only this exact commit can publish pending text and enable the corresponding activity.
    let awaitingSave: { commitId: string; turn: LearningTurn; presentation: LearningDialogue['presentation']; result: Extract<LearningTeachingResult, { status: 'finished' }>;
        request: TeachingRequest; publication: ReturnType<typeof createLearningPublication> } | null = null;
    let sources = createLearningSourceRegistry();
    let cache = createLearningResearchCache();
    // The exact failed request belongs to this live conversation, not to stored memory.
    let retry: { turn: LearningTurn; request: TeachingRequest; material: string } | null = null;
    const materialKey = () => {
        const profile = options.repository.snapshot().document?.data.profiles.find(profile => profile.language === options.current()?.language);
        return JSON.stringify([profile?.unit?.id, profile?.review?.id]);
    };
    function canRetry(turn: LearningTurn): boolean {
        return retry?.turn === turn && turn.purpose === 'talk' && ['failed', 'cancelled'].includes(turn.status)
            && turn.progress?.stage !== 'save' && !turn.notice && retry.material === materialKey()
            && dialogueKey === JSON.stringify(options.current()) && !active.has('conversation');
    }
    function reset() {
        for (const run of active.values()) { run.controller.abort(); }
        active.clear(); turns = []; dialogueKey = ''; removedTurns = 0; historySummary = ''; awaitingSave = null;
        summaryReviews.clear(); summaryReferences = []; summaryScope = { kind: 'public' }; loading = null;
        sources = createLearningSourceRegistry(); cache = createLearningResearchCache(); retry = null;
    }
    function settle(turn: LearningTurn, status: LearningDialogue['status'], message = '') {
        turn.status = status; turn.message = message; delete turn.notice;
    }
    async function hydrate() {
        const classroom = options.current();
        if (!classroom) { reset(); return; }
        const key = JSON.stringify(classroom);
        if (key === dialogueKey) { if (loading) { await loading; } return; }
        reset(); dialogueKey = key;
        const restore = options.memory().read().then(memory => {
            if (dialogueKey !== key || JSON.stringify(options.current()) !== key) { return; }
            historySummary = memory.summary; summaryReferences = memory.summaryReferences; summaryScope = memory.summaryScope; removedTurns = memory.archivedCount;
            turns = memory.exchanges.flatMap(exchange => {
                const turn: LearningTurn = { id: exchange.id, user: exchange.user, teacher: exchange.reply,
                    references: exchange.references, scope: exchange.scope, purpose: exchange.replyTo ? 'summary-review' : 'talk', status: 'finished', message: '',
                    messages: [{ role: 'assistant', content: exchange.reply }] };
                if (exchange.replyTo) { summaryReviews.set(exchange.replyTo, turn); }
                return exchange.summarized ? [] : [turn];
            });
        });
        loading = restore;
        try { await restore; } catch (error) { if (dialogueKey === key) { dialogueKey = ''; } throw error; }
        finally { if (loading === restore) { loading = null; } }
    }
    function memory(): LearningConversationMemory {
        const retained = [...new Set([...turns, ...summaryReviews.values()])];
        return { summary: historySummary, summaryReferences, summaryScope, archivedCount: removedTurns,
            exchanges: retained.filter(turn => turn.status === 'finished' && turn.teacher.trim()).map(turn => ({
                id: turn.id!, user: isLearningConversation({ kind: turn.purpose ?? 'talk' }) ? turn.user : '',
                reply: turn.teacher, replyTo: [...summaryReviews].find(([, review]) => review === turn)?.[0] ?? null,
                summarized: !turns.includes(turn), references: turn.references ?? [], scope: turn.scope,
            })) };
    }
    async function persist(guard: () => boolean, turn: LearningTurn) {
        try {
            const saved = await options.memory().save(memory(), guard);
            if (guard() && saved.status !== 'confirmed' && saved.status !== 'unchanged') { turn.message = copy.historySaveFailed; turn.notice = 'history-save'; }
        } catch { if (guard()) { turn.message = copy.historySaveFailed; turn.notice = 'history-save'; } }
    }
    return {
        hydrate,
        cancel(lane?: Lane) {
            for (const [key, run] of active) {
                if (lane && key !== lane) { continue; }
                run.controller.abort(); active.delete(key);
                if (run.turn) { settle(run.turn, 'cancelled', copy.stopped); }
            }
            options.onConversation?.();
        },
        reset,
        retryRequest(id: string): TeachingRequest | null {
            return retry?.turn.id === id && canRetry(retry.turn) ? structuredClone(retry.request) : null;
        },
        forgetHistory() {
            reset();
            // An explicit clear retires the local history too. While its receipt is unknown,
            // later work must not reconstruct a save candidate from the pre-clear exchanges.
            dialogueKey = JSON.stringify(options.current());
        },
        async recoverConfirmed() {
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
            const key = dialogueKey;
            await persist(() => key === dialogueKey && key === JSON.stringify(options.current()), recovered.turn);
            options.onConversation?.();
            return { result: recovered.result, request: recovered.request };
        },
        async verifyHistory() {
            const key = dialogueKey;
            const saved = await options.memory().read();
            if (key !== dialogueKey || key !== JSON.stringify(options.current())) { return; }
            for (const turn of turns) {
                if (saved.exchanges.some(exchange => exchange.id === turn.id && exchange.reply === turn.teacher)
                    && turn.notice === 'history-save') { turn.message = ''; delete turn.notice; }
            }
        },
        conversation(): { turns: LearningDialogueView[]; removedTurns: number; summaryReviews: { attemptId: string; text: string }[] } {
            const classroom = options.current();
            const attempts = options.repository.snapshot().document?.data.profiles.find(profile => profile.language === classroom?.language)?.unit?.attempts ?? [];
            for (const id of summaryReviews.keys()) { if (!attempts.some(attempt => attempt.id === id)) { summaryReviews.delete(id); } }
            return dialogueKey === JSON.stringify(options.current())
                ? { turns: structuredClone(turns.map(turn => ({ ...turn, retryable: canRetry(turn),
                    messages: turn.messages.filter(message => message.role === 'assistant' || message.role === 'tool').map(learningMessageView),
                }))), removedTurns, summaryReviews: [...summaryReviews].filter(([, turn]) => turn.status === 'finished')
                    .map(([attemptId, turn]) => ({ attemptId, text: turn.teacher })) }
                : { turns: [], removedTurns: 0, summaryReviews: [] };
        },
        async run(input: TeachingRequest, retryId?: string): Promise<LearningTeachingResult> {
            const conversation = isLearningConversation(input.action);
            requireLearning(options.actor === 'workbench' || conversation, 'action', 'The companion can request workbench operations, not perform teaching tasks');
            await hydrate();
            const preparationTool = learningPreparationTool(input.action);
            const lane = conversation ? 'conversation' : preparationTool ? 'preparation' : 'work';
            if (active.has(lane)) { return { status: 'busy' }; }
            const previous = retryId && retry?.turn.id === retryId && canRetry(retry.turn) ? retry.turn : null;
            if (retryId && !previous) { return { status: 'cancelled' }; }
            const classroom = structuredClone(options.current());
            if (!classroom?.chatIdentity || !classroom.osId) { return { status: 'cancelled' }; }
            const key = JSON.stringify(classroom);
            if (key !== dialogueKey) { reset(); dialogueKey = key; }
            const controller = new AbortController();
            const running = { controller, turn: null as LearningTurn | null };
            active.set(lane, running);
            const materialAtStart = materialKey();
            const guard = () => (!conversation || materialAtStart === materialKey()) && active.get(lane) === running && !controller.signal.aborted && JSON.stringify(options.current()) === key;
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
                return { status: 'failed', reason, message, displayed: !!visible };
            };
            try {
                advance(progress);
                const request = structuredClone(input);
                learningText(request.message, 'message', 4000, request.action.kind === 'companion');
                const storage = options.repository.snapshot();
                if (!conversation && (storage.status === 'unconfirmed' || storage.status === 'conflict')) { return { status: storage.status }; }
                if (!conversation && storage.status === 'unloaded') { return failure('learning_read_failed'); }
                let baseline = conversation ? storage.document ?? null : confirmedLearning(options.repository);
                visible = { id: previous?.id ?? (options.createId ?? createLearningId)(), references: [], scope: { kind: 'story', osId: classroom.osId },
                    user: request.displayMessage ?? request.message, teacher: '', status: 'running', message: '', messages: [], purpose: request.action.kind, progress };
                if (request.action.kind === 'summary-review') { summaryReviews.set(request.action.attemptId, visible); }
                const remark = request.action.kind === 'companion';
                publication = createLearningPublication(visible.messages, { transactional: !conversation && request.action.kind !== 'summary-review', current: guard });
                controller.signal.addEventListener('abort', publication.discard, { once: true });
                running.turn = visible;
                let compactedCount = 0;
                if (previous) { turns.splice(turns.indexOf(previous), 1, visible); } else { turns.push(visible); }
                if (conversation) { retry = request.action.kind === 'talk' ? { turn: visible, request, material: materialAtStart } : null; }
                options.onConversation?.();
                const context = options.actor === 'companion' ? await options.capture(classroom.teacher!.name, classroom.chatIdentity) : null;
                if (!guard()) { return { status: 'cancelled' }; }
                const asOf = options.now?.() ?? new Date().toISOString();
                const background = context ? createLearningBackground(context) : null;
                advance({ stage: 'config' });
                const config = await options.gateway.loadConfig();
                if (!guard()) { return { status: 'cancelled' }; }
                advance({ stage: 'session' });
                const agent = await options.gateway.openSession(config);
                if (!guard()) { return { status: 'cancelled' }; }
                if (conversation) { baseline = options.repository.snapshot().document ?? null; }
                if (preparationTool && input.action.kind !== 'reading-article') { baseline = confirmedLearning(options.repository); }
                if (!conversation && !sameLearningDocument(baseline, confirmedLearning(options.repository))) {
                    settle(visible, 'conflict', copy.changed);
                    return { status: 'conflict' };
                }
                const research = createLearningResearch(config, { sources, cache, signal: controller.signal, createId: options.createId, now: options.now });
                const profile = baseline?.data.profiles.find(entry => entry.language === classroom.language);
                const sourceUnit = profile?.[learningReadUnit(request.action, profile)];
                const newMaterial = request.action.kind === 'reading-article' || request.action.kind === 'prepare' && (!sourceUnit || request.action.replaceCurrent === true);
                const inputScope = options.actor === 'companion' ? { kind: 'story' as const, osId: classroom.osId }
                    : conversation ? { kind: 'public' as const }
                    : request.action.kind === 'review-prepare' ? learningReviewScope(profile, request.action.itemIds, classroom.osId)
                        : !newMaterial && sourceUnit ? sourceUnit.scope : { kind: 'public' as const };
                const accessOsId = learningAccessOsId(request.action, inputScope, classroom.osId);
                const scopes = learningReferenceScopes(baseline?.data);
                const allowedHistory = (scope: LearningScope) => conversation || canReadLearningScope(scope, inputScope.kind === 'story' ? inputScope.osId : null);
                const history = preparationTool ? [] : turns.filter(turn => turn.status !== 'running' && allowedHistory(turn.scope));
                let summaryAtStart = allowedHistory(summaryScope) ? historySummary : '';
                visible.references = [...new Set([newMaterial || !sourceUnit || !canReadLearningScope(sourceUnit.scope, accessOsId) ? undefined : sourceUnit.id, request.exerciseId,
                    ...('attemptId' in request.action ? [request.action.attemptId] : [])].filter((id): id is string => !!id))];
                draft = createLearningSession(options.repository, { ...classroom, action: request.action,
                    inputScope, sources, learnerMessage: request.message,
                    createId: options.createId, now: options.now, asOf, canDelegate: options.canDelegate });
                const { prefix, messages, turn, references, taskReferences } = buildLearningContext({ ...classroom, ...request, osId: accessOsId, actor: options.actor, context, asOf,
                    data: baseline?.data ?? { profiles: [] } });
                visible.scope = learningConversationScope(references, scopes, inputScope);
                visible.scope = history.reduce((scope, turn) => combineLearningScope(scope, turn.scope), visible.scope);
                if (summaryAtStart) { visible.scope = combineLearningScope(visible.scope, summaryScope); }
                if (conversation) { visible.references = [...new Set([...visible.references!, ...references, ...summaryReferences, ...history.flatMap(turn => turn.references ?? [])])]; }
                else { visible.references = [...new Set([...visible.references!, ...taskReferences])]; }
                visible.messages.push(turn);
                const session = draft;
                const outcome = await runLearningProviderLoop({ agent, systemPrompt: buildLearningSystemPrompt(options.actor, classroom.teacher?.name ?? '', request.action), prefix, messages,
                    summaryPrompt: learningHistoryPrompt(options.actor), history, historySummary: summaryAtStart, reopen: () => options.gateway.openSession(config),
                    onCompact: (count, summary) => {
                        const compacted = history.slice(compactedCount, compactedCount + count);
                        // Another lane may have already compacted this prefix. Never remove its running turn
                        // or replace a newer summary with one produced from an older history snapshot.
                        if (summaryAtStart === historySummary && compacted.every((turn, index) => turns[index] === turn)) {
                            summaryReferences = [...new Set([...summaryReferences, ...compacted.flatMap(turn => turn.references ?? [])])];
                            summaryScope = compacted.reduce((scope, turn) => combineLearningScope(scope, turn.scope), summaryScope);
                            turns.splice(0, count); removedTurns += count; historySummary = summary; summaryAtStart = summary;
                            options.onConversation?.();
                        }
                        compactedCount += count;
                    },
                    // Research is for choosing lesson material; stage purposes work on the saved unit.
                    tools: [...learningTools(request.action), ...(background ? [learningBackgroundTool] : []),
                        ...(research.available && (request.action.kind === 'prepare' || request.action.kind === 'reading-article' && request.action.source === 'web') ? learningResearchTools() : [])],
                    signal: controller.signal, guard, onProgress: advance,
                    allowSilence: remark,
                    completeOnTool: preparationTool ? (name, result) => name === preparationTool && (result as { ok?: boolean }).ok === true : undefined,
                    onResponseStart: publication.begin, onResponseComplete: publication.complete,
                    transcript: visible.messages, onMessages: options.onConversation,
                    executeTool: async (name, args) => {
                        if (name === 'LearningSearch' || name === 'LearningExtract') { return research.executeTool(name, args); }
                        if (name === 'LearningContextRead') { return background!.execute(args); }
                        const result = session.executeTool(name, args);
                        if (name === 'LearningRead') {
                            const readReferences = learningReferencedIds(result, scopes, accessOsId);
                            visible!.references = [...new Set([...visible!.references!, ...readReferences])];
                            visible!.scope = learningConversationScope(readReferences, scopes, visible!.scope);
                        }
                        const mutation = result as { ok?: boolean; changed?: boolean };
                        if ((name === 'LearningLessonEdit' || name === preparationTool) && mutation.ok && mutation.changed) {
                            publication!.discard();
                        }
                        if (name !== 'LearningProfileEdit' && mutation.ok && result && typeof result === 'object' && 'ids' in result && Array.isArray(result.ids)) {
                            visible!.references = [...new Set([...visible!.references!, ...result.ids.filter((id): id is string => typeof id === 'string')])];
                        }
                        if (name === 'LearningRead' && args && typeof args === 'object' && 'id' in args && typeof args.id === 'string') { visible!.references!.push(args.id); }
                        return result;
                    } });
                if (outcome.status === 'cancelled') { return outcome; }
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
                const commitId = 'commitId' in saved ? saved.commitId : undefined;
                if (commitId && guard() && (saved.status === 'unconfirmed' || saved.status === 'conflict')) {
                    awaitingSave = { commitId, turn: visible, presentation: presentation ?? undefined, result, request, publication };
                }
                if (!guard()) { return { status: 'cancelled' }; }
                if (saved.status !== 'confirmed' && saved.status !== 'unchanged') {
                    settle(visible, saved.status, saved.status === 'unconfirmed' ? copy.learningSaveUnconfirmed
                        : saved.status === 'conflict' ? copy.learningSaveConflict : copy.workStopped);
                    visible.notice = 'learning-save';
                    return { status: saved.status };
                }
                visible.presentation = presentation ?? undefined;
                publication.confirmSave();
                visible.teacher = learningReplyText(visible.messages);
                result.text = visible.teacher;
                settle(visible, 'finished');
                if (visible.teacher.trim()) { await persist(guard, visible); }
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
                if (visible?.status === 'running') { settle(visible, 'cancelled', conversation ? copy.stopped : copy.workStopped); }
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
