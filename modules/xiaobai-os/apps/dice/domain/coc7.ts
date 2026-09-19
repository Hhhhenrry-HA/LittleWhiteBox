import { COC7_DIFFICULTIES, type Coc7Participant, type Coc7Request } from './coc7-request.js';

export const COC7_LEVELS = ['fumble', 'failure', 'regular', 'hard', 'extreme', 'critical'] as const;
export type Coc7Level = typeof COC7_LEVELS[number];
export interface Coc7Roll {
    units: number;
    tens: number[];
    roll: number;
    threshold: number;
    level: Coc7Level;
}
const COC7_VERDICTS = {
    skill: ['achieved', 'not_achieved'], opposed: ['actor_wins', 'opponent_wins', 'stalemate'],
    melee_dodge: ['attacker_hits', 'dodged', 'no_hit'], melee_fight_back: ['attacker_hits', 'defender_hits', 'no_hit'],
} as const;
export type Coc7Verdict = typeof COC7_VERDICTS[keyof typeof COC7_VERDICTS][number];
export interface Coc7Result { actor: Coc7Roll; opponent?: Coc7Roll; verdict: Coc7Verdict }

export function coc7Percentile(units: number, tens: number): number { return tens * 10 + units || 100; }

export function coc7Level(value: number, threshold: number, roll: number): Coc7Level {
    if (roll === 1) { return 'critical'; }
    if (roll === 100 || threshold < 50 && roll >= 96) { return 'fumble'; }
    if (roll <= Math.floor(value / COC7_DIFFICULTIES.extreme)) { return 'extreme'; }
    if (roll <= Math.floor(value / COC7_DIFFICULTIES.hard)) { return 'hard'; }
    return roll <= value ? 'regular' : 'failure';
}

function rank(level: Coc7Level): number { return Math.max(0, COC7_LEVELS.indexOf(level) - 1); }

function digit(random: () => number): number {
    const sample = random();
    if (!Number.isFinite(sample) || sample < 0 || sample >= 1) { throw new TypeError('dice_random_invalid'); }
    return Math.floor(sample * 10);
}

function rollParticipant(participant: Coc7Participant, threshold: number, random: () => number): Coc7Roll {
    const net = (participant.bonus ?? 0) - (participant.penalty ?? 0);
    const units = digit(random);
    const tens = Array.from({ length: Math.abs(net) + 1 }, () => digit(random));
    const candidates = tens.map(face => coc7Percentile(units, face));
    const roll = net < 0 ? Math.max(...candidates) : Math.min(...candidates);
    return { units, tens, roll, threshold, level: coc7Level(participant.value, threshold, roll) };
}

/** Input is the fully validated request; a two-sided check is one atomic result. */
export function rollCoc7(request: Coc7Request, random: () => number = Math.random): Coc7Result {
    const threshold = request.kind === 'skill' ? Math.floor(request.value / COC7_DIFFICULTIES[request.difficulty]) : request.value;
    const actor = rollParticipant(request, threshold, random);
    if (request.kind === 'skill') {
        const achieved = actor.level === 'critical' || rank(actor.level) > 0 && actor.roll <= threshold;
        return { actor, verdict: achieved ? 'achieved' : 'not_achieved' };
    }
    const opponent = rollParticipant(request.opponent, request.opponent.value, random);
    const left = rank(actor.level);
    const right = rank(opponent.level);
    let verdict: Coc7Verdict;
    if (request.kind === 'opposed') {
        const comparison = left - right || request.value - request.opponent.value;
        verdict = comparison > 0 ? 'actor_wins' : comparison < 0 ? 'opponent_wins' : 'stalemate';
    } else if (!left && !right) { verdict = 'no_hit'; }
    else if (request.kind === 'melee_dodge') { verdict = left > right ? 'attacker_hits' : 'dodged'; }
    else { verdict = left >= right ? 'attacker_hits' : 'defender_hits'; }
    return { actor, opponent, verdict };
}

/** Validate stored shape without rerolling or re-adjudicating historical facts. */
export function parseCoc7Result(value: unknown, request: Coc7Request): Coc7Result {
    const invalid = (): never => { throw new TypeError('dice_record_invalid'); };
    if (!value || typeof value !== 'object' || Array.isArray(value)) { return invalid(); }
    const result = value as Coc7Result;
    const opposed = request.kind !== 'skill';
    const keys = opposed ? ['actor', 'opponent', 'verdict'] : ['actor', 'verdict'];
    const verdicts: readonly Coc7Verdict[] = COC7_VERDICTS[request.kind];
    if (Object.keys(result).length !== keys.length || keys.some(key => !Object.hasOwn(result, key))
        || !verdicts.includes(result.verdict)) { return invalid(); }
    const read = (raw: Coc7Roll | undefined, participant: Coc7Participant): Coc7Roll => {
        const fields = ['units', 'tens', 'roll', 'threshold', 'level'];
        const face = (n: unknown) => typeof n === 'number' && Number.isInteger(n) && n >= 0 && n <= 9;
        if (!raw || typeof raw !== 'object' || Object.keys(raw).length !== fields.length
            || fields.some(key => !Object.hasOwn(raw, key)) || !face(raw.units) || !Array.isArray(raw.tens)
            || raw.tens.length !== Math.abs((participant.bonus ?? 0) - (participant.penalty ?? 0)) + 1 || !raw.tens.every(face)
            || !Number.isInteger(raw.roll) || raw.roll < 1 || raw.roll > 100
            || !Number.isSafeInteger(raw.threshold) || raw.threshold < 0 || !COC7_LEVELS.includes(raw.level)) { return invalid(); }
        return { ...raw, tens: [...raw.tens] };
    };
    return { actor: read(result.actor, request), verdict: result.verdict,
        ...(opposed ? { opponent: read(result.opponent, request.opponent) } : {}) };
}
