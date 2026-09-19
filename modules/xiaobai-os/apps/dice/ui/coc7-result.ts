import type { Coc7CheckRecord } from '../domain/check-records.js';
import type { Coc7Participant } from '../domain/coc7-request.js';
import { coc7Percentile, type Coc7Roll, type Coc7Verdict } from '../domain/coc7.js';
import { diceSpan } from './card-elements.js';

const LEVELS = { critical: '大成功', extreme: '极难成功', hard: '困难成功', regular: '普通成功', failure: '失败', fumble: '大失败' };
const DIFFICULTIES = { regular: '普通', hard: '困难', extreme: '极难' };
const VERDICTS: Record<Coc7Verdict, { label: string; tone: string }> = {
    achieved: { label: '达成', tone: 'success' }, not_achieved: { label: '未达成', tone: 'failure' },
    actor_wins: { label: '行动方胜', tone: 'success' }, opponent_wins: { label: '对方胜', tone: 'failure' },
    stalemate: { label: '僵持', tone: 'neutral' }, attacker_hits: { label: '攻击命中', tone: 'success' },
    defender_hits: { label: '反击命中', tone: 'failure' }, dodged: { label: '闪避成功', tone: 'failure' },
    no_hit: { label: '无人命中', tone: 'neutral' },
};
const KINDS = { skill: '单项检定', opposed: '双方对抗', melee_dodge: '攻击 / 闪避', melee_fight_back: '攻击 / 反击' };
const percentile = (roll: number) => String(roll).padStart(2, '0');

function participantView(participant: Coc7Participant, result: Coc7Roll, role: string, requirement?: string) {
    const element = diceSpan('xb-dice-participant');
    element.dataset.side = role;
    const identity = diceSpan('xb-dice-participant-name', [participant.character, `${participant.stat} ${participant.value}`].filter(Boolean).join(' · '));
    const score = diceSpan('xb-dice-percentile', percentile(result.roll));
    score.setAttribute('aria-label', `掷骰 ${result.roll}`);
    const level = diceSpan('xb-dice-level', LEVELS[result.level]);
    level.dataset.level = result.level;
    const basis = diceSpan('xb-dice-basis', requirement ? `要求${requirement} · 阈值 ${result.threshold}` : `普通阈值 ${result.threshold}`);
    const detail = diceSpan('xb-dice-participant-detail');
    detail.append(identity, basis, level);
    element.append(score, detail);
    if ((participant.bonus ?? 0) || (participant.penalty ?? 0)) {
        const dice = document.createElement('details'); dice.className = 'xb-dice-faces';
        const summary = document.createElement('summary');
        const net = (participant.bonus ?? 0) - (participant.penalty ?? 0);
        summary.textContent = net ? `${net > 0 ? '奖励骰' : '惩罚骰'} × ${Math.abs(net)}` : '奖惩骰相抵';
        const text = diceSpan('xb-dice-faces-detail', `奖励 ${participant.bonus ?? 0} / 惩罚 ${participant.penalty ?? 0}；个位 ${result.units}；十位 `
            + result.tens.map(face => String(face * 10).padStart(2, '0')).join('、') + '；候选 '
            + result.tens.map(face => percentile(coc7Percentile(result.units, face))).join('、') + ` → ${percentile(result.roll)}`);
        dice.append(summary, text); element.append(dice);
    }
    return { element, label: `${identity.textContent}，${basis.textContent}，掷骰 ${result.roll}，${LEVELS[result.level]}` };
}

export function createCoc7Result(record: Coc7CheckRecord) {
    const { request, result } = record;
    const element = diceSpan('xb-dice-coc7');
    const heading = diceSpan('xb-dice-coc7-heading');
    const verdict = VERDICTS[result.verdict];
    const outcome = diceSpan('xb-dice-outcome', verdict.label);
    const system = diceSpan('xb-dice-system', `CoC 7 · D100 · ${KINDS[request.kind]}`);
    heading.append(outcome, system);
    const actor = participantView(request, result.actor, 'actor', request.kind === 'skill' ? DIFFICULTIES[request.difficulty] : undefined);
    const participants = [actor];
    if (request.kind !== 'skill' && result.opponent) { participants.push(participantView(request.opponent, result.opponent, 'opponent')); }
    element.append(heading, ...participants.map(side => side.element));
    element.hidden = true;
    return { element, tone: verdict.tone, label: `${verdict.label}；${participants.map(side => side.label).join('；')}`,
        settle() { element.hidden = false; }, draw(_progress: number, _settled = false) { /* Reveals stored percentiles; no animation sampling. */ } };
}
