import { safePromptJson } from '../../../capabilities/maintenance/prompt-safety.js';
import { canReadLearningScope, LEARNING_LIMITS as L, type LearningAssessment, type LearningAttempt, type LearningData, type LearningUnit } from '../../../domains/learning/types.js';
import { learningAnswerParagraphs } from '../../../domains/learning/facts.js';
import { requireLearning } from '../../../domains/learning/validation.js';
import type { LearningTeacherPreference } from '../../../domains/learning/profile.js';
import type { PromptContextSnapshot } from '../../../host/prompt-context/types.js';
import { readLearning } from './data-projection.js';
import type { LearningAction } from './session.js';
import { createLearningBackground } from './background.js';
import type { LearningPresentation } from '../application/presentation.js';
import type { LearningProgress } from '../application/feedback.js';
import type { LearningMessage } from './messages.js';
import { learningExerciseView, learningTrainingView } from '../application/projection.js';
import { learningReadAudience, learningReadUnit } from './access.js';
import { learningUnitStage, type LearningExerciseStatus } from '../../../domains/learning/stage.js';

export interface LearningDialogue {
    user: string; teacher: string; presentation?: LearningPresentation;
    /** The request purpose; a companion remark has no learner message of its own. */
    purpose?: LearningAction['kind'];
    messages: LearningMessage[];
    /** Live execution metadata, scoped to this run and never stored as learning data. */
    progress?: LearningProgress;
    status: 'running' | 'finished' | 'failed' | 'cancelled' | 'unconfirmed' | 'conflict';
    message: string;
}
export interface LearningTeacherContext { snapshot: PromptContextSnapshot; teacherDetails: string }
// Scope is an access fact for the Host; the model sees the answer, its conditions and numbered paragraphs.
function answerView(attempt: LearningAttempt) {
    const { scope: _scope, ...answer } = attempt;
    return answer.answer.kind === 'text' ? { ...answer, paragraphs: learningAnswerParagraphs(answer.answer.text) } : answer;
}
function feedbackView(assessment: LearningAssessment | undefined) {
    if (!assessment) { return null; }
    const { scope: _scope, ...feedback } = assessment;
    return feedback;
}
function readableUnit(unit: LearningUnit | null | undefined, osId: string, unitId: string) {
    requireLearning(unit && unit.id === unitId && canReadLearningScope(unit.scope, osId), 'unitId', 'Select the current available unit');
    return unit;
}
function workView(unit: LearningUnit, attempts: LearningAttempt[], osId: string) {
    return attempts.map(attempt => {
        const assessment = unit.assessments.find(entry => entry.attemptId === attempt.id);
        requireLearning(canReadLearningScope(attempt.scope, osId) && (!assessment || canReadLearningScope(assessment.scope, osId)),
            'attemptId', 'This work belongs to another story');
        return { exercise: unit.exercises.find(entry => entry.id === attempt.exerciseId)!, attempt: answerView(attempt), assessment: feedbackView(assessment) };
    });
}

function pendingAttempts(unit: LearningUnit, status: LearningExerciseStatus) {
    const ids = new Set(learningUnitStage(unit).exercises.filter(entry => entry.status === status)
        .map(entry => status === 'reviewing' ? entry.revisionAttemptId : entry.draftAttemptId));
    return unit.attempts.filter(attempt => ids.has(attempt.id));
}

