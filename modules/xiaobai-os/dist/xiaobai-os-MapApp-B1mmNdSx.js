/* eslint-disable */
import { $ as Ae, A as j, C as Xe, D as Fe, E as de, M as qe, N as S, Q as G, S as Q, T as We, _ as Be, a as E, c as I, d as Qe, et as h, f as X, l as d, m as te, o as e, p as oe, r as Y, s as ve, x as u, y as Ze } from "./xiaobai-os-runtime-core.esm-bundler-Dmqi2Zbl.js";
import { c as pe, i as Je, t as et } from "./xiaobai-os-runtime-dom.esm-bundler-BYy7nd4d.js";
var tt = { class: "map-viewport" }, at = ["viewBox", "aria-label"], nt = {
  class: "map-viewport-controls",
  "aria-label": "地图缩放控制"
}, st = /* @__PURE__ */ te({
  __name: "MapViewport",
  props: {
    viewBox: {},
    resetKey: { default: "" },
    label: {}
  },
  setup(a) {
    const r = a, o = j(null), i = j([...r.viewBox]);
    let f = null, k = [0, 0], $ = [0, 0], n = null, g = !1, M = !1, x = null;
    const A = E(() => i.value.join(" "));
    function y() {
      const [v, b, _, w] = r.viewBox;
      i.value = [
        v,
        b,
        Math.max(1, _),
        Math.max(1, w)
      ];
    }
    function s() {
      const v = o.value?.getBoundingClientRect();
      return !v?.width || !v.height ? 1 : Math.max(i.value[2] / v.width, i.value[3] / v.height);
    }
    function l(v, b) {
      const _ = o.value?.getBoundingClientRect();
      if (!_?.width || !_.height) return [i.value[0] + i.value[2] / 2, i.value[1] + i.value[3] / 2];
      const w = s(), L = i.value[2] / w, N = i.value[3] / w, C = (_.width - L) / 2, V = (_.height - N) / 2;
      return [i.value[0] + (v - _.left - C) * w, i.value[1] + (b - _.top - V) * w];
    }
    function O(v, b) {
      const _ = Math.max(1, r.viewBox[2]), w = Math.min(_ * 5, Math.max(_ * 0.24, i.value[2] * v)), L = w / i.value[2], N = i.value[3] * L, C = b || [i.value[0] + i.value[2] / 2, i.value[1] + i.value[3] / 2], V = (C[0] - i.value[0]) / i.value[2], ee = (C[1] - i.value[1]) / i.value[3];
      i.value = [
        C[0] - w * V,
        C[1] - N * ee,
        w,
        N
      ];
    }
    function H(v) {
      O(v.deltaY < 0 ? 0.84 : 1.19, l(v.clientX, v.clientY));
    }
    function D(v) {
      v.button !== 0 || f !== null || (f = v.pointerId, k = [v.clientX, v.clientY], $ = [i.value[0], i.value[1]], g = !1, n = v.target instanceof Element ? v.target : o.value, n?.setPointerCapture(v.pointerId));
    }
    function F(v) {
      if (v.pointerId !== f) return;
      const b = v.clientX - k[0], _ = v.clientY - k[1];
      Math.abs(b) + Math.abs(_) > 4 && (g = !0);
      const w = s();
      i.value = [
        $[0] - b * w,
        $[1] - _ * w,
        i.value[2],
        i.value[3]
      ];
    }
    function P(v) {
      v.pointerId === f && (n?.hasPointerCapture(v.pointerId) && n.releasePointerCapture(v.pointerId), n = null, f = null, g && (M = !0, x && clearTimeout(x), x = setTimeout(() => {
        M = !1;
      }, 0)));
    }
    function p(v) {
      M && (v.preventDefault(), v.stopPropagation());
    }
    return We(() => [
      r.viewBox[0],
      r.viewBox[1],
      r.viewBox[2],
      r.viewBox[3],
      r.resetKey
    ], y, { immediate: !0 }), Be(() => {
      x && clearTimeout(x);
    }), (v, b) => (u(), d("div", tt, [(u(), d("svg", {
      ref_key: "svg",
      ref: o,
      class: "map-viewport-svg",
      viewBox: A.value,
      preserveAspectRatio: "xMidYMid meet",
      role: "img",
      "aria-label": a.label,
      onWheel: pe(H, ["prevent"]),
      onPointerdown: D,
      onPointermove: F,
      onPointerup: P,
      onPointercancel: P,
      onClickCapture: p
    }, [Xe(v.$slots, "default")], 40, at)), e("div", nt, [
      e("button", {
        type: "button",
        title: "放大",
        "aria-label": "放大",
        onClick: b[0] || (b[0] = (_) => O(0.8))
      }, "+"),
      e("button", {
        type: "button",
        title: "缩小",
        "aria-label": "缩小",
        onClick: b[1] || (b[1] = (_) => O(1.25))
      }, "-"),
      e("button", {
        type: "button",
        class: "map-viewport-reset",
        onClick: y
      }, "复位")
    ])]));
  }
}), Ee = st, rt = Object.freeze({
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
}), J = Object.freeze({
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
}), lt = Object.freeze({
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
}), ot = Object.freeze({
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
}), Oe = Object.freeze({
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
}), Ce = Object.freeze({
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
}), ct = Object.freeze({
  city: "location_city",
  district: "apartment",
  building: "home_work",
  floor: "stairs",
  room: "meeting_room",
  outdoor: "park"
}), Me = Object.freeze({
  city: "城市",
  district: "区域",
  building: "建筑",
  floor: "楼层",
  room: "房间",
  outdoor: "户外"
}), dt = Object.freeze({
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
function W(a, r) {
  return a < r ? -1 : a > r ? 1 : 0;
}
function B(a) {
  return Number(a.toFixed(3)).toString();
}
function Ie(a) {
  const r = a.geometry;
  return Array.isArray(r.points) ? r.points : [];
}
function Te(a) {
  return a.shape === "rect" || a.shape === "circle" ? !0 : Ie(a).length >= 3 && (a.closed === !0 || vt.has(a.category));
}
function pt(a) {
  const r = Ie(a);
  if (r.length < 2) return "";
  const o = Te(a) ? " Z" : "";
  if (a.shape === "path") return `M ${r.map(([f, k]) => `${B(f)} ${B(k)}`).join(" L ")}${o}`;
  const i = [`M ${B(r[0][0])} ${B(r[0][1])}`];
  for (let f = 0; f < r.length - 1; f += 1) {
    const k = r[f - 1] || r[f], $ = r[f], n = r[f + 1], g = r[f + 2] || n, M = $[0] + (n[0] - k[0]) / 6, x = $[1] + (n[1] - k[1]) / 6, A = n[0] - (g[0] - $[0]) / 6, y = n[1] - (g[1] - $[1]) / 6;
    i.push(`C ${B(M)} ${B(x)}, ${B(A)} ${B(y)}, ${B(n[0])} ${B(n[1])}`);
  }
  return i.join(" ") + o;
}
function _e(a) {
  const r = a.geometry;
  if (typeof r.x == "number" && typeof r.y == "number")
    return a.shape === "rect" ? [r.x + (r.width || 0) / 2, r.y + (r.height || 0) / 2] : a.shape === "circle" ? [r.x, r.y - (r.radius || 0) - 8] : [r.x, r.y + (a.shape === "icon" ? 18 : 0)];
  const o = r.points || [];
  if (!o.length) return [0, 0];
  const [i, f] = o.reduce((k, $) => [k[0] + $[0], k[1] + $[1]], [0, 0]);
  return [i / o.length, f / o.length];
}
function R(a, r) {
  const o = rt[a.category], i = Te(a), f = i && a.material ? `url(#${r}-material-${a.material})` : "", k = a.certainty === "inferred" ? "8 6" : a.certainty === "unknown" ? "3 7" : o.dash;
  return {
    ...o,
    fill: i ? f || o.fill || Oe[a.material] : "none",
    opacity: a.certainty === "unknown" ? 0.48 : a.certainty === "inferred" ? 0.72 : 1,
    dash: k,
    icon: a.icon ? ot[a.icon] : a.kind ? lt[a.kind] : ut[a.category],
    fallback: a.kind ? it[a.kind] : J[a.category].slice(0, 1),
    z: ce[a.category]
  };
}
function yt(a) {
  return [...a].sort((r, o) => ce[r.category] - ce[o.category] || W(r.id, o.id));
}
var se = 156, ft = 66, $e = 34, ht = 70;
function ue(a) {
  return [...a].sort((r, o) => W(r.parent || "", o.parent || "") || W(r.name, o.name) || W(r.key, o.key));
}
function mt(a) {
  const r = /* @__PURE__ */ new Set();
  return a.forEach((o) => {
    const i = [], f = /* @__PURE__ */ new Map();
    let k = o;
    for (; k?.parent; ) {
      const $ = f.get(k.key);
      if ($ !== void 0) {
        i.slice($).forEach((n) => r.add(n));
        break;
      }
      f.set(k.key, i.length), i.push(k.key), k = a.get(k.parent);
    }
  }), r;
}
function bt(a) {
  return [
    Math.min(...a.map((r) => r[0])),
    Math.min(...a.map((r) => r[1])),
    Math.max(...a.map((r) => r[0])),
    Math.max(...a.map((r) => r[1]))
  ];
}
function gt(a, r, o, i) {
  const f = [r.x + r.width / 2, r.y + r.height / 2], k = [o.x + o.width / 2, o.y + o.height / 2], $ = k[0] - f[0], n = k[1] - f[1], g = Math.abs($) >= Math.abs(n), M = g ? [$ >= 0 ? r.x + r.width : r.x, f[1]] : [f[0], n >= 0 ? r.y + r.height : r.y], x = g ? [$ >= 0 ? o.x : o.x + o.width, k[1]] : [k[0], n >= 0 ? o.y : o.y + o.height], A = (M[0] + x[0]) / 2, y = (M[1] + x[1]) / 2 + i, s = g ? [[A, M[1] + i], [A, x[1] + i]] : [[M[0] + i, y], [x[0] + i, y]];
  return {
    id: a.id,
    from: a.from,
    to: a.to,
    path: `M ${B(M[0])} ${B(M[1])} C ${B(s[0][0])} ${B(s[0][1])}, ${B(s[1][0])} ${B(s[1][1])}, ${B(x[0])} ${B(x[1])}`,
    labelX: A,
    labelY: y - 7,
    bounds: bt([
      M,
      x,
      s[0],
      s[1],
      [A, y - 7]
    ])
  };
}
function wt(a) {
  const r = ue(a.locations), o = new Map(r.map((p) => [p.key, p])), i = mt(o), f = /* @__PURE__ */ new Map(), k = [];
  r.forEach((p) => {
    const v = p.parent || "";
    if (v && o.has(v) && !i.has(v) && !i.has(p.key)) {
      const b = f.get(v) || [];
      b.push(p), f.set(v, b);
    } else k.push(p);
  }), f.forEach((p, v) => f.set(v, ue(p)));
  const $ = /* @__PURE__ */ new Map(), n = (p) => {
    const v = $.get(p.key);
    if (v !== void 0) return v;
    const b = f.get(p.key) || [], _ = b.length ? Math.max(se, b.reduce((w, L, N) => w + n(L) + (N ? $e : 0), 0)) : se;
    return $.set(p.key, _), _;
  }, g = [], M = (p, v, b) => {
    const _ = n(p);
    g.push({
      key: p.key,
      x: v + (_ - se) / 2,
      y: b * 158,
      width: se,
      height: ft,
      depth: b
    });
    let w = v;
    (f.get(p.key) || []).forEach((L) => {
      M(L, w, b + 1), w += n(L) + $e;
    });
  };
  let x = 0;
  ue(k).forEach((p) => {
    M(p, x, 0), x += n(p) + ht;
  });
  const A = new Map(g.map((p) => [p.key, p])), y = r.flatMap((p) => {
    const v = A.get(p.key), b = p.parent ? A.get(p.parent) : void 0;
    if (!v || !b) return [];
    const _ = b.x + b.width / 2, w = b.y + b.height, L = v.x + v.width / 2, N = v.y, C = (w + N) / 2;
    return [{
      id: `${b.key}:${v.key}`,
      path: `M ${B(_)} ${B(w)} C ${B(_)} ${B(C)}, ${B(L)} ${B(C)}, ${B(L)} ${B(N)}`
    }];
  }), s = /* @__PURE__ */ new Map(), l = [...a.links].sort((p, v) => W(p.id, v.id)).flatMap((p) => {
    const v = A.get(p.from), b = A.get(p.to);
    if (!v || !b) return [];
    const _ = [p.from, p.to].sort(W).join(":"), w = s.get(_) || 0;
    return s.set(_, w + 1), [gt(p, v, b, w === 0 ? 0 : (w % 2 ? 1 : -1) * Math.ceil(w / 2) * 24)];
  });
  if (!g.length) return {
    nodes: g,
    hierarchy: y,
    routes: l,
    viewBox: [
      0,
      0,
      640,
      420
    ]
  };
  const O = l.flatMap((p) => [p.bounds]), H = Math.min(...g.map((p) => p.x), ...O.map((p) => p[0])) - 60, D = Math.min(...g.map((p) => p.y), ...O.map((p) => p[1])) - 60, F = Math.max(...g.map((p) => p.x + p.width), ...O.map((p) => p[2])) + 60, P = Math.max(...g.map((p) => p.y + p.height), ...O.map((p) => p[3])) + 60;
  return {
    nodes: g,
    hierarchy: y,
    routes: l,
    viewBox: [
      H,
      D,
      Math.max(420, F - H),
      Math.max(300, P - D)
    ]
  };
}
function kt(a, r) {
  return a.filter((o) => o.locationKey === r).sort((o, i) => W(o.displayName, i.displayName) || W(o.actorKey, i.actorKey));
}
var xt = [
  "x",
  "y",
  "width",
  "height"
], Mt = [
  "x",
  "y",
  "width",
  "height"
], _t = {
  class: "map-atlas-hierarchy",
  "aria-hidden": "true"
}, $t = ["d"], St = { class: "map-atlas-routes" }, At = ["d", "marker-start"], Bt = ["x", "y"], Et = [
  "role",
  "tabindex",
  "aria-label",
  "onClick",
  "onKeydown"
], Ot = [
  "x",
  "y",
  "width",
  "height"
], Ct = ["d"], It = ["cx", "cy"], Tt = ["x", "y"], Rt = ["x", "y"], Lt = ["x", "y"], Kt = ["x", "y"], Pt = {
  key: 2,
  class: "map-atlas-actors"
}, Nt = ["transform"], zt = {
  key: 0,
  class: "map-material-symbol"
}, jt = {
  key: 1,
  class: "map-symbol-fallback"
}, Yt = ["x", "y"], Dt = ["transform"], Ut = /* @__PURE__ */ te({
  __name: "MapAtlas",
  props: {
    atlas: {},
    revision: {},
    currentLocationKey: {},
    selectedLocationKey: {},
    symbolsReady: { type: Boolean }
  },
  emits: ["viewScene"],
  setup(a, { emit: r }) {
    const o = a, i = r, f = E(() => wt(o.atlas)), k = E(() => new Map(o.atlas.locations.map((y) => [y.key, y]))), $ = E(() => new Map(o.atlas.links.map((y) => [y.id, y])));
    function n(y) {
      return k.value.get(y.key);
    }
    function g(y) {
      return $.value.get(y);
    }
    function M(y) {
      return kt(o.atlas.actors, y);
    }
    function x(y) {
      y.sceneKey && i("viewScene", y.key);
    }
    function A(y, s) {
      !s.sceneKey || y.key !== "Enter" && y.key !== " " || (y.preventDefault(), x(s));
    }
    return (y, s) => (u(), ve(Ee, {
      class: "map-atlas-viewport",
      "view-box": f.value.viewBox,
      "reset-key": String(a.revision),
      label: "世界地点关系图"
    }, {
      default: de(() => [
        s[2] || (s[2] = e("defs", null, [
          e("pattern", {
            id: "map-atlas-grid",
            width: "28",
            height: "28",
            patternUnits: "userSpaceOnUse"
          }, [e("path", {
            d: "M28 0H0V28",
            fill: "none",
            stroke: "rgba(92, 176, 228, .08)",
            "stroke-width": "1"
          })]),
          e("marker", {
            id: "map-atlas-arrow",
            viewBox: "0 0 10 10",
            refX: "8",
            refY: "5",
            markerWidth: "7",
            markerHeight: "7",
            orient: "auto-start-reverse"
          }, [e("path", {
            d: "M1 1l8 4-8 4z",
            fill: "#58bce9"
          })]),
          e("filter", {
            id: "map-atlas-current-glow",
            x: "-80%",
            y: "-80%",
            width: "260%",
            height: "260%"
          }, [e("feGaussianBlur", {
            stdDeviation: "3",
            result: "blur"
          }), e("feMerge", null, [e("feMergeNode", { in: "blur" }), e("feMergeNode", { in: "SourceGraphic" })])])
        ], -1)),
        e("rect", {
          x: f.value.viewBox[0],
          y: f.value.viewBox[1],
          width: f.value.viewBox[2],
          height: f.value.viewBox[3],
          class: "map-atlas-background"
        }, null, 8, xt),
        e("rect", {
          x: f.value.viewBox[0],
          y: f.value.viewBox[1],
          width: f.value.viewBox[2],
          height: f.value.viewBox[3],
          fill: "url(#map-atlas-grid)"
        }, null, 8, Mt),
        e("g", _t, [(u(!0), d(Y, null, Q(f.value.hierarchy, (l) => (u(), d("path", {
          key: l.id,
          d: l.path,
          "vector-effect": "non-scaling-stroke"
        }, null, 8, $t))), 128))]),
        e("g", St, [(u(!0), d(Y, null, Q(f.value.routes, (l) => (u(), d("g", { key: l.id }, [e("path", {
          d: l.path,
          "marker-start": g(l.id).bidirectional ? "url(#map-atlas-arrow)" : void 0,
          "marker-end": "url(#map-atlas-arrow)",
          "vector-effect": "non-scaling-stroke"
        }, null, 8, At), e("text", {
          x: l.labelX,
          y: l.labelY
        }, h(g(l.id).label || S(dt)[g(l.id).kind]), 9, Bt)]))), 128))]),
        (u(!0), d(Y, null, Q(f.value.nodes, (l) => (u(), d("g", {
          key: l.key,
          class: G(["map-atlas-node", {
            "is-current": l.key === a.currentLocationKey,
            "is-selected": l.key === a.selectedLocationKey,
            "is-visited": n(l).status === "visited",
            "is-clickable": !!n(l).sceneKey
          }]),
          role: n(l).sceneKey ? "button" : void 0,
          tabindex: n(l).sceneKey ? 0 : void 0,
          "aria-label": n(l).sceneKey ? `查看 ${n(l).name} 场景` : n(l).name,
          onClick: pe((O) => x(n(l)), ["stop"]),
          onKeydown: (O) => A(O, n(l))
        }, [
          e("rect", {
            x: l.x,
            y: l.y,
            width: l.width,
            height: l.height,
            rx: "9"
          }, null, 8, Ot),
          e("path", {
            class: "map-atlas-node-cut",
            d: `M ${l.x + l.width - 24} ${l.y} L ${l.x + l.width} ${l.y + 24}`
          }, null, 8, Ct),
          e("circle", {
            cx: l.x + 24,
            cy: l.y + 24,
            r: "13",
            class: "map-atlas-node-icon-ring"
          }, null, 8, It),
          a.symbolsReady ? (u(), d("text", {
            key: 0,
            x: l.x + 24,
            y: l.y + 24,
            class: "map-material-symbol"
          }, h(S(ct)[n(l).scale]), 9, Tt)) : (u(), d("text", {
            key: 1,
            x: l.x + 24,
            y: l.y + 24,
            class: "map-symbol-fallback"
          }, h(S(Me)[n(l).scale].slice(0, 1)), 9, Rt)),
          e("text", {
            x: l.x + 45,
            y: l.y + 23,
            class: "map-atlas-node-name"
          }, h(n(l).name), 9, Lt),
          e("text", {
            x: l.x + 45,
            y: l.y + 42,
            class: "map-atlas-node-meta"
          }, h(S(Me)[n(l).scale]) + " · " + h(n(l).status === "visited" ? "已到访" : "仅提及"), 9, Kt),
          M(l.key).length ? (u(), d("g", Pt, [(u(!0), d(Y, null, Q(M(l.key).slice(0, 4), (O, H) => (u(), d("g", {
            key: O.actorKey,
            transform: `translate(${l.x + 19 + H * 18} ${l.y + l.height - 2})`,
            class: G({ "is-player": O.actorKey === "player" })
          }, [
            s[0] || (s[0] = e("circle", { r: "7" }, null, -1)),
            a.symbolsReady ? (u(), d("text", zt, h(O.actorKey === "player" ? "person_pin_circle" : "person"), 1)) : (u(), d("text", jt, h(O.actorKey === "player" ? "P" : "N"), 1)),
            e("title", null, h(O.displayName), 1)
          ], 10, Nt))), 128)), M(l.key).length > 4 ? (u(), d("text", {
            key: 0,
            x: l.x + 88,
            y: l.y + l.height + 2,
            class: "map-atlas-actor-overflow"
          }, " +" + h(M(l.key).length - 4), 9, Yt)) : I("", !0)])) : I("", !0),
          l.key === a.currentLocationKey ? (u(), d("g", {
            key: 3,
            class: "map-atlas-current-pin",
            transform: `translate(${l.x + l.width - 13} ${l.y + 13})`
          }, [...s[1] || (s[1] = [e("circle", { r: "7" }, null, -1), e("path", { d: "M-3 0l2 2 4-5" }, null, -1)])], 8, Dt)) : I("", !0),
          e("title", null, h(n(l).brief || n(l).name), 1)
        ], 42, Et))), 128))
      ]),
      _: 1
    }, 8, ["view-box", "reset-key"]));
  }
}), Gt = Ut, An = Object.freeze([
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
]), Bn = Object.freeze([
  "rect",
  "circle",
  "path",
  "curve",
  "icon",
  "label"
]), En = Object.freeze([
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
]), Ht = Object.freeze([
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
]), On = Object.freeze([
  "confirmed",
  "inferred",
  "unknown"
]), Cn = Object.freeze([
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
]), In = Object.freeze(/* @__PURE__ */ new Set([
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
])), Vt = ["id"], Xt = ["fill"], Ft = {
  key: 0,
  d: "M0 6H24M0 18H24M7 0V6M17 6V18M10 18V24"
}, qt = {
  key: 1,
  d: "M0 8L7 3l8 3 9-4M2 19l8-5 10 4 4-3"
}, Wt = {
  key: 2,
  d: "M0 8H24M0 16H24M8 0v24m8-24v24"
}, Qt = {
  key: 3,
  d: "M-4 6q6-5 12 0t12 0t12 0M-4 17q6-5 12 0t12 0t12 0"
}, Zt = {
  key: 4,
  d: "M4 20l2-7 2 7M13 13l2-8 2 8M19 23l2-6 2 6"
}, Jt = {
  key: 5,
  d: "M3 5h2m8 3h3m3 10h2M7 19h3"
}, ea = {
  key: 6,
  cx: "6",
  cy: "7",
  r: "1.1"
}, ta = {
  key: 7,
  cx: "18",
  cy: "16",
  r: "1"
}, aa = {
  key: 8,
  d: "M12 3v18M4 7l16 10M20 7L4 17"
}, na = {
  key: 9,
  d: "M0 4h24M0 20h24"
}, sa = {
  key: 10,
  cx: "5",
  cy: "12",
  r: "1.2"
}, ra = {
  key: 11,
  cx: "19",
  cy: "12",
  r: "1.2"
}, la = {
  key: 12,
  d: "M0 4q6 4 12 0t12 0M0 16q6 4 12 0t12 0"
}, ia = {
  key: 13,
  d: "M0 6l7 5 5-8 5 13 7-5M0 22l8-5 6 4 10-8"
}, oa = {
  key: 14,
  d: "M12 2l4 7 6 3-6 4-4 6-4-6-6-4 6-3zM8 9l8 7m0-7l-8 7"
}, ua = {
  key: 15,
  d: "M12 2v20M2 12h20M5 5l14 14M19 5L5 19"
}, ca = [
  "x",
  "y",
  "width",
  "height"
], da = [
  "x",
  "y",
  "width",
  "height"
], va = [
  "cx",
  "cy",
  "rx",
  "ry"
], pa = ["opacity"], ya = [
  "x",
  "y",
  "width",
  "height",
  "fill",
  "stroke",
  "stroke-width",
  "stroke-dasharray"
], fa = [
  "cx",
  "cy",
  "r",
  "fill",
  "stroke",
  "stroke-width",
  "stroke-dasharray"
], ha = [
  "d",
  "fill",
  "stroke",
  "stroke-width",
  "stroke-dasharray"
], ma = ["transform"], ba = ["stroke"], ga = {
  key: 0,
  class: "map-material-symbol",
  "aria-hidden": "true"
}, wa = {
  key: 1,
  class: "map-symbol-fallback",
  "aria-hidden": "true"
}, ka = ["x", "y"], xa = ["x", "y"], Ma = /* @__PURE__ */ te({
  __name: "MapScene",
  props: {
    scene: {},
    symbolsReady: { type: Boolean }
  },
  setup(a) {
    let r = 0;
    const o = a, i = `xiaobai-map-scene-${r += 1}`, f = Ht, k = E(() => yt(o.scene.elements)), $ = E(() => Ce[o.scene.mood || "neutral"]), n = E(() => ({
      "--map-canvas-bg": $.value.background,
      "--map-canvas-glow": $.value.glow,
      "--map-canvas-accent": $.value.accent
    }));
    function g(A) {
      return A.geometry;
    }
    function M(A) {
      return A.geometry;
    }
    function x(A) {
      return A.geometry;
    }
    return (A, y) => (u(), ve(Ee, {
      class: "map-scene-viewport",
      style: Ae(n.value),
      "view-box": a.scene.viewBox,
      "reset-key": a.scene.key,
      label: `${a.scene.name} 场景地图`
    }, {
      default: de(() => [
        e("defs", null, [
          y[0] || (y[0] = e("pattern", {
            id: "map-scene-minor-grid",
            width: "20",
            height: "20",
            patternUnits: "userSpaceOnUse"
          }, [e("path", {
            d: "M20 0H0V20",
            fill: "none",
            stroke: "rgba(102, 181, 231, .08)",
            "stroke-width": "1"
          })], -1)),
          y[1] || (y[1] = e("pattern", {
            id: "map-scene-major-grid",
            width: "100",
            height: "100",
            patternUnits: "userSpaceOnUse"
          }, [e("rect", {
            width: "100",
            height: "100",
            fill: "url(#map-scene-minor-grid)"
          }), e("path", {
            d: "M100 0H0V100",
            fill: "none",
            stroke: "rgba(102, 181, 231, .15)",
            "stroke-width": "1.4"
          })], -1)),
          (u(!0), d(Y, null, Q(S(f), (s) => (u(), d("pattern", {
            id: `${i}-material-${s}`,
            key: s,
            width: "24",
            height: "24",
            patternUnits: "userSpaceOnUse",
            class: G(`map-material-pattern is-${s}`)
          }, [
            e("rect", {
              width: "24",
              height: "24",
              fill: S(Oe)[s]
            }, null, 8, Xt),
            s === "wood" ? (u(), d("path", Ft)) : s === "stone" ? (u(), d("path", qt)) : s === "tile" || s === "marble" ? (u(), d("path", Wt)) : s === "water" ? (u(), d("path", Qt)) : s === "grass" ? (u(), d("path", Zt)) : s === "dirt" ? (u(), d("path", Jt)) : s === "sand" ? (u(), d("circle", ea)) : I("", !0),
            s === "sand" ? (u(), d("circle", ta)) : s === "snow" ? (u(), d("path", aa)) : s === "metal" ? (u(), d("path", na)) : I("", !0),
            s === "metal" ? (u(), d("circle", sa)) : I("", !0),
            s === "metal" ? (u(), d("circle", ra)) : s === "fabric" || s === "carpet" || s === "bed-sheet" || s === "tatami" ? (u(), d("path", la)) : s === "blood" ? (u(), d("path", ia)) : s === "rune" ? (u(), d("path", oa)) : s === "warm-light" || s === "cold-light" || s === "shadow" ? (u(), d("path", ua)) : I("", !0)
          ], 10, Vt))), 128)),
          y[2] || (y[2] = e("filter", {
            id: "map-scene-icon-glow",
            x: "-80%",
            y: "-80%",
            width: "260%",
            height: "260%"
          }, [e("feGaussianBlur", {
            stdDeviation: "2.5",
            result: "blur"
          }), e("feMerge", null, [e("feMergeNode", { in: "blur" }), e("feMergeNode", { in: "SourceGraphic" })])], -1))
        ]),
        e("rect", {
          x: a.scene.viewBox[0],
          y: a.scene.viewBox[1],
          width: a.scene.viewBox[2],
          height: a.scene.viewBox[3],
          fill: "var(--map-canvas-bg)"
        }, null, 8, ca),
        e("rect", {
          x: a.scene.viewBox[0],
          y: a.scene.viewBox[1],
          width: a.scene.viewBox[2],
          height: a.scene.viewBox[3],
          fill: "url(#map-scene-major-grid)"
        }, null, 8, da),
        e("ellipse", {
          cx: a.scene.viewBox[0] + a.scene.viewBox[2] / 2,
          cy: a.scene.viewBox[1] + a.scene.viewBox[3] / 2,
          rx: a.scene.viewBox[2] * 0.42,
          ry: a.scene.viewBox[3] * 0.42,
          fill: "var(--map-canvas-glow)"
        }, null, 8, va),
        (u(!0), d(Y, null, Q(k.value, (s) => (u(), d("g", {
          key: s.id,
          class: G(["map-scene-element", [`is-${s.category}`, `is-${s.certainty || "confirmed"}`]]),
          opacity: S(R)(s, i).opacity
        }, [s.shape === "rect" ? (u(), d("rect", {
          key: 0,
          x: g(s).x,
          y: g(s).y,
          width: g(s).width,
          height: g(s).height,
          fill: S(R)(s, i).fill,
          stroke: S(R)(s, i).stroke,
          "stroke-width": S(R)(s, i).width,
          "stroke-dasharray": S(R)(s, i).dash,
          "vector-effect": "non-scaling-stroke"
        }, null, 8, ya)) : s.shape === "circle" ? (u(), d("circle", {
          key: 1,
          cx: M(s).x,
          cy: M(s).y,
          r: M(s).radius,
          fill: S(R)(s, i).fill,
          stroke: S(R)(s, i).stroke,
          "stroke-width": S(R)(s, i).width,
          "stroke-dasharray": S(R)(s, i).dash,
          "vector-effect": "non-scaling-stroke"
        }, null, 8, fa)) : s.shape === "path" || s.shape === "curve" ? (u(), d("path", {
          key: 2,
          d: S(pt)(s),
          fill: S(R)(s, i).fill,
          stroke: S(R)(s, i).stroke,
          "stroke-width": S(R)(s, i).width,
          "stroke-dasharray": S(R)(s, i).dash,
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "fill-rule": "evenodd",
          "vector-effect": "non-scaling-stroke"
        }, null, 8, ha)) : s.shape === "icon" ? (u(), d("g", {
          key: 3,
          class: "map-scene-icon",
          transform: `translate(${x(s).x} ${x(s).y})`
        }, [e("circle", {
          r: "11",
          stroke: S(R)(s, i).stroke
        }, null, 8, ba), a.symbolsReady ? (u(), d("text", ga, h(S(R)(s, i).icon), 1)) : (u(), d("text", wa, h(S(R)(s, i).fallback), 1))], 8, ma)) : s.shape === "label" ? (u(), d("text", {
          key: 4,
          class: "map-scene-label is-primary",
          x: x(s).x,
          y: x(s).y
        }, h(s.label || ""), 9, ka)) : I("", !0), s.label && s.shape !== "label" ? (u(), d("text", {
          key: 5,
          class: "map-scene-label",
          x: S(_e)(s)[0],
          y: S(_e)(s)[1]
        }, h(s.label), 9, xa)) : I("", !0)], 10, pa))), 128))
      ]),
      _: 1
    }, 8, [
      "style",
      "view-box",
      "reset-key",
      "label"
    ]));
  }
}), _a = Ma, $a = {
  class: "map-settings",
  "aria-labelledby": "map-settings-title"
}, Sa = { class: "map-settings-body" }, Aa = { class: "map-settings-card" }, Ba = { class: "map-setting-row" }, Ea = [
  "aria-checked",
  "aria-label",
  "disabled"
], Oa = { class: "map-settings-card" }, Ca = ["disabled", "title"], Ia = { class: "map-settings-card is-danger-zone" }, Ta = { class: "map-settings-action-copy" }, Ra = ["disabled", "title"], La = {
  key: 0,
  class: "map-disabled-reason",
  role: "status"
}, Ka = {
  key: 1,
  class: "map-maintenance-message",
  role: "status"
}, Pa = /* @__PURE__ */ te({
  __name: "MapSettings",
  props: {
    autoMaintenance: { type: Boolean },
    busy: { type: Boolean },
    autoToggleBusy: { type: Boolean },
    disabledReason: {},
    hasMap: { type: Boolean },
    maintenanceStatus: {},
    maintenanceMessage: {}
  },
  emits: [
    "close",
    "setAutoMaintenance",
    "maintainOnce",
    "requestRebuild"
  ],
  setup(a) {
    return (r, o) => (u(), d("aside", $a, [e("header", null, [o[4] || (o[4] = e("div", null, [e("span", null, "MAP SYSTEM / CONFIG"), e("h2", { id: "map-settings-title" }, "地图设置")], -1)), e("button", {
      type: "button",
      class: "map-icon-button",
      "aria-label": "关闭地图设置",
      onClick: o[0] || (o[0] = (i) => r.$emit("close"))
    }, "×")]), e("div", Sa, [
      e("section", Aa, [e("div", Ba, [o[6] || (o[6] = e("div", null, [e("h3", null, "所有普通聊天自动维护"), e("p", null, "每次发送新的 User 消息后，让地图维护刚被接受的上一轮空间事实。")], -1)), e("button", {
        type: "button",
        class: "map-switch",
        role: "switch",
        "aria-checked": a.autoMaintenance,
        "aria-label": a.autoMaintenance ? "关闭所有普通聊天自动维护" : "开启所有普通聊天自动维护",
        disabled: a.autoToggleBusy,
        onClick: o[1] || (o[1] = (i) => r.$emit("setAutoMaintenance", !a.autoMaintenance))
      }, [...o[5] || (o[5] = [e("span", null, null, -1)])], 8, Ea)]), o[7] || (o[7] = e("div", { class: "map-cost-note" }, [e("strong", null, "API 成本说明"), e("p", null, "自动维护和下方两个手动操作都会调用已配置的 AI 模型，消耗 token / API 额度。切换此开关本身只保存设置，不会立即调用 AI。")], -1))]),
      e("section", Oa, [o[8] || (o[8] = e("div", { class: "map-settings-action-copy" }, [e("h3", null, "增量维护"), e("p", null, "读取聊天尾部最新完整的 User 与 Assistant 对话，补充地点、路线、人物位置和场景细节。")], -1)), e("button", {
        type: "button",
        class: "map-action-button",
        disabled: a.busy || !!a.disabledReason || !a.hasMap,
        title: a.hasMap ? a.disabledReason : "请先从当前聊天建立地图",
        onClick: o[2] || (o[2] = (i) => r.$emit("maintainOnce"))
      }, h(a.maintenanceStatus === "maintaining" ? "正在维护…" : "维护一次"), 9, Ca)]),
      e("section", Ia, [e("div", Ta, [e("h3", null, h(a.hasMap ? "重建地图" : "建立地图"), 1), o[9] || (o[9] = e("p", null, "重新读取当前聊天并生成完整地图。已有地图会在保存成功后被新结果替换。", -1))]), e("button", {
        type: "button",
        class: "map-action-button is-strong",
        disabled: a.busy || !!a.disabledReason,
        title: a.disabledReason,
        onClick: o[3] || (o[3] = (i) => r.$emit("requestRebuild"))
      }, h(a.maintenanceStatus === "rebuilding" ? "正在重建…" : "从当前聊天建立/重建地图"), 9, Ra)]),
      a.disabledReason ? (u(), d("p", La, h(a.disabledReason), 1)) : I("", !0),
      a.maintenanceMessage ? (u(), d("p", Ka, h(a.maintenanceMessage), 1)) : I("", !0)
    ])]));
  }
}), Na = Pa, za = { class: "map-app" }, ja = { class: "map-header" }, Ya = { class: "map-header-actions" }, Da = ["disabled"], Ua = { class: "map-command-bar" }, Ga = {
  class: "map-tabs",
  "aria-label": "地图视图"
}, Ha = {
  key: 0,
  class: "map-location-select"
}, Va = ["disabled"], Xa = {
  key: 0,
  value: ""
}, Fa = ["value"], qa = {
  key: 1,
  class: "map-atlas-summary",
  "aria-label": "世界地图统计"
}, Wa = { class: "map-notice-code" }, Qa = { key: 0 }, Za = ["disabled"], Ja = ["disabled"], en = ["disabled"], tn = {
  key: 0,
  class: "map-empty-state"
}, an = ["disabled"], nn = {
  key: 1,
  class: "map-empty-state"
}, sn = ["disabled"], rn = {
  key: 2,
  class: "map-empty-state"
}, ln = ["disabled"], on = { class: "map-canvas-heading" }, un = {
  class: "map-legend is-scene",
  "aria-label": "场景地图图例"
}, cn = {
  key: 0,
  class: "map-location-brief"
}, dn = {
  key: 0,
  class: "map-empty-state"
}, vn = ["disabled"], pn = { class: "map-canvas-heading is-atlas" }, yn = { key: 0 }, fn = {
  key: 2,
  class: "map-loading-scrim",
  role: "status"
}, hn = {
  class: "map-dialog",
  role: "alertdialog",
  "aria-modal": "true",
  "aria-labelledby": "map-rebuild-title"
}, mn = { id: "map-rebuild-title" }, bn = {
  key: 0,
  class: "map-dialog-error",
  role: "alert"
}, gn = ["disabled"], wn = ["disabled", "title"], Se = 35e3, kn = 18e4, xn = 24e4, Mn = "Xiaobai Map Symbols", _n = /* @__PURE__ */ te({
  __name: "MapApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(a) {
    let r = null;
    const o = a;
    function i() {
      if (!r) {
        const c = [
          "..",
          "..",
          "..",
          "libs",
          "material-symbols",
          "material-symbols-rounded.woff2"
        ].join("/"), t = new URL(c, import.meta.url).href;
        r = new FontFace(Mn, `url("${t}")`, {
          display: "block",
          style: "normal",
          weight: "400"
        }).load().catch((m) => {
          throw r = null, m;
        });
      }
      return r;
    }
    function f() {
      return {
        chatIdentity: "",
        map: null,
        writeState: "ready",
        status: "error",
        message: "地图状态未能载入。",
        autoMaintenance: !1,
        maintenanceStatus: "idle",
        maintenanceMessage: ""
      };
    }
    function k(c) {
      return !c || typeof c != "object" ? f() : structuredClone(qe(c));
    }
    function $(c) {
      const t = c.map;
      if (!t) return "";
      const m = new Map(t.atlas.locations.map((K) => [K.key, K]));
      let T = m.get(t.atlas.actors.find((K) => K.actorKey === "player")?.locationKey || "");
      const z = /* @__PURE__ */ new Set();
      for (; T && !z.has(T.key); ) {
        if (z.add(T.key), T.sceneKey && t.scenes[T.sceneKey]) return T.key;
        T = T.parent ? m.get(T.parent) : void 0;
      }
      return t.atlas.locations.find((K) => K.sceneKey && t.scenes[K.sceneKey])?.key || "";
    }
    const n = j(k(o.initialState)), g = j("scene"), M = j($(n.value)), x = j(!1), A = j(!1), y = j(null), s = j(""), l = j(""), O = j(!1);
    let H = () => {
    }, D = 0, F = 0, P = !1;
    const p = E(() => {
      const c = n.value.map;
      return c ? c.atlas.locations.filter((t) => t.sceneKey && c.scenes[t.sceneKey]) : [];
    }), v = E(() => n.value.map?.atlas.actors.find((c) => c.actorKey === "player") || null), b = E(() => n.value.map?.atlas.locations.find((c) => c.key === v.value?.locationKey) || null), _ = E(() => n.value.map?.atlas.locations.find((c) => c.key === M.value) || null), w = E(() => {
      const c = _.value?.sceneKey;
      return c && n.value.map?.scenes[c] || null;
    }), L = E(() => {
      const c = n.value.map;
      let t = _.value;
      if (!c || !t) return "";
      const m = new Map(c.atlas.locations.map((K) => [K.key, K])), T = [], z = /* @__PURE__ */ new Set();
      for (; t && !z.has(t.key); )
        z.add(t.key), T.unshift(t.name), t = t.parent && m.get(t.parent) || null;
      return T.join(" / ");
    }), N = E(() => n.value.status === "loading" || n.value.status === "saving" || n.value.maintenanceStatus === "maintaining" || n.value.maintenanceStatus === "rebuilding"), C = E(() => y.value !== null || N.value), V = E(() => n.value.status === "unconfirmed" || n.value.writeState === "unconfirmed"), ee = E(() => C.value || V.value), U = E(() => y.value ? "正在处理上一项地图操作" : n.value.maintenanceStatus === "maintaining" ? "地图正在维护，请等待本次维护完成" : n.value.maintenanceStatus === "rebuilding" ? "地图正在重建，请等待本次重建完成" : n.value.status === "loading" ? "地图状态正在载入" : n.value.status === "saving" ? "地图正在保存" : V.value ? "请先核实上一次保存结果" : n.value.status === "conflict" ? "地图版本发生冲突，请先采用服务端数据" : n.value.status === "blocked" ? n.value.message || "当前地图不可维护" : n.value.status === "error" ? n.value.message || "地图状态异常，请先重新读取" : n.value.chatIdentity ? "" : "当前聊天不可用"), Re = Object.freeze({
      ready: "地图就绪",
      loading: "正在载入",
      saving: "正在保存",
      unconfirmed: "保存待核实",
      conflict: "版本冲突",
      blocked: "暂时不可用",
      error: "状态异常"
    }), ye = E(() => n.value.maintenanceStatus === "maintaining" ? "正在维护地图" : n.value.maintenanceStatus === "rebuilding" ? "正在重建地图" : y.value === "refresh" ? "正在重新读取" : y.value === "settings" ? "正在保存设置" : y.value === "confirm" ? "正在核实保存" : y.value === "adopt" ? "正在采用服务端数据" : y.value === "maintain" ? "正在维护地图" : y.value === "rebuild" ? "正在重建地图" : Re[n.value.status]), fe = E(() => !!(s.value || n.value.message || n.value.maintenanceMessage || l.value) || C.value || n.value.status !== "ready" || n.value.maintenanceStatus === "error"), ae = E(() => s.value || [
      "error",
      "blocked",
      "conflict"
    ].includes(n.value.status) || n.value.maintenanceStatus === "error" ? "danger" : V.value ? "warning" : C.value ? "busy" : "info"), Le = E(() => V.value ? "保存结果尚未确认" : n.value.status === "conflict" ? "地图版本发生冲突" : n.value.maintenanceStatus === "error" ? "地图维护未完成" : s.value || n.value.status === "error" ? "地图操作未完成" : n.value.status === "blocked" ? "地图暂时不可用" : ye.value), he = E(() => s.value || n.value.maintenanceMessage || n.value.message || l.value), Ke = E(() => Ce[w.value?.mood || "neutral"]), re = E(() => ({
      locations: n.value.map?.atlas.locations.length || 0,
      routes: n.value.map?.atlas.links.length || 0,
      actors: n.value.map?.atlas.actors.length || 0
    }));
    function q(c) {
      return c !== null && typeof c == "object" && !Array.isArray(c);
    }
    function Pe(c) {
      if (!q(c)) return null;
      const t = c.result, m = q(t) && q(t.state) ? t.state : t;
      return q(m) && typeof m.chatIdentity == "string" && typeof m.status == "string" ? m : null;
    }
    function Ne(c, t) {
      const m = c.map;
      if (m) {
        const T = m.atlas.locations.find((z) => z.key === t);
        if (T?.sceneKey && m.scenes[T.sceneKey]) return t;
      }
      return $(c);
    }
    function me(c) {
      const t = structuredClone(c);
      M.value = Ne(t, t.chatIdentity === n.value.chatIdentity ? M.value : ""), n.value = t, s.value = "", l.value = "";
    }
    function ze(c, t) {
      const m = c instanceof Error ? c.message : String(c);
      return m.includes("聊天已切换") ? "聊天已切换，请重新打开地图。" : m.includes("map_revision_conflict") ? "地图已被另一项操作更新，请重新读取后再试。" : m === "host_request_timeout" ? t === "maintain" || t === "rebuild" ? "等待 AI 处理超时；后台结果仍可能稍后送达，请勿立即重复操作。" : "等待地图服务响应超时，请稍后重试。" : m.includes("已有") && m.includes("维护") ? "已有地图维护正在进行，请等待完成。" : t === "settings" ? "自动维护设置未能保存，请重试。" : t === "refresh" ? "地图状态未能重新读取，请稍后重试。" : t === "confirm" ? "保存结果仍无法确认，请稍后再次核实。" : t === "adopt" ? "暂时无法采用服务端数据，冲突仍保持冻结。" : t === "rebuild" ? "地图建立/重建未完成，请检查模型配置后重试。" : "地图维护未完成，请检查模型配置后重试。";
    }
    async function Z(c, t, m = Se, T = {}) {
      if (y.value) return null;
      const z = ++D, K = F, ie = n.value.chatIdentity;
      y.value = t, s.value = "", l.value = "";
      try {
        const ne = await o.bridge.request(c, {
          chatIdentity: ie,
          ...T
        }, m);
        if (!P || z !== D || n.value.chatIdentity !== ie) return null;
        const we = F !== K, ke = Pe(ne);
        let xe = !1;
        return !we && ke?.chatIdentity === ie && (me(ke), xe = !0), {
          response: ne,
          stateApplied: xe,
          newerStateReceived: we
        };
      } catch (ne) {
        return P && z === D && (s.value = ze(ne, t)), null;
      } finally {
        P && z === D && (y.value = null);
      }
    }
    async function be() {
      ee.value || await Z("map/refresh", "refresh") && (l.value = "已读取当前聊天的最新地图状态。");
    }
    async function je() {
      C.value || await Z("map/confirm-save", "confirm") && (l.value = "保存结果已重新核实。");
    }
    async function Ye() {
      if (C.value) return;
      const c = await Z("map/adopt-server-state", "adopt");
      if (!c) return;
      const t = q(c.response) ? c.response.result : null;
      l.value = (q(t) ? t.adoption : "") === "adopted" ? "已采用服务端数据，可以继续维护地图。" : "服务端数据仍无法采用，地图继续保持冻结。";
    }
    function ge(c) {
      const t = q(c.response) ? c.response.result : null;
      return q(t) && typeof t.message == "string" ? t.message : "地图操作已结束。";
    }
    async function De(c) {
      if (y.value) return;
      const t = await Z("map/set-auto-maintenance", "settings", Se, { enabled: c });
      t && (!t.stateApplied && !t.newerStateReceived && (n.value = {
        ...n.value,
        autoMaintenance: c
      }), l.value = c ? "普通聊天自动维护已开启。" : "普通聊天自动维护已关闭。");
    }
    async function Ue() {
      if (U.value || !n.value.map) return;
      const c = await Z("map/maintain-once", "maintain", kn);
      c && (l.value = ge(c));
    }
    function le() {
      U.value || (A.value = !0);
    }
    async function Ge() {
      if (U.value) return;
      const c = await Z("map/rebuild", "rebuild", xn);
      c && (A.value = !1, l.value = ge(c));
    }
    function He(c) {
      const t = n.value.map?.atlas.locations.find((m) => m.key === c);
      !t?.sceneKey || !n.value.map?.scenes[t.sceneKey] || (M.value = c, g.value = "scene");
    }
    function Ve(c) {
      return c.key === b.value?.key ? `${c.name}（当前位置）` : c.name;
    }
    return Ze(() => {
      P = !0, H = o.bridge.subscribe((c) => {
        if (c.type === "map/state") {
          const t = c.payload?.state;
          t && (F += 1, me(t));
        }
        c.type === "map/error" && (F += 1, l.value = "", s.value = c.payload?.message || "地图服务报告了一个错误，请重新读取。");
      }), typeof FontFace == "function" && document.fonts?.add && i().then((c) => {
        document.fonts.add(c), P && (O.value = !0);
      }).catch(() => {
        O.value = !1;
      });
    }), Be(() => {
      P = !1, D += 1, H(), A.value = !1;
    }), (c, t) => (u(), d("main", za, [
      e("header", ja, [t[12] || (t[12] = e("div", { class: "map-brand" }, [e("span", {
        class: "map-brand-mark",
        "aria-hidden": "true"
      }, [
        e("i"),
        e("i"),
        e("i")
      ]), e("div", null, [e("small", null, "XIAOBAI CARTOGRAPHY / 01"), e("h1", null, "地图")])], -1)), e("div", Ya, [
        e("span", { class: G(["map-status-chip", `is-${ae.value}`]) }, [t[9] || (t[9] = e("i", null, null, -1)), X(h(ye.value), 1)], 2),
        e("button", {
          type: "button",
          class: "map-icon-button",
          disabled: ee.value,
          title: "重新读取地图",
          "aria-label": "重新读取地图",
          onClick: be
        }, [...t[10] || (t[10] = [e("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [e("path", { d: "M20 7v5h-5M4 17v-5h5M18.2 9A7 7 0 0 0 6.1 6.7L4 9m16 6-2.1 2.3A7 7 0 0 1 5.8 15" })], -1)])], 8, Da),
        e("button", {
          type: "button",
          class: G(["map-icon-button", { "is-active": x.value }]),
          title: "地图设置",
          "aria-label": "地图设置",
          onClick: t[0] || (t[0] = (m) => x.value = !x.value)
        }, [...t[11] || (t[11] = [e("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [e("path", { d: "M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM19 13.5l2-1.5-2-1.5-.5-1.3.4-2.5-2.5-.4L15 4l-2 1h-2L9 4 7.6 6.3l-2.5.4.4 2.5L5 10.5 3 12l2 1.5.5 1.3-.4 2.5 2.5.4L9 20l2-1h2l2 1 1.4-2.3 2.5-.4-.4-2.5z" })], -1)])], 2)
      ])]),
      e("div", Ua, [e("nav", Ga, [e("button", {
        type: "button",
        class: G({ "is-active": g.value === "scene" }),
        onClick: t[1] || (t[1] = (m) => g.value = "scene")
      }, "场景", 2), e("button", {
        type: "button",
        class: G({ "is-active": g.value === "atlas" }),
        onClick: t[2] || (t[2] = (m) => g.value = "atlas")
      }, "世界", 2)]), g.value === "scene" ? (u(), d("label", Ha, [t[13] || (t[13] = e("span", null, "观察地点", -1)), Fe(e("select", {
        "onUpdate:modelValue": t[3] || (t[3] = (m) => M.value = m),
        disabled: p.value.length === 0
      }, [p.value.length === 0 ? (u(), d("option", Xa, "暂无可查看场景")) : I("", !0), (u(!0), d(Y, null, Q(p.value, (m) => (u(), d("option", {
        key: m.key,
        value: m.key
      }, h(Ve(m)), 9, Fa))), 128))], 8, Va), [[Je, M.value]])])) : (u(), d("div", qa, [
        e("span", null, h(re.value.locations) + " 地点", 1),
        t[14] || (t[14] = e("i", null, null, -1)),
        e("span", null, h(re.value.routes) + " 路线", 1),
        t[15] || (t[15] = e("i", null, null, -1)),
        e("span", null, h(re.value.actors) + " 人物", 1)
      ]))]),
      fe.value ? (u(), d("aside", {
        key: 0,
        class: G(["map-notice", `is-${ae.value}`]),
        role: "status"
      }, [
        e("span", Wa, h(ae.value === "danger" ? "!" : ae.value === "warning" ? "?" : "i"), 1),
        e("div", null, [e("strong", null, h(Le.value), 1), he.value ? (u(), d("p", Qa, h(he.value), 1)) : I("", !0)]),
        V.value ? (u(), d("button", {
          key: 0,
          type: "button",
          disabled: C.value,
          onClick: je
        }, h(y.value === "confirm" ? "正在核实…" : "确认保存结果"), 9, Za)) : n.value.status === "conflict" ? (u(), d("button", {
          key: 1,
          type: "button",
          disabled: C.value,
          onClick: Ye
        }, h(y.value === "adopt" ? "正在采用…" : "采用服务端数据"), 9, Ja)) : n.value.status === "blocked" || n.value.status === "error" || s.value ? (u(), d("button", {
          key: 2,
          type: "button",
          disabled: ee.value,
          onClick: be
        }, h(y.value === "refresh" ? "正在读取…" : "重新读取"), 9, en)) : I("", !0)
      ], 2)) : I("", !0),
      e("section", { class: G(["map-workspace", { "has-notice": fe.value }]) }, [g.value === "scene" ? (u(), d(Y, { key: 0 }, [n.value.map ? w.value ? w.value.status === "uninitialized" ? (u(), d("div", rn, [
        t[24] || (t[24] = e("span", {
          class: "map-empty-radar",
          "aria-hidden": "true"
        }, [e("i")], -1)),
        t[25] || (t[25] = e("small", null, "SCENE PENDING", -1)),
        e("h2", null, h(w.value.name) + " 尚未绘制", 1),
        t[26] || (t[26] = e("p", null, "地点已记录，场景几何仍待地图维护补全。", -1)),
        e("button", {
          type: "button",
          disabled: !!U.value,
          onClick: t[5] || (t[5] = (m) => x.value = !0)
        }, "打开维护设置", 8, ln)
      ])) : (u(), d(Y, { key: 3 }, [
        oe(_a, {
          scene: w.value,
          "symbols-ready": O.value
        }, null, 8, ["scene", "symbols-ready"]),
        e("div", on, [
          e("small", null, h(L.value || w.value.name), 1),
          e("h2", null, h(w.value.name), 1),
          e("span", null, [e("i", { style: Ae({ background: Ke.value.accent }) }, null, 4), X(h(w.value.mood || "neutral"), 1)])
        ]),
        e("aside", un, [
          t[32] || (t[32] = e("strong", null, "图例", -1)),
          e("span", null, [t[27] || (t[27] = e("i", { class: "is-wall" }, null, -1)), X(h(S(J).wall), 1)]),
          e("span", null, [t[28] || (t[28] = e("i", { class: "is-road" }, null, -1)), X(h(S(J).road), 1)]),
          e("span", null, [t[29] || (t[29] = e("i", { class: "is-water" }, null, -1)), X(h(S(J).water), 1)]),
          e("span", null, [t[30] || (t[30] = e("i", { class: "is-danger" }, null, -1)), X(h(S(J).danger), 1)]),
          e("span", null, [t[31] || (t[31] = e("i", { class: "is-actor" }, null, -1)), X(h(S(J).actor), 1)]),
          t[33] || (t[33] = e("span", null, [e("i", { class: "is-inferred" }), X("推断")], -1))
        ]),
        _.value?.brief ? (u(), d("div", cn, h(_.value.brief), 1)) : I("", !0)
      ], 64)) : (u(), d("div", nn, [
        t[20] || (t[20] = e("span", {
          class: "map-empty-radar",
          "aria-hidden": "true"
        }, [e("i")], -1)),
        t[21] || (t[21] = e("small", null, "SCENE NOT AVAILABLE", -1)),
        t[22] || (t[22] = e("h2", null, "暂无可绘制的场景", -1)),
        t[23] || (t[23] = e("p", null, "世界地点已经存在，但还没有地点具备场景图。可维护一次地图来补充。", -1)),
        e("button", {
          type: "button",
          disabled: !!U.value,
          onClick: t[4] || (t[4] = (m) => x.value = !0)
        }, "打开维护设置", 8, sn)
      ])) : (u(), d("div", tn, [
        t[16] || (t[16] = e("span", {
          class: "map-empty-radar",
          "aria-hidden": "true"
        }, [e("i")], -1)),
        t[17] || (t[17] = e("small", null, "NO CARTOGRAPHIC DATA", -1)),
        t[18] || (t[18] = e("h2", null, "当前聊天还没有地图", -1)),
        t[19] || (t[19] = e("p", null, "从当前聊天中识别地点、路线与场景。只有确认后才会开始调用 AI。", -1)),
        e("button", {
          type: "button",
          disabled: !!U.value,
          onClick: le
        }, "从当前聊天建立地图", 8, an)
      ]))], 64)) : (u(), d(Y, { key: 1 }, [!n.value.map || n.value.map.atlas.locations.length === 0 ? (u(), d("div", dn, [
        t[34] || (t[34] = e("span", {
          class: "map-empty-radar",
          "aria-hidden": "true"
        }, [e("i")], -1)),
        t[35] || (t[35] = e("small", null, "ATLAS IS EMPTY", -1)),
        t[36] || (t[36] = e("h2", null, "世界地图尚未建立", -1)),
        t[37] || (t[37] = e("p", null, "建立地图后，这里会显示地点层级、通行路线和人物所在位置。", -1)),
        e("button", {
          type: "button",
          disabled: !!U.value,
          onClick: le
        }, "从当前聊天建立地图", 8, vn)
      ])) : (u(), d(Y, { key: 1 }, [
        oe(Gt, {
          atlas: n.value.map.atlas,
          revision: n.value.map.revision,
          "current-location-key": b.value?.key || "",
          "selected-location-key": M.value,
          "symbols-ready": O.value,
          onViewScene: He
        }, null, 8, [
          "atlas",
          "revision",
          "current-location-key",
          "selected-location-key",
          "symbols-ready"
        ]),
        e("div", pn, [
          t[39] || (t[39] = e("small", null, "DETERMINISTIC WORLD GRAPH", -1)),
          t[40] || (t[40] = e("h2", null, "地点网络", -1)),
          b.value ? (u(), d("span", yn, [t[38] || (t[38] = e("i", null, null, -1)), X("当前位置 · " + h(b.value.name), 1)])) : I("", !0)
        ]),
        t[41] || (t[41] = Qe('<aside class="map-legend is-atlas" aria-label="世界地图图例"><strong>图例</strong><span><i class="is-current"></i>当前位置</span><span><i class="is-visited"></i>已到访</span><span><i class="is-route"></i>通行路线</span><span><i class="is-hierarchy"></i>隶属层级</span><small>点击有场景的地点可查看</small></aside>', 1))
      ], 64))], 64)), n.value.status === "loading" ? (u(), d("div", fn, [...t[42] || (t[42] = [e("span", null, null, -1), e("p", null, "正在校准地图坐标", -1)])])) : I("", !0)], 2),
      oe(et, { name: "map-panel" }, {
        default: de(() => [x.value ? (u(), ve(Na, {
          key: 0,
          "auto-maintenance": n.value.autoMaintenance,
          busy: C.value,
          "auto-toggle-busy": y.value !== null,
          "disabled-reason": U.value,
          "has-map": !!n.value.map,
          "maintenance-status": n.value.maintenanceStatus || "idle",
          "maintenance-message": n.value.maintenanceMessage || "",
          onClose: t[6] || (t[6] = (m) => x.value = !1),
          onSetAutoMaintenance: De,
          onMaintainOnce: Ue,
          onRequestRebuild: le
        }, null, 8, [
          "auto-maintenance",
          "busy",
          "auto-toggle-busy",
          "disabled-reason",
          "has-map",
          "maintenance-status",
          "maintenance-message"
        ])) : I("", !0)]),
        _: 1
      }),
      A.value ? (u(), d("div", {
        key: 1,
        class: "map-dialog-backdrop",
        onClick: t[8] || (t[8] = pe((m) => !C.value && (A.value = !1), ["self"]))
      }, [e("section", hn, [
        t[43] || (t[43] = e("small", null, "AI CARTOGRAPHY REQUEST", -1)),
        e("h2", mn, h(n.value.map ? "从当前聊天重建地图？" : "从当前聊天建立地图？"), 1),
        e("p", null, "此操作会调用已配置的 AI 模型并消耗 token / API 额度。" + h(n.value.map ? "现有地图将在新地图成功保存后被替换。" : "模型会读取当前聊天并生成第一版地图。"), 1),
        s.value ? (u(), d("p", bn, h(s.value), 1)) : I("", !0),
        e("div", null, [e("button", {
          type: "button",
          disabled: C.value,
          onClick: t[7] || (t[7] = (m) => A.value = !1)
        }, "取消", 8, gn), e("button", {
          type: "button",
          class: "is-confirm",
          disabled: C.value || !!U.value,
          title: U.value,
          onClick: Ge
        }, h(y.value === "rebuild" || n.value.maintenanceStatus === "rebuilding" ? "正在建立地图…" : "确认并开始"), 9, wn)])
      ])])) : I("", !0)
    ]));
  }
}), Tn = _n;
export {
  Tn as default
};
