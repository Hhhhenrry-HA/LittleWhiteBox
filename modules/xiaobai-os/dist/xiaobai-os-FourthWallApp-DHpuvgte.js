/* eslint-disable */
import { n as xe } from "./xiaobai-os-message-markdown-p_WvGylV.js";
import { B as Ae, E as oe, F as c, G as ae, K as V, L as ie, M as ue, O as de, Q as N, S as ee, T as Te, U as G, X as q, Y as Z, _ as y, b as Y, et as H, g as B, h as j, i as K, l as Me, m as e, nt as Ee, o as R, p as O, rt as S, tt as se, u as X, x as z, y as U } from "./xiaobai-os-runtime-dom.esm-bundler-BeaorYpU.js";
import { n as ve, r as me } from "./xiaobai-os-app-navigation-dPaaNhS6.js";
import { t as te } from "./xiaobai-os-context-tokens-bfmDTbG3.js";
import { t as fe } from "./xiaobai-os-AppDialog-CwwXWjcp.js";
var qe = { class: "fourth-wall-context" }, Fe = ["aria-label", "aria-expanded"], Be = {
  key: 0,
  class: "fourth-wall-context-popover",
  "aria-label": "上下文用量"
}, We = { class: "fourth-wall-context-total" }, De = ["disabled"], Ve = { key: 2 }, Ue = /* @__PURE__ */ z({
  __name: "FourthWallContextButton",
  props: {
    stats: {},
    busy: { type: Boolean },
    phase: {}
  },
  emits: ["summarize", "cancel"],
  setup(s, { emit: A }) {
    const l = s, i = A, d = q(!1);
    ve(() => (d.value = !1, !0), () => d.value);
    const v = O(() => Math.min(1, l.stats.usedTokens / l.stats.limit)), b = (t) => `${(t / 1e3).toFixed(1)}k`, m = {
      counting: "计算中",
      summarizing: "总结中",
      saving: "保存中",
      replying: "回复中"
    };
    return (t, r) => (c(), y("div", qe, [e("button", {
      type: "button",
      class: se(["fourth-wall-context-ring", { "is-warning": s.stats.usedTokens >= s.stats.trigger }]),
      style: Ee({ "--context-fill": `${v.value * 360}deg` }),
      "aria-label": `上下文：约 ${b(s.stats.usedTokens)} / 158k`,
      "aria-expanded": d.value,
      title: "上下文",
      onClick: r[0] || (r[0] = (n) => d.value = !d.value)
    }, [e("span", null, S(s.busy ? "…" : ""), 1)], 14, Fe), d.value ? (c(), y("section", Be, [
      e("header", null, [r[4] || (r[4] = e("strong", null, "上下文", -1)), e("button", {
        type: "button",
        "aria-label": "关闭上下文用量",
        onClick: r[1] || (r[1] = (n) => d.value = !1)
      }, "×")]),
      e("p", We, "约 " + S(b(s.stats.usedTokens)) + " / 158k", 1),
      e("dl", null, [
        r[5] || (r[5] = e("dt", null, "主剧情", -1)),
        e("dd", null, S(b(s.stats.mainTokens)), 1),
        r[6] || (r[6] = e("dt", null, "皮下记忆", -1)),
        e("dd", null, S(b(s.stats.memoryTokens)), 1),
        r[7] || (r[7] = e("dt", null, "皮下聊天", -1)),
        e("dd", null, S(b(s.stats.historyTokens)), 1),
        r[8] || (r[8] = e("dt", null, "提示词与输入", -1)),
        e("dd", null, S(b(s.stats.promptTokens)), 1)
      ]),
      r[9] || (r[9] = e("p", null, "128k 时在下次回复前自动总结。", -1)),
      s.busy ? (c(), y("button", {
        key: 0,
        type: "button",
        onClick: r[2] || (r[2] = (n) => i("cancel"))
      }, S(s.phase ? m[s.phase] : "处理中") + " · 取消", 1)) : (c(), y("button", {
        key: 1,
        type: "button",
        disabled: !s.stats.canSummarize,
        onClick: r[3] || (r[3] = (n) => {
          i("summarize"), d.value = !1;
        })
      }, "立即总结", 8, De)),
      !s.stats.canSummarize && !s.busy ? (c(), y("small", Ve, "暂无可总结的较早聊天，近期原文会保留。")) : B("", !0)
    ])) : B("", !0)]));
  }
}), Pe = Ue, Ne = ["disabled"], Re = ["disabled"], Oe = {
  key: 0,
  class: "fourth-wall-dialog-error",
  role: "alert"
}, ze = ["disabled"], Le = ["disabled"], He = /* @__PURE__ */ z({
  __name: "FourthWallMemory",
  props: {
    content: {},
    busy: { type: Boolean },
    error: {}
  },
  emits: ["close", "save"],
  setup(s, { emit: A }) {
    const l = s, i = A, d = q(l.content);
    function v() {
      (d.value === l.content || window.confirm("放弃尚未保存的记忆修改？")) && i("close");
    }
    function b() {
      window.confirm("清空皮下记忆？聊天记录会保留，但已总结过的旧消息不会自动再发给模型。") && (d.value = "", i("save", ""));
    }
    return (m, t) => (c(), j(fe, {
      class: "fourth-wall-memory fourth-wall-dialog",
      "aria-label": "皮下记忆",
      busy: s.busy,
      onClose: v
    }, {
      default: ae(() => [
        e("header", null, [t[2] || (t[2] = e("strong", null, "皮下记忆", -1)), e("button", {
          type: "button",
          disabled: s.busy,
          onClick: v
        }, "关闭", 8, Ne)]),
        V(e("textarea", {
          "onUpdate:modelValue": t[0] || (t[0] = (r) => d.value = r),
          "aria-label": "皮下记忆正文",
          disabled: s.busy,
          placeholder: "总结后的皮下人设与长期记忆，也可以直接填写。"
        }, null, 8, Re), [[R, d.value]]),
        s.error ? (c(), y("p", Oe, S(s.error), 1)) : B("", !0),
        e("footer", null, [e("button", {
          type: "button",
          class: "is-danger",
          disabled: s.busy || !s.content,
          onClick: b
        }, "清空记忆", 8, ze), e("button", {
          type: "button",
          class: "is-primary",
          disabled: s.busy,
          onClick: t[1] || (t[1] = (r) => i("save", d.value))
        }, "保存", 8, Le)])
      ]),
      _: 1
    }, 8, ["busy"]));
  }
}), je = He, ce = z({
  name: "FourthWallContent",
  props: { content: {
    type: Object,
    required: !0
  } },
  setup(s, { slots: A }) {
    function l(i) {
      if (i.kind === "text") return i.value;
      if (i.kind === "media") {
        const v = s.content.media[i.index];
        return A.media?.({
          segment: v,
          index: i.index
        }) ?? v.raw;
      }
      const d = ee(i.tag, i.attrs, i.children.map(l));
      return i.tag === "table" ? ee("div", { class: "fourth-wall-table-scroll" }, [d]) : d;
    }
    return () => ee("div", { class: "fourth-wall-markdown" }, s.content.nodes.map(l));
  }
}), Ge = /* @__PURE__ */ new Set([
  "p",
  "br",
  "em",
  "i",
  "strong",
  "b",
  "del",
  "s",
  "u",
  "code",
  "pre",
  "blockquote",
  "ul",
  "ol",
  "li",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hr",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "a"
]), Ke = /* @__PURE__ */ new Set([
  "script",
  "style",
  "custom-style",
  "iframe",
  "object",
  "embed",
  "svg",
  "math"
]);
function be(s, A = globalThis.document) {
  const l = [], i = `XB4W${Array.from(crypto.getRandomValues(new Uint32Array(4))).join("")}MEDIA`, d = s.replace(/\[(?:img|图片)\s*:\s*([^\]]+)\]|\[(?:voice|语音)\s*:([^:\]]*):([^\]]+)\]|\[(?:voice|语音)\s*:\s*([^\]]+)\]/gi, (n, p, x, M, W, F) => {
    let D = 0;
    for (let k = F - 1; k >= 0 && s[k] === "\\"; k--) D++;
    return D % 2 ? n : (l.push(p !== void 0 ? {
      kind: "image",
      raw: n,
      value: p.trim()
    } : {
      kind: "voice",
      raw: n,
      value: String(M ?? W ?? "").trim(),
      emotion: String(x || "").trim().toLowerCase()
    }), `${i}${l.length - 1}END`);
  }), v = new RegExp(`${i}(\\d+)END`, "g"), b = (n) => n.replace(v, (p, x) => l[Number(x)].raw);
  function m(n, p) {
    if (p) return [{
      kind: "text",
      value: b(n)
    }];
    const x = [];
    let M = 0;
    for (const W of n.matchAll(v))
      W.index > M && x.push({
        kind: "text",
        value: n.slice(M, W.index)
      }), x.push({
        kind: "media",
        index: Number(W[1])
      }), M = W.index + W[0].length;
    return M < n.length && x.push({
      kind: "text",
      value: n.slice(M)
    }), x;
  }
  function t(n, p = !1) {
    if (n.nodeType === 3) return m(n.textContent || "", p);
    if (n.nodeType !== 1) return [];
    const x = n, M = x.localName;
    if (Ke.has(M)) return [];
    if (M === "img") return [{
      kind: "text",
      value: b(x.getAttribute("alt") || "")
    }];
    const W = Array.from(x.childNodes).flatMap((D) => t(D, p || [
      "code",
      "pre",
      "a"
    ].includes(M)));
    if (!Ge.has(M)) return W;
    const F = {};
    if (M === "a") {
      const D = b(x.getAttribute("href") || "").trim();
      if (!/^(?:https?:\/\/|mailto:)/i.test(D)) return W;
      F.href = D, F.target = "_blank", F.rel = "noopener noreferrer", x.hasAttribute("title") && (F.title = b(x.getAttribute("title")));
    }
    return M === "ol" && /^\d+$/.test(x.getAttribute("start") || "") && (F.start = x.getAttribute("start")), [{
      kind: "element",
      tag: M,
      attrs: F,
      children: W
    }];
  }
  const r = A.createElement("template");
  return r.innerHTML = xe(d, { htmlFenceMode: "code" }), {
    nodes: Array.from(r.content.childNodes).flatMap((n) => t(n)),
    media: l
  };
}
var Xe = ["data-message-index"], Qe = ["src"], Ye = {
  key: 1,
  class: "fourth-wall-avatar is-placeholder",
  "aria-hidden": "true"
}, Ze = { class: "fourth-wall-message-stack" }, Je = {
  key: 0,
  class: "fourth-wall-thinking"
}, _e = { class: "fourth-wall-bubble" }, et = ["data-image-index"], tt = ["src", "alt"], at = ["onClick"], st = {
  key: 2,
  class: "fourth-wall-image-unavailable"
}, lt = ["disabled", "onClick"], nt = ["onClick"], rt = { "aria-hidden": "true" }, ot = { key: 0 }, it = { class: "fourth-wall-message-actions" }, ut = ["disabled"], dt = ["disabled"], vt = ["disabled"], mt = { key: 1 }, ft = /* @__PURE__ */ z({
  __name: "FourthWallMessage",
  props: {
    message: {},
    messageIndex: {},
    chatIdentity: {},
    sessionId: {},
    userAvatar: {},
    characterAvatar: {},
    imageAvailable: { type: Boolean },
    voiceAvailable: { type: Boolean },
    bridge: {},
    editable: { type: Boolean },
    editDraft: {}
  },
  emits: [
    "edit",
    "delete",
    "draft",
    "editCancel"
  ],
  setup(s, { emit: A }) {
    const l = s, i = A, d = O(() => l.editDraft !== void 0);
    ve(() => (i("editCancel"), !0), () => d.value);
    const v = O({
      get: () => l.editDraft || "",
      set: (w) => i("draft", w)
    }), b = q(null);
    let m = null;
    const t = Z({}), r = /* @__PURE__ */ new Set();
    let n = () => {
    };
    const p = O(() => be(l.message.content)), x = O(() => l.message.ts ? new Intl.DateTimeFormat("zh-CN", {
      hour: "2-digit",
      minute: "2-digit"
    }).format(l.message.ts) : "");
    function M(w, o) {
      return `fw-${w}-${Date.now()}-${l.messageIndex}-${o}-${Math.random().toString(36).slice(2, 7)}`;
    }
    function W(w) {
      return w.result;
    }
    function F(w, o) {
      return r.has(o) && t[w]?.requestId === o;
    }
    async function D(w, o) {
      if (t[o]?.status === "loading" || t[o]?.status === "ready") return;
      if (!l.imageAvailable) {
        t[o] = {
          status: "unavailable",
          message: "请先开启画图功能"
        };
        return;
      }
      const g = M("image", o);
      r.add(g), t[o] = {
        status: "loading",
        message: "正在加载图片",
        requestId: g
      };
      const I = {
        chatIdentity: l.chatIdentity,
        sessionId: l.sessionId
      };
      try {
        const E = W(await l.bridge.request("fourth-wall/image-check", {
          ...I,
          tags: w.value,
          mediaRequestId: g
        }, 3e4));
        if (!F(o, g)) return;
        if (!E.available) {
          t[o] = {
            status: "unavailable",
            message: "请先开启画图功能",
            requestId: g
          };
          return;
        }
        let L = E.cached || "";
        if (!L) {
          t[o] = {
            status: "loading",
            message: "正在生成图片",
            requestId: g
          };
          const J = W(await l.bridge.request("fourth-wall/image-generate", {
            ...I,
            tags: w.value,
            mediaRequestId: g
          }, 18e4));
          if (!F(o, g)) return;
          L = J.base64;
        }
        t[o] = {
          status: "ready",
          source: /^(?:data:|blob:|https?:)/i.test(L) ? L : `data:image/png;base64,${L}`
        };
      } catch (E) {
        F(o, g) && (t[o] = {
          status: "error",
          message: E instanceof Error ? E.message : String(E),
          requestId: g
        });
      } finally {
        r.delete(g);
      }
    }
    async function k(w, o) {
      if (!l.voiceAvailable) {
        t[o] = {
          status: "unavailable",
          message: "请先开启 TTS 语音"
        };
        return;
      }
      const g = t[o];
      if (g?.status === "loading") return;
      if (g?.status === "playing" && g.requestId) {
        l.bridge.post("fourth-wall/voice-stop", {
          chatIdentity: l.chatIdentity,
          mediaRequestId: g.requestId
        }), t[o] = { status: "idle" };
        return;
      }
      const I = M("voice", o);
      r.add(I), t[o] = {
        status: "loading",
        message: "正在准备语音",
        requestId: I
      };
      try {
        await l.bridge.request("fourth-wall/voice-play", {
          chatIdentity: l.chatIdentity,
          sessionId: l.sessionId,
          mediaRequestId: I,
          text: w.value,
          emotion: w.emotion
        });
      } catch (E) {
        F(o, I) && (t[o] = {
          status: "error",
          message: E instanceof Error ? E.message : String(E),
          requestId: I
        }), r.delete(I);
      }
    }
    function f() {
      i("draft", l.message.content);
    }
    function T() {
      const w = v.value.trim();
      w && i("edit", l.messageIndex, w);
    }
    function $() {
      r.forEach((w) => {
        l.bridge.post("fourth-wall/image-cancel", {
          chatIdentity: l.chatIdentity,
          mediaRequestId: w
        }), l.bridge.post("fourth-wall/voice-stop", {
          chatIdentity: l.chatIdentity,
          mediaRequestId: w
        });
      }), r.clear();
    }
    function h() {
      m?.disconnect(), b.value?.querySelectorAll("[data-image-index]").forEach((w) => m?.observe(w));
    }
    return ue(() => {
      n = l.bridge.subscribe((w) => {
        if (w.type === "fourth-wall/image-progress") {
          const o = w.payload, g = Object.keys(t).map(Number).find((I) => t[I]?.requestId === o.mediaRequestId);
          g !== void 0 && (t[g].message = o.status === "queued" ? `图片队列第 ${o.position || 1} 位` : "正在生成图片");
        }
        if (w.type === "fourth-wall/voice-state") {
          const o = w.payload, g = Object.keys(t).map(Number).find((I) => t[I]?.requestId === o.requestId);
          if (g === void 0) return;
          o.state === "playing" && (t[g].status = "playing"), (o.state === "ended" || o.state === "stopped") && (r.delete(String(o.requestId || "")), t[g] = { status: "idle" }), o.state === "error" && (r.delete(String(o.requestId || "")), t[g] = {
            status: "error",
            message: o.message || "语音播放失败"
          });
        }
      }), b.value && typeof IntersectionObserver < "u" && (m = new IntersectionObserver((w) => {
        for (const o of w) {
          if (!o.isIntersecting) continue;
          const g = Number(o.target.dataset.imageIndex), I = p.value.media[g];
          I?.kind === "image" && D(I, g), m?.unobserve(o.target);
        }
      }, { root: b.value.closest(".fourth-wall-conversation") }), h());
    }), G(() => l.message.content, () => {
      $(), Object.keys(t).forEach((w) => delete t[Number(w)]);
    }), G([p, d], h, { flush: "post" }), de(() => {
      n(), m?.disconnect(), $();
    }), (w, o) => (c(), y("article", {
      ref_key: "root",
      ref: b,
      class: se(["fourth-wall-message", s.message.role === "user" ? "is-user" : "is-ai"]),
      "data-message-index": s.messageIndex
    }, [(s.message.role === "user" ? s.userAvatar : s.characterAvatar) ? (c(), y("img", {
      key: 0,
      class: "fourth-wall-avatar",
      src: s.message.role === "user" ? s.userAvatar : s.characterAvatar,
      alt: ""
    }, null, 8, Qe)) : (c(), y("span", Ye)), e("div", Ze, [
      s.message.thinking ? (c(), y("details", Je, [o[3] || (o[3] = e("summary", null, "思考过程", -1)), e("div", null, S(s.message.thinking), 1)])) : B("", !0),
      e("div", _e, [d.value ? V((c(), y("textarea", {
        key: 0,
        "onUpdate:modelValue": o[0] || (o[0] = (g) => v.value = g),
        class: "fourth-wall-edit",
        rows: "3"
      }, null, 512)), [[R, v.value]]) : (c(), j(H(ce), {
        key: 1,
        content: p.value
      }, {
        media: ae(({ segment: g, index: I }) => [g.kind === "image" ? (c(), y("span", {
          key: 0,
          class: "fourth-wall-image-card",
          "data-image-index": I
        }, [t[I]?.status === "ready" ? (c(), y("img", {
          key: 0,
          src: t[I].source,
          alt: g.value
        }, null, 8, tt)) : t[I]?.status === "error" ? (c(), y("button", {
          key: 1,
          type: "button",
          onClick: (E) => D(g, I)
        }, [U(S(g.raw), 1), e("small", null, S(t[I].message) + "，点此重试", 1)], 8, at)) : t[I]?.status === "unavailable" ? (c(), y("span", st, [U(S(g.raw), 1), e("small", null, S(t[I].message), 1)])) : (c(), y("button", {
          key: 3,
          type: "button",
          disabled: t[I]?.status === "loading",
          onClick: (E) => D(g, I)
        }, [U(S(g.raw), 1), e("small", null, S(t[I]?.message || "生成图片"), 1)], 8, lt))], 8, et)) : (c(), y("button", {
          key: 1,
          class: "fourth-wall-voice",
          type: "button",
          onClick: (E) => k(g, I)
        }, [
          e("span", rt, S(t[I]?.status === "playing" ? "■" : "▶"), 1),
          e("span", null, S(g.value), 1),
          t[I]?.message ? (c(), y("small", ot, S(t[I].message), 1)) : B("", !0)
        ], 8, nt))]),
        _: 1
      }, 8, ["content"])), e("div", it, [d.value ? (c(), y(X, { key: 0 }, [e("button", {
        type: "button",
        disabled: !s.editable,
        onClick: T
      }, "保存", 8, ut), e("button", {
        type: "button",
        onClick: o[1] || (o[1] = (g) => i("editCancel"))
      }, "取消")], 64)) : (c(), y(X, { key: 1 }, [e("button", {
        type: "button",
        disabled: !s.editable,
        onClick: f
      }, "编辑", 8, dt), e("button", {
        type: "button",
        disabled: !s.editable,
        onClick: o[2] || (o[2] = (g) => i("delete", s.messageIndex))
      }, "删除", 8, vt)], 64))])]),
      x.value ? (c(), y("time", mt, S(x.value), 1)) : B("", !0)
    ])], 10, Xe));
  }
}), ct = ft, bt = ["disabled"], gt = {
  key: 1,
  class: "fourth-wall-empty"
}, yt = ["disabled"], pt = {
  key: 3,
  class: "fourth-wall-message is-ai is-streaming",
  role: "status"
}, ht = ["src"], kt = {
  key: 1,
  class: "fourth-wall-avatar is-placeholder"
}, wt = { class: "fourth-wall-message-stack" }, $t = {
  key: 0,
  class: "fourth-wall-thinking",
  open: ""
}, Ct = { class: "fourth-wall-bubble" }, It = {
  key: 2,
  class: "fourth-wall-unsaved"
}, St = ["disabled"], xt = /* @__PURE__ */ z({
  __name: "FourthWallConversation",
  props: {
    page: {},
    busy: { type: Boolean },
    sessionId: {},
    chatIdentity: {},
    userAvatar: {},
    characterAvatar: {},
    imageAvailable: { type: Boolean },
    voiceAvailable: { type: Boolean },
    generation: {},
    bridge: {}
  },
  emits: [
    "edit",
    "delete",
    "error"
  ],
  setup(s, { emit: A }) {
    const l = s, i = A, d = q(null), v = q(l.page), b = O(() => be(l.generation.text || "")), m = q(!1), t = q(!0), r = q(null);
    let n = 0;
    const p = {
      counting: "正在计算上下文…",
      summarizing: "正在整理皮下记忆…",
      saving: "正在保存…",
      replying: "等待回应…"
    };
    function x() {
      const k = d.value;
      if (!k) return null;
      const f = k.getBoundingClientRect().top, T = Array.from(k.querySelectorAll("[data-message-index]")).find(($) => $.getBoundingClientRect().bottom > f);
      return T ? {
        index: T.dataset.messageIndex,
        offset: T.getBoundingClientRect().top - f
      } : null;
    }
    async function M(k, f = !1) {
      const T = x();
      if (r.value && k.sessionId === v.value.sessionId) {
        const h = k.messages[r.value.index - k.start];
        h?.ts === r.value.ts && h.content === r.value.content.trim() ? r.value = null : h?.ts === r.value.ts && h.content === r.value.original ? r.value.revision = k.revision : h && (i("error", `正在编辑的消息已变化，未保存的草稿：${r.value.content}`), r.value = null);
      }
      v.value = k, await oe();
      const $ = d.value;
      if ($) {
        if (f) {
          $.scrollTop = $.scrollHeight, t.value = !0;
          return;
        }
        if (T) {
          const h = $.querySelector('[data-message-index="' + T.index + '"]');
          h && ($.scrollTop += h.getBoundingClientRect().top - $.getBoundingClientRect().top - T.offset);
        }
      }
    }
    function W() {
      const k = d.value;
      k && (t.value = v.value.start + v.value.messages.length === v.value.total && k.scrollHeight - k.clientHeight - k.scrollTop < 48);
    }
    async function F(k) {
      if (m.value) return;
      const f = ++n;
      m.value = !0;
      const T = l.sessionId;
      try {
        const $ = await l.bridge.request("fourth-wall/history-page", {
          chatIdentity: l.chatIdentity,
          sessionId: T,
          direction: k,
          revision: v.value.revision
        });
        if (f !== n || T !== l.sessionId) return;
        k !== "latest" && (t.value = !1);
        const h = $.result;
        if (k === "earlier") h.messages = [...h.messages, ...v.value.messages].slice(0, 60);
        else if (k === "later") {
          const w = [...v.value.messages, ...h.messages];
          h.start = v.value.start + Math.max(0, w.length - 60), h.messages = w.slice(-60);
        }
        await M(h, k === "latest");
      } catch ($) {
        f === n && i("error", $ instanceof Error ? $.message : String($));
      } finally {
        f === n && (m.value = !1);
      }
    }
    function D(k, f) {
      const T = v.value.messages[k - v.value.start];
      T && (r.value?.index === k ? r.value.content = f : r.value = {
        index: k,
        content: f,
        original: T.content,
        ts: T.ts,
        revision: v.value.revision
      });
    }
    return G(() => l.page, (k) => {
      n++, m.value = !1, M(k, k.sessionId !== v.value.sessionId || t.value);
    }, { immediate: !0 }), G(() => l.sessionId, () => {
      r.value = null, t.value = !0;
    }), G(() => l.generation.text, async () => {
      t.value && (await oe(), d.value && (d.value.scrollTop = d.value.scrollHeight));
    }), (k, f) => (c(), y("section", {
      ref_key: "viewport",
      ref: d,
      class: "fourth-wall-conversation",
      "aria-live": "polite",
      onScrollPassive: W
    }, [
      v.value.start > 0 ? (c(), y("button", {
        key: 0,
        type: "button",
        class: "fourth-wall-earlier",
        disabled: m.value,
        onClick: f[0] || (f[0] = (T) => F("earlier"))
      }, S(m.value ? "读取中…" : "查看更早的记录"), 9, bt)) : B("", !0),
      v.value.total === 0 && s.generation.status === "idle" ? (c(), y("div", gt, [...f[6] || (f[6] = [
        e("span", null, "IV", -1),
        e("strong", null, "越过故事边界", -1),
        e("p", null, "这里是你与角色扮演者的皮下私聊。", -1)
      ])])) : B("", !0),
      (c(!0), y(X, null, ie(v.value.messages, (T, $) => (c(), j(ct, {
        key: T.ts + "-" + (v.value.start + $),
        message: T,
        "message-index": v.value.start + $,
        "chat-identity": s.chatIdentity,
        "session-id": s.sessionId,
        "user-avatar": s.userAvatar,
        "character-avatar": s.characterAvatar,
        "image-available": s.imageAvailable,
        "voice-available": s.voiceAvailable,
        bridge: s.bridge,
        editable: !s.busy,
        "edit-draft": r.value?.index === v.value.start + $ && r.value.ts === T.ts ? r.value.content : void 0,
        onDraft: (h) => D(v.value.start + $, h),
        onEditCancel: f[1] || (f[1] = (h) => r.value = null),
        onEdit: f[2] || (f[2] = (h, w) => i("edit", h, w, r.value?.revision ?? v.value.revision)),
        onDelete: f[3] || (f[3] = (h) => i("delete", h))
      }, null, 8, [
        "message",
        "message-index",
        "chat-identity",
        "session-id",
        "user-avatar",
        "character-avatar",
        "image-available",
        "voice-available",
        "bridge",
        "editable",
        "edit-draft",
        "onDraft"
      ]))), 128)),
      v.value.start + v.value.messages.length < v.value.total ? (c(), y("button", {
        key: 2,
        type: "button",
        class: "fourth-wall-earlier",
        disabled: m.value,
        onClick: f[4] || (f[4] = (T) => F("later"))
      }, " 查看后面的记录 ", 8, yt)) : B("", !0),
      s.generation.status !== "idle" && t.value ? (c(), y("article", pt, [s.characterAvatar ? (c(), y("img", {
        key: 0,
        class: "fourth-wall-avatar",
        src: s.characterAvatar,
        alt: ""
      }, null, 8, ht)) : (c(), y("span", kt)), e("div", wt, [s.generation.thinking ? (c(), y("details", $t, [f[7] || (f[7] = e("summary", null, "思考中", -1)), e("div", null, S(s.generation.thinking), 1)])) : B("", !0), e("div", Ct, [s.generation.text ? (c(), j(H(ce), {
        key: 0,
        content: b.value
      }, null, 8, ["content"])) : (c(), y(X, { key: 1 }, [U(S(s.generation.status === "error" ? s.generation.message : p[s.generation.phase || "replying"]), 1)], 64)), s.generation.unsaved ? (c(), y("small", It, "未保存")) : B("", !0)])])])) : B("", !0),
      t.value ? B("", !0) : (c(), y("button", {
        key: 4,
        type: "button",
        class: "fourth-wall-latest",
        disabled: m.value,
        onClick: f[5] || (f[5] = (T) => F("latest"))
      }, "回到最新 ↓", 8, St))
    ], 544));
  }
}), At = xt, Tt = {
  class: "fourth-wall-modal",
  role: "dialog",
  "aria-label": "四次元壁提示词"
}, Mt = { class: "fourth-wall-prompt-fields" }, Et = /* @__PURE__ */ z({
  __name: "FourthWallPromptEditor",
  props: { templates: {} },
  emits: [
    "close",
    "save",
    "restore"
  ],
  setup(s, { emit: A }) {
    const l = s, i = A, d = Z(structuredClone(N(l.templates))), v = q(null);
    me(v, () => i("close"));
    function b() {
      i("save", structuredClone(N(d)));
    }
    return (m, t) => (c(), y("div", {
      ref_key: "layer",
      ref: v,
      class: "fourth-wall-modal-backdrop",
      onClick: t[6] || (t[6] = Me((r) => i("close"), ["self"]))
    }, [e("section", Tt, [
      e("header", null, [t[7] || (t[7] = e("strong", null, "提示词模板", -1)), e("button", {
        type: "button",
        onClick: t[0] || (t[0] = (r) => i("close"))
      }, "关闭")]),
      e("div", Mt, [
        e("label", null, [t[8] || (t[8] = U("Top User", -1)), V(e("textarea", {
          "onUpdate:modelValue": t[1] || (t[1] = (r) => d.topuser = r),
          rows: "5"
        }, null, 512), [[R, d.topuser]])]),
        e("label", null, [t[9] || (t[9] = U("Confirm", -1)), V(e("textarea", {
          "onUpdate:modelValue": t[2] || (t[2] = (r) => d.confirm = r),
          rows: "3"
        }, null, 512), [[R, d.confirm]])]),
        e("label", null, [t[10] || (t[10] = U("Meta Protocol", -1)), V(e("textarea", {
          "onUpdate:modelValue": t[3] || (t[3] = (r) => d.metaProtocol = r),
          rows: "12"
        }, null, 512), [[R, d.metaProtocol]])]),
        e("label", null, [t[11] || (t[11] = U("Bottom", -1)), V(e("textarea", {
          "onUpdate:modelValue": t[4] || (t[4] = (r) => d.bottom = r),
          rows: "5"
        }, null, 512), [[R, d.bottom]])])
      ]),
      e("footer", null, [e("button", {
        type: "button",
        class: "is-danger",
        onClick: t[5] || (t[5] = (r) => i("restore"))
      }, "恢复默认"), e("button", {
        type: "button",
        class: "is-primary",
        onClick: b
      }, "保存")])
    ])], 512));
  }
}), qt = Et, P = Object.freeze({
  title: "聊天记录",
  add: "新建记录",
  newName: "新记录",
  namePrompt: "新记录名称",
  rename: "重命名",
  renamePrompt: "重命名记录",
  remove: "删除记录",
  removePrompt: "确定删除当前记录及其皮下记忆吗？"
}), Ft = ["aria-label"], Bt = [
  "disabled",
  "aria-label",
  "title"
], Wt = { class: "fourth-wall-session-list" }, Dt = [
  "disabled",
  "aria-current",
  "onClick"
], Vt = { class: "fourth-wall-session-actions" }, Ut = ["disabled"], Pt = ["disabled"], Nt = /* @__PURE__ */ z({
  __name: "FourthWallSessions",
  props: {
    sessions: {},
    activeSessionId: {},
    disabled: { type: Boolean }
  },
  emits: [
    "switch",
    "add",
    "rename",
    "delete"
  ],
  setup(s, { emit: A }) {
    const l = A;
    function i() {
      const b = window.prompt(P.namePrompt, P.newName)?.trim();
      b && l("add", b);
    }
    function d(b, m) {
      const t = window.prompt(P.renamePrompt, m)?.trim();
      t && l("rename", b, t);
    }
    function v(b) {
      window.confirm(P.removePrompt) && l("delete", b);
    }
    return (b, m) => (c(), y("section", {
      class: "fourth-wall-settings-section fourth-wall-sessions",
      "aria-label": H(P).title
    }, [
      e("header", null, [e("h3", null, S(H(P).title), 1), e("button", {
        type: "button",
        disabled: s.disabled,
        "aria-label": H(P).add,
        title: H(P).add,
        onClick: i
      }, "＋", 8, Bt)]),
      e("div", Wt, [(c(!0), y(X, null, ie(s.sessions, (t) => (c(), y("button", {
        key: t.id,
        type: "button",
        disabled: s.disabled,
        "aria-current": t.id === s.activeSessionId ? "true" : void 0,
        onClick: (r) => t.id !== s.activeSessionId && l("switch", t.id)
      }, S(t.name), 9, Dt))), 128))]),
      e("div", Vt, [e("button", {
        type: "button",
        disabled: s.disabled,
        onClick: m[0] || (m[0] = (t) => d(s.activeSessionId, s.sessions.find((r) => r.id === s.activeSessionId).name))
      }, S(H(P).rename), 9, Ut), e("button", {
        type: "button",
        disabled: s.disabled || s.sessions.length <= 1,
        class: "is-danger",
        onClick: m[1] || (m[1] = (t) => v(s.activeSessionId))
      }, S(H(P).remove), 9, Pt)])
    ], 8, Ft));
  }
}), ge = Nt, Rt = { class: "fourth-wall-settings-scroll" }, Ot = { class: "fourth-wall-settings-section" }, zt = { class: "is-toggle" }, Lt = ["disabled"], Ht = { class: "fourth-wall-settings-section" }, jt = { class: "is-toggle" }, Gt = { class: "is-toggle" }, Kt = { class: "is-toggle" }, Xt = { key: 0 }, Qt = ["disabled"], Yt = { class: "fourth-wall-settings-section is-actions" }, Zt = /* @__PURE__ */ z({
  __name: "FourthWallSettings",
  props: {
    chat: {},
    global: {},
    busy: { type: Boolean }
  },
  emits: [
    "close",
    "updateChat",
    "updateGlobal",
    "switchSession",
    "addSession",
    "renameSession",
    "deleteSession",
    "openPrompts"
  ],
  setup(s, { emit: A }) {
    const l = s, i = A, d = Z(structuredClone(N(l.chat.settings))), v = q(null);
    me(v, () => i("close"));
    const b = Z(structuredClone(N(l.global)));
    function m() {
      i("updateChat", structuredClone(N(d)));
    }
    function t() {
      i("updateGlobal", {
        image: structuredClone(N(b.image)),
        voice: structuredClone(N(b.voice)),
        commentary: structuredClone(N(b.commentary))
      });
    }
    return (r, n) => (c(), y("aside", {
      ref_key: "layer",
      ref: v,
      class: "fourth-wall-settings",
      "aria-label": "四次元壁设置"
    }, [e("header", null, [n[12] || (n[12] = e("strong", null, "四次元壁设置", -1)), e("button", {
      type: "button",
      onClick: n[0] || (n[0] = (p) => i("close"))
    }, "关闭")]), e("div", Rt, [
      Y(ge, {
        sessions: s.chat.sessions,
        "active-session-id": s.chat.activeSessionId,
        disabled: s.busy,
        onSwitch: n[1] || (n[1] = (p) => i("switchSession", p)),
        onAdd: n[2] || (n[2] = (p) => i("addSession", p)),
        onRename: n[3] || (n[3] = (p, x) => i("renameSession", p, x)),
        onDelete: n[4] || (n[4] = (p) => i("deleteSession", p))
      }, null, 8, [
        "sessions",
        "active-session-id",
        "disabled"
      ]),
      e("section", Ot, [
        n[15] || (n[15] = e("h3", null, "上下文", -1)),
        e("label", null, [n[13] || (n[13] = U("带入的主聊天楼层数", -1)), V(e("input", {
          "onUpdate:modelValue": n[5] || (n[5] = (p) => d.maxChatLayers = p),
          type: "number",
          min: "1",
          max: "9999"
        }, null, 512), [[
          R,
          d.maxChatLayers,
          void 0,
          { number: !0 }
        ]])]),
        e("label", zt, [n[14] || (n[14] = e("span", null, "流式生成", -1)), V(e("input", {
          "onUpdate:modelValue": n[6] || (n[6] = (p) => d.stream = p),
          type: "checkbox"
        }, null, 512), [[K, d.stream]])]),
        e("button", {
          type: "button",
          class: "is-primary",
          disabled: s.busy,
          onClick: m
        }, "保存上下文设置", 8, Lt)
      ]),
      e("section", Ht, [
        n[19] || (n[19] = e("h3", null, "回复方式", -1)),
        e("label", jt, [n[16] || (n[16] = e("span", null, "允许对方发图片", -1)), V(e("input", {
          "onUpdate:modelValue": n[7] || (n[7] = (p) => b.image.enablePrompt = p),
          type: "checkbox"
        }, null, 512), [[K, b.image.enablePrompt]])]),
        e("label", Gt, [n[17] || (n[17] = e("span", null, "允许对方发语音", -1)), V(e("input", {
          "onUpdate:modelValue": n[8] || (n[8] = (p) => b.voice.enabled = p),
          type: "checkbox"
        }, null, 512), [[K, b.voice.enabled]])]),
        e("label", Kt, [n[18] || (n[18] = e("span", null, "实时吐槽", -1)), V(e("input", {
          "onUpdate:modelValue": n[9] || (n[9] = (p) => b.commentary.enabled = p),
          type: "checkbox"
        }, null, 512), [[K, b.commentary.enabled]])]),
        b.commentary.enabled ? (c(), y("label", Xt, [U(" 吐槽概率 " + S(b.commentary.probability) + "% ", 1), V(e("input", {
          "onUpdate:modelValue": n[10] || (n[10] = (p) => b.commentary.probability = p),
          type: "range",
          min: "1",
          max: "99"
        }, null, 512), [[
          R,
          b.commentary.probability,
          void 0,
          { number: !0 }
        ]])])) : B("", !0),
        e("button", {
          type: "button",
          class: "is-primary",
          disabled: s.busy,
          onClick: t
        }, "保存设置", 8, Qt)
      ]),
      e("section", Yt, [e("button", {
        type: "button",
        onClick: n[11] || (n[11] = (p) => i("openPrompts"))
      }, "提示词模板")])
    ])], 512));
  }
}), Jt = Zt, _t = { class: "fourth-wall-app" }, ea = { class: "fourth-wall-sidebar" }, ta = { class: "fourth-wall-header" }, aa = { class: "fourth-wall-heading" }, sa = { class: "fourth-wall-header-actions" }, la = ["disabled"], na = ["disabled"], ra = {
  key: 0,
  class: "fourth-wall-error",
  role: "alert"
}, oa = ["disabled"], ia = { class: "fourth-wall-composer" }, ua = ["disabled"], da = ["disabled"], va = ["disabled"], ma = { class: "fourth-wall-clear-choice" }, fa = {
  key: 0,
  class: "fourth-wall-dialog-error",
  role: "alert"
}, ca = ["disabled"], ba = ["disabled"], Q = 35e3, ga = /* @__PURE__ */ z({
  __name: "FourthWallApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(s) {
    const A = s, l = q(structuredClone(N(A.initialState))), i = q(""), d = /* @__PURE__ */ new Map(), v = q(!1), b = q(!1), m = q(!1), t = q(""), r = q(!1), n = q(!1), p = q(!1), x = q(!1), M = q(""), W = q(0), F = q(!1), D = q(0);
    let k;
    const f = q({
      status: "idle",
      sessionId: "",
      text: "",
      thinking: "",
      message: "",
      unsaved: !1
    });
    let T = () => {
    };
    const $ = O(() => l.value.chat.sessions.find((u) => u.id === l.value.chat.activeSessionId)), h = O(() => f.value.status === "started" || f.value.status === "progress"), w = O(() => ({
      ...l.value.context,
      usedTokens: l.value.context.usedTokens + D.value,
      promptTokens: l.value.context.promptTokens + D.value
    }));
    G(() => [i.value, f.value.text], () => {
      k || (k = setTimeout(() => {
        D.value = te(i.value) + te(f.value.text), k = void 0;
      }, 200));
    }), G(() => $.value.id, (u, a) => {
      d.set(a, i.value), x.value = !1, n.value = !1, F.value = !1, i.value = d.get(u) ?? "", f.value = {
        status: "idle",
        sessionId: "",
        text: "",
        thinking: "",
        message: "",
        unsaved: !1
      };
      for (const C of d.keys()) l.value.chat.sessions.some((Se) => Se.id === C) || d.delete(C);
    });
    function o(u = $.value.id) {
      return {
        chatIdentity: l.value.chatIdentity,
        sessionId: u
      };
    }
    const g = {
      switch: (u) => E("fourth-wall/switch-session", {
        ...o(),
        targetSessionId: u
      }),
      add: (u) => E("fourth-wall/add-session", {
        ...o(),
        name: u
      }),
      rename: (u, a) => E("fourth-wall/rename-session", {
        ...o(u),
        name: a
      }),
      delete: (u) => E("fourth-wall/delete-session", o(u))
    };
    function I(u) {
      return structuredClone(u.result);
    }
    async function E(u, a) {
      m.value = !0, t.value = "";
      try {
        return l.value = I(await A.bridge.request(u, a, Q)), !0;
      } catch (C) {
        return t.value = C instanceof Error ? C.message : String(C), !1;
      } finally {
        m.value = !1;
      }
    }
    async function L() {
      const u = i.value.trim();
      if (!(!u || h.value || m.value)) {
        i.value = "", t.value = "", F.value = !1, f.value = {
          status: "started",
          sessionId: $.value.id,
          text: "",
          thinking: "",
          message: "",
          unsaved: !1
        };
        try {
          await A.bridge.request("fourth-wall/send", {
            ...o(),
            content: u
          }, Q);
        } catch (a) {
          t.value = `还不确定是否发送成功：${a instanceof Error ? a.message : String(a)}。请核对聊天记录后再发送。原输入：${u}`, f.value.status = "idle";
        }
      }
    }
    async function J() {
      if (!(h.value || m.value)) {
        t.value = "", F.value = !1, f.value = {
          status: "started",
          sessionId: $.value.id,
          text: "",
          thinking: "",
          message: "",
          unsaved: !1
        };
        try {
          await A.bridge.request("fourth-wall/regenerate", o(), Q);
        } catch (u) {
          t.value = u instanceof Error ? u.message : String(u), f.value.status = "idle";
        }
      }
    }
    function _() {
      A.bridge.post("fourth-wall/cancel", o());
    }
    function le(u) {
      u && (i.value ? t.value += `
未保存的原输入：${u}` : i.value = u);
    }
    function ye(u) {
      u.key !== "Enter" || u.shiftKey || r.value || (u.preventDefault(), h.value ? _() : L());
    }
    function pe(u) {
      const a = u < $.value.archivedCount ? `这条消息已记入皮下记忆；删除消息不会让对方忘记，需要遗忘的内容请到皮下记忆中删除。
` : "";
      window.confirm(`${a}确定删除这条消息吗？`) && E("fourth-wall/delete-message", {
        ...o(),
        revision: l.value.history.revision,
        messageIndex: u
      });
    }
    function he() {
      p.value = !1, n.value = !0;
    }
    async function ke() {
      await E("fourth-wall/clear-history", {
        ...o(),
        clearMemory: p.value
      }) && (n.value = !1);
    }
    async function we(u, a, C) {
      u < $.value.archivedCount && !window.confirm("这条消息已记入皮下记忆，修改消息不会同时修改记忆；需要更正时请另行编辑皮下记忆。继续修改？") || await E("fourth-wall/edit-message", {
        ...o(),
        revision: C,
        messageIndex: u,
        content: a
      });
    }
    async function ne(u) {
      if (!(h.value || m.value)) {
        t.value = "", F.value = !1, f.value = {
          status: "started",
          sessionId: $.value.id,
          text: "",
          thinking: "",
          message: "",
          unsaved: !1,
          phase: "counting",
          manual: u === "summarize"
        };
        try {
          await A.bridge.request(`fourth-wall/${u}`, o(), Q);
        } catch (a) {
          f.value.status = "idle", t.value = String(a instanceof Error ? a.message : a);
        }
      }
    }
    async function $e() {
      if (m.value || h.value) return;
      m.value = !0, t.value = "";
      const u = o(), a = l.value.history.revision;
      try {
        const C = await A.bridge.request("fourth-wall/read-memory", {
          ...u,
          revision: a
        });
        if (u.sessionId !== $.value.id || u.chatIdentity !== l.value.chatIdentity) return;
        M.value = C.result.content, W.value = a, x.value = !0;
      } catch (C) {
        t.value = C instanceof Error ? C.message : String(C);
      } finally {
        m.value = !1;
      }
    }
    async function Ce(u) {
      await E("fourth-wall/save-memory", {
        ...o(),
        revision: W.value,
        expectedContent: M.value,
        content: u
      }) && (x.value = !1);
    }
    function Ie(u) {
      E("fourth-wall/update-chat-settings", {
        ...o(),
        patch: u
      });
    }
    function re(u) {
      E("fourth-wall/update-global-settings", {
        ...o(),
        patch: u
      });
    }
    return ue(() => {
      T = A.bridge.subscribe((u) => {
        if (u.type === "fourth-wall/state" && (l.value = structuredClone(u.payload.state)), u.type !== "fourth-wall/generation") return;
        const a = u.payload;
        if (!(a.sessionId && a.sessionId !== $.value.id)) {
          if (a.status === "complete" || a.status === "cancelled") {
            a.status === "cancelled" && (a.message && (t.value = a.message), le(a.inputDraft)), D.value = te(i.value), f.value = {
              status: "idle",
              sessionId: "",
              text: "",
              thinking: "",
              message: "",
              unsaved: !1
            };
            return;
          }
          if (a.status === "error") {
            t.value = a.message || "生成失败", F.value = !a.manual && a.kind !== "save" && a.kind !== "input-save", le(a.inputDraft), f.value = a.kind === "save" && (a.draft?.text || a.draft?.thinking) ? {
              status: "error",
              sessionId: a.sessionId || $.value.id,
              text: a.draft?.text || "",
              thinking: a.draft?.thinking || "",
              message: "",
              unsaved: !0
            } : {
              status: "idle",
              sessionId: "",
              text: "",
              thinking: "",
              message: "",
              unsaved: !1
            };
            return;
          }
          f.value = {
            status: a.status || "progress",
            sessionId: a.sessionId || $.value.id,
            text: a.text || f.value.text,
            thinking: a.thinking || f.value.thinking,
            message: "",
            unsaved: !1,
            phase: a.phase || f.value.phase,
            manual: a.manual ?? f.value.manual
          };
        }
      });
    }), de(() => {
      T(), clearTimeout(k);
    }), (u, a) => (c(), y("main", _t, [
      e("aside", ea, [Y(ge, Te({
        sessions: l.value.chat.sessions,
        "active-session-id": $.value.id,
        disabled: m.value || h.value
      }, Ae(g)), null, 16, [
        "sessions",
        "active-session-id",
        "disabled"
      ])]),
      e("header", ta, [e("div", aa, [a[19] || (a[19] = e("span", null, "IV", -1)), e("div", null, [a[18] || (a[18] = e("strong", null, "四次元壁", -1)), e("small", null, S($.value.name), 1)])]), e("div", sa, [
        Y(Pe, {
          stats: w.value,
          busy: h.value,
          phase: f.value.phase,
          onSummarize: a[0] || (a[0] = (C) => ne("summarize")),
          onCancel: _
        }, null, 8, [
          "stats",
          "busy",
          "phase"
        ]),
        e("button", {
          type: "button",
          title: "皮下记忆",
          "aria-label": "皮下记忆",
          disabled: m.value || h.value,
          onClick: $e
        }, [...a[20] || (a[20] = [e("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [e("path", { d: "M12 5c-3-2-7-2-9-1v15c3-1 6-1 9 1m0-15c3-2 7-2 9-1v15c-3-1-6-1-9 1V5Z" })], -1)])], 8, la),
        e("button", {
          type: "button",
          title: "清空当前记录",
          "aria-label": "清空当前记录",
          disabled: m.value,
          onClick: he
        }, [...a[21] || (a[21] = [e("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [e("path", { d: "M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7m4 4v5m4-5v5" })], -1)])], 8, na),
        e("button", {
          type: "button",
          title: "设置",
          onClick: a[1] || (a[1] = (C) => v.value = !0)
        }, "⚙")
      ])]),
      t.value ? (c(), y("div", ra, [
        e("span", null, S(t.value), 1),
        F.value ? (c(), y("button", {
          key: 0,
          type: "button",
          disabled: h.value || m.value,
          onClick: a[2] || (a[2] = (C) => ne("retry"))
        }, "重试回复", 8, oa)) : B("", !0),
        e("button", {
          type: "button",
          "aria-label": "关闭错误提示",
          onClick: a[3] || (a[3] = (C) => t.value = "")
        }, "×")
      ])) : B("", !0),
      Y(At, {
        page: l.value.history,
        busy: m.value || h.value,
        "session-id": $.value.id,
        "chat-identity": l.value.chatIdentity,
        "user-avatar": l.value.userAvatar,
        "character-avatar": l.value.characterAvatar,
        "image-available": l.value.capabilities.image.available,
        "voice-available": l.value.capabilities.voice.available,
        generation: f.value,
        bridge: s.bridge,
        onEdit: we,
        onDelete: pe,
        onError: a[4] || (a[4] = (C) => t.value = C)
      }, null, 8, [
        "page",
        "busy",
        "session-id",
        "chat-identity",
        "user-avatar",
        "character-avatar",
        "image-available",
        "voice-available",
        "generation",
        "bridge"
      ]),
      e("footer", ia, [
        e("button", {
          type: "button",
          class: "fourth-wall-regenerate",
          title: "重答",
          "aria-label": "重答",
          disabled: m.value || h.value,
          onClick: J
        }, " ↻ ", 8, ua),
        V(e("textarea", {
          "onUpdate:modelValue": a[5] || (a[5] = (C) => i.value = C),
          rows: "1",
          placeholder: "聊点什么...",
          disabled: m.value,
          onCompositionstart: a[6] || (a[6] = (C) => r.value = !0),
          onCompositionend: a[7] || (a[7] = (C) => r.value = !1),
          onKeydown: ye
        }, null, 40, da), [[R, i.value]]),
        e("button", {
          type: "button",
          class: se({ "is-stop": h.value }),
          disabled: m.value,
          onClick: a[8] || (a[8] = (C) => h.value ? _() : L())
        }, S(h.value ? "■" : "↑"), 11, va)
      ]),
      v.value ? (c(), j(Jt, {
        key: 1,
        chat: l.value.chat,
        global: l.value.global,
        busy: m.value || h.value,
        onClose: a[9] || (a[9] = (C) => v.value = !1),
        onUpdateChat: Ie,
        onUpdateGlobal: re,
        onSwitchSession: g.switch,
        onAddSession: g.add,
        onRenameSession: g.rename,
        onDeleteSession: g.delete,
        onOpenPrompts: a[10] || (a[10] = (C) => b.value = !0)
      }, null, 8, [
        "chat",
        "global",
        "busy",
        "onSwitchSession",
        "onAddSession",
        "onRenameSession",
        "onDeleteSession"
      ])) : B("", !0),
      b.value ? (c(), j(qt, {
        key: 2,
        templates: l.value.global.promptTemplates,
        onClose: a[11] || (a[11] = (C) => b.value = !1),
        onSave: a[12] || (a[12] = (C) => {
          re({ promptTemplates: C }), b.value = !1;
        }),
        onRestore: a[13] || (a[13] = () => {
          E("fourth-wall/restore-prompts", o()), b.value = !1;
        })
      }, null, 8, ["templates"])) : B("", !0),
      x.value ? (c(), j(je, {
        key: 3,
        content: M.value,
        busy: m.value,
        error: t.value,
        onClose: a[14] || (a[14] = (C) => x.value = !1),
        onSave: Ce
      }, null, 8, [
        "content",
        "busy",
        "error"
      ])) : B("", !0),
      n.value ? (c(), j(fe, {
        key: 4,
        class: "fourth-wall-dialog",
        "aria-label": "清空皮下聊天",
        busy: m.value,
        onClose: a[17] || (a[17] = (C) => n.value = !1)
      }, {
        default: ae(() => [
          a[23] || (a[23] = e("header", null, [e("strong", null, "清空皮下聊天？")], -1)),
          a[24] || (a[24] = e("p", null, "当前聊天原文将被删除，默认保留皮下记忆。", -1)),
          e("label", ma, [V(e("input", {
            "onUpdate:modelValue": a[15] || (a[15] = (C) => p.value = C),
            type: "checkbox"
          }, null, 512), [[K, p.value]]), a[22] || (a[22] = U("同时清空皮下记忆", -1))]),
          t.value ? (c(), y("p", fa, S(t.value), 1)) : B("", !0),
          e("footer", null, [e("button", {
            type: "button",
            disabled: m.value,
            onClick: a[16] || (a[16] = (C) => n.value = !1)
          }, "取消", 8, ca), e("button", {
            type: "button",
            class: "is-danger",
            disabled: m.value,
            onClick: ke
          }, "清空聊天", 8, ba)])
        ]),
        _: 1
      }, 8, ["busy"])) : B("", !0)
    ]));
  }
}), $a = ga;
export {
  $a as default
};
