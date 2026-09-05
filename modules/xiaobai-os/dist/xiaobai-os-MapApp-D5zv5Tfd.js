/* eslint-disable */
import { A as ue, B as Oe, E as Ee, F as B, L as Be, M as he, O as be, R as r, S as le, T as G, V as m, _ as F, a as Pe, b as ge, c as q, d as ee, f as M, g as x, h as N, i as Re, j as ke, l as S, o as fe, p as s, s as Z, u as l, w as n, y as Ie, z as H } from "./xiaobai-os-runtime-dom.esm-bundler-DmE9neiz.js";
var Te = { class: "map-viewport" }, Ke = ["viewBox", "aria-label"], Le = {
  class: "map-viewport-controls",
  "aria-label": "地图缩放"
}, ze = /* @__PURE__ */ F({
  __name: "MapViewport",
  props: {
    viewBox: {},
    resetKey: { default: "" },
    label: {},
    focusPoint: { default: void 0 },
    focusSequence: { default: 0 }
  },
  setup(a) {
    const t = a, u = B(null), e = B([...t.viewBox]), p = B([0, 0]), k = S(() => p.value[0] && p.value[1] ? Math.max(e.value[2] / p.value[0], e.value[3] / p.value[1]) : 1);
    let b;
    le(() => {
      b = new ResizeObserver((y) => {
        const w = y[0].contentRect;
        p.value = [w.width, w.height];
      }), u.value && b.observe(u.value);
    });
    const v = /* @__PURE__ */ new Map();
    let d = null, f = [0, 0], i = 0, h = null, O = !1, o = !1, D = null;
    const Q = S(() => e.value.join(" "));
    function z() {
      e.value = [...t.viewBox];
    }
    function P() {
      return k.value;
    }
    function T(y, w) {
      const _ = u.value?.getBoundingClientRect();
      if (!_) return [e.value[0], e.value[1]];
      const I = P();
      return [e.value[0] + e.value[2] / 2 + (y - _.left - _.width / 2) * I, e.value[1] + e.value[3] / 2 + (w - _.top - _.height / 2) * I];
    }
    function A(y, w) {
      const _ = Math.max(1, t.viewBox[2]), I = Math.min(_ * 3, Math.max(Math.min(_ * 0.24, 240), e.value[2] * y)), J = I / e.value[2], W = w || [e.value[0] + e.value[2] / 2, e.value[1] + e.value[3] / 2];
      e.value = [
        W[0] - (W[0] - e.value[0]) * J,
        W[1] - (W[1] - e.value[1]) * J,
        I,
        e.value[3] * J
      ];
    }
    function R() {
      if (!t.focusPoint) return;
      const y = Math.min(e.value[2], 620), w = e.value[3] * y / e.value[2];
      e.value = [
        t.focusPoint[0] - y / 2,
        t.focusPoint[1] - w / 2,
        y,
        w
      ];
    }
    function K() {
      const y = [...v.values()];
      y.length === 1 && (d = y[0], f = [e.value[0], e.value[1]]), y.length === 2 && (i = Math.hypot(y[1][0] - y[0][0], y[1][1] - y[0][1]), h = [(y[0][0] + y[1][0]) / 2, (y[0][1] + y[1][1]) / 2], O = !0);
    }
    function Y(y) {
      y.button !== 0 || v.size >= 2 || (v.size || (O = !1), v.set(y.pointerId, [y.clientX, y.clientY]), y.target.setPointerCapture(y.pointerId), K());
    }
    function V(y) {
      if (!v.has(y.pointerId)) return;
      v.set(y.pointerId, [y.clientX, y.clientY]);
      const w = [...v.values()];
      if (w.length === 2 && h) {
        const _ = Math.hypot(w[1][0] - w[0][0], w[1][1] - w[0][1]), I = [(w[0][0] + w[1][0]) / 2, (w[0][1] + w[1][1]) / 2];
        _ > 0 && i > 0 && A(i / _, T(...h)), e.value[0] -= (I[0] - h[0]) * P(), e.value[1] -= (I[1] - h[1]) * P(), i = _, h = I;
      } else if (d) {
        const _ = y.clientX - d[0], I = y.clientY - d[1];
        Math.abs(_) + Math.abs(I) > 4 && (O = !0), e.value = [
          f[0] - _ * P(),
          f[1] - I * P(),
          e.value[2],
          e.value[3]
        ];
      }
    }
    function j(y) {
      if (!v.delete(y.pointerId)) return;
      const w = y.target;
      w.hasPointerCapture(y.pointerId) && w.releasePointerCapture(y.pointerId), K(), v.size || (d = null, h = null), O && (o = !0, D && clearTimeout(D), D = setTimeout(() => {
        o = !1;
      }, 0));
    }
    function E(y) {
      o && (y.preventDefault(), y.stopPropagation());
    }
    return ue(() => t.resetKey, z, { immediate: !0 }), ue(() => t.focusSequence, R, { flush: "post" }), ge(() => {
      b?.disconnect(), D && clearTimeout(D);
    }), (y, w) => (n(), s("div", Te, [(n(), s("svg", {
      ref_key: "svg",
      ref: u,
      class: "map-viewport-svg",
      viewBox: Q.value,
      preserveAspectRatio: "xMidYMid meet",
      role: "group",
      "aria-label": a.label,
      onWheel: w[0] || (w[0] = Z((_) => A(_.deltaY < 0 ? 0.84 : 1.19, T(_.clientX, _.clientY)), ["prevent"])),
      onPointerdown: Y,
      onPointermove: V,
      onPointerup: j,
      onPointercancel: j,
      onClickCapture: E
    }, [Ee(y.$slots, "default", { unitScale: k.value })], 40, Ke)), l("div", Le, [
      l("button", {
        type: "button",
        "aria-label": "放大地图",
        onClick: w[1] || (w[1] = (_) => A(0.8))
      }, "+"),
      l("button", {
        type: "button",
        "aria-label": "缩小地图",
        onClick: w[2] || (w[2] = (_) => A(1.25))
      }, "−"),
      l("button", {
        type: "button",
        class: "map-fit",
        onClick: z
      }, "全图")
    ])]));
  }
}), we = ze, je = {
  class: "map-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.7",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, Ne = ["d"], qe = /* @__PURE__ */ F({
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
    return (u, e) => (n(), s("svg", je, [l("path", { d: t[a.name] || t.pin }, null, 8, Ne)]));
  }
}), C = qe;
function ce(a, t) {
  const u = new Map(a.locations.map((k) => [k.key, k])), e = [];
  let p = u.get(t);
  for (; p; )
    e.unshift(p), p = p.parent ? u.get(p.parent) : void 0;
  return e;
}
function ye(a) {
  const t = a.locations.filter((u) => !u.parent);
  return t.length === 1 && a.locations.some((u) => u.parent === t[0].key) ? t[0].key : "";
}
function oe(a, t, u) {
  return ce(a, t).find((e) => (e.parent || "") === u)?.key || "";
}
function De(a, t) {
  return a.links.flatMap((u) => {
    if (u.from !== t && u.to !== t) return [];
    const e = a.locations.find((p) => p.key === (u.from === t ? u.to : u.from));
    return e ? [{
      location: e,
      link: u,
      outgoing: u.bidirectional || u.from === t
    }] : [];
  });
}
function Ve(a, t) {
  const u = a.locations.filter((f) => (f.parent || "") === t).sort((f, i) => f.key.localeCompare(i.key, "en")), e = u.filter((f) => f.position).map((f) => ({
    location: f,
    x: f.position[0],
    y: f.position[1],
    placed: !0
  }));
  let p = 0;
  for (const f of u.filter((i) => !i.position)) {
    let i, h;
    do {
      const O = p * 2.3999632297, o = 155 * Math.sqrt(p++);
      i = Math.round(500 + Math.cos(O) * o), h = Math.round(420 + Math.sin(O) * o);
    } while (e.some((O) => Math.hypot(O.x - i, O.y - h) < 160));
    e.push({
      location: f,
      x: i,
      y: h,
      placed: !1
    });
  }
  e.sort((f, i) => f.location.key.localeCompare(i.location.key, "en"));
  const k = new Map(e.map((f) => [f.location.key, f])), b = a.links.flatMap((f) => {
    const i = k.get(oe(a, f.from, t)), h = k.get(oe(a, f.to, t));
    if (!i || !h || i === h) return [];
    const O = (i.x + h.x) / 2, o = (i.y + h.y) / 2;
    return [{
      link: f,
      from: i,
      to: h,
      x: O,
      y: o,
      path: `M ${i.x} ${i.y} Q ${O + (h.y - i.y) * 0.12} ${o - (h.x - i.x) * 0.12} ${h.x} ${h.y}`
    }];
  }), v = e.length ? Math.min(...e.map((f) => f.x)) - 140 : 0, d = e.length ? Math.min(...e.map((f) => f.y)) - 150 : 0;
  return {
    nodes: e,
    routes: b,
    viewBox: [
      v,
      d,
      e.length ? Math.max(420, Math.max(...e.map((f) => f.x)) - v + 140) : 800,
      e.length ? Math.max(500, Math.max(...e.map((f) => f.y)) - d + 190) : 900
    ]
  };
}
var Ye = {
  class: "map-landscapes",
  "aria-hidden": "true"
}, Ue = ["transform"], Ge = {
  class: "map-world-roads",
  "aria-hidden": "true"
}, He = ["d"], Xe = ["d", "marker-end"], Ze = ["x", "y"], Fe = [
  "transform",
  "aria-label",
  "onClick",
  "onKeydown"
], Qe = { transform: "translate(-14 -20)" }, We = {
  y: "64",
  class: "map-place-name"
}, Je = {
  key: 0,
  y: "89",
  class: "map-place-status"
}, et = {
  key: 1,
  y: "89",
  class: "map-place-status"
}, tt = /* @__PURE__ */ F({
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
    const t = a, u = S(() => Ve(t.atlas, t.region)), e = S(() => oe(t.atlas, t.currentLocationKey, t.region)), p = S(() => u.value.nodes.find((v) => v.location.key === t.focusKey)), k = "map-arrow-" + be();
    function b(v, d) {
      return v === "water" ? "water" : v === "forest" ? "tree" : v === "mountain" ? "mountain" : ["world", "region"].includes(d) ? "globe" : d === "outdoor" ? "compass" : "building";
    }
    return (v, d) => (n(), ee(we, {
      "view-box": u.value.viewBox,
      "reset-key": a.region,
      label: "世界地图",
      "focus-point": p.value ? [p.value.x, p.value.y] : void 0,
      "focus-sequence": a.focusSequence
    }, {
      default: ke(({ unitScale: f }) => [
        l("defs", null, [l("marker", {
          id: k,
          viewBox: "0 0 10 10",
          refX: "16",
          refY: "5",
          markerWidth: "5",
          markerHeight: "5",
          orient: "auto"
        }, [...d[0] || (d[0] = [l("path", {
          d: "M1 1l8 4-8 4z",
          fill: "var(--map-road-ink)"
        }, null, -1)])])]),
        l("g", Ye, [(n(!0), s(q, null, G(u.value.nodes, (i) => (n(), s("g", {
          key: i.location.key,
          transform: `translate(${i.x} ${i.y})`,
          class: H(`is-${i.location.terrain || "urban"}`)
        }, [...d[1] || (d[1] = [l("path", { d: "M-108-20Q-100-100-32-94T87-56Q127-13 99 48T21 99Q-57 113-90 65T-108-20Z" }, null, -1), l("path", {
          class: "map-contour",
          d: "M-133-22Q-124-126-39-116T110-70Q156-17 124 60T26 123Q-71 139-112 81T-133-22Z"
        }, null, -1)])], 10, Ue))), 128))]),
        l("g", Ge, [(n(!0), s(q, null, G(u.value.routes, (i) => (n(), s("g", {
          key: i.link.id,
          class: H({
            "is-path": i.link.kind === "path",
            "is-portal": i.link.kind === "portal"
          })
        }, [
          l("path", {
            class: "map-road-casing",
            d: i.path
          }, null, 8, He),
          l("path", {
            class: "map-road-line",
            d: i.path,
            "marker-end": i.link.bidirectional ? void 0 : `url(#${k})`
          }, null, 8, Xe),
          i.link.label ? (n(), s("text", {
            key: 0,
            x: i.x,
            y: i.y - 14
          }, m(i.link.label), 9, Ze)) : M("", !0)
        ], 2))), 128))]),
        (n(!0), s(q, null, G(u.value.nodes, (i) => (n(), s("g", {
          key: i.location.key,
          class: H(["map-place", {
            "is-selected": i.location.key === a.selectedLocationKey,
            "is-current": i.location.key === e.value,
            "is-unvisited": i.location.status !== "visited"
          }]),
          transform: `translate(${i.x} ${i.y}) scale(${f * 0.5})`,
          role: "button",
          tabindex: "0",
          "aria-label": `查看${i.location.name}`,
          onClick: Z((h) => v.$emit("select", i.location.key), ["stop"]),
          onKeydown: [fe(Z((h) => v.$emit("select", i.location.key), ["stop"]), ["enter"]), fe(Z((h) => v.$emit("select", i.location.key), ["stop", "prevent"]), ["space"])]
        }, [
          d[2] || (d[2] = l("circle", {
            class: "map-pin-halo",
            r: "39"
          }, null, -1)),
          d[3] || (d[3] = l("path", {
            class: "map-pin-body",
            d: "M0 33C-6 25-26 8-26-6a26 26 0 0 1 52 0C26 8 6 25 0 33Z"
          }, null, -1)),
          l("g", Qe, [x(C, {
            name: b(i.location.terrain, i.location.scale),
            width: "28",
            height: "28"
          }, null, 8, ["name"])]),
          l("text", We, m(i.location.name.length > 14 ? i.location.name.slice(0, 13) + "…" : i.location.name), 1),
          i.location.key === e.value ? (n(), s("text", Je, "你在这里")) : i.location.status !== "visited" ? (n(), s("text", et, "未到访")) : M("", !0),
          l("title", null, m(i.location.name) + m(i.location.brief ? " · " + i.location.brief : ""), 1)
        ], 42, Fe))), 128))
      ]),
      _: 1
    }, 8, [
      "view-box",
      "reset-key",
      "focus-point",
      "focus-sequence"
    ]));
  }
}), at = tt, te;
async function lt() {
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
var nt = Object.freeze({
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
}), st = Object.freeze({
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
}), ot = Object.freeze({
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
}), rt = Object.freeze({
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
}), it = Object.freeze({
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
}), ut = Object.freeze({
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
}), de = Object.freeze({
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
}), Me = Object.freeze({
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
}), dt = Object.freeze({
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
}), $e = Object.freeze({
  world: "世界",
  region: "区域",
  city: "城市",
  district: "区域",
  building: "建筑",
  floor: "楼层",
  room: "房间",
  outdoor: "户外"
}), ct = Object.freeze({
  door: "门",
  stairs: "楼梯",
  elevator: "电梯",
  path: "小径",
  road: "道路",
  portal: "传送门",
  passage: "通道"
}), vt = /* @__PURE__ */ new Set([
  "water",
  "terrain",
  "furniture",
  "decoration",
  "danger",
  "magic",
  "secret",
  "light"
]);
function pt(a, t) {
  return a < t ? -1 : a > t ? 1 : 0;
}
function U(a) {
  return Number(a.toFixed(3)).toString();
}
function _e(a) {
  const t = a.geometry;
  return Array.isArray(t.points) ? t.points : [];
}
function xe(a) {
  return a.shape === "rect" || a.shape === "circle" ? !0 : _e(a).length >= 3 && (a.closed === !0 || vt.has(a.category));
}
function ft(a) {
  const t = _e(a);
  if (t.length < 2) return "";
  const u = xe(a) ? " Z" : "";
  if (a.shape === "path") return `M ${t.map(([p, k]) => `${U(p)} ${U(k)}`).join(" L ")}${u}`;
  const e = [`M ${U(t[0][0])} ${U(t[0][1])}`];
  for (let p = 0; p < t.length - 1; p += 1) {
    const k = t[p - 1] || t[p], b = t[p], v = t[p + 1], d = t[p + 2] || v, f = b[0] + (v[0] - k[0]) / 6, i = b[1] + (v[1] - k[1]) / 6, h = v[0] - (d[0] - b[0]) / 6, O = v[1] - (d[1] - b[1]) / 6;
    e.push(`C ${U(f)} ${U(i)}, ${U(h)} ${U(O)}, ${U(v[0])} ${U(v[1])}`);
  }
  return e.join(" ") + u;
}
function me(a) {
  const t = a.geometry;
  if (typeof t.x == "number" && typeof t.y == "number")
    return a.shape === "rect" ? [t.x + (t.width || 0) / 2, t.y + (t.height || 0) / 2] : a.shape === "circle" ? [t.x, t.y - (t.radius || 0) - 8] : [t.x, t.y + (a.shape === "icon" ? 18 : 0)];
  const u = t.points || [];
  if (!u.length) return [0, 0];
  const [e, p] = u.reduce((k, b) => [k[0] + b[0], k[1] + b[1]], [0, 0]);
  return [e / u.length, p / u.length];
}
function L(a, t) {
  const u = nt[a.category], e = xe(a), p = e && a.material ? `url(#${t}-material-${a.material})` : "", k = a.certainty === "inferred" ? "8 6" : a.certainty === "unknown" ? "3 7" : u.dash;
  return {
    ...u,
    fill: e ? p || u.fill || Me[a.material] : "none",
    opacity: a.certainty === "unknown" ? 0.48 : a.certainty === "inferred" ? 0.72 : 1,
    dash: k,
    icon: a.icon ? it[a.icon] : a.kind ? ot[a.kind] : ut[a.category],
    fallback: a.kind ? rt[a.kind] : st[a.category].slice(0, 1),
    z: de[a.category]
  };
}
function yt(a) {
  return [...a].sort((t, u) => de[t.category] - de[u.category] || pt(t.id, u.id));
}
var ul = Object.freeze([
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
]), dl = Object.freeze([
  "rect",
  "circle",
  "path",
  "curve",
  "icon",
  "label"
]), cl = Object.freeze([
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
]), mt = Object.freeze([
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
]), vl = Object.freeze([
  "confirmed",
  "inferred",
  "unknown"
]), pl = Object.freeze([
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
]), fl = Object.freeze(/* @__PURE__ */ new Set([
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
])), ht = ["id"], bt = ["fill"], gt = {
  key: 0,
  d: "M0 6H24M0 18H24M7 0V6M17 6V18M10 18V24"
}, kt = {
  key: 1,
  d: "M0 8L7 3l8 3 9-4M2 19l8-5 10 4 4-3"
}, wt = {
  key: 2,
  d: "M0 8H24M0 16H24M8 0v24m8-24v24"
}, Mt = {
  key: 3,
  d: "M-4 6q6-5 12 0t12 0t12 0M-4 17q6-5 12 0t12 0t12 0"
}, $t = {
  key: 4,
  d: "M4 20l2-7 2 7M13 13l2-8 2 8M19 23l2-6 2 6"
}, _t = {
  key: 5,
  d: "M3 5h2m8 3h3m3 10h2M7 19h3"
}, xt = {
  key: 6,
  cx: "6",
  cy: "7",
  r: "1.1"
}, Ct = {
  key: 7,
  cx: "18",
  cy: "16",
  r: "1"
}, St = {
  key: 8,
  d: "M12 3v18M4 7l16 10M20 7L4 17"
}, At = {
  key: 9,
  d: "M0 4h24M0 20h24"
}, Ot = {
  key: 10,
  cx: "5",
  cy: "12",
  r: "1.2"
}, Et = {
  key: 11,
  cx: "19",
  cy: "12",
  r: "1.2"
}, Bt = {
  key: 12,
  d: "M0 4q6 4 12 0t12 0M0 16q6 4 12 0t12 0"
}, Pt = {
  key: 13,
  d: "M0 6l7 5 5-8 5 13 7-5M0 22l8-5 6 4 10-8"
}, Rt = {
  key: 14,
  d: "M12 2l4 7 6 3-6 4-4 6-4-6-6-4 6-3zM8 9l8 7m0-7l-8 7"
}, It = {
  key: 15,
  d: "M12 2v20M2 12h20M5 5l14 14M19 5L5 19"
}, Tt = [
  "x",
  "y",
  "width",
  "height"
], Kt = [
  "x",
  "y",
  "width",
  "height"
], Lt = [
  "cx",
  "cy",
  "rx",
  "ry"
], zt = ["opacity"], jt = [
  "x",
  "y",
  "width",
  "height",
  "fill",
  "stroke",
  "stroke-width",
  "stroke-dasharray"
], Nt = [
  "cx",
  "cy",
  "r",
  "fill",
  "stroke",
  "stroke-width",
  "stroke-dasharray"
], qt = [
  "d",
  "fill",
  "stroke",
  "stroke-width",
  "stroke-dasharray"
], Dt = ["transform"], Vt = ["stroke"], Yt = {
  key: 0,
  class: "map-material-symbol",
  "aria-hidden": "true"
}, Ut = {
  key: 1,
  class: "map-symbol-fallback",
  "aria-hidden": "true"
}, Gt = ["x", "y"], Ht = ["x", "y"], Xt = /* @__PURE__ */ F({
  __name: "MapScene",
  props: { scene: {} },
  setup(a) {
    const t = a, u = B(!1);
    le(() => {
      lt().then(() => {
        u.value = !0;
      }).catch(() => {
        u.value = !1;
      });
    });
    const e = `xiaobai-map-scene-${be()}`, p = mt, k = S(() => yt(t.scene.elements)), b = S(() => dt[t.scene.mood || "neutral"]), v = S(() => ({
      "--map-canvas-glow": b.value.glow,
      "--map-canvas-accent": b.value.accent
    }));
    function d(h) {
      return h.geometry;
    }
    function f(h) {
      return h.geometry;
    }
    function i(h) {
      return h.geometry;
    }
    return (h, O) => (n(), ee(we, {
      class: "map-scene-viewport",
      style: Oe(v.value),
      "view-box": a.scene.viewBox,
      "reset-key": a.scene.key,
      label: `${a.scene.name} 场景地图`
    }, {
      default: ke(() => [
        l("defs", null, [
          O[0] || (O[0] = l("pattern", {
            id: "map-scene-minor-grid",
            width: "20",
            height: "20",
            patternUnits: "userSpaceOnUse"
          }, [l("path", {
            d: "M20 0H0V20",
            fill: "none",
            stroke: "rgba(102, 181, 231, .08)",
            "stroke-width": "1"
          })], -1)),
          O[1] || (O[1] = l("pattern", {
            id: "map-scene-major-grid",
            width: "100",
            height: "100",
            patternUnits: "userSpaceOnUse"
          }, [l("rect", {
            width: "100",
            height: "100",
            fill: "url(#map-scene-minor-grid)"
          }), l("path", {
            d: "M100 0H0V100",
            fill: "none",
            stroke: "rgba(102, 181, 231, .15)",
            "stroke-width": "1.4"
          })], -1)),
          (n(!0), s(q, null, G(r(p), (o) => (n(), s("pattern", {
            id: `${e}-material-${o}`,
            key: o,
            width: "24",
            height: "24",
            patternUnits: "userSpaceOnUse",
            class: H(`map-material-pattern is-${o}`)
          }, [
            l("rect", {
              width: "24",
              height: "24",
              fill: `color-mix(in srgb, ${r(Me)[o]}, var(--map-surface) 48%)`
            }, null, 8, bt),
            o === "wood" ? (n(), s("path", gt)) : o === "stone" ? (n(), s("path", kt)) : o === "tile" || o === "marble" ? (n(), s("path", wt)) : o === "water" ? (n(), s("path", Mt)) : o === "grass" ? (n(), s("path", $t)) : o === "dirt" ? (n(), s("path", _t)) : o === "sand" ? (n(), s("circle", xt)) : M("", !0),
            o === "sand" ? (n(), s("circle", Ct)) : o === "snow" ? (n(), s("path", St)) : o === "metal" ? (n(), s("path", At)) : M("", !0),
            o === "metal" ? (n(), s("circle", Ot)) : M("", !0),
            o === "metal" ? (n(), s("circle", Et)) : o === "fabric" || o === "carpet" || o === "bed-sheet" || o === "tatami" ? (n(), s("path", Bt)) : o === "blood" ? (n(), s("path", Pt)) : o === "rune" ? (n(), s("path", Rt)) : o === "warm-light" || o === "cold-light" || o === "shadow" ? (n(), s("path", It)) : M("", !0)
          ], 10, ht))), 128)),
          O[2] || (O[2] = l("filter", {
            id: "map-scene-icon-glow",
            x: "-80%",
            y: "-80%",
            width: "260%",
            height: "260%"
          }, [l("feGaussianBlur", {
            stdDeviation: "2.5",
            result: "blur"
          }), l("feMerge", null, [l("feMergeNode", { in: "blur" }), l("feMergeNode", { in: "SourceGraphic" })])], -1))
        ]),
        l("rect", {
          x: a.scene.viewBox[0],
          y: a.scene.viewBox[1],
          width: a.scene.viewBox[2],
          height: a.scene.viewBox[3],
          fill: "var(--map-canvas-bg)"
        }, null, 8, Tt),
        l("rect", {
          x: a.scene.viewBox[0],
          y: a.scene.viewBox[1],
          width: a.scene.viewBox[2],
          height: a.scene.viewBox[3],
          fill: "url(#map-scene-major-grid)"
        }, null, 8, Kt),
        l("ellipse", {
          cx: a.scene.viewBox[0] + a.scene.viewBox[2] / 2,
          cy: a.scene.viewBox[1] + a.scene.viewBox[3] / 2,
          rx: a.scene.viewBox[2] * 0.42,
          ry: a.scene.viewBox[3] * 0.42,
          fill: "var(--map-canvas-glow)"
        }, null, 8, Lt),
        (n(!0), s(q, null, G(k.value, (o) => (n(), s("g", {
          key: o.id,
          class: H(["map-scene-element", [`is-${o.category}`, `is-${o.certainty || "confirmed"}`]]),
          opacity: r(L)(o, e).opacity
        }, [o.shape === "rect" ? (n(), s("rect", {
          key: 0,
          x: d(o).x,
          y: d(o).y,
          width: d(o).width,
          height: d(o).height,
          fill: r(L)(o, e).fill,
          stroke: r(L)(o, e).stroke,
          "stroke-width": r(L)(o, e).width,
          "stroke-dasharray": r(L)(o, e).dash,
          "vector-effect": "non-scaling-stroke"
        }, null, 8, jt)) : o.shape === "circle" ? (n(), s("circle", {
          key: 1,
          cx: f(o).x,
          cy: f(o).y,
          r: f(o).radius,
          fill: r(L)(o, e).fill,
          stroke: r(L)(o, e).stroke,
          "stroke-width": r(L)(o, e).width,
          "stroke-dasharray": r(L)(o, e).dash,
          "vector-effect": "non-scaling-stroke"
        }, null, 8, Nt)) : o.shape === "path" || o.shape === "curve" ? (n(), s("path", {
          key: 2,
          d: r(ft)(o),
          fill: r(L)(o, e).fill,
          stroke: r(L)(o, e).stroke,
          "stroke-width": r(L)(o, e).width,
          "stroke-dasharray": r(L)(o, e).dash,
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "fill-rule": "evenodd",
          "vector-effect": "non-scaling-stroke"
        }, null, 8, qt)) : o.shape === "icon" ? (n(), s("g", {
          key: 3,
          class: "map-scene-icon",
          transform: `translate(${i(o).x} ${i(o).y})`
        }, [l("circle", {
          r: "11",
          stroke: r(L)(o, e).stroke
        }, null, 8, Vt), u.value ? (n(), s("text", Yt, m(r(L)(o, e).icon), 1)) : (n(), s("text", Ut, m(r(L)(o, e).fallback), 1))], 8, Dt)) : o.shape === "label" ? (n(), s("text", {
          key: 4,
          class: "map-scene-label is-primary",
          x: i(o).x,
          y: i(o).y
        }, m(o.label || ""), 9, Gt)) : M("", !0), o.label && o.shape !== "label" ? (n(), s("text", {
          key: 5,
          class: "map-scene-label",
          x: r(me)(o)[0],
          y: r(me)(o)[1]
        }, m(o.label), 9, Ht)) : M("", !0)], 10, zt))), 128))
      ]),
      _: 1
    }, 8, [
      "style",
      "view-box",
      "reset-key",
      "label"
    ]));
  }
}), Zt = Xt, Ft = { class: "map-dialog-header" }, Qt = { class: "map-settings-content" }, Wt = { class: "map-auto-setting" }, Jt = ["aria-checked", "disabled"], ea = { class: "map-settings-section" }, ta = ["disabled"], aa = { key: 0 }, la = { class: "map-settings-section" }, na = { key: 0 }, sa = ["disabled"], oa = {
  key: 0,
  class: "map-setting-note",
  role: "status"
}, ra = ["disabled"], ia = /* @__PURE__ */ F({
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
    return le(() => t.value?.showModal()), (u, e) => (n(), s("dialog", {
      ref_key: "dialog",
      ref: t,
      class: "map-dialog map-settings",
      "aria-labelledby": "map-settings-title",
      onCancel: e[5] || (e[5] = Z((p) => u.$emit("close"), ["prevent"])),
      onKeydown: e[6] || (e[6] = Z(() => {
      }, ["stop"]))
    }, [l("header", Ft, [e[7] || (e[7] = l("div", null, [l("small", null, "让地图跟上你的故事"), l("h2", { id: "map-settings-title" }, "地图设置")], -1)), l("button", {
      type: "button",
      class: "map-round-button",
      "aria-label": "关闭地图设置",
      onClick: e[0] || (e[0] = (p) => u.$emit("close"))
    }, [x(C, { name: "close" })])]), l("div", Qt, [
      l("section", Wt, [e[9] || (e[9] = l("div", null, [l("h3", null, "随对话自动更新"), l("p", null, "你发送下一条消息时，根据上一轮对话更新地图。适用于所有普通聊天。")], -1)), l("button", {
        type: "button",
        class: "map-switch",
        role: "switch",
        "aria-checked": a.autoMaintenance,
        "aria-label": "随对话自动更新",
        disabled: a.autoToggleBusy,
        onClick: e[1] || (e[1] = (p) => u.$emit("setAuto", !a.autoMaintenance))
      }, [...e[8] || (e[8] = [l("span", null, null, -1)])], 8, Jt)]),
      l("section", ea, [
        x(C, { name: "refresh" }),
        e[10] || (e[10] = l("h3", null, "补充最近的变化", -1)),
        e[11] || (e[11] = l("p", null, "根据最近一轮对话更新位置和地点，并补全当前区域尚缺少的探索去处。", -1)),
        l("button", {
          type: "button",
          class: "map-primary-button",
          disabled: a.busy || !!a.disabledReason || !a.hasMap,
          onClick: e[2] || (e[2] = (p) => u.$emit("update"))
        }, m(a.busy ? a.status || "请稍候…" : "更新地图"), 9, ta),
        a.hasMap ? M("", !0) : (n(), s("small", aa, "请先建立世界地图"))
      ]),
      l("section", la, [
        x(C, { name: "globe" }),
        l("h3", null, m(a.hasMap ? "重新绘制世界" : "建立世界地图"), 1),
        e[12] || (e[12] = l("p", null, "依据角色与世界设定建立地图；设定未写明的地方，会合理补全。结合当前聊天保留已发生的故事。", -1)),
        a.hasMap ? (n(), s("p", na, "新地图保存成功后替换原图；失败时保留原图。")) : M("", !0),
        l("button", {
          type: "button",
          class: "map-secondary-button",
          disabled: a.busy || !!a.disabledReason,
          onClick: e[3] || (e[3] = (p) => u.$emit("rebuild"))
        }, m(a.busy ? a.status || "请稍候…" : a.hasMap ? "重新绘制" : "绘制世界地图"), 9, sa)
      ]),
      a.disabledReason ? (n(), s("p", oa, m(a.disabledReason), 1)) : M("", !0),
      l("button", {
        type: "button",
        class: "map-sync-button",
        disabled: a.busy || a.refreshDisabled,
        onClick: e[4] || (e[4] = (p) => u.$emit("refresh"))
      }, [x(C, { name: "refresh" }), e[13] || (e[13] = N("同步已保存的地图", -1))], 8, ra),
      e[14] || (e[14] = l("p", { class: "map-setting-note" }, "同步只读取保存结果，不会重新生成地图。绘制或更新开始后，可以离开此页面。", -1))
    ])], 544));
  }
}), ua = ia, da = { class: "map-search-input" }, ca = {
  class: "map-search-filters",
  "aria-label": "地点筛选"
}, va = ["aria-pressed", "onClick"], pa = { class: "map-search-results" }, fa = ["onClick"], ya = { class: "map-result-icon" }, ma = { key: 0 }, ha = {
  key: 0,
  class: "map-search-empty"
}, ba = /* @__PURE__ */ F({
  __name: "MapSearch",
  props: { atlas: {} },
  emits: ["close", "select"],
  setup(a) {
    const t = a, u = B(null), e = B(""), p = B("all"), k = S(() => t.atlas.locations.filter((b) => [
      b.name,
      b.brief,
      t.atlas.locations.find((v) => v.key === b.parent)?.name
    ].some((v) => v?.toLocaleLowerCase().includes(e.value.trim().toLocaleLowerCase())) && (p.value === "all" || (p.value === "unvisited" ? b.status !== "visited" : b.status === "visited"))));
    return le(() => u.value?.showModal()), (b, v) => (n(), s("dialog", {
      ref_key: "dialog",
      ref: u,
      class: "map-dialog map-search-dialog",
      "aria-label": "查找地点",
      onCancel: v[2] || (v[2] = Z((d) => b.$emit("close"), ["prevent"])),
      onKeydown: v[3] || (v[3] = Z(() => {
      }, ["stop"]))
    }, [
      l("header", da, [
        x(C, { name: "search" }),
        he(l("input", {
          "onUpdate:modelValue": v[0] || (v[0] = (d) => e.value = d),
          type: "search",
          "aria-label": "搜索地点",
          placeholder: "想去哪里？",
          autofocus: ""
        }, null, 512), [[Re, e.value]]),
        l("button", {
          type: "button",
          onClick: v[1] || (v[1] = (d) => b.$emit("close"))
        }, "取消")
      ]),
      l("nav", ca, [(n(), s(q, null, G([
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
      ], (d) => l("button", {
        key: d.id,
        type: "button",
        "aria-pressed": p.value === d.id,
        onClick: (f) => p.value = d.id
      }, m(d.name), 9, va)), 64))]),
      l("div", pa, [
        l("small", null, m(k.value.length) + " 个地点", 1),
        (n(!0), s(q, null, G(k.value, (d) => (n(), s("button", {
          key: d.key,
          type: "button",
          class: "map-search-result",
          onClick: (f) => b.$emit("select", d.key)
        }, [
          l("span", ya, [x(C, { name: "pin" })]),
          l("span", null, [
            l("strong", null, m(d.name), 1),
            l("small", null, m(r($e)[d.scale]) + " · " + m(d.status === "visited" ? "已到访" : "未到访"), 1),
            d.brief ? (n(), s("p", ma, m(d.brief), 1)) : M("", !0)
          ]),
          x(C, { name: "next" })
        ], 8, fa))), 128)),
        k.value.length ? M("", !0) : (n(), s("div", ha, [
          x(C, { name: "search" }),
          v[4] || (v[4] = l("h3", null, "还没有找到这个地点", -1)),
          v[5] || (v[5] = l("p", null, "试试其他名称，或看看全部地点。", -1))
        ]))
      ])
    ], 544));
  }
}), ga = ba, ka = {
  class: "map-place-detail",
  "aria-labelledby": "map-place-title"
}, wa = { id: "map-place-title" }, Ma = { class: "map-place-content" }, $a = {
  key: 0,
  class: "map-place-full-name"
}, _a = {
  key: 1,
  class: "map-address"
}, xa = { class: "map-place-intro" }, Ca = {
  key: 2,
  class: "map-place-actions"
}, Sa = {
  key: 3,
  class: "map-detail-section"
}, Aa = { class: "map-people" }, Oa = {
  key: 4,
  class: "map-detail-section"
}, Ea = ["onClick"], Ba = /* @__PURE__ */ F({
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
    const t = a, u = S(() => ce(t.map.atlas, t.location.key).slice(0, -1)), e = S(() => t.map.atlas.locations.filter((v) => v.parent === t.location.key)), p = S(() => t.map.atlas.actors.filter((v) => v.locationKey === t.location.key)), k = S(() => De(t.map.atlas, t.location.key)), b = S(() => t.location.sceneKey ? t.map.scenes[t.location.sceneKey] : void 0);
    return (v, d) => (n(), s("section", ka, [
      d[7] || (d[7] = l("div", {
        class: "map-sheet-grip",
        "aria-hidden": "true"
      }, null, -1)),
      l("header", null, [l("div", null, [l("small", null, m(r($e)[a.location.scale]) + " · " + m(a.currentKey === a.location.key ? "当前位置" : a.location.status === "visited" ? "已到访" : "未到访"), 1), l("h2", wa, m(a.location.name), 1)]), l("button", {
        type: "button",
        class: "map-round-button",
        "aria-label": "关闭地点详情",
        onClick: d[0] || (d[0] = (f) => v.$emit("close"))
      }, [x(C, { name: "close" })])]),
      l("div", Ma, [
        a.location.name.length > 24 ? (n(), s("p", $a, m(a.location.name), 1)) : M("", !0),
        u.value.length ? (n(), s("p", _a, [x(C, { name: "pin" }), N(m(u.value.map((f) => f.name).join(" · ")), 1)])) : M("", !0),
        l("p", xa, m(a.location.brief || "这个地点已记录在世界地图上，更多介绍等待故事展开。"), 1),
        e.value.length || b.value ? (n(), s("div", Ca, [e.value.length ? (n(), s("button", {
          key: 0,
          type: "button",
          class: "map-primary-button",
          onClick: d[1] || (d[1] = (f) => v.$emit("explore"))
        }, [x(C, { name: "compass" }), N("探索这里 · " + m(e.value.length) + " 处", 1)])) : M("", !0), b.value ? (n(), s("button", {
          key: 1,
          type: "button",
          class: "map-secondary-button",
          onClick: d[2] || (d[2] = (f) => v.$emit("scene"))
        }, [x(C, { name: "layers" }), d[3] || (d[3] = N("查看场景图", -1))])) : M("", !0)])) : M("", !0),
        p.value.length ? (n(), s("section", Sa, [d[4] || (d[4] = l("h3", null, "记录在这里的人物", -1)), l("p", Aa, [(n(!0), s(q, null, G(p.value, (f) => (n(), s("span", { key: f.actorKey }, [x(C, { name: "person" }), N(m(f.displayName), 1)]))), 128))])])) : M("", !0),
        k.value.length ? (n(), s("section", Oa, [d[5] || (d[5] = l("h3", null, "相连的地方", -1)), (n(!0), s(q, null, G(k.value, (f) => (n(), s("button", {
          key: f.link.id,
          type: "button",
          class: "map-connection",
          onClick: (i) => v.$emit("select", f.location.key)
        }, [
          x(C, { name: "route" }),
          l("span", null, [l("strong", null, m(f.location.name), 1), l("small", null, m(f.link.label || r(ct)[f.link.kind]) + m(f.link.bidirectional ? "" : f.outgoing ? " · 单向前往" : " · 仅可从对面到达"), 1)]),
          x(C, { name: "next" })
        ], 8, Ea))), 128))])) : M("", !0),
        d[6] || (d[6] = l("p", { class: "map-detail-footnote" }, "查看地图不会改变你在故事中的位置", -1))
      ])
    ]));
  }
}), Pa = Ba;
function ae(a) {
  return !!a && typeof a == "object" && !Array.isArray(a);
}
function Ra(a) {
  const t = B(structuredClone(Be(a.initialState))), u = B(null), e = B(""), p = B(!1), k = B("");
  let b = !1, v = 0, d = 0, f = () => {
  };
  const i = S(() => t.value.status === "unconfirmed" || t.value.writeState === "unconfirmed"), h = S(() => u.value !== null || ["loading", "saving"].includes(t.value.status) || ["maintaining", "rebuilding"].includes(t.value.maintenanceStatus || "")), O = S(() => h.value ? "正在更新地图，请稍候" : i.value ? "请先核实上一次保存结果" : t.value.status === "conflict" ? "保存的版本不一致，请先处理保存问题" : t.value.status !== "ready" ? t.value.message || "地图暂时不可更新" : t.value.chatIdentity ? "" : "请先打开一个聊天"), o = S(() => t.value.maintenanceStatus === "rebuilding" || u.value === "rebuild" ? "正在绘制世界…" : t.value.maintenanceStatus === "maintaining" || u.value === "maintain" ? "正在更新地图…" : u.value === "confirm" ? "正在核实保存…" : h.value ? "正在同步…" : ""), D = S(() => e.value || t.value.message || t.value.maintenanceMessage || ""), Q = S(() => t.value.status !== "ready" || D.value !== k.value ? D.value : ""), z = S(() => p.value || [
    "blocked",
    "error",
    "conflict"
  ].includes(t.value.status) || t.value.maintenanceStatus === "error");
  function P(R) {
    t.value = structuredClone(R), e.value = "", p.value = !1;
  }
  function T(R, K) {
    const Y = R instanceof Error ? R.message : String(R);
    return Y.includes("聊天已切换") ? "聊天已切换，请重新打开地图。" : Y === "host_request_timeout" ? "等待结果超时，更新可能仍在进行。请稍后查看，不要重复提交。" : K === "confirm" ? "仍无法确认保存结果，请稍后再试。" : K === "adopt" ? "未能恢复已保存的版本，当前更改仍暂停保存。" : K === "settings" ? "设置未能保存，请重试。" : "地图操作未完成，请稍后重试。";
  }
  async function A(R, K, Y = {}) {
    if (u.value) return;
    const V = ++v, j = d, E = t.value.chatIdentity;
    u.value = K, e.value = "", k.value = "", p.value = !1;
    try {
      const y = await a.bridge.request(R, {
        chatIdentity: E,
        ...Y
      }, 35e3);
      if (!b || V !== v || t.value.chatIdentity !== E) return;
      const w = ae(y) ? y.result : void 0, _ = ae(w) && ae(w.state) ? w.state : w;
      j === d && ae(_) && _.chatIdentity === E && P(_), K === "refresh" && t.value.status === "ready" && (e.value = "已同步保存的地图。"), K === "settings" && (e.value = t.value.autoMaintenance ? "自动更新已开启。" : "自动更新已关闭。"), K === "confirm" && t.value.status === "ready" && (e.value = "保存已确认。"), K === "adopt" && ae(w) && w.adoption === "adopted" && (e.value = "已恢复当前聊天中保存的 OS 数据。");
    } catch (y) {
      b && V === v && t.value.chatIdentity === E && (e.value = T(y, K), p.value = !0);
    } finally {
      b && V === v && (u.value = null);
    }
  }
  return le(() => {
    b = !0, f = a.bridge.subscribe((R) => {
      R.type === "map/state" ? (d += 1, P(R.payload.state)) : R.type === "map/error" && (d += 1, p.value = !0, k.value = "", e.value = R.payload.message || "地图暂时无法读取，请重新打开。");
    });
  }), ge(() => {
    b = !1, v += 1, f();
  }), {
    state: t,
    activeRequest: u,
    busy: h,
    disabledReason: O,
    requiresConfirmation: i,
    status: o,
    notice: Q,
    isError: z,
    dismissNotice: () => {
      k.value = D.value;
    },
    refresh: () => {
      if (!h.value && !i.value) return A("map/refresh", "refresh");
    },
    confirmSave: () => {
      if (!h.value) return A("map/confirm-save", "confirm");
    },
    adopt: () => {
      if (!h.value) return A("map/adopt-server-state", "adopt");
    },
    setAuto: (R) => A("map/set-auto-maintenance", "settings", { enabled: R }),
    update: () => {
      if (!O.value && t.value.map) return A("map/maintain-once", "maintain");
    },
    rebuild: () => {
      if (!O.value) return A("map/rebuild", "rebuild");
    }
  };
}
var Ia = { class: "map-top" }, Ta = { class: "map-search-bar" }, Ka = ["disabled"], La = {
  key: 1,
  class: "map-search-entry"
}, za = {
  key: 0,
  class: "map-view-switch",
  "aria-label": "地图视图"
}, ja = ["aria-pressed"], Na = ["aria-pressed"], qa = {
  key: 1,
  class: "map-region-trail",
  "aria-label": "当前查看区域"
}, Da = ["onClick"], Va = {
  key: 2,
  class: "map-progress",
  role: "status"
}, Ya = ["disabled"], Ua = ["disabled"], Ga = ["disabled"], Ha = {
  key: 1,
  class: "map-empty"
}, Xa = ["disabled"], Za = {
  key: 0,
  class: "map-setting-note"
}, Fa = {
  key: 1,
  class: "map-empty"
}, Qa = {
  key: 1,
  class: "map-empty map-first-map"
}, Wa = { class: "map-empty-art" }, Ja = ["disabled"], el = {
  key: 1,
  class: "map-setting-note"
}, tl = ["disabled"], al = ["aria-expanded"], ll = {
  key: 1,
  class: "map-key"
}, nl = {
  key: 3,
  class: "map-region-card"
}, sl = { class: "map-region-icon" }, ol = {
  key: 4,
  class: "map-scene-caption"
}, rl = /* @__PURE__ */ F({
  __name: "MapApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(a) {
    const { state: t, activeRequest: u, busy: e, disabledReason: p, requiresConfirmation: k, status: b, notice: v, isError: d, dismissNotice: f, refresh: i, confirmSave: h, adopt: O, setAuto: o, update: D, rebuild: Q } = Ra(a), z = B(t.value.map ? ye(t.value.map.atlas) : ""), P = B(""), T = B(null), A = S(() => T.value !== null), R = B(""), K = B(0), Y = B(!1), V = B(!1), j = B(!1), E = S(() => t.value.map?.atlas), y = S(() => E.value?.actors.find(($) => $.actorKey === "player")?.locationKey || ""), w = S(() => E.value?.locations.find(($) => $.key === y.value)), _ = S(() => E.value?.locations.find(($) => $.key === P.value)), I = S(() => E.value?.locations.find(($) => $.key === (T.value || y.value))), J = S(() => A.value && I.value?.sceneKey ? t.value.map?.scenes[I.value.sceneKey] : void 0), W = S(() => E.value?.locations.find(($) => $.key === z.value)), re = S(() => E.value?.locations.filter(($) => ($.parent || "") === z.value) || []), ve = S(() => re.value.filter(($) => $.status !== "visited").length), Ce = S(() => E.value ? ce(E.value, z.value) : []);
    ue(() => t.value, ($, c) => {
      const g = $.chatIdentity !== c.chatIdentity;
      (!c.map || g || z.value && !$.map?.atlas.locations.some((X) => X.key === z.value)) && (z.value = $.map ? ye($.map.atlas) : ""), (g || !$.map?.atlas.locations.some((X) => X.key === P.value)) && (P.value = ""), (g || T.value && !$.map?.atlas.locations.some((X) => X.key === T.value)) && (T.value = null), g && (Y.value = !1, V.value = !1);
    });
    function ne($) {
      z.value = $, P.value = "", T.value = null, j.value = !1;
    }
    async function se($, c = !1) {
      const g = E.value?.locations.find((X) => X.key === $);
      g && (T.value = null, P.value = $, V.value = !1, j.value = !1, c && (z.value = g.parent || ""), await Ie(), R.value = E.value ? oe(E.value, $, z.value) : $, K.value += 1);
    }
    async function Se() {
      w.value && await se(w.value.key, !0);
    }
    function ie($ = "") {
      T.value = $ === y.value ? "" : $, j.value = !1, V.value = !1;
    }
    function pe() {
      T.value = null, j.value = !1;
    }
    function Ae($) {
      $.key === "Escape" && (A.value || P.value || j.value) && ($.stopPropagation(), A.value ? pe() : P.value ? P.value = "" : j.value = !1);
    }
    return ($, c) => (n(), s("main", {
      class: H(["map-app", {
        "has-view-switch": E.value?.locations.length,
        "is-scene-view": A.value
      }]),
      onKeydown: Ae
    }, [
      l("div", Ia, [
        l("header", Ta, [
          x(C, { name: A.value ? "layers" : "search" }, null, 8, ["name"]),
          A.value ? (n(), s("div", La, [N(m(I.value?.name || "当前场景"), 1), l("small", null, m(T.value ? "正在查看已记录的场景" : "看看你身边的布局"), 1)])) : (n(), s("button", {
            key: 0,
            type: "button",
            class: "map-search-entry",
            disabled: !E.value?.locations.length,
            onClick: c[0] || (c[0] = (g) => V.value = !0)
          }, [...c[22] || (c[22] = [N("想去哪里？", -1), l("small", null, "搜索世界中的地点", -1)])], 8, Ka)),
          l("button", {
            type: "button",
            class: "map-round-button",
            "aria-label": "地图设置",
            onClick: c[1] || (c[1] = (g) => Y.value = !0)
          }, [x(C, { name: "more" })])
        ]),
        E.value?.locations.length ? (n(), s("nav", za, [l("button", {
          type: "button",
          "aria-pressed": !A.value,
          onClick: pe
        }, [x(C, { name: "globe" }), c[23] || (c[23] = N("世界地图", -1))], 8, ja), l("button", {
          type: "button",
          "aria-pressed": A.value,
          onClick: c[2] || (c[2] = (g) => ie())
        }, [x(C, { name: "layers" }), N(m(T.value ? "场景地图" : "当前场景"), 1)], 8, Na)])) : M("", !0),
        E.value?.locations.length && !A.value ? (n(), s("nav", qa, [l("button", {
          type: "button",
          onClick: c[3] || (c[3] = (g) => ne(""))
        }, [x(C, { name: "globe" }), c[24] || (c[24] = N("世界", -1))]), (n(!0), s(q, null, G(Ce.value, (g) => (n(), s(q, { key: g.key }, [x(C, { name: "next" }), l("button", {
          type: "button",
          onClick: (X) => ne(g.key)
        }, m(g.name), 9, Da)], 64))), 128))])) : M("", !0),
        r(b) ? (n(), s("div", Va, [c[25] || (c[25] = l("span", null, null, -1)), N(m(r(b)), 1)])) : M("", !0),
        r(v) || r(k) || r(t).status === "conflict" ? (n(), s("aside", {
          key: 3,
          class: H(["map-notice", { "is-error": r(d) }]),
          role: "status"
        }, [l("p", null, m(r(v) || (r(k) ? "保存结果尚未确认。" : "保存的版本不一致。")), 1), r(k) ? (n(), s("button", {
          key: 0,
          type: "button",
          disabled: r(e),
          onClick: c[4] || (c[4] = (...g) => r(h) && r(h)(...g))
        }, "核实保存结果", 8, Ya)) : r(t).status === "conflict" ? (n(), s(q, { key: 1 }, [c[26] || (c[26] = l("small", null, "恢复会放弃尚未保存的更改，并使用当前聊天已保存的 OS 数据（不只是地图）。", -1)), l("button", {
          type: "button",
          disabled: r(e),
          onClick: c[5] || (c[5] = (...g) => r(O) && r(O)(...g))
        }, "放弃未保存更改并恢复", 8, Ua)], 64)) : r(t).status === "error" || r(t).status === "blocked" ? (n(), s("button", {
          key: 2,
          type: "button",
          disabled: r(e),
          onClick: c[6] || (c[6] = (...g) => r(i) && r(i)(...g))
        }, "重新读取", 8, Ga)) : (n(), s("button", {
          key: 3,
          type: "button",
          class: "map-notice-close",
          "aria-label": "关闭地图提示",
          onClick: c[7] || (c[7] = (...g) => r(f) && r(f)(...g))
        }, [x(C, { name: "close" })]))], 2)) : M("", !0)
      ]),
      l("div", { class: H(["map-canvas", { "has-detail": _.value && !A.value }]) }, [r(t).map && E.value?.locations.length ? (n(), s(q, { key: 0 }, [
        he(x(at, {
          atlas: r(t).map.atlas,
          region: z.value,
          "current-location-key": y.value,
          "selected-location-key": P.value,
          "focus-key": R.value,
          "focus-sequence": K.value,
          onSelect: c[8] || (c[8] = (g) => se(g))
        }, null, 8, [
          "atlas",
          "region",
          "current-location-key",
          "selected-location-key",
          "focus-key",
          "focus-sequence"
        ]), [[Pe, !A.value]]),
        A.value ? (n(), s(q, { key: 0 }, [J.value?.status === "active" ? (n(), ee(Zt, {
          key: 0,
          scene: J.value
        }, null, 8, ["scene"])) : (n(), s("div", Ha, [
          x(C, { name: "layers" }),
          l("h2", null, m(I.value ? "这里的布局还没画出来" : "还不知道你在哪里"), 1),
          l("p", null, m(I.value ? "更新地图后，会结合设定与剧情补齐这里的普通布局。" : "更新地图后，会根据剧情确认你所在的地方。"), 1),
          l("button", {
            type: "button",
            class: "map-secondary-button",
            disabled: !!r(p),
            onClick: c[9] || (c[9] = (...g) => r(D) && r(D)(...g))
          }, m(r(e) ? "正在更新…" : "更新地图"), 9, Xa),
          r(p) && !r(e) ? (n(), s("p", Za, m(r(p)), 1)) : M("", !0)
        ]))], 64)) : M("", !0),
        !A.value && !re.value.length ? (n(), s("div", Fa, [
          x(C, { name: "pin" }),
          c[27] || (c[27] = l("h2", null, "这里还没有标出更多地点", -1)),
          c[28] || (c[28] = l("p", null, "可以先看看其他区域，或更新地图补充。", -1)),
          l("button", {
            type: "button",
            class: "map-secondary-button",
            onClick: c[10] || (c[10] = (g) => ne(W.value?.parent || ""))
          }, "查看上级区域")
        ])) : M("", !0)
      ], 64)) : (n(), s("div", Qa, [
        l("span", Wa, [x(C, { name: "globe" })]),
        c[29] || (c[29] = l("small", null, "故事之外，还有一整个世界", -1)),
        l("h1", null, m(r(t).status === "loading" ? "正在打开地图…" : "下一站，去哪里？"), 1),
        c[30] || (c[30] = l("p", null, [
          N("把世界设定画成地图，"),
          l("br"),
          N("也为留白的地方添上值得探索的去处。")
        ], -1)),
        r(t).status !== "loading" ? (n(), s("button", {
          key: 0,
          type: "button",
          class: "map-primary-button",
          disabled: !!r(p),
          onClick: c[11] || (c[11] = (...g) => r(Q) && r(Q)(...g))
        }, m(r(e) ? r(b) || "正在准备…" : "绘制世界地图"), 9, Ja)) : M("", !0),
        r(p) && !r(e) ? (n(), s("p", el, m(r(p)), 1)) : M("", !0)
      ]))], 2),
      E.value?.locations.length ? (n(), s("div", {
        key: 0,
        class: H(["map-floating-tools", { "has-detail": _.value && !A.value }])
      }, [A.value && T.value ? (n(), s("button", {
        key: 0,
        type: "button",
        class: "map-round-button",
        "aria-label": "回到当前场景",
        onClick: c[12] || (c[12] = (g) => ie())
      }, [x(C, { name: "locate" })])) : A.value ? M("", !0) : (n(), s("button", {
        key: 1,
        type: "button",
        class: "map-round-button",
        disabled: !w.value,
        "aria-label": "回到我的位置",
        onClick: Se
      }, [x(C, { name: "locate" })], 8, tl)), l("button", {
        type: "button",
        class: "map-round-button",
        "aria-expanded": j.value,
        "aria-label": "地图图例",
        onClick: c[13] || (c[13] = (g) => j.value = !j.value)
      }, [x(C, { name: "layers" })], 8, al)], 2)) : M("", !0),
      j.value ? (n(), s("aside", ll, [...c[31] || (c[31] = [
        l("strong", null, "读懂这张地图", -1),
        l("p", null, [
          l("i", { class: "map-key-current" }),
          N("你在这里 "),
          l("i", { class: "map-key-place" }),
          N("可探索地点")
        ], -1),
        l("p", null, "路线连接已记录的地点；箭头表示单向通行。", -1),
        l("small", null, "世界图展示区域与地点，不按实际比例。场景图展示一个地点的内部布局。", -1)
      ])])) : M("", !0),
      _.value && r(t).map && !A.value ? (n(), ee(Pa, {
        key: _.value.key,
        location: _.value,
        map: r(t).map,
        "current-key": y.value,
        onClose: c[14] || (c[14] = (g) => P.value = ""),
        onScene: c[15] || (c[15] = (g) => ie(_.value.key)),
        onExplore: c[16] || (c[16] = (g) => ne(_.value.key)),
        onSelect: c[17] || (c[17] = (g) => se(g, !0))
      }, null, 8, [
        "location",
        "map",
        "current-key"
      ])) : E.value?.locations.length && !A.value ? (n(), s("footer", nl, [
        l("span", sl, [x(C, { name: "compass" })]),
        l("div", null, [l("h1", null, m(W.value?.name || "世界地图"), 1), l("p", null, m(re.value.length) + " 个地点 · " + m(ve.value ? ve.value + " 处还没去过" : "看看熟悉的地方有什么变化"), 1)]),
        l("button", {
          type: "button",
          class: "map-round-button",
          "aria-label": "浏览全部地点",
          onClick: c[18] || (c[18] = (g) => V.value = !0)
        }, [x(C, { name: "next" })])
      ])) : A.value && E.value?.locations.length ? (n(), s("footer", ol, [x(C, { name: "layers" }), l("span", null, [l("strong", null, m(I.value?.name || "当前位置待确认"), 1), l("small", null, m(T.value ? "正在查看场景图 · 不会移动人物" : "当前位置的场景图"), 1)])])) : M("", !0),
      V.value && E.value ? (n(), ee(ga, {
        key: 5,
        atlas: E.value,
        onClose: c[19] || (c[19] = (g) => V.value = !1),
        onSelect: c[20] || (c[20] = (g) => se(g, !0))
      }, null, 8, ["atlas"])) : M("", !0),
      Y.value ? (n(), ee(ua, {
        key: 6,
        "auto-maintenance": r(t).autoMaintenance,
        busy: r(e),
        "refresh-disabled": r(k),
        "auto-toggle-busy": r(u) !== null,
        "disabled-reason": r(p),
        "has-map": !!r(t).map,
        status: r(b),
        onClose: c[21] || (c[21] = (g) => Y.value = !1),
        onSetAuto: r(o),
        onUpdate: r(D),
        onRebuild: r(Q),
        onRefresh: r(i)
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
    ], 34));
  }
}), yl = rl;
export {
  yl as default
};
