/* eslint-disable */
import { A as ce, B as X, C as Te, E as ae, F as De, H as p, I as b, N as Z, T as t, V as ye, _ as M, a as _, b as ue, c as Y, d as e, f as ie, g as K, j as fe, l as q, m as n, p as I, s as be, u as V, v as N, w as oe, y as Q } from "./xiaobai-os-runtime-dom.esm-bundler-DwdCK5Jt.js";
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
    const c = {
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
      stop: "M7 7h10v10H7Z"
    };
    return (l, r) => (t(), n("svg", qe, [e("path", { d: c[a.name] }, null, 8, Le)]));
  }
}), E = Pe, Ve = /* @__PURE__ */ N({
  __name: "ContactAvatar",
  props: {
    identity: {},
    name: {},
    small: { type: Boolean }
  },
  setup(a) {
    const c = a, l = V(() => {
      let r = 0;
      for (const i of c.identity) r = Math.imul(r, 31) + i.codePointAt(0) | 0;
      return String((r >>> 0) % 360);
    });
    return (r, i) => (t(), n("span", {
      class: X(["messages-avatar", { small: a.small }]),
      style: ye({ "--avatar-hue": l.value }),
      "aria-hidden": "true"
    }, p(Array.from(a.name)[0]), 7));
  }
}), ee = Ve, Ue = { class: "messages-contacts" }, Fe = { class: "messages-home-header" }, He = { class: "messages-search" }, ze = {
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
}, _e = {
  key: 1,
  class: "messages-preview"
}, Oe = {
  key: 2,
  class: "messages-preview"
}, Ye = /* @__PURE__ */ N({
  __name: "ContactList",
  props: {
    contacts: {},
    busyContactId: {},
    drafts: {}
  },
  emits: ["select", "add"],
  setup(a) {
    const c = a, l = b(""), r = V(() => c.contacts.filter((g) => `${g.name} ${g.note}`.toLocaleLowerCase().includes(l.value.toLocaleLowerCase())));
    function i(g) {
      if (g === null) return "";
      const v = new Date(g);
      return v.toDateString() === (/* @__PURE__ */ new Date()).toDateString() ? v.toLocaleTimeString(void 0, {
        hour: "2-digit",
        minute: "2-digit"
      }) : v.toLocaleDateString(void 0, {
        month: "numeric",
        day: "numeric"
      });
    }
    return (g, v) => (t(), n("section", Ue, [
      e("header", Fe, [v[3] || (v[3] = e("h1", null, "信息", -1)), e("button", {
        class: "messages-icon-button",
        "aria-label": "添加联系人",
        onClick: v[0] || (v[0] = (o) => g.$emit("add"))
      }, [M(E, { name: "plus" })])]),
      e("label", He, [M(E, { name: "search" }), Z(e("input", {
        "onUpdate:modelValue": v[1] || (v[1] = (o) => l.value = o),
        type: "search",
        placeholder: "搜索联系人",
        "aria-label": "搜索联系人"
      }, null, 512), [[_, l.value]])]),
      a.contacts.length ? (t(), n("div", Ge, [r.value.length ? I("", !0) : (t(), n("p", je, "没有找到这个人。")), (t(!0), n(q, null, ae(r.value, (o) => (t(), n("button", {
        key: o.id,
        class: "messages-contact-row",
        onClick: (S) => g.$emit("select", o.id)
      }, [M(ee, {
        identity: o.id,
        name: o.name
      }, null, 8, ["identity", "name"]), e("span", Ne, [e("span", Re, [e("strong", null, p(o.name), 1), e("time", null, p(i(o.lastAt)), 1)]), a.busyContactId === o.id ? (t(), n("span", Ze, "正在等待回复…")) : a.drafts.get(o.id)?.text.trim() || a.drafts.get(o.id)?.image ? (t(), n("span", _e, [v[6] || (v[6] = e("em", null, "草稿", -1)), K(" " + p(a.drafts.get(o.id)?.image ? "［图片］" : "") + p(a.drafts.get(o.id)?.text), 1)])) : (t(), n("span", Oe, p(o.preview), 1))])], 8, Ke))), 128))])) : (t(), n("div", ze, [
        M(E, { name: "message" }),
        v[5] || (v[5] = e("h2", null, "暂无联系人", -1)),
        e("button", {
          class: "messages-primary",
          onClick: v[2] || (v[2] = (o) => g.$emit("add"))
        }, [v[4] || (v[4] = K("添加联系人", -1)), M(E, { name: "plus" })])
      ]))
    ]));
  }
}), Je = Ye, We = { key: 0 }, Xe = ["src", "alt"], Qe = ["disabled"], ea = {
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
}, ra = /* @__PURE__ */ N({
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
    const c = a, l = b(""), r = b(!1), i = b(""), g = b(""), v = b(!1), o = V(() => c.message.payload.type === "image" ? c.message.payload.attachment : void 0), S = V(() => o.value?.path || l.value), x = b(!1), $ = b(null), k = V(() => [
      "playing",
      "loading",
      "generating",
      "queued"
    ].includes(g.value)), y = b(!1);
    let f = !0;
    const w = (h) => c.bridge.request(h, {
      chatIdentity: c.chatIdentity,
      messageId: c.message.id
    }, 18e4);
    async function C(h) {
      if (!r.value) {
        r.value = !0, i.value = "";
        try {
          const { result: d } = await w(h ? "messages/image/generate" : "messages/image/check");
          f && (l.value = d.data ?? "", x.value = !1, h && !l.value && (i.value = "请开启画图后再试，画面描述已保留。"));
        } catch {
          f && h && (i.value = "图片生成失败，可以再试一次。");
        } finally {
          f && (r.value = !1);
        }
      }
    }
    async function z() {
      if (y.value) return;
      i.value = "";
      const h = k.value;
      if (!(!h && !c.media.voice))
        try {
          h ? (y.value = !0, await w("messages/voice/stop"), f && (g.value = "")) : (g.value = "loading", await w("messages/voice/play"));
        } catch {
          f && (h || (g.value = ""), i.value = h ? "未能确认停止，请再点一次停止。" : "语音暂时无法播放，原文仍可查看。");
        } finally {
          f && (y.value = !1);
        }
    }
    const T = c.bridge.subscribe((h) => {
      if (h.type !== "messages/voice-state") return;
      const d = h.payload;
      d.messageId === c.message.id ? g.value = d.status : d.status === "playing" && (g.value = ""), d.messageId === c.message.id && d.status === "error" && (i.value = "播放失败，点击可以重试。");
    });
    return Te(() => {
      c.message.payload.type === "image" && !o.value && C(!1);
    }), fe(() => c.media.image, (h) => {
      h && c.message.payload.type === "image" && !o.value && !l.value && C(!1);
    }), oe(() => {
      f = !1, T();
    }), (h, d) => (t(), n("article", { class: X(["messages-bubble-row", { outgoing: a.message.sender === "user" }]) }, [e("div", { class: X(["messages-bubble", `messages-bubble-${a.message.payload.type}`]) }, [a.message.payload.type === "text" ? (t(), n("p", We, p(a.message.payload.text), 1)) : a.message.payload.type === "image" ? (t(), n(q, { key: 1 }, [
      S.value && !x.value ? (t(), n("button", {
        key: 0,
        class: "messages-image-open",
        "aria-label": "放大图片",
        onClick: d[2] || (d[2] = (B) => $.value?.showModal())
      }, [e("img", {
        src: S.value,
        alt: a.message.payload.description || o.value?.name || "图片",
        onLoad: d[0] || (d[0] = (B) => h.$emit("resize")),
        onError: d[1] || (d[1] = (B) => x.value = !0)
      }, null, 40, Xe)])) : o.value ? (t(), n("button", {
        key: 1,
        class: "messages-image-placeholder",
        onClick: d[3] || (d[3] = (B) => x.value = !1)
      }, [
        M(E, { name: "image" }),
        d[9] || (d[9] = e("span", null, "原图暂时无法读取", -1)),
        d[10] || (d[10] = e("small", null, "点击重试", -1))
      ])) : a.media.image ? (t(), n("button", {
        key: 2,
        class: "messages-image-placeholder",
        disabled: r.value,
        onClick: d[4] || (d[4] = (B) => C(!0))
      }, [M(E, { name: "image" }), e("span", null, p(r.value ? "正在生成图片…" : i.value ? "重新生成图片" : "生成图片"), 1)], 8, Qe)) : (t(), n("div", ea, [
        M(E, { name: "image" }),
        d[11] || (d[11] = e("span", null, "图片描述", -1)),
        d[12] || (d[12] = e("small", null, "开启画图后可生成图片", -1))
      ])),
      a.message.payload.description ? (t(), n("p", aa, p(a.message.payload.description), 1)) : I("", !0),
      a.message.sender === "user" && o.value ? (t(), n("button", {
        key: 5,
        class: "messages-image-delete",
        disabled: a.disabled,
        onClick: d[5] || (d[5] = (B) => h.$emit("deleteImage", a.message.id))
      }, "删除图片消息", 8, sa)) : I("", !0),
      e("dialog", {
        ref_key: "viewer",
        ref: $,
        class: "messages-image-viewer",
        onClick: d[6] || (d[6] = (B) => $.value?.close()),
        onKeydown: d[7] || (d[7] = be(Y(() => {
        }, ["stop"]), ["esc"]))
      }, [e("button", ta, [M(E, { name: "close" })]), S.value ? (t(), n("img", {
        key: 0,
        src: S.value,
        alt: a.message.payload.description || o.value?.name || "图片"
      }, null, 8, la)) : I("", !0)], 544)
    ], 64)) : (t(), n(q, { key: 2 }, [
      e("button", {
        class: "messages-voice-button",
        disabled: y.value || !a.media.voice && !k.value,
        "aria-label": k.value ? "停止播放" : "播放语音",
        onClick: z
      }, [
        M(E, { name: k.value ? "stop" : "play" }, null, 8, ["name"]),
        e("span", { class: X(["messages-wave", { playing: g.value === "playing" }]) }, [(t(), n(q, null, ae(16, (B) => e("i", {
          key: B,
          style: ye({
            height: `${8 + B * 7 % 17}px`,
            animationDelay: `${B * 45}ms`
          })
        }, null, 4)), 64))], 2),
        e("small", null, p(y.value ? "停止中" : [
          "loading",
          "generating",
          "queued"
        ].includes(g.value) ? "准备中" : "语音"), 1)
      ], 8, na),
      a.media.voice ? I("", !0) : (t(), n("small", ia, "开启 TTS 后可播放")),
      a.media.voice ? (t(), n("button", {
        key: 1,
        class: "messages-transcript-toggle",
        onClick: d[8] || (d[8] = (B) => v.value = !v.value)
      }, p(v.value ? "收起原文" : "查看原文"), 1)) : I("", !0),
      v.value || !a.media.voice ? (t(), n("p", ua, p(a.message.payload.transcript), 1)) : I("", !0)
    ], 64)), i.value ? (t(), n("small", oa, p(i.value), 1)) : I("", !0)], 2)], 2));
  }
}), da = ra, va = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif"
], vs = 4 * 1024 * 1024;
async function ma(a) {
  if (!va.includes(a.type)) throw new Error("请选择 PNG、JPG、WEBP 或 GIF 图片。");
  if (!a.size || a.size > 4194304) throw new Error("请选择不超过 4MB 的图片。");
  const c = await new Promise((r, i) => {
    const g = new FileReader();
    g.onerror = () => i(/* @__PURE__ */ new Error("图片读取失败，请重新选择。")), g.onload = () => typeof g.result == "string" ? r(g.result) : i(/* @__PURE__ */ new Error("图片读取失败。")), g.readAsDataURL(a);
  }), l = new Image();
  l.src = c;
  try {
    await l.decode();
  } catch {
    throw new Error("这张图片无法打开，请换一张。");
  }
  return {
    dataUrl: c,
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
}, ka = { class: "messages-composer-line" }, wa = ["disabled"], ha = ["placeholder", "disabled"], $a = ["disabled"], Ia = /* @__PURE__ */ N({
  __name: "MessageComposer",
  props: /* @__PURE__ */ Q({
    disabled: { type: Boolean },
    sending: { type: Boolean },
    waitingFor: {}
  }, {
    draft: { required: !0 },
    draftModifiers: {}
  }),
  emits: /* @__PURE__ */ Q(["send"], ["update:draft"]),
  setup(a, { emit: c }) {
    const l = a, r = c, i = ce(a, "draft"), g = V({
      get: () => i.value.text,
      set: (w) => {
        i.value = {
          ...i.value,
          text: w
        };
      }
    }), v = b(null), o = b(!1), S = b("");
    let x = !0;
    async function $(w) {
      const C = w.target, z = C.files?.[0];
      if (C.value = "", !(!z || l.sending || o.value)) {
        o.value = !0, S.value = "";
        try {
          const T = await ma(z);
          x && (i.value = {
            ...i.value,
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
      i.value = {
        ...i.value,
        image: null
      }, S.value = "";
    }
    function y() {
      const w = g.value.trim();
      !w && !i.value.image || l.disabled || o.value || r("send", i.value.image ? {
        type: "image",
        description: w,
        upload: { ...i.value.image }
      } : {
        type: "text",
        text: w
      });
    }
    oe(() => {
      x = !1;
    });
    function f(w) {
      w.key === "Enter" && (w.ctrlKey || w.metaKey) && !w.isComposing && (w.preventDefault(), y());
    }
    return (w, C) => (t(), n("form", {
      class: "messages-composer",
      onSubmit: Y(y, ["prevent"])
    }, [
      e("input", {
        ref_key: "fileInput",
        ref: v,
        type: "file",
        accept: "image/png,image/jpeg,image/webp,image/gif",
        hidden: "",
        "aria-label": "选择图片文件",
        onChange: $
      }, null, 544),
      i.value.image ? (t(), n("div", ga, [
        e("img", {
          src: i.value.image.dataUrl,
          alt: i.value.image.name
        }, null, 8, ca),
        e("span", null, [C[2] || (C[2] = e("strong", null, "待发送的图片", -1)), e("small", null, p(i.value.image.name), 1)]),
        e("button", {
          type: "button",
          class: "messages-icon-button",
          "aria-label": "移除图片",
          disabled: a.sending || o.value,
          onClick: k
        }, [M(E, { name: "close" })], 8, ya)
      ])) : I("", !0),
      i.value.image ? (t(), n("p", fa, "图片将随消息发送，需要当前模型支持看图。")) : I("", !0),
      o.value || S.value ? (t(), n("p", ba, p(o.value ? "正在读取图片…" : S.value), 1)) : I("", !0),
      a.waitingFor ? (t(), n("p", pa, "正在等待 " + p(a.waitingFor) + " 的回复。可以先写好，稍后发送。", 1)) : I("", !0),
      e("div", ka, [
        e("button", {
          type: "button",
          class: "messages-icon-button messages-attach",
          "aria-label": "选择图片",
          disabled: a.sending || o.value,
          onClick: C[0] || (C[0] = (z) => v.value?.click())
        }, [M(E, { name: "plus" })], 8, wa),
        Z(e("textarea", {
          "onUpdate:modelValue": C[1] || (C[1] = (z) => g.value = z),
          rows: "1",
          maxlength: "4000",
          placeholder: i.value.image ? "给图片配句话…" : "说点什么…",
          "aria-label": "消息内容",
          disabled: a.sending,
          onKeydown: f
        }, null, 40, ha), [[_, g.value]]),
        e("button", {
          class: "messages-send",
          type: "submit",
          disabled: a.disabled || o.value || !g.value.trim() && !i.value.image,
          "aria-label": "发送"
        }, [M(E, { name: "send" })], 8, $a)
      ])
    ], 32));
  }
}), Ma = Ia, Ca = { class: "messages-conversation" }, Sa = { class: "messages-thread-header" }, Aa = ["disabled"], Ea = {
  key: 1,
  class: "messages-thread-start"
}, xa = {
  key: 0,
  class: "messages-time"
}, Ba = {
  key: 2,
  class: "messages-typing",
  role: "status"
}, Ta = ["disabled"], Da = /* @__PURE__ */ N({
  __name: "Conversation",
  props: /* @__PURE__ */ Q({
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
  emits: /* @__PURE__ */ Q([
    "back",
    "details",
    "send",
    "retry",
    "deleteImage"
  ], ["update:draft"]),
  setup(a, { expose: c }) {
    const l = ce(a, "draft"), r = a, i = b(null);
    let g = !0, v = !1;
    function o() {
      const k = i.value;
      k && (g = k.scrollHeight - k.clientHeight - k.scrollTop < 70);
    }
    async function S() {
      await ue(), g && !v && i.value && (i.value.scrollTop = i.value.scrollHeight);
    }
    fe(() => [r.page.messages.at(-1)?.id, r.stage], S, { immediate: !0 });
    async function x() {
      const k = i.value;
      if (!k || v) return;
      v = !0;
      const y = k.scrollHeight, f = k.scrollTop;
      try {
        await r.loadMore(), await ue(), k.scrollTop = f + k.scrollHeight - y;
      } finally {
        v = !1, o();
      }
    }
    const $ = {
      uploading: "正在发送图片…",
      saving: "正在保存消息…",
      syncing: "正在写入主聊天…",
      summarizing: "正在回顾你们的对话…",
      replying: "对方正在输入…"
    };
    return c({ sent() {
      g = !0, S();
    } }), (k, y) => (t(), n("section", Ca, [
      e("header", Sa, [
        e("button", {
          class: "messages-icon-button",
          "aria-label": "返回信息",
          onClick: y[0] || (y[0] = (f) => k.$emit("back"))
        }, [M(E, { name: "back" })]),
        M(ee, {
          identity: a.contact.id,
          name: a.contact.name,
          small: ""
        }, null, 8, ["identity", "name"]),
        e("div", null, [e("h2", null, p(a.contact.name), 1)]),
        e("button", {
          class: "messages-icon-button",
          "aria-label": "联系人详情",
          onClick: y[1] || (y[1] = (f) => k.$emit("details"))
        }, [M(E, { name: "more" })])
      ]),
      e("div", {
        ref_key: "scroller",
        ref: i,
        class: "messages-thread-scroll",
        onScroll: o
      }, [
        a.page.hasMore ? (t(), n("button", {
          key: 0,
          class: "messages-older",
          disabled: a.loading,
          onClick: x
        }, p(a.loading ? "读取中…" : "查看更早的消息"), 9, Aa)) : I("", !0),
        a.loading && !a.page.messages.length ? (t(), n("p", Ea, "正在读取消息…")) : I("", !0),
        (t(!0), n(q, null, ae(a.page.messages, (f, w) => (t(), n(q, { key: f.id }, [w === 0 || f.createdAt - a.page.messages[w - 1].createdAt > 3e5 ? (t(), n("time", xa, p(new Date(f.createdAt).toLocaleString(void 0, {
          month: "numeric",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        })), 1)) : I("", !0), M(da, {
          message: f,
          bridge: a.bridge,
          "chat-identity": a.chatIdentity,
          media: a.media,
          disabled: a.disabled,
          onResize: S,
          onDeleteImage: y[2] || (y[2] = (C) => k.$emit("deleteImage", C))
        }, null, 8, [
          "message",
          "bridge",
          "chat-identity",
          "media",
          "disabled"
        ])], 64))), 128)),
        a.stage ? (t(), n("div", Ba, [y[6] || (y[6] = e("span", null, [
          e("i"),
          e("i"),
          e("i")
        ], -1)), K(p($[a.stage] || "处理中…"), 1)])) : a.page.retryMessageId ? (t(), n("button", {
          key: 3,
          class: "messages-retry",
          disabled: a.disabled,
          onClick: y[3] || (y[3] = (f) => k.$emit("retry", a.page.retryMessageId))
        }, "尚未收到回复 · 重试", 8, Ta)) : I("", !0)
      ], 544),
      M(Ma, {
        draft: l.value,
        "onUpdate:draft": y[4] || (y[4] = (f) => l.value = f),
        disabled: a.disabled,
        sending: ["uploading", "saving"].includes(a.stage),
        "waiting-for": a.waitingFor,
        onSend: y[5] || (y[5] = (f) => k.$emit("send", f))
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
}), Pa = (a, c) => a.text === c.text && a.image?.dataUrl === c.image?.dataUrl && a.image?.name === c.image?.name;
function W() {
  return Array.from(globalThis.crypto.getRandomValues(new Uint8Array(16)), (a) => a.toString(16).padStart(2, "0")).join("");
}
var Va = { class: "messages-app" }, Ua = {
  key: 0,
  class: "messages-banner",
  role: "status"
}, Fa = { class: "messages-save-actions" }, Ha = ["disabled"], za = ["disabled"], Ga = {
  key: 1,
  class: "messages-banner",
  role: "status"
}, ja = ["disabled"], Ka = {
  key: 2,
  class: "messages-notice"
}, Na = {
  key: 3,
  class: "messages-error",
  role: "alert"
}, Ra = {
  key: 0,
  class: "messages-error",
  role: "alert"
}, Za = { class: "messages-search" }, _a = { class: "messages-known-list" }, Oa = ["disabled", "onClick"], Ya = { key: 0 }, Ja = {
  key: 0,
  class: "messages-subtle"
}, Wa = { class: "messages-manual" }, Xa = ["disabled"], Qa = ["disabled"], es = ["disabled"], as = ["disabled"], ss = ["disabled"], ts = ["disabled"], ls = { class: "messages-manual" }, ns = ["disabled"], is = ["disabled"], us = ["disabled"], os = ["disabled"], rs = /* @__PURE__ */ N({
  __name: "MessagesApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(a) {
    const c = a, l = b(c.initialState), r = b(""), i = b({
      contactId: "",
      messages: [],
      hasMore: !1,
      retryMessageId: null
    }), g = b(!1), v = b(!1), o = b(""), S = b(null), x = b(null), $ = b("add"), k = b(""), y = b(""), f = b(""), w = b(""), C = b(W()), z = b(W());
    let T = !0, h = 0;
    const d = De(/* @__PURE__ */ new Map()), B = V({
      get: () => d.get(r.value) ?? La(),
      set: (u) => {
        d.set(r.value, u);
      }
    });
    let U = null;
    const L = V(() => l.value.contacts.find((u) => u.id === r.value)), pe = V(() => l.value.busy && l.value.busy.contactId !== r.value ? l.value.contacts.find((u) => u.id === l.value.busy?.contactId)?.name ?? "另一位联系人" : ""), J = V(() => l.value.pendingSave || [
      "unconfirmed",
      "conflict",
      "failed"
    ].includes(l.value.fileState)), D = V(() => v.value || !!l.value.busy || l.value.pendingSave || l.value.fileState !== "ready" || l.value.generationActive), re = V(() => l.value.knownPeople.filter((u) => !l.value.contacts.some((s) => s.name === u.name) && `${u.name} ${u.aliases.join(" ")}`.toLocaleLowerCase().includes(w.value.toLocaleLowerCase())));
    async function F(u, s = {}) {
      return (await c.bridge.request(u, {
        chatIdentity: l.value.chatIdentity,
        ...s
      }, 6e4)).result;
    }
    async function se(u = !1, s = !1) {
      const m = r.value;
      if (!m) return;
      const A = ++h;
      g.value = !0;
      try {
        const R = await F("messages/thread", {
          contactId: m,
          ...u ? { before: i.value.messages[0]?.seq } : {}
        });
        if (!T || A !== h || r.value !== m) return;
        const ge = R.messages.some((j) => i.value.messages.some((ne) => ne.id === j.id)), Be = !s && (u || ge) ? i.value.messages : [], le = [...new Map([...Be, ...R.messages].map((j) => [j.id, j])).values()].sort((j, ne) => j.seq - ne.seq);
        i.value = {
          ...R,
          messages: le,
          hasMore: s || u || !ge || le.length <= 50 ? R.hasMore : i.value.hasMore
        }, U?.contactId === m && le.some((j) => j.id === U?.messageId) && de();
      } catch {
        T && A === h && r.value === m && (o.value = "消息暂时无法读取，请返回后重试。");
      } finally {
        A === h && (g.value = !1);
      }
    }
    function H(u) {
      if (!T || u.chatIdentity !== l.value.chatIdentity) return;
      const s = L.value?.lastSeq, m = J.value;
      l.value = u;
      for (const A of d.keys()) u.contacts.some((R) => R.id === A) || d.delete(A);
      U && u.contacts.some((A) => A.lastMessageId === U?.messageId) && de(), r.value && !u.contacts.some((A) => A.id === r.value) ? te() : r.value && (s !== L.value?.lastSeq || m && !J.value) && se(!1, m && !J.value);
    }
    function de() {
      if (U) {
        const u = d.get(U.contactId);
        u && Pa(u, U.draft) && d.delete(U.contactId), U.contactId === r.value && S.value?.sent();
      }
      U = null, C.value = W();
    }
    const ke = c.bridge.subscribe((u) => {
      u.type === "messages/state" && H(u.payload.state);
    });
    function ve(u) {
      r.value = u, o.value = "", i.value = {
        contactId: u,
        messages: [],
        hasMore: !1,
        retryMessageId: null
      }, se();
    }
    function te() {
      r.value = "", h++, i.value = {
        contactId: "",
        messages: [],
        hasMore: !1,
        retryMessageId: null
      };
    }
    async function G(u) {
      if (!v.value) {
        v.value = !0, o.value = "";
        try {
          await u();
        } catch (s) {
          T && (o.value = s instanceof Error && s.message !== "host_request_timeout" ? s.message : "等待操作结果超时，请核实保存状态后重试。");
        } finally {
          v.value = !1;
        }
      }
    }
    function we(u) {
      D.value || G(async () => {
        U = {
          contactId: r.value,
          messageId: `input:${C.value}`,
          draft: { ...B.value }
        }, H(await F("messages/send", {
          contactId: r.value,
          actionId: C.value,
          payload: u
        }));
      });
    }
    function he(u) {
      G(async () => H(await F("messages/retry", {
        contactId: r.value,
        messageId: u
      })));
    }
    function $e(u) {
      G(async () => H(await F(u)));
    }
    function Ie() {
      G(async () => {
        H(await F("messages/sync")), P();
      });
    }
    async function O(u) {
      $.value = u, o.value = "", y.value = "", f.value = L.value?.note ?? "", w.value = "", z.value = W(), await ue(), x.value?.showModal();
    }
    function P() {
      x.value?.close();
    }
    function me(u = y.value) {
      !u.trim() || D.value || G(async () => {
        const s = await F("messages/contact/add", {
          actionId: z.value,
          name: u.trim(),
          note: f.value.trim()
        });
        H(s.state), P(), ve(s.contactId);
      });
    }
    function Me() {
      G(async () => {
        H(await F("messages/contact/note", {
          contactId: r.value,
          note: f.value
        })), P();
      });
    }
    function Ce() {
      G(async () => {
        H(await F("messages/contact/delete", { contactId: r.value })), P(), te();
      });
    }
    function Se(u) {
      k.value = u, O("delete-image");
    }
    function Ae() {
      const u = r.value, s = k.value;
      G(async () => {
        const m = await F("messages/message/delete-image", {
          contactId: u,
          messageId: s
        });
        H(m.state), T && r.value === u && (h++, g.value = !1, i.value = {
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
      G(async () => {
        H(await F("messages/recover")), P();
      });
    }
    function xe() {
      G(async () => {
        H(await F("messages/adopt-server-state")), l.value.fileState === "ready" && !l.value.pendingSave ? P() : o.value = "暂时未能采用服务器版本，请检查网络后重试。当前记录保持不变。";
      });
    }
    return oe(() => {
      T = !1, h++, ke();
    }), (u, s) => (t(), n("main", Va, [
      J.value ? (t(), n("div", Ua, [e("span", null, p(l.value.fileState === "conflict" ? "服务器上的存档已有变化，请选择如何处理。" : "有消息还在等待保存确认，已保存的记录不会丢失。"), 1), e("div", Fa, [e("button", {
        disabled: v.value || !!l.value.busy,
        onClick: s[0] || (s[0] = (m) => $e(l.value.pendingSave ? "messages/confirm" : "messages/refresh"))
      }, "检查保存", 8, Ha), l.value.fileState === "conflict" ? (t(), n("button", {
        key: 0,
        disabled: v.value || !!l.value.busy || l.value.generationActive,
        onClick: s[1] || (s[1] = (m) => O("adopt"))
      }, "采用服务器版本", 8, za)) : I("", !0)])])) : l.value.unsynced && !l.value.busy ? (t(), n("div", Ga, [e("span", null, p(l.value.unsynced) + " 条消息已保留，尚未写入主聊天。", 1), e("button", {
        disabled: D.value,
        onClick: s[2] || (s[2] = (m) => O("sync"))
      }, "查看", 8, ja)])) : I("", !0),
      l.value.generationActive ? (t(), n("div", Ka, "故事正在继续，稍后就能发送消息。")) : I("", !0),
      o.value || l.value.error ? (t(), n("p", Na, p(o.value || l.value.error), 1)) : I("", !0),
      L.value ? (t(), ie(qa, {
        key: L.value.id,
        ref_key: "conversation",
        ref: S,
        draft: B.value,
        "onUpdate:draft": s[3] || (s[3] = (m) => B.value = m),
        contact: L.value,
        page: i.value,
        bridge: a.bridge,
        "chat-identity": l.value.chatIdentity,
        disabled: D.value,
        stage: l.value.busy?.contactId === L.value.id ? l.value.busy.stage : "",
        loading: g.value,
        "load-more": () => se(!0),
        media: l.value.media,
        "waiting-for": pe.value,
        onBack: te,
        onDetails: s[4] || (s[4] = (m) => O("detail")),
        onSend: we,
        onRetry: he,
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
      ])) : (t(), ie(Je, {
        key: 5,
        contacts: l.value.contacts,
        "busy-contact-id": l.value.busy?.contactId ?? "",
        drafts: d,
        onSelect: ve,
        onAdd: s[5] || (s[5] = (m) => O("add"))
      }, null, 8, [
        "contacts",
        "busy-contact-id",
        "drafts"
      ])),
      e("dialog", {
        ref_key: "dialog",
        ref: x,
        class: "messages-dialog",
        onKeydown: s[14] || (s[14] = be(Y(() => {
        }, ["stop"]), ["esc"])),
        onClick: s[15] || (s[15] = (m) => {
          m.target === x.value && P();
        })
      }, [
        e("header", null, [
          $.value === "detail" && L.value ? (t(), ie(ee, {
            key: 0,
            identity: L.value.id,
            name: L.value.name,
            small: ""
          }, null, 8, ["identity", "name"])) : I("", !0),
          e("h2", null, p($.value === "add" ? "新的对话" : $.value === "detail" ? L.value?.name : $.value === "delete" ? "删除联系人？" : $.value === "delete-image" ? "删除这条图片消息？" : $.value === "sync" ? "消息还未写入主聊天" : $.value === "adopt" ? "采用服务器版本？" : "在当前位置补记？"), 1),
          e("button", {
            class: "messages-icon-button",
            "aria-label": "关闭",
            onClick: P
          }, [M(E, { name: "close" })])
        ]),
        o.value ? (t(), n("p", Ra, p(o.value), 1)) : I("", !0),
        $.value === "add" ? (t(), n(q, { key: 1 }, [
          e("label", Za, [M(E, { name: "search" }), Z(e("input", {
            "onUpdate:modelValue": s[6] || (s[6] = (m) => w.value = m),
            placeholder: "查找已知人物",
            "aria-label": "查找已知人物"
          }, null, 512), [[_, w.value]])]),
          e("div", _a, [(t(!0), n(q, null, ae(re.value, (m) => (t(), n("button", {
            key: m.name,
            disabled: D.value,
            onClick: (A) => me(m.name)
          }, [
            M(ee, {
              identity: m.name,
              name: m.name,
              small: ""
            }, null, 8, ["identity", "name"]),
            e("span", null, [K(p(m.name), 1), m.aliases.length ? (t(), n("small", Ya, p(m.aliases.join("、")), 1)) : I("", !0)]),
            M(E, { name: "plus" })
          ], 8, Oa))), 128)), re.value.length ? I("", !0) : (t(), n("p", Ja, "没有更多已知人物，可以在下面补充。"))]),
          e("details", Wa, [s[18] || (s[18] = e("summary", null, "想联系的人不在这里？", -1)), e("form", { onSubmit: s[9] || (s[9] = Y((m) => me(), ["prevent"])) }, [
            e("label", null, [s[16] || (s[16] = K("姓名", -1)), Z(e("input", {
              "onUpdate:modelValue": s[7] || (s[7] = (m) => y.value = m),
              maxlength: "120",
              required: "",
              placeholder: "对方的姓名"
            }, null, 512), [[_, y.value]])]),
            e("label", null, [s[17] || (s[17] = K("身份说明（可选）", -1)), Z(e("textarea", {
              "onUpdate:modelValue": s[8] || (s[8] = (m) => f.value = m),
              maxlength: "600",
              rows: "2",
              placeholder: "例如：住在隔壁的花店老板"
            }, null, 512), [[_, f.value]])]),
            e("button", {
              class: "messages-primary",
              disabled: D.value || !y.value.trim()
            }, "添加并聊天", 8, Xa)
          ], 32)])
        ], 64)) : $.value === "detail" ? (t(), n("form", {
          key: 2,
          onSubmit: Y(Me, ["prevent"])
        }, [
          e("label", null, [s[19] || (s[19] = K("身份说明 / 备注", -1)), Z(e("textarea", {
            "onUpdate:modelValue": s[10] || (s[10] = (m) => f.value = m),
            maxlength: "600",
            rows: "3",
            placeholder: "帮助辨认这位联系人"
          }, null, 512), [[_, f.value]])]),
          e("button", {
            class: "messages-primary",
            disabled: D.value
          }, "保存备注", 8, Qa),
          e("button", {
            type: "button",
            class: "messages-danger",
            disabled: D.value,
            onClick: s[11] || (s[11] = (m) => $.value = "delete")
          }, "删除联系人与通讯记录", 8, es)
        ], 32)) : $.value === "delete" ? (t(), n(q, { key: 3 }, [
          e("p", null, "会删除信息 APP 内与 " + p(L.value?.name) + " 的全部通讯和摘要，不能恢复。主聊天中的「私人信息」楼层不会删除，其他联系人不受影响。", 1),
          e("button", {
            class: "messages-danger",
            disabled: D.value,
            onClick: Ce
          }, "确认删除", 8, as),
          e("button", {
            class: "messages-secondary",
            onClick: s[12] || (s[12] = (m) => $.value = "detail")
          }, "保留联系人")
        ], 64)) : $.value === "delete-image" ? (t(), n(q, { key: 4 }, [
          s[20] || (s[20] = e("p", null, "这条图片及配文将从信息 APP 中删除，不再发送给模型，不能恢复。其他消息保留。", -1)),
          s[21] || (s[21] = e("p", { class: "messages-subtle" }, "主聊天里的记录和图库原图不会删除。", -1)),
          e("button", {
            class: "messages-danger",
            disabled: D.value,
            onClick: Ae
          }, "确认删除", 8, ss),
          e("button", {
            class: "messages-secondary",
            onClick: P
          }, "取消")
        ], 64)) : $.value === "sync" ? (t(), n(q, { key: 5 }, [
          s[24] || (s[24] = e("p", null, "信息 APP 已保留这些消息。重试只会补上主聊天里的记录，不会再次向对方发送，也不会重新生成回复。", -1)),
          e("button", {
            class: "messages-primary",
            disabled: D.value,
            onClick: Ie
          }, "重试写入", 8, ts),
          e("details", ls, [
            s[22] || (s[22] = e("summary", null, "原来的记录已被修改或删除？", -1)),
            s[23] || (s[23] = e("p", null, "不会覆盖你的修改。需要这些消息继续进入剧情时，可以在当前位置另加一条补记。", -1)),
            e("button", {
              class: "messages-secondary",
              disabled: D.value,
              onClick: s[13] || (s[13] = (m) => $.value = "recover")
            }, "查看补记方式", 8, ns)
          ])
        ], 64)) : $.value === "adopt" ? (t(), n(q, { key: 6 }, [
          s[25] || (s[25] = e("p", null, "将读取服务器上的当前聊天小白 OS 存档，放弃本地尚未确认的修改。信息 APP 会显示服务器已保存的联系人和消息。", -1)),
          s[26] || (s[26] = e("p", { class: "messages-subtle" }, "这项选择作用于当前聊天的整份 OS 存档，不会删除主聊天里的记录，也不会重新生成回复。", -1)),
          e("button", {
            class: "messages-danger",
            disabled: v.value || !!l.value.busy || l.value.generationActive,
            onClick: xe
          }, "确认采用服务器版本", 8, is),
          e("button", {
            class: "messages-secondary",
            disabled: v.value,
            onClick: P
          }, "暂不处理", 8, us)
        ], 64)) : (t(), n(q, { key: 7 }, [
          s[27] || (s[27] = e("p", null, "先检查已有记录；仍未写入的消息会在主聊天当前位置标为「补录」，保留原发送时间。不会覆盖旧记录或恢复你删除的那一条。", -1)),
          e("button", {
            class: "messages-primary",
            disabled: D.value,
            onClick: Ee
          }, "确认补记", 8, os),
          e("button", {
            class: "messages-secondary",
            onClick: P
          }, "暂不补记")
        ], 64))
      ], 544)
    ]));
  }
}), ms = rs;
export {
  ms as default
};
