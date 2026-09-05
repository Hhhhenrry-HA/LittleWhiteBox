/* eslint-disable */
import { A as ue, B as Oe, E as Be, F as I, L as Pe, M as be, O as ge, R as r, S as ne, T as Y, V as m, _ as Q, a as Ie, b as ke, c as N, d as te, f as M, g as S, h as z, i as Re, j as we, l as E, o as fe, p as s, s as F, u as n, w as l, y as Te, z as V } from "./xiaobai-os-runtime-dom.esm-bundler-DmE9neiz.js";
var Ke = { class: "map-viewport" }, Le = ["viewBox", "aria-label"], ze = {
  class: "map-viewport-controls",
  "aria-label": "地图缩放"
}, je = /* @__PURE__ */ Q({
  __name: "MapViewport",
  props: {
    viewBox: {},
    resetKey: { default: "" },
    label: {},
    focusPoint: { default: void 0 },
    focusSequence: { default: 0 }
  },
  setup(e) {
    const a = e, u = I(null), t = I([...a.viewBox]), p = I([0, 0]), k = E(() => p.value[0] && p.value[1] ? Math.max(t.value[2] / p.value[0], t.value[3] / p.value[1]) : 1);
    let h;
    ne(() => {
      h = new ResizeObserver((y) => {
        const C = y[0].contentRect;
        p.value = [C.width, C.height];
      }), u.value && h.observe(u.value);
    });
    const v = /* @__PURE__ */ new Map();
    let d = null, f = [0, 0], i = 0, w = null, B = !1, o = !1, q = null;
    const H = E(() => t.value.join(" "));
    function L() {
      t.value = [...a.viewBox];
    }
    function P() {
      return k.value;
    }
    function $(y, C) {
      const O = u.value?.getBoundingClientRect();
      if (!O) return [t.value[0], t.value[1]];
      const R = P();
      return [t.value[0] + t.value[2] / 2 + (y - O.left - O.width / 2) * R, t.value[1] + t.value[3] / 2 + (C - O.top - O.height / 2) * R];
    }
    function b(y, C) {
      const O = Math.max(1, a.viewBox[2]), R = Math.min(O * 3, Math.max(Math.min(O * 0.24, 240), t.value[2] * y)), J = R / t.value[2], W = C || [t.value[0] + t.value[2] / 2, t.value[1] + t.value[3] / 2];
      t.value = [
        W[0] - (W[0] - t.value[0]) * J,
        W[1] - (W[1] - t.value[1]) * J,
        R,
        t.value[3] * J
      ];
    }
    function U() {
      if (!a.focusPoint) return;
      const y = Math.min(t.value[2], 620), C = t.value[3] * y / t.value[2];
      t.value = [
        a.focusPoint[0] - y / 2,
        a.focusPoint[1] - C / 2,
        y,
        C
      ];
    }
    function G() {
      const y = [...v.values()];
      y.length === 1 && (d = y[0], f = [t.value[0], t.value[1]]), y.length === 2 && (i = Math.hypot(y[1][0] - y[0][0], y[1][1] - y[0][1]), w = [(y[0][0] + y[1][0]) / 2, (y[0][1] + y[1][1]) / 2], B = !0);
    }
    function X(y) {
      y.button !== 0 || v.size >= 2 || (v.size || (B = !1), v.set(y.pointerId, [y.clientX, y.clientY]), y.target.setPointerCapture(y.pointerId), G());
    }
    function j(y) {
      if (!v.has(y.pointerId)) return;
      v.set(y.pointerId, [y.clientX, y.clientY]);
      const C = [...v.values()];
      if (C.length === 2 && w) {
        const O = Math.hypot(C[1][0] - C[0][0], C[1][1] - C[0][1]), R = [(C[0][0] + C[1][0]) / 2, (C[0][1] + C[1][1]) / 2];
        O > 0 && i > 0 && b(i / O, $(...w)), t.value[0] -= (R[0] - w[0]) * P(), t.value[1] -= (R[1] - w[1]) * P(), i = O, w = R;
      } else if (d) {
        const O = y.clientX - d[0], R = y.clientY - d[1];
        Math.abs(O) + Math.abs(R) > 4 && (B = !0), t.value = [
          f[0] - O * P(),
          f[1] - R * P(),
          t.value[2],
          t.value[3]
        ];
      }
    }
    function T(y) {
      if (!v.delete(y.pointerId)) return;
      const C = y.target;
      C.hasPointerCapture(y.pointerId) && C.releasePointerCapture(y.pointerId), G(), v.size || (d = null, w = null), B && (o = !0, q && clearTimeout(q), q = setTimeout(() => {
        o = !1;
      }, 0));
    }
    function x(y) {
      o && (y.preventDefault(), y.stopPropagation());
    }
    return ue(() => a.resetKey, L, { immediate: !0 }), ue(() => a.focusSequence, U, { flush: "post" }), ke(() => {
      h?.disconnect(), q && clearTimeout(q);
    }), (y, C) => (l(), s("div", Ke, [(l(), s("svg", {
      ref_key: "svg",
      ref: u,
      class: "map-viewport-svg",
      viewBox: H.value,
      preserveAspectRatio: "xMidYMid meet",
      role: "group",
      "aria-label": e.label,
      onWheel: C[0] || (C[0] = F((O) => b(O.deltaY < 0 ? 0.84 : 1.19, $(O.clientX, O.clientY)), ["prevent"])),
      onPointerdown: X,
      onPointermove: j,
      onPointerup: T,
      onPointercancel: T,
      onClickCapture: x
    }, [Be(y.$slots, "default", { unitScale: k.value })], 40, Le)), n("div", ze, [
      n("button", {
        type: "button",
        "aria-label": "放大地图",
        onClick: C[1] || (C[1] = (O) => b(0.8))
      }, "+"),
      n("button", {
        type: "button",
        "aria-label": "缩小地图",
        onClick: C[2] || (C[2] = (O) => b(1.25))
      }, "−"),
      n("button", {
        type: "button",
        class: "map-fit",
        onClick: L
      }, "全图")
    ])]));
  }
}), Me = je, Ne = {
  class: "map-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.7",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, qe = ["d"], De = /* @__PURE__ */ Q({
  __name: "MapIcon",
  props: { name: { default: "pin" } },
  setup(e) {
    const a = {
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
    return (u, t) => (l(), s("svg", Ne, [n("path", { d: a[e.name] || a.pin }, null, 8, qe)]));
  }
}), A = De;
function de(e, a) {
  const u = new Map(e.locations.map((k) => [k.key, k])), t = [];
  let p = u.get(a);
  for (; p; )
    t.unshift(p), p = p.parent ? u.get(p.parent) : void 0;
  return t;
}
function ye(e) {
  const a = e.locations.filter((u) => !u.parent);
  return a.length === 1 && e.locations.some((u) => u.parent === a[0].key) ? a[0].key : "";
}
function oe(e, a, u) {
  return de(e, a).find((t) => (t.parent || "") === u)?.key || "";
}
function Ve(e, a) {
  return e.links.flatMap((u) => {
    if (u.from !== a && u.to !== a) return [];
    const t = e.locations.find((p) => p.key === (u.from === a ? u.to : u.from));
    return t ? [{
      location: t,
      link: u,
      outgoing: u.bidirectional || u.from === a
    }] : [];
  });
}
function Ye(e, a) {
  const u = e.locations.filter((f) => (f.parent || "") === a).sort((f, i) => f.key.localeCompare(i.key, "en")), t = u.filter((f) => f.position).map((f) => ({
    location: f,
    x: f.position[0],
    y: f.position[1],
    placed: !0
  }));
  let p = 0;
  for (const f of u.filter((i) => !i.position)) {
    let i, w;
    do {
      const B = p * 2.3999632297, o = 155 * Math.sqrt(p++);
      i = Math.round(500 + Math.cos(B) * o), w = Math.round(420 + Math.sin(B) * o);
    } while (t.some((B) => Math.hypot(B.x - i, B.y - w) < 160));
    t.push({
      location: f,
      x: i,
      y: w,
      placed: !1
    });
  }
  t.sort((f, i) => f.location.key.localeCompare(i.location.key, "en"));
  const k = new Map(t.map((f) => [f.location.key, f])), h = e.links.flatMap((f) => {
    const i = k.get(oe(e, f.from, a)), w = k.get(oe(e, f.to, a));
    if (!i || !w || i === w) return [];
    const B = (i.x + w.x) / 2, o = (i.y + w.y) / 2;
    return [{
      link: f,
      from: i,
      to: w,
      x: B,
      y: o,
      path: `M ${i.x} ${i.y} Q ${B + (w.y - i.y) * 0.12} ${o - (w.x - i.x) * 0.12} ${w.x} ${w.y}`
    }];
  }), v = t.length ? Math.min(...t.map((f) => f.x)) - 140 : 0, d = t.length ? Math.min(...t.map((f) => f.y)) - 150 : 0;
  return {
    nodes: t,
    routes: h,
    viewBox: [
      v,
      d,
      t.length ? Math.max(420, Math.max(...t.map((f) => f.x)) - v + 140) : 800,
      t.length ? Math.max(500, Math.max(...t.map((f) => f.y)) - d + 190) : 900
    ]
  };
}
var Ue = {
  class: "map-landscapes",
  "aria-hidden": "true"
}, Ge = ["transform"], He = {
  class: "map-world-roads",
  "aria-hidden": "true"
}, Xe = ["d"], Ze = ["d", "marker-end"], Fe = ["x", "y"], Qe = [
  "transform",
  "aria-label",
  "onClick",
  "onKeydown"
], We = { transform: "translate(-14 -20)" }, Je = {
  y: "64",
  class: "map-place-name"
}, et = {
  key: 0,
  y: "89",
  class: "map-place-status"
}, tt = {
  key: 1,
  y: "89",
  class: "map-place-status"
}, at = /* @__PURE__ */ Q({
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
    const a = e, u = E(() => Ye(a.atlas, a.region)), t = E(() => oe(a.atlas, a.currentLocationKey, a.region)), p = E(() => u.value.nodes.find((v) => v.location.key === a.focusKey)), k = "map-arrow-" + ge();
    function h(v, d) {
      return v === "water" ? "water" : v === "forest" ? "tree" : v === "mountain" ? "mountain" : ["world", "region"].includes(d) ? "globe" : d === "outdoor" ? "compass" : "building";
    }
    return (v, d) => (l(), te(Me, {
      "view-box": u.value.viewBox,
      "reset-key": e.region,
      label: "世界地图",
      "focus-point": p.value ? [p.value.x, p.value.y] : void 0,
      "focus-sequence": e.focusSequence
    }, {
      default: we(({ unitScale: f }) => [
        n("defs", null, [n("marker", {
          id: k,
          viewBox: "0 0 10 10",
          refX: "16",
          refY: "5",
          markerWidth: "5",
          markerHeight: "5",
          orient: "auto"
        }, [...d[0] || (d[0] = [n("path", {
          d: "M1 1l8 4-8 4z",
          fill: "var(--map-road-ink)"
        }, null, -1)])])]),
        n("g", Ue, [(l(!0), s(N, null, Y(u.value.nodes, (i) => (l(), s("g", {
          key: i.location.key,
          transform: `translate(${i.x} ${i.y})`,
          class: V(`is-${i.location.terrain || "urban"}`)
        }, [...d[1] || (d[1] = [n("path", { d: "M-108-20Q-100-100-32-94T87-56Q127-13 99 48T21 99Q-57 113-90 65T-108-20Z" }, null, -1), n("path", {
          class: "map-contour",
          d: "M-133-22Q-124-126-39-116T110-70Q156-17 124 60T26 123Q-71 139-112 81T-133-22Z"
        }, null, -1)])], 10, Ge))), 128))]),
        n("g", He, [(l(!0), s(N, null, Y(u.value.routes, (i) => (l(), s("g", {
          key: i.link.id,
          class: V({
            "is-path": i.link.kind === "path",
            "is-portal": i.link.kind === "portal"
          })
        }, [
          n("path", {
            class: "map-road-casing",
            d: i.path
          }, null, 8, Xe),
          n("path", {
            class: "map-road-line",
            d: i.path,
            "marker-end": i.link.bidirectional ? void 0 : `url(#${k})`
          }, null, 8, Ze),
          i.link.label ? (l(), s("text", {
            key: 0,
            x: i.x,
            y: i.y - 14
          }, m(i.link.label), 9, Fe)) : M("", !0)
        ], 2))), 128))]),
        (l(!0), s(N, null, Y(u.value.nodes, (i) => (l(), s("g", {
          key: i.location.key,
          class: V(["map-place", {
            "is-selected": i.location.key === e.selectedLocationKey,
            "is-current": i.location.key === t.value,
            "is-unvisited": i.location.status !== "visited"
          }]),
          transform: `translate(${i.x} ${i.y}) scale(${f * 0.5})`,
          role: "button",
          tabindex: "0",
          "aria-label": `查看${i.location.name}`,
          onClick: F((w) => v.$emit("select", i.location.key), ["stop"]),
          onKeydown: [fe(F((w) => v.$emit("select", i.location.key), ["stop"]), ["enter"]), fe(F((w) => v.$emit("select", i.location.key), ["stop", "prevent"]), ["space"])]
        }, [
          d[2] || (d[2] = n("circle", {
            class: "map-pin-halo",
            r: "39"
          }, null, -1)),
          d[3] || (d[3] = n("path", {
            class: "map-pin-body",
            d: "M0 33C-6 25-26 8-26-6a26 26 0 0 1 52 0C26 8 6 25 0 33Z"
          }, null, -1)),
          n("g", We, [S(A, {
            name: h(i.location.terrain, i.location.scale),
            width: "28",
            height: "28"
          }, null, 8, ["name"])]),
          n("text", Je, m(i.location.name.length > 14 ? i.location.name.slice(0, 13) + "…" : i.location.name), 1),
          i.location.key === t.value ? (l(), s("text", et, "你在这里")) : i.location.status !== "visited" ? (l(), s("text", tt, "未到访")) : M("", !0),
          n("title", null, m(i.location.name) + m(i.location.brief ? " · " + i.location.brief : ""), 1)
        ], 42, Qe))), 128))
      ]),
      _: 1
    }, 8, [
      "view-box",
      "reset-key",
      "focus-point",
      "focus-sequence"
    ]));
  }
}), nt = at, ae;
async function lt() {
  if (!ae) {
    const e = [
      "..",
      "..",
      "..",
      "libs",
      "material-symbols",
      "material-symbols-rounded.woff2"
    ].join("/"), a = new URL(e, import.meta.url);
    ae = new FontFace("Xiaobai Map Symbols", `url("${a.href}")`, {
      display: "block",
      weight: "400"
    }).load(), ae.catch(() => {
      ae = void 0;
    });
  }
  document.fonts.add(await ae);
}
var st = Object.freeze({
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
}), ot = Object.freeze({
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
}), rt = Object.freeze({
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
}), it = Object.freeze({
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
}), ut = Object.freeze({
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
}), ct = Object.freeze({
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
}), ce = Object.freeze({
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
}), $e = Object.freeze({
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
}), xe = Object.freeze({
  world: "世界",
  region: "区域",
  city: "城市",
  district: "区域",
  building: "建筑",
  floor: "楼层",
  room: "房间",
  outdoor: "户外"
}), vt = Object.freeze({
  door: "门",
  stairs: "楼梯",
  elevator: "电梯",
  path: "小径",
  road: "道路",
  portal: "传送门",
  passage: "通道"
}), pt = /* @__PURE__ */ new Set([
  "water",
  "terrain",
  "furniture",
  "decoration",
  "danger",
  "magic",
  "secret",
  "light"
]);
function ft(e, a) {
  return e < a ? -1 : e > a ? 1 : 0;
}
function D(e) {
  return Number(e.toFixed(3)).toString();
}
function _e(e) {
  const a = e.geometry;
  return Array.isArray(a.points) ? a.points : [];
}
function Ce(e) {
  return e.shape === "rect" || e.shape === "circle" ? !0 : _e(e).length >= 3 && (e.closed === !0 || pt.has(e.category));
}
function yt(e) {
  const a = _e(e);
  if (a.length < 2) return "";
  const u = Ce(e) ? " Z" : "";
  if (e.shape === "path") return `M ${a.map(([p, k]) => `${D(p)} ${D(k)}`).join(" L ")}${u}`;
  const t = [`M ${D(a[0][0])} ${D(a[0][1])}`];
  for (let p = 0; p < a.length - 1; p += 1) {
    const k = a[p - 1] || a[p], h = a[p], v = a[p + 1], d = a[p + 2] || v, f = h[0] + (v[0] - k[0]) / 6, i = h[1] + (v[1] - k[1]) / 6, w = v[0] - (d[0] - h[0]) / 6, B = v[1] - (d[1] - h[1]) / 6;
    t.push(`C ${D(f)} ${D(i)}, ${D(w)} ${D(B)}, ${D(v[0])} ${D(v[1])}`);
  }
  return t.join(" ") + u;
}
function me(e) {
  const a = e.geometry;
  if (typeof a.x == "number" && typeof a.y == "number")
    return e.shape === "rect" ? [a.x + (a.width || 0) / 2, a.y + (a.height || 0) / 2] : e.shape === "circle" ? [a.x, a.y - (a.radius || 0) - 8] : [a.x, a.y + (e.shape === "icon" ? 18 : 0)];
  const u = a.points || [];
  if (!u.length) return [0, 0];
  const [t, p] = u.reduce((k, h) => [k[0] + h[0], k[1] + h[1]], [0, 0]);
  return [t / u.length, p / u.length];
}
function K(e, a) {
  const u = st[e.category], t = Ce(e), p = t && e.material ? `url(#${a}-material-${e.material})` : "", k = e.certainty === "inferred" ? "8 6" : e.certainty === "unknown" ? "3 7" : u.dash;
  return {
    ...u,
    fill: t ? p || u.fill || $e[e.material] : "none",
    opacity: e.certainty === "unknown" ? 0.48 : e.certainty === "inferred" ? 0.72 : 1,
    dash: k,
    icon: e.icon ? ut[e.icon] : e.kind ? rt[e.kind] : ct[e.category],
    fallback: e.kind ? it[e.kind] : ot[e.category].slice(0, 1),
    z: ce[e.category]
  };
}
function mt(e) {
  return [...e].sort((a, u) => ce[a.category] - ce[u.category] || ft(a.id, u.id));
}
var vn = Object.freeze([
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
]), pn = Object.freeze([
  "rect",
  "circle",
  "path",
  "curve",
  "icon",
  "label"
]), fn = Object.freeze([
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
]), ht = Object.freeze([
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
]), yn = Object.freeze([
  "confirmed",
  "inferred",
  "unknown"
]), mn = Object.freeze([
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
]), hn = Object.freeze(/* @__PURE__ */ new Set([
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
])), bt = ["id"], gt = ["fill"], kt = {
  key: 0,
  d: "M0 6H24M0 18H24M7 0V6M17 6V18M10 18V24"
}, wt = {
  key: 1,
  d: "M0 8L7 3l8 3 9-4M2 19l8-5 10 4 4-3"
}, Mt = {
  key: 2,
  d: "M0 8H24M0 16H24M8 0v24m8-24v24"
}, $t = {
  key: 3,
  d: "M-4 6q6-5 12 0t12 0t12 0M-4 17q6-5 12 0t12 0t12 0"
}, xt = {
  key: 4,
  d: "M4 20l2-7 2 7M13 13l2-8 2 8M19 23l2-6 2 6"
}, _t = {
  key: 5,
  d: "M3 5h2m8 3h3m3 10h2M7 19h3"
}, Ct = {
  key: 6,
  cx: "6",
  cy: "7",
  r: "1.1"
}, St = {
  key: 7,
  cx: "18",
  cy: "16",
  r: "1"
}, At = {
  key: 8,
  d: "M12 3v18M4 7l16 10M20 7L4 17"
}, Et = {
  key: 9,
  d: "M0 4h24M0 20h24"
}, Ot = {
  key: 10,
  cx: "5",
  cy: "12",
  r: "1.2"
}, Bt = {
  key: 11,
  cx: "19",
  cy: "12",
  r: "1.2"
}, Pt = {
  key: 12,
  d: "M0 4q6 4 12 0t12 0M0 16q6 4 12 0t12 0"
}, It = {
  key: 13,
  d: "M0 6l7 5 5-8 5 13 7-5M0 22l8-5 6 4 10-8"
}, Rt = {
  key: 14,
  d: "M12 2l4 7 6 3-6 4-4 6-4-6-6-4 6-3zM8 9l8 7m0-7l-8 7"
}, Tt = {
  key: 15,
  d: "M12 2v20M2 12h20M5 5l14 14M19 5L5 19"
}, Kt = [
  "x",
  "y",
  "width",
  "height"
], Lt = [
  "x",
  "y",
  "width",
  "height"
], zt = [
  "cx",
  "cy",
  "rx",
  "ry"
], jt = ["opacity"], Nt = [
  "x",
  "y",
  "width",
  "height",
  "fill",
  "stroke",
  "stroke-width",
  "stroke-dasharray"
], qt = [
  "cx",
  "cy",
  "r",
  "fill",
  "stroke",
  "stroke-width",
  "stroke-dasharray"
], Dt = [
  "d",
  "fill",
  "stroke",
  "stroke-width",
  "stroke-dasharray"
], Vt = ["transform"], Yt = ["stroke"], Ut = {
  key: 0,
  class: "map-material-symbol",
  "aria-hidden": "true"
}, Gt = {
  key: 1,
  class: "map-symbol-fallback",
  "aria-hidden": "true"
}, Ht = ["x", "y"], Xt = ["x", "y"], Zt = /* @__PURE__ */ Q({
  __name: "MapScene",
  props: { scene: {} },
  setup(e) {
    const a = e, u = I(!1);
    ne(() => {
      lt().then(() => {
        u.value = !0;
      }).catch(() => {
        u.value = !1;
      });
    });
    const t = `xiaobai-map-scene-${ge()}`, p = ht, k = E(() => mt(a.scene.elements)), h = E(() => dt[a.scene.mood || "neutral"]), v = E(() => ({
      "--map-canvas-glow": h.value.glow,
      "--map-canvas-accent": h.value.accent
    }));
    function d(w) {
      return w.geometry;
    }
    function f(w) {
      return w.geometry;
    }
    function i(w) {
      return w.geometry;
    }
    return (w, B) => (l(), te(Me, {
      class: "map-scene-viewport",
      style: Oe(v.value),
      "view-box": e.scene.viewBox,
      "reset-key": e.scene.key,
      label: `${e.scene.name} 场景地图`
    }, {
      default: we(() => [
        n("defs", null, [
          B[0] || (B[0] = n("pattern", {
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
          B[1] || (B[1] = n("pattern", {
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
          (l(!0), s(N, null, Y(r(p), (o) => (l(), s("pattern", {
            id: `${t}-material-${o}`,
            key: o,
            width: "24",
            height: "24",
            patternUnits: "userSpaceOnUse",
            class: V(`map-material-pattern is-${o}`)
          }, [
            n("rect", {
              width: "24",
              height: "24",
              fill: `color-mix(in srgb, ${r($e)[o]}, var(--map-surface) 48%)`
            }, null, 8, gt),
            o === "wood" ? (l(), s("path", kt)) : o === "stone" ? (l(), s("path", wt)) : o === "tile" || o === "marble" ? (l(), s("path", Mt)) : o === "water" ? (l(), s("path", $t)) : o === "grass" ? (l(), s("path", xt)) : o === "dirt" ? (l(), s("path", _t)) : o === "sand" ? (l(), s("circle", Ct)) : M("", !0),
            o === "sand" ? (l(), s("circle", St)) : o === "snow" ? (l(), s("path", At)) : o === "metal" ? (l(), s("path", Et)) : M("", !0),
            o === "metal" ? (l(), s("circle", Ot)) : M("", !0),
            o === "metal" ? (l(), s("circle", Bt)) : o === "fabric" || o === "carpet" || o === "bed-sheet" || o === "tatami" ? (l(), s("path", Pt)) : o === "blood" ? (l(), s("path", It)) : o === "rune" ? (l(), s("path", Rt)) : o === "warm-light" || o === "cold-light" || o === "shadow" ? (l(), s("path", Tt)) : M("", !0)
          ], 10, bt))), 128)),
          B[2] || (B[2] = n("filter", {
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
          x: e.scene.viewBox[0],
          y: e.scene.viewBox[1],
          width: e.scene.viewBox[2],
          height: e.scene.viewBox[3],
          fill: "var(--map-canvas-bg)"
        }, null, 8, Kt),
        n("rect", {
          x: e.scene.viewBox[0],
          y: e.scene.viewBox[1],
          width: e.scene.viewBox[2],
          height: e.scene.viewBox[3],
          fill: "url(#map-scene-major-grid)"
        }, null, 8, Lt),
        n("ellipse", {
          cx: e.scene.viewBox[0] + e.scene.viewBox[2] / 2,
          cy: e.scene.viewBox[1] + e.scene.viewBox[3] / 2,
          rx: e.scene.viewBox[2] * 0.42,
          ry: e.scene.viewBox[3] * 0.42,
          fill: "var(--map-canvas-glow)"
        }, null, 8, zt),
        (l(!0), s(N, null, Y(k.value, (o) => (l(), s("g", {
          key: o.id,
          class: V(["map-scene-element", [`is-${o.category}`, `is-${o.certainty || "confirmed"}`]]),
          opacity: r(K)(o, t).opacity
        }, [o.shape === "rect" ? (l(), s("rect", {
          key: 0,
          x: d(o).x,
          y: d(o).y,
          width: d(o).width,
          height: d(o).height,
          fill: r(K)(o, t).fill,
          stroke: r(K)(o, t).stroke,
          "stroke-width": r(K)(o, t).width,
          "stroke-dasharray": r(K)(o, t).dash,
          "vector-effect": "non-scaling-stroke"
        }, null, 8, Nt)) : o.shape === "circle" ? (l(), s("circle", {
          key: 1,
          cx: f(o).x,
          cy: f(o).y,
          r: f(o).radius,
          fill: r(K)(o, t).fill,
          stroke: r(K)(o, t).stroke,
          "stroke-width": r(K)(o, t).width,
          "stroke-dasharray": r(K)(o, t).dash,
          "vector-effect": "non-scaling-stroke"
        }, null, 8, qt)) : o.shape === "path" || o.shape === "curve" ? (l(), s("path", {
          key: 2,
          d: r(yt)(o),
          fill: r(K)(o, t).fill,
          stroke: r(K)(o, t).stroke,
          "stroke-width": r(K)(o, t).width,
          "stroke-dasharray": r(K)(o, t).dash,
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "fill-rule": "evenodd",
          "vector-effect": "non-scaling-stroke"
        }, null, 8, Dt)) : o.shape === "icon" ? (l(), s("g", {
          key: 3,
          class: "map-scene-icon",
          transform: `translate(${i(o).x} ${i(o).y})`
        }, [n("circle", {
          r: "11",
          stroke: r(K)(o, t).stroke
        }, null, 8, Yt), u.value ? (l(), s("text", Ut, m(r(K)(o, t).icon), 1)) : (l(), s("text", Gt, m(r(K)(o, t).fallback), 1))], 8, Vt)) : o.shape === "label" ? (l(), s("text", {
          key: 4,
          class: "map-scene-label is-primary",
          x: i(o).x,
          y: i(o).y
        }, m(o.label || ""), 9, Ht)) : M("", !0), o.label && o.shape !== "label" ? (l(), s("text", {
          key: 5,
          class: "map-scene-label",
          x: r(me)(o)[0],
          y: r(me)(o)[1]
        }, m(o.label), 9, Xt)) : M("", !0)], 10, jt))), 128))
      ]),
      _: 1
    }, 8, [
      "style",
      "view-box",
      "reset-key",
      "label"
    ]));
  }
}), Ft = Zt, Qt = { class: "map-dialog-header" }, Wt = { key: 0 }, Jt = { class: "map-settings-content" }, ea = { class: "map-auto-setting" }, ta = ["aria-checked", "disabled"], aa = { class: "map-settings-section" }, na = ["disabled"], la = { key: 0 }, sa = { class: "map-settings-section" }, oa = { key: 0 }, ra = ["disabled"], ia = {
  key: 0,
  class: "map-setting-note",
  role: "status"
}, ua = ["disabled"], ca = /* @__PURE__ */ Q({
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
    const a = I(null);
    return ne(() => a.value?.showModal()), (u, t) => (l(), s("dialog", {
      ref_key: "dialog",
      ref: a,
      class: "map-dialog map-settings",
      "aria-labelledby": "map-settings-title",
      onCancel: t[5] || (t[5] = F((p) => u.$emit("close"), ["prevent"])),
      onKeydown: t[6] || (t[6] = F(() => {
      }, ["stop"]))
    }, [
      n("header", Qt, [t[7] || (t[7] = n("div", null, [n("small", null, "让地图跟上你的故事"), n("h2", { id: "map-settings-title" }, "地图设置")], -1)), n("button", {
        type: "button",
        class: "map-round-button",
        "aria-label": "关闭地图设置",
        onClick: t[0] || (t[0] = (p) => u.$emit("close"))
      }, [S(A, { name: "close" })])]),
      e.status || e.notice || e.maintenanceMessage ? (l(), s("section", {
        key: 0,
        class: V(["map-settings-feedback", { "is-error": e.notice ? e.noticeError : e.maintenanceError }]),
        role: "status"
      }, [n("strong", null, m(e.notice ? e.notice === e.maintenanceMessage ? "最近一次更新" : "操作提示" : e.status || "最近一次更新"), 1), e.notice || e.maintenanceMessage ? (l(), s("p", Wt, m(e.notice || e.maintenanceMessage), 1)) : M("", !0)], 2)) : M("", !0),
      n("div", Jt, [
        n("section", ea, [t[9] || (t[9] = n("div", null, [n("h3", null, "随对话自动更新"), n("p", null, "你发送下一条消息时，根据上一轮对话更新地图。适用于所有普通聊天。")], -1)), n("button", {
          type: "button",
          class: "map-switch",
          role: "switch",
          "aria-checked": e.autoMaintenance,
          "aria-label": "随对话自动更新",
          disabled: e.autoToggleBusy,
          onClick: t[1] || (t[1] = (p) => u.$emit("setAuto", !e.autoMaintenance))
        }, [...t[8] || (t[8] = [n("span", null, null, -1)])], 8, ta)]),
        n("section", aa, [
          S(A, { name: "refresh" }),
          t[10] || (t[10] = n("h3", null, "补充最近的变化", -1)),
          t[11] || (t[11] = n("p", null, "根据最近一轮对话更新位置和地点，并补全当前区域尚缺少的探索去处。", -1)),
          n("button", {
            type: "button",
            class: "map-primary-button",
            disabled: e.busy || !!e.disabledReason || !e.hasMap,
            onClick: t[2] || (t[2] = (p) => u.$emit("update"))
          }, m(e.busy ? e.status || "请稍候…" : "更新地图"), 9, na),
          e.hasMap ? M("", !0) : (l(), s("small", la, "请先建立世界地图"))
        ]),
        n("section", sa, [
          S(A, { name: "globe" }),
          n("h3", null, m(e.hasMap ? "重新绘制世界" : "建立世界地图"), 1),
          t[12] || (t[12] = n("p", null, "依据角色与世界设定建立地图；设定未写明的地方，会合理补全。结合当前聊天保留已发生的故事。", -1)),
          e.hasMap ? (l(), s("p", oa, "新地图保存成功后替换原图；失败时保留原图。")) : M("", !0),
          n("button", {
            type: "button",
            class: "map-secondary-button",
            disabled: e.busy || !!e.disabledReason,
            onClick: t[3] || (t[3] = (p) => u.$emit("rebuild"))
          }, m(e.busy ? e.status || "请稍候…" : e.hasMap ? "重新绘制" : "绘制世界地图"), 9, ra)
        ]),
        e.disabledReason ? (l(), s("p", ia, m(e.disabledReason), 1)) : M("", !0),
        n("button", {
          type: "button",
          class: "map-sync-button",
          disabled: e.busy || e.refreshDisabled,
          onClick: t[4] || (t[4] = (p) => u.$emit("refresh"))
        }, [S(A, { name: "refresh" }), t[13] || (t[13] = z("同步已保存的地图", -1))], 8, ua),
        t[14] || (t[14] = n("p", { class: "map-setting-note" }, "同步只读取保存结果，不会重新生成地图。绘制或更新开始后，可以离开此页面。", -1))
      ])
    ], 544));
  }
}), da = ca, va = { class: "map-search-input" }, pa = {
  class: "map-search-filters",
  "aria-label": "地点筛选"
}, fa = ["aria-pressed", "onClick"], ya = { class: "map-search-results" }, ma = ["onClick"], ha = { class: "map-result-icon" }, ba = { key: 0 }, ga = {
  key: 0,
  class: "map-search-empty"
}, ka = /* @__PURE__ */ Q({
  __name: "MapSearch",
  props: { atlas: {} },
  emits: ["close", "select"],
  setup(e) {
    const a = e, u = I(null), t = I(""), p = I("all"), k = E(() => a.atlas.locations.filter((h) => [
      h.name,
      h.brief,
      a.atlas.locations.find((v) => v.key === h.parent)?.name
    ].some((v) => v?.toLocaleLowerCase().includes(t.value.trim().toLocaleLowerCase())) && (p.value === "all" || (p.value === "unvisited" ? h.status !== "visited" : h.status === "visited"))));
    return ne(() => u.value?.showModal()), (h, v) => (l(), s("dialog", {
      ref_key: "dialog",
      ref: u,
      class: "map-dialog map-search-dialog",
      "aria-label": "查找地点",
      onCancel: v[2] || (v[2] = F((d) => h.$emit("close"), ["prevent"])),
      onKeydown: v[3] || (v[3] = F(() => {
      }, ["stop"]))
    }, [
      n("header", va, [
        S(A, { name: "search" }),
        be(n("input", {
          "onUpdate:modelValue": v[0] || (v[0] = (d) => t.value = d),
          type: "search",
          "aria-label": "搜索地点",
          placeholder: "想去哪里？",
          autofocus: ""
        }, null, 512), [[Re, t.value]]),
        n("button", {
          type: "button",
          onClick: v[1] || (v[1] = (d) => h.$emit("close"))
        }, "取消")
      ]),
      n("nav", pa, [(l(), s(N, null, Y([
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
      ], (d) => n("button", {
        key: d.id,
        type: "button",
        "aria-pressed": p.value === d.id,
        onClick: (f) => p.value = d.id
      }, m(d.name), 9, fa)), 64))]),
      n("div", ya, [
        n("small", null, m(k.value.length) + " 个地点", 1),
        (l(!0), s(N, null, Y(k.value, (d) => (l(), s("button", {
          key: d.key,
          type: "button",
          class: "map-search-result",
          onClick: (f) => h.$emit("select", d.key)
        }, [
          n("span", ha, [S(A, { name: "pin" })]),
          n("span", null, [
            n("strong", null, m(d.name), 1),
            n("small", null, m(r(xe)[d.scale]) + " · " + m(d.status === "visited" ? "已到访" : "未到访"), 1),
            d.brief ? (l(), s("p", ba, m(d.brief), 1)) : M("", !0)
          ]),
          S(A, { name: "next" })
        ], 8, ma))), 128)),
        k.value.length ? M("", !0) : (l(), s("div", ga, [
          S(A, { name: "search" }),
          v[4] || (v[4] = n("h3", null, "还没有找到这个地点", -1)),
          v[5] || (v[5] = n("p", null, "试试其他名称，或看看全部地点。", -1))
        ]))
      ])
    ], 544));
  }
}), wa = ka, Ma = {
  class: "map-place-detail",
  "aria-labelledby": "map-place-title"
}, $a = { id: "map-place-title" }, xa = { class: "map-place-content" }, _a = {
  key: 0,
  class: "map-place-full-name"
}, Ca = {
  key: 1,
  class: "map-address"
}, Sa = { class: "map-place-intro" }, Aa = {
  key: 2,
  class: "map-place-actions"
}, Ea = {
  key: 3,
  class: "map-detail-section"
}, Oa = { class: "map-people" }, Ba = {
  key: 4,
  class: "map-detail-section"
}, Pa = ["onClick"], Ia = /* @__PURE__ */ Q({
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
    const a = e, u = E(() => de(a.map.atlas, a.location.key).slice(0, -1)), t = E(() => a.map.atlas.locations.filter((v) => v.parent === a.location.key)), p = E(() => a.map.atlas.actors.filter((v) => v.locationKey === a.location.key)), k = E(() => Ve(a.map.atlas, a.location.key)), h = E(() => a.location.sceneKey ? a.map.scenes[a.location.sceneKey] : void 0);
    return (v, d) => (l(), s("section", Ma, [
      d[7] || (d[7] = n("div", {
        class: "map-sheet-grip",
        "aria-hidden": "true"
      }, null, -1)),
      n("header", null, [n("div", null, [n("small", null, m(r(xe)[e.location.scale]) + " · " + m(e.currentKey === e.location.key ? "当前位置" : e.location.status === "visited" ? "已到访" : "未到访"), 1), n("h2", $a, m(e.location.name), 1)]), n("button", {
        type: "button",
        class: "map-round-button",
        "aria-label": "关闭地点详情",
        onClick: d[0] || (d[0] = (f) => v.$emit("close"))
      }, [S(A, { name: "close" })])]),
      n("div", xa, [
        e.location.name.length > 24 ? (l(), s("p", _a, m(e.location.name), 1)) : M("", !0),
        u.value.length ? (l(), s("p", Ca, [S(A, { name: "pin" }), z(m(u.value.map((f) => f.name).join(" · ")), 1)])) : M("", !0),
        n("p", Sa, m(e.location.brief || "这个地点已记录在世界地图上，更多介绍等待故事展开。"), 1),
        t.value.length || h.value ? (l(), s("div", Aa, [t.value.length ? (l(), s("button", {
          key: 0,
          type: "button",
          class: "map-primary-button",
          onClick: d[1] || (d[1] = (f) => v.$emit("explore"))
        }, [S(A, { name: "compass" }), z("探索这里 · " + m(t.value.length) + " 处", 1)])) : M("", !0), h.value ? (l(), s("button", {
          key: 1,
          type: "button",
          class: "map-secondary-button",
          onClick: d[2] || (d[2] = (f) => v.$emit("scene"))
        }, [S(A, { name: "layers" }), d[3] || (d[3] = z("查看场景图", -1))])) : M("", !0)])) : M("", !0),
        p.value.length ? (l(), s("section", Ea, [d[4] || (d[4] = n("h3", null, "记录在这里的人物", -1)), n("p", Oa, [(l(!0), s(N, null, Y(p.value, (f) => (l(), s("span", { key: f.actorKey }, [S(A, { name: "person" }), z(m(f.displayName), 1)]))), 128))])])) : M("", !0),
        k.value.length ? (l(), s("section", Ba, [d[5] || (d[5] = n("h3", null, "相连的地方", -1)), (l(!0), s(N, null, Y(k.value, (f) => (l(), s("button", {
          key: f.link.id,
          type: "button",
          class: "map-connection",
          onClick: (i) => v.$emit("select", f.location.key)
        }, [
          S(A, { name: "route" }),
          n("span", null, [n("strong", null, m(f.location.name), 1), n("small", null, m(f.link.label || r(vt)[f.link.kind]) + m(f.link.bidirectional ? "" : f.outgoing ? " · 单向前往" : " · 仅可从对面到达"), 1)]),
          S(A, { name: "next" })
        ], 8, Pa))), 128))])) : M("", !0),
        d[6] || (d[6] = n("p", { class: "map-detail-footnote" }, "查看地图不会改变你在故事中的位置", -1))
      ])
    ]));
  }
}), Ra = Ia;
function ee(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}
function he(e) {
  return e.maintenanceStatus === "maintaining" || e.maintenanceStatus === "rebuilding";
}
function Ta(e) {
  const a = I(structuredClone(Pe(e.initialState))), u = I(null), t = I(""), p = I(!1);
  let k = !1, h = 0, v = 0, d = () => {
  };
  const f = E(() => a.value.status === "unconfirmed" || a.value.writeState === "unconfirmed"), i = E(() => u.value !== null || ["loading", "saving"].includes(a.value.status) || ["maintaining", "rebuilding"].includes(a.value.maintenanceStatus || "")), w = E(() => i.value ? "正在更新地图，请稍候" : f.value ? "请先核实上一次保存结果" : a.value.status === "conflict" ? "保存的版本不一致，请先处理保存问题" : a.value.status !== "ready" ? a.value.message || "地图暂时不可更新" : a.value.chatIdentity ? "" : "请先打开一个聊天"), B = E(() => a.value.maintenanceStatus === "rebuilding" || u.value === "rebuild" ? "正在绘制世界…" : a.value.maintenanceStatus === "maintaining" || u.value === "maintain" ? "正在更新地图…" : u.value === "confirm" ? "正在核实保存…" : i.value ? "正在同步…" : ""), o = E(() => a.value.message || t.value), q = E(() => a.value.message ? [
    "blocked",
    "error",
    "conflict",
    "unconfirmed"
  ].includes(a.value.status) : p.value);
  function H($) {
    const b = he(a.value);
    a.value = structuredClone($), he($) ? (t.value = "", p.value = !1) : b && (t.value = $.maintenanceMessage || "", p.value = $.maintenanceStatus === "error");
  }
  function L($, b) {
    const U = $ instanceof Error ? $.message : String($);
    return U.includes("聊天已切换") ? "聊天已切换，请重新打开地图。" : U === "host_request_timeout" ? "等待结果超时，更新可能仍在进行。请稍后查看，不要重复提交。" : b === "confirm" ? "仍无法确认保存结果，请稍后再试。" : b === "adopt" ? "未能恢复已保存的版本，当前更改仍暂停保存。" : b === "settings" ? "设置未能保存，请重试。" : "地图操作未完成，请稍后重试。";
  }
  async function P($, b, U = {}) {
    if (u.value) return;
    const G = ++h, X = v, j = a.value.chatIdentity;
    u.value = b, t.value = "", p.value = !1;
    try {
      const T = await e.bridge.request($, {
        chatIdentity: j,
        ...U
      }, 35e3);
      if (!k || G !== h || a.value.chatIdentity !== j) return;
      const x = ee(T) ? T.result : void 0, y = ee(x) && ee(x.state) ? x.state : x;
      X === v && ee(y) && y.chatIdentity === j && H(y), (b === "maintain" || b === "rebuild") && ee(x) && typeof x.message == "string" && x.message && (t.value = x.message), b === "refresh" && a.value.status === "ready" && (t.value = "已同步保存的地图。"), b === "settings" && (t.value = a.value.autoMaintenance ? "自动更新已开启。" : "自动更新已关闭。"), b === "confirm" && a.value.status === "ready" && (t.value = "保存已确认。"), b === "adopt" && ee(x) && x.adoption === "adopted" && (t.value = "已恢复当前聊天中保存的 OS 数据。");
    } catch (T) {
      k && G === h && a.value.chatIdentity === j && (t.value = L(T, b), p.value = !0);
    } finally {
      k && G === h && (u.value = null);
    }
  }
  return ne(() => {
    k = !0, d = e.bridge.subscribe(($) => {
      if ($.type === "map/state") {
        const b = $.payload.state;
        if (b.chatIdentity !== a.value.chatIdentity) return;
        v += 1, H(b);
      } else $.type === "map/error" && (v += 1, p.value = !0, t.value = $.payload.message || "地图暂时无法读取，请重新打开。");
    });
  }), ke(() => {
    k = !1, h += 1, d();
  }), {
    state: a,
    activeRequest: u,
    busy: i,
    disabledReason: w,
    requiresConfirmation: f,
    status: B,
    notice: o,
    isError: q,
    dismissNotice: () => {
      t.value = "", p.value = !1;
    },
    refresh: () => {
      if (!i.value && !f.value) return P("map/refresh", "refresh");
    },
    confirmSave: () => {
      if (!i.value) return P("map/confirm-save", "confirm");
    },
    adopt: () => {
      if (!i.value) return P("map/adopt-server-state", "adopt");
    },
    setAuto: ($) => P("map/set-auto-maintenance", "settings", { enabled: $ }),
    update: () => {
      if (!w.value && a.value.map) return P("map/maintain-once", "maintain");
    },
    rebuild: () => {
      if (!w.value) return P("map/rebuild", "rebuild");
    }
  };
}
var Ka = { class: "map-top" }, La = { class: "map-search-bar" }, za = ["disabled"], ja = {
  key: 1,
  class: "map-search-entry"
}, Na = {
  key: 0,
  class: "map-view-switch",
  "aria-label": "地图视图"
}, qa = ["aria-pressed"], Da = ["aria-pressed"], Va = {
  key: 1,
  class: "map-region-trail",
  "aria-label": "当前查看区域"
}, Ya = ["onClick"], Ua = {
  key: 2,
  class: "map-progress",
  role: "status"
}, Ga = ["disabled"], Ha = ["disabled"], Xa = ["disabled"], Za = {
  key: 1,
  class: "map-empty"
}, Fa = ["disabled"], Qa = {
  key: 0,
  class: "map-setting-note"
}, Wa = {
  key: 1,
  class: "map-empty"
}, Ja = {
  key: 1,
  class: "map-empty map-first-map"
}, en = { class: "map-empty-art" }, tn = ["disabled"], an = {
  key: 1,
  class: "map-setting-note"
}, nn = ["disabled"], ln = ["aria-expanded"], sn = {
  key: 1,
  class: "map-key"
}, on = {
  key: 3,
  class: "map-region-card"
}, rn = { class: "map-region-icon" }, un = {
  key: 4,
  class: "map-scene-caption"
}, cn = /* @__PURE__ */ Q({
  __name: "MapApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const { state: a, activeRequest: u, busy: t, disabledReason: p, requiresConfirmation: k, status: h, notice: v, isError: d, dismissNotice: f, refresh: i, confirmSave: w, adopt: B, setAuto: o, update: q, rebuild: H } = Ta(e), L = I(a.value.map ? ye(a.value.map.atlas) : ""), P = I(""), $ = I(null), b = E(() => $.value !== null), U = I(""), G = I(0), X = I(!1), j = I(!1), T = I(!1), x = E(() => a.value.map?.atlas), y = E(() => x.value?.actors.find((_) => _.actorKey === "player")?.locationKey || ""), C = E(() => x.value?.locations.find((_) => _.key === y.value)), O = E(() => x.value?.locations.find((_) => _.key === P.value)), R = E(() => x.value?.locations.find((_) => _.key === ($.value || y.value))), J = E(() => b.value && R.value?.sceneKey ? a.value.map?.scenes[R.value.sceneKey] : void 0), W = E(() => x.value?.locations.find((_) => _.key === L.value)), re = E(() => x.value?.locations.filter((_) => (_.parent || "") === L.value) || []), ve = E(() => re.value.filter((_) => _.status !== "visited").length), Se = E(() => x.value ? de(x.value, L.value) : []);
    ue(() => a.value, (_, c) => {
      const g = _.chatIdentity !== c.chatIdentity;
      (!c.map || g || L.value && !_.map?.atlas.locations.some((Z) => Z.key === L.value)) && (L.value = _.map ? ye(_.map.atlas) : ""), (g || !_.map?.atlas.locations.some((Z) => Z.key === P.value)) && (P.value = ""), (g || $.value && !_.map?.atlas.locations.some((Z) => Z.key === $.value)) && ($.value = null), g && (X.value = !1, j.value = !1);
    });
    function le(_) {
      L.value = _, P.value = "", $.value = null, T.value = !1;
    }
    async function se(_, c = !1) {
      const g = x.value?.locations.find((Z) => Z.key === _);
      g && ($.value = null, P.value = _, j.value = !1, T.value = !1, c && (L.value = g.parent || ""), await Te(), U.value = x.value ? oe(x.value, _, L.value) : _, G.value += 1);
    }
    async function Ae() {
      C.value && await se(C.value.key, !0);
    }
    function ie(_ = "") {
      $.value = _ === y.value ? "" : _, T.value = !1, j.value = !1;
    }
    function pe() {
      $.value = null, T.value = !1;
    }
    function Ee(_) {
      _.key === "Escape" && (b.value || P.value || T.value) && (_.stopPropagation(), b.value ? pe() : P.value ? P.value = "" : T.value = !1);
    }
    return (_, c) => (l(), s("main", {
      class: V(["map-app", {
        "has-view-switch": x.value?.locations.length,
        "is-scene-view": b.value
      }]),
      onKeydown: Ee
    }, [
      n("div", Ka, [
        n("header", La, [
          S(A, { name: b.value ? "layers" : "search" }, null, 8, ["name"]),
          b.value ? (l(), s("div", ja, [z(m(R.value?.name || "当前场景"), 1), n("small", null, m($.value ? "正在查看已记录的场景" : "看看你身边的布局"), 1)])) : (l(), s("button", {
            key: 0,
            type: "button",
            class: "map-search-entry",
            disabled: !x.value?.locations.length,
            onClick: c[0] || (c[0] = (g) => j.value = !0)
          }, [...c[22] || (c[22] = [z("想去哪里？", -1), n("small", null, "搜索世界中的地点", -1)])], 8, za)),
          n("button", {
            type: "button",
            class: "map-round-button",
            "aria-label": "地图设置",
            onClick: c[1] || (c[1] = (g) => X.value = !0)
          }, [S(A, { name: "more" })])
        ]),
        x.value?.locations.length ? (l(), s("nav", Na, [n("button", {
          type: "button",
          "aria-pressed": !b.value,
          onClick: pe
        }, [S(A, { name: "globe" }), c[23] || (c[23] = z("世界地图", -1))], 8, qa), n("button", {
          type: "button",
          "aria-pressed": b.value,
          onClick: c[2] || (c[2] = (g) => ie())
        }, [S(A, { name: "layers" }), z(m($.value ? "场景地图" : "当前场景"), 1)], 8, Da)])) : M("", !0),
        x.value?.locations.length && !b.value ? (l(), s("nav", Va, [n("button", {
          type: "button",
          onClick: c[3] || (c[3] = (g) => le(""))
        }, [S(A, { name: "globe" }), c[24] || (c[24] = z("世界", -1))]), (l(!0), s(N, null, Y(Se.value, (g) => (l(), s(N, { key: g.key }, [S(A, { name: "next" }), n("button", {
          type: "button",
          onClick: (Z) => le(g.key)
        }, m(g.name), 9, Ya)], 64))), 128))])) : M("", !0),
        r(h) ? (l(), s("div", Ua, [c[25] || (c[25] = n("span", null, null, -1)), z(m(r(h)), 1)])) : M("", !0),
        r(v) || r(k) || r(a).status === "conflict" ? (l(), s("aside", {
          key: 3,
          class: V(["map-notice", { "is-error": r(d) }]),
          role: "status"
        }, [n("p", null, m(r(v) || (r(k) ? "保存结果尚未确认。" : "保存的版本不一致。")), 1), r(k) ? (l(), s("button", {
          key: 0,
          type: "button",
          disabled: r(t),
          onClick: c[4] || (c[4] = (...g) => r(w) && r(w)(...g))
        }, "核实保存结果", 8, Ga)) : r(a).status === "conflict" ? (l(), s(N, { key: 1 }, [c[26] || (c[26] = n("small", null, "恢复会放弃尚未保存的更改，并使用当前聊天已保存的 OS 数据（不只是地图）。", -1)), n("button", {
          type: "button",
          disabled: r(t),
          onClick: c[5] || (c[5] = (...g) => r(B) && r(B)(...g))
        }, "放弃未保存更改并恢复", 8, Ha)], 64)) : r(a).status === "error" || r(a).status === "blocked" ? (l(), s("button", {
          key: 2,
          type: "button",
          disabled: r(t),
          onClick: c[6] || (c[6] = (...g) => r(i) && r(i)(...g))
        }, "重新读取", 8, Xa)) : (l(), s("button", {
          key: 3,
          type: "button",
          class: "map-notice-close",
          "aria-label": "关闭地图提示",
          onClick: c[7] || (c[7] = (...g) => r(f) && r(f)(...g))
        }, [S(A, { name: "close" })]))], 2)) : M("", !0)
      ]),
      n("div", { class: V(["map-canvas", { "has-detail": O.value && !b.value }]) }, [r(a).map && x.value?.locations.length ? (l(), s(N, { key: 0 }, [
        be(S(nt, {
          atlas: r(a).map.atlas,
          region: L.value,
          "current-location-key": y.value,
          "selected-location-key": P.value,
          "focus-key": U.value,
          "focus-sequence": G.value,
          onSelect: c[8] || (c[8] = (g) => se(g))
        }, null, 8, [
          "atlas",
          "region",
          "current-location-key",
          "selected-location-key",
          "focus-key",
          "focus-sequence"
        ]), [[Ie, !b.value]]),
        b.value ? (l(), s(N, { key: 0 }, [J.value?.status === "active" ? (l(), te(Ft, {
          key: 0,
          scene: J.value
        }, null, 8, ["scene"])) : (l(), s("div", Za, [
          S(A, { name: "layers" }),
          n("h2", null, m(R.value ? "这里的布局还没画出来" : "还不知道你在哪里"), 1),
          n("p", null, m(R.value ? "更新地图后，会结合设定与剧情补齐这里的普通布局。" : "更新地图后，会根据剧情确认你所在的地方。"), 1),
          n("button", {
            type: "button",
            class: "map-secondary-button",
            disabled: !!r(p),
            onClick: c[9] || (c[9] = (...g) => r(q) && r(q)(...g))
          }, m(r(t) ? "正在更新…" : "更新地图"), 9, Fa),
          r(p) && !r(t) ? (l(), s("p", Qa, m(r(p)), 1)) : M("", !0)
        ]))], 64)) : M("", !0),
        !b.value && !re.value.length ? (l(), s("div", Wa, [
          S(A, { name: "pin" }),
          c[27] || (c[27] = n("h2", null, "这里还没有标出更多地点", -1)),
          c[28] || (c[28] = n("p", null, "可以先看看其他区域，或更新地图补充。", -1)),
          n("button", {
            type: "button",
            class: "map-secondary-button",
            onClick: c[10] || (c[10] = (g) => le(W.value?.parent || ""))
          }, "查看上级区域")
        ])) : M("", !0)
      ], 64)) : (l(), s("div", Ja, [
        n("span", en, [S(A, { name: "globe" })]),
        c[29] || (c[29] = n("small", null, "故事之外，还有一整个世界", -1)),
        n("h1", null, m(r(a).status === "loading" ? "正在打开地图…" : "下一站，去哪里？"), 1),
        c[30] || (c[30] = n("p", null, [
          z("把世界设定画成地图，"),
          n("br"),
          z("也为留白的地方添上值得探索的去处。")
        ], -1)),
        r(a).status !== "loading" ? (l(), s("button", {
          key: 0,
          type: "button",
          class: "map-primary-button",
          disabled: !!r(p),
          onClick: c[11] || (c[11] = (...g) => r(H) && r(H)(...g))
        }, m(r(t) ? r(h) || "正在准备…" : "绘制世界地图"), 9, tn)) : M("", !0),
        r(p) && !r(t) ? (l(), s("p", an, m(r(p)), 1)) : M("", !0)
      ]))], 2),
      x.value?.locations.length ? (l(), s("div", {
        key: 0,
        class: V(["map-floating-tools", { "has-detail": O.value && !b.value }])
      }, [b.value && $.value ? (l(), s("button", {
        key: 0,
        type: "button",
        class: "map-round-button",
        "aria-label": "回到当前场景",
        onClick: c[12] || (c[12] = (g) => ie())
      }, [S(A, { name: "locate" })])) : b.value ? M("", !0) : (l(), s("button", {
        key: 1,
        type: "button",
        class: "map-round-button",
        disabled: !C.value,
        "aria-label": "回到我的位置",
        onClick: Ae
      }, [S(A, { name: "locate" })], 8, nn)), n("button", {
        type: "button",
        class: "map-round-button",
        "aria-expanded": T.value,
        "aria-label": "地图图例",
        onClick: c[13] || (c[13] = (g) => T.value = !T.value)
      }, [S(A, { name: "layers" })], 8, ln)], 2)) : M("", !0),
      T.value ? (l(), s("aside", sn, [...c[31] || (c[31] = [
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
      O.value && r(a).map && !b.value ? (l(), te(Ra, {
        key: O.value.key,
        location: O.value,
        map: r(a).map,
        "current-key": y.value,
        onClose: c[14] || (c[14] = (g) => P.value = ""),
        onScene: c[15] || (c[15] = (g) => ie(O.value.key)),
        onExplore: c[16] || (c[16] = (g) => le(O.value.key)),
        onSelect: c[17] || (c[17] = (g) => se(g, !0))
      }, null, 8, [
        "location",
        "map",
        "current-key"
      ])) : x.value?.locations.length && !b.value ? (l(), s("footer", on, [
        n("span", rn, [S(A, { name: "compass" })]),
        n("div", null, [n("h1", null, m(W.value?.name || "世界地图"), 1), n("p", null, m(re.value.length) + " 个地点 · " + m(ve.value ? ve.value + " 处还没去过" : "看看熟悉的地方有什么变化"), 1)]),
        n("button", {
          type: "button",
          class: "map-round-button",
          "aria-label": "浏览全部地点",
          onClick: c[18] || (c[18] = (g) => j.value = !0)
        }, [S(A, { name: "next" })])
      ])) : b.value && x.value?.locations.length ? (l(), s("footer", un, [S(A, { name: "layers" }), n("span", null, [n("strong", null, m(R.value?.name || "当前位置待确认"), 1), n("small", null, m($.value ? "正在查看场景图 · 不会移动人物" : "当前位置的场景图"), 1)])])) : M("", !0),
      j.value && x.value ? (l(), te(wa, {
        key: 5,
        atlas: x.value,
        onClose: c[19] || (c[19] = (g) => j.value = !1),
        onSelect: c[20] || (c[20] = (g) => se(g, !0))
      }, null, 8, ["atlas"])) : M("", !0),
      X.value ? (l(), te(da, {
        key: 6,
        "auto-maintenance": r(a).autoMaintenance,
        busy: r(t),
        "refresh-disabled": r(k),
        "auto-toggle-busy": r(u) !== null,
        "disabled-reason": r(p),
        "has-map": !!r(a).map,
        status: r(h),
        "maintenance-message": r(a).maintenanceMessage || "",
        "maintenance-error": r(a).maintenanceStatus === "error",
        notice: r(v),
        "notice-error": r(d),
        onClose: c[21] || (c[21] = (g) => X.value = !1),
        onSetAuto: r(o),
        onUpdate: r(q),
        onRebuild: r(H),
        onRefresh: r(i)
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
      ])) : M("", !0)
    ], 34));
  }
}), bn = cn;
export {
  bn as default
};
