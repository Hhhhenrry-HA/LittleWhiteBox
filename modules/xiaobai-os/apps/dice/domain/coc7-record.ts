import { ACTION_CHECK_REQUEST_FIELDS } from './action-check.js';
import { COC7_DIFFICULTIES, type Coc7Difficulty } from './coc7-request.js';

// A result keeps the capability name used at the time, independently of today's
// request catalog. This is a historical fact, never a request to look up a sheet.
export interface Coc7RecordedRequest { action: string; stat: string; difficulty: Coc7Difficulty }
export function parseCoc7RecordedRequest(value: unknown): Coc7RecordedRequest {
    const invalid = (): never => { throw new TypeError('dice_record_invalid'); };
    if (!value || typeof value !== 'object' || Array.isArray(value)) { return invalid(); }
    const input = value as Coc7RecordedRequest;
    if (Object.keys(input).length !== 3 || !['action', 'stat', 'difficulty'].every(key => Object.hasOwn(input, key))) { return invalid(); }
    for (const key of ['action', 'stat'] as const) {
        if (typeof input[key] !== 'string' || !input[key].trim() || input[key].length > ACTION_CHECK_REQUEST_FIELDS[key].maxLength) { return invalid(); }
    }
    if (typeof input.difficulty !== 'string' || !Object.hasOwn(COC7_DIFFICULTIES, input.difficulty)) { return invalid(); }
    return { action: input.action, stat: input.stat, difficulty: input.difficulty };
}
