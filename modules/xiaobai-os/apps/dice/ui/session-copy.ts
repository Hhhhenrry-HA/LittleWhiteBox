import type { DiceHostBlocker, DiceHostWait } from '../application/host-wait.js';

const blockerLabels: Record<DiceHostBlocker, string> = {
    stream: '回复流式收尾', save: '聊天保存', generation: '生成占用解除',
};

export const DICE_SESSION_COPY = {
    waitingGroup: '等待群聊轮次交接…',
    waitingHost: '等待酒馆交接回复…',
    unrolled: '检定请求已保留，尚未掷骰。',
    paused: '已暂停等待，尚未掷骰。',
    retained: '已暂停等待，骰点已保留。',
    retryCheck: '重试检定',
    retryContinue: '沿用骰点续写',
    continuing: '正在续写…',
    retryFailed: '暂时无法重试。请等酒馆生成结束；若已修改回复，请用酒馆的「继续」。',
} as const;

export function diceHostWaitLabel(wait: DiceHostWait): string {
    return `等待${wait.blockers.map(blocker => blockerLabels[blocker]).join('、')} · 已等 ${wait.elapsedSeconds} 秒`;
}
