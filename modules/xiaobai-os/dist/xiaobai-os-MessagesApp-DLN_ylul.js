/* eslint-disable */
import { A as de, B as ve, C as me, F as $, M as N, P as Se, S as xe, T as W, V as f, _ as j, c as V, d as te, f as h, g as w, h as A, i as R, k as ge, l as B, o as ce, p as l, s as E, u as e, v as O, w as t, y as le, z as J } from "./xiaobai-os-runtime-dom.esm-bundler-DmE9neiz.js";
var Ae = {
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
    const k = {
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
    return (n, d) => (t(), l("svg", Ae, [e("path", { d: k[a.name] }, null, 8, qe)]));
  }
}), C = Le, Te = /* @__PURE__ */ j({
  __name: "ContactAvatar",
  props: {
    identity: {},
    name: {},
    small: { type: Boolean }
  },
  setup(a) {
    const k = a, n = B(() => {
      let d = 0;
      for (const g of k.identity) d = Math.imul(d, 31) + g.codePointAt(0) | 0;
      return String((d >>> 0) % 360);
    });
    return (d, g) => (t(), l("span", {
      class: J(["messages-avatar", { small: a.small }]),
      style: ve({ "--avatar-hue": n.value }),
      "aria-hidden": "true"
    }, f(Array.from(a.name)[0]), 7));
  }
}), Q = Te, Be = { class: "messages-contacts" }, Ve = { class: "messages-home-header" }, De = { class: "messages-search" }, Ue = {
  key: 0,
  class: "messages-empty"
}, Fe = {
  key: 1,
  class: "messages-contact-rows"
}, ze = {
  key: 0,
  class: "messages-subtle"
}, He = ["onClick"], Pe = { class: "messages-contact-copy" }, Ke = { class: "messages-contact-heading" }, Ze = {
  key: 0,
  class: "messages-preview messages-preview-active"
}, je = {
  key: 1,
  class: "messages-preview"
}, Ne = {
  key: 2,
  class: "messages-preview"
}, Re = {
  key: 2,
  class: "messages-list-footer"
}, Ee = /* @__PURE__ */ j({
  __name: "ContactList",
  props: {
    contacts: {},
    busyContactId: {},
    drafts: {}
  },
  emits: ["select", "add"],
  setup(a) {
    const k = a, n = $(""), d = B(() => k.contacts.filter((v) => `${v.name} ${v.note}`.toLocaleLowerCase().includes(n.value.toLocaleLowerCase())));
    function g(v) {
      if (v === null) return "";
      const i = new Date(v);
      return i.toDateString() === (/* @__PURE__ */ new Date()).toDateString() ? i.toLocaleTimeString(void 0, {
        hour: "2-digit",
        minute: "2-digit"
      }) : i.toLocaleDateString(void 0, {
        month: "numeric",
        day: "numeric"
      });
    }
    return (v, i) => (t(), l("section", Be, [
      e("header", Ve, [e("div", null, [i[4] || (i[4] = e("span", { class: "messages-eyebrow" }, "你们的对话，留在这里", -1)), e("h1", null, [i[3] || (i[3] = A("信息", -1)), e("span", null, f(a.contacts.length || ""), 1)])]), e("button", {
        class: "messages-icon-button",
        "aria-label": "添加联系人",
        onClick: i[0] || (i[0] = (c) => v.$emit("add"))
      }, [w(C, { name: "plus" })])]),
      e("label", De, [w(C, { name: "search" }), N(e("input", {
        "onUpdate:modelValue": i[1] || (i[1] = (c) => n.value = c),
        type: "search",
        placeholder: "搜索联系人",
        "aria-label": "搜索联系人"
      }, null, 512), [[R, n.value]])]),
      a.contacts.length ? (t(), l("div", Fe, [d.value.length ? h("", !0) : (t(), l("p", ze, "没有找到这个人。")), (t(!0), l(V, null, W(d.value, (c) => (t(), l("button", {
        key: c.id,
        class: "messages-contact-row",
        onClick: (I) => v.$emit("select", c.id)
      }, [w(Q, {
        identity: c.id,
        name: c.name
      }, null, 8, ["identity", "name"]), e("span", Pe, [e("span", Ke, [e("strong", null, f(c.name), 1), e("time", null, f(g(c.lastAt)), 1)]), a.busyContactId === c.id ? (t(), l("span", Ze, "正在等待回复…")) : a.drafts.get(c.id)?.text.trim() ? (t(), l("span", je, [i[9] || (i[9] = e("em", null, "草稿", -1)), A(" " + f(a.drafts.get(c.id)?.text), 1)])) : (t(), l("span", Ne, f(c.preview), 1))])], 8, He))), 128))])) : (t(), l("div", Ue, [
        i[6] || (i[6] = e("div", { class: "messages-empty-art" }, [
          e("span"),
          e("span"),
          e("i")
        ], -1)),
        i[7] || (i[7] = e("h2", null, "有些话，想单独说", -1)),
        i[8] || (i[8] = e("p", null, [
          A("从已知人物中选一个，"),
          e("br"),
          A("开始你们的第一段对话。")
        ], -1)),
        e("button", {
          class: "messages-primary",
          onClick: i[2] || (i[2] = (c) => v.$emit("add"))
        }, [i[5] || (i[5] = A("选择联系人", -1)), w(C, { name: "plus" })])
      ])),
      a.contacts.length ? (t(), l("footer", Re, f(a.contacts.length) + " 位联系人 · 只属于你们的对话", 1)) : h("", !0)
    ]));
  }
}), Ge = Ee, Je = { key: 0 }, Oe = ["src", "alt"], Qe = ["disabled"], We = {
  key: 2,
  class: "messages-image-placeholder messages-media-unavailable"
}, Xe = { class: "messages-image-caption" }, Ye = { "aria-label": "关闭图片" }, _e = ["src", "alt"], ea = ["disabled", "aria-label"], aa = {
  key: 0,
  class: "messages-media-unavailable-note"
}, sa = {
  key: 2,
  class: "messages-transcript"
}, ta = {
  key: 3,
  class: "messages-media-error",
  role: "status"
}, la = /* @__PURE__ */ j({
  __name: "MessageBubble",
  props: {
    message: {},
    bridge: {},
    chatIdentity: {},
    media: {}
  },
  emits: ["resize"],
  setup(a) {
    const k = a, n = $(""), d = $(!1), g = $(""), v = $(""), i = $(!1), c = $(null), I = B(() => [
      "playing",
      "loading",
      "generating",
      "queued"
    ].includes(v.value)), S = $(!1);
    let p = !0;
    const r = (M) => k.bridge.request(M, {
      chatIdentity: k.chatIdentity,
      messageId: k.message.id
    }, 18e4);
    async function o(M) {
      if (!d.value) {
        d.value = !0, g.value = "";
        try {
          const { result: y } = await r(M ? "messages/image/generate" : "messages/image/check");
          p && (n.value = y.data ?? "", M && !n.value && (g.value = "请开启画图后再试，画面描述已保留。"));
        } catch {
          p && M && (g.value = "图片生成失败，可以再试一次。");
        } finally {
          p && (d.value = !1);
        }
      }
    }
    async function b() {
      if (S.value) return;
      g.value = "";
      const M = I.value;
      if (!(!M && !k.media.voice))
        try {
          M ? (S.value = !0, await r("messages/voice/stop"), p && (v.value = "")) : (v.value = "loading", await r("messages/voice/play"));
        } catch {
          p && (M || (v.value = ""), g.value = M ? "未能确认停止，请再点一次停止。" : "语音暂时无法播放，原文仍可查看。");
        } finally {
          p && (S.value = !1);
        }
    }
    const F = k.bridge.subscribe((M) => {
      if (M.type !== "messages/voice-state") return;
      const y = M.payload;
      y.messageId === k.message.id ? v.value = y.status : y.status === "playing" && (v.value = ""), y.messageId === k.message.id && y.status === "error" && (g.value = "播放失败，点击可以重试。");
    });
    return xe(() => {
      k.message.payload.type === "image" && o(!1);
    }), de(() => k.media.image, (M) => {
      M && k.message.payload.type === "image" && !n.value && o(!1);
    }), me(() => {
      p = !1, F();
    }), (M, y) => (t(), l("article", { class: J(["messages-bubble-row", { outgoing: a.message.sender === "user" }]) }, [e("div", { class: J(["messages-bubble", `messages-bubble-${a.message.payload.type}`]) }, [a.message.payload.type === "text" ? (t(), l("p", Je, f(a.message.payload.text), 1)) : a.message.payload.type === "image" ? (t(), l(V, { key: 1 }, [
      n.value ? (t(), l("button", {
        key: 0,
        class: "messages-image-open",
        "aria-label": "放大图片",
        onClick: y[1] || (y[1] = (x) => c.value?.showModal())
      }, [e("img", {
        src: n.value,
        alt: a.message.payload.description,
        onLoad: y[0] || (y[0] = (x) => M.$emit("resize"))
      }, null, 40, Oe)])) : a.media.image ? (t(), l("button", {
        key: 1,
        class: "messages-image-placeholder",
        disabled: d.value,
        onClick: y[2] || (y[2] = (x) => o(!0))
      }, [w(C, { name: "image" }), e("span", null, f(d.value ? "正在生成图片…" : g.value ? "重新生成图片" : "生成图片"), 1)], 8, Qe)) : (t(), l("div", We, [
        w(C, { name: "image" }),
        y[6] || (y[6] = e("span", null, "图片描述", -1)),
        y[7] || (y[7] = e("small", null, "开启画图后可生成图片", -1))
      ])),
      e("p", Xe, f(a.message.payload.description), 1),
      e("dialog", {
        ref_key: "viewer",
        ref: c,
        class: "messages-image-viewer",
        onClick: y[3] || (y[3] = (x) => c.value?.close()),
        onKeydown: y[4] || (y[4] = ce(E(() => {
        }, ["stop"]), ["esc"]))
      }, [e("button", Ye, [w(C, { name: "close" })]), e("img", {
        src: n.value,
        alt: a.message.payload.description
      }, null, 8, _e)], 544)
    ], 64)) : (t(), l(V, { key: 2 }, [
      e("button", {
        class: "messages-voice-button",
        disabled: S.value || !a.media.voice && !I.value,
        "aria-label": I.value ? "停止播放" : "播放语音",
        onClick: b
      }, [
        w(C, { name: I.value ? "stop" : "play" }, null, 8, ["name"]),
        e("span", { class: J(["messages-wave", { playing: v.value === "playing" }]) }, [(t(), l(V, null, W(16, (x) => e("i", {
          key: x,
          style: ve({
            height: `${8 + x * 7 % 17}px`,
            animationDelay: `${x * 45}ms`
          })
        }, null, 4)), 64))], 2),
        e("small", null, f(S.value ? "停止中" : [
          "loading",
          "generating",
          "queued"
        ].includes(v.value) ? "准备中" : "语音"), 1)
      ], 8, ea),
      a.media.voice ? h("", !0) : (t(), l("small", aa, "开启 TTS 后可播放")),
      a.media.voice ? (t(), l("button", {
        key: 1,
        class: "messages-transcript-toggle",
        onClick: y[5] || (y[5] = (x) => i.value = !i.value)
      }, f(i.value ? "收起原文" : "查看原文"), 1)) : h("", !0),
      i.value || !a.media.voice ? (t(), l("p", sa, f(a.message.payload.transcript), 1)) : h("", !0)
    ], 64)), g.value ? (t(), l("small", ta, f(g.value), 1)) : h("", !0)], 2)], 2));
  }
}), na = la, ia = {
  key: 0,
  class: "messages-composer-types",
  "aria-label": "消息类型"
}, oa = ["aria-pressed"], ua = ["aria-pressed"], ra = ["aria-pressed"], da = {
  key: 1,
  class: "messages-composer-wait",
  role: "status"
}, va = {
  key: 2,
  class: "messages-composer-hint"
}, ma = { class: "messages-composer-line" }, ga = ["aria-expanded"], ca = [
  "placeholder",
  "aria-label",
  "disabled"
], ya = ["disabled"], fa = /* @__PURE__ */ j({
  __name: "MessageComposer",
  props: /* @__PURE__ */ O({
    disabled: { type: Boolean },
    sending: { type: Boolean },
    media: {},
    waitingFor: {}
  }, {
    draft: { required: !0 },
    draftModifiers: {}
  }),
  emits: /* @__PURE__ */ O(["send"], ["update:draft"]),
  setup(a, { emit: k }) {
    const n = a, d = k, g = ge(a, "draft"), v = B({
      get: () => g.value.type,
      set: (r) => {
        g.value = {
          ...g.value,
          type: r
        };
      }
    }), i = B({
      get: () => g.value.text,
      set: (r) => {
        g.value = {
          ...g.value,
          text: r
        };
      }
    }), c = $(!1), I = B(() => v.value === "image" ? "描述你发出的画面…" : v.value === "voice" ? "写下这段语音说的话…" : "说点什么…");
    function S() {
      const r = i.value.trim();
      !r || n.disabled || d("send", v.value === "image" ? {
        type: "image",
        description: r
      } : v.value === "voice" ? {
        type: "voice",
        transcript: r
      } : {
        type: "text",
        text: r
      });
    }
    function p(r) {
      r.key === "Enter" && (r.ctrlKey || r.metaKey) && !r.isComposing && (r.preventDefault(), S());
    }
    return (r, o) => (t(), l("form", {
      class: "messages-composer",
      onSubmit: E(S, ["prevent"])
    }, [
      c.value ? (t(), l("div", ia, [
        e("button", {
          type: "button",
          "aria-pressed": v.value === "text",
          onClick: o[0] || (o[0] = (b) => v.value = "text")
        }, "文字", 8, oa),
        e("button", {
          type: "button",
          "aria-pressed": v.value === "image",
          onClick: o[1] || (o[1] = (b) => v.value = "image")
        }, [w(C, { name: "image" }), o[5] || (o[5] = A("图片", -1))], 8, ua),
        e("button", {
          type: "button",
          "aria-pressed": v.value === "voice",
          onClick: o[2] || (o[2] = (b) => v.value = "voice")
        }, [w(C, { name: "voice" }), o[6] || (o[6] = A("语音", -1))], 8, ra)
      ])) : h("", !0),
      a.waitingFor ? (t(), l("p", da, "正在等待 " + f(a.waitingFor) + " 的回复。可以先写好，稍后发送。", 1)) : h("", !0),
      v.value !== "text" ? (t(), l("p", va, f(v.value === "image" ? a.media.image ? "描述你要发送的画面，发出后可生成图片。" : "发送画面描述；开启画图后可生成图片。" : a.media.voice ? "写下要说的话，发出后可播放语音。" : "发送语音原文；开启 TTS 后可播放。"), 1)) : h("", !0),
      e("div", ma, [
        e("button", {
          type: "button",
          class: "messages-icon-button messages-attach",
          "aria-expanded": c.value,
          "aria-label": "选择消息类型",
          onClick: o[3] || (o[3] = (b) => c.value = !c.value)
        }, [w(C, { name: c.value ? "close" : "plus" }, null, 8, ["name"])], 8, ga),
        N(e("textarea", {
          "onUpdate:modelValue": o[4] || (o[4] = (b) => i.value = b),
          rows: "1",
          maxlength: "4000",
          placeholder: I.value,
          "aria-label": I.value,
          disabled: a.sending,
          onKeydown: p
        }, null, 40, ca), [[R, i.value]]),
        e("button", {
          class: "messages-send",
          type: "submit",
          disabled: a.disabled || !i.value.trim(),
          "aria-label": "发送"
        }, [w(C, { name: "send" })], 8, ya)
      ])
    ], 32));
  }
}), ba = fa, pa = { class: "messages-conversation" }, ka = { class: "messages-thread-header" }, $a = ["disabled"], ha = {
  key: 1,
  class: "messages-thread-start"
}, wa = {
  key: 0,
  class: "messages-time"
}, Ma = {
  key: 2,
  class: "messages-typing",
  role: "status"
}, Ca = ["disabled"], Ia = /* @__PURE__ */ j({
  __name: "Conversation",
  props: /* @__PURE__ */ O({
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
  emits: /* @__PURE__ */ O([
    "back",
    "details",
    "send",
    "retry"
  ], ["update:draft"]),
  setup(a, { expose: k }) {
    const n = ge(a, "draft"), d = a, g = $(null);
    let v = !0, i = !1;
    function c() {
      const r = g.value;
      r && (v = r.scrollHeight - r.clientHeight - r.scrollTop < 70);
    }
    async function I() {
      await le(), v && !i && g.value && (g.value.scrollTop = g.value.scrollHeight);
    }
    de(() => [d.page.messages.at(-1)?.id, d.stage], I, { immediate: !0 });
    async function S() {
      const r = g.value;
      if (!r || i) return;
      i = !0;
      const o = r.scrollHeight, b = r.scrollTop;
      try {
        await d.loadMore(), await le(), r.scrollTop = b + r.scrollHeight - o;
      } finally {
        i = !1, c();
      }
    }
    const p = {
      saving: "正在保存消息…",
      syncing: "正在写入主聊天…",
      summarizing: "正在回顾你们的对话…",
      replying: "对方正在输入…"
    };
    return k({ sent() {
      v = !0, I();
    } }), (r, o) => (t(), l("section", pa, [
      e("header", ka, [
        e("button", {
          class: "messages-icon-button",
          "aria-label": "返回信息",
          onClick: o[0] || (o[0] = (b) => r.$emit("back"))
        }, [w(C, { name: "back" })]),
        w(Q, {
          identity: a.contact.id,
          name: a.contact.name,
          small: ""
        }, null, 8, ["identity", "name"]),
        e("div", null, [e("h2", null, f(a.contact.name), 1), o[5] || (o[5] = e("p", null, "私人对话", -1))]),
        e("button", {
          class: "messages-icon-button",
          "aria-label": "联系人详情",
          onClick: o[1] || (o[1] = (b) => r.$emit("details"))
        }, [w(C, { name: "more" })])
      ]),
      e("div", {
        ref_key: "scroller",
        ref: g,
        class: "messages-thread-scroll",
        onScroll: c
      }, [
        a.page.hasMore ? (t(), l("button", {
          key: 0,
          class: "messages-older",
          disabled: a.loading,
          onClick: S
        }, f(a.loading ? "读取中…" : "查看更早的消息"), 9, $a)) : h("", !0),
        a.page.messages.length ? h("", !0) : (t(), l("p", ha, [
          A(f(a.loading ? "正在读取消息…" : `这是你和 ${a.contact.name} 的对话。`), 1),
          o[6] || (o[6] = e("br", null, null, -1)),
          a.loading ? h("", !0) : (t(), l(V, { key: 0 }, [A("从一句问候开始吧。")], 64))
        ])),
        (t(!0), l(V, null, W(a.page.messages, (b, F) => (t(), l(V, { key: b.id }, [F === 0 || b.createdAt - a.page.messages[F - 1].createdAt > 3e5 ? (t(), l("time", wa, f(new Date(b.createdAt).toLocaleString(void 0, {
          month: "numeric",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        })), 1)) : h("", !0), w(na, {
          message: b,
          bridge: a.bridge,
          "chat-identity": a.chatIdentity,
          media: a.media,
          onResize: I
        }, null, 8, [
          "message",
          "bridge",
          "chat-identity",
          "media"
        ])], 64))), 128)),
        a.stage ? (t(), l("div", Ma, [o[7] || (o[7] = e("span", null, [
          e("i"),
          e("i"),
          e("i")
        ], -1)), A(f(p[a.stage] || "处理中…"), 1)])) : a.page.retryMessageId ? (t(), l("button", {
          key: 3,
          class: "messages-retry",
          disabled: a.disabled,
          onClick: o[2] || (o[2] = (b) => r.$emit("retry", a.page.retryMessageId))
        }, "尚未收到回复 · 重试", 8, Ca)) : h("", !0)
      ], 544),
      w(ba, {
        draft: n.value,
        "onUpdate:draft": o[3] || (o[3] = (b) => n.value = b),
        disabled: a.disabled,
        sending: a.stage === "saving",
        media: a.media,
        "waiting-for": a.waitingFor,
        onSend: o[4] || (o[4] = (b) => r.$emit("send", b))
      }, null, 8, [
        "draft",
        "disabled",
        "sending",
        "media",
        "waiting-for"
      ])
    ]));
  }
}), Sa = Ia, xa = () => ({
  type: "text",
  text: ""
});
function G() {
  return Array.from(globalThis.crypto.getRandomValues(new Uint8Array(16)), (a) => a.toString(16).padStart(2, "0")).join("");
}
var Aa = { class: "messages-app" }, qa = {
  key: 0,
  class: "messages-banner",
  role: "status"
}, La = ["disabled"], Ta = {
  key: 1,
  class: "messages-banner",
  role: "status"
}, Ba = ["disabled"], Va = {
  key: 2,
  class: "messages-notice"
}, Da = {
  key: 3,
  class: "messages-error",
  role: "alert"
}, Ua = {
  key: 0,
  class: "messages-error",
  role: "alert"
}, Fa = { class: "messages-search" }, za = { class: "messages-known-list" }, Ha = ["disabled", "onClick"], Pa = { key: 0 }, Ka = {
  key: 0,
  class: "messages-subtle"
}, Za = { class: "messages-manual" }, ja = ["disabled"], Na = ["disabled"], Ra = ["disabled"], Ea = ["disabled"], Ga = ["disabled"], Ja = { class: "messages-manual" }, Oa = ["disabled"], Qa = ["disabled"], Wa = /* @__PURE__ */ j({
  __name: "MessagesApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(a) {
    const k = a, n = $(k.initialState), d = $(""), g = $({
      contactId: "",
      messages: [],
      hasMore: !1,
      retryMessageId: null
    }), v = $(!1), i = $(!1), c = $(""), I = $(null), S = $(null), p = $("add"), r = $(""), o = $(""), b = $(""), F = $(G()), M = $(G());
    let y = !0, x = 0;
    const K = Se(/* @__PURE__ */ new Map()), X = B({
      get: () => K.get(d.value) ?? xa(),
      set: (u) => {
        K.set(d.value, u);
      }
    });
    let q = null;
    const L = B(() => n.value.contacts.find((u) => u.id === d.value)), ye = B(() => n.value.busy && n.value.busy.contactId !== d.value ? n.value.contacts.find((u) => u.id === n.value.busy?.contactId)?.name ?? "另一位联系人" : ""), fe = B(() => n.value.pendingSave || [
      "unconfirmed",
      "conflict",
      "failed"
    ].includes(n.value.fileState)), T = B(() => i.value || !!n.value.busy || n.value.pendingSave || n.value.fileState !== "ready" || n.value.generationActive), ne = B(() => n.value.knownPeople.filter((u) => !n.value.contacts.some((s) => s.name === u.name) && `${u.name} ${u.aliases.join(" ")}`.toLocaleLowerCase().includes(b.value.toLocaleLowerCase())));
    async function D(u, s = {}) {
      return (await k.bridge.request(u, {
        chatIdentity: n.value.chatIdentity,
        ...s
      }, 6e4)).result;
    }
    async function Y(u = !1) {
      const s = d.value;
      if (!s) return;
      const m = ++x;
      v.value = !0;
      try {
        const Z = await D("messages/thread", {
          contactId: s,
          ...u ? { before: g.value.messages[0]?.seq } : {}
        });
        if (!y || m !== x || d.value !== s) return;
        const re = Z.messages.some((P) => g.value.messages.some((se) => se.id === P.id)), Ie = u || re ? g.value.messages : [], ae = [...new Map([...Ie, ...Z.messages].map((P) => [P.id, P])).values()].sort((P, se) => P.seq - se.seq);
        g.value = {
          ...Z,
          messages: ae,
          hasMore: u || !re || ae.length <= 50 ? Z.hasMore : g.value.hasMore
        }, q?.contactId === s && ae.some((P) => P.id === q?.messageId) && ie();
      } catch {
        y && m === x && d.value === s && (c.value = "消息暂时无法读取，请返回后重试。");
      } finally {
        m === x && (v.value = !1);
      }
    }
    function U(u) {
      if (!y || u.chatIdentity !== n.value.chatIdentity) return;
      const s = L.value?.lastSeq;
      n.value = u;
      for (const m of K.keys()) u.contacts.some((Z) => Z.id === m) || K.delete(m);
      q && u.contacts.some((m) => m.lastMessageId === q?.messageId) && ie(), d.value && !u.contacts.some((m) => m.id === d.value) ? _() : d.value && s !== L.value?.lastSeq && Y();
    }
    function ie() {
      if (q) {
        const u = K.get(q.contactId);
        u?.text === q.draft.text && u.type === q.draft.type && K.delete(q.contactId), q.contactId === d.value && I.value?.sent();
      }
      q = null, F.value = G();
    }
    const be = k.bridge.subscribe((u) => {
      u.type === "messages/state" && U(u.payload.state);
    });
    function oe(u) {
      d.value = u, c.value = "", g.value = {
        contactId: u,
        messages: [],
        hasMore: !1,
        retryMessageId: null
      }, Y();
    }
    function _() {
      d.value = "", x++, g.value = {
        contactId: "",
        messages: [],
        hasMore: !1,
        retryMessageId: null
      };
    }
    async function z(u) {
      if (!i.value) {
        i.value = !0, c.value = "";
        try {
          await u();
        } catch (s) {
          y && (c.value = s instanceof Error && s.message !== "host_request_timeout" ? s.message : "等待操作结果超时，请核实保存状态后重试。");
        } finally {
          i.value = !1;
        }
      }
    }
    function pe(u) {
      T.value || z(async () => {
        q = {
          contactId: d.value,
          messageId: `input:${F.value}`,
          draft: { ...X.value }
        }, U(await D("messages/send", {
          contactId: d.value,
          actionId: F.value,
          payload: u
        }));
      });
    }
    function ke(u) {
      z(async () => U(await D("messages/retry", {
        contactId: d.value,
        messageId: u
      })));
    }
    function $e(u) {
      z(async () => U(await D(u)));
    }
    function he() {
      z(async () => {
        U(await D("messages/sync")), H();
      });
    }
    async function ee(u) {
      p.value = u, c.value = "", r.value = "", o.value = L.value?.note ?? "", b.value = "", M.value = G(), await le(), S.value?.showModal();
    }
    function H() {
      S.value?.close();
    }
    function ue(u = r.value) {
      !u.trim() || T.value || z(async () => {
        const s = await D("messages/contact/add", {
          actionId: M.value,
          name: u.trim(),
          note: o.value.trim()
        });
        U(s.state), H(), oe(s.contactId);
      });
    }
    function we() {
      z(async () => {
        U(await D("messages/contact/note", {
          contactId: d.value,
          note: o.value
        })), H();
      });
    }
    function Me() {
      z(async () => {
        U(await D("messages/contact/delete", { contactId: d.value })), H(), _();
      });
    }
    function Ce() {
      z(async () => {
        U(await D("messages/recover")), H();
      });
    }
    return me(() => {
      y = !1, x++, be();
    }), (u, s) => (t(), l("main", Aa, [
      fe.value ? (t(), l("div", qa, [s[15] || (s[15] = e("span", null, "有消息还在等待保存确认，已保存的记录不会丢失。", -1)), e("button", {
        disabled: i.value || !!n.value.busy,
        onClick: s[0] || (s[0] = (m) => $e(n.value.pendingSave ? "messages/confirm" : "messages/refresh"))
      }, "检查保存", 8, La)])) : n.value.unsynced && !n.value.busy ? (t(), l("div", Ta, [e("span", null, f(n.value.unsynced) + " 条消息已保留，尚未写入主聊天。", 1), e("button", {
        disabled: T.value,
        onClick: s[1] || (s[1] = (m) => ee("sync"))
      }, "查看", 8, Ba)])) : h("", !0),
      n.value.generationActive ? (t(), l("div", Va, "故事正在继续，稍后就能发送消息。")) : h("", !0),
      c.value || n.value.error ? (t(), l("p", Da, f(c.value || n.value.error), 1)) : h("", !0),
      L.value ? (t(), te(Sa, {
        key: L.value.id,
        ref_key: "conversation",
        ref: I,
        draft: X.value,
        "onUpdate:draft": s[2] || (s[2] = (m) => X.value = m),
        contact: L.value,
        page: g.value,
        bridge: a.bridge,
        "chat-identity": n.value.chatIdentity,
        disabled: T.value,
        stage: n.value.busy?.contactId === L.value.id ? n.value.busy.stage : "",
        loading: v.value,
        "load-more": () => Y(!0),
        media: n.value.media,
        "waiting-for": ye.value,
        onBack: _,
        onDetails: s[3] || (s[3] = (m) => ee("detail")),
        onSend: pe,
        onRetry: ke
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
      ])) : (t(), te(Ge, {
        key: 5,
        contacts: n.value.contacts,
        "busy-contact-id": n.value.busy?.contactId ?? "",
        drafts: K,
        onSelect: oe,
        onAdd: s[4] || (s[4] = (m) => ee("add"))
      }, null, 8, [
        "contacts",
        "busy-contact-id",
        "drafts"
      ])),
      e("dialog", {
        ref_key: "dialog",
        ref: S,
        class: "messages-dialog",
        onKeydown: s[13] || (s[13] = ce(E(() => {
        }, ["stop"]), ["esc"])),
        onClick: s[14] || (s[14] = (m) => {
          m.target === S.value && H();
        })
      }, [
        e("header", null, [
          p.value === "detail" && L.value ? (t(), te(Q, {
            key: 0,
            identity: L.value.id,
            name: L.value.name,
            small: ""
          }, null, 8, ["identity", "name"])) : h("", !0),
          e("h2", null, f(p.value === "add" ? "新的对话" : p.value === "detail" ? L.value?.name : p.value === "delete" ? "删除联系人？" : p.value === "sync" ? "消息还未写入主聊天" : "在当前位置补记？"), 1),
          e("button", {
            class: "messages-icon-button",
            "aria-label": "关闭",
            onClick: H
          }, [w(C, { name: "close" })])
        ]),
        c.value ? (t(), l("p", Ua, f(c.value), 1)) : h("", !0),
        p.value === "add" ? (t(), l(V, { key: 1 }, [
          e("label", Fa, [w(C, { name: "search" }), N(e("input", {
            "onUpdate:modelValue": s[5] || (s[5] = (m) => b.value = m),
            placeholder: "查找已知人物",
            "aria-label": "查找已知人物"
          }, null, 512), [[R, b.value]])]),
          e("div", za, [(t(!0), l(V, null, W(ne.value, (m) => (t(), l("button", {
            key: m.name,
            disabled: T.value,
            onClick: (Z) => ue(m.name)
          }, [
            w(Q, {
              identity: m.name,
              name: m.name,
              small: ""
            }, null, 8, ["identity", "name"]),
            e("span", null, [A(f(m.name), 1), m.aliases.length ? (t(), l("small", Pa, f(m.aliases.join("、")), 1)) : h("", !0)]),
            w(C, { name: "plus" })
          ], 8, Ha))), 128)), ne.value.length ? h("", !0) : (t(), l("p", Ka, "没有更多已知人物，可以在下面补充。"))]),
          e("details", Za, [s[18] || (s[18] = e("summary", null, "想联系的人不在这里？", -1)), e("form", { onSubmit: s[8] || (s[8] = E((m) => ue(), ["prevent"])) }, [
            e("label", null, [s[16] || (s[16] = A("姓名", -1)), N(e("input", {
              "onUpdate:modelValue": s[6] || (s[6] = (m) => r.value = m),
              maxlength: "120",
              required: "",
              placeholder: "对方的姓名"
            }, null, 512), [[R, r.value]])]),
            e("label", null, [s[17] || (s[17] = A("身份说明（可选）", -1)), N(e("textarea", {
              "onUpdate:modelValue": s[7] || (s[7] = (m) => o.value = m),
              maxlength: "600",
              rows: "2",
              placeholder: "例如：住在隔壁的花店老板"
            }, null, 512), [[R, o.value]])]),
            e("button", {
              class: "messages-primary",
              disabled: T.value || !r.value.trim()
            }, "添加并聊天", 8, ja)
          ], 32)])
        ], 64)) : p.value === "detail" ? (t(), l("form", {
          key: 2,
          onSubmit: E(we, ["prevent"])
        }, [
          e("label", null, [s[19] || (s[19] = A("身份说明 / 备注", -1)), N(e("textarea", {
            "onUpdate:modelValue": s[9] || (s[9] = (m) => o.value = m),
            maxlength: "600",
            rows: "3",
            placeholder: "帮助辨认这位联系人"
          }, null, 512), [[R, o.value]])]),
          e("button", {
            class: "messages-primary",
            disabled: T.value
          }, "保存备注", 8, Na),
          e("button", {
            type: "button",
            class: "messages-danger",
            disabled: T.value,
            onClick: s[10] || (s[10] = (m) => p.value = "delete")
          }, "删除联系人与通讯记录", 8, Ra)
        ], 32)) : p.value === "delete" ? (t(), l(V, { key: 3 }, [
          e("p", null, "会删除信息 APP 内与 " + f(L.value?.name) + " 的全部通讯和摘要，不能恢复。主聊天中的「私人信息」楼层不会删除，其他联系人不受影响。", 1),
          e("button", {
            class: "messages-danger",
            disabled: T.value,
            onClick: Me
          }, "确认删除", 8, Ea),
          e("button", {
            class: "messages-secondary",
            onClick: s[11] || (s[11] = (m) => p.value = "detail")
          }, "保留联系人")
        ], 64)) : p.value === "sync" ? (t(), l(V, { key: 4 }, [
          s[22] || (s[22] = e("p", null, "信息 APP 已保留这些消息。重试只会补上主聊天里的记录，不会再次向对方发送，也不会重新生成回复。", -1)),
          e("button", {
            class: "messages-primary",
            disabled: T.value,
            onClick: he
          }, "重试写入", 8, Ga),
          e("details", Ja, [
            s[20] || (s[20] = e("summary", null, "原来的记录已被修改或删除？", -1)),
            s[21] || (s[21] = e("p", null, "不会覆盖你的修改。需要这些消息继续进入剧情时，可以在当前位置另加一条补记。", -1)),
            e("button", {
              class: "messages-secondary",
              disabled: T.value,
              onClick: s[12] || (s[12] = (m) => p.value = "recover")
            }, "查看补记方式", 8, Oa)
          ])
        ], 64)) : (t(), l(V, { key: 5 }, [
          s[23] || (s[23] = e("p", null, "先检查已有记录；仍未写入的消息会在主聊天当前位置标为「补录」，保留原发送时间。不会覆盖旧记录或恢复你删除的那一条。", -1)),
          e("button", {
            class: "messages-primary",
            disabled: T.value,
            onClick: Ce
          }, "确认补记", 8, Qa),
          e("button", {
            class: "messages-secondary",
            onClick: H
          }, "暂不补记")
        ], 64))
      ], 544)
    ]));
  }
}), Ya = Wa;
export {
  Ya as default
};
