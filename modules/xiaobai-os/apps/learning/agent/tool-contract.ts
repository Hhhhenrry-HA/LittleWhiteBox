import { LEARNING_ANNOTATION_CATEGORIES, LEARNING_LIMITS as L, LEARNING_SKILLS } from '../../../domains/learning/types.js';
import type { LearningAction } from './session.js';
import { LEARNING_DELEGATED_ACTIONS } from '../application/delegation.js';
import { learningPreparationTools, learningPreparationTool } from './preparation-tools.js';

const text = (maxLength: number, description: string) => ({ type: 'string', maxLength, description });
const nullableText = (maxLength: number, description: string) => ({ anyOf: [text(maxLength, description), { type: 'null' }], description: 'Omit to keep; null clears.' });
const id = (description: string) => text(128, description);
const enumeration = (values: readonly string[], description: string) => ({ type: 'string', enum: values, description });
const list = (items: object, maxItems: number | undefined, description: string) => ({ type: 'array', items, ...(maxItems === undefined ? {} : { maxItems }), description });
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
    'A failed call returns only its own errors and changes nothing. Read the result, then correct the call, choose another approach or explain the obstacle to the learner.',
].join('\n');

const tools = [
    { type: 'function', function: {
        name: 'LearningRequest',
        description: [
            'Carry out a workbench operation the learner explicitly asks for in this message. Quote their instruction; a complaint, question or discussion of possibilities is not a request to change their training.',
            'Returns {ok,status}: requested means the app will run the operation after this reply, confirmation means replacing the unfinished lesson awaits the learner’s confirmation, and busy means an existing workbench operation must finish first. A request is not a completed operation; one exchange can request one operation.',
            'prepare starts reading-writing by default, or a focused lesson when kind is lesson; start-review selects the algorithm’s due items. grade submits saved drafts for assessment; complete checks a focused lesson’s completion.',
            'settings changes only supplied preferences through value. submit records this exact learner message as the answer to exerciseId, without a model-authored answer. assess asks to reconsider attemptId. These operations use the same validation and save path as the workbench controls.',
        ].join('\n'),
        parameters: object({ action: enumeration(LEARNING_DELEGATED_ACTIONS, 'Requested workbench operation.'),
            instruction: text(L.answer, 'Exact words in the current learner message requesting the operation.'),
            kind: enumeration(['reading-writing', 'lesson'], 'For prepare; default reading-writing.'),
            exerciseId: id('For submit: the published text exercise the message answers.'), attemptId: id('For assess: the saved answer to reconsider.'),
            value: object({ exam: nullableText(80, 'Exam name.'), level: nullableText(80, 'Current self-assessed level.'), targetLevel: nullableText(80, 'Desired level.'),
                explanationLanguage: text(80, 'Language tag for explanations.'), interests: nullableText(L.goal, 'Topics requested by the learner.') }) }, ['action', 'instruction']),
    } },
    { type: 'function', function: {
        name: 'LearningPresent',
        description: [
            'Open a material reader, exercise window or lesson-replacement confirmation alongside your reply. For teaching content, choose an ID returned by LearningRead after preparing it.',
            'Use when the learner is ready to read a passage, hear audio or answer a question. Choose one useful activity at a time and continue from its result in conversation; saved content can remain available without opening a window.',
            'For a learner who wants a different lesson, kind:replacement asks them to confirm putting the current lesson aside. It needs no id and can also replace a lesson from another story without reading it. Confirmation starts preparation from this learner message; the current lesson stays until the new one is saved.',
            'The last successful presentation in this turn selects one window. It opens only after the teaching turn is saved; closing it returns to the conversation, and its link can reopen it.',
            mutationResult,
        ].join('\n'),
        parameters: object({ kind: enumeration(['material', 'exercise', 'replacement'], 'What the learner will open.'), id: id('Required for material or exercise: its existing ID in the current lesson. Omit for replacement.') }),
    } },
    { type: 'function', function: {
        name: 'LearningRead',
        description: [
            'Read the current learning draft within this action’s permitted sources, including successful changes.',
            'Review preparation and assessment read the review group; other requests read the current lesson. The injected training and these reading sections refer to the same unit.',
            'Returns {section,data,nextOffset,omitted}. overview gives the profile, current unit references, item count and progress across all retained items: counts by skill/state, due counts, completed lesson count and latest readable completion. training gives the complete published reading surface also supplied in learning_request.training; unit adds saved attempts and notes when it fits. Other sections return arrays.',
            'Use materials for paragraph pages, exercises for questions, attempts for current real answers with available feedback, items for progress, evidence for retained practice, and completions for past wrap-ups. Conversation reads only published questions, hints and listening text; teaching requests may also read their answer rules.',
            'review gives items due at the current request time, oldest first, with the same progress fields as items. It also returns asOf and total; follow nextOffset for the rest of the due items.',
            'notes gives saved explanations; listening gives actual playback facts. Filter either by exercise ID. Exercises include their answer/hint exposure, and materials include transcriptRevealed; these describe the conditions of future practice.',
            'sources lists articles extracted in this classroom as {id,title,url,paragraphs}; LearningExtract reads them by sourceId. This runtime catalog is separate from saved lesson materials.',
            'Material pages include textOffset in Unicode code points and textComplete. Long paragraphs span several page entries with the same paragraph ID; concatenate them in offset order. A material ID from retained evidence can also be read.',
            'Cross-story items expose only structured skill conclusions when their label or practice is private. A blocked current unit remains in its original story.',
            `Default section overview, offset 0, limit ${L.readDefault}; maximum limit ${L.readMax}. Follow nextOffset until null. An oversized unit can be read through its separate sections.`,
        ].join('\n'),
        parameters: object({ section: enumeration(['overview', 'training', 'unit', 'materials', 'exercises', 'attempts', 'notes', 'listening', 'items', 'review', 'evidence', 'completions', 'sources'], 'Reading section.'),
            id: id('Optional filter: material, exercise, attempt, item or completed unit ID. In evidence, use the item ID.'),
            offset: { type: 'integer', minimum: 0 }, limit: { type: 'integer', minimum: 1, maximum: L.readMax } }),
    } },
    { type: 'function', function: {
        name: 'LearningProfileEdit',
        description: [
            'Change the learner’s saved preferences or goal when they ask for it in this conversation: a different explanation language, interests for choosing articles, or a newly stated goal or self-assessment.',
            'The learner picks the language and companion in the app, and sets level, target level and exam in the app’s settings. Practice-based conclusions are recorded by LearningAssess and leave these stated preferences unchanged.',
            'Omitted fields keep their values; null clears a nullable field.', mutationResult,
        ].join('\n'),
        parameters: object({ explanationLanguage: text(80, 'Language tag for explanations.'), selfAssessment: text(L.goal, 'The learner’s own account, including uncertainty.'),
            interests: { anyOf: [text(L.goal, 'Topics the learner enjoys reading about.'), { type: 'null' }], description: 'Omit to keep; null clears.' },
            goal: object({ description: text(L.goal, 'What the learner wants to become able to do.'),
                exam: { anyOf: [text(80, 'Exam name.'), { type: 'null' }], description: 'Omit to keep; null clears.' },
                targetLevel: { anyOf: [text(80, 'Level in the learner’s chosen framework.'), { type: 'null' }], description: 'Omit to keep; null clears.' },
                targetDate: { anyOf: [text(10, 'Calendar date YYYY-MM-DD.'), { type: 'null' }], description: 'Omit to keep; null clears.' } }) }),
    } },
    { type: 'function', function: {
        name: 'LearningLessonEdit',
        description: [
            'Create or incrementally adapt the current unit when the learner requests concrete practice or materials, agrees to a proposed activity, or is continuing that activity. Discussing their level, goals or possible approaches does not by itself call for a lesson.',
            'kind is chosen when a unit is created and stays with it. lesson is focused practice that you wrap up with LearningComplete.',
            'reading-writing is one article read paragraph by paragraph. The app supplies a summary exercise for each paragraph. Explanations and the final essay may be added after the article is published.',
            'Each paragraph explanation covers useful vocabulary, reusable writing phrases and structures, grammar and coherence at this learner’s level. The final essay asks for a viewpoint, reflection or reasoned response grounded in the article, around 300 words (characters for Chinese or Japanese); state the unit in its prompt.',
            'review asks exactly one question per due item listed in the request, each naming its itemId. The app sets a review’s reward from its item count.',
            'Paragraph IDs are p1, p2, … following the blank-line-separated paragraphs of the material text.',
            'Create only what the current activity needs. A short explanation or conversational example can stay in your reply without becoming saved reading material.',
            'A first unit needs title, goal, tier (except review) and at least one complete exercise; reading-writing receives its summary exercises from the app. Materials may be empty for a lesson or review. After that, omitted fields and unmentioned materials/exercises stay unchanged.',
            'Each supplied material or exercise is a complete upsert. Use its saved ID as key to update it, or a new local key to add it. Local keys remain usable through this teacher turn; later turns use the IDs returned by LearningRead.',
            'Answered exercises, played listening exercises and materials supporting learner evidence keep their original content. Add a corrected or easier alternative with a new key. Unused content can be removed by ID; every remaining exercise must retain its required materials.',
            'Use newLesson:true to begin another lesson after the previous completion has been saved in an earlier turn. For an unfinished lesson, LearningPresent with kind:replacement requests learner confirmation; a prepare action with replaceCurrent:true then authorizes a fresh lesson. Otherwise adapt the current lesson; published rewards and objectives attached to saved answers stay fixed.',
            'The app fixes the reward from tier when publishing. Short focuses on a small objective; regular combines understanding and use; deep is more substantial integrated practice relative to this learner.',
            'Original material is copied from extracted source paragraphs. Adapted text is labelled teaching adaptation; authored text is labelled original teaching material.',
            'Returns IDs in unit, material, exercise order. Read the updated draft for their full relationships.', mutationResult,
        ].join('\n'),
        parameters: object({ newLesson: { type: 'boolean', description: 'Default false. Start a fresh lesson after a previously saved completion; include all first-lesson fields.' },
            kind: enumeration(['lesson', 'reading-writing', 'review'], 'Unit type, chosen when the unit is created. Default lesson.'),
            title: text(L.name, 'Lesson title.'), goal: text(L.goal, 'One concrete learning objective.'),
            tier: enumeration(['short', 'regular', 'deep'], 'Lesson workload relative to the learner. A review takes its tier from its item count.'),
            explanations: list(object({ materialKey: id('The article’s material ID or local key.'), paragraphId: id('Paragraph ID, such as p1.'),
                explanation: text(L.explanation, 'What the paragraph says and how its language works, in the explanation language.'),
                terms: list(object({ text: text(L.name, 'A word or phrase as it appears in the paragraph.'), note: text(L.explanation, 'Meaning and usage in this context.') }, ['text', 'note']),
                    L.terms, 'Terms worth learning here; the learner can bookmark each one for review.') },
            ['materialKey', 'paragraphId', 'explanation', 'terms']), undefined, 'Reading-writing only: the complete list, one entry per paragraph in order. Omit to keep the saved explanations.'),
            removeMaterials: list(id('Saved material ID.'), undefined, 'Remove unused materials. Missing IDs are already removed.'),
            removeExercises: list(id('Saved exercise ID.'), undefined, 'Remove unused exercises. Missing IDs are already removed.'),
            materials: list(object({ key: id('Saved material ID to update, or a new local key to create.'), title: text(L.name, 'Material title.'),
                kind: enumeration(['original', 'adapted', 'authored'], 'Source relationship.'), sourceId: id('For original or adapted: an extracted source ID.'),
                from: { type: 'integer', minimum: 1, description: 'Original excerpt: first paragraph, 1-based.' },
                through: { type: 'integer', minimum: 1, description: 'Original excerpt: inclusive last paragraph.' },
                text: text(L.materialText, 'For adapted or authored: complete text with blank lines between paragraphs. Original uses source ranges.') }, ['key', 'title', 'kind']), undefined, 'Materials to add or update. Unmentioned materials stay unchanged.'),
            exercises: list(object({ key: id('Saved exercise ID to update, or a new local key to create.'), skill: enumeration(LEARNING_SKILLS, 'Skill actually trained by the response.'),
                materialKeys: list(id('A current material ID or local key from this turn.'), undefined, 'Materials required to answer; may be empty.'),
                prompt: text(L.prompt, 'Question and response requirements.'), response, rule, hint: text(L.explanation, 'Optional hint, revealed only on request; omission gives no hint.'),
                paragraphId: id('Reading-writing summary: the paragraph it summarises. Omit for the essay and in other units.'),
                itemId: id('Review: the due item this question reviews. Omit in other units.') },
            ['key', 'skill', 'materialKeys', 'prompt', 'response', 'rule']), undefined, 'Exercises to add or update. Text and ambiguous answers use semantic evaluation.') }),
    } },
    { type: 'function', function: {
        name: 'LearningAssess',
        description: [
            'Evaluate an actual saved learner attempt supplied by the workbench request. Supply attemptId, verdict, understanding, expression and guidance; items may be omitted.',
            'Understanding and expression are separate: a sound idea with weak language is not a failure to understand. Disputed feedback is excluded from progress conclusions until reviewed.',
            'Annotations mark the learner’s written answer. Each quotes words that appear in one paragraph of that answer; paragraphIndex counts its non-blank lines from 0. error and improve ask for a revision; alternative only offers another wording. A grammar or vocabulary annotation can link a learning item, which is then scheduled for review.',
            'Feedback on a revision lists in resolvedAnnotationIds the draft annotations the revision has fixed. Feedback on a review answer includes signal: clean, hesitant (a small slip or visible hesitation) or blank (no real attempt). The app derives the review schedule from verdict, signal and the help used.',
            'Existing feedback changes only in an explicit review, including retained practice from earlier units. Items attach this actual attempt as evidence; the app derives independence and review timing from the saved conditions.',
            'To attach learning items to existing feedback without changing its judgment, send only attemptId and items during the assessment request for that answer.',
            'A review group completes by itself once every answer has feedback; a reading-writing unit completes once its model essay is saved.',
            `At most ${L.itemChanges} item changes and ${L.annotations} annotations per call. A new item needs a focused label; existing itemId retains its label unless a replacement is supplied.`, mutationResult,
        ].join('\n'),
        parameters: object({ attemptId: id('An available saved attempt ID from the current request or LearningRead.'),
            review: { type: 'boolean', description: 'Optional acknowledgment of a review already authorized by this request or disputed feedback. Default false; true does not grant permission to reconsider other feedback.' },
            verdict: enumeration(['correct', 'partial', 'incorrect', 'disputed'], 'Judgment against the published objective; disputed means the answer or question still needs review.'),
            understanding: text(L.explanation, 'Feedback on meaning; empty when not applicable.'), expression: text(L.explanation, 'Feedback on language use; empty when not applicable.'),
            guidance: text(L.explanation, 'Specific explanation and a useful next step.'),
            annotations: list(object({ category: enumeration(LEARNING_ANNOTATION_CATEGORIES, 'What the note concerns.'),
                severity: enumeration(['error', 'improve', 'alternative'], 'error is wrong; improve works but can be better; alternative is an optional other wording.'),
                paragraphIndex: { type: 'integer', minimum: 0, description: 'Paragraph of the learner’s answer, counting non-blank lines from 0.' },
                quote: text(L.quote, 'The learner’s exact words in that paragraph.'), explanation: text(L.explanation, 'Why, in the explanation language.'),
                suggestion: text(L.explanation, 'Better wording; may be empty for a content note.'),
                item: object({ itemId: id('Existing grammar or vocabulary item.'), label: text(L.goal, 'Label for a new item, or a replacement label.') }) },
            ['category', 'severity', 'paragraphIndex', 'quote', 'explanation', 'suggestion']), L.annotations, 'Marks on a written answer.'),
            resolvedAnnotationIds: list(id('Annotation ID from the draft’s feedback.'), L.annotations, 'Revision feedback: draft annotations the revision has fixed.'),
            signal: enumeration(['clean', 'hesitant', 'blank'], 'Review-answer feedback: how the answer came.'),
            items: list(object({ itemId: id('Existing learning item; omit to create or reuse this label in the same scope and skill.'), label: text(L.goal, 'One expression, rule or strategy that can be practised again.') }), L.itemChanges, 'Evidence-based learning items, not a list extracted from every word in the text.') }),
    } },
    { type: 'function', function: {
        name: 'LearningComplete',
        description: [
            'Wrap up the current lesson unit when actual practice and feedback have sufficiently served its objective. Supply unitId, attemptIds and summary. Reading-writing and review units complete by themselves from their saved steps.',
            'One substantive exercise may be enough. Incorrect answers and help do not remove completion eligibility; completion is separate from independent mastery.',
            'Each cited attempt needs resolved, available feedback; valid feedback from LearningAssess in this action can be used. Completion and related feedback are saved together before reward settlement.',
            'An already completed unit keeps its original completion and reward. This tool does not change the published reward or make a payment.', mutationResult,
        ].join('\n'),
        parameters: object({ unitId: id('Current unit ID.'), attemptIds: list(id('Actual attempt with resolved feedback in this unit.'), undefined, 'Evidence for this wrap-up, at least one attempt.'),
            summary: text(L.explanation, 'A learner-facing account of what was practised, what improved and what to revisit.') }),
    } },
    { type: 'function', function: {
        name: 'LearningModelEssay',
        description: [
            'Save the model essay that closes a reading-writing unit, once every draft is graded and any revision has been reviewed or skipped.',
            'Answer the same essay question one level above the learner’s saved target level, using that level framework. At the framework’s highest level, provide a strong example at that level rather than inventing a higher one. If the target is unspecified, choose a learnable next-step example and state its level. Saving it completes the unit; payment depends on the wallet and save result.',
            mutationResult,
        ].join('\n'),
        parameters: object({ unitId: id('Current reading-writing unit ID.'), text: text(L.materialText, 'The model essay, paragraphs separated by blank lines.'),
            level: text(L.name, 'The level it is written at, in the learner’s framework, such as B2.') }, ['unitId', 'text', 'level']),
    } },
];

