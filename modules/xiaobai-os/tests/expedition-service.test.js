import assert from 'node:assert/strict';
import test from 'node:test';
import { setImmediate } from 'node:timers';
import { userEconomyHarness } from './user-economy-harness.js';
import { EXPEDITION_PARTITION } from '../apps/game/expedition/partition.ts';
import { createExpeditionService } from '../apps/game/expedition/service.ts';
import { RULES } from '../apps/game/expedition/content.ts';
import { campaignDriver } from './fixtures/campaign-driver.mjs';
import { narrativeOptions } from './fixtures/expedition-narrative.js';
import { withExpeditionRuntime } from '../apps/game/expedition/host.ts';
import { createExpeditionClient } from '../apps/game/expedition/client.ts';
import { conversationContext } from '../apps/game/expedition/narrative/prompt.ts';
import { courtyardBattle } from '../apps/game/expedition/content/courtyard-encounters.ts';
const start = { type: 'start', weapon: 'blade', outfit: 'traveler' };
async function setup(files, dependencies = {}) {
    const h = await userEconomyHarness({ files }); await h.economy.ensureOpen();
    const service = createExpeditionService(h.store(EXPEDITION_PARTITION), h.transactions, h.economy, { seed: () => 7, ...narrativeOptions, ...dependencies });
    await service.refresh();
    const request = command => ({ actionId: crypto.randomUUID(), revision: service.view().data.revision, command });
    const act = command => service.act(request(command), () => true);
    return { ...h, service, request, act, driver: campaignDriver(() => service.view().data.active, act) };
}

test('complete chapter commits rescue, ending, equipment and wallet rewards and survives a real file reload', async () => {
    const h = await setup(), balance = h.service.view().balance;
    const begin = h.request(start); await h.service.act(begin, () => true); await h.service.act(begin, () => true);
    await h.driver.complete('waterway');
    const end = h.service.view();
    assert.ok(end.data.active.facts.includes('chapter_completed'));
    assert.equal(end.data.active.evidence.dispatchNoteSeen, true);
    const withoutEvidence = structuredClone(end.data.active); withoutEvidence.evidence.dispatchNoteSeen = false;
    for (const id of Object.keys(end.data.active.conversations)) {
        assert.deepEqual(conversationContext(end.data.active, id), conversationContext(withoutEvidence, id));
    }
    assert.equal(end.balance, balance + RULES.firstBossAward + RULES.firstVictoryAward);
    const reloaded = await setup(h.state.files); assert.deepEqual(reloaded.service.view().data, end.data);
    await assert.rejects(reloaded.act({ type: 'choice', id: 'finish', person: 'sanniang' })); assert.equal(reloaded.service.view().balance, end.balance);
});

test('repeatable scenes rotate from confirmed interactions across failed saves and file reload', async () => {
    let h = await setup(); await h.act(start); await h.driver.complete('waterway');
    for (const [person, id, anchor] of [['sanniang', 'sit', 'clinic'], ['laobai', 'stones', 'guard'], ['anian', 'play', 'anian'], ['kouzi', 'tools', 'kouzi']]) {
        await h.driver.walk(anchor); const replies = [];
        for (let i = 0; i < 4; i++) {
            if (i === 1) {
                h.state.mode = 'rejected';
                await assert.rejects(h.act({ type: 'choice', id, person }), { code: 'expedition_save_failed' });
                h.state.mode = 'confirmed'; await h.service.confirm(() => true);
                h = await setup(h.state.files);
            } else { await h.act({ type: 'choice', id, person }); }
            replies.push(h.service.view().data.active.conversations[person].at(-1).reply);
        }
        assert.equal(new Set(replies.slice(0, 3)).size, 3); assert.equal(replies[0], replies[3]);
        assert.equal(h.service.view().data.active.conversations[person].filter(t => t.kind === 'interaction' && t.action === id).length, 4);
    }
});

