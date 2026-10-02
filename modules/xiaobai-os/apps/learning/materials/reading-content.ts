import { LearningValidationError } from '../../../domains/learning/profile.js';
import { measureLearningText } from '../../../domains/learning/text.js';

/** A fragment floor for a full reading-writing activity, not a target length or a quality score. */
export const LEARNING_READING_MINIMUM = Object.freeze({ words: 80, characters: 160 });

export class LearningReadingContentError extends LearningValidationError {
    readonly code: 'learning_source_incomplete' | 'learning_article_incomplete';
    constructor(path: string, part: 'source' | 'article', size: ReturnType<typeof measureLearningText>) {
        const minimum = LEARNING_READING_MINIMUM[size.unit];
        super(path, part === 'source'
            ? `This source contains only ${size.count} ${size.unit}; a reading-writing article needs at least ${minimum}. Choose another readable source rather than inventing missing content.`
            : `This article contains only ${size.count} ${size.unit}; a reading-writing article needs at least ${minimum}. Develop the reading into connected paragraphs with supporting details; an adaptation stays within its source.`);
        this.code = part === 'source' ? 'learning_source_incomplete' : 'learning_article_incomplete';
    }
}

export function checkLearningReadingContent(text: string, language: string, part: 'source' | 'article', path: string) {
    const size = measureLearningText(text, language);
    if (size.count < LEARNING_READING_MINIMUM[size.unit]) { throw new LearningReadingContentError(path, part, size); }
}
