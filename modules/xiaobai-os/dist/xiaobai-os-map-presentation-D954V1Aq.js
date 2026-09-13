/* eslint-disable */
var P = Object.freeze({
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
function I(r, t) {
  return `url(#${t}-material-${r || "unknown"})`;
}
function Z(r, t) {
  return `url(#${t}-face-${r || "unknown"})`;
}
function X(r) {
  return `color-mix(in srgb, ${P[r]}, var(--map-surface) var(--scene-material-mix))`;
}
var L = /* @__PURE__ */ new Set([
  "water",
  "terrain",
  "furniture",
  "decoration",
  "danger",
  "magic",
  "secret",
  "light"
]), N = /* @__PURE__ */ new Set([
  "chair",
  "table",
  "bed",
  "counter",
  "shelf",
  "sofa",
  "bridge",
  "tree",
  "rock"
]), v = (r) => Number(r.toFixed(3)).toString(), _ = (r) => r.geometry.points || [];
function k(r) {
  return _(r).length >= 3 && (r.closed ?? L.has(r.category));
}
function m(r) {
  return r.category === "wall" || r.category === "grid" ? !1 : r.shape === "rect" || r.shape === "circle" ? !0 : (r.shape === "path" || r.shape === "curve") && k(r);
}
function T(r) {
  return (r.shape === "rect" || r.shape === "circle") && (r.icon !== void 0 && N.has(r.icon) || [
    "furniture",
    "decoration",
    "door"
  ].includes(r.category));
}
function S(r, t, o) {
  const a = r[o], c = r[(o + 1) % r.length], e = r[o - 1] || (t ? r[r.length - 1] : a), n = r[o + 2] || (t ? r[(o + 2) % r.length] : c), i = (s, l, g) => Math.max(Math.min(l, g), Math.min(Math.max(l, g), s));
  return [[i(a[0] + (c[0] - e[0]) / 6, a[0], c[0]), i(a[1] + (c[1] - e[1]) / 6, a[1], c[1])], [i(c[0] - (n[0] - a[0]) / 6, a[0], c[0]), i(c[1] - (n[1] - a[1]) / 6, a[1], c[1])]];
}
function q(r) {
  if (r.shape === "rect") {
    const { x: e, y: n, width: i, height: s } = r.geometry;
    return {
      points: [
        [e, n],
        [e + i, n],
        [e + i, n + s],
        [e, n + s]
      ],
      closed: !0
    };
  }
  if (r.shape === "circle") {
    const { x: e, y: n, radius: i } = r.geometry;
    return {
      points: Array.from({ length: 64 }, (s, l) => [e + i * Math.cos(l * Math.PI / 32), n + i * Math.sin(l * Math.PI / 32)]),
      closed: !0
    };
  }
  if (r.shape !== "path" && r.shape !== "curve") return {
    points: [],
    closed: !1
  };
  const t = _(r), o = k(r), a = (e) => e.map((n) => Number(v(n)));
  if (r.shape === "path" || t.length < 2) return {
    points: t.map(a),
    closed: o
  };
  const c = [a(t[0])];
  for (let e = 0; e < t.length - (o ? 0 : 1); e += 1) {
    const n = a(t[e]), i = a(t[(e + 1) % t.length]), [s, l] = S(t, o, e).map(a);
    for (let g = 1; g <= 12; g += 1) {
      const h = g / 12, f = 1 - h;
      c.push([0, 1].map((d) => f ** 3 * n[d] + 3 * f ** 2 * h * s[d] + 3 * f * h ** 2 * l[d] + h ** 3 * i[d]));
    }
  }
  return o && c.pop(), {
    points: c,
    closed: o
  };
}
function W(r) {
  if (r.shape === "rect") {
    const { x: e, y: n, width: i, height: s } = r.geometry;
    return `M ${e} ${n} h ${i} v ${s} h ${-i} Z`;
  }
  if (r.shape === "circle") {
    const { x: e, y: n, radius: i } = r.geometry;
    return `M ${e - i} ${n} a ${i} ${i} 0 1 0 ${i * 2} 0 a ${i} ${i} 0 1 0 ${-i * 2} 0 Z`;
  }
  const t = _(r);
  if (t.length < 2) return "";
  const o = k(r);
  if (r.shape === "path") return `M ${t.map(([e, n]) => `${v(e)} ${v(n)}`).join(" L ")}${o ? " Z" : ""}`;
  const a = [`M ${t[0].map(v).join(" ")}`], c = t.length;
  for (let e = 0; e < c - (o ? 0 : 1); e += 1) {
    const [n, i] = S(t, o, e), s = t[(e + 1) % c];
    a.push(`C ${n.map(v).join(" ")}, ${i.map(v).join(" ")}, ${s.map(v).join(" ")}`);
  }
  return a.join(" ") + (o ? " Z" : "");
}
function O(r) {
  if (r.shape === "rect") return { ...r.geometry };
  if (r.shape === "circle") {
    const { x: c, y: e, radius: n } = r.geometry;
    return {
      x: c - n,
      y: e - n,
      width: n * 2,
      height: n * 2
    };
  }
  const t = _(r);
  if (!t.length) {
    const { x: c, y: e } = r.geometry;
    return {
      x: c,
      y: e,
      width: 0,
      height: 0
    };
  }
  const o = t.map((c) => c[0]), a = t.map((c) => c[1]);
  return {
    x: Math.min(...o),
    y: Math.min(...a),
    width: Math.max(...o) - Math.min(...o),
    height: Math.max(...a) - Math.min(...a)
  };
}
function H(r) {
  if (!r.rotation) return;
  const t = O(r);
  return `rotate(${r.rotation} ${t.x + t.width / 2} ${t.y + t.height / 2})`;
}
function J(r, t = 1) {
  const o = O(r), a = [o.x + o.width / 2, o.y + o.height / 2];
  if (r.shape === "label") return a;
  if (r.shape === "icon") return [a[0], a[1] + 23 * t];
  if ((r.category === "terrain" || r.category === "water") && m(r)) return a;
  if (r.shape === "path" || r.shape === "curve") {
    const n = _(r), i = k(r), s = n.length - (i ? 0 : 1), l = Array.from({ length: s }, (b, p) => Math.hypot(n[(p + 1) % n.length][0] - n[p][0], n[(p + 1) % n.length][1] - n[p][1]));
    let g = l.reduce((b, p) => b + p, 0) / 2, h = 0;
    for (; h < l.length - 1 && g > l[h]; )
      g -= l[h], h += 1;
    const f = n[h], d = n[(h + 1) % n.length], u = l[h] ? g / l[h] : 0.5;
    let x = f[0] + (d[0] - f[0]) * u, E = f[1] + (d[1] - f[1]) * u, $ = d[0] - f[0], A = d[1] - f[1];
    if (r.shape === "curve") {
      const [b, p] = S(n, i, h), w = 1 - u;
      x = w ** 3 * f[0] + 3 * w ** 2 * u * b[0] + 3 * w * u ** 2 * p[0] + u ** 3 * d[0], E = w ** 3 * f[1] + 3 * w ** 2 * u * b[1] + 3 * w * u ** 2 * p[1] + u ** 3 * d[1], $ = 3 * w ** 2 * (b[0] - f[0]) + 6 * w * u * (p[0] - b[0]) + 3 * u ** 2 * (d[0] - p[0]), A = 3 * w ** 2 * (b[1] - f[1]) + 6 * w * u * (p[1] - b[1]) + 3 * u ** 2 * (d[1] - p[1]);
    }
    const C = Math.hypot($, A);
    if (!C) return [x, E - 13 * t];
    let M = -A / C, y = $ / C;
    return (y > 0 || y === 0 && M < 0) && (M = -M, y = -y), [x + M * 13 * t, E + y * 13 * t];
  }
  const c = (r.rotation || 0) * Math.PI / 180, e = r.shape === "circle" ? o.height / 2 : (Math.abs(Math.sin(c)) * o.width + Math.abs(Math.cos(c)) * o.height) / 2;
  return [a[0], a[1] + e + 13 * t];
}
function z(r) {
  let t = 2166136261;
  for (const o of r) t = Math.imul(t ^ o.charCodeAt(0), 16777619);
  return t >>> 0;
}
function Q(r) {
  const t = r.filter((a) => a.category === "terrain" && a.material === "forest" && m(a) && !T(a)).sort((a, c) => a.id < c.id ? -1 : a.id > c.id ? 1 : 0), o = /* @__PURE__ */ new Map();
  for (let a = 0; a < t.length; a += 1) {
    const c = t[a], e = O(c), n = Math.floor(256 / t.length) + (a < 256 % t.length ? 1 : 0), i = e.width && e.height ? Math.min(n, Math.max(1, Math.ceil(e.width * e.height / 2704))) : 0, s = Math.min(i, Math.max(1, Math.ceil(Math.sqrt(i * e.width / Math.max(1, e.height))))), l = Math.ceil(i / Math.max(1, s));
    let g = z(c.id);
    const h = () => (g = Math.imul(g, 1664525) + 1013904223 >>> 0, g / 4294967296), f = [];
    for (let d = 0; d < i; d += 1) f.push({
      x: e.x + (d % s + 0.5 + (h() - 0.5) * 0.35) * e.width / s,
      y: e.y + (Math.floor(d / s) + 0.5 + (h() - 0.5) * 0.35) * e.height / l,
      size: Math.min(Math.max(e.width / s, e.height / l), Math.min(e.width, e.height)) * (1.25 + h() * 0.35),
      variant: Math.floor(h() * 3)
    });
    o.set(c.id, f);
  }
  return o;
}
var R = Object.freeze({
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
}), B = Object.freeze({
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
}), F = Object.freeze({
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
}), D = Object.freeze({
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
}), G = Object.freeze({
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
}), K = Object.freeze({
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
}), j = Object.freeze({
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
}), U = Object.freeze({
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
}), V = Object.freeze({
  world: "世界",
  region: "区域",
  city: "城市",
  district: "区域",
  building: "建筑",
  floor: "楼层",
  room: "房间",
  outdoor: "户外"
}), rr = Object.freeze({
  door: "门",
  stairs: "楼梯",
  elevator: "电梯",
  path: "小径",
  road: "道路",
  portal: "传送门",
  passage: "通道"
});
function Y(r, t) {
  return r < t ? -1 : r > t ? 1 : 0;
}
function tr(r, t) {
  const o = R[r.category], a = m(r), c = a && (r.material || r.category === "water") ? I(r.material || "water", t) : "", e = r.certainty === "inferred" ? "8 6" : r.certainty === "unknown" ? "3 7" : o.dash;
  return {
    ...o,
    fill: a ? c || o.fill : "none",
    opacity: r.certainty === "unknown" ? 0.48 : r.certainty === "inferred" ? 0.72 : 1,
    dash: e,
    icon: r.icon ? G[r.icon] : r.kind ? F[r.kind] : K[r.category],
    fallback: r.kind ? D[r.kind] : B[r.category].slice(0, 1),
    z: j[r.category]
  };
}
function ar(r) {
  const t = (o) => {
    if (!m(o)) return 0;
    const a = O(o);
    return a.width * a.height;
  };
  return [...r].sort((o, a) => j[o.category] - j[a.category] || t(a) - t(o) || Y(o.id, a.id));
}
export {
  Z as _,
  tr as a,
  m as c,
  J as d,
  q as f,
  X as g,
  P as h,
  V as i,
  T as l,
  H as m,
  rr as n,
  ar as o,
  W as p,
  U as r,
  Q as s,
  B as t,
  O as u,
  I as v
};
