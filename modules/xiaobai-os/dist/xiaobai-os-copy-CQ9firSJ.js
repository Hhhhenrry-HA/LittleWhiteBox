/* eslint-disable */
var i = Object.freeze({
  hz: 30,
  arena: 11,
  playerRadius: 0.34,
  speed: 0.115,
  maxHp: 100,
  dashTicks: 8,
  dashCooldown: 45,
  skillCooldown: 210,
  relicSlots: 6,
  relicPoolSize: 12,
  zoneSteps: 5,
  zones: 3,
  maxInputTicks: 900,
  checkpointTicks: 240,
  shopCost: 60,
  battleShards: 24,
  eliteShards: 45,
  bossShards: 70,
  restHeal: 32,
  sacrificeHp: 22,
  firstBossAward: 80,
  firstVictoryAward: 200,
  masteryAward: 120,
  oathAward: 100,
  recordLimit: 20
}), s = {
  blade: {
    damage: 17,
    period: 23,
    range: 2.15,
    skill: 38,
    unlock: -1
  },
  bow: {
    damage: 13,
    period: 20,
    range: 10,
    skill: 23,
    unlock: 0
  },
  staff: {
    damage: 20,
    period: 34,
    range: 8,
    skill: 31,
    unlock: 1
  }
}, l = [
  "storm-step",
  "conductor",
  "momentum",
  "cinder",
  "wildfire",
  "blood-price",
  "frost",
  "shatter",
  "echo",
  "hunter",
  "piercing",
  "orbit",
  "thorns",
  "aegis",
  "siphon",
  "focus",
  "renewal",
  "execution"
], d = [
  "haste",
  "scarcity",
  "legion"
], r = Object.freeze({
  bloodDamage: 1.45,
  bloodHurt: 1.25,
  hunterRange: 5,
  hunterDamage: 1.5,
  executeThreshold: 0.3,
  executeDamage: 1.6,
  echoEvery: 3,
  extraPierce: 2,
  orbitTicks: 60,
  siphonEvery: 5,
  siphonHeal: 4,
  siphonBossHeal: 8,
  focusSkill: 0.7,
  focusAttack: 1.15,
  renewalHeal: 8,
  renewalZoneHeal: 10
}), c = {
  soldier: {
    hp: 43,
    speed: 0.046,
    radius: 0.4,
    damage: 10,
    reach: 1.2,
    windup: 24,
    cooldown: 45
  },
  archer: {
    hp: 32,
    speed: 0.032,
    radius: 0.36,
    damage: 9,
    reach: 9,
    windup: 30,
    cooldown: 72
  },
  guard: {
    hp: 80,
    speed: 0.027,
    radius: 0.55,
    damage: 16,
    reach: 1.8,
    windup: 36,
    cooldown: 66
  },
  priest: {
    hp: 40,
    speed: 0.018,
    radius: 0.4,
    damage: 8,
    reach: 10,
    windup: 42,
    cooldown: 115
  },
  charger: {
    hp: 58,
    speed: 0.037,
    radius: 0.48,
    damage: 15,
    reach: 8,
    windup: 36,
    cooldown: 85
  },
  warden: {
    hp: 1300,
    speed: 0.025,
    radius: 1.25,
    damage: 19,
    reach: 20,
    windup: 40,
    cooldown: 38
  },
  weaver: {
    hp: 1800,
    speed: 0.028,
    radius: 1.1,
    damage: 17,
    reach: 20,
    windup: 36,
    cooldown: 42
  },
  king: {
    hp: 2500,
    speed: 0.03,
    radius: 1.4,
    damage: 22,
    reach: 20,
    windup: 38,
    cooldown: 34
  }
}, n = [
  "warden",
  "weaver",
  "king"
];
function m(e) {
  return n.includes(e);
}
var t = ["余烬", "远征"], o = {
  titleFirst: t[0],
  titleSecond: t[1],
  journey: "远征之路",
  dashKey: "空格",
  skillKey: "E",
  moveKeys: "W A S D / 方向键",
  lockedTag: "未解锁",
  unlockReward: (e, a) => `击败${e}，解锁${a}`,
  victory: "区域已肃清",
  chapter: (e) => `第 ${e + 1} 章`,
  bossDefeated: (e) => `${e}已被击败`,
  equipped: "已装备",
  noRelics: "击败敌人后，选择你的第一件遗物。",
  nextGoal: (e) => `下一位首领 · ${e}`,
  name: t.join(""),
  category: "动作肉鸽",
  tagline: "小白的失落王城远征",
  entry: "免费出发",
  start: "启程",
  resume: "继续远征",
  pause: "暂停",
  paused: "远征已暂停",
  continue: "继续战斗",
  preparing: "正在打开远征…",
  saving: "正在保存",
  saved: "已保存",
  retry: "核实并恢复",
  refresh: "重新读取",
  saveError: "进度尚未确认，远征已暂停。核实保存后继续，不会重新抽取奖励。",
  invalid: "远征数据或操作不合法，未执行。",
  stale: "进度已经更新，请重新读取。",
  failure: (e) => `远征操作未完成${e ? `（${e}）` : ""}，请重新读取后再试。`,
  unavailable: "当前不能继续远征，请等保存或故事回复结束。",
  locked: "尚未解锁这项选择。",
  presentationError: {
    rendering: "战场画面无法显示，进度已保留。请重新打开游戏。",
    sound: "声音启动失败，可关闭声音后继续。"
  },
  story: "故事正在回复，战斗已暂停。",
  controls: "移动 WASD / 方向键 · 闪避 空格 · 技能 E · 暂停 Esc",
  touchMove: "移动摇杆",
  dash: "闪避",
  skill: "技能",
  autoAttack: "自动攻击最近的敌人",
  route: "选择路线",
  reward: "带走一件遗物",
  equipment: "行囊",
  slots: (e) => `${e} / ${i.relicSlots} 遗物`,
  replace: "选择要替换的遗物",
  discard: "放弃奖励",
  cancel: "取消",
  confirm: "确认",
  rest: "休整",
  restDetail: (e) => `恢复 ${e} 生命`,
  shrine: "献祭",
  sacrifice: `献出 ${i.sacrificeHp} 生命，换取一件遗物`,
  merchant: "遗物商人",
  buy: (e) => `${e} 碎晶 · 购买`,
  shards: "碎晶",
  hp: "生命",
  leave: "继续前行",
  abandoned: "远征已结束",
  lost: "倒在黎明之前",
  won: "王城的钟声再次响起",
  resultDetail: "解锁、发现和已到账奖励永久保留；本局遗物与碎晶不带入下一局。",
  restart: "再次启程",
  return: "返回营地",
  abandon: "结束本次远征",
  abandonBody: "放弃当前远征？本局构筑将结束，已经获得的解锁与奖励保留。",
  archive: "远征手记",
  back: "返回",
  discoveries: "发现的遗物",
  history: "最近远征",
  weapons: "武器",
  cloaks: "披风",
  oaths: "远征誓约",
  oathsLocked: "通关王城后开放誓约",
  unlockWeapon: (e) => `击败${e}后解锁`,
  unlockCloak: (e) => `击败第 ${e} 位首领后解锁`,
  free: "免费入场 · 无付费复活",
  sound: "声音",
  help: "操作",
  close: "关闭",
  progress: (e, a) => `${e} · ${a + 1} / ${i.zoneSteps}`,
  wave: (e, a) => `第 ${e} / ${a} 波`,
  bossPhase: (e) => `阶段 ${e}`,
  gold: (e) => `本次已获得 ${e} 小白币`,
  wallet: (e) => `小白币 ${e}`,
  earned: (e) => `获得 ${e} 小白币`,
  newUnlocks: (e) => `已解锁：${e.join(" · ")}`,
  stats: (e, a) => `${e} 击败 · ${Math.floor(a / i.hz / 60)}:${String(Math.floor(a / i.hz) % 60).padStart(2, "0")}`,
  journalEmpty: "完成一次远征后，战绩会留在这里。",
  unknown: "未发现",
  rewardRule: `首领首胜各 ${i.firstBossAward} 币 · 首次通关 ${i.firstVictoryAward} 币 · 每种武器首次通关 ${i.masteryAward} 币 · 每条誓约首次通关 ${i.oathAward} 币`,
  checkpoint: "战斗自动保存；意外关闭后，从最近一次已确认进度继续。",
  lootPool: `每次远征从全部遗物中抽出 ${i.relicPoolSize} 种形成本局遗物池，不保证出现某一套组合。`,
  mastered: "已通关",
  unlocked: "已解锁",
  healthCost: "生命不足，无法献祭",
  noShards: "碎晶不足"
}, h = [
  "风息庭院",
  "月潮回廊",
  "日冕王城"
], u = [
  "旅人蓝",
  "守望青",
  "月织紫",
  "日冕金"
], p = {
  blade: {
    name: "旅人长剑",
    detail: "近身横斩，击中多个敌人。",
    skill: "回旋斩：击退周围敌人，短暂格挡并反射来袭弹幕。"
  },
  bow: {
    name: "风语弓",
    detail: "远程连射，移动中寻找角度。",
    skill: "穿云箭：五束贯穿箭矢。"
  },
  staff: {
    name: "星灯杖",
    detail: "星弹命中后溅射周围敌人。",
    skill: "星落：在敌群中心落下三次冲击。"
  }
}, f = {
  soldier: "失落卫兵",
  archer: "逐风射手",
  guard: "重盾守卫",
  priest: "月灯祭司",
  charger: "裂角兽",
  warden: "庭院守望者",
  weaver: "织月者",
  king: "空冠之王"
}, w = {
  battle: {
    name: "遭遇战",
    detail: "击败守军 · 遗物与碎晶",
    mark: "⚔"
  },
  elite: {
    name: "精英据点",
    detail: "强化守军 · 更多碎晶与四选一遗物",
    mark: "◆"
  },
  camp: {
    name: "篝火",
    detail: "恢复生命 · 无战斗奖励",
    mark: "♨"
  },
  shrine: {
    name: "古老祭坛",
    detail: "以生命换取遗物",
    mark: "✧"
  },
  merchant: {
    name: "行商",
    detail: "用本局碎晶购买遗物",
    mark: "◇"
  },
  boss: {
    name: "首领",
    detail: "赢下这一战，打开下一道城门",
    mark: "♛"
  }
}, $ = {
  haste: {
    name: "迅疾",
    detail: "敌人更快完成蓄力，行动间隔缩短。"
  },
  scarcity: {
    name: "孤旅",
    detail: "篝火恢复减半，首领战后不再恢复生命。"
  },
  legion: {
    name: "重围",
    detail: "每波增援，首领每次转阶段召来护卫。"
  }
}, g = {
  "storm-step": {
    name: "踏雷靴",
    detail: "闪避起点留下雷场，每次命中造成雷击。",
    family: "雷"
  },
  conductor: {
    name: "导雷针",
    detail: "雷击向附近另外两名敌人传导。",
    family: "雷"
  },
  momentum: {
    name: "风暴轴心",
    detail: "雷击命中使闪避冷却缩短；闪避结束释放雷击。",
    family: "雷"
  },
  cinder: {
    name: "余烬",
    detail: "攻击点燃敌人，持续灼烧。",
    family: "火"
  },
  wildfire: {
    name: "野火瓶",
    detail: "燃烧中的敌人死亡留下火场，点燃附近敌人。",
    family: "火"
  },
  "blood-price": {
    name: "赤誓",
    detail: `所有伤害提高 ${Math.round((r.bloodDamage - 1) * 100)}%，受到的伤害提高 ${Math.round((r.bloodHurt - 1) * 100)}%。`,
    family: "险"
  },
  frost: {
    name: "霜铃",
    detail: "攻击使敌人减速；首领减速效果较弱。",
    family: "霜"
  },
  shatter: {
    name: "碎冰棱",
    detail: "技能击中冰缓敌人造成额外伤害，并炸伤附近敌人。",
    family: "霜"
  },
  echo: {
    name: "回声",
    detail: `每第 ${r.echoEvery} 次普攻追加一次追击。`,
    family: "技"
  },
  hunter: {
    name: "猎星镜",
    detail: `距离超过 ${r.hunterRange} 步的远程命中额外造成 ${Math.round((r.hunterDamage - 1) * 100)}% 伤害。`,
    family: "弓"
  },
  piercing: {
    name: "穿心羽",
    detail: `远程弹体穿透额外 ${r.extraPierce} 个敌人；长剑攻击范围扩大。`,
    family: "锋"
  },
  orbit: {
    name: "卫星",
    detail: `每隔 ${r.orbitTicks / i.hz} 秒向身边敌人释放一道雷击。`,
    family: "雷"
  },
  thorns: {
    name: "荆棘银环",
    detail: "受伤或格挡时反击周围敌人，造成伤害并击退。",
    family: "守"
  },
  aegis: {
    name: "镜盾",
    detail: "使用技能后短暂格挡，并把弹幕反射回去。",
    family: "守"
  },
  siphon: {
    name: "温血石",
    detail: `每击败 ${r.siphonEvery} 名敌人恢复 ${r.siphonHeal} 生命；首领击败恢复 ${r.siphonBossHeal} 生命。`,
    family: "生"
  },
  focus: {
    name: "澄明",
    detail: `技能冷却缩短 ${Math.round((1 - r.focusSkill) * 100)}%，普攻间隔延长 ${Math.round((r.focusAttack - 1) * 100)}%。`,
    family: "技"
  },
  renewal: {
    name: "归途灯",
    detail: `每次取得遗物时恢复 ${r.renewalHeal} 生命，进入下一片区域额外恢复 ${r.renewalZoneHeal}。`,
    family: "生"
  },
  execution: {
    name: "断章",
    detail: `对生命低于 ${r.executeThreshold * 100}% 的敌人额外造成 ${Math.round((r.executeDamage - 1) * 100)}% 伤害。`,
    family: "锋"
  }
};
function k(e) {
  const a = e && typeof e == "object" && "code" in e ? String(e.code) : e instanceof Error ? e.message : "";
  return a === "expedition_stale" ? o.stale : a === "expedition_locked" ? o.locked : a === "expedition_unavailable" ? o.unavailable : a === "expedition_invalid" || a === "expedition_identity" ? o.invalid : a.startsWith("expedition_save_") || a.startsWith("host_request_") ? o.saveError : o.failure(a);
}
export {
  m as _,
  g as a,
  h as c,
  c as d,
  d as f,
  s as g,
  i as h,
  $ as i,
  k as l,
  r as m,
  o as n,
  w as o,
  l as p,
  f as r,
  p as s,
  u as t,
  n as u
};
