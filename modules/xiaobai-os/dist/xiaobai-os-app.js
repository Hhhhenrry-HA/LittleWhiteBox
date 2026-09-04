/* eslint-disable */
import { $ as Y, A as _, C as ne, E as U, N as se, O as W, Q as N, S as G, _ as oe, a as Z, c as C, et as $, f as le, g as ue, j as pe, l as m, m as P, o, p as z, r as Q, s as X, v as de, w as ce, x as c, y as ve } from "./xiaobai-os-runtime-core.esm-bundler-Dmqi2Zbl.js";
import { c as fe, n as me, t as he } from "./xiaobai-os-runtime-dom.esm-bundler-BYy7nd4d.js";
var be = [
  "agent-api",
  "fourth-wall",
  "wallet",
  "shop",
  "bank",
  "game",
  "map",
  "tasks"
], ye = Object.freeze({
  id: "agent-api",
  name: "Agent API",
  accent: "#63d8c6"
}), ge = Object.freeze({
  id: "bank",
  name: "银行",
  accent: "#b89a58"
}), Ae = Object.freeze({
  id: "fourth-wall",
  name: "四次元壁",
  accent: "#7567d8"
}), _e = Object.freeze({
  id: "game",
  name: "游戏",
  accent: "#c8a35a"
}), Se = Object.freeze({
  id: "map",
  name: "地图",
  accent: "#3aa9ff"
}), we = Object.freeze({
  id: "shop",
  name: "奇物商店",
  accent: "#a83b32"
}), ke = Object.freeze({
  id: "tasks",
  name: "任务",
  accent: "#e8b84a"
}), Oe = Object.freeze({
  id: "wallet",
  name: "钱包",
  accent: "#a9660f"
});
function Me(a) {
  let t = null, i = null;
  return Object.freeze({
    load() {
      return t ? Promise.resolve(t) : (i ??= a().then((r) => {
        if (!r?.default) throw new Error("app_component_missing");
        return t = r.default, t;
      }).catch((r) => {
        throw i = null, r;
      }), i);
    },
    reset() {
      t = null, i = null;
    }
  });
}
function O(a, t, i) {
  const r = Me(i);
  return Object.freeze({
    ...a,
    iconPaths: Object.freeze([...t]),
    load: r.load,
    resetLoader: r.reset
  });
}
var Ee = Object.freeze({
  "agent-api": O(ye, ["M14 11h36a4 4 0 0 1 4 4v34a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V15a4 4 0 0 1 4-4z", "M19 24h26M19 34h18M19 44h11M45 44h.1"], () => import("./xiaobai-os-AgentApiApp-BrtBrc5-.js")),
  "fourth-wall": O(Ae, ["M13 15h38v29H32l-12 9 3-9H13z", "M22 25h20M22 33h14"], () => import("./xiaobai-os-FourthWallApp-HSJxcdSt.js")),
  wallet: O(Oe, ["M12 19.5h37a5 5 0 0 1 5 5v24a5 5 0 0 1-5 5H15a5 5 0 0 1-5-5v-30a8 8 0 0 1 8-8h27", "M54 30H42a6 6 0 0 0 0 12h12M43 36h.1"], () => import("./xiaobai-os-WalletApp-iXb6S0sh.js")),
  shop: O(we, ["M14 19h36l-3 35H17z", "M11 19h42M19 19V11h26v8M23 29h18M22 38h20M21 47h22"], () => import("./xiaobai-os-ShopApp-DMALoGOc.js")),
  bank: O(ge, ["M9 24h46L32 9z", "M14 52h36M18 24v28M28 24v28M38 24v28M48 24v28"], () => import("./xiaobai-os-BankApp-vbt7TXuR.js")),
  game: O(_e, ["M15 12h34a6 6 0 0 1 6 6v28a6 6 0 0 1-6 6H15a6 6 0 0 1-6-6V18a6 6 0 0 1 6-6z", "M21 23h.1M43 23h.1M32 32h.1M21 41h.1M43 41h.1"], () => import("./xiaobai-os-GameApp-NkkX-O41.js")),
  map: O(Se, ["M11 16l13-6 16 6 13-6v38l-13 6-16-6-13 6z", "M24 10v38M40 16v38M18 31l6-3 8 3 8-4 7 3"], () => import("./xiaobai-os-MapApp-B1mmNdSx.js")),
  tasks: O(ke, [
    "M17 12h30a5 5 0 0 1 5 5v35H12V17a5 5 0 0 1 5-5z",
    "M21 23h22M21 32h22M21 41h14",
    "M18 9h28v8H18z"
  ], () => import("./xiaobai-os-TasksApp-D9aHBGuf.js"))
}), ee = Object.freeze(be.map((a) => {
  const t = Ee[a];
  if (!t) throw new Error(`missing_shell_app:${a}`);
  return t;
})), oa = Object.freeze(ee.map((a) => a.id)), Pe = /* @__PURE__ */ P({
  __name: "AppBoundary",
  emits: ["failed"],
  setup(a, { emit: t }) {
    const i = t;
    return de((r) => (i("failed", r), !1)), (r, n) => ne(r.$slots, "default");
  }
}), Re = Pe, xe = { class: "xiaobai-os-home" }, Ie = ["src"], $e = {
  class: "xiaobai-os-app-grid",
  "aria-label": "应用"
}, Ce = ["onClick"], He = {
  class: "xiaobai-os-app-icon",
  "aria-hidden": "true"
}, Te = { viewBox: "0 0 64 64" }, ze = ["d"], Be = { class: "xiaobai-os-app-name" }, qe = /* @__PURE__ */ P({
  __name: "XiaobaiOsHome",
  props: {
    apps: {},
    characterAvatar: {}
  },
  emits: ["openApp"],
  setup(a) {
    return (t, i) => (c(), m("main", xe, [
      a.characterAvatar ? (c(), m("img", {
        key: 0,
        class: "xiaobai-os-wallpaper",
        src: a.characterAvatar,
        alt: ""
      }, null, 8, Ie)) : C("", !0),
      i[0] || (i[0] = o("div", {
        class: "xiaobai-os-home-wash",
        "aria-hidden": "true"
      }, null, -1)),
      o("section", $e, [(c(!0), m(Q, null, G(a.apps, (r) => (c(), m("button", {
        key: r.id,
        type: "button",
        class: "xiaobai-os-app-tile",
        style: Y({ "--app-accent": r.accent }),
        onClick: (n) => t.$emit("openApp", r)
      }, [o("span", He, [(c(), m("svg", Te, [(c(!0), m(Q, null, G(r.iconPaths, (n) => (c(), m("path", {
        key: n,
        d: n
      }, null, 8, ze))), 128))]))]), o("span", Be, $(r.name), 1)], 12, Ce))), 128))])
    ]));
  }
}), Le = qe, je = ["disabled"], De = {
  key: 0,
  "aria-hidden": "true"
}, Fe = /* @__PURE__ */ P({
  __name: "XiaobaiOsNavigation",
  props: { isHome: { type: Boolean } },
  emits: [
    "back",
    "home",
    "close"
  ],
  setup(a) {
    return (t, i) => (c(), m("nav", {
      class: N(["xiaobai-os-navigation", { "is-home": a.isHome }]),
      "aria-label": "系统导航"
    }, [
      o("button", {
        type: "button",
        class: "xiaobai-os-nav-button",
        disabled: a.isHome,
        "aria-label": "返回",
        onClick: i[0] || (i[0] = (r) => t.$emit("back"))
      }, [...i[3] || (i[3] = [o("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, [o("path", { d: "m14.5 6-6 6 6 6" })], -1)])], 8, je),
      o("button", {
        type: "button",
        class: "xiaobai-os-nav-button xiaobai-os-home-button",
        "aria-label": "主页",
        onClick: i[1] || (i[1] = (r) => t.$emit("home"))
      }, [i[4] || (i[4] = o("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, [o("path", { d: "m4.5 11 7.5-6 7.5 6v8h-5v-5h-5v5h-5z" })], -1)), a.isHome ? (c(), m("i", De)) : C("", !0)]),
      o("button", {
        type: "button",
        class: "xiaobai-os-nav-button xiaobai-os-close-button",
        "aria-label": "关闭",
        onClick: i[2] || (i[2] = (r) => t.$emit("close"))
      }, [...i[5] || (i[5] = [o("span", null, [o("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, [o("path", { d: "m7 9.5 5 5 5-5" })])], -1)])])
    ], 2));
  }
}), Xe = Fe, Ne = /* @__PURE__ */ P({
  __name: "XiaobaiOsSystemBar",
  props: { isHome: { type: Boolean } },
  setup(a) {
    return (t, i) => (c(), m("header", {
      class: N(["xiaobai-os-system-bar", { "is-home": a.isHome }]),
      "aria-label": "系统状态"
    }, [...i[0] || (i[0] = [o("span", { class: "xiaobai-os-system-mark" }, "小白", -1), o("span", {
      class: "xiaobai-os-system-status",
      "aria-hidden": "true"
    }, [o("span", { class: "xiaobai-os-signal" }, [
      o("i"),
      o("i"),
      o("i"),
      o("i")
    ]), o("span", { class: "xiaobai-os-battery" }, [o("i")])], -1)])], 2));
  }
}), Ke = Ne, Ve = { class: "xiaobai-os-device" }, Ue = { class: "xiaobai-os-glass" }, We = {
  key: "failure",
  class: "xiaobai-os-app-failure",
  role: "alert"
}, Ge = { class: "xiaobai-os-app-failure-actions" }, Qe = {
  key: "loading",
  class: "xiaobai-os-app-loading",
  role: "status"
}, Je = /* @__PURE__ */ P({
  __name: "XiaobaiOsDevice",
  props: {
    apps: {},
    activeApp: {},
    activeComponent: {},
    activeState: {},
    appFailure: {},
    appLoading: { type: Boolean },
    appRenderKey: {},
    bridge: {},
    characterAvatar: {}
  },
  emits: [
    "openApp",
    "back",
    "home",
    "close",
    "renderFailed",
    "retry",
    "reload"
  ],
  setup(a) {
    const t = a, i = Z(() => t.activeApp === null);
    return (r, n) => (c(), m("div", Ve, [n[9] || (n[9] = o("span", {
      class: "xiaobai-os-side-key",
      "aria-hidden": "true"
    }, null, -1)), o("div", Ue, [
      z(Ke, { "is-home": i.value }, null, 8, ["is-home"]),
      o("div", {
        class: "xiaobai-os-stage",
        style: Y(a.activeApp ? { "--app-accent": a.activeApp.accent } : null)
      }, [z(he, {
        name: "xiaobai-os-route",
        mode: "out-in"
      }, {
        default: U(() => [i.value ? (c(), X(Le, {
          key: "home",
          apps: a.apps,
          "character-avatar": a.characterAvatar,
          onOpenApp: n[0] || (n[0] = (y) => r.$emit("openApp", y))
        }, null, 8, ["apps", "character-avatar"])) : a.appFailure ? (c(), m("section", We, [
          n[7] || (n[7] = o("span", {
            class: "xiaobai-os-app-failure-mark",
            "aria-hidden": "true"
          }, "!", -1)),
          o("h1", null, $(a.activeApp?.name) + "暂时无法打开", 1),
          o("p", null, $(a.appFailure.message), 1),
          o("div", Ge, [a.appFailure.retryable ? (c(), m("button", {
            key: 0,
            type: "button",
            onClick: n[1] || (n[1] = (y) => r.$emit("retry"))
          }, "重试")) : C("", !0), o("button", {
            type: "button",
            onClick: n[2] || (n[2] = (y) => r.$emit("reload"))
          }, "重新载入 OS")])
        ])) : a.appLoading ? (c(), m("div", Qe, [n[8] || (n[8] = o("span", { "aria-hidden": "true" }, null, -1)), le(" 正在打开" + $(a.activeApp?.name), 1)])) : a.activeApp && a.activeComponent ? (c(), m("div", {
          key: `app:${a.activeApp.id}:${a.appRenderKey}`,
          class: "xiaobai-os-app-route"
        }, [z(Re, { onFailed: n[3] || (n[3] = (y) => r.$emit("renderFailed", y)) }, {
          default: U(() => [(c(), X(ce(a.activeComponent), {
            bridge: a.bridge,
            "initial-state": a.activeState
          }, null, 8, ["bridge", "initial-state"]))]),
          _: 1
        })])) : C("", !0)]),
        _: 1
      })], 4),
      z(Xe, {
        "is-home": i.value,
        onBack: n[4] || (n[4] = (y) => r.$emit("back")),
        onHome: n[5] || (n[5] = (y) => r.$emit("home")),
        onClose: n[6] || (n[6] = (y) => r.$emit("close"))
      }, null, 8, ["is-home"])
    ])]));
  }
}), Ye = Je, Ze = "LittleWhiteBox-XiaobaiOS", B = class extends Error {
  code;
  phase;
  retryable;
  requiresAppRetry;
  constructor(a) {
    super(a.message || a.error || "host_request_failed"), this.name = "HostRequestError", this.code = a.error || "host_request_failed", this.phase = a.phase || "host", this.retryable = a.retryable !== !1, this.requiresAppRetry = a.requiresAppRetry === !0;
  }
};
function J() {
  return `xiaobai-os-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function ea() {
  const a = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Set();
  let i = !1, r = null;
  function n(s, b = {}, u = "") {
    const l = r && s !== "app/activate" && s !== "app/retry" && s !== "os/frame-ready" && s !== "os/close", x = l && !u ? J() : u;
    parent.postMessage({
      source: Ze,
      type: s,
      requestId: x,
      ...l ? r : {},
      payload: b
    }, window.location.origin);
  }
  function y(s) {
    const b = String(s.requestId || "");
    if (!b) return !1;
    const u = a.get(b);
    if (!u || u.session && (s.appId !== u.session.appId || s.activationToken !== u.session.activationToken)) return !1;
    a.delete(b), clearTimeout(u.timer);
    const l = s.payload;
    return l?.ok === !1 ? u.reject(new B(l)) : u.resolve(l), !0;
  }
  function R(s) {
    s.origin !== window.location.origin || s.source !== parent || s.data?.source !== "LittleWhiteBox-XiaobaiOS" || typeof s.data.type != "string" || y(s.data) || t.forEach((b) => b(s.data));
  }
  function v() {
    i || (i = !0, window.addEventListener("message", R), n("os/frame-ready"));
  }
  function S(s, b = {}, u = 15e3) {
    const l = J();
    return new Promise((x, I) => {
      const q = setTimeout(() => {
        a.delete(l), I(/* @__PURE__ */ new Error("host_request_timeout"));
      }, u);
      a.set(l, {
        resolve: x,
        reject: I,
        timer: q,
        session: r ? { ...r } : null
      }), n(s, b, l);
    });
  }
  function w(s) {
    r = Object.freeze({ ...s });
  }
  function h() {
    const s = r;
    if (r = null, !!s)
      for (const [b, u] of a)
        u.session?.activationToken === s.activationToken && (clearTimeout(u.timer), u.reject(/* @__PURE__ */ new Error("app_inactive")), a.delete(b));
  }
  function d() {
    return r ? { ...r } : null;
  }
  function H(s) {
    return t.add(s), () => t.delete(s);
  }
  function M() {
    i && window.removeEventListener("message", R), i = !1, t.clear(), a.forEach((s) => {
      clearTimeout(s.timer), s.reject(/* @__PURE__ */ new Error("frame_bridge_disposed"));
    }), a.clear(), r = null;
  }
  return Object.freeze({
    start: v,
    post: n,
    request: S,
    subscribe: H,
    setAppSession: w,
    clearAppSession: h,
    getAppSession: d,
    dispose: M
  });
}
var aa = {
  key: 0,
  class: "xiaobai-os-error",
  role: "alert"
}, ta = {
  key: 1,
  class: "xiaobai-os-loading",
  role: "status"
}, ra = /* @__PURE__ */ P({
  __name: "App",
  setup(a) {
    const t = ea(), i = _(null), r = _(!1), n = _("light"), y = _(/* @__PURE__ */ new Set()), R = _(""), v = _(null), S = pe(null), w = _(null), h = _(!1), d = _(null), H = _(0), M = _("");
    let s = null, b = () => {
    }, u = 0, l = null;
    const x = Z(() => ee.filter((e) => y.value.has(e.id)));
    function I(e) {
      const p = new Set(e.map((k) => String(k.id))), f = v.value && !p.has(v.value.id), A = l && !p.has(l.appId);
      y.value = p, !(!f && !A) && (u += 1, l = null, v.value = null, S.value = null, w.value = null, h.value = !1, d.value = null, t.clearAppSession());
    }
    function q(e) {
      u += 1, l = null, n.value = e.theme === "dark" ? "dark" : "light", I(e.apps || []), R.value = String(e.chat?.characterAvatar || ""), v.value = null, S.value = null, w.value = null, h.value = !1, d.value = null, t.clearAppSession(), r.value = !0;
    }
    function ae(e) {
      if (e.type === "os/init" && q(e.payload || {}), e.type === "os/theme-changed" && (n.value = e.payload?.theme === "dark" ? "dark" : "light"), e.type === "os/apps-changed") {
        const A = e.payload;
        I(A?.apps || []);
      }
      if (e.type === "os/app-state") {
        const A = e.payload, k = A?.status;
        A?.appId === v.value?.id && k?.state === "failed" && (h.value = !1, d.value = {
          phase: k.failure?.phase || "host",
          message: k.failure?.message || "Host APP 运行失败",
          retryable: k.failure?.retryable !== !1,
          requiresAppRetry: !0
        }, t.clearAppSession());
      }
      e.type === "os/error" && (M.value = String(e.payload?.message || "小白 OS 初始化失败"));
      const p = e.payload?.state;
      l && e.appId === l.appId && e.type === `${l.appId}/state` && (l.latestState = p);
      const f = t.getAppSession();
      v.value && f?.appId === v.value.id && e.appId === f.appId && e.activationToken === f.activationToken && e.type === `${v.value.id}/state` && (w.value = p);
    }
    async function L(e) {
      const p = ++u, f = { appId: e.id };
      l = f, v.value = e, S.value = null, w.value = null, h.value = !0, d.value = null, t.clearAppSession(), M.value = "";
      const A = t.request("app/activate", { appId: e.id }), k = e.load(), [E, T] = await Promise.allSettled([A, k]);
      try {
        if (p !== u) return;
        if (E.status === "fulfilled") {
          if (E.value.appId !== e.id || !E.value.activationToken) throw new Error("app_activation_mismatch");
          t.setAppSession({
            appId: e.id,
            activationToken: E.value.activationToken
          }), w.value = f.latestState ?? E.value.state ?? null;
        } else {
          const g = E.reason;
          d.value = {
            phase: g instanceof B ? g.phase : "host",
            message: g instanceof Error ? g.message : String(g),
            retryable: !(g instanceof B) || g.retryable,
            requiresAppRetry: g instanceof B && g.requiresAppRetry
          };
        }
        T.status === "fulfilled" ? S.value = W(T.value) : d.value || (d.value = {
          phase: "ui-load",
          message: T.reason instanceof Error ? T.reason.message : "APP 界面加载失败",
          retryable: !0
        }), h.value = !1;
      } catch (g) {
        h.value = !1, d.value = {
          phase: "host",
          message: g instanceof Error ? g.message : String(g),
          retryable: !0
        }, t.clearAppSession();
      } finally {
        l === f && (l = null);
      }
    }
    async function te() {
      const e = v.value, p = d.value;
      if (!(!e || !p)) {
        if (p.phase === "ui-render") {
          d.value = null, H.value += 1;
          return;
        }
        if (p.phase === "ui-load" && t.getAppSession()?.appId === e.id) {
          h.value = !0, d.value = null, e.resetLoader();
          try {
            S.value = W(await e.load());
          } catch (f) {
            d.value = {
              phase: "ui-load",
              message: f instanceof Error ? f.message : "APP 界面加载失败",
              retryable: !0
            };
          } finally {
            h.value = !1;
          }
          return;
        }
        if ((p.phase === "activate" || p.phase === "host") && !p.requiresAppRetry) {
          await L(e);
          return;
        }
        h.value = !0, d.value = null;
        try {
          await t.request("app/retry", { appId: e.id }), await L(e);
        } catch (f) {
          h.value = !1, d.value = {
            phase: "host",
            message: f instanceof Error ? f.message : String(f),
            retryable: !0
          };
        }
      }
    }
    function j(e) {
      const p = v.value;
      p && (d.value = {
        phase: "ui-render",
        message: e instanceof Error ? e.message : "APP 界面渲染失败",
        retryable: !0
      }, t.post("os/app-ui-failure", {
        appId: p.id,
        phase: "ui-render"
      }));
    }
    function K(e) {
      !v.value || h.value || d.value || (e.preventDefault(), j(e.error ?? new Error(e.message || "APP 界面运行失败")));
    }
    function V(e) {
      !v.value || h.value || d.value || (e.preventDefault(), j(e.reason));
    }
    function re() {
      window.location.reload();
    }
    function D() {
      u += 1, l = null, t.post("app/deactivate", { appId: v.value?.id || "" }), t.clearAppSession(), v.value = null, S.value = null, w.value = null, h.value = !1, d.value = null;
    }
    function F() {
      u += 1, l = null, t.post("os/close"), t.clearAppSession();
    }
    function ie(e) {
      if (e.key === "Escape") {
        e.preventDefault(), v.value ? D() : F();
        return;
      }
      if (e.key !== "Tab" || !i.value) return;
      const p = Array.from(i.value.querySelectorAll('button:not(:disabled), [href], input:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'));
      if (p.length === 0) return;
      const f = p[0], A = p[p.length - 1];
      e.shiftKey && document.activeElement === f ? (e.preventDefault(), A.focus()) : !e.shiftKey && document.activeElement === A && (e.preventDefault(), f.focus());
    }
    return ve(async () => {
      s = document.activeElement instanceof HTMLElement ? document.activeElement : null, b = t.subscribe(ae), t.start(), window.addEventListener("error", K), window.addEventListener("unhandledrejection", V), await ue(), i.value?.focus();
    }), oe(() => {
      u += 1, l = null, window.removeEventListener("error", K), window.removeEventListener("unhandledrejection", V), b(), t.dispose(), s?.focus();
    }), (e, p) => (c(), m("main", {
      ref_key: "root",
      ref: i,
      class: N(["xiaobai-os-shell", `theme-${n.value}`]),
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "小白 OS",
      tabindex: "-1",
      onKeydown: ie,
      onClick: fe(F, ["self"])
    }, [M.value ? (c(), m("div", aa, $(M.value), 1)) : C("", !0), r.value ? (c(), X(Ye, {
      key: 2,
      apps: x.value,
      "active-app": v.value,
      "active-component": S.value,
      "active-state": w.value,
      "app-failure": d.value,
      "app-loading": h.value,
      "app-render-key": H.value,
      bridge: se(t),
      "character-avatar": R.value,
      onOpenApp: L,
      onBack: D,
      onHome: D,
      onClose: F,
      onRenderFailed: j,
      onRetry: te,
      onReload: re
    }, null, 8, [
      "apps",
      "active-app",
      "active-component",
      "active-state",
      "app-failure",
      "app-loading",
      "app-render-key",
      "bridge",
      "character-avatar"
    ])) : (c(), m("div", ta, "正在启动小白 OS"))], 34));
  }
}), ia = ra;
me(ia).mount("#app");