const ALL_TOOLS = [...tools, ...learningPreparationTools].map(tool => tool.function.name);

/** The same allowlist is used in the provider request and at execution. */
export function learningToolNamesFor(action?: LearningAction): string[] {
    switch (action?.kind) {
    case 'reading-article': case 'reading-notes': case 'reading-essay': return [learningPreparationTool(action)!];
    case undefined: return [...ALL_TOOLS];
    case 'prepare': return ['LearningRead', 'LearningLessonEdit', 'LearningPresent'];
    case 'review-prepare': return ['LearningRead', 'LearningLessonEdit'];
    case 'grade': case 'revision-review': case 'review-assess': return ['LearningRead', 'LearningAssess'];
    case 'model-essay': return ['LearningRead', 'LearningModelEssay'];
    case 'summary-review': return ['LearningRead'];
    // An unsolicited remark can only read published learning facts.
    case 'companion': return ['LearningRead'];
    case 'talk': return ['LearningRead', 'LearningPresent', 'LearningRequest'];
    case 'profile': return ['LearningRead', 'LearningProfileEdit'];
    case 'assess': return ['LearningRead', 'LearningAssess', 'LearningComplete', 'LearningPresent'];
    case 'complete': return ['LearningRead', 'LearningComplete'];
    }
}

export function learningTools(action?: LearningAction) {
    const names = learningToolNamesFor(action);
    return structuredClone([...tools, ...learningPreparationTools].filter(tool => names.includes(tool.function.name)));
}
