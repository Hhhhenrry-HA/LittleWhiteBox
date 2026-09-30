/** Shared user-facing wording; action IDs and saved state never depend on these labels. */
export const LEARNING_MASTERY_LABELS = { unassessed: '还没练过', review: '待确认', independent: '已能独立使用', practised: '练过一次', strengthen: '再练练' };

export const LEARNING_EVIDENCE_LABEL = (count: number) => `${count} 次作答`;
export const LEARNING_DUE_LABEL = (count: number) => `${count} 个知识点可以温习了`;
export const LEARNING_VOICE_COPY = { settings: '声音设置', enable: '开启语音' };

export const LEARNING_FLOW_COPY = {
    navigation: '本篇学习', reading: '阅读与写作', feedback: '批改与修改', model: '范文',
    grading: '正在看你的作品…', reviewing: '正在复核修改稿…', modelling: '正在写范文…',
    gradeReady: '这一篇写好了', grade: '提交批改', continue: '继续', stop: '停止', viewModel: '查看范文',
    review: '开始复习', resumeReview: '继续复习',
    original: '原稿与批注', revision: '修改稿', resolved: '这处已改对',
    setupTitle: '这次想学到哪里', setupSteps: 3, setupContinue: '继续', setupFinish: '确认目标',
    optionalSettings: '讲解语言与兴趣', saveSettings: '保存设置',
};

export const LEARNING_CONFIRM_COPY: Record<string, { title: string; accept: string }> = {
    'replace-lesson': { title: '换一篇练习？', accept: '换一篇' },
    abandon: { title: '放下这次练习？', accept: '放下练习' },
    'abandon-review': { title: '放下这组复习？', accept: '放下复习' },
    'skip-revision': { title: '跳过修改？', accept: '查看范文' },
    'adopt-server': { title: '使用已保存的学习记录？', accept: '使用已保存记录' },
    'adopt-wallet': { title: '使用已保存的钱包？', accept: '使用已保存钱包' },
    'forget-conversation': { title: '清空这段对话？', accept: '清空对话' },
    'delete-language': { title: '删除这门语言的学习数据？', accept: '删除学习数据' },
    clear: { title: '清空所有学习数据？', accept: '清空学习数据' },
    'delete-item': { title: '删除这条学习记录？', accept: '删除记录' },
    'delete-attempt': { title: '删除这次作答？', accept: '删除作答' },
};

export const LEARNING_DISCARD_COPY = {
    lesson: '本次练习的材料、作答和笔记会删除；已收入学习本的记录和已获得的奖励会保留。',
    review: '这组已答的题会删除，复习时间安排不变。',
};
