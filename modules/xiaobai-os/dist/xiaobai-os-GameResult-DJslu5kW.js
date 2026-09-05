/* eslint-disable */
import { F as $, M as f, S as h, T as b, V as l, _ as g, c as y, f as v, h as p, i as C, l as c, p as u, u as a, w as m, z as k } from "./xiaobai-os-runtime-dom.esm-bundler-DmE9neiz.js";
import { n as x } from "./xiaobai-os-room-catalog-cty4r0QV.js";
var G = { class: "game-entry-art" }, N = ["src"], R = { class: "game-entry-rules" }, S = {
  key: 0,
  class: "game-entry-blocked"
}, T = {
  key: 1,
  class: "game-entry-stake"
}, z = {
  key: 0,
  class: "game-stake-chips",
  "aria-label": "选择下注"
}, B = ["aria-pressed", "onClick"], L = {
  key: 1,
  class: "game-stake-input"
}, V = [
  "min",
  "max",
  "step"
], w = { class: "game-entry-balance" }, E = ["disabled"], M = {
  key: 2,
  class: "game-inline-note",
  role: "status"
}, A = /* @__PURE__ */ g({
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
    const i = e, n = $(i.initial), r = c(() => x(i.kind)), o = c(() => i.disabledReason || (!Number.isSafeInteger(n.value) || n.value < i.minimum || n.value > i.maximum || n.value % i.step !== 0 ? `请选择 ${i.minimum}–${i.maximum}，每次 ${i.step} 小白币。` : i.balance < n.value ? "小白币不够，换个小一点的筹码吧。" : ""));
    return (d, t) => (m(), u("section", { class: k(["game-entry", "is-" + r.value.tone]) }, [
      a("div", G, [a("img", {
        src: r.value.artwork,
        alt: ""
      }, null, 8, N), a("span", null, l(r.value.category) + " · 小白游艺室", 1)]),
      a("header", null, [a("h2", null, l(r.value.name), 1), a("p", null, l(r.value.tagline), 1)]),
      a("ol", R, [(m(!0), u(y, null, b(e.rules, (s) => (m(), u("li", { key: s }, l(s), 1))), 128))]),
      e.otherGame ? (m(), u("div", S, [a("p", null, "还有一局" + l(e.otherGame) + "没结束，可以先逛逛，玩完再来。", 1), a("button", {
        type: "button",
        class: "game-primary-action",
        onClick: t[0] || (t[0] = (s) => d.$emit("resume"))
      }, "继续那一局")])) : (m(), u("div", T, [
        a("h3", null, l(e.minimum === e.maximum ? "本局入场" : "拿多少筹码上桌？"), 1),
        e.minimum !== e.maximum ? (m(), u("div", z, [(m(!0), u(y, null, b(e.chips, (s) => (m(), u("button", {
          key: s,
          type: "button",
          "aria-pressed": n.value === s,
          onClick: (U) => n.value = s
        }, [a("span", null, l(s), 1)], 8, B))), 128))])) : v("", !0),
        e.minimum !== e.maximum ? (m(), u("label", L, [
          t[3] || (t[3] = a("span", null, "自选", -1)),
          f(a("input", {
            "onUpdate:modelValue": t[1] || (t[1] = (s) => n.value = s),
            type: "number",
            min: e.minimum,
            max: e.maximum,
            step: e.step,
            "aria-label": "本局下注"
          }, null, 8, V), [[
            C,
            n.value,
            void 0,
            { number: !0 }
          ]]),
          t[4] || (t[4] = a("span", null, "小白币", -1))
        ])) : v("", !0),
        a("p", w, "可用 " + l(e.balance.toLocaleString("zh-CN")) + " 小白币 · 仅使用虚拟币", 1),
        a("button", {
          type: "button",
          class: "game-primary-action game-start",
          disabled: !!o.value,
          onClick: t[2] || (t[2] = (s) => d.$emit("start", n.value))
        }, " 下注 " + l(n.value || "—") + "，开始玩 ", 9, E),
        o.value ? (m(), u("p", M, l(o.value), 1)) : v("", !0)
      ]))
    ], 2));
  }
}), H = A, D = { class: "game-result-net" }, F = ["disabled"], I = /* @__PURE__ */ g({
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
  setup(e, { emit: i }) {
    const n = e, r = i;
    h(() => r("revealed"));
    const o = c(() => (n.record.net > 0 ? "+" : "") + n.record.net.toLocaleString("zh-CN"));
    return (d, t) => (m(), u("section", {
      class: k(["game-result", "is-" + e.record.outcomeTone]),
      "aria-label": "本局结算"
    }, [
      a("small", null, "这一局，" + l(e.record.outcomeTone === "win" ? "赢得漂亮" : e.record.outcomeTone === "loss" ? "下次再会" : "见好就收"), 1),
      a("h3", null, l(e.record.outcomeLabel), 1),
      a("strong", D, [p(l(o.value), 1), t[2] || (t[2] = a("small", null, "小白币", -1))]),
      a("p", null, "下注 " + l(e.record.amountIn) + " · 拿回 " + l(e.record.payout) + "（含返还的本金）", 1),
      a("p", null, "现在有 " + l(e.balanceAfter.toLocaleString("zh-CN")) + " 小白币", 1),
      a("div", null, [a("button", {
        type: "button",
        class: "game-primary-action",
        disabled: e.disabled,
        onClick: t[0] || (t[0] = (s) => d.$emit("again"))
      }, " 再玩一局 ", 8, F), a("button", {
        type: "button",
        class: "game-secondary-action",
        onClick: t[1] || (t[1] = (s) => d.$emit("lobby"))
      }, "回大厅")])
    ], 2));
  }
}), J = I;
export {
  H as n,
  J as t
};
