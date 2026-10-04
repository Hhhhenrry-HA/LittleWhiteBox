/* eslint-disable */
import { B as na, C, D as le, G as be, H as ia, I as ua, L as oa, M as ce, O as A, P as he, Q as we, S as oe, U as l, V as Ce, X as qe, _ as T, at as $, b as x, d as ke, dt as Ie, et as Le, ft as g, g as ve, h as Pe, it as Ue, k as Z, lt as O, nt as ra, o as Fe, p as ue, tt as X, ut as W, w as n, x as e } from "./xiaobai-os-frame-bridge-CrPFvkI3.js";
import { t as Ve } from "./xiaobai-os-AppDialog-Ce_C5VGF.js";
import { t as da } from "./xiaobai-os-context-tokens-bfmDTbG3.js";
var va = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, ga = ["d"], ma = /* @__PURE__ */ Z({
  __name: "MessageIcon",
  props: { name: {} },
  setup(a) {
    const h = {
      message: "M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-6 3V6a2 2 0 0 1 2-2Z",
      back: "m14 5-7 7 7 7",
      plus: "M12 5v14M5 12h14",
      send: "m5 12 7-7 7 7M12 5v15",
      image: "M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm-1 12 5-5 4 4 3-3 4 4M15 8h.01",
      voice: "M9 5a3 3 0 0 1 6 0v6a3 3 0 0 1-6 0V5Zm-3 6a6 6 0 0 0 12 0M12 17v4M9 21h6",
      search: "M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-2 5 6 6",
      more: "M5 12h.01M12 12h.01M19 12h.01",
      close: "m6 6 12 12M6 18 18 6",
      play: "m8 5 11 7-11 7V5Z",
      stop: "M7 7h10v10H7Z",
      settings: "m9 3-.5 3-2.5 1-2.5-1-2 3.5L4 11v2l-2.5 1.5 2 3.5L6 17l2.5 1L9 21h6l.5-3 2.5-1 2.5 1 2-3.5L20 13v-2l2.5-1.5-2-3.5L18 7l-2.5-1L15 3H9Zm6 9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    };
    return (s, f) => (l(), n("svg", va, [e("path", { d: h[a.name] }, null, 8, ga)]));
  }
}), N = ma, ca = /* @__PURE__ */ Z({
  __name: "ContactAvatar",
  props: {
    identity: {},
    name: {},
    small: { type: Boolean }
  },
  setup(a) {
    const h = a, s = x(() => {
      let f = 0;
      for (const r of h.identity) f = Math.imul(f, 31) + r.codePointAt(0) | 0;
      return String((f >>> 0) % 360);
    });
    return (f, r) => (l(), n("span", {
      class: W(["messages-avatar", { small: a.small }]),
      style: Ie({ "--avatar-hue": s.value }),
      "aria-hidden": "true"
    }, g(Array.from(a.name)[0]), 7));
  }
}), ye = ca, ya = { class: "messages-contacts" }, ba = { class: "messages-home-header" }, fa = { class: "messages-home-actions" }, pa = { class: "messages-search" }, ka = {
  key: 0,
  class: "messages-empty"
}, $a = {
  key: 1,
  class: "messages-contact-rows"
}, ha = {
  key: 0,
  class: "messages-subtle"
}, wa = ["aria-current", "onClick"], Ca = { class: "messages-contact-copy" }, Ia = { class: "messages-contact-heading" }, Ma = {
  key: 0,
  class: "messages-preview messages-preview-active"
}, Sa = {
  key: 1,
  class: "messages-preview"
}, Ea = {
  key: 2,
  class: "messages-preview"
}, Ba = /* @__PURE__ */ Z({
  __name: "ContactList",
  props: {
    contacts: {},
    activeContactId: {},
    busyContactId: {},
    drafts: {}
  },
  emits: [
    "select",
    "add",
    "settings"
  ],
  setup(a) {
    const h = a, s = $(""), f = x(() => h.contacts.filter((b) => `${b.name} ${b.note}`.toLocaleLowerCase().includes(s.value.toLocaleLowerCase())));
    function r(b) {
      if (b === null) return "";
      const d = new Date(b);
      return d.toDateString() === (/* @__PURE__ */ new Date()).toDateString() ? d.toLocaleTimeString(void 0, {
        hour: "2-digit",
        minute: "2-digit"
      }) : d.toLocaleDateString(void 0, {
        month: "numeric",
        day: "numeric"
      });
    }
    return (b, d) => (l(), n("section", ya, [
      e("header", ba, [d[4] || (d[4] = e("h1", null, "信息", -1)), e("div", fa, [e("button", {
        class: "messages-icon-button",
        title: "设置",
        "aria-label": "设置",
        onClick: d[0] || (d[0] = (o) => b.$emit("settings"))
      }, [A(N, { name: "settings" })]), e("button", {
        class: "messages-icon-button messages-add-contact",
        "aria-label": "添加联系人",
        onClick: d[1] || (d[1] = (o) => b.$emit("add"))
      }, [A(N, { name: "plus" })])])]),
      e("label", pa, [A(N, { name: "search" }), X(e("input", {
        "onUpdate:modelValue": d[2] || (d[2] = (o) => s.value = o),
        type: "search",
        placeholder: "搜索联系人",
        "aria-label": "搜索联系人"
      }, null, 512), [[ue, s.value]])]),
      a.contacts.length ? (l(), n("div", $a, [f.value.length ? C("", !0) : (l(), n("p", ha, "没有找到这个人。")), (l(!0), n(T, null, be(f.value, (o) => (l(), n("button", {
        key: o.id,
        class: "messages-contact-row",
        "aria-current": a.activeContactId === o.id ? "true" : void 0,
        onClick: (E) => b.$emit("select", o.id)
      }, [A(ye, {
        identity: o.id,
        name: o.name
      }, null, 8, ["identity", "name"]), e("span", Ca, [e("span", Ia, [e("strong", null, g(o.name), 1), e("time", null, g(r(o.lastAt)), 1)]), a.busyContactId === o.id ? (l(), n("span", Ma, "正在等待回复…")) : a.drafts.get(o.id)?.text.trim() || a.drafts.get(o.id)?.image ? (l(), n("span", Sa, [d[7] || (d[7] = e("em", null, "草稿", -1)), le(" " + g(a.drafts.get(o.id)?.image ? "［图片］" : "") + g(a.drafts.get(o.id)?.text), 1)])) : (l(), n("span", Ea, g(o.preview), 1))])], 8, wa))), 128))])) : (l(), n("div", ka, [
        A(N, { name: "message" }),
        d[6] || (d[6] = e("h2", null, "暂无联系人", -1)),
        e("button", {
          class: "messages-primary",
          onClick: d[3] || (d[3] = (o) => b.$emit("add"))
        }, [d[5] || (d[5] = le("添加联系人", -1)), A(N, { name: "plus" })])
      ]))
    ]));
  }
}), Aa = Ba, V = {
  pending: (a) => `${a} 条消息已保留，尚未确认写入主聊天。`,
  title: "主聊天同步",
  view: "查看",
  dismiss: "不再提示",
  setting: "未写入主聊天时提醒",
  retry: "补到主聊天",
  description: "重试不会再次发送消息或生成回复。「不再提示」不会删除消息；仍可从信息设置继续同步。",
  failed: "这次写入未完成，可以稍后重试。",
  operationTimeout: "暂时没收到操作结果，请先检查保存再重试。",
  settingsFailed: "设置未保存，请重试。",
  saveFailed: "还不能确认这次保存，请检查网络后重试。",
  saveOutdated: "原操作已经失效，不能安全重试。可以使用已保存版本；已保存的消息不会重新生成。",
  closed: "原记录已被修改、删除，或故事已继续。可以展开下方说明，在当前位置补记。"
}, xa = ["disabled"], Da = ["disabled"], Ta = ["disabled"], Na = /* @__PURE__ */ Z({
  __name: "MessagesSettings",
  props: {
    settings: {},
    busy: { type: Boolean }
  },
  emits: ["save"],
  setup(a, { emit: h }) {
    const s = a, f = h, r = Ue({ ...s.settings });
    return (b, d) => (l(), n("form", {
      class: "messages-settings",
      onSubmit: d[3] || (d[3] = ve((o) => f("save", { ...r }), ["prevent"]))
    }, [
      e("fieldset", { disabled: a.busy }, [
        d[6] || (d[6] = e("legend", null, "对方的回复", -1)),
        e("label", null, [d[4] || (d[4] = e("span", null, "允许对方发图片", -1)), X(e("input", {
          "onUpdate:modelValue": d[0] || (d[0] = (o) => r.imagePrompt = o),
          type: "checkbox"
        }, null, 512), [[ke, r.imagePrompt]])]),
        e("label", null, [d[5] || (d[5] = e("span", null, "允许对方发语音", -1)), X(e("input", {
          "onUpdate:modelValue": d[1] || (d[1] = (o) => r.voicePrompt = o),
          type: "checkbox"
        }, null, 512), [[ke, r.voicePrompt]])])
      ], 8, xa),
      e("fieldset", { disabled: a.busy }, [e("legend", null, g(O(V).title), 1), e("label", null, [e("span", null, g(O(V).setting), 1), X(e("input", {
        "onUpdate:modelValue": d[2] || (d[2] = (o) => r.syncNoticeEnabled = o),
        type: "checkbox"
      }, null, 512), [[ke, r.syncNoticeEnabled]])])], 8, Da),
      e("button", {
        type: "submit",
        class: "messages-primary",
        disabled: a.busy
      }, g(a.busy ? "请稍候…" : "保存设置"), 9, Ta)
    ], 32));
  }
}), Ra = Na, qa = ["src", "alt"], La = {
  key: 2,
  class: "messages-image-placeholder",
  role: "status",
  "aria-live": "polite"
}, Pa = {
  key: 4,
  class: "messages-image-placeholder messages-media-unavailable"
}, Ua = {
  key: 5,
  class: "messages-image-caption"
}, Fa = {
  key: 6,
  class: "messages-media-error",
  role: "status"
}, Va = ["src", "alt"], Oa = /* @__PURE__ */ Z({
  __name: "MessageImage",
  props: {
    message: {},
    bridge: {},
    chatIdentity: {},
    available: { type: Boolean }
  },
  emits: ["resize"],
  setup(a, { emit: h }) {
    const s = a, f = h, r = $(null), b = $(!1), d = $(""), o = $(""), E = $(""), w = $(""), I = $(!1), S = $(!1), D = x(() => s.message.payload.type === "image" ? s.message.payload.attachment : void 0), p = x(() => s.message.payload.type === "image" ? s.message.payload.description : ""), i = x(() => D.value?.path || d.value);
    let k = null;
    function m() {
      const B = w.value;
      w.value = "", B && s.bridge.post("messages/image/cancel", {
        chatIdentity: s.chatIdentity,
        mediaRequestId: B
      });
    }
    async function c() {
      if (w.value) return;
      if (i.value) {
        I.value = !1;
        return;
      }
      if (!s.available) return;
      const B = `image-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      w.value = B, o.value = "", E.value = "正在读取图片…";
      try {
        const { result: y } = await s.bridge.request("messages/image/generate", {
          chatIdentity: s.chatIdentity,
          messageId: s.message.id,
          mediaRequestId: B
        }, 18e4);
        if (w.value !== B) return;
        if (!y.data) throw new Error("画图暂不可用，请开启画图后重试。");
        d.value = y.data, I.value = !1;
      } catch (y) {
        if (w.value !== B) return;
        const q = y instanceof Error ? y.message : "";
        o.value = q === "host_request_timeout" ? "等待图片超过3分钟，已取消本次请求，可重试。" : q || "图片加载失败，请重试。", m();
      } finally {
        w.value === B && (w.value = "");
      }
    }
    const M = s.bridge.subscribe((B) => {
      if (B.type !== "messages/image-progress") return;
      const y = B.payload;
      if (!(!w.value || y.mediaRequestId !== w.value))
        if (y.status === "queued") {
          const q = Math.max(0, Number(y.ahead) || 0);
          E.value = q ? `排队中，前方 ${q} 张` : "已进入图片队列";
        } else y.status === "generating" ? E.value = "正在生成图片…" : y.status === "cooldown" && (E.value = y.delay ? `等待 ${Math.ceil(y.delay / 1e3)} 秒后继续` : "等待继续生成…");
    });
    return na(() => {
      if (!D.value) {
        if (typeof IntersectionObserver > "u") {
          b.value = !0;
          return;
        }
        k = new IntersectionObserver((B) => {
          b.value = B.some((y) => y.isIntersecting);
        }, { root: r.value?.closest(".messages-thread-scroll") ?? null }), r.value && k.observe(r.value);
      }
    }), we([b, () => s.available], ([B, y]) => {
      B && y && !i.value && !o.value && c();
    }), ua(() => {
      k?.disconnect(), M(), m();
    }), (B, y) => (l(), n("div", {
      ref_key: "root",
      ref: r
    }, [
      i.value && !I.value ? (l(), n("button", {
        key: 0,
        class: "messages-image-open",
        "aria-label": "放大图片",
        onClick: y[2] || (y[2] = (q) => S.value = !0)
      }, [e("img", {
        src: i.value,
        alt: p.value || D.value?.name || "图片",
        onLoad: y[0] || (y[0] = (q) => f("resize")),
        onError: y[1] || (y[1] = (q) => I.value = !0)
      }, null, 40, qa)])) : I.value ? (l(), n("button", {
        key: 1,
        class: "messages-image-placeholder",
        onClick: c
      }, [
        A(N, { name: "image" }),
        y[5] || (y[5] = e("span", null, "图片暂时无法显示", -1)),
        y[6] || (y[6] = e("small", null, "点击重新加载", -1))
      ])) : w.value ? (l(), n("div", La, [A(N, { name: "image" }), e("span", null, g(E.value), 1)])) : a.available ? (l(), n("button", {
        key: 3,
        class: "messages-image-placeholder",
        onClick: c
      }, [A(N, { name: "image" }), e("span", null, g(o.value ? "重试加载图片" : "图片"), 1)])) : (l(), n("div", Pa, [
        A(N, { name: "image" }),
        y[7] || (y[7] = e("span", null, "图片描述", -1)),
        y[8] || (y[8] = e("small", null, "开启画图后自动加载", -1))
      ])),
      p.value ? (l(), n("p", Ua, g(p.value), 1)) : C("", !0),
      o.value ? (l(), n("small", Fa, g(o.value), 1)) : C("", !0),
      S.value ? (l(), oe(Ve, {
        key: 7,
        class: "messages-image-viewer",
        "aria-label": "查看图片",
        onClose: y[4] || (y[4] = (q) => S.value = !1)
      }, {
        default: Le(() => [e("button", {
          "aria-label": "关闭图片",
          onClick: y[3] || (y[3] = (q) => S.value = !1)
        }, [A(N, { name: "close" })]), i.value ? (l(), n("img", {
          key: 0,
          src: i.value,
          alt: p.value || D.value?.name || "图片"
        }, null, 8, Va)) : C("", !0)]),
        _: 1
      })) : C("", !0)
    ], 512));
  }
}), za = Oa, Ga = ["data-message-id"], Ha = {
  class: "messages-bubble-actions",
  role: "group",
  "aria-label": "消息操作"
}, Za = ["disabled", "title"], Ka = ["disabled"], ja = { key: 0 }, Ya = ["disabled", "aria-label"], Xa = {
  key: 0,
  class: "messages-media-unavailable-note"
}, Ja = {
  key: 2,
  class: "messages-transcript"
}, _a = {
  key: 3,
  class: "messages-media-error",
  role: "status"
}, Qa = /* @__PURE__ */ Z({
  __name: "MessageBubble",
  props: {
    message: {},
    bridge: {},
    chatIdentity: {},
    media: {},
    disabled: { type: Boolean },
    selected: { type: Boolean },
    permission: {}
  },
  emits: [
    "resize",
    "select",
    "deleteMessage",
    "regenerate"
  ],
  setup(a, { emit: h }) {
    const s = a, f = h;
    function r(i) {
      i.target.closest("button, a, dialog") || window.getSelection()?.toString() || f("select", s.message.id);
    }
    const b = $(""), d = $(""), o = $(!1), E = x(() => [
      "playing",
      "loading",
      "generating",
      "queued"
    ].includes(d.value)), w = $(!1);
    let I = !0;
    const S = (i) => s.bridge.request(i, {
      chatIdentity: s.chatIdentity,
      messageId: s.message.id
    }, 18e4);
    async function D() {
      if (w.value) return;
      b.value = "";
      const i = E.value;
      if (!(!i && !s.media.voice))
        try {
          i ? (w.value = !0, await S("messages/voice/stop"), I && (d.value = "")) : (d.value = "loading", await S("messages/voice/play"));
        } catch {
          I && (i || (d.value = ""), b.value = i ? "未能确认停止，请再点一次停止。" : "语音暂时无法播放，原文仍可查看。");
        } finally {
          I && (w.value = !1);
        }
    }
    const p = s.bridge.subscribe((i) => {
      if (i.type !== "messages/voice-state") return;
      const k = i.payload;
      k.messageId === s.message.id ? d.value = k.status : k.status === "playing" && (d.value = ""), k.messageId === s.message.id && k.status === "error" && (b.value = "播放失败，点击可以重试。");
    });
    return Ce(() => {
      I = !1, p(), E.value && S("messages/voice/stop").catch(() => {
      });
    }), (i, k) => (l(), n("article", {
      class: W(["messages-bubble-row", {
        outgoing: a.message.sender === "user",
        "actions-selected": a.selected
      }]),
      "data-message-id": a.message.id,
      tabindex: "0",
      "aria-label": "消息操作",
      onClick: r,
      onFocus: k[4] || (k[4] = (m) => f("select", a.message.id))
    }, [e("div", Ha, [e("button", {
      disabled: a.disabled,
      title: a.permission?.reason,
      class: W({ "is-unavailable": a.permission?.reason }),
      "aria-haspopup": "dialog",
      onClick: k[0] || (k[0] = (m) => i.$emit("deleteMessage", a.message.id))
    }, "删除", 10, Za), a.permission?.regenerate ? (l(), n("button", {
      key: 0,
      disabled: a.disabled,
      onClick: k[1] || (k[1] = (m) => i.$emit("regenerate", a.message.id))
    }, "重新回复", 8, Ka)) : C("", !0)]), e("div", { class: W(["messages-bubble", `messages-bubble-${a.message.payload.type}`]) }, [a.message.payload.type === "text" ? (l(), n("p", ja, g(a.message.payload.text), 1)) : a.message.payload.type === "image" ? (l(), oe(za, {
      key: 1,
      message: a.message,
      bridge: a.bridge,
      "chat-identity": a.chatIdentity,
      available: a.media.image,
      onResize: k[2] || (k[2] = (m) => i.$emit("resize"))
    }, null, 8, [
      "message",
      "bridge",
      "chat-identity",
      "available"
    ])) : (l(), n(T, { key: 2 }, [
      e("button", {
        class: "messages-voice-button",
        disabled: w.value || !a.media.voice && !E.value,
        "aria-label": E.value ? "停止播放" : "播放语音",
        onClick: D
      }, [
        A(N, { name: E.value ? "stop" : "play" }, null, 8, ["name"]),
        e("span", { class: W(["messages-wave", { playing: d.value === "playing" }]) }, [(l(), n(T, null, be(16, (m) => e("i", {
          key: m,
          style: Ie({
            height: `${8 + m * 7 % 17}px`,
            animationDelay: `${m * 45}ms`
          })
        }, null, 4)), 64))], 2),
        e("small", null, g(w.value ? "停止中" : [
          "loading",
          "generating",
          "queued"
        ].includes(d.value) ? "准备中" : "语音"), 1)
      ], 8, Ya),
      a.media.voice ? C("", !0) : (l(), n("small", Xa, "开启 TTS 后可播放")),
      a.media.voice ? (l(), n("button", {
        key: 1,
        class: "messages-transcript-toggle",
        onClick: k[3] || (k[3] = (m) => o.value = !o.value)
      }, g(o.value ? "收起原文" : "查看原文"), 1)) : C("", !0),
      o.value || !a.media.voice ? (l(), n("p", Ja, g(a.message.payload.transcript), 1)) : C("", !0)
    ], 64)), b.value ? (l(), n("small", _a, g(b.value), 1)) : C("", !0)], 2)], 42, Ga));
  }
}), Wa = Qa, es = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif"
], Ft = 4 * 1024 * 1024;
async function as(a) {
  if (!es.includes(a.type)) throw new Error("请选择 PNG、JPG、WEBP 或 GIF 图片。");
  if (!a.size || a.size > 4194304) throw new Error("请选择不超过 4MB 的图片。");
  const h = await new Promise((f, r) => {
    const b = new FileReader();
    b.onerror = () => r(/* @__PURE__ */ new Error("图片读取失败，请重新选择。")), b.onload = () => typeof b.result == "string" ? f(b.result) : r(/* @__PURE__ */ new Error("图片读取失败。")), b.readAsDataURL(a);
  }), s = new Image();
  s.src = h;
  try {
    await s.decode();
  } catch {
    throw new Error("这张图片无法打开，请换一张。");
  }
  return {
    dataUrl: h,
    name: a.name.replace(/[\u0000-\u001f\u007f]/gu, "").trim().slice(0, 120) || "图片"
  };
}
var ss = {
  key: 0,
  class: "messages-attachment-preview"
}, ts = ["src", "alt"], ls = ["disabled"], ns = {
  key: 1,
  class: "messages-composer-hint"
}, is = {
  key: 2,
  class: "messages-composer-hint",
  role: "status"
}, us = {
  key: 3,
  class: "messages-composer-wait",
  role: "status"
}, os = { class: "messages-composer-line" }, rs = ["disabled"], ds = ["placeholder", "disabled"], vs = ["disabled"], gs = /* @__PURE__ */ Z({
  __name: "MessageComposer",
  props: /* @__PURE__ */ ce({
    disabled: { type: Boolean },
    sending: { type: Boolean },
    waitingFor: {}
  }, {
    draft: { required: !0 },
    draftModifiers: {}
  }),
  emits: /* @__PURE__ */ ce(["send"], ["update:draft"]),
  setup(a, { emit: h }) {
    const s = a, f = h, r = qe(a, "draft"), b = x({
      get: () => r.value.text,
      set: (i) => {
        r.value = {
          ...r.value,
          text: i
        };
      }
    }), d = $(null), o = $(!1), E = $("");
    let w = !0;
    async function I(i) {
      const k = i.target, m = k.files?.[0];
      if (k.value = "", !(!m || s.sending || o.value)) {
        o.value = !0, E.value = "";
        try {
          const c = await as(m);
          w && (r.value = {
            ...r.value,
            image: c
          });
        } catch (c) {
          w && (E.value = c instanceof Error ? c.message : "图片读取失败，请重新选择。");
        } finally {
          w && (o.value = !1);
        }
      }
    }
    function S() {
      r.value = {
        ...r.value,
        image: null
      }, E.value = "";
    }
    function D() {
      const i = b.value.trim();
      !i && !r.value.image || s.disabled || o.value || f("send", r.value.image ? {
        type: "image",
        description: i,
        upload: { ...r.value.image }
      } : {
        type: "text",
        text: i
      });
    }
    Ce(() => {
      w = !1;
    });
    function p(i) {
      i.key === "Enter" && (i.ctrlKey || i.metaKey) && !i.isComposing && (i.preventDefault(), D());
    }
    return (i, k) => (l(), n("form", {
      class: "messages-composer",
      onSubmit: ve(D, ["prevent"])
    }, [
      e("input", {
        ref_key: "fileInput",
        ref: d,
        type: "file",
        accept: "image/png,image/jpeg,image/webp,image/gif",
        hidden: "",
        "aria-label": "选择图片文件",
        onChange: I
      }, null, 544),
      r.value.image ? (l(), n("div", ss, [
        e("img", {
          src: r.value.image.dataUrl,
          alt: r.value.image.name
        }, null, 8, ts),
        e("span", null, [k[2] || (k[2] = e("strong", null, "待发送的图片", -1)), e("small", null, g(r.value.image.name), 1)]),
        e("button", {
          type: "button",
          class: "messages-icon-button",
          "aria-label": "移除图片",
          disabled: a.sending || o.value,
          onClick: S
        }, [A(N, { name: "close" })], 8, ls)
      ])) : C("", !0),
      r.value.image ? (l(), n("p", ns, "图片将随消息发送，需要当前模型支持看图。")) : C("", !0),
      o.value || E.value ? (l(), n("p", is, g(o.value ? "正在读取图片…" : E.value), 1)) : C("", !0),
      a.waitingFor ? (l(), n("p", us, "正在等待 " + g(a.waitingFor) + " 的回复。可以先写好，稍后发送。", 1)) : C("", !0),
      e("div", os, [
        e("button", {
          type: "button",
          class: "messages-icon-button messages-attach",
          "aria-label": "选择图片",
          disabled: a.sending || o.value,
          onClick: k[0] || (k[0] = (m) => d.value?.click())
        }, [A(N, { name: "plus" })], 8, rs),
        X(e("textarea", {
          "onUpdate:modelValue": k[1] || (k[1] = (m) => b.value = m),
          rows: "1",
          maxlength: "4000",
          placeholder: r.value.image ? "给图片配句话…" : "说点什么…",
          "aria-label": "消息内容",
          disabled: a.sending,
          onKeydown: p
        }, null, 40, ds), [[ue, b.value]]),
        e("button", {
          class: "messages-send",
          type: "submit",
          disabled: a.disabled || o.value || !b.value.trim() && !r.value.image,
          "aria-label": "发送"
        }, [A(N, { name: "send" })], 8, vs)
      ])
    ], 32));
  }
}), ms = gs, cs = {
  class: "messages-delivery",
  role: "status"
}, ys = { key: 0 }, bs = ["disabled"], fs = ["disabled"], ps = /* @__PURE__ */ Z({
  __name: "DeliveryStatus",
  props: {
    sending: { type: Boolean },
    error: {},
    pendingSave: { type: Boolean },
    disabled: { type: Boolean },
    discard: { type: Boolean }
  },
  emits: ["retry", "discard"],
  setup(a) {
    return (h, s) => (l(), n("div", cs, [a.sending ? (l(), n("span", ys, "发送中…")) : (l(), n(T, { key: 1 }, [
      e("span", null, g(a.error || (a.pendingSave ? "还不确定是否保存成功" : "尚未收到回复")), 1),
      e("button", {
        disabled: a.disabled,
        onClick: s[0] || (s[0] = (f) => h.$emit("retry"))
      }, g(a.pendingSave ? "检查并重试" : "重试"), 9, bs),
      a.discard && !a.pendingSave ? (l(), n("button", {
        key: 0,
        disabled: a.disabled,
        onClick: s[1] || (s[1] = (f) => h.$emit("discard"))
      }, "删除", 8, fs)) : C("", !0)
    ], 64))]));
  }
}), Ne = ps, ks = 158e3, $s = 128e3, Re = 6e3;
function hs(a) {
  return String(a ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/{/g, "&#123;").replace(/}/g, "&#125;");
}
var ws = ["aria-label", "aria-expanded"], Cs = {
  key: 0,
  class: "messages-context-popover",
  "aria-label": "上下文用量"
}, Is = { class: "messages-context-total" }, Ms = {
  key: 1,
  role: "status"
}, Ss = { key: 3 }, Es = /* @__PURE__ */ Z({
  __name: "MessageContextButton",
  props: {
    bridge: {},
    state: {},
    contactId: {},
    draft: {}
  },
  setup(a) {
    const h = a, s = $(!1), f = $(!1), r = $(!1), b = $(0), d = $(null);
    Fe(() => (s.value = !1, !0), () => s.value), we(() => JSON.stringify([
      h.contactId,
      h.state.chatIdentity,
      h.state.revision,
      h.state.boundary,
      h.state.settings.imagePrompt,
      h.state.settings.voicePrompt,
      !!h.state.busy,
      h.state.generationActive,
      b.value
    ]), async (D, p, i) => {
      let k = !0;
      if (i(() => {
        k = !1;
      }), f.value = !0, r.value = !1, h.state.busy || h.state.generationActive) return;
      const m = h.state.revision, c = h.state.boundary;
      try {
        const M = await h.bridge.request("messages/context", {
          chatIdentity: h.state.chatIdentity,
          contactId: h.contactId
        }, 6e4);
        if (!k) return;
        if (M.result.revision !== m || M.result.boundary !== c) throw new Error("stale");
        d.value = M.result.stats;
      } catch {
        k && (r.value = !0, d.value = null);
      } finally {
        k && (f.value = !1);
      }
    }, { immediate: !0 });
    const o = x(() => da(hs(h.draft.text))), E = x(() => (d.value?.imageTokens ?? 0) + (h.draft.image ? Re : 0)), w = x(() => (d.value?.usedTokens ?? 0) + o.value + (h.draft.image ? Re : 0)), I = x(() => Math.min(1, w.value / ks)), S = (D) => `${(D / 1e3).toFixed(1)}k`;
    return (D, p) => (l(), n("div", {
      class: "messages-context",
      onKeydown: p[3] || (p[3] = Pe(ve((i) => s.value = !1, ["stop"]), ["esc"]))
    }, [e("button", {
      type: "button",
      class: W(["messages-context-ring", { "is-warning": w.value >= O($s) }]),
      style: Ie({ "--context-fill": `${d.value ? I.value * 360 : 0}deg` }),
      "aria-label": d.value ? `上下文：约 ${S(w.value)} / 158k` : "上下文用量",
      "aria-expanded": s.value,
      title: "上下文",
      onClick: p[0] || (p[0] = (i) => s.value = !s.value)
    }, [e("span", null, g(f.value ? "…" : r.value || !d.value ? "—" : ""), 1)], 14, ws), s.value ? (l(), n("section", Cs, [
      e("header", null, [p[4] || (p[4] = e("strong", null, "上下文", -1)), e("button", {
        type: "button",
        "aria-label": "关闭上下文用量",
        onClick: p[1] || (p[1] = (i) => s.value = !1)
      }, "×")]),
      d.value ? (l(), n(T, { key: 0 }, [e("p", Is, "约 " + g(S(w.value)) + " / 158k", 1), e("dl", null, [
        p[6] || (p[6] = e("dt", null, "剧情与设定", -1)),
        e("dd", null, g(S(d.value.backgroundTokens)), 1),
        p[7] || (p[7] = e("dt", null, "通讯摘要", -1)),
        e("dd", null, g(S(d.value.summaryTokens)), 1),
        p[8] || (p[8] = e("dt", null, "通讯原文", -1)),
        e("dd", null, g(S(d.value.historyTokens)), 1),
        p[9] || (p[9] = e("dt", null, "提示词与输入", -1)),
        e("dd", null, g(S(d.value.promptTokens + o.value)), 1),
        E.value ? (l(), n(T, { key: 0 }, [p[5] || (p[5] = e("dt", null, "图片预留", -1)), e("dd", null, g(S(E.value)), 1)], 64)) : C("", !0)
      ])], 64)) : C("", !0),
      f.value ? (l(), n("p", Ms, g(a.state.busy?.stage === "summarizing" ? "正在总结较早通讯…" : a.state.busy || a.state.generationActive ? "本轮结束后更新用量。" : "正在读取…"), 1)) : r.value ? (l(), n(T, { key: 2 }, [p[10] || (p[10] = e("p", { role: "status" }, "用量暂时无法读取。", -1)), e("button", {
        type: "button",
        class: "messages-secondary",
        onClick: p[2] || (p[2] = (i) => b.value++)
      }, "重试")], 64)) : C("", !0),
      p[11] || (p[11] = e("p", null, "128k 时在下次回复前自动总结，保留近期原文。", -1)),
      E.value ? (l(), n("small", Ss, "图片按每张 6k 预留，实际用量由模型决定。")) : C("", !0)
    ])) : C("", !0)], 32));
  }
}), Bs = Es, As = { class: "messages-conversation" }, xs = { class: "messages-thread-header" }, Ds = { class: "messages-thread-heading" }, Ts = ["disabled"], Ns = {
  key: 1,
  class: "messages-thread-start"
}, Rs = {
  key: 0,
  class: "messages-time"
}, qs = { class: "messages-bubble-row outgoing" }, Ls = { key: 0 }, Ps = ["src", "alt"], Us = {
  key: 0,
  class: "messages-image-caption"
}, Fs = {
  key: 3,
  class: "messages-typing",
  role: "status"
}, Vs = /* @__PURE__ */ Z({
  __name: "Conversation",
  props: /* @__PURE__ */ ce({
    contextState: {},
    contact: {},
    page: {},
    bridge: {},
    chatIdentity: {},
    disabled: { type: Boolean },
    sendDisabled: { type: Boolean },
    busy: {},
    outgoing: {},
    sendFailure: {},
    sendError: {},
    working: { type: Boolean },
    pendingSave: { type: Boolean },
    retryDisabled: { type: Boolean },
    loading: { type: Boolean },
    loadMore: { type: Function },
    media: {},
    waitingFor: {}
  }, {
    draft: { required: !0 },
    draftModifiers: {}
  }),
  emits: /* @__PURE__ */ ce([
    "back",
    "details",
    "send",
    "retry",
    "discard",
    "deleteMessage",
    "regenerate",
    "latest"
  ], ["update:draft"]),
  setup(a, { expose: h }) {
    const s = qe(a, "draft"), f = a, r = $("");
    function b(m) {
      m.target.closest(".messages-bubble-row") || (r.value = "");
    }
    const d = x(() => f.busy?.contactId === f.contact.id ? f.busy.stage : ""), o = x(() => [
      "replying",
      "summarizing",
      "saving-reply"
    ].includes(d.value));
    function E(m) {
      return [f.sendFailure, f.sendError].find((c) => c?.contactId === f.contact.id && c.messageId === m)?.message;
    }
    const w = $(null);
    let I = !0, S = !1, D = null;
    oa(() => {
      D = null;
      const m = w.value;
      if (!m || I && !S && !f.page.hasNewer) return;
      const c = new Set(f.page.messages.map((B) => B.id)), M = [...m.querySelectorAll("[data-message-id]")].find((B) => c.has(B.dataset.messageId) && B.getBoundingClientRect().bottom > m.getBoundingClientRect().top);
      M && (D = {
        id: M.dataset.messageId,
        offset: M.getBoundingClientRect().top - m.getBoundingClientRect().top
      });
    }), ia(() => {
      const m = w.value;
      if (m)
        if (D) {
          const c = [...m.querySelectorAll("[data-message-id]")].find((M) => M.dataset.messageId === D.id);
          c && (m.scrollTop += c.getBoundingClientRect().top - m.getBoundingClientRect().top - D.offset), D = null;
        } else I && !S && !f.page.hasNewer && (m.scrollTop = m.scrollHeight);
    });
    function p() {
      const m = w.value;
      m && (I = m.scrollHeight - m.clientHeight - m.scrollTop < 70);
    }
    async function i() {
      await he(), I && !S && !f.page.hasNewer && w.value && (w.value.scrollTop = w.value.scrollHeight);
    }
    we(() => [
      f.page.messages.at(-1)?.id,
      f.outgoing?.messageId,
      d.value,
      f.sendFailure,
      f.sendError
    ], i, { immediate: !0 });
    async function k() {
      if (!(!w.value || S)) {
        S = !0;
        try {
          await f.loadMore(), await he();
        } finally {
          S = !1, p();
        }
      }
    }
    return h({ sent() {
      I = !0, i();
    } }), (m, c) => (l(), n("section", As, [
      e("header", xs, [
        e("button", {
          class: "messages-icon-button",
          "aria-label": "返回信息",
          onClick: c[0] || (c[0] = (M) => m.$emit("back"))
        }, [A(N, { name: "back" })]),
        A(ye, {
          identity: a.contact.id,
          name: a.contact.name,
          small: ""
        }, null, 8, ["identity", "name"]),
        e("div", Ds, [e("h2", null, g(a.contact.name), 1)]),
        A(Bs, {
          bridge: a.bridge,
          state: a.contextState,
          "contact-id": a.contact.id,
          draft: s.value
        }, null, 8, [
          "bridge",
          "state",
          "contact-id",
          "draft"
        ]),
        e("button", {
          class: "messages-icon-button",
          "aria-label": "联系人详情",
          onClick: c[1] || (c[1] = (M) => m.$emit("details"))
        }, [A(N, { name: "more" })])
      ]),
      e("div", {
        ref_key: "scroller",
        ref: w,
        class: "messages-thread-scroll",
        onScroll: p,
        onClick: b,
        onKeydown: c[7] || (c[7] = Pe((M) => r.value = "", ["esc"]))
      }, [
        c[12] || (c[12] = e("p", { class: "messages-subtle messages-context-hint" }, "对话参考角色设定、世界书、近期剧情及可用总结。", -1)),
        a.page.hasMore ? (l(), n("button", {
          key: 0,
          class: "messages-older",
          disabled: a.loading,
          onClick: k
        }, g(a.loading ? "读取中…" : "查看更早的消息"), 9, Ts)) : C("", !0),
        a.loading && !a.page.messages.length ? (l(), n("p", Ns, "正在读取消息…")) : C("", !0),
        (l(!0), n(T, null, be(a.page.messages, (M, B) => (l(), n(T, { key: M.id }, [
          B === 0 || M.createdAt - a.page.messages[B - 1].createdAt > 3e5 ? (l(), n("time", Rs, g(new Date(M.createdAt).toLocaleString(void 0, {
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          })), 1)) : C("", !0),
          A(Wa, {
            message: M,
            bridge: a.bridge,
            "chat-identity": a.chatIdentity,
            media: a.media,
            disabled: a.disabled,
            selected: r.value === M.id,
            permission: a.page.permissions[M.id],
            onSelect: c[2] || (c[2] = (y) => r.value = y),
            onResize: i,
            onDeleteMessage: c[3] || (c[3] = (y) => m.$emit("deleteMessage", y)),
            onRegenerate: c[4] || (c[4] = (y) => m.$emit("regenerate", y))
          }, null, 8, [
            "message",
            "bridge",
            "chat-identity",
            "media",
            "disabled",
            "selected",
            "permission"
          ]),
          M.id === a.page.retryMessageId && !o.value ? (l(), oe(Ne, {
            key: 1,
            sending: a.busy?.messageId === M.id && ["saving", "uploading"].includes(d.value),
            error: E(M.id),
            "pending-save": a.pendingSave,
            disabled: a.retryDisabled,
            onRetry: (y) => m.$emit("retry", M.id)
          }, null, 8, [
            "sending",
            "error",
            "pending-save",
            "disabled",
            "onRetry"
          ])) : C("", !0)
        ], 64))), 128)),
        a.outgoing ? (l(), n(T, { key: 2 }, [e("div", qs, [e("div", { class: W(["messages-bubble", { "messages-bubble-image": a.outgoing.payload.type === "image" }]) }, [a.outgoing.payload.type === "text" ? (l(), n("p", Ls, g(a.outgoing.payload.text), 1)) : (l(), n(T, { key: 1 }, [e("img", {
          class: "messages-pending-image",
          src: a.outgoing.payload.upload.dataUrl,
          alt: a.outgoing.payload.upload.name,
          onLoad: i
        }, null, 40, Ps), a.outgoing.payload.description ? (l(), n("p", Us, g(a.outgoing.payload.description), 1)) : C("", !0)], 64))], 2)]), A(Ne, {
          sending: a.working || a.busy?.messageId === a.outgoing.messageId,
          error: E(a.outgoing.messageId) || "发送未完成",
          "pending-save": a.pendingSave,
          disabled: a.retryDisabled,
          discard: "",
          onRetry: c[5] || (c[5] = (M) => m.$emit("retry", a.outgoing.messageId)),
          onDiscard: c[6] || (c[6] = (M) => m.$emit("discard", a.outgoing.messageId))
        }, null, 8, [
          "sending",
          "error",
          "pending-save",
          "disabled"
        ])], 64)) : C("", !0),
        o.value ? (l(), n("div", Fs, [...c[11] || (c[11] = [e("span", null, [
          e("i"),
          e("i"),
          e("i")
        ], -1), le("对方正在输入…", -1)])])) : C("", !0)
      ], 544),
      a.page.hasNewer ? (l(), n("button", {
        key: 0,
        class: "messages-latest",
        onClick: c[8] || (c[8] = (M) => {
          ra(I) ? I.value = !0 : I = !0, m.$emit("latest");
        })
      }, "回到最新消息")) : C("", !0),
      A(ms, {
        draft: s.value,
        "onUpdate:draft": c[9] || (c[9] = (M) => s.value = M),
        disabled: a.sendDisabled,
        sending: !1,
        "waiting-for": a.waitingFor,
        onSend: c[10] || (c[10] = (M) => m.$emit("send", M))
      }, null, 8, [
        "draft",
        "disabled",
        "waiting-for"
      ])
    ]));
  }
}), Os = Vs, zs = () => ({
  text: "",
  image: null
});
function $e() {
  return Array.from(globalThis.crypto.getRandomValues(new Uint8Array(16)), (a) => a.toString(16).padStart(2, "0")).join("");
}
var Gs = Object.freeze({ chooseConversation: "选择一个对话" }), Hs = { class: "messages-app" }, Zs = {
  key: 0,
  class: "messages-banner",
  role: "status"
}, Ks = { class: "messages-save-actions" }, js = ["disabled"], Ys = ["disabled"], Xs = {
  key: 1,
  class: "messages-banner",
  role: "status"
}, Js = { key: 0 }, _s = { class: "messages-save-actions" }, Qs = ["disabled"], Ws = ["disabled"], et = {
  key: 2,
  class: "messages-notice"
}, at = {
  key: 3,
  class: "messages-error",
  role: "alert"
}, st = {
  key: 4,
  class: "messages-banner",
  role: "alert"
}, tt = ["disabled"], lt = {
  key: 1,
  class: "messages-selection"
}, nt = { id: "messages-dialog-title" }, it = ["disabled"], ut = {
  key: 0,
  class: "messages-error",
  role: "alert"
}, ot = ["disabled"], rt = { class: "messages-search" }, dt = ["aria-busy"], vt = {
  key: 0,
  class: "messages-subtle",
  role: "status"
}, gt = { key: 1 }, mt = ["disabled"], ct = ["disabled", "onClick"], yt = { key: 0 }, bt = {
  key: 0,
  class: "messages-subtle"
}, ft = { class: "messages-manual" }, pt = ["disabled"], kt = ["disabled"], $t = ["disabled"], ht = {
  key: 0,
  role: "status"
}, wt = { key: 1 }, Ct = ["disabled"], It = {
  key: 0,
  role: "status"
}, Mt = { key: 1 }, St = ["disabled"], Et = ["disabled"], Bt = ["disabled"], At = { class: "messages-manual" }, xt = ["disabled"], Dt = ["disabled"], Tt = ["disabled"], Nt = ["disabled"], Rt = ["disabled"], qt = /* @__PURE__ */ Z({
  __name: "MessagesApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(a) {
    const h = a, s = $(h.initialState), f = (u = "") => ({
      contactId: u,
      messages: [],
      hasMore: !1,
      hasNewer: !1,
      retryMessageId: null,
      revision: "",
      permissions: {}
    }), r = $(""), b = $(f()), d = $(!1), o = $(!1), E = $(!1), w = $(!1), I = $(""), S = $(""), D = $(null), p = $(!1), i = $("add"), k = x(() => p.value && (i.value === "sync" || i.value === "recover")), m = $(null), c = x(() => s.value.syncNotice.messageIds.length), M = $(""), B = $(""), y = x(() => i.value === "delete" ? G.value?.deleteReason ?? "" : b.value.permissions[M.value]?.reason ?? ""), q = $(""), ee = $(""), re = $(""), J = $("ready"), ge = $($e());
    let j = !0, ne = 0, ae = 0;
    const ie = Ue(/* @__PURE__ */ new Map()), Me = x({
      get: () => ie.get(r.value) ?? zs(),
      set: (u) => {
        ie.set(r.value, u);
      }
    }), L = $(null), Y = $(null), se = x(() => s.value.outgoing ?? L.value), Oe = x(() => se.value?.contactId === r.value && !b.value.messages.some((u) => u.id === se.value?.messageId) ? se.value : null), G = x(() => s.value.contacts.find((u) => u.id === r.value)), ze = x(() => s.value.busy && s.value.busy.contactId !== r.value ? s.value.contacts.find((u) => u.id === s.value.busy?.contactId)?.name ?? "另一位联系人" : ""), de = x(() => s.value.pendingSave || s.value.pendingModification || [
      "unconfirmed",
      "conflict",
      "failed"
    ].includes(s.value.fileState)), U = x(() => o.value || !!s.value.busy || s.value.operationPending || de.value || s.value.fileState !== "ready" || s.value.generationActive), Se = x(() => s.value.knownPeople.filter((u) => !s.value.contacts.some((t) => t.name === u.name) && `${u.name} ${u.aliases.join(" ")}`.toLocaleLowerCase().includes(re.value.toLocaleLowerCase())));
    async function R(u, t = {}) {
      return (await h.bridge.request(u, {
        chatIdentity: s.value.chatIdentity,
        ...t
      }, 6e4)).result;
    }
    async function _(u = !1, t = !1) {
      const v = r.value;
      if (!v) return;
      const z = ++ne;
      d.value = !0, S.value = "";
      try {
        const H = b.value, Q = await R("messages/thread", {
          contactId: v,
          ...u ? {
            before: H.messages[0]?.seq,
            revision: H.revision
          } : !t && H.messages.length ? { window: {
            first: H.messages[0].seq,
            last: H.messages.at(-1).seq,
            latest: !H.hasNewer
          } } : {}
        });
        if (!j || z !== ne || r.value !== v || Q.revision !== s.value.revision) return;
        const fe = u && H.revision === Q.revision, pe = fe ? [...Q.messages, ...H.messages].slice(0, 100) : Q.messages;
        b.value = {
          ...Q,
          messages: pe,
          hasNewer: fe ? pe.at(-1)?.id !== H.messages.at(-1)?.id || H.hasNewer : Q.hasNewer,
          permissions: fe ? {
            ...H.permissions,
            ...Q.permissions
          } : Q.permissions
        }, L.value?.contactId === v && pe.some((la) => la.id === L.value?.messageId) && (L.value = null, Y.value = null);
      } catch {
        j && z === ne && r.value === v && (S.value = "消息暂时无法读取。");
      } finally {
        z === ne && (d.value = !1);
      }
    }
    function P(u) {
      if (!j || u.chatIdentity !== s.value.chatIdentity) return;
      const t = s.value.revision !== u.revision || s.value.boundary !== u.boundary || s.value.fileState !== u.fileState || s.value.pendingSave !== u.pendingSave;
      s.value = u, L.value && (u.outgoing?.messageId === L.value.messageId || u.busy?.messageId === L.value.messageId || u.contacts.some((v) => v.lastMessageId === L.value.messageId)) && (L.value = null, Y.value = null);
      for (const v of ie.keys()) u.contacts.some((z) => z.id === v) || ie.delete(v);
      L.value && !u.contacts.some((v) => v.id === L.value?.contactId) && (L.value = null, Y.value = null), r.value && !u.contacts.some((v) => v.id === r.value) ? me() : r.value && t && _();
    }
    const Ge = h.bridge.subscribe((u) => {
      u.type === "messages/state" && P(u.payload.state);
    });
    function Ee(u) {
      u !== r.value && (r.value = u, I.value = "", b.value = f(u), _());
    }
    function me() {
      r.value = "", ne++, S.value = "", b.value = f();
    }
    Fe(() => (me(), !0), () => !!r.value);
    async function K(u, t = () => !0) {
      if (!o.value) {
        o.value = !0, I.value = "";
        try {
          await u();
        } catch (v) {
          j && t() && (I.value = v instanceof Error && v.message !== "host_request_timeout" ? v.message : V.operationTimeout);
        } finally {
          o.value = !1;
        }
      }
    }
    function He(u) {
      if (U.value || se.value) return;
      const t = {
        contactId: r.value,
        messageId: `input:${$e()}`,
        payload: u,
        createdAt: Date.now()
      };
      L.value = t, Y.value = null, ie.delete(t.contactId), b.value = {
        ...b.value,
        hasNewer: !1
      }, _(!1, !0), D.value?.sent(), Be(t.contactId, t.messageId, t);
    }
    async function Be(u, t, v) {
      if (!o.value) {
        o.value = !0, Y.value = null, I.value = "";
        try {
          if (de.value && (P(await R("messages/confirm")), de.value))
            return;
          const z = v?.payload.type === "image" ? {
            type: "image",
            description: v.payload.description,
            upload: { ...v.payload.upload }
          } : v ? {
            type: "text",
            text: v.payload.text
          } : void 0;
          P(v ? await R("messages/send", {
            contactId: u,
            actionId: t.slice(6),
            payload: z
          }) : await R("messages/retry", {
            contactId: u,
            messageId: t
          }));
        } catch (z) {
          j && (Y.value = {
            contactId: u,
            messageId: t,
            message: z instanceof Error && z.message !== "host_request_timeout" ? z.message : "还不确定是否发送成功，可以重试。"
          });
        } finally {
          o.value = !1;
        }
      }
    }
    function Ze(u) {
      const t = se.value?.messageId === u ? se.value : void 0;
      Be(r.value, u, t);
    }
    function Ke(u) {
      K(async () => {
        P(await R("messages/discard-send", { messageId: u })), L.value?.messageId === u && (L.value = null), Y.value = null, await _();
      });
    }
    function je(u) {
      K(async () => P(await R(u)));
    }
    function Ye(u) {
      K(async () => {
        P(await R("messages/settings", { settings: u })), F();
      });
    }
    function Xe() {
      if (E.value) return;
      E.value = !0, I.value = "";
      const u = ae;
      R("messages/sync").then((t) => {
        P(t), ae === u && F();
      }).catch((t) => {
        j && ae === u && s.value.settings.syncNoticeEnabled && (I.value = t instanceof Error && t.message !== "host_request_timeout" ? t.message : V.operationTimeout);
      }).finally(() => {
        E.value = !1;
      });
    }
    function Ae() {
      if (w.value || !s.value.settings.syncNoticeEnabled) return;
      w.value = !0, I.value = "";
      const u = ae;
      R("messages/dismiss-sync-notice").then((t) => {
        P(t), p.value && ae === u && F(), I.value = "";
      }).catch((t) => {
        j && (I.value = t instanceof Error && t.message !== "host_request_timeout" ? t.message : V.settingsFailed);
      }).finally(() => {
        w.value = !1;
      });
    }
    function te(u) {
      p.value && he(() => m.value?.focus()), ae++, i.value = u, I.value = "", q.value = "", ee.value = G.value?.note ?? "", re.value = "", ge.value = $e(), p.value = !0, B.value = s.value.revision, u === "add" && xe();
    }
    async function xe() {
      const u = ge.value, t = () => j && p.value && i.value === "add" && ge.value === u;
      J.value = "loading";
      try {
        const v = await R("messages/refresh");
        if (!t()) return;
        P(v), J.value = "ready";
      } catch {
        t() && (J.value = "failed");
      }
    }
    function F() {
      k.value && (I.value = ""), p.value = !1, ae++;
    }
    function De() {
      F();
    }
    function Je() {
      if (o.value && k.value) {
        F();
        return;
      }
      o.value || (i.value === "delete" ? i.value = "detail" : i.value === "recover" ? i.value = "sync" : De());
    }
    function Te(u = q.value) {
      !u.trim() || U.value || J.value === "loading" || K(async () => {
        const t = await R("messages/contact/add", {
          actionId: ge.value,
          name: u.trim(),
          note: ee.value.trim()
        });
        P(t.state), F(), Ee(t.contactId);
      });
    }
    function _e() {
      K(async () => {
        P(await R("messages/contact/note", {
          contactId: r.value,
          note: ee.value
        })), F();
      });
    }
    function Qe() {
      K(async () => {
        P(await R("messages/contact/delete", {
          contactId: r.value,
          revision: B.value
        })), F(), me();
      });
    }
    function We(u) {
      M.value = u, te("delete-message"), B.value = b.value.revision;
    }
    function ea() {
      const u = r.value, t = M.value;
      K(async () => {
        P(await R("messages/message/delete", {
          contactId: u,
          messageId: t,
          revision: B.value
        })), await _(), F();
      });
    }
    function aa(u) {
      const t = {
        contactId: r.value,
        messageId: u,
        revision: b.value.revision
      };
      K(async () => {
        P(await R("messages/regenerate", t));
      });
    }
    function sa() {
      K(async () => {
        P(await R("messages/recover")), F();
      });
    }
    function ta() {
      K(async () => {
        P(await R("messages/adopt-server-state")), s.value.fileState === "ready" && !s.value.pendingSave ? (L.value = null, Y.value = null, F()) : I.value = "暂时无法加载已保存版本，请检查网络后重试。当前记录未改。";
      });
    }
    return Ce(() => {
      j = !1, ne++, Ge();
    }), (u, t) => (l(), n("main", Hs, [
      de.value ? (l(), n("div", Zs, [e("span", null, g(s.value.fileState === "conflict" ? "服务器上的存档已有变化，请选择如何处理。" : "还不确定部分消息是否保存成功，请先检查保存。"), 1), e("div", Ks, [e("button", {
        disabled: o.value || s.value.operationPending || !!s.value.busy,
        onClick: t[0] || (t[0] = (v) => je("messages/confirm"))
      }, "检查保存", 8, js), s.value.fileState === "conflict" || s.value.recoveryBlocked ? (l(), n("button", {
        key: 0,
        disabled: o.value || s.value.operationPending || !!s.value.busy || s.value.generationActive,
        onClick: t[1] || (t[1] = (v) => te("adopt"))
      }, "使用已保存版本", 8, Ys)) : C("", !0)])])) : c.value && s.value.settings.syncNoticeEnabled && !s.value.busy ? (l(), n("div", Xs, [
        e("span", null, g(O(V).pending(c.value)), 1),
        s.value.syncNotice.error ? (l(), n("span", Js, g(s.value.syncNotice.error), 1)) : C("", !0),
        e("div", _s, [e("button", {
          disabled: U.value,
          onClick: t[2] || (t[2] = (v) => te("sync"))
        }, g(O(V).view), 9, Qs), e("button", {
          disabled: w.value,
          onClick: Ae
        }, g(O(V).dismiss), 9, Ws)])
      ])) : C("", !0),
      s.value.generationActive ? (l(), n("div", et, "故事正在继续，稍后就能发送消息。")) : C("", !0),
      I.value && !k.value || s.value.error ? (l(), n("p", at, g(!k.value && I.value || s.value.error), 1)) : C("", !0),
      S.value ? (l(), n("div", st, [e("span", null, g(S.value), 1), e("button", {
        disabled: d.value,
        onClick: t[3] || (t[3] = (v) => _())
      }, "重新加载", 8, tt)])) : C("", !0),
      e("div", { class: W(["messages-layout", {
        "has-conversation": !!G.value,
        "is-empty": !s.value.contacts.length
      }]) }, [A(Aa, {
        contacts: s.value.contacts,
        "active-contact-id": r.value,
        "busy-contact-id": s.value.busy?.contactId ?? "",
        drafts: ie,
        onSelect: Ee,
        onAdd: t[4] || (t[4] = (v) => te("add")),
        onSettings: t[5] || (t[5] = (v) => te("settings"))
      }, null, 8, [
        "contacts",
        "active-contact-id",
        "busy-contact-id",
        "drafts"
      ]), G.value ? (l(), oe(Os, {
        key: G.value.id,
        ref_key: "conversation",
        ref: D,
        draft: Me.value,
        "onUpdate:draft": t[6] || (t[6] = (v) => Me.value = v),
        "context-state": s.value,
        contact: G.value,
        page: b.value,
        bridge: a.bridge,
        "chat-identity": s.value.chatIdentity,
        disabled: U.value,
        "send-disabled": U.value || !!se.value,
        busy: s.value.busy,
        outgoing: Oe.value,
        "send-failure": s.value.sendFailure,
        "send-error": Y.value,
        working: o.value,
        "pending-save": de.value,
        "retry-disabled": o.value || s.value.operationPending || !!s.value.busy || s.value.generationActive || s.value.fileState === "conflict",
        loading: d.value,
        "load-more": () => _(!0),
        media: s.value.media,
        "waiting-for": ze.value,
        onBack: me,
        onDetails: t[7] || (t[7] = (v) => te("detail")),
        onSend: He,
        onRetry: Ze,
        onDiscard: Ke,
        onDeleteMessage: We,
        onRegenerate: aa,
        onLatest: t[8] || (t[8] = (v) => _(!1, !0))
      }, null, 8, [
        "draft",
        "context-state",
        "contact",
        "page",
        "bridge",
        "chat-identity",
        "disabled",
        "send-disabled",
        "busy",
        "outgoing",
        "send-failure",
        "send-error",
        "working",
        "pending-save",
        "retry-disabled",
        "loading",
        "load-more",
        "media",
        "waiting-for"
      ])) : (l(), n("div", lt, [A(N, { name: "message" }), e("p", null, g(O(Gs).chooseConversation), 1)]))], 2),
      p.value ? (l(), oe(Ve, {
        key: 5,
        class: "messages-dialog",
        "aria-labelledby": "messages-dialog-title",
        busy: o.value && !k.value,
        onClose: Je
      }, {
        default: Le(() => [
          e("header", null, [
            i.value === "detail" && G.value ? (l(), oe(ye, {
              key: 0,
              identity: G.value.id,
              name: G.value.name,
              small: ""
            }, null, 8, ["identity", "name"])) : C("", !0),
            e("h2", nt, g(i.value === "settings" ? "信息设置" : i.value === "add" ? "新的对话" : i.value === "detail" ? G.value?.name : i.value === "delete" ? "删除联系人？" : i.value === "delete-message" ? "删除这条消息？" : i.value === "sync" ? O(V).title : i.value === "adopt" ? "使用已保存版本？" : "在当前位置补记？"), 1),
            e("button", {
              ref_key: "dialogClose",
              ref: m,
              class: "messages-icon-button",
              "aria-label": "关闭",
              disabled: o.value && !k.value,
              onClick: De
            }, [A(N, { name: "close" })], 8, it)
          ]),
          I.value || k.value && s.value.syncNotice.error ? (l(), n("p", ut, g(I.value || s.value.syncNotice.error), 1)) : C("", !0),
          i.value === "settings" ? (l(), n(T, { key: 1 }, [A(Ra, {
            settings: s.value.settings,
            busy: o.value || s.value.operationPending,
            onSave: Ye
          }, null, 8, ["settings", "busy"]), c.value ? (l(), n("button", {
            key: 0,
            class: "messages-secondary messages-sync-entry",
            disabled: o.value,
            onClick: t[9] || (t[9] = (v) => te("sync"))
          }, g(O(V).title) + " · " + g(c.value), 9, ot)) : C("", !0)], 64)) : i.value === "add" ? (l(), n(T, { key: 2 }, [
            e("label", rt, [A(N, { name: "search" }), X(e("input", {
              "onUpdate:modelValue": t[10] || (t[10] = (v) => re.value = v),
              placeholder: "查找已知人物",
              "aria-label": "查找已知人物",
              "aria-describedby": "messages-people-source"
            }, null, 512), [[ue, re.value]])]),
            t[22] || (t[22] = e("div", {
              id: "messages-people-source",
              class: "messages-subtle messages-people-source"
            }, "人物来自当前聊天的剧情总结，需要开启总结功能；找不到的人可以手动添加。", -1)),
            e("div", {
              class: "messages-known-list",
              "aria-busy": J.value === "loading"
            }, [J.value === "loading" ? (l(), n("p", vt, "正在读取已知人物…")) : J.value === "failed" ? (l(), n("div", gt, [t[18] || (t[18] = e("p", {
              class: "messages-subtle",
              role: "alert"
            }, "已知人物暂时无法读取，可以重试或手动添加。", -1)), e("button", {
              class: "messages-secondary",
              disabled: o.value,
              onClick: xe
            }, "重新加载", 8, mt)])) : (l(), n(T, { key: 2 }, [(l(!0), n(T, null, be(Se.value, (v) => (l(), n("button", {
              key: v.name,
              disabled: U.value,
              onClick: (z) => Te(v.name)
            }, [
              A(ye, {
                identity: v.name,
                name: v.name,
                small: ""
              }, null, 8, ["identity", "name"]),
              e("span", null, [le(g(v.name), 1), v.aliases.length ? (l(), n("small", yt, g(v.aliases.join("、")), 1)) : C("", !0)]),
              A(N, { name: "plus" })
            ], 8, ct))), 128)), Se.value.length ? C("", !0) : (l(), n("p", bt, g(re.value ? "没有匹配的人物，可以在下面手动添加。" : "暂无可添加的已知人物，可以在下面手动添加。"), 1))], 64))], 8, dt),
            e("details", ft, [t[21] || (t[21] = e("summary", null, "想联系的人不在这里？", -1)), e("form", { onSubmit: t[13] || (t[13] = ve((v) => Te(), ["prevent"])) }, [
              e("label", null, [t[19] || (t[19] = le("姓名", -1)), X(e("input", {
                "onUpdate:modelValue": t[11] || (t[11] = (v) => q.value = v),
                maxlength: "120",
                required: "",
                placeholder: "对方的姓名"
              }, null, 512), [[ue, q.value]])]),
              e("label", null, [t[20] || (t[20] = le("身份说明（可选）", -1)), X(e("textarea", {
                "onUpdate:modelValue": t[12] || (t[12] = (v) => ee.value = v),
                maxlength: "600",
                rows: "2",
                placeholder: "例如：住在隔壁的花店老板"
              }, null, 512), [[ue, ee.value]])]),
              e("button", {
                class: "messages-primary",
                disabled: U.value || J.value === "loading" || !q.value.trim()
              }, "添加并聊天", 8, pt)
            ], 32)])
          ], 64)) : i.value === "detail" ? (l(), n("form", {
            key: 3,
            onSubmit: ve(_e, ["prevent"])
          }, [
            e("label", null, [t[23] || (t[23] = le("身份说明 / 备注", -1)), X(e("textarea", {
              "onUpdate:modelValue": t[14] || (t[14] = (v) => ee.value = v),
              maxlength: "600",
              rows: "3",
              placeholder: "帮助辨认这位联系人"
            }, null, 512), [[ue, ee.value]])]),
            e("button", {
              class: "messages-primary",
              disabled: U.value
            }, "保存备注", 8, kt),
            e("button", {
              type: "button",
              class: "messages-danger",
              disabled: U.value,
              onClick: t[15] || (t[15] = (v) => i.value = "delete")
            }, "删除联系人与通讯记录", 8, $t)
          ], 32)) : i.value === "delete" ? (l(), n(T, { key: 4 }, [
            y.value ? (l(), n("p", ht, g(y.value), 1)) : (l(), n("p", wt, "删除与 " + g(G.value?.name) + " 的全部通讯和摘要，同时更新主聊天记录。其他联系人和图库文件保留，删除后不能恢复。", 1)),
            e("button", {
              class: "messages-danger",
              disabled: U.value || !!y.value,
              onClick: Qe
            }, "确认删除", 8, Ct),
            e("button", {
              class: "messages-secondary",
              onClick: t[16] || (t[16] = (v) => i.value = "detail")
            }, "保留联系人")
          ], 64)) : i.value === "delete-message" ? (l(), n(T, { key: 5 }, [
            y.value ? (l(), n("p", It, g(y.value), 1)) : (l(), n("p", Mt, "删除这条消息，同时更新主聊天记录。后续回复、其他消息和图库文件保留，删除后不能恢复。")),
            e("button", {
              class: "messages-danger",
              disabled: U.value || !!y.value,
              onClick: ea
            }, "确认删除", 8, St),
            e("button", {
              class: "messages-secondary",
              onClick: F
            }, "取消")
          ], 64)) : i.value === "sync" ? (l(), n(T, { key: 6 }, [
            e("p", null, g(O(V).pending(c.value)), 1),
            e("p", null, g(O(V).description), 1),
            e("button", {
              class: "messages-primary",
              disabled: U.value || E.value,
              onClick: Xe
            }, g(O(V).retry), 9, Et),
            s.value.settings.syncNoticeEnabled ? (l(), n("button", {
              key: 0,
              class: "messages-secondary",
              disabled: w.value,
              onClick: Ae
            }, g(O(V).dismiss), 9, Bt)) : C("", !0),
            e("details", At, [
              t[24] || (t[24] = e("summary", null, "原来的记录已被修改或删除？", -1)),
              t[25] || (t[25] = e("p", null, "不会覆盖你的修改。需要这些消息继续进入剧情时，可以在当前位置另加一条补记。", -1)),
              e("button", {
                class: "messages-secondary",
                disabled: U.value,
                onClick: t[17] || (t[17] = (v) => i.value = "recover")
              }, "查看补记方式", 8, xt)
            ])
          ], 64)) : i.value === "adopt" ? (l(), n(T, { key: 7 }, [
            t[26] || (t[26] = e("p", null, "将读取服务器上的当前聊天小白 OS 存档，放弃本地尚未确认的修改。信息 APP 会显示服务器已保存的联系人和消息。", -1)),
            t[27] || (t[27] = e("p", { class: "messages-subtle" }, "这项选择作用于当前聊天的整份 OS 存档，不会删除主聊天里的记录，也不会重新生成回复。", -1)),
            e("button", {
              class: "messages-danger",
              disabled: o.value || !!s.value.busy || s.value.generationActive,
              onClick: ta
            }, "确认使用已保存版本", 8, Dt),
            e("button", {
              class: "messages-secondary",
              disabled: o.value,
              onClick: F
            }, "暂不处理", 8, Tt)
          ], 64)) : (l(), n(T, { key: 8 }, [
            t[28] || (t[28] = e("p", null, "先检查已有记录；仍未写入的消息会在主聊天当前位置标为「补录」，保留原发送时间。不会覆盖旧记录或恢复你删除的那一条。", -1)),
            e("button", {
              class: "messages-primary",
              disabled: U.value,
              onClick: sa
            }, "确认补记", 8, Nt),
            e("button", {
              class: "messages-secondary",
              disabled: o.value,
              onClick: F
            }, "暂不补记", 8, Rt)
          ], 64))
        ]),
        _: 1
      }, 8, ["busy"])) : C("", !0)
    ]));
  }
}), Vt = qt;
export {
  Vt as default
};
