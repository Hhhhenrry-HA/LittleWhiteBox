import { learningRecord, learningText } from '../../../domains/learning/profile.js';
import { learningEnum, learningId, requireLearning } from '../../../domains/learning/validation.js';

export const LEARNING_DELEGATED_ACTIONS = ['prepare', 'start-review', 'grade', 'complete', 'settings', 'submit', 'assess'] as const;
export interface LearningDelegation {
    action: typeof LEARNING_DELEGATED_ACTIONS[number];
    input: Record<string, unknown>;
}

/** A turn-local request for the very same action as a workbench control, never a second transaction path. */
export function parseLearningDelegation(value: unknown, message: string, unitId: string | undefined): LearningDelegation {
    const input = learningRecord(value, 'LearningRequest', ['action', 'instruction', 'kind', 'exerciseId', 'attemptId', 'value']);
    const action = learningEnum(input.action, 'action', LEARNING_DELEGATED_ACTIONS);
    const instruction = learningText(input.instruction, 'instruction', 4000);
    requireLearning(message.includes(instruction), 'instruction', 'Quote the learner’s current request, not your own suggestion or an earlier exchange');
    switch (action) {
    case 'prepare':
        return { action, input: { kind: learningEnum(input.kind ?? 'reading-writing', 'kind', ['reading-writing', 'lesson']), message } };
    case 'settings':
        return { action, input: { value: learningRecord(input.value, 'value', ['exam', 'level', 'targetLevel', 'explanationLanguage', 'interests']) } };
    case 'submit':
        requireLearning(unitId, 'unitId', 'There is no current lesson to answer');
        return { action, input: { unitId, exerciseId: learningId(input.exerciseId, 'exerciseId'), answer: { kind: 'text', text: message } } };
    case 'assess':
        return { action, input: { attemptId: learningId(input.attemptId, 'attemptId'), review: true, message } };
    case 'grade':
        requireLearning(unitId, 'unitId', 'There is no current lesson to grade');
        return { action, input: { unitId } };
    case 'complete': case 'start-review': return { action, input: {} };
    }
}
