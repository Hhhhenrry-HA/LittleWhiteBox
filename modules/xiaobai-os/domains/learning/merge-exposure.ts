import type { LearningData, LearningLanguage, LearningUnit } from './types.js';
import { exposeLearningContent, sameLearningExerciseContent } from './exposure.js';

type Exposure = { language: string; unit: LearningUnit; kind: 'answers' | 'hints' | 'transcripts'; id: string };
const same = (left: unknown, right: unknown) => JSON.stringify(left) === JSON.stringify(right);

/**
 * A conversation may save help while a workbench request is being assessed. Only additive exposure of the
 * very same published content commutes with that request. Any other intervening edit remains a conflict.
 * Original answers and their answer-time help are never changed here.
 */
export function mergeLearningExposure(baseline: LearningData, current: LearningData, candidate: LearningData): LearningData | null {
    const explained = structuredClone(baseline);
    const added: Exposure[] = [];
    for (const profile of current.profiles) {
        const before = explained.profiles.find(entry => entry.language === profile.language);
        if (!before) { return null; }
        for (const slot of ['unit', 'review'] as const) {
            const live = profile[slot];
            const old = before[slot];
            if (!live || !old || live.id !== old.id) { continue; }
            for (const kind of ['answers', 'hints'] as const) {
                for (const id of live.revealed[kind]) {
                    if (old.revealed[kind].includes(id)) { continue; }
                    if (!old.exercises.some(entry => entry.id === id)) { return null; }
                    exposeLearningContent(before, kind, id, old);
                    added.push({ language: profile.language, unit: live, kind, id });
                }
            }
            for (const material of live.materials) {
                const previous = old.materials.find(entry => entry.id === material.id);
                if (material.transcriptRevealed && previous && !previous.transcriptRevealed) {
                    exposeLearningContent(before, 'transcripts', material.id, old);
                    added.push({ language: profile.language, unit: live, kind: 'transcripts', id: material.id });
                }
            }
        }
    }
    if (!same(explained, current)) { return null; }
    const merged = structuredClone(candidate);
    for (const exposure of added) {
        const profile = merged.profiles.find(entry => entry.language === exposure.language);
        if (!profile) { continue; }
        const target = [profile.unit, profile.review].find(unit => unit?.id === exposure.unit.id);
        if (exposure.kind === 'transcripts') {
            mergeTranscript(profile, target ?? null, exposure);
        } else if (target && sameLearningExerciseContent(target, exposure.unit, exposure.id)) {
            exposeLearningContent(profile, exposure.kind, exposure.id, target);
        }
    }
    return merged;
}

function mergeTranscript(profile: LearningLanguage, target: LearningUnit | null, exposure: Exposure) {
    const source = exposure.unit.materials.find(entry => entry.id === exposure.id)!;
    const matching = (material: LearningUnit['materials'][number]) => material.id === source.id && same(material.paragraphs, source.paragraphs);
    for (const material of target?.materials ?? []) {
        if (matching(material)) { material.transcriptRevealed = true; }
    }
    for (const item of profile.items) {
        for (const evidence of item.evidence) {
            for (const material of evidence.materials) {
                if (matching(material)) { material.transcriptRevealed = true; }
            }
        }
    }
}
