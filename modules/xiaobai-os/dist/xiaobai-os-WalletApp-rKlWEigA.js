/* eslint-disable */
import { A as Z, B as r, E as I, I as J, L as $, P as w, R as C, S as z, T as A, _ as g, b as X, c as E, d as e, f as B, g as S, l as T, m as s, p as h, s as Y, u as _, v as b, w as n } from "./xiaobai-os-runtime-dom.esm-bundler-DQLnRQQ3.js";
var ee = {
  class: "wallet-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.7",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true",
  focusable: "false"
}, te = ["d"], ae = /* @__PURE__ */ b({
  __name: "WalletIcon",
  props: { name: {} },
  setup(t) {
    const i = {
      wallet: "M4 6h14a2 2 0 0 1 2 2v11H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12v2M20 11h-5v5h5M17 13.5h.1",
      refresh: "M20 5v6h-6M4 19v-6h6M6 7a7 7 0 0 1 12-1l2 5M4 13l2 5a7 7 0 0 0 12-1",
      income: "M12 4v16m-6-6 6 6 6-6",
      expense: "M12 20V4m-6 6 6-6 6 6",
      transfer: "M3 8h18m-5-5 5 5-5 5M21 16H3m5-5-5 5 5 5",
      shop: "M5 7h14l1 14H4L5 7Zm3 0V5a4 4 0 0 1 8 0v2",
      bank: "M3 8h18L12 2 3 8Zm2 3v7m7-7v7m7-7v7M3 21h18",
      tasks: "M6 3h12v18H6V3Zm3 5h6m-6 4h6m-6 4h3",
      game: "M6 3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Zm1 4h.1m9.9 0h.1M12 12h.1M7 17h.1m9.9 0h.1",
      gift: "M3 8h18v5H3V8Zm2 5v8h14v-8M12 8v13M12 8C2 8 7 0 12 8Zm0 0c10 0 5-8 0 0Z",
      receipt: "M6 3h12v18l-3-2-3 2-3-2-3 2V3Zm3 5h6m-6 4h6",
      next: "m9 5 7 7-7 7",
      close: "m6 6 12 12M6 18 18 6"
    };
    return (a, c) => (n(), s("svg", ee, [e("path", { d: i[t.name] || i.receipt }, null, 8, te)]));
  }
}), y = ae, le = { class: "wallet-ui-header" }, ne = { class: "wallet-brand" }, se = ["disabled"], re = /* @__PURE__ */ b({
  __name: "WalletAppHeader",
  props: {
    refreshing: { type: Boolean },
    disabled: { type: Boolean }
  },
  emits: ["refresh"],
  setup(t) {
    return (i, a) => (n(), s("header", le, [
      e("span", ne, [g(y, { name: "wallet" })]),
      a[1] || (a[1] = e("h1", { class: "wallet-ui-title" }, "钱包", -1)),
      a[2] || (a[2] = e("span", { class: "wallet-header-context" }, "当前聊天", -1)),
      e("button", {
        type: "button",
        class: "wallet-icon-button",
        disabled: t.disabled,
        "aria-label": "刷新钱包",
        onClick: a[0] || (a[0] = (c) => i.$emit("refresh"))
      }, [g(y, {
        name: "refresh",
        class: C({ "is-spinning": t.refreshing })
      }, null, 8, ["class"])], 8, se)
    ]));
  }
}), ie = re, oe = {
  class: "wallet-pocket",
  "aria-labelledby": "wallet-balance-title"
}, ue = { class: "wallet-balance" }, de = { class: "wallet-balance-chip" }, ce = ["aria-label"], ve = {
  class: "wallet-pocket-clasp",
  "aria-hidden": "true"
}, me = /* @__PURE__ */ b({
  __name: "WalletBalanceCard",
  props: {
    balance: {},
    currency: {},
    status: {}
  },
  setup(t) {
    const i = t, a = _(() => ({
      ready: "账目就绪",
      loading: "正在准备",
      saving: "正在保存",
      unconfirmed: "保存待确认",
      conflict: "账目已冻结",
      blocked: "暂时不可用"
    })[i.status]);
    return (c, v) => (n(), s("section", oe, [v[2] || (v[2] = e("div", {
      class: "wallet-pocket-cards",
      "aria-hidden": "true"
    }, [e("span"), e("span")], -1)), e("div", ue, [
      e("header", null, [v[0] || (v[0] = e("span", { id: "wallet-balance-title" }, "可用余额", -1)), e("span", de, [e("i", { class: C(`is-${t.status}`) }, null, 2), S(r(a.value), 1)])]),
      e("div", {
        class: "wallet-balance-value",
        "aria-label": t.status === "loading" ? "余额正在读取" : `${t.balance.toLocaleString("zh-CN")} ${t.currency}`
      }, [v[1] || (v[1] = e("small", null, "¤", -1)), e("strong", null, r(t.status === "loading" ? "—" : t.balance.toLocaleString("zh-CN")), 1)], 8, ce),
      e("footer", null, [e("span", null, r(t.currency) + " · 日常收支", 1), e("span", ve, [g(y, { name: "wallet" })])])
    ])]));
  }
}), fe = me, pe = {
  class: "wallet-ui-notice-icon",
  "aria-hidden": "true"
}, he = { class: "wallet-ui-notice-copy" }, ge = { key: 0 }, we = /* @__PURE__ */ b({
  __name: "WalletNotice",
  props: {
    title: {},
    message: { default: "" },
    tone: { default: "info" }
  },
  setup(t) {
    return (i, a) => (n(), s("aside", {
      class: C(["wallet-ui-notice", `is-${t.tone}`]),
      role: "status"
    }, [e("span", pe, [I(i.$slots, "icon", {}, () => [a[0] || (a[0] = S("!", -1))])]), e("div", he, [
      e("strong", null, r(t.title), 1),
      t.message ? (n(), s("p", ge, r(t.message), 1)) : h("", !0),
      I(i.$slots, "default")
    ])], 2));
  }
}), ye = we, be = { class: "wallet-ui-empty" }, _e = {
  key: 0,
  class: "wallet-ui-empty-icon",
  "aria-hidden": "true"
}, $e = { key: 1 }, ke = /* @__PURE__ */ b({
  __name: "WalletEmpty",
  props: {
    title: {},
    message: { default: "" }
  },
  setup(t) {
    return (i, a) => (n(), s("div", be, [
      i.$slots.icon ? (n(), s("span", _e, [I(i.$slots, "icon")])) : h("", !0),
      e("strong", null, r(t.title), 1),
      t.message ? (n(), s("p", $e, r(t.message), 1)) : h("", !0)
    ]));
  }
}), Me = ke;
function F(t) {
  return `${t.direction === "income" ? "+" : t.direction === "expense" ? "−" : ""}${t.amount.toLocaleString("zh-CN")}`;
}
var R = {
  income: "收入",
  expense: "支出",
  transfer: "系统划转"
};
function O(t) {
  return {
    economy: "gift",
    bank: "bank",
    shop: "shop",
    tasks: "tasks",
    game: "game"
  }[t.sourceDomain] || t.direction;
}
var Ce = {
  class: "wallet-row-mark",
  "aria-hidden": "true"
}, We = { class: "wallet-row-copy" }, Te = { class: "wallet-row-value" }, Be = /* @__PURE__ */ b({
  __name: "WalletTransactionRow",
  props: { transaction: {} },
  emits: ["open"],
  setup(t) {
    const i = new Intl.DateTimeFormat("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: !1
    });
    return (a, c) => (n(), s("li", null, [e("button", {
      type: "button",
      class: C(["wallet-row", `is-${t.transaction.direction}`]),
      onClick: c[0] || (c[0] = (v) => a.$emit("open", t.transaction))
    }, [
      e("span", Ce, [g(y, { name: $(O)(t.transaction) }, null, 8, ["name"])]),
      e("span", We, [e("strong", null, r(t.transaction.title), 1), e("small", null, r(t.transaction.source) + " · " + r($(i).format(t.transaction.createdAt)), 1)]),
      e("span", Te, [e("strong", null, r($(F)(t.transaction)), 1), e("small", null, r($(R)[t.transaction.direction]), 1)])
    ], 2)]));
  }
}), Se = Be, xe = {
  class: "wallet-filters",
  "aria-label": "账单类型"
}, Ne = ["aria-pressed", "onClick"], Le = {
  key: 0,
  class: "wallet-ledger-caption"
}, Ve = {
  key: 1,
  class: "wallet-ui-empty",
  role: "status"
}, Ae = { class: "wallet-ui-list" }, Ee = { class: "wallet-ledger-foot" }, Ie = {
  key: 0,
  class: "wallet-load-error",
  role: "alert"
}, De = ["disabled"], He = {
  key: 2,
  class: "wallet-ledger-end"
}, qe = /* @__PURE__ */ b({
  __name: "WalletTransactionList",
  props: {
    transactions: {},
    hasMore: { type: Boolean },
    loadingMore: { type: Boolean },
    loading: { type: Boolean },
    error: {}
  },
  emits: ["loadMore", "open"],
  setup(t) {
    const i = t, a = w("all"), c = [
      {
        id: "all",
        label: "全部"
      },
      {
        id: "income",
        label: "收入"
      },
      {
        id: "expense",
        label: "支出"
      },
      {
        id: "transfer",
        label: "划转"
      }
    ], v = new Intl.DateTimeFormat("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }), l = _(() => {
      const p = [];
      for (const m of i.transactions) {
        if (a.value !== "all" && m.direction !== a.value) continue;
        const f = v.format(m.createdAt), u = p.at(-1);
        u?.date === f ? u.transactions.push(m) : p.push({
          date: f,
          transactions: [m]
        });
      }
      return p;
    });
    return (p, m) => (n(), s("div", null, [
      e("div", xe, [(n(), s(T, null, A(c, (f) => e("button", {
        key: f.id,
        type: "button",
        "aria-pressed": a.value === f.id,
        onClick: (u) => a.value = f.id
      }, r(f.label), 9, Ne)), 64))]),
      a.value === "transfer" ? (n(), s("p", Le, "系统账户间的划转，不计入你的个人收支。")) : h("", !0),
      t.loading ? (n(), s("div", Ve, [g(y, {
        name: "refresh",
        class: "is-spinning"
      }), m[2] || (m[2] = e("strong", null, "正在准备你的钱包…", -1))])) : (n(), s(T, { key: 2 }, [
        l.value.length ? h("", !0) : (n(), B(Me, {
          key: 0,
          title: t.hasMore ? "已加载的账目中暂无匹配项" : "这里还没有账目",
          message: "每一笔已确认的资金流动，都会记在这里。"
        }, {
          icon: Z(() => [g(y, { name: "receipt" })]),
          _: 1
        }, 8, ["title"])),
        (n(!0), s(T, null, A(l.value, (f) => (n(), s("section", {
          key: f.transactions[0].id,
          class: "wallet-day-group"
        }, [e("h3", null, r(f.date), 1), e("ol", Ae, [(n(!0), s(T, null, A(f.transactions, (u) => (n(), B(Se, {
          key: u.id,
          transaction: u,
          onOpen: m[0] || (m[0] = (M) => p.$emit("open", M))
        }, null, 8, ["transaction"]))), 128))])]))), 128)),
        e("div", Ee, [t.error ? (n(), s("p", Ie, r(t.error), 1)) : h("", !0), t.hasMore ? (n(), s("button", {
          key: 1,
          type: "button",
          class: "wallet-ui-text-button",
          disabled: t.loadingMore,
          onClick: m[1] || (m[1] = (f) => p.$emit("loadMore"))
        }, [S(r(t.loadingMore ? "正在读取…" : "查看更早的账单"), 1), g(y, { name: "next" })], 8, De)) : t.transactions.length ? (n(), s("span", He, "每一笔，都有来处")) : h("", !0)])
      ], 64))
    ]));
  }
}), Ze = qe, ze = { class: "wallet-row-mark" }, Fe = {
  key: 0,
  class: "wallet-receipt-note"
}, Re = {
  key: 0,
  class: "wallet-ledger-caption"
}, Oe = /* @__PURE__ */ b({
  __name: "WalletTransactionDetail",
  props: { transaction: {} },
  emits: ["close"],
  setup(t) {
    const i = w(null), a = w(null);
    z(() => i.value?.showModal());
    const c = new Intl.DateTimeFormat("zh-CN", {
      dateStyle: "medium",
      timeStyle: "short",
      hour12: !1
    });
    return (v, l) => (n(), s("dialog", {
      ref_key: "dialog",
      ref: i,
      class: "wallet-receipt",
      "aria-label": "账单详情",
      onCancel: l[1] || (l[1] = E((p) => v.$emit("close"), ["prevent"])),
      onKeydown: [l[2] || (l[2] = E(() => {
      }, ["stop"])), l[3] || (l[3] = Y(E((p) => a.value?.focus(), ["prevent"]), ["tab"]))]
    }, [
      e("header", null, [l[4] || (l[4] = e("span", null, "账单详情", -1)), e("button", {
        ref_key: "closeButton",
        ref: a,
        type: "button",
        class: "wallet-icon-button",
        "aria-label": "关闭账单详情",
        autofocus: "",
        onClick: l[0] || (l[0] = (p) => v.$emit("close"))
      }, [g(y, { name: "close" })], 512)]),
      e("div", { class: C(["wallet-receipt-hero", `is-${t.transaction.direction}`]) }, [
        e("span", ze, [g(y, { name: $(O)(t.transaction) }, null, 8, ["name"])]),
        e("h2", null, r(t.transaction.title), 1),
        e("strong", null, [S(r($(F)(t.transaction)), 1), l[5] || (l[5] = e("small", null, "小白币", -1))]),
        e("span", null, r($(R)[t.transaction.direction]), 1)
      ], 2),
      e("dl", null, [
        e("div", null, [l[6] || (l[6] = e("dt", null, "来自", -1)), e("dd", null, r(t.transaction.source), 1)]),
        e("div", null, [l[7] || (l[7] = e("dt", null, "发生时间", -1)), e("dd", null, r($(c).format(t.transaction.createdAt)), 1)]),
        e("div", null, [l[8] || (l[8] = e("dt", null, "账目序号", -1)), e("dd", null, "#" + r(t.transaction.sequence), 1)]),
        t.transaction.note ? (n(), s("div", Fe, [l[9] || (l[9] = e("dt", null, "备注", -1)), e("dd", null, r(t.transaction.note), 1)])) : h("", !0)
      ]),
      t.transaction.direction === "transfer" ? (n(), s("p", Re, "这笔资金在系统账户之间流转，不是你的收入或支出。")) : h("", !0),
      l[10] || (l[10] = e("footer", null, "小白 OS · 当前聊天账本", -1))
    ], 544));
  }
}), Ue = Oe, Ke = { class: "wallet-ui-app wallet-app" }, je = { class: "wallet-ui-scroll" }, Ge = ["disabled"], Pe = ["disabled"], Qe = {
  class: "wallet-ledger",
  "aria-labelledby": "wallet-ledger-title"
}, Je = { class: "wallet-ui-section-title" }, q = 35e3, Xe = /* @__PURE__ */ b({
  __name: "WalletApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(t) {
    const i = t, a = w(structuredClone(J(i.initialState))), c = w(!1), v = w(!1), l = w(""), p = w(""), m = w(null);
    let f = () => {
    }, u = 0;
    const M = _(() => a.value.status === "unconfirmed"), W = _(() => c.value || a.value.status === "loading" || a.value.status === "saving"), D = _(() => W.value || M.value || a.value.status === "conflict"), U = _(() => !!(a.value.message || l.value)), K = _(() => l.value || a.value.status === "conflict" || a.value.status === "blocked" ? "danger" : M.value ? "warning" : "info"), j = _(() => a.value.status === "conflict" ? "账本发生冲突" : a.value.status === "blocked" ? "钱包暂时无法读取" : "账本状态");
    function x(o) {
      const d = o instanceof Error ? o.message : String(o);
      return d.includes("聊天已切换") ? "聊天已切换，请重新打开钱包。" : d === "host_request_timeout" ? "读取等待超时，请稍后重新读取。" : "钱包数据暂时无法读取，请稍后重试。";
    }
    function N() {
      return { chatIdentity: a.value.chatIdentity };
    }
    function L(o) {
      a.value = structuredClone(o), c.value = !1, v.value = !1, l.value = "", p.value = "";
    }
    async function H() {
      if (W.value || M.value || a.value.status === "conflict") return;
      const o = ++u;
      c.value = !0, l.value = "";
      try {
        const d = await i.bridge.request("wallet/refresh", N(), q);
        o === u && L(d.result);
      } catch (d) {
        o === u && (l.value = x(d));
      } finally {
        o === u && (c.value = !1);
      }
    }
    async function G() {
      if (W.value) return;
      const o = ++u;
      c.value = !0, l.value = "";
      try {
        const d = await i.bridge.request("wallet/confirm-save", N(), q);
        o === u && L(d.result.state);
      } catch (d) {
        o === u && (l.value = x(d));
      } finally {
        o === u && (c.value = !1);
      }
    }
    async function P() {
      const o = a.value.nextCursor;
      if (!o || v.value || W.value) return;
      const d = u;
      v.value = !0, p.value = "";
      try {
        const k = await i.bridge.request("wallet/load-more", {
          ...N(),
          beforeSequence: o
        });
        if (d !== u) return;
        const Q = new Set(a.value.transactions.map((V) => V.id));
        a.value.transactions.push(...k.result.transactions.filter((V) => !Q.has(V.id))), a.value.nextCursor = k.result.nextCursor, a.value.hasMore = k.result.hasMore;
      } catch {
        d === u && (p.value = "更多流水暂时无法读取，请稍后重试。");
      } finally {
        d === u && (v.value = !1);
      }
    }
    return z(() => {
      f = i.bridge.subscribe((o) => {
        o.type === "wallet/state" && (u += 1, L(o.payload.state)), o.type === "wallet/error" && (l.value = x(o.payload?.message || ""));
      });
    }), X(() => {
      u += 1, f();
    }), (o, d) => (n(), s("main", Ke, [
      g(ie, {
        refreshing: c.value,
        disabled: D.value,
        onRefresh: H
      }, null, 8, ["refreshing", "disabled"]),
      e("div", je, [
        g(fe, {
          balance: a.value.balance,
          currency: a.value.currency,
          status: a.value.status
        }, null, 8, [
          "balance",
          "currency",
          "status"
        ]),
        U.value ? (n(), B(ye, {
          key: 0,
          class: "wallet-notice",
          tone: K.value,
          title: j.value,
          message: l.value || a.value.message
        }, {
          default: Z(() => [M.value ? (n(), s("button", {
            key: 0,
            type: "button",
            class: "wallet-ui-text-button",
            disabled: c.value,
            onClick: G
          }, r(c.value ? "正在核实…" : "核实保存结果"), 9, Ge)) : a.value.status === "blocked" || l.value ? (n(), s("button", {
            key: 1,
            type: "button",
            class: "wallet-ui-text-button",
            disabled: D.value,
            onClick: H
          }, r(c.value ? "正在读取…" : "重新读取"), 9, Pe)) : h("", !0)]),
          _: 1
        }, 8, [
          "tone",
          "title",
          "message"
        ])) : h("", !0),
        e("section", Qe, [e("div", Je, [d[2] || (d[2] = e("h2", { id: "wallet-ledger-title" }, "收支账单", -1)), e("small", null, "共 " + r(a.value.transactionCount) + " 笔", 1)]), g(Ze, {
          transactions: a.value.transactions,
          "has-more": a.value.hasMore,
          "loading-more": v.value,
          loading: a.value.status === "loading",
          error: p.value,
          onLoadMore: P,
          onOpen: d[0] || (d[0] = (k) => m.value = k)
        }, null, 8, [
          "transactions",
          "has-more",
          "loading-more",
          "loading",
          "error"
        ])])
      ]),
      m.value ? (n(), B(Ue, {
        key: 0,
        transaction: m.value,
        onClose: d[1] || (d[1] = (k) => m.value = null)
      }, null, 8, ["transaction"])) : h("", !0)
    ]));
  }
}), et = Xe;
export {
  et as default
};
