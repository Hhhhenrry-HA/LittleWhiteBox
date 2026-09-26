/* global Buffer */
// Real summary/anchor/history transaction, HTTP confirmation and IndexedDB boundary.
// Protects import undo, source retirement and ambiguous saves; no model calls or source-text assertions.
import assert from 'node:assert/strict';
import { beforeEach, after, test } from 'node:test';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { build } from 'esbuild';
import 'fake-indexeddb/auto';
import { maintenanceFixture } from './fixtures/memory-maintenance.js';

const root = fileURLToPath(new URL('../../../', import.meta.url));
const host = globalThis.__memoryStorageTest = { metadata: {}, context: {} };
const shims = {
    'extensions.js': 'export const getContext=()=>globalThis.__memoryStorageTest.context;',
    'script.js': 'export let chat_metadata=globalThis.__memoryStorageTest.metadata; export function reload(){chat_metadata=globalThis.__memoryStorageTest.metadata;} export const getRequestHeaders=()=>({});',
    'debug-core.js': 'export const xbLog={info(){},warn(){},error(){},debug(){}};',
    'runtime.js': 'export const applyRecallRuntimeMutationBestEffort=()=>{}; export const clearRecallRuntime=async()=>{};',
};
const bundled = await build({
    stdin: { resolveDir: root, contents: [
        "export * from './modules/story-summary/data/store.js';",
        "export * from './modules/story-summary/data/memory-commit.js';",
        "export * from './modules/story-summary/data/summary-import.js';",
        "export * from './modules/story-summary/data/summary-history.js';",
        "export * from './modules/story-summary/data/anchor-extraction.js';",
        "export * from './modules/story-summary/data/anchor-invalidation.js';",
        "export * from './modules/story-summary/maintenance/domain.js';",
        "export * from './modules/story-summary/maintenance/history.js';",
        "export * from './modules/story-summary/vector/storage/state-store.js';",
        "export { db, stateVectorsTable } from './modules/story-summary/data/db.js';",
        "export { reload } from 'script.js';",
    ].join('\n') },
    bundle: true, write: false, format: 'esm', platform: 'node',
    plugins: [{ name: 'host-boundaries', setup(api) {
        api.onResolve({ filter: /.*/ }, args => Object.hasOwn(shims, path.basename(args.path))
            ? { path: path.basename(args.path), namespace: 'host' } : null);
        api.onLoad({ filter: /.*/, namespace: 'host' }, args => ({ contents: shims[args.path], resolveDir: root }));
    } }],
});
// eslint-disable-next-line no-unsanitized/method -- Generated local test bundle, never external code.
const mod = await import('data:text/javascript;base64,' + Buffer.from(bundled.outputFiles[0].text).toString('base64'));
const originalFetch = globalThis.fetch;
after(() => { mod.db.close(); globalThis.fetch = originalFetch; delete globalThis.__memoryStorageTest; });
const ext = () => host.metadata.extensions.LittleWhiteBox;
const disk = () => host.files.get(host.context.chatId).extensions.LittleWhiteBox;

beforeEach(async () => {
    for (const table of mod.db.tables) await table.clear();
    const fixture = maintenanceFixture();
    Object.assign(host, { fixture, mode: 'save', reads: 0, writes: 0, afterSave: null, files: new Map(), metadata: { extensions: { LittleWhiteBox: {} } } });
    host.context = { ...fixture, characterId: 0, characters: [{ name: '角色', chat: fixture.chatId, avatar: 'fixture.png' }],
        saveMetadata: async () => {
            host.writes++;
            if (host.mode !== 'old') host.files.set(host.context.chatId, structuredClone(host.metadata));
            await host.afterSave?.();
            if (host.mode === 'throw_after' || host.mode === 'old') throw new Error('transport');
        },
    };
    host.files.set(fixture.chatId, structuredClone(host.metadata));
    globalThis.fetch = async (url, request) => {
        host.reads++;
        if (host.mode === 'read_fail') throw new Error('read offline');
        const key = JSON.parse(request.body).file_name;
        return new Response(JSON.stringify([{ chat_metadata: host.files.get(key) }]));
    };
    mod.reload();
    mod.getSummaryStore();
});

