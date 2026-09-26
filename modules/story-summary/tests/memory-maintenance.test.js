// Contracts: atomic domain edits/undo, evidence authority, persistence ordering and scheduler cost boundaries.
// Pure/session ports catch corruption and paid-trigger mistakes which retrieval tests do not exercise.
import assert from 'node:assert/strict';
import test from 'node:test';
import { editMemory, restoreMaintenance, maintenanceImpact } from '../maintenance/domain.js';
import { createMemorySession, MEMORY_PAGE_CHARS } from '../maintenance/session.js';
import { createEvidenceReader, SOURCE_PAGE_CHARS } from '../maintenance/evidence.js';
import { projectMaintenanceReceipts } from '../maintenance/history.js';
import { upgradeSummaryHistory, appendMaintenanceReceipt, createSummaryBaseline } from '../data/summary-history.js';
import { buildSummaryUndo, applyExactSummaryHistoryUndo } from '../data/summary-undo.js';
import { commitMemorySession } from '../maintenance/commit.js';
import { createMemoryScheduler } from '../maintenance/scheduler.js';
import { runMemoryAgent } from '../maintenance/runner.js';
import { createMetadataConfirmation } from '../data/metadata-confirmation.js';
import { EXT_ID } from '../../../core/constants.js';
import { maintenanceFixture, joinedEventPatch } from './fixtures/memory-maintenance.js';
import { projectSummaryEvent } from '../data/events.js';
import { upgradeStoredEventMemoryRoles } from '../data/migrations/event-memory-role.js';

const data = () => { const fixture = maintenanceFixture(); return { json: fixture.json, atoms: fixture.atoms }; };
const merge = { kind: 'merge', collection: 'events', key: 'evt-1', removeIds: ['evt-2'], patch: joinedEventPatch };
const receiptFor = changes => ({ version: 1, id: 'receipt', operations: [{ ...merge, changes, reason: '同一事件的后续', evidence: [{ floor: 22 }] }],
    coverage: { reviewed: [], unreviewed: [], unresolved: [], missingAnchors: [] } });

test('cross-batch merge preserves oldest identity, redirects causes, leaves independent episode and anchors intact', () => {
    const before = data();
    const result = editMemory(before, merge, 23);
    assert.equal(result.memory.json.events.length, 3);
    assert.equal(result.memory.json.events[0].id, 'evt-1');
    assert.deepEqual(result.memory.json.events.find(event => event.id === 'evt-4').causedBy, ['evt-1']);
    assert.deepEqual(result.memory.json.events.find(event => event.id === 'evt-3'), before.json.events[2]);
    assert.deepEqual(result.memory.atoms, before.atoms);
    assert.deepEqual(maintenanceImpact([{ changes: result.changes }]).eventIds, ['evt-1', 'evt-2', 'evt-4']);
    assert.deepEqual(restoreMaintenance(result.memory, [receiptFor(result.changes)]), before);
    assert.equal(before.json.events.length, 4);
});

test('invalid merge is atomic, refuses younger identity, dangling causes and excessive cause union', () => {
    const before = data();
    assert.throws(() => editMemory(before, { ...merge, key: 'evt-2', removeIds: ['evt-1'] }, 23), { code: 'keep_oldest' });
    assert.throws(() => editMemory(before, { kind: 'delete', collection: 'events', key: 'evt-2' }, 23), { code: 'invalid_reference' });
    for (let i = 5; i <= 8; i++) before.json.events.push({ ...before.json.events[2], id: `evt-${i}` });
    before.json.events[0].causedBy = ['evt-5', 'evt-6'];
    before.json.events[1].causedBy = ['evt-7', 'evt-8'];
    const snapshot = structuredClone(before);
    assert.throws(() => editMemory(before, merge, 23), { code: 'cause_limit' });
    assert.deepEqual(before, snapshot);
});

