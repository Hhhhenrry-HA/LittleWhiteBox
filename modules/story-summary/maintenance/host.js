import { getContext } from '../../../../../../extensions.js';
import { getSummaryStore } from '../data/store.js';
import { commitSummaryMemory, getMemoryCommitState, assertMemoryWritable, readPublishedSummaryMemory } from '../data/memory-commit.js';
import { getSummaryPanelConfig } from '../data/config.js';
import { getStateAtoms, getL0Index, deleteStateVectorsByIds } from '../vector/storage/state-store.js';
import { deleteEventVectorsByIds } from '../vector/storage/chunk-store.js';
import { clearRecallRuntime } from '../vector/runtime/runtime.js';
import { runVectorWriteTask, VECTOR_WRITE_SCOPES } from '../vector/runtime/maintenance-coordinator.js';
import { createMemorySession } from './session.js';
import { commitMemorySession } from './commit.js';
import { createSharedMemoryAgent, runMemoryAgent } from './runner.js';
import { createMemoryScheduler } from './scheduler.js';
import { projectMaintenanceReceipts } from './history.js';
import { registerMemoryMaintenance } from './notification.js';
import { maintenanceImpact } from './domain.js';
import { inspectMaintenanceIndexes, repairMaintenanceIndexes } from './indexes.js';
import { requireMemory } from './errors.js';

export function createMemoryMaintenanceHost({ canRun, invalidateRecall, refreshSummary, changed }) {
    let unregister = null;
    const read = () => {
        const context = getContext();
        const store = getSummaryStore();
        return { chatId: context.chatId, chat: context.chat, store, json: store?.json,
            cutoff: store?.lastSummarizedMesId, atoms: getStateAtoms(), l0Index: getL0Index() };
    };
    const scheduler = createMemoryScheduler({
        enabled: () => canRun() && getSummaryPanelConfig().memoryMaintenanceEnabled,
        changed,
        async run(task, signal, phase) {
            requireMemory(canRun(), 'no_boundary');
            const current = read();
            requireMemory(current.chatId === task.chatId && current.cutoff === task.cutoff && current.cutoff >= 0, 'conflict');
            const session = createMemorySession({ ...current, ...task });
            const agent = await createSharedMemoryAgent();
            const result = await runMemoryAgent(session, { ...agent, signal });
            const committed = await runVectorWriteTask({ chatId: task.chatId, kind: 'memory-maintenance-commit', scope: VECTOR_WRITE_SCOPES.CONSISTENCY }, async () => {
                return commitMemorySession(session, result, {
                    read,
                    async commit(next, previous, impact, validate) {
                        phase('saving');
                        return commitSummaryMemory(task.chatId, next, { previous, validate, invalidate: async () => {
                            invalidateRecall();
                            if (impact.eventIds.length) await deleteEventVectorsByIds(task.chatId, impact.eventIds);
                            if (impact.atomIds.length) await deleteStateVectorsByIds(task.chatId, impact.atomIds);
                            await clearRecallRuntime(task.chatId);
                        } });
                    },
                }, signal);
            });
            requireMemory(committed, 'cancelled');
            if (getContext().chatId === task.chatId) {
                invalidateRecall();
                refreshSummary(committed.impact);
            }
            phase('indexing');
            let index;
            try { index = await repairMaintenanceIndexes(task.chatId, committed.impact); }
            catch (error) { index = { status: 'pending', code: error.code || 'index_failed' }; }
            return { ...committed, index };
        },
    });
    return {
        start() {
            if (!unregister) unregister = registerMemoryMaintenance(batch => scheduler.submitted(batch));
        },
        stop() { scheduler.cancel(); unregister?.(); unregister = null; },
        cancel: options => scheduler.cancel(options),
        async results(offset = 0) {
            const chatId = getContext().chatId;
            getSummaryStore();
            const store = readPublishedSummaryMemory().storySummary;
            const page = projectMaintenanceReceipts(store, Math.max(0, Number(offset) || 0));
            const state = scheduler.snapshot(chatId);
            if (getMemoryCommitState() === 'unconfirmed') state.status = 'unconfirmed';
            else if (store.summaryInvalid) state.status = 'history_invalid';
            else if (store.sourceInvalidFromFloor != null || getMemoryCommitState() === 'source_invalid') state.status = 'source_invalid';
            if (state.status === 'unconfirmed') page.items = page.items.filter(receipt => receipt.id !== state.receiptId);
            const impact = maintenanceImpact(page.items.flatMap(receipt => receipt.operations));
            let index;
            try {
                const inspection = await inspectMaintenanceIndexes(chatId, impact);
                index = { status: inspection.status, count: inspection.events.length + inspection.atoms.length };
            } catch (error) { index = { status: 'pending', code: error.code || 'index_read_failed' }; }
            return { ...page, state, index, canReview: canRun() && store?.lastSummarizedMesId >= 0, chatId };
        },
        review() {
            const current = read();
            requireMemory(canRun() && current.cutoff >= 0, 'no_boundary');
            scheduler.review({ chatId: current.chatId, cutoff: current.cutoff });
        },
        async repairIndexes() {
            assertMemoryWritable();
            requireMemory(canRun(), 'no_boundary');
            const current = read();
            const impact = maintenanceImpact((current.store?.summaryHistory || []).flatMap(batch => batch.maintenance || []).flatMap(receipt => receipt.operations));
            return repairMaintenanceIndexes(current.chatId, impact);
        },
    };
}
