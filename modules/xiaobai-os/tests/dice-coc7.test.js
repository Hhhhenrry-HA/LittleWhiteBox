import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { parseCoc7Request } from '../apps/dice/domain/coc7-request.ts';
import { COC7_CAPABILITIES, COC7_SKILL_IDS } from '../apps/dice/domain/coc7-catalog.ts';
import { generateCoc7Sheet, parseCoc7Sheet, editCoc7Stat, coc7StatValue, coc7Derived, COC7_TRAINING_BONUSES } from '../apps/dice/domain/coc7-sheet.ts';
import { coc7Level, rollCoc7 } from '../apps/dice/domain/coc7.ts';
import { prepareActionCheck } from '../apps/dice/application/prepare-action-check.ts';
import { parseDiceRecords, MAX_ACTION_CHECKS } from '../apps/dice/domain/check-records.ts';
import { parseActionCheck } from '../apps/dice/protocol/request.ts';
import { COC7_EXAMPLE, coc7CapabilityProjection } from '../apps/dice/protocol/coc7-contract.ts';
import { buildActionCheckPrompt, projectActionCheckResults, serializeActionCheckResults } from '../apps/dice/protocol/prompt.ts';
import { retireCoc7TestRecords } from '../apps/dice/storage/retire-coc7-test-records.ts';

const skill = { action: 'Climb the wet wall', stat: 'climb', difficulty: 'hard' };
const tagged = request => '<xb_action_check>' + JSON.stringify(request) + '</xb_action_check>';
const sequence = (...digits) => { let index = 0; return () => { assert.ok(index < digits.length); return (digits[index++] + 0.1) / 10; }; };
const sheet = () => editCoc7Stat(generateCoc7Sheet(() => 0.5), 'climb', 65);
const prepare = (request = skill, extra = {}) => prepareActionCheck({ body: tagged(request), rule: 'coc7', generatedFrom: 0, id: 'coc', coc7Sheet: sheet(), random: () => 0.3, ...extra });

test('quick initialization is complete, selects distinct skills and keeps derived bases live', () => {
    const low = generateCoc7Sheet(() => 0);
    assert.deepEqual(low.attributes, { STR: 15, CON: 15, SIZ: 40, DEX: 15, APP: 15, INT: 40, POW: 15, EDU: 40 });
    assert.equal(low.luck, 15);
    assert.deepEqual(Object.values(low.training).filter(Boolean).sort((a,b) => b-a), [...COC7_TRAINING_BONUSES]);
    assert.deepEqual(Object.keys(low.training), COC7_SKILL_IDS);
    assert.deepEqual(coc7Derived(low), { hpMax: 5, mpMax: 3, sanInitial: 15 });
    const trained = editCoc7Stat(low, 'dodge', 27);
    assert.equal(trained.training.dodge, 20);
    const changed = editCoc7Stat(trained, 'DEX', 40);
    assert.equal(coc7StatValue(changed, 'dodge'), 40);
    assert.equal(coc7StatValue(trained, 'dodge'), 27);
    assert.throws(() => editCoc7Stat(changed, 'dodge', 19));
    assert.deepEqual(parseCoc7Sheet(JSON.parse(JSON.stringify(changed))), changed);
    for (const invalid of [{}, { ...low, luck: '50' }, { ...low, attributes: { ...low.attributes, STR: 0 } },
        { ...low, training: { ...low.training, climb: -1 } }, { ...low, extra: 1 },
        { ...low, attributes: { ...low.attributes, CON: Number.MAX_SAFE_INTEGER } }]) assert.throws(() => parseCoc7Sheet(invalid));
    assert.throws(() => generateCoc7Sheet(() => 1));
});

