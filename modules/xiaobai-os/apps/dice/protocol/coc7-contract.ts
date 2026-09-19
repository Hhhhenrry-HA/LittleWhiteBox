import { COC7_REQUEST_FIELDS, type Coc7Request } from '../domain/coc7-request.js';
import { COC7_CAPABILITIES } from '../domain/coc7-catalog.js';
import { ACTION_CHECK_OPEN, ACTION_CHECK_CLOSE } from './markup.js';

const example: Coc7Request = { action: 'Climb the wet wall', stat: 'climb', difficulty: 'hard' };
export const COC7_EXAMPLE = 'You reach for the ledge.\n\n' + ACTION_CHECK_OPEN + JSON.stringify(example) + ACTION_CHECK_CLOSE;
export function coc7CapabilityProjection() {
    return Object.entries(COC7_CAPABILITIES).map(([id, { label, use }]) => ({ id, name: label, use }));
}
export function coc7RequestContract(): string {
    return Object.entries(COC7_REQUEST_FIELDS).map(([name, spec]) => `${name} (required, ${spec.type === 'string'
        ? `nonempty string, max length ${spec.maxLength}` : name === 'stat' ? 'capability ID' : spec.values.join(', ')}): ${spec.description}`).join('\n')
        + '\n## Available player capabilities\n' + JSON.stringify(coc7CapabilityProjection())
        + `\nExample:\n${COC7_EXAMPLE}\n`;
}
export const COC7_DOMAIN = 'The app maintains one global player sheet and resolves single-player CoC 7 percentile checks. You choose the capability and difficulty; the app looks up its value.\n'
    + 'Check a possible player attempt when the outcome is uncertain and failure has meaningful consequences. One check covers the whole objective; a new objective or obstacle creates a fresh decision.\n'
    + 'Choose the applicable skill, or an appropriate characteristic when no skill fits. Luck concerns external chance. Difficulty describes the obstacle and approach, not a second adjustment for the player’s competence.\n'
    + 'NPC resistance is represented by the difficulty of the player’s attempt. NPC-only actions remain narrative.\n';
export const COC7_RESULT_GUIDANCE = 'The app returns the value used, threshold, percentile roll, success degree and whether the objective was achieved. A regular success degree can still miss a hard requirement.\n';
