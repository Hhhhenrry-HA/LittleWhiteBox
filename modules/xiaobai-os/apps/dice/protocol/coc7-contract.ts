import { COC7_ATTEMPT_FIELDS, COC7_KINDS, COC7_REQUEST_VARIANTS, COC7_MAX_NET_DICE, type Coc7Field } from '../domain/coc7-request.js';
import { ACTION_CHECK_OPEN, ACTION_CHECK_CLOSE } from './markup.js';

const descriptions: Record<keyof typeof COC7_ATTEMPT_FIELDS, string> = {
    action: 'The specific attempt and its objective.',
    character: 'The acting character; in melee, the initiating attacker.',
    stat: 'The applicable CoC skill or characteristic name.',
    value: 'The established full skill or characteristic value, before difficulty fractions.',
    bonus: 'Applicable bonus tens dice; omitted means zero.',
    penalty: 'Applicable penalty tens dice; omitted means zero.',
    stakes: 'What is at stake and which established facts remain unchanged.',
};

export const COC7_EXAMPLE = 'Mira reaches for the ledge.\n\n' + ACTION_CHECK_OPEN
    + '{"kind":"skill","action":"Climb the wet wall","character":"Mira","stat":"Climb","value":65,"difficulty":"hard"}'
    + ACTION_CHECK_CLOSE;

function fieldShape(spec: Coc7Field): string {
    if (spec.type === 'string') { return `nonempty string, max length ${spec.maxLength}`; }
    if (spec.type === 'integer') { return `safe integer, minimum ${spec.min}`; }
    if (spec.type === 'enum') { return spec.values.join(', '); }
    return 'object with ' + Object.entries(spec.fields).map(([name, field]) => `${name} (${field.required ? 'required' : 'optional'})`).join(', ')
        + '; these fields describe the opponent, with the text limits, value and dice definitions above';
}

export function coc7RequestContract(): string {
    const conditionalNames = new Set(COC7_REQUEST_VARIANTS.flatMap(variant => Object.keys(variant.fields)));
    return `kind (required): ${COC7_KINDS.join(', ')}.\n`
        + Object.entries(COC7_ATTEMPT_FIELDS).map(([name, spec]) => `${name} (${spec.required ? 'required' : 'optional'}, `
            + fieldShape(spec)
            + `): ${descriptions[name as keyof typeof COC7_ATTEMPT_FIELDS]}`).join('\n') + '\n'
        + COC7_REQUEST_VARIANTS.map(variant => `For kind ${variant.kinds.join(' / ')}:\n`
            + Object.entries(variant.fields).map(([name, spec]) => `${name} (${spec.required ? 'required' : 'optional'}): ${fieldShape(spec)}.\n`).join('')
            + `Omit ${[...conditionalNames].filter(name => !Object.hasOwn(variant.fields, name)).join(', ')}.\n`).join('')
        + `Bonus and penalty dice cancel each other. This interface supports up to ${COC7_MAX_NET_DICE} net dice per participant.\n`
        + `Example:\n${COC7_EXAMPLE}\n`;
}

export const COC7_DOMAIN = 'Use Call of Cthulhu 7th edition for uncertain, possible attempts with meaningful failure consequences. Settled outcomes and actions without resistance need no roll.\n'
    + 'Use the applicable skill, or a characteristic when appropriate, taking its current full value from established context. Unknown values need clarification before requesting a check; an unknown skill is not evidence of being untrained. An explicitly untrained skill may use its known CoC base chance.\n'
    + 'Choose ordinary opposed rolls or the appropriate melee response when both sides roll. A skill check may instead use difficulty set by NPC opposition under CoC rules; these are alternative procedures for the same attempt.\n'
    + 'The app resolves skill checks, ordinary opposed rolls, and melee attacks against dodge or fight back, including bonus and penalty tens dice. Melee results cover hits only. Damage, resources, combat rounds, maneuvers, combined checks, human-limit procedures, Luck spending and pushed rolls are outside this interface.\n'
    + 'Difficulty and bonus/penalty dice represent CoC circumstances, not invented adjustments to the supplied value; account for each circumstance once.\n'
    + 'The app rolls percentiles and reports each side’s threshold, roll and success degree together with the overall verdict. Degree and achieving the required difficulty are separate. Opposed wins are relative, including when both rolls fail; they do not grant unrelated task success or damage. A stalemate stays unresolved.\n';