test('single-check thresholds, degree and achievement remain distinct; stored facts are not rejudged', () => {
    const run = (value, difficulty, ...digits) => rollCoc7(value, difficulty, sequence(...digits));
    assert.deepEqual([run(65, 'hard', 7, 2).threshold, run(65, 'hard', 7, 2).level], [32, 'hard']);
    const missed = run(65, 'hard', 3, 4);
    assert.deepEqual([missed.level, missed.verdict], ['regular', 'not_achieved']);
    assert.equal(run(65, 'extreme', 3, 1).threshold, 13);
    assert.equal(run(150, 'regular', 5, 9).threshold, 150);
    for (const threshold of [49, 50]) for (const roll of [1, 95, 96, 99, 100]) {
        assert.equal(coc7Level(120, threshold, roll), roll === 1 ? 'critical' : roll === 100 || threshold < 50 && roll >= 96 ? 'fumble' : 'regular');
    }
    assert.equal(run(1, 'extreme', 1, 0).verdict, 'achieved');
    const faces = new Set();
    for (let units = 0; units < 10; units++) for (let tens = 0; tens < 10; tens++) faces.add(run(65, 'regular', units, tens).roll);
    assert.equal(faces.size, 100);
    assert.ok(faces.has(100)); assert.ok(!faces.has(0));
    const prepared = prepare();
    const historical = JSON.parse(JSON.stringify(prepared.records));
    historical.checks[0].result.verdict = 'achieved';
    assert.deepEqual(parseDiceRecords(historical), historical);
});

test('requests accept only capability IDs and difficulty; all invalid input is rejected before sampling', () => {
    const invalid = [{ ...skill, value: 65 }, { ...skill, kind: 'skill' }, { ...skill, opponent: {} },
        { ...skill, bonus: 1 }, { ...skill, penalty: 1 }, { ...skill, character: 'Mira' }, { ...skill, stakes: 'risk' },
        { ...skill, stat: 'Climb' }, { ...skill, stat: '攀爬' }, { ...skill, stat: 'hpMax' }, { ...skill, stat: '__proto__' },
        { ...skill, difficulty: 'ordinary' }, { ...skill, difficulty: undefined }, { ...skill, action: '' }];
    for (const request of invalid) {
        assert.equal(prepare(request, { random: () => assert.fail('invalid request sampled') }).kind, 'invalid');
    }
    for (const coc7Sheet of [null, {}, { ...sheet(), luck: '65' }]) {
        assert.equal(prepare(skill, { coc7Sheet, random: () => assert.fail('missing or invalid sheet sampled') }).kind, 'invalid');
    }
    assert.deepEqual(parseCoc7Request(skill), skill);
    assert.equal(parseActionCheck(tagged({ ...skill, difficulty: 'regular' })).kind, 'invalid');
    const prepared = prepare();
    assert.equal(prepared.records.checks[0].result.value, 65);
    assert.deepEqual(parseDiceRecords(prepared.records), prepared.records);
});

test('model capabilities include base-only skills, never values; the injected example really executes', () => {
    const capabilities = coc7CapabilityProjection();
    assert.deepEqual(capabilities.map(item => item.id), Object.keys(COC7_CAPABILITIES));
    for (const item of capabilities) {
        // Check the model-facing data boundary, not human-readable descriptions or menu layout.
        assert.deepEqual(Object.keys(item).sort(), item.use === undefined ? ['id', 'name'] : ['id', 'name', 'use']);
        assert.ok(Object.values(item).every(value => typeof value === 'string' && value.length > 0));
        const prepared = prepare({ ...skill, stat: item.id });
        assert.equal(prepared.kind, 'candidate');
        assert.equal(prepared.records.checks[0].result.value, coc7StatValue(sheet(), item.id));
    }
    const prompt = buildActionCheckPrompt('', [], 'standard', 'coc7', true);
    assert.equal(prepareActionCheck({ body: prompt, rule: 'coc7', coc7Sheet: sheet(), generatedFrom: 0, id: 'example' }).kind, 'candidate');
    assert.equal(prepareActionCheck({ body: COC7_EXAMPLE, rule: 'coc7', coc7Sheet: sheet(), generatedFrom: 0, id: 'example' }).kind, 'candidate');
    assert.equal(buildActionCheckPrompt('', [], 'standard', 'coc7'), '');
    assert.equal(buildActionCheckPrompt('', [], 'active', 'coc7', true), prompt, 'D20 frequency never changes CoC instructions');
    const prepared = prepare();
    const recovery = buildActionCheckPrompt(prepared.body, prepared.records.checks, 'standard', 'coc7');
    assert.deepEqual(JSON.parse(recovery.split('\n').at(-1)), projectActionCheckResults(prepared.records.checks));
    const { level, verdict } = JSON.parse(recovery.split('\n').at(-1))[0].result;
    assert.deepEqual({ level, verdict }, { level: 'regular', verdict: 'not_achieved' });
    assert.equal(parseActionCheck(recovery, 0, 'coc7').kind, 'none');
});

