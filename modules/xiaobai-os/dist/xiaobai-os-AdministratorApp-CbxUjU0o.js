/* eslint-disable */
import { E as ke, H as Re, J as be, K as f, M as u, P as ee, Q as n, T as oe, V as fe, X as te, Y as i, Z as Me, b as ie, c as Z, f as W, g as o, h as g, k as _e, l as ne, m as G, o as Se, p as a, q as ye, u as K, v as le, y as Be, z as de } from "./xiaobai-os-runtime-dom.esm-bundler-BcM9c-Z9.js";
import { t as ze } from "./xiaobai-os-descriptor-DmDuv1pM.js";
import { n as Oe, r as Pe } from "./xiaobai-os-app-navigation-sg-40eOk.js";
import { t as De } from "./xiaobai-os-context-tokens-bfmDTbG3.js";
import { t as he } from "./xiaobai-os-AppDialog-CI-E933W.js";
import { t as xe } from "./xiaobai-os-MessageMarkdown-C_jQgBbc.js";
var O = Object.freeze({
  inputBudget: 158e3,
  summaryTrigger: 128e3,
  summaryOutput: 4e3,
  imageTokens: 6e3,
  pageSize: 20,
  windowSize: 60,
  textBlock: 4e3,
  visibleOperations: 6,
  streamInterval: 100,
  maxImageBytes: 4 * 1024 * 1024,
  maxToolRounds: 32,
  evidenceChars: 1e6,
  chatReadFloors: 20,
  chatSearchMatches: 20,
  chatQueryChars: 200
}), we = Object.freeze([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif"
]);
function qe() {
  return Array.from(globalThis.crypto.getRandomValues(new Uint8Array(16)), (d) => d.toString(16).padStart(2, "0")).join("");
}
var l = Object.freeze({
  title: ze.name,
  context: "上下文用量",
  clear: "清空聊天",
  clearTitle: "清空管理员聊天？",
  clearWarning: "聊天和附件会被删除，已完成的管理修改不会撤销。",
  cancel: "取消",
  delete: "删除",
  regenerate: "重新生成",
  send: "发送",
  stop: "停止",
  attach: "选择图片",
  removeImage: "移除图片",
  placeholder: "说说需要处理的事…",
  latest: "回到最新",
  earlier: "更早记录",
  later: "后面记录",
  confirm: "重新提交",
  check: "检查保存结果",
  close: "关闭",
  empty: "有什么需要处理？",
  details: "查看过程",
  moreText: "展开更多",
  evidence: "查看资料",
  inspect: "检查 OS 状态",
  loadTools: "加载工具",
  toolsLoaded: "工具已就绪",
  itemReport: (d, C) => `成功 ${d} 项，未完成 ${C} 项`,
  messageActions: "消息操作",
  messagePages: "展开消息",
  noReply: "尚未回复",
  longReply: "回复结束后可展开完整内容。",
  adopt: "放弃未保存内容",
  budget: "应用输入预算",
  estimated: "估算用量",
  budgetNote: "应用工作预算，不代表模型实际窗口。",
  contextParts: {
    history: "聊天与摘要",
    rules: "规则与资料",
    tools: "工具说明",
    images: "图片预留",
    runtime: "本轮工具结果"
  },
  phases: {
    preparing: "准备中",
    replying: "回复中",
    summarizing: "整理上下文",
    saving: "保存中",
    stopping: "正在停止"
  },
  operations: {
    preparing: "准备参数",
    reading: "读取中",
    saving: "保存中",
    read: "已读取",
    saved: "已保存",
    unchanged: "无需修改",
    partial: "部分完成",
    failed: "未完成",
    unconfirmed: "保存待确认"
  },
  invalidImage: "请选择不超过 4MB、可打开的 PNG、JPG、WEBP 或 GIF 图片。",
  imageModel: "图片会发给当前模型，需要模型支持看图。",
  imageRequest: "请查看这张图片。",
  stopped: "已停止；已保存的修改仍然生效。",
  deleteWarning: "只删除这条消息，不撤销已经完成的管理修改。",
  noEvidence: "这份资料的临时查阅入口已失效。已返回给管理员的内容仍保留在会话历史中，需要更多原文时可以重新查阅。",
  corrupted: "管理员记录损坏。可以清空管理员聊天；其他 APP 数据不受影响。",
  unsaved: "保存尚未确认。可检查结果、重新提交，或放弃未保存内容；已保存的修改不会撤销。"
}), Ee = Object.freeze({
  administrator_stopped: l.stopped,
  administrator_busy: "当前操作尚未结束，请先等待或停止。",
  administrator_context_changed: "聊天已切换，旧操作已停止。",
  administrator_environment_unavailable: "OS 状态读取失败，未能确认当前运行情况。",
  administrator_chat_unavailable: "请先进入一个酒馆聊天。",
  administrator_message_missing: "这条消息已不存在，请刷新记录。",
  administrator_history_conflict: "管理员记录已被其他操作更新，请重新打开核对，不会覆盖现有记录。",
  administrator_input_invalid: "请输入内容或选择图片，文字最多 16000 字符。",
  administrator_invalid_image: l.invalidImage,
  administrator_image_missing: "附件读取失败，原消息与附件引用仍然保留，请重试。",
  administrator_image_delete_failed: "记录已保存，但附件删除失败，请再次确认清理。",
  administrator_image_list_failed: "附件目录读取失败，请再次确认清理。",
  administrator_save_pending: l.unsaved,
  administrator_save_failed: "保存失败。可检查结果、重新提交，或放弃未保存内容。",
  administrator_save_unconfirmed: l.unsaved,
  administrator_save_conflict: "服务器记录已更新，未覆盖它。可放弃本地未保存内容，保留服务器记录。",
  administrator_context_full: "本轮资料已超出应用输入预算，请缩小查阅范围后再继续。",
  administrator_summary_failed: "上下文整理失败，原记录未删除，可以重试。",
  administrator_model_refused: "模型没有接受本次请求，原消息和附件仍然保留。",
  administrator_empty_response: "模型未返回回复，可以重试。",
  administrator_tool_round_limit: "本轮已达到工具调用上限，请缩小任务范围。",
  administrator_tool_batch_too_large: "模型一次请求了过多工具，未执行这批操作。",
  administrator_evidence_expired: l.noEvidence,
  management_request_superseded: "记录已被后续修改取代。请说明当前希望怎样处理，不会恢复旧状态。",
  management_source_changed: "所依据的原文已经改变，需要重新查证。"
});
function F(d) {
  const C = d instanceof Error ? d.message : String(d);
  return Ee[C] ?? C.slice(0, 700);
}
var Ne = [
  "aria-label",
  "title",
  "aria-expanded"
], Ke = {
  key: 0,
  class: "admin-popover"
}, Le = ["aria-label"], Ve = { class: "admin-context-total" }, je = /* @__PURE__ */ ie({
  __name: "AdministratorContext",
  props: {
    usage: {},
    draftTokens: {}
  },
  setup(d) {
    const C = d, e = f(!1), k = W(() => C.usage.used + C.draftTokens), h = (w) => `${(w / 1e3).toFixed(1)}k`;
    return Oe(() => (e.value = !1, !0), () => e.value), (w, p) => (u(), o("div", {
      class: "admin-context",
      onKeydown: p[2] || (p[2] = Z(ne((v) => e.value = !1, ["stop"]), ["esc"]))
    }, [a("button", {
      type: "button",
      class: te(["admin-context-ring", { "is-warning": k.value >= d.usage.trigger }]),
      style: Me({ "--context-fill": `${Math.min(1, k.value / d.usage.limit) * 360}deg` }),
      "aria-label": i(l).context,
      title: i(l).context,
      "aria-expanded": e.value,
      onClick: p[0] || (p[0] = (v) => e.value = !e.value)
    }, [...p[3] || (p[3] = [a("span", null, null, -1)])], 14, Ne), e.value ? (u(), o("section", Ke, [
      a("header", null, [a("strong", null, n(i(l).context), 1), a("button", {
        type: "button",
        "aria-label": i(l).close,
        onClick: p[1] || (p[1] = (v) => e.value = !1)
      }, "×", 8, Le)]),
      a("p", Ve, n(h(k.value)) + " / " + n(h(d.usage.limit)), 1),
      a("dl", null, [(u(!0), o(K, null, ee(i(l).contextParts, (v, c) => (u(), o(K, { key: c }, [a("dt", null, n(v), 1), a("dd", null, n(h(d.usage[c] + (c === "history" ? d.draftTokens : 0))), 1)], 64))), 128))]),
      a("small", null, n(i(l).budgetNote), 1)
    ])) : g("", !0)], 32));
  }
}), Fe = je, Ue = ["data-row-id"], We = ["aria-label"], Ge = ["src", "alt"], He = {
  key: 2,
  class: "admin-muted"
}, Ye = ["aria-label"], Je = ["disabled"], Qe = { key: 0 }, Xe = { class: "admin-operation-more" }, Ze = {
  key: 2,
  class: "admin-error",
  role: "status"
}, et = ["aria-label"], tt = ["disabled"], at = ["disabled"], lt = /* @__PURE__ */ ie({
  __name: "AdministratorMessage",
  props: {
    row: {},
    bridge: {},
    chatIdentity: {},
    disabled: { type: Boolean }
  },
  emits: [
    "delete",
    "regenerate",
    "details"
  ],
  setup(d, { emit: C }) {
    const e = d, k = C, h = f(!1), w = f(e.row.text), p = f(!1), v = f("");
    let c = 0, _ = w.value.length;
    function M($) {
      $.target.closest("a, button, input, textarea, select") || ($ instanceof KeyboardEvent && $.preventDefault(), h.value = !h.value);
    }
    de(() => [
      e.chatIdentity,
      e.row.id,
      e.row.revision
    ], ($, y) => {
      c++, p.value = !1, v.value = "", ($[0] !== y[0] || $[1] !== y[1]) && (_ = e.row.text.length), _ <= e.row.text.length ? w.value = e.row.text : A(_, !0);
    }), ke(() => {
      c++;
    });
    async function A($, y = !1) {
      if (p.value) return;
      _ = Math.min(Math.max(_, $), e.row.totalChars);
      const m = ++c, { turnId: N, role: D, revision: b } = e.row, x = e.chatIdentity, L = () => m === c && x === e.chatIdentity && b === e.row.revision && N === e.row.turnId;
      p.value = !0, v.value = "";
      try {
        let q = y ? e.row.text : w.value;
        for (; q.length < _; ) {
          const P = await e.bridge.request("administrator/text", {
            chatIdentity: x,
            turnId: N,
            role: D,
            revision: b,
            offset: q.length
          });
          if (!L()) return;
          q += P.result.text;
        }
        w.value = q;
      } catch (q) {
        L() && (y && (w.value = e.row.text), v.value = F(q));
      } finally {
        L() && (p.value = !1);
      }
    }
    return ($, y) => (u(), o("article", {
      class: te(["admin-message", `is-${d.row.role}`]),
      "data-row-id": d.row.id
    }, [
      a("div", {
        class: "admin-bubble",
        tabindex: "0",
        role: "group",
        "aria-label": i(l).messageActions,
        onClick: M,
        onKeydown: [
          Z(M, ["enter"]),
          Z(M, ["space"]),
          y[0] || (y[0] = Z(ne((m) => h.value = !1, ["stop"]), ["esc"]))
        ]
      }, [
        d.row.image ? (u(), o("img", {
          key: 0,
          src: d.row.image.path,
          alt: d.row.image.name,
          loading: "lazy",
          class: "admin-message-image"
        }, null, 8, Ge)) : g("", !0),
        w.value ? (u(), G(xe, {
          key: 1,
          class: "admin-markdown",
          text: w.value
        }, null, 8, ["text"])) : g("", !0),
        !w.value && !d.row.image && !d.row.operationCount ? (u(), o("span", He, n(d.row.error || i(l).noReply), 1)) : g("", !0)
      ], 40, We),
      d.row.totalChars > w.value.length ? (u(), o("nav", {
        key: 0,
        class: "admin-pager",
        "aria-label": i(l).messagePages
      }, [a("button", {
        type: "button",
        disabled: p.value,
        onClick: y[1] || (y[1] = (m) => A(w.value.length + i(O).textBlock))
      }, n(i(l).moreText), 9, Je)], 8, Ye)) : g("", !0),
      d.row.operationCount ? (u(), o("button", {
        key: 1,
        type: "button",
        class: "admin-operation-preview",
        onClick: y[2] || (y[2] = (m) => k("details", d.row))
      }, [(u(!0), o(K, null, ee(d.row.operations, (m) => (u(), o("span", {
        key: m.id,
        class: "admin-operation-line"
      }, [
        a("i", { class: te(["admin-operation-dot", `is-${m.status}`]) }, null, 2),
        a("span", null, [le(n(m.name), 1), m.target ? (u(), o("small", Qe, " · " + n(m.target), 1)) : g("", !0)]),
        a("small", null, n(i(l).operations[m.status]), 1)
      ]))), 128)), a("span", Xe, n(i(l).details) + " ›", 1)])) : g("", !0),
      d.row.error || v.value ? (u(), o("p", Ze, n(v.value || d.row.error), 1)) : g("", !0),
      h.value ? (u(), o("nav", {
        key: 3,
        class: "admin-message-actions",
        "aria-label": i(l).messageActions
      }, [a("button", {
        type: "button",
        disabled: d.disabled,
        onClick: y[3] || (y[3] = (m) => k("delete", d.row))
      }, n(i(l).delete), 9, tt), d.row.canRegenerate ? (u(), o("button", {
        key: 0,
        type: "button",
        disabled: d.disabled,
        onClick: y[4] || (y[4] = (m) => k("regenerate", d.row))
      }, n(i(l).regenerate), 9, at)) : g("", !0)], 8, et)) : g("", !0)
    ], 10, Ue));
  }
}), it = lt, nt = ["aria-label", "onKeydown"], st = ["aria-label"], rt = { class: "admin-details-body" }, ut = { class: "admin-evidence" }, ot = ["disabled"], dt = { class: "admin-operations" }, vt = { key: 0 }, mt = { class: "admin-muted" }, ct = ["disabled", "onClick"], gt = { class: "admin-pager" }, pt = ["disabled"], bt = ["disabled"], ft = {
  key: 2,
  class: "admin-error",
  role: "status"
}, yt = /* @__PURE__ */ ie({
  __name: "AdministratorDetails",
  props: {
    bridge: {},
    chatIdentity: {},
    turnId: {}
  },
  emits: ["close"],
  setup(d, { emit: C }) {
    const e = d, k = C, h = f([]), w = f(0), p = f(0), v = f(""), c = f(!1), _ = f(null), M = f(""), A = f(null);
    function $() {
      oe(() => A.value?.focus({ preventScroll: !0 }));
    }
    function y() {
      _.value ? (_.value = null, $()) : k("close");
    }
    Pe(A, y);
    async function m(D) {
      c.value = !0, v.value = "", _.value = null;
      try {
        const b = await e.bridge.request("administrator/operations", {
          chatIdentity: e.chatIdentity,
          turnId: e.turnId,
          offset: D
        });
        h.value = b.result.items, p.value = b.result.total, w.value = b.result.offset;
      } catch (b) {
        v.value = F(b);
      } finally {
        c.value = !1;
      }
    }
    async function N(D, b = 0) {
      c.value = !0, v.value = "";
      try {
        _.value = (await e.bridge.request("administrator/evidence", {
          chatIdentity: e.chatIdentity,
          reference: D,
          offset: b
        })).result, M.value = D, $();
      } catch (x) {
        v.value = F(x);
      } finally {
        c.value = !1;
      }
    }
    return _e(() => m(0)), (D, b) => (u(), o("section", {
      ref_key: "layer",
      ref: A,
      class: "admin-details",
      role: "dialog",
      "aria-modal": "true",
      tabindex: "-1",
      "aria-label": i(l).details,
      onKeydown: Z(ne(y, ["stop", "prevent"]), ["esc"])
    }, [a("header", null, [a("strong", null, n(i(l).details), 1), a("button", {
      type: "button",
      "aria-label": i(l).close,
      onClick: b[0] || (b[0] = (x) => k("close"))
    }, "×", 8, st)]), a("div", rt, [_.value ? (u(), o(K, { key: 0 }, [
      a("button", {
        type: "button",
        class: "admin-text-button",
        onClick: y
      }, "‹ " + n(i(l).details), 1),
      a("pre", ut, n(_.value.text), 1),
      _.value.nextOffset !== null ? (u(), o("button", {
        key: 0,
        type: "button",
        disabled: c.value,
        onClick: b[1] || (b[1] = (x) => N(M.value, _.value.nextOffset))
      }, n(i(l).moreText), 9, ot)) : g("", !0)
    ], 64)) : (u(), o(K, { key: 1 }, [a("ol", dt, [(u(!0), o(K, null, ee(h.value, (x) => (u(), o("li", { key: x.id }, [
      a("div", null, [
        a("i", { class: te(["admin-operation-dot", `is-${x.status}`]) }, null, 2),
        a("strong", null, n(x.name), 1),
        a("span", null, n(i(l).operations[x.status]), 1),
        a("small", null, n((x.elapsedMs / 1e3).toFixed(1)) + "s", 1)
      ]),
      x.target ? (u(), o("p", vt, n(x.target), 1)) : g("", !0),
      a("p", mt, n(x.summary), 1),
      a("button", {
        type: "button",
        class: "admin-text-button",
        disabled: c.value,
        onClick: (L) => N(x.id)
      }, n(i(l).evidence), 9, ct)
    ]))), 128))]), a("nav", gt, [a("button", {
      type: "button",
      disabled: !w.value || c.value,
      onClick: b[2] || (b[2] = (x) => m(Math.max(0, w.value - i(O).pageSize)))
    }, n(i(l).earlier), 9, pt), a("button", {
      type: "button",
      disabled: w.value + h.value.length >= p.value || c.value,
      onClick: b[3] || (b[3] = (x) => m(w.value + h.value.length))
    }, n(i(l).later), 9, bt)])], 64)), v.value ? (u(), o("p", ft, n(v.value), 1)) : g("", !0)])], 40, nt));
  }
}), ht = yt, wt = { class: "administrator-app" }, kt = { class: "admin-header" }, _t = [
  "title",
  "aria-label",
  "disabled"
], xt = {
  key: 0,
  class: "admin-notice",
  role: "alert"
}, $t = ["disabled"], It = ["disabled"], Ct = {
  key: 1,
  class: "admin-empty"
}, Tt = {
  key: 2,
  class: "admin-live"
}, At = {
  class: "admin-live-status",
  role: "status",
  "aria-live": "polite"
}, Rt = { key: 0 }, Mt = {
  key: 1,
  class: "admin-muted"
}, St = ["disabled"], Bt = {
  key: 2,
  class: "admin-notice",
  role: "status"
}, zt = ["disabled"], Ot = ["disabled"], Pt = ["disabled"], Dt = {
  key: 3,
  class: "admin-attachment"
}, qt = ["src", "alt"], Et = ["aria-label", "disabled"], Nt = ["accept"], Kt = [
  "disabled",
  "aria-label",
  "title"
], Lt = [
  "placeholder",
  "aria-label",
  "disabled"
], Vt = [
  "disabled",
  "aria-label",
  "title"
], jt = [
  "disabled",
  "aria-label",
  "title"
], Ft = { class: "admin-dialog-actions" }, Ut = ["disabled"], Wt = { class: "admin-dialog-actions" }, Gt = ["disabled"], Ht = /* @__PURE__ */ ie({
  __name: "AdministratorApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(d) {
    const C = d, e = ye(structuredClone(be(C.initialState))), k = ye(e.value.page.rows), h = f(e.value.page.start), w = f(e.value.page.total), p = f(""), v = f(null), c = f(""), _ = f(""), M = f(!1), A = f(!1), $ = f(null), y = f(null), m = f(null), N = f(null), D = f(null), b = f(!0), x = f(!1), L = f(0);
    let q = 0, P = null;
    de([p, v], () => {
      q++;
    }, { flush: "sync" });
    const R = W(() => !!_.value || !!e.value.live), H = W(() => e.value.live?.phase ?? (["send", "regenerate"].includes(_.value) ? "preparing" : null)), Y = W(() => R.value || e.value.unsaved || e.value.corrupted), $e = W(() => k.value.filter((s) => s.role !== "assistant" || s.turnId !== e.value.live?.turnId || !!s.text)), V = W(() => h.value + k.value.length >= w.value);
    let ve = () => {
    }, J, j = 0;
    const me = () => ({ chatIdentity: e.value.chatIdentity });
    async function ae(s, t = {}) {
      return (await C.bridge.request(`administrator/${s}`, {
        ...me(),
        ...t
      }, 6e4)).result;
    }
    function ce() {
      const s = m.value, t = s && [...s.querySelectorAll("[data-row-id]")].find((r) => r.getBoundingClientRect().bottom > s.getBoundingClientRect().top);
      return t ? {
        id: t.dataset.rowId,
        top: t.getBoundingClientRect().top
      } : null;
    }
    async function se(s) {
      await oe();
      const t = m.value && [...m.value.querySelectorAll("[data-row-id]")].find((r) => r.dataset.rowId === s?.id);
      s && t && m.value && (m.value.scrollTop += t.getBoundingClientRect().top - s.top);
    }
    async function Q() {
      await oe(), m.value && (m.value.scrollTop = m.value.scrollHeight);
    }
    function re(s) {
      const t = ce(), r = V.value, T = e.value;
      if (e.value = s, w.value = s.page.total, T.chatIdentity !== s.chatIdentity) {
        j++, k.value = s.page.rows, h.value = s.page.start, p.value = "", v.value = null, y.value = null, P = null;
        return;
      }
      if (s.page.revision !== T.page.revision) {
        const S = Math.max(O.pageSize, k.value.length), B = r && b.value ? Math.max(0, s.page.total - S) : Math.min(h.value, Math.max(0, s.page.total - S));
        B === s.page.start && S === O.pageSize ? (k.value = s.page.rows, h.value = B, b.value || se(t)) : Ie(B, S, t);
      }
      P && s.submission?.id === P.id && s.submission.accepted && (P.revision === q && (p.value = "", v.value = null), P = null), b.value && V.value && Q();
    }
    async function Ie(s, t, r) {
      const T = ++j, S = e.value.chatIdentity, B = e.value.page.revision, I = () => T === j && S === e.value.chatIdentity && B === e.value.page.revision;
      try {
        const z = [];
        for (let E = s; E < Math.min(w.value, s + t); E += O.pageSize) {
          const X = await ae("page", {
            start: E,
            revision: B
          });
          if (!I()) return;
          z.push(...X.rows);
        }
        if (!I()) return;
        k.value = z, h.value = s, b.value && V.value ? await Q() : await se(r);
      } catch (z) {
        I() && (c.value = F(z));
      }
    }
    async function ue(s, t) {
      if (M.value) return;
      const r = ++j;
      M.value = !0, c.value = "";
      const T = ce(), S = e.value.chatIdentity, B = e.value.page.revision;
      try {
        const I = await ae("page", {
          start: s,
          revision: e.value.page.revision
        });
        if (r !== j || S !== e.value.chatIdentity || B !== e.value.page.revision) return;
        const z = k.value.filter((E) => E.revision === B);
        t === "earlier" ? (k.value = [...I.rows, ...z.filter((E) => !I.rows.some((X) => X.id === E.id))].slice(0, O.windowSize), h.value = I.start) : t === "later" ? (k.value = [...z.filter((E) => !I.rows.some((X) => X.id === E.id)), ...I.rows].slice(-O.windowSize), h.value = I.start + I.rows.length - k.value.length) : (k.value = I.rows, h.value = I.start), w.value = I.total, await se(T);
      } catch (I) {
        r === j && S === e.value.chatIdentity && B === e.value.page.revision && (c.value = F(I));
      } finally {
        M.value = !1;
      }
    }
    async function ge() {
      await ue(Math.max(0, w.value - O.pageSize), "replace"), b.value = !0, await Q();
    }
    async function pe() {
      if (!(Y.value || !p.value.trim() && !v.value)) {
        _.value = "send", c.value = "", b.value = !0;
        try {
          P = {
            id: qe(),
            revision: q
          }, re((await ae("send", {
            submissionId: P.id,
            text: p.value,
            ...v.value ? { image: be(v.value) } : {}
          })).state), await ge();
        } catch (s) {
          c.value = F(s);
        } finally {
          _.value = "";
        }
      }
    }
    async function U(s, t = {}) {
      if (!R.value) {
        _.value = s, c.value = "";
        try {
          re(await ae(s, t)), A.value = !1, $.value = null, s === "adopt" && (P = null), s === "clear" && (p.value = "", v.value = null, P = null, y.value = null);
        } catch (r) {
          c.value = F(r);
        } finally {
          _.value = "";
        }
      }
    }
    async function Ce(s) {
      const t = s.target, r = t.files?.[0];
      if (t.value = "", !!r) {
        if (c.value = "", r.size > O.maxImageBytes || !we.includes(r.type)) {
          c.value = l.invalidImage;
          return;
        }
        try {
          const T = await new Promise((B, I) => {
            const z = new FileReader();
            z.onload = () => B(String(z.result)), z.onerror = () => I(new Error(l.invalidImage)), z.readAsDataURL(r);
          }), S = new Image();
          S.src = T, await S.decode(), v.value = {
            name: r.name.slice(0, 120),
            dataUrl: T
          }, D.value?.focus();
        } catch {
          c.value = l.invalidImage;
        }
      }
    }
    function Te(s) {
      s.key === "Enter" && !s.shiftKey && !x.value && !s.isComposing && (s.preventDefault(), R.value || pe());
    }
    function Ae() {
      m.value && (b.value = m.value.scrollHeight - m.value.scrollTop - m.value.clientHeight < 48);
    }
    return de([p, v], () => {
      J && clearTimeout(J), J = setTimeout(() => {
        L.value = De(p.value) + (v.value ? O.imageTokens : 0);
      }, 160);
    }), _e(() => {
      ve = C.bridge.subscribe((s) => {
        s.type === "administrator/state" && re(s.payload.state), s.type === "administrator/live" && (e.value = {
          ...e.value,
          ...s.payload
        }, b.value && V.value && Q());
      }), Q();
    }), ke(() => {
      j++, ve(), J && clearTimeout(J);
    }), (s, t) => (u(), o("div", wt, [
      a("header", kt, [
        a("h1", null, n(i(l).title), 1),
        Be(Fe, {
          usage: e.value.context,
          "draft-tokens": e.value.live ? 0 : L.value
        }, null, 8, ["usage", "draft-tokens"]),
        a("button", {
          type: "button",
          class: "admin-icon-button",
          title: i(l).clear,
          "aria-label": i(l).clear,
          disabled: R.value || e.value.unsaved,
          onClick: t[0] || (t[0] = (r) => A.value = !0)
        }, [...t[23] || (t[23] = [a("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [a("path", { d: "M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 10v7m4-7v7" })], -1)])], 8, _t)
      ]),
      e.value.corrupted ? (u(), o("div", xt, [le(n(i(l).corrupted), 1), a("button", {
        type: "button",
        disabled: R.value,
        onClick: t[1] || (t[1] = (r) => A.value = !0)
      }, n(i(l).clear), 9, $t)])) : g("", !0),
      a("div", {
        ref_key: "list",
        ref: m,
        class: "admin-conversation",
        onScrollPassive: Ae
      }, [
        h.value > 0 ? (u(), o("button", {
          key: 0,
          type: "button",
          class: "admin-history-button",
          disabled: M.value,
          onClick: t[2] || (t[2] = (r) => ue(Math.max(0, h.value - i(O).pageSize), "earlier"))
        }, n(i(l).earlier), 9, It)) : g("", !0),
        !k.value.length && !H.value && !e.value.corrupted ? (u(), o("p", Ct, n(i(l).empty), 1)) : g("", !0),
        (u(!0), o(K, null, ee($e.value, (r) => (u(), G(it, {
          key: r.id,
          row: r,
          bridge: d.bridge,
          "chat-identity": e.value.chatIdentity,
          disabled: Y.value,
          onDelete: t[3] || (t[3] = (T) => $.value = T),
          onRegenerate: t[4] || (t[4] = (T) => U("regenerate", { turnId: T.turnId })),
          onDetails: t[5] || (t[5] = (T) => y.value = T.turnId)
        }, null, 8, [
          "row",
          "bridge",
          "chat-identity",
          "disabled"
        ]))), 128)),
        H.value && V.value ? (u(), o("div", Tt, [
          a("div", At, [t[24] || (t[24] = a("span", { class: "admin-working-dot" }, null, -1)), le(n(i(l).phases[H.value]), 1)]),
          (u(!0), o(K, null, ee(e.value.live?.operations, (r) => (u(), o("div", {
            key: r.id,
            class: "admin-operation-line"
          }, [
            a("i", { class: te(["admin-operation-dot", `is-${r.status}`]) }, null, 2),
            a("span", null, [le(n(r.name), 1), r.target ? (u(), o("small", Rt, " · " + n(r.target), 1)) : g("", !0)]),
            a("small", null, n(i(l).operations[r.status]), 1)
          ]))), 128)),
          e.value.live?.text ? (u(), G(xe, {
            key: 0,
            class: "admin-markdown",
            text: e.value.live.text
          }, null, 8, ["text"])) : g("", !0),
          e.value.live && e.value.live.totalChars > i(O).textBlock ? (u(), o("small", Mt, n(i(l).longReply), 1)) : g("", !0)
        ])) : g("", !0),
        V.value ? g("", !0) : (u(), o("button", {
          key: 3,
          type: "button",
          class: "admin-history-button",
          disabled: M.value,
          onClick: t[6] || (t[6] = (r) => ue(h.value + k.value.length, "later"))
        }, n(i(l).later), 9, St))
      ], 544),
      !V.value || !b.value ? (u(), o("button", {
        key: 1,
        type: "button",
        class: "admin-latest",
        onClick: ge
      }, "↓ " + n(i(l).latest), 1)) : g("", !0),
      c.value || e.value.error || e.value.unsaved ? (u(), o("div", Bt, [
        a("span", null, n(c.value || (e.value.unsaved ? i(l).unsaved : e.value.error)), 1),
        e.value.unsaved ? (u(), o("button", {
          key: 0,
          type: "button",
          disabled: R.value,
          onClick: t[7] || (t[7] = (r) => U("check"))
        }, n(i(l).check), 9, zt)) : g("", !0),
        e.value.unsaved ? (u(), o("button", {
          key: 1,
          type: "button",
          disabled: R.value,
          onClick: t[8] || (t[8] = (r) => U("confirm"))
        }, n(i(l).confirm), 9, Ot)) : g("", !0),
        e.value.conflict || e.value.unsaved ? (u(), o("button", {
          key: 2,
          type: "button",
          disabled: R.value,
          onClick: t[9] || (t[9] = (r) => U("adopt"))
        }, n(i(l).adopt), 9, Pt)) : g("", !0)
      ])) : g("", !0),
      v.value ? (u(), o("div", Dt, [
        a("img", {
          src: v.value.dataUrl,
          alt: v.value.name
        }, null, 8, qt),
        a("span", null, n(v.value.name), 1),
        a("button", {
          type: "button",
          "aria-label": i(l).removeImage,
          disabled: R.value,
          onClick: t[10] || (t[10] = (r) => v.value = null)
        }, "×", 8, Et)
      ])) : g("", !0),
      a("form", {
        class: "admin-composer",
        onSubmit: ne(pe, ["prevent"])
      }, [
        a("input", {
          ref_key: "file",
          ref: N,
          type: "file",
          accept: i(we).join(","),
          hidden: "",
          onChange: Ce
        }, null, 40, Nt),
        a("button", {
          type: "button",
          class: "admin-icon-button",
          disabled: Y.value,
          "aria-label": i(l).attach,
          title: i(l).attach,
          onClick: t[11] || (t[11] = (r) => N.value?.click())
        }, [...t[25] || (t[25] = [a("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [
          a("rect", {
            x: "3",
            y: "3",
            width: "18",
            height: "18",
            rx: "3"
          }),
          a("circle", {
            cx: "8",
            cy: "8",
            r: "1.5"
          }),
          a("path", { d: "m3 17 5-5 4 4 4-7 5 8" })
        ], -1)])], 8, Kt),
        Re(a("textarea", {
          ref_key: "composer",
          ref: D,
          "onUpdate:modelValue": t[12] || (t[12] = (r) => p.value = r),
          rows: "1",
          maxlength: "16000",
          placeholder: i(l).placeholder,
          "aria-label": i(l).placeholder,
          disabled: e.value.corrupted || R.value,
          onKeydown: Te,
          onCompositionstart: t[13] || (t[13] = (r) => x.value = !0),
          onCompositionend: t[14] || (t[14] = (r) => x.value = !1)
        }, null, 40, Lt), [[Se, p.value]]),
        H.value ? (u(), o("button", {
          key: 0,
          type: "button",
          class: "admin-send",
          disabled: H.value === "stopping",
          "aria-label": i(l).stop,
          title: i(l).stop,
          onClick: t[15] || (t[15] = (r) => C.bridge.post("administrator/stop", me()))
        }, [...t[26] || (t[26] = [a("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [a("rect", {
          x: "6",
          y: "6",
          width: "12",
          height: "12",
          rx: "2"
        })], -1)])], 8, Vt)) : (u(), o("button", {
          key: 1,
          type: "submit",
          class: "admin-send",
          disabled: Y.value || !p.value.trim() && !v.value,
          "aria-label": i(l).send,
          title: i(l).send
        }, [...t[27] || (t[27] = [a("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [a("path", { d: "M12 19V5m-6 6 6-6 6 6" })], -1)])], 8, jt))
      ], 32),
      y.value ? (u(), G(ht, {
        key: y.value,
        bridge: d.bridge,
        "chat-identity": e.value.chatIdentity,
        "turn-id": y.value,
        onClose: t[16] || (t[16] = (r) => y.value = null)
      }, null, 8, [
        "bridge",
        "chat-identity",
        "turn-id"
      ])) : g("", !0),
      A.value ? (u(), G(he, {
        key: 5,
        class: "admin-dialog",
        "aria-label": i(l).clearTitle,
        busy: R.value,
        onClose: t[19] || (t[19] = (r) => A.value = !1)
      }, {
        default: fe(() => [
          a("h2", null, n(i(l).clearTitle), 1),
          a("p", null, n(i(l).clearWarning), 1),
          a("div", Ft, [a("button", {
            type: "button",
            onClick: t[17] || (t[17] = (r) => A.value = !1)
          }, n(i(l).cancel), 1), a("button", {
            type: "button",
            disabled: R.value,
            onClick: t[18] || (t[18] = (r) => U("clear"))
          }, n(i(l).clear), 9, Ut)])
        ]),
        _: 1
      }, 8, ["aria-label", "busy"])) : g("", !0),
      $.value ? (u(), G(he, {
        key: 6,
        class: "admin-dialog",
        "aria-label": i(l).delete,
        busy: R.value,
        onClose: t[22] || (t[22] = (r) => $.value = null)
      }, {
        default: fe(() => [
          a("h2", null, n(i(l).delete), 1),
          a("p", null, n(i(l).deleteWarning), 1),
          a("div", Wt, [a("button", {
            type: "button",
            onClick: t[20] || (t[20] = (r) => $.value = null)
          }, n(i(l).cancel), 1), a("button", {
            type: "button",
            disabled: Y.value,
            onClick: t[21] || (t[21] = (r) => U("delete", {
              turnId: $.value.turnId,
              role: $.value.role,
              revision: e.value.page.revision
            }))
          }, n(i(l).delete), 9, Gt)])
        ]),
        _: 1
      }, 8, ["aria-label", "busy"])) : g("", !0)
    ]));
  }
}), ta = Ht;
export {
  ta as default
};
