import assert from 'node:assert/strict';
import test from 'node:test';
import { createClassroomFixture } from './fixtures/learning-classroom.js';
import { createLearningSpeech } from '../apps/learning/application/speech.js';
import { createLearningService } from '../apps/learning/application/service.js';
import { learningClassView } from '../apps/learning/application/projection.js';
import { parseLearningData } from '../domains/learning/data.js';
import { learningSpeechParts } from '../domains/learning/speech.js';
import { createLearningPractice } from '../apps/learning/application/practice.js';

test('formal classroom opens without a model, saves a lesson, submits, completes and automatically pays once', async t => {
    const h = await createClassroomFixture(); t.after(h.dispose);
    assert.equal(h.counts.provider, 0); assert.equal(h.counts.userWrites, 0);
    await h.openLesson(); await h.economy.ensureOpen();
    const initial = h.state();
    assert.equal(initial.unit.reward.amount, 20);
    assert.equal(initial.unit.exercises[0].solution, null);
    const q = initial.unit.exercises[0];
    const after = await h.command('submit', { unitId: initial.unit.id, exerciseId: q.id, answer: { kind: 'choice', ids: ['a'] } });
    assert.equal(after.completions[0].paid, true, after.message);
    assert.equal(h.economy.getPlayerBalance(), 120);
    const calls = h.counts.provider;
    await h.command('reward', { unitId: initial.unit.id });
    await h.command('records'); await h.command('read'); await h.reenter();
    assert.equal(h.counts.provider, calls); assert.equal(h.economy.getPlayerBalance(), 120);
    assert.equal(h.profile().unit.attempts.length, 1);
    assert.deepEqual(h.failures, []);
});

test('unconfirmed completion remains unpublished; recovery pays only after confirmation without asking a model again', async t => {
    const h = await createClassroomFixture(); t.after(h.dispose); await h.openLesson(); await h.economy.ensureOpen();
    const unit = h.profile().unit;
    const service = createLearningService(h.repository);
    await service.prepareAttempt({ language: 'en', unitId: unit.id, exerciseId: unit.exercises[0].id, answer: { kind: 'choice', ids: ['a'] },
        scope: unit.scope, osId: unit.originOsId, replays: 0, slowPlayback: false }).save(() => true);
    h.flags.userFailure = true;
    const result = await h.command('complete');
    assert.equal(result.storage, 'unconfirmed'); assert.equal(result.completions.length, 0); assert.equal(h.economy.getPlayerBalance(), 100);
    const calls = h.counts.provider; h.confirmUser();
    const verified = await h.command('verify');
    assert.equal(verified.completions[0].paid, true, verified.message);
    assert.equal(h.counts.provider, calls); assert.equal(h.economy.getPlayerBalance(), 120);
});

test('ledger failure and receipt failure retain the completed lesson and never multiply the reward', async t => {
    const h = await createClassroomFixture(); t.after(h.dispose); await h.openLesson(); await h.economy.ensureOpen();
    const unit = h.profile().unit; h.flags.ledgerFailure = true;
    let state = await h.command('submit', { unitId: unit.id, exerciseId: unit.exercises[0].id, answer: { kind: 'choice', ids: ['a'] } });
    assert.equal(state.completions.length, 1); assert.equal(state.completions[0].paid, false);
    const calls = h.counts.provider; h.flags.ledgerFailure = false; h.flags.userFailure = true;
    state = await h.command('reward', { unitId: unit.id });
    assert.equal(h.economy.getPlayerBalance(), 120); assert.equal(state.storage, 'unconfirmed'); assert.equal(state.completions[0].paid, false);
    h.confirmUser(); await h.command('verify'); await h.command('reward', { unitId: unit.id });
    assert.equal(h.economy.getPlayerBalance(), 120); assert.equal(h.counts.provider, calls);
    assert.equal(h.profile().completions[0].receipt.transactionId.length > 0, true);
});

test('wallet closed is not auto-opened; cross-story copies cannot read the private course or take its reward', async t => {
    const h = await createClassroomFixture(); t.after(h.dispose); await h.openLesson();
    const unit = h.profile().unit;
    let state = await h.command('submit', { unitId: unit.id, exerciseId: unit.exercises[0].id, answer: { kind: 'choice', ids: ['a'] } });
    assert.equal(h.economy.isOpen(), false); assert.equal(state.completions[0].paid, false);
    const view = learningClassView(h.repository.snapshot().document.data, 'en', 'other');
    assert.equal(view.unit, null); assert.equal(view.blockedUnit, true); assert.equal(view.completions[0].originHere, false);
    state = await h.command('reward', { unitId: unit.id, openWallet: true });
    assert.equal(state.completions[0].paid, true); assert.equal(h.economy.getPlayerBalance(), 120);
});