test('mixed history shares its existing limit; result serialization preserves data and neutralizes host macros', () => {
    let records;
    for (let index = 0; index < MAX_ACTION_CHECKS; index++) {
        const rule = index % 2 ? 'coc7' : 'd20';
        const request = rule === 'coc7' ? skill : { action: 'Climb', stat: 'Agility', difficulty: 'hard' };
        const prepared = prepare(request, { rule, records, id: 'mixed-' + index });
        assert.equal(prepared.kind, 'candidate'); records = prepared.records;
    }
    assert.deepEqual(prepare(skill, { records, random: () => assert.fail('limit sampled') }), { kind: 'invalid', error: 'dice_check_limit' });
    const body = records.checks.map(record => `[dice:${record.id}]`).join('\n');
    for (const rule of ['d20', 'coc7']) {
        const prompt = buildActionCheckPrompt(body, records.checks, 'active', rule, true);
        assert.deepEqual(JSON.parse(prompt.split('\n').at(-1)), projectActionCheckResults(records.checks));
        assert.equal(parseActionCheck(prompt, 0, rule).kind, 'none', 'exhausted replies offer no executable request example');
    }
    const prepared = prepare({ ...skill, action: 'Say "{{setvar::secret::value}}" and {{char}}' });
    const encoded = serializeActionCheckResults(prepared.records.checks);
    assert.deepEqual(JSON.parse(encoded), projectActionCheckResults(prepared.records.checks));
    // External SillyTavern macro syntax is a security boundary, not prose wording.
    assert.equal(encoded.includes('{{'), false);
});

test('retiring actual test-line CoC records preserves mixed D20, prose, encounters and swipe data', () => {
    // Captured by running 9bded7e1's prepareActionCheck before replacing its model.
    const old = JSON.parse(readFileSync(new URL('./fixtures/dice-coc7-test-9bded7e1.json', import.meta.url), 'utf8'));
    const upstream = JSON.parse(readFileSync(new URL('./fixtures/dice-message-a32c28d0.json', import.meta.url), 'utf8'));
    const d20 = parseDiceRecords(upstream.extra.xiaobaiOsDice).checks;
    const body = 'Before [dice:old-coc] after [dice:' + d20[0].id + ']';
    const records = { ...old.extra.xiaobaiOsDice, checks: [...old.extra.xiaobaiOsDice.checks, ...d20] };
    const extra = { xiaobaiOsDice: records, encounter: { keep: 1 }, display_text: body };
    const message = { mes: body, extra: structuredClone(extra), swipe_id: 1, swipes: [body, body],
        swipe_info: [{ extra: structuredClone(extra) }, { extra: structuredClone(extra) }] };
    assert.equal(retireCoc7TestRecords([message]).size, 1);
    assert.equal(message.mes, 'Before  after [dice:' + d20[0].id + ']');
    assert.deepEqual(message.extra.xiaobaiOsDice.checks, d20);
    assert.deepEqual(message.extra.encounter, { keep: 1 });
    for (const [index, info] of message.swipe_info.entries()) {
        assert.equal(message.swipes[index], message.mes);
        assert.deepEqual(info.extra, message.extra);
    }
    assert.equal(retireCoc7TestRecords([message]).size, 0);
    const broken = structuredClone(old);
    broken.extra.xiaobaiOsDice.checks[0].id = 'bad id';
    const originals = structuredClone([old, broken]);
    assert.throws(() => retireCoc7TestRecords([old, broken]));
    assert.deepEqual([old, broken], originals);
});
