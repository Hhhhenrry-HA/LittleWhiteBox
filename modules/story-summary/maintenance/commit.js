import { maintenanceImpact } from './domain.js';
import { appendMaintenanceReceipt } from '../data/summary-history.js';
import { updateMaintainedAnchorIndex } from '../data/anchor-invalidation.js';
import { requireMemory } from './errors.js';

/** Ports keep staging/verification testable; the host supplies its existing metadata and vector owners. */
export async function commitMemorySession(session, result, ports, signal) {
    requireMemory(session.finished, 'incomplete_finish');
    requireMemory(!signal?.aborted, 'cancelled');
    session.assertCurrent(ports.read());
    const operations = session.operations;
    const impact = maintenanceImpact(operations);
    // getRandomValues is available on LAN HTTP too; receipt IDs are opaque, not UUIDs.
    const id = Array.from(crypto.getRandomValues(new Uint8Array(16)), byte => byte.toString(16).padStart(2, '0')).join('');
    const current = ports.read();
    session.assertCurrent(current);
    const previous = structuredClone({ store: current.store, atoms: current.atoms, l0Index: current.l0Index });
    const receipt = {
        version: 1, id, createdAt: Date.now(), mode: session.mode,
        start: session.start + 1, cutoff: session.cutoff + 1,
        operations, coverage: session.coverage(), summary: result.summary, calls: result.calls,
    };
    const next = structuredClone(previous);
    next.store.json = session.memory.json;
    next.store.updatedAt = Date.now();
    appendMaintenanceReceipt(next.store, receipt);
    const baselineIds = new Set(session.baseline.atoms.map(atom => atom.atomId));
    next.atoms = [...session.memory.atoms, ...current.atoms.filter(atom => !baselineIds.has(atom.atomId))];
    const snapshot = { storySummary: next.store, stateAtoms: next.atoms, l0Index: next.l0Index };
    updateMaintainedAnchorIndex(snapshot, impact.floors);
    try {
        await ports.commit(snapshot, { storySummary: previous.store, stateAtoms: previous.atoms, l0Index: previous.l0Index }, impact, () => {
            requireMemory(!signal?.aborted, 'cancelled');
            session.assertCurrent(ports.read());
        });
    } catch (error) {
        if (error.uncertain) error.receiptId = receipt.id;
        throw error;
    }
    return { receipt, impact };
}
