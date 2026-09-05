/* eslint-disable */
import { A as K, C as n, F as ce, I as q, L as G, M as Ze, N as h, T as He, _ as B, c as C, d as A, f, g as c, h as b, i as z, k as Fe, l as R, p as d, s as ye, u as e, w as E, x as me, y as Ke, z as u } from "./xiaobai-os-runtime-dom.esm-bundler-D8PGSboO.js";
var ze = {
  class: "tasks-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.7",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, Qe = ["d"], Ge = /* @__PURE__ */ B({
  __name: "TaskIcon",
  props: { name: {} },
  setup(t) {
    const o = {
      compass: "m14.5 9.5-2 5-5 2 2-5 5-2ZM12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z",
      send: "m21 3-7 18-4-7-7-4 18-7ZM10 14 21 3",
      archive: "M4 8h16v12H4V8ZM3 4h18v4H3V4Zm6 8h6",
      settings: "M4 7h16M4 17h16M9 4v6m6 4v6",
      back: "m14 5-7 7 7 7",
      next: "m9 5 7 7-7 7",
      refresh: "M20 7v5h-5M4 17v-5h5M18 9A7 7 0 0 0 6 7L4 9m16 6-2 2A7 7 0 0 1 6 15",
      pin: "M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0ZM12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z",
      check: "m5 12 4 4L19 6",
      plus: "M12 5v14M5 12h14",
      ticket: "M5 3h14v18l-3-2-4 2-4-2-3 2V3Zm4 5h6m-6 4h6",
      people: "M9 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM3 20v-3a6 6 0 0 1 12 0v3m1-16a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 5v2",
      clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4v5l3 2",
      close: "m6 6 12 12M6 18 18 6"
    };
    return (s, a) => (n(), d("svg", ze, [e("path", { d: o[t.name] }, null, 8, Qe)]));
  }
}), y = Ge, fe = {
  recruiting: "招募中",
  active: "进行中",
  completed: "已完成",
  failed: "未完成",
  cancelled: "已撤回"
};
function V(t) {
  return t.toLocaleString("zh-CN");
}
function Je(t) {
  return t.source === "received" ? "任务终端" : `${t.issuer.displayName}（你）`;
}
function We(t) {
  return {
    received: t.active.filter((o) => o.source === "received"),
    published: [...t.recruiting, ...t.active.filter((o) => o.source === "published")].sort((o, s) => s.updatedAt - o.updatedAt || s.taskId.localeCompare(o.taskId))
  };
}
var Xe = { class: "tasks-page tasks-detail-page" }, Ye = {
  key: 0,
  class: "tasks-empty",
  role: "status"
}, _e = { class: "tasks-contract-sheet" }, et = { class: "tasks-contract-heading" }, tt = ["data-status"], st = { key: 0 }, at = { class: "tasks-contract-reward" }, lt = { class: "tasks-seal" }, nt = { class: "tasks-party-line" }, it = { class: "tasks-facts" }, rt = { key: 0 }, ut = { key: 1 }, dt = {
  key: 2,
  class: "is-risk"
}, ot = { class: "tasks-progress-summary" }, vt = { class: "tasks-eyebrow" }, kt = { class: "tasks-timeline" }, bt = {
  key: 2,
  class: "tasks-empty"
}, ct = /* @__PURE__ */ B({
  __name: "TaskDetail",
  props: {
    detail: {},
    loading: { type: Boolean }
  },
  setup(t) {
    function o(s) {
      return new Date(s).toLocaleString("zh-CN", {
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: !1
      });
    }
    return (s, a) => (n(), d("section", Xe, [t.loading ? (n(), d("div", Ye, [c(y, {
      name: "refresh",
      class: "is-spinning"
    }), a[0] || (a[0] = e("h3", null, "正在展开这份委托…", -1))])) : t.detail ? (n(), d(C, { key: 1 }, [
      e("article", _e, [
        e("header", et, [
          e("span", {
            class: "tasks-status",
            "data-status": t.detail.task.status
          }, [a[1] || (a[1] = e("i", null, null, -1)), b(u(q(fe)[t.detail.task.status]), 1)], 8, tt),
          e("h2", null, u(t.detail.task.title), 1),
          t.detail.task.hook ? (n(), d("p", st, u(t.detail.task.hook), 1)) : f("", !0)
        ]),
        e("div", at, [e("span", null, [a[3] || (a[3] = b("委托报酬", -1)), e("strong", null, [a[2] || (a[2] = e("small", null, "¤", -1)), b(" " + u(q(V)(t.detail.task.reward)), 1)])]), e("span", lt, [c(y, { name: "ticket" }), b(u(t.detail.task.source === "received" ? "终端委托" : "我的委托"), 1)])]),
        e("div", nt, [
          e("span", null, [a[4] || (a[4] = b("发布者", -1)), e("strong", null, u(q(Je)(t.detail.task)), 1)]),
          c(y, { name: "next" }),
          e("span", null, [a[5] || (a[5] = b("执行者", -1)), e("strong", null, u(t.detail.task.assignee?.displayName || "等待选人"), 1)])
        ]),
        e("dl", it, [
          e("div", null, [a[6] || (a[6] = e("dt", null, "完成目标", -1)), e("dd", null, u(t.detail.task.objective), 1)]),
          t.detail.task.requirements ? (n(), d("div", rt, [a[7] || (a[7] = e("dt", null, "执行约束", -1)), e("dd", null, u(t.detail.task.requirements), 1)])) : f("", !0),
          e("div", null, [a[8] || (a[8] = e("dt", null, "行动地点", -1)), e("dd", null, u(t.detail.task.location), 1)]),
          t.detail.task.timing ? (n(), d("div", ut, [a[9] || (a[9] = e("dt", null, "行动时机", -1)), e("dd", null, u(t.detail.task.timing), 1)])) : f("", !0),
          t.detail.task.risk ? (n(), d("div", dt, [a[10] || (a[10] = e("dt", null, "留意风险", -1)), e("dd", null, u(t.detail.task.risk), 1)])) : f("", !0)
        ])
      ]),
      e("section", ot, [e("span", vt, u(t.detail.task.resultSummary ? "最终结果" : "当前进展"), 1), e("p", null, u(t.detail.task.resultSummary || t.detail.task.progressSummary || "还没有已确认的进展，下一步在故事中发生。"), 1)]),
      e("section", kt, [a[12] || (a[12] = e("h3", null, "一路走来", -1)), e("ol", null, [(n(!0), d(C, null, E(t.detail.timeline, (m) => (n(), d("li", { key: m.eventId }, [a[11] || (a[11] = e("i", null, null, -1)), e("div", null, [e("small", null, u(o(m.createdAt)), 1), e("p", null, u(m.summary), 1)])]))), 128))])])
    ], 64)) : (n(), d("div", bt, [...a[13] || (a[13] = [e("h3", null, "这份委托暂时无法读取", -1), e("p", null, "请返回后重试。", -1)])]))]));
  }
}), yt = ct, mt = { class: "tasks-page tasks-publish-page" }, ft = ["disabled"], gt = { class: "tasks-form-group" }, $t = { class: "tasks-form-extra" }, pt = { class: "tasks-form-group" }, ht = { class: "tasks-reward-editor" }, wt = { class: "tasks-amount-input" }, Ct = ["max"], It = { class: "tasks-reward-presets" }, Tt = [
  "aria-pressed",
  "disabled",
  "onClick"
], Rt = {
  key: 0,
  class: "tasks-error-text",
  role: "status"
}, Bt = { class: "tasks-hint" }, Mt = {
  key: 0,
  class: "tasks-hint"
}, xt = ["disabled"], At = /* @__PURE__ */ B({
  __name: "TaskPublishForm",
  props: {
    balance: {},
    busy: { type: Boolean },
    disabledReason: {}
  },
  emits: ["submit"],
  setup(t, { emit: o }) {
    const s = o, a = Ze({
      title: "",
      objective: "",
      requirements: "",
      location: "",
      risk: "",
      reward: 20
    });
    function m() {
      s("submit", {
        title: a.title,
        objective: a.objective,
        ...a.requirements.trim() ? { requirements: a.requirements } : {},
        location: a.location,
        risk: a.risk,
        reward: Number(a.reward)
      });
    }
    return ($, r) => (n(), d("section", mt, [r[17] || (r[17] = e("header", { class: "tasks-page-heading" }, [
      e("span", { class: "tasks-eyebrow" }, "一份清楚的托付"),
      e("h2", null, "你希望谁，做成什么？"),
      e("p", null, "发布后再招募、选择执行者。")
    ], -1)), e("form", {
      class: "tasks-publish-form",
      onSubmit: ye(m, ["prevent"])
    }, [
      e("fieldset", { disabled: t.busy }, [
        r[15] || (r[15] = e("legend", { class: "tasks-sr-only" }, "委托内容", -1)),
        e("div", gt, [
          e("label", null, [r[6] || (r[6] = e("span", null, [b("给委托起个名字 "), e("b", null, "*")], -1)), K(e("input", {
            "onUpdate:modelValue": r[0] || (r[0] = (v) => a.title = v),
            required: "",
            maxlength: "120",
            autocomplete: "off",
            placeholder: "例如：找回遗落在钟楼的手札"
          }, null, 512), [[z, a.title]])]),
          e("label", null, [r[7] || (r[7] = e("span", null, [b("怎样才算完成 "), e("b", null, "*")], -1)), K(e("textarea", {
            "onUpdate:modelValue": r[1] || (r[1] = (v) => a.objective = v),
            required: "",
            maxlength: "8000",
            rows: "4",
            placeholder: "写一个可以明确判定完成的目标"
          }, null, 512), [[z, a.objective]])]),
          e("label", null, [r[8] || (r[8] = e("span", null, [b("去哪里行动 "), e("b", null, "*")], -1)), K(e("input", {
            "onUpdate:modelValue": r[2] || (r[2] = (v) => a.location = v),
            required: "",
            maxlength: "600",
            autocomplete: "off",
            placeholder: "目标行动实际发生的地点"
          }, null, 512), [[z, a.location]])])
        ]),
        e("details", $t, [r[11] || (r[11] = e("summary", null, [b("补充约束与风险 "), e("span", null, "选填")], -1)), e("div", pt, [e("label", null, [r[9] || (r[9] = e("span", null, "执行约束", -1)), K(e("textarea", {
          "onUpdate:modelValue": r[3] || (r[3] = (v) => a.requirements = v),
          maxlength: "8000",
          rows: "3",
          placeholder: "对行动方式的要求，不增加第二个目标"
        }, null, 512), [[z, a.requirements]])]), e("label", null, [r[10] || (r[10] = e("span", null, "已知风险", -1)), K(e("textarea", {
          "onUpdate:modelValue": r[4] || (r[4] = (v) => a.risk = v),
          maxlength: "2000",
          rows: "3",
          placeholder: "有哪些需要执行者提前知道的风险？"
        }, null, 512), [[z, a.risk]])])])]),
        e("div", ht, [
          e("label", null, [r[13] || (r[13] = e("span", null, [b("为这份委托设定报酬 "), e("b", null, "*")], -1)), e("span", wt, [r[12] || (r[12] = e("i", null, "¤", -1)), K(e("input", {
            "onUpdate:modelValue": r[5] || (r[5] = (v) => a.reward = v),
            "aria-label": "托管报酬",
            type: "number",
            required: "",
            min: "1",
            max: t.balance,
            step: "1"
          }, null, 8, Ct), [[
            z,
            a.reward,
            void 0,
            { number: !0 }
          ]])])]),
          e("div", It, [(n(), d(C, null, E([
            20,
            50,
            100
          ], (v) => e("button", {
            key: v,
            type: "button",
            "aria-pressed": Number(a.reward) === v,
            disabled: v > t.balance,
            onClick: (j) => a.reward = v
          }, "¤ " + u(v), 9, Tt)), 64))]),
          e("p", null, [r[14] || (r[14] = b("可用余额 ", -1)), e("strong", null, "¤ " + u(q(V)(t.balance)), 1)]),
          Number(a.reward) > t.balance ? (n(), d("p", Rt, "报酬超出可用余额，请调整金额。")) : f("", !0)
        ])
      ], 8, ft),
      e("p", Bt, [c(y, { name: "ticket" }), r[16] || (r[16] = b("发布时托管报酬；招募期间可撤回退款，选定执行者后不可撤回。", -1))]),
      t.disabledReason ? (n(), d("p", Mt, u(t.disabledReason), 1)) : f("", !0),
      e("button", {
        type: "submit",
        class: "tasks-primary-button tasks-full-button",
        disabled: t.busy || !!t.disabledReason || Number(a.reward) > t.balance
      }, [b(u(t.busy ? "正在发布…" : "预览并发布"), 1), c(y, { name: "next" })], 8, xt)
    ], 32)]));
  }
}), St = At, Dt = { class: "tasks-record-top" }, qt = ["data-status"], Lt = { class: "tasks-reward" }, Pt = { class: "tasks-record-title" }, Nt = { class: "tasks-record-summary" }, Vt = { class: "tasks-record-foot" }, Et = /* @__PURE__ */ B({
  __name: "TaskRecordCard",
  props: { task: {} },
  emits: ["open"],
  setup(t) {
    return (o, s) => (n(), d("button", {
      type: "button",
      class: "tasks-record",
      onClick: s[0] || (s[0] = (a) => o.$emit("open", t.task))
    }, [
      e("span", Dt, [e("span", {
        class: "tasks-status",
        "data-status": t.task.status
      }, [s[1] || (s[1] = e("i", null, null, -1)), b(u(q(fe)[t.task.status]), 1)], 8, qt), e("span", Lt, [s[2] || (s[2] = e("small", null, "¤", -1)), b(" " + u(q(V)(t.task.reward)), 1)])]),
      e("strong", Pt, u(t.task.title), 1),
      e("span", Nt, u(t.task.resultSummary || t.task.progressSummary || (t.task.status === "recruiting" ? "委托已发布，等待你选择执行者。" : "任务已开始，等待新的进展。")), 1),
      e("span", Vt, [e("span", null, [c(y, { name: t.task.source === "received" ? "pin" : "people" }, null, 8, ["name"]), b(u(t.task.source === "received" ? t.task.location : t.task.assignee?.displayName || `${t.task.candidates.length} 位候选人`), 1)]), c(y, { name: "next" })])
    ]));
  }
}), ae = Et, jt = { class: "tasks-page" }, Ot = {
  key: 0,
  class: "tasks-empty"
}, Ut = { class: "tasks-empty-mark" }, Zt = {
  key: 1,
  class: "tasks-record-list"
}, Ht = /* @__PURE__ */ B({
  __name: "TasksActive",
  props: { records: {} },
  emits: ["detail", "discover"],
  setup(t) {
    return (o, s) => (n(), d("section", jt, [s[3] || (s[3] = e("header", { class: "tasks-page-heading" }, [
      e("span", { class: "tasks-eyebrow" }, "由你执行"),
      e("h2", null, "每一步，都算数。"),
      e("p", null, "在故事中行动，在这里查看已确认的进展。")
    ], -1)), t.records.length ? (n(), d("div", Zt, [(n(!0), d(C, null, E(t.records, (a) => (n(), A(ae, {
      key: a.taskId,
      task: a,
      onOpen: (m) => o.$emit("detail", a.taskId)
    }, null, 8, ["task", "onOpen"]))), 128))])) : (n(), d("div", Ot, [
      e("span", Ut, [c(y, { name: "compass" })]),
      s[1] || (s[1] = e("h3", null, "还没有进行中的委托", -1)),
      s[2] || (s[2] = e("p", null, "到大厅选一份委托，开启下一段经历。", -1)),
      e("button", {
        type: "button",
        class: "tasks-primary-button",
        onClick: s[0] || (s[0] = (a) => o.$emit("discover"))
      }, "去发现委托")
    ]))]));
  }
}), Ft = Ht, Kt = { class: "tasks-page tasks-board-page" }, zt = { class: "tasks-hero" }, Qt = {
  class: "tasks-hero-art",
  "aria-hidden": "true"
}, Gt = { class: "tasks-paper" }, Jt = { class: "tasks-section-heading" }, Wt = { key: 0 }, Xt = ["disabled"], Yt = {
  key: 0,
  class: "tasks-hint",
  role: "status"
}, _t = {
  key: 1,
  class: "tasks-empty"
}, es = { class: "tasks-empty-mark" }, ts = ["disabled"], ss = ["aria-busy"], as = ["onClick"], ls = { class: "tasks-ticket-top" }, ns = ["data-grade"], is = { class: "tasks-ticket-tags" }, rs = {
  key: 0,
  class: "tasks-accepted"
}, us = {
  key: 1,
  class: "tasks-ticket-posture"
}, ds = { class: "tasks-ticket-title" }, os = { class: "tasks-ticket-hook" }, vs = { class: "tasks-ticket-location" }, ks = { class: "tasks-ticket-foot" }, bs = { class: "tasks-reward" }, cs = { class: "tasks-ticket-open" }, ys = /* @__PURE__ */ B({
  __name: "TasksBoard",
  props: {
    board: {},
    busy: { type: Boolean },
    disabledReason: {}
  },
  emits: ["refresh", "detail"],
  setup(t) {
    return (o, s) => (n(), d("section", Kt, [
      e("div", zt, [s[6] || (s[6] = e("div", null, [
        e("span", { class: "tasks-eyebrow" }, "由任务终端发布"),
        e("h2", null, [
          b("下一段故事，"),
          e("br"),
          b("从这里开始。")
        ]),
        e("p", null, "接下一份委托，让行动有所回响。")
      ], -1)), e("div", Qt, [s[5] || (s[5] = e("div", { class: "tasks-paper is-back" }, null, -1)), e("div", Gt, [
        s[2] || (s[2] = e("i", null, null, -1)),
        s[3] || (s[3] = e("i", null, null, -1)),
        s[4] || (s[4] = e("i", null, null, -1)),
        e("span", null, [c(y, { name: "check" })])
      ])])]),
      e("header", Jt, [e("h3", null, [s[7] || (s[7] = b("发现委托 ", -1)), t.board ? (n(), d("small", Wt, u(t.board.listings.length), 1)) : f("", !0)]), e("button", {
        type: "button",
        class: "tasks-text-button",
        disabled: t.busy || !!t.disabledReason,
        onClick: s[0] || (s[0] = (a) => o.$emit("refresh"))
      }, [c(y, {
        name: "refresh",
        class: G({ "is-spinning": t.busy })
      }, null, 8, ["class"]), b(u(t.busy ? "正在寻找…" : t.board ? "换一批" : "获取委托"), 1)], 8, Xt)]),
      t.disabledReason ? (n(), d("p", Yt, u(t.disabledReason), 1)) : f("", !0),
      !t.board || !t.board.listings.length ? (n(), d("div", _t, [
        e("span", es, [c(y, { name: "compass" })]),
        e("h3", null, u(t.busy ? "正在寻找新的委托" : "你的下一份委托，在这里"), 1),
        e("p", null, u(t.busy ? "生成会在后台继续，你可以先去别处看看。" : "从当前故事中发现可以行动的机会。"), 1),
        t.busy ? f("", !0) : (n(), d("button", {
          key: 0,
          type: "button",
          class: "tasks-primary-button",
          disabled: !!t.disabledReason,
          onClick: s[1] || (s[1] = (a) => o.$emit("refresh"))
        }, "获取第一批委托", 8, ts))
      ])) : (n(), d("div", {
        key: 2,
        class: "tasks-board-list",
        "aria-busy": t.busy
      }, [(n(!0), d(C, null, E(t.board.listings, (a) => (n(), d("button", {
        key: a.listingId,
        type: "button",
        class: G(["tasks-ticket", { "is-accepted": a.accepted }]),
        onClick: (m) => o.$emit("detail", t.board.boardId, a.listingId)
      }, [
        e("span", ls, [
          e("span", {
            class: "tasks-grade",
            "data-grade": a.grade
          }, u(a.grade), 9, ns),
          e("span", is, u(a.tags.slice(0, 2).join(" · ")), 1),
          a.accepted ? (n(), d("span", rs, [c(y, { name: "check" }), s[8] || (s[8] = b("已接取", -1))])) : (n(), d("span", us, u(a.posture), 1))
        ]),
        e("strong", ds, u(a.title), 1),
        e("span", os, u(a.hook), 1),
        e("span", vs, [c(y, { name: "pin" }), b(u(a.location), 1)]),
        e("span", ks, [e("span", bs, [
          s[9] || (s[9] = e("small", null, "¤", -1)),
          b(" " + u(q(V)(a.reward)) + " ", 1),
          s[10] || (s[10] = e("em", null, "任务报酬", -1))
        ]), e("span", cs, [s[11] || (s[11] = b("查看委托", -1)), c(y, { name: "next" })])])
      ], 10, as))), 128))], 8, ss)),
      s[12] || (s[12] = e("p", { class: "tasks-footnote" }, "报酬由任务终端提供 · 接取后自动托管", -1))
    ]));
  }
}), ms = ys, fs = { class: "tasks-page" }, gs = {
  class: "tasks-filter",
  "aria-label": "记录来源"
}, $s = ["aria-pressed", "onClick"], ps = {
  key: 0,
  class: "tasks-empty"
}, hs = { class: "tasks-empty-mark" }, ws = {
  key: 1,
  class: "tasks-record-list"
}, Cs = ["disabled"], Is = /* @__PURE__ */ B({
  __name: "TasksHistory",
  props: {
    history: {},
    loading: { type: Boolean },
    source: {}
  },
  emits: [
    "detail",
    "loadMore",
    "filter"
  ],
  setup(t) {
    const o = t, s = R(() => o.history.items.filter((a) => o.source === "all" || a.source === o.source));
    return (a, m) => (n(), d("section", fs, [
      m[2] || (m[2] = e("header", { class: "tasks-page-heading" }, [e("span", { class: "tasks-eyebrow" }, "每份委托，都有它的结局"), e("h2", null, "故事的回执。")], -1)),
      e("div", gs, [(n(), d(C, null, E([
        {
          id: "all",
          label: "全部"
        },
        {
          id: "received",
          label: "我接的"
        },
        {
          id: "published",
          label: "我发布的"
        }
      ], ($) => e("button", {
        key: $.id,
        type: "button",
        "aria-pressed": t.source === $.id,
        onClick: (r) => a.$emit("filter", $.id)
      }, u($.label), 9, $s)), 64))]),
      s.value.length ? (n(), d("div", ws, [(n(!0), d(C, null, E(s.value, ($) => (n(), A(ae, {
        key: $.taskId,
        task: $,
        onOpen: (r) => a.$emit("detail", $.taskId)
      }, null, 8, ["task", "onOpen"]))), 128))])) : (n(), d("div", ps, [
        e("span", hs, [c(y, { name: "archive" })]),
        e("h3", null, u(t.history.hasMore ? "当前已加载的记录中没有匹配项" : "这里还没有留下记录"), 1),
        m[1] || (m[1] = e("p", null, "已完成、未完成和撤回的委托都会保留。", -1))
      ])),
      t.history.hasMore ? (n(), d("button", {
        key: 2,
        type: "button",
        class: "tasks-load-more tasks-secondary-button",
        disabled: t.loading,
        onClick: m[0] || (m[0] = ($) => a.$emit("loadMore"))
      }, u(t.loading ? "正在加载…" : "加载更多记录"), 9, Cs)) : f("", !0)
    ]));
  }
}), Ts = Is, Rs = { class: "tasks-page" }, Bs = { class: "tasks-publish-invite" }, Ms = { class: "tasks-invite-mark" }, xs = ["disabled"], As = {
  key: 0,
  class: "tasks-hint"
}, Ss = { class: "tasks-section-heading" }, Ds = {
  key: 1,
  class: "tasks-inline-empty"
}, qs = {
  key: 2,
  class: "tasks-record-list"
}, Ls = /* @__PURE__ */ B({
  __name: "TasksPublished",
  props: {
    records: {},
    disabledReason: {}
  },
  emits: [
    "open",
    "publish",
    "history"
  ],
  setup(t) {
    return (o, s) => (n(), d("section", Rs, [
      e("div", Bs, [
        e("span", Ms, [c(y, { name: "send" })]),
        s[3] || (s[3] = e("span", { class: "tasks-eyebrow" }, "你来委托，让故事里的人行动", -1)),
        s[4] || (s[4] = e("h2", null, "有件事，想托付。", -1)),
        s[5] || (s[5] = e("p", null, "写下目标，设定报酬，再选择合适的执行者。", -1)),
        e("button", {
          type: "button",
          class: "tasks-primary-button",
          disabled: !!t.disabledReason,
          onClick: s[0] || (s[0] = (a) => o.$emit("publish"))
        }, [c(y, { name: "plus" }), s[2] || (s[2] = b("发布一份委托", -1))], 8, xs)
      ]),
      t.disabledReason ? (n(), d("p", As, u(t.disabledReason), 1)) : f("", !0),
      e("header", Ss, [e("h3", null, [s[6] || (s[6] = b("我的委托 ", -1)), e("small", null, u(t.records.length), 1)]), e("button", {
        type: "button",
        class: "tasks-text-button",
        onClick: s[1] || (s[1] = (a) => o.$emit("history"))
      }, [s[7] || (s[7] = b("已结束", -1)), c(y, { name: "next" })])]),
      t.records.length ? (n(), d("div", qs, [(n(!0), d(C, null, E(t.records, (a) => (n(), A(ae, {
        key: a.taskId,
        task: a,
        onOpen: (m) => o.$emit("open", a)
      }, null, 8, ["task", "onOpen"]))), 128))])) : (n(), d("div", Ds, "你发布的委托会留在这里，直到任务结束。"))
    ]));
  }
}), Ps = Ls, Ns = { class: "tasks-page tasks-settings-page" }, Vs = { class: "tasks-setting-card" }, Es = { class: "tasks-setting-row" }, js = { class: "tasks-setting-icon" }, Os = { class: "tasks-switch" }, Us = ["checked", "disabled"], Zs = { class: "tasks-setting-card" }, Hs = { class: "tasks-setting-row" }, Fs = { class: "tasks-setting-icon" }, Ks = ["disabled"], zs = {
  key: 0,
  class: "tasks-hint"
}, Qs = {
  key: 0,
  class: "tasks-maintenance-message",
  role: "status"
}, Gs = /* @__PURE__ */ B({
  __name: "TasksSettings",
  props: {
    autoMaintenance: { type: Boolean },
    settingsBusy: { type: Boolean },
    maintenanceBusy: { type: Boolean },
    maintenanceMessage: {},
    disabledReason: {}
  },
  emits: ["update", "maintain"],
  setup(t) {
    return (o, s) => (n(), d("section", Ns, [
      s[7] || (s[7] = e("header", { class: "tasks-page-heading" }, [e("span", { class: "tasks-eyebrow" }, "让进展跟上故事"), e("h2", null, "任务设置")], -1)),
      e("article", Vs, [e("div", Es, [
        e("span", js, [c(y, { name: "refresh" })]),
        s[3] || (s[3] = e("h3", null, "自动更新进展", -1)),
        e("label", Os, [e("input", {
          type: "checkbox",
          "aria-label": "自动更新任务进展",
          checked: t.autoMaintenance,
          disabled: t.settingsBusy,
          onChange: s[0] || (s[0] = (a) => o.$emit("update", a.target.checked))
        }, null, 40, Us), s[2] || (s[2] = e("span", null, null, -1))])
      ]), s[4] || (s[4] = e("p", null, "开启后，在你发送下一条消息时，根据上一轮已确认的剧情更新任务。此设置适用于所有普通聊天。", -1))]),
      e("article", Zs, [
        e("div", Hs, [e("span", Fs, [c(y, { name: "clock" })]), s[5] || (s[5] = e("h3", null, "现在检查一次", -1))]),
        s[6] || (s[6] = e("p", null, "根据当前可用的剧情，检查进行中的任务。检查会调用已配置的 Agent。", -1)),
        e("button", {
          type: "button",
          class: "tasks-secondary-button tasks-full-button",
          disabled: t.maintenanceBusy || !!t.disabledReason,
          onClick: s[1] || (s[1] = (a) => o.$emit("maintain"))
        }, [c(y, {
          name: "refresh",
          class: G({ "is-spinning": t.maintenanceBusy })
        }, null, 8, ["class"]), b(u(t.maintenanceBusy ? "正在更新…" : "更新任务进展"), 1)], 8, Ks),
        t.disabledReason ? (n(), d("p", zs, u(t.disabledReason), 1)) : f("", !0)
      ]),
      t.maintenanceMessage ? (n(), d("p", Qs, u(t.maintenanceMessage), 1)) : f("", !0)
    ]));
  }
}), Js = Gs;
function Ws(t, o, s, a) {
  if (a !== s.stateVersion || t.nextCursor !== s.cursor) return null;
  const m = new Set(t.items.map(($) => $.taskId));
  return {
    items: [...t.items, ...o.items.filter(($) => !m.has($.taskId))],
    nextCursor: o.nextCursor,
    hasMore: o.hasMore
  };
}
var Xs = { class: "tasks-page" }, Ys = { class: "tasks-contract-sheet" }, _s = { class: "tasks-contract-heading" }, ea = { class: "tasks-grade" }, ta = { class: "tasks-eyebrow" }, sa = { class: "tasks-contract-reward" }, aa = { class: "tasks-seal" }, la = { class: "tasks-facts" }, na = { key: 0 }, ia = { class: "is-risk" }, ra = { class: "tasks-tags" }, ua = { class: "tasks-action-dock" }, da = {
  key: 0,
  class: "tasks-hint"
}, oa = ["disabled"], va = {
  key: 1,
  class: "tasks-empty"
}, ka = /* @__PURE__ */ B({
  __name: "TaskListingDetail",
  props: {
    listing: {},
    busy: { type: Boolean },
    disabledReason: {}
  },
  emits: ["accept"],
  setup(t) {
    return (o, s) => (n(), d("section", Xs, [t.listing ? (n(), d(C, { key: 0 }, [
      e("article", Ys, [
        e("header", _s, [
          e("span", ea, u(t.listing.grade), 1),
          e("span", ta, "任务终端 · " + u(t.listing.posture), 1),
          e("h2", null, u(t.listing.title), 1),
          e("p", null, u(t.listing.hook), 1)
        ]),
        e("div", sa, [e("span", null, [s[2] || (s[2] = b("完成报酬", -1)), e("strong", null, [s[1] || (s[1] = e("small", null, "¤", -1)), b(" " + u(q(V)(t.listing.reward)), 1)])]), e("span", aa, [c(y, { name: "check" }), s[3] || (s[3] = b("终端出资", -1))])]),
        e("dl", la, [
          e("div", null, [s[4] || (s[4] = e("dt", null, "完成目标", -1)), e("dd", null, u(t.listing.objective), 1)]),
          t.listing.requirements ? (n(), d("div", na, [s[5] || (s[5] = e("dt", null, "执行约束", -1)), e("dd", null, u(t.listing.requirements), 1)])) : f("", !0),
          e("div", null, [s[6] || (s[6] = e("dt", null, "行动地点", -1)), e("dd", null, u(t.listing.location), 1)]),
          e("div", null, [s[7] || (s[7] = e("dt", null, "行动时机", -1)), e("dd", null, u(t.listing.timing), 1)]),
          e("div", ia, [s[8] || (s[8] = e("dt", null, "留意风险", -1)), e("dd", null, u(t.listing.risk), 1)])
        ]),
        e("div", ra, [(n(!0), d(C, null, E(t.listing.tags, (a) => (n(), d("span", { key: a }, u(a), 1))), 128))])
      ]),
      s[9] || (s[9] = e("p", { class: "tasks-hint" }, "接取后由你执行，报酬自动托管；无需另找 NPC 领取任务。", -1)),
      e("div", ua, [t.disabledReason ? (n(), d("p", da, u(t.disabledReason), 1)) : f("", !0), e("button", {
        type: "button",
        class: "tasks-primary-button",
        disabled: t.listing.accepted || t.busy || !!t.disabledReason,
        onClick: s[0] || (s[0] = (a) => o.$emit("accept"))
      }, [c(y, { name: t.listing.accepted ? "check" : "plus" }, null, 8, ["name"]), b(u(t.listing.accepted ? "已接取这份委托" : t.busy ? "正在接取…" : "接下这份委托"), 1)], 8, oa)])
    ], 64)) : (n(), d("div", va, [
      c(y, { name: "ticket" }),
      s[10] || (s[10] = e("h3", null, "这批委托已更新", -1)),
      s[11] || (s[11] = e("p", null, "返回大厅，查看最新的委托。", -1))
    ]))]));
  }
}), ba = ka, ca = {
  key: 0,
  class: "tasks-candidates"
}, ya = ["data-tone"], ma = { class: "tasks-candidate-description" }, fa = { class: "tasks-candidate-facts" }, ga = ["disabled", "onClick"], $a = {
  key: 1,
  class: "tasks-empty"
}, pa = { class: "tasks-empty-mark" }, ha = /* @__PURE__ */ B({
  __name: "TaskCandidateList",
  props: {
    task: {},
    busy: { type: Boolean },
    disabledReason: {}
  },
  emits: ["assign"],
  setup(t) {
    return (o, s) => t.task.candidates.length ? (n(), d("div", ca, [(n(!0), d(C, null, E(t.task.candidates, (a, m) => (n(), d("article", {
      key: a.candidateId,
      class: "tasks-candidate"
    }, [
      e("header", null, [e("span", {
        class: "tasks-candidate-avatar",
        "data-tone": m % 3,
        "aria-hidden": "true"
      }, u(Array.from(a.name)[0]), 9, ya), e("div", null, [e("h3", null, u(a.name), 1), s[0] || (s[0] = e("small", null, "应征者", -1))])]),
      e("p", ma, u(a.description), 1),
      e("blockquote", null, "“" + u(a.pitch) + "”", 1),
      e("dl", fa, [e("div", null, [s[1] || (s[1] = e("dt", null, "擅长", -1)), e("dd", null, u(a.capability), 1)]), e("div", null, [s[2] || (s[2] = e("dt", null, "留意", -1)), e("dd", null, u(a.risk), 1)])]),
      e("button", {
        type: "button",
        class: "tasks-secondary-button tasks-full-button",
        disabled: t.busy || !!t.disabledReason,
        onClick: ($) => o.$emit("assign", t.task, a.candidateId)
      }, [e("span", null, "委托给 " + u(a.name), 1), c(y, { name: "next" })], 8, ga)
    ]))), 128))])) : (n(), d("div", $a, [
      e("span", pa, [c(y, { name: "people" })]),
      s[3] || (s[3] = e("h3", null, "等一个合适的人", -1)),
      s[4] || (s[4] = e("p", null, "发起招募，看看谁愿意接下这份委托。", -1))
    ]));
  }
}), wa = ha, Ca = { class: "tasks-page" }, Ia = { class: "tasks-recruit-heading" }, Ta = { class: "tasks-reward" }, Ra = { class: "tasks-section-heading" }, Ba = ["disabled"], Ma = {
  key: 0,
  class: "tasks-hint",
  role: "status"
}, xa = {
  key: 1,
  class: "tasks-hint"
}, Aa = { class: "tasks-withdraw" }, Sa = ["disabled"], Da = {
  key: 1,
  class: "tasks-empty"
}, qa = {
  key: 1,
  class: "tasks-empty"
}, La = /* @__PURE__ */ B({
  __name: "TaskRecruitment",
  props: {
    task: {},
    busy: { type: Boolean },
    recruiting: { type: Boolean },
    disabledReason: {},
    generationDisabledReason: {}
  },
  emits: [
    "recruit",
    "assign",
    "cancel",
    "detail"
  ],
  setup(t) {
    return (o, s) => (n(), d("section", Ca, [t.task ? (n(), d(C, { key: 0 }, [e("header", Ia, [
      s[6] || (s[6] = e("span", { class: "tasks-eyebrow" }, "你的委托 · 报酬已托管", -1)),
      e("h2", null, u(t.task.title), 1),
      e("div", null, [e("strong", Ta, "¤ " + u(q(V)(t.task.reward)), 1), e("button", {
        type: "button",
        class: "tasks-text-button",
        onClick: s[0] || (s[0] = (a) => o.$emit("detail", t.task.taskId))
      }, [s[5] || (s[5] = b("查看委托内容", -1)), c(y, { name: "next" })])])
    ]), t.task.status === "recruiting" ? (n(), d(C, { key: 0 }, [
      e("header", Ra, [e("h3", null, [s[7] || (s[7] = b("选择执行者 ", -1)), e("small", null, u(t.task.candidates.length), 1)]), e("button", {
        type: "button",
        class: "tasks-text-button",
        disabled: t.busy || t.recruiting || !!t.generationDisabledReason,
        onClick: s[1] || (s[1] = (a) => o.$emit("recruit", t.task))
      }, [c(y, {
        name: "refresh",
        class: G({ "is-spinning": t.recruiting })
      }, null, 8, ["class"]), b(u(t.recruiting ? "招募中…" : t.task.candidates.length ? "重新招募" : "开始招募"), 1)], 8, Ba)]),
      t.recruiting ? (n(), d("p", Ma, "正在寻找愿意接下委托的人。你可以离开页面，招募会在后台继续。")) : f("", !0),
      t.disabledReason || t.generationDisabledReason ? (n(), d("p", xa, u(t.disabledReason || t.generationDisabledReason), 1)) : f("", !0),
      c(wa, {
        task: t.task,
        busy: t.busy || t.recruiting,
        "disabled-reason": t.disabledReason,
        onAssign: s[2] || (s[2] = (a, m) => o.$emit("assign", a, m))
      }, null, 8, [
        "task",
        "busy",
        "disabled-reason"
      ]),
      e("div", Aa, [s[8] || (s[8] = e("p", null, "暂时不需要这份委托了？", -1)), e("button", {
        type: "button",
        class: "tasks-text-button is-danger",
        disabled: t.busy || !!t.disabledReason,
        onClick: s[3] || (s[3] = (a) => o.$emit("cancel", t.task))
      }, "撤回委托并退回报酬", 8, Sa)])
    ], 64)) : (n(), d("div", Da, [
      c(y, { name: "check" }),
      e("h3", null, u(t.task.status === "active" ? "执行者已接下委托" : "这份委托已结束"), 1),
      e("button", {
        type: "button",
        class: "tasks-primary-button",
        onClick: s[4] || (s[4] = (a) => o.$emit("detail", t.task.taskId))
      }, "查看任务进展")
    ]))], 64)) : (n(), d("div", qa, [...s[9] || (s[9] = [e("h3", null, "委托状态已更新", -1), e("p", null, "请返回“我发布”查看最新进展或已结束记录。", -1)])]))]));
  }
}), Pa = La, Na = ["aria-label"], Va = { class: "tasks-dialog-mark" }, Ea = { id: "tasks-confirm-title" }, ja = { class: "tasks-dialog-copy" }, Oa = {
  key: 0,
  class: "tasks-dialog-error",
  role: "alert"
}, Ua = {
  key: 1,
  class: "tasks-hint"
}, Za = ["disabled"], Ha = ["disabled"], Fa = /* @__PURE__ */ B({
  __name: "TaskConfirmDialog",
  props: {
    title: {},
    confirmLabel: {},
    busy: { type: Boolean },
    disabledReason: {},
    error: {}
  },
  emits: ["close", "confirm"],
  setup(t, { emit: o }) {
    const s = o, a = h(null);
    me(() => a.value?.showModal());
    function m($) {
      if ($.stopPropagation(), $.key !== "Tab") return;
      const r = Array.from(a.value?.querySelectorAll("button:not(:disabled)") ?? []), v = r[0], j = r.at(-1);
      if (!v) {
        $.preventDefault();
        return;
      }
      $.shiftKey && document.activeElement === v ? ($.preventDefault(), j?.focus()) : !$.shiftKey && document.activeElement === j && ($.preventDefault(), v.focus());
    }
    return ($, r) => (n(), d("dialog", {
      ref_key: "dialog",
      ref: a,
      class: "tasks-dialog",
      "aria-label": t.title,
      onCancel: r[2] || (r[2] = ye((v) => !t.busy && s("close"), ["prevent"])),
      onKeydown: m
    }, [
      e("span", Va, [c(y, { name: "ticket" })]),
      e("h2", Ea, u(t.title), 1),
      e("div", ja, [He($.$slots, "default")]),
      t.error ? (n(), d("p", Oa, u(t.error), 1)) : f("", !0),
      t.disabledReason && !t.busy ? (n(), d("p", Ua, u(t.disabledReason), 1)) : f("", !0),
      e("footer", null, [e("button", {
        type: "button",
        class: "tasks-secondary-button",
        disabled: t.busy,
        autofocus: "",
        onClick: r[0] || (r[0] = (v) => s("close"))
      }, "返回", 8, Za), e("button", {
        type: "button",
        class: "tasks-primary-button",
        disabled: t.busy || !!t.disabledReason,
        onClick: r[1] || (r[1] = (v) => s("confirm"))
      }, u(t.busy ? "正在保存…" : t.confirmLabel), 9, Ha)])
    ], 40, Na));
  }
}), Ka = Fa, za = { class: "tasks-app-header" }, Qa = {
  key: 1,
  class: "tasks-brand-mark",
  "aria-hidden": "true"
}, Ga = { class: "tasks-balance" }, Ja = {
  class: "tasks-notices",
  "aria-live": "polite"
}, Wa = ["disabled"], Xa = ["disabled"], Ya = {
  key: 1,
  class: "tasks-notice",
  role: "status"
}, _a = {
  key: 0,
  class: "tasks-receive-tabs",
  "aria-label": "接任务页面"
}, el = ["aria-pressed"], tl = ["aria-pressed"], sl = { key: 0 }, al = {
  key: 1,
  class: "tasks-nav",
  "aria-label": "任务主导航"
}, ll = ["aria-current"], nl = ["aria-current"], il = { key: 0 }, rl = ["aria-current"], ul = { class: "tasks-confirm-name" }, dl = { class: "tasks-confirm-amount" }, ol = { class: "tasks-confirm-name" }, vl = { class: "tasks-confirm-amount" }, kl = { class: "tasks-confirm-name" }, bl = 35e3, cl = /* @__PURE__ */ B({
  __name: "TasksApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(t) {
    const o = t;
    function s() {
      return {
        chatIdentity: "",
        status: "blocked",
        message: "任务状态未能载入。",
        writeState: "ready",
        settings: { autoMaintenance: !1 },
        playerBalance: 0,
        generationActive: !1,
        generation: {
          state: "idle",
          kind: null,
          taskId: null,
          message: ""
        },
        board: null,
        active: [],
        recruiting: [],
        history: {
          items: [],
          nextCursor: null,
          hasMore: !1
        },
        maintenance: {
          state: "idle",
          lastOutcome: "none"
        }
      };
    }
    function a(l) {
      return l && typeof l == "object" ? structuredClone(ce(l)) : s();
    }
    function m(l) {
      return l !== null && typeof l == "object" && !Array.isArray(l);
    }
    function $(l) {
      return m(l) ? l.result : null;
    }
    const r = h(a(o.initialState)), v = h("board"), j = h("board"), J = h(null), g = h(null), U = h(null), le = h(""), _ = h("all"), ee = h(null), ne = R(() => We(r.value)), te = R(() => ne.value.received), ie = R(() => ne.value.published), ge = R(() => [...ie.value, ...r.value.history.items].find((l) => l.taskId === le.value) ?? null), $e = R(() => r.value.board?.boardId === U.value?.boardId ? r.value.board?.listings.find((l) => l.listingId === U.value?.listingId) ?? null : null), Z = R(() => [
      "board",
      "active",
      "published",
      "history"
    ].includes(v.value)), pe = R(() => ({
      board: "任务",
      active: "任务",
      published: "任务",
      history: "任务",
      settings: "任务设置",
      publish: "发布委托",
      detail: "委托详情",
      listing: "委托详情",
      recruit: "招募执行者"
    })[v.value]);
    let H = 0;
    const re = R(() => r.value.generation.state === "running" && r.value.generation.kind === "board"), ue = R(() => r.value.generation.state === "running" && r.value.generation.kind === "candidates" ? r.value.generation.taskId ?? "" : ""), M = h(!1), W = h(!1), P = h(!1), se = h(!1), X = h(!1), p = h(""), Y = h("");
    let I = 0, x = !1, de = () => {
    };
    const oe = R(() => r.value.status === "unconfirmed"), L = R(() => M.value ? "正在处理上一项任务操作" : r.value.status === "loading" ? "任务数据正在准备" : r.value.status === "saving" ? "任务与资金正在保存" : r.value.status === "unconfirmed" ? "请先核实上一次保存结果" : r.value.status === "conflict" ? "请先采用服务端数据" : r.value.status === "blocked" ? r.value.message || "任务暂时不可用" : r.value.generationActive ? "正在生成内容，请稍后" : ""), F = R(() => L.value || (r.value.maintenance.state === "running" ? "正在更新任务" : "")), he = R(() => {
      const l = r.value.maintenance.lastOutcome;
      return l === "updated" ? "任务已更新。" : l === "unchanged" ? "当前任务无需更新。" : l === "partial" ? "部分任务状态已保存。" : l === "failed" ? "任务更新失败，请稍后重试。" : l === "cancelled" ? "本次任务更新已取消。" : l === "no-work" ? "当前没有需要更新的任务进展。" : "";
    });
    function ve(l) {
      if (!l || typeof l.chatIdentity != "string") return;
      r.value = structuredClone(l), p.value = "";
      const i = J.value?.task;
      if (v.value === "detail" && i) {
        const k = [
          ...l.active,
          ...l.recruiting,
          ...l.history.items
        ].find((T) => T.taskId === i.taskId);
        k && k.eventId !== i.eventId && Q(k.taskId, !0);
      }
    }
    function we(l) {
      if (!m(l)) return null;
      const i = m(l.state) ? l.state : l;
      return typeof i.chatIdentity == "string" ? i : null;
    }
    function S(l) {
      const i = l instanceof Error ? l.message : String(l);
      return i === "tasks_insufficient_funds" ? "小白币余额不足，任务没有发布。" : i === "tasks_state_changed" || i === "tasks_listing_already_accepted" ? "任务状态已经变化，请按最新状态重试。" : i === "tasks_terminal" ? "该任务已经结束，不能再次操作。" : i === "tasks_publish_invalid" || i === "tasks_request_invalid" ? "任务内容不完整或超出允许范围。" : i === "tasks_write_blocked" || i === "tasks_generation_active" ? "当前有生成或保存正在进行，请稍后重试。" : i === "tasks_chat_changed" ? "聊天已经切换，请重新打开任务。" : i === "host_request_timeout" ? "操作响应超时，结果可能稍后返回，请勿立即重复。" : "任务操作未完成，请稍后重试。";
    }
    async function D(l, i = {}, k = bl) {
      return $(await o.bridge.request(l, {
        chatIdentity: r.value.chatIdentity,
        ...i
      }, k));
    }
    function N(l, i) {
      if (I !== i) return;
      const k = we(l);
      k?.chatIdentity === r.value.chatIdentity && ve(k);
    }
    function O(l) {
      Y.value = l, p.value = "";
    }
    async function Ce() {
      if (re.value || F.value) return;
      p.value = "";
      const l = I;
      try {
        const i = await D("tasks/refresh");
        if (!x) return;
        N(i, l);
      } catch (i) {
        x && (p.value = S(i));
      }
    }
    async function Ie(l, i) {
      if (L.value) return;
      M.value = !0;
      const k = I;
      try {
        N(await D("tasks/board/accept", {
          boardId: l,
          listingId: i
        }), k), O("任务已接取，报酬已进入托管。"), x && v.value === "listing" && w("active");
      } catch (T) {
        p.value = S(T);
      } finally {
        M.value = !1;
      }
    }
    async function Te(l) {
      if (ue.value || F.value) return;
      p.value = "";
      const i = I;
      try {
        const k = await D("tasks/candidates/refresh", {
          taskId: l.taskId,
          expectedTaskRevision: l.taskRevision,
          expectedEventId: l.eventId
        });
        if (!x) return;
        N(k, i);
      } catch (k) {
        x && (p.value = S(k));
      }
    }
    async function Re(l, i) {
      if (L.value) return;
      M.value = !0;
      const k = I;
      try {
        N(await D("tasks/candidates/assign", {
          taskId: l.taskId,
          expectedTaskRevision: l.taskRevision,
          expectedEventId: l.eventId,
          candidateId: i
        }), k), g.value = null, O("执行者已确认，任务进入进行中。"), x && w("published");
      } catch (T) {
        p.value = S(T);
      } finally {
        M.value = !1;
      }
    }
    async function Be(l) {
      if (L.value) return;
      M.value = !0;
      const i = I;
      try {
        N(await D("tasks/cancel", {
          taskId: l.taskId,
          expectedTaskRevision: l.taskRevision,
          expectedEventId: l.eventId
        }), i), g.value = null, O("任务已撤回，托管报酬已退回钱包。"), x && w("published");
      } catch (k) {
        p.value = S(k);
      } finally {
        M.value = !1;
      }
    }
    function Me(l) {
      L.value || (p.value = "", g.value = {
        kind: "publish",
        form: structuredClone(l)
      });
    }
    async function xe() {
      const l = g.value?.kind === "publish" ? g.value.form : null;
      if (!l || L.value) return;
      M.value = !0;
      const i = I;
      try {
        N(await D("tasks/publish", { form: ce(l) }), i), g.value = null, w("published"), O("任务已发布，报酬已锁入托管。");
      } catch (k) {
        p.value = S(k);
      } finally {
        M.value = !1;
      }
    }
    async function Ae(l) {
      if (W.value) return;
      W.value = !0;
      const i = I;
      try {
        N(await D("tasks/settings/update", { autoMaintenance: l }), i), O(l ? "已开启任务进展自动更新。" : "已关闭任务进展自动更新。");
      } catch (k) {
        p.value = S(k);
      } finally {
        W.value = !1;
      }
    }
    async function Se() {
      if (r.value.maintenance.state === "running" || F.value) return;
      const l = I;
      try {
        N(await D("tasks/maintenance/run"), l);
      } catch (i) {
        p.value = S(i);
      }
    }
    async function Q(l, i = !1) {
      i || ((Z.value || v.value === "recruit") && (j.value = v.value), v.value = "detail", ee.value?.scrollTo(0, 0), J.value = null, se.value = !0);
      const k = ++H;
      try {
        const T = await D("tasks/detail/read", { taskId: l });
        if (!x || k !== H) return;
        m(T) && m(T.task) && Array.isArray(T.timeline) && (J.value = structuredClone(T));
      } catch (T) {
        x && k === H && (p.value = S(T));
      } finally {
        x && k === H && (se.value = !1);
      }
    }
    async function De() {
      const l = r.value.history.nextCursor;
      if (!l || X.value) return;
      X.value = !0;
      const i = {
        cursor: l,
        stateVersion: I
      };
      try {
        const k = await D("tasks/history/load-more", { cursor: l });
        if (x && m(k) && Array.isArray(k.items)) {
          const T = k, be = Ws(r.value.history, T, i, I);
          be && (r.value.history = be);
        }
      } catch (k) {
        p.value = S(k);
      } finally {
        X.value = !1;
      }
    }
    async function qe() {
      if (P.value) return;
      P.value = !0;
      const l = I;
      try {
        N(await D("tasks/save/confirm"), l), O("保存结果已重新核实。");
      } catch (i) {
        p.value = S(i);
      } finally {
        P.value = !1;
      }
    }
    async function Le() {
      if (P.value) return;
      P.value = !0;
      const l = I;
      try {
        N(await D("tasks/save/adopt-server"), l), O("已采用服务端数据。");
      } catch (i) {
        p.value = S(i);
      } finally {
        P.value = !1;
      }
    }
    function w(l) {
      l === "settings" && Z.value && (j.value = v.value), H += 1, v.value = l, ee.value?.scrollTo(0, 0);
    }
    function ke() {
      w(v.value === "detail" || v.value === "settings" ? j.value : v.value === "listing" ? "board" : "published");
    }
    function Pe(l, i) {
      U.value = {
        boardId: l,
        listingId: i
      }, w("listing");
    }
    function Ne(l) {
      l.status === "recruiting" ? (le.value = l.taskId, w("recruit")) : Q(l.taskId);
    }
    function Ve() {
      _.value = "published", w("history");
    }
    function Ee(l) {
      p.value = "", g.value = {
        kind: "cancel",
        task: l
      };
    }
    function je(l, i) {
      p.value = "", g.value = {
        kind: "assign",
        task: l,
        candidateId: i
      };
    }
    function Oe() {
      const l = g.value;
      l && (l.kind === "publish" ? xe() : l.kind === "cancel" ? Be(l.task) : Re(l.task, l.candidateId));
    }
    function Ue(l) {
      l.key === "Escape" && !Z.value && (l.stopPropagation(), l.preventDefault(), ke());
    }
    return me(() => {
      x = !0, de = o.bridge.subscribe((l) => {
        if (l.type === "tasks/state") {
          const i = l.payload?.state;
          i && (I += 1, ve(i));
        }
        l.type === "tasks/error" && (p.value = "任务状态暂时无法读取，请重新打开。");
      }), o.bridge.post("tasks/activate", { chatIdentity: r.value.chatIdentity });
    }), Ke(() => {
      x = !1, H += 1, de(), g.value = null;
    }), (l, i) => (n(), d("main", {
      class: "tasks-app",
      onKeydown: Ue
    }, [
      e("header", za, [
        Z.value ? (n(), d("span", Qa, [c(y, { name: "ticket" })])) : (n(), d("button", {
          key: 0,
          type: "button",
          class: "tasks-icon-button",
          "aria-label": "返回上一页",
          onClick: ke
        }, [c(y, { name: "back" })])),
        e("h1", null, u(pe.value), 1),
        e("div", Ga, [i[12] || (i[12] = e("small", null, "可用余额", -1)), e("strong", null, "¤ " + u(q(V)(r.value.playerBalance)), 1)]),
        Z.value ? (n(), d("button", {
          key: 2,
          type: "button",
          class: "tasks-icon-button",
          "aria-label": "任务设置",
          onClick: i[0] || (i[0] = (k) => w("settings"))
        }, [c(y, { name: "settings" })])) : f("", !0)
      ]),
      e("div", Ja, [r.value.message || p.value && !g.value || Y.value ? (n(), d("aside", {
        key: 0,
        class: G(["tasks-notice", {
          "is-error": !!p.value || r.value.status === "conflict" || r.value.status === "blocked",
          "is-warning": oe.value
        }]),
        role: "status"
      }, [e("div", null, [e("p", null, u((g.value ? "" : p.value) || r.value.message || Y.value), 1), oe.value ? (n(), d("button", {
        key: 0,
        type: "button",
        disabled: P.value,
        onClick: qe
      }, u(P.value ? "正在核实…" : "核实保存结果"), 9, Wa)) : r.value.status === "conflict" ? (n(), d("button", {
        key: 1,
        type: "button",
        disabled: P.value,
        onClick: Le
      }, u(P.value ? "正在采用…" : "采用服务端数据"), 9, Xa)) : f("", !0)]), r.value.message ? f("", !0) : (n(), d("button", {
        key: 0,
        type: "button",
        class: "tasks-icon-button",
        "aria-label": "关闭提示",
        onClick: i[1] || (i[1] = (k) => {
          p.value = "", Y.value = "";
        })
      }, [c(y, { name: "close" })]))], 2)) : f("", !0), r.value.generation.message ? (n(), d("aside", Ya, [e("p", null, u(r.value.generation.message), 1)])) : f("", !0)]),
      v.value === "board" || v.value === "active" ? (n(), d("nav", _a, [e("button", {
        type: "button",
        "aria-pressed": v.value === "board",
        onClick: i[2] || (i[2] = (k) => w("board"))
      }, "发现委托", 8, el), e("button", {
        type: "button",
        "aria-pressed": v.value === "active",
        onClick: i[3] || (i[3] = (k) => w("active"))
      }, [i[13] || (i[13] = b("我接的", -1)), te.value.length ? (n(), d("span", sl, u(te.value.length), 1)) : f("", !0)], 8, tl)])) : f("", !0),
      e("div", {
        ref_key: "content",
        ref: ee,
        class: "tasks-content"
      }, [v.value === "board" ? (n(), A(ms, {
        key: 0,
        board: r.value.board,
        busy: re.value,
        "disabled-reason": F.value,
        onRefresh: Ce,
        onDetail: Pe
      }, null, 8, [
        "board",
        "busy",
        "disabled-reason"
      ])) : v.value === "active" ? (n(), A(Ft, {
        key: 1,
        records: te.value,
        onDetail: Q,
        onDiscover: i[4] || (i[4] = (k) => w("board"))
      }, null, 8, ["records"])) : v.value === "published" ? (n(), A(Ps, {
        key: 2,
        records: ie.value,
        "disabled-reason": L.value,
        onOpen: Ne,
        onPublish: i[5] || (i[5] = (k) => w("publish")),
        onHistory: Ve
      }, null, 8, ["records", "disabled-reason"])) : v.value === "history" ? (n(), A(Ts, {
        key: 3,
        history: r.value.history,
        loading: X.value,
        source: _.value,
        onFilter: i[6] || (i[6] = (k) => _.value = k),
        onDetail: Q,
        onLoadMore: De
      }, null, 8, [
        "history",
        "loading",
        "source"
      ])) : v.value === "settings" ? (n(), A(Js, {
        key: 4,
        "auto-maintenance": r.value.settings.autoMaintenance,
        "settings-busy": W.value,
        "maintenance-busy": r.value.maintenance.state === "running",
        "maintenance-message": he.value,
        "disabled-reason": F.value,
        onUpdate: Ae,
        onMaintain: Se
      }, null, 8, [
        "auto-maintenance",
        "settings-busy",
        "maintenance-busy",
        "maintenance-message",
        "disabled-reason"
      ])) : v.value === "publish" ? (n(), A(St, {
        key: 5,
        balance: r.value.playerBalance,
        busy: M.value,
        "disabled-reason": L.value,
        onSubmit: Me
      }, null, 8, [
        "balance",
        "busy",
        "disabled-reason"
      ])) : v.value === "listing" ? (n(), A(ba, {
        key: 6,
        listing: $e.value,
        busy: M.value,
        "disabled-reason": L.value,
        onAccept: i[7] || (i[7] = (k) => U.value && Ie(U.value.boardId, U.value.listingId))
      }, null, 8, [
        "listing",
        "busy",
        "disabled-reason"
      ])) : v.value === "recruit" ? (n(), A(Pa, {
        key: 7,
        task: ge.value,
        busy: M.value,
        recruiting: !!ue.value,
        "disabled-reason": L.value,
        "generation-disabled-reason": F.value,
        onRecruit: Te,
        onAssign: je,
        onCancel: Ee,
        onDetail: Q
      }, null, 8, [
        "task",
        "busy",
        "recruiting",
        "disabled-reason",
        "generation-disabled-reason"
      ])) : (n(), A(yt, {
        key: 8,
        detail: J.value,
        loading: se.value
      }, null, 8, ["detail", "loading"]))], 512),
      Z.value ? (n(), d("nav", al, [
        e("button", {
          type: "button",
          "aria-label": "接任务",
          "aria-current": v.value === "board" || v.value === "active" ? "page" : void 0,
          onClick: i[8] || (i[8] = (k) => w("board"))
        }, [e("span", null, [c(y, { name: "compass" })]), i[14] || (i[14] = b("接任务", -1))], 8, ll),
        e("button", {
          type: "button",
          "aria-label": "我发布",
          "aria-current": v.value === "published" ? "page" : void 0,
          onClick: i[9] || (i[9] = (k) => w("published"))
        }, [e("span", null, [c(y, { name: "send" }), r.value.recruiting.length ? (n(), d("i", il)) : f("", !0)]), i[15] || (i[15] = b("我发布", -1))], 8, nl),
        e("button", {
          type: "button",
          "aria-label": "记录",
          "aria-current": v.value === "history" ? "page" : void 0,
          onClick: i[10] || (i[10] = (k) => w("history"))
        }, [e("span", null, [c(y, { name: "archive" })]), i[16] || (i[16] = b("记录", -1))], 8, rl)
      ])) : f("", !0),
      g.value ? (n(), A(Ka, {
        key: 2,
        title: g.value.kind === "publish" ? "让这份委托出发？" : g.value.kind === "cancel" ? "撤回这份委托？" : "把委托交给这位执行者？",
        "confirm-label": g.value.kind === "publish" ? "托管并发布" : g.value.kind === "cancel" ? "撤回并退款" : "确认委托",
        busy: M.value,
        "disabled-reason": L.value,
        error: p.value,
        onClose: i[11] || (i[11] = (k) => {
          g.value = null, p.value = "";
        }),
        onConfirm: Oe
      }, {
        default: Fe(() => [g.value.kind === "publish" ? (n(), d(C, { key: 0 }, [
          e("p", ul, u(g.value.form.title), 1),
          e("strong", dl, "¤ " + u(q(V)(g.value.form.reward)), 1),
          i[17] || (i[17] = e("p", null, "报酬将从钱包托管。发布后可招募执行者；选人之前，你可以撤回并全额退回报酬。", -1))
        ], 64)) : g.value.kind === "cancel" ? (n(), d(C, { key: 1 }, [
          e("p", ol, u(g.value.task.title), 1),
          e("strong", vl, "¤ " + u(q(V)(g.value.task.reward)), 1),
          i[18] || (i[18] = e("p", null, "撤回后，托管报酬将退回你的钱包。", -1))
        ], 64)) : (n(), d(C, { key: 2 }, [e("p", kl, u(g.value.task.candidates.find((k) => k.candidateId === (g.value?.kind === "assign" ? g.value.candidateId : ""))?.name), 1), e("p", null, "确认后开始执行“" + u(g.value.task.title) + "”。执行者确定后，这份委托不能再撤回。", 1)], 64))]),
        _: 1
      }, 8, [
        "title",
        "confirm-label",
        "busy",
        "disabled-reason",
        "error"
      ])) : f("", !0)
    ], 32));
  }
}), ml = cl;
export {
  ml as default
};