async function importFixture() {
    const next = mod.prepareImportedSummary(mod.readSummaryMemory(), host.fixture.json, host.fixture.cutoff);
    await mod.commitSummaryMemory(host.context.chatId, next);
    return structuredClone(ext().storySummary.json);
}

async function seedAnchors() {
    const next = mod.readSummaryMemory();
    next.stateAtoms = structuredClone(host.fixture.atoms);
    next.l0Index = structuredClone(host.fixture.l0Index);
    await mod.commitSummaryMemory(host.context.chatId, next);
}

async function maintain(commands) {
    const next = mod.readSummaryMemory();
    let memory = { json: next.storySummary.json, atoms: next.stateAtoms };
    const operations = commands.map(command => {
        const result = mod.editMemory(memory, command, host.fixture.cutoff);
        memory = result.memory;
        return { ...command, reason: 'fixed evidence', evidence: [{ floor: 2 }], changes: result.changes };
    });
    next.storySummary.json = memory.json;
    next.stateAtoms = memory.atoms;
    mod.appendMaintenanceReceipt(next.storySummary, { version: 1, id: `receipt-${host.writes}`, operations,
        coverage: { reviewed: [], unreviewed: [], unresolved: [], missingAnchors: [] } });
    await mod.commitSummaryMemory(host.context.chatId, next);
    return operations;
}
const fixFact = { kind: 'edit', collection: 'facts', key: 'f-1', patch: { o: '未经证实的传闻' } };
const fixAnchor = { kind: 'edit', collection: 'anchors', key: 'atom-1-0', patch: { semantic: '夏实说听说可能如此，自己没有确证。' } };

test('actual import baseline: repeated maintenance is reversible but imported events/facts are not erased', async () => {
    const original = await importFixture();
    assert.equal(mod.getRollbackOnceTargetEndMesId(ext().storySummary), null);
    await maintain([fixFact]);
    await maintain([{ ...fixFact, patch: { o: '夏实只听说，未查证' } }]);
    host.metadata = structuredClone(host.metadata); mod.reload();
    const result = await mod.rollbackSummaryOnce(host.context.chatId);
    assert.equal(result.success, true);
    assert.equal(result.targetEndMesId, 23);
    assert.deepEqual(ext().storySummary.json, original);
    assert.equal(original.events.length, 4);
    assert.equal(original.facts.length, 5);
    assert.equal(mod.getRollbackOnceTargetEndMesId(ext().storySummary), null);
    assert.deepEqual(disk(), ext());
});

test('upstream import boundary converts once; corrupt exact inverse cannot become a baseline', () => {
    const oldImport = [{ endMesId: 23 }];
    const upgraded = mod.upgradeSummaryHistory(oldImport);
    assert.equal(upgraded.value[0].kind, 'baseline');
    assert.equal(mod.getRollbackOnceTargetEndMesId({ lastSummarizedMesId: 23, summaryHistory: upgraded.value }), null);
    assert.throws(() => mod.upgradeSummaryHistory([{ format: 1, previousEndMesId: -1, endMesId: 23, undo: { version: 1, unknown: true } }]));
});

for (const kind of ['edit', 'delete']) {
    test(`${kind} anchor: clear retires history, reload and same-ID extraction cannot resurrect old source`, async () => {
        const original = await importFixture();
        await seedAnchors();
        await maintain([fixFact, { ...fixAnchor, kind }]);
        await mod.saveStateVectors(host.context.chatId, [{ atomId: 'atom-1-0', floor: 1, vector: [1, 0] }], 'test');
        const writes = host.writes;
        await mod.invalidateSummaryAnchors(host.context.chatId, 0, 'anchors_cleared');
        assert.equal(host.writes - writes, 1);
        assert.equal((await mod.getAllStateVectors(host.context.chatId)).length, 0);
        const receipt = ext().storySummary.summaryHistory[0].maintenance[0];
        assert.equal(receipt.operations[1].changes[0].retired.reason, 'anchors_cleared');
        assert.equal(mod.maintenanceImpact(receipt.operations).atomIds.length, 0);
        assert.ok(receipt.operations[1].changes[0].before);
        host.metadata = structuredClone(host.metadata); mod.reload();
        const extraction = mod.createAnchorExtractionDraft(host.context.chatId, host.context.chat);
        const regenerated = { ...host.fixture.atoms[0], semantic: '重新提取的新正文，不能被旧撤销覆盖' };
        extraction.addAtoms([regenerated]);
        extraction.setStatus(1, { status: 'ok', atoms: 1 });
        await extraction.commit();
        assert.equal((await mod.rollbackSummaryOnce(host.context.chatId)).success, true);
        assert.deepEqual(ext().storySummary.json, original);
        assert.deepEqual(ext().stateAtoms, [regenerated]);
    });
}

