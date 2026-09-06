/* eslint-disable */
import { B as J, C as fe, D as Fe, E, F as Ke, H as u, I as p, M as ze, N as z, R as me, T as i, _ as c, a as Q, c as ge, d as e, f as D, g as b, l as C, m as d, p as f, u as T, v as x, x as Qe, z as P } from "./xiaobai-os-runtime-dom.esm-bundler-DwdCK5Jt.js";
var Ge = {
  class: "tasks-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.7",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, Je = ["d"], We = /* @__PURE__ */ x({
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
    return (a, s) => (i(), d("svg", Ge, [e("path", { d: o[t.name] }, null, 8, Je)]));
  }
}), y = We, $e = {
  recruiting: "招募中",
  active: "进行中",
  completed: "已完成",
  failed: "未完成",
  cancelled: "已取消"
};
function V(t) {
  return t.toLocaleString("zh-CN");
}
function Xe(t) {
  return t.source === "received" ? "任务终端" : `${t.issuer.displayName}（你）`;
}
function Ye(t) {
  return {
    received: t.active.filter((o) => o.source === "received"),
    published: [...t.recruiting, ...t.active.filter((o) => o.source === "published")].sort((o, a) => a.updatedAt - o.updatedAt || a.taskId.localeCompare(o.taskId))
  };
}
var _e = { class: "tasks-page tasks-detail-page" }, et = {
  key: 0,
  class: "tasks-empty",
  role: "status"
}, tt = { class: "tasks-contract-sheet" }, at = { class: "tasks-contract-heading" }, st = ["data-status"], lt = { key: 0 }, nt = { class: "tasks-contract-reward" }, it = { class: "tasks-seal" }, rt = { class: "tasks-party-line" }, ut = { class: "tasks-facts" }, dt = { key: 0 }, ot = { key: 1 }, vt = {
  key: 2,
  class: "is-risk"
}, kt = { class: "tasks-progress-summary" }, bt = { class: "tasks-eyebrow" }, ct = {
  key: 0,
  class: "tasks-withdraw"
}, yt = ["disabled"], mt = {
  key: 0,
  class: "tasks-hint"
}, ft = { class: "tasks-timeline" }, gt = {
  key: 2,
  class: "tasks-empty"
}, $t = /* @__PURE__ */ x({
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
    return (a, s) => (i(), d("section", _e, [t.loading ? (i(), d("div", et, [c(y, {
      name: "refresh",
      class: "is-spinning"
    }), s[1] || (s[1] = e("h3", null, "正在展开这份委托…", -1))])) : t.detail ? (i(), d(C, { key: 1 }, [
      e("article", tt, [
        e("header", at, [
          e("span", {
            class: "tasks-status",
            "data-status": t.detail.task.status
          }, [s[2] || (s[2] = e("i", null, null, -1)), b(u(P($e)[t.detail.task.status]), 1)], 8, st),
          e("h2", null, u(t.detail.task.title), 1),
          t.detail.task.hook ? (i(), d("p", lt, u(t.detail.task.hook), 1)) : f("", !0)
        ]),
        e("div", nt, [e("span", null, [s[4] || (s[4] = b("委托报酬", -1)), e("strong", null, [s[3] || (s[3] = e("small", null, "¤", -1)), b(" " + u(P(V)(t.detail.task.reward)), 1)])]), e("span", it, [c(y, { name: "ticket" }), b(u(t.detail.task.source === "received" ? "终端委托" : "我的委托"), 1)])]),
        e("div", rt, [
          e("span", null, [s[5] || (s[5] = b("发布者", -1)), e("strong", null, u(P(Xe)(t.detail.task)), 1)]),
          c(y, { name: "next" }),
          e("span", null, [s[6] || (s[6] = b("执行者", -1)), e("strong", null, u(t.detail.task.assignee?.displayName || "等待选人"), 1)])
        ]),
        e("dl", ut, [
          e("div", null, [s[7] || (s[7] = e("dt", null, "完成目标", -1)), e("dd", null, u(t.detail.task.objective), 1)]),
          t.detail.task.requirements ? (i(), d("div", dt, [s[8] || (s[8] = e("dt", null, "执行约束", -1)), e("dd", null, u(t.detail.task.requirements), 1)])) : f("", !0),
          e("div", null, [s[9] || (s[9] = e("dt", null, "行动地点", -1)), e("dd", null, u(t.detail.task.location), 1)]),
          t.detail.task.timing ? (i(), d("div", ot, [s[10] || (s[10] = e("dt", null, "行动时机", -1)), e("dd", null, u(t.detail.task.timing), 1)])) : f("", !0),
          t.detail.task.risk ? (i(), d("div", vt, [s[11] || (s[11] = e("dt", null, "留意风险", -1)), e("dd", null, u(t.detail.task.risk), 1)])) : f("", !0)
        ])
      ]),
      e("section", kt, [e("span", bt, u(t.detail.task.resultSummary ? "最终结果" : "当前进展"), 1), e("p", null, u(t.detail.task.resultSummary || t.detail.task.progressSummary || "还没有已确认的进展，下一步在故事中发生。"), 1)]),
      t.detail.task.status === "active" || t.detail.task.status === "recruiting" ? (i(), d("div", ct, [
        e("p", null, u(t.detail.task.source === "received" ? "不打算继续这份委托了？" : "不再需要这份委托了？"), 1),
        e("button", {
          type: "button",
          class: "tasks-text-button is-danger",
          disabled: t.busy || !!t.disabledReason,
          onClick: s[0] || (s[0] = (m) => a.$emit("cancel", t.detail.task))
        }, u(t.detail.task.source === "received" ? "放弃任务" : "取消委托并退回报酬"), 9, yt),
        t.disabledReason ? (i(), d("p", mt, u(t.disabledReason), 1)) : f("", !0)
      ])) : f("", !0),
      e("section", ft, [s[13] || (s[13] = e("h3", null, "一路走来", -1)), e("ol", null, [(i(!0), d(C, null, E(t.detail.timeline, (m) => (i(), d("li", { key: m.eventId }, [s[12] || (s[12] = e("i", null, null, -1)), e("div", null, [e("small", null, u(o(m.createdAt)), 1), e("p", null, u(m.summary), 1)])]))), 128))])])
    ], 64)) : (i(), d("div", gt, [...s[14] || (s[14] = [e("h3", null, "这份委托暂时无法读取", -1), e("p", null, "请返回后重试。", -1)])]))]));
  }
}), ht = $t, pt = { class: "tasks-page tasks-publish-page" }, wt = ["disabled"], Ct = { class: "tasks-form-group" }, It = { class: "tasks-form-extra" }, Rt = { class: "tasks-form-group" }, Tt = { class: "tasks-reward-editor" }, Bt = { class: "tasks-amount-input" }, Mt = ["max"], xt = { class: "tasks-reward-presets" }, St = [
  "aria-pressed",
  "disabled",
  "onClick"
], At = {
  key: 0,
  class: "tasks-error-text",
  role: "status"
}, Dt = { class: "tasks-hint" }, qt = {
  key: 0,
  class: "tasks-hint"
}, Lt = ["disabled"], Pt = /* @__PURE__ */ x({
  __name: "TaskPublishForm",
  props: {
    balance: {},
    busy: { type: Boolean },
    disabledReason: {}
  },
  emits: ["submit"],
  setup(t, { emit: o }) {
    const a = o, s = Ke({
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
    return (h, r) => (i(), d("section", pt, [r[17] || (r[17] = e("header", { class: "tasks-page-heading" }, [
      e("span", { class: "tasks-eyebrow" }, "一份清楚的托付"),
      e("h2", null, "你希望谁，做成什么？"),
      e("p", null, "发布后再招募、选择执行者。")
    ], -1)), e("form", {
      class: "tasks-publish-form",
      onSubmit: ge(m, ["prevent"])
    }, [
      e("fieldset", { disabled: t.busy }, [
        r[15] || (r[15] = e("legend", { class: "tasks-sr-only" }, "委托内容", -1)),
        e("div", Ct, [
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
        e("details", It, [r[11] || (r[11] = e("summary", null, [b("补充约束与风险 "), e("span", null, "选填")], -1)), e("div", Rt, [e("label", null, [r[9] || (r[9] = e("span", null, "执行约束", -1)), z(e("textarea", {
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
        e("div", Tt, [
          e("label", null, [r[13] || (r[13] = e("span", null, [b("为这份委托设定报酬 "), e("b", null, "*")], -1)), e("span", Bt, [r[12] || (r[12] = e("i", null, "¤", -1)), z(e("input", {
            "onUpdate:modelValue": r[5] || (r[5] = (v) => s.reward = v),
            "aria-label": "托管报酬",
            type: "number",
            required: "",
            min: "1",
            max: t.balance,
            step: "1"
          }, null, 8, Mt), [[
            Q,
            s.reward,
            void 0,
            { number: !0 }
          ]])])]),
          e("div", xt, [(i(), d(C, null, E([
            20,
            50,
            100
          ], (v) => e("button", {
            key: v,
            type: "button",
            "aria-pressed": Number(s.reward) === v,
            disabled: v > t.balance,
            onClick: (j) => s.reward = v
          }, "¤ " + u(v), 9, St)), 64))]),
          e("p", null, [r[14] || (r[14] = b("可用余额 ", -1)), e("strong", null, "¤ " + u(P(V)(t.balance)), 1)]),
          Number(s.reward) > t.balance ? (i(), d("p", At, "报酬超出可用余额，请调整金额。")) : f("", !0)
        ])
      ], 8, wt),
      e("p", Dt, [c(y, { name: "ticket" }), r[16] || (r[16] = b("发布时托管报酬；招募期间可撤回退款，选定执行者后不可撤回。", -1))]),
      t.disabledReason ? (i(), d("p", qt, u(t.disabledReason), 1)) : f("", !0),
      e("button", {
        type: "submit",
        class: "tasks-primary-button tasks-full-button",
        disabled: t.busy || !!t.disabledReason || Number(s.reward) > t.balance
      }, [b(u(t.busy ? "正在发布…" : "预览并发布"), 1), c(y, { name: "next" })], 8, Lt)
    ], 32)]));
  }
}), Nt = Pt, Vt = { class: "tasks-record-top" }, Et = ["data-status"], jt = { class: "tasks-reward" }, Ht = { class: "tasks-record-title" }, Ut = { class: "tasks-record-summary" }, Zt = { class: "tasks-record-foot" }, Ot = /* @__PURE__ */ x({
  __name: "TaskRecordCard",
  props: { task: {} },
  emits: ["open"],
  setup(t) {
    return (o, a) => (i(), d("button", {
      type: "button",
      class: "tasks-record",
      onClick: a[0] || (a[0] = (s) => o.$emit("open", t.task))
    }, [
      e("span", Vt, [e("span", {
        class: "tasks-status",
        "data-status": t.task.status
      }, [a[1] || (a[1] = e("i", null, null, -1)), b(u(P($e)[t.task.status]), 1)], 8, Et), e("span", jt, [a[2] || (a[2] = e("small", null, "¤", -1)), b(" " + u(P(V)(t.task.reward)), 1)])]),
      e("strong", Ht, u(t.task.title), 1),
      e("span", Ut, u(t.task.resultSummary || t.task.progressSummary || (t.task.status === "recruiting" ? "委托已发布，等待你选择执行者。" : "任务已开始，等待新的进展。")), 1),
      e("span", Zt, [e("span", null, [c(y, { name: t.task.source === "received" ? "pin" : "people" }, null, 8, ["name"]), b(u(t.task.source === "received" ? t.task.location : t.task.assignee?.displayName || `${t.task.candidates.length} 位候选人`), 1)]), c(y, { name: "next" })])
    ]));
  }
}), le = Ot, Ft = { class: "tasks-page" }, Kt = {
  key: 0,
  class: "tasks-empty"
}, zt = { class: "tasks-empty-mark" }, Qt = {
  key: 1,
  class: "tasks-record-list"
}, Gt = /* @__PURE__ */ x({
  __name: "TasksActive",
  props: { records: {} },
  emits: ["detail", "discover"],
  setup(t) {
    return (o, a) => (i(), d("section", Ft, [a[3] || (a[3] = e("header", { class: "tasks-page-heading" }, [
      e("span", { class: "tasks-eyebrow" }, "由你执行"),
      e("h2", null, "每一步，都算数。"),
      e("p", null, "在故事中行动，在这里查看已确认的进展。")
    ], -1)), t.records.length ? (i(), d("div", Qt, [(i(!0), d(C, null, E(t.records, (s) => (i(), D(le, {
      key: s.taskId,
      task: s,
      onOpen: (m) => o.$emit("detail", s.taskId)
    }, null, 8, ["task", "onOpen"]))), 128))])) : (i(), d("div", Kt, [
      e("span", zt, [c(y, { name: "compass" })]),
      a[1] || (a[1] = e("h3", null, "还没有进行中的委托", -1)),
      a[2] || (a[2] = e("p", null, "到大厅选一份委托，开启下一段经历。", -1)),
      e("button", {
        type: "button",
        class: "tasks-primary-button",
        onClick: a[0] || (a[0] = (s) => o.$emit("discover"))
      }, "去发现委托")
    ]))]));
  }
}), Jt = Gt, Wt = { class: "tasks-page tasks-board-page" }, Xt = { class: "tasks-hero" }, Yt = {
  class: "tasks-hero-art",
  "aria-hidden": "true"
}, _t = { class: "tasks-paper" }, ea = { class: "tasks-section-heading" }, ta = { key: 0 }, aa = ["disabled"], sa = {
  key: 0,
  class: "tasks-hint",
  role: "status"
}, la = {
  key: 1,
  class: "tasks-empty"
}, na = { class: "tasks-empty-mark" }, ia = ["disabled"], ra = ["aria-busy"], ua = ["onClick"], da = { class: "tasks-ticket-top" }, oa = ["data-grade"], va = { class: "tasks-ticket-tags" }, ka = {
  key: 0,
  class: "tasks-accepted"
}, ba = {
  key: 1,
  class: "tasks-ticket-posture"
}, ca = { class: "tasks-ticket-title" }, ya = { class: "tasks-ticket-hook" }, ma = { class: "tasks-ticket-location" }, fa = { class: "tasks-ticket-foot" }, ga = { class: "tasks-reward" }, $a = { class: "tasks-ticket-open" }, ha = /* @__PURE__ */ x({
  __name: "TasksBoard",
  props: {
    board: {},
    busy: { type: Boolean },
    disabledReason: {}
  },
  emits: ["refresh", "detail"],
  setup(t) {
    return (o, a) => (i(), d("section", Wt, [
      e("div", Xt, [a[6] || (a[6] = e("div", null, [
        e("span", { class: "tasks-eyebrow" }, "由任务终端发布"),
        e("h2", null, [
          b("下一段故事，"),
          e("br"),
          b("从这里开始。")
        ]),
        e("p", null, "接下一份委托，让行动有所回响。")
      ], -1)), e("div", Yt, [a[5] || (a[5] = e("div", { class: "tasks-paper is-back" }, null, -1)), e("div", _t, [
        a[2] || (a[2] = e("i", null, null, -1)),
        a[3] || (a[3] = e("i", null, null, -1)),
        a[4] || (a[4] = e("i", null, null, -1)),
        e("span", null, [c(y, { name: "check" })])
      ])])]),
      e("header", ea, [e("h3", null, [a[7] || (a[7] = b("发现委托 ", -1)), t.board ? (i(), d("small", ta, u(t.board.listings.length), 1)) : f("", !0)]), e("button", {
        type: "button",
        class: "tasks-text-button",
        disabled: t.busy || !!t.disabledReason,
        onClick: a[0] || (a[0] = (s) => o.$emit("refresh"))
      }, [c(y, {
        name: "refresh",
        class: J({ "is-spinning": t.busy })
      }, null, 8, ["class"]), b(u(t.busy ? "正在寻找…" : t.board ? "换一批" : "获取委托"), 1)], 8, aa)]),
      t.disabledReason ? (i(), d("p", sa, u(t.disabledReason), 1)) : f("", !0),
      !t.board || !t.board.listings.length ? (i(), d("div", la, [
        e("span", na, [c(y, { name: "compass" })]),
        e("h3", null, u(t.busy ? "正在寻找新的委托" : "你的下一份委托，在这里"), 1),
        e("p", null, u(t.busy ? "生成会在后台继续，你可以先去别处看看。" : "从当前故事中发现可以行动的机会。"), 1),
        t.busy ? f("", !0) : (i(), d("button", {
          key: 0,
          type: "button",
          class: "tasks-primary-button",
          disabled: !!t.disabledReason,
          onClick: a[1] || (a[1] = (s) => o.$emit("refresh"))
        }, "获取第一批委托", 8, ia))
      ])) : (i(), d("div", {
        key: 2,
        class: "tasks-board-list",
        "aria-busy": t.busy
      }, [(i(!0), d(C, null, E(t.board.listings, (s) => (i(), d("button", {
        key: s.listingId,
        type: "button",
        class: J(["tasks-ticket", { "is-accepted": s.accepted }]),
        onClick: (m) => o.$emit("detail", t.board.boardId, s.listingId)
      }, [
        e("span", da, [
          e("span", {
            class: "tasks-grade",
            "data-grade": s.grade
          }, u(s.grade), 9, oa),
          e("span", va, u(s.tags.slice(0, 2).join(" · ")), 1),
          s.accepted ? (i(), d("span", ka, [c(y, { name: "check" }), a[8] || (a[8] = b("已接取", -1))])) : (i(), d("span", ba, u(s.posture), 1))
        ]),
        e("strong", ca, u(s.title), 1),
        e("span", ya, u(s.hook), 1),
        e("span", ma, [c(y, { name: "pin" }), b(u(s.location), 1)]),
        e("span", fa, [e("span", ga, [
          a[9] || (a[9] = e("small", null, "¤", -1)),
          b(" " + u(P(V)(s.reward)) + " ", 1),
          a[10] || (a[10] = e("em", null, "任务报酬", -1))
        ]), e("span", $a, [a[11] || (a[11] = b("查看委托", -1)), c(y, { name: "next" })])])
      ], 10, ua))), 128))], 8, ra)),
      a[12] || (a[12] = e("p", { class: "tasks-footnote" }, "报酬由任务终端提供 · 接取后自动托管", -1))
    ]));
  }
}), pa = ha, wa = { class: "tasks-page" }, Ca = {
  class: "tasks-filter",
  "aria-label": "记录来源"
}, Ia = ["aria-pressed", "onClick"], Ra = {
  key: 0,
  class: "tasks-empty"
}, Ta = { class: "tasks-empty-mark" }, Ba = {
  key: 1,
  class: "tasks-record-list"
}, Ma = ["disabled"], xa = /* @__PURE__ */ x({
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
    const o = t, a = T(() => o.history.items.filter((s) => o.source === "all" || s.source === o.source));
    return (s, m) => (i(), d("section", wa, [
      m[2] || (m[2] = e("header", { class: "tasks-page-heading" }, [e("span", { class: "tasks-eyebrow" }, "每份委托，都有它的结局"), e("h2", null, "故事的回执。")], -1)),
      e("div", Ca, [(i(), d(C, null, E([
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
      ], (h) => e("button", {
        key: h.id,
        type: "button",
        "aria-pressed": t.source === h.id,
        onClick: (r) => s.$emit("filter", h.id)
      }, u(h.label), 9, Ia)), 64))]),
      a.value.length ? (i(), d("div", Ba, [(i(!0), d(C, null, E(a.value, (h) => (i(), D(le, {
        key: h.taskId,
        task: h,
        onOpen: (r) => s.$emit("detail", h.taskId)
      }, null, 8, ["task", "onOpen"]))), 128))])) : (i(), d("div", Ra, [
        e("span", Ta, [c(y, { name: "archive" })]),
        e("h3", null, u(t.history.hasMore ? "当前已加载的记录中没有匹配项" : "这里还没有留下记录"), 1),
        m[1] || (m[1] = e("p", null, "已完成、未完成和撤回的委托都会保留。", -1))
      ])),
      t.history.hasMore ? (i(), d("button", {
        key: 2,
        type: "button",
        class: "tasks-load-more tasks-secondary-button",
        disabled: t.loading,
        onClick: m[0] || (m[0] = (h) => s.$emit("loadMore"))
      }, u(t.loading ? "正在加载…" : "加载更多记录"), 9, Ma)) : f("", !0)
    ]));
  }
}), Sa = xa, Aa = { class: "tasks-page" }, Da = { class: "tasks-publish-invite" }, qa = { class: "tasks-invite-mark" }, La = ["disabled"], Pa = {
  key: 0,
  class: "tasks-hint"
}, Na = { class: "tasks-section-heading" }, Va = {
  key: 1,
  class: "tasks-inline-empty"
}, Ea = {
  key: 2,
  class: "tasks-record-list"
}, ja = /* @__PURE__ */ x({
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
    return (o, a) => (i(), d("section", Aa, [
      e("div", Da, [
        e("span", qa, [c(y, { name: "send" })]),
        a[3] || (a[3] = e("span", { class: "tasks-eyebrow" }, "你来委托，让故事里的人行动", -1)),
        a[4] || (a[4] = e("h2", null, "有件事，想托付。", -1)),
        a[5] || (a[5] = e("p", null, "写下目标，设定报酬，再选择合适的执行者。", -1)),
        e("button", {
          type: "button",
          class: "tasks-primary-button",
          disabled: !!t.disabledReason,
          onClick: a[0] || (a[0] = (s) => o.$emit("publish"))
        }, [c(y, { name: "plus" }), a[2] || (a[2] = b("发布一份委托", -1))], 8, La)
      ]),
      t.disabledReason ? (i(), d("p", Pa, u(t.disabledReason), 1)) : f("", !0),
      e("header", Na, [e("h3", null, [a[6] || (a[6] = b("我的委托 ", -1)), e("small", null, u(t.records.length), 1)]), e("button", {
        type: "button",
        class: "tasks-text-button",
        onClick: a[1] || (a[1] = (s) => o.$emit("history"))
      }, [a[7] || (a[7] = b("已结束", -1)), c(y, { name: "next" })])]),
      t.records.length ? (i(), d("div", Ea, [(i(!0), d(C, null, E(t.records, (s) => (i(), D(le, {
        key: s.taskId,
        task: s,
        onOpen: (m) => o.$emit("open", s)
      }, null, 8, ["task", "onOpen"]))), 128))])) : (i(), d("div", Va, "你发布的委托会留在这里，直到任务结束。"))
    ]));
  }
}), Ha = ja, Ua = { class: "tasks-page tasks-settings-page" }, Za = { class: "tasks-setting-card" }, Oa = { class: "tasks-setting-row" }, Fa = { class: "tasks-setting-icon" }, Ka = { class: "tasks-switch" }, za = ["checked", "disabled"], Qa = { class: "tasks-setting-card" }, Ga = { class: "tasks-setting-row" }, Ja = { class: "tasks-setting-icon" }, Wa = ["disabled"], Xa = {
  key: 0,
  class: "tasks-hint"
}, Ya = {
  key: 0,
  class: "tasks-maintenance-message",
  role: "status"
}, _a = /* @__PURE__ */ x({
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
    return (o, a) => (i(), d("section", Ua, [
      a[7] || (a[7] = e("header", { class: "tasks-page-heading" }, [e("span", { class: "tasks-eyebrow" }, "让进展跟上故事"), e("h2", null, "任务设置")], -1)),
      e("article", Za, [e("div", Oa, [
        e("span", Fa, [c(y, { name: "refresh" })]),
        a[3] || (a[3] = e("h3", null, "自动更新进展", -1)),
        e("label", Ka, [e("input", {
          type: "checkbox",
          "aria-label": "自动更新任务进展",
          checked: t.autoMaintenance,
          disabled: t.settingsBusy,
          onChange: a[0] || (a[0] = (s) => o.$emit("update", s.target.checked))
        }, null, 40, za), a[2] || (a[2] = e("span", null, null, -1))])
      ]), a[4] || (a[4] = e("p", null, "开启后，在你发送下一条消息时，根据上一轮已确认的剧情更新任务。此设置适用于所有普通聊天。", -1))]),
      e("article", Qa, [
        e("div", Ga, [e("span", Ja, [c(y, { name: "clock" })]), a[5] || (a[5] = e("h3", null, "现在检查一次", -1))]),
        a[6] || (a[6] = e("p", null, "根据当前可用的剧情，检查进行中的任务。检查会调用已配置的 Agent。", -1)),
        e("button", {
          type: "button",
          class: "tasks-secondary-button tasks-full-button",
          disabled: t.maintenanceBusy || !!t.disabledReason,
          onClick: a[1] || (a[1] = (s) => o.$emit("maintain"))
        }, [c(y, {
          name: "refresh",
          class: J({ "is-spinning": t.maintenanceBusy })
        }, null, 8, ["class"]), b(u(t.maintenanceBusy ? "正在更新…" : "更新任务进展"), 1)], 8, Wa),
        t.disabledReason ? (i(), d("p", Xa, u(t.disabledReason), 1)) : f("", !0)
      ]),
      t.maintenanceMessage ? (i(), d("p", Ya, u(t.maintenanceMessage), 1)) : f("", !0)
    ]));
  }
}), es = _a;
function ts(t, o, a, s) {
  if (s !== a.stateVersion || t.nextCursor !== a.cursor) return null;
  const m = new Set(t.items.map((h) => h.taskId));
  return {
    items: [...t.items, ...o.items.filter((h) => !m.has(h.taskId))],
    nextCursor: o.nextCursor,
    hasMore: o.hasMore
  };
}
var as = { class: "tasks-page" }, ss = { class: "tasks-contract-sheet" }, ls = { class: "tasks-contract-heading" }, ns = { class: "tasks-grade" }, is = { class: "tasks-eyebrow" }, rs = { class: "tasks-contract-reward" }, us = { class: "tasks-seal" }, ds = { class: "tasks-facts" }, os = { key: 0 }, vs = { class: "is-risk" }, ks = { class: "tasks-tags" }, bs = { class: "tasks-action-dock" }, cs = {
  key: 0,
  class: "tasks-hint"
}, ys = ["disabled"], ms = {
  key: 1,
  class: "tasks-empty"
}, fs = /* @__PURE__ */ x({
  __name: "TaskListingDetail",
  props: {
    listing: {},
    busy: { type: Boolean },
    disabledReason: {}
  },
  emits: ["accept"],
  setup(t) {
    return (o, a) => (i(), d("section", as, [t.listing ? (i(), d(C, { key: 0 }, [
      e("article", ss, [
        e("header", ls, [
          e("span", ns, u(t.listing.grade), 1),
          e("span", is, "任务终端 · " + u(t.listing.posture), 1),
          e("h2", null, u(t.listing.title), 1),
          e("p", null, u(t.listing.hook), 1)
        ]),
        e("div", rs, [e("span", null, [a[2] || (a[2] = b("完成报酬", -1)), e("strong", null, [a[1] || (a[1] = e("small", null, "¤", -1)), b(" " + u(P(V)(t.listing.reward)), 1)])]), e("span", us, [c(y, { name: "check" }), a[3] || (a[3] = b("终端出资", -1))])]),
        e("dl", ds, [
          e("div", null, [a[4] || (a[4] = e("dt", null, "完成目标", -1)), e("dd", null, u(t.listing.objective), 1)]),
          t.listing.requirements ? (i(), d("div", os, [a[5] || (a[5] = e("dt", null, "执行约束", -1)), e("dd", null, u(t.listing.requirements), 1)])) : f("", !0),
          e("div", null, [a[6] || (a[6] = e("dt", null, "行动地点", -1)), e("dd", null, u(t.listing.location), 1)]),
          e("div", null, [a[7] || (a[7] = e("dt", null, "行动时机", -1)), e("dd", null, u(t.listing.timing), 1)]),
          e("div", vs, [a[8] || (a[8] = e("dt", null, "留意风险", -1)), e("dd", null, u(t.listing.risk), 1)])
        ]),
        e("div", ks, [(i(!0), d(C, null, E(t.listing.tags, (s) => (i(), d("span", { key: s }, u(s), 1))), 128))])
      ]),
      a[9] || (a[9] = e("p", { class: "tasks-hint" }, "接取后由你执行，报酬自动托管；无需另找 NPC 领取任务。", -1)),
      e("div", bs, [t.disabledReason ? (i(), d("p", cs, u(t.disabledReason), 1)) : f("", !0), e("button", {
        type: "button",
        class: "tasks-primary-button",
        disabled: t.listing.accepted || t.busy || !!t.disabledReason,
        onClick: a[0] || (a[0] = (s) => o.$emit("accept"))
      }, [c(y, { name: t.listing.accepted ? "check" : "plus" }, null, 8, ["name"]), b(u(t.listing.accepted ? "已接取这份委托" : t.busy ? "正在接取…" : "接下这份委托"), 1)], 8, ys)])
    ], 64)) : (i(), d("div", ms, [
      c(y, { name: "ticket" }),
      a[10] || (a[10] = e("h3", null, "这批委托已更新", -1)),
      a[11] || (a[11] = e("p", null, "返回大厅，查看最新的委托。", -1))
    ]))]));
  }
}), gs = fs, $s = {
  key: 0,
  class: "tasks-candidates"
}, hs = ["data-tone"], ps = { class: "tasks-candidate-description" }, ws = { class: "tasks-candidate-facts" }, Cs = ["disabled", "onClick"], Is = {
  key: 1,
  class: "tasks-empty"
}, Rs = { class: "tasks-empty-mark" }, Ts = /* @__PURE__ */ x({
  __name: "TaskCandidateList",
  props: {
    task: {},
    busy: { type: Boolean },
    disabledReason: {}
  },
  emits: ["assign"],
  setup(t) {
    return (o, a) => t.task.candidates.length ? (i(), d("div", $s, [(i(!0), d(C, null, E(t.task.candidates, (s, m) => (i(), d("article", {
      key: s.candidateId,
      class: "tasks-candidate"
    }, [
      e("header", null, [e("span", {
        class: "tasks-candidate-avatar",
        "data-tone": m % 3,
        "aria-hidden": "true"
      }, u(Array.from(s.name)[0]), 9, hs), e("div", null, [e("h3", null, u(s.name), 1), a[0] || (a[0] = e("small", null, "应征者", -1))])]),
      e("p", ps, u(s.description), 1),
      e("blockquote", null, "“" + u(s.pitch) + "”", 1),
      e("dl", ws, [e("div", null, [a[1] || (a[1] = e("dt", null, "擅长", -1)), e("dd", null, u(s.capability), 1)]), e("div", null, [a[2] || (a[2] = e("dt", null, "留意", -1)), e("dd", null, u(s.risk), 1)])]),
      e("button", {
        type: "button",
        class: "tasks-secondary-button tasks-full-button",
        disabled: t.busy || !!t.disabledReason,
        onClick: (h) => o.$emit("assign", t.task, s.candidateId)
      }, [e("span", null, "委托给 " + u(s.name), 1), c(y, { name: "next" })], 8, Cs)
    ]))), 128))])) : (i(), d("div", Is, [
      e("span", Rs, [c(y, { name: "people" })]),
      a[3] || (a[3] = e("h3", null, "等一个合适的人", -1)),
      a[4] || (a[4] = e("p", null, "发起招募，看看谁愿意接下这份委托。", -1))
    ]));
  }
}), Bs = Ts, Ms = { class: "tasks-page" }, xs = { class: "tasks-recruit-heading" }, Ss = { class: "tasks-reward" }, As = { class: "tasks-section-heading" }, Ds = ["disabled"], qs = {
  key: 0,
  class: "tasks-hint",
  role: "status"
}, Ls = {
  key: 1,
  class: "tasks-hint"
}, Ps = { class: "tasks-withdraw" }, Ns = ["disabled"], Vs = {
  key: 1,
  class: "tasks-empty"
}, Es = {
  key: 1,
  class: "tasks-empty"
}, js = /* @__PURE__ */ x({
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
    return (o, a) => (i(), d("section", Ms, [t.task ? (i(), d(C, { key: 0 }, [e("header", xs, [
      a[6] || (a[6] = e("span", { class: "tasks-eyebrow" }, "你的委托 · 报酬已托管", -1)),
      e("h2", null, u(t.task.title), 1),
      e("div", null, [e("strong", Ss, "¤ " + u(P(V)(t.task.reward)), 1), e("button", {
        type: "button",
        class: "tasks-text-button",
        onClick: a[0] || (a[0] = (s) => o.$emit("detail", t.task.taskId))
      }, [a[5] || (a[5] = b("查看委托内容", -1)), c(y, { name: "next" })])])
    ]), t.task.status === "recruiting" ? (i(), d(C, { key: 0 }, [
      e("header", As, [e("h3", null, [a[7] || (a[7] = b("选择执行者 ", -1)), e("small", null, u(t.task.candidates.length), 1)]), e("button", {
        type: "button",
        class: "tasks-text-button",
        disabled: t.busy || t.recruiting || !!t.generationDisabledReason,
        onClick: a[1] || (a[1] = (s) => o.$emit("recruit", t.task))
      }, [c(y, {
        name: "refresh",
        class: J({ "is-spinning": t.recruiting })
      }, null, 8, ["class"]), b(u(t.recruiting ? "招募中…" : t.task.candidates.length ? "重新招募" : "开始招募"), 1)], 8, Ds)]),
      t.recruiting ? (i(), d("p", qs, "正在寻找愿意接下委托的人。你可以离开页面，招募会在后台继续。")) : f("", !0),
      t.disabledReason || t.generationDisabledReason ? (i(), d("p", Ls, u(t.disabledReason || t.generationDisabledReason), 1)) : f("", !0),
      c(Bs, {
        task: t.task,
        busy: t.busy || t.recruiting,
        "disabled-reason": t.disabledReason,
        onAssign: a[2] || (a[2] = (s, m) => o.$emit("assign", s, m))
      }, null, 8, [
        "task",
        "busy",
        "disabled-reason"
      ]),
      e("div", Ps, [a[8] || (a[8] = e("p", null, "暂时不需要这份委托了？", -1)), e("button", {
        type: "button",
        class: "tasks-text-button is-danger",
        disabled: t.busy || !!t.disabledReason,
        onClick: a[3] || (a[3] = (s) => o.$emit("cancel", t.task))
      }, "取消委托并退回报酬", 8, Ns)])
    ], 64)) : (i(), d("div", Vs, [
      c(y, { name: "check" }),
      e("h3", null, u(t.task.status === "active" ? "执行者已接下委托" : "这份委托已结束"), 1),
      e("button", {
        type: "button",
        class: "tasks-primary-button",
        onClick: a[4] || (a[4] = (s) => o.$emit("detail", t.task.taskId))
      }, "查看任务进展")
    ]))], 64)) : (i(), d("div", Es, [...a[9] || (a[9] = [e("h3", null, "委托状态已更新", -1), e("p", null, "请返回“我发布”查看最新进展或已结束记录。", -1)])]))]));
  }
}), Hs = js, Us = ["aria-label"], Zs = { class: "tasks-dialog-mark" }, Os = { id: "tasks-confirm-title" }, Fs = { class: "tasks-dialog-copy" }, Ks = {
  key: 0,
  class: "tasks-dialog-error",
  role: "alert"
}, zs = {
  key: 1,
  class: "tasks-hint"
}, Qs = ["disabled"], Gs = ["disabled"], Js = /* @__PURE__ */ x({
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
    function m(h) {
      if (h.stopPropagation(), h.key !== "Tab") return;
      const r = Array.from(s.value?.querySelectorAll("button:not(:disabled)") ?? []), v = r[0], j = r.at(-1);
      if (!v) {
        h.preventDefault();
        return;
      }
      h.shiftKey && document.activeElement === v ? (h.preventDefault(), j?.focus()) : !h.shiftKey && document.activeElement === j && (h.preventDefault(), v.focus());
    }
    return (h, r) => (i(), d("dialog", {
      ref_key: "dialog",
      ref: s,
      class: "tasks-dialog",
      "aria-label": t.title,
      onCancel: r[2] || (r[2] = ge((v) => !t.busy && a("close"), ["prevent"])),
      onKeydown: m
    }, [
      e("span", Zs, [c(y, { name: "ticket" })]),
      e("h2", Os, u(t.title), 1),
      e("div", Fs, [Fe(h.$slots, "default")]),
      t.error ? (i(), d("p", Ks, u(t.error), 1)) : f("", !0),
      t.disabledReason && !t.busy ? (i(), d("p", zs, u(t.disabledReason), 1)) : f("", !0),
      e("footer", null, [e("button", {
        type: "button",
        class: "tasks-secondary-button",
        disabled: t.busy,
        autofocus: "",
        onClick: r[0] || (r[0] = (v) => a("close"))
      }, "返回", 8, Qs), e("button", {
        type: "button",
        class: "tasks-primary-button",
        disabled: t.busy || !!t.disabledReason,
        onClick: r[1] || (r[1] = (v) => a("confirm"))
      }, u(t.busy ? "正在保存…" : t.confirmLabel), 9, Gs)])
    ], 40, Us));
  }
}), Ws = Js, Xs = { class: "tasks-app-header" }, Ys = {
  key: 1,
  class: "tasks-brand-mark",
  "aria-hidden": "true"
}, _s = { class: "tasks-balance" }, el = {
  class: "tasks-notices",
  "aria-live": "polite"
}, tl = ["disabled"], al = ["disabled"], sl = ["disabled"], ll = {
  key: 1,
  class: "tasks-notice",
  role: "status"
}, nl = {
  key: 0,
  class: "tasks-receive-tabs",
  "aria-label": "接任务页面"
}, il = ["aria-pressed"], rl = ["aria-pressed"], ul = { key: 0 }, dl = {
  key: 1,
  class: "tasks-nav",
  "aria-label": "任务主导航"
}, ol = ["aria-current"], vl = ["aria-current"], kl = { key: 0 }, bl = ["aria-current"], cl = { class: "tasks-confirm-name" }, yl = { class: "tasks-confirm-amount" }, ml = { class: "tasks-confirm-name" }, fl = {
  key: 0,
  class: "tasks-confirm-amount"
}, gl = { class: "tasks-confirm-name" }, $l = 35e3, hl = /* @__PURE__ */ x({
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
    function m(l) {
      return l !== null && typeof l == "object" && !Array.isArray(l);
    }
    function h(l) {
      return m(l) ? l.result : null;
    }
    const r = p(s(o.initialState)), v = p("board"), j = p("board"), W = p(null), g = p(null), X = T(() => g.value?.kind === "cancel" && g.value.task.source === "received"), Z = p(null), ne = p(""), ee = p("all"), te = p(null), ie = T(() => Ye(r.value)), ae = T(() => ie.value.received), re = T(() => ie.value.published), he = T(() => [...re.value, ...r.value.history.items].find((l) => l.taskId === ne.value) ?? null), pe = T(() => r.value.board?.boardId === Z.value?.boardId ? r.value.board?.listings.find((l) => l.listingId === Z.value?.listingId) ?? null : null), O = T(() => [
      "board",
      "active",
      "published",
      "history"
    ].includes(v.value)), we = T(() => ({
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
    const ue = T(() => r.value.generation.state === "running" && r.value.generation.kind === "board"), de = T(() => r.value.generation.state === "running" && r.value.generation.kind === "candidates" ? r.value.generation.taskId ?? "" : ""), B = p(!1), Y = p(!1), I = p(!1), se = p(!1), _ = p(!1), $ = p(""), H = p("");
    let R = 0, S = !1, oe = () => {
    };
    const ve = T(() => r.value.status === "unconfirmed"), q = T(() => B.value ? "正在处理上一项任务操作" : r.value.status === "loading" ? "任务数据正在准备" : r.value.status === "saving" ? "任务与资金正在保存" : r.value.status === "unconfirmed" ? "请先核实上一次保存结果" : r.value.status === "conflict" ? "请先采用服务端数据" : r.value.status === "blocked" ? r.value.message || "任务暂时不可用" : r.value.generationActive ? "正在生成内容，请稍后" : ""), K = T(() => q.value || (r.value.maintenance.state === "running" ? "正在更新任务" : "")), Ce = T(() => r.value.maintenance.message);
    function ke(l) {
      if (!l || typeof l.chatIdentity != "string") return;
      r.value = structuredClone(l), $.value = "";
      const n = W.value?.task;
      if (v.value === "detail" && n) {
        const k = [
          ...l.active,
          ...l.recruiting,
          ...l.history.items
        ].find((M) => M.taskId === n.taskId);
        k && k.eventId !== n.eventId && G(k.taskId, !0);
      }
    }
    function Ie(l) {
      if (!m(l)) return null;
      const n = m(l.state) ? l.state : l;
      return typeof n.chatIdentity == "string" ? n : null;
    }
    function L(l) {
      const n = l instanceof Error ? l.message : String(l);
      return n === "tasks_insufficient_funds" ? "小白币余额不足，任务没有发布。" : n === "tasks_state_changed" || n === "tasks_listing_already_accepted" ? "任务状态已经变化，请按最新状态重试。" : n === "tasks_terminal" ? "该任务已经结束，不能再次操作。" : n === "tasks_publish_invalid" || n === "tasks_request_invalid" ? "任务内容不完整或超出允许范围。" : n === "tasks_write_blocked" || n === "tasks_generation_active" ? "当前有生成或保存正在进行，请稍后重试。" : n === "tasks_chat_changed" ? "聊天已经切换，请重新打开任务。" : n === "host_request_timeout" ? "操作响应超时，结果可能稍后返回，请勿立即重复。" : "任务操作未完成，请稍后重试。";
    }
    async function A(l, n = {}, k = $l) {
      return h(await o.bridge.request(l, {
        chatIdentity: r.value.chatIdentity,
        ...n
      }, k));
    }
    function N(l, n) {
      if (R !== n) return;
      const k = Ie(l);
      k?.chatIdentity === r.value.chatIdentity && ke(k);
    }
    function U(l) {
      H.value = l, $.value = "";
    }
    async function Re() {
      if (ue.value || K.value) return;
      $.value = "";
      const l = R;
      try {
        const n = await A("tasks/refresh");
        if (!S) return;
        N(n, l);
      } catch (n) {
        S && ($.value = L(n));
      }
    }
    async function Te(l, n) {
      if (q.value) return;
      B.value = !0;
      const k = R;
      try {
        N(await A("tasks/board/accept", {
          boardId: l,
          listingId: n
        }), k), U("任务已接取，报酬已进入托管。"), S && v.value === "listing" && w("active");
      } catch (M) {
        $.value = L(M);
      } finally {
        B.value = !1;
      }
    }
    async function Be(l) {
      if (de.value || K.value) return;
      $.value = "";
      const n = R;
      try {
        const k = await A("tasks/candidates/refresh", {
          taskId: l.taskId,
          expectedTaskRevision: l.taskRevision,
          expectedEventId: l.eventId
        });
        if (!S) return;
        N(k, n);
      } catch (k) {
        S && ($.value = L(k));
      }
    }
    async function Me(l, n) {
      if (q.value) return;
      B.value = !0;
      const k = R;
      try {
        N(await A("tasks/candidates/assign", {
          taskId: l.taskId,
          expectedTaskRevision: l.taskRevision,
          expectedEventId: l.eventId,
          candidateId: n
        }), k), g.value = null, U("执行者已确认，任务进入进行中。"), S && w("published");
      } catch (M) {
        $.value = L(M);
      } finally {
        B.value = !1;
      }
    }
    async function xe(l) {
      if (q.value) return;
      B.value = !0;
      const n = R;
      try {
        N(await A("tasks/cancel", {
          taskId: l.taskId,
          expectedTaskRevision: l.taskRevision,
          expectedEventId: l.eventId
        }), n), g.value = null, U(l.source === "received" ? "已放弃任务，不会扣除小白币。" : "委托已取消，托管报酬已退回钱包。"), S && w(l.source === "received" ? "active" : "published");
      } catch (k) {
        $.value = L(k);
      } finally {
        B.value = !1;
      }
    }
    function Se(l) {
      q.value || ($.value = "", g.value = {
        kind: "publish",
        form: structuredClone(l)
      });
    }
    async function Ae() {
      const l = g.value?.kind === "publish" ? g.value.form : null;
      if (!l || q.value) return;
      B.value = !0;
      const n = R;
      try {
        N(await A("tasks/publish", { form: me(l) }), n), g.value = null, w("published"), U("任务已发布，报酬已锁入托管。");
      } catch (k) {
        $.value = L(k);
      } finally {
        B.value = !1;
      }
    }
    async function De(l) {
      if (Y.value) return;
      Y.value = !0;
      const n = R;
      try {
        N(await A("tasks/settings/update", { autoMaintenance: l }), n), U(l ? "已开启任务进展自动更新。" : "已关闭任务进展自动更新。");
      } catch (k) {
        $.value = L(k);
      } finally {
        Y.value = !1;
      }
    }
    async function qe() {
      if (r.value.maintenance.state === "running" || K.value) return;
      const l = R;
      try {
        N(await A("tasks/maintenance/run"), l);
      } catch (n) {
        $.value = L(n);
      }
    }
    async function G(l, n = !1) {
      n || ((O.value || v.value === "recruit") && (j.value = v.value), v.value = "detail", te.value?.scrollTo(0, 0), W.value = null, se.value = !0);
      const k = ++F;
      try {
        const M = await A("tasks/detail/read", { taskId: l });
        if (!S || k !== F) return;
        m(M) && m(M.task) && Array.isArray(M.timeline) && (W.value = structuredClone(M));
      } catch (M) {
        S && k === F && ($.value = L(M));
      } finally {
        S && k === F && (se.value = !1);
      }
    }
    async function Le() {
      const l = r.value.history.nextCursor;
      if (!l || _.value) return;
      _.value = !0;
      const n = {
        cursor: l,
        stateVersion: R
      };
      try {
        const k = await A("tasks/history/load-more", { cursor: l });
        if (S && m(k) && Array.isArray(k.items)) {
          const M = k, ye = ts(r.value.history, M, n, R);
          ye && (r.value.history = ye);
        }
      } catch (k) {
        $.value = L(k);
      } finally {
        _.value = !1;
      }
    }
    async function Pe() {
      if (I.value) return;
      I.value = !0, $.value = "", H.value = "";
      const l = R;
      try {
        const n = await A("tasks/save/confirm");
        N(n, l), m(n) && n.confirmation === "confirmed" && U("保存已确认。");
      } catch (n) {
        $.value = L(n);
      } finally {
        I.value = !1;
      }
    }
    async function Ne() {
      if (I.value) return;
      I.value = !0, $.value = "", H.value = "";
      const l = R;
      try {
        const n = await A("tasks/save/adopt-server");
        N(n, l), m(n) && n.adoption === "adopted" && U("已采用服务端数据。");
      } catch (n) {
        $.value = L(n);
      } finally {
        I.value = !1;
      }
    }
    async function Ve() {
      if (I.value) return;
      I.value = !0, $.value = "", H.value = "";
      const l = R;
      try {
        N(await A("tasks/read"), l);
      } catch {
        $.value = "读取未完成，请检查存储连接后重试读取。";
      } finally {
        I.value = !1;
      }
    }
    function w(l) {
      l === "settings" && O.value && (j.value = v.value), F += 1, v.value = l, te.value?.scrollTo(0, 0);
    }
    function be() {
      w(v.value === "detail" || v.value === "settings" ? j.value : v.value === "listing" ? "board" : "published");
    }
    function Ee(l, n) {
      Z.value = {
        boardId: l,
        listingId: n
      }, w("listing");
    }
    function je(l) {
      l.status === "recruiting" ? (ne.value = l.taskId, w("recruit")) : G(l.taskId);
    }
    function He() {
      ee.value = "published", w("history");
    }
    function ce(l) {
      $.value = "", g.value = {
        kind: "cancel",
        task: l
      };
    }
    function Ue(l, n) {
      $.value = "", g.value = {
        kind: "assign",
        task: l,
        candidateId: n
      };
    }
    function Ze() {
      const l = g.value;
      l && (l.kind === "publish" ? Ae() : l.kind === "cancel" ? xe(l.task) : Me(l.task, l.candidateId));
    }
    function Oe(l) {
      l.key === "Escape" && !O.value && (l.stopPropagation(), l.preventDefault(), be());
    }
    return fe(() => {
      S = !0, oe = o.bridge.subscribe((l) => {
        if (l.type === "tasks/state") {
          const n = l.payload?.state;
          n && (R += 1, ke(n));
        }
        l.type === "tasks/error" && ($.value = "任务状态暂时无法读取，请重新打开。");
      }), o.bridge.post("tasks/activate", { chatIdentity: r.value.chatIdentity });
    }), Qe(() => {
      S = !1, F += 1, oe(), g.value = null;
    }), (l, n) => (i(), d("main", {
      class: "tasks-app",
      onKeydown: Oe
    }, [
      e("header", Xs, [
        O.value ? (i(), d("span", Ys, [c(y, { name: "ticket" })])) : (i(), d("button", {
          key: 0,
          type: "button",
          class: "tasks-icon-button",
          "aria-label": "返回上一页",
          onClick: be
        }, [c(y, { name: "back" })])),
        e("h1", null, u(we.value), 1),
        e("div", _s, [n[12] || (n[12] = e("small", null, "可用余额", -1)), e("strong", null, "¤ " + u(P(V)(r.value.playerBalance)), 1)]),
        O.value ? (i(), d("button", {
          key: 2,
          type: "button",
          class: "tasks-icon-button",
          "aria-label": "任务设置",
          onClick: n[0] || (n[0] = (k) => w("settings"))
        }, [c(y, { name: "settings" })])) : f("", !0)
      ]),
      e("div", el, [r.value.message || $.value && !g.value || H.value ? (i(), d("aside", {
        key: 0,
        class: J(["tasks-notice", {
          "is-error": !!$.value || r.value.status === "conflict" || r.value.status === "blocked",
          "is-warning": ve.value
        }]),
        role: "status"
      }, [e("div", null, [e("p", null, u(r.value.message || (g.value ? "" : $.value) || H.value), 1), ve.value ? (i(), d("button", {
        key: 0,
        type: "button",
        disabled: I.value,
        onClick: Pe
      }, u(I.value ? "正在核实…" : "核实保存结果"), 9, tl)) : r.value.status === "conflict" ? (i(), d("button", {
        key: 1,
        type: "button",
        disabled: I.value,
        onClick: Ne
      }, u(I.value ? "正在采用…" : "采用服务端数据"), 9, al)) : r.value.status === "blocked" ? (i(), d("button", {
        key: 2,
        type: "button",
        disabled: I.value,
        onClick: Ve
      }, u(I.value ? "正在读取…" : "重试读取"), 9, sl)) : f("", !0)]), r.value.message ? f("", !0) : (i(), d("button", {
        key: 0,
        type: "button",
        class: "tasks-icon-button",
        "aria-label": "关闭提示",
        onClick: n[1] || (n[1] = (k) => {
          $.value = "", H.value = "";
        })
      }, [c(y, { name: "close" })]))], 2)) : f("", !0), r.value.generation.message && !r.value.message ? (i(), d("aside", ll, [e("p", null, u(r.value.generation.message), 1)])) : f("", !0)]),
      v.value === "board" || v.value === "active" ? (i(), d("nav", nl, [e("button", {
        type: "button",
        "aria-pressed": v.value === "board",
        onClick: n[2] || (n[2] = (k) => w("board"))
      }, "发现委托", 8, il), e("button", {
        type: "button",
        "aria-pressed": v.value === "active",
        onClick: n[3] || (n[3] = (k) => w("active"))
      }, [n[13] || (n[13] = b("我接的", -1)), ae.value.length ? (i(), d("span", ul, u(ae.value.length), 1)) : f("", !0)], 8, rl)])) : f("", !0),
      e("div", {
        ref_key: "content",
        ref: te,
        class: "tasks-content"
      }, [v.value === "board" ? (i(), D(pa, {
        key: 0,
        board: r.value.board,
        busy: ue.value,
        "disabled-reason": K.value,
        onRefresh: Re,
        onDetail: Ee
      }, null, 8, [
        "board",
        "busy",
        "disabled-reason"
      ])) : v.value === "active" ? (i(), D(Jt, {
        key: 1,
        records: ae.value,
        onDetail: G,
        onDiscover: n[4] || (n[4] = (k) => w("board"))
      }, null, 8, ["records"])) : v.value === "published" ? (i(), D(Ha, {
        key: 2,
        records: re.value,
        "disabled-reason": q.value,
        onOpen: je,
        onPublish: n[5] || (n[5] = (k) => w("publish")),
        onHistory: He
      }, null, 8, ["records", "disabled-reason"])) : v.value === "history" ? (i(), D(Sa, {
        key: 3,
        history: r.value.history,
        loading: _.value,
        source: ee.value,
        onFilter: n[6] || (n[6] = (k) => ee.value = k),
        onDetail: G,
        onLoadMore: Le
      }, null, 8, [
        "history",
        "loading",
        "source"
      ])) : v.value === "settings" ? (i(), D(es, {
        key: 4,
        "auto-maintenance": r.value.settings.autoMaintenance,
        "settings-busy": Y.value,
        "maintenance-busy": r.value.maintenance.state === "running",
        "maintenance-message": Ce.value,
        "disabled-reason": K.value,
        onUpdate: De,
        onMaintain: qe
      }, null, 8, [
        "auto-maintenance",
        "settings-busy",
        "maintenance-busy",
        "maintenance-message",
        "disabled-reason"
      ])) : v.value === "publish" ? (i(), D(Nt, {
        key: 5,
        balance: r.value.playerBalance,
        busy: B.value,
        "disabled-reason": q.value,
        onSubmit: Se
      }, null, 8, [
        "balance",
        "busy",
        "disabled-reason"
      ])) : v.value === "listing" ? (i(), D(gs, {
        key: 6,
        listing: pe.value,
        busy: B.value,
        "disabled-reason": q.value,
        onAccept: n[7] || (n[7] = (k) => Z.value && Te(Z.value.boardId, Z.value.listingId))
      }, null, 8, [
        "listing",
        "busy",
        "disabled-reason"
      ])) : v.value === "recruit" ? (i(), D(Hs, {
        key: 7,
        task: he.value,
        busy: B.value,
        recruiting: !!de.value,
        "disabled-reason": q.value,
        "generation-disabled-reason": K.value,
        onRecruit: Be,
        onAssign: Ue,
        onCancel: ce,
        onDetail: G
      }, null, 8, [
        "task",
        "busy",
        "recruiting",
        "disabled-reason",
        "generation-disabled-reason"
      ])) : (i(), D(ht, {
        key: 8,
        detail: W.value,
        loading: se.value,
        busy: B.value,
        "disabled-reason": q.value,
        onCancel: ce
      }, null, 8, [
        "detail",
        "loading",
        "busy",
        "disabled-reason"
      ]))], 512),
      O.value ? (i(), d("nav", dl, [
        e("button", {
          type: "button",
          "aria-label": "接任务",
          "aria-current": v.value === "board" || v.value === "active" ? "page" : void 0,
          onClick: n[8] || (n[8] = (k) => w("board"))
        }, [e("span", null, [c(y, { name: "compass" })]), n[14] || (n[14] = b("接任务", -1))], 8, ol),
        e("button", {
          type: "button",
          "aria-label": "我发布",
          "aria-current": v.value === "published" ? "page" : void 0,
          onClick: n[9] || (n[9] = (k) => w("published"))
        }, [e("span", null, [c(y, { name: "send" }), r.value.recruiting.length ? (i(), d("i", kl)) : f("", !0)]), n[15] || (n[15] = b("我发布", -1))], 8, vl),
        e("button", {
          type: "button",
          "aria-label": "记录",
          "aria-current": v.value === "history" ? "page" : void 0,
          onClick: n[10] || (n[10] = (k) => w("history"))
        }, [e("span", null, [c(y, { name: "archive" })]), n[16] || (n[16] = b("记录", -1))], 8, bl)
      ])) : f("", !0),
      g.value ? (i(), D(Ws, {
        key: 2,
        title: g.value.kind === "publish" ? "让这份委托出发？" : g.value.kind === "cancel" ? X.value ? "放弃这份任务？" : "取消这份委托？" : "把委托交给这位执行者？",
        "confirm-label": g.value.kind === "publish" ? "托管并发布" : g.value.kind === "cancel" ? X.value ? "确认放弃" : "取消并退款" : "确认委托",
        busy: B.value,
        "disabled-reason": q.value,
        error: $.value,
        onClose: n[11] || (n[11] = (k) => {
          g.value = null, $.value = "";
        }),
        onConfirm: Ze
      }, {
        default: ze(() => [g.value.kind === "publish" ? (i(), d(C, { key: 0 }, [
          e("p", cl, u(g.value.form.title), 1),
          e("strong", yl, "¤ " + u(P(V)(g.value.form.reward)), 1),
          n[17] || (n[17] = e("p", null, "报酬将从钱包托管。发布后可招募执行者；任务结束前，你可以取消并全额退回报酬。", -1))
        ], 64)) : g.value.kind === "cancel" ? (i(), d(C, { key: 1 }, [
          e("p", ml, u(g.value.task.title), 1),
          X.value ? f("", !0) : (i(), d("strong", fl, "¤ " + u(P(V)(g.value.task.reward)), 1)),
          e("p", null, u(X.value ? "放弃后不再获得任务报酬，也不会扣除你的小白币。" : "取消后，托管报酬将全额退回你的钱包。"), 1),
          n[18] || (n[18] = e("p", null, "任务将移入记录，不再参与后续剧情提醒与进展更新。此操作无法撤销。", -1))
        ], 64)) : (i(), d(C, { key: 2 }, [e("p", gl, u(g.value.task.candidates.find((k) => k.candidateId === (g.value?.kind === "assign" ? g.value.candidateId : ""))?.name), 1), e("p", null, "确认后开始执行“" + u(g.value.task.title) + "”。完成后，托管报酬将支付给执行者。", 1)], 64))]),
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
}), wl = hl;
export {
  wl as default
};