test('hidden listening text and keys stay off the reading surface; reveal/notes/selection are real saved facts', async t => {
    const h = await createClassroomFixture({ listening: true }); t.after(h.dispose); await h.openLesson();
    const unit = h.profile().unit; const material = unit.materials[0]; const exercise = unit.exercises[0];
    assert.equal(h.state().unit.materials[0].paragraphs.length, 0);
    assert.equal(h.state().unit.exercises[0].solution, null);
    const calls = h.counts.provider;
    let state = await h.command('play', { materialId: material.id, partKey: learningSpeechParts(material)[0].key, exerciseId: exercise.id });
    assert.equal(state.media.status, 'unavailable'); assert.equal(h.profile().unit.listening, undefined); assert.equal(h.counts.provider, calls);
    state = await h.command('reveal', { kind: 'transcripts', id: material.id });
    assert.equal(state.unit.materials[0].paragraphs[0].text, material.paragraphs[0].text);
    await h.command('explain', { exerciseId: exercise.id, message: '解释这一句。', selection: { materialId: material.id, paragraphId: material.paragraphs[0].id,
        start: 0, end: 6, quote: material.paragraphs[0].text.slice(0, 6) } });
    await h.command('save-note');
    assert.equal((await h.reenter()).unit.notes.length, 1);
    const saved = structuredClone(h.repository.snapshot().document.data);
    saved.profiles[0].unit.notes[0].selection.quote = 'not the original';
    assert.throws(() => parseLearningData(saved));
});

test('only actual audio play records listening; replays freeze the original voice and submissions inherit the facts', async t => {
    const h = await createClassroomFixture({ listening: true }); t.after(h.dispose); await h.openLesson();
    const classroom = { language: 'en', osId: h.profile().unit.originOsId, chatIdentity: 'runtime-a', teacher: { name: '林老师', note: '' } };
    const players = []; const calls = []; const errors = [];
    const facade = { isEnabled: () => true, getVoices: () => ({ defaultVoice: 'voice-a', voices: [{ id: 'voice-a', available: true }, { id: 'voice-b', available: true }] }),
        createPlayer() { const player = { activate: () => true, playNow: () => true, dispose() {}, setPlaybackRate: value => value, pause() {}, resume() {}, seek: () => true }; players.push(player); return player; },
        synthesize: async (text, options) => { calls.push({ text, options }); return new Blob(['fixture']); }, openSettings() {},
    };
    const speech = createLearningSpeech({ repository: h.repository, current: () => classroom, getFacade: () => facade, onState() {}, onSave() {}, onError: () => errors.push('failure') });
    t.after(speech.stop);
    const unit = h.profile().unit; const material = unit.materials[0]; const exercise = unit.exercises[0];
    const part = learningSpeechParts(material)[0];
    await speech.play({ materialId: material.id, exerciseId: exercise.id, partKey: part.key });
    assert.equal(h.profile().unit.listening, undefined);
    players[0].onStateChange('blocked'); await speech.flush(); assert.equal(h.profile().unit.listening, undefined);
    players[0].onStateChange('playing'); await speech.flush();
    speech.media.setRate(0.75); await speech.flush();
    const service = createLearningService(h.repository);
    await service.setVoice('en', { voiceId: 'voice-b', language: 'en', speed: 1 }, () => true);
    await speech.play({ materialId: material.id, exerciseId: exercise.id, partKey: part.key });
    players[1].onStateChange('playing'); await speech.flush();
    assert.equal(calls[1].options.speaker, 'voice-a');
    await service.prepareAttempt({ language: 'en', unitId: unit.id, exerciseId: exercise.id, answer: { kind: 'choice', ids: ['a'] },
        scope: unit.scope, osId: unit.originOsId, replays: 0, slowPlayback: false }).save(() => true);
    const attempt = h.profile().unit.attempts[0];
    assert.equal(attempt.listening.voiceId, 'voice-a'); assert.equal(attempt.help.replays, 1); assert.equal(attempt.help.slowPlayback, true);
    const bad = structuredClone(h.repository.snapshot().document.data); bad.profiles[0].unit.listening[0].parts[0].key = 'made-up';
    assert.throws(() => parseLearningData(bad)); assert.deepEqual(errors, []);
});

