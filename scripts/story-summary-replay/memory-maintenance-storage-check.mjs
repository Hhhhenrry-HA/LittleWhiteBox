import assert from 'node:assert/strict';
import { EXT_ID } from '../../core/constants.js';
import { getContext, __setReplayContext } from './shims/extensions.js';
import { chat_metadata, __setChatMetadata } from './shims/script.js';
import { maintenanceFixture, joinedEventPatch } from '../../modules/story-summary/tests/fixtures/memory-maintenance.js';
import { getSummaryStore, rollbackSummaryOnce } from '../../modules/story-summary/data/store.js';
import { getStateAtoms, getL0Index, saveStateVectors, getAllStateVectors, deleteStateVectorsByIds } from '../../modules/story-summary/vector/storage/state-store.js';
import { saveEventVectors, getAllEventVectors, deleteEventVectorsByIds } from '../../modules/story-summary/vector/storage/chunk-store.js';
import { readSummaryMemory, commitSummaryMemory } from '../../modules/story-summary/data/memory-commit.js';
import { prepareImportedSummary } from '../../modules/story-summary/data/summary-import.js';
import { createMemorySession } from '../../modules/story-summary/maintenance/session.js';
import { commitMemorySession } from '../../modules/story-summary/maintenance/commit.js';

export async function runMemoryMaintenanceStorageCheck() {
    const previousContext = getContext();
    const previousMetadata = chat_metadata;
    const fixture = maintenanceFixture();
    let failSave = false;
    const source = JSON.stringify(fixture.chat);
    try {
        __setReplayContext({ ...fixture, saveMetadata: async () => { if (failSave) throw new Error('storage unavailable'); } });
        __setChatMetadata({ extensions: { [EXT_ID]: {
            storySummary: { json: fixture.json, lastSummarizedMesId: fixture.cutoff, summaryHistory: [] },
            stateAtoms: fixture.atoms, l0Index: fixture.l0Index,
        } } });
        const imported = prepareImportedSummary(readSummaryMemory(), fixture.json, fixture.cutoff);
        imported.stateAtoms = fixture.atoms;
        imported.l0Index = fixture.l0Index;
        await commitSummaryMemory(fixture.chatId, imported);
        const read = () => ({ ...fixture, store: getSummaryStore(), json: getSummaryStore().json, atoms: getStateAtoms(), l0Index: getL0Index() });
        const ports = {
            read,
            commit: (next, previous, impact, validate) => commitSummaryMemory(fixture.chatId, next, { previous, validate,
                invalidate: async () => {
                    await deleteEventVectorsByIds(fixture.chatId, impact.eventIds);
                    await deleteStateVectorsByIds(fixture.chatId, impact.atomIds);
                },
            }),
        };
        const original = structuredClone(read());
        await saveEventVectors(fixture.chatId, fixture.json.events.map(event => ({ eventId: event.id, vector: [1, 0] })), 'fixture');
        await saveStateVectors(fixture.chatId, fixture.atoms.map(atom => ({ atomId: atom.atomId, floor: atom.floor, vector: [1, 0], rVector: [0, 1] })), 'fixture');
        const session = createMemorySession(read());
        session.initial();
        const references = [2, 18, 20, 22, 23].map(floor => session.runTool('ReadSource', { floor }).reference);
        session.runTool('EditMemory', { kind: 'delete', collection: 'anchors', key: 'atom-1-0', reason: '无依据的确定说法', references: references.slice(0, 1) });
        session.runTool('EditMemory', { kind: 'merge', collection: 'events', key: 'evt-1', removeIds: ['evt-2'], patch: joinedEventPatch, reason: '同一事件续接', references: references.slice(1) });
        session.runTool('FinishReview', { summary: '固定数据安全样本' });
        await commitMemorySession(session, { calls: [], summary: '固定样本' }, ports);
        assert.equal(getL0Index().byFloor['1'].status, 'empty');
        assert.equal(getL0Index().byFloor['1'].atoms, 0);
        assert.deepEqual((await getAllEventVectors(fixture.chatId)).map(item => item.eventId), ['evt-3']);
        assert.equal((await getAllStateVectors(fixture.chatId)).length, 3);
        assert.equal(getSummaryStore().summaryHistory[0].kind, 'baseline');

        const next = createMemorySession(read());
        next.initial();
        const reference = next.runTool('ReadSource', { floor: 2 }).reference;
        next.runTool('EditMemory', { kind: 'edit', collection: 'facts', key: 'f-1', patch: { o: '夏实听说可能与机密有关，未证实' }, reason: '保留不确定性', references: [reference] });
        next.runTool('FinishReview', { summary: '同批第二次维护' });
        const beforeFailure = structuredClone(chat_metadata);
        failSave = true;
        await assert.rejects(commitMemorySession(next, { calls: [], summary: 'second' }, ports));
        assert.deepEqual(chat_metadata, beforeFailure);
        failSave = false;
        await commitMemorySession(next, { calls: [], summary: 'second' }, ports);
        assert.equal(getSummaryStore().summaryHistory[0].maintenance.length, 2);
        __setChatMetadata(structuredClone(chat_metadata));
        assert.equal(getSummaryStore().summaryHistory[0].maintenance.length, 2);
        const undo = await rollbackSummaryOnce(fixture.chatId);
        assert.equal(undo.success, true);
        assert.equal(undo.targetEndMesId, fixture.cutoff);
        assert.deepEqual(getSummaryStore().json, original.json);
        assert.deepEqual(getStateAtoms(), original.atoms);
        assert.equal(getL0Index().byFloor['1'].atoms, 1);
        assert.equal(getSummaryStore().summaryHistory[0].maintenance.length, 0);
        assert.equal(JSON.stringify(fixture.chat), source);
        return { passed: true, sameBatchReceipts: 2, importedBaselineUndo: true, oldVectorsInvalidated: true, sourceUntouched: true, confirmedSaveFailureRestored: true };
    } finally {
        __setReplayContext(previousContext);
        __setChatMetadata(previousMetadata);
    }
}
