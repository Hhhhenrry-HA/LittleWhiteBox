import assert from 'node:assert/strict';
import test from 'node:test';
import { parseCoc7Request } from '../apps/dice/domain/coc7-request.ts';
import { COC7_CAPABILITIES, COC7_ATTRIBUTE_IDS, COC7_SKILL_IDS } from '../apps/dice/domain/coc7-catalog.ts';
import { parseCoc7Sheet, readCoc7Sheet, coc7StatValue, coc7RemainingPoints, coc7PointBudget, COC7_POINTS, COC7_POINT_GROUPS } from '../apps/dice/domain/coc7-sheet.ts';
import { emptyCoc7Draft, generateCoc7Sheet, adjustCoc7Stat, canAdjustCoc7Stat } from '../apps/dice/domain/coc7-creation.ts';
import { coc7Level, rollCoc7 } from '../apps/dice/domain/coc7.ts';
import { prepareActionCheck } from '../apps/dice/application/prepare-action-check.ts';
import { parseDiceRecords, MAX_ACTION_CHECKS } from '../apps/dice/domain/check-records.ts';
import { parseActionCheck } from '../apps/dice/protocol/request.ts';
import { COC7_EXAMPLE, coc7CapabilityProjection } from '../apps/dice/protocol/coc7-contract.ts';
import { buildActionCheckPrompt, projectActionCheckResults, serializeActionCheckResults } from '../apps/dice/protocol/prompt.ts';

const skill = { action: 'Climb the wet wall', stat: 'athletics', difficulty: 'hard' };
const tagged = request => '<xb_action_check>' + JSON.stringify(request) + '</xb_action_check>';
const sequence = (...digits) => { let index = 0; return () => { assert.ok(index < digits.length); return (digits[index++] + 0.1) / 10; }; };
const sheet = () => parseCoc7Sheet({
    attributes: { body: 50, will: 50, appearance: 50 },
    skills: { ...Object.fromEntries(COC7_SKILL_IDS.map(id => [id, 50])), athletics: 60, melee: 40 },
});
const prepare = (request = skill, extra = {}) => prepareActionCheck({ body: tagged(request), rule: 'coc7', generatedFrom: 0, id: 'coc', coc7Sheet: sheet(), random: () => 0.3, ...extra });

test('random creation and persistence preserve separate budgets, bounds and capability coverage', () => {
    assert.equal(COC7_ATTRIBUTE_IDS.length, 3);
    assert.equal(COC7_SKILL_IDS.length, 10);
    for (const random of [() => 0, () => 0.5, () => 0.999999, Math.random]) {
        for (let i = 0; i < 20; i++) {
            const created = generateCoc7Sheet(random);
            for (const group of Object.keys(COC7_POINT_GROUPS)) {
                assert.equal(coc7RemainingPoints(created, group), 0);
                assert.deepEqual(Object.keys(created[group]), COC7_POINT_GROUPS[group].ids);
                assert.ok(Object.values(created[group]).every(n => n >= COC7_POINTS.min && n <= COC7_POINTS.max && n % COC7_POINTS.step === 0));
            }
            const encoded = JSON.parse(JSON.stringify(created));
            const parsed = parseCoc7Sheet(encoded);
            assert.deepEqual(parsed, created);
            parsed.attributes.body = 999;
            parsed.skills.athletics = 999;
            assert.deepEqual(encoded, created, 'the persisted boundary returns detached data');
        }
    }
    for (const value of [1, -0.1, NaN, Infinity]) assert.throws(() => generateCoc7Sheet(() => value));
});

