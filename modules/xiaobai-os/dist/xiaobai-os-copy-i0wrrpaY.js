/* eslint-disable */
var t = {
  houses: 20,
  fee: 50,
  prizes: [
    {
      count: 8,
      amount: 50
    },
    {
      count: 12,
      amount: 80
    },
    {
      count: 16,
      amount: 120
    },
    {
      count: 20,
      amount: 200
    }
  ],
  groundWidth: 2200,
  rail: 2900,
  contact: 240,
  margin: 35,
  solverBudget: 1e4,
  seedAttempts: 12
};
function u(e) {
  return t.prizes.reduce((o, a) => e >= a.count ? a.amount : o, 0);
}
var l = {
  wide: {
    foot: 1800,
    top: 1600,
    offset: 0,
    height: 1e3,
    mass: 5,
    center: 0,
    color: 15847092
  },
  loft: {
    foot: 1040,
    top: 960,
    offset: 0,
    height: 1200,
    mass: 3,
    center: 0,
    color: 13360366
  },
  balcony: {
    foot: 1260,
    top: 1040,
    offset: 160,
    height: 1e3,
    mass: 6,
    center: 490,
    color: 14994920
  },
  step: {
    foot: 1520,
    top: 820,
    offset: 520,
    height: 1050,
    mass: 4,
    center: 180,
    color: 13032909
  }
};
function s(e) {
  return e < 4 ? 0 : e < 10 ? 1 : e < 15 ? 2 : 3;
}
var r = [
  0.68,
  0.9,
  1.1,
  1.3
];
function c(e, o) {
  return (e * 0.61803398875 + o * 0.381966) % 1 * Math.PI * 2;
}
function d(e, o, a) {
  return Math.round(Math.sin(c(e, o) + a * r[s(o)]) * t.rail);
}
var f = {
  wide: "宽底小屋",
  loft: "窄顶阁楼",
  balcony: "重阳台",
  step: "错台屋"
}, n = {
  name: "云上叠叠屋",
  category: "3D · 平衡搭建",
  tagline: "让歪歪的小楼，亮起一整座镇的灯。",
  description: "选落点、调朝向，用下一间房救回倾斜的小楼。收工还是继续向云上搭？",
  entry: "去搭小楼",
  mark: "⌂",
  start: `开工 · ${t.fee} 金币`,
  resume: "继续搭建",
  drop: "落下",
  flip: "调头",
  next: "下一间",
  now: "吊运中",
  rules: "玩法",
  close: "关闭",
  cancel: "再想想",
  confirm: "确定",
  abandon: "放弃本局",
  again: "再搭一栋",
  best: "最佳小楼",
  back: "返回本局",
  export: "保存留影",
  collapse: "看看倒塌",
  soundOn: "声音开",
  soundOff: "声音关",
  soundError: "声音设置未保存，请重试。",
  rotateLeft: "向左转动小楼",
  rotateRight: "向右转动小楼",
  zoomIn: "放大",
  zoomOut: "缩小",
  pause: "暂停",
  audioDispose: "[Stacking] Audio context disposal failed",
  loading: "正在找回你的小楼…",
  saving: "正在保存…",
  generating: "正在检查开工图纸…",
  storyBusy: "故事生成中，吊车已暂停",
  saved: "已保存",
  paused: "吊车已暂停",
  play: "继续",
  saveProblem: "本次落点或结算尚未确认。先复核，不能重新选落点。",
  conflict: "存档有新版本，请复核后继续。",
  recoveryProblem: "本地恢复记录无法读写，已暂停操作。请允许本站存储后复核原操作。",
  recover: "复核原操作",
  refresh: "重新读取",
  graphics: "画面暂停，原局仍在。请重新载入画面。",
  reload: "重载画面",
  exportError: "留影未能生成，请重试。",
  noFunds: "金币不足，开工需要报名费。",
  admissionTitle: "开工新小楼",
  admissionBody: `报名扣 ${t.fee} 金币。收工才到账；倒塌或放弃不退费。关闭页面可以下次接着搭。`,
  abandonTitle: "要放弃这栋小楼？",
  abandonBody: "尚未收工的金币全部作废，报名费不退。",
  cashTitle: "现在收工？",
  cashBody: "本局结束，按当前档位结算。继续搭建则承担倒塌后奖金归零的风险。",
  won: "云端小镇，落成！",
  cashed: "今天的小楼收工了",
  lost: "这次没有撑住",
  abandoned: "小楼已停工",
  failure: {
    miss: "房屋落空了",
    contact: "承托面太窄",
    balance: "上方的重心越过了承托边缘"
  },
  ruleItems: [
    "吊车左右移动：调头改变偏心方向，落下锁定当前位置。空格落下，方向键调头。",
    "浅色屋顶是下一间的承托面。重阳台的重量偏向外侧，错台屋的顶面偏向一边。装饰不挂住邻居。",
    "每层都要托住上方全部房屋。重心圆点接近承托边缘时，可以尝试用下一间向另一侧配重。",
    "随机图纸开局可建满，但你的落点可能让后续无法挽救。没有撤回或复活。"
  ],
  stages: t.prizes.map((e) => `${e.count} 间 → ${e.amount} 金币`).join("　／　"),
  balance: (e) => `钱包 ${e}`,
  progress: (e) => `${e} / ${t.houses} 间`,
  cash: (e) => `收工 +${e}`,
  reward: (e) => `到账 ${e} · 净收益 ${e - t.fee >= 0 ? "+" : ""}${e - t.fee}`,
  bestCount: (e) => `最高 ${e} 间`,
  weak: (e) => `第 ${e + 1} 层吃紧`,
  stable: "承托稳当",
  orient: (e) => e === 1 ? "朝右 →" : "← 朝左",
  exportName: (e) => `云上叠叠屋-${e}间.png`
}, i = {
  stacking_recovery: n.recoveryProblem,
  stacking_invalid: "这次操作不合法，请重新读取。",
  stacking_identity: "操作身份不匹配，请重新读取。",
  stacking_stale: "小楼已有新进展，请重新读取。",
  stacking_funds: n.noFunds,
  stacking_active: "先完成或放弃当前小楼。",
  stacking_finished: "本局已经结束。",
  stacking_locked: "还没有到可收工的高度。",
  stacking_generation: "图纸检查未完成，没有扣费。请再试一次。",
  stacking_unavailable: "当前无法操作，请稍后重试。"
};
function g(e) {
  return i[e && typeof e == "object" && "code" in e ? String(e.code) : e instanceof Error ? e.message : ""] ?? n.saveProblem;
}
export {
  t as a,
  s as c,
  l as i,
  f as n,
  u as o,
  g as r,
  d as s,
  n as t
};
