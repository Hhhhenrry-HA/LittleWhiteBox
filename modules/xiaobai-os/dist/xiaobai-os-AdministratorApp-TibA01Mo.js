/* eslint-disable */
import { B as s, E as J, H as Q, L as xe, N as se, Q as Me, T as ve, Y as le, Z as he, _ as N, at as we, b as g, ct as i, dt as r, f as ae, i as Pe, it as ce, j as me, lt as H, m as j, nt as f, p as re, r as Be, u as ze, ut as Oe, v as l, w as ne, x as u, y as G } from "./xiaobai-os-app-navigation-DbF27MCy.js";
import { t as qe } from "./xiaobai-os-descriptor-DmDuv1pM.js";
import { t as ke } from "./xiaobai-os-AppDialog-CirfCMYM.js";
import { n as De } from "./xiaobai-os-context-tokens-D2DVKxEb.js";
import { t as $e } from "./xiaobai-os-MessageMarkdown-C0FeK3Ci.js";
import { t as Ee } from "./xiaobai-os-_plugin-vue_export-helper-Dj7HTbfw.js";
import { t as Le } from "./xiaobai-os-composer-keyboard-8bQRrNyB.js";
var L = Object.freeze({
  inputBudget: 158e3,
  summaryTrigger: 128e3,
  imageTokens: 6e3,
  pageSize: 20,
  windowSize: 60,
  textBlock: 4e3,
  streamInterval: 100,
  maxImageBytes: 4 * 1024 * 1024,
  maxToolRounds: 32,
  evidenceChars: 1e6,
  chatReadFloors: 20,
  chatSearchMatches: 20,
  chatQueryChars: 200
}), _e = Object.freeze([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif"
]);
function Ne() {
  return Array.from(globalThis.crypto.getRandomValues(new Uint8Array(16)), (n) => n.toString(16).padStart(2, "0")).join("");
}
var a = Object.freeze({
  webSearch: "搜索网页",
  webFetch: "读取网页",
  title: qe.name,
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
  process: (n) => `工作经过 · ${n} 轮`,
  processLoading: "加载经过",
  queued: "等待执行",
  notExecuted: "未执行",
  evidence: "查看资料",
  inspect: "检查 OS 状态",
  loadTools: "加载工具",
  toolsLoaded: "工具已就绪",
  itemReport: (n, c) => `成功 ${n} 项，未完成 ${c} 项`,
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
    waiting: "等待响应",
    thinking: "思考中",
    replying: "回复中",
    tools: "调用工具中",
    summarizing: "整理上下文",
    saving: "保存中",
    stopping: "正在停止"
  },
  elapsed: (n) => `已用 ${n} 秒`,
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
}), je = Object.freeze({
  administrator_stopped: a.stopped,
  administrator_busy: "当前操作尚未结束，请先等待或停止。",
  administrator_context_changed: "聊天已切换，旧操作已停止。",
  administrator_environment_unavailable: "OS 状态读取失败，未能确认当前运行情况。",
  administrator_chat_unavailable: "请先进入一个酒馆聊天。",
  administrator_message_missing: "这条消息已不存在，请刷新记录。",
  administrator_history_conflict: "管理员记录已被其他操作更新，请重新打开核对，不会覆盖现有记录。",
  administrator_input_invalid: "请输入内容或选择图片，文字最多 16000 字符。",
  administrator_invalid_image: a.invalidImage,
  administrator_image_missing: "附件读取失败，原消息与附件引用仍然保留，请重试。",
  administrator_image_delete_failed: "记录已保存，但附件删除失败，请再次确认清理。",
  administrator_image_list_failed: "附件目录读取失败，请再次确认清理。",
  administrator_save_pending: a.unsaved,
  administrator_save_failed: "保存失败。可检查结果、重新提交，或放弃未保存内容。",
  administrator_save_unconfirmed: a.unsaved,
  administrator_save_conflict: "服务器记录已更新，未覆盖它。可放弃本地未保存内容，保留服务器记录。",
  administrator_context_full: "本轮资料已超出应用输入预算，请缩小查阅范围后再继续。",
  administrator_summary_failed: "上下文整理失败，原记录未删除，可以重试。",
  administrator_model_refused: "模型没有接受本次请求，原消息和附件仍然保留。",
  administrator_empty_response: "模型未返回回复，可以重试。",
  administrator_tool_round_limit: "本轮已达到工具调用上限，请缩小任务范围。",
  administrator_tool_batch_too_large: "模型一次请求了过多工具，未执行这批操作。",
  administrator_evidence_expired: a.noEvidence,
  management_request_superseded: "记录已被后续修改取代。请说明当前希望怎样处理，不会恢复旧状态。",
  management_source_changed: "所依据的原文已经改变，需要重新查证。"
});
function F(n) {
  const c = n instanceof Error ? n.message : String(n);
  return je[c] ?? c.slice(0, 700);
}
var Ve = [
  "aria-label",
  "title",
  "aria-expanded"
], Fe = {
  key: 0,
  class: "admin-popover"
}, Ke = ["aria-label"], Ue = { class: "admin-context-total" }, We = /* @__PURE__ */ J({
  __name: "AdministratorContext",
  props: {
    usage: {},
    draftTokens: {}
  },
  setup(n) {
    const c = n, e = f(!1), y = N(() => c.usage.used + c.draftTokens), b = (w) => `${(w / 1e3).toFixed(1)}k`;
    return Be(() => (e.value = !1, !0), () => e.value), (w, h) => (s(), u("div", {
      class: "admin-context",
      onKeydown: h[2] || (h[2] = ae(re((v) => e.value = !1, ["stop"]), ["esc"]))
    }, [l("button", {
      type: "button",
      class: H(["admin-context-ring", { "is-warning": y.value >= n.usage.trigger }]),
      style: Oe({ "--context-fill": `${Math.min(1, y.value / n.usage.limit) * 360}deg` }),
      "aria-label": i(a).context,
      title: i(a).context,
      "aria-expanded": e.value,
      onClick: h[0] || (h[0] = (v) => e.value = !e.value)
    }, [...h[3] || (h[3] = [l("span", null, null, -1)])], 14, Ve), e.value ? (s(), u("section", Fe, [
      l("header", null, [l("strong", null, r(i(a).context), 1), l("button", {
        type: "button",
        "aria-label": i(a).close,
        onClick: h[1] || (h[1] = (v) => e.value = !1)
      }, "×", 8, Ke)]),
      l("p", Ue, r(b(y.value)) + " / " + r(b(n.usage.limit)), 1),
      l("dl", null, [(s(!0), u(j, null, Q(i(a).contextParts, (v, p) => (s(), u(j, { key: p }, [l("dt", null, r(v), 1), l("dd", null, r(b(n.usage[p] + (p === "history" ? n.draftTokens : 0))), 1)], 64))), 128))]),
      l("small", null, r(i(a).budgetNote), 1)
    ])) : g("", !0)], 32));
  }
}), Ge = We, He = ["aria-expanded"], Ye = {
  key: 1,
  class: "admin-process-body"
}, Qe = { key: 0 }, Je = {
  key: 0,
  class: "admin-muted"
}, Ze = {
  key: 1,
  class: "admin-error",
  role: "status"
}, Xe = /* @__PURE__ */ J({
  __name: "AdministratorProcess",
  props: {
    row: {},
    live: {},
    unsaved: {},
    bridge: {},
    chatIdentity: {}
  },
  setup(n) {
    const c = n, e = f(!1), y = ce([]), b = f(!1), w = f(""), h = N(() => c.live?.process ?? y.value), v = N(() => c.live?.process.length ?? c.unsaved?.length ?? c.row.processCount), p = N(() => !!c.live || e.value);
    let x = 0;
    async function M() {
      const C = ++x;
      if (w.value = "", b.value = !1, !p.value || c.live || !v.value) {
        y.value = [];
        return;
      }
      if (c.unsaved) {
        y.value = c.unsaved;
        return;
      }
      const { turnId: k, revision: I } = c.row, m = c.chatIdentity, _ = () => C === x && m === c.chatIdentity && k === c.row.turnId && I === c.row.revision;
      b.value = !0;
      try {
        const A = await c.bridge.request("administrator/process", {
          chatIdentity: m,
          turnId: k,
          revision: I
        });
        _() && (y.value = A.result);
      } catch (A) {
        _() && (w.value = F(A));
      } finally {
        _() && (b.value = !1);
      }
    }
    return le([
      () => c.chatIdentity,
      () => c.row.id,
      () => c.row.revision,
      () => !!c.live,
      () => c.unsaved,
      e
    ], (C, k) => {
      (C[0] !== k[0] || C[1] !== k[1] || C[3] !== k[3]) && (e.value = !1), M();
    }, { immediate: !0 }), se(() => {
      x++;
    }), (C, k) => v.value ? (s(), u("section", {
      key: 0,
      class: H(["admin-process", { "is-running": !!n.live }])
    }, [n.live ? g("", !0) : (s(), u("button", {
      key: 0,
      type: "button",
      class: "admin-process-toggle",
      "aria-expanded": p.value,
      onClick: k[0] || (k[0] = (I) => e.value = !e.value)
    }, [k[1] || (k[1] = l("svg", {
      viewBox: "0 0 16 16",
      "aria-hidden": "true"
    }, [l("path", { d: "m6 4 4 4-4 4" })], -1)), ne(r(i(a).process(v.value)), 1)], 8, He)), p.value ? (s(), u("div", Ye, [
      (s(!0), u(j, null, Q(h.value, (I) => (s(), u("div", {
        key: I.index,
        class: "admin-process-round"
      }, [I.text ? (s(), G($e, {
        key: 0,
        class: "admin-markdown admin-process-narration",
        text: I.text
      }, null, 8, ["text"])) : g("", !0), (s(!0), u(j, null, Q(I.tools, (m) => (s(), u("div", {
        key: m.id,
        class: "admin-operation-line"
      }, [
        l("i", { class: H(["admin-operation-dot", `is-${m.status}`]) }, null, 2),
        l("span", null, [ne(r(m.name), 1), m.target ? (s(), u("small", Qe, " · " + r(m.target), 1)) : g("", !0)]),
        l("small", null, r(m.status === "queued" ? i(a).queued : m.status === "not-executed" ? i(a).notExecuted : i(a).operations[m.status]), 1)
      ]))), 128))]))), 128)),
      b.value ? (s(), u("span", Je, r(i(a).processLoading), 1)) : g("", !0),
      w.value ? (s(), u("p", Ze, [ne(r(w.value), 1), l("button", {
        type: "button",
        onClick: M
      }, r(i(a).check), 1)])) : g("", !0)
    ])) : g("", !0)], 2)) : g("", !0);
  }
}), et = Xe, tt = ["data-phase"], at = {
  role: "status",
  "aria-live": "polite"
}, lt = ["datetime"], it = /* @__PURE__ */ J({
  __name: "AdministratorStatus",
  props: {
    phase: {},
    startedAt: {}
  },
  setup(n) {
    const c = n, e = f(Date.now()), y = N(() => Math.max(0, Math.floor((e.value - (c.startedAt ?? e.value)) / 1e3)));
    return le(() => c.startedAt, (b, w, h) => {
      if (e.value = Date.now(), b === void 0) return;
      const v = setInterval(() => {
        e.value = Date.now();
      }, 1e3);
      h(() => clearInterval(v));
    }, { immediate: !0 }), (b, w) => (s(), u("div", {
      class: "admin-live-status",
      "data-phase": n.phase
    }, [
      w[0] || (w[0] = l("span", {
        class: "admin-working-dot",
        "aria-hidden": "true"
      }, null, -1)),
      l("span", at, r(i(a).phases[n.phase]), 1),
      n.startedAt !== void 0 ? (s(), u("time", {
        key: 0,
        datetime: `PT${y.value}S`
      }, r(i(a).elapsed(y.value)), 9, lt)) : g("", !0)
    ], 8, tt));
  }
}), Ie = /* @__PURE__ */ Ee(it, [["__scopeId", "data-v-8eac51f2"]]), nt = ["data-row-id"], st = ["aria-label"], rt = ["src", "alt"], ut = {
  key: 2,
  class: "admin-muted"
}, ot = {
  key: 0,
  class: "admin-muted"
}, dt = ["aria-label"], vt = ["disabled"], ct = {
  key: 4,
  class: "admin-error",
  role: "status"
}, mt = ["aria-label"], gt = ["disabled"], pt = ["disabled"], ft = /* @__PURE__ */ J({
  __name: "AdministratorMessage",
  props: {
    row: {},
    live: { default: null },
    unsavedProcess: { default: null },
    bridge: {},
    chatIdentity: {},
    disabled: { type: Boolean }
  },
  emits: [
    "delete",
    "regenerate",
    "details"
  ],
  setup(n, { emit: c }) {
    const e = n, y = c, b = f(!1), w = f(e.row.text), h = f(!1), v = f("");
    let p = 0, x = w.value.length;
    const M = N(() => e.live ? e.live.text : w.value), C = N(() => e.unsavedProcess?.length ?? e.row.processCount);
    function k(m) {
      m.target.closest("a, button, input, textarea, select") || (m instanceof KeyboardEvent && m.preventDefault(), b.value = !b.value);
    }
    le(() => [
      e.chatIdentity,
      e.row.id,
      e.row.revision
    ], (m, _) => {
      p++, h.value = !1, v.value = "", (m[0] !== _[0] || m[1] !== _[1]) && (x = e.row.text.length), x <= e.row.text.length ? w.value = e.row.text : I(x, !0);
    }), se(() => {
      p++;
    });
    async function I(m, _ = !1) {
      if (h.value) return;
      x = Math.min(Math.max(x, m), e.row.totalChars);
      const A = ++p, { turnId: P, role: z, revision: $ } = e.row, T = e.chatIdentity, O = () => A === p && T === e.chatIdentity && $ === e.row.revision && P === e.row.turnId;
      h.value = !0, v.value = "";
      try {
        let S = _ ? e.row.text : w.value;
        for (; S.length < x; ) {
          const K = await e.bridge.request("administrator/text", {
            chatIdentity: T,
            turnId: P,
            role: z,
            revision: $,
            offset: S.length
          });
          if (!O()) return;
          S += K.result.text;
        }
        w.value = S;
      } catch (S) {
        O() && (_ && (w.value = e.row.text), v.value = F(S));
      } finally {
        O() && (h.value = !1);
      }
    }
    return (m, _) => (s(), u("article", {
      class: H(["admin-message", `is-${n.row.role}`]),
      "data-row-id": n.row.id
    }, [
      n.row.role === "assistant" ? (s(), G(et, {
        key: 0,
        row: n.row,
        live: n.live,
        unsaved: n.unsavedProcess,
        bridge: n.bridge,
        "chat-identity": n.chatIdentity
      }, null, 8, [
        "row",
        "live",
        "unsaved",
        "bridge",
        "chat-identity"
      ])) : g("", !0),
      M.value || n.row.image || !n.live && !C.value ? (s(), u("div", {
        key: 1,
        class: "admin-bubble",
        tabindex: "0",
        role: "group",
        "aria-label": i(a).messageActions,
        onClick: k,
        onKeydown: [
          ae(k, ["enter"]),
          ae(k, ["space"]),
          _[0] || (_[0] = ae(re((A) => b.value = !1, ["stop"]), ["esc"]))
        ]
      }, [
        n.row.image ? (s(), u("img", {
          key: 0,
          src: n.row.image.path,
          alt: n.row.image.name,
          loading: "lazy",
          class: "admin-message-image"
        }, null, 8, rt)) : g("", !0),
        M.value ? (s(), G($e, {
          key: 1,
          class: "admin-markdown",
          text: M.value
        }, null, 8, ["text"])) : g("", !0),
        !M.value && !n.row.image ? (s(), u("span", ut, r(n.row.error || i(a).noReply), 1)) : g("", !0)
      ], 40, st)) : g("", !0),
      n.live ? (s(), u(j, { key: 2 }, [
        (s(!0), u(j, null, Q(n.live.preview, (A) => (s(), u("div", {
          key: A.id,
          class: "admin-operation-line"
        }, [
          l("i", { class: H(["admin-operation-dot", `is-${A.status}`]) }, null, 2),
          l("span", null, r(A.name), 1),
          l("small", null, r(i(a).operations[A.status]), 1)
        ]))), 128)),
        n.live.totalChars > i(L).textBlock ? (s(), u("small", ot, r(i(a).longReply), 1)) : g("", !0),
        ve(Ie, {
          phase: n.live.phase,
          "started-at": n.live.startedAt
        }, null, 8, ["phase", "started-at"])
      ], 64)) : g("", !0),
      !n.live && n.row.totalChars > w.value.length ? (s(), u("nav", {
        key: 3,
        class: "admin-pager",
        "aria-label": i(a).messagePages
      }, [l("button", {
        type: "button",
        disabled: h.value,
        onClick: _[1] || (_[1] = (A) => I(w.value.length + i(L).textBlock))
      }, r(i(a).moreText), 9, vt)], 8, dt)) : g("", !0),
      n.row.error || v.value ? (s(), u("p", ct, r(v.value || n.row.error), 1)) : g("", !0),
      b.value || !n.live && C.value && !M.value ? (s(), u("nav", {
        key: 5,
        class: "admin-message-actions",
        "aria-label": i(a).messageActions
      }, [
        l("button", {
          type: "button",
          disabled: n.disabled,
          onClick: _[2] || (_[2] = (A) => y("delete", n.row))
        }, r(i(a).delete), 9, gt),
        n.row.canRegenerate ? (s(), u("button", {
          key: 0,
          type: "button",
          disabled: n.disabled,
          onClick: _[3] || (_[3] = (A) => y("regenerate", n.row))
        }, r(i(a).regenerate), 9, pt)) : g("", !0),
        C.value ? (s(), u("button", {
          key: 1,
          type: "button",
          onClick: _[4] || (_[4] = (A) => y("details", n.row))
        }, r(i(a).evidence), 1)) : g("", !0)
      ], 8, mt)) : g("", !0)
    ], 10, nt));
  }
}), yt = ft, bt = [
  "role",
  "aria-modal",
  "aria-label",
  "onKeydown"
], ht = ["aria-label"], wt = { class: "admin-details-body" }, kt = { class: "admin-evidence" }, _t = ["disabled"], xt = { class: "admin-operations" }, $t = { key: 0 }, It = { class: "admin-muted" }, Ct = ["disabled", "onClick"], At = { class: "admin-pager" }, Tt = ["disabled"], St = ["disabled"], Rt = {
  key: 2,
  class: "admin-error",
  role: "status"
}, Mt = /* @__PURE__ */ J({
  __name: "AdministratorDetails",
  props: {
    bridge: {},
    chatIdentity: {},
    turnId: {}
  },
  emits: ["close"],
  setup(n, { emit: c }) {
    const e = n, y = c, b = f([]), w = f(0), h = f(0), v = f(""), p = f(!1), x = f(null), M = f(""), C = f(null), k = f(!0);
    let I;
    function m() {
      me(() => C.value?.focus({ preventScroll: !0 }));
    }
    function _() {
      x.value ? (x.value = null, m()) : y("close");
    }
    Pe(C, _, () => k.value);
    async function A(z) {
      p.value = !0, v.value = "", x.value = null;
      try {
        const $ = await e.bridge.request("administrator/operations", {
          chatIdentity: e.chatIdentity,
          turnId: e.turnId,
          offset: z
        });
        b.value = $.result.items, h.value = $.result.total, w.value = $.result.offset;
      } catch ($) {
        v.value = F($);
      } finally {
        p.value = !1;
      }
    }
    async function P(z, $ = 0) {
      p.value = !0, v.value = "";
      try {
        x.value = (await e.bridge.request("administrator/evidence", {
          chatIdentity: e.chatIdentity,
          reference: z,
          offset: $
        })).result, M.value = z, m();
      } catch (T) {
        v.value = F(T);
      } finally {
        p.value = !1;
      }
    }
    return xe(() => {
      const z = C.value.closest(".administrator-app"), $ = () => {
        k.value = getComputedStyle(z).getPropertyValue("--admin-details-docked").trim() !== "1";
      };
      $(), I = new ResizeObserver($), I.observe(z), m(), A(0);
    }), se(() => I?.disconnect()), (z, $) => (s(), u("section", {
      ref_key: "layer",
      ref: C,
      class: "admin-details",
      role: k.value ? "dialog" : "region",
      "aria-modal": k.value ? !0 : void 0,
      tabindex: "-1",
      "aria-label": i(a).details,
      onKeydown: ae(re(_, ["stop", "prevent"]), ["esc"])
    }, [l("header", null, [l("strong", null, r(i(a).details), 1), l("button", {
      type: "button",
      "aria-label": i(a).close,
      onClick: $[0] || ($[0] = (T) => y("close"))
    }, "×", 8, ht)]), l("div", wt, [x.value ? (s(), u(j, { key: 0 }, [
      l("button", {
        type: "button",
        class: "admin-text-button",
        onClick: _
      }, "‹ " + r(i(a).details), 1),
      l("pre", kt, r(x.value.text), 1),
      x.value.nextOffset !== null ? (s(), u("button", {
        key: 0,
        type: "button",
        disabled: p.value,
        onClick: $[1] || ($[1] = (T) => P(M.value, x.value.nextOffset))
      }, r(i(a).moreText), 9, _t)) : g("", !0)
    ], 64)) : (s(), u(j, { key: 1 }, [l("ol", xt, [(s(!0), u(j, null, Q(b.value, (T) => (s(), u("li", { key: T.id }, [
      l("div", null, [
        l("i", { class: H(["admin-operation-dot", `is-${T.status}`]) }, null, 2),
        l("strong", null, r(T.name), 1),
        l("span", null, r(i(a).operations[T.status]), 1),
        l("small", null, r((T.elapsedMs / 1e3).toFixed(1)) + "s", 1)
      ]),
      T.target ? (s(), u("p", $t, r(T.target), 1)) : g("", !0),
      l("p", It, r(T.summary), 1),
      l("button", {
        type: "button",
        class: "admin-text-button",
        disabled: p.value,
        onClick: (O) => P(T.id)
      }, r(i(a).evidence), 9, Ct)
    ]))), 128))]), l("nav", At, [l("button", {
      type: "button",
      disabled: !w.value || p.value,
      onClick: $[2] || ($[2] = (T) => A(Math.max(0, w.value - i(L).pageSize)))
    }, r(i(a).earlier), 9, Tt), l("button", {
      type: "button",
      disabled: w.value + b.value.length >= h.value || p.value,
      onClick: $[3] || ($[3] = (T) => A(w.value + b.value.length))
    }, r(i(a).later), 9, St)])], 64)), v.value ? (s(), u("p", Rt, r(v.value), 1)) : g("", !0)])], 40, bt));
  }
}), Pt = Mt, Bt = { class: "admin-header" }, zt = [
  "title",
  "aria-label",
  "disabled"
], Ot = {
  key: 0,
  class: "admin-notice",
  role: "alert"
}, qt = ["disabled"], Dt = ["disabled"], Et = {
  key: 1,
  class: "admin-empty"
}, Lt = {
  key: 2,
  class: "admin-live"
}, Nt = ["disabled"], jt = {
  key: 2,
  class: "admin-notice",
  role: "status"
}, Vt = ["disabled"], Ft = ["disabled"], Kt = ["disabled"], Ut = {
  key: 3,
  class: "admin-attachment"
}, Wt = ["src", "alt"], Gt = ["aria-label", "disabled"], Ht = ["accept"], Yt = [
  "disabled",
  "aria-label",
  "title"
], Qt = [
  "placeholder",
  "aria-label",
  "disabled"
], Jt = [
  "disabled",
  "aria-label",
  "title"
], Zt = [
  "disabled",
  "aria-label",
  "title"
], Xt = { class: "admin-dialog-actions" }, ea = ["disabled"], ta = { class: "admin-dialog-actions" }, aa = ["disabled"], la = /* @__PURE__ */ J({
  __name: "AdministratorApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(n) {
    const c = n, e = ce(structuredClone(we(c.initialState))), y = ce(e.value.page.rows), b = f(e.value.page.start), w = f(e.value.page.total), h = f(""), v = f(null), p = f(""), x = f(""), M = f(!1), C = f(!1), k = f(null), I = f(null), m = f(null), _ = f(null), A = f(null), P = f(!0), z = f(!1), $ = f(0);
    let T = 0, O = null;
    le([h, v], () => {
      T++;
    }, { flush: "sync" });
    const S = N(() => !!x.value || !!e.value.live), K = N(() => e.value.live?.phase ?? (["send", "regenerate"].includes(x.value) ? "preparing" : null)), Z = N(() => S.value || e.value.unsaved || e.value.corrupted), Ce = N(() => y.value.some((o) => o.role === "assistant" && o.turnId === e.value.live?.turnId)), U = N(() => b.value + y.value.length >= w.value);
    let ge = () => {
    }, X, W = 0;
    const pe = () => ({ chatIdentity: e.value.chatIdentity });
    async function ie(o, t = {}) {
      return (await c.bridge.request(`administrator/${o}`, {
        ...pe(),
        ...t
      }, 6e4)).result;
    }
    function fe() {
      const o = m.value, t = o && [...o.querySelectorAll("[data-row-id]")].find((d) => d.getBoundingClientRect().bottom > o.getBoundingClientRect().top);
      return t ? {
        id: t.dataset.rowId,
        top: t.getBoundingClientRect().top
      } : null;
    }
    async function ue(o) {
      await me();
      const t = m.value && [...m.value.querySelectorAll("[data-row-id]")].find((d) => d.dataset.rowId === o?.id);
      o && t && m.value && (m.value.scrollTop += t.getBoundingClientRect().top - o.top);
    }
    async function ee() {
      await me(), m.value && (m.value.scrollTop = m.value.scrollHeight);
    }
    function oe(o) {
      const t = fe(), d = U.value, B = e.value;
      if (e.value = o, w.value = o.page.total, B.chatIdentity !== o.chatIdentity) {
        W++, y.value = o.page.rows, b.value = o.page.start, h.value = "", v.value = null, I.value = null, O = null;
        return;
      }
      if (o.page.revision !== B.page.revision) {
        const q = Math.max(L.pageSize, y.value.length), D = d && P.value ? Math.max(0, o.page.total - q) : Math.min(b.value, Math.max(0, o.page.total - q));
        D === o.page.start && q === L.pageSize ? (y.value = o.page.rows, b.value = D, P.value || ue(t)) : Ae(D, q, t);
      }
      O && o.submission?.id === O.id && o.submission.accepted && (O.revision === T && (h.value = "", v.value = null), O = null), P.value && U.value && ee();
    }
    async function Ae(o, t, d) {
      const B = ++W, q = e.value.chatIdentity, D = e.value.page.revision, R = () => B === W && q === e.value.chatIdentity && D === e.value.page.revision;
      try {
        const E = [];
        for (let V = o; V < Math.min(w.value, o + t); V += L.pageSize) {
          const te = await ie("page", {
            start: V,
            revision: D
          });
          if (!R()) return;
          E.push(...te.rows);
        }
        if (!R()) return;
        y.value = E, b.value = o, P.value && U.value ? await ee() : await ue(d);
      } catch (E) {
        R() && (p.value = F(E));
      }
    }
    async function de(o, t) {
      if (M.value) return;
      const d = ++W;
      M.value = !0, p.value = "";
      const B = fe(), q = e.value.chatIdentity, D = e.value.page.revision;
      try {
        const R = await ie("page", {
          start: o,
          revision: e.value.page.revision
        });
        if (d !== W || q !== e.value.chatIdentity || D !== e.value.page.revision) return;
        const E = y.value.filter((V) => V.revision === D);
        t === "earlier" ? (y.value = [...R.rows, ...E.filter((V) => !R.rows.some((te) => te.id === V.id))].slice(0, L.windowSize), b.value = R.start) : t === "later" ? (y.value = [...E.filter((V) => !R.rows.some((te) => te.id === V.id)), ...R.rows].slice(-L.windowSize), b.value = R.start + R.rows.length - y.value.length) : (y.value = R.rows, b.value = R.start), w.value = R.total, await ue(B);
      } catch (R) {
        d === W && q === e.value.chatIdentity && D === e.value.page.revision && (p.value = F(R));
      } finally {
        M.value = !1;
      }
    }
    async function ye() {
      await de(Math.max(0, w.value - L.pageSize), "replace"), P.value = !0, await ee();
    }
    async function be() {
      if (!(Z.value || !h.value.trim() && !v.value)) {
        x.value = "send", p.value = "", P.value = !0;
        try {
          O = {
            id: Ne(),
            revision: T
          }, oe((await ie("send", {
            submissionId: O.id,
            text: h.value,
            ...v.value ? { image: we(v.value) } : {}
          })).state), await ye();
        } catch (o) {
          p.value = F(o);
        } finally {
          x.value = "";
        }
      }
    }
    async function Y(o, t = {}) {
      if (!S.value) {
        x.value = o, p.value = "";
        try {
          oe(await ie(o, t)), C.value = !1, k.value = null, o === "adopt" && (O = null), o === "clear" && (h.value = "", v.value = null, O = null, I.value = null);
        } catch (d) {
          p.value = F(d);
        } finally {
          x.value = "";
        }
      }
    }
    async function Te(o) {
      const t = o.target, d = t.files?.[0];
      if (t.value = "", !!d) {
        if (p.value = "", d.size > L.maxImageBytes || !_e.includes(d.type)) {
          p.value = a.invalidImage;
          return;
        }
        try {
          const B = await new Promise((D, R) => {
            const E = new FileReader();
            E.onload = () => D(String(E.result)), E.onerror = () => R(new Error(a.invalidImage)), E.readAsDataURL(d);
          }), q = new Image();
          q.src = B, await q.decode(), v.value = {
            name: d.name.slice(0, 120),
            dataUrl: B
          }, A.value?.focus();
        } catch {
          p.value = a.invalidImage;
        }
      }
    }
    function Se(o) {
      Le(o, z.value) && (o.preventDefault(), S.value || be());
    }
    function Re() {
      m.value && (P.value = m.value.scrollHeight - m.value.scrollTop - m.value.clientHeight < 48);
    }
    return le([h, v], () => {
      X && clearTimeout(X), X = setTimeout(() => {
        $.value = De(h.value) + (v.value ? L.imageTokens : 0);
      }, 160);
    }), xe(() => {
      ge = c.bridge.subscribe((o) => {
        o.type === "administrator/state" && oe(o.payload.state), o.type === "administrator/live" && (e.value = {
          ...e.value,
          ...o.payload
        }, P.value && U.value && ee());
      }), ee();
    }), se(() => {
      W++, ge(), X && clearTimeout(X);
    }), (o, t) => (s(), u("div", { class: H(["administrator-app", { "has-details": !!I.value }]) }, [
      l("header", Bt, [
        l("h1", null, r(i(a).title), 1),
        ve(Ge, {
          usage: e.value.context,
          "draft-tokens": e.value.live ? 0 : $.value
        }, null, 8, ["usage", "draft-tokens"]),
        l("button", {
          type: "button",
          class: "admin-icon-button",
          title: i(a).clear,
          "aria-label": i(a).clear,
          disabled: S.value || e.value.unsaved,
          onClick: t[0] || (t[0] = (d) => C.value = !0)
        }, [...t[23] || (t[23] = [l("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [l("path", { d: "M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 10v7m4-7v7" })], -1)])], 8, zt)
      ]),
      e.value.corrupted ? (s(), u("div", Ot, [ne(r(i(a).corrupted), 1), l("button", {
        type: "button",
        disabled: S.value,
        onClick: t[1] || (t[1] = (d) => C.value = !0)
      }, r(i(a).clear), 9, qt)])) : g("", !0),
      l("div", {
        ref_key: "list",
        ref: m,
        class: "admin-conversation",
        onScrollPassive: Re
      }, [
        b.value > 0 ? (s(), u("button", {
          key: 0,
          type: "button",
          class: "admin-history-button",
          disabled: M.value,
          onClick: t[2] || (t[2] = (d) => de(Math.max(0, b.value - i(L).pageSize), "earlier"))
        }, r(i(a).earlier), 9, Dt)) : g("", !0),
        !y.value.length && !K.value && !e.value.corrupted ? (s(), u("p", Et, r(i(a).empty), 1)) : g("", !0),
        (s(!0), u(j, null, Q(y.value, (d) => (s(), G(yt, {
          key: d.id,
          row: d,
          live: d.role === "assistant" && d.turnId === e.value.live?.turnId ? e.value.live : null,
          bridge: n.bridge,
          "chat-identity": e.value.chatIdentity,
          disabled: Z.value,
          "unsaved-process": d.role === "assistant" && d.turnId === e.value.unsavedProcess?.turnId ? e.value.unsavedProcess.rounds : null,
          onDelete: t[3] || (t[3] = (B) => k.value = B),
          onRegenerate: t[4] || (t[4] = (B) => Y("regenerate", { turnId: B.turnId })),
          onDetails: t[5] || (t[5] = (B) => I.value = B.turnId)
        }, null, 8, [
          "row",
          "live",
          "bridge",
          "chat-identity",
          "disabled",
          "unsaved-process"
        ]))), 128)),
        K.value && U.value && !Ce.value ? (s(), u("div", Lt, [ve(Ie, {
          phase: K.value,
          "started-at": e.value.live?.startedAt
        }, null, 8, ["phase", "started-at"])])) : g("", !0),
        U.value ? g("", !0) : (s(), u("button", {
          key: 3,
          type: "button",
          class: "admin-history-button",
          disabled: M.value,
          onClick: t[6] || (t[6] = (d) => de(b.value + y.value.length, "later"))
        }, r(i(a).later), 9, Nt))
      ], 544),
      !U.value || !P.value ? (s(), u("button", {
        key: 1,
        type: "button",
        class: "admin-latest",
        onClick: ye
      }, "↓ " + r(i(a).latest), 1)) : g("", !0),
      p.value || e.value.error || e.value.unsaved ? (s(), u("div", jt, [
        l("span", null, r(p.value || (e.value.unsaved ? i(a).unsaved : e.value.error)), 1),
        e.value.unsaved ? (s(), u("button", {
          key: 0,
          type: "button",
          disabled: S.value,
          onClick: t[7] || (t[7] = (d) => Y("check"))
        }, r(i(a).check), 9, Vt)) : g("", !0),
        e.value.unsaved ? (s(), u("button", {
          key: 1,
          type: "button",
          disabled: S.value,
          onClick: t[8] || (t[8] = (d) => Y("confirm"))
        }, r(i(a).confirm), 9, Ft)) : g("", !0),
        e.value.conflict || e.value.unsaved ? (s(), u("button", {
          key: 2,
          type: "button",
          disabled: S.value,
          onClick: t[9] || (t[9] = (d) => Y("adopt"))
        }, r(i(a).adopt), 9, Kt)) : g("", !0)
      ])) : g("", !0),
      v.value ? (s(), u("div", Ut, [
        l("img", {
          src: v.value.dataUrl,
          alt: v.value.name
        }, null, 8, Wt),
        l("span", null, r(v.value.name), 1),
        l("button", {
          type: "button",
          "aria-label": i(a).removeImage,
          disabled: S.value,
          onClick: t[10] || (t[10] = (d) => v.value = null)
        }, "×", 8, Gt)
      ])) : g("", !0),
      l("form", {
        class: "admin-composer",
        onSubmit: re(be, ["prevent"])
      }, [
        l("input", {
          ref_key: "file",
          ref: _,
          type: "file",
          accept: i(_e).join(","),
          hidden: "",
          onChange: Te
        }, null, 40, Ht),
        l("button", {
          type: "button",
          class: "admin-icon-button",
          disabled: Z.value,
          "aria-label": i(a).attach,
          title: i(a).attach,
          onClick: t[11] || (t[11] = (d) => _.value?.click())
        }, [...t[24] || (t[24] = [l("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [
          l("rect", {
            x: "3",
            y: "3",
            width: "18",
            height: "18",
            rx: "3"
          }),
          l("circle", {
            cx: "8",
            cy: "8",
            r: "1.5"
          }),
          l("path", { d: "m3 17 5-5 4 4 4-7 5 8" })
        ], -1)])], 8, Yt),
        Me(l("textarea", {
          ref_key: "composer",
          ref: A,
          "onUpdate:modelValue": t[12] || (t[12] = (d) => h.value = d),
          rows: "1",
          maxlength: "16000",
          enterkeyhint: "enter",
          placeholder: i(a).placeholder,
          "aria-label": i(a).placeholder,
          disabled: e.value.corrupted || S.value,
          onKeydown: Se,
          onCompositionstart: t[13] || (t[13] = (d) => z.value = !0),
          onCompositionend: t[14] || (t[14] = (d) => z.value = !1)
        }, null, 40, Qt), [[ze, h.value]]),
        K.value ? (s(), u("button", {
          key: 0,
          type: "button",
          class: "admin-send",
          disabled: K.value === "stopping",
          "aria-label": i(a).stop,
          title: i(a).stop,
          onClick: t[15] || (t[15] = (d) => c.bridge.post("administrator/stop", pe()))
        }, [...t[25] || (t[25] = [l("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [l("rect", {
          x: "6",
          y: "6",
          width: "12",
          height: "12",
          rx: "2"
        })], -1)])], 8, Jt)) : (s(), u("button", {
          key: 1,
          type: "submit",
          class: "admin-send",
          disabled: Z.value || !h.value.trim() && !v.value,
          "aria-label": i(a).send,
          title: i(a).send
        }, [...t[26] || (t[26] = [l("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [l("path", { d: "M12 19V5m-6 6 6-6 6 6" })], -1)])], 8, Zt))
      ], 32),
      I.value ? (s(), G(Pt, {
        key: I.value,
        bridge: n.bridge,
        "chat-identity": e.value.chatIdentity,
        "turn-id": I.value,
        onClose: t[16] || (t[16] = (d) => I.value = null)
      }, null, 8, [
        "bridge",
        "chat-identity",
        "turn-id"
      ])) : g("", !0),
      C.value ? (s(), G(ke, {
        key: 5,
        class: "admin-dialog",
        "aria-label": i(a).clearTitle,
        busy: S.value,
        onClose: t[19] || (t[19] = (d) => C.value = !1)
      }, {
        default: he(() => [
          l("h2", null, r(i(a).clearTitle), 1),
          l("p", null, r(i(a).clearWarning), 1),
          l("div", Xt, [l("button", {
            type: "button",
            onClick: t[17] || (t[17] = (d) => C.value = !1)
          }, r(i(a).cancel), 1), l("button", {
            type: "button",
            disabled: S.value,
            onClick: t[18] || (t[18] = (d) => Y("clear"))
          }, r(i(a).clear), 9, ea)])
        ]),
        _: 1
      }, 8, ["aria-label", "busy"])) : g("", !0),
      k.value ? (s(), G(ke, {
        key: 6,
        class: "admin-dialog",
        "aria-label": i(a).delete,
        busy: S.value,
        onClose: t[22] || (t[22] = (d) => k.value = null)
      }, {
        default: he(() => [
          l("h2", null, r(i(a).delete), 1),
          l("p", null, r(i(a).deleteWarning), 1),
          l("div", ta, [l("button", {
            type: "button",
            onClick: t[20] || (t[20] = (d) => k.value = null)
          }, r(i(a).cancel), 1), l("button", {
            type: "button",
            disabled: Z.value,
            onClick: t[21] || (t[21] = (d) => Y("delete", {
              turnId: k.value.turnId,
              role: k.value.role,
              revision: e.value.page.revision
            }))
          }, r(i(a).delete), 9, aa)])
        ]),
        _: 1
      }, 8, ["aria-label", "busy"])) : g("", !0)
    ], 2));
  }
}), va = la;
export {
  va as default
};
