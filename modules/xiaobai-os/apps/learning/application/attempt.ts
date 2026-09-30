import { replaceLearningAssessment, scheduleLearningReview } from '../../../domains/learning/assessment.js';
import { completeLearningByFacts } from '../../../domains/learning/completion.js';
import { objectiveLearningVerdict, parseLearningAnswer } from '../../../domains/learning/exercise.js';
import { parseLearningHelp } from '../../../domains/learning/facts.js';
import { learningListeningBasis, learningSpeechParts } from '../../../domains/learning/speech.js';
import { canReadLearningScope, type LearningLanguage, type LearningScope } from '../../../domains/learning/types.js';
import { combineLearningScope, learningId, learningTimestamp, parseLearningScope, requireLearning } from '../../../domains/learning/validation.js';
import type { LearningDocument } from '../storage/document.js';

/** Frozen when a real message arrives; never supplied by the model or persisted as another snapshot. */
export interface LearningAttemptBasis { document: LearningDocument | null; submittedAt: string }

/** Capture the real answer and its conditions together, before any new teacher assistance. */
export function appendLearningAttempt(profile: LearningLanguage, input: {
    unitId: string; exerciseId: string; answer: unknown; scope: LearningScope; osId: string;
    replays: number; slowPlayback: boolean; createId: () => string; now: () => string;
}) {
    const unit = [profile.unit, profile.review].find(entry => entry?.id === input.unitId);
    requireLearning(unit && canReadLearningScope(unit.scope, input.osId), 'unitId', 'Select an available current unit');
    const exercise = unit.exercises.find(entry => entry.id === input.exerciseId);
    requireLearning(exercise, 'exerciseId', 'Select an exercise in this unit');
    if (unit.kind === 'reading-writing') {
        // Drafts stay editable until grading starts; a resubmission replaces the ungraded draft. After grading, only a
        // draft that was deleted may be written again, so the unit cannot get stuck without it.
        const hasDraft = unit.attempts.some(entry => entry.exerciseId === exercise.id && entry.revisesAttemptId === undefined);
        requireLearning(!unit.assessments.length || !hasDraft, 'unitId', 'Grading has started; revise the graded drafts instead');
        unit.attempts = unit.attempts.filter(entry => entry.exerciseId !== exercise.id);
    }
    if (unit.kind === 'review') {
        requireLearning(!unit.attempts.some(entry => entry.exerciseId === exercise.id), 'exerciseId', 'Each review question is answered once');
    }
    const answer = parseLearningAnswer(input.answer, exercise.response, unit.materials);
    requireLearning(input.scope.kind === 'public' || input.scope.osId === input.osId, 'scope', 'Use the current story identity');
    const scope = combineLearningScope(unit.scope, parseLearningScope(input.scope, 'scope'));
    const listening = exercise.skill === 'listening' ? learningListeningBasis(unit.listening ?? [],
        unit.materials.filter(material => exercise.materialIds.includes(material.id)).flatMap(learningSpeechParts).map(part => part.key)) : null;
    const help = parseLearningHelp({ answer: unit.revealed.answers.includes(exercise.id), hint: unit.revealed.hints.includes(exercise.id),
        feedback: unit.attempts.some(attempt => attempt.exerciseId === exercise.id
            && unit.assessments.some(assessment => assessment.attemptId === attempt.id && canReadLearningScope(assessment.scope, input.osId))),
        transcript: exercise.skill === 'listening' && unit.materials.some(material => exercise.materialIds.includes(material.id) && material.transcriptRevealed),
        replays: listening?.replays ?? input.replays, slowPlayback: listening?.slowPlayback ?? input.slowPlayback });
    const attempt = { id: learningId(input.createId(), 'attemptId'), exerciseId: exercise.id, answer, scope,
        submittedAt: learningTimestamp(input.now(), 'submittedAt'), help,
        ...(listening ? { listening: structuredClone(listening.parts) } : {}) };
    unit.attempts.push(attempt);
    const verdict = objectiveLearningVerdict(exercise, answer);
    if (verdict !== null && exercise.rule.kind !== 'semantic') {
        replaceLearningAssessment(profile, { attemptId: attempt.id, verdict, scope,
            understanding: '', expression: '', guidance: exercise.rule.explanation });
        if (unit.kind === 'review') {
            const now = attempt.submittedAt;
            scheduleLearningReview(profile, attempt.id, now);
            completeLearningByFacts(profile, 'review', now);
        }
    }
    return attempt;
}
