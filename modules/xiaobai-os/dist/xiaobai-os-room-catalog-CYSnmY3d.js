/* eslint-disable */
import { G as O, I as l, N as U, P as N, Q as G, R as p, S as x, _ as c, at as f, g as M, h as E, it as P, m as i, nt as m, rt as A, u as g } from "./xiaobai-os-runtime-dom.esm-bundler-C2atLQPd.js";
import { r as h } from "./xiaobai-os-copy-Bo3eHGxn.js";
import { t as u } from "./xiaobai-os-copy-BjKOpD_F.js";
var T = {
  1: [[2, 2]],
  2: [[1, 1], [3, 3]],
  3: [
    [1, 1],
    [2, 2],
    [3, 3]
  ],
  4: [
    [1, 1],
    [1, 3],
    [3, 1],
    [3, 3]
  ],
  5: [
    [1, 1],
    [1, 3],
    [2, 2],
    [3, 1],
    [3, 3]
  ],
  6: [
    [1, 1],
    [1, 3],
    [2, 1],
    [2, 3],
    [3, 1],
    [3, 3]
  ]
};
var V = 80, Y = 180, F = 200;
function m2(e) {
  const t = Math.max(0, e - 1) * 45 + 720 + V, a = t + Y;
  return {
    countAt: t,
    verdictAt: a,
    settledAt: a + F
  };
}
var Q = ["aria-label"], j = { class: "game-die-stage" }, q = { class: "game-die-pips" }, H = /* @__PURE__ */ x({
  __name: "Die",
  props: {
    value: {},
    delay: { default: 0 },
    highlight: {
      type: Boolean,
      default: !1
    },
    animate: {
      type: Boolean,
      default: !0
    }
  },
  setup(e) {
    const t = e, a = [
      {
        side: "is-front",
        face: 1
      },
      {
        side: "is-back",
        face: 6
      },
      {
        side: "is-top",
        face: 5
      },
      {
        side: "is-bottom",
        face: 2
      },
      {
        side: "is-left",
        face: 4
      },
      {
        side: "is-right",
        face: 3
      }
    ], o = {
      1: [0, 0],
      2: [90, 180],
      3: [0, -90],
      4: [0, 90],
      5: [-90, 0],
      6: [180, 0]
    };
    function r(s, n) {
      return `rotateX(${s}deg) rotateY(${n}deg)`;
    }
    function Z() {
      return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    const v = G(null), z = G(null);
    let y = null, k = null;
    function I() {
      const [s, n] = o[t.value];
      v.value && (v.value.style.transform = r(s, n));
    }
    function R() {
      const s = v.value;
      if (!s) return;
      if (y?.cancel(), k?.cancel(), y = null, k = null, !t.animate || Z() || typeof s.animate != "function") {
        I();
        return;
      }
      const [n, d] = o[t.value], w = 360 * (2 + Math.floor(Math.random() * 2)) + 146, _ = 360 * (1 + Math.floor(Math.random() * 2)) + 101;
      y = s.animate([
        {
          transform: r(n - w, d - _),
          easing: "cubic-bezier(.11,.58,.32,1)"
        },
        {
          transform: r(n + 13, d + 9),
          offset: 0.84,
          easing: "cubic-bezier(.36,0,.4,1)"
        },
        { transform: r(n, d) }
      ], {
        duration: 720,
        delay: t.delay,
        fill: "both"
      }), k = z.value?.animate([
        {
          transform: "translateY(-16px) scale(1.06)",
          easing: "cubic-bezier(.4,0,.7,1)"
        },
        {
          transform: "translateY(0) scale(1)",
          offset: 0.5,
          easing: "cubic-bezier(.2,0,.2,1)"
        },
        {
          transform: "translateY(-6px) scale(1.02)",
          offset: 0.68,
          easing: "cubic-bezier(.4,0,.7,1)"
        },
        {
          transform: "translateY(0) scale(1)",
          offset: 0.82,
          easing: "cubic-bezier(.2,0,.4,1)"
        },
        {
          transform: "translateY(-1.5px) scale(1)",
          offset: 0.9
        },
        { transform: "translateY(0) scale(1)" }
      ], {
        duration: 720,
        delay: t.delay,
        fill: "both"
      }) ?? null;
    }
    return U(R), N(() => {
      y?.cancel(), k?.cancel();
    }), O(() => t.value, R), (s, n) => (l(), c("div", {
      ref_key: "shell",
      ref: z,
      class: A(["game-die", { "is-hit": e.highlight }]),
      role: "img",
      "aria-label": `骰子 ${e.value} 点`
    }, [i("div", j, [i("div", {
      ref_key: "cube",
      ref: v,
      class: "game-die-cube"
    }, [(l(), c(g, null, p(a, (d) => i("div", {
      key: d.side,
      class: A(["game-die-face", [d.side, { "is-result": d.face === e.value }]])
    }, [i("div", q, [(l(!0), c(g, null, p(m(T)[d.face], ([w, _], $) => (l(), c("i", {
      key: $,
      class: "game-die-pip",
      style: P({ gridArea: `${w} / ${_}` })
    }, null, 4))), 128))])], 2)), 64))], 512)])], 10, Q));
  }
}), L = H, S = [
  "零",
  "一",
  "二",
  "三",
  "四",
  "五",
  "六",
  "七",
  "八",
  "九",
  "十"
];
function B(e) {
  return `${S[e.count] || e.count}个${S[e.face]}`;
}
function p2(e, t) {
  return e.filter((a) => a.count === t).map((a) => a.face);
}
function D(e, t) {
  return e === 1 || e === t;
}
var X = {
  key: 0,
  class: "dice-record"
}, K = { class: "game-dice-row" }, J = { class: "game-dice-row" }, W = /* @__PURE__ */ x({
  __name: "DiceRecord",
  props: { detail: {} },
  setup(e) {
    return (t, a) => e.detail.kind === "dice" ? (l(), c("div", X, [
      i("p", null, f(e.detail.finalBid.by === "player" ? "你" : "对方") + "叫" + f(m(B)(e.detail.finalBid)) + " · " + f(e.detail.challenger === "player" ? "你" : "对方") + "开盅 ", 1),
      i("p", null, " 实际有" + f(m(B)({
        count: e.detail.matchingDiceCount,
        face: e.detail.finalBid.face
      })) + "（一点百搭） ", 1),
      a[0] || (a[0] = i("span", null, "对方的骰子", -1)),
      i("div", K, [(l(!0), c(g, null, p(e.detail.dealerDice, (o, r) => (l(), E(L, {
        key: r,
        value: o,
        animate: !1,
        highlight: m(D)(o, e.detail.finalBid.face)
      }, null, 8, ["value", "highlight"]))), 128))]),
      a[1] || (a[1] = i("span", null, "你的骰子", -1)),
      i("div", J, [(l(!0), c(g, null, p(e.detail.playerDice, (o, r) => (l(), E(L, {
        key: r,
        value: o,
        animate: !1,
        highlight: m(D)(o, e.detail.finalBid.face)
      }, null, 8, ["value", "highlight"]))), 128))])
    ])) : M("", !0);
  }
}), e2 = W, t2 = { key: 0 }, a2 = /* @__PURE__ */ x({
  __name: "PushRecord",
  props: { detail: {} },
  setup(e) {
    return (t, a) => e.detail.kind === "push" ? (l(), c("p", t2, "这局找到了 " + f(e.detail.revealedCoins) + " 张金币。", 1)) : M("", !0);
  }
}), r2 = a2, l2 = {
  key: 0,
  class: "game-record-steps"
}, c2 = /* @__PURE__ */ x({
  __name: "LadderRecord",
  props: { detail: {} },
  setup(e) {
    const t = {
      safe: "稳着走",
      medium: "跨一步",
      risky: "大胆跃"
    };
    return (a, o) => e.detail.kind === "ladder" ? (l(), c("ol", l2, [(l(!0), c(g, null, p(e.detail.steps, (r) => (l(), c("li", { key: r.floor }, " 第 " + f(r.floor) + " 层 · " + f(t[r.choice]) + " · " + f(r.success ? "走过了，攒下 ¤ " + r.amountAfterStep : "没站稳"), 1))), 128))])) : M("", !0);
  }
}), i2 = c2, o2 = [
  {
    id: "dice",
    name: "大话骰",
    category: "斗智",
    tagline: "摇一摇，猜猜他敢叫几个",
    description: "你一口，我一口。不信？开盅见分晓。",
    entry: "50 小白币起",
    mark: "骰",
    tone: "jade"
  },
  {
    id: "push",
    name: "翻牌寻金",
    category: "手气",
    tagline: "再翻一张，还是见好就收",
    description: "金币已经到手，下一张会是什么？",
    entry: "每局 50 小白币",
    mark: "金",
    tone: "claret"
  },
  {
    id: "ladder",
    name: "步步登高",
    category: "闯关",
    tagline: "走稳一点，还是大胆一搏",
    description: "五层阶梯，选你的路，也选收手的时机。",
    entry: "30 小白币起",
    mark: "阶",
    tone: "amber"
  }
];
function b(e) {
  return o2.find((t) => t.id === e);
}
var s2 = {
  id: "moving",
  name: h.name,
  category: h.category,
  tagline: h.tagline,
  description: h.description,
  entry: h.entry,
  mark: h.mark,
  tone: "moving"
}, n2 = {
  id: "stacking",
  name: u.name,
  category: u.category,
  tagline: u.tagline,
  description: u.description,
  entry: u.entry,
  mark: u.mark,
  tone: "stacking"
}, C = [
  {
    ...b("dice"),
    record: e2,
    artwork: new URL("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20360%20230'%20fill='none'%3e%3cdefs%3e%3clinearGradient%20id='cup'%20x1='115'%20y1='50'%20x2='245'%20y2='140'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20stop-color='%23b4cce2'/%3e%3cstop%20offset='.5'%20stop-color='%23edf6ff'/%3e%3cstop%20offset='1'%20stop-color='%237295b4'/%3e%3c/linearGradient%3e%3clinearGradient%20id='die'%20x2='1'%20y2='1'%3e%3cstop%20stop-color='%23fff'/%3e%3cstop%20offset='1'%20stop-color='%23dce7f2'/%3e%3c/linearGradient%3e%3c/defs%3e%3cellipse%20cx='180'%20cy='190'%20rx='111'%20ry='23'%20fill='%230c6c83'%20opacity='.25'/%3e%3cg%20transform='rotate(-12%20184%20123)'%3e%3cpath%20d='M129%2057Q181%2027%20230%2057L245%20159Q183%20202%20113%20164Z'%20fill='url(%23cup)'%20stroke='%23fff'%20stroke-width='2'/%3e%3cellipse%20cx='180'%20cy='59'%20rx='51'%20ry='19'%20fill='%23bdd5e7'%20stroke='%23fff'%20stroke-width='3'/%3e%3cellipse%20cx='180'%20cy='59'%20rx='39'%20ry='12'%20fill='%23375675'/%3e%3cpath%20d='M116%20151Q183%20185%20243%20146'%20stroke='%23fff'%20stroke-width='4'/%3e%3cpath%20d='M137%2088L132%20140M146%2094L143%20145'%20stroke='%23fff'%20opacity='.3'%20stroke-width='2'/%3e%3c/g%3e%3cg%20transform='translate(232%20137)%20rotate(16)'%3e%3crect%20width='56'%20height='56'%20rx='12'%20fill='url(%23die)'%20stroke='%23fff'/%3e%3cg%20fill='%2322364d'%3e%3ccircle%20cx='16'%20cy='15'%20r='4'/%3e%3ccircle%20cx='40'%20cy='15'%20r='4'/%3e%3ccircle%20cx='16'%20cy='28'%20r='4'/%3e%3ccircle%20cx='40'%20cy='28'%20r='4'/%3e%3ccircle%20cx='16'%20cy='41'%20r='4'/%3e%3ccircle%20cx='40'%20cy='41'%20r='4'/%3e%3c/g%3e%3c/g%3e%3cg%20transform='translate(88%20164)%20rotate(-16)'%3e%3crect%20width='49'%20height='49'%20rx='11'%20fill='url(%23die)'%20stroke='%23fff'/%3e%3ccircle%20cx='24.5'%20cy='24.5'%20r='7'%20fill='%23f14260'/%3e%3c/g%3e%3cpath%20d='m282%2068%205-11m-2%2026%2014-4M90%2091l-10-7'%20stroke='%231db49c'%20stroke-width='3'%20stroke-linecap='round'/%3e%3c/svg%3e", "" + import.meta.url).href,
    load: () => import("./xiaobai-os-DiceRoom-CsVeh_Js.js")
  },
  {
    ...b("push"),
    record: r2,
    artwork: new URL("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20360%20230'%20fill='none'%3e%3cdefs%3e%3clinearGradient%20id='gold'%20x2='1'%20y2='1'%3e%3cstop%20stop-color='%23ffdf62'/%3e%3cstop%20offset='1'%20stop-color='%23ffae1a'/%3e%3c/linearGradient%3e%3c/defs%3e%3cellipse%20cx='180'%20cy='198'%20rx='106'%20ry='19'%20fill='%23302470'%20opacity='.18'/%3e%3cg%20transform='translate(85%2060)%20rotate(-17%2055%2072)'%3e%3crect%20width='110'%20height='145'%20rx='12'%20fill='%235961cc'%20stroke='%23bac8ff'%20stroke-width='3'/%3e%3crect%20x='9'%20y='9'%20width='92'%20height='127'%20rx='7'%20stroke='%23bac8ff'/%3e%3cpath%20d='m55%2033%2028%2039-28%2039-28-39Z'%20fill='%238598f0'/%3e%3cpath%20d='m55%2048%2016%2024-16%2024-16-24Z'%20stroke='%23fff'/%3e%3c/g%3e%3cg%20transform='translate(169%2039)%20rotate(13%2054%2074)'%3e%3crect%20width='110'%20height='150'%20rx='12'%20fill='%23fff'%20stroke='%23dee5ff'%20stroke-width='2'/%3e%3ccircle%20cx='55'%20cy='75'%20r='30'%20fill='url(%23gold)'%20stroke='%23eea522'%20stroke-width='3'/%3e%3ccircle%20cx='55'%20cy='75'%20r='23'%20stroke='%23fff4be'%20stroke-width='2'/%3e%3cpath%20d='m55%2055%206%2013%2014%202-10%2010%203%2015-13-7-13%207%203-15-10-10%2014-2Z'%20fill='%23cb7a00'/%3e%3cpath%20d='M13%2017h10m-5-5v10M87%20130h10m-5-5v10'%20stroke='%23ffc14d'%20stroke-width='2'/%3e%3c/g%3e%3cg%20stroke='%23eea522'%20stroke-width='2'%3e%3cellipse%20cx='262'%20cy='192'%20rx='26'%20ry='11'%20fill='%23c98712'/%3e%3cellipse%20cx='262'%20cy='186'%20rx='26'%20ry='11'%20fill='url(%23gold)'/%3e%3cellipse%20cx='247'%20cy='172'%20rx='26'%20ry='11'%20fill='url(%23gold)'/%3e%3c/g%3e%3c/svg%3e", "" + import.meta.url).href,
    load: () => import("./xiaobai-os-PushRoom-AH_R6zla.js")
  },
  {
    ...b("ladder"),
    record: i2,
    artwork: new URL("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20360%20230'%20fill='none'%3e%3cellipse%20cx='178'%20cy='201'%20rx='118'%20ry='18'%20fill='%232054a0'%20opacity='.16'/%3e%3cpath%20d='M70%20164h43v-29h43v-29h43V77h43V48h45v146H70Z'%20fill='%23549cec'/%3e%3cpath%20d='m70%20164%2019-11h43l-19%2011Zm43-29%2019-11h43l-19%2011Zm43-29%2019-11h43l-19%2011Zm43-29%2019-11h43l-19%2011Zm43-29%2019-11h45l-19%2011Z'%20fill='%23d9f0ff'/%3e%3cpath%20d='m287%2048%2019-11v146l-19%2011Z'%20fill='%23246bc8'/%3e%3cpath%20d='M70%20194h217'%20stroke='%231f5db3'%20stroke-width='3'/%3e%3ccircle%20cx='134'%20cy='107'%20r='12'%20fill='%23fff'/%3e%3cpath%20d='m129%20122-8%2014%2025%201-1-16Z'%20fill='%23fa6957'/%3e%3cpath%20d='m128%20137-9%2014m20-14%208%204m-4-17%2017-11'%20stroke='%23cc3b47'%20stroke-width='6'%20stroke-linecap='round'/%3e%3cpath%20d='m266%2014%204%207%209%202-6%207%201%208-8-4-8%204%201-8-6-7%209-2Z'%20fill='%23ffdf60'%20stroke='%23e9a31a'/%3e%3cpath%20d='m83%2057%205-10m-4%2024%2012-3m115-44%204-8'%20stroke='%235da8ed'%20stroke-width='3'%20stroke-linecap='round'/%3e%3c/svg%3e", "" + import.meta.url).href,
    load: () => import("./xiaobai-os-LadderRoom-XKAGIHtx.js")
  }
];
function g2(e) {
  return C.find((t) => t.id === e);
}
var d2 = [
  {
    ...n2,
    mode: "standalone",
    artwork: new URL("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20720%20440'%3e%3cdefs%3e%3clinearGradient%20id='s'%20x2='0'%20y2='1'%3e%3cstop%20stop-color='%238ecbdd'/%3e%3cstop%20offset='1'%20stop-color='%23e6f5f3'/%3e%3c/linearGradient%3e%3c/defs%3e%3crect%20width='720'%20height='440'%20rx='24'%20fill='url(%23s)'/%3e%3cg%20fill='%23fff'%20opacity='.8'%3e%3cellipse%20cx='160'%20cy='387'%20rx='200'%20ry='56'/%3e%3cellipse%20cx='620'%20cy='377'%20rx='240'%20ry='80'/%3e%3c/g%3e%3cg%20stroke='%23faf6ef'%20stroke-width='12'%20stroke-linejoin='round'%3e%3cpath%20fill='%23eac5ab'%20d='M239%20335V240h173v95z'/%3e%3cpath%20fill='%23c4d9e6'%20d='M280%20231v-88h120v88z'/%3e%3cpath%20fill='%23d8bdda'%20d='M247%20135V61h148v74z'/%3e%3cpath%20fill='%23c5d5bd'%20d='M316%20144h116v43H316z'/%3e%3c/g%3e%3cg%20fill='%23ffe8a0'%3e%3crect%20x='270'%20y='265'%20width='30'%20height='38'%20rx='8'/%3e%3crect%20x='344'%20y='265'%20width='30'%20height='38'%20rx='8'/%3e%3crect%20x='313'%20y='166'%20width='34'%20height='35'%20rx='8'/%3e%3crect%20x='277'%20y='86'%20width='32'%20height='26'%20rx='7'/%3e%3c/g%3e%3cpath%20d='M117%2040h457M430%2040v62'%20fill='none'%20stroke='%23dba36b'%20stroke-width='12'%20stroke-linecap='round'/%3e%3cpath%20d='M421%20101q9%2022%2022%200'%20fill='none'%20stroke='%23738d99'%20stroke-width='6'/%3e%3cellipse%20cx='325'%20cy='350'%20rx='149'%20ry='22'%20fill='%23f9f7ef'/%3e%3c/svg%3e", "" + import.meta.url).href,
    load: () => import("./xiaobai-os-StackingRoom-Bd8WVNI0.js")
  },
  {
    ...s2,
    mode: "standalone",
    artwork: new URL("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20320%20270'%3e%3crect%20width='320'%20height='270'%20rx='24'%20fill='%23e1eee8'/%3e%3cellipse%20cx='162'%20cy='231'%20rx='122'%20ry='20'%20fill='%23bbd1c6'/%3e%3cpath%20d='m35%20172%20123-68%20125%2070-123%2073z'%20fill='%2382b4a6'/%3e%3cpath%20d='m35%20159%20123-68%20125%2070-123%2073z'%20fill='%23fff0d7'/%3e%3cpath%20d='M35%20159V61l123-35v99z'%20fill='%23cae3d7'/%3e%3cpath%20d='M158%2026%20283%2093v68l-125-36z'%20fill='%23deece3'/%3e%3cpath%20d='m182%2060%2053%2027v39l-53-19z'%20fill='%23fff8ea'/%3e%3cpath%20d='m189%2071%2039%2020v26l-39-14z'%20fill='%23a8d2df'/%3e%3cpath%20d='m209%2082v29m-20-19%2039%2016'%20stroke='%23fff8ea'%20stroke-width='4'/%3e%3cpath%20d='m63%20152%2072-31%2040%2020-72%2037z'%20fill='%23f4aeb8'/%3e%3cpath%20d='m63%20152v-30l72-30v29z'%20fill='%23e49ca9'/%3e%3cpath%20d='m64%20154%2040%2023v19l-40-23zm40%2023%2071-36v19l-71%2036z'%20fill='%23edbdc6'/%3e%3cpath%20d='m187%20153%2042-17%2034%2019-42%2019z'%20fill='%23f6d4a2'/%3e%3cpath%20d='m187%20153v39l34%2019v-37zm34%2021%2042-19v37l-42%2019z'%20fill='%23e3b77f'/%3e%3cpath%20d='m237%20174%2013-6'%20stroke='%23fff1d4'%20stroke-width='4'%20stroke-linecap='round'/%3e%3cg%20transform='translate(175%20200)'%3e%3cellipse%20rx='17'%20ry='6'%20fill='%2377bba8'/%3e%3cpath%20d='M-9-3a9%209%200%200%201%2018%200'%20fill='%23b5e5e6'/%3e%3cpath%20d='M-14%200q14%208%2028%200'%20fill='none'%20stroke='%23f8e3a2'%20stroke-width='2'/%3e%3c/g%3e%3c/svg%3e", "" + import.meta.url).href,
    load: () => import("./xiaobai-os-MovingRoom-B-RjP0a3.js")
  },
  ...C.map((e) => ({
    ...e,
    mode: "wager"
  }))
];
function v2(e) {
  return d2.find((t) => t.id === e);
}
export {
  p2 as a,
  L as c,
  b as i,
  m2 as l,
  v2 as n,
  B as o,
  g2 as r,
  D as s,
  d2 as t
};
