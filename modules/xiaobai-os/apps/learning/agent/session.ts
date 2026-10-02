import { assessLearning } from '../../../domains/learning/assessment.js';
import { completeLearning, saveLearningModelEssay } from '../../../domains/learning/completion.js';
import { parseLearningData } from '../../../domains/learning/data.js';
import { learningRecord, LearningValidationError, parseLearningLanguageTag, parseLearningProfile } from '../../../domains/learning/profile.js';
import { canReadLearningScope, type LearningData, type LearningLanguage, type LearningScope, type LearningUnit, type RewardTier } from '../../../domains/learning/types.js';
import { learningId, learningInteger, requireLearning } from '../../../domains/learning/validation.js';
import { LEARNING_REWARD_PRICES } from '../../../domains/learning/reward.js';
import { createLearningLessonCompiler } from '../application/lesson.js';
import { createLearningId } from '../application/identity.js';
import { learningPresentation, type LearningPresentation } from '../application/presentation.js';
import { confirmedLearning, type LearningRepository } from '../application/service.js';
import { createLearningSourceRegistry } from '../materials/lesson-sources.js';
import { LearningReadingContentError } from '../materials/reading-content.js';
import { readLearning } from './data-projection.js';
import { learningToolNamesFor } from './tool-contract.js';
import { isLearningConversation, learningAccessOsId, learningReadAudience, learningReadUnit, learningReviewScope } from './access.js';
import { parseLearningDelegation, type LearningDelegation } from '../application/delegation.js';

/**
 * One request purpose, with only the capabilities belonging to that step.
 * Conversations may delegate an explicit request to the workbench; they do not own its writes.
 */
export type LearningAction =
    | { kind: 'profile' }
    | { kind: 'prepare'; replaceCurrent: boolean; unit?: 'reading-writing' | 'lesson'; prices?: Readonly<Record<RewardTier, number>> }
    | { kind: 'reading-article'; replaceCurrent: boolean; source: 'web' | 'authored' }
    | { kind: 'reading-notes'; unitId: string; paragraphIds: string[] }
    | { kind: 'reading-essay'; unitId: string }
    | { kind: 'assess'; attemptId: string; review: boolean }
    | { kind: 'complete' }
    | { kind: 'talk'; unitId?: string }
    /** A reply on one paragraph summary; its grade waits for the unified grading. */
    | { kind: 'summary-review'; attemptId: string }
    | { kind: 'grade'; unitId: string }
    | { kind: 'revision-review'; unitId: string }
    | { kind: 'model-essay'; unitId: string }
    /** itemIds and asOf are the due selection shown to the learner when they started the review. */
    | { kind: 'review-prepare'; itemIds: string[]; asOf: string }
    | { kind: 'review-assess'; unitId: string }
    /** An unprompted in-character remark while the learner reads; it writes nothing. */
    | { kind: 'companion'; materialId?: string; paragraphId?: string };

/** Every tool name the classroom can show, for tool-activity views. */
export function learningToolNames(): string[] {
    return learningToolNamesFor();
}