test('manual point allocation needs no randomization, cannot overspend and keeps pools independent', () => {
    const empty = emptyCoc7Draft();
    assert.equal(readCoc7Sheet(empty).kind, 'invalid');
    assert.ok(Object.values({ ...empty.attributes, ...empty.skills }).every(n => n === COC7_POINTS.min));
    let draft = empty;
    for (const id of Object.keys(COC7_CAPABILITIES)) {
        while (coc7StatValue(draft, id) < 50) draft = adjustCoc7Stat(draft, id, 1);
    }
    assert.deepEqual(parseCoc7Sheet(draft), draft);
    assert.equal(canAdjustCoc7Stat(draft, 'body', 1), false);
    draft = adjustCoc7Stat(draft, 'athletics', -1);
    assert.equal(canAdjustCoc7Stat(draft, 'body', 1), false, 'skill points cannot pay for attributes');
    assert.equal(canAdjustCoc7Stat(draft, 'concealment', 1), true);
    draft = adjustCoc7Stat(draft, 'concealment', 1);
    assert.equal(readCoc7Sheet(draft).kind, 'ready');
    assert.equal(coc7StatValue(draft, 'concealment'), 55);
    assert.throws(() => adjustCoc7Stat(empty, 'body', -1));
    let strong = empty;
    while (canAdjustCoc7Stat(strong, 'body', 1)) strong = adjustCoc7Stat(strong, 'body', 1);
    assert.equal(strong.attributes.body, COC7_POINTS.max);
    while (canAdjustCoc7Stat(strong, 'will', 1)) strong = adjustCoc7Stat(strong, 'will', 1);
    assert.equal(strong.attributes.will, 50);
    assert.equal(canAdjustCoc7Stat(strong, 'appearance', 1), false);
    assert.throws(() => adjustCoc7Stat(strong, 'body', 1));
    assert.throws(() => adjustCoc7Stat(empty, 'unknown', 1));
    assert.throws(() => adjustCoc7Stat(empty, 'body', 2));
    assert.equal(empty.attributes.body, COC7_POINTS.min, 'draft edits are immutable');
});

test('attributes and skills are independent values with no derived bonus or resource fields', () => {
    const before = sheet();
    const after = parseCoc7Sheet({ ...before, attributes: { body: 80, will: 20, appearance: 50 } });
    for (const id of COC7_SKILL_IDS) assert.equal(coc7StatValue(after, id), coc7StatValue(before, id));
    assert.equal(coc7StatValue(after, 'body'), 80);
    assert.equal(coc7StatValue(after, 'will'), 20);
    assert.deepEqual(Object.keys(after).sort(), ['attributes', 'skills']);
});

test('invalid points, pools and shapes are rejected without changing their input', () => {
    const valid = sheet();
    const missing = structuredClone(valid); delete missing.skills.concealment;
    const invalidSheets = [{}, missing, { ...valid, luck: 50 }, { ...valid, extra: 1 },
        { ...valid, attributes: { body: 100, will: 0, appearance: 50 } },
        { ...valid, attributes: { body: 49, will: 51, appearance: 50 } },
        { ...valid, attributes: { body: '50', will: 50, appearance: 50 } },
        { ...valid, attributes: { body: NaN, will: 50, appearance: 50 } },
        { ...valid, attributes: { body: Infinity, will: 50, appearance: 50 } },
        { ...valid, attributes: { body: 45, will: 50, appearance: 50 }, skills: { ...valid.skills, athletics: 65 } },
        { ...valid, skills: { ...valid.skills, athletics: 65 } },
        { ...valid, skills: Object.fromEntries(COC7_SKILL_IDS.map(id => [id, 80])) }];
    for (const invalid of invalidSheets) {
        const original = structuredClone(invalid);
        assert.throws(() => parseCoc7Sheet(invalid));
        assert.equal(readCoc7Sheet(invalid).kind, 'invalid');
        assert.deepEqual(invalid, original);
    }
    assert.equal(coc7PointBudget('attributes'), 150);
    assert.equal(coc7PointBudget('skills'), 500);
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
        { ...skill, stat: 'Athletics' }, { ...skill, stat: '运动' }, { ...skill, stat: 'hpMax' }, { ...skill, stat: '__proto__' },
        { ...skill, difficulty: 'ordinary' }, { ...skill, difficulty: undefined }, { ...skill, action: '' }];
    for (const request of invalid) {
        assert.equal(prepare(request, { random: () => assert.fail('invalid request sampled') }).kind, 'invalid');
    }
    for (const coc7Sheet of [null, {}, { ...sheet(), attributes: { body: '50', will: 50, appearance: 50 } }]) {
        assert.equal(prepare(skill, { coc7Sheet, random: () => assert.fail('missing or invalid sheet sampled') }).kind, 'invalid');
    }
    assert.deepEqual(parseCoc7Request(skill), skill);
    assert.equal(parseActionCheck(tagged({ ...skill, difficulty: 'regular' })).kind, 'invalid');
    const prepared = prepare();
    assert.equal(prepared.records.checks[0].result.value, 60);
    assert.deepEqual(parseDiceRecords(prepared.records), prepared.records);
});

test('model capabilities include both independent attributes and skills, never values; the injected example really executes', () => {
    const capabilities = coc7CapabilityProjection();
    assert.deepEqual(capabilities.map(item => item.id), Object.keys(COC7_CAPABILITIES));
    for (const item of capabilities) {
        // Check the model-facing data boundary, not human-readable descriptions or menu layout.
        assert.deepEqual(Object.keys(item).sort(), ['id', 'name', 'use']);
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
