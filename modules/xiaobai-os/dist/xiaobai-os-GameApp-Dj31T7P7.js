/* eslint-disable */
import { $ as X, A as D, D as ae, M as be, N as P, Q as L, S, T as U, _ as fe, a as _, b as q, c as G, et as l, f as ye, l as o, m as x, o as e, r as T, s as O, x as i, y as J } from "./xiaobai-os-runtime-core.esm-bundler-Dmqi2Zbl.js";
import { a as le, c as pe } from "./xiaobai-os-runtime-dom.esm-bundler-BYy7nd4d.js";
var he = { class: "game-dialog-card" }, ke = { class: "game-dialog-actions" }, $e = /* @__PURE__ */ x({
  __name: "GameActionDialog",
  props: {
    heading: {},
    summary: {},
    confirmLabel: {},
    danger: { type: Boolean }
  },
  emits: ["cancel", "confirm"],
  setup(t) {
    return (B, n) => (i(), o("dialog", {
      open: "",
      class: "game-dialog",
      onCancel: n[2] || (n[2] = pe((s) => B.$emit("cancel"), ["prevent"]))
    }, [e("section", he, [
      n[3] || (n[3] = e("span", { class: "game-eyebrow" }, "FINAL CALL", -1)),
      e("h2", null, l(t.heading), 1),
      e("p", null, l(t.summary), 1),
      e("div", ke, [e("button", {
        type: "button",
        onClick: n[0] || (n[0] = (s) => B.$emit("cancel"))
      }, "再想想"), e("button", {
        type: "button",
        class: L(["is-primary", { "is-danger": t.danger }]),
        onClick: n[1] || (n[1] = (s) => B.$emit("confirm"))
      }, l(t.confirmLabel), 3)])
    ])], 32));
  }
}), we = $e, te = {
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
var Ce = 80, De = 180, Ge = 200;
function Ae(t) {
  const B = Math.max(0, t - 1) * 45 + 720 + Ce, n = B + De;
  return {
    countAt: B,
    verdictAt: n,
    settledAt: n + Ge
  };
}
var Be = ["aria-label"], Re = { class: "game-die-stage" }, Me = { class: "game-die-pips" }, _e = /* @__PURE__ */ x({
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
    const B = t, n = [
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
    ], s = {
      1: [0, 0],
      2: [90, 180],
      3: [0, -90],
      4: [0, 90],
      5: [-90, 0],
      6: [180, 0]
    };
    function m(w, R) {
      return `rotateX(${w}deg) rotateY(${R}deg)`;
    }
    function d() {
      return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    const f = D(null), $ = D(null);
    let y = null, p = null;
    function M() {
      const [w, R] = s[B.value];
      f.value && (f.value.style.transform = m(w, R));
    }
    function v() {
      const w = f.value;
      if (!w) return;
      if (y?.cancel(), p?.cancel(), y = null, p = null, d() || typeof w.animate != "function") {
        M();
        return;
      }
      const [R, C] = s[B.value], E = 360 * (2 + Math.floor(Math.random() * 2)) + 146, g = 360 * (1 + Math.floor(Math.random() * 2)) + 101;
      y = w.animate([
        {
          transform: m(R - E, C - g),
          easing: "cubic-bezier(.11,.58,.32,1)"
        },
        {
          transform: m(R + 13, C + 9),
          offset: 0.84,
          easing: "cubic-bezier(.36,0,.4,1)"
        },
        { transform: m(R, C) }
      ], {
        duration: 720,
        delay: B.delay,
        fill: "both"
      }), p = $.value?.animate([
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
        delay: B.delay,
        fill: "both"
      }) ?? null;
    }
    return J(v), q(() => {
      y?.cancel(), p?.cancel();
    }), U(() => B.value, v), (w, R) => (i(), o("div", {
      ref_key: "shell",
      ref: $,
      class: L(["game-die", { "is-hit": t.highlight }]),
      role: "img",
      "aria-label": `骰子 ${t.value} 点`
    }, [e("div", Re, [e("div", {
      ref_key: "cube",
      ref: f,
      class: "game-die-cube"
    }, [(i(), o(T, null, S(n, (C) => e("div", {
      key: C.side,
      class: L(["game-die-face", [C.side, { "is-result": C.face === t.value }]])
    }, [e("div", Me, [(i(!0), o(T, null, S(P(te)[C.face], ([E, g], c) => (i(), o("i", {
      key: c,
      class: "game-die-pip",
      style: X({ gridArea: `${E} / ${g}` })
    }, null, 4))), 128))])], 2)), 64))], 512)])], 10, Be));
  }
}), W = _e, Le = {
  class: "game-table game-dice-table",
  "aria-labelledby": "game-dice-title"
}, Te = { class: "game-table-heading" }, Ee = { class: "game-dice-cloth" }, Se = { class: "game-dealer-position" }, Ie = {
  key: 0,
  class: "game-current-bid"
}, Oe = {
  key: 1,
  class: "game-current-bid is-empty"
}, xe = { class: "game-player-hand" }, Fe = { class: "game-dice-row" }, Pe = {
  key: 0,
  class: "game-bid-builder"
}, Ue = {
  class: "game-bid-count",
  role: "group",
  "aria-label": "叫牌数量"
}, Ne = ["disabled"], ze = ["disabled"], Ye = {
  class: "game-bid-faces",
  role: "group",
  "aria-label": "叫牌点数"
}, He = [
  "disabled",
  "aria-pressed",
  "aria-label",
  "onClick"
], je = { class: "game-face-pips" }, Ve = { class: "game-dice-controls" }, qe = ["disabled", "title"], Qe = ["disabled", "title"], We = ["disabled", "title"], Xe = {
  key: 1,
  class: "game-bid-history",
  "aria-label": "公开叫牌记录"
}, Je = /* @__PURE__ */ x({
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
  setup(t, { emit: B }) {
    const n = t, s = B, m = [
      2,
      3,
      4,
      5,
      6
    ], d = n.game.legalBids[0] || {
      count: 1,
      face: 2
    }, f = D(d.count), $ = D(d.face), y = _(() => n.game.bids.at(-1) || null), p = _(() => n.game.legalBids[0] || null), M = _(() => {
      const g = n.game.legalBids.map((c) => c.count);
      return g.length === 0 ? {
        min: 1,
        max: 10
      } : {
        min: Math.min(...g),
        max: Math.max(...g)
      };
    }), v = _(() => n.game.legalBids.find((g) => g.count === f.value && g.face === $.value) || null);
    function w(g) {
      return n.game.legalBids.some((c) => c.face === g);
    }
    function R(g) {
      const c = f.value + g, { min: b, max: u } = M.value;
      c >= b && c <= u && (f.value = c);
    }
    U(() => M.value.min, (g) => {
      f.value < g && (f.value = g);
    });
    function C() {
      v.value && !n.writeDisabledReason && s("bid", {
        count: v.value.count,
        face: v.value.face
      });
    }
    function E() {
      const g = p.value;
      g && !n.writeDisabledReason && (f.value = g.count, $.value = g.face, s("bid", {
        count: g.count,
        face: g.face
      }));
    }
    return (g, c) => (i(), o("section", Le, [
      e("header", Te, [
        e("button", {
          type: "button",
          class: "game-back",
          onClick: c[0] || (c[0] = (b) => s("lobby"))
        }, "返回大厅"),
        c[4] || (c[4] = e("div", null, [e("span", null, "LIAR'S DICE"), e("h2", { id: "game-dice-title" }, "秘骰对决")], -1)),
        e("strong", null, "托管 ¤ " + l(t.game.bet), 1)
      ]),
      e("div", Ee, [
        e("div", Se, [c[5] || (c[5] = e("span", {
          class: "game-dealer-chip",
          "aria-hidden": "true"
        }, "庄", -1)), e("p", null, l(y.value?.by === "dealer" ? "庄家已经加叫，轮到你决断。" : "庄家静候你的第一口价。"), 1)]),
        y.value ? (i(), o("div", Ie, [
          c[6] || (c[6] = e("small", null, "桌面叫数", -1)),
          e("strong", null, l(y.value.count), 1),
          e("span", null, "枚 " + l(y.value.face) + " 点", 1),
          e("em", null, l(y.value.by === "dealer" ? "庄家" : "你") + "叫牌", 1)
        ])) : (i(), o("div", Oe, [...c[7] || (c[7] = [e("span", null, "等待首轮叫牌", -1)])])),
        e("div", xe, [
          c[8] || (c[8] = e("span", null, "你的骰子", -1)),
          e("div", Fe, [(i(!0), o(T, null, S(t.game.playerDice, (b, u) => (i(), O(W, {
            key: u,
            value: b,
            delay: u * P(45)
          }, null, 8, ["value", "delay"]))), 128))]),
          c[9] || (c[9] = e("small", null, "一点可代替任意叫面", -1))
        ])
      ]),
      t.game.legalActions.includes("bid") ? (i(), o("div", Pe, [e("div", Ue, [
        e("button", {
          type: "button",
          disabled: !!t.writeDisabledReason || f.value <= M.value.min,
          "aria-label": "减少数量",
          onClick: c[1] || (c[1] = (b) => R(-1))
        }, " − ", 8, Ne),
        e("strong", null, l(f.value), 1),
        e("button", {
          type: "button",
          disabled: !!t.writeDisabledReason || f.value >= M.value.max,
          "aria-label": "增加数量",
          onClick: c[2] || (c[2] = (b) => R(1))
        }, " + ", 8, ze),
        c[10] || (c[10] = e("small", null, "枚", -1))
      ]), e("div", Ye, [(i(), o(T, null, S(m, (b) => e("button", {
        key: b,
        type: "button",
        class: L(["game-face-chip", { "is-active": b === $.value }]),
        disabled: !!t.writeDisabledReason || !w(b),
        "aria-pressed": b === $.value,
        "aria-label": `${b} 点`,
        onClick: (u) => $.value = b
      }, [e("span", je, [(i(!0), o(T, null, S(P(te)[b], ([u, h], A) => (i(), o("i", {
        key: A,
        style: X({ gridArea: `${u} / ${h}` })
      }, null, 4))), 128))])], 10, He)), 64))])])) : G("", !0),
      e("div", Ve, [
        t.game.legalActions.includes("bid") && p.value ? (i(), o("button", {
          key: 0,
          type: "button",
          class: "game-table-button game-min-raise",
          disabled: !!t.writeDisabledReason,
          title: t.writeDisabledReason,
          onClick: E
        }, " 最小加叫 " + l(p.value.count) + " × " + l(p.value.face), 9, qe)) : G("", !0),
        t.game.legalActions.includes("bid") ? (i(), o("button", {
          key: 1,
          type: "button",
          class: "game-primary-action",
          disabled: !!t.writeDisabledReason || !v.value,
          title: v.value ? t.writeDisabledReason : "这口叫数不高于桌面叫数",
          onClick: C
        }, " 加叫 " + l(f.value) + " × " + l($.value), 9, Qe)) : G("", !0),
        t.game.legalActions.includes("challenge") ? (i(), o("button", {
          key: 2,
          type: "button",
          class: "game-danger-action",
          disabled: !!t.writeDisabledReason,
          title: t.writeDisabledReason,
          onClick: c[3] || (c[3] = (b) => s("challenge"))
        }, " 开骰 ", 8, We)) : G("", !0)
      ]),
      t.game.bids.length ? (i(), o("ol", Xe, [(i(!0), o(T, null, S(t.game.bids, (b, u) => (i(), o("li", { key: `${u}:${b.count}:${b.face}` }, [e("span", null, l(b.by === "player" ? "你" : "庄家"), 1), e("strong", null, l(b.count) + " × " + l(b.face) + " 点", 1)]))), 128))])) : G("", !0)
    ]));
  }
}), Ke = Je, Ze = {
  class: "game-table game-dice-reveal",
  "aria-labelledby": "game-reveal-title"
}, ea = { class: "game-reveal-call" }, aa = { class: "game-reveal-side" }, la = { class: "game-dice-row" }, ta = { class: "game-reveal-side" }, na = { class: "game-dice-row" }, ia = {
  key: 0,
  class: "game-reveal-tally"
}, sa = {
  key: 0,
  class: "game-reveal-actions"
}, ua = {
  key: 1,
  class: "game-reveal-hint"
}, ra = /* @__PURE__ */ x({
  __name: "GameDiceReveal",
  props: {
    record: {},
    detail: {}
  },
  emits: ["done"],
  setup(t, { emit: B }) {
    const n = t, s = B, m = [
      "rolling",
      "counting",
      "verdict",
      "settled"
    ], d = D("rolling"), f = [];
    function $(c) {
      return m.indexOf(d.value) >= m.indexOf(c);
    }
    function y() {
      for (; f.length > 0; ) {
        const c = f.pop();
        c !== void 0 && window.clearTimeout(c);
      }
    }
    function p() {
      y(), d.value = "settled";
    }
    function M() {
      return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    function v(c) {
      return c === 1 || c === n.detail.finalBid.face;
    }
    const w = _(() => n.detail.matchingDiceCount >= n.detail.finalBid.count), R = _(() => n.detail.challenger === "player" ? "你" : "庄家"), C = _(() => n.detail.finalBid.by === "player" ? "你" : "庄家"), E = _(() => n.record.outcome === "player-win" ? "你赢了" : "你输了"), g = _(() => `${n.record.net > 0 ? "+" : ""}${n.record.net} 小白币`);
    return J(() => {
      if (typeof window > "u" || M()) {
        d.value = "settled";
        return;
      }
      const c = Ae(Math.max(n.detail.dealerDice.length, n.detail.playerDice.length));
      f.push(window.setTimeout(() => {
        d.value = "counting";
      }, c.countAt)), f.push(window.setTimeout(() => {
        d.value = "verdict";
      }, c.verdictAt)), f.push(window.setTimeout(() => {
        d.value = "settled";
      }, c.settledAt));
    }), q(y), (c, b) => (i(), o("section", Ze, [
      b[5] || (b[5] = e("header", { class: "game-table-heading game-reveal-heading" }, [e("div", null, [e("span", null, "SHOWDOWN"), e("h2", { id: "game-reveal-title" }, "开骰")])], -1)),
      e("div", {
        class: "game-reveal-cloth",
        onClick: p
      }, [
        e("div", ea, [e("span", null, "最终叫牌 · " + l(C.value), 1), e("strong", null, l(t.detail.finalBid.count) + " 枚 " + l(t.detail.finalBid.face) + " 点", 1)]),
        e("div", aa, [b[1] || (b[1] = e("span", null, "庄家", -1)), e("div", la, [(i(!0), o(T, null, S(t.detail.dealerDice, (u, h) => (i(), O(W, {
          key: `dealer:${h}`,
          value: u,
          delay: h * P(45),
          highlight: $("counting") && v(u)
        }, null, 8, [
          "value",
          "delay",
          "highlight"
        ]))), 128))])]),
        e("div", ta, [b[2] || (b[2] = e("span", null, "你", -1)), e("div", na, [(i(!0), o(T, null, S(t.detail.playerDice, (u, h) => (i(), O(W, {
          key: `player:${h}`,
          value: u,
          delay: h * P(45),
          highlight: $("counting") && v(u)
        }, null, 8, [
          "value",
          "delay",
          "highlight"
        ]))), 128))])]),
        $("counting") ? (i(), o("p", ia, [
          e("span", null, "实际开出（" + l(t.detail.finalBid.face) + " 点及 1 点）", 1),
          e("strong", null, l(t.detail.matchingDiceCount), 1),
          b[3] || (b[3] = e("span", null, "枚", -1))
        ])) : G("", !0),
        $("verdict") ? (i(), o("div", {
          key: 1,
          class: L(["game-reveal-verdict", `is-${t.record.outcomeTone}`]),
          role: "status",
          "aria-live": "polite"
        }, [
          b[4] || (b[4] = e("small", null, "本局结果", -1)),
          e("div", null, [e("strong", null, l(E.value), 1), e("em", null, l(g.value), 1)]),
          e("p", null, " 实际 " + l(t.detail.matchingDiceCount) + " 枚 " + l(w.value ? "≥" : "<") + " 叫牌 " + l(t.detail.finalBid.count) + " 枚； " + l(R.value) + "开骰，" + l(C.value) + "的叫牌" + l(w.value ? "成立" : "不成立") + "。 ", 1)
        ], 2)) : G("", !0)
      ]),
      $("settled") ? (i(), o("div", sa, [e("button", {
        type: "button",
        class: "game-primary-action",
        onClick: b[0] || (b[0] = (u) => s("done"))
      }, "回到大厅")])) : (i(), o("p", ua, "点击牌桌跳过"))
    ]));
  }
}), oa = ra, da = {
  class: "game-table game-ladder-table",
  "aria-labelledby": "game-ladder-title"
}, va = { class: "game-table-heading" }, ma = { class: "game-ladder-stage" }, ca = {
  class: "game-ladder-track",
  "aria-label": "五层挑战进度"
}, ga = { key: 0 }, ba = { key: 1 }, fa = { class: "game-ladder-purse" }, ya = {
  key: 1,
  class: "game-ladder-settling",
  role: "status"
}, pa = {
  key: 0,
  class: "game-ladder-choices"
}, ha = [
  "disabled",
  "title",
  "onClick"
], ka = ["disabled", "title"], $a = 720, wa = 620, Ca = /* @__PURE__ */ x({
  __name: "GameLadderGame",
  props: {
    game: {},
    writeDisabledReason: {},
    ending: {}
  },
  emits: [
    "step",
    "cashOut",
    "lobby",
    "finished"
  ],
  setup(t, { emit: B }) {
    const n = t, s = B, m = Object.freeze({
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
    }), d = D(n.game.completedFloors), f = D(n.game.cashoutAmount), $ = D(n.game.canCashOut), y = D(0), p = D(null), M = [];
    function v() {
      return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    function w() {
      for (; M.length > 0; ) {
        const u = M.pop();
        u !== void 0 && window.clearTimeout(u);
      }
    }
    function R(u, h) {
      if (w(), y.value = d.value + 1, p.value = null, v() || typeof window > "u") {
        p.value = u, h();
        return;
      }
      M.push(window.setTimeout(() => {
        p.value = u, h(), u === "rise" && !n.ending && M.push(window.setTimeout(() => {
          y.value = 0, p.value = null;
        }, wa));
      }, $a));
    }
    U(() => n.game.completedFloors, (u, h) => {
      if (u > h) {
        R("rise", () => {
          d.value = u, f.value = n.game.cashoutAmount, $.value = n.game.canCashOut;
        });
        return;
      }
      d.value = u, f.value = n.game.cashoutAmount, $.value = n.game.canCashOut;
    }), U(() => n.ending, (u) => {
      if (!u || u.detail.kind !== "ladder") return;
      const h = u.detail.steps.at(-1);
      h && R(h.success ? "rise" : "fall", () => {
        h.success && (d.value = h.floor, f.value = h.amountAfterStep);
      });
    }, { immediate: !0 });
    const C = _(() => y.value > 0 && p.value === null), E = _(() => !!n.ending && (p.value !== null || y.value === 0)), g = _(() => !!n.writeDisabledReason || !!n.ending || y.value > 0);
    function c(u) {
      return {
        "is-complete": u <= d.value,
        "is-next": u === d.value + 1 && y.value === 0,
        "is-judging": u === y.value && p.value === null,
        "is-risen": u === y.value && p.value === "rise",
        "is-fallen": u === y.value && p.value === "fall"
      };
    }
    function b(u) {
      return `${u / 100}%`;
    }
    return q(w), (u, h) => (i(), o("section", da, [
      e("header", va, [
        e("button", {
          type: "button",
          class: "game-back",
          onClick: h[0] || (h[0] = (A) => s("lobby"))
        }, "返回大厅"),
        h[3] || (h[3] = e("div", null, [e("span", null, "THE GILDED ASCENT"), e("h2", { id: "game-ladder-title" }, "鎏金阶梯")], -1)),
        e("strong", null, "托管 ¤ " + l(t.game.bet), 1)
      ]),
      e("div", ma, [e("div", ca, [(i(), o(T, null, S(5, (A) => e("div", {
        key: A,
        class: L(["game-ladder-floor", c(A)])
      }, [e("span", null, l(A), 1), t.game.steps[A - 1] && A <= d.value ? (i(), o("small", ga, " ¤ " + l(t.game.steps[A - 1]?.amountAfterSuccess), 1)) : (i(), o("small", ba, "第 " + l(A) + " 层", 1))], 2)), 64))]), e("div", fa, [
        e("span", null, l($.value ? "当前可收手" : "风险起点"), 1),
        e("strong", null, "¤ " + l(f.value), 1),
        e("small", null, "已完成 " + l(d.value) + " / 5 层", 1)
      ])]),
      E.value && t.ending ? (i(), o("div", {
        key: 0,
        class: L(["game-reveal-outcome", `is-${t.ending.outcomeTone}`])
      }, [
        e("strong", null, l(t.ending.outcomeLabel), 1),
        e("em", null, l(t.ending.net > 0 ? "+" : "") + l(t.ending.net) + " 小白币", 1),
        e("button", {
          type: "button",
          class: "game-primary-action",
          onClick: h[1] || (h[1] = (A) => s("finished"))
        }, "回到大厅")
      ], 2)) : C.value ? (i(), o("p", ya, "正在判定第 " + l(y.value) + " 层…", 1)) : t.ending ? G("", !0) : (i(), o(T, { key: 2 }, [t.game.legalActions.includes("step") ? (i(), o("div", pa, [(i(!0), o(T, null, S(t.game.nextChoices, (A) => (i(), o("button", {
        key: A.choice,
        type: "button",
        class: L(`is-${A.choice}`),
        disabled: g.value,
        title: t.writeDisabledReason,
        onClick: (Q) => s("step", A.choice)
      }, [
        e("span", null, l(P(m)[A.choice].name), 1),
        e("small", null, l(P(m)[A.choice].note), 1),
        e("strong", null, l(b(A.successProbabilityBps)), 1),
        e("em", null, "成功得 ¤ " + l(A.successAmount), 1)
      ], 10, ha))), 128))])) : G("", !0), t.game.legalActions.includes("cash-out") ? (i(), o("button", {
        key: 1,
        type: "button",
        class: "game-ladder-cashout",
        disabled: g.value,
        title: t.writeDisabledReason,
        onClick: h[2] || (h[2] = (A) => s("cashOut"))
      }, " 收手并领取 ¤ " + l(f.value), 9, ka)) : G("", !0)], 64))
    ]));
  }
}), Da = Ca, Ga = {
  class: "game-lobby",
  "aria-labelledby": "game-lobby-title"
}, Aa = {
  key: 0,
  class: "game-continue-card"
}, Ba = {
  key: 1,
  class: "game-grid"
}, Ra = { class: "game-card is-dice" }, Ma = { class: "game-bet-field" }, _a = ["disabled", "title"], La = {
  key: 0,
  class: "game-card-reason"
}, Ta = { class: "game-card is-push" }, Ea = ["disabled", "title"], Sa = {
  key: 0,
  class: "game-card-reason"
}, Ia = { class: "game-card is-ladder" }, Oa = { class: "game-bet-field" }, xa = ["disabled", "title"], Fa = {
  key: 0,
  class: "game-card-reason"
}, Pa = /* @__PURE__ */ x({
  __name: "GameLobby",
  props: {
    activeGame: {},
    balance: {},
    lockedAmount: {},
    writeDisabledReason: {}
  },
  emits: ["start", "continue"],
  setup(t, { emit: B }) {
    const n = t, s = B, m = D(50), d = D(30), f = _(() => n.activeGame?.kind === "dice" ? "秘骰对决" : n.activeGame?.kind === "push" ? "翻倍或收手" : n.activeGame?.kind === "ladder" ? "鎏金阶梯" : "");
    function $() {
      return n.writeDisabledReason ? n.writeDisabledReason : !Number.isSafeInteger(m.value) || m.value < 50 || m.value > 500 || m.value % 10 !== 0 ? "下注须为 50 至 500，且为 10 的倍数" : n.balance < m.value ? "余额不足" : "";
    }
    function y() {
      return n.writeDisabledReason ? n.writeDisabledReason : n.balance < 50 ? "余额不足" : "";
    }
    function p() {
      return n.writeDisabledReason ? n.writeDisabledReason : !Number.isSafeInteger(d.value) || d.value < 30 || d.value > 800 || d.value % 10 !== 0 ? "下注须为 30 至 800，且为 10 的倍数" : n.balance < d.value ? "余额不足" : "";
    }
    return (M, v) => (i(), o("section", Ga, [v[17] || (v[17] = e("div", { class: "game-lobby-hero" }, [
      e("span", { class: "game-eyebrow" }, "THE GILDED PARLOUR"),
      e("h2", { id: "game-lobby-title" }, "今夜，押注你的判断"),
      e("p", null, "三张独立牌桌，只认明确选择。每一步都会先落账，再揭晓。")
    ], -1)), t.activeGame ? (i(), o("article", Aa, [
      v[7] || (v[7] = e("div", {
        class: "game-continue-seal",
        "aria-hidden": "true"
      }, "续", -1)),
      e("div", null, [
        v[6] || (v[6] = e("span", null, "牌桌仍在等候", -1)),
        e("h3", null, l(f.value), 1),
        e("p", null, "已有 ¤ " + l(t.lockedAmount) + " 托管在本局，离开页面不会结束赌局。", 1)
      ]),
      e("button", {
        type: "button",
        onClick: v[0] || (v[0] = (w) => s("continue", t.activeGame.kind))
      }, "继续本局")
    ])) : (i(), o("div", Ba, [
      e("article", Ra, [
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
        e("label", Ma, [v[8] || (v[8] = e("span", null, "下注", -1)), ae(e("input", {
          "onUpdate:modelValue": v[1] || (v[1] = (w) => m.value = w),
          type: "number",
          min: "50",
          max: "500",
          step: "10"
        }, null, 512), [[
          le,
          m.value,
          void 0,
          { number: !0 }
        ]])]),
        e("button", {
          type: "button",
          class: "game-table-button",
          disabled: !!$(),
          title: $(),
          onClick: v[2] || (v[2] = (w) => s("start", "dice", m.value))
        }, " 入席 ", 8, _a),
        $() ? (i(), o("small", La, l($()), 1)) : G("", !0)
      ]),
      e("article", Ta, [
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
          onClick: v[3] || (v[3] = (w) => s("start", "push", 50))
        }, " 揭牌 ", 8, Ea),
        y() ? (i(), o("small", Sa, l(y()), 1)) : G("", !0)
      ]),
      e("article", Ia, [
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
        e("label", Oa, [v[14] || (v[14] = e("span", null, "下注", -1)), ae(e("input", {
          "onUpdate:modelValue": v[4] || (v[4] = (w) => d.value = w),
          type: "number",
          min: "30",
          max: "800",
          step: "10"
        }, null, 512), [[
          le,
          d.value,
          void 0,
          { number: !0 }
        ]])]),
        e("button", {
          type: "button",
          class: "game-table-button",
          disabled: !!p(),
          title: p(),
          onClick: v[5] || (v[5] = (w) => s("start", "ladder", d.value))
        }, " 登阶 ", 8, xa),
        p() ? (i(), o("small", Fa, l(p()), 1)) : G("", !0)
      ])
    ]))]));
  }
}), Ua = Pa, Na = {
  class: "game-table game-push-table",
  "aria-labelledby": "game-push-title"
}, za = { class: "game-table-heading" }, Ya = { class: "game-push-stage" }, Ha = { class: "game-flip-card" }, ja = {
  class: "game-coin-stack",
  "aria-label": "已翻出的金币"
}, Va = {
  key: 0,
  class: "game-empty-stack"
}, qa = {
  class: "game-card-fan",
  "aria-hidden": "true"
}, Qa = { class: "game-push-metrics" }, Wa = {
  key: 1,
  class: "game-actions"
}, Xa = ["disabled", "title"], Ja = ["disabled", "title"], Ka = 660, Za = /* @__PURE__ */ x({
  __name: "GamePushGame",
  props: {
    game: {},
    writeDisabledReason: {},
    ending: {}
  },
  emits: [
    "draw",
    "cashOut",
    "lobby",
    "finished"
  ],
  setup(t, { emit: B }) {
    const n = t, s = B, m = D(n.game.revealedCoins), d = D({
      cashoutAmount: n.game.cashoutAmount,
      remainingCards: n.game.remainingCards,
      remainingBombs: n.game.remainingBombs,
      nextBombProbabilityBps: n.game.nextBombProbabilityBps
    }), f = D(null), $ = D(!1), y = D(!1);
    let p = 0;
    function M() {
      d.value = {
        cashoutAmount: n.game.cashoutAmount,
        remainingCards: n.game.remainingCards,
        remainingBombs: n.game.remainingBombs,
        nextBombProbabilityBps: n.game.nextBombProbabilityBps
      };
    }
    function v() {
      return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    function w() {
      p !== 0 && (window.clearTimeout(p), p = 0);
    }
    function R(b, u) {
      if (w(), f.value = b, y.value = !1, v() || typeof window > "u") {
        $.value = !0, y.value = !0, u();
        return;
      }
      $.value = !1, window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          $.value = !0;
        });
      }), p = window.setTimeout(() => {
        y.value = !0, u();
      }, Ka);
    }
    U(() => n.game.revealedCoins, (b, u) => {
      if (b > u) {
        R("coin", () => {
          m.value = b, M();
        });
        return;
      }
      m.value = b, M();
    }), U(() => n.ending, (b) => {
      b?.outcome === "busted" && R("bomb", () => {
      });
    }, { immediate: !0 });
    const C = _(() => n.ending?.outcome === "busted"), E = _(() => !!n.ending && (!C.value || y.value)), g = _(() => !!n.writeDisabledReason || !!n.ending);
    function c(b) {
      return `${(b / 100).toFixed(b % 100 === 0 ? 0 : 2)}%`;
    }
    return q(w), (b, u) => (i(), o("section", Na, [
      e("header", za, [
        e("button", {
          type: "button",
          class: "game-back",
          onClick: u[0] || (u[0] = (h) => s("lobby"))
        }, "返回大厅"),
        u[4] || (u[4] = e("div", null, [e("span", null, "DOUBLE OR HOLD"), e("h2", { id: "game-push-title" }, "翻倍或收手")], -1)),
        e("strong", null, "托管 ¤ " + l(t.game.bet), 1)
      ]),
      e("div", Ya, [
        f.value ? (i(), o("div", {
          key: 0,
          class: L(["game-flip-slot", { "is-flipped": $.value }])
        }, [e("div", Ha, [u[5] || (u[5] = e("span", {
          class: "game-flip-back",
          "aria-hidden": "true"
        }, null, -1)), e("span", { class: L(["game-flip-front", `is-${f.value}`]) }, l(f.value === "bomb" ? "✸" : "¤"), 3)])], 2)) : G("", !0),
        e("div", ja, [m.value === 0 && !f.value ? (i(), o("span", Va, "尚未揭牌")) : G("", !0), (i(!0), o(T, null, S(m.value, (h) => (i(), o("b", {
          key: h,
          class: "game-revealed-coin"
        }, "¤"))), 128))]),
        e("div", qa, [(i(!0), o(T, null, S(d.value.remainingCards, (h) => (i(), o("i", {
          key: h,
          style: X({ "--card": h })
        }, null, 4))), 128))])
      ]),
      e("div", Qa, [
        e("div", null, [u[6] || (u[6] = e("span", null, "可收手", -1)), e("strong", null, "¤ " + l(d.value.cashoutAmount), 1)]),
        e("div", null, [u[7] || (u[7] = e("span", null, "余牌", -1)), e("strong", null, l(d.value.remainingCards), 1)]),
        e("div", null, [u[8] || (u[8] = e("span", null, "余雷", -1)), e("strong", null, l(d.value.remainingBombs), 1)]),
        e("div", null, [u[9] || (u[9] = e("span", null, "下一张风险", -1)), e("strong", null, l(c(d.value.nextBombProbabilityBps)), 1)])
      ]),
      u[10] || (u[10] = e("p", { class: "game-rule-note" }, "每枚金币增加 ¤ 50；翻到炸弹立即以零返还结束。", -1)),
      E.value && t.ending ? (i(), o("div", {
        key: 0,
        class: L(["game-reveal-outcome", `is-${t.ending.outcomeTone}`])
      }, [
        e("strong", null, l(t.ending.outcomeLabel), 1),
        e("em", null, l(t.ending.net > 0 ? "+" : "") + l(t.ending.net) + " 小白币", 1),
        e("button", {
          type: "button",
          class: "game-primary-action",
          onClick: u[1] || (u[1] = (h) => s("finished"))
        }, "回到大厅")
      ], 2)) : t.ending ? G("", !0) : (i(), o("div", Wa, [t.game.legalActions.includes("draw") ? (i(), o("button", {
        key: 0,
        type: "button",
        class: "game-primary-action",
        disabled: g.value,
        title: t.writeDisabledReason,
        onClick: u[2] || (u[2] = (h) => s("draw"))
      }, " 再翻一张 ", 8, Xa)) : G("", !0), t.game.legalActions.includes("cash-out") ? (i(), o("button", {
        key: 1,
        type: "button",
        class: "game-secondary-action",
        disabled: g.value,
        title: t.writeDisabledReason,
        onClick: u[3] || (u[3] = (h) => s("cashOut"))
      }, " 收手入账 ", 8, Ja)) : G("", !0)]))
    ]));
  }
}), el = Za, al = {
  class: "game-records",
  "aria-labelledby": "game-records-title"
}, ll = { class: "game-section-heading" }, tl = {
  key: 0,
  class: "game-record-list"
}, nl = {
  class: "game-record-mark",
  "aria-hidden": "true"
}, il = { class: "game-record-main" }, sl = ["datetime"], ul = { class: "game-record-money" }, rl = {
  key: 0,
  class: "game-record-detail"
}, ol = {
  key: 1,
  class: "game-record-detail"
}, dl = {
  key: 2,
  class: "game-record-steps"
}, vl = {
  key: 1,
  class: "game-record-empty"
}, ml = {
  key: 2,
  class: "game-inline-error",
  role: "status"
}, cl = ["disabled"], gl = /* @__PURE__ */ x({
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
    const B = Object.freeze({
      safe: "稳",
      medium: "中",
      risky: "险"
    });
    function n(s) {
      return new Intl.DateTimeFormat("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      }).format(new Date(s));
    }
    return (s, m) => (i(), o("section", al, [
      e("header", ll, [m[1] || (m[1] = e("div", null, [e("span", null, "HOUSE LEDGER"), e("h2", { id: "game-records-title" }, "牌桌记录")], -1)), e("small", null, l(t.total) + " 局", 1)]),
      t.records.length ? (i(), o("div", tl, [(i(!0), o(T, null, S(t.records, (d) => (i(), o("article", {
        key: d.id,
        class: L(["game-record", `is-${d.outcomeTone}`])
      }, [e("div", nl, l(d.game === "dice" ? "骰" : d.game === "push" ? "翻" : "阶"), 1), e("div", il, [
        e("header", null, [e("div", null, [e("span", null, l(d.gameLabel), 1), e("strong", null, l(d.outcomeLabel), 1)]), e("time", { datetime: new Date(d.createdAt).toISOString() }, l(n(d.createdAt)), 9, sl)]),
        e("div", ul, [
          e("span", null, "下注 ¤ " + l(d.amountIn), 1),
          e("span", null, "返还 ¤ " + l(d.payout), 1),
          e("strong", null, l(d.net > 0 ? "+" : "") + l(d.net), 1)
        ]),
        e("details", null, [m[2] || (m[2] = e("summary", null, "查看公开牌局", -1)), d.detail.kind === "dice" ? (i(), o("div", rl, [
          e("p", null, "终局叫数：" + l(d.detail.finalBid.count) + " 枚 " + l(d.detail.finalBid.face) + " 点", 1),
          e("p", null, "实际匹配：" + l(d.detail.matchingDiceCount) + " 枚 · " + l(d.detail.challenger === "player" ? "玩家" : "庄家") + "开骰", 1),
          e("p", null, "你的骰子：" + l(d.detail.playerDice.join(" · ")), 1)
        ])) : d.detail.kind === "push" ? (i(), o("div", ol, [e("p", null, "共翻出 " + l(d.detail.revealedCoins) + " 枚金币", 1)])) : (i(), o("ol", dl, [(i(!0), o(T, null, S(d.detail.steps, (f) => (i(), o("li", { key: f.floor }, " 第 " + l(f.floor) + " 层 · " + l(P(B)[f.choice]) + " · " + l(f.success ? `成功至 ¤ ${f.amountAfterStep}` : "挑战失败"), 1))), 128))]))])
      ])], 2))), 128))])) : (i(), o("div", vl, [...m[3] || (m[3] = [e("span", { "aria-hidden": "true" }, "◇", -1), e("p", null, "尚无结算记录", -1)])])),
      t.error ? (i(), o("p", ml, l(t.error), 1)) : G("", !0),
      t.hasMore ? (i(), o("button", {
        key: 3,
        type: "button",
        class: "game-load-more",
        disabled: t.loadingMore,
        onClick: m[0] || (m[0] = (d) => s.$emit("loadMore"))
      }, l(t.loadingMore ? "正在翻阅…" : "继续翻阅记录"), 9, cl)) : G("", !0)
    ]));
  }
}), bl = gl, fl = { class: "game-app" }, yl = { class: "game-header" }, pl = { class: "game-funds" }, hl = ["disabled"], kl = {
  class: "game-nav",
  "aria-label": "游戏页面"
}, $l = ["disabled"], wl = ["disabled"], Cl = {
  key: 1,
  class: "game-action-error",
  role: "status"
}, Dl = ["disabled"], Gl = { class: "game-scroll" }, V = 35e3, Al = /* @__PURE__ */ x({
  __name: "GameApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(t) {
    const B = /* @__PURE__ */ new Set([
      "busted",
      "failed",
      "cleared",
      "capped"
    ]), n = t, s = D(structuredClone(be(n.initialState))), m = D(s.value.activeGame?.kind || "lobby"), d = D(!1), f = D(!1), $ = D(!1), y = D(""), p = D(""), M = D(""), v = D(null), w = D(null), R = D(""), C = D(null);
    let E = () => {
    }, g = 0, c = 0;
    const b = _(() => s.value.status === "unconfirmed"), u = _(() => f.value ? "正在处理上一项操作" : d.value ? "正在刷新游戏状态" : s.value.status !== "ready" ? s.value.message || "游戏暂时不可写入" : s.value.generationActive ? "主剧情正在生成，请等待回复完成" : ""), h = _(() => d.value || f.value || b.value || s.value.status === "conflict"), A = _(() => s.value.records.find((r) => r.id === R.value) || null), Q = _(() => C.value?.kind === "push" ? C.value.game : s.value.activeGame?.kind === "push" ? s.value.activeGame : null), K = _(() => C.value?.kind === "ladder" ? C.value.game : s.value.activeGame?.kind === "ladder" ? s.value.activeGame : null);
    function z() {
      return typeof globalThis.crypto?.randomUUID == "function" ? `game-ui:${globalThis.crypto.randomUUID()}` : (c += 1, `game-ui:${Date.now()}:${c}`);
    }
    function Y() {
      return { chatIdentity: s.value.chatIdentity };
    }
    function H(r) {
      const a = r instanceof Error ? r.message : String(r);
      return a.includes("cannot be overdrawn") || a.includes("economy_insufficient_funds") ? "小白币余额不足，未能入局。" : a.includes("game_revision_conflict") || a.includes("game_event_id_conflict") ? "牌局已经变化，请重新读取后再操作。" : a.includes("game_dice_bid_not_higher") ? "叫数必须高于桌面当前叫数。" : a.includes("game_action_invalid") ? "当前牌局不接受这项操作。" : a.includes("game_main_generation_active") ? "主剧情正在生成，请等待回复完成。" : a.includes("game_push_cashout_invalid") || a.includes("game_ladder_cashout_invalid") ? "当前还不能收手。" : a.includes("聊天已切换") ? "聊天已切换，请重新打开游戏。" : a === "host_request_timeout" ? "等待落账结果超时；可用同一操作标识安全重试。" : "游戏操作未完成，请稍后重试。";
    }
    function ne(r, a) {
      return !B.has(a.outcome) && a.detail.kind !== "dice" ? null : r.kind === "dice" && a.detail.kind === "dice" ? {
        kind: "dice",
        record: a,
        detail: a.detail
      } : r.kind === "push" && a.detail.kind === "push" ? {
        kind: "push",
        record: a,
        game: r
      } : r.kind === "ladder" && a.detail.kind === "ladder" ? {
        kind: "ladder",
        record: a,
        game: r
      } : null;
    }
    function ie() {
      C.value = null;
    }
    function F(r) {
      ie(), m.value = r;
    }
    function j(r) {
      const a = s.value.activeGame;
      if (s.value = structuredClone(r), d.value = !1, $.value = !1, y.value = "", M.value = "", a && !r.activeGame) {
        const k = r.records.find((ge) => ge.gameId === a.id), I = k ? ne(a, k) : null;
        I ? (C.value = I, R.value = "", m.value = I.kind) : (R.value = k?.id || "", m.value = "lobby");
      } else r.activeGame && m.value !== "records" && m.value !== "lobby" ? m.value = r.activeGame.kind : !r.activeGame && m.value !== "records" && !C.value && (m.value = "lobby");
    }
    function se(r, a) {
      const k = {
        ...Y(),
        expectedRevision: s.value.revision,
        expectedEventId: s.value.eventId,
        actionId: a
      };
      return r.endpoint === "game/dice/start" || r.endpoint === "game/ladder/start" ? {
        ...k,
        bet: r.bet
      } : r.endpoint === "game/push/start" ? k : r.endpoint === "game/dice/bid" ? {
        ...k,
        gameId: r.gameId,
        bid: {
          count: r.bid.count,
          face: r.bid.face
        }
      } : r.endpoint === "game/ladder/step" ? {
        ...k,
        gameId: r.gameId,
        choice: r.choice
      } : {
        ...k,
        gameId: r.gameId
      };
    }
    async function N(r, a = z()) {
      if (u.value) return !1;
      const k = g;
      f.value = !0, p.value = "", w.value = null;
      try {
        const I = await n.bridge.request(r.endpoint, se(r, a), V);
        return k !== g ? !1 : (j(I.result), I.result.activeGame && (m.value = I.result.activeGame.kind), !0);
      } catch (I) {
        return k === g && (p.value = H(I), s.value.status === "unconfirmed" ? (v.value = null, w.value = null) : w.value = {
          request: r,
          actionId: a
        }), !1;
      } finally {
        k === g && (f.value = !1);
      }
    }
    function ue(r, a) {
      if (u.value || s.value.activeGame) return;
      const k = r === "dice" ? {
        heading: "确认入席秘骰对决",
        summary: `托管 ¤ ${a}，胜出返还下注的 1.8 倍。`,
        confirmLabel: "确认入席"
      } : r === "push" ? {
        heading: "确认揭开第一张牌",
        summary: "托管 ¤ 50。金币可以累积，炸弹会立即结束本局。",
        confirmLabel: "确认揭牌"
      } : {
        heading: "确认踏上鎏金阶梯",
        summary: `托管 ¤ ${a}，首层成功后才可收手。`,
        confirmLabel: "确认登阶"
      };
      v.value = {
        request: r === "dice" ? {
          endpoint: "game/dice/start",
          bet: a
        } : r === "push" ? { endpoint: "game/push/start" } : {
          endpoint: "game/ladder/start",
          bet: a
        },
        actionId: z(),
        ...k
      }, p.value = "";
    }
    function re() {
      const r = s.value.activeGame;
      r?.kind !== "dice" || !r.legalActions.includes("challenge") || (v.value = {
        request: {
          endpoint: "game/dice/challenge",
          gameId: r.id
        },
        actionId: z(),
        heading: "现在开骰？",
        summary: "双方骰盅将同时揭开，按桌面最终叫牌直接判定输赢。",
        confirmLabel: "确认开骰",
        danger: !0
      }, p.value = "");
    }
    function Z(r) {
      const a = s.value.activeGame;
      if (!a || a.kind !== r || !a.legalActions.includes("cash-out")) return;
      const k = a.cashoutAmount;
      v.value = {
        request: r === "push" ? {
          endpoint: "game/push/cash-out",
          gameId: a.id
        } : {
          endpoint: "game/ladder/cash-out",
          gameId: a.id
        },
        actionId: z(),
        heading: "现在收手？",
        summary: `本局将结束，并返还 ¤ ${k}。`,
        confirmLabel: "收手入账"
      }, p.value = "";
    }
    function oe() {
      const r = v.value;
      r && (v.value = null, N(r.request, r.actionId));
    }
    function de() {
      v.value = null, p.value = "";
    }
    async function ee() {
      if (h.value) return;
      const r = ++g;
      d.value = !0, y.value = "";
      try {
        const a = await n.bridge.request("game/refresh", Y(), V);
        r === g && j(a.result);
      } catch (a) {
        r === g && (y.value = H(a));
      } finally {
        r === g && (d.value = !1);
      }
    }
    async function ve() {
      if (d.value || f.value) return;
      const r = ++g;
      d.value = !0, y.value = "";
      try {
        const a = await n.bridge.request("game/confirm-save", Y(), V);
        r === g && j(a.result.state);
      } catch (a) {
        r === g && (y.value = H(a));
      } finally {
        r === g && (d.value = !1);
      }
    }
    async function me() {
      if (!s.value.hasMore || $.value || f.value) return;
      const r = g;
      $.value = !0, M.value = "";
      try {
        const a = await n.bridge.request("game/records/load-more", {
          ...Y(),
          offset: s.value.records.length
        }, V);
        if (r !== g) return;
        const k = new Set(s.value.records.map((I) => I.id));
        s.value.records.push(...a.result.records.filter((I) => !k.has(I.id))), s.value.total = a.result.total, s.value.hasMore = a.result.hasMore;
      } catch (a) {
        r === g && (M.value = H(a));
      } finally {
        r === g && ($.value = !1);
      }
    }
    function ce() {
      const r = w.value;
      r && N(r.request, r.actionId);
    }
    return J(() => {
      E = n.bridge.subscribe((r) => {
        if (r.type === "game/state") {
          const a = r.payload.state;
          f.value || (g += 1), p.value = "", w.value = null, j(a);
        }
        r.type === "game/error" && (y.value = "游戏状态暂时无法读取，请重新打开。");
      });
    }), fe(() => {
      g += 1, E(), v.value = null, w.value = null;
    }), (r, a) => (i(), o("main", fl, [
      e("header", yl, [
        a[19] || (a[19] = e("div", { class: "game-brand" }, [e("h1", null, "游戏")], -1)),
        e("div", pl, [e("span", null, [a[16] || (a[16] = e("small", null, "可用", -1)), e("strong", null, "¤ " + l(s.value.balance), 1)]), e("span", null, [a[17] || (a[17] = e("small", null, "托管", -1)), e("strong", null, "¤ " + l(s.value.lockedAmount), 1)])]),
        e("button", {
          type: "button",
          class: "game-refresh",
          disabled: h.value,
          title: "重新读取游戏",
          onClick: ee
        }, [...a[18] || (a[18] = [e("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [e("path", { d: "M20 7v5h-5M4 17v-5h5M18.2 9A7 7 0 0 0 6.1 6.7L4 9m16 6-2.1 2.3A7 7 0 0 1 5.8 15" })], -1), e("span", { class: "game-sr-only" }, "重新读取游戏", -1)])], 8, hl)
      ]),
      e("nav", kl, [
        e("button", {
          type: "button",
          class: L({ "is-active": m.value === "lobby" }),
          onClick: a[0] || (a[0] = (k) => F("lobby"))
        }, "大厅", 2),
        s.value.activeGame ? (i(), o("button", {
          key: 0,
          type: "button",
          class: L({ "is-active": m.value === s.value.activeGame.kind }),
          onClick: a[1] || (a[1] = (k) => m.value = s.value.activeGame?.kind || "lobby")
        }, [...a[20] || (a[20] = [ye(" 当前牌桌", -1), e("i", null, null, -1)])], 2)) : G("", !0),
        e("button", {
          type: "button",
          class: L({ "is-active": m.value === "records" }),
          onClick: a[2] || (a[2] = (k) => F("records"))
        }, "记录", 2)
      ]),
      s.value.message || y.value ? (i(), o("aside", {
        key: 0,
        class: L(["game-notice", `is-${s.value.status}`]),
        role: "status"
      }, [a[21] || (a[21] = e("span", { "aria-hidden": "true" }, "!", -1)), e("div", null, [
        e("strong", null, l(s.value.status === "unconfirmed" ? "落账待核实" : s.value.status === "conflict" ? "牌局状态冲突" : "游戏状态"), 1),
        e("p", null, l(y.value || s.value.message), 1),
        b.value ? (i(), o("button", {
          key: 0,
          type: "button",
          disabled: d.value,
          onClick: ve
        }, l(d.value ? "正在核实…" : "核实保存结果"), 9, $l)) : s.value.status === "blocked" ? (i(), o("button", {
          key: 1,
          type: "button",
          disabled: d.value,
          onClick: ee
        }, l(d.value ? "正在读取…" : "重新读取"), 9, wl)) : G("", !0)
      ])], 2)) : G("", !0),
      p.value && !v.value ? (i(), o("aside", Cl, [e("span", null, l(p.value), 1), w.value && s.value.status === "ready" ? (i(), o("button", {
        key: 0,
        type: "button",
        disabled: f.value,
        onClick: ce
      }, "重试同一操作", 8, Dl)) : G("", !0)])) : G("", !0),
      e("div", Gl, [A.value && m.value === "lobby" ? (i(), o("div", {
        key: 0,
        class: L(["game-result-banner", `is-${A.value.outcomeTone}`]),
        role: "status"
      }, [
        e("span", null, l(A.value.gameLabel), 1),
        e("strong", null, l(A.value.outcomeLabel), 1),
        e("em", null, l(A.value.net > 0 ? "+" : "") + l(A.value.net) + " 小白币", 1),
        e("button", {
          type: "button",
          onClick: a[3] || (a[3] = (k) => R.value = "")
        }, "关闭")
      ], 2)) : G("", !0), m.value === "lobby" ? (i(), O(Ua, {
        key: 1,
        "active-game": s.value.activeGame,
        balance: s.value.balance,
        "locked-amount": s.value.lockedAmount,
        "write-disabled-reason": u.value,
        onStart: ue,
        onContinue: a[4] || (a[4] = (k) => m.value = k)
      }, null, 8, [
        "active-game",
        "balance",
        "locked-amount",
        "write-disabled-reason"
      ])) : m.value === "dice" && s.value.activeGame?.kind === "dice" ? (i(), O(Ke, {
        key: 2,
        game: s.value.activeGame,
        "write-disabled-reason": u.value,
        onBid: a[5] || (a[5] = (k) => N({
          endpoint: "game/dice/bid",
          gameId: s.value.activeGame?.id || "",
          bid: k
        })),
        onChallenge: re,
        onLobby: a[6] || (a[6] = (k) => F("lobby"))
      }, null, 8, ["game", "write-disabled-reason"])) : m.value === "dice" && C.value?.kind === "dice" ? (i(), O(oa, {
        key: 3,
        record: C.value.record,
        detail: C.value.detail,
        onDone: a[7] || (a[7] = (k) => F("lobby"))
      }, null, 8, ["record", "detail"])) : m.value === "push" && Q.value ? (i(), O(el, {
        key: 4,
        game: Q.value,
        "write-disabled-reason": u.value,
        ending: C.value?.kind === "push" ? C.value.record : null,
        onDraw: a[8] || (a[8] = (k) => N({
          endpoint: "game/push/draw",
          gameId: s.value.activeGame?.id || ""
        })),
        onCashOut: a[9] || (a[9] = (k) => Z("push")),
        onLobby: a[10] || (a[10] = (k) => F("lobby")),
        onFinished: a[11] || (a[11] = (k) => F("lobby"))
      }, null, 8, [
        "game",
        "write-disabled-reason",
        "ending"
      ])) : m.value === "ladder" && K.value ? (i(), O(Da, {
        key: 5,
        game: K.value,
        "write-disabled-reason": u.value,
        ending: C.value?.kind === "ladder" ? C.value.record : null,
        onStep: a[12] || (a[12] = (k) => N({
          endpoint: "game/ladder/step",
          gameId: s.value.activeGame?.id || "",
          choice: k
        })),
        onCashOut: a[13] || (a[13] = (k) => Z("ladder")),
        onLobby: a[14] || (a[14] = (k) => F("lobby")),
        onFinished: a[15] || (a[15] = (k) => F("lobby"))
      }, null, 8, [
        "game",
        "write-disabled-reason",
        "ending"
      ])) : m.value === "records" ? (i(), O(bl, {
        key: 6,
        records: s.value.records,
        total: s.value.total,
        "has-more": s.value.hasMore,
        "loading-more": $.value,
        error: M.value,
        onLoadMore: me
      }, null, 8, [
        "records",
        "total",
        "has-more",
        "loading-more",
        "error"
      ])) : G("", !0)]),
      v.value ? (i(), O(we, {
        key: 2,
        heading: v.value.heading,
        summary: v.value.summary,
        "confirm-label": v.value.confirmLabel,
        danger: v.value.danger,
        onCancel: de,
        onConfirm: oe
      }, null, 8, [
        "heading",
        "summary",
        "confirm-label",
        "danger"
      ])) : G("", !0)
    ]));
  }
}), Ml = Al;
export {
  Ml as default
};
