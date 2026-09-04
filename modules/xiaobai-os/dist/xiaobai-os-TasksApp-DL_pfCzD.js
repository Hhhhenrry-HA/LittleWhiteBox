/* eslint-disable */
import { A as g, D as N, M as ce, Q as q, S as P, T as me, _ as fe, a as H, c as $, et as u, f as p, k as ge, l as d, m as x, o as e, p as pe, r as A, s as D, x as r, y as $e } from "./xiaobai-os-runtime-core.esm-bundler-Dmqi2Zbl.js";
import { a as V, c as ee } from "./xiaobai-os-runtime-dom.esm-bundler-BYy7nd4d.js";
var he = { class: "tasks-page tasks-detail-page" }, Be = { class: "tasks-page-heading" }, we = ["data-status"], Ce = {
  key: 0,
  class: "tasks-empty"
}, Te = { class: "tasks-contract-sheet" }, Ie = { class: "tasks-party-line" }, Re = { key: 0 }, xe = { key: 1 }, Me = { class: "tasks-timeline" }, Se = {
  key: 2,
  class: "tasks-empty"
}, qe = /* @__PURE__ */ x({
  __name: "TaskDetail",
  props: {
    detail: {},
    loading: { type: Boolean }
  },
  emits: ["back"],
  setup(s, { emit: k }) {
    const y = k, b = {
      recruiting: "招募中",
      active: "进行中",
      completed: "已完成",
      failed: "已失败",
      cancelled: "已撤回"
    };
    function n(i) {
      return new Date(i).toLocaleString("zh-CN", { hour12: !1 });
    }
    return (i, t) => (r(), d("section", he, [e("header", Be, [e("button", {
      type: "button",
      class: "tasks-back",
      onClick: t[0] || (t[0] = (o) => y("back"))
    }, "← 返回"), s.detail ? (r(), d("span", {
      key: 0,
      class: "tasks-detail-status",
      "data-status": s.detail.task.status
    }, u(b[s.detail.task.status]), 9, we)) : $("", !0)]), s.loading ? (r(), d("div", Ce, [...t[1] || (t[1] = [e("h3", null, "正在读取任务…", -1)])])) : s.detail ? (r(), d(A, { key: 1 }, [e("article", Te, [
      e("header", null, [e("div", null, [e("small", null, u(s.detail.task.grade) + " · " + u(s.detail.task.source === "received" ? "大厅任务" : "我的任务"), 1), e("h2", null, u(s.detail.task.title), 1)]), e("strong", null, "¤ " + u(s.detail.task.reward), 1)]),
      e("div", Ie, [
        e("span", null, [t[2] || (t[2] = p("出资方", -1)), e("strong", null, u(s.detail.task.issuer.displayName), 1)]),
        t[4] || (t[4] = e("i", null, "→", -1)),
        e("span", null, [t[3] || (t[3] = p("执行方", -1)), e("strong", null, u(s.detail.task.assignee?.displayName || "等待指派"), 1)])
      ]),
      e("dl", null, [
        e("div", null, [t[5] || (t[5] = e("dt", null, "唯一完成目标", -1)), e("dd", null, u(s.detail.task.objective), 1)]),
        e("div", null, [t[6] || (t[6] = e("dt", null, "执行约束", -1)), e("dd", null, u(s.detail.task.requirements || "无附加执行约束"), 1)]),
        e("div", null, [t[7] || (t[7] = e("dt", null, "行动地点", -1)), e("dd", null, u(s.detail.task.location), 1)]),
        s.detail.task.timing ? (r(), d("div", Re, [t[8] || (t[8] = e("dt", null, "时机", -1)), e("dd", null, u(s.detail.task.timing), 1)])) : $("", !0),
        e("div", null, [t[9] || (t[9] = e("dt", null, "合同风险", -1)), e("dd", null, u(s.detail.task.risk || "未注明"), 1)]),
        e("div", null, [t[10] || (t[10] = e("dt", null, "累计进展", -1)), e("dd", null, u(s.detail.task.progressSummary || "尚无已确认进展"), 1)]),
        s.detail.task.resultSummary ? (r(), d("div", xe, [t[11] || (t[11] = e("dt", null, "最终结果", -1)), e("dd", null, u(s.detail.task.resultSummary), 1)])) : $("", !0)
      ])
    ]), e("section", Me, [t[13] || (t[13] = e("h3", null, "任务进展", -1)), e("ol", null, [(r(!0), d(A, null, P(s.detail.timeline, (o) => (r(), d("li", { key: o.eventId }, [t[12] || (t[12] = e("i", null, null, -1)), e("div", null, [e("small", null, u(n(o.createdAt)), 1), e("p", null, u(o.summary), 1)])]))), 128))])])], 64)) : (r(), d("div", Se, [...t[14] || (t[14] = [e("h3", null, "任务无法读取", -1), e("p", null, "请返回后重试。", -1)])]))]));
  }
}), Ae = qe, De = { class: "tasks-page tasks-publish-page" }, Pe = { class: "tasks-page-heading" }, Ee = ["disabled"], Ne = { class: "tasks-reward-input" }, Ve = ["disabled"], Ue = ["disabled", "title"], je = /* @__PURE__ */ x({
  __name: "TaskPublishForm",
  props: {
    balance: {},
    busy: { type: Boolean },
    disabledReason: {}
  },
  emits: ["submit", "cancel"],
  setup(s, { emit: k }) {
    const y = k, b = ge({
      title: "",
      objective: "",
      requirements: "",
      location: "",
      risk: "",
      reward: 20
    });
    function n() {
      y("submit", {
        title: b.title,
        objective: b.objective,
        ...b.requirements.trim() ? { requirements: b.requirements } : {},
        location: b.location,
        risk: b.risk,
        reward: Number(b.reward)
      });
    }
    return (i, t) => (r(), d("section", De, [e("header", Pe, [e("button", {
      type: "button",
      class: "tasks-back",
      disabled: s.busy,
      onClick: t[0] || (t[0] = (o) => y("cancel"))
    }, "← 返回", 8, Ee), t[8] || (t[8] = e("div", null, [e("h2", null, "发布任务")], -1))]), e("form", {
      class: "tasks-publish-form",
      onSubmit: ee(n, ["prevent"])
    }, [
      e("aside", null, [
        t[9] || (t[9] = e("small", null, "当前可用余额", -1)),
        e("strong", null, "¤ " + u(s.balance), 1),
        t[10] || (t[10] = e("p", null, "发布后，报酬会立即托管。招募期间撤回可全额退回；选定执行者后不可撤回。", -1))
      ]),
      e("label", null, [t[11] || (t[11] = e("span", null, [p("任务标题 "), e("b", null, "*")], -1)), N(e("input", {
        "onUpdate:modelValue": t[1] || (t[1] = (o) => b.title = o),
        required: "",
        maxlength: "120",
        autocomplete: "off",
        placeholder: "一句清楚的任务名称"
      }, null, 512), [[V, b.title]])]),
      e("label", null, [t[12] || (t[12] = e("span", null, [p("唯一完成目标 "), e("b", null, "*")], -1)), N(e("textarea", {
        "onUpdate:modelValue": t[2] || (t[2] = (o) => b.objective = o),
        required: "",
        maxlength: "8000",
        rows: "4",
        placeholder: "只写一个可以明确判定完成的目标"
      }, null, 512), [[V, b.objective]])]),
      e("label", null, [t[13] || (t[13] = e("span", null, "执行约束", -1)), N(e("textarea", {
        "onUpdate:modelValue": t[3] || (t[3] = (o) => b.requirements = o),
        maxlength: "8000",
        rows: "3",
        placeholder: "可空；只约束执行方式，不增加第二目标"
      }, null, 512), [[V, b.requirements]])]),
      e("label", null, [t[14] || (t[14] = e("span", null, [p("行动地点 "), e("b", null, "*")], -1)), N(e("input", {
        "onUpdate:modelValue": t[4] || (t[4] = (o) => b.location = o),
        required: "",
        maxlength: "600",
        autocomplete: "off",
        placeholder: "目标行动实际发生的位置"
      }, null, 512), [[V, b.location]])]),
      e("label", null, [t[15] || (t[15] = e("span", null, "已知风险", -1)), N(e("textarea", {
        "onUpdate:modelValue": t[5] || (t[5] = (o) => b.risk = o),
        maxlength: "2000",
        rows: "3",
        placeholder: "可空；写明一个具体坏结果"
      }, null, 512), [[V, b.risk]])]),
      e("label", Ne, [
        t[17] || (t[17] = e("span", null, [p("托管报酬 "), e("b", null, "*")], -1)),
        e("div", null, [t[16] || (t[16] = e("i", null, "¤", -1)), N(e("input", {
          "onUpdate:modelValue": t[6] || (t[6] = (o) => b.reward = o),
          type: "number",
          required: "",
          min: "1",
          step: "1"
        }, null, 512), [[
          V,
          b.reward,
          void 0,
          { number: !0 }
        ]])]),
        e("small", { class: q({ "is-danger": b.reward > s.balance }) }, "发布后可用余额：¤ " + u(s.balance - (Number(b.reward) || 0)), 3)
      ]),
      e("footer", null, [e("button", {
        type: "button",
        disabled: s.busy,
        onClick: t[7] || (t[7] = (o) => y("cancel"))
      }, "取消", 8, Ve), e("button", {
        type: "submit",
        class: "tasks-primary-button",
        disabled: s.busy || !!s.disabledReason || b.reward > s.balance,
        title: s.disabledReason
      }, u(s.busy ? "正在发布…" : "确认托管并发布"), 9, Ue)])
    ], 32)]));
  }
}), Le = je, Oe = { class: "tasks-page" }, Fe = { class: "tasks-page-heading" }, He = { class: "tasks-count" }, ze = {
  key: 0,
  class: "tasks-empty"
}, Qe = {
  key: 1,
  class: "tasks-record-list"
}, Ge = ["onClick"], Je = { class: "tasks-record-grade" }, Ke = { class: "tasks-record-main" }, We = { class: "tasks-record-aside" }, Xe = /* @__PURE__ */ x({
  __name: "TasksActive",
  props: { records: {} },
  emits: ["detail"],
  setup(s, { emit: k }) {
    const y = k;
    return (b, n) => (r(), d("section", Oe, [e("header", Fe, [n[0] || (n[0] = e("div", null, [e("h2", null, "进行中的任务")], -1)), e("span", He, u(s.records.length), 1)]), s.records.length ? (r(), d("div", Qe, [(r(!0), d(A, null, P(s.records, (i) => (r(), d("button", {
      key: i.taskId,
      type: "button",
      class: "tasks-record",
      onClick: (t) => y("detail", i.taskId)
    }, [
      e("span", Je, u(i.grade), 1),
      e("span", Ke, [
        e("small", null, u(i.source === "received" ? "大厅委托" : "我的委托") + " · " + u(i.location), 1),
        e("strong", null, u(i.title), 1),
        e("em", null, u(i.progressSummary), 1)
      ]),
      e("span", We, [e("strong", null, "¤ " + u(i.reward), 1), e("small", null, u(i.assignee?.displayName || "未指派"), 1)])
    ], 8, Ge))), 128))])) : (r(), d("div", ze, [...n[1] || (n[1] = [e("h3", null, "当前没有进行中的任务", -1), e("p", null, "接取大厅任务，或为自己发布的任务选定执行者后，任务会出现在这里。", -1)])]))]));
  }
}), Ye = Xe, Ze = { class: "tasks-page tasks-board-page" }, _e = { class: "tasks-page-heading" }, et = ["disabled", "title"], tt = {
  key: 0,
  class: "tasks-empty"
}, at = {
  key: 1,
  class: "tasks-board-grid"
}, st = ["data-grade"], lt = { class: "tasks-listing-body" }, nt = { class: "tasks-hook" }, it = { key: 0 }, ut = { class: "tasks-tags" }, rt = [
  "disabled",
  "title",
  "onClick"
], dt = /* @__PURE__ */ x({
  __name: "TasksBoard",
  props: {
    board: {},
    busy: { type: Boolean },
    disabledReason: {}
  },
  emits: ["refresh", "accept"],
  setup(s, { emit: k }) {
    const y = k;
    return (b, n) => (r(), d("section", Ze, [e("header", _e, [n[1] || (n[1] = e("div", null, [e("h2", null, "世界任务大厅")], -1)), e("button", {
      type: "button",
      class: "tasks-primary-button",
      disabled: s.busy || !!s.disabledReason,
      title: s.disabledReason,
      onClick: n[0] || (n[0] = (i) => y("refresh"))
    }, u(s.busy ? "正在刷新…" : "刷新任务"), 9, et)]), s.board ? (r(), d("div", at, [(r(!0), d(A, null, P(s.board.listings, (i) => (r(), d("article", {
      key: i.listingId,
      class: q(["tasks-listing", { "is-accepted": i.accepted }])
    }, [e("div", {
      class: "tasks-grade",
      "data-grade": i.grade
    }, [e("strong", null, u(i.grade), 1), e("small", null, u(i.tags[0]), 1)], 8, st), e("div", lt, [
      e("header", null, [e("div", null, [e("span", null, u(i.posture), 1), e("span", null, u(i.timing), 1)]), e("strong", null, "¤ " + u(i.reward), 1)]),
      e("h3", null, u(i.title), 1),
      e("p", nt, u(i.hook), 1),
      e("dl", null, [
        e("div", null, [n[3] || (n[3] = e("dt", null, "唯一目标", -1)), e("dd", null, u(i.objective), 1)]),
        i.requirements ? (r(), d("div", it, [n[4] || (n[4] = e("dt", null, "执行约束", -1)), e("dd", null, u(i.requirements), 1)])) : $("", !0),
        e("div", null, [n[5] || (n[5] = e("dt", null, "地点", -1)), e("dd", null, u(i.location), 1)]),
        e("div", null, [n[6] || (n[6] = e("dt", null, "风险", -1)), e("dd", null, u(i.risk), 1)])
      ]),
      e("footer", null, [e("div", ut, [(r(!0), d(A, null, P(i.tags, (t) => (r(), d("span", { key: t }, u(t), 1))), 128))]), e("button", {
        type: "button",
        disabled: i.accepted || s.busy || !!s.disabledReason,
        title: s.disabledReason,
        onClick: (t) => y("accept", s.board.boardId, i.listingId)
      }, u(i.accepted ? "已接取" : "接取任务"), 9, rt)])
    ])], 2))), 128))])) : (r(), d("div", tt, [...n[2] || (n[2] = [e("h3", null, "当前没有任务", -1), e("p", null, "请点击右上角“刷新任务”获取新任务。", -1)])]))]));
  }
}), ot = dt, vt = { class: "tasks-page" }, bt = { class: "tasks-page-heading" }, yt = { class: "tasks-count" }, kt = {
  key: 0,
  class: "tasks-empty"
}, ct = {
  key: 1,
  class: "tasks-history-list"
}, mt = ["data-status", "onClick"], ft = ["disabled"], gt = /* @__PURE__ */ x({
  __name: "TasksHistory",
  props: {
    history: {},
    loading: { type: Boolean }
  },
  emits: ["detail", "loadMore"],
  setup(s, { emit: k }) {
    const y = k, b = {
      completed: "已完成",
      failed: "已失败",
      cancelled: "已撤回"
    };
    return (n, i) => (r(), d("section", vt, [e("header", bt, [i[1] || (i[1] = e("div", null, [e("h2", null, "任务历史")], -1)), e("span", yt, u(s.history.items.length), 1)]), s.history.items.length ? (r(), d("div", ct, [(r(!0), d(A, null, P(s.history.items, (t) => (r(), d("button", {
      key: t.taskId,
      type: "button",
      class: "tasks-history-row",
      "data-status": t.status,
      onClick: (o) => y("detail", t.taskId)
    }, [
      e("span", null, u(b[t.status]), 1),
      e("strong", null, u(t.title), 1),
      e("em", null, u(t.resultSummary), 1),
      e("b", null, "¤ " + u(t.reward), 1)
    ], 8, mt))), 128)), s.history.hasMore ? (r(), d("button", {
      key: 0,
      type: "button",
      class: "tasks-load-more",
      disabled: s.loading,
      onClick: i[0] || (i[0] = (t) => y("loadMore"))
    }, u(s.loading ? "正在加载…" : "加载更多"), 9, ft)) : $("", !0)])) : (r(), d("div", kt, [...i[2] || (i[2] = [e("h3", null, "还没有历史任务", -1), e("p", null, "已完成、失败或撤回的任务会保存在这里。", -1)])]))]));
  }
}), pt = gt, $t = {
  key: 0,
  class: "tasks-candidates"
}, ht = [
  "disabled",
  "title",
  "onClick"
], Bt = {
  key: 1,
  class: "tasks-inline-empty"
}, wt = /* @__PURE__ */ x({
  __name: "TaskCandidateList",
  props: {
    task: {},
    busy: { type: Boolean },
    disabledReason: {}
  },
  emits: ["assign"],
  setup(s, { emit: k }) {
    const y = k;
    return (b, n) => s.task.candidates.length ? (r(), d("div", $t, [(r(!0), d(A, null, P(s.task.candidates, (i) => (r(), d("article", {
      key: i.candidateId,
      class: "tasks-candidate"
    }, [
      e("header", null, [e("strong", null, u(i.name), 1), n[0] || (n[0] = e("span", null, "应征者", -1))]),
      e("p", null, u(i.description), 1),
      e("blockquote", null, "“" + u(i.pitch) + "”", 1),
      e("dl", null, [e("div", null, [n[1] || (n[1] = e("dt", null, "能力", -1)), e("dd", null, u(i.capability), 1)]), e("div", null, [n[2] || (n[2] = e("dt", null, "隐患", -1)), e("dd", null, u(i.risk), 1)])]),
      e("button", {
        type: "button",
        class: "tasks-primary-button",
        disabled: s.busy || !!s.disabledReason,
        title: s.disabledReason,
        onClick: (t) => y("assign", s.task, i.candidateId)
      }, " 选择此人 ", 8, ht)
    ]))), 128))])) : (r(), d("p", Bt, "还没有候选人，请先招募；不再需要该任务时也可以撤回。"));
  }
}), Ct = wt, Tt = { class: "tasks-page" }, It = { class: "tasks-page-heading" }, Rt = ["disabled", "title"], xt = {
  key: 0,
  class: "tasks-empty"
}, Mt = {
  key: 1,
  class: "tasks-published-list"
}, St = { key: 0 }, qt = { key: 1 }, At = { class: "tasks-published-actions" }, Dt = ["onClick"], Pt = [
  "disabled",
  "title",
  "onClick"
], Et = [
  "disabled",
  "title",
  "onClick"
], Nt = /* @__PURE__ */ x({
  __name: "TasksPublished",
  props: {
    records: {},
    candidateBusyTaskId: {},
    writeBusy: { type: Boolean },
    disabledReason: {}
  },
  emits: [
    "recruit",
    "assign",
    "cancel",
    "detail",
    "publish"
  ],
  setup(s, { emit: k }) {
    const y = k;
    return (b, n) => (r(), d("section", Tt, [e("header", It, [n[2] || (n[2] = e("div", null, [e("h2", null, "我发布的任务")], -1)), e("button", {
      type: "button",
      class: "tasks-primary-button",
      disabled: !!s.disabledReason,
      title: s.disabledReason,
      onClick: n[0] || (n[0] = (i) => y("publish"))
    }, "发布新任务", 8, Rt)]), s.records.length ? (r(), d("div", Mt, [(r(!0), d(A, null, P(s.records, (i) => (r(), d("article", {
      key: i.taskId,
      class: "tasks-published-card"
    }, [
      e("header", null, [e("div", null, [n[4] || (n[4] = e("small", null, "招募中 · 报酬已托管", -1)), e("h3", null, u(i.title), 1)]), e("strong", null, "¤ " + u(i.reward), 1)]),
      e("dl", null, [
        e("div", null, [n[5] || (n[5] = e("dt", null, "唯一目标", -1)), e("dd", null, u(i.objective), 1)]),
        i.requirements ? (r(), d("div", St, [n[6] || (n[6] = e("dt", null, "执行约束", -1)), e("dd", null, u(i.requirements), 1)])) : $("", !0),
        e("div", null, [n[7] || (n[7] = e("dt", null, "地点", -1)), e("dd", null, u(i.location), 1)]),
        i.risk ? (r(), d("div", qt, [n[8] || (n[8] = e("dt", null, "风险", -1)), e("dd", null, u(i.risk), 1)])) : $("", !0)
      ]),
      e("div", At, [
        e("button", {
          type: "button",
          onClick: (t) => y("detail", i.taskId)
        }, "查看详情", 8, Dt),
        e("button", {
          type: "button",
          disabled: s.writeBusy || !!s.candidateBusyTaskId || !!s.disabledReason,
          title: s.disabledReason,
          onClick: (t) => y("recruit", i)
        }, u(s.candidateBusyTaskId === i.taskId ? "正在招募…" : "招募候选人"), 9, Pt),
        e("button", {
          type: "button",
          class: "is-danger",
          disabled: s.writeBusy || !!s.disabledReason,
          title: s.disabledReason,
          onClick: (t) => y("cancel", i)
        }, "撤回并退款", 8, Et)
      ]),
      pe(Ct, {
        task: i,
        busy: s.writeBusy || !!s.candidateBusyTaskId,
        "disabled-reason": s.disabledReason,
        onAssign: n[1] || (n[1] = (t, o) => y("assign", t, o))
      }, null, 8, [
        "task",
        "busy",
        "disabled-reason"
      ])
    ]))), 128))])) : (r(), d("div", xt, [...n[3] || (n[3] = [e("h3", null, "还没有发布任务", -1), e("p", null, "点击右上角“发布新任务”创建委托。", -1)])]))]));
  }
}), Vt = Nt, Ut = { class: "tasks-page tasks-settings-page" }, jt = { class: "tasks-setting-card" }, Lt = { class: "tasks-switch" }, Ot = ["checked", "disabled"], Ft = { class: "tasks-setting-card is-manual" }, Ht = ["disabled", "title"], zt = {
  key: 0,
  class: "tasks-maintenance-message",
  role: "status"
}, Qt = /* @__PURE__ */ x({
  __name: "TasksSettings",
  props: {
    autoMaintenance: { type: Boolean },
    settingsBusy: { type: Boolean },
    maintenanceBusy: { type: Boolean },
    maintenanceMessage: {},
    disabledReason: {}
  },
  emits: ["update", "maintain"],
  setup(s, { emit: k }) {
    const y = k;
    return (b, n) => (r(), d("section", Ut, [
      n[5] || (n[5] = e("header", { class: "tasks-page-heading" }, [e("div", null, [e("h2", null, "任务设置")])], -1)),
      e("article", jt, [n[3] || (n[3] = e("div", null, [e("h3", null, "自动更新任务进展"), e("p", null, "开启后，每次对话推进时，系统会根据最新剧情更新进行中任务的进展和结果。")], -1)), e("label", Lt, [
        e("input", {
          type: "checkbox",
          checked: s.autoMaintenance,
          disabled: s.settingsBusy,
          onChange: n[0] || (n[0] = (i) => y("update", i.target.checked))
        }, null, 40, Ot),
        n[2] || (n[2] = e("span", null, null, -1)),
        e("em", null, u(s.autoMaintenance ? "开启" : "关闭"), 1)
      ])]),
      e("article", Ft, [n[4] || (n[4] = e("div", null, [e("h3", null, "立即更新任务"), e("p", null, "根据当前最新剧情，检查所有进行中的任务并更新状态。")], -1)), e("button", {
        type: "button",
        disabled: s.maintenanceBusy || !!s.disabledReason,
        title: s.disabledReason,
        onClick: n[1] || (n[1] = (i) => y("maintain"))
      }, u(s.maintenanceBusy ? "正在更新…" : "立即更新"), 9, Ht)]),
      s.maintenanceMessage ? (r(), d("p", zt, u(s.maintenanceMessage), 1)) : $("", !0)
    ]));
  }
}), Gt = Qt;
function Jt(s, k, y, b) {
  if (b !== y.stateVersion || s.nextCursor !== y.cursor) return null;
  const n = new Set(s.items.map((i) => i.taskId));
  return {
    items: [...s.items, ...k.items.filter((i) => !n.has(i.taskId))],
    nextCursor: k.nextCursor,
    hasMore: k.hasMore
  };
}
var Kt = { class: "tasks-app" }, Wt = { class: "tasks-app-header" }, Xt = { class: "tasks-balance" }, Yt = ["disabled"], Zt = ["disabled"], _t = { class: "tasks-content" }, ea = {
  class: "tasks-nav",
  "aria-label": "任务页面"
}, ta = { key: 0 }, aa = { key: 0 }, sa = {
  class: "tasks-dialog",
  role: "alertdialog",
  "aria-modal": "true",
  "aria-labelledby": "tasks-publish-confirm-title"
}, la = ["disabled"], na = ["disabled", "title"], ia = 35e3, _ = 18e4, ua = /* @__PURE__ */ x({
  __name: "TasksApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(s) {
    const k = s;
    function y() {
      return {
        chatIdentity: "",
        status: "blocked",
        message: "任务状态未能载入。",
        writeState: "ready",
        settings: { autoMaintenance: !1 },
        playerBalance: 0,
        generationActive: !1,
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
    function b(l) {
      return l && typeof l == "object" ? structuredClone(ce(l)) : y();
    }
    function n(l) {
      return l !== null && typeof l == "object" && !Array.isArray(l);
    }
    function i(l) {
      return n(l) ? l.result : null;
    }
    const t = g(b(k.initialState)), o = g("board"), z = g("board"), Q = g(null), I = g(null), j = g(!1), L = g(""), m = g(!1), O = g(!1), w = g(!1), G = g(!1), F = g(!1), c = g(""), J = g("");
    let f = 0, E = !1, X = () => {
    };
    const K = H(() => t.value.status === "unconfirmed"), C = H(() => m.value ? "正在处理上一项任务操作" : t.value.status === "loading" ? "任务数据正在准备" : t.value.status === "saving" ? "任务与资金正在保存" : t.value.status === "unconfirmed" ? "请先核实上一次保存结果" : t.value.status === "conflict" ? "请先采用服务端数据" : t.value.status === "blocked" ? t.value.message || "任务暂时不可用" : t.value.generationActive ? "正在生成内容，请稍后" : ""), U = H(() => C.value || (t.value.maintenance.state === "running" ? "正在更新任务" : "")), te = H(() => {
      const l = t.value.maintenance.lastOutcome;
      return l === "updated" ? "任务已更新。" : l === "unchanged" ? "当前任务无需更新。" : l === "partial" ? "部分任务状态已保存。" : l === "failed" ? "任务更新失败，请稍后重试。" : l === "cancelled" ? "本次任务更新已取消。" : l === "no-work" ? "当前没有需要更新的任务进展。" : "";
    });
    function Y(l) {
      !l || typeof l.chatIdentity != "string" || (t.value = structuredClone(l), c.value = "");
    }
    function ae(l) {
      if (!n(l)) return null;
      const a = n(l.state) ? l.state : l;
      return typeof a.chatIdentity == "string" ? a : null;
    }
    function h(l) {
      const a = l instanceof Error ? l.message : String(l);
      return a === "tasks_insufficient_funds" ? "小白币余额不足，任务没有发布。" : a === "tasks_state_changed" || a === "tasks_listing_already_accepted" ? "任务状态已经变化，请按最新状态重试。" : a === "tasks_terminal" ? "该任务已经结束，不能再次操作。" : a === "tasks_publish_invalid" || a === "tasks_request_invalid" ? "任务内容不完整或超出允许范围。" : a === "tasks_write_blocked" || a === "tasks_generation_active" ? "当前有生成或保存正在进行，请稍后重试。" : a === "tasks_chat_changed" ? "聊天已经切换，请重新打开任务。" : a === "host_request_timeout" ? "操作响应超时，结果可能稍后返回，请勿立即重复。" : "任务操作未完成，请稍后重试。";
    }
    async function B(l, a = {}, v = ia) {
      return i(await k.bridge.request(l, {
        chatIdentity: t.value.chatIdentity,
        ...a
      }, v));
    }
    function T(l, a) {
      if (f !== a) return;
      const v = ae(l);
      v?.chatIdentity === t.value.chatIdentity && Y(v);
    }
    function R(l) {
      J.value = l, c.value = "";
    }
    async function se() {
      if (j.value || U.value) return;
      j.value = !0, c.value = "";
      const l = f;
      try {
        const a = await B("tasks/refresh", {}, _);
        if (!E) return;
        T(a, l);
        const v = n(a) && n(a.outcome) ? a.outcome : null;
        R(typeof v?.message == "string" ? v.message : "任务已刷新");
      } catch (a) {
        E && (c.value = h(a));
      } finally {
        E && (j.value = !1);
      }
    }
    async function le(l, a) {
      if (C.value) return;
      m.value = !0;
      const v = f;
      try {
        T(await B("tasks/board/accept", {
          boardId: l,
          listingId: a
        }), v), R("任务已接取，报酬已进入托管。");
      } catch (S) {
        c.value = h(S);
      } finally {
        m.value = !1;
      }
    }
    async function ne(l) {
      if (L.value || U.value) return;
      L.value = l.taskId;
      const a = f;
      try {
        const v = await B("tasks/candidates/refresh", {
          taskId: l.taskId,
          expectedTaskRevision: l.taskRevision,
          expectedEventId: l.eventId
        }, _);
        T(v, a);
        const S = n(v) && n(v.outcome) ? v.outcome : null;
        R(typeof S?.message == "string" ? S.message : "招募请求已结束");
      } catch (v) {
        c.value = h(v);
      } finally {
        L.value = "";
      }
    }
    async function ie(l, a) {
      if (C.value) return;
      m.value = !0;
      const v = f;
      try {
        T(await B("tasks/candidates/assign", {
          taskId: l.taskId,
          expectedTaskRevision: l.taskRevision,
          expectedEventId: l.eventId,
          candidateId: a
        }), v), R("执行者已确认，任务进入进行中。");
      } catch (S) {
        c.value = h(S);
      } finally {
        m.value = !1;
      }
    }
    async function ue(l) {
      if (C.value || !globalThis.confirm(`撤回“${l.title}”并退回 ¤ ${l.reward}？`)) return;
      m.value = !0;
      const a = f;
      try {
        T(await B("tasks/cancel", {
          taskId: l.taskId,
          expectedTaskRevision: l.taskRevision,
          expectedEventId: l.eventId
        }), a), R("任务已撤回，托管报酬已退回钱包。");
      } catch (v) {
        c.value = h(v);
      } finally {
        m.value = !1;
      }
    }
    function re(l) {
      C.value || (I.value = structuredClone(l));
    }
    async function de() {
      const l = I.value;
      if (!l || C.value) return;
      m.value = !0;
      const a = f;
      try {
        T(await B("tasks/publish", { form: l }), a), I.value = null, o.value = "published", R("任务已发布，报酬已锁入托管。");
      } catch (v) {
        c.value = h(v);
      } finally {
        m.value = !1;
      }
    }
    async function oe(l) {
      if (O.value) return;
      O.value = !0;
      const a = f;
      try {
        T(await B("tasks/settings/update", { autoMaintenance: l }), a), R(l ? "已开启任务进展自动更新。" : "已关闭任务进展自动更新。");
      } catch (v) {
        c.value = h(v);
      } finally {
        O.value = !1;
      }
    }
    async function ve() {
      if (t.value.maintenance.state === "running" || U.value) return;
      const l = f;
      try {
        T(await B("tasks/maintenance/run"), l);
      } catch (a) {
        c.value = h(a);
      }
    }
    async function W(l) {
      z.value = o.value === "detail" || o.value === "publish" ? "active" : o.value, o.value = "detail", Q.value = null, G.value = !0;
      try {
        const a = await B("tasks/detail/read", { taskId: l });
        n(a) && n(a.task) && Array.isArray(a.timeline) && (Q.value = structuredClone(a));
      } catch (a) {
        c.value = h(a);
      } finally {
        G.value = !1;
      }
    }
    async function be() {
      const l = t.value.history.nextCursor;
      if (!l || F.value) return;
      F.value = !0;
      const a = {
        cursor: l,
        stateVersion: f
      };
      try {
        const v = await B("tasks/history/load-more", { cursor: l });
        if (E && n(v) && Array.isArray(v.items)) {
          const S = v, Z = Jt(t.value.history, S, a, f);
          Z && (t.value.history = Z);
        }
      } catch (v) {
        c.value = h(v);
      } finally {
        F.value = !1;
      }
    }
    async function ye() {
      if (w.value) return;
      w.value = !0;
      const l = f;
      try {
        T(await B("tasks/save/confirm"), l), R("保存结果已重新核实。");
      } catch (a) {
        c.value = h(a);
      } finally {
        w.value = !1;
      }
    }
    async function ke() {
      if (w.value) return;
      w.value = !0;
      const l = f;
      try {
        T(await B("tasks/save/adopt-server"), l), R("已采用服务端数据。");
      } catch (a) {
        c.value = h(a);
      } finally {
        w.value = !1;
      }
    }
    function M(l) {
      l !== "publish" && (z.value = l), o.value = l;
    }
    return me(o, (l) => {
      const a = l === "publish" ? "published" : l;
      k.bridge.post("tasks/activate", {
        chatIdentity: t.value.chatIdentity,
        page: a
      });
    }), $e(() => {
      E = !0, X = k.bridge.subscribe((l) => {
        if (l.type === "tasks/state") {
          const a = l.payload?.state;
          a && (f += 1, Y(a));
        }
        l.type === "tasks/error" && (c.value = "任务状态暂时无法读取，请重新打开。");
      }), k.bridge.post("tasks/activate", {
        chatIdentity: t.value.chatIdentity,
        page: "board"
      });
    }), fe(() => {
      E = !1, X(), I.value = null;
    }), (l, a) => (r(), d("main", Kt, [
      e("header", Wt, [a[11] || (a[11] = e("div", { class: "tasks-brand" }, [e("span", { "aria-hidden": "true" }, [
        e("i"),
        e("i"),
        e("i")
      ]), e("div", null, [e("h1", null, "任务")])], -1)), e("div", Xt, [a[10] || (a[10] = e("small", null, "可用余额", -1)), e("strong", null, "¤ " + u(t.value.playerBalance), 1)])]),
      t.value.message || c.value || J.value ? (r(), d("aside", {
        key: 0,
        class: q(["tasks-notice", {
          "is-error": !!c.value || t.value.status === "conflict" || t.value.status === "blocked",
          "is-warning": K.value
        }]),
        role: "status"
      }, [
        e("span", null, u(c.value ? "!" : K.value ? "?" : "i"), 1),
        e("p", null, u(c.value || t.value.message || J.value), 1),
        K.value ? (r(), d("button", {
          key: 0,
          type: "button",
          disabled: w.value,
          onClick: ye
        }, u(w.value ? "正在核实…" : "核实保存结果"), 9, Yt)) : t.value.status === "conflict" ? (r(), d("button", {
          key: 1,
          type: "button",
          disabled: w.value,
          onClick: ke
        }, u(w.value ? "正在采用…" : "采用服务端数据"), 9, Zt)) : $("", !0)
      ], 2)) : $("", !0),
      e("div", _t, [o.value === "board" ? (r(), D(ot, {
        key: 0,
        board: t.value.board,
        busy: j.value,
        "disabled-reason": U.value,
        onRefresh: se,
        onAccept: le
      }, null, 8, [
        "board",
        "busy",
        "disabled-reason"
      ])) : o.value === "active" ? (r(), D(Ye, {
        key: 1,
        records: t.value.active,
        onDetail: W
      }, null, 8, ["records"])) : o.value === "published" ? (r(), D(Vt, {
        key: 2,
        records: t.value.recruiting,
        "candidate-busy-task-id": L.value,
        "write-busy": m.value,
        "disabled-reason": C.value,
        onRecruit: ne,
        onAssign: ie,
        onCancel: ue,
        onDetail: W,
        onPublish: a[0] || (a[0] = (v) => M("publish"))
      }, null, 8, [
        "records",
        "candidate-busy-task-id",
        "write-busy",
        "disabled-reason"
      ])) : o.value === "history" ? (r(), D(pt, {
        key: 3,
        history: t.value.history,
        loading: F.value,
        onDetail: W,
        onLoadMore: be
      }, null, 8, ["history", "loading"])) : o.value === "settings" ? (r(), D(Gt, {
        key: 4,
        "auto-maintenance": t.value.settings.autoMaintenance,
        "settings-busy": O.value,
        "maintenance-busy": t.value.maintenance.state === "running",
        "maintenance-message": te.value,
        "disabled-reason": U.value,
        onUpdate: oe,
        onMaintain: ve
      }, null, 8, [
        "auto-maintenance",
        "settings-busy",
        "maintenance-busy",
        "maintenance-message",
        "disabled-reason"
      ])) : o.value === "publish" ? (r(), D(Le, {
        key: 5,
        balance: t.value.playerBalance,
        busy: m.value,
        "disabled-reason": C.value,
        onSubmit: re,
        onCancel: a[1] || (a[1] = (v) => M("published"))
      }, null, 8, [
        "balance",
        "busy",
        "disabled-reason"
      ])) : (r(), D(Ae, {
        key: 6,
        detail: Q.value,
        loading: G.value,
        onBack: a[2] || (a[2] = (v) => M(z.value))
      }, null, 8, ["detail", "loading"]))]),
      e("nav", ea, [
        e("button", {
          type: "button",
          class: q({ "is-active": o.value === "board" }),
          onClick: a[3] || (a[3] = (v) => M("board"))
        }, [...a[12] || (a[12] = [e("span", null, "⌁", -1), p("大厅", -1)])], 2),
        e("button", {
          type: "button",
          class: q({ "is-active": o.value === "active" }),
          onClick: a[4] || (a[4] = (v) => M("active"))
        }, [
          a[13] || (a[13] = e("span", null, "▶", -1)),
          a[14] || (a[14] = p("进行中", -1)),
          t.value.active.length ? (r(), d("b", ta, u(t.value.active.length), 1)) : $("", !0)
        ], 2),
        e("button", {
          type: "button",
          class: q({ "is-active": o.value === "published" || o.value === "publish" }),
          onClick: a[5] || (a[5] = (v) => M("published"))
        }, [
          a[15] || (a[15] = e("span", null, "◇", -1)),
          a[16] || (a[16] = p("我发布的", -1)),
          t.value.recruiting.length ? (r(), d("b", aa, u(t.value.recruiting.length), 1)) : $("", !0)
        ], 2),
        e("button", {
          type: "button",
          class: q({ "is-active": o.value === "history" }),
          onClick: a[6] || (a[6] = (v) => M("history"))
        }, [...a[17] || (a[17] = [e("span", null, "▤", -1), p("历史", -1)])], 2),
        e("button", {
          type: "button",
          class: q({ "is-active": o.value === "settings" }),
          onClick: a[7] || (a[7] = (v) => M("settings"))
        }, [...a[18] || (a[18] = [e("span", null, "⚙", -1), p("设置", -1)])], 2)
      ]),
      I.value ? (r(), d("div", {
        key: 1,
        class: "tasks-dialog-backdrop",
        onClick: a[9] || (a[9] = ee((v) => !m.value && (I.value = null), ["self"]))
      }, [e("section", sa, [
        a[20] || (a[20] = e("h2", { id: "tasks-publish-confirm-title" }, "确认发布任务？", -1)),
        e("p", null, [
          p("“" + u(I.value.title) + "”将立即从钱包锁定 ", 1),
          e("strong", null, "¤ " + u(I.value.reward), 1),
          a[19] || (a[19] = p("。招募期间可以撤回；选定执行者后不能撤回。", -1))
        ]),
        e("div", null, [e("button", {
          type: "button",
          disabled: m.value,
          onClick: a[8] || (a[8] = (v) => I.value = null)
        }, "返回修改", 8, la), e("button", {
          type: "button",
          class: "tasks-primary-button",
          disabled: !!C.value,
          title: C.value || void 0,
          onClick: de
        }, u(m.value ? "正在保存…" : "确认发布"), 9, na)])
      ])])) : $("", !0)
    ]));
  }
}), oa = ua;
export {
  oa as default
};
