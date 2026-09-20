import { COC7_DIFFICULTIES, COC7_REQUEST_FIELDS, type Coc7Request } from '../domain/coc7-request.js';
import { COC7_CAPABILITIES, type Coc7Stat } from '../domain/coc7-catalog.js';
import { ACTION_CHECK_OPEN, ACTION_CHECK_CLOSE } from './markup.js';

const example: Coc7Request = { action: 'Climb the wet wall', stat: 'athletics', difficulty: 'hard' };
export const COC7_EXAMPLE = 'You reach for the ledge.\n\n' + ACTION_CHECK_OPEN + JSON.stringify(example) + ACTION_CHECK_CLOSE;
const CAPABILITY_GUIDANCE: Record<Coc7Stat, string> = {
    body: 'raw force, endurance, resisting bodily hazards',
    will: 'resolve, concentration, resisting mental pressure',
    appearance: 'achieving an effect through outward appearance or presence',
    athletics: 'climbing, swimming, jumping, balance, evasion',
    melee: 'unarmed and close-quarters weapons',
    shooting: 'aimed ranged attacks: bows, firearms, thrown weapons',
    awareness: 'observing, listening, searching for hidden clues',
    survival: 'navigation, tracking, foraging, outdoor survival',
    medicine: 'first aid, diagnosis, treatment',
    knowledge: 'general knowledge, interpreting and researching information',
    social: 'communication: persuasion, deception, charm, intimidation, reading intentions',
    mechanics: 'operating and repairing devices or vehicles, crafts, locks, mechanisms',
    concealment: 'sneaking, hiding, pickpocketing, unnoticed manipulation',
};
export function coc7CapabilityProjection() {
    return Object.entries(COC7_CAPABILITIES).map(([id, { label }]) => ({
        id, name: label, use: CAPABILITY_GUIDANCE[id as Coc7Stat],
    }));
}
export function coc7RequestContract(): string {
    const difficulties = Object.entries(COC7_DIFFICULTIES)
        .map(([id, divisor]) => `${id} (${divisor === 1 ? 'full value' : `1/${divisor} value`})`).join('; ');
    const fields = Object.entries(COC7_REQUEST_FIELDS)
        .map(([name, spec]) => `${name}${spec.type === 'string' ? ` (max ${spec.maxLength} chars)` : ''}: ${spec.description}`
            + (name === 'difficulty' ? ` ${difficulties}.` : '')).join('\n');
    const capabilities = coc7CapabilityProjection()
        .map(({ id, name, use }) => `${id}=${name} (${use})`).join('; ');
    return 'Fields: all required, nonempty strings.\n'
        + fields + '\n## Player capabilities\n' + capabilities
        + `\nExample:\n${COC7_EXAMPLE}\n`;
}
export const COC7_DOMAIN = 'CoC 7 (modified): setting-neutral D100 checks.\n'
    + 'Checks apply only to the character played by the user; NPC opposition becomes difficulty for that character’s attempt or response.\n'
    + 'Check when the outcome is uncertain and failure matters. One check covers a whole objective; another requires a new objective or obstacle.\n'
    + 'Choose one attribute or skill matching the main uncertainty; the app looks up its sheet value.\n'
    + 'Difficulty reflects the obstacle and approach, not the character’s competence.\n';
export const COC7_RESULT_GUIDANCE = 'For percentile results, result.verdict decides whether the objective was achieved; result.level is the rolled success degree, which may fall short of the required difficulty.\n';
