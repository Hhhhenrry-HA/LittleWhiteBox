/* eslint-disable */
import { B as ee, E as Q, H as g, I as p, L as ne, N as ae, O as te, R as z, T as u, a as re, b as X, d as a, f as j, g as le, j as V, l as H, m, o as oe, p as I, u as D, v as W, x as se, z as t } from "./xiaobai-os-runtime-dom.esm-bundler-DwdCK5Jt.js";
import { n as F, t as Y } from "./xiaobai-os-room-catalog-GDoMHdYd.js";
function Z(s) {
  return s && typeof s == "object" && "code" in s ? String(s.code) : "";
}
function P(s) {
  const y = s instanceof Error ? s.message : String(s);
  return y.includes("economy_insufficient_funds") || y.includes("cannot be overdrawn") ? "小白币不够了，换个小一点的筹码吧。" : y.includes("game_dice_bid_not_higher") ? "这次要叫得比对方更大一些。" : y.includes("game_revision_conflict") || y.includes("game_event_id_conflict") ? "本局已有变化，请重新读取后继续。" : y.includes("game_main_generation_active") ? "故事正在回复，等回复结束就能继续玩。" : y.includes("聊天已切换") ? "聊天已切换，请重新打开游戏。" : y === "host_request_timeout" ? "等待结果超时了。可以重试这次操作，不会重复下注或重新抽取结果。" : "这次操作没能完成，请重试。";
}
function ie(s, y) {
  const e = p(structuredClone(z(y))), n = p(null), i = p(null), b = p(null), d = p(!1), v = p(!1), G = p(""), A = p(""), C = p(null);
  let h = !1, k = 0, S = 0, w = 0, J = 0;
  function E() {
    return typeof globalThis.crypto?.randomUUID == "function" ? "game-ui:" + globalThis.crypto.randomUUID() : "game-ui:" + Date.now() + ":" + ++J;
  }
  const R = D(() => ["unconfirmed", "save-failed"].includes(e.value.status)), f = D(() => d.value || !!b.value), $ = D(() => f.value ? "上一项操作还在进行，请稍候。" : e.value.status !== "ready" ? e.value.message || "游戏正在准备，请稍候。" : C.value ? "请先重试这次操作，或重新读取本局结果。" : e.value.generationActive ? "故事正在回复，等回复结束就能继续玩。" : ""), N = D(() => i.value ?? {
    balance: e.value.balance,
    lockedAmount: e.value.lockedAmount
  }), B = D(() => f.value || R.value || [
    "conflict",
    "saving",
    "loading"
  ].includes(e.value.status));
  function L(o) {
    const r = e.value;
    if (r.chatIdentity !== o.chatIdentity)
      n.value = null, i.value = null, C.value = null, b.value = null, d.value = !1, S += 1, w += 1;
    else if (r.activeGame && o.status === "ready" && !o.activeGame) {
      const l = o.records.find((c) => c.gameId === r.activeGame.id);
      l && (i.value = {
        balance: r.balance,
        lockedAmount: r.lockedAmount
      }, n.value = {
        before: structuredClone(z(r.activeGame)),
        record: structuredClone(l),
        balanceAfter: o.balance
      });
    }
    e.value = structuredClone(o), v.value = !1, A.value = "", G.value = "", C.value = null;
  }
  function M(o) {
    const r = o === "game_save_pending" ? "save-failed" : o === "storage_unconfirmed" ? "unconfirmed" : o === "storage_conflict" ? "conflict" : null;
    return r ? (e.value = {
      ...e.value,
      status: r,
      message: r === "save-failed" ? "这局还没保存好，请重试保存后继续。" : r === "unconfirmed" ? "保存结果尚未确认，请先核实。" : "保存的版本不一致，请重新打开酒馆后继续。"
    }, !0) : !1;
  }
  async function U(o) {
    const r = e.value.chatIdentity, l = k, c = w;
    b.value = o.action, C.value = null, G.value = "";
    try {
      const _ = await s.request(o.endpoint, o.payload, 35e3);
      return h || c !== w || e.value.chatIdentity !== r ? !1 : (k === l && L(_.result), !0);
    } catch (_) {
      return !h && c === w && k === l && e.value.chatIdentity === r && !M(Z(_)) && (G.value = P(_), e.value.status === "ready" && (C.value = o)), !1;
    } finally {
      !h && c === w && e.value.chatIdentity === r && (b.value = null);
    }
  }
  async function O(o) {
    return h || $.value ? !1 : U({
      endpoint: o.endpoint,
      action: structuredClone(z(o)),
      payload: {
        ...structuredClone(z(o.payload || {})),
        chatIdentity: e.value.chatIdentity,
        expectedRevision: e.value.revision,
        expectedEventId: e.value.eventId,
        actionId: E()
      }
    });
  }
  async function q() {
    return h || !C.value || f.value || e.value.status !== "ready" || e.value.generationActive ? !1 : U(structuredClone(z(C.value)));
  }
  async function T(o = !1) {
    if (h || f.value || !o && B.value) return;
    const r = e.value.chatIdentity, l = k, c = ++S;
    d.value = !0, G.value = "";
    try {
      const _ = await s.request(o ? "game/confirm-save" : "game/refresh", { chatIdentity: r }, 35e3);
      if (h || c !== S || e.value.chatIdentity !== r) return;
      l === k && L("state" in _.result ? _.result.state : _.result), C.value = null;
    } catch (_) {
      !h && c === S && l === k && e.value.chatIdentity === r && (M(Z(_)) || (G.value = P(_)));
    } finally {
      c === S && (d.value = !1);
    }
  }
  async function x() {
    if (h || !e.value.hasMore || v.value || f.value || e.value.status !== "ready") return;
    const o = k, r = e.value.chatIdentity;
    v.value = !0, A.value = "";
    try {
      const l = await s.request("game/records/load-more", {
        chatIdentity: r,
        offset: e.value.records.length
      }, 35e3);
      if (h || o !== k || r !== e.value.chatIdentity) return;
      const c = new Set(e.value.records.map((_) => _.id));
      e.value.records.push(...l.result.records.filter((_) => !c.has(_.id))), e.value.total = l.result.total, e.value.hasMore = l.result.hasMore;
    } catch (l) {
      !h && o === k && r === e.value.chatIdentity && (A.value = P(l));
    } finally {
      o === k && (v.value = !1);
    }
  }
  const K = s.subscribe((o) => {
    h || (o.type === "game/state" ? (k += 1, L(o.payload.state)) : o.type === "game/error" && (G.value = "游戏暂时无法读取，请重新打开。"));
  });
  return {
    state: e,
    settlement: n,
    funds: N,
    inFlight: b,
    reading: d,
    loadingMore: v,
    busy: f,
    error: G,
    recordsError: A,
    failed: C,
    disabledReason: $,
    needsSave: R,
    refreshDisabled: B,
    act: O,
    retry: q,
    loadMore: x,
    refresh: () => T(),
    confirmSave: () => T(!0),
    revealComplete: () => {
      i.value = null;
    },
    dismissSettlement: () => {
      n.value = null, i.value = null;
    },
    dispose: () => {
      h = !0, S += 1, K();
    }
  };
}
var ue = { class: "game-lobby" }, de = ["src"], ve = { class: "game-search" }, ce = {
  class: "game-categories",
  "aria-label": "游戏分类"
}, me = ["aria-pressed", "onClick"], fe = { class: "game-shelf" }, ye = ["onClick"], ge = { class: "game-tile-art" }, be = ["src"], pe = { class: "game-tile-copy" }, he = {
  key: 1,
  class: "game-empty"
}, _e = /* @__PURE__ */ W({
  __name: "GameLobby",
  props: { activeGame: {} },
  emits: ["open"],
  setup(s) {
    const y = p(""), e = p("全部"), n = ["全部", ...new Set(Y.map((b) => b.category))], i = D(() => Y.filter((b) => (e.value === "全部" || b.category === e.value) && (b.name + b.tagline + b.category).includes(y.value.trim())));
    return (b, d) => (u(), m("section", ue, [
      s.activeGame ? (u(), m("button", {
        key: 0,
        type: "button",
        class: "game-continue",
        onClick: d[0] || (d[0] = (v) => b.$emit("open", s.activeGame.kind))
      }, [
        a("img", {
          src: t(F)(s.activeGame.kind).artwork,
          alt: ""
        }, null, 8, de),
        a("span", null, [d[3] || (d[3] = a("small", null, "进行中", -1)), a("strong", null, g(t(F)(s.activeGame.kind).name), 1)]),
        d[4] || (d[4] = a("b", null, "继续 →", -1))
      ])) : I("", !0),
      a("label", ve, [d[5] || (d[5] = a("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, [a("circle", {
        cx: "10.5",
        cy: "10.5",
        r: "6.5"
      }), a("path", { d: "m16 16 4 4" })], -1)), ae(a("input", {
        "onUpdate:modelValue": d[1] || (d[1] = (v) => y.value = v),
        type: "search",
        placeholder: "找个游戏",
        "aria-label": "搜索游戏"
      }, null, 512), [[re, y.value]])]),
      a("nav", ce, [(u(), m(H, null, Q(n, (v) => a("button", {
        key: v,
        type: "button",
        "aria-pressed": e.value === v,
        onClick: (G) => e.value = v
      }, g(v), 9, me)), 64))]),
      a("div", fe, [(u(!0), m(H, null, Q(i.value, (v) => (u(), m("button", {
        key: v.id,
        type: "button",
        class: ee(["game-tile", "tone-" + v.tone]),
        onClick: (G) => b.$emit("open", v.id)
      }, [a("div", ge, [a("img", {
        src: v.artwork,
        alt: "",
        loading: "lazy"
      }, null, 8, be)]), a("div", pe, [a("h3", null, g(v.name), 1), a("span", null, [le(g(v.entry) + " ", 1), d[6] || (d[6] = a("i", { "aria-hidden": "true" }, "↗", -1))])])], 10, ye))), 128))]),
      i.value.length ? I("", !0) : (u(), m("div", he, [
        d[7] || (d[7] = a("h3", null, "没找到这个游戏", -1)),
        d[8] || (d[8] = a("p", null, "换个名字，或者看看其他分类。", -1)),
        a("button", {
          type: "button",
          onClick: d[2] || (d[2] = (v) => {
            y.value = "", e.value = "全部";
          })
        }, " 查看全部 ")
      ]))
    ]));
  }
}), ke = _e, $e = {
  class: "game-records",
  "aria-labelledby": "game-records-title"
}, Ce = { class: "game-section-heading" }, Ge = {
  key: 0,
  class: "game-record-list"
}, Ie = {
  class: "game-record-mark",
  "aria-hidden": "true"
}, Se = { class: "game-record-main" }, we = ["datetime"], Me = { class: "game-record-money" }, Ae = {
  key: 1,
  class: "game-record-empty"
}, Re = {
  key: 2,
  class: "game-inline-error",
  role: "status"
}, Be = ["disabled"], Le = /* @__PURE__ */ W({
  __name: "GameRecords",
  props: {
    records: {},
    total: {},
    hasMore: { type: Boolean },
    loadingMore: { type: Boolean },
    error: {}
  },
  emits: ["loadMore"],
  setup(s) {
    function y(e) {
      return new Intl.DateTimeFormat("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      }).format(new Date(e));
    }
    return (e, n) => (u(), m("section", $e, [
      a("header", Ce, [n[1] || (n[1] = a("div", null, [a("h2", { id: "game-records-title" }, "记录")], -1)), a("small", null, g(s.total) + " 局", 1)]),
      s.records.length ? (u(), m("div", Ge, [(u(!0), m(H, null, Q(s.records, (i) => (u(), m("article", {
        key: i.id,
        class: ee(["game-record", `is-${i.outcomeTone}`])
      }, [a("div", Ie, g(t(F)(i.game).mark), 1), a("div", Se, [
        a("header", null, [a("div", null, [a("span", null, g(i.gameLabel), 1), a("strong", null, g(i.outcomeLabel), 1)]), a("time", { datetime: new Date(i.createdAt).toISOString() }, g(y(i.createdAt)), 9, we)]),
        a("div", Me, [
          a("span", null, "下注 ¤ " + g(i.amountIn), 1),
          a("span", null, "拿回 ¤ " + g(i.payout), 1),
          a("strong", null, g(i.net > 0 ? "+" : "") + g(i.net), 1)
        ]),
        a("details", null, [n[2] || (n[2] = a("summary", null, "本局详情", -1)), (u(), j(te(t(F)(i.game).record), { detail: i.detail }, null, 8, ["detail"]))])
      ])], 2))), 128))])) : (u(), m("div", Ae, [...n[3] || (n[3] = [a("span", { "aria-hidden": "true" }, "◇", -1), a("p", null, "暂无游戏记录", -1)])])),
      s.error ? (u(), m("p", Re, g(s.error), 1)) : I("", !0),
      s.hasMore ? (u(), m("button", {
        key: 3,
        type: "button",
        class: "game-load-more",
        disabled: s.loadingMore,
        onClick: n[0] || (n[0] = (i) => e.$emit("loadMore"))
      }, g(s.loadingMore ? "正在翻阅…" : "更多记录"), 9, Be)) : I("", !0)
    ]));
  }
}), Te = Le, De = { class: "game-app" }, Ee = { class: "game-header" }, Ne = {
  class: "game-funds",
  "aria-label": "可用小白币"
}, Ue = {
  class: "game-nav",
  "aria-label": "游戏页面"
}, ze = ["aria-current"], Fe = ["aria-current"], Oe = ["aria-current"], qe = {
  key: 0,
  class: "game-notice",
  role: "status"
}, xe = ["disabled"], Ve = ["disabled"], je = ["disabled"], He = {
  key: 0,
  class: "game-empty",
  role: "status"
}, Je = {
  key: 1,
  class: "game-empty",
  role: "status"
}, Ke = /* @__PURE__ */ W({
  __name: "GameApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(s) {
    const y = s, e = ie(y.bridge, y.initialState), { state: n, settlement: i, funds: b, inFlight: d, reading: v, loadingMore: G, busy: A, error: C, recordsError: h, failed: k, disabledReason: S, needsSave: w, refreshDisabled: J } = e, E = p(null);
    let R = 0;
    const f = p(n.value.activeGame ? "room" : "lobby"), $ = p(n.value.activeGame?.kind || null), N = ne(null), B = p(""), L = p(!1);
    let M = 0;
    const U = D(() => $.value ? F($.value) : null);
    async function O() {
      const r = U.value, l = ++M;
      if (N.value = null, B.value = "", !!r) {
        L.value = !0;
        try {
          const c = await r.load();
          l === M && (N.value = c.default);
        } catch {
          l === M && (B.value = "这个游戏暂时没能打开，再试一次吧。");
        } finally {
          l === M && (L.value = !1);
        }
      }
    }
    V([
      f,
      $,
      () => !!n.value.activeGame,
      () => !!i.value
    ], (r, l) => {
      l[0] === "lobby" && (R = E.value?.scrollTop || 0), X(() => {
        E.value?.scrollTo({ top: f.value === "lobby" ? R : 0 });
      });
    }), V($, O, { immediate: !0 }), V(i, (r) => {
      r && ($.value = r.record.game, f.value = "room");
    }), V(() => n.value.chatIdentity, () => {
      R = 0, $.value = n.value.activeGame?.kind || null, f.value = $.value ? "room" : "lobby", X(() => {
        R = 0, E.value?.scrollTo({ top: 0 });
      });
    });
    function q(r) {
      $.value = r, f.value = "room";
    }
    function T(r) {
      e.dismissSettlement(), f.value = r;
    }
    function x() {
      n.value.activeGame && q(n.value.activeGame.kind);
    }
    function K() {
      e.dismissSettlement();
    }
    async function o(r) {
      await e.act(r);
    }
    return se(() => {
      M += 1, e.dispose();
    }), (r, l) => (u(), m("main", De, [
      a("header", Ee, [
        f.value === "room" ? (u(), m("button", {
          key: 0,
          type: "button",
          class: "game-back",
          "aria-label": "返回游戏大厅",
          onClick: l[0] || (l[0] = (c) => T("lobby"))
        }, " ‹ ")) : I("", !0),
        a("h1", null, g(f.value === "room" ? U.value?.name : "游戏"), 1),
        a("div", Ne, [a("strong", null, "¤ " + g(t(b).balance.toLocaleString("zh-CN")), 1)])
      ]),
      a("nav", Ue, [
        a("button", {
          type: "button",
          "aria-current": f.value === "lobby" ? "page" : void 0,
          onClick: l[1] || (l[1] = (c) => T("lobby"))
        }, " 大厅 ", 8, ze),
        t(n).activeGame ? (u(), m("button", {
          key: 0,
          type: "button",
          "aria-current": f.value === "room" && $.value === t(n).activeGame.kind ? "page" : void 0,
          onClick: x
        }, [...l[7] || (l[7] = [le(" 继续 ", -1), a("i", null, null, -1)])], 8, Fe)) : I("", !0),
        a("button", {
          type: "button",
          "aria-current": f.value === "records" ? "page" : void 0,
          onClick: l[2] || (l[2] = (c) => T("records"))
        }, " 记录 ", 8, Oe)
      ]),
      t(n).message || t(C) || t(n).generationActive ? (u(), m("aside", qe, [
        a("p", null, g(t(C) || t(n).message || "故事正在回复，等回复结束就能继续玩。"), 1),
        t(w) ? (u(), m("button", {
          key: 0,
          type: "button",
          disabled: t(A),
          onClick: l[3] || (l[3] = (...c) => t(e).confirmSave && t(e).confirmSave(...c))
        }, g(t(v) ? "正在确认…" : t(n).status === "save-failed" ? "重试保存" : "核实保存结果"), 9, xe)) : t(k) ? (u(), m("button", {
          key: 1,
          type: "button",
          disabled: t(A) || t(n).generationActive,
          onClick: l[4] || (l[4] = (...c) => t(e).retry && t(e).retry(...c))
        }, " 重试这次操作 ", 8, Ve)) : I("", !0),
        !t(w) && t(n).status !== "conflict" ? (u(), m("button", {
          key: 2,
          type: "button",
          disabled: t(J),
          onClick: l[5] || (l[5] = (...c) => t(e).refresh && t(e).refresh(...c))
        }, " 重新读取 ", 8, je)) : I("", !0)
      ])) : I("", !0),
      a("div", {
        ref_key: "scroll",
        ref: E,
        class: "game-scroll"
      }, [ae((u(), j(ke, {
        key: t(n).chatIdentity,
        "active-game": t(n).activeGame,
        onOpen: q
      }, null, 8, ["active-game"])), [[oe, f.value === "lobby"]]), f.value === "records" ? (u(), j(Te, {
        key: 0,
        records: t(n).records,
        total: t(n).total,
        "has-more": t(n).hasMore,
        "loading-more": t(G),
        error: t(h),
        onLoadMore: t(e).loadMore
      }, null, 8, [
        "records",
        "total",
        "has-more",
        "loading-more",
        "error",
        "onLoadMore"
      ])) : f.value === "room" ? (u(), m(H, { key: 1 }, [L.value ? (u(), m("div", He, [...l[8] || (l[8] = [a("p", null, "正在摆好桌面…", -1)])])) : B.value ? (u(), m("div", Je, [a("p", null, g(B.value), 1), a("button", {
        type: "button",
        onClick: O
      }, "重新打开")])) : N.value ? (u(), j(te(N.value), {
        key: 2,
        state: t(n),
        "disabled-reason": t(S),
        "in-flight": t(d),
        settlement: t(i)?.record.game === $.value ? t(i) : null,
        onRevealed: t(e).revealComplete,
        onAction: o,
        onAgain: K,
        onLobby: l[6] || (l[6] = (c) => T("lobby")),
        onResume: x
      }, null, 40, [
        "state",
        "disabled-reason",
        "in-flight",
        "settlement",
        "onRevealed"
      ])) : I("", !0)], 64)) : I("", !0)], 512)
    ]));
  }
}), We = Ke;
export {
  We as default
};