test('maintenance then batch undo restores the early episode, not a future ending or entire deletion', () => {
    const generated = data();
    const previous = structuredClone(generated.json);
    previous.events = previous.events.filter(event => event._addedAt === 19);
    const undo = buildSummaryUndo(previous, generated.json);
    const result = editMemory(generated, merge, 23);
    const history = [{ format: 2, kind: 'batch', endMesId: 23, previousEndMesId: 19, undo, maintenance: [receiptFor(result.changes)] }];
    const restored = applyExactSummaryHistoryUndo(result.memory.json, history, 19, 23, result.memory.atoms);
    assert.equal(restored.historyDiscontinuous, false);
    assert.deepEqual(restored.json, previous);
    assert.deepEqual(restored.atoms, generated.atoms);
});

test('ordered repeated maintenance also restores aliases and anchors; manual conflict refuses all', () => {
    const before = data();
    before.json.characterAliases = [{ from: '实', to: '药君', evidence: '旧记录', _addedAt: 19 }];
    const first = editMemory(before, { kind: 'edit', collection: 'characterAliases', key: '实', patch: { to: '夏实' } }, 23);
    const second = editMemory(first.memory, { kind: 'edit', collection: 'anchors', key: 'atom-1-0', patch: { semantic: '夏实听说自己可能因看到机密而被回收，但未经证实。', edges: [] } }, 23);
    assert.notEqual(second.memory.atoms[0].quality, before.atoms[0].quality);
    const receipts = [receiptFor(first.changes), receiptFor(second.changes)];
    assert.deepEqual(restoreMaintenance(second.memory, receipts), before);
    second.memory.atoms[0].semantic = '用户新编辑';
    assert.throws(() => restoreMaintenance(second.memory, receipts), { code: 'conflict' });
});

test('existing exact and boundary-only histories upgrade once; imported baseline does not fabricate undo', () => {
    const old = [{ endMesId: 19 }, { format: 1, endMesId: 23, previousEndMesId: 19, undo: buildSummaryUndo({}, {}) }];
    const upgraded = upgradeSummaryHistory(old);
    assert.equal(upgraded.changed, true);
    assert.equal(upgradeSummaryHistory(upgraded.value).changed, false);
    assert.equal(upgraded.value[0].kind, 'baseline');
    const store = { lastSummarizedMesId: 23, summaryHistory: [createSummaryBaseline(23)] };
    appendMaintenanceReceipt(store, receiptFor([]));
    assert.equal(store.summaryHistory[0].kind, 'baseline');
    assert.equal(applyExactSummaryHistoryUndo({}, store.summaryHistory, 19, 23).historyDiscontinuous, true);
    assert.equal(projectMaintenanceReceipts(store).items[0].counts.merges, 1);
});

test('evidence is read-only, bounded, paged and append-safe; edits/swipes/search misses invalidate evidence', () => {
    const fixture = maintenanceFixture();
    fixture.chat[1].mes = '长'.repeat(SOURCE_PAGE_CHARS + 10);
    const reader = createEvidenceReader(fixture.chat, 2);
    const first = reader.read({ floor: 2 });
    assert.equal(first.complete, false);
    const next = reader.read(first.next);
    assert.equal(next.text.length, 10);
    assert.throws(() => reader.read({ floor: 4 }), { code: 'source_boundary' });
    assert.throws(() => reader.evidence(['2:0:1']), { code: 'evidence_required' });
    fixture.chat.push({ mes: '后续' });
    assert.doesNotThrow(() => reader.assertCurrent(fixture.chat));
    fixture.chat[1].swipe_id = 1;
    assert.throws(() => reader.assertCurrent(fixture.chat), { code: 'conflict' });
    const search = createEvidenceReader(fixture.chat, 2);
    search.search({ query: '并不存在' });
    fixture.chat[0].mes = '改写了被搜索过的原文';
    assert.throws(() => search.assertCurrent(fixture.chat), { code: 'conflict' });
});

