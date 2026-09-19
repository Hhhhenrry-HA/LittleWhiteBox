import { parseActionCheckRequest, type ActionCheckRequest, type ActionCheckResult } from './action-check.js';
import { checkMarker, checkMarkerIds } from './check-marker.js';
import { upgradeDiceRecordsV1 } from '../storage/records-v1.js';

export const MAX_ACTION_CHECKS = 8;
export const DICE_MESSAGE_KEY = 'xiaobaiOsDice';
export const DICE_RECORDS_SCHEMA_VERSION = 2;

export interface ActionCheckRecord extends ActionCheckResult {
    id: string;
    request: ActionCheckRequest;
}
export interface DiceMessageRecords { schemaVersion: typeof DICE_RECORDS_SCHEMA_VERSION; checks: ActionCheckRecord[] }

export function parseDiceRecords(value: unknown): DiceMessageRecords {
    if (!value || typeof value !== 'object' || Array.isArray(value)) { throw new TypeError('dice_records_invalid'); }
    const raw = value as Record<string, unknown>;
    const input = (raw.schemaVersion === 1 ? upgradeDiceRecordsV1(raw) : raw) as Record<string, unknown>;
    if (input.schemaVersion !== DICE_RECORDS_SCHEMA_VERSION || Object.keys(input).length !== 2 || !Array.isArray(input.checks)
        || input.checks.length > MAX_ACTION_CHECKS) { throw new TypeError('dice_records_invalid'); }
    const ids = new Set<string>();
    const checks = input.checks.map((item: unknown) => {
        if (!item || typeof item !== 'object' || Array.isArray(item)) { throw new TypeError('dice_record_invalid'); }
        const record = item as ActionCheckRecord;
        const keys = ['id', 'request', 'roll', 'dc', 'outcome'];
        if (Object.keys(record).length !== keys.length || keys.some(key => !Object.hasOwn(record, key))
            || typeof record.id !== 'string' || !/^[a-zA-Z0-9_-]+$/.test(record.id) || ids.has(record.id)
            || !Number.isInteger(record.roll) || record.roll < 1 || record.roll > 20
            || !Number.isInteger(record.dc) || record.dc < 1
            || !['critical_failure', 'failure', 'success', 'critical_success'].includes(record.outcome)) {
            throw new TypeError('dice_record_invalid');
        }
        ids.add(record.id);
        // Historical outcomes are stored facts, not recalculated from today's difficulty table.
        return { ...record, request: parseActionCheckRequest(record.request) };
    });
    return { schemaVersion: DICE_RECORDS_SCHEMA_VERSION, checks };
}

/**
 * The body chooses which saved results are referenced and their presentation order.
 * Unreferenced records remain history, including the number of checks already used.
 */
export function referencedActionChecks(body: string, checks: readonly ActionCheckRecord[]): ActionCheckRecord[] {
    const byId = new Map(checks.map(record => [record.id, record]));
    return Array.from(checkMarkerIds(body)).flatMap(id => {
        const record = byId.get(id);
        return record ? [record] : [];
    });
}

export function isCheckContinuationPoint(body: string, record: ActionCheckRecord): boolean {
    const marker = checkMarker(record.id);
    const offset = body.indexOf(marker);
    return offset !== -1 && !body.slice(offset + marker.length).trim();
}
