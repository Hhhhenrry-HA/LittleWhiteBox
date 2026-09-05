/* eslint-disable */
import { A as ce, B as h, E as He, I as Ve, L as S, P as D, R as G, S as Ue, T as W, _ as le, b as _e, c as $e, d as e, f as de, g as U, h as Xe, i as qe, j as Fe, k as We, l as j, m as c, p as C, t as Ze, u as O, v as ee, w as u, z as Se } from "./xiaobai-os-runtime-dom.esm-bundler-DQLnRQQ3.js";
var Qe = { class: "map-viewport" }, Je = ["viewBox", "aria-label"], et = {
  class: "map-viewport-controls",
  "aria-label": "地图缩放控制"
}, tt = /* @__PURE__ */ ee({
  __name: "MapViewport",
  props: {
    viewBox: {},
    resetKey: { default: "" },
    label: {}
  },
  setup(a) {
    const r = a, l = D(null), i = D([...r.viewBox]);
    let y = null, x = [0, 0], $ = [0, 0], n = null, g = !1, _ = !1, M = null;
    const m = O(() => i.value.join(" "));
    function f() {
      const [d, b, k, A] = r.viewBox;
      i.value = [
        d,
        b,
        Math.max(1, k),
        Math.max(1, A)
      ];
    }
    function s() {
      const d = l.value?.getBoundingClientRect();
      return !d?.width || !d.height ? 1 : Math.max(i.value[2] / d.width, i.value[3] / d.height);
    }
    function o(d, b) {
      const k = l.value?.getBoundingClientRect();
      if (!k?.width || !k.height) return [i.value[0] + i.value[2] / 2, i.value[1] + i.value[3] / 2];
      const A = s(), K = i.value[2] / A, L = i.value[3] / A, T = (k.width - K) / 2, F = (k.height - L) / 2;
      return [i.value[0] + (d - k.left - T) * A, i.value[1] + (b - k.top - F) * A];
    }
    function E(d, b) {
      const k = Math.max(1, r.viewBox[2]), A = Math.min(k * 5, Math.max(k * 0.24, i.value[2] * d)), K = A / i.value[2], L = i.value[3] * K, T = b || [i.value[0] + i.value[2] / 2, i.value[1] + i.value[3] / 2], F = (T[0] - i.value[0]) / i.value[2], V = (T[1] - i.value[1]) / i.value[3];
      i.value = [
        T[0] - A * F,
        T[1] - L * V,
        A,
        L
      ];
    }
    function P(d) {
      E(d.deltaY < 0 ? 0.84 : 1.19, o(d.clientX, d.clientY));
    }
    function H(d) {
      d.button !== 0 || y !== null || (y = d.pointerId, x = [d.clientX, d.clientY], $ = [i.value[0], i.value[1]], g = !1, n = d.target instanceof Element ? d.target : l.value, n?.setPointerCapture(d.pointerId));
    }
    function Y(d) {
      if (d.pointerId !== y) return;
      const b = d.clientX - x[0], k = d.clientY - x[1];
      Math.abs(b) + Math.abs(k) > 4 && (g = !0);
      const A = s();
      i.value = [
        $[0] - b * A,
        $[1] - k * A,
        i.value[2],
        i.value[3]
      ];
    }
    function X(d) {
      d.pointerId === y && (n?.hasPointerCapture(d.pointerId) && n.releasePointerCapture(d.pointerId), n = null, y = null, g && (_ = !0, M && clearTimeout(M), M = setTimeout(() => {
        _ = !1;
      }, 0)));
    }
    function p(d) {
      _ && (d.preventDefault(), d.stopPropagation());
    }
    return We(() => [
      r.viewBox[0],
      r.viewBox[1],
      r.viewBox[2],
      r.viewBox[3],
      r.resetKey
    ], f, { immediate: !0 }), _e(() => {
      M && clearTimeout(M);
    }), (d, b) => (u(), c("div", Qe, [(u(), c("svg", {
      ref_key: "svg",
      ref: l,
      class: "map-viewport-svg",
      viewBox: m.value,
      preserveAspectRatio: "xMidYMid meet",
      role: "img",
      "aria-label": a.label,
      onWheel: $e(P, ["prevent"]),
      onPointerdown: H,
      onPointermove: Y,
      onPointerup: X,
      onPointercancel: X,
      onClickCapture: p
    }, [He(d.$slots, "default")], 40, Je)), e("div", et, [
      e("button", {
        type: "button",
        title: "放大",
        "aria-label": "放大",
        onClick: b[0] || (b[0] = (k) => E(0.8))
      }, "+"),
      e("button", {
        type: "button",
        title: "缩小",
        "aria-label": "缩小",
        onClick: b[1] || (b[1] = (k) => E(1.25))
      }, "-"),
      e("button", {
        type: "button",
        class: "map-viewport-reset",
        onClick: f
      }, "复位")
    ])]));
  }
}), Ae = tt, at = Object.freeze({
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
}), st = Object.freeze({
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
}), rt = Object.freeze({
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
}), it = Object.freeze({
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
}), ue = Object.freeze({
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
}), Be = Object.freeze({
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
}), Oe = Object.freeze({
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
}), lt = Object.freeze({
  city: "location_city",
  district: "apartment",
  building: "home_work",
  floor: "stairs",
  room: "meeting_room",
  outdoor: "park"
}), we = Object.freeze({
  city: "城市",
  district: "区域",
  building: "建筑",
  floor: "楼层",
  room: "房间",
  outdoor: "户外"
}), ot = Object.freeze({
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
function q(a, r) {
  return a < r ? -1 : a > r ? 1 : 0;
}
function B(a) {
  return Number(a.toFixed(3)).toString();
}
function Ee(a) {
  const r = a.geometry;
  return Array.isArray(r.points) ? r.points : [];
}
function Ce(a) {
  return a.shape === "rect" || a.shape === "circle" ? !0 : Ee(a).length >= 3 && (a.closed === !0 || ut.has(a.category));
}
function ct(a) {
  const r = Ee(a);
  if (r.length < 2) return "";
  const l = Ce(a) ? " Z" : "";
  if (a.shape === "path") return `M ${r.map(([y, x]) => `${B(y)} ${B(x)}`).join(" L ")}${l}`;
  const i = [`M ${B(r[0][0])} ${B(r[0][1])}`];
  for (let y = 0; y < r.length - 1; y += 1) {
    const x = r[y - 1] || r[y], $ = r[y], n = r[y + 1], g = r[y + 2] || n, _ = $[0] + (n[0] - x[0]) / 6, M = $[1] + (n[1] - x[1]) / 6, m = n[0] - (g[0] - $[0]) / 6, f = n[1] - (g[1] - $[1]) / 6;
    i.push(`C ${B(_)} ${B(M)}, ${B(m)} ${B(f)}, ${B(n[0])} ${B(n[1])}`);
  }
  return i.join(" ") + l;
}
function ke(a) {
  const r = a.geometry;
  if (typeof r.x == "number" && typeof r.y == "number")
    return a.shape === "rect" ? [r.x + (r.width || 0) / 2, r.y + (r.height || 0) / 2] : a.shape === "circle" ? [r.x, r.y - (r.radius || 0) - 8] : [r.x, r.y + (a.shape === "icon" ? 18 : 0)];
  const l = r.points || [];
  if (!l.length) return [0, 0];
  const [i, y] = l.reduce((x, $) => [x[0] + $[0], x[1] + $[1]], [0, 0]);
  return [i / l.length, y / l.length];
}
function R(a, r) {
  const l = at[a.category], i = Ce(a), y = i && a.material ? `url(#${r}-material-${a.material})` : "", x = a.certainty === "inferred" ? "8 6" : a.certainty === "unknown" ? "3 7" : l.dash;
  return {
    ...l,
    fill: i ? y || l.fill || Be[a.material] : "none",
    opacity: a.certainty === "unknown" ? 0.48 : a.certainty === "inferred" ? 0.72 : 1,
    dash: x,
    icon: a.icon ? rt[a.icon] : a.kind ? nt[a.kind] : it[a.category],
    fallback: a.kind ? st[a.kind] : J[a.category].slice(0, 1),
    z: ue[a.category]
  };
}
function dt(a) {
  return [...a].sort((r, l) => ue[r.category] - ue[l.category] || q(r.id, l.id));
}
var ne = 156, vt = 66, xe = 34, pt = 70;
function oe(a) {
  return [...a].sort((r, l) => q(r.parent || "", l.parent || "") || q(r.name, l.name) || q(r.key, l.key));
}
function yt(a) {
  const r = /* @__PURE__ */ new Set();
  return a.forEach((l) => {
    const i = [], y = /* @__PURE__ */ new Map();
    let x = l;
    for (; x?.parent; ) {
      const $ = y.get(x.key);
      if ($ !== void 0) {
        i.slice($).forEach((n) => r.add(n));
        break;
      }
      y.set(x.key, i.length), i.push(x.key), x = a.get(x.parent);
    }
  }), r;
}
function ft(a) {
  return [
    Math.min(...a.map((r) => r[0])),
    Math.min(...a.map((r) => r[1])),
    Math.max(...a.map((r) => r[0])),
    Math.max(...a.map((r) => r[1]))
  ];
}
function ht(a, r, l, i) {
  const y = [r.x + r.width / 2, r.y + r.height / 2], x = [l.x + l.width / 2, l.y + l.height / 2], $ = x[0] - y[0], n = x[1] - y[1], g = Math.abs($) >= Math.abs(n), _ = g ? [$ >= 0 ? r.x + r.width : r.x, y[1]] : [y[0], n >= 0 ? r.y + r.height : r.y], M = g ? [$ >= 0 ? l.x : l.x + l.width, x[1]] : [x[0], n >= 0 ? l.y : l.y + l.height], m = (_[0] + M[0]) / 2, f = (_[1] + M[1]) / 2 + i, s = g ? [[m, _[1] + i], [m, M[1] + i]] : [[_[0] + i, f], [M[0] + i, f]];
  return {
    id: a.id,
    from: a.from,
    to: a.to,
    path: `M ${B(_[0])} ${B(_[1])} C ${B(s[0][0])} ${B(s[0][1])}, ${B(s[1][0])} ${B(s[1][1])}, ${B(M[0])} ${B(M[1])}`,
    labelX: m,
    labelY: f - 7,
    bounds: ft([
      _,
      M,
      s[0],
      s[1],
      [m, f - 7]
    ])
  };
}
function mt(a) {
  const r = oe(a.locations), l = new Map(r.map((p) => [p.key, p])), i = yt(l), y = /* @__PURE__ */ new Map(), x = [];
  r.forEach((p) => {
    const d = p.parent || "";
    if (d && l.has(d) && !i.has(d) && !i.has(p.key)) {
      const b = y.get(d) || [];
      b.push(p), y.set(d, b);
    } else x.push(p);
  }), y.forEach((p, d) => y.set(d, oe(p)));
  const $ = /* @__PURE__ */ new Map(), n = (p) => {
    const d = $.get(p.key);
    if (d !== void 0) return d;
    const b = y.get(p.key) || [], k = b.length ? Math.max(ne, b.reduce((A, K, L) => A + n(K) + (L ? xe : 0), 0)) : ne;
    return $.set(p.key, k), k;
  }, g = [], _ = (p, d, b) => {
    const k = n(p);
    g.push({
      key: p.key,
      x: d + (k - ne) / 2,
      y: b * 158,
      width: ne,
      height: vt,
      depth: b
    });
    let A = d;
    (y.get(p.key) || []).forEach((K) => {
      _(K, A, b + 1), A += n(K) + xe;
    });
  };
  let M = 0;
  oe(x).forEach((p) => {
    _(p, M, 0), M += n(p) + pt;
  });
  const m = new Map(g.map((p) => [p.key, p])), f = r.flatMap((p) => {
    const d = m.get(p.key), b = p.parent ? m.get(p.parent) : void 0;
    if (!d || !b) return [];
    const k = b.x + b.width / 2, A = b.y + b.height, K = d.x + d.width / 2, L = d.y, T = (A + L) / 2;
    return [{
      id: `${b.key}:${d.key}`,
      path: `M ${B(k)} ${B(A)} C ${B(k)} ${B(T)}, ${B(K)} ${B(T)}, ${B(K)} ${B(L)}`
    }];
  }), s = /* @__PURE__ */ new Map(), o = [...a.links].sort((p, d) => q(p.id, d.id)).flatMap((p) => {
    const d = m.get(p.from), b = m.get(p.to);
    if (!d || !b) return [];
    const k = [p.from, p.to].sort(q).join(":"), A = s.get(k) || 0;
    return s.set(k, A + 1), [ht(p, d, b, A === 0 ? 0 : (A % 2 ? 1 : -1) * Math.ceil(A / 2) * 24)];
  });
  if (!g.length) return {
    nodes: g,
    hierarchy: f,
    routes: o,
    viewBox: [
      0,
      0,
      640,
      420
    ]
  };
  const E = o.flatMap((p) => [p.bounds]), P = Math.min(...g.map((p) => p.x), ...E.map((p) => p[0])) - 60, H = Math.min(...g.map((p) => p.y), ...E.map((p) => p[1])) - 60, Y = Math.max(...g.map((p) => p.x + p.width), ...E.map((p) => p[2])) + 60, X = Math.max(...g.map((p) => p.y + p.height), ...E.map((p) => p[3])) + 60;
  return {
    nodes: g,
    hierarchy: f,
    routes: o,
    viewBox: [
      P,
      H,
      Math.max(420, Y - P),
      Math.max(300, X - H)
    ]
  };
}
function bt(a, r) {
  return a.filter((l) => l.locationKey === r).sort((l, i) => q(l.displayName, i.displayName) || q(l.actorKey, i.actorKey));
}
var gt = [
  "x",
  "y",
  "width",
  "height"
], wt = [
  "x",
  "y",
  "width",
  "height"
], kt = {
  class: "map-atlas-hierarchy",
  "aria-hidden": "true"
}, xt = ["d"], Mt = { class: "map-atlas-routes" }, _t = ["d", "marker-start"], $t = ["x", "y"], St = [
  "role",
  "tabindex",
  "aria-label",
  "onClick",
  "onKeydown"
], At = [
  "x",
  "y",
  "width",
  "height"
], Bt = ["d"], Ot = ["cx", "cy"], Et = ["x", "y"], Ct = ["x", "y"], Lt = ["x", "y"], It = ["x", "y"], Rt = {
  key: 2,
  class: "map-atlas-actors"
}, Tt = ["transform"], Kt = {
  key: 0,
  class: "map-material-symbol"
}, Pt = {
  key: 1,
  class: "map-symbol-fallback"
}, Nt = ["x", "y"], zt = ["transform"], jt = /* @__PURE__ */ ee({
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
    const l = a, i = r, y = O(() => mt(l.atlas)), x = O(() => new Map(l.atlas.locations.map((f) => [f.key, f]))), $ = O(() => new Map(l.atlas.links.map((f) => [f.id, f])));
    function n(f) {
      return x.value.get(f.key);
    }
    function g(f) {
      return $.value.get(f);
    }
    function _(f) {
      return bt(l.atlas.actors, f);
    }
    function M(f) {
      f.sceneKey && i("viewScene", f.key);
    }
    function m(f, s) {
      !s.sceneKey || f.key !== "Enter" && f.key !== " " || (f.preventDefault(), M(s));
    }
    return (f, s) => (u(), de(Ae, {
      class: "map-atlas-viewport",
      "view-box": y.value.viewBox,
      "reset-key": String(a.revision),
      label: "世界地点关系图"
    }, {
      default: ce(() => [
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
          x: y.value.viewBox[0],
          y: y.value.viewBox[1],
          width: y.value.viewBox[2],
          height: y.value.viewBox[3],
          class: "map-atlas-background"
        }, null, 8, gt),
        e("rect", {
          x: y.value.viewBox[0],
          y: y.value.viewBox[1],
          width: y.value.viewBox[2],
          height: y.value.viewBox[3],
          fill: "url(#map-atlas-grid)"
        }, null, 8, wt),
        e("g", kt, [(u(!0), c(j, null, W(y.value.hierarchy, (o) => (u(), c("path", {
          key: o.id,
          d: o.path,
          "vector-effect": "non-scaling-stroke"
        }, null, 8, xt))), 128))]),
        e("g", Mt, [(u(!0), c(j, null, W(y.value.routes, (o) => (u(), c("g", { key: o.id }, [e("path", {
          d: o.path,
          "marker-start": g(o.id).bidirectional ? "url(#map-atlas-arrow)" : void 0,
          "marker-end": "url(#map-atlas-arrow)",
          "vector-effect": "non-scaling-stroke"
        }, null, 8, _t), e("text", {
          x: o.labelX,
          y: o.labelY
        }, h(g(o.id).label || S(ot)[g(o.id).kind]), 9, $t)]))), 128))]),
        (u(!0), c(j, null, W(y.value.nodes, (o) => (u(), c("g", {
          key: o.key,
          class: G(["map-atlas-node", {
            "is-current": o.key === a.currentLocationKey,
            "is-selected": o.key === a.selectedLocationKey,
            "is-visited": n(o).status === "visited",
            "is-clickable": !!n(o).sceneKey
          }]),
          role: n(o).sceneKey ? "button" : void 0,
          tabindex: n(o).sceneKey ? 0 : void 0,
          "aria-label": n(o).sceneKey ? `查看 ${n(o).name} 场景` : n(o).name,
          onClick: $e((E) => M(n(o)), ["stop"]),
          onKeydown: (E) => m(E, n(o))
        }, [
          e("rect", {
            x: o.x,
            y: o.y,
            width: o.width,
            height: o.height,
            rx: "9"
          }, null, 8, At),
          e("path", {
            class: "map-atlas-node-cut",
            d: `M ${o.x + o.width - 24} ${o.y} L ${o.x + o.width} ${o.y + 24}`
          }, null, 8, Bt),
          e("circle", {
            cx: o.x + 24,
            cy: o.y + 24,
            r: "13",
            class: "map-atlas-node-icon-ring"
          }, null, 8, Ot),
          a.symbolsReady ? (u(), c("text", {
            key: 0,
            x: o.x + 24,
            y: o.y + 24,
            class: "map-material-symbol"
          }, h(S(lt)[n(o).scale]), 9, Et)) : (u(), c("text", {
            key: 1,
            x: o.x + 24,
            y: o.y + 24,
            class: "map-symbol-fallback"
          }, h(S(we)[n(o).scale].slice(0, 1)), 9, Ct)),
          e("text", {
            x: o.x + 45,
            y: o.y + 23,
            class: "map-atlas-node-name"
          }, h(n(o).name), 9, Lt),
          e("text", {
            x: o.x + 45,
            y: o.y + 42,
            class: "map-atlas-node-meta"
          }, h(S(we)[n(o).scale]) + " · " + h(n(o).status === "visited" ? "已到访" : "仅提及"), 9, It),
          _(o.key).length ? (u(), c("g", Rt, [(u(!0), c(j, null, W(_(o.key).slice(0, 4), (E, P) => (u(), c("g", {
            key: E.actorKey,
            transform: `translate(${o.x + 19 + P * 18} ${o.y + o.height - 2})`,
            class: G({ "is-player": E.actorKey === "player" })
          }, [
            s[0] || (s[0] = e("circle", { r: "7" }, null, -1)),
            a.symbolsReady ? (u(), c("text", Kt, h(E.actorKey === "player" ? "person_pin_circle" : "person"), 1)) : (u(), c("text", Pt, h(E.actorKey === "player" ? "P" : "N"), 1)),
            e("title", null, h(E.displayName), 1)
          ], 10, Tt))), 128)), _(o.key).length > 4 ? (u(), c("text", {
            key: 0,
            x: o.x + 88,
            y: o.y + o.height + 2,
            class: "map-atlas-actor-overflow"
          }, " +" + h(_(o.key).length - 4), 9, Nt)) : C("", !0)])) : C("", !0),
          o.key === a.currentLocationKey ? (u(), c("g", {
            key: 3,
            class: "map-atlas-current-pin",
            transform: `translate(${o.x + o.width - 13} ${o.y + 13})`
          }, [...s[1] || (s[1] = [e("circle", { r: "7" }, null, -1), e("path", { d: "M-3 0l2 2 4-5" }, null, -1)])], 8, zt)) : C("", !0),
          e("title", null, h(n(o).brief || n(o).name), 1)
        ], 42, St))), 128))
      ]),
      _: 1
    }, 8, ["view-box", "reset-key"]));
  }
}), Yt = jt, hn = Object.freeze([
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
]), mn = Object.freeze([
  "rect",
  "circle",
  "path",
  "curve",
  "icon",
  "label"
]), bn = Object.freeze([
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
]), Dt = Object.freeze([
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
]), gn = Object.freeze([
  "confirmed",
  "inferred",
  "unknown"
]), wn = Object.freeze([
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
]), kn = Object.freeze(/* @__PURE__ */ new Set([
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
])), Gt = ["id"], Ht = ["fill"], Vt = {
  key: 0,
  d: "M0 6H24M0 18H24M7 0V6M17 6V18M10 18V24"
}, Ut = {
  key: 1,
  d: "M0 8L7 3l8 3 9-4M2 19l8-5 10 4 4-3"
}, Xt = {
  key: 2,
  d: "M0 8H24M0 16H24M8 0v24m8-24v24"
}, qt = {
  key: 3,
  d: "M-4 6q6-5 12 0t12 0t12 0M-4 17q6-5 12 0t12 0t12 0"
}, Ft = {
  key: 4,
  d: "M4 20l2-7 2 7M13 13l2-8 2 8M19 23l2-6 2 6"
}, Wt = {
  key: 5,
  d: "M3 5h2m8 3h3m3 10h2M7 19h3"
}, Zt = {
  key: 6,
  cx: "6",
  cy: "7",
  r: "1.1"
}, Qt = {
  key: 7,
  cx: "18",
  cy: "16",
  r: "1"
}, Jt = {
  key: 8,
  d: "M12 3v18M4 7l16 10M20 7L4 17"
}, ea = {
  key: 9,
  d: "M0 4h24M0 20h24"
}, ta = {
  key: 10,
  cx: "5",
  cy: "12",
  r: "1.2"
}, aa = {
  key: 11,
  cx: "19",
  cy: "12",
  r: "1.2"
}, na = {
  key: 12,
  d: "M0 4q6 4 12 0t12 0M0 16q6 4 12 0t12 0"
}, sa = {
  key: 13,
  d: "M0 6l7 5 5-8 5 13 7-5M0 22l8-5 6 4 10-8"
}, ra = {
  key: 14,
  d: "M12 2l4 7 6 3-6 4-4 6-4-6-6-4 6-3zM8 9l8 7m0-7l-8 7"
}, ia = {
  key: 15,
  d: "M12 2v20M2 12h20M5 5l14 14M19 5L5 19"
}, la = [
  "x",
  "y",
  "width",
  "height"
], oa = [
  "x",
  "y",
  "width",
  "height"
], ua = [
  "cx",
  "cy",
  "rx",
  "ry"
], ca = ["opacity"], da = [
  "x",
  "y",
  "width",
  "height",
  "fill",
  "stroke",
  "stroke-width",
  "stroke-dasharray"
], va = [
  "cx",
  "cy",
  "r",
  "fill",
  "stroke",
  "stroke-width",
  "stroke-dasharray"
], pa = [
  "d",
  "fill",
  "stroke",
  "stroke-width",
  "stroke-dasharray"
], ya = ["transform"], fa = ["stroke"], ha = {
  key: 0,
  class: "map-material-symbol",
  "aria-hidden": "true"
}, ma = {
  key: 1,
  class: "map-symbol-fallback",
  "aria-hidden": "true"
}, ba = ["x", "y"], ga = ["x", "y"], wa = /* @__PURE__ */ ee({
  __name: "MapScene",
  props: {
    scene: {},
    symbolsReady: { type: Boolean }
  },
  setup(a) {
    let r = 0;
    const l = a, i = `xiaobai-map-scene-${r += 1}`, y = Dt, x = O(() => dt(l.scene.elements)), $ = O(() => Oe[l.scene.mood || "neutral"]), n = O(() => ({
      "--map-canvas-bg": $.value.background,
      "--map-canvas-glow": $.value.glow,
      "--map-canvas-accent": $.value.accent
    }));
    function g(m) {
      return m.geometry;
    }
    function _(m) {
      return m.geometry;
    }
    function M(m) {
      return m.geometry;
    }
    return (m, f) => (u(), de(Ae, {
      class: "map-scene-viewport",
      style: Se(n.value),
      "view-box": a.scene.viewBox,
      "reset-key": a.scene.key,
      label: `${a.scene.name} 场景地图`
    }, {
      default: ce(() => [
        e("defs", null, [
          f[0] || (f[0] = e("pattern", {
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
          f[1] || (f[1] = e("pattern", {
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
          (u(!0), c(j, null, W(S(y), (s) => (u(), c("pattern", {
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
              fill: S(Be)[s]
            }, null, 8, Ht),
            s === "wood" ? (u(), c("path", Vt)) : s === "stone" ? (u(), c("path", Ut)) : s === "tile" || s === "marble" ? (u(), c("path", Xt)) : s === "water" ? (u(), c("path", qt)) : s === "grass" ? (u(), c("path", Ft)) : s === "dirt" ? (u(), c("path", Wt)) : s === "sand" ? (u(), c("circle", Zt)) : C("", !0),
            s === "sand" ? (u(), c("circle", Qt)) : s === "snow" ? (u(), c("path", Jt)) : s === "metal" ? (u(), c("path", ea)) : C("", !0),
            s === "metal" ? (u(), c("circle", ta)) : C("", !0),
            s === "metal" ? (u(), c("circle", aa)) : s === "fabric" || s === "carpet" || s === "bed-sheet" || s === "tatami" ? (u(), c("path", na)) : s === "blood" ? (u(), c("path", sa)) : s === "rune" ? (u(), c("path", ra)) : s === "warm-light" || s === "cold-light" || s === "shadow" ? (u(), c("path", ia)) : C("", !0)
          ], 10, Gt))), 128)),
          f[2] || (f[2] = e("filter", {
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
        }, null, 8, la),
        e("rect", {
          x: a.scene.viewBox[0],
          y: a.scene.viewBox[1],
          width: a.scene.viewBox[2],
          height: a.scene.viewBox[3],
          fill: "url(#map-scene-major-grid)"
        }, null, 8, oa),
        e("ellipse", {
          cx: a.scene.viewBox[0] + a.scene.viewBox[2] / 2,
          cy: a.scene.viewBox[1] + a.scene.viewBox[3] / 2,
          rx: a.scene.viewBox[2] * 0.42,
          ry: a.scene.viewBox[3] * 0.42,
          fill: "var(--map-canvas-glow)"
        }, null, 8, ua),
        (u(!0), c(j, null, W(x.value, (s) => (u(), c("g", {
          key: s.id,
          class: G(["map-scene-element", [`is-${s.category}`, `is-${s.certainty || "confirmed"}`]]),
          opacity: S(R)(s, i).opacity
        }, [s.shape === "rect" ? (u(), c("rect", {
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
        }, null, 8, da)) : s.shape === "circle" ? (u(), c("circle", {
          key: 1,
          cx: _(s).x,
          cy: _(s).y,
          r: _(s).radius,
          fill: S(R)(s, i).fill,
          stroke: S(R)(s, i).stroke,
          "stroke-width": S(R)(s, i).width,
          "stroke-dasharray": S(R)(s, i).dash,
          "vector-effect": "non-scaling-stroke"
        }, null, 8, va)) : s.shape === "path" || s.shape === "curve" ? (u(), c("path", {
          key: 2,
          d: S(ct)(s),
          fill: S(R)(s, i).fill,
          stroke: S(R)(s, i).stroke,
          "stroke-width": S(R)(s, i).width,
          "stroke-dasharray": S(R)(s, i).dash,
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "fill-rule": "evenodd",
          "vector-effect": "non-scaling-stroke"
        }, null, 8, pa)) : s.shape === "icon" ? (u(), c("g", {
          key: 3,
          class: "map-scene-icon",
          transform: `translate(${M(s).x} ${M(s).y})`
        }, [e("circle", {
          r: "11",
          stroke: S(R)(s, i).stroke
        }, null, 8, fa), a.symbolsReady ? (u(), c("text", ha, h(S(R)(s, i).icon), 1)) : (u(), c("text", ma, h(S(R)(s, i).fallback), 1))], 8, ya)) : s.shape === "label" ? (u(), c("text", {
          key: 4,
          class: "map-scene-label is-primary",
          x: M(s).x,
          y: M(s).y
        }, h(s.label || ""), 9, ba)) : C("", !0), s.label && s.shape !== "label" ? (u(), c("text", {
          key: 5,
          class: "map-scene-label",
          x: S(ke)(s)[0],
          y: S(ke)(s)[1]
        }, h(s.label), 9, ga)) : C("", !0)], 10, ca))), 128))
      ]),
      _: 1
    }, 8, [
      "style",
      "view-box",
      "reset-key",
      "label"
    ]));
  }
}), ka = wa, xa = {
  class: "map-settings",
  "aria-labelledby": "map-settings-title"
}, Ma = { class: "map-settings-body" }, _a = { class: "map-settings-card" }, $a = { class: "map-setting-row" }, Sa = [
  "aria-checked",
  "aria-label",
  "disabled"
], Aa = { class: "map-settings-card" }, Ba = ["disabled", "title"], Oa = { class: "map-settings-card is-danger-zone" }, Ea = { class: "map-settings-action-copy" }, Ca = ["disabled", "title"], La = {
  key: 0,
  class: "map-disabled-reason",
  role: "status"
}, Ia = {
  key: 1,
  class: "map-maintenance-message",
  role: "status"
}, Ra = /* @__PURE__ */ ee({
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
    return (r, l) => (u(), c("aside", xa, [e("header", null, [l[4] || (l[4] = e("div", null, [e("span", null, "MAP SYSTEM / CONFIG"), e("h2", { id: "map-settings-title" }, "地图设置")], -1)), e("button", {
      type: "button",
      class: "map-icon-button",
      "aria-label": "关闭地图设置",
      onClick: l[0] || (l[0] = (i) => r.$emit("close"))
    }, "×")]), e("div", Ma, [
      e("section", _a, [e("div", $a, [l[6] || (l[6] = e("div", null, [e("h3", null, "所有普通聊天自动维护"), e("p", null, "每次发送新的 User 消息后，让地图维护刚被接受的上一轮空间事实。")], -1)), e("button", {
        type: "button",
        class: "map-switch",
        role: "switch",
        "aria-checked": a.autoMaintenance,
        "aria-label": a.autoMaintenance ? "关闭所有普通聊天自动维护" : "开启所有普通聊天自动维护",
        disabled: a.autoToggleBusy,
        onClick: l[1] || (l[1] = (i) => r.$emit("setAutoMaintenance", !a.autoMaintenance))
      }, [...l[5] || (l[5] = [e("span", null, null, -1)])], 8, Sa)])]),
      e("section", Aa, [l[7] || (l[7] = e("div", { class: "map-settings-action-copy" }, [e("h3", null, "增量维护"), e("p", null, "读取聊天尾部最新完整的 User 与 Assistant 对话，在后台补充地点、路线、人物位置和场景细节。")], -1)), e("button", {
        type: "button",
        class: "map-action-button",
        disabled: a.busy || !!a.disabledReason || !a.hasMap,
        title: a.hasMap ? a.disabledReason : "请先从当前聊天建立地图",
        onClick: l[2] || (l[2] = (i) => r.$emit("maintainOnce"))
      }, h(a.maintenanceStatus === "maintaining" ? "正在维护…" : "维护一次"), 9, Ba)]),
      e("section", Oa, [e("div", Ea, [e("h3", null, h(a.hasMap ? "重建地图" : "建立地图"), 1), l[8] || (l[8] = e("p", null, "提交后在后台重新读取当前聊天并生成完整地图。已有地图只会在新地图保存成功后被替换。", -1))]), e("button", {
        type: "button",
        class: "map-action-button is-strong",
        disabled: a.busy || !!a.disabledReason,
        title: a.disabledReason,
        onClick: l[3] || (l[3] = (i) => r.$emit("requestRebuild"))
      }, h(a.maintenanceStatus === "rebuilding" ? "正在重建…" : "从当前聊天建立/重建地图"), 9, Ca)]),
      a.disabledReason ? (u(), c("p", La, h(a.disabledReason), 1)) : C("", !0),
      a.maintenanceMessage ? (u(), c("p", Ia, h(a.maintenanceMessage), 1)) : C("", !0)
    ])]));
  }
}), Ta = Ra, Ka = { class: "map-app" }, Pa = { class: "map-header" }, Na = { class: "map-header-actions" }, za = ["disabled"], ja = { class: "map-command-bar" }, Ya = {
  class: "map-tabs",
  "aria-label": "地图视图"
}, Da = {
  key: 0,
  class: "map-location-select"
}, Ga = ["disabled"], Ha = {
  key: 0,
  value: ""
}, Va = ["value"], Ua = {
  key: 1,
  class: "map-atlas-summary",
  "aria-label": "世界地图统计"
}, Xa = { class: "map-notice-code" }, qa = { key: 0 }, Fa = ["disabled"], Wa = ["disabled"], Za = ["disabled"], Qa = {
  key: 0,
  class: "map-empty-state"
}, Ja = ["disabled"], en = {
  key: 1,
  class: "map-empty-state"
}, tn = ["disabled"], an = {
  key: 2,
  class: "map-empty-state"
}, nn = ["disabled"], sn = { class: "map-canvas-heading" }, rn = {
  class: "map-legend is-scene",
  "aria-label": "场景地图图例"
}, ln = {
  key: 0,
  class: "map-location-brief"
}, on = {
  key: 0,
  class: "map-empty-state"
}, un = ["disabled"], cn = { class: "map-canvas-heading is-atlas" }, dn = { key: 0 }, vn = {
  key: 2,
  class: "map-loading-scrim",
  role: "status"
}, Me = 35e3, pn = "Xiaobai Map Symbols", yn = /* @__PURE__ */ ee({
  __name: "MapApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(a) {
    let r = null;
    const l = a;
    function i() {
      if (!r) {
        const v = [
          "..",
          "..",
          "..",
          "libs",
          "material-symbols",
          "material-symbols-rounded.woff2"
        ].join("/"), t = new URL(v, import.meta.url).href;
        r = new FontFace(pn, `url("${t}")`, {
          display: "block",
          style: "normal",
          weight: "400"
        }).load().catch((w) => {
          throw r = null, w;
        });
      }
      return r;
    }
    function y() {
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
    function x(v) {
      return !v || typeof v != "object" ? y() : structuredClone(Ve(v));
    }
    function $(v) {
      const t = v.map;
      if (!t) return "";
      const w = new Map(t.atlas.locations.map((N) => [N.key, N]));
      let I = w.get(t.atlas.actors.find((N) => N.actorKey === "player")?.locationKey || "");
      const z = /* @__PURE__ */ new Set();
      for (; I && !z.has(I.key); ) {
        if (z.add(I.key), I.sceneKey && t.scenes[I.sceneKey]) return I.key;
        I = I.parent ? w.get(I.parent) : void 0;
      }
      return t.atlas.locations.find((N) => N.sceneKey && t.scenes[N.sceneKey])?.key || "";
    }
    const n = D(x(l.initialState)), g = D("scene"), _ = D($(n.value)), M = D(!1), m = D(null), f = D(""), s = D(""), o = D(!1);
    let E = () => {
    }, P = 0, H = 0, Y = !1;
    const X = O(() => {
      const v = n.value.map;
      return v ? v.atlas.locations.filter((t) => t.sceneKey && v.scenes[t.sceneKey]) : [];
    }), p = O(() => n.value.map?.atlas.actors.find((v) => v.actorKey === "player") || null), d = O(() => n.value.map?.atlas.locations.find((v) => v.key === p.value?.locationKey) || null), b = O(() => n.value.map?.atlas.locations.find((v) => v.key === _.value) || null), k = O(() => {
      const v = b.value?.sceneKey;
      return v && n.value.map?.scenes[v] || null;
    }), A = O(() => {
      const v = n.value.map;
      let t = b.value;
      if (!v || !t) return "";
      const w = new Map(v.atlas.locations.map((N) => [N.key, N])), I = [], z = /* @__PURE__ */ new Set();
      for (; t && !z.has(t.key); )
        z.add(t.key), I.unshift(t.name), t = t.parent && w.get(t.parent) || null;
      return I.join(" / ");
    }), K = O(() => n.value.status === "loading" || n.value.status === "saving" || n.value.maintenanceStatus === "maintaining" || n.value.maintenanceStatus === "rebuilding"), L = O(() => m.value !== null || K.value), T = O(() => n.value.status === "unconfirmed" || n.value.writeState === "unconfirmed"), F = O(() => L.value || T.value), V = O(() => m.value ? "正在处理上一项地图操作" : n.value.maintenanceStatus === "maintaining" ? "地图正在维护，请等待本次维护完成" : n.value.maintenanceStatus === "rebuilding" ? "地图正在重建，请等待本次重建完成" : n.value.status === "loading" ? "地图状态正在载入" : n.value.status === "saving" ? "地图正在保存" : T.value ? "请先核实上一次保存结果" : n.value.status === "conflict" ? "地图版本发生冲突，请先采用服务端数据" : n.value.status === "blocked" ? n.value.message || "当前地图不可维护" : n.value.status === "error" ? n.value.message || "地图状态异常，请先重新读取" : n.value.chatIdentity ? "" : "当前聊天不可用"), Le = Object.freeze({
      ready: "地图就绪",
      loading: "正在载入",
      saving: "正在保存",
      unconfirmed: "保存待核实",
      conflict: "版本冲突",
      blocked: "暂时不可用",
      error: "状态异常"
    }), ve = O(() => n.value.maintenanceStatus === "maintaining" ? "正在维护地图" : n.value.maintenanceStatus === "rebuilding" ? "正在重建地图" : m.value === "refresh" ? "正在重新读取" : m.value === "settings" ? "正在保存设置" : m.value === "confirm" ? "正在核实保存" : m.value === "adopt" ? "正在采用服务端数据" : m.value === "maintain" ? "正在维护地图" : m.value === "rebuild" ? "正在重建地图" : Le[n.value.status]), pe = O(() => !!(f.value || n.value.message || n.value.maintenanceMessage || s.value) || n.value.status !== "ready" || n.value.maintenanceStatus === "error"), te = O(() => f.value || [
      "error",
      "blocked",
      "conflict"
    ].includes(n.value.status) || n.value.maintenanceStatus === "error" ? "danger" : T.value ? "warning" : L.value ? "busy" : "info"), Ie = O(() => T.value ? "保存结果尚未确认" : n.value.status === "conflict" ? "地图版本发生冲突" : n.value.maintenanceStatus === "error" ? "地图维护未完成" : f.value || n.value.status === "error" ? "地图操作未完成" : n.value.status === "blocked" ? "地图暂时不可用" : ve.value), ye = O(() => f.value || n.value.maintenanceMessage || n.value.message || s.value), Re = O(() => Oe[k.value?.mood || "neutral"]), se = O(() => ({
      locations: n.value.map?.atlas.locations.length || 0,
      routes: n.value.map?.atlas.links.length || 0,
      actors: n.value.map?.atlas.actors.length || 0
    }));
    function Z(v) {
      return v !== null && typeof v == "object" && !Array.isArray(v);
    }
    function Te(v) {
      if (!Z(v)) return null;
      const t = v.result, w = Z(t) && Z(t.state) ? t.state : t;
      return Z(w) && typeof w.chatIdentity == "string" && typeof w.status == "string" ? w : null;
    }
    function Ke(v, t) {
      const w = v.map;
      if (w) {
        const I = w.atlas.locations.find((z) => z.key === t);
        if (I?.sceneKey && w.scenes[I.sceneKey]) return t;
      }
      return $(v);
    }
    function fe(v) {
      const t = structuredClone(v);
      _.value = Ke(t, t.chatIdentity === n.value.chatIdentity ? _.value : ""), n.value = t, f.value = "", s.value = "";
    }
    function Pe(v, t) {
      const w = v instanceof Error ? v.message : String(v);
      return w.includes("聊天已切换") ? "聊天已切换，请重新打开地图。" : w.includes("map_revision_conflict") ? "地图已被另一项操作更新，请重新读取后再试。" : w === "host_request_timeout" ? t === "maintain" || t === "rebuild" ? "等待 AI 处理超时；后台结果仍可能稍后送达，请勿立即重复操作。" : "等待地图服务响应超时，请稍后重试。" : w.includes("已有") && w.includes("维护") ? "已有地图维护正在进行，请等待完成。" : t === "settings" ? "自动维护设置未能保存，请重试。" : t === "refresh" ? "地图状态未能重新读取，请稍后重试。" : t === "confirm" ? "保存结果仍无法确认，请稍后再次核实。" : t === "adopt" ? "暂时无法采用服务端数据，冲突仍保持冻结。" : t === "rebuild" ? "地图建立/重建未能开始，请稍后重试。" : "地图维护未能开始，请稍后重试。";
    }
    async function Q(v, t, w = Me, I = {}) {
      if (m.value) return null;
      const z = ++P, N = H, ie = n.value.chatIdentity;
      m.value = t, f.value = "", s.value = "";
      try {
        const ae = await l.bridge.request(v, {
          chatIdentity: ie,
          ...I
        }, w);
        if (!Y || z !== P || n.value.chatIdentity !== ie) return null;
        const me = H !== N, be = Te(ae);
        let ge = !1;
        return !me && be?.chatIdentity === ie && (fe(be), ge = !0), {
          response: ae,
          stateApplied: ge,
          newerStateReceived: me
        };
      } catch (ae) {
        return Y && z === P && (f.value = Pe(ae, t)), null;
      } finally {
        Y && z === P && (m.value = null);
      }
    }
    async function he() {
      F.value || await Q("map/refresh", "refresh") && (s.value = "已读取当前聊天的最新地图状态。");
    }
    async function Ne() {
      L.value || await Q("map/confirm-save", "confirm") && (s.value = "保存结果已重新核实。");
    }
    async function ze() {
      if (L.value) return;
      const v = await Q("map/adopt-server-state", "adopt");
      if (!v) return;
      const t = Z(v.response) ? v.response.result : null;
      s.value = (Z(t) ? t.adoption : "") === "adopted" ? "已采用服务端数据，可以继续维护地图。" : "服务端数据仍无法采用，地图继续保持冻结。";
    }
    async function je(v) {
      if (m.value) return;
      const t = await Q("map/set-auto-maintenance", "settings", Me, { enabled: v });
      t && (!t.stateApplied && !t.newerStateReceived && (n.value = {
        ...n.value,
        autoMaintenance: v
      }), s.value = v ? "普通聊天自动维护已开启。" : "普通聊天自动维护已关闭。");
    }
    async function Ye() {
      V.value || !n.value.map || await Q("map/maintain-once", "maintain");
    }
    async function re() {
      V.value || await Q("map/rebuild", "rebuild");
    }
    function De(v) {
      const t = n.value.map?.atlas.locations.find((w) => w.key === v);
      !t?.sceneKey || !n.value.map?.scenes[t.sceneKey] || (_.value = v, g.value = "scene");
    }
    function Ge(v) {
      return v.key === d.value?.key ? `${v.name}（当前位置）` : v.name;
    }
    return Ue(() => {
      Y = !0, E = l.bridge.subscribe((v) => {
        if (v.type === "map/state") {
          const t = v.payload?.state;
          t && (H += 1, fe(t));
        }
        v.type === "map/error" && (H += 1, s.value = "", f.value = v.payload?.message || "地图服务报告了一个错误，请重新读取。");
      }), typeof FontFace == "function" && document.fonts?.add && i().then((v) => {
        document.fonts.add(v), Y && (o.value = !0);
      }).catch(() => {
        o.value = !1;
      });
    }), _e(() => {
      Y = !1, P += 1, E();
    }), (v, t) => (u(), c("main", Ka, [
      e("header", Pa, [t[10] || (t[10] = e("div", { class: "map-brand" }, [e("span", {
        class: "map-brand-mark",
        "aria-hidden": "true"
      }, [
        e("i"),
        e("i"),
        e("i")
      ]), e("div", null, [e("small", null, "XIAOBAI CARTOGRAPHY / 01"), e("h1", null, "地图")])], -1)), e("div", Na, [
        e("span", { class: G(["map-status-chip", `is-${te.value}`]) }, [t[7] || (t[7] = e("i", null, null, -1)), U(h(ve.value), 1)], 2),
        e("button", {
          type: "button",
          class: "map-icon-button",
          disabled: F.value,
          title: "重新读取地图",
          "aria-label": "重新读取地图",
          onClick: he
        }, [...t[8] || (t[8] = [e("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [e("path", { d: "M20 7v5h-5M4 17v-5h5M18.2 9A7 7 0 0 0 6.1 6.7L4 9m16 6-2.1 2.3A7 7 0 0 1 5.8 15" })], -1)])], 8, za),
        e("button", {
          type: "button",
          class: G(["map-icon-button", { "is-active": M.value }]),
          title: "地图设置",
          "aria-label": "地图设置",
          onClick: t[0] || (t[0] = (w) => M.value = !M.value)
        }, [...t[9] || (t[9] = [e("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [e("path", { d: "M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM19 13.5l2-1.5-2-1.5-.5-1.3.4-2.5-2.5-.4L15 4l-2 1h-2L9 4 7.6 6.3l-2.5.4.4 2.5L5 10.5 3 12l2 1.5.5 1.3-.4 2.5 2.5.4L9 20l2-1h2l2 1 1.4-2.3 2.5-.4-.4-2.5z" })], -1)])], 2)
      ])]),
      e("div", ja, [e("nav", Ya, [e("button", {
        type: "button",
        class: G({ "is-active": g.value === "scene" }),
        onClick: t[1] || (t[1] = (w) => g.value = "scene")
      }, "场景", 2), e("button", {
        type: "button",
        class: G({ "is-active": g.value === "atlas" }),
        onClick: t[2] || (t[2] = (w) => g.value = "atlas")
      }, "世界", 2)]), g.value === "scene" ? (u(), c("label", Da, [t[11] || (t[11] = e("span", null, "观察地点", -1)), Fe(e("select", {
        "onUpdate:modelValue": t[3] || (t[3] = (w) => _.value = w),
        disabled: X.value.length === 0
      }, [X.value.length === 0 ? (u(), c("option", Ha, "暂无可查看场景")) : C("", !0), (u(!0), c(j, null, W(X.value, (w) => (u(), c("option", {
        key: w.key,
        value: w.key
      }, h(Ge(w)), 9, Va))), 128))], 8, Ga), [[qe, _.value]])])) : (u(), c("div", Ua, [
        e("span", null, h(se.value.locations) + " 地点", 1),
        t[12] || (t[12] = e("i", null, null, -1)),
        e("span", null, h(se.value.routes) + " 路线", 1),
        t[13] || (t[13] = e("i", null, null, -1)),
        e("span", null, h(se.value.actors) + " 人物", 1)
      ]))]),
      pe.value ? (u(), c("aside", {
        key: 0,
        class: G(["map-notice", `is-${te.value}`]),
        role: "status"
      }, [
        e("span", Xa, h(te.value === "danger" ? "!" : te.value === "warning" ? "?" : "i"), 1),
        e("div", null, [e("strong", null, h(Ie.value), 1), ye.value ? (u(), c("p", qa, h(ye.value), 1)) : C("", !0)]),
        T.value ? (u(), c("button", {
          key: 0,
          type: "button",
          disabled: L.value,
          onClick: Ne
        }, h(m.value === "confirm" ? "正在核实…" : "确认保存结果"), 9, Fa)) : n.value.status === "conflict" ? (u(), c("button", {
          key: 1,
          type: "button",
          disabled: L.value,
          onClick: ze
        }, h(m.value === "adopt" ? "正在采用…" : "采用服务端数据"), 9, Wa)) : n.value.status === "blocked" || n.value.status === "error" || f.value ? (u(), c("button", {
          key: 2,
          type: "button",
          disabled: F.value,
          onClick: he
        }, h(m.value === "refresh" ? "正在读取…" : "重新读取"), 9, Za)) : C("", !0)
      ], 2)) : C("", !0),
      e("section", { class: G(["map-workspace", { "has-notice": pe.value }]) }, [g.value === "scene" ? (u(), c(j, { key: 0 }, [n.value.map ? k.value ? k.value.status === "uninitialized" ? (u(), c("div", an, [
        t[22] || (t[22] = e("span", {
          class: "map-empty-radar",
          "aria-hidden": "true"
        }, [e("i")], -1)),
        t[23] || (t[23] = e("small", null, "SCENE PENDING", -1)),
        e("h2", null, h(k.value.name) + " 尚未绘制", 1),
        t[24] || (t[24] = e("p", null, "地点已记录，场景几何仍待地图维护补全。", -1)),
        e("button", {
          type: "button",
          disabled: !!V.value,
          onClick: t[5] || (t[5] = (w) => M.value = !0)
        }, "打开维护设置", 8, nn)
      ])) : (u(), c(j, { key: 3 }, [
        le(ka, {
          scene: k.value,
          "symbols-ready": o.value
        }, null, 8, ["scene", "symbols-ready"]),
        e("div", sn, [
          e("small", null, h(A.value || k.value.name), 1),
          e("h2", null, h(k.value.name), 1),
          e("span", null, [e("i", { style: Se({ background: Re.value.accent }) }, null, 4), U(h(k.value.mood || "neutral"), 1)])
        ]),
        e("aside", rn, [
          t[30] || (t[30] = e("strong", null, "图例", -1)),
          e("span", null, [t[25] || (t[25] = e("i", { class: "is-wall" }, null, -1)), U(h(S(J).wall), 1)]),
          e("span", null, [t[26] || (t[26] = e("i", { class: "is-road" }, null, -1)), U(h(S(J).road), 1)]),
          e("span", null, [t[27] || (t[27] = e("i", { class: "is-water" }, null, -1)), U(h(S(J).water), 1)]),
          e("span", null, [t[28] || (t[28] = e("i", { class: "is-danger" }, null, -1)), U(h(S(J).danger), 1)]),
          e("span", null, [t[29] || (t[29] = e("i", { class: "is-actor" }, null, -1)), U(h(S(J).actor), 1)]),
          t[31] || (t[31] = e("span", null, [e("i", { class: "is-inferred" }), U("推断")], -1))
        ]),
        b.value?.brief ? (u(), c("div", ln, h(b.value.brief), 1)) : C("", !0)
      ], 64)) : (u(), c("div", en, [
        t[18] || (t[18] = e("span", {
          class: "map-empty-radar",
          "aria-hidden": "true"
        }, [e("i")], -1)),
        t[19] || (t[19] = e("small", null, "SCENE NOT AVAILABLE", -1)),
        t[20] || (t[20] = e("h2", null, "暂无可绘制的场景", -1)),
        t[21] || (t[21] = e("p", null, "世界地点已经存在，但还没有地点具备场景图。可维护一次地图来补充。", -1)),
        e("button", {
          type: "button",
          disabled: !!V.value,
          onClick: t[4] || (t[4] = (w) => M.value = !0)
        }, "打开维护设置", 8, tn)
      ])) : (u(), c("div", Qa, [
        t[14] || (t[14] = e("span", {
          class: "map-empty-radar",
          "aria-hidden": "true"
        }, [e("i")], -1)),
        t[15] || (t[15] = e("small", null, "NO CARTOGRAPHIC DATA", -1)),
        t[16] || (t[16] = e("h2", null, "当前聊天还没有地图", -1)),
        t[17] || (t[17] = e("p", null, "从当前聊天中识别地点、路线与场景。开始后可离开地图，任务会在后台继续。", -1)),
        e("button", {
          type: "button",
          disabled: !!V.value,
          onClick: re
        }, h(n.value.maintenanceStatus === "rebuilding" ? "正在建立地图…" : "从当前聊天建立地图"), 9, Ja)
      ]))], 64)) : (u(), c(j, { key: 1 }, [!n.value.map || n.value.map.atlas.locations.length === 0 ? (u(), c("div", on, [
        t[32] || (t[32] = e("span", {
          class: "map-empty-radar",
          "aria-hidden": "true"
        }, [e("i")], -1)),
        t[33] || (t[33] = e("small", null, "ATLAS IS EMPTY", -1)),
        t[34] || (t[34] = e("h2", null, "世界地图尚未建立", -1)),
        t[35] || (t[35] = e("p", null, "建立地图后，这里会显示地点层级、通行路线和人物所在位置。", -1)),
        e("button", {
          type: "button",
          disabled: !!V.value,
          onClick: re
        }, h(n.value.maintenanceStatus === "rebuilding" ? "正在建立地图…" : "从当前聊天建立地图"), 9, un)
      ])) : (u(), c(j, { key: 1 }, [
        le(Yt, {
          atlas: n.value.map.atlas,
          revision: n.value.map.revision,
          "current-location-key": d.value?.key || "",
          "selected-location-key": _.value,
          "symbols-ready": o.value,
          onViewScene: De
        }, null, 8, [
          "atlas",
          "revision",
          "current-location-key",
          "selected-location-key",
          "symbols-ready"
        ]),
        e("div", cn, [
          t[37] || (t[37] = e("small", null, "DETERMINISTIC WORLD GRAPH", -1)),
          t[38] || (t[38] = e("h2", null, "地点网络", -1)),
          d.value ? (u(), c("span", dn, [t[36] || (t[36] = e("i", null, null, -1)), U("当前位置 · " + h(d.value.name), 1)])) : C("", !0)
        ]),
        t[39] || (t[39] = Xe('<aside class="map-legend is-atlas" aria-label="世界地图图例"><strong>图例</strong><span><i class="is-current"></i>当前位置</span><span><i class="is-visited"></i>已到访</span><span><i class="is-route"></i>通行路线</span><span><i class="is-hierarchy"></i>隶属层级</span><small>点击有场景的地点可查看</small></aside>', 1))
      ], 64))], 64)), n.value.status === "loading" ? (u(), c("div", vn, [...t[40] || (t[40] = [e("span", null, null, -1), e("p", null, "正在校准地图坐标", -1)])])) : C("", !0)], 2),
      le(Ze, { name: "map-panel" }, {
        default: ce(() => [M.value ? (u(), de(Ta, {
          key: 0,
          "auto-maintenance": n.value.autoMaintenance,
          busy: L.value,
          "auto-toggle-busy": m.value !== null,
          "disabled-reason": V.value,
          "has-map": !!n.value.map,
          "maintenance-status": n.value.maintenanceStatus || "idle",
          "maintenance-message": n.value.maintenanceMessage || "",
          onClose: t[6] || (t[6] = (w) => M.value = !1),
          onSetAutoMaintenance: je,
          onMaintainOnce: Ye,
          onRequestRebuild: re
        }, null, 8, [
          "auto-maintenance",
          "busy",
          "auto-toggle-busy",
          "disabled-reason",
          "has-map",
          "maintenance-status",
          "maintenance-message"
        ])) : C("", !0)]),
        _: 1
      })
    ]));
  }
}), xn = yn;
export {
  xn as default
};
