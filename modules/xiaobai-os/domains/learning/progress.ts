import type { LearningEvidence, LearningItem } from './types.js';

const DAY = 86400000;
const day = (evidence: LearningEvidence) => evidence.attempt.submittedAt.slice(0, 10);
const context = (evidence: LearningEvidence) => evidence.materials.length
    ? evidence.materials.map(material => material.paragraphs.map(paragraph => paragraph.text).join('\n')).join('\n\n')
    : evidence.exercise.prompt;
const active = (evidence: LearningEvidence) => ['text', 'gaps'].includes(evidence.exercise.response.kind);
export function independentLearningSuccess(evidence: LearningEvidence): boolean {
    const help = evidence.attempt.help;
    return evidence.assessment.verdict === 'correct' && !help.answer && !help.hint && !help.feedback
        && (evidence.exercise.skill !== 'listening' || (!!evidence.attempt.listening?.length && !help.transcript));
}
function distinct(left: LearningEvidence, right: LearningEvidence): boolean {
    return day(left) !== day(right) && context(left) !== context(right);
}

/** Keep the latest observation and a defensible independent pair, not an invisible success counter. */
export function selectLearningEvidence(evidence: LearningEvidence[]): LearningEvidence[] {
    const ordered = [...evidence].reverse().sort((left, right) => right.attempt.submittedAt.localeCompare(left.attempt.submittedAt));
    const unique = ordered.filter((entry, index) => ordered.findIndex(other => other.attempt.id === entry.attempt.id) === index);
    const successes = unique.filter(independentLearningSuccess);
    for (const first of successes) {
        const second = successes.find(other => distinct(first, other) && (active(first) || active(other)));
        if (second) { return [...new Set([unique[0], first, second, ...unique])].slice(0, 3); }
    }
    return unique.slice(0, 3);
}

export function learningProgress(item: Pick<LearningItem, 'evidence'>) {
    const evidence = [...item.evidence].sort((left, right) => right.attempt.submittedAt.localeCompare(left.attempt.submittedAt));
    const latest = evidence[0];
    if (!latest) { return { state: 'unassessed' as const, nextReviewAt: null, independent: false }; }
    const successes = evidence.filter(independentLearningSuccess);
    const spaced = successes.filter((entry, index) => successes.slice(0, index).every(other => distinct(entry, other)));
    const pair = successes.flatMap(first => successes.filter(second => distinct(first, second) && (active(first) || active(second))).map(second => [first, second]));
    const mastered = pair.length > 0 && independentLearningSuccess(latest);
    let interval = 1;
    if (mastered && spaced.length < 3) { interval = 3; }
    if (mastered && spaced.length >= 3) {
        const gap = Math.max(...pair.map(([left, right]) => Math.abs(Date.parse(left.attempt.submittedAt) - Date.parse(right.attempt.submittedAt)) / DAY));
        interval = gap >= 14 ? 30 : gap >= 7 ? 14 : 7;
    }
    return { state: latest.assessment.verdict === 'disputed' ? 'review' as const : mastered ? 'independent' as const
        : independentLearningSuccess(latest) ? 'practised' as const : 'strengthen' as const,
    nextReviewAt: new Date(Date.parse(latest.attempt.submittedAt) + interval * DAY).toISOString(), independent: mastered };
}
