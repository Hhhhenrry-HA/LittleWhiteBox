import type { LearningAction } from './session.js';
import type { LearningLanguage, LearningScope } from '../../../domains/learning/types.js';

export function isLearningPreparation(action: Pick<LearningAction, 'kind'>) {
    return action.kind === 'reading-article' || action.kind === 'reading-notes' || action.kind === 'reading-essay';
}

/** Conversation has its own run; only a requested workbench action can change training facts. */
export function isLearningConversation(action: Pick<LearningAction, 'kind'>) {
    return action.kind === 'talk' || action.kind === 'companion';
}

/** Public lesson preparation cannot copy story-private assets; existing work retains its original access. */
export function learningAccessOsId(action: LearningAction, inputScope: LearningScope, osId: string): string | null {
    return inputScope.kind === 'public' && (action.kind === 'prepare' || isLearningPreparation(action)) ? null : osId;
}

export function learningReadAudience(action: LearningAction): 'public' | 'teaching' {
    return isLearningConversation(action) || action.kind === 'summary-review' || action.kind === 'profile' ? 'public' : 'teaching';
}

export function learningReadUnit(action: LearningAction, profile?: LearningLanguage): 'unit' | 'review' {
    return action.kind === 'review-prepare' || action.kind === 'review-assess'
        || action.kind === 'talk' && !!action.unitId && profile?.review?.id === action.unitId
        || action.kind === 'assess' && profile?.review?.attempts.some(attempt => attempt.id === action.attemptId) ? 'review' : 'unit';
}