function correctedSession() {
    const fixture = maintenanceFixture();
    const session = createMemorySession(fixture);
    session.runTool('ReadMemory', { collection: 'facts', key: 'f-1' });
    const source = session.runTool('ReadSource', { floor: 2 });
    session.runTool('EditMemory', { kind: 'edit', collection: 'facts', key: 'f-1', patch: { o: '夏实听说可能与看到机密有关，未证实' }, reason: '保留传闻的不确定性', references: [source.reference] });
    session.runTool('FinishReview', { summary: '修正传闻，其他项目未审。' });
    return { session, fixture };
}

test('reading is not reviewing; mutation requires read memory and actual cited evidence; missing anchors stay visible', () => {
    const fixture = maintenanceFixture();
    const session = createMemorySession(fixture);
    const command = { kind: 'edit', collection: 'facts', key: 'f-1', patch: { o: '传闻' }, reason: '纠正', references: [] };
    assert.throws(() => session.runTool('EditMemory', command), { code: 'read_first' });
    session.runTool('ReadMemory', { collection: 'facts', key: 'f-1' });
    assert.throws(() => session.runTool('EditMemory', command), { code: 'evidence_required' });
    assert.equal(session.coverage().reviewed.length, 0);
    assert.ok(session.coverage().missingAnchors.some(item => item.floor === 18));
    assert.throws(() => session.runTool('WriteSource', {}), { code: 'invalid_operation' });
});

test('session accepts newly extracted anchors and later chat, but rejects edits to existing memory or another chat', () => {
    const { fixture, session } = correctedSession();
    const current = { ...fixture, atoms: [...fixture.atoms, { atomId: 'later', floor: 17 }], chat: [...fixture.chat, { mes: '继续' }] };
    assert.doesNotThrow(() => session.assertCurrent(current));
    assert.throws(() => session.assertCurrent({ ...current, chatId: 'other' }), { code: 'conflict' });
    current.json.facts[0].o = '手改';
    assert.throws(() => session.assertCurrent(current), { code: 'conflict' });
});

function commitPorts(fixture) {
    let state = { ...fixture, store: { json: fixture.json, lastSummarizedMesId: fixture.cutoff, summaryHistory: [createSummaryBaseline(fixture.cutoff)] } };
    const order = [];
    return {
        order,
        read: () => ({ ...state, json: state.store.json }),
        async commit(next, previous, impact, validate) {
            validate();
            state = { ...state, store: structuredClone(next.storySummary), atoms: structuredClone(next.stateAtoms), l0Index: structuredClone(next.l0Index) };
            order.push('commit');
        },
    };
}

test('maintenance constructs one atomic draft, preserves appended anchors and records coverage', async () => {
    const { fixture, session } = correctedSession();
    fixture.atoms.push({ atomId: 'new-extraction', floor: 17 });
    const ports = commitPorts(fixture);
    const result = await commitMemorySession(session, { calls: [], summary: 'partial' }, ports);
    assert.deepEqual(ports.order, ['commit']);
    assert.equal(ports.read().atoms.at(-1).atomId, 'new-extraction');
    assert.equal(ports.read().store.summaryHistory[0].maintenance[0].id, result.receipt.id);
    assert.ok(result.receipt.coverage.unreviewed.length > 0);
});

test('maintenance rejects a changed source when the data commit validates after cache invalidation', async () => {
    const { fixture, session } = correctedSession();
    const ports = commitPorts(fixture);
    ports.commit = async (next, previous, impact, validate) => {
        ports.read().store.json.facts[0].o = 'manual';
        validate();
    };
    await assert.rejects(commitMemorySession(session, { calls: [], summary: 'partial' }, ports), { code: 'conflict' });
    assert.equal(ports.read().store.json.facts[0].o, 'manual');
    assert.equal(ports.read().store.summaryHistory[0].maintenance.length, 0);
});

test('cancellation during confirmed persistence remains a saved result, not an uncommitted cancellation', async () => {
    const { fixture, session } = correctedSession();
    const ports = commitPorts(fixture);
    const controller = new AbortController();
    ports.commit = async () => controller.abort();
    const result = await commitMemorySession(session, { calls: [], summary: 'partial' }, ports, controller.signal);
    assert.ok(result.receipt.id);
});

