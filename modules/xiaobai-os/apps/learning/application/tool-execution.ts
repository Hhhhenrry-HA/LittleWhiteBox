import { learningRecord, learningText, LearningValidationError } from '../../../domains/learning/profile.js';
import { learningId, requireLearning } from '../../../domains/learning/validation.js';
import { LEARNING_LIMITS } from '../../../domains/learning/types.js';
import type { LearningAction, createLearningSession } from '../agent/session.js';
import type { LearningActor } from '../domain/conversation.js';
import { createLearningService, type LearningRepository } from './service.js';
import type { LearningAttemptBasis } from './attempt.js';
import type { LearningWorkRequest } from './delegation.js';
import type { LearningSelection } from '../../../domains/learning/notes.js';
import type { LearningSaveConfirmation } from '../storage/repository.js';

/** Confirmed submissions belong to one learner message, including its handoffs and retries. */
export type LearningSubmissionReceipts = Map<string, { attemptId?: string; unitId?: string }>;

const unsavedEdit = () => ({ ok: false, status: 'cancelled', changed: false, ids: [], errors: [{ path: 'storage',
    message: 'This edit was not saved. Read the current learning records before trying the change again.' }] });

/** The same tool call owns approval, execution and its confirmed save receipt. */
export function createLearningToolExecution(options: {
    repository: LearningRepository; session: ReturnType<typeof createLearningSession>;
    actor: LearningActor; action: LearningAction; language: string; osId: string;
    message: string; answerBasis: LearningAttemptBasis; exerciseId?: string;
    submissions: LearningSubmissionReceipts;
    selection?: LearningSelection | null;
    signal: AbortSignal; guard: () => boolean;
    confirm?: (unit: { id: string; title: string }, signal: AbortSignal) => Promise<boolean>;
    delegate?: (request: LearningWorkRequest, signal: AbortSignal) => Promise<unknown>;
    onSaved: (result: Awaited<ReturnType<LearningRepository['save']>>) => void;
}) {
    const { repository, session, guard } = options;
    const confirmed: LearningSaveConfirmation = options.onSaved;
    const unresolved = (result: Awaited<ReturnType<LearningRepository['save']>>) => {
        if (result.status !== 'confirmed' && result.status !== 'unchanged') { options.onSaved(result); }
    };
    const profile = () => repository.snapshot().document?.data.profiles.find(entry => entry.language === options.language);
    async function approve(unit: { id: string; title: string }) {
        requireLearning(options.confirm, 'approval', 'Learner confirmation is unavailable in this session');
        const accepted = await options.confirm(unit, options.signal);
        if (!guard() || !accepted) { return false; }
        const current = profile();
        requireLearning([current?.unit, current?.review].some(entry => entry?.id === unit.id), 'unitId', 'The selected lesson changed while awaiting confirmation');
        session.authorizeReplacement(unit.id);
        return true;
    }
    return async (name: string, args: unknown): Promise<unknown> => {
        try {
            if (!guard()) { return { ok: false, status: 'cancelled' }; }
            requireLearning(session.toolNames.includes(name), 'tool', 'Select an available tool');
            if (name === 'LearningRequest') {
                learningRecord(args, name, []);
                requireLearning(options.actor === 'companion' && options.delegate, 'tool', 'Select an available tool');
                return options.delegate({ message: options.message, exerciseId: options.exerciseId,
                    selection: options.selection,
                    ...(options.action.kind === 'talk' ? { unitId: options.action.unitId } : {}), answerBasis: options.answerBasis, submissions: options.submissions }, options.signal);
            }
            session.refresh();
            if (name === 'LearningSubmit') {
                const input = learningRecord(args, name, ['unitId', 'exerciseId', 'text', 'revisesAttemptId']);
                const text = input.text === undefined ? options.message : learningText(input.text, 'text', LEARNING_LIMITS.answer);
                requireLearning(text.length > 0 && options.message.includes(text), 'text', 'Submit the learner’s own text from this message');
                const unitId = learningId(input.unitId, 'unitId');
                const exerciseId = learningId(input.exerciseId, 'exerciseId');
                const receiptKey = JSON.stringify([unitId, exerciseId, input.revisesAttemptId ?? null, text]);
                const receipt = options.submissions.get(receiptKey);
                if (receipt) { session.recordAppliedTool(name); return { ok: true, status: 'unchanged', ...receipt }; }
                const unit = [profile()?.unit, profile()?.review].find(entry => entry?.id === unitId);
                requireLearning(unit && unit.exercises.some(entry => entry.id === exerciseId && entry.response.kind === 'text'), 'exerciseId', 'Select a published text question');
                if (input.revisesAttemptId !== undefined) {
                    const attemptId = learningId(input.revisesAttemptId, 'revisesAttemptId');
                    requireLearning(unit.attempts.some(entry => entry.id === attemptId && entry.exerciseId === exerciseId), 'revisesAttemptId', 'Select an answer to this question');
                    const service = createLearningService(repository, { onConfirmed: saved => {
                        options.submissions.set(receiptKey, { unitId }); confirmed(saved);
                    } });
                    const result = await service.submitRevision(options.language, unitId, [{ attemptId, text }], guard, options.answerBasis);
                    unresolved(result);
                    if (result.status === 'cancelled') { return unsavedEdit(); }
                    if (result.status === 'confirmed' || result.status === 'unchanged') { session.refresh(); session.recordAppliedTool(name); }
                    return { ok: result.status === 'confirmed' || result.status === 'unchanged', status: result.status, unitId };
                }
                const service = createLearningService(repository, { onConfirmed: saved => {
                    options.submissions.set(receiptKey, { attemptId: submitted.attemptId }); confirmed(saved);
                } });
                const submitted = service.prepareAttempt({ language: options.language, unitId, exerciseId, answer: { kind: 'text', text },
                    scope: unit.scope, osId: options.osId, replays: 0, slowPlayback: false }, options.answerBasis);
                const result = await submitted.save(guard);
                unresolved(result);
                if (result.status === 'cancelled') { return unsavedEdit(); }
                if (result.status === 'confirmed' || result.status === 'unchanged') { session.refresh(); session.recordAppliedTool(name); }
                return { ok: result.status === 'confirmed' || result.status === 'unchanged', status: result.status, attemptId: submitted.attemptId };
            }
            type Result = { ok?: boolean; changed?: boolean; approval?: { id: string; title: string } };
            let result = session.executeTool(name, args) as Result;
            while (result.approval) {
                if (!await approve(result.approval)) {
                    return { ok: true, status: 'declined', changed: false, ids: [] };
                }
                if (!guard()) { return { ok: false, status: 'cancelled' }; }
                session.refresh();
                result = session.executeTool(name, args) as Result;
            }
            if (!result.ok || !result.changed) { return result; }
            const saved = await session.checkpoint(guard, confirmed);
            unresolved(saved);
            if (saved.status === 'cancelled') { return unsavedEdit(); }
            return { ...result, ok: saved.status === 'confirmed' || saved.status === 'unchanged', status: saved.status };
        } catch (error) {
            if (!(error instanceof LearningValidationError)) { throw error; }
            return { ok: false, changed: false, ids: [], errors: [{ path: error.path, message: error.message }] };
        }
    };
}
