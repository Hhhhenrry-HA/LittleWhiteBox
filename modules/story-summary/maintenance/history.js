import { MEMORY_COLLECTIONS, maintenanceImpact } from './domain.js';
import { requireMemory } from './errors.js';

export function validateMaintenanceReceipt(receipt) {
    requireMemory(receipt?.version === 1 && typeof receipt.id === 'string' && Array.isArray(receipt.operations)
        && Array.isArray(receipt.coverage?.reviewed) && Array.isArray(receipt.coverage?.unreviewed)
        && Array.isArray(receipt.coverage?.unresolved) && Array.isArray(receipt.coverage?.missingAnchors), 'invalid_history');
    for (const operation of receipt.operations) {
        requireMemory(['edit', 'delete', 'merge'].includes(operation.kind) && typeof operation.reason === 'string'
            && Array.isArray(operation.evidence) && operation.evidence.length > 0 && Array.isArray(operation.changes), 'invalid_history');
        for (const change of operation.changes) {
            requireMemory(MEMORY_COLLECTIONS.includes(change.collection) && typeof change.key === 'string'
                && Number.isInteger(change.index) && Object.hasOwn(change, 'before') && Object.hasOwn(change, 'after'), 'invalid_history');
            if (change.retired) requireMemory(change.collection === 'anchors'
                && ['source_changed', 'anchors_cleared'].includes(change.retired.reason)
                && Number.isFinite(change.retired.at), 'invalid_history');
        }
    }
    return receipt;
}


export function projectMaintenanceReceipts(store, offset = 0, limit = 10) {
    const all = (store?.summaryHistory || []).flatMap(batch => batch.maintenance || []).reverse();
    return {
        total: all.length,
        next: offset + limit < all.length ? offset + limit : null,
        items: all.slice(offset, offset + limit).map(receipt => ({
            ...receipt,
            counts: {
                summary: receipt.operations.filter(operation => operation.kind !== 'merge' && maintenanceImpact([operation]).summary).length,
                anchors: receipt.operations.filter(operation => operation.changes.some(change => change.collection === 'anchors')).length,
                merges: receipt.operations.filter(operation => operation.kind === 'merge').length,
            },
        })),
    };
}
