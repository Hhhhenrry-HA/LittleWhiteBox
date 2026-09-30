import { completeLearningByFacts } from './completion.js';
import { checkLearningAnnotations, parseLearningAssessment } from './facts.js';
import { learningRecord, learningText } from './profile.js';
import { selectLearningEvidence } from './progress.js';
import { advanceLearningSchedule, correctLearningSchedules, learningReviewQuality, learningScheduled, newLearningSchedule } from './schedule.js';
import { learningUnitStage } from './stage.js';
import { canReadLearningScope, LEARNING_LIMITS as L, type LearningAssessment, type LearningEvidence, type LearningItem, type LearningLanguage, type LearningScope, type LearningSkill, type LearningUnit } from './types.js';
import { combineLearningScope, learningArray, learningId, requireLearning, uniqueLearning } from './validation.js';

/**
 * The one copy of an attempt kept as item evidence. Reading-writing keeps it small: a summary keeps only its
 * paragraph and an essay keeps no article text, so a few long articles cannot fill the learning file.
 */
export function projectLearningEvidence(unit: LearningUnit, attemptId: string): LearningEvidence {
    const attempt = unit.attempts.find(entry => entry.id === attemptId);
    const assessment = unit.assessments.find(entry => entry.attemptId === attemptId);
    requireLearning(attempt && assessment, 'attemptId', 'Evidence needs a saved attempt with feedback');
    const exercise = unit.exercises.find(entry => entry.id === attempt.exerciseId)!;
    let materials = unit.materials.filter(material => exercise.materialIds.includes(material.id));
    if (unit.kind === 'reading-writing') {
        materials = exercise.paragraphId === undefined ? [] : materials.map(material => ({ ...material,
            paragraphs: material.paragraphs.filter(paragraph => paragraph.id === exercise.paragraphId) })).filter(material => material.paragraphs.length);
    }
    const kept = materials.map(material => material.id);
    return structuredClone({ unitId: unit.id, scope: assessment.scope,
        exercise: { ...exercise, materialIds: exercise.materialIds.filter(id => kept.includes(id)) }, materials, attempt, assessment });
}

/** The current unit or review that holds this attempt. */
export function learningUnitOfAttempt(profile: LearningLanguage, attemptId: string): LearningUnit | undefined {
    return [profile.unit, profile.review].find(unit => unit?.attempts.some(entry => entry.id === attemptId)) ?? undefined;
}

export function learningEvidence(profile: LearningLanguage, attemptId: string): LearningEvidence {
    const unit = learningUnitOfAttempt(profile, attemptId);
    if (!unit) {
        const archived = profile.items.flatMap(item => item.evidence).find(entry => entry.attempt.id === attemptId);
        requireLearning(archived, 'attemptId', 'Select a current attempt or retained learning evidence');
        return structuredClone(archived);
    }
    return projectLearningEvidence(unit, attemptId);
}

/** Replacing feedback also replaces every representative copy of that same attempt. */
export function replaceLearningAssessment(profile: LearningLanguage, assessment: LearningAssessment): void {
    const unit = learningUnitOfAttempt(profile, assessment.attemptId);
    if (unit) {
        const index = unit.assessments.findIndex(entry => entry.attemptId === assessment.attemptId);
        if (index < 0) { unit.assessments.push(assessment); } else { unit.assessments[index] = assessment; }
    }
    for (const item of profile.items) {
        item.evidence = item.evidence.map(entry => entry.attempt.id === assessment.attemptId
            ? { ...entry, assessment: structuredClone(assessment), scope: structuredClone(assessment.scope) } : entry);
    }
}

export function attachLearningEvidence(item: LearningItem, evidence: LearningEvidence): void {
    item.evidence = selectLearningEvidence([...item.evidence.filter(entry => entry.attempt.id !== evidence.attempt.id), structuredClone(evidence)]);
}

/**
 * A review answer moves its item's memory schedule once, with its evidence, in the save that records the judgement.
 * A changed judgement first withdraws this attempt's earlier move.
 */
export function scheduleLearningReview(profile: LearningLanguage, attemptId: string, now: string, rejudged = false): void {
    if (rejudged) { correctLearningSchedules(profile.items, attemptId, now); }
    const review = profile.review;
    const attempt = review?.attempts.find(entry => entry.id === attemptId);
    const assessment = review?.assessments.find(entry => entry.attemptId === attemptId);
    if (!review || !attempt || !assessment) { return; }
    const exercise = review.exercises.find(entry => entry.id === attempt.exerciseId)!;
    const item = profile.items.find(entry => entry.id === exercise.itemId);
    if (!item?.schedule) { return; }
    attachLearningEvidence(item, projectLearningEvidence(review, attemptId));
    const quality = learningReviewQuality(attempt, assessment);
    if (quality !== null) { item.schedule = advanceLearningSchedule(item.schedule, quality, attemptId, now); }
}

type ItemRef = { itemId: string | null; label: string | null };
function parseItemRef(value: unknown, path: string): ItemRef {
    const item = learningRecord(value, path, ['itemId', 'label']);
    return { itemId: item.itemId === undefined ? null : learningId(item.itemId, `${path}.itemId`),
        label: item.label === undefined ? null : learningText(item.label, `${path}.label`, L.goal) };
}

