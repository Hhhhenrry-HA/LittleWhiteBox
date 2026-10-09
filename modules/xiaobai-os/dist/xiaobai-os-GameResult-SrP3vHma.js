/* eslint-disable */
import { B as r, E as k, H as y, L as p, Q as C, _ as c, b, dt as s, lt as $, m as g, nt as f, u as x, v as a, w as h, x as u } from "./xiaobai-os-app-navigation-DbF27MCy.js";
import { r as G } from "./xiaobai-os-room-catalog-oSJ_1b4S.js";
var N = { class: "game-entry-art" }, B = ["src"], L = { class: "game-entry-rules" }, R = {
  key: 0,
  class: "game-entry-blocked"
}, E = {
  key: 1,
  class: "game-entry-stake"
}, S = {
  key: 0,
  class: "game-stake-chips",
  "aria-label": "选择下注"
}, z = ["aria-pressed", "onClick"], V = {
  key: 1,
  class: "game-stake-input"
}, w = [
  "min",
  "max",
  "step"
], T = { class: "game-entry-balance" }, A = ["disabled"], D = {
  key: 2,
  class: "game-inline-note",
  role: "status"
}, I = /* @__PURE__ */ k({
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
    const v = { balance: (i) => `可用 ${i.toLocaleString("zh-CN")} 小白币` }, t = e, n = f(t.initial), d = c(() => G(t.kind)), o = c(() => t.disabledReason || (!Number.isSafeInteger(n.value) || n.value < t.minimum || n.value > t.maximum || n.value % t.step !== 0 ? `请选择 ${t.minimum}–${t.maximum}，每次 ${t.step} 小白币。` : t.balance < n.value ? "小白币不够，换个小一点的筹码吧。" : ""));
    return (i, l) => (r(), u("section", { class: $(["game-entry", "is-" + d.value.tone]) }, [
      a("div", N, [a("img", {
        src: d.value.artwork,
        alt: ""
      }, null, 8, B)]),
      a("ol", L, [(r(!0), u(g, null, y(e.rules, (m) => (r(), u("li", { key: m }, s(m), 1))), 128))]),
      e.otherGame ? (r(), u("div", R, [a("p", null, "还有一局" + s(e.otherGame) + "没结束，可以先逛逛，玩完再来。", 1), a("button", {
        type: "button",
        class: "game-primary-action",
        onClick: l[0] || (l[0] = (m) => i.$emit("resume"))
      }, "继续那一局")])) : (r(), u("div", E, [
        a("h3", null, s(e.minimum === e.maximum ? "本局入场" : "本局筹码"), 1),
        e.minimum !== e.maximum ? (r(), u("div", S, [(r(!0), u(g, null, y(e.chips, (m) => (r(), u("button", {
          key: m,
          type: "button",
          "aria-pressed": n.value === m,
          onClick: (O) => n.value = m
        }, [a("span", null, s(m), 1)], 8, z))), 128))])) : b("", !0),
        e.minimum !== e.maximum ? (r(), u("label", V, [
          l[3] || (l[3] = a("span", null, "自选", -1)),
          C(a("input", {
            "onUpdate:modelValue": l[1] || (l[1] = (m) => n.value = m),
            type: "number",
            min: e.minimum,
            max: e.maximum,
            step: e.step,
            "aria-label": "本局下注"
          }, null, 8, w), [[
            x,
            n.value,
            void 0,
            { number: !0 }
          ]]),
          l[4] || (l[4] = a("span", null, "小白币", -1))
        ])) : b("", !0),
        a("p", T, s(v.balance(e.balance)), 1),
        a("button", {
          type: "button",
          class: "game-primary-action game-start",
          disabled: !!o.value,
          onClick: l[2] || (l[2] = (m) => i.$emit("start", n.value))
        }, " 下注 " + s(n.value || "—") + " · 开始 ", 9, A),
        o.value ? (r(), u("p", D, s(o.value), 1)) : b("", !0)
      ]))
    ], 2));
  }
}), U = I, M = { class: "game-result-net" }, F = ["disabled"], H = /* @__PURE__ */ k({
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
  setup(e, { emit: v }) {
    const t = e, n = v;
    p(() => n("revealed"));
    const d = c(() => (t.record.net > 0 ? "+" : "") + t.record.net.toLocaleString("zh-CN"));
    return (o, i) => (r(), u("section", {
      class: $(["game-result", "is-" + e.record.outcomeTone]),
      "aria-label": "本局结算"
    }, [
      a("h3", null, s(e.record.outcomeLabel), 1),
      a("strong", M, [h(s(d.value), 1), i[2] || (i[2] = a("small", null, "小白币", -1))]),
      a("p", null, "下注 " + s(e.record.amountIn) + " · 拿回 " + s(e.record.payout) + "（含返还的本金）", 1),
      a("p", null, "现在有 " + s(e.balanceAfter.toLocaleString("zh-CN")) + " 小白币", 1),
      a("div", null, [a("button", {
        type: "button",
        class: "game-primary-action",
        disabled: e.disabled,
        onClick: i[0] || (i[0] = (l) => o.$emit("again"))
      }, " 再玩一局 ", 8, F), a("button", {
        type: "button",
        class: "game-secondary-action",
        onClick: i[1] || (i[1] = (l) => o.$emit("lobby"))
      }, "回大厅")])
    ], 2));
  }
}), Y = H;
export {
  U as n,
  Y as t
};
