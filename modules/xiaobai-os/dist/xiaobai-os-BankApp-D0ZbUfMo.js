/* eslint-disable */
import { B as R, C as Y, E as P, H as l, I as _, N as se, R as ie, T as s, _ as g, a as oe, c as G, d as e, f as E, g as F, l as S, m as i, p as k, u as C, v as M, x as ue, z as re } from "./xiaobai-os-runtime-dom.esm-bundler-DwdCK5Jt.js";
var de = class extends Error {
  code;
  constructor(a, u = "") {
    super(u ? `${a}:${u}` : a), this.name = "BankError", this.code = a;
  }
};
function x(a, u = "") {
  throw new de(a, u);
}
var X = 1e4;
function J(a, u = "amount") {
  return (typeof a != "number" || !Number.isSafeInteger(a) || a <= 0) && x("bank_amount_invalid", u), a;
}
function ve(a, u = "payout") {
  return (typeof a != "number" || !Number.isSafeInteger(a) || a < 0) && x("bank_amount_invalid", u), a > 5e4 && x("bank_amount_overflow", u), a;
}
function Q(a, u) {
  return (typeof a != "number" || !Number.isSafeInteger(a) || a <= 0) && x("bank_amount_invalid", u), a;
}
function be(a, u, n) {
  const t = J(a), v = Q(u, "numerator"), f = Q(n, "denominator");
  return t > Math.floor(Number.MAX_SAFE_INTEGER / v) && x("bank_amount_overflow"), ve(Math.floor(t * v / f));
}
function ce(a, u) {
  const n = J(a, "principal");
  (typeof u != "number" || !Number.isSafeInteger(u)) && x("bank_amount_invalid", "bps");
  const t = X + u;
  return (!Number.isSafeInteger(t) || t < 0) && x("bank_amount_invalid", "bps"), t === 0 ? 0 : be(n, t, X);
}
var ke = ["aria-label"], me = { class: "bank-dialog-subject" }, fe = { key: 0 }, pe = { class: "bank-dialog-field" }, ge = { class: "bank-amount-input" }, ye = ["disabled"], he = {
  id: "bank-amount-help",
  class: "bank-amount-help"
}, $e = { class: "bank-quick-amounts" }, we = [
  "disabled",
  "aria-pressed",
  "onClick"
], _e = {
  key: 1,
  class: "bank-inline-error",
  role: "status"
}, Ce = {
  key: 2,
  class: "bank-dialog-summary"
}, Be = { key: 0 }, Ae = { class: "bank-dialog-summary" }, Se = { class: "bank-withdraw-amount" }, Me = { class: "bank-dialog-summary" }, Le = { class: "is-loss" }, Ne = {
  key: 5,
  class: "bank-amount-help"
}, Ie = {
  key: 6,
  class: "bank-inline-error",
  role: "status"
}, De = {
  key: 7,
  class: "bank-inline-error",
  role: "alert"
}, Re = { class: "bank-dialog-actions" }, Pe = ["disabled"], xe = ["disabled"], ze = /* @__PURE__ */ M({
  __name: "BankActionDialog",
  props: {
    mode: {},
    product: {},
    position: {},
    balance: {},
    busy: { type: Boolean },
    error: {},
    disabledReason: {},
    claimableCount: {}
  },
  emits: ["cancel", "confirm"],
  setup(a, { emit: u }) {
    const n = a, t = u, v = _(null);
    Y(() => v.value?.showModal());
    const f = _(n.product ? String(n.product.minAmount) : ""), w = C(() => n.mode === "deposit-open" ? "存入定期" : n.mode === "fund-open" ? "申购理财" : "提前支取"), p = C(() => /^\d+$/.test(f.value.trim()) ? Number(f.value) : 0), B = C(() => n.mode === "withdraw" ? "" : !n.product || !Number.isSafeInteger(p.value) || p.value <= 0 ? "请输入正整数金额" : p.value < n.product.minAmount || p.value > n.product.maxAmount ? `金额须在 ${n.product.minAmount.toLocaleString("zh-CN")} 至 ${n.product.maxAmount.toLocaleString("zh-CN")} 之间` : p.value > n.balance ? "可用余额不足" : ""), $ = C(() => n.mode === "deposit-open" ? n.product : null), A = C(() => n.mode === "fund-open" ? n.product : null), L = C(() => $.value && !B.value ? ce(p.value, $.value.interestBps) : null), N = C(() => {
      const b = n.product;
      return b ? [.../* @__PURE__ */ new Set([
        b.minAmount,
        b.minAmount * 2,
        Math.min(b.maxAmount, n.balance)
      ])].filter((r) => r >= b.minAmount && r <= b.maxAmount && r <= n.balance).sort((r, h) => r - h) : [];
    }), T = C(() => !n.busy && !n.disabledReason && !B.value);
    function m() {
      T.value && (n.mode === "withdraw" ? t("confirm") : t("confirm", p.value));
    }
    function K(b) {
      if (b.stopPropagation(), b.key !== "Tab") return;
      const r = Array.from(v.value?.querySelectorAll("button:not(:disabled), input:not(:disabled)") ?? []), h = r[0], I = r.at(-1);
      if (!h) {
        b.preventDefault();
        return;
      }
      b.shiftKey && document.activeElement === h ? (b.preventDefault(), I?.focus()) : !b.shiftKey && document.activeElement === I && (b.preventDefault(), h.focus());
    }
    return (b, r) => (s(), i("dialog", {
      ref_key: "dialog",
      ref: v,
      class: "bank-dialog",
      "aria-label": w.value,
      onCancel: r[2] || (r[2] = G((h) => !a.busy && t("cancel"), ["prevent"])),
      onKeydown: K
    }, [e("form", { onSubmit: G(m, ["prevent"]) }, [
      e("h2", null, l(w.value), 1),
      e("div", me, [e("strong", null, l(a.position?.name || a.product?.name), 1), a.product ? (s(), i("span", fe, l(a.product.lockRounds) + " 回合", 1)) : k("", !0)]),
      a.mode !== "withdraw" ? (s(), i(S, { key: 0 }, [
        e("label", pe, [e("span", null, l(a.mode === "deposit-open" ? "存入金额" : "申购金额"), 1), e("span", ge, [r[3] || (r[3] = e("i", null, "¤", -1)), se(e("input", {
          "onUpdate:modelValue": r[0] || (r[0] = (h) => f.value = h),
          disabled: a.busy,
          type: "text",
          inputmode: "numeric",
          autocomplete: "off",
          "aria-describedby": "bank-amount-help"
        }, null, 8, ye), [[oe, f.value]])])]),
        e("small", he, "钱包可用 ¤ " + l(a.balance.toLocaleString("zh-CN")) + " · " + l(a.product?.amountLabel), 1),
        e("div", $e, [(s(!0), i(S, null, P(N.value, (h) => (s(), i("button", {
          key: h,
          type: "button",
          disabled: a.busy,
          "aria-pressed": p.value === h,
          onClick: (I) => f.value = String(h)
        }, "¤ " + l(h.toLocaleString("zh-CN")), 9, we))), 128))])
      ], 64)) : k("", !0),
      B.value ? (s(), i("p", _e, l(B.value), 1)) : k("", !0),
      $.value ? (s(), i("dl", Ce, [
        e("div", null, [r[4] || (r[4] = e("dt", null, "整期收益率", -1)), e("dd", null, l($.value.interestLabel), 1)]),
        L.value !== null ? (s(), i("div", Be, [r[5] || (r[5] = e("dt", null, "到期到账（含本金）", -1)), e("dd", null, "¤ " + l(L.value.toLocaleString("zh-CN")), 1)])) : k("", !0),
        e("div", null, [r[6] || (r[6] = e("dt", null, "提前支取", -1)), e("dd", null, "本金 " + l($.value.earlyPenaltyLabel) + "，无利息", 1)])
      ])) : k("", !0),
      A.value ? (s(), i(S, { key: 3 }, [e("dl", Ae, [e("div", null, [r[7] || (r[7] = e("dt", null, "整期收益区间", -1)), e("dd", null, l(A.value.returnLabel), 1)]), e("div", null, [r[8] || (r[8] = e("dt", null, "风险等级", -1)), e("dd", null, l(A.value.riskLabel), 1)])]), r[9] || (r[9] = e("p", { class: "bank-dialog-warning" }, "可能损失本金。申购后不能提前退出，实际收益封存至到期才揭晓。", -1))], 64)) : k("", !0),
      a.mode === "withdraw" && a.position ? (s(), i(S, { key: 4 }, [
        e("div", Se, [r[10] || (r[10] = e("span", null, "现在实际到账", -1)), e("strong", null, "¤ " + l(a.position.earlyWithdrawalAmount.toLocaleString("zh-CN")), 1)]),
        e("dl", Me, [e("div", null, [r[11] || (r[11] = e("dt", null, "原存入本金", -1)), e("dd", null, "¤ " + l(a.position.principal.toLocaleString("zh-CN")), 1)]), e("div", null, [r[12] || (r[12] = e("dt", null, "提前支取损失", -1)), e("dd", Le, "¤ " + l((a.position.principal - a.position.earlyWithdrawalAmount).toLocaleString("zh-CN")), 1)])]),
        r[13] || (r[13] = e("p", { class: "bank-dialog-warning" }, "不再获得到期利息，确认后不可撤销。", -1))
      ], 64)) : k("", !0),
      a.claimableCount ? (s(), i("p", Ne, "另有 " + l(a.claimableCount) + " 笔到期资产，将随本次操作一并兑付至钱包。", 1)) : k("", !0),
      a.disabledReason && !a.busy ? (s(), i("p", Ie, l(a.disabledReason), 1)) : k("", !0),
      a.error ? (s(), i("p", De, l(a.error), 1)) : k("", !0),
      e("footer", Re, [e("button", {
        type: "button",
        class: "bank-secondary-button",
        disabled: a.busy,
        autofocus: "",
        onClick: r[1] || (r[1] = (h) => t("cancel"))
      }, "返回", 8, Pe), e("button", {
        type: "submit",
        class: "bank-primary-button",
        disabled: !T.value
      }, l(a.busy ? "正在保存…" : a.mode === "withdraw" ? "确认支取" : a.mode === "fund-open" ? "确认申购" : "确认存入"), 9, xe)])
    ], 32)], 40, ke));
  }
}), Ee = ze, Te = {
  class: "bank-page",
  "aria-labelledby": "bank-deposits-title"
}, Ve = { class: "bank-product-grid" }, qe = { class: "bank-term-pill" }, Ue = { class: "bank-product-offer" }, Fe = { class: "bank-deposit-rate" }, Ke = [
  "aria-label",
  "disabled",
  "onClick"
], He = { class: "bank-product-terms" }, Oe = {
  key: 0,
  class: "bank-product-hint"
}, We = /* @__PURE__ */ M({
  __name: "BankDeposits",
  props: {
    products: {},
    balance: {},
    writeDisabledReason: {}
  },
  emits: ["open"],
  setup(a) {
    return (u, n) => (s(), i("section", Te, [
      n[3] || (n[3] = e("header", { class: "bank-page-heading" }, [e("h2", { id: "bank-deposits-title" }, "定期存单")], -1)),
      e("div", Ve, [(s(!0), i(S, null, P(a.products, (t) => (s(), i("article", {
        key: t.id,
        class: "bank-product-card bank-deposit-card"
      }, [
        e("header", null, [e("h3", null, l(t.name), 1), e("span", qe, l(t.lockRounds) + " 回合", 1)]),
        e("div", Ue, [e("div", Fe, [e("strong", null, l(t.interestLabel), 1), n[0] || (n[0] = e("span", null, "整期收益率 · 非年化", -1))]), e("button", {
          type: "button",
          class: "bank-primary-button",
          "aria-label": `存入${t.name}`,
          disabled: !!a.writeDisabledReason || a.balance < t.minAmount,
          onClick: (v) => u.$emit("open", t)
        }, "存入", 8, Ke)]),
        e("dl", He, [e("div", null, [n[1] || (n[1] = e("dt", null, "存入范围", -1)), e("dd", null, l(t.amountLabel), 1)]), e("div", null, [n[2] || (n[2] = e("dt", null, "提前支取", -1)), e("dd", null, "本金 " + l(t.earlyPenaltyLabel) + "，无利息", 1)])]),
        a.balance < t.minAmount ? (s(), i("p", Oe, "钱包余额不足最低存入金额")) : k("", !0)
      ]))), 128))]),
      n[4] || (n[4] = e("p", { class: "bank-footnote" }, "每完成一条剧情回复，推进一回合。", -1))
    ]));
  }
}), Ze = We, je = {
  class: "bank-page",
  "aria-labelledby": "bank-funds-title"
}, Ge = { class: "bank-product-grid" }, Xe = ["data-risk"], Qe = { class: "bank-fund-description" }, Ye = { class: "bank-product-offer" }, Je = { class: "bank-return-range" }, en = [
  "aria-label",
  "disabled",
  "onClick"
], nn = { class: "bank-product-terms" }, an = {
  key: 0,
  class: "bank-product-hint"
}, tn = /* @__PURE__ */ M({
  __name: "BankFunds",
  props: {
    products: {},
    balance: {},
    writeDisabledReason: {}
  },
  emits: ["open"],
  setup(a) {
    return (u, n) => (s(), i("section", je, [
      n[3] || (n[3] = e("header", { class: "bank-page-heading" }, [e("h2", { id: "bank-funds-title" }, "浮动理财"), e("p", null, "可能损失本金，到期前不可退出。")], -1)),
      e("div", Ge, [(s(!0), i(S, null, P(a.products, (t) => (s(), i("article", {
        key: t.id,
        class: "bank-product-card bank-fund-card",
        "data-risk": t.riskLevel
      }, [
        e("header", null, [e("h3", null, l(t.name), 1), e("span", { class: R(["bank-risk-badge", `is-${t.riskLevel}`]) }, l(t.riskLabel), 3)]),
        e("p", Qe, l(t.description), 1),
        e("div", Ye, [e("div", Je, [e("strong", null, l(t.returnLabel), 1), n[0] || (n[0] = e("span", null, "整期收益区间 · 非年化", -1))]), e("button", {
          type: "button",
          class: "bank-primary-button",
          "aria-label": `申购${t.name}`,
          disabled: !!a.writeDisabledReason || a.balance < t.minAmount,
          onClick: (v) => u.$emit("open", t)
        }, "申购", 8, en)]),
        e("dl", nn, [e("div", null, [n[1] || (n[1] = e("dt", null, "申购范围", -1)), e("dd", null, l(t.amountLabel), 1)]), e("div", null, [n[2] || (n[2] = e("dt", null, "锁定期限", -1)), e("dd", null, l(t.lockRounds) + " 回合", 1)])]),
        a.balance < t.minAmount ? (s(), i("p", an, "钱包余额不足最低申购金额")) : k("", !0)
      ], 8, Xe))), 128))]),
      n[4] || (n[4] = e("p", { class: "bank-footnote" }, "以上为合同区间，实际收益到期揭晓。", -1))
    ]));
  }
}), ln = tn, sn = {
  class: "bank-product-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.7",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true",
  focusable: "false"
}, on = ["d"], un = {
  key: 0,
  cx: "12",
  cy: "12",
  r: "6"
}, rn = /* @__PURE__ */ M({
  __name: "BankProductIcon",
  props: { kind: {} },
  setup(a) {
    const u = {
      vault: "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm-2 4h2m-2 10h2m7-9v8m-4-4h8",
      deposit: "M5 3h11l3 3v15H5V3Zm11 0v3h3M8 9h8m-8 4h6m-6 4h4",
      fund: "M4 20h16M5 16l5-5 4 3 5-8m-4 0h4v4",
      records: "M5 3h14v18l-3-2-4 2-4-2-3 2V3Zm3 5h8m-8 4h8m-8 4h4",
      withdraw: "M3 12h13m-4-4 4 4-4 4M19 4h2v16h-2",
      positions: "M3 8h18v12H3V8Zm5 0V4h8v4M3 13h18M10 13v3h4v-3",
      refresh: "M20 5v6h-6M4 19v-6h6M6 7a7 7 0 0 1 12-1l2 5M4 13l2 5a7 7 0 0 0 12-1",
      next: "m9 5 7 7-7 7",
      lock: "M5 10h14v11H5V10Zm3 0V6a4 4 0 0 1 8 0v4m-4 5v2",
      check: "m5 12 4 4L19 6"
    };
    return (n, t) => (s(), i("svg", sn, [e("path", { d: u[a.kind] }, null, 8, on), a.kind === "vault" ? (s(), i("circle", un)) : k("", !0)]));
  }
}), y = rn, dn = {
  class: "bank-page",
  "aria-labelledby": "bank-positions-title"
}, vn = ["disabled"], bn = {
  key: 1,
  class: "bank-empty-state"
}, cn = {
  key: 2,
  class: "bank-position-group"
}, kn = { class: "bank-section-heading" }, mn = { class: "bank-product-mark" }, fn = { class: "bank-position-amounts" }, pn = { key: 0 }, gn = ["disabled", "onClick"], yn = {
  key: 3,
  class: "bank-position-group"
}, hn = { class: "bank-section-heading" }, $n = { class: "bank-product-mark" }, wn = { class: "bank-fund-principal" }, _n = {
  key: 1,
  class: "bank-sealed-copy"
}, Cn = /* @__PURE__ */ M({
  __name: "BankPositions",
  props: {
    deposits: {},
    investments: {},
    claimableCount: {},
    writeDisabledReason: {}
  },
  emits: [
    "withdraw",
    "settle",
    "browse"
  ],
  setup(a) {
    return (u, n) => (s(), i("section", dn, [
      n[10] || (n[10] = e("header", { class: "bank-page-heading" }, [e("h2", { id: "bank-positions-title" }, "我的持有")], -1)),
      a.claimableCount ? (s(), i("button", {
        key: 0,
        type: "button",
        class: "bank-claim-button",
        disabled: !!a.writeDisabledReason,
        onClick: n[0] || (n[0] = (t) => u.$emit("settle"))
      }, [
        g(y, { kind: "check" }),
        e("span", null, l(a.claimableCount) + " 笔已到期", 1),
        n[2] || (n[2] = e("strong", null, "全部领取", -1)),
        g(y, { kind: "next" })
      ], 8, vn)) : k("", !0),
      !a.deposits.length && !a.investments.length ? (s(), i("div", bn, [
        g(y, { kind: "positions" }),
        n[3] || (n[3] = e("h3", null, "暂无持有", -1)),
        e("button", {
          type: "button",
          class: "bank-secondary-button",
          onClick: n[1] || (n[1] = (t) => u.$emit("browse"))
        }, "查看存单")
      ])) : k("", !0),
      a.deposits.length ? (s(), i("div", cn, [e("header", kn, [e("h3", null, [n[4] || (n[4] = F("定期存单 ", -1)), e("small", null, l(a.deposits.length), 1)])]), (s(!0), i(S, null, P(a.deposits, (t) => (s(), i("article", {
        key: t.id,
        class: "bank-position-card"
      }, [
        e("header", null, [
          e("span", mn, [g(y, { kind: "deposit" })]),
          e("h4", null, l(t.name), 1),
          e("span", { class: R(["bank-position-status", { "is-due": t.claimable }]) }, l(t.statusLabel), 3)
        ]),
        e("dl", fn, [e("div", null, [n[5] || (n[5] = e("dt", null, "存入本金", -1)), e("dd", null, "¤ " + l(t.principal.toLocaleString("zh-CN")), 1)]), e("div", null, [n[6] || (n[6] = e("dt", null, "到期到账", -1)), e("dd", null, "¤ " + l(t.maturityAmount.toLocaleString("zh-CN")), 1)])]),
        t.claimable ? k("", !0) : (s(), i("footer", pn, [e("span", null, "现在支取到账 ¤ " + l(t.earlyWithdrawalAmount.toLocaleString("zh-CN")), 1), e("button", {
          type: "button",
          class: "bank-text-button is-loss",
          disabled: !!a.writeDisabledReason,
          onClick: (v) => u.$emit("withdraw", t)
        }, "提前支取", 8, gn)]))
      ]))), 128))])) : k("", !0),
      a.investments.length ? (s(), i("div", yn, [e("header", hn, [e("h3", null, [n[7] || (n[7] = F("浮动理财 ", -1)), e("small", null, l(a.investments.length), 1)])]), (s(!0), i(S, null, P(a.investments, (t) => (s(), i("article", {
        key: t.id,
        class: "bank-position-card"
      }, [
        e("header", null, [
          e("span", $n, [g(y, { kind: "fund" })]),
          e("h4", null, l(t.name), 1),
          e("span", { class: R(["bank-position-status", { "is-due": t.claimable }]) }, l(t.statusLabel), 3)
        ]),
        e("div", wn, [e("span", null, l(t.riskLabel) + " · 申购本金", 1), e("strong", null, "¤ " + l(t.principal.toLocaleString("zh-CN")), 1)]),
        t.claimable ? (s(), i("div", {
          key: 0,
          class: R(["bank-fund-result", { "is-negative": t.resolvedReturnBps < 0 }])
        }, [
          n[8] || (n[8] = e("span", null, "到期结果已揭晓", -1)),
          e("strong", null, l(t.returnLabel), 1),
          e("small", null, "可领取 ¤ " + l(t.settlementAmount.toLocaleString("zh-CN")), 1)
        ], 2)) : (s(), i("div", _n, [g(y, { kind: "lock" }), n[9] || (n[9] = e("p", null, "收益到期揭晓，锁定期间不可退出。", -1))]))
      ]))), 128))])) : k("", !0)
    ]));
  }
}), Bn = Cn, An = {
  class: "bank-page",
  "aria-labelledby": "bank-records-title"
}, Sn = { class: "bank-page-heading" }, Mn = { id: "bank-records-title" }, Ln = {
  key: 0,
  class: "bank-empty-state"
}, Nn = {
  key: 1,
  class: "bank-record-list"
}, In = { class: "bank-product-mark" }, Dn = { class: "bank-record-main" }, Rn = { class: "bank-record-detail" }, Pn = {
  key: 2,
  class: "bank-inline-error",
  role: "alert"
}, xn = ["disabled"], zn = /* @__PURE__ */ M({
  __name: "BankRecords",
  props: {
    activities: {},
    total: {},
    hasMore: { type: Boolean },
    loadingMore: { type: Boolean },
    error: {}
  },
  emits: ["loadMore"],
  setup(a) {
    const u = new Intl.DateTimeFormat("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: !1
    });
    return (n, t) => (s(), i("section", An, [
      e("header", Sn, [e("h2", Mn, [t[1] || (t[1] = F("兑付记录 ", -1)), e("small", null, l(a.total) + " 笔", 1)])]),
      a.activities.length ? (s(), i("div", Nn, [(s(!0), i(S, null, P(a.activities, (v) => (s(), i("details", {
        key: v.id,
        class: "bank-record-row"
      }, [e("summary", null, [
        e("span", In, [g(y, { kind: v.kind }, null, 8, ["kind"])]),
        e("span", Dn, [e("strong", null, l(v.productName), 1), e("small", null, l(v.resultLabel), 1)]),
        e("span", { class: R(["bank-record-net", {
          "is-negative": v.net < 0,
          "is-flat": v.net === 0
        }]) }, [e("strong", null, l(v.net > 0 ? "+" : "") + l(v.net.toLocaleString("zh-CN")), 1), e("small", null, l(v.net < 0 ? "净损失" : v.net > 0 ? "净收益" : "持平"), 1)], 2),
        g(y, { kind: "next" })
      ]), e("dl", Rn, [
        e("div", null, [t[3] || (t[3] = e("dt", null, "投入本金", -1)), e("dd", null, "¤ " + l(v.amountIn.toLocaleString("zh-CN")), 1)]),
        e("div", null, [t[4] || (t[4] = e("dt", null, "实际到账", -1)), e("dd", null, "¤ " + l(v.payout.toLocaleString("zh-CN")), 1)]),
        e("div", null, [t[5] || (t[5] = e("dt", null, "结算回合", -1)), e("dd", null, l(v.turnLabel), 1)]),
        e("div", null, [t[6] || (t[6] = e("dt", null, "发生时间", -1)), e("dd", null, l(re(u).format(v.createdAt)), 1)])
      ])]))), 128))])) : (s(), i("div", Ln, [g(y, { kind: "records" }), t[2] || (t[2] = e("h3", null, "暂无兑付记录", -1))])),
      a.error ? (s(), i("p", Pn, l(a.error), 1)) : k("", !0),
      a.hasMore ? (s(), i("button", {
        key: 3,
        type: "button",
        class: "bank-secondary-button bank-full-button bank-load-more",
        disabled: a.loadingMore,
        onClick: t[0] || (t[0] = (v) => n.$emit("loadMore"))
      }, l(a.loadingMore ? "正在读取…" : "查看更早的记录"), 9, xn)) : k("", !0)
    ]));
  }
}), En = zn, Tn = {
  class: "bank-vault bank-page",
  "aria-labelledby": "bank-vault-title"
}, Vn = { class: "bank-assets" }, qn = ["disabled"], Un = { class: "bank-vault-portals" }, Fn = { class: "bank-portal-mark" }, Kn = { class: "bank-portal-mark" }, Hn = { class: "bank-timing" }, On = /* @__PURE__ */ M({
  __name: "BankVault",
  props: {
    lockedAmount: {},
    currentTurn: {},
    depositCount: {},
    fundCount: {},
    claimableCount: {},
    writeDisabledReason: {}
  },
  emits: ["navigate", "settle"],
  setup(a) {
    return (u, n) => (s(), i("section", Tn, [
      e("header", Vn, [
        n[5] || (n[5] = e("h2", { id: "bank-vault-title" }, "持有本金", -1)),
        e("strong", null, [n[4] || (n[4] = e("small", null, "¤", -1)), F(" " + l(a.lockedAmount.toLocaleString("zh-CN")), 1)]),
        n[6] || (n[6] = e("p", null, "不含未结算收益", -1))
      ]),
      e("button", {
        type: "button",
        class: "bank-holding-link",
        onClick: n[0] || (n[0] = (t) => u.$emit("navigate", "positions"))
      }, [
        e("span", null, "存单 " + l(a.depositCount) + " 笔 · 理财 " + l(a.fundCount) + " 笔", 1),
        n[7] || (n[7] = e("strong", null, "查看持有", -1)),
        g(y, { kind: "next" })
      ]),
      a.claimableCount ? (s(), i("button", {
        key: 0,
        type: "button",
        class: "bank-claim-button",
        disabled: !!a.writeDisabledReason,
        onClick: n[1] || (n[1] = (t) => u.$emit("settle"))
      }, [
        g(y, { kind: "check" }),
        e("span", null, l(a.claimableCount) + " 笔已到期", 1),
        n[8] || (n[8] = e("strong", null, "全部领取", -1)),
        g(y, { kind: "next" })
      ], 8, qn)) : k("", !0),
      e("div", Un, [e("button", {
        type: "button",
        class: "bank-portal",
        onClick: n[2] || (n[2] = (t) => u.$emit("navigate", "deposits"))
      }, [
        e("span", Fn, [g(y, { kind: "deposit" })]),
        n[9] || (n[9] = e("span", null, [e("strong", null, "定期存单"), e("small", null, "固定收益")], -1)),
        g(y, { kind: "next" })
      ]), e("button", {
        type: "button",
        class: "bank-portal is-fund",
        onClick: n[3] || (n[3] = (t) => u.$emit("navigate", "funds"))
      }, [
        e("span", Kn, [g(y, { kind: "fund" })]),
        n[10] || (n[10] = e("span", null, [e("strong", null, "浮动理财"), e("small", null, "收益浮动，可能损失本金")], -1)),
        g(y, { kind: "next" })
      ])]),
      e("details", Hn, [n[11] || (n[11] = e("summary", null, "计期与兑付", -1)), e("p", null, "当前第 " + l(a.currentTurn) + " 回合。每完成一条剧情回复推进一回合。到期资产可手动领取，也会随下一次银行交易一并结算至钱包。", 1)])
    ]));
  }
}), Wn = On, Zn = { class: "bank-app" }, jn = { class: "bank-header" }, Gn = {
  class: "bank-header-balance",
  "aria-label": "钱包可用余额"
}, Xn = ["disabled"], Qn = {
  key: 0,
  class: "bank-notice-area"
}, Yn = ["disabled"], Jn = ["disabled"], ea = {
  key: 0,
  class: "bank-empty-state",
  role: "status"
}, na = {
  class: "bank-navigation",
  "aria-label": "银行主导航"
}, aa = [
  "aria-label",
  "aria-current",
  "onClick"
], ta = { key: 0 }, U = 35e3, la = /* @__PURE__ */ M({
  __name: "BankApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(a) {
    const u = a, n = _(structuredClone(ie(u.initialState))), t = _("vault"), v = _(null), f = _(null), w = _(!1), p = _(!1), B = _(!1), $ = _(""), A = _(""), L = _("");
    let N = null, T = () => {
    }, m = 0;
    const K = C(() => n.value.status === "unconfirmed"), b = C(() => p.value ? "正在处理上一项银行操作" : w.value ? "正在刷新金库状态" : n.value.status !== "ready" ? n.value.message || "金库暂时不可写入" : n.value.generationActive ? "主剧情正在生成，请等待回复完成" : ""), r = C(() => w.value || p.value || K.value), h = C(() => $.value || n.value.message || (n.value.status !== "loading" && !f.value ? b.value : ""));
    function I() {
      return typeof globalThis.crypto?.randomUUID == "function" ? `bank-ui:${globalThis.crypto.randomUUID()}` : `bank-ui:${Date.now()}:${Math.random().toString(36).slice(2, 10)}`;
    }
    function V() {
      return { chatIdentity: n.value.chatIdentity };
    }
    function q(d) {
      n.value = structuredClone(d), w.value = !1, B.value = !1, $.value = "", L.value = "", d.claimableCount === 0 && (N = null);
    }
    function z(d) {
      const o = d instanceof Error ? d.message : String(d);
      return o.includes("economy_insufficient_funds") || o.includes("cannot be overdrawn") ? "可用小白币不足，开户未完成。" : o.includes("bank_amount_out_of_range") ? "开户金额不在该产品允许范围内。" : o.includes("bank_amount_invalid") ? "开户金额必须是正整数。" : o.includes("bank_revision_conflict") || o.includes("bank_event_id_conflict") ? "金库状态已变化，请关闭确认框并刷新后重试。" : o.includes("bank_position_missing") || o.includes("bank_position_state_changed") ? "该笔资产状态已经变化，请刷新金库。" : o.includes("bank_no_due_positions") ? "当前没有可领取的到期资产。" : o === "host_request_timeout" ? "等待保存结果超时，请保留当前页面并重试。" : "银行操作未完成，请稍后重试。";
    }
    async function W() {
      if (r.value) return;
      const d = ++m;
      w.value = !0, $.value = "";
      try {
        const o = await u.bridge.request("bank/refresh", V(), U);
        d === m && q(o.result);
      } catch (o) {
        d === m && ($.value = z(o));
      } finally {
        d === m && (w.value = !1);
      }
    }
    async function ee() {
      if (w.value || p.value) return;
      const d = ++m;
      w.value = !0, $.value = "";
      try {
        const o = await u.bridge.request("bank/confirm-save", V(), U);
        d === m && q(o.result.state);
      } catch (o) {
        d === m && ($.value = z(o));
      } finally {
        d === m && (w.value = !1);
      }
    }
    function H(d) {
      t.value = d, v.value?.scrollTo(0, 0);
    }
    function Z(d, o) {
      b.value || (A.value = "", f.value = {
        mode: o,
        product: d,
        actionId: I()
      });
    }
    function ne(d) {
      b.value || (A.value = "", f.value = {
        mode: "withdraw",
        position: d,
        actionId: I()
      });
    }
    function ae() {
      p.value || (f.value = null, A.value = "");
    }
    async function te(d) {
      const o = f.value;
      if (!o || b.value) return;
      const c = m;
      p.value = !0, A.value = "";
      const O = o.mode === "deposit-open" ? "bank/deposit/open" : o.mode === "fund-open" ? "bank/fund/open" : "bank/deposit/withdraw";
      try {
        const D = await u.bridge.request(O, {
          ...V(),
          expectedRevision: n.value.revision,
          expectedEventId: n.value.eventId,
          actionId: o.actionId,
          ...o.product ? {
            productId: o.product.id,
            amount: d
          } : {},
          ...o.position ? { positionId: o.position.id } : {}
        }, U);
        if (c !== m || f.value !== o) return;
        q(D.result), f.value = null, H("positions");
      } catch (D) {
        c === m && f.value === o && (A.value = z(D));
      } finally {
        c === m && (p.value = !1);
      }
    }
    async function j() {
      if (b.value || n.value.claimableCount === 0) return;
      const d = m;
      N ||= I();
      const o = N;
      p.value = !0, $.value = "";
      try {
        const c = await u.bridge.request("bank/settle-due", {
          ...V(),
          expectedRevision: n.value.revision,
          expectedEventId: n.value.eventId,
          actionId: o
        }, U);
        if (d !== m) return;
        N = null, q(c.result);
      } catch (c) {
        d === m && ($.value = z(c));
      } finally {
        d === m && (p.value = !1);
      }
    }
    async function le() {
      if (!n.value.activityPage.hasMore || B.value || p.value) return;
      const d = m, o = n.value.activities.length;
      B.value = !0, L.value = "";
      try {
        const c = await u.bridge.request("bank/records/load-more", {
          ...V(),
          offset: o
        }, U);
        if (d !== m) return;
        const O = new Set(n.value.activities.map((D) => D.id));
        n.value.activities.push(...c.result.activities.filter((D) => !O.has(D.id))), n.value.activityPage = c.result.activityPage;
      } catch (c) {
        d === m && (L.value = z(c));
      } finally {
        d === m && (B.value = !1);
      }
    }
    return Y(() => {
      T = u.bridge.subscribe((d) => {
        d.type === "bank/state" && (p.value || (m += 1), q(d.payload.state)), d.type === "bank/error" && ($.value = z(d.payload?.message || ""));
      });
    }), ue(() => {
      m += 1, T(), f.value = null, N = null;
    }), (d, o) => (s(), i("main", Zn, [
      e("header", jn, [
        o[3] || (o[3] = e("h1", null, "银行", -1)),
        e("div", Gn, [e("strong", null, "¤ " + l(n.value.status === "loading" ? "—" : n.value.balance.toLocaleString("zh-CN")), 1)]),
        e("button", {
          type: "button",
          class: "bank-icon-button",
          disabled: r.value,
          "aria-label": "刷新银行",
          onClick: W
        }, [g(y, {
          kind: "refresh",
          class: R({ "is-spinning": w.value })
        }, null, 8, ["class"])], 8, Xn)
      ]),
      h.value ? (s(), i("div", Qn, [e("aside", {
        class: R(["bank-notice", { "is-error": !!$.value || n.value.status === "blocked" || n.value.status === "conflict" }]),
        role: "status"
      }, [e("p", null, l(h.value), 1), K.value ? (s(), i("button", {
        key: 0,
        type: "button",
        disabled: w.value || p.value,
        onClick: ee
      }, l(w.value ? "正在核实…" : "核实保存结果"), 9, Yn)) : n.value.status === "blocked" || n.value.status === "conflict" ? (s(), i("button", {
        key: 1,
        type: "button",
        disabled: r.value,
        onClick: W
      }, l(w.value ? "正在读取…" : "重新读取银行"), 9, Jn)) : k("", !0)], 2)])) : k("", !0),
      e("div", {
        ref_key: "content",
        ref: v,
        class: "bank-scroll"
      }, [n.value.status === "loading" ? (s(), i("div", ea, [g(y, {
        kind: "refresh",
        class: "is-spinning"
      }), o[4] || (o[4] = e("h3", null, "正在读取资产…", -1))])) : t.value === "vault" ? (s(), E(Wn, {
        key: 1,
        "locked-amount": n.value.lockedAmount,
        "current-turn": n.value.currentTurn,
        "deposit-count": n.value.deposits.length,
        "fund-count": n.value.investments.length,
        "claimable-count": n.value.claimableCount,
        "write-disabled-reason": b.value,
        onNavigate: H,
        onSettle: j
      }, null, 8, [
        "locked-amount",
        "current-turn",
        "deposit-count",
        "fund-count",
        "claimable-count",
        "write-disabled-reason"
      ])) : t.value === "deposits" ? (s(), E(Ze, {
        key: 2,
        products: n.value.products.deposits,
        balance: n.value.balance,
        "write-disabled-reason": b.value,
        onOpen: o[0] || (o[0] = (c) => Z(c, "deposit-open"))
      }, null, 8, [
        "products",
        "balance",
        "write-disabled-reason"
      ])) : t.value === "funds" ? (s(), E(ln, {
        key: 3,
        products: n.value.products.funds,
        balance: n.value.balance,
        "write-disabled-reason": b.value,
        onOpen: o[1] || (o[1] = (c) => Z(c, "fund-open"))
      }, null, 8, [
        "products",
        "balance",
        "write-disabled-reason"
      ])) : t.value === "positions" ? (s(), E(Bn, {
        key: 4,
        deposits: n.value.deposits,
        investments: n.value.investments,
        "claimable-count": n.value.claimableCount,
        "write-disabled-reason": b.value,
        onWithdraw: ne,
        onSettle: j,
        onBrowse: o[2] || (o[2] = (c) => H("deposits"))
      }, null, 8, [
        "deposits",
        "investments",
        "claimable-count",
        "write-disabled-reason"
      ])) : (s(), E(En, {
        key: 5,
        activities: n.value.activities,
        total: n.value.activityPage.total,
        "has-more": n.value.activityPage.hasMore,
        "loading-more": B.value,
        error: L.value,
        onLoadMore: le
      }, null, 8, [
        "activities",
        "total",
        "has-more",
        "loading-more",
        "error"
      ]))], 512),
      e("nav", na, [(s(), i(S, null, P([
        {
          page: "vault",
          label: "总览",
          icon: "vault"
        },
        {
          page: "deposits",
          label: "存单",
          icon: "deposit"
        },
        {
          page: "funds",
          label: "理财",
          icon: "fund"
        },
        {
          page: "positions",
          label: "持有",
          icon: "positions"
        },
        {
          page: "records",
          label: "记录",
          icon: "records"
        }
      ], (c) => e("button", {
        key: c.page,
        type: "button",
        "aria-label": c.label,
        "aria-current": t.value === c.page ? "page" : void 0,
        onClick: (O) => H(c.page)
      }, [e("span", null, [g(y, { kind: c.icon }, null, 8, ["kind"]), c.page === "positions" && n.value.claimableCount ? (s(), i("i", ta)) : k("", !0)]), F(l(c.label), 1)], 8, aa)), 64))]),
      f.value ? (s(), E(Ee, {
        key: 1,
        mode: f.value.mode,
        product: f.value.product,
        position: f.value.position,
        balance: n.value.balance,
        busy: p.value,
        error: A.value,
        "claimable-count": n.value.claimableCount,
        "disabled-reason": b.value,
        onCancel: ae,
        onConfirm: te
      }, null, 8, [
        "mode",
        "product",
        "position",
        "balance",
        "busy",
        "error",
        "claimable-count",
        "disabled-reason"
      ])) : k("", !0)
    ]));
  }
}), ia = la;
export {
  ia as default
};
