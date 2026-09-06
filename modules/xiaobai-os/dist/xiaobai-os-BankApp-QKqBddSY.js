/* eslint-disable */
import { B as x, C as Q, E as z, H as l, I as B, N as le, R as se, T as s, _ as k, a as ie, c as j, d as e, f as T, g, l as L, m as i, p as v, u as A, v as _, x as oe, z as ue } from "./xiaobai-os-runtime-dom.esm-bundler-DwdCK5Jt.js";
var re = class extends Error {
  code;
  constructor(a, u = "") {
    super(u ? `${a}:${u}` : a), this.name = "BankError", this.code = a;
  }
};
function P(a, u = "") {
  throw new re(a, u);
}
var G = 1e4;
function Y(a, u = "amount") {
  return (typeof a != "number" || !Number.isSafeInteger(a) || a <= 0) && P("bank_amount_invalid", u), a;
}
function de(a, u = "payout") {
  return (typeof a != "number" || !Number.isSafeInteger(a) || a < 0) && P("bank_amount_invalid", u), a > 5e4 && P("bank_amount_overflow", u), a;
}
function X(a, u) {
  return (typeof a != "number" || !Number.isSafeInteger(a) || a <= 0) && P("bank_amount_invalid", u), a;
}
function be(a, u, n) {
  const t = Y(a), b = X(u, "numerator"), h = X(n, "denominator");
  return t > Math.floor(Number.MAX_SAFE_INTEGER / b) && P("bank_amount_overflow"), de(Math.floor(t * b / h));
}
function ve(a, u) {
  const n = Y(a, "principal");
  (typeof u != "number" || !Number.isSafeInteger(u)) && P("bank_amount_invalid", "bps");
  const t = G + u;
  return (!Number.isSafeInteger(t) || t < 0) && P("bank_amount_invalid", "bps"), t === 0 ? 0 : be(n, t, G);
}
var ke = {
  class: "bank-product-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.7",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true",
  focusable: "false"
}, me = ["d"], ce = {
  key: 0,
  cx: "12",
  cy: "12",
  r: "6"
}, pe = /* @__PURE__ */ _({
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
    return (n, t) => (s(), i("svg", ke, [e("path", { d: u[a.kind] }, null, 8, me), a.kind === "vault" ? (s(), i("circle", ce)) : v("", !0)]));
  }
}), m = pe, fe = ["aria-label"], ge = { class: "bank-dialog-mark" }, ye = { class: "bank-dialog-subject" }, he = { key: 0 }, $e = { class: "bank-dialog-field" }, we = { class: "bank-amount-input" }, Ce = ["disabled"], Be = {
  id: "bank-amount-help",
  class: "bank-amount-help"
}, Ae = { class: "bank-quick-amounts" }, Se = [
  "disabled",
  "aria-pressed",
  "onClick"
], Me = {
  key: 1,
  class: "bank-inline-error",
  role: "status"
}, Le = {
  key: 2,
  class: "bank-dialog-summary"
}, Ne = { key: 0 }, _e = { class: "bank-dialog-summary" }, De = { class: "bank-withdraw-amount" }, Re = { class: "bank-dialog-summary" }, Ie = { class: "is-loss" }, xe = {
  key: 5,
  class: "bank-amount-help"
}, ze = {
  key: 6,
  class: "bank-inline-error",
  role: "status"
}, Pe = {
  key: 7,
  class: "bank-inline-error",
  role: "alert"
}, Ee = { class: "bank-dialog-actions" }, Te = ["disabled"], Ve = ["disabled"], qe = /* @__PURE__ */ _({
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
    const n = a, t = u, b = B(null);
    Q(() => b.value?.showModal());
    const h = B(n.product ? String(n.product.minAmount) : ""), C = A(() => n.mode === "deposit-open" ? "存入一份定期" : n.mode === "fund-open" ? "申购一份理财" : "提前取回这笔存款？"), y = A(() => /^\d+$/.test(h.value.trim()) ? Number(h.value) : 0), S = A(() => n.mode === "withdraw" ? "" : !n.product || !Number.isSafeInteger(y.value) || y.value <= 0 ? "请输入正整数金额" : y.value < n.product.minAmount || y.value > n.product.maxAmount ? `金额须在 ${n.product.minAmount.toLocaleString("zh-CN")} 至 ${n.product.maxAmount.toLocaleString("zh-CN")} 之间` : y.value > n.balance ? "可用余额不足" : ""), $ = A(() => n.mode === "deposit-open" ? n.product : null), M = A(() => n.mode === "fund-open" ? n.product : null), D = A(() => $.value && !S.value ? ve(y.value, $.value.interestBps) : null), R = A(() => {
      const c = n.product;
      return c ? [.../* @__PURE__ */ new Set([
        c.minAmount,
        c.minAmount * 2,
        Math.min(c.maxAmount, n.balance)
      ])].filter((r) => r >= c.minAmount && r <= c.maxAmount && r <= n.balance).sort((r, w) => r - w) : [];
    }), V = A(() => !n.busy && !n.disabledReason && !S.value);
    function f() {
      V.value && (n.mode === "withdraw" ? t("confirm") : t("confirm", y.value));
    }
    function F(c) {
      if (c.stopPropagation(), c.key !== "Tab") return;
      const r = Array.from(b.value?.querySelectorAll("button:not(:disabled), input:not(:disabled)") ?? []), w = r[0], N = r.at(-1);
      if (!w) {
        c.preventDefault();
        return;
      }
      c.shiftKey && document.activeElement === w ? (c.preventDefault(), N?.focus()) : !c.shiftKey && document.activeElement === N && (c.preventDefault(), w.focus());
    }
    return (c, r) => (s(), i("dialog", {
      ref_key: "dialog",
      ref: b,
      class: "bank-dialog",
      "aria-label": C.value,
      onCancel: r[2] || (r[2] = j((w) => !a.busy && t("cancel"), ["prevent"])),
      onKeydown: F
    }, [e("form", { onSubmit: j(f, ["prevent"]) }, [
      e("span", ge, [k(m, { kind: a.mode === "withdraw" ? "withdraw" : a.mode === "deposit-open" ? "deposit" : "fund" }, null, 8, ["kind"])]),
      e("h2", null, l(C.value), 1),
      e("div", ye, [e("strong", null, l(a.position?.name || a.product?.name), 1), a.product ? (s(), i("span", he, l(a.product.lockRounds) + " 回合", 1)) : v("", !0)]),
      a.mode !== "withdraw" ? (s(), i(L, { key: 0 }, [
        e("label", $e, [e("span", null, l(a.mode === "deposit-open" ? "存入金额" : "申购金额"), 1), e("span", we, [r[3] || (r[3] = e("i", null, "¤", -1)), le(e("input", {
          "onUpdate:modelValue": r[0] || (r[0] = (w) => h.value = w),
          disabled: a.busy,
          type: "text",
          inputmode: "numeric",
          autocomplete: "off",
          "aria-describedby": "bank-amount-help"
        }, null, 8, Ce), [[ie, h.value]])])]),
        e("small", Be, "钱包可用 ¤ " + l(a.balance.toLocaleString("zh-CN")) + " · " + l(a.product?.amountLabel), 1),
        e("div", Ae, [(s(!0), i(L, null, z(R.value, (w) => (s(), i("button", {
          key: w,
          type: "button",
          disabled: a.busy,
          "aria-pressed": y.value === w,
          onClick: (N) => h.value = String(w)
        }, "¤ " + l(w.toLocaleString("zh-CN")), 9, Se))), 128))])
      ], 64)) : v("", !0),
      S.value ? (s(), i("p", Me, l(S.value), 1)) : v("", !0),
      $.value ? (s(), i("dl", Le, [
        e("div", null, [r[4] || (r[4] = e("dt", null, "整期收益率", -1)), e("dd", null, l($.value.interestLabel), 1)]),
        D.value !== null ? (s(), i("div", Ne, [r[5] || (r[5] = e("dt", null, "到期到账（含本金）", -1)), e("dd", null, "¤ " + l(D.value.toLocaleString("zh-CN")), 1)])) : v("", !0),
        e("div", null, [r[6] || (r[6] = e("dt", null, "提前支取", -1)), e("dd", null, "本金 " + l($.value.earlyPenaltyLabel) + "，无利息", 1)])
      ])) : v("", !0),
      M.value ? (s(), i(L, { key: 3 }, [e("dl", _e, [e("div", null, [r[7] || (r[7] = e("dt", null, "整期收益区间", -1)), e("dd", null, l(M.value.returnLabel), 1)]), e("div", null, [r[8] || (r[8] = e("dt", null, "风险等级", -1)), e("dd", null, l(M.value.riskLabel), 1)])]), r[9] || (r[9] = e("p", { class: "bank-dialog-warning" }, "可能损失本金。申购后不能提前退出，实际收益封存至到期才揭晓。", -1))], 64)) : v("", !0),
      a.mode === "withdraw" && a.position ? (s(), i(L, { key: 4 }, [
        e("div", De, [r[10] || (r[10] = e("span", null, "现在实际到账", -1)), e("strong", null, "¤ " + l(a.position.earlyWithdrawalAmount.toLocaleString("zh-CN")), 1)]),
        e("dl", Re, [e("div", null, [r[11] || (r[11] = e("dt", null, "原存入本金", -1)), e("dd", null, "¤ " + l(a.position.principal.toLocaleString("zh-CN")), 1)]), e("div", null, [r[12] || (r[12] = e("dt", null, "提前支取损失", -1)), e("dd", Ie, "¤ " + l((a.position.principal - a.position.earlyWithdrawalAmount).toLocaleString("zh-CN")), 1)])]),
        r[13] || (r[13] = e("p", { class: "bank-dialog-warning" }, "不再获得到期利息，确认后不可撤销。", -1))
      ], 64)) : v("", !0),
      a.claimableCount ? (s(), i("p", xe, "另有 " + l(a.claimableCount) + " 笔到期资产，将随本次操作一并兑付至钱包。", 1)) : v("", !0),
      a.disabledReason && !a.busy ? (s(), i("p", ze, l(a.disabledReason), 1)) : v("", !0),
      a.error ? (s(), i("p", Pe, l(a.error), 1)) : v("", !0),
      e("footer", Ee, [e("button", {
        type: "button",
        class: "bank-secondary-button",
        disabled: a.busy,
        autofocus: "",
        onClick: r[1] || (r[1] = (w) => t("cancel"))
      }, "返回", 8, Te), e("button", {
        type: "submit",
        class: "bank-primary-button",
        disabled: !V.value
      }, l(a.busy ? "正在保存…" : a.mode === "withdraw" ? "确认支取" : a.mode === "fund-open" ? "确认申购" : "确认存入"), 9, Ve)])
    ], 32)], 40, fe));
  }
}), Ue = qe, Fe = {
  class: "bank-page",
  "aria-labelledby": "bank-deposits-title"
}, Ke = {
  key: 0,
  class: "bank-hint",
  role: "status"
}, He = { class: "bank-product-grid" }, Oe = { class: "bank-product-mark" }, We = { class: "bank-term-pill" }, Ze = { class: "bank-deposit-rate" }, je = { class: "bank-product-terms" }, Ge = ["disabled", "onClick"], Xe = {
  key: 0,
  class: "bank-product-hint"
}, Qe = /* @__PURE__ */ _({
  __name: "BankDeposits",
  props: {
    products: {},
    balance: {},
    writeDisabledReason: {}
  },
  emits: ["open"],
  setup(a) {
    return (u, n) => (s(), i("section", Fe, [
      n[5] || (n[5] = e("header", { class: "bank-page-heading" }, [
        e("span", { class: "bank-eyebrow" }, "一份约定，一份确定"),
        e("h2", { id: "bank-deposits-title" }, "定期存单"),
        e("p", null, "按故事回合计期，到期后领取本金与收益。")
      ], -1)),
      a.writeDisabledReason ? (s(), i("p", Ke, l(a.writeDisabledReason), 1)) : v("", !0),
      e("div", He, [(s(!0), i(L, null, z(a.products, (t) => (s(), i("article", {
        key: t.id,
        class: "bank-product-card bank-deposit-card"
      }, [
        e("header", null, [
          e("span", Oe, [k(m, { kind: "deposit" })]),
          e("h3", null, l(t.name), 1),
          e("span", We, l(t.lockRounds) + " 回合", 1)
        ]),
        e("div", Ze, [e("div", null, [n[0] || (n[0] = e("span", null, "整期收益率 · 非年化", -1)), e("strong", null, l(t.interestLabel), 1)]), n[1] || (n[1] = e("span", {
          class: "bank-contract-stamp",
          "aria-hidden": "true"
        }, [
          g("固定"),
          e("br"),
          g("收益")
        ], -1))]),
        e("dl", je, [e("div", null, [n[2] || (n[2] = e("dt", null, "存入范围", -1)), e("dd", null, l(t.amountLabel), 1)]), e("div", null, [n[3] || (n[3] = e("dt", null, "提前支取", -1)), e("dd", null, "本金 " + l(t.earlyPenaltyLabel) + "，无利息", 1)])]),
        e("button", {
          type: "button",
          class: "bank-primary-button bank-full-button",
          disabled: !!a.writeDisabledReason || a.balance < t.minAmount,
          onClick: (b) => u.$emit("open", t)
        }, [n[4] || (n[4] = g("存入这份存单", -1)), k(m, { kind: "next" })], 8, Ge),
        a.balance < t.minAmount ? (s(), i("p", Xe, "钱包余额不足最低存入金额")) : v("", !0)
      ]))), 128))]),
      n[6] || (n[6] = e("p", { class: "bank-footnote" }, [
        g("每完成一条 Assistant 回复，推进一个回合。"),
        e("br"),
        g("提前支取有损失，确认前会列明实际到账金额。")
      ], -1))
    ]));
  }
}), Ye = Qe, Je = {
  class: "bank-page",
  "aria-labelledby": "bank-funds-title"
}, en = {
  key: 0,
  class: "bank-hint",
  role: "status"
}, nn = { class: "bank-product-grid" }, an = ["data-risk"], tn = { class: "bank-product-mark" }, ln = { class: "bank-fund-description" }, sn = { class: "bank-return-range" }, on = { class: "bank-product-terms" }, un = ["disabled", "onClick"], rn = {
  key: 0,
  class: "bank-product-hint"
}, dn = /* @__PURE__ */ _({
  __name: "BankFunds",
  props: {
    products: {},
    balance: {},
    writeDisabledReason: {}
  },
  emits: ["open"],
  setup(a) {
    return (u, n) => (s(), i("section", Je, [
      n[4] || (n[4] = e("header", { class: "bank-page-heading" }, [
        e("span", { class: "bank-eyebrow" }, "留一点空间，给未知的回报"),
        e("h2", { id: "bank-funds-title" }, "浮动理财"),
        e("p", null, "有机会获得收益，也可能损失本金。")
      ], -1)),
      a.writeDisabledReason ? (s(), i("p", en, l(a.writeDisabledReason), 1)) : v("", !0),
      e("div", nn, [(s(!0), i(L, null, z(a.products, (t) => (s(), i("article", {
        key: t.id,
        class: "bank-product-card bank-fund-card",
        "data-risk": t.riskLevel
      }, [
        e("header", null, [
          e("span", tn, [k(m, { kind: "fund" })]),
          e("h3", null, l(t.name), 1),
          e("span", { class: x(["bank-risk-badge", `is-${t.riskLevel}`]) }, l(t.riskLabel), 3)
        ]),
        e("p", ln, l(t.description), 1),
        e("div", sn, [
          n[0] || (n[0] = e("span", null, "整期收益区间 · 非年化", -1)),
          e("strong", null, l(t.returnLabel), 1),
          e("small", null, "锁定 " + l(t.lockRounds) + " 回合", 1)
        ]),
        e("dl", on, [e("div", null, [n[1] || (n[1] = e("dt", null, "申购范围", -1)), e("dd", null, l(t.amountLabel), 1)]), n[2] || (n[2] = e("div", null, [e("dt", null, "退出规则"), e("dd", null, "到期前不可退出")], -1))]),
        e("button", {
          type: "button",
          class: "bank-secondary-button bank-full-button",
          disabled: !!a.writeDisabledReason || a.balance < t.minAmount,
          onClick: (b) => u.$emit("open", t)
        }, [n[3] || (n[3] = g("申购这份理财", -1)), k(m, { kind: "next" })], 8, un),
        a.balance < t.minAmount ? (s(), i("p", rn, "钱包余额不足最低申购金额")) : v("", !0)
      ], 8, an))), 128))]),
      n[5] || (n[5] = e("p", { class: "bank-footnote" }, [
        g("收益结果在申购时封存，到期才揭晓。"),
        e("br"),
        g("展示的是合同区间，不是预估收益。")
      ], -1))
    ]));
  }
}), bn = dn, vn = {
  class: "bank-page",
  "aria-labelledby": "bank-positions-title"
}, kn = ["disabled"], mn = { class: "bank-claim-icon" }, cn = {
  key: 1,
  class: "bank-hint",
  role: "status"
}, pn = {
  key: 2,
  class: "bank-empty-state"
}, fn = {
  key: 3,
  class: "bank-position-group"
}, gn = { class: "bank-section-heading" }, yn = { class: "bank-product-mark" }, hn = { class: "bank-position-amounts" }, $n = { key: 0 }, wn = ["disabled", "onClick"], Cn = {
  key: 1,
  class: "bank-due-note"
}, Bn = {
  key: 4,
  class: "bank-position-group"
}, An = { class: "bank-section-heading" }, Sn = { class: "bank-product-mark" }, Mn = { class: "bank-fund-principal" }, Ln = {
  key: 1,
  class: "bank-sealed-copy"
}, Nn = /* @__PURE__ */ _({
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
    return (u, n) => (s(), i("section", vn, [
      n[12] || (n[12] = e("header", { class: "bank-page-heading" }, [
        e("span", { class: "bank-eyebrow" }, "每份积蓄，都在这里"),
        e("h2", { id: "bank-positions-title" }, "我的持有"),
        e("p", null, "到期后手动领取，本金与收益一并回到钱包。")
      ], -1)),
      a.claimableCount ? (s(), i("button", {
        key: 0,
        type: "button",
        class: "bank-claim-button",
        disabled: !!a.writeDisabledReason,
        onClick: n[0] || (n[0] = (t) => u.$emit("settle"))
      }, [
        e("span", mn, [k(m, { kind: "check" })]),
        e("span", null, [e("strong", null, "领取全部 " + l(a.claimableCount) + " 笔", 1), n[2] || (n[2] = e("small", null, "只结算已到期的资产", -1))]),
        k(m, { kind: "next" })
      ], 8, kn)) : v("", !0),
      a.writeDisabledReason ? (s(), i("p", cn, l(a.writeDisabledReason), 1)) : v("", !0),
      !a.deposits.length && !a.investments.length ? (s(), i("div", pn, [
        e("span", null, [k(m, { kind: "positions" })]),
        n[3] || (n[3] = e("h3", null, "积蓄还在钱包里", -1)),
        n[4] || (n[4] = e("p", null, "选择一份存单或理财，持有后在这里查看进展。", -1)),
        e("button", {
          type: "button",
          class: "bank-secondary-button",
          onClick: n[1] || (n[1] = (t) => u.$emit("browse"))
        }, "看看定期存单")
      ])) : v("", !0),
      a.deposits.length ? (s(), i("div", fn, [e("header", gn, [e("h3", null, [n[5] || (n[5] = g("定期存单 ", -1)), e("small", null, l(a.deposits.length), 1)])]), (s(!0), i(L, null, z(a.deposits, (t) => (s(), i("article", {
        key: t.id,
        class: "bank-position-card"
      }, [
        e("header", null, [
          e("span", yn, [k(m, { kind: "deposit" })]),
          e("h4", null, l(t.name), 1),
          e("span", { class: x(["bank-position-status", { "is-due": t.claimable }]) }, l(t.statusLabel), 3)
        ]),
        e("dl", hn, [e("div", null, [n[6] || (n[6] = e("dt", null, "存入本金", -1)), e("dd", null, "¤ " + l(t.principal.toLocaleString("zh-CN")), 1)]), e("div", null, [n[7] || (n[7] = e("dt", null, "到期到账", -1)), e("dd", null, "¤ " + l(t.maturityAmount.toLocaleString("zh-CN")), 1)])]),
        t.claimable ? (s(), i("p", Cn, [k(m, { kind: "check" }), n[8] || (n[8] = g("已到期，可通过上方“领取全部”兑付", -1))])) : (s(), i("footer", $n, [e("span", null, "现在支取到账 ¤ " + l(t.earlyWithdrawalAmount.toLocaleString("zh-CN")), 1), e("button", {
          type: "button",
          class: "bank-text-button is-loss",
          disabled: !!a.writeDisabledReason,
          onClick: (b) => u.$emit("withdraw", t)
        }, "提前支取", 8, wn)]))
      ]))), 128))])) : v("", !0),
      a.investments.length ? (s(), i("div", Bn, [e("header", An, [e("h3", null, [n[9] || (n[9] = g("浮动理财 ", -1)), e("small", null, l(a.investments.length), 1)])]), (s(!0), i(L, null, z(a.investments, (t) => (s(), i("article", {
        key: t.id,
        class: "bank-position-card"
      }, [
        e("header", null, [
          e("span", Sn, [k(m, { kind: "fund" })]),
          e("h4", null, l(t.name), 1),
          e("span", { class: x(["bank-position-status", { "is-due": t.claimable }]) }, l(t.statusLabel), 3)
        ]),
        e("div", Mn, [e("span", null, l(t.riskLabel) + " · 申购本金", 1), e("strong", null, "¤ " + l(t.principal.toLocaleString("zh-CN")), 1)]),
        t.claimable ? (s(), i("div", {
          key: 0,
          class: x(["bank-fund-result", { "is-negative": t.resolvedReturnBps < 0 }])
        }, [
          n[10] || (n[10] = e("span", null, "到期结果已揭晓", -1)),
          e("strong", null, l(t.returnLabel), 1),
          e("small", null, "可领取 ¤ " + l(t.settlementAmount.toLocaleString("zh-CN")), 1)
        ], 2)) : (s(), i("div", Ln, [k(m, { kind: "lock" }), n[11] || (n[11] = e("div", null, [e("strong", null, "收益仍在封存中"), e("p", null, "到期揭晓，锁定期间不可提前退出。")], -1))]))
      ]))), 128))])) : v("", !0)
    ]));
  }
}), _n = Nn, Dn = {
  class: "bank-page",
  "aria-labelledby": "bank-records-title"
}, Rn = { class: "bank-page-heading" }, In = { id: "bank-records-title" }, xn = {
  key: 0,
  class: "bank-empty-state"
}, zn = {
  key: 1,
  class: "bank-record-list"
}, Pn = { class: "bank-product-mark" }, En = { class: "bank-record-main" }, Tn = { class: "bank-record-detail" }, Vn = {
  key: 2,
  class: "bank-inline-error",
  role: "alert"
}, qn = ["disabled"], Un = {
  key: 4,
  class: "bank-footnote"
}, Fn = /* @__PURE__ */ _({
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
    return (n, t) => (s(), i("section", Dn, [
      e("header", Rn, [
        t[2] || (t[2] = e("span", { class: "bank-eyebrow" }, "每一笔兑付，都有回执", -1)),
        e("h2", In, [t[1] || (t[1] = g("金融记录 ", -1)), e("small", null, l(a.total) + " 笔", 1)]),
        t[3] || (t[3] = e("p", null, "到期领取和提前支取的结果，留在这里。", -1))
      ]),
      a.activities.length ? (s(), i("div", zn, [(s(!0), i(L, null, z(a.activities, (b) => (s(), i("details", {
        key: b.id,
        class: "bank-record-row"
      }, [e("summary", null, [
        e("span", Pn, [k(m, { kind: b.kind }, null, 8, ["kind"])]),
        e("span", En, [e("strong", null, l(b.productName), 1), e("small", null, l(b.resultLabel), 1)]),
        e("span", { class: x(["bank-record-net", {
          "is-negative": b.net < 0,
          "is-flat": b.net === 0
        }]) }, [e("strong", null, l(b.net > 0 ? "+" : "") + l(b.net.toLocaleString("zh-CN")), 1), e("small", null, l(b.net < 0 ? "净损失" : b.net > 0 ? "净收益" : "持平"), 1)], 2),
        k(m, { kind: "next" })
      ]), e("dl", Tn, [
        e("div", null, [t[6] || (t[6] = e("dt", null, "投入本金", -1)), e("dd", null, "¤ " + l(b.amountIn.toLocaleString("zh-CN")), 1)]),
        e("div", null, [t[7] || (t[7] = e("dt", null, "实际到账", -1)), e("dd", null, "¤ " + l(b.payout.toLocaleString("zh-CN")), 1)]),
        e("div", null, [t[8] || (t[8] = e("dt", null, "结算回合", -1)), e("dd", null, l(b.turnLabel), 1)]),
        e("div", null, [t[9] || (t[9] = e("dt", null, "发生时间", -1)), e("dd", null, l(ue(u).format(b.createdAt)), 1)])
      ])]))), 128))])) : (s(), i("div", xn, [
        e("span", null, [k(m, { kind: "records" })]),
        t[4] || (t[4] = e("h3", null, "还没有兑付记录", -1)),
        t[5] || (t[5] = e("p", null, "存入的资产可以在“持有”中查看。", -1))
      ])),
      a.error ? (s(), i("p", Vn, l(a.error), 1)) : v("", !0),
      a.hasMore ? (s(), i("button", {
        key: 3,
        type: "button",
        class: "bank-secondary-button bank-full-button bank-load-more",
        disabled: a.loadingMore,
        onClick: t[0] || (t[0] = (b) => n.$emit("loadMore"))
      }, l(a.loadingMore ? "正在读取…" : "查看更早的记录"), 9, qn)) : a.activities.length ? (s(), i("p", Un, "以上是全部兑付记录")) : v("", !0)
    ]));
  }
}), Kn = Fn, Hn = {
  class: "bank-vault bank-page",
  "aria-labelledby": "bank-vault-title"
}, On = { class: "bank-safe" }, Wn = { class: "bank-safe-copy" }, Zn = ["disabled"], jn = { class: "bank-claim-icon" }, Gn = {
  key: 2,
  class: "bank-hint",
  role: "status"
}, Xn = { class: "bank-vault-portals" }, Qn = { class: "bank-portal-mark" }, Yn = { class: "bank-portal-link" }, Jn = { class: "bank-portal-mark" }, ea = { class: "bank-portal-link" }, na = /* @__PURE__ */ _({
  __name: "BankVault",
  props: {
    balance: {},
    lockedAmount: {},
    currentTurn: {},
    depositCount: {},
    fundCount: {},
    claimableCount: {},
    writeDisabledReason: {}
  },
  emits: ["navigate", "settle"],
  setup(a) {
    return (u, n) => (s(), i("section", Hn, [
      n[16] || (n[16] = e("header", { class: "bank-page-heading" }, [e("span", { class: "bank-eyebrow" }, "白银金库 · 当前聊天"), e("h2", { id: "bank-vault-title" }, "让积蓄，有处安放。")], -1)),
      e("div", On, [
        n[7] || (n[7] = e("div", {
          class: "bank-safe-art",
          "aria-hidden": "true"
        }, [e("span", { class: "bank-safe-hinge" }), e("span", { class: "bank-safe-dial" }, [
          e("i"),
          e("i"),
          e("i"),
          e("b")
        ])], -1)),
        e("div", Wn, [
          n[5] || (n[5] = e("span", null, "存入银行的本金", -1)),
          e("strong", null, [n[4] || (n[4] = e("small", null, "¤", -1)), g(" " + l(a.lockedAmount.toLocaleString("zh-CN")), 1)]),
          e("p", null, l(a.depositCount + a.fundCount) + " 笔持有 · 不含未结算收益", 1)
        ]),
        e("footer", null, [e("span", null, [n[6] || (n[6] = g("钱包可用 ", -1)), e("b", null, "¤ " + l(a.balance.toLocaleString("zh-CN")), 1)]), e("span", null, "第 " + l(a.currentTurn) + " 回合", 1)])
      ]),
      a.claimableCount ? (s(), i("button", {
        key: 0,
        type: "button",
        class: "bank-claim-button",
        disabled: !!a.writeDisabledReason,
        onClick: n[0] || (n[0] = (t) => u.$emit("settle"))
      }, [
        e("span", jn, [k(m, { kind: "check" })]),
        e("span", null, [e("strong", null, l(a.claimableCount) + " 笔资产已到期", 1), n[8] || (n[8] = e("small", null, "点击全部领取，兑付至钱包", -1))]),
        k(m, { kind: "next" })
      ], 8, Zn)) : (s(), i("button", {
        key: 1,
        type: "button",
        class: "bank-holding-link",
        onClick: n[1] || (n[1] = (t) => u.$emit("navigate", "positions"))
      }, [
        k(m, { kind: "positions" }),
        n[9] || (n[9] = e("span", null, "查看我的持有", -1)),
        e("small", null, l(a.depositCount + a.fundCount) + " 笔", 1),
        k(m, { kind: "next" })
      ])),
      a.writeDisabledReason ? (s(), i("p", Gn, l(a.writeDisabledReason), 1)) : v("", !0),
      n[17] || (n[17] = e("header", { class: "bank-section-heading" }, [e("h3", null, "为积蓄选个去处")], -1)),
      e("div", Xn, [e("button", {
        type: "button",
        class: "bank-portal",
        onClick: n[2] || (n[2] = (t) => u.$emit("navigate", "deposits"))
      }, [
        e("span", Qn, [k(m, { kind: "deposit" })]),
        n[11] || (n[11] = e("strong", null, "定期存单", -1)),
        n[12] || (n[12] = e("p", null, [
          g("约定期限"),
          e("br"),
          g("到期收益确定")
        ], -1)),
        e("span", Yn, [n[10] || (n[10] = g("去存一笔", -1)), k(m, { kind: "next" })])
      ]), e("button", {
        type: "button",
        class: "bank-portal is-fund",
        onClick: n[3] || (n[3] = (t) => u.$emit("navigate", "funds"))
      }, [
        e("span", Jn, [k(m, { kind: "fund" })]),
        n[14] || (n[14] = e("strong", null, "浮动理财", -1)),
        n[15] || (n[15] = e("p", null, [
          g("承担波动"),
          e("br"),
          g("到期揭晓盈亏")
        ], -1)),
        e("span", ea, [n[13] || (n[13] = g("了解产品", -1)), k(m, { kind: "next" })])
      ])]),
      n[18] || (n[18] = e("p", { class: "bank-footnote" }, [
        g("每完成一条 Assistant 回复，推进一个回合。"),
        e("br"),
        g("到期资产可手动领取，也会随下一次银行交易一并结算。")
      ], -1))
    ]));
  }
}), aa = na, ta = { class: "bank-app" }, la = { class: "bank-header" }, sa = { class: "bank-brand" }, ia = { class: "bank-header-balance" }, oa = ["disabled"], ua = {
  key: 0,
  class: "bank-notice-area"
}, ra = ["disabled"], da = ["disabled"], ba = {
  key: 0,
  class: "bank-empty-state",
  role: "status"
}, va = {
  class: "bank-navigation",
  "aria-label": "银行主导航"
}, ka = [
  "aria-label",
  "aria-current",
  "onClick"
], ma = { key: 0 }, U = 35e3, ca = /* @__PURE__ */ _({
  __name: "BankApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(a) {
    const u = a, n = B(structuredClone(se(u.initialState))), t = B("vault"), b = B(null), h = B(null), C = B(!1), y = B(!1), S = B(!1), $ = B(""), M = B(""), D = B("");
    let R = null, V = () => {
    }, f = 0;
    const F = A(() => n.value.status === "unconfirmed"), c = A(() => y.value ? "正在处理上一项银行操作" : C.value ? "正在刷新金库状态" : n.value.status !== "ready" ? n.value.message || "金库暂时不可写入" : n.value.generationActive ? "主剧情正在生成，请等待回复完成" : ""), r = A(() => C.value || y.value || F.value);
    function w() {
      return typeof globalThis.crypto?.randomUUID == "function" ? `bank-ui:${globalThis.crypto.randomUUID()}` : `bank-ui:${Date.now()}:${Math.random().toString(36).slice(2, 10)}`;
    }
    function N() {
      return { chatIdentity: n.value.chatIdentity };
    }
    function q(d) {
      n.value = structuredClone(d), C.value = !1, S.value = !1, $.value = "", D.value = "", d.claimableCount === 0 && (R = null);
    }
    function E(d) {
      const o = d instanceof Error ? d.message : String(d);
      return o.includes("economy_insufficient_funds") || o.includes("cannot be overdrawn") ? "可用小白币不足，开户未完成。" : o.includes("bank_amount_out_of_range") ? "开户金额不在该产品允许范围内。" : o.includes("bank_amount_invalid") ? "开户金额必须是正整数。" : o.includes("bank_revision_conflict") || o.includes("bank_event_id_conflict") ? "金库状态已变化，请关闭确认框并刷新后重试。" : o.includes("bank_position_missing") || o.includes("bank_position_state_changed") ? "该笔资产状态已经变化，请刷新金库。" : o.includes("bank_no_due_positions") ? "当前没有可领取的到期资产。" : o === "host_request_timeout" ? "等待保存结果超时，请保留当前页面并重试。" : "银行操作未完成，请稍后重试。";
    }
    async function O() {
      if (r.value) return;
      const d = ++f;
      C.value = !0, $.value = "";
      try {
        const o = await u.bridge.request("bank/refresh", N(), U);
        d === f && q(o.result);
      } catch (o) {
        d === f && ($.value = E(o));
      } finally {
        d === f && (C.value = !1);
      }
    }
    async function J() {
      if (C.value || y.value) return;
      const d = ++f;
      C.value = !0, $.value = "";
      try {
        const o = await u.bridge.request("bank/confirm-save", N(), U);
        d === f && q(o.result.state);
      } catch (o) {
        d === f && ($.value = E(o));
      } finally {
        d === f && (C.value = !1);
      }
    }
    function K(d) {
      t.value = d, b.value?.scrollTo(0, 0);
    }
    function W(d, o) {
      c.value || (M.value = "", h.value = {
        mode: o,
        product: d,
        actionId: w()
      });
    }
    function ee(d) {
      c.value || (M.value = "", h.value = {
        mode: "withdraw",
        position: d,
        actionId: w()
      });
    }
    function ne() {
      y.value || (h.value = null, M.value = "");
    }
    async function ae(d) {
      const o = h.value;
      if (!o || c.value) return;
      const p = f;
      y.value = !0, M.value = "";
      const H = o.mode === "deposit-open" ? "bank/deposit/open" : o.mode === "fund-open" ? "bank/fund/open" : "bank/deposit/withdraw";
      try {
        const I = await u.bridge.request(H, {
          ...N(),
          expectedRevision: n.value.revision,
          expectedEventId: n.value.eventId,
          actionId: o.actionId,
          ...o.product ? {
            productId: o.product.id,
            amount: d
          } : {},
          ...o.position ? { positionId: o.position.id } : {}
        }, U);
        if (p !== f || h.value !== o) return;
        q(I.result), h.value = null, K("positions");
      } catch (I) {
        p === f && h.value === o && (M.value = E(I));
      } finally {
        p === f && (y.value = !1);
      }
    }
    async function Z() {
      if (c.value || n.value.claimableCount === 0) return;
      const d = f;
      R ||= w();
      const o = R;
      y.value = !0, $.value = "";
      try {
        const p = await u.bridge.request("bank/settle-due", {
          ...N(),
          expectedRevision: n.value.revision,
          expectedEventId: n.value.eventId,
          actionId: o
        }, U);
        if (d !== f) return;
        R = null, q(p.result);
      } catch (p) {
        d === f && ($.value = E(p));
      } finally {
        d === f && (y.value = !1);
      }
    }
    async function te() {
      if (!n.value.activityPage.hasMore || S.value || y.value) return;
      const d = f, o = n.value.activities.length;
      S.value = !0, D.value = "";
      try {
        const p = await u.bridge.request("bank/records/load-more", {
          ...N(),
          offset: o
        }, U);
        if (d !== f) return;
        const H = new Set(n.value.activities.map((I) => I.id));
        n.value.activities.push(...p.result.activities.filter((I) => !H.has(I.id))), n.value.activityPage = p.result.activityPage;
      } catch (p) {
        d === f && (D.value = E(p));
      } finally {
        d === f && (S.value = !1);
      }
    }
    return Q(() => {
      V = u.bridge.subscribe((d) => {
        d.type === "bank/state" && (y.value || (f += 1), q(d.payload.state)), d.type === "bank/error" && ($.value = E(d.payload?.message || ""));
      });
    }), oe(() => {
      f += 1, V(), h.value = null, R = null;
    }), (d, o) => (s(), i("main", ta, [
      e("header", la, [
        e("span", sa, [k(m, { kind: "vault" })]),
        o[4] || (o[4] = e("h1", null, "银行", -1)),
        e("div", ia, [o[3] || (o[3] = e("small", null, "钱包可用", -1)), e("strong", null, "¤ " + l(n.value.status === "loading" ? "—" : n.value.balance.toLocaleString("zh-CN")), 1)]),
        e("button", {
          type: "button",
          class: "bank-icon-button",
          disabled: r.value,
          "aria-label": "刷新银行",
          onClick: O
        }, [k(m, {
          kind: "refresh",
          class: x({ "is-spinning": C.value })
        }, null, 8, ["class"])], 8, oa)
      ]),
      n.value.message || $.value ? (s(), i("div", ua, [e("aside", {
        class: x(["bank-notice", { "is-error": !!$.value || n.value.status === "blocked" || n.value.status === "conflict" }]),
        role: "status"
      }, [
        e("strong", null, l($.value && n.value.status === "ready" ? "操作未完成" : n.value.statusLabel), 1),
        e("p", null, l($.value || n.value.message), 1),
        F.value ? (s(), i("button", {
          key: 0,
          type: "button",
          disabled: C.value || y.value,
          onClick: J
        }, l(C.value ? "正在核实…" : "核实保存结果"), 9, ra)) : n.value.status === "blocked" || n.value.status === "conflict" ? (s(), i("button", {
          key: 1,
          type: "button",
          disabled: r.value,
          onClick: O
        }, l(C.value ? "正在读取…" : "重新读取银行"), 9, da)) : v("", !0)
      ], 2)])) : v("", !0),
      e("div", {
        ref_key: "content",
        ref: b,
        class: "bank-scroll"
      }, [n.value.status === "loading" ? (s(), i("div", ba, [
        e("span", null, [k(m, {
          kind: "refresh",
          class: "is-spinning"
        })]),
        o[5] || (o[5] = e("h3", null, "正在打开你的金库…", -1)),
        o[6] || (o[6] = e("p", null, "余额与持有资产准备好后，会显示在这里。", -1))
      ])) : t.value === "vault" ? (s(), T(aa, {
        key: 1,
        balance: n.value.balance,
        "locked-amount": n.value.lockedAmount,
        "current-turn": n.value.currentTurn,
        "deposit-count": n.value.deposits.length,
        "fund-count": n.value.investments.length,
        "claimable-count": n.value.claimableCount,
        "write-disabled-reason": c.value,
        onNavigate: K,
        onSettle: Z
      }, null, 8, [
        "balance",
        "locked-amount",
        "current-turn",
        "deposit-count",
        "fund-count",
        "claimable-count",
        "write-disabled-reason"
      ])) : t.value === "deposits" ? (s(), T(Ye, {
        key: 2,
        products: n.value.products.deposits,
        balance: n.value.balance,
        "write-disabled-reason": c.value,
        onOpen: o[0] || (o[0] = (p) => W(p, "deposit-open"))
      }, null, 8, [
        "products",
        "balance",
        "write-disabled-reason"
      ])) : t.value === "funds" ? (s(), T(bn, {
        key: 3,
        products: n.value.products.funds,
        balance: n.value.balance,
        "write-disabled-reason": c.value,
        onOpen: o[1] || (o[1] = (p) => W(p, "fund-open"))
      }, null, 8, [
        "products",
        "balance",
        "write-disabled-reason"
      ])) : t.value === "positions" ? (s(), T(_n, {
        key: 4,
        deposits: n.value.deposits,
        investments: n.value.investments,
        "claimable-count": n.value.claimableCount,
        "write-disabled-reason": c.value,
        onWithdraw: ee,
        onSettle: Z,
        onBrowse: o[2] || (o[2] = (p) => K("deposits"))
      }, null, 8, [
        "deposits",
        "investments",
        "claimable-count",
        "write-disabled-reason"
      ])) : (s(), T(Kn, {
        key: 5,
        activities: n.value.activities,
        total: n.value.activityPage.total,
        "has-more": n.value.activityPage.hasMore,
        "loading-more": S.value,
        error: D.value,
        onLoadMore: te
      }, null, 8, [
        "activities",
        "total",
        "has-more",
        "loading-more",
        "error"
      ]))], 512),
      e("nav", va, [(s(), i(L, null, z([
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
      ], (p) => e("button", {
        key: p.page,
        type: "button",
        "aria-label": p.label,
        "aria-current": t.value === p.page ? "page" : void 0,
        onClick: (H) => K(p.page)
      }, [e("span", null, [k(m, { kind: p.icon }, null, 8, ["kind"]), p.page === "positions" && n.value.claimableCount ? (s(), i("i", ma)) : v("", !0)]), g(l(p.label), 1)], 8, ka)), 64))]),
      h.value ? (s(), T(Ue, {
        key: 1,
        mode: h.value.mode,
        product: h.value.product,
        position: h.value.position,
        balance: n.value.balance,
        busy: y.value,
        error: M.value,
        "claimable-count": n.value.claimableCount,
        "disabled-reason": c.value,
        onCancel: ne,
        onConfirm: ae
      }, null, 8, [
        "mode",
        "product",
        "position",
        "balance",
        "busy",
        "error",
        "claimable-count",
        "disabled-reason"
      ])) : v("", !0)
    ]));
  }
}), fa = ca;
export {
  fa as default
};