test('both persuaded and mixed routes finish; Chang suppresses already-raised reinforcements after a failed-save recovery', async () => {
    for (const persuadeGate of [true, false]) {
        let response = { reply: 'fixture', affection: 'up' }, calls = 0;
        const agent = { loadConfig: async () => ({}), openSession: async () => ({ providerConfig: { model: 'fixture' }, run: async () => {
            calls++; return { text: JSON.stringify(response) };
        } }) };
        let h = await setup(undefined, { agent }); await h.act(start);
        const talk = person => h.service.converse({ actionId: crypto.randomUUID(), revision: h.service.view().data.revision, person, text: 'fixture' }, () => true, new AbortController().signal);
        await h.driver.walk('clinic'); await h.act({ type: 'choice', id: 'briefing', person: 'sanniang' });
        for (const [person, anchor] of [['sanniang', 'clinic'], ...(persuadeGate ? [['laobai', 'guard']] : [])]) {
            await h.driver.walk(anchor); response = { reply: 'fixture', affection: 'up' };
            while (h.service.view().data.active.relationships[person].affection < 81) { await talk(person); }
            response = { reply: 'fixture', action: 'share_secret' }; await talk(person);
        }
        await h.driver.walk('guard'); await h.act({ type: 'choice', id: 'receiving', person: 'laobai' });
        await h.driver.interact('road'); await h.driver.interact('gate');
        if (persuadeGate) {
            await h.driver.walk('parley'); response = { reply: 'fixture', action: 'pass' }; await talk('bajin');
            await h.act({ type: 'resolve_parley' });
        }
        await h.driver.interact('beacon'); await h.driver.walk('parley');
        response = { reply: 'fixture' }; await talk('changyounian');
        await h.driver.interact('gate'); await h.driver.interact('crossroads');
        await h.driver.interact('waterway'); await h.driver.interact('sluice'); await h.driver.interact('cells');
        await h.driver.walk('anian_talk'); await talk('anian');
        const captiveTurns = h.service.view().data.active.conversations.anian.length;
        await h.driver.interact('release'); await h.driver.interact('postern_latch'); await h.driver.interact('postern');
        assert.equal(h.service.view().data.active.conversations.anian.length, captiveTurns);
        assert.ok(h.service.view().data.active.facts.includes('alarm_raised'));
        await h.driver.interact('rest'); await h.driver.interact('road'); await h.driver.interact('gate'); await h.driver.interact('beacon'); await h.driver.walk('parley');
        assert.equal(h.service.view().data.active.conversations.changyounian.length, 1);
        response = { reply: 'fixture', action: 'pass' }; h.state.mode = 'rejected';
        await assert.rejects(talk('changyounian'), { code: 'expedition_save_failed' }); const before = calls;
        h.state.mode = 'confirmed'; await h.service.confirm(() => true); h = await setup(h.state.files, { agent });
        assert.equal(calls, before); assert.equal(h.service.view().data.active.pendingParley.enemy, 'changyounian');
        await h.act({ type: 'resolve_parley' });
        const c = h.service.view().data.active;
        assert.ok(c.facts.includes('alarm_silenced')); assert.equal(c.conversations.changyounian.length, 2);
        await h.driver.interact('hall'); await h.driver.walk('encounter', false);
        const fight = h.service.view().data.active;
        assert.equal(fight.phase, 'battle');
        assert.deepEqual(courtyardBattle('hall', new Set(fight.facts), fight.location.position, 7, fight.hp, false).field.waves[0].map(e => e.kind), ['warden']);
        assert.deepEqual(fight.battle.enemies.map(e => e.kind), ['warden']);
        await h.driver.battle(); await h.driver.interact('cells'); await h.driver.interact('postern'); await h.driver.interact('cargo');
        await h.driver.walk('clinic'); await h.act({ type: 'choice', id: 'finish', person: 'sanniang' });
        const end = h.service.view().data; h = await setup(h.state.files, { agent }); assert.deepEqual(h.service.view().data, end);
        assert.equal(end.active.facts.filter(f => f === 'changyounian_passed').length, 1);
        assert.equal(end.active.facts.includes('bajin_passed'), persuadeGate); assert.ok(end.active.facts.includes('chapter_completed'));
    }
});

test('rejected save retains the original candidate; confirmation cannot buy a reroll or duplicate action', async () => {
    let draws = 0; const h = await setup(undefined, { seed: () => { draws++; return 7; } });
    const request = h.request(start); h.state.mode = 'rejected';
    await assert.rejects(h.service.act(request, () => true), { code: 'expedition_save_failed' });
    assert.equal(h.service.view().data.active, null); assert.equal(h.service.view().pending, true);
    h.state.mode = 'confirmed'; await h.service.confirm(() => true);
    assert.equal(draws, 1); assert.equal(h.service.view().data.active.id, request.actionId);
    await h.service.act(request, () => true); assert.equal(draws, 1); assert.equal(h.service.view().data.revision, 1);
    await assert.rejects(h.service.act({ ...request, command: { ...start, outfit: 'guardian' } }, () => true), { code: 'expedition_identity' });
});

