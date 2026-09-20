import type { AdministratorData, AdministratorOperation } from './types.js';
export const createAdministratorData = (): AdministratorData => ({ schemaVersion: 1, revision: 0, turns: [], summary: null });
export function object(value: unknown): Record<string, unknown> {
    if (!value || typeof value !== 'object' || Array.isArray(value)) { throw new Error('administrator_data_invalid'); }
    return value as Record<string, unknown>;
}
export function parseAdministratorData(value: unknown): AdministratorData {
    const data = object(value);
    if (data.schemaVersion !== 1 || !Number.isSafeInteger(data.revision) || Number(data.revision) < 0 || !Array.isArray(data.turns)) { throw new Error('administrator_data_invalid'); }
    const ids = new Set<string>();
    for (const raw of data.turns) {
        const turn = object(raw);
        if (typeof turn.id !== 'string' || !turn.id || ids.has(turn.id) || !Number.isFinite(turn.createdAt)
            || !['finished', 'interrupted', 'failed'].includes(String(turn.status)) || typeof turn.error !== 'string'
            || turn.assistant !== null && typeof turn.assistant !== 'string' || !Array.isArray(turn.operations)) { throw new Error('administrator_data_invalid'); }
        ids.add(turn.id);
        if (turn.user !== null) {
            const user = object(turn.user);
            if (typeof user.text !== 'string') { throw new Error('administrator_data_invalid'); }
            if (user.image !== undefined) {
                const image = object(user.image);
                if (typeof image.name !== 'string' || typeof image.path !== 'string' || !/^\/user\/images\/xb-os-admin-[A-Za-z0-9_-]+\/[A-Za-z0-9_-]+\.(png|jpeg|webp|gif)$/u.test(image.path)) { throw new Error('administrator_data_invalid'); }
            }
        }
        for (const item of turn.operations) {
            const op = object(item);
            if (['id', 'appId', 'name', 'target', 'summary'].some(k => typeof op[k] !== 'string') || !Number.isFinite(op.elapsedMs)
                || !['preparing', 'reading', 'saving', 'read', 'saved', 'unchanged', 'partial', 'failed', 'unconfirmed'].includes(String(op.status))) { throw new Error('administrator_data_invalid'); }
        }
    }
    if (data.summary !== null) {
        const summary = object(data.summary);
        if (typeof summary.text !== 'string' || typeof summary.throughId !== 'string' || !ids.has(summary.throughId)) { throw new Error('administrator_data_invalid'); }
    }
    return structuredClone(data) as unknown as AdministratorData;
}
export function invalidateSummary(data: AdministratorData, turnId: string): void {
    if (data.summary && data.turns.findIndex(t => t.id === turnId) <= data.turns.findIndex(t => t.id === data.summary!.throughId)) { data.summary = null; }
}
export function settledOperations(operations: readonly AdministratorOperation[]) {
    return operations.map(op => ({ ...op, status: op.status === 'saving' ? 'unconfirmed' as const : ['preparing', 'reading'].includes(op.status) ? 'failed' as const : op.status }));
}