test('failed first synthesis leaves no listening basis; changing voice recovers the same question', async t => {
    const h = await createClassroomFixture({ listening: true }); t.after(h.dispose); await h.openLesson();
    const unit = h.profile().unit;
    const classroom = { language: 'en', osId: unit.originOsId, chatIdentity: 'runtime-a', teacher: { name: '林老师', note: '' } };
    const players = []; const calls = [];
    const facade = { isEnabled: () => true, getVoices: () => ({ defaultVoice: 'voice-a', voices: [{ id: 'voice-a', available: true }, { id: 'voice-b', available: true }] }),
        createPlayer() { const player = { activate: () => true, playNow: () => true, dispose() {} }; players.push(player); return player; },
        synthesize: async (_text, options) => { calls.push(options.speaker); if (options.speaker === 'voice-a') { throw new Error('fixed synthesis failure'); } return new Blob(['fixture']); },
    };
    const speech = createLearningSpeech({ repository: h.repository, current: () => classroom, getFacade: () => facade,
        onState() {}, onSave() {}, onError: () => assert.fail('no listening write should fail') });
    t.after(speech.stop);
    const play = { materialId: unit.materials[0].id, exerciseId: unit.exercises[0].id, partKey: learningSpeechParts(unit.materials[0])[0].key };
    const writes = h.counts.userWrites;
    await speech.play(play); await speech.flush();
    assert.equal(speech.media.snapshot().status, 'error');
    assert.equal(h.counts.userWrites, writes); assert.equal(h.profile().unit.listening, undefined);
    await createLearningService(h.repository).setVoice('en', { voiceId: 'voice-b', language: 'en', speed: 1 }, () => true);
    await speech.play(play);
    players[1].onStateChange('playing'); await speech.flush();
    assert.deepEqual(calls, ['voice-a', 'voice-b']);
    assert.equal(h.profile().unit.id, unit.id); assert.equal(h.profile().unit.listening[0].voice.voiceId, 'voice-b');
    assert.equal(h.profile().unit.listening[0].parts[0].count, 1);
});

test('preparation can return a visible-action reply without replacing a lesson or writing an empty one', async t => {
    const h = await createClassroomFixture(); t.after(h.dispose);
    await h.command('teacher', { teacher: { name: '林老师', note: '' } });
    await h.command('profile', { message: '准备四级考试。' });
    for (const withLesson of [false, true]) {
        if (withLesson) { h.flags.prepareReply = null; await h.command('prepare', { message: '准备一课。' }); }
        const unit = structuredClone(h.profile().unit); const writes = h.counts.userWrites;
        h.flags.prepareReply = '这篇文章暂时无法读取。要换另一篇吗？';
        const state = await h.command('prepare', { message: '用这篇文章备课。', replaceCurrent: withLesson });
        assert.equal(state.busy, false); assert.equal(state.reply.action, 'prepare'); assert.equal(state.reply.text, h.flags.prepareReply);
        assert.deepEqual(h.profile().unit, unit); assert.equal(h.counts.userWrites, writes);
    }
});

test('cancelling a classroom prevents a late provider response from publishing, and reentering never retries', async t => {
    const h = await createClassroomFixture(); t.after(h.dispose); await h.openLesson();
    const unitId = h.profile().unit.id; const writes = h.counts.userWrites;
    let release; h.flags.providerGate = new Promise(resolve => { release = resolve; });
    await h.bridge.request('learning/prepare', { chatIdentity: 'runtime-a', message: '再来一课', replaceCurrent: true });
    await new Promise(resolve => setTimeout(resolve, 0));
    await h.command('cancel'); release(); h.flags.providerGate = null;
    await h.reenter();
    await new Promise(resolve => setTimeout(resolve, 0));
    assert.equal(h.profile().unit.id, unitId); assert.equal(h.counts.userWrites, writes);
    const calls = h.counts.provider; await h.reenter(); assert.equal(h.counts.provider, calls);
});

