import { assessLearning } from '../../../domains/learning/assessment.js';
import { completeLearning, saveLearningModelEssay } from '../../../domains/learning/completion.js';
import { parseLearningData } from '../../../domains/learning/data.js';
import { exposeLearningContent, sameLearningExerciseContent } from '../../../domains/learning/exposure.js';
import { learningRecord, LearningValidationError, parseLearningLanguageTag, parseLearningProfile } from '../../../domains/learning/profile.js';
import { canReadLearningScope, type LearningData, type LearningLanguage, type LearningScope, type LearningUnit, type RewardTier } from '../../../domains/learning/types.js';
import { learningId, learningIds, learningInteger, requireLearning } from '../../../domains/learning/validation.js';
import { LEARNING_REWARD_PRICES } from '../../../domains/learning/reward.js';
import { createLearningLessonCompiler } from '../application/lesson.js';
import { createLearningId } from '../application/identity.js';
import { learningPresentation, type LearningPresentation } from '../application/presentation.js';
import { confirmedLearning, type LearningRepository } from '../application/service.js';
import { createLearningSourceRegistry } from '../materials/lesson-sources.js';
import { readLearning } from './data-projection.js';
import { learningToolNamesFor } from './tool-contract.js';
import { isLearningConversation, learningReadAudience, learningReadUnit } from './access.js';
import { parseLearningDelegation, type LearningDelegation } from '../application/delegation.js';

/**
 * One request purpose, with only the capabilities belonging to that step.
 * Conversations may delegate an explicit request to the workbench; they do not own its writes.
 */
