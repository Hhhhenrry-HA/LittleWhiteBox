import type { LearningAnswer } from '../../../domains/learning/types.js';
import { createLearningService, confirmedLearning, type LearningRepository } from './service.js';
import type { createLearningTeaching, LearningClassroom, LearningTeachingResult } from './teaching.js';

/** User submissions are saved before the teacher sees them; the teacher never fabricates an Attempt. */
export function createLearningPractice(options: {
    repository: LearningRepository; teaching: ReturnType<typeof createLearningTeaching>;
    current: () => LearningClassroom | null; createId?: () => string; now?: () => string;
}) {
    const service = createLearningService(options.repository, options);
    let submitting = false;
    return {
        async submit(input: { unitId: string; exerciseId: string; answer: LearningAnswer; replays: number; slowPlayback: boolean }, isCurrent: () => boolean = () => true): Promise<
            { status: 'saved'; attemptId: string; teaching: LearningTeachingResult | null }
            | { status: 'cancelled' | 'busy' | 'unconfirmed' | 'conflict' }
        > {
            if (submitting) { return { status: 'busy' }; }
            const classroom = structuredClone(options.current());
            if (!classroom) { return { status: 'cancelled' }; }
            const key = JSON.stringify(classroom);
            const guard = () => isCurrent() && JSON.stringify(options.current()) === key;
            submitting = true;
            try {
                const pending = service.prepareAttempt({ ...input, language: classroom.language, osId: classroom.osId,
                    scope: { kind: 'story', osId: classroom.osId } });
                const saved = await pending.save(guard);
                if (!guard()) { return { status: 'cancelled' }; }
                if (saved.status !== 'confirmed' && saved.status !== 'unchanged') { return { status: saved.status }; }
                const profile = confirmedLearning(options.repository)!.data.profiles.find(profile => profile.language === classroom.language)!;
                const unit = profile.unit!;
                const feedback = unit.assessments.find(entry => entry.attemptId === pending.attemptId);
                let teaching: LearningTeachingResult | null = null;
                if (!feedback) {
                    teaching = await options.teaching.run({ action: { kind: 'assess', attemptId: pending.attemptId, review: false }, message: 'Review this submitted answer.' });
                } else if (!profile.completions.some(completion => completion.unitId === unit.id)
                    && unit.exercises.every(exercise => unit.attempts.some(attempt => attempt.exerciseId === exercise.id))) {
                    teaching = await options.teaching.run({ action: { kind: 'complete' }, message: 'The planned exercises have been submitted. Review the unit for a useful stopping point.' });
                }
                return { status: 'saved', attemptId: pending.attemptId, teaching };
            } finally { submitting = false; }
        },
    };
}
