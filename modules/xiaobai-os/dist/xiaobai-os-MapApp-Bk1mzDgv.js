/* eslint-disable */
import { A as fe, C as l, D as ye, F as Ce, I as u, L as Z, N as B, O as re, R as Se, T as Ae, _ as Q, a as Oe, c as q, d as ee, f as M, g as _, h as z, i as Ee, k as me, l as C, o as ce, p as s, s as F, u as n, v as Be, w as G, x as ne, y as he, z as g } from "./xiaobai-os-runtime-dom.esm-bundler-D8PGSboO.js";
var Pe = { class: "map-viewport" }, Re = ["viewBox", "aria-label"], Ie = {
  class: "map-viewport-controls",
  "aria-label": "地图缩放"
}, Te = /* @__PURE__ */ Q({
  __name: "MapViewport",
  props: {
    viewBox: {},
    resetKey: { default: "" },
    label: {},
    focusPoint: { default: void 0 },
    focusSequence: { default: 0 }
  },
  setup(a) {
    const t = a, i = B(null), e = B([...t.viewBox]), f = B([0, 0]), w = C(() => f.value[0] && f.value[1] ? Math.max(e.value[2] / f.value[0], e.value[3] / f.value[1]) : 1);
    let b;
    ne(() => {
      b = new ResizeObserver((y) => {
        const m = y[0].contentRect;
        f.value = [m.width, m.height];
      }), i.value && b.observe(i.value);
    });
    const v = /* @__PURE__ */ new Map();
    let c = null, p = [0, 0], r = 0, h = null, A = !1, o = !1, V = null;
    const W = C(() => e.value.join(" "));
    function L() {
      e.value = [...t.viewBox];
    }
    function P() {
      return w.value;
    }
    function I(y, m) {
      const $ = i.value?.getBoundingClientRect();
      if (!$) return [e.value[0], e.value[1]];
      const O = P();
      return [e.value[0] + e.value[2] / 2 + (y - $.left - $.width / 2) * O, e.value[1] + e.value[3] / 2 + (m - $.top - $.height / 2) * O];
    }
    function j(y, m) {
      const $ = Math.max(1, t.viewBox[2]), O = Math.min($ * 3, Math.max(Math.min($ * 0.24, 240), e.value[2] * y)), J = O / e.value[2], X = m || [e.value[0] + e.value[2] / 2, e.value[1] + e.value[3] / 2];
      e.value = [
        X[0] - (X[0] - e.value[0]) * J,
        X[1] - (X[1] - e.value[1]) * J,
        O,
        e.value[3] * J
      ];
    }
    function R() {
      if (!t.focusPoint) return;
      const y = Math.min(e.value[2], 620), m = e.value[3] * y / e.value[2];
      e.value = [
        t.focusPoint[0] - y / 2,
        t.focusPoint[1] - m / 2,
        y,
        m
      ];
    }
    function T() {
      const y = [...v.values()];
      y.length === 1 && (c = y[0], p = [e.value[0], e.value[1]]), y.length === 2 && (r = Math.hypot(y[1][0] - y[0][0], y[1][1] - y[0][1]), h = [(y[0][0] + y[1][0]) / 2, (y[0][1] + y[1][1]) / 2], A = !0);
    }
    function D(y) {
      y.button !== 0 || v.size >= 2 || (v.size || (A = !1), v.set(y.pointerId, [y.clientX, y.clientY]), y.target.setPointerCapture(y.pointerId), T());
    }
    function N(y) {
      if (!v.has(y.pointerId)) return;
      v.set(y.pointerId, [y.clientX, y.clientY]);
      const m = [...v.values()];
      if (m.length === 2 && h) {
        const $ = Math.hypot(m[1][0] - m[0][0], m[1][1] - m[0][1]), O = [(m[0][0] + m[1][0]) / 2, (m[0][1] + m[1][1]) / 2];
        $ > 0 && r > 0 && j(r / $, I(...h)), e.value[0] -= (O[0] - h[0]) * P(), e.value[1] -= (O[1] - h[1]) * P(), r = $, h = O;
      } else if (c) {
        const $ = y.clientX - c[0], O = y.clientY - c[1];
        Math.abs($) + Math.abs(O) > 4 && (A = !0), e.value = [
          p[0] - $ * P(),
          p[1] - O * P(),
          e.value[2],
          e.value[3]
        ];
      }
    }
    function E(y) {
      if (!v.delete(y.pointerId)) return;
      const m = y.target;
      m.hasPointerCapture(y.pointerId) && m.releasePointerCapture(y.pointerId), T(), v.size || (c = null, h = null), A && (o = !0, V && clearTimeout(V), V = setTimeout(() => {
        o = !1;
      }, 0));
    }
    function Y(y) {
      o && (y.preventDefault(), y.stopPropagation());
    }
    return re(() => t.resetKey, L, { immediate: !0 }), re(() => t.focusSequence, R, { flush: "post" }), he(() => {
      b?.disconnect(), V && clearTimeout(V);
    }), (y, m) => (l(), s("div", Pe, [(l(), s("svg", {
      ref_key: "svg",
      ref: i,
      class: "map-viewport-svg",
      viewBox: W.value,
      preserveAspectRatio: "xMidYMid meet",
      role: "group",
      "aria-label": a.label,
      onWheel: m[0] || (m[0] = F(($) => j($.deltaY < 0 ? 0.84 : 1.19, I($.clientX, $.clientY)), ["prevent"])),
      onPointerdown: D,
      onPointermove: N,
      onPointerup: E,
      onPointercancel: E,
      onClickCapture: Y
    }, [Ae(y.$slots, "default", { unitScale: w.value })], 40, Re)), n("div", Ie, [
      n("button", {
        type: "button",
        "aria-label": "放大地图",
        onClick: m[1] || (m[1] = ($) => j(0.8))
      }, "+"),
      n("button", {
        type: "button",
        "aria-label": "缩小地图",
        onClick: m[2] || (m[2] = ($) => j(1.25))
      }, "−"),
      n("button", {
        type: "button",
        class: "map-fit",
        onClick: L
      }, "全图")
    ])]));
  }
}), be = Te, Ke = {
  class: "map-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.7",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, Le = ["d"], ze = /* @__PURE__ */ Q({
  __name: "MapIcon",
  props: { name: { default: "pin" } },
  setup(a) {
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
    return (i, e) => (l(), s("svg", Ke, [n("path", { d: t[a.name] || t.pin }, null, 8, Le)]));
  }
}), S = ze;
function ue(a, t) {
  const i = new Map(a.locations.map((w) => [w.key, w])), e = [];
  let f = i.get(t);
  for (; f; )
    e.unshift(f), f = f.parent ? i.get(f.parent) : void 0;
  return e;
}
function ve(a) {
  const t = a.locations.filter((i) => !i.parent);
  return t.length === 1 && a.locations.some((i) => i.parent === t[0].key) ? t[0].key : "";
}
function oe(a, t, i) {
  return ue(a, t).find((e) => (e.parent || "") === i)?.key || "";
}
function je(a, t) {
  return a.links.flatMap((i) => {
    if (i.from !== t && i.to !== t) return [];
    const e = a.locations.find((f) => f.key === (i.from === t ? i.to : i.from));
    return e ? [{
      location: e,
      link: i,
      outgoing: i.bidirectional || i.from === t
    }] : [];
  });
}
function Ne(a, t) {
  const i = a.locations.filter((p) => (p.parent || "") === t).sort((p, r) => p.key.localeCompare(r.key, "en")), e = i.filter((p) => p.position).map((p) => ({
    location: p,
    x: p.position[0],
    y: p.position[1],
    placed: !0
  }));
  let f = 0;
  for (const p of i.filter((r) => !r.position)) {
    let r, h;
    do {
      const A = f * 2.3999632297, o = 155 * Math.sqrt(f++);
      r = Math.round(500 + Math.cos(A) * o), h = Math.round(420 + Math.sin(A) * o);
    } while (e.some((A) => Math.hypot(A.x - r, A.y - h) < 160));
    e.push({
      location: p,
      x: r,
      y: h,
      placed: !1
    });
  }
  e.sort((p, r) => p.location.key.localeCompare(r.location.key, "en"));
  const w = new Map(e.map((p) => [p.location.key, p])), b = a.links.flatMap((p) => {
    const r = w.get(oe(a, p.from, t)), h = w.get(oe(a, p.to, t));
    if (!r || !h || r === h) return [];
    const A = (r.x + h.x) / 2, o = (r.y + h.y) / 2;
    return [{
      link: p,
      from: r,
      to: h,
      x: A,
      y: o,
      path: `M ${r.x} ${r.y} Q ${A + (h.y - r.y) * 0.12} ${o - (h.x - r.x) * 0.12} ${h.x} ${h.y}`
    }];
  }), v = e.length ? Math.min(...e.map((p) => p.x)) - 140 : 0, c = e.length ? Math.min(...e.map((p) => p.y)) - 150 : 0;
  return {
    nodes: e,
    routes: b,
    viewBox: [
      v,
      c,
      e.length ? Math.max(420, Math.max(...e.map((p) => p.x)) - v + 140) : 800,
      e.length ? Math.max(500, Math.max(...e.map((p) => p.y)) - c + 190) : 900
    ]
  };
}
var qe = {
  class: "map-landscapes",
  "aria-hidden": "true"
}, De = ["transform"], Ve = {
  class: "map-world-roads",
  "aria-hidden": "true"
}, Ye = ["d"], Ue = ["d", "marker-end"], Ge = ["x", "y"], He = [
  "transform",
  "aria-label",
  "onClick",
  "onKeydown"
], Xe = { transform: "translate(-14 -20)" }, Ze = {
  y: "64",
  class: "map-place-name"
}, Fe = {
  key: 0,
  y: "89",
  class: "map-place-status"
}, Qe = {
  key: 1,
  y: "89",
  class: "map-place-status"
}, We = /* @__PURE__ */ Q({
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
  setup(a) {
    const t = a, i = C(() => Ne(t.atlas, t.region)), e = C(() => oe(t.atlas, t.currentLocationKey, t.region)), f = C(() => i.value.nodes.find((v) => v.location.key === t.focusKey)), w = "map-arrow-" + ye();
    function b(v, c) {
      return v === "water" ? "water" : v === "forest" ? "tree" : v === "mountain" ? "mountain" : ["world", "region"].includes(c) ? "globe" : c === "outdoor" ? "compass" : "building";
    }
    return (v, c) => (l(), ee(be, {
      "view-box": i.value.viewBox,
      "reset-key": a.region,
      label: "世界地图",
      "focus-point": f.value ? [f.value.x, f.value.y] : void 0,
      "focus-sequence": a.focusSequence
    }, {
      default: me(({ unitScale: p }) => [
        n("defs", null, [n("marker", {
          id: w,
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
        n("g", qe, [(l(!0), s(q, null, G(i.value.nodes, (r) => (l(), s("g", {
          key: r.location.key,
          transform: `translate(${r.x} ${r.y})`,
          class: Z(`is-${r.location.terrain || "urban"}`)
        }, [...c[1] || (c[1] = [n("path", { d: "M-108-20Q-100-100-32-94T87-56Q127-13 99 48T21 99Q-57 113-90 65T-108-20Z" }, null, -1), n("path", {
          class: "map-contour",
          d: "M-133-22Q-124-126-39-116T110-70Q156-17 124 60T26 123Q-71 139-112 81T-133-22Z"
        }, null, -1)])], 10, De))), 128))]),
        n("g", Ve, [(l(!0), s(q, null, G(i.value.routes, (r) => (l(), s("g", {
          key: r.link.id,
          class: Z({
            "is-path": r.link.kind === "path",
            "is-portal": r.link.kind === "portal"
          })
        }, [
          n("path", {
            class: "map-road-casing",
            d: r.path
          }, null, 8, Ye),
          n("path", {
            class: "map-road-line",
            d: r.path,
            "marker-end": r.link.bidirectional ? void 0 : `url(#${w})`
          }, null, 8, Ue),
          r.link.label ? (l(), s("text", {
            key: 0,
            x: r.x,
            y: r.y - 14
          }, g(r.link.label), 9, Ge)) : M("", !0)
        ], 2))), 128))]),
        (l(!0), s(q, null, G(i.value.nodes, (r) => (l(), s("g", {
          key: r.location.key,
          class: Z(["map-place", {
            "is-selected": r.location.key === a.selectedLocationKey,
            "is-current": r.location.key === e.value,
            "is-unvisited": r.location.status !== "visited"
          }]),
          transform: `translate(${r.x} ${r.y}) scale(${p * 0.5})`,
          role: "button",
          tabindex: "0",
          "aria-label": `查看${r.location.name}`,
          onClick: F((h) => v.$emit("select", r.location.key), ["stop"]),
          onKeydown: [ce(F((h) => v.$emit("select", r.location.key), ["stop"]), ["enter"]), ce(F((h) => v.$emit("select", r.location.key), ["stop", "prevent"]), ["space"])]
        }, [
          c[2] || (c[2] = n("circle", {
            class: "map-pin-halo",
            r: "39"
          }, null, -1)),
          c[3] || (c[3] = n("path", {
            class: "map-pin-body",
            d: "M0 33C-6 25-26 8-26-6a26 26 0 0 1 52 0C26 8 6 25 0 33Z"
          }, null, -1)),
          n("g", Xe, [_(S, {
            name: b(r.location.terrain, r.location.scale),
            width: "28",
            height: "28"
          }, null, 8, ["name"])]),
          n("text", Ze, g(r.location.name.length > 14 ? r.location.name.slice(0, 13) + "…" : r.location.name), 1),
          r.location.key === e.value ? (l(), s("text", Fe, "你在这里")) : r.location.status !== "visited" ? (l(), s("text", Qe, "未到访")) : M("", !0),
          n("title", null, g(r.location.name) + g(r.location.brief ? " · " + r.location.brief : ""), 1)
        ], 42, He))), 128))
      ]),
      _: 1
    }, 8, [
      "view-box",
      "reset-key",
      "focus-point",
      "focus-sequence"
    ]));
  }
}), Je = We, te;
async function et() {
  if (!te) {
    const a = [
      "..",
      "..",
      "..",
      "libs",
      "material-symbols",
      "material-symbols-rounded.woff2"
    ].join("/"), t = new URL(a, import.meta.url);
    te = new FontFace("Xiaobai Map Symbols", `url("${t.href}")`, {
      display: "block",
      weight: "400"
    }).load(), te.catch(() => {
      te = void 0;
    });
  }
  document.fonts.add(await te);
}
var tt = Object.freeze({
  wall: {
    stroke: "#b7d8f7",
    fill: "rgba(120, 168, 209, .12)",
    width: 3
  },
  road: {
    stroke: "#e0aa63",
    fill: "rgba(199, 139, 65, .18)",
    width: 5
  },
  water: {
    stroke: "#46c7ef",
    fill: "rgba(36, 154, 207, .30)",
    width: 2.4
  },
  terrain: {
    stroke: "#8ebd86",
    fill: "rgba(89, 139, 90, .25)",
    width: 2.2
  },
  furniture: {
    stroke: "#d5a86d",
    fill: "rgba(160, 105, 51, .28)",
    width: 2.1
  },
  decoration: {
    stroke: "#c7a6e8",
    fill: "rgba(141, 98, 184, .22)",
    width: 2
  },
  door: {
    stroke: "#ffbe69",
    fill: "rgba(229, 144, 53, .20)",
    width: 3.2
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
}), at = Object.freeze({
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
}), nt = Object.freeze({
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
}), lt = Object.freeze({
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
}), st = Object.freeze({
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
  tree: "park",
  rock: "landscape",
  building: "apartment",
  fire: "local_fire_department",
  light: "lightbulb",
  water: "water_drop"
}), ot = Object.freeze({
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
}), ie = Object.freeze({
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
}), ge = Object.freeze({
  unknown: "#52616d",
  wood: "#7c5938",
  stone: "#687988",
  tile: "#637783",
  carpet: "#76576f",
  "bed-sheet": "#8a7b91",
  fabric: "#85679c",
  tatami: "#7f7a4f",
  sand: "#9d8050",
  marble: "#88939d",
  blood: "#792f38",
  water: "#176f9b",
  grass: "#47784e",
  dirt: "#75583d",
  snow: "#b9d5df",
  metal: "#788c9e",
  rune: "#744ab5",
  "warm-light": "#bd7a32",
  "cold-light": "#3f83a4",
  shadow: "#17202a"
}), rt = Object.freeze({
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
}), ke = Object.freeze({
  world: "世界",
  region: "区域",
  city: "城市",
  district: "区域",
  building: "建筑",
  floor: "楼层",
  room: "房间",
  outdoor: "户外"
}), it = Object.freeze({
  door: "门",
  stairs: "楼梯",
  elevator: "电梯",
  path: "小径",
  road: "道路",
  portal: "传送门",
  passage: "通道"
}), ut = /* @__PURE__ */ new Set([
  "water",
  "terrain",
  "furniture",
  "decoration",
  "danger",
  "magic",
  "secret",
  "light"
]);
function dt(a, t) {
  return a < t ? -1 : a > t ? 1 : 0;
}
function U(a) {
  return Number(a.toFixed(3)).toString();
}
function we(a) {
  const t = a.geometry;
  return Array.isArray(t.points) ? t.points : [];
}
function Me(a) {
  return a.shape === "rect" || a.shape === "circle" ? !0 : we(a).length >= 3 && (a.closed === !0 || ut.has(a.category));
}
function ct(a) {
  const t = we(a);
  if (t.length < 2) return "";
  const i = Me(a) ? " Z" : "";
  if (a.shape === "path") return `M ${t.map(([f, w]) => `${U(f)} ${U(w)}`).join(" L ")}${i}`;
  const e = [`M ${U(t[0][0])} ${U(t[0][1])}`];
  for (let f = 0; f < t.length - 1; f += 1) {
    const w = t[f - 1] || t[f], b = t[f], v = t[f + 1], c = t[f + 2] || v, p = b[0] + (v[0] - w[0]) / 6, r = b[1] + (v[1] - w[1]) / 6, h = v[0] - (c[0] - b[0]) / 6, A = v[1] - (c[1] - b[1]) / 6;
    e.push(`C ${U(p)} ${U(r)}, ${U(h)} ${U(A)}, ${U(v[0])} ${U(v[1])}`);
  }
  return e.join(" ") + i;
}
function pe(a) {
  const t = a.geometry;
  if (typeof t.x == "number" && typeof t.y == "number")
    return a.shape === "rect" ? [t.x + (t.width || 0) / 2, t.y + (t.height || 0) / 2] : a.shape === "circle" ? [t.x, t.y - (t.radius || 0) - 8] : [t.x, t.y + (a.shape === "icon" ? 18 : 0)];
  const i = t.points || [];
  if (!i.length) return [0, 0];
  const [e, f] = i.reduce((w, b) => [w[0] + b[0], w[1] + b[1]], [0, 0]);
  return [e / i.length, f / i.length];
}
function K(a, t) {
  const i = tt[a.category], e = Me(a), f = e && a.material ? `url(#${t}-material-${a.material})` : "", w = a.certainty === "inferred" ? "8 6" : a.certainty === "unknown" ? "3 7" : i.dash;
  return {
    ...i,
    fill: e ? f || i.fill || ge[a.material] : "none",
    opacity: a.certainty === "unknown" ? 0.48 : a.certainty === "inferred" ? 0.72 : 1,
    dash: w,
    icon: a.icon ? st[a.icon] : a.kind ? nt[a.kind] : ot[a.category],
    fallback: a.kind ? lt[a.kind] : at[a.category].slice(0, 1),
    z: ie[a.category]
  };
}
function vt(a) {
  return [...a].sort((t, i) => ie[t.category] - ie[i.category] || dt(t.id, i.id));
}
var en = Object.freeze([
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
]), tn = Object.freeze([
  "rect",
  "circle",
  "path",
  "curve",
  "icon",
  "label"
]), an = Object.freeze([
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
]), pt = Object.freeze([
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
  "dirt",
  "snow",
  "metal",
  "rune",
  "warm-light",
  "cold-light",
  "shadow"
]), nn = Object.freeze([
  "confirmed",
  "inferred",
  "unknown"
]), ln = Object.freeze([
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
  "tree",
  "rock",
  "building",
  "fire",
  "light",
  "water"
]), sn = Object.freeze(/* @__PURE__ */ new Set([
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
])), ft = ["id"], yt = ["fill"], mt = {
  key: 0,
  d: "M0 6H24M0 18H24M7 0V6M17 6V18M10 18V24"
}, ht = {
  key: 1,
  d: "M0 8L7 3l8 3 9-4M2 19l8-5 10 4 4-3"
}, bt = {
  key: 2,
  d: "M0 8H24M0 16H24M8 0v24m8-24v24"
}, gt = {
  key: 3,
  d: "M-4 6q6-5 12 0t12 0t12 0M-4 17q6-5 12 0t12 0t12 0"
}, kt = {
  key: 4,
  d: "M4 20l2-7 2 7M13 13l2-8 2 8M19 23l2-6 2 6"
}, wt = {
  key: 5,
  d: "M3 5h2m8 3h3m3 10h2M7 19h3"
}, Mt = {
  key: 6,
  cx: "6",
  cy: "7",
  r: "1.1"
}, $t = {
  key: 7,
  cx: "18",
  cy: "16",
  r: "1"
}, xt = {
  key: 8,
  d: "M12 3v18M4 7l16 10M20 7L4 17"
}, _t = {
  key: 9,
  d: "M0 4h24M0 20h24"
}, Ct = {
  key: 10,
  cx: "5",
  cy: "12",
  r: "1.2"
}, St = {
  key: 11,
  cx: "19",
  cy: "12",
  r: "1.2"
}, At = {
  key: 12,
  d: "M0 4q6 4 12 0t12 0M0 16q6 4 12 0t12 0"
}, Ot = {
  key: 13,
  d: "M0 6l7 5 5-8 5 13 7-5M0 22l8-5 6 4 10-8"
}, Et = {
  key: 14,
  d: "M12 2l4 7 6 3-6 4-4 6-4-6-6-4 6-3zM8 9l8 7m0-7l-8 7"
}, Bt = {
  key: 15,
  d: "M12 2v20M2 12h20M5 5l14 14M19 5L5 19"
}, Pt = [
  "x",
  "y",
  "width",
  "height"
], Rt = [
  "x",
  "y",
  "width",
  "height"
], It = [
  "cx",
  "cy",
  "rx",
  "ry"
], Tt = ["opacity"], Kt = [
  "x",
  "y",
  "width",
  "height",
  "fill",
  "stroke",
  "stroke-width",
  "stroke-dasharray"
], Lt = [
  "cx",
  "cy",
  "r",
  "fill",
  "stroke",
  "stroke-width",
  "stroke-dasharray"
], zt = [
  "d",
  "fill",
  "stroke",
  "stroke-width",
  "stroke-dasharray"
], jt = ["transform"], Nt = ["stroke"], qt = {
  key: 0,
  class: "map-material-symbol",
  "aria-hidden": "true"
}, Dt = {
  key: 1,
  class: "map-symbol-fallback",
  "aria-hidden": "true"
}, Vt = ["x", "y"], Yt = ["x", "y"], Ut = /* @__PURE__ */ Q({
  __name: "MapScene",
  props: { scene: {} },
  setup(a) {
    const t = a, i = B(!1);
    ne(() => {
      et().then(() => {
        i.value = !0;
      }).catch(() => {
        i.value = !1;
      });
    });
    const e = `xiaobai-map-scene-${ye()}`, f = pt, w = C(() => vt(t.scene.elements)), b = C(() => rt[t.scene.mood || "neutral"]), v = C(() => ({
      "--map-canvas-glow": b.value.glow,
      "--map-canvas-accent": b.value.accent
    }));
    function c(h) {
      return h.geometry;
    }
    function p(h) {
      return h.geometry;
    }
    function r(h) {
      return h.geometry;
    }
    return (h, A) => (l(), ee(be, {
      class: "map-scene-viewport",
      style: Se(v.value),
      "view-box": a.scene.viewBox,
      "reset-key": a.scene.key,
      label: `${a.scene.name} 场景地图`
    }, {
      default: me(() => [
        n("defs", null, [
          A[0] || (A[0] = n("pattern", {
            id: "map-scene-minor-grid",
            width: "20",
            height: "20",
            patternUnits: "userSpaceOnUse"
          }, [n("path", {
            d: "M20 0H0V20",
            fill: "none",
            stroke: "rgba(102, 181, 231, .08)",
            "stroke-width": "1"
          })], -1)),
          A[1] || (A[1] = n("pattern", {
            id: "map-scene-major-grid",
            width: "100",
            height: "100",
            patternUnits: "userSpaceOnUse"
          }, [n("rect", {
            width: "100",
            height: "100",
            fill: "url(#map-scene-minor-grid)"
          }), n("path", {
            d: "M100 0H0V100",
            fill: "none",
            stroke: "rgba(102, 181, 231, .15)",
            "stroke-width": "1.4"
          })], -1)),
          (l(!0), s(q, null, G(u(f), (o) => (l(), s("pattern", {
            id: `${e}-material-${o}`,
            key: o,
            width: "24",
            height: "24",
            patternUnits: "userSpaceOnUse",
            class: Z(`map-material-pattern is-${o}`)
          }, [
            n("rect", {
              width: "24",
              height: "24",
              fill: `color-mix(in srgb, ${u(ge)[o]}, var(--map-surface) 48%)`
            }, null, 8, yt),
            o === "wood" ? (l(), s("path", mt)) : o === "stone" ? (l(), s("path", ht)) : o === "tile" || o === "marble" ? (l(), s("path", bt)) : o === "water" ? (l(), s("path", gt)) : o === "grass" ? (l(), s("path", kt)) : o === "dirt" ? (l(), s("path", wt)) : o === "sand" ? (l(), s("circle", Mt)) : M("", !0),
            o === "sand" ? (l(), s("circle", $t)) : o === "snow" ? (l(), s("path", xt)) : o === "metal" ? (l(), s("path", _t)) : M("", !0),
            o === "metal" ? (l(), s("circle", Ct)) : M("", !0),
            o === "metal" ? (l(), s("circle", St)) : o === "fabric" || o === "carpet" || o === "bed-sheet" || o === "tatami" ? (l(), s("path", At)) : o === "blood" ? (l(), s("path", Ot)) : o === "rune" ? (l(), s("path", Et)) : o === "warm-light" || o === "cold-light" || o === "shadow" ? (l(), s("path", Bt)) : M("", !0)
          ], 10, ft))), 128)),
          A[2] || (A[2] = n("filter", {
            id: "map-scene-icon-glow",
            x: "-80%",
            y: "-80%",
            width: "260%",
            height: "260%"
          }, [n("feGaussianBlur", {
            stdDeviation: "2.5",
            result: "blur"
          }), n("feMerge", null, [n("feMergeNode", { in: "blur" }), n("feMergeNode", { in: "SourceGraphic" })])], -1))
        ]),
        n("rect", {
          x: a.scene.viewBox[0],
          y: a.scene.viewBox[1],
          width: a.scene.viewBox[2],
          height: a.scene.viewBox[3],
          fill: "var(--map-canvas-bg)"
        }, null, 8, Pt),
        n("rect", {
          x: a.scene.viewBox[0],
          y: a.scene.viewBox[1],
          width: a.scene.viewBox[2],
          height: a.scene.viewBox[3],
          fill: "url(#map-scene-major-grid)"
        }, null, 8, Rt),
        n("ellipse", {
          cx: a.scene.viewBox[0] + a.scene.viewBox[2] / 2,
          cy: a.scene.viewBox[1] + a.scene.viewBox[3] / 2,
          rx: a.scene.viewBox[2] * 0.42,
          ry: a.scene.viewBox[3] * 0.42,
          fill: "var(--map-canvas-glow)"
        }, null, 8, It),
        (l(!0), s(q, null, G(w.value, (o) => (l(), s("g", {
          key: o.id,
          class: Z(["map-scene-element", [`is-${o.category}`, `is-${o.certainty || "confirmed"}`]]),
          opacity: u(K)(o, e).opacity
        }, [o.shape === "rect" ? (l(), s("rect", {
          key: 0,
          x: c(o).x,
          y: c(o).y,
          width: c(o).width,
          height: c(o).height,
          fill: u(K)(o, e).fill,
          stroke: u(K)(o, e).stroke,
          "stroke-width": u(K)(o, e).width,
          "stroke-dasharray": u(K)(o, e).dash,
          "vector-effect": "non-scaling-stroke"
        }, null, 8, Kt)) : o.shape === "circle" ? (l(), s("circle", {
          key: 1,
          cx: p(o).x,
          cy: p(o).y,
          r: p(o).radius,
          fill: u(K)(o, e).fill,
          stroke: u(K)(o, e).stroke,
          "stroke-width": u(K)(o, e).width,
          "stroke-dasharray": u(K)(o, e).dash,
          "vector-effect": "non-scaling-stroke"
        }, null, 8, Lt)) : o.shape === "path" || o.shape === "curve" ? (l(), s("path", {
          key: 2,
          d: u(ct)(o),
          fill: u(K)(o, e).fill,
          stroke: u(K)(o, e).stroke,
          "stroke-width": u(K)(o, e).width,
          "stroke-dasharray": u(K)(o, e).dash,
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "fill-rule": "evenodd",
          "vector-effect": "non-scaling-stroke"
        }, null, 8, zt)) : o.shape === "icon" ? (l(), s("g", {
          key: 3,
          class: "map-scene-icon",
          transform: `translate(${r(o).x} ${r(o).y})`
        }, [n("circle", {
          r: "11",
          stroke: u(K)(o, e).stroke
        }, null, 8, Nt), i.value ? (l(), s("text", qt, g(u(K)(o, e).icon), 1)) : (l(), s("text", Dt, g(u(K)(o, e).fallback), 1))], 8, jt)) : o.shape === "label" ? (l(), s("text", {
          key: 4,
          class: "map-scene-label is-primary",
          x: r(o).x,
          y: r(o).y
        }, g(o.label || ""), 9, Vt)) : M("", !0), o.label && o.shape !== "label" ? (l(), s("text", {
          key: 5,
          class: "map-scene-label",
          x: u(pe)(o)[0],
          y: u(pe)(o)[1]
        }, g(o.label), 9, Yt)) : M("", !0)], 10, Tt))), 128))
      ]),
      _: 1
    }, 8, [
      "style",
      "view-box",
      "reset-key",
      "label"
    ]));
  }
}), Gt = Ut, Ht = { class: "map-dialog-header" }, Xt = { class: "map-settings-content" }, Zt = { class: "map-auto-setting" }, Ft = ["aria-checked", "disabled"], Qt = { class: "map-settings-section" }, Wt = ["disabled"], Jt = { key: 0 }, ea = { class: "map-settings-section" }, ta = { key: 0 }, aa = ["disabled"], na = {
  key: 0,
  class: "map-setting-note",
  role: "status"
}, la = ["disabled"], sa = /* @__PURE__ */ Q({
  __name: "MapSettings",
  props: {
    autoMaintenance: { type: Boolean },
    busy: { type: Boolean },
    refreshDisabled: { type: Boolean },
    autoToggleBusy: { type: Boolean },
    disabledReason: {},
    hasMap: { type: Boolean },
    status: {}
  },
  emits: [
    "close",
    "setAuto",
    "update",
    "rebuild",
    "refresh"
  ],
  setup(a) {
    const t = B(null);
    return ne(() => t.value?.showModal()), (i, e) => (l(), s("dialog", {
      ref_key: "dialog",
      ref: t,
      class: "map-dialog map-settings",
      "aria-labelledby": "map-settings-title",
      onCancel: e[5] || (e[5] = F((f) => i.$emit("close"), ["prevent"])),
      onKeydown: e[6] || (e[6] = F(() => {
      }, ["stop"]))
    }, [n("header", Ht, [e[7] || (e[7] = n("div", null, [n("small", null, "让地图跟上你的故事"), n("h2", { id: "map-settings-title" }, "地图设置")], -1)), n("button", {
      type: "button",
      class: "map-round-button",
      "aria-label": "关闭地图设置",
      onClick: e[0] || (e[0] = (f) => i.$emit("close"))
    }, [_(S, { name: "close" })])]), n("div", Xt, [
      n("section", Zt, [e[9] || (e[9] = n("div", null, [n("h3", null, "随对话自动更新"), n("p", null, "你发送下一条消息时，根据上一轮对话更新地图。适用于所有普通聊天。")], -1)), n("button", {
        type: "button",
        class: "map-switch",
        role: "switch",
        "aria-checked": a.autoMaintenance,
        "aria-label": "随对话自动更新",
        disabled: a.autoToggleBusy,
        onClick: e[1] || (e[1] = (f) => i.$emit("setAuto", !a.autoMaintenance))
      }, [...e[8] || (e[8] = [n("span", null, null, -1)])], 8, Ft)]),
      n("section", Qt, [
        _(S, { name: "refresh" }),
        e[10] || (e[10] = n("h3", null, "补充最近的变化", -1)),
        e[11] || (e[11] = n("p", null, "根据最近一轮对话更新位置和地点，并补全当前区域尚缺少的探索去处。", -1)),
        n("button", {
          type: "button",
          class: "map-primary-button",
          disabled: a.busy || !!a.disabledReason || !a.hasMap,
          onClick: e[2] || (e[2] = (f) => i.$emit("update"))
        }, g(a.busy ? a.status || "请稍候…" : "更新地图"), 9, Wt),
        a.hasMap ? M("", !0) : (l(), s("small", Jt, "请先建立世界地图"))
      ]),
      n("section", ea, [
        _(S, { name: "globe" }),
        n("h3", null, g(a.hasMap ? "重新绘制世界" : "建立世界地图"), 1),
        e[12] || (e[12] = n("p", null, "依据角色与世界设定建立地图；设定未写明的地方，会合理补全。结合当前聊天保留已发生的故事。", -1)),
        a.hasMap ? (l(), s("p", ta, "新地图保存成功后替换原图；失败时保留原图。")) : M("", !0),
        n("button", {
          type: "button",
          class: "map-secondary-button",
          disabled: a.busy || !!a.disabledReason,
          onClick: e[3] || (e[3] = (f) => i.$emit("rebuild"))
        }, g(a.busy ? a.status || "请稍候…" : a.hasMap ? "重新绘制" : "绘制世界地图"), 9, aa)
      ]),
      a.disabledReason ? (l(), s("p", na, g(a.disabledReason), 1)) : M("", !0),
      n("button", {
        type: "button",
        class: "map-sync-button",
        disabled: a.busy || a.refreshDisabled,
        onClick: e[4] || (e[4] = (f) => i.$emit("refresh"))
      }, [_(S, { name: "refresh" }), e[13] || (e[13] = z("同步已保存的地图", -1))], 8, la),
      e[14] || (e[14] = n("p", { class: "map-setting-note" }, "同步只读取保存结果，不会重新生成地图。绘制或更新开始后，可以离开此页面。", -1))
    ])], 544));
  }
}), oa = sa, ra = { class: "map-search-input" }, ia = {
  class: "map-search-filters",
  "aria-label": "地点筛选"
}, ua = ["aria-pressed", "onClick"], da = { class: "map-search-results" }, ca = ["onClick"], va = { class: "map-result-icon" }, pa = { key: 0 }, fa = {
  key: 0,
  class: "map-search-empty"
}, ya = /* @__PURE__ */ Q({
  __name: "MapSearch",
  props: { atlas: {} },
  emits: ["close", "select"],
  setup(a) {
    const t = a, i = B(null), e = B(""), f = B("all"), w = C(() => t.atlas.locations.filter((b) => [
      b.name,
      b.brief,
      t.atlas.locations.find((v) => v.key === b.parent)?.name
    ].some((v) => v?.toLocaleLowerCase().includes(e.value.trim().toLocaleLowerCase())) && (f.value === "all" || (f.value === "unvisited" ? b.status !== "visited" : b.status === "visited"))));
    return ne(() => i.value?.showModal()), (b, v) => (l(), s("dialog", {
      ref_key: "dialog",
      ref: i,
      class: "map-dialog map-search-dialog",
      "aria-label": "查找地点",
      onCancel: v[2] || (v[2] = F((c) => b.$emit("close"), ["prevent"])),
      onKeydown: v[3] || (v[3] = F(() => {
      }, ["stop"]))
    }, [
      n("header", ra, [
        _(S, { name: "search" }),
        fe(n("input", {
          "onUpdate:modelValue": v[0] || (v[0] = (c) => e.value = c),
          type: "search",
          "aria-label": "搜索地点",
          placeholder: "想去哪里？",
          autofocus: ""
        }, null, 512), [[Ee, e.value]]),
        n("button", {
          type: "button",
          onClick: v[1] || (v[1] = (c) => b.$emit("close"))
        }, "取消")
      ]),
      n("nav", ia, [(l(), s(q, null, G([
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
        "aria-pressed": f.value === c.id,
        onClick: (p) => f.value = c.id
      }, g(c.name), 9, ua)), 64))]),
      n("div", da, [
        n("small", null, g(w.value.length) + " 个地点", 1),
        (l(!0), s(q, null, G(w.value, (c) => (l(), s("button", {
          key: c.key,
          type: "button",
          class: "map-search-result",
          onClick: (p) => b.$emit("select", c.key)
        }, [
          n("span", va, [_(S, { name: "pin" })]),
          n("span", null, [
            n("strong", null, g(c.name), 1),
            n("small", null, g(u(ke)[c.scale]) + " · " + g(c.status === "visited" ? "已到访" : "未到访"), 1),
            c.brief ? (l(), s("p", pa, g(c.brief), 1)) : M("", !0)
          ]),
          _(S, { name: "next" })
        ], 8, ca))), 128)),
        w.value.length ? M("", !0) : (l(), s("div", fa, [
          _(S, { name: "search" }),
          v[4] || (v[4] = n("h3", null, "还没有找到这个地点", -1)),
          v[5] || (v[5] = n("p", null, "试试其他名称，或看看全部地点。", -1))
        ]))
      ])
    ], 544));
  }
}), ma = ya, ha = {
  class: "map-place-detail",
  "aria-labelledby": "map-place-title"
}, ba = { id: "map-place-title" }, ga = { class: "map-place-content" }, ka = {
  key: 0,
  class: "map-place-full-name"
}, wa = {
  key: 1,
  class: "map-address"
}, Ma = { class: "map-place-intro" }, $a = {
  key: 2,
  class: "map-place-actions"
}, xa = {
  key: 3,
  class: "map-detail-section"
}, _a = { class: "map-people" }, Ca = {
  key: 4,
  class: "map-detail-section"
}, Sa = ["onClick"], Aa = /* @__PURE__ */ Q({
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
  setup(a) {
    const t = a, i = C(() => ue(t.map.atlas, t.location.key).slice(0, -1)), e = C(() => t.map.atlas.locations.filter((v) => v.parent === t.location.key)), f = C(() => t.map.atlas.actors.filter((v) => v.locationKey === t.location.key)), w = C(() => je(t.map.atlas, t.location.key)), b = C(() => t.location.sceneKey ? t.map.scenes[t.location.sceneKey] : void 0);
    return (v, c) => (l(), s("section", ha, [
      c[7] || (c[7] = n("div", {
        class: "map-sheet-grip",
        "aria-hidden": "true"
      }, null, -1)),
      n("header", null, [n("div", null, [n("small", null, g(u(ke)[a.location.scale]) + " · " + g(a.currentKey === a.location.key ? "当前位置" : a.location.status === "visited" ? "已到访" : "未到访"), 1), n("h2", ba, g(a.location.name), 1)]), n("button", {
        type: "button",
        class: "map-round-button",
        "aria-label": "关闭地点详情",
        onClick: c[0] || (c[0] = (p) => v.$emit("close"))
      }, [_(S, { name: "close" })])]),
      n("div", ga, [
        a.location.name.length > 24 ? (l(), s("p", ka, g(a.location.name), 1)) : M("", !0),
        i.value.length ? (l(), s("p", wa, [_(S, { name: "pin" }), z(g(i.value.map((p) => p.name).join(" · ")), 1)])) : M("", !0),
        n("p", Ma, g(a.location.brief || "这个地点已记录在世界地图上，更多介绍等待故事展开。"), 1),
        e.value.length || b.value ? (l(), s("div", $a, [e.value.length ? (l(), s("button", {
          key: 0,
          type: "button",
          class: "map-primary-button",
          onClick: c[1] || (c[1] = (p) => v.$emit("explore"))
        }, [_(S, { name: "compass" }), z("探索这里 · " + g(e.value.length) + " 处", 1)])) : M("", !0), b.value ? (l(), s("button", {
          key: 1,
          type: "button",
          class: "map-secondary-button",
          onClick: c[2] || (c[2] = (p) => v.$emit("scene"))
        }, [_(S, { name: "layers" }), c[3] || (c[3] = z("查看场景图", -1))])) : M("", !0)])) : M("", !0),
        f.value.length ? (l(), s("section", xa, [c[4] || (c[4] = n("h3", null, "记录在这里的人物", -1)), n("p", _a, [(l(!0), s(q, null, G(f.value, (p) => (l(), s("span", { key: p.actorKey }, [_(S, { name: "person" }), z(g(p.displayName), 1)]))), 128))])])) : M("", !0),
        w.value.length ? (l(), s("section", Ca, [c[5] || (c[5] = n("h3", null, "相连的地方", -1)), (l(!0), s(q, null, G(w.value, (p) => (l(), s("button", {
          key: p.link.id,
          type: "button",
          class: "map-connection",
          onClick: (r) => v.$emit("select", p.location.key)
        }, [
          _(S, { name: "route" }),
          n("span", null, [n("strong", null, g(p.location.name), 1), n("small", null, g(p.link.label || u(it)[p.link.kind]) + g(p.link.bidirectional ? "" : p.outgoing ? " · 单向前往" : " · 仅可从对面到达"), 1)]),
          _(S, { name: "next" })
        ], 8, Sa))), 128))])) : M("", !0),
        c[6] || (c[6] = n("p", { class: "map-detail-footnote" }, "查看地图不会改变你在故事中的位置", -1))
      ])
    ]));
  }
}), Oa = Aa;
function ae(a) {
  return !!a && typeof a == "object" && !Array.isArray(a);
}
function Ea(a) {
  const t = B(structuredClone(Ce(a.initialState))), i = B(null), e = B(""), f = B(!1), w = B("");
  let b = !1, v = 0, c = 0, p = () => {
  };
  const r = C(() => t.value.status === "unconfirmed" || t.value.writeState === "unconfirmed"), h = C(() => i.value !== null || ["loading", "saving"].includes(t.value.status) || ["maintaining", "rebuilding"].includes(t.value.maintenanceStatus || "")), A = C(() => h.value ? "正在更新地图，请稍候" : r.value ? "请先核实上一次保存结果" : t.value.status === "conflict" ? "保存的版本不一致，请先处理保存问题" : t.value.status !== "ready" ? t.value.message || "地图暂时不可更新" : t.value.chatIdentity ? "" : "请先打开一个聊天"), o = C(() => t.value.maintenanceStatus === "rebuilding" || i.value === "rebuild" ? "正在绘制世界…" : t.value.maintenanceStatus === "maintaining" || i.value === "maintain" ? "正在更新地图…" : i.value === "confirm" ? "正在核实保存…" : h.value ? "正在同步…" : ""), V = C(() => e.value || t.value.message || t.value.maintenanceMessage || ""), W = C(() => t.value.status !== "ready" || V.value !== w.value ? V.value : ""), L = C(() => f.value || [
    "blocked",
    "error",
    "conflict"
  ].includes(t.value.status) || t.value.maintenanceStatus === "error");
  function P(R) {
    t.value = structuredClone(R), e.value = "", f.value = !1;
  }
  function I(R, T) {
    const D = R instanceof Error ? R.message : String(R);
    return D.includes("聊天已切换") ? "聊天已切换，请重新打开地图。" : D === "host_request_timeout" ? "等待结果超时，更新可能仍在进行。请稍后查看，不要重复提交。" : T === "confirm" ? "仍无法确认保存结果，请稍后再试。" : T === "adopt" ? "未能恢复已保存的版本，当前更改仍暂停保存。" : T === "settings" ? "设置未能保存，请重试。" : "地图操作未完成，请稍后重试。";
  }
  async function j(R, T, D = {}) {
    if (i.value) return;
    const N = ++v, E = c, Y = t.value.chatIdentity;
    i.value = T, e.value = "", w.value = "", f.value = !1;
    try {
      const y = await a.bridge.request(R, {
        chatIdentity: Y,
        ...D
      }, 35e3);
      if (!b || N !== v || t.value.chatIdentity !== Y) return;
      const m = ae(y) ? y.result : void 0, $ = ae(m) && ae(m.state) ? m.state : m;
      E === c && ae($) && $.chatIdentity === Y && P($), T === "refresh" && t.value.status === "ready" && (e.value = "已同步保存的地图。"), T === "settings" && (e.value = t.value.autoMaintenance ? "自动更新已开启。" : "自动更新已关闭。"), T === "confirm" && t.value.status === "ready" && (e.value = "保存已确认。"), T === "adopt" && ae(m) && m.adoption === "adopted" && (e.value = "已恢复当前聊天中保存的 OS 数据。");
    } catch (y) {
      b && N === v && t.value.chatIdentity === Y && (e.value = I(y, T), f.value = !0);
    } finally {
      b && N === v && (i.value = null);
    }
  }
  return ne(() => {
    b = !0, p = a.bridge.subscribe((R) => {
      R.type === "map/state" ? (c += 1, P(R.payload.state)) : R.type === "map/error" && (c += 1, f.value = !0, w.value = "", e.value = R.payload.message || "地图暂时无法读取，请重新打开。");
    });
  }), he(() => {
    b = !1, v += 1, p();
  }), {
    state: t,
    activeRequest: i,
    busy: h,
    disabledReason: A,
    requiresConfirmation: r,
    status: o,
    notice: W,
    isError: L,
    dismissNotice: () => {
      w.value = V.value;
    },
    refresh: () => {
      if (!h.value && !r.value) return j("map/refresh", "refresh");
    },
    confirmSave: () => {
      if (!h.value) return j("map/confirm-save", "confirm");
    },
    adopt: () => {
      if (!h.value) return j("map/adopt-server-state", "adopt");
    },
    setAuto: (R) => j("map/set-auto-maintenance", "settings", { enabled: R }),
    update: () => {
      if (!A.value && t.value.map) return j("map/maintain-once", "maintain");
    },
    rebuild: () => {
      if (!A.value) return j("map/rebuild", "rebuild");
    }
  };
}
var Ba = { class: "map-top" }, Pa = { class: "map-search-bar" }, Ra = ["disabled"], Ia = {
  key: 0,
  class: "map-region-trail",
  "aria-label": "当前查看区域"
}, Ta = ["onClick"], Ka = {
  key: 1,
  class: "map-progress",
  role: "status"
}, La = ["disabled"], za = ["disabled"], ja = ["disabled"], Na = {
  key: 1,
  class: "map-empty"
}, qa = {
  key: 1,
  class: "map-empty"
}, Da = {
  key: 1,
  class: "map-empty map-first-map"
}, Va = { class: "map-empty-art" }, Ya = ["disabled"], Ua = {
  key: 1,
  class: "map-setting-note"
}, Ga = ["disabled"], Ha = ["aria-expanded"], Xa = {
  key: 1,
  class: "map-key"
}, Za = {
  key: 3,
  class: "map-region-card"
}, Fa = { class: "map-region-icon" }, Qa = {
  key: 4,
  class: "map-scene-caption"
}, Wa = /* @__PURE__ */ Q({
  __name: "MapApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(a) {
    const { state: t, activeRequest: i, busy: e, disabledReason: f, requiresConfirmation: w, status: b, notice: v, isError: c, dismissNotice: p, refresh: r, confirmSave: h, adopt: A, setAuto: o, update: V, rebuild: W } = Ea(a), L = B(t.value.map ? ve(t.value.map.atlas) : ""), P = B(""), I = B(""), j = B(""), R = B(0), T = B(!1), D = B(!1), N = B(!1), E = C(() => t.value.map?.atlas), Y = C(() => E.value?.actors.find((x) => x.actorKey === "player")?.locationKey || ""), y = C(() => E.value?.locations.find((x) => x.key === Y.value)), m = C(() => E.value?.locations.find((x) => x.key === P.value)), $ = C(() => E.value?.locations.find((x) => x.key === I.value)), O = C(() => $.value?.sceneKey ? t.value.map?.scenes[$.value.sceneKey] : void 0), J = C(() => E.value?.locations.find((x) => x.key === L.value)), X = C(() => E.value?.locations.filter((x) => (x.parent || "") === L.value) || []), de = C(() => X.value.filter((x) => x.status !== "visited").length), $e = C(() => E.value ? ue(E.value, L.value) : []);
    re(() => t.value, (x, d) => {
      const k = x.chatIdentity !== d.chatIdentity;
      (!d.map || k || L.value && !x.map?.atlas.locations.some((H) => H.key === L.value)) && (L.value = x.map ? ve(x.map.atlas) : ""), (k || !x.map?.atlas.locations.some((H) => H.key === P.value)) && (P.value = ""), (k || !x.map?.atlas.locations.some((H) => H.key === I.value && H.sceneKey)) && (I.value = ""), k && (T.value = !1, D.value = !1);
    });
    function le(x) {
      L.value = x, P.value = "", I.value = "", N.value = !1;
    }
    async function se(x, d = !1) {
      const k = E.value?.locations.find((H) => H.key === x);
      k && (I.value = "", P.value = x, D.value = !1, N.value = !1, d && (L.value = k.parent || ""), await Be(), j.value = E.value ? oe(E.value, x, L.value) : x, R.value += 1);
    }
    async function xe() {
      y.value && await se(y.value.key, !0);
    }
    function _e(x) {
      x.key === "Escape" && (I.value || P.value || N.value) && (x.stopPropagation(), I.value ? I.value = "" : P.value ? P.value = "" : N.value = !1);
    }
    return (x, d) => (l(), s("main", {
      class: "map-app",
      onKeydown: _e
    }, [
      n("div", Ba, [
        n("header", Pa, [
          _(S, { name: O.value ? "layers" : "search" }, null, 8, ["name"]),
          O.value ? (l(), s("button", {
            key: 1,
            type: "button",
            onClick: d[1] || (d[1] = (k) => I.value = "")
          }, [z(g($.value?.name), 1), d[23] || (d[23] = n("small", null, "返回世界地图", -1))])) : (l(), s("button", {
            key: 0,
            type: "button",
            disabled: !E.value?.locations.length,
            onClick: d[0] || (d[0] = (k) => D.value = !0)
          }, [...d[22] || (d[22] = [z("想去哪里？", -1), n("small", null, "搜索世界中的地点", -1)])], 8, Ra)),
          n("button", {
            type: "button",
            class: "map-round-button",
            "aria-label": "地图设置",
            onClick: d[2] || (d[2] = (k) => T.value = !0)
          }, [_(S, { name: "more" })])
        ]),
        E.value?.locations.length && !O.value ? (l(), s("nav", Ia, [n("button", {
          type: "button",
          onClick: d[3] || (d[3] = (k) => le(""))
        }, [_(S, { name: "globe" }), d[24] || (d[24] = z("世界", -1))]), (l(!0), s(q, null, G($e.value, (k) => (l(), s(q, { key: k.key }, [_(S, { name: "next" }), n("button", {
          type: "button",
          onClick: (H) => le(k.key)
        }, g(k.name), 9, Ta)], 64))), 128))])) : M("", !0),
        u(b) ? (l(), s("div", Ka, [d[25] || (d[25] = n("span", null, null, -1)), z(g(u(b)), 1)])) : M("", !0),
        u(v) || u(w) || u(t).status === "conflict" ? (l(), s("aside", {
          key: 2,
          class: Z(["map-notice", { "is-error": u(c) }]),
          role: "status"
        }, [n("p", null, g(u(v) || (u(w) ? "保存结果尚未确认。" : "保存的版本不一致。")), 1), u(w) ? (l(), s("button", {
          key: 0,
          type: "button",
          disabled: u(e),
          onClick: d[4] || (d[4] = (...k) => u(h) && u(h)(...k))
        }, "核实保存结果", 8, La)) : u(t).status === "conflict" ? (l(), s(q, { key: 1 }, [d[26] || (d[26] = n("small", null, "恢复会放弃尚未保存的更改，并使用当前聊天已保存的 OS 数据（不只是地图）。", -1)), n("button", {
          type: "button",
          disabled: u(e),
          onClick: d[5] || (d[5] = (...k) => u(A) && u(A)(...k))
        }, "放弃未保存更改并恢复", 8, za)], 64)) : u(t).status === "error" || u(t).status === "blocked" ? (l(), s("button", {
          key: 2,
          type: "button",
          disabled: u(e),
          onClick: d[6] || (d[6] = (...k) => u(r) && u(r)(...k))
        }, "重新读取", 8, ja)) : (l(), s("button", {
          key: 3,
          type: "button",
          class: "map-notice-close",
          "aria-label": "关闭地图提示",
          onClick: d[7] || (d[7] = (...k) => u(p) && u(p)(...k))
        }, [_(S, { name: "close" })]))], 2)) : M("", !0)
      ]),
      n("div", { class: Z(["map-canvas", { "has-detail": m.value && !O.value }]) }, [u(t).map && E.value?.locations.length ? (l(), s(q, { key: 0 }, [
        fe(_(Je, {
          atlas: u(t).map.atlas,
          region: L.value,
          "current-location-key": Y.value,
          "selected-location-key": P.value,
          "focus-key": j.value,
          "focus-sequence": R.value,
          onSelect: d[8] || (d[8] = (k) => se(k))
        }, null, 8, [
          "atlas",
          "region",
          "current-location-key",
          "selected-location-key",
          "focus-key",
          "focus-sequence"
        ]), [[Oe, !O.value]]),
        O.value ? (l(), s(q, { key: 0 }, [O.value.status === "active" ? (l(), ee(Gt, {
          key: 0,
          scene: O.value
        }, null, 8, ["scene"])) : (l(), s("div", Na, [
          _(S, { name: "layers" }),
          n("h2", null, g($.value?.name), 1),
          d[27] || (d[27] = n("p", null, [
            z("这里的内部布局还没有画出来。"),
            n("br"),
            z("故事中的细节补充后，可以更新地图。")
          ], -1)),
          n("button", {
            type: "button",
            class: "map-secondary-button",
            onClick: d[9] || (d[9] = (k) => I.value = "")
          }, "返回世界地图")
        ]))], 64)) : M("", !0),
        !O.value && !X.value.length ? (l(), s("div", qa, [
          _(S, { name: "pin" }),
          d[28] || (d[28] = n("h2", null, "这里还没有标出更多地点", -1)),
          d[29] || (d[29] = n("p", null, "可以先看看其他区域，或更新地图补充。", -1)),
          n("button", {
            type: "button",
            class: "map-secondary-button",
            onClick: d[10] || (d[10] = (k) => le(J.value?.parent || ""))
          }, "查看上级区域")
        ])) : M("", !0)
      ], 64)) : (l(), s("div", Da, [
        n("span", Va, [_(S, { name: "globe" })]),
        d[30] || (d[30] = n("small", null, "故事之外，还有一整个世界", -1)),
        n("h1", null, g(u(t).status === "loading" ? "正在打开地图…" : "下一站，去哪里？"), 1),
        d[31] || (d[31] = n("p", null, [
          z("把世界设定画成地图，"),
          n("br"),
          z("也为留白的地方添上值得探索的去处。")
        ], -1)),
        u(t).status !== "loading" ? (l(), s("button", {
          key: 0,
          type: "button",
          class: "map-primary-button",
          disabled: !!u(f),
          onClick: d[11] || (d[11] = (...k) => u(W) && u(W)(...k))
        }, g(u(e) ? u(b) || "正在准备…" : "绘制世界地图"), 9, Ya)) : M("", !0),
        u(f) && !u(e) ? (l(), s("p", Ua, g(u(f)), 1)) : M("", !0)
      ]))], 2),
      E.value?.locations.length ? (l(), s("div", {
        key: 0,
        class: Z(["map-floating-tools", { "has-detail": m.value && !O.value }])
      }, [O.value ? (l(), s("button", {
        key: 0,
        type: "button",
        class: "map-round-button",
        "aria-label": "返回世界地图",
        onClick: d[12] || (d[12] = (k) => I.value = "")
      }, [_(S, { name: "globe" })])) : (l(), s("button", {
        key: 1,
        type: "button",
        class: "map-round-button",
        disabled: !y.value,
        "aria-label": "回到我的位置",
        onClick: xe
      }, [_(S, { name: "locate" })], 8, Ga)), n("button", {
        type: "button",
        class: "map-round-button",
        "aria-expanded": N.value,
        "aria-label": "地图图例",
        onClick: d[13] || (d[13] = (k) => N.value = !N.value)
      }, [_(S, { name: "layers" })], 8, Ha)], 2)) : M("", !0),
      N.value ? (l(), s("aside", Xa, [...d[32] || (d[32] = [
        n("strong", null, "读懂这张地图", -1),
        n("p", null, [
          n("i", { class: "map-key-current" }),
          z("你在这里 "),
          n("i", { class: "map-key-place" }),
          z("可探索地点")
        ], -1),
        n("p", null, "路线连接已记录的地点；箭头表示单向通行。", -1),
        n("small", null, "世界图展示区域与地点，不按实际比例。场景图展示一个地点的内部布局。", -1)
      ])])) : M("", !0),
      m.value && u(t).map && !O.value ? (l(), ee(Oa, {
        key: m.value.key,
        location: m.value,
        map: u(t).map,
        "current-key": Y.value,
        onClose: d[14] || (d[14] = (k) => P.value = ""),
        onScene: d[15] || (d[15] = (k) => I.value = m.value.key),
        onExplore: d[16] || (d[16] = (k) => le(m.value.key)),
        onSelect: d[17] || (d[17] = (k) => se(k, !0))
      }, null, 8, [
        "location",
        "map",
        "current-key"
      ])) : E.value?.locations.length && !O.value ? (l(), s("footer", Za, [
        n("span", Fa, [_(S, { name: "compass" })]),
        n("div", null, [n("h1", null, g(J.value?.name || "世界地图"), 1), n("p", null, g(X.value.length) + " 个地点 · " + g(de.value ? de.value + " 处还没去过" : "看看熟悉的地方有什么变化"), 1)]),
        n("button", {
          type: "button",
          class: "map-round-button",
          "aria-label": "浏览全部地点",
          onClick: d[18] || (d[18] = (k) => D.value = !0)
        }, [_(S, { name: "next" })])
      ])) : O.value ? (l(), s("footer", Qa, [_(S, { name: "layers" }), n("span", null, [n("strong", null, g($.value?.name), 1), n("small", null, g(Y.value === I.value ? "当前位置的场景图" : "正在查看场景图 · 不会移动人物"), 1)])])) : M("", !0),
      D.value && E.value ? (l(), ee(ma, {
        key: 5,
        atlas: E.value,
        onClose: d[19] || (d[19] = (k) => D.value = !1),
        onSelect: d[20] || (d[20] = (k) => se(k, !0))
      }, null, 8, ["atlas"])) : M("", !0),
      T.value ? (l(), ee(oa, {
        key: 6,
        "auto-maintenance": u(t).autoMaintenance,
        busy: u(e),
        "refresh-disabled": u(w),
        "auto-toggle-busy": u(i) !== null,
        "disabled-reason": u(f),
        "has-map": !!u(t).map,
        status: u(b),
        onClose: d[21] || (d[21] = (k) => T.value = !1),
        onSetAuto: u(o),
        onUpdate: u(V),
        onRebuild: u(W),
        onRefresh: u(r)
      }, null, 8, [
        "auto-maintenance",
        "busy",
        "refresh-disabled",
        "auto-toggle-busy",
        "disabled-reason",
        "has-map",
        "status",
        "onSetAuto",
        "onUpdate",
        "onRebuild",
        "onRefresh"
      ])) : M("", !0)
    ], 32));
  }
}), on = Wa;
export {
  on as default
};
