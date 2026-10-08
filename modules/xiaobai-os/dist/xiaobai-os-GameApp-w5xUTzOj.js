/* eslint-disable */
import { B as o, E as J, H as W, N as ne, Q as te, W as Y, Y as O, _ as E, at as q, b as _, ct as t, d as re, dt as b, h as oe, it as ie, j as Z, lt as X, m as P, nt as h, r as ue, u as se, v as a, w as le, x as m, y as z } from "./xiaobai-os-app-navigation-DbF27MCy.js";
import { n as de, r as H, t as ee } from "./xiaobai-os-room-catalog-CkYfL_60.js";
function ae(i) {
  return i && typeof i == "object" && "code" in i ? String(i.code) : "";
}
function Q(i) {
  const g = i instanceof Error ? i.message : String(i);
  return g.includes("economy_insufficient_funds") || g.includes("cannot be overdrawn") ? "小白币不够了，换个小一点的筹码吧。" : g.includes("game_dice_bid_not_higher") ? "这次要叫得比对方更大一些。" : g.includes("game_revision_conflict") || g.includes("game_event_id_conflict") ? "本局已有变化，请重新加载后继续。" : g.includes("game_main_generation_active") ? "故事正在回复，等回复结束就能继续玩。" : g.includes("聊天已切换") ? "聊天已切换，请重新打开游戏。" : g === "host_request_timeout" ? "暂时没收到结果。可以重试这次操作，不会重复下注或重新抽取结果。" : "这次操作没能完成，请重试。";
}
function ve(i, g) {
  const e = h(structuredClone(q(g))), l = h(null), u = h(null), p = h(null), v = h(!1), c = h(!1), I = h(""), T = h(""), G = h(null);
  let k = !1, C = 0, S = 0, w = 0, K = 0;
  function x() {
    return typeof globalThis.crypto?.randomUUID == "function" ? "game-ui:" + globalThis.crypto.randomUUID() : "game-ui:" + Date.now() + ":" + ++K;
  }
  const D = E(() => ["unconfirmed", "save-failed"].includes(e.value.status)), f = E(() => v.value || !!p.value), $ = E(() => f.value ? "上一项操作还在进行，请稍候。" : e.value.status !== "ready" ? e.value.message || "游戏正在准备，请稍候。" : G.value ? "请先重试这次操作，或重新加载本局结果。" : e.value.generationActive ? "故事正在回复，等回复结束就能继续玩。" : ""), A = E(() => u.value ?? {
    balance: e.value.balance,
    lockedAmount: e.value.lockedAmount
  }), M = E(() => f.value || D.value || [
    "conflict",
    "saving",
    "loading"
  ].includes(e.value.status));
  function R(r) {
    const y = e.value;
    if (y.chatIdentity !== r.chatIdentity)
      l.value = null, u.value = null, G.value = null, p.value = null, v.value = !1, S += 1, w += 1;
    else if (y.activeGame && r.status === "ready" && !r.activeGame) {
      const s = r.records.find((n) => n.gameId === y.activeGame.id);
      s && (u.value = {
        balance: y.balance,
        lockedAmount: y.lockedAmount
      }, l.value = {
        before: structuredClone(q(y.activeGame)),
        record: structuredClone(s),
        balanceAfter: r.balance
      });
    }
    e.value = structuredClone(r), c.value = !1, T.value = "", I.value = "", G.value = null;
  }
  function B(r) {
    const y = r === "game_save_pending" ? "save-failed" : r === "storage_unconfirmed" ? "unconfirmed" : r === "storage_conflict" ? "conflict" : null;
    return y ? (e.value = {
      ...e.value,
      status: y,
      message: y === "save-failed" ? "这局还没保存好，请重试保存后继续。" : y === "unconfirmed" ? "还不确定是否保存成功，请先检查保存。" : "服务器上的游戏记录与当前内容不同，请重新打开酒馆后继续。"
    }, !0) : !1;
  }
  async function L(r) {
    const y = e.value.chatIdentity, s = C, n = w;
    p.value = r.action, G.value = null, I.value = "";
    try {
      const d = await i.request(r.endpoint, r.payload, 35e3);
      return k || n !== w || e.value.chatIdentity !== y ? !1 : (C === s && R(d.result), !0);
    } catch (d) {
      return !k && n === w && C === s && e.value.chatIdentity === y && !B(ae(d)) && (I.value = Q(d), e.value.status === "ready" && (G.value = r)), !1;
    } finally {
      !k && n === w && e.value.chatIdentity === y && (p.value = null);
    }
  }
  async function N(r) {
    return k || $.value ? !1 : L({
      endpoint: r.endpoint,
      action: structuredClone(q(r)),
      payload: {
        ...structuredClone(q(r.payload || {})),
        chatIdentity: e.value.chatIdentity,
        expectedRevision: e.value.revision,
        expectedEventId: e.value.eventId,
        actionId: x()
      }
    });
  }
  async function V() {
    return k || !G.value || f.value || e.value.status !== "ready" || e.value.generationActive ? !1 : L(structuredClone(q(G.value)));
  }
  async function F(r = !1) {
    if (k || f.value || !r && M.value) return;
    const y = e.value.chatIdentity, s = C, n = ++S;
    v.value = !0, I.value = "";
    try {
      const d = await i.request(r ? "game/confirm-save" : "game/refresh", { chatIdentity: y }, 35e3);
      if (k || n !== S || e.value.chatIdentity !== y) return;
      s === C && R("state" in d.result ? d.result.state : d.result), G.value = null;
    } catch (d) {
      !k && n === S && s === C && e.value.chatIdentity === y && (B(ae(d)) || (I.value = Q(d)));
    } finally {
      n === S && (v.value = !1);
    }
  }
  async function U() {
    if (k || !e.value.hasMore || c.value || f.value || e.value.status !== "ready") return;
    const r = C, y = e.value.chatIdentity;
    c.value = !0, T.value = "";
    try {
      const s = await i.request("game/records/load-more", {
        chatIdentity: y,
        offset: e.value.records.length
      }, 35e3);
      if (k || r !== C || y !== e.value.chatIdentity) return;
      const n = new Set(e.value.records.map((d) => d.id));
      e.value.records.push(...s.result.records.filter((d) => !n.has(d.id))), e.value.total = s.result.total, e.value.hasMore = s.result.hasMore;
    } catch (s) {
      !k && r === C && y === e.value.chatIdentity && (T.value = Q(s));
    } finally {
      r === C && (c.value = !1);
    }
  }
  const j = i.subscribe((r) => {
    k || (r.type === "game/state" ? (C += 1, R(r.payload.state)) : r.type === "game/error" && (I.value = "游戏暂时无法读取，请重新打开。"));
  });
  return {
    state: e,
    settlement: l,
    funds: A,
    inFlight: p,
    reading: v,
    loadingMore: c,
    busy: f,
    error: I,
    recordsError: T,
    failed: G,
    disabledReason: $,
    needsSave: D,
    refreshDisabled: M,
    act: N,
    retry: V,
    loadMore: U,
    refresh: () => F(),
    confirmSave: () => F(!0),
    revealComplete: () => {
      u.value = null;
    },
    dismissSettlement: () => {
      l.value = null, u.value = null;
    },
    dispose: () => {
      k = !0, S += 1, j();
    }
  };
}
var ce = { class: "game-lobby" }, me = ["src"], ye = { class: "game-search" }, fe = {
  class: "game-categories",
  "aria-label": "游戏分类"
}, ge = ["aria-pressed", "onClick"], be = { class: "game-shelf" }, pe = ["data-game-room", "onClick"], he = { class: "game-tile-art" }, ke = ["src"], _e = ["src"], $e = { class: "game-tile-copy" }, Ce = {
  key: 1,
  class: "game-empty"
}, Ge = /* @__PURE__ */ J({
  __name: "GameLobby",
  props: { activeGame: {} },
  emits: ["open"],
  setup(i) {
    const g = h(""), e = h("全部"), l = ["全部", ...new Set(ee.map((p) => p.category))], u = E(() => ee.filter((p) => (e.value === "全部" || p.category === e.value) && (p.name + p.tagline + p.category).includes(g.value.trim())));
    return (p, v) => (o(), m("section", ce, [
      i.activeGame ? (o(), m("button", {
        key: 0,
        type: "button",
        class: "game-continue",
        onClick: v[0] || (v[0] = (c) => p.$emit("open", i.activeGame.kind))
      }, [
        a("img", {
          src: t(H)(i.activeGame.kind).artwork,
          alt: ""
        }, null, 8, me),
        a("span", null, [v[3] || (v[3] = a("small", null, "进行中", -1)), a("strong", null, b(t(H)(i.activeGame.kind).name), 1)]),
        v[4] || (v[4] = a("b", null, "继续 →", -1))
      ])) : _("", !0),
      a("label", ye, [v[5] || (v[5] = a("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, [a("circle", {
        cx: "10.5",
        cy: "10.5",
        r: "6.5"
      }), a("path", { d: "m16 16 4 4" })], -1)), te(a("input", {
        "onUpdate:modelValue": v[1] || (v[1] = (c) => g.value = c),
        type: "search",
        placeholder: "找个游戏",
        "aria-label": "搜索游戏"
      }, null, 512), [[se, g.value]])]),
      a("nav", fe, [(o(), m(P, null, W(l, (c) => a("button", {
        key: c,
        type: "button",
        "aria-pressed": e.value === c,
        onClick: (I) => e.value = c
      }, b(c), 9, ge)), 64))]),
      a("div", be, [(o(!0), m(P, null, W(u.value, (c) => (o(), m("button", {
        key: c.id,
        type: "button",
        class: X(["game-tile", "tone-" + c.tone]),
        "data-game-room": c.id,
        onClick: (I) => p.$emit("open", c.id)
      }, [a("div", he, [a("img", {
        src: c.artwork,
        alt: "",
        loading: "lazy"
      }, null, 8, ke), "mascotPortrait" in c ? (o(), m("img", {
        key: 0,
        class: "game-tile-mascot",
        src: c.mascotPortrait,
        alt: "",
        loading: "lazy"
      }, null, 8, _e)) : _("", !0)]), a("div", $e, [a("h3", null, b(c.name), 1), a("span", null, [le(b(c.entry) + " ", 1), v[6] || (v[6] = a("i", { "aria-hidden": "true" }, "↗", -1))])])], 10, pe))), 128))]),
      u.value.length ? _("", !0) : (o(), m("div", Ce, [
        v[7] || (v[7] = a("h3", null, "没找到这个游戏", -1)),
        v[8] || (v[8] = a("p", null, "换个名字，或者看看其他分类。", -1)),
        a("button", {
          type: "button",
          onClick: v[2] || (v[2] = (c) => {
            g.value = "", e.value = "全部";
          })
        }, " 查看全部 ")
      ]))
    ]));
  }
}), Ie = Ge, Se = {
  class: "game-records",
  "aria-labelledby": "game-records-title"
}, we = { class: "game-section-heading" }, Ae = {
  key: 0,
  class: "game-record-list"
}, Me = {
  class: "game-record-mark",
  "aria-hidden": "true"
}, Re = { class: "game-record-main" }, Be = ["datetime"], Ee = { class: "game-record-money" }, Te = {
  key: 1,
  class: "game-record-empty"
}, De = {
  key: 2,
  class: "game-inline-error",
  role: "status"
}, Le = ["disabled"], Ne = /* @__PURE__ */ J({
  __name: "GameRecords",
  props: {
    records: {},
    total: {},
    hasMore: { type: Boolean },
    loadingMore: { type: Boolean },
    error: {}
  },
  emits: ["loadMore"],
  setup(i) {
    function g(e) {
      return new Intl.DateTimeFormat("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      }).format(new Date(e));
    }
    return (e, l) => (o(), m("section", Se, [
      a("header", we, [l[1] || (l[1] = a("div", null, [a("h2", { id: "game-records-title" }, "记录")], -1)), a("small", null, b(i.total) + " 局", 1)]),
      i.records.length ? (o(), m("div", Ae, [(o(!0), m(P, null, W(i.records, (u) => (o(), m("article", {
        key: u.id,
        class: X(["game-record", `is-${u.outcomeTone}`])
      }, [a("div", Me, b(t(H)(u.game).mark), 1), a("div", Re, [
        a("header", null, [a("div", null, [a("span", null, b(u.gameLabel), 1), a("strong", null, b(u.outcomeLabel), 1)]), a("time", { datetime: new Date(u.createdAt).toISOString() }, b(g(u.createdAt)), 9, Be)]),
        a("div", Ee, [
          a("span", null, "下注 ¤ " + b(u.amountIn), 1),
          a("span", null, "拿回 ¤ " + b(u.payout), 1),
          a("strong", null, b(u.net > 0 ? "+" : "") + b(u.net), 1)
        ]),
        a("details", null, [l[2] || (l[2] = a("summary", null, "本局详情", -1)), (o(), z(Y(t(H)(u.game).record), { detail: u.detail }, null, 8, ["detail"]))])
      ])], 2))), 128))])) : (o(), m("div", Te, [...l[3] || (l[3] = [a("span", { "aria-hidden": "true" }, "◇", -1), a("p", null, "暂无游戏记录", -1)])])),
      i.error ? (o(), m("p", De, b(i.error), 1)) : _("", !0),
      i.hasMore ? (o(), m("button", {
        key: 3,
        type: "button",
        class: "game-load-more",
        disabled: i.loadingMore,
        onClick: l[0] || (l[0] = (u) => e.$emit("loadMore"))
      }, b(i.loadingMore ? "正在翻阅…" : "更多记录"), 9, Le)) : _("", !0)
    ]));
  }
}), Ue = Ne, xe = { class: "game-header" }, ze = {
  key: 1,
  class: "game-funds",
  "aria-label": "可用小白币"
}, Fe = {
  key: 0,
  class: "game-nav",
  "aria-label": "游戏页面"
}, qe = ["aria-current"], Ve = ["aria-current"], je = ["aria-current"], Oe = {
  key: 1,
  class: "game-notice",
  role: "status"
}, Pe = ["disabled"], He = ["disabled"], Ke = ["disabled"], Qe = {
  key: 0,
  class: "game-empty",
  role: "status"
}, We = {
  key: 1,
  class: "game-empty",
  role: "status"
}, Ye = /* @__PURE__ */ J({
  __name: "GameApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(i) {
    const g = i, e = ve(g.bridge, g.initialState), { state: l, settlement: u, funds: p, inFlight: v, reading: c, loadingMore: I, busy: T, error: G, recordsError: k, failed: C, disabledReason: S, needsSave: w, refreshDisabled: K } = e, x = h(null);
    let D = 0;
    const f = h(l.value.activeGame ? "room" : "lobby"), $ = h(l.value.activeGame?.kind || null), A = ie(null), M = h(""), R = h(!1);
    let B = 0;
    const L = E(() => $.value ? de($.value) : null), N = E(() => f.value === "room" && L.value?.mode === "standalone");
    async function V() {
      const s = L.value, n = ++B;
      if (A.value = null, M.value = "", !!s) {
        R.value = !0;
        try {
          const d = await s.load();
          n === B && (A.value = d.default);
        } catch {
          n === B && (M.value = "这个游戏暂时没能打开，再试一次吧。");
        } finally {
          n === B && (R.value = !1);
        }
      }
    }
    O([
      f,
      $,
      () => !!l.value.activeGame,
      () => !!u.value
    ], (s, n) => {
      n[0] === "lobby" && (D = x.value?.scrollTop || 0), Z(() => {
        x.value?.scrollTo({ top: f.value === "lobby" ? D : 0 });
      });
    }), O($, V, { immediate: !0 }), O(u, (s) => {
      s && ($.value = s.record.game);
    }), O(() => l.value.chatIdentity, () => {
      D = 0, $.value = l.value.activeGame?.kind || null, f.value = $.value ? "room" : "lobby", Z(() => {
        D = 0, x.value?.scrollTo({ top: 0 });
      });
    });
    function F(s) {
      $.value = s, f.value = "room";
    }
    function U(s) {
      e.dismissSettlement(), f.value = s;
    }
    ue(() => f.value === "lobby" ? !1 : (U("lobby"), !0));
    function j() {
      l.value.activeGame && F(l.value.activeGame.kind);
    }
    function r() {
      e.dismissSettlement();
    }
    async function y(s) {
      await e.act(s);
    }
    return ne(() => {
      B += 1, e.dispose();
    }), (s, n) => (o(), m("main", { class: X(["game-app", { "game-app-standalone": N.value }]) }, [
      a("header", xe, [
        f.value === "room" ? (o(), m("button", {
          key: 0,
          type: "button",
          class: "game-back",
          "aria-label": "返回游戏大厅",
          onClick: n[0] || (n[0] = (d) => U("lobby"))
        }, " ‹ ")) : _("", !0),
        a("h1", null, b(f.value === "room" ? L.value?.name : "游戏"), 1),
        N.value ? _("", !0) : (o(), m("div", ze, [a("strong", null, "¤ " + b(t(p).balance.toLocaleString("zh-CN")), 1)]))
      ]),
      N.value ? _("", !0) : (o(), m("nav", Fe, [
        a("button", {
          type: "button",
          "aria-current": f.value === "lobby" ? "page" : void 0,
          onClick: n[1] || (n[1] = (d) => U("lobby"))
        }, " 大厅 ", 8, qe),
        t(l).activeGame ? (o(), m("button", {
          key: 0,
          type: "button",
          "aria-current": f.value === "room" && $.value === t(l).activeGame.kind ? "page" : void 0,
          onClick: j
        }, [...n[7] || (n[7] = [le(" 继续 ", -1), a("i", null, null, -1)])], 8, Ve)) : _("", !0),
        a("button", {
          type: "button",
          "aria-current": f.value === "records" ? "page" : void 0,
          onClick: n[2] || (n[2] = (d) => U("records"))
        }, " 记录 ", 8, je)
      ])),
      !N.value && (t(l).message || t(G) || t(l).generationActive) ? (o(), m("aside", Oe, [
        a("p", null, b(t(G) || t(l).message || "故事正在回复，等回复结束就能继续玩。"), 1),
        t(w) ? (o(), m("button", {
          key: 0,
          type: "button",
          disabled: t(T),
          onClick: n[3] || (n[3] = (...d) => t(e).confirmSave && t(e).confirmSave(...d))
        }, b(t(c) ? "正在检查…" : t(l).status === "save-failed" ? "重试保存" : "检查保存"), 9, Pe)) : t(C) ? (o(), m("button", {
          key: 1,
          type: "button",
          disabled: t(T) || t(l).generationActive,
          onClick: n[4] || (n[4] = (...d) => t(e).retry && t(e).retry(...d))
        }, " 重试这次操作 ", 8, He)) : _("", !0),
        !t(w) && t(l).status !== "conflict" ? (o(), m("button", {
          key: 2,
          type: "button",
          disabled: t(K),
          onClick: n[5] || (n[5] = (...d) => t(e).refresh && t(e).refresh(...d))
        }, " 重新加载 ", 8, Ke)) : _("", !0)
      ])) : _("", !0),
      a("div", {
        ref_key: "scroll",
        ref: x,
        class: "game-scroll"
      }, [
        te((o(), z(Ie, {
          key: t(l).chatIdentity,
          "active-game": t(l).activeGame,
          onOpen: F
        }, null, 8, ["active-game"])), [[re, f.value === "lobby"]]),
        f.value === "records" ? (o(), z(Ue, {
          key: 0,
          records: t(l).records,
          total: t(l).total,
          "has-more": t(l).hasMore,
          "loading-more": t(I),
          error: t(k),
          onLoadMore: t(e).loadMore
        }, null, 8, [
          "records",
          "total",
          "has-more",
          "loading-more",
          "error",
          "onLoadMore"
        ])) : f.value === "room" ? (o(), m(P, { key: 1 }, [R.value ? (o(), m("div", Qe, [...n[8] || (n[8] = [a("p", null, "正在摆好桌面…", -1)])])) : M.value ? (o(), m("div", We, [a("p", null, b(M.value), 1), a("button", {
          type: "button",
          onClick: V
        }, "重新打开")])) : A.value && L.value?.mode === "wager" ? (o(), z(Y(A.value), {
          key: 2,
          state: t(l),
          "disabled-reason": t(S),
          "in-flight": t(v),
          settlement: t(u)?.record.game === $.value ? t(u) : null,
          onRevealed: t(e).revealComplete,
          onAction: y,
          onAgain: r,
          onLobby: n[6] || (n[6] = (d) => U("lobby")),
          onResume: j
        }, null, 40, [
          "state",
          "disabled-reason",
          "in-flight",
          "settlement",
          "onRevealed"
        ])) : _("", !0)], 64)) : _("", !0),
        (o(), z(oe, {
          key: t(l).chatIdentity,
          max: 1
        }, [N.value && A.value && !R.value && !M.value ? (o(), z(Y(A.value), {
          key: $.value,
          bridge: g.bridge,
          "chat-identity": t(l).chatIdentity,
          "generation-active": t(l).generationActive
        }, null, 8, [
          "bridge",
          "chat-identity",
          "generation-active"
        ])) : _("", !0)], 1024))
      ], 512)
    ], 2));
  }
}), Ze = Ye;
export {
  Ze as default
};
