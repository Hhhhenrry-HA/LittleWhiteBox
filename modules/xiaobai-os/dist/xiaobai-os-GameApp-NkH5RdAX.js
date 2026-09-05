/* eslint-disable */
import { A as te, C as u, E as ee, F as z, I as n, L as ae, N as p, O as x, P as le, _ as Y, c as P, d as j, f as I, h as T, i as ne, l as L, p as m, u as e, v as re, w as X, y as se, z as c } from "./xiaobai-os-runtime-dom.esm-bundler-D8PGSboO.js";
import { n as O, t as Q } from "./xiaobai-os-room-catalog-CAbNmZml.js";
function Z(i) {
  return i && typeof i == "object" && "code" in i ? String(i.code) : "";
}
function W(i) {
  const f = i instanceof Error ? i.message : String(i);
  return f.includes("economy_insufficient_funds") || f.includes("cannot be overdrawn") ? "小白币不够了，换个小一点的筹码吧。" : f.includes("game_dice_bid_not_higher") ? "这次要叫得比对方更大一些。" : f.includes("game_revision_conflict") || f.includes("game_event_id_conflict") ? "本局已有变化，请重新读取后继续。" : f.includes("game_main_generation_active") ? "故事正在回复，等回复结束就能继续玩。" : f.includes("聊天已切换") ? "聊天已切换，请重新打开游戏。" : f === "host_request_timeout" ? "等待结果超时了。可以重试这次操作，不会重复下注或重新抽取结果。" : "这次操作没能完成，请重试。";
}
function ie(i, f) {
  const a = p(structuredClone(z(f))), r = p(null), o = p(null), y = p(null), s = p(!1), v = p(!1), C = p(""), A = p(""), $ = p(null);
  let b = !1, k = 0, S = 0, M = 0, H = 0;
  function q() {
    return typeof globalThis.crypto?.randomUUID == "function" ? "game-ui:" + globalThis.crypto.randomUUID() : "game-ui:" + Date.now() + ":" + ++H;
  }
  const h = L(() => ["unconfirmed", "save-failed"].includes(a.value.status)), g = L(() => s.value || !!y.value), R = L(() => g.value ? "上一项操作还在进行，请稍候。" : a.value.status !== "ready" ? a.value.message || "游戏正在准备，请稍候。" : $.value ? "请先重试这次操作，或重新读取本局结果。" : a.value.generationActive ? "故事正在回复，等回复结束就能继续玩。" : ""), B = L(() => o.value ?? {
    balance: a.value.balance,
    lockedAmount: a.value.lockedAmount
  }), D = L(() => g.value || h.value || [
    "conflict",
    "saving",
    "loading"
  ].includes(a.value.status));
  function w(l) {
    const t = a.value;
    if (t.chatIdentity !== l.chatIdentity)
      r.value = null, o.value = null, $.value = null, y.value = null, s.value = !1, S += 1, M += 1;
    else if (t.activeGame && l.status === "ready" && !l.activeGame) {
      const d = l.records.find((G) => G.gameId === t.activeGame.id);
      d && (o.value = {
        balance: t.balance,
        lockedAmount: t.lockedAmount
      }, r.value = {
        before: structuredClone(z(t.activeGame)),
        record: structuredClone(d),
        balanceAfter: l.balance
      });
    }
    a.value = structuredClone(l), v.value = !1, A.value = "", C.value = "", $.value = null;
  }
  function F(l) {
    const t = l === "game_save_pending" ? "save-failed" : l === "storage_unconfirmed" ? "unconfirmed" : l === "storage_conflict" ? "conflict" : null;
    return t ? (a.value = {
      ...a.value,
      status: t,
      message: t === "save-failed" ? "这局还没保存好，请重试保存后继续。" : t === "unconfirmed" ? "保存结果尚未确认，请先核实。" : "保存的版本不一致，请重新打开酒馆后继续。"
    }, !0) : !1;
  }
  async function N(l) {
    const t = a.value.chatIdentity, d = k, G = M;
    y.value = l.action, $.value = null, C.value = "";
    try {
      const _ = await i.request(l.endpoint, l.payload, 35e3);
      return b || G !== M || a.value.chatIdentity !== t ? !1 : (k === d && w(_.result), !0);
    } catch (_) {
      return !b && G === M && k === d && a.value.chatIdentity === t && !F(Z(_)) && (C.value = W(_), a.value.status === "ready" && ($.value = l)), !1;
    } finally {
      !b && G === M && a.value.chatIdentity === t && (y.value = null);
    }
  }
  async function V(l) {
    return b || R.value ? !1 : N({
      endpoint: l.endpoint,
      action: structuredClone(z(l)),
      payload: {
        ...structuredClone(z(l.payload || {})),
        chatIdentity: a.value.chatIdentity,
        expectedRevision: a.value.revision,
        expectedEventId: a.value.eventId,
        actionId: q()
      }
    });
  }
  async function E() {
    return b || !$.value || g.value || a.value.status !== "ready" || a.value.generationActive ? !1 : N(structuredClone(z($.value)));
  }
  async function U(l = !1) {
    if (b || g.value || !l && D.value) return;
    const t = a.value.chatIdentity, d = k, G = ++S;
    s.value = !0, C.value = "";
    try {
      const _ = await i.request(l ? "game/confirm-save" : "game/refresh", { chatIdentity: t }, 35e3);
      if (b || G !== S || a.value.chatIdentity !== t) return;
      d === k && w("state" in _.result ? _.result.state : _.result), $.value = null;
    } catch (_) {
      !b && G === S && d === k && a.value.chatIdentity === t && (F(Z(_)) || (C.value = W(_)));
    } finally {
      G === S && (s.value = !1);
    }
  }
  async function J() {
    if (b || !a.value.hasMore || v.value || g.value || a.value.status !== "ready") return;
    const l = k, t = a.value.chatIdentity;
    v.value = !0, A.value = "";
    try {
      const d = await i.request("game/records/load-more", {
        chatIdentity: t,
        offset: a.value.records.length
      }, 35e3);
      if (b || l !== k || t !== a.value.chatIdentity) return;
      const G = new Set(a.value.records.map((_) => _.id));
      a.value.records.push(...d.result.records.filter((_) => !G.has(_.id))), a.value.total = d.result.total, a.value.hasMore = d.result.hasMore;
    } catch (d) {
      !b && l === k && t === a.value.chatIdentity && (A.value = W(d));
    } finally {
      l === k && (v.value = !1);
    }
  }
  const K = i.subscribe((l) => {
    b || (l.type === "game/state" ? (k += 1, w(l.payload.state)) : l.type === "game/error" && (C.value = "游戏暂时无法读取，请重新打开。"));
  });
  return {
    state: a,
    settlement: r,
    funds: B,
    inFlight: y,
    reading: s,
    loadingMore: v,
    busy: g,
    error: C,
    recordsError: A,
    failed: $,
    disabledReason: R,
    needsSave: h,
    refreshDisabled: D,
    act: V,
    retry: E,
    loadMore: J,
    refresh: () => U(),
    confirmSave: () => U(!0),
    revealComplete: () => {
      o.value = null;
    },
    dismissSettlement: () => {
      r.value = null, o.value = null;
    },
    dispose: () => {
      b = !0, S += 1, K();
    }
  };
}
var oe = { class: "game-lobby" }, ue = ["src"], de = { class: "game-browse-heading" }, ve = { class: "game-search" }, ce = {
  class: "game-categories",
  "aria-label": "游戏分类"
}, me = ["aria-pressed", "onClick"], fe = { class: "game-shelf" }, ye = ["onClick"], ge = { class: "game-tile-art" }, pe = ["src"], be = { class: "game-tile-copy" }, he = {
  key: 1,
  class: "game-empty"
}, _e = /* @__PURE__ */ Y({
  __name: "GameLobby",
  props: { activeGame: {} },
  emits: ["open"],
  setup(i) {
    const f = p(""), a = p("全部"), r = ["全部", ...new Set(Q.map((y) => y.category))], o = L(() => Q.filter((y) => (a.value === "全部" || y.category === a.value) && (y.name + y.tagline + y.category).includes(f.value.trim())));
    return (y, s) => (u(), m("section", oe, [
      s[10] || (s[10] = e("div", { class: "game-lobby-intro" }, [
        e("span", null, "小白游艺室"),
        e("h2", null, [
          T("故事之外，"),
          e("br"),
          T("玩一小局。")
        ]),
        e("p", null, [
          T("斗点智，碰点运气。"),
          e("br"),
          T("输赢都是小白币。")
        ]),
        e("div", {
          class: "game-lobby-emblem",
          "aria-hidden": "true"
        }, [
          e("i", null, "✦"),
          e("b", null, "玩"),
          e("small", null, "一局好时光")
        ])
      ], -1)),
      i.activeGame ? (u(), m("button", {
        key: 0,
        type: "button",
        class: "game-continue",
        onClick: s[0] || (s[0] = (v) => y.$emit("open", i.activeGame.kind))
      }, [
        e("img", {
          src: n(O)(i.activeGame.kind).artwork,
          alt: ""
        }, null, 8, ue),
        e("span", null, [s[3] || (s[3] = e("small", null, "你的这一局还在", -1)), e("strong", null, c(n(O)(i.activeGame.kind).name), 1)]),
        s[4] || (s[4] = e("b", null, "继续玩 →", -1))
      ])) : I("", !0),
      e("div", de, [s[5] || (s[5] = e("h3", null, "挑个好玩的", -1)), e("span", null, c(n(Q).length) + " 款游戏", 1)]),
      e("label", ve, [s[6] || (s[6] = e("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, [e("circle", {
        cx: "10.5",
        cy: "10.5",
        r: "6.5"
      }), e("path", { d: "m16 16 4 4" })], -1)), te(e("input", {
        "onUpdate:modelValue": s[1] || (s[1] = (v) => f.value = v),
        type: "search",
        placeholder: "找个游戏",
        "aria-label": "搜索游戏"
      }, null, 512), [[ne, f.value]])]),
      e("nav", ce, [(u(), m(P, null, X(r, (v) => e("button", {
        key: v,
        type: "button",
        "aria-pressed": a.value === v,
        onClick: (C) => a.value = v
      }, c(v), 9, me)), 64))]),
      e("div", fe, [(u(!0), m(P, null, X(o.value, (v) => (u(), m("button", {
        key: v.id,
        type: "button",
        class: ae(["game-tile", "tone-" + v.tone]),
        onClick: (C) => y.$emit("open", v.id)
      }, [e("div", ge, [e("img", {
        src: v.artwork,
        alt: "",
        loading: "lazy"
      }, null, 8, pe), e("span", null, c(v.category), 1)]), e("div", be, [
        e("h3", null, c(v.name), 1),
        e("p", null, c(v.tagline), 1),
        e("span", null, [T(c(v.entry) + " ", 1), s[7] || (s[7] = e("i", { "aria-hidden": "true" }, "↗", -1))])
      ])], 10, ye))), 128))]),
      o.value.length ? I("", !0) : (u(), m("div", he, [
        s[8] || (s[8] = e("h3", null, "没找到这个游戏", -1)),
        s[9] || (s[9] = e("p", null, "换个名字，或者看看其他分类。", -1)),
        e("button", {
          type: "button",
          onClick: s[2] || (s[2] = (v) => {
            f.value = "", a.value = "全部";
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
}, we = { class: "game-record-main" }, Se = ["datetime"], Me = { class: "game-record-money" }, Ae = {
  key: 1,
  class: "game-record-empty"
}, Re = {
  key: 2,
  class: "game-inline-error",
  role: "status"
}, Le = ["disabled"], Be = /* @__PURE__ */ Y({
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
    function f(a) {
      return new Intl.DateTimeFormat("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      }).format(new Date(a));
    }
    return (a, r) => (u(), m("section", $e, [
      e("header", Ce, [r[1] || (r[1] = e("div", null, [e("span", null, "输赢都是故事"), e("h2", { id: "game-records-title" }, "玩过的局")], -1)), e("small", null, c(i.total) + " 局", 1)]),
      i.records.length ? (u(), m("div", Ge, [(u(!0), m(P, null, X(i.records, (o) => (u(), m("article", {
        key: o.id,
        class: ae(["game-record", `is-${o.outcomeTone}`])
      }, [e("div", Ie, c(n(O)(o.game).mark), 1), e("div", we, [
        e("header", null, [e("div", null, [e("span", null, c(o.gameLabel), 1), e("strong", null, c(o.outcomeLabel), 1)]), e("time", { datetime: new Date(o.createdAt).toISOString() }, c(f(o.createdAt)), 9, Se)]),
        e("div", Me, [
          e("span", null, "下注 ¤ " + c(o.amountIn), 1),
          e("span", null, "拿回 ¤ " + c(o.payout), 1),
          e("strong", null, c(o.net > 0 ? "+" : "") + c(o.net), 1)
        ]),
        e("details", null, [r[2] || (r[2] = e("summary", null, "看看这一局", -1)), (u(), j(ee(n(O)(o.game).record), { detail: o.detail }, null, 8, ["detail"]))])
      ])], 2))), 128))])) : (u(), m("div", Ae, [...r[3] || (r[3] = [e("span", { "aria-hidden": "true" }, "◇", -1), e("p", null, "还没玩过，去大厅挑一局吧。", -1)])])),
      i.error ? (u(), m("p", Re, c(i.error), 1)) : I("", !0),
      i.hasMore ? (u(), m("button", {
        key: 3,
        type: "button",
        class: "game-load-more",
        disabled: i.loadingMore,
        onClick: r[0] || (r[0] = (o) => a.$emit("loadMore"))
      }, c(i.loadingMore ? "正在翻阅…" : "继续翻阅记录"), 9, Le)) : I("", !0)
    ]));
  }
}), De = Be, Ee = { class: "game-app" }, Te = { class: "game-header" }, Fe = { class: "game-funds" }, Ne = {
  class: "game-nav",
  "aria-label": "游戏页面"
}, Ue = ["aria-current"], ze = ["aria-current"], Oe = ["aria-current"], qe = {
  key: 0,
  class: "game-notice",
  role: "status"
}, Ve = ["disabled"], xe = ["disabled"], je = ["disabled"], Pe = {
  key: 0,
  class: "game-empty",
  role: "status"
}, He = {
  key: 1,
  class: "game-empty",
  role: "status"
}, Je = /* @__PURE__ */ Y({
  __name: "GameApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(i) {
    const f = i, a = ie(f.bridge, f.initialState), { state: r, settlement: o, funds: y, inFlight: s, reading: v, loadingMore: C, busy: A, error: $, recordsError: b, failed: k, disabledReason: S, needsSave: M, refreshDisabled: H } = a, q = p(null), h = p(r.value.activeGame ? "room" : "lobby"), g = p(r.value.activeGame?.kind || null), R = le(null), B = p(""), D = p(!1);
    let w = 0;
    const F = L(() => g.value ? O(g.value) : null);
    async function N() {
      const l = F.value, t = ++w;
      if (R.value = null, B.value = "", !!l) {
        D.value = !0;
        try {
          const d = await l.load();
          t === w && (R.value = d.default);
        } catch {
          t === w && (B.value = "这个游戏暂时没能打开，再试一次吧。");
        } finally {
          t === w && (D.value = !1);
        }
      }
    }
    x([
      h,
      g,
      () => !!r.value.activeGame,
      () => !!o.value
    ], () => {
      re(() => {
        q.value?.scrollTo({ top: 0 });
      });
    }), x(g, N, { immediate: !0 }), x(o, (l) => {
      l && (g.value = l.record.game, h.value = "room");
    }), x(() => r.value.chatIdentity, () => {
      g.value = r.value.activeGame?.kind || null, h.value = g.value ? "room" : "lobby";
    });
    function V(l) {
      g.value = l, h.value = "room";
    }
    function E(l) {
      a.dismissSettlement(), h.value = l;
    }
    function U() {
      r.value.activeGame && V(r.value.activeGame.kind);
    }
    function J() {
      a.dismissSettlement();
    }
    async function K(l) {
      await a.act(l);
    }
    return se(() => {
      w += 1, a.dispose();
    }), (l, t) => (u(), m("main", Ee, [
      e("header", Te, [
        h.value === "room" ? (u(), m("button", {
          key: 0,
          type: "button",
          class: "game-back",
          "aria-label": "返回游戏大厅",
          onClick: t[0] || (t[0] = (d) => E("lobby"))
        }, " ‹ ")) : I("", !0),
        e("h1", null, c(h.value === "room" ? F.value?.name : "游戏"), 1),
        e("div", Fe, [t[7] || (t[7] = e("small", null, "可用小白币", -1)), e("strong", null, "¤ " + c(n(y).balance.toLocaleString("zh-CN")), 1)])
      ]),
      e("nav", Ne, [
        e("button", {
          type: "button",
          "aria-current": h.value === "lobby" ? "page" : void 0,
          onClick: t[1] || (t[1] = (d) => E("lobby"))
        }, " 游艺室 ", 8, Ue),
        n(r).activeGame ? (u(), m("button", {
          key: 0,
          type: "button",
          "aria-current": h.value === "room" && g.value === n(r).activeGame.kind ? "page" : void 0,
          onClick: U
        }, [...t[8] || (t[8] = [T(" 继续这一局 ", -1), e("i", null, null, -1)])], 8, ze)) : I("", !0),
        e("button", {
          type: "button",
          "aria-current": h.value === "records" ? "page" : void 0,
          onClick: t[2] || (t[2] = (d) => E("records"))
        }, " 玩过的局 ", 8, Oe)
      ]),
      n(r).message || n($) || n(r).generationActive ? (u(), m("aside", qe, [
        e("p", null, c(n($) || n(r).message || "故事正在回复，等回复结束就能继续玩。"), 1),
        n(M) ? (u(), m("button", {
          key: 0,
          type: "button",
          disabled: n(A),
          onClick: t[3] || (t[3] = (...d) => n(a).confirmSave && n(a).confirmSave(...d))
        }, c(n(v) ? "正在确认…" : n(r).status === "save-failed" ? "重试保存" : "核实保存结果"), 9, Ve)) : n(k) ? (u(), m("button", {
          key: 1,
          type: "button",
          disabled: n(A) || n(r).generationActive,
          onClick: t[4] || (t[4] = (...d) => n(a).retry && n(a).retry(...d))
        }, " 重试这次操作 ", 8, xe)) : I("", !0),
        !n(M) && n(r).status !== "conflict" ? (u(), m("button", {
          key: 2,
          type: "button",
          disabled: n(H),
          onClick: t[5] || (t[5] = (...d) => n(a).refresh && n(a).refresh(...d))
        }, " 重新读取 ", 8, je)) : I("", !0)
      ])) : I("", !0),
      e("div", {
        ref_key: "scroll",
        ref: q,
        class: "game-scroll"
      }, [h.value === "lobby" ? (u(), j(ke, {
        key: 0,
        "active-game": n(r).activeGame,
        onOpen: V
      }, null, 8, ["active-game"])) : h.value === "records" ? (u(), j(De, {
        key: 1,
        records: n(r).records,
        total: n(r).total,
        "has-more": n(r).hasMore,
        "loading-more": n(C),
        error: n(b),
        onLoadMore: n(a).loadMore
      }, null, 8, [
        "records",
        "total",
        "has-more",
        "loading-more",
        "error",
        "onLoadMore"
      ])) : (u(), m(P, { key: 2 }, [D.value ? (u(), m("div", Pe, [...t[9] || (t[9] = [e("p", null, "正在摆好桌面…", -1)])])) : B.value ? (u(), m("div", He, [e("p", null, c(B.value), 1), e("button", {
        type: "button",
        onClick: N
      }, "重新打开")])) : R.value ? (u(), j(ee(R.value), {
        key: 2,
        state: n(r),
        "disabled-reason": n(S),
        "in-flight": n(s),
        settlement: n(o)?.record.game === g.value ? n(o) : null,
        onRevealed: n(a).revealComplete,
        onAction: K,
        onAgain: J,
        onLobby: t[6] || (t[6] = (d) => E("lobby")),
        onResume: U
      }, null, 40, [
        "state",
        "disabled-reason",
        "in-flight",
        "settlement",
        "onRevealed"
      ])) : I("", !0)], 64))], 512)
    ]));
  }
}), We = Je;
export {
  We as default
};
