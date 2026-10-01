/* eslint-disable */
import { n as xe } from "./xiaobai-os-message-markdown-p_WvGylV.js";
import { B as Ae, E as ue, F as b, G as ae, K as P, L as de, M as se, O as le, Q as O, S as ee, T as Te, U as X, X as T, Y as _, _ as p, b as J, et as j, g as q, h as G, i as Q, l as Me, m as e, nt as Ee, o as z, p as R, rt as C, tt as ne, u as Y, x as L, y as U } from "./xiaobai-os-runtime-dom.esm-bundler-BeaorYpU.js";
import { i as ve, r as me } from "./xiaobai-os-app-navigation-C25euSGK.js";
import { t as te } from "./xiaobai-os-context-tokens-bfmDTbG3.js";
import { t as fe } from "./xiaobai-os-AppDialog-B3ZziTBo.js";
var qe = { class: "fourth-wall-context" }, Fe = ["aria-label", "aria-expanded"], We = {
  key: 0,
  class: "fourth-wall-context-popover",
  "aria-label": "上下文用量"
}, Be = { class: "fourth-wall-context-total" }, De = ["disabled"], Ve = { key: 2 }, Pe = /* @__PURE__ */ L({
  __name: "FourthWallContextButton",
  props: {
    stats: {},
    busy: { type: Boolean },
    phase: {}
  },
  emits: ["summarize", "cancel"],
  setup(s, { emit: S }) {
    const r = s, u = S, m = T(!1);
    me(() => (m.value = !1, !0), () => m.value);
    const y = R(() => Math.min(1, r.stats.usedTokens / r.stats.limit)), g = (t) => `${(t / 1e3).toFixed(1)}k`, c = {
      counting: "计算中",
      summarizing: "总结中",
      saving: "保存中",
      replying: "回复中"
    };
    return (t, d) => (b(), p("div", qe, [e("button", {
      type: "button",
      class: ne(["fourth-wall-context-ring", { "is-warning": s.stats.usedTokens >= s.stats.trigger }]),
      style: Ee({ "--context-fill": `${y.value * 360}deg` }),
      "aria-label": `上下文：约 ${g(s.stats.usedTokens)} / 158k`,
      "aria-expanded": m.value,
      title: "上下文",
      onClick: d[0] || (d[0] = (l) => m.value = !m.value)
    }, [e("span", null, C(s.busy ? "…" : ""), 1)], 14, Fe), m.value ? (b(), p("section", We, [
      e("header", null, [d[4] || (d[4] = e("strong", null, "上下文", -1)), e("button", {
        type: "button",
        "aria-label": "关闭上下文用量",
        onClick: d[1] || (d[1] = (l) => m.value = !1)
      }, "×")]),
      e("p", Be, "约 " + C(g(s.stats.usedTokens)) + " / 158k", 1),
      e("dl", null, [
        d[5] || (d[5] = e("dt", null, "主剧情", -1)),
        e("dd", null, C(g(s.stats.mainTokens)), 1),
        d[6] || (d[6] = e("dt", null, "皮下记忆", -1)),
        e("dd", null, C(g(s.stats.memoryTokens)), 1),
        d[7] || (d[7] = e("dt", null, "皮下聊天", -1)),
        e("dd", null, C(g(s.stats.historyTokens)), 1),
        d[8] || (d[8] = e("dt", null, "提示词与输入", -1)),
        e("dd", null, C(g(s.stats.promptTokens)), 1)
      ]),
      d[9] || (d[9] = e("p", null, "128k 时在下次回复前自动总结。", -1)),
      s.busy ? (b(), p("button", {
        key: 0,
        type: "button",
        onClick: d[2] || (d[2] = (l) => u("cancel"))
      }, C(s.phase ? c[s.phase] : "处理中") + " · 取消", 1)) : (b(), p("button", {
        key: 1,
        type: "button",
        disabled: !s.stats.canSummarize,
        onClick: d[3] || (d[3] = (l) => {
          u("summarize"), m.value = !1;
        })
      }, "立即总结", 8, De)),
      !s.stats.canSummarize && !s.busy ? (b(), p("small", Ve, "暂无可总结的较早聊天，近期原文会保留。")) : q("", !0)
    ])) : q("", !0)]));
  }
}), Ue = Pe, Ne = ["disabled"], Re = ["disabled"], Oe = {
  key: 0,
  class: "fourth-wall-dialog-error",
  role: "alert"
}, ze = ["disabled"], Le = ["disabled"], He = /* @__PURE__ */ L({
  __name: "FourthWallMemory",
  props: {
    content: {},
    busy: { type: Boolean },
    error: {}
  },
  emits: ["close", "save"],
  setup(s, { emit: S }) {
    const r = s, u = S, m = T(r.content);
    function y() {
      (m.value === r.content || window.confirm("放弃尚未保存的记忆修改？")) && u("close");
    }
    function g() {
      window.confirm("清空皮下记忆？聊天记录会保留，但已总结过的旧消息不会自动再发给模型。") && (m.value = "", u("save", ""));
    }
    return (c, t) => (b(), G(fe, {
      class: "fourth-wall-memory fourth-wall-dialog",
      "aria-label": "皮下记忆",
      busy: s.busy,
      onClose: y
    }, {
      default: ae(() => [
        e("header", null, [t[2] || (t[2] = e("strong", null, "皮下记忆", -1)), e("button", {
          type: "button",
          disabled: s.busy,
          onClick: y
        }, "关闭", 8, Ne)]),
        P(e("textarea", {
          "onUpdate:modelValue": t[0] || (t[0] = (d) => m.value = d),
          "aria-label": "皮下记忆正文",
          disabled: s.busy,
          placeholder: "总结后的皮下人设与长期记忆，也可以直接填写。"
        }, null, 8, Re), [[z, m.value]]),
        s.error ? (b(), p("p", Oe, C(s.error), 1)) : q("", !0),
        e("footer", null, [e("button", {
          type: "button",
          class: "is-danger",
          disabled: s.busy || !s.content,
          onClick: g
        }, "清空记忆", 8, ze), e("button", {
          type: "button",
          class: "is-primary",
          disabled: s.busy,
          onClick: t[1] || (t[1] = (d) => u("save", m.value))
        }, "保存", 8, Le)])
      ]),
      _: 1
    }, 8, ["busy"]));
  }
}), je = He, ce = L({
  name: "FourthWallContent",
  props: { content: {
    type: Object,
    required: !0
  } },
  setup(s, { slots: S }) {
    function r(u) {
      if (u.kind === "text") return u.value;
      if (u.kind === "media") {
        const y = s.content.media[u.index];
        return S.media?.({
          segment: y,
          index: u.index
        }) ?? y.raw;
      }
      const m = ee(u.tag, u.attrs, u.children.map(r));
      return u.tag === "table" ? ee("div", { class: "fourth-wall-table-scroll" }, [m]) : m;
    }
    return () => ee("div", { class: "fourth-wall-markdown" }, s.content.nodes.map(r));
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
function be(s, S = globalThis.document) {
  const r = [], u = `XB4W${Array.from(crypto.getRandomValues(new Uint32Array(4))).join("")}MEDIA`, m = s.replace(/\[(?:img|图片)\s*:\s*([^\]]+)\]|\[(?:voice|语音)\s*:([^:\]]*):([^\]]+)\]|\[(?:voice|语音)\s*:\s*([^\]]+)\]/gi, (l, h, $, x, E, M) => {
    let B = 0;
    for (let V = M - 1; V >= 0 && s[V] === "\\"; V--) B++;
    return B % 2 ? l : (r.push(h !== void 0 ? {
      kind: "image",
      raw: l,
      value: h.trim()
    } : {
      kind: "voice",
      raw: l,
      value: String(x ?? E ?? "").trim(),
      emotion: String($ || "").trim().toLowerCase()
    }), `${u}${r.length - 1}END`);
  }), y = new RegExp(`${u}(\\d+)END`, "g"), g = (l) => l.replace(y, (h, $) => r[Number($)].raw);
  function c(l, h) {
    if (h) return [{
      kind: "text",
      value: g(l)
    }];
    const $ = [];
    let x = 0;
    for (const E of l.matchAll(y))
      E.index > x && $.push({
        kind: "text",
        value: l.slice(x, E.index)
      }), $.push({
        kind: "media",
        index: Number(E[1])
      }), x = E.index + E[0].length;
    return x < l.length && $.push({
      kind: "text",
      value: l.slice(x)
    }), $;
  }
  function t(l, h = !1) {
    if (l.nodeType === 3) return c(l.textContent || "", h);
    if (l.nodeType !== 1) return [];
    const $ = l, x = $.localName;
    if (Ke.has(x)) return [];
    if (x === "img") return [{
      kind: "text",
      value: g($.getAttribute("alt") || "")
    }];
    const E = Array.from($.childNodes).flatMap((B) => t(B, h || [
      "code",
      "pre",
      "a"
    ].includes(x)));
    if (!Ge.has(x)) return E;
    const M = {};
    if (x === "a") {
      const B = g($.getAttribute("href") || "").trim();
      if (!/^(?:https?:\/\/|mailto:)/i.test(B)) return E;
      M.href = B, M.target = "_blank", M.rel = "noopener noreferrer", $.hasAttribute("title") && (M.title = g($.getAttribute("title")));
    }
    return x === "ol" && /^\d+$/.test($.getAttribute("start") || "") && (M.start = $.getAttribute("start")), [{
      kind: "element",
      tag: x,
      attrs: M,
      children: E
    }];
  }
  const d = S.createElement("template");
  return d.innerHTML = xe(m, { htmlFenceMode: "code" }), {
    nodes: Array.from(d.content.childNodes).flatMap((l) => t(l)),
    media: r
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
}, lt = ["disabled", "onClick"], nt = ["onClick"], rt = { "aria-hidden": "true" }, it = { key: 0 }, ot = { class: "fourth-wall-message-actions" }, ut = ["disabled"], dt = ["disabled"], vt = ["disabled"], mt = { key: 1 }, ft = /* @__PURE__ */ L({
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
  setup(s, { emit: S }) {
    const r = s, u = S, m = R(() => r.editDraft !== void 0);
    me(() => (u("editCancel"), !0), () => m.value);
    const y = R({
      get: () => r.editDraft || "",
      set: (w) => u("draft", w)
    }), g = T(null);
    let c = null;
    const t = _({}), d = /* @__PURE__ */ new Set();
    let l = () => {
    };
    const h = R(() => be(r.message.content)), $ = R(() => r.message.ts ? new Intl.DateTimeFormat("zh-CN", {
      hour: "2-digit",
      minute: "2-digit"
    }).format(r.message.ts) : "");
    function x(w, i) {
      return `fw-${w}-${Date.now()}-${r.messageIndex}-${i}-${Math.random().toString(36).slice(2, 7)}`;
    }
    function E(w) {
      return w.result;
    }
    function M(w, i) {
      return d.has(i) && t[w]?.requestId === i;
    }
    async function B(w, i) {
      if (t[i]?.status === "loading" || t[i]?.status === "ready") return;
      if (!r.imageAvailable) {
        t[i] = {
          status: "unavailable",
          message: "请先开启画图功能"
        };
        return;
      }
      const n = x("image", i);
      d.add(n), t[i] = {
        status: "loading",
        message: "正在加载图片",
        requestId: n
      };
      const o = {
        chatIdentity: r.chatIdentity,
        sessionId: r.sessionId
      };
      try {
        const f = E(await r.bridge.request("fourth-wall/image-check", {
          ...o,
          tags: w.value,
          mediaRequestId: n
        }, 3e4));
        if (!M(i, n)) return;
        if (!f.available) {
          t[i] = {
            status: "unavailable",
            message: "请先开启画图功能",
            requestId: n
          };
          return;
        }
        let I = f.cached || "";
        if (!I) {
          t[i] = {
            status: "loading",
            message: "正在生成图片",
            requestId: n
          };
          const D = E(await r.bridge.request("fourth-wall/image-generate", {
            ...o,
            tags: w.value,
            mediaRequestId: n
          }, 18e4));
          if (!M(i, n)) return;
          I = D.base64;
        }
        t[i] = {
          status: "ready",
          source: /^(?:data:|blob:|https?:)/i.test(I) ? I : `data:image/png;base64,${I}`
        };
      } catch (f) {
        M(i, n) && (t[i] = {
          status: "error",
          message: f instanceof Error ? f.message : String(f),
          requestId: n
        });
      } finally {
        d.delete(n);
      }
    }
    async function V(w, i) {
      if (!r.voiceAvailable) {
        t[i] = {
          status: "unavailable",
          message: "请先开启 TTS 语音"
        };
        return;
      }
      const n = t[i];
      if (n?.status === "loading") return;
      if (n?.status === "playing" && n.requestId) {
        r.bridge.post("fourth-wall/voice-stop", {
          chatIdentity: r.chatIdentity,
          mediaRequestId: n.requestId
        }), t[i] = { status: "idle" };
        return;
      }
      const o = x("voice", i);
      d.add(o), t[i] = {
        status: "loading",
        message: "正在准备语音",
        requestId: o
      };
      try {
        await r.bridge.request("fourth-wall/voice-play", {
          chatIdentity: r.chatIdentity,
          sessionId: r.sessionId,
          mediaRequestId: o,
          text: w.value,
          emotion: w.emotion
        });
      } catch (f) {
        M(i, o) && (t[i] = {
          status: "error",
          message: f instanceof Error ? f.message : String(f),
          requestId: o
        }), d.delete(o);
      }
    }
    function A() {
      u("draft", r.message.content);
    }
    function K() {
      const w = y.value.trim();
      w && u("edit", r.messageIndex, w);
    }
    function F() {
      d.forEach((w) => {
        r.bridge.post("fourth-wall/image-cancel", {
          chatIdentity: r.chatIdentity,
          mediaRequestId: w
        }), r.bridge.post("fourth-wall/voice-stop", {
          chatIdentity: r.chatIdentity,
          mediaRequestId: w
        });
      }), d.clear();
    }
    function W() {
      c?.disconnect(), g.value?.querySelectorAll("[data-image-index]").forEach((w) => c?.observe(w));
    }
    return se(() => {
      l = r.bridge.subscribe((w) => {
        if (w.type === "fourth-wall/image-progress") {
          const i = w.payload, n = Object.keys(t).map(Number).find((o) => t[o]?.requestId === i.mediaRequestId);
          n !== void 0 && (t[n].message = i.status === "queued" ? `图片队列第 ${i.position || 1} 位` : "正在生成图片");
        }
        if (w.type === "fourth-wall/voice-state") {
          const i = w.payload, n = Object.keys(t).map(Number).find((o) => t[o]?.requestId === i.requestId);
          if (n === void 0) return;
          i.state === "playing" && (t[n].status = "playing"), (i.state === "ended" || i.state === "stopped") && (d.delete(String(i.requestId || "")), t[n] = { status: "idle" }), i.state === "error" && (d.delete(String(i.requestId || "")), t[n] = {
            status: "error",
            message: i.message || "语音播放失败"
          });
        }
      }), g.value && typeof IntersectionObserver < "u" && (c = new IntersectionObserver((w) => {
        for (const i of w) {
          if (!i.isIntersecting) continue;
          const n = Number(i.target.dataset.imageIndex), o = h.value.media[n];
          o?.kind === "image" && B(o, n), c?.unobserve(i.target);
        }
      }, { root: g.value.closest(".fourth-wall-conversation") }), W());
    }), X(() => r.message.content, () => {
      F(), Object.keys(t).forEach((w) => delete t[Number(w)]);
    }), X([h, m], W, { flush: "post" }), le(() => {
      l(), c?.disconnect(), F();
    }), (w, i) => (b(), p("article", {
      ref_key: "root",
      ref: g,
      class: ne(["fourth-wall-message", s.message.role === "user" ? "is-user" : "is-ai"]),
      "data-message-index": s.messageIndex
    }, [(s.message.role === "user" ? s.userAvatar : s.characterAvatar) ? (b(), p("img", {
      key: 0,
      class: "fourth-wall-avatar",
      src: s.message.role === "user" ? s.userAvatar : s.characterAvatar,
      alt: ""
    }, null, 8, Qe)) : (b(), p("span", Ye)), e("div", Ze, [
      s.message.thinking ? (b(), p("details", Je, [i[3] || (i[3] = e("summary", null, "思考过程", -1)), e("div", null, C(s.message.thinking), 1)])) : q("", !0),
      e("div", _e, [m.value ? P((b(), p("textarea", {
        key: 0,
        "onUpdate:modelValue": i[0] || (i[0] = (n) => y.value = n),
        class: "fourth-wall-edit",
        rows: "3"
      }, null, 512)), [[z, y.value]]) : (b(), G(j(ce), {
        key: 1,
        content: h.value
      }, {
        media: ae(({ segment: n, index: o }) => [n.kind === "image" ? (b(), p("span", {
          key: 0,
          class: "fourth-wall-image-card",
          "data-image-index": o
        }, [t[o]?.status === "ready" ? (b(), p("img", {
          key: 0,
          src: t[o].source,
          alt: n.value
        }, null, 8, tt)) : t[o]?.status === "error" ? (b(), p("button", {
          key: 1,
          type: "button",
          onClick: (f) => B(n, o)
        }, [U(C(n.raw), 1), e("small", null, C(t[o].message) + "，点此重试", 1)], 8, at)) : t[o]?.status === "unavailable" ? (b(), p("span", st, [U(C(n.raw), 1), e("small", null, C(t[o].message), 1)])) : (b(), p("button", {
          key: 3,
          type: "button",
          disabled: t[o]?.status === "loading",
          onClick: (f) => B(n, o)
        }, [U(C(n.raw), 1), e("small", null, C(t[o]?.message || "生成图片"), 1)], 8, lt))], 8, et)) : (b(), p("button", {
          key: 1,
          class: "fourth-wall-voice",
          type: "button",
          onClick: (f) => V(n, o)
        }, [
          e("span", rt, C(t[o]?.status === "playing" ? "■" : "▶"), 1),
          e("span", null, C(n.value), 1),
          t[o]?.message ? (b(), p("small", it, C(t[o].message), 1)) : q("", !0)
        ], 8, nt))]),
        _: 1
      }, 8, ["content"])), e("div", ot, [m.value ? (b(), p(Y, { key: 0 }, [e("button", {
        type: "button",
        disabled: !s.editable,
        onClick: K
      }, "保存", 8, ut), e("button", {
        type: "button",
        onClick: i[1] || (i[1] = (n) => u("editCancel"))
      }, "取消")], 64)) : (b(), p(Y, { key: 1 }, [e("button", {
        type: "button",
        disabled: !s.editable,
        onClick: A
      }, "编辑", 8, dt), e("button", {
        type: "button",
        disabled: !s.editable,
        onClick: i[2] || (i[2] = (n) => u("delete", s.messageIndex))
      }, "删除", 8, vt)], 64))])]),
      $.value ? (b(), p("time", mt, C($.value), 1)) : q("", !0)
    ])], 10, Xe));
  }
}), ct = ft, bt = ["disabled"], gt = {
  key: 1,
  class: "fourth-wall-empty"
}, yt = ["disabled"], ht = {
  key: 3,
  class: "fourth-wall-message is-ai is-streaming",
  role: "status"
}, pt = ["src"], wt = {
  key: 1,
  class: "fourth-wall-avatar is-placeholder"
}, kt = { class: "fourth-wall-message-stack" }, $t = {
  key: 0,
  class: "fourth-wall-thinking",
  open: ""
}, Ct = { class: "fourth-wall-bubble" }, It = {
  key: 2,
  class: "fourth-wall-unsaved"
}, St = ["disabled"], xt = /* @__PURE__ */ L({
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
  setup(s, { emit: S }) {
    const r = s, u = S, m = T(null), y = T(r.page), g = R(() => be(r.generation.text || "")), c = T(!1), t = T(!0), d = R(() => y.value.start + y.value.messages.length === y.value.total), l = T(null);
    let h = 0, $ = null, x = {
      width: 0,
      height: 0
    }, E;
    const M = {
      counting: "正在计算上下文…",
      summarizing: "正在整理皮下记忆…",
      saving: "正在保存…",
      replying: "等待回应…"
    };
    function B() {
      const n = m.value;
      if (!n) return null;
      const o = n.getBoundingClientRect().top, f = Array.from(n.querySelectorAll("[data-message-index]")).find((I) => I.getBoundingClientRect().bottom > o);
      return f ? {
        index: f.dataset.messageIndex,
        offset: f.getBoundingClientRect().top - o
      } : null;
    }
    function V() {
      const n = m.value;
      n && (x = {
        width: n.clientWidth,
        height: n.clientHeight
      }, $ = B());
    }
    function A(n, o) {
      const f = m.value;
      if (f) {
        if (o) f.scrollTop = f.scrollHeight;
        else if (n) {
          const I = f.querySelector('[data-message-index="' + n.index + '"]');
          I && (f.scrollTop += I.getBoundingClientRect().top - f.getBoundingClientRect().top - n.offset);
        }
        V();
      }
    }
    function K(n) {
      return n.clientWidth !== x.width || n.clientHeight !== x.height;
    }
    se(() => {
      const n = m.value;
      V(), E = new ResizeObserver(() => {
        K(n) && A($, t.value);
      }), E.observe(n);
    }), le(() => E.disconnect());
    async function F(n, o = !1) {
      const f = B();
      if (l.value && n.sessionId === y.value.sessionId) {
        const I = n.messages[l.value.index - n.start];
        I?.ts === l.value.ts && I.content === l.value.content.trim() ? l.value = null : I?.ts === l.value.ts && I.content === l.value.original ? l.value.revision = n.revision : I && (u("error", `正在编辑的消息已变化，未保存的草稿：${l.value.content}`), l.value = null);
      }
      y.value = n, await ue(), o && (t.value = !0), A(f, o);
    }
    function W() {
      const n = m.value;
      !n || K(n) || (t.value = d.value && n.scrollHeight - n.clientHeight - n.scrollTop < 48, V());
    }
    async function w(n) {
      if (c.value) return;
      const o = ++h;
      c.value = !0;
      const f = r.sessionId;
      try {
        const I = await r.bridge.request("fourth-wall/history-page", {
          chatIdentity: r.chatIdentity,
          sessionId: f,
          direction: n,
          revision: y.value.revision
        });
        if (o !== h || f !== r.sessionId) return;
        n !== "latest" && (t.value = !1);
        const D = I.result;
        if (n === "earlier") D.messages = [...D.messages, ...y.value.messages].slice(0, 60);
        else if (n === "later") {
          const H = [...y.value.messages, ...D.messages];
          D.start = y.value.start + Math.max(0, H.length - 60), D.messages = H.slice(-60);
        }
        await F(D, n === "latest");
      } catch (I) {
        o === h && u("error", I instanceof Error ? I.message : String(I));
      } finally {
        o === h && (c.value = !1);
      }
    }
    function i(n, o) {
      const f = y.value.messages[n - y.value.start];
      f && (l.value?.index === n ? l.value.content = o : l.value = {
        index: n,
        content: o,
        original: f.content,
        ts: f.ts,
        revision: y.value.revision
      });
    }
    return X(() => r.page, (n) => {
      h++, c.value = !1, F(n, n.sessionId !== y.value.sessionId || t.value);
    }, { immediate: !0 }), X(() => r.sessionId, () => {
      l.value = null, t.value = !0;
    }), X(() => [
      r.generation.text,
      r.generation.thinking,
      r.generation.status
    ], async () => {
      await ue(), t.value && d.value && A(null, !0);
    }), (n, o) => (b(), p("section", {
      ref_key: "viewport",
      ref: m,
      class: "fourth-wall-conversation",
      "aria-live": "polite",
      onScrollPassive: W
    }, [
      y.value.start > 0 ? (b(), p("button", {
        key: 0,
        type: "button",
        class: "fourth-wall-earlier",
        disabled: c.value,
        onClick: o[0] || (o[0] = (f) => w("earlier"))
      }, C(c.value ? "读取中…" : "查看更早的记录"), 9, bt)) : q("", !0),
      y.value.total === 0 && s.generation.status === "idle" ? (b(), p("div", gt, [...o[6] || (o[6] = [
        e("span", null, "IV", -1),
        e("strong", null, "越过故事边界", -1),
        e("p", null, "这里是你与角色扮演者的皮下私聊。", -1)
      ])])) : q("", !0),
      (b(!0), p(Y, null, de(y.value.messages, (f, I) => (b(), G(ct, {
        key: f.ts + "-" + (y.value.start + I),
        message: f,
        "message-index": y.value.start + I,
        "chat-identity": s.chatIdentity,
        "session-id": s.sessionId,
        "user-avatar": s.userAvatar,
        "character-avatar": s.characterAvatar,
        "image-available": s.imageAvailable,
        "voice-available": s.voiceAvailable,
        bridge: s.bridge,
        editable: !s.busy,
        "edit-draft": l.value?.index === y.value.start + I && l.value.ts === f.ts ? l.value.content : void 0,
        onDraft: (D) => i(y.value.start + I, D),
        onEditCancel: o[1] || (o[1] = (D) => l.value = null),
        onEdit: o[2] || (o[2] = (D, H) => u("edit", D, H, l.value?.revision ?? y.value.revision)),
        onDelete: o[3] || (o[3] = (D) => u("delete", D))
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
      d.value ? q("", !0) : (b(), p("button", {
        key: 2,
        type: "button",
        class: "fourth-wall-earlier",
        disabled: c.value,
        onClick: o[4] || (o[4] = (f) => w("later"))
      }, " 查看后面的记录 ", 8, yt)),
      s.generation.status !== "idle" && d.value ? (b(), p("article", ht, [s.characterAvatar ? (b(), p("img", {
        key: 0,
        class: "fourth-wall-avatar",
        src: s.characterAvatar,
        alt: ""
      }, null, 8, pt)) : (b(), p("span", wt)), e("div", kt, [s.generation.thinking ? (b(), p("details", $t, [o[7] || (o[7] = e("summary", null, "思考中", -1)), e("div", null, C(s.generation.thinking), 1)])) : q("", !0), e("div", Ct, [s.generation.text ? (b(), G(j(ce), {
        key: 0,
        content: g.value
      }, null, 8, ["content"])) : (b(), p(Y, { key: 1 }, [U(C(s.generation.status === "error" ? s.generation.message : M[s.generation.phase || "replying"]), 1)], 64)), s.generation.unsaved ? (b(), p("small", It, "未保存")) : q("", !0)])])])) : q("", !0),
      t.value ? q("", !0) : (b(), p("button", {
        key: 4,
        type: "button",
        class: "fourth-wall-latest",
        disabled: c.value,
        onClick: o[5] || (o[5] = (f) => w("latest"))
      }, "回到最新 ↓", 8, St))
    ], 544));
  }
}), At = xt, Tt = {
  class: "fourth-wall-modal",
  role: "dialog",
  "aria-label": "四次元壁提示词"
}, Mt = { class: "fourth-wall-prompt-fields" }, Et = /* @__PURE__ */ L({
  __name: "FourthWallPromptEditor",
  props: { templates: {} },
  emits: [
    "close",
    "save",
    "restore"
  ],
  setup(s, { emit: S }) {
    const r = s, u = S, m = _(structuredClone(O(r.templates))), y = T(null);
    ve(y, () => u("close"));
    function g() {
      u("save", structuredClone(O(m)));
    }
    return (c, t) => (b(), p("div", {
      ref_key: "layer",
      ref: y,
      class: "fourth-wall-modal-backdrop",
      onClick: t[6] || (t[6] = Me((d) => u("close"), ["self"]))
    }, [e("section", Tt, [
      e("header", null, [t[7] || (t[7] = e("strong", null, "提示词模板", -1)), e("button", {
        type: "button",
        onClick: t[0] || (t[0] = (d) => u("close"))
      }, "关闭")]),
      e("div", Mt, [
        e("label", null, [t[8] || (t[8] = U("Top User", -1)), P(e("textarea", {
          "onUpdate:modelValue": t[1] || (t[1] = (d) => m.topuser = d),
          rows: "5"
        }, null, 512), [[z, m.topuser]])]),
        e("label", null, [t[9] || (t[9] = U("Confirm", -1)), P(e("textarea", {
          "onUpdate:modelValue": t[2] || (t[2] = (d) => m.confirm = d),
          rows: "3"
        }, null, 512), [[z, m.confirm]])]),
        e("label", null, [t[10] || (t[10] = U("Meta Protocol", -1)), P(e("textarea", {
          "onUpdate:modelValue": t[3] || (t[3] = (d) => m.metaProtocol = d),
          rows: "12"
        }, null, 512), [[z, m.metaProtocol]])]),
        e("label", null, [t[11] || (t[11] = U("Bottom", -1)), P(e("textarea", {
          "onUpdate:modelValue": t[4] || (t[4] = (d) => m.bottom = d),
          rows: "5"
        }, null, 512), [[z, m.bottom]])])
      ]),
      e("footer", null, [e("button", {
        type: "button",
        class: "is-danger",
        onClick: t[5] || (t[5] = (d) => u("restore"))
      }, "恢复默认"), e("button", {
        type: "button",
        class: "is-primary",
        onClick: g
      }, "保存")])
    ])], 512));
  }
}), qt = Et, N = Object.freeze({
  title: "聊天记录",
  add: "新建记录",
  newName: "新记录",
  namePrompt: "新记录名称",
  rename: "重命名",
  renamePrompt: "重命名记录",
  remove: "删除记录",
  removePrompt: "确定删除当前记录及其皮下记忆吗？"
}), Ft = ["aria-label"], Wt = [
  "disabled",
  "aria-label",
  "title"
], Bt = { class: "fourth-wall-session-list" }, Dt = [
  "disabled",
  "aria-current",
  "onClick"
], Vt = { class: "fourth-wall-session-actions" }, Pt = ["disabled"], Ut = ["disabled"], Nt = /* @__PURE__ */ L({
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
  setup(s, { emit: S }) {
    const r = S;
    function u() {
      const g = window.prompt(N.namePrompt, N.newName)?.trim();
      g && r("add", g);
    }
    function m(g, c) {
      const t = window.prompt(N.renamePrompt, c)?.trim();
      t && r("rename", g, t);
    }
    function y(g) {
      window.confirm(N.removePrompt) && r("delete", g);
    }
    return (g, c) => (b(), p("section", {
      class: "fourth-wall-settings-section fourth-wall-sessions",
      "aria-label": j(N).title
    }, [
      e("header", null, [e("h3", null, C(j(N).title), 1), e("button", {
        type: "button",
        disabled: s.disabled,
        "aria-label": j(N).add,
        title: j(N).add,
        onClick: u
      }, "＋", 8, Wt)]),
      e("div", Bt, [(b(!0), p(Y, null, de(s.sessions, (t) => (b(), p("button", {
        key: t.id,
        type: "button",
        disabled: s.disabled,
        "aria-current": t.id === s.activeSessionId ? "true" : void 0,
        onClick: (d) => t.id !== s.activeSessionId && r("switch", t.id)
      }, C(t.name), 9, Dt))), 128))]),
      e("div", Vt, [e("button", {
        type: "button",
        disabled: s.disabled,
        onClick: c[0] || (c[0] = (t) => m(s.activeSessionId, s.sessions.find((d) => d.id === s.activeSessionId).name))
      }, C(j(N).rename), 9, Pt), e("button", {
        type: "button",
        disabled: s.disabled || s.sessions.length <= 1,
        class: "is-danger",
        onClick: c[1] || (c[1] = (t) => y(s.activeSessionId))
      }, C(j(N).remove), 9, Ut)])
    ], 8, Ft));
  }
}), ge = Nt, Rt = { class: "fourth-wall-settings-scroll" }, Ot = { class: "fourth-wall-settings-section" }, zt = { class: "is-toggle" }, Lt = ["disabled"], Ht = { class: "fourth-wall-settings-section" }, jt = { class: "is-toggle" }, Gt = { class: "is-toggle" }, Kt = { class: "is-toggle" }, Xt = { key: 0 }, Qt = ["disabled"], Yt = { class: "fourth-wall-settings-section is-actions" }, Zt = /* @__PURE__ */ L({
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
  setup(s, { emit: S }) {
    const r = s, u = S, m = _(structuredClone(O(r.chat.settings))), y = T(null);
    ve(y, () => u("close"));
    const g = _(structuredClone(O(r.global)));
    function c() {
      u("updateChat", structuredClone(O(m)));
    }
    function t() {
      u("updateGlobal", {
        image: structuredClone(O(g.image)),
        voice: structuredClone(O(g.voice)),
        commentary: structuredClone(O(g.commentary))
      });
    }
    return (d, l) => (b(), p("aside", {
      ref_key: "layer",
      ref: y,
      class: "fourth-wall-settings",
      "aria-label": "四次元壁设置"
    }, [e("header", null, [l[12] || (l[12] = e("strong", null, "四次元壁设置", -1)), e("button", {
      type: "button",
      onClick: l[0] || (l[0] = (h) => u("close"))
    }, "关闭")]), e("div", Rt, [
      J(ge, {
        sessions: s.chat.sessions,
        "active-session-id": s.chat.activeSessionId,
        disabled: s.busy,
        onSwitch: l[1] || (l[1] = (h) => u("switchSession", h)),
        onAdd: l[2] || (l[2] = (h) => u("addSession", h)),
        onRename: l[3] || (l[3] = (h, $) => u("renameSession", h, $)),
        onDelete: l[4] || (l[4] = (h) => u("deleteSession", h))
      }, null, 8, [
        "sessions",
        "active-session-id",
        "disabled"
      ]),
      e("section", Ot, [
        l[15] || (l[15] = e("h3", null, "上下文", -1)),
        e("label", null, [l[13] || (l[13] = U("带入的主聊天楼层数", -1)), P(e("input", {
          "onUpdate:modelValue": l[5] || (l[5] = (h) => m.maxChatLayers = h),
          type: "number",
          min: "1",
          max: "9999"
        }, null, 512), [[
          z,
          m.maxChatLayers,
          void 0,
          { number: !0 }
        ]])]),
        e("label", zt, [l[14] || (l[14] = e("span", null, "流式生成", -1)), P(e("input", {
          "onUpdate:modelValue": l[6] || (l[6] = (h) => m.stream = h),
          type: "checkbox"
        }, null, 512), [[Q, m.stream]])]),
        e("button", {
          type: "button",
          class: "is-primary",
          disabled: s.busy,
          onClick: c
        }, "保存上下文设置", 8, Lt)
      ]),
      e("section", Ht, [
        l[19] || (l[19] = e("h3", null, "回复方式", -1)),
        e("label", jt, [l[16] || (l[16] = e("span", null, "允许对方发图片", -1)), P(e("input", {
          "onUpdate:modelValue": l[7] || (l[7] = (h) => g.image.enablePrompt = h),
          type: "checkbox"
        }, null, 512), [[Q, g.image.enablePrompt]])]),
        e("label", Gt, [l[17] || (l[17] = e("span", null, "允许对方发语音", -1)), P(e("input", {
          "onUpdate:modelValue": l[8] || (l[8] = (h) => g.voice.enabled = h),
          type: "checkbox"
        }, null, 512), [[Q, g.voice.enabled]])]),
        e("label", Kt, [l[18] || (l[18] = e("span", null, "实时吐槽", -1)), P(e("input", {
          "onUpdate:modelValue": l[9] || (l[9] = (h) => g.commentary.enabled = h),
          type: "checkbox"
        }, null, 512), [[Q, g.commentary.enabled]])]),
        g.commentary.enabled ? (b(), p("label", Xt, [U(" 吐槽概率 " + C(g.commentary.probability) + "% ", 1), P(e("input", {
          "onUpdate:modelValue": l[10] || (l[10] = (h) => g.commentary.probability = h),
          type: "range",
          min: "1",
          max: "99"
        }, null, 512), [[
          z,
          g.commentary.probability,
          void 0,
          { number: !0 }
        ]])])) : q("", !0),
        e("button", {
          type: "button",
          class: "is-primary",
          disabled: s.busy,
          onClick: t
        }, "保存设置", 8, Qt)
      ]),
      e("section", Yt, [e("button", {
        type: "button",
        onClick: l[11] || (l[11] = (h) => u("openPrompts"))
      }, "提示词模板")])
    ])], 512));
  }
}), Jt = Zt, _t = { class: "fourth-wall-app" }, ea = { class: "fourth-wall-sidebar" }, ta = { class: "fourth-wall-header" }, aa = { class: "fourth-wall-heading" }, sa = { class: "fourth-wall-header-actions" }, la = ["disabled"], na = ["disabled"], ra = {
  key: 0,
  class: "fourth-wall-error",
  role: "alert"
}, ia = ["disabled"], oa = { class: "fourth-wall-composer" }, ua = ["disabled"], da = ["disabled"], va = ["disabled"], ma = { class: "fourth-wall-clear-choice" }, fa = {
  key: 0,
  class: "fourth-wall-dialog-error",
  role: "alert"
}, ca = ["disabled"], ba = ["disabled"], Z = 35e3, ga = /* @__PURE__ */ L({
  __name: "FourthWallApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(s) {
    const S = s, r = T(structuredClone(O(S.initialState))), u = T(""), m = /* @__PURE__ */ new Map(), y = T(!1), g = T(!1), c = T(!1), t = T(""), d = T(!1), l = T(!1), h = T(!1), $ = T(!1), x = T(""), E = T(0), M = T(!1), B = T(0);
    let V;
    const A = T({
      status: "idle",
      sessionId: "",
      text: "",
      thinking: "",
      message: "",
      unsaved: !1
    });
    let K = () => {
    };
    const F = R(() => r.value.chat.sessions.find((v) => v.id === r.value.chat.activeSessionId)), W = R(() => A.value.status === "started" || A.value.status === "progress"), w = R(() => ({
      ...r.value.context,
      usedTokens: r.value.context.usedTokens + B.value,
      promptTokens: r.value.context.promptTokens + B.value
    }));
    X(() => [u.value, A.value.text], () => {
      V || (V = setTimeout(() => {
        B.value = te(u.value) + te(A.value.text), V = void 0;
      }, 200));
    }), X(() => F.value.id, (v, a) => {
      m.set(a, u.value), $.value = !1, l.value = !1, M.value = !1, u.value = m.get(v) ?? "", A.value = {
        status: "idle",
        sessionId: "",
        text: "",
        thinking: "",
        message: "",
        unsaved: !1
      };
      for (const k of m.keys()) r.value.chat.sessions.some((Se) => Se.id === k) || m.delete(k);
    });
    function i(v = F.value.id) {
      return {
        chatIdentity: r.value.chatIdentity,
        sessionId: v
      };
    }
    const n = {
      switch: (v) => f("fourth-wall/switch-session", {
        ...i(),
        targetSessionId: v
      }),
      add: (v) => f("fourth-wall/add-session", {
        ...i(),
        name: v
      }),
      rename: (v, a) => f("fourth-wall/rename-session", {
        ...i(v),
        name: a
      }),
      delete: (v) => f("fourth-wall/delete-session", i(v))
    };
    function o(v) {
      return structuredClone(v.result);
    }
    async function f(v, a) {
      c.value = !0, t.value = "";
      try {
        return r.value = o(await S.bridge.request(v, a, Z)), !0;
      } catch (k) {
        return t.value = k instanceof Error ? k.message : String(k), !1;
      } finally {
        c.value = !1;
      }
    }
    async function I() {
      const v = u.value.trim();
      if (!(!v || W.value || c.value)) {
        u.value = "", t.value = "", M.value = !1, A.value = {
          status: "started",
          sessionId: F.value.id,
          text: "",
          thinking: "",
          message: "",
          unsaved: !1
        };
        try {
          await S.bridge.request("fourth-wall/send", {
            ...i(),
            content: v
          }, Z);
        } catch (a) {
          t.value = `还不确定是否发送成功：${a instanceof Error ? a.message : String(a)}。请核对聊天记录后再发送。原输入：${v}`, A.value.status = "idle";
        }
      }
    }
    async function D() {
      if (!(W.value || c.value)) {
        t.value = "", M.value = !1, A.value = {
          status: "started",
          sessionId: F.value.id,
          text: "",
          thinking: "",
          message: "",
          unsaved: !1
        };
        try {
          await S.bridge.request("fourth-wall/regenerate", i(), Z);
        } catch (v) {
          t.value = v instanceof Error ? v.message : String(v), A.value.status = "idle";
        }
      }
    }
    function H() {
      S.bridge.post("fourth-wall/cancel", i());
    }
    function re(v) {
      v && (u.value ? t.value += `
未保存的原输入：${v}` : u.value = v);
    }
    function ye(v) {
      v.key !== "Enter" || v.shiftKey || d.value || (v.preventDefault(), W.value ? H() : I());
    }
    function he(v) {
      const a = v < F.value.archivedCount ? `这条消息已记入皮下记忆；删除消息不会让对方忘记，需要遗忘的内容请到皮下记忆中删除。
` : "";
      window.confirm(`${a}确定删除这条消息吗？`) && f("fourth-wall/delete-message", {
        ...i(),
        revision: r.value.history.revision,
        messageIndex: v
      });
    }
    function pe() {
      h.value = !1, l.value = !0;
    }
    async function we() {
      await f("fourth-wall/clear-history", {
        ...i(),
        clearMemory: h.value
      }) && (l.value = !1);
    }
    async function ke(v, a, k) {
      v < F.value.archivedCount && !window.confirm("这条消息已记入皮下记忆，修改消息不会同时修改记忆；需要更正时请另行编辑皮下记忆。继续修改？") || await f("fourth-wall/edit-message", {
        ...i(),
        revision: k,
        messageIndex: v,
        content: a
      });
    }
    async function ie(v) {
      if (!(W.value || c.value)) {
        t.value = "", M.value = !1, A.value = {
          status: "started",
          sessionId: F.value.id,
          text: "",
          thinking: "",
          message: "",
          unsaved: !1,
          phase: "counting",
          manual: v === "summarize"
        };
        try {
          await S.bridge.request(`fourth-wall/${v}`, i(), Z);
        } catch (a) {
          A.value.status = "idle", t.value = String(a instanceof Error ? a.message : a);
        }
      }
    }
    async function $e() {
      if (c.value || W.value) return;
      c.value = !0, t.value = "";
      const v = i(), a = r.value.history.revision;
      try {
        const k = await S.bridge.request("fourth-wall/read-memory", {
          ...v,
          revision: a
        });
        if (v.sessionId !== F.value.id || v.chatIdentity !== r.value.chatIdentity) return;
        x.value = k.result.content, E.value = a, $.value = !0;
      } catch (k) {
        t.value = k instanceof Error ? k.message : String(k);
      } finally {
        c.value = !1;
      }
    }
    async function Ce(v) {
      await f("fourth-wall/save-memory", {
        ...i(),
        revision: E.value,
        expectedContent: x.value,
        content: v
      }) && ($.value = !1);
    }
    function Ie(v) {
      f("fourth-wall/update-chat-settings", {
        ...i(),
        patch: v
      });
    }
    function oe(v) {
      f("fourth-wall/update-global-settings", {
        ...i(),
        patch: v
      });
    }
    return se(() => {
      K = S.bridge.subscribe((v) => {
        if (v.type === "fourth-wall/state" && (r.value = structuredClone(v.payload.state)), v.type !== "fourth-wall/generation") return;
        const a = v.payload;
        if (!(a.sessionId && a.sessionId !== F.value.id)) {
          if (a.status === "complete" || a.status === "cancelled") {
            a.status === "cancelled" && (a.message && (t.value = a.message), re(a.inputDraft)), B.value = te(u.value), A.value = {
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
            t.value = a.message || "生成失败", M.value = !a.manual && a.kind !== "save" && a.kind !== "input-save", re(a.inputDraft), A.value = a.kind === "save" && (a.draft?.text || a.draft?.thinking) ? {
              status: "error",
              sessionId: a.sessionId || F.value.id,
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
          A.value = {
            status: a.status || "progress",
            sessionId: a.sessionId || F.value.id,
            text: a.text || A.value.text,
            thinking: a.thinking || A.value.thinking,
            message: "",
            unsaved: !1,
            phase: a.phase || A.value.phase,
            manual: a.manual ?? A.value.manual
          };
        }
      });
    }), le(() => {
      K(), clearTimeout(V);
    }), (v, a) => (b(), p("main", _t, [
      e("aside", ea, [J(ge, Te({
        sessions: r.value.chat.sessions,
        "active-session-id": F.value.id,
        disabled: c.value || W.value
      }, Ae(n)), null, 16, [
        "sessions",
        "active-session-id",
        "disabled"
      ])]),
      e("header", ta, [e("div", aa, [a[19] || (a[19] = e("span", null, "IV", -1)), e("div", null, [a[18] || (a[18] = e("strong", null, "四次元壁", -1)), e("small", null, C(F.value.name), 1)])]), e("div", sa, [
        J(Ue, {
          stats: w.value,
          busy: W.value,
          phase: A.value.phase,
          onSummarize: a[0] || (a[0] = (k) => ie("summarize")),
          onCancel: H
        }, null, 8, [
          "stats",
          "busy",
          "phase"
        ]),
        e("button", {
          type: "button",
          title: "皮下记忆",
          "aria-label": "皮下记忆",
          disabled: c.value || W.value,
          onClick: $e
        }, [...a[20] || (a[20] = [e("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [e("path", { d: "M12 5c-3-2-7-2-9-1v15c3-1 6-1 9 1m0-15c3-2 7-2 9-1v15c-3-1-6-1-9 1V5Z" })], -1)])], 8, la),
        e("button", {
          type: "button",
          title: "清空当前记录",
          "aria-label": "清空当前记录",
          disabled: c.value,
          onClick: pe
        }, [...a[21] || (a[21] = [e("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [e("path", { d: "M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7m4 4v5m4-5v5" })], -1)])], 8, na),
        e("button", {
          type: "button",
          title: "设置",
          onClick: a[1] || (a[1] = (k) => y.value = !0)
        }, "⚙")
      ])]),
      t.value ? (b(), p("div", ra, [
        e("span", null, C(t.value), 1),
        M.value ? (b(), p("button", {
          key: 0,
          type: "button",
          disabled: W.value || c.value,
          onClick: a[2] || (a[2] = (k) => ie("retry"))
        }, "重试回复", 8, ia)) : q("", !0),
        e("button", {
          type: "button",
          "aria-label": "关闭错误提示",
          onClick: a[3] || (a[3] = (k) => t.value = "")
        }, "×")
      ])) : q("", !0),
      J(At, {
        page: r.value.history,
        busy: c.value || W.value,
        "session-id": F.value.id,
        "chat-identity": r.value.chatIdentity,
        "user-avatar": r.value.userAvatar,
        "character-avatar": r.value.characterAvatar,
        "image-available": r.value.capabilities.image.available,
        "voice-available": r.value.capabilities.voice.available,
        generation: A.value,
        bridge: s.bridge,
        onEdit: ke,
        onDelete: he,
        onError: a[4] || (a[4] = (k) => t.value = k)
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
      e("footer", oa, [
        e("button", {
          type: "button",
          class: "fourth-wall-regenerate",
          title: "重答",
          "aria-label": "重答",
          disabled: c.value || W.value,
          onClick: D
        }, " ↻ ", 8, ua),
        P(e("textarea", {
          "onUpdate:modelValue": a[5] || (a[5] = (k) => u.value = k),
          rows: "1",
          placeholder: "聊点什么...",
          disabled: c.value,
          onCompositionstart: a[6] || (a[6] = (k) => d.value = !0),
          onCompositionend: a[7] || (a[7] = (k) => d.value = !1),
          onKeydown: ye
        }, null, 40, da), [[z, u.value]]),
        e("button", {
          type: "button",
          class: ne({ "is-stop": W.value }),
          disabled: c.value,
          onClick: a[8] || (a[8] = (k) => W.value ? H() : I())
        }, C(W.value ? "■" : "↑"), 11, va)
      ]),
      y.value ? (b(), G(Jt, {
        key: 1,
        chat: r.value.chat,
        global: r.value.global,
        busy: c.value || W.value,
        onClose: a[9] || (a[9] = (k) => y.value = !1),
        onUpdateChat: Ie,
        onUpdateGlobal: oe,
        onSwitchSession: n.switch,
        onAddSession: n.add,
        onRenameSession: n.rename,
        onDeleteSession: n.delete,
        onOpenPrompts: a[10] || (a[10] = (k) => g.value = !0)
      }, null, 8, [
        "chat",
        "global",
        "busy",
        "onSwitchSession",
        "onAddSession",
        "onRenameSession",
        "onDeleteSession"
      ])) : q("", !0),
      g.value ? (b(), G(qt, {
        key: 2,
        templates: r.value.global.promptTemplates,
        onClose: a[11] || (a[11] = (k) => g.value = !1),
        onSave: a[12] || (a[12] = (k) => {
          oe({ promptTemplates: k }), g.value = !1;
        }),
        onRestore: a[13] || (a[13] = () => {
          f("fourth-wall/restore-prompts", i()), g.value = !1;
        })
      }, null, 8, ["templates"])) : q("", !0),
      $.value ? (b(), G(je, {
        key: 3,
        content: x.value,
        busy: c.value,
        error: t.value,
        onClose: a[14] || (a[14] = (k) => $.value = !1),
        onSave: Ce
      }, null, 8, [
        "content",
        "busy",
        "error"
      ])) : q("", !0),
      l.value ? (b(), G(fe, {
        key: 4,
        class: "fourth-wall-dialog",
        "aria-label": "清空皮下聊天",
        busy: c.value,
        onClose: a[17] || (a[17] = (k) => l.value = !1)
      }, {
        default: ae(() => [
          a[23] || (a[23] = e("header", null, [e("strong", null, "清空皮下聊天？")], -1)),
          a[24] || (a[24] = e("p", null, "当前聊天原文将被删除，默认保留皮下记忆。", -1)),
          e("label", ma, [P(e("input", {
            "onUpdate:modelValue": a[15] || (a[15] = (k) => h.value = k),
            type: "checkbox"
          }, null, 512), [[Q, h.value]]), a[22] || (a[22] = U("同时清空皮下记忆", -1))]),
          t.value ? (b(), p("p", fa, C(t.value), 1)) : q("", !0),
          e("footer", null, [e("button", {
            type: "button",
            disabled: c.value,
            onClick: a[16] || (a[16] = (k) => l.value = !1)
          }, "取消", 8, ca), e("button", {
            type: "button",
            class: "is-danger",
            disabled: c.value,
            onClick: we
          }, "清空聊天", 8, ba)])
        ]),
        _: 1
      }, 8, ["busy"])) : q("", !0)
    ]));
  }
}), $a = ga;
export {
  $a as default
};