test('active anchor conflicts still refuse undo; retirement only skips explicitly invalidated changes', async () => {
    await importFixture(); await seedAnchors(); await maintain([fixFact, fixAnchor]);
    const edit = mod.readSummaryMemory();
    edit.stateAtoms[0].semantic = '人工修改';
    await mod.commitSummaryMemory(host.context.chatId, edit);
    const before = structuredClone(ext());
    const result = await mod.rollbackSummaryOnce(host.context.chatId);
    assert.equal(result.reason, 'history_discontinuous');
    assert.deepEqual(ext(), before);
});

test('source invalidation scans every batch, including absent anchors, before undoing a generated batch', async () => {
    await importFixture(); await seedAnchors();
    await maintain([{ ...fixAnchor, kind: 'delete' }]);
    // Add a new generated batch after the imported baseline.
    const next = mod.readSummaryMemory();
    const merged = mod.mergeNewData(next.storySummary.json, { factUpdates: [{ s: '夏实', p: '城市', o: '北京' }] }, 25, { returnMeta: true });
    next.storySummary.json = merged.json;
    next.storySummary.lastSummarizedMesId = 25;
    mod.addSummarySnapshot(next.storySummary, 23, 25, merged.undo);
    await mod.commitSummaryMemory(host.context.chatId, next);
    host.context.chat.push({ mes: 'new', is_user: true }, { mes: 'new reply', is_user: false });
    // Ordinary edit keeps L2 but retires the older, already absent L0 operation.
    await mod.rollbackSummaryIfNeeded({ invalidateFromFloor: 1 });
    assert.equal(ext().storySummary.lastSummarizedMesId, 25);
    assert.ok(ext().storySummary.summaryHistory[0].maintenance[0].operations[0].changes[0].retired);
    const result = await mod.rollbackSummaryIfNeeded({ changedFromFloor: 24 });
    assert.equal(result.status, 'rolled_back');
    assert.equal(ext().storySummary.lastSummarizedMesId, 23);
    assert.equal((await mod.rollbackSummaryOnce(host.context.chatId)).success, true);
    assert.equal(ext().stateAtoms.length, 0);
});

test('source replacement across baseline preserves imported content and persists only source invalidity', async () => {
    const original = await importFixture(); await seedAnchors();
    host.context.chat[20].mes = 'changed';
    const result = await mod.rollbackSummaryIfNeeded({ changedFromFloor: 20 });
    assert.equal(result.reason, 'source_boundary_invalid');
    assert.deepEqual(ext().storySummary.json, original);
    assert.equal(ext().storySummary.sourceInvalidFromFloor, 20);
    assert.equal(ext().storySummary.summaryInvalid, undefined);
    assert.equal(mod.isSummaryConsumable(ext().storySummary, 24), false);
    assert.deepEqual(disk(), ext());
});

test('undoing baseline maintenance cannot clear an unresolved source boundary', async () => {
    const original = await importFixture(); await maintain([fixFact]);
    await mod.rollbackSummaryIfNeeded({ changedFromFloor: 20 });
    assert.equal((await mod.rollbackSummaryOnce(host.context.chatId)).success, true);
    assert.deepEqual(ext().storySummary.json, original);
    assert.equal(ext().storySummary.sourceInvalidFromFloor, 20);
    assert.equal(mod.isSummaryConsumable(ext().storySummary, 24), false);
});

test('source stays blocked when both rollback and safety-marker saves are confirmed not saved', async () => {
    await importFixture();
    host.mode = 'old';
    await assert.rejects(mod.rollbackSummaryIfNeeded({ changedFromFloor: 20 }), { code: 'metadata_not_saved' });
    assert.equal(mod.getMemoryCommitState(), 'source_invalid');
    assert.equal(mod.isSummaryConsumable(ext().storySummary, 24), false);
    assert.equal(ext().storySummary.summaryInvalid, undefined);
    host.mode = 'save';
    await mod.clearSummaryData(host.context.chatId);
    assert.equal(mod.getMemoryCommitState(), 'ready');
});