test('readback verification detects swallowed saves and retries only read failures', async () => {
    const context = { chatId: 'fixture', characterId: 0, characters: [{ name: '角色', chat: 'fixture', avatar: 'fixture.png' }] };
    let calls = 0;
    const fetcher = async (_url, options) => {
        calls++;
        assert.equal(JSON.parse(options.body).file_name, 'fixture');
        if (calls < 3) throw new Error('read network');
        return { ok: true, json: async () => [{ chat_metadata: { extensions: { [EXT_ID]: { storySummary: { value: 1 } } } } }] };
    };
    const confirm = createMetadataConfirmation(context, () => ({}), fetcher);
    await confirm({ storySummary: { value: 1 } });
    assert.equal(calls, 3);
    await assert.rejects(confirm({ storySummary: { value: 2 } }, { storySummary: { value: 1 } }), { code: 'metadata_not_saved', uncertain: false });
    await assert.rejects(confirm({ storySummary: { value: 2 } }), { uncertain: true });
});

test('shared tool loop returns argument errors to the model and uses configured parameters without saving drafts', async () => {
    const session = createMemorySession(maintenanceFixture());
    let calls = 0;
    const adapter = { chat: async task => {
        assert.equal(task.reasoning.effort, 'low');
        calls++;
        if (calls === 2) assert.equal(JSON.parse(task.messages.at(-1).content).status, 'error');
        return { toolCalls: [{ id: `call-${calls}`, name: calls === 1 ? 'EditMemory' : 'FinishReview',
            arguments: JSON.stringify(calls === 1 ? {} : { summary: '无法完成，保留全部未审项目。' }) }] };
    } };
    await runMemoryAgent(session, { adapter, config: { reasoning: { effort: 'low' } } });
    assert.equal(calls, 2);
    assert.equal(session.operations.length, 0);
    assert.ok(session.coverage().unreviewed.length);
});

test('scheduler is zero-call until trigger, serial, cancellation hands old scope to the newest batch, restart is idle', async () => {
    let enabled = false;
    const tasks = [];
    const scheduler = createMemoryScheduler({ enabled: () => enabled, run: async (task, signal) => {
        tasks.push(task);
        if (tasks.length === 1) await new Promise(resolve => signal.addEventListener('abort', resolve, { once: true }));
        if (signal.aborted) throw new Error('cancelled');
        return { receipt: { id: 'r' } };
    } });
    scheduler.submitted({ chatId: 'a', cutoff: 19, start: 0 });
    enabled = true;
    await Promise.resolve();
    assert.equal(tasks.length, 0);
    scheduler.submitted({ chatId: 'a', cutoff: 19, start: 0 });
    await Promise.resolve();
    scheduler.submitted({ chatId: 'a', cutoff: 39, start: 20 });
    await scheduler.settled();
    assert.deepEqual(tasks.map(task => [task.start, task.cutoff]), [[0, 19], [0, 39]]);
    const restarted = createMemoryScheduler({ enabled: () => true, run: () => assert.fail('reload called model') });
    assert.equal(restarted.snapshot('a').status, 'idle');
});

test('partial memory pages are not readable edit baselines until every segment has been delivered', () => {
    const fixture = maintenanceFixture();
    fixture.json.facts[0].o = '长'.repeat(MEMORY_PAGE_CHARS + 100);
    const session = createMemorySession(fixture);
    const page = session.runTool('ReadMemory', { collection: 'facts', key: 'f-1' });
    assert.equal(page.items[0].value, undefined);
    assert.ok(page.items[0].excerpt.length <= MEMORY_PAGE_CHARS);
    assert.throws(() => session.runTool('ReviewMemory', { collection: 'facts', key: 'f-1', status: 'unresolved', reason: '未读完' }), { code: 'read_first' });
    session.runTool('ReadMemory', { collection: 'facts', key: 'f-1', textOffset: page.items[0].nextTextOffset });
    session.runTool('ReviewMemory', { collection: 'facts', key: 'f-1', status: 'unresolved', reason: '无法查证' });
    assert.equal(session.coverage().unresolved.length, 1);
});

