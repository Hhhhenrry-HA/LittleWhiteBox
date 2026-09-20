import assert from 'node:assert/strict';
import test from 'node:test';
import { administratorHarness, settled, tick } from './administrator-harness.js';
import { createAdministratorData } from '../apps/administrator/domain/data.js';
import { administratorPage } from '../apps/administrator/application/projection.js';
import { ADMINISTRATOR_POLICY } from '../apps/administrator/domain/policy.js';
import { historyBefore } from '../apps/administrator/agent/history.js';

const call = (name, args, id = 'test-call') => ({ text: '', toolCalls: [{ id, name, arguments: JSON.stringify(args) }] });
const userTurn = (id, assistant = '原回复') => ({ id, createdAt: 1, user: { text: '请检查任务' }, assistant, operations: [], status: 'finished', error: '' });

test('corrupt administrator data stays isolated, including JSON null, and explicit clearing recovers the APP', async () => {
    for (const raw of [null, { schemaVersion: 1, turns: 'broken' }]) {
        const h = await administratorHarness({ administrator: raw });
        assert.equal(h.conversation.corrupted(), true);
        await h.world.refreshCurrent(); assert.equal(h.economy.getPlayerBalance(), 100);
        await h.request('clear'); assert.equal(h.conversation.corrupted(), false); assert.deepEqual(h.repository.read().turns, []);
    }
});
test('regeneration rejects write calls at dispatch, rereads floor 55 and replaces only prose while preserving receipts', async () => {
    const turn = userTurn('one'); turn.operations = [{ id: 'old', appId: 'world', name: '修改', target: '', status: 'saved', elapsedMs: 3, summary: 'saved' }];
    const h = await administratorHarness({ administrator: { ...createAdministratorData(), turns: [turn] } });
    let step = 0;
    h.state.generate = async request => {
        assert.equal(request.tools.some(tool => tool.function.name === 'WorldEdit'), false);
        if (step++ === 0) { return call('WorldEdit', { overview: '不应保存' }, 'denied'); }
        if (step === 2) { return call('ChatRead', { from: 55 }, 'read'); }
        return { text: '核实了第55楼。' };
    };
    await h.request('regenerate', { turnId: 'one' }); await settled(h.runtime);
    assert.equal(h.world.readCurrent().world.overview, '');
    assert.equal(h.repository.read().turns[0].assistant, '核实了第55楼。');
    assert.deepEqual(h.repository.read().turns[0].operations, turn.operations);
    assert.equal(h.state.requests.at(-1).messages.filter(m => m.role === 'tool').map(m => JSON.parse(m.content))[0].code, 'read_only');
});
test('failed regeneration save keeps old response until confirmed and invalidates a covered summary without deleting later dialogue', async () => {
    const turns = [userTurn('a'), userTurn('b'), userTurn('c')];
    const h = await administratorHarness({ administrator: { ...createAdministratorData(), turns, summary: { throughId: 'b', text: 'old summary' } } });
    h.state.generate = async () => ({ text: '新的回复' });
    h.state.replace = async () => ({ status: 'failed', error: { code: 'offline', message: 'offline', retryable: true } });
    await h.request('regenerate', { turnId: 'a' }); await settled(h.runtime);
    assert.equal(h.repository.read().turns[0].assistant, '原回复'); assert.equal(h.conversation.unsaved(), true);
    h.state.replace = null; await h.request('confirm');
    assert.equal(h.repository.read().turns[0].assistant, '新的回复'); assert.equal(h.repository.read().summary, null);
    assert.deepEqual(h.repository.read().turns.map(t => t.id), ['a', 'b', 'c']);
});
test('successful business write survives a model failure; retry only continues the pending model step', async () => {
    const h = await administratorHarness(); let step = 0;
    h.state.generate = async () => { if (step++ === 0) { return call('WorldEdit', { overview: '记录已更正' }); } throw new Error('provider offline'); };
    const sent = await h.request('send', { text: '把世界概况改为记录已更正' }); await settled(h.runtime);
    assert.equal(h.world.readCurrent().world.overview, '记录已更正');
    const before = h.state.persisted.partitions.world;
    h.state.generate = async () => ({ text: '修改已保存。' });
    await h.request('retry', { turnId: sent.turnId }); await settled(h.runtime);
    assert.deepEqual(h.state.persisted.partitions.world, before);
    assert.equal(h.repository.read().turns[0].operations.filter(op => op.status === 'saved').length, 1);
});

test('clearing populated history advances its revision and confirms an ambiguous save before deleting attachments', async () => {
    const h = await administratorHarness({ administrator: { ...createAdministratorData(), revision: 8, turns: [userTurn('old')] } });
    h.state.replace = async input => { h.state.persisted = structuredClone(input.candidate); return { status: 'unconfirmed', observed: null }; };
    await assert.rejects(h.request('clear'));
    assert.equal(h.state.removed.length, 0);
    h.state.replace = null;
    const writes = h.state.writes.length;
    const state = await h.request('confirm');
    assert.equal(state.page.revision, 9); assert.equal(state.page.total, 0);
    assert.equal(h.state.writes.length, writes);
    assert.deepEqual(h.state.removed, [{ osId: 'admin-os', all: true }]);
});

test('a released interrupted run rechecks read-only without replaying an uncertain business operation', async () => {
    const turn = { ...userTurn('old'), status: 'interrupted', assistant: null };
    const h = await administratorHarness({ administrator: { ...createAdministratorData(), turns: [turn] } });
    h.state.generate = async request => { assert.ok(request.tools.every(tool => !['WorldEdit', 'TaskComplete', 'MapAtlasEdit'].includes(tool.function.name))); return { text: '已重新核查。' }; };
    await h.request('retry', { turnId: 'old' }); await settled(h.runtime);
    assert.equal(h.repository.read().turns[0].assistant, '已重新核查。');
    assert.equal(h.world.readCurrent().world.overview, '');
});

