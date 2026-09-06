/* eslint-disable */
import { A as ce, B as ye, C as oe, F as p, M as Z, P as Be, S as Te, T as ae, V as b, _ as j, c as q, d as ie, f as h, g as M, h as U, i as Y, k as fe, l as P, o as be, p as l, s as J, u as e, v as _, w as t, y as ue, z as Q } from "./xiaobai-os-runtime-dom.esm-bundler-DmE9neiz.js";
var De = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, qe = ["d"], Le = /* @__PURE__ */ j({
  __name: "MessageIcon",
  props: { name: {} },
  setup(a) {
    const y = {
      back: "m14 5-7 7 7 7",
      plus: "M12 5v14M5 12h14",
      send: "m5 12 7-7 7 7M12 5v15",
      image: "M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm-1 12 5-5 4 4 3-3 4 4M15 8h.01",
      voice: "M9 5a3 3 0 0 1 6 0v6a3 3 0 0 1-6 0V5Zm-3 6a6 6 0 0 0 12 0M12 17v4M9 21h6",
      search: "M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-2 5 6 6",
      more: "M5 12h.01M12 12h.01M19 12h.01",
      close: "m6 6 12 12M6 18 18 6",
      play: "m8 5 11 7-11 7V5Z",
      stop: "M7 7h10v10H7Z"
    };
    return (i, r) => (t(), l("svg", De, [e("path", { d: y[a.name] }, null, 8, qe)]));
  }
}), E = Le, Pe = /* @__PURE__ */ j({
  __name: "ContactAvatar",
  props: {
    identity: {},
    name: {},
    small: { type: Boolean }
  },
  setup(a) {
    const y = a, i = P(() => {
      let r = 0;
      for (const n of y.identity) r = Math.imul(r, 31) + n.codePointAt(0) | 0;
      return String((r >>> 0) % 360);
    });
    return (r, n) => (t(), l("span", {
      class: Q(["messages-avatar", { small: a.small }]),
      style: ye({ "--avatar-hue": i.value }),
      "aria-hidden": "true"
    }, b(Array.from(a.name)[0]), 7));
  }
}), ee = Pe, Ue = { class: "messages-contacts" }, Ve = { class: "messages-home-header" }, Fe = { class: "messages-search" }, ze = {
  key: 0,
  class: "messages-empty"
}, Ge = {
  key: 1,
  class: "messages-contact-rows"
}, He = {
  key: 0,
  class: "messages-subtle"
}, Ke = ["onClick"], Re = { class: "messages-contact-copy" }, je = { class: "messages-contact-heading" }, Ne = {
  key: 0,
  class: "messages-preview messages-preview-active"
}, Ze = {
  key: 1,
  class: "messages-preview"
}, Ye = {
  key: 2,
  class: "messages-preview"
}, Je = {
  key: 2,
  class: "messages-list-footer"
}, We = /* @__PURE__ */ j({
  __name: "ContactList",
  props: {
    contacts: {},
    busyContactId: {},
    drafts: {}
  },
  emits: ["select", "add"],
  setup(a) {
    const y = a, i = p(""), r = P(() => y.contacts.filter((g) => `${g.name} ${g.note}`.toLocaleLowerCase().includes(i.value.toLocaleLowerCase())));
    function n(g) {
      if (g === null) return "";
      const d = new Date(g);
      return d.toDateString() === (/* @__PURE__ */ new Date()).toDateString() ? d.toLocaleTimeString(void 0, {
        hour: "2-digit",
        minute: "2-digit"
      }) : d.toLocaleDateString(void 0, {
        month: "numeric",
        day: "numeric"
      });
    }
    return (g, d) => (t(), l("section", Ue, [
      e("header", Ve, [e("div", null, [d[4] || (d[4] = e("span", { class: "messages-eyebrow" }, "你们的对话，留在这里", -1)), e("h1", null, [d[3] || (d[3] = U("信息", -1)), e("span", null, b(a.contacts.length || ""), 1)])]), e("button", {
        class: "messages-icon-button",
        "aria-label": "添加联系人",
        onClick: d[0] || (d[0] = (o) => g.$emit("add"))
      }, [M(E, { name: "plus" })])]),
      e("label", Fe, [M(E, { name: "search" }), Z(e("input", {
        "onUpdate:modelValue": d[1] || (d[1] = (o) => i.value = o),
        type: "search",
        placeholder: "搜索联系人",
        "aria-label": "搜索联系人"
      }, null, 512), [[Y, i.value]])]),
      a.contacts.length ? (t(), l("div", Ge, [r.value.length ? h("", !0) : (t(), l("p", He, "没有找到这个人。")), (t(!0), l(q, null, ae(r.value, (o) => (t(), l("button", {
        key: o.id,
        class: "messages-contact-row",
        onClick: (S) => g.$emit("select", o.id)
      }, [M(ee, {
        identity: o.id,
        name: o.name
      }, null, 8, ["identity", "name"]), e("span", Re, [e("span", je, [e("strong", null, b(o.name), 1), e("time", null, b(n(o.lastAt)), 1)]), a.busyContactId === o.id ? (t(), l("span", Ne, "正在等待回复…")) : a.drafts.get(o.id)?.text.trim() || a.drafts.get(o.id)?.image ? (t(), l("span", Ze, [d[9] || (d[9] = e("em", null, "草稿", -1)), U(" " + b(a.drafts.get(o.id)?.image ? "［图片］" : "") + b(a.drafts.get(o.id)?.text), 1)])) : (t(), l("span", Ye, b(o.preview), 1))])], 8, Ke))), 128))])) : (t(), l("div", ze, [
        d[6] || (d[6] = e("div", { class: "messages-empty-art" }, [
          e("span"),
          e("span"),
          e("i")
        ], -1)),
        d[7] || (d[7] = e("h2", null, "有些话，想单独说", -1)),
        d[8] || (d[8] = e("p", null, [
          U("从已知人物中选一个，"),
          e("br"),
          U("开始你们的第一段对话。")
        ], -1)),
        e("button", {
          class: "messages-primary",
          onClick: d[2] || (d[2] = (o) => g.$emit("add"))
        }, [d[5] || (d[5] = U("选择联系人", -1)), M(E, { name: "plus" })])
      ])),
      a.contacts.length ? (t(), l("footer", Je, b(a.contacts.length) + " 位联系人 · 只属于你们的对话", 1)) : h("", !0)
    ]));
  }
}), Xe = We, Oe = { key: 0 }, Qe = ["src", "alt"], _e = ["disabled"], ea = {
  key: 3,
  class: "messages-image-placeholder messages-media-unavailable"
}, aa = {
  key: 4,
  class: "messages-image-caption"
}, sa = ["disabled"], ta = { "aria-label": "关闭图片" }, la = ["src", "alt"], na = ["disabled", "aria-label"], ia = {
  key: 0,
  class: "messages-media-unavailable-note"
}, ua = {
  key: 2,
  class: "messages-transcript"
}, oa = {
  key: 3,
  class: "messages-media-error",
  role: "status"
}, ra = /* @__PURE__ */ j({
  __name: "MessageBubble",
  props: {
    message: {},
    bridge: {},
    chatIdentity: {},
    media: {},
    disabled: { type: Boolean }
  },
  emits: ["resize", "deleteImage"],
  setup(a) {
    const y = a, i = p(""), r = p(!1), n = p(""), g = p(""), d = p(!1), o = P(() => y.message.payload.type === "image" ? y.message.payload.attachment : void 0), S = P(() => o.value?.path || i.value), x = p(!1), I = p(null), k = P(() => [
      "playing",
      "loading",
      "generating",
      "queued"
    ].includes(g.value)), c = p(!1);
    let f = !0;
    const w = ($) => y.bridge.request($, {
      chatIdentity: y.chatIdentity,
      messageId: y.message.id
    }, 18e4);
    async function C($) {
      if (!r.value) {
        r.value = !0, n.value = "";
        try {
          const { result: v } = await w($ ? "messages/image/generate" : "messages/image/check");
          f && (i.value = v.data ?? "", x.value = !1, $ && !i.value && (n.value = "请开启画图后再试，画面描述已保留。"));
        } catch {
          f && $ && (n.value = "图片生成失败，可以再试一次。");
        } finally {
          f && (r.value = !1);
        }
      }
    }
    async function F() {
      if (c.value) return;
      n.value = "";
      const $ = k.value;
      if (!(!$ && !y.media.voice))
        try {
          $ ? (c.value = !0, await w("messages/voice/stop"), f && (g.value = "")) : (g.value = "loading", await w("messages/voice/play"));
        } catch {
          f && ($ || (g.value = ""), n.value = $ ? "未能确认停止，请再点一次停止。" : "语音暂时无法播放，原文仍可查看。");
        } finally {
          f && (c.value = !1);
        }
    }
    const T = y.bridge.subscribe(($) => {
      if ($.type !== "messages/voice-state") return;
      const v = $.payload;
      v.messageId === y.message.id ? g.value = v.status : v.status === "playing" && (g.value = ""), v.messageId === y.message.id && v.status === "error" && (n.value = "播放失败，点击可以重试。");
    });
    return Te(() => {
      y.message.payload.type === "image" && !o.value && C(!1);
    }), ce(() => y.media.image, ($) => {
      $ && y.message.payload.type === "image" && !o.value && !i.value && C(!1);
    }), oe(() => {
      f = !1, T();
    }), ($, v) => (t(), l("article", { class: Q(["messages-bubble-row", { outgoing: a.message.sender === "user" }]) }, [e("div", { class: Q(["messages-bubble", `messages-bubble-${a.message.payload.type}`]) }, [a.message.payload.type === "text" ? (t(), l("p", Oe, b(a.message.payload.text), 1)) : a.message.payload.type === "image" ? (t(), l(q, { key: 1 }, [
      S.value && !x.value ? (t(), l("button", {
        key: 0,
        class: "messages-image-open",
        "aria-label": "放大图片",
        onClick: v[2] || (v[2] = (B) => I.value?.showModal())
      }, [e("img", {
        src: S.value,
        alt: a.message.payload.description || o.value?.name || "图片",
        onLoad: v[0] || (v[0] = (B) => $.$emit("resize")),
        onError: v[1] || (v[1] = (B) => x.value = !0)
      }, null, 40, Qe)])) : o.value ? (t(), l("button", {
        key: 1,
        class: "messages-image-placeholder",
        onClick: v[3] || (v[3] = (B) => x.value = !1)
      }, [
        M(E, { name: "image" }),
        v[9] || (v[9] = e("span", null, "原图暂时无法读取", -1)),
        v[10] || (v[10] = e("small", null, "点击重试", -1))
      ])) : a.media.image ? (t(), l("button", {
        key: 2,
        class: "messages-image-placeholder",
        disabled: r.value,
        onClick: v[4] || (v[4] = (B) => C(!0))
      }, [M(E, { name: "image" }), e("span", null, b(r.value ? "正在生成图片…" : n.value ? "重新生成图片" : "生成图片"), 1)], 8, _e)) : (t(), l("div", ea, [
        M(E, { name: "image" }),
        v[11] || (v[11] = e("span", null, "图片描述", -1)),
        v[12] || (v[12] = e("small", null, "开启画图后可生成图片", -1))
      ])),
      a.message.payload.description ? (t(), l("p", aa, b(a.message.payload.description), 1)) : h("", !0),
      a.message.sender === "user" && o.value ? (t(), l("button", {
        key: 5,
        class: "messages-image-delete",
        disabled: a.disabled,
        onClick: v[5] || (v[5] = (B) => $.$emit("deleteImage", a.message.id))
      }, "删除图片消息", 8, sa)) : h("", !0),
      e("dialog", {
        ref_key: "viewer",
        ref: I,
        class: "messages-image-viewer",
        onClick: v[6] || (v[6] = (B) => I.value?.close()),
        onKeydown: v[7] || (v[7] = be(J(() => {
        }, ["stop"]), ["esc"]))
      }, [e("button", ta, [M(E, { name: "close" })]), S.value ? (t(), l("img", {
        key: 0,
        src: S.value,
        alt: a.message.payload.description || o.value?.name || "图片"
      }, null, 8, la)) : h("", !0)], 544)
    ], 64)) : (t(), l(q, { key: 2 }, [
      e("button", {
        class: "messages-voice-button",
        disabled: c.value || !a.media.voice && !k.value,
        "aria-label": k.value ? "停止播放" : "播放语音",
        onClick: F
      }, [
        M(E, { name: k.value ? "stop" : "play" }, null, 8, ["name"]),
        e("span", { class: Q(["messages-wave", { playing: g.value === "playing" }]) }, [(t(), l(q, null, ae(16, (B) => e("i", {
          key: B,
          style: ye({
            height: `${8 + B * 7 % 17}px`,
            animationDelay: `${B * 45}ms`
          })
        }, null, 4)), 64))], 2),
        e("small", null, b(c.value ? "停止中" : [
          "loading",
          "generating",
          "queued"
        ].includes(g.value) ? "准备中" : "语音"), 1)
      ], 8, na),
      a.media.voice ? h("", !0) : (t(), l("small", ia, "开启 TTS 后可播放")),
      a.media.voice ? (t(), l("button", {
        key: 1,
        class: "messages-transcript-toggle",
        onClick: v[8] || (v[8] = (B) => d.value = !d.value)
      }, b(d.value ? "收起原文" : "查看原文"), 1)) : h("", !0),
      d.value || !a.media.voice ? (t(), l("p", ua, b(a.message.payload.transcript), 1)) : h("", !0)
    ], 64)), n.value ? (t(), l("small", oa, b(n.value), 1)) : h("", !0)], 2)], 2));
  }
}), da = ra, va = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif"
], us = 4 * 1024 * 1024;
async function ma(a) {
  if (!va.includes(a.type)) throw new Error("请选择 PNG、JPG、WEBP 或 GIF 图片。");
  if (!a.size || a.size > 4194304) throw new Error("请选择不超过 4MB 的图片。");
  const y = await new Promise((r, n) => {
    const g = new FileReader();
    g.onerror = () => n(/* @__PURE__ */ new Error("图片读取失败，请重新选择。")), g.onload = () => typeof g.result == "string" ? r(g.result) : n(/* @__PURE__ */ new Error("图片读取失败。")), g.readAsDataURL(a);
  }), i = new Image();
  i.src = y;
  try {
    await i.decode();
  } catch {
    throw new Error("这张图片无法打开，请换一张。");
  }
  return {
    dataUrl: y,
    name: a.name.replace(/[\u0000-\u001f\u007f]/gu, "").trim().slice(0, 120) || "图片"
  };
}
var ga = {
  key: 0,
  class: "messages-attachment-preview"
}, ca = ["src", "alt"], ya = ["disabled"], fa = {
  key: 1,
  class: "messages-composer-hint"
}, ba = {
  key: 2,
  class: "messages-composer-hint",
  role: "status"
}, pa = {
  key: 3,
  class: "messages-composer-wait",
  role: "status"
}, ka = { class: "messages-composer-line" }, wa = ["disabled"], $a = ["placeholder", "disabled"], ha = ["disabled"], Ia = /* @__PURE__ */ j({
  __name: "MessageComposer",
  props: /* @__PURE__ */ _({
    disabled: { type: Boolean },
    sending: { type: Boolean },
    waitingFor: {}
  }, {
    draft: { required: !0 },
    draftModifiers: {}
  }),
  emits: /* @__PURE__ */ _(["send"], ["update:draft"]),
  setup(a, { emit: y }) {
    const i = a, r = y, n = fe(a, "draft"), g = P({
      get: () => n.value.text,
      set: (w) => {
        n.value = {
          ...n.value,
          text: w
        };
      }
    }), d = p(null), o = p(!1), S = p("");
    let x = !0;
    async function I(w) {
      const C = w.target, F = C.files?.[0];
      if (C.value = "", !(!F || i.sending || o.value)) {
        o.value = !0, S.value = "";
        try {
          const T = await ma(F);
          x && (n.value = {
            ...n.value,
            image: T
          });
        } catch (T) {
          x && (S.value = T instanceof Error ? T.message : "图片读取失败，请重新选择。");
        } finally {
          x && (o.value = !1);
        }
      }
    }
    function k() {
      n.value = {
        ...n.value,
        image: null
      }, S.value = "";
    }
    function c() {
      const w = g.value.trim();
      !w && !n.value.image || i.disabled || o.value || r("send", n.value.image ? {
        type: "image",
        description: w,
        upload: { ...n.value.image }
      } : {
        type: "text",
        text: w
      });
    }
    oe(() => {
      x = !1;
    });
    function f(w) {
      w.key === "Enter" && (w.ctrlKey || w.metaKey) && !w.isComposing && (w.preventDefault(), c());
    }
    return (w, C) => (t(), l("form", {
      class: "messages-composer",
      onSubmit: J(c, ["prevent"])
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
      n.value.image ? (t(), l("div", ga, [
        e("img", {
          src: n.value.image.dataUrl,
          alt: n.value.image.name
        }, null, 8, ca),
        e("span", null, [C[2] || (C[2] = e("strong", null, "待发送的图片", -1)), e("small", null, b(n.value.image.name), 1)]),
        e("button", {
          type: "button",
          class: "messages-icon-button",
          "aria-label": "移除图片",
          disabled: a.sending || o.value,
          onClick: k
        }, [M(E, { name: "close" })], 8, ya)
      ])) : h("", !0),
      n.value.image ? (t(), l("p", fa, "图片将随消息发送，需要当前模型支持看图。")) : h("", !0),
      o.value || S.value ? (t(), l("p", ba, b(o.value ? "正在读取图片…" : S.value), 1)) : h("", !0),
      a.waitingFor ? (t(), l("p", pa, "正在等待 " + b(a.waitingFor) + " 的回复。可以先写好，稍后发送。", 1)) : h("", !0),
      e("div", ka, [
        e("button", {
          type: "button",
          class: "messages-icon-button messages-attach",
          "aria-label": "选择图片",
          disabled: a.sending || o.value,
          onClick: C[0] || (C[0] = (F) => d.value?.click())
        }, [M(E, { name: "plus" })], 8, wa),
        Z(e("textarea", {
          "onUpdate:modelValue": C[1] || (C[1] = (F) => g.value = F),
          rows: "1",
          maxlength: "4000",
          placeholder: n.value.image ? "给图片配句话…" : "说点什么…",
          "aria-label": "消息内容",
          disabled: a.sending,
          onKeydown: f
        }, null, 40, $a), [[Y, g.value]]),
        e("button", {
          class: "messages-send",
          type: "submit",
          disabled: a.disabled || o.value || !g.value.trim() && !n.value.image,
          "aria-label": "发送"
        }, [M(E, { name: "send" })], 8, ha)
      ])
    ], 32));
  }
}), Ma = Ia, Ca = { class: "messages-conversation" }, Sa = { class: "messages-thread-header" }, Aa = ["disabled"], xa = {
  key: 1,
  class: "messages-thread-start"
}, Ea = {
  key: 0,
  class: "messages-time"
}, Ba = {
  key: 2,
  class: "messages-typing",
  role: "status"
}, Ta = ["disabled"], Da = /* @__PURE__ */ j({
  __name: "Conversation",
  props: /* @__PURE__ */ _({
    contact: {},
    page: {},
    bridge: {},
    chatIdentity: {},
    disabled: { type: Boolean },
    stage: {},
    loading: { type: Boolean },
    loadMore: { type: Function },
    media: {},
    waitingFor: {}
  }, {
    draft: { required: !0 },
    draftModifiers: {}
  }),
  emits: /* @__PURE__ */ _([
    "back",
    "details",
    "send",
    "retry",
    "deleteImage"
  ], ["update:draft"]),
  setup(a, { expose: y }) {
    const i = fe(a, "draft"), r = a, n = p(null);
    let g = !0, d = !1;
    function o() {
      const k = n.value;
      k && (g = k.scrollHeight - k.clientHeight - k.scrollTop < 70);
    }
    async function S() {
      await ue(), g && !d && n.value && (n.value.scrollTop = n.value.scrollHeight);
    }
    ce(() => [r.page.messages.at(-1)?.id, r.stage], S, { immediate: !0 });
    async function x() {
      const k = n.value;
      if (!k || d) return;
      d = !0;
      const c = k.scrollHeight, f = k.scrollTop;
      try {
        await r.loadMore(), await ue(), k.scrollTop = f + k.scrollHeight - c;
      } finally {
        d = !1, o();
      }
    }
    const I = {
      uploading: "正在发送图片…",
      saving: "正在保存消息…",
      syncing: "正在写入主聊天…",
      summarizing: "正在回顾你们的对话…",
      replying: "对方正在输入…"
    };
    return y({ sent() {
      g = !0, S();
    } }), (k, c) => (t(), l("section", Ca, [
      e("header", Sa, [
        e("button", {
          class: "messages-icon-button",
          "aria-label": "返回信息",
          onClick: c[0] || (c[0] = (f) => k.$emit("back"))
        }, [M(E, { name: "back" })]),
        M(ee, {
          identity: a.contact.id,
          name: a.contact.name,
          small: ""
        }, null, 8, ["identity", "name"]),
        e("div", null, [e("h2", null, b(a.contact.name), 1), c[6] || (c[6] = e("p", null, "私人对话", -1))]),
        e("button", {
          class: "messages-icon-button",
          "aria-label": "联系人详情",
          onClick: c[1] || (c[1] = (f) => k.$emit("details"))
        }, [M(E, { name: "more" })])
      ]),
      e("div", {
        ref_key: "scroller",
        ref: n,
        class: "messages-thread-scroll",
        onScroll: o
      }, [
        a.page.hasMore ? (t(), l("button", {
          key: 0,
          class: "messages-older",
          disabled: a.loading,
          onClick: x
        }, b(a.loading ? "读取中…" : "查看更早的消息"), 9, Aa)) : h("", !0),
        a.page.messages.length ? h("", !0) : (t(), l("p", xa, [
          U(b(a.loading ? "正在读取消息…" : `这是你和 ${a.contact.name} 的对话。`), 1),
          c[7] || (c[7] = e("br", null, null, -1)),
          a.loading ? h("", !0) : (t(), l(q, { key: 0 }, [U("从一句问候开始吧。")], 64))
        ])),
        (t(!0), l(q, null, ae(a.page.messages, (f, w) => (t(), l(q, { key: f.id }, [w === 0 || f.createdAt - a.page.messages[w - 1].createdAt > 3e5 ? (t(), l("time", Ea, b(new Date(f.createdAt).toLocaleString(void 0, {
          month: "numeric",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        })), 1)) : h("", !0), M(da, {
          message: f,
          bridge: a.bridge,
          "chat-identity": a.chatIdentity,
          media: a.media,
          disabled: a.disabled,
          onResize: S,
          onDeleteImage: c[2] || (c[2] = (C) => k.$emit("deleteImage", C))
        }, null, 8, [
          "message",
          "bridge",
          "chat-identity",
          "media",
          "disabled"
        ])], 64))), 128)),
        a.stage ? (t(), l("div", Ba, [c[8] || (c[8] = e("span", null, [
          e("i"),
          e("i"),
          e("i")
        ], -1)), U(b(I[a.stage] || "处理中…"), 1)])) : a.page.retryMessageId ? (t(), l("button", {
          key: 3,
          class: "messages-retry",
          disabled: a.disabled,
          onClick: c[3] || (c[3] = (f) => k.$emit("retry", a.page.retryMessageId))
        }, "尚未收到回复 · 重试", 8, Ta)) : h("", !0)
      ], 544),
      M(Ma, {
        draft: i.value,
        "onUpdate:draft": c[4] || (c[4] = (f) => i.value = f),
        disabled: a.disabled,
        sending: ["uploading", "saving"].includes(a.stage),
        "waiting-for": a.waitingFor,
        onSend: c[5] || (c[5] = (f) => k.$emit("send", f))
      }, null, 8, [
        "draft",
        "disabled",
        "sending",
        "waiting-for"
      ])
    ]));
  }
}), qa = Da, La = () => ({
  text: "",
  image: null
}), Pa = (a, y) => a.text === y.text && a.image?.dataUrl === y.image?.dataUrl && a.image?.name === y.image?.name;
function O() {
  return Array.from(globalThis.crypto.getRandomValues(new Uint8Array(16)), (a) => a.toString(16).padStart(2, "0")).join("");
}
var Ua = { class: "messages-app" }, Va = {
  key: 0,
  class: "messages-banner",
  role: "status"
}, Fa = ["disabled"], za = {
  key: 1,
  class: "messages-banner",
  role: "status"
}, Ga = ["disabled"], Ha = {
  key: 2,
  class: "messages-notice"
}, Ka = {
  key: 3,
  class: "messages-error",
  role: "alert"
}, Ra = {
  key: 0,
  class: "messages-error",
  role: "alert"
}, ja = { class: "messages-search" }, Na = { class: "messages-known-list" }, Za = ["disabled", "onClick"], Ya = { key: 0 }, Ja = {
  key: 0,
  class: "messages-subtle"
}, Wa = { class: "messages-manual" }, Xa = ["disabled"], Oa = ["disabled"], Qa = ["disabled"], _a = ["disabled"], es = ["disabled"], as = ["disabled"], ss = { class: "messages-manual" }, ts = ["disabled"], ls = ["disabled"], ns = /* @__PURE__ */ j({
  __name: "MessagesApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(a) {
    const y = a, i = p(y.initialState), r = p(""), n = p({
      contactId: "",
      messages: [],
      hasMore: !1,
      retryMessageId: null
    }), g = p(!1), d = p(!1), o = p(""), S = p(null), x = p(null), I = p("add"), k = p(""), c = p(""), f = p(""), w = p(""), C = p(O()), F = p(O());
    let T = !0, $ = 0;
    const v = Be(/* @__PURE__ */ new Map()), B = P({
      get: () => v.get(r.value) ?? La(),
      set: (u) => {
        v.set(r.value, u);
      }
    });
    let V = null;
    const L = P(() => i.value.contacts.find((u) => u.id === r.value)), pe = P(() => i.value.busy && i.value.busy.contactId !== r.value ? i.value.contacts.find((u) => u.id === i.value.busy?.contactId)?.name ?? "另一位联系人" : ""), W = P(() => i.value.pendingSave || [
      "unconfirmed",
      "conflict",
      "failed"
    ].includes(i.value.fileState)), D = P(() => d.value || !!i.value.busy || i.value.pendingSave || i.value.fileState !== "ready" || i.value.generationActive), re = P(() => i.value.knownPeople.filter((u) => !i.value.contacts.some((s) => s.name === u.name) && `${u.name} ${u.aliases.join(" ")}`.toLocaleLowerCase().includes(w.value.toLocaleLowerCase())));
    async function z(u, s = {}) {
      return (await y.bridge.request(u, {
        chatIdentity: i.value.chatIdentity,
        ...s
      }, 6e4)).result;
    }
    async function se(u = !1, s = !1) {
      const m = r.value;
      if (!m) return;
      const A = ++$;
      g.value = !0;
      try {
        const N = await z("messages/thread", {
          contactId: m,
          ...u ? { before: n.value.messages[0]?.seq } : {}
        });
        if (!T || A !== $ || r.value !== m) return;
        const ge = N.messages.some((R) => n.value.messages.some((ne) => ne.id === R.id)), Ee = !s && (u || ge) ? n.value.messages : [], le = [...new Map([...Ee, ...N.messages].map((R) => [R.id, R])).values()].sort((R, ne) => R.seq - ne.seq);
        n.value = {
          ...N,
          messages: le,
          hasMore: s || u || !ge || le.length <= 50 ? N.hasMore : n.value.hasMore
        }, V?.contactId === m && le.some((R) => R.id === V?.messageId) && de();
      } catch {
        T && A === $ && r.value === m && (o.value = "消息暂时无法读取，请返回后重试。");
      } finally {
        A === $ && (g.value = !1);
      }
    }
    function G(u) {
      if (!T || u.chatIdentity !== i.value.chatIdentity) return;
      const s = L.value?.lastSeq, m = W.value;
      i.value = u;
      for (const A of v.keys()) u.contacts.some((N) => N.id === A) || v.delete(A);
      V && u.contacts.some((A) => A.lastMessageId === V?.messageId) && de(), r.value && !u.contacts.some((A) => A.id === r.value) ? te() : r.value && (s !== L.value?.lastSeq || m && !W.value) && se(!1, m && !W.value);
    }
    function de() {
      if (V) {
        const u = v.get(V.contactId);
        u && Pa(u, V.draft) && v.delete(V.contactId), V.contactId === r.value && S.value?.sent();
      }
      V = null, C.value = O();
    }
    const ke = y.bridge.subscribe((u) => {
      u.type === "messages/state" && G(u.payload.state);
    });
    function ve(u) {
      r.value = u, o.value = "", n.value = {
        contactId: u,
        messages: [],
        hasMore: !1,
        retryMessageId: null
      }, se();
    }
    function te() {
      r.value = "", $++, n.value = {
        contactId: "",
        messages: [],
        hasMore: !1,
        retryMessageId: null
      };
    }
    async function K(u) {
      if (!d.value) {
        d.value = !0, o.value = "";
        try {
          await u();
        } catch (s) {
          T && (o.value = s instanceof Error && s.message !== "host_request_timeout" ? s.message : "等待操作结果超时，请核实保存状态后重试。");
        } finally {
          d.value = !1;
        }
      }
    }
    function we(u) {
      D.value || K(async () => {
        V = {
          contactId: r.value,
          messageId: `input:${C.value}`,
          draft: { ...B.value }
        }, G(await z("messages/send", {
          contactId: r.value,
          actionId: C.value,
          payload: u
        }));
      });
    }
    function $e(u) {
      K(async () => G(await z("messages/retry", {
        contactId: r.value,
        messageId: u
      })));
    }
    function he(u) {
      K(async () => G(await z(u)));
    }
    function Ie() {
      K(async () => {
        G(await z("messages/sync")), H();
      });
    }
    async function X(u) {
      I.value = u, o.value = "", c.value = "", f.value = L.value?.note ?? "", w.value = "", F.value = O(), await ue(), x.value?.showModal();
    }
    function H() {
      x.value?.close();
    }
    function me(u = c.value) {
      !u.trim() || D.value || K(async () => {
        const s = await z("messages/contact/add", {
          actionId: F.value,
          name: u.trim(),
          note: f.value.trim()
        });
        G(s.state), H(), ve(s.contactId);
      });
    }
    function Me() {
      K(async () => {
        G(await z("messages/contact/note", {
          contactId: r.value,
          note: f.value
        })), H();
      });
    }
    function Ce() {
      K(async () => {
        G(await z("messages/contact/delete", { contactId: r.value })), H(), te();
      });
    }
    function Se(u) {
      k.value = u, X("delete-image");
    }
    function Ae() {
      const u = r.value, s = k.value;
      K(async () => {
        const m = await z("messages/message/delete-image", {
          contactId: u,
          messageId: s
        });
        G(m.state), T && r.value === u && ($++, g.value = !1, n.value = {
          ...n.value,
          messages: n.value.messages.filter((A) => A.id !== s).map((A) => A.replyTo === s ? {
            ...A,
            replyTo: null
          } : A),
          retryMessageId: m.retryMessageId
        }), H();
      });
    }
    function xe() {
      K(async () => {
        G(await z("messages/recover")), H();
      });
    }
    return oe(() => {
      T = !1, $++, ke();
    }), (u, s) => (t(), l("main", Ua, [
      W.value ? (t(), l("div", Va, [s[15] || (s[15] = e("span", null, "有消息还在等待保存确认，已保存的记录不会丢失。", -1)), e("button", {
        disabled: d.value || !!i.value.busy,
        onClick: s[0] || (s[0] = (m) => he(i.value.pendingSave ? "messages/confirm" : "messages/refresh"))
      }, "检查保存", 8, Fa)])) : i.value.unsynced && !i.value.busy ? (t(), l("div", za, [e("span", null, b(i.value.unsynced) + " 条消息已保留，尚未写入主聊天。", 1), e("button", {
        disabled: D.value,
        onClick: s[1] || (s[1] = (m) => X("sync"))
      }, "查看", 8, Ga)])) : h("", !0),
      i.value.generationActive ? (t(), l("div", Ha, "故事正在继续，稍后就能发送消息。")) : h("", !0),
      o.value || i.value.error ? (t(), l("p", Ka, b(o.value || i.value.error), 1)) : h("", !0),
      L.value ? (t(), ie(qa, {
        key: L.value.id,
        ref_key: "conversation",
        ref: S,
        draft: B.value,
        "onUpdate:draft": s[2] || (s[2] = (m) => B.value = m),
        contact: L.value,
        page: n.value,
        bridge: a.bridge,
        "chat-identity": i.value.chatIdentity,
        disabled: D.value,
        stage: i.value.busy?.contactId === L.value.id ? i.value.busy.stage : "",
        loading: g.value,
        "load-more": () => se(!0),
        media: i.value.media,
        "waiting-for": pe.value,
        onBack: te,
        onDetails: s[3] || (s[3] = (m) => X("detail")),
        onSend: we,
        onRetry: $e,
        onDeleteImage: Se
      }, null, 8, [
        "draft",
        "contact",
        "page",
        "bridge",
        "chat-identity",
        "disabled",
        "stage",
        "loading",
        "load-more",
        "media",
        "waiting-for"
      ])) : (t(), ie(Xe, {
        key: 5,
        contacts: i.value.contacts,
        "busy-contact-id": i.value.busy?.contactId ?? "",
        drafts: v,
        onSelect: ve,
        onAdd: s[4] || (s[4] = (m) => X("add"))
      }, null, 8, [
        "contacts",
        "busy-contact-id",
        "drafts"
      ])),
      e("dialog", {
        ref_key: "dialog",
        ref: x,
        class: "messages-dialog",
        onKeydown: s[13] || (s[13] = be(J(() => {
        }, ["stop"]), ["esc"])),
        onClick: s[14] || (s[14] = (m) => {
          m.target === x.value && H();
        })
      }, [
        e("header", null, [
          I.value === "detail" && L.value ? (t(), ie(ee, {
            key: 0,
            identity: L.value.id,
            name: L.value.name,
            small: ""
          }, null, 8, ["identity", "name"])) : h("", !0),
          e("h2", null, b(I.value === "add" ? "新的对话" : I.value === "detail" ? L.value?.name : I.value === "delete" ? "删除联系人？" : I.value === "delete-image" ? "删除这条图片消息？" : I.value === "sync" ? "消息还未写入主聊天" : "在当前位置补记？"), 1),
          e("button", {
            class: "messages-icon-button",
            "aria-label": "关闭",
            onClick: H
          }, [M(E, { name: "close" })])
        ]),
        o.value ? (t(), l("p", Ra, b(o.value), 1)) : h("", !0),
        I.value === "add" ? (t(), l(q, { key: 1 }, [
          e("label", ja, [M(E, { name: "search" }), Z(e("input", {
            "onUpdate:modelValue": s[5] || (s[5] = (m) => w.value = m),
            placeholder: "查找已知人物",
            "aria-label": "查找已知人物"
          }, null, 512), [[Y, w.value]])]),
          e("div", Na, [(t(!0), l(q, null, ae(re.value, (m) => (t(), l("button", {
            key: m.name,
            disabled: D.value,
            onClick: (A) => me(m.name)
          }, [
            M(ee, {
              identity: m.name,
              name: m.name,
              small: ""
            }, null, 8, ["identity", "name"]),
            e("span", null, [U(b(m.name), 1), m.aliases.length ? (t(), l("small", Ya, b(m.aliases.join("、")), 1)) : h("", !0)]),
            M(E, { name: "plus" })
          ], 8, Za))), 128)), re.value.length ? h("", !0) : (t(), l("p", Ja, "没有更多已知人物，可以在下面补充。"))]),
          e("details", Wa, [s[18] || (s[18] = e("summary", null, "想联系的人不在这里？", -1)), e("form", { onSubmit: s[8] || (s[8] = J((m) => me(), ["prevent"])) }, [
            e("label", null, [s[16] || (s[16] = U("姓名", -1)), Z(e("input", {
              "onUpdate:modelValue": s[6] || (s[6] = (m) => c.value = m),
              maxlength: "120",
              required: "",
              placeholder: "对方的姓名"
            }, null, 512), [[Y, c.value]])]),
            e("label", null, [s[17] || (s[17] = U("身份说明（可选）", -1)), Z(e("textarea", {
              "onUpdate:modelValue": s[7] || (s[7] = (m) => f.value = m),
              maxlength: "600",
              rows: "2",
              placeholder: "例如：住在隔壁的花店老板"
            }, null, 512), [[Y, f.value]])]),
            e("button", {
              class: "messages-primary",
              disabled: D.value || !c.value.trim()
            }, "添加并聊天", 8, Xa)
          ], 32)])
        ], 64)) : I.value === "detail" ? (t(), l("form", {
          key: 2,
          onSubmit: J(Me, ["prevent"])
        }, [
          e("label", null, [s[19] || (s[19] = U("身份说明 / 备注", -1)), Z(e("textarea", {
            "onUpdate:modelValue": s[9] || (s[9] = (m) => f.value = m),
            maxlength: "600",
            rows: "3",
            placeholder: "帮助辨认这位联系人"
          }, null, 512), [[Y, f.value]])]),
          e("button", {
            class: "messages-primary",
            disabled: D.value
          }, "保存备注", 8, Oa),
          e("button", {
            type: "button",
            class: "messages-danger",
            disabled: D.value,
            onClick: s[10] || (s[10] = (m) => I.value = "delete")
          }, "删除联系人与通讯记录", 8, Qa)
        ], 32)) : I.value === "delete" ? (t(), l(q, { key: 3 }, [
          e("p", null, "会删除信息 APP 内与 " + b(L.value?.name) + " 的全部通讯和摘要，不能恢复。主聊天中的「私人信息」楼层不会删除，其他联系人不受影响。", 1),
          e("button", {
            class: "messages-danger",
            disabled: D.value,
            onClick: Ce
          }, "确认删除", 8, _a),
          e("button", {
            class: "messages-secondary",
            onClick: s[11] || (s[11] = (m) => I.value = "detail")
          }, "保留联系人")
        ], 64)) : I.value === "delete-image" ? (t(), l(q, { key: 4 }, [
          s[20] || (s[20] = e("p", null, "这条图片及配文将从信息 APP 中删除，不再发送给模型，不能恢复。其他消息保留。", -1)),
          s[21] || (s[21] = e("p", { class: "messages-subtle" }, "主聊天里的记录和图库原图不会删除。", -1)),
          e("button", {
            class: "messages-danger",
            disabled: D.value,
            onClick: Ae
          }, "确认删除", 8, es),
          e("button", {
            class: "messages-secondary",
            onClick: H
          }, "取消")
        ], 64)) : I.value === "sync" ? (t(), l(q, { key: 5 }, [
          s[24] || (s[24] = e("p", null, "信息 APP 已保留这些消息。重试只会补上主聊天里的记录，不会再次向对方发送，也不会重新生成回复。", -1)),
          e("button", {
            class: "messages-primary",
            disabled: D.value,
            onClick: Ie
          }, "重试写入", 8, as),
          e("details", ss, [
            s[22] || (s[22] = e("summary", null, "原来的记录已被修改或删除？", -1)),
            s[23] || (s[23] = e("p", null, "不会覆盖你的修改。需要这些消息继续进入剧情时，可以在当前位置另加一条补记。", -1)),
            e("button", {
              class: "messages-secondary",
              disabled: D.value,
              onClick: s[12] || (s[12] = (m) => I.value = "recover")
            }, "查看补记方式", 8, ts)
          ])
        ], 64)) : (t(), l(q, { key: 6 }, [
          s[25] || (s[25] = e("p", null, "先检查已有记录；仍未写入的消息会在主聊天当前位置标为「补录」，保留原发送时间。不会覆盖旧记录或恢复你删除的那一条。", -1)),
          e("button", {
            class: "messages-primary",
            disabled: D.value,
            onClick: xe
          }, "确认补记", 8, ls),
          e("button", {
            class: "messages-secondary",
            onClick: H
          }, "暂不补记")
        ], 64))
      ], 544)
    ]));
  }
}), os = ns;
export {
  os as default
};
