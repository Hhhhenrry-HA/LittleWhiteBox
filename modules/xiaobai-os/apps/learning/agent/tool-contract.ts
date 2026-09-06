import { LEARNING_LIMITS as L, LEARNING_SKILLS } from '../../../domains/learning/types.js';
import { learningToolNames, type LearningAction } from './session.js';

const text = (maxLength: number, description: string) => ({ type: 'string', maxLength, description });
const id = (description: string) => text(128, description);
const enumeration = (values: readonly string[], description: string) => ({ type: 'string', enum: values, description });
const list = (items: object, maxItems: number, description: string) => ({ type: 'array', items, maxItems, description });
const object = (properties: Record<string, unknown>, required: string[] = []) => ({ type: 'object', properties, required, additionalProperties: false });
const option = object({ id: id('Identifier within this exercise.'), text: text(L.prompt, 'Visible option or gap label.') }, ['id', 'text']);
const answer = object({
    kind: enumeration(['choice', 'order', 'match', 'evidence', 'gaps', 'text'], 'The exercise response form.'),
    ids: list(id('Option or paragraph ID. Order uses the complete ordered sequence; choice and evidence use a set.'), L.pairs, 'For choice, order or evidence.'),
    pairs: list(object({ left: id('Left option ID.'), right: id('Right option ID.') }, ['left', 'right']), L.pairs, 'For match: one unique partner for every left option.'),
    values: list(object({ id: id('Gap ID.'), text: text(L.answer, 'Answer text.') }, ['id', 'text']), L.gaps, 'For gaps: every slot once.'),
    text: text(L.answer, 'For free text.'),
}, ['kind']);
const response = object({
    kind: enumeration(['choice', 'order', 'match', 'evidence', 'gaps', 'text'], 'Native answer control; the trained skill is a separate field.'),
    options: list(option, L.pairs, `For choice or order. Choice has 2–${L.options} options; order has 2–${L.pairs}.`),
    multiple: { type: 'boolean', description: 'Required for choice: whether several options may be selected.' },
    left: list(option, L.pairs, 'For match: 2 or more left options.'),
    right: list(option, L.pairs, 'For match: the same number of right options, paired one-to-one.'),
    materialKey: id('For evidence: the lesson material key; learners select its paragraph IDs.'),
    slots: list(option, L.gaps, 'For gaps: 1 or more separately answered slots.'),
}, ['kind']);
const rule = object({
    kind: enumeration(['semantic', 'exact', 'gaps'], 'Semantic evaluates meaning; exact compares option IDs; gaps compares accepted written forms.'),
    answer,
    accepted: list(object({ id: id('Gap ID.'), forms: list(text(L.answer, 'One accepted form.'), L.acceptedForms, 'At least one accepted form.') }, ['id', 'forms']), L.gaps, 'For gaps: accepted forms for every slot.'),
    caseSensitive: { type: 'boolean', description: 'For gaps: whether letter case must match.' },
    punctuationSensitive: { type: 'boolean', description: 'For gaps: whether Unicode punctuation must match. Other characters are retained; surrounding whitespace is ignored.' },
    explanation: text(L.explanation, 'Required for exact and gaps: explanation shown immediately after submission.'),
}, ['kind']);

const mutationResult = [
    'Returns {ok,changed,ids,errors:[{path,message}]}. IDs identify the affected draft entities; changed:false with ok:true is success.',
    'Each call is atomic. Successful changes remain in the current draft until this teaching action is saved.',
    'errors also lists unresolved failed proposals. Correct the same tool call, or send discard:true alone to withdraw this tool’s failed proposals; this leaves earlier successful changes intact.',
].join('\n');
const discard = { type: 'boolean', description: 'Send true alone to withdraw an unresolved failed proposal from this tool.' };

