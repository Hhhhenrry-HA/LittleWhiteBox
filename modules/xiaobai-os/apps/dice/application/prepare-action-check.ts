import { rollActionCheck } from '../domain/action-check.js';
import { DICE_RECORDS_SCHEMA_VERSION, MAX_ACTION_CHECKS, parseDiceRecords, type DiceMessageRecords } from '../domain/check-records.js';
import { parseActionCheck } from '../protocol/request.js';
import { checkMarker } from '../domain/check-marker.js';

export type PreparedActionCheck = { kind: 'none' } | { kind: 'invalid'; error: string }
    | { kind: 'candidate'; body: string; records: DiceMessageRecords };

/** No random call happens until the request, history and execution limit have been checked. */
export function prepareActionCheck(input: {
    body: string; generatedFrom: number; records?: unknown; id: string; random?: () => number;
}): PreparedActionCheck {
    const parsed = parseActionCheck(input.body, input.generatedFrom);
    if (parsed.kind !== 'request') { return parsed; }
    const records: DiceMessageRecords = input.records === undefined
        ? { schemaVersion: DICE_RECORDS_SCHEMA_VERSION, checks: [] } : parseDiceRecords(input.records);
    if (records.checks.length >= MAX_ACTION_CHECKS) { return { kind: 'invalid', error: 'dice_check_limit' }; }
    const marker = checkMarker(input.id);
    if (records.checks.some(record => record.id === input.id)) { throw new TypeError('dice_record_id_invalid'); }
    const result = rollActionCheck(parsed.request.difficulty, input.random);
    const record = { id: input.id, request: parsed.request, ...result };
    return { kind: 'candidate', body: parsed.body + marker + input.body.slice(parsed.end),
        records: { ...records, checks: [...records.checks, record] } };
}