test('ordinary source edit with failed vector cleanup blocks old anchors without corrupting history', async t => {
    await importFixture(); await seedAnchors(); await maintain([fixAnchor]);
    const original = structuredClone(ext().storySummary.json);
    const cacheFailure = t.mock.method(mod.stateVectorsTable, 'where', () => { throw new Error('cache offline'); });
    host.context.chat[1].mes = 'edited source';
    await assert.rejects(mod.rollbackSummaryIfNeeded({ invalidateFromFloor: 1 }), { code: 'memory_cache_invalidation_failed' });
    assert.deepEqual(ext().storySummary.json, original);
    assert.equal(ext().storySummary.summaryInvalid, undefined);
    assert.equal(ext().storySummary.sourceInvalidFromFloor, 1);
    assert.equal(mod.isSummaryConsumable(ext().storySummary, 24), false);
    assert.deepEqual(disk(), ext());
    cacheFailure.mock.restore();
    await mod.clearSummaryData(host.context.chatId);
    assert.equal(ext().stateAtoms.length, 0);
    assert.equal(mod.getMemoryCommitState(), 'ready');
});

test('ordinary source edit with failed metadata save remains blocked until invalid anchors are cleared', async () => {
    await importFixture(); await seedAnchors(); await maintain([fixAnchor]);
    host.mode = 'old';
    host.context.chat[1].mes = 'edited source';
    await assert.rejects(mod.rollbackSummaryIfNeeded({ invalidateFromFloor: 1 }), { code: 'metadata_not_saved' });
    assert.equal(mod.getMemoryCommitState(), 'source_invalid');
    assert.equal(mod.isSummaryConsumable(ext().storySummary, 24), false);
    host.mode = 'save';
    await mod.clearSummaryData(host.context.chatId);
    assert.equal(ext().stateAtoms.length, 0);
    assert.deepEqual(ext().l0Index.byFloor, {});
    assert.equal(mod.getMemoryCommitState(), 'ready');
});

test('in-flight saves publish no draft receipt and reject another writer without overwriting it', async () => {
    await importFixture();
    let finish;
    host.afterSave = () => new Promise(resolve => { finish = resolve; });
    const next = mod.readSummaryMemory(); next.storySummary.json.facts[0].o = 'pending';
    const saving = mod.commitSummaryMemory(host.context.chatId, next);
    while (!finish) await Promise.resolve();
    assert.equal(mod.getMemoryCommitState(), 'saving');
    assert.notEqual(mod.readPublishedSummaryMemory().storySummary.json.facts[0].o, 'pending');
    await assert.rejects(mod.commitSummaryMemory(host.context.chatId, mod.readSummaryMemory()), { code: 'metadata_saving' });
    finish(); await saving;
    assert.equal(mod.readPublishedSummaryMemory().storySummary.json.facts[0].o, 'pending');
});

test('failed save confirmed old restores the entire previous snapshot in one place', async () => {
    await importFixture(); await seedAnchors();
    const before = structuredClone(ext());
    host.mode = 'old';
    const next = mod.prepareImportedSummary(mod.readSummaryMemory(), { events: [], facts: [] }, 23);
    await assert.rejects(mod.commitSummaryMemory(host.context.chatId, next), { code: 'metadata_not_saved', uncertain: false });
    assert.deepEqual(ext(), before);
    assert.deepEqual(disk(), before);
    assert.equal(mod.getMemoryCommitState(), 'ready');
});

