/* eslint-disable */
import { A as t, B as Z, C as se, H as $e, I as we, J as he, L as Ie, M as ne, O as Ge, T as fe, U as w, Y as k, b as G, f as x, g as n, h as $, i as pe, k as de, l as te, m as X, o as Q, p as e, q as ee, s as je, u as E, v as Y, y as I, z as Ce } from "./xiaobai-os-runtime-dom.esm-bundler-ASdQr4iS.js";
import { n as Ne } from "./xiaobai-os-app-navigation-DrBJz_Kq.js";
import { t as Me } from "./xiaobai-os-AppDialog-CV8GB57a.js";
var Oe = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.8",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, Ke = ["d"], Ye = /* @__PURE__ */ G({
  __name: "MessageIcon",
  props: { name: {} },
  setup(a) {
    const p = {
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
    return (l, r) => (t(), n("svg", Oe, [e("path", { d: p[a.name] }, null, 8, Ke)]));
  }
}), B = Ye, Je = /* @__PURE__ */ G({
  __name: "ContactAvatar",
  props: {
    identity: {},
    name: {},
    small: { type: Boolean }
  },
  setup(a) {
    const p = a, l = x(() => {
      let r = 0;
      for (const o of p.identity) r = Math.imul(r, 31) + o.codePointAt(0) | 0;
      return String((r >>> 0) % 360);
    });
    return (r, o) => (t(), n("span", {
      class: ee(["messages-avatar", { small: a.small }]),
      style: he({ "--avatar-hue": l.value }),
      "aria-hidden": "true"
    }, k(Array.from(a.name)[0]), 7));
  }
}), le = Je, We = { class: "messages-contacts" }, Xe = { class: "messages-home-header" }, Qe = { class: "messages-home-actions" }, _e = { class: "messages-search" }, ea = {
  key: 0,
  class: "messages-empty"
}, aa = {
  key: 1,
  class: "messages-contact-rows"
}, sa = {
  key: 0,
  class: "messages-subtle"
}, ta = ["onClick"], la = { class: "messages-contact-copy" }, na = { class: "messages-contact-heading" }, ia = {
  key: 0,
  class: "messages-preview messages-preview-active"
}, ua = {
  key: 1,
  class: "messages-preview"
}, oa = {
  key: 2,
  class: "messages-preview"
}, da = /* @__PURE__ */ G({
  __name: "ContactList",
  props: {
    contacts: {},
    busyContactId: {},
    drafts: {}
  },
  emits: [
    "select",
    "add",
    "settings"
  ],
  setup(a) {
    const p = a, l = w(""), r = x(() => p.contacts.filter((c) => `${c.name} ${c.note}`.toLocaleLowerCase().includes(l.value.toLocaleLowerCase())));
    function o(c) {
      if (c === null) return "";
      const i = new Date(c);
      return i.toDateString() === (/* @__PURE__ */ new Date()).toDateString() ? i.toLocaleTimeString(void 0, {
        hour: "2-digit",
        minute: "2-digit"
      }) : i.toLocaleDateString(void 0, {
        month: "numeric",
        day: "numeric"
      });
    }
    return (c, i) => (t(), n("section", We, [
      e("header", Xe, [i[4] || (i[4] = e("h1", null, "信息", -1)), e("div", Qe, [e("button", {
        class: "messages-icon-button",
        title: "设置",
        "aria-label": "设置",
        onClick: i[0] || (i[0] = (d) => c.$emit("settings"))
      }, [I(B, { name: "settings" })]), e("button", {
        class: "messages-icon-button messages-add-contact",
        "aria-label": "添加联系人",
        onClick: i[1] || (i[1] = (d) => c.$emit("add"))
      }, [I(B, { name: "plus" })])])]),
      e("label", _e, [I(B, { name: "search" }), Z(e("input", {
        "onUpdate:modelValue": i[2] || (i[2] = (d) => l.value = d),
        type: "search",
        placeholder: "搜索联系人",
        "aria-label": "搜索联系人"
      }, null, 512), [[Q, l.value]])]),
      a.contacts.length ? (t(), n("div", aa, [r.value.length ? $("", !0) : (t(), n("p", sa, "没有找到这个人。")), (t(!0), n(E, null, ne(r.value, (d) => (t(), n("button", {
        key: d.id,
        class: "messages-contact-row",
        onClick: (M) => c.$emit("select", d.id)
      }, [I(le, {
        identity: d.id,
        name: d.name
      }, null, 8, ["identity", "name"]), e("span", la, [e("span", na, [e("strong", null, k(d.name), 1), e("time", null, k(o(d.lastAt)), 1)]), a.busyContactId === d.id ? (t(), n("span", ia, "正在等待回复…")) : a.drafts.get(d.id)?.text.trim() || a.drafts.get(d.id)?.image ? (t(), n("span", ua, [i[7] || (i[7] = e("em", null, "草稿", -1)), Y(" " + k(a.drafts.get(d.id)?.image ? "［图片］" : "") + k(a.drafts.get(d.id)?.text), 1)])) : (t(), n("span", oa, k(d.preview), 1))])], 8, ta))), 128))])) : (t(), n("div", ea, [
        I(B, { name: "message" }),
        i[6] || (i[6] = e("h2", null, "暂无联系人", -1)),
        e("button", {
          class: "messages-primary",
          onClick: i[3] || (i[3] = (d) => c.$emit("add"))
        }, [i[5] || (i[5] = Y("添加联系人", -1)), I(B, { name: "plus" })])
      ]))
    ]));
  }
}), ra = da, va = ["disabled"], ga = {
  type: "submit",
  class: "messages-primary"
}, ma = /* @__PURE__ */ G({
  __name: "MessagesSettings",
  props: {
    settings: {},
    busy: { type: Boolean }
  },
  emits: ["save"],
  setup(a, { emit: p }) {
    const l = a, r = p, o = $e({ ...l.settings });
    return (c, i) => (t(), n("form", {
      class: "messages-settings",
      onSubmit: i[2] || (i[2] = te((d) => r("save", { ...o }), ["prevent"]))
    }, [e("fieldset", { disabled: a.busy }, [
      i[5] || (i[5] = e("legend", null, "能力", -1)),
      e("label", null, [i[3] || (i[3] = e("span", null, "在提示词中允许图片", -1)), Z(e("input", {
        "onUpdate:modelValue": i[0] || (i[0] = (d) => o.imagePrompt = d),
        type: "checkbox"
      }, null, 512), [[pe, o.imagePrompt]])]),
      e("label", null, [i[4] || (i[4] = e("span", null, "在提示词中允许语音", -1)), Z(e("input", {
        "onUpdate:modelValue": i[1] || (i[1] = (d) => o.voicePrompt = d),
        type: "checkbox"
      }, null, 512), [[pe, o.voicePrompt]])]),
      e("button", ga, k(a.busy ? "请稍候…" : "保存能力设置"), 1)
    ], 8, va)], 32));
  }
}), ca = ma, ya = { key: 0 }, ba = ["src", "alt"], fa = ["disabled"], pa = {
  key: 3,
  class: "messages-image-placeholder messages-media-unavailable"
}, ka = {
  key: 4,
  class: "messages-image-caption"
}, $a = ["disabled"], wa = ["src", "alt"], ha = ["disabled", "aria-label"], Ia = {
  key: 0,
  class: "messages-media-unavailable-note"
}, Ca = {
  key: 2,
  class: "messages-transcript"
}, Ma = {
  key: 3,
  class: "messages-media-error",
  role: "status"
}, Sa = /* @__PURE__ */ G({
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
    const p = a, l = w(""), r = w(!1), o = w(""), c = w(""), i = w(!1), d = x(() => p.message.payload.type === "image" ? p.message.payload.attachment : void 0), M = x(() => d.value?.path || l.value), D = w(!1), P = w(!1), b = x(() => [
      "playing",
      "loading",
      "generating",
      "queued"
    ].includes(c.value)), V = w(!1);
    let f = !0;
    const v = (h) => p.bridge.request(h, {
      chatIdentity: p.chatIdentity,
      messageId: p.message.id
    }, 18e4);
    async function y(h) {
      if (!r.value) {
        r.value = !0, o.value = "";
        try {
          const { result: m } = await v(h ? "messages/image/generate" : "messages/image/check");
          f && (l.value = m.data ?? "", D.value = !1, h && !l.value && (o.value = "请开启画图后再试，画面描述已保留。"));
        } catch {
          f && h && (o.value = "图片生成失败，可以再试一次。");
        } finally {
          f && (r.value = !1);
        }
      }
    }
    async function S() {
      if (V.value) return;
      o.value = "";
      const h = b.value;
      if (!(!h && !p.media.voice))
        try {
          h ? (V.value = !0, await v("messages/voice/stop"), f && (c.value = "")) : (c.value = "loading", await v("messages/voice/play"));
        } catch {
          f && (h || (c.value = ""), o.value = h ? "未能确认停止，请再点一次停止。" : "语音暂时无法播放，原文仍可查看。");
        } finally {
          f && (V.value = !1);
        }
    }
    const q = p.bridge.subscribe((h) => {
      if (h.type !== "messages/voice-state") return;
      const m = h.payload;
      m.messageId === p.message.id ? c.value = m.status : m.status === "playing" && (c.value = ""), m.messageId === p.message.id && m.status === "error" && (o.value = "播放失败，点击可以重试。");
    });
    return Ge(() => {
      p.message.payload.type === "image" && !d.value && y(!1);
    }), Ie(() => p.media.image, (h) => {
      h && p.message.payload.type === "image" && !d.value && !l.value && y(!1);
    }), de(() => {
      f = !1, q();
    }), (h, m) => (t(), n("article", { class: ee(["messages-bubble-row", { outgoing: a.message.sender === "user" }]) }, [e("div", { class: ee(["messages-bubble", `messages-bubble-${a.message.payload.type}`]) }, [a.message.payload.type === "text" ? (t(), n("p", ya, k(a.message.payload.text), 1)) : a.message.payload.type === "image" ? (t(), n(E, { key: 1 }, [
      M.value && !D.value ? (t(), n("button", {
        key: 0,
        class: "messages-image-open",
        "aria-label": "放大图片",
        onClick: m[2] || (m[2] = (A) => P.value = !0)
      }, [e("img", {
        src: M.value,
        alt: a.message.payload.description || d.value?.name || "图片",
        onLoad: m[0] || (m[0] = (A) => h.$emit("resize")),
        onError: m[1] || (m[1] = (A) => D.value = !0)
      }, null, 40, ba)])) : d.value ? (t(), n("button", {
        key: 1,
        class: "messages-image-placeholder",
        onClick: m[3] || (m[3] = (A) => D.value = !1)
      }, [
        I(B, { name: "image" }),
        m[9] || (m[9] = e("span", null, "原图暂时无法读取", -1)),
        m[10] || (m[10] = e("small", null, "点击重试", -1))
      ])) : a.media.image ? (t(), n("button", {
        key: 2,
        class: "messages-image-placeholder",
        disabled: r.value,
        onClick: m[4] || (m[4] = (A) => y(!0))
      }, [I(B, { name: "image" }), e("span", null, k(r.value ? "正在生成图片…" : o.value ? "重新生成图片" : "生成图片"), 1)], 8, fa)) : (t(), n("div", pa, [
        I(B, { name: "image" }),
        m[11] || (m[11] = e("span", null, "图片描述", -1)),
        m[12] || (m[12] = e("small", null, "开启画图后可生成图片", -1))
      ])),
      a.message.payload.description ? (t(), n("p", ka, k(a.message.payload.description), 1)) : $("", !0),
      a.message.sender === "user" && d.value ? (t(), n("button", {
        key: 5,
        class: "messages-image-delete",
        disabled: a.disabled,
        onClick: m[5] || (m[5] = (A) => h.$emit("deleteImage", a.message.id))
      }, "删除图片消息", 8, $a)) : $("", !0),
      P.value ? (t(), X(Me, {
        key: 6,
        class: "messages-image-viewer",
        "aria-label": "查看图片",
        onClose: m[7] || (m[7] = (A) => P.value = !1)
      }, {
        default: Ce(() => [e("button", {
          "aria-label": "关闭图片",
          onClick: m[6] || (m[6] = (A) => P.value = !1)
        }, [I(B, { name: "close" })]), M.value ? (t(), n("img", {
          key: 0,
          src: M.value,
          alt: a.message.payload.description || d.value?.name || "图片"
        }, null, 8, wa)) : $("", !0)]),
        _: 1
      })) : $("", !0)
    ], 64)) : (t(), n(E, { key: 2 }, [
      e("button", {
        class: "messages-voice-button",
        disabled: V.value || !a.media.voice && !b.value,
        "aria-label": b.value ? "停止播放" : "播放语音",
        onClick: S
      }, [
        I(B, { name: b.value ? "stop" : "play" }, null, 8, ["name"]),
        e("span", { class: ee(["messages-wave", { playing: c.value === "playing" }]) }, [(t(), n(E, null, ne(16, (A) => e("i", {
          key: A,
          style: he({
            height: `${8 + A * 7 % 17}px`,
            animationDelay: `${A * 45}ms`
          })
        }, null, 4)), 64))], 2),
        e("small", null, k(V.value ? "停止中" : [
          "loading",
          "generating",
          "queued"
        ].includes(c.value) ? "准备中" : "语音"), 1)
      ], 8, ha),
      a.media.voice ? $("", !0) : (t(), n("small", Ia, "开启 TTS 后可播放")),
      a.media.voice ? (t(), n("button", {
        key: 1,
        class: "messages-transcript-toggle",
        onClick: m[8] || (m[8] = (A) => i.value = !i.value)
      }, k(i.value ? "收起原文" : "查看原文"), 1)) : $("", !0),
      i.value || !a.media.voice ? (t(), n("p", Ca, k(a.message.payload.transcript), 1)) : $("", !0)
    ], 64)), o.value ? (t(), n("small", Ma, k(o.value), 1)) : $("", !0)], 2)], 2));
  }
}), Aa = Sa, Ba = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif"
], js = 4 * 1024 * 1024;
async function Da(a) {
  if (!Ba.includes(a.type)) throw new Error("请选择 PNG、JPG、WEBP 或 GIF 图片。");
  if (!a.size || a.size > 4194304) throw new Error("请选择不超过 4MB 的图片。");
  const p = await new Promise((r, o) => {
    const c = new FileReader();
    c.onerror = () => o(/* @__PURE__ */ new Error("图片读取失败，请重新选择。")), c.onload = () => typeof c.result == "string" ? r(c.result) : o(/* @__PURE__ */ new Error("图片读取失败。")), c.readAsDataURL(a);
  }), l = new Image();
  l.src = p;
  try {
    await l.decode();
  } catch {
    throw new Error("这张图片无法打开，请换一张。");
  }
  return {
    dataUrl: p,
    name: a.name.replace(/[\u0000-\u001f\u007f]/gu, "").trim().slice(0, 120) || "图片"
  };
}
var Ea = {
  key: 0,
  class: "messages-attachment-preview"
}, xa = ["src", "alt"], La = ["disabled"], Pa = {
  key: 1,
  class: "messages-composer-hint"
}, qa = {
  key: 2,
  class: "messages-composer-hint",
  role: "status"
}, Ta = {
  key: 3,
  class: "messages-composer-wait",
  role: "status"
}, Ua = { class: "messages-composer-line" }, Va = ["disabled"], Fa = ["placeholder", "disabled"], Ha = ["disabled"], za = /* @__PURE__ */ G({
  __name: "MessageComposer",
  props: /* @__PURE__ */ se({
    disabled: { type: Boolean },
    sending: { type: Boolean },
    waitingFor: {}
  }, {
    draft: { required: !0 },
    draftModifiers: {}
  }),
  emits: /* @__PURE__ */ se(["send"], ["update:draft"]),
  setup(a, { emit: p }) {
    const l = a, r = p, o = we(a, "draft"), c = x({
      get: () => o.value.text,
      set: (v) => {
        o.value = {
          ...o.value,
          text: v
        };
      }
    }), i = w(null), d = w(!1), M = w("");
    let D = !0;
    async function P(v) {
      const y = v.target, S = y.files?.[0];
      if (y.value = "", !(!S || l.sending || d.value)) {
        d.value = !0, M.value = "";
        try {
          const q = await Da(S);
          D && (o.value = {
            ...o.value,
            image: q
          });
        } catch (q) {
          D && (M.value = q instanceof Error ? q.message : "图片读取失败，请重新选择。");
        } finally {
          D && (d.value = !1);
        }
      }
    }
    function b() {
      o.value = {
        ...o.value,
        image: null
      }, M.value = "";
    }
    function V() {
      const v = c.value.trim();
      !v && !o.value.image || l.disabled || d.value || r("send", o.value.image ? {
        type: "image",
        description: v,
        upload: { ...o.value.image }
      } : {
        type: "text",
        text: v
      });
    }
    de(() => {
      D = !1;
    });
    function f(v) {
      v.key === "Enter" && (v.ctrlKey || v.metaKey) && !v.isComposing && (v.preventDefault(), V());
    }
    return (v, y) => (t(), n("form", {
      class: "messages-composer",
      onSubmit: te(V, ["prevent"])
    }, [
      e("input", {
        ref_key: "fileInput",
        ref: i,
        type: "file",
        accept: "image/png,image/jpeg,image/webp,image/gif",
        hidden: "",
        "aria-label": "选择图片文件",
        onChange: P
      }, null, 544),
      o.value.image ? (t(), n("div", Ea, [
        e("img", {
          src: o.value.image.dataUrl,
          alt: o.value.image.name
        }, null, 8, xa),
        e("span", null, [y[2] || (y[2] = e("strong", null, "待发送的图片", -1)), e("small", null, k(o.value.image.name), 1)]),
        e("button", {
          type: "button",
          class: "messages-icon-button",
          "aria-label": "移除图片",
          disabled: a.sending || d.value,
          onClick: b
        }, [I(B, { name: "close" })], 8, La)
      ])) : $("", !0),
      o.value.image ? (t(), n("p", Pa, "图片将随消息发送，需要当前模型支持看图。")) : $("", !0),
      d.value || M.value ? (t(), n("p", qa, k(d.value ? "正在读取图片…" : M.value), 1)) : $("", !0),
      a.waitingFor ? (t(), n("p", Ta, "正在等待 " + k(a.waitingFor) + " 的回复。可以先写好，稍后发送。", 1)) : $("", !0),
      e("div", Ua, [
        e("button", {
          type: "button",
          class: "messages-icon-button messages-attach",
          "aria-label": "选择图片",
          disabled: a.sending || d.value,
          onClick: y[0] || (y[0] = (S) => i.value?.click())
        }, [I(B, { name: "plus" })], 8, Va),
        Z(e("textarea", {
          "onUpdate:modelValue": y[1] || (y[1] = (S) => c.value = S),
          rows: "1",
          maxlength: "4000",
          placeholder: o.value.image ? "给图片配句话…" : "说点什么…",
          "aria-label": "消息内容",
          disabled: a.sending,
          onKeydown: f
        }, null, 40, Fa), [[Q, c.value]]),
        e("button", {
          class: "messages-send",
          type: "submit",
          disabled: a.disabled || d.value || !c.value.trim() && !o.value.image,
          "aria-label": "发送"
        }, [I(B, { name: "send" })], 8, Ha)
      ])
    ], 32));
  }
}), Ra = za, Za = {
  class: "messages-delivery",
  role: "status"
}, Ga = { key: 0 }, ja = ["disabled"], Na = ["disabled"], Oa = /* @__PURE__ */ G({
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
    return (p, l) => (t(), n("div", Za, [a.sending ? (t(), n("span", Ga, "发送中…")) : (t(), n(E, { key: 1 }, [
      e("span", null, k(a.error || (a.pendingSave ? "尚待保存确认" : "尚未收到回复")), 1),
      e("button", {
        disabled: a.disabled,
        onClick: l[0] || (l[0] = (r) => p.$emit("retry"))
      }, k(a.pendingSave ? "检查并重试" : "重试"), 9, ja),
      a.discard && !a.pendingSave ? (t(), n("button", {
        key: 0,
        disabled: a.disabled,
        onClick: l[1] || (l[1] = (r) => p.$emit("discard"))
      }, "删除", 8, Na)) : $("", !0)
    ], 64))]));
  }
}), ke = Oa, Ka = { class: "messages-conversation" }, Ya = { class: "messages-thread-header" }, Ja = ["disabled"], Wa = {
  key: 1,
  class: "messages-thread-start"
}, Xa = {
  key: 0,
  class: "messages-time"
}, Qa = { class: "messages-bubble-row outgoing" }, _a = { key: 0 }, es = ["src", "alt"], as = {
  key: 0,
  class: "messages-image-caption"
}, ss = {
  key: 3,
  class: "messages-typing",
  role: "status"
}, ts = /* @__PURE__ */ G({
  __name: "Conversation",
  props: /* @__PURE__ */ se({
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
  emits: /* @__PURE__ */ se([
    "back",
    "details",
    "send",
    "retry",
    "discard",
    "deleteImage"
  ], ["update:draft"]),
  setup(a, { expose: p }) {
    const l = we(a, "draft"), r = a, o = x(() => r.busy?.contactId === r.contact.id ? r.busy.stage : ""), c = x(() => [
      "replying",
      "summarizing",
      "saving-reply"
    ].includes(o.value));
    function i(f) {
      return [r.sendFailure, r.sendError].find((v) => v?.contactId === r.contact.id && v.messageId === f)?.message;
    }
    const d = w(null);
    let M = !0, D = !1;
    function P() {
      const f = d.value;
      f && (M = f.scrollHeight - f.clientHeight - f.scrollTop < 70);
    }
    async function b() {
      await fe(), M && !D && d.value && (d.value.scrollTop = d.value.scrollHeight);
    }
    Ie(() => [
      r.page.messages.at(-1)?.id,
      r.outgoing?.messageId,
      o.value,
      r.sendFailure,
      r.sendError
    ], b, { immediate: !0 });
    async function V() {
      const f = d.value;
      if (!f || D) return;
      D = !0;
      const v = f.scrollHeight, y = f.scrollTop;
      try {
        await r.loadMore(), await fe(), f.scrollTop = y + f.scrollHeight - v;
      } finally {
        D = !1, P();
      }
    }
    return p({ sent() {
      M = !0, b();
    } }), (f, v) => (t(), n("section", Ka, [
      e("header", Ya, [
        e("button", {
          class: "messages-icon-button",
          "aria-label": "返回信息",
          onClick: v[0] || (v[0] = (y) => f.$emit("back"))
        }, [I(B, { name: "back" })]),
        I(le, {
          identity: a.contact.id,
          name: a.contact.name,
          small: ""
        }, null, 8, ["identity", "name"]),
        e("div", null, [e("h2", null, k(a.contact.name), 1)]),
        e("button", {
          class: "messages-icon-button",
          "aria-label": "联系人详情",
          onClick: v[1] || (v[1] = (y) => f.$emit("details"))
        }, [I(B, { name: "more" })])
      ]),
      e("div", {
        ref_key: "scroller",
        ref: d,
        class: "messages-thread-scroll",
        onScroll: P
      }, [
        v[8] || (v[8] = e("p", { class: "messages-subtle messages-context-hint" }, "对话参考角色设定、世界书、近期剧情及可用总结。", -1)),
        a.page.hasMore ? (t(), n("button", {
          key: 0,
          class: "messages-older",
          disabled: a.loading,
          onClick: V
        }, k(a.loading ? "读取中…" : "查看更早的消息"), 9, Ja)) : $("", !0),
        a.loading && !a.page.messages.length ? (t(), n("p", Wa, "正在读取消息…")) : $("", !0),
        (t(!0), n(E, null, ne(a.page.messages, (y, S) => (t(), n(E, { key: y.id }, [
          S === 0 || y.createdAt - a.page.messages[S - 1].createdAt > 3e5 ? (t(), n("time", Xa, k(new Date(y.createdAt).toLocaleString(void 0, {
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          })), 1)) : $("", !0),
          I(Aa, {
            message: y,
            bridge: a.bridge,
            "chat-identity": a.chatIdentity,
            media: a.media,
            disabled: a.disabled,
            onResize: b,
            onDeleteImage: v[2] || (v[2] = (q) => f.$emit("deleteImage", q))
          }, null, 8, [
            "message",
            "bridge",
            "chat-identity",
            "media",
            "disabled"
          ]),
          y.id === a.page.retryMessageId && !c.value ? (t(), X(ke, {
            key: 1,
            sending: a.busy?.messageId === y.id && ["saving", "uploading"].includes(o.value),
            error: i(y.id),
            "pending-save": a.pendingSave,
            disabled: a.retryDisabled,
            onRetry: (q) => f.$emit("retry", y.id)
          }, null, 8, [
            "sending",
            "error",
            "pending-save",
            "disabled",
            "onRetry"
          ])) : $("", !0)
        ], 64))), 128)),
        a.outgoing ? (t(), n(E, { key: 2 }, [e("div", Qa, [e("div", { class: ee(["messages-bubble", { "messages-bubble-image": a.outgoing.payload.type === "image" }]) }, [a.outgoing.payload.type === "text" ? (t(), n("p", _a, k(a.outgoing.payload.text), 1)) : (t(), n(E, { key: 1 }, [e("img", {
          class: "messages-pending-image",
          src: a.outgoing.payload.upload.dataUrl,
          alt: a.outgoing.payload.upload.name,
          onLoad: b
        }, null, 40, es), a.outgoing.payload.description ? (t(), n("p", as, k(a.outgoing.payload.description), 1)) : $("", !0)], 64))], 2)]), I(ke, {
          sending: a.working || a.busy?.messageId === a.outgoing.messageId,
          error: i(a.outgoing.messageId) || "发送未完成",
          "pending-save": a.pendingSave,
          disabled: a.retryDisabled,
          discard: "",
          onRetry: v[3] || (v[3] = (y) => f.$emit("retry", a.outgoing.messageId)),
          onDiscard: v[4] || (v[4] = (y) => f.$emit("discard", a.outgoing.messageId))
        }, null, 8, [
          "sending",
          "error",
          "pending-save",
          "disabled"
        ])], 64)) : $("", !0),
        c.value ? (t(), n("div", ss, [...v[7] || (v[7] = [e("span", null, [
          e("i"),
          e("i"),
          e("i")
        ], -1), Y("对方正在输入…", -1)])])) : $("", !0)
      ], 544),
      I(Ra, {
        draft: l.value,
        "onUpdate:draft": v[5] || (v[5] = (y) => l.value = y),
        disabled: a.sendDisabled,
        sending: !1,
        "waiting-for": a.waitingFor,
        onSend: v[6] || (v[6] = (y) => f.$emit("send", y))
      }, null, 8, [
        "draft",
        "disabled",
        "waiting-for"
      ])
    ]));
  }
}), ls = ts, ns = () => ({
  text: "",
  image: null
});
function oe() {
  return Array.from(globalThis.crypto.getRandomValues(new Uint8Array(16)), (a) => a.toString(16).padStart(2, "0")).join("");
}
var is = { class: "messages-app" }, us = {
  key: 0,
  class: "messages-banner",
  role: "status"
}, os = { class: "messages-save-actions" }, ds = ["disabled"], rs = ["disabled"], vs = {
  key: 1,
  class: "messages-banner",
  role: "status"
}, gs = ["disabled"], ms = {
  key: 2,
  class: "messages-notice"
}, cs = {
  key: 3,
  class: "messages-error",
  role: "alert"
}, ys = {
  key: 4,
  class: "messages-banner",
  role: "alert"
}, bs = ["disabled"], fs = { id: "messages-dialog-title" }, ps = ["disabled"], ks = {
  key: 0,
  class: "messages-error",
  role: "alert"
}, $s = { class: "messages-search" }, ws = ["aria-busy"], hs = {
  key: 0,
  class: "messages-subtle",
  role: "status"
}, Is = { key: 1 }, Cs = ["disabled"], Ms = ["disabled", "onClick"], Ss = { key: 0 }, As = {
  key: 0,
  class: "messages-subtle"
}, Bs = { class: "messages-manual" }, Ds = ["disabled"], Es = ["disabled"], xs = ["disabled"], Ls = ["disabled"], Ps = ["disabled"], qs = ["disabled"], Ts = { class: "messages-manual" }, Us = ["disabled"], Vs = ["disabled"], Fs = ["disabled"], Hs = ["disabled"], zs = /* @__PURE__ */ G({
  __name: "MessagesApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(a) {
    const p = a, l = w(p.initialState), r = w(""), o = w({
      contactId: "",
      messages: [],
      hasMore: !1,
      retryMessageId: null
    }), c = w(!1), i = w(!1), d = w(""), M = w(""), D = w(null), P = w(!1), b = w("add"), V = w(""), f = w(""), v = w(""), y = w(""), S = w("ready"), q = w(oe());
    let h = !0, m = 0;
    const A = $e(/* @__PURE__ */ new Map()), re = x({
      get: () => A.get(r.value) ?? ns(),
      set: (u) => {
        A.set(r.value, u);
      }
    }), z = w(null), j = w(null), O = x(() => l.value.outgoing ?? z.value), Se = x(() => O.value?.contactId === r.value && !o.value.messages.some((u) => u.id === O.value?.messageId) ? O.value : null), H = x(() => l.value.contacts.find((u) => u.id === r.value)), Ae = x(() => l.value.busy && l.value.busy.contactId !== r.value ? l.value.contacts.find((u) => u.id === l.value.busy?.contactId)?.name ?? "另一位联系人" : ""), K = x(() => l.value.pendingSave || [
      "unconfirmed",
      "conflict",
      "failed"
    ].includes(l.value.fileState)), T = x(() => i.value || !!l.value.busy || l.value.pendingSave || l.value.fileState !== "ready" || l.value.generationActive), ve = x(() => l.value.knownPeople.filter((u) => !l.value.contacts.some((s) => s.name === u.name) && `${u.name} ${u.aliases.join(" ")}`.toLocaleLowerCase().includes(y.value.toLocaleLowerCase())));
    async function L(u, s = {}) {
      return (await p.bridge.request(u, {
        chatIdentity: l.value.chatIdentity,
        ...s
      }, 6e4)).result;
    }
    async function _(u = !1, s = !1) {
      const g = r.value;
      if (!g) return;
      const C = ++m;
      c.value = !0, M.value = "";
      try {
        const W = await L("messages/thread", {
          contactId: g,
          ...u ? { before: o.value.messages[0]?.seq } : {}
        });
        if (!h || C !== m || r.value !== g) return;
        const be = W.messages.some((N) => o.value.messages.some((ue) => ue.id === N.id)), Ze = !s && (u || be) ? o.value.messages : [], ie = [...new Map([...Ze, ...W.messages].map((N) => [N.id, N])).values()].sort((N, ue) => N.seq - ue.seq);
        o.value = {
          ...W,
          messages: ie,
          hasMore: s || u || !be || ie.length <= 50 ? W.hasMore : o.value.hasMore
        }, z.value?.contactId === g && ie.some((N) => N.id === z.value?.messageId) && (z.value = null, j.value = null);
      } catch {
        h && C === m && r.value === g && (M.value = "消息暂时无法读取。");
      } finally {
        C === m && (c.value = !1);
      }
    }
    function U(u) {
      if (!h || u.chatIdentity !== l.value.chatIdentity) return;
      const s = H.value?.lastSeq, g = K.value;
      l.value = u;
      for (const C of A.keys()) u.contacts.some((W) => W.id === C) || A.delete(C);
      z.value && !u.contacts.some((C) => C.id === z.value?.contactId) && (z.value = null, j.value = null), r.value && !u.contacts.some((C) => C.id === r.value) ? ae() : r.value && (s !== H.value?.lastSeq || g && !K.value) && _(!1, g && !K.value);
    }
    const Be = p.bridge.subscribe((u) => {
      u.type === "messages/state" && U(u.payload.state);
    });
    function ge(u) {
      r.value = u, d.value = "", o.value = {
        contactId: u,
        messages: [],
        hasMore: !1,
        retryMessageId: null
      }, _();
    }
    function ae() {
      r.value = "", m++, M.value = "", o.value = {
        contactId: "",
        messages: [],
        hasMore: !1,
        retryMessageId: null
      };
    }
    Ne(() => (ae(), !0), () => !!r.value);
    async function R(u) {
      if (!i.value) {
        i.value = !0, d.value = "";
        try {
          await u();
        } catch (s) {
          h && (d.value = s instanceof Error && s.message !== "host_request_timeout" ? s.message : "等待操作结果超时，请核实保存状态后重试。");
        } finally {
          i.value = !1;
        }
      }
    }
    function De(u) {
      if (T.value || O.value) return;
      const s = {
        contactId: r.value,
        messageId: `input:${oe()}`,
        payload: u,
        createdAt: Date.now()
      };
      z.value = s, j.value = null, A.delete(s.contactId), D.value?.sent(), me(s.contactId, s.messageId, s);
    }
    async function me(u, s, g) {
      if (!i.value) {
        i.value = !0, j.value = null, d.value = "";
        try {
          if (K.value && (U(await L(l.value.pendingSave ? "messages/confirm" : "messages/refresh")), K.value))
            return;
          const C = g?.payload.type === "image" ? {
            type: "image",
            description: g.payload.description,
            upload: { ...g.payload.upload }
          } : g ? {
            type: "text",
            text: g.payload.text
          } : void 0;
          U(g ? await L("messages/send", {
            contactId: u,
            actionId: s.slice(6),
            payload: C
          }) : await L("messages/retry", {
            contactId: u,
            messageId: s
          }));
        } catch (C) {
          h && (j.value = {
            contactId: u,
            messageId: s,
            message: C instanceof Error && C.message !== "host_request_timeout" ? C.message : "尚未确认发送结果，可以重试。"
          });
        } finally {
          i.value = !1;
        }
      }
    }
    function Ee(u) {
      const s = O.value?.messageId === u ? O.value : void 0;
      me(r.value, u, s);
    }
    function xe(u) {
      R(async () => {
        U(await L("messages/discard-send", { messageId: u })), z.value?.messageId === u && (z.value = null), j.value = null, await _();
      });
    }
    function Le(u) {
      R(async () => U(await L(u)));
    }
    function Pe(u) {
      R(async () => {
        U(await L("messages/settings", { settings: u })), F();
      });
    }
    function qe() {
      R(async () => {
        U(await L("messages/sync")), F();
      });
    }
    function J(u) {
      b.value = u, d.value = "", f.value = "", v.value = H.value?.note ?? "", y.value = "", q.value = oe(), P.value = !0, u === "add" && ce();
    }
    async function ce() {
      const u = q.value, s = () => h && P.value && b.value === "add" && q.value === u;
      S.value = "loading";
      try {
        const g = await L("messages/refresh");
        if (!s()) return;
        U(g), S.value = "ready";
      } catch {
        s() && (S.value = "failed");
      }
    }
    function F() {
      P.value = !1;
    }
    function Te() {
      i.value || (b.value === "delete" ? b.value = "detail" : b.value === "recover" ? b.value = "sync" : F());
    }
    function ye(u = f.value) {
      !u.trim() || T.value || S.value === "loading" || R(async () => {
        const s = await L("messages/contact/add", {
          actionId: q.value,
          name: u.trim(),
          note: v.value.trim()
        });
        U(s.state), F(), ge(s.contactId);
      });
    }
    function Ue() {
      R(async () => {
        U(await L("messages/contact/note", {
          contactId: r.value,
          note: v.value
        })), F();
      });
    }
    function Ve() {
      R(async () => {
        U(await L("messages/contact/delete", { contactId: r.value })), F(), ae();
      });
    }
    function Fe(u) {
      V.value = u, J("delete-image");
    }
    function He() {
      const u = r.value, s = V.value;
      R(async () => {
        const g = await L("messages/message/delete-image", {
          contactId: u,
          messageId: s
        });
        U(g.state), h && r.value === u && (m++, c.value = !1, o.value = {
          ...o.value,
          messages: o.value.messages.filter((C) => C.id !== s).map((C) => C.replyTo === s ? {
            ...C,
            replyTo: null
          } : C),
          retryMessageId: g.retryMessageId
        }), F();
      });
    }
    function ze() {
      R(async () => {
        U(await L("messages/recover")), F();
      });
    }
    function Re() {
      R(async () => {
        U(await L("messages/adopt-server-state")), l.value.fileState === "ready" && !l.value.pendingSave ? (z.value = null, j.value = null, F()) : d.value = "暂时未能采用服务器版本，请检查网络后重试。当前记录保持不变。";
      });
    }
    return de(() => {
      h = !1, m++, Be();
    }), (u, s) => (t(), n("main", is, [
      K.value ? (t(), n("div", us, [e("span", null, k(l.value.fileState === "conflict" ? "服务器上的存档已有变化，请选择如何处理。" : "有消息还在等待保存确认，已保存的记录不会丢失。"), 1), e("div", os, [e("button", {
        disabled: i.value || !!l.value.busy,
        onClick: s[0] || (s[0] = (g) => Le(l.value.pendingSave ? "messages/confirm" : "messages/refresh"))
      }, "检查保存", 8, ds), l.value.fileState === "conflict" ? (t(), n("button", {
        key: 0,
        disabled: i.value || !!l.value.busy || l.value.generationActive,
        onClick: s[1] || (s[1] = (g) => J("adopt"))
      }, "采用服务器版本", 8, rs)) : $("", !0)])])) : l.value.unsynced && !l.value.busy ? (t(), n("div", vs, [e("span", null, k(l.value.unsynced) + " 条消息已保留，尚未写入主聊天。", 1), e("button", {
        disabled: T.value,
        onClick: s[2] || (s[2] = (g) => J("sync"))
      }, "查看", 8, gs)])) : $("", !0),
      l.value.generationActive ? (t(), n("div", ms, "故事正在继续，稍后就能发送消息。")) : $("", !0),
      d.value || l.value.error ? (t(), n("p", cs, k(d.value || l.value.error), 1)) : $("", !0),
      M.value ? (t(), n("div", ys, [e("span", null, k(M.value), 1), e("button", {
        disabled: c.value,
        onClick: s[3] || (s[3] = (g) => _())
      }, "重试读取", 8, bs)])) : $("", !0),
      H.value ? (t(), X(ls, {
        key: H.value.id,
        ref_key: "conversation",
        ref: D,
        draft: re.value,
        "onUpdate:draft": s[4] || (s[4] = (g) => re.value = g),
        contact: H.value,
        page: o.value,
        bridge: a.bridge,
        "chat-identity": l.value.chatIdentity,
        disabled: T.value,
        "send-disabled": T.value || !!O.value,
        busy: l.value.busy,
        outgoing: Se.value,
        "send-failure": l.value.sendFailure,
        "send-error": j.value,
        working: i.value,
        "pending-save": K.value,
        "retry-disabled": i.value || !!l.value.busy || l.value.generationActive || l.value.fileState === "conflict",
        loading: c.value,
        "load-more": () => _(!0),
        media: l.value.media,
        "waiting-for": Ae.value,
        onBack: ae,
        onDetails: s[5] || (s[5] = (g) => J("detail")),
        onSend: De,
        onRetry: Ee,
        onDiscard: xe,
        onDeleteImage: Fe
      }, null, 8, [
        "draft",
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
      ])) : $("", !0),
      Z(I(ra, {
        contacts: l.value.contacts,
        "busy-contact-id": l.value.busy?.contactId ?? "",
        drafts: A,
        onSelect: ge,
        onAdd: s[6] || (s[6] = (g) => J("add")),
        onSettings: s[7] || (s[7] = (g) => J("settings"))
      }, null, 8, [
        "contacts",
        "busy-contact-id",
        "drafts"
      ]), [[je, !H.value]]),
      P.value ? (t(), X(Me, {
        key: 6,
        class: "messages-dialog",
        "aria-labelledby": "messages-dialog-title",
        busy: i.value,
        onClose: Te
      }, {
        default: Ce(() => [
          e("header", null, [
            b.value === "detail" && H.value ? (t(), X(le, {
              key: 0,
              identity: H.value.id,
              name: H.value.name,
              small: ""
            }, null, 8, ["identity", "name"])) : $("", !0),
            e("h2", fs, k(b.value === "settings" ? "信息设置" : b.value === "add" ? "新的对话" : b.value === "detail" ? H.value?.name : b.value === "delete" ? "删除联系人？" : b.value === "delete-image" ? "删除这条图片消息？" : b.value === "sync" ? "消息还未写入主聊天" : b.value === "adopt" ? "采用服务器版本？" : "在当前位置补记？"), 1),
            e("button", {
              class: "messages-icon-button",
              "aria-label": "关闭",
              disabled: i.value,
              onClick: F
            }, [I(B, { name: "close" })], 8, ps)
          ]),
          d.value ? (t(), n("p", ks, k(d.value), 1)) : $("", !0),
          b.value === "settings" ? (t(), X(ca, {
            key: 1,
            settings: l.value.settings,
            busy: i.value || !!l.value.busy,
            onSave: Pe
          }, null, 8, ["settings", "busy"])) : b.value === "add" ? (t(), n(E, { key: 2 }, [
            e("label", $s, [I(B, { name: "search" }), Z(e("input", {
              "onUpdate:modelValue": s[8] || (s[8] = (g) => y.value = g),
              placeholder: "查找已知人物",
              "aria-label": "查找已知人物",
              "aria-describedby": "messages-people-source"
            }, null, 512), [[Q, y.value]])]),
            s[20] || (s[20] = e("div", {
              id: "messages-people-source",
              class: "messages-subtle messages-people-source"
            }, "候选来自当前聊天的总结人物资料，需开启总结；未列出的人可手动添加。", -1)),
            e("div", {
              class: "messages-known-list",
              "aria-busy": S.value === "loading"
            }, [S.value === "loading" ? (t(), n("p", hs, "正在读取已知人物…")) : S.value === "failed" ? (t(), n("div", Is, [s[16] || (s[16] = e("p", {
              class: "messages-subtle",
              role: "alert"
            }, "已知人物暂时无法读取，可以重试或手动添加。", -1)), e("button", {
              class: "messages-secondary",
              disabled: i.value,
              onClick: ce
            }, "重新读取", 8, Cs)])) : (t(), n(E, { key: 2 }, [(t(!0), n(E, null, ne(ve.value, (g) => (t(), n("button", {
              key: g.name,
              disabled: T.value,
              onClick: (C) => ye(g.name)
            }, [
              I(le, {
                identity: g.name,
                name: g.name,
                small: ""
              }, null, 8, ["identity", "name"]),
              e("span", null, [Y(k(g.name), 1), g.aliases.length ? (t(), n("small", Ss, k(g.aliases.join("、")), 1)) : $("", !0)]),
              I(B, { name: "plus" })
            ], 8, Ms))), 128)), ve.value.length ? $("", !0) : (t(), n("p", As, k(y.value ? "没有匹配的人物，可以在下面手动添加。" : "暂无可添加的已知人物，可以在下面手动添加。"), 1))], 64))], 8, ws),
            e("details", Bs, [s[19] || (s[19] = e("summary", null, "想联系的人不在这里？", -1)), e("form", { onSubmit: s[11] || (s[11] = te((g) => ye(), ["prevent"])) }, [
              e("label", null, [s[17] || (s[17] = Y("姓名", -1)), Z(e("input", {
                "onUpdate:modelValue": s[9] || (s[9] = (g) => f.value = g),
                maxlength: "120",
                required: "",
                placeholder: "对方的姓名"
              }, null, 512), [[Q, f.value]])]),
              e("label", null, [s[18] || (s[18] = Y("身份说明（可选）", -1)), Z(e("textarea", {
                "onUpdate:modelValue": s[10] || (s[10] = (g) => v.value = g),
                maxlength: "600",
                rows: "2",
                placeholder: "例如：住在隔壁的花店老板"
              }, null, 512), [[Q, v.value]])]),
              e("button", {
                class: "messages-primary",
                disabled: T.value || S.value === "loading" || !f.value.trim()
              }, "添加并聊天", 8, Ds)
            ], 32)])
          ], 64)) : b.value === "detail" ? (t(), n("form", {
            key: 3,
            onSubmit: te(Ue, ["prevent"])
          }, [
            e("label", null, [s[21] || (s[21] = Y("身份说明 / 备注", -1)), Z(e("textarea", {
              "onUpdate:modelValue": s[12] || (s[12] = (g) => v.value = g),
              maxlength: "600",
              rows: "3",
              placeholder: "帮助辨认这位联系人"
            }, null, 512), [[Q, v.value]])]),
            e("button", {
              class: "messages-primary",
              disabled: T.value
            }, "保存备注", 8, Es),
            e("button", {
              type: "button",
              class: "messages-danger",
              disabled: T.value,
              onClick: s[13] || (s[13] = (g) => b.value = "delete")
            }, "删除联系人与通讯记录", 8, xs)
          ], 32)) : b.value === "delete" ? (t(), n(E, { key: 4 }, [
            e("p", null, "会删除信息 APP 内与 " + k(H.value?.name) + " 的全部通讯和摘要，不能恢复。主聊天中的「私人信息」楼层不会删除，其他联系人不受影响。", 1),
            e("button", {
              class: "messages-danger",
              disabled: T.value,
              onClick: Ve
            }, "确认删除", 8, Ls),
            e("button", {
              class: "messages-secondary",
              onClick: s[14] || (s[14] = (g) => b.value = "detail")
            }, "保留联系人")
          ], 64)) : b.value === "delete-image" ? (t(), n(E, { key: 5 }, [
            s[22] || (s[22] = e("p", null, "这条图片及配文将从信息 APP 中删除，不再发送给模型，不能恢复。其他消息保留。", -1)),
            s[23] || (s[23] = e("p", { class: "messages-subtle" }, "主聊天里的记录和图库原图不会删除。", -1)),
            e("button", {
              class: "messages-danger",
              disabled: T.value,
              onClick: He
            }, "确认删除", 8, Ps),
            e("button", {
              class: "messages-secondary",
              onClick: F
            }, "取消")
          ], 64)) : b.value === "sync" ? (t(), n(E, { key: 6 }, [
            s[26] || (s[26] = e("p", null, "信息 APP 已保留这些消息。重试只会补上主聊天里的记录，不会再次向对方发送，也不会重新生成回复。", -1)),
            e("button", {
              class: "messages-primary",
              disabled: T.value,
              onClick: qe
            }, "重试写入", 8, qs),
            e("details", Ts, [
              s[24] || (s[24] = e("summary", null, "原来的记录已被修改或删除？", -1)),
              s[25] || (s[25] = e("p", null, "不会覆盖你的修改。需要这些消息继续进入剧情时，可以在当前位置另加一条补记。", -1)),
              e("button", {
                class: "messages-secondary",
                disabled: T.value,
                onClick: s[15] || (s[15] = (g) => b.value = "recover")
              }, "查看补记方式", 8, Us)
            ])
          ], 64)) : b.value === "adopt" ? (t(), n(E, { key: 7 }, [
            s[27] || (s[27] = e("p", null, "将读取服务器上的当前聊天小白 OS 存档，放弃本地尚未确认的修改。信息 APP 会显示服务器已保存的联系人和消息。", -1)),
            s[28] || (s[28] = e("p", { class: "messages-subtle" }, "这项选择作用于当前聊天的整份 OS 存档，不会删除主聊天里的记录，也不会重新生成回复。", -1)),
            e("button", {
              class: "messages-danger",
              disabled: i.value || !!l.value.busy || l.value.generationActive,
              onClick: Re
            }, "确认采用服务器版本", 8, Vs),
            e("button", {
              class: "messages-secondary",
              disabled: i.value,
              onClick: F
            }, "暂不处理", 8, Fs)
          ], 64)) : (t(), n(E, { key: 8 }, [
            s[29] || (s[29] = e("p", null, "先检查已有记录；仍未写入的消息会在主聊天当前位置标为「补录」，保留原发送时间。不会覆盖旧记录或恢复你删除的那一条。", -1)),
            e("button", {
              class: "messages-primary",
              disabled: T.value,
              onClick: ze
            }, "确认补记", 8, Hs),
            e("button", {
              class: "messages-secondary",
              onClick: F
            }, "暂不补记")
          ], 64))
        ]),
        _: 1
      }, 8, ["busy"])) : $("", !0)
    ]));
  }
}), Ns = zs;
export {
  Ns as default
};
