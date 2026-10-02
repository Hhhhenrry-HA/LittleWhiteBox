import { STACKING_POLICY as P, type HouseKind } from './policy.js';
export const HOUSE_NAMES: Record<HouseKind, string> = { wide: '宽底小屋', loft: '窄顶阁楼', balcony: '重阳台', step: '错台屋' };
export const COPY = {
    name: '云上叠叠屋', category: '3D · 平衡搭建', tagline: '让歪歪的小楼，亮起一整座镇的灯。',
    description: '选落点、调朝向，用下一间房救回倾斜的小楼。收工还是继续向云上搭？', entry: '去搭小楼', mark: '⌂',
    start: `开工 · ${P.fee} 金币`, resume: '继续搭建', drop: '落下', flip: '调头', next: '下一间', now: '吊运中',
    rules: '玩法', close: '关闭', cancel: '再想想', confirm: '确定', abandon: '放弃本局', again: '再搭一栋',
    best: '最佳小楼', back: '返回本局', export: '保存留影', replay: '回看失误',
    scene: '小白陪你在云上搭建奶色小屋', revealing: '看看小楼落得怎么样…',
    soundOn: '声音开', soundOff: '声音关', soundError: '声音设置未保存，请重试。',
    rotateLeft: '向左转动小楼', rotateRight: '向右转动小楼', zoomIn: '放大', zoomOut: '缩小', pause: '暂停',
    audioDispose: '[Stacking] Audio context disposal failed',
    loading: '正在找回你的小楼…', saving: '正在保存…', generating: '正在检查开工图纸…', awaiting: '等待确认',
    storyBusy: '故事生成中，吊车已暂停', saved: '已保存', paused: '吊车已暂停', play: '继续',
    saveProblem: '本次落点或结算尚未确认。先复核，不能重新选落点。', conflict: '存档有新版本，请复核后继续。',
    recoveryProblem: '本地恢复记录无法读写，已暂停操作。请允许本站存储后复核原操作。',
    recover: '复核原操作', refresh: '重新读取', graphics: '画面暂停，原局仍在。请重新载入画面。', reload: '重载画面',
    exportError: '留影未能生成，请重试。', noFunds: '金币不足，开工需要报名费。',
    admissionTitle: '开工新小楼', admissionBody: `报名扣 ${P.fee} 金币。收工才到账；倒塌或放弃不退费。关闭页面可以下次接着搭。`,
    abandonTitle: '要放弃这栋小楼？', abandonBody: '尚未收工的金币全部作废，报名费不退。',
    cashTitle: '现在收工？', cashBody: '本局结束，按当前档位结算。继续搭建则承担倒塌后奖金归零的风险。',
    won: '云端小镇，落成！', cashed: '今天的小楼收工了', lost: '这次没有撑住', abandoned: '小楼已停工',
    failure: { miss: '房屋落空了', contact: '承托面太窄', balance: '上方的重心越过了承托边缘' },
    ruleItems: ['吊车左右移动：调头改变偏心方向，落下锁定当前位置。空格落下，方向键调头。',
        '浅色屋顶是下一间的承托面。重阳台的重量偏向外侧，错台屋的顶面偏向一边。装饰不挂住邻居。',
        '每层都要托住上方全部房屋。重心圆点接近承托边缘时，可以尝试用下一间向另一侧配重。',
        '随机图纸开局可建满，但你的落点可能让后续无法挽救。没有撤回或复活。'],
    stages: P.prizes.map(t => `${t.count} 间 → ${t.amount} 金币`).join('　／　'),
    balance: (amount: number) => `钱包 ${amount}`,
    progress: (count: number) => `${count} / ${P.houses} 间`,
    cash: (amount: number) => `收工 +${amount}`,
    reward: (amount: number) => `到账 ${amount} · 净收益 ${amount - P.fee >= 0 ? '+' : ''}${amount - P.fee}`,
    bestCount: (count: number) => `最高 ${count} 间`,
    weak: (index: number) => `第 ${index + 1} 层吃紧`,
    stable: '承托稳当', orient: (direction: number) => direction === 1 ? '朝右 →' : '← 朝左',
    exportName: (count: number) => `云上叠叠屋-${count}间.png`,
} as const;
const ERRORS: Record<string, string> = {
    stacking_recovery: COPY.recoveryProblem,
    stacking_invalid: '这次操作不合法，请重新读取。', stacking_identity: '操作身份不匹配，请重新读取。',
    stacking_stale: '小楼已有新进展，请重新读取。', stacking_funds: COPY.noFunds,
    stacking_active: '先完成或放弃当前小楼。', stacking_finished: '本局已经结束。', stacking_locked: '还没有到可收工的高度。',
    stacking_generation: '图纸检查未完成，没有扣费。请再试一次。', stacking_unavailable: '当前无法操作，请稍后重试。',
};
export function stackingErrorText(error: unknown): string {
    const code = error && typeof error === 'object' && 'code' in error ? String(error.code) : error instanceof Error ? error.message : '';
    return ERRORS[code] ?? COPY.saveProblem;
}
