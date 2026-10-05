import { learningRecord, learningText } from './profile.js';
import { learningUnitStage } from './stage.js';
import { canReadLearningScope, LEARNING_LIMITS as L, type LearningCompletion, type LearningLanguage, type LearningScope } from './types.js';
import { combineLearningScope, learningId, learningIds, learningTimestamp, requireLearning } from './validation.js';

const REWARD_TITLE = '语伴学习奖励';

/**
 * Reading-writing and review units finish by their saved facts, not by a teacher's word:
 * once the derived stage is complete the completion is written in the same save.
 */
export function completeLearningByFacts(profile: LearningLanguage, slot: 'unit' | 'review', now: string): LearningCompletion | null {
    const unit = profile[slot];
    if (!unit || unit.kind === 'lesson' || learningUnitStage(unit).stage !== 'complete') { return null; }
    if (profile.completions.some(entry => entry.unitId === unit.id)) { return null; }
    const assessments = unit.assessments.filter(entry => entry.verdict !== 'disputed');
    if (!assessments.length) { return null; }
    const scope = assessments.reduce((value, entry) => combineLearningScope(value, entry.scope), unit.scope);
    const completion = { unitId: unit.id, completedAt: learningTimestamp(now, 'completedAt'), summary: unit.title, scope,
        attemptIds: assessments.map(entry => entry.attemptId),
        reward: { originOsId: unit.originOsId, amount: unit.reward.amount, title: REWARD_TITLE, note: unit.title } };
    profile.completions.push(completion);
    return completion;
}

/** A model essay is available as soon as saved; completion still follows actual learner work. */
export function saveLearningModelEssay(profile: LearningLanguage, unitId: string, value: unknown, now: string): void {
    const unit = profile.unit;
    requireLearning(unit?.kind === 'reading-writing' && unit.id === unitId, 'unitId', 'Select the current reading-writing unit');
    const essay = learningRecord(value, 'modelEssay', ['text', 'level']);
    unit.modelEssay = { text: learningText(essay.text, 'modelEssay.text', L.materialText), level: learningText(essay.level, 'modelEssay.level', L.name) };
    completeLearningByFacts(profile, 'unit', now);
}

export function completeLearning(profile: LearningLanguage, args: unknown, options: {
    osId: string; inputScope: LearningScope; now: () => string;
}): LearningLanguage {
    const input = learningRecord(args, 'LearningComplete', ['unitId', 'attemptIds', 'summary']);
    const unitId = learningId(input.unitId, 'unitId');
    const unit = [profile.unit, profile.review].find(entry => entry?.id === unitId);
    requireLearning(unit && unit.id === unitId && canReadLearningScope(unit.scope, options.osId), 'unitId', 'Use the current readable unit');
    const attemptIds = learningIds(input.attemptIds, 'attemptIds');
    requireLearning(attemptIds.length > 0, 'attemptIds', 'Completion requires actual practice with feedback');
    const summary = learningText(input.summary, 'summary', L.explanation);
    // A completed unit keeps its original completion and reward even during later review.
    if (profile.completions.some(entry => entry.unitId === unitId)) { return structuredClone(profile); }
    let scope = combineLearningScope(unit.scope, options.inputScope);
    for (const id of attemptIds) {
        const attempt = unit.attempts.find(entry => entry.id === id);
        const assessment = unit.assessments.find(entry => entry.attemptId === id);
        requireLearning(attempt && assessment && assessment.verdict !== 'disputed' && canReadLearningScope(assessment.scope, options.osId), 'attemptIds', 'Each attempt needs available, resolved feedback in this unit');
        scope = combineLearningScope(scope, assessment.scope);
    }
    const next = structuredClone(profile);
    next.completions.push({ unitId, completedAt: learningTimestamp(options.now(), 'completedAt'), summary, scope, attemptIds,
        reward: { originOsId: unit.originOsId, amount: unit.reward.amount, title: REWARD_TITLE, note: unit.title } });
    return next;
}
