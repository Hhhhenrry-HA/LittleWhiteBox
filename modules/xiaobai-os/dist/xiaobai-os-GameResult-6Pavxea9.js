/* eslint-disable */
import { F as r, K as p, L as c, M as $, X as C, _ as m, g as v, m as a, o as f, p as b, rt as i, tt as g, u as y, x as k, y as x } from "./xiaobai-os-runtime-dom.esm-bundler-BeaorYpU.js";
import { r as h } from "./xiaobai-os-room-catalog-BxdlQpsj.js";
var G = { class: "game-entry-art" }, N = ["src"], L = { class: "game-entry-rules" }, R = {
  key: 0,
  class: "game-entry-blocked"
}, B = {
  key: 1,
  class: "game-entry-stake"
}, S = {
  key: 0,
  class: "game-stake-chips",
  "aria-label": "选择下注"
}, z = ["aria-pressed", "onClick"], E = {
  key: 1,
  class: "game-stake-input"
}, V = [
  "min",
  "max",
  "step"
], M = { class: "game-entry-balance" }, T = ["disabled"], w = {
  key: 2,
  class: "game-inline-note",
  role: "status"
}, A = /* @__PURE__ */ k({
  __name: "GameEntry",
  props: {
    kind: {},
    minimum: {},
    maximum: {},
    step: {},
    initial: {},
    chips: {},
    rules: {},
    balance: {},
    disabledReason: {},
    otherGame: {}
  },
  emits: ["start", "resume"],
  setup(e) {
    const s = e, n = C(s.initial), d = b(() => h(s.kind)), u = b(() => s.disabledReason || (!Number.isSafeInteger(n.value) || n.value < s.minimum || n.value > s.maximum || n.value % s.step !== 0 ? `请选择 ${s.minimum}–${s.maximum}，每次 ${s.step} 小白币。` : s.balance < n.value ? "小白币不够，换个小一点的筹码吧。" : ""));
    return (o, t) => (r(), m("section", { class: g(["game-entry", "is-" + d.value.tone]) }, [
      a("div", G, [a("img", {
        src: d.value.artwork,
        alt: ""
      }, null, 8, N)]),
      a("ol", L, [(r(!0), m(y, null, c(e.rules, (l) => (r(), m("li", { key: l }, i(l), 1))), 128))]),
      e.otherGame ? (r(), m("div", R, [a("p", null, "还有一局" + i(e.otherGame) + "没结束，可以先逛逛，玩完再来。", 1), a("button", {
        type: "button",
        class: "game-primary-action",
        onClick: t[0] || (t[0] = (l) => o.$emit("resume"))
      }, "继续那一局")])) : (r(), m("div", B, [
        a("h3", null, i(e.minimum === e.maximum ? "本局入场" : "本局筹码"), 1),
        e.minimum !== e.maximum ? (r(), m("div", S, [(r(!0), m(y, null, c(e.chips, (l) => (r(), m("button", {
          key: l,
          type: "button",
          "aria-pressed": n.value === l,
          onClick: (K) => n.value = l
        }, [a("span", null, i(l), 1)], 8, z))), 128))])) : v("", !0),
        e.minimum !== e.maximum ? (r(), m("label", E, [
          t[3] || (t[3] = a("span", null, "自选", -1)),
          p(a("input", {
            "onUpdate:modelValue": t[1] || (t[1] = (l) => n.value = l),
            type: "number",
            min: e.minimum,
            max: e.maximum,
            step: e.step,
            "aria-label": "本局下注"
          }, null, 8, V), [[
            f,
            n.value,
            void 0,
            { number: !0 }
          ]]),
          t[4] || (t[4] = a("span", null, "小白币", -1))
        ])) : v("", !0),
        a("p", M, "可用 " + i(e.balance.toLocaleString("zh-CN")) + " 小白币 · 仅使用虚拟币", 1),
        a("button", {
          type: "button",
          class: "game-primary-action game-start",
          disabled: !!u.value,
          onClick: t[2] || (t[2] = (l) => o.$emit("start", n.value))
        }, " 下注 " + i(n.value || "—") + " · 开始 ", 9, T),
        u.value ? (r(), m("p", w, i(u.value), 1)) : v("", !0)
      ]))
    ], 2));
  }
}), j = A, D = { class: "game-result-net" }, F = ["disabled"], I = /* @__PURE__ */ k({
  __name: "GameResult",
  props: {
    record: {},
    balanceAfter: {},
    disabled: { type: Boolean }
  },
  emits: [
    "again",
    "lobby",
    "revealed"
  ],
  setup(e, { emit: s }) {
    const n = e, d = s;
    $(() => d("revealed"));
    const u = b(() => (n.record.net > 0 ? "+" : "") + n.record.net.toLocaleString("zh-CN"));
    return (o, t) => (r(), m("section", {
      class: g(["game-result", "is-" + e.record.outcomeTone]),
      "aria-label": "本局结算"
    }, [
      a("h3", null, i(e.record.outcomeLabel), 1),
      a("strong", D, [x(i(u.value), 1), t[2] || (t[2] = a("small", null, "小白币", -1))]),
      a("p", null, "下注 " + i(e.record.amountIn) + " · 拿回 " + i(e.record.payout) + "（含返还的本金）", 1),
      a("p", null, "现在有 " + i(e.balanceAfter.toLocaleString("zh-CN")) + " 小白币", 1),
      a("div", null, [a("button", {
        type: "button",
        class: "game-primary-action",
        disabled: e.disabled,
        onClick: t[0] || (t[0] = (l) => o.$emit("again"))
      }, " 再玩一局 ", 8, F), a("button", {
        type: "button",
        class: "game-secondary-action",
        onClick: t[1] || (t[1] = (l) => o.$emit("lobby"))
      }, "回大厅")])
    ], 2));
  }
}), q = I;
export {
  j as n,
  q as t
};
