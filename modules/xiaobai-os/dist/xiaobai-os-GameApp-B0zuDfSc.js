/* eslint-disable */
import { B as n, C as X, I as Ce, L as F, P as D, R as S, S as ee, T, a as se, b as De, c as Ge, d as e, f as O, g as Ae, j as ue, k as z, l as E, m as r, p as G, u as _, v as x, w as i, z as J } from "./xiaobai-os-runtime-dom.esm-bundler-DQLnRQQ3.js";
var Be = { class: "game-dialog-card" }, _e = { class: "game-dialog-actions" }, Re = /* @__PURE__ */ x({
  __name: "GameActionDialog",
  props: {
    heading: {},
    summary: {},
    confirmLabel: {},
    danger: { type: Boolean }
  },
  emits: ["cancel", "confirm"],
  setup(t) {
    return (A, s) => (i(), r("dialog", {
      open: "",
      class: "game-dialog",
      onCancel: s[2] || (s[2] = Ge((l) => A.$emit("cancel"), ["prevent"]))
    }, [e("section", Be, [
      s[3] || (s[3] = e("span", { class: "game-eyebrow" }, "FINAL CALL", -1)),
      e("h2", null, n(t.heading), 1),
      e("p", null, n(t.summary), 1),
      e("div", _e, [e("button", {
        type: "button",
        onClick: s[0] || (s[0] = (l) => A.$emit("cancel"))
      }, "再想想"), e("button", {
        type: "button",
        class: S(["is-primary", { "is-danger": t.danger }]),
        onClick: s[1] || (s[1] = (l) => A.$emit("confirm"))
      }, n(t.confirmLabel), 3)])
    ])], 32));
  }
}), Me = Re, Le = {
  class: "game-table game-dice-commit",
  "aria-labelledby": "game-dice-commit-title"
}, Se = {
  class: "game-reveal-cloth game-commit-cloth",
  role: "status",
  "aria-live": "polite"
}, Ee = { class: "game-reveal-call" }, Te = {
  class: "game-commit-dice",
  "aria-hidden": "true"
}, Ie = /* @__PURE__ */ x({
  __name: "GameDiceCommit",
  props: { finalBid: {} },
  setup(t) {
    const A = Object.freeze(Array.from({ length: 10 }, (s, l) => l));
    return (s, l) => (i(), r("section", Le, [l[2] || (l[2] = e("header", { class: "game-table-heading game-reveal-heading" }, [e("div", null, [e("span", null, "SHOWDOWN"), e("h2", { id: "game-dice-commit-title" }, "正在开骰")])], -1)), e("div", Se, [
      e("div", Ee, [e("span", null, "最终叫牌 · " + n(t.finalBid.by === "player" ? "你" : "庄家"), 1), e("strong", null, n(t.finalBid.count) + " 枚 " + n(t.finalBid.face) + " 点", 1)]),
      e("div", Te, [(i(!0), r(E, null, T(F(A), (c) => (i(), r("i", {
        key: c,
        style: J({ "--game-commit-delay": `${c % 5 * 55}ms` })
      }, null, 4))), 128))]),
      l[0] || (l[0] = e("div", { class: "game-commit-status" }, [e("span", {
        class: "game-commit-pulse",
        "aria-hidden": "true"
      }), e("p", null, [e("strong", null, "骰盅已揭开"), e("small", null, "正在确认本局与账本保存结果")])], -1)),
      l[1] || (l[1] = e("p", { class: "game-commit-note" }, "保存确认前不会展示骰面或输赢。", -1))
    ])]));
  }
}), Oe = Ie, re = {
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
var xe = 80, Fe = 180, Pe = 200;
function Ue(t) {
  const A = Math.max(0, t - 1) * 45 + 720 + xe, s = A + Fe;
  return {
    countAt: A,
    verdictAt: s,
    settledAt: s + Pe
  };
}
var Ne = ["aria-label"], ze = { class: "game-die-stage" }, He = { class: "game-die-pips" }, Ye = /* @__PURE__ */ x({
  __name: "GameDie",
  props: {
    value: {},
    delay: { default: 0 },
    highlight: {
      type: Boolean,
      default: !1
    }
  },
  setup(t) {
    const A = t, s = [
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
    ], l = {
      1: [0, 0],
      2: [90, 180],
      3: [0, -90],
      4: [0, 90],
      5: [-90, 0],
      6: [180, 0]
    };
    function c(k, R) {
      return `rotateX(${k}deg) rotateY(${R}deg)`;
    }
    function o() {
      return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    const g = D(null), w = D(null);
    let y = null, f = null;
    function M() {
      const [k, R] = l[A.value];
      g.value && (g.value.style.transform = c(k, R));
    }
    function v() {
      const k = g.value;
      if (!k) return;
      if (y?.cancel(), f?.cancel(), y = null, f = null, o() || typeof k.animate != "function") {
        M();
        return;
      }
      const [R, C] = l[A.value], L = 360 * (2 + Math.floor(Math.random() * 2)) + 146, $ = 360 * (1 + Math.floor(Math.random() * 2)) + 101;
      y = k.animate([
        {
          transform: c(R - L, C - $),
          easing: "cubic-bezier(.11,.58,.32,1)"
        },
        {
          transform: c(R + 13, C + 9),
          offset: 0.84,
          easing: "cubic-bezier(.36,0,.4,1)"
        },
        { transform: c(R, C) }
      ], {
        duration: 720,
        delay: A.delay,
        fill: "both"
      }), f = w.value?.animate([
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
        delay: A.delay,
        fill: "both"
      }) ?? null;
    }
    return ee(v), X(() => {
      y?.cancel(), f?.cancel();
    }), z(() => A.value, v), (k, R) => (i(), r("div", {
      ref_key: "shell",
      ref: w,
      class: S(["game-die", { "is-hit": t.highlight }]),
      role: "img",
      "aria-label": `骰子 ${t.value} 点`
    }, [e("div", ze, [e("div", {
      ref_key: "cube",
      ref: g,
      class: "game-die-cube"
    }, [(i(), r(E, null, T(s, (C) => e("div", {
      key: C.side,
      class: S(["game-die-face", [C.side, { "is-result": C.face === t.value }]])
    }, [e("div", He, [(i(!0), r(E, null, T(F(re)[C.face], ([L, $], b) => (i(), r("i", {
      key: b,
      class: "game-die-pip",
      style: J({ gridArea: `${L} / ${$}` })
    }, null, 4))), 128))])], 2)), 64))], 512)])], 10, Ne));
  }
}), Z = Ye, je = {
  class: "game-table game-dice-table",
  "aria-labelledby": "game-dice-title"
}, Ve = { class: "game-table-heading" }, We = { class: "game-dice-cloth" }, qe = { class: "game-dealer-position" }, Xe = {
  key: 0,
  class: "game-current-bid"
}, Je = {
  key: 1,
  class: "game-current-bid is-empty"
}, Qe = { class: "game-player-hand" }, Ke = { class: "game-dice-row" }, Ze = {
  key: 0,
  class: "game-bid-builder"
}, ea = {
  class: "game-bid-count",
  role: "group",
  "aria-label": "叫牌数量"
}, aa = ["disabled"], la = ["disabled"], ta = {
  class: "game-bid-faces",
  role: "group",
  "aria-label": "叫牌点数"
}, na = [
  "disabled",
  "aria-pressed",
  "aria-label",
  "onClick"
], ia = { class: "game-face-pips" }, sa = { class: "game-dice-controls" }, ua = ["disabled", "title"], ra = ["disabled", "title"], oa = ["disabled", "title"], da = {
  key: 1,
  class: "game-bid-history",
  "aria-label": "公开叫牌记录"
}, va = /* @__PURE__ */ x({
  __name: "GameDiceGame",
  props: {
    game: {},
    writeDisabledReason: {}
  },
  emits: [
    "bid",
    "challenge",
    "lobby"
  ],
  setup(t, { emit: A }) {
    const s = t, l = A, c = [
      2,
      3,
      4,
      5,
      6
    ], o = s.game.legalBids[0] || {
      count: 1,
      face: 2
    }, g = D(o.count), w = D(o.face), y = _(() => s.game.bids.at(-1) || null), f = _(() => s.game.legalBids[0] || null), M = _(() => {
      const $ = s.game.legalBids.map((b) => b.count);
      return $.length === 0 ? {
        min: 1,
        max: 10
      } : {
        min: Math.min(...$),
        max: Math.max(...$)
      };
    }), v = _(() => s.game.legalBids.find(($) => $.count === g.value && $.face === w.value) || null);
    function k($) {
      return s.game.legalBids.some((b) => b.face === $);
    }
    function R($) {
      const b = g.value + $, { min: m, max: d } = M.value;
      b >= m && b <= d && (g.value = b);
    }
    z(() => M.value.min, ($) => {
      g.value < $ && (g.value = $);
    });
    function C() {
      v.value && !s.writeDisabledReason && l("bid", {
        count: v.value.count,
        face: v.value.face
      });
    }
    function L() {
      const $ = f.value;
      $ && !s.writeDisabledReason && (g.value = $.count, w.value = $.face, l("bid", {
        count: $.count,
        face: $.face
      }));
    }
    return ($, b) => (i(), r("section", je, [
      e("header", Ve, [
        e("button", {
          type: "button",
          class: "game-back",
          onClick: b[0] || (b[0] = (m) => l("lobby"))
        }, "返回大厅"),
        b[4] || (b[4] = e("div", null, [e("span", null, "LIAR'S DICE"), e("h2", { id: "game-dice-title" }, "秘骰对决")], -1)),
        e("strong", null, "托管 ¤ " + n(t.game.bet), 1)
      ]),
      e("div", We, [
        e("div", qe, [b[5] || (b[5] = e("span", {
          class: "game-dealer-chip",
          "aria-hidden": "true"
        }, "庄", -1)), e("p", null, n(y.value?.by === "dealer" ? "庄家已经加叫，轮到你决断。" : "庄家静候你的第一口价。"), 1)]),
        y.value ? (i(), r("div", Xe, [
          b[6] || (b[6] = e("small", null, "桌面叫数", -1)),
          e("strong", null, n(y.value.count), 1),
          e("span", null, "枚 " + n(y.value.face) + " 点", 1),
          e("em", null, n(y.value.by === "dealer" ? "庄家" : "你") + "叫牌", 1)
        ])) : (i(), r("div", Je, [...b[7] || (b[7] = [e("span", null, "等待首轮叫牌", -1)])])),
        e("div", Qe, [
          b[8] || (b[8] = e("span", null, "你的骰子", -1)),
          e("div", Ke, [(i(!0), r(E, null, T(t.game.playerDice, (m, d) => (i(), O(Z, {
            key: d,
            value: m,
            delay: d * F(45)
          }, null, 8, ["value", "delay"]))), 128))]),
          b[9] || (b[9] = e("small", null, "一点可代替任意叫面", -1))
        ])
      ]),
      t.game.legalActions.includes("bid") ? (i(), r("div", Ze, [e("div", ea, [
        e("button", {
          type: "button",
          disabled: !!t.writeDisabledReason || g.value <= M.value.min,
          "aria-label": "减少数量",
          onClick: b[1] || (b[1] = (m) => R(-1))
        }, " − ", 8, aa),
        e("strong", null, n(g.value), 1),
        e("button", {
          type: "button",
          disabled: !!t.writeDisabledReason || g.value >= M.value.max,
          "aria-label": "增加数量",
          onClick: b[2] || (b[2] = (m) => R(1))
        }, " + ", 8, la),
        b[10] || (b[10] = e("small", null, "枚", -1))
      ]), e("div", ta, [(i(), r(E, null, T(c, (m) => e("button", {
        key: m,
        type: "button",
        class: S(["game-face-chip", { "is-active": m === w.value }]),
        disabled: !!t.writeDisabledReason || !k(m),
        "aria-pressed": m === w.value,
        "aria-label": `${m} 点`,
        onClick: (d) => w.value = m
      }, [e("span", ia, [(i(!0), r(E, null, T(F(re)[m], ([d, h], B) => (i(), r("i", {
        key: B,
        style: J({ gridArea: `${d} / ${h}` })
      }, null, 4))), 128))])], 10, na)), 64))])])) : G("", !0),
      e("div", sa, [
        t.game.legalActions.includes("bid") && f.value ? (i(), r("button", {
          key: 0,
          type: "button",
          class: "game-table-button game-min-raise",
          disabled: !!t.writeDisabledReason,
          title: t.writeDisabledReason,
          onClick: L
        }, " 最小加叫 " + n(f.value.count) + " × " + n(f.value.face), 9, ua)) : G("", !0),
        t.game.legalActions.includes("bid") ? (i(), r("button", {
          key: 1,
          type: "button",
          class: "game-primary-action",
          disabled: !!t.writeDisabledReason || !v.value,
          title: v.value ? t.writeDisabledReason : "这口叫数不高于桌面叫数",
          onClick: C
        }, " 加叫 " + n(g.value) + " × " + n(w.value), 9, ra)) : G("", !0),
        t.game.legalActions.includes("challenge") ? (i(), r("button", {
          key: 2,
          type: "button",
          class: "game-danger-action",
          disabled: !!t.writeDisabledReason,
          title: t.writeDisabledReason,
          onClick: b[3] || (b[3] = (m) => l("challenge"))
        }, " 开骰 ", 8, oa)) : G("", !0)
      ]),
      t.game.bids.length ? (i(), r("ol", da, [(i(!0), r(E, null, T(t.game.bids, (m, d) => (i(), r("li", { key: `${d}:${m.count}:${m.face}` }, [e("span", null, n(m.by === "player" ? "你" : "庄家"), 1), e("strong", null, n(m.count) + " × " + n(m.face) + " 点", 1)]))), 128))])) : G("", !0)
    ]));
  }
}), ma = va, ca = {
  class: "game-table game-dice-reveal",
  "aria-labelledby": "game-reveal-title"
}, ga = { class: "game-reveal-call" }, ba = { class: "game-reveal-side" }, fa = { class: "game-dice-row" }, ya = { class: "game-reveal-side" }, pa = { class: "game-dice-row" }, ha = {
  key: 0,
  class: "game-reveal-tally"
}, ka = { class: "game-reveal-balance" }, $a = {
  key: 0,
  class: "game-reveal-actions"
}, wa = {
  key: 1,
  class: "game-reveal-hint"
}, Ca = /* @__PURE__ */ x({
  __name: "GameDiceReveal",
  props: {
    record: {},
    detail: {},
    balanceAfter: {}
  },
  emits: ["done"],
  setup(t, { emit: A }) {
    const s = t, l = A, c = [
      "rolling",
      "counting",
      "verdict",
      "settled"
    ], o = D("rolling"), g = [];
    function w(b) {
      return c.indexOf(o.value) >= c.indexOf(b);
    }
    function y() {
      for (; g.length > 0; ) {
        const b = g.pop();
        b !== void 0 && window.clearTimeout(b);
      }
    }
    function f() {
      y(), o.value = "settled";
    }
    function M() {
      return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    function v(b) {
      return b === 1 || b === s.detail.finalBid.face;
    }
    const k = _(() => s.detail.matchingDiceCount >= s.detail.finalBid.count), R = _(() => s.detail.challenger === "player" ? "你" : "庄家"), C = _(() => s.detail.finalBid.by === "player" ? "你" : "庄家"), L = _(() => s.record.outcome === "player-win" ? "你赢了" : "你输了"), $ = _(() => `${s.record.net > 0 ? "+" : ""}${s.record.net} 小白币`);
    return ee(() => {
      if (typeof window > "u" || M()) {
        o.value = "settled";
        return;
      }
      const b = Ue(Math.max(s.detail.dealerDice.length, s.detail.playerDice.length));
      g.push(window.setTimeout(() => {
        o.value = "counting";
      }, b.countAt)), g.push(window.setTimeout(() => {
        o.value = "verdict";
      }, b.verdictAt)), g.push(window.setTimeout(() => {
        o.value = "settled";
      }, b.settledAt));
    }), X(y), (b, m) => (i(), r("section", ca, [
      m[5] || (m[5] = e("header", { class: "game-table-heading game-reveal-heading" }, [e("div", null, [e("span", null, "SHOWDOWN"), e("h2", { id: "game-reveal-title" }, "开骰")])], -1)),
      e("div", {
        class: "game-reveal-cloth",
        onClick: f
      }, [
        e("div", ga, [e("span", null, "最终叫牌 · " + n(C.value), 1), e("strong", null, n(t.detail.finalBid.count) + " 枚 " + n(t.detail.finalBid.face) + " 点", 1)]),
        e("div", ba, [m[1] || (m[1] = e("span", null, "庄家", -1)), e("div", fa, [(i(!0), r(E, null, T(t.detail.dealerDice, (d, h) => (i(), O(Z, {
          key: `dealer:${h}`,
          value: d,
          delay: h * F(45),
          highlight: w("counting") && v(d)
        }, null, 8, [
          "value",
          "delay",
          "highlight"
        ]))), 128))])]),
        e("div", ya, [m[2] || (m[2] = e("span", null, "你", -1)), e("div", pa, [(i(!0), r(E, null, T(t.detail.playerDice, (d, h) => (i(), O(Z, {
          key: `player:${h}`,
          value: d,
          delay: h * F(45),
          highlight: w("counting") && v(d)
        }, null, 8, [
          "value",
          "delay",
          "highlight"
        ]))), 128))])]),
        w("counting") ? (i(), r("p", ha, [
          e("span", null, "实际开出（" + n(t.detail.finalBid.face) + " 点及 1 点）", 1),
          e("strong", null, n(t.detail.matchingDiceCount), 1),
          m[3] || (m[3] = e("span", null, "枚", -1))
        ])) : G("", !0),
        w("verdict") ? (i(), r("div", {
          key: 1,
          class: S(["game-reveal-verdict", `is-${t.record.outcomeTone}`]),
          role: "status",
          "aria-live": "polite"
        }, [
          m[4] || (m[4] = e("small", null, "本局结果", -1)),
          e("div", null, [e("strong", null, n(L.value), 1), e("em", null, n($.value), 1)]),
          e("p", null, " 实际 " + n(t.detail.matchingDiceCount) + " 枚 " + n(k.value ? "≥" : "<") + " 叫牌 " + n(t.detail.finalBid.count) + " 枚； " + n(R.value) + "开骰，" + n(C.value) + "的叫牌" + n(k.value ? "成立" : "不成立") + "。 ", 1),
          e("small", ka, "当前余额 · ¤ " + n(t.balanceAfter), 1)
        ], 2)) : G("", !0)
      ]),
      w("settled") ? (i(), r("div", $a, [e("button", {
        type: "button",
        class: "game-primary-action",
        onClick: m[0] || (m[0] = (d) => l("done"))
      }, "回到大厅")])) : (i(), r("p", wa, "点击牌桌跳过"))
    ]));
  }
}), Da = Ca, Ga = {
  class: "game-table game-ladder-table",
  "aria-labelledby": "game-ladder-title"
}, Aa = { class: "game-table-heading" }, Ba = { class: "game-ladder-stage" }, _a = {
  class: "game-ladder-track",
  "aria-label": "五层挑战进度"
}, Ra = { key: 0 }, Ma = { key: 1 }, La = { class: "game-ladder-purse" }, Sa = {
  key: 0,
  class: "game-ladder-settling",
  role: "status"
}, Ea = {
  key: 2,
  class: "game-ladder-settling",
  role: "status"
}, Ta = {
  key: 0,
  class: "game-ladder-choices"
}, Ia = [
  "disabled",
  "title",
  "onClick"
], Oa = ["disabled", "title"], xa = 720, Fa = 620, Pa = /* @__PURE__ */ x({
  __name: "GameLadderGame",
  props: {
    game: {},
    writeDisabledReason: {},
    ending: {},
    stepping: { type: Boolean }
  },
  emits: [
    "step",
    "cashOut",
    "lobby",
    "finished"
  ],
  setup(t, { emit: A }) {
    const s = t, l = A, c = Object.freeze({
      safe: {
        name: "稳",
        note: "守住筹码"
      },
      medium: {
        name: "中",
        note: "均衡一搏"
      },
      risky: {
        name: "险",
        note: "追逐高筹"
      }
    }), o = D(s.game.completedFloors), g = D(s.game.cashoutAmount), w = D(s.game.canCashOut), y = D(0), f = D(null), M = [];
    function v() {
      return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    function k() {
      for (; M.length > 0; ) {
        const d = M.pop();
        d !== void 0 && window.clearTimeout(d);
      }
    }
    function R(d, h) {
      if (k(), y.value = o.value + 1, f.value = null, v() || typeof window > "u") {
        f.value = d, h();
        return;
      }
      M.push(window.setTimeout(() => {
        f.value = d, h(), d === "rise" && !s.ending && M.push(window.setTimeout(() => {
          y.value = 0, f.value = null;
        }, Fa));
      }, xa));
    }
    z(() => s.game.completedFloors, (d, h) => {
      if (d > h) {
        R("rise", () => {
          o.value = d, g.value = s.game.cashoutAmount, w.value = s.game.canCashOut;
        });
        return;
      }
      o.value = d, g.value = s.game.cashoutAmount, w.value = s.game.canCashOut;
    }), z(() => s.ending, (d) => {
      if (!d || d.detail.kind !== "ladder") return;
      const h = d.detail.steps.at(-1);
      h && R(h.success ? "rise" : "fall", () => {
        h.success && (o.value = h.floor, g.value = h.amountAfterStep);
      });
    }, { immediate: !0 });
    const C = _(() => y.value > 0 && f.value === null), L = _(() => !!s.ending && (f.value !== null || y.value === 0)), $ = _(() => !!s.writeDisabledReason || !!s.ending || y.value > 0 || s.stepping);
    function b(d) {
      return {
        "is-complete": d <= o.value,
        "is-next": d === o.value + 1 && y.value === 0,
        "is-waiting": s.stepping && d === o.value + 1,
        "is-judging": d === y.value && f.value === null,
        "is-risen": d === y.value && f.value === "rise",
        "is-fallen": d === y.value && f.value === "fall"
      };
    }
    function m(d) {
      return `${d / 100}%`;
    }
    return X(k), (d, h) => (i(), r("section", Ga, [
      e("header", Aa, [
        e("button", {
          type: "button",
          class: "game-back",
          onClick: h[0] || (h[0] = (B) => l("lobby"))
        }, "返回大厅"),
        h[3] || (h[3] = e("div", null, [e("span", null, "THE GILDED ASCENT"), e("h2", { id: "game-ladder-title" }, "鎏金阶梯")], -1)),
        e("strong", null, "托管 ¤ " + n(t.game.bet), 1)
      ]),
      e("div", Ba, [e("div", _a, [(i(), r(E, null, T(5, (B) => e("div", {
        key: B,
        class: S(["game-ladder-floor", b(B)])
      }, [e("span", null, n(B), 1), t.game.steps[B - 1] && B <= o.value ? (i(), r("small", Ra, " ¤ " + n(t.game.steps[B - 1]?.amountAfterSuccess), 1)) : (i(), r("small", Ma, "第 " + n(B) + " 层", 1))], 2)), 64))]), e("div", La, [
        e("span", null, n(w.value ? "当前可收手" : "风险起点"), 1),
        e("strong", null, "¤ " + n(g.value), 1),
        e("small", null, "已完成 " + n(o.value) + " / 5 层", 1)
      ])]),
      t.stepping ? (i(), r("p", Sa, "正在踏上第 " + n(o.value + 1) + " 层并确认落账…", 1)) : L.value && t.ending ? (i(), r("div", {
        key: 1,
        class: S(["game-reveal-outcome", `is-${t.ending.outcomeTone}`])
      }, [
        e("strong", null, n(t.ending.outcomeLabel), 1),
        e("em", null, n(t.ending.net > 0 ? "+" : "") + n(t.ending.net) + " 小白币", 1),
        e("button", {
          type: "button",
          class: "game-primary-action",
          onClick: h[1] || (h[1] = (B) => l("finished"))
        }, "回到大厅")
      ], 2)) : C.value ? (i(), r("p", Ea, "正在判定第 " + n(y.value) + " 层…", 1)) : t.ending ? G("", !0) : (i(), r(E, { key: 3 }, [t.game.legalActions.includes("step") ? (i(), r("div", Ta, [(i(!0), r(E, null, T(t.game.nextChoices, (B) => (i(), r("button", {
        key: B.choice,
        type: "button",
        class: S(`is-${B.choice}`),
        disabled: $.value,
        title: t.writeDisabledReason,
        onClick: (Q) => l("step", B.choice)
      }, [
        e("span", null, n(F(c)[B.choice].name), 1),
        e("small", null, n(F(c)[B.choice].note), 1),
        e("strong", null, n(m(B.successProbabilityBps)), 1),
        e("em", null, "成功得 ¤ " + n(B.successAmount), 1)
      ], 10, Ia))), 128))])) : G("", !0), t.game.legalActions.includes("cash-out") ? (i(), r("button", {
        key: 1,
        type: "button",
        class: "game-ladder-cashout",
        disabled: $.value,
        title: t.writeDisabledReason,
        onClick: h[2] || (h[2] = (B) => l("cashOut"))
      }, " 收手并领取 ¤ " + n(g.value), 9, Oa)) : G("", !0)], 64))
    ]));
  }
}), Ua = Pa, Na = {
  class: "game-lobby",
  "aria-labelledby": "game-lobby-title"
}, za = {
  key: 0,
  class: "game-continue-card"
}, Ha = {
  key: 1,
  class: "game-grid"
}, Ya = { class: "game-card is-dice" }, ja = { class: "game-bet-field" }, Va = ["disabled", "title"], Wa = {
  key: 0,
  class: "game-card-reason"
}, qa = { class: "game-card is-push" }, Xa = ["disabled", "title"], Ja = {
  key: 0,
  class: "game-card-reason"
}, Qa = { class: "game-card is-ladder" }, Ka = { class: "game-bet-field" }, Za = ["disabled", "title"], el = {
  key: 0,
  class: "game-card-reason"
}, al = /* @__PURE__ */ x({
  __name: "GameLobby",
  props: {
    activeGame: {},
    balance: {},
    lockedAmount: {},
    writeDisabledReason: {}
  },
  emits: ["start", "continue"],
  setup(t, { emit: A }) {
    const s = t, l = A, c = D(50), o = D(30), g = _(() => s.activeGame?.kind === "dice" ? "秘骰对决" : s.activeGame?.kind === "push" ? "翻倍或收手" : s.activeGame?.kind === "ladder" ? "鎏金阶梯" : "");
    function w() {
      return s.writeDisabledReason ? s.writeDisabledReason : !Number.isSafeInteger(c.value) || c.value < 50 || c.value > 500 || c.value % 10 !== 0 ? "下注须为 50 至 500，且为 10 的倍数" : s.balance < c.value ? "余额不足" : "";
    }
    function y() {
      return s.writeDisabledReason ? s.writeDisabledReason : s.balance < 50 ? "余额不足" : "";
    }
    function f() {
      return s.writeDisabledReason ? s.writeDisabledReason : !Number.isSafeInteger(o.value) || o.value < 30 || o.value > 800 || o.value % 10 !== 0 ? "下注须为 30 至 800，且为 10 的倍数" : s.balance < o.value ? "余额不足" : "";
    }
    return (M, v) => (i(), r("section", Na, [v[17] || (v[17] = e("div", { class: "game-lobby-hero" }, [
      e("span", { class: "game-eyebrow" }, "THE GILDED PARLOUR"),
      e("h2", { id: "game-lobby-title" }, "今夜，押注你的判断"),
      e("p", null, "三张独立牌桌，只认明确选择。每一步都会先落账，再揭晓。")
    ], -1)), t.activeGame ? (i(), r("article", za, [
      v[7] || (v[7] = e("div", {
        class: "game-continue-seal",
        "aria-hidden": "true"
      }, "续", -1)),
      e("div", null, [
        v[6] || (v[6] = e("span", null, "牌桌仍在等候", -1)),
        e("h3", null, n(g.value), 1),
        e("p", null, "已有 ¤ " + n(t.lockedAmount) + " 托管在本局，离开页面不会结束赌局。", 1)
      ]),
      e("button", {
        type: "button",
        onClick: v[0] || (v[0] = (k) => l("continue", t.activeGame.kind))
      }, "继续本局")
    ])) : (i(), r("div", Ha, [
      e("article", Ya, [
        v[9] || (v[9] = e("div", {
          class: "game-glyph",
          "aria-hidden": "true"
        }, [e("span", null, "⚄"), e("span", null, "⚂")], -1)),
        v[10] || (v[10] = e("div", { class: "game-copy" }, [
          e("span", { class: "game-card-index" }, "TABLE 01"),
          e("h3", null, "秘骰对决"),
          e("p", null, "五骰藏锋，一点为百搭。抬高叫数，或当场开骰验牌。"),
          e("ul", null, [e("li", null, "下注 50–500"), e("li", null, "胜出返还 1.8 倍")])
        ], -1)),
        e("label", ja, [v[8] || (v[8] = e("span", null, "下注", -1)), ue(e("input", {
          "onUpdate:modelValue": v[1] || (v[1] = (k) => c.value = k),
          type: "number",
          min: "50",
          max: "500",
          step: "10"
        }, null, 512), [[
          se,
          c.value,
          void 0,
          { number: !0 }
        ]])]),
        e("button", {
          type: "button",
          class: "game-table-button",
          disabled: !!w(),
          title: w(),
          onClick: v[2] || (v[2] = (k) => l("start", "dice", c.value))
        }, " 入席 ", 8, Va),
        w() ? (i(), r("small", Wa, n(w()), 1)) : G("", !0)
      ]),
      e("article", qa, [
        v[11] || (v[11] = e("div", {
          class: "game-glyph is-coin",
          "aria-hidden": "true"
        }, "¤", -1)),
        v[12] || (v[12] = e("div", { class: "game-copy" }, [
          e("span", { class: "game-card-index" }, "TABLE 02"),
          e("h3", null, "翻倍或收手"),
          e("p", null, "十张暗牌藏着七枚金币与三枚炸弹。每次翻牌都更接近答案。"),
          e("ul", null, [e("li", null, "固定下注 50"), e("li", null, "每枚金币价值 50")])
        ], -1)),
        v[13] || (v[13] = e("div", { class: "game-fixed-bet" }, [e("span", null, "入场"), e("strong", null, "¤ 50")], -1)),
        e("button", {
          type: "button",
          class: "game-table-button",
          disabled: !!y(),
          title: y(),
          onClick: v[3] || (v[3] = (k) => l("start", "push", 50))
        }, " 揭牌 ", 8, Xa),
        y() ? (i(), r("small", Ja, n(y()), 1)) : G("", !0)
      ]),
      e("article", Qa, [
        v[15] || (v[15] = e("div", {
          class: "game-glyph is-ladder-mark",
          "aria-hidden": "true"
        }, "Ⅴ", -1)),
        v[16] || (v[16] = e("div", { class: "game-copy" }, [
          e("span", { class: "game-card-index" }, "TABLE 03"),
          e("h3", null, "鎏金阶梯"),
          e("p", null, "五层风险逐级累积。每层选择稳、中、险，成功后可随时收手。"),
          e("ul", null, [e("li", null, "下注 30–800"), e("li", null, "最高返还 50,000")])
        ], -1)),
        e("label", Ka, [v[14] || (v[14] = e("span", null, "下注", -1)), ue(e("input", {
          "onUpdate:modelValue": v[4] || (v[4] = (k) => o.value = k),
          type: "number",
          min: "30",
          max: "800",
          step: "10"
        }, null, 512), [[
          se,
          o.value,
          void 0,
          { number: !0 }
        ]])]),
        e("button", {
          type: "button",
          class: "game-table-button",
          disabled: !!f(),
          title: f(),
          onClick: v[5] || (v[5] = (k) => l("start", "ladder", o.value))
        }, " 登阶 ", 8, Za),
        f() ? (i(), r("small", el, n(f()), 1)) : G("", !0)
      ])
    ]))]));
  }
}), ll = al, tl = {
  class: "game-table game-push-table",
  "aria-labelledby": "game-push-title"
}, nl = { class: "game-table-heading" }, il = { class: "game-push-stage" }, sl = { class: "game-flip-card" }, ul = {
  class: "game-coin-stack",
  "aria-label": "已翻出的金币"
}, rl = {
  key: 0,
  class: "game-empty-stack"
}, ol = {
  class: "game-card-fan",
  "aria-hidden": "true"
}, dl = { class: "game-push-metrics" }, vl = {
  key: 0,
  class: "game-pending-verdict",
  role: "status"
}, ml = {
  key: 2,
  class: "game-actions"
}, cl = ["disabled", "title"], gl = ["disabled", "title"], bl = 660, fl = /* @__PURE__ */ x({
  __name: "GamePushGame",
  props: {
    game: {},
    writeDisabledReason: {},
    ending: {},
    drawing: { type: Boolean }
  },
  emits: [
    "draw",
    "cashOut",
    "lobby",
    "finished"
  ],
  setup(t, { emit: A }) {
    const s = t, l = A, c = D(s.game.revealedCoins), o = D({
      cashoutAmount: s.game.cashoutAmount,
      remainingCards: s.game.remainingCards,
      remainingBombs: s.game.remainingBombs,
      nextBombProbabilityBps: s.game.nextBombProbabilityBps
    }), g = D(null), w = D(!1), y = D(!1);
    let f = 0;
    function M() {
      o.value = {
        cashoutAmount: s.game.cashoutAmount,
        remainingCards: s.game.remainingCards,
        remainingBombs: s.game.remainingBombs,
        nextBombProbabilityBps: s.game.nextBombProbabilityBps
      };
    }
    function v() {
      return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    function k() {
      f !== 0 && (window.clearTimeout(f), f = 0);
    }
    function R(m, d) {
      if (k(), g.value = m, y.value = !1, v() || typeof window > "u") {
        w.value = !0, y.value = !0, d();
        return;
      }
      w.value = !1, window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          w.value = !0;
        });
      }), f = window.setTimeout(() => {
        y.value = !0, d();
      }, bl);
    }
    z(() => s.game.revealedCoins, (m, d) => {
      if (m > d) {
        R("coin", () => {
          c.value = m, M();
        });
        return;
      }
      c.value = m, M();
    }), z(() => s.ending, (m) => {
      m?.outcome === "busted" && R("bomb", () => {
      });
    }, { immediate: !0 });
    const C = _(() => s.ending?.outcome === "busted"), L = _(() => !!s.ending && (!C.value || y.value)), $ = _(() => !!s.writeDisabledReason || !!s.ending || s.drawing);
    function b(m) {
      return `${(m / 100).toFixed(m % 100 === 0 ? 0 : 2)}%`;
    }
    return X(k), (m, d) => (i(), r("section", tl, [
      e("header", nl, [
        e("button", {
          type: "button",
          class: "game-back",
          onClick: d[0] || (d[0] = (h) => l("lobby"))
        }, "返回大厅"),
        d[4] || (d[4] = e("div", null, [e("span", null, "DOUBLE OR HOLD"), e("h2", { id: "game-push-title" }, "翻倍或收手")], -1)),
        e("strong", null, "托管 ¤ " + n(t.game.bet), 1)
      ]),
      e("div", il, [
        g.value || t.drawing ? (i(), r("div", {
          key: 0,
          class: S(["game-flip-slot", {
            "is-flipped": w.value,
            "is-shuffling": t.drawing && !g.value
          }])
        }, [e("div", sl, [d[5] || (d[5] = e("span", {
          class: "game-flip-back",
          "aria-hidden": "true"
        }, null, -1)), g.value ? (i(), r("span", {
          key: 0,
          class: S(["game-flip-front", `is-${g.value}`])
        }, n(g.value === "bomb" ? "✸" : "¤"), 3)) : G("", !0)])], 2)) : G("", !0),
        e("div", ul, [c.value === 0 && !g.value ? (i(), r("span", rl, "尚未揭牌")) : G("", !0), (i(!0), r(E, null, T(c.value, (h) => (i(), r("b", {
          key: h,
          class: "game-revealed-coin"
        }, "¤"))), 128))]),
        e("div", ol, [(i(!0), r(E, null, T(o.value.remainingCards, (h) => (i(), r("i", {
          key: h,
          style: J({ "--card": h })
        }, null, 4))), 128))])
      ]),
      e("div", dl, [
        e("div", null, [d[6] || (d[6] = e("span", null, "可收手", -1)), e("strong", null, "¤ " + n(o.value.cashoutAmount), 1)]),
        e("div", null, [d[7] || (d[7] = e("span", null, "余牌", -1)), e("strong", null, n(o.value.remainingCards), 1)]),
        e("div", null, [d[8] || (d[8] = e("span", null, "余雷", -1)), e("strong", null, n(o.value.remainingBombs), 1)]),
        e("div", null, [d[9] || (d[9] = e("span", null, "下一张风险", -1)), e("strong", null, n(b(o.value.nextBombProbabilityBps)), 1)])
      ]),
      d[10] || (d[10] = e("p", { class: "game-rule-note" }, "每枚金币增加 ¤ 50；翻到炸弹立即以零返还结束。", -1)),
      t.drawing ? (i(), r("p", vl, "正在翻牌并确认落账…")) : L.value && t.ending ? (i(), r("div", {
        key: 1,
        class: S(["game-reveal-outcome", `is-${t.ending.outcomeTone}`])
      }, [
        e("strong", null, n(t.ending.outcomeLabel), 1),
        e("em", null, n(t.ending.net > 0 ? "+" : "") + n(t.ending.net) + " 小白币", 1),
        e("button", {
          type: "button",
          class: "game-primary-action",
          onClick: d[1] || (d[1] = (h) => l("finished"))
        }, "回到大厅")
      ], 2)) : t.ending ? G("", !0) : (i(), r("div", ml, [t.game.legalActions.includes("draw") ? (i(), r("button", {
        key: 0,
        type: "button",
        class: "game-primary-action",
        disabled: $.value,
        title: t.writeDisabledReason,
        onClick: d[2] || (d[2] = (h) => l("draw"))
      }, " 再翻一张 ", 8, cl)) : G("", !0), t.game.legalActions.includes("cash-out") ? (i(), r("button", {
        key: 1,
        type: "button",
        class: "game-secondary-action",
        disabled: $.value,
        title: t.writeDisabledReason,
        onClick: d[3] || (d[3] = (h) => l("cashOut"))
      }, " 收手入账 ", 8, gl)) : G("", !0)]))
    ]));
  }
}), yl = fl, pl = {
  class: "game-records",
  "aria-labelledby": "game-records-title"
}, hl = { class: "game-section-heading" }, kl = {
  key: 0,
  class: "game-record-list"
}, $l = {
  class: "game-record-mark",
  "aria-hidden": "true"
}, wl = { class: "game-record-main" }, Cl = ["datetime"], Dl = { class: "game-record-money" }, Gl = {
  key: 0,
  class: "game-record-detail"
}, Al = {
  key: 1,
  class: "game-record-detail"
}, Bl = {
  key: 2,
  class: "game-record-steps"
}, _l = {
  key: 1,
  class: "game-record-empty"
}, Rl = {
  key: 2,
  class: "game-inline-error",
  role: "status"
}, Ml = ["disabled"], Ll = /* @__PURE__ */ x({
  __name: "GameRecords",
  props: {
    records: {},
    total: {},
    hasMore: { type: Boolean },
    loadingMore: { type: Boolean },
    error: {}
  },
  emits: ["loadMore"],
  setup(t) {
    const A = Object.freeze({
      safe: "稳",
      medium: "中",
      risky: "险"
    });
    function s(l) {
      return new Intl.DateTimeFormat("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      }).format(new Date(l));
    }
    return (l, c) => (i(), r("section", pl, [
      e("header", hl, [c[1] || (c[1] = e("div", null, [e("span", null, "HOUSE LEDGER"), e("h2", { id: "game-records-title" }, "牌桌记录")], -1)), e("small", null, n(t.total) + " 局", 1)]),
      t.records.length ? (i(), r("div", kl, [(i(!0), r(E, null, T(t.records, (o) => (i(), r("article", {
        key: o.id,
        class: S(["game-record", `is-${o.outcomeTone}`])
      }, [e("div", $l, n(o.game === "dice" ? "骰" : o.game === "push" ? "翻" : "阶"), 1), e("div", wl, [
        e("header", null, [e("div", null, [e("span", null, n(o.gameLabel), 1), e("strong", null, n(o.outcomeLabel), 1)]), e("time", { datetime: new Date(o.createdAt).toISOString() }, n(s(o.createdAt)), 9, Cl)]),
        e("div", Dl, [
          e("span", null, "下注 ¤ " + n(o.amountIn), 1),
          e("span", null, "返还 ¤ " + n(o.payout), 1),
          e("strong", null, n(o.net > 0 ? "+" : "") + n(o.net), 1)
        ]),
        e("details", null, [c[2] || (c[2] = e("summary", null, "查看公开牌局", -1)), o.detail.kind === "dice" ? (i(), r("div", Gl, [
          e("p", null, "终局叫数：" + n(o.detail.finalBid.count) + " 枚 " + n(o.detail.finalBid.face) + " 点", 1),
          e("p", null, "实际匹配：" + n(o.detail.matchingDiceCount) + " 枚 · " + n(o.detail.challenger === "player" ? "玩家" : "庄家") + "开骰", 1),
          e("p", null, "你的骰子：" + n(o.detail.playerDice.join(" · ")), 1)
        ])) : o.detail.kind === "push" ? (i(), r("div", Al, [e("p", null, "共翻出 " + n(o.detail.revealedCoins) + " 枚金币", 1)])) : (i(), r("ol", Bl, [(i(!0), r(E, null, T(o.detail.steps, (g) => (i(), r("li", { key: g.floor }, " 第 " + n(g.floor) + " 层 · " + n(F(A)[g.choice]) + " · " + n(g.success ? `成功至 ¤ ${g.amountAfterStep}` : "挑战失败"), 1))), 128))]))])
      ])], 2))), 128))])) : (i(), r("div", _l, [...c[3] || (c[3] = [e("span", { "aria-hidden": "true" }, "◇", -1), e("p", null, "尚无结算记录", -1)])])),
      t.error ? (i(), r("p", Rl, n(t.error), 1)) : G("", !0),
      t.hasMore ? (i(), r("button", {
        key: 3,
        type: "button",
        class: "game-load-more",
        disabled: t.loadingMore,
        onClick: c[0] || (c[0] = (o) => l.$emit("loadMore"))
      }, n(t.loadingMore ? "正在翻阅…" : "继续翻阅记录"), 9, Ml)) : G("", !0)
    ]));
  }
}), Sl = Ll, El = { class: "game-app" }, Tl = { class: "game-header" }, Il = { class: "game-funds" }, Ol = ["disabled"], xl = {
  class: "game-nav",
  "aria-label": "游戏页面"
}, Fl = ["disabled"], Pl = ["disabled"], Ul = {
  key: 1,
  class: "game-action-error",
  role: "status"
}, Nl = ["disabled"], zl = { class: "game-scroll" }, q = 35e3, Hl = /* @__PURE__ */ x({
  __name: "GameApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(t) {
    const A = /* @__PURE__ */ new Set([
      "busted",
      "failed",
      "cleared",
      "capped"
    ]), s = t, l = D(structuredClone(Ce(s.initialState))), c = D(l.value.activeGame?.kind || "lobby"), o = D(!1), g = D(!1), w = D(!1), y = D(""), f = D(""), M = D(""), v = D(null), k = D(null), R = D(""), C = D(null), L = D(null), $ = D({
      balance: l.value.balance,
      lockedAmount: l.value.lockedAmount
    });
    let b = () => {
    }, m = 0, d = 0;
    const h = _(() => l.value.status === "unconfirmed" || l.value.status === "save-failed"), B = _(() => g.value ? "正在处理上一项操作" : o.value ? "正在刷新游戏状态" : l.value.status !== "ready" ? l.value.message || "游戏暂时不可写入" : l.value.generationActive ? "主剧情正在生成，请等待回复完成" : ""), Q = _(() => o.value || g.value || h.value || l.value.status === "conflict"), N = _(() => l.value.records.find((u) => u.id === R.value) || null), ae = _(() => L.value?.endpoint !== "game/dice/challenge" || l.value.activeGame?.kind !== "dice" ? null : l.value.activeGame.bids.at(-1) || null), oe = _(() => L.value?.endpoint === "game/push/draw"), de = _(() => L.value?.endpoint === "game/ladder/step"), le = _(() => C.value?.kind === "push" ? C.value.game : l.value.activeGame?.kind === "push" ? l.value.activeGame : null), te = _(() => C.value?.kind === "ladder" ? C.value.game : l.value.activeGame?.kind === "ladder" ? l.value.activeGame : null);
    function Y() {
      return typeof globalThis.crypto?.randomUUID == "function" ? `game-ui:${globalThis.crypto.randomUUID()}` : (d += 1, `game-ui:${Date.now()}:${d}`);
    }
    function j() {
      return { chatIdentity: l.value.chatIdentity };
    }
    function V(u) {
      const a = u instanceof Error ? u.message : String(u);
      return a.includes("cannot be overdrawn") || a.includes("economy_insufficient_funds") ? "小白币余额不足，未能入局。" : a.includes("game_revision_conflict") || a.includes("game_event_id_conflict") ? "牌局已经变化，请重新读取后再操作。" : a.includes("game_dice_bid_not_higher") ? "叫数必须高于桌面当前叫数。" : a.includes("game_action_invalid") ? "当前牌局不接受这项操作。" : a.includes("game_main_generation_active") ? "主剧情正在生成，请等待回复完成。" : a.includes("game_push_cashout_invalid") || a.includes("game_ladder_cashout_invalid") ? "当前还不能收手。" : a.includes("聊天已切换") ? "聊天已切换，请重新打开游戏。" : a === "host_request_timeout" ? "等待落账结果超时；可用同一操作标识安全重试。" : "游戏操作未完成，请稍后重试。";
    }
    function ve(u) {
      return u !== null && typeof u == "object" && typeof u.code == "string" ? String(u.code) : "";
    }
    function K(u) {
      const a = u === "save-failed" ? "本局结果尚未保存。请重试保存后再继续游戏。" : u === "unconfirmed" ? "上一次保存结果尚未确认，赌局与资金写入已冻结。" : "服务端数据与当前候选不一致，请刷新酒馆后再继续。";
      l.value = {
        ...l.value,
        status: u,
        message: a
      };
    }
    function me(u, a, p) {
      return !A.has(a.outcome) && a.detail.kind !== "dice" ? null : u.kind === "dice" && a.detail.kind === "dice" ? {
        kind: "dice",
        record: a,
        detail: a.detail,
        balanceAfter: p
      } : u.kind === "push" && a.detail.kind === "push" ? {
        kind: "push",
        record: a,
        game: u,
        balanceAfter: p
      } : u.kind === "ladder" && a.detail.kind === "ladder" ? {
        kind: "ladder",
        record: a,
        game: u,
        balanceAfter: p
      } : null;
    }
    function ce() {
      C.value = null, $.value = {
        balance: l.value.balance,
        lockedAmount: l.value.lockedAmount
      };
    }
    function P(u) {
      ce(), c.value = u;
    }
    function W(u) {
      const a = l.value.activeGame;
      let p = C.value !== null;
      if (l.value = structuredClone(u), o.value = !1, w.value = !1, y.value = "", M.value = "", a && !u.activeGame) {
        const I = u.records.find((we) => we.gameId === a.id), U = I ? me(a, I, u.balance) : null;
        U ? (C.value = U, p = !0, R.value = "", c.value = U.kind) : (p = !1, R.value = I?.id || "", c.value = "lobby");
      }
      p || ($.value = {
        balance: u.balance,
        lockedAmount: u.lockedAmount
      }), u.activeGame && c.value !== "records" && c.value !== "lobby" ? c.value = u.activeGame.kind : !u.activeGame && c.value !== "records" && !C.value && (c.value = "lobby");
    }
    function ge(u, a) {
      const p = {
        ...j(),
        expectedRevision: l.value.revision,
        expectedEventId: l.value.eventId,
        actionId: a
      };
      return u.endpoint === "game/dice/start" || u.endpoint === "game/ladder/start" ? {
        ...p,
        bet: u.bet
      } : u.endpoint === "game/push/start" ? p : u.endpoint === "game/dice/bid" ? {
        ...p,
        gameId: u.gameId,
        bid: {
          count: u.bid.count,
          face: u.bid.face
        }
      } : u.endpoint === "game/ladder/step" ? {
        ...p,
        gameId: u.gameId,
        choice: u.choice
      } : {
        ...p,
        gameId: u.gameId
      };
    }
    async function H(u, a = Y()) {
      if (B.value) return !1;
      const p = m;
      g.value = !0, L.value = u, f.value = "", k.value = null;
      try {
        const I = await s.bridge.request(u.endpoint, ge(u, a), q);
        return p !== m ? !1 : (W(I.result), I.result.activeGame && (c.value = I.result.activeGame.kind), !0);
      } catch (I) {
        if (p === m) {
          const U = ve(I);
          U === "game_save_pending" ? (K("save-failed"), f.value = "", v.value = null, k.value = null) : U === "storage_unconfirmed" ? (K("unconfirmed"), f.value = "", v.value = null, k.value = null) : U === "storage_conflict" ? (K("conflict"), f.value = "", v.value = null, k.value = null) : (f.value = V(I), k.value = {
            request: u,
            actionId: a
          });
        }
        return !1;
      } finally {
        p === m && (L.value = null, g.value = !1);
      }
    }
    function be(u, a) {
      if (B.value || l.value.activeGame) return;
      const p = u === "dice" ? {
        heading: "确认入席秘骰对决",
        summary: `托管 ¤ ${a}，胜出返还下注的 1.8 倍。`,
        confirmLabel: "确认入席"
      } : u === "push" ? {
        heading: "确认揭开第一张牌",
        summary: "托管 ¤ 50。金币可以累积，炸弹会立即结束本局。",
        confirmLabel: "确认揭牌"
      } : {
        heading: "确认踏上鎏金阶梯",
        summary: `托管 ¤ ${a}，首层成功后才可收手。`,
        confirmLabel: "确认登阶"
      };
      v.value = {
        request: u === "dice" ? {
          endpoint: "game/dice/start",
          bet: a
        } : u === "push" ? { endpoint: "game/push/start" } : {
          endpoint: "game/ladder/start",
          bet: a
        },
        actionId: Y(),
        ...p
      }, f.value = "";
    }
    function fe() {
      const u = l.value.activeGame;
      u?.kind !== "dice" || !u.legalActions.includes("challenge") || (v.value = {
        request: {
          endpoint: "game/dice/challenge",
          gameId: u.id
        },
        actionId: Y(),
        heading: "现在开骰？",
        summary: "双方骰盅将同时揭开，按桌面最终叫牌直接判定输赢。",
        confirmLabel: "确认开骰",
        danger: !0
      }, f.value = "");
    }
    function ne(u) {
      const a = l.value.activeGame;
      if (!a || a.kind !== u || !a.legalActions.includes("cash-out")) return;
      const p = a.cashoutAmount;
      v.value = {
        request: u === "push" ? {
          endpoint: "game/push/cash-out",
          gameId: a.id
        } : {
          endpoint: "game/ladder/cash-out",
          gameId: a.id
        },
        actionId: Y(),
        heading: "现在收手？",
        summary: `本局将结束，并返还 ¤ ${p}。`,
        confirmLabel: "收手入账"
      }, f.value = "";
    }
    function ye() {
      const u = v.value;
      u && (v.value = null, H(u.request, u.actionId));
    }
    function pe() {
      v.value = null, f.value = "";
    }
    async function ie() {
      if (Q.value) return;
      const u = ++m;
      o.value = !0, y.value = "";
      try {
        const a = await s.bridge.request("game/refresh", j(), q);
        u === m && W(a.result);
      } catch (a) {
        u === m && (y.value = V(a));
      } finally {
        u === m && (o.value = !1);
      }
    }
    async function he() {
      if (o.value || g.value) return;
      const u = ++m;
      o.value = !0, y.value = "";
      try {
        const a = await s.bridge.request("game/confirm-save", j(), q);
        u === m && W(a.result.state);
      } catch (a) {
        u === m && (y.value = V(a));
      } finally {
        u === m && (o.value = !1);
      }
    }
    async function ke() {
      if (!l.value.hasMore || w.value || g.value) return;
      const u = m;
      w.value = !0, M.value = "";
      try {
        const a = await s.bridge.request("game/records/load-more", {
          ...j(),
          offset: l.value.records.length
        }, q);
        if (u !== m) return;
        const p = new Set(l.value.records.map((I) => I.id));
        l.value.records.push(...a.result.records.filter((I) => !p.has(I.id))), l.value.total = a.result.total, l.value.hasMore = a.result.hasMore;
      } catch (a) {
        u === m && (M.value = V(a));
      } finally {
        u === m && (w.value = !1);
      }
    }
    function $e() {
      const u = k.value;
      u && H(u.request, u.actionId);
    }
    return ee(() => {
      b = s.bridge.subscribe((u) => {
        if (u.type === "game/state") {
          const a = u.payload.state;
          g.value || (m += 1), f.value = "", k.value = null, W(a);
        }
        u.type === "game/error" && (y.value = "游戏状态暂时无法读取，请重新打开。");
      });
    }), De(() => {
      m += 1, b(), v.value = null, k.value = null, L.value = null;
    }), (u, a) => (i(), r("main", El, [
      e("header", Tl, [
        a[19] || (a[19] = e("div", { class: "game-brand" }, [e("h1", null, "游戏")], -1)),
        e("div", Il, [e("span", null, [a[16] || (a[16] = e("small", null, "可用", -1)), e("strong", null, "¤ " + n($.value.balance), 1)]), e("span", null, [a[17] || (a[17] = e("small", null, "托管", -1)), e("strong", null, "¤ " + n($.value.lockedAmount), 1)])]),
        e("button", {
          type: "button",
          class: "game-refresh",
          disabled: Q.value,
          title: "重新读取游戏",
          onClick: ie
        }, [...a[18] || (a[18] = [e("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [e("path", { d: "M20 7v5h-5M4 17v-5h5M18.2 9A7 7 0 0 0 6.1 6.7L4 9m16 6-2.1 2.3A7 7 0 0 1 5.8 15" })], -1), e("span", { class: "game-sr-only" }, "重新读取游戏", -1)])], 8, Ol)
      ]),
      e("nav", xl, [
        e("button", {
          type: "button",
          class: S({ "is-active": c.value === "lobby" }),
          onClick: a[0] || (a[0] = (p) => P("lobby"))
        }, "大厅", 2),
        l.value.activeGame ? (i(), r("button", {
          key: 0,
          type: "button",
          class: S({ "is-active": c.value === l.value.activeGame.kind }),
          onClick: a[1] || (a[1] = (p) => c.value = l.value.activeGame?.kind || "lobby")
        }, [...a[20] || (a[20] = [Ae(" 当前牌桌", -1), e("i", null, null, -1)])], 2)) : G("", !0),
        e("button", {
          type: "button",
          class: S({ "is-active": c.value === "records" }),
          onClick: a[2] || (a[2] = (p) => P("records"))
        }, "记录", 2)
      ]),
      l.value.message || y.value ? (i(), r("aside", {
        key: 0,
        class: S(["game-notice", `is-${l.value.status}`]),
        role: "status"
      }, [a[21] || (a[21] = e("span", { "aria-hidden": "true" }, "!", -1)), e("div", null, [
        e("strong", null, n(l.value.status === "save-failed" ? "本局尚未保存" : l.value.status === "unconfirmed" ? "落账待核实" : l.value.status === "conflict" ? "牌局状态冲突" : "游戏状态"), 1),
        e("p", null, n(y.value || l.value.message), 1),
        h.value ? (i(), r("button", {
          key: 0,
          type: "button",
          disabled: o.value,
          onClick: he
        }, n(o.value ? "正在保存…" : l.value.status === "save-failed" ? "重试保存本局" : "核实保存结果"), 9, Fl)) : l.value.status === "blocked" ? (i(), r("button", {
          key: 1,
          type: "button",
          disabled: o.value,
          onClick: ie
        }, n(o.value ? "正在读取…" : "重新读取"), 9, Pl)) : G("", !0)
      ])], 2)) : G("", !0),
      f.value && !v.value ? (i(), r("aside", Ul, [e("span", null, n(f.value), 1), k.value && l.value.status === "ready" ? (i(), r("button", {
        key: 0,
        type: "button",
        disabled: g.value,
        onClick: $e
      }, "重试同一操作", 8, Nl)) : G("", !0)])) : G("", !0),
      e("div", zl, [N.value && c.value === "lobby" ? (i(), r("div", {
        key: 0,
        class: S(["game-result-banner", `is-${N.value.outcomeTone}`]),
        role: "status"
      }, [
        e("span", null, n(N.value.gameLabel), 1),
        e("strong", null, n(N.value.outcomeLabel), 1),
        e("em", null, n(N.value.net > 0 ? "+" : "") + n(N.value.net) + " 小白币", 1),
        e("button", {
          type: "button",
          onClick: a[3] || (a[3] = (p) => R.value = "")
        }, "关闭")
      ], 2)) : G("", !0), c.value === "lobby" ? (i(), O(ll, {
        key: 1,
        "active-game": l.value.activeGame,
        balance: l.value.balance,
        "locked-amount": l.value.lockedAmount,
        "write-disabled-reason": B.value,
        onStart: be,
        onContinue: a[4] || (a[4] = (p) => c.value = p)
      }, null, 8, [
        "active-game",
        "balance",
        "locked-amount",
        "write-disabled-reason"
      ])) : c.value === "dice" && ae.value ? (i(), O(Oe, {
        key: 2,
        "final-bid": ae.value
      }, null, 8, ["final-bid"])) : c.value === "dice" && l.value.activeGame?.kind === "dice" ? (i(), O(ma, {
        key: 3,
        game: l.value.activeGame,
        "write-disabled-reason": B.value,
        onBid: a[5] || (a[5] = (p) => H({
          endpoint: "game/dice/bid",
          gameId: l.value.activeGame?.id || "",
          bid: p
        })),
        onChallenge: fe,
        onLobby: a[6] || (a[6] = (p) => P("lobby"))
      }, null, 8, ["game", "write-disabled-reason"])) : c.value === "dice" && C.value?.kind === "dice" ? (i(), O(Da, {
        key: 4,
        record: C.value.record,
        detail: C.value.detail,
        "balance-after": C.value.balanceAfter,
        onDone: a[7] || (a[7] = (p) => P("lobby"))
      }, null, 8, [
        "record",
        "detail",
        "balance-after"
      ])) : c.value === "push" && le.value ? (i(), O(yl, {
        key: 5,
        game: le.value,
        "write-disabled-reason": B.value,
        ending: C.value?.kind === "push" ? C.value.record : null,
        drawing: oe.value,
        onDraw: a[8] || (a[8] = (p) => H({
          endpoint: "game/push/draw",
          gameId: l.value.activeGame?.id || ""
        })),
        onCashOut: a[9] || (a[9] = (p) => ne("push")),
        onLobby: a[10] || (a[10] = (p) => P("lobby")),
        onFinished: a[11] || (a[11] = (p) => P("lobby"))
      }, null, 8, [
        "game",
        "write-disabled-reason",
        "ending",
        "drawing"
      ])) : c.value === "ladder" && te.value ? (i(), O(Ua, {
        key: 6,
        game: te.value,
        "write-disabled-reason": B.value,
        ending: C.value?.kind === "ladder" ? C.value.record : null,
        stepping: de.value,
        onStep: a[12] || (a[12] = (p) => H({
          endpoint: "game/ladder/step",
          gameId: l.value.activeGame?.id || "",
          choice: p
        })),
        onCashOut: a[13] || (a[13] = (p) => ne("ladder")),
        onLobby: a[14] || (a[14] = (p) => P("lobby")),
        onFinished: a[15] || (a[15] = (p) => P("lobby"))
      }, null, 8, [
        "game",
        "write-disabled-reason",
        "ending",
        "stepping"
      ])) : c.value === "records" ? (i(), O(Sl, {
        key: 7,
        records: l.value.records,
        total: l.value.total,
        "has-more": l.value.hasMore,
        "loading-more": w.value,
        error: M.value,
        onLoadMore: ke
      }, null, 8, [
        "records",
        "total",
        "has-more",
        "loading-more",
        "error"
      ])) : G("", !0)]),
      v.value ? (i(), O(Me, {
        key: 2,
        heading: v.value.heading,
        summary: v.value.summary,
        "confirm-label": v.value.confirmLabel,
        danger: v.value.danger,
        onCancel: pe,
        onConfirm: ye
      }, null, 8, [
        "heading",
        "summary",
        "confirm-label",
        "danger"
      ])) : G("", !0)
    ]));
  }
}), jl = Hl;
export {
  jl as default
};