test('world position survives chat changes and stale or oversized commands cannot alter it', async () => {
    const h = await setup(); await h.act(start);
    const input = h.request({ type: 'input', spans: [{ move: 3, dash: false, skill: false, ticks: 120 }] });
    await h.service.act(input, () => true); const checkpoint = h.service.view().data;
    h.switchStory('b'); await h.service.refresh(); assert.deepEqual(h.service.view().data, checkpoint);
    await assert.rejects(h.service.act({ ...input, actionId: 'stale-action' }, () => true), { code: 'expedition_stale' });
    await assert.rejects(h.act({ type: 'input', spans: [{ move: 3, dash: false, skill: false, ticks: 1e9 }] }), { code: 'expedition_invalid' });
    const restored = await setup(h.state.files); assert.deepEqual(restored.service.view().data.active, checkpoint.active);
});

test('main generation and identity guards block writes without consuming a seed', async () => {
    let idle = false, draws = 0;
    const h = await setup(undefined, { idle: () => idle, seed: () => { draws++; return 7; } });
    await assert.rejects(h.act(start), { code: 'expedition_unavailable' }); idle = true;
    await assert.rejects(h.service.act(h.request(start), () => false), { code: 'expedition_unavailable' }); assert.equal(draws, 0);
});

test('NPC dialogue and allowed action commit atomically; unknown save confirmation never repeats a paid call', async () => {
    let calls = 0, captured;
    const agent = { loadConfig: async () => ({}), openSession: async () => ({ providerConfig: { model: 'fixture' }, run: async request => {
        calls++; captured = request; return { text: JSON.stringify({ reply: '我在这里等你回来。', action: 'briefing', affection: 'up' }) };
    } }) };
    const h = await setup(undefined, { agent }); await h.act(start); await h.driver.walk('clinic');
    const input = { actionId: 'conversation-one', revision: h.service.view().data.revision, person: 'sanniang', text: '我去把他们带回来。' };
    h.state.mode = 'unknown';
    await assert.rejects(h.service.converse(input, () => true, new AbortController().signal));
    assert.equal(h.service.view().data.active.conversations.sanniang.length, 0);
    assert.equal(h.service.view().data.active.facts.includes('briefed'), false);
    h.state.mode = 'confirmed'; await h.service.confirm(() => true);
    const c = h.service.view().data.active; assert.equal(c.conversations.sanniang.length, 2); assert.ok(c.facts.includes('briefed')); assert.equal(calls, 1);
    assert.ok(c.relationships.sanniang.affection >= 2 && c.relationships.sanniang.affection <= 4);
    assert.equal(c.conversations.sanniang[0].affectionDelta, c.relationships.sanniang.affection);
    assert.equal(h.service.view().replyFailure, null);
    assert.equal(c.conversations.sanniang[0].action, 'briefing'); assert.equal(c.conversations.sanniang[1].kind, 'interaction');
    await h.service.converse(input, () => true, new AbortController().signal); assert.equal(calls, 1);
    assert.equal(h.service.view().data.active.relationships.sanniang.affection, c.relationships.sanniang.affection);
    const restored = await setup(h.state.files, { agent }); assert.deepEqual(restored.service.view().data.active, c);
    assert.equal(captured.messages.at(-1).content, input.text);
    assert.ok(JSON.parse(captured.messages[0].content).actions.includes('briefing'));
    assert.ok(JSON.parse(captured.messages[0].content).actions.includes('follow'));
});

test('model errors, invalid actions, cancellation and changed identity never fabricate saved dialogue', async () => {
    let respond;
    const agent = { loadConfig: async () => ({}), openSession: async () => ({ providerConfig: { model: 'fixture' },
        run: async () => new Promise(resolve => { respond = resolve; }) }) };
    const h = await setup(undefined, { agent }); await h.act(start); await h.driver.walk('clinic');
    let current = true;
    const request = { actionId: 'cancelled-conversation', revision: h.service.view().data.revision, person: 'sanniang', text: '等一等。' };
    const controller = new AbortController(), pending = h.service.converse(request, () => current, controller.signal);
    while (!respond) { await new Promise(resolve => setImmediate(resolve)); }
    current = false; controller.abort(); respond({ text: JSON.stringify({ reply: '应当被丢弃', action: null }) });
    await assert.rejects(pending); assert.equal(h.service.view().data.active.conversations.sanniang.length, 0);
    assert.equal(h.service.view().data.revision, request.revision);
});