test('bad tool JSON shapes remain recoverable errors and cannot change internal floor identity', () => {
    const session = createMemorySession(maintenanceFixture());
    assert.throws(() => session.runTool('ReadMemory', null), { code: 'invalid_operation' });
    assert.throws(() => session.runTool('ReadMemory', { query: {} }), { code: 'invalid_operation' });
    session.initial();
    const reference = session.runTool('ReadSource', { floor: 2 }).reference;
    assert.throws(() => session.runTool('EditMemory', { kind: 'edit', collection: 'anchors', key: 'atom-1-0', patch: { floor: 999 }, reason: '尝试改楼层', references: [reference] }), { code: 'invalid_operation' });
    assert.equal(session.operations.length, 0);
});

test('alias corrections use the existing graph contract rather than creating identity cycles', () => {
    const before = data();
    before.json.characterAliases = [{ from: '甲', to: '乙', evidence: '', _addedAt: 1 }, { from: '乙', to: '丙', evidence: '', _addedAt: 1 }];
    assert.throws(() => editMemory(before, { kind: 'edit', collection: 'characterAliases', key: '乙', patch: { to: '甲' } }, 23), { code: 'invalid_alias' });
});

test('input and turn ceilings refuse a saveable draft; no implicit API retry occurs', async () => {
    let calls = 0;
    const session = createMemorySession(maintenanceFixture());
    const adapter = { chat: async () => { calls++; return { toolCalls: [{ id: 'read', name: 'ReadMemory', arguments: '{}' }] }; } };
    await assert.rejects(runMemoryAgent(session, { adapter, config: {}, limits: { turns: 1, inputChars: 100000 } }), { code: 'budget' });
    assert.equal(session.finished, false);
    assert.equal(calls, 1);
    await assert.rejects(runMemoryAgent(createMemorySession(maintenanceFixture()), { adapter, config: {}, limits: { turns: 1, inputChars: 1 } }), { code: 'budget' });
    assert.equal(calls, 1);
});

test('manual review ignores the automatic preference; disabling only auto does not cancel a manual run', async () => {
    let calls = 0;
    let release;
    const scheduler = createMemoryScheduler({ enabled: () => false, run: async (_task, signal) => {
        calls++;
        await new Promise(resolve => { release = resolve; });
        assert.equal(signal.aborted, false);
        return { receipt: { id: 'manual' } };
    } });
    scheduler.review({ chatId: 'a', cutoff: 19 });
    await Promise.resolve();
    scheduler.cancel({ automaticOnly: true });
    assert.equal(calls, 1);
    release();
    await scheduler.settled();
    assert.equal(scheduler.snapshot('a').status, 'saved');
});

test('uncertain data commit reports receipt identity without claiming a successful maintenance', async () => {
    const { fixture, session } = correctedSession();
    const ports = commitPorts(fixture);
    ports.commit = async () => { throw Object.assign(new Error('unconfirmed'), { uncertain: true }); };
    await assert.rejects(commitMemorySession(session, { calls: [], summary: 'partial' }, ports), error => error.uncertain && !!error.receiptId);
});

