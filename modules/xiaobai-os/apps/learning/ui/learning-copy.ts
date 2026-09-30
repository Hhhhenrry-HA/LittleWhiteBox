/** Shared user-facing wording; action IDs and saved state never depend on these labels. */
import type { LEARNING_PROCESS_FIELDS } from '../application/message-view.js';

export const LEARNING_PROCESS_COPY = {
    title: '学习动态', stop: '停止本次操作', round: (count: number) => `第 ${count} 轮`,
    history: (count: number) => `${count} 个步骤`, received: (count: number) => `已收到 ${count} 字，正在整理`,
    preparing: '准备中', running: '进行中', done: '完成', failed: '未完成', cancelled: '已停止', thinking: '正在思考…',
    issues: (count: number) => `${count} 项内容未通过检查`, checkFields: (fields: string) => `需要调整：${fields}`,
    results: (count: number) => `找到 ${count} 个来源`, paragraphs: (count: number) => `读到 ${count} 段正文`,
    entries: (count: number) => `读到 ${count} 条记录`, sourcesFailed: (count: number) => `${count} 个来源未能读取`,
    proposedMaterials: (count: number) => `${count} 篇材料`, proposedExercises: (count: number) => `${count} 道练习`,
    outcomes: { finished: '本次已完成', failed: '本次未完成', cancelled: '本次已停止', unconfirmed: '等待确认保存', conflict: '需要核对保存结果' },
    tools: { LearningRead: '查看学习记录', LearningContextRead: '查看相关资料', LearningSearch: '寻找文章', LearningExtract: '阅读原文',
        LearningProfileEdit: '调整学习目标', LearningLessonEdit: '准备练习', LearningRequest: '安排练习', LearningModelEssay: '准备范文',
        LearningArticle: '整理阅读正文', LearningReadingNotes: '整理本段知识', LearningEssayTask: '准备写作题',
        LearningAssess: '批改作答', LearningHelp: '确认讲解范围', LearningPresent: '打开练习', LearningComplete: '整理学习收获' } as Record<string, string>,
    sections: { overview: '学习概况', training: '本次阅读材料', unit: '本次练习', materials: '阅读材料', exercises: '练习题', attempts: '你的作答',
        notes: '笔记', listening: '听力记录', items: '知识点', review: '到期复习', evidence: '学习记录', completions: '已完成练习', sources: '文章来源' } as Record<string, string>,
};
export const LEARNING_PROCESS_FIELD_LABELS: Record<typeof LEARNING_PROCESS_FIELDS[number], string> = {
    language: '学习语言', explanationLanguage: '讲解语言', goal: '学习目标', title: '标题', kind: '练习形式', tier: '练习规模',
    materials: '阅读材料', materialKeys: '材料关联', exercises: '练习题', paragraphId: '段落关联', explanations: '段落讲解',
    response: '作答形式', options: '选项', rule: '评改规则', answer: '参考答案', attemptId: '作答关联', unitId: '练习关联',
    verdict: '评改结论', annotations: '批注', exerciseIds: '题目关联', materialIds: '材料关联', instruction: '操作依据', action: '本次操作',
};
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