test('cancelling while a reply save fails does not poison its retained candidate or shared-file writes', async () => {
    let calls = 0;
    const agent = { loadConfig: async () => ({}), openSession: async () => ({ providerConfig: { model: 'fixture' }, run: async () => {
        calls++; return { text: JSON.stringify({ reply: 'received', action: 'briefing', affection: 'up' }) };
    } }) };
    const h = await setup(undefined, { agent }); await h.act(start); await h.driver.walk('clinic');
    const controller = new AbortController(); let began, rejectSave;
    const uploading = new Promise(resolve => { began = resolve; }), replace = h.storage.replace;
    h.storage.replace = () => { began(); return new Promise((_, reject) => { rejectSave = reject; }); };
    const pending = h.service.converse({ actionId: 'cancel-during-save', revision: h.service.view().data.revision,
        person: 'sanniang', text: 'hello' }, () => true, controller.signal);
    const rejected = assert.rejects(pending, { code: 'expedition_save_failed' });
    await uploading; controller.abort(); rejectSave(Object.assign(new Error('rejected'), { httpStatus: 403 })); await rejected;
    assert.equal(h.service.view().pending, true); h.storage.replace = replace;
    await h.service.confirm(() => true);
    const recovered = h.service.view(); assert.equal(recovered.pending, false); assert.equal(recovered.writeState, 'ready');
    assert.ok(recovered.data.active.facts.includes('briefed')); assert.equal(calls, 1);
    const affection = recovered.data.active.relationships.sanniang.affection;
    await h.service.confirm(() => true); assert.equal(h.service.view().data.active.relationships.sanniang.affection, affection);
    await h.act({ type: 'choice', id: 'sit', person: 'sanniang' });
    assert.equal(h.service.view().data.active.conversations.sanniang.filter(t => t.id === 'cancel-during-save').length, 1);
});

test('rejected actions and raw receipts survive reload without fictional facts, affection or a replacement model request', async () => {
    let calls = 0, response = { text: '{"reply":"received","action":"finish"}' };
    const agent = { loadConfig: async () => ({}), openSession: async () => ({ providerConfig: { model: 'fixture' }, run: async () => { calls++; return response; } }) };
    let h = await setup(undefined, { agent }); await h.act(start); await h.driver.walk('clinic');
    const inputs = [];
    for (const [index, value] of [{ text: '{"reply":"received","action":"finish"}' }, { text: '{broken' },
        { text: '{"reply":"partial","action":"briefing","affection":"up"}', truncated: true }].entries()) {
        response = value;
        const input = { actionId: `receipt-${index}`, revision: h.service.view().data.revision, person: 'sanniang', text: 'hello' };
        inputs.push(input); await h.service.converse(input, () => true, new AbortController().signal);
    }
    const c = h.service.view().data.active;
    assert.deepEqual(c.facts, []); assert.equal(c.relationships.sanniang.affection, 0);
    assert.deepEqual(c.conversations.sanniang.map(t => [t.kind, t.action, t.issue]), [
        ['dialogue', null, 'action_rejected'], ['receipt', null, 'reply_invalid'], ['receipt', null, 'reply_incomplete'],
    ]);
    h = await setup(h.state.files, { agent }); assert.deepEqual(h.service.view().data.active, c);
    for (const input of inputs) await h.service.converse(input, () => true, new AbortController().signal);
    assert.equal(calls, 3);
});

