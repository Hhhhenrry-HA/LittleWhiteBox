import { assessLearning } from '../../../domains/learning/assessment.js';
import { completeLearning } from '../../../domains/learning/completion.js';
import { parseLearningData } from '../../../domains/learning/data.js';
import { learningRecord, LearningValidationError, parseLearningLanguageTag, parseLearningProfile } from '../../../domains/learning/profile.js';
import { canReadLearningScope, type LearningData, type LearningScope, type RewardTier } from '../../../domains/learning/types.js';
import { requireLearning } from '../../../domains/learning/validation.js';
import { LEARNING_REWARD_PRICES } from '../../../domains/learning/reward.js';
import { createLearningLessonCompiler } from '../application/lesson.js';
import { confirmedLearning, type LearningRepository } from '../application/service.js';
import { createLearningSourceRegistry } from '../materials/lesson-sources.js';
import { buildLearningDataMessage, readLearning } from './data-projection.js';

export type LearningAction =
    | { kind: 'profile' }
    | { kind: 'prepare'; replaceCurrent: boolean; prices?: Readonly<Record<RewardTier, number>> }
    | { kind: 'assess'; attemptId: string; review: boolean }
    | { kind: 'complete' }
    | { kind: 'explain' };

export function learningToolNames(action: LearningAction): string[] {
    return ['LearningRead', ...(action.kind === 'profile' ? ['LearningProfileEdit'] : action.kind === 'prepare' ? ['LearningLessonEdit']
        : ['LearningAssess', 'LearningComplete'])];
}

