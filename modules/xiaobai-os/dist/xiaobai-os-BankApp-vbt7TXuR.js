/* eslint-disable */
import { A as y, D as Y, M as Z, N as _, Q as f, S as E, _ as ee, a as $, c as k, d as te, et as i, f as x, l as u, m as M, o as e, p as C, r as w, s as z, x as s, y as le } from "./xiaobai-os-runtime-core.esm-bundler-Dmqi2Zbl.js";
import { a as ne, c as F, s as ae } from "./xiaobai-os-runtime-dom.esm-bundler-BYy7nd4d.js";
var ie = {
  class: "bank-product-icon",
  viewBox: "0 0 24 24",
  "aria-hidden": "true",
  focusable: "false"
}, se = /* @__PURE__ */ M({
  __name: "BankProductIcon",
  props: { kind: {} },
  setup(l) {
    return (v, t) => (s(), u("svg", ie, [l.kind === "deposit" ? (s(), u(w, { key: 0 }, [
      t[0] || (t[0] = e("path", { d: "M5 3.5h11l3 3V20.5H5z" }, null, -1)),
      t[1] || (t[1] = e("path", { d: "M16 3.5v3h3M8 10h8M8 13h6M8 16h4" }, null, -1)),
      t[2] || (t[2] = e("circle", {
        cx: "16.5",
        cy: "16.5",
        r: "2.5"
      }, null, -1))
    ], 64)) : l.kind === "fund" ? (s(), u(w, { key: 1 }, [t[3] || (t[3] = te('<path d="M4 19.5h16M5.5 16l4-4 3 2 6-7"></path><path d="m15.5 7 3-.5-.5 3"></path><circle cx="5.5" cy="16" r="1"></circle><circle cx="9.5" cy="12" r="1"></circle><circle cx="12.5" cy="14" r="1"></circle>', 5))], 64)) : l.kind === "records" ? (s(), u(w, { key: 2 }, [t[4] || (t[4] = e("path", { d: "M5 4.5h12a2 2 0 0 1 2 2v13H7a2 2 0 0 1-2-2z" }, null, -1)), t[5] || (t[5] = e("path", { d: "M7 4.5v12.8M9.5 8h6M9.5 11h6M9.5 14h4" }, null, -1))], 64)) : (s(), u(w, { key: 3 }, [t[6] || (t[6] = e("path", { d: "M4 12h12M12 8l4 4-4 4M19 5v14" }, null, -1)), t[7] || (t[7] = e("circle", {
      cx: "7",
      cy: "12",
      r: "5"
    }, null, -1))], 64))]));
  }
}), h = se, ue = ["aria-labelledby"], oe = ["id"], re = { class: "bank-dialog-subject" }, de = { key: 0 }, ve = { key: 1 }, be = {
  key: 0,
  class: "bank-dialog-field"
}, me = { id: "bank-amount-help" }, ke = {
  key: 1,
  class: "bank-dialog-validation"
}, ce = {
  key: 2,
  class: "bank-dialog-summary"
}, pe = {
  key: 3,
  class: "bank-dialog-warning"
}, fe = {
  key: 4,
  class: "bank-dialog-warning is-loss"
}, ge = {
  key: 5,
  class: "bank-dialog-error",
  role: "alert"
}, ye = { class: "bank-dialog-actions" }, $e = ["disabled"], we = ["disabled"], Ce = /* @__PURE__ */ M({
  __name: "BankActionDialog",
  props: {
    mode: {},
    product: {},
    position: {},
    balance: {},
    busy: { type: Boolean },
    error: {}
  },
  emits: ["cancel", "confirm"],
  setup(l, { emit: v }) {
    const t = l, n = v, r = y(t.product ? String(t.product.minAmount) : ""), c = $(() => t.mode === "deposit-open" ? "开立定期存单" : t.mode === "fund-open" ? "申购浮动理财" : "确认提前支取"), m = $(() => /^\d+$/.test(r.value.trim()) ? Number(r.value) : 0), g = $(() => t.mode === "withdraw" ? "" : !t.product || !Number.isSafeInteger(m.value) || m.value <= 0 ? "请输入正整数金额" : m.value < t.product.minAmount || m.value > t.product.maxAmount ? `金额须在 ${t.product.minAmount} 至 ${t.product.maxAmount} 之间` : m.value > t.balance ? "可用余额不足" : ""), p = $(() => t.mode === "deposit-open" ? t.product : null), B = $(() => p.value ? Math.floor(m.value * (1e4 + p.value.interestBps) / 1e4) : 0), L = $(() => !t.busy && (t.mode === "withdraw" || !g.value));
    function A() {
      if (L.value) {
        if (t.mode === "withdraw") {
          n("confirm");
          return;
        }
        n("confirm", m.value);
      }
    }
    return (N, o) => (s(), u("dialog", {
      open: "",
      class: "bank-dialog",
      "aria-labelledby": `bank-dialog-${l.mode}`,
      onClick: o[2] || (o[2] = F((S) => !l.busy && N.$emit("cancel"), ["self"])),
      onKeydown: o[3] || (o[3] = ae(F((S) => !l.busy && N.$emit("cancel"), ["stop", "prevent"]), ["esc"]))
    }, [e("form", {
      method: "dialog",
      class: "bank-dialog-card",
      onSubmit: F(A, ["prevent"])
    }, [
      e("h2", { id: `bank-dialog-${l.mode}` }, i(c.value), 9, oe),
      e("div", re, [e("span", null, [C(h, { kind: l.mode === "withdraw" ? "withdraw" : l.mode === "deposit-open" ? "deposit" : "fund" }, null, 8, ["kind"])]), e("div", null, [e("strong", null, i(l.position?.name || l.product?.name), 1), l.product ? (s(), u("small", de, i(l.product.lockLabel), 1)) : (s(), u("small", ve, "当前本金 ¤ " + i(l.position?.principal.toLocaleString("zh-CN")), 1))])]),
      l.mode !== "withdraw" ? (s(), u("label", be, [
        o[5] || (o[5] = e("span", null, "开户金额", -1)),
        e("div", null, [o[4] || (o[4] = e("i", null, "¤", -1)), Y(e("input", {
          "onUpdate:modelValue": o[0] || (o[0] = (S) => r.value = S),
          type: "text",
          inputmode: "numeric",
          autocomplete: "off",
          "aria-describedby": "bank-amount-help"
        }, null, 512), [[ne, r.value]])]),
        e("small", me, "可用 " + i(l.balance.toLocaleString("zh-CN")) + " · 范围 " + i(l.product?.minAmount) + " - " + i(l.product?.maxAmount), 1)
      ])) : k("", !0),
      g.value ? (s(), u("p", ke, i(g.value), 1)) : k("", !0),
      l.mode === "deposit-open" && p.value && !g.value ? (s(), u("dl", ce, [e("div", null, [o[6] || (o[6] = e("dt", null, "锁定期限", -1)), e("dd", null, i(p.value.lockLabel), 1)]), e("div", null, [o[7] || (o[7] = e("dt", null, "到期兑付", -1)), e("dd", null, "¤ " + i(B.value.toLocaleString("zh-CN")), 1)])])) : k("", !0),
      l.mode === "fund-open" ? (s(), u("p", pe, " 实际收益将在开户时封存，锁定期间不可退出，到期后才会揭晓并可领取。 ")) : k("", !0),
      l.mode === "withdraw" && l.position ? (s(), u("p", fe, [
        o[8] || (o[8] = x(" 将立即收回 ", -1)),
        e("strong", null, i(l.position.earlyWithdrawalAmount.toLocaleString("zh-CN")) + " 小白币", 1),
        x("，相较本金损失 " + i((l.position.principal - l.position.earlyWithdrawalAmount).toLocaleString("zh-CN")) + " 小白币。此操作不可撤销。 ", 1)
      ])) : k("", !0),
      l.error ? (s(), u("p", ge, i(l.error), 1)) : k("", !0),
      e("div", ye, [e("button", {
        type: "button",
        disabled: l.busy,
        onClick: o[1] || (o[1] = (S) => N.$emit("cancel"))
      }, "取消", 8, $e), e("button", {
        type: "submit",
        class: "is-primary",
        disabled: !L.value
      }, i(l.busy ? "正在封存…" : l.mode === "withdraw" ? `确认收回 ${l.position?.earlyWithdrawalAmount || 0}` : "确认开户"), 9, we)])
    ], 32)], 40, ue));
  }
}), he = Ce, Be = { "aria-labelledby": "bank-deposits-title" }, Me = { class: "bank-product-grid" }, Le = { class: "bank-product-index" }, Ae = { class: "bank-product-seal" }, Se = { class: "bank-rate-block" }, De = { class: "bank-product-terms" }, Ie = [
  "disabled",
  "title",
  "onClick"
], Ne = /* @__PURE__ */ M({
  __name: "BankDeposits",
  props: {
    products: {},
    balance: {},
    writeDisabledReason: {}
  },
  emits: ["open"],
  setup(l) {
    return (v, t) => (s(), u("section", Be, [
      t[5] || (t[5] = e("header", { class: "bank-section-heading" }, [e("h2", { id: "bank-deposits-title" }, "定期存单"), e("small", null, "到期收益确定")], -1)),
      t[6] || (t[6] = e("p", { class: "bank-section-intro" }, "本金锁定至约定回合。到期前可提前支取，最终到账额会在确认时明确列出。", -1)),
      e("div", Me, [(s(!0), u(w, null, E(l.products, (n, r) => (s(), u("article", {
        key: n.id,
        class: "bank-product-card bank-deposit-card"
      }, [
        e("header", null, [
          e("span", Le, "0" + i(r + 1), 1),
          e("div", null, [e("small", null, i(n.lockLabel), 1), e("h3", null, i(n.name), 1)]),
          e("span", Ae, [C(h, { kind: "deposit" })])
        ]),
        e("div", Se, [
          t[0] || (t[0] = e("span", null, "到期收益率", -1)),
          e("strong", null, i(n.interestLabel), 1),
          t[1] || (t[1] = e("small", null, "固定收益", -1))
        ]),
        e("dl", De, [e("div", null, [t[2] || (t[2] = e("dt", null, "开户范围", -1)), e("dd", null, i(n.amountLabel), 1)]), e("div", null, [t[3] || (t[3] = e("dt", null, "提前支取", -1)), e("dd", null, i(n.earlyPenaltyLabel), 1)])]),
        e("button", {
          type: "button",
          disabled: !!l.writeDisabledReason || l.balance < n.minAmount,
          title: l.writeDisabledReason || (l.balance < n.minAmount ? "可用余额不足最低开户额" : ""),
          onClick: (c) => v.$emit("open", n)
        }, [...t[4] || (t[4] = [x(" 开立存单", -1), e("span", null, "›", -1)])], 8, Ie)
      ]))), 128))])
    ]));
  }
}), Re = Ne, ze = { "aria-labelledby": "bank-funds-title" }, xe = { class: "bank-product-grid" }, Pe = { class: "bank-product-index" }, Ve = { class: "bank-rate-block" }, Te = { class: "bank-product-terms" }, Ee = [
  "disabled",
  "title",
  "onClick"
], qe = /* @__PURE__ */ M({
  __name: "BankFunds",
  props: {
    products: {},
    balance: {},
    writeDisabledReason: {}
  },
  emits: ["open"],
  setup(l) {
    return (v, t) => (s(), u("section", ze, [
      t[4] || (t[4] = e("header", { class: "bank-section-heading" }, [e("h2", { id: "bank-funds-title" }, "浮动理财"), e("small", null, "到期前不揭晓结果")], -1)),
      t[5] || (t[5] = e("p", { class: "bank-section-intro" }, "收益在开户时封存，到期后才会公开。理财锁定期间不可提前退出。", -1)),
      e("div", xe, [(s(!0), u(w, null, E(l.products, (n, r) => (s(), u("article", {
        key: n.id,
        class: "bank-product-card bank-fund-card"
      }, [
        e("header", null, [
          e("span", Pe, "F" + i(r + 1), 1),
          e("div", null, [e("small", null, i(n.lockLabel), 1), e("h3", null, i(n.name), 1)]),
          e("span", { class: f(["bank-risk-badge", `is-${n.riskLevel}`]) }, i(n.riskLabel), 3)
        ]),
        e("p", null, i(n.description), 1),
        e("div", Ve, [
          t[0] || (t[0] = e("span", null, "合同收益区间", -1)),
          e("strong", null, i(n.returnLabel), 1),
          t[1] || (t[1] = e("small", null, "实际结果到期可见", -1))
        ]),
        e("dl", Te, [e("div", null, [t[2] || (t[2] = e("dt", null, "开户范围", -1)), e("dd", null, i(n.amountLabel), 1)])]),
        e("button", {
          type: "button",
          disabled: !!l.writeDisabledReason || l.balance < n.minAmount,
          title: l.writeDisabledReason || (l.balance < n.minAmount ? "可用余额不足最低开户额" : ""),
          onClick: (c) => v.$emit("open", n)
        }, [...t[3] || (t[3] = [x(" 申购理财", -1), e("span", null, "›", -1)])], 8, Ee)
      ]))), 128))])
    ]));
  }
}), Ue = qe, Fe = { "aria-labelledby": "bank-positions-title" }, We = { class: "bank-section-heading" }, Oe = ["disabled"], He = {
  key: 0,
  class: "bank-empty-state"
}, Ke = {
  key: 1,
  class: "bank-position-group"
}, Qe = { class: "bank-position-top" }, je = { class: "bank-position-mark" }, Ge = { key: 0 }, Xe = { class: "is-loss" }, Je = [
  "disabled",
  "title",
  "onClick"
], Ye = {
  key: 1,
  class: "bank-due-note"
}, Ze = {
  key: 2,
  class: "bank-position-group"
}, _e = { class: "bank-position-top" }, et = { class: "bank-position-mark" }, tt = {
  key: 0,
  class: "bank-fund-result"
}, lt = {
  key: 1,
  class: "bank-sealed-copy"
}, nt = /* @__PURE__ */ M({
  __name: "BankPositions",
  props: {
    deposits: {},
    investments: {},
    claimableCount: {},
    writeDisabledReason: {}
  },
  emits: ["withdraw", "settle"],
  setup(l) {
    return (v, t) => (s(), u("section", Fe, [
      e("header", We, [t[1] || (t[1] = e("h2", { id: "bank-positions-title" }, "我的头寸", -1)), l.claimableCount ? (s(), u("button", {
        key: 0,
        type: "button",
        class: "bank-small-claim",
        disabled: !!l.writeDisabledReason,
        onClick: t[0] || (t[0] = (n) => v.$emit("settle"))
      }, " 领取全部 " + i(l.claimableCount) + " 笔 ", 9, Oe)) : k("", !0)]),
      !l.deposits.length && !l.investments.length ? (s(), u("div", He, [...t[2] || (t[2] = [
        e("span", null, "◇", -1),
        e("strong", null, "金库尚无头寸", -1),
        e("p", null, "从定期或理财页面选择一份产品开始配置资产。", -1)
      ])])) : k("", !0),
      l.deposits.length ? (s(), u("div", Ke, [e("header", null, [t[3] || (t[3] = e("h3", null, "定期存单", -1)), e("span", null, i(l.deposits.length), 1)]), (s(!0), u(w, null, E(l.deposits, (n) => (s(), u("article", {
        key: n.id,
        class: "bank-position-card"
      }, [
        e("div", Qe, [
          e("span", je, [C(h, { kind: "deposit" })]),
          e("div", null, [e("h4", null, i(n.name), 1), e("small", null, "本金 ¤ " + i(n.principal.toLocaleString("zh-CN")), 1)]),
          e("span", { class: f(["bank-position-status", { "is-due": n.claimable }]) }, i(n.statusLabel), 3)
        ]),
        e("dl", null, [e("div", null, [t[4] || (t[4] = e("dt", null, "到期兑付", -1)), e("dd", null, "¤ " + i(n.maturityAmount.toLocaleString("zh-CN")), 1)]), n.claimable ? k("", !0) : (s(), u("div", Ge, [t[5] || (t[5] = e("dt", null, "现在支取", -1)), e("dd", Xe, "¤ " + i(n.earlyWithdrawalAmount.toLocaleString("zh-CN")), 1)]))]),
        n.claimable ? (s(), u("span", Ye, "将在“领取全部”时统一兑付")) : (s(), u("button", {
          key: 0,
          type: "button",
          class: "bank-withdraw-button",
          disabled: !!l.writeDisabledReason,
          title: l.writeDisabledReason,
          onClick: (r) => v.$emit("withdraw", n)
        }, " 提前支取 ", 8, Je))
      ]))), 128))])) : k("", !0),
      l.investments.length ? (s(), u("div", Ze, [e("header", null, [t[6] || (t[6] = e("h3", null, "浮动理财", -1)), e("span", null, i(l.investments.length), 1)]), (s(!0), u(w, null, E(l.investments, (n) => (s(), u("article", {
        key: n.id,
        class: "bank-position-card"
      }, [e("div", _e, [
        e("span", et, [C(h, { kind: "fund" })]),
        e("div", null, [e("h4", null, i(n.name), 1), e("small", null, i(n.riskLabel) + " · 本金 ¤ " + i(n.principal.toLocaleString("zh-CN")), 1)]),
        e("span", { class: f(["bank-position-status", { "is-due": n.claimable }]) }, i(n.statusLabel), 3)
      ]), n.claimable ? (s(), u("div", tt, [
        t[7] || (t[7] = e("span", null, "封存结果已揭晓", -1)),
        e("strong", { class: f({ "is-negative": n.resolvedReturnBps < 0 }) }, i(n.returnLabel), 3),
        e("small", null, "可兑付 ¤ " + i(n.settlementAmount.toLocaleString("zh-CN")), 1)
      ])) : (s(), u("p", lt, "收益结果仍在金库中封存，到期前不会公开。"))]))), 128))])) : k("", !0)
    ]));
  }
}), at = nt, it = { "aria-labelledby": "bank-records-title" }, st = { class: "bank-section-heading" }, ut = {
  key: 0,
  class: "bank-empty-state"
}, ot = {
  key: 1,
  class: "bank-record-list"
}, rt = { class: "bank-record-mark" }, dt = { class: "bank-record-main" }, vt = {
  key: 0,
  class: "bank-inline-error",
  role: "alert"
}, bt = ["disabled"], mt = {
  key: 2,
  class: "bank-record-end"
}, kt = /* @__PURE__ */ M({
  __name: "BankRecords",
  props: {
    activities: {},
    total: {},
    hasMore: { type: Boolean },
    loadingMore: { type: Boolean },
    error: {}
  },
  emits: ["loadMore"],
  setup(l) {
    const v = new Intl.DateTimeFormat("zh-CN", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
    return (t, n) => (s(), u("section", it, [e("header", st, [n[1] || (n[1] = e("h2", { id: "bank-records-title" }, "金融记录", -1)), e("small", null, i(l.total) + " 笔", 1)]), l.activities.length ? (s(), u("div", ot, [
      (s(!0), u(w, null, E(l.activities, (r) => (s(), u("article", {
        key: r.id,
        class: "bank-record-row"
      }, [
        e("span", rt, [C(h, { kind: r.kind }, null, 8, ["kind"])]),
        e("div", dt, [
          e("header", null, [e("strong", null, i(r.productName), 1), e("span", null, i(r.resultLabel), 1)]),
          e("dl", null, [e("div", null, [n[4] || (n[4] = e("dt", null, "投入", -1)), e("dd", null, "¤ " + i(r.amountIn.toLocaleString("zh-CN")), 1)]), e("div", null, [n[5] || (n[5] = e("dt", null, "兑付", -1)), e("dd", null, "¤ " + i(r.payout.toLocaleString("zh-CN")), 1)])]),
          e("small", null, i(r.turnLabel) + " · " + i(_(v).format(r.createdAt)), 1)
        ]),
        e("strong", { class: f(["bank-record-net", {
          "is-negative": r.net < 0,
          "is-flat": r.net === 0
        }]) }, [x(i(r.net > 0 ? "+" : "") + i(r.net) + " ", 1), e("small", null, i(r.netLabel), 1)], 2)
      ]))), 128)),
      l.error ? (s(), u("p", vt, i(l.error), 1)) : k("", !0),
      l.hasMore ? (s(), u("button", {
        key: 1,
        type: "button",
        class: "bank-load-more",
        disabled: l.loadingMore,
        onClick: n[0] || (n[0] = (r) => t.$emit("loadMore"))
      }, i(l.loadingMore ? "正在开启下一册…" : "载入更多记录"), 9, bt)) : (s(), u("p", mt, "金库档案已全部展开"))
    ])) : (s(), u("div", ut, [
      e("span", null, [C(h, { kind: "records" })]),
      n[2] || (n[2] = e("strong", null, "尚无兑付记录", -1)),
      n[3] || (n[3] = e("p", null, "头寸到期领取或提前支取后，结果会归档在这里。", -1))
    ]))]));
  }
}), ct = kt, pt = {
  class: "bank-vault",
  "aria-labelledby": "bank-vault-title"
}, ft = { class: "bank-section-heading bank-vault-heading" }, gt = { class: "bank-balance-panel" }, yt = { class: "bank-vault-metrics" }, $t = ["disabled", "title"], wt = { class: "bank-vault-portals" }, Ct = { class: "bank-portal-mark" }, ht = { class: "bank-portal-mark" }, Bt = { class: "bank-portal-mark" }, Mt = /* @__PURE__ */ M({
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
  setup(l) {
    return (v, t) => (s(), u("section", pt, [
      t[18] || (t[18] = e("div", {
        class: "bank-vault-door",
        "aria-hidden": "true"
      }, [e("div", { class: "bank-vault-ring" }, [
        e("span", null, "III"),
        e("i"),
        e("span", null, "VI"),
        e("i"),
        e("span", null, "IX")
      ])], -1)),
      e("header", ft, [t[4] || (t[4] = e("h2", { id: "bank-vault-title" }, "金库总览", -1)), e("small", null, "第 " + i(l.currentTurn) + " 回合", 1)]),
      e("div", gt, [
        t[6] || (t[6] = e("span", null, "可用资产", -1)),
        e("strong", null, [t[5] || (t[5] = e("small", null, "¤", -1)), x(i(l.balance.toLocaleString("zh-CN")), 1)]),
        t[7] || (t[7] = e("div", null, [e("span", null, "小白币活期余额"), e("i", null, "随时可用")], -1))
      ]),
      e("div", yt, [e("article", null, [
        t[8] || (t[8] = e("span", null, "锁定本金", -1)),
        e("strong", null, "¤ " + i(l.lockedAmount.toLocaleString("zh-CN")), 1),
        e("small", null, i(l.depositCount + l.fundCount) + " 笔持仓", 1)
      ]), e("article", { class: f({ "is-claimable": l.claimableCount > 0 }) }, [
        t[9] || (t[9] = e("span", null, "待领取", -1)),
        e("strong", null, i(l.claimableCount), 1),
        e("small", null, i(l.claimableCount ? "已到期，可统一兑付" : "暂无到期头寸"), 1)
      ], 2)]),
      l.claimableCount ? (s(), u("button", {
        key: 0,
        type: "button",
        class: "bank-claim-button",
        disabled: !!l.writeDisabledReason,
        title: l.writeDisabledReason,
        onClick: t[0] || (t[0] = (n) => v.$emit("settle"))
      }, [t[10] || (t[10] = e("span", null, "领取全部到期资产", -1)), e("small", null, i(l.claimableCount) + " 笔一并结算", 1)], 8, $t)) : k("", !0),
      e("div", wt, [
        e("button", {
          type: "button",
          onClick: t[1] || (t[1] = (n) => v.$emit("navigate", "deposits"))
        }, [
          e("span", Ct, [C(h, { kind: "deposit" })]),
          t[11] || (t[11] = e("strong", null, "定期存单", -1)),
          e("small", null, i(l.depositCount) + " 笔持有", 1),
          t[12] || (t[12] = e("i", null, "›", -1))
        ]),
        e("button", {
          type: "button",
          onClick: t[2] || (t[2] = (n) => v.$emit("navigate", "funds"))
        }, [
          e("span", ht, [C(h, { kind: "fund" })]),
          t[13] || (t[13] = e("strong", null, "浮动理财", -1)),
          e("small", null, i(l.fundCount) + " 笔持有", 1),
          t[14] || (t[14] = e("i", null, "›", -1))
        ]),
        e("button", {
          type: "button",
          onClick: t[3] || (t[3] = (n) => v.$emit("navigate", "records"))
        }, [
          e("span", Bt, [C(h, { kind: "records" })]),
          t[15] || (t[15] = e("strong", null, "金融记录", -1)),
          t[16] || (t[16] = e("small", null, "查阅历史兑付", -1)),
          t[17] || (t[17] = e("i", null, "›", -1))
        ])
      ])
    ]));
  }
}), Lt = Mt, At = { class: "bank-app" }, St = { class: "bank-header" }, Dt = { class: "bank-header-balance" }, It = ["disabled"], Nt = {
  class: "bank-navigation",
  "aria-label": "银行页面"
}, Rt = { key: 0 }, zt = ["disabled"], xt = ["disabled"], Pt = { class: "bank-scroll" }, T = 35e3, Vt = /* @__PURE__ */ M({
  __name: "BankApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(l) {
    const v = l, t = y(structuredClone(Z(v.initialState))), n = y("vault"), r = y(null), c = y(!1), m = y(!1), g = y(!1), p = y(""), B = y(""), L = y("");
    let A = null, N = () => {
    }, o = 0;
    const S = $(() => t.value.status === "unconfirmed"), D = $(() => m.value ? "正在处理上一项银行操作" : c.value ? "正在刷新金库状态" : t.value.status !== "ready" ? t.value.message || "金库暂时不可写入" : t.value.generationActive ? "主剧情正在生成，请等待回复完成" : ""), W = $(() => c.value || m.value || S.value);
    function q() {
      return typeof globalThis.crypto?.randomUUID == "function" ? `bank-ui:${globalThis.crypto.randomUUID()}` : `bank-ui:${Date.now()}:${Math.random().toString(36).slice(2, 10)}`;
    }
    function P() {
      return { chatIdentity: t.value.chatIdentity };
    }
    function V(d) {
      t.value = structuredClone(d), c.value = !1, g.value = !1, p.value = "", L.value = "", d.claimableCount === 0 && (A = null);
    }
    function R(d) {
      const a = d instanceof Error ? d.message : String(d);
      return a.includes("economy_insufficient_funds") || a.includes("cannot be overdrawn") ? "可用小白币不足，开户未完成。" : a.includes("bank_amount_out_of_range") ? "开户金额不在该产品允许范围内。" : a.includes("bank_amount_invalid") ? "开户金额必须是正整数。" : a.includes("bank_revision_conflict") || a.includes("bank_event_id_conflict") ? "金库状态已变化，请关闭确认框并刷新后重试。" : a.includes("bank_position_missing") || a.includes("bank_position_state_changed") ? "该头寸状态已经变化，请刷新金库。" : a.includes("bank_no_due_positions") ? "当前没有可领取的到期头寸。" : a === "host_request_timeout" ? "等待保存结果超时，请保留当前页面并重试。" : "银行操作未完成，请稍后重试。";
    }
    async function O() {
      if (W.value) return;
      const d = ++o;
      c.value = !0, p.value = "";
      try {
        const a = await v.bridge.request("bank/refresh", P(), T);
        d === o && V(a.result);
      } catch (a) {
        d === o && (p.value = R(a));
      } finally {
        d === o && (c.value = !1);
      }
    }
    async function Q() {
      if (c.value || m.value) return;
      const d = ++o;
      c.value = !0, p.value = "";
      try {
        const a = await v.bridge.request("bank/confirm-save", P(), T);
        d === o && V(a.result.state);
      } catch (a) {
        d === o && (p.value = R(a));
      } finally {
        d === o && (c.value = !1);
      }
    }
    function H(d, a) {
      D.value || (B.value = "", r.value = {
        mode: a,
        product: d,
        actionId: q()
      });
    }
    function j(d) {
      D.value || (B.value = "", r.value = {
        mode: "withdraw",
        position: d,
        actionId: q()
      });
    }
    function G() {
      m.value || (r.value = null, B.value = "");
    }
    async function X(d) {
      const a = r.value;
      if (!a || m.value) return;
      const b = o;
      m.value = !0, B.value = "";
      const U = a.mode === "deposit-open" ? "bank/deposit/open" : a.mode === "fund-open" ? "bank/fund/open" : "bank/deposit/withdraw";
      try {
        const I = await v.bridge.request(U, {
          ...P(),
          expectedRevision: t.value.revision,
          expectedEventId: t.value.eventId,
          actionId: a.actionId,
          ...a.product ? {
            productId: a.product.id,
            amount: d
          } : {},
          ...a.position ? { positionId: a.position.id } : {}
        }, T);
        if (b !== o || r.value !== a) return;
        V(I.result), r.value = null;
      } catch (I) {
        b === o && r.value === a && (B.value = R(I));
      } finally {
        b === o && (m.value = !1);
      }
    }
    async function K() {
      if (D.value || t.value.claimableCount === 0) return;
      const d = o;
      A ||= q();
      const a = A;
      m.value = !0, p.value = "";
      try {
        const b = await v.bridge.request("bank/settle-due", {
          ...P(),
          expectedRevision: t.value.revision,
          expectedEventId: t.value.eventId,
          actionId: a
        }, T);
        if (d !== o) return;
        A = null, V(b.result);
      } catch (b) {
        d === o && (p.value = R(b));
      } finally {
        d === o && (m.value = !1);
      }
    }
    async function J() {
      if (!t.value.activityPage.hasMore || g.value || m.value) return;
      const d = o, a = t.value.activities.length;
      g.value = !0, L.value = "";
      try {
        const b = await v.bridge.request("bank/records/load-more", {
          ...P(),
          offset: a
        }, T);
        if (d !== o) return;
        const U = new Set(t.value.activities.map((I) => I.id));
        t.value.activities.push(...b.result.activities.filter((I) => !U.has(I.id))), t.value.activityPage = b.result.activityPage;
      } catch (b) {
        d === o && (L.value = R(b));
      } finally {
        d === o && (g.value = !1);
      }
    }
    return le(() => {
      N = v.bridge.subscribe((d) => {
        d.type === "bank/state" && (m.value || (o += 1), V(d.payload.state)), d.type === "bank/error" && (p.value = R(d.payload?.message || ""));
      });
    }), ee(() => {
      o += 1, N(), r.value = null, A = null;
    }), (d, a) => (s(), u("main", At, [
      e("header", St, [
        a[10] || (a[10] = e("div", null, [e("h1", null, "白银金库")], -1)),
        e("div", Dt, [a[8] || (a[8] = e("small", null, "可用余额", -1)), e("strong", null, "¤ " + i(t.value.balance.toLocaleString("zh-CN")), 1)]),
        e("button", {
          type: "button",
          class: "bank-refresh",
          disabled: W.value,
          title: "重新读取金库",
          onClick: O
        }, [...a[9] || (a[9] = [e("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [e("path", { d: "M20 7v5h-5M4 17v-5h5M18.2 9A7 7 0 0 0 6.1 6.7L4 9m16 6-2.1 2.3A7 7 0 0 1 5.8 15" })], -1), e("span", { class: "bank-sr-only" }, "重新读取金库", -1)])], 8, It)
      ]),
      e("nav", Nt, [
        e("button", {
          type: "button",
          class: f({ "is-active": n.value === "vault" }),
          onClick: a[0] || (a[0] = (b) => n.value = "vault")
        }, [...a[11] || (a[11] = [e("span", null, "总览", -1)])], 2),
        e("button", {
          type: "button",
          class: f({ "is-active": n.value === "deposits" }),
          onClick: a[1] || (a[1] = (b) => n.value = "deposits")
        }, [...a[12] || (a[12] = [e("span", null, "定期", -1)])], 2),
        e("button", {
          type: "button",
          class: f({ "is-active": n.value === "funds" }),
          onClick: a[2] || (a[2] = (b) => n.value = "funds")
        }, [...a[13] || (a[13] = [e("span", null, "理财", -1)])], 2),
        e("button", {
          type: "button",
          class: f({ "is-active": n.value === "positions" }),
          onClick: a[3] || (a[3] = (b) => n.value = "positions")
        }, [a[14] || (a[14] = e("span", null, "头寸", -1)), t.value.claimableCount ? (s(), u("i", Rt, i(t.value.claimableCount), 1)) : k("", !0)], 2),
        e("button", {
          type: "button",
          class: f({ "is-active": n.value === "records" }),
          onClick: a[4] || (a[4] = (b) => n.value = "records")
        }, [...a[15] || (a[15] = [e("span", null, "记录", -1)])], 2)
      ]),
      t.value.message || p.value ? (s(), u("aside", {
        key: 0,
        class: f(["bank-notice", `is-${t.value.status}`]),
        role: "status"
      }, [a[16] || (a[16] = e("span", { "aria-hidden": "true" }, "鉴", -1)), e("div", null, [
        e("strong", null, i(p.value && t.value.status === "ready" ? "操作未完成" : t.value.statusLabel), 1),
        e("p", null, i(p.value || t.value.message), 1),
        S.value ? (s(), u("button", {
          key: 0,
          type: "button",
          disabled: c.value,
          onClick: Q
        }, i(c.value ? "正在核实…" : "核实保存结果"), 9, zt)) : t.value.status === "blocked" || t.value.status === "conflict" ? (s(), u("button", {
          key: 1,
          type: "button",
          disabled: c.value,
          onClick: O
        }, i(c.value ? "正在读取…" : "重新读取金库"), 9, xt)) : k("", !0)
      ])], 2)) : k("", !0),
      e("div", Pt, [n.value === "vault" ? (s(), z(Lt, {
        key: 0,
        balance: t.value.balance,
        "locked-amount": t.value.lockedAmount,
        "current-turn": t.value.currentTurn,
        "deposit-count": t.value.deposits.length,
        "fund-count": t.value.investments.length,
        "claimable-count": t.value.claimableCount,
        "write-disabled-reason": D.value,
        onNavigate: a[5] || (a[5] = (b) => n.value = b),
        onSettle: K
      }, null, 8, [
        "balance",
        "locked-amount",
        "current-turn",
        "deposit-count",
        "fund-count",
        "claimable-count",
        "write-disabled-reason"
      ])) : n.value === "deposits" ? (s(), z(Re, {
        key: 1,
        products: t.value.products.deposits,
        balance: t.value.balance,
        "write-disabled-reason": D.value,
        onOpen: a[6] || (a[6] = (b) => H(b, "deposit-open"))
      }, null, 8, [
        "products",
        "balance",
        "write-disabled-reason"
      ])) : n.value === "funds" ? (s(), z(Ue, {
        key: 2,
        products: t.value.products.funds,
        balance: t.value.balance,
        "write-disabled-reason": D.value,
        onOpen: a[7] || (a[7] = (b) => H(b, "fund-open"))
      }, null, 8, [
        "products",
        "balance",
        "write-disabled-reason"
      ])) : n.value === "positions" ? (s(), z(at, {
        key: 3,
        deposits: t.value.deposits,
        investments: t.value.investments,
        "claimable-count": t.value.claimableCount,
        "write-disabled-reason": D.value,
        onWithdraw: j,
        onSettle: K
      }, null, 8, [
        "deposits",
        "investments",
        "claimable-count",
        "write-disabled-reason"
      ])) : (s(), z(ct, {
        key: 4,
        activities: t.value.activities,
        total: t.value.activityPage.total,
        "has-more": t.value.activityPage.hasMore,
        "loading-more": g.value,
        error: L.value,
        onLoadMore: J
      }, null, 8, [
        "activities",
        "total",
        "has-more",
        "loading-more",
        "error"
      ]))]),
      r.value ? (s(), z(he, {
        key: 1,
        mode: r.value.mode,
        product: r.value.product,
        position: r.value.position,
        balance: t.value.balance,
        busy: m.value,
        error: B.value,
        onCancel: G,
        onConfirm: X
      }, null, 8, [
        "mode",
        "product",
        "position",
        "balance",
        "busy",
        "error"
      ])) : k("", !0)
    ]));
  }
}), qt = Vt;
export {
  qt as default
};