const tools = [
    { type: 'function', function: {
        name: 'LearningRead',
        description: [
            'Read the current learning draft within this action’s permitted sources, including successful changes.',
            'Returns {section,data,nextOffset,omitted}. overview gives the profile, current unit references and item count; unit gives the full current lesson when it fits. Other sections return arrays.',
            'Use materials for paragraph pages, exercises for full questions and answer rules, attempts for current real answers with available feedback, items for progress, evidence for retained practice, and completions for past wrap-ups.',
            'Material pages include textOffset in Unicode code points and textComplete. Long paragraphs span several page entries with the same paragraph ID; concatenate them in offset order. A material ID from retained evidence can also be read.',
            'Cross-story items expose only structured skill conclusions when their label or practice is private. A blocked current unit remains in its original story.',
            `Default section overview, offset 0, limit ${L.readDefault}; maximum limit ${L.readMax}. Follow nextOffset until null. An oversized unit can be read through its separate sections.`,
        ].join('\n'),
        parameters: object({ section: enumeration(['overview', 'unit', 'materials', 'exercises', 'attempts', 'items', 'evidence', 'completions'], 'Reading section.'),
            id: id('Optional filter: material, exercise, attempt, item or completed unit ID. In evidence, use the item ID.'),
            offset: { type: 'integer', minimum: 0 }, limit: { type: 'integer', minimum: 1, maximum: L.readMax } }),
    } },
    { type: 'function', function: {
        name: 'LearningProfileEdit',
        description: `Update the learner’s stated goal or self-assessment during an authorized profile change. Omitted fields keep their values. A first profile needs explanationLanguage, selfAssessment and goal.description.\n${mutationResult}`,
        parameters: object({ discard, explanationLanguage: text(80, 'Language tag for explanations.'), selfAssessment: text(L.goal, 'The learner’s own account, including uncertainty.'),
            goal: object({ description: text(L.goal, 'What the learner wants to become able to do.'),
                exam: { anyOf: [text(80, 'Exam name.'), { type: 'null' }], description: 'Omit to keep; null clears.' },
                targetLevel: { anyOf: [text(80, 'Level in the learner’s chosen framework.'), { type: 'null' }], description: 'Omit to keep; null clears.' },
                targetDate: { anyOf: [text(10, 'Calendar date YYYY-MM-DD.'), { type: 'null' }], description: 'Omit to keep; null clears.' } }) }),
    } },
    { type: 'function', function: {
        name: 'LearningLessonEdit',
        description: [
            'Prepare or replace this action’s unpublished lesson as a complete unit. Supply title, goal, tier, materials and exercises together.',
            'Published lessons remain unchanged; a new lesson begins only through a learner-initiated preparation. Reusing local keys during preparation keeps the returned material/exercise identities.',
            'The app fixes the reward from tier when publishing. Short focuses on a small objective; regular combines understanding and use; deep is more substantial integrated practice relative to this learner.',
            'Original material is copied from extracted source paragraphs. Adapted text is labelled teaching adaptation; authored text is labelled original teaching material.',
            'Returns IDs in unit, material, exercise order. Read the updated draft for their full relationships.', mutationResult,
        ].join('\n'),
        parameters: object({ discard, title: text(L.name, 'Lesson title.'), goal: text(L.goal, 'One concrete learning objective.'),
            tier: enumeration(['short', 'regular', 'deep'], 'Lesson workload relative to the learner.'),
            materials: list(object({ key: id('Local reference used by exercise materialKeys.'), title: text(L.name, 'Material title.'),
                kind: enumeration(['original', 'adapted', 'authored'], 'Source relationship.'), sourceId: id('For original or adapted: an extracted source ID.'),
                from: { type: 'integer', minimum: 1, description: 'Original excerpt: first paragraph, 1-based.' },
                through: { type: 'integer', minimum: 1, description: 'Original excerpt: inclusive last paragraph.' },
                text: text(L.materialText, 'For adapted or authored: complete text with blank lines between paragraphs. Original uses source ranges.') }, ['key', 'title', 'kind']), L.materials, 'Materials actually needed by this lesson. May be empty for standalone practice.'),
            exercises: list(object({ key: id('Local exercise key, retained during corrections.'), skill: enumeration(LEARNING_SKILLS, 'Skill actually trained by the response.'),
                materialKeys: list(id('A material key from this call.'), L.materials, 'Materials required to answer; may be empty.'),
                prompt: text(L.prompt, 'Question and response requirements.'), response, rule, hint: text(L.explanation, 'Optional hint, revealed only on request; omission gives no hint.') },
            ['key', 'skill', 'materialKeys', 'prompt', 'response', 'rule']), L.exercises, 'At least one substantive exercise. Text and ambiguous answers use semantic evaluation.') }),
    } },
    { type: 'function', function: {
        name: 'LearningAssess',
        description: [
            'Evaluate this action’s saved learner attempt. Supply attemptId, verdict, understanding, expression and guidance; items may be omitted.',
            'Understanding and expression are separate: a sound idea with weak language is not a failure to understand. Disputed feedback is excluded from progress conclusions until reviewed.',
            'Existing feedback changes only in an explicit review, including retained practice from earlier units. Items attach this actual attempt as evidence; the app derives independence and review timing from the saved conditions.',
            'To attach learning items to existing feedback without changing its judgment, send only attemptId and items. This is also available during wrap-up after locally checked exercises.',
            `At most ${L.itemChanges} item changes per call. A new item needs a focused label; existing itemId retains its label unless a replacement is supplied.`, mutationResult,
        ].join('\n'),
        parameters: object({ discard, attemptId: id('The submitted attempt named by this action.'),
            verdict: enumeration(['correct', 'partial', 'incorrect', 'disputed'], 'Judgment against the published objective; disputed means the answer or question still needs review.'),
            understanding: text(L.explanation, 'Feedback on meaning; empty when not applicable.'), expression: text(L.explanation, 'Feedback on language use; empty when not applicable.'),
            guidance: text(L.explanation, 'Specific explanation and a useful next step.'),
            items: list(object({ itemId: id('Existing learning item; omit to create or reuse this label in the same scope and skill.'), label: text(L.goal, 'One expression, rule or strategy that can be practised again.') }), L.itemChanges, 'Evidence-based learning items, not a list extracted from every word in the text.') }),
    } },
    { type: 'function', function: {
        name: 'LearningComplete',
        description: [
            'Wrap up the current unit when actual practice and feedback have sufficiently served its objective. Supply unitId, attemptIds and summary.',
            'One substantive exercise may be enough. Incorrect answers and help do not remove completion eligibility; completion is separate from independent mastery.',
            'Each cited attempt needs resolved, available feedback; valid feedback from LearningAssess in this action can be used. Completion and related feedback are saved together before reward settlement.',
            'An already completed unit keeps its original completion and reward. This tool does not change the published reward or make a payment.', mutationResult,
        ].join('\n'),
        parameters: object({ discard, unitId: id('Current unit ID.'), attemptIds: list(id('Actual attempt with resolved feedback in this unit.'), L.exercises, 'Evidence for this wrap-up, at least one attempt.'),
            summary: text(L.explanation, 'A learner-facing account of what was practised, what improved and what to revisit.') }),
    } },
];

export function learningTools(action: LearningAction) {
    const names = learningToolNames(action);
    return structuredClone(tools.filter(tool => names.includes(tool.function.name)));
}