export type LearningAction =
    | { kind: 'profile' }
    | { kind: 'prepare'; replaceCurrent: boolean; unit?: 'reading-writing' | 'lesson'; prices?: Readonly<Record<RewardTier, number>> }
    | { kind: 'assess'; attemptId: string; review: boolean }
    | { kind: 'complete' }
    | { kind: 'explain' }
    | { kind: 'talk' }
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
    canDelegate?: () => boolean;
}) {
    const expected = confirmedLearning(repository);
    let saveExpected = expected;
    const action = structuredClone(options.action);
    const inputScope = structuredClone(options.inputScope);
    requireLearning(inputScope.kind === 'public' || inputScope.osId === options.osId, 'scope', 'Use the current story identity');
    const accessOsId = inputScope.kind === 'story' ? options.osId : null;
    const createId = options.createId ?? createLearningId;
    const now = options.now ?? (() => new Date().toISOString());
    const asOf = options.asOf ?? now();
    const canonicalLanguage = parseLearningLanguageTag(options.language, 'language');
    let staged: LearningData = structuredClone(expected?.data ?? { profiles: [] });
    const unitKey = learningReadUnit(action, staged.profiles.find(entry => entry.language === canonicalLanguage));
    let invalid = false;
    let sealed = false;
    let presentation: LearningPresentation | null = null;
    let help: { exerciseIds: string[]; materialIds: string[] } | null = null;
    let delegation: { operation: LearningDelegation; confirmation: boolean } | null = null;
    const applied = new Set<string>();
    const names = learningToolNamesFor(action);
    const sources = options.sources ?? createLearningSourceRegistry();
    const compileLesson = createLearningLessonCompiler({
        osId: options.osId, scope: inputScope, prices: action.kind === 'prepare' ? action.prices ?? LEARNING_REWARD_PRICES : LEARNING_REWARD_PRICES,
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
        helpDeclared: () => help !== null,
        helpIsPublished() {
            if (!help) { return false; }
            const proposed = staged.profiles.find(entry => entry.language === canonicalLanguage)?.[unitKey];
            const published = saveExpected?.data.profiles.find(entry => entry.language === canonicalLanguage)?.[unitKey];
            return help.exerciseIds.every(id => published?.revealed.hints.includes(id) && sameLearningExerciseContent(published, proposed, id))
                && help.materialIds.every(id => published?.materials.some(entry => entry.id === id && entry.transcriptRevealed
                    && JSON.stringify(entry.paragraphs) === JSON.stringify(proposed?.materials.find(material => material.id === id)?.paragraphs)));
        },
        markExplained(exerciseId: string) {
            active();
            const profile = staged.profiles.find(profile => profile.language === canonicalLanguage);
            const unit = profile?.[unitKey];
            requireLearning(unit && canReadLearningScope(unit.scope, accessOsId)
                && unit.exercises.some(exercise => exercise.id === exerciseId), 'exerciseId', 'Select an available exercise');
            exposeLearningContent(profile!, 'hints', exerciseId, unit);
        },
        async saveHelp(guard: () => boolean) {
            active();
            if (isLearningConversation(action)) {
                // A workbench save may have completed since the message arrived. Record the help against
                // the current file, but only for the identical content actually read by this conversation.
                saveExpected = confirmedLearning(repository);
                const live = saveExpected?.data.profiles.find(entry => entry.language === canonicalLanguage)?.[unitKey];
                const read = staged.profiles.find(entry => entry.language === canonicalLanguage)?.[unitKey];
                requireLearning((help?.exerciseIds ?? []).every(id => sameLearningExerciseContent(live, read, id))
                    && (help?.materialIds ?? []).every(id => live?.id === read?.id && live?.materials.some(material => material.id === id
                        && JSON.stringify(material.paragraphs) === JSON.stringify(read?.materials.find(entry => entry.id === id)?.paragraphs))),
                'help', 'The content changed while this reply was being prepared; use the current material in a new exchange');
            }
            const data = structuredClone(saveExpected?.data ?? { profiles: [] });
            const profile = data.profiles.find(entry => entry.language === canonicalLanguage);
            const proposed = staged.profiles.find(entry => entry.language === canonicalLanguage)?.[unitKey];
            const published = profile?.[unitKey];
            // Only exposure of already-published content survives an interrupted teaching turn.
            if (profile && published && proposed?.id === published.id) {
                for (const kind of ['answers', 'hints'] as const) {
                    for (const id of proposed.revealed[kind]) {
                        if (sameLearningExerciseContent(published, proposed, id)) { exposeLearningContent(profile, kind, id, published); }
                    }
                }
                for (const material of proposed.materials) {
                    const original = published.materials.find(entry => entry.id === material.id);
                    if (material.transcriptRevealed && original && JSON.stringify(material.paragraphs) === JSON.stringify(original.paragraphs)) {
                        exposeLearningContent(profile, 'transcripts', material.id, published);
                    }
                }
            }
            const result = await repository.save(saveExpected, data, () => !invalid && guard());
            if (result.status === 'confirmed' || result.status === 'unchanged') { saveExpected = result.document; }
            return result;
        },
        executeTool(name: string, args: unknown): unknown {
            active();
            let nextPresentation = presentation;
            try {
                requireLearning(names.includes(name), 'tool', 'This tool is not available for the current learning action');
                if (name === 'LearningRequest') {
                    requireLearning(action.kind === 'talk' || action.kind === 'explain', 'action', 'Only a learner-initiated conversation can request a workbench action');
                    if (options.canDelegate && !options.canDelegate()) { return { ok: false, status: 'busy' }; }
                    const profile = staged.profiles.find(entry => entry.language === canonicalLanguage);
                    const requested = parseLearningDelegation(args, options.learnerMessage ?? '', profile?.unit?.id);
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
                if (name === 'LearningHelp') {
                    const input = learningRecord(args, name, ['exerciseIds', 'materialIds']);
                    const exerciseIds = learningIds(input.exerciseIds, 'exerciseIds');
                    const materialIds = learningIds(input.materialIds, 'materialIds');
                    const next = structuredClone(staged);
                    const profile = next.profiles.find(entry => entry.language === canonicalLanguage);
                    const unit = profile?.[unitKey];
                    requireLearning(!exerciseIds.length && !materialIds.length || unit && canReadLearningScope(unit.scope, accessOsId), 'unit', 'Select the unit available to this request');
                    for (const id of exerciseIds) { exposeLearningContent(profile!, 'hints', id, unit); }
                    for (const id of materialIds) { exposeLearningContent(profile!, 'transcripts', id, unit); }
                    const changed = JSON.stringify(next) !== JSON.stringify(staged);
                    staged = next;
                    help = { exerciseIds: [...new Set([...(help?.exerciseIds ?? []), ...exerciseIds])],
                        materialIds: [...new Set([...(help?.materialIds ?? []), ...materialIds])] };
                    applied.add(name);
                    return { ok: true, changed, ids: [...exerciseIds, ...materialIds], errors: [] };
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
                    if (name === 'LearningPresent') {
                        const target = learningPresentation(profile.unit, args, options.learnerMessage, action.kind === 'prepare' ? action.unit : undefined);
                        requireLearning(target.kind === 'replacement' || profile.unit && canReadLearningScope(profile.unit.scope, accessOsId), 'unit', 'Choose a lesson available in this classroom');
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
                        const confirmed = saveExpected?.data.profiles.find(entry => entry.language === canonicalLanguage);
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
                    const unit = next.profiles.find(profile => profile.language === canonicalLanguage)?.unit ?? null;
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
                if (name === 'LearningLessonEdit' && changed) { help = null; }
                presentation = nextPresentation;
                applied.add(name);
                return { ok: true, changed, ids, errors: [] };
            } catch (error) {
                if (!(error instanceof LearningValidationError)) { invalid = true; throw error; }
                // An unsuccessful replacement declaration cannot leave an older scope authorizing new text.
                if (name === 'LearningHelp') { help = null; }
                const issue = { path: error.path, message: error.message };
                return { ok: false, changed: false, ids: [], errors: [issue] };
            }
        },
        async commit(guard: () => boolean) {
            active();
            sealed = true;
            // Conversation help has already passed its own save boundary. Replaying its old snapshot here
            // would race the workbench and could overwrite an assessment that finished while we were chatting.
            if (isLearningConversation(action)) {
                const snapshot = repository.snapshot();
                if (!guard()) { return { status: 'cancelled' as const }; }
                if (snapshot.status !== 'ready') { return { status: snapshot.status === 'unconfirmed' ? 'unconfirmed' as const : 'conflict' as const }; }
                return { status: 'unchanged' as const, document: snapshot.document ?? null };
            }
            return repository.save(saveExpected, staged, () => !invalid && guard());
        },
        invalidate() { invalid = true; },
    };
}