/** One user-initiated action. Provider orchestration owns normal completion/cancellation, not this draft. */
export function createLearningSession(repository: LearningRepository, options: {
    language: string; osId: string; inputScope: LearningScope; action: LearningAction;
    createId?: () => string; now?: () => string;
    sources?: ReturnType<typeof createLearningSourceRegistry>;
}) {
    const expected = confirmedLearning(repository);
    const action = structuredClone(options.action);
    const inputScope = structuredClone(options.inputScope);
    requireLearning(inputScope.kind === 'public' || inputScope.osId === options.osId, 'scope', 'Use the current story identity');
    const accessOsId = inputScope.kind === 'story' ? options.osId : null;
    const createId = options.createId ?? (() => crypto.randomUUID());
    const now = options.now ?? (() => new Date().toISOString());
    const canonicalLanguage = parseLearningLanguageTag(options.language, 'language');
    let staged: LearningData = structuredClone(expected?.data ?? { profiles: [] });
    let invalid = false;
    let sealed = false;
    const applied = new Set<string>();
    const failures = new Map<string, { path: string; message: string }>();
    const names = learningToolNames(action);
    const compileLesson = action.kind === 'prepare' ? createLearningLessonCompiler({
        osId: options.osId, scope: inputScope, prices: action.prices ?? LEARNING_REWARD_PRICES, createId, sources: options.sources ?? createLearningSourceRegistry(),
    }) : null;
    const active = () => requireLearning(!invalid && !sealed, 'action', 'This teaching action has ended');
    const errors = () => [...failures.values()];
    const initialData = buildLearningDataMessage(staged, canonicalLanguage, accessOsId);
    return {
        toolNames: [...names],
        appliedTools: () => [...applied],
        unresolvedErrors: () => structuredClone(errors()),
        markExplained(exerciseId: string) {
            active();
            const unit = staged.profiles.find(profile => profile.language === canonicalLanguage)?.unit;
            requireLearning(unit && canReadLearningScope(unit.scope, accessOsId)
                && unit.exercises.some(exercise => exercise.id === exerciseId), 'exerciseId', 'Select an available exercise');
            if (!unit.revealed.hints.includes(exerciseId)) { unit.revealed.hints.push(exerciseId); }
        },
        dataMessages: [{ role: 'user' as const, content: initialData }],
        executeTool(name: string, args: unknown): unknown {
            active();
            const attemptRef = name === 'LearningAssess' && args && typeof args === 'object' && 'attemptId' in args
                && typeof args.attemptId === 'string' ? args.attemptId : null;
            const failureKey = attemptRef === null ? name : `${name}:${attemptRef}`;
            try {
                requireLearning(names.includes(name), 'tool', 'This tool is not available for the current learning action');
                if (name === 'LearningRead') { return readLearning(staged, canonicalLanguage, accessOsId, args); }
                if (args && typeof args === 'object' && 'discard' in args) {
                    const input = learningRecord(args, name, ['discard']);
                    requireLearning(input.discard === true, 'discard', 'Use true to withdraw this failed proposal');
                    for (const key of failures.keys()) { if (key === name || key.startsWith(`${name}:`)) { failures.delete(key); } }
                    return { ok: true, changed: false, ids: [], errors: errors() };
                }
                let next = structuredClone(staged);
                const index = next.profiles.findIndex(profile => profile.language === canonicalLanguage);
                let ids: string[] = [];
                if (name === 'LearningProfileEdit') {
                    const input = learningRecord(args, name, ['explanationLanguage', 'selfAssessment', 'goal']);
                    const previous = next.profiles[index];
                    const profile = parseLearningProfile({ language: canonicalLanguage,
                        explanationLanguage: input.explanationLanguage === undefined ? previous?.explanationLanguage : input.explanationLanguage,
                        selfAssessment: input.selfAssessment === undefined ? previous?.selfAssessment : input.selfAssessment,
                        goal: { ...(previous?.goal ?? { exam: null, targetLevel: null, targetDate: null }),
                            ...(input.goal === undefined ? {} : learningRecord(input.goal, 'goal', ['description', 'exam', 'targetLevel', 'targetDate'])) } });
                    if (previous) { next.profiles[index] = { ...previous, ...profile }; }
                    else { next.profiles.push({ ...profile, unit: null, items: [], completions: [] }); }
                    ids = [canonicalLanguage];
                } else {
                    requireLearning(index >= 0, 'profile', 'Save the learner goal before preparing a lesson');
                    const profile = next.profiles[index];
                    if (name === 'LearningLessonEdit' && compileLesson && action.kind === 'prepare') {
                        const previous = expected?.data.profiles.find(entry => entry.language === canonicalLanguage)?.unit;
                        requireLearning(!previous || action.replaceCurrent, 'unit', 'Starting another unit needs an explicit learner action');
                        const remembered = [...(profile.unit?.materials ?? []), ...profile.items.flatMap(item => item.evidence.flatMap(evidence => evidence.materials))];
                        profile.unit = compileLesson(args);
                        // Exact known text remains exposed across a new preparation; no website-reading log is needed.
                        for (const material of profile.unit.materials) {
                            const text = material.paragraphs.map(paragraph => paragraph.text).join('\n\n');
                            material.transcriptRevealed = !profile.unit.exercises.some(exercise => exercise.skill === 'listening' && exercise.materialIds.includes(material.id)) || remembered.some(old => old.transcriptRevealed
                                && old.paragraphs.map(paragraph => paragraph.text).join('\n\n') === text);
                        }
                        ids = [profile.unit.id, ...profile.unit.materials.map(material => material.id), ...profile.unit.exercises.map(exercise => exercise.id)];
                    } else if (name === 'LearningAssess' && (action.kind === 'assess' || action.kind === 'complete' || action.kind === 'explain')) {
                        const requested = learningRecord(args, name, ['attemptId', 'verdict', 'understanding', 'expression', 'guidance', 'items']);
                        const attemptId = action.kind === 'assess' ? action.attemptId : requested.attemptId;
                        const attempt = profile.unit?.attempts.find(entry => entry.id === attemptId)
                            ?? (action.kind === 'assess' && action.review ? profile.items.flatMap(item => item.evidence).find(entry => entry.attempt.id === attemptId)?.attempt : undefined);
                        requireLearning(attempt && canReadLearningScope(attempt.scope, accessOsId), 'attemptId', 'This attempt is outside the action reading scope');
                        if (action.kind !== 'assess') {
                            const feedback = profile.unit?.assessments.find(entry => entry.attemptId === attemptId);
                            requireLearning(feedback && canReadLearningScope(feedback.scope, accessOsId), 'attemptId', 'Wrap-up can attach learning items to existing available feedback');
                        }
                        const result = assessLearning(profile, args, { attemptId: attempt.id, review: action.kind === 'assess' && action.review, inputScope, osId: options.osId, createId });
                        next.profiles[index] = result.profile;
                        ids = result.ids;
                    } else if (name === 'LearningComplete') {
                        requireLearning(profile.unit && canReadLearningScope(profile.unit.scope, accessOsId), 'unitId', 'This unit is outside the action reading scope');
                        // Scope follows every piece of feedback the completion is allowed to consume.
                        const visible = structuredClone(profile);
                        visible.unit!.assessments = visible.unit!.assessments.filter(entry => canReadLearningScope(entry.scope, accessOsId));
                        const completed = completeLearning(visible, args, { osId: options.osId, inputScope, now });
                        next.profiles[index].completions = completed.completions;
                        ids = [profile.unit.id];
                    }
                }
                next = parseLearningData(next);
                const changed = JSON.stringify(next) !== JSON.stringify(staged);
                staged = next;
                applied.add(name);
                failures.delete(failureKey);
                failures.delete(name);
                return { ok: true, changed, ids, errors: errors() };
            } catch (error) {
                if (!(error instanceof LearningValidationError)) { invalid = true; throw error; }
                const issue = { path: error.path, message: error.message };
                if (name !== 'LearningRead') { failures.set(failureKey, issue); }
                return { ok: false, changed: false, ids: [], errors: name === 'LearningRead' ? [issue, ...errors()] : errors() };
            }
        },
        async commit(guard: () => boolean) {
            active();
            requireLearning(failures.size === 0, 'action', 'Correct each failed proposal or withdraw it with discard:true on that tool');
            for (const profile of staged.profiles) {
                const known = expected?.data.profiles.find(entry => entry.language === profile.language)?.completions ?? [];
                for (const completion of profile.completions.filter(entry => !known.some(old => old.unitId === entry.unitId))) {
                    const unit = profile.unit;
                    requireLearning(unit?.id === completion.unitId && completion.attemptIds.every(id => unit.attempts.some(attempt => attempt.id === id)
                        && unit.assessments.some(assessment => assessment.attemptId === id && assessment.verdict !== 'disputed')),
                    'completion', 'The new completion still needs resolved feedback when this action is saved');
                }
            }
            sealed = true;
            return repository.save(expected, staged, () => !invalid && guard());
        },
        invalidate() { invalid = true; },
    };
}
