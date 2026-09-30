import type { LearningAction } from './session.js';
import type { LearningLanguage } from '../../../domains/learning/types.js';

/** Conversation has its own run; only a requested workbench action can change training facts. */
export function isLearningConversation(action: LearningAction) {
    return action.kind === 'talk' || action.kind === 'explain' || action.kind === 'companion';
}

export function learningReadAudience(action: LearningAction): 'public' | 'teaching' {
    return isLearningConversation(action) || action.kind === 'summary-review' || action.kind === 'profile' ? 'public' : 'teaching';
}

export function learningReadUnit(action: LearningAction, profile?: LearningLanguage): 'unit' | 'review' {
    return action.kind === 'review-prepare' || action.kind === 'review-assess'
        || action.kind === 'assess' && profile?.review?.attempts.some(attempt => attempt.id === action.attemptId) ? 'review' : 'unit';
}
