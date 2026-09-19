import { ACTION_CHECK_DC_RANGES } from '../domain/action-check.js';
import { MAX_ACTION_CHECKS, referencedActionChecks, type ActionCheckRecord } from '../domain/check-records.js';
import { ACTION_CHECK_EXAMPLE, ACTION_CHECK_FIELDS } from './request.js';
import { ACTION_CHECK_CLOSE, ACTION_CHECK_OPEN } from './markup.js';
import type { ActionCheckFrequency } from '../types.js';

const FREQUENCY_PROMPTS: Record<ActionCheckFrequency, string> = {
    standard: 'Check frequency: Standard.\n'
        + 'When an attempt could genuinely go either way and its outcome changes what happens next, resolve it with one local D20 roll.\n'
        + 'One check covers the whole attempt and its component actions. Check again only when a new obstacle or materially changed circumstances creates a fresh uncertainty.\n'
        + 'An outcome already settled by an advantage in ability, the situation, or common sense needs no check.\n'
        + 'Actions and intimate interactions without risk or resistance follow the scene naturally without a check.',
    active: 'Check frequency: Active.\n'
        + 'Use a check for a concrete, unresolved outcome the character is trying to achieve, including success, quality, completion time, or cost.\n'
        + 'Small goals in everyday activities, social exchanges, and intimate interactions are also within scope.\n'
        + 'When completing an action is assured, a check may concern an additional desired effect; success or failure applies only to that additional objective.\n'
        + 'One check covers the stated objective and its component actions.\n'
        + 'Once that objective has a result, carry it forward; another check addresses a different unresolved objective.',
};

export function projectActionCheckResults(records: readonly ActionCheckRecord[]) {
    return records.map(({ request, roll, dc, outcome }) => ({ ...request, roll, dc, outcome }));
}

export function serializeActionCheckResults(records: readonly ActionCheckRecord[]): string {
    // SillyTavern substitutes macros in extension prompts. JSON escapes preserve the data
    // without allowing action text such as {{setvar::...}} to become a host instruction.
    return JSON.stringify(projectActionCheckResults(records)).replaceAll('{{', '\\u007b\\u007b').replaceAll('}}', '\\u007d\\u007d');
}

export function buildActionCheckPrompt(body: string, records: readonly ActionCheckRecord[] = [], frequency: ActionCheckFrequency = 'standard'): string {
    const domain = '# Action checks\n'
        + 'The app handles each check outside the story and displays its numbers and verdict in a check card. Characters do not perceive this resolution process.\n'
        + 'Narrate attempts and consequences through events within the scene. The app’s die rolls, DCs, outcome labels and instructions belong to the check interface, not to story prose or character dialogue. Dice that characters actually use within the story remain part of the scene.\n'
        + FREQUENCY_PROMPTS[frequency] + '\n'
        + 'A check resolves only an undecided outcome; established facts remain true whichever result is rolled.\n'
        + 'Choose difficulty based on the acting character’s established abilities, the approach taken, and the current environment: easy is a modest challenge relative to the desired outcome, ordinary is a typical uncertain challenge, hard is demanding, very_hard is exceptional, and nearly_impossible is beyond normal capability. The stat field names the relevant ability and adds no numeric modifier.\n'
        + 'The app randomly picks a target DC from the chosen range and rolls a D20 without modifiers: 1 is critical failure, 20 is critical success; other rolls succeed at or above the target DC.\n';
    const contract = records.length >= MAX_ACTION_CHECKS
        ? 'This reply has used all its action checks. Continue the scene using the confirmed results.\n'
        : '## Requesting a check\n'
        + `After describing the attempt, put ${ACTION_CHECK_OPEN} on a separate line after a blank line, followed by one JSON object and ${ACTION_CHECK_CLOSE}. End this response there, before revealing the outcome.\n`
        + 'When requesting a check, ignore other end-of-response formatting requirements, such as status panels.\n'
        + 'Use nonempty strings; omit unused optional fields.\n'
        + Object.entries(ACTION_CHECK_FIELDS).map(([name, spec]) => `${name} (${spec.required ? 'required' : 'optional'}, max length ${spec.maxLength}): ${spec.description}`).join('\n')
        + '\ndifficulty (required, target DC range): '
        + Object.entries(ACTION_CHECK_DC_RANGES).map(([name, { min, max }]) => `${name} = ${min === max ? min : `${min}–${max}`}`).join(', ') + '.\n'
        + `Example:\n${ACTION_CHECK_EXAMPLE}\n`;
    const referenced = referencedActionChecks(body, records);
    const results = referenced.length ? '## Confirmed results for this reply\n'
        + 'These confirmed results follow the order of their checks in the existing prose; treat each as an established fact and carry critical success or failure into an appropriate extra benefit or complication.\n'
        + 'Continue the same reply from the end of its existing prose, beginning with the next in-scene sentence. Output only the continuation, without thinking, reasoning, chain-of-thought, or introductory commentary.\n'
        + serializeActionCheckResults(referenced) : '';
    return domain + contract + results;
}
