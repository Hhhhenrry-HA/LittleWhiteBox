import type { Coc7CheckRecord } from '../domain/check-records.js';
import { diceSpan } from './card-elements.js';
import { COC7_UI } from './coc7-copy.js';

const LEVELS = { critical: '大成功', extreme: '极难成功', hard: '困难成功', regular: '普通成功', failure: '失败', fumble: '大失败' };
const DIFFICULTIES = { regular: '普通', hard: '困难', extreme: '极难' };
const VERDICTS = { achieved: { label: '达成', tone: 'success' }, not_achieved: { label: '未达成', tone: 'failure' } };

export function createCoc7Result(record: Coc7CheckRecord) {
    const { request, result } = record;
    const element = diceSpan('xb-dice-coc7');
    const heading = diceSpan('xb-dice-coc7-heading');
    const verdict = VERDICTS[result.verdict];
    heading.append(diceSpan('xb-dice-outcome', verdict.label), diceSpan('xb-dice-system', COC7_UI.rule));
    const participant = diceSpan('xb-dice-participant');
    const score = diceSpan('xb-dice-percentile', String(result.roll).padStart(2, '0'));
    score.setAttribute('aria-label', `掷骰 ${result.roll}`);
    const identity = diceSpan('xb-dice-participant-name', `${request.stat} ${result.value}`);
    const basis = diceSpan('xb-dice-basis', `要求${DIFFICULTIES[request.difficulty]} · 阈值 ${result.threshold}`);
    const level = diceSpan('xb-dice-level', LEVELS[result.level]);
    level.dataset.level = result.level;
    const detail = diceSpan('xb-dice-participant-detail');
    detail.append(identity, basis, level); participant.append(score, detail);
    element.append(heading, participant); element.hidden = true;
    return { element, tone: verdict.tone, label: `${verdict.label}；${identity.textContent}，${basis.textContent}，掷骰 ${result.roll}，${LEVELS[result.level]}`,
        settle() { element.hidden = false; }, draw(_progress: number, _settled = false) { /* Reveal stored percentiles without sampling. */ } };
}
