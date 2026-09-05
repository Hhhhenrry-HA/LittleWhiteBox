/* eslint-disable */
import { A as C, C as m, F as q, L as H, M as O, N as x, O as G, _ as T, c as F, d as j, f as A, g as K, h as M, i as V, l as U, p as f, r as P, s as X, u as e, v as Y, w as z, x as Q, y as J, z as h } from "./xiaobai-os-runtime-dom.esm-bundler-D8PGSboO.js";
var Z = ["src"], _ = {
  key: 1,
  class: "fourth-wall-avatar is-placeholder",
  "aria-hidden": "true"
}, ee = { class: "fourth-wall-message-stack" }, te = {
  key: 0,
  class: "fourth-wall-thinking"
}, ae = { class: "fourth-wall-bubble" }, se = {
  key: 0,
  class: "fourth-wall-message-text"
}, le = {
  key: 1,
  class: "fourth-wall-image-card"
}, ie = ["src", "alt"], ne = ["onClick"], oe = { key: 2 }, re = { key: 3 }, ue = ["onClick"], de = { "aria-hidden": "true" }, ve = { key: 0 }, me = { class: "fourth-wall-message-actions" }, ge = { key: 1 }, fe = /* @__PURE__ */ T({
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
    bridge: {}
  },
  emits: ["edit", "delete"],
  setup(n, { emit: w }) {
    const r = n, c = w, g = x(!1), p = x(""), i = O({}), l = /* @__PURE__ */ new Set();
    let v = () => {
    };
    function a(d) {
      const o = /\[(?:img|图片)\s*:\s*([^\]]+)\]|\[(?:voice|语音)\s*:([^:\]]*):([^\]]+)\]|\[(?:voice|语音)\s*:\s*([^\]]+)\]/gi, u = [];
      let s = 0, t;
      for (; (t = o.exec(d)) !== null; )
        t.index > s && u.push({
          kind: "text",
          raw: d.slice(s, t.index),
          value: d.slice(s, t.index)
        }), t[1] !== void 0 ? u.push({
          kind: "image",
          raw: t[0],
          value: t[1].trim()
        }) : u.push({
          kind: "voice",
          raw: t[0],
          value: String(t[3] ?? t[4] ?? "").trim(),
          emotion: String(t[2] || "").trim().toLowerCase()
        }), s = o.lastIndex;
      return s < d.length && u.push({
        kind: "text",
        raw: d.slice(s),
        value: d.slice(s)
      }), u.length ? u : [{
        kind: "text",
        raw: d,
        value: d
      }];
    }
    const b = U(() => a(r.message.content)), k = U(() => r.message.ts ? new Intl.DateTimeFormat("zh-CN", {
      hour: "2-digit",
      minute: "2-digit"
    }).format(r.message.ts) : "");
    function S(d, o) {
      return `fw-${d}-${Date.now()}-${r.messageIndex}-${o}-${Math.random().toString(36).slice(2, 7)}`;
    }
    function I(d) {
      return d.result;
    }
    function E(d, o) {
      return l.has(o) && i[d]?.requestId === o;
    }
    async function $(d, o) {
      if (i[o]?.status === "loading" || i[o]?.status === "ready") return;
      if (!r.imageAvailable) {
        i[o] = {
          status: "unavailable",
          message: "画图能力未启用"
        };
        return;
      }
      const u = S("image", o);
      l.add(u), i[o] = {
        status: "loading",
        message: "查询图片缓存",
        requestId: u
      };
      const s = {
        chatIdentity: r.chatIdentity,
        sessionId: r.sessionId
      };
      try {
        const t = I(await r.bridge.request("fourth-wall/image-check", {
          ...s,
          tags: d.value,
          mediaRequestId: u
        }, 3e4));
        if (!E(o, u)) return;
        if (!t.available) {
          i[o] = {
            status: "unavailable",
            message: "画图能力未启用",
            requestId: u
          };
          return;
        }
        let y = t.cached || "";
        if (!y) {
          i[o] = {
            status: "loading",
            message: "正在生成图片",
            requestId: u
          };
          const W = I(await r.bridge.request("fourth-wall/image-generate", {
            ...s,
            tags: d.value,
            mediaRequestId: u
          }, 18e4));
          if (!E(o, u)) return;
          y = W.base64;
        }
        i[o] = {
          status: "ready",
          source: /^(?:data:|blob:|https?:)/i.test(y) ? y : `data:image/png;base64,${y}`
        };
      } catch (t) {
        E(o, u) && (i[o] = {
          status: "error",
          message: t instanceof Error ? t.message : String(t),
          requestId: u
        });
      } finally {
        l.delete(u);
      }
    }
    async function B(d, o) {
      if (!r.voiceAvailable) {
        i[o] = {
          status: "unavailable",
          message: "TTS 能力未启用"
        };
        return;
      }
      const u = i[o];
      if (u?.status === "loading") return;
      if (u?.status === "playing" && u.requestId) {
        r.bridge.post("fourth-wall/voice-stop", {
          chatIdentity: r.chatIdentity,
          mediaRequestId: u.requestId
        }), i[o] = { status: "idle" };
        return;
      }
      const s = S("voice", o);
      l.add(s), i[o] = {
        status: "loading",
        message: "正在准备语音",
        requestId: s
      };
      try {
        await r.bridge.request("fourth-wall/voice-play", {
          chatIdentity: r.chatIdentity,
          sessionId: r.sessionId,
          mediaRequestId: s,
          text: d.value,
          emotion: d.emotion
        });
      } catch (t) {
        E(o, s) && (i[o] = {
          status: "error",
          message: t instanceof Error ? t.message : String(t),
          requestId: s
        }), l.delete(s);
      }
    }
    function L() {
      p.value = r.message.content, g.value = !0;
    }
    function D() {
      const d = p.value.trim();
      d && (c("edit", r.messageIndex, d), g.value = !1);
    }
    function N() {
      l.forEach((d) => {
        r.bridge.post("fourth-wall/image-cancel", {
          chatIdentity: r.chatIdentity,
          mediaRequestId: d
        }), r.bridge.post("fourth-wall/voice-stop", {
          chatIdentity: r.chatIdentity,
          mediaRequestId: d
        });
      }), l.clear();
    }
    function R() {
      b.value.forEach((d, o) => {
        d.kind === "image" && $(d, o);
      });
    }
    return Q(() => {
      v = r.bridge.subscribe((d) => {
        if (d.type === "fourth-wall/image-progress") {
          const o = d.payload, u = Object.keys(i).map(Number).find((s) => i[s]?.requestId === o.mediaRequestId);
          u !== void 0 && (i[u].message = o.status === "queued" ? `图片队列第 ${o.position || 1} 位` : "正在生成图片");
        }
        if (d.type === "fourth-wall/voice-state") {
          const o = d.payload, u = Object.keys(i).map(Number).find((s) => i[s]?.requestId === o.requestId);
          if (u === void 0) return;
          o.state === "playing" && (i[u].status = "playing"), (o.state === "ended" || o.state === "stopped") && (l.delete(String(o.requestId || "")), i[u] = { status: "idle" }), o.state === "error" && (l.delete(String(o.requestId || "")), i[u] = {
            status: "error",
            message: o.message || "语音播放失败"
          });
        }
      }), R();
    }), G(() => r.message.content, () => {
      N(), Object.keys(i).forEach((d) => delete i[Number(d)]), R();
    }), J(() => {
      v(), N();
    }), (d, o) => (m(), f("article", { class: H(["fourth-wall-message", n.message.role === "user" ? "is-user" : "is-ai"]) }, [(n.message.role === "user" ? n.userAvatar : n.characterAvatar) ? (m(), f("img", {
      key: 0,
      class: "fourth-wall-avatar",
      src: n.message.role === "user" ? n.userAvatar : n.characterAvatar,
      alt: ""
    }, null, 8, Z)) : (m(), f("span", _)), e("div", ee, [
      n.message.thinking ? (m(), f("details", te, [o[3] || (o[3] = e("summary", null, "思考过程", -1)), e("div", null, h(n.message.thinking), 1)])) : A("", !0),
      e("div", ae, [g.value ? C((m(), f("textarea", {
        key: 0,
        "onUpdate:modelValue": o[0] || (o[0] = (u) => p.value = u),
        class: "fourth-wall-edit",
        rows: "3"
      }, null, 512)), [[V, p.value]]) : (m(!0), f(F, { key: 1 }, z(b.value, (u, s) => (m(), f(F, { key: `${u.kind}-${s}` }, [u.kind === "text" ? (m(), f("span", se, h(u.value), 1)) : u.kind === "image" ? (m(), f("figure", le, [i[s]?.status === "ready" ? (m(), f("img", {
        key: 0,
        src: i[s].source,
        alt: u.value
      }, null, 8, ie)) : i[s]?.status === "error" ? (m(), f("button", {
        key: 1,
        type: "button",
        onClick: (t) => $(u, s)
      }, [M(h(u.raw), 1), e("small", null, h(i[s].message) + "，点此重试", 1)], 8, ne)) : i[s]?.status === "unavailable" ? (m(), f("div", oe, [M(h(u.raw), 1), e("small", null, h(i[s].message), 1)])) : (m(), f("div", re, [M(h(u.raw), 1), e("small", null, h(i[s]?.message || "准备图片"), 1)]))])) : (m(), f("button", {
        key: 2,
        class: "fourth-wall-voice",
        type: "button",
        onClick: (t) => B(u, s)
      }, [
        e("span", de, h(i[s]?.status === "playing" ? "■" : "▶"), 1),
        e("span", null, h(u.value), 1),
        i[s]?.message ? (m(), f("small", ve, h(i[s].message), 1)) : A("", !0)
      ], 8, ue))], 64))), 128)), e("div", me, [g.value ? (m(), f(F, { key: 0 }, [e("button", {
        type: "button",
        onClick: D
      }, "保存"), e("button", {
        type: "button",
        onClick: o[1] || (o[1] = (u) => g.value = !1)
      }, "取消")], 64)) : (m(), f(F, { key: 1 }, [e("button", {
        type: "button",
        onClick: L
      }, "编辑"), e("button", {
        type: "button",
        onClick: o[2] || (o[2] = (u) => c("delete", n.messageIndex))
      }, "删除")], 64))])]),
      k.value ? (m(), f("time", ge, h(k.value), 1)) : A("", !0)
    ])], 2));
  }
}), be = fe, ye = {
  key: 1,
  class: "fourth-wall-empty"
}, pe = {
  key: 2,
  class: "fourth-wall-message is-ai is-streaming"
}, ce = ["src"], he = {
  key: 1,
  class: "fourth-wall-avatar is-placeholder"
}, we = { class: "fourth-wall-message-stack" }, ke = {
  key: 0,
  class: "fourth-wall-thinking",
  open: ""
}, Ie = { class: "fourth-wall-bubble" }, $e = {
  key: 0,
  class: "fourth-wall-unsaved"
}, Ce = /* @__PURE__ */ T({
  __name: "FourthWallConversation",
  props: {
    history: {},
    sessionId: {},
    chatIdentity: {},
    userAvatar: {},
    characterAvatar: {},
    imageAvailable: { type: Boolean },
    voiceAvailable: { type: Boolean },
    generation: {},
    bridge: {}
  },
  emits: ["edit", "delete"],
  setup(n) {
    const w = n, r = x(null), c = x(40), g = U(() => Math.max(0, w.history.length - c.value)), p = U(() => w.history.slice(g.value));
    function i() {
      c.value = Math.min(w.history.length, c.value + 40);
    }
    return G(() => w.sessionId, () => {
      c.value = 40;
    }), G(() => [w.history.length, w.generation.text], async () => {
      await Y(), r.value && (r.value.scrollTop = r.value.scrollHeight);
    }, { immediate: !0 }), (l, v) => (m(), f("section", {
      ref_key: "viewport",
      ref: r,
      class: "fourth-wall-conversation",
      "aria-live": "polite"
    }, [
      g.value > 0 ? (m(), f("button", {
        key: 0,
        type: "button",
        class: "fourth-wall-earlier",
        onClick: i
      }, " 显示更早的 " + h(g.value) + " 条记录 ", 1)) : A("", !0),
      n.history.length === 0 && n.generation.status === "idle" ? (m(), f("div", ye, [...v[2] || (v[2] = [
        e("span", null, "IV", -1),
        e("strong", null, "越过故事边界", -1),
        e("p", null, "这里是你与角色扮演者的皮下私聊。", -1)
      ])])) : A("", !0),
      (m(!0), f(F, null, z(p.value, (a, b) => (m(), j(be, {
        key: `${a.ts}-${g.value + b}`,
        message: a,
        "message-index": g.value + b,
        "chat-identity": n.chatIdentity,
        "session-id": n.sessionId,
        "user-avatar": n.userAvatar,
        "character-avatar": n.characterAvatar,
        "image-available": n.imageAvailable,
        "voice-available": n.voiceAvailable,
        bridge: n.bridge,
        onEdit: v[0] || (v[0] = (k, S) => l.$emit("edit", k, S)),
        onDelete: v[1] || (v[1] = (k) => l.$emit("delete", k))
      }, null, 8, [
        "message",
        "message-index",
        "chat-identity",
        "session-id",
        "user-avatar",
        "character-avatar",
        "image-available",
        "voice-available",
        "bridge"
      ]))), 128)),
      n.generation.status !== "idle" ? (m(), f("article", pe, [n.characterAvatar ? (m(), f("img", {
        key: 0,
        class: "fourth-wall-avatar",
        src: n.characterAvatar,
        alt: ""
      }, null, 8, ce)) : (m(), f("span", he)), e("div", we, [n.generation.thinking ? (m(), f("details", ke, [v[3] || (v[3] = e("summary", null, "思考中", -1)), e("div", null, h(n.generation.thinking), 1)])) : A("", !0), e("div", Ie, [M(h(n.generation.text || (n.generation.status === "error" ? n.generation.message : "等待回应...")) + " ", 1), n.generation.unsaved ? (m(), f("small", $e, "未保存")) : A("", !0)])])])) : A("", !0)
    ], 512));
  }
}), Se = Ce, xe = {
  class: "fourth-wall-modal",
  role: "dialog",
  "aria-modal": "true",
  "aria-label": "四次元壁提示词"
}, Ae = { class: "fourth-wall-prompt-fields" }, Me = /* @__PURE__ */ T({
  __name: "FourthWallPromptEditor",
  props: { templates: {} },
  emits: [
    "close",
    "save",
    "restore"
  ],
  setup(n, { emit: w }) {
    const r = n, c = w, g = O(structuredClone(q(r.templates)));
    function p() {
      c("save", structuredClone(q(g)));
    }
    return (i, l) => (m(), f("div", {
      class: "fourth-wall-modal-backdrop",
      onClick: l[6] || (l[6] = X((v) => c("close"), ["self"]))
    }, [e("section", xe, [
      e("header", null, [l[7] || (l[7] = e("strong", null, "提示词模板", -1)), e("button", {
        type: "button",
        onClick: l[0] || (l[0] = (v) => c("close"))
      }, "关闭")]),
      e("div", Ae, [
        e("label", null, [l[8] || (l[8] = M("Top User", -1)), C(e("textarea", {
          "onUpdate:modelValue": l[1] || (l[1] = (v) => g.topuser = v),
          rows: "5"
        }, null, 512), [[V, g.topuser]])]),
        e("label", null, [l[9] || (l[9] = M("Confirm", -1)), C(e("textarea", {
          "onUpdate:modelValue": l[2] || (l[2] = (v) => g.confirm = v),
          rows: "3"
        }, null, 512), [[V, g.confirm]])]),
        e("label", null, [l[10] || (l[10] = M("Meta Protocol", -1)), C(e("textarea", {
          "onUpdate:modelValue": l[3] || (l[3] = (v) => g.metaProtocol = v),
          rows: "12"
        }, null, 512), [[V, g.metaProtocol]])]),
        e("label", null, [l[11] || (l[11] = M("Bottom", -1)), C(e("textarea", {
          "onUpdate:modelValue": l[4] || (l[4] = (v) => g.bottom = v),
          rows: "5"
        }, null, 512), [[V, g.bottom]])])
      ]),
      e("footer", null, [e("button", {
        type: "button",
        class: "is-danger",
        onClick: l[5] || (l[5] = (v) => c("restore"))
      }, "恢复默认"), e("button", {
        type: "button",
        class: "is-primary",
        onClick: p
      }, "保存")])
    ])]));
  }
}), qe = Me, Ve = { class: "fourth-wall-settings-section" }, Ee = { class: "fourth-wall-session-row" }, Fe = ["value", "disabled"], Ue = ["value"], Te = ["disabled"], We = ["disabled"], Pe = ["disabled"], Be = /* @__PURE__ */ T({
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
  setup(n, { emit: w }) {
    const r = w;
    function c() {
      const i = window.prompt("新记录名称", "新记录")?.trim();
      i && r("add", i);
    }
    function g(i, l) {
      const v = window.prompt("重命名记录", l)?.trim();
      v && r("rename", i, v);
    }
    function p(i) {
      window.confirm("确定删除当前记录吗？") && r("delete", i);
    }
    return (i, l) => (m(), f("section", Ve, [l[3] || (l[3] = e("h3", null, "聊天记录", -1)), e("div", Ee, [
      e("select", {
        value: n.activeSessionId,
        disabled: n.disabled,
        onChange: l[0] || (l[0] = (v) => r("switch", v.target.value))
      }, [(m(!0), f(F, null, z(n.sessions, (v) => (m(), f("option", {
        key: v.id,
        value: v.id
      }, h(v.name), 9, Ue))), 128))], 40, Fe),
      e("button", {
        type: "button",
        disabled: n.disabled,
        title: "新建记录",
        onClick: c
      }, "＋", 8, Te),
      e("button", {
        type: "button",
        disabled: n.disabled,
        title: "重命名记录",
        onClick: l[1] || (l[1] = (v) => g(n.activeSessionId, n.sessions.find((a) => a.id === n.activeSessionId)?.name || ""))
      }, " 改 ", 8, We),
      e("button", {
        type: "button",
        disabled: n.disabled || n.sessions.length <= 1,
        title: "删除记录",
        class: "is-danger",
        onClick: l[2] || (l[2] = (v) => p(n.activeSessionId))
      }, " 删 ", 8, Pe)
    ])]));
  }
}), De = Be, Ne = {
  class: "fourth-wall-settings",
  "aria-label": "四次元壁设置"
}, Re = { class: "fourth-wall-settings-scroll" }, Oe = { class: "fourth-wall-settings-section" }, Le = { class: "is-toggle" }, Ge = { class: "is-toggle" }, je = ["disabled"], ze = { class: "fourth-wall-settings-section" }, He = { class: "is-toggle" }, Ke = { class: "is-toggle" }, Qe = { class: "is-toggle" }, Je = { key: 0 }, Xe = ["disabled"], Ye = { class: "fourth-wall-settings-section is-actions" }, Ze = /* @__PURE__ */ T({
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
  setup(n, { emit: w }) {
    const r = n, c = w, g = O(structuredClone(q(r.chat.settings))), p = O(structuredClone(q(r.global)));
    function i() {
      c("updateChat", structuredClone(q(g)));
    }
    function l() {
      c("updateGlobal", {
        image: structuredClone(q(p.image)),
        voice: structuredClone(q(p.voice)),
        commentary: structuredClone(q(p.commentary))
      });
    }
    return (v, a) => (m(), f("aside", Ne, [e("header", null, [a[14] || (a[14] = e("strong", null, "四次元壁设置", -1)), e("button", {
      type: "button",
      onClick: a[0] || (a[0] = (b) => c("close"))
    }, "关闭")]), e("div", Re, [
      K(De, {
        sessions: n.chat.sessions,
        "active-session-id": n.chat.activeSessionId,
        disabled: n.busy,
        onSwitch: a[1] || (a[1] = (b) => c("switchSession", b)),
        onAdd: a[2] || (a[2] = (b) => c("addSession", b)),
        onRename: a[3] || (a[3] = (b, k) => c("renameSession", b, k)),
        onDelete: a[4] || (a[4] = (b) => c("deleteSession", b))
      }, null, 8, [
        "sessions",
        "active-session-id",
        "disabled"
      ]),
      e("section", Oe, [
        a[19] || (a[19] = e("h3", null, "上下文", -1)),
        e("label", null, [a[15] || (a[15] = M("普通聊天层数", -1)), C(e("input", {
          "onUpdate:modelValue": a[5] || (a[5] = (b) => g.maxChatLayers = b),
          type: "number",
          min: "1",
          max: "9999"
        }, null, 512), [[
          V,
          g.maxChatLayers,
          void 0,
          { number: !0 }
        ]])]),
        e("label", null, [a[16] || (a[16] = M("皮下聊天轮数", -1)), C(e("input", {
          "onUpdate:modelValue": a[6] || (a[6] = (b) => g.maxMetaTurns = b),
          type: "number",
          min: "1",
          max: "9999"
        }, null, 512), [[
          V,
          g.maxMetaTurns,
          void 0,
          { number: !0 }
        ]])]),
        e("label", Le, [a[17] || (a[17] = e("span", null, "流式生成", -1)), C(e("input", {
          "onUpdate:modelValue": a[7] || (a[7] = (b) => g.stream = b),
          type: "checkbox"
        }, null, 512), [[P, g.stream]])]),
        e("label", Ge, [a[18] || (a[18] = e("span", null, "禁用 Assistant Prefill", -1)), C(e("input", {
          "onUpdate:modelValue": a[8] || (a[8] = (b) => g.disableAssistantPrefill = b),
          type: "checkbox"
        }, null, 512), [[P, g.disableAssistantPrefill]])]),
        e("button", {
          type: "button",
          class: "is-primary",
          disabled: n.busy,
          onClick: i
        }, "保存上下文设置", 8, je)
      ]),
      e("section", ze, [
        a[23] || (a[23] = e("h3", null, "能力", -1)),
        e("label", He, [a[20] || (a[20] = e("span", null, "在提示词中允许图片", -1)), C(e("input", {
          "onUpdate:modelValue": a[9] || (a[9] = (b) => p.image.enablePrompt = b),
          type: "checkbox"
        }, null, 512), [[P, p.image.enablePrompt]])]),
        e("label", Ke, [a[21] || (a[21] = e("span", null, "在提示词中允许语音", -1)), C(e("input", {
          "onUpdate:modelValue": a[10] || (a[10] = (b) => p.voice.enabled = b),
          type: "checkbox"
        }, null, 512), [[P, p.voice.enabled]])]),
        e("label", Qe, [a[22] || (a[22] = e("span", null, "实时吐槽", -1)), C(e("input", {
          "onUpdate:modelValue": a[11] || (a[11] = (b) => p.commentary.enabled = b),
          type: "checkbox"
        }, null, 512), [[P, p.commentary.enabled]])]),
        p.commentary.enabled ? (m(), f("label", Je, [M(" 吐槽概率 " + h(p.commentary.probability) + "% ", 1), C(e("input", {
          "onUpdate:modelValue": a[12] || (a[12] = (b) => p.commentary.probability = b),
          type: "range",
          min: "1",
          max: "99"
        }, null, 512), [[
          V,
          p.commentary.probability,
          void 0,
          { number: !0 }
        ]])])) : A("", !0),
        e("button", {
          type: "button",
          class: "is-primary",
          disabled: n.busy,
          onClick: l
        }, "保存能力设置", 8, Xe)
      ]),
      e("section", Ye, [e("button", {
        type: "button",
        onClick: a[13] || (a[13] = (b) => c("openPrompts"))
      }, "提示词模板")])
    ])]));
  }
}), _e = Ze, et = { class: "fourth-wall-app" }, tt = { class: "fourth-wall-header" }, at = { class: "fourth-wall-heading" }, st = { class: "fourth-wall-header-actions" }, lt = ["disabled"], it = ["disabled"], nt = {
  key: 0,
  class: "fourth-wall-error",
  role: "alert"
}, ot = { class: "fourth-wall-composer" }, rt = ["disabled"], ut = ["disabled"], dt = 35e3, vt = /* @__PURE__ */ T({
  __name: "FourthWallApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(n) {
    const w = n, r = x(structuredClone(q(w.initialState))), c = x(""), g = x(!1), p = x(!1), i = x(!1), l = x(""), v = x(!1), a = x({
      status: "idle",
      sessionId: "",
      text: "",
      thinking: "",
      message: "",
      unsaved: !1
    });
    let b = () => {
    };
    const k = U(() => r.value.chat.sessions.find((s) => s.id === r.value.chat.activeSessionId)), S = U(() => a.value.status === "started" || a.value.status === "progress");
    function I(s = k.value.id) {
      return {
        chatIdentity: r.value.chatIdentity,
        sessionId: s
      };
    }
    function E(s) {
      return structuredClone(s.result);
    }
    async function $(s, t) {
      i.value = !0, l.value = "";
      try {
        r.value = E(await w.bridge.request(s, t, dt));
      } catch (y) {
        l.value = y instanceof Error ? y.message : String(y);
      } finally {
        i.value = !1;
      }
    }
    async function B() {
      const s = c.value.trim();
      !s || S.value || i.value || (c.value = "", a.value = {
        status: "started",
        sessionId: k.value.id,
        text: "",
        thinking: "",
        message: "",
        unsaved: !1
      }, await $("fourth-wall/send", {
        ...I(),
        content: s
      }), l.value && (a.value.status = "idle"));
    }
    async function L() {
      S.value || i.value || (a.value = {
        status: "started",
        sessionId: k.value.id,
        text: "",
        thinking: "",
        message: "",
        unsaved: !1
      }, await $("fourth-wall/regenerate", I()), l.value && (a.value.status = "idle"));
    }
    function D() {
      w.bridge.post("fourth-wall/cancel", I());
    }
    function N(s) {
      s.key !== "Enter" || s.shiftKey || v.value || (s.preventDefault(), S.value ? D() : B());
    }
    function R(s) {
      window.confirm("确定删除这条消息吗？") && $("fourth-wall/delete-message", {
        ...I(),
        messageIndex: s
      });
    }
    function d() {
      window.confirm("确定清空当前记录吗？") && $("fourth-wall/clear-history", I());
    }
    function o(s) {
      $("fourth-wall/update-chat-settings", {
        ...I(),
        patch: s
      });
    }
    function u(s) {
      $("fourth-wall/update-global-settings", {
        ...I(),
        patch: s
      });
    }
    return Q(() => {
      b = w.bridge.subscribe((s) => {
        if (s.type === "fourth-wall/state" && (r.value = structuredClone(s.payload.state)), s.type !== "fourth-wall/generation") return;
        const t = s.payload;
        if (!(t.sessionId && t.sessionId !== k.value.id)) {
          if (t.status === "complete" || t.status === "cancelled") {
            a.value = {
              status: "idle",
              sessionId: "",
              text: "",
              thinking: "",
              message: "",
              unsaved: !1
            };
            return;
          }
          if (t.status === "error") {
            l.value = t.message || "生成失败", a.value = t.kind === "save" && (t.draft?.text || t.draft?.thinking) ? {
              status: "error",
              sessionId: t.sessionId || k.value.id,
              text: t.draft?.text || "",
              thinking: t.draft?.thinking || "",
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
          a.value = {
            status: t.status || "progress",
            sessionId: t.sessionId || k.value.id,
            text: t.text || a.value.text,
            thinking: t.thinking || a.value.thinking,
            message: "",
            unsaved: !1
          };
        }
      });
    }), J(() => b()), (s, t) => (m(), f("main", et, [
      e("header", tt, [e("div", at, [t[17] || (t[17] = e("span", null, "IV", -1)), e("div", null, [t[16] || (t[16] = e("strong", null, "四次元壁", -1)), e("small", null, h(k.value.name), 1)])]), e("div", st, [
        e("button", {
          type: "button",
          title: "重答",
          disabled: i.value || S.value,
          onClick: L
        }, "↻", 8, lt),
        e("button", {
          type: "button",
          title: "清空当前记录",
          "aria-label": "清空当前记录",
          disabled: i.value,
          onClick: d
        }, [...t[18] || (t[18] = [e("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [e("path", { d: "M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7m4 4v5m4-5v5" })], -1)])], 8, it),
        e("button", {
          type: "button",
          title: "设置",
          onClick: t[0] || (t[0] = (y) => g.value = !0)
        }, "⚙")
      ])]),
      l.value ? (m(), f("div", nt, [e("span", null, h(l.value), 1), e("button", {
        type: "button",
        onClick: t[1] || (t[1] = (y) => l.value = "")
      }, "×")])) : A("", !0),
      K(Se, {
        history: k.value.history,
        "session-id": k.value.id,
        "chat-identity": r.value.chatIdentity,
        "user-avatar": r.value.userAvatar,
        "character-avatar": r.value.characterAvatar,
        "image-available": r.value.capabilities.image.available,
        "voice-available": r.value.capabilities.voice.available,
        generation: a.value,
        bridge: n.bridge,
        onEdit: t[2] || (t[2] = (y, W) => $("fourth-wall/edit-message", {
          ...I(),
          messageIndex: y,
          content: W
        })),
        onDelete: R
      }, null, 8, [
        "history",
        "session-id",
        "chat-identity",
        "user-avatar",
        "character-avatar",
        "image-available",
        "voice-available",
        "generation",
        "bridge"
      ]),
      e("footer", ot, [C(e("textarea", {
        "onUpdate:modelValue": t[3] || (t[3] = (y) => c.value = y),
        rows: "1",
        placeholder: "聊点什么...",
        disabled: i.value,
        onCompositionstart: t[4] || (t[4] = (y) => v.value = !0),
        onCompositionend: t[5] || (t[5] = (y) => v.value = !1),
        onKeydown: N
      }, null, 40, rt), [[V, c.value]]), e("button", {
        type: "button",
        class: H({ "is-stop": S.value }),
        disabled: i.value,
        onClick: t[6] || (t[6] = (y) => S.value ? D() : B())
      }, h(S.value ? "■" : "↑"), 11, ut)]),
      g.value ? (m(), j(_e, {
        key: 1,
        chat: r.value.chat,
        global: r.value.global,
        busy: i.value || S.value,
        onClose: t[7] || (t[7] = (y) => g.value = !1),
        onUpdateChat: o,
        onUpdateGlobal: u,
        onSwitchSession: t[8] || (t[8] = (y) => $("fourth-wall/switch-session", {
          ...I(),
          targetSessionId: y
        })),
        onAddSession: t[9] || (t[9] = (y) => $("fourth-wall/add-session", {
          ...I(),
          name: y
        })),
        onRenameSession: t[10] || (t[10] = (y, W) => $("fourth-wall/rename-session", {
          ...I(y),
          name: W
        })),
        onDeleteSession: t[11] || (t[11] = (y) => $("fourth-wall/delete-session", I(y))),
        onOpenPrompts: t[12] || (t[12] = (y) => p.value = !0)
      }, null, 8, [
        "chat",
        "global",
        "busy"
      ])) : A("", !0),
      p.value ? (m(), j(qe, {
        key: 2,
        templates: r.value.global.promptTemplates,
        onClose: t[13] || (t[13] = (y) => p.value = !1),
        onSave: t[14] || (t[14] = (y) => {
          u({ promptTemplates: y }), p.value = !1;
        }),
        onRestore: t[15] || (t[15] = () => {
          $("fourth-wall/restore-prompts", I()), p.value = !1;
        })
      }, null, 8, ["templates"])) : A("", !0)
    ]));
  }
}), gt = vt;
export {
  gt as default
};
