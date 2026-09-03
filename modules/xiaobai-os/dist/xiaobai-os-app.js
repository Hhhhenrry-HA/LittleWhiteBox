/* eslint-disable */
import { $ as Y, A as _, C as re, E as U, N as oe, O as W, Q as X, S as G, _ as se, a as Z, c as C, et as $, f as le, g as ue, j as pe, l as m, m as P, o as s, p as F, r as Q, s as z, v as de, w as ce, x as c, y as ve } from "./xiaobai-os-runtime-core.esm-bundler-Dmqi2Zbl.js";
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
  let t = null, n = null;
  return Object.freeze({
    load() {
      return t ? Promise.resolve(t) : (n ??= a().then((i) => {
        if (!i?.default) throw new Error("app_component_missing");
        return t = i.default, t;
      }).catch((i) => {
        throw n = null, i;
      }), n);
    },
    reset() {
      t = null, n = null;
    }
  });
}
function O(a, t, n) {
  const i = Me(n);
  return Object.freeze({
    ...a,
    iconPaths: Object.freeze([...t]),
    load: i.load,
    resetLoader: i.reset
  });
}
var Ee = Object.freeze({
  "agent-api": O(ye, ["M14 11h36a4 4 0 0 1 4 4v34a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V15a4 4 0 0 1 4-4z", "M19 24h26M19 34h18M19 44h11M45 44h.1"], () => import("./xiaobai-os-AgentApiApp-DlHFLJU9.js")),
  "fourth-wall": O(Ae, ["M13 15h38v29H32l-12 9 3-9H13z", "M22 25h20M22 33h14"], () => import("./xiaobai-os-FourthWallApp-HSJxcdSt.js")),
  wallet: O(Oe, ["M12 19.5h37a5 5 0 0 1 5 5v24a5 5 0 0 1-5 5H15a5 5 0 0 1-5-5v-30a8 8 0 0 1 8-8h27", "M54 30H42a6 6 0 0 0 0 12h12M43 36h.1"], () => import("./xiaobai-os-WalletApp-iXb6S0sh.js")),
  shop: O(we, ["M14 19h36l-3 35H17z", "M11 19h42M19 19V11h26v8M23 29h18M22 38h20M21 47h22"], () => import("./xiaobai-os-ShopApp-DMALoGOc.js")),
  bank: O(ge, ["M9 24h46L32 9z", "M14 52h36M18 24v28M28 24v28M38 24v28M48 24v28"], () => import("./xiaobai-os-BankApp-vbt7TXuR.js")),
  game: O(_e, ["M15 12h34a6 6 0 0 1 6 6v28a6 6 0 0 1-6 6H15a6 6 0 0 1-6-6V18a6 6 0 0 1 6-6z", "M21 23h.1M43 23h.1M32 32h.1M21 41h.1M43 41h.1"], () => import("./xiaobai-os-GameApp-Dj31T7P7.js")),
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
})), sa = Object.freeze(ee.map((a) => a.id)), Pe = /* @__PURE__ */ P({
  __name: "AppBoundary",
  emits: ["failed"],
  setup(a, { emit: t }) {
    const n = t;
    return de((i) => (n("failed", i), !1)), (i, r) => re(i.$slots, "default");
  }
}), Ie = Pe, xe = { class: "xiaobai-os-home" }, Re = ["src"], $e = {
  class: "xiaobai-os-app-grid",
  "aria-label": "应用"
}, Ce = ["onClick"], He = {
  class: "xiaobai-os-app-icon",
  "aria-hidden": "true"
}, Te = { viewBox: "0 0 64 64" }, ze = ["d"], Be = { class: "xiaobai-os-app-name" }, Le = /* @__PURE__ */ P({
  __name: "XiaobaiOsHome",
  props: {
    apps: {},
    characterAvatar: {}
  },
  emits: ["openApp"],
  setup(a) {
    return (t, n) => (c(), m("main", xe, [
      a.characterAvatar ? (c(), m("img", {
        key: 0,
        class: "xiaobai-os-wallpaper",
        src: a.characterAvatar,
        alt: ""
      }, null, 8, Re)) : C("", !0),
      n[0] || (n[0] = s("div", {
        class: "xiaobai-os-home-wash",
        "aria-hidden": "true"
      }, null, -1)),
      s("section", $e, [(c(!0), m(Q, null, G(a.apps, (i) => (c(), m("button", {
        key: i.id,
        type: "button",
        class: "xiaobai-os-app-tile",
        style: Y({ "--app-accent": i.accent }),
        onClick: (r) => t.$emit("openApp", i)
      }, [s("span", He, [(c(), m("svg", Te, [(c(!0), m(Q, null, G(i.iconPaths, (r) => (c(), m("path", {
        key: r,
        d: r
      }, null, 8, ze))), 128))]))]), s("span", Be, $(i.name), 1)], 12, Ce))), 128))])
    ]));
  }
}), je = Le, De = ["disabled"], Fe = {
  key: 0,
  "aria-hidden": "true"
}, qe = /* @__PURE__ */ P({
  __name: "XiaobaiOsNavigation",
  props: { isHome: { type: Boolean } },
  emits: [
    "back",
    "home",
    "close"
  ],
  setup(a) {
    return (t, n) => (c(), m("nav", {
      class: X(["xiaobai-os-navigation", { "is-home": a.isHome }]),
      "aria-label": "系统导航"
    }, [
      s("button", {
        type: "button",
        class: "xiaobai-os-nav-button",
        disabled: a.isHome,
        "aria-label": "返回",
        onClick: n[0] || (n[0] = (i) => t.$emit("back"))
      }, [...n[3] || (n[3] = [s("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, [s("path", { d: "m14.5 6-6 6 6 6" })], -1)])], 8, De),
      s("button", {
        type: "button",
        class: "xiaobai-os-nav-button xiaobai-os-home-button",
        "aria-label": "主页",
        onClick: n[1] || (n[1] = (i) => t.$emit("home"))
      }, [n[4] || (n[4] = s("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, [s("path", { d: "m4.5 11 7.5-6 7.5 6v8h-5v-5h-5v5h-5z" })], -1)), a.isHome ? (c(), m("i", Fe)) : C("", !0)]),
      s("button", {
        type: "button",
        class: "xiaobai-os-nav-button xiaobai-os-close-button",
        "aria-label": "关闭",
        onClick: n[2] || (n[2] = (i) => t.$emit("close"))
      }, [...n[5] || (n[5] = [s("span", null, [s("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, [s("path", { d: "m7 9.5 5 5 5-5" })])], -1)])])
    ], 2));
  }
}), Xe = qe, Ne = /* @__PURE__ */ P({
  __name: "XiaobaiOsSystemBar",
  props: { isHome: { type: Boolean } },
  setup(a) {
    return (t, n) => (c(), m("header", {
      class: X(["xiaobai-os-system-bar", { "is-home": a.isHome }]),
      "aria-label": "系统状态"
    }, [...n[0] || (n[0] = [s("span", { class: "xiaobai-os-system-mark" }, "小白", -1), s("span", {
      class: "xiaobai-os-system-status",
      "aria-hidden": "true"
    }, [s("span", { class: "xiaobai-os-signal" }, [
      s("i"),
      s("i"),
      s("i"),
      s("i")
    ]), s("span", { class: "xiaobai-os-battery" }, [s("i")])], -1)])], 2));
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
    const t = a, n = Z(() => t.activeApp === null);
    return (i, r) => (c(), m("div", Ve, [r[9] || (r[9] = s("span", {
      class: "xiaobai-os-side-key",
      "aria-hidden": "true"
    }, null, -1)), s("div", Ue, [
      F(Ke, { "is-home": n.value }, null, 8, ["is-home"]),
      s("div", {
        class: "xiaobai-os-stage",
        style: Y(a.activeApp ? { "--app-accent": a.activeApp.accent } : null)
      }, [F(he, {
        name: "xiaobai-os-route",
        mode: "out-in"
      }, {
        default: U(() => [n.value ? (c(), z(je, {
          key: "home",
          apps: a.apps,
          "character-avatar": a.characterAvatar,
          onOpenApp: r[0] || (r[0] = (y) => i.$emit("openApp", y))
        }, null, 8, ["apps", "character-avatar"])) : a.appFailure ? (c(), m("section", We, [
          r[7] || (r[7] = s("span", {
            class: "xiaobai-os-app-failure-mark",
            "aria-hidden": "true"
          }, "!", -1)),
          s("h1", null, $(a.activeApp?.name) + "暂时无法打开", 1),
          s("p", null, $(a.appFailure.message), 1),
          s("div", Ge, [a.appFailure.retryable ? (c(), m("button", {
            key: 0,
            type: "button",
            onClick: r[1] || (r[1] = (y) => i.$emit("retry"))
          }, "重试")) : C("", !0), s("button", {
            type: "button",
            onClick: r[2] || (r[2] = (y) => i.$emit("reload"))
          }, "重新载入 OS")])
        ])) : a.appLoading ? (c(), m("div", Qe, [r[8] || (r[8] = s("span", { "aria-hidden": "true" }, null, -1)), le(" 正在打开" + $(a.activeApp?.name), 1)])) : a.activeApp && a.activeComponent ? (c(), z(Ie, {
          key: a.appRenderKey,
          onFailed: r[3] || (r[3] = (y) => i.$emit("renderFailed", y))
        }, {
          default: U(() => [(c(), z(ce(a.activeComponent), {
            bridge: a.bridge,
            "initial-state": a.activeState
          }, null, 8, ["bridge", "initial-state"]))]),
          _: 1
        })) : C("", !0)]),
        _: 1
      })], 4),
      F(Xe, {
        "is-home": n.value,
        onBack: r[4] || (r[4] = (y) => i.$emit("back")),
        onHome: r[5] || (r[5] = (y) => i.$emit("home")),
        onClose: r[6] || (r[6] = (y) => i.$emit("close"))
      }, null, 8, ["is-home"])
    ])]));
  }
}), Ye = Je, Ze = "LittleWhiteBox-XiaobaiOS", q = class extends Error {
  code;
  phase;
  retryable;
  constructor(a) {
    super(a.message || a.error || "host_request_failed"), this.name = "HostRequestError", this.code = a.error || "host_request_failed", this.phase = a.phase || "host", this.retryable = a.retryable !== !1;
  }
};
function J() {
  return `xiaobai-os-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function ea() {
  const a = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Set();
  let n = !1, i = null;
  function r(o, b = {}, u = "") {
    const l = i && o !== "app/activate" && o !== "app/retry" && o !== "os/frame-ready" && o !== "os/close", x = l && !u ? J() : u;
    parent.postMessage({
      source: Ze,
      type: o,
      requestId: x,
      ...l ? i : {},
      payload: b
    }, window.location.origin);
  }
  function y(o) {
    const b = String(o.requestId || "");
    if (!b) return !1;
    const u = a.get(b);
    if (!u || u.session && (o.appId !== u.session.appId || o.activationToken !== u.session.activationToken)) return !1;
    a.delete(b), clearTimeout(u.timer);
    const l = o.payload;
    return l?.ok === !1 ? u.reject(new q(l)) : u.resolve(l), !0;
  }
  function I(o) {
    o.origin !== window.location.origin || o.source !== parent || o.data?.source !== "LittleWhiteBox-XiaobaiOS" || typeof o.data.type != "string" || y(o.data) || t.forEach((b) => b(o.data));
  }
  function v() {
    n || (n = !0, window.addEventListener("message", I), r("os/frame-ready"));
  }
  function S(o, b = {}, u = 15e3) {
    const l = J();
    return new Promise((x, R) => {
      const B = setTimeout(() => {
        a.delete(l), R(/* @__PURE__ */ new Error("host_request_timeout"));
      }, u);
      a.set(l, {
        resolve: x,
        reject: R,
        timer: B,
        session: i ? { ...i } : null
      }), r(o, b, l);
    });
  }
  function w(o) {
    i = Object.freeze({ ...o });
  }
  function h() {
    const o = i;
    if (i = null, !!o)
      for (const [b, u] of a)
        u.session?.activationToken === o.activationToken && (clearTimeout(u.timer), u.reject(/* @__PURE__ */ new Error("app_inactive")), a.delete(b));
  }
  function p() {
    return i ? { ...i } : null;
  }
  function H(o) {
    return t.add(o), () => t.delete(o);
  }
  function M() {
    n && window.removeEventListener("message", I), n = !1, t.clear(), a.forEach((o) => {
      clearTimeout(o.timer), o.reject(/* @__PURE__ */ new Error("frame_bridge_disposed"));
    }), a.clear(), i = null;
  }
  return Object.freeze({
    start: v,
    post: r,
    request: S,
    subscribe: H,
    setAppSession: w,
    clearAppSession: h,
    getAppSession: p,
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
}, ia = /* @__PURE__ */ P({
  __name: "App",
  setup(a) {
    const t = ea(), n = _(null), i = _(!1), r = _("light"), y = _(/* @__PURE__ */ new Set()), I = _(""), v = _(null), S = pe(null), w = _(null), h = _(!1), p = _(null), H = _(0), M = _("");
    let o = null, b = () => {
    }, u = 0, l = null;
    const x = Z(() => ee.filter((e) => y.value.has(e.id)));
    function R(e) {
      const d = new Set(e.map((k) => String(k.id))), f = v.value && !d.has(v.value.id), g = l && !d.has(l.appId);
      y.value = d, !(!f && !g) && (u += 1, l = null, v.value = null, S.value = null, w.value = null, h.value = !1, p.value = null, t.clearAppSession());
    }
    function B(e) {
      u += 1, l = null, r.value = e.theme === "dark" ? "dark" : "light", R(e.apps || []), I.value = String(e.chat?.characterAvatar || ""), v.value = null, S.value = null, w.value = null, h.value = !1, p.value = null, t.clearAppSession(), i.value = !0;
    }
    function ae(e) {
      if (e.type === "os/init" && B(e.payload || {}), e.type === "os/theme-changed" && (r.value = e.payload?.theme === "dark" ? "dark" : "light"), e.type === "os/apps-changed") {
        const g = e.payload;
        R(g?.apps || []);
      }
      if (e.type === "os/app-state") {
        const g = e.payload, k = g?.status;
        g?.appId === v.value?.id && k?.state === "failed" && (h.value = !1, p.value = {
          phase: k.failure?.phase || "host",
          message: k.failure?.message || "Host APP 运行失败",
          retryable: k.failure?.retryable !== !1
        }, t.clearAppSession());
      }
      e.type === "os/error" && (M.value = String(e.payload?.message || "小白 OS 初始化失败"));
      const d = e.payload?.state;
      l && e.appId === l.appId && e.type === `${l.appId}/state` && (l.latestState = d);
      const f = t.getAppSession();
      v.value && f?.appId === v.value.id && e.appId === f.appId && e.activationToken === f.activationToken && e.type === `${v.value.id}/state` && (w.value = d);
    }
    async function N(e) {
      const d = ++u, f = { appId: e.id };
      l = f, v.value = e, S.value = null, w.value = null, h.value = !0, p.value = null, t.clearAppSession(), M.value = "";
      const g = t.request("app/activate", { appId: e.id }), k = e.load(), [E, T] = await Promise.allSettled([g, k]);
      try {
        if (d !== u) return;
        if (E.status === "fulfilled") {
          if (E.value.appId !== e.id || !E.value.activationToken) throw new Error("app_activation_mismatch");
          t.setAppSession({
            appId: e.id,
            activationToken: E.value.activationToken
          }), w.value = f.latestState ?? E.value.state ?? null;
        } else {
          const A = E.reason;
          p.value = {
            phase: A instanceof q ? A.phase : "host",
            message: A instanceof Error ? A.message : String(A),
            retryable: !(A instanceof q) || A.retryable
          };
        }
        T.status === "fulfilled" ? S.value = W(T.value) : p.value || (p.value = {
          phase: "ui-load",
          message: T.reason instanceof Error ? T.reason.message : "APP 界面加载失败",
          retryable: !0
        }), h.value = !1;
      } catch (A) {
        h.value = !1, p.value = {
          phase: "host",
          message: A instanceof Error ? A.message : String(A),
          retryable: !0
        }, t.clearAppSession();
      } finally {
        l === f && (l = null);
      }
    }
    async function te() {
      const e = v.value, d = p.value;
      if (!(!e || !d)) {
        if (d.phase === "ui-render") {
          p.value = null, H.value += 1;
          return;
        }
        if (d.phase === "ui-load" && t.getAppSession()?.appId === e.id) {
          h.value = !0, p.value = null, e.resetLoader();
          try {
            S.value = W(await e.load());
          } catch (f) {
            p.value = {
              phase: "ui-load",
              message: f instanceof Error ? f.message : "APP 界面加载失败",
              retryable: !0
            };
          } finally {
            h.value = !1;
          }
          return;
        }
        h.value = !0, p.value = null;
        try {
          await t.request("app/retry", { appId: e.id }), await N(e);
        } catch (f) {
          h.value = !1, p.value = {
            phase: "host",
            message: f instanceof Error ? f.message : String(f),
            retryable: !0
          };
        }
      }
    }
    function L(e) {
      const d = v.value;
      d && (p.value = {
        phase: "ui-render",
        message: e instanceof Error ? e.message : "APP 界面渲染失败",
        retryable: !0
      }, t.post("os/app-ui-failure", {
        appId: d.id,
        phase: "ui-render"
      }));
    }
    function K(e) {
      !v.value || h.value || p.value || (e.preventDefault(), L(e.error ?? new Error(e.message || "APP 界面运行失败")));
    }
    function V(e) {
      !v.value || h.value || p.value || (e.preventDefault(), L(e.reason));
    }
    function ie() {
      window.location.reload();
    }
    function j() {
      u += 1, l = null, t.post("app/deactivate", { appId: v.value?.id || "" }), t.clearAppSession(), v.value = null, S.value = null, w.value = null, h.value = !1, p.value = null;
    }
    function D() {
      u += 1, l = null, t.post("os/close"), t.clearAppSession();
    }
    function ne(e) {
      if (e.key === "Escape") {
        e.preventDefault(), v.value ? j() : D();
        return;
      }
      if (e.key !== "Tab" || !n.value) return;
      const d = Array.from(n.value.querySelectorAll('button:not(:disabled), [href], input:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'));
      if (d.length === 0) return;
      const f = d[0], g = d[d.length - 1];
      e.shiftKey && document.activeElement === f ? (e.preventDefault(), g.focus()) : !e.shiftKey && document.activeElement === g && (e.preventDefault(), f.focus());
    }
    return ve(async () => {
      o = document.activeElement instanceof HTMLElement ? document.activeElement : null, b = t.subscribe(ae), t.start(), window.addEventListener("error", K), window.addEventListener("unhandledrejection", V), await ue(), n.value?.focus();
    }), se(() => {
      u += 1, l = null, window.removeEventListener("error", K), window.removeEventListener("unhandledrejection", V), b(), t.dispose(), o?.focus();
    }), (e, d) => (c(), m("main", {
      ref_key: "root",
      ref: n,
      class: X(["xiaobai-os-shell", `theme-${r.value}`]),
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "小白 OS",
      tabindex: "-1",
      onKeydown: ne,
      onClick: fe(D, ["self"])
    }, [M.value ? (c(), m("div", aa, $(M.value), 1)) : C("", !0), i.value ? (c(), z(Ye, {
      key: 2,
      apps: x.value,
      "active-app": v.value,
      "active-component": S.value,
      "active-state": w.value,
      "app-failure": p.value,
      "app-loading": h.value,
      "app-render-key": H.value,
      bridge: oe(t),
      "character-avatar": I.value,
      onOpenApp: N,
      onBack: j,
      onHome: j,
      onClose: D,
      onRenderFailed: L,
      onRetry: te,
      onReload: ie
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
}), na = ia;
me(na).mount("#app");
