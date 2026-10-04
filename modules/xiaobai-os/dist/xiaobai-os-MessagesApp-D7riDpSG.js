/* eslint-disable */
import { B as ua, C as w, D as ie, G as me, H as oa, I as ra, L as da, M as fe, O as M, P as Ie, Q as pe, S as ve, U as l, V as Se, X as Pe, _ as T, at as h, b as B, d as we, dt as Me, et as Ue, ft as g, g as ce, h as _e, it as Fe, k as j, lt as x, nt as va, o as Ve, p as de, tt as Q, ut as W, w as n, x as e } from "./xiaobai-os-frame-bridge-CrPFvkI3.js";
import { t as ze } from "./xiaobai-os-AppDialog-Ce_C5VGF.js";
import { t as ga } from "./xiaobai-os-context-tokens-bfmDTbG3.js";
var ma = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, ca = ["d"], ya = /* @__PURE__ */ j({
  __name: "MessageIcon",
  props: { name: {} },
  setup(a) {
    const $ = {
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
    return (s, f) => (l(), n("svg", ma, [e("path", { d: $[a.name] }, null, 8, ca)]));
  }
}), N = ya, ba = /* @__PURE__ */ j({
  __name: "ContactAvatar",
  props: {
    identity: {},
    name: {},
    small: { type: Boolean }
  },
  setup(a) {
    const $ = a, s = B(() => {
      let f = 0;
      for (const d of $.identity) f = Math.imul(f, 31) + d.codePointAt(0) | 0;
      return String((f >>> 0) % 360);
    });
    return (f, d) => (l(), n("span", {
      class: W(["messages-avatar", { small: a.small }]),
      style: Me({ "--avatar-hue": s.value }),
      "aria-hidden": "true"
    }, g(Array.from(a.name)[0]), 7));
  }
}), ke = ba, fa = { class: "messages-contacts" }, pa = { class: "messages-home-header" }, ka = { class: "messages-home-actions" }, ha = { class: "messages-search" }, $a = {
  key: 0,
  class: "messages-empty"
}, wa = {
  key: 1,
  class: "messages-contact-rows"
}, Ca = {
  key: 0,
  class: "messages-subtle"
}, Ia = ["aria-current", "onClick"], Sa = { class: "messages-contact-copy" }, Ma = { class: "messages-contact-heading" }, Ea = {
  key: 0,
  class: "messages-preview messages-preview-active"
}, xa = {
  key: 1,
  class: "messages-preview"
}, Ba = {
  key: 2,
  class: "messages-preview"
}, Aa = /* @__PURE__ */ j({
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
    const $ = a, s = h(""), f = B(() => $.contacts.filter((k) => `${k.name} ${k.note}`.toLocaleLowerCase().includes(s.value.toLocaleLowerCase())));
    function d(k) {
      if (k === null) return "";
      const v = new Date(k);
      return v.toDateString() === (/* @__PURE__ */ new Date()).toDateString() ? v.toLocaleTimeString(void 0, {
        hour: "2-digit",
        minute: "2-digit"
      }) : v.toLocaleDateString(void 0, {
        month: "numeric",
        day: "numeric"
      });
    }
    return (k, v) => (l(), n("section", fa, [
      e("header", pa, [v[4] || (v[4] = e("h1", null, "信息", -1)), e("div", ka, [e("button", {
        class: "messages-icon-button",
        title: "设置",
        "aria-label": "设置",
        onClick: v[0] || (v[0] = (r) => k.$emit("settings"))
      }, [M(N, { name: "settings" })]), e("button", {
        class: "messages-icon-button messages-add-contact",
        "aria-label": "添加联系人",
        onClick: v[1] || (v[1] = (r) => k.$emit("add"))
      }, [M(N, { name: "plus" })])])]),
      e("label", ha, [M(N, { name: "search" }), Q(e("input", {
        "onUpdate:modelValue": v[2] || (v[2] = (r) => s.value = r),
        type: "search",
        placeholder: "搜索联系人",
        "aria-label": "搜索联系人"
      }, null, 512), [[de, s.value]])]),
      a.contacts.length ? (l(), n("div", wa, [f.value.length ? w("", !0) : (l(), n("p", Ca, "没有找到这个人。")), (l(!0), n(T, null, me(f.value, (r) => (l(), n("button", {
        key: r.id,
        class: "messages-contact-row",
        "aria-current": a.activeContactId === r.id ? "true" : void 0,
        onClick: (S) => k.$emit("select", r.id)
      }, [M(ke, {
        identity: r.id,
        name: r.name
      }, null, 8, ["identity", "name"]), e("span", Sa, [e("span", Ma, [e("strong", null, g(r.name), 1), e("time", null, g(d(r.lastAt)), 1)]), a.busyContactId === r.id ? (l(), n("span", Ea, "正在等待回复…")) : a.drafts.get(r.id)?.text.trim() || a.drafts.get(r.id)?.image ? (l(), n("span", xa, [v[7] || (v[7] = e("em", null, "草稿", -1)), ie(" " + g(a.drafts.get(r.id)?.image ? "［图片］" : "") + g(a.drafts.get(r.id)?.text), 1)])) : (l(), n("span", Ba, g(r.preview), 1))])], 8, Ia))), 128))])) : (l(), n("div", $a, [
        M(N, { name: "message" }),
        v[6] || (v[6] = e("h2", null, "暂无联系人", -1)),
        e("button", {
          class: "messages-primary",
          onClick: v[3] || (v[3] = (r) => k.$emit("add"))
        }, [v[5] || (v[5] = ie("添加联系人", -1)), M(N, { name: "plus" })])
      ]))
    ]));
  }
}), Da = Aa, z = {
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
}, Ta = ["disabled"], Ra = ["disabled"], Na = ["disabled"], qa = /* @__PURE__ */ j({
  __name: "MessagesSettings",
  props: {
    settings: {},
    busy: { type: Boolean }
  },
  emits: ["save"],
  setup(a, { emit: $ }) {
    const s = a, f = $, d = Fe({ ...s.settings });
    return (k, v) => (l(), n("form", {
      class: "messages-settings",
      onSubmit: v[3] || (v[3] = ce((r) => f("save", { ...d }), ["prevent"]))
    }, [
      e("fieldset", { disabled: a.busy }, [
        v[6] || (v[6] = e("legend", null, "对方的回复", -1)),
        e("label", null, [v[4] || (v[4] = e("span", null, "允许对方发图片", -1)), Q(e("input", {
          "onUpdate:modelValue": v[0] || (v[0] = (r) => d.imagePrompt = r),
          type: "checkbox"
        }, null, 512), [[we, d.imagePrompt]])]),
        e("label", null, [v[5] || (v[5] = e("span", null, "允许对方发语音", -1)), Q(e("input", {
          "onUpdate:modelValue": v[1] || (v[1] = (r) => d.voicePrompt = r),
          type: "checkbox"
        }, null, 512), [[we, d.voicePrompt]])])
      ], 8, Ta),
      e("fieldset", { disabled: a.busy }, [e("legend", null, g(x(z).title), 1), e("label", null, [e("span", null, g(x(z).setting), 1), Q(e("input", {
        "onUpdate:modelValue": v[2] || (v[2] = (r) => d.syncNoticeEnabled = r),
        type: "checkbox"
      }, null, 512), [[we, d.syncNoticeEnabled]])])], 8, Ra),
      e("button", {
        type: "submit",
        class: "messages-primary",
        disabled: a.busy
      }, g(a.busy ? "请稍候…" : "保存设置"), 9, Na)
    ], 32));
  }
}), La = qa, Pa = ["src", "alt"], Ua = {
  key: 2,
  class: "messages-image-placeholder",
  role: "status",
  "aria-live": "polite"
}, _a = {
  key: 4,
  class: "messages-image-placeholder messages-media-unavailable"
}, Fa = {
  key: 5,
  class: "messages-image-caption"
}, Va = {
  key: 6,
  class: "messages-media-error",
  role: "status"
}, za = ["src", "alt"], Oa = /* @__PURE__ */ j({
  __name: "MessageImage",
  props: {
    message: {},
    bridge: {},
    chatIdentity: {},
    available: { type: Boolean }
  },
  emits: ["resize"],
  setup(a, { emit: $ }) {
    const s = a, f = $, d = h(null), k = h(!1), v = h(""), r = h(""), S = h(""), C = h(""), I = h(!1), E = h(!1), A = B(() => s.message.payload.type === "image" ? s.message.payload.attachment : void 0), y = B(() => s.message.payload.type === "image" ? s.message.payload.description : ""), i = B(() => A.value?.path || v.value);
    let p = null;
    function D() {
      const c = C.value;
      C.value = "", c && s.bridge.post("messages/image/cancel", {
        chatIdentity: s.chatIdentity,
        mediaRequestId: c
      });
    }
    async function R() {
      if (C.value) return;
      if (i.value) {
        I.value = !1;
        return;
      }
      if (!s.available) return;
      const c = `image-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      C.value = c, r.value = "", S.value = "正在读取图片…";
      try {
        const { result: u } = await s.bridge.request("messages/image/generate", {
          chatIdentity: s.chatIdentity,
          messageId: s.message.id,
          mediaRequestId: c
        }, 18e4);
        if (C.value !== c) return;
        if (!u.data) throw new Error("画图暂不可用，请开启画图后重试。");
        v.value = u.data, I.value = !1;
      } catch (u) {
        if (C.value !== c) return;
        const b = u instanceof Error ? u.message : "";
        r.value = b === "host_request_timeout" ? "等待图片超过3分钟，已取消本次请求，可重试。" : b || "图片加载失败，请重试。", D();
      } finally {
        C.value === c && (C.value = "");
      }
    }
    const H = s.bridge.subscribe((c) => {
      if (c.type !== "messages/image-progress") return;
      const u = c.payload;
      if (!(!C.value || u.mediaRequestId !== C.value))
        if (u.status === "queued") {
          const b = Math.max(0, Number(u.ahead) || 0);
          S.value = b ? `排队中，前方 ${b} 张` : "已进入图片队列";
        } else u.status === "generating" ? S.value = "正在生成图片…" : u.status === "cooldown" && (S.value = u.delay ? `等待 ${Math.ceil(u.delay / 1e3)} 秒后继续` : "等待继续生成…");
    });
    return ua(() => {
      if (!A.value) {
        if (typeof IntersectionObserver > "u") {
          k.value = !0;
          return;
        }
        p = new IntersectionObserver((c) => {
          k.value = c.some((u) => u.isIntersecting);
        }, { root: d.value?.closest(".messages-thread-scroll") ?? null }), d.value && p.observe(d.value);
      }
    }), pe([k, () => s.available], ([c, u]) => {
      c && u && !i.value && !r.value && R();
    }), ra(() => {
      p?.disconnect(), H(), D();
    }), (c, u) => (l(), n("div", {
      ref_key: "root",
      ref: d
    }, [
      i.value && !I.value ? (l(), n("button", {
        key: 0,
        class: "messages-image-open",
        "aria-label": "放大图片",
        onClick: u[2] || (u[2] = (b) => E.value = !0)
      }, [e("img", {
        src: i.value,
        alt: y.value || A.value?.name || "图片",
        onLoad: u[0] || (u[0] = (b) => f("resize")),
        onError: u[1] || (u[1] = (b) => I.value = !0)
      }, null, 40, Pa)])) : I.value ? (l(), n("button", {
        key: 1,
        class: "messages-image-placeholder",
        onClick: R
      }, [
        M(N, { name: "image" }),
        u[5] || (u[5] = e("span", null, "图片暂时无法显示", -1)),
        u[6] || (u[6] = e("small", null, "点击重新加载", -1))
      ])) : C.value ? (l(), n("div", Ua, [M(N, { name: "image" }), e("span", null, g(S.value), 1)])) : a.available ? (l(), n("button", {
        key: 3,
        class: "messages-image-placeholder",
        onClick: R
      }, [M(N, { name: "image" }), e("span", null, g(r.value ? "重试加载图片" : "图片"), 1)])) : (l(), n("div", _a, [
        M(N, { name: "image" }),
        u[7] || (u[7] = e("span", null, "图片描述", -1)),
        u[8] || (u[8] = e("small", null, "开启画图后自动加载", -1))
      ])),
      y.value ? (l(), n("p", Fa, g(y.value), 1)) : w("", !0),
      r.value ? (l(), n("small", Va, g(r.value), 1)) : w("", !0),
      E.value ? (l(), ve(ze, {
        key: 7,
        class: "messages-image-viewer",
        "aria-label": "查看图片",
        onClose: u[4] || (u[4] = (b) => E.value = !1)
      }, {
        default: Ue(() => [e("button", {
          "aria-label": "关闭图片",
          onClick: u[3] || (u[3] = (b) => E.value = !1)
        }, [M(N, { name: "close" })]), i.value ? (l(), n("img", {
          key: 0,
          src: i.value,
          alt: y.value || A.value?.name || "图片"
        }, null, 8, za)) : w("", !0)]),
        _: 1
      })) : w("", !0)
    ], 512));
  }
}), Ga = Oa, Ha = ["data-message-id"], Za = {
  class: "messages-bubble-actions",
  role: "group",
  "aria-label": "消息操作"
}, Ka = ["disabled", "title"], ja = ["disabled"], Ya = { key: 0 }, Xa = ["disabled", "aria-label"], Ja = {
  key: 0,
  class: "messages-media-unavailable-note"
}, Qa = {
  key: 2,
  class: "messages-transcript"
}, Wa = {
  key: 3,
  class: "messages-media-error",
  role: "status"
}, es = /* @__PURE__ */ j({
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
  setup(a, { emit: $ }) {
    const s = a, f = $;
    function d(i) {
      i.target.closest("button, a, dialog") || window.getSelection()?.toString() || f("select", s.message.id);
    }
    const k = h(""), v = h(""), r = h(!1), S = B(() => [
      "playing",
      "loading",
      "generating",
      "queued"
    ].includes(v.value)), C = h(!1);
    let I = !0;
    const E = (i) => s.bridge.request(i, {
      chatIdentity: s.chatIdentity,
      messageId: s.message.id
    }, 18e4);
    async function A() {
      if (C.value) return;
      k.value = "";
      const i = S.value;
      if (!(!i && !s.media.voice))
        try {
          i ? (C.value = !0, await E("messages/voice/stop"), I && (v.value = "")) : (v.value = "loading", await E("messages/voice/play"));
        } catch {
          I && (i || (v.value = ""), k.value = i ? "未能确认停止，请再点一次停止。" : "语音暂时无法播放，原文仍可查看。");
        } finally {
          I && (C.value = !1);
        }
    }
    const y = s.bridge.subscribe((i) => {
      if (i.type !== "messages/voice-state") return;
      const p = i.payload;
      p.messageId === s.message.id ? v.value = p.status : p.status === "playing" && (v.value = ""), p.messageId === s.message.id && p.status === "error" && (k.value = "播放失败，点击可以重试。");
    });
    return Se(() => {
      I = !1, y(), S.value && E("messages/voice/stop").catch(() => {
      });
    }), (i, p) => (l(), n("article", {
      class: W(["messages-bubble-row", {
        outgoing: a.message.sender === "user",
        "actions-selected": a.selected
      }]),
      "data-message-id": a.message.id,
      tabindex: "0",
      "aria-label": "消息操作",
      onClick: d,
      onFocus: p[4] || (p[4] = (D) => f("select", a.message.id))
    }, [e("div", Za, [e("button", {
      disabled: a.disabled,
      title: a.permission?.reason,
      class: W({ "is-unavailable": a.permission?.reason }),
      "aria-haspopup": "dialog",
      onClick: p[0] || (p[0] = (D) => i.$emit("deleteMessage", a.message.id))
    }, "删除", 10, Ka), a.permission?.regenerate ? (l(), n("button", {
      key: 0,
      disabled: a.disabled,
      onClick: p[1] || (p[1] = (D) => i.$emit("regenerate", a.message.id))
    }, "重新回复", 8, ja)) : w("", !0)]), e("div", { class: W(["messages-bubble", `messages-bubble-${a.message.payload.type}`]) }, [a.message.payload.type === "text" ? (l(), n("p", Ya, g(a.message.payload.text), 1)) : a.message.payload.type === "image" ? (l(), ve(Ga, {
      key: 1,
      message: a.message,
      bridge: a.bridge,
      "chat-identity": a.chatIdentity,
      available: a.media.image,
      onResize: p[2] || (p[2] = (D) => i.$emit("resize"))
    }, null, 8, [
      "message",
      "bridge",
      "chat-identity",
      "available"
    ])) : (l(), n(T, { key: 2 }, [
      e("button", {
        class: "messages-voice-button",
        disabled: C.value || !a.media.voice && !S.value,
        "aria-label": S.value ? "停止播放" : "播放语音",
        onClick: A
      }, [
        M(N, { name: S.value ? "stop" : "play" }, null, 8, ["name"]),
        e("span", { class: W(["messages-wave", { playing: v.value === "playing" }]) }, [(l(), n(T, null, me(16, (D) => e("i", {
          key: D,
          style: Me({
            height: `${8 + D * 7 % 17}px`,
            animationDelay: `${D * 45}ms`
          })
        }, null, 4)), 64))], 2),
        e("small", null, g(C.value ? "停止中" : [
          "loading",
          "generating",
          "queued"
        ].includes(v.value) ? "准备中" : "语音"), 1)
      ], 8, Xa),
      a.media.voice ? w("", !0) : (l(), n("small", Ja, "开启 TTS 后可播放")),
      a.media.voice ? (l(), n("button", {
        key: 1,
        class: "messages-transcript-toggle",
        onClick: p[3] || (p[3] = (D) => r.value = !r.value)
      }, g(r.value ? "收起原文" : "查看原文"), 1)) : w("", !0),
      r.value || !a.media.voice ? (l(), n("p", Qa, g(a.message.payload.transcript), 1)) : w("", !0)
    ], 64)), k.value ? (l(), n("small", Wa, g(k.value), 1)) : w("", !0)], 2)], 42, Ha));
  }
}), as = es, ss = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif"
], Jt = 4 * 1024 * 1024;
async function ts(a) {
  if (!ss.includes(a.type)) throw new Error("请选择 PNG、JPG、WEBP 或 GIF 图片。");
  if (!a.size || a.size > 4194304) throw new Error("请选择不超过 4MB 的图片。");
  const $ = await new Promise((f, d) => {
    const k = new FileReader();
    k.onerror = () => d(/* @__PURE__ */ new Error("图片读取失败，请重新选择。")), k.onload = () => typeof k.result == "string" ? f(k.result) : d(/* @__PURE__ */ new Error("图片读取失败。")), k.readAsDataURL(a);
  }), s = new Image();
  s.src = $;
  try {
    await s.decode();
  } catch {
    throw new Error("这张图片无法打开，请换一张。");
  }
  return {
    dataUrl: $,
    name: a.name.replace(/[\u0000-\u001f\u007f]/gu, "").trim().slice(0, 120) || "图片"
  };
}
var ls = {
  key: 0,
  class: "messages-attachment-preview"
}, ns = ["src", "alt"], is = ["disabled"], us = {
  key: 1,
  class: "messages-composer-hint"
}, os = {
  key: 2,
  class: "messages-composer-hint",
  role: "status"
}, rs = {
  key: 3,
  class: "messages-composer-wait",
  role: "status"
}, ds = { class: "messages-composer-line" }, vs = ["disabled"], gs = ["placeholder", "disabled"], ms = ["disabled"], cs = /* @__PURE__ */ j({
  __name: "MessageComposer",
  props: /* @__PURE__ */ fe({
    disabled: { type: Boolean },
    sending: { type: Boolean },
    waitingFor: {}
  }, {
    draft: { required: !0 },
    draftModifiers: {}
  }),
  emits: /* @__PURE__ */ fe(["send"], ["update:draft"]),
  setup(a, { emit: $ }) {
    const s = a, f = $, d = Pe(a, "draft"), k = B({
      get: () => d.value.text,
      set: (i) => {
        d.value = {
          ...d.value,
          text: i
        };
      }
    }), v = h(null), r = h(!1), S = h("");
    let C = !0;
    async function I(i) {
      const p = i.target, D = p.files?.[0];
      if (p.value = "", !(!D || s.sending || r.value)) {
        r.value = !0, S.value = "";
        try {
          const R = await ts(D);
          C && (d.value = {
            ...d.value,
            image: R
          });
        } catch (R) {
          C && (S.value = R instanceof Error ? R.message : "图片读取失败，请重新选择。");
        } finally {
          C && (r.value = !1);
        }
      }
    }
    function E() {
      d.value = {
        ...d.value,
        image: null
      }, S.value = "";
    }
    function A() {
      const i = k.value.trim();
      !i && !d.value.image || s.disabled || r.value || f("send", d.value.image ? {
        type: "image",
        description: i,
        upload: { ...d.value.image }
      } : {
        type: "text",
        text: i
      });
    }
    Se(() => {
      C = !1;
    });
    function y(i) {
      i.key === "Enter" && (i.ctrlKey || i.metaKey) && !i.isComposing && (i.preventDefault(), A());
    }
    return (i, p) => (l(), n("form", {
      class: "messages-composer",
      onSubmit: ce(A, ["prevent"])
    }, [
      e("input", {
        ref_key: "fileInput",
        ref: v,
        type: "file",
        accept: "image/png,image/jpeg,image/webp,image/gif",
        hidden: "",
        "aria-label": "选择图片文件",
        onChange: I
      }, null, 544),
      d.value.image ? (l(), n("div", ls, [
        e("img", {
          src: d.value.image.dataUrl,
          alt: d.value.image.name
        }, null, 8, ns),
        e("span", null, [p[2] || (p[2] = e("strong", null, "待发送的图片", -1)), e("small", null, g(d.value.image.name), 1)]),
        e("button", {
          type: "button",
          class: "messages-icon-button",
          "aria-label": "移除图片",
          disabled: a.sending || r.value,
          onClick: E
        }, [M(N, { name: "close" })], 8, is)
      ])) : w("", !0),
      d.value.image ? (l(), n("p", us, "图片将随消息发送，需要当前模型支持看图。")) : w("", !0),
      r.value || S.value ? (l(), n("p", os, g(r.value ? "正在读取图片…" : S.value), 1)) : w("", !0),
      a.waitingFor ? (l(), n("p", rs, "正在等待 " + g(a.waitingFor) + " 的回复。可以先写好，稍后发送。", 1)) : w("", !0),
      e("div", ds, [
        e("button", {
          type: "button",
          class: "messages-icon-button messages-attach",
          "aria-label": "选择图片",
          disabled: a.sending || r.value,
          onClick: p[0] || (p[0] = (D) => v.value?.click())
        }, [M(N, { name: "plus" })], 8, vs),
        Q(e("textarea", {
          "onUpdate:modelValue": p[1] || (p[1] = (D) => k.value = D),
          rows: "1",
          maxlength: "4000",
          placeholder: d.value.image ? "给图片配句话…" : "说点什么…",
          "aria-label": "消息内容",
          disabled: a.sending,
          onKeydown: y
        }, null, 40, gs), [[de, k.value]]),
        e("button", {
          class: "messages-send",
          type: "submit",
          disabled: a.disabled || r.value || !k.value.trim() && !d.value.image,
          "aria-label": "发送"
        }, [M(N, { name: "send" })], 8, ms)
      ])
    ], 32));
  }
}), ys = cs, bs = {
  class: "messages-delivery",
  role: "status"
}, fs = { key: 0 }, ps = ["disabled"], ks = ["disabled"], hs = /* @__PURE__ */ j({
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
    return ($, s) => (l(), n("div", bs, [a.sending ? (l(), n("span", fs, "发送中…")) : (l(), n(T, { key: 1 }, [
      e("span", null, g(a.error || (a.pendingSave ? "还不确定是否保存成功" : "尚未收到回复")), 1),
      e("button", {
        disabled: a.disabled,
        onClick: s[0] || (s[0] = (f) => $.$emit("retry"))
      }, g(a.pendingSave ? "检查并重试" : "重试"), 9, ps),
      a.discard && !a.pendingSave ? (l(), n("button", {
        key: 0,
        disabled: a.disabled,
        onClick: s[1] || (s[1] = (f) => $.$emit("discard"))
      }, "删除", 8, ks)) : w("", !0)
    ], 64))]));
  }
}), qe = hs, $s = 158e3, ws = 128e3, Le = 6e3;
function Cs(a) {
  return String(a ?? "").replace(/<(?=\/?[A-Za-z_])/g, "＜");
}
var Is = ["aria-label", "aria-expanded"], Ss = {
  key: 0,
  class: "messages-context-popover",
  "aria-label": "上下文用量"
}, Ms = { class: "messages-context-total" }, Es = {
  key: 1,
  role: "status"
}, xs = { key: 3 }, Bs = /* @__PURE__ */ j({
  __name: "MessageContextButton",
  props: {
    bridge: {},
    state: {},
    contactId: {},
    draft: {}
  },
  setup(a) {
    const $ = a, s = h(!1), f = h(!1), d = h(!1), k = h(0), v = h(null);
    Ve(() => (s.value = !1, !0), () => s.value), pe(() => JSON.stringify([
      $.contactId,
      $.state.chatIdentity,
      $.state.revision,
      $.state.boundary,
      $.state.settings.imagePrompt,
      $.state.settings.voicePrompt,
      !!$.state.busy,
      $.state.generationActive,
      k.value
    ]), async (A, y, i) => {
      let p = !0;
      if (i(() => {
        p = !1;
      }), f.value = !0, d.value = !1, $.state.busy || $.state.generationActive) return;
      const D = $.state.revision, R = $.state.boundary;
      try {
        const H = await $.bridge.request("messages/context", {
          chatIdentity: $.state.chatIdentity,
          contactId: $.contactId
        }, 6e4);
        if (!p) return;
        if (H.result.revision !== D || H.result.boundary !== R) throw new Error("stale");
        v.value = H.result.stats;
      } catch {
        p && (d.value = !0, v.value = null);
      } finally {
        p && (f.value = !1);
      }
    }, { immediate: !0 });
    const r = B(() => ga(Cs($.draft.text))), S = B(() => (v.value?.imageTokens ?? 0) + ($.draft.image ? Le : 0)), C = B(() => (v.value?.usedTokens ?? 0) + r.value + ($.draft.image ? Le : 0)), I = B(() => Math.min(1, C.value / $s)), E = (A) => `${(A / 1e3).toFixed(1)}k`;
    return (A, y) => (l(), n("div", {
      class: "messages-context",
      onKeydown: y[3] || (y[3] = _e(ce((i) => s.value = !1, ["stop"]), ["esc"]))
    }, [e("button", {
      type: "button",
      class: W(["messages-context-ring", { "is-warning": C.value >= x(ws) }]),
      style: Me({ "--context-fill": `${v.value ? I.value * 360 : 0}deg` }),
      "aria-label": v.value ? `上下文：约 ${E(C.value)} / 158k` : "上下文用量",
      "aria-expanded": s.value,
      title: "上下文",
      onClick: y[0] || (y[0] = (i) => s.value = !s.value)
    }, [e("span", null, g(f.value ? "…" : d.value || !v.value ? "—" : ""), 1)], 14, Is), s.value ? (l(), n("section", Ss, [
      e("header", null, [y[4] || (y[4] = e("strong", null, "上下文", -1)), e("button", {
        type: "button",
        "aria-label": "关闭上下文用量",
        onClick: y[1] || (y[1] = (i) => s.value = !1)
      }, "×")]),
      v.value ? (l(), n(T, { key: 0 }, [e("p", Ms, "约 " + g(E(C.value)) + " / 158k", 1), e("dl", null, [
        y[6] || (y[6] = e("dt", null, "剧情与设定", -1)),
        e("dd", null, g(E(v.value.backgroundTokens)), 1),
        y[7] || (y[7] = e("dt", null, "通讯摘要", -1)),
        e("dd", null, g(E(v.value.summaryTokens)), 1),
        y[8] || (y[8] = e("dt", null, "通讯原文", -1)),
        e("dd", null, g(E(v.value.historyTokens)), 1),
        y[9] || (y[9] = e("dt", null, "提示词与输入", -1)),
        e("dd", null, g(E(v.value.promptTokens + r.value)), 1),
        S.value ? (l(), n(T, { key: 0 }, [y[5] || (y[5] = e("dt", null, "图片预留", -1)), e("dd", null, g(E(S.value)), 1)], 64)) : w("", !0)
      ])], 64)) : w("", !0),
      f.value ? (l(), n("p", Es, g(a.state.busy?.stage === "summarizing" ? "正在总结较早通讯…" : a.state.busy || a.state.generationActive ? "本轮结束后更新用量。" : "正在读取…"), 1)) : d.value ? (l(), n(T, { key: 2 }, [y[10] || (y[10] = e("p", { role: "status" }, "用量暂时无法读取。", -1)), e("button", {
        type: "button",
        class: "messages-secondary",
        onClick: y[2] || (y[2] = (i) => k.value++)
      }, "重试")], 64)) : w("", !0),
      y[11] || (y[11] = e("p", null, "128k 时在下次回复前自动总结，保留近期原文。", -1)),
      S.value ? (l(), n("small", xs, "图片按每张 6k 预留，实际用量由模型决定。")) : w("", !0)
    ])) : w("", !0)], 32));
  }
}), As = Bs, V = {
  back: "返回信息",
  details: "联系人详情",
  contextHint: "对话参考角色设定、世界书、近期剧情及可用总结。",
  loadingOlder: "读取中…",
  older: "查看更早的消息",
  loading: "正在读取消息…",
  unfinished: "发送未完成",
  image: "图片",
  voice: "语音",
  summarizing: "对方正在翻看以前的私信…",
  replying: "对方正在输入…",
  hideCharacterState: "收起内心",
  showCharacterState: "偷看内心",
  latest: "回到最新消息"
}, Ds = { class: "messages-conversation" }, Ts = { class: "messages-thread-header" }, Rs = ["aria-label"], Ns = { class: "messages-thread-heading" }, qs = ["aria-label"], Ls = { class: "messages-subtle messages-context-hint" }, Ps = ["disabled"], Us = {
  key: 1,
  class: "messages-thread-start"
}, _s = {
  key: 0,
  class: "messages-time"
}, Fs = { class: "messages-bubble-row outgoing" }, Vs = { key: 0 }, zs = ["src", "alt"], Os = {
  key: 0,
  class: "messages-image-caption"
}, Gs = { key: 0 }, Hs = { class: "messages-image-placeholder" }, Zs = { class: "messages-image-caption" }, Ks = { class: "messages-provisional-label" }, js = { class: "messages-transcript" }, Ys = {
  key: 3,
  class: "messages-typing",
  role: "status"
}, Xs = ["aria-expanded"], Js = {
  key: 4,
  class: "messages-character-state"
}, Qs = /* @__PURE__ */ j({
  __name: "Conversation",
  props: /* @__PURE__ */ fe({
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
  emits: /* @__PURE__ */ fe([
    "back",
    "details",
    "send",
    "retry",
    "discard",
    "deleteMessage",
    "regenerate",
    "latest"
  ], ["update:draft"]),
  setup(a, { expose: $ }) {
    const s = Pe(a, "draft"), f = a, d = h("");
    function k(c) {
      c.target.closest(".messages-bubble-row") || (d.value = "");
    }
    const v = B(() => f.busy?.contactId === f.contact.id ? f.busy.stage : ""), r = B(() => [
      "replying",
      "summarizing",
      "saving-reply"
    ].includes(v.value)), S = B(() => !!f.page.revision && !f.page.hasNewer), C = B(() => r.value && S.value ? f.busy?.preview ?? null : null), I = h(!1);
    pe(() => f.busy?.messageId, () => {
      I.value = !1;
    });
    function E(c) {
      return [f.sendFailure, f.sendError].find((u) => u?.contactId === f.contact.id && u.messageId === c)?.message;
    }
    const A = h(null);
    let y = !0, i = !1, p = null;
    da(() => {
      p = null;
      const c = A.value;
      if (!c || y && !i && !f.page.hasNewer) return;
      const u = new Set(f.page.messages.map((q) => q.id)), b = [...c.querySelectorAll("[data-message-id]")].find((q) => u.has(q.dataset.messageId) && q.getBoundingClientRect().bottom > c.getBoundingClientRect().top);
      b && (p = {
        id: b.dataset.messageId,
        offset: b.getBoundingClientRect().top - c.getBoundingClientRect().top
      });
    }), oa(() => {
      const c = A.value;
      if (c)
        if (p) {
          const u = [...c.querySelectorAll("[data-message-id]")].find((b) => b.dataset.messageId === p.id);
          u && (c.scrollTop += u.getBoundingClientRect().top - c.getBoundingClientRect().top - p.offset), p = null;
        } else y && !i && !f.page.hasNewer && (c.scrollTop = c.scrollHeight);
    });
    function D() {
      const c = A.value;
      c && (y = c.scrollHeight - c.clientHeight - c.scrollTop < 70);
    }
    async function R() {
      await Ie(), y && !i && !f.page.hasNewer && A.value && (A.value.scrollTop = A.value.scrollHeight);
    }
    pe(() => [
      f.page.messages.at(-1)?.id,
      f.outgoing?.messageId,
      v.value,
      f.sendFailure,
      f.sendError,
      C.value?.replies.length,
      C.value?.characterStateDone,
      I.value && C.value?.characterState
    ], R, { immediate: !0 });
    async function H() {
      if (!(!A.value || i)) {
        i = !0;
        try {
          await f.loadMore(), await Ie();
        } finally {
          i = !1, D();
        }
      }
    }
    return $({ sent() {
      y = !0, R();
    } }), (c, u) => (l(), n("section", Ds, [
      e("header", Ts, [
        e("button", {
          class: "messages-icon-button",
          "aria-label": x(V).back,
          onClick: u[0] || (u[0] = (b) => c.$emit("back"))
        }, [M(N, { name: "back" })], 8, Rs),
        M(ke, {
          identity: a.contact.id,
          name: a.contact.name,
          small: ""
        }, null, 8, ["identity", "name"]),
        e("div", Ns, [e("h2", null, g(a.contact.name), 1)]),
        M(As, {
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
          "aria-label": x(V).details,
          onClick: u[1] || (u[1] = (b) => c.$emit("details"))
        }, [M(N, { name: "more" })], 8, qs)
      ]),
      e("div", {
        ref_key: "scroller",
        ref: A,
        class: "messages-thread-scroll",
        onScroll: D,
        onClick: k,
        onKeydown: u[8] || (u[8] = _e((b) => d.value = "", ["esc"]))
      }, [
        e("p", Ls, g(x(V).contextHint), 1),
        a.page.hasMore ? (l(), n("button", {
          key: 0,
          class: "messages-older",
          disabled: a.loading,
          onClick: H
        }, g(a.loading ? x(V).loadingOlder : x(V).older), 9, Ps)) : w("", !0),
        a.loading && !a.page.messages.length ? (l(), n("p", Us, g(x(V).loading), 1)) : w("", !0),
        (l(!0), n(T, null, me(a.page.messages, (b, q) => (l(), n(T, { key: b.id }, [
          q === 0 || b.createdAt - a.page.messages[q - 1].createdAt > 3e5 ? (l(), n("time", _s, g(new Date(b.createdAt).toLocaleString(void 0, {
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          })), 1)) : w("", !0),
          M(as, {
            message: b,
            bridge: a.bridge,
            "chat-identity": a.chatIdentity,
            media: a.media,
            disabled: a.disabled,
            selected: d.value === b.id,
            permission: a.page.permissions[b.id],
            onSelect: u[2] || (u[2] = (O) => d.value = O),
            onResize: R,
            onDeleteMessage: u[3] || (u[3] = (O) => c.$emit("deleteMessage", O)),
            onRegenerate: u[4] || (u[4] = (O) => c.$emit("regenerate", O))
          }, null, 8, [
            "message",
            "bridge",
            "chat-identity",
            "media",
            "disabled",
            "selected",
            "permission"
          ]),
          b.id === a.page.retryMessageId && !r.value ? (l(), ve(qe, {
            key: 1,
            sending: a.busy?.messageId === b.id && ["saving", "uploading"].includes(v.value),
            error: E(b.id),
            "pending-save": a.pendingSave,
            disabled: a.retryDisabled,
            onRetry: (O) => c.$emit("retry", b.id)
          }, null, 8, [
            "sending",
            "error",
            "pending-save",
            "disabled",
            "onRetry"
          ])) : w("", !0)
        ], 64))), 128)),
        a.outgoing && S.value ? (l(), n(T, { key: 2 }, [e("div", Fs, [e("div", { class: W(["messages-bubble", { "messages-bubble-image": a.outgoing.payload.type === "image" }]) }, [a.outgoing.payload.type === "text" ? (l(), n("p", Vs, g(a.outgoing.payload.text), 1)) : (l(), n(T, { key: 1 }, [e("img", {
          class: "messages-pending-image",
          src: a.outgoing.payload.upload.dataUrl,
          alt: a.outgoing.payload.upload.name,
          onLoad: R
        }, null, 40, zs), a.outgoing.payload.description ? (l(), n("p", Os, g(a.outgoing.payload.description), 1)) : w("", !0)], 64))], 2)]), M(qe, {
          sending: a.working || a.busy?.messageId === a.outgoing.messageId,
          error: E(a.outgoing.messageId) || x(V).unfinished,
          "pending-save": a.pendingSave,
          disabled: a.retryDisabled,
          discard: "",
          onRetry: u[5] || (u[5] = (b) => c.$emit("retry", a.outgoing.messageId)),
          onDiscard: u[6] || (u[6] = (b) => c.$emit("discard", a.outgoing.messageId))
        }, null, 8, [
          "sending",
          "error",
          "pending-save",
          "disabled"
        ])], 64)) : w("", !0),
        (l(!0), n(T, null, me(C.value?.replies ?? [], (b, q) => (l(), n("div", {
          key: q,
          class: "messages-bubble-row messages-provisional"
        }, [e("div", { class: W(["messages-bubble", `messages-bubble-${b.type}`]) }, [b.type === "text" ? (l(), n("p", Gs, g(b.text), 1)) : b.type === "image" ? (l(), n(T, { key: 1 }, [e("div", Hs, [M(N, { name: "image" }), e("span", null, g(x(V).image), 1)]), e("p", Zs, g(b.description), 1)], 64)) : (l(), n(T, { key: 2 }, [e("small", Ks, g(x(V).voice), 1), e("p", js, g(b.transcript), 1)], 64))], 2)]))), 128)),
        r.value && S.value ? (l(), n("div", Ys, [
          u[12] || (u[12] = e("span", null, [
            e("i"),
            e("i"),
            e("i")
          ], -1)),
          ie(g(v.value === "summarizing" ? x(V).summarizing : x(V).replying) + " ", 1),
          C.value?.characterState ? (l(), n("button", {
            key: 0,
            class: "messages-peek",
            "aria-expanded": I.value,
            onClick: u[7] || (u[7] = (b) => I.value = !I.value)
          }, g(I.value ? x(V).hideCharacterState : x(V).showCharacterState), 9, Xs)) : w("", !0)
        ])) : w("", !0),
        I.value && C.value?.characterState ? (l(), n("p", Js, g(C.value.characterState), 1)) : w("", !0)
      ], 544),
      a.page.hasNewer ? (l(), n("button", {
        key: 0,
        class: "messages-latest",
        onClick: u[9] || (u[9] = (b) => {
          va(y) ? y.value = !0 : y = !0, c.$emit("latest");
        })
      }, g(x(V).latest), 1)) : w("", !0),
      M(ys, {
        draft: s.value,
        "onUpdate:draft": u[10] || (u[10] = (b) => s.value = b),
        disabled: a.sendDisabled,
        sending: !1,
        "waiting-for": a.waitingFor,
        onSend: u[11] || (u[11] = (b) => c.$emit("send", b))
      }, null, 8, [
        "draft",
        "disabled",
        "waiting-for"
      ])
    ]));
  }
}), Ws = Qs, et = () => ({
  text: "",
  image: null
});
function Ce() {
  return Array.from(globalThis.crypto.getRandomValues(new Uint8Array(16)), (a) => a.toString(16).padStart(2, "0")).join("");
}
var at = Object.freeze({ chooseConversation: "选择一个对话" }), st = { class: "messages-app" }, tt = {
  key: 0,
  class: "messages-banner",
  role: "status"
}, lt = { class: "messages-save-actions" }, nt = ["disabled"], it = ["disabled"], ut = {
  key: 1,
  class: "messages-banner",
  role: "status"
}, ot = { key: 0 }, rt = { class: "messages-save-actions" }, dt = ["disabled"], vt = ["disabled"], gt = {
  key: 2,
  class: "messages-notice"
}, mt = {
  key: 3,
  class: "messages-error",
  role: "alert"
}, ct = {
  key: 4,
  class: "messages-banner",
  role: "alert"
}, yt = ["disabled"], bt = {
  key: 1,
  class: "messages-selection"
}, ft = { id: "messages-dialog-title" }, pt = ["disabled"], kt = {
  key: 0,
  class: "messages-error",
  role: "alert"
}, ht = ["disabled"], $t = { class: "messages-search" }, wt = ["aria-busy"], Ct = {
  key: 0,
  class: "messages-subtle",
  role: "status"
}, It = { key: 1 }, St = ["disabled"], Mt = ["disabled", "onClick"], Et = { key: 0 }, xt = {
  key: 0,
  class: "messages-subtle"
}, Bt = { class: "messages-manual" }, At = ["disabled"], Dt = ["disabled"], Tt = ["disabled"], Rt = {
  key: 0,
  role: "status"
}, Nt = { key: 1 }, qt = ["disabled"], Lt = {
  key: 0,
  role: "status"
}, Pt = { key: 1 }, Ut = ["disabled"], _t = ["disabled"], Ft = ["disabled"], Vt = { class: "messages-manual" }, zt = ["disabled"], Ot = ["disabled"], Gt = ["disabled"], Ht = ["disabled"], Zt = ["disabled"], Kt = /* @__PURE__ */ j({
  __name: "MessagesApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(a) {
    const $ = a, s = h($.initialState), f = (o = "") => ({
      contactId: o,
      messages: [],
      hasMore: !1,
      hasNewer: !1,
      retryMessageId: null,
      revision: "",
      permissions: {}
    }), d = h(""), k = h(f()), v = h(!1), r = h(!1), S = h(!1), C = h(!1), I = h(""), E = h(""), A = h(null), y = h(!1), i = h("add"), p = B(() => y.value && (i.value === "sync" || i.value === "recover")), D = h(null), R = B(() => s.value.syncNotice.messageIds.length), H = h(""), c = h(""), u = B(() => i.value === "delete" ? Z.value?.deleteReason ?? "" : k.value.permissions[H.value]?.reason ?? ""), b = h(""), q = h(""), O = h(""), ee = h("ready"), ye = h(Ce());
    let X = !0, ue = 0, te = 0, oe = !1;
    const re = Fe(/* @__PURE__ */ new Map()), Ee = B({
      get: () => re.get(d.value) ?? et(),
      set: (o) => {
        re.set(d.value, o);
      }
    }), P = h(null), J = h(null), le = B(() => s.value.outgoing ?? P.value), Oe = B(() => le.value?.contactId === d.value && !k.value.messages.some((o) => o.id === le.value?.messageId) ? le.value : null), Z = B(() => s.value.contacts.find((o) => o.id === d.value)), Ge = B(() => s.value.busy && s.value.busy.contactId !== d.value ? s.value.contacts.find((o) => o.id === s.value.busy?.contactId)?.name ?? "另一位联系人" : ""), ge = B(() => s.value.pendingSave || s.value.pendingModification || [
      "unconfirmed",
      "conflict",
      "failed"
    ].includes(s.value.fileState)), _ = B(() => r.value || !!s.value.busy || s.value.operationPending || ge.value || s.value.fileState !== "ready" || s.value.generationActive), xe = B(() => s.value.knownPeople.filter((o) => !s.value.contacts.some((t) => t.name === o.name) && `${o.name} ${o.aliases.join(" ")}`.toLocaleLowerCase().includes(O.value.toLocaleLowerCase())));
    async function L(o, t = {}) {
      return (await $.bridge.request(o, {
        chatIdentity: s.value.chatIdentity,
        ...t
      }, 6e4)).result;
    }
    async function ae(o = !1, t = !1) {
      const m = d.value;
      if (!m) return;
      o ? oe = !1 : t && (oe = !0);
      const G = ++ue;
      v.value = !0, E.value = "";
      try {
        const K = k.value, se = await L("messages/thread", {
          contactId: m,
          ...o ? {
            before: K.messages[0]?.seq,
            revision: K.revision
          } : !oe && K.messages.length ? { window: {
            first: K.messages[0].seq,
            last: K.messages.at(-1).seq,
            latest: !K.hasNewer
          } } : {}
        });
        if (!X || G !== ue || d.value !== m || se.revision !== s.value.revision) return;
        const he = o && K.revision === se.revision, $e = he ? [...se.messages, ...K.messages].slice(0, 100) : se.messages;
        k.value = {
          ...se,
          messages: $e,
          hasNewer: he ? $e.at(-1)?.id !== K.messages.at(-1)?.id || K.hasNewer : se.hasNewer,
          permissions: he ? {
            ...K.permissions,
            ...se.permissions
          } : se.permissions
        }, oe = !1, P.value?.contactId === m && $e.some((ia) => ia.id === P.value?.messageId) && (P.value = null, J.value = null);
      } catch {
        X && G === ue && d.value === m && (E.value = "消息暂时无法读取。");
      } finally {
        G === ue && (v.value = !1);
      }
    }
    function U(o) {
      if (!X || o.chatIdentity !== s.value.chatIdentity) return;
      const t = s.value.revision !== o.revision || s.value.boundary !== o.boundary || s.value.fileState !== o.fileState || s.value.pendingSave !== o.pendingSave;
      s.value = o, P.value && (o.outgoing?.messageId === P.value.messageId || o.busy?.messageId === P.value.messageId || o.contacts.some((m) => m.lastMessageId === P.value.messageId)) && (P.value = null, J.value = null);
      for (const m of re.keys()) o.contacts.some((G) => G.id === m) || re.delete(m);
      P.value && !o.contacts.some((m) => m.id === P.value?.contactId) && (P.value = null, J.value = null), d.value && !o.contacts.some((m) => m.id === d.value) ? be() : d.value && t && ae();
    }
    const He = $.bridge.subscribe((o) => {
      o.type === "messages/state" && U(o.payload.state);
    });
    function Be(o) {
      o !== d.value && (d.value = o, oe = !1, I.value = "", k.value = f(o), ae());
    }
    function be() {
      d.value = "", oe = !1, ue++, E.value = "", k.value = f();
    }
    Ve(() => (be(), !0), () => !!d.value);
    async function Y(o, t = () => !0) {
      if (!r.value) {
        r.value = !0, I.value = "";
        try {
          await o();
        } catch (m) {
          X && t() && (I.value = m instanceof Error && m.message !== "host_request_timeout" ? m.message : z.operationTimeout);
        } finally {
          r.value = !1;
        }
      }
    }
    function Ze(o) {
      if (_.value || le.value) return;
      const t = {
        contactId: d.value,
        messageId: `input:${Ce()}`,
        payload: o,
        createdAt: Date.now()
      };
      P.value = t, J.value = null, re.delete(t.contactId), ae(!1, !0), A.value?.sent(), Ae(t.contactId, t.messageId, t);
    }
    async function Ae(o, t, m) {
      if (!r.value) {
        r.value = !0, J.value = null, I.value = "";
        try {
          if (ge.value && (U(await L("messages/confirm")), ge.value))
            return;
          const G = m?.payload.type === "image" ? {
            type: "image",
            description: m.payload.description,
            upload: { ...m.payload.upload }
          } : m ? {
            type: "text",
            text: m.payload.text
          } : void 0;
          U(m ? await L("messages/send", {
            contactId: o,
            actionId: t.slice(6),
            payload: G
          }) : await L("messages/retry", {
            contactId: o,
            messageId: t
          }));
        } catch (G) {
          X && (J.value = {
            contactId: o,
            messageId: t,
            message: G instanceof Error && G.message !== "host_request_timeout" ? G.message : "还不确定是否发送成功，可以重试。"
          });
        } finally {
          r.value = !1;
        }
      }
    }
    function Ke(o) {
      const t = le.value?.messageId === o ? le.value : void 0;
      Ae(d.value, o, t);
    }
    function je(o) {
      Y(async () => {
        U(await L("messages/discard-send", { messageId: o })), P.value?.messageId === o && (P.value = null), J.value = null, await ae();
      });
    }
    function Ye(o) {
      Y(async () => U(await L(o)));
    }
    function Xe(o) {
      Y(async () => {
        U(await L("messages/settings", { settings: o })), F();
      });
    }
    function Je() {
      if (S.value) return;
      S.value = !0, I.value = "";
      const o = te;
      L("messages/sync").then((t) => {
        U(t), te === o && F();
      }).catch((t) => {
        X && te === o && s.value.settings.syncNoticeEnabled && (I.value = t instanceof Error && t.message !== "host_request_timeout" ? t.message : z.operationTimeout);
      }).finally(() => {
        S.value = !1;
      });
    }
    function De() {
      if (C.value || !s.value.settings.syncNoticeEnabled) return;
      C.value = !0, I.value = "";
      const o = te;
      L("messages/dismiss-sync-notice").then((t) => {
        U(t), y.value && te === o && F(), I.value = "";
      }).catch((t) => {
        X && (I.value = t instanceof Error && t.message !== "host_request_timeout" ? t.message : z.settingsFailed);
      }).finally(() => {
        C.value = !1;
      });
    }
    function ne(o) {
      y.value && Ie(() => D.value?.focus()), te++, i.value = o, I.value = "", b.value = "", q.value = Z.value?.note ?? "", O.value = "", ye.value = Ce(), y.value = !0, c.value = s.value.revision, o === "add" && Te();
    }
    async function Te() {
      const o = ye.value, t = () => X && y.value && i.value === "add" && ye.value === o;
      ee.value = "loading";
      try {
        const m = await L("messages/refresh");
        if (!t()) return;
        U(m), ee.value = "ready";
      } catch {
        t() && (ee.value = "failed");
      }
    }
    function F() {
      p.value && (I.value = ""), y.value = !1, te++;
    }
    function Re() {
      F();
    }
    function Qe() {
      if (r.value && p.value) {
        F();
        return;
      }
      r.value || (i.value === "delete" ? i.value = "detail" : i.value === "recover" ? i.value = "sync" : Re());
    }
    function Ne(o = b.value) {
      !o.trim() || _.value || ee.value === "loading" || Y(async () => {
        const t = await L("messages/contact/add", {
          actionId: ye.value,
          name: o.trim(),
          note: q.value.trim()
        });
        U(t.state), F(), Be(t.contactId);
      });
    }
    function We() {
      Y(async () => {
        U(await L("messages/contact/note", {
          contactId: d.value,
          note: q.value
        })), F();
      });
    }
    function ea() {
      Y(async () => {
        U(await L("messages/contact/delete", {
          contactId: d.value,
          revision: c.value
        })), F(), be();
      });
    }
    function aa(o) {
      H.value = o, ne("delete-message"), c.value = k.value.revision;
    }
    function sa() {
      const o = d.value, t = H.value;
      Y(async () => {
        U(await L("messages/message/delete", {
          contactId: o,
          messageId: t,
          revision: c.value
        })), await ae(), F();
      });
    }
    function ta(o) {
      const t = {
        contactId: d.value,
        messageId: o,
        revision: k.value.revision
      };
      Y(async () => {
        U(await L("messages/regenerate", t));
      });
    }
    function la() {
      Y(async () => {
        U(await L("messages/recover")), F();
      });
    }
    function na() {
      Y(async () => {
        U(await L("messages/adopt-server-state")), s.value.fileState === "ready" && !s.value.pendingSave ? (P.value = null, J.value = null, F()) : I.value = "暂时无法加载已保存版本，请检查网络后重试。当前记录未改。";
      });
    }
    return Se(() => {
      X = !1, ue++, He();
    }), (o, t) => (l(), n("main", st, [
      ge.value ? (l(), n("div", tt, [e("span", null, g(s.value.fileState === "conflict" ? "服务器上的存档已有变化，请选择如何处理。" : "还不确定部分消息是否保存成功，请先检查保存。"), 1), e("div", lt, [e("button", {
        disabled: r.value || s.value.operationPending || !!s.value.busy,
        onClick: t[0] || (t[0] = (m) => Ye("messages/confirm"))
      }, "检查保存", 8, nt), s.value.fileState === "conflict" || s.value.recoveryBlocked ? (l(), n("button", {
        key: 0,
        disabled: r.value || s.value.operationPending || !!s.value.busy || s.value.generationActive,
        onClick: t[1] || (t[1] = (m) => ne("adopt"))
      }, "使用已保存版本", 8, it)) : w("", !0)])])) : R.value && s.value.settings.syncNoticeEnabled && !s.value.busy ? (l(), n("div", ut, [
        e("span", null, g(x(z).pending(R.value)), 1),
        s.value.syncNotice.error ? (l(), n("span", ot, g(s.value.syncNotice.error), 1)) : w("", !0),
        e("div", rt, [e("button", {
          disabled: _.value,
          onClick: t[2] || (t[2] = (m) => ne("sync"))
        }, g(x(z).view), 9, dt), e("button", {
          disabled: C.value,
          onClick: De
        }, g(x(z).dismiss), 9, vt)])
      ])) : w("", !0),
      s.value.generationActive ? (l(), n("div", gt, "故事正在继续，稍后就能发送消息。")) : w("", !0),
      I.value && !p.value || s.value.error ? (l(), n("p", mt, g(!p.value && I.value || s.value.error), 1)) : w("", !0),
      E.value ? (l(), n("div", ct, [e("span", null, g(E.value), 1), e("button", {
        disabled: v.value,
        onClick: t[3] || (t[3] = (m) => ae())
      }, "重新加载", 8, yt)])) : w("", !0),
      e("div", { class: W(["messages-layout", {
        "has-conversation": !!Z.value,
        "is-empty": !s.value.contacts.length
      }]) }, [M(Da, {
        contacts: s.value.contacts,
        "active-contact-id": d.value,
        "busy-contact-id": s.value.busy?.contactId ?? "",
        drafts: re,
        onSelect: Be,
        onAdd: t[4] || (t[4] = (m) => ne("add")),
        onSettings: t[5] || (t[5] = (m) => ne("settings"))
      }, null, 8, [
        "contacts",
        "active-contact-id",
        "busy-contact-id",
        "drafts"
      ]), Z.value ? (l(), ve(Ws, {
        key: Z.value.id,
        ref_key: "conversation",
        ref: A,
        draft: Ee.value,
        "onUpdate:draft": t[6] || (t[6] = (m) => Ee.value = m),
        "context-state": s.value,
        contact: Z.value,
        page: k.value,
        bridge: a.bridge,
        "chat-identity": s.value.chatIdentity,
        disabled: _.value,
        "send-disabled": _.value || !!le.value,
        busy: s.value.busy,
        outgoing: Oe.value,
        "send-failure": s.value.sendFailure,
        "send-error": J.value,
        working: r.value,
        "pending-save": ge.value,
        "retry-disabled": r.value || s.value.operationPending || !!s.value.busy || s.value.generationActive || s.value.fileState === "conflict",
        loading: v.value,
        "load-more": () => ae(!0),
        media: s.value.media,
        "waiting-for": Ge.value,
        onBack: be,
        onDetails: t[7] || (t[7] = (m) => ne("detail")),
        onSend: Ze,
        onRetry: Ke,
        onDiscard: je,
        onDeleteMessage: aa,
        onRegenerate: ta,
        onLatest: t[8] || (t[8] = (m) => ae(!1, !0))
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
      ])) : (l(), n("div", bt, [M(N, { name: "message" }), e("p", null, g(x(at).chooseConversation), 1)]))], 2),
      y.value ? (l(), ve(ze, {
        key: 5,
        class: "messages-dialog",
        "aria-labelledby": "messages-dialog-title",
        busy: r.value && !p.value,
        onClose: Qe
      }, {
        default: Ue(() => [
          e("header", null, [
            i.value === "detail" && Z.value ? (l(), ve(ke, {
              key: 0,
              identity: Z.value.id,
              name: Z.value.name,
              small: ""
            }, null, 8, ["identity", "name"])) : w("", !0),
            e("h2", ft, g(i.value === "settings" ? "信息设置" : i.value === "add" ? "新的对话" : i.value === "detail" ? Z.value?.name : i.value === "delete" ? "删除联系人？" : i.value === "delete-message" ? "删除这条消息？" : i.value === "sync" ? x(z).title : i.value === "adopt" ? "使用已保存版本？" : "在当前位置补记？"), 1),
            e("button", {
              ref_key: "dialogClose",
              ref: D,
              class: "messages-icon-button",
              "aria-label": "关闭",
              disabled: r.value && !p.value,
              onClick: Re
            }, [M(N, { name: "close" })], 8, pt)
          ]),
          I.value || p.value && s.value.syncNotice.error ? (l(), n("p", kt, g(I.value || s.value.syncNotice.error), 1)) : w("", !0),
          i.value === "settings" ? (l(), n(T, { key: 1 }, [M(La, {
            settings: s.value.settings,
            busy: r.value || s.value.operationPending,
            onSave: Xe
          }, null, 8, ["settings", "busy"]), R.value ? (l(), n("button", {
            key: 0,
            class: "messages-secondary messages-sync-entry",
            disabled: r.value,
            onClick: t[9] || (t[9] = (m) => ne("sync"))
          }, g(x(z).title) + " · " + g(R.value), 9, ht)) : w("", !0)], 64)) : i.value === "add" ? (l(), n(T, { key: 2 }, [
            e("label", $t, [M(N, { name: "search" }), Q(e("input", {
              "onUpdate:modelValue": t[10] || (t[10] = (m) => O.value = m),
              placeholder: "查找已知人物",
              "aria-label": "查找已知人物",
              "aria-describedby": "messages-people-source"
            }, null, 512), [[de, O.value]])]),
            t[22] || (t[22] = e("div", {
              id: "messages-people-source",
              class: "messages-subtle messages-people-source"
            }, "人物来自当前聊天的剧情总结，需要开启总结功能；找不到的人可以手动添加。", -1)),
            e("div", {
              class: "messages-known-list",
              "aria-busy": ee.value === "loading"
            }, [ee.value === "loading" ? (l(), n("p", Ct, "正在读取已知人物…")) : ee.value === "failed" ? (l(), n("div", It, [t[18] || (t[18] = e("p", {
              class: "messages-subtle",
              role: "alert"
            }, "已知人物暂时无法读取，可以重试或手动添加。", -1)), e("button", {
              class: "messages-secondary",
              disabled: r.value,
              onClick: Te
            }, "重新加载", 8, St)])) : (l(), n(T, { key: 2 }, [(l(!0), n(T, null, me(xe.value, (m) => (l(), n("button", {
              key: m.name,
              disabled: _.value,
              onClick: (G) => Ne(m.name)
            }, [
              M(ke, {
                identity: m.name,
                name: m.name,
                small: ""
              }, null, 8, ["identity", "name"]),
              e("span", null, [ie(g(m.name), 1), m.aliases.length ? (l(), n("small", Et, g(m.aliases.join("、")), 1)) : w("", !0)]),
              M(N, { name: "plus" })
            ], 8, Mt))), 128)), xe.value.length ? w("", !0) : (l(), n("p", xt, g(O.value ? "没有匹配的人物，可以在下面手动添加。" : "暂无可添加的已知人物，可以在下面手动添加。"), 1))], 64))], 8, wt),
            e("details", Bt, [t[21] || (t[21] = e("summary", null, "想联系的人不在这里？", -1)), e("form", { onSubmit: t[13] || (t[13] = ce((m) => Ne(), ["prevent"])) }, [
              e("label", null, [t[19] || (t[19] = ie("姓名", -1)), Q(e("input", {
                "onUpdate:modelValue": t[11] || (t[11] = (m) => b.value = m),
                maxlength: "120",
                required: "",
                placeholder: "对方的姓名"
              }, null, 512), [[de, b.value]])]),
              e("label", null, [t[20] || (t[20] = ie("身份说明（可选）", -1)), Q(e("textarea", {
                "onUpdate:modelValue": t[12] || (t[12] = (m) => q.value = m),
                maxlength: "600",
                rows: "2",
                placeholder: "例如：住在隔壁的花店老板"
              }, null, 512), [[de, q.value]])]),
              e("button", {
                class: "messages-primary",
                disabled: _.value || ee.value === "loading" || !b.value.trim()
              }, "添加并聊天", 8, At)
            ], 32)])
          ], 64)) : i.value === "detail" ? (l(), n("form", {
            key: 3,
            onSubmit: ce(We, ["prevent"])
          }, [
            e("label", null, [t[23] || (t[23] = ie("身份说明 / 备注", -1)), Q(e("textarea", {
              "onUpdate:modelValue": t[14] || (t[14] = (m) => q.value = m),
              maxlength: "600",
              rows: "3",
              placeholder: "帮助辨认这位联系人"
            }, null, 512), [[de, q.value]])]),
            e("button", {
              class: "messages-primary",
              disabled: _.value
            }, "保存备注", 8, Dt),
            e("button", {
              type: "button",
              class: "messages-danger",
              disabled: _.value,
              onClick: t[15] || (t[15] = (m) => i.value = "delete")
            }, "删除联系人与通讯记录", 8, Tt)
          ], 32)) : i.value === "delete" ? (l(), n(T, { key: 4 }, [
            u.value ? (l(), n("p", Rt, g(u.value), 1)) : (l(), n("p", Nt, "删除与 " + g(Z.value?.name) + " 的全部通讯和摘要，同时更新主聊天记录。其他联系人和图库文件保留，删除后不能恢复。", 1)),
            e("button", {
              class: "messages-danger",
              disabled: _.value || !!u.value,
              onClick: ea
            }, "确认删除", 8, qt),
            e("button", {
              class: "messages-secondary",
              onClick: t[16] || (t[16] = (m) => i.value = "detail")
            }, "保留联系人")
          ], 64)) : i.value === "delete-message" ? (l(), n(T, { key: 5 }, [
            u.value ? (l(), n("p", Lt, g(u.value), 1)) : (l(), n("p", Pt, "删除这条消息，同时更新主聊天记录。后续回复、其他消息和图库文件保留，删除后不能恢复。")),
            e("button", {
              class: "messages-danger",
              disabled: _.value || !!u.value,
              onClick: sa
            }, "确认删除", 8, Ut),
            e("button", {
              class: "messages-secondary",
              onClick: F
            }, "取消")
          ], 64)) : i.value === "sync" ? (l(), n(T, { key: 6 }, [
            e("p", null, g(x(z).pending(R.value)), 1),
            e("p", null, g(x(z).description), 1),
            e("button", {
              class: "messages-primary",
              disabled: _.value || S.value,
              onClick: Je
            }, g(x(z).retry), 9, _t),
            s.value.settings.syncNoticeEnabled ? (l(), n("button", {
              key: 0,
              class: "messages-secondary",
              disabled: C.value,
              onClick: De
            }, g(x(z).dismiss), 9, Ft)) : w("", !0),
            e("details", Vt, [
              t[24] || (t[24] = e("summary", null, "原来的记录已被修改或删除？", -1)),
              t[25] || (t[25] = e("p", null, "不会覆盖你的修改。需要这些消息继续进入剧情时，可以在当前位置另加一条补记。", -1)),
              e("button", {
                class: "messages-secondary",
                disabled: _.value,
                onClick: t[17] || (t[17] = (m) => i.value = "recover")
              }, "查看补记方式", 8, zt)
            ])
          ], 64)) : i.value === "adopt" ? (l(), n(T, { key: 7 }, [
            t[26] || (t[26] = e("p", null, "将读取服务器上的当前聊天小白 OS 存档，放弃本地尚未确认的修改。信息 APP 会显示服务器已保存的联系人和消息。", -1)),
            t[27] || (t[27] = e("p", { class: "messages-subtle" }, "这项选择作用于当前聊天的整份 OS 存档，不会删除主聊天里的记录，也不会重新生成回复。", -1)),
            e("button", {
              class: "messages-danger",
              disabled: r.value || !!s.value.busy || s.value.generationActive,
              onClick: na
            }, "确认使用已保存版本", 8, Ot),
            e("button", {
              class: "messages-secondary",
              disabled: r.value,
              onClick: F
            }, "暂不处理", 8, Gt)
          ], 64)) : (l(), n(T, { key: 8 }, [
            t[28] || (t[28] = e("p", null, "先检查已有记录；仍未写入的消息会在主聊天当前位置标为「补录」，保留原发送时间。不会覆盖旧记录或恢复你删除的那一条。", -1)),
            e("button", {
              class: "messages-primary",
              disabled: _.value,
              onClick: la
            }, "确认补记", 8, Ht),
            e("button", {
              class: "messages-secondary",
              disabled: r.value,
              onClick: F
            }, "暂不补记", 8, Zt)
          ], 64))
        ]),
        _: 1
      }, 8, ["busy"])) : w("", !0)
    ]));
  }
}), Qt = Kt;
export {
  Qt as default
};