/** One user-initiated action. Provider orchestration owns normal completion/cancellation, not this draft. */
export function createLearningSession(repository: LearningRepository, options: {
    language: string; osId: string; inputScope: LearningScope; action: LearningAction;
    createId?: () => string; now?: () => string;
    sources?: ReturnType<typeof createLearningSourceRegistry>;
    learnerMessage?: string;
    asOf?: string;
    canDelegate?: (action: LearningDelegation['action']) => boolean;
}) {
    const expected = isLearningConversation(options.action) ? repository.snapshot().document ?? null : confirmedLearning(repository);
    const action = structuredClone(options.action);
    const inputScope = action.kind === 'review-prepare'
        ? learningReviewScope(expected?.data.profiles.find(profile => profile.language === options.language), action.itemIds, options.osId)
        : structuredClone(options.inputScope);
    requireLearning(inputScope.kind === 'public' || inputScope.osId === options.osId, 'scope', 'Use the current story identity');
    const accessOsId = learningAccessOsId(action, inputScope, options.osId);
    const createId = options.createId ?? createLearningId;
    const now = options.now ?? (() => new Date().toISOString());
    const asOf = options.asOf ?? now();
    const canonicalLanguage = parseLearningLanguageTag(options.language, 'language');
    let staged: LearningData = structuredClone(expected?.data ?? { profiles: [] });
    const unitKey = learningReadUnit(action, staged.profiles.find(entry => entry.language === canonicalLanguage));
    let invalid = false;
    let sealed = false;
    let presentation: LearningPresentation | null = null;
    let delegation: { operation: LearningDelegation; confirmation: boolean } | null = null;
    const applied = new Set<string>();
    const names = learningToolNamesFor(action);
    const sources = options.sources ?? createLearningSourceRegistry();
    const compileLesson = createLearningLessonCompiler({
        osId: options.osId, language: canonicalLanguage, scope: inputScope, prices: action.kind === 'prepare' ? action.prices ?? LEARNING_REWARD_PRICES : LEARNING_REWARD_PRICES,
        createId, sources,
    });
    const active = () => requireLearning(!invalid && !sealed, 'action', 'This teaching action has ended');
    /** Exact known text remains exposed across a new preparation; no website-reading log is needed. */
    const revealKnownText = (unit: LearningUnit, confirmed: LearningLanguage | undefined) => {
        const remembered = [...(confirmed?.unit?.materials ?? []), ...(confirmed?.review?.materials ?? []),
            ...(confirmed?.items.flatMap(item => item.evidence.flatMap(evidence => evidence.materials)) ?? [])];
        for (const material of unit.materials) {
            const text = material.paragraphs.map(paragraph => paragraph.text).join('\n\n');
            material.transcriptRevealed = !unit.exercises.some(exercise => exercise.skill === 'listening' && exercise.materialIds.includes(material.id)) || remembered.some(old => old.transcriptRevealed
                && old.paragraphs.map(paragraph => paragraph.text).join('\n\n') === text);
        }
        return unit;
    };
    return {
        toolNames: [...names],
        appliedTools: () => [...applied],
        delegation: () => delegation && !delegation.confirmation ? structuredClone(delegation.operation) : null,
        presentation: () => presentation ? structuredClone(presentation) : null,
        executeTool(name: string, args: unknown): unknown {
            active();
            let nextPresentation = presentation;
            try {
                requireLearning(names.includes(name), 'tool', 'This tool is not available for the current learning action');
                if (name === 'LearningRequest') {
                    requireLearning(action.kind === 'talk', 'action', 'Only a learner-initiated conversation can request a workbench action');
                    const profile = staged.profiles.find(entry => entry.language === canonicalLanguage);
                    const requested = parseLearningDelegation(args, options.learnerMessage ?? '', profile?.unit?.id);
                    if (options.canDelegate && !options.canDelegate(requested.action)) { return { ok: false, status: 'busy' }; }
                    requireLearning(!delegation || JSON.stringify(delegation.operation) === JSON.stringify(requested), 'action', 'This exchange already requested a different workbench action');
                    if (requested.action === 'prepare' && profile?.unit && !profile.completions.some(entry => entry.unitId === profile.unit!.id)) {
                        presentation = learningPresentation(profile.unit, { kind: 'replacement' }, options.learnerMessage,
                            requested.input.kind as 'reading-writing' | 'lesson');
                        delegation = { operation: requested, confirmation: true };
                        applied.add(name);
                        return { ok: true, status: 'confirmation' };
                    }
                    delegation = { operation: requested, confirmation: false };
                    applied.add(name);
                    return { ok: true, status: 'requested' };
                }
                if (name === 'LearningRead') {
                    const audience = learningReadAudience(action);
                    if (args && typeof args === 'object' && 'section' in args && args.section === 'sources') {
                        const input = learningRecord(args, name, ['section', 'offset', 'limit']);
                        const offset = learningInteger(input.offset ?? 0, 'offset');
                        const limit = learningInteger(input.limit ?? 20, 'limit', 1, 50);
                        const records = sources.list();
                        const nextOffset = offset + limit < records.length ? offset + limit : null;
                        return { section: 'sources', data: records.slice(offset, offset + limit), nextOffset, omitted: nextOffset !== null };
                    }
                    return readLearning(staged, canonicalLanguage, accessOsId, args, asOf, audience, unitKey);
                }
                let next = structuredClone(staged);
                const index = next.profiles.findIndex(profile => profile.language === canonicalLanguage);
                let ids: string[] = [];
                if (name === 'LearningProfileEdit') {
                    const input = learningRecord(args, name, ['explanationLanguage', 'selfAssessment', 'interests', 'goal']);
                    const previous = next.profiles[index];
                    const profile = parseLearningProfile({ language: canonicalLanguage,
                        explanationLanguage: input.explanationLanguage === undefined ? previous?.explanationLanguage : input.explanationLanguage,
                        selfAssessment: input.selfAssessment === undefined ? previous?.selfAssessment : input.selfAssessment,
                        level: previous?.level ?? null, interests: input.interests === undefined ? previous?.interests ?? null : input.interests,
                        goal: { ...(previous?.goal ?? { exam: null, targetLevel: null, targetDate: null }),
                            ...(input.goal === undefined ? {} : learningRecord(input.goal, 'goal', ['description', 'exam', 'targetLevel', 'targetDate'])) } });
                    if (previous) { next.profiles[index] = { ...previous, ...profile }; }
                    else { next.profiles.push({ ...profile, unit: null, review: null, items: [], completions: [] }); }
                    ids = [canonicalLanguage];
                } else {
                    requireLearning(index >= 0, 'profile', 'Save the learner goal before preparing a lesson');
                    const profile = next.profiles[index];
                    if (name === 'LearningArticle' && action.kind === 'reading-article') {
                        const input = learningRecord(args, name, ['title', 'goal', 'tier', 'kind', 'sourceId', 'text']);
                        requireLearning(input.kind === (action.source === 'web' ? 'adapted' : 'authored'), 'kind', 'Use the material source chosen in this request');
                        requireLearning(!profile.unit || action.replaceCurrent, 'unit', 'Continue the saved article or confirm replacing it');
                        profile.unit = revealKnownText(compileLesson({ kind: 'reading-writing', title: input.title, goal: input.goal, tier: input.tier,
                            materials: [{ key: 'article', title: input.title, kind: input.kind, ...(input.sourceId ? { sourceId: input.sourceId } : {}), text: input.text }] }), profile);
                        ids = [profile.unit.id];
                    } else if ((name === 'LearningReadingNotes' && action.kind === 'reading-notes') || (name === 'LearningEssayTask' && action.kind === 'reading-essay')) {
                        const unit = profile.unit;
                        requireLearning(unit?.id === action.unitId && unit.kind === 'reading-writing' && canReadLearningScope(unit.scope, accessOsId), 'unitId', 'Use the current reading article');
                        if (action.kind === 'reading-notes') {
                            const input = learningRecord(args, name, ['explanations']);
                            requireLearning(Array.isArray(input.explanations) && JSON.stringify(input.explanations.map(entry => entry?.paragraphId)) === JSON.stringify(action.paragraphIds),
                                'explanations', 'Explain exactly the requested paragraphs, in order');
                            profile.unit = compileLesson({ explanations: [...unit.explanations!.map(({ materialId, ...entry }) => ({ materialKey: materialId, ...entry })),
                                ...input.explanations.map(entry => ({ ...entry, materialKey: unit.materials[0].id }))] }, unit, unit);
                        } else {
                            const input = learningRecord(args, name, ['prompt']);
                            requireLearning(!unit.exercises.some(entry => !entry.paragraphId), 'prompt', 'The essay question is already saved');
                            profile.unit = compileLesson({ exercises: [{ key: 'essay', skill: 'writing', materialKeys: [unit.materials[0].id],
                                prompt: input.prompt, response: { kind: 'text' }, rule: { kind: 'semantic' } }] }, unit, unit);
                        }
                        ids = [unit.id];
                    } else if (name === 'LearningPresent') {
                        const input = learningRecord(args, name, ['kind', 'id']);
                        const unit = input.kind === 'replacement' ? profile.unit : profile[unitKey];
                        const target = learningPresentation(unit, args, options.learnerMessage, action.kind === 'prepare' ? action.unit : undefined);
                        requireLearning(target.kind === 'replacement' || unit && canReadLearningScope(unit.scope, accessOsId), 'unit', 'Choose a lesson available in this classroom');
                        nextPresentation = target;
                        ids = [target.id];
                    } else if (name === 'LearningLessonEdit' && action.kind === 'review-prepare') {
                        const lesson = learningRecord(args, name, ['kind', 'title', 'goal', 'tier', 'materials', 'exercises', 'removeMaterials', 'removeExercises']);
                        requireLearning(lesson.kind === undefined || lesson.kind === 'review', 'kind', 'This request prepares a review');
                        const confirmed = expected?.data.profiles.find(entry => entry.language === canonicalLanguage);
                        const open = confirmed?.review;
                        requireLearning(!open || confirmed.completions.some(entry => entry.unitId === open.id), 'review', 'The learner is already answering a review');
                        // Later calls in this turn adapt the draft; the due items are those shown when the learner started.
                        const current = profile.review && profile.review.id !== open?.id ? profile.review : null;
                        profile.review = revealKnownText(compileLesson({ ...lesson, kind: 'review' }, current, null, { profile, now: action.asOf }), confirmed);
                        ids = [profile.review.id, ...profile.review.materials.map(material => material.id), ...profile.review.exercises.map(exercise => exercise.id)];
                    } else if (name === 'LearningLessonEdit') {
                        const { newLesson, ...lesson } = learningRecord(args, name, ['newLesson', 'kind', 'title', 'goal', 'tier', 'materials', 'exercises', 'removeMaterials', 'removeExercises', 'explanations']);
                        requireLearning(lesson.kind !== 'review', 'kind', 'A review starts from the learner’s due items when they open one');
                        requireLearning(newLesson === undefined || typeof newLesson === 'boolean', 'newLesson', 'Use true to begin the next lesson');
                        const previous = expected?.data.profiles.find(entry => entry.language === canonicalLanguage)?.unit;
                        const startNew = (newLesson === true || action.kind === 'prepare' && action.replaceCurrent) && !applied.has(name);
                        requireLearning(!startNew || action.kind === 'prepare' && action.replaceCurrent || !profile.unit
                            || profile.unit.id === previous?.id && expected?.data.profiles.find(entry => entry.language === canonicalLanguage)?.completions.some(entry => entry.unitId === previous.id),
                        'newLesson', 'Finish and save the current lesson before beginning another, or use LearningPresent with kind:replacement to ask the learner to confirm putting it aside');
                        requireLearning(startNew || !profile.unit || canReadLearningScope(profile.unit.scope, accessOsId),
                            'unit', 'This lesson belongs to another story. LearningPresent with kind:replacement asks the learner to confirm starting another');
                        const confirmed = expected?.data.profiles.find(entry => entry.language === canonicalLanguage);
                        const current = startNew ? null : profile.unit;
                        requireLearning(!current || current.scope.kind === inputScope.kind, 'unit',
                            'This shared lesson cannot acquire private story details. Ask the learner to start a new lesson in this classroom');
                        const kind = lesson.kind ?? (!current && action.kind === 'prepare' ? action.unit : undefined);
                        profile.unit = revealKnownText(compileLesson({ ...lesson, ...(kind ? { kind } : {}) }, current,
                            previous?.id === current?.id ? previous ?? null : null, { profile, now: asOf }), confirmed);
                        ids = [profile.unit.id, ...profile.unit.materials.map(material => material.id), ...profile.unit.exercises.map(exercise => exercise.id)];
                    } else if (name === 'LearningAssess') {
                        const { review: requestedReview, ...requested } = learningRecord(args, name, ['attemptId', 'verdict', 'understanding', 'expression', 'guidance', 'items', 'annotations', 'resolvedAnnotationIds', 'signal', 'review']);
                        requireLearning(requestedReview === undefined || typeof requestedReview === 'boolean', 'review', 'Use true for a learner-requested review');
                        const attemptId = requested.attemptId;
                        const attempt = [profile.unit, profile.review].flatMap(unit => unit?.attempts ?? []).find(entry => entry.id === attemptId)
                            ?? profile.items.flatMap(item => item.evidence).find(entry => entry.attempt.id === attemptId)?.attempt;
                        // A workbench step that re-judges disputed feedback is that review; the dispute already asked for it.
                        const disputed = [profile.unit, profile.review].flatMap(unit => unit?.assessments ?? [])
                            .some(entry => entry.attemptId === attemptId && entry.verdict === 'disputed');
                        const review = action.kind === 'assess' && action.review && action.attemptId === attemptId
                            || disputed && (action.kind === 'grade' || action.kind === 'revision-review' || action.kind === 'review-assess');
                        requireLearning(requestedReview !== true || review, 'review', 'This request does not authorize reconsidering saved feedback');
                        requireLearning(attempt && canReadLearningScope(attempt.scope, accessOsId), 'attemptId', 'This attempt is outside the action reading scope');
                        // A workbench step grades only the answers it is waiting on.
                        const unitAttempt = profile.unit?.attempts.find(entry => entry.id === attemptId);
                        if (action.kind === 'assess') {
                            requireLearning(action.attemptId === attemptId, 'attemptId', 'Assess the answer selected for this request');
                        } else if (action.kind === 'grade') {
                            requireLearning(profile.unit?.id === action.unitId && unitAttempt && !unitAttempt.revisesAttemptId, 'attemptId', 'Grade the drafts of this reading-writing unit');
                        } else if (action.kind === 'revision-review') {
                            requireLearning(profile.unit?.id === action.unitId && unitAttempt?.revisesAttemptId, 'attemptId', 'Review the revisions of this reading-writing unit');
                        } else if (action.kind === 'review-assess') {
                            requireLearning(profile.review?.id === action.unitId && profile.review.attempts.some(entry => entry.id === attemptId), 'attemptId', 'Assess the answers of this review');
                        }
                        const result = assessLearning(profile, requested, { attemptId: attempt.id, review, inputScope, osId: options.osId, createId, now });
                        next.profiles[index] = result.profile;
                        ids = result.ids;
                    } else if (name === 'LearningModelEssay') {
                        const input = learningRecord(args, name, ['unitId', 'text', 'level']);
                        requireLearning(profile.unit && canReadLearningScope(profile.unit.scope, accessOsId), 'unitId', 'This unit is outside the action reading scope');
                        saveLearningModelEssay(profile, learningId(input.unitId, 'unitId'), { text: input.text, level: input.level }, now());
                        ids = [profile.unit.id];
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
                // Reject the particular edit that breaks a live reference, while the model can still repair it.
                if (nextPresentation) {
                    const profile = next.profiles.find(profile => profile.language === canonicalLanguage);
                    const unit = [profile?.unit, profile?.review].find(entry => entry?.id === nextPresentation!.unitId) ?? null;
                    requireLearning(unit?.id === nextPresentation.unitId, 'presentation', 'Present content from the current lesson');
                    nextPresentation = learningPresentation(unit, { kind: nextPresentation.kind, id: nextPresentation.id }, options.learnerMessage,
                        nextPresentation.kind === 'replacement' ? nextPresentation.unitKind : undefined);
                }
                for (const profile of next.profiles) {
                    const known = expected?.data.profiles.find(entry => entry.language === profile.language)?.completions ?? [];
                    for (const completion of profile.completions.filter(entry => !known.some(old => old.unitId === entry.unitId))) {
                        const unit = [profile.unit, profile.review].find(entry => entry?.id === completion.unitId);
                        requireLearning(unit?.id === completion.unitId && completion.attemptIds.every(id => unit.attempts.some(attempt => attempt.id === id)
                            && unit.assessments.some(assessment => assessment.attemptId === id && assessment.verdict !== 'disputed')),
                        'completion', 'Keep resolved feedback for each attempt cited by the completion');
                    }
                }
                const changed = JSON.stringify(next) !== JSON.stringify(staged);
                staged = next;
                presentation = nextPresentation;
                applied.add(name);
                return { ok: true, changed, ids, errors: [] };
            } catch (error) {
                if (!(error instanceof LearningValidationError)) { invalid = true; throw error; }
                const issue = { path: error.path, message: error.message };
                return { ok: false, changed: false, ids: [], errors: [issue], ...(error instanceof LearningReadingContentError ? { error: error.code } : {}) };
            }
        },
        async commit(guard: () => boolean) {
            active();
            sealed = true;
            // Read-only conversation never commits a stale copy of learning facts.
            if (isLearningConversation(action)) {
                return { status: guard() ? 'unchanged' as const : 'cancelled' as const, document: repository.snapshot().document ?? null };
            }
            if (action.kind === 'reading-notes' || action.kind === 'reading-essay') {
                const unit = staged.profiles.find(entry => entry.language === canonicalLanguage)!.unit!;
                return repository.supplement(canonicalLanguage, expected!.data.profiles.find(entry => entry.language === canonicalLanguage)!.unit!, unit, () => !invalid && guard());
            }
            return repository.save(expected, staged, () => !invalid && guard());
        },
        invalidate() { invalid = true; },
    };
}