test('cancellation after a submitted answer was sent cannot start a new teacher request', async t => {
    const h = await createClassroomFixture(); t.after(h.dispose); await h.openLesson();
    let active = true; let finish;
    const saving = new Promise(resolve => { finish = resolve; });
    const wrapped = { ...h.repository, save: async (...args) => { const result = await h.repository.save(...args); await saving; return result; } };
    const unit = h.profile().unit; let requests = 0;
    const practice = createLearningPractice({ repository: wrapped, current: () => ({ language: 'en', osId: unit.originOsId,
        chatIdentity: 'runtime-a', teacher: { name: '林老师', note: '' } }), teaching: { run: async () => { requests++; return { status: 'finished' }; } } });
    const submitting = practice.submit({ unitId: unit.id, exerciseId: unit.exercises[0].id, answer: { kind: 'choice', ids: ['a'] }, replays: 0, slowPlayback: false }, () => active);
    await new Promise(resolve => setTimeout(resolve, 0)); active = false; finish();
    assert.equal((await submitting).status, 'cancelled'); assert.equal(requests, 0);
    assert.equal(h.profile().unit.attempts.length, 1);
});

test('opening a wallet honours the queued guard and does not leave an account after cancellation', async t => {
    const h = await createClassroomFixture(); t.after(h.dispose);
    const writes = h.counts.ledgerWrites;
    await assert.rejects(h.economy.ensureOpen(() => false));
    await h.economy.refresh(); assert.equal(h.economy.isOpen(), false); assert.equal(h.counts.ledgerWrites, writes);
});

test('unknown ledger writes are reconciled before receipt saving, without a second transaction', async t => {
    const h = await createClassroomFixture(); t.after(h.dispose); await h.openLesson(); await h.economy.ensureOpen();
    const unit = h.profile().unit; h.flags.ledgerUnknown = true;
    await h.command('submit', { unitId: unit.id, exerciseId: unit.exercises[0].id, answer: { kind: 'choice', ids: ['a'] } });
    assert.equal(h.economy.getPlayerBalance(), 100); assert.equal(h.profile().completions.length, 1);
    h.confirmLedger(); await h.command('verify-wallet'); await h.command('reward', { unitId: unit.id });
    assert.equal(h.economy.getPlayerBalance(), 120); assert.equal(h.economy.listTransactions().transactions.filter(entry => entry.sourceDomain === 'learning').length, 1);
});

test('long speech keeps the exact original Unicode text in stable bounded spans', () => {
    const material = { id: 'm'.repeat(128), paragraphs: [{ id: 'p1', text: 'A short sentence. '.repeat(140) }, { id: 'p2', text: '中文🙂。'.repeat(400) }] };
    const parts = learningSpeechParts(material);
    assert.equal(parts.map(part => part.text).join(''), material.paragraphs.map(paragraph => paragraph.text).join('\n\n'));
    assert.ok(parts.every(part => [...part.text].length <= 1000));
    assert.deepEqual(parts, learningSpeechParts(structuredClone(material)));
});

for (const failure of ['rejected', 'unknown']) {
    test(`${failure} hearing writes block assessment until recovered, retaining replay and slow-play evidence exactly once`, async t => {
        const players = [];
        const facade = { isEnabled: () => true, getVoices: () => ({ defaultVoice: 'voice-a', voices: [{ id: 'voice-a', available: true }] }),
            createPlayer() { const player = { activate: () => true, playNow: () => true, dispose() {}, setPlaybackRate: value => value }; players.push(player); return player; },
            synthesize: async () => new Blob(['fixture']), openSettings() {},
        };
        const h = await createClassroomFixture({ listening: true, getTtsFacade: () => facade }); t.after(h.dispose);
        await h.openLesson();
        const unit = h.profile().unit; const exercise = unit.exercises[0]; const material = unit.materials[0];
        const play = { materialId: material.id, exerciseId: exercise.id, partKey: learningSpeechParts(material)[0].key };
        await h.command('play', play); players[0].onStateChange('playing'); await h.command('read');
        assert.equal(h.profile().unit.listening[0].parts[0].count, 1);
        await h.command('play', play);
        h.flags.userRejected = failure === 'rejected'; h.flags.userFailure = failure === 'unknown';
        players[1].onStateChange('playing');
        await h.command('rate', { value: 0.75 });
        const calls = h.counts.provider;
        const submission = { unitId: unit.id, exerciseId: exercise.id, answer: { kind: 'choice', ids: ['a'] } };
        await h.command('submit', submission);
        assert.equal(h.profile().unit.attempts.length, 0); assert.equal(h.counts.provider, calls);
        if (failure === 'unknown') { h.confirmUser(); await h.command('verify'); }
        else { h.flags.userRejected = false; }
        await h.command('submit', submission);
        const attempt = h.profile().unit.attempts[0];
        assert.equal(attempt.help.replays, 1); assert.equal(attempt.help.slowPlayback, true);
        assert.equal(h.profile().unit.listening[0].parts[0].count, 2);
    });
}
