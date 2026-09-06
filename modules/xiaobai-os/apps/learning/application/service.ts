import { learningEvidence, replaceLearningAssessment } from '../../../domains/learning/assessment.js';
import { objectiveLearningVerdict, parseLearningAnswer } from '../../../domains/learning/exercise.js';
import { parseLearningHelp } from '../../../domains/learning/facts.js';
import { parseLearningVoice } from '../../../domains/learning/speech.js';
import type { LearningNote } from '../../../domains/learning/notes.js';
import { canReadLearningScope, type LearningData, type LearningScope } from '../../../domains/learning/types.js';
import { combineLearningScope, learningId, learningTimestamp, parseLearningScope, requireLearning } from '../../../domains/learning/validation.js';
import type { createLearningRepository } from '../storage/repository.js';

export type LearningRepository = ReturnType<typeof createLearningRepository>;

export function confirmedLearning(repository: LearningRepository) {
    const snapshot = repository.snapshot();
    requireLearning(snapshot.status === 'ready' && snapshot.document !== undefined, 'storage', 'Read or resolve the learning file first');
    return snapshot.document;
}

export function createLearningService(repository: LearningRepository, options: { createId?: () => string; now?: () => string } = {}) {
    const createId = options.createId ?? (() => crypto.randomUUID());
    const now = options.now ?? (() => new Date().toISOString());
    const mutate = (language: string, change: (data: LearningData, index: number) => void, guard: () => boolean) => {
        const expected = confirmedLearning(repository);
        const data = structuredClone(expected?.data ?? { profiles: [] });
        const index = data.profiles.findIndex(profile => profile.language === language);
        requireLearning(index >= 0, 'language', 'Select a saved learning profile');
        change(data, index);
        return repository.save(expected, data, guard);
    };
    return {
        /** Called by Host after a real submit. Returned intent is kept for this save, not recreated by retries. */
        prepareAttempt(input: { language: string; unitId: string; exerciseId: string; answer: unknown;
            scope: LearningScope; osId: string; replays: number; slowPlayback: boolean }) {
            const expected = confirmedLearning(repository);
            const data = structuredClone(expected?.data ?? { profiles: [] });
            const profile = data.profiles.find(profile => profile.language === input.language);
            const unit = profile?.unit;
            requireLearning(profile && unit && unit.id === input.unitId && canReadLearningScope(unit.scope, input.osId), 'unitId', 'Select an available current unit');
            const exercise = unit.exercises.find(entry => entry.id === input.exerciseId);
            requireLearning(exercise, 'exerciseId', 'Select an exercise in this unit');
            const answer = parseLearningAnswer(input.answer, exercise.response, unit.materials);
            requireLearning(input.scope.kind === 'public' || input.scope.osId === input.osId, 'scope', 'Use the current story identity');
            const scope = combineLearningScope(unit.scope, parseLearningScope(input.scope, 'scope'));
            const listening = unit.listening?.find(entry => entry.exerciseId === exercise.id);
            const help = parseLearningHelp({ answer: unit.revealed.answers.includes(exercise.id), hint: unit.revealed.hints.includes(exercise.id),
                feedback: unit.attempts.some(attempt => attempt.exerciseId === exercise.id
                    && unit.assessments.some(assessment => assessment.attemptId === attempt.id && canReadLearningScope(assessment.scope, input.osId))),
                transcript: exercise.skill === 'listening' && unit.materials.some(material => exercise.materialIds.includes(material.id) && material.transcriptRevealed),
                replays: listening ? listening.parts.reduce((sum, part) => sum + Math.max(0, part.count - 1), 0) : input.replays,
                slowPlayback: listening?.slowPlayback ?? input.slowPlayback });
            const attempt = { id: learningId(createId(), 'attemptId'), exerciseId: exercise.id, answer, scope,
                submittedAt: learningTimestamp(now(), 'submittedAt'), help,
                ...(listening?.parts.length ? { listening: structuredClone(listening.voice) } : {}) };
            unit.attempts.push(attempt);
            const verdict = objectiveLearningVerdict(exercise, answer);
            if (verdict !== null && exercise.rule.kind !== 'semantic') {
                replaceLearningAssessment(profile, { attemptId: attempt.id, verdict, scope,
                    understanding: '', expression: '', guidance: exercise.rule.explanation });
            }
            let submitted = false;
            return { attemptId: attempt.id, save(guard: () => boolean) {
                requireLearning(!submitted, 'attemptId', 'This submission has been sent; read or verify its saved result');
                submitted = true;
                return repository.save(expected, data, guard);
            } };
        },
        reveal(language: string, unitId: string, kind: 'answers' | 'hints' | 'transcripts', id: string, osId: string, guard: () => boolean) {
            return mutate(language, (data, index) => {
                const unit = data.profiles[index].unit;
                requireLearning(unit && unit.id === unitId && canReadLearningScope(unit.scope, osId), 'unitId', 'Select an available current unit');
                requireLearning(kind === 'transcripts' ? unit.materials.some(material => material.id === id) : unit.exercises.some(exercise => exercise.id === id), 'id', 'Reveal content from this unit');
                if (kind === 'hints' && !unit.exercises.find(exercise => exercise.id === id)!.hint.trim()) { return; }
                if (kind === 'transcripts') {
                    unit.materials.find(material => material.id === id)!.transcriptRevealed = true;
                    for (const item of data.profiles[index].items) {
                        for (const evidence of item.evidence) {
                            for (const material of evidence.materials) { if (material.id === id) { material.transcriptRevealed = true; } }
                        }
                    }
                } else if (!unit.revealed[kind].includes(id)) { unit.revealed[kind].push(id); }
            }, guard);
        },
        setVoice(language: string, value: unknown, guard: () => boolean) {
            return mutate(language, (data, index) => { data.profiles[index].voice = parseLearningVoice(value); }, guard);
        },
        note(language: string, unitId: string, note: LearningNote | string, guard: () => boolean) {
            return mutate(language, (data, index) => {
                const unit = data.profiles[index].unit;
                requireLearning(unit?.id === unitId, 'unitId', 'Select the current unit');
                unit.notes ??= [];
                if (typeof note === 'string') { unit.notes = unit.notes.filter(entry => entry.id !== note); }
                else if (!unit.notes.some(entry => entry.id === note.id)) { unit.notes.push(structuredClone(note)); }
            }, guard);
        },
        listening(language: string, unitId: string, exerciseId: string, voice: unknown, partKey: string | null,
            slow: boolean, osId: string, guard: () => boolean) {
            return mutate(language, (data, index) => {
                const unit = data.profiles[index].unit;
                requireLearning(unit?.id === unitId && canReadLearningScope(unit.scope, osId)
                    && unit.exercises.some(exercise => exercise.id === exerciseId && exercise.skill === 'listening'), 'exerciseId', 'Select a current listening exercise');
                const records = unit.listening ?? [];
                let record = records.find(entry => entry.exerciseId === exerciseId);
                if (!record && !partKey) { return; }
                if (!record) { record = { exerciseId, voice: parseLearningVoice(voice), parts: [], slowPlayback: false }; records.push(record); }
                unit.listening = records;
                if (partKey) {
                    const part = record.parts.find(entry => entry.key === partKey);
                    if (part) { part.count++; } else { record.parts.push({ key: partKey, count: 1 }); }
                }
                record.slowPlayback ||= slow;
            }, guard);
        },
        dispute(language: string, attemptId: string, guard: () => boolean) {
            return mutate(language, (data, index) => {
                const profile = data.profiles[index];
                const current = profile.unit?.assessments.find(entry => entry.attemptId === attemptId)
                    ?? learningEvidence(profile, attemptId).assessment;
                requireLearning(current, 'attemptId', 'Select saved feedback to review');
                replaceLearningAssessment(profile, { ...current, verdict: 'disputed' });
            }, guard);
        },
        deleteAttempt(language: string, attemptId: string, guard: () => boolean) {
            return mutate(language, (data, index) => {
                const profile = data.profiles[index];
                if (profile.unit) {
                    profile.unit.attempts = profile.unit.attempts.filter(entry => entry.id !== attemptId);
                    profile.unit.assessments = profile.unit.assessments.filter(entry => entry.attemptId !== attemptId);
                }
                for (const item of profile.items) { item.evidence = item.evidence.filter(entry => entry.attempt.id !== attemptId); }
            }, guard);
        },
        deleteItem: (language: string, id: string, guard: () => boolean) => mutate(language, (data, index) => {
            data.profiles[index].items = data.profiles[index].items.filter(item => item.id !== id);
        }, guard),
        abandonUnit: (language: string, guard: () => boolean) => mutate(language, (data, index) => { data.profiles[index].unit = null; }, guard),
        deleteLanguage: (language: string, guard: () => boolean) => mutate(language, (data, index) => { data.profiles.splice(index, 1); }, guard),
    };
}
