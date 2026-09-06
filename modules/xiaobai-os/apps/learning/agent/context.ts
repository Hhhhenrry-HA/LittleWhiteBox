import { safePromptJson } from '../../../capabilities/maintenance/prompt-safety.js';
import { canReadLearningScope, type LearningData } from '../../../domains/learning/types.js';
import { requireLearning } from '../../../domains/learning/validation.js';
import type { LearningTeacherPreference } from '../../../domains/learning/profile.js';
import type { PromptContextSnapshot } from '../../../host/prompt-context/types.js';
import { buildLearningDataMessage, readLearning } from './data-projection.js';
import type { LearningAction } from './session.js';
import { MAX_LEARNING_CONTEXT } from './provider-loop.js';

export interface LearningDialogue { user: string; teacher: string }
export interface LearningTeacherContext { snapshot: PromptContextSnapshot; teacherDetails: string }
export const LEARNING_DIALOGUE_LIMITS = Object.freeze({ rounds: 8, characters: 8000 });

export function retainLearningDialogue(rounds: readonly LearningDialogue[]): LearningDialogue[] {
    const retained: LearningDialogue[] = [];
    let size = 0;
    for (const round of rounds.slice(-LEARNING_DIALOGUE_LIMITS.rounds).reverse()) {
        const length = [...safePromptJson(round)].length;
        if (size + length > LEARNING_DIALOGUE_LIMITS.characters) { break; }
        retained.unshift({ ...round });
        size += length;
    }
    return retained;
}

function focus(data: LearningData, language: string, osId: string, action: LearningAction, exerciseId?: string) {
    const profile = data.profiles.find(entry => entry.language === language);
    const unit = profile?.unit && canReadLearningScope(profile.unit.scope, osId) ? profile.unit : null;
    if (action.kind === 'assess') {
        const attempt = unit?.attempts.find(entry => entry.id === action.attemptId);
        const archived = action.review ? profile?.items.flatMap(item => item.evidence).find(entry => entry.attempt.id === action.attemptId) : null;
        const target = attempt && unit ? {
            unitId: unit.id, exercise: unit.exercises.find(entry => entry.id === attempt.exerciseId)!,
            attempt, assessment: unit.assessments.find(entry => entry.attemptId === attempt.id) ?? null,
            materials: unit.materials.filter(material => unit.exercises.find(entry => entry.id === attempt.exerciseId)!.materialIds.includes(material.id)),
        } : archived;
        requireLearning(target && canReadLearningScope(target.attempt.scope, osId)
            && (!target.assessment || canReadLearningScope(target.assessment.scope, osId)), 'attemptId', 'Select an available saved answer');
        // Focused questions and submitted answers are complete or the request is stopped before calling a model.
        const { scope: _attemptScope, ...answer } = target.attempt;
        const feedback = target.assessment;
        return { unitId: target.unitId, exercise: target.exercise, materials: target.materials,
            attempt: answer, assessment: feedback ? { attemptId: feedback.attemptId, verdict: feedback.verdict,
                understanding: feedback.understanding, expression: feedback.expression, guidance: feedback.guidance } : null };
    }
    if (exerciseId) {
        const exercise = unit?.exercises.find(entry => entry.id === exerciseId);
        requireLearning(unit && exercise, 'exerciseId', 'Select an available exercise');
        return { unitId: unit.id, exercise, materials: unit.materials.filter(material => exercise.materialIds.includes(material.id)) };
    }
    return null;
}

export function buildLearningContext(options: {
    data: LearningData; language: string; osId: string; teacher: NonNullable<LearningTeacherPreference['teacher']>;
    context: LearningTeacherContext; action: LearningAction; message: string; exerciseId?: string; dialogue: readonly LearningDialogue[];
}) {
    const { data, language, osId, action, context } = options;
    const messages: { role: 'user'; content: string }[] = [];
    const add = (tag: string, value: unknown) => messages.push({ role: 'user', content: `<${tag}>\n${safePromptJson(value)}\n</${tag}>` });
    const job = { kind: action.kind, ...(action.kind === 'assess' ? { attemptId: action.attemptId, review: action.review } : {}) };
    add('learning_request', { language, teacher: options.teacher, action: job, message: options.message,
        profile: readLearning(data, language, osId, {}).data,
        focus: focus(data, language, osId, action, options.exerciseId) });
    const fits = (extra = '') => [...safePromptJson([...messages, { role: 'user', content: extra }])].length <= MAX_LEARNING_CONTEXT - 1000;
    requireLearning(fits(), 'context', 'The current question and answer exceed the request budget; their saved text is unchanged');
    const omitted: string[] = [];
    // Keep the same teacher/story context for research, teaching and feedback. Optional background yields to the actual answer.
    let storySize = 0;
    for (const [section, value] of Object.entries({ teacherDetails: context.teacherDetails,
        player: context.snapshot.player, characters: context.snapshot.characters,
        storyEvents: context.snapshot.storyEvents, recentMessages: context.snapshot.recentMessages,
        worldInfo: context.snapshot.worldInfo })) {
        const content = `<teacher_background>\n${safePromptJson({ [section]: value })}\n</teacher_background>`;
        if (storySize + [...content].length <= 8000 && fits(content)) {
            messages.push({ role: 'user', content }); storySize += [...content].length;
        } else { omitted.push(`teacher_background.${section}`); }
    }
    const state = buildLearningDataMessage(data, language, osId);
    // Reserve room for at least one tool result; overview and focus are already present.
    if ([...state].length <= 16_000 && fits(state)) { messages.push({ role: 'user', content: state }); }
    else { omitted.push('learning_state: LearningRead supplies materials, exercises, attempts, items and completions'); }
    const dialogue: LearningDialogue[] = [];
    for (const round of retainLearningDialogue(options.dialogue).reverse()) {
        const candidate = `<learning_dialogue>\n${safePromptJson([round, ...dialogue])}\n</learning_dialogue>`;
        if (!fits(candidate)) { break; }
        dialogue.unshift(round);
    }
    if (dialogue.length) { add('learning_dialogue', dialogue); }
    if (dialogue.length < options.dialogue.length) { omitted.push('earlier_classroom_dialogue'); }
    if (omitted.length) { add('omitted_context', omitted); }
    requireLearning([...safePromptJson(messages)].length <= MAX_LEARNING_CONTEXT, 'context', 'The teaching context exceeds this request budget');
    return messages;
}
