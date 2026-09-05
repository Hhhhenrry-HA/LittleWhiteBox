/* eslint-disable */
import { A as v, F as b, R, T as B, V as d, _ as w, b as A, c as k, d as h, f as T, h as g, l as c, p as f, u as e, w as m, z as p } from "./xiaobai-os-runtime-dom.esm-bundler-DmE9neiz.js";
import { r as P } from "./xiaobai-os-room-catalog-cty4r0QV.js";
import { n as G, t as F } from "./xiaobai-os-GameResult-DJslu5kW.js";
var L = { class: "push-table" }, N = { class: "room-heading" }, V = { class: "push-felt" }, z = { class: "push-pot" }, D = { class: "push-card-stage" }, I = { class: "push-card-inner" }, O = {
  class: "push-table-talk",
  role: "status"
}, S = ["aria-label"], E = { class: "push-odds" }, M = { class: "room-actions" }, U = ["disabled"], j = ["disabled"], q = /* @__PURE__ */ w({
  __name: "PushTable",
  props: {
    game: {},
    disabledReason: {},
    drawing: { type: Boolean },
    settlement: {}
  },
  emits: [
    "draw",
    "cashOut",
    "again",
    "lobby",
    "revealed"
  ],
  setup(t) {
    const o = t, l = b({ ...o.game }), i = b(null), s = b(!1);
    let u;
    function y(n, a) {
      clearTimeout(u), i.value = n, s.value = !0;
      const r = typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 660;
      u = setTimeout(() => {
        a(), s.value = !1;
      }, r);
    }
    v(() => o.drawing, (n) => {
      n && (i.value = null);
    }), v(() => o.game.revealedCoins, (n, a) => {
      n > a && y("coin", () => {
        l.value = { ...o.game };
      });
    }), v(() => o.settlement, (n) => {
      !n || n.record.detail.kind !== "push" || n.record.outcome !== "cashed-out" && y(n.record.outcome === "busted" ? "bomb" : "coin", () => {
        n.record.detail.kind === "push" && (l.value = {
          ...o.game,
          revealedCoins: n.record.detail.revealedCoins,
          cashoutAmount: n.record.payout
        });
      });
    }, { immediate: !0 });
    const $ = c(() => !!o.disabledReason || o.drawing || s.value || !!o.settlement), C = c(() => (l.value.nextBombProbabilityBps / 100).toLocaleString("zh-CN", { maximumFractionDigits: 2 }));
    return A(() => clearTimeout(u)), (n, a) => (m(), f("section", L, [
      e("header", N, [a[5] || (a[5] = e("div", null, [e("span", null, "凭一点手气")], -1)), e("small", null, "本局筹码 ¤ " + d(t.game.bet), 1)]),
      e("div", V, [
        e("div", z, [e("span", null, d(t.settlement && !s.value ? "这一局，拿回" : "现在收手，带走"), 1), e("strong", null, "¤ " + d(l.value.cashoutAmount), 1)]),
        e("div", D, [a[7] || (a[7] = e("div", {
          class: "push-deck",
          "aria-hidden": "true"
        }, [
          e("i"),
          e("i"),
          e("i")
        ], -1)), e("div", { class: p(["push-card", {
          "is-turning": s.value,
          "is-revealed": i.value,
          "is-waiting": t.drawing
        }]) }, [e("div", I, [a[6] || (a[6] = e("span", {
          class: "push-card-back",
          "aria-hidden": "true"
        }, [e("b", null, "金")], -1)), e("span", {
          class: p(["push-card-face", { "is-bomb": t.settlement ? t.settlement.record.outcomeLabel : i.value === "bomb" }]),
          "aria-hidden": "true"
        }, [e("b", null, d(i.value === "bomb" ? "✹" : "¤"), 1), e("small", null, d(i.value === "bomb" ? "炸弹" : "+50"), 1)], 2)])], 2)]),
        e("p", O, d(t.drawing ? "牌还没亮，稍等一下…" : s.value ? "翻开看看…" : i.value === "bomb" ? "哎呀，是炸弹。" : i.value === "coin" ? "是金币！还要再来一张吗？" : "牌已洗好，翻一张试试手气。"), 1),
        e("div", {
          class: "push-coins",
          "aria-label": "已找到 " + l.value.revealedCoins + " 张金币"
        }, [(m(), f(k, null, B(7, (r) => e("span", {
          key: r,
          class: p({ "is-found": r <= l.value.revealedCoins }),
          "aria-hidden": "true"
        }, "¤", 2)), 64))], 8, S)
      ]),
      t.settlement && !s.value ? (m(), h(F, {
        key: 0,
        record: t.settlement.record,
        "balance-after": t.settlement.balanceAfter,
        disabled: !!t.disabledReason,
        onRevealed: a[0] || (a[0] = (r) => n.$emit("revealed")),
        onAgain: a[1] || (a[1] = (r) => n.$emit("again")),
        onLobby: a[2] || (a[2] = (r) => n.$emit("lobby"))
      }, null, 8, [
        "record",
        "balance-after",
        "disabled"
      ])) : t.settlement ? T("", !0) : (m(), f(k, { key: 1 }, [
        e("div", E, [e("span", null, [
          a[8] || (a[8] = g("还剩 ", -1)),
          e("b", null, d(l.value.remainingCards), 1),
          a[9] || (a[9] = g(" 张牌，其中 ", -1)),
          e("b", null, d(l.value.remainingBombs), 1),
          a[10] || (a[10] = g(" 张炸弹", -1))
        ]), e("small", null, "下一张翻到炸弹的概率 " + d(C.value) + "%", 1)]),
        e("div", M, [e("button", {
          type: "button",
          class: "game-primary-action",
          disabled: $.value,
          onClick: a[3] || (a[3] = (r) => n.$emit("draw"))
        }, d(l.value.revealedCoins ? "再翻一张" : "翻第一张"), 9, U), e("button", {
          type: "button",
          class: "game-secondary-action",
          disabled: $.value || !t.game.legalActions.includes("cash-out"),
          onClick: a[4] || (a[4] = (r) => n.$emit("cashOut"))
        }, " 收手，拿走 ¤ " + d(l.value.cashoutAmount), 9, j)]),
        a[11] || (a[11] = e("p", { class: "game-help" }, "每张金币 +50；翻到炸弹，本局归零。", -1))
      ], 64))
    ]));
  }
}), H = q, J = /* @__PURE__ */ w({
  __name: "PushRoom",
  props: {
    state: {},
    disabledReason: {},
    inFlight: {},
    settlement: {}
  },
  emits: [
    "action",
    "again",
    "lobby",
    "revealed",
    "resume"
  ],
  setup(t) {
    const o = t, l = c(() => o.settlement?.before.kind === "push" ? o.settlement.before : o.state.activeGame?.kind === "push" ? o.state.activeGame : null);
    return (i, s) => l.value ? (m(), h(H, {
      key: l.value.id,
      game: l.value,
      "disabled-reason": t.disabledReason,
      settlement: t.settlement,
      drawing: t.inFlight?.endpoint === "game/push/draw",
      onDraw: s[0] || (s[0] = (u) => i.$emit("action", {
        endpoint: "game/push/draw",
        payload: { gameId: l.value.id }
      })),
      onCashOut: s[1] || (s[1] = (u) => i.$emit("action", {
        endpoint: "game/push/cash-out",
        payload: { gameId: l.value.id }
      })),
      onRevealed: s[2] || (s[2] = (u) => i.$emit("revealed")),
      onAgain: s[3] || (s[3] = (u) => i.$emit("again")),
      onLobby: s[4] || (s[4] = (u) => i.$emit("lobby"))
    }, null, 8, [
      "game",
      "disabled-reason",
      "settlement",
      "drawing"
    ])) : (m(), h(G, {
      key: 1,
      kind: "push",
      minimum: 50,
      maximum: 50,
      step: 1,
      initial: 50,
      chips: [50],
      balance: t.state.balance,
      "disabled-reason": t.disabledReason,
      "other-game": t.state.activeGame ? R(P)(t.state.activeGame.kind).name : "",
      rules: [
        "一副十张牌：七张金币，三张炸弹。每局下注 50 小白币。",
        "每翻出一张金币，攒下 50 小白币。随时收手，把攒下的钱带走。",
        "翻到炸弹，本局一分也拿不走。七张金币全找到，自动结算。"
      ],
      onStart: s[5] || (s[5] = (u) => i.$emit("action", { endpoint: "game/push/start" })),
      onResume: s[6] || (s[6] = (u) => i.$emit("resume"))
    }, null, 8, [
      "balance",
      "disabled-reason",
      "other-game"
    ]));
  }
}), X = J;
export {
  X as default
};