export function assessLearning(profile: LearningLanguage, args: unknown, options: {
    attemptId: string; review: boolean; inputScope: LearningScope; osId: string; createId: () => string; now?: () => string;
}): { profile: LearningLanguage; ids: string[] } {
    const input = learningRecord(args, 'LearningAssess', ['attemptId', 'verdict', 'understanding', 'expression', 'guidance', 'items', 'annotations', 'resolvedAnnotationIds', 'signal']);
    const attemptId = learningId(input.attemptId, 'attemptId');
    requireLearning(attemptId === options.attemptId, 'attemptId', 'This action evaluates its submitted attempt');
    const now = (options.now ?? (() => new Date().toISOString()))();
    const next = structuredClone(profile);
    const unit = learningUnitOfAttempt(next, attemptId);
    const currentAttempt = unit?.attempts.find(entry => entry.id === attemptId);
    const archived = currentAttempt ? null : next.items.flatMap(item => item.evidence).find(entry => entry.attempt.id === attemptId);
    const attempt = currentAttempt ?? archived?.attempt;
    requireLearning(attempt && canReadLearningScope(attempt.scope, options.osId), 'attemptId', 'Submit and save an available learner answer before evaluation');
    if (unit?.kind === 'reading-writing') {
        requireLearning(learningUnitStage(unit).stage !== 'writing', 'attemptId', 'Grade the reading-writing drafts together once every draft is written');
    }
    const scope = combineLearningScope(attempt.scope, options.inputScope);
    const { items: rawItems, annotations: rawAnnotations, ...rawAssessment } = input;
    const prior = currentAttempt ? unit!.assessments.find(entry => entry.attemptId === attemptId) : archived?.assessment;
    const evidenceOnly = prior && Object.keys(rawAssessment).length === 1 && rawAnnotations === undefined;
    const createItem = (label: string, skill: LearningSkill) => {
        const found = next.items.find(entry => entry.label === label && entry.skill === skill && JSON.stringify(entry.scope) === JSON.stringify(scope));
        if (found) { return found; }
        const item: LearningItem = { id: options.createId(), label, scope, skill, evidence: [], ...(learningScheduled(skill) ? { schedule: newLearningSchedule(now) } : {}) };
        next.items.push(item);
        return item;
    };
    const resolveItem = (ref: ItemRef, skill: LearningSkill, path: string) => {
        const item = ref.itemId === null ? null : next.items.find(entry => entry.id === ref.itemId);
        requireLearning(ref.itemId === null || item, `${path}.itemId`, 'Reference an existing learning item');
        if (item) {
            requireLearning(item.skill === skill, `${path}.itemId`, 'This attempt must train the same skill');
            if (ref.label !== null && ref.label !== item.label) {
                requireLearning(canReadLearningScope(item.scope, options.osId), `${path}.label`, 'A label from another story cannot be changed here');
                item.label = ref.label;
                item.scope = combineLearningScope(item.scope, scope);
            }
            return item;
        }
        requireLearning(ref.label, `${path}.label`, 'A new learning item needs a focused label');
        return createItem(ref.label, skill);
    };
    // Annotation items are resolved first, so the saved annotation names a real grammar or vocabulary item.
    const linked: LearningItem[] = [];
    const annotations = rawAnnotations === undefined ? undefined : learningArray(rawAnnotations, 'annotations', (value, path) => {
        const { item: rawRef, ...annotation } = learningRecord(value, path, ['category', 'severity', 'paragraphIndex', 'quote', 'explanation', 'suggestion', 'item']);
        if (rawRef === undefined) { return { id: options.createId(), ...annotation }; }
        const category = annotation.category;
        requireLearning(category === 'grammar' || category === 'vocabulary', `${path}.item`, 'Only grammar and vocabulary annotations link a learning item');
        const item = resolveItem(parseItemRef(rawRef, `${path}.item`), category, `${path}.item`);
        if (!linked.includes(item)) { linked.push(item); }
        return { id: options.createId(), ...annotation, itemId: item.id };
    }, L.annotations);
    const assessment = evidenceOnly ? prior : parseLearningAssessment({ ...rawAssessment, ...(annotations ? { annotations } : {}), scope });
    const rejudged = prior !== undefined && JSON.stringify(prior) !== JSON.stringify(assessment);
    requireLearning(!rejudged || options.review, 'attemptId', 'Existing feedback can be changed in an explicit review');
    requireLearning(!rejudged || !unit?.attempts.some(entry => entry.revisesAttemptId === attemptId), 'attemptId',
        'This draft has a revision that answered its feedback; review the revision instead');
    if (currentAttempt) {
        // Validate before any copy is made, so a wrong quote fails here with its own message.
        checkLearningAnnotations(assessment, currentAttempt);
    }
    const changes = learningArray(rawItems ?? [], 'items', parseItemRef, L.itemChanges);
    uniqueLearning(changes.flatMap(item => item.itemId === null ? [] : [item.itemId]), 'items');
    replaceLearningAssessment(next, assessment);
    const evidence = learningEvidence(next, attemptId);
    const ids = [attemptId];
    for (const change of changes) {
        const item = resolveItem(change, evidence.exercise.skill, 'items');
        if (!linked.includes(item)) { linked.push(item); }
    }
    for (const item of linked) { attachLearningEvidence(item, evidence); ids.push(item.id); }
    if (unit?.kind === 'review') { scheduleLearningReview(next, attemptId, now, rejudged); }
    else if (rejudged) {
        // A retained review answer that is re-judged moves its item again from the final verdict, unless a later
        // review has moved the item since (the dispute left it at the entry state with no attempt of its own).
        const item = next.items.find(entry => entry.id === archived?.exercise.itemId && entry.schedule
            && (entry.schedule.lastAttemptId === attemptId || prior?.verdict === 'disputed' && entry.schedule.lastAttemptId === null));
        correctLearningSchedules(next.items, attemptId, now);
        const quality = learningReviewQuality(attempt, assessment);
        if (item?.schedule && quality !== null) { item.schedule = advanceLearningSchedule(item.schedule, quality, attemptId, now); }
    }
    completeLearningByFacts(next, 'unit', now);
    completeLearningByFacts(next, 'review', now);
    return { profile: next, ids };
}
