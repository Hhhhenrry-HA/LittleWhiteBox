import { COC7_POINTS } from '../domain/coc7-sheet.js';
import type { Coc7Stat } from '../domain/coc7-catalog.js';

export const COC7_UI = {
    title: '人物属性', rule: 'D100 属性鉴定', generate: '一键随机', close: '关闭人物属性',
    saved: '已保存', repair: '需重新分配', repairNotice: '人物属性需重新分配，新检定已暂停。',
    save: '保存', saving: '保存中…', cancel: '取消修改', clear: '清空属性', confirmClear: '确认清空',
    clearNotice: '清空后，新的属性鉴定暂停。聊天与已掷结果保留。',
    damaged: '原面板不符合当前分配规则。保存新分配或确认清空前，原数据保留；历史骰子不变。',
    scope: '全局保存',
    attributes: '属性', skills: '技能', remaining: '剩余', allocated: '已分配',
    unassigned: '待分配', unsaved: '未保存', decrease: '减少', increase: '增加',
    limits: `每项 ${COC7_POINTS.min}–${COC7_POINTS.max} · 每次 ${COC7_POINTS.step} 点`,
    incomplete: '请分配完属性和技能点数后保存。',
    saveFailed: '属性未能保存，草稿已保留，请重试。',
    clearFailed: '属性未能清空，原面板已保留，请重试。',
    description: '仅检定你扮演的角色，使用全局人物能力，按属性或技能掷百分骰。',
} as const;
export const COC7_CAPABILITY_HINTS: Record<Coc7Stat, string> = {
    body: '施力、耐力、身体抵抗',
    will: '专注、决心、精神抵抗',
    appearance: '外表带来的吸引力、印象与影响',
    athletics: '攀爬、游泳、平衡、闪避',
    melee: '徒手与近身武器',
    shooting: '弓弩、枪械、投掷',
    awareness: '观察、聆听、搜索',
    survival: '辨向、追踪、野外生存',
    medicine: '急救、诊断、治疗',
    knowledge: '知识辨识、资料研究',
    social: '交涉、欺骗、察言观色',
    mechanics: '器具操作、制作维修、锁具',
    concealment: '潜行、藏身、扒窃',
};
