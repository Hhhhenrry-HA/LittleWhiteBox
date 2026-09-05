/* eslint-disable */
import { A as B, D as V, M as ye, Q as M, S as P, _ as ce, a as j, c as g, et as n, f as p, k as me, l as d, m as R, o as e, p as fe, r as S, s as D, x as r, y as ge } from "./xiaobai-os-runtime-core.esm-bundler-Dmqi2Zbl.js";
import { a as N, c as _ } from "./xiaobai-os-runtime-dom.esm-bundler-BYy7nd4d.js";
var pe = { class: "tasks-page tasks-detail-page" }, $e = { class: "tasks-page-heading" }, he = ["data-status"], Be = {
  key: 0,
  class: "tasks-empty"
}, we = { class: "tasks-contract-sheet" }, Ce = { class: "tasks-party-line" }, Ie = { key: 0 }, Te = { key: 1 }, Re = { class: "tasks-timeline" }, xe = {
  key: 2,
  class: "tasks-empty"
}, Me = /* @__PURE__ */ R({
  __name: "TaskDetail",
  props: {
    detail: {},
    loading: { type: Boolean }
  },
  emits: ["back"],
  setup(s, { emit: y }) {
    const k = y, v = {
      recruiting: "招募中",
      active: "进行中",
      completed: "已完成",
      failed: "已失败",
      cancelled: "已撤回"
    };
    function u(i) {
      return new Date(i).toLocaleString("zh-CN", { hour12: !1 });
    }
    return (i, t) => (r(), d("section", pe, [e("header", $e, [e("button", {
      type: "button",
      class: "tasks-back",
      onClick: t[0] || (t[0] = (o) => k("back"))
    }, "← 返回"), s.detail ? (r(), d("span", {
      key: 0,
      class: "tasks-detail-status",
      "data-status": s.detail.task.status
    }, n(v[s.detail.task.status]), 9, he)) : g("", !0)]), s.loading ? (r(), d("div", Be, [...t[1] || (t[1] = [e("h3", null, "正在读取任务…", -1)])])) : s.detail ? (r(), d(S, { key: 1 }, [e("article", we, [
      e("header", null, [e("div", null, [e("small", null, n(s.detail.task.grade) + " · " + n(s.detail.task.source === "received" ? "大厅任务" : "我的任务"), 1), e("h2", null, n(s.detail.task.title), 1)]), e("strong", null, "¤ " + n(s.detail.task.reward), 1)]),
      e("div", Ce, [
        e("span", null, [t[2] || (t[2] = p("出资方", -1)), e("strong", null, n(s.detail.task.issuer.displayName), 1)]),
        t[4] || (t[4] = e("i", null, "→", -1)),
        e("span", null, [t[3] || (t[3] = p("执行方", -1)), e("strong", null, n(s.detail.task.assignee?.displayName || "等待指派"), 1)])
      ]),
      e("dl", null, [
        e("div", null, [t[5] || (t[5] = e("dt", null, "唯一完成目标", -1)), e("dd", null, n(s.detail.task.objective), 1)]),
        e("div", null, [t[6] || (t[6] = e("dt", null, "执行约束", -1)), e("dd", null, n(s.detail.task.requirements || "无附加执行约束"), 1)]),
        e("div", null, [t[7] || (t[7] = e("dt", null, "行动地点", -1)), e("dd", null, n(s.detail.task.location), 1)]),
        s.detail.task.timing ? (r(), d("div", Ie, [t[8] || (t[8] = e("dt", null, "时机", -1)), e("dd", null, n(s.detail.task.timing), 1)])) : g("", !0),
        e("div", null, [t[9] || (t[9] = e("dt", null, "合同风险", -1)), e("dd", null, n(s.detail.task.risk || "未注明"), 1)]),
        e("div", null, [t[10] || (t[10] = e("dt", null, "累计进展", -1)), e("dd", null, n(s.detail.task.progressSummary || "尚无已确认进展"), 1)]),
        s.detail.task.resultSummary ? (r(), d("div", Te, [t[11] || (t[11] = e("dt", null, "最终结果", -1)), e("dd", null, n(s.detail.task.resultSummary), 1)])) : g("", !0)
      ])
    ]), e("section", Re, [t[13] || (t[13] = e("h3", null, "任务进展", -1)), e("ol", null, [(r(!0), d(S, null, P(s.detail.timeline, (o) => (r(), d("li", { key: o.eventId }, [t[12] || (t[12] = e("i", null, null, -1)), e("div", null, [e("small", null, n(u(o.createdAt)), 1), e("p", null, n(o.summary), 1)])]))), 128))])])], 64)) : (r(), d("div", xe, [...t[14] || (t[14] = [e("h3", null, "任务无法读取", -1), e("p", null, "请返回后重试。", -1)])]))]));
  }
}), Se = Me, qe = { class: "tasks-page tasks-publish-page" }, Ae = { class: "tasks-page-heading" }, De = ["disabled"], Pe = { class: "tasks-reward-input" }, Ve = ["disabled"], je = ["disabled", "title"], Ne = /* @__PURE__ */ R({
  __name: "TaskPublishForm",
  props: {
    balance: {},
    busy: { type: Boolean },
    disabledReason: {}
  },
  emits: ["submit", "cancel"],
  setup(s, { emit: y }) {
    const k = y, v = me({
      title: "",
      objective: "",
      requirements: "",
      location: "",
      risk: "",
      reward: 20
    });
    function u() {
      k("submit", {
        title: v.title,
        objective: v.objective,
        ...v.requirements.trim() ? { requirements: v.requirements } : {},
        location: v.location,
        risk: v.risk,
        reward: Number(v.reward)
      });
    }
    return (i, t) => (r(), d("section", qe, [e("header", Ae, [e("button", {
      type: "button",
      class: "tasks-back",
      disabled: s.busy,
      onClick: t[0] || (t[0] = (o) => k("cancel"))
    }, "← 返回", 8, De), t[8] || (t[8] = e("div", null, [e("h2", null, "发布任务")], -1))]), e("form", {
      class: "tasks-publish-form",
      onSubmit: _(u, ["prevent"])
    }, [
      e("aside", null, [
        t[9] || (t[9] = e("small", null, "当前可用余额", -1)),
        e("strong", null, "¤ " + n(s.balance), 1),
        t[10] || (t[10] = e("p", null, "发布后，报酬会立即托管。招募期间撤回可全额退回；选定执行者后不可撤回。", -1))
      ]),
      e("label", null, [t[11] || (t[11] = e("span", null, [p("任务标题 "), e("b", null, "*")], -1)), V(e("input", {
        "onUpdate:modelValue": t[1] || (t[1] = (o) => v.title = o),
        required: "",
        maxlength: "120",
        autocomplete: "off",
        placeholder: "一句清楚的任务名称"
      }, null, 512), [[N, v.title]])]),
      e("label", null, [t[12] || (t[12] = e("span", null, [p("唯一完成目标 "), e("b", null, "*")], -1)), V(e("textarea", {
        "onUpdate:modelValue": t[2] || (t[2] = (o) => v.objective = o),
        required: "",
        maxlength: "8000",
        rows: "4",
        placeholder: "只写一个可以明确判定完成的目标"
      }, null, 512), [[N, v.objective]])]),
      e("label", null, [t[13] || (t[13] = e("span", null, "执行约束", -1)), V(e("textarea", {
        "onUpdate:modelValue": t[3] || (t[3] = (o) => v.requirements = o),
        maxlength: "8000",
        rows: "3",
        placeholder: "可空；只约束执行方式，不增加第二目标"
      }, null, 512), [[N, v.requirements]])]),
      e("label", null, [t[14] || (t[14] = e("span", null, [p("行动地点 "), e("b", null, "*")], -1)), V(e("input", {
        "onUpdate:modelValue": t[4] || (t[4] = (o) => v.location = o),
        required: "",
        maxlength: "600",
        autocomplete: "off",
        placeholder: "目标行动实际发生的位置"
      }, null, 512), [[N, v.location]])]),
      e("label", null, [t[15] || (t[15] = e("span", null, "已知风险", -1)), V(e("textarea", {
        "onUpdate:modelValue": t[5] || (t[5] = (o) => v.risk = o),
        maxlength: "2000",
        rows: "3",
        placeholder: "可空；写明一个具体坏结果"
      }, null, 512), [[N, v.risk]])]),
      e("label", Pe, [
        t[17] || (t[17] = e("span", null, [p("托管报酬 "), e("b", null, "*")], -1)),
        e("div", null, [t[16] || (t[16] = e("i", null, "¤", -1)), V(e("input", {
          "onUpdate:modelValue": t[6] || (t[6] = (o) => v.reward = o),
          type: "number",
          required: "",
          min: "1",
          step: "1"
        }, null, 512), [[
          N,
          v.reward,
          void 0,
          { number: !0 }
        ]])]),
        e("small", { class: M({ "is-danger": v.reward > s.balance }) }, "发布后可用余额：¤ " + n(s.balance - (Number(v.reward) || 0)), 3)
      ]),
      e("footer", null, [e("button", {
        type: "button",
        disabled: s.busy,
        onClick: t[7] || (t[7] = (o) => k("cancel"))
      }, "取消", 8, Ve), e("button", {
        type: "submit",
        class: "tasks-primary-button",
        disabled: s.busy || !!s.disabledReason || v.reward > s.balance,
        title: s.disabledReason
      }, n(s.busy ? "正在发布…" : "确认托管并发布"), 9, je)])
    ], 32)]));
  }
}), Ue = Ne, Ee = { class: "tasks-page" }, Le = { class: "tasks-page-heading" }, Fe = { class: "tasks-count" }, He = {
  key: 0,
  class: "tasks-empty"
}, Oe = {
  key: 1,
  class: "tasks-record-list"
}, ze = ["onClick"], Qe = { class: "tasks-record-grade" }, Ge = { class: "tasks-record-main" }, Je = { class: "tasks-record-aside" }, Ke = /* @__PURE__ */ R({
  __name: "TasksActive",
  props: { records: {} },
  emits: ["detail"],
  setup(s, { emit: y }) {
    const k = y;
    return (v, u) => (r(), d("section", Ee, [e("header", Le, [u[0] || (u[0] = e("div", null, [e("h2", null, "进行中的任务")], -1)), e("span", Fe, n(s.records.length), 1)]), s.records.length ? (r(), d("div", Oe, [(r(!0), d(S, null, P(s.records, (i) => (r(), d("button", {
      key: i.taskId,
      type: "button",
      class: "tasks-record",
      onClick: (t) => k("detail", i.taskId)
    }, [
      e("span", Qe, n(i.grade), 1),
      e("span", Ge, [
        e("small", null, n(i.source === "received" ? "大厅委托" : "我的委托") + " · " + n(i.location), 1),
        e("strong", null, n(i.title), 1),
        e("em", null, n(i.progressSummary), 1)
      ]),
      e("span", Je, [e("strong", null, "¤ " + n(i.reward), 1), e("small", null, n(i.assignee?.displayName || "未指派"), 1)])
    ], 8, ze))), 128))])) : (r(), d("div", He, [...u[1] || (u[1] = [e("h3", null, "当前没有进行中的任务", -1), e("p", null, "接取大厅任务，或为自己发布的任务选定执行者后，任务会出现在这里。", -1)])]))]));
  }
}), We = Ke, Xe = { class: "tasks-page tasks-board-page" }, Ye = { class: "tasks-page-heading" }, Ze = ["disabled", "title"], _e = {
  key: 0,
  class: "tasks-empty"
}, et = {
  key: 1,
  class: "tasks-board-grid"
}, tt = ["data-grade"], at = { class: "tasks-listing-body" }, st = { class: "tasks-hook" }, lt = { key: 0 }, nt = { class: "tasks-tags" }, it = [
  "disabled",
  "title",
  "onClick"
], ut = /* @__PURE__ */ R({
  __name: "TasksBoard",
  props: {
    board: {},
    busy: { type: Boolean },
    disabledReason: {}
  },
  emits: ["refresh", "accept"],
  setup(s, { emit: y }) {
    const k = y;
    return (v, u) => (r(), d("section", Xe, [e("header", Ye, [u[1] || (u[1] = e("div", null, [e("h2", null, "世界任务大厅")], -1)), e("button", {
      type: "button",
      class: "tasks-primary-button",
      disabled: s.busy || !!s.disabledReason,
      title: s.disabledReason,
      onClick: u[0] || (u[0] = (i) => k("refresh"))
    }, n(s.busy ? "正在刷新…" : "刷新任务"), 9, Ze)]), s.board ? (r(), d("div", et, [(r(!0), d(S, null, P(s.board.listings, (i) => (r(), d("article", {
      key: i.listingId,
      class: M(["tasks-listing", { "is-accepted": i.accepted }])
    }, [e("div", {
      class: "tasks-grade",
      "data-grade": i.grade
    }, [e("strong", null, n(i.grade), 1), e("small", null, n(i.tags[0]), 1)], 8, tt), e("div", at, [
      e("header", null, [e("div", null, [e("span", null, n(i.posture), 1), e("span", null, n(i.timing), 1)]), e("strong", null, "¤ " + n(i.reward), 1)]),
      e("h3", null, n(i.title), 1),
      e("p", st, n(i.hook), 1),
      e("dl", null, [
        e("div", null, [u[2] || (u[2] = e("dt", null, "唯一目标", -1)), e("dd", null, n(i.objective), 1)]),
        i.requirements ? (r(), d("div", lt, [u[3] || (u[3] = e("dt", null, "执行约束", -1)), e("dd", null, n(i.requirements), 1)])) : g("", !0),
        e("div", null, [u[4] || (u[4] = e("dt", null, "地点", -1)), e("dd", null, n(i.location), 1)]),
        e("div", null, [u[5] || (u[5] = e("dt", null, "风险", -1)), e("dd", null, n(i.risk), 1)])
      ]),
      e("footer", null, [e("div", nt, [(r(!0), d(S, null, P(i.tags, (t) => (r(), d("span", { key: t }, n(t), 1))), 128))]), e("button", {
        type: "button",
        disabled: i.accepted || s.busy || !!s.disabledReason,
        title: s.disabledReason,
        onClick: (t) => k("accept", s.board.boardId, i.listingId)
      }, n(i.accepted ? "已接取" : "接取任务"), 9, it)])
    ])], 2))), 128))])) : (r(), d("div", _e, [e("h3", null, n(s.busy ? "正在生成任务" : "当前没有任务"), 1), e("p", null, n(s.busy ? "生成在后台继续，无需停留在此页面。" : "请点击右上角“刷新任务”获取新任务。"), 1)]))]));
  }
}), rt = ut, dt = { class: "tasks-page" }, ot = { class: "tasks-page-heading" }, vt = { class: "tasks-count" }, bt = {
  key: 0,
  class: "tasks-empty"
}, kt = {
  key: 1,
  class: "tasks-history-list"
}, yt = ["data-status", "onClick"], ct = ["disabled"], mt = /* @__PURE__ */ R({
  __name: "TasksHistory",
  props: {
    history: {},
    loading: { type: Boolean }
  },
  emits: ["detail", "loadMore"],
  setup(s, { emit: y }) {
    const k = y, v = {
      completed: "已完成",
      failed: "已失败",
      cancelled: "已撤回"
    };
    return (u, i) => (r(), d("section", dt, [e("header", ot, [i[1] || (i[1] = e("div", null, [e("h2", null, "任务历史")], -1)), e("span", vt, n(s.history.items.length), 1)]), s.history.items.length ? (r(), d("div", kt, [(r(!0), d(S, null, P(s.history.items, (t) => (r(), d("button", {
      key: t.taskId,
      type: "button",
      class: "tasks-history-row",
      "data-status": t.status,
      onClick: (o) => k("detail", t.taskId)
    }, [
      e("span", null, n(v[t.status]), 1),
      e("strong", null, n(t.title), 1),
      e("em", null, n(t.resultSummary), 1),
      e("b", null, "¤ " + n(t.reward), 1)
    ], 8, yt))), 128)), s.history.hasMore ? (r(), d("button", {
      key: 0,
      type: "button",
      class: "tasks-load-more",
      disabled: s.loading,
      onClick: i[0] || (i[0] = (t) => k("loadMore"))
    }, n(s.loading ? "正在加载…" : "加载更多"), 9, ct)) : g("", !0)])) : (r(), d("div", bt, [...i[2] || (i[2] = [e("h3", null, "还没有历史任务", -1), e("p", null, "已完成、失败或撤回的任务会保存在这里。", -1)])]))]));
  }
}), ft = mt, gt = {
  key: 0,
  class: "tasks-candidates"
}, pt = [
  "disabled",
  "title",
  "onClick"
], $t = {
  key: 1,
  class: "tasks-inline-empty"
}, ht = /* @__PURE__ */ R({
  __name: "TaskCandidateList",
  props: {
    task: {},
    busy: { type: Boolean },
    disabledReason: {}
  },
  emits: ["assign"],
  setup(s, { emit: y }) {
    const k = y;
    return (v, u) => s.task.candidates.length ? (r(), d("div", gt, [(r(!0), d(S, null, P(s.task.candidates, (i) => (r(), d("article", {
      key: i.candidateId,
      class: "tasks-candidate"
    }, [
      e("header", null, [e("strong", null, n(i.name), 1), u[0] || (u[0] = e("span", null, "应征者", -1))]),
      e("p", null, n(i.description), 1),
      e("blockquote", null, "“" + n(i.pitch) + "”", 1),
      e("dl", null, [e("div", null, [u[1] || (u[1] = e("dt", null, "能力", -1)), e("dd", null, n(i.capability), 1)]), e("div", null, [u[2] || (u[2] = e("dt", null, "隐患", -1)), e("dd", null, n(i.risk), 1)])]),
      e("button", {
        type: "button",
        class: "tasks-primary-button",
        disabled: s.busy || !!s.disabledReason,
        title: s.disabledReason,
        onClick: (t) => k("assign", s.task, i.candidateId)
      }, " 选择此人 ", 8, pt)
    ]))), 128))])) : (r(), d("p", $t, "还没有候选人，请先招募；不再需要该任务时也可以撤回。"));
  }
}), Bt = ht, wt = { class: "tasks-page" }, Ct = { class: "tasks-page-heading" }, It = ["disabled", "title"], Tt = {
  key: 0,
  class: "tasks-empty"
}, Rt = {
  key: 1,
  class: "tasks-published-list"
}, xt = { key: 0 }, Mt = { key: 1 }, St = { class: "tasks-published-actions" }, qt = ["onClick"], At = [
  "disabled",
  "title",
  "onClick"
], Dt = [
  "disabled",
  "title",
  "onClick"
], Pt = /* @__PURE__ */ R({
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
  setup(s, { emit: y }) {
    const k = y;
    return (v, u) => (r(), d("section", wt, [e("header", Ct, [u[2] || (u[2] = e("div", null, [e("h2", null, "我发布的任务")], -1)), e("button", {
      type: "button",
      class: "tasks-primary-button",
      disabled: !!s.disabledReason,
      title: s.disabledReason,
      onClick: u[0] || (u[0] = (i) => k("publish"))
    }, "发布新任务", 8, It)]), s.records.length ? (r(), d("div", Rt, [(r(!0), d(S, null, P(s.records, (i) => (r(), d("article", {
      key: i.taskId,
      class: "tasks-published-card"
    }, [
      e("header", null, [e("div", null, [u[4] || (u[4] = e("small", null, "招募中 · 报酬已托管", -1)), e("h3", null, n(i.title), 1)]), e("strong", null, "¤ " + n(i.reward), 1)]),
      e("dl", null, [
        e("div", null, [u[5] || (u[5] = e("dt", null, "唯一目标", -1)), e("dd", null, n(i.objective), 1)]),
        i.requirements ? (r(), d("div", xt, [u[6] || (u[6] = e("dt", null, "执行约束", -1)), e("dd", null, n(i.requirements), 1)])) : g("", !0),
        e("div", null, [u[7] || (u[7] = e("dt", null, "地点", -1)), e("dd", null, n(i.location), 1)]),
        i.risk ? (r(), d("div", Mt, [u[8] || (u[8] = e("dt", null, "风险", -1)), e("dd", null, n(i.risk), 1)])) : g("", !0)
      ]),
      e("div", St, [
        e("button", {
          type: "button",
          onClick: (t) => k("detail", i.taskId)
        }, "查看详情", 8, qt),
        e("button", {
          type: "button",
          disabled: s.writeBusy || !!s.candidateBusyTaskId || !!s.disabledReason,
          title: s.disabledReason,
          onClick: (t) => k("recruit", i)
        }, n(s.candidateBusyTaskId === i.taskId ? "正在招募…" : "招募候选人"), 9, At),
        e("button", {
          type: "button",
          class: "is-danger",
          disabled: s.writeBusy || !!s.disabledReason,
          title: s.disabledReason,
          onClick: (t) => k("cancel", i)
        }, "撤回并退款", 8, Dt)
      ]),
      fe(Bt, {
        task: i,
        busy: s.writeBusy || !!s.candidateBusyTaskId,
        "disabled-reason": s.disabledReason,
        onAssign: u[1] || (u[1] = (t, o) => k("assign", t, o))
      }, null, 8, [
        "task",
        "busy",
        "disabled-reason"
      ])
    ]))), 128))])) : (r(), d("div", Tt, [...u[3] || (u[3] = [e("h3", null, "还没有发布任务", -1), e("p", null, "点击右上角“发布新任务”创建委托。", -1)])]))]));
  }
}), Vt = Pt, jt = { class: "tasks-page tasks-settings-page" }, Nt = { class: "tasks-setting-card" }, Ut = { class: "tasks-switch" }, Et = ["checked", "disabled"], Lt = { class: "tasks-setting-card is-manual" }, Ft = ["disabled", "title"], Ht = {
  key: 0,
  class: "tasks-maintenance-message",
  role: "status"
}, Ot = /* @__PURE__ */ R({
  __name: "TasksSettings",
  props: {
    autoMaintenance: { type: Boolean },
    settingsBusy: { type: Boolean },
    maintenanceBusy: { type: Boolean },
    maintenanceMessage: {},
    disabledReason: {}
  },
  emits: ["update", "maintain"],
  setup(s, { emit: y }) {
    const k = y;
    return (v, u) => (r(), d("section", jt, [
      u[5] || (u[5] = e("header", { class: "tasks-page-heading" }, [e("div", null, [e("h2", null, "任务设置")])], -1)),
      e("article", Nt, [u[3] || (u[3] = e("div", null, [e("h3", null, "自动更新任务进展"), e("p", null, "开启后，每次对话推进时，系统会根据最新剧情更新进行中任务的进展和结果。")], -1)), e("label", Ut, [
        e("input", {
          type: "checkbox",
          checked: s.autoMaintenance,
          disabled: s.settingsBusy,
          onChange: u[0] || (u[0] = (i) => k("update", i.target.checked))
        }, null, 40, Et),
        u[2] || (u[2] = e("span", null, null, -1)),
        e("em", null, n(s.autoMaintenance ? "开启" : "关闭"), 1)
      ])]),
      e("article", Lt, [u[4] || (u[4] = e("div", null, [e("h3", null, "立即更新任务"), e("p", null, "根据当前最新剧情，检查所有进行中的任务并更新状态。")], -1)), e("button", {
        type: "button",
        disabled: s.maintenanceBusy || !!s.disabledReason,
        title: s.disabledReason,
        onClick: u[1] || (u[1] = (i) => k("maintain"))
      }, n(s.maintenanceBusy ? "正在更新…" : "立即更新"), 9, Ft)]),
      s.maintenanceMessage ? (r(), d("p", Ht, n(s.maintenanceMessage), 1)) : g("", !0)
    ]));
  }
}), zt = Ot;
function Qt(s, y, k, v) {
  if (v !== k.stateVersion || s.nextCursor !== k.cursor) return null;
  const u = new Set(s.items.map((i) => i.taskId));
  return {
    items: [...s.items, ...y.items.filter((i) => !u.has(i.taskId))],
    nextCursor: y.nextCursor,
    hasMore: y.hasMore
  };
}
var Gt = { class: "tasks-app" }, Jt = { class: "tasks-app-header" }, Kt = { class: "tasks-balance" }, Wt = ["disabled"], Xt = ["disabled"], Yt = {
  key: 1,
  class: "tasks-notice",
  role: "status"
}, Zt = { class: "tasks-content" }, _t = {
  class: "tasks-nav",
  "aria-label": "任务页面"
}, ea = { key: 0 }, ta = { key: 0 }, aa = {
  class: "tasks-dialog",
  role: "alertdialog",
  "aria-modal": "true",
  "aria-labelledby": "tasks-publish-confirm-title"
}, sa = ["disabled"], la = ["disabled", "title"], na = 35e3, ia = /* @__PURE__ */ R({
  __name: "TasksApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(s) {
    const y = s;
    function k() {
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
    function v(l) {
      return l && typeof l == "object" ? structuredClone(ye(l)) : k();
    }
    function u(l) {
      return l !== null && typeof l == "object" && !Array.isArray(l);
    }
    function i(l) {
      return u(l) ? l.result : null;
    }
    const t = B(v(y.initialState)), o = B("board"), H = B("board"), O = B(null), T = B(null), K = j(() => t.value.generation.state === "running" && t.value.generation.kind === "board"), W = j(() => t.value.generation.state === "running" && t.value.generation.kind === "candidates" ? t.value.generation.taskId ?? "" : ""), m = B(!1), L = B(!1), w = B(!1), z = B(!1), F = B(!1), c = B(""), Q = B("");
    let f = 0, q = !1, X = () => {
    };
    const G = j(() => t.value.status === "unconfirmed"), C = j(() => m.value ? "正在处理上一项任务操作" : t.value.status === "loading" ? "任务数据正在准备" : t.value.status === "saving" ? "任务与资金正在保存" : t.value.status === "unconfirmed" ? "请先核实上一次保存结果" : t.value.status === "conflict" ? "请先采用服务端数据" : t.value.status === "blocked" ? t.value.message || "任务暂时不可用" : t.value.generationActive ? "正在生成内容，请稍后" : ""), U = j(() => C.value || (t.value.maintenance.state === "running" ? "正在更新任务" : "")), ee = j(() => {
      const l = t.value.maintenance.lastOutcome;
      return l === "updated" ? "任务已更新。" : l === "unchanged" ? "当前任务无需更新。" : l === "partial" ? "部分任务状态已保存。" : l === "failed" ? "任务更新失败，请稍后重试。" : l === "cancelled" ? "本次任务更新已取消。" : l === "no-work" ? "当前没有需要更新的任务进展。" : "";
    });
    function Y(l) {
      !l || typeof l.chatIdentity != "string" || (t.value = structuredClone(l), c.value = "");
    }
    function te(l) {
      if (!u(l)) return null;
      const a = u(l.state) ? l.state : l;
      return typeof a.chatIdentity == "string" ? a : null;
    }
    function $(l) {
      const a = l instanceof Error ? l.message : String(l);
      return a === "tasks_insufficient_funds" ? "小白币余额不足，任务没有发布。" : a === "tasks_state_changed" || a === "tasks_listing_already_accepted" ? "任务状态已经变化，请按最新状态重试。" : a === "tasks_terminal" ? "该任务已经结束，不能再次操作。" : a === "tasks_publish_invalid" || a === "tasks_request_invalid" ? "任务内容不完整或超出允许范围。" : a === "tasks_write_blocked" || a === "tasks_generation_active" ? "当前有生成或保存正在进行，请稍后重试。" : a === "tasks_chat_changed" ? "聊天已经切换，请重新打开任务。" : a === "host_request_timeout" ? "操作响应超时，结果可能稍后返回，请勿立即重复。" : "任务操作未完成，请稍后重试。";
    }
    async function h(l, a = {}, b = na) {
      return i(await y.bridge.request(l, {
        chatIdentity: t.value.chatIdentity,
        ...a
      }, b));
    }
    function I(l, a) {
      if (f !== a) return;
      const b = te(l);
      b?.chatIdentity === t.value.chatIdentity && Y(b);
    }
    function A(l) {
      Q.value = l, c.value = "";
    }
    async function ae() {
      if (K.value || U.value) return;
      c.value = "";
      const l = f;
      try {
        const a = await h("tasks/refresh");
        if (!q) return;
        I(a, l);
      } catch (a) {
        q && (c.value = $(a));
      }
    }
    async function se(l, a) {
      if (C.value) return;
      m.value = !0;
      const b = f;
      try {
        I(await h("tasks/board/accept", {
          boardId: l,
          listingId: a
        }), b), A("任务已接取，报酬已进入托管。");
      } catch (E) {
        c.value = $(E);
      } finally {
        m.value = !1;
      }
    }
    async function le(l) {
      if (W.value || U.value) return;
      c.value = "";
      const a = f;
      try {
        const b = await h("tasks/candidates/refresh", {
          taskId: l.taskId,
          expectedTaskRevision: l.taskRevision,
          expectedEventId: l.eventId
        });
        if (!q) return;
        I(b, a);
      } catch (b) {
        q && (c.value = $(b));
      }
    }
    async function ne(l, a) {
      if (C.value) return;
      m.value = !0;
      const b = f;
      try {
        I(await h("tasks/candidates/assign", {
          taskId: l.taskId,
          expectedTaskRevision: l.taskRevision,
          expectedEventId: l.eventId,
          candidateId: a
        }), b), A("执行者已确认，任务进入进行中。");
      } catch (E) {
        c.value = $(E);
      } finally {
        m.value = !1;
      }
    }
    async function ie(l) {
      if (C.value || !globalThis.confirm(`撤回“${l.title}”并退回 ¤ ${l.reward}？`)) return;
      m.value = !0;
      const a = f;
      try {
        I(await h("tasks/cancel", {
          taskId: l.taskId,
          expectedTaskRevision: l.taskRevision,
          expectedEventId: l.eventId
        }), a), A("任务已撤回，托管报酬已退回钱包。");
      } catch (b) {
        c.value = $(b);
      } finally {
        m.value = !1;
      }
    }
    function ue(l) {
      C.value || (T.value = structuredClone(l));
    }
    async function re() {
      const l = T.value;
      if (!l || C.value) return;
      m.value = !0;
      const a = f;
      try {
        I(await h("tasks/publish", { form: l }), a), T.value = null, o.value = "published", A("任务已发布，报酬已锁入托管。");
      } catch (b) {
        c.value = $(b);
      } finally {
        m.value = !1;
      }
    }
    async function de(l) {
      if (L.value) return;
      L.value = !0;
      const a = f;
      try {
        I(await h("tasks/settings/update", { autoMaintenance: l }), a), A(l ? "已开启任务进展自动更新。" : "已关闭任务进展自动更新。");
      } catch (b) {
        c.value = $(b);
      } finally {
        L.value = !1;
      }
    }
    async function oe() {
      if (t.value.maintenance.state === "running" || U.value) return;
      const l = f;
      try {
        I(await h("tasks/maintenance/run"), l);
      } catch (a) {
        c.value = $(a);
      }
    }
    async function J(l) {
      H.value = o.value === "detail" || o.value === "publish" ? "active" : o.value, o.value = "detail", O.value = null, z.value = !0;
      try {
        const a = await h("tasks/detail/read", { taskId: l });
        u(a) && u(a.task) && Array.isArray(a.timeline) && (O.value = structuredClone(a));
      } catch (a) {
        c.value = $(a);
      } finally {
        z.value = !1;
      }
    }
    async function ve() {
      const l = t.value.history.nextCursor;
      if (!l || F.value) return;
      F.value = !0;
      const a = {
        cursor: l,
        stateVersion: f
      };
      try {
        const b = await h("tasks/history/load-more", { cursor: l });
        if (q && u(b) && Array.isArray(b.items)) {
          const E = b, Z = Qt(t.value.history, E, a, f);
          Z && (t.value.history = Z);
        }
      } catch (b) {
        c.value = $(b);
      } finally {
        F.value = !1;
      }
    }
    async function be() {
      if (w.value) return;
      w.value = !0;
      const l = f;
      try {
        I(await h("tasks/save/confirm"), l), A("保存结果已重新核实。");
      } catch (a) {
        c.value = $(a);
      } finally {
        w.value = !1;
      }
    }
    async function ke() {
      if (w.value) return;
      w.value = !0;
      const l = f;
      try {
        I(await h("tasks/save/adopt-server"), l), A("已采用服务端数据。");
      } catch (a) {
        c.value = $(a);
      } finally {
        w.value = !1;
      }
    }
    function x(l) {
      l !== "publish" && (H.value = l), o.value = l;
    }
    return ge(() => {
      q = !0, X = y.bridge.subscribe((l) => {
        if (l.type === "tasks/state") {
          const a = l.payload?.state;
          a && (f += 1, Y(a));
        }
        l.type === "tasks/error" && (c.value = "任务状态暂时无法读取，请重新打开。");
      }), y.bridge.post("tasks/activate", { chatIdentity: t.value.chatIdentity });
    }), ce(() => {
      q = !1, X(), T.value = null;
    }), (l, a) => (r(), d("main", Gt, [
      e("header", Jt, [a[11] || (a[11] = e("div", { class: "tasks-brand" }, [e("span", { "aria-hidden": "true" }, [
        e("i"),
        e("i"),
        e("i")
      ]), e("div", null, [e("h1", null, "任务")])], -1)), e("div", Kt, [a[10] || (a[10] = e("small", null, "可用余额", -1)), e("strong", null, "¤ " + n(t.value.playerBalance), 1)])]),
      t.value.message || c.value || Q.value ? (r(), d("aside", {
        key: 0,
        class: M(["tasks-notice", {
          "is-error": !!c.value || t.value.status === "conflict" || t.value.status === "blocked",
          "is-warning": G.value
        }]),
        role: "status"
      }, [
        e("span", null, n(c.value ? "!" : G.value ? "?" : "i"), 1),
        e("p", null, n(c.value || t.value.message || Q.value), 1),
        G.value ? (r(), d("button", {
          key: 0,
          type: "button",
          disabled: w.value,
          onClick: be
        }, n(w.value ? "正在核实…" : "核实保存结果"), 9, Wt)) : t.value.status === "conflict" ? (r(), d("button", {
          key: 1,
          type: "button",
          disabled: w.value,
          onClick: ke
        }, n(w.value ? "正在采用…" : "采用服务端数据"), 9, Xt)) : g("", !0)
      ], 2)) : g("", !0),
      t.value.generation.message ? (r(), d("aside", Yt, [a[12] || (a[12] = e("span", { "aria-hidden": "true" }, "i", -1)), e("p", null, n(t.value.generation.message), 1)])) : g("", !0),
      e("div", Zt, [o.value === "board" ? (r(), D(rt, {
        key: 0,
        board: t.value.board,
        busy: K.value,
        "disabled-reason": U.value,
        onRefresh: ae,
        onAccept: se
      }, null, 8, [
        "board",
        "busy",
        "disabled-reason"
      ])) : o.value === "active" ? (r(), D(We, {
        key: 1,
        records: t.value.active,
        onDetail: J
      }, null, 8, ["records"])) : o.value === "published" ? (r(), D(Vt, {
        key: 2,
        records: t.value.recruiting,
        "candidate-busy-task-id": W.value,
        "write-busy": m.value,
        "disabled-reason": C.value,
        onRecruit: le,
        onAssign: ne,
        onCancel: ie,
        onDetail: J,
        onPublish: a[0] || (a[0] = (b) => x("publish"))
      }, null, 8, [
        "records",
        "candidate-busy-task-id",
        "write-busy",
        "disabled-reason"
      ])) : o.value === "history" ? (r(), D(ft, {
        key: 3,
        history: t.value.history,
        loading: F.value,
        onDetail: J,
        onLoadMore: ve
      }, null, 8, ["history", "loading"])) : o.value === "settings" ? (r(), D(zt, {
        key: 4,
        "auto-maintenance": t.value.settings.autoMaintenance,
        "settings-busy": L.value,
        "maintenance-busy": t.value.maintenance.state === "running",
        "maintenance-message": ee.value,
        "disabled-reason": U.value,
        onUpdate: de,
        onMaintain: oe
      }, null, 8, [
        "auto-maintenance",
        "settings-busy",
        "maintenance-busy",
        "maintenance-message",
        "disabled-reason"
      ])) : o.value === "publish" ? (r(), D(Ue, {
        key: 5,
        balance: t.value.playerBalance,
        busy: m.value,
        "disabled-reason": C.value,
        onSubmit: ue,
        onCancel: a[1] || (a[1] = (b) => x("published"))
      }, null, 8, [
        "balance",
        "busy",
        "disabled-reason"
      ])) : (r(), D(Se, {
        key: 6,
        detail: O.value,
        loading: z.value,
        onBack: a[2] || (a[2] = (b) => x(H.value))
      }, null, 8, ["detail", "loading"]))]),
      e("nav", _t, [
        e("button", {
          type: "button",
          class: M({ "is-active": o.value === "board" }),
          onClick: a[3] || (a[3] = (b) => x("board"))
        }, [...a[13] || (a[13] = [e("span", null, "⌁", -1), p("大厅", -1)])], 2),
        e("button", {
          type: "button",
          class: M({ "is-active": o.value === "active" }),
          onClick: a[4] || (a[4] = (b) => x("active"))
        }, [
          a[14] || (a[14] = e("span", null, "▶", -1)),
          a[15] || (a[15] = p("进行中", -1)),
          t.value.active.length ? (r(), d("b", ea, n(t.value.active.length), 1)) : g("", !0)
        ], 2),
        e("button", {
          type: "button",
          class: M({ "is-active": o.value === "published" || o.value === "publish" }),
          onClick: a[5] || (a[5] = (b) => x("published"))
        }, [
          a[16] || (a[16] = e("span", null, "◇", -1)),
          a[17] || (a[17] = p("我发布的", -1)),
          t.value.recruiting.length ? (r(), d("b", ta, n(t.value.recruiting.length), 1)) : g("", !0)
        ], 2),
        e("button", {
          type: "button",
          class: M({ "is-active": o.value === "history" }),
          onClick: a[6] || (a[6] = (b) => x("history"))
        }, [...a[18] || (a[18] = [e("span", null, "▤", -1), p("历史", -1)])], 2),
        e("button", {
          type: "button",
          class: M({ "is-active": o.value === "settings" }),
          onClick: a[7] || (a[7] = (b) => x("settings"))
        }, [...a[19] || (a[19] = [e("span", null, "⚙", -1), p("设置", -1)])], 2)
      ]),
      T.value ? (r(), d("div", {
        key: 2,
        class: "tasks-dialog-backdrop",
        onClick: a[9] || (a[9] = _((b) => !m.value && (T.value = null), ["self"]))
      }, [e("section", aa, [
        a[21] || (a[21] = e("h2", { id: "tasks-publish-confirm-title" }, "确认发布任务？", -1)),
        e("p", null, [
          p("“" + n(T.value.title) + "”将立即从钱包锁定 ", 1),
          e("strong", null, "¤ " + n(T.value.reward), 1),
          a[20] || (a[20] = p("。招募期间可以撤回；选定执行者后不能撤回。", -1))
        ]),
        e("div", null, [e("button", {
          type: "button",
          disabled: m.value,
          onClick: a[8] || (a[8] = (b) => T.value = null)
        }, "返回修改", 8, sa), e("button", {
          type: "button",
          class: "tasks-primary-button",
          disabled: !!C.value,
          title: C.value || void 0,
          onClick: re
        }, n(m.value ? "正在保存…" : "确认发布"), 9, la)])
      ])])) : g("", !0)
    ]));
  }
}), da = ia;
export {
  da as default
};
