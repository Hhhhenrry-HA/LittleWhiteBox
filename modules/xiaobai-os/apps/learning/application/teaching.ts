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
import { learningRetryMessage, type LearningTurn } from '../agent/history.js';
import { learningReplyText } from '../agent/messages.js';
import { buildLearningSystemPrompt } from '../agent/prompt.js';
import { runLearningProviderLoop } from '../agent/provider-loop.js';
import { learningResearchTools } from '../agent/research-tools.js';
import { createLearningSession, type LearningAction } from '../agent/session.js';
import { learningTools } from '../agent/tool-contract.js';
import { createLearningSourceRegistry } from '../materials/lesson-sources.js';
import { createLearningResearch, createLearningResearchCache } from '../materials/research.js';
import { LearningStorageError } from '../storage/repository.js';
import { sameLearningDocument, type LearningDocument } from '../storage/document.js';
import { confirmedLearning, type LearningRepository } from './service.js';
import { reportLearningFailure, type LearningFailureDetails, type LearningProgress } from './feedback.js';
import { learningMessageView, type LearningDialogueView } from './message-view.js';
import { createLearningPublication } from './publication.js';
import { isLearningConversation, isLearningPreparation, learningAccessOsId, learningReadUnit, learningReviewScope } from '../agent/access.js';
import type { LearningWorkRequest } from './delegation.js';
import type { LearningAttemptBasis } from './attempt.js';
import { createLearningToolExecution, type LearningSubmissionReceipts } from './tool-execution.js';

export interface LearningClassroom {
    language: string; osId: string; chatIdentity: string;
    teacher: LearningTeacherPreference['teacher'];
    sessionId?: string;
}
export type LearningTeachingResult =
    | { status: 'finished'; text: string; changed: boolean; appliedTools: string[] }
    | { status: 'unconfirmed' | 'conflict' | 'cancelled' | 'busy' }
    | { status: 'failed'; reason: string; message: string; displayed: boolean };
