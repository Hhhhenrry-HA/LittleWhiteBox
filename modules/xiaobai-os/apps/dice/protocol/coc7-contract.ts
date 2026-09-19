import { COC7_DIFFICULTIES, COC7_REQUEST_FIELDS, type Coc7Request } from '../domain/coc7-request.js';
import { COC7_CAPABILITIES, type Coc7Stat } from '../domain/coc7-catalog.js';
import { ACTION_CHECK_OPEN, ACTION_CHECK_CLOSE } from './markup.js';

const example: Coc7Request = { action: 'Climb the wet wall', stat: 'climb', difficulty: 'hard' };
export const COC7_EXAMPLE = 'You reach for the ledge.\n\n' + ACTION_CHECK_OPEN + JSON.stringify(example) + ACTION_CHECK_CLOSE;
const CAPABILITY_GUIDANCE: Partial<Record<Coc7Stat, string>> = {
    persuade: 'sustained reasoning', fast_talk: 'brief misdirection', charm: 'personal appeal',
    luck: 'external chance, not competence',
};
export function coc7CapabilityProjection() {
    return Object.entries(COC7_CAPABILITIES).map(([id, { label }]) => {
        const use = CAPABILITY_GUIDANCE[id as Coc7Stat];
        return { id, name: label, ...(use ? { use } : {}) };
    });
}
export function coc7RequestContract(): string {
    const difficulties = Object.entries(COC7_DIFFICULTIES)
        .map(([id, divisor]) => `${id} (${divisor === 1 ? 'full value' : `1/${divisor} value`})`).join('; ');
    const fields = Object.entries(COC7_REQUEST_FIELDS)
        .map(([name, spec]) => `${name}${spec.type === 'string' ? ` (max ${spec.maxLength} chars)` : ''}: ${spec.description}`
            + (name === 'difficulty' ? ` ${difficulties}.` : '')).join('\n');
    const capabilities = coc7CapabilityProjection()
        .map(({ id, name, use }) => `${id}=${name}${use ? ` (${use})` : ''}`).join('; ');
    return 'Fields: all required, nonempty strings.\n'
        + fields + '\n## Player capabilities\n' + capabilities
        + `\nExample:\n${COC7_EXAMPLE}\n`;
}
export const COC7_DOMAIN = 'The app keeps one global player sheet and resolves single-player CoC 7 percentile checks. You choose the capability and difficulty; the app looks up the value.\n'
    + 'Check a possible player attempt when the outcome is uncertain and failure matters. One check covers a whole objective; a new objective or obstacle creates a fresh decision.\n'
    + 'Pick the applicable skill, or a characteristic when no skill fits. Difficulty reflects the obstacle and approach, not a second adjustment for player competence.\n'
    + 'NPC resistance is expressed as the difficulty of the player’s attempt; NPC-only actions stay narrative.\n';
export const COC7_RESULT_GUIDANCE = 'For CoC 7, result.verdict decides whether the objective was achieved; result.level is the rolled success degree, which may fall short of the required difficulty.\n';
