import assert from 'node:assert/strict';
import test from 'node:test';
import { parseCoc7Request } from '../apps/dice/domain/coc7-request.ts';
import { coc7Level, rollCoc7 } from '../apps/dice/domain/coc7.ts';
import { prepareActionCheck } from '../apps/dice/application/prepare-action-check.ts';
import { parseDiceRecords } from '../apps/dice/domain/check-records.ts';
import { parseActionCheck } from '../apps/dice/protocol/request.ts';
import { COC7_EXAMPLE } from '../apps/dice/protocol/coc7-contract.ts';
import { buildActionCheckPrompt, projectActionCheckResults, serializeActionCheckResults } from '../apps/dice/protocol/prompt.ts';

const skill = { kind: 'skill', action: 'Climb the wet wall', character: 'Mira', stat: 'Climb', value: 65, difficulty: 'hard' };
const dual = (kind = 'opposed', value = 20, other = 40) => ({ kind, action: 'Force the door open', character: 'Mira', stat: 'STR', value,
    opponent: { character: 'Guard', stat: 'STR', value: other } });
const tagged = request => `<xb_action_check>${JSON.stringify(request)}</xb_action_check>`;
const sequence = (...digits) => { let index = 0; return () => { assert.ok(index < digits.length); return (digits[index++] + 0.1) / 10; }; };
const run = (request, ...digits) => rollCoc7(parseCoc7Request(request), sequence(...digits));

test('CoC thresholds, degree and achievement are separate; historical adjudications are retained', () => {
    const good = run(skill, 7, 2);
    assert.deepEqual([good.actor.threshold, good.actor.level, good.verdict], [32, 'hard', 'achieved']);
    const missed = run(skill, 3, 4);
    assert.deepEqual([missed.actor.level, missed.verdict], ['regular', 'not_achieved']);
    assert.equal(run({ ...skill, difficulty: 'extreme' }, 3, 1).actor.threshold, 13);
    assert.equal(run({ ...skill, value: 150, difficulty: 'regular' }, 5, 9).actor.threshold, 150);
    for (const threshold of [49, 50]) {
        for (const roll of [1, 95, 96, 99, 100]) {
            assert.equal(coc7Level(120, threshold, roll), roll === 1 ? 'critical'
                : roll === 100 || threshold < 50 && roll >= 96 ? 'fumble' : 'regular');
        }
    }
    assert.equal(run({ ...skill, value: 1, difficulty: 'extreme' }, 1, 0).verdict, 'achieved');
    assert.equal(run({ ...skill, value: 98 }, 6, 9).actor.level, 'fumble');
    assert.equal(run({ ...skill, value: 100 }, 6, 9).actor.level, 'regular');
    const records = { schemaVersion: 2, checks: [{ id: 'coc', rule: 'coc7', request: skill, result: good }] };
    records.checks[0].result.verdict = 'not_achieved';
    assert.deepEqual(parseDiceRecords(JSON.parse(JSON.stringify(records))), records);
});

test('bonus and penalty share units, interpret 00+0 as 100, then select the final roll', () => {
    const faces = new Set();
    for (let units = 0; units < 10; units++) {
        for (let tens = 0; tens < 10; tens++) {
            const roll = run(skill, units, tens).actor.roll;
            assert.ok(roll >= 1 && roll <= 100);
            faces.add(roll);
        }
    }
    assert.equal(faces.size, 100, 'each percentile has exactly one pair of ordinary dice faces');
    assert.deepEqual(run({ ...skill, bonus: 1 }, 0, 0, 1).actor,
        { units: 0, tens: [0, 1], roll: 10, threshold: 32, level: 'extreme' });
    assert.equal(run({ ...skill, penalty: 1 }, 0, 0, 1).actor.level, 'fumble');
    assert.equal(run({ ...skill, bonus: 3, penalty: 2 }, 1, 0, 8).actor.level, 'critical');
    assert.equal(run({ ...skill, bonus: 2 }, 7, 9, 6, 2).actor.roll, 27);
    assert.equal(run({ ...skill, bonus: 2, penalty: 2 }, 7, 2).actor.tens.length, 1);
});

test('opposed checks prefer degree, then original value; equality is a stalemate', () => {
    assert.equal(run(dual(), 5, 1, 0, 6).verdict, 'actor_wins');
    assert.equal(run(dual(), 5, 1, 0, 3).verdict, 'opponent_wins');
    assert.equal(run(dual(), 3, 0, 2, 1).verdict, 'actor_wins');
    assert.equal(run(dual('opposed', 40, 40), 1, 2, 5, 3).verdict, 'stalemate');
    const failed = run(dual(), 0, 8, 0, 9);
    assert.equal(failed.verdict, 'opponent_wins');
    assert.equal(failed.actor.level, 'failure');
    assert.equal(failed.opponent.level, 'failure');
});

test('melee resolves equal successful degrees by response type, never by original value', () => {
    assert.equal(run(dual('melee_dodge'), 5, 1, 0, 3).verdict, 'dodged');
    assert.equal(run(dual('melee_fight_back'), 5, 1, 0, 3).verdict, 'attacker_hits');
    assert.equal(run(dual('melee_fight_back'), 0, 7, 0, 3).verdict, 'defender_hits');
    for (const kind of ['melee_dodge', 'melee_fight_back']) {
        assert.equal(run(dual(kind), 0, 0, 0, 9).verdict, 'no_hit');
        assert.equal(run(dual(kind), 1, 0, 0, 3).verdict, 'attacker_hits');
    }
});

