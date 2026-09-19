import { COC7_ATTRIBUTES, COC7_ATTRIBUTE_IDS, COC7_SKILLS, COC7_SKILL_IDS, type Coc7Attribute, type Coc7Skill, type Coc7Stat } from './coc7-catalog.js';

export interface Coc7Sheet {
    attributes: Record<Coc7Attribute, number>;
    luck: number;
    training: Record<Coc7Skill, number>;
}
export type Coc7SheetState = { kind: 'empty' } | { kind: 'invalid' } | { kind: 'ready'; sheet: Coc7Sheet };
export const COC7_TRAINING_BONUSES = [40, 30, 30, 20, 20, 20, 10, 10] as const;
export const COC7_SHEET_ERRORS = { invalid: 'dice_coc7_sheet_invalid', missing: 'dice_coc7_sheet_missing', belowBase: 'dice_coc7_skill_below_base' } as const;

function integer(value: unknown, min: number): value is number { return typeof value === 'number' && Number.isSafeInteger(value) && value >= min; }
function exact(value: unknown, keys: readonly string[]): value is Record<string, unknown> {
    return !!value && typeof value === 'object' && !Array.isArray(value)
        && Object.keys(value).length === keys.length && keys.every(key => Object.hasOwn(value, key));
}
export function coc7SkillBase(sheet: Coc7Sheet, skill: Coc7Skill): number {
    const base = COC7_SKILLS[skill].base;
    return typeof base === 'number' ? base : Math.floor(sheet.attributes[base.attribute] / base.divisor);
}
export function coc7StatValue(sheet: Coc7Sheet, stat: Coc7Stat): number {
    if (stat === 'luck') { return sheet.luck; }
    if (Object.hasOwn(COC7_ATTRIBUTES, stat)) { return sheet.attributes[stat as Coc7Attribute]; }
    return coc7SkillBase(sheet, stat as Coc7Skill) + sheet.training[stat as Coc7Skill];
}
export function coc7Derived(sheet: Coc7Sheet) {
    return { hpMax: Math.floor((sheet.attributes.CON + sheet.attributes.SIZ) / 10), mpMax: Math.floor(sheet.attributes.POW / 5), sanInitial: sheet.attributes.POW };
}
export function parseCoc7Sheet(value: unknown): Coc7Sheet {
    const invalid = (): never => { throw new TypeError(COC7_SHEET_ERRORS.invalid); };
    if (!exact(value, ['attributes', 'luck', 'training']) || !exact(value.attributes, COC7_ATTRIBUTE_IDS)
        || !exact(value.training, COC7_SKILL_IDS) || !integer(value.luck, 1)
        || !Object.values(value.attributes).every(n => integer(n, 1)) || !Object.values(value.training).every(n => integer(n, 0))) { return invalid(); }
    const sheet = value as unknown as Coc7Sheet;
    if (!Number.isSafeInteger(sheet.attributes.CON + sheet.attributes.SIZ)
        || !COC7_SKILL_IDS.every(skill => integer(coc7StatValue(sheet, skill), 1))) { return invalid(); }
    return { attributes: { ...sheet.attributes }, luck: sheet.luck, training: { ...sheet.training } };
}
/** Read-only projection: invalid persisted input stays intact until an explicit replacement or clear. */
export function readCoc7Sheet(value: unknown): Coc7SheetState {
    if (value === null) { return { kind: 'empty' }; }
    try { return { kind: 'ready', sheet: parseCoc7Sheet(value) }; }
    catch (error) {
        if (!(error instanceof TypeError) || error.message !== COC7_SHEET_ERRORS.invalid) { throw error; }
        return { kind: 'invalid' };
    }
}
function sample(random: () => number, faces: number): number {
    const n = random();
    if (!Number.isFinite(n) || n < 0 || n >= 1) { throw new TypeError('dice_random_invalid'); }
    return Math.floor(n * faces);
}
export function generateCoc7Sheet(random: () => number = Math.random): Coc7Sheet {
    const roll = (dice: number, add: number) => (Array.from({ length: dice }, () => sample(random, 6) + 1).reduce((sum, n) => sum + n, add)) * 5;
    const attributes = Object.fromEntries(COC7_ATTRIBUTE_IDS.map(id => [id, roll(COC7_ATTRIBUTES[id].dice, COC7_ATTRIBUTES[id].add)])) as Coc7Sheet['attributes'];
    const luck = roll(3, 0);
    const training = Object.fromEntries(COC7_SKILL_IDS.map(id => [id, 0])) as Coc7Sheet['training'];
    const available = [...COC7_SKILL_IDS];
    for (const bonus of COC7_TRAINING_BONUSES) { training[available.splice(sample(random, available.length), 1)[0]] = bonus; }
    return parseCoc7Sheet({ attributes, luck, training });
}
export function editCoc7Stat(sheet: Coc7Sheet, stat: Coc7Stat, value: number): Coc7Sheet {
    const next = parseCoc7Sheet(sheet);
    if (stat === 'luck') { next.luck = value; }
    else if (Object.hasOwn(COC7_ATTRIBUTES, stat)) { next.attributes[stat as Coc7Attribute] = value; }
    else {
        const increment = value - coc7SkillBase(next, stat as Coc7Skill);
        if (increment < 0) { throw new TypeError(COC7_SHEET_ERRORS.belowBase); }
        next.training[stat as Coc7Skill] = increment;
    }
    return parseCoc7Sheet(next);
}