test('a cancelled summary save remains recoverable and never starts a dialogue request after cancellation', async () => {
    let calls = 0;
    const agent = { loadConfig: async () => ({}), openSession: async () => ({ providerConfig: { model: 'fixture' }, run: async () => {
        calls++; return { text: 'Retained attributed memory.', finishReason: 'STOP' };
    } }) };
    const countTokens = async ({ messages }) => ({ tokens: messages.filter(m => m.role === 'assistant').length > 5 ? 130000 : JSON.stringify(messages).length, source: 'estimated' });
    const h = await setup(undefined, { agent, countTokens }); await h.act(start); await h.driver.walk('clinic');
    await h.store(EXPEDITION_PARTITION).transact(tx => {
        const data = structuredClone(tx.current); data.revision++;
        data.active.conversations.sanniang = Array.from({ length: 20 }, (_, i) => ({ id: `older-${i}`, kind: 'dialogue', player: 'question',
            reply: 'answer', action: null, scene: 'camp', facts: [] })); tx.replace(data);
    });
    const controller = new AbortController(); let began, rejectSave;
    const uploading = new Promise(resolve => { began = resolve; }), replace = h.storage.replace;
    h.storage.replace = () => { began(); return new Promise((_, reject) => { rejectSave = reject; }); };
    const pending = h.service.converse({ actionId: 'cancel-summary-save', revision: h.service.view().data.revision,
        person: 'sanniang', text: 'hello' }, () => true, controller.signal);
    const rejected = assert.rejects(pending, { code: 'expedition_save_failed' });
    await uploading; controller.abort(); rejectSave(Object.assign(new Error('rejected'), { httpStatus: 403 })); await rejected;
    h.storage.replace = replace; await h.service.confirm(() => true);
    assert.equal(h.service.view().pending, false); assert.equal(calls, 1);
    assert.equal(h.service.view().replyFailure, null);
    assert.equal(h.service.view().data.active.memories.sanniang.throughId, 'older-14');
    assert.equal(h.service.view().data.active.conversations.sanniang.length, 20);
});

test('a reattached client sees background conversation failure without blocking unrelated game actions', async () => {
    let started, rejectReply; const began = new Promise(resolve => { started = resolve; });
    const agent = { loadConfig: async () => ({}), openSession: async () => ({ providerConfig: { model: 'fixture' }, run: () => {
        started(); return new Promise((_, reject) => { rejectReply = reject; });
    } }) };
    const h = await setup(undefined, { agent }); await h.act(start); await h.driver.walk('clinic');
    const runtime = withExpeditionRuntime({}, h.service, () => 'chat'); let listener;
    const activate = () => runtime.activate({ post: (type, payload) => listener?.({ type, payload }) });
    await activate();
    const pending = runtime.handleMessage({ type: 'game/expedition/talk', payload: { chatIdentity: 'chat', actionId: 'background-failure',
        revision: h.service.view().data.revision, person: 'sanniang', text: 'hello' } });
    const rejected = assert.rejects(pending, { code: 'expedition_agent_failed' });
    await began; await runtime.deactivate('switch-app');
    const client = createExpeditionClient({ subscribe(fn) { listener = fn; return () => { listener = null; }; },
        request: async (type, payload) => ({ result: await runtime.handleMessage({ type, payload }) }) }, 'chat');
    try {
        await activate(); await client.read(); assert.equal(client.talking.value, true);
        rejectReply(Object.assign(new Error('fixture'), { status: 500 })); await rejected;
        assert.equal(client.conversationFailure.value.code, 'expedition_agent_failed'); assert.equal(client.conversationFailure.value.person, 'sanniang');
        assert.equal(client.talking.value, false); assert.equal(client.blocked.value, false);
        client.dismissConversationFailure(); assert.equal(client.conversationFailure.value, null);
        assert.equal(await client.act({ type: 'choice', id: 'sit', person: 'sanniang' }), true);
    } finally { client.dispose(); await runtime.stopBackground(); }
});

test('a live paid request survives deactivation and reactivation, including main-generation starting meanwhile', async () => {
    let resolveReply, started;
    const began = new Promise(resolve => { started = resolve; });
    let idle = true, calls = 0;
    const agent = { loadConfig: async () => ({}), openSession: async () => ({ providerConfig: { model: 'fixture' }, run: () => {
        calls++; started(); return new Promise(resolve => { resolveReply = resolve; });
    } }) };
    const h = await setup(undefined, { agent, idle: () => idle }); await h.act(start); await h.driver.walk('clinic');
    const states = [], runtime = withExpeditionRuntime({}, h.service, () => 'chat');
    const activate = () => runtime.activate({ post: (type, payload) => states.push({ type, payload }) });
    await activate();
    const pending = runtime.handleMessage({ type: 'game/expedition/talk', payload: { chatIdentity: 'chat', actionId: 'live-reply',
        revision: h.service.view().data.revision, person: 'sanniang', text: 'hello' } });
    await began; await runtime.deactivate('switch-app'); await runtime.cancelForeground('minimize'); idle = false;
    await activate();
    const inFlight = await runtime.handleMessage({ type: 'game/expedition/read', payload: { chatIdentity: 'chat' } });
    assert.equal(inFlight.conversation.actionId, 'live-reply');
    resolveReply({ text: '{"reply":"answer"}' }); await pending;
    assert.equal(calls, 1); assert.equal(h.service.view().data.active.conversations.sanniang.at(-1).id, 'live-reply');
    assert.equal(states.at(-1).payload.state.conversation, null);
});

