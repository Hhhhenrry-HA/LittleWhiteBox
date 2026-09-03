/* eslint-disable */
import { A as y, C as x, E, M as I, Q as T, S as U, _ as F, a as _, c as m, et as i, f as B, l as n, m as h, o as a, p as W, r as P, s as S, x as l, y as Q } from "./xiaobai-os-runtime-core.esm-bundler-Dmqi2Zbl.js";
var G = { class: "wallet-ui-header" }, K = { class: "wallet-ui-header-copy" }, O = { class: "wallet-ui-title" }, j = /* @__PURE__ */ h({
  __name: "WalletAppHeader",
  props: { title: {} },
  setup(t) {
    return (r, e) => (l(), n("header", G, [a("div", K, [a("h1", O, i(t.title), 1)])]));
  }
}), J = j, X = {
  class: "wallet-balance wallet-ui-rise",
  "aria-labelledby": "wallet-balance-title"
}, Y = { class: "wallet-balance-chip" }, Z = ["aria-label"], ee = /* @__PURE__ */ h({
  __name: "WalletBalanceCard",
  props: {
    balance: {},
    currency: {},
    status: {}
  },
  setup(t) {
    const r = t, e = _(() => Number(r.balance).toLocaleString("zh-CN")), o = _(() => ({
      ready: "账目就绪",
      loading: "正在开户",
      saving: "正在保存",
      unconfirmed: "保存待确认",
      conflict: "账目已冻结",
      blocked: "暂时不可用"
    })[r.status]);
    return (f, u) => (l(), n("section", X, [
      a("header", null, [u[0] || (u[0] = a("p", { id: "wallet-balance-title" }, "当前结余", -1)), a("span", Y, [a("i", {
        class: T(`is-${t.status}`),
        "aria-hidden": "true"
      }, null, 2), B(i(o.value), 1)])]),
      a("div", {
        class: "wallet-balance-value",
        "aria-label": `${e.value} ${t.currency}`
      }, [u[1] || (u[1] = a("span", { "aria-hidden": "true" }, "¤", -1)), B(i(e.value), 1)], 8, Z),
      a("footer", null, i(t.currency), 1)
    ]));
  }
}), te = ee, ae = {
  class: "wallet-ui-notice-icon",
  "aria-hidden": "true"
}, le = { class: "wallet-ui-notice-copy" }, se = { key: 0 }, re = /* @__PURE__ */ h({
  __name: "WalletNotice",
  props: {
    title: {},
    message: { default: "" },
    tone: { default: "info" }
  },
  setup(t) {
    return (r, e) => (l(), n("aside", {
      class: T(["wallet-ui-notice", `is-${t.tone}`]),
      role: "status"
    }, [a("span", ae, [x(r.$slots, "icon", {}, () => [e[0] || (e[0] = B("!", -1))])]), a("div", le, [
      a("strong", null, i(t.title), 1),
      t.message ? (l(), n("p", se, i(t.message), 1)) : m("", !0),
      x(r.$slots, "default")
    ])], 2));
  }
}), ne = re, ie = { class: "wallet-ui-empty" }, oe = {
  key: 0,
  class: "wallet-ui-empty-icon",
  "aria-hidden": "true"
}, ue = { key: 1 }, ce = /* @__PURE__ */ h({
  __name: "WalletEmpty",
  props: {
    title: {},
    message: { default: "" }
  },
  setup(t) {
    return (r, e) => (l(), n("div", ie, [
      r.$slots.icon ? (l(), n("span", oe, [x(r.$slots, "icon")])) : m("", !0),
      a("strong", null, i(t.title), 1),
      t.message ? (l(), n("p", ue, i(t.message), 1)) : m("", !0)
    ]));
  }
}), de = ce, ve = {
  class: "wallet-row-mark",
  "aria-hidden": "true"
}, _e = { viewBox: "0 0 24 24" }, fe = ["d"], me = { class: "wallet-row-copy" }, he = { key: 0 }, pe = { class: "wallet-row-amount" }, ye = /* @__PURE__ */ h({
  __name: "WalletTransactionRow",
  props: { transaction: {} },
  setup(t) {
    const r = {
      income: "M12 5v14m0 0-5.5-5.5M12 19l5.5-5.5",
      expense: "M12 19V5m0 0L6.5 10.5M12 5l5.5 5.5",
      transfer: "M4 9h16m0 0-4-4m4 4-4 4M20 15H4m0 0 4 4m-4-4 4-4"
    }, e = t, o = _(() => r[e.transaction.direction] || r.transfer), f = _(() => {
      const v = e.transaction.amount.toLocaleString("zh-CN");
      return e.transaction.direction === "income" ? `+${v}` : e.transaction.direction === "expense" ? `−${v}` : v;
    }), u = _(() => {
      const v = new Date(e.transaction.createdAt), p = new Intl.DateTimeFormat("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: !1
      }).format(v);
      return e.transaction.sequence === 1 && e.transaction.sourceDomain === "economy" ? `开户 · ${p}` : p;
    });
    return (v, p) => (l(), n("li", { class: T(["wallet-row", `is-${t.transaction.direction}`]) }, [
      a("span", ve, [(l(), n("svg", _e, [a("path", { d: o.value }, null, 8, fe)]))]),
      a("div", me, [
        a("strong", null, i(t.transaction.title), 1),
        t.transaction.note ? (l(), n("p", he, i(t.transaction.note), 1)) : m("", !0),
        a("small", null, i(t.transaction.source) + " · " + i(u.value), 1)
      ]),
      a("span", pe, i(f.value), 1)
    ], 2));
  }
}), ge = ye, we = {
  key: 1,
  class: "wallet-ui-list"
}, be = {
  key: 2,
  class: "wallet-ledger-foot"
}, $e = {
  key: 0,
  class: "wallet-load-error",
  role: "alert"
}, ke = ["disabled"], Me = {
  key: 2,
  class: "wallet-ledger-end"
}, Ce = /* @__PURE__ */ h({
  __name: "WalletTransactionList",
  props: {
    transactions: {},
    hasMore: { type: Boolean },
    loadingMore: { type: Boolean },
    error: {}
  },
  emits: ["loadMore"],
  setup(t) {
    return (r, e) => (l(), n("div", null, [t.transactions.length === 1 && t.transactions[0]?.sequence === 1 && t.transactions[0]?.sourceDomain === "economy" ? (l(), S(de, {
      key: 0,
      title: "新账簿已经启用",
      message: "除了开户赠礼，还没有其他收支。"
    }, {
      icon: E(() => [...e[1] || (e[1] = [a("svg", { viewBox: "0 0 24 24" }, [a("path", { d: "m5 12.5 4.5 4.5L19 7.5" })], -1)])]),
      _: 1
    })) : (l(), n("ol", we, [(l(!0), n(P, null, U(t.transactions, (o) => (l(), S(ge, {
      key: o.id,
      transaction: o
    }, null, 8, ["transaction"]))), 128))])), t.hasMore || t.transactions.length > 1 ? (l(), n("div", be, [t.error ? (l(), n("p", $e, i(t.error), 1)) : m("", !0), t.hasMore ? (l(), n("button", {
      key: 1,
      type: "button",
      class: "wallet-ui-text-button",
      disabled: t.loadingMore,
      onClick: e[0] || (e[0] = (o) => r.$emit("loadMore"))
    }, i(t.loadingMore ? "正在翻阅…" : "翻阅更早账目"), 9, ke)) : (l(), n("span", Me, "账簿至此"))])) : m("", !0)]));
  }
}), We = Ce, xe = { class: "wallet-ui-app wallet-app" }, Be = { class: "wallet-ui-scroll" }, Se = ["disabled"], Te = ["disabled"], Ae = {
  class: "wallet-ledger",
  "aria-labelledby": "wallet-ledger-title"
}, Ee = { class: "wallet-ui-section-title" }, Ne = { class: "wallet-ui-card" }, A = 35e3, Le = /* @__PURE__ */ h({
  __name: "WalletApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(t) {
    const r = t, e = y(structuredClone(I(r.initialState))), o = y(!1), f = y(!1), u = y(""), v = y("");
    let p = () => {
    }, d = 0;
    const g = _(() => e.value.status === "unconfirmed"), b = _(() => o.value || e.value.status === "loading" || e.value.status === "saving"), N = _(() => b.value || g.value || e.value.status === "conflict"), L = _(() => !!(e.value.message || u.value)), q = _(() => u.value || e.value.status === "conflict" || e.value.status === "blocked" ? "danger" : g.value ? "warning" : "info"), D = _(() => e.value.status === "conflict" ? "账本发生冲突" : e.value.status === "blocked" ? "钱包暂时无法读取" : "账本状态");
    function $(s) {
      const c = s instanceof Error ? s.message : String(s);
      return c.includes("聊天已切换") ? "聊天已切换，请重新打开钱包。" : c === "host_request_timeout" ? "读取等待超时，请稍后重新读取。" : "钱包数据暂时无法读取，请稍后重试。";
    }
    function k() {
      return { chatIdentity: e.value.chatIdentity };
    }
    function M(s) {
      e.value = structuredClone(s), o.value = !1, f.value = !1, u.value = "", v.value = "";
    }
    async function R() {
      if (b.value || g.value || e.value.status === "conflict") return;
      const s = ++d;
      o.value = !0, u.value = "";
      try {
        const c = await r.bridge.request("wallet/refresh", k(), A);
        s === d && M(c.result);
      } catch (c) {
        s === d && (u.value = $(c));
      } finally {
        s === d && (o.value = !1);
      }
    }
    async function V() {
      if (b.value) return;
      const s = ++d;
      o.value = !0, u.value = "";
      try {
        const c = await r.bridge.request("wallet/confirm-save", k(), A);
        s === d && M(c.result.state);
      } catch (c) {
        s === d && (u.value = $(c));
      } finally {
        s === d && (o.value = !1);
      }
    }
    async function H() {
      const s = e.value.nextCursor;
      if (!s || f.value) return;
      const c = d;
      f.value = !0, v.value = "";
      try {
        const w = await r.bridge.request("wallet/load-more", {
          ...k(),
          beforeSequence: s
        });
        if (c !== d) return;
        const z = new Set(e.value.transactions.map((C) => C.id));
        e.value.transactions.push(...w.result.transactions.filter((C) => !z.has(C.id))), e.value.nextCursor = w.result.nextCursor, e.value.hasMore = w.result.hasMore;
      } catch {
        c === d && (v.value = "更多流水暂时无法读取，请稍后重试。");
      } finally {
        c === d && (f.value = !1);
      }
    }
    return Q(() => {
      p = r.bridge.subscribe((s) => {
        s.type === "wallet/state" && (d += 1, M(s.payload.state)), s.type === "wallet/error" && (u.value = $(s.payload?.message || ""));
      });
    }), F(() => {
      d += 1, p();
    }), (s, c) => (l(), n("main", xe, [W(J, { title: "钱包" }), a("div", Be, [
      W(te, {
        balance: e.value.balance,
        currency: e.value.currency,
        status: e.value.status
      }, null, 8, [
        "balance",
        "currency",
        "status"
      ]),
      L.value ? (l(), S(ne, {
        key: 0,
        class: "wallet-notice",
        tone: q.value,
        title: D.value,
        message: u.value || e.value.message
      }, {
        default: E(() => [g.value ? (l(), n("button", {
          key: 0,
          type: "button",
          class: "wallet-ui-text-button",
          disabled: o.value,
          onClick: V
        }, i(o.value ? "正在核实…" : "核实保存结果"), 9, Se)) : e.value.status === "blocked" || u.value ? (l(), n("button", {
          key: 1,
          type: "button",
          class: "wallet-ui-text-button",
          disabled: N.value,
          onClick: R
        }, i(o.value ? "正在读取…" : "重新读取"), 9, Te)) : m("", !0)]),
        _: 1
      }, 8, [
        "tone",
        "title",
        "message"
      ])) : m("", !0),
      a("section", Ae, [a("div", Ee, [c[0] || (c[0] = a("h2", { id: "wallet-ledger-title" }, "流水明细", -1)), a("small", null, i(e.value.transactionCount) + " 笔", 1)]), a("div", Ne, [W(We, {
        transactions: e.value.transactions,
        "has-more": e.value.hasMore,
        "loading-more": f.value,
        error: v.value,
        onLoadMore: H
      }, null, 8, [
        "transactions",
        "has-more",
        "loading-more",
        "error"
      ])])])
    ])]));
  }
}), De = Le;
export {
  De as default
};