for (const mode of ['read_fail', 'different']) {
    test(`${mode}: ambiguous import never restores old memory, gates every write, and reload is read-only recovery`, async () => {
        await importFixture(); await seedAnchors();
        host.mode = mode;
        if (mode === 'different') host.afterSave = () => { disk().storySummary.json.facts[0].o = 'external disk edit'; };
        const next = mod.prepareImportedSummary(mod.readSummaryMemory(), host.fixture.json, 23);
        next.storySummary.json.facts[0].o = 'new import';
        const reads = host.reads;
        await assert.rejects(mod.commitSummaryMemory(host.context.chatId, next), { uncertain: true });
        assert.equal(ext().storySummary.json.facts[0].o, 'new import');
        assert.equal(ext().stateAtoms.length, 0);
        assert.equal(mod.getMemoryCommitState(), 'unconfirmed');
        assert.equal(ext().storySummary.summaryInvalid, undefined);
        assert.equal(mod.isSummaryConsumable(ext().storySummary, 24), false);
        assert.equal(host.reads - reads, mode === 'read_fail' ? 3 : 1);
        const writes = host.writes;
        await assert.rejects(mod.clearSummaryData(host.context.chatId), { uncertain: true });
        await assert.rejects(mod.invalidateSummaryAnchors(host.context.chatId), { uncertain: true });
        assert.throws(() => mod.createAnchorExtractionDraft(host.context.chatId, host.context.chat), { uncertain: true });
        assert.equal(host.writes, writes);
        host.metadata = structuredClone(host.files.get(host.context.chatId)); mod.reload(); mod.getSummaryStore();
        assert.equal(mod.getMemoryCommitState(), 'ready');
        assert.equal(host.writes, writes);
    });
}

test('thrown save with confirmed new disk is success, not a false rollback', async () => {
    await importFixture(); host.mode = 'throw_after';
    const next = mod.readSummaryMemory(); next.storySummary.json.facts[0].o = 'confirmed';
    await mod.commitSummaryMemory(host.context.chatId, next);
    assert.deepEqual(disk(), ext());
    assert.equal(mod.getMemoryCommitState(), 'ready');
});

test('concurrent manual mutation during a failed save is preserved and quarantined, never restored over', async () => {
    await importFixture(); host.mode = 'old';
    host.afterSave = () => { ext().storySummary.json.facts[1].o = 'later manual edit'; };
    const next = mod.readSummaryMemory(); next.storySummary.json.facts[0].o = 'staged';
    await assert.rejects(mod.commitSummaryMemory(host.context.chatId, next), { uncertain: true });
    assert.equal(ext().storySummary.json.facts[1].o, 'later manual edit');
    assert.equal(mod.getMemoryCommitState(), 'unconfirmed');
});

test('draft validation and vector failure leave canonical memory unchanged and release the write gate', async () => {
    await importFixture();
    const before = structuredClone(ext());
    const writes = host.writes;
    await assert.rejects(mod.commitSummaryMemory(host.context.chatId, mod.readSummaryMemory(), {
        invalidate: async () => { throw new Error('cache unavailable'); },
    }));
    assert.deepEqual(ext(), before);
    assert.equal(host.writes, writes);
    assert.equal(mod.getMemoryCommitState(), 'ready');
});

test('L0 results remain draft-only, merge with newer summary, but cannot overwrite an edited source', async () => {
    await importFixture();
    const extraction = mod.createAnchorExtractionDraft(host.context.chatId, host.context.chat);
    extraction.addAtoms(host.fixture.atoms.slice(0, 1)); extraction.setStatus(1, { status: 'ok', atoms: 1 });
    assert.equal(ext().stateAtoms.length, 0);
    await maintain([fixFact]);
    await extraction.commit();
    assert.equal(ext().storySummary.json.facts[0].o, fixFact.patch.o);
    const stale = mod.createAnchorExtractionDraft(host.context.chatId, host.context.chat);
    stale.setStatus(3, { status: 'empty', atoms: 0 });
    host.context.chat[2].mes = 'changed USER';
    await assert.rejects(stale.commit(), { code: 'metadata_draft_conflict' });
    assert.equal(ext().l0Index.byFloor[3], undefined);
});

test('a chat switch during confirmation never restores or installs into the newly opened chat', async () => {
    await importFixture();
    const old = host.metadata;
    host.afterSave = () => {
        host.metadata = { extensions: { LittleWhiteBox: { storySummary: { json: { facts: ['other chat'] } } } } };
        host.context = { ...host.context, chatId: 'other' }; mod.reload();
    };
    const next = mod.readSummaryMemory(); next.storySummary.json.facts[0].o = 'first chat';
    await mod.commitSummaryMemory(host.context.chatId, next);
    assert.equal(old.extensions.LittleWhiteBox.storySummary.json.facts[0].o, 'first chat');
    assert.deepEqual(ext().storySummary.json.facts, ['other chat']);
    assert.equal(mod.getMemoryCommitState(), 'ready');
});