/** The facts one request purpose works on; each purpose reads only its own stage of the unit. */
function purposeFocus(data: LearningData, language: string, osId: string, action: LearningAction) {
    const profile = data.profiles.find(entry => entry.language === language);
    switch (action.kind) {
    case 'summary-review': {
        const unit = profile?.unit && canReadLearningScope(profile.unit.scope, osId) ? profile.unit : null;
        const attempt = unit?.attempts.find(entry => entry.id === action.attemptId);
        const exercise = attempt && unit!.exercises.find(entry => entry.id === attempt.exerciseId);
        requireLearning(unit && attempt && exercise?.paragraphId, 'attemptId', 'Select a saved paragraph summary');
        requireLearning(canReadLearningScope(attempt.scope, osId), 'attemptId', 'This answer belongs to another story');
        const material = unit.materials.find(entry => exercise.materialIds.includes(entry.id));
        return { unitId: unit.id, exercise: learningExerciseView(exercise, unit), attempt: answerView(attempt),
            materialId: material?.id, paragraphId: exercise.paragraphId };
    }
    case 'grade': {
        const unit = readableUnit(profile?.unit, osId, action.unitId);
        const drafts = pendingAttempts(unit, 'grading');
        return { unitId: unit.id, drafts: workView(unit, drafts, osId) };
    }
    case 'revision-review': {
        const unit = readableUnit(profile?.unit, osId, action.unitId);
        const revisions = pendingAttempts(unit, 'reviewing');
        return { unitId: unit.id, revisions: revisions.map(revision => {
            const draft = unit.attempts.find(entry => entry.id === revision.revisesAttemptId)!;
            const [original, edited] = workView(unit, [draft, revision], osId);
            return { exercise: edited.exercise, draft: original.attempt, draftAssessment: original.assessment, revision: edited.attempt };
        }) };
    }
    case 'model-essay': {
        const unit = readableUnit(profile?.unit, osId, action.unitId);
        const essays = unit.exercises.filter(exercise => !exercise.paragraphId);
        return { unitId: unit.id, level: profile!.level, targetLevel: profile!.goal.targetLevel,
            work: workView(unit, unit.attempts.filter(attempt => essays.some(exercise => exercise.id === attempt.exerciseId)), osId) };
    }
    case 'review-prepare': {
        const due = readLearning(data, language, osId, { section: 'review', limit: L.readMax }, action.asOf).data as { id: string }[];
        return { asOf: action.asOf, items: action.itemIds.map(id => due.find(item => item.id === id) ?? { id }) };
    }
    case 'review-assess': {
        const unit = readableUnit(profile?.review, osId, action.unitId);
        const answers = pendingAttempts(unit, 'grading');
        return { unitId: unit.id, answers: workView(unit, answers, osId).map(work => ({ ...work,
            item: profile!.items.find(item => item.id === work.exercise.itemId && canReadLearningScope(item.scope, osId))?.label ?? null })) };
    }
    case 'companion': {
        const unit = profile?.unit && canReadLearningScope(profile.unit.scope, osId) ? profile.unit : null;
        const training = unit ? learningTrainingView(unit) : null;
        const material = training?.materials.find(entry => entry.id === action.materialId) ?? training?.materials[0];
        const paragraphId = action.paragraphId ?? material?.paragraphs[0]?.id;
        return training && material ? { unitId: training.id, materialId: material.id,
            paragraphId: material.paragraphs.some(paragraph => paragraph.id === paragraphId) ? paragraphId : null } : null;
    }
    default: return undefined;
    }
}

function focus(data: LearningData, language: string, osId: string, action: LearningAction, exerciseId?: string) {
    const purpose = purposeFocus(data, language, osId, action);
    if (purpose !== undefined) { return purpose; }
    const profile = data.profiles.find(entry => entry.language === language);
    const current = profile?.[learningReadUnit(action, profile)];
    const unit = current && canReadLearningScope(current.scope, osId) ? current : null;
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
        const published = unit ? learningTrainingView(unit).materials : [];
        return { unitId: target.unitId, exercise: target.exercise,
            // Current public material already appears in training. Archived sources and withheld
            // listening transcripts are supplied only to this assessment, never to conversation.
            materials: target.materials.filter(material => !published.some(entry => entry.id === material.id && !entry.hidden
                && JSON.stringify(entry.paragraphs) === JSON.stringify(material.paragraphs) && JSON.stringify(entry.provenance) === JSON.stringify(material.provenance))),
            attempt: answer, assessment: feedback ? { attemptId: feedback.attemptId, verdict: feedback.verdict,
                understanding: feedback.understanding, expression: feedback.expression, guidance: feedback.guidance } : null };
    }
    if (exerciseId) {
        const exercise = unit?.exercises.find(entry => entry.id === exerciseId);
        requireLearning(unit && exercise, 'exerciseId', 'Select an available exercise');
        const training = learningTrainingView(unit);
        return { unitId: unit.id, exercise: training.exercises.find(entry => entry.id === exercise.id) };
    }
    return null;
}

export function buildLearningContext(options: {
    data: LearningData; language: string; osId: string; teacher: NonNullable<LearningTeacherPreference['teacher']>;
    context: LearningTeacherContext; action: LearningAction; message: string; exerciseId?: string; asOf?: string;
}) {
    const { data, language, osId, action, context } = options;
    const currentTime = options.asOf ?? new Date().toISOString();
    const background = createLearningBackground(context);
    const profile = data.profiles.find(entry => entry.language === language);
    const read = (args: unknown) => readLearning(data, language, osId, args, currentTime, learningReadAudience(action), learningReadUnit(action, profile));
    const request = { language, action, currentTime,
        profile: read({}).data,
        items: read({ section: 'items' }),
        review: read({ section: 'review' }),
        training: read({ section: 'training' }).data,
        focus: focus(data, language, osId, action, options.exerciseId), background: background.initial() };
    // Core settings have no clock, progress or recent-story fields. Dynamic data belongs at the tail.
    const reference = { teacher: options.teacher, characters: context.snapshot.characters.map(character => ({
        cardName: character.displayName, description: character.description, personality: character.personality, scenario: character.scenario,
    })) };
    const userText = `[学生本轮发言]\n${options.message}`;
    return { prefix: [{ role: 'system' as const, content: `人物与故事核心设定，作为身份背景资料。\n<teacher_reference>\n${safePromptJson(reference)}\n</teacher_reference>` }],
        messages: [{ role: 'user' as const, content: `${userText}\n\n本轮学习状态与背景资料：\n<learning_request>\n${safePromptJson(request)}\n</learning_request>` }],
        // Like ebook, replay the actual exchange, not an obsolete copy of every injected asset.
        turn: { role: 'user', content: `${userText}\n\n<learning_turn>\n${safePromptJson({ action })}\n</learning_turn>` } };
}
