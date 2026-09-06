/* eslint-disable */
import { A as ce, B as Q, C as Te, E as ae, F as De, H as b, I as p, N as Z, T as t, V as ye, _ as M, a as O, b as ue, c as J, d as e, f as ie, g as V, j as fe, l as T, m as l, p as h, s as be, u as U, v as N, w as oe, y as _ } from "./xiaobai-os-runtime-dom.esm-bundler-DwdCK5Jt.js";
var qe = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, Le = ["d"], Pe = /* @__PURE__ */ N({
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
    return (n, d) => (t(), l("svg", qe, [e("path", { d: y[a.name] }, null, 8, Le)]));
  }
}), x = Pe, Ue = /* @__PURE__ */ N({
  __name: "ContactAvatar",
  props: {
    identity: {},
    name: {},
    small: { type: Boolean }
  },
  setup(a) {
    const y = a, n = U(() => {
      let d = 0;
      for (const i of y.identity) d = Math.imul(d, 31) + i.codePointAt(0) | 0;
      return String((d >>> 0) % 360);
    });
    return (d, i) => (t(), l("span", {
      class: Q(["messages-avatar", { small: a.small }]),
      style: ye({ "--avatar-hue": n.value }),
      "aria-hidden": "true"
    }, b(Array.from(a.name)[0]), 7));
  }
}), ee = Ue, Ve = { class: "messages-contacts" }, Fe = { class: "messages-home-header" }, ze = { class: "messages-search" }, He = {
  key: 0,
  class: "messages-empty"
}, Ge = {
  key: 1,
  class: "messages-contact-rows"
}, je = {
  key: 0,
  class: "messages-subtle"
}, Ke = ["onClick"], Ne = { class: "messages-contact-copy" }, Re = { class: "messages-contact-heading" }, Ze = {
  key: 0,
  class: "messages-preview messages-preview-active"
}, Oe = {
  key: 1,
  class: "messages-preview"
}, Ye = {
  key: 2,
  class: "messages-preview"
}, Je = {
  key: 2,
  class: "messages-list-footer"
}, We = /* @__PURE__ */ N({
  __name: "ContactList",
  props: {
    contacts: {},
    busyContactId: {},
    drafts: {}
  },
  emits: ["select", "add"],
  setup(a) {
    const y = a, n = p(""), d = U(() => y.contacts.filter((g) => `${g.name} ${g.note}`.toLocaleLowerCase().includes(n.value.toLocaleLowerCase())));
    function i(g) {
      if (g === null) return "";
      const r = new Date(g);
      return r.toDateString() === (/* @__PURE__ */ new Date()).toDateString() ? r.toLocaleTimeString(void 0, {
        hour: "2-digit",
        minute: "2-digit"
      }) : r.toLocaleDateString(void 0, {
        month: "numeric",
        day: "numeric"
      });
    }
    return (g, r) => (t(), l("section", Ve, [
      e("header", Fe, [e("div", null, [r[4] || (r[4] = e("span", { class: "messages-eyebrow" }, "你们的对话，留在这里", -1)), e("h1", null, [r[3] || (r[3] = V("信息", -1)), e("span", null, b(a.contacts.length || ""), 1)])]), e("button", {
        class: "messages-icon-button",
        "aria-label": "添加联系人",
        onClick: r[0] || (r[0] = (o) => g.$emit("add"))
      }, [M(x, { name: "plus" })])]),
      e("label", ze, [M(x, { name: "search" }), Z(e("input", {
        "onUpdate:modelValue": r[1] || (r[1] = (o) => n.value = o),
        type: "search",
        placeholder: "搜索联系人",
        "aria-label": "搜索联系人"
      }, null, 512), [[O, n.value]])]),
      a.contacts.length ? (t(), l("div", Ge, [d.value.length ? h("", !0) : (t(), l("p", je, "没有找到这个人。")), (t(!0), l(T, null, ae(d.value, (o) => (t(), l("button", {
        key: o.id,
        class: "messages-contact-row",
        onClick: (S) => g.$emit("select", o.id)
      }, [M(ee, {
        identity: o.id,
        name: o.name
      }, null, 8, ["identity", "name"]), e("span", Ne, [e("span", Re, [e("strong", null, b(o.name), 1), e("time", null, b(i(o.lastAt)), 1)]), a.busyContactId === o.id ? (t(), l("span", Ze, "正在等待回复…")) : a.drafts.get(o.id)?.text.trim() || a.drafts.get(o.id)?.image ? (t(), l("span", Oe, [r[9] || (r[9] = e("em", null, "草稿", -1)), V(" " + b(a.drafts.get(o.id)?.image ? "［图片］" : "") + b(a.drafts.get(o.id)?.text), 1)])) : (t(), l("span", Ye, b(o.preview), 1))])], 8, Ke))), 128))])) : (t(), l("div", He, [
        r[6] || (r[6] = e("div", { class: "messages-empty-art" }, [
          e("span"),
          e("span"),
          e("i")
        ], -1)),
        r[7] || (r[7] = e("h2", null, "有些话，想单独说", -1)),
        r[8] || (r[8] = e("p", null, [
          V("从已知人物中选一个，"),
          e("br"),
          V("开始你们的第一段对话。")
        ], -1)),
        e("button", {
          class: "messages-primary",
          onClick: r[2] || (r[2] = (o) => g.$emit("add"))
        }, [r[5] || (r[5] = V("选择联系人", -1)), M(x, { name: "plus" })])
      ])),
      a.contacts.length ? (t(), l("footer", Je, b(a.contacts.length) + " 位联系人 · 只属于你们的对话", 1)) : h("", !0)
    ]));
  }
}), Xe = We, Qe = { key: 0 }, _e = ["src", "alt"], ea = ["disabled"], aa = {
  key: 3,
  class: "messages-image-placeholder messages-media-unavailable"
}, sa = {
  key: 4,
  class: "messages-image-caption"
}, ta = ["disabled"], la = { "aria-label": "关闭图片" }, na = ["src", "alt"], ia = ["disabled", "aria-label"], ua = {
  key: 0,
  class: "messages-media-unavailable-note"
}, oa = {
  key: 2,
  class: "messages-transcript"
}, ra = {
  key: 3,
  class: "messages-media-error",
  role: "status"
}, da = /* @__PURE__ */ N({
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
    const y = a, n = p(""), d = p(!1), i = p(""), g = p(""), r = p(!1), o = U(() => y.message.payload.type === "image" ? y.message.payload.attachment : void 0), S = U(() => o.value?.path || n.value), E = p(!1), I = p(null), k = U(() => [
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
      if (!d.value) {
        d.value = !0, i.value = "";
        try {
          const { result: v } = await w($ ? "messages/image/generate" : "messages/image/check");
          f && (n.value = v.data ?? "", E.value = !1, $ && !n.value && (i.value = "请开启画图后再试，画面描述已保留。"));
        } catch {
          f && $ && (i.value = "图片生成失败，可以再试一次。");
        } finally {
          f && (d.value = !1);
        }
      }
    }
    async function G() {
      if (c.value) return;
      i.value = "";
      const $ = k.value;
      if (!(!$ && !y.media.voice))
        try {
          $ ? (c.value = !0, await w("messages/voice/stop"), f && (g.value = "")) : (g.value = "loading", await w("messages/voice/play"));
        } catch {
          f && ($ || (g.value = ""), i.value = $ ? "未能确认停止，请再点一次停止。" : "语音暂时无法播放，原文仍可查看。");
        } finally {
          f && (c.value = !1);
        }
    }
    const D = y.bridge.subscribe(($) => {
      if ($.type !== "messages/voice-state") return;
      const v = $.payload;
      v.messageId === y.message.id ? g.value = v.status : v.status === "playing" && (g.value = ""), v.messageId === y.message.id && v.status === "error" && (i.value = "播放失败，点击可以重试。");
    });
    return Te(() => {
      y.message.payload.type === "image" && !o.value && C(!1);
    }), fe(() => y.media.image, ($) => {
      $ && y.message.payload.type === "image" && !o.value && !n.value && C(!1);
    }), oe(() => {
      f = !1, D();
    }), ($, v) => (t(), l("article", { class: Q(["messages-bubble-row", { outgoing: a.message.sender === "user" }]) }, [e("div", { class: Q(["messages-bubble", `messages-bubble-${a.message.payload.type}`]) }, [a.message.payload.type === "text" ? (t(), l("p", Qe, b(a.message.payload.text), 1)) : a.message.payload.type === "image" ? (t(), l(T, { key: 1 }, [
      S.value && !E.value ? (t(), l("button", {
        key: 0,
        class: "messages-image-open",
        "aria-label": "放大图片",
        onClick: v[2] || (v[2] = (B) => I.value?.showModal())
      }, [e("img", {
        src: S.value,
        alt: a.message.payload.description || o.value?.name || "图片",
        onLoad: v[0] || (v[0] = (B) => $.$emit("resize")),
        onError: v[1] || (v[1] = (B) => E.value = !0)
      }, null, 40, _e)])) : o.value ? (t(), l("button", {
        key: 1,
        class: "messages-image-placeholder",
        onClick: v[3] || (v[3] = (B) => E.value = !1)
      }, [
        M(x, { name: "image" }),
        v[9] || (v[9] = e("span", null, "原图暂时无法读取", -1)),
        v[10] || (v[10] = e("small", null, "点击重试", -1))
      ])) : a.media.image ? (t(), l("button", {
        key: 2,
        class: "messages-image-placeholder",
        disabled: d.value,
        onClick: v[4] || (v[4] = (B) => C(!0))
      }, [M(x, { name: "image" }), e("span", null, b(d.value ? "正在生成图片…" : i.value ? "重新生成图片" : "生成图片"), 1)], 8, ea)) : (t(), l("div", aa, [
        M(x, { name: "image" }),
        v[11] || (v[11] = e("span", null, "图片描述", -1)),
        v[12] || (v[12] = e("small", null, "开启画图后可生成图片", -1))
      ])),
      a.message.payload.description ? (t(), l("p", sa, b(a.message.payload.description), 1)) : h("", !0),
      a.message.sender === "user" && o.value ? (t(), l("button", {
        key: 5,
        class: "messages-image-delete",
        disabled: a.disabled,
        onClick: v[5] || (v[5] = (B) => $.$emit("deleteImage", a.message.id))
      }, "删除图片消息", 8, ta)) : h("", !0),
      e("dialog", {
        ref_key: "viewer",
        ref: I,
        class: "messages-image-viewer",
        onClick: v[6] || (v[6] = (B) => I.value?.close()),
        onKeydown: v[7] || (v[7] = be(J(() => {
        }, ["stop"]), ["esc"]))
      }, [e("button", la, [M(x, { name: "close" })]), S.value ? (t(), l("img", {
        key: 0,
        src: S.value,
        alt: a.message.payload.description || o.value?.name || "图片"
      }, null, 8, na)) : h("", !0)], 544)
    ], 64)) : (t(), l(T, { key: 2 }, [
      e("button", {
        class: "messages-voice-button",
        disabled: c.value || !a.media.voice && !k.value,
        "aria-label": k.value ? "停止播放" : "播放语音",
        onClick: G
      }, [
        M(x, { name: k.value ? "stop" : "play" }, null, 8, ["name"]),
        e("span", { class: Q(["messages-wave", { playing: g.value === "playing" }]) }, [(t(), l(T, null, ae(16, (B) => e("i", {
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
      ], 8, ia),
      a.media.voice ? h("", !0) : (t(), l("small", ua, "开启 TTS 后可播放")),
      a.media.voice ? (t(), l("button", {
        key: 1,
        class: "messages-transcript-toggle",
        onClick: v[8] || (v[8] = (B) => r.value = !r.value)
      }, b(r.value ? "收起原文" : "查看原文"), 1)) : h("", !0),
      r.value || !a.media.voice ? (t(), l("p", oa, b(a.message.payload.transcript), 1)) : h("", !0)
    ], 64)), i.value ? (t(), l("small", ra, b(i.value), 1)) : h("", !0)], 2)], 2));
  }
}), va = da, ma = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif"
], ms = 4 * 1024 * 1024;
async function ga(a) {
  if (!ma.includes(a.type)) throw new Error("请选择 PNG、JPG、WEBP 或 GIF 图片。");
  if (!a.size || a.size > 4194304) throw new Error("请选择不超过 4MB 的图片。");
  const y = await new Promise((d, i) => {
    const g = new FileReader();
    g.onerror = () => i(/* @__PURE__ */ new Error("图片读取失败，请重新选择。")), g.onload = () => typeof g.result == "string" ? d(g.result) : i(/* @__PURE__ */ new Error("图片读取失败。")), g.readAsDataURL(a);
  }), n = new Image();
  n.src = y;
  try {
    await n.decode();
  } catch {
    throw new Error("这张图片无法打开，请换一张。");
  }
  return {
    dataUrl: y,
    name: a.name.replace(/[\u0000-\u001f\u007f]/gu, "").trim().slice(0, 120) || "图片"
  };
}
var ca = {
  key: 0,
  class: "messages-attachment-preview"
}, ya = ["src", "alt"], fa = ["disabled"], ba = {
  key: 1,
  class: "messages-composer-hint"
}, pa = {
  key: 2,
  class: "messages-composer-hint",
  role: "status"
}, ka = {
  key: 3,
  class: "messages-composer-wait",
  role: "status"
}, wa = { class: "messages-composer-line" }, $a = ["disabled"], ha = ["placeholder", "disabled"], Ia = ["disabled"], Ma = /* @__PURE__ */ N({
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
    const n = a, d = y, i = ce(a, "draft"), g = U({
      get: () => i.value.text,
      set: (w) => {
        i.value = {
          ...i.value,
          text: w
        };
      }
    }), r = p(null), o = p(!1), S = p("");
    let E = !0;
    async function I(w) {
      const C = w.target, G = C.files?.[0];
      if (C.value = "", !(!G || n.sending || o.value)) {
        o.value = !0, S.value = "";
        try {
          const D = await ga(G);
          E && (i.value = {
            ...i.value,
            image: D
          });
        } catch (D) {
          E && (S.value = D instanceof Error ? D.message : "图片读取失败，请重新选择。");
        } finally {
          E && (o.value = !1);
        }
      }
    }
    function k() {
      i.value = {
        ...i.value,
        image: null
      }, S.value = "";
    }
    function c() {
      const w = g.value.trim();
      !w && !i.value.image || n.disabled || o.value || d("send", i.value.image ? {
        type: "image",
        description: w,
        upload: { ...i.value.image }
      } : {
        type: "text",
        text: w
      });
    }
    oe(() => {
      E = !1;
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
        ref: r,
        type: "file",
        accept: "image/png,image/jpeg,image/webp,image/gif",
        hidden: "",
        "aria-label": "选择图片文件",
        onChange: I
      }, null, 544),
      i.value.image ? (t(), l("div", ca, [
        e("img", {
          src: i.value.image.dataUrl,
          alt: i.value.image.name
        }, null, 8, ya),
        e("span", null, [C[2] || (C[2] = e("strong", null, "待发送的图片", -1)), e("small", null, b(i.value.image.name), 1)]),
        e("button", {
          type: "button",
          class: "messages-icon-button",
          "aria-label": "移除图片",
          disabled: a.sending || o.value,
          onClick: k
        }, [M(x, { name: "close" })], 8, fa)
      ])) : h("", !0),
      i.value.image ? (t(), l("p", ba, "图片将随消息发送，需要当前模型支持看图。")) : h("", !0),
      o.value || S.value ? (t(), l("p", pa, b(o.value ? "正在读取图片…" : S.value), 1)) : h("", !0),
      a.waitingFor ? (t(), l("p", ka, "正在等待 " + b(a.waitingFor) + " 的回复。可以先写好，稍后发送。", 1)) : h("", !0),
      e("div", wa, [
        e("button", {
          type: "button",
          class: "messages-icon-button messages-attach",
          "aria-label": "选择图片",
          disabled: a.sending || o.value,
          onClick: C[0] || (C[0] = (G) => r.value?.click())
        }, [M(x, { name: "plus" })], 8, $a),
        Z(e("textarea", {
          "onUpdate:modelValue": C[1] || (C[1] = (G) => g.value = G),
          rows: "1",
          maxlength: "4000",
          placeholder: i.value.image ? "给图片配句话…" : "说点什么…",
          "aria-label": "消息内容",
          disabled: a.sending,
          onKeydown: f
        }, null, 40, ha), [[O, g.value]]),
        e("button", {
          class: "messages-send",
          type: "submit",
          disabled: a.disabled || o.value || !g.value.trim() && !i.value.image,
          "aria-label": "发送"
        }, [M(x, { name: "send" })], 8, Ia)
      ])
    ], 32));
  }
}), Ca = Ma, Sa = { class: "messages-conversation" }, Aa = { class: "messages-thread-header" }, Ea = ["disabled"], xa = {
  key: 1,
  class: "messages-thread-start"
}, Ba = {
  key: 0,
  class: "messages-time"
}, Ta = {
  key: 2,
  class: "messages-typing",
  role: "status"
}, Da = ["disabled"], qa = /* @__PURE__ */ N({
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
    const n = ce(a, "draft"), d = a, i = p(null);
    let g = !0, r = !1;
    function o() {
      const k = i.value;
      k && (g = k.scrollHeight - k.clientHeight - k.scrollTop < 70);
    }
    async function S() {
      await ue(), g && !r && i.value && (i.value.scrollTop = i.value.scrollHeight);
    }
    fe(() => [d.page.messages.at(-1)?.id, d.stage], S, { immediate: !0 });
    async function E() {
      const k = i.value;
      if (!k || r) return;
      r = !0;
      const c = k.scrollHeight, f = k.scrollTop;
      try {
        await d.loadMore(), await ue(), k.scrollTop = f + k.scrollHeight - c;
      } finally {
        r = !1, o();
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
    } }), (k, c) => (t(), l("section", Sa, [
      e("header", Aa, [
        e("button", {
          class: "messages-icon-button",
          "aria-label": "返回信息",
          onClick: c[0] || (c[0] = (f) => k.$emit("back"))
        }, [M(x, { name: "back" })]),
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
        }, [M(x, { name: "more" })])
      ]),
      e("div", {
        ref_key: "scroller",
        ref: i,
        class: "messages-thread-scroll",
        onScroll: o
      }, [
        a.page.hasMore ? (t(), l("button", {
          key: 0,
          class: "messages-older",
          disabled: a.loading,
          onClick: E
        }, b(a.loading ? "读取中…" : "查看更早的消息"), 9, Ea)) : h("", !0),
        a.page.messages.length ? h("", !0) : (t(), l("p", xa, [
          V(b(a.loading ? "正在读取消息…" : `这是你和 ${a.contact.name} 的对话。`), 1),
          c[7] || (c[7] = e("br", null, null, -1)),
          a.loading ? h("", !0) : (t(), l(T, { key: 0 }, [V("从一句问候开始吧。")], 64))
        ])),
        (t(!0), l(T, null, ae(a.page.messages, (f, w) => (t(), l(T, { key: f.id }, [w === 0 || f.createdAt - a.page.messages[w - 1].createdAt > 3e5 ? (t(), l("time", Ba, b(new Date(f.createdAt).toLocaleString(void 0, {
          month: "numeric",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        })), 1)) : h("", !0), M(va, {
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
        a.stage ? (t(), l("div", Ta, [c[8] || (c[8] = e("span", null, [
          e("i"),
          e("i"),
          e("i")
        ], -1)), V(b(I[a.stage] || "处理中…"), 1)])) : a.page.retryMessageId ? (t(), l("button", {
          key: 3,
          class: "messages-retry",
          disabled: a.disabled,
          onClick: c[3] || (c[3] = (f) => k.$emit("retry", a.page.retryMessageId))
        }, "尚未收到回复 · 重试", 8, Da)) : h("", !0)
      ], 544),
      M(Ca, {
        draft: n.value,
        "onUpdate:draft": c[4] || (c[4] = (f) => n.value = f),
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
}), La = qa, Pa = () => ({
  text: "",
  image: null
}), Ua = (a, y) => a.text === y.text && a.image?.dataUrl === y.image?.dataUrl && a.image?.name === y.image?.name;
function X() {
  return Array.from(globalThis.crypto.getRandomValues(new Uint8Array(16)), (a) => a.toString(16).padStart(2, "0")).join("");
}
var Va = { class: "messages-app" }, Fa = {
  key: 0,
  class: "messages-banner",
  role: "status"
}, za = { class: "messages-save-actions" }, Ha = ["disabled"], Ga = ["disabled"], ja = {
  key: 1,
  class: "messages-banner",
  role: "status"
}, Ka = ["disabled"], Na = {
  key: 2,
  class: "messages-notice"
}, Ra = {
  key: 3,
  class: "messages-error",
  role: "alert"
}, Za = {
  key: 0,
  class: "messages-error",
  role: "alert"
}, Oa = { class: "messages-search" }, Ya = { class: "messages-known-list" }, Ja = ["disabled", "onClick"], Wa = { key: 0 }, Xa = {
  key: 0,
  class: "messages-subtle"
}, Qa = { class: "messages-manual" }, _a = ["disabled"], es = ["disabled"], as = ["disabled"], ss = ["disabled"], ts = ["disabled"], ls = ["disabled"], ns = { class: "messages-manual" }, is = ["disabled"], us = ["disabled"], os = ["disabled"], rs = ["disabled"], ds = /* @__PURE__ */ N({
  __name: "MessagesApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(a) {
    const y = a, n = p(y.initialState), d = p(""), i = p({
      contactId: "",
      messages: [],
      hasMore: !1,
      retryMessageId: null
    }), g = p(!1), r = p(!1), o = p(""), S = p(null), E = p(null), I = p("add"), k = p(""), c = p(""), f = p(""), w = p(""), C = p(X()), G = p(X());
    let D = !0, $ = 0;
    const v = De(/* @__PURE__ */ new Map()), B = U({
      get: () => v.get(d.value) ?? Pa(),
      set: (u) => {
        v.set(d.value, u);
      }
    });
    let F = null;
    const L = U(() => n.value.contacts.find((u) => u.id === d.value)), pe = U(() => n.value.busy && n.value.busy.contactId !== d.value ? n.value.contacts.find((u) => u.id === n.value.busy?.contactId)?.name ?? "另一位联系人" : ""), W = U(() => n.value.pendingSave || [
      "unconfirmed",
      "conflict",
      "failed"
    ].includes(n.value.fileState)), q = U(() => r.value || !!n.value.busy || n.value.pendingSave || n.value.fileState !== "ready" || n.value.generationActive), re = U(() => n.value.knownPeople.filter((u) => !n.value.contacts.some((s) => s.name === u.name) && `${u.name} ${u.aliases.join(" ")}`.toLocaleLowerCase().includes(w.value.toLocaleLowerCase())));
    async function z(u, s = {}) {
      return (await y.bridge.request(u, {
        chatIdentity: n.value.chatIdentity,
        ...s
      }, 6e4)).result;
    }
    async function se(u = !1, s = !1) {
      const m = d.value;
      if (!m) return;
      const A = ++$;
      g.value = !0;
      try {
        const R = await z("messages/thread", {
          contactId: m,
          ...u ? { before: i.value.messages[0]?.seq } : {}
        });
        if (!D || A !== $ || d.value !== m) return;
        const ge = R.messages.some((K) => i.value.messages.some((ne) => ne.id === K.id)), Be = !s && (u || ge) ? i.value.messages : [], le = [...new Map([...Be, ...R.messages].map((K) => [K.id, K])).values()].sort((K, ne) => K.seq - ne.seq);
        i.value = {
          ...R,
          messages: le,
          hasMore: s || u || !ge || le.length <= 50 ? R.hasMore : i.value.hasMore
        }, F?.contactId === m && le.some((K) => K.id === F?.messageId) && de();
      } catch {
        D && A === $ && d.value === m && (o.value = "消息暂时无法读取，请返回后重试。");
      } finally {
        A === $ && (g.value = !1);
      }
    }
    function H(u) {
      if (!D || u.chatIdentity !== n.value.chatIdentity) return;
      const s = L.value?.lastSeq, m = W.value;
      n.value = u;
      for (const A of v.keys()) u.contacts.some((R) => R.id === A) || v.delete(A);
      F && u.contacts.some((A) => A.lastMessageId === F?.messageId) && de(), d.value && !u.contacts.some((A) => A.id === d.value) ? te() : d.value && (s !== L.value?.lastSeq || m && !W.value) && se(!1, m && !W.value);
    }
    function de() {
      if (F) {
        const u = v.get(F.contactId);
        u && Ua(u, F.draft) && v.delete(F.contactId), F.contactId === d.value && S.value?.sent();
      }
      F = null, C.value = X();
    }
    const ke = y.bridge.subscribe((u) => {
      u.type === "messages/state" && H(u.payload.state);
    });
    function ve(u) {
      d.value = u, o.value = "", i.value = {
        contactId: u,
        messages: [],
        hasMore: !1,
        retryMessageId: null
      }, se();
    }
    function te() {
      d.value = "", $++, i.value = {
        contactId: "",
        messages: [],
        hasMore: !1,
        retryMessageId: null
      };
    }
    async function j(u) {
      if (!r.value) {
        r.value = !0, o.value = "";
        try {
          await u();
        } catch (s) {
          D && (o.value = s instanceof Error && s.message !== "host_request_timeout" ? s.message : "等待操作结果超时，请核实保存状态后重试。");
        } finally {
          r.value = !1;
        }
      }
    }
    function we(u) {
      q.value || j(async () => {
        F = {
          contactId: d.value,
          messageId: `input:${C.value}`,
          draft: { ...B.value }
        }, H(await z("messages/send", {
          contactId: d.value,
          actionId: C.value,
          payload: u
        }));
      });
    }
    function $e(u) {
      j(async () => H(await z("messages/retry", {
        contactId: d.value,
        messageId: u
      })));
    }
    function he(u) {
      j(async () => H(await z(u)));
    }
    function Ie() {
      j(async () => {
        H(await z("messages/sync")), P();
      });
    }
    async function Y(u) {
      I.value = u, o.value = "", c.value = "", f.value = L.value?.note ?? "", w.value = "", G.value = X(), await ue(), E.value?.showModal();
    }
    function P() {
      E.value?.close();
    }
    function me(u = c.value) {
      !u.trim() || q.value || j(async () => {
        const s = await z("messages/contact/add", {
          actionId: G.value,
          name: u.trim(),
          note: f.value.trim()
        });
        H(s.state), P(), ve(s.contactId);
      });
    }
    function Me() {
      j(async () => {
        H(await z("messages/contact/note", {
          contactId: d.value,
          note: f.value
        })), P();
      });
    }
    function Ce() {
      j(async () => {
        H(await z("messages/contact/delete", { contactId: d.value })), P(), te();
      });
    }
    function Se(u) {
      k.value = u, Y("delete-image");
    }
    function Ae() {
      const u = d.value, s = k.value;
      j(async () => {
        const m = await z("messages/message/delete-image", {
          contactId: u,
          messageId: s
        });
        H(m.state), D && d.value === u && ($++, g.value = !1, i.value = {
          ...i.value,
          messages: i.value.messages.filter((A) => A.id !== s).map((A) => A.replyTo === s ? {
            ...A,
            replyTo: null
          } : A),
          retryMessageId: m.retryMessageId
        }), P();
      });
    }
    function Ee() {
      j(async () => {
        H(await z("messages/recover")), P();
      });
    }
    function xe() {
      j(async () => {
        H(await z("messages/adopt-server-state")), n.value.fileState === "ready" && !n.value.pendingSave ? P() : o.value = "暂时未能采用服务器版本，请检查网络后重试。当前记录保持不变。";
      });
    }
    return oe(() => {
      D = !1, $++, ke();
    }), (u, s) => (t(), l("main", Va, [
      W.value ? (t(), l("div", Fa, [e("span", null, b(n.value.fileState === "conflict" ? "服务器上的存档已有变化，请选择如何处理。" : "有消息还在等待保存确认，已保存的记录不会丢失。"), 1), e("div", za, [e("button", {
        disabled: r.value || !!n.value.busy,
        onClick: s[0] || (s[0] = (m) => he(n.value.pendingSave ? "messages/confirm" : "messages/refresh"))
      }, "检查保存", 8, Ha), n.value.fileState === "conflict" ? (t(), l("button", {
        key: 0,
        disabled: r.value || !!n.value.busy || n.value.generationActive,
        onClick: s[1] || (s[1] = (m) => Y("adopt"))
      }, "采用服务器版本", 8, Ga)) : h("", !0)])])) : n.value.unsynced && !n.value.busy ? (t(), l("div", ja, [e("span", null, b(n.value.unsynced) + " 条消息已保留，尚未写入主聊天。", 1), e("button", {
        disabled: q.value,
        onClick: s[2] || (s[2] = (m) => Y("sync"))
      }, "查看", 8, Ka)])) : h("", !0),
      n.value.generationActive ? (t(), l("div", Na, "故事正在继续，稍后就能发送消息。")) : h("", !0),
      o.value || n.value.error ? (t(), l("p", Ra, b(o.value || n.value.error), 1)) : h("", !0),
      L.value ? (t(), ie(La, {
        key: L.value.id,
        ref_key: "conversation",
        ref: S,
        draft: B.value,
        "onUpdate:draft": s[3] || (s[3] = (m) => B.value = m),
        contact: L.value,
        page: i.value,
        bridge: a.bridge,
        "chat-identity": n.value.chatIdentity,
        disabled: q.value,
        stage: n.value.busy?.contactId === L.value.id ? n.value.busy.stage : "",
        loading: g.value,
        "load-more": () => se(!0),
        media: n.value.media,
        "waiting-for": pe.value,
        onBack: te,
        onDetails: s[4] || (s[4] = (m) => Y("detail")),
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
        contacts: n.value.contacts,
        "busy-contact-id": n.value.busy?.contactId ?? "",
        drafts: v,
        onSelect: ve,
        onAdd: s[5] || (s[5] = (m) => Y("add"))
      }, null, 8, [
        "contacts",
        "busy-contact-id",
        "drafts"
      ])),
      e("dialog", {
        ref_key: "dialog",
        ref: E,
        class: "messages-dialog",
        onKeydown: s[14] || (s[14] = be(J(() => {
        }, ["stop"]), ["esc"])),
        onClick: s[15] || (s[15] = (m) => {
          m.target === E.value && P();
        })
      }, [
        e("header", null, [
          I.value === "detail" && L.value ? (t(), ie(ee, {
            key: 0,
            identity: L.value.id,
            name: L.value.name,
            small: ""
          }, null, 8, ["identity", "name"])) : h("", !0),
          e("h2", null, b(I.value === "add" ? "新的对话" : I.value === "detail" ? L.value?.name : I.value === "delete" ? "删除联系人？" : I.value === "delete-image" ? "删除这条图片消息？" : I.value === "sync" ? "消息还未写入主聊天" : I.value === "adopt" ? "采用服务器版本？" : "在当前位置补记？"), 1),
          e("button", {
            class: "messages-icon-button",
            "aria-label": "关闭",
            onClick: P
          }, [M(x, { name: "close" })])
        ]),
        o.value ? (t(), l("p", Za, b(o.value), 1)) : h("", !0),
        I.value === "add" ? (t(), l(T, { key: 1 }, [
          e("label", Oa, [M(x, { name: "search" }), Z(e("input", {
            "onUpdate:modelValue": s[6] || (s[6] = (m) => w.value = m),
            placeholder: "查找已知人物",
            "aria-label": "查找已知人物"
          }, null, 512), [[O, w.value]])]),
          e("div", Ya, [(t(!0), l(T, null, ae(re.value, (m) => (t(), l("button", {
            key: m.name,
            disabled: q.value,
            onClick: (A) => me(m.name)
          }, [
            M(ee, {
              identity: m.name,
              name: m.name,
              small: ""
            }, null, 8, ["identity", "name"]),
            e("span", null, [V(b(m.name), 1), m.aliases.length ? (t(), l("small", Wa, b(m.aliases.join("、")), 1)) : h("", !0)]),
            M(x, { name: "plus" })
          ], 8, Ja))), 128)), re.value.length ? h("", !0) : (t(), l("p", Xa, "没有更多已知人物，可以在下面补充。"))]),
          e("details", Qa, [s[18] || (s[18] = e("summary", null, "想联系的人不在这里？", -1)), e("form", { onSubmit: s[9] || (s[9] = J((m) => me(), ["prevent"])) }, [
            e("label", null, [s[16] || (s[16] = V("姓名", -1)), Z(e("input", {
              "onUpdate:modelValue": s[7] || (s[7] = (m) => c.value = m),
              maxlength: "120",
              required: "",
              placeholder: "对方的姓名"
            }, null, 512), [[O, c.value]])]),
            e("label", null, [s[17] || (s[17] = V("身份说明（可选）", -1)), Z(e("textarea", {
              "onUpdate:modelValue": s[8] || (s[8] = (m) => f.value = m),
              maxlength: "600",
              rows: "2",
              placeholder: "例如：住在隔壁的花店老板"
            }, null, 512), [[O, f.value]])]),
            e("button", {
              class: "messages-primary",
              disabled: q.value || !c.value.trim()
            }, "添加并聊天", 8, _a)
          ], 32)])
        ], 64)) : I.value === "detail" ? (t(), l("form", {
          key: 2,
          onSubmit: J(Me, ["prevent"])
        }, [
          e("label", null, [s[19] || (s[19] = V("身份说明 / 备注", -1)), Z(e("textarea", {
            "onUpdate:modelValue": s[10] || (s[10] = (m) => f.value = m),
            maxlength: "600",
            rows: "3",
            placeholder: "帮助辨认这位联系人"
          }, null, 512), [[O, f.value]])]),
          e("button", {
            class: "messages-primary",
            disabled: q.value
          }, "保存备注", 8, es),
          e("button", {
            type: "button",
            class: "messages-danger",
            disabled: q.value,
            onClick: s[11] || (s[11] = (m) => I.value = "delete")
          }, "删除联系人与通讯记录", 8, as)
        ], 32)) : I.value === "delete" ? (t(), l(T, { key: 3 }, [
          e("p", null, "会删除信息 APP 内与 " + b(L.value?.name) + " 的全部通讯和摘要，不能恢复。主聊天中的「私人信息」楼层不会删除，其他联系人不受影响。", 1),
          e("button", {
            class: "messages-danger",
            disabled: q.value,
            onClick: Ce
          }, "确认删除", 8, ss),
          e("button", {
            class: "messages-secondary",
            onClick: s[12] || (s[12] = (m) => I.value = "detail")
          }, "保留联系人")
        ], 64)) : I.value === "delete-image" ? (t(), l(T, { key: 4 }, [
          s[20] || (s[20] = e("p", null, "这条图片及配文将从信息 APP 中删除，不再发送给模型，不能恢复。其他消息保留。", -1)),
          s[21] || (s[21] = e("p", { class: "messages-subtle" }, "主聊天里的记录和图库原图不会删除。", -1)),
          e("button", {
            class: "messages-danger",
            disabled: q.value,
            onClick: Ae
          }, "确认删除", 8, ts),
          e("button", {
            class: "messages-secondary",
            onClick: P
          }, "取消")
        ], 64)) : I.value === "sync" ? (t(), l(T, { key: 5 }, [
          s[24] || (s[24] = e("p", null, "信息 APP 已保留这些消息。重试只会补上主聊天里的记录，不会再次向对方发送，也不会重新生成回复。", -1)),
          e("button", {
            class: "messages-primary",
            disabled: q.value,
            onClick: Ie
          }, "重试写入", 8, ls),
          e("details", ns, [
            s[22] || (s[22] = e("summary", null, "原来的记录已被修改或删除？", -1)),
            s[23] || (s[23] = e("p", null, "不会覆盖你的修改。需要这些消息继续进入剧情时，可以在当前位置另加一条补记。", -1)),
            e("button", {
              class: "messages-secondary",
              disabled: q.value,
              onClick: s[13] || (s[13] = (m) => I.value = "recover")
            }, "查看补记方式", 8, is)
          ])
        ], 64)) : I.value === "adopt" ? (t(), l(T, { key: 6 }, [
          s[25] || (s[25] = e("p", null, "将读取服务器上的当前聊天小白 OS 存档，放弃本地尚未确认的修改。信息 APP 会显示服务器已保存的联系人和消息。", -1)),
          s[26] || (s[26] = e("p", { class: "messages-subtle" }, "这项选择作用于当前聊天的整份 OS 存档，不会删除主聊天里的记录，也不会重新生成回复。", -1)),
          e("button", {
            class: "messages-danger",
            disabled: r.value || !!n.value.busy || n.value.generationActive,
            onClick: xe
          }, "确认采用服务器版本", 8, us),
          e("button", {
            class: "messages-secondary",
            disabled: r.value,
            onClick: P
          }, "暂不处理", 8, os)
        ], 64)) : (t(), l(T, { key: 7 }, [
          s[27] || (s[27] = e("p", null, "先检查已有记录；仍未写入的消息会在主聊天当前位置标为「补录」，保留原发送时间。不会覆盖旧记录或恢复你删除的那一条。", -1)),
          e("button", {
            class: "messages-primary",
            disabled: q.value,
            onClick: Ee
          }, "确认补记", 8, rs),
          e("button", {
            class: "messages-secondary",
            onClick: P
          }, "暂不补记")
        ], 64))
      ], 544)
    ]));
  }
}), gs = ds;
export {
  gs as default
};
