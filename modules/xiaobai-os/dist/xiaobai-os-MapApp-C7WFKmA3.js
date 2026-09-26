/* eslint-disable */
import { t as pt } from "./xiaobai-os-chunk-9ZSF5uba.js";
import { E as Fe, F as It, H as nt, J as mt, K as X, L as Ne, M as v, P as ne, Q as S, T as Qe, V as Ye, X as ye, Y as p, Z as Te, _ as Pt, b as ie, c as rt, f as R, g as f, h as A, k as Ue, l as qe, m as re, o as Ot, p as r, s as yt, u as K, v as se, y as q, z as ge } from "./xiaobai-os-runtime-dom.esm-bundler-BcM9c-Z9.js";
import { n as Rt } from "./xiaobai-os-app-navigation-sg-40eOk.js";
import { t as bt } from "./xiaobai-os-AppDialog-CI-E933W.js";
import { A as Le, C as Ht, D as kt, E as gt, F as Tt, I as Lt, M as ke, N as Ve, O as te, P as Vt, S as Nt, T as Ut, a as zt, b as qt, c as Kt, d as Dt, f as wt, g as Ft, h as Yt, i as Mt, j as ze, k as Zt, l as Wt, n as Xt, o as Jt, p as ut, r as $t, s as Qt, u as ct, v as He, w as Gt, x as ea, y as ta } from "./xiaobai-os-map-presentation-DFD3BFyV.js";
function Ge(e, s, t, i, n) {
  const [u, c, l, o] = t, h = Math.max(80, s[0] - o - c), a = Math.max(80, s[1] - u - l), d = Math.max(e[2] / h, e[3] / a), m = i ? d : Math.min(e[2] / s[0], e[3] / s[1]) * 0.78, w = !i && n ? n : [e[0] + e[2] / 2, e[1] + e[3] / 2], C = w[0] - (o + h / 2) * m, P = w[1] - (u + a / 2) * m, U = s[0] * m, V = s[1] * m;
  return [
    i ? C : Math.max(e[0], Math.min(e[0] + e[2] - U, C)),
    i ? P : Math.max(e[1], Math.min(e[1] + e[3] - V, P)),
    U,
    V
  ];
}
function aa(e, s, t, i) {
  const [n, u, c, l] = i, o = Math.min(s[2] / t[0], 620 / Math.max(80, t[0] - l - u));
  return [
    e[0] - (l + (t[0] - l - u) / 2) * o,
    e[1] - (n + (t[1] - n - c) / 2) * o,
    t[0] * o,
    t[1] * o
  ];
}
var na = ["aria-label"], sa = ["aria-label"], ia = ["aria-label"], oa = /* @__PURE__ */ ie({
  __name: "MapZoomControls",
  emits: ["zoom", "reset"],
  setup(e) {
    return (s, t) => (v(), f("div", {
      class: "map-viewport-controls",
      "aria-label": p(ze).label
    }, [
      r("button", {
        type: "button",
        "aria-label": p(ze).zoomIn,
        onClick: t[0] || (t[0] = (i) => s.$emit("zoom", 0.8))
      }, "+", 8, sa),
      r("button", {
        type: "button",
        "aria-label": p(ze).zoomOut,
        onClick: t[1] || (t[1] = (i) => s.$emit("zoom", 1.25))
      }, "−", 8, ia),
      r("button", {
        type: "button",
        class: "map-fit",
        onClick: t[2] || (t[2] = (i) => s.$emit("reset"))
      }, S(p(ze).fit), 1)
    ], 8, na));
  }
}), xt = oa, la = { class: "map-viewport" }, ra = ["viewBox", "aria-label"], ua = /* @__PURE__ */ ie({
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
  setup(e, { expose: s }) {
    const t = e, i = X(null), n = X([...t.viewBox]), u = X([0, 0]), c = R(() => u.value[0] && u.value[1] ? Math.max(n.value[2] / u.value[0], n.value[3] / u.value[1]) : 1);
    let l, o = !1;
    Ue(() => {
      l = new ResizeObserver((y) => {
        const $ = y[0].contentRect;
        if (!$.width || !$.height) return;
        const k = u.value;
        if (u.value = [$.width, $.height], t.atlasInsets) {
          if (!o) F();
          else if (k[0] && k[1]) {
            const I = n.value[2] / k[0];
            n.value = [
              n.value[0] + (k[0] - $.width) * I / 2,
              n.value[1] + (k[1] - $.height) * I / 2,
              $.width * I,
              $.height * I
            ];
          }
        }
      }), i.value && l.observe(i.value);
    });
    const h = /* @__PURE__ */ new Map();
    let a = null, d = [0, 0], m = 0, w = null, C = !1, P = !1, U = null;
    const V = R(() => n.value.join(" "));
    function Z() {
      n.value = t.atlasInsets && u.value[0] ? Ge([...t.viewBox], u.value, t.atlasInsets, !0) : [...t.viewBox];
    }
    function F() {
      o = !!u.value[0], n.value = t.atlasInsets && o ? Ge([...t.viewBox], u.value, t.atlasInsets, t.initialOverview, t.initialPoint) : [...t.viewBox];
    }
    function J() {
      return c.value;
    }
    function T(y, $) {
      const k = i.value?.getBoundingClientRect();
      if (!k) return [n.value[0], n.value[1]];
      const I = J();
      return [n.value[0] + n.value[2] / 2 + (y - k.left - k.width / 2) * I, n.value[1] + n.value[3] / 2 + ($ - k.top - k.height / 2) * I];
    }
    function L(y, $) {
      const k = Math.max(1, t.atlasInsets && u.value[0] ? Ge([...t.viewBox], u.value, t.atlasInsets, !0)[2] : t.viewBox[2]), I = Math.min(k * 0.24, 240, n.value[2]), j = Math.max(k * 3, n.value[2]), z = Math.min(j, Math.max(I, n.value[2] * y)), N = z / n.value[2], D = $ || [n.value[0] + n.value[2] / 2, n.value[1] + n.value[3] / 2];
      n.value = [
        D[0] - (D[0] - n.value[0]) * N,
        D[1] - (D[1] - n.value[1]) * N,
        z,
        n.value[3] * N
      ];
    }
    function O() {
      if (!t.focusPoint) return;
      if (t.atlasInsets && u.value[0]) {
        n.value = aa(t.focusPoint, n.value, u.value, t.atlasInsets);
        return;
      }
      const y = Math.min(n.value[2], 620), $ = n.value[3] * y / n.value[2];
      n.value = [
        t.focusPoint[0] - y / 2,
        t.focusPoint[1] - $ / 2,
        y,
        $
      ];
    }
    function b() {
      const y = [...h.values()];
      y.length === 1 && (a = y[0], d = [n.value[0], n.value[1]]), y.length === 2 && (m = Math.hypot(y[1][0] - y[0][0], y[1][1] - y[0][1]), w = [(y[0][0] + y[1][0]) / 2, (y[0][1] + y[1][1]) / 2], C = !0);
    }
    function g(y) {
      y.button !== 0 || h.size >= 2 || (h.size || (C = !1), h.set(y.pointerId, [y.clientX, y.clientY]), y.target.setPointerCapture(y.pointerId), b());
    }
    function x(y) {
      if (!h.has(y.pointerId)) return;
      h.set(y.pointerId, [y.clientX, y.clientY]);
      const $ = [...h.values()];
      if ($.length === 2 && w) {
        const k = Math.hypot($[1][0] - $[0][0], $[1][1] - $[0][1]), I = [($[0][0] + $[1][0]) / 2, ($[0][1] + $[1][1]) / 2];
        k > 0 && m > 0 && L(m / k, T(...w)), n.value[0] -= (I[0] - w[0]) * J(), n.value[1] -= (I[1] - w[1]) * J(), m = k, w = I;
      } else if (a) {
        const k = y.clientX - a[0], I = y.clientY - a[1];
        Math.abs(k) + Math.abs(I) > 4 && (C = !0), n.value = [
          d[0] - k * J(),
          d[1] - I * J(),
          n.value[2],
          n.value[3]
        ];
      }
    }
    function M(y) {
      if (!h.delete(y.pointerId)) return;
      const $ = y.target;
      $.hasPointerCapture(y.pointerId) && $.releasePointerCapture(y.pointerId), b(), h.size || (a = null, w = null), C && (P = !0, U && clearTimeout(U), U = setTimeout(() => {
        P = !1;
      }, 0));
    }
    function B(y) {
      P && (y.preventDefault(), y.stopPropagation());
    }
    return ge(() => t.resetKey, F, { immediate: !0 }), ge(() => t.focusSequence, O, { flush: "post" }), Fe(() => {
      l?.disconnect(), U && clearTimeout(U);
    }), s({
      zoom: L,
      reset: Z
    }), (y, $) => (v(), f("div", la, [(v(), f("svg", {
      ref_key: "svg",
      ref: i,
      class: "map-viewport-svg",
      viewBox: V.value,
      preserveAspectRatio: "xMidYMid meet",
      role: "group",
      "aria-label": e.label,
      onWheel: $[0] || ($[0] = qe((k) => L(k.deltaY < 0 ? 0.84 : 1.19, T(k.clientX, k.clientY)), ["prevent"])),
      onPointerdown: g,
      onPointermove: x,
      onPointerup: M,
      onPointercancel: M,
      onClickCapture: B
    }, [It(y.$slots, "default", {
      unitScale: c.value,
      viewport: n.value
    })], 40, ra)), e.controls ? (v(), re(xt, {
      key: 0,
      onZoom: L,
      onReset: Z
    })) : A("", !0)]));
  }
}), _t = ua, ca = {
  class: "map-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.7",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, da = ["d"], ha = /* @__PURE__ */ ie({
  __name: "MapIcon",
  props: { name: { default: "pin" } },
  setup(e) {
    const s = {
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
    return (t, i) => (v(), f("svg", ca, [r("path", { d: s[e.name] || s.pin }, null, 8, da)]));
  }
}), W = ha, dt = /* @__PURE__ */ pt(((e, s) => {
  s.exports = {};
})), va = /* @__PURE__ */ pt(((e, s) => {
  (function() {
    "use strict";
    var t = "input is invalid type", i = typeof window == "object", n = i ? window : {};
    n.JS_SHA256_NO_WINDOW && (i = !1);
    var u = !i && typeof self == "object", c = !n.JS_SHA256_NO_NODE_JS && typeof process == "object" && process.versions && process.versions.node && process.type != "renderer";
    c ? n = globalThis : u && (n = self);
    var l = !n.JS_SHA256_NO_COMMON_JS && typeof s == "object" && s.exports, o = typeof define == "function" && define.amd, h = !n.JS_SHA256_NO_ARRAY_BUFFER && typeof ArrayBuffer < "u", a = "0123456789abcdef".split(""), d = [
      -2147483648,
      8388608,
      32768,
      128
    ], m = [
      24,
      16,
      8,
      0
    ], w = [
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
    ], C = [
      "hex",
      "array",
      "digest",
      "arrayBuffer"
    ], P = [];
    (n.JS_SHA256_NO_NODE_JS || !Array.isArray) && (Array.isArray = function(b) {
      return Object.prototype.toString.call(b) === "[object Array]";
    }), h && (n.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView) && (ArrayBuffer.isView = function(b) {
      return typeof b == "object" && b.buffer && b.buffer.constructor === ArrayBuffer;
    });
    var U = function(b, g) {
      return function(x) {
        return new T(g, !0).update(x)[b]();
      };
    }, V = function(b) {
      var g = U("hex", b);
      c && (g = Z(g, b)), g.create = function() {
        return new T(b);
      }, g.update = function(B) {
        return g.create().update(B);
      };
      for (var x = 0; x < C.length; ++x) {
        var M = C[x];
        g[M] = U(M, b);
      }
      return g;
    }, Z = function(b, g) {
      var x = dt(), M = dt().Buffer, B = g ? "sha224" : "sha256", y;
      M.from && !n.JS_SHA256_NO_BUFFER_FROM ? y = M.from : y = function(k) {
        return new M(k);
      };
      var $ = function(k) {
        if (typeof k == "string") return x.createHash(B).update(k, "utf8").digest("hex");
        if (k == null) throw new Error(t);
        return k.constructor === ArrayBuffer && (k = new Uint8Array(k)), Array.isArray(k) || ArrayBuffer.isView(k) || k.constructor === M ? x.createHash(B).update(y(k)).digest("hex") : b(k);
      };
      return $;
    }, F = function(b, g) {
      return function(x, M) {
        return new L(x, g, !0).update(M)[b]();
      };
    }, J = function(b) {
      var g = F("hex", b);
      g.create = function(B) {
        return new L(B, b);
      }, g.update = function(B, y) {
        return g.create(B).update(y);
      };
      for (var x = 0; x < C.length; ++x) {
        var M = C[x];
        g[M] = F(M, b);
      }
      return g;
    };
    function T(b, g) {
      g ? (P[0] = P[16] = P[1] = P[2] = P[3] = P[4] = P[5] = P[6] = P[7] = P[8] = P[9] = P[10] = P[11] = P[12] = P[13] = P[14] = P[15] = 0, this.blocks = P) : this.blocks = [
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
      ], b ? (this.h0 = 3238371032, this.h1 = 914150663, this.h2 = 812702999, this.h3 = 4144912697, this.h4 = 4290775857, this.h5 = 1750603025, this.h6 = 1694076839, this.h7 = 3204075428) : (this.h0 = 1779033703, this.h1 = 3144134277, this.h2 = 1013904242, this.h3 = 2773480762, this.h4 = 1359893119, this.h5 = 2600822924, this.h6 = 528734635, this.h7 = 1541459225), this.block = this.start = this.bytes = this.hBytes = 0, this.finalized = this.hashed = !1, this.first = !0, this.is224 = b;
    }
    T.prototype.update = function(b) {
      if (!this.finalized) {
        var g, x = typeof b;
        if (x !== "string") {
          if (x === "object") {
            if (b === null) throw new Error(t);
            if (h && b.constructor === ArrayBuffer) b = new Uint8Array(b);
            else if (!Array.isArray(b) && (!h || !ArrayBuffer.isView(b)))
              throw new Error(t);
          } else throw new Error(t);
          g = !0;
        }
        for (var M, B = 0, y, $ = b.length, k = this.blocks; B < $; ) {
          if (this.hashed && (this.hashed = !1, k[0] = this.block, this.block = k[16] = k[1] = k[2] = k[3] = k[4] = k[5] = k[6] = k[7] = k[8] = k[9] = k[10] = k[11] = k[12] = k[13] = k[14] = k[15] = 0), g) for (y = this.start; B < $ && y < 64; ++B) k[y >>> 2] |= b[B] << m[y++ & 3];
          else for (y = this.start; B < $ && y < 64; ++B)
            M = b.charCodeAt(B), M < 128 ? k[y >>> 2] |= M << m[y++ & 3] : M < 2048 ? (k[y >>> 2] |= (192 | M >>> 6) << m[y++ & 3], k[y >>> 2] |= (128 | M & 63) << m[y++ & 3]) : M < 55296 || M >= 57344 ? (k[y >>> 2] |= (224 | M >>> 12) << m[y++ & 3], k[y >>> 2] |= (128 | M >>> 6 & 63) << m[y++ & 3], k[y >>> 2] |= (128 | M & 63) << m[y++ & 3]) : (M = 65536 + ((M & 1023) << 10 | b.charCodeAt(++B) & 1023), k[y >>> 2] |= (240 | M >>> 18) << m[y++ & 3], k[y >>> 2] |= (128 | M >>> 12 & 63) << m[y++ & 3], k[y >>> 2] |= (128 | M >>> 6 & 63) << m[y++ & 3], k[y >>> 2] |= (128 | M & 63) << m[y++ & 3]);
          this.lastByteIndex = y, this.bytes += y - this.start, y >= 64 ? (this.block = k[16], this.start = y - 64, this.hash(), this.hashed = !0) : this.start = y;
        }
        return this.bytes > 4294967295 && (this.hBytes += this.bytes / 4294967296 << 0, this.bytes = this.bytes % 4294967296), this;
      }
    }, T.prototype.finalize = function() {
      if (!this.finalized) {
        this.finalized = !0;
        var b = this.blocks, g = this.lastByteIndex;
        b[16] = this.block, b[g >>> 2] |= d[g & 3], this.block = b[16], g >= 56 && (this.hashed || this.hash(), b[0] = this.block, b[16] = b[1] = b[2] = b[3] = b[4] = b[5] = b[6] = b[7] = b[8] = b[9] = b[10] = b[11] = b[12] = b[13] = b[14] = b[15] = 0), b[14] = this.hBytes << 3 | this.bytes >>> 29, b[15] = this.bytes << 3, this.hash();
      }
    }, T.prototype.hash = function() {
      var b = this.h0, g = this.h1, x = this.h2, M = this.h3, B = this.h4, y = this.h5, $ = this.h6, k = this.h7, I = this.blocks, j, z, N, D, E, Q, ee, ae, ve, oe, ue;
      for (j = 16; j < 64; ++j)
        E = I[j - 15], z = (E >>> 7 | E << 25) ^ (E >>> 18 | E << 14) ^ E >>> 3, E = I[j - 2], N = (E >>> 17 | E << 15) ^ (E >>> 19 | E << 13) ^ E >>> 10, I[j] = I[j - 16] + z + I[j - 7] + N << 0;
      for (ue = g & x, j = 0; j < 64; j += 4)
        this.first ? (this.is224 ? (ae = 300032, E = I[0] - 1413257819, k = E - 150054599 << 0, M = E + 24177077 << 0) : (ae = 704751109, E = I[0] - 210244248, k = E - 1521486534 << 0, M = E + 143694565 << 0), this.first = !1) : (z = (b >>> 2 | b << 30) ^ (b >>> 13 | b << 19) ^ (b >>> 22 | b << 10), N = (B >>> 6 | B << 26) ^ (B >>> 11 | B << 21) ^ (B >>> 25 | B << 7), ae = b & g, D = ae ^ b & x ^ ue, ee = B & y ^ ~B & $, E = k + N + ee + w[j] + I[j], Q = z + D, k = M + E << 0, M = E + Q << 0), z = (M >>> 2 | M << 30) ^ (M >>> 13 | M << 19) ^ (M >>> 22 | M << 10), N = (k >>> 6 | k << 26) ^ (k >>> 11 | k << 21) ^ (k >>> 25 | k << 7), ve = M & b, D = ve ^ M & g ^ ae, ee = k & B ^ ~k & y, E = $ + N + ee + w[j + 1] + I[j + 1], Q = z + D, $ = x + E << 0, x = E + Q << 0, z = (x >>> 2 | x << 30) ^ (x >>> 13 | x << 19) ^ (x >>> 22 | x << 10), N = ($ >>> 6 | $ << 26) ^ ($ >>> 11 | $ << 21) ^ ($ >>> 25 | $ << 7), oe = x & M, D = oe ^ x & b ^ ve, ee = $ & k ^ ~$ & B, E = y + N + ee + w[j + 2] + I[j + 2], Q = z + D, y = g + E << 0, g = E + Q << 0, z = (g >>> 2 | g << 30) ^ (g >>> 13 | g << 19) ^ (g >>> 22 | g << 10), N = (y >>> 6 | y << 26) ^ (y >>> 11 | y << 21) ^ (y >>> 25 | y << 7), ue = g & x, D = ue ^ g & M ^ oe, ee = y & $ ^ ~y & k, E = B + N + ee + w[j + 3] + I[j + 3], Q = z + D, B = b + E << 0, b = E + Q << 0, this.chromeBugWorkAround = !0;
      this.h0 = this.h0 + b << 0, this.h1 = this.h1 + g << 0, this.h2 = this.h2 + x << 0, this.h3 = this.h3 + M << 0, this.h4 = this.h4 + B << 0, this.h5 = this.h5 + y << 0, this.h6 = this.h6 + $ << 0, this.h7 = this.h7 + k << 0;
    }, T.prototype.hex = function() {
      this.finalize();
      var b = this.h0, g = this.h1, x = this.h2, M = this.h3, B = this.h4, y = this.h5, $ = this.h6, k = this.h7, I = a[b >>> 28 & 15] + a[b >>> 24 & 15] + a[b >>> 20 & 15] + a[b >>> 16 & 15] + a[b >>> 12 & 15] + a[b >>> 8 & 15] + a[b >>> 4 & 15] + a[b & 15] + a[g >>> 28 & 15] + a[g >>> 24 & 15] + a[g >>> 20 & 15] + a[g >>> 16 & 15] + a[g >>> 12 & 15] + a[g >>> 8 & 15] + a[g >>> 4 & 15] + a[g & 15] + a[x >>> 28 & 15] + a[x >>> 24 & 15] + a[x >>> 20 & 15] + a[x >>> 16 & 15] + a[x >>> 12 & 15] + a[x >>> 8 & 15] + a[x >>> 4 & 15] + a[x & 15] + a[M >>> 28 & 15] + a[M >>> 24 & 15] + a[M >>> 20 & 15] + a[M >>> 16 & 15] + a[M >>> 12 & 15] + a[M >>> 8 & 15] + a[M >>> 4 & 15] + a[M & 15] + a[B >>> 28 & 15] + a[B >>> 24 & 15] + a[B >>> 20 & 15] + a[B >>> 16 & 15] + a[B >>> 12 & 15] + a[B >>> 8 & 15] + a[B >>> 4 & 15] + a[B & 15] + a[y >>> 28 & 15] + a[y >>> 24 & 15] + a[y >>> 20 & 15] + a[y >>> 16 & 15] + a[y >>> 12 & 15] + a[y >>> 8 & 15] + a[y >>> 4 & 15] + a[y & 15] + a[$ >>> 28 & 15] + a[$ >>> 24 & 15] + a[$ >>> 20 & 15] + a[$ >>> 16 & 15] + a[$ >>> 12 & 15] + a[$ >>> 8 & 15] + a[$ >>> 4 & 15] + a[$ & 15];
      return this.is224 || (I += a[k >>> 28 & 15] + a[k >>> 24 & 15] + a[k >>> 20 & 15] + a[k >>> 16 & 15] + a[k >>> 12 & 15] + a[k >>> 8 & 15] + a[k >>> 4 & 15] + a[k & 15]), I;
    }, T.prototype.toString = T.prototype.hex, T.prototype.digest = function() {
      this.finalize();
      var b = this.h0, g = this.h1, x = this.h2, M = this.h3, B = this.h4, y = this.h5, $ = this.h6, k = this.h7, I = [
        b >>> 24 & 255,
        b >>> 16 & 255,
        b >>> 8 & 255,
        b & 255,
        g >>> 24 & 255,
        g >>> 16 & 255,
        g >>> 8 & 255,
        g & 255,
        x >>> 24 & 255,
        x >>> 16 & 255,
        x >>> 8 & 255,
        x & 255,
        M >>> 24 & 255,
        M >>> 16 & 255,
        M >>> 8 & 255,
        M & 255,
        B >>> 24 & 255,
        B >>> 16 & 255,
        B >>> 8 & 255,
        B & 255,
        y >>> 24 & 255,
        y >>> 16 & 255,
        y >>> 8 & 255,
        y & 255,
        $ >>> 24 & 255,
        $ >>> 16 & 255,
        $ >>> 8 & 255,
        $ & 255
      ];
      return this.is224 || I.push(k >>> 24 & 255, k >>> 16 & 255, k >>> 8 & 255, k & 255), I;
    }, T.prototype.array = T.prototype.digest, T.prototype.arrayBuffer = function() {
      this.finalize();
      var b = /* @__PURE__ */ new ArrayBuffer(this.is224 ? 28 : 32), g = new DataView(b);
      return g.setUint32(0, this.h0), g.setUint32(4, this.h1), g.setUint32(8, this.h2), g.setUint32(12, this.h3), g.setUint32(16, this.h4), g.setUint32(20, this.h5), g.setUint32(24, this.h6), this.is224 || g.setUint32(28, this.h7), b;
    };
    function L(b, g, x) {
      var M, B = typeof b;
      if (B === "string") {
        var y = [], $ = b.length, k = 0, I;
        for (M = 0; M < $; ++M)
          I = b.charCodeAt(M), I < 128 ? y[k++] = I : I < 2048 ? (y[k++] = 192 | I >>> 6, y[k++] = 128 | I & 63) : I < 55296 || I >= 57344 ? (y[k++] = 224 | I >>> 12, y[k++] = 128 | I >>> 6 & 63, y[k++] = 128 | I & 63) : (I = 65536 + ((I & 1023) << 10 | b.charCodeAt(++M) & 1023), y[k++] = 240 | I >>> 18, y[k++] = 128 | I >>> 12 & 63, y[k++] = 128 | I >>> 6 & 63, y[k++] = 128 | I & 63);
        b = y;
      } else if (B === "object") {
        if (b === null) throw new Error(t);
        if (h && b.constructor === ArrayBuffer) b = new Uint8Array(b);
        else if (!Array.isArray(b) && (!h || !ArrayBuffer.isView(b)))
          throw new Error(t);
      } else throw new Error(t);
      b.length > 64 && (b = new T(g, !0).update(b).array());
      var j = [], z = [];
      for (M = 0; M < 64; ++M) {
        var N = b[M] || 0;
        j[M] = 92 ^ N, z[M] = 54 ^ N;
      }
      T.call(this, g, x), this.update(z), this.oKeyPad = j, this.inner = !0, this.sharedMemory = x;
    }
    L.prototype = new T(), L.prototype.finalize = function() {
      if (T.prototype.finalize.call(this), this.inner) {
        this.inner = !1;
        var b = this.array();
        T.call(this, this.is224, this.sharedMemory), this.update(this.oKeyPad), this.update(b), T.prototype.finalize.call(this);
      }
    };
    var O = V();
    O.sha256 = O, O.sha224 = V(!0), O.sha256.hmac = J(), O.sha224.hmac = J(!0), l ? s.exports = O : (n.sha256 = O.sha256, n.sha224 = O.sha224, o && define(function() {
      return O;
    }));
  })();
})), fa = va(), Ze = "atlas";
function pa(e) {
  return e ? `map:${(0, fa.sha256)(e)}` : Ze;
}
var Uo = Object.freeze({
  frame: Ze,
  scale: 1,
  offset: [0, 0]
});
function De(e, s) {
  return [e[0] * s.scale + s.offset[0], e[1] * s.scale + s.offset[1]];
}
function ma(e) {
  const s = new Map(e.map((n) => [n.id, n])), t = /* @__PURE__ */ new Map();
  function i(n) {
    if (t.has(n)) return t.get(n);
    const u = n, c = /* @__PURE__ */ new Map();
    let l = 1, o = [0, 0];
    for (; !c.has(n); ) {
      c.set(n, {
        frame: n,
        scale: l,
        offset: o
      });
      const h = s.get(n)?.mapping;
      if (!h) break;
      o = De(o, h), l *= h.scale, n = h.frame;
    }
    return t.set(u, c), c;
  }
  return (n, u) => {
    if (!s.has(n) || !s.has(u)) return null;
    const c = i(n);
    for (const [l, o] of i(u)) {
      const h = c.get(l);
      if (h) {
        const a = h.scale / o.scale, d = [(h.offset[0] - o.offset[0]) / o.scale, (h.offset[1] - o.offset[1]) / o.scale];
        return ![a, ...d].every(Number.isFinite) || a <= 0 ? null : {
          frame: u,
          scale: a,
          offset: d
        };
      }
    }
    return null;
  };
}
function de(e) {
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
  if (e.shape === "circle") return Array.from({ length: 64 }, (n, u) => [e.x + e.radius * Math.cos(u * Math.PI / 32), e.y + e.radius * Math.sin(u * Math.PI / 32)]);
  if (e.shape === "path") return e.points;
  const s = [], t = e.points.length, i = (n) => e.points[e.closed ? (n + t) % t : Math.max(0, Math.min(t - 1, n))];
  for (let n = 0; n < t - (e.closed ? 0 : 1); n++) {
    const u = i(n - 1), c = i(n), l = i(n + 1), o = i(n + 2);
    for (let h = 0; h < 8; h++) {
      const a = h / 8;
      s.push([0, 1].map((d) => 0.5 * (2 * c[d] + (-u[d] + l[d]) * a + (2 * u[d] - 5 * c[d] + 4 * l[d] - o[d]) * a * a + (-u[d] + 3 * c[d] - 3 * l[d] + o[d]) * a * a * a)));
    }
  }
  return e.closed || s.push(e.points[t - 1]), s;
}
function ya(e, s) {
  if ("points" in e) return {
    ...e,
    points: e.points.map((n) => De(n, s)),
    ...e.width === void 0 ? {} : { width: e.width * s.scale }
  };
  const [t, i] = De([e.x, e.y], s);
  return e.shape === "rect" ? {
    ...e,
    x: t,
    y: i,
    width: e.width * s.scale,
    height: e.height * s.scale
  } : e.shape === "circle" ? {
    ...e,
    x: t,
    y: i,
    radius: e.radius * s.scale
  } : {
    ...e,
    x: t,
    y: i
  };
}
function tt(e, s = 0) {
  let t = 1 / 0, i = 1 / 0, n = -1 / 0, u = -1 / 0;
  for (const [c, l] of e)
    t = Math.min(t, c), i = Math.min(i, l), n = Math.max(n, c), u = Math.max(u, l);
  return [
    t - s,
    i - s,
    n - t + 2 * s,
    u - i + 2 * s
  ];
}
function Be(e) {
  return tt(he(e), (e.shape === "path" || e.shape === "curve") && !e.closed ? (e.width || 0) / 2 : 0);
}
function st(e, s) {
  return e[0] <= s[0] + s[2] && s[0] <= e[0] + e[2] && e[1] <= s[1] + s[3] && s[1] <= e[1] + e[3];
}
function $e(e, s) {
  const t = he(s);
  if (!de(s)) {
    const n = s.shape === "path" || s.shape === "curve" ? (s.width || 0) / 2 : 0;
    for (let u = 1; u < t.length; u++) {
      const c = t[u - 1], l = t[u], o = l[0] - c[0], h = l[1] - c[1], a = Math.max(0, Math.min(1, ((e[0] - c[0]) * o + (e[1] - c[1]) * h) / (o * o + h * h || 1)));
      if (Math.hypot(e[0] - c[0] - a * o, e[1] - c[1] - a * h) <= n) return !0;
    }
    return !1;
  }
  let i = !1;
  for (let n = 0, u = t.length - 1; n < t.length; u = n++) {
    const c = t[n], l = t[u];
    c[1] > e[1] != l[1] > e[1] && e[0] < (l[0] - c[0]) * (e[1] - c[1]) / (l[1] - c[1]) + c[0] && (i = !i);
  }
  return i;
}
function St(e, s, t, i) {
  const n = s[0] - e[0], u = s[1] - e[1], c = i[0] - t[0], l = i[1] - t[1], o = n * l - u * c;
  if (!o) return null;
  const h = ((t[0] - e[0]) * l - (t[1] - e[1]) * c) / o, a = ((t[0] - e[0]) * u - (t[1] - e[1]) * n) / o;
  return h >= 0 && h <= 1 && a >= 0 && a <= 1 ? [e[0] + h * n, e[1] + h * u] : null;
}
function ba(e, s, t, i) {
  const n = i[0] - t[0], u = i[1] - t[1], c = t[0] - e[0], l = t[1] - e[1], o = n * n + u * u, h = 2 * (c * n + l * u), a = c * c + l * l - s * s, d = h * h - 4 * o * a;
  return !o || d < 0 ? [] : [(-h - Math.sqrt(d)) / (2 * o), (-h + Math.sqrt(d)) / (2 * o)].filter((m) => m >= 0 && m <= 1).map((m) => [t[0] + n * m, t[1] + u * m]);
}
function ka(e, s, t) {
  const i = he(e), n = he(s), u = n.filter((c) => $e(c, e));
  for (const c of i) {
    const l = [
      [c[0] - t, c[1]],
      [c[0] + t, c[1]],
      [c[0], c[1] - t],
      [c[0], c[1] + t]
    ];
    u.push(...l.filter((o) => $e(o, s)));
    for (let o = 0; o < n.length; o++) u.push(...ba(c, t, n[o], n[(o + 1) % n.length]));
  }
  for (let c = 1; c < i.length; c++) {
    const l = i[c - 1], o = i[c], h = Math.hypot(o[0] - l[0], o[1] - l[1]);
    if (!h) continue;
    const a = -(o[1] - l[1]) / h * t, d = (o[0] - l[0]) / h * t, m = [
      [l[0] + a, l[1] + d],
      [o[0] + a, o[1] + d],
      [o[0] - a, o[1] - d],
      [l[0] - a, l[1] - d]
    ];
    u.push(...m.filter((w) => $e(w, s)));
    for (let w = 0; w < m.length; w++) for (let C = 0; C < n.length; C++) {
      const P = St(m[w], m[(w + 1) % m.length], n[C], n[(C + 1) % n.length]);
      P && u.push(P);
    }
  }
  return u;
}
function ga(e, s) {
  const t = Be(e);
  if (!s) return t;
  const i = Be(s);
  if (!st(t, i)) return null;
  const n = (e.shape === "path" || e.shape === "curve") && !e.closed ? (e.width || 0) / 2 : 0;
  if (n) {
    const o = ka(e, s, n);
    if (!o.length) return null;
    const h = tt(o), a = Math.max(h[0], i[0]), d = Math.max(h[1], i[1]);
    return [
      a,
      d,
      Math.max(0, Math.min(h[0] + h[2], i[0] + i[2]) - a),
      Math.max(0, Math.min(h[1] + h[3], i[1] + i[3]) - d)
    ];
  }
  const u = he(e), c = he(s), l = u.filter((o) => $e(o, s));
  de(e) && l.push(...c.filter((o) => $e(o, e)));
  for (let o = 0; o < u.length - (de(e) ? 0 : 1); o++) for (let h = 0; h < c.length; h++) {
    const a = St(u[o], u[(o + 1) % u.length], c[h], c[(h + 1) % c.length]);
    a && l.push(a);
  }
  return l.length ? tt(l) : null;
}
function me(e) {
  return e.shape === "point" ? `M${e.x - 2} ${e.y}a2 2 0 1 0 4 0a2 2 0 1 0 -4 0` : he(e).map((s, t) => `${t ? "L" : "M"}${s[0]} ${s[1]}`).join(" ") + (de(e) ? "Z" : "");
}
function at(e) {
  return "points" in e && !e.closed ? e.width || 1 : 0;
}
var it = {
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
function wa(e) {
  let s = 2166136261;
  for (let t = 0; t < e.length; t++) s = Math.imul(s ^ e.charCodeAt(t), 16777619);
  return s >>> 0;
}
function Ma(e, s, t) {
  let n = 2 ** Math.max(0, Math.ceil(Math.log2(t * 22 / 48)));
  const u = Be(e.geometry), c = (w) => [
    Math.floor(Math.max(u[0], s[0] - 96) / w),
    Math.floor(Math.max(u[1], s[1] - 96) / w),
    Math.ceil(Math.min(u[0] + u[2], s[0] + s[2] + 96) / w),
    Math.ceil(Math.min(u[1] + u[3], s[1] + s[3] + 96) / w)
  ];
  let l = c(48 * n);
  for (; Math.max(0, l[2] - l[0] + 1) * Math.max(0, l[3] - l[1] + 1) > 192; )
    n *= 2, l = c(48 * n);
  const [o, h, a, d] = l, m = [];
  for (let w = h; w <= d && m.length < 192; w++) for (let C = o; C <= a && m.length < 192; C++) {
    const P = C * n, U = w * n, V = `${e.id}:${P}:${U}`, Z = wa(V), F = P * 48 + ((Z & 255) / 255 - 0.5) * 48 * 0.55, J = U * 48 + ((Z >>> 8 & 255) / 255 - 0.5) * 48 * 0.55;
    e.form === "scattered" && Z % 3 !== 0 || $e([F, J], e.geometry) && m.push({
      id: V,
      x: F,
      y: J,
      size: 48 * (0.45 + (Z >>> 16 & 255) / 255 * 0.2),
      variant: Z % 3
    });
  }
  return m;
}
var ht = {
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
function $a(e) {
  const s = [...e].sort((u, c) => ht[u.source.role] - ht[c.source.role] || u.source.id.localeCompare(c.source.id)), t = /* @__PURE__ */ new Set(), i = [], n = new Set(s.map((u) => u.source.id));
  for (; s.length; ) {
    const u = s.findIndex((l) => [l.source.support, ...l.source.crosses || []].every((o) => !o || !n.has(o) || t.has(o)));
    if (u < 0) throw new Error("space_support_cycle");
    const c = s.splice(u, 1)[0];
    t.add(c.source.id), i.push(c);
  }
  return i;
}
function xa(e, s) {
  const t = e.source;
  return s.filter((i) => {
    const n = i.source;
    if (!st(e.bounds, i.bounds) || t.id === n.id || t.support !== n.support || t.crosses?.includes(n.id)) return !1;
    if (n.material === "water" && n.role !== "environment" && t.material !== "water" && [
      "surface",
      "cover",
      "relief",
      "structure"
    ].includes(t.role)) return !0;
    const u = (t.crosses || []).length === (n.crosses || []).length && (t.crosses || []).every((c) => n.crosses?.includes(c));
    return n.role === t.role && n.material === t.material && n.form === t.form && u && n.id < t.id ? !0 : [
      "scattered",
      "compact",
      "blocks",
      "towers"
    ].includes(t.form || "") ? n.role === "channel" || n.role === "cover" || n.role === "structure" && !!n.destination && de(n.geometry) : !1;
  });
}
function _a(e) {
  let s = 2166136261;
  for (let t = 0; t < e.length; t++) s = Math.imul(s ^ e.charCodeAt(t), 16777619);
  return s >>> 0;
}
function be(e, s, t) {
  let i = Math.imul(e, 374761393) + Math.imul(s, 668265263) + t;
  return i = Math.imul(i ^ i >>> 13, 1274126177), ((i ^ i >>> 16) >>> 0) / 4294967295;
}
function Ee(e, s, t) {
  const i = Math.floor(e), n = Math.floor(s), u = e - i, c = s - n, l = u * u * (3 - 2 * u), o = c * c * (3 - 2 * c), h = be(i, n, t), a = be(i + 1, n, t), d = be(i, n + 1, t), m = be(i + 1, n + 1, t);
  return h + (a - h) * l + (d - h) * o + (h - a - d + m) * l * o;
}
function Oe(e, s, t) {
  return Ee(e, s, t) * 0.55 + Ee(e * 2.07, s * 2.07, t + 71) * 0.27 + Ee(e * 4.13, s * 4.13, t + 137) * 0.13 + Ee(e * 8.23, s * 8.23, t + 211) * 0.05;
}
var Sa = 768, Aa = 12e5, Me = (e) => Math.min(1, Math.max(0, e)), et = (e) => [
  1,
  3,
  5
].map((s) => parseInt(e.slice(s, s + 2), 16));
function Ca(e, s, t) {
  const n = Math.floor(e / 8), u = Math.floor(s / 8);
  let c = 0;
  for (let l = u - 1; l <= u + 1; l++) for (let o = n - 1; o <= n + 1; o++) {
    const h = be(o, l, t), a = be(o, l, t + 53), d = e - (o + h) * 8, m = s - (l + a) * 8, w = (d * d + m * m) / (3.7 + h * 3.2) ** 2;
    c = Math.max(c, Math.max(0, 1 - w) * (0.65 + a * 0.35));
  }
  return Math.sqrt(c);
}
function ot(e, s = 1) {
  const [, , t, i] = Be(e.geometry), n = [
    "ridge",
    "forest",
    "blocks",
    "compact",
    "towers",
    "scattered",
    "celestial"
  ].includes(e.form || "") || e.material === "forest", u = Math.max(n ? 0.7 : 1.8, Math.max(t, i) / (n ? Sa : 384)) * s;
  return [Math.max(2, Math.floor(t / u)), Math.max(2, Math.floor(i / u))];
}
function ja(e) {
  const s = e.reduce((t, i) => {
    const [n, u] = ot(i);
    return t + n * u;
  }, 0);
  return Math.max(1, Math.sqrt(s / Aa));
}
function Ea(e, s, t, i) {
  const n = s + 2, u = new Float32Array(n * (t + 2)), c = he(e.geometry);
  for (let o = 0; o < t; o++) {
    const h = i[1] + (o + 0.5) / t * i[3], a = [];
    for (let d = 0, m = c.length - 1; d < c.length; m = d++) {
      const w = c[d], C = c[m];
      w[1] > h != C[1] > h && a.push((w[0] + (h - w[1]) * (C[0] - w[0]) / (C[1] - w[1]) - i[0]) / i[2] * s);
    }
    a.sort((d, m) => d - m);
    for (let d = 0; d + 1 < a.length; d += 2) for (let m = Math.max(0, Math.ceil(a[d] - 0.5)); m < Math.min(s, a[d + 1] - 0.5); m++) u[(o + 1) * n + m + 1] = Math.min(m + 0.5 - a[d], a[d + 1] - m - 0.5, o + 0.5, t - o - 0.5);
  }
  for (let o = 1; o <= t; o++) for (let h = 1; h <= s; h++) {
    const a = o * n + h;
    u[a] && (u[a] = Math.min(u[a], u[a - 1] + 1, u[a - n] + 1, u[a - n - 1] + 1.414, u[a - n + 1] + 1.414));
  }
  for (let o = t; o > 0; o--) for (let h = s; h > 0; h--) {
    const a = o * n + h;
    u[a] && (u[a] = Math.min(u[a], u[a + 1] + 1, u[a + n] + 1, u[a + n + 1] + 1.414, u[a + n - 1] + 1.414));
  }
  const l = new Float32Array(s * t);
  for (let o = 0; o < t; o++) l.set(u.subarray((o + 1) * n + 1, (o + 1) * n + s + 1), o * s);
  return l;
}
function Ba(e) {
  return e.form === "celestial" ? "planet" : e.form === "nebula" ? "nebula" : e.form === "ridge" ? "ridge" : e.form === "dunes" ? "dunes" : e.form === "forest" || e.material === "forest" ? "forest" : [
    "scattered",
    "compact",
    "blocks",
    "towers"
  ].includes(e.form || "") ? "city" : e.material === "vacuum" ? "space" : e.material === "cloud" ? "cloud" : e.material === "water" ? "water" : e.material === "metal" ? "metal" : "plain";
}
function Ia(e, s = 1) {
  const t = Be(e.geometry), [i, n] = ot(e, s), u = new Uint8ClampedArray(i * n * 4), c = new Float32Array(i * n), l = Ba(e), o = _a(e.id), h = it[e.material], a = et(h.base), d = et(h.light), m = et(h.ink), w = t[2] / i, C = t[3] / n, P = l === "ridge" || l === "forest" || e.role === "environment", U = (P || l === "water") && de(e.geometry) ? Ea(e, i, n, t) : void 0, V = l === "water" && !de(e.geometry) ? he(e.geometry) : [], Z = Math.max(12, Math.min(t[2], t[3]) * 0.38);
  for (let J = 0; J < n; J++) for (let T = 0; T < i; T++) {
    const L = t[0] + (T + 0.5) * w, O = t[1] + (J + 0.5) * C, b = J * i + T, g = Oe(L / 90, O / 90, o);
    let x = g, M = (g - 0.5) * 0.4, B = 1, y = 1;
    if (l === "ridge") {
      const j = Ee(L / 130, O / 130, o) * 2.4, z = 1 - Math.abs(Oe(L / 62 + j, O / 45, o + 19) * 2 - 1);
      x = (U ? Math.pow(Me(U[b] * Math.min(w, C) / Z), 0.65) : 1) * (0.3 + z * z * 0.7), M = x * 0.8 - 0.2;
    } else if (l === "dunes") {
      const j = Oe(L / 130, O / 130, o) * 5, z = (Math.sin(L / 18 + O / 49 + j) + 1) / 2;
      x = Math.pow(z, 0.65) * (0.65 + g * 0.35), M = x * 0.38 - 0.1;
    } else if (l === "forest") {
      const j = Ca(L, O, o + 32);
      x = j * 0.7 + g * 0.3, M = (j - 0.5) * 0.6 + (g - 0.5) * 0.8;
    } else if (l === "city") {
      const j = e.form === "compact" ? 32 : e.form === "towers" ? 38 : 58, z = Math.floor(L / j), N = Math.floor(O / j), D = L / j - z, E = O / j - N, Q = be(z, N, o), ee = e.form === "scattered" && Q > 0.36, ae = e.form === "towers" ? 1 : Q < 0.5 ? 2 : 3, ve = e.form === "towers" ? 1 : Q < 0.3 ? 3 : 2, oe = Math.floor(D * ae), ue = Math.floor(E * ve), le = D * ae - oe, G = E * ve - ue, fe = be(z * 7 + oe, N * 7 + ue, o + 21), _e = 0.1 + fe * 0.09, ce = D > 0.07 && E > 0.07 && D < 0.93 && E < 0.93, pe = !ee && ce && le > _e && G > _e && le < 0.87 && G < 0.86;
      if (x = 0, M = pe ? -0.06 + fe * 0.28 : 0.6, !pe && ce && le > _e + 0.06 && G > _e + 0.06 && le < 0.98 && G < 0.98 && (M = -0.32), pe) {
        const Se = Q < 0.5 ? le : G;
        M += Se < 0.5 ? 0.08 : -0.12, Math.abs(Se - 0.5) < 0.025 && (M += 0.15), fe > 0.7 && le > 0.35 && le < 0.6 && G > 0.35 && G < 0.6 && (M -= 0.25);
      }
    } else if (l === "water") {
      x = g * 0.12, M = (g - 0.5) * 0.45;
      let j = U ? U[b] * Math.min(w, C) : 1 / 0;
      if (V.length > 1) {
        let z = 1 / 0;
        for (let N = 1; N < V.length; N++) {
          const D = V[N - 1], E = V[N], Q = E[0] - D[0], ee = E[1] - D[1], ae = Me(((L - D[0]) * Q + (O - D[1]) * ee) / (Q * Q + ee * ee || 1));
          z = Math.min(z, (L - D[0] - Q * ae) ** 2 + (O - D[1] - ee * ae) ** 2);
        }
        j = ("width" in e.geometry && e.geometry.width || 1) / 2 - Math.sqrt(z);
      }
      e.role !== "environment" && (M += 0.38 * (1 - Me(j / 9)) - 0.1);
    } else if (l === "space")
      x = 0, M = (g - 0.5) * 0.18;
    else if (l === "nebula") {
      const j = (L - t[0]) / Math.max(1, t[2]) * 2 - 1, z = (O - t[1]) / Math.max(1, t[3]) * 2 - 1, N = Oe(L / 70 + g * 3, O / 100, o + 42);
      B = Me(1 - Math.hypot(j, z)) * Me((N - 0.2) * 2.4), x = 0, M = N * 1.5 - 0.4;
    } else if (l === "planet") {
      const j = (L - t[0]) / Math.max(1, t[2]) * 2 - 1, z = (O - t[1]) / Math.max(1, t[3]) * 2 - 1, N = Math.sqrt(Math.max(0, 1 - j * j - z * z));
      y = 0.19 + Math.max(0, -j * 0.48 - z * 0.52 + N * 0.67) * 0.92, x = 0, M = (Oe(L / 17, O / 17, o) - 0.5) * 0.7;
    } else if (l === "cloud")
      x = g * 0.3, M = (g - 0.4) * 0.65;
    else if (l === "metal") {
      const j = Math.abs(L / 64 - Math.round(L / 64)) < 0.01 || Math.abs(O / 40 - Math.round(O / 40)) < 0.012;
      x = 0, M = j ? -0.35 : (g - 0.5) * 0.14;
    } else
      x = g * 0.15, e.material === "sand" && (M += (Ee(L / 2, O / 2, o) - 0.5) * 0.1), (e.material === "lava" || e.material === "rune") && (M += Math.pow(1 - Math.abs(g * 2 - 1), 12) * 0.8);
    if (P && U) {
      const j = Me(U[b] * Math.min(w, C) / Math.min(18, Math.min(t[2], t[3]) * 0.12));
      B *= j * j * (3 - 2 * j);
    }
    c[b] = x;
    const $ = M >= 0 ? d : m, k = Me(Math.abs(M)), I = (be(Math.floor(L * 2), Math.floor(O * 2), o) - 0.5) * (l === "space" ? 1 : 3);
    for (let j = 0; j < 3; j++) u[b * 4 + j] = (a[j] + ($[j] - a[j]) * k) * y + I;
    u[b * 4 + 3] = B * 255;
  }
  const F = l === "ridge" ? 26 : l === "dunes" ? 18 : l === "forest" ? 1.8 : 0;
  if (F) for (let J = 1; J < n - 1; J++) for (let T = 1; T < i - 1; T++) {
    const L = J * i + T, O = (c[L + 1] - c[L - 1]) / (2 * w) * F, b = (c[L + i] - c[L - i]) / (2 * C) * F, g = (0.82 + (O + b) * 0.55) / Math.sqrt(1 + O * O + b * b), x = Math.max(0.58, Math.min(1.12, 0.32 + g * 0.82));
    for (let M = 0; M < 3; M++) u[L * 4 + M] *= x;
  }
  return {
    bounds: t,
    width: i,
    height: n,
    pixels: u
  };
}
var Pa = [
  "x",
  "y",
  "width",
  "height",
  "viewBox"
], Oa = [
  "width",
  "height",
  "href"
], Ra = /* @__PURE__ */ ie({
  __name: "AtlasSurface",
  props: {
    sheet: {},
    tile: {}
  },
  setup(e) {
    return (s, t) => (v(), f("svg", {
      class: "map-atlas-material",
      x: e.tile.bounds[0],
      y: e.tile.bounds[1],
      width: e.tile.bounds[2],
      height: e.tile.bounds[3],
      viewBox: e.tile.rect.join(" "),
      preserveAspectRatio: "none",
      overflow: "hidden"
    }, [r("image", {
      width: e.sheet.width,
      height: e.sheet.height,
      href: e.sheet.href
    }, null, 8, Oa)], 8, Pa));
  }
}), Ha = Ra, vt = 2048;
function Ta(e, s) {
  for (; ; ) {
    const i = e.map((c, l) => ({
      size: ot(c, s),
      index: l
    })).sort((c, l) => l.size[1] - c.size[1] || l.size[0] - c.size[0]), n = i.reduce((c, { size: [l, o] }) => c + (l + 2) * (o + 2), 0);
    let u = Math.min(vt, 2 ** Math.ceil(Math.log2(Math.max(2, Math.sqrt(n), ...i.map((c) => c.size[0] + 2)))));
    for (; ; ) {
      let c = 0, l = 0, o = 0;
      const h = [];
      for (const { size: [d, m], index: w } of i)
        c + d + 2 > u && (c = 0, l += o, o = 0), h[w] = [
          c + 1,
          l + 1,
          d,
          m
        ], c += d + 2, o = Math.max(o, m + 2);
      const a = Math.max(2, l + o);
      if (a <= 2048) return {
        width: u,
        height: a,
        density: s,
        rectangles: h
      };
      if (u === 2048) break;
      u = Math.min(vt, u * 2);
    }
    s *= 2;
  }
}
function La(e, s) {
  const t = Ta(e, s), { width: i, height: n, rectangles: u } = t, c = document.createElement("canvas");
  c.width = i, c.height = n;
  const l = c.getContext("2d");
  if (!l) throw new Error("atlas_surface_context_unavailable");
  const o = /* @__PURE__ */ new Map();
  e.forEach((a, d) => {
    const m = Ia(a, t.density), w = u[d], C = l.createImageData(m.width, m.height);
    C.data.set(m.pixels), l.putImageData(C, w[0], w[1]), o.set(a.id, {
      bounds: m.bounds,
      rect: w
    });
  });
  const h = c.toDataURL("image/png");
  if (!h.startsWith("data:image/png;")) throw new Error("atlas_surface_encoding_failed");
  return {
    href: h,
    width: i,
    height: n,
    tiles: o
  };
}
var Va = ["clip-path"], Na = ["d"], Ua = [
  "id",
  "x",
  "y",
  "width",
  "height"
], za = [
  "d",
  "fill",
  "stroke",
  "stroke-width"
], qa = [
  "id",
  "x",
  "y",
  "width",
  "height"
], Ka = [
  "x",
  "y",
  "width",
  "height",
  "fill"
], Da = ["d", "mask"], Fa = [
  "d",
  "fill",
  "stroke-width"
], Ya = ["data-feature", "mask"], Za = [
  "d",
  "fill",
  "stroke",
  "stroke-width"
], Wa = ["transform", "mask"], Xa = [
  "d",
  "fill",
  "stroke",
  "stroke-width"
], Ja = [
  "d",
  "stroke",
  "stroke-width",
  "stroke-opacity"
], Qa = ["transform"], Ga = {
  key: 0,
  transform: "scale(.3)"
}, en = ["fill"], tn = ["fill"], an = ["fill"], nn = ["r", "opacity"], sn = {
  key: 0,
  d: "M-.12 0H.12M0-.12V.12",
  stroke: "#afcaec",
  "stroke-width": ".014",
  opacity: ".55"
}, on = ["transform"], ln = ["fill"], rn = /* @__PURE__ */ ie({
  __name: "AtlasSpace",
  props: {
    projection: {},
    viewport: {},
    unitScale: {}
  },
  setup(e) {
    const s = e, t = `atlas-space-${Ne()}`, i = `${t}-region`, n = R(() => ja(s.projection.features.map((h) => h.source))), u = R(() => JSON.stringify(s.projection.features.filter((h) => h.source.form !== "asteroids" && h.source.geometry.shape !== "point").map(({ source: h }) => {
      const a = mt(h);
      return {
        id: a.id,
        frame: a.frame,
        role: a.role,
        material: a.material,
        form: a.form,
        geometry: a.geometry
      };
    }))), c = R(() => La(JSON.parse(u.value), n.value)), l = R(() => {
      const h = $a(s.projection.features);
      return h.map((a, d) => {
        const { scale: m, offset: w } = a.mapping;
        return {
          ...a,
          id: `${t}-${d}`,
          paint: it[a.source.material],
          sourcePath: me(a.source.geometry),
          transform: `translate(${w[0]} ${w[1]}) scale(${m})`,
          closed: de(a.source.geometry),
          width: at(a.source.geometry),
          sourceBounds: Be(a.source.geometry),
          support: s.projection.features.find((C) => C.source.id === a.source.support),
          supportId: `${t}-${h.findIndex((C) => C.source.id === a.source.support)}-base`,
          exclusions: xa(a, s.projection.features)
        };
      });
    }), o = R(() => new Map(l.value.map((h) => {
      const { scale: a, offset: d } = h.mapping, m = [
        (s.viewport[0] - d[0]) / a,
        (s.viewport[1] - d[1]) / a,
        s.viewport[2] / a,
        s.viewport[3] / a
      ];
      return [h.source.id, ["asteroids", "nebula"].includes(h.source.form || "") || h.source.material === "vacuum" ? Ma(h.source, m, s.unitScale / a) : []];
    })));
    return (h, a) => (v(), f("g", {
      class: "map-atlas-space",
      "aria-hidden": "true",
      "clip-path": e.projection.clip ? `url(#${i})` : void 0
    }, [
      r("defs", null, [e.projection.clip ? (v(), f("clipPath", {
        key: 0,
        id: i,
        clipPathUnits: "userSpaceOnUse"
      }, [r("path", { d: p(me)(e.projection.clip) }, null, 8, Na)])) : A("", !0), (v(!0), f(K, null, ne(l.value, (d) => (v(), f(K, { key: d.id }, [r("mask", {
        id: `${d.id}-source`,
        maskUnits: "userSpaceOnUse",
        x: d.sourceBounds[0] - 2,
        y: d.sourceBounds[1] - 2,
        width: d.sourceBounds[2] + 4,
        height: d.sourceBounds[3] + 4,
        style: { "mask-type": "luminance" }
      }, [r("path", {
        d: d.sourcePath,
        fill: d.closed ? "white" : "none",
        stroke: d.closed ? "none" : "white",
        "stroke-width": d.width,
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      }, null, 8, za)], 8, Ua), r("mask", {
        id: `${d.id}-base`,
        maskUnits: "userSpaceOnUse",
        x: e.projection.viewBox[0],
        y: e.projection.viewBox[1],
        width: e.projection.viewBox[2],
        height: e.projection.viewBox[3],
        style: { "mask-type": "luminance" }
      }, [
        r("rect", {
          x: e.projection.viewBox[0],
          y: e.projection.viewBox[1],
          width: e.projection.viewBox[2],
          height: e.projection.viewBox[3],
          fill: d.source.support ? "black" : "white"
        }, null, 8, Ka),
        d.support ? (v(), f("path", {
          key: 0,
          d: p(me)(d.support.geometry),
          fill: "white",
          mask: `url(#${d.supportId})`
        }, null, 8, Da)) : A("", !0),
        (v(!0), f(K, null, ne(d.exclusions, (m) => (v(), f("path", {
          key: m.source.id,
          d: p(me)(m.geometry),
          fill: p(de)(m.geometry) ? "black" : "none",
          stroke: "black",
          "stroke-width": p(at)(m.geometry),
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, null, 8, Fa))), 128))
      ], 8, qa)], 64))), 128))]),
      (v(!0), f(K, null, ne(l.value, (d) => (v(), f("g", {
        key: d.source.id,
        "data-feature": d.source.id,
        mask: `url(#${d.id}-base)`,
        style: Te(d.source.role === "relief" ? { mixBlendMode: "multiply" } : void 0)
      }, [d.source.geometry.shape === "point" ? (v(), f("path", {
        key: 0,
        d: p(me)(d.geometry),
        fill: d.paint.base,
        stroke: d.paint.ink,
        "stroke-width": e.unitScale
      }, null, 8, Za)) : A("", !0), r("g", {
        transform: d.transform,
        mask: `url(#${d.id}-source)`
      }, [d.source.form !== "asteroids" ? (v(), f(K, { key: 0 }, [
        d.source.form !== "nebula" && d.source.form !== "ridge" && d.source.material !== "forest" && d.source.form !== "forest" ? (v(), f("path", {
          key: 0,
          d: d.sourcePath,
          fill: d.closed ? d.paint.base : "none",
          stroke: d.closed ? "none" : d.paint.base,
          "stroke-width": d.width,
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, null, 8, Xa)) : A("", !0),
        d.sourceBounds[2] && d.sourceBounds[3] && p(st)(d.bounds, e.viewport) ? (v(), re(Ha, {
          key: 1,
          sheet: c.value,
          tile: c.value.tiles.get(d.source.id)
        }, null, 8, ["sheet", "tile"])) : A("", !0),
        d.source.role === "surface" || d.source.role === "structure" || d.source.material === "water" && d.source.role !== "environment" ? (v(), f("path", {
          key: 2,
          d: d.sourcePath,
          fill: "none",
          stroke: d.paint.light,
          "stroke-width": d.closed ? e.unitScale / d.mapping.scale * 2.5 : Math.max(0, d.width - e.unitScale / d.mapping.scale * 2),
          "stroke-opacity": d.closed ? 0.6 : 0.12,
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, null, 8, Ja)) : A("", !0)
      ], 64)) : A("", !0), (v(!0), f(K, null, ne(o.value.get(d.source.id), (m) => (v(), f("g", {
        key: m.id,
        transform: `translate(${m.x} ${m.y}) scale(${m.size})`
      }, [d.source.form === "asteroids" ? (v(), f("g", Ga, [
        r("path", {
          d: "M-.8-.25L-.34-.88.42-.68.86.05.38.67-.51.54Z",
          fill: d.paint.ink
        }, null, 8, en),
        r("path", {
          d: "M-.8-.25L-.34-.88.42-.68.1-.08-.51.54Z",
          fill: d.paint.light
        }, null, 8, tn),
        r("path", {
          d: "M-.34-.88L.1-.08.86.05.42-.68Z",
          fill: d.paint.base
        }, null, 8, an)
      ])) : (v(), f(K, { key: 1 }, [r("circle", {
        r: m.variant === 0 ? ".047" : ".026",
        fill: "#eff6ff",
        opacity: m.variant === 2 ? ".45" : ".9"
      }, null, 8, nn), m.variant === 0 ? (v(), f("path", sn)) : A("", !0)], 64))], 8, Qa))), 128))], 8, Wa)], 12, Ya))), 128)),
      (v(!0), f(K, null, ne(l.value.filter((d) => d.label && !d.source.destination), (d) => (v(), f("g", {
        key: `${d.id}-label`,
        class: "map-atlas-label",
        transform: `translate(${d.bounds[0] + d.bounds[2] / 2} ${d.bounds[1] + d.bounds[3] / 2}) scale(${e.unitScale})`
      }, [r("text", {
        "text-anchor": "middle",
        fill: d.source.material === "vacuum" ? "#e4efff" : d.paint.ink
      }, S(d.label), 9, ln)], 8, on))), 128))
    ], 8, Va));
  }
}), un = rn, cn = {
  class: "map-atlas-backdrop",
  "aria-hidden": "true"
}, dn = [
  "id",
  "width",
  "height"
], hn = [
  "d",
  "stroke",
  "stroke-width"
], vn = [
  "id",
  "width",
  "height"
], fn = [
  "cx",
  "cy",
  "r",
  "fill"
], pn = [
  "id",
  "x",
  "y",
  "width",
  "height"
], mn = [
  "x",
  "y",
  "width",
  "height"
], yn = ["clip-path"], bn = [
  "d",
  "fill",
  "stroke-width"
], kn = ["id"], gn = ["d"], wn = [
  "x",
  "y",
  "width",
  "height",
  "fill"
], Mn = [
  "x",
  "y",
  "width",
  "height",
  "fill"
], $n = [
  "x",
  "y",
  "width",
  "height",
  "fill",
  "mask"
], xn = /* @__PURE__ */ ie({
  __name: "AtlasBackdrop",
  props: {
    projection: {},
    viewport: {},
    unitScale: {}
  },
  setup(e) {
    const s = e, t = `atlas-chart-${Ne()}`, i = R(() => {
      const c = s.projection.features.filter((l) => l.source.role === "environment");
      return c.length && c.every((l) => l.source.material === c[0].source.material) ? c[0].source.material : void 0;
    }), n = R(() => i.value ? it[i.value].base : "var(--atlas-paper)"), u = R(() => 100 * 2 ** Math.ceil(Math.log2(s.unitScale)));
    return (c, l) => (v(), f("g", cn, [
      r("defs", null, [
        r("pattern", {
          id: `${t}-grid`,
          patternUnits: "userSpaceOnUse",
          width: u.value,
          height: u.value
        }, [r("path", {
          d: `M${u.value} 0H0V${u.value}`,
          fill: "none",
          stroke: i.value === "vacuum" ? "#b8d4ed" : "#607b7c",
          "stroke-width": e.unitScale * 0.6,
          opacity: ".08"
        }, null, 8, hn)], 8, dn),
        r("pattern", {
          id: `${t}-unknown`,
          patternUnits: "userSpaceOnUse",
          width: e.unitScale * 14,
          height: e.unitScale * 14
        }, [r("circle", {
          cx: e.unitScale * 7,
          cy: e.unitScale * 7,
          r: e.unitScale * 0.55,
          fill: i.value === "vacuum" ? "#809bb6" : "#81938e",
          opacity: ".15"
        }, null, 8, fn)], 8, vn),
        r("mask", {
          id: `${t}-coverage`,
          maskUnits: "userSpaceOnUse",
          x: e.viewport[0],
          y: e.viewport[1],
          width: e.viewport[2],
          height: e.viewport[3],
          style: { "mask-type": "luminance" }
        }, [r("rect", {
          x: e.viewport[0],
          y: e.viewport[1],
          width: e.viewport[2],
          height: e.viewport[3],
          fill: "white"
        }, null, 8, mn), r("g", { "clip-path": e.projection.clip ? `url(#${t}-region)` : void 0 }, [(v(!0), f(K, null, ne(e.projection.features, (o) => (v(), f("path", {
          key: o.source.id,
          d: p(me)(o.geometry),
          fill: p(de)(o.geometry) ? "black" : "none",
          stroke: "black",
          "stroke-width": p(at)(o.geometry),
          "stroke-linecap": "round"
        }, null, 8, bn))), 128))], 8, yn)], 8, pn),
        e.projection.clip ? (v(), f("clipPath", {
          key: 0,
          id: `${t}-region`
        }, [r("path", { d: p(me)(e.projection.clip) }, null, 8, gn)], 8, kn)) : A("", !0)
      ]),
      r("rect", {
        x: e.viewport[0],
        y: e.viewport[1],
        width: e.viewport[2],
        height: e.viewport[3],
        fill: n.value
      }, null, 8, wn),
      r("rect", {
        x: e.viewport[0],
        y: e.viewport[1],
        width: e.viewport[2],
        height: e.viewport[3],
        fill: `url(#${t}-grid)`
      }, null, 8, Mn),
      r("rect", {
        x: e.viewport[0],
        y: e.viewport[1],
        width: e.viewport[2],
        height: e.viewport[3],
        fill: `url(#${t}-unknown)`,
        mask: `url(#${t}-coverage)`
      }, null, 8, $n)
    ]));
  }
}), _n = xn;
function xe(e) {
  return e.scale === "region";
}
function Sn(e) {
  return e.scale !== "world" && !xe(e);
}
function We(e, s) {
  const t = new Map(e.locations.map((u) => [u.key, u])), i = [];
  let n = t.get(s);
  for (; n; )
    i.unshift(n), n = n.parent ? t.get(n.parent) : void 0;
  return i;
}
function Ke(e, s) {
  return We(e, s).reverse().find(xe);
}
function An(e) {
  const s = /* @__PURE__ */ new Set(), t = e.actors.find((i) => i.actorKey === "player")?.locationKey;
  for (const i of e.locations)
    if (!(i.status !== "visited" && i.key !== t))
      for (const n of We(e, i.key)) s.add(n.key);
  return s;
}
function At(e, s, t) {
  const i = new Set(t.map((n) => n.key));
  return We(e, s).reverse().find((n) => i.has(n.key))?.key || "";
}
function Cn(e, s) {
  return e.links.flatMap((t) => {
    if (t.from !== s && t.to !== s) return [];
    const i = e.locations.find((n) => n.key === (t.from === s ? t.to : t.from));
    return i ? [{
      location: i,
      link: t,
      outgoing: t.bidirectional || t.from === s
    }] : [];
  });
}
var jn = ["id"], En = ["d"], Bn = ["clip-path"], In = [
  "d",
  "stroke-width",
  "marker-start",
  "marker-end"
], Pn = [
  "transform",
  "aria-label",
  "onClick",
  "onKeydown"
], On = { transform: "translate(-14 -20)" }, Rn = {
  y: "64",
  class: "map-place-name"
}, Hn = {
  key: 0,
  y: "89",
  class: "map-place-status"
}, Tn = {
  key: 1,
  y: "89",
  class: "map-place-status"
}, Ln = /* @__PURE__ */ ie({
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
  setup(e, { expose: s }) {
    const t = e, i = R(() => At(t.atlas, t.currentLocationKey, t.projection.scope.locations)), n = R(() => t.projection.nodes.find((h) => h.location.key === t.focusKey)), u = R(() => t.projection.nodes.find((h) => h.location.key === i.value)), c = "map-arrow-" + Ne(), l = X(null);
    s({
      zoom: (h) => l.value?.zoom(h),
      reset: () => l.value?.reset()
    });
    function o(h, a) {
      return h === "water" ? "water" : h === "forest" ? "tree" : h === "mountain" ? "mountain" : ["world", "region"].includes(a) ? "globe" : a === "outdoor" ? "compass" : "building";
    }
    return (h, a) => (v(), re(_t, {
      ref_key: "camera",
      ref: l,
      class: "map-atlas-viewport",
      controls: !1,
      "view-box": e.projection.viewBox,
      "atlas-insets": e.insets,
      "initial-overview": !e.projection.features.length,
      "initial-point": u.value ? [u.value.x, u.value.y] : void 0,
      "reset-key": `${e.projection.scope.kind}:${e.projection.scope.region?.key || ""}`,
      label: e.label,
      "focus-point": n.value ? [n.value.x, n.value.y] : void 0,
      "focus-sequence": e.focusSequence
    }, {
      default: Ye(({ unitScale: d, viewport: m }) => [
        q(_n, {
          projection: e.projection,
          viewport: m,
          "unit-scale": d
        }, null, 8, [
          "projection",
          "viewport",
          "unit-scale"
        ]),
        q(un, {
          projection: e.projection,
          viewport: m,
          "unit-scale": d
        }, null, 8, [
          "projection",
          "viewport",
          "unit-scale"
        ]),
        r("defs", null, [r("marker", {
          id: c,
          viewBox: "0 0 10 10",
          refX: "9",
          refY: "5",
          markerWidth: "5",
          markerHeight: "5",
          orient: "auto-start-reverse"
        }, [...a[0] || (a[0] = [r("path", {
          d: "M1 1l8 4-8 4z",
          fill: "var(--map-road-ink)"
        }, null, -1)])]), e.projection.clip ? (v(), f("clipPath", {
          key: 0,
          id: `${c}-clip`
        }, [r("path", { d: p(me)(e.projection.clip) }, null, 8, En)], 8, jn)) : A("", !0)]),
        r("g", {
          class: "map-world-roads",
          "aria-hidden": "true",
          "clip-path": e.projection.clip ? `url(#${c}-clip)` : void 0
        }, [(v(!0), f(K, null, ne(e.projection.routes, (w) => (v(), f("g", { key: w.link.id }, [r("path", {
          d: p(me)(w.feature.geometry),
          fill: "none",
          stroke: "var(--map-road-ink)",
          "stroke-width": d * 0.8,
          "marker-start": w.arrow === "start" ? `url(#${c})` : void 0,
          "marker-end": w.arrow === "end" ? `url(#${c})` : void 0
        }, null, 8, In)]))), 128))], 8, Bn),
        (v(!0), f(K, null, ne(e.projection.nodes, (w) => (v(), f("g", {
          key: w.location.key,
          class: ye(["map-place", {
            "is-selected": w.location.key === e.selectedLocationKey,
            "is-current": w.location.key === i.value,
            "is-unvisited": w.location.status !== "visited"
          }]),
          transform: `translate(${w.x} ${w.y}) scale(${d * 0.5})`,
          role: "button",
          tabindex: "0",
          "aria-label": p(Le).placeLabel(w.location.name),
          onClick: qe((C) => h.$emit("select", w.location.key), ["stop"]),
          onKeydown: [rt(qe((C) => h.$emit("select", w.location.key), ["stop"]), ["enter"]), rt(qe((C) => h.$emit("select", w.location.key), ["stop", "prevent"]), ["space"])]
        }, [
          a[1] || (a[1] = r("circle", {
            class: "map-pin-halo",
            r: "39"
          }, null, -1)),
          a[2] || (a[2] = r("path", {
            class: "map-pin-body",
            d: "M0 33C-6 25-26 8-26-6a26 26 0 0 1 52 0C26 8 6 25 0 33Z"
          }, null, -1)),
          r("g", On, [q(W, {
            name: o(w.location.terrain, w.location.scale),
            width: "28",
            height: "28"
          }, null, 8, ["name"])]),
          r("text", Rn, S(w.location.name.length > 14 ? w.location.name.slice(0, 13) + "…" : w.location.name), 1),
          w.location.key === i.value ? (v(), f("text", Hn, S(p(Le).current), 1)) : w.location.status !== "visited" ? (v(), f("text", Tn, S(p(Ve).unvisited), 1)) : A("", !0),
          r("title", null, S(w.location.name) + S(w.location.brief ? " · " + w.location.brief : ""), 1)
        ], 42, Pn))), 128))
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
}), Vn = Ln, Re;
async function Ct() {
  if (!Re) {
    const e = [
      "..",
      "..",
      "..",
      "libs",
      "material-symbols",
      "material-symbols-rounded.woff2"
    ].join("/"), s = new URL(e, import.meta.url);
    Re = new FontFace("Xiaobai Map Symbols", `url("${s.href}")`, {
      display: "block",
      weight: "400"
    }).load(), Re.catch(() => {
      Re = void 0;
    });
  }
  document.fonts.add(await Re);
}
var Nn = ["id"], Un = ["stop-color", "stop-opacity"], zn = ["stop-color", "stop-opacity"], qn = ["stop-color", "stop-opacity"], Kn = ["id"], Dn = ["fill", "fill-opacity"], Fn = {
  fill: "none",
  stroke: "var(--scene-shadow)",
  "stroke-width": ".65",
  opacity: ".24"
}, Yn = {
  key: 1,
  d: "M0 0H48V32H0ZM19 0V17M0 17H48M36 17V32M3 3h12m8 0h21"
}, Zn = {
  key: 2,
  d: "M0 0H48V32H0ZM24 0V32M0 16H48M12 4l5 4-5 4-5-4ZM36 20l5 4-5 4-5-4Z"
}, Wn = {
  key: 3,
  d: "M-3 3 8 11l17 2 9 10 18 3M27-3l-8 12 3 8-7 17",
  opacity: ".65"
}, Xn = {
  key: 4,
  d: "M3 8q6 3 13 0M25 25q7 2 17-1",
  stroke: "var(--scene-highlight)",
  "stroke-width": "1.3",
  opacity: "1"
}, Jn = {
  key: 5,
  d: "M5 32 37 0M12 32 44 0",
  stroke: "var(--scene-highlight)",
  "stroke-width": "2.2"
}, Qn = {
  key: 6,
  d: "M8 15l-2-4m2 4 3-3M36 26l-1-4m1 4 3-3"
}, Gn = {
  key: 7,
  d: "M5 8h1m20-2h2m-12 17h2m23-6h1m-5 12h2",
  "stroke-linecap": "round"
}, es = {
  key: 8,
  d: "M0 0H48V32H0M0 5H48M0 27H48M5 5v1m38-1v1m-38 20v1m38-1v1"
}, ts = {
  key: 9,
  d: "M0 5H48M0 13H48M0 21H48M0 29H48M4 0v32m8-32v32m8-32v32m8-32v32m8-32v32m8-32v32",
  opacity: ".55"
}, as = {
  key: 10,
  d: "m24 5 8 11-8 11-8-11ZM24 10v12M20 16h8"
}, ns = {
  key: 11,
  d: "M7 8q12-5 16 6t20 7M4 27l6-3"
}, ss = {
  key: 12,
  d: "M5 19q5-3 11-1M29 8q6-2 12 1",
  stroke: "var(--scene-highlight)",
  "stroke-width": "1.4"
}, is = {
  key: 0,
  d: "M0 1H48",
  stroke: "var(--scene-highlight)",
  "stroke-width": ".7",
  opacity: ".35"
}, os = ["id"], ls = ["id"], rs = ["transform", "fill"], us = /* @__PURE__ */ ie({
  __name: "SceneMaterials",
  props: { prefix: {} },
  setup(e) {
    return (s, t) => (v(), f("defs", null, [
      (v(!0), f(K, null, ne(p(gt), (i) => (v(), f(K, { key: i }, [r("linearGradient", {
        id: `${e.prefix}-face-${i}`,
        x1: "0",
        y1: "0",
        x2: ".7",
        y2: "1"
      }, [
        r("stop", {
          offset: "0",
          "stop-color": `color-mix(in srgb, ${p(He)(i)}, var(--scene-highlight) 24%)`,
          "stop-opacity": i === "glass" ? 0.35 : 1
        }, null, 8, Un),
        r("stop", {
          offset: ".52",
          "stop-color": p(He)(i),
          "stop-opacity": i === "glass" ? 0.16 : 1
        }, null, 8, zn),
        r("stop", {
          offset: "1",
          "stop-color": `color-mix(in srgb, ${p(He)(i)}, var(--scene-shadow) 16%)`,
          "stop-opacity": i === "glass" ? 0.28 : 1
        }, null, 8, qn)
      ], 8, Nn), r("pattern", {
        id: `${e.prefix}-material-${i}`,
        width: "48",
        height: "32",
        patternUnits: "userSpaceOnUse",
        class: "scene-texture"
      }, [
        r("rect", {
          width: "48",
          height: "32",
          fill: p(He)(i),
          "fill-opacity": i === "glass" ? 0.4 : 1
        }, null, 8, Dn),
        r("g", Fn, [i === "wood" ? (v(), f(K, { key: 0 }, [t[0] || (t[0] = r("path", { d: "M0 0H48M0 16H48M19 0V16M37 16V32" }, null, -1)), t[1] || (t[1] = r("path", {
          d: "M3 7Q12 4 26 8T47 7M2 26q10-4 25 0t23-1",
          opacity: ".5"
        }, null, -1))], 64)) : i === "stone" ? (v(), f("path", Yn)) : i === "tile" ? (v(), f("path", Zn)) : i === "marble" ? (v(), f("path", Wn)) : i === "water" ? (v(), f("path", Xn)) : i === "glass" ? (v(), f("path", Jn)) : i === "grass" || i === "forest" ? (v(), f("path", Qn)) : i === "dirt" || i === "sand" ? (v(), f("path", Gn)) : i === "metal" ? (v(), f("path", es)) : [
          "carpet",
          "fabric",
          "bed-sheet",
          "tatami"
        ].includes(i) ? (v(), f("path", ts)) : i === "rune" ? (v(), f("path", as)) : i === "blood" ? (v(), f("path", ns)) : i === "snow" ? (v(), f("path", ss)) : A("", !0)]),
        i === "wood" || i === "stone" || i === "metal" ? (v(), f("path", is)) : A("", !0)
      ], 8, Kn)], 64))), 128)),
      r("radialGradient", {
        id: `${e.prefix}-crown-face`,
        cx: ".32",
        cy: ".25",
        r: ".8"
      }, [...t[2] || (t[2] = [
        r("stop", {
          offset: "0",
          "stop-color": "var(--scene-leaf-light)"
        }, null, -1),
        r("stop", {
          offset: ".6",
          "stop-color": "var(--scene-leaf)"
        }, null, -1),
        r("stop", {
          offset: "1",
          "stop-color": "var(--scene-leaf-dark)"
        }, null, -1)
      ])], 8, os),
      (v(), f(K, null, ne(3, (i) => r("symbol", {
        id: `${e.prefix}-crown-${i - 1}`,
        key: i,
        viewBox: "0 0 100 100"
      }, [r("g", {
        transform: `rotate(${i * 37} 50 50)`,
        fill: `url(#${e.prefix}-crown-face)`,
        stroke: "var(--scene-leaf-dark)",
        "stroke-width": ".6"
      }, [...t[3] || (t[3] = [
        r("path", { d: "M49 5Q65 2 73 16Q91 14 93 36Q99 46 90 59Q95 76 76 81Q68 96 50 91Q30 97 23 82Q5 79 9 60Q-1 45 9 34Q7 17 28 16Q33 1 49 5Z" }, null, -1),
        r("circle", {
          cx: "34",
          cy: "32",
          r: "21"
        }, null, -1),
        r("circle", {
          cx: "69",
          cy: "36",
          r: "22"
        }, null, -1),
        r("circle", {
          cx: "30",
          cy: "62",
          r: "20"
        }, null, -1),
        r("circle", {
          cx: "64",
          cy: "67",
          r: "23"
        }, null, -1),
        r("circle", {
          cx: "49",
          cy: "48",
          r: "24"
        }, null, -1),
        r("path", {
          d: "M24 25q8-10 19-5M61 21q11-3 17 8M36 45q9-11 21-8M63 59q9-2 14 6",
          fill: "none",
          stroke: "var(--scene-leaf-light)",
          "stroke-width": "1.4",
          opacity: ".75"
        }, null, -1)
      ])], 8, rs)], 8, ls)), 64))
    ]));
  }
}), cs = us, ds = [
  "x",
  "y",
  "width",
  "height"
], hs = {
  key: 0,
  cx: "50",
  cy: "50",
  r: "50"
}, vs = {
  key: 1,
  width: "100",
  height: "100"
}, fs = ["clip-path", "fill"], ps = {
  key: 0,
  cx: "50",
  cy: "50",
  r: "49",
  class: "scene-object-edge"
}, ms = {
  key: 1,
  x: "1",
  y: "1",
  width: "98",
  height: "98",
  rx: "2",
  class: "scene-object-edge"
}, ys = ["fill"], bs = ["fill"], ks = ["d"], gs = {
  key: 0,
  d: "M9 78H91",
  class: "scene-object-seam"
}, ws = ["x"], Ms = /* @__PURE__ */ ie({
  __name: "SceneObject",
  props: {
    element: {},
    prefix: {},
    unitScale: {}
  },
  setup(e) {
    const s = e, t = R(() => wt(s.element)), i = R(() => Math.min(t.value.width, t.value.height) / s.unitScale >= 12), n = R(() => s.element.shape === "circle"), u = R(() => s.element.material), c = R(() => ta(u.value, s.prefix)), l = R(() => qt(u.value, s.prefix)), o = `scene-object-${Ne()}`;
    return (h, a) => (v(), f("svg", {
      x: t.value.x,
      y: t.value.y,
      width: t.value.width,
      height: t.value.height,
      viewBox: "0 0 100 100",
      preserveAspectRatio: "none",
      class: "scene-object"
    }, [r("defs", null, [r("clipPath", { id: o }, [n.value ? (v(), f("circle", hs)) : (v(), f("rect", vs))])]), r("g", {
      "clip-path": `url(#${o})`,
      fill: c.value
    }, [n.value ? (v(), f("circle", ps)) : (v(), f("rect", ms)), i.value ? (v(), f(K, { key: 2 }, [n.value ? (v(), f("circle", {
      key: 0,
      cx: "50",
      cy: "50",
      r: "44",
      fill: l.value,
      class: "scene-object-inset"
    }, null, 8, ys)) : (v(), f("rect", {
      key: 1,
      x: "5",
      y: "5",
      width: "90",
      height: "90",
      rx: "2",
      fill: l.value,
      class: "scene-object-inset"
    }, null, 8, bs)), e.element.icon === "table" || e.element.icon === "counter" ? (v(), f(K, { key: 2 }, [r("path", {
      d: n.value ? "M18 36A35 35 0 0 1 72 22" : "M8 13V8H92",
      class: "scene-object-shine"
    }, null, 8, ks), e.element.icon === "counter" ? (v(), f("path", gs)) : A("", !0)], 64)) : e.element.icon === "chair" ? (v(), f(K, { key: 3 }, [
      a[0] || (a[0] = r("rect", {
        x: "12",
        y: "29",
        width: "76",
        height: "61",
        rx: "9",
        class: "scene-object-inset"
      }, null, -1)),
      a[1] || (a[1] = r("rect", {
        x: "7",
        y: "5",
        width: "86",
        height: "23",
        rx: "6",
        class: "scene-object-edge"
      }, null, -1)),
      a[2] || (a[2] = r("path", {
        d: "M16 12H84",
        class: "scene-object-shine"
      }, null, -1))
    ], 64)) : e.element.icon === "bed" ? (v(), f(K, { key: 4 }, [
      a[3] || (a[3] = r("rect", {
        x: "10",
        y: "12",
        width: "80",
        height: "79",
        rx: "5",
        class: "scene-object-inset"
      }, null, -1)),
      a[4] || (a[4] = r("rect", {
        x: "20",
        y: "17",
        width: "60",
        height: "20",
        rx: "7",
        class: "scene-object-inset"
      }, null, -1)),
      a[5] || (a[5] = r("path", {
        d: "M12 45H88M17 82H83",
        class: "scene-object-seam"
      }, null, -1)),
      a[6] || (a[6] = r("path", {
        d: "M18 49H82",
        class: "scene-object-shine"
      }, null, -1))
    ], 64)) : e.element.icon === "shelf" ? (v(), f(K, { key: 5 }, [a[7] || (a[7] = r("path", {
      d: "M8 32H92M8 66H92M40 8V32M65 32V66M35 66V92",
      class: "scene-object-seam"
    }, null, -1)), a[8] || (a[8] = r("path", {
      d: "M8 34H92M8 68H92",
      class: "scene-object-shine"
    }, null, -1))], 64)) : e.element.icon === "sofa" ? (v(), f(K, { key: 6 }, [
      a[9] || (a[9] = r("rect", {
        x: "8",
        y: "5",
        width: "84",
        height: "25",
        rx: "7",
        class: "scene-object-inset"
      }, null, -1)),
      (v(), f(K, null, ne(3, (d) => r("rect", {
        key: d,
        x: 15 + (d - 1) * 24,
        y: "32",
        width: "22",
        height: "57",
        rx: "5",
        class: "scene-object-inset"
      }, null, 8, ws)), 64)),
      a[10] || (a[10] = r("rect", {
        x: "3",
        y: "23",
        width: "11",
        height: "70",
        rx: "4",
        class: "scene-object-inset"
      }, null, -1)),
      a[11] || (a[11] = r("rect", {
        x: "86",
        y: "23",
        width: "11",
        height: "70",
        rx: "4",
        class: "scene-object-inset"
      }, null, -1))
    ], 64)) : e.element.icon === "bridge" ? (v(), f(K, { key: 7 }, [a[12] || (a[12] = r("path", {
      d: "M7 7V93M93 7V93M9 20H91M9 35H91M9 50H91M9 65H91M9 80H91",
      class: "scene-object-seam"
    }, null, -1)), a[13] || (a[13] = r("path", {
      d: "M11 7V93M89 7V93",
      class: "scene-object-shine"
    }, null, -1))], 64)) : e.element.icon === "tree" ? (v(), f(K, { key: 8 }, [a[14] || (a[14] = Pt('<circle cx="34" cy="32" r="24" class="scene-object-inset"></circle><circle cx="69" cy="36" r="24" class="scene-object-inset"></circle><circle cx="30" cy="62" r="23" class="scene-object-inset"></circle><circle cx="64" cy="67" r="25" class="scene-object-inset"></circle><circle cx="49" cy="48" r="26" class="scene-object-inset"></circle><path d="M21 24q10-10 22-4M36 41q8-9 22-6M64 56q8-1 13 5" class="scene-object-shine"></path>', 6))], 64)) : e.element.icon === "rock" ? (v(), f(K, { key: 9 }, [a[15] || (a[15] = r("path", {
      d: "M8 38 33 12 76 18 93 57 71 88 25 86ZM33 12 41 44 8 38M41 44 76 18M41 44 71 88M41 44 93 57",
      class: "scene-object-seam"
    }, null, -1)), a[16] || (a[16] = r("path", {
      d: "M12 38 33 17 72 22",
      class: "scene-object-shine"
    }, null, -1))], 64)) : A("", !0)], 64)) : A("", !0)], 8, fs)], 8, ds));
  }
}), $s = Ms, xs = ["data-element", "opacity"], _s = ["transform"], Ss = ["d"], As = ["d", "stroke-width"], Cs = [
  "d",
  "fill",
  "stroke",
  "stroke-width",
  "stroke-dasharray",
  "stroke-linecap"
], js = [
  "d",
  "stroke",
  "stroke-opacity",
  "stroke-dasharray"
], Es = ["transform"], Bs = ["id"], Is = ["d"], Ps = ["clip-path"], Os = [
  "href",
  "x",
  "y",
  "width",
  "height"
], Rs = ["transform"], Hs = {
  key: 0,
  r: "19",
  class: "scene-player-halo"
}, Ts = ["stroke"], Ls = {
  key: 1,
  class: "map-material-symbol",
  "aria-hidden": "true"
}, Vs = {
  key: 2,
  class: "map-symbol-fallback",
  "aria-hidden": "true"
}, Ns = ["x", "y"], Us = /* @__PURE__ */ ie({
  __name: "MapScene",
  props: { scene: {} },
  setup(e) {
    const s = e, t = X(!1);
    Ue(() => {
      Ct().then(() => {
        t.value = !0;
      }).catch(() => {
        t.value = !1;
      });
    });
    const i = `xiaobai-map-scene-${Ne()}`, n = R(() => $t[s.scene.mood || "neutral"]), u = R(() => Qt(s.scene.elements)), c = R(() => Jt(s.scene.elements).map((l, o) => ({
      element: l,
      bounds: wt(l),
      path: Yt(l),
      transform: Ft(l),
      area: Wt(l),
      presentation: zt(l, i),
      clipId: `${i}-area-${o}`,
      object: Dt(l) && !ct(l),
      marker: ct(l) && l.shape !== "label"
    })));
    return (l, o) => (v(), re(_t, {
      class: "map-scene-viewport",
      style: Te({ "--scene-glow": n.value.glow }),
      "view-box": e.scene.viewBox,
      "reset-key": e.scene.key,
      label: `${e.scene.name} 场景地图`
    }, {
      default: Ye(({ unitScale: h }) => [
        q(cs, { prefix: i }),
        (v(!0), f(K, null, ne(c.value, (a) => (v(), f("g", {
          key: a.element.id,
          class: ye(["map-scene-element", [`is-${a.element.category}`, `is-${a.element.certainty || "confirmed"}`]]),
          "data-element": a.element.id,
          opacity: a.presentation.opacity
        }, [r("g", { transform: a.transform }, [
          a.object ? (v(), re($s, {
            key: 0,
            element: a.element,
            prefix: i,
            "unit-scale": h
          }, null, 8, ["element", "unit-scale"])) : a.path ? (v(), f(K, { key: 1 }, [
            a.element.category === "wall" ? (v(), f("path", {
              key: 0,
              d: a.path,
              fill: "none",
              stroke: "var(--scene-shadow)",
              "stroke-width": "9",
              opacity: ".18",
              "stroke-linejoin": "round",
              "vector-effect": "non-scaling-stroke"
            }, null, 8, Ss)) : A("", !0),
            a.element.category === "road" && !a.area ? (v(), f("path", {
              key: 1,
              d: a.path,
              fill: "none",
              stroke: "var(--scene-soft-edge)",
              "stroke-width": a.presentation.width + 2,
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "vector-effect": "non-scaling-stroke"
            }, null, 8, As)) : A("", !0),
            r("path", {
              d: a.path,
              fill: a.presentation.fill,
              stroke: a.presentation.stroke,
              "stroke-width": a.presentation.width,
              "stroke-dasharray": a.presentation.dash,
              "stroke-linejoin": "round",
              "stroke-linecap": a.element.category === "wall" ? "butt" : "round",
              "fill-rule": "evenodd",
              "vector-effect": "non-scaling-stroke"
            }, null, 8, Cs),
            a.element.category === "wall" ? (v(), f("path", {
              key: 2,
              d: a.path,
              fill: "none",
              stroke: a.element.material ? p(He)(a.element.material) : "var(--scene-wall)",
              "stroke-width": "3.5",
              "stroke-opacity": a.element.material === "glass" ? 0.4 : 1,
              "stroke-dasharray": a.presentation.dash,
              "stroke-linejoin": "round",
              "vector-effect": "non-scaling-stroke"
            }, null, 8, js)) : A("", !0)
          ], 64)) : A("", !0),
          a.object && !p(Kt)(a.element) && Math.min(a.bounds.width, a.bounds.height) / h >= 12 ? (v(), f("g", {
            key: 2,
            transform: `translate(${a.bounds.x + a.bounds.width / 2} ${a.bounds.y + a.bounds.height / 2})`,
            "aria-hidden": "true"
          }, [r("text", {
            class: ye(t.value ? "map-material-symbol" : "map-symbol-fallback"),
            style: Te({
              fontSize: `${Math.min(22 * h, Math.min(a.bounds.width, a.bounds.height) * 0.65)}px`,
              fill: "var(--scene-edge)",
              textAnchor: "middle",
              dominantBaseline: "central"
            })
          }, S(t.value ? a.presentation.icon : a.presentation.fallback), 7)], 8, Es)) : A("", !0),
          u.value.has(a.element.id) ? (v(), f(K, { key: 3 }, [r("defs", null, [r("clipPath", { id: a.clipId }, [r("path", {
            d: a.path,
            "clip-rule": "evenodd"
          }, null, 8, Is)], 8, Bs)]), r("g", {
            "clip-path": `url(#${a.clipId})`,
            class: "scene-forest-decoration",
            "aria-hidden": "true"
          }, [(v(!0), f(K, null, ne(u.value.get(a.element.id), (d, m) => (v(), f("use", {
            key: m,
            href: `#${i}-crown-${d.variant}`,
            x: d.x - d.size / 2,
            y: d.y - d.size / 2,
            width: d.size,
            height: d.size
          }, null, 8, Os))), 128))], 8, Ps)], 64)) : A("", !0)
        ], 8, _s), a.marker ? (v(), f("g", {
          key: 0,
          class: "map-scene-icon",
          transform: `translate(${a.bounds.x + a.bounds.width / 2} ${a.bounds.y + a.bounds.height / 2}) scale(${h})`
        }, [
          a.element.actorKey === "player" || a.element.kind === "player" ? (v(), f("circle", Hs)) : A("", !0),
          r("circle", {
            r: "11",
            stroke: a.presentation.stroke
          }, null, 8, Ts),
          t.value ? (v(), f("text", Ls, S(a.presentation.icon), 1)) : (v(), f("text", Vs, S(a.presentation.fallback), 1))
        ], 8, Rs)) : A("", !0)], 10, xs))), 128)),
        r("g", {
          class: "scene-labels",
          style: Te({ "--scene-unit-scale": h })
        }, [(v(!0), f(K, null, ne(c.value, (a) => (v(), f(K, { key: a.element.id }, [a.element.label ? (v(), f("text", {
          key: 0,
          class: ye(["map-scene-label", { "is-primary": a.element.shape === "label" }]),
          x: p(ut)(a.element, h)[0],
          y: p(ut)(a.element, h)[1]
        }, S(a.element.label), 11, Ns)) : A("", !0)], 64))), 128))], 4)
      ]),
      _: 1
    }, 8, [
      "style",
      "view-box",
      "reset-key",
      "label"
    ]));
  }
}), zs = Us, qs = {
  key: 0,
  class: "map-3d-loading",
  role: "status"
}, Ks = {
  class: "map-viewport-controls",
  "aria-label": "三维视角"
}, Ds = /* @__PURE__ */ ie({
  __name: "MapScene3D",
  props: {
    scene: {},
    lowWalls: { type: Boolean },
    showLabels: { type: Boolean }
  },
  emits: ["fallback"],
  setup(e, { emit: s }) {
    const t = e, i = s, n = X(null), u = X(null), c = X(!0);
    let l, o = !1;
    return Ue(async () => {
      o = !0;
      try {
        const { createThreeRuntime: h } = await import("./xiaobai-os-three-runtime-IAUx_Pqi.js");
        if (!o) return;
        l = h(n.value, u.value, { fallback: (a) => i("fallback", a) }), l.setScene(t.scene), l.walls(t.lowWalls), l.labels(t.showLabels), c.value = !1, Ct().then(() => {
          o && l?.symbols(!0);
        }).catch(() => {
        });
      } catch {
        o && i("fallback", "当前设备无法打开三维，已切换二维。");
      }
    }), ge(() => t.scene, (h) => l?.setScene(h)), ge(() => t.lowWalls, (h) => l?.walls(h)), ge(() => t.showLabels, (h) => l?.labels(h)), Fe(() => {
      o = !1, l?.dispose(), l = void 0;
    }), (h, a) => (v(), f("div", {
      ref_key: "host",
      ref: n,
      class: "map-scene-three",
      style: Te({ "--scene-glow": p($t)[e.scene.mood || "neutral"].glow })
    }, [
      r("div", {
        ref_key: "labelHost",
        ref: u,
        class: "map-3d-labels"
      }, null, 512),
      c.value ? (v(), f("div", qs, "正在打开三维…")) : A("", !0),
      r("div", Ks, [
        r("button", {
          type: "button",
          "aria-label": "放大三维",
          onClick: a[0] || (a[0] = (d) => p(l)?.zoom(1.2))
        }, "+"),
        r("button", {
          type: "button",
          "aria-label": "缩小三维",
          onClick: a[1] || (a[1] = (d) => p(l)?.zoom(1 / 1.2))
        }, "−"),
        r("button", {
          type: "button",
          class: "map-fit",
          "aria-label": "重置三维视角",
          onClick: a[2] || (a[2] = (d) => p(l)?.fit())
        }, "全图")
      ])
    ], 4));
  }
}), Fs = Ds, Ys = ["aria-label"], Zs = { class: "map-scene-toolbar" }, Ws = {
  class: "map-render-switch",
  role: "group",
  "aria-label": "场景显示方式"
}, Xs = ["aria-pressed"], Js = ["aria-pressed", "disabled"], Qs = ["aria-pressed"], Gs = ["aria-pressed"], ei = { class: "map-scene-stage" }, ti = /* @__PURE__ */ ie({
  __name: "MapSceneView",
  props: {
    scene: {},
    mode: {},
    threeUnavailable: { type: Boolean }
  },
  emits: ["update:mode", "fallback"],
  setup(e, { emit: s }) {
    const t = s, i = X(!1), n = X(!0);
    return (u, c) => (v(), f("section", {
      class: "map-scene-view",
      "aria-label": e.scene.name
    }, [r("div", Zs, [
      r("div", Ws, [r("button", {
        type: "button",
        "aria-pressed": e.mode === "2d",
        onClick: c[0] || (c[0] = (l) => t("update:mode", "2d"))
      }, "二维", 8, Xs), r("button", {
        type: "button",
        "aria-pressed": e.mode === "3d",
        disabled: e.threeUnavailable,
        onClick: c[1] || (c[1] = (l) => t("update:mode", "3d"))
      }, "三维", 8, Js)]),
      e.mode === "3d" ? (v(), f("button", {
        key: 0,
        type: "button",
        "aria-pressed": i.value,
        onClick: c[2] || (c[2] = (l) => i.value = !i.value)
      }, "低墙", 8, Qs)) : A("", !0),
      e.mode === "3d" ? (v(), f("button", {
        key: 1,
        type: "button",
        "aria-pressed": n.value,
        onClick: c[3] || (c[3] = (l) => n.value = !n.value)
      }, "名称", 8, Gs)) : A("", !0)
    ]), r("div", ei, [nt(q(zs, { scene: e.scene }, null, 8, ["scene"]), [[yt, e.mode === "2d"]]), e.mode === "3d" ? (v(), re(Fs, {
      key: 0,
      scene: e.scene,
      "low-walls": i.value,
      "show-labels": n.value,
      onFallback: c[4] || (c[4] = (l) => t("fallback", l))
    }, null, 8, [
      "scene",
      "low-walls",
      "show-labels"
    ])) : A("", !0)])], 8, Ys));
  }
}), ai = ti;
function ni(e) {
  const s = e?.atlas.actors.find((i) => i.actorKey === "player"), t = e?.atlas.locations.find((i) => i.key === s?.locationKey);
  return t?.sceneKey && e?.scenes[t.sceneKey]?.status === "active" ? "scene" : "world";
}
var si = { class: "map-dialog-header" }, ii = { key: 0 }, oi = { class: "map-settings-content" }, li = { class: "map-auto-setting" }, ri = ["aria-checked", "disabled"], ui = { class: "map-settings-section" }, ci = ["disabled"], di = { key: 0 }, hi = { class: "map-settings-section" }, vi = { key: 0 }, fi = ["disabled"], pi = {
  key: 0,
  class: "map-setting-note",
  role: "status"
}, mi = ["disabled"], yi = /* @__PURE__ */ ie({
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
    return (s, t) => (v(), re(bt, {
      class: "map-dialog map-settings",
      "aria-labelledby": "map-settings-title",
      onClose: t[5] || (t[5] = (i) => s.$emit("close"))
    }, {
      default: Ye(() => [
        r("header", si, [t[6] || (t[6] = r("div", null, [r("small", null, "让地图跟上你的故事"), r("h2", { id: "map-settings-title" }, "地图设置")], -1)), r("button", {
          type: "button",
          class: "map-round-button",
          "aria-label": "关闭地图设置",
          onClick: t[0] || (t[0] = (i) => s.$emit("close"))
        }, [q(W, { name: "close" })])]),
        e.status || e.notice || e.maintenanceMessage ? (v(), f("section", {
          key: 0,
          class: ye(["map-settings-feedback", { "is-error": e.notice ? e.noticeError : e.maintenanceError }]),
          role: "status"
        }, [r("strong", null, S(e.notice ? e.notice === e.maintenanceMessage ? "最近一次更新" : "操作提示" : e.status || "最近一次更新"), 1), e.notice || e.maintenanceMessage ? (v(), f("p", ii, S(e.notice || e.maintenanceMessage), 1)) : A("", !0)], 2)) : A("", !0),
        r("div", oi, [
          r("section", li, [t[8] || (t[8] = r("div", null, [r("h3", null, "随对话自动更新"), r("p", null, "你发送下一条消息时，根据上一轮对话更新地图。适用于所有普通聊天。")], -1)), r("button", {
            type: "button",
            class: "map-switch",
            role: "switch",
            "aria-checked": e.autoMaintenance,
            "aria-label": "随对话自动更新",
            disabled: e.autoToggleBusy,
            onClick: t[1] || (t[1] = (i) => s.$emit("setAuto", !e.autoMaintenance))
          }, [...t[7] || (t[7] = [r("span", null, null, -1)])], 8, ri)]),
          r("section", ui, [
            q(W, { name: "refresh" }),
            t[9] || (t[9] = r("h3", null, "补充最近的变化", -1)),
            t[10] || (t[10] = r("p", null, "根据最近一轮对话更新位置和地点，并补全当前区域尚缺少的探索去处。", -1)),
            r("button", {
              type: "button",
              class: "map-primary-button",
              disabled: e.busy || !!e.disabledReason || !e.hasMap,
              onClick: t[2] || (t[2] = (i) => s.$emit("update"))
            }, S(e.busy ? e.status || "请稍候…" : "更新地图"), 9, ci),
            e.hasMap ? A("", !0) : (v(), f("small", di, "请先建立世界地图"))
          ]),
          r("section", hi, [
            q(W, { name: "globe" }),
            r("h3", null, S(e.hasMap ? "重新绘制世界" : "建立世界地图"), 1),
            t[11] || (t[11] = r("p", null, "依据角色与世界设定建立地图；设定未写明的地方，会合理补全。结合当前聊天保留已发生的故事。", -1)),
            e.hasMap ? (v(), f("p", vi, "新地图保存成功后替换原图；失败时保留原图。")) : A("", !0),
            r("button", {
              type: "button",
              class: "map-secondary-button",
              disabled: e.busy || !!e.disabledReason,
              onClick: t[3] || (t[3] = (i) => s.$emit("rebuild"))
            }, S(e.busy ? e.status || "请稍候…" : e.hasMap ? "重新绘制" : "绘制世界地图"), 9, fi)
          ]),
          e.disabledReason ? (v(), f("p", pi, S(e.disabledReason), 1)) : A("", !0),
          r("button", {
            type: "button",
            class: "map-sync-button",
            disabled: e.busy || e.refreshDisabled,
            onClick: t[4] || (t[4] = (i) => s.$emit("refresh"))
          }, [q(W, { name: "refresh" }), t[12] || (t[12] = se("重新加载地图", -1))], 8, mi),
          t[13] || (t[13] = r("p", { class: "map-setting-note" }, "只加载已保存的地图，不会重新绘制。绘制或更新时可以离开此页面。", -1))
        ])
      ]),
      _: 1
    }));
  }
}), bi = yi;
function ki(e, s, t) {
  const i = s.trim().toLocaleLowerCase();
  return e.locations.filter((n) => [n.name, n.brief].some((u) => u?.toLocaleLowerCase().includes(i)) && (t === "all" || (t === "visited" ? n.status === "visited" : n.status !== "visited")));
}
var gi = { class: "map-search-input" }, wi = ["aria-label", "placeholder"], Mi = { class: "map-search-scope" }, $i = ["aria-label"], xi = ["aria-pressed", "onClick"], _i = { class: "map-search-results" }, Si = ["onClick"], Ai = { class: "map-result-icon" }, Ci = { key: 0 }, ji = {
  key: 0,
  class: "map-search-empty"
}, Ei = /* @__PURE__ */ ie({
  __name: "MapSearch",
  props: {
    scope: {},
    title: {},
    initialFilter: {}
  },
  emits: ["close", "select"],
  setup(e) {
    const s = e, t = X(""), i = X(s.initialFilter), n = R(() => kt[s.scope.kind]), u = R(() => [
      {
        id: "all",
        name: n.value.all
      },
      {
        id: "unvisited",
        name: Ve.unvisited
      },
      {
        id: "visited",
        name: Ve.visited
      }
    ]), c = R(() => ki(s.scope, t.value, i.value));
    return (l, o) => (v(), re(bt, {
      class: "map-dialog map-search-dialog",
      "aria-label": n.value.search,
      onClose: o[2] || (o[2] = (h) => l.$emit("close"))
    }, {
      default: Ye(() => [
        r("header", gi, [
          q(W, { name: "search" }),
          nt(r("input", {
            "onUpdate:modelValue": o[0] || (o[0] = (h) => t.value = h),
            type: "search",
            "aria-label": n.value.search,
            placeholder: n.value.search,
            autofocus: ""
          }, null, 8, wi), [[Ot, t.value]]),
          r("button", {
            type: "button",
            onClick: o[1] || (o[1] = (h) => l.$emit("close"))
          }, S(p(te).cancel), 1)
        ]),
        r("h2", Mi, S(e.title), 1),
        r("nav", {
          class: "map-search-filters",
          "aria-label": p(te).filters
        }, [(v(!0), f(K, null, ne(u.value, (h) => (v(), f("button", {
          key: h.id,
          type: "button",
          "aria-pressed": i.value === h.id,
          onClick: (a) => i.value = h.id
        }, S(h.name), 9, xi))), 128))], 8, $i),
        r("div", _i, [
          r("small", null, S(p(Tt)(e.scope.kind, c.value.length)), 1),
          (v(!0), f(K, null, ne(c.value, (h) => (v(), f("button", {
            key: h.key,
            type: "button",
            class: "map-search-result",
            onClick: (a) => l.$emit("select", h.key)
          }, [
            r("span", Ai, [q(W, { name: e.scope.kind === "world" ? "globe" : "pin" }, null, 8, ["name"])]),
            r("span", null, [
              r("strong", null, S(h.name), 1),
              r("small", null, S(p(Mt)[h.scale]) + " · " + S(p(Ve)[h.status === "visited" ? "visited" : "unvisited"]), 1),
              h.brief ? (v(), f("p", Ci, S(h.brief), 1)) : A("", !0)
            ]),
            q(W, { name: "next" })
          ], 8, Si))), 128)),
          c.value.length ? A("", !0) : (v(), f("div", ji, [
            q(W, { name: "search" }),
            r("h3", null, S(n.value.notFound), 1),
            r("p", null, S(p(te).searchHint), 1)
          ]))
        ])
      ]),
      _: 1
    }, 8, ["aria-label"]));
  }
}), Bi = Ei, Ii = {
  class: "map-place-detail",
  "aria-labelledby": "map-place-title"
}, Pi = { id: "map-place-title" }, Oi = { class: "map-place-content" }, Ri = ["data-position-status"], Hi = {
  key: 1,
  class: "map-place-full-name"
}, Ti = {
  key: 2,
  class: "map-address"
}, Li = { class: "map-place-intro" }, Vi = { class: "map-place-actions" }, Ni = {
  key: 3,
  class: "map-detail-section"
}, Ui = { class: "map-people" }, zi = {
  key: 4,
  class: "map-detail-section"
}, qi = ["onClick"], Ki = /* @__PURE__ */ ie({
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
    const s = e, t = R(() => We(s.map.atlas, s.location.key).slice(0, -1)), i = R(() => xe(s.location)), n = R(() => s.map.atlas.actors.filter((c) => c.locationKey === s.location.key)), u = R(() => Cn(s.map.atlas, s.location.key));
    return (c, l) => (v(), f("section", Ii, [
      l[6] || (l[6] = r("div", {
        class: "map-sheet-grip",
        "aria-hidden": "true"
      }, null, -1)),
      r("header", null, [r("div", null, [r("small", null, S(p(Mt)[e.location.scale]) + " · " + S(e.currentKey === e.location.key ? "当前位置" : p(Ve)[e.location.status === "visited" ? "visited" : "unvisited"]), 1), r("h2", Pi, S(e.location.name), 1)]), r("button", {
        type: "button",
        class: "map-round-button",
        "aria-label": "关闭地点详情",
        onClick: l[0] || (l[0] = (o) => c.$emit("close"))
      }, [q(W, { name: "close" })])]),
      r("div", Oi, [
        e.unlocated ? (v(), f("p", {
          key: 0,
          class: "map-position-note",
          "data-position-status": e.unlocated
        }, [q(W, { name: "pin" }), se(S(p(Zt)[e.unlocated]), 1)], 8, Ri)) : A("", !0),
        e.location.name.length > 24 ? (v(), f("p", Hi, S(e.location.name), 1)) : A("", !0),
        t.value.length ? (v(), f("p", Ti, [q(W, { name: "pin" }), se(S(t.value.map((o) => o.name).join(" · ")), 1)])) : A("", !0),
        r("p", Li, S(e.location.brief || "这个地点已记录在世界地图上，更多介绍等待故事展开。"), 1),
        r("div", Vi, [i.value ? (v(), f("button", {
          key: 0,
          type: "button",
          class: "map-primary-button",
          onClick: l[1] || (l[1] = (o) => c.$emit("explore"))
        }, [q(W, { name: "compass" }), se(S(p(te).regionMap), 1)])) : (v(), f("button", {
          key: 1,
          type: "button",
          class: "map-secondary-button",
          onClick: l[2] || (l[2] = (o) => c.$emit("scene"))
        }, [q(W, { name: "layers" }), se(S(p(te).sceneMap), 1)]))]),
        n.value.length ? (v(), f("section", Ni, [l[3] || (l[3] = r("h3", null, "记录在这里的人物", -1)), r("p", Ui, [(v(!0), f(K, null, ne(n.value, (o) => (v(), f("span", { key: o.actorKey }, [q(W, { name: "person" }), se(S(o.displayName), 1)]))), 128))])])) : A("", !0),
        u.value.length ? (v(), f("section", zi, [l[4] || (l[4] = r("h3", null, "相连的地方", -1)), (v(!0), f(K, null, ne(u.value, (o) => (v(), f("button", {
          key: o.link.id,
          type: "button",
          class: "map-connection",
          onClick: (h) => c.$emit("select", o.location.key)
        }, [
          q(W, { name: "route" }),
          r("span", null, [r("strong", null, S(o.location.name), 1), r("small", null, S(o.link.label || p(Xt)[o.link.kind]) + S(o.link.bidirectional ? "" : o.outgoing ? " · 单向前往" : " · 仅可从对面到达"), 1)]),
          q(W, { name: "next" })
        ], 8, qi))), 128))])) : A("", !0),
        l[5] || (l[5] = r("p", { class: "map-detail-footnote" }, "查看地图不会改变你在故事中的位置", -1))
      ])
    ]));
  }
}), Di = Ki;
function Fi(e, s) {
  const t = s === null ? void 0 : e.locations.find((u) => u.key === s && xe(u)), i = An(e), n = (s === null ? e.locations.filter(xe) : t ? e.locations.filter((u) => Sn(u) && Ke(e, u.key)?.key === t.key) : []).map((u) => i.has(u.key) ? {
    ...u,
    status: "visited"
  } : u);
  return {
    kind: s === null ? "world" : "region",
    region: t,
    locations: n,
    unvisited: n.filter((u) => u.status !== "visited").length,
    frame: t ? pa(t.key) : s === null ? Ze : ""
  };
}
function Yi(e, s) {
  const t = e.frames.find((m) => m.id === s.frame), i = ma(e.frames), n = t?.boundary ? e.features.find((m) => m.id === t.boundary)?.geometry : void 0, u = [], c = [], l = [];
  for (const m of s.locations) {
    const w = m.position, C = w && i(w.frame, s.frame);
    if (!w || !C) {
      c.push({
        location: m,
        reason: w ? "mapping_unknown" : "position_unknown"
      });
      continue;
    }
    const [P, U] = De(w.at, C);
    if (n && !$e([P, U], n)) {
      c.push({
        location: m,
        reason: "outside_map"
      });
      continue;
    }
    u.push({
      location: m,
      x: P,
      y: U
    });
  }
  for (const m of e.features) {
    if (m.role === "boundary" || s.kind === "region" && m.frame !== s.frame && !n) continue;
    const w = i(m.frame, s.frame);
    if (!w) continue;
    const C = ya(m.geometry, w), P = ga(C, n);
    if (!P) continue;
    const U = m.destination ? e.locations.find((V) => V.key === m.destination)?.name || "" : m.name || "";
    l.push({
      source: m,
      geometry: C,
      mapping: w,
      bounds: P,
      label: U
    });
  }
  u.sort((m, w) => m.location.key.localeCompare(w.location.key)), l.sort((m, w) => m.source.id.localeCompare(w.source.id));
  const o = new Map(u.map((m) => [m.location.key, m])), h = e.links.flatMap((m) => {
    const w = l.find((T) => T.source.id === m.feature), C = o.get(m.from), P = o.get(m.to);
    if (!w || !C || !P) return [];
    const U = he(w.geometry), V = U[0], Z = U[U.length - 1], F = (T, L) => Math.hypot(T[0] - L.x, T[1] - L.y) < 1e-6, J = m.bidirectional ? void 0 : F(V, C) && F(Z, P) ? "end" : F(V, P) && F(Z, C) ? "start" : void 0;
    return [{
      link: m,
      feature: w,
      from: C,
      to: P,
      ...J ? { arrow: J } : {}
    }];
  }), a = [...l.map((m) => m.bounds), ...u.map((m) => [
    m.x,
    m.y,
    0,
    0
  ])];
  let d = [
    0,
    0,
    800,
    600
  ];
  if (a.length) {
    const m = Math.min(...a.map((V) => V[0])), w = Math.min(...a.map((V) => V[1])), C = Math.max(...a.map((V) => V[0] + V[2])) - m, P = Math.max(...a.map((V) => V[1] + V[3])) - w, U = Math.max(12, Math.max(C, P) * 0.08);
    d = [
      m - U,
      w - U,
      Math.max(C + U * 2, 120),
      Math.max(P + U * 2, 120)
    ];
  }
  return {
    scope: s,
    nodes: u,
    unlocated: c,
    features: l,
    routes: h,
    clip: n,
    viewBox: d,
    drawable: !!a.length
  };
}
var zo = new Set(Nt), qo = new Set(Gt), Ko = new Set(Ht), Do = new Set(Ut), Fo = new Set(gt), Yo = new Set(ea);
function Zi() {
  return {
    schemaVersion: 2,
    revision: 0,
    atlas: {
      locations: [],
      links: [],
      actors: [],
      frames: [{ id: Ze }],
      features: []
    },
    scenes: {}
  };
}
function je(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}
function ft(e) {
  return e.maintenanceStatus === "maintaining" || e.maintenanceStatus === "rebuilding";
}
function Wi(e) {
  const s = X(structuredClone(mt(e.initialState))), t = X(null), i = X(""), n = X(!1);
  let u = !1, c = 0, l = 0, o = () => {
  };
  const h = R(() => s.value.status === "unconfirmed" || s.value.writeState === "unconfirmed"), a = R(() => t.value !== null || ["loading", "saving"].includes(s.value.status) || ["maintaining", "rebuilding"].includes(s.value.maintenanceStatus || "")), d = R(() => a.value ? "正在更新地图，请稍候" : h.value ? "请先检查上一次是否保存成功" : s.value.status === "conflict" ? "存档有变化，请先选择要保留的版本" : s.value.status !== "ready" ? s.value.message || "地图暂时不可更新" : s.value.chatIdentity ? "" : "请先打开一个聊天"), m = R(() => s.value.maintenanceStatus === "rebuilding" || t.value === "rebuild" ? "正在绘制世界…" : s.value.maintenanceStatus === "maintaining" || t.value === "maintain" ? "正在更新地图…" : t.value === "confirm" ? "正在检查保存…" : a.value ? "请稍候…" : ""), w = R(() => s.value.message || i.value), C = R(() => s.value.message ? [
    "blocked",
    "error",
    "conflict",
    "unconfirmed"
  ].includes(s.value.status) : n.value);
  function P(Z) {
    const F = ft(s.value);
    s.value = structuredClone(Z), ft(Z) ? (i.value = "", n.value = !1) : F && (i.value = Z.maintenanceMessage || "", n.value = Z.maintenanceStatus === "error");
  }
  function U(Z, F) {
    const J = Z instanceof Error ? Z.message : String(Z);
    return J.includes("聊天已切换") ? "聊天已切换，请重新打开地图。" : J === "host_request_timeout" ? "暂时没收到结果，地图可能还在更新。请稍后查看，不要再次更新。" : F === "confirm" ? "仍无法确认保存结果，请稍后再试。" : F === "adopt" ? "已保存版本暂时加载不了，当前修改还在，请稍后重试。" : F === "settings" ? "设置未能保存，请重试。" : "地图操作未完成，请稍后重试。";
  }
  async function V(Z, F, J = {}) {
    if (t.value) return;
    const T = ++c, L = l, O = s.value.chatIdentity;
    t.value = F, i.value = "", n.value = !1;
    try {
      const b = await e.bridge.request(Z, {
        chatIdentity: O,
        ...J
      }, 35e3);
      if (!u || T !== c || s.value.chatIdentity !== O) return;
      const g = je(b) ? b.result : void 0, x = je(g) && je(g.state) ? g.state : g;
      L === l && je(x) && x.chatIdentity === O && P(x), (F === "maintain" || F === "rebuild") && je(g) && typeof g.message == "string" && g.message && (i.value = g.message), F === "refresh" && s.value.status === "ready" && (i.value = "已加载保存的地图。"), F === "settings" && (i.value = s.value.autoMaintenance ? "自动更新已开启。" : "自动更新已关闭。"), F === "confirm" && s.value.status === "ready" && (i.value = "已确认保存成功。"), F === "adopt" && je(g) && g.adoption === "adopted" && (i.value = "已使用当前聊天里保存的 OS 存档。");
    } catch (b) {
      u && T === c && s.value.chatIdentity === O && (i.value = U(b, F), n.value = !0);
    } finally {
      u && T === c && (t.value = null);
    }
  }
  return Ue(() => {
    u = !0, o = e.bridge.subscribe((Z) => {
      if (Z.type === "map/state") {
        const F = Z.payload.state;
        if (F.chatIdentity !== s.value.chatIdentity) return;
        l += 1, P(F);
      } else Z.type === "map/error" && (l += 1, n.value = !0, i.value = Z.payload.message || "地图暂时无法读取，请重新打开。");
    });
  }), Fe(() => {
    u = !1, c += 1, o();
  }), {
    state: s,
    activeRequest: t,
    busy: a,
    disabledReason: d,
    requiresConfirmation: h,
    status: m,
    notice: w,
    isError: C,
    dismissNotice: () => {
      i.value = "", n.value = !1;
    },
    refresh: () => {
      if (!a.value && !h.value) return V("map/refresh", "refresh");
    },
    confirmSave: () => {
      if (!a.value) return V("map/confirm-save", "confirm");
    },
    adopt: () => {
      if (!a.value) return V("map/adopt-server-state", "adopt");
    },
    setAuto: (Z) => V("map/set-auto-maintenance", "settings", { enabled: Z }),
    update: () => {
      if (!d.value && s.value.map) return V("map/maintain-once", "maintain");
    },
    rebuild: () => {
      if (!d.value) return V("map/rebuild", "rebuild");
    }
  };
}
function Xi(e, s, t) {
  const i = X([
    170,
    20,
    100,
    20
  ]);
  let n;
  const u = () => {
    const l = e.value?.getBoundingClientRect();
    if (!l?.height) return;
    const o = t.value?.getBoundingClientRect(), h = o && o.left >= l.left + l.width / 2;
    i.value = [
      Math.max(0, (s.value?.getBoundingClientRect().bottom || l.top) - l.top) + 16,
      h ? l.right - o.left + 16 : 20,
      o && !h ? l.bottom - o.top + 16 : 20,
      20
    ];
  }, c = () => {
    n?.disconnect();
    for (const l of [
      e.value,
      s.value,
      t.value
    ]) l && n?.observe(l);
    u();
  };
  return Ue(() => {
    n = new ResizeObserver(u), c();
  }), ge([s, t], c, { flush: "post" }), Fe(() => n?.disconnect()), {
    insets: i,
    measure: u
  };
}
var Ji = { class: "map-search-bar" }, Qi = ["disabled"], Gi = {
  key: 1,
  class: "map-search-entry"
}, eo = {
  key: 0,
  class: "map-view-row"
}, to = ["aria-label"], ao = ["aria-pressed"], no = ["aria-pressed"], so = ["aria-pressed"], io = {
  key: 0,
  class: "map-scene-tools"
}, oo = ["aria-expanded"], lo = ["aria-label"], ro = ["aria-current"], uo = { "aria-current": "page" }, co = {
  key: 2,
  class: "map-progress",
  role: "status"
}, ho = {
  key: 3,
  class: "map-notice",
  role: "status"
}, vo = ["disabled"], fo = ["disabled"], po = ["disabled"], mo = {
  key: 1,
  class: "map-empty"
}, yo = ["disabled"], bo = {
  key: 0,
  class: "map-setting-note"
}, ko = {
  key: 2,
  class: "map-empty"
}, go = ["disabled"], wo = {
  key: 1,
  class: "map-empty map-first-map"
}, Mo = { class: "map-empty-art" }, $o = ["disabled"], xo = {
  key: 1,
  class: "map-setting-note"
}, _o = {
  key: 0,
  class: "map-key"
}, So = ["aria-label"], Ao = { class: "map-region-icon" }, Co = {
  id: "map-browse-summary",
  class: "map-region-summary"
}, jo = {
  class: "map-round-button",
  "aria-hidden": "true"
}, Eo = { class: "map-atlas-toolbar" }, Bo = { class: "map-floating-tools" }, Io = ["disabled"], Po = ["aria-expanded"], Oo = {
  key: 2,
  class: "map-scene-caption"
}, Ro = /* @__PURE__ */ ie({
  __name: "MapApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const s = e, t = X(null), i = X(null), n = X(null), u = X(null), { insets: c, measure: l } = Xi(t, i, n), { state: o, activeRequest: h, busy: a, disabledReason: d, requiresConfirmation: m, status: w, notice: C, isError: P, dismissNotice: U, refresh: V, confirmSave: Z, adopt: F, setAuto: J, update: T, rebuild: L } = Wi(s), O = X(""), b = () => ni(o.value.map) === "scene" ? {
      kind: "scene",
      key: ""
    } : { kind: "world" }, g = X(b()), x = X("3d"), M = X(!1), B = X("");
    let y = !1;
    const $ = R(() => g.value.kind === "scene"), k = R(() => g.value.kind === "scene" ? g.value.key : ""), I = X(""), j = X(0), z = X(!1), N = X(null), D = X(!1), E = R(() => o.value.map?.atlas), Q = R(() => E.value?.actors.find((Y) => Y.actorKey === "player")?.locationKey || ""), ee = R(() => E.value?.locations.find((Y) => Y.key === Q.value)), ae = R(() => E.value?.locations.find((Y) => Y.key === (k.value || Q.value))), ve = R(() => $.value && ae.value?.sceneKey ? o.value.map?.scenes[ae.value.sceneKey] : void 0), oe = R(() => {
      if (!E.value || g.value.kind === "world") return;
      const Y = g.value.key || Q.value;
      return Ke(E.value, Y);
    }), ue = Zi().atlas, le = R(() => !!(E.value && (E.value.locations.length || E.value.features.length))), G = R(() => Fi(E.value || ue, g.value.kind === "world" ? null : oe.value?.key || "")), fe = R(() => Yi(E.value || ue, G.value)), _e = R(() => fe.value.unlocated.find((Y) => Y.location.key === O.value)?.reason), ce = R(() => G.value.locations.find((Y) => Y.key === O.value)), pe = R(() => G.value.kind === "world" ? ke.world : oe.value?.name || te.unknownRegion), Se = R(() => kt[G.value.kind]), lt = R(() => G.value.unvisited ? "unvisited" : "all");
    ge(() => o.value, (Y, _) => {
      const H = Y.chatIdentity !== _.chatIdentity;
      (H || !Y.map?.atlas.locations.some((Je) => Je.key === O.value)) && (O.value = ""), H && (y = !1);
      const we = g.value.kind === "world" ? "" : g.value.key, Bt = we && !Y.map?.atlas.locations.some((Je) => Je.key === we);
      (H || !_.map?.atlas.locations.length && Y.map?.atlas.locations.length && !y || Bt) && (g.value = b()), H && (z.value = !1, N.value = null, D.value = !1);
    }), ge(G, (Y, _) => {
      Y.locations.some((H) => H.key === O.value) || (O.value = ""), (Y.kind !== _.kind || Y.region?.key !== _.region?.key || !E.value) && (O.value = "", N.value = null, D.value = !1);
    });
    function Xe(Y) {
      y = !0, g.value = Y, O.value = "", N.value = null, D.value = !1;
    }
    function Ae(Y = "") {
      Xe({
        kind: "region",
        key: Y
      });
    }
    async function Ie(Y, _ = !1) {
      const H = E.value?.locations.find((we) => we.key === Y);
      if (H) {
        if (y = !0, _ && E.value) {
          if (xe(H)) Ce();
          else {
            const we = Ke(E.value, Y);
            if (!we) {
              Pe(Y);
              return;
            }
            Ae(we.key);
          }
          await Qe();
        }
        O.value = Y, N.value = null, D.value = !1, await Qe(), l(), I.value = E.value ? At(E.value, Y, G.value.locations) : Y, j.value += 1;
      }
    }
    async function jt() {
      if (!(!ee.value || !E.value)) {
        if (xe(ee.value)) {
          await Ie(ee.value.key, !0);
          return;
        }
        if (!Ke(E.value, ee.value.key)) {
          Pe();
          return;
        }
        Ae(), await Qe(), await Ie(ee.value.key);
      }
    }
    function Pe(Y = "") {
      Xe({
        kind: "scene",
        key: Y === Q.value ? "" : Y
      });
    }
    function Ce() {
      Xe({ kind: "world" });
    }
    function Et(Y) {
      M.value || (M.value = !0, x.value = "2d", B.value = Y);
    }
    return Rt(() => D.value ? (D.value = !1, !0) : $.value ? (Ae(k.value && oe.value?.key || ""), !0) : O.value ? (O.value = "", !0) : g.value.kind === "region" ? (Ce(), !0) : !1), (Y, _) => (v(), f("main", {
      ref_key: "mapElement",
      ref: t,
      class: ye(["map-app", {
        "has-view-switch": le.value,
        "is-scene-view": $.value,
        "is-atlas-view": le.value && !$.value
      }])
    }, [
      r("div", {
        ref_key: "topElement",
        ref: i,
        class: "map-top"
      }, [
        r("header", Ji, [
          q(W, { name: $.value ? "layers" : "search" }, null, 8, ["name"]),
          $.value ? (v(), f("div", Gi, [se(S(ae.value?.name || p(ke).scene), 1), r("small", null, S(k.value ? p(te).sceneBrowsing : p(te).sceneCurrent), 1)])) : (v(), f("button", {
            key: 0,
            type: "button",
            class: "map-search-entry",
            disabled: !E.value?.locations.length,
            onClick: _[0] || (_[0] = (H) => N.value = "all")
          }, [se(S(Se.value.search), 1), r("small", null, S(pe.value), 1)], 8, Qi)),
          r("button", {
            type: "button",
            class: "map-round-button",
            "aria-label": "地图设置",
            onClick: _[1] || (_[1] = (H) => z.value = !0)
          }, [q(W, { name: "more" })])
        ]),
        le.value ? (v(), f("div", eo, [r("nav", {
          class: "map-view-switch",
          "aria-label": p(te).viewLabel
        }, [
          r("button", {
            type: "button",
            "aria-pressed": g.value.kind === "world",
            onClick: Ce
          }, [q(W, { name: "globe" }), se(S(p(ke).world), 1)], 8, ao),
          r("button", {
            type: "button",
            "aria-pressed": g.value.kind === "region",
            onClick: _[2] || (_[2] = (H) => Ae())
          }, [q(W, { name: "compass" }), se(S(p(ke).region), 1)], 8, no),
          r("button", {
            type: "button",
            "aria-pressed": $.value,
            onClick: _[3] || (_[3] = (H) => Pe())
          }, [q(W, { name: "layers" }), se(S(p(ke).scene), 1)], 8, so)
        ], 8, to), $.value ? (v(), f("div", io, [k.value ? (v(), f("button", {
          key: 0,
          type: "button",
          class: "map-round-button",
          "aria-label": "回到当前场景",
          onClick: _[4] || (_[4] = (H) => Pe())
        }, [q(W, { name: "locate" })])) : A("", !0), r("button", {
          type: "button",
          class: "map-round-button",
          "aria-expanded": D.value,
          "aria-label": "地图图例",
          onClick: _[5] || (_[5] = (H) => D.value = !D.value)
        }, [q(W, { name: "layers" })], 8, oo)])) : A("", !0)])) : A("", !0),
        le.value && !$.value ? (v(), f("nav", {
          key: 1,
          class: "map-region-trail",
          "aria-label": p(te).trailLabel
        }, [r("button", {
          type: "button",
          "aria-current": g.value.kind === "world" ? "page" : void 0,
          onClick: Ce
        }, [q(W, { name: "globe" }), se(S(p(ke).world), 1)], 8, ro), g.value.kind === "region" ? (v(), f(K, { key: 0 }, [q(W, { name: "next" }), r("span", uo, S(pe.value), 1)], 64)) : A("", !0)], 8, lo)) : A("", !0),
        p(w) ? (v(), f("div", co, [_[28] || (_[28] = r("span", null, null, -1)), se(S(p(w)), 1)])) : A("", !0),
        B.value ? (v(), f("aside", ho, [r("p", null, S(B.value), 1), r("button", {
          type: "button",
          class: "map-notice-close",
          "aria-label": "关闭三维提示",
          onClick: _[6] || (_[6] = (H) => B.value = "")
        }, [q(W, { name: "close" })])])) : A("", !0),
        p(C) || p(m) || p(o).status === "conflict" ? (v(), f("aside", {
          key: 4,
          class: ye(["map-notice", { "is-error": p(P) }]),
          role: "status"
        }, [r("p", null, S(p(C) || (p(m) ? "还不确定是否保存成功，请先检查保存。" : "服务器上的存档与当前内容不同。")), 1), p(m) ? (v(), f("button", {
          key: 0,
          type: "button",
          disabled: p(a),
          onClick: _[7] || (_[7] = (...H) => p(Z) && p(Z)(...H))
        }, "检查保存", 8, vo)) : p(o).status === "conflict" ? (v(), f(K, { key: 1 }, [_[29] || (_[29] = r("small", null, "恢复会放弃尚未保存的更改，并使用当前聊天已保存的 OS 数据（不只是地图）。", -1)), r("button", {
          type: "button",
          disabled: p(a),
          onClick: _[8] || (_[8] = (...H) => p(F) && p(F)(...H))
        }, "放弃未保存更改并恢复", 8, fo)], 64)) : p(o).status === "error" || p(o).status === "blocked" ? (v(), f("button", {
          key: 2,
          type: "button",
          disabled: p(a),
          onClick: _[9] || (_[9] = (...H) => p(V) && p(V)(...H))
        }, "重新加载", 8, po)) : (v(), f("button", {
          key: 3,
          type: "button",
          class: "map-notice-close",
          "aria-label": "关闭地图提示",
          onClick: _[10] || (_[10] = (...H) => p(U) && p(U)(...H))
        }, [q(W, { name: "close" })]))], 2)) : A("", !0)
      ], 512),
      r("div", { class: ye(["map-canvas", { "has-detail": ce.value && !$.value }]) }, [p(o).map && le.value ? (v(), f(K, { key: 0 }, [
        fe.value.drawable ? nt((v(), re(Vn, {
          key: 0,
          ref_key: "atlasElement",
          ref: u,
          atlas: p(o).map.atlas,
          projection: fe.value,
          label: pe.value,
          insets: p(c),
          "current-location-key": Q.value,
          "selected-location-key": O.value,
          "focus-key": I.value,
          "focus-sequence": j.value,
          onSelect: _[11] || (_[11] = (H) => Ie(H))
        }, null, 8, [
          "atlas",
          "projection",
          "label",
          "insets",
          "current-location-key",
          "selected-location-key",
          "focus-key",
          "focus-sequence"
        ])), [[yt, !$.value]]) : A("", !0),
        $.value ? (v(), f(K, { key: 1 }, [ve.value?.status === "active" ? (v(), re(ai, {
          key: 0,
          mode: x.value,
          "onUpdate:mode": _[12] || (_[12] = (H) => x.value = H),
          scene: ve.value,
          "three-unavailable": M.value,
          onFallback: Et
        }, null, 8, [
          "mode",
          "scene",
          "three-unavailable"
        ])) : (v(), f("div", mo, [
          q(W, { name: "layers" }),
          r("h2", null, S(ae.value ? p(te).sceneEmpty : p(te).unknownLocation), 1),
          k.value && k.value !== Q.value ? (v(), f("button", {
            key: 0,
            type: "button",
            class: "map-secondary-button",
            onClick: _[13] || (_[13] = (H) => oe.value ? Ae(oe.value.key) : Ce())
          }, S(oe.value ? p(te).regionMap : p(ke).world), 1)) : (v(), f(K, { key: 1 }, [
            r("p", null, S(ae.value ? p(te).sceneUpdateHint : p(te).locationUpdateHint), 1),
            r("button", {
              type: "button",
              class: "map-secondary-button",
              disabled: !!p(d),
              onClick: _[14] || (_[14] = (...H) => p(T) && p(T)(...H))
            }, S(p(a) ? p(te).updating : p(te).update), 9, yo),
            p(d) && !p(a) ? (v(), f("p", bo, S(p(d)), 1)) : A("", !0)
          ], 64))
        ]))], 64)) : A("", !0),
        !$.value && !fe.value.drawable ? (v(), f("div", ko, [
          q(W, { name: "pin" }),
          r("h2", null, S(g.value.kind === "region" && !oe.value ? p(te).unknownRegion : G.value.locations.length ? p(Le).empty : Se.value.empty), 1),
          r("p", null, S(g.value.kind === "region" && !oe.value ? p(te).unknownRegionHint : G.value.locations.length ? p(Le).emptyHint : Se.value.emptyHint), 1),
          g.value.kind === "region" ? (v(), f("button", {
            key: 0,
            type: "button",
            class: "map-secondary-button",
            onClick: Ce
          }, S(p(ke).world), 1)) : (v(), f("button", {
            key: 1,
            type: "button",
            class: "map-secondary-button",
            disabled: !!p(d),
            onClick: _[15] || (_[15] = (...H) => p(T) && p(T)(...H))
          }, S(p(a) ? p(te).updating : p(te).update), 9, go))
        ])) : A("", !0)
      ], 64)) : (v(), f("div", wo, [
        r("span", Mo, [q(W, { name: "globe" })]),
        _[30] || (_[30] = r("small", null, "故事之外，还有一整个世界", -1)),
        r("h1", null, S(p(o).status === "loading" ? "正在打开地图…" : "下一站，去哪里？"), 1),
        _[31] || (_[31] = r("p", null, [
          se("把世界设定画成地图，"),
          r("br"),
          se("也为留白的地方添上值得探索的去处。")
        ], -1)),
        p(o).status !== "loading" ? (v(), f("button", {
          key: 0,
          type: "button",
          class: "map-primary-button",
          disabled: !!p(d),
          onClick: _[16] || (_[16] = (...H) => p(L) && p(L)(...H))
        }, S(p(a) ? p(w) || "正在准备…" : "绘制世界地图"), 9, $o)) : A("", !0),
        p(d) && !p(a) ? (v(), f("p", xo, S(p(d)), 1)) : A("", !0)
      ]))], 2),
      D.value ? (v(), f("aside", _o, [
        _[32] || (_[32] = r("strong", null, "读懂这张地图", -1)),
        _[33] || (_[33] = r("p", null, [
          r("i", { class: "map-key-current" }),
          se("你在这里 "),
          r("i", { class: "map-key-place" }),
          se("可探索地点")
        ], -1)),
        r("p", null, S(p(Le).legend), 1),
        r("small", null, S(p(te).legend), 1)
      ])) : A("", !0),
      le.value && !$.value ? (v(), f("div", {
        key: 1,
        ref_key: "bottomElement",
        ref: n,
        class: ye(["map-atlas-bottom", { "has-detail": ce.value }])
      }, [ce.value && p(o).map ? (v(), re(Di, {
        key: ce.value.key,
        location: ce.value,
        map: p(o).map,
        "current-key": Q.value,
        unlocated: _e.value,
        onClose: _[17] || (_[17] = (H) => O.value = ""),
        onScene: _[18] || (_[18] = (H) => Pe(ce.value.key)),
        onExplore: _[19] || (_[19] = (H) => Ae(ce.value.key)),
        onSelect: _[20] || (_[20] = (H) => Ie(H, !0))
      }, null, 8, [
        "location",
        "map",
        "current-key",
        "unlocated"
      ])) : (v(), f("button", {
        key: 1,
        type: "button",
        class: "map-region-card",
        "aria-label": p(Vt)(G.value.kind, lt.value),
        "aria-describedby": "map-browse-summary",
        onClick: _[21] || (_[21] = (H) => N.value = lt.value)
      }, [
        r("span", Ao, [q(W, { name: G.value.kind === "world" ? "globe" : "compass" }, null, 8, ["name"])]),
        r("span", Co, [r("strong", null, S(pe.value), 1), r("small", null, S(p(Lt)(G.value.kind, G.value.locations.length, G.value.unvisited)), 1)]),
        r("span", jo, [q(W, { name: "next" })])
      ], 8, So)), r("div", Eo, [fe.value.drawable ? (v(), re(xt, {
        key: 0,
        onZoom: _[22] || (_[22] = (H) => u.value?.zoom(H)),
        onReset: _[23] || (_[23] = (H) => u.value?.reset())
      })) : A("", !0), r("div", Bo, [r("button", {
        type: "button",
        class: "map-round-button",
        disabled: !ee.value,
        "aria-label": "回到我的位置",
        onClick: jt
      }, [q(W, { name: "locate" })], 8, Io), r("button", {
        type: "button",
        class: "map-round-button",
        "aria-expanded": D.value,
        "aria-label": "地图图例",
        onClick: _[24] || (_[24] = (H) => D.value = !D.value)
      }, [q(W, { name: "layers" })], 8, Po)])])], 2)) : A("", !0),
      $.value && E.value?.locations.length ? (v(), f("footer", Oo, [q(W, { name: "layers" }), r("span", null, [r("strong", null, S(ae.value?.name || "当前位置待确认"), 1), r("small", null, S(k.value ? "正在查看场景图 · 不会移动人物" : "当前位置的场景图"), 1)])])) : A("", !0),
      N.value && E.value ? (v(), re(Bi, {
        key: 3,
        scope: G.value,
        title: pe.value,
        "initial-filter": N.value,
        onClose: _[25] || (_[25] = (H) => N.value = null),
        onSelect: _[26] || (_[26] = (H) => Ie(H))
      }, null, 8, [
        "scope",
        "title",
        "initial-filter"
      ])) : A("", !0),
      z.value ? (v(), re(bi, {
        key: 4,
        "auto-maintenance": p(o).autoMaintenance,
        busy: p(a),
        "refresh-disabled": p(m),
        "auto-toggle-busy": p(h) !== null,
        "disabled-reason": p(d),
        "has-map": !!p(o).map,
        status: p(w),
        "maintenance-message": p(o).maintenanceMessage || "",
        "maintenance-error": p(o).maintenanceStatus === "error",
        notice: p(C),
        "notice-error": p(P),
        onClose: _[27] || (_[27] = (H) => z.value = !1),
        onSetAuto: p(J),
        onUpdate: p(T),
        onRebuild: p(L),
        onRefresh: p(V)
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
      ])) : A("", !0)
    ], 2));
  }
}), Zo = Ro;
export {
  Zo as default
};
