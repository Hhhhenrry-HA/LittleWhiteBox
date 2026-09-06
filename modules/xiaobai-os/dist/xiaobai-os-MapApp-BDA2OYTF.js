/* eslint-disable */
import { B as D, C as se, D as Te, E as Z, H as b, I as H, M as xe, N as _e, R as Be, T as l, V as ge, _ as S, a as He, b as Ke, c as X, d as n, f as W, g as N, h as qe, j as ve, k as he, l as O, m as r, o as ze, p as k, s as ke, u as $, v as Y, x as Ce, z as p } from "./xiaobai-os-runtime-dom.esm-bundler-DwdCK5Jt.js";
var Le = { class: "map-viewport" }, Ne = ["viewBox", "aria-label"], Ve = {
  class: "map-viewport-controls",
  "aria-label": "地图缩放"
}, Ze = /* @__PURE__ */ Y({
  __name: "MapViewport",
  props: {
    viewBox: {},
    resetKey: { default: "" },
    label: {},
    focusPoint: { default: void 0 },
    focusSequence: { default: 0 }
  },
  setup(e) {
    const s = e, o = H(null), t = H([...s.viewBox]), u = H([0, 0]), v = $(() => u.value[0] && u.value[1] ? Math.max(t.value[2] / u.value[0], t.value[3] / u.value[1]) : 1);
    let f;
    se(() => {
      f = new ResizeObserver((m) => {
        const j = m[0].contentRect;
        u.value = [j.width, j.height];
      }), o.value && f.observe(o.value);
    });
    const i = /* @__PURE__ */ new Map();
    let c = null, d = [0, 0], a = 0, y = null, x = !1, R = !1, B = null;
    const Q = $(() => t.value.join(" "));
    function K() {
      t.value = [...s.viewBox];
    }
    function T() {
      return v.value;
    }
    function w(m, j) {
      const I = o.value?.getBoundingClientRect();
      if (!I) return [t.value[0], t.value[1]];
      const q = T();
      return [t.value[0] + t.value[2] / 2 + (m - I.left - I.width / 2) * q, t.value[1] + t.value[3] / 2 + (j - I.top - I.height / 2) * q];
    }
    function g(m, j) {
      const I = Math.max(1, s.viewBox[2]), q = Math.min(I * 3, Math.max(Math.min(I * 0.24, 240), t.value[2] * m)), U = q / t.value[2], F = j || [t.value[0] + t.value[2] / 2, t.value[1] + t.value[3] / 2];
      t.value = [
        F[0] - (F[0] - t.value[0]) * U,
        F[1] - (F[1] - t.value[1]) * U,
        q,
        t.value[3] * U
      ];
    }
    function V() {
      if (!s.focusPoint) return;
      const m = Math.min(t.value[2], 620), j = t.value[3] * m / t.value[2];
      t.value = [
        s.focusPoint[0] - m / 2,
        s.focusPoint[1] - j / 2,
        m,
        j
      ];
    }
    function L() {
      const m = [...i.values()];
      m.length === 1 && (c = m[0], d = [t.value[0], t.value[1]]), m.length === 2 && (a = Math.hypot(m[1][0] - m[0][0], m[1][1] - m[0][1]), y = [(m[0][0] + m[1][0]) / 2, (m[0][1] + m[1][1]) / 2], x = !0);
    }
    function z(m) {
      m.button !== 0 || i.size >= 2 || (i.size || (x = !1), i.set(m.pointerId, [m.clientX, m.clientY]), m.target.setPointerCapture(m.pointerId), L());
    }
    function P(m) {
      if (!i.has(m.pointerId)) return;
      i.set(m.pointerId, [m.clientX, m.clientY]);
      const j = [...i.values()];
      if (j.length === 2 && y) {
        const I = Math.hypot(j[1][0] - j[0][0], j[1][1] - j[0][1]), q = [(j[0][0] + j[1][0]) / 2, (j[0][1] + j[1][1]) / 2];
        I > 0 && a > 0 && g(a / I, w(...y)), t.value[0] -= (q[0] - y[0]) * T(), t.value[1] -= (q[1] - y[1]) * T(), a = I, y = q;
      } else if (c) {
        const I = m.clientX - c[0], q = m.clientY - c[1];
        Math.abs(I) + Math.abs(q) > 4 && (x = !0), t.value = [
          d[0] - I * T(),
          d[1] - q * T(),
          t.value[2],
          t.value[3]
        ];
      }
    }
    function A(m) {
      if (!i.delete(m.pointerId)) return;
      const j = m.target;
      j.hasPointerCapture(m.pointerId) && j.releasePointerCapture(m.pointerId), L(), i.size || (c = null, y = null), x && (R = !0, B && clearTimeout(B), B = setTimeout(() => {
        R = !1;
      }, 0));
    }
    function _(m) {
      R && (m.preventDefault(), m.stopPropagation());
    }
    return ve(() => s.resetKey, K, { immediate: !0 }), ve(() => s.focusSequence, V, { flush: "post" }), Ce(() => {
      f?.disconnect(), B && clearTimeout(B);
    }), (m, j) => (l(), r("div", Le, [(l(), r("svg", {
      ref_key: "svg",
      ref: o,
      class: "map-viewport-svg",
      viewBox: Q.value,
      preserveAspectRatio: "xMidYMid meet",
      role: "group",
      "aria-label": e.label,
      onWheel: j[0] || (j[0] = X((I) => g(I.deltaY < 0 ? 0.84 : 1.19, w(I.clientX, I.clientY)), ["prevent"])),
      onPointerdown: z,
      onPointermove: P,
      onPointerup: A,
      onPointercancel: A,
      onClickCapture: _
    }, [Te(m.$slots, "default", { unitScale: v.value })], 40, Ne)), n("div", Ve, [
      n("button", {
        type: "button",
        "aria-label": "放大地图",
        onClick: j[1] || (j[1] = (I) => g(0.8))
      }, "+"),
      n("button", {
        type: "button",
        "aria-label": "缩小地图",
        onClick: j[2] || (j[2] = (I) => g(1.25))
      }, "−"),
      n("button", {
        type: "button",
        class: "map-fit",
        onClick: K
      }, "全图")
    ])]));
  }
}), Se = Ze, Qe = {
  class: "map-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.7",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, De = ["d"], Ye = /* @__PURE__ */ Y({
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
    return (o, t) => (l(), r("svg", Qe, [n("path", { d: s[e.name] || s.pin }, null, 8, De)]));
  }
}), E = Ye;
function fe(e, s) {
  const o = new Map(e.locations.map((v) => [v.key, v])), t = [];
  let u = o.get(s);
  for (; u; )
    t.unshift(u), u = u.parent ? o.get(u.parent) : void 0;
  return t;
}
function Me(e) {
  const s = e.locations.filter((o) => !o.parent);
  return s.length === 1 && e.locations.some((o) => o.parent === s[0].key) ? s[0].key : "";
}
function ie(e, s, o) {
  return fe(e, s).find((t) => (t.parent || "") === o)?.key || "";
}
function Ge(e, s) {
  return e.links.flatMap((o) => {
    if (o.from !== s && o.to !== s) return [];
    const t = e.locations.find((u) => u.key === (o.from === s ? o.to : o.from));
    return t ? [{
      location: t,
      link: o,
      outgoing: o.bidirectional || o.from === s
    }] : [];
  });
}
function Xe(e, s) {
  const o = e.locations.filter((d) => (d.parent || "") === s).sort((d, a) => d.key.localeCompare(a.key, "en")), t = o.filter((d) => d.position).map((d) => ({
    location: d,
    x: d.position[0],
    y: d.position[1],
    placed: !0
  }));
  let u = 0;
  for (const d of o.filter((a) => !a.position)) {
    let a, y;
    do {
      const x = u * 2.3999632297, R = 155 * Math.sqrt(u++);
      a = Math.round(500 + Math.cos(x) * R), y = Math.round(420 + Math.sin(x) * R);
    } while (t.some((x) => Math.hypot(x.x - a, x.y - y) < 160));
    t.push({
      location: d,
      x: a,
      y,
      placed: !1
    });
  }
  t.sort((d, a) => d.location.key.localeCompare(a.location.key, "en"));
  const v = new Map(t.map((d) => [d.location.key, d])), f = e.links.flatMap((d) => {
    const a = v.get(ie(e, d.from, s)), y = v.get(ie(e, d.to, s));
    if (!a || !y || a === y) return [];
    const x = (a.x + y.x) / 2, R = (a.y + y.y) / 2;
    return [{
      link: d,
      from: a,
      to: y,
      x,
      y: R,
      path: `M ${a.x} ${a.y} Q ${x + (y.y - a.y) * 0.12} ${R - (y.x - a.x) * 0.12} ${y.x} ${y.y}`
    }];
  }), i = t.length ? Math.min(...t.map((d) => d.x)) - 140 : 0, c = t.length ? Math.min(...t.map((d) => d.y)) - 150 : 0;
  return {
    nodes: t,
    routes: f,
    viewBox: [
      i,
      c,
      t.length ? Math.max(420, Math.max(...t.map((d) => d.x)) - i + 140) : 800,
      t.length ? Math.max(500, Math.max(...t.map((d) => d.y)) - c + 190) : 900
    ]
  };
}
var Fe = {
  class: "map-landscapes",
  "aria-hidden": "true"
}, We = ["transform"], Ue = {
  class: "map-world-roads",
  "aria-hidden": "true"
}, Je = ["d"], et = ["d", "marker-end"], tt = ["x", "y"], at = [
  "transform",
  "aria-label",
  "onClick",
  "onKeydown"
], nt = { transform: "translate(-14 -20)" }, st = {
  y: "64",
  class: "map-place-name"
}, lt = {
  key: 0,
  y: "89",
  class: "map-place-status"
}, ot = {
  key: 1,
  y: "89",
  class: "map-place-status"
}, rt = /* @__PURE__ */ Y({
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
  setup(e) {
    const s = e, o = $(() => Xe(s.atlas, s.region)), t = $(() => ie(s.atlas, s.currentLocationKey, s.region)), u = $(() => o.value.nodes.find((i) => i.location.key === s.focusKey)), v = "map-arrow-" + he();
    function f(i, c) {
      return i === "water" ? "water" : i === "forest" ? "tree" : i === "mountain" ? "mountain" : ["world", "region"].includes(c) ? "globe" : c === "outdoor" ? "compass" : "building";
    }
    return (i, c) => (l(), W(Se, {
      "view-box": o.value.viewBox,
      "reset-key": e.region,
      label: "世界地图",
      "focus-point": u.value ? [u.value.x, u.value.y] : void 0,
      "focus-sequence": e.focusSequence
    }, {
      default: xe(({ unitScale: d }) => [
        n("defs", null, [n("marker", {
          id: v,
          viewBox: "0 0 10 10",
          refX: "16",
          refY: "5",
          markerWidth: "5",
          markerHeight: "5",
          orient: "auto"
        }, [...c[0] || (c[0] = [n("path", {
          d: "M1 1l8 4-8 4z",
          fill: "var(--map-road-ink)"
        }, null, -1)])])]),
        n("g", Fe, [(l(!0), r(O, null, Z(o.value.nodes, (a) => (l(), r("g", {
          key: a.location.key,
          transform: `translate(${a.x} ${a.y})`,
          class: D(`is-${a.location.terrain || "urban"}`)
        }, [...c[1] || (c[1] = [n("path", { d: "M-108-20Q-100-100-32-94T87-56Q127-13 99 48T21 99Q-57 113-90 65T-108-20Z" }, null, -1), n("path", {
          class: "map-contour",
          d: "M-133-22Q-124-126-39-116T110-70Q156-17 124 60T26 123Q-71 139-112 81T-133-22Z"
        }, null, -1)])], 10, We))), 128))]),
        n("g", Ue, [(l(!0), r(O, null, Z(o.value.routes, (a) => (l(), r("g", {
          key: a.link.id,
          class: D({
            "is-path": a.link.kind === "path",
            "is-portal": a.link.kind === "portal"
          })
        }, [
          n("path", {
            class: "map-road-casing",
            d: a.path
          }, null, 8, Je),
          n("path", {
            class: "map-road-line",
            d: a.path,
            "marker-end": a.link.bidirectional ? void 0 : `url(#${v})`
          }, null, 8, et),
          a.link.label ? (l(), r("text", {
            key: 0,
            x: a.x,
            y: a.y - 14
          }, b(a.link.label), 9, tt)) : k("", !0)
        ], 2))), 128))]),
        (l(!0), r(O, null, Z(o.value.nodes, (a) => (l(), r("g", {
          key: a.location.key,
          class: D(["map-place", {
            "is-selected": a.location.key === e.selectedLocationKey,
            "is-current": a.location.key === t.value,
            "is-unvisited": a.location.status !== "visited"
          }]),
          transform: `translate(${a.x} ${a.y}) scale(${d * 0.5})`,
          role: "button",
          tabindex: "0",
          "aria-label": `查看${a.location.name}`,
          onClick: X((y) => i.$emit("select", a.location.key), ["stop"]),
          onKeydown: [ke(X((y) => i.$emit("select", a.location.key), ["stop"]), ["enter"]), ke(X((y) => i.$emit("select", a.location.key), ["stop", "prevent"]), ["space"])]
        }, [
          c[2] || (c[2] = n("circle", {
            class: "map-pin-halo",
            r: "39"
          }, null, -1)),
          c[3] || (c[3] = n("path", {
            class: "map-pin-body",
            d: "M0 33C-6 25-26 8-26-6a26 26 0 0 1 52 0C26 8 6 25 0 33Z"
          }, null, -1)),
          n("g", nt, [S(E, {
            name: f(a.location.terrain, a.location.scale),
            width: "28",
            height: "28"
          }, null, 8, ["name"])]),
          n("text", st, b(a.location.name.length > 14 ? a.location.name.slice(0, 13) + "…" : a.location.name), 1),
          a.location.key === t.value ? (l(), r("text", lt, "你在这里")) : a.location.status !== "visited" ? (l(), r("text", ot, "未到访")) : k("", !0),
          n("title", null, b(a.location.name) + b(a.location.brief ? " · " + a.location.brief : ""), 1)
        ], 42, at))), 128))
      ]),
      _: 1
    }, 8, [
      "view-box",
      "reset-key",
      "focus-point",
      "focus-sequence"
    ]));
  }
}), it = rt, ae;
async function ut() {
  if (!ae) {
    const e = [
      "..",
      "..",
      "..",
      "libs",
      "material-symbols",
      "material-symbols-rounded.woff2"
    ].join("/"), s = new URL(e, import.meta.url);
    ae = new FontFace("Xiaobai Map Symbols", `url("${s.href}")`, {
      display: "block",
      weight: "400"
    }).load(), ae.catch(() => {
      ae = void 0;
    });
  }
  document.fonts.add(await ae);
}
var Yn = Object.freeze([
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
]), Gn = Object.freeze([
  "rect",
  "circle",
  "path",
  "curve",
  "icon",
  "label"
]), Xn = Object.freeze([
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
]), ct = Object.freeze([
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
]), Fn = Object.freeze([
  "confirmed",
  "inferred",
  "unknown"
]), Wn = Object.freeze([
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
]), Un = Object.freeze(/* @__PURE__ */ new Set([
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
])), dt = Object.freeze({
  unknown: "#bfc5b6",
  wood: "#c4a477",
  stone: "#bac0ad",
  tile: "#ccd2bf",
  carpet: "#b49d91",
  "bed-sheet": "#e0dcca",
  fabric: "#acb69e",
  tatami: "#bebd8f",
  sand: "#ded0a1",
  marble: "#dce0d3",
  blood: "#ab6260",
  water: "#86bdb9",
  grass: "#c7d4ae",
  forest: "#91ac7d",
  glass: "#b5d5ce",
  dirt: "#bda989",
  snow: "#e6eee1",
  metal: "#aabec0",
  rune: "#aca0be",
  "warm-light": "#e3c28c",
  "cold-light": "#afced6",
  shadow: "#758079"
});
function je(e, s) {
  return `url(#${s}-material-${e || "unknown"})`;
}
function vt(e, s) {
  return `url(#${s}-face-${e || "unknown"})`;
}
function ne(e) {
  return `color-mix(in srgb, ${dt[e]}, var(--map-surface) var(--scene-material-mix))`;
}
var pt = ["id"], ht = ["stop-color", "stop-opacity"], ft = ["stop-color", "stop-opacity"], yt = ["stop-color", "stop-opacity"], mt = ["id"], bt = ["fill", "fill-opacity"], gt = {
  fill: "none",
  stroke: "var(--scene-shadow)",
  "stroke-width": ".65",
  opacity: ".24"
}, kt = {
  key: 1,
  d: "M0 0H48V32H0ZM19 0V17M0 17H48M36 17V32M3 3h12m8 0h21"
}, Mt = {
  key: 2,
  d: "M0 0H48V32H0ZM24 0V32M0 16H48M12 4l5 4-5 4-5-4ZM36 20l5 4-5 4-5-4Z"
}, wt = {
  key: 3,
  d: "M-3 3 8 11l17 2 9 10 18 3M27-3l-8 12 3 8-7 17",
  opacity: ".65"
}, $t = {
  key: 4,
  d: "M3 8q6 3 13 0M25 25q7 2 17-1",
  stroke: "var(--scene-highlight)",
  "stroke-width": "1.3",
  opacity: "1"
}, xt = {
  key: 5,
  d: "M5 32 37 0M12 32 44 0",
  stroke: "var(--scene-highlight)",
  "stroke-width": "2.2"
}, _t = {
  key: 6,
  d: "M8 15l-2-4m2 4 3-3M36 26l-1-4m1 4 3-3"
}, Ct = {
  key: 7,
  d: "M5 8h1m20-2h2m-12 17h2m23-6h1m-5 12h2",
  "stroke-linecap": "round"
}, St = {
  key: 8,
  d: "M0 0H48V32H0M0 5H48M0 27H48M5 5v1m38-1v1m-38 20v1m38-1v1"
}, jt = {
  key: 9,
  d: "M0 5H48M0 13H48M0 21H48M0 29H48M4 0v32m8-32v32m8-32v32m8-32v32m8-32v32m8-32v32",
  opacity: ".55"
}, Et = {
  key: 10,
  d: "m24 5 8 11-8 11-8-11ZM24 10v12M20 16h8"
}, Ot = {
  key: 11,
  d: "M7 8q12-5 16 6t20 7M4 27l6-3"
}, At = {
  key: 12,
  d: "M5 19q5-3 11-1M29 8q6-2 12 1",
  stroke: "var(--scene-highlight)",
  "stroke-width": "1.4"
}, It = {
  key: 0,
  d: "M0 1H48",
  stroke: "var(--scene-highlight)",
  "stroke-width": ".7",
  opacity: ".35"
}, Pt = ["id"], Rt = ["id"], Tt = ["transform", "fill"], Bt = /* @__PURE__ */ Y({
  __name: "SceneMaterials",
  props: { prefix: {} },
  setup(e) {
    return (s, o) => (l(), r("defs", null, [
      (l(!0), r(O, null, Z(p(ct), (t) => (l(), r(O, { key: t }, [n("linearGradient", {
        id: `${e.prefix}-face-${t}`,
        x1: "0",
        y1: "0",
        x2: ".7",
        y2: "1"
      }, [
        n("stop", {
          offset: "0",
          "stop-color": `color-mix(in srgb, ${p(ne)(t)}, var(--scene-highlight) 24%)`,
          "stop-opacity": t === "glass" ? 0.35 : 1
        }, null, 8, ht),
        n("stop", {
          offset: ".52",
          "stop-color": p(ne)(t),
          "stop-opacity": t === "glass" ? 0.16 : 1
        }, null, 8, ft),
        n("stop", {
          offset: "1",
          "stop-color": `color-mix(in srgb, ${p(ne)(t)}, var(--scene-shadow) 16%)`,
          "stop-opacity": t === "glass" ? 0.28 : 1
        }, null, 8, yt)
      ], 8, pt), n("pattern", {
        id: `${e.prefix}-material-${t}`,
        width: "48",
        height: "32",
        patternUnits: "userSpaceOnUse",
        class: "scene-texture"
      }, [
        n("rect", {
          width: "48",
          height: "32",
          fill: p(ne)(t),
          "fill-opacity": t === "glass" ? 0.4 : 1
        }, null, 8, bt),
        n("g", gt, [t === "wood" ? (l(), r(O, { key: 0 }, [o[0] || (o[0] = n("path", { d: "M0 0H48M0 16H48M19 0V16M37 16V32" }, null, -1)), o[1] || (o[1] = n("path", {
          d: "M3 7Q12 4 26 8T47 7M2 26q10-4 25 0t23-1",
          opacity: ".5"
        }, null, -1))], 64)) : t === "stone" ? (l(), r("path", kt)) : t === "tile" ? (l(), r("path", Mt)) : t === "marble" ? (l(), r("path", wt)) : t === "water" ? (l(), r("path", $t)) : t === "glass" ? (l(), r("path", xt)) : t === "grass" || t === "forest" ? (l(), r("path", _t)) : t === "dirt" || t === "sand" ? (l(), r("path", Ct)) : t === "metal" ? (l(), r("path", St)) : [
          "carpet",
          "fabric",
          "bed-sheet",
          "tatami"
        ].includes(t) ? (l(), r("path", jt)) : t === "rune" ? (l(), r("path", Et)) : t === "blood" ? (l(), r("path", Ot)) : t === "snow" ? (l(), r("path", At)) : k("", !0)]),
        t === "wood" || t === "stone" || t === "metal" ? (l(), r("path", It)) : k("", !0)
      ], 8, mt)], 64))), 128)),
      n("radialGradient", {
        id: `${e.prefix}-crown-face`,
        cx: ".32",
        cy: ".25",
        r: ".8"
      }, [...o[2] || (o[2] = [
        n("stop", {
          offset: "0",
          "stop-color": "var(--scene-leaf-light)"
        }, null, -1),
        n("stop", {
          offset: ".6",
          "stop-color": "var(--scene-leaf)"
        }, null, -1),
        n("stop", {
          offset: "1",
          "stop-color": "var(--scene-leaf-dark)"
        }, null, -1)
      ])], 8, Pt),
      (l(), r(O, null, Z(3, (t) => n("symbol", {
        id: `${e.prefix}-crown-${t - 1}`,
        key: t,
        viewBox: "0 0 100 100"
      }, [n("g", {
        transform: `rotate(${t * 37} 50 50)`,
        fill: `url(#${e.prefix}-crown-face)`,
        stroke: "var(--scene-leaf-dark)",
        "stroke-width": ".6"
      }, [...o[3] || (o[3] = [
        n("path", { d: "M49 5Q65 2 73 16Q91 14 93 36Q99 46 90 59Q95 76 76 81Q68 96 50 91Q30 97 23 82Q5 79 9 60Q-1 45 9 34Q7 17 28 16Q33 1 49 5Z" }, null, -1),
        n("circle", {
          cx: "34",
          cy: "32",
          r: "21"
        }, null, -1),
        n("circle", {
          cx: "69",
          cy: "36",
          r: "22"
        }, null, -1),
        n("circle", {
          cx: "30",
          cy: "62",
          r: "20"
        }, null, -1),
        n("circle", {
          cx: "64",
          cy: "67",
          r: "23"
        }, null, -1),
        n("circle", {
          cx: "49",
          cy: "48",
          r: "24"
        }, null, -1),
        n("path", {
          d: "M24 25q8-10 19-5M61 21q11-3 17 8M36 45q9-11 21-8M63 59q9-2 14 6",
          fill: "none",
          stroke: "var(--scene-leaf-light)",
          "stroke-width": "1.4",
          opacity: ".75"
        }, null, -1)
      ])], 8, Tt)], 8, Rt)), 64))
    ]));
  }
}), Ht = Bt, Kt = /* @__PURE__ */ new Set([
  "water",
  "terrain",
  "furniture",
  "decoration",
  "danger",
  "magic",
  "secret",
  "light"
]), qt = /* @__PURE__ */ new Set([
  "chair",
  "table",
  "bed",
  "counter",
  "shelf",
  "sofa",
  "bridge",
  "tree",
  "rock"
]), J = (e) => Number(e.toFixed(3)).toString(), ue = (e) => e.geometry.points || [];
function ye(e) {
  return ue(e).length >= 3 && (e.closed ?? Kt.has(e.category));
}
function le(e) {
  return e.category === "wall" || e.category === "grid" ? !1 : e.shape === "rect" || e.shape === "circle" ? !0 : (e.shape === "path" || e.shape === "curve") && ye(e);
}
function Ee(e) {
  return (e.shape === "rect" || e.shape === "circle") && (e.icon !== void 0 && qt.has(e.icon) || [
    "furniture",
    "decoration",
    "door"
  ].includes(e.category));
}
function Oe(e, s, o) {
  const t = e[o], u = e[(o + 1) % e.length], v = e[o - 1] || (s ? e[e.length - 1] : t), f = e[o + 2] || (s ? e[(o + 2) % e.length] : u), i = (c, d, a) => Math.max(Math.min(d, a), Math.min(Math.max(d, a), c));
  return [[i(t[0] + (u[0] - v[0]) / 6, t[0], u[0]), i(t[1] + (u[1] - v[1]) / 6, t[1], u[1])], [i(u[0] - (f[0] - t[0]) / 6, t[0], u[0]), i(u[1] - (f[1] - t[1]) / 6, t[1], u[1])]];
}
function zt(e) {
  if (e.shape === "rect") {
    const { x: v, y: f, width: i, height: c } = e.geometry;
    return `M ${v} ${f} h ${i} v ${c} h ${-i} Z`;
  }
  if (e.shape === "circle") {
    const { x: v, y: f, radius: i } = e.geometry;
    return `M ${v - i} ${f} a ${i} ${i} 0 1 0 ${i * 2} 0 a ${i} ${i} 0 1 0 ${-i * 2} 0 Z`;
  }
  const s = ue(e);
  if (s.length < 2) return "";
  const o = ye(e);
  if (e.shape === "path") return `M ${s.map(([v, f]) => `${J(v)} ${J(f)}`).join(" L ")}${o ? " Z" : ""}`;
  const t = [`M ${s[0].map(J).join(" ")}`], u = s.length;
  for (let v = 0; v < u - (o ? 0 : 1); v += 1) {
    const [f, i] = Oe(s, o, v), c = s[(v + 1) % u];
    t.push(`C ${f.map(J).join(" ")}, ${i.map(J).join(" ")}, ${c.map(J).join(" ")}`);
  }
  return t.join(" ") + (o ? " Z" : "");
}
function te(e) {
  if (e.shape === "rect") return { ...e.geometry };
  if (e.shape === "circle") {
    const { x: u, y: v, radius: f } = e.geometry;
    return {
      x: u - f,
      y: v - f,
      width: f * 2,
      height: f * 2
    };
  }
  const s = ue(e);
  if (!s.length) {
    const { x: u, y: v } = e.geometry;
    return {
      x: u,
      y: v,
      width: 0,
      height: 0
    };
  }
  const o = s.map((u) => u[0]), t = s.map((u) => u[1]);
  return {
    x: Math.min(...o),
    y: Math.min(...t),
    width: Math.max(...o) - Math.min(...o),
    height: Math.max(...t) - Math.min(...t)
  };
}
function Lt(e) {
  if (!e.rotation) return;
  const s = te(e);
  return `rotate(${e.rotation} ${s.x + s.width / 2} ${s.y + s.height / 2})`;
}
function we(e, s = 1) {
  const o = te(e), t = [o.x + o.width / 2, o.y + o.height / 2];
  if (e.shape === "label") return t;
  if (e.shape === "icon") return [t[0], t[1] + 23 * s];
  if ((e.category === "terrain" || e.category === "water") && le(e)) return t;
  if (e.shape === "path" || e.shape === "curve") {
    const f = ue(e), i = ye(e), c = f.length - (i ? 0 : 1), d = Array.from({ length: c }, (z, P) => Math.hypot(f[(P + 1) % f.length][0] - f[P][0], f[(P + 1) % f.length][1] - f[P][1]));
    let a = d.reduce((z, P) => z + P, 0) / 2, y = 0;
    for (; y < d.length - 1 && a > d[y]; )
      a -= d[y], y += 1;
    const x = f[y], R = f[(y + 1) % f.length], B = d[y] ? a / d[y] : 0.5;
    let Q = x[0] + (R[0] - x[0]) * B, K = x[1] + (R[1] - x[1]) * B, T = R[0] - x[0], w = R[1] - x[1];
    if (e.shape === "curve") {
      const [z, P] = Oe(f, i, y), A = 1 - B;
      Q = A ** 3 * x[0] + 3 * A ** 2 * B * z[0] + 3 * A * B ** 2 * P[0] + B ** 3 * R[0], K = A ** 3 * x[1] + 3 * A ** 2 * B * z[1] + 3 * A * B ** 2 * P[1] + B ** 3 * R[1], T = 3 * A ** 2 * (z[0] - x[0]) + 6 * A * B * (P[0] - z[0]) + 3 * B ** 2 * (R[0] - P[0]), w = 3 * A ** 2 * (z[1] - x[1]) + 6 * A * B * (P[1] - z[1]) + 3 * B ** 2 * (R[1] - P[1]);
    }
    const g = Math.hypot(T, w);
    if (!g) return [Q, K - 13 * s];
    let V = -w / g, L = T / g;
    return (L > 0 || L === 0 && V < 0) && (V = -V, L = -L), [Q + V * 13 * s, K + L * 13 * s];
  }
  const u = (e.rotation || 0) * Math.PI / 180, v = e.shape === "circle" ? o.height / 2 : (Math.abs(Math.sin(u)) * o.width + Math.abs(Math.cos(u)) * o.height) / 2;
  return [t[0], t[1] + v + 13 * s];
}
function Nt(e) {
  let s = 2166136261;
  for (const o of e) s = Math.imul(s ^ o.charCodeAt(0), 16777619);
  return s >>> 0;
}
function Vt(e) {
  const s = e.filter((t) => t.category === "terrain" && t.material === "forest" && le(t) && !Ee(t)).sort((t, u) => t.id < u.id ? -1 : t.id > u.id ? 1 : 0), o = /* @__PURE__ */ new Map();
  for (let t = 0; t < s.length; t += 1) {
    const u = s[t], v = te(u), f = Math.floor(256 / s.length) + (t < 256 % s.length ? 1 : 0), i = v.width && v.height ? Math.min(f, Math.max(1, Math.ceil(v.width * v.height / 2704))) : 0, c = Math.min(i, Math.max(1, Math.ceil(Math.sqrt(i * v.width / Math.max(1, v.height))))), d = Math.ceil(i / Math.max(1, c));
    let a = Nt(u.id);
    const y = () => (a = Math.imul(a, 1664525) + 1013904223 >>> 0, a / 4294967296), x = [];
    for (let R = 0; R < i; R += 1) x.push({
      x: v.x + (R % c + 0.5 + (y() - 0.5) * 0.35) * v.width / c,
      y: v.y + (Math.floor(R / c) + 0.5 + (y() - 0.5) * 0.35) * v.height / d,
      size: Math.min(Math.max(v.width / c, v.height / d), Math.min(v.width, v.height)) * (1.25 + y() * 0.35),
      variant: Math.floor(y() * 3)
    });
    o.set(u.id, x);
  }
  return o;
}
var Zt = [
  "x",
  "y",
  "width",
  "height"
], Qt = {
  key: 0,
  cx: "50",
  cy: "50",
  r: "50"
}, Dt = {
  key: 1,
  width: "100",
  height: "100"
}, Yt = ["clip-path", "fill"], Gt = {
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
}, Ft = ["fill"], Wt = ["fill"], Ut = ["d"], Jt = {
  key: 0,
  d: "M9 78H91",
  class: "scene-object-seam"
}, ea = ["x"], ta = /* @__PURE__ */ Y({
  __name: "SceneObject",
  props: {
    element: {},
    prefix: {},
    unitScale: {}
  },
  setup(e) {
    const s = e, o = $(() => te(s.element)), t = $(() => Math.min(o.value.width, o.value.height) / s.unitScale >= 12), u = $(() => s.element.shape === "circle"), v = $(() => s.element.material), f = $(() => vt(v.value, s.prefix)), i = $(() => je(v.value, s.prefix)), c = `scene-object-${he()}`;
    return (d, a) => (l(), r("svg", {
      x: o.value.x,
      y: o.value.y,
      width: o.value.width,
      height: o.value.height,
      viewBox: "0 0 100 100",
      preserveAspectRatio: "none",
      class: "scene-object"
    }, [n("defs", null, [n("clipPath", { id: c }, [u.value ? (l(), r("circle", Qt)) : (l(), r("rect", Dt))])]), n("g", {
      "clip-path": `url(#${c})`,
      fill: f.value
    }, [u.value ? (l(), r("circle", Gt)) : (l(), r("rect", Xt)), t.value ? (l(), r(O, { key: 2 }, [u.value ? (l(), r("circle", {
      key: 0,
      cx: "50",
      cy: "50",
      r: "44",
      fill: i.value,
      class: "scene-object-inset"
    }, null, 8, Ft)) : (l(), r("rect", {
      key: 1,
      x: "5",
      y: "5",
      width: "90",
      height: "90",
      rx: "2",
      fill: i.value,
      class: "scene-object-inset"
    }, null, 8, Wt)), e.element.icon === "table" || e.element.icon === "counter" ? (l(), r(O, { key: 2 }, [n("path", {
      d: u.value ? "M18 36A35 35 0 0 1 72 22" : "M8 13V8H92",
      class: "scene-object-shine"
    }, null, 8, Ut), e.element.icon === "counter" ? (l(), r("path", Jt)) : k("", !0)], 64)) : e.element.icon === "chair" ? (l(), r(O, { key: 3 }, [
      a[0] || (a[0] = n("rect", {
        x: "12",
        y: "29",
        width: "76",
        height: "61",
        rx: "9",
        class: "scene-object-inset"
      }, null, -1)),
      a[1] || (a[1] = n("rect", {
        x: "7",
        y: "5",
        width: "86",
        height: "23",
        rx: "6",
        class: "scene-object-edge"
      }, null, -1)),
      a[2] || (a[2] = n("path", {
        d: "M16 12H84",
        class: "scene-object-shine"
      }, null, -1))
    ], 64)) : e.element.icon === "bed" ? (l(), r(O, { key: 4 }, [
      a[3] || (a[3] = n("rect", {
        x: "10",
        y: "12",
        width: "80",
        height: "79",
        rx: "5",
        class: "scene-object-inset"
      }, null, -1)),
      a[4] || (a[4] = n("rect", {
        x: "20",
        y: "17",
        width: "60",
        height: "20",
        rx: "7",
        class: "scene-object-inset"
      }, null, -1)),
      a[5] || (a[5] = n("path", {
        d: "M12 45H88M17 82H83",
        class: "scene-object-seam"
      }, null, -1)),
      a[6] || (a[6] = n("path", {
        d: "M18 49H82",
        class: "scene-object-shine"
      }, null, -1))
    ], 64)) : e.element.icon === "shelf" ? (l(), r(O, { key: 5 }, [a[7] || (a[7] = n("path", {
      d: "M8 32H92M8 66H92M40 8V32M65 32V66M35 66V92",
      class: "scene-object-seam"
    }, null, -1)), a[8] || (a[8] = n("path", {
      d: "M8 34H92M8 68H92",
      class: "scene-object-shine"
    }, null, -1))], 64)) : e.element.icon === "sofa" ? (l(), r(O, { key: 6 }, [
      a[9] || (a[9] = n("rect", {
        x: "8",
        y: "5",
        width: "84",
        height: "25",
        rx: "7",
        class: "scene-object-inset"
      }, null, -1)),
      (l(), r(O, null, Z(3, (y) => n("rect", {
        key: y,
        x: 15 + (y - 1) * 24,
        y: "32",
        width: "22",
        height: "57",
        rx: "5",
        class: "scene-object-inset"
      }, null, 8, ea)), 64)),
      a[10] || (a[10] = n("rect", {
        x: "3",
        y: "23",
        width: "11",
        height: "70",
        rx: "4",
        class: "scene-object-inset"
      }, null, -1)),
      a[11] || (a[11] = n("rect", {
        x: "86",
        y: "23",
        width: "11",
        height: "70",
        rx: "4",
        class: "scene-object-inset"
      }, null, -1))
    ], 64)) : e.element.icon === "bridge" ? (l(), r(O, { key: 7 }, [a[12] || (a[12] = n("path", {
      d: "M7 7V93M93 7V93M9 20H91M9 35H91M9 50H91M9 65H91M9 80H91",
      class: "scene-object-seam"
    }, null, -1)), a[13] || (a[13] = n("path", {
      d: "M11 7V93M89 7V93",
      class: "scene-object-shine"
    }, null, -1))], 64)) : e.element.icon === "tree" ? (l(), r(O, { key: 8 }, [a[14] || (a[14] = qe('<circle cx="34" cy="32" r="24" class="scene-object-inset"></circle><circle cx="69" cy="36" r="24" class="scene-object-inset"></circle><circle cx="30" cy="62" r="23" class="scene-object-inset"></circle><circle cx="64" cy="67" r="25" class="scene-object-inset"></circle><circle cx="49" cy="48" r="26" class="scene-object-inset"></circle><path d="M21 24q10-10 22-4M36 41q8-9 22-6M64 56q8-1 13 5" class="scene-object-shine"></path>', 6))], 64)) : e.element.icon === "rock" ? (l(), r(O, { key: 9 }, [a[15] || (a[15] = n("path", {
      d: "M8 38 33 12 76 18 93 57 71 88 25 86ZM33 12 41 44 8 38M41 44 76 18M41 44 71 88M41 44 93 57",
      class: "scene-object-seam"
    }, null, -1)), a[16] || (a[16] = n("path", {
      d: "M12 38 33 17 72 22",
      class: "scene-object-shine"
    }, null, -1))], 64)) : k("", !0)], 64)) : k("", !0)], 8, Yt)], 8, Zt));
  }
}), aa = ta, na = Object.freeze({
  wall: {
    stroke: "var(--scene-edge)",
    fill: "none",
    width: 6
  },
  road: {
    stroke: "var(--scene-road)",
    fill: "var(--scene-road)",
    width: 8
  },
  water: {
    stroke: "var(--scene-water-edge)",
    fill: "var(--scene-water)",
    width: 3
  },
  terrain: {
    stroke: "var(--scene-soft-edge)",
    fill: "var(--scene-ground)",
    width: 0.8
  },
  furniture: {
    stroke: "var(--scene-edge)",
    fill: "var(--scene-object)",
    width: 1
  },
  decoration: {
    stroke: "var(--scene-soft-edge)",
    fill: "var(--scene-object)",
    width: 1
  },
  door: {
    stroke: "var(--map-accent)",
    fill: "var(--scene-object)",
    width: 2
  },
  danger: {
    stroke: "#ff6d7a",
    fill: "rgba(218, 52, 72, .24)",
    width: 2.6,
    dash: "7 4"
  },
  marker: {
    stroke: "#66d9ff",
    fill: "rgba(48, 166, 222, .22)",
    width: 2.2
  },
  actor: {
    stroke: "#f4f8ff",
    fill: "#167fc3",
    width: 2.2
  },
  label: {
    stroke: "none",
    fill: "#e9f4ff",
    width: 0
  },
  grid: {
    stroke: "#54738d",
    fill: "none",
    width: 1,
    dash: "2 5"
  },
  magic: {
    stroke: "#c18cff",
    fill: "rgba(139, 83, 213, .25)",
    width: 2.5
  },
  secret: {
    stroke: "#8198aa",
    fill: "rgba(74, 96, 113, .20)",
    width: 2,
    dash: "3 6"
  },
  light: {
    stroke: "#ffe49a",
    fill: "rgba(255, 210, 91, .22)",
    width: 1.5
  }
}), sa = Object.freeze({
  wall: "墙体",
  road: "道路",
  water: "水域",
  terrain: "地形",
  furniture: "家具",
  decoration: "陈设",
  door: "出入口",
  danger: "危险",
  marker: "标记",
  actor: "人物",
  label: "标注",
  grid: "网格",
  magic: "魔法",
  secret: "未知",
  light: "光源"
}), la = Object.freeze({
  door: "door_open",
  stairs: "stairs",
  elevator: "elevator",
  portal: "captive_portal",
  passage: "conversion_path",
  entrance: "login",
  exit: "exit_to_app",
  north: "north",
  south: "south",
  east: "east",
  west: "west",
  up: "arrow_upward",
  down: "arrow_downward",
  trap: "warning",
  chest: "inventory_2",
  marker: "location_on",
  player: "person_pin_circle",
  actor: "person"
}), oa = Object.freeze({
  door: "D",
  stairs: "S",
  elevator: "E",
  portal: "O",
  passage: "P",
  entrance: "I",
  exit: "O",
  north: "N",
  south: "S",
  east: "E",
  west: "W",
  up: "↑",
  down: "↓",
  trap: "!",
  chest: "X",
  marker: "+",
  player: "P",
  actor: "A"
}), ra = Object.freeze({
  "door-open": "door_open",
  stairs: "stairs",
  elevator: "elevator",
  portal: "captive_portal",
  passage: "conversion_path",
  entrance: "login",
  exit: "exit_to_app",
  north: "north",
  south: "south",
  east: "east",
  west: "west",
  up: "arrow_upward",
  down: "arrow_downward",
  trap: "warning",
  chest: "inventory_2",
  marker: "location_on",
  player: "person_pin_circle",
  actor: "person",
  chair: "chair",
  table: "table_restaurant",
  bed: "bed",
  counter: "countertops",
  shelf: "shelves",
  sofa: "weekend",
  bridge: "road",
  tree: "park",
  rock: "landscape",
  building: "apartment",
  fire: "local_fire_department",
  light: "lightbulb",
  water: "water_drop"
}), ia = Object.freeze({
  wall: "architecture",
  road: "route",
  water: "water_drop",
  terrain: "terrain",
  furniture: "chair",
  decoration: "category",
  door: "door_open",
  danger: "warning",
  marker: "location_on",
  actor: "person",
  label: "label",
  grid: "grid_on",
  magic: "auto_awesome",
  secret: "visibility_off",
  light: "lightbulb"
}), pe = Object.freeze({
  terrain: 10,
  water: 20,
  grid: 25,
  road: 30,
  wall: 40,
  furniture: 50,
  decoration: 52,
  door: 55,
  danger: 60,
  secret: 62,
  magic: 65,
  light: 70,
  marker: 80,
  actor: 85,
  label: 90
}), ua = Object.freeze({
  neutral: {
    background: "#071019",
    glow: "rgba(59, 157, 219, .13)",
    accent: "#55baff"
  },
  warm: {
    background: "#130e0b",
    glow: "rgba(235, 142, 65, .14)",
    accent: "#f2ad68"
  },
  cold: {
    background: "#07121b",
    glow: "rgba(88, 190, 231, .14)",
    accent: "#73d2f4"
  },
  dark: {
    background: "#05070a",
    glow: "rgba(92, 114, 137, .10)",
    accent: "#8aa6bd"
  },
  mystic: {
    background: "#0d0a17",
    glow: "rgba(156, 94, 231, .16)",
    accent: "#c89aff"
  },
  danger: {
    background: "#16090d",
    glow: "rgba(239, 66, 85, .15)",
    accent: "#ff7180"
  },
  calm: {
    background: "#071411",
    glow: "rgba(61, 189, 158, .13)",
    accent: "#69d8b8"
  }
}), Ae = Object.freeze({
  world: "世界",
  region: "区域",
  city: "城市",
  district: "区域",
  building: "建筑",
  floor: "楼层",
  room: "房间",
  outdoor: "户外"
}), ca = Object.freeze({
  door: "门",
  stairs: "楼梯",
  elevator: "电梯",
  path: "小径",
  road: "道路",
  portal: "传送门",
  passage: "通道"
});
function da(e, s) {
  return e < s ? -1 : e > s ? 1 : 0;
}
function va(e, s) {
  const o = na[e.category], t = le(e), u = t && (e.material || e.category === "water") ? je(e.material || "water", s) : "", v = e.certainty === "inferred" ? "8 6" : e.certainty === "unknown" ? "3 7" : o.dash;
  return {
    ...o,
    fill: t ? u || o.fill : "none",
    opacity: e.certainty === "unknown" ? 0.48 : e.certainty === "inferred" ? 0.72 : 1,
    dash: v,
    icon: e.icon ? ra[e.icon] : e.kind ? la[e.kind] : ia[e.category],
    fallback: e.kind ? oa[e.kind] : sa[e.category].slice(0, 1),
    z: pe[e.category]
  };
}
function pa(e) {
  const s = (o) => {
    if (!le(o)) return 0;
    const t = te(o);
    return t.width * t.height;
  };
  return [...e].sort((o, t) => pe[o.category] - pe[t.category] || s(t) - s(o) || da(o.id, t.id));
}
var ha = ["data-element", "opacity"], fa = ["transform"], ya = ["d"], ma = ["d", "stroke-width"], ba = [
  "d",
  "fill",
  "stroke",
  "stroke-width",
  "stroke-dasharray",
  "stroke-linecap"
], ga = [
  "d",
  "stroke",
  "stroke-opacity",
  "stroke-dasharray"
], ka = ["id"], Ma = ["d"], wa = ["clip-path"], $a = [
  "href",
  "x",
  "y",
  "width",
  "height"
], xa = ["transform"], _a = {
  key: 0,
  r: "19",
  class: "scene-player-halo"
}, Ca = ["stroke"], Sa = {
  key: 1,
  class: "map-material-symbol",
  "aria-hidden": "true"
}, ja = {
  key: 2,
  class: "map-symbol-fallback",
  "aria-hidden": "true"
}, Ea = ["x", "y"], Oa = /* @__PURE__ */ Y({
  __name: "MapScene",
  props: { scene: {} },
  setup(e) {
    const s = e, o = H(!1);
    se(() => {
      ut().then(() => {
        o.value = !0;
      }).catch(() => {
        o.value = !1;
      });
    });
    const t = `xiaobai-map-scene-${he()}`, u = $(() => ua[s.scene.mood || "neutral"]), v = $(() => Vt(s.scene.elements)), f = $(() => pa(s.scene.elements).map((i, c) => ({
      element: i,
      bounds: te(i),
      path: zt(i),
      transform: Lt(i),
      area: le(i),
      presentation: va(i, t),
      clipId: `${t}-area-${c}`,
      object: Ee(i)
    })));
    return (i, c) => (l(), W(Se, {
      class: "map-scene-viewport",
      style: ge({ "--scene-glow": u.value.glow }),
      "view-box": e.scene.viewBox,
      "reset-key": e.scene.key,
      label: `${e.scene.name} 场景地图`
    }, {
      default: xe(({ unitScale: d }) => [
        S(Ht, { prefix: t }),
        (l(!0), r(O, null, Z(f.value, (a) => (l(), r("g", {
          key: a.element.id,
          class: D(["map-scene-element", [`is-${a.element.category}`, `is-${a.element.certainty || "confirmed"}`]]),
          "data-element": a.element.id,
          opacity: a.presentation.opacity
        }, [n("g", { transform: a.transform }, [
          a.object ? (l(), W(aa, {
            key: 0,
            element: a.element,
            prefix: t,
            "unit-scale": d
          }, null, 8, ["element", "unit-scale"])) : a.path ? (l(), r(O, { key: 1 }, [
            a.element.category === "wall" ? (l(), r("path", {
              key: 0,
              d: a.path,
              fill: "none",
              stroke: "var(--scene-shadow)",
              "stroke-width": "9",
              opacity: ".18",
              "stroke-linejoin": "round",
              "vector-effect": "non-scaling-stroke"
            }, null, 8, ya)) : k("", !0),
            a.element.category === "road" && !a.area ? (l(), r("path", {
              key: 1,
              d: a.path,
              fill: "none",
              stroke: "var(--scene-soft-edge)",
              "stroke-width": a.presentation.width + 2,
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "vector-effect": "non-scaling-stroke"
            }, null, 8, ma)) : k("", !0),
            n("path", {
              d: a.path,
              fill: a.presentation.fill,
              stroke: a.presentation.stroke,
              "stroke-width": a.presentation.width,
              "stroke-dasharray": a.presentation.dash,
              "stroke-linejoin": "round",
              "stroke-linecap": a.element.category === "wall" ? "butt" : "round",
              "fill-rule": "evenodd",
              "vector-effect": "non-scaling-stroke"
            }, null, 8, ba),
            a.element.category === "wall" ? (l(), r("path", {
              key: 2,
              d: a.path,
              fill: "none",
              stroke: a.element.material ? p(ne)(a.element.material) : "var(--scene-wall)",
              "stroke-width": "3.5",
              "stroke-opacity": a.element.material === "glass" ? 0.4 : 1,
              "stroke-dasharray": a.presentation.dash,
              "stroke-linejoin": "round",
              "vector-effect": "non-scaling-stroke"
            }, null, 8, ga)) : k("", !0)
          ], 64)) : k("", !0),
          v.value.has(a.element.id) ? (l(), r(O, { key: 2 }, [n("defs", null, [n("clipPath", { id: a.clipId }, [n("path", {
            d: a.path,
            "clip-rule": "evenodd"
          }, null, 8, Ma)], 8, ka)]), n("g", {
            "clip-path": `url(#${a.clipId})`,
            class: "scene-forest-decoration",
            "aria-hidden": "true"
          }, [(l(!0), r(O, null, Z(v.value.get(a.element.id), (y, x) => (l(), r("use", {
            key: x,
            href: `#${t}-crown-${y.variant}`,
            x: y.x - y.size / 2,
            y: y.y - y.size / 2,
            width: y.size,
            height: y.size
          }, null, 8, $a))), 128))], 8, wa)], 64)) : k("", !0),
          a.element.shape === "icon" ? (l(), r("g", {
            key: 3,
            class: "map-scene-icon",
            transform: `translate(${a.bounds.x} ${a.bounds.y}) scale(${d})`
          }, [
            a.element.kind === "player" ? (l(), r("circle", _a)) : k("", !0),
            n("circle", {
              r: "11",
              stroke: a.presentation.stroke
            }, null, 8, Ca),
            o.value ? (l(), r("text", Sa, b(a.presentation.icon), 1)) : (l(), r("text", ja, b(a.presentation.fallback), 1))
          ], 8, xa)) : k("", !0)
        ], 8, fa)], 10, ha))), 128)),
        n("g", {
          class: "scene-labels",
          style: ge({ "--scene-unit-scale": d })
        }, [(l(!0), r(O, null, Z(f.value, (a) => (l(), r(O, { key: a.element.id }, [a.element.label ? (l(), r("text", {
          key: 0,
          class: D(["map-scene-label", { "is-primary": a.element.shape === "label" }]),
          x: p(we)(a.element, d)[0],
          y: p(we)(a.element, d)[1]
        }, b(a.element.label), 11, Ea)) : k("", !0)], 64))), 128))], 4)
      ]),
      _: 1
    }, 8, [
      "style",
      "view-box",
      "reset-key",
      "label"
    ]));
  }
}), Aa = Oa, Ia = { class: "map-dialog-header" }, Pa = { key: 0 }, Ra = { class: "map-settings-content" }, Ta = { class: "map-auto-setting" }, Ba = ["aria-checked", "disabled"], Ha = { class: "map-settings-section" }, Ka = ["disabled"], qa = { key: 0 }, za = { class: "map-settings-section" }, La = { key: 0 }, Na = ["disabled"], Va = {
  key: 0,
  class: "map-setting-note",
  role: "status"
}, Za = ["disabled"], Qa = /* @__PURE__ */ Y({
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
    const s = H(null);
    return se(() => s.value?.showModal()), (o, t) => (l(), r("dialog", {
      ref_key: "dialog",
      ref: s,
      class: "map-dialog map-settings",
      "aria-labelledby": "map-settings-title",
      onCancel: t[5] || (t[5] = X((u) => o.$emit("close"), ["prevent"])),
      onKeydown: t[6] || (t[6] = X(() => {
      }, ["stop"]))
    }, [
      n("header", Ia, [t[7] || (t[7] = n("div", null, [n("small", null, "让地图跟上你的故事"), n("h2", { id: "map-settings-title" }, "地图设置")], -1)), n("button", {
        type: "button",
        class: "map-round-button",
        "aria-label": "关闭地图设置",
        onClick: t[0] || (t[0] = (u) => o.$emit("close"))
      }, [S(E, { name: "close" })])]),
      e.status || e.notice || e.maintenanceMessage ? (l(), r("section", {
        key: 0,
        class: D(["map-settings-feedback", { "is-error": e.notice ? e.noticeError : e.maintenanceError }]),
        role: "status"
      }, [n("strong", null, b(e.notice ? e.notice === e.maintenanceMessage ? "最近一次更新" : "操作提示" : e.status || "最近一次更新"), 1), e.notice || e.maintenanceMessage ? (l(), r("p", Pa, b(e.notice || e.maintenanceMessage), 1)) : k("", !0)], 2)) : k("", !0),
      n("div", Ra, [
        n("section", Ta, [t[9] || (t[9] = n("div", null, [n("h3", null, "随对话自动更新"), n("p", null, "你发送下一条消息时，根据上一轮对话更新地图。适用于所有普通聊天。")], -1)), n("button", {
          type: "button",
          class: "map-switch",
          role: "switch",
          "aria-checked": e.autoMaintenance,
          "aria-label": "随对话自动更新",
          disabled: e.autoToggleBusy,
          onClick: t[1] || (t[1] = (u) => o.$emit("setAuto", !e.autoMaintenance))
        }, [...t[8] || (t[8] = [n("span", null, null, -1)])], 8, Ba)]),
        n("section", Ha, [
          S(E, { name: "refresh" }),
          t[10] || (t[10] = n("h3", null, "补充最近的变化", -1)),
          t[11] || (t[11] = n("p", null, "根据最近一轮对话更新位置和地点，并补全当前区域尚缺少的探索去处。", -1)),
          n("button", {
            type: "button",
            class: "map-primary-button",
            disabled: e.busy || !!e.disabledReason || !e.hasMap,
            onClick: t[2] || (t[2] = (u) => o.$emit("update"))
          }, b(e.busy ? e.status || "请稍候…" : "更新地图"), 9, Ka),
          e.hasMap ? k("", !0) : (l(), r("small", qa, "请先建立世界地图"))
        ]),
        n("section", za, [
          S(E, { name: "globe" }),
          n("h3", null, b(e.hasMap ? "重新绘制世界" : "建立世界地图"), 1),
          t[12] || (t[12] = n("p", null, "依据角色与世界设定建立地图；设定未写明的地方，会合理补全。结合当前聊天保留已发生的故事。", -1)),
          e.hasMap ? (l(), r("p", La, "新地图保存成功后替换原图；失败时保留原图。")) : k("", !0),
          n("button", {
            type: "button",
            class: "map-secondary-button",
            disabled: e.busy || !!e.disabledReason,
            onClick: t[3] || (t[3] = (u) => o.$emit("rebuild"))
          }, b(e.busy ? e.status || "请稍候…" : e.hasMap ? "重新绘制" : "绘制世界地图"), 9, Na)
        ]),
        e.disabledReason ? (l(), r("p", Va, b(e.disabledReason), 1)) : k("", !0),
        n("button", {
          type: "button",
          class: "map-sync-button",
          disabled: e.busy || e.refreshDisabled,
          onClick: t[4] || (t[4] = (u) => o.$emit("refresh"))
        }, [S(E, { name: "refresh" }), t[13] || (t[13] = N("同步已保存的地图", -1))], 8, Za),
        t[14] || (t[14] = n("p", { class: "map-setting-note" }, "同步只读取保存结果，不会重新生成地图。绘制或更新开始后，可以离开此页面。", -1))
      ])
    ], 544));
  }
}), Da = Qa, Ya = { class: "map-search-input" }, Ga = {
  class: "map-search-filters",
  "aria-label": "地点筛选"
}, Xa = ["aria-pressed", "onClick"], Fa = { class: "map-search-results" }, Wa = ["onClick"], Ua = { class: "map-result-icon" }, Ja = { key: 0 }, en = {
  key: 0,
  class: "map-search-empty"
}, tn = /* @__PURE__ */ Y({
  __name: "MapSearch",
  props: { atlas: {} },
  emits: ["close", "select"],
  setup(e) {
    const s = e, o = H(null), t = H(""), u = H("all"), v = $(() => s.atlas.locations.filter((f) => [
      f.name,
      f.brief,
      s.atlas.locations.find((i) => i.key === f.parent)?.name
    ].some((i) => i?.toLocaleLowerCase().includes(t.value.trim().toLocaleLowerCase())) && (u.value === "all" || (u.value === "unvisited" ? f.status !== "visited" : f.status === "visited"))));
    return se(() => o.value?.showModal()), (f, i) => (l(), r("dialog", {
      ref_key: "dialog",
      ref: o,
      class: "map-dialog map-search-dialog",
      "aria-label": "查找地点",
      onCancel: i[2] || (i[2] = X((c) => f.$emit("close"), ["prevent"])),
      onKeydown: i[3] || (i[3] = X(() => {
      }, ["stop"]))
    }, [
      n("header", Ya, [
        S(E, { name: "search" }),
        _e(n("input", {
          "onUpdate:modelValue": i[0] || (i[0] = (c) => t.value = c),
          type: "search",
          "aria-label": "搜索地点",
          placeholder: "想去哪里？",
          autofocus: ""
        }, null, 512), [[He, t.value]]),
        n("button", {
          type: "button",
          onClick: i[1] || (i[1] = (c) => f.$emit("close"))
        }, "取消")
      ]),
      n("nav", Ga, [(l(), r(O, null, Z([
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
      ], (c) => n("button", {
        key: c.id,
        type: "button",
        "aria-pressed": u.value === c.id,
        onClick: (d) => u.value = c.id
      }, b(c.name), 9, Xa)), 64))]),
      n("div", Fa, [
        n("small", null, b(v.value.length) + " 个地点", 1),
        (l(!0), r(O, null, Z(v.value, (c) => (l(), r("button", {
          key: c.key,
          type: "button",
          class: "map-search-result",
          onClick: (d) => f.$emit("select", c.key)
        }, [
          n("span", Ua, [S(E, { name: "pin" })]),
          n("span", null, [
            n("strong", null, b(c.name), 1),
            n("small", null, b(p(Ae)[c.scale]) + " · " + b(c.status === "visited" ? "已到访" : "未到访"), 1),
            c.brief ? (l(), r("p", Ja, b(c.brief), 1)) : k("", !0)
          ]),
          S(E, { name: "next" })
        ], 8, Wa))), 128)),
        v.value.length ? k("", !0) : (l(), r("div", en, [
          S(E, { name: "search" }),
          i[4] || (i[4] = n("h3", null, "还没有找到这个地点", -1)),
          i[5] || (i[5] = n("p", null, "试试其他名称，或看看全部地点。", -1))
        ]))
      ])
    ], 544));
  }
}), an = tn, nn = {
  class: "map-place-detail",
  "aria-labelledby": "map-place-title"
}, sn = { id: "map-place-title" }, ln = { class: "map-place-content" }, on = {
  key: 0,
  class: "map-place-full-name"
}, rn = {
  key: 1,
  class: "map-address"
}, un = { class: "map-place-intro" }, cn = {
  key: 2,
  class: "map-place-actions"
}, dn = {
  key: 3,
  class: "map-detail-section"
}, vn = { class: "map-people" }, pn = {
  key: 4,
  class: "map-detail-section"
}, hn = ["onClick"], fn = /* @__PURE__ */ Y({
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
  setup(e) {
    const s = e, o = $(() => fe(s.map.atlas, s.location.key).slice(0, -1)), t = $(() => s.map.atlas.locations.filter((i) => i.parent === s.location.key)), u = $(() => s.map.atlas.actors.filter((i) => i.locationKey === s.location.key)), v = $(() => Ge(s.map.atlas, s.location.key)), f = $(() => s.location.sceneKey ? s.map.scenes[s.location.sceneKey] : void 0);
    return (i, c) => (l(), r("section", nn, [
      c[7] || (c[7] = n("div", {
        class: "map-sheet-grip",
        "aria-hidden": "true"
      }, null, -1)),
      n("header", null, [n("div", null, [n("small", null, b(p(Ae)[e.location.scale]) + " · " + b(e.currentKey === e.location.key ? "当前位置" : e.location.status === "visited" ? "已到访" : "未到访"), 1), n("h2", sn, b(e.location.name), 1)]), n("button", {
        type: "button",
        class: "map-round-button",
        "aria-label": "关闭地点详情",
        onClick: c[0] || (c[0] = (d) => i.$emit("close"))
      }, [S(E, { name: "close" })])]),
      n("div", ln, [
        e.location.name.length > 24 ? (l(), r("p", on, b(e.location.name), 1)) : k("", !0),
        o.value.length ? (l(), r("p", rn, [S(E, { name: "pin" }), N(b(o.value.map((d) => d.name).join(" · ")), 1)])) : k("", !0),
        n("p", un, b(e.location.brief || "这个地点已记录在世界地图上，更多介绍等待故事展开。"), 1),
        t.value.length || f.value ? (l(), r("div", cn, [t.value.length ? (l(), r("button", {
          key: 0,
          type: "button",
          class: "map-primary-button",
          onClick: c[1] || (c[1] = (d) => i.$emit("explore"))
        }, [S(E, { name: "compass" }), N("探索这里 · " + b(t.value.length) + " 处", 1)])) : k("", !0), f.value ? (l(), r("button", {
          key: 1,
          type: "button",
          class: "map-secondary-button",
          onClick: c[2] || (c[2] = (d) => i.$emit("scene"))
        }, [S(E, { name: "layers" }), c[3] || (c[3] = N("查看场景图", -1))])) : k("", !0)])) : k("", !0),
        u.value.length ? (l(), r("section", dn, [c[4] || (c[4] = n("h3", null, "记录在这里的人物", -1)), n("p", vn, [(l(!0), r(O, null, Z(u.value, (d) => (l(), r("span", { key: d.actorKey }, [S(E, { name: "person" }), N(b(d.displayName), 1)]))), 128))])])) : k("", !0),
        v.value.length ? (l(), r("section", pn, [c[5] || (c[5] = n("h3", null, "相连的地方", -1)), (l(!0), r(O, null, Z(v.value, (d) => (l(), r("button", {
          key: d.link.id,
          type: "button",
          class: "map-connection",
          onClick: (a) => i.$emit("select", d.location.key)
        }, [
          S(E, { name: "route" }),
          n("span", null, [n("strong", null, b(d.location.name), 1), n("small", null, b(d.link.label || p(ca)[d.link.kind]) + b(d.link.bidirectional ? "" : d.outgoing ? " · 单向前往" : " · 仅可从对面到达"), 1)]),
          S(E, { name: "next" })
        ], 8, hn))), 128))])) : k("", !0),
        c[6] || (c[6] = n("p", { class: "map-detail-footnote" }, "查看地图不会改变你在故事中的位置", -1))
      ])
    ]));
  }
}), yn = fn;
function ee(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}
function $e(e) {
  return e.maintenanceStatus === "maintaining" || e.maintenanceStatus === "rebuilding";
}
function mn(e) {
  const s = H(structuredClone(Be(e.initialState))), o = H(null), t = H(""), u = H(!1);
  let v = !1, f = 0, i = 0, c = () => {
  };
  const d = $(() => s.value.status === "unconfirmed" || s.value.writeState === "unconfirmed"), a = $(() => o.value !== null || ["loading", "saving"].includes(s.value.status) || ["maintaining", "rebuilding"].includes(s.value.maintenanceStatus || "")), y = $(() => a.value ? "正在更新地图，请稍候" : d.value ? "请先核实上一次保存结果" : s.value.status === "conflict" ? "保存的版本不一致，请先处理保存问题" : s.value.status !== "ready" ? s.value.message || "地图暂时不可更新" : s.value.chatIdentity ? "" : "请先打开一个聊天"), x = $(() => s.value.maintenanceStatus === "rebuilding" || o.value === "rebuild" ? "正在绘制世界…" : s.value.maintenanceStatus === "maintaining" || o.value === "maintain" ? "正在更新地图…" : o.value === "confirm" ? "正在核实保存…" : a.value ? "正在同步…" : ""), R = $(() => s.value.message || t.value), B = $(() => s.value.message ? [
    "blocked",
    "error",
    "conflict",
    "unconfirmed"
  ].includes(s.value.status) : u.value);
  function Q(w) {
    const g = $e(s.value);
    s.value = structuredClone(w), $e(w) ? (t.value = "", u.value = !1) : g && (t.value = w.maintenanceMessage || "", u.value = w.maintenanceStatus === "error");
  }
  function K(w, g) {
    const V = w instanceof Error ? w.message : String(w);
    return V.includes("聊天已切换") ? "聊天已切换，请重新打开地图。" : V === "host_request_timeout" ? "等待结果超时，更新可能仍在进行。请稍后查看，不要重复提交。" : g === "confirm" ? "仍无法确认保存结果，请稍后再试。" : g === "adopt" ? "未能恢复已保存的版本，当前更改仍暂停保存。" : g === "settings" ? "设置未能保存，请重试。" : "地图操作未完成，请稍后重试。";
  }
  async function T(w, g, V = {}) {
    if (o.value) return;
    const L = ++f, z = i, P = s.value.chatIdentity;
    o.value = g, t.value = "", u.value = !1;
    try {
      const A = await e.bridge.request(w, {
        chatIdentity: P,
        ...V
      }, 35e3);
      if (!v || L !== f || s.value.chatIdentity !== P) return;
      const _ = ee(A) ? A.result : void 0, m = ee(_) && ee(_.state) ? _.state : _;
      z === i && ee(m) && m.chatIdentity === P && Q(m), (g === "maintain" || g === "rebuild") && ee(_) && typeof _.message == "string" && _.message && (t.value = _.message), g === "refresh" && s.value.status === "ready" && (t.value = "已同步保存的地图。"), g === "settings" && (t.value = s.value.autoMaintenance ? "自动更新已开启。" : "自动更新已关闭。"), g === "confirm" && s.value.status === "ready" && (t.value = "保存已确认。"), g === "adopt" && ee(_) && _.adoption === "adopted" && (t.value = "已恢复当前聊天中保存的 OS 数据。");
    } catch (A) {
      v && L === f && s.value.chatIdentity === P && (t.value = K(A, g), u.value = !0);
    } finally {
      v && L === f && (o.value = null);
    }
  }
  return se(() => {
    v = !0, c = e.bridge.subscribe((w) => {
      if (w.type === "map/state") {
        const g = w.payload.state;
        if (g.chatIdentity !== s.value.chatIdentity) return;
        i += 1, Q(g);
      } else w.type === "map/error" && (i += 1, u.value = !0, t.value = w.payload.message || "地图暂时无法读取，请重新打开。");
    });
  }), Ce(() => {
    v = !1, f += 1, c();
  }), {
    state: s,
    activeRequest: o,
    busy: a,
    disabledReason: y,
    requiresConfirmation: d,
    status: x,
    notice: R,
    isError: B,
    dismissNotice: () => {
      t.value = "", u.value = !1;
    },
    refresh: () => {
      if (!a.value && !d.value) return T("map/refresh", "refresh");
    },
    confirmSave: () => {
      if (!a.value) return T("map/confirm-save", "confirm");
    },
    adopt: () => {
      if (!a.value) return T("map/adopt-server-state", "adopt");
    },
    setAuto: (w) => T("map/set-auto-maintenance", "settings", { enabled: w }),
    update: () => {
      if (!y.value && s.value.map) return T("map/maintain-once", "maintain");
    },
    rebuild: () => {
      if (!y.value) return T("map/rebuild", "rebuild");
    }
  };
}
var bn = { class: "map-top" }, gn = { class: "map-search-bar" }, kn = ["disabled"], Mn = {
  key: 1,
  class: "map-search-entry"
}, wn = {
  key: 0,
  class: "map-view-switch",
  "aria-label": "地图视图"
}, $n = ["aria-pressed"], xn = ["aria-pressed"], _n = {
  key: 1,
  class: "map-region-trail",
  "aria-label": "当前查看区域"
}, Cn = ["onClick"], Sn = {
  key: 2,
  class: "map-progress",
  role: "status"
}, jn = ["disabled"], En = ["disabled"], On = ["disabled"], An = {
  key: 1,
  class: "map-empty"
}, In = ["disabled"], Pn = {
  key: 0,
  class: "map-setting-note"
}, Rn = {
  key: 1,
  class: "map-empty"
}, Tn = {
  key: 1,
  class: "map-empty map-first-map"
}, Bn = { class: "map-empty-art" }, Hn = ["disabled"], Kn = {
  key: 1,
  class: "map-setting-note"
}, qn = ["disabled"], zn = ["aria-expanded"], Ln = {
  key: 1,
  class: "map-key"
}, Nn = {
  key: 3,
  class: "map-region-card"
}, Vn = { class: "map-region-icon" }, Zn = {
  key: 4,
  class: "map-scene-caption"
}, Qn = /* @__PURE__ */ Y({
  __name: "MapApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const { state: s, activeRequest: o, busy: t, disabledReason: u, requiresConfirmation: v, status: f, notice: i, isError: c, dismissNotice: d, refresh: a, confirmSave: y, adopt: x, setAuto: R, update: B, rebuild: Q } = mn(e), K = H(s.value.map ? Me(s.value.map.atlas) : ""), T = H(""), w = H(null), g = $(() => w.value !== null), V = H(""), L = H(0), z = H(!1), P = H(!1), A = H(!1), _ = $(() => s.value.map?.atlas), m = $(() => _.value?.actors.find((C) => C.actorKey === "player")?.locationKey || ""), j = $(() => _.value?.locations.find((C) => C.key === m.value)), I = $(() => _.value?.locations.find((C) => C.key === T.value)), q = $(() => _.value?.locations.find((C) => C.key === (w.value || m.value))), U = $(() => g.value && q.value?.sceneKey ? s.value.map?.scenes[q.value.sceneKey] : void 0), F = $(() => _.value?.locations.find((C) => C.key === K.value)), ce = $(() => _.value?.locations.filter((C) => (C.parent || "") === K.value) || []), me = $(() => ce.value.filter((C) => C.status !== "visited").length), Ie = $(() => _.value ? fe(_.value, K.value) : []);
    ve(() => s.value, (C, h) => {
      const M = C.chatIdentity !== h.chatIdentity;
      (!h.map || M || K.value && !C.map?.atlas.locations.some((G) => G.key === K.value)) && (K.value = C.map ? Me(C.map.atlas) : ""), (M || !C.map?.atlas.locations.some((G) => G.key === T.value)) && (T.value = ""), (M || w.value && !C.map?.atlas.locations.some((G) => G.key === w.value)) && (w.value = null), M && (z.value = !1, P.value = !1);
    });
    function oe(C) {
      K.value = C, T.value = "", w.value = null, A.value = !1;
    }
    async function re(C, h = !1) {
      const M = _.value?.locations.find((G) => G.key === C);
      M && (w.value = null, T.value = C, P.value = !1, A.value = !1, h && (K.value = M.parent || ""), await Ke(), V.value = _.value ? ie(_.value, C, K.value) : C, L.value += 1);
    }
    async function Pe() {
      j.value && await re(j.value.key, !0);
    }
    function de(C = "") {
      w.value = C === m.value ? "" : C, A.value = !1, P.value = !1;
    }
    function be() {
      w.value = null, A.value = !1;
    }
    function Re(C) {
      C.key === "Escape" && (g.value || T.value || A.value) && (C.stopPropagation(), g.value ? be() : T.value ? T.value = "" : A.value = !1);
    }
    return (C, h) => (l(), r("main", {
      class: D(["map-app", {
        "has-view-switch": _.value?.locations.length,
        "is-scene-view": g.value
      }]),
      onKeydown: Re
    }, [
      n("div", bn, [
        n("header", gn, [
          S(E, { name: g.value ? "layers" : "search" }, null, 8, ["name"]),
          g.value ? (l(), r("div", Mn, [N(b(q.value?.name || "当前场景"), 1), n("small", null, b(w.value ? "正在查看已记录的场景" : "看看你身边的布局"), 1)])) : (l(), r("button", {
            key: 0,
            type: "button",
            class: "map-search-entry",
            disabled: !_.value?.locations.length,
            onClick: h[0] || (h[0] = (M) => P.value = !0)
          }, [...h[22] || (h[22] = [N("想去哪里？", -1), n("small", null, "搜索世界中的地点", -1)])], 8, kn)),
          n("button", {
            type: "button",
            class: "map-round-button",
            "aria-label": "地图设置",
            onClick: h[1] || (h[1] = (M) => z.value = !0)
          }, [S(E, { name: "more" })])
        ]),
        _.value?.locations.length ? (l(), r("nav", wn, [n("button", {
          type: "button",
          "aria-pressed": !g.value,
          onClick: be
        }, [S(E, { name: "globe" }), h[23] || (h[23] = N("世界地图", -1))], 8, $n), n("button", {
          type: "button",
          "aria-pressed": g.value,
          onClick: h[2] || (h[2] = (M) => de())
        }, [S(E, { name: "layers" }), N(b(w.value ? "场景地图" : "当前场景"), 1)], 8, xn)])) : k("", !0),
        _.value?.locations.length && !g.value ? (l(), r("nav", _n, [n("button", {
          type: "button",
          onClick: h[3] || (h[3] = (M) => oe(""))
        }, [S(E, { name: "globe" }), h[24] || (h[24] = N("世界", -1))]), (l(!0), r(O, null, Z(Ie.value, (M) => (l(), r(O, { key: M.key }, [S(E, { name: "next" }), n("button", {
          type: "button",
          onClick: (G) => oe(M.key)
        }, b(M.name), 9, Cn)], 64))), 128))])) : k("", !0),
        p(f) ? (l(), r("div", Sn, [h[25] || (h[25] = n("span", null, null, -1)), N(b(p(f)), 1)])) : k("", !0),
        p(i) || p(v) || p(s).status === "conflict" ? (l(), r("aside", {
          key: 3,
          class: D(["map-notice", { "is-error": p(c) }]),
          role: "status"
        }, [n("p", null, b(p(i) || (p(v) ? "保存结果尚未确认。" : "保存的版本不一致。")), 1), p(v) ? (l(), r("button", {
          key: 0,
          type: "button",
          disabled: p(t),
          onClick: h[4] || (h[4] = (...M) => p(y) && p(y)(...M))
        }, "核实保存结果", 8, jn)) : p(s).status === "conflict" ? (l(), r(O, { key: 1 }, [h[26] || (h[26] = n("small", null, "恢复会放弃尚未保存的更改，并使用当前聊天已保存的 OS 数据（不只是地图）。", -1)), n("button", {
          type: "button",
          disabled: p(t),
          onClick: h[5] || (h[5] = (...M) => p(x) && p(x)(...M))
        }, "放弃未保存更改并恢复", 8, En)], 64)) : p(s).status === "error" || p(s).status === "blocked" ? (l(), r("button", {
          key: 2,
          type: "button",
          disabled: p(t),
          onClick: h[6] || (h[6] = (...M) => p(a) && p(a)(...M))
        }, "重新读取", 8, On)) : (l(), r("button", {
          key: 3,
          type: "button",
          class: "map-notice-close",
          "aria-label": "关闭地图提示",
          onClick: h[7] || (h[7] = (...M) => p(d) && p(d)(...M))
        }, [S(E, { name: "close" })]))], 2)) : k("", !0)
      ]),
      n("div", { class: D(["map-canvas", { "has-detail": I.value && !g.value }]) }, [p(s).map && _.value?.locations.length ? (l(), r(O, { key: 0 }, [
        _e(S(it, {
          atlas: p(s).map.atlas,
          region: K.value,
          "current-location-key": m.value,
          "selected-location-key": T.value,
          "focus-key": V.value,
          "focus-sequence": L.value,
          onSelect: h[8] || (h[8] = (M) => re(M))
        }, null, 8, [
          "atlas",
          "region",
          "current-location-key",
          "selected-location-key",
          "focus-key",
          "focus-sequence"
        ]), [[ze, !g.value]]),
        g.value ? (l(), r(O, { key: 0 }, [U.value?.status === "active" ? (l(), W(Aa, {
          key: 0,
          scene: U.value
        }, null, 8, ["scene"])) : (l(), r("div", An, [
          S(E, { name: "layers" }),
          n("h2", null, b(q.value ? "这里的布局还没画出来" : "还不知道你在哪里"), 1),
          n("p", null, b(q.value ? "更新地图后，会结合设定与剧情补齐这里的普通布局。" : "更新地图后，会根据剧情确认你所在的地方。"), 1),
          n("button", {
            type: "button",
            class: "map-secondary-button",
            disabled: !!p(u),
            onClick: h[9] || (h[9] = (...M) => p(B) && p(B)(...M))
          }, b(p(t) ? "正在更新…" : "更新地图"), 9, In),
          p(u) && !p(t) ? (l(), r("p", Pn, b(p(u)), 1)) : k("", !0)
        ]))], 64)) : k("", !0),
        !g.value && !ce.value.length ? (l(), r("div", Rn, [
          S(E, { name: "pin" }),
          h[27] || (h[27] = n("h2", null, "这里还没有标出更多地点", -1)),
          h[28] || (h[28] = n("p", null, "可以先看看其他区域，或更新地图补充。", -1)),
          n("button", {
            type: "button",
            class: "map-secondary-button",
            onClick: h[10] || (h[10] = (M) => oe(F.value?.parent || ""))
          }, "查看上级区域")
        ])) : k("", !0)
      ], 64)) : (l(), r("div", Tn, [
        n("span", Bn, [S(E, { name: "globe" })]),
        h[29] || (h[29] = n("small", null, "故事之外，还有一整个世界", -1)),
        n("h1", null, b(p(s).status === "loading" ? "正在打开地图…" : "下一站，去哪里？"), 1),
        h[30] || (h[30] = n("p", null, [
          N("把世界设定画成地图，"),
          n("br"),
          N("也为留白的地方添上值得探索的去处。")
        ], -1)),
        p(s).status !== "loading" ? (l(), r("button", {
          key: 0,
          type: "button",
          class: "map-primary-button",
          disabled: !!p(u),
          onClick: h[11] || (h[11] = (...M) => p(Q) && p(Q)(...M))
        }, b(p(t) ? p(f) || "正在准备…" : "绘制世界地图"), 9, Hn)) : k("", !0),
        p(u) && !p(t) ? (l(), r("p", Kn, b(p(u)), 1)) : k("", !0)
      ]))], 2),
      _.value?.locations.length ? (l(), r("div", {
        key: 0,
        class: D(["map-floating-tools", { "has-detail": I.value && !g.value }])
      }, [g.value && w.value ? (l(), r("button", {
        key: 0,
        type: "button",
        class: "map-round-button",
        "aria-label": "回到当前场景",
        onClick: h[12] || (h[12] = (M) => de())
      }, [S(E, { name: "locate" })])) : g.value ? k("", !0) : (l(), r("button", {
        key: 1,
        type: "button",
        class: "map-round-button",
        disabled: !j.value,
        "aria-label": "回到我的位置",
        onClick: Pe
      }, [S(E, { name: "locate" })], 8, qn)), n("button", {
        type: "button",
        class: "map-round-button",
        "aria-expanded": A.value,
        "aria-label": "地图图例",
        onClick: h[13] || (h[13] = (M) => A.value = !A.value)
      }, [S(E, { name: "layers" })], 8, zn)], 2)) : k("", !0),
      A.value ? (l(), r("aside", Ln, [...h[31] || (h[31] = [
        n("strong", null, "读懂这张地图", -1),
        n("p", null, [
          n("i", { class: "map-key-current" }),
          N("你在这里 "),
          n("i", { class: "map-key-place" }),
          N("可探索地点")
        ], -1),
        n("p", null, "路线连接已记录的地点；箭头表示单向通行。", -1),
        n("small", null, "世界图展示区域与地点，不按实际比例。场景图展示一个地点的内部布局。", -1)
      ])])) : k("", !0),
      I.value && p(s).map && !g.value ? (l(), W(yn, {
        key: I.value.key,
        location: I.value,
        map: p(s).map,
        "current-key": m.value,
        onClose: h[14] || (h[14] = (M) => T.value = ""),
        onScene: h[15] || (h[15] = (M) => de(I.value.key)),
        onExplore: h[16] || (h[16] = (M) => oe(I.value.key)),
        onSelect: h[17] || (h[17] = (M) => re(M, !0))
      }, null, 8, [
        "location",
        "map",
        "current-key"
      ])) : _.value?.locations.length && !g.value ? (l(), r("footer", Nn, [
        n("span", Vn, [S(E, { name: "compass" })]),
        n("div", null, [n("h1", null, b(F.value?.name || "世界地图"), 1), n("p", null, b(ce.value.length) + " 个地点 · " + b(me.value ? me.value + " 处还没去过" : "看看熟悉的地方有什么变化"), 1)]),
        n("button", {
          type: "button",
          class: "map-round-button",
          "aria-label": "浏览全部地点",
          onClick: h[18] || (h[18] = (M) => P.value = !0)
        }, [S(E, { name: "next" })])
      ])) : g.value && _.value?.locations.length ? (l(), r("footer", Zn, [S(E, { name: "layers" }), n("span", null, [n("strong", null, b(q.value?.name || "当前位置待确认"), 1), n("small", null, b(w.value ? "正在查看场景图 · 不会移动人物" : "当前位置的场景图"), 1)])])) : k("", !0),
      P.value && _.value ? (l(), W(an, {
        key: 5,
        atlas: _.value,
        onClose: h[19] || (h[19] = (M) => P.value = !1),
        onSelect: h[20] || (h[20] = (M) => re(M, !0))
      }, null, 8, ["atlas"])) : k("", !0),
      z.value ? (l(), W(Da, {
        key: 6,
        "auto-maintenance": p(s).autoMaintenance,
        busy: p(t),
        "refresh-disabled": p(v),
        "auto-toggle-busy": p(o) !== null,
        "disabled-reason": p(u),
        "has-map": !!p(s).map,
        status: p(f),
        "maintenance-message": p(s).maintenanceMessage || "",
        "maintenance-error": p(s).maintenanceStatus === "error",
        notice: p(i),
        "notice-error": p(c),
        onClose: h[21] || (h[21] = (M) => z.value = !1),
        onSetAuto: p(R),
        onUpdate: p(B),
        onRebuild: p(Q),
        onRefresh: p(a)
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
      ])) : k("", !0)
    ], 34));
  }
}), Jn = Qn;
export {
  Jn as default
};
