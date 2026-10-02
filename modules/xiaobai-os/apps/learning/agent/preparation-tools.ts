import { LEARNING_LIMITS as L } from '../../../domains/learning/types.js';
import type { LearningAction } from './session.js';
import { LEARNING_READING_MINIMUM } from '../materials/reading-content.js';

export const LEARNING_READING_EXTENT = `A full reading-writing article needs at least ${LEARNING_READING_MINIMUM.words} words, or ${LEARNING_READING_MINIMUM.characters} characters for Chinese, Japanese or Korean. This is a fragment check, not the recommended length.`;

const text = (maxLength: number, description: string) => ({ type: 'string', maxLength, description });
const object = (properties: Record<string, unknown>, required = Object.keys(properties)) => ({ type: 'object', properties, required, additionalProperties: false });
const result = 'Returns {ok,changed,ids,errors:[{path,message}],error?}. error, when present, identifies insufficient source or article content. A successful result ends this preparation step; the app then saves it. A failed call changes nothing; correct the named fields.';
export const learningPreparationTools = [
    { type: 'function', function: { name: 'LearningArticle', description: `Publish the reading-writing article. The app supplies a summary box for each paragraph. ${LEARNING_READING_EXTENT} An adapted article also needs an extracted source meeting this floor. ${result}`,
        parameters: object({ title: text(L.name, 'Article title.'), goal: text(L.goal, 'One achievable learning objective.'),
            tier: { type: 'string', enum: ['short', 'regular', 'deep'], description: 'Workload relative to the learner.' },
            kind: { type: 'string', enum: ['adapted', 'authored'], description: 'Adapted uses an extracted source; authored requires the request’s explicit choice.' },
            sourceId: text(128, 'Required for adapted: the extracted source ID.'),
            text: text(L.materialText, 'Complete reading text, a little above the learner’s level, with blank lines between paragraphs.') }, ['title', 'goal', 'tier', 'kind', 'text']) } },
    { type: 'function', function: { name: 'LearningReadingNotes', description: `Add explanations for the paragraph IDs in this request, in order. Cover vocabulary, reusable writing phrases, grammar and coherence at the learner’s level. ${result}`,
        parameters: object({ explanations: { type: 'array', items: object({ paragraphId: text(128, 'Requested paragraph ID.'),
            explanation: text(L.explanation, 'Meaning, writing structures, grammar and coherence in the explanation language.'),
            terms: { type: 'array', maxItems: L.terms, items: object({ text: text(L.name, 'Word or phrase in this paragraph.'), note: text(L.explanation, 'Meaning and usage here.') }) } }) } }) } },
    { type: 'function', function: { name: 'LearningEssayTask', description: `Add the article’s final essay question: a viewpoint, reflection or reasoned response grounded in the article, around 300 words (characters for Chinese or Japanese). State the length unit in the question. ${result}`,
        parameters: object({ prompt: text(L.prompt, 'Essay question and response requirements.') }) } },
];

export function learningPreparationTool(action: Pick<LearningAction, 'kind'>): string | null {
    return action.kind === 'reading-article' ? 'LearningArticle' : action.kind === 'reading-notes' ? 'LearningReadingNotes'
        : action.kind === 'reading-essay' ? 'LearningEssayTask' : null;
}