interface TeachingRequest {
    action: LearningAction; message: string; exerciseId?: string; displayMessage?: string; selection?: LearningSelection | null;
    answerBasis?: LearningAttemptBasis;
    submissions?: LearningSubmissionReceipts;
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
    onSettled?: (current: () => boolean) => Promise<void>;
    confirm?: (unit: { id: string; title: string }, signal: AbortSignal) => Promise<boolean>;
    delegate?: (request: LearningWorkRequest, signal: AbortSignal, onSaved: (document: LearningDocument | null) => void) => Promise<unknown>;
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
    const materialKey = (document: LearningDocument | null | undefined = options.repository.snapshot().document) => {
        const profile = document?.data.profiles.find(profile => profile.language === options.current()?.language);
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
                id: turn.id!, user: turn.user,
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
            return retry?.turn.id === id && canRetry(retry.turn) ? { ...structuredClone(retry.request), submissions: retry.request.submissions } : null;
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
        async run(input: TeachingRequest, retryId?: string, onSaved?: (document: LearningDocument | null) => void): Promise<LearningTeachingResult> {
            const conversation = isLearningConversation(input.action);
            requireLearning(options.actor === 'workbench' || conversation, 'action', 'The companion can request workbench operations, not perform teaching tasks');
            await hydrate();
            const preparationTask = isLearningPreparation(input.action);
            const lane = conversation ? 'conversation' : preparationTask ? 'preparation' : 'work';
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
            let materialAtStart = materialKey();
            const guard = () => active.get(lane) === running && !controller.signal.aborted && JSON.stringify(options.current()) === key
                && (options.actor === 'workbench' || materialAtStart === materialKey());
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
                const request = { ...structuredClone(input), submissions: input.submissions ?? new Map() };
                learningText(request.message, 'message', 4000, request.action.kind === 'companion');
                const storage = options.repository.snapshot();
                if (!conversation && (storage.status === 'unconfirmed' || storage.status === 'conflict')) { return { status: storage.status }; }
                if (!conversation && storage.status === 'unloaded') { return failure('learning_read_failed'); }
                let baseline = conversation ? storage.document ?? null : confirmedLearning(options.repository);
                visible = { id: previous?.id ?? (options.createId ?? createLearningId)(), references: [], scope: { kind: 'story', osId: classroom.osId },
                    user: request.displayMessage ?? request.message, teacher: '', status: 'running', message: '', messages: structuredClone(previous?.messages ?? []), purpose: request.action.kind, progress };
                if (request.action.kind === 'summary-review') { summaryReviews.set(request.action.attemptId, visible); }
                const remark = request.action.kind === 'companion';
                publication = createLearningPublication(visible.messages, { transactional: options.actor === 'workbench', current: guard });
                controller.signal.addEventListener('abort', publication.discard, { once: true });
                running.turn = visible;
                let compactedCount = 0;
                if (previous) { turns.splice(turns.indexOf(previous), 1, visible); } else { turns.push(visible); }
                if (conversation) { retry = request.action.kind === 'talk' ? { turn: visible, request, material: materialAtStart } : null; }
                options.onConversation?.();
                const context = options.actor === 'companion' ? await options.capture(classroom.teacher!.name, classroom.chatIdentity) : null;
                if (!guard()) { return { status: 'cancelled' }; }
                const asOf = options.now?.() ?? new Date().toISOString();
                request.answerBasis ??= { document: baseline, submittedAt: asOf };
                const background = context ? createLearningBackground(context) : null;
                advance({ stage: 'config' });
                const config = await options.gateway.loadConfig();
                if (!guard()) { return { status: 'cancelled' }; }
                advance({ stage: 'session' });
                const agent = await options.gateway.openSession(config);
                if (!guard()) { return { status: 'cancelled' }; }
                if (conversation) { baseline = options.repository.snapshot().document ?? null; }
                if (!conversation && !sameLearningDocument(baseline, confirmedLearning(options.repository))) {
                    settle(visible, 'conflict', copy.changed);
                    return { status: 'conflict' };
                }
                const research = createLearningResearch(config, { sources, cache, signal: controller.signal, createId: options.createId, now: options.now });
                const profile = baseline?.data.profiles.find(entry => entry.language === classroom.language);
                const requestData = request.answerBasis.document?.data ?? { profiles: [] };
                const unitKey = learningReadUnit(request.action, requestData.profiles.find(entry => entry.language === classroom.language));
                const sourceUnit = profile?.[unitKey];
                const newMaterial = request.action.kind === 'prepare' && (!sourceUnit || request.action.replaceCurrent === true);
                const inputScope = options.actor === 'companion' ? { kind: 'story' as const, osId: classroom.osId }
                    : conversation ? { kind: 'public' as const }
                    : request.action.kind === 'review-prepare' ? learningReviewScope(profile, request.action.itemIds, classroom.osId)
                        : !newMaterial && sourceUnit ? sourceUnit.scope : { kind: 'public' as const };
                const accessOsId = learningAccessOsId(request.action, inputScope, classroom.osId);
                const allowedHistory = (scope: LearningScope) => conversation || canReadLearningScope(scope, inputScope.kind === 'story' ? inputScope.osId : null);
                const history = turns.filter(turn => turn.status !== 'running' && allowedHistory(turn.scope));
                let summaryAtStart = allowedHistory(summaryScope) ? historySummary : '';
                visible.references = [...new Set([newMaterial || !sourceUnit || !canReadLearningScope(sourceUnit.scope, accessOsId) ? undefined : sourceUnit.id, request.exerciseId,
                    ...('attemptId' in request.action ? [request.action.attemptId] : [])].filter((id): id is string => !!id))];
                const { prefix, messages, turn, references, taskReferences, scope } = buildLearningContext({ ...classroom, ...request, requestData, osId: accessOsId, actor: options.actor, context, asOf,
                    data: baseline?.data ?? { profiles: [] } });
                visible.scope = combineLearningScope(inputScope, scope);
                if (previous) {
                    visible.scope = combineLearningScope(visible.scope, previous.scope);
                    visible.references = [...new Set([...visible.references!, ...previous.references ?? []])];
                }
                visible.scope = history.reduce((scope, turn) => combineLearningScope(scope, turn.scope), visible.scope);
                if (summaryAtStart) { visible.scope = combineLearningScope(visible.scope, summaryScope); }
                draft = createLearningSession(options.repository, { ...classroom, action: request.action,
                    inputScope: visible.scope, sources, unitKey,
                    createId: options.createId, now: options.now, asOf, actor: options.actor });
                if (conversation) { visible.references = [...new Set([...visible.references!, ...references, ...summaryReferences, ...history.flatMap(turn => turn.references ?? [])])]; }
                else { visible.references = [...new Set([...visible.references!, ...taskReferences])]; }
                visible.messages.push(turn);
                const session = draft;
                let changed = false;
                let interruptedSave: Awaited<ReturnType<LearningRepository['save']>> | null = null;
                const execute = createLearningToolExecution({ repository: options.repository, session, actor: options.actor, action: request.action,
                    language: classroom.language, osId: classroom.osId, message: request.message, exerciseId: request.exerciseId, selection: request.selection,
                    answerBasis: request.answerBasis, submissions: request.submissions, signal: controller.signal, guard,
                    confirm: options.confirm, delegate: options.delegate ? async (work, signal) => {
                        return options.delegate!(work, signal, document => {
                            // Only this handoff's confirmed save can advance its material identity.
                            if (JSON.stringify(options.current()) === key && retry?.turn === visible) {
                                materialAtStart = materialKey(document); retry.material = materialAtStart;
                            }
                        });
                    } : undefined,
                    onSaved: saved => {
                        if (saved.status === 'confirmed' || saved.status === 'unchanged') {
                            interruptedSave = null;
                            if (retry?.turn === visible) { retry.material = materialKey(saved.document); }
                            onSaved?.(saved.document);
                            changed ||= saved.status === 'confirmed';
                            options.onConversation?.();
                        } else if (saved.status === 'unconfirmed' || saved.status === 'conflict') { interruptedSave = saved; }
                    } });
                const outcome = await runLearningProviderLoop({ agent, systemPrompt: buildLearningSystemPrompt(options.actor, classroom.teacher?.name ?? '', request.action), prefix,
                    messages: previous ? [...messages, learningRetryMessage(previous)] : messages,
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
                    tools: [...learningTools(request.action, options.actor), ...(background ? [learningBackgroundTool] : []),
                        ...(research.available && options.actor === 'workbench' ? learningResearchTools() : [])],
                    signal: controller.signal, guard, onProgress: advance,
                    allowSilence: remark,
                    onResponseStart: publication.begin, onResponseComplete: (message, toolsSucceeded) => {
                        publication!.complete(message, toolsSucceeded);
                        if (message.toolCalls?.length && !interruptedSave) { publication!.confirmSave(); }
                    },
                    transcript: visible.messages, onMessages: options.onConversation,
                    executeTool: async (name, args) => {
                        if (name === 'LearningSearch' || name === 'LearningExtract') { return research.executeTool(name, args); }
                        if (name === 'LearningContextRead') { return background!.execute(args); }
                        if (interruptedSave) { return { ok: false, status: interruptedSave.status }; }
                        const result = await execute(name, args);
                        if (name === 'LearningRead') {
                            const reading = session.reading();
                            visible!.references = [...new Set([...visible!.references!, ...reading.references])];
                            visible!.scope = reading.scope;
                        }
                        const mutation = result as { ok?: boolean; changed?: boolean };
                        if (name !== 'LearningProfileEdit' && mutation.ok && result && typeof result === 'object' && 'ids' in result && Array.isArray(result.ids)) {
                            visible!.references = [...new Set([...visible!.references!, ...result.ids.filter((id): id is string => typeof id === 'string')])];
                        }
                        if (name === 'LearningRead' && args && typeof args === 'object' && 'id' in args && typeof args.id === 'string') { visible!.references!.push(args.id); }
                        return result;
                    } });
                if (outcome.status === 'cancelled') { return outcome; }
                if (interruptedSave) {
                    const saved = interruptedSave as Awaited<ReturnType<LearningRepository['save']>>;
                    publication.discard();
                    settle(visible, saved.status === 'conflict' ? 'conflict' : saved.status === 'unconfirmed' ? 'unconfirmed' : 'cancelled', copy.learningSaveUnconfirmed);
                    visible.notice = 'learning-save';
                    if ('commitId' in saved && saved.commitId) {
                        // Verification acknowledges this exact receipt, not completion of the interrupted task.
                        awaitingSave = { commitId: saved.commitId, turn: visible, presentation: undefined, request, publication,
                            result: { status: 'finished', text: '', changed: true, appliedTools: session.appliedTools() } };
                        visible.messages.push({ role: 'assistant', content: copy.learningSaveRecovered, contentVisibility: 'pending-save' });
                    }
                    return { status: saved.status as 'unconfirmed' | 'conflict' | 'cancelled' };
                }
                if (outcome.status === 'failed') { return failure(outcome.reason, outcome.details); }
                const appliedTools = session.appliedTools();
                visible.teacher = learningReplyText(visible.messages);
                options.onConversation?.();
                advance({ stage: 'save' });
                const saved = await session.commit(guard);
                const presentation = session.presentation();
                const result = { status: 'finished' as const, text: visible.teacher, changed: changed || saved.status !== 'unchanged', appliedTools };
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
                try {
                    // Saved facts survive cancellation or provider failure. A changed classroom does not.
                    if (options.actor === 'workbench') { await options.onSettled?.(() => JSON.stringify(options.current()) === key); }
                } finally {
                    if (active.get(lane) === running) { active.delete(lane); }
                    options.onConversation?.();
                }
            }
        },
    };
}