test('an unavailable floor is a failed read result, so the model can correct its range within the same exchange', async () => {
    const h = await administratorHarness(); let step = 0;
    h.state.generate = async request => {
        if (step++ === 0) { return call('ChatRead', { from: 999 }, 'missing'); }
        if (step === 2) { assert.equal(JSON.parse(request.messages.at(-1).content).status, 'failed'); return call('ChatRead', { from: 55 }, 'corrected'); }
        return { text: '已核对当前第55楼。' };
    };
    await h.request('send', { text: '查看第55楼' }); await settled(h.runtime);
    assert.equal(h.repository.read().turns[0].status, 'finished');
    assert.deepEqual(h.repository.read().turns[0].operations.map(op => op.status), ['failed', 'read']);
});

test('full story text stays in tool context and never enters frame progress or persisted receipts', async () => {
    const h = await administratorHarness(); h.state.messages[55].mes = '原文资料'.repeat(2000); let step = 0;
    h.state.generate = async () => step++ === 0 ? call('ChatRead', { from: 55 }) : { text: '已查阅。' };
    await h.request('send', { text: '查看第55楼' }); await settled(h.runtime);
    const tool = JSON.parse(h.state.requests.at(-1).messages.find(m => m.role === 'tool').content);
    assert.equal(tool.data.items[0].text, h.state.messages[55].mes);
    assert.ok(h.pushed.every(message => JSON.stringify(message).length < 5000));
    assert.ok(JSON.stringify(h.repository.read()).length < 2000);
});

test('concurrent administrator edits expose an adopt path instead of trapping the APP behind an unsavable candidate', async () => {
    const h = await administratorHarness({ administrator: { ...createAdministratorData(), turns: [userTurn('one')] } });
    h.state.generate = async () => {
        h.state.persisted.partitions.administrator.revision++;
        h.state.persisted.partitions.administrator.turns[0].assistant = '另一个窗口保存的回复';
        h.state.persisted.revision++; h.state.persisted.commitId = 'concurrent-save';
        await h.coordinator.refresh();
        return { text: '旧请求生成的回复' };
    };
    await h.request('regenerate', { turnId: 'one' }); await settled(h.runtime);
    assert.equal(h.conversation.conflict(), true); assert.equal(h.conversation.unsaved(), true);
    const adopted = await h.request('adopt');
    assert.equal(adopted.conflict, false); assert.equal(adopted.unsaved, false);
    assert.equal(h.repository.read().turns[0].assistant, '另一个窗口保存的回复');
});
test('image failure retains the user request and attachment; confirmed deletion reclaims only its attachment', async () => {
    const h = await administratorHarness(); h.state.imageFailure = true;
    await h.request('send', { text: '看看这里', image: { name: 'screen.png', dataUrl: 'data:image/png;base64,YQ==' } }); await settled(h.runtime);
    const turn = h.repository.read().turns[0]; assert.equal(turn.user.text, '看看这里'); assert.ok(turn.user.image);
    assert.equal(h.state.requests.length, 0); assert.equal(h.state.removed.length, 0);
    h.state.replace = async () => ({ status: 'unconfirmed', observed: h.state.persisted });
    await assert.rejects(h.request('delete', { turnId: turn.id, role: 'user', revision: h.repository.read().revision }));
    assert.equal(h.state.removed.length, 0);
    h.state.replace = null; await h.request('confirm');
    assert.deepEqual(h.state.removed, [{ osId: 'admin-os', image: turn.user.image }]);
});
test('closing the panel keeps a run alive; changing chat stops subsequent calls and never posts old output into new chat', async () => {
    const h = await administratorHarness(); let finish;
    h.state.generate = request => new Promise((resolve, reject) => { finish = resolve; request.signal.addEventListener('abort', () => reject(request.signal.reason), { once: true }); });
    await h.request('send', { text: '核实一下' }); while (!finish) { await tick(); }
    h.controller.deactivate(); assert.equal(h.runtime.busy(), true);
    h.state.capture.identityKey = 'other-chat'; await h.controller.handleChatChanged();
    finish(call('WorldEdit', { overview: '旧运行不应继续' })); await tick();
    assert.equal(h.state.persisted.partitions.world, undefined);
});
test('history deletion is local, drops affected summary, and frame pages stay bounded for long histories', async () => {
    const turns = Array.from({ length: 100 }, (_, i) => userTurn(String(i), '长'.repeat(9000)));
    const data = { ...createAdministratorData(), turns, summary: { throughId: '50', text: 'older notes' } };
    assert.equal(historyBefore(data, '20').summary, '');
    const h = await administratorHarness({ administrator: data });
    await h.request('delete', { turnId: '10', role: 'assistant', revision: 0 });
    const actual = h.repository.read(); assert.equal(actual.summary, null); assert.equal(actual.turns.length, 100); assert.equal(actual.turns[11].assistant.length, 9000);
    const page = administratorPage(actual);
    assert.equal(page.rows.length, ADMINISTRATOR_POLICY.pageSize);
    assert.ok(page.rows.every(row => row.text.length <= ADMINISTRATOR_POLICY.textBlock));
    assert.ok(page.rows.every(row => row.operations.length <= ADMINISTRATOR_POLICY.visibleOperations));
});