test('all request data are validated before any random call; invalid CoC never falls back to D20', () => {
    for (const request of [{ ...skill, value: '65' }, { ...skill, value: undefined }, { ...skill, value: 0 },
        { ...skill, value: 1.5 }, { ...skill, max: 100 }, { ...skill, roll: 5 }, { ...skill, bonus: 3 },
        { ...skill, penalty: -1 },
        { ...dual(), opponent: { character: 'Guard', stat: 'STR' } }, { ...dual(), opponent: { ...dual().opponent, bonus: 3 } }]) {
        const result = prepareActionCheck({ body: tagged(request), rule: 'coc7', generatedFrom: 0, id: 'coc',
            random: () => assert.fail('invalid request sampled randomness') });
        assert.equal(result.kind, 'invalid');
    }
    assert.equal(parseActionCheck(tagged(skill)).kind, 'invalid');
    assert.equal(parseActionCheck(tagged(skill), 0, 'coc7').kind, 'request');
    const result = prepareActionCheck({ body: tagged(dual()), rule: 'coc7', generatedFrom: 0, id: 'coc', random: sequence(5, 1, 0, 6) });
    assert.equal(result.kind, 'candidate');
    assert.equal(result.records.checks.length, 1);
    assert.equal(result.records.checks[0].result.verdict, 'actor_wins');
    assert.deepEqual(parseDiceRecords(result.records), result.records);
});

test('each CoC kind requires its own fields and rejects fields belonging to another kind before rolling', () => {
    for (const request of [skill, dual(), dual('melee_dodge'), dual('melee_fight_back')]) {
        const single = request.kind === 'skill';
        const prepared = prepareActionCheck({ body: tagged(request), rule: 'coc7', generatedFrom: 0, id: 'variant', random: () => 0.3 });
        assert.equal(prepared.kind, 'candidate');
        assert.deepEqual(prepared.records.checks[0].request, request);
        const invalid = [single ? { ...request, opponent: dual().opponent } : { ...request, difficulty: 'regular' }];
        for (const name of ['action', 'stat', 'value', single ? 'difficulty' : 'opponent']) {
            const missing = { ...request };
            delete missing[name];
            invalid.push(missing);
        }
        if (!single) {
            for (const name of ['character', 'stat', 'value']) {
                const opponent = { ...request.opponent };
                delete opponent[name];
                invalid.push({ ...request, opponent });
            }
            invalid.push({ ...request, opponent: { ...request.opponent, difficulty: 'regular' } });
        }
        for (const input of invalid) {
            const result = prepareActionCheck({ body: tagged(input), rule: 'coc7', generatedFrom: 0, id: 'invalid-variant',
                random: () => assert.fail('invalid kind fields must not sample either participant') });
            assert.equal(result.kind, 'invalid', JSON.stringify(input));
        }
    }
});

test('the actual CoC model example executes through the public protocol and its result projection is lossless', () => {
    const prepared = prepareActionCheck({ body: COC7_EXAMPLE, rule: 'coc7', generatedFrom: 0, id: 'example', random: sequence(7, 2) });
    assert.equal(prepared.kind, 'candidate');
    const records = prepared.records.checks;
    const prompt = buildActionCheckPrompt(prepared.body, records, 'active', 'coc7');
    const exampleStart = prompt.indexOf('<xb_action_check>{');
    const exampleEnd = prompt.indexOf('</xb_action_check>', exampleStart) + '</xb_action_check>'.length;
    assert.equal(parseActionCheck(prompt.slice(exampleStart, exampleEnd), 0, 'coc7').kind, 'request');
    assert.deepEqual(projectActionCheckResults(records), [{ rule: 'coc7', ...records[0].request, result: records[0].result }]);
});

test('mixed-rule history shares one eight-check allowance even when all markers are removed', () => {
    let records;
    for (let index = 0; index < 8; index++) {
        const rule = index % 2 ? 'coc7' : 'd20';
        const request = rule === 'coc7' ? dual() : { action: 'Climb', stat: 'Agility', difficulty: 'hard' };
        const prepared = prepareActionCheck({ rule, body: tagged(request), generatedFrom: 0, records, id: `mixed-${index}`, random: () => 0.3 });
        assert.equal(prepared.kind, 'candidate');
        records = JSON.parse(JSON.stringify(prepared.records));
    }
    assert.equal(records.checks.length, 8);
    const denied = prepareActionCheck({ rule: 'coc7', body: tagged(skill), generatedFrom: 0, records, id: 'ninth',
        random: () => assert.fail('history limit must precede random sampling') });
    assert.deepEqual(denied, { kind: 'invalid', error: 'dice_check_limit' });
});

test('nested CoC results stay valid JSON while user strings cannot expand host macros', () => {
    const request = { ...dual(), action: 'Say "{{setvar::secret::value}}" and \\ } } {{char}}' };
    const prepared = prepareActionCheck({ rule: 'coc7', body: tagged(request), generatedFrom: 0, id: 'escaped', random: () => 0.3 });
    const encoded = serializeActionCheckResults(prepared.records.checks);
    assert.deepEqual(JSON.parse(encoded), projectActionCheckResults(prepared.records.checks));
    // External ST macro syntax is a security boundary, not model-prose wording.
    assert.equal(encoded.includes('{{'), false);
});
