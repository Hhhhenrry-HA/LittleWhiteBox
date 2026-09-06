/* eslint-disable */
import { E as Oe, F as h, L as ce, M as z, P as Fe, R as L, S as ye, T as N, V as u, _ as M, b as Ke, c as C, d as D, f as g, g as c, h as b, i as Q, j as ze, l as B, p as d, s as me, u as e, w as i, z as J } from "./xiaobai-os-runtime-dom.esm-bundler-DmE9neiz.js";
var Qe = {
  class: "tasks-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.7",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, Ge = ["d"], Je = /* @__PURE__ */ M({
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
    return (a, s) => (i(), d("svg", Qe, [e("path", { d: o[t.name] }, null, 8, Ge)]));
  }
}), y = Je, fe = {
  recruiting: "招募中",
  active: "进行中",
  completed: "已完成",
  failed: "未完成",
  cancelled: "已撤回"
};
function E(t) {
  return t.toLocaleString("zh-CN");
}
function We(t) {
  return t.source === "received" ? "任务终端" : `${t.issuer.displayName}（你）`;
}
function Xe(t) {
  return {
    received: t.active.filter((o) => o.source === "received"),
    published: [...t.recruiting, ...t.active.filter((o) => o.source === "published")].sort((o, a) => a.updatedAt - o.updatedAt || a.taskId.localeCompare(o.taskId))
  };
}
var Ye = { class: "tasks-page tasks-detail-page" }, _e = {
  key: 0,
  class: "tasks-empty",
  role: "status"
}, et = { class: "tasks-contract-sheet" }, tt = { class: "tasks-contract-heading" }, at = ["data-status"], st = { key: 0 }, lt = { class: "tasks-contract-reward" }, nt = { class: "tasks-seal" }, it = { class: "tasks-party-line" }, rt = { class: "tasks-facts" }, ut = { key: 0 }, dt = { key: 1 }, ot = {
  key: 2,
  class: "is-risk"
}, vt = { class: "tasks-progress-summary" }, kt = { class: "tasks-eyebrow" }, bt = { class: "tasks-timeline" }, ct = {
  key: 2,
  class: "tasks-empty"
}, yt = /* @__PURE__ */ M({
  __name: "TaskDetail",
  props: {
    detail: {},
    loading: { type: Boolean }
  },
  setup(t) {
    function o(a) {
      return new Date(a).toLocaleString("zh-CN", {
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: !1
      });
    }
    return (a, s) => (i(), d("section", Ye, [t.loading ? (i(), d("div", _e, [c(y, {
      name: "refresh",
      class: "is-spinning"
    }), s[0] || (s[0] = e("h3", null, "正在展开这份委托…", -1))])) : t.detail ? (i(), d(C, { key: 1 }, [
      e("article", et, [
        e("header", tt, [
          e("span", {
            class: "tasks-status",
            "data-status": t.detail.task.status
          }, [s[1] || (s[1] = e("i", null, null, -1)), b(u(L(fe)[t.detail.task.status]), 1)], 8, at),
          e("h2", null, u(t.detail.task.title), 1),
          t.detail.task.hook ? (i(), d("p", st, u(t.detail.task.hook), 1)) : g("", !0)
        ]),
        e("div", lt, [e("span", null, [s[3] || (s[3] = b("委托报酬", -1)), e("strong", null, [s[2] || (s[2] = e("small", null, "¤", -1)), b(" " + u(L(E)(t.detail.task.reward)), 1)])]), e("span", nt, [c(y, { name: "ticket" }), b(u(t.detail.task.source === "received" ? "终端委托" : "我的委托"), 1)])]),
        e("div", it, [
          e("span", null, [s[4] || (s[4] = b("发布者", -1)), e("strong", null, u(L(We)(t.detail.task)), 1)]),
          c(y, { name: "next" }),
          e("span", null, [s[5] || (s[5] = b("执行者", -1)), e("strong", null, u(t.detail.task.assignee?.displayName || "等待选人"), 1)])
        ]),
        e("dl", rt, [
          e("div", null, [s[6] || (s[6] = e("dt", null, "完成目标", -1)), e("dd", null, u(t.detail.task.objective), 1)]),
          t.detail.task.requirements ? (i(), d("div", ut, [s[7] || (s[7] = e("dt", null, "执行约束", -1)), e("dd", null, u(t.detail.task.requirements), 1)])) : g("", !0),
          e("div", null, [s[8] || (s[8] = e("dt", null, "行动地点", -1)), e("dd", null, u(t.detail.task.location), 1)]),
          t.detail.task.timing ? (i(), d("div", dt, [s[9] || (s[9] = e("dt", null, "行动时机", -1)), e("dd", null, u(t.detail.task.timing), 1)])) : g("", !0),
          t.detail.task.risk ? (i(), d("div", ot, [s[10] || (s[10] = e("dt", null, "留意风险", -1)), e("dd", null, u(t.detail.task.risk), 1)])) : g("", !0)
        ])
      ]),
      e("section", vt, [e("span", kt, u(t.detail.task.resultSummary ? "最终结果" : "当前进展"), 1), e("p", null, u(t.detail.task.resultSummary || t.detail.task.progressSummary || "还没有已确认的进展，下一步在故事中发生。"), 1)]),
      e("section", bt, [s[12] || (s[12] = e("h3", null, "一路走来", -1)), e("ol", null, [(i(!0), d(C, null, N(t.detail.timeline, (m) => (i(), d("li", { key: m.eventId }, [s[11] || (s[11] = e("i", null, null, -1)), e("div", null, [e("small", null, u(o(m.createdAt)), 1), e("p", null, u(m.summary), 1)])]))), 128))])])
    ], 64)) : (i(), d("div", ct, [...s[13] || (s[13] = [e("h3", null, "这份委托暂时无法读取", -1), e("p", null, "请返回后重试。", -1)])]))]));
  }
}), mt = yt, ft = { class: "tasks-page tasks-publish-page" }, gt = ["disabled"], $t = { class: "tasks-form-group" }, pt = { class: "tasks-form-extra" }, ht = { class: "tasks-form-group" }, wt = { class: "tasks-reward-editor" }, Ct = { class: "tasks-amount-input" }, It = ["max"], Tt = { class: "tasks-reward-presets" }, Rt = [
  "aria-pressed",
  "disabled",
  "onClick"
], Bt = {
  key: 0,
  class: "tasks-error-text",
  role: "status"
}, Mt = { class: "tasks-hint" }, St = {
  key: 0,
  class: "tasks-hint"
}, xt = ["disabled"], At = /* @__PURE__ */ M({
  __name: "TaskPublishForm",
  props: {
    balance: {},
    busy: { type: Boolean },
    disabledReason: {}
  },
  emits: ["submit"],
  setup(t, { emit: o }) {
    const a = o, s = Fe({
      title: "",
      objective: "",
      requirements: "",
      location: "",
      risk: "",
      reward: 20
    });
    function m() {
      a("submit", {
        title: s.title,
        objective: s.objective,
        ...s.requirements.trim() ? { requirements: s.requirements } : {},
        location: s.location,
        risk: s.risk,
        reward: Number(s.reward)
      });
    }
    return (p, r) => (i(), d("section", ft, [r[17] || (r[17] = e("header", { class: "tasks-page-heading" }, [
      e("span", { class: "tasks-eyebrow" }, "一份清楚的托付"),
      e("h2", null, "你希望谁，做成什么？"),
      e("p", null, "发布后再招募、选择执行者。")
    ], -1)), e("form", {
      class: "tasks-publish-form",
      onSubmit: me(m, ["prevent"])
    }, [
      e("fieldset", { disabled: t.busy }, [
        r[15] || (r[15] = e("legend", { class: "tasks-sr-only" }, "委托内容", -1)),
        e("div", $t, [
          e("label", null, [r[6] || (r[6] = e("span", null, [b("给委托起个名字 "), e("b", null, "*")], -1)), z(e("input", {
            "onUpdate:modelValue": r[0] || (r[0] = (v) => s.title = v),
            required: "",
            maxlength: "120",
            autocomplete: "off",
            placeholder: "例如：找回遗落在钟楼的手札"
          }, null, 512), [[Q, s.title]])]),
          e("label", null, [r[7] || (r[7] = e("span", null, [b("怎样才算完成 "), e("b", null, "*")], -1)), z(e("textarea", {
            "onUpdate:modelValue": r[1] || (r[1] = (v) => s.objective = v),
            required: "",
            maxlength: "8000",
            rows: "4",
            placeholder: "写一个可以明确判定完成的目标"
          }, null, 512), [[Q, s.objective]])]),
          e("label", null, [r[8] || (r[8] = e("span", null, [b("去哪里行动 "), e("b", null, "*")], -1)), z(e("input", {
            "onUpdate:modelValue": r[2] || (r[2] = (v) => s.location = v),
            required: "",
            maxlength: "600",
            autocomplete: "off",
            placeholder: "目标行动实际发生的地点"
          }, null, 512), [[Q, s.location]])])
        ]),
        e("details", pt, [r[11] || (r[11] = e("summary", null, [b("补充约束与风险 "), e("span", null, "选填")], -1)), e("div", ht, [e("label", null, [r[9] || (r[9] = e("span", null, "执行约束", -1)), z(e("textarea", {
          "onUpdate:modelValue": r[3] || (r[3] = (v) => s.requirements = v),
          maxlength: "8000",
          rows: "3",
          placeholder: "对行动方式的要求，不增加第二个目标"
        }, null, 512), [[Q, s.requirements]])]), e("label", null, [r[10] || (r[10] = e("span", null, "已知风险", -1)), z(e("textarea", {
          "onUpdate:modelValue": r[4] || (r[4] = (v) => s.risk = v),
          maxlength: "2000",
          rows: "3",
          placeholder: "有哪些需要执行者提前知道的风险？"
        }, null, 512), [[Q, s.risk]])])])]),
        e("div", wt, [
          e("label", null, [r[13] || (r[13] = e("span", null, [b("为这份委托设定报酬 "), e("b", null, "*")], -1)), e("span", Ct, [r[12] || (r[12] = e("i", null, "¤", -1)), z(e("input", {
            "onUpdate:modelValue": r[5] || (r[5] = (v) => s.reward = v),
            "aria-label": "托管报酬",
            type: "number",
            required: "",
            min: "1",
            max: t.balance,
            step: "1"
          }, null, 8, It), [[
            Q,
            s.reward,
            void 0,
            { number: !0 }
          ]])])]),
          e("div", Tt, [(i(), d(C, null, N([
            20,
            50,
            100
          ], (v) => e("button", {
            key: v,
            type: "button",
            "aria-pressed": Number(s.reward) === v,
            disabled: v > t.balance,
            onClick: (j) => s.reward = v
          }, "¤ " + u(v), 9, Rt)), 64))]),
          e("p", null, [r[14] || (r[14] = b("可用余额 ", -1)), e("strong", null, "¤ " + u(L(E)(t.balance)), 1)]),
          Number(s.reward) > t.balance ? (i(), d("p", Bt, "报酬超出可用余额，请调整金额。")) : g("", !0)
        ])
      ], 8, gt),
      e("p", Mt, [c(y, { name: "ticket" }), r[16] || (r[16] = b("发布时托管报酬；招募期间可撤回退款，选定执行者后不可撤回。", -1))]),
      t.disabledReason ? (i(), d("p", St, u(t.disabledReason), 1)) : g("", !0),
      e("button", {
        type: "submit",
        class: "tasks-primary-button tasks-full-button",
        disabled: t.busy || !!t.disabledReason || Number(s.reward) > t.balance
      }, [b(u(t.busy ? "正在发布…" : "预览并发布"), 1), c(y, { name: "next" })], 8, xt)
    ], 32)]));
  }
}), Dt = At, qt = { class: "tasks-record-top" }, Lt = ["data-status"], Pt = { class: "tasks-reward" }, Vt = { class: "tasks-record-title" }, Et = { class: "tasks-record-summary" }, Nt = { class: "tasks-record-foot" }, jt = /* @__PURE__ */ M({
  __name: "TaskRecordCard",
  props: { task: {} },
  emits: ["open"],
  setup(t) {
    return (o, a) => (i(), d("button", {
      type: "button",
      class: "tasks-record",
      onClick: a[0] || (a[0] = (s) => o.$emit("open", t.task))
    }, [
      e("span", qt, [e("span", {
        class: "tasks-status",
        "data-status": t.task.status
      }, [a[1] || (a[1] = e("i", null, null, -1)), b(u(L(fe)[t.task.status]), 1)], 8, Lt), e("span", Pt, [a[2] || (a[2] = e("small", null, "¤", -1)), b(" " + u(L(E)(t.task.reward)), 1)])]),
      e("strong", Vt, u(t.task.title), 1),
      e("span", Et, u(t.task.resultSummary || t.task.progressSummary || (t.task.status === "recruiting" ? "委托已发布，等待你选择执行者。" : "任务已开始，等待新的进展。")), 1),
      e("span", Nt, [e("span", null, [c(y, { name: t.task.source === "received" ? "pin" : "people" }, null, 8, ["name"]), b(u(t.task.source === "received" ? t.task.location : t.task.assignee?.displayName || `${t.task.candidates.length} 位候选人`), 1)]), c(y, { name: "next" })])
    ]));
  }
}), se = jt, Ut = { class: "tasks-page" }, Zt = {
  key: 0,
  class: "tasks-empty"
}, Ht = { class: "tasks-empty-mark" }, Ot = {
  key: 1,
  class: "tasks-record-list"
}, Ft = /* @__PURE__ */ M({
  __name: "TasksActive",
  props: { records: {} },
  emits: ["detail", "discover"],
  setup(t) {
    return (o, a) => (i(), d("section", Ut, [a[3] || (a[3] = e("header", { class: "tasks-page-heading" }, [
      e("span", { class: "tasks-eyebrow" }, "由你执行"),
      e("h2", null, "每一步，都算数。"),
      e("p", null, "在故事中行动，在这里查看已确认的进展。")
    ], -1)), t.records.length ? (i(), d("div", Ot, [(i(!0), d(C, null, N(t.records, (s) => (i(), D(se, {
      key: s.taskId,
      task: s,
      onOpen: (m) => o.$emit("detail", s.taskId)
    }, null, 8, ["task", "onOpen"]))), 128))])) : (i(), d("div", Zt, [
      e("span", Ht, [c(y, { name: "compass" })]),
      a[1] || (a[1] = e("h3", null, "还没有进行中的委托", -1)),
      a[2] || (a[2] = e("p", null, "到大厅选一份委托，开启下一段经历。", -1)),
      e("button", {
        type: "button",
        class: "tasks-primary-button",
        onClick: a[0] || (a[0] = (s) => o.$emit("discover"))
      }, "去发现委托")
    ]))]));
  }
}), Kt = Ft, zt = { class: "tasks-page tasks-board-page" }, Qt = { class: "tasks-hero" }, Gt = {
  class: "tasks-hero-art",
  "aria-hidden": "true"
}, Jt = { class: "tasks-paper" }, Wt = { class: "tasks-section-heading" }, Xt = { key: 0 }, Yt = ["disabled"], _t = {
  key: 0,
  class: "tasks-hint",
  role: "status"
}, ea = {
  key: 1,
  class: "tasks-empty"
}, ta = { class: "tasks-empty-mark" }, aa = ["disabled"], sa = ["aria-busy"], la = ["onClick"], na = { class: "tasks-ticket-top" }, ia = ["data-grade"], ra = { class: "tasks-ticket-tags" }, ua = {
  key: 0,
  class: "tasks-accepted"
}, da = {
  key: 1,
  class: "tasks-ticket-posture"
}, oa = { class: "tasks-ticket-title" }, va = { class: "tasks-ticket-hook" }, ka = { class: "tasks-ticket-location" }, ba = { class: "tasks-ticket-foot" }, ca = { class: "tasks-reward" }, ya = { class: "tasks-ticket-open" }, ma = /* @__PURE__ */ M({
  __name: "TasksBoard",
  props: {
    board: {},
    busy: { type: Boolean },
    disabledReason: {}
  },
  emits: ["refresh", "detail"],
  setup(t) {
    return (o, a) => (i(), d("section", zt, [
      e("div", Qt, [a[6] || (a[6] = e("div", null, [
        e("span", { class: "tasks-eyebrow" }, "由任务终端发布"),
        e("h2", null, [
          b("下一段故事，"),
          e("br"),
          b("从这里开始。")
        ]),
        e("p", null, "接下一份委托，让行动有所回响。")
      ], -1)), e("div", Gt, [a[5] || (a[5] = e("div", { class: "tasks-paper is-back" }, null, -1)), e("div", Jt, [
        a[2] || (a[2] = e("i", null, null, -1)),
        a[3] || (a[3] = e("i", null, null, -1)),
        a[4] || (a[4] = e("i", null, null, -1)),
        e("span", null, [c(y, { name: "check" })])
      ])])]),
      e("header", Wt, [e("h3", null, [a[7] || (a[7] = b("发现委托 ", -1)), t.board ? (i(), d("small", Xt, u(t.board.listings.length), 1)) : g("", !0)]), e("button", {
        type: "button",
        class: "tasks-text-button",
        disabled: t.busy || !!t.disabledReason,
        onClick: a[0] || (a[0] = (s) => o.$emit("refresh"))
      }, [c(y, {
        name: "refresh",
        class: J({ "is-spinning": t.busy })
      }, null, 8, ["class"]), b(u(t.busy ? "正在寻找…" : t.board ? "换一批" : "获取委托"), 1)], 8, Yt)]),
      t.disabledReason ? (i(), d("p", _t, u(t.disabledReason), 1)) : g("", !0),
      !t.board || !t.board.listings.length ? (i(), d("div", ea, [
        e("span", ta, [c(y, { name: "compass" })]),
        e("h3", null, u(t.busy ? "正在寻找新的委托" : "你的下一份委托，在这里"), 1),
        e("p", null, u(t.busy ? "生成会在后台继续，你可以先去别处看看。" : "从当前故事中发现可以行动的机会。"), 1),
        t.busy ? g("", !0) : (i(), d("button", {
          key: 0,
          type: "button",
          class: "tasks-primary-button",
          disabled: !!t.disabledReason,
          onClick: a[1] || (a[1] = (s) => o.$emit("refresh"))
        }, "获取第一批委托", 8, aa))
      ])) : (i(), d("div", {
        key: 2,
        class: "tasks-board-list",
        "aria-busy": t.busy
      }, [(i(!0), d(C, null, N(t.board.listings, (s) => (i(), d("button", {
        key: s.listingId,
        type: "button",
        class: J(["tasks-ticket", { "is-accepted": s.accepted }]),
        onClick: (m) => o.$emit("detail", t.board.boardId, s.listingId)
      }, [
        e("span", na, [
          e("span", {
            class: "tasks-grade",
            "data-grade": s.grade
          }, u(s.grade), 9, ia),
          e("span", ra, u(s.tags.slice(0, 2).join(" · ")), 1),
          s.accepted ? (i(), d("span", ua, [c(y, { name: "check" }), a[8] || (a[8] = b("已接取", -1))])) : (i(), d("span", da, u(s.posture), 1))
        ]),
        e("strong", oa, u(s.title), 1),
        e("span", va, u(s.hook), 1),
        e("span", ka, [c(y, { name: "pin" }), b(u(s.location), 1)]),
        e("span", ba, [e("span", ca, [
          a[9] || (a[9] = e("small", null, "¤", -1)),
          b(" " + u(L(E)(s.reward)) + " ", 1),
          a[10] || (a[10] = e("em", null, "任务报酬", -1))
        ]), e("span", ya, [a[11] || (a[11] = b("查看委托", -1)), c(y, { name: "next" })])])
      ], 10, la))), 128))], 8, sa)),
      a[12] || (a[12] = e("p", { class: "tasks-footnote" }, "报酬由任务终端提供 · 接取后自动托管", -1))
    ]));
  }
}), fa = ma, ga = { class: "tasks-page" }, $a = {
  class: "tasks-filter",
  "aria-label": "记录来源"
}, pa = ["aria-pressed", "onClick"], ha = {
  key: 0,
  class: "tasks-empty"
}, wa = { class: "tasks-empty-mark" }, Ca = {
  key: 1,
  class: "tasks-record-list"
}, Ia = ["disabled"], Ta = /* @__PURE__ */ M({
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
    const o = t, a = B(() => o.history.items.filter((s) => o.source === "all" || s.source === o.source));
    return (s, m) => (i(), d("section", ga, [
      m[2] || (m[2] = e("header", { class: "tasks-page-heading" }, [e("span", { class: "tasks-eyebrow" }, "每份委托，都有它的结局"), e("h2", null, "故事的回执。")], -1)),
      e("div", $a, [(i(), d(C, null, N([
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
      ], (p) => e("button", {
        key: p.id,
        type: "button",
        "aria-pressed": t.source === p.id,
        onClick: (r) => s.$emit("filter", p.id)
      }, u(p.label), 9, pa)), 64))]),
      a.value.length ? (i(), d("div", Ca, [(i(!0), d(C, null, N(a.value, (p) => (i(), D(se, {
        key: p.taskId,
        task: p,
        onOpen: (r) => s.$emit("detail", p.taskId)
      }, null, 8, ["task", "onOpen"]))), 128))])) : (i(), d("div", ha, [
        e("span", wa, [c(y, { name: "archive" })]),
        e("h3", null, u(t.history.hasMore ? "当前已加载的记录中没有匹配项" : "这里还没有留下记录"), 1),
        m[1] || (m[1] = e("p", null, "已完成、未完成和撤回的委托都会保留。", -1))
      ])),
      t.history.hasMore ? (i(), d("button", {
        key: 2,
        type: "button",
        class: "tasks-load-more tasks-secondary-button",
        disabled: t.loading,
        onClick: m[0] || (m[0] = (p) => s.$emit("loadMore"))
      }, u(t.loading ? "正在加载…" : "加载更多记录"), 9, Ia)) : g("", !0)
    ]));
  }
}), Ra = Ta, Ba = { class: "tasks-page" }, Ma = { class: "tasks-publish-invite" }, Sa = { class: "tasks-invite-mark" }, xa = ["disabled"], Aa = {
  key: 0,
  class: "tasks-hint"
}, Da = { class: "tasks-section-heading" }, qa = {
  key: 1,
  class: "tasks-inline-empty"
}, La = {
  key: 2,
  class: "tasks-record-list"
}, Pa = /* @__PURE__ */ M({
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
    return (o, a) => (i(), d("section", Ba, [
      e("div", Ma, [
        e("span", Sa, [c(y, { name: "send" })]),
        a[3] || (a[3] = e("span", { class: "tasks-eyebrow" }, "你来委托，让故事里的人行动", -1)),
        a[4] || (a[4] = e("h2", null, "有件事，想托付。", -1)),
        a[5] || (a[5] = e("p", null, "写下目标，设定报酬，再选择合适的执行者。", -1)),
        e("button", {
          type: "button",
          class: "tasks-primary-button",
          disabled: !!t.disabledReason,
          onClick: a[0] || (a[0] = (s) => o.$emit("publish"))
        }, [c(y, { name: "plus" }), a[2] || (a[2] = b("发布一份委托", -1))], 8, xa)
      ]),
      t.disabledReason ? (i(), d("p", Aa, u(t.disabledReason), 1)) : g("", !0),
      e("header", Da, [e("h3", null, [a[6] || (a[6] = b("我的委托 ", -1)), e("small", null, u(t.records.length), 1)]), e("button", {
        type: "button",
        class: "tasks-text-button",
        onClick: a[1] || (a[1] = (s) => o.$emit("history"))
      }, [a[7] || (a[7] = b("已结束", -1)), c(y, { name: "next" })])]),
      t.records.length ? (i(), d("div", La, [(i(!0), d(C, null, N(t.records, (s) => (i(), D(se, {
        key: s.taskId,
        task: s,
        onOpen: (m) => o.$emit("open", s)
      }, null, 8, ["task", "onOpen"]))), 128))])) : (i(), d("div", qa, "你发布的委托会留在这里，直到任务结束。"))
    ]));
  }
}), Va = Pa, Ea = { class: "tasks-page tasks-settings-page" }, Na = { class: "tasks-setting-card" }, ja = { class: "tasks-setting-row" }, Ua = { class: "tasks-setting-icon" }, Za = { class: "tasks-switch" }, Ha = ["checked", "disabled"], Oa = { class: "tasks-setting-card" }, Fa = { class: "tasks-setting-row" }, Ka = { class: "tasks-setting-icon" }, za = ["disabled"], Qa = {
  key: 0,
  class: "tasks-hint"
}, Ga = {
  key: 0,
  class: "tasks-maintenance-message",
  role: "status"
}, Ja = /* @__PURE__ */ M({
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
    return (o, a) => (i(), d("section", Ea, [
      a[7] || (a[7] = e("header", { class: "tasks-page-heading" }, [e("span", { class: "tasks-eyebrow" }, "让进展跟上故事"), e("h2", null, "任务设置")], -1)),
      e("article", Na, [e("div", ja, [
        e("span", Ua, [c(y, { name: "refresh" })]),
        a[3] || (a[3] = e("h3", null, "自动更新进展", -1)),
        e("label", Za, [e("input", {
          type: "checkbox",
          "aria-label": "自动更新任务进展",
          checked: t.autoMaintenance,
          disabled: t.settingsBusy,
          onChange: a[0] || (a[0] = (s) => o.$emit("update", s.target.checked))
        }, null, 40, Ha), a[2] || (a[2] = e("span", null, null, -1))])
      ]), a[4] || (a[4] = e("p", null, "开启后，在你发送下一条消息时，根据上一轮已确认的剧情更新任务。此设置适用于所有普通聊天。", -1))]),
      e("article", Oa, [
        e("div", Fa, [e("span", Ka, [c(y, { name: "clock" })]), a[5] || (a[5] = e("h3", null, "现在检查一次", -1))]),
        a[6] || (a[6] = e("p", null, "根据当前可用的剧情，检查进行中的任务。检查会调用已配置的 Agent。", -1)),
        e("button", {
          type: "button",
          class: "tasks-secondary-button tasks-full-button",
          disabled: t.maintenanceBusy || !!t.disabledReason,
          onClick: a[1] || (a[1] = (s) => o.$emit("maintain"))
        }, [c(y, {
          name: "refresh",
          class: J({ "is-spinning": t.maintenanceBusy })
        }, null, 8, ["class"]), b(u(t.maintenanceBusy ? "正在更新…" : "更新任务进展"), 1)], 8, za),
        t.disabledReason ? (i(), d("p", Qa, u(t.disabledReason), 1)) : g("", !0)
      ]),
      t.maintenanceMessage ? (i(), d("p", Ga, u(t.maintenanceMessage), 1)) : g("", !0)
    ]));
  }
}), Wa = Ja;
function Xa(t, o, a, s) {
  if (s !== a.stateVersion || t.nextCursor !== a.cursor) return null;
  const m = new Set(t.items.map((p) => p.taskId));
  return {
    items: [...t.items, ...o.items.filter((p) => !m.has(p.taskId))],
    nextCursor: o.nextCursor,
    hasMore: o.hasMore
  };
}
var Ya = { class: "tasks-page" }, _a = { class: "tasks-contract-sheet" }, es = { class: "tasks-contract-heading" }, ts = { class: "tasks-grade" }, as = { class: "tasks-eyebrow" }, ss = { class: "tasks-contract-reward" }, ls = { class: "tasks-seal" }, ns = { class: "tasks-facts" }, is = { key: 0 }, rs = { class: "is-risk" }, us = { class: "tasks-tags" }, ds = { class: "tasks-action-dock" }, os = {
  key: 0,
  class: "tasks-hint"
}, vs = ["disabled"], ks = {
  key: 1,
  class: "tasks-empty"
}, bs = /* @__PURE__ */ M({
  __name: "TaskListingDetail",
  props: {
    listing: {},
    busy: { type: Boolean },
    disabledReason: {}
  },
  emits: ["accept"],
  setup(t) {
    return (o, a) => (i(), d("section", Ya, [t.listing ? (i(), d(C, { key: 0 }, [
      e("article", _a, [
        e("header", es, [
          e("span", ts, u(t.listing.grade), 1),
          e("span", as, "任务终端 · " + u(t.listing.posture), 1),
          e("h2", null, u(t.listing.title), 1),
          e("p", null, u(t.listing.hook), 1)
        ]),
        e("div", ss, [e("span", null, [a[2] || (a[2] = b("完成报酬", -1)), e("strong", null, [a[1] || (a[1] = e("small", null, "¤", -1)), b(" " + u(L(E)(t.listing.reward)), 1)])]), e("span", ls, [c(y, { name: "check" }), a[3] || (a[3] = b("终端出资", -1))])]),
        e("dl", ns, [
          e("div", null, [a[4] || (a[4] = e("dt", null, "完成目标", -1)), e("dd", null, u(t.listing.objective), 1)]),
          t.listing.requirements ? (i(), d("div", is, [a[5] || (a[5] = e("dt", null, "执行约束", -1)), e("dd", null, u(t.listing.requirements), 1)])) : g("", !0),
          e("div", null, [a[6] || (a[6] = e("dt", null, "行动地点", -1)), e("dd", null, u(t.listing.location), 1)]),
          e("div", null, [a[7] || (a[7] = e("dt", null, "行动时机", -1)), e("dd", null, u(t.listing.timing), 1)]),
          e("div", rs, [a[8] || (a[8] = e("dt", null, "留意风险", -1)), e("dd", null, u(t.listing.risk), 1)])
        ]),
        e("div", us, [(i(!0), d(C, null, N(t.listing.tags, (s) => (i(), d("span", { key: s }, u(s), 1))), 128))])
      ]),
      a[9] || (a[9] = e("p", { class: "tasks-hint" }, "接取后由你执行，报酬自动托管；无需另找 NPC 领取任务。", -1)),
      e("div", ds, [t.disabledReason ? (i(), d("p", os, u(t.disabledReason), 1)) : g("", !0), e("button", {
        type: "button",
        class: "tasks-primary-button",
        disabled: t.listing.accepted || t.busy || !!t.disabledReason,
        onClick: a[0] || (a[0] = (s) => o.$emit("accept"))
      }, [c(y, { name: t.listing.accepted ? "check" : "plus" }, null, 8, ["name"]), b(u(t.listing.accepted ? "已接取这份委托" : t.busy ? "正在接取…" : "接下这份委托"), 1)], 8, vs)])
    ], 64)) : (i(), d("div", ks, [
      c(y, { name: "ticket" }),
      a[10] || (a[10] = e("h3", null, "这批委托已更新", -1)),
      a[11] || (a[11] = e("p", null, "返回大厅，查看最新的委托。", -1))
    ]))]));
  }
}), cs = bs, ys = {
  key: 0,
  class: "tasks-candidates"
}, ms = ["data-tone"], fs = { class: "tasks-candidate-description" }, gs = { class: "tasks-candidate-facts" }, $s = ["disabled", "onClick"], ps = {
  key: 1,
  class: "tasks-empty"
}, hs = { class: "tasks-empty-mark" }, ws = /* @__PURE__ */ M({
  __name: "TaskCandidateList",
  props: {
    task: {},
    busy: { type: Boolean },
    disabledReason: {}
  },
  emits: ["assign"],
  setup(t) {
    return (o, a) => t.task.candidates.length ? (i(), d("div", ys, [(i(!0), d(C, null, N(t.task.candidates, (s, m) => (i(), d("article", {
      key: s.candidateId,
      class: "tasks-candidate"
    }, [
      e("header", null, [e("span", {
        class: "tasks-candidate-avatar",
        "data-tone": m % 3,
        "aria-hidden": "true"
      }, u(Array.from(s.name)[0]), 9, ms), e("div", null, [e("h3", null, u(s.name), 1), a[0] || (a[0] = e("small", null, "应征者", -1))])]),
      e("p", fs, u(s.description), 1),
      e("blockquote", null, "“" + u(s.pitch) + "”", 1),
      e("dl", gs, [e("div", null, [a[1] || (a[1] = e("dt", null, "擅长", -1)), e("dd", null, u(s.capability), 1)]), e("div", null, [a[2] || (a[2] = e("dt", null, "留意", -1)), e("dd", null, u(s.risk), 1)])]),
      e("button", {
        type: "button",
        class: "tasks-secondary-button tasks-full-button",
        disabled: t.busy || !!t.disabledReason,
        onClick: (p) => o.$emit("assign", t.task, s.candidateId)
      }, [e("span", null, "委托给 " + u(s.name), 1), c(y, { name: "next" })], 8, $s)
    ]))), 128))])) : (i(), d("div", ps, [
      e("span", hs, [c(y, { name: "people" })]),
      a[3] || (a[3] = e("h3", null, "等一个合适的人", -1)),
      a[4] || (a[4] = e("p", null, "发起招募，看看谁愿意接下这份委托。", -1))
    ]));
  }
}), Cs = ws, Is = { class: "tasks-page" }, Ts = { class: "tasks-recruit-heading" }, Rs = { class: "tasks-reward" }, Bs = { class: "tasks-section-heading" }, Ms = ["disabled"], Ss = {
  key: 0,
  class: "tasks-hint",
  role: "status"
}, xs = {
  key: 1,
  class: "tasks-hint"
}, As = { class: "tasks-withdraw" }, Ds = ["disabled"], qs = {
  key: 1,
  class: "tasks-empty"
}, Ls = {
  key: 1,
  class: "tasks-empty"
}, Ps = /* @__PURE__ */ M({
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
    return (o, a) => (i(), d("section", Is, [t.task ? (i(), d(C, { key: 0 }, [e("header", Ts, [
      a[6] || (a[6] = e("span", { class: "tasks-eyebrow" }, "你的委托 · 报酬已托管", -1)),
      e("h2", null, u(t.task.title), 1),
      e("div", null, [e("strong", Rs, "¤ " + u(L(E)(t.task.reward)), 1), e("button", {
        type: "button",
        class: "tasks-text-button",
        onClick: a[0] || (a[0] = (s) => o.$emit("detail", t.task.taskId))
      }, [a[5] || (a[5] = b("查看委托内容", -1)), c(y, { name: "next" })])])
    ]), t.task.status === "recruiting" ? (i(), d(C, { key: 0 }, [
      e("header", Bs, [e("h3", null, [a[7] || (a[7] = b("选择执行者 ", -1)), e("small", null, u(t.task.candidates.length), 1)]), e("button", {
        type: "button",
        class: "tasks-text-button",
        disabled: t.busy || t.recruiting || !!t.generationDisabledReason,
        onClick: a[1] || (a[1] = (s) => o.$emit("recruit", t.task))
      }, [c(y, {
        name: "refresh",
        class: J({ "is-spinning": t.recruiting })
      }, null, 8, ["class"]), b(u(t.recruiting ? "招募中…" : t.task.candidates.length ? "重新招募" : "开始招募"), 1)], 8, Ms)]),
      t.recruiting ? (i(), d("p", Ss, "正在寻找愿意接下委托的人。你可以离开页面，招募会在后台继续。")) : g("", !0),
      t.disabledReason || t.generationDisabledReason ? (i(), d("p", xs, u(t.disabledReason || t.generationDisabledReason), 1)) : g("", !0),
      c(Cs, {
        task: t.task,
        busy: t.busy || t.recruiting,
        "disabled-reason": t.disabledReason,
        onAssign: a[2] || (a[2] = (s, m) => o.$emit("assign", s, m))
      }, null, 8, [
        "task",
        "busy",
        "disabled-reason"
      ]),
      e("div", As, [a[8] || (a[8] = e("p", null, "暂时不需要这份委托了？", -1)), e("button", {
        type: "button",
        class: "tasks-text-button is-danger",
        disabled: t.busy || !!t.disabledReason,
        onClick: a[3] || (a[3] = (s) => o.$emit("cancel", t.task))
      }, "撤回委托并退回报酬", 8, Ds)])
    ], 64)) : (i(), d("div", qs, [
      c(y, { name: "check" }),
      e("h3", null, u(t.task.status === "active" ? "执行者已接下委托" : "这份委托已结束"), 1),
      e("button", {
        type: "button",
        class: "tasks-primary-button",
        onClick: a[4] || (a[4] = (s) => o.$emit("detail", t.task.taskId))
      }, "查看任务进展")
    ]))], 64)) : (i(), d("div", Ls, [...a[9] || (a[9] = [e("h3", null, "委托状态已更新", -1), e("p", null, "请返回“我发布”查看最新进展或已结束记录。", -1)])]))]));
  }
}), Vs = Ps, Es = ["aria-label"], Ns = { class: "tasks-dialog-mark" }, js = { id: "tasks-confirm-title" }, Us = { class: "tasks-dialog-copy" }, Zs = {
  key: 0,
  class: "tasks-dialog-error",
  role: "alert"
}, Hs = {
  key: 1,
  class: "tasks-hint"
}, Os = ["disabled"], Fs = ["disabled"], Ks = /* @__PURE__ */ M({
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
    const a = o, s = h(null);
    ye(() => s.value?.showModal());
    function m(p) {
      if (p.stopPropagation(), p.key !== "Tab") return;
      const r = Array.from(s.value?.querySelectorAll("button:not(:disabled)") ?? []), v = r[0], j = r.at(-1);
      if (!v) {
        p.preventDefault();
        return;
      }
      p.shiftKey && document.activeElement === v ? (p.preventDefault(), j?.focus()) : !p.shiftKey && document.activeElement === j && (p.preventDefault(), v.focus());
    }
    return (p, r) => (i(), d("dialog", {
      ref_key: "dialog",
      ref: s,
      class: "tasks-dialog",
      "aria-label": t.title,
      onCancel: r[2] || (r[2] = me((v) => !t.busy && a("close"), ["prevent"])),
      onKeydown: m
    }, [
      e("span", Ns, [c(y, { name: "ticket" })]),
      e("h2", js, u(t.title), 1),
      e("div", Us, [Oe(p.$slots, "default")]),
      t.error ? (i(), d("p", Zs, u(t.error), 1)) : g("", !0),
      t.disabledReason && !t.busy ? (i(), d("p", Hs, u(t.disabledReason), 1)) : g("", !0),
      e("footer", null, [e("button", {
        type: "button",
        class: "tasks-secondary-button",
        disabled: t.busy,
        autofocus: "",
        onClick: r[0] || (r[0] = (v) => a("close"))
      }, "返回", 8, Os), e("button", {
        type: "button",
        class: "tasks-primary-button",
        disabled: t.busy || !!t.disabledReason,
        onClick: r[1] || (r[1] = (v) => a("confirm"))
      }, u(t.busy ? "正在保存…" : t.confirmLabel), 9, Fs)])
    ], 40, Es));
  }
}), zs = Ks, Qs = { class: "tasks-app-header" }, Gs = {
  key: 1,
  class: "tasks-brand-mark",
  "aria-hidden": "true"
}, Js = { class: "tasks-balance" }, Ws = {
  class: "tasks-notices",
  "aria-live": "polite"
}, Xs = ["disabled"], Ys = ["disabled"], _s = ["disabled"], el = {
  key: 1,
  class: "tasks-notice",
  role: "status"
}, tl = {
  key: 0,
  class: "tasks-receive-tabs",
  "aria-label": "接任务页面"
}, al = ["aria-pressed"], sl = ["aria-pressed"], ll = { key: 0 }, nl = {
  key: 1,
  class: "tasks-nav",
  "aria-label": "任务主导航"
}, il = ["aria-current"], rl = ["aria-current"], ul = { key: 0 }, dl = ["aria-current"], ol = { class: "tasks-confirm-name" }, vl = { class: "tasks-confirm-amount" }, kl = { class: "tasks-confirm-name" }, bl = { class: "tasks-confirm-amount" }, cl = { class: "tasks-confirm-name" }, yl = 35e3, ml = /* @__PURE__ */ M({
  __name: "TasksApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(t) {
    const o = t;
    function a() {
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
          message: ""
        }
      };
    }
    function s(l) {
      return l && typeof l == "object" ? structuredClone(ce(l)) : a();
    }
    function m(l) {
      return l !== null && typeof l == "object" && !Array.isArray(l);
    }
    function p(l) {
      return m(l) ? l.result : null;
    }
    const r = h(s(o.initialState)), v = h("board"), j = h("board"), W = h(null), $ = h(null), H = h(null), le = h(""), _ = h("all"), ee = h(null), ne = B(() => Xe(r.value)), te = B(() => ne.value.received), ie = B(() => ne.value.published), ge = B(() => [...ie.value, ...r.value.history.items].find((l) => l.taskId === le.value) ?? null), $e = B(() => r.value.board?.boardId === H.value?.boardId ? r.value.board?.listings.find((l) => l.listingId === H.value?.listingId) ?? null : null), O = B(() => [
      "board",
      "active",
      "published",
      "history"
    ].includes(v.value)), pe = B(() => ({
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
    let F = 0;
    const re = B(() => r.value.generation.state === "running" && r.value.generation.kind === "board"), ue = B(() => r.value.generation.state === "running" && r.value.generation.kind === "candidates" ? r.value.generation.taskId ?? "" : ""), S = h(!1), X = h(!1), I = h(!1), ae = h(!1), Y = h(!1), f = h(""), U = h("");
    let T = 0, x = !1, de = () => {
    };
    const oe = B(() => r.value.status === "unconfirmed"), P = B(() => S.value ? "正在处理上一项任务操作" : r.value.status === "loading" ? "任务数据正在准备" : r.value.status === "saving" ? "任务与资金正在保存" : r.value.status === "unconfirmed" ? "请先核实上一次保存结果" : r.value.status === "conflict" ? "请先采用服务端数据" : r.value.status === "blocked" ? r.value.message || "任务暂时不可用" : r.value.generationActive ? "正在生成内容，请稍后" : ""), K = B(() => P.value || (r.value.maintenance.state === "running" ? "正在更新任务" : "")), he = B(() => r.value.maintenance.message);
    function ve(l) {
      if (!l || typeof l.chatIdentity != "string") return;
      r.value = structuredClone(l), f.value = "";
      const n = W.value?.task;
      if (v.value === "detail" && n) {
        const k = [
          ...l.active,
          ...l.recruiting,
          ...l.history.items
        ].find((R) => R.taskId === n.taskId);
        k && k.eventId !== n.eventId && G(k.taskId, !0);
      }
    }
    function we(l) {
      if (!m(l)) return null;
      const n = m(l.state) ? l.state : l;
      return typeof n.chatIdentity == "string" ? n : null;
    }
    function q(l) {
      const n = l instanceof Error ? l.message : String(l);
      return n === "tasks_insufficient_funds" ? "小白币余额不足，任务没有发布。" : n === "tasks_state_changed" || n === "tasks_listing_already_accepted" ? "任务状态已经变化，请按最新状态重试。" : n === "tasks_terminal" ? "该任务已经结束，不能再次操作。" : n === "tasks_publish_invalid" || n === "tasks_request_invalid" ? "任务内容不完整或超出允许范围。" : n === "tasks_write_blocked" || n === "tasks_generation_active" ? "当前有生成或保存正在进行，请稍后重试。" : n === "tasks_chat_changed" ? "聊天已经切换，请重新打开任务。" : n === "host_request_timeout" ? "操作响应超时，结果可能稍后返回，请勿立即重复。" : "任务操作未完成，请稍后重试。";
    }
    async function A(l, n = {}, k = yl) {
      return p(await o.bridge.request(l, {
        chatIdentity: r.value.chatIdentity,
        ...n
      }, k));
    }
    function V(l, n) {
      if (T !== n) return;
      const k = we(l);
      k?.chatIdentity === r.value.chatIdentity && ve(k);
    }
    function Z(l) {
      U.value = l, f.value = "";
    }
    async function Ce() {
      if (re.value || K.value) return;
      f.value = "";
      const l = T;
      try {
        const n = await A("tasks/refresh");
        if (!x) return;
        V(n, l);
      } catch (n) {
        x && (f.value = q(n));
      }
    }
    async function Ie(l, n) {
      if (P.value) return;
      S.value = !0;
      const k = T;
      try {
        V(await A("tasks/board/accept", {
          boardId: l,
          listingId: n
        }), k), Z("任务已接取，报酬已进入托管。"), x && v.value === "listing" && w("active");
      } catch (R) {
        f.value = q(R);
      } finally {
        S.value = !1;
      }
    }
    async function Te(l) {
      if (ue.value || K.value) return;
      f.value = "";
      const n = T;
      try {
        const k = await A("tasks/candidates/refresh", {
          taskId: l.taskId,
          expectedTaskRevision: l.taskRevision,
          expectedEventId: l.eventId
        });
        if (!x) return;
        V(k, n);
      } catch (k) {
        x && (f.value = q(k));
      }
    }
    async function Re(l, n) {
      if (P.value) return;
      S.value = !0;
      const k = T;
      try {
        V(await A("tasks/candidates/assign", {
          taskId: l.taskId,
          expectedTaskRevision: l.taskRevision,
          expectedEventId: l.eventId,
          candidateId: n
        }), k), $.value = null, Z("执行者已确认，任务进入进行中。"), x && w("published");
      } catch (R) {
        f.value = q(R);
      } finally {
        S.value = !1;
      }
    }
    async function Be(l) {
      if (P.value) return;
      S.value = !0;
      const n = T;
      try {
        V(await A("tasks/cancel", {
          taskId: l.taskId,
          expectedTaskRevision: l.taskRevision,
          expectedEventId: l.eventId
        }), n), $.value = null, Z("任务已撤回，托管报酬已退回钱包。"), x && w("published");
      } catch (k) {
        f.value = q(k);
      } finally {
        S.value = !1;
      }
    }
    function Me(l) {
      P.value || (f.value = "", $.value = {
        kind: "publish",
        form: structuredClone(l)
      });
    }
    async function Se() {
      const l = $.value?.kind === "publish" ? $.value.form : null;
      if (!l || P.value) return;
      S.value = !0;
      const n = T;
      try {
        V(await A("tasks/publish", { form: ce(l) }), n), $.value = null, w("published"), Z("任务已发布，报酬已锁入托管。");
      } catch (k) {
        f.value = q(k);
      } finally {
        S.value = !1;
      }
    }
    async function xe(l) {
      if (X.value) return;
      X.value = !0;
      const n = T;
      try {
        V(await A("tasks/settings/update", { autoMaintenance: l }), n), Z(l ? "已开启任务进展自动更新。" : "已关闭任务进展自动更新。");
      } catch (k) {
        f.value = q(k);
      } finally {
        X.value = !1;
      }
    }
    async function Ae() {
      if (r.value.maintenance.state === "running" || K.value) return;
      const l = T;
      try {
        V(await A("tasks/maintenance/run"), l);
      } catch (n) {
        f.value = q(n);
      }
    }
    async function G(l, n = !1) {
      n || ((O.value || v.value === "recruit") && (j.value = v.value), v.value = "detail", ee.value?.scrollTo(0, 0), W.value = null, ae.value = !0);
      const k = ++F;
      try {
        const R = await A("tasks/detail/read", { taskId: l });
        if (!x || k !== F) return;
        m(R) && m(R.task) && Array.isArray(R.timeline) && (W.value = structuredClone(R));
      } catch (R) {
        x && k === F && (f.value = q(R));
      } finally {
        x && k === F && (ae.value = !1);
      }
    }
    async function De() {
      const l = r.value.history.nextCursor;
      if (!l || Y.value) return;
      Y.value = !0;
      const n = {
        cursor: l,
        stateVersion: T
      };
      try {
        const k = await A("tasks/history/load-more", { cursor: l });
        if (x && m(k) && Array.isArray(k.items)) {
          const R = k, be = Xa(r.value.history, R, n, T);
          be && (r.value.history = be);
        }
      } catch (k) {
        f.value = q(k);
      } finally {
        Y.value = !1;
      }
    }
    async function qe() {
      if (I.value) return;
      I.value = !0, f.value = "", U.value = "";
      const l = T;
      try {
        const n = await A("tasks/save/confirm");
        V(n, l), m(n) && n.confirmation === "confirmed" && Z("保存已确认。");
      } catch (n) {
        f.value = q(n);
      } finally {
        I.value = !1;
      }
    }
    async function Le() {
      if (I.value) return;
      I.value = !0, f.value = "", U.value = "";
      const l = T;
      try {
        const n = await A("tasks/save/adopt-server");
        V(n, l), m(n) && n.adoption === "adopted" && Z("已采用服务端数据。");
      } catch (n) {
        f.value = q(n);
      } finally {
        I.value = !1;
      }
    }
    async function Pe() {
      if (I.value) return;
      I.value = !0, f.value = "", U.value = "";
      const l = T;
      try {
        V(await A("tasks/read"), l);
      } catch {
        f.value = "读取未完成，请检查存储连接后重试读取。";
      } finally {
        I.value = !1;
      }
    }
    function w(l) {
      l === "settings" && O.value && (j.value = v.value), F += 1, v.value = l, ee.value?.scrollTo(0, 0);
    }
    function ke() {
      w(v.value === "detail" || v.value === "settings" ? j.value : v.value === "listing" ? "board" : "published");
    }
    function Ve(l, n) {
      H.value = {
        boardId: l,
        listingId: n
      }, w("listing");
    }
    function Ee(l) {
      l.status === "recruiting" ? (le.value = l.taskId, w("recruit")) : G(l.taskId);
    }
    function Ne() {
      _.value = "published", w("history");
    }
    function je(l) {
      f.value = "", $.value = {
        kind: "cancel",
        task: l
      };
    }
    function Ue(l, n) {
      f.value = "", $.value = {
        kind: "assign",
        task: l,
        candidateId: n
      };
    }
    function Ze() {
      const l = $.value;
      l && (l.kind === "publish" ? Se() : l.kind === "cancel" ? Be(l.task) : Re(l.task, l.candidateId));
    }
    function He(l) {
      l.key === "Escape" && !O.value && (l.stopPropagation(), l.preventDefault(), ke());
    }
    return ye(() => {
      x = !0, de = o.bridge.subscribe((l) => {
        if (l.type === "tasks/state") {
          const n = l.payload?.state;
          n && (T += 1, ve(n));
        }
        l.type === "tasks/error" && (f.value = "任务状态暂时无法读取，请重新打开。");
      }), o.bridge.post("tasks/activate", { chatIdentity: r.value.chatIdentity });
    }), Ke(() => {
      x = !1, F += 1, de(), $.value = null;
    }), (l, n) => (i(), d("main", {
      class: "tasks-app",
      onKeydown: He
    }, [
      e("header", Qs, [
        O.value ? (i(), d("span", Gs, [c(y, { name: "ticket" })])) : (i(), d("button", {
          key: 0,
          type: "button",
          class: "tasks-icon-button",
          "aria-label": "返回上一页",
          onClick: ke
        }, [c(y, { name: "back" })])),
        e("h1", null, u(pe.value), 1),
        e("div", Js, [n[12] || (n[12] = e("small", null, "可用余额", -1)), e("strong", null, "¤ " + u(L(E)(r.value.playerBalance)), 1)]),
        O.value ? (i(), d("button", {
          key: 2,
          type: "button",
          class: "tasks-icon-button",
          "aria-label": "任务设置",
          onClick: n[0] || (n[0] = (k) => w("settings"))
        }, [c(y, { name: "settings" })])) : g("", !0)
      ]),
      e("div", Ws, [r.value.message || f.value && !$.value || U.value ? (i(), d("aside", {
        key: 0,
        class: J(["tasks-notice", {
          "is-error": !!f.value || r.value.status === "conflict" || r.value.status === "blocked",
          "is-warning": oe.value
        }]),
        role: "status"
      }, [e("div", null, [e("p", null, u(r.value.message || ($.value ? "" : f.value) || U.value), 1), oe.value ? (i(), d("button", {
        key: 0,
        type: "button",
        disabled: I.value,
        onClick: qe
      }, u(I.value ? "正在核实…" : "核实保存结果"), 9, Xs)) : r.value.status === "conflict" ? (i(), d("button", {
        key: 1,
        type: "button",
        disabled: I.value,
        onClick: Le
      }, u(I.value ? "正在采用…" : "采用服务端数据"), 9, Ys)) : r.value.status === "blocked" ? (i(), d("button", {
        key: 2,
        type: "button",
        disabled: I.value,
        onClick: Pe
      }, u(I.value ? "正在读取…" : "重试读取"), 9, _s)) : g("", !0)]), r.value.message ? g("", !0) : (i(), d("button", {
        key: 0,
        type: "button",
        class: "tasks-icon-button",
        "aria-label": "关闭提示",
        onClick: n[1] || (n[1] = (k) => {
          f.value = "", U.value = "";
        })
      }, [c(y, { name: "close" })]))], 2)) : g("", !0), r.value.generation.message && !r.value.message ? (i(), d("aside", el, [e("p", null, u(r.value.generation.message), 1)])) : g("", !0)]),
      v.value === "board" || v.value === "active" ? (i(), d("nav", tl, [e("button", {
        type: "button",
        "aria-pressed": v.value === "board",
        onClick: n[2] || (n[2] = (k) => w("board"))
      }, "发现委托", 8, al), e("button", {
        type: "button",
        "aria-pressed": v.value === "active",
        onClick: n[3] || (n[3] = (k) => w("active"))
      }, [n[13] || (n[13] = b("我接的", -1)), te.value.length ? (i(), d("span", ll, u(te.value.length), 1)) : g("", !0)], 8, sl)])) : g("", !0),
      e("div", {
        ref_key: "content",
        ref: ee,
        class: "tasks-content"
      }, [v.value === "board" ? (i(), D(fa, {
        key: 0,
        board: r.value.board,
        busy: re.value,
        "disabled-reason": K.value,
        onRefresh: Ce,
        onDetail: Ve
      }, null, 8, [
        "board",
        "busy",
        "disabled-reason"
      ])) : v.value === "active" ? (i(), D(Kt, {
        key: 1,
        records: te.value,
        onDetail: G,
        onDiscover: n[4] || (n[4] = (k) => w("board"))
      }, null, 8, ["records"])) : v.value === "published" ? (i(), D(Va, {
        key: 2,
        records: ie.value,
        "disabled-reason": P.value,
        onOpen: Ee,
        onPublish: n[5] || (n[5] = (k) => w("publish")),
        onHistory: Ne
      }, null, 8, ["records", "disabled-reason"])) : v.value === "history" ? (i(), D(Ra, {
        key: 3,
        history: r.value.history,
        loading: Y.value,
        source: _.value,
        onFilter: n[6] || (n[6] = (k) => _.value = k),
        onDetail: G,
        onLoadMore: De
      }, null, 8, [
        "history",
        "loading",
        "source"
      ])) : v.value === "settings" ? (i(), D(Wa, {
        key: 4,
        "auto-maintenance": r.value.settings.autoMaintenance,
        "settings-busy": X.value,
        "maintenance-busy": r.value.maintenance.state === "running",
        "maintenance-message": he.value,
        "disabled-reason": K.value,
        onUpdate: xe,
        onMaintain: Ae
      }, null, 8, [
        "auto-maintenance",
        "settings-busy",
        "maintenance-busy",
        "maintenance-message",
        "disabled-reason"
      ])) : v.value === "publish" ? (i(), D(Dt, {
        key: 5,
        balance: r.value.playerBalance,
        busy: S.value,
        "disabled-reason": P.value,
        onSubmit: Me
      }, null, 8, [
        "balance",
        "busy",
        "disabled-reason"
      ])) : v.value === "listing" ? (i(), D(cs, {
        key: 6,
        listing: $e.value,
        busy: S.value,
        "disabled-reason": P.value,
        onAccept: n[7] || (n[7] = (k) => H.value && Ie(H.value.boardId, H.value.listingId))
      }, null, 8, [
        "listing",
        "busy",
        "disabled-reason"
      ])) : v.value === "recruit" ? (i(), D(Vs, {
        key: 7,
        task: ge.value,
        busy: S.value,
        recruiting: !!ue.value,
        "disabled-reason": P.value,
        "generation-disabled-reason": K.value,
        onRecruit: Te,
        onAssign: Ue,
        onCancel: je,
        onDetail: G
      }, null, 8, [
        "task",
        "busy",
        "recruiting",
        "disabled-reason",
        "generation-disabled-reason"
      ])) : (i(), D(mt, {
        key: 8,
        detail: W.value,
        loading: ae.value
      }, null, 8, ["detail", "loading"]))], 512),
      O.value ? (i(), d("nav", nl, [
        e("button", {
          type: "button",
          "aria-label": "接任务",
          "aria-current": v.value === "board" || v.value === "active" ? "page" : void 0,
          onClick: n[8] || (n[8] = (k) => w("board"))
        }, [e("span", null, [c(y, { name: "compass" })]), n[14] || (n[14] = b("接任务", -1))], 8, il),
        e("button", {
          type: "button",
          "aria-label": "我发布",
          "aria-current": v.value === "published" ? "page" : void 0,
          onClick: n[9] || (n[9] = (k) => w("published"))
        }, [e("span", null, [c(y, { name: "send" }), r.value.recruiting.length ? (i(), d("i", ul)) : g("", !0)]), n[15] || (n[15] = b("我发布", -1))], 8, rl),
        e("button", {
          type: "button",
          "aria-label": "记录",
          "aria-current": v.value === "history" ? "page" : void 0,
          onClick: n[10] || (n[10] = (k) => w("history"))
        }, [e("span", null, [c(y, { name: "archive" })]), n[16] || (n[16] = b("记录", -1))], 8, dl)
      ])) : g("", !0),
      $.value ? (i(), D(zs, {
        key: 2,
        title: $.value.kind === "publish" ? "让这份委托出发？" : $.value.kind === "cancel" ? "撤回这份委托？" : "把委托交给这位执行者？",
        "confirm-label": $.value.kind === "publish" ? "托管并发布" : $.value.kind === "cancel" ? "撤回并退款" : "确认委托",
        busy: S.value,
        "disabled-reason": P.value,
        error: f.value,
        onClose: n[11] || (n[11] = (k) => {
          $.value = null, f.value = "";
        }),
        onConfirm: Ze
      }, {
        default: ze(() => [$.value.kind === "publish" ? (i(), d(C, { key: 0 }, [
          e("p", ol, u($.value.form.title), 1),
          e("strong", vl, "¤ " + u(L(E)($.value.form.reward)), 1),
          n[17] || (n[17] = e("p", null, "报酬将从钱包托管。发布后可招募执行者；选人之前，你可以撤回并全额退回报酬。", -1))
        ], 64)) : $.value.kind === "cancel" ? (i(), d(C, { key: 1 }, [
          e("p", kl, u($.value.task.title), 1),
          e("strong", bl, "¤ " + u(L(E)($.value.task.reward)), 1),
          n[18] || (n[18] = e("p", null, "撤回后，托管报酬将退回你的钱包。", -1))
        ], 64)) : (i(), d(C, { key: 2 }, [e("p", cl, u($.value.task.candidates.find((k) => k.candidateId === ($.value?.kind === "assign" ? $.value.candidateId : ""))?.name), 1), e("p", null, "确认后开始执行“" + u($.value.task.title) + "”。执行者确定后，这份委托不能再撤回。", 1)], 64))]),
        _: 1
      }, 8, [
        "title",
        "confirm-label",
        "busy",
        "disabled-reason",
        "error"
      ])) : g("", !0)
    ], 32));
  }
}), gl = ml;
export {
  gl as default
};
