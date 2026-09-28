import type { PartitionRegistration } from '../../../kernel/contracts.js';
import { emptyStacking, fault, replay, outcome, count, type Command, type Run, type StackingData } from './domain.js';
import { validPlacement } from './rules.js';
import { cashout, STACKING_POLICY as P } from './policy.js';
function record(value: unknown): Record<string, unknown> {
    if (!value || typeof value !== 'object' || Array.isArray(value)) { fault('invalid'); }
    return value as Record<string, unknown>;
}
export function stackingId(value: unknown): string {
    if (typeof value !== 'string' || !/^[a-zA-Z0-9_-]{1,100}$/.test(value)) { fault('identity'); }
    return value;
}
// SillyTavern is also served on LAN HTTP, where randomUUID is not exposed.
export function newStackingId() { return [...crypto.getRandomValues(new Uint32Array(4))].map(v => v.toString(16).padStart(8, '0')).join(''); }
export function parseCommand(raw: unknown): Command {
    const value = record(raw);
    switch (value.type) {
        case 'start': case 'cashout': case 'abandon': return { type: value.type };
        case 'drop': {
            const pose = { x: value.x as number, direction: value.direction as 1 | -1 };
            if (!validPlacement(pose)) { fault('invalid'); }
            return { type: 'drop', ...pose };
        }
        default: return fault('invalid');
    }
}
function validateRun(raw: unknown): asserts raw is Run {
    const value = record(raw); stackingId(value.id);
    if (!Number.isSafeInteger(value.seed) || Number(value.seed) < 0 || Number(value.seed) > 0xffffffff
        || !Array.isArray(value.moves) || value.moves.length > P.houses
        || ![null, 'cashout', 'abandon'].includes(value.end as null)) { fault('invalid'); }
    value.moves.forEach(pose => parseCommand({ ...record(pose), type: 'drop' }));
    const run = raw as Run, tower = replay(run);
    if (run.end && (tower.failure || tower.placed.length === P.houses)
        || run.end === 'cashout' && !cashout(count(run))) { fault('invalid'); }
}
export function validateStacking(value: unknown): asserts value is StackingData {
    const input = record(value);
    if (!Number.isSafeInteger(input.revision) || Number(input.revision) < 0 || !Array.isArray(input.receipts)) { fault('invalid'); }
    if (input.revision === 0 ? input.last !== null : !input.last) { fault('invalid'); }
    if (input.last !== null) { const last = record(input.last); stackingId(last.id); parseCommand(last.command); }
    const ids = new Set<string>(), actions = new Set<string>();
    for (const raw of input.receipts) {
        const r = record(raw), id = stackingId(r.runId), admission = stackingId(r.admission);
        if (ids.has(id) || actions.has(admission)) { fault('invalid'); }
        ids.add(id); actions.add(admission);
        if (r.settlement !== null) {
            const s = record(r.settlement), action = stackingId(s.actionId);
            if (actions.has(action) || !['won', 'cashed', 'lost', 'abandoned'].includes(String(s.outcome))
                || !Number.isInteger(s.count) || Number(s.count) < 0 || Number(s.count) > P.houses
                || (s.outcome === 'won') !== (s.count === P.houses)
                || s.outcome === 'cashed' && !cashout(Number(s.count))) { fault('invalid'); }
            actions.add(action);
        }
    }
    const data = value as StackingData;
    for (const raw of [input.active, input.best]) {
        if (raw === null) { continue; }
        validateRun(raw);
        const receipt = data.receipts.find(r => r.runId === raw.id), status = outcome(raw);
        if (!receipt || (status === 'playing' ? receipt.settlement !== null
            : receipt.settlement?.outcome !== status || receipt.settlement.count !== count(raw))) { fault('invalid'); }
    }
    if (data.best && (outcome(data.best) === 'playing' || data.best.id === data.active?.id)
        || data.receipts.some(r => r.settlement === null && r.runId !== data.active?.id)
        || (data.receipts.length === 0) !== (data.active === null)) { fault('invalid'); }
}
export const STACKING_PARTITION: PartitionRegistration<StackingData> = {
    key: 'stacking', ownerId: 'game', storage: 'user', schemaVersion: 1, createInitial: emptyStacking,
    parse(value) {
        try { validateStacking(value); return { ok: true, value: structuredClone(value) }; }
        catch (error) { return { ok: false, error: { code: 'partition_invalid', message: error instanceof Error ? error.message : 'stacking_invalid' } }; }
    },
    serialize(value) { validateStacking(value); return structuredClone(value); },
};
