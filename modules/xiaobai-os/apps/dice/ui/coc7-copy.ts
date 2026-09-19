export const COC7_UI = {
    title: '我的属性', empty: '待生成属性', generate: '一键随机', edit: '手调', reroll: '重新随机',
    save: '保存', saving: '保存中…', cancel: '取消', apply: '确定', clear: '清空属性', confirmClear: '确认清空',
    clearNotice: '清空后，新 CoC 检定暂停。聊天与已掷结果保留。',
    damaged: '属性数据损坏，CoC 新检定已暂停。原数据仍保留；可清空，或生成新面板后保存替换。',
    replace: '生成替换面板',
    scope: '全局面板 · 换卡、换聊天均保留',
    quick: '快捷随机加点，不含职业建卡。',
    hpMax: 'HP 上限', mpMax: 'MP 上限', sanInitial: '初始 SAN',
    invalid: '请输入有效的正整数；属性与派生技能须保持有效。', belowBase: '技能不能低于当前基础值。',
    saveFailed: '属性未能保存，草稿已保留，请重试。',
    clearFailed: '属性未能清空，原面板已保留，请重试。',
    description: '使用你的全局属性面板，AI 选择能力和难度，程序查值掷骰。',
} as const;
