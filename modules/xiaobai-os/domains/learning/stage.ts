import type { LearningAssessment, LearningAttempt, LearningUnit } from './types.js';
import { learningPreparation } from './preparation.js';

export type LearningUnitStage = 'lesson' | 'writing' | 'grading' | 'revising' | 'reviewing' | 'model' | 'answering' | 'complete';
export type LearningExerciseStatus = 'writing' | 'grading' | 'revising' | 'reviewing' | 'done';
export interface LearningExerciseStage {
    exerciseId: string; draftAttemptId: string | null; revisionAttemptId: string | null; status: LearningExerciseStatus;
}

/** Errors and improvements ask for a revision; alternatives are only offered. */
export function learningNeedsRevision(assessment: LearningAssessment | undefined): boolean {
    return Boolean(assessment?.annotations?.some(annotation => annotation.severity !== 'alternative'));
}

/** The latest submission that is not itself a revision counts as the draft. */
export function learningLatestDraft(unit: LearningUnit, exerciseId: string): LearningAttempt | undefined {
    return unit.attempts.filter(attempt => attempt.exerciseId === exerciseId && attempt.revisesAttemptId === undefined).at(-1);
}

/** Derived from saved attempts and feedback only; no step number is stored beside them. */
export function learningUnitStage(unit: LearningUnit): { stage: LearningUnitStage; exercises: LearningExerciseStage[] } {
    // Disputed feedback is waiting to be judged again, so it does not move the unit forward.
    const assessed = (attempt: LearningAttempt | undefined) => unit.assessments.find(entry => entry.attemptId === attempt?.id && entry.verdict !== 'disputed');
    const rows = unit.exercises.map(exercise => {
        const draft = unit.kind === 'reading-writing' ? learningLatestDraft(unit, exercise.id) : unit.attempts.filter(entry => entry.exerciseId === exercise.id).at(-1);
        const revision = draft && unit.attempts.find(entry => entry.revisesAttemptId === draft.id);
        return { exercise, draft, revision, draftAssessment: assessed(draft), revisionAssessment: assessed(revision) };
    });
    const exercises = (status: (row: typeof rows[number]) => LearningExerciseStatus) => rows.map(row => ({ exerciseId: row.exercise.id,
        draftAttemptId: row.draft?.id ?? null, revisionAttemptId: row.revision?.id ?? null, status: status(row) }));
    const basic = (row: typeof rows[number]): LearningExerciseStatus => !row.draft ? 'writing' : !row.draftAssessment ? 'grading' : 'done';
    if (unit.kind === 'lesson') { return { stage: 'lesson', exercises: exercises(basic) }; }
    if (unit.kind === 'review') {
        const stage = rows.some(row => !row.draft) ? 'answering' : rows.some(row => !row.draftAssessment) ? 'grading' : 'complete';
        return { stage, exercises: exercises(basic) };
    }
    if (!learningPreparation(unit).ready || rows.some(row => !row.draft)) { return { stage: 'writing', exercises: exercises(basic) }; }
    if (rows.some(row => !row.draftAssessment)) { return { stage: 'grading', exercises: exercises(basic) }; }
    const revised = rows.some(row => row.revision);
    if (!revised && !unit.revisionSkipped && rows.some(row => learningNeedsRevision(row.draftAssessment))) {
        return { stage: 'revising', exercises: exercises(row => learningNeedsRevision(row.draftAssessment) ? 'revising' : 'done') };
    }
    const status = (row: typeof rows[number]): LearningExerciseStatus => row.revision && !row.revisionAssessment ? 'reviewing' : 'done';
    if (rows.some(row => row.revision && !row.revisionAssessment)) { return { stage: 'reviewing', exercises: exercises(status) }; }
    return { stage: unit.modelEssay ? 'complete' : 'model', exercises: exercises(status) };
}