test('malformed expedition data cannot turn a local game error into a fatal whole-App error', async () => {
    const h = await setup(), runtime = withExpeditionRuntime({ handleMessage: async () => 'other-game' }, {
        ...h.service, refresh: async () => { throw Object.assign(new Error('invalid'), { code: 'partition_invalid' }); },
    }, () => 'chat');
    await runtime.activate({ post() {} });
    await assert.rejects(runtime.handleMessage({ type: 'game/expedition/read', payload: { chatIdentity: 'chat' } }), { code: 'expedition_data_invalid' });
    assert.equal(await runtime.handleMessage({ type: 'game/dice/read' }), 'other-game');
});

test('parley waits for acknowledgement, persists its result, and cannot be escaped or submitted without intel', async () => {
    let response = { reply: 'fixture', affection: 'up' }, calls = 0;
    const agent = { loadConfig: async () => ({}), openSession: async () => ({ providerConfig: { model: 'fixture' }, run: async () => {
        calls++; return { text: JSON.stringify(response) };
    } }) };
    let h = await setup(undefined, { agent }); await h.act(start);
    const talk = person => h.service.converse({ actionId: crypto.randomUUID(), revision: h.service.view().data.revision, person, text: 'fixture' }, () => true, new AbortController().signal);
    await h.driver.walk('guard'); await h.act({ type: 'choice', id: 'briefing', person: 'laobai' });
    while (h.service.view().data.active.relationships.laobai.affection < 81) await talk('laobai');
    response = { reply: 'fixture', action: 'share_secret' }; await talk('laobai');
    await h.driver.interact('road'); await h.driver.interact('gate'); await h.driver.walk('parley');
    response = { reply: 'fixture', action: 'pass' }; await talk('bajin');
    assert.deepEqual(h.service.view().data.active.pendingParley, { enemy: 'bajin', decision: 'pass' });
    assert.ok(!h.service.view().data.active.facts.includes('patrol_cleared'));
    const beforeCalls = calls; h = await setup(h.state.files, { agent });
    assert.equal(h.service.view().data.active.pendingParley.decision, 'pass');
    await assert.rejects(h.act({ type: 'interact', id: 'crossroads' }), { code: 'expedition_unavailable' });
    await h.act({ type: 'resolve_parley' });
    assert.equal(calls, beforeCalls); assert.ok(h.service.view().data.active.facts.includes('bajin_passed'));
    assert.equal(h.service.view().data.active.phase, 'exploration');
    await h.driver.walk('parley_side'); response = { reply: 'fixture' }; await talk('bajin');
    assert.equal(h.service.view().data.active.conversations.bajin.length, 2);

    h = await setup(undefined, { agent }); await h.act(start); await h.driver.walk('guard'); await h.act({ type: 'choice', id: 'briefing', person: 'laobai' });
    await h.driver.interact('road'); await h.driver.interact('gate'); await h.driver.walk('parley');
    response = { reply: 'fixture', action: 'pass' }; await talk('bajin');
    assert.equal(h.service.view().data.active.pendingParley, null);
    assert.equal(h.service.view().data.active.conversations.bajin.at(-1).issue, 'action_rejected');
    response = { reply: 'fixture', action: 'attack' }; await talk('bajin');
    h = await setup(h.state.files, { agent });
    assert.equal(h.service.view().data.active.pendingParley.decision, 'attack');
    await assert.rejects(h.act({ type: 'retreat' }), { code: 'expedition_unavailable' });
    await h.act({ type: 'resolve_parley' }); assert.equal(h.service.view().data.active.phase, 'battle');
    await assert.rejects(talk('bajin'), { code: 'expedition_unavailable' });
});