// Regressions from review: successful-tool fixtures missed failed tools batched with FinishReview,
// load-time projection, HTTP browser capabilities and the pre-notification save window.
test('a batched tool error must reach the model before finish, for both shared adapter loop protocols', async () => {
    for (const supportsSessionToolLoop of [false, true]) {
        const fixture = maintenanceFixture();
        const session = createMemorySession(fixture);
        const reference = `2:0:${fixture.chat[1].mes.length}`;
        const edit = { kind: 'edit', collection: 'anchors', key: 'atom-1-0', reason: '保留传闻归属', references: [reference] };
        const tools = commands => ({ toolCalls: commands.map(([name, args], index) => ({ id: `call-${index}`, name, arguments: JSON.stringify(args) })) });
        let calls = 0;
        const result = await runMemoryAgent(session, { config: {}, adapter: { supportsSessionToolLoop, chat: async request => {
            calls++;
            if (calls === 1) return tools([
                ['ReadSource', { floor: 2 }],
                ['EditMemory', { ...edit, collection: 'facts', key: 'f-1', patch: { o: '听说可能因为看到了机密，未证实' } }],
                ['EditMemory', { ...edit, patch: { floor: 999 } }],
                ['FinishReview', { summary: '已修复两侧' }],
            ]);
            assert.equal(session.finished, false);
            assert.deepEqual(session.operations.map(operation => operation.collection), ['facts']);
            const feedback = supportsSessionToolLoop ? request.toolResponses.map(item => item.response)
                : request.messages.filter(message => message.role === 'tool').map(message => JSON.parse(message.content));
            assert.deepEqual(feedback.filter(item => item.status === 'error').map(item => item.code), ['invalid_operation', 'finish_after_error']);
            return tools([
                ['EditMemory', { ...edit, patch: { semantic: '夏实听说自己可能因为看到机密而被回收，未经确证。', edges: [] } }],
                ['FinishReview', { summary: '修正两侧传闻，其余未审。' }],
            ]);
        } } });
        assert.equal(calls, 2);
        assert.equal(session.finished, true);
        assert.deepEqual(session.operations.map(operation => operation.collection), ['facts', 'anchors']);
        const ports = commitPorts(fixture);
        await commitMemorySession(session, result, ports);
        assert.deepEqual(ports.read().store.json, session.memory.json);
        assert.deepEqual(ports.read().atoms, session.memory.atoms);
    }
});

test('a failed batched edit at the execution limit cannot authorize a partial save', async () => {
    const fixture = maintenanceFixture();
    const session = createMemorySession(fixture);
    const adapter = { chat: async () => ({ toolCalls: [
        { id: 'bad-edit', name: 'EditMemory', arguments: '{}' },
        { id: 'finish', name: 'FinishReview', arguments: JSON.stringify({ summary: '已完成' }) },
    ] }) };
    await assert.rejects(runMemoryAgent(session, { adapter, config: {}, limits: { turns: 1, inputChars: 240000 } }), { code: 'budget' });
    const ports = commitPorts(fixture);
    await assert.rejects(commitMemorySession(session, { calls: [], summary: '已完成' }, ports), { code: 'incomplete_finish' });
    assert.deepEqual(ports.order, []);
});

test('current-format reload preserves repeated maintenance and enclosing summary undo, but not actual edits', () => {
    const generated = data();
    delete generated.json.events[0].timeLabel;
    generated.json.events = generated.json.events.map(projectSummaryEvent);
    const previous = structuredClone(generated.json);
    previous.events = previous.events.filter(event => event._addedAt === 19);
    const first = editMemory(generated, { kind: 'edit', collection: 'events', key: 'evt-1', patch: { timeLabel: '当天' } }, 23);
    const second = editMemory(first.memory, merge, 23);
    const store = JSON.parse(JSON.stringify({ json: second.memory.json, summaryHistory: [{ format: 2, kind: 'batch',
        endMesId: 23, previousEndMesId: 19, undo: buildSummaryUndo(previous, generated.json),
        maintenance: [receiptFor(first.changes), receiptFor(second.changes)],
    }] }));
    upgradeStoredEventMemoryRoles(store);
    const receipts = store.summaryHistory[0].maintenance;
    assert.deepEqual(restoreMaintenance({ json: store.json, atoms: generated.atoms }, receipts), generated);
    const restored = applyExactSummaryHistoryUndo(store.json, store.summaryHistory, 19, 23, generated.atoms);
    assert.equal(restored.historyDiscontinuous, false);
    assert.deepEqual(restored.json, previous);
    store.json.events[0].participants.reverse();
    assert.throws(() => restoreMaintenance({ json: store.json, atoms: generated.atoms }, receipts), { code: 'conflict' });
});

