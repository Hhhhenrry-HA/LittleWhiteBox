/* eslint-disable */
import { B as W, C as fe, D as Fe, E as V, F as ze, H as u, I as p, M as Qe, N as z, R as me, T as i, _ as y, a as Q, b as Ge, c as ge, d as e, f as x, g as c, l as w, m as d, p as b, u as B, v as A, x as Je, z as q } from "./xiaobai-os-runtime-dom.esm-bundler-DwdCK5Jt.js";
var We = {
  class: "tasks-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.7",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, Xe = ["d"], Ye = /* @__PURE__ */ A({
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
    return (a, s) => (i(), d("svg", We, [e("path", { d: o[t.name] }, null, 8, Xe)]));
  }
}), m = Ye, he = {
  recruiting: "招募中",
  active: "进行中",
  completed: "已完成",
  failed: "未完成",
  cancelled: "已取消"
};
function N(t) {
  return t.toLocaleString("zh-CN");
}
function _e(t) {
  return t.source === "received" ? "任务终端" : `${t.issuer.displayName}（你）`;
}
function et(t) {
  return {
    received: t.active.filter((o) => o.source === "received"),
    published: [...t.recruiting, ...t.active.filter((o) => o.source === "published")].sort((o, a) => a.updatedAt - o.updatedAt || a.taskId.localeCompare(o.taskId))
  };
}
var tt = { class: "tasks-page tasks-detail-page" }, at = {
  key: 0,
  class: "tasks-empty",
  role: "status"
}, st = { class: "tasks-contract-heading" }, lt = ["data-status"], nt = { class: "tasks-progress-summary" }, it = { class: "tasks-eyebrow" }, rt = { class: "tasks-facts" }, ut = { class: "tasks-contract-more" }, dt = {
  key: 0,
  class: "tasks-hint"
}, ot = { class: "tasks-contract-reward" }, vt = { class: "tasks-seal" }, kt = { class: "tasks-party-line" }, ct = { class: "tasks-facts" }, bt = { key: 0 }, yt = { key: 1 }, mt = {
  key: 2,
  class: "is-risk"
}, ft = {
  key: 0,
  class: "tasks-withdraw"
}, gt = ["disabled"], ht = {
  key: 0,
  class: "tasks-hint"
}, $t = { class: "tasks-timeline" }, pt = {
  key: 2,
  class: "tasks-empty"
}, Ct = /* @__PURE__ */ A({
  __name: "TaskDetail",
  props: {
    detail: {},
    loading: { type: Boolean },
    busy: { type: Boolean },
    disabledReason: {}
  },
  emits: ["cancel"],
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
    return (a, s) => (i(), d("section", tt, [t.loading ? (i(), d("div", at, [y(m, {
      name: "refresh",
      class: "is-spinning"
    }), s[1] || (s[1] = e("h3", null, "正在读取委托…", -1))])) : t.detail ? (i(), d(w, { key: 1 }, [
      e("header", st, [e("span", {
        class: "tasks-status",
        "data-status": t.detail.task.status
      }, [s[2] || (s[2] = e("i", null, null, -1)), c(u(q(he)[t.detail.task.status]), 1)], 8, lt), e("h2", null, u(t.detail.task.title), 1)]),
      e("section", nt, [e("span", it, u(t.detail.task.resultSummary ? "最终结果" : "当前进展"), 1), e("p", null, u(t.detail.task.resultSummary || t.detail.task.progressSummary || "暂无新进展"), 1)]),
      e("dl", rt, [e("div", null, [s[3] || (s[3] = e("dt", null, "完成目标", -1)), e("dd", null, u(t.detail.task.objective), 1)])]),
      e("details", ut, [
        s[12] || (s[12] = e("summary", null, "委托内容与报酬", -1)),
        t.detail.task.hook ? (i(), d("p", dt, u(t.detail.task.hook), 1)) : b("", !0),
        e("div", ot, [e("span", null, [s[5] || (s[5] = c("委托报酬", -1)), e("strong", null, [s[4] || (s[4] = e("small", null, "¤", -1)), c(" " + u(q(N)(t.detail.task.reward)), 1)])]), e("span", vt, u(t.detail.task.source === "received" ? "终端委托" : "我的委托"), 1)]),
        e("div", kt, [
          e("span", null, [s[6] || (s[6] = c("发布者", -1)), e("strong", null, u(q(_e)(t.detail.task)), 1)]),
          y(m, { name: "next" }),
          e("span", null, [s[7] || (s[7] = c("执行者", -1)), e("strong", null, u(t.detail.task.assignee?.displayName || "等待选人"), 1)])
        ]),
        e("dl", ct, [
          t.detail.task.requirements ? (i(), d("div", bt, [s[8] || (s[8] = e("dt", null, "要求", -1)), e("dd", null, u(t.detail.task.requirements), 1)])) : b("", !0),
          e("div", null, [s[9] || (s[9] = e("dt", null, "地点", -1)), e("dd", null, u(t.detail.task.location), 1)]),
          t.detail.task.timing ? (i(), d("div", yt, [s[10] || (s[10] = e("dt", null, "时机", -1)), e("dd", null, u(t.detail.task.timing), 1)])) : b("", !0),
          t.detail.task.risk ? (i(), d("div", mt, [s[11] || (s[11] = e("dt", null, "风险", -1)), e("dd", null, u(t.detail.task.risk), 1)])) : b("", !0)
        ])
      ]),
      t.detail.task.status === "active" || t.detail.task.status === "recruiting" ? (i(), d("div", ft, [e("button", {
        type: "button",
        class: "tasks-text-button is-danger",
        disabled: t.busy || !!t.disabledReason,
        onClick: s[0] || (s[0] = (f) => a.$emit("cancel", t.detail.task))
      }, u(t.detail.task.source === "received" ? "放弃任务" : "取消委托并退回报酬"), 9, gt), t.disabledReason ? (i(), d("p", ht, u(t.disabledReason), 1)) : b("", !0)])) : b("", !0),
      e("section", $t, [s[14] || (s[14] = e("h3", null, "进展记录", -1)), e("ol", null, [(i(!0), d(w, null, V(t.detail.timeline, (f) => (i(), d("li", { key: f.eventId }, [s[13] || (s[13] = e("i", null, null, -1)), e("div", null, [e("small", null, u(o(f.createdAt)), 1), e("p", null, u(f.summary), 1)])]))), 128))])])
    ], 64)) : (i(), d("div", pt, [...s[15] || (s[15] = [e("h3", null, "这份委托暂时无法读取", -1), e("p", null, "请返回后重试。", -1)])]))]));
  }
}), It = Ct, wt = { class: "tasks-page tasks-publish-page" }, Tt = ["disabled"], Rt = { class: "tasks-form-group" }, Bt = { class: "tasks-form-extra" }, Mt = { class: "tasks-form-group" }, St = { class: "tasks-reward-editor" }, xt = { class: "tasks-amount-input" }, At = ["max"], Dt = { class: "tasks-reward-presets" }, qt = [
  "aria-pressed",
  "disabled",
  "onClick"
], Lt = {
  key: 0,
  class: "tasks-error-text",
  role: "status"
}, Pt = { class: "tasks-hint" }, Et = {
  key: 0,
  class: "tasks-hint"
}, Nt = ["disabled"], Vt = /* @__PURE__ */ A({
  __name: "TaskPublishForm",
  props: {
    balance: {},
    busy: { type: Boolean },
    disabledReason: {}
  },
  emits: ["submit"],
  setup(t, { emit: o }) {
    const a = o, s = ze({
      title: "",
      objective: "",
      requirements: "",
      location: "",
      risk: "",
      reward: 20
    });
    function f() {
      a("submit", {
        title: s.title,
        objective: s.objective,
        ...s.requirements.trim() ? { requirements: s.requirements } : {},
        location: s.location,
        risk: s.risk,
        reward: Number(s.reward)
      });
    }
    return ($, r) => (i(), d("section", wt, [e("form", {
      class: "tasks-publish-form",
      onSubmit: ge(f, ["prevent"])
    }, [
      e("fieldset", { disabled: t.busy }, [
        r[15] || (r[15] = e("legend", { class: "tasks-sr-only" }, "委托内容", -1)),
        e("div", Rt, [
          e("label", null, [r[6] || (r[6] = e("span", null, [c("委托名称 "), e("b", null, "*")], -1)), z(e("input", {
            "onUpdate:modelValue": r[0] || (r[0] = (v) => s.title = v),
            required: "",
            maxlength: "120",
            autocomplete: "off",
            placeholder: "例如：找回钟楼的手札"
          }, null, 512), [[Q, s.title]])]),
          e("label", null, [r[7] || (r[7] = e("span", null, [c("完成目标 "), e("b", null, "*")], -1)), z(e("textarea", {
            "onUpdate:modelValue": r[1] || (r[1] = (v) => s.objective = v),
            required: "",
            maxlength: "8000",
            rows: "3",
            placeholder: "怎样才算完成？"
          }, null, 512), [[Q, s.objective]])]),
          e("label", null, [r[8] || (r[8] = e("span", null, [c("行动地点 "), e("b", null, "*")], -1)), z(e("input", {
            "onUpdate:modelValue": r[2] || (r[2] = (v) => s.location = v),
            required: "",
            maxlength: "600",
            autocomplete: "off",
            placeholder: "例如：旧城钟楼"
          }, null, 512), [[Q, s.location]])])
        ]),
        e("details", Bt, [r[11] || (r[11] = e("summary", null, [c("补充约束与风险 "), e("span", null, "选填")], -1)), e("div", Mt, [e("label", null, [r[9] || (r[9] = e("span", null, "执行约束", -1)), z(e("textarea", {
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
        e("div", St, [
          e("label", null, [r[13] || (r[13] = e("span", null, [c("为这份委托设定报酬 "), e("b", null, "*")], -1)), e("span", xt, [r[12] || (r[12] = e("i", null, "¤", -1)), z(e("input", {
            "onUpdate:modelValue": r[5] || (r[5] = (v) => s.reward = v),
            "aria-label": "托管报酬",
            type: "number",
            required: "",
            min: "1",
            max: t.balance,
            step: "1"
          }, null, 8, At), [[
            Q,
            s.reward,
            void 0,
            { number: !0 }
          ]])])]),
          e("div", Dt, [(i(), d(w, null, V([
            20,
            50,
            100
          ], (v) => e("button", {
            key: v,
            type: "button",
            "aria-pressed": Number(s.reward) === v,
            disabled: v > t.balance,
            onClick: (H) => s.reward = v
          }, "¤ " + u(v), 9, qt)), 64))]),
          e("p", null, [r[14] || (r[14] = c("可用余额 ", -1)), e("strong", null, "¤ " + u(q(N)(t.balance)), 1)]),
          Number(s.reward) > t.balance ? (i(), d("p", Lt, "报酬超出可用余额，请调整金额。")) : b("", !0)
        ])
      ], 8, Tt),
      e("p", Pt, [y(m, { name: "ticket" }), r[16] || (r[16] = c("发布时托管报酬；招募中或执行中均可取消，全额退还托管报酬。", -1))]),
      t.disabledReason ? (i(), d("p", Et, u(t.disabledReason), 1)) : b("", !0),
      e("button", {
        type: "submit",
        class: "tasks-primary-button tasks-full-button",
        disabled: t.busy || !!t.disabledReason || Number(s.reward) > t.balance
      }, [c(u(t.busy ? "正在发布…" : "预览并发布"), 1), y(m, { name: "next" })], 8, Nt)
    ], 32)]));
  }
}), jt = Vt, Ht = ["data-navigation-id"], Ut = { class: "tasks-record-top" }, Zt = ["data-status"], Ot = { class: "tasks-reward" }, Kt = { class: "tasks-record-title" }, Ft = { class: "tasks-record-summary" }, zt = { class: "tasks-record-foot" }, Qt = /* @__PURE__ */ A({
  __name: "TaskRecordCard",
  props: { task: {} },
  emits: ["open"],
  setup(t) {
    return (o, a) => (i(), d("button", {
      type: "button",
      class: "tasks-record",
      "data-navigation-id": `task:${t.task.taskId}`,
      onClick: a[0] || (a[0] = (s) => o.$emit("open", t.task))
    }, [
      e("span", Ut, [e("span", {
        class: "tasks-status",
        "data-status": t.task.status
      }, [a[1] || (a[1] = e("i", null, null, -1)), c(u(q(he)[t.task.status]), 1)], 8, Zt), e("span", Ot, [a[2] || (a[2] = e("small", null, "¤", -1)), c(" " + u(q(N)(t.task.reward)), 1)])]),
      e("strong", Kt, u(t.task.title), 1),
      e("span", Ft, u(t.task.resultSummary || t.task.progressSummary || (t.task.status === "recruiting" ? "委托已发布，等待你选择执行者。" : "任务已开始，等待新的进展。")), 1),
      e("span", zt, [e("span", null, [y(m, { name: t.task.source === "received" ? "pin" : "people" }, null, 8, ["name"]), c(u(t.task.source === "received" ? t.task.location : t.task.assignee?.displayName || `${t.task.candidates.length} 位候选人`), 1)]), y(m, { name: "next" })])
    ], 8, Ht));
  }
}), se = Qt, Gt = { class: "tasks-page" }, Jt = { class: "tasks-section-heading" }, Wt = { key: 0 }, Xt = {
  key: 0,
  class: "tasks-empty"
}, Yt = {
  key: 1,
  class: "tasks-record-list"
}, _t = /* @__PURE__ */ A({
  __name: "TasksActive",
  props: { records: {} },
  emits: ["detail", "discover"],
  setup(t) {
    return (o, a) => (i(), d("section", Gt, [e("header", Jt, [a[1] || (a[1] = e("h2", null, "我接的", -1)), t.records.length ? (i(), d("small", Wt, u(t.records.length) + " 项", 1)) : b("", !0)]), t.records.length ? (i(), d("div", Yt, [(i(!0), d(w, null, V(t.records, (s) => (i(), x(se, {
      key: s.taskId,
      task: s,
      onOpen: (f) => o.$emit("detail", s.taskId)
    }, null, 8, ["task", "onOpen"]))), 128))])) : (i(), d("div", Xt, [
      y(m, { name: "compass" }),
      a[2] || (a[2] = e("h3", null, "暂无进行中的委托", -1)),
      e("button", {
        type: "button",
        class: "tasks-primary-button",
        onClick: a[0] || (a[0] = (s) => o.$emit("discover"))
      }, "发现委托")
    ]))]));
  }
}), ea = _t, ta = { class: "tasks-page tasks-board-page" }, aa = { class: "tasks-section-heading" }, sa = ["disabled"], la = {
  key: 0,
  class: "tasks-hint",
  role: "status"
}, na = {
  key: 1,
  class: "tasks-empty"
}, ia = ["disabled"], ra = ["aria-busy"], ua = ["data-navigation-id", "onClick"], da = { class: "tasks-ticket-top" }, oa = ["data-grade", "aria-label"], va = { class: "tasks-ticket-tags" }, ka = ["aria-label"], ca = { class: "tasks-ticket-title" }, ba = { class: "tasks-ticket-hook" }, ya = { class: "tasks-ticket-foot" }, ma = { class: "tasks-ticket-location" }, fa = {
  key: 0,
  class: "tasks-accepted"
}, ga = {
  key: 3,
  class: "tasks-footnote"
}, ha = /* @__PURE__ */ A({
  __name: "TasksBoard",
  props: {
    board: {},
    busy: { type: Boolean },
    disabledReason: {}
  },
  emits: ["refresh", "detail"],
  setup(t) {
    return (o, a) => (i(), d("section", ta, [
      e("header", aa, [a[2] || (a[2] = e("h2", null, "发现委托", -1)), t.board?.listings.length ? (i(), d("button", {
        key: 0,
        type: "button",
        class: "tasks-text-button",
        disabled: t.busy || !!t.disabledReason,
        onClick: a[0] || (a[0] = (s) => o.$emit("refresh"))
      }, [y(m, {
        name: "refresh",
        class: W({ "is-spinning": t.busy })
      }, null, 8, ["class"]), c(u(t.busy ? "获取中…" : "换一批"), 1)], 8, sa)) : b("", !0)]),
      t.disabledReason ? (i(), d("p", la, u(t.disabledReason), 1)) : b("", !0),
      !t.board || !t.board.listings.length ? (i(), d("div", na, [
        y(m, { name: "compass" }),
        e("h3", null, u(t.busy ? "正在获取委托…" : "暂无委托"), 1),
        t.busy ? b("", !0) : (i(), d("button", {
          key: 0,
          type: "button",
          class: "tasks-primary-button",
          disabled: !!t.disabledReason,
          onClick: a[1] || (a[1] = (s) => o.$emit("refresh"))
        }, "获取委托", 8, ia)),
        a[3] || (a[3] = e("p", null, "获取委托将调用模型", -1))
      ])) : (i(), d("div", {
        key: 2,
        class: "tasks-board-list",
        "aria-busy": t.busy
      }, [(i(!0), d(w, null, V(t.board.listings, (s) => (i(), d("button", {
        key: s.listingId,
        "data-navigation-id": `listing:${s.listingId}`,
        type: "button",
        class: W(["tasks-ticket", { "is-accepted": s.accepted }]),
        onClick: (f) => o.$emit("detail", t.board.boardId, s.listingId)
      }, [
        e("span", da, [
          e("span", {
            class: "tasks-grade",
            "data-grade": s.grade,
            "aria-label": `等级 ${s.grade}`
          }, u(s.grade), 9, oa),
          e("span", va, u(s.tags.slice(0, 2).join(" · ")), 1),
          e("span", {
            class: "tasks-reward",
            "aria-label": `报酬 ${q(N)(s.reward)} 小白币`
          }, [a[4] || (a[4] = e("small", null, "¤", -1)), c(" " + u(q(N)(s.reward)), 1)], 8, ka)
        ]),
        e("strong", ca, u(s.title), 1),
        e("span", ba, u(s.hook), 1),
        e("span", ya, [e("span", ma, [y(m, { name: "pin" }), c(u(s.location), 1)]), s.accepted ? (i(), d("span", fa, [y(m, { name: "check" }), a[5] || (a[5] = c("已接取", -1))])) : (i(), x(m, {
          key: 1,
          name: "next"
        }))])
      ], 10, ua))), 128))], 8, ra)),
      t.board?.listings.length ? (i(), d("p", ga, "任务终端出资 · 换一批将调用模型")) : b("", !0)
    ]));
  }
}), $a = ha, pa = { class: "tasks-page" }, Ca = {
  class: "tasks-filter",
  "aria-label": "记录来源"
}, Ia = ["aria-pressed", "onClick"], wa = {
  key: 0,
  class: "tasks-empty"
}, Ta = {
  key: 1,
  class: "tasks-record-list"
}, Ra = ["disabled"], Ba = /* @__PURE__ */ A({
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
    return (s, f) => (i(), d("section", pa, [
      f[1] || (f[1] = e("header", { class: "tasks-section-heading" }, [e("h2", null, "记录")], -1)),
      e("div", Ca, [(i(), d(w, null, V([
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
        onClick: (r) => s.$emit("filter", $.id)
      }, u($.label), 9, Ia)), 64))]),
      a.value.length ? (i(), d("div", Ta, [(i(!0), d(w, null, V(a.value, ($) => (i(), x(se, {
        key: $.taskId,
        task: $,
        onOpen: (r) => s.$emit("detail", $.taskId)
      }, null, 8, ["task", "onOpen"]))), 128))])) : (i(), d("div", wa, [y(m, { name: "archive" }), e("h3", null, u(t.history.hasMore ? "已加载的记录中暂无匹配项" : "暂无记录"), 1)])),
      t.history.hasMore ? (i(), d("button", {
        key: 2,
        type: "button",
        class: "tasks-load-more tasks-secondary-button",
        disabled: t.loading,
        onClick: f[0] || (f[0] = ($) => s.$emit("loadMore"))
      }, u(t.loading ? "正在加载…" : "加载更多记录"), 9, Ra)) : b("", !0)
    ]));
  }
}), Ma = Ba, Sa = { class: "tasks-page" }, xa = { class: "tasks-section-heading" }, Aa = ["disabled"], Da = {
  key: 0,
  class: "tasks-hint"
}, qa = {
  key: 1,
  class: "tasks-empty"
}, La = {
  key: 2,
  class: "tasks-record-list"
}, Pa = /* @__PURE__ */ A({
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
    return (o, a) => (i(), d("section", Sa, [
      e("header", xa, [a[3] || (a[3] = e("h2", null, "我发布的", -1)), e("button", {
        type: "button",
        class: "tasks-primary-button",
        "data-navigation-id": "publish",
        disabled: !!t.disabledReason,
        onClick: a[0] || (a[0] = (s) => o.$emit("publish"))
      }, [y(m, { name: "plus" }), a[2] || (a[2] = c("发布委托", -1))], 8, Aa)]),
      t.disabledReason ? (i(), d("p", Da, u(t.disabledReason), 1)) : b("", !0),
      t.records.length ? (i(), d("div", La, [(i(!0), d(w, null, V(t.records, (s) => (i(), x(se, {
        key: s.taskId,
        task: s,
        onOpen: (f) => o.$emit("open", s)
      }, null, 8, ["task", "onOpen"]))), 128))])) : (i(), d("div", qa, [y(m, { name: "send" }), a[4] || (a[4] = e("h3", null, "还没有发布委托", -1))])),
      e("button", {
        type: "button",
        class: "tasks-text-button tasks-history-link",
        onClick: a[1] || (a[1] = (s) => o.$emit("history"))
      }, [a[5] || (a[5] = c("已结束的委托", -1)), y(m, { name: "next" })])
    ]));
  }
}), Ea = Pa, Na = { class: "tasks-page tasks-settings-page" }, Va = { class: "tasks-setting-card" }, ja = { class: "tasks-setting-row" }, Ha = { class: "tasks-switch" }, Ua = ["checked", "disabled"], Za = { class: "tasks-setting-card" }, Oa = ["disabled"], Ka = {
  key: 0,
  class: "tasks-hint"
}, Fa = {
  key: 0,
  class: "tasks-maintenance-message",
  role: "status"
}, za = /* @__PURE__ */ A({
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
    return (o, a) => (i(), d("section", Na, [
      e("article", Va, [e("div", ja, [a[3] || (a[3] = e("h3", null, "自动更新进展", -1)), e("label", Ha, [e("input", {
        type: "checkbox",
        "aria-label": "自动更新任务进展",
        checked: t.autoMaintenance,
        disabled: t.settingsBusy,
        onChange: a[0] || (a[0] = (s) => o.$emit("update", s.target.checked))
      }, null, 40, Ua), a[2] || (a[2] = e("span", null, null, -1))])]), a[4] || (a[4] = e("p", null, "发送下一条消息时，根据上一轮剧情更新任务，将调用模型。适用于所有普通聊天。", -1))]),
      e("article", Za, [
        e("button", {
          type: "button",
          class: "tasks-secondary-button",
          disabled: t.maintenanceBusy || !!t.disabledReason,
          onClick: a[1] || (a[1] = (s) => o.$emit("maintain"))
        }, [y(m, {
          name: "refresh",
          class: W({ "is-spinning": t.maintenanceBusy })
        }, null, 8, ["class"]), c(u(t.maintenanceBusy ? "正在更新…" : "更新任务进展"), 1)], 8, Oa),
        a[5] || (a[5] = e("p", null, "根据当前剧情检查任务，将调用模型。", -1)),
        t.disabledReason ? (i(), d("p", Ka, u(t.disabledReason), 1)) : b("", !0)
      ]),
      t.maintenanceMessage ? (i(), d("p", Fa, u(t.maintenanceMessage), 1)) : b("", !0)
    ]));
  }
}), Qa = za;
function Ga(t, o, a, s) {
  if (s !== a.stateVersion || t.nextCursor !== a.cursor) return null;
  const f = new Set(t.items.map(($) => $.taskId));
  return {
    items: [...t.items, ...o.items.filter(($) => !f.has($.taskId))],
    nextCursor: o.nextCursor,
    hasMore: o.hasMore
  };
}
var Ja = { class: "tasks-page" }, Wa = { class: "tasks-contract-sheet" }, Xa = { class: "tasks-contract-heading" }, Ya = { class: "tasks-grade" }, _a = { class: "tasks-eyebrow" }, es = { class: "tasks-contract-reward" }, ts = { class: "tasks-seal" }, as = { class: "tasks-facts" }, ss = { key: 0 }, ls = { class: "is-risk" }, ns = { class: "tasks-tags" }, is = { class: "tasks-action-dock" }, rs = {
  key: 0,
  class: "tasks-hint"
}, us = ["disabled"], ds = {
  key: 1,
  class: "tasks-empty"
}, os = /* @__PURE__ */ A({
  __name: "TaskListingDetail",
  props: {
    listing: {},
    busy: { type: Boolean },
    disabledReason: {}
  },
  emits: ["accept"],
  setup(t) {
    return (o, a) => (i(), d("section", Ja, [t.listing ? (i(), d(w, { key: 0 }, [
      e("article", Wa, [
        e("header", Xa, [
          e("span", Ya, u(t.listing.grade), 1),
          e("span", _a, "任务终端 · " + u(t.listing.posture), 1),
          e("h2", null, u(t.listing.title), 1),
          e("p", null, u(t.listing.hook), 1)
        ]),
        e("div", es, [e("span", null, [a[2] || (a[2] = c("完成报酬", -1)), e("strong", null, [a[1] || (a[1] = e("small", null, "¤", -1)), c(" " + u(q(N)(t.listing.reward)), 1)])]), e("span", ts, [y(m, { name: "check" }), a[3] || (a[3] = c("终端出资", -1))])]),
        e("dl", as, [
          e("div", null, [a[4] || (a[4] = e("dt", null, "完成目标", -1)), e("dd", null, u(t.listing.objective), 1)]),
          t.listing.requirements ? (i(), d("div", ss, [a[5] || (a[5] = e("dt", null, "执行约束", -1)), e("dd", null, u(t.listing.requirements), 1)])) : b("", !0),
          e("div", null, [a[6] || (a[6] = e("dt", null, "行动地点", -1)), e("dd", null, u(t.listing.location), 1)]),
          e("div", null, [a[7] || (a[7] = e("dt", null, "行动时机", -1)), e("dd", null, u(t.listing.timing), 1)]),
          e("div", ls, [a[8] || (a[8] = e("dt", null, "留意风险", -1)), e("dd", null, u(t.listing.risk), 1)])
        ]),
        e("div", ns, [(i(!0), d(w, null, V(t.listing.tags, (s) => (i(), d("span", { key: s }, u(s), 1))), 128))])
      ]),
      a[9] || (a[9] = e("p", { class: "tasks-hint" }, "接取后由你执行，报酬自动托管；无需另找 NPC 领取任务。", -1)),
      e("div", is, [t.disabledReason ? (i(), d("p", rs, u(t.disabledReason), 1)) : b("", !0), e("button", {
        type: "button",
        class: "tasks-primary-button",
        disabled: t.listing.accepted || t.busy || !!t.disabledReason,
        onClick: a[0] || (a[0] = (s) => o.$emit("accept"))
      }, [y(m, { name: t.listing.accepted ? "check" : "plus" }, null, 8, ["name"]), c(u(t.listing.accepted ? "已接取这份委托" : t.busy ? "正在接取…" : "接下这份委托"), 1)], 8, us)])
    ], 64)) : (i(), d("div", ds, [
      y(m, { name: "ticket" }),
      a[10] || (a[10] = e("h3", null, "这批委托已更新", -1)),
      a[11] || (a[11] = e("p", null, "返回大厅，查看最新的委托。", -1))
    ]))]));
  }
}), vs = os, ks = {
  key: 0,
  class: "tasks-candidates"
}, cs = ["data-tone"], bs = { class: "tasks-candidate-description" }, ys = { class: "tasks-candidate-facts" }, ms = ["disabled", "onClick"], fs = {
  key: 1,
  class: "tasks-empty"
}, gs = /* @__PURE__ */ A({
  __name: "TaskCandidateList",
  props: {
    task: {},
    busy: { type: Boolean },
    disabledReason: {}
  },
  emits: ["assign"],
  setup(t) {
    return (o, a) => t.task.candidates.length ? (i(), d("div", ks, [(i(!0), d(w, null, V(t.task.candidates, (s, f) => (i(), d("article", {
      key: s.candidateId,
      class: "tasks-candidate"
    }, [
      e("header", null, [e("span", {
        class: "tasks-candidate-avatar",
        "data-tone": f % 3,
        "aria-hidden": "true"
      }, u(Array.from(s.name)[0]), 9, cs), e("h3", null, u(s.name), 1)]),
      e("p", bs, u(s.description), 1),
      e("blockquote", null, "“" + u(s.pitch) + "”", 1),
      e("dl", ys, [e("div", null, [a[0] || (a[0] = e("dt", null, "擅长", -1)), e("dd", null, u(s.capability), 1)]), e("div", null, [a[1] || (a[1] = e("dt", null, "留意", -1)), e("dd", null, u(s.risk), 1)])]),
      e("button", {
        type: "button",
        class: "tasks-secondary-button tasks-full-button",
        disabled: t.busy || !!t.disabledReason,
        onClick: ($) => o.$emit("assign", t.task, s.candidateId)
      }, [e("span", null, "委托给 " + u(s.name), 1), y(m, { name: "next" })], 8, ms)
    ]))), 128))])) : (i(), d("div", fs, [y(m, { name: "people" }), a[2] || (a[2] = e("h3", null, "暂无应征者", -1))]));
  }
}), hs = gs, $s = { class: "tasks-page" }, ps = { class: "tasks-recruit-heading" }, Cs = { class: "tasks-reward" }, Is = { class: "tasks-section-heading" }, ws = ["disabled"], Ts = ["role"], Rs = {
  key: 0,
  class: "tasks-hint"
}, Bs = { class: "tasks-withdraw" }, Ms = ["disabled"], Ss = {
  key: 1,
  class: "tasks-empty"
}, xs = {
  key: 1,
  class: "tasks-empty"
}, As = /* @__PURE__ */ A({
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
    return (o, a) => (i(), d("section", $s, [t.task ? (i(), d(w, { key: 0 }, [e("header", ps, [
      a[6] || (a[6] = e("span", { class: "tasks-eyebrow" }, "报酬已托管", -1)),
      e("h2", null, u(t.task.title), 1),
      e("div", null, [e("strong", Cs, "¤ " + u(q(N)(t.task.reward)), 1), e("button", {
        type: "button",
        class: "tasks-text-button",
        "data-navigation-id": "contract",
        onClick: a[0] || (a[0] = (s) => o.$emit("detail", t.task.taskId))
      }, [a[5] || (a[5] = c("查看委托内容", -1)), y(m, { name: "next" })])])
    ]), t.task.status === "recruiting" ? (i(), d(w, { key: 0 }, [
      e("header", Is, [e("h3", null, [a[7] || (a[7] = c("选择执行者 ", -1)), e("small", null, u(t.task.candidates.length), 1)]), e("button", {
        type: "button",
        class: "tasks-text-button",
        disabled: t.busy || t.recruiting || !!t.generationDisabledReason,
        onClick: a[1] || (a[1] = (s) => o.$emit("recruit", t.task))
      }, [y(m, {
        name: "refresh",
        class: W({ "is-spinning": t.recruiting })
      }, null, 8, ["class"]), c(u(t.recruiting ? "招募中…" : t.task.candidates.length ? "重新招募" : "开始招募"), 1)], 8, ws)]),
      e("p", {
        class: "tasks-hint",
        role: t.recruiting ? "status" : void 0
      }, u(t.recruiting ? "正在招募，可离开页面等待。" : "招募将调用模型"), 9, Ts),
      t.disabledReason || t.generationDisabledReason ? (i(), d("p", Rs, u(t.disabledReason || t.generationDisabledReason), 1)) : b("", !0),
      y(hs, {
        task: t.task,
        busy: t.busy || t.recruiting,
        "disabled-reason": t.disabledReason,
        onAssign: a[2] || (a[2] = (s, f) => o.$emit("assign", s, f))
      }, null, 8, [
        "task",
        "busy",
        "disabled-reason"
      ]),
      e("div", Bs, [e("button", {
        type: "button",
        class: "tasks-text-button is-danger",
        disabled: t.busy || !!t.disabledReason,
        onClick: a[3] || (a[3] = (s) => o.$emit("cancel", t.task))
      }, "取消委托并退回报酬", 8, Ms)])
    ], 64)) : (i(), d("div", Ss, [
      y(m, { name: "check" }),
      e("h3", null, u(t.task.status === "active" ? "执行者已接下委托" : "这份委托已结束"), 1),
      e("button", {
        type: "button",
        class: "tasks-primary-button",
        onClick: a[4] || (a[4] = (s) => o.$emit("detail", t.task.taskId))
      }, "查看任务进展")
    ]))], 64)) : (i(), d("div", xs, [...a[8] || (a[8] = [e("h3", null, "委托状态已更新", -1), e("p", null, "请返回“我发布”查看最新进展或已结束记录。", -1)])]))]));
  }
}), Ds = As, qs = ["aria-label"], Ls = { id: "tasks-confirm-title" }, Ps = { class: "tasks-dialog-copy" }, Es = {
  key: 0,
  class: "tasks-dialog-error",
  role: "alert"
}, Ns = {
  key: 1,
  class: "tasks-hint"
}, Vs = ["disabled"], js = ["disabled"], Hs = /* @__PURE__ */ A({
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
    const a = o, s = p(null);
    fe(() => s.value?.showModal());
    function f($) {
      if ($.stopPropagation(), $.key !== "Tab") return;
      const r = Array.from(s.value?.querySelectorAll("button:not(:disabled)") ?? []), v = r[0], H = r.at(-1);
      if (!v) {
        $.preventDefault();
        return;
      }
      $.shiftKey && document.activeElement === v ? ($.preventDefault(), H?.focus()) : !$.shiftKey && document.activeElement === H && ($.preventDefault(), v.focus());
    }
    return ($, r) => (i(), d("dialog", {
      ref_key: "dialog",
      ref: s,
      class: "tasks-dialog",
      "aria-label": t.title,
      onCancel: r[2] || (r[2] = ge((v) => !t.busy && a("close"), ["prevent"])),
      onKeydown: f
    }, [
      e("h2", Ls, u(t.title), 1),
      e("div", Ps, [Fe($.$slots, "default")]),
      t.error ? (i(), d("p", Es, u(t.error), 1)) : b("", !0),
      t.disabledReason && !t.busy ? (i(), d("p", Ns, u(t.disabledReason), 1)) : b("", !0),
      e("footer", null, [e("button", {
        type: "button",
        class: "tasks-secondary-button",
        disabled: t.busy,
        autofocus: "",
        onClick: r[0] || (r[0] = (v) => a("close"))
      }, "返回", 8, Vs), e("button", {
        type: "button",
        class: "tasks-primary-button",
        disabled: t.busy || !!t.disabledReason,
        onClick: r[1] || (r[1] = (v) => a("confirm"))
      }, u(t.busy ? "正在保存…" : t.confirmLabel), 9, js)])
    ], 40, qs));
  }
}), Us = Hs, Zs = { class: "tasks-app-header" }, Os = {
  class: "tasks-balance",
  "aria-label": "小白币余额"
}, Ks = {
  class: "tasks-notices",
  "aria-live": "polite"
}, Fs = ["disabled"], zs = ["disabled"], Qs = ["disabled"], Gs = {
  key: 1,
  class: "tasks-notice",
  role: "status"
}, Js = {
  key: 0,
  class: "tasks-nav",
  "aria-label": "任务主导航"
}, Ws = ["aria-current"], Xs = ["aria-current"], Ys = ["aria-current"], _s = { key: 0 }, el = ["aria-current"], tl = { class: "tasks-confirm-name" }, al = { class: "tasks-confirm-amount" }, sl = { class: "tasks-confirm-name" }, ll = {
  key: 0,
  class: "tasks-confirm-amount"
}, nl = { class: "tasks-confirm-name" }, il = 35e3, rl = /* @__PURE__ */ A({
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
      return l && typeof l == "object" ? structuredClone(me(l)) : a();
    }
    function f(l) {
      return l !== null && typeof l == "object" && !Array.isArray(l);
    }
    function $(l) {
      return f(l) ? l.result : null;
    }
    const r = p(s(o.initialState)), v = p("board"), H = p("board"), X = p(null), g = p(null), Y = B(() => g.value?.kind === "cancel" && g.value.task.source === "received"), Z = p(null), le = p(""), te = p("all"), G = p(null), ne = {}, ie = B(() => et(r.value)), $e = B(() => ie.value.received), re = B(() => ie.value.published), pe = B(() => [...re.value, ...r.value.history.items].find((l) => l.taskId === le.value) ?? null), Ce = B(() => r.value.board?.boardId === Z.value?.boardId ? r.value.board?.listings.find((l) => l.listingId === Z.value?.listingId) ?? null : null), O = B(() => [
      "board",
      "active",
      "published",
      "history"
    ].includes(v.value)), Ie = B(() => ({
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
    let K = 0;
    const ue = B(() => r.value.generation.state === "running" && r.value.generation.kind === "board"), de = B(() => r.value.generation.state === "running" && r.value.generation.kind === "candidates" ? r.value.generation.taskId ?? "" : ""), M = p(!1), _ = p(!1), T = p(!1), ae = p(!1), ee = p(!1), h = p(""), j = p("");
    let R = 0, S = !1, oe = () => {
    };
    const ve = B(() => r.value.status === "unconfirmed"), L = B(() => M.value ? "正在处理上一项任务操作" : r.value.status === "loading" ? "任务数据正在准备" : r.value.status === "saving" ? "任务与资金正在保存" : r.value.status === "unconfirmed" ? "请先核实上一次保存结果" : r.value.status === "conflict" ? "请先采用服务端数据" : r.value.status === "blocked" ? r.value.message || "任务暂时不可用" : r.value.generationActive ? "正在生成内容，请稍后" : ""), F = B(() => L.value || (r.value.maintenance.state === "running" ? "正在更新任务" : "")), we = B(() => r.value.maintenance.message);
    function ke(l) {
      if (!l || typeof l.chatIdentity != "string") return;
      r.value = structuredClone(l), h.value = "";
      const n = X.value?.task;
      if (v.value === "detail" && n) {
        const k = [
          ...l.active,
          ...l.recruiting,
          ...l.history.items
        ].find((I) => I.taskId === n.taskId);
        k && k.eventId !== n.eventId && J(k.taskId, !0);
      }
    }
    function Te(l) {
      if (!f(l)) return null;
      const n = f(l.state) ? l.state : l;
      return typeof n.chatIdentity == "string" ? n : null;
    }
    function P(l) {
      const n = l instanceof Error ? l.message : String(l);
      return n === "tasks_insufficient_funds" ? "小白币余额不足，任务没有发布。" : n === "tasks_state_changed" || n === "tasks_listing_already_accepted" ? "任务状态已经变化，请按最新状态重试。" : n === "tasks_terminal" ? "该任务已经结束，不能再次操作。" : n === "tasks_publish_invalid" || n === "tasks_request_invalid" ? "任务内容不完整或超出允许范围。" : n === "tasks_write_blocked" || n === "tasks_generation_active" ? "当前有生成或保存正在进行，请稍后重试。" : n === "tasks_chat_changed" ? "聊天已经切换，请重新打开任务。" : n === "host_request_timeout" ? "操作响应超时，结果可能稍后返回，请勿立即重复。" : "任务操作未完成，请稍后重试。";
    }
    async function D(l, n = {}, k = il) {
      return $(await o.bridge.request(l, {
        chatIdentity: r.value.chatIdentity,
        ...n
      }, k));
    }
    function E(l, n) {
      if (R !== n) return;
      const k = Te(l);
      k?.chatIdentity === r.value.chatIdentity && ke(k);
    }
    function U(l) {
      j.value = l, h.value = "";
    }
    async function Re() {
      if (ue.value || F.value) return;
      h.value = "";
      const l = R;
      try {
        const n = await D("tasks/refresh");
        if (!S) return;
        E(n, l);
      } catch (n) {
        S && (h.value = P(n));
      }
    }
    async function Be(l, n) {
      if (L.value) return;
      M.value = !0;
      const k = R;
      try {
        E(await D("tasks/board/accept", {
          boardId: l,
          listingId: n
        }), k), S && v.value === "listing" && C("active"), U("任务已接取，报酬已进入托管。");
      } catch (I) {
        h.value = P(I);
      } finally {
        M.value = !1;
      }
    }
    async function Me(l) {
      if (de.value || F.value) return;
      h.value = "";
      const n = R;
      try {
        const k = await D("tasks/candidates/refresh", {
          taskId: l.taskId,
          expectedTaskRevision: l.taskRevision,
          expectedEventId: l.eventId
        });
        if (!S) return;
        E(k, n);
      } catch (k) {
        S && (h.value = P(k));
      }
    }
    async function Se(l, n) {
      if (L.value) return;
      M.value = !0;
      const k = R;
      try {
        E(await D("tasks/candidates/assign", {
          taskId: l.taskId,
          expectedTaskRevision: l.taskRevision,
          expectedEventId: l.eventId,
          candidateId: n
        }), k), g.value = null, S && C("published"), U("执行者已确认，任务进入进行中。");
      } catch (I) {
        h.value = P(I);
      } finally {
        M.value = !1;
      }
    }
    async function xe(l) {
      if (L.value) return;
      M.value = !0;
      const n = R;
      try {
        E(await D("tasks/cancel", {
          taskId: l.taskId,
          expectedTaskRevision: l.taskRevision,
          expectedEventId: l.eventId
        }), n), g.value = null, S && C(l.source === "received" ? "active" : "published"), U(l.source === "received" ? "已放弃任务，不会扣除小白币。" : "委托已取消，托管报酬已退回钱包。");
      } catch (k) {
        h.value = P(k);
      } finally {
        M.value = !1;
      }
    }
    function Ae(l) {
      L.value || (h.value = "", g.value = {
        kind: "publish",
        form: structuredClone(l)
      });
    }
    async function De() {
      const l = g.value?.kind === "publish" ? g.value.form : null;
      if (!l || L.value) return;
      M.value = !0;
      const n = R;
      try {
        E(await D("tasks/publish", { form: me(l) }), n), g.value = null, C("published"), U("任务已发布，报酬已锁入托管。");
      } catch (k) {
        h.value = P(k);
      } finally {
        M.value = !1;
      }
    }
    async function qe(l) {
      if (_.value) return;
      _.value = !0;
      const n = R;
      try {
        E(await D("tasks/settings/update", { autoMaintenance: l }), n), U(l ? "已开启任务进展自动更新。" : "已关闭任务进展自动更新。");
      } catch (k) {
        h.value = P(k);
      } finally {
        _.value = !1;
      }
    }
    async function Le() {
      if (r.value.maintenance.state === "running" || F.value) return;
      const l = R;
      try {
        E(await D("tasks/maintenance/run"), l);
      } catch (n) {
        h.value = P(n);
      }
    }
    async function J(l, n = !1) {
      n || ((O.value || v.value === "recruit") && (H.value = v.value), C("detail"), X.value = null, ae.value = !0);
      const k = ++K;
      try {
        const I = await D("tasks/detail/read", { taskId: l });
        if (!S || k !== K) return;
        f(I) && f(I.task) && Array.isArray(I.timeline) && (X.value = structuredClone(I));
      } catch (I) {
        S && k === K && (h.value = P(I));
      } finally {
        S && k === K && (ae.value = !1);
      }
    }
    async function Pe() {
      const l = r.value.history.nextCursor;
      if (!l || ee.value) return;
      ee.value = !0;
      const n = {
        cursor: l,
        stateVersion: R
      };
      try {
        const k = await D("tasks/history/load-more", { cursor: l });
        if (S && f(k) && Array.isArray(k.items)) {
          const I = k, ye = Ga(r.value.history, I, n, R);
          ye && (r.value.history = ye);
        }
      } catch (k) {
        h.value = P(k);
      } finally {
        ee.value = !1;
      }
    }
    async function Ee() {
      if (T.value) return;
      T.value = !0, h.value = "", j.value = "";
      const l = R;
      try {
        const n = await D("tasks/save/confirm");
        E(n, l), f(n) && n.confirmation === "confirmed" && U("保存已确认。");
      } catch (n) {
        h.value = P(n);
      } finally {
        T.value = !1;
      }
    }
    async function Ne() {
      if (T.value) return;
      T.value = !0, h.value = "", j.value = "";
      const l = R;
      try {
        const n = await D("tasks/save/adopt-server");
        E(n, l), f(n) && n.adoption === "adopted" && U("已采用服务端数据。");
      } catch (n) {
        h.value = P(n);
      } finally {
        T.value = !1;
      }
    }
    async function Ve() {
      if (T.value) return;
      T.value = !0, h.value = "", j.value = "";
      const l = R;
      try {
        E(await D("tasks/read"), l);
      } catch {
        h.value = "读取未完成，请检查存储连接后重试读取。";
      } finally {
        T.value = !1;
      }
    }
    function C(l, n = !1) {
      j.value = "", l === "settings" && O.value && (H.value = v.value), ne[v.value] = {
        scrollTop: G.value?.scrollTop ?? 0,
        focusKey: document.activeElement instanceof HTMLElement ? document.activeElement.dataset.navigationId ?? "" : ""
      }, K += 1, v.value = l, Ge(() => {
        if (!S || v.value !== l) return;
        const k = n ? ne[l] : void 0;
        G.value?.scrollTo(0, k?.scrollTop ?? 0), ((k?.focusKey ? Array.from(G.value?.closest("main")?.querySelectorAll("button[data-navigation-id]") ?? []).find((I) => I.dataset.navigationId === k.focusKey) : void 0) ?? G.value)?.focus({ preventScroll: !0 });
      });
    }
    function ce() {
      C(v.value === "detail" || v.value === "settings" ? H.value : v.value === "listing" ? "board" : "published", !0);
    }
    function je(l, n) {
      Z.value = {
        boardId: l,
        listingId: n
      }, C("listing");
    }
    function He(l) {
      l.status === "recruiting" ? (le.value = l.taskId, C("recruit")) : J(l.taskId);
    }
    function Ue() {
      te.value = "published", C("history");
    }
    function be(l) {
      h.value = "", g.value = {
        kind: "cancel",
        task: l
      };
    }
    function Ze(l, n) {
      h.value = "", g.value = {
        kind: "assign",
        task: l,
        candidateId: n
      };
    }
    function Oe() {
      const l = g.value;
      l && (l.kind === "publish" ? De() : l.kind === "cancel" ? xe(l.task) : Se(l.task, l.candidateId));
    }
    function Ke(l) {
      l.key === "Escape" && !O.value && (l.stopPropagation(), l.preventDefault(), ce());
    }
    return fe(() => {
      S = !0, oe = o.bridge.subscribe((l) => {
        if (l.type === "tasks/state") {
          const n = l.payload?.state;
          n && (R += 1, ke(n));
        }
        l.type === "tasks/error" && (h.value = "任务状态暂时无法读取，请重新打开。");
      }), o.bridge.post("tasks/activate", { chatIdentity: r.value.chatIdentity });
    }), Je(() => {
      S = !1, K += 1, oe(), g.value = null;
    }), (l, n) => (i(), d("main", {
      class: "tasks-app",
      onKeydown: Ke
    }, [
      e("header", Zs, [
        O.value ? b("", !0) : (i(), d("button", {
          key: 0,
          type: "button",
          class: "tasks-icon-button",
          "aria-label": "返回上一页",
          onClick: ce
        }, [y(m, { name: "back" })])),
        e("h1", null, u(Ie.value), 1),
        e("div", Os, [e("strong", null, "¤ " + u(q(N)(r.value.playerBalance)), 1)]),
        O.value ? (i(), d("button", {
          key: 1,
          type: "button",
          class: "tasks-icon-button",
          "aria-label": "任务设置",
          "data-navigation-id": "settings",
          onClick: n[0] || (n[0] = (k) => C("settings"))
        }, [y(m, { name: "settings" })])) : b("", !0)
      ]),
      e("div", Ks, [r.value.message || h.value && !g.value || j.value ? (i(), d("aside", {
        key: 0,
        class: W(["tasks-notice", {
          "is-error": !!h.value || r.value.status === "conflict" || r.value.status === "blocked",
          "is-warning": ve.value
        }]),
        role: "status"
      }, [e("div", null, [e("p", null, u(r.value.message || (g.value ? "" : h.value) || j.value), 1), ve.value ? (i(), d("button", {
        key: 0,
        type: "button",
        disabled: T.value,
        onClick: Ee
      }, u(T.value ? "正在核实…" : "核实保存结果"), 9, Fs)) : r.value.status === "conflict" ? (i(), d("button", {
        key: 1,
        type: "button",
        disabled: T.value,
        onClick: Ne
      }, u(T.value ? "正在采用…" : "采用服务端数据"), 9, zs)) : r.value.status === "blocked" ? (i(), d("button", {
        key: 2,
        type: "button",
        disabled: T.value,
        onClick: Ve
      }, u(T.value ? "正在读取…" : "重试读取"), 9, Qs)) : b("", !0)]), r.value.message ? b("", !0) : (i(), d("button", {
        key: 0,
        type: "button",
        class: "tasks-icon-button",
        "aria-label": "关闭提示",
        onClick: n[1] || (n[1] = (k) => {
          h.value = "", j.value = "";
        })
      }, [y(m, { name: "close" })]))], 2)) : b("", !0), r.value.generation.message && !r.value.message ? (i(), d("aside", Gs, [e("p", null, u(r.value.generation.message), 1)])) : b("", !0)]),
      e("div", {
        ref_key: "content",
        ref: G,
        class: "tasks-content",
        tabindex: "-1"
      }, [v.value === "board" ? (i(), x($a, {
        key: 0,
        board: r.value.board,
        busy: ue.value,
        "disabled-reason": F.value,
        onRefresh: Re,
        onDetail: je
      }, null, 8, [
        "board",
        "busy",
        "disabled-reason"
      ])) : v.value === "active" ? (i(), x(ea, {
        key: 1,
        records: $e.value,
        onDetail: J,
        onDiscover: n[2] || (n[2] = (k) => C("board"))
      }, null, 8, ["records"])) : v.value === "published" ? (i(), x(Ea, {
        key: 2,
        records: re.value,
        "disabled-reason": L.value,
        onOpen: He,
        onPublish: n[3] || (n[3] = (k) => C("publish")),
        onHistory: Ue
      }, null, 8, ["records", "disabled-reason"])) : v.value === "history" ? (i(), x(Ma, {
        key: 3,
        history: r.value.history,
        loading: ee.value,
        source: te.value,
        onFilter: n[4] || (n[4] = (k) => te.value = k),
        onDetail: J,
        onLoadMore: Pe
      }, null, 8, [
        "history",
        "loading",
        "source"
      ])) : v.value === "settings" ? (i(), x(Qa, {
        key: 4,
        "auto-maintenance": r.value.settings.autoMaintenance,
        "settings-busy": _.value,
        "maintenance-busy": r.value.maintenance.state === "running",
        "maintenance-message": we.value,
        "disabled-reason": F.value,
        onUpdate: qe,
        onMaintain: Le
      }, null, 8, [
        "auto-maintenance",
        "settings-busy",
        "maintenance-busy",
        "maintenance-message",
        "disabled-reason"
      ])) : v.value === "publish" ? (i(), x(jt, {
        key: 5,
        balance: r.value.playerBalance,
        busy: M.value,
        "disabled-reason": L.value,
        onSubmit: Ae
      }, null, 8, [
        "balance",
        "busy",
        "disabled-reason"
      ])) : v.value === "listing" ? (i(), x(vs, {
        key: 6,
        listing: Ce.value,
        busy: M.value,
        "disabled-reason": L.value,
        onAccept: n[5] || (n[5] = (k) => Z.value && Be(Z.value.boardId, Z.value.listingId))
      }, null, 8, [
        "listing",
        "busy",
        "disabled-reason"
      ])) : v.value === "recruit" ? (i(), x(Ds, {
        key: 7,
        task: pe.value,
        busy: M.value,
        recruiting: !!de.value,
        "disabled-reason": L.value,
        "generation-disabled-reason": F.value,
        onRecruit: Me,
        onAssign: Ze,
        onCancel: be,
        onDetail: J
      }, null, 8, [
        "task",
        "busy",
        "recruiting",
        "disabled-reason",
        "generation-disabled-reason"
      ])) : (i(), x(It, {
        key: 8,
        detail: X.value,
        loading: ae.value,
        busy: M.value,
        "disabled-reason": L.value,
        onCancel: be
      }, null, 8, [
        "detail",
        "loading",
        "busy",
        "disabled-reason"
      ]))], 512),
      O.value ? (i(), d("nav", Js, [
        e("button", {
          type: "button",
          "aria-label": "发现委托",
          "aria-current": v.value === "board" ? "page" : void 0,
          onClick: n[6] || (n[6] = (k) => C("board"))
        }, [e("span", null, [y(m, { name: "compass" })]), n[11] || (n[11] = c("发现", -1))], 8, Ws),
        e("button", {
          type: "button",
          "aria-label": "我接的",
          "aria-current": v.value === "active" ? "page" : void 0,
          onClick: n[7] || (n[7] = (k) => C("active"))
        }, [e("span", null, [y(m, { name: "ticket" })]), n[12] || (n[12] = c("我接的", -1))], 8, Xs),
        e("button", {
          type: "button",
          "aria-label": "我发布",
          "aria-current": v.value === "published" ? "page" : void 0,
          onClick: n[8] || (n[8] = (k) => C("published"))
        }, [e("span", null, [y(m, { name: "send" }), r.value.recruiting.length ? (i(), d("i", _s)) : b("", !0)]), n[13] || (n[13] = c("我发布", -1))], 8, Ys),
        e("button", {
          type: "button",
          "aria-label": "记录",
          "aria-current": v.value === "history" ? "page" : void 0,
          onClick: n[9] || (n[9] = (k) => C("history"))
        }, [e("span", null, [y(m, { name: "archive" })]), n[14] || (n[14] = c("记录", -1))], 8, el)
      ])) : b("", !0),
      g.value ? (i(), x(Us, {
        key: 1,
        title: g.value.kind === "publish" ? "确认发布" : g.value.kind === "cancel" ? Y.value ? "放弃任务？" : "取消委托？" : "确认执行者",
        "confirm-label": g.value.kind === "publish" ? "托管并发布" : g.value.kind === "cancel" ? Y.value ? "确认放弃" : "取消并退款" : "确认委托",
        busy: M.value,
        "disabled-reason": L.value,
        error: h.value,
        onClose: n[10] || (n[10] = (k) => {
          g.value = null, h.value = "";
        }),
        onConfirm: Oe
      }, {
        default: Qe(() => [g.value.kind === "publish" ? (i(), d(w, { key: 0 }, [
          e("p", tl, u(g.value.form.title), 1),
          e("strong", al, "¤ " + u(q(N)(g.value.form.reward)), 1),
          n[15] || (n[15] = e("p", null, "报酬将从钱包托管。发布后可招募执行者；任务结束前，你可以取消并全额退回报酬。", -1))
        ], 64)) : g.value.kind === "cancel" ? (i(), d(w, { key: 1 }, [
          e("p", sl, u(g.value.task.title), 1),
          Y.value ? b("", !0) : (i(), d("strong", ll, "¤ " + u(q(N)(g.value.task.reward)), 1)),
          e("p", null, u(Y.value ? "放弃后不再获得任务报酬，也不会扣除你的小白币。" : "取消后，托管报酬将全额退回你的钱包。"), 1),
          n[16] || (n[16] = e("p", null, "任务将移入记录，不再参与后续剧情提醒与进展更新。此操作无法撤销。", -1))
        ], 64)) : (i(), d(w, { key: 2 }, [e("p", nl, u(g.value.task.candidates.find((k) => k.candidateId === (g.value?.kind === "assign" ? g.value.candidateId : ""))?.name), 1), e("p", null, "确认后开始执行“" + u(g.value.task.title) + "”。完成后，托管报酬将支付给执行者。", 1)], 64))]),
        _: 1
      }, 8, [
        "title",
        "confirm-label",
        "busy",
        "disabled-reason",
        "error"
      ])) : b("", !0)
    ], 32));
  }
}), dl = rl;
export {
  dl as default
};
