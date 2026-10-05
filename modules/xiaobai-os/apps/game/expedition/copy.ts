import { RELIC_RULES as R, RULES } from './content.js';
import type { EnemyKind, Oath, Relic, RouteKind, Weapon } from './types.js';

const TITLE = ['余烬', '远征'];
export const COPY = {
    titleFirst: TITLE[0], titleSecond: TITLE[1], journey: '远征之路',
    dashKey: '空格', skillKey: 'E', moveKeys: 'W A S D / 方向键', lockedTag: '未解锁',
    unlockReward: (boss: string, reward: string) => `击败${boss}，解锁${reward}`,
    victory: '区域已肃清',
    chapter: (n: number) => `第 ${n + 1} 章`, bossDefeated: (name: string) => `${name}已被击败`,
    equipped: '已装备', noRelics: '击败敌人后，选择你的第一件遗物。',
    nextGoal: (name: string) => `下一位首领 · ${name}`,
    name: TITLE.join(''), category: '动作肉鸽', tagline: '小白的失落王城远征', entry: '免费出发',
    start: '启程', resume: '继续远征', pause: '暂停', paused: '远征已暂停', continue: '继续战斗',
    preparing: '正在打开远征…', saving: '正在保存', saved: '已保存', retry: '核实并恢复', refresh: '重新读取',
    saveError: '进度尚未确认，远征已暂停。核实保存后继续，不会重新抽取奖励。',
    invalid: '远征数据或操作不合法，未执行。', stale: '进度已经更新，请重新读取。',
    failure: (code: string) => `远征操作未完成${code ? `（${code}）` : ''}，请重新读取后再试。`,
    unavailable: '当前不能继续远征，请等保存或故事回复结束。', locked: '尚未解锁这项选择。',
    presentationError: { rendering: '战场画面无法显示，进度已保留。请重新打开游戏。', sound: '声音启动失败，可关闭声音后继续。' },
    story: '故事正在回复，战斗已暂停。', controls: '移动 WASD / 方向键 · 闪避 空格 · 技能 E · 暂停 Esc',
    touchMove: '移动摇杆', dash: '闪避', skill: '技能', autoAttack: '自动攻击最近的敌人',
    route: '选择路线', reward: '带走一件遗物', equipment: '行囊', slots: (n: number) => `${n} / ${RULES.relicSlots} 遗物`,
    replace: '选择要替换的遗物', discard: '放弃奖励', cancel: '取消', confirm: '确认',
    rest: '休整', restDetail: (n: number) => `恢复 ${n} 生命`, shrine: '献祭',
    sacrifice: `献出 ${RULES.sacrificeHp} 生命，换取一件遗物`, merchant: '遗物商人',
    buy: (n: number) => `${n} 碎晶 · 购买`, shards: '碎晶', hp: '生命', leave: '继续前行',
    abandoned: '远征已结束', lost: '倒在黎明之前', won: '王城的钟声再次响起',
    resultDetail: '解锁、发现和已到账奖励永久保留；本局遗物与碎晶不带入下一局。',
    restart: '再次启程', return: '返回营地', abandon: '结束本次远征',
    abandonBody: '放弃当前远征？本局构筑将结束，已经获得的解锁与奖励保留。',
    archive: '远征手记', back: '返回', discoveries: '发现的遗物', history: '最近远征',
    weapons: '武器', cloaks: '披风', oaths: '远征誓约', oathsLocked: '通关王城后开放誓约',
    unlockWeapon: (name: string) => `击败${name}后解锁`, unlockCloak: (n: number) => `击败第 ${n} 位首领后解锁`,
    free: '免费入场 · 无付费复活', sound: '声音',
    help: '操作', close: '关闭', progress: (zone: string, step: number) => `${zone} · ${step + 1} / ${RULES.zoneSteps}`,
    wave: (n: number, total: number) => `第 ${n} / ${total} 波`, bossPhase: (n: number) => `阶段 ${n}`,
    gold: (n: number) => `本次已获得 ${n} 小白币`, wallet: (n: number) => `小白币 ${n}`,
    earned: (n: number) => `获得 ${n} 小白币`, newUnlocks: (names: string[]) => `已解锁：${names.join(' · ')}`,
    stats: (kills: number, ticks: number) => `${kills} 击败 · ${Math.floor(ticks / RULES.hz / 60)}:${String(Math.floor(ticks / RULES.hz) % 60).padStart(2, '0')}`,
    journalEmpty: '完成一次远征后，战绩会留在这里。', unknown: '未发现',
    rewardRule: `首领首胜各 ${RULES.firstBossAward} 币 · 首次通关 ${RULES.firstVictoryAward} 币 · 每种武器首次通关 ${RULES.masteryAward} 币 · 每条誓约首次通关 ${RULES.oathAward} 币`,
    checkpoint: '战斗自动保存；意外关闭后，从最近一次已确认进度继续。',
    lootPool: `每次远征从全部遗物中抽出 ${RULES.relicPoolSize} 种形成本局遗物池，不保证出现某一套组合。`,
    mastered: '已通关', unlocked: '已解锁', healthCost: '生命不足，无法献祭', noShards: '碎晶不足',
};
export const ZONE_NAMES = ['风息庭院', '月潮回廊', '日冕王城'];
export const CLOAK_NAMES = ['旅人蓝', '守望青', '月织紫', '日冕金'];
export const WEAPON_COPY: Record<Weapon, { name: string; detail: string; skill: string }> = {
    blade: { name: '旅人长剑', detail: '近身横斩，击中多个敌人。', skill: '回旋斩：击退周围敌人，短暂格挡并反射来袭弹幕。' },
    bow: { name: '风语弓', detail: '远程连射，移动中寻找角度。', skill: '穿云箭：五束贯穿箭矢。' },
    staff: { name: '星灯杖', detail: '星弹命中后溅射周围敌人。', skill: '星落：在敌群中心落下三次冲击。' },
};
export const ENEMY_NAMES: Record<EnemyKind, string> = {
    soldier: '失落卫兵', archer: '逐风射手', guard: '重盾守卫', priest: '月灯祭司', charger: '裂角兽',
    warden: '庭院守望者', weaver: '织月者', king: '空冠之王',
};
export const ROUTE_COPY: Record<RouteKind, { name: string; detail: string; mark: string }> = {
    battle: { name: '遭遇战', detail: '击败守军 · 遗物与碎晶', mark: '⚔' },
    elite: { name: '精英据点', detail: '强化守军 · 更多碎晶与四选一遗物', mark: '◆' },
    camp: { name: '篝火', detail: '恢复生命 · 无战斗奖励', mark: '♨' },
    shrine: { name: '古老祭坛', detail: '以生命换取遗物', mark: '✧' },
    merchant: { name: '行商', detail: '用本局碎晶购买遗物', mark: '◇' },
    boss: { name: '首领', detail: '赢下这一战，打开下一道城门', mark: '♛' },
};
export const OATH_COPY: Record<Oath, { name: string; detail: string }> = {
    haste: { name: '迅疾', detail: '敌人更快完成蓄力，行动间隔缩短。' },
    scarcity: { name: '孤旅', detail: '篝火恢复减半，首领战后不再恢复生命。' },
    legion: { name: '重围', detail: '每波增援，首领每次转阶段召来护卫。' },
};
export const RELIC_COPY: Record<Relic, { name: string; detail: string; family: string }> = {
    'storm-step': { name: '踏雷靴', detail: '闪避起点留下雷场，每次命中造成雷击。', family: '雷' },
    conductor: { name: '导雷针', detail: '雷击向附近另外两名敌人传导。', family: '雷' },
    momentum: { name: '风暴轴心', detail: '雷击命中使闪避冷却缩短；闪避结束释放雷击。', family: '雷' },
    cinder: { name: '余烬', detail: '攻击点燃敌人，持续灼烧。', family: '火' },
    wildfire: { name: '野火瓶', detail: '燃烧中的敌人死亡留下火场，点燃附近敌人。', family: '火' },
    'blood-price': { name: '赤誓', detail: `所有伤害提高 ${Math.round((R.bloodDamage - 1) * 100)}%，受到的伤害提高 ${Math.round((R.bloodHurt - 1) * 100)}%。`, family: '险' },
    frost: { name: '霜铃', detail: '攻击使敌人减速；首领减速效果较弱。', family: '霜' },
    shatter: { name: '碎冰棱', detail: '技能击中冰缓敌人造成额外伤害，并炸伤附近敌人。', family: '霜' },
    echo: { name: '回声', detail: `每第 ${R.echoEvery} 次普攻追加一次追击。`, family: '技' },
    hunter: { name: '猎星镜', detail: `距离超过 ${R.hunterRange} 步的远程命中额外造成 ${Math.round((R.hunterDamage - 1) * 100)}% 伤害。`, family: '弓' },
    piercing: { name: '穿心羽', detail: `远程弹体穿透额外 ${R.extraPierce} 个敌人；长剑攻击范围扩大。`, family: '锋' },
    orbit: { name: '卫星', detail: `每隔 ${R.orbitTicks / RULES.hz} 秒向身边敌人释放一道雷击。`, family: '雷' },
    thorns: { name: '荆棘银环', detail: '受伤或格挡时反击周围敌人，造成伤害并击退。', family: '守' },
    aegis: { name: '镜盾', detail: '使用技能后短暂格挡，并把弹幕反射回去。', family: '守' },
    siphon: { name: '温血石', detail: `每击败 ${R.siphonEvery} 名敌人恢复 ${R.siphonHeal} 生命；首领击败恢复 ${R.siphonBossHeal} 生命。`, family: '生' },
    focus: { name: '澄明', detail: `技能冷却缩短 ${Math.round((1 - R.focusSkill) * 100)}%，普攻间隔延长 ${Math.round((R.focusAttack - 1) * 100)}%。`, family: '技' },
    renewal: { name: '归途灯', detail: `每次取得遗物时恢复 ${R.renewalHeal} 生命，进入下一片区域额外恢复 ${R.renewalZoneHeal}。`, family: '生' },
    execution: { name: '断章', detail: `对生命低于 ${R.executeThreshold * 100}% 的敌人额外造成 ${Math.round((R.executeDamage - 1) * 100)}% 伤害。`, family: '锋' },
};
export function errorText(cause: unknown) {
    const code = cause && typeof cause === 'object' && 'code' in cause ? String(cause.code) : cause instanceof Error ? cause.message : '';
    if (code === 'expedition_stale') { return COPY.stale; }
    if (code === 'expedition_locked') { return COPY.locked; }
    if (code === 'expedition_unavailable') { return COPY.unavailable; }
    if (code === 'expedition_invalid' || code === 'expedition_identity') { return COPY.invalid; }
    if (code.startsWith('expedition_save_') || code.startsWith('host_request_')) { return COPY.saveError; }
    return COPY.failure(code);
}