test('receipt commits work without secure-context randomUUID and retain distinct history identities', async t => {
    const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'crypto');
    const getRandomValues = crypto.getRandomValues.bind(crypto);
    Object.defineProperty(globalThis, 'crypto', { configurable: true, value: { getRandomValues } });
    t.after(() => Object.defineProperty(globalThis, 'crypto', descriptor));
    const { fixture, session } = correctedSession();
    const ports = commitPorts(fixture);
    const first = await commitMemorySession(session, { calls: [], summary: 'partial' }, ports);
    const next = createMemorySession(ports.read());
    next.runTool('FinishReview', { summary: '无新修改' });
    const second = await commitMemorySession(next, { calls: [], summary: '无新修改' }, ports);
    assert.ok(first.receipt.id);
    assert.notEqual(first.receipt.id, second.receipt.id);
    assert.deepEqual(projectMaintenanceReceipts(ports.read().store).items.map(item => item.id), [second.receipt.id, first.receipt.id]);
    assert.deepEqual(ports.order, ['commit', 'commit']);
});

test('conflict before the new summary save notification hands off scope without an immediate retry', async () => {
    for (const mode of ['auto', 'manual']) {
        const fixture = maintenanceFixture();
        let current = { ...fixture, cutoff: 19 };
        let completeOld;
        const tasks = [];
        const scheduler = createMemoryScheduler({ enabled: () => true, run: async task => {
            tasks.push(task);
            if (tasks.length === 1) {
                const session = createMemorySession(current);
                await new Promise(resolve => { completeOld = resolve; });
                session.assertCurrent(current);
            }
            return { receipt: { id: 'saved' } };
        } });
        if (mode === 'manual') scheduler.review({ chatId: fixture.chatId, cutoff: 19 });
        else scheduler.submitted({ chatId: fixture.chatId, start: 0, cutoff: 19 });
        await Promise.resolve();
        current = { ...current, cutoff: 23 };
        completeOld();
        await scheduler.settled();
        assert.equal(tasks.length, 1);
        assert.equal(scheduler.snapshot(fixture.chatId).code, 'conflict');
        scheduler.submitted({ chatId: fixture.chatId, start: 20, cutoff: 23 });
        await scheduler.settled();
        assert.deepEqual(tasks.map(task => [task.start, task.cutoff, task.mode]), [[0, 19, mode], [0, 23, mode]]);
        scheduler.submitted({ chatId: fixture.chatId, start: 24, cutoff: 39 });
        await scheduler.settled();
        assert.equal(tasks[2].start, 24);
    }
});

test('abandoned conflict scopes do not survive cancellation, another chat, restart or uncertain saves', async () => {
    for (const scenario of ['cancel', 'disable', 'other-chat', 'restart', 'uncertain', 'transport']) {
        const tasks = [];
        const options = { enabled: () => true, run: async task => {
            tasks.push(task);
            if (tasks.length === 1) throw Object.assign(new Error('failed'), {
                code: scenario === 'transport' ? 'agent_failed' : 'conflict', uncertain: scenario === 'uncertain',
            });
            return { receipt: { id: 'saved' } };
        } };
        let scheduler = createMemoryScheduler(options);
        scheduler.submitted({ chatId: 'a', start: 0, cutoff: 19 });
        await scheduler.settled();
        if (scenario === 'cancel') scheduler.cancel();
        if (scenario === 'disable') scheduler.cancel({ automaticOnly: true });
        if (scenario === 'restart') scheduler = createMemoryScheduler(options);
        scheduler.submitted({ chatId: scenario === 'other-chat' ? 'b' : 'a', start: 20, cutoff: 39 });
        await scheduler.settled();
        assert.equal(tasks[1].start, 20, scenario);
    }
});
