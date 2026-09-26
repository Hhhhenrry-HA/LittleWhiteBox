/* eslint-disable */
import { t as It } from "./xiaobai-os-chunk-9ZSF5uba.js";
import { E as Ve, F as Pt, H as yt, J as Gt, K as Z, L as Be, M as h, N as Qt, P as Q, Q as P, S as ea, T as lt, V as Ke, X as ce, Y as y, Z as Ue, _ as ta, b as ne, c as $t, f as L, g as v, h as T, k as ze, l as Ge, m as ie, o as aa, p as d, q as na, s as Rt, u as q, v as te, y as K, z as de } from "./xiaobai-os-runtime-dom.esm-bundler-BcM9c-Z9.js";
import { n as sa } from "./xiaobai-os-app-navigation-sg-40eOk.js";
import { t as Tt } from "./xiaobai-os-AppDialog-CI-E933W.js";
import { A as He, C as ia, D as Ot, E as Lt, F as ra, I as la, M as me, N as Ne, O as G, P as oa, S as ua, T as ca, a as da, b as ha, c as fa, d as va, f as Ut, g as pa, h as ma, i as Ht, j as De, k as ya, l as ba, n as ka, o as ga, p as xt, r as Nt, s as wa, u as _t, v as Le, w as Ma, x as $a, y as xa } from "./xiaobai-os-map-presentation-DFD3BFyV.js";
function ot(e, t, a, r, s) {
  const [o, c, l, u] = a, i = Math.max(80, t[0] - u - c), n = Math.max(80, t[1] - o - l), m = Math.max(e[2] / i, e[3] / n), M = r ? m : Math.min(e[2] / t[0], e[3] / t[1]) * 0.78, k = !r && s ? s : [e[0] + e[2] / 2, e[1] + e[3] / 2], w = k[0] - (u + i / 2) * M, p = k[1] - (o + n / 2) * M, $ = t[0] * M, A = t[1] * M;
  return [
    r ? w : Math.max(e[0], Math.min(e[0] + e[2] - $, w)),
    r ? p : Math.max(e[1], Math.min(e[1] + e[3] - A, p)),
    $,
    A
  ];
}
function _a(e, t, a, r) {
  const [s, o, c, l] = r, u = Math.min(t[2] / a[0], 620 / Math.max(80, a[0] - l - o));
  return [
    e[0] - (l + (a[0] - l - o) / 2) * u,
    e[1] - (s + (a[1] - s - c) / 2) * u,
    a[0] * u,
    a[1] * u
  ];
}
var Sa = ["aria-label"], Aa = ["aria-label"], Ea = ["aria-label"], Ca = /* @__PURE__ */ ne({
  __name: "MapZoomControls",
  emits: ["zoom", "reset"],
  setup(e) {
    return (t, a) => (h(), v("div", {
      class: "map-viewport-controls",
      "aria-label": y(De).label
    }, [
      d("button", {
        type: "button",
        "aria-label": y(De).zoomIn,
        onClick: a[0] || (a[0] = (r) => t.$emit("zoom", 0.8))
      }, "+", 8, Aa),
      d("button", {
        type: "button",
        "aria-label": y(De).zoomOut,
        onClick: a[1] || (a[1] = (r) => t.$emit("zoom", 1.25))
      }, "−", 8, Ea),
      d("button", {
        type: "button",
        class: "map-fit",
        onClick: a[2] || (a[2] = (r) => t.$emit("reset"))
      }, P(y(De).fit), 1)
    ], 8, Sa));
  }
}), qt = Ca, Ba = { class: "map-viewport" }, ja = ["viewBox", "aria-label"], Ia = /* @__PURE__ */ ne({
  __name: "MapViewport",
  props: {
    viewBox: {},
    resetKey: { default: "" },
    label: {},
    focusPoint: { default: void 0 },
    focusSequence: { default: 0 },
    atlasInsets: { default: void 0 },
    initialPoint: { default: void 0 },
    initialOverview: {
      type: Boolean,
      default: !1
    },
    controls: {
      type: Boolean,
      default: !0
    }
  },
  setup(e, { expose: t }) {
    const a = e, r = Z(null), s = Z([...a.viewBox]), o = Z([0, 0]), c = L(() => o.value[0] && o.value[1] ? Math.max(s.value[2] / o.value[0], s.value[3] / o.value[1]) : 1);
    let l, u = !1;
    ze(() => {
      l = new ResizeObserver((b) => {
        const B = b[0].contentRect;
        if (!B.width || !B.height) return;
        const g = o.value;
        if (o.value = [B.width, B.height], a.atlasInsets) {
          if (!u) j();
          else if (g[0] && g[1]) {
            const R = s.value[2] / g[0];
            s.value = [
              s.value[0] + (g[0] - B.width) * R / 2,
              s.value[1] + (g[1] - B.height) * R / 2,
              B.width * R,
              B.height * R
            ];
          }
        }
      }), r.value && l.observe(r.value);
    });
    const i = /* @__PURE__ */ new Map();
    let n = null, m = [0, 0], M = 0, k = null, w = !1, p = !1, $ = null;
    const A = L(() => s.value.join(" "));
    function _() {
      s.value = a.atlasInsets && o.value[0] ? ot([...a.viewBox], o.value, a.atlasInsets, !0) : [...a.viewBox];
    }
    function j() {
      u = !!o.value[0], s.value = a.atlasInsets && u ? ot([...a.viewBox], o.value, a.atlasInsets, a.initialOverview, a.initialPoint) : [...a.viewBox];
    }
    function H() {
      return c.value;
    }
    function I(b, B) {
      const g = r.value?.getBoundingClientRect();
      if (!g) return [s.value[0], s.value[1]];
      const R = H();
      return [s.value[0] + s.value[2] / 2 + (b - g.left - g.width / 2) * R, s.value[1] + s.value[3] / 2 + (B - g.top - g.height / 2) * R];
    }
    function V(b, B) {
      const g = Math.max(1, a.atlasInsets && o.value[0] ? ot([...a.viewBox], o.value, a.atlasInsets, !0)[2] : a.viewBox[2]), R = Math.min(g * 0.24, 240, s.value[2]), Y = Math.max(g * 3, s.value[2]), ee = Math.min(Y, Math.max(R, s.value[2] * b)), X = ee / s.value[2], J = B || [s.value[0] + s.value[2] / 2, s.value[1] + s.value[3] / 2];
      s.value = [
        J[0] - (J[0] - s.value[0]) * X,
        J[1] - (J[1] - s.value[1]) * X,
        ee,
        s.value[3] * X
      ];
    }
    function z() {
      if (!a.focusPoint) return;
      if (a.atlasInsets && o.value[0]) {
        s.value = _a(a.focusPoint, s.value, o.value, a.atlasInsets);
        return;
      }
      const b = Math.min(s.value[2], 620), B = s.value[3] * b / s.value[2];
      s.value = [
        a.focusPoint[0] - b / 2,
        a.focusPoint[1] - B / 2,
        b,
        B
      ];
    }
    function f() {
      const b = [...i.values()];
      b.length === 1 && (n = b[0], m = [s.value[0], s.value[1]]), b.length === 2 && (M = Math.hypot(b[1][0] - b[0][0], b[1][1] - b[0][1]), k = [(b[0][0] + b[1][0]) / 2, (b[0][1] + b[1][1]) / 2], w = !0);
    }
    function x(b) {
      b.button !== 0 || i.size >= 2 || (i.size || (w = !1), i.set(b.pointerId, [b.clientX, b.clientY]), b.target.setPointerCapture(b.pointerId), f());
    }
    function E(b) {
      if (!i.has(b.pointerId)) return;
      i.set(b.pointerId, [b.clientX, b.clientY]);
      const B = [...i.values()];
      if (B.length === 2 && k) {
        const g = Math.hypot(B[1][0] - B[0][0], B[1][1] - B[0][1]), R = [(B[0][0] + B[1][0]) / 2, (B[0][1] + B[1][1]) / 2];
        g > 0 && M > 0 && V(M / g, I(...k)), s.value[0] -= (R[0] - k[0]) * H(), s.value[1] -= (R[1] - k[1]) * H(), M = g, k = R;
      } else if (n) {
        const g = b.clientX - n[0], R = b.clientY - n[1];
        Math.abs(g) + Math.abs(R) > 4 && (w = !0), s.value = [
          m[0] - g * H(),
          m[1] - R * H(),
          s.value[2],
          s.value[3]
        ];
      }
    }
    function S(b) {
      if (!i.delete(b.pointerId)) return;
      const B = b.target;
      B.hasPointerCapture(b.pointerId) && B.releasePointerCapture(b.pointerId), f(), i.size || (n = null, k = null), w && (p = !0, $ && clearTimeout($), $ = setTimeout(() => {
        p = !1;
      }, 0));
    }
    function O(b) {
      p && (b.preventDefault(), b.stopPropagation());
    }
    return de(() => a.resetKey, j, { immediate: !0 }), de(() => a.focusSequence, z, { flush: "post" }), Ve(() => {
      l?.disconnect(), $ && clearTimeout($);
    }), t({
      zoom: V,
      reset: _
    }), (b, B) => (h(), v("div", Ba, [(h(), v("svg", {
      ref_key: "svg",
      ref: r,
      class: "map-viewport-svg",
      viewBox: A.value,
      preserveAspectRatio: "xMidYMid meet",
      role: "group",
      "aria-label": e.label,
      onWheel: B[0] || (B[0] = Ge((g) => V(g.deltaY < 0 ? 0.84 : 1.19, I(g.clientX, g.clientY)), ["prevent"])),
      onPointerdown: x,
      onPointermove: E,
      onPointerup: S,
      onPointercancel: S,
      onClickCapture: O
    }, [Pt(b.$slots, "default", {
      unitScale: c.value,
      viewport: s.value
    })], 40, ja)), e.controls ? (h(), ie(qt, {
      key: 0,
      onZoom: V,
      onReset: _
    })) : T("", !0)]));
  }
}), Vt = Ia, Pa = {
  class: "map-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.7",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, Ra = ["d"], Ta = /* @__PURE__ */ ne({
  __name: "MapIcon",
  props: { name: { default: "pin" } },
  setup(e) {
    const t = {
      search: "m20 20-5-5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0",
      pin: "M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0ZM14 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0",
      locate: "M12 2v3m0 14v3M2 12h3m14 0h3M19 12a7 7 0 1 1-14 0 7 7 0 0 1 14 0M14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0",
      globe: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0M3 12h18M12 3c-5 5-5 13 0 18 5-5 5-13 0-18",
      layers: "m3 8 9-5 9 5-9 5-9-5Zm0 5 9 5 9-5M3 18l9 5 9-5",
      back: "m14 5-7 7 7 7",
      next: "m9 5 7 7-7 7",
      close: "m6 6 12 12M6 18 18 6",
      more: "M5 12h.01M12 12h.01M19 12h.01",
      refresh: "M20 4v6h-6M4 20v-6h6M20 10a8 8 0 0 0-14-5M4 14a8 8 0 0 0 14 5",
      route: "M6 18V6h12v12M3 18a3 3 0 1 0 6 0 3 3 0 0 0-6 0M15 6a3 3 0 1 0 6 0 3 3 0 0 0-6 0",
      building: "M5 21V4h14v17M3 21h18M9 8h1m4 0h1M9 12h1m4 0h1M10 21v-5h4v5",
      person: "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0M5 21v-2a7 7 0 0 1 14 0v2",
      mountain: "m2 20 7-15 5 10 3-6 5 11H2Zm4-8 3 2 2-2",
      tree: "m12 2-7 10h3l-4 6h16l-4-6h3L12 2Zm0 16v4",
      water: "M2 7c4-5 6 5 10 0s6 5 10 0M2 13c4-5 6 5 10 0s6 5 10 0M2 19c4-5 6 5 10 0s6 5 10 0",
      compass: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0m-6-3-2 5-5 2 2-5 5-2Z"
    };
    return (a, r) => (h(), v("svg", Pa, [d("path", { d: t[e.name] || t.pin }, null, 8, Ra)]));
  }
}), F = Ta, St = /* @__PURE__ */ It(((e, t) => {
  t.exports = {};
})), Oa = /* @__PURE__ */ It(((e, t) => {
  (function() {
    "use strict";
    var a = "input is invalid type", r = typeof window == "object", s = r ? window : {};
    s.JS_SHA256_NO_WINDOW && (r = !1);
    var o = !r && typeof self == "object", c = !s.JS_SHA256_NO_NODE_JS && typeof process == "object" && process.versions && process.versions.node && process.type != "renderer";
    c ? s = globalThis : o && (s = self);
    var l = !s.JS_SHA256_NO_COMMON_JS && typeof t == "object" && t.exports, u = typeof define == "function" && define.amd, i = !s.JS_SHA256_NO_ARRAY_BUFFER && typeof ArrayBuffer < "u", n = "0123456789abcdef".split(""), m = [
      -2147483648,
      8388608,
      32768,
      128
    ], M = [
      24,
      16,
      8,
      0
    ], k = [
      1116352408,
      1899447441,
      3049323471,
      3921009573,
      961987163,
      1508970993,
      2453635748,
      2870763221,
      3624381080,
      310598401,
      607225278,
      1426881987,
      1925078388,
      2162078206,
      2614888103,
      3248222580,
      3835390401,
      4022224774,
      264347078,
      604807628,
      770255983,
      1249150122,
      1555081692,
      1996064986,
      2554220882,
      2821834349,
      2952996808,
      3210313671,
      3336571891,
      3584528711,
      113926993,
      338241895,
      666307205,
      773529912,
      1294757372,
      1396182291,
      1695183700,
      1986661051,
      2177026350,
      2456956037,
      2730485921,
      2820302411,
      3259730800,
      3345764771,
      3516065817,
      3600352804,
      4094571909,
      275423344,
      430227734,
      506948616,
      659060556,
      883997877,
      958139571,
      1322822218,
      1537002063,
      1747873779,
      1955562222,
      2024104815,
      2227730452,
      2361852424,
      2428436474,
      2756734187,
      3204031479,
      3329325298
    ], w = [
      "hex",
      "array",
      "digest",
      "arrayBuffer"
    ], p = [];
    (s.JS_SHA256_NO_NODE_JS || !Array.isArray) && (Array.isArray = function(f) {
      return Object.prototype.toString.call(f) === "[object Array]";
    }), i && (s.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView) && (ArrayBuffer.isView = function(f) {
      return typeof f == "object" && f.buffer && f.buffer.constructor === ArrayBuffer;
    });
    var $ = function(f, x) {
      return function(E) {
        return new I(x, !0).update(E)[f]();
      };
    }, A = function(f) {
      var x = $("hex", f);
      c && (x = _(x, f)), x.create = function() {
        return new I(f);
      }, x.update = function(O) {
        return x.create().update(O);
      };
      for (var E = 0; E < w.length; ++E) {
        var S = w[E];
        x[S] = $(S, f);
      }
      return x;
    }, _ = function(f, x) {
      var E = St(), S = St().Buffer, O = x ? "sha224" : "sha256", b;
      S.from && !s.JS_SHA256_NO_BUFFER_FROM ? b = S.from : b = function(g) {
        return new S(g);
      };
      var B = function(g) {
        if (typeof g == "string") return E.createHash(O).update(g, "utf8").digest("hex");
        if (g == null) throw new Error(a);
        return g.constructor === ArrayBuffer && (g = new Uint8Array(g)), Array.isArray(g) || ArrayBuffer.isView(g) || g.constructor === S ? E.createHash(O).update(b(g)).digest("hex") : f(g);
      };
      return B;
    }, j = function(f, x) {
      return function(E, S) {
        return new V(E, x, !0).update(S)[f]();
      };
    }, H = function(f) {
      var x = j("hex", f);
      x.create = function(O) {
        return new V(O, f);
      }, x.update = function(O, b) {
        return x.create(O).update(b);
      };
      for (var E = 0; E < w.length; ++E) {
        var S = w[E];
        x[S] = j(S, f);
      }
      return x;
    };
    function I(f, x) {
      x ? (p[0] = p[16] = p[1] = p[2] = p[3] = p[4] = p[5] = p[6] = p[7] = p[8] = p[9] = p[10] = p[11] = p[12] = p[13] = p[14] = p[15] = 0, this.blocks = p) : this.blocks = [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ], f ? (this.h0 = 3238371032, this.h1 = 914150663, this.h2 = 812702999, this.h3 = 4144912697, this.h4 = 4290775857, this.h5 = 1750603025, this.h6 = 1694076839, this.h7 = 3204075428) : (this.h0 = 1779033703, this.h1 = 3144134277, this.h2 = 1013904242, this.h3 = 2773480762, this.h4 = 1359893119, this.h5 = 2600822924, this.h6 = 528734635, this.h7 = 1541459225), this.block = this.start = this.bytes = this.hBytes = 0, this.finalized = this.hashed = !1, this.first = !0, this.is224 = f;
    }
    I.prototype.update = function(f) {
      if (!this.finalized) {
        var x, E = typeof f;
        if (E !== "string") {
          if (E === "object") {
            if (f === null) throw new Error(a);
            if (i && f.constructor === ArrayBuffer) f = new Uint8Array(f);
            else if (!Array.isArray(f) && (!i || !ArrayBuffer.isView(f)))
              throw new Error(a);
          } else throw new Error(a);
          x = !0;
        }
        for (var S, O = 0, b, B = f.length, g = this.blocks; O < B; ) {
          if (this.hashed && (this.hashed = !1, g[0] = this.block, this.block = g[16] = g[1] = g[2] = g[3] = g[4] = g[5] = g[6] = g[7] = g[8] = g[9] = g[10] = g[11] = g[12] = g[13] = g[14] = g[15] = 0), x) for (b = this.start; O < B && b < 64; ++O) g[b >>> 2] |= f[O] << M[b++ & 3];
          else for (b = this.start; O < B && b < 64; ++O)
            S = f.charCodeAt(O), S < 128 ? g[b >>> 2] |= S << M[b++ & 3] : S < 2048 ? (g[b >>> 2] |= (192 | S >>> 6) << M[b++ & 3], g[b >>> 2] |= (128 | S & 63) << M[b++ & 3]) : S < 55296 || S >= 57344 ? (g[b >>> 2] |= (224 | S >>> 12) << M[b++ & 3], g[b >>> 2] |= (128 | S >>> 6 & 63) << M[b++ & 3], g[b >>> 2] |= (128 | S & 63) << M[b++ & 3]) : (S = 65536 + ((S & 1023) << 10 | f.charCodeAt(++O) & 1023), g[b >>> 2] |= (240 | S >>> 18) << M[b++ & 3], g[b >>> 2] |= (128 | S >>> 12 & 63) << M[b++ & 3], g[b >>> 2] |= (128 | S >>> 6 & 63) << M[b++ & 3], g[b >>> 2] |= (128 | S & 63) << M[b++ & 3]);
          this.lastByteIndex = b, this.bytes += b - this.start, b >= 64 ? (this.block = g[16], this.start = b - 64, this.hash(), this.hashed = !0) : this.start = b;
        }
        return this.bytes > 4294967295 && (this.hBytes += this.bytes / 4294967296 << 0, this.bytes = this.bytes % 4294967296), this;
      }
    }, I.prototype.finalize = function() {
      if (!this.finalized) {
        this.finalized = !0;
        var f = this.blocks, x = this.lastByteIndex;
        f[16] = this.block, f[x >>> 2] |= m[x & 3], this.block = f[16], x >= 56 && (this.hashed || this.hash(), f[0] = this.block, f[16] = f[1] = f[2] = f[3] = f[4] = f[5] = f[6] = f[7] = f[8] = f[9] = f[10] = f[11] = f[12] = f[13] = f[14] = f[15] = 0), f[14] = this.hBytes << 3 | this.bytes >>> 29, f[15] = this.bytes << 3, this.hash();
      }
    }, I.prototype.hash = function() {
      var f = this.h0, x = this.h1, E = this.h2, S = this.h3, O = this.h4, b = this.h5, B = this.h6, g = this.h7, R = this.blocks, Y, ee, X, J, N, W, ae, le, ue, $e, re;
      for (Y = 16; Y < 64; ++Y)
        N = R[Y - 15], ee = (N >>> 7 | N << 25) ^ (N >>> 18 | N << 14) ^ N >>> 3, N = R[Y - 2], X = (N >>> 17 | N << 15) ^ (N >>> 19 | N << 13) ^ N >>> 10, R[Y] = R[Y - 16] + ee + R[Y - 7] + X << 0;
      for (re = x & E, Y = 0; Y < 64; Y += 4)
        this.first ? (this.is224 ? (le = 300032, N = R[0] - 1413257819, g = N - 150054599 << 0, S = N + 24177077 << 0) : (le = 704751109, N = R[0] - 210244248, g = N - 1521486534 << 0, S = N + 143694565 << 0), this.first = !1) : (ee = (f >>> 2 | f << 30) ^ (f >>> 13 | f << 19) ^ (f >>> 22 | f << 10), X = (O >>> 6 | O << 26) ^ (O >>> 11 | O << 21) ^ (O >>> 25 | O << 7), le = f & x, J = le ^ f & E ^ re, ae = O & b ^ ~O & B, N = g + X + ae + k[Y] + R[Y], W = ee + J, g = S + N << 0, S = N + W << 0), ee = (S >>> 2 | S << 30) ^ (S >>> 13 | S << 19) ^ (S >>> 22 | S << 10), X = (g >>> 6 | g << 26) ^ (g >>> 11 | g << 21) ^ (g >>> 25 | g << 7), ue = S & f, J = ue ^ S & x ^ le, ae = g & O ^ ~g & b, N = B + X + ae + k[Y + 1] + R[Y + 1], W = ee + J, B = E + N << 0, E = N + W << 0, ee = (E >>> 2 | E << 30) ^ (E >>> 13 | E << 19) ^ (E >>> 22 | E << 10), X = (B >>> 6 | B << 26) ^ (B >>> 11 | B << 21) ^ (B >>> 25 | B << 7), $e = E & S, J = $e ^ E & f ^ ue, ae = B & g ^ ~B & O, N = b + X + ae + k[Y + 2] + R[Y + 2], W = ee + J, b = x + N << 0, x = N + W << 0, ee = (x >>> 2 | x << 30) ^ (x >>> 13 | x << 19) ^ (x >>> 22 | x << 10), X = (b >>> 6 | b << 26) ^ (b >>> 11 | b << 21) ^ (b >>> 25 | b << 7), re = x & E, J = re ^ x & S ^ $e, ae = b & B ^ ~b & g, N = O + X + ae + k[Y + 3] + R[Y + 3], W = ee + J, O = f + N << 0, f = N + W << 0, this.chromeBugWorkAround = !0;
      this.h0 = this.h0 + f << 0, this.h1 = this.h1 + x << 0, this.h2 = this.h2 + E << 0, this.h3 = this.h3 + S << 0, this.h4 = this.h4 + O << 0, this.h5 = this.h5 + b << 0, this.h6 = this.h6 + B << 0, this.h7 = this.h7 + g << 0;
    }, I.prototype.hex = function() {
      this.finalize();
      var f = this.h0, x = this.h1, E = this.h2, S = this.h3, O = this.h4, b = this.h5, B = this.h6, g = this.h7, R = n[f >>> 28 & 15] + n[f >>> 24 & 15] + n[f >>> 20 & 15] + n[f >>> 16 & 15] + n[f >>> 12 & 15] + n[f >>> 8 & 15] + n[f >>> 4 & 15] + n[f & 15] + n[x >>> 28 & 15] + n[x >>> 24 & 15] + n[x >>> 20 & 15] + n[x >>> 16 & 15] + n[x >>> 12 & 15] + n[x >>> 8 & 15] + n[x >>> 4 & 15] + n[x & 15] + n[E >>> 28 & 15] + n[E >>> 24 & 15] + n[E >>> 20 & 15] + n[E >>> 16 & 15] + n[E >>> 12 & 15] + n[E >>> 8 & 15] + n[E >>> 4 & 15] + n[E & 15] + n[S >>> 28 & 15] + n[S >>> 24 & 15] + n[S >>> 20 & 15] + n[S >>> 16 & 15] + n[S >>> 12 & 15] + n[S >>> 8 & 15] + n[S >>> 4 & 15] + n[S & 15] + n[O >>> 28 & 15] + n[O >>> 24 & 15] + n[O >>> 20 & 15] + n[O >>> 16 & 15] + n[O >>> 12 & 15] + n[O >>> 8 & 15] + n[O >>> 4 & 15] + n[O & 15] + n[b >>> 28 & 15] + n[b >>> 24 & 15] + n[b >>> 20 & 15] + n[b >>> 16 & 15] + n[b >>> 12 & 15] + n[b >>> 8 & 15] + n[b >>> 4 & 15] + n[b & 15] + n[B >>> 28 & 15] + n[B >>> 24 & 15] + n[B >>> 20 & 15] + n[B >>> 16 & 15] + n[B >>> 12 & 15] + n[B >>> 8 & 15] + n[B >>> 4 & 15] + n[B & 15];
      return this.is224 || (R += n[g >>> 28 & 15] + n[g >>> 24 & 15] + n[g >>> 20 & 15] + n[g >>> 16 & 15] + n[g >>> 12 & 15] + n[g >>> 8 & 15] + n[g >>> 4 & 15] + n[g & 15]), R;
    }, I.prototype.toString = I.prototype.hex, I.prototype.digest = function() {
      this.finalize();
      var f = this.h0, x = this.h1, E = this.h2, S = this.h3, O = this.h4, b = this.h5, B = this.h6, g = this.h7, R = [
        f >>> 24 & 255,
        f >>> 16 & 255,
        f >>> 8 & 255,
        f & 255,
        x >>> 24 & 255,
        x >>> 16 & 255,
        x >>> 8 & 255,
        x & 255,
        E >>> 24 & 255,
        E >>> 16 & 255,
        E >>> 8 & 255,
        E & 255,
        S >>> 24 & 255,
        S >>> 16 & 255,
        S >>> 8 & 255,
        S & 255,
        O >>> 24 & 255,
        O >>> 16 & 255,
        O >>> 8 & 255,
        O & 255,
        b >>> 24 & 255,
        b >>> 16 & 255,
        b >>> 8 & 255,
        b & 255,
        B >>> 24 & 255,
        B >>> 16 & 255,
        B >>> 8 & 255,
        B & 255
      ];
      return this.is224 || R.push(g >>> 24 & 255, g >>> 16 & 255, g >>> 8 & 255, g & 255), R;
    }, I.prototype.array = I.prototype.digest, I.prototype.arrayBuffer = function() {
      this.finalize();
      var f = /* @__PURE__ */ new ArrayBuffer(this.is224 ? 28 : 32), x = new DataView(f);
      return x.setUint32(0, this.h0), x.setUint32(4, this.h1), x.setUint32(8, this.h2), x.setUint32(12, this.h3), x.setUint32(16, this.h4), x.setUint32(20, this.h5), x.setUint32(24, this.h6), this.is224 || x.setUint32(28, this.h7), f;
    };
    function V(f, x, E) {
      var S, O = typeof f;
      if (O === "string") {
        var b = [], B = f.length, g = 0, R;
        for (S = 0; S < B; ++S)
          R = f.charCodeAt(S), R < 128 ? b[g++] = R : R < 2048 ? (b[g++] = 192 | R >>> 6, b[g++] = 128 | R & 63) : R < 55296 || R >= 57344 ? (b[g++] = 224 | R >>> 12, b[g++] = 128 | R >>> 6 & 63, b[g++] = 128 | R & 63) : (R = 65536 + ((R & 1023) << 10 | f.charCodeAt(++S) & 1023), b[g++] = 240 | R >>> 18, b[g++] = 128 | R >>> 12 & 63, b[g++] = 128 | R >>> 6 & 63, b[g++] = 128 | R & 63);
        f = b;
      } else if (O === "object") {
        if (f === null) throw new Error(a);
        if (i && f.constructor === ArrayBuffer) f = new Uint8Array(f);
        else if (!Array.isArray(f) && (!i || !ArrayBuffer.isView(f)))
          throw new Error(a);
      } else throw new Error(a);
      f.length > 64 && (f = new I(x, !0).update(f).array());
      var Y = [], ee = [];
      for (S = 0; S < 64; ++S) {
        var X = f[S] || 0;
        Y[S] = 92 ^ X, ee[S] = 54 ^ X;
      }
      I.call(this, x, E), this.update(ee), this.oKeyPad = Y, this.inner = !0, this.sharedMemory = E;
    }
    V.prototype = new I(), V.prototype.finalize = function() {
      if (I.prototype.finalize.call(this), this.inner) {
        this.inner = !1;
        var f = this.array();
        I.call(this, this.is224, this.sharedMemory), this.update(this.oKeyPad), this.update(f), I.prototype.finalize.call(this);
      }
    };
    var z = A();
    z.sha256 = z, z.sha224 = A(!0), z.sha256.hmac = H(), z.sha224.hmac = H(!0), l ? t.exports = z : (s.sha256 = z.sha256, s.sha224 = z.sha224, u && define(function() {
      return z;
    }));
  })();
})), La = Oa(), tt = "atlas";
function Ua(e) {
  return e ? `map:${(0, La.sha256)(e)}` : tt;
}
var Ll = Object.freeze({
  frame: tt,
  scale: 1,
  offset: [0, 0]
});
function et(e, t) {
  return [e[0] * t.scale + t.offset[0], e[1] * t.scale + t.offset[1]];
}
function Ha(e) {
  const t = new Map(e.map((s) => [s.id, s])), a = /* @__PURE__ */ new Map();
  function r(s) {
    if (a.has(s)) return a.get(s);
    const o = s, c = /* @__PURE__ */ new Map();
    let l = 1, u = [0, 0];
    for (; !c.has(s); ) {
      c.set(s, {
        frame: s,
        scale: l,
        offset: u
      });
      const i = t.get(s)?.mapping;
      if (!i) break;
      u = et(u, i), l *= i.scale, s = i.frame;
    }
    return a.set(o, c), c;
  }
  return (s, o) => {
    if (!t.has(s) || !t.has(o)) return null;
    const c = r(s);
    for (const [l, u] of r(o)) {
      const i = c.get(l);
      if (i) {
        const n = i.scale / u.scale, m = [(i.offset[0] - u.offset[0]) / u.scale, (i.offset[1] - u.offset[1]) / u.scale];
        return ![n, ...m].every(Number.isFinite) || n <= 0 ? null : {
          frame: o,
          scale: n,
          offset: m
        };
      }
    }
    return null;
  };
}
function pe(e) {
  return e.shape === "rect" || e.shape === "circle" || (e.shape === "path" || e.shape === "curve") && e.closed === !0;
}
function he(e) {
  if (e.shape === "rect") return [
    [e.x, e.y],
    [e.x + e.width, e.y],
    [e.x + e.width, e.y + e.height],
    [e.x, e.y + e.height]
  ];
  if (e.shape === "point") return [[e.x, e.y]];
  if (e.shape === "circle") return Array.from({ length: 64 }, (s, o) => [e.x + e.radius * Math.cos(o * Math.PI / 32), e.y + e.radius * Math.sin(o * Math.PI / 32)]);
  if (e.shape === "path") return e.points;
  const t = [], a = e.points.length, r = (s) => e.points[e.closed ? (s + a) % a : Math.max(0, Math.min(a - 1, s))];
  for (let s = 0; s < a - (e.closed ? 0 : 1); s++) {
    const o = r(s - 1), c = r(s), l = r(s + 1), u = r(s + 2);
    for (let i = 0; i < 8; i++) {
      const n = i / 8;
      t.push([0, 1].map((m) => 0.5 * (2 * c[m] + (-o[m] + l[m]) * n + (2 * o[m] - 5 * c[m] + 4 * l[m] - u[m]) * n * n + (-o[m] + 3 * c[m] - 3 * l[m] + u[m]) * n * n * n)));
    }
  }
  return e.closed || t.push(e.points[a - 1]), t;
}
function At(e, t) {
  if ("points" in e) return {
    ...e,
    points: e.points.map((s) => et(s, t)),
    ...e.width === void 0 ? {} : { width: e.width * t.scale }
  };
  const [a, r] = et([e.x, e.y], t);
  return e.shape === "rect" ? {
    ...e,
    x: a,
    y: r,
    width: e.width * t.scale,
    height: e.height * t.scale
  } : e.shape === "circle" ? {
    ...e,
    x: a,
    y: r,
    radius: e.radius * t.scale
  } : {
    ...e,
    x: a,
    y: r
  };
}
function ht(e, t = 0) {
  let a = 1 / 0, r = 1 / 0, s = -1 / 0, o = -1 / 0;
  for (const [c, l] of e)
    a = Math.min(a, c), r = Math.min(r, l), s = Math.max(s, c), o = Math.max(o, l);
  return [
    a - t,
    r - t,
    s - a + 2 * t,
    o - r + 2 * t
  ];
}
function Ce(e) {
  return ht(he(e), (e.shape === "path" || e.shape === "curve") && !e.closed ? (e.width || 0) / 2 : 0);
}
function bt(e, t) {
  return e[0] <= t[0] + t[2] && t[0] <= e[0] + e[2] && e[1] <= t[1] + t[3] && t[1] <= e[1] + e[3];
}
function we(e, t) {
  const a = he(t);
  if (!pe(t)) {
    const s = t.shape === "path" || t.shape === "curve" ? (t.width || 0) / 2 : 0;
    for (let o = 1; o < a.length; o++) {
      const c = a[o - 1], l = a[o], u = l[0] - c[0], i = l[1] - c[1], n = Math.max(0, Math.min(1, ((e[0] - c[0]) * u + (e[1] - c[1]) * i) / (u * u + i * i || 1)));
      if (Math.hypot(e[0] - c[0] - n * u, e[1] - c[1] - n * i) <= s) return !0;
    }
    return !1;
  }
  let r = !1;
  for (let s = 0, o = a.length - 1; s < a.length; o = s++) {
    const c = a[s], l = a[o];
    c[1] > e[1] != l[1] > e[1] && e[0] < (l[0] - c[0]) * (e[1] - c[1]) / (l[1] - c[1]) + c[0] && (r = !r);
  }
  return r;
}
function Kt(e, t, a, r) {
  const s = t[0] - e[0], o = t[1] - e[1], c = r[0] - a[0], l = r[1] - a[1], u = s * l - o * c;
  if (!u) return null;
  const i = ((a[0] - e[0]) * l - (a[1] - e[1]) * c) / u, n = ((a[0] - e[0]) * o - (a[1] - e[1]) * s) / u;
  return i >= 0 && i <= 1 && n >= 0 && n <= 1 ? [e[0] + i * s, e[1] + i * o] : null;
}
function Na(e, t, a, r) {
  const s = r[0] - a[0], o = r[1] - a[1], c = a[0] - e[0], l = a[1] - e[1], u = s * s + o * o, i = 2 * (c * s + l * o), n = c * c + l * l - t * t, m = i * i - 4 * u * n;
  return !u || m < 0 ? [] : [(-i - Math.sqrt(m)) / (2 * u), (-i + Math.sqrt(m)) / (2 * u)].filter((M) => M >= 0 && M <= 1).map((M) => [a[0] + s * M, a[1] + o * M]);
}
function qa(e, t, a) {
  const r = he(e), s = he(t), o = s.filter((c) => we(c, e));
  for (const c of r) {
    const l = [
      [c[0] - a, c[1]],
      [c[0] + a, c[1]],
      [c[0], c[1] - a],
      [c[0], c[1] + a]
    ];
    o.push(...l.filter((u) => we(u, t)));
    for (let u = 0; u < s.length; u++) o.push(...Na(c, a, s[u], s[(u + 1) % s.length]));
  }
  for (let c = 1; c < r.length; c++) {
    const l = r[c - 1], u = r[c], i = Math.hypot(u[0] - l[0], u[1] - l[1]);
    if (!i) continue;
    const n = -(u[1] - l[1]) / i * a, m = (u[0] - l[0]) / i * a, M = [
      [l[0] + n, l[1] + m],
      [u[0] + n, u[1] + m],
      [u[0] - n, u[1] - m],
      [l[0] - n, l[1] - m]
    ];
    o.push(...M.filter((k) => we(k, t)));
    for (let k = 0; k < M.length; k++) for (let w = 0; w < s.length; w++) {
      const p = Kt(M[k], M[(k + 1) % M.length], s[w], s[(w + 1) % s.length]);
      p && o.push(p);
    }
  }
  return o;
}
function Va(e, t) {
  const a = Ce(e);
  if (!t) return a;
  const r = Ce(t);
  if (!bt(a, r)) return null;
  const s = (e.shape === "path" || e.shape === "curve") && !e.closed ? (e.width || 0) / 2 : 0;
  if (s) {
    const u = qa(e, t, s);
    if (!u.length) return null;
    const i = ht(u), n = Math.max(i[0], r[0]), m = Math.max(i[1], r[1]);
    return [
      n,
      m,
      Math.max(0, Math.min(i[0] + i[2], r[0] + r[2]) - n),
      Math.max(0, Math.min(i[1] + i[3], r[1] + r[3]) - m)
    ];
  }
  const o = he(e), c = he(t), l = o.filter((u) => we(u, t));
  pe(e) && l.push(...c.filter((u) => we(u, e)));
  for (let u = 0; u < o.length - (pe(e) ? 0 : 1); u++) for (let i = 0; i < c.length; i++) {
    const n = Kt(o[u], o[(u + 1) % o.length], c[i], c[(i + 1) % c.length]);
    n && l.push(n);
  }
  return l.length ? ht(l) : null;
}
function fe(e) {
  return e.shape === "point" ? `M${e.x - 2} ${e.y}a2 2 0 1 0 4 0a2 2 0 1 0 -4 0` : he(e).map((t, a) => `${a ? "L" : "M"}${t[0]} ${t[1]}`).join(" ") + (pe(e) ? "Z" : "");
}
function ft(e) {
  return "points" in e && !e.closed ? e.width || 1 : 0;
}
var kt = {
  unknown: {
    base: "#dbe3ea",
    ink: "#657d8f",
    light: "#f7fafc"
  },
  wood: {
    base: "#cea77d",
    ink: "#896345",
    light: "#edcdaa"
  },
  stone: {
    base: "#c0c9c8",
    ink: "#768c91",
    light: "#f1f2e7"
  },
  tile: {
    base: "#d6dbe5",
    ink: "#96a2b5",
    light: "#f7f7ff"
  },
  carpet: {
    base: "#c59cb4",
    ink: "#8a637b",
    light: "#eacbdf"
  },
  "bed-sheet": {
    base: "#e7dce8",
    ink: "#ab96b0",
    light: "#fff5fa"
  },
  fabric: {
    base: "#cab6d8",
    ink: "#91749f",
    light: "#e9d8f3"
  },
  tatami: {
    base: "#cdd3a8",
    ink: "#8e9762",
    light: "#e7eacd"
  },
  sand: {
    base: "#e4c28b",
    ink: "#ae754d",
    light: "#fff0c7"
  },
  marble: {
    base: "#ecedf4",
    ink: "#a9b4c9",
    light: "#ffffff"
  },
  blood: {
    base: "#c77780",
    ink: "#853d51",
    light: "#efa3a4"
  },
  water: {
    base: "#71bbc9",
    ink: "#397a99",
    light: "#d3eff0"
  },
  grass: {
    base: "#d1dfba",
    ink: "#8da987",
    light: "#eff0d5"
  },
  forest: {
    base: "#73997d",
    ink: "#365e52",
    light: "#bace9e"
  },
  glass: {
    base: "#b9e5e5",
    ink: "#6daeb6",
    light: "#ecffff"
  },
  dirt: {
    base: "#d4bb9c",
    ink: "#a18766",
    light: "#ead7b9"
  },
  snow: {
    base: "#eaf6fc",
    ink: "#9dbecf",
    light: "#ffffff"
  },
  metal: {
    base: "#a8bfd2",
    ink: "#587b98",
    light: "#e0edf8"
  },
  rune: {
    base: "#c4b2ef",
    ink: "#8068bd",
    light: "#ece2ff"
  },
  "warm-light": {
    base: "#ffe0a1",
    ink: "#d6a45b",
    light: "#fff8d8"
  },
  "cold-light": {
    base: "#b6e8ff",
    ink: "#6daecb",
    light: "#edfbff"
  },
  shadow: {
    base: "#9e9bba",
    ink: "#615b83",
    light: "#c8c7df"
  },
  vacuum: {
    base: "#101d32",
    ink: "#182b49",
    light: "#b8d4ed"
  },
  rock: {
    base: "#b5b7a7",
    ink: "#616e68",
    light: "#ebe9d8"
  },
  ice: {
    base: "#c6eaf1",
    ink: "#74b3cd",
    light: "#f0ffff"
  },
  cloud: {
    base: "#d4d9f0",
    ink: "#939fc6",
    light: "#f6f6ff"
  },
  lava: {
    base: "#f5a274",
    ink: "#ba624e",
    light: "#ffdf91"
  }
};
function Ka(e) {
  let t = 2166136261;
  for (let a = 0; a < e.length; a++) t = Math.imul(t ^ e.charCodeAt(a), 16777619);
  return t >>> 0;
}
function za(e, t, a) {
  let s = 2 ** Math.max(0, Math.ceil(Math.log2(a * 22 / 48)));
  const o = Ce(e.geometry), c = (k) => [
    Math.floor(Math.max(o[0], t[0] - 96) / k),
    Math.floor(Math.max(o[1], t[1] - 96) / k),
    Math.ceil(Math.min(o[0] + o[2], t[0] + t[2] + 96) / k),
    Math.ceil(Math.min(o[1] + o[3], t[1] + t[3] + 96) / k)
  ];
  let l = c(48 * s);
  for (; Math.max(0, l[2] - l[0] + 1) * Math.max(0, l[3] - l[1] + 1) > 192; )
    s *= 2, l = c(48 * s);
  const [u, i, n, m] = l, M = [];
  for (let k = i; k <= m && M.length < 192; k++) for (let w = u; w <= n && M.length < 192; w++) {
    const p = w * s, $ = k * s, A = `${e.id}:${p}:${$}`, _ = Ka(A), j = p * 48 + ((_ & 255) / 255 - 0.5) * 48 * 0.55, H = $ * 48 + ((_ >>> 8 & 255) / 255 - 0.5) * 48 * 0.55;
    e.form === "scattered" && _ % 3 !== 0 || we([j, H], e.geometry) && M.push({
      id: A,
      x: j,
      y: H,
      size: 48 * (0.45 + (_ >>> 16 & 255) / 255 * 0.2),
      variant: _ % 3
    });
  }
  return M;
}
var Et = {
  environment: 0,
  surface: 1,
  cover: 2,
  relief: 3,
  channel: 4,
  structure: 5,
  zone: 6,
  landmark: 7,
  boundary: 8
};
function Da(e) {
  const t = [...e].sort((o, c) => Et[o.source.role] - Et[c.source.role] || o.source.id.localeCompare(c.source.id)), a = /* @__PURE__ */ new Set(), r = [], s = new Set(t.map((o) => o.source.id));
  for (; t.length; ) {
    const o = t.findIndex((l) => [l.source.support, ...l.source.crosses || []].every((u) => !u || !s.has(u) || a.has(u)));
    if (o < 0) throw new Error("space_support_cycle");
    const c = t.splice(o, 1)[0];
    a.add(c.source.id), r.push(c);
  }
  return r;
}
function Fa(e, t) {
  const a = e.source;
  return t.filter((r) => {
    const s = r.source;
    if (!bt(e.bounds, r.bounds) || a.id === s.id || a.support !== s.support || a.crosses?.includes(s.id)) return !1;
    if (s.material === "water" && s.role !== "environment" && a.material !== "water" && [
      "surface",
      "cover",
      "relief",
      "structure"
    ].includes(a.role)) return !0;
    const o = (a.crosses || []).length === (s.crosses || []).length && (a.crosses || []).every((c) => s.crosses?.includes(c));
    return s.role === a.role && s.material === a.material && s.form === a.form && o && s.id < a.id ? !0 : [
      "scattered",
      "compact",
      "blocks",
      "towers"
    ].includes(a.form || "") ? s.role === "channel" || s.role === "cover" || s.role === "structure" && !!s.destination && pe(s.geometry) : !1;
  });
}
var Wa = { class: "map-atlas-material" }, Za = [
  "x",
  "y",
  "width",
  "height"
], Ya = [
  "x",
  "y",
  "width",
  "height"
], Ja = ["d"], Xa = [
  "id",
  "x",
  "y",
  "width",
  "height",
  "viewBox"
], Ga = [
  "data-tile",
  "x",
  "y",
  "width",
  "height",
  "href"
], Qa = ["mask"], en = [
  "data-tile",
  "x",
  "y",
  "width",
  "height",
  "fill"
], tn = /* @__PURE__ */ ne({
  __name: "AtlasSurface",
  props: {
    view: {},
    bounds: {}
  },
  setup(e) {
    const t = e, a = `atlas-pending-${Be()}`, r = L(() => [...t.view?.fallbacks || [], ...t.view?.images || []]), s = L(() => r.value.map(({ clip: o }) => `M${o.x} ${o.y}h${o.width}v${o.height}h${-o.width}Z`).join(""));
    return (o, c) => (h(), v("g", Wa, [
      d("defs", null, [d("mask", {
        id: a,
        maskUnits: "userSpaceOnUse",
        x: e.bounds[0],
        y: e.bounds[1],
        width: e.bounds[2],
        height: e.bounds[3],
        style: { "mask-type": "luminance" }
      }, [d("rect", {
        x: e.bounds[0],
        y: e.bounds[1],
        width: e.bounds[2],
        height: e.bounds[3],
        fill: "white"
      }, null, 8, Ya), d("path", {
        d: s.value,
        fill: "black",
        "shape-rendering": "crispEdges"
      }, null, 8, Ja)], 8, Za), (h(!0), v(q, null, Q(r.value, (l, u) => (h(), v("pattern", {
        id: `${a}-${u}`,
        key: l.key,
        patternUnits: "userSpaceOnUse",
        x: l.x,
        y: l.y,
        width: l.width,
        height: l.height,
        viewBox: `${l.x} ${l.y} ${l.width} ${l.height}`
      }, [d("image", {
        class: "map-atlas-tile",
        "data-tile": l.key,
        x: l.x,
        y: l.y,
        width: l.width,
        height: l.height,
        href: l.href,
        preserveAspectRatio: "none"
      }, null, 8, Ga)], 8, Xa))), 128))]),
      d("g", {
        class: "map-atlas-placeholder",
        mask: `url(#${a})`
      }, [Pt(o.$slots, "default")], 8, Qa),
      (h(!0), v(q, null, Q(r.value, (l, u) => (h(), v("rect", {
        key: l.key,
        class: ce(["map-atlas-cell", { "map-atlas-fallback": e.view?.fallbacks.includes(l) }]),
        "data-tile": l.key,
        x: l.clip.x,
        y: l.clip.y,
        width: l.clip.width,
        height: l.clip.height,
        fill: `url(#${a}-${u})`,
        "shape-rendering": "crispEdges"
      }, null, 10, en))), 128))
    ]));
  }
}), an = tn;
function vt(e) {
  let t = 2166136261;
  for (let a = 0; a < e.length; a++) t = Math.imul(t ^ e.charCodeAt(a), 16777619);
  return t >>> 0;
}
function ve(e, t, a) {
  let r = Math.imul(e, 374761393) + Math.imul(t, 668265263) + a;
  return r = Math.imul(r ^ r >>> 13, 1274126177), ((r ^ r >>> 16) >>> 0) / 4294967295;
}
function pt(e, t, a) {
  const r = Math.floor(e), s = Math.floor(t), o = e - r, c = t - s, l = o * o * (3 - 2 * o), u = c * c * (3 - 2 * c), i = ve(r, s, a), n = ve(r + 1, s, a), m = ve(r, s + 1, a), M = ve(r + 1, s + 1, a);
  return i + (n - i) * l + (m - i) * u + (i - n - m + M) * l * u;
}
function mt(e) {
  return Math.min(1, Math.max(0, 2 - 4 * e));
}
function Te(e, t, a, r = 0) {
  return 0.5 + Fe(e, t, a, r, 1, 0.55, 0) + Fe(e, t, a, r, 2.07, 0.27, 71) + Fe(e, t, a, r, 4.13, 0.13, 137) + Fe(e, t, a, r, 8.23, 0.05, 211);
}
function Fe(e, t, a, r, s, o, c) {
  const l = mt(s * r);
  return l ? (pt(e * s, t * s, a + c) - 0.5) * o * l : 0;
}
var ye = (e) => Math.min(1, Math.max(0, e)), ut = (e) => [
  1,
  3,
  5
].map((t) => parseInt(e.slice(t, t + 2), 16));
function at(e) {
  return [
    "ridge",
    "forest",
    "blocks",
    "compact",
    "towers",
    "scattered",
    "celestial"
  ].includes(e.form || "") || e.material === "forest" ? -2 : -1;
}
function nn(e, t) {
  return Math.max(at(e), Math.floor(Math.log2(Math.max(t, 2 ** -30)) + 0.25));
}
function sn(e, t) {
  return Math.max(at(e), Math.ceil(Math.log2(Math.max(t[2], t[3], 2 ** -30) / 256)));
}
function qe(e, { level: t, tx: a, ty: r }) {
  const s = 2 ** t, o = 256, c = Math.max(a * o, Math.floor(e[0] / s)), l = Math.max(r * o, Math.floor(e[1] / s)), u = Math.min((a + 1) * o, Math.ceil((e[0] + e[2]) / s)), i = Math.min((r + 1) * o, Math.ceil((e[1] + e[3]) / s));
  return u > c && i > l ? [
    c - 1,
    l - 1,
    u - c + 2,
    i - l + 2
  ] : null;
}
function We(e, t, a) {
  const r = 256 * 2 ** a, s = Math.max(e[0], t[0]), o = Math.max(e[1], t[1]), c = Math.min(e[0] + e[2], t[0] + t[2]), l = Math.min(e[1] + e[3], t[1] + t[3]);
  if (c < s || l < o) return [];
  const u = [], i = t[0] + t[2] / 2, n = t[1] + t[3] / 2;
  for (let M = Math.floor(o / r); M <= Math.floor(l / r); M++) for (let k = Math.floor(s / r); k <= Math.floor(c / r); k++) qe(e, {
    level: a,
    tx: k,
    ty: M
  }) && u.push({
    level: a,
    tx: k,
    ty: M
  });
  const m = (M) => ((M.tx + 0.5) * r - i) ** 2 + ((M.ty + 0.5) * r - n) ** 2;
  return u.sort((M, k) => m(M) - m(k));
}
function zt(e) {
  const t = JSON.stringify([
    e.role,
    e.material,
    e.form || "",
    e.geometry
  ]);
  return `${e.id}#${vt(t).toString(36)}${vt(`${t}|`).toString(36)}`;
}
var Ze = new Float64Array(18), Ye = [
  NaN,
  NaN,
  NaN
];
function rn(e, t, a) {
  const s = Math.floor(e / 8), o = Math.floor(t / 8);
  if (Ye[0] !== s || Ye[1] !== o || Ye[2] !== a) {
    for (let l = 0; l < 9; l++) {
      const u = s - 1 + l % 3, i = o - 1 + Math.floor(l / 3);
      Ze[l * 2] = ve(u, i, a), Ze[l * 2 + 1] = ve(u, i, a + 53);
    }
    Ye = [
      s,
      o,
      a
    ];
  }
  let c = 0;
  for (let l = o - 1, u = 0; l <= o + 1; l++) for (let i = s - 1; i <= s + 1; i++, u += 2) {
    const n = Ze[u], m = Ze[u + 1], M = e - (i + n) * 8, k = t - (l + m) * 8, w = (M * M + k * k) / (3.7 + n * 3.2) ** 2;
    c = Math.max(c, Math.max(0, 1 - w) * (0.65 + m * 0.35));
  }
  return Math.sqrt(c);
}
var ln = 256;
function on(e, t) {
  const a = Math.max(t[2], t[3], 9313225746154785e-25) / ln, r = Math.max(1, Math.ceil(t[2] / a)), s = Math.max(1, Math.ceil(t[3] / a)), o = r + 2, c = new Float32Array(o * (s + 2));
  for (let l = 0; l < s; l++) {
    const u = t[1] + (l + 0.5) * a, i = [];
    for (let n = 0, m = e.length - 1; n < e.length; m = n++) {
      const M = e[n], k = e[m];
      M[1] > u != k[1] > u && i.push((M[0] + (u - M[1]) * (k[0] - M[0]) / (k[1] - M[1]) - t[0]) / a);
    }
    i.sort((n, m) => n - m);
    for (let n = 0; n + 1 < i.length; n += 2) for (let m = Math.max(0, Math.ceil(i[n] - 0.5)); m < Math.min(r, i[n + 1] - 0.5); m++) c[(l + 1) * o + m + 1] = Math.min(m + 0.5 - i[n], i[n + 1] - m - 0.5, l + 0.5, s - l - 0.5);
  }
  for (let l = 1; l <= s; l++) for (let u = 1; u <= r; u++) {
    const i = l * o + u;
    c[i] && (c[i] = Math.min(c[i], c[i - 1] + 1, c[i - o] + 1, c[i - o - 1] + 1.414, c[i - o + 1] + 1.414));
  }
  for (let l = s; l > 0; l--) for (let u = r; u > 0; u--) {
    const i = l * o + u;
    c[i] && (c[i] = Math.min(c[i], c[i + 1] + 1, c[i + o] + 1, c[i + o + 1] + 1.414, c[i + o - 1] + 1.414));
  }
  return {
    bounds: t,
    cell: a,
    width: r,
    height: s,
    field: c,
    points: e
  };
}
function un(e, t, a) {
  let r = !1, s = 1 / 0;
  for (let o = 0, c = e.length - 1; o < e.length; c = o++) {
    const l = e[o], u = e[c], i = u[0] - l[0], n = u[1] - l[1];
    l[1] > a != u[1] > a && t < l[0] + (a - l[1]) * i / n && (r = !r);
    const m = ye(((t - l[0]) * i + (a - l[1]) * n) / (i * i + n * n || 1));
    s = Math.min(s, (t - l[0] - i * m) ** 2 + (a - l[1] - n * m) ** 2);
  }
  return r ? Math.sqrt(s) : 0;
}
function ct(e, t, a) {
  const r = Math.min(e.width + 1, Math.max(0, (t - e.bounds[0]) / e.cell + 0.5)), s = Math.min(e.height + 1, Math.max(0, (a - e.bounds[1]) / e.cell + 0.5)), o = Math.min(e.width, Math.floor(r)), c = Math.min(e.height, Math.floor(s)), l = r - o, u = s - c, i = e.width + 2, n = e.field, m = c * i + o, M = ((n[m] * (1 - l) + n[m + 1] * l) * (1 - u) + (n[m + i] * (1 - l) + n[m + i + 1] * l) * u) * e.cell;
  if (M >= e.cell * 2.5) return M;
  const k = un(e.points, t, a);
  return M <= e.cell * 1.5 ? k : k + (M - k) * (M / e.cell - 1.5);
}
function cn(e) {
  return e.form === "celestial" ? "planet" : e.form === "nebula" ? "nebula" : e.form === "ridge" ? "ridge" : e.form === "dunes" ? "dunes" : e.form === "forest" || e.material === "forest" ? "forest" : [
    "scattered",
    "compact",
    "blocks",
    "towers"
  ].includes(e.form || "") ? "city" : e.material === "vacuum" ? "space" : e.material === "cloud" ? "cloud" : e.material === "water" ? "water" : e.material === "metal" ? "metal" : "plain";
}
function dn(e) {
  const t = Ce(e.geometry), a = cn(e), r = kt[e.material], s = a === "ridge" || a === "forest" || e.role === "environment", o = pe(e.geometry);
  return {
    feature: e,
    bounds: t,
    kind: a,
    seed: vt(e.id),
    base: ut(r.base),
    light: ut(r.light),
    ink: ut(r.ink),
    softEdge: s,
    envelope: (s || a === "water") && o ? on(he(e.geometry), t) : void 0,
    banks: a === "water" && !o ? he(e.geometry) : [],
    reach: Math.max(12, Math.min(t[2], t[3]) * 0.38),
    fade: Math.min(18, Math.min(t[2], t[3]) * 0.12)
  };
}
function hn(e, t) {
  return e === "city" ? Math.min(3, Math.ceil(t / 0.75)) : e === "forest" ? Math.min(3, Math.ceil(t / 1.5)) : 1;
}
var Ct = (e, t, a, r) => Math.abs(e - Math.round(e / t) * t) < Math.max(a, r) / 2 ? Math.min(1, a / r) : 0, oe = new Float64Array(5);
function fn(e, t, a, r) {
  const { feature: s, kind: o, seed: c, bounds: l } = e, u = o === "city" || o === "planet" ? 0.5 : Te(t / 90, a / 90, c, r / 90);
  let i = u, n = (u - 0.5) * 0.4, m = 1, M = 1;
  if (o === "ridge") {
    const p = pt(t / 130, a / 130, c) * 2.4, $ = 1 - Math.abs(Te(t / 62 + p, a / 45, c + 19, r / 45) * 2 - 1);
    i = (e.envelope ? Math.pow(ye(ct(e.envelope, t, a) / e.reach), 0.65) : 1) * (0.3 + $ * $ * 0.7), n = i * 0.8 - 0.2;
  } else if (o === "dunes") {
    const p = Te(t / 130, a / 130, c, r / 130) * 5, $ = 0.5 + Math.sin(t / 18 + a / 49 + p) * 0.5 * mt(r / 113);
    i = Math.pow($, 0.65) * (0.65 + u * 0.35), n = i * 0.38 - 0.1;
  } else if (o === "forest") {
    const p = rn(t, a, c + 32);
    i = p * 0.7 + u * 0.3, n = (p - 0.5) * 0.6 + (u - 0.5) * 0.8;
  } else if (o === "city") {
    const p = s.form === "compact" ? 32 : s.form === "towers" ? 38 : 58, $ = Math.floor(t / p), A = Math.floor(a / p), _ = t / p - $, j = a / p - A, H = ve($, A, c), I = s.form === "scattered" && H > 0.36, V = s.form === "towers" ? 1 : H < 0.5 ? 2 : 3, z = s.form === "towers" ? 1 : H < 0.3 ? 3 : 2, f = Math.floor(_ * V), x = Math.floor(j * z), E = _ * V - f, S = j * z - x, O = ve($ * 7 + f, A * 7 + x, c + 21), b = 0.1 + O * 0.09, B = _ > 0.07 && j > 0.07 && _ < 0.93 && j < 0.93, g = !I && B && E > b && S > b && E < 0.87 && S < 0.86;
    if (i = 0, n = g ? -0.06 + O * 0.28 : 0.6, !g && B && E > b + 0.06 && S > b + 0.06 && E < 0.98 && S < 0.98 && (n = -0.32), g) {
      const R = H < 0.5 ? E : S;
      n += R < 0.5 ? 0.08 : -0.12, Math.abs(R - 0.5) < 0.025 && (n += 0.15), O > 0.7 && E > 0.35 && E < 0.6 && S > 0.35 && S < 0.6 && (n -= 0.25);
    }
  } else if (o === "water") {
    i = u * 0.12, n = (u - 0.5) * 0.45;
    let p = e.envelope ? ct(e.envelope, t, a) : 1 / 0;
    if (e.banks.length > 1) {
      let $ = 1 / 0;
      for (let A = 1; A < e.banks.length; A++) {
        const _ = e.banks[A - 1], j = e.banks[A], H = j[0] - _[0], I = j[1] - _[1], V = ye(((t - _[0]) * H + (a - _[1]) * I) / (H * H + I * I || 1));
        $ = Math.min($, (t - _[0] - H * V) ** 2 + (a - _[1] - I * V) ** 2);
      }
      p = ("width" in s.geometry && s.geometry.width || 1) / 2 - Math.sqrt($);
    }
    s.role !== "environment" && (n += 0.38 * (1 - ye(p / 9)) - 0.1);
  } else if (o === "space")
    i = 0, n = (u - 0.5) * 0.18;
  else if (o === "nebula") {
    const p = (t - l[0]) / Math.max(1, l[2]) * 2 - 1, $ = (a - l[1]) / Math.max(1, l[3]) * 2 - 1, A = Te(t / 70 + u * 3, a / 100, c + 42, r / 70);
    m = ye(1 - Math.hypot(p, $)) * ye((A - 0.2) * 2.4), i = 0, n = A * 1.5 - 0.4;
  } else if (o === "planet") {
    const p = (t - l[0]) / Math.max(1, l[2]) * 2 - 1, $ = (a - l[1]) / Math.max(1, l[3]) * 2 - 1, A = Math.sqrt(Math.max(0, 1 - p * p - $ * $));
    M = 0.19 + Math.max(0, -p * 0.48 - $ * 0.52 + A * 0.67) * 0.92, i = 0, n = (Te(t / 17, a / 17, c, r / 17) - 0.5) * 0.7;
  } else if (o === "cloud")
    i = u * 0.3, n = (u - 0.4) * 0.65;
  else if (o === "metal") {
    const p = Math.max(Ct(t, 64, 1.28, r), Ct(a, 40, 0.96, r));
    i = 0, n = -0.35 * p + (u - 0.5) * 0.14 * (1 - p);
  } else
    i = u * 0.15, s.material === "sand" && (n += (pt(t / 2, a / 2, c) - 0.5) * 0.1 * mt(r / 2)), (s.material === "lava" || s.material === "rune") && (n += Math.pow(1 - Math.abs(u * 2 - 1), 12) * 0.8);
  if (e.softEdge && e.envelope) {
    const p = ye((ct(e.envelope, t, a) + r / 2) / Math.max(e.fade, r));
    m *= p * p * (3 - 2 * p);
  }
  const k = n >= 0 ? e.light : e.ink, w = ye(Math.abs(n));
  for (let p = 0; p < 3; p++) oe[p] = (e.base[p] + (k[p] - e.base[p]) * w) * M;
  oe[3] = m, oe[4] = i;
}
function vn(e, t) {
  const a = qe(e.bounds, t);
  if (!a) return null;
  const [r, s, o, c] = a, l = 2 ** t.level, u = o + 2, i = hn(e.kind, l), n = l / i, m = new Float32Array(u * (c + 2)), M = new Float32Array(o * c * 4);
  for (let $ = -1; $ <= c; $++) for (let A = -1; A <= o; A++) {
    const _ = A >= 0 && $ >= 0 && A < o && $ < c;
    let j = 0, H = 0, I = 0, V = 0, z = 0;
    for (let f = 0; f < i; f++) for (let x = 0; x < i; x++)
      fn(e, (r + A) * l + (x + 0.5) * n, (s + $) * l + (f + 0.5) * n, n), j += oe[0] * oe[3], H += oe[1] * oe[3], I += oe[2] * oe[3], V += oe[3], z += oe[4];
    if (m[($ + 1) * u + A + 1] = z / (i * i), _) {
      const f = ($ * o + A) * 4, x = V || 1;
      M[f] = j / x, M[f + 1] = H / x, M[f + 2] = I / x, M[f + 3] = V / (i * i);
    }
  }
  const k = new Uint8ClampedArray(o * c * 4), w = Math.max(0.5, l), p = e.kind === "ridge" ? 26 : e.kind === "dunes" ? 18 : e.kind === "forest" ? 1.8 : 0;
  for (let $ = 0; $ < c; $++) for (let A = 0; A < o; A++) {
    const _ = ($ + 1) * u + A + 1, j = ($ * o + A) * 4;
    let H = 1;
    if (p) {
      const f = (m[_ + 1] - m[_ - 1]) / (2 * l) * p, x = (m[_ + u] - m[_ - u]) / (2 * l) * p, E = (0.82 + (f + x) * 0.55) / Math.sqrt(1 + f * f + x * x);
      H = Math.max(0.58, Math.min(1.12, 0.32 + E * 0.82));
    }
    const I = (r + A + 0.5) * l, V = (s + $ + 0.5) * l, z = (ve(Math.floor(I / w), Math.floor(V / w), e.seed) - 0.5) * (e.kind === "space" ? 1 : 3);
    for (let f = 0; f < 3; f++) k[j + f] = Math.round(Math.min(255, Math.max(0, M[j + f] + z))) * H;
    k[j + 3] = M[j + 3] * 255;
  }
  return {
    rect: a,
    pixels: k
  };
}
var ge = /* @__PURE__ */ new Map(), pn = 64;
function mn() {
  ge.clear();
}
function yn(e) {
  let t = ge.get(e.surfaceKey);
  return t ? ge.delete(e.surfaceKey) : t = dn(e.source), ge.set(e.surfaceKey, t), ge.size > pn && ge.delete(ge.keys().next().value), t;
}
var bn = Array.from({ length: 256 }, (e, t) => {
  for (let a = 0; a < 8; a++) t = t & 1 ? 3988292384 ^ t >>> 1 : t >>> 1;
  return t >>> 0;
});
function gt(e, t) {
  const a = (e * 4 + 1) * t;
  return 63 + a + Math.max(1, Math.ceil(a / 65535)) * 5;
}
function kn(e, t, a) {
  let r = -1;
  for (let s = t; s < a; s++) r = bn[(r ^ e[s]) & 255] ^ r >>> 8;
  return ~r >>> 0;
}
function gn(e, t, a) {
  const r = t * 4 + 1, s = r * a, o = Math.max(1, Math.ceil(s / 65535)), c = 2 + s + o * 5 + 4, l = new Uint8Array(gt(t, a)), u = new DataView(l.buffer);
  l.set([
    137,
    80,
    78,
    71,
    13,
    10,
    26,
    10
  ]);
  let i = 8;
  const n = (m, M, k) => {
    u.setUint32(i, M);
    for (let p = 0; p < 4; p++) l[i + 4 + p] = m.charCodeAt(p);
    const w = i + 4;
    i += 8, k(), u.setUint32(i, kn(l, w, i)), i += 4;
  };
  return n("IHDR", 13, () => {
    u.setUint32(i, t), u.setUint32(i + 4, a), l.set([
      8,
      6,
      0,
      0,
      0
    ], i + 8), i += 13;
  }), n("IDAT", c, () => {
    const m = new Uint8Array(s);
    for (let w = 0; w < a; w++) m.set(e.subarray(w * t * 4, (w + 1) * t * 4), w * r + 1);
    l[i++] = 120, l[i++] = 1;
    for (let w = 0, p = 0; w < o; w++, p += 65535) {
      const $ = Math.min(65535, s - p);
      l[i] = w === o - 1 ? 1 : 0, u.setUint16(i + 1, $, !0), u.setUint16(i + 3, ~$ & 65535, !0), l.set(m.subarray(p, p + $), i + 5), i += 5 + $;
    }
    let M = 1, k = 0;
    for (let w = 0; w < s; ) {
      for (const p = Math.min(s, w + 5552); w < p; w++)
        M += m[w], k += M;
      M %= 65521, k %= 65521;
    }
    u.setUint32(i, (k << 16 | M) >>> 0), i += 4;
  }), n("IEND", 0, () => {
  }), l;
}
function wn(e) {
  try {
    const t = vn(yn(e), e.tile);
    return t ? {
      id: e.id,
      rect: t.rect,
      blob: new Blob([gn(t.pixels, t.rect[2], t.rect[3])], { type: "image/png" })
    } : { id: e.id };
  } catch (t) {
    return {
      id: e.id,
      error: t instanceof Error ? t.message : String(t)
    };
  }
}
var Mn = class {
  budget;
  revoke;
  entries = /* @__PURE__ */ new Map();
  bytes = 0;
  constructor(e, t) {
    this.budget = e, this.revoke = t;
  }
  get size() {
    return this.entries.size;
  }
  has(e) {
    return this.entries.has(e);
  }
  get(e) {
    const t = this.entries.get(e);
    return t && (this.entries.delete(e), this.entries.set(e, t)), t;
  }
  set(e, t, a, r, s = 0) {
    const o = a[2] * a[3] * 4 + s;
    if ([...this.entries].reduce((c, [l, u]) => c + (l !== e && r.has(l) ? u.bytes : 0), 0) + o > this.budget)
      return this.revoke(t), !1;
    this.delete(e);
    for (const c of [...this.entries.keys()]) {
      if (this.bytes + o <= this.budget) break;
      r.has(c) || this.delete(c);
    }
    return this.entries.set(e, {
      url: t,
      rect: a,
      bytes: o
    }), this.bytes += o, !0;
  }
  clear() {
    for (const e of [...this.entries.keys()]) this.delete(e);
  }
  retainSurfaceKeys(e) {
    for (const t of [...this.entries.keys()]) e.has(t.slice(0, t.lastIndexOf("@"))) || this.delete(t);
  }
  delete(e) {
    const t = this.entries.get(e);
    t && (this.entries.delete(e), this.bytes -= t.bytes, this.revoke(t.url));
  }
};
var $n = class {
  options;
  queue = [];
  idle;
  running = /* @__PURE__ */ new Map();
  failed = /* @__PURE__ */ new Set();
  pinned = /* @__PURE__ */ new Set();
  disposed = !1;
  wanted = /* @__PURE__ */ new Set();
  constructor(e) {
    this.options = e, this.idle = e.renderers((t) => this.deliver(t), (t) => this.fail(t)).flatMap((t) => Array(3).fill(t)), this.idle.length || (this.idle = [e.fallback((t) => this.deliver(t))]);
  }
  get pending() {
    return this.queue.length + this.running.size;
  }
  request(e, t) {
    this.pinned = t, this.wanted = new Set(e.map((a) => a.id)), this.queue = e.filter((a) => !this.options.cache.has(a.id) && !this.running.has(a.id) && !this.failed.has(a.id)), this.pump();
  }
  dispose() {
    this.disposed = !0, this.queue = [];
    for (const e of /* @__PURE__ */ new Set([...this.idle, ...[...this.running.values()].map((t) => t.renderer)])) e.dispose();
    this.idle = [], this.running.clear();
  }
  pump() {
    for (; !this.disposed && this.idle.length && this.queue.length; ) {
      const e = this.queue.shift(), t = this.idle.shift();
      this.running.set(e.id, {
        job: e,
        renderer: t
      }), t.render(e);
    }
  }
  async deliver(e) {
    const t = this.running.get(e.id);
    if (!t || this.disposed) return;
    let a;
    try {
      if (!this.wanted.has(e.id)) return;
      if (e.error) throw new Error(e.error);
      if (!e.blob || !e.rect || (a = this.options.createUrl(e.blob), await this.options.decode(a), this.disposed || this.running.get(e.id) !== t || !this.wanted.has(e.id))) return;
      const r = this.options.cache.set(e.id, a, e.rect, this.pinned, e.blob.size);
      a = void 0, r && this.options.onTile();
    } catch (r) {
      this.failed.add(e.id), console.warn("[map] atlas tile failed", e.id, r);
    } finally {
      a && this.options.revokeUrl(a), this.running.get(e.id) === t && (this.running.delete(e.id), this.disposed || (this.idle.push(t.renderer), this.pump()));
    }
  }
  fail(e) {
    if (!this.disposed) {
      e.dispose(), this.idle = this.idle.filter((t) => t !== e);
      for (const [t, a] of this.running) a.renderer === e && (this.running.delete(t), this.wanted.has(t) && this.queue.unshift(a.job));
      this.idle.length + new Set([...this.running.values()].map((t) => t.renderer)).size || this.idle.push(this.options.fallback((t) => this.deliver(t))), this.pump();
    }
  }
}, Ee = (e, t) => `${e}@${t.level}/${t.tx}/${t.ty}`;
function Bt(e) {
  return e.reduce((t, a) => t + [...new Map([...a.previews, ...a.tiles].map((r) => [Ee(a.key, r), r])).values()].reduce((r, s) => {
    const o = qe(a.bounds, s);
    return r + o[2] * o[3] * 4 + gt(o[2], o[3]);
  }, 0), 0);
}
function xn(e, t, a, r) {
  const o = t[2] * 0.15, c = t[3] * 0.15, l = e.flatMap(({ source: n, mapping: { scale: m, offset: M }, sourceBounds: k }) => {
    if (n.form === "asteroids" || n.geometry.shape === "point" || !k[2] || !k[3]) return [];
    const w = [
      (t[0] - o - M[0]) / m,
      (t[1] - c - M[1]) / m,
      (t[2] + o * 2) / m,
      (t[3] + c * 2) / m
    ], p = nn(n, a / m), $ = We(k, w, p);
    if (!$.length) return [];
    const A = Math.max(p, sn(n, k) + 2), _ = JSON.parse(JSON.stringify({
      id: n.id,
      role: n.role,
      material: n.material,
      form: n.form,
      geometry: n.geometry
    }));
    return [{
      id: n.id,
      key: zt(_),
      source: _,
      bounds: k,
      local: w,
      level: p,
      preview: A,
      tiles: $,
      previews: We(k, k, A),
      scale: m,
      offset: M
    }];
  }), u = l.map((n) => ({
    plan: n,
    bytes: Bt([n]),
    priority: at(n.source) === -2 ? 4 : 1
  }));
  let i = u.reduce((n, m) => n + m.bytes, 0);
  for (; i > r; ) {
    const n = u.reduce((M, k) => M.bytes / M.priority >= k.bytes / k.priority ? M : k), m = n.plan;
    i -= n.bytes, m.level++, m.preview = Math.max(m.preview, m.level), m.tiles = We(m.bounds, m.local, m.level), m.previews = We(m.bounds, m.bounds, m.preview), n.bytes = Bt([m]), i += n.bytes;
  }
  return l;
}
var _n = 48 * 2 ** 20, Je = 258, Sn = 6 * (Je * Je * 4 + gt(Je, Je)), Dt = /* @__PURE__ */ Symbol("atlas-tiles"), dt = /* @__PURE__ */ new WeakMap();
function An(e, t) {
  const a = dt.get(e);
  if (a?.identity === t) return a;
  a?.dispose();
  const r = new Mn(_n - Sn, (u) => URL.revokeObjectURL(u)), s = new AbortController(), o = () => {
    s.abort(), r.clear(), c(), dt.delete(e);
  }, c = e.subscribe((u) => {
    u.type === "os/init" && o();
  }), l = {
    cache: r,
    signal: s.signal,
    identity: t,
    dispose: o
  };
  return dt.set(e, l), l;
}
var En = 150, Xe = (e, t, a = !1) => {
  const r = 2 ** t, s = a ? 1 : 0;
  return {
    x: (e[0] + s) * r,
    y: (e[1] + s) * r,
    width: (e[2] - 2 * s) * r,
    height: (e[3] - 2 * s) * r
  };
}, Cn = (e, t) => {
  const a = Math.max(e.x, t.x), r = Math.max(e.y, t.y);
  return {
    x: a,
    y: r,
    width: Math.max(0, Math.min(e.x + e.width, t.x + t.width) - a),
    height: Math.max(0, Math.min(e.y + e.height, t.y + t.height) - r)
  };
};
function Bn(e, t) {
  if (typeof Worker > "u") return [];
  const a = Math.min(2, Math.max(1, (navigator.hardwareConcurrency || 2) - 1)), r = [];
  for (let s = 0; s < a; s++) {
    let o;
    try {
      o = new Worker(new URL(
        /* @vite-ignore */
        "" + new URL("assets/atlas-tiles.worker-B5lSvqwT.js", import.meta.url).href,
        "" + import.meta.url
      ), { type: "module" });
    } catch {
      break;
    }
    const c = {
      render: (l) => o.postMessage(l),
      dispose: () => o.terminate()
    };
    o.onmessage = (l) => e(l.data), o.onerror = (l) => {
      l.preventDefault(), t(c);
    }, r.push(c);
  }
  return r;
}
function jn(e) {
  let t;
  return {
    render: (a) => {
      t = setTimeout(() => e(wn(a)));
    },
    dispose: () => {
      clearTimeout(t), mn();
    }
  };
}
function In(e, t, a) {
  const r = ea(Dt), { cache: s } = r, o = na(0);
  let c = 0;
  const l = new $n({
    cache: s,
    createUrl: (p) => URL.createObjectURL(p),
    revokeUrl: (p) => URL.revokeObjectURL(p),
    decode: async (p) => {
      const $ = new Image();
      $.src = p, await $.decode();
    },
    renderers: Bn,
    fallback: jn,
    onTile: () => {
      c ||= requestAnimationFrame(() => {
        c = 0, o.value++;
      });
    }
  }), u = L(() => xn(e(), t(), a() / (globalThis.devicePixelRatio || 1), s.budget / 2));
  function i(p, $) {
    if ($.level > at(p.source)) {
      const A = [
        0,
        1,
        2,
        3
      ].map((_) => ({
        level: $.level - 1,
        tx: $.tx * 2 + (_ & 1),
        ty: $.ty * 2 + (_ >> 1)
      })).filter((_) => qe(p.bounds, _)).map((_) => ({
        id: Ee(p.key, _),
        level: _.level,
        entry: s.get(Ee(p.key, _))
      }));
      if (A.every((_) => _.entry)) return A;
    }
    for (let A = $.level + 1; A <= p.preview; A++) {
      const _ = 2 ** (A - $.level), j = Ee(p.key, {
        level: A,
        tx: Math.floor($.tx / _),
        ty: Math.floor($.ty / _)
      }), H = s.get(j);
      if (H) return [{
        id: j,
        level: A,
        entry: H
      }];
    }
    return [];
  }
  const n = L(() => {
    o.value;
    const p = /* @__PURE__ */ new Map();
    for (const $ of u.value) {
      const A = {
        images: [],
        fallbacks: []
      };
      for (const _ of $.tiles) {
        const j = Ee($.key, _), H = s.get(j), I = Xe(qe($.bounds, _), _.level, !0);
        if (H) A.images.push({
          key: j,
          href: H.url,
          clip: I,
          ...Xe(H.rect, _.level)
        });
        else for (const V of i($, _)) {
          const z = V.entry;
          A.fallbacks.push({
            key: `${j}<${V.id}`,
            href: z.url,
            clip: Cn(I, Xe(z.rect, V.level, !0)),
            ...Xe(z.rect, V.level)
          });
        }
      }
      p.set($.id, A);
    }
    return p;
  });
  let m, M = !1;
  const k = () => {
    if (m = void 0, r.signal.aborted) return;
    const p = t(), $ = p[0] + p[2] / 2, A = p[1] + p[3] / 2, _ = [], j = [];
    for (const I of u.value) {
      const V = (f) => ({
        id: Ee(I.key, f),
        surfaceKey: I.key,
        source: I.source,
        tile: f
      });
      _.push(...I.previews.map(V));
      const z = 256 * 2 ** I.level * I.scale;
      for (const f of I.tiles) j.push([(I.offset[0] + (f.tx + 0.5) * z - $) ** 2 + (I.offset[1] + (f.ty + 0.5) * z - A) ** 2, V(f)]);
    }
    const H = [...new Map([..._, ...j.sort((I, V) => I[0] - V[0]).map(([, I]) => I)].map((I) => [I.id, I])).values()];
    l.request(H, new Set(H.map((I) => I.id)));
  };
  de(u, () => {
    if (l.request([], /* @__PURE__ */ new Set()), !M) {
      M = !0, k();
      return;
    }
    clearTimeout(m), m = setTimeout(k, En);
  }, { immediate: !0 });
  const w = () => {
    clearTimeout(m), cancelAnimationFrame(c), l.dispose();
  };
  return r.signal.addEventListener("abort", w, { once: !0 }), Ve(() => {
    r.signal.removeEventListener("abort", w), w();
  }), { tiles: n };
}
var Pn = ["clip-path"], Rn = ["d"], Tn = ["id"], On = ["stop-color"], Ln = ["stop-color"], Un = ["stop-color"], Hn = [
  "id",
  "x",
  "y",
  "width",
  "height"
], Nn = [
  "d",
  "fill",
  "stroke",
  "stroke-width"
], qn = [
  "id",
  "x",
  "y",
  "width",
  "height"
], Vn = [
  "x",
  "y",
  "width",
  "height",
  "fill"
], Kn = ["d", "mask"], zn = [
  "d",
  "fill",
  "stroke-width"
], Dn = ["data-feature", "mask"], Fn = [
  "d",
  "fill",
  "stroke",
  "stroke-width"
], Wn = ["transform", "mask"], Zn = [
  "d",
  "fill",
  "stroke",
  "stroke-width",
  "opacity"
], Yn = [
  "d",
  "stroke",
  "stroke-width",
  "stroke-opacity"
], Jn = ["transform"], Xn = {
  key: 0,
  transform: "scale(.3)"
}, Gn = ["fill"], Qn = ["fill"], es = ["fill"], ts = ["r", "opacity"], as = {
  key: 0,
  d: "M-.12 0H.12M0-.12V.12",
  stroke: "#afcaec",
  "stroke-width": ".014",
  opacity: ".55"
}, ns = ["transform"], ss = ["fill"], is = /* @__PURE__ */ ne({
  __name: "AtlasSpace",
  props: {
    projection: {},
    viewport: {},
    unitScale: {}
  },
  setup(e) {
    const t = e, a = `atlas-space-${Be()}`, r = `${a}-region`, s = L(() => {
      const l = Da(t.projection.features), u = t.projection.carriers, i = [...t.projection.features, ...u], n = new Map([...l.map((k, w) => [k.source.id, `${a}-${w}`]), ...u.map((k, w) => [k.source.id, `${a}-c${w}`])]), m = (k, w) => {
        const p = i.find(($) => $.source.id === k.source.support);
        return {
          id: n.get(k.source.id),
          support: p,
          supportId: p ? `${n.get(p.source.id)}-base` : "",
          exclusions: Fa(k, w)
        };
      }, M = l.map((k) => {
        const { scale: w, offset: p } = k.mapping;
        return {
          ...k,
          ...m(k, t.projection.features),
          paint: kt[k.source.material],
          sourcePath: fe(k.source.geometry),
          transform: `translate(${p[0]} ${p[1]}) scale(${w})`,
          closed: pe(k.source.geometry),
          width: ft(k.source.geometry),
          sourceBounds: Ce(k.source.geometry)
        };
      });
      return {
        painted: M,
        masks: [...M, ...u.map((k) => ({
          ...k,
          ...m(k, i)
        }))]
      };
    }), { tiles: o } = In(() => s.value.painted, () => t.viewport, () => t.unitScale), c = L(() => new Map(s.value.painted.map((l) => {
      const { scale: u, offset: i } = l.mapping, n = [
        (t.viewport[0] - i[0]) / u,
        (t.viewport[1] - i[1]) / u,
        t.viewport[2] / u,
        t.viewport[3] / u
      ];
      return [l.source.id, ["asteroids", "nebula"].includes(l.source.form || "") || l.source.material === "vacuum" ? za(l.source, n, t.unitScale / u) : []];
    })));
    return (l, u) => (h(), v("g", {
      class: "map-atlas-space",
      "aria-hidden": "true",
      "clip-path": e.projection.clip ? `url(#${r})` : void 0
    }, [
      d("defs", null, [
        e.projection.clip ? (h(), v("clipPath", {
          key: 0,
          id: r,
          clipPathUnits: "userSpaceOnUse"
        }, [d("path", { d: y(fe)(e.projection.clip) }, null, 8, Rn)])) : T("", !0),
        (h(!0), v(q, null, Q(s.value.painted, (i) => (h(), v("linearGradient", {
          id: `${i.id}-preview`,
          key: `${i.id}-preview`,
          x2: "75%",
          y2: "100%"
        }, [
          d("stop", { "stop-color": i.paint.light }, null, 8, On),
          d("stop", {
            offset: ".4",
            "stop-color": i.paint.base
          }, null, 8, Ln),
          d("stop", {
            offset: "1",
            "stop-color": i.paint.ink
          }, null, 8, Un)
        ], 8, Tn))), 128)),
        (h(!0), v(q, null, Q(s.value.painted, (i) => (h(), v("mask", {
          id: `${i.id}-source`,
          key: `${i.id}-source`,
          maskUnits: "userSpaceOnUse",
          x: i.sourceBounds[0] - 2,
          y: i.sourceBounds[1] - 2,
          width: i.sourceBounds[2] + 4,
          height: i.sourceBounds[3] + 4,
          style: { "mask-type": "luminance" }
        }, [d("path", {
          d: i.sourcePath,
          fill: i.closed ? "white" : "none",
          stroke: i.closed ? "none" : "white",
          "stroke-width": i.width,
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, null, 8, Nn)], 8, Hn))), 128)),
        (h(!0), v(q, null, Q(s.value.masks, (i) => (h(), v("mask", {
          id: `${i.id}-base`,
          key: `${i.id}-base`,
          maskUnits: "userSpaceOnUse",
          x: e.projection.viewBox[0],
          y: e.projection.viewBox[1],
          width: e.projection.viewBox[2],
          height: e.projection.viewBox[3],
          style: { "mask-type": "luminance" }
        }, [
          d("rect", {
            x: e.projection.viewBox[0],
            y: e.projection.viewBox[1],
            width: e.projection.viewBox[2],
            height: e.projection.viewBox[3],
            fill: i.support ? "black" : "white"
          }, null, 8, Vn),
          i.support ? (h(), v("path", {
            key: 0,
            d: y(fe)(i.support.geometry),
            fill: "white",
            mask: `url(#${i.supportId})`
          }, null, 8, Kn)) : T("", !0),
          (h(!0), v(q, null, Q(i.exclusions, (n) => (h(), v("path", {
            key: n.source.id,
            d: y(fe)(n.geometry),
            fill: y(pe)(n.geometry) ? "black" : "none",
            stroke: "black",
            "stroke-width": y(ft)(n.geometry),
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
          }, null, 8, zn))), 128))
        ], 8, qn))), 128))
      ]),
      (h(!0), v(q, null, Q(s.value.painted, (i) => (h(), v("g", {
        key: i.source.id,
        "data-feature": i.source.id,
        mask: `url(#${i.id}-base)`,
        style: Ue(i.source.role === "relief" ? { mixBlendMode: "multiply" } : void 0)
      }, [i.source.geometry.shape === "point" ? (h(), v("path", {
        key: 0,
        d: y(fe)(i.geometry),
        fill: i.paint.base,
        stroke: i.paint.ink,
        "stroke-width": e.unitScale
      }, null, 8, Fn)) : T("", !0), d("g", {
        transform: i.transform,
        mask: `url(#${i.id}-source)`
      }, [i.source.form !== "asteroids" ? (h(), v(q, { key: 0 }, [i.source.geometry.shape !== "point" && y(bt)(i.bounds, e.viewport) ? (h(), ie(an, {
        key: 0,
        view: y(o).get(i.source.id),
        bounds: i.sourceBounds
      }, {
        default: Ke(() => [d("path", {
          d: i.sourcePath,
          fill: i.closed ? `url(#${i.id}-preview)` : "none",
          stroke: i.closed ? "none" : i.paint.base,
          "stroke-width": i.width,
          opacity: i.source.role === "environment" ? 0.35 : 1,
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, null, 8, Zn)]),
        _: 2
      }, 1032, ["view", "bounds"])) : T("", !0), i.source.role === "surface" || i.source.role === "structure" || i.source.material === "water" && i.source.role !== "environment" ? (h(), v("path", {
        key: 1,
        d: i.sourcePath,
        fill: "none",
        stroke: i.paint.light,
        "stroke-width": i.closed ? e.unitScale / i.mapping.scale * 2.5 : Math.max(0, i.width - e.unitScale / i.mapping.scale * 2),
        "stroke-opacity": i.closed ? 0.6 : 0.12,
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      }, null, 8, Yn)) : T("", !0)], 64)) : T("", !0), (h(!0), v(q, null, Q(c.value.get(i.source.id), (n) => (h(), v("g", {
        key: n.id,
        transform: `translate(${n.x} ${n.y}) scale(${n.size})`
      }, [i.source.form === "asteroids" ? (h(), v("g", Xn, [
        d("path", {
          d: "M-.8-.25L-.34-.88.42-.68.86.05.38.67-.51.54Z",
          fill: i.paint.ink
        }, null, 8, Gn),
        d("path", {
          d: "M-.8-.25L-.34-.88.42-.68.1-.08-.51.54Z",
          fill: i.paint.light
        }, null, 8, Qn),
        d("path", {
          d: "M-.34-.88L.1-.08.86.05.42-.68Z",
          fill: i.paint.base
        }, null, 8, es)
      ])) : (h(), v(q, { key: 1 }, [d("circle", {
        r: n.variant === 0 ? ".047" : ".026",
        fill: "#eff6ff",
        opacity: n.variant === 2 ? ".45" : ".9"
      }, null, 8, ts), n.variant === 0 ? (h(), v("path", as)) : T("", !0)], 64))], 8, Jn))), 128))], 8, Wn)], 12, Dn))), 128)),
      (h(!0), v(q, null, Q(s.value.painted.filter((i) => i.label && !i.source.destination), (i) => (h(), v("g", {
        key: `${i.id}-label`,
        class: "map-atlas-label",
        transform: `translate(${i.bounds[0] + i.bounds[2] / 2} ${i.bounds[1] + i.bounds[3] / 2}) scale(${e.unitScale})`
      }, [d("text", {
        "text-anchor": "middle",
        fill: i.source.material === "vacuum" ? "#e4efff" : i.paint.ink
      }, P(i.label), 9, ss)], 8, ns))), 128))
    ], 8, Pn));
  }
}), rs = is, ls = {
  class: "map-atlas-backdrop",
  "aria-hidden": "true"
}, os = [
  "id",
  "width",
  "height"
], us = [
  "d",
  "stroke",
  "stroke-width"
], cs = [
  "id",
  "width",
  "height"
], ds = [
  "cx",
  "cy",
  "r",
  "fill"
], hs = [
  "id",
  "x",
  "y",
  "width",
  "height"
], fs = [
  "x",
  "y",
  "width",
  "height"
], vs = ["clip-path"], ps = [
  "d",
  "fill",
  "stroke-width"
], ms = ["id"], ys = ["d"], bs = [
  "x",
  "y",
  "width",
  "height",
  "fill"
], ks = [
  "x",
  "y",
  "width",
  "height",
  "fill"
], gs = [
  "x",
  "y",
  "width",
  "height",
  "fill",
  "mask"
], ws = /* @__PURE__ */ ne({
  __name: "AtlasBackdrop",
  props: {
    projection: {},
    viewport: {},
    unitScale: {}
  },
  setup(e) {
    const t = e, a = `atlas-chart-${Be()}`, r = L(() => {
      const c = t.projection.features.filter((l) => l.source.role === "environment");
      return c.length && c.every((l) => l.source.material === c[0].source.material) ? c[0].source.material : void 0;
    }), s = L(() => r.value ? kt[r.value].base : "var(--atlas-paper)"), o = L(() => 100 * 2 ** Math.ceil(Math.log2(t.unitScale)));
    return (c, l) => (h(), v("g", ls, [
      d("defs", null, [
        d("pattern", {
          id: `${a}-grid`,
          patternUnits: "userSpaceOnUse",
          width: o.value,
          height: o.value
        }, [d("path", {
          d: `M${o.value} 0H0V${o.value}`,
          fill: "none",
          stroke: r.value === "vacuum" ? "#b8d4ed" : "#607b7c",
          "stroke-width": e.unitScale * 0.6,
          opacity: ".08"
        }, null, 8, us)], 8, os),
        d("pattern", {
          id: `${a}-unknown`,
          patternUnits: "userSpaceOnUse",
          width: e.unitScale * 14,
          height: e.unitScale * 14
        }, [d("circle", {
          cx: e.unitScale * 7,
          cy: e.unitScale * 7,
          r: e.unitScale * 0.55,
          fill: r.value === "vacuum" ? "#809bb6" : "#81938e",
          opacity: ".15"
        }, null, 8, ds)], 8, cs),
        d("mask", {
          id: `${a}-coverage`,
          maskUnits: "userSpaceOnUse",
          x: e.viewport[0],
          y: e.viewport[1],
          width: e.viewport[2],
          height: e.viewport[3],
          style: { "mask-type": "luminance" }
        }, [d("rect", {
          x: e.viewport[0],
          y: e.viewport[1],
          width: e.viewport[2],
          height: e.viewport[3],
          fill: "white"
        }, null, 8, fs), d("g", { "clip-path": e.projection.clip ? `url(#${a}-region)` : void 0 }, [(h(!0), v(q, null, Q(e.projection.features, (u) => (h(), v("path", {
          key: u.source.id,
          d: y(fe)(u.geometry),
          fill: y(pe)(u.geometry) ? "black" : "none",
          stroke: "black",
          "stroke-width": y(ft)(u.geometry),
          "stroke-linecap": "round"
        }, null, 8, ps))), 128))], 8, vs)], 8, hs),
        e.projection.clip ? (h(), v("clipPath", {
          key: 0,
          id: `${a}-region`
        }, [d("path", { d: y(fe)(e.projection.clip) }, null, 8, ys)], 8, ms)) : T("", !0)
      ]),
      d("rect", {
        x: e.viewport[0],
        y: e.viewport[1],
        width: e.viewport[2],
        height: e.viewport[3],
        fill: s.value
      }, null, 8, bs),
      d("rect", {
        x: e.viewport[0],
        y: e.viewport[1],
        width: e.viewport[2],
        height: e.viewport[3],
        fill: `url(#${a}-grid)`
      }, null, 8, ks),
      d("rect", {
        x: e.viewport[0],
        y: e.viewport[1],
        width: e.viewport[2],
        height: e.viewport[3],
        fill: `url(#${a}-unknown)`,
        mask: `url(#${a}-coverage)`
      }, null, 8, gs)
    ]));
  }
}), Ms = ws;
function Me(e) {
  return e.scale === "region";
}
function $s(e) {
  return e.scale !== "world" && !Me(e);
}
function nt(e, t) {
  const a = new Map(e.locations.map((o) => [o.key, o])), r = [];
  let s = a.get(t);
  for (; s; )
    r.unshift(s), s = s.parent ? a.get(s.parent) : void 0;
  return r;
}
function Qe(e, t) {
  return nt(e, t).reverse().find(Me);
}
function xs(e) {
  const t = /* @__PURE__ */ new Set(), a = e.actors.find((r) => r.actorKey === "player")?.locationKey;
  for (const r of e.locations)
    if (!(r.status !== "visited" && r.key !== a))
      for (const s of nt(e, r.key)) t.add(s.key);
  return t;
}
function Ft(e, t, a) {
  const r = new Set(a.map((s) => s.key));
  return nt(e, t).reverse().find((s) => r.has(s.key))?.key || "";
}
function _s(e, t) {
  return e.links.flatMap((a) => {
    if (a.from !== t && a.to !== t) return [];
    const r = e.locations.find((s) => s.key === (a.from === t ? a.to : a.from));
    return r ? [{
      location: r,
      link: a,
      outgoing: a.bidirectional || a.from === t
    }] : [];
  });
}
var Ss = ["id"], As = ["d"], Es = ["clip-path"], Cs = [
  "d",
  "stroke-width",
  "marker-start",
  "marker-end"
], Bs = [
  "transform",
  "aria-label",
  "onClick",
  "onKeydown"
], js = { transform: "translate(-14 -20)" }, Is = {
  y: "64",
  class: "map-place-name"
}, Ps = {
  key: 0,
  y: "89",
  class: "map-place-status"
}, Rs = {
  key: 1,
  y: "89",
  class: "map-place-status"
}, Ts = /* @__PURE__ */ ne({
  __name: "MapAtlas",
  props: {
    atlas: {},
    projection: {},
    label: {},
    currentLocationKey: {},
    selectedLocationKey: {},
    focusKey: {},
    focusSequence: {},
    insets: {}
  },
  emits: ["select"],
  setup(e, { expose: t }) {
    const a = e, r = L(() => Ft(a.atlas, a.currentLocationKey, a.projection.scope.locations)), s = L(() => a.projection.nodes.find((i) => i.location.key === a.focusKey)), o = L(() => a.projection.nodes.find((i) => i.location.key === r.value)), c = "map-arrow-" + Be(), l = Z(null);
    t({
      zoom: (i) => l.value?.zoom(i),
      reset: () => l.value?.reset()
    });
    function u(i, n) {
      return i === "water" ? "water" : i === "forest" ? "tree" : i === "mountain" ? "mountain" : ["world", "region"].includes(n) ? "globe" : n === "outdoor" ? "compass" : "building";
    }
    return (i, n) => (h(), ie(Vt, {
      ref_key: "camera",
      ref: l,
      class: "map-atlas-viewport",
      controls: !1,
      "view-box": e.projection.viewBox,
      "atlas-insets": e.insets,
      "initial-overview": !e.projection.features.length,
      "initial-point": o.value ? [o.value.x, o.value.y] : void 0,
      "reset-key": `${e.projection.scope.kind}:${e.projection.scope.region?.key || ""}`,
      label: e.label,
      "focus-point": s.value ? [s.value.x, s.value.y] : void 0,
      "focus-sequence": e.focusSequence
    }, {
      default: Ke(({ unitScale: m, viewport: M }) => [
        K(Ms, {
          projection: e.projection,
          viewport: M,
          "unit-scale": m
        }, null, 8, [
          "projection",
          "viewport",
          "unit-scale"
        ]),
        K(rs, {
          projection: e.projection,
          viewport: M,
          "unit-scale": m
        }, null, 8, [
          "projection",
          "viewport",
          "unit-scale"
        ]),
        d("defs", null, [d("marker", {
          id: c,
          viewBox: "0 0 10 10",
          refX: "9",
          refY: "5",
          markerWidth: "5",
          markerHeight: "5",
          orient: "auto-start-reverse"
        }, [...n[0] || (n[0] = [d("path", {
          d: "M1 1l8 4-8 4z",
          fill: "var(--map-road-ink)"
        }, null, -1)])]), e.projection.clip ? (h(), v("clipPath", {
          key: 0,
          id: `${c}-clip`
        }, [d("path", { d: y(fe)(e.projection.clip) }, null, 8, As)], 8, Ss)) : T("", !0)]),
        d("g", {
          class: "map-world-roads",
          "aria-hidden": "true",
          "clip-path": e.projection.clip ? `url(#${c}-clip)` : void 0
        }, [(h(!0), v(q, null, Q(e.projection.routes, (k) => (h(), v("g", { key: k.link.id }, [d("path", {
          d: y(fe)(k.feature.geometry),
          fill: "none",
          stroke: "var(--map-road-ink)",
          "stroke-width": m * 0.8,
          "marker-start": k.arrow === "start" ? `url(#${c})` : void 0,
          "marker-end": k.arrow === "end" ? `url(#${c})` : void 0
        }, null, 8, Cs)]))), 128))], 8, Es),
        (h(!0), v(q, null, Q(e.projection.nodes, (k) => (h(), v("g", {
          key: k.location.key,
          class: ce(["map-place", {
            "is-selected": k.location.key === e.selectedLocationKey,
            "is-current": k.location.key === r.value,
            "is-unvisited": k.location.status !== "visited"
          }]),
          transform: `translate(${k.x} ${k.y}) scale(${m * 0.5})`,
          role: "button",
          tabindex: "0",
          "aria-label": y(He).placeLabel(k.location.name),
          onClick: Ge((w) => i.$emit("select", k.location.key), ["stop"]),
          onKeydown: [$t(Ge((w) => i.$emit("select", k.location.key), ["stop"]), ["enter"]), $t(Ge((w) => i.$emit("select", k.location.key), ["stop", "prevent"]), ["space"])]
        }, [
          n[1] || (n[1] = d("circle", {
            class: "map-pin-halo",
            r: "39"
          }, null, -1)),
          n[2] || (n[2] = d("path", {
            class: "map-pin-body",
            d: "M0 33C-6 25-26 8-26-6a26 26 0 0 1 52 0C26 8 6 25 0 33Z"
          }, null, -1)),
          d("g", js, [K(F, {
            name: u(k.location.terrain, k.location.scale),
            width: "28",
            height: "28"
          }, null, 8, ["name"])]),
          d("text", Is, P(k.location.name.length > 14 ? k.location.name.slice(0, 13) + "…" : k.location.name), 1),
          k.location.key === r.value ? (h(), v("text", Ps, P(y(He).current), 1)) : k.location.status !== "visited" ? (h(), v("text", Rs, P(y(Ne).unvisited), 1)) : T("", !0),
          d("title", null, P(k.location.name) + P(k.location.brief ? " · " + k.location.brief : ""), 1)
        ], 42, Bs))), 128))
      ]),
      _: 1
    }, 8, [
      "view-box",
      "atlas-insets",
      "initial-overview",
      "initial-point",
      "reset-key",
      "label",
      "focus-point",
      "focus-sequence"
    ]));
  }
}), Os = Ts, Oe;
async function Wt() {
  if (!Oe) {
    const e = [
      "..",
      "..",
      "..",
      "libs",
      "material-symbols",
      "material-symbols-rounded.woff2"
    ].join("/"), t = new URL(e, import.meta.url);
    Oe = new FontFace("Xiaobai Map Symbols", `url("${t.href}")`, {
      display: "block",
      weight: "400"
    }).load(), Oe.catch(() => {
      Oe = void 0;
    });
  }
  document.fonts.add(await Oe);
}
var Ls = ["id"], Us = ["stop-color", "stop-opacity"], Hs = ["stop-color", "stop-opacity"], Ns = ["stop-color", "stop-opacity"], qs = ["id"], Vs = ["fill", "fill-opacity"], Ks = {
  fill: "none",
  stroke: "var(--scene-shadow)",
  "stroke-width": ".65",
  opacity: ".24"
}, zs = {
  key: 1,
  d: "M0 0H48V32H0ZM19 0V17M0 17H48M36 17V32M3 3h12m8 0h21"
}, Ds = {
  key: 2,
  d: "M0 0H48V32H0ZM24 0V32M0 16H48M12 4l5 4-5 4-5-4ZM36 20l5 4-5 4-5-4Z"
}, Fs = {
  key: 3,
  d: "M-3 3 8 11l17 2 9 10 18 3M27-3l-8 12 3 8-7 17",
  opacity: ".65"
}, Ws = {
  key: 4,
  d: "M3 8q6 3 13 0M25 25q7 2 17-1",
  stroke: "var(--scene-highlight)",
  "stroke-width": "1.3",
  opacity: "1"
}, Zs = {
  key: 5,
  d: "M5 32 37 0M12 32 44 0",
  stroke: "var(--scene-highlight)",
  "stroke-width": "2.2"
}, Ys = {
  key: 6,
  d: "M8 15l-2-4m2 4 3-3M36 26l-1-4m1 4 3-3"
}, Js = {
  key: 7,
  d: "M5 8h1m20-2h2m-12 17h2m23-6h1m-5 12h2",
  "stroke-linecap": "round"
}, Xs = {
  key: 8,
  d: "M0 0H48V32H0M0 5H48M0 27H48M5 5v1m38-1v1m-38 20v1m38-1v1"
}, Gs = {
  key: 9,
  d: "M0 5H48M0 13H48M0 21H48M0 29H48M4 0v32m8-32v32m8-32v32m8-32v32m8-32v32m8-32v32",
  opacity: ".55"
}, Qs = {
  key: 10,
  d: "m24 5 8 11-8 11-8-11ZM24 10v12M20 16h8"
}, ei = {
  key: 11,
  d: "M7 8q12-5 16 6t20 7M4 27l6-3"
}, ti = {
  key: 12,
  d: "M5 19q5-3 11-1M29 8q6-2 12 1",
  stroke: "var(--scene-highlight)",
  "stroke-width": "1.4"
}, ai = {
  key: 0,
  d: "M0 1H48",
  stroke: "var(--scene-highlight)",
  "stroke-width": ".7",
  opacity: ".35"
}, ni = ["id"], si = ["id"], ii = ["transform", "fill"], ri = /* @__PURE__ */ ne({
  __name: "SceneMaterials",
  props: { prefix: {} },
  setup(e) {
    return (t, a) => (h(), v("defs", null, [
      (h(!0), v(q, null, Q(y(Lt), (r) => (h(), v(q, { key: r }, [d("linearGradient", {
        id: `${e.prefix}-face-${r}`,
        x1: "0",
        y1: "0",
        x2: ".7",
        y2: "1"
      }, [
        d("stop", {
          offset: "0",
          "stop-color": `color-mix(in srgb, ${y(Le)(r)}, var(--scene-highlight) 24%)`,
          "stop-opacity": r === "glass" ? 0.35 : 1
        }, null, 8, Us),
        d("stop", {
          offset: ".52",
          "stop-color": y(Le)(r),
          "stop-opacity": r === "glass" ? 0.16 : 1
        }, null, 8, Hs),
        d("stop", {
          offset: "1",
          "stop-color": `color-mix(in srgb, ${y(Le)(r)}, var(--scene-shadow) 16%)`,
          "stop-opacity": r === "glass" ? 0.28 : 1
        }, null, 8, Ns)
      ], 8, Ls), d("pattern", {
        id: `${e.prefix}-material-${r}`,
        width: "48",
        height: "32",
        patternUnits: "userSpaceOnUse",
        class: "scene-texture"
      }, [
        d("rect", {
          width: "48",
          height: "32",
          fill: y(Le)(r),
          "fill-opacity": r === "glass" ? 0.4 : 1
        }, null, 8, Vs),
        d("g", Ks, [r === "wood" ? (h(), v(q, { key: 0 }, [a[0] || (a[0] = d("path", { d: "M0 0H48M0 16H48M19 0V16M37 16V32" }, null, -1)), a[1] || (a[1] = d("path", {
          d: "M3 7Q12 4 26 8T47 7M2 26q10-4 25 0t23-1",
          opacity: ".5"
        }, null, -1))], 64)) : r === "stone" ? (h(), v("path", zs)) : r === "tile" ? (h(), v("path", Ds)) : r === "marble" ? (h(), v("path", Fs)) : r === "water" ? (h(), v("path", Ws)) : r === "glass" ? (h(), v("path", Zs)) : r === "grass" || r === "forest" ? (h(), v("path", Ys)) : r === "dirt" || r === "sand" ? (h(), v("path", Js)) : r === "metal" ? (h(), v("path", Xs)) : [
          "carpet",
          "fabric",
          "bed-sheet",
          "tatami"
        ].includes(r) ? (h(), v("path", Gs)) : r === "rune" ? (h(), v("path", Qs)) : r === "blood" ? (h(), v("path", ei)) : r === "snow" ? (h(), v("path", ti)) : T("", !0)]),
        r === "wood" || r === "stone" || r === "metal" ? (h(), v("path", ai)) : T("", !0)
      ], 8, qs)], 64))), 128)),
      d("radialGradient", {
        id: `${e.prefix}-crown-face`,
        cx: ".32",
        cy: ".25",
        r: ".8"
      }, [...a[2] || (a[2] = [
        d("stop", {
          offset: "0",
          "stop-color": "var(--scene-leaf-light)"
        }, null, -1),
        d("stop", {
          offset: ".6",
          "stop-color": "var(--scene-leaf)"
        }, null, -1),
        d("stop", {
          offset: "1",
          "stop-color": "var(--scene-leaf-dark)"
        }, null, -1)
      ])], 8, ni),
      (h(), v(q, null, Q(3, (r) => d("symbol", {
        id: `${e.prefix}-crown-${r - 1}`,
        key: r,
        viewBox: "0 0 100 100"
      }, [d("g", {
        transform: `rotate(${r * 37} 50 50)`,
        fill: `url(#${e.prefix}-crown-face)`,
        stroke: "var(--scene-leaf-dark)",
        "stroke-width": ".6"
      }, [...a[3] || (a[3] = [
        d("path", { d: "M49 5Q65 2 73 16Q91 14 93 36Q99 46 90 59Q95 76 76 81Q68 96 50 91Q30 97 23 82Q5 79 9 60Q-1 45 9 34Q7 17 28 16Q33 1 49 5Z" }, null, -1),
        d("circle", {
          cx: "34",
          cy: "32",
          r: "21"
        }, null, -1),
        d("circle", {
          cx: "69",
          cy: "36",
          r: "22"
        }, null, -1),
        d("circle", {
          cx: "30",
          cy: "62",
          r: "20"
        }, null, -1),
        d("circle", {
          cx: "64",
          cy: "67",
          r: "23"
        }, null, -1),
        d("circle", {
          cx: "49",
          cy: "48",
          r: "24"
        }, null, -1),
        d("path", {
          d: "M24 25q8-10 19-5M61 21q11-3 17 8M36 45q9-11 21-8M63 59q9-2 14 6",
          fill: "none",
          stroke: "var(--scene-leaf-light)",
          "stroke-width": "1.4",
          opacity: ".75"
        }, null, -1)
      ])], 8, ii)], 8, si)), 64))
    ]));
  }
}), li = ri, oi = [
  "x",
  "y",
  "width",
  "height"
], ui = {
  key: 0,
  cx: "50",
  cy: "50",
  r: "50"
}, ci = {
  key: 1,
  width: "100",
  height: "100"
}, di = ["clip-path", "fill"], hi = {
  key: 0,
  cx: "50",
  cy: "50",
  r: "49",
  class: "scene-object-edge"
}, fi = {
  key: 1,
  x: "1",
  y: "1",
  width: "98",
  height: "98",
  rx: "2",
  class: "scene-object-edge"
}, vi = ["fill"], pi = ["fill"], mi = ["d"], yi = {
  key: 0,
  d: "M9 78H91",
  class: "scene-object-seam"
}, bi = ["x"], ki = /* @__PURE__ */ ne({
  __name: "SceneObject",
  props: {
    element: {},
    prefix: {},
    unitScale: {}
  },
  setup(e) {
    const t = e, a = L(() => Ut(t.element)), r = L(() => Math.min(a.value.width, a.value.height) / t.unitScale >= 12), s = L(() => t.element.shape === "circle"), o = L(() => t.element.material), c = L(() => xa(o.value, t.prefix)), l = L(() => ha(o.value, t.prefix)), u = `scene-object-${Be()}`;
    return (i, n) => (h(), v("svg", {
      x: a.value.x,
      y: a.value.y,
      width: a.value.width,
      height: a.value.height,
      viewBox: "0 0 100 100",
      preserveAspectRatio: "none",
      class: "scene-object"
    }, [d("defs", null, [d("clipPath", { id: u }, [s.value ? (h(), v("circle", ui)) : (h(), v("rect", ci))])]), d("g", {
      "clip-path": `url(#${u})`,
      fill: c.value
    }, [s.value ? (h(), v("circle", hi)) : (h(), v("rect", fi)), r.value ? (h(), v(q, { key: 2 }, [s.value ? (h(), v("circle", {
      key: 0,
      cx: "50",
      cy: "50",
      r: "44",
      fill: l.value,
      class: "scene-object-inset"
    }, null, 8, vi)) : (h(), v("rect", {
      key: 1,
      x: "5",
      y: "5",
      width: "90",
      height: "90",
      rx: "2",
      fill: l.value,
      class: "scene-object-inset"
    }, null, 8, pi)), e.element.icon === "table" || e.element.icon === "counter" ? (h(), v(q, { key: 2 }, [d("path", {
      d: s.value ? "M18 36A35 35 0 0 1 72 22" : "M8 13V8H92",
      class: "scene-object-shine"
    }, null, 8, mi), e.element.icon === "counter" ? (h(), v("path", yi)) : T("", !0)], 64)) : e.element.icon === "chair" ? (h(), v(q, { key: 3 }, [
      n[0] || (n[0] = d("rect", {
        x: "12",
        y: "29",
        width: "76",
        height: "61",
        rx: "9",
        class: "scene-object-inset"
      }, null, -1)),
      n[1] || (n[1] = d("rect", {
        x: "7",
        y: "5",
        width: "86",
        height: "23",
        rx: "6",
        class: "scene-object-edge"
      }, null, -1)),
      n[2] || (n[2] = d("path", {
        d: "M16 12H84",
        class: "scene-object-shine"
      }, null, -1))
    ], 64)) : e.element.icon === "bed" ? (h(), v(q, { key: 4 }, [
      n[3] || (n[3] = d("rect", {
        x: "10",
        y: "12",
        width: "80",
        height: "79",
        rx: "5",
        class: "scene-object-inset"
      }, null, -1)),
      n[4] || (n[4] = d("rect", {
        x: "20",
        y: "17",
        width: "60",
        height: "20",
        rx: "7",
        class: "scene-object-inset"
      }, null, -1)),
      n[5] || (n[5] = d("path", {
        d: "M12 45H88M17 82H83",
        class: "scene-object-seam"
      }, null, -1)),
      n[6] || (n[6] = d("path", {
        d: "M18 49H82",
        class: "scene-object-shine"
      }, null, -1))
    ], 64)) : e.element.icon === "shelf" ? (h(), v(q, { key: 5 }, [n[7] || (n[7] = d("path", {
      d: "M8 32H92M8 66H92M40 8V32M65 32V66M35 66V92",
      class: "scene-object-seam"
    }, null, -1)), n[8] || (n[8] = d("path", {
      d: "M8 34H92M8 68H92",
      class: "scene-object-shine"
    }, null, -1))], 64)) : e.element.icon === "sofa" ? (h(), v(q, { key: 6 }, [
      n[9] || (n[9] = d("rect", {
        x: "8",
        y: "5",
        width: "84",
        height: "25",
        rx: "7",
        class: "scene-object-inset"
      }, null, -1)),
      (h(), v(q, null, Q(3, (m) => d("rect", {
        key: m,
        x: 15 + (m - 1) * 24,
        y: "32",
        width: "22",
        height: "57",
        rx: "5",
        class: "scene-object-inset"
      }, null, 8, bi)), 64)),
      n[10] || (n[10] = d("rect", {
        x: "3",
        y: "23",
        width: "11",
        height: "70",
        rx: "4",
        class: "scene-object-inset"
      }, null, -1)),
      n[11] || (n[11] = d("rect", {
        x: "86",
        y: "23",
        width: "11",
        height: "70",
        rx: "4",
        class: "scene-object-inset"
      }, null, -1))
    ], 64)) : e.element.icon === "bridge" ? (h(), v(q, { key: 7 }, [n[12] || (n[12] = d("path", {
      d: "M7 7V93M93 7V93M9 20H91M9 35H91M9 50H91M9 65H91M9 80H91",
      class: "scene-object-seam"
    }, null, -1)), n[13] || (n[13] = d("path", {
      d: "M11 7V93M89 7V93",
      class: "scene-object-shine"
    }, null, -1))], 64)) : e.element.icon === "tree" ? (h(), v(q, { key: 8 }, [n[14] || (n[14] = ta('<circle cx="34" cy="32" r="24" class="scene-object-inset"></circle><circle cx="69" cy="36" r="24" class="scene-object-inset"></circle><circle cx="30" cy="62" r="23" class="scene-object-inset"></circle><circle cx="64" cy="67" r="25" class="scene-object-inset"></circle><circle cx="49" cy="48" r="26" class="scene-object-inset"></circle><path d="M21 24q10-10 22-4M36 41q8-9 22-6M64 56q8-1 13 5" class="scene-object-shine"></path>', 6))], 64)) : e.element.icon === "rock" ? (h(), v(q, { key: 9 }, [n[15] || (n[15] = d("path", {
      d: "M8 38 33 12 76 18 93 57 71 88 25 86ZM33 12 41 44 8 38M41 44 76 18M41 44 71 88M41 44 93 57",
      class: "scene-object-seam"
    }, null, -1)), n[16] || (n[16] = d("path", {
      d: "M12 38 33 17 72 22",
      class: "scene-object-shine"
    }, null, -1))], 64)) : T("", !0)], 64)) : T("", !0)], 8, di)], 8, oi));
  }
}), gi = ki, wi = ["data-element", "opacity"], Mi = ["transform"], $i = ["d"], xi = ["d", "stroke-width"], _i = [
  "d",
  "fill",
  "stroke",
  "stroke-width",
  "stroke-dasharray",
  "stroke-linecap"
], Si = [
  "d",
  "stroke",
  "stroke-opacity",
  "stroke-dasharray"
], Ai = ["transform"], Ei = ["id"], Ci = ["d"], Bi = ["clip-path"], ji = [
  "href",
  "x",
  "y",
  "width",
  "height"
], Ii = ["transform"], Pi = {
  key: 0,
  r: "19",
  class: "scene-player-halo"
}, Ri = ["stroke"], Ti = {
  key: 1,
  class: "map-material-symbol",
  "aria-hidden": "true"
}, Oi = {
  key: 2,
  class: "map-symbol-fallback",
  "aria-hidden": "true"
}, Li = ["x", "y"], Ui = /* @__PURE__ */ ne({
  __name: "MapScene",
  props: { scene: {} },
  setup(e) {
    const t = e, a = Z(!1);
    ze(() => {
      Wt().then(() => {
        a.value = !0;
      }).catch(() => {
        a.value = !1;
      });
    });
    const r = `xiaobai-map-scene-${Be()}`, s = L(() => Nt[t.scene.mood || "neutral"]), o = L(() => wa(t.scene.elements)), c = L(() => ga(t.scene.elements).map((l, u) => ({
      element: l,
      bounds: Ut(l),
      path: ma(l),
      transform: pa(l),
      area: ba(l),
      presentation: da(l, r),
      clipId: `${r}-area-${u}`,
      object: va(l) && !_t(l),
      marker: _t(l) && l.shape !== "label"
    })));
    return (l, u) => (h(), ie(Vt, {
      class: "map-scene-viewport",
      style: Ue({ "--scene-glow": s.value.glow }),
      "view-box": e.scene.viewBox,
      "reset-key": e.scene.key,
      label: `${e.scene.name} 场景地图`
    }, {
      default: Ke(({ unitScale: i }) => [
        K(li, { prefix: r }),
        (h(!0), v(q, null, Q(c.value, (n) => (h(), v("g", {
          key: n.element.id,
          class: ce(["map-scene-element", [`is-${n.element.category}`, `is-${n.element.certainty || "confirmed"}`]]),
          "data-element": n.element.id,
          opacity: n.presentation.opacity
        }, [d("g", { transform: n.transform }, [
          n.object ? (h(), ie(gi, {
            key: 0,
            element: n.element,
            prefix: r,
            "unit-scale": i
          }, null, 8, ["element", "unit-scale"])) : n.path ? (h(), v(q, { key: 1 }, [
            n.element.category === "wall" ? (h(), v("path", {
              key: 0,
              d: n.path,
              fill: "none",
              stroke: "var(--scene-shadow)",
              "stroke-width": "9",
              opacity: ".18",
              "stroke-linejoin": "round",
              "vector-effect": "non-scaling-stroke"
            }, null, 8, $i)) : T("", !0),
            n.element.category === "road" && !n.area ? (h(), v("path", {
              key: 1,
              d: n.path,
              fill: "none",
              stroke: "var(--scene-soft-edge)",
              "stroke-width": n.presentation.width + 2,
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "vector-effect": "non-scaling-stroke"
            }, null, 8, xi)) : T("", !0),
            d("path", {
              d: n.path,
              fill: n.presentation.fill,
              stroke: n.presentation.stroke,
              "stroke-width": n.presentation.width,
              "stroke-dasharray": n.presentation.dash,
              "stroke-linejoin": "round",
              "stroke-linecap": n.element.category === "wall" ? "butt" : "round",
              "fill-rule": "evenodd",
              "vector-effect": "non-scaling-stroke"
            }, null, 8, _i),
            n.element.category === "wall" ? (h(), v("path", {
              key: 2,
              d: n.path,
              fill: "none",
              stroke: n.element.material ? y(Le)(n.element.material) : "var(--scene-wall)",
              "stroke-width": "3.5",
              "stroke-opacity": n.element.material === "glass" ? 0.4 : 1,
              "stroke-dasharray": n.presentation.dash,
              "stroke-linejoin": "round",
              "vector-effect": "non-scaling-stroke"
            }, null, 8, Si)) : T("", !0)
          ], 64)) : T("", !0),
          n.object && !y(fa)(n.element) && Math.min(n.bounds.width, n.bounds.height) / i >= 12 ? (h(), v("g", {
            key: 2,
            transform: `translate(${n.bounds.x + n.bounds.width / 2} ${n.bounds.y + n.bounds.height / 2})`,
            "aria-hidden": "true"
          }, [d("text", {
            class: ce(a.value ? "map-material-symbol" : "map-symbol-fallback"),
            style: Ue({
              fontSize: `${Math.min(22 * i, Math.min(n.bounds.width, n.bounds.height) * 0.65)}px`,
              fill: "var(--scene-edge)",
              textAnchor: "middle",
              dominantBaseline: "central"
            })
          }, P(a.value ? n.presentation.icon : n.presentation.fallback), 7)], 8, Ai)) : T("", !0),
          o.value.has(n.element.id) ? (h(), v(q, { key: 3 }, [d("defs", null, [d("clipPath", { id: n.clipId }, [d("path", {
            d: n.path,
            "clip-rule": "evenodd"
          }, null, 8, Ci)], 8, Ei)]), d("g", {
            "clip-path": `url(#${n.clipId})`,
            class: "scene-forest-decoration",
            "aria-hidden": "true"
          }, [(h(!0), v(q, null, Q(o.value.get(n.element.id), (m, M) => (h(), v("use", {
            key: M,
            href: `#${r}-crown-${m.variant}`,
            x: m.x - m.size / 2,
            y: m.y - m.size / 2,
            width: m.size,
            height: m.size
          }, null, 8, ji))), 128))], 8, Bi)], 64)) : T("", !0)
        ], 8, Mi), n.marker ? (h(), v("g", {
          key: 0,
          class: "map-scene-icon",
          transform: `translate(${n.bounds.x + n.bounds.width / 2} ${n.bounds.y + n.bounds.height / 2}) scale(${i})`
        }, [
          n.element.actorKey === "player" || n.element.kind === "player" ? (h(), v("circle", Pi)) : T("", !0),
          d("circle", {
            r: "11",
            stroke: n.presentation.stroke
          }, null, 8, Ri),
          a.value ? (h(), v("text", Ti, P(n.presentation.icon), 1)) : (h(), v("text", Oi, P(n.presentation.fallback), 1))
        ], 8, Ii)) : T("", !0)], 10, wi))), 128)),
        d("g", {
          class: "scene-labels",
          style: Ue({ "--scene-unit-scale": i })
        }, [(h(!0), v(q, null, Q(c.value, (n) => (h(), v(q, { key: n.element.id }, [n.element.label ? (h(), v("text", {
          key: 0,
          class: ce(["map-scene-label", { "is-primary": n.element.shape === "label" }]),
          x: y(xt)(n.element, i)[0],
          y: y(xt)(n.element, i)[1]
        }, P(n.element.label), 11, Li)) : T("", !0)], 64))), 128))], 4)
      ]),
      _: 1
    }, 8, [
      "style",
      "view-box",
      "reset-key",
      "label"
    ]));
  }
}), Hi = Ui, Ni = {
  key: 0,
  class: "map-3d-loading",
  role: "status"
}, qi = {
  class: "map-viewport-controls",
  "aria-label": "三维视角"
}, Vi = /* @__PURE__ */ ne({
  __name: "MapScene3D",
  props: {
    scene: {},
    lowWalls: { type: Boolean },
    showLabels: { type: Boolean }
  },
  emits: ["fallback"],
  setup(e, { emit: t }) {
    const a = e, r = t, s = Z(null), o = Z(null), c = Z(!0);
    let l, u = !1;
    return ze(async () => {
      u = !0;
      try {
        const { createThreeRuntime: i } = await import("./xiaobai-os-three-runtime-IAUx_Pqi.js");
        if (!u) return;
        l = i(s.value, o.value, { fallback: (n) => r("fallback", n) }), l.setScene(a.scene), l.walls(a.lowWalls), l.labels(a.showLabels), c.value = !1, Wt().then(() => {
          u && l?.symbols(!0);
        }).catch(() => {
        });
      } catch {
        u && r("fallback", "当前设备无法打开三维，已切换二维。");
      }
    }), de(() => a.scene, (i) => l?.setScene(i)), de(() => a.lowWalls, (i) => l?.walls(i)), de(() => a.showLabels, (i) => l?.labels(i)), Ve(() => {
      u = !1, l?.dispose(), l = void 0;
    }), (i, n) => (h(), v("div", {
      ref_key: "host",
      ref: s,
      class: "map-scene-three",
      style: Ue({ "--scene-glow": y(Nt)[e.scene.mood || "neutral"].glow })
    }, [
      d("div", {
        ref_key: "labelHost",
        ref: o,
        class: "map-3d-labels"
      }, null, 512),
      c.value ? (h(), v("div", Ni, "正在打开三维…")) : T("", !0),
      d("div", qi, [
        d("button", {
          type: "button",
          "aria-label": "放大三维",
          onClick: n[0] || (n[0] = (m) => y(l)?.zoom(1.2))
        }, "+"),
        d("button", {
          type: "button",
          "aria-label": "缩小三维",
          onClick: n[1] || (n[1] = (m) => y(l)?.zoom(1 / 1.2))
        }, "−"),
        d("button", {
          type: "button",
          class: "map-fit",
          "aria-label": "重置三维视角",
          onClick: n[2] || (n[2] = (m) => y(l)?.fit())
        }, "全图")
      ])
    ], 4));
  }
}), Ki = Vi, zi = ["aria-label"], Di = { class: "map-scene-toolbar" }, Fi = {
  class: "map-render-switch",
  role: "group",
  "aria-label": "场景显示方式"
}, Wi = ["aria-pressed"], Zi = ["aria-pressed", "disabled"], Yi = ["aria-pressed"], Ji = ["aria-pressed"], Xi = { class: "map-scene-stage" }, Gi = /* @__PURE__ */ ne({
  __name: "MapSceneView",
  props: {
    scene: {},
    mode: {},
    threeUnavailable: { type: Boolean }
  },
  emits: ["update:mode", "fallback"],
  setup(e, { emit: t }) {
    const a = t, r = Z(!1), s = Z(!0);
    return (o, c) => (h(), v("section", {
      class: "map-scene-view",
      "aria-label": e.scene.name
    }, [d("div", Di, [
      d("div", Fi, [d("button", {
        type: "button",
        "aria-pressed": e.mode === "2d",
        onClick: c[0] || (c[0] = (l) => a("update:mode", "2d"))
      }, "二维", 8, Wi), d("button", {
        type: "button",
        "aria-pressed": e.mode === "3d",
        disabled: e.threeUnavailable,
        onClick: c[1] || (c[1] = (l) => a("update:mode", "3d"))
      }, "三维", 8, Zi)]),
      e.mode === "3d" ? (h(), v("button", {
        key: 0,
        type: "button",
        "aria-pressed": r.value,
        onClick: c[2] || (c[2] = (l) => r.value = !r.value)
      }, "低墙", 8, Yi)) : T("", !0),
      e.mode === "3d" ? (h(), v("button", {
        key: 1,
        type: "button",
        "aria-pressed": s.value,
        onClick: c[3] || (c[3] = (l) => s.value = !s.value)
      }, "名称", 8, Ji)) : T("", !0)
    ]), d("div", Xi, [yt(K(Hi, { scene: e.scene }, null, 8, ["scene"]), [[Rt, e.mode === "2d"]]), e.mode === "3d" ? (h(), ie(Ki, {
      key: 0,
      scene: e.scene,
      "low-walls": r.value,
      "show-labels": s.value,
      onFallback: c[4] || (c[4] = (l) => a("fallback", l))
    }, null, 8, [
      "scene",
      "low-walls",
      "show-labels"
    ])) : T("", !0)])], 8, zi));
  }
}), Qi = Gi;
function er(e) {
  const t = e?.atlas.actors.find((r) => r.actorKey === "player"), a = e?.atlas.locations.find((r) => r.key === t?.locationKey);
  return a?.sceneKey && e?.scenes[a.sceneKey]?.status === "active" ? "scene" : "world";
}
var tr = { class: "map-dialog-header" }, ar = { key: 0 }, nr = { class: "map-settings-content" }, sr = { class: "map-auto-setting" }, ir = ["aria-checked", "disabled"], rr = { class: "map-settings-section" }, lr = ["disabled"], or = { key: 0 }, ur = { class: "map-settings-section" }, cr = { key: 0 }, dr = ["disabled"], hr = {
  key: 0,
  class: "map-setting-note",
  role: "status"
}, fr = ["disabled"], vr = /* @__PURE__ */ ne({
  __name: "MapSettings",
  props: {
    autoMaintenance: { type: Boolean },
    busy: { type: Boolean },
    refreshDisabled: { type: Boolean },
    autoToggleBusy: { type: Boolean },
    disabledReason: {},
    hasMap: { type: Boolean },
    status: {},
    maintenanceMessage: {},
    maintenanceError: { type: Boolean },
    notice: {},
    noticeError: { type: Boolean }
  },
  emits: [
    "close",
    "setAuto",
    "update",
    "rebuild",
    "refresh"
  ],
  setup(e) {
    return (t, a) => (h(), ie(Tt, {
      class: "map-dialog map-settings",
      "aria-labelledby": "map-settings-title",
      onClose: a[5] || (a[5] = (r) => t.$emit("close"))
    }, {
      default: Ke(() => [
        d("header", tr, [a[6] || (a[6] = d("div", null, [d("small", null, "让地图跟上你的故事"), d("h2", { id: "map-settings-title" }, "地图设置")], -1)), d("button", {
          type: "button",
          class: "map-round-button",
          "aria-label": "关闭地图设置",
          onClick: a[0] || (a[0] = (r) => t.$emit("close"))
        }, [K(F, { name: "close" })])]),
        e.status || e.notice || e.maintenanceMessage ? (h(), v("section", {
          key: 0,
          class: ce(["map-settings-feedback", { "is-error": e.notice ? e.noticeError : e.maintenanceError }]),
          role: "status"
        }, [d("strong", null, P(e.notice ? e.notice === e.maintenanceMessage ? "最近一次更新" : "操作提示" : e.status || "最近一次更新"), 1), e.notice || e.maintenanceMessage ? (h(), v("p", ar, P(e.notice || e.maintenanceMessage), 1)) : T("", !0)], 2)) : T("", !0),
        d("div", nr, [
          d("section", sr, [a[8] || (a[8] = d("div", null, [d("h3", null, "随对话自动更新"), d("p", null, "你发送下一条消息时，根据上一轮对话更新地图。适用于所有普通聊天。")], -1)), d("button", {
            type: "button",
            class: "map-switch",
            role: "switch",
            "aria-checked": e.autoMaintenance,
            "aria-label": "随对话自动更新",
            disabled: e.autoToggleBusy,
            onClick: a[1] || (a[1] = (r) => t.$emit("setAuto", !e.autoMaintenance))
          }, [...a[7] || (a[7] = [d("span", null, null, -1)])], 8, ir)]),
          d("section", rr, [
            K(F, { name: "refresh" }),
            a[9] || (a[9] = d("h3", null, "补充最近的变化", -1)),
            a[10] || (a[10] = d("p", null, "根据最近一轮对话更新位置和地点，并补全当前区域尚缺少的探索去处。", -1)),
            d("button", {
              type: "button",
              class: "map-primary-button",
              disabled: e.busy || !!e.disabledReason || !e.hasMap,
              onClick: a[2] || (a[2] = (r) => t.$emit("update"))
            }, P(e.busy ? e.status || "请稍候…" : "更新地图"), 9, lr),
            e.hasMap ? T("", !0) : (h(), v("small", or, "请先建立世界地图"))
          ]),
          d("section", ur, [
            K(F, { name: "globe" }),
            d("h3", null, P(e.hasMap ? "重新绘制世界" : "建立世界地图"), 1),
            a[11] || (a[11] = d("p", null, "依据角色与世界设定建立地图；设定未写明的地方，会合理补全。结合当前聊天保留已发生的故事。", -1)),
            e.hasMap ? (h(), v("p", cr, "新地图保存成功后替换原图；失败时保留原图。")) : T("", !0),
            d("button", {
              type: "button",
              class: "map-secondary-button",
              disabled: e.busy || !!e.disabledReason,
              onClick: a[3] || (a[3] = (r) => t.$emit("rebuild"))
            }, P(e.busy ? e.status || "请稍候…" : e.hasMap ? "重新绘制" : "绘制世界地图"), 9, dr)
          ]),
          e.disabledReason ? (h(), v("p", hr, P(e.disabledReason), 1)) : T("", !0),
          d("button", {
            type: "button",
            class: "map-sync-button",
            disabled: e.busy || e.refreshDisabled,
            onClick: a[4] || (a[4] = (r) => t.$emit("refresh"))
          }, [K(F, { name: "refresh" }), a[12] || (a[12] = te("重新加载地图", -1))], 8, fr),
          a[13] || (a[13] = d("p", { class: "map-setting-note" }, "只加载已保存的地图，不会重新绘制。绘制或更新时可以离开此页面。", -1))
        ])
      ]),
      _: 1
    }));
  }
}), pr = vr;
function mr(e, t, a) {
  const r = t.trim().toLocaleLowerCase();
  return e.locations.filter((s) => [s.name, s.brief].some((o) => o?.toLocaleLowerCase().includes(r)) && (a === "all" || (a === "visited" ? s.status === "visited" : s.status !== "visited")));
}
var yr = { class: "map-search-input" }, br = ["aria-label", "placeholder"], kr = { class: "map-search-scope" }, gr = ["aria-label"], wr = ["aria-pressed", "onClick"], Mr = { class: "map-search-results" }, $r = ["onClick"], xr = { class: "map-result-icon" }, _r = { key: 0 }, Sr = {
  key: 0,
  class: "map-search-empty"
}, Ar = /* @__PURE__ */ ne({
  __name: "MapSearch",
  props: {
    scope: {},
    title: {},
    initialFilter: {}
  },
  emits: ["close", "select"],
  setup(e) {
    const t = e, a = Z(""), r = Z(t.initialFilter), s = L(() => Ot[t.scope.kind]), o = L(() => [
      {
        id: "all",
        name: s.value.all
      },
      {
        id: "unvisited",
        name: Ne.unvisited
      },
      {
        id: "visited",
        name: Ne.visited
      }
    ]), c = L(() => mr(t.scope, a.value, r.value));
    return (l, u) => (h(), ie(Tt, {
      class: "map-dialog map-search-dialog",
      "aria-label": s.value.search,
      onClose: u[2] || (u[2] = (i) => l.$emit("close"))
    }, {
      default: Ke(() => [
        d("header", yr, [
          K(F, { name: "search" }),
          yt(d("input", {
            "onUpdate:modelValue": u[0] || (u[0] = (i) => a.value = i),
            type: "search",
            "aria-label": s.value.search,
            placeholder: s.value.search,
            autofocus: ""
          }, null, 8, br), [[aa, a.value]]),
          d("button", {
            type: "button",
            onClick: u[1] || (u[1] = (i) => l.$emit("close"))
          }, P(y(G).cancel), 1)
        ]),
        d("h2", kr, P(e.title), 1),
        d("nav", {
          class: "map-search-filters",
          "aria-label": y(G).filters
        }, [(h(!0), v(q, null, Q(o.value, (i) => (h(), v("button", {
          key: i.id,
          type: "button",
          "aria-pressed": r.value === i.id,
          onClick: (n) => r.value = i.id
        }, P(i.name), 9, wr))), 128))], 8, gr),
        d("div", Mr, [
          d("small", null, P(y(ra)(e.scope.kind, c.value.length)), 1),
          (h(!0), v(q, null, Q(c.value, (i) => (h(), v("button", {
            key: i.key,
            type: "button",
            class: "map-search-result",
            onClick: (n) => l.$emit("select", i.key)
          }, [
            d("span", xr, [K(F, { name: e.scope.kind === "world" ? "globe" : "pin" }, null, 8, ["name"])]),
            d("span", null, [
              d("strong", null, P(i.name), 1),
              d("small", null, P(y(Ht)[i.scale]) + " · " + P(y(Ne)[i.status === "visited" ? "visited" : "unvisited"]), 1),
              i.brief ? (h(), v("p", _r, P(i.brief), 1)) : T("", !0)
            ]),
            K(F, { name: "next" })
          ], 8, $r))), 128)),
          c.value.length ? T("", !0) : (h(), v("div", Sr, [
            K(F, { name: "search" }),
            d("h3", null, P(s.value.notFound), 1),
            d("p", null, P(y(G).searchHint), 1)
          ]))
        ])
      ]),
      _: 1
    }, 8, ["aria-label"]));
  }
}), Er = Ar, Cr = {
  class: "map-place-detail",
  "aria-labelledby": "map-place-title"
}, Br = { id: "map-place-title" }, jr = { class: "map-place-content" }, Ir = ["data-position-status"], Pr = {
  key: 1,
  class: "map-place-full-name"
}, Rr = {
  key: 2,
  class: "map-address"
}, Tr = { class: "map-place-intro" }, Or = { class: "map-place-actions" }, Lr = {
  key: 3,
  class: "map-detail-section"
}, Ur = { class: "map-people" }, Hr = {
  key: 4,
  class: "map-detail-section"
}, Nr = ["onClick"], qr = /* @__PURE__ */ ne({
  __name: "MapPlaceDetail",
  props: {
    location: {},
    map: {},
    currentKey: {},
    unlocated: {}
  },
  emits: [
    "close",
    "scene",
    "explore",
    "select"
  ],
  setup(e) {
    const t = e, a = L(() => nt(t.map.atlas, t.location.key).slice(0, -1)), r = L(() => Me(t.location)), s = L(() => t.map.atlas.actors.filter((c) => c.locationKey === t.location.key)), o = L(() => _s(t.map.atlas, t.location.key));
    return (c, l) => (h(), v("section", Cr, [
      l[6] || (l[6] = d("div", {
        class: "map-sheet-grip",
        "aria-hidden": "true"
      }, null, -1)),
      d("header", null, [d("div", null, [d("small", null, P(y(Ht)[e.location.scale]) + " · " + P(e.currentKey === e.location.key ? "当前位置" : y(Ne)[e.location.status === "visited" ? "visited" : "unvisited"]), 1), d("h2", Br, P(e.location.name), 1)]), d("button", {
        type: "button",
        class: "map-round-button",
        "aria-label": "关闭地点详情",
        onClick: l[0] || (l[0] = (u) => c.$emit("close"))
      }, [K(F, { name: "close" })])]),
      d("div", jr, [
        e.unlocated ? (h(), v("p", {
          key: 0,
          class: "map-position-note",
          "data-position-status": e.unlocated
        }, [K(F, { name: "pin" }), te(P(y(ya)[e.unlocated]), 1)], 8, Ir)) : T("", !0),
        e.location.name.length > 24 ? (h(), v("p", Pr, P(e.location.name), 1)) : T("", !0),
        a.value.length ? (h(), v("p", Rr, [K(F, { name: "pin" }), te(P(a.value.map((u) => u.name).join(" · ")), 1)])) : T("", !0),
        d("p", Tr, P(e.location.brief || "这个地点已记录在世界地图上，更多介绍等待故事展开。"), 1),
        d("div", Or, [r.value ? (h(), v("button", {
          key: 0,
          type: "button",
          class: "map-primary-button",
          onClick: l[1] || (l[1] = (u) => c.$emit("explore"))
        }, [K(F, { name: "compass" }), te(P(y(G).regionMap), 1)])) : (h(), v("button", {
          key: 1,
          type: "button",
          class: "map-secondary-button",
          onClick: l[2] || (l[2] = (u) => c.$emit("scene"))
        }, [K(F, { name: "layers" }), te(P(y(G).sceneMap), 1)]))]),
        s.value.length ? (h(), v("section", Lr, [l[3] || (l[3] = d("h3", null, "记录在这里的人物", -1)), d("p", Ur, [(h(!0), v(q, null, Q(s.value, (u) => (h(), v("span", { key: u.actorKey }, [K(F, { name: "person" }), te(P(u.displayName), 1)]))), 128))])])) : T("", !0),
        o.value.length ? (h(), v("section", Hr, [l[4] || (l[4] = d("h3", null, "相连的地方", -1)), (h(!0), v(q, null, Q(o.value, (u) => (h(), v("button", {
          key: u.link.id,
          type: "button",
          class: "map-connection",
          onClick: (i) => c.$emit("select", u.location.key)
        }, [
          K(F, { name: "route" }),
          d("span", null, [d("strong", null, P(u.location.name), 1), d("small", null, P(u.link.label || y(ka)[u.link.kind]) + P(u.link.bidirectional ? "" : u.outgoing ? " · 单向前往" : " · 仅可从对面到达"), 1)]),
          K(F, { name: "next" })
        ], 8, Nr))), 128))])) : T("", !0),
        l[5] || (l[5] = d("p", { class: "map-detail-footnote" }, "查看地图不会改变你在故事中的位置", -1))
      ])
    ]));
  }
}), Vr = qr;
function Kr(e, t) {
  const a = t === null ? void 0 : e.locations.find((o) => o.key === t && Me(o)), r = xs(e), s = (t === null ? e.locations.filter(Me) : a ? e.locations.filter((o) => $s(o) && Qe(e, o.key)?.key === a.key) : []).map((o) => r.has(o.key) ? {
    ...o,
    status: "visited"
  } : o);
  return {
    kind: t === null ? "world" : "region",
    region: a,
    locations: s,
    unvisited: s.filter((o) => o.status !== "visited").length,
    frame: a ? Ua(a.key) : t === null ? tt : ""
  };
}
function zr(e, t) {
  const a = e.frames.find((w) => w.id === t.frame), r = Ha(e.frames), s = a?.boundary ? e.features.find((w) => w.id === a.boundary)?.geometry : void 0, o = [], c = [], l = [];
  for (const w of t.locations) {
    const p = w.position, $ = p && r(p.frame, t.frame);
    if (!p || !$) {
      c.push({
        location: w,
        reason: p ? "mapping_unknown" : "position_unknown"
      });
      continue;
    }
    const [A, _] = et(p.at, $);
    if (s && !we([A, _], s)) {
      c.push({
        location: w,
        reason: "outside_map"
      });
      continue;
    }
    o.push({
      location: w,
      x: A,
      y: _
    });
  }
  for (const w of e.features) {
    if (w.role === "boundary" || t.kind === "region" && w.frame !== t.frame && !s) continue;
    const p = r(w.frame, t.frame);
    if (!p) continue;
    const $ = At(w.geometry, p), A = Va($, s);
    if (!A) continue;
    const _ = w.destination ? e.locations.find((j) => j.key === w.destination)?.name || "" : w.name || "";
    l.push({
      source: w,
      geometry: $,
      mapping: p,
      bounds: A,
      label: _
    });
  }
  o.sort((w, p) => w.location.key.localeCompare(p.location.key)), l.sort((w, p) => w.source.id.localeCompare(p.source.id));
  const u = [], i = new Set(l.map((w) => w.source.id));
  for (let w = l.map((p) => p.source.support); w.length; ) {
    const p = w.shift(), $ = p && !i.has(p) ? e.features.find((j) => j.id === p) : void 0;
    if (!$) continue;
    i.add($.id);
    const A = r($.frame, t.frame);
    if (!A) continue;
    const _ = At($.geometry, A);
    u.push({
      source: $,
      geometry: _,
      mapping: A,
      bounds: Ce(_),
      label: ""
    }), w.push($.support);
  }
  u.sort((w, p) => w.source.id.localeCompare(p.source.id));
  const n = new Map(o.map((w) => [w.location.key, w])), m = e.links.flatMap((w) => {
    const p = l.find((z) => z.source.id === w.feature), $ = n.get(w.from), A = n.get(w.to);
    if (!p || !$ || !A) return [];
    const _ = he(p.geometry), j = _[0], H = _[_.length - 1], I = (z, f) => Math.hypot(z[0] - f.x, z[1] - f.y) < 1e-6, V = w.bidirectional ? void 0 : I(j, $) && I(H, A) ? "end" : I(j, A) && I(H, $) ? "start" : void 0;
    return [{
      link: w,
      feature: p,
      from: $,
      to: A,
      ...V ? { arrow: V } : {}
    }];
  }), M = [...l.map((w) => w.bounds), ...o.map((w) => [
    w.x,
    w.y,
    0,
    0
  ])];
  let k = [
    0,
    0,
    800,
    600
  ];
  if (M.length) {
    const w = Math.min(...M.map((j) => j[0])), p = Math.min(...M.map((j) => j[1])), $ = Math.max(...M.map((j) => j[0] + j[2])) - w, A = Math.max(...M.map((j) => j[1] + j[3])) - p, _ = Math.max(12, Math.max($, A) * 0.08);
    k = [
      w - _,
      p - _,
      Math.max($ + _ * 2, 120),
      Math.max(A + _ * 2, 120)
    ];
  }
  return {
    scope: t,
    nodes: o,
    unlocated: c,
    features: l,
    carriers: u,
    routes: m,
    clip: s,
    viewBox: k,
    drawable: !!M.length
  };
}
var Ul = new Set(ua), Hl = new Set(Ma), Nl = new Set(ia), ql = new Set(ca), Vl = new Set(Lt), Kl = new Set($a);
function Dr() {
  return {
    schemaVersion: 2,
    revision: 0,
    atlas: {
      locations: [],
      links: [],
      actors: [],
      frames: [{ id: tt }],
      features: []
    },
    scenes: {}
  };
}
function Ae(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}
function jt(e) {
  return e.maintenanceStatus === "maintaining" || e.maintenanceStatus === "rebuilding";
}
function Fr(e) {
  const t = Z(structuredClone(Gt(e.initialState))), a = Z(null), r = Z(""), s = Z(!1);
  let o = !1, c = 0, l = 0, u = () => {
  };
  const i = L(() => t.value.status === "unconfirmed" || t.value.writeState === "unconfirmed"), n = L(() => a.value !== null || ["loading", "saving"].includes(t.value.status) || ["maintaining", "rebuilding"].includes(t.value.maintenanceStatus || "")), m = L(() => n.value ? "正在更新地图，请稍候" : i.value ? "请先检查上一次是否保存成功" : t.value.status === "conflict" ? "存档有变化，请先选择要保留的版本" : t.value.status !== "ready" ? t.value.message || "地图暂时不可更新" : t.value.chatIdentity ? "" : "请先打开一个聊天"), M = L(() => t.value.maintenanceStatus === "rebuilding" || a.value === "rebuild" ? "正在绘制世界…" : t.value.maintenanceStatus === "maintaining" || a.value === "maintain" ? "正在更新地图…" : a.value === "confirm" ? "正在检查保存…" : n.value ? "请稍候…" : ""), k = L(() => t.value.message || r.value), w = L(() => t.value.message ? [
    "blocked",
    "error",
    "conflict",
    "unconfirmed"
  ].includes(t.value.status) : s.value);
  function p(_) {
    const j = jt(t.value);
    t.value = structuredClone(_), jt(_) ? (r.value = "", s.value = !1) : j && (r.value = _.maintenanceMessage || "", s.value = _.maintenanceStatus === "error");
  }
  function $(_, j) {
    const H = _ instanceof Error ? _.message : String(_);
    return H.includes("聊天已切换") ? "聊天已切换，请重新打开地图。" : H === "host_request_timeout" ? "暂时没收到结果，地图可能还在更新。请稍后查看，不要再次更新。" : j === "confirm" ? "仍无法确认保存结果，请稍后再试。" : j === "adopt" ? "已保存版本暂时加载不了，当前修改还在，请稍后重试。" : j === "settings" ? "设置未能保存，请重试。" : "地图操作未完成，请稍后重试。";
  }
  async function A(_, j, H = {}) {
    if (a.value) return;
    const I = ++c, V = l, z = t.value.chatIdentity;
    a.value = j, r.value = "", s.value = !1;
    try {
      const f = await e.bridge.request(_, {
        chatIdentity: z,
        ...H
      }, 35e3);
      if (!o || I !== c || t.value.chatIdentity !== z) return;
      const x = Ae(f) ? f.result : void 0, E = Ae(x) && Ae(x.state) ? x.state : x;
      V === l && Ae(E) && E.chatIdentity === z && p(E), (j === "maintain" || j === "rebuild") && Ae(x) && typeof x.message == "string" && x.message && (r.value = x.message), j === "refresh" && t.value.status === "ready" && (r.value = "已加载保存的地图。"), j === "settings" && (r.value = t.value.autoMaintenance ? "自动更新已开启。" : "自动更新已关闭。"), j === "confirm" && t.value.status === "ready" && (r.value = "已确认保存成功。"), j === "adopt" && Ae(x) && x.adoption === "adopted" && (r.value = "已使用当前聊天里保存的 OS 存档。");
    } catch (f) {
      o && I === c && t.value.chatIdentity === z && (r.value = $(f, j), s.value = !0);
    } finally {
      o && I === c && (a.value = null);
    }
  }
  return ze(() => {
    o = !0, u = e.bridge.subscribe((_) => {
      if (_.type === "map/state") {
        const j = _.payload.state;
        if (j.chatIdentity !== t.value.chatIdentity) return;
        l += 1, p(j);
      } else _.type === "map/error" && (l += 1, s.value = !0, r.value = _.payload.message || "地图暂时无法读取，请重新打开。");
    });
  }), Ve(() => {
    o = !1, c += 1, u();
  }), {
    state: t,
    activeRequest: a,
    busy: n,
    disabledReason: m,
    requiresConfirmation: i,
    status: M,
    notice: k,
    isError: w,
    dismissNotice: () => {
      r.value = "", s.value = !1;
    },
    refresh: () => {
      if (!n.value && !i.value) return A("map/refresh", "refresh");
    },
    confirmSave: () => {
      if (!n.value) return A("map/confirm-save", "confirm");
    },
    adopt: () => {
      if (!n.value) return A("map/adopt-server-state", "adopt");
    },
    setAuto: (_) => A("map/set-auto-maintenance", "settings", { enabled: _ }),
    update: () => {
      if (!m.value && t.value.map) return A("map/maintain-once", "maintain");
    },
    rebuild: () => {
      if (!m.value) return A("map/rebuild", "rebuild");
    }
  };
}
function Wr(e, t, a) {
  const r = Z([
    170,
    20,
    100,
    20
  ]);
  let s;
  const o = () => {
    const l = e.value?.getBoundingClientRect();
    if (!l?.height) return;
    const u = a.value?.getBoundingClientRect(), i = u && u.left >= l.left + l.width / 2;
    r.value = [
      Math.max(0, (t.value?.getBoundingClientRect().bottom || l.top) - l.top) + 16,
      i ? l.right - u.left + 16 : 20,
      u && !i ? l.bottom - u.top + 16 : 20,
      20
    ];
  }, c = () => {
    s?.disconnect();
    for (const l of [
      e.value,
      t.value,
      a.value
    ]) l && s?.observe(l);
    o();
  };
  return ze(() => {
    s = new ResizeObserver(o), c();
  }), de([t, a], c, { flush: "post" }), Ve(() => s?.disconnect()), {
    insets: r,
    measure: o
  };
}
var Zr = { class: "map-search-bar" }, Yr = ["disabled"], Jr = {
  key: 1,
  class: "map-search-entry"
}, Xr = {
  key: 0,
  class: "map-view-row"
}, Gr = ["aria-label"], Qr = ["aria-pressed"], el = ["aria-pressed"], tl = ["aria-pressed"], al = {
  key: 0,
  class: "map-scene-tools"
}, nl = ["aria-expanded"], sl = ["aria-label"], il = ["aria-current"], rl = { "aria-current": "page" }, ll = {
  key: 2,
  class: "map-progress",
  role: "status"
}, ol = {
  key: 3,
  class: "map-notice",
  role: "status"
}, ul = ["disabled"], cl = ["disabled"], dl = ["disabled"], hl = {
  key: 1,
  class: "map-empty"
}, fl = ["disabled"], vl = {
  key: 0,
  class: "map-setting-note"
}, pl = {
  key: 2,
  class: "map-empty"
}, ml = ["disabled"], yl = {
  key: 1,
  class: "map-empty map-first-map"
}, bl = { class: "map-empty-art" }, kl = ["disabled"], gl = {
  key: 1,
  class: "map-setting-note"
}, wl = {
  key: 0,
  class: "map-key"
}, Ml = ["aria-label"], $l = { class: "map-region-icon" }, xl = {
  id: "map-browse-summary",
  class: "map-region-summary"
}, _l = {
  class: "map-round-button",
  "aria-hidden": "true"
}, Sl = { class: "map-atlas-toolbar" }, Al = { class: "map-floating-tools" }, El = ["disabled"], Cl = ["aria-expanded"], Bl = {
  key: 2,
  class: "map-scene-caption"
}, jl = /* @__PURE__ */ ne({
  __name: "MapApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const t = e, a = Z(null), r = Z(null), s = Z(null), o = Z(null), { insets: c, measure: l } = Wr(a, r, s), { state: u, activeRequest: i, busy: n, disabledReason: m, requiresConfirmation: M, status: k, notice: w, isError: p, dismissNotice: $, refresh: A, confirmSave: _, adopt: j, setAuto: H, update: I, rebuild: V } = Fr(t), z = An(t.bridge, u.value.chatIdentity);
    Qt(Dt, z);
    const f = Z(""), x = () => er(u.value.map) === "scene" ? {
      kind: "scene",
      key: ""
    } : { kind: "world" }, E = Z(x()), S = Z("3d"), O = Z(!1), b = Z("");
    let B = !1;
    const g = L(() => E.value.kind === "scene"), R = L(() => E.value.kind === "scene" ? E.value.key : ""), Y = Z(""), ee = Z(0), X = Z(!1), J = Z(null), N = Z(!1), W = L(() => u.value.map?.atlas);
    de(W, (D) => z.cache.retainSurfaceKeys(new Set(D?.features.map(zt))), { immediate: !0 });
    const ae = L(() => W.value?.actors.find((D) => D.actorKey === "player")?.locationKey || ""), le = L(() => W.value?.locations.find((D) => D.key === ae.value)), ue = L(() => W.value?.locations.find((D) => D.key === (R.value || ae.value))), $e = L(() => g.value && ue.value?.sceneKey ? u.value.map?.scenes[ue.value.sceneKey] : void 0), re = L(() => {
      if (!W.value || E.value.kind === "world") return;
      const D = E.value.key || ae.value;
      return Qe(W.value, D);
    }), wt = Dr().atlas, xe = L(() => !!(W.value && (W.value.locations.length || W.value.features.length))), se = L(() => Kr(W.value || wt, E.value.kind === "world" ? null : re.value?.key || "")), je = L(() => zr(W.value || wt, se.value)), Zt = L(() => je.value.unlocated.find((D) => D.location.key === f.value)?.reason), be = L(() => se.value.locations.find((D) => D.key === f.value)), Ie = L(() => se.value.kind === "world" ? me.world : re.value?.name || G.unknownRegion), st = L(() => Ot[se.value.kind]), Mt = L(() => se.value.unvisited ? "unvisited" : "all");
    de(() => u.value, (D, C) => {
      const U = D.chatIdentity !== C.chatIdentity;
      (U || !D.map?.atlas.locations.some((rt) => rt.key === f.value)) && (f.value = ""), U && (B = !1);
      const ke = E.value.kind === "world" ? "" : E.value.key, Xt = ke && !D.map?.atlas.locations.some((rt) => rt.key === ke);
      (U || !C.map?.atlas.locations.length && D.map?.atlas.locations.length && !B || Xt) && (E.value = x()), U && (X.value = !1, J.value = null, N.value = !1);
    }), de(se, (D, C) => {
      D.locations.some((U) => U.key === f.value) || (f.value = ""), (D.kind !== C.kind || D.region?.key !== C.region?.key || !W.value) && (f.value = "", J.value = null, N.value = !1);
    });
    function it(D) {
      B = !0, E.value = D, f.value = "", J.value = null, N.value = !1;
    }
    function _e(D = "") {
      it({
        kind: "region",
        key: D
      });
    }
    async function Pe(D, C = !1) {
      const U = W.value?.locations.find((ke) => ke.key === D);
      if (U) {
        if (B = !0, C && W.value) {
          if (Me(U)) Se();
          else {
            const ke = Qe(W.value, D);
            if (!ke) {
              Re(D);
              return;
            }
            _e(ke.key);
          }
          await lt();
        }
        f.value = D, J.value = null, N.value = !1, await lt(), l(), Y.value = W.value ? Ft(W.value, D, se.value.locations) : D, ee.value += 1;
      }
    }
    async function Yt() {
      if (!(!le.value || !W.value)) {
        if (Me(le.value)) {
          await Pe(le.value.key, !0);
          return;
        }
        if (!Qe(W.value, le.value.key)) {
          Re();
          return;
        }
        _e(), await lt(), await Pe(le.value.key);
      }
    }
    function Re(D = "") {
      it({
        kind: "scene",
        key: D === ae.value ? "" : D
      });
    }
    function Se() {
      it({ kind: "world" });
    }
    function Jt(D) {
      O.value || (O.value = !0, S.value = "2d", b.value = D);
    }
    return sa(() => N.value ? (N.value = !1, !0) : g.value ? (_e(R.value && re.value?.key || ""), !0) : f.value ? (f.value = "", !0) : E.value.kind === "region" ? (Se(), !0) : !1), (D, C) => (h(), v("main", {
      ref_key: "mapElement",
      ref: a,
      class: ce(["map-app", {
        "has-view-switch": xe.value,
        "is-scene-view": g.value,
        "is-atlas-view": xe.value && !g.value
      }])
    }, [
      d("div", {
        ref_key: "topElement",
        ref: r,
        class: "map-top"
      }, [
        d("header", Zr, [
          K(F, { name: g.value ? "layers" : "search" }, null, 8, ["name"]),
          g.value ? (h(), v("div", Jr, [te(P(ue.value?.name || y(me).scene), 1), d("small", null, P(R.value ? y(G).sceneBrowsing : y(G).sceneCurrent), 1)])) : (h(), v("button", {
            key: 0,
            type: "button",
            class: "map-search-entry",
            disabled: !W.value?.locations.length,
            onClick: C[0] || (C[0] = (U) => J.value = "all")
          }, [te(P(st.value.search), 1), d("small", null, P(Ie.value), 1)], 8, Yr)),
          d("button", {
            type: "button",
            class: "map-round-button",
            "aria-label": "地图设置",
            onClick: C[1] || (C[1] = (U) => X.value = !0)
          }, [K(F, { name: "more" })])
        ]),
        xe.value ? (h(), v("div", Xr, [d("nav", {
          class: "map-view-switch",
          "aria-label": y(G).viewLabel
        }, [
          d("button", {
            type: "button",
            "aria-pressed": E.value.kind === "world",
            onClick: Se
          }, [K(F, { name: "globe" }), te(P(y(me).world), 1)], 8, Qr),
          d("button", {
            type: "button",
            "aria-pressed": E.value.kind === "region",
            onClick: C[2] || (C[2] = (U) => _e())
          }, [K(F, { name: "compass" }), te(P(y(me).region), 1)], 8, el),
          d("button", {
            type: "button",
            "aria-pressed": g.value,
            onClick: C[3] || (C[3] = (U) => Re())
          }, [K(F, { name: "layers" }), te(P(y(me).scene), 1)], 8, tl)
        ], 8, Gr), g.value ? (h(), v("div", al, [R.value ? (h(), v("button", {
          key: 0,
          type: "button",
          class: "map-round-button",
          "aria-label": "回到当前场景",
          onClick: C[4] || (C[4] = (U) => Re())
        }, [K(F, { name: "locate" })])) : T("", !0), d("button", {
          type: "button",
          class: "map-round-button",
          "aria-expanded": N.value,
          "aria-label": "地图图例",
          onClick: C[5] || (C[5] = (U) => N.value = !N.value)
        }, [K(F, { name: "layers" })], 8, nl)])) : T("", !0)])) : T("", !0),
        xe.value && !g.value ? (h(), v("nav", {
          key: 1,
          class: "map-region-trail",
          "aria-label": y(G).trailLabel
        }, [d("button", {
          type: "button",
          "aria-current": E.value.kind === "world" ? "page" : void 0,
          onClick: Se
        }, [K(F, { name: "globe" }), te(P(y(me).world), 1)], 8, il), E.value.kind === "region" ? (h(), v(q, { key: 0 }, [K(F, { name: "next" }), d("span", rl, P(Ie.value), 1)], 64)) : T("", !0)], 8, sl)) : T("", !0),
        y(k) ? (h(), v("div", ll, [C[28] || (C[28] = d("span", null, null, -1)), te(P(y(k)), 1)])) : T("", !0),
        b.value ? (h(), v("aside", ol, [d("p", null, P(b.value), 1), d("button", {
          type: "button",
          class: "map-notice-close",
          "aria-label": "关闭三维提示",
          onClick: C[6] || (C[6] = (U) => b.value = "")
        }, [K(F, { name: "close" })])])) : T("", !0),
        y(w) || y(M) || y(u).status === "conflict" ? (h(), v("aside", {
          key: 4,
          class: ce(["map-notice", { "is-error": y(p) }]),
          role: "status"
        }, [d("p", null, P(y(w) || (y(M) ? "还不确定是否保存成功，请先检查保存。" : "服务器上的存档与当前内容不同。")), 1), y(M) ? (h(), v("button", {
          key: 0,
          type: "button",
          disabled: y(n),
          onClick: C[7] || (C[7] = (...U) => y(_) && y(_)(...U))
        }, "检查保存", 8, ul)) : y(u).status === "conflict" ? (h(), v(q, { key: 1 }, [C[29] || (C[29] = d("small", null, "恢复会放弃尚未保存的更改，并使用当前聊天已保存的 OS 数据（不只是地图）。", -1)), d("button", {
          type: "button",
          disabled: y(n),
          onClick: C[8] || (C[8] = (...U) => y(j) && y(j)(...U))
        }, "放弃未保存更改并恢复", 8, cl)], 64)) : y(u).status === "error" || y(u).status === "blocked" ? (h(), v("button", {
          key: 2,
          type: "button",
          disabled: y(n),
          onClick: C[9] || (C[9] = (...U) => y(A) && y(A)(...U))
        }, "重新加载", 8, dl)) : (h(), v("button", {
          key: 3,
          type: "button",
          class: "map-notice-close",
          "aria-label": "关闭地图提示",
          onClick: C[10] || (C[10] = (...U) => y($) && y($)(...U))
        }, [K(F, { name: "close" })]))], 2)) : T("", !0)
      ], 512),
      d("div", { class: ce(["map-canvas", { "has-detail": be.value && !g.value }]) }, [y(u).map && xe.value ? (h(), v(q, { key: 0 }, [
        je.value.drawable ? yt((h(), ie(Os, {
          key: 0,
          ref_key: "atlasElement",
          ref: o,
          atlas: y(u).map.atlas,
          projection: je.value,
          label: Ie.value,
          insets: y(c),
          "current-location-key": ae.value,
          "selected-location-key": f.value,
          "focus-key": Y.value,
          "focus-sequence": ee.value,
          onSelect: C[11] || (C[11] = (U) => Pe(U))
        }, null, 8, [
          "atlas",
          "projection",
          "label",
          "insets",
          "current-location-key",
          "selected-location-key",
          "focus-key",
          "focus-sequence"
        ])), [[Rt, !g.value]]) : T("", !0),
        g.value ? (h(), v(q, { key: 1 }, [$e.value?.status === "active" ? (h(), ie(Qi, {
          key: 0,
          mode: S.value,
          "onUpdate:mode": C[12] || (C[12] = (U) => S.value = U),
          scene: $e.value,
          "three-unavailable": O.value,
          onFallback: Jt
        }, null, 8, [
          "mode",
          "scene",
          "three-unavailable"
        ])) : (h(), v("div", hl, [
          K(F, { name: "layers" }),
          d("h2", null, P(ue.value ? y(G).sceneEmpty : y(G).unknownLocation), 1),
          R.value && R.value !== ae.value ? (h(), v("button", {
            key: 0,
            type: "button",
            class: "map-secondary-button",
            onClick: C[13] || (C[13] = (U) => re.value ? _e(re.value.key) : Se())
          }, P(re.value ? y(G).regionMap : y(me).world), 1)) : (h(), v(q, { key: 1 }, [
            d("p", null, P(ue.value ? y(G).sceneUpdateHint : y(G).locationUpdateHint), 1),
            d("button", {
              type: "button",
              class: "map-secondary-button",
              disabled: !!y(m),
              onClick: C[14] || (C[14] = (...U) => y(I) && y(I)(...U))
            }, P(y(n) ? y(G).updating : y(G).update), 9, fl),
            y(m) && !y(n) ? (h(), v("p", vl, P(y(m)), 1)) : T("", !0)
          ], 64))
        ]))], 64)) : T("", !0),
        !g.value && !je.value.drawable ? (h(), v("div", pl, [
          K(F, { name: "pin" }),
          d("h2", null, P(E.value.kind === "region" && !re.value ? y(G).unknownRegion : se.value.locations.length ? y(He).empty : st.value.empty), 1),
          d("p", null, P(E.value.kind === "region" && !re.value ? y(G).unknownRegionHint : se.value.locations.length ? y(He).emptyHint : st.value.emptyHint), 1),
          E.value.kind === "region" ? (h(), v("button", {
            key: 0,
            type: "button",
            class: "map-secondary-button",
            onClick: Se
          }, P(y(me).world), 1)) : (h(), v("button", {
            key: 1,
            type: "button",
            class: "map-secondary-button",
            disabled: !!y(m),
            onClick: C[15] || (C[15] = (...U) => y(I) && y(I)(...U))
          }, P(y(n) ? y(G).updating : y(G).update), 9, ml))
        ])) : T("", !0)
      ], 64)) : (h(), v("div", yl, [
        d("span", bl, [K(F, { name: "globe" })]),
        C[30] || (C[30] = d("small", null, "故事之外，还有一整个世界", -1)),
        d("h1", null, P(y(u).status === "loading" ? "正在打开地图…" : "下一站，去哪里？"), 1),
        C[31] || (C[31] = d("p", null, [
          te("把世界设定画成地图，"),
          d("br"),
          te("也为留白的地方添上值得探索的去处。")
        ], -1)),
        y(u).status !== "loading" ? (h(), v("button", {
          key: 0,
          type: "button",
          class: "map-primary-button",
          disabled: !!y(m),
          onClick: C[16] || (C[16] = (...U) => y(V) && y(V)(...U))
        }, P(y(n) ? y(k) || "正在准备…" : "绘制世界地图"), 9, kl)) : T("", !0),
        y(m) && !y(n) ? (h(), v("p", gl, P(y(m)), 1)) : T("", !0)
      ]))], 2),
      N.value ? (h(), v("aside", wl, [
        C[32] || (C[32] = d("strong", null, "读懂这张地图", -1)),
        C[33] || (C[33] = d("p", null, [
          d("i", { class: "map-key-current" }),
          te("你在这里 "),
          d("i", { class: "map-key-place" }),
          te("可探索地点")
        ], -1)),
        d("p", null, P(y(He).legend), 1),
        d("small", null, P(y(G).legend), 1)
      ])) : T("", !0),
      xe.value && !g.value ? (h(), v("div", {
        key: 1,
        ref_key: "bottomElement",
        ref: s,
        class: ce(["map-atlas-bottom", { "has-detail": be.value }])
      }, [be.value && y(u).map ? (h(), ie(Vr, {
        key: be.value.key,
        location: be.value,
        map: y(u).map,
        "current-key": ae.value,
        unlocated: Zt.value,
        onClose: C[17] || (C[17] = (U) => f.value = ""),
        onScene: C[18] || (C[18] = (U) => Re(be.value.key)),
        onExplore: C[19] || (C[19] = (U) => _e(be.value.key)),
        onSelect: C[20] || (C[20] = (U) => Pe(U, !0))
      }, null, 8, [
        "location",
        "map",
        "current-key",
        "unlocated"
      ])) : (h(), v("button", {
        key: 1,
        type: "button",
        class: "map-region-card",
        "aria-label": y(oa)(se.value.kind, Mt.value),
        "aria-describedby": "map-browse-summary",
        onClick: C[21] || (C[21] = (U) => J.value = Mt.value)
      }, [
        d("span", $l, [K(F, { name: se.value.kind === "world" ? "globe" : "compass" }, null, 8, ["name"])]),
        d("span", xl, [d("strong", null, P(Ie.value), 1), d("small", null, P(y(la)(se.value.kind, se.value.locations.length, se.value.unvisited)), 1)]),
        d("span", _l, [K(F, { name: "next" })])
      ], 8, Ml)), d("div", Sl, [je.value.drawable ? (h(), ie(qt, {
        key: 0,
        onZoom: C[22] || (C[22] = (U) => o.value?.zoom(U)),
        onReset: C[23] || (C[23] = (U) => o.value?.reset())
      })) : T("", !0), d("div", Al, [d("button", {
        type: "button",
        class: "map-round-button",
        disabled: !le.value,
        "aria-label": "回到我的位置",
        onClick: Yt
      }, [K(F, { name: "locate" })], 8, El), d("button", {
        type: "button",
        class: "map-round-button",
        "aria-expanded": N.value,
        "aria-label": "地图图例",
        onClick: C[24] || (C[24] = (U) => N.value = !N.value)
      }, [K(F, { name: "layers" })], 8, Cl)])])], 2)) : T("", !0),
      g.value && W.value?.locations.length ? (h(), v("footer", Bl, [K(F, { name: "layers" }), d("span", null, [d("strong", null, P(ue.value?.name || "当前位置待确认"), 1), d("small", null, P(R.value ? "正在查看场景图 · 不会移动人物" : "当前位置的场景图"), 1)])])) : T("", !0),
      J.value && W.value ? (h(), ie(Er, {
        key: 3,
        scope: se.value,
        title: Ie.value,
        "initial-filter": J.value,
        onClose: C[25] || (C[25] = (U) => J.value = null),
        onSelect: C[26] || (C[26] = (U) => Pe(U))
      }, null, 8, [
        "scope",
        "title",
        "initial-filter"
      ])) : T("", !0),
      X.value ? (h(), ie(pr, {
        key: 4,
        "auto-maintenance": y(u).autoMaintenance,
        busy: y(n),
        "refresh-disabled": y(M),
        "auto-toggle-busy": y(i) !== null,
        "disabled-reason": y(m),
        "has-map": !!y(u).map,
        status: y(k),
        "maintenance-message": y(u).maintenanceMessage || "",
        "maintenance-error": y(u).maintenanceStatus === "error",
        notice: y(w),
        "notice-error": y(p),
        onClose: C[27] || (C[27] = (U) => X.value = !1),
        onSetAuto: y(H),
        onUpdate: y(I),
        onRebuild: y(V),
        onRefresh: y(A)
      }, null, 8, [
        "auto-maintenance",
        "busy",
        "refresh-disabled",
        "auto-toggle-busy",
        "disabled-reason",
        "has-map",
        "status",
        "maintenance-message",
        "maintenance-error",
        "notice",
        "notice-error",
        "onSetAuto",
        "onUpdate",
        "onRebuild",
        "onRefresh"
      ])) : T("", !0)
    ], 2));
  }
}), zl = jl;
export {
  zl as default
};
