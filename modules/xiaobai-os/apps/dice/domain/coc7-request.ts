import { ACTION_CHECK_REQUEST_FIELDS } from './action-check.js';

export const COC7_DIFFICULTIES = { regular: 1, hard: 2, extreme: 5 } as const;
export const COC7_MAX_NET_DICE = 2;
export type Coc7Kind = typeof COC7_REQUEST_VARIANTS[number]['kinds'][number];
export type Coc7Difficulty = keyof typeof COC7_DIFFICULTIES;
export interface Coc7Participant { character?: string; stat: string; value: number; bonus?: number; penalty?: number }
type Coc7Attempt = Coc7Participant & { action: string; stakes?: string };
export type Coc7Request = Coc7Attempt & (
    { kind: 'skill'; difficulty: Coc7Difficulty }
    | { kind: Exclude<Coc7Kind, 'skill'>; opponent: Coc7Participant & { character: string } }
);

// The parser and model contract share field shape, optionality and bounds.
export const COC7_PARTICIPANT_FIELDS = {
    character: { type: 'string', ...ACTION_CHECK_REQUEST_FIELDS.character },
    stat: { type: 'string', ...ACTION_CHECK_REQUEST_FIELDS.stat },
    value: { type: 'integer', required: true, min: 1 },
    bonus: { type: 'integer', required: false, min: 0 },
    penalty: { type: 'integer', required: false, min: 0 },
} as const;
export const COC7_ATTEMPT_FIELDS = {
    ...COC7_PARTICIPANT_FIELDS,
    action: { type: 'string', ...ACTION_CHECK_REQUEST_FIELDS.action },
    stakes: { type: 'string', ...ACTION_CHECK_REQUEST_FIELDS.stakes },
} as const;
const COC7_OPPONENT_FIELDS = {
    ...COC7_PARTICIPANT_FIELDS, character: { ...COC7_PARTICIPANT_FIELDS.character, required: true },
} as const;

export type Coc7Field = { readonly required: boolean } & (
    { readonly type: 'string'; readonly maxLength: number }
    | { readonly type: 'integer'; readonly min: number }
    | { readonly type: 'enum'; readonly values: readonly string[] }
    | { readonly type: 'object'; readonly fields: Readonly<Record<string, Coc7Field>> }
);

// Each kind adds only these fields to the common attempt. Absent fields are not accepted.
export const COC7_REQUEST_VARIANTS = [
    { kinds: ['skill'], fields: { difficulty: { type: 'enum', required: true, values: Object.keys(COC7_DIFFICULTIES) } } },
    { kinds: ['opposed', 'melee_dodge', 'melee_fight_back'],
        fields: { opponent: { type: 'object', required: true, fields: COC7_OPPONENT_FIELDS } } },
] as const satisfies readonly { kinds: readonly string[]; fields: Readonly<Record<string, Coc7Field>> }[];
export const COC7_KINDS: readonly Coc7Kind[] = COC7_REQUEST_VARIANTS.flatMap<Coc7Kind>(variant => variant.kinds);

function object(value: unknown): Record<string, unknown> {
    if (!value || typeof value !== 'object' || Array.isArray(value)) { throw new TypeError('dice_request_object_required'); }
    return value as Record<string, unknown>;
}

function readFields(input: Record<string, unknown>, fields: Readonly<Record<string, Coc7Field>>) {
    if (Object.keys(input).some(key => !Object.hasOwn(fields, key))) { throw new TypeError('dice_request_unknown_field'); }
    const result: Record<string, unknown> = {};
    for (const [key, spec] of Object.entries(fields)) {
        if (!Object.hasOwn(input, key) && !spec.required) { continue; }
        const raw = input[key];
        if (spec.type === 'string') {
            if (typeof raw !== 'string' || !raw.trim() || raw.trim().length > spec.maxLength) {
                throw new TypeError(`dice_request_${key}_invalid`);
            }
            result[key] = raw.trim();
        } else if (spec.type === 'integer') {
            if (typeof raw !== 'number' || !Number.isSafeInteger(raw) || raw < spec.min) {
                throw new TypeError(`dice_request_${key}_invalid`);
            }
            result[key] = raw;
        } else if (spec.type === 'enum') {
            if (typeof raw !== 'string' || !spec.values.includes(raw)) { throw new TypeError(`dice_request_${key}_invalid`); }
            result[key] = raw;
        } else {
            result[key] = readFields(object(raw), spec.fields);
        }
    }
    if (Math.abs(Number(result.bonus ?? 0) - Number(result.penalty ?? 0)) > COC7_MAX_NET_DICE) {
        throw new TypeError('dice_request_net_dice_unsupported');
    }
    return result;
}

export function parseCoc7Request(value: unknown): Coc7Request {
    const { kind, ...input } = object(value);
    const variant = COC7_REQUEST_VARIANTS.find(candidate => candidate.kinds.some(name => name === kind));
    if (!variant) { throw new TypeError('dice_request_kind_invalid'); }
    return { kind, ...readFields(input, { ...COC7_ATTEMPT_FIELDS, ...variant.fields }) } as Coc7Request;
}
