import type { LearningSelection } from '../../../domains/learning/notes.js';
import type { LearningAttemptBasis } from './attempt.js';
import type { LearningSubmissionReceipts } from './tool-execution.js';

/** A companion hands the learner's request to the workbench, not a button name. */
export interface LearningWorkRequest {
    message: string;
    unitId?: string;
    exerciseId?: string;
    selection?: LearningSelection | null;
    answerBasis: LearningAttemptBasis;
    submissions: LearningSubmissionReceipts;
}
