/* eslint-disable */
import { A as l, B as me, E as ye, F as fe, G as Ke, J as pe, K as c, L as te, M as T, N as Re, O as re, T as Te, U as E, Y as h, _ as Ve, b as L, c as Me, f as w, g as o, h as f, l as oe, m as Z, o as Le, p as e, q as U, s as Ce, u as A, v as R, y as $, z as ue } from "./xiaobai-os-runtime-dom.esm-bundler-ASdQr4iS.js";
import { n as Oe } from "./xiaobai-os-app-navigation-DrBJz_Kq.js";
import { t as Se } from "./xiaobai-os-AppDialog-CV8GB57a.js";
import { _ as ze, a as Ne, c as Qe, d as $e, g as se, i as je, l as De, m as Ze, n as Ue, o as We, p as Ye, r as Ae, s as Fe, u as Be, v as Xe } from "./xiaobai-os-map-presentation-D954V1Aq.js";
var Ge = { class: "map-viewport" }, Je = ["viewBox", "aria-label"], et = {
  class: "map-viewport-controls",
  "aria-label": "地图缩放"
}, tt = /* @__PURE__ */ L({
  __name: "MapViewport",
  props: {
    viewBox: {},
    resetKey: { default: "" },
    label: {},
    focusPoint: { default: void 0 },
    focusSequence: { default: 0 }
  },
  setup(s) {
    const n = s, i = E(null), a = E([...n.viewBox]), v = E([0, 0]), k = w(() => v.value[0] && v.value[1] ? Math.max(a.value[2] / v.value[0], a.value[3] / v.value[1]) : 1);
    let m;
    re(() => {
      m = new ResizeObserver((y) => {
        const M = y[0].contentRect;
        v.value = [M.width, M.height];
      }), i.value && m.observe(i.value);
    });
    const r = /* @__PURE__ */ new Map();
    let p = null, d = [0, 0], t = 0, g = null, I = !1, V = !1, O = null;
    const Y = w(() => a.value.join(" "));
    function q() {
      a.value = [...n.viewBox];
    }
    function H() {
      return k.value;
    }
    function C(y, M) {
      const x = i.value?.getBoundingClientRect();
      if (!x) return [a.value[0], a.value[1]];
      const S = H();
      return [a.value[0] + a.value[2] / 2 + (y - x.left - x.width / 2) * S, a.value[1] + a.value[3] / 2 + (M - x.top - x.height / 2) * S];
    }
    function B(y, M) {
      const x = Math.max(1, n.viewBox[2]), S = Math.min(x * 3, Math.max(Math.min(x * 0.24, 240), a.value[2] * y)), W = S / a.value[2], F = M || [a.value[0] + a.value[2] / 2, a.value[1] + a.value[3] / 2];
      a.value = [
        F[0] - (F[0] - a.value[0]) * W,
        F[1] - (F[1] - a.value[1]) * W,
        S,
        a.value[3] * W
      ];
    }
    function N() {
      if (!n.focusPoint) return;
      const y = Math.min(a.value[2], 620), M = a.value[3] * y / a.value[2];
      a.value = [
        n.focusPoint[0] - y / 2,
        n.focusPoint[1] - M / 2,
        y,
        M
      ];
    }
    function z() {
      const y = [...r.values()];
      y.length === 1 && (p = y[0], d = [a.value[0], a.value[1]]), y.length === 2 && (t = Math.hypot(y[1][0] - y[0][0], y[1][1] - y[0][1]), g = [(y[0][0] + y[1][0]) / 2, (y[0][1] + y[1][1]) / 2], I = !0);
    }
    function Q(y) {
      y.button !== 0 || r.size >= 2 || (r.size || (I = !1), r.set(y.pointerId, [y.clientX, y.clientY]), y.target.setPointerCapture(y.pointerId), z());
    }
    function P(y) {
      if (!r.has(y.pointerId)) return;
      r.set(y.pointerId, [y.clientX, y.clientY]);
      const M = [...r.values()];
      if (M.length === 2 && g) {
        const x = Math.hypot(M[1][0] - M[0][0], M[1][1] - M[0][1]), S = [(M[0][0] + M[1][0]) / 2, (M[0][1] + M[1][1]) / 2];
        x > 0 && t > 0 && B(t / x, C(...g)), a.value[0] -= (S[0] - g[0]) * H(), a.value[1] -= (S[1] - g[1]) * H(), t = x, g = S;
      } else if (p) {
        const x = y.clientX - p[0], S = y.clientY - p[1];
        Math.abs(x) + Math.abs(S) > 4 && (I = !0), a.value = [
          d[0] - x * H(),
          d[1] - S * H(),
          a.value[2],
          a.value[3]
        ];
      }
    }
    function D(y) {
      if (!r.delete(y.pointerId)) return;
      const M = y.target;
      M.hasPointerCapture(y.pointerId) && M.releasePointerCapture(y.pointerId), z(), r.size || (p = null, g = null), I && (V = !0, O && clearTimeout(O), O = setTimeout(() => {
        V = !1;
      }, 0));
    }
    function K(y) {
      V && (y.preventDefault(), y.stopPropagation());
    }
    return te(() => n.resetKey, q, { immediate: !0 }), te(() => n.focusSequence, N, { flush: "post" }), ye(() => {
      m?.disconnect(), O && clearTimeout(O);
    }), (y, M) => (l(), o("div", Ge, [(l(), o("svg", {
      ref_key: "svg",
      ref: i,
      class: "map-viewport-svg",
      viewBox: Y.value,
      preserveAspectRatio: "xMidYMid meet",
      role: "group",
      "aria-label": s.label,
      onWheel: M[0] || (M[0] = oe((x) => B(x.deltaY < 0 ? 0.84 : 1.19, C(x.clientX, x.clientY)), ["prevent"])),
      onPointerdown: Q,
      onPointermove: P,
      onPointerup: D,
      onPointercancel: D,
      onClickCapture: K
    }, [Re(y.$slots, "default", { unitScale: k.value })], 40, Je)), e("div", et, [
      e("button", {
        type: "button",
        "aria-label": "放大地图",
        onClick: M[1] || (M[1] = (x) => B(0.8))
      }, "+"),
      e("button", {
        type: "button",
        "aria-label": "缩小地图",
        onClick: M[2] || (M[2] = (x) => B(1.25))
      }, "−"),
      e("button", {
        type: "button",
        class: "map-fit",
        onClick: q
      }, "全图")
    ])]));
  }
}), Ee = tt, at = {
  class: "map-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.7",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, lt = ["d"], st = /* @__PURE__ */ L({
  __name: "MapIcon",
  props: { name: { default: "pin" } },
  setup(s) {
    const n = {
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
    return (i, a) => (l(), o("svg", at, [e("path", { d: n[s.name] || n.pin }, null, 8, lt)]));
  }
}), j = st;
function he(s, n) {
  const i = new Map(s.locations.map((k) => [k.key, k])), a = [];
  let v = i.get(n);
  for (; v; )
    a.unshift(v), v = v.parent ? i.get(v.parent) : void 0;
  return a;
}
function we(s) {
  const n = s.locations.filter((i) => !i.parent);
  return n.length === 1 && s.locations.some((i) => i.parent === n[0].key) ? n[0].key : "";
}
function ie(s, n, i) {
  return he(s, n).find((a) => (a.parent || "") === i)?.key || "";
}
function nt(s, n) {
  return s.links.flatMap((i) => {
    if (i.from !== n && i.to !== n) return [];
    const a = s.locations.find((v) => v.key === (i.from === n ? i.to : i.from));
    return a ? [{
      location: a,
      link: i,
      outgoing: i.bidirectional || i.from === n
    }] : [];
  });
}
function ot(s, n) {
  const i = s.locations.filter((d) => (d.parent || "") === n).sort((d, t) => d.key.localeCompare(t.key, "en")), a = i.filter((d) => d.position).map((d) => ({
    location: d,
    x: d.position[0],
    y: d.position[1],
    placed: !0
  }));
  let v = 0;
  for (const d of i.filter((t) => !t.position)) {
    let t, g;
    do {
      const I = v * 2.3999632297, V = 155 * Math.sqrt(v++);
      t = Math.round(500 + Math.cos(I) * V), g = Math.round(420 + Math.sin(I) * V);
    } while (a.some((I) => Math.hypot(I.x - t, I.y - g) < 160));
    a.push({
      location: d,
      x: t,
      y: g,
      placed: !1
    });
  }
  a.sort((d, t) => d.location.key.localeCompare(t.location.key, "en"));
  const k = new Map(a.map((d) => [d.location.key, d])), m = s.links.flatMap((d) => {
    const t = k.get(ie(s, d.from, n)), g = k.get(ie(s, d.to, n));
    if (!t || !g || t === g) return [];
    const I = (t.x + g.x) / 2, V = (t.y + g.y) / 2;
    return [{
      link: d,
      from: t,
      to: g,
      x: I,
      y: V,
      path: `M ${t.x} ${t.y} Q ${I + (g.y - t.y) * 0.12} ${V - (g.x - t.x) * 0.12} ${g.x} ${g.y}`
    }];
  }), r = a.length ? Math.min(...a.map((d) => d.x)) - 140 : 0, p = a.length ? Math.min(...a.map((d) => d.y)) - 150 : 0;
  return {
    nodes: a,
    routes: m,
    viewBox: [
      r,
      p,
      a.length ? Math.max(420, Math.max(...a.map((d) => d.x)) - r + 140) : 800,
      a.length ? Math.max(500, Math.max(...a.map((d) => d.y)) - p + 190) : 900
    ]
  };
}
var it = {
  class: "map-landscapes",
  "aria-hidden": "true"
}, rt = ["transform"], ut = {
  class: "map-world-roads",
  "aria-hidden": "true"
}, ct = ["d"], dt = ["d", "marker-end"], vt = ["x", "y"], pt = [
  "transform",
  "aria-label",
  "onClick",
  "onKeydown"
], mt = { transform: "translate(-14 -20)" }, yt = {
  y: "64",
  class: "map-place-name"
}, ft = {
  key: 0,
  y: "89",
  class: "map-place-status"
}, ht = {
  key: 1,
  y: "89",
  class: "map-place-status"
}, bt = /* @__PURE__ */ L({
  __name: "MapAtlas",
  props: {
    atlas: {},
    region: {},
    currentLocationKey: {},
    selectedLocationKey: {},
    focusKey: {},
    focusSequence: {}
  },
  emits: ["select"],
  setup(s) {
    const n = s, i = w(() => ot(n.atlas, n.region)), a = w(() => ie(n.atlas, n.currentLocationKey, n.region)), v = w(() => i.value.nodes.find((r) => r.location.key === n.focusKey)), k = "map-arrow-" + fe();
    function m(r, p) {
      return r === "water" ? "water" : r === "forest" ? "tree" : r === "mountain" ? "mountain" : ["world", "region"].includes(p) ? "globe" : p === "outdoor" ? "compass" : "building";
    }
    return (r, p) => (l(), Z(Ee, {
      "view-box": i.value.viewBox,
      "reset-key": s.region,
      label: "世界地图",
      "focus-point": v.value ? [v.value.x, v.value.y] : void 0,
      "focus-sequence": s.focusSequence
    }, {
      default: ue(({ unitScale: d }) => [
        e("defs", null, [e("marker", {
          id: k,
          viewBox: "0 0 10 10",
          refX: "16",
          refY: "5",
          markerWidth: "5",
          markerHeight: "5",
          orient: "auto"
        }, [...p[0] || (p[0] = [e("path", {
          d: "M1 1l8 4-8 4z",
          fill: "var(--map-road-ink)"
        }, null, -1)])])]),
        e("g", it, [(l(!0), o(A, null, T(i.value.nodes, (t) => (l(), o("g", {
          key: t.location.key,
          transform: `translate(${t.x} ${t.y})`,
          class: U(`is-${t.location.terrain || "urban"}`)
        }, [...p[1] || (p[1] = [e("path", { d: "M-108-20Q-100-100-32-94T87-56Q127-13 99 48T21 99Q-57 113-90 65T-108-20Z" }, null, -1), e("path", {
          class: "map-contour",
          d: "M-133-22Q-124-126-39-116T110-70Q156-17 124 60T26 123Q-71 139-112 81T-133-22Z"
        }, null, -1)])], 10, rt))), 128))]),
        e("g", ut, [(l(!0), o(A, null, T(i.value.routes, (t) => (l(), o("g", {
          key: t.link.id,
          class: U({
            "is-path": t.link.kind === "path",
            "is-portal": t.link.kind === "portal"
          })
        }, [
          e("path", {
            class: "map-road-casing",
            d: t.path
          }, null, 8, ct),
          e("path", {
            class: "map-road-line",
            d: t.path,
            "marker-end": t.link.bidirectional ? void 0 : `url(#${k})`
          }, null, 8, dt),
          t.link.label ? (l(), o("text", {
            key: 0,
            x: t.x,
            y: t.y - 14
          }, h(t.link.label), 9, vt)) : f("", !0)
        ], 2))), 128))]),
        (l(!0), o(A, null, T(i.value.nodes, (t) => (l(), o("g", {
          key: t.location.key,
          class: U(["map-place", {
            "is-selected": t.location.key === s.selectedLocationKey,
            "is-current": t.location.key === a.value,
            "is-unvisited": t.location.status !== "visited"
          }]),
          transform: `translate(${t.x} ${t.y}) scale(${d * 0.5})`,
          role: "button",
          tabindex: "0",
          "aria-label": `查看${t.location.name}`,
          onClick: oe((g) => r.$emit("select", t.location.key), ["stop"]),
          onKeydown: [Me(oe((g) => r.$emit("select", t.location.key), ["stop"]), ["enter"]), Me(oe((g) => r.$emit("select", t.location.key), ["stop", "prevent"]), ["space"])]
        }, [
          p[2] || (p[2] = e("circle", {
            class: "map-pin-halo",
            r: "39"
          }, null, -1)),
          p[3] || (p[3] = e("path", {
            class: "map-pin-body",
            d: "M0 33C-6 25-26 8-26-6a26 26 0 0 1 52 0C26 8 6 25 0 33Z"
          }, null, -1)),
          e("g", mt, [$(j, {
            name: m(t.location.terrain, t.location.scale),
            width: "28",
            height: "28"
          }, null, 8, ["name"])]),
          e("text", yt, h(t.location.name.length > 14 ? t.location.name.slice(0, 13) + "…" : t.location.name), 1),
          t.location.key === a.value ? (l(), o("text", ft, "你在这里")) : t.location.status !== "visited" ? (l(), o("text", ht, "未到访")) : f("", !0),
          e("title", null, h(t.location.name) + h(t.location.brief ? " · " + t.location.brief : ""), 1)
        ], 42, pt))), 128))
      ]),
      _: 1
    }, 8, [
      "view-box",
      "reset-key",
      "focus-point",
      "focus-sequence"
    ]));
  }
}), kt = bt, le;
async function Pe() {
  if (!le) {
    const s = [
      "..",
      "..",
      "..",
      "libs",
      "material-symbols",
      "material-symbols-rounded.woff2"
    ].join("/"), n = new URL(s, import.meta.url);
    le = new FontFace("Xiaobai Map Symbols", `url("${n.href}")`, {
      display: "block",
      weight: "400"
    }).load(), le.catch(() => {
      le = void 0;
    });
  }
  document.fonts.add(await le);
}
var ss = Object.freeze([
  "wall",
  "road",
  "water",
  "terrain",
  "furniture",
  "decoration",
  "door",
  "danger",
  "marker",
  "actor",
  "label",
  "grid",
  "magic",
  "secret",
  "light"
]), ns = Object.freeze([
  "rect",
  "circle",
  "path",
  "curve",
  "icon",
  "label"
]), os = Object.freeze([
  "door",
  "stairs",
  "elevator",
  "portal",
  "passage",
  "entrance",
  "exit",
  "north",
  "south",
  "east",
  "west",
  "up",
  "down",
  "trap",
  "chest",
  "marker",
  "player",
  "actor"
]), gt = Object.freeze([
  "unknown",
  "wood",
  "stone",
  "tile",
  "carpet",
  "bed-sheet",
  "fabric",
  "tatami",
  "sand",
  "marble",
  "blood",
  "water",
  "grass",
  "forest",
  "glass",
  "dirt",
  "snow",
  "metal",
  "rune",
  "warm-light",
  "cold-light",
  "shadow"
]), is = Object.freeze([
  "confirmed",
  "inferred",
  "unknown"
]), rs = Object.freeze([
  "door-open",
  "stairs",
  "elevator",
  "portal",
  "passage",
  "entrance",
  "exit",
  "north",
  "south",
  "east",
  "west",
  "up",
  "down",
  "trap",
  "chest",
  "marker",
  "player",
  "actor",
  "chair",
  "table",
  "bed",
  "counter",
  "shelf",
  "sofa",
  "bridge",
  "tree",
  "rock",
  "building",
  "fire",
  "light",
  "water"
]), us = Object.freeze(/* @__PURE__ */ new Set([
  "floor",
  "ground",
  "surface",
  "base",
  "area",
  "deck",
  "platform",
  "walkway",
  "clearing",
  "yard"
])), Mt = ["id"], $t = ["stop-color", "stop-opacity"], wt = ["stop-color", "stop-opacity"], xt = ["stop-color", "stop-opacity"], _t = ["id"], Ct = ["fill", "fill-opacity"], St = {
  fill: "none",
  stroke: "var(--scene-shadow)",
  "stroke-width": ".65",
  opacity: ".24"
}, jt = {
  key: 1,
  d: "M0 0H48V32H0ZM19 0V17M0 17H48M36 17V32M3 3h12m8 0h21"
}, At = {
  key: 2,
  d: "M0 0H48V32H0ZM24 0V32M0 16H48M12 4l5 4-5 4-5-4ZM36 20l5 4-5 4-5-4Z"
}, Bt = {
  key: 3,
  d: "M-3 3 8 11l17 2 9 10 18 3M27-3l-8 12 3 8-7 17",
  opacity: ".65"
}, Et = {
  key: 4,
  d: "M3 8q6 3 13 0M25 25q7 2 17-1",
  stroke: "var(--scene-highlight)",
  "stroke-width": "1.3",
  opacity: "1"
}, Pt = {
  key: 5,
  d: "M5 32 37 0M12 32 44 0",
  stroke: "var(--scene-highlight)",
  "stroke-width": "2.2"
}, Ht = {
  key: 6,
  d: "M8 15l-2-4m2 4 3-3M36 26l-1-4m1 4 3-3"
}, It = {
  key: 7,
  d: "M5 8h1m20-2h2m-12 17h2m23-6h1m-5 12h2",
  "stroke-linecap": "round"
}, qt = {
  key: 8,
  d: "M0 0H48V32H0M0 5H48M0 27H48M5 5v1m38-1v1m-38 20v1m38-1v1"
}, Kt = {
  key: 9,
  d: "M0 5H48M0 13H48M0 21H48M0 29H48M4 0v32m8-32v32m8-32v32m8-32v32m8-32v32m8-32v32",
  opacity: ".55"
}, Rt = {
  key: 10,
  d: "m24 5 8 11-8 11-8-11ZM24 10v12M20 16h8"
}, Tt = {
  key: 11,
  d: "M7 8q12-5 16 6t20 7M4 27l6-3"
}, Vt = {
  key: 12,
  d: "M5 19q5-3 11-1M29 8q6-2 12 1",
  stroke: "var(--scene-highlight)",
  "stroke-width": "1.4"
}, Lt = {
  key: 0,
  d: "M0 1H48",
  stroke: "var(--scene-highlight)",
  "stroke-width": ".7",
  opacity: ".35"
}, Ot = ["id"], zt = ["id"], Nt = ["transform", "fill"], Qt = /* @__PURE__ */ L({
  __name: "SceneMaterials",
  props: { prefix: {} },
  setup(s) {
    return (n, i) => (l(), o("defs", null, [
      (l(!0), o(A, null, T(c(gt), (a) => (l(), o(A, { key: a }, [e("linearGradient", {
        id: `${s.prefix}-face-${a}`,
        x1: "0",
        y1: "0",
        x2: ".7",
        y2: "1"
      }, [
        e("stop", {
          offset: "0",
          "stop-color": `color-mix(in srgb, ${c(se)(a)}, var(--scene-highlight) 24%)`,
          "stop-opacity": a === "glass" ? 0.35 : 1
        }, null, 8, $t),
        e("stop", {
          offset: ".52",
          "stop-color": c(se)(a),
          "stop-opacity": a === "glass" ? 0.16 : 1
        }, null, 8, wt),
        e("stop", {
          offset: "1",
          "stop-color": `color-mix(in srgb, ${c(se)(a)}, var(--scene-shadow) 16%)`,
          "stop-opacity": a === "glass" ? 0.28 : 1
        }, null, 8, xt)
      ], 8, Mt), e("pattern", {
        id: `${s.prefix}-material-${a}`,
        width: "48",
        height: "32",
        patternUnits: "userSpaceOnUse",
        class: "scene-texture"
      }, [
        e("rect", {
          width: "48",
          height: "32",
          fill: c(se)(a),
          "fill-opacity": a === "glass" ? 0.4 : 1
        }, null, 8, Ct),
        e("g", St, [a === "wood" ? (l(), o(A, { key: 0 }, [i[0] || (i[0] = e("path", { d: "M0 0H48M0 16H48M19 0V16M37 16V32" }, null, -1)), i[1] || (i[1] = e("path", {
          d: "M3 7Q12 4 26 8T47 7M2 26q10-4 25 0t23-1",
          opacity: ".5"
        }, null, -1))], 64)) : a === "stone" ? (l(), o("path", jt)) : a === "tile" ? (l(), o("path", At)) : a === "marble" ? (l(), o("path", Bt)) : a === "water" ? (l(), o("path", Et)) : a === "glass" ? (l(), o("path", Pt)) : a === "grass" || a === "forest" ? (l(), o("path", Ht)) : a === "dirt" || a === "sand" ? (l(), o("path", It)) : a === "metal" ? (l(), o("path", qt)) : [
          "carpet",
          "fabric",
          "bed-sheet",
          "tatami"
        ].includes(a) ? (l(), o("path", Kt)) : a === "rune" ? (l(), o("path", Rt)) : a === "blood" ? (l(), o("path", Tt)) : a === "snow" ? (l(), o("path", Vt)) : f("", !0)]),
        a === "wood" || a === "stone" || a === "metal" ? (l(), o("path", Lt)) : f("", !0)
      ], 8, _t)], 64))), 128)),
      e("radialGradient", {
        id: `${s.prefix}-crown-face`,
        cx: ".32",
        cy: ".25",
        r: ".8"
      }, [...i[2] || (i[2] = [
        e("stop", {
          offset: "0",
          "stop-color": "var(--scene-leaf-light)"
        }, null, -1),
        e("stop", {
          offset: ".6",
          "stop-color": "var(--scene-leaf)"
        }, null, -1),
        e("stop", {
          offset: "1",
          "stop-color": "var(--scene-leaf-dark)"
        }, null, -1)
      ])], 8, Ot),
      (l(), o(A, null, T(3, (a) => e("symbol", {
        id: `${s.prefix}-crown-${a - 1}`,
        key: a,
        viewBox: "0 0 100 100"
      }, [e("g", {
        transform: `rotate(${a * 37} 50 50)`,
        fill: `url(#${s.prefix}-crown-face)`,
        stroke: "var(--scene-leaf-dark)",
        "stroke-width": ".6"
      }, [...i[3] || (i[3] = [
        e("path", { d: "M49 5Q65 2 73 16Q91 14 93 36Q99 46 90 59Q95 76 76 81Q68 96 50 91Q30 97 23 82Q5 79 9 60Q-1 45 9 34Q7 17 28 16Q33 1 49 5Z" }, null, -1),
        e("circle", {
          cx: "34",
          cy: "32",
          r: "21"
        }, null, -1),
        e("circle", {
          cx: "69",
          cy: "36",
          r: "22"
        }, null, -1),
        e("circle", {
          cx: "30",
          cy: "62",
          r: "20"
        }, null, -1),
        e("circle", {
          cx: "64",
          cy: "67",
          r: "23"
        }, null, -1),
        e("circle", {
          cx: "49",
          cy: "48",
          r: "24"
        }, null, -1),
        e("path", {
          d: "M24 25q8-10 19-5M61 21q11-3 17 8M36 45q9-11 21-8M63 59q9-2 14 6",
          fill: "none",
          stroke: "var(--scene-leaf-light)",
          "stroke-width": "1.4",
          opacity: ".75"
        }, null, -1)
      ])], 8, Nt)], 8, zt)), 64))
    ]));
  }
}), Dt = Qt, Zt = [
  "x",
  "y",
  "width",
  "height"
], Ut = {
  key: 0,
  cx: "50",
  cy: "50",
  r: "50"
}, Wt = {
  key: 1,
  width: "100",
  height: "100"
}, Yt = ["clip-path", "fill"], Ft = {
  key: 0,
  cx: "50",
  cy: "50",
  r: "49",
  class: "scene-object-edge"
}, Xt = {
  key: 1,
  x: "1",
  y: "1",
  width: "98",
  height: "98",
  rx: "2",
  class: "scene-object-edge"
}, Gt = ["fill"], Jt = ["fill"], ea = ["d"], ta = {
  key: 0,
  d: "M9 78H91",
  class: "scene-object-seam"
}, aa = ["x"], la = /* @__PURE__ */ L({
  __name: "SceneObject",
  props: {
    element: {},
    prefix: {},
    unitScale: {}
  },
  setup(s) {
    const n = s, i = w(() => Be(n.element)), a = w(() => Math.min(i.value.width, i.value.height) / n.unitScale >= 12), v = w(() => n.element.shape === "circle"), k = w(() => n.element.material), m = w(() => ze(k.value, n.prefix)), r = w(() => Xe(k.value, n.prefix)), p = `scene-object-${fe()}`;
    return (d, t) => (l(), o("svg", {
      x: i.value.x,
      y: i.value.y,
      width: i.value.width,
      height: i.value.height,
      viewBox: "0 0 100 100",
      preserveAspectRatio: "none",
      class: "scene-object"
    }, [e("defs", null, [e("clipPath", { id: p }, [v.value ? (l(), o("circle", Ut)) : (l(), o("rect", Wt))])]), e("g", {
      "clip-path": `url(#${p})`,
      fill: m.value
    }, [v.value ? (l(), o("circle", Ft)) : (l(), o("rect", Xt)), a.value ? (l(), o(A, { key: 2 }, [v.value ? (l(), o("circle", {
      key: 0,
      cx: "50",
      cy: "50",
      r: "44",
      fill: r.value,
      class: "scene-object-inset"
    }, null, 8, Gt)) : (l(), o("rect", {
      key: 1,
      x: "5",
      y: "5",
      width: "90",
      height: "90",
      rx: "2",
      fill: r.value,
      class: "scene-object-inset"
    }, null, 8, Jt)), s.element.icon === "table" || s.element.icon === "counter" ? (l(), o(A, { key: 2 }, [e("path", {
      d: v.value ? "M18 36A35 35 0 0 1 72 22" : "M8 13V8H92",
      class: "scene-object-shine"
    }, null, 8, ea), s.element.icon === "counter" ? (l(), o("path", ta)) : f("", !0)], 64)) : s.element.icon === "chair" ? (l(), o(A, { key: 3 }, [
      t[0] || (t[0] = e("rect", {
        x: "12",
        y: "29",
        width: "76",
        height: "61",
        rx: "9",
        class: "scene-object-inset"
      }, null, -1)),
      t[1] || (t[1] = e("rect", {
        x: "7",
        y: "5",
        width: "86",
        height: "23",
        rx: "6",
        class: "scene-object-edge"
      }, null, -1)),
      t[2] || (t[2] = e("path", {
        d: "M16 12H84",
        class: "scene-object-shine"
      }, null, -1))
    ], 64)) : s.element.icon === "bed" ? (l(), o(A, { key: 4 }, [
      t[3] || (t[3] = e("rect", {
        x: "10",
        y: "12",
        width: "80",
        height: "79",
        rx: "5",
        class: "scene-object-inset"
      }, null, -1)),
      t[4] || (t[4] = e("rect", {
        x: "20",
        y: "17",
        width: "60",
        height: "20",
        rx: "7",
        class: "scene-object-inset"
      }, null, -1)),
      t[5] || (t[5] = e("path", {
        d: "M12 45H88M17 82H83",
        class: "scene-object-seam"
      }, null, -1)),
      t[6] || (t[6] = e("path", {
        d: "M18 49H82",
        class: "scene-object-shine"
      }, null, -1))
    ], 64)) : s.element.icon === "shelf" ? (l(), o(A, { key: 5 }, [t[7] || (t[7] = e("path", {
      d: "M8 32H92M8 66H92M40 8V32M65 32V66M35 66V92",
      class: "scene-object-seam"
    }, null, -1)), t[8] || (t[8] = e("path", {
      d: "M8 34H92M8 68H92",
      class: "scene-object-shine"
    }, null, -1))], 64)) : s.element.icon === "sofa" ? (l(), o(A, { key: 6 }, [
      t[9] || (t[9] = e("rect", {
        x: "8",
        y: "5",
        width: "84",
        height: "25",
        rx: "7",
        class: "scene-object-inset"
      }, null, -1)),
      (l(), o(A, null, T(3, (g) => e("rect", {
        key: g,
        x: 15 + (g - 1) * 24,
        y: "32",
        width: "22",
        height: "57",
        rx: "5",
        class: "scene-object-inset"
      }, null, 8, aa)), 64)),
      t[10] || (t[10] = e("rect", {
        x: "3",
        y: "23",
        width: "11",
        height: "70",
        rx: "4",
        class: "scene-object-inset"
      }, null, -1)),
      t[11] || (t[11] = e("rect", {
        x: "86",
        y: "23",
        width: "11",
        height: "70",
        rx: "4",
        class: "scene-object-inset"
      }, null, -1))
    ], 64)) : s.element.icon === "bridge" ? (l(), o(A, { key: 7 }, [t[12] || (t[12] = e("path", {
      d: "M7 7V93M93 7V93M9 20H91M9 35H91M9 50H91M9 65H91M9 80H91",
      class: "scene-object-seam"
    }, null, -1)), t[13] || (t[13] = e("path", {
      d: "M11 7V93M89 7V93",
      class: "scene-object-shine"
    }, null, -1))], 64)) : s.element.icon === "tree" ? (l(), o(A, { key: 8 }, [t[14] || (t[14] = Ve('<circle cx="34" cy="32" r="24" class="scene-object-inset"></circle><circle cx="69" cy="36" r="24" class="scene-object-inset"></circle><circle cx="30" cy="62" r="23" class="scene-object-inset"></circle><circle cx="64" cy="67" r="25" class="scene-object-inset"></circle><circle cx="49" cy="48" r="26" class="scene-object-inset"></circle><path d="M21 24q10-10 22-4M36 41q8-9 22-6M64 56q8-1 13 5" class="scene-object-shine"></path>', 6))], 64)) : s.element.icon === "rock" ? (l(), o(A, { key: 9 }, [t[15] || (t[15] = e("path", {
      d: "M8 38 33 12 76 18 93 57 71 88 25 86ZM33 12 41 44 8 38M41 44 76 18M41 44 71 88M41 44 93 57",
      class: "scene-object-seam"
    }, null, -1)), t[16] || (t[16] = e("path", {
      d: "M12 38 33 17 72 22",
      class: "scene-object-shine"
    }, null, -1))], 64)) : f("", !0)], 64)) : f("", !0)], 8, Yt)], 8, Zt));
  }
}), sa = la, na = ["data-element", "opacity"], oa = ["transform"], ia = ["d"], ra = ["d", "stroke-width"], ua = [
  "d",
  "fill",
  "stroke",
  "stroke-width",
  "stroke-dasharray",
  "stroke-linecap"
], ca = [
  "d",
  "stroke",
  "stroke-opacity",
  "stroke-dasharray"
], da = ["id"], va = ["d"], pa = ["clip-path"], ma = [
  "href",
  "x",
  "y",
  "width",
  "height"
], ya = ["transform"], fa = {
  key: 0,
  r: "19",
  class: "scene-player-halo"
}, ha = ["stroke"], ba = {
  key: 1,
  class: "map-material-symbol",
  "aria-hidden": "true"
}, ka = {
  key: 2,
  class: "map-symbol-fallback",
  "aria-hidden": "true"
}, ga = ["x", "y"], Ma = /* @__PURE__ */ L({
  __name: "MapScene",
  props: { scene: {} },
  setup(s) {
    const n = s, i = E(!1);
    re(() => {
      Pe().then(() => {
        i.value = !0;
      }).catch(() => {
        i.value = !1;
      });
    });
    const a = `xiaobai-map-scene-${fe()}`, v = w(() => Ae[n.scene.mood || "neutral"]), k = w(() => Fe(n.scene.elements)), m = w(() => We(n.scene.elements).map((r, p) => ({
      element: r,
      bounds: Be(r),
      path: Ye(r),
      transform: Ze(r),
      area: Qe(r),
      presentation: Ne(r, a),
      clipId: `${a}-area-${p}`,
      object: De(r)
    })));
    return (r, p) => (l(), Z(Ee, {
      class: "map-scene-viewport",
      style: pe({ "--scene-glow": v.value.glow }),
      "view-box": s.scene.viewBox,
      "reset-key": s.scene.key,
      label: `${s.scene.name} 场景地图`
    }, {
      default: ue(({ unitScale: d }) => [
        $(Dt, { prefix: a }),
        (l(!0), o(A, null, T(m.value, (t) => (l(), o("g", {
          key: t.element.id,
          class: U(["map-scene-element", [`is-${t.element.category}`, `is-${t.element.certainty || "confirmed"}`]]),
          "data-element": t.element.id,
          opacity: t.presentation.opacity
        }, [e("g", { transform: t.transform }, [
          t.object ? (l(), Z(sa, {
            key: 0,
            element: t.element,
            prefix: a,
            "unit-scale": d
          }, null, 8, ["element", "unit-scale"])) : t.path ? (l(), o(A, { key: 1 }, [
            t.element.category === "wall" ? (l(), o("path", {
              key: 0,
              d: t.path,
              fill: "none",
              stroke: "var(--scene-shadow)",
              "stroke-width": "9",
              opacity: ".18",
              "stroke-linejoin": "round",
              "vector-effect": "non-scaling-stroke"
            }, null, 8, ia)) : f("", !0),
            t.element.category === "road" && !t.area ? (l(), o("path", {
              key: 1,
              d: t.path,
              fill: "none",
              stroke: "var(--scene-soft-edge)",
              "stroke-width": t.presentation.width + 2,
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "vector-effect": "non-scaling-stroke"
            }, null, 8, ra)) : f("", !0),
            e("path", {
              d: t.path,
              fill: t.presentation.fill,
              stroke: t.presentation.stroke,
              "stroke-width": t.presentation.width,
              "stroke-dasharray": t.presentation.dash,
              "stroke-linejoin": "round",
              "stroke-linecap": t.element.category === "wall" ? "butt" : "round",
              "fill-rule": "evenodd",
              "vector-effect": "non-scaling-stroke"
            }, null, 8, ua),
            t.element.category === "wall" ? (l(), o("path", {
              key: 2,
              d: t.path,
              fill: "none",
              stroke: t.element.material ? c(se)(t.element.material) : "var(--scene-wall)",
              "stroke-width": "3.5",
              "stroke-opacity": t.element.material === "glass" ? 0.4 : 1,
              "stroke-dasharray": t.presentation.dash,
              "stroke-linejoin": "round",
              "vector-effect": "non-scaling-stroke"
            }, null, 8, ca)) : f("", !0)
          ], 64)) : f("", !0),
          k.value.has(t.element.id) ? (l(), o(A, { key: 2 }, [e("defs", null, [e("clipPath", { id: t.clipId }, [e("path", {
            d: t.path,
            "clip-rule": "evenodd"
          }, null, 8, va)], 8, da)]), e("g", {
            "clip-path": `url(#${t.clipId})`,
            class: "scene-forest-decoration",
            "aria-hidden": "true"
          }, [(l(!0), o(A, null, T(k.value.get(t.element.id), (g, I) => (l(), o("use", {
            key: I,
            href: `#${a}-crown-${g.variant}`,
            x: g.x - g.size / 2,
            y: g.y - g.size / 2,
            width: g.size,
            height: g.size
          }, null, 8, ma))), 128))], 8, pa)], 64)) : f("", !0),
          t.element.shape === "icon" ? (l(), o("g", {
            key: 3,
            class: "map-scene-icon",
            transform: `translate(${t.bounds.x} ${t.bounds.y}) scale(${d})`
          }, [
            t.element.kind === "player" ? (l(), o("circle", fa)) : f("", !0),
            e("circle", {
              r: "11",
              stroke: t.presentation.stroke
            }, null, 8, ha),
            i.value ? (l(), o("text", ba, h(t.presentation.icon), 1)) : (l(), o("text", ka, h(t.presentation.fallback), 1))
          ], 8, ya)) : f("", !0)
        ], 8, oa)], 10, na))), 128)),
        e("g", {
          class: "scene-labels",
          style: pe({ "--scene-unit-scale": d })
        }, [(l(!0), o(A, null, T(m.value, (t) => (l(), o(A, { key: t.element.id }, [t.element.label ? (l(), o("text", {
          key: 0,
          class: U(["map-scene-label", { "is-primary": t.element.shape === "label" }]),
          x: c($e)(t.element, d)[0],
          y: c($e)(t.element, d)[1]
        }, h(t.element.label), 11, ga)) : f("", !0)], 64))), 128))], 4)
      ]),
      _: 1
    }, 8, [
      "style",
      "view-box",
      "reset-key",
      "label"
    ]));
  }
}), $a = Ma, wa = {
  key: 0,
  class: "map-3d-loading",
  role: "status"
}, xa = {
  class: "map-viewport-controls",
  "aria-label": "三维视角"
}, _a = /* @__PURE__ */ L({
  __name: "MapScene3D",
  props: {
    scene: {},
    lowWalls: { type: Boolean },
    showLabels: { type: Boolean }
  },
  emits: ["fallback"],
  setup(s, { emit: n }) {
    const i = s, a = n, v = E(null), k = E(null), m = E(!0);
    let r, p = !1;
    return re(async () => {
      p = !0;
      try {
        const { createThreeRuntime: d } = await import("./xiaobai-os-three-runtime-D1ck7gEA.js");
        if (!p) return;
        r = d(v.value, k.value, { fallback: (t) => a("fallback", t) }), r.setScene(i.scene), r.walls(i.lowWalls), r.labels(i.showLabels), m.value = !1, Pe().then(() => {
          p && r?.symbols(!0);
        }).catch(() => {
        });
      } catch {
        p && a("fallback", "当前设备无法打开三维，已切换二维。");
      }
    }), te(() => i.scene, (d) => r?.setScene(d)), te(() => i.lowWalls, (d) => r?.walls(d)), te(() => i.showLabels, (d) => r?.labels(d)), ye(() => {
      p = !1, r?.dispose(), r = void 0;
    }), (d, t) => (l(), o("div", {
      ref_key: "host",
      ref: v,
      class: "map-scene-three",
      style: pe({ "--scene-glow": c(Ae)[s.scene.mood || "neutral"].glow })
    }, [
      e("div", {
        ref_key: "labelHost",
        ref: k,
        class: "map-3d-labels"
      }, null, 512),
      m.value ? (l(), o("div", wa, "正在打开三维…")) : f("", !0),
      e("div", xa, [
        e("button", {
          type: "button",
          "aria-label": "放大三维",
          onClick: t[0] || (t[0] = (g) => c(r)?.zoom(1.2))
        }, "+"),
        e("button", {
          type: "button",
          "aria-label": "缩小三维",
          onClick: t[1] || (t[1] = (g) => c(r)?.zoom(1 / 1.2))
        }, "−"),
        e("button", {
          type: "button",
          class: "map-fit",
          "aria-label": "重置三维视角",
          onClick: t[2] || (t[2] = (g) => c(r)?.fit())
        }, "全图")
      ])
    ], 4));
  }
}), Ca = _a, Sa = ["aria-label"], ja = { class: "map-scene-toolbar" }, Aa = {
  class: "map-render-switch",
  role: "group",
  "aria-label": "场景显示方式"
}, Ba = ["aria-pressed"], Ea = ["aria-pressed", "disabled"], Pa = ["aria-pressed"], Ha = ["aria-pressed"], Ia = { class: "map-scene-stage" }, qa = /* @__PURE__ */ L({
  __name: "MapSceneView",
  props: {
    scene: {},
    mode: {},
    threeUnavailable: { type: Boolean }
  },
  emits: ["update:mode", "fallback"],
  setup(s, { emit: n }) {
    const i = n, a = E(!0), v = E(!0);
    return (k, m) => (l(), o("section", {
      class: "map-scene-view",
      "aria-label": s.scene.name
    }, [e("div", ja, [
      e("div", Aa, [e("button", {
        type: "button",
        "aria-pressed": s.mode === "2d",
        onClick: m[0] || (m[0] = (r) => i("update:mode", "2d"))
      }, "二维", 8, Ba), e("button", {
        type: "button",
        "aria-pressed": s.mode === "3d",
        disabled: s.threeUnavailable,
        onClick: m[1] || (m[1] = (r) => i("update:mode", "3d"))
      }, "三维", 8, Ea)]),
      s.mode === "3d" ? (l(), o("button", {
        key: 0,
        type: "button",
        "aria-pressed": a.value,
        onClick: m[2] || (m[2] = (r) => a.value = !a.value)
      }, "低墙", 8, Pa)) : f("", !0),
      s.mode === "3d" ? (l(), o("button", {
        key: 1,
        type: "button",
        "aria-pressed": v.value,
        onClick: m[3] || (m[3] = (r) => v.value = !v.value)
      }, "名称", 8, Ha)) : f("", !0)
    ]), e("div", Ia, [me($($a, { scene: s.scene }, null, 8, ["scene"]), [[Ce, s.mode === "2d"]]), s.mode === "3d" ? (l(), Z(Ca, {
      key: 0,
      scene: s.scene,
      "low-walls": a.value,
      "show-labels": v.value,
      onFallback: m[4] || (m[4] = (r) => i("fallback", r))
    }, null, 8, [
      "scene",
      "low-walls",
      "show-labels"
    ])) : f("", !0)])], 8, Sa));
  }
}), Ka = qa;
function xe(s) {
  const n = s?.atlas.actors.find((a) => a.actorKey === "player"), i = s?.atlas.locations.find((a) => a.key === n?.locationKey);
  return i?.sceneKey && s?.scenes[i.sceneKey]?.status === "active" ? "scene" : "world";
}
var Ra = { class: "map-dialog-header" }, Ta = { key: 0 }, Va = { class: "map-settings-content" }, La = { class: "map-auto-setting" }, Oa = ["aria-checked", "disabled"], za = { class: "map-settings-section" }, Na = ["disabled"], Qa = { key: 0 }, Da = { class: "map-settings-section" }, Za = { key: 0 }, Ua = ["disabled"], Wa = {
  key: 0,
  class: "map-setting-note",
  role: "status"
}, Ya = ["disabled"], Fa = /* @__PURE__ */ L({
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
  setup(s) {
    return (n, i) => (l(), Z(Se, {
      class: "map-dialog map-settings",
      "aria-labelledby": "map-settings-title",
      onClose: i[5] || (i[5] = (a) => n.$emit("close"))
    }, {
      default: ue(() => [
        e("header", Ra, [i[6] || (i[6] = e("div", null, [e("small", null, "让地图跟上你的故事"), e("h2", { id: "map-settings-title" }, "地图设置")], -1)), e("button", {
          type: "button",
          class: "map-round-button",
          "aria-label": "关闭地图设置",
          onClick: i[0] || (i[0] = (a) => n.$emit("close"))
        }, [$(j, { name: "close" })])]),
        s.status || s.notice || s.maintenanceMessage ? (l(), o("section", {
          key: 0,
          class: U(["map-settings-feedback", { "is-error": s.notice ? s.noticeError : s.maintenanceError }]),
          role: "status"
        }, [e("strong", null, h(s.notice ? s.notice === s.maintenanceMessage ? "最近一次更新" : "操作提示" : s.status || "最近一次更新"), 1), s.notice || s.maintenanceMessage ? (l(), o("p", Ta, h(s.notice || s.maintenanceMessage), 1)) : f("", !0)], 2)) : f("", !0),
        e("div", Va, [
          e("section", La, [i[8] || (i[8] = e("div", null, [e("h3", null, "随对话自动更新"), e("p", null, "你发送下一条消息时，根据上一轮对话更新地图。适用于所有普通聊天。")], -1)), e("button", {
            type: "button",
            class: "map-switch",
            role: "switch",
            "aria-checked": s.autoMaintenance,
            "aria-label": "随对话自动更新",
            disabled: s.autoToggleBusy,
            onClick: i[1] || (i[1] = (a) => n.$emit("setAuto", !s.autoMaintenance))
          }, [...i[7] || (i[7] = [e("span", null, null, -1)])], 8, Oa)]),
          e("section", za, [
            $(j, { name: "refresh" }),
            i[9] || (i[9] = e("h3", null, "补充最近的变化", -1)),
            i[10] || (i[10] = e("p", null, "根据最近一轮对话更新位置和地点，并补全当前区域尚缺少的探索去处。", -1)),
            e("button", {
              type: "button",
              class: "map-primary-button",
              disabled: s.busy || !!s.disabledReason || !s.hasMap,
              onClick: i[2] || (i[2] = (a) => n.$emit("update"))
            }, h(s.busy ? s.status || "请稍候…" : "更新地图"), 9, Na),
            s.hasMap ? f("", !0) : (l(), o("small", Qa, "请先建立世界地图"))
          ]),
          e("section", Da, [
            $(j, { name: "globe" }),
            e("h3", null, h(s.hasMap ? "重新绘制世界" : "建立世界地图"), 1),
            i[11] || (i[11] = e("p", null, "依据角色与世界设定建立地图；设定未写明的地方，会合理补全。结合当前聊天保留已发生的故事。", -1)),
            s.hasMap ? (l(), o("p", Za, "新地图保存成功后替换原图；失败时保留原图。")) : f("", !0),
            e("button", {
              type: "button",
              class: "map-secondary-button",
              disabled: s.busy || !!s.disabledReason,
              onClick: i[3] || (i[3] = (a) => n.$emit("rebuild"))
            }, h(s.busy ? s.status || "请稍候…" : s.hasMap ? "重新绘制" : "绘制世界地图"), 9, Ua)
          ]),
          s.disabledReason ? (l(), o("p", Wa, h(s.disabledReason), 1)) : f("", !0),
          e("button", {
            type: "button",
            class: "map-sync-button",
            disabled: s.busy || s.refreshDisabled,
            onClick: i[4] || (i[4] = (a) => n.$emit("refresh"))
          }, [$(j, { name: "refresh" }), i[12] || (i[12] = R("同步已保存的地图", -1))], 8, Ya),
          i[13] || (i[13] = e("p", { class: "map-setting-note" }, "同步只读取保存结果，不会重新生成地图。绘制或更新开始后，可以离开此页面。", -1))
        ])
      ]),
      _: 1
    }));
  }
}), Xa = Fa, Ga = { class: "map-search-input" }, Ja = {
  class: "map-search-filters",
  "aria-label": "地点筛选"
}, el = ["aria-pressed", "onClick"], tl = { class: "map-search-results" }, al = ["onClick"], ll = { class: "map-result-icon" }, sl = { key: 0 }, nl = {
  key: 0,
  class: "map-search-empty"
}, ol = /* @__PURE__ */ L({
  __name: "MapSearch",
  props: { atlas: {} },
  emits: ["close", "select"],
  setup(s) {
    const n = s, i = E(""), a = E("all"), v = w(() => n.atlas.locations.filter((k) => [
      k.name,
      k.brief,
      n.atlas.locations.find((m) => m.key === k.parent)?.name
    ].some((m) => m?.toLocaleLowerCase().includes(i.value.trim().toLocaleLowerCase())) && (a.value === "all" || (a.value === "unvisited" ? k.status !== "visited" : k.status === "visited"))));
    return (k, m) => (l(), Z(Se, {
      class: "map-dialog map-search-dialog",
      "aria-label": "查找地点",
      onClose: m[2] || (m[2] = (r) => k.$emit("close"))
    }, {
      default: ue(() => [
        e("header", Ga, [
          $(j, { name: "search" }),
          me(e("input", {
            "onUpdate:modelValue": m[0] || (m[0] = (r) => i.value = r),
            type: "search",
            "aria-label": "搜索地点",
            placeholder: "想去哪里？",
            autofocus: ""
          }, null, 512), [[Le, i.value]]),
          e("button", {
            type: "button",
            onClick: m[1] || (m[1] = (r) => k.$emit("close"))
          }, "取消")
        ]),
        e("nav", Ja, [(l(), o(A, null, T([
          {
            id: "all",
            name: "全部地点"
          },
          {
            id: "unvisited",
            name: "还没去过"
          },
          {
            id: "visited",
            name: "已到访"
          }
        ], (r) => e("button", {
          key: r.id,
          type: "button",
          "aria-pressed": a.value === r.id,
          onClick: (p) => a.value = r.id
        }, h(r.name), 9, el)), 64))]),
        e("div", tl, [
          e("small", null, h(v.value.length) + " 个地点", 1),
          (l(!0), o(A, null, T(v.value, (r) => (l(), o("button", {
            key: r.key,
            type: "button",
            class: "map-search-result",
            onClick: (p) => k.$emit("select", r.key)
          }, [
            e("span", ll, [$(j, { name: "pin" })]),
            e("span", null, [
              e("strong", null, h(r.name), 1),
              e("small", null, h(c(je)[r.scale]) + " · " + h(r.status === "visited" ? "已到访" : "未到访"), 1),
              r.brief ? (l(), o("p", sl, h(r.brief), 1)) : f("", !0)
            ]),
            $(j, { name: "next" })
          ], 8, al))), 128)),
          v.value.length ? f("", !0) : (l(), o("div", nl, [
            $(j, { name: "search" }),
            m[3] || (m[3] = e("h3", null, "还没有找到这个地点", -1)),
            m[4] || (m[4] = e("p", null, "试试其他名称，或看看全部地点。", -1))
          ]))
        ])
      ]),
      _: 1
    }));
  }
}), il = ol, rl = {
  class: "map-place-detail",
  "aria-labelledby": "map-place-title"
}, ul = { id: "map-place-title" }, cl = { class: "map-place-content" }, dl = {
  key: 0,
  class: "map-place-full-name"
}, vl = {
  key: 1,
  class: "map-address"
}, pl = { class: "map-place-intro" }, ml = {
  key: 2,
  class: "map-place-actions"
}, yl = {
  key: 3,
  class: "map-detail-section"
}, fl = { class: "map-people" }, hl = {
  key: 4,
  class: "map-detail-section"
}, bl = ["onClick"], kl = /* @__PURE__ */ L({
  __name: "MapPlaceDetail",
  props: {
    location: {},
    map: {},
    currentKey: {}
  },
  emits: [
    "close",
    "scene",
    "explore",
    "select"
  ],
  setup(s) {
    const n = s, i = w(() => he(n.map.atlas, n.location.key).slice(0, -1)), a = w(() => n.map.atlas.locations.filter((r) => r.parent === n.location.key)), v = w(() => n.map.atlas.actors.filter((r) => r.locationKey === n.location.key)), k = w(() => nt(n.map.atlas, n.location.key)), m = w(() => n.location.sceneKey ? n.map.scenes[n.location.sceneKey] : void 0);
    return (r, p) => (l(), o("section", rl, [
      p[7] || (p[7] = e("div", {
        class: "map-sheet-grip",
        "aria-hidden": "true"
      }, null, -1)),
      e("header", null, [e("div", null, [e("small", null, h(c(je)[s.location.scale]) + " · " + h(s.currentKey === s.location.key ? "当前位置" : s.location.status === "visited" ? "已到访" : "未到访"), 1), e("h2", ul, h(s.location.name), 1)]), e("button", {
        type: "button",
        class: "map-round-button",
        "aria-label": "关闭地点详情",
        onClick: p[0] || (p[0] = (d) => r.$emit("close"))
      }, [$(j, { name: "close" })])]),
      e("div", cl, [
        s.location.name.length > 24 ? (l(), o("p", dl, h(s.location.name), 1)) : f("", !0),
        i.value.length ? (l(), o("p", vl, [$(j, { name: "pin" }), R(h(i.value.map((d) => d.name).join(" · ")), 1)])) : f("", !0),
        e("p", pl, h(s.location.brief || "这个地点已记录在世界地图上，更多介绍等待故事展开。"), 1),
        a.value.length || m.value ? (l(), o("div", ml, [a.value.length ? (l(), o("button", {
          key: 0,
          type: "button",
          class: "map-primary-button",
          onClick: p[1] || (p[1] = (d) => r.$emit("explore"))
        }, [$(j, { name: "compass" }), R("探索这里 · " + h(a.value.length) + " 处", 1)])) : f("", !0), m.value ? (l(), o("button", {
          key: 1,
          type: "button",
          class: "map-secondary-button",
          onClick: p[2] || (p[2] = (d) => r.$emit("scene"))
        }, [$(j, { name: "layers" }), p[3] || (p[3] = R("查看场景图", -1))])) : f("", !0)])) : f("", !0),
        v.value.length ? (l(), o("section", yl, [p[4] || (p[4] = e("h3", null, "记录在这里的人物", -1)), e("p", fl, [(l(!0), o(A, null, T(v.value, (d) => (l(), o("span", { key: d.actorKey }, [$(j, { name: "person" }), R(h(d.displayName), 1)]))), 128))])])) : f("", !0),
        k.value.length ? (l(), o("section", hl, [p[5] || (p[5] = e("h3", null, "相连的地方", -1)), (l(!0), o(A, null, T(k.value, (d) => (l(), o("button", {
          key: d.link.id,
          type: "button",
          class: "map-connection",
          onClick: (t) => r.$emit("select", d.location.key)
        }, [
          $(j, { name: "route" }),
          e("span", null, [e("strong", null, h(d.location.name), 1), e("small", null, h(d.link.label || c(Ue)[d.link.kind]) + h(d.link.bidirectional ? "" : d.outgoing ? " · 单向前往" : " · 仅可从对面到达"), 1)]),
          $(j, { name: "next" })
        ], 8, bl))), 128))])) : f("", !0),
        p[6] || (p[6] = e("p", { class: "map-detail-footnote" }, "查看地图不会改变你在故事中的位置", -1))
      ])
    ]));
  }
}), gl = kl;
function ee(s) {
  return !!s && typeof s == "object" && !Array.isArray(s);
}
function _e(s) {
  return s.maintenanceStatus === "maintaining" || s.maintenanceStatus === "rebuilding";
}
function Ml(s) {
  const n = E(structuredClone(Ke(s.initialState))), i = E(null), a = E(""), v = E(!1);
  let k = !1, m = 0, r = 0, p = () => {
  };
  const d = w(() => n.value.status === "unconfirmed" || n.value.writeState === "unconfirmed"), t = w(() => i.value !== null || ["loading", "saving"].includes(n.value.status) || ["maintaining", "rebuilding"].includes(n.value.maintenanceStatus || "")), g = w(() => t.value ? "正在更新地图，请稍候" : d.value ? "请先核实上一次保存结果" : n.value.status === "conflict" ? "保存的版本不一致，请先处理保存问题" : n.value.status !== "ready" ? n.value.message || "地图暂时不可更新" : n.value.chatIdentity ? "" : "请先打开一个聊天"), I = w(() => n.value.maintenanceStatus === "rebuilding" || i.value === "rebuild" ? "正在绘制世界…" : n.value.maintenanceStatus === "maintaining" || i.value === "maintain" ? "正在更新地图…" : i.value === "confirm" ? "正在核实保存…" : t.value ? "正在同步…" : ""), V = w(() => n.value.message || a.value), O = w(() => n.value.message ? [
    "blocked",
    "error",
    "conflict",
    "unconfirmed"
  ].includes(n.value.status) : v.value);
  function Y(C) {
    const B = _e(n.value);
    n.value = structuredClone(C), _e(C) ? (a.value = "", v.value = !1) : B && (a.value = C.maintenanceMessage || "", v.value = C.maintenanceStatus === "error");
  }
  function q(C, B) {
    const N = C instanceof Error ? C.message : String(C);
    return N.includes("聊天已切换") ? "聊天已切换，请重新打开地图。" : N === "host_request_timeout" ? "等待结果超时，更新可能仍在进行。请稍后查看，不要重复提交。" : B === "confirm" ? "仍无法确认保存结果，请稍后再试。" : B === "adopt" ? "未能恢复已保存的版本，当前更改仍暂停保存。" : B === "settings" ? "设置未能保存，请重试。" : "地图操作未完成，请稍后重试。";
  }
  async function H(C, B, N = {}) {
    if (i.value) return;
    const z = ++m, Q = r, P = n.value.chatIdentity;
    i.value = B, a.value = "", v.value = !1;
    try {
      const D = await s.bridge.request(C, {
        chatIdentity: P,
        ...N
      }, 35e3);
      if (!k || z !== m || n.value.chatIdentity !== P) return;
      const K = ee(D) ? D.result : void 0, y = ee(K) && ee(K.state) ? K.state : K;
      Q === r && ee(y) && y.chatIdentity === P && Y(y), (B === "maintain" || B === "rebuild") && ee(K) && typeof K.message == "string" && K.message && (a.value = K.message), B === "refresh" && n.value.status === "ready" && (a.value = "已同步保存的地图。"), B === "settings" && (a.value = n.value.autoMaintenance ? "自动更新已开启。" : "自动更新已关闭。"), B === "confirm" && n.value.status === "ready" && (a.value = "保存已确认。"), B === "adopt" && ee(K) && K.adoption === "adopted" && (a.value = "已恢复当前聊天中保存的 OS 数据。");
    } catch (D) {
      k && z === m && n.value.chatIdentity === P && (a.value = q(D, B), v.value = !0);
    } finally {
      k && z === m && (i.value = null);
    }
  }
  return re(() => {
    k = !0, p = s.bridge.subscribe((C) => {
      if (C.type === "map/state") {
        const B = C.payload.state;
        if (B.chatIdentity !== n.value.chatIdentity) return;
        r += 1, Y(B);
      } else C.type === "map/error" && (r += 1, v.value = !0, a.value = C.payload.message || "地图暂时无法读取，请重新打开。");
    });
  }), ye(() => {
    k = !1, m += 1, p();
  }), {
    state: n,
    activeRequest: i,
    busy: t,
    disabledReason: g,
    requiresConfirmation: d,
    status: I,
    notice: V,
    isError: O,
    dismissNotice: () => {
      a.value = "", v.value = !1;
    },
    refresh: () => {
      if (!t.value && !d.value) return H("map/refresh", "refresh");
    },
    confirmSave: () => {
      if (!t.value) return H("map/confirm-save", "confirm");
    },
    adopt: () => {
      if (!t.value) return H("map/adopt-server-state", "adopt");
    },
    setAuto: (C) => H("map/set-auto-maintenance", "settings", { enabled: C }),
    update: () => {
      if (!g.value && n.value.map) return H("map/maintain-once", "maintain");
    },
    rebuild: () => {
      if (!g.value) return H("map/rebuild", "rebuild");
    }
  };
}
var $l = { class: "map-top" }, wl = { class: "map-search-bar" }, xl = ["disabled"], _l = {
  key: 1,
  class: "map-search-entry"
}, Cl = {
  key: 0,
  class: "map-view-row"
}, Sl = {
  class: "map-view-switch",
  "aria-label": "地图视图"
}, jl = ["aria-pressed"], Al = ["aria-pressed"], Bl = {
  key: 0,
  class: "map-scene-tools"
}, El = ["aria-expanded"], Pl = {
  key: 1,
  class: "map-region-trail",
  "aria-label": "当前查看区域"
}, Hl = ["onClick"], Il = {
  key: 2,
  class: "map-progress",
  role: "status"
}, ql = {
  key: 3,
  class: "map-notice",
  role: "status"
}, Kl = ["disabled"], Rl = ["disabled"], Tl = ["disabled"], Vl = {
  key: 1,
  class: "map-empty"
}, Ll = ["disabled"], Ol = {
  key: 0,
  class: "map-setting-note"
}, zl = {
  key: 1,
  class: "map-empty"
}, Nl = {
  key: 1,
  class: "map-empty map-first-map"
}, Ql = { class: "map-empty-art" }, Dl = ["disabled"], Zl = {
  key: 1,
  class: "map-setting-note"
}, Ul = ["disabled"], Wl = ["aria-expanded"], Yl = {
  key: 1,
  class: "map-key"
}, Fl = {
  key: 3,
  class: "map-region-card"
}, Xl = { class: "map-region-icon" }, Gl = {
  key: 4,
  class: "map-scene-caption"
}, Jl = /* @__PURE__ */ L({
  __name: "MapApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(s) {
    const { state: n, activeRequest: i, busy: a, disabledReason: v, requiresConfirmation: k, status: m, notice: r, isError: p, dismissNotice: d, refresh: t, confirmSave: g, adopt: I, setAuto: V, update: O, rebuild: Y } = Ml(s), q = E(n.value.map ? we(n.value.map.atlas) : ""), H = E(""), C = E(xe(n.value.map) === "scene" ? "" : null), B = E("3d"), N = E(!1), z = E("");
    let Q = !1;
    const P = w(() => C.value !== null), D = E(""), K = E(0), y = E(!1), M = E(!1), x = E(!1), S = w(() => n.value.map?.atlas), W = w(() => S.value?.actors.find((_) => _.actorKey === "player")?.locationKey || ""), F = w(() => S.value?.locations.find((_) => _.key === W.value)), G = w(() => S.value?.locations.find((_) => _.key === H.value)), J = w(() => S.value?.locations.find((_) => _.key === (C.value || W.value))), be = w(() => P.value && J.value?.sceneKey ? n.value.map?.scenes[J.value.sceneKey] : void 0), ce = w(() => S.value?.locations.find((_) => _.key === q.value)), de = w(() => S.value?.locations.filter((_) => (_.parent || "") === q.value) || []), ke = w(() => de.value.filter((_) => _.status !== "visited").length), He = w(() => S.value ? he(S.value, q.value) : []);
    te(() => n.value, (_, u) => {
      const b = _.chatIdentity !== u.chatIdentity;
      (!u.map || b || q.value && !_.map?.atlas.locations.some((X) => X.key === q.value)) && (q.value = _.map ? we(_.map.atlas) : ""), (b || !_.map?.atlas.locations.some((X) => X.key === H.value)) && (H.value = ""), b && (Q = !1), (b || !u.map?.atlas.locations.length && _.map?.atlas.locations.length && !Q || C.value && !_.map?.atlas.locations.some((X) => X.key === C.value)) && (C.value = xe(_.map) === "scene" ? "" : null), b && (y.value = !1, M.value = !1);
    });
    function ae(_) {
      Q = !0, q.value = _, H.value = "", C.value = null, x.value = !1;
    }
    async function ne(_, u = !1) {
      const b = S.value?.locations.find((X) => X.key === _);
      b && (Q = !0, C.value = null, H.value = _, M.value = !1, x.value = !1, u && (q.value = b.parent || ""), await Te(), D.value = S.value ? ie(S.value, _, q.value) : _, K.value += 1);
    }
    async function Ie() {
      F.value && await ne(F.value.key, !0);
    }
    function ve(_ = "") {
      Q = !0, C.value = _ === W.value ? "" : _, x.value = !1, M.value = !1;
    }
    function ge() {
      Q = !0, C.value = null, x.value = !1;
    }
    function qe(_) {
      N.value || (N.value = !0, B.value = "2d", z.value = _);
    }
    return Oe(() => x.value ? (x.value = !1, !0) : P.value ? (ge(), !0) : H.value ? (H.value = "", !0) : q.value ? (ae(ce.value?.parent || ""), !0) : !1), (_, u) => (l(), o("main", { class: U(["map-app", {
      "has-view-switch": S.value?.locations.length,
      "is-scene-view": P.value
    }]) }, [
      e("div", $l, [
        e("header", wl, [
          $(j, { name: P.value ? "layers" : "search" }, null, 8, ["name"]),
          P.value ? (l(), o("div", _l, [R(h(J.value?.name || "当前场景"), 1), e("small", null, h(C.value ? "正在查看已记录的场景" : "看看你身边的布局"), 1)])) : (l(), o("button", {
            key: 0,
            type: "button",
            class: "map-search-entry",
            disabled: !S.value?.locations.length,
            onClick: u[0] || (u[0] = (b) => M.value = !0)
          }, [...u[25] || (u[25] = [R("想去哪里？", -1), e("small", null, "搜索世界中的地点", -1)])], 8, xl)),
          e("button", {
            type: "button",
            class: "map-round-button",
            "aria-label": "地图设置",
            onClick: u[1] || (u[1] = (b) => y.value = !0)
          }, [$(j, { name: "more" })])
        ]),
        S.value?.locations.length ? (l(), o("div", Cl, [e("nav", Sl, [e("button", {
          type: "button",
          "aria-pressed": !P.value,
          onClick: ge
        }, [$(j, { name: "globe" }), u[26] || (u[26] = R("世界地图", -1))], 8, jl), e("button", {
          type: "button",
          "aria-pressed": P.value,
          onClick: u[2] || (u[2] = (b) => ve())
        }, [$(j, { name: "layers" }), R(h(C.value ? "场景地图" : "当前场景"), 1)], 8, Al)]), P.value ? (l(), o("div", Bl, [C.value ? (l(), o("button", {
          key: 0,
          type: "button",
          class: "map-round-button",
          "aria-label": "回到当前场景",
          onClick: u[3] || (u[3] = (b) => ve())
        }, [$(j, { name: "locate" })])) : f("", !0), e("button", {
          type: "button",
          class: "map-round-button",
          "aria-expanded": x.value,
          "aria-label": "地图图例",
          onClick: u[4] || (u[4] = (b) => x.value = !x.value)
        }, [$(j, { name: "layers" })], 8, El)])) : f("", !0)])) : f("", !0),
        S.value?.locations.length && !P.value ? (l(), o("nav", Pl, [e("button", {
          type: "button",
          onClick: u[5] || (u[5] = (b) => ae(""))
        }, [$(j, { name: "globe" }), u[27] || (u[27] = R("世界", -1))]), (l(!0), o(A, null, T(He.value, (b) => (l(), o(A, { key: b.key }, [$(j, { name: "next" }), e("button", {
          type: "button",
          onClick: (X) => ae(b.key)
        }, h(b.name), 9, Hl)], 64))), 128))])) : f("", !0),
        c(m) ? (l(), o("div", Il, [u[28] || (u[28] = e("span", null, null, -1)), R(h(c(m)), 1)])) : f("", !0),
        z.value ? (l(), o("aside", ql, [e("p", null, h(z.value), 1), e("button", {
          type: "button",
          class: "map-notice-close",
          "aria-label": "关闭三维提示",
          onClick: u[6] || (u[6] = (b) => z.value = "")
        }, [$(j, { name: "close" })])])) : f("", !0),
        c(r) || c(k) || c(n).status === "conflict" ? (l(), o("aside", {
          key: 4,
          class: U(["map-notice", { "is-error": c(p) }]),
          role: "status"
        }, [e("p", null, h(c(r) || (c(k) ? "保存结果尚未确认。" : "保存的版本不一致。")), 1), c(k) ? (l(), o("button", {
          key: 0,
          type: "button",
          disabled: c(a),
          onClick: u[7] || (u[7] = (...b) => c(g) && c(g)(...b))
        }, "核实保存结果", 8, Kl)) : c(n).status === "conflict" ? (l(), o(A, { key: 1 }, [u[29] || (u[29] = e("small", null, "恢复会放弃尚未保存的更改，并使用当前聊天已保存的 OS 数据（不只是地图）。", -1)), e("button", {
          type: "button",
          disabled: c(a),
          onClick: u[8] || (u[8] = (...b) => c(I) && c(I)(...b))
        }, "放弃未保存更改并恢复", 8, Rl)], 64)) : c(n).status === "error" || c(n).status === "blocked" ? (l(), o("button", {
          key: 2,
          type: "button",
          disabled: c(a),
          onClick: u[9] || (u[9] = (...b) => c(t) && c(t)(...b))
        }, "重新读取", 8, Tl)) : (l(), o("button", {
          key: 3,
          type: "button",
          class: "map-notice-close",
          "aria-label": "关闭地图提示",
          onClick: u[10] || (u[10] = (...b) => c(d) && c(d)(...b))
        }, [$(j, { name: "close" })]))], 2)) : f("", !0)
      ]),
      e("div", { class: U(["map-canvas", { "has-detail": G.value && !P.value }]) }, [c(n).map && S.value?.locations.length ? (l(), o(A, { key: 0 }, [
        me($(kt, {
          atlas: c(n).map.atlas,
          region: q.value,
          "current-location-key": W.value,
          "selected-location-key": H.value,
          "focus-key": D.value,
          "focus-sequence": K.value,
          onSelect: u[11] || (u[11] = (b) => ne(b))
        }, null, 8, [
          "atlas",
          "region",
          "current-location-key",
          "selected-location-key",
          "focus-key",
          "focus-sequence"
        ]), [[Ce, !P.value]]),
        P.value ? (l(), o(A, { key: 0 }, [be.value?.status === "active" ? (l(), Z(Ka, {
          key: 0,
          mode: B.value,
          "onUpdate:mode": u[12] || (u[12] = (b) => B.value = b),
          scene: be.value,
          "three-unavailable": N.value,
          onFallback: qe
        }, null, 8, [
          "mode",
          "scene",
          "three-unavailable"
        ])) : (l(), o("div", Vl, [
          $(j, { name: "layers" }),
          e("h2", null, h(J.value ? "这里的布局还没画出来" : "还不知道你在哪里"), 1),
          e("p", null, h(J.value ? "更新地图后，会结合设定与剧情补齐这里的普通布局。" : "更新地图后，会根据剧情确认你所在的地方。"), 1),
          e("button", {
            type: "button",
            class: "map-secondary-button",
            disabled: !!c(v),
            onClick: u[13] || (u[13] = (...b) => c(O) && c(O)(...b))
          }, h(c(a) ? "正在更新…" : "更新地图"), 9, Ll),
          c(v) && !c(a) ? (l(), o("p", Ol, h(c(v)), 1)) : f("", !0)
        ]))], 64)) : f("", !0),
        !P.value && !de.value.length ? (l(), o("div", zl, [
          $(j, { name: "pin" }),
          u[30] || (u[30] = e("h2", null, "这里还没有标出更多地点", -1)),
          u[31] || (u[31] = e("p", null, "可以先看看其他区域，或更新地图补充。", -1)),
          e("button", {
            type: "button",
            class: "map-secondary-button",
            onClick: u[14] || (u[14] = (b) => ae(ce.value?.parent || ""))
          }, "查看上级区域")
        ])) : f("", !0)
      ], 64)) : (l(), o("div", Nl, [
        e("span", Ql, [$(j, { name: "globe" })]),
        u[32] || (u[32] = e("small", null, "故事之外，还有一整个世界", -1)),
        e("h1", null, h(c(n).status === "loading" ? "正在打开地图…" : "下一站，去哪里？"), 1),
        u[33] || (u[33] = e("p", null, [
          R("把世界设定画成地图，"),
          e("br"),
          R("也为留白的地方添上值得探索的去处。")
        ], -1)),
        c(n).status !== "loading" ? (l(), o("button", {
          key: 0,
          type: "button",
          class: "map-primary-button",
          disabled: !!c(v),
          onClick: u[15] || (u[15] = (...b) => c(Y) && c(Y)(...b))
        }, h(c(a) ? c(m) || "正在准备…" : "绘制世界地图"), 9, Dl)) : f("", !0),
        c(v) && !c(a) ? (l(), o("p", Zl, h(c(v)), 1)) : f("", !0)
      ]))], 2),
      S.value?.locations.length && !P.value ? (l(), o("div", {
        key: 0,
        class: U(["map-floating-tools", { "has-detail": G.value }])
      }, [e("button", {
        type: "button",
        class: "map-round-button",
        disabled: !F.value,
        "aria-label": "回到我的位置",
        onClick: Ie
      }, [$(j, { name: "locate" })], 8, Ul), e("button", {
        type: "button",
        class: "map-round-button",
        "aria-expanded": x.value,
        "aria-label": "地图图例",
        onClick: u[16] || (u[16] = (b) => x.value = !x.value)
      }, [$(j, { name: "layers" })], 8, Wl)], 2)) : f("", !0),
      x.value ? (l(), o("aside", Yl, [...u[34] || (u[34] = [
        e("strong", null, "读懂这张地图", -1),
        e("p", null, [
          e("i", { class: "map-key-current" }),
          R("你在这里 "),
          e("i", { class: "map-key-place" }),
          R("可探索地点")
        ], -1),
        e("p", null, "路线连接已记录的地点；箭头表示单向通行。", -1),
        e("small", null, "世界图展示区域与地点，不按实际比例。场景图展示一个地点的内部布局。", -1)
      ])])) : f("", !0),
      G.value && c(n).map && !P.value ? (l(), Z(gl, {
        key: G.value.key,
        location: G.value,
        map: c(n).map,
        "current-key": W.value,
        onClose: u[17] || (u[17] = (b) => H.value = ""),
        onScene: u[18] || (u[18] = (b) => ve(G.value.key)),
        onExplore: u[19] || (u[19] = (b) => ae(G.value.key)),
        onSelect: u[20] || (u[20] = (b) => ne(b, !0))
      }, null, 8, [
        "location",
        "map",
        "current-key"
      ])) : S.value?.locations.length && !P.value ? (l(), o("footer", Fl, [
        e("span", Xl, [$(j, { name: "compass" })]),
        e("div", null, [e("h1", null, h(ce.value?.name || "世界地图"), 1), e("p", null, h(de.value.length) + " 个地点 · " + h(ke.value ? ke.value + " 处还没去过" : "看看熟悉的地方有什么变化"), 1)]),
        e("button", {
          type: "button",
          class: "map-round-button",
          "aria-label": "浏览全部地点",
          onClick: u[21] || (u[21] = (b) => M.value = !0)
        }, [$(j, { name: "next" })])
      ])) : P.value && S.value?.locations.length ? (l(), o("footer", Gl, [$(j, { name: "layers" }), e("span", null, [e("strong", null, h(J.value?.name || "当前位置待确认"), 1), e("small", null, h(C.value ? "正在查看场景图 · 不会移动人物" : "当前位置的场景图"), 1)])])) : f("", !0),
      M.value && S.value ? (l(), Z(il, {
        key: 5,
        atlas: S.value,
        onClose: u[22] || (u[22] = (b) => M.value = !1),
        onSelect: u[23] || (u[23] = (b) => ne(b, !0))
      }, null, 8, ["atlas"])) : f("", !0),
      y.value ? (l(), Z(Xa, {
        key: 6,
        "auto-maintenance": c(n).autoMaintenance,
        busy: c(a),
        "refresh-disabled": c(k),
        "auto-toggle-busy": c(i) !== null,
        "disabled-reason": c(v),
        "has-map": !!c(n).map,
        status: c(m),
        "maintenance-message": c(n).maintenanceMessage || "",
        "maintenance-error": c(n).maintenanceStatus === "error",
        notice: c(r),
        "notice-error": c(p),
        onClose: u[24] || (u[24] = (b) => y.value = !1),
        onSetAuto: c(V),
        onUpdate: c(O),
        onRebuild: c(Y),
        onRefresh: c(t)
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
      ])) : f("", !0)
    ], 2));
  }
}), cs = Jl;
export {
  cs as default
};
