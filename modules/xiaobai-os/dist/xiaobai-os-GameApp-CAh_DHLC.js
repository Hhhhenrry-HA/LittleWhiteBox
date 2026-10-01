/* eslint-disable */
import { E as Y, F as o, K as te, L as Z, O as ne, Q as O, U as K, X as h, Z as re, _ as c, d as oe, et as t, g as k, h as N, m as a, o as ie, p as L, rt as b, s as ue, tt as J, u as j, x as W, y as le, z as H } from "./xiaobai-os-runtime-dom.esm-bundler-BeaorYpU.js";
import { r as se } from "./xiaobai-os-app-navigation-C25euSGK.js";
import { n as de } from "./xiaobai-os-assets-BT5gX6Sf.js";
import { n as ve, r as P, t as ee } from "./xiaobai-os-room-catalog-in7qrpDx.js";
function ae(i) {
  return i && typeof i == "object" && "code" in i ? String(i.code) : "";
}
function X(i) {
  const g = i instanceof Error ? i.message : String(i);
  return g.includes("economy_insufficient_funds") || g.includes("cannot be overdrawn") ? "小白币不够了，换个小一点的筹码吧。" : g.includes("game_dice_bid_not_higher") ? "这次要叫得比对方更大一些。" : g.includes("game_revision_conflict") || g.includes("game_event_id_conflict") ? "本局已有变化，请重新加载后继续。" : g.includes("game_main_generation_active") ? "故事正在回复，等回复结束就能继续玩。" : g.includes("聊天已切换") ? "聊天已切换，请重新打开游戏。" : g === "host_request_timeout" ? "暂时没收到结果。可以重试这次操作，不会重复下注或重新抽取结果。" : "这次操作没能完成，请重试。";
}
function ce(i, g) {
  const e = h(structuredClone(O(g))), l = h(null), u = h(null), p = h(null), v = h(!1), y = h(!1), G = h(""), B = h(""), I = h(null);
  let _ = !1, C = 0, S = 0, w = 0, Q = 0;
  function F() {
    return typeof globalThis.crypto?.randomUUID == "function" ? "game-ui:" + globalThis.crypto.randomUUID() : "game-ui:" + Date.now() + ":" + ++Q;
  }
  const E = L(() => ["unconfirmed", "save-failed"].includes(e.value.status)), f = L(() => v.value || !!p.value), $ = L(() => f.value ? "上一项操作还在进行，请稍候。" : e.value.status !== "ready" ? e.value.message || "游戏正在准备，请稍候。" : I.value ? "请先重试这次操作，或重新加载本局结果。" : e.value.generationActive ? "故事正在回复，等回复结束就能继续玩。" : ""), A = L(() => u.value ?? {
    balance: e.value.balance,
    lockedAmount: e.value.lockedAmount
  }), M = L(() => f.value || E.value || [
    "conflict",
    "saving",
    "loading"
  ].includes(e.value.status));
  function R(r) {
    const m = e.value;
    if (m.chatIdentity !== r.chatIdentity)
      l.value = null, u.value = null, I.value = null, p.value = null, v.value = !1, S += 1, w += 1;
    else if (m.activeGame && r.status === "ready" && !r.activeGame) {
      const s = r.records.find((n) => n.gameId === m.activeGame.id);
      s && (u.value = {
        balance: m.balance,
        lockedAmount: m.lockedAmount
      }, l.value = {
        before: structuredClone(O(m.activeGame)),
        record: structuredClone(s),
        balanceAfter: r.balance
      });
    }
    e.value = structuredClone(r), y.value = !1, B.value = "", G.value = "", I.value = null;
  }
  function T(r) {
    const m = r === "game_save_pending" ? "save-failed" : r === "storage_unconfirmed" ? "unconfirmed" : r === "storage_conflict" ? "conflict" : null;
    return m ? (e.value = {
      ...e.value,
      status: m,
      message: m === "save-failed" ? "这局还没保存好，请重试保存后继续。" : m === "unconfirmed" ? "还不确定是否保存成功，请先检查保存。" : "服务器上的游戏记录与当前内容不同，请重新打开酒馆后继续。"
    }, !0) : !1;
  }
  async function D(r) {
    const m = e.value.chatIdentity, s = C, n = w;
    p.value = r.action, I.value = null, G.value = "";
    try {
      const d = await i.request(r.endpoint, r.payload, 35e3);
      return _ || n !== w || e.value.chatIdentity !== m ? !1 : (C === s && R(d.result), !0);
    } catch (d) {
      return !_ && n === w && C === s && e.value.chatIdentity === m && !T(ae(d)) && (G.value = X(d), e.value.status === "ready" && (I.value = r)), !1;
    } finally {
      !_ && n === w && e.value.chatIdentity === m && (p.value = null);
    }
  }
  async function U(r) {
    return _ || $.value ? !1 : D({
      endpoint: r.endpoint,
      action: structuredClone(O(r)),
      payload: {
        ...structuredClone(O(r.payload || {})),
        chatIdentity: e.value.chatIdentity,
        expectedRevision: e.value.revision,
        expectedEventId: e.value.eventId,
        actionId: F()
      }
    });
  }
  async function q() {
    return _ || !I.value || f.value || e.value.status !== "ready" || e.value.generationActive ? !1 : D(structuredClone(O(I.value)));
  }
  async function x(r = !1) {
    if (_ || f.value || !r && M.value) return;
    const m = e.value.chatIdentity, s = C, n = ++S;
    v.value = !0, G.value = "";
    try {
      const d = await i.request(r ? "game/confirm-save" : "game/refresh", { chatIdentity: m }, 35e3);
      if (_ || n !== S || e.value.chatIdentity !== m) return;
      s === C && R("state" in d.result ? d.result.state : d.result), I.value = null;
    } catch (d) {
      !_ && n === S && s === C && e.value.chatIdentity === m && (T(ae(d)) || (G.value = X(d)));
    } finally {
      n === S && (v.value = !1);
    }
  }
  async function z() {
    if (_ || !e.value.hasMore || y.value || f.value || e.value.status !== "ready") return;
    const r = C, m = e.value.chatIdentity;
    y.value = !0, B.value = "";
    try {
      const s = await i.request("game/records/load-more", {
        chatIdentity: m,
        offset: e.value.records.length
      }, 35e3);
      if (_ || r !== C || m !== e.value.chatIdentity) return;
      const n = new Set(e.value.records.map((d) => d.id));
      e.value.records.push(...s.result.records.filter((d) => !n.has(d.id))), e.value.total = s.result.total, e.value.hasMore = s.result.hasMore;
    } catch (s) {
      !_ && r === C && m === e.value.chatIdentity && (B.value = X(s));
    } finally {
      r === C && (y.value = !1);
    }
  }
  const V = i.subscribe((r) => {
    _ || (r.type === "game/state" ? (C += 1, R(r.payload.state)) : r.type === "game/error" && (G.value = "游戏暂时无法读取，请重新打开。"));
  });
  return {
    state: e,
    settlement: l,
    funds: A,
    inFlight: p,
    reading: v,
    loadingMore: y,
    busy: f,
    error: G,
    recordsError: B,
    failed: I,
    disabledReason: $,
    needsSave: E,
    refreshDisabled: M,
    act: U,
    retry: q,
    loadMore: z,
    refresh: () => x(),
    confirmSave: () => x(!0),
    revealComplete: () => {
      u.value = null;
    },
    dismissSettlement: () => {
      l.value = null, u.value = null;
    },
    dispose: () => {
      _ = !0, S += 1, V();
    }
  };
}
var me = { class: "game-lobby" }, ye = ["src"], fe = { class: "game-search" }, ge = {
  class: "game-categories",
  "aria-label": "游戏分类"
}, be = ["aria-pressed", "onClick"], pe = { class: "game-shelf" }, he = ["onClick"], _e = { class: "game-tile-art" }, ke = ["src"], $e = ["src"], Ce = { class: "game-tile-copy" }, Ie = {
  key: 1,
  class: "game-empty"
}, Ge = /* @__PURE__ */ W({
  __name: "GameLobby",
  props: { activeGame: {} },
  emits: ["open"],
  setup(i) {
    const g = h(""), e = h("全部"), l = ["全部", ...new Set(ee.map((p) => p.category))], u = L(() => ee.filter((p) => (e.value === "全部" || p.category === e.value) && (p.name + p.tagline + p.category).includes(g.value.trim())));
    return (p, v) => (o(), c("section", me, [
      i.activeGame ? (o(), c("button", {
        key: 0,
        type: "button",
        class: "game-continue",
        onClick: v[0] || (v[0] = (y) => p.$emit("open", i.activeGame.kind))
      }, [
        a("img", {
          src: t(P)(i.activeGame.kind).artwork,
          alt: ""
        }, null, 8, ye),
        a("span", null, [v[3] || (v[3] = a("small", null, "进行中", -1)), a("strong", null, b(t(P)(i.activeGame.kind).name), 1)]),
        v[4] || (v[4] = a("b", null, "继续 →", -1))
      ])) : k("", !0),
      a("label", fe, [v[5] || (v[5] = a("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, [a("circle", {
        cx: "10.5",
        cy: "10.5",
        r: "6.5"
      }), a("path", { d: "m16 16 4 4" })], -1)), te(a("input", {
        "onUpdate:modelValue": v[1] || (v[1] = (y) => g.value = y),
        type: "search",
        placeholder: "找个游戏",
        "aria-label": "搜索游戏"
      }, null, 512), [[ie, g.value]])]),
      a("nav", ge, [(o(), c(j, null, Z(l, (y) => a("button", {
        key: y,
        type: "button",
        "aria-pressed": e.value === y,
        onClick: (G) => e.value = y
      }, b(y), 9, be)), 64))]),
      a("div", pe, [(o(!0), c(j, null, Z(u.value, (y) => (o(), c("button", {
        key: y.id,
        type: "button",
        class: J(["game-tile", "tone-" + y.tone]),
        onClick: (G) => p.$emit("open", y.id)
      }, [a("div", _e, [a("img", {
        src: y.artwork,
        alt: "",
        loading: "lazy"
      }, null, 8, ke), y.id === "moving" ? (o(), c("img", {
        key: 0,
        class: "game-tile-mascot",
        src: t(de),
        alt: "",
        loading: "lazy"
      }, null, 8, $e)) : k("", !0)]), a("div", Ce, [a("h3", null, b(y.name), 1), a("span", null, [le(b(y.entry) + " ", 1), v[6] || (v[6] = a("i", { "aria-hidden": "true" }, "↗", -1))])])], 10, he))), 128))]),
      u.value.length ? k("", !0) : (o(), c("div", Ie, [
        v[7] || (v[7] = a("h3", null, "没找到这个游戏", -1)),
        v[8] || (v[8] = a("p", null, "换个名字，或者看看其他分类。", -1)),
        a("button", {
          type: "button",
          onClick: v[2] || (v[2] = (y) => {
            g.value = "", e.value = "全部";
          })
        }, " 查看全部 ")
      ]))
    ]));
  }
}), Se = Ge, we = {
  class: "game-records",
  "aria-labelledby": "game-records-title"
}, Ae = { class: "game-section-heading" }, Me = {
  key: 0,
  class: "game-record-list"
}, Re = {
  class: "game-record-mark",
  "aria-hidden": "true"
}, Te = { class: "game-record-main" }, Le = ["datetime"], Be = { class: "game-record-money" }, Ee = {
  key: 1,
  class: "game-record-empty"
}, De = {
  key: 2,
  class: "game-inline-error",
  role: "status"
}, Ue = ["disabled"], ze = /* @__PURE__ */ W({
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
    return (e, l) => (o(), c("section", we, [
      a("header", Ae, [l[1] || (l[1] = a("div", null, [a("h2", { id: "game-records-title" }, "记录")], -1)), a("small", null, b(i.total) + " 局", 1)]),
      i.records.length ? (o(), c("div", Me, [(o(!0), c(j, null, Z(i.records, (u) => (o(), c("article", {
        key: u.id,
        class: J(["game-record", `is-${u.outcomeTone}`])
      }, [a("div", Re, b(t(P)(u.game).mark), 1), a("div", Te, [
        a("header", null, [a("div", null, [a("span", null, b(u.gameLabel), 1), a("strong", null, b(u.outcomeLabel), 1)]), a("time", { datetime: new Date(u.createdAt).toISOString() }, b(g(u.createdAt)), 9, Le)]),
        a("div", Be, [
          a("span", null, "下注 ¤ " + b(u.amountIn), 1),
          a("span", null, "拿回 ¤ " + b(u.payout), 1),
          a("strong", null, b(u.net > 0 ? "+" : "") + b(u.net), 1)
        ]),
        a("details", null, [l[2] || (l[2] = a("summary", null, "本局详情", -1)), (o(), N(H(t(P)(u.game).record), { detail: u.detail }, null, 8, ["detail"]))])
      ])], 2))), 128))])) : (o(), c("div", Ee, [...l[3] || (l[3] = [a("span", { "aria-hidden": "true" }, "◇", -1), a("p", null, "暂无游戏记录", -1)])])),
      i.error ? (o(), c("p", De, b(i.error), 1)) : k("", !0),
      i.hasMore ? (o(), c("button", {
        key: 3,
        type: "button",
        class: "game-load-more",
        disabled: i.loadingMore,
        onClick: l[0] || (l[0] = (u) => e.$emit("loadMore"))
      }, b(i.loadingMore ? "正在翻阅…" : "更多记录"), 9, Ue)) : k("", !0)
    ]));
  }
}), Fe = ze, Ne = { class: "game-header" }, xe = {
  key: 1,
  class: "game-funds",
  "aria-label": "可用小白币"
}, Oe = {
  key: 0,
  class: "game-nav",
  "aria-label": "游戏页面"
}, qe = ["aria-current"], Ve = ["aria-current"], Ke = ["aria-current"], je = {
  key: 1,
  class: "game-notice",
  role: "status"
}, Pe = ["disabled"], Qe = ["disabled"], Xe = ["disabled"], Ze = {
  key: 0,
  class: "game-empty",
  role: "status"
}, He = {
  key: 1,
  class: "game-empty",
  role: "status"
}, Je = /* @__PURE__ */ W({
  __name: "GameApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(i) {
    const g = i, e = ce(g.bridge, g.initialState), { state: l, settlement: u, funds: p, inFlight: v, reading: y, loadingMore: G, busy: B, error: I, recordsError: _, failed: C, disabledReason: S, needsSave: w, refreshDisabled: Q } = e, F = h(null);
    let E = 0;
    const f = h(l.value.activeGame ? "room" : "lobby"), $ = h(l.value.activeGame?.kind || null), A = re(null), M = h(""), R = h(!1);
    let T = 0;
    const D = L(() => $.value ? ve($.value) : null), U = L(() => f.value === "room" && D.value?.mode === "standalone");
    async function q() {
      const s = D.value, n = ++T;
      if (A.value = null, M.value = "", !!s) {
        R.value = !0;
        try {
          const d = await s.load();
          n === T && (A.value = d.default);
        } catch {
          n === T && (M.value = "这个游戏暂时没能打开，再试一次吧。");
        } finally {
          n === T && (R.value = !1);
        }
      }
    }
    K([
      f,
      $,
      () => !!l.value.activeGame,
      () => !!u.value
    ], (s, n) => {
      n[0] === "lobby" && (E = F.value?.scrollTop || 0), Y(() => {
        F.value?.scrollTo({ top: f.value === "lobby" ? E : 0 });
      });
    }), K($, q, { immediate: !0 }), K(u, (s) => {
      s && ($.value = s.record.game);
    }), K(() => l.value.chatIdentity, () => {
      E = 0, $.value = l.value.activeGame?.kind || null, f.value = $.value ? "room" : "lobby", Y(() => {
        E = 0, F.value?.scrollTo({ top: 0 });
      });
    });
    function x(s) {
      $.value = s, f.value = "room";
    }
    function z(s) {
      e.dismissSettlement(), f.value = s;
    }
    se(() => f.value === "lobby" ? !1 : (z("lobby"), !0));
    function V() {
      l.value.activeGame && x(l.value.activeGame.kind);
    }
    function r() {
      e.dismissSettlement();
    }
    async function m(s) {
      await e.act(s);
    }
    return ne(() => {
      T += 1, e.dispose();
    }), (s, n) => (o(), c("main", { class: J(["game-app", { "game-app-standalone": U.value }]) }, [
      a("header", Ne, [
        f.value === "room" ? (o(), c("button", {
          key: 0,
          type: "button",
          class: "game-back",
          "aria-label": "返回游戏大厅",
          onClick: n[0] || (n[0] = (d) => z("lobby"))
        }, " ‹ ")) : k("", !0),
        a("h1", null, b(f.value === "room" ? D.value?.name : "游戏"), 1),
        U.value ? k("", !0) : (o(), c("div", xe, [a("strong", null, "¤ " + b(t(p).balance.toLocaleString("zh-CN")), 1)]))
      ]),
      U.value ? k("", !0) : (o(), c("nav", Oe, [
        a("button", {
          type: "button",
          "aria-current": f.value === "lobby" ? "page" : void 0,
          onClick: n[1] || (n[1] = (d) => z("lobby"))
        }, " 大厅 ", 8, qe),
        t(l).activeGame ? (o(), c("button", {
          key: 0,
          type: "button",
          "aria-current": f.value === "room" && $.value === t(l).activeGame.kind ? "page" : void 0,
          onClick: V
        }, [...n[7] || (n[7] = [le(" 继续 ", -1), a("i", null, null, -1)])], 8, Ve)) : k("", !0),
        a("button", {
          type: "button",
          "aria-current": f.value === "records" ? "page" : void 0,
          onClick: n[2] || (n[2] = (d) => z("records"))
        }, " 记录 ", 8, Ke)
      ])),
      !U.value && (t(l).message || t(I) || t(l).generationActive) ? (o(), c("aside", je, [
        a("p", null, b(t(I) || t(l).message || "故事正在回复，等回复结束就能继续玩。"), 1),
        t(w) ? (o(), c("button", {
          key: 0,
          type: "button",
          disabled: t(B),
          onClick: n[3] || (n[3] = (...d) => t(e).confirmSave && t(e).confirmSave(...d))
        }, b(t(y) ? "正在检查…" : t(l).status === "save-failed" ? "重试保存" : "检查保存"), 9, Pe)) : t(C) ? (o(), c("button", {
          key: 1,
          type: "button",
          disabled: t(B) || t(l).generationActive,
          onClick: n[4] || (n[4] = (...d) => t(e).retry && t(e).retry(...d))
        }, " 重试这次操作 ", 8, Qe)) : k("", !0),
        !t(w) && t(l).status !== "conflict" ? (o(), c("button", {
          key: 2,
          type: "button",
          disabled: t(Q),
          onClick: n[5] || (n[5] = (...d) => t(e).refresh && t(e).refresh(...d))
        }, " 重新加载 ", 8, Xe)) : k("", !0)
      ])) : k("", !0),
      a("div", {
        ref_key: "scroll",
        ref: F,
        class: "game-scroll"
      }, [
        te((o(), N(Se, {
          key: t(l).chatIdentity,
          "active-game": t(l).activeGame,
          onOpen: x
        }, null, 8, ["active-game"])), [[ue, f.value === "lobby"]]),
        f.value === "records" ? (o(), N(Fe, {
          key: 0,
          records: t(l).records,
          total: t(l).total,
          "has-more": t(l).hasMore,
          "loading-more": t(G),
          error: t(_),
          onLoadMore: t(e).loadMore
        }, null, 8, [
          "records",
          "total",
          "has-more",
          "loading-more",
          "error",
          "onLoadMore"
        ])) : f.value === "room" ? (o(), c(j, { key: 1 }, [R.value ? (o(), c("div", Ze, [...n[8] || (n[8] = [a("p", null, "正在摆好桌面…", -1)])])) : M.value ? (o(), c("div", He, [a("p", null, b(M.value), 1), a("button", {
          type: "button",
          onClick: q
        }, "重新打开")])) : A.value && D.value?.mode === "wager" ? (o(), N(H(A.value), {
          key: 2,
          state: t(l),
          "disabled-reason": t(S),
          "in-flight": t(v),
          settlement: t(u)?.record.game === $.value ? t(u) : null,
          onRevealed: t(e).revealComplete,
          onAction: m,
          onAgain: r,
          onLobby: n[6] || (n[6] = (d) => z("lobby")),
          onResume: V
        }, null, 40, [
          "state",
          "disabled-reason",
          "in-flight",
          "settlement",
          "onRevealed"
        ])) : k("", !0)], 64)) : k("", !0),
        (o(), N(oe, {
          key: t(l).chatIdentity,
          max: 1
        }, [U.value && A.value && !R.value && !M.value ? (o(), N(H(A.value), {
          key: $.value,
          bridge: g.bridge,
          "chat-identity": t(l).chatIdentity,
          "generation-active": t(l).generationActive
        }, null, 8, [
          "bridge",
          "chat-identity",
          "generation-active"
        ])) : k("", !0)], 1024))
      ], 512)
    ], 2));
  }
}), ta = Je;
export {
  ta as default
};
