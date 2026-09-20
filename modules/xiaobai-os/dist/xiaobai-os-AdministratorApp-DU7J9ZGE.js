/* eslint-disable */
import { E as we, H as Re, J as be, K as f, M as u, P as Q, Q as n, T as ue, V as fe, X, Y as i, Z as Ae, b as ie, c as J, f as Y, g as d, h as p, k as $e, l as W, m as ae, o as Me, p as a, q as pe, u as K, v as le, y as Be, z as oe } from "./xiaobai-os-runtime-dom.esm-bundler-BcM9c-Z9.js";
import { t as Se } from "./xiaobai-os-descriptor-BG677j-_.js";
import { n as ze, r as Oe } from "./xiaobai-os-app-navigation-sg-40eOk.js";
import { t as Pe } from "./xiaobai-os-context-tokens-bfmDTbG3.js";
import { t as ke } from "./xiaobai-os-AppDialog-CI-E933W.js";
var M = Object.freeze({
  inputBudget: 64e3,
  summaryTrigger: 48e3,
  summaryOutput: 4e3,
  imageTokens: 6e3,
  preservedTurns: 2,
  pageSize: 20,
  windowSize: 60,
  textBlock: 4e3,
  visibleOperations: 6,
  streamInterval: 100,
  maxImageBytes: 4 * 1024 * 1024,
  maxToolRounds: 32,
  evidenceChars: 1e6
}), he = Object.freeze([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif"
]), l = Object.freeze({
  title: Se.name,
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
  retry: "重试",
  recheck: "重新核查",
  confirm: "重新提交",
  check: "检查保存结果",
  close: "关闭",
  empty: "有什么需要处理？",
  details: "查看过程",
  moreText: "后续内容",
  previousText: "前段内容",
  evidence: "查看资料",
  itemReport: (o, T) => `成功 ${o} 项，未完成 ${T} 项`,
  messageActions: "消息操作",
  messagePages: "消息分页",
  noReply: "尚未回复",
  longReply: "完整回复将在结束后分页显示。",
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
    saving: "保存中"
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
  readOnlyRetry: "运行现场已释放，本次只重新查证并回复，不重放旧修改。",
  noEvidence: "完整资料只保留在本次运行中。历史记录保留操作回执，可以请管理员重新查阅。",
  corrupted: "管理员记录损坏。可以清空管理员聊天；其他 APP 数据不受影响。",
  unsaved: "保存尚未确认。可检查结果、重新提交，或放弃未保存内容；已保存的修改不会撤销。"
}), qe = Object.freeze({
  administrator_busy: "当前操作尚未结束，请先等待或停止。",
  administrator_context_changed: "聊天已切换，旧操作已停止。",
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
function L(o) {
  const T = o instanceof Error ? o.message : String(o);
  return qe[T] ?? T.slice(0, 700);
}
var De = [
  "aria-label",
  "title",
  "aria-expanded"
], Ee = {
  key: 0,
  class: "admin-popover"
}, Ne = ["aria-label"], Ke = { class: "admin-context-total" }, Ve = /* @__PURE__ */ ie({
  __name: "AdministratorContext",
  props: {
    usage: {},
    draftTokens: {}
  },
  setup(o) {
    const T = o, t = f(!1), w = Y(() => T.usage.used + T.draftTokens), k = ($) => `${($ / 1e3).toFixed(1)}k`;
    return ze(() => (t.value = !1, !0), () => t.value), ($, y) => (u(), d("div", {
      class: "admin-context",
      onKeydown: y[2] || (y[2] = J(W((m) => t.value = !1, ["stop"]), ["esc"]))
    }, [a("button", {
      type: "button",
      class: X(["admin-context-ring", { "is-warning": w.value >= o.usage.trigger }]),
      style: Ae({ "--context-fill": `${Math.min(1, w.value / o.usage.limit) * 360}deg` }),
      "aria-label": i(l).context,
      title: i(l).context,
      "aria-expanded": t.value,
      onClick: y[0] || (y[0] = (m) => t.value = !t.value)
    }, [...y[3] || (y[3] = [a("span", null, null, -1)])], 14, De), t.value ? (u(), d("section", Ee, [
      a("header", null, [a("strong", null, n(i(l).context), 1), a("button", {
        type: "button",
        "aria-label": i(l).close,
        onClick: y[1] || (y[1] = (m) => t.value = !1)
      }, "×", 8, Ne)]),
      a("p", Ke, n(k(w.value)) + " / " + n(k(o.usage.limit)), 1),
      a("dl", null, [(u(!0), d(K, null, Q(i(l).contextParts, (m, b) => (u(), d(K, { key: b }, [a("dt", null, n(m), 1), a("dd", null, n(k(o.usage[b] + (b === "history" ? o.draftTokens : 0))), 1)], 64))), 128))]),
      a("small", null, n(i(l).budgetNote), 1)
    ])) : p("", !0)], 32));
  }
}), je = Ve, Le = ["data-row-id"], We = ["aria-expanded", "aria-label"], Fe = ["src", "alt"], Ue = {
  key: 1,
  class: "admin-prose"
}, Ge = {
  key: 2,
  class: "admin-muted"
}, He = ["aria-label"], Ye = ["disabled"], Je = ["disabled"], Qe = { key: 0 }, Xe = { class: "admin-operation-more" }, Ze = {
  key: 2,
  class: "admin-error",
  role: "status"
}, et = ["aria-label"], tt = ["disabled"], at = ["disabled"], lt = ["disabled", "title"], it = /* @__PURE__ */ ie({
  __name: "AdministratorMessage",
  props: {
    row: {},
    bridge: {},
    chatIdentity: {},
    disabled: { type: Boolean },
    resumable: { type: Boolean }
  },
  emits: [
    "delete",
    "regenerate",
    "details",
    "retry"
  ],
  setup(o, { emit: T }) {
    const t = o, w = T, k = f(!1), $ = f(0), y = f(t.row.text), m = f(!1), b = f("");
    let I = 0;
    oe(() => [
      t.chatIdentity,
      t.row.id,
      t.row.revision
    ], (R, v) => {
      I++, m.value = !1, b.value = "";
      const c = R[0] === v[0] && R[1] === v[1] ? Math.min($.value, Math.max(0, Math.ceil(t.row.totalChars / M.textBlock) - 1) * M.textBlock) : 0;
      y.value = "", $.value = c, c === 0 ? y.value = t.row.text : S(c);
    }), we(() => {
      I++;
    });
    async function S(R) {
      if (m.value) return;
      const v = ++I, { turnId: c, role: _, revision: E } = t.row, P = t.chatIdentity, h = () => v === I && P === t.chatIdentity && E === t.row.revision && c === t.row.turnId;
      m.value = !0, b.value = "";
      try {
        const g = await t.bridge.request("administrator/text", {
          chatIdentity: P,
          turnId: c,
          role: _,
          revision: E,
          offset: R
        });
        if (!h()) return;
        y.value = g.result.text, $.value = g.result.offset;
      } catch (g) {
        h() && (b.value = L(g));
      } finally {
        h() && (m.value = !1);
      }
    }
    return (R, v) => (u(), d("article", {
      class: X(["admin-message", `is-${o.row.role}`]),
      "data-row-id": o.row.id
    }, [
      a("div", {
        class: "admin-bubble",
        tabindex: "0",
        role: "button",
        "aria-expanded": k.value,
        "aria-label": i(l).messageActions,
        onClick: v[0] || (v[0] = (c) => k.value = !k.value),
        onKeydown: [
          v[1] || (v[1] = J(W((c) => k.value = !k.value, ["prevent"]), ["enter"])),
          v[2] || (v[2] = J(W((c) => k.value = !k.value, ["prevent"]), ["space"])),
          v[3] || (v[3] = J(W((c) => k.value = !1, ["stop"]), ["esc"]))
        ]
      }, [
        o.row.image ? (u(), d("img", {
          key: 0,
          src: o.row.image.path,
          alt: o.row.image.name,
          loading: "lazy",
          class: "admin-message-image"
        }, null, 8, Fe)) : p("", !0),
        y.value ? (u(), d("p", Ue, n(y.value), 1)) : p("", !0),
        !y.value && !o.row.image && !o.row.operationCount ? (u(), d("span", Ge, n(o.row.error || i(l).noReply), 1)) : p("", !0)
      ], 40, We),
      o.row.totalChars > i(M).textBlock ? (u(), d("nav", {
        key: 0,
        class: "admin-pager",
        "aria-label": i(l).messagePages
      }, [a("button", {
        type: "button",
        disabled: $.value === 0 || m.value,
        onClick: v[4] || (v[4] = (c) => S(Math.max(0, $.value - i(M).textBlock)))
      }, n(i(l).previousText), 9, Ye), a("button", {
        type: "button",
        disabled: $.value + y.value.length >= o.row.totalChars || m.value,
        onClick: v[5] || (v[5] = (c) => S($.value + y.value.length))
      }, n(i(l).moreText), 9, Je)], 8, He)) : p("", !0),
      o.row.operationCount ? (u(), d("button", {
        key: 1,
        type: "button",
        class: "admin-operation-preview",
        onClick: v[6] || (v[6] = (c) => w("details", o.row))
      }, [(u(!0), d(K, null, Q(o.row.operations, (c) => (u(), d("span", {
        key: c.id,
        class: "admin-operation-line"
      }, [
        a("i", { class: X(["admin-operation-dot", `is-${c.status}`]) }, null, 2),
        a("span", null, [le(n(c.name), 1), c.target ? (u(), d("small", Qe, " · " + n(c.target), 1)) : p("", !0)]),
        a("small", null, n(i(l).operations[c.status]), 1)
      ]))), 128)), a("span", Xe, n(i(l).details) + " ›", 1)])) : p("", !0),
      o.row.error || b.value ? (u(), d("p", Ze, n(b.value || o.row.error), 1)) : p("", !0),
      k.value ? (u(), d("nav", {
        key: 3,
        class: "admin-message-actions",
        "aria-label": i(l).messageActions
      }, [
        a("button", {
          type: "button",
          disabled: o.disabled,
          onClick: v[7] || (v[7] = (c) => w("delete", o.row))
        }, n(i(l).delete), 9, tt),
        o.row.canRegenerate ? (u(), d("button", {
          key: 0,
          type: "button",
          disabled: o.disabled,
          onClick: v[8] || (v[8] = (c) => w("regenerate", o.row))
        }, n(i(l).regenerate), 9, at)) : p("", !0),
        o.row.role === "assistant" && o.row.status !== "finished" && o.row.canRegenerate ? (u(), d("button", {
          key: 1,
          type: "button",
          disabled: o.disabled,
          title: o.resumable ? i(l).retry : i(l).readOnlyRetry,
          onClick: v[9] || (v[9] = (c) => w("retry", o.row))
        }, n(o.resumable ? i(l).retry : i(l).recheck), 9, lt)) : p("", !0)
      ], 8, et)) : p("", !0)
    ], 10, Le));
  }
}), nt = it, rt = ["aria-label", "onKeydown"], st = ["aria-label"], ut = { class: "admin-details-body" }, ot = { class: "admin-evidence" }, dt = ["disabled"], vt = { class: "admin-operations" }, mt = { key: 0 }, ct = { class: "admin-muted" }, gt = ["disabled", "onClick"], yt = { class: "admin-pager" }, bt = ["disabled"], ft = ["disabled"], pt = {
  key: 2,
  class: "admin-error",
  role: "status"
}, kt = /* @__PURE__ */ ie({
  __name: "AdministratorDetails",
  props: {
    bridge: {},
    chatIdentity: {},
    turnId: {}
  },
  emits: ["close"],
  setup(o, { emit: T }) {
    const t = o, w = T, k = f([]), $ = f(0), y = f(0), m = f(""), b = f(!1), I = f(null), S = f(""), R = f(null);
    function v() {
      ue(() => R.value?.focus({ preventScroll: !0 }));
    }
    function c() {
      I.value ? (I.value = null, v()) : w("close");
    }
    Oe(R, c);
    async function _(P) {
      b.value = !0, m.value = "", I.value = null;
      try {
        const h = await t.bridge.request("administrator/operations", {
          chatIdentity: t.chatIdentity,
          turnId: t.turnId,
          offset: P
        });
        k.value = h.result.items, y.value = h.result.total, $.value = h.result.offset;
      } catch (h) {
        m.value = L(h);
      } finally {
        b.value = !1;
      }
    }
    async function E(P, h = 0) {
      b.value = !0, m.value = "";
      try {
        I.value = (await t.bridge.request("administrator/evidence", {
          chatIdentity: t.chatIdentity,
          reference: P,
          offset: h
        })).result, S.value = P, v();
      } catch (g) {
        m.value = L(g);
      } finally {
        b.value = !1;
      }
    }
    return $e(() => _(0)), (P, h) => (u(), d("section", {
      ref_key: "layer",
      ref: R,
      class: "admin-details",
      role: "dialog",
      "aria-modal": "true",
      tabindex: "-1",
      "aria-label": i(l).details,
      onKeydown: J(W(c, ["stop", "prevent"]), ["esc"])
    }, [a("header", null, [a("strong", null, n(i(l).details), 1), a("button", {
      type: "button",
      "aria-label": i(l).close,
      onClick: h[0] || (h[0] = (g) => w("close"))
    }, "×", 8, st)]), a("div", ut, [I.value ? (u(), d(K, { key: 0 }, [
      a("button", {
        type: "button",
        class: "admin-text-button",
        onClick: c
      }, "‹ " + n(i(l).details), 1),
      a("pre", ot, n(I.value.text), 1),
      I.value.nextOffset !== null ? (u(), d("button", {
        key: 0,
        type: "button",
        disabled: b.value,
        onClick: h[1] || (h[1] = (g) => E(S.value, I.value.nextOffset))
      }, n(i(l).moreText), 9, dt)) : p("", !0)
    ], 64)) : (u(), d(K, { key: 1 }, [a("ol", vt, [(u(!0), d(K, null, Q(k.value, (g) => (u(), d("li", { key: g.id }, [
      a("div", null, [
        a("i", { class: X(["admin-operation-dot", `is-${g.status}`]) }, null, 2),
        a("strong", null, n(g.name), 1),
        a("span", null, n(i(l).operations[g.status]), 1),
        a("small", null, n((g.elapsedMs / 1e3).toFixed(1)) + "s", 1)
      ]),
      g.target ? (u(), d("p", mt, n(g.target), 1)) : p("", !0),
      a("p", ct, n(g.summary), 1),
      a("button", {
        type: "button",
        class: "admin-text-button",
        disabled: b.value,
        onClick: (Z) => E(g.id)
      }, n(i(l).evidence), 9, gt)
    ]))), 128))]), a("nav", yt, [a("button", {
      type: "button",
      disabled: !$.value || b.value,
      onClick: h[2] || (h[2] = (g) => _(Math.max(0, $.value - i(M).pageSize)))
    }, n(i(l).earlier), 9, bt), a("button", {
      type: "button",
      disabled: $.value + k.value.length >= y.value || b.value,
      onClick: h[3] || (h[3] = (g) => _($.value + k.value.length))
    }, n(i(l).later), 9, ft)])], 64)), m.value ? (u(), d("p", pt, n(m.value), 1)) : p("", !0)])], 40, rt));
  }
}), ht = kt, wt = { class: "administrator-app" }, $t = { class: "admin-header" }, It = [
  "title",
  "aria-label",
  "disabled"
], _t = {
  key: 0,
  class: "admin-notice",
  role: "alert"
}, xt = ["disabled"], Ct = ["disabled"], Tt = {
  key: 1,
  class: "admin-empty"
}, Rt = {
  key: 2,
  class: "admin-live",
  role: "status",
  "aria-live": "off"
}, At = { class: "admin-live-status" }, Mt = { key: 0 }, Bt = {
  key: 0,
  class: "admin-prose"
}, St = {
  key: 1,
  class: "admin-muted"
}, zt = ["disabled"], Ot = {
  key: 2,
  class: "admin-notice",
  role: "status"
}, Pt = ["disabled"], qt = ["disabled"], Dt = ["disabled"], Et = ["disabled"], Nt = {
  key: 3,
  class: "admin-attachment"
}, Kt = ["src", "alt"], Vt = ["aria-label", "disabled"], jt = ["accept"], Lt = [
  "disabled",
  "aria-label",
  "title"
], Wt = [
  "placeholder",
  "aria-label",
  "disabled"
], Ft = ["aria-label", "title"], Ut = [
  "disabled",
  "aria-label",
  "title"
], Gt = { class: "admin-dialog-actions" }, Ht = ["disabled"], Yt = { class: "admin-dialog-actions" }, Jt = ["disabled"], Qt = /* @__PURE__ */ ie({
  __name: "AdministratorApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(o) {
    const T = o, t = pe(structuredClone(be(T.initialState))), w = pe(t.value.page.rows), k = f(t.value.page.start), $ = f(t.value.page.total), y = f(""), m = f(null), b = f(""), I = f(!1), S = f(!1), R = f(!1), v = f(null), c = f(null), _ = f(null), E = f(null), P = f(null), h = f(!0), g = f(null), Z = f(!1), de = f(0);
    let ee = 0, N = null;
    oe([y, m], () => {
      ee++;
    }, { flush: "sync" });
    const B = Y(() => I.value || !!t.value.live), F = Y(() => B.value || t.value.unsaved || t.value.corrupted), Ie = Y(() => w.value.filter((r) => r.role !== "assistant" || r.turnId !== t.value.live?.turnId || !!r.text)), V = Y(() => k.value + w.value.length >= $.value);
    let ve = () => {
    }, U, j = 0;
    const me = () => ({ chatIdentity: t.value.chatIdentity });
    async function te(r, e = {}) {
      return (await T.bridge.request(`administrator/${r}`, {
        ...me(),
        ...e
      }, 6e4)).result;
    }
    function ce() {
      const r = _.value, e = r && [...r.querySelectorAll("[data-row-id]")].find((s) => s.getBoundingClientRect().bottom > r.getBoundingClientRect().top);
      return e ? {
        id: e.dataset.rowId,
        top: e.getBoundingClientRect().top
      } : null;
    }
    async function ne(r) {
      await ue();
      const e = _.value && [..._.value.querySelectorAll("[data-row-id]")].find((s) => s.dataset.rowId === r?.id);
      r && e && _.value && (_.value.scrollTop += e.getBoundingClientRect().top - r.top);
    }
    async function G() {
      await ue(), _.value && (_.value.scrollTop = _.value.scrollHeight);
    }
    function re(r) {
      const e = ce(), s = V.value, C = t.value;
      if (t.value = r, $.value = r.page.total, C.chatIdentity !== r.chatIdentity) {
        j++, w.value = r.page.rows, k.value = r.page.start, y.value = "", m.value = null, c.value = null, g.value = null, N = null;
        return;
      }
      if (r.page.revision !== C.page.revision) {
        const A = Math.max(M.pageSize, w.value.length), z = s && h.value ? Math.max(0, r.page.total - A) : Math.min(k.value, Math.max(0, r.page.total - A));
        z === r.page.start && A === M.pageSize ? (w.value = r.page.rows, k.value = z, h.value || ne(e)) : _e(z, A, e);
      }
      N && !g.value && r.sendTurnId && (g.value = r.sendTurnId), g.value && !r.live && r.page.rows.find((A) => A.turnId === g.value && A.role === "assistant")?.status === "finished" && (N?.revision === ee && (y.value = "", m.value = null), g.value = null, N = null), h.value && V.value && G();
    }
    async function _e(r, e, s) {
      const C = ++j, A = t.value.chatIdentity, z = t.value.page.revision, x = () => C === j && A === t.value.chatIdentity && z === t.value.page.revision;
      try {
        const O = [];
        for (let D = r; D < Math.min($.value, r + e); D += M.pageSize) {
          const H = await te("page", {
            start: D,
            revision: z
          });
          if (!x()) return;
          O.push(...H.rows);
        }
        if (!x()) return;
        w.value = O, k.value = r, h.value && V.value ? await G() : await ne(s);
      } catch (O) {
        x() && (b.value = L(O));
      }
    }
    async function se(r, e) {
      if (S.value) return;
      const s = ++j;
      S.value = !0, b.value = "";
      const C = ce(), A = t.value.chatIdentity, z = t.value.page.revision;
      try {
        const x = await te("page", {
          start: r,
          revision: t.value.page.revision
        });
        if (s !== j || A !== t.value.chatIdentity || z !== t.value.page.revision) return;
        const O = w.value.filter((D) => D.revision === z);
        e === "earlier" ? (w.value = [...x.rows, ...O.filter((D) => !x.rows.some((H) => H.id === D.id))].slice(0, M.windowSize), k.value = x.start) : e === "later" ? (w.value = [...O.filter((D) => !x.rows.some((H) => H.id === D.id)), ...x.rows].slice(-M.windowSize), k.value = x.start + x.rows.length - w.value.length) : (w.value = x.rows, k.value = x.start), $.value = x.total, await ne(C);
      } catch (x) {
        s === j && A === t.value.chatIdentity && z === t.value.page.revision && (b.value = L(x));
      } finally {
        S.value = !1;
      }
    }
    async function ge() {
      await se(Math.max(0, $.value - M.pageSize), "replace"), h.value = !0, await G();
    }
    async function ye() {
      if (!(F.value || !y.value.trim() && !m.value)) {
        if (g.value && g.value === t.value.retryTurnId && N?.revision === ee) {
          await q("retry", { turnId: g.value });
          return;
        }
        I.value = !0, b.value = "", h.value = !0;
        try {
          g.value = null, N = { revision: ee };
          const r = await te("send", {
            text: y.value,
            ...m.value ? { image: be(m.value) } : {}
          });
          g.value = r.turnId, re(r.state), await ge();
        } catch (r) {
          b.value = L(r);
        } finally {
          I.value = !1;
        }
      }
    }
    async function q(r, e = {}) {
      if (!B.value) {
        I.value = !0, b.value = "";
        try {
          re(await te(r, e)), R.value = !1, v.value = null, r === "adopt" && (g.value = null, N = null), r === "clear" && (y.value = "", m.value = null, g.value = null, N = null, c.value = null);
        } catch (s) {
          b.value = L(s);
        } finally {
          I.value = !1;
        }
      }
    }
    async function xe(r) {
      const e = r.target, s = e.files?.[0];
      if (e.value = "", !!s) {
        if (b.value = "", s.size > M.maxImageBytes || !he.includes(s.type)) {
          b.value = l.invalidImage;
          return;
        }
        try {
          const C = await new Promise((z, x) => {
            const O = new FileReader();
            O.onload = () => z(String(O.result)), O.onerror = () => x(new Error(l.invalidImage)), O.readAsDataURL(s);
          }), A = new Image();
          A.src = C, await A.decode(), m.value = {
            name: s.name.slice(0, 120),
            dataUrl: C
          }, P.value?.focus();
        } catch {
          b.value = l.invalidImage;
        }
      }
    }
    function Ce(r) {
      r.key === "Enter" && !r.shiftKey && !Z.value && !r.isComposing && (r.preventDefault(), B.value || ye());
    }
    function Te() {
      _.value && (h.value = _.value.scrollHeight - _.value.scrollTop - _.value.clientHeight < 48);
    }
    return oe([y, m], () => {
      U && clearTimeout(U), U = setTimeout(() => {
        de.value = Pe(y.value) + (m.value ? M.imageTokens : 0);
      }, 160);
    }), $e(() => {
      ve = T.bridge.subscribe((r) => {
        r.type === "administrator/state" && re(r.payload.state), r.type === "administrator/live" && (t.value = {
          ...t.value,
          ...r.payload
        }, h.value && V.value && G());
      }), G();
    }), we(() => {
      j++, ve(), U && clearTimeout(U);
    }), (r, e) => (u(), d("div", wt, [
      a("header", $t, [
        a("h1", null, n(i(l).title), 1),
        Be(je, {
          usage: t.value.context,
          "draft-tokens": t.value.live || g.value ? 0 : de.value
        }, null, 8, ["usage", "draft-tokens"]),
        a("button", {
          type: "button",
          class: "admin-icon-button",
          title: i(l).clear,
          "aria-label": i(l).clear,
          disabled: B.value || t.value.unsaved,
          onClick: e[0] || (e[0] = (s) => R.value = !0)
        }, [...e[25] || (e[25] = [a("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [a("path", { d: "M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 10v7m4-7v7" })], -1)])], 8, It)
      ]),
      t.value.corrupted ? (u(), d("div", _t, [le(n(i(l).corrupted), 1), a("button", {
        type: "button",
        disabled: B.value,
        onClick: e[1] || (e[1] = (s) => R.value = !0)
      }, n(i(l).clear), 9, xt)])) : p("", !0),
      a("div", {
        ref_key: "list",
        ref: _,
        class: "admin-conversation",
        onScrollPassive: Te
      }, [
        k.value > 0 ? (u(), d("button", {
          key: 0,
          type: "button",
          class: "admin-history-button",
          disabled: S.value,
          onClick: e[2] || (e[2] = (s) => se(Math.max(0, k.value - i(M).pageSize), "earlier"))
        }, n(i(l).earlier), 9, Ct)) : p("", !0),
        !w.value.length && !t.value.live && !t.value.corrupted ? (u(), d("p", Tt, n(i(l).empty), 1)) : p("", !0),
        (u(!0), d(K, null, Q(Ie.value, (s) => (u(), ae(nt, {
          key: s.id,
          row: s,
          bridge: o.bridge,
          "chat-identity": t.value.chatIdentity,
          disabled: F.value,
          resumable: s.turnId === t.value.retryTurnId,
          onDelete: e[3] || (e[3] = (C) => v.value = C),
          onRegenerate: e[4] || (e[4] = (C) => q("regenerate", { turnId: C.turnId })),
          onRetry: e[5] || (e[5] = (C) => q("retry", { turnId: C.turnId })),
          onDetails: e[6] || (e[6] = (C) => c.value = C.turnId)
        }, null, 8, [
          "row",
          "bridge",
          "chat-identity",
          "disabled",
          "resumable"
        ]))), 128)),
        t.value.live && V.value ? (u(), d("div", Rt, [
          a("div", At, [e[26] || (e[26] = a("span", { class: "admin-working-dot" }, null, -1)), le(n(i(l).phases[t.value.live.phase]), 1)]),
          (u(!0), d(K, null, Q(t.value.live.operations, (s) => (u(), d("div", {
            key: s.id,
            class: "admin-operation-line"
          }, [
            a("i", { class: X(["admin-operation-dot", `is-${s.status}`]) }, null, 2),
            a("span", null, [le(n(s.name), 1), s.target ? (u(), d("small", Mt, " · " + n(s.target), 1)) : p("", !0)]),
            a("small", null, n(i(l).operations[s.status]), 1)
          ]))), 128)),
          t.value.live.text ? (u(), d("p", Bt, n(t.value.live.text), 1)) : p("", !0),
          t.value.live.totalChars > i(M).textBlock ? (u(), d("small", St, n(i(l).longReply), 1)) : p("", !0)
        ])) : p("", !0),
        V.value ? p("", !0) : (u(), d("button", {
          key: 3,
          type: "button",
          class: "admin-history-button",
          disabled: S.value,
          onClick: e[7] || (e[7] = (s) => se(k.value + w.value.length, "later"))
        }, n(i(l).later), 9, zt))
      ], 544),
      !V.value || !h.value ? (u(), d("button", {
        key: 1,
        type: "button",
        class: "admin-latest",
        onClick: ge
      }, "↓ " + n(i(l).latest), 1)) : p("", !0),
      b.value || t.value.error || t.value.unsaved ? (u(), d("div", Ot, [
        a("span", null, n(b.value || (t.value.unsaved ? i(l).unsaved : t.value.error)), 1),
        t.value.unsaved ? (u(), d("button", {
          key: 0,
          type: "button",
          disabled: B.value,
          onClick: e[8] || (e[8] = (s) => q("check"))
        }, n(i(l).check), 9, Pt)) : p("", !0),
        t.value.unsaved ? (u(), d("button", {
          key: 1,
          type: "button",
          disabled: B.value,
          onClick: e[9] || (e[9] = (s) => q("confirm"))
        }, n(i(l).confirm), 9, qt)) : t.value.retryTurnId ? (u(), d("button", {
          key: 2,
          type: "button",
          disabled: B.value,
          onClick: e[10] || (e[10] = (s) => q("retry", { turnId: t.value.retryTurnId }))
        }, n(i(l).retry), 9, Dt)) : p("", !0),
        t.value.conflict || t.value.unsaved ? (u(), d("button", {
          key: 3,
          type: "button",
          disabled: B.value,
          onClick: e[11] || (e[11] = (s) => q("adopt"))
        }, n(i(l).adopt), 9, Et)) : p("", !0)
      ])) : p("", !0),
      m.value ? (u(), d("div", Nt, [
        a("img", {
          src: m.value.dataUrl,
          alt: m.value.name
        }, null, 8, Kt),
        a("span", null, n(m.value.name), 1),
        a("button", {
          type: "button",
          "aria-label": i(l).removeImage,
          disabled: B.value,
          onClick: e[12] || (e[12] = (s) => m.value = null)
        }, "×", 8, Vt)
      ])) : p("", !0),
      a("form", {
        class: "admin-composer",
        onSubmit: W(ye, ["prevent"])
      }, [
        a("input", {
          ref_key: "file",
          ref: E,
          type: "file",
          accept: i(he).join(","),
          hidden: "",
          onChange: xe
        }, null, 40, jt),
        a("button", {
          type: "button",
          class: "admin-icon-button",
          disabled: F.value,
          "aria-label": i(l).attach,
          title: i(l).attach,
          onClick: e[13] || (e[13] = (s) => E.value?.click())
        }, [...e[27] || (e[27] = [a("svg", {
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
        ], -1)])], 8, Lt),
        Re(a("textarea", {
          ref_key: "composer",
          ref: P,
          "onUpdate:modelValue": e[14] || (e[14] = (s) => y.value = s),
          rows: "1",
          maxlength: "16000",
          placeholder: i(l).placeholder,
          "aria-label": i(l).placeholder,
          disabled: t.value.corrupted || B.value,
          onKeydown: Ce,
          onCompositionstart: e[15] || (e[15] = (s) => Z.value = !0),
          onCompositionend: e[16] || (e[16] = (s) => Z.value = !1)
        }, null, 40, Wt), [[Me, y.value]]),
        t.value.live ? (u(), d("button", {
          key: 0,
          type: "button",
          class: "admin-send",
          "aria-label": i(l).stop,
          title: i(l).stop,
          onClick: e[17] || (e[17] = (s) => T.bridge.post("administrator/stop", me()))
        }, [...e[28] || (e[28] = [a("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [a("rect", {
          x: "6",
          y: "6",
          width: "12",
          height: "12",
          rx: "2"
        })], -1)])], 8, Ft)) : (u(), d("button", {
          key: 1,
          type: "submit",
          class: "admin-send",
          disabled: F.value || !y.value.trim() && !m.value,
          "aria-label": i(l).send,
          title: i(l).send
        }, [...e[29] || (e[29] = [a("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [a("path", { d: "M12 19V5m-6 6 6-6 6 6" })], -1)])], 8, Ut))
      ], 32),
      c.value ? (u(), ae(ht, {
        key: c.value,
        bridge: o.bridge,
        "chat-identity": t.value.chatIdentity,
        "turn-id": c.value,
        onClose: e[18] || (e[18] = (s) => c.value = null)
      }, null, 8, [
        "bridge",
        "chat-identity",
        "turn-id"
      ])) : p("", !0),
      R.value ? (u(), ae(ke, {
        key: 5,
        class: "admin-dialog",
        "aria-label": i(l).clearTitle,
        busy: B.value,
        onClose: e[21] || (e[21] = (s) => R.value = !1)
      }, {
        default: fe(() => [
          a("h2", null, n(i(l).clearTitle), 1),
          a("p", null, n(i(l).clearWarning), 1),
          a("div", Gt, [a("button", {
            type: "button",
            onClick: e[19] || (e[19] = (s) => R.value = !1)
          }, n(i(l).cancel), 1), a("button", {
            type: "button",
            disabled: B.value,
            onClick: e[20] || (e[20] = (s) => q("clear"))
          }, n(i(l).clear), 9, Ht)])
        ]),
        _: 1
      }, 8, ["aria-label", "busy"])) : p("", !0),
      v.value ? (u(), ae(ke, {
        key: 6,
        class: "admin-dialog",
        "aria-label": i(l).delete,
        busy: B.value,
        onClose: e[24] || (e[24] = (s) => v.value = null)
      }, {
        default: fe(() => [
          a("h2", null, n(i(l).delete), 1),
          a("p", null, n(i(l).deleteWarning), 1),
          a("div", Yt, [a("button", {
            type: "button",
            onClick: e[22] || (e[22] = (s) => v.value = null)
          }, n(i(l).cancel), 1), a("button", {
            type: "button",
            disabled: F.value,
            onClick: e[23] || (e[23] = (s) => q("delete", {
              turnId: v.value.turnId,
              role: v.value.role,
              revision: t.value.page.revision
            }))
          }, n(i(l).delete), 9, Jt)])
        ]),
        _: 1
      }, 8, ["aria-label", "busy"])) : p("", !0)
    ]));
  }
}), la = Qt;
export {
  la as default
};
