/* eslint-disable */
import { A as $, B as h, F as b, R as A, T as R, V as u, _ as F, b as L, c, d as p, f as C, l as B, p as v, u as a, w as m, z as g } from "./xiaobai-os-runtime-dom.esm-bundler-DmE9neiz.js";
import { r as O } from "./xiaobai-os-room-catalog-cty4r0QV.js";
import { n as T, t as G } from "./xiaobai-os-GameResult-DJslu5kW.js";
var S = { class: "ladder-table" }, z = { class: "room-heading" }, w = { class: "ladder-prize" }, I = {
  class: "ladder-stairs",
  "aria-label": "五层阶梯"
}, V = {
  key: 0,
  "aria-hidden": "true"
}, j = { role: "status" }, E = { class: "ladder-next" }, M = { class: "ladder-paths" }, N = ["disabled", "onClick"], D = { "aria-hidden": "true" }, P = ["disabled"], U = /* @__PURE__ */ F({
  __name: "LadderTable",
  props: {
    game: {},
    disabledReason: {},
    stepping: { type: Boolean },
    settlement: {}
  },
  emits: [
    "step",
    "cashOut",
    "again",
    "lobby",
    "revealed"
  ],
  setup(t) {
    const o = t, l = b({ ...o.game }), d = b(!1), s = b(!1);
    let r;
    const f = {
      safe: {
        name: "稳着走",
        mark: "—"
      },
      medium: {
        name: "跨一步",
        mark: "↗"
      },
      risky: {
        name: "大胆跃",
        mark: "↟"
      }
    };
    function y(i) {
      clearTimeout(r), d.value = !0;
      const e = typeof matchMedia == "function" && matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 720;
      r = setTimeout(() => {
        i(), d.value = !1;
      }, e);
    }
    $(() => o.game.completedFloors, (i, e) => {
      i > e && y(() => {
        l.value = { ...o.game };
      });
    }), $(() => o.settlement, (i) => {
      if (!i || i.record.detail.kind !== "ladder" || i.record.outcome === "cashed-out") return;
      const e = i.record.detail.steps.at(-1);
      e && y(() => {
        s.value = !e.success, e.success && (l.value = {
          ...o.game,
          completedFloors: e.floor,
          cashoutAmount: e.amountAfterStep,
          canCashOut: !0
        });
      });
    }, { immediate: !0 });
    const k = B(() => !!o.disabledReason || o.stepping || d.value || !!o.settlement);
    return L(() => clearTimeout(r)), (i, e) => (m(), v("section", S, [
      a("header", z, [e[4] || (e[4] = a("div", null, [a("span", null, "走一段好运")], -1)), a("small", null, "本局筹码 ¤ " + u(t.game.bet), 1)]),
      a("div", { class: g(["ladder-landscape", {
        "is-climbing": t.stepping || d.value,
        "is-fallen": s.value
      }]) }, [
        a("div", w, [a("span", null, u(t.settlement && !d.value ? "这一局，拿回" : l.value.canCashOut ? "现在收手，带走" : "走过第一层就能收手"), 1), a("strong", null, u(t.settlement && !d.value ? "¤ " + t.settlement.record.payout : l.value.canCashOut ? "¤ " + l.value.cashoutAmount : "从这里出发"), 1)]),
        a("div", I, [(m(), v(c, null, R(5, (n) => a("div", {
          key: n,
          class: g(["ladder-stair", {
            "is-done": n <= l.value.completedFloors,
            "is-next": n === l.value.completedFloors + 1
          }]),
          style: h({ "--floor": n })
        }, [a("span", null, u(n), 1), n === 5 ? (m(), v("i", V, "✦")) : C("", !0)], 6)), 64)), a("span", {
          class: "ladder-traveler",
          style: h({ "--position": l.value.completedFloors }),
          "aria-hidden": "true"
        }, [...e[5] || (e[5] = [a("i", null, null, -1)])], 4)]),
        a("p", j, u(t.stepping || d.value ? "迈出这一步，看看能不能站稳…" : s.value ? "这一步没站稳，下局再来。" : l.value.completedFloors === 5 ? "五层登顶！" : "已走过 " + l.value.completedFloors + " 层 / 共 5 层"), 1)
      ], 2),
      t.settlement && !d.value ? (m(), p(G, {
        key: 0,
        record: t.settlement.record,
        "balance-after": t.settlement.balanceAfter,
        disabled: !!t.disabledReason,
        onRevealed: e[0] || (e[0] = (n) => i.$emit("revealed")),
        onAgain: e[1] || (e[1] = (n) => i.$emit("again")),
        onLobby: e[2] || (e[2] = (n) => i.$emit("lobby"))
      }, null, 8, [
        "record",
        "balance-after",
        "disabled"
      ])) : t.settlement ? C("", !0) : (m(), v(c, { key: 1 }, [
        a("div", E, [a("h3", null, "第 " + u(l.value.completedFloors + 1) + " 层，怎么走？", 1), e[6] || (e[6] = a("p", null, "成功继续向上，失败本局归零。", -1))]),
        a("div", M, [(m(!0), v(c, null, R(l.value.nextChoices, (n) => (m(), v("button", {
          key: n.choice,
          type: "button",
          class: g("is-" + n.choice),
          disabled: k.value,
          onClick: (J) => i.$emit("step", n.choice)
        }, [
          a("i", D, u(f[n.choice].mark), 1),
          a("strong", null, u(f[n.choice].name), 1),
          a("span", null, u(n.successProbabilityBps / 100) + "% 能走过", 1),
          e[7] || (e[7] = a("small", null, "走过后拿回", -1)),
          a("b", null, "¤ " + u(n.successAmount), 1)
        ], 10, N))), 128))]),
        a("button", {
          type: "button",
          class: "game-secondary-action ladder-cashout",
          disabled: k.value || !l.value.canCashOut,
          onClick: e[3] || (e[3] = (n) => i.$emit("cashOut"))
        }, u(l.value.canCashOut ? "就到这里，带走 ¤ " + l.value.cashoutAmount : "走过第一层后，可以收手"), 9, P)
      ], 64))
    ]));
  }
}), q = U, H = /* @__PURE__ */ F({
  __name: "LadderRoom",
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
    const o = t, l = B(() => o.settlement?.before.kind === "ladder" ? o.settlement.before : o.state.activeGame?.kind === "ladder" ? o.state.activeGame : null);
    return (d, s) => l.value ? (m(), p(q, {
      key: l.value.id,
      game: l.value,
      "disabled-reason": t.disabledReason,
      settlement: t.settlement,
      stepping: t.inFlight?.endpoint === "game/ladder/step",
      onStep: s[0] || (s[0] = (r) => d.$emit("action", {
        endpoint: "game/ladder/step",
        payload: {
          gameId: l.value.id,
          choice: r
        }
      })),
      onCashOut: s[1] || (s[1] = (r) => d.$emit("action", {
        endpoint: "game/ladder/cash-out",
        payload: { gameId: l.value.id }
      })),
      onRevealed: s[2] || (s[2] = (r) => d.$emit("revealed")),
      onAgain: s[3] || (s[3] = (r) => d.$emit("again")),
      onLobby: s[4] || (s[4] = (r) => d.$emit("lobby"))
    }, null, 8, [
      "game",
      "disabled-reason",
      "settlement",
      "stepping"
    ])) : (m(), p(T, {
      key: 1,
      kind: "ladder",
      minimum: 30,
      maximum: 300,
      step: 10,
      initial: 30,
      chips: [
        30,
        50,
        100,
        300
      ],
      balance: t.state.balance,
      "disabled-reason": t.disabledReason,
      "other-game": t.state.activeGame ? A(O)(t.state.activeGame.kind).name : "",
      rules: [
        "共五层，每一步都能选一条路。胜算越低，成功后的奖励越高。",
        "走过第一层，就能收手带走奖励；继续走，失败则本局归零。",
        "登顶自动结算，单局最多拿回 50,000 小白币。稳妥的路也有失败的可能。"
      ],
      onStart: s[5] || (s[5] = (r) => d.$emit("action", {
        endpoint: "game/ladder/start",
        payload: { bet: r }
      })),
      onResume: s[6] || (s[6] = (r) => d.$emit("resume"))
    }, null, 8, [
      "balance",
      "disabled-reason",
      "other-game"
    ]));
  }
}), X = H;
export {
  X as default
};
