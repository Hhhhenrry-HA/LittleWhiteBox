/* eslint-disable */
import { B as $e, C as k, D as W, E as Qe, G as D, I as Le, K as ne, M as we, O as x, P as Ce, Q as ee, S as Z, U as r, X as ve, Y as pe, _ as O, at as H, b as C, dt as be, et as Oe, ft as y, g as ge, h as Be, k as U, lt as f, m as He, o as Ye, p as Ge, tt as Pe, ut as J, w as c, x as n } from "./xiaobai-os-frame-bridge-CrPFvkI3.js";
import { t as Xe } from "./xiaobai-os-AppDialog-Ce_C5VGF.js";
var Je = { class: "map-viewport" }, et = ["viewBox", "aria-label"], tt = {
  class: "map-viewport-controls",
  "aria-label": "地图缩放"
}, at = /* @__PURE__ */ U({
  __name: "MapViewport",
  props: {
    viewBox: {},
    resetKey: { default: "" },
    label: {},
    focusPoint: { default: void 0 },
    focusSequence: { default: 0 }
  },
  setup(e) {
    const l = e, o = H(null), a = H([...l.viewBox]), i = H([0, 0]), u = C(() => i.value[0] && i.value[1] ? Math.max(a.value[2] / i.value[0], a.value[3] / i.value[1]) : 1);
    let d;
    $e(() => {
      d = new ResizeObserver((g) => {
        const S = g[0].contentRect;
        i.value = [S.width, S.height];
      }), o.value && d.observe(o.value);
    });
    const s = /* @__PURE__ */ new Map();
    let v = null, h = [0, 0], t = 0, p = null, m = !1, M = !1, A = null;
    const N = C(() => a.value.join(" "));
    function P() {
      a.value = [...l.viewBox];
    }
    function L() {
      return u.value;
    }
    function _(g, S) {
      const T = o.value?.getBoundingClientRect();
      if (!T) return [a.value[0], a.value[1]];
      const z = L();
      return [a.value[0] + a.value[2] / 2 + (g - T.left - T.width / 2) * z, a.value[1] + a.value[3] / 2 + (S - T.top - T.height / 2) * z];
    }
    function R(g, S) {
      const T = Math.max(1, l.viewBox[2]), z = Math.min(T * 3, Math.max(Math.min(T * 0.24, 240), a.value[2] * g)), Q = z / a.value[2], Y = S || [a.value[0] + a.value[2] / 2, a.value[1] + a.value[3] / 2];
      a.value = [
        Y[0] - (Y[0] - a.value[0]) * Q,
        Y[1] - (Y[1] - a.value[1]) * Q,
        z,
        a.value[3] * Q
      ];
    }
    function q() {
      if (!l.focusPoint) return;
      const g = Math.min(a.value[2], 620), S = a.value[3] * g / a.value[2];
      a.value = [
        l.focusPoint[0] - g / 2,
        l.focusPoint[1] - S / 2,
        g,
        S
      ];
    }
    function K() {
      const g = [...s.values()];
      g.length === 1 && (v = g[0], h = [a.value[0], a.value[1]]), g.length === 2 && (t = Math.hypot(g[1][0] - g[0][0], g[1][1] - g[0][1]), p = [(g[0][0] + g[1][0]) / 2, (g[0][1] + g[1][1]) / 2], m = !0);
    }
    function V(g) {
      g.button !== 0 || s.size >= 2 || (s.size || (m = !1), s.set(g.pointerId, [g.clientX, g.clientY]), g.target.setPointerCapture(g.pointerId), K());
    }
    function I(g) {
      if (!s.has(g.pointerId)) return;
      s.set(g.pointerId, [g.clientX, g.clientY]);
      const S = [...s.values()];
      if (S.length === 2 && p) {
        const T = Math.hypot(S[1][0] - S[0][0], S[1][1] - S[0][1]), z = [(S[0][0] + S[1][0]) / 2, (S[0][1] + S[1][1]) / 2];
        T > 0 && t > 0 && R(t / T, _(...p)), a.value[0] -= (z[0] - p[0]) * L(), a.value[1] -= (z[1] - p[1]) * L(), t = T, p = z;
      } else if (v) {
        const T = g.clientX - v[0], z = g.clientY - v[1];
        Math.abs(T) + Math.abs(z) > 4 && (m = !0), a.value = [
          h[0] - T * L(),
          h[1] - z * L(),
          a.value[2],
          a.value[3]
        ];
      }
    }
    function E(g) {
      if (!s.delete(g.pointerId)) return;
      const S = g.target;
      S.hasPointerCapture(g.pointerId) && S.releasePointerCapture(g.pointerId), K(), s.size || (v = null, p = null), m && (M = !0, A && clearTimeout(A), A = setTimeout(() => {
        M = !1;
      }, 0));
    }
    function F(g) {
      M && (g.preventDefault(), g.stopPropagation());
    }
    return ee(() => l.resetKey, P, { immediate: !0 }), ee(() => l.focusSequence, q, { flush: "post" }), Le(() => {
      d?.disconnect(), A && clearTimeout(A);
    }), (g, S) => (r(), c("div", Je, [(r(), c("svg", {
      ref_key: "svg",
      ref: o,
      class: "map-viewport-svg",
      viewBox: N.value,
      preserveAspectRatio: "xMidYMid meet",
      role: "group",
      "aria-label": e.label,
      onWheel: S[0] || (S[0] = ge((T) => R(T.deltaY < 0 ? 0.84 : 1.19, _(T.clientX, T.clientY)), ["prevent"])),
      onPointerdown: V,
      onPointermove: I,
      onPointerup: E,
      onPointercancel: E,
      onClickCapture: F
    }, [ne(g.$slots, "default", { unitScale: u.value })], 40, et)), n("div", tt, [
      n("button", {
        type: "button",
        "aria-label": "放大地图",
        onClick: S[1] || (S[1] = (T) => R(0.8))
      }, "+"),
      n("button", {
        type: "button",
        "aria-label": "缩小地图",
        onClick: S[2] || (S[2] = (T) => R(1.25))
      }, "−"),
      n("button", {
        type: "button",
        class: "map-fit",
        onClick: P
      }, "全图")
    ])]));
  }
}), Re = at, nt = {
  class: "map-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.7",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, lt = ["d"], ot = /* @__PURE__ */ U({
  __name: "MapIcon",
  props: { name: { default: "pin" } },
  setup(e) {
    const l = {
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
    return (o, a) => (r(), c("svg", nt, [n("path", { d: l[e.name] || l.pin }, null, 8, lt)]));
  }
}), j = ot;
function te(e) {
  return e.scale === "region";
}
function st(e) {
  return e.scale !== "world" && !te(e);
}
function he(e, l) {
  const o = new Map(e.locations.map((u) => [u.key, u])), a = [];
  let i = o.get(l);
  for (; i; )
    a.unshift(i), i = i.parent ? o.get(i.parent) : void 0;
  return a;
}
function ke(e, l) {
  return he(e, l).reverse().find(te);
}
function rt(e) {
  const l = /* @__PURE__ */ new Set(), o = e.actors.find((a) => a.actorKey === "player")?.locationKey;
  for (const a of e.locations)
    if (!(a.status !== "visited" && a.key !== o))
      for (const i of he(e, a.key)) l.add(i.key);
  return l;
}
function Me(e, l, o) {
  const a = new Set(o.map((i) => i.key));
  return he(e, l).reverse().find((i) => a.has(i.key))?.key || "";
}
function it(e, l) {
  return e.links.flatMap((o) => {
    if (o.from !== l && o.to !== l) return [];
    const a = e.locations.find((i) => i.key === (o.from === l ? o.to : o.from));
    return a ? [{
      location: a,
      link: o,
      outgoing: o.bidirectional || o.from === l
    }] : [];
  });
}
function ct(e, l) {
  const o = [...l.locations].sort((t, p) => t.key.localeCompare(p.key, "en")), a = (t) => t.position && (t.parent || "") === l.positionParent, i = o.filter(a).map((t) => ({
    location: t,
    x: t.position[0],
    y: t.position[1],
    placed: !0
  }));
  let u = 0;
  for (const t of o.filter((p) => !a(p))) {
    let p, m;
    do {
      const M = u * 2.3999632297, A = 155 * Math.sqrt(u++);
      p = Math.round(500 + Math.cos(M) * A), m = Math.round(420 + Math.sin(M) * A);
    } while (i.some((M) => Math.hypot(M.x - p, M.y - m) < 160));
    i.push({
      location: t,
      x: p,
      y: m,
      placed: !1
    });
  }
  i.sort((t, p) => t.location.key.localeCompare(p.location.key, "en"));
  const d = new Map(i.map((t) => [t.location.key, t])), s = e.links.flatMap((t) => {
    const p = d.get(Me(e, t.from, o)), m = d.get(Me(e, t.to, o));
    if (!p || !m || p === m) return [];
    const M = (p.x + m.x) / 2, A = (p.y + m.y) / 2;
    return [{
      link: t,
      from: p,
      to: m,
      x: M,
      y: A,
      path: `M ${p.x} ${p.y} Q ${M + (m.y - p.y) * 0.12} ${A - (m.x - p.x) * 0.12} ${m.x} ${m.y}`
    }];
  }), v = i.length ? Math.min(...i.map((t) => t.x)) - 140 : 0, h = i.length ? Math.min(...i.map((t) => t.y)) - 150 : 0;
  return {
    nodes: i,
    routes: s,
    viewBox: [
      v,
      h,
      i.length ? Math.max(420, Math.max(...i.map((t) => t.x)) - v + 140) : 800,
      i.length ? Math.max(500, Math.max(...i.map((t) => t.y)) - h + 190) : 900
    ]
  };
}
var ue = {
  label: "投影地图",
  empty: "还没有地图",
  description: "将地图投影到最后一个AI楼层末尾显示。",
  enabled: "地图投影已开启。",
  disabled: "地图投影已关闭。",
  views: {
    world: "世界",
    region: "地区",
    scene: "场景"
  },
  options: "地图显示选项",
  location: "回到当前位置"
}, G = {
  mode: "场景显示方式",
  two: "二维",
  three: "三维",
  lowWalls: "低墙",
  labels: "名称"
}, X = {
  world: "世界地图",
  region: "当前地区",
  scene: "当前场景"
}, oe = {
  visited: "已到访",
  unvisited: "未到访"
}, fe = {
  world: {
    unit: "地区",
    search: "搜索地区",
    all: "全部地区",
    empty: "还没有记录地区",
    emptyHint: "更新地图后，可根据设定与剧情补充地区。",
    notFound: "没有找到符合条件的地区"
  },
  region: {
    unit: "场景",
    search: "搜索本地区场景",
    all: "全部场景",
    empty: "这个地区还没有记录场景",
    emptyHint: "可以查看其他地区，或更新地图补充。",
    notFound: "没有找到符合条件的场景"
  }
}, B = {
  loading: "正在打开地图…",
  viewLabel: "地图视图",
  trailLabel: "当前查看位置",
  unknownRegion: "所属地区待确认",
  unknownRegionHint: "地图还没有记录当前位置所属的地区。",
  regionMap: "查看地区地图",
  sceneMap: "查看场景图",
  cancel: "取消",
  filters: "到访筛选",
  searchHint: "试试其他名称或筛选条件。",
  update: "更新地图",
  updating: "正在更新…",
  sceneBrowsing: "正在查看已记录的场景",
  sceneCurrent: "看看你身边的布局",
  sceneEmpty: "这里的布局还没画出来",
  unknownLocation: "还不知道你在哪里",
  sceneUpdateHint: "更新地图后，会结合设定与剧情补齐这里的普通布局。",
  locationUpdateHint: "更新地图后，会根据剧情确认你所在的地方。",
  legend: "世界图展示地区，地区图展示所属场景；场景图展示一个地点的内部布局。地图不按实际比例。",
  legendLabel: "地图图例",
  legendTitle: "读懂这张地图",
  legendCurrent: "你在这里",
  legendPlace: "可探索地点",
  legendRoutes: "路线连接已记录的地点；箭头表示单向通行。"
};
function Ke(e, l) {
  return `${l} 个${fe[e].unit}`;
}
function ut(e, l, o) {
  return `${Ke(e, l)} · ${o} 个${oe.unvisited}`;
}
function dt(e, l) {
  return `查看${l === "all" ? "" : oe[l]}${fe[e].unit}`;
}
var vt = {
  class: "map-landscapes",
  "aria-hidden": "true"
}, pt = ["transform"], ht = {
  class: "map-world-roads",
  "aria-hidden": "true"
}, ft = ["d"], yt = ["d", "marker-end"], mt = ["x", "y"], bt = [
  "transform",
  "aria-label",
  "onClick",
  "onKeydown"
], gt = { transform: "translate(-14 -20)" }, kt = {
  y: "64",
  class: "map-place-name"
}, wt = {
  key: 0,
  y: "89",
  class: "map-place-status"
}, Mt = {
  key: 1,
  y: "89",
  class: "map-place-status"
}, $t = /* @__PURE__ */ U({
  __name: "MapAtlas",
  props: {
    atlas: {},
    scope: {},
    label: {},
    currentLocationKey: {},
    selectedLocationKey: {},
    focusKey: {},
    focusSequence: {}
  },
  emits: ["select"],
  setup(e) {
    const l = e, o = C(() => ct(l.atlas, l.scope)), a = C(() => Me(l.atlas, l.currentLocationKey, l.scope.locations)), i = C(() => o.value.nodes.find((s) => s.location.key === l.focusKey)), u = "map-arrow-" + pe();
    function d(s, v) {
      return s === "water" ? "water" : s === "forest" ? "tree" : s === "mountain" ? "mountain" : ["world", "region"].includes(v) ? "globe" : v === "outdoor" ? "compass" : "building";
    }
    return (s, v) => (r(), Z(Re, {
      "view-box": o.value.viewBox,
      "reset-key": `${e.scope.kind}:${e.scope.region?.key || ""}`,
      label: e.label,
      "focus-point": i.value ? [i.value.x, i.value.y] : void 0,
      "focus-sequence": e.focusSequence
    }, {
      default: Oe(({ unitScale: h }) => [
        n("defs", null, [n("marker", {
          id: u,
          viewBox: "0 0 10 10",
          refX: "16",
          refY: "5",
          markerWidth: "5",
          markerHeight: "5",
          orient: "auto"
        }, [...v[0] || (v[0] = [n("path", {
          d: "M1 1l8 4-8 4z",
          fill: "var(--map-road-ink)"
        }, null, -1)])])]),
        n("g", vt, [(r(!0), c(O, null, D(o.value.nodes, (t) => (r(), c("g", {
          key: t.location.key,
          transform: `translate(${t.x} ${t.y})`,
          class: J(`is-${t.location.terrain || "urban"}`)
        }, [...v[1] || (v[1] = [n("path", { d: "M-108-20Q-100-100-32-94T87-56Q127-13 99 48T21 99Q-57 113-90 65T-108-20Z" }, null, -1), n("path", {
          class: "map-contour",
          d: "M-133-22Q-124-126-39-116T110-70Q156-17 124 60T26 123Q-71 139-112 81T-133-22Z"
        }, null, -1)])], 10, pt))), 128))]),
        n("g", ht, [(r(!0), c(O, null, D(o.value.routes, (t) => (r(), c("g", {
          key: t.link.id,
          class: J({
            "is-path": t.link.kind === "path",
            "is-portal": t.link.kind === "portal"
          })
        }, [
          n("path", {
            class: "map-road-casing",
            d: t.path
          }, null, 8, ft),
          n("path", {
            class: "map-road-line",
            d: t.path,
            "marker-end": t.link.bidirectional ? void 0 : `url(#${u})`
          }, null, 8, yt),
          t.link.label ? (r(), c("text", {
            key: 0,
            x: t.x,
            y: t.y - 14
          }, y(t.link.label), 9, mt)) : k("", !0)
        ], 2))), 128))]),
        (r(!0), c(O, null, D(o.value.nodes, (t) => (r(), c("g", {
          key: t.location.key,
          class: J(["map-place", {
            "is-selected": t.location.key === e.selectedLocationKey,
            "is-current": t.location.key === a.value,
            "is-unvisited": t.location.status !== "visited"
          }]),
          transform: `translate(${t.x} ${t.y}) scale(${h * 0.5})`,
          role: "button",
          tabindex: "0",
          "aria-label": `查看${t.location.name}`,
          onClick: ge((p) => s.$emit("select", t.location.key), ["stop"]),
          onKeydown: [Be(ge((p) => s.$emit("select", t.location.key), ["stop"]), ["enter"]), Be(ge((p) => s.$emit("select", t.location.key), ["stop", "prevent"]), ["space"])]
        }, [
          v[2] || (v[2] = n("circle", {
            class: "map-pin-halo",
            r: "39"
          }, null, -1)),
          v[3] || (v[3] = n("path", {
            class: "map-pin-body",
            d: "M0 33C-6 25-26 8-26-6a26 26 0 0 1 52 0C26 8 6 25 0 33Z"
          }, null, -1)),
          n("g", gt, [x(j, {
            name: d(t.location.terrain, t.location.scale),
            width: "28",
            height: "28"
          }, null, 8, ["name"])]),
          n("text", kt, y(t.location.name.length > 14 ? t.location.name.slice(0, 13) + "…" : t.location.name), 1),
          t.location.key === a.value ? (r(), c("text", wt, "你在这里")) : t.location.status !== "visited" ? (r(), c("text", Mt, y(f(oe).unvisited), 1)) : k("", !0),
          n("title", null, y(t.location.name) + y(t.location.brief ? " · " + t.location.brief : ""), 1)
        ], 42, bt))), 128))
      ]),
      _: 1
    }, 8, [
      "view-box",
      "reset-key",
      "label",
      "focus-point",
      "focus-sequence"
    ]));
  }
}), _t = $t, ce;
async function ze() {
  if (!ce) {
    const e = [
      "..",
      "..",
      "..",
      "libs",
      "material-symbols",
      "material-symbols-rounded.woff2"
    ].join("/"), l = new URL(e, import.meta.url);
    ce = new FontFace("Xiaobai Map Symbols", `url("${l.href}")`, {
      display: "block",
      weight: "400"
    }).load(), ce.catch(() => {
      ce = void 0;
    });
  }
  document.fonts.add(await ce);
}
var Pl = Object.freeze([
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
]), Al = Object.freeze([
  "rect",
  "circle",
  "path",
  "curve",
  "icon",
  "label"
]), El = Object.freeze([
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
]), xt = Object.freeze([
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
]), Bl = Object.freeze([
  "confirmed",
  "inferred",
  "unknown"
]), Ct = Object.freeze([
  {
    name: "Seating and sleeping",
    icons: [
      "chair",
      "stool",
      "bench",
      "sofa",
      "bed"
    ],
    hint: "chair has a back; stool has none; bench is a long shared seat."
  },
  {
    name: "Surfaces and storage",
    icons: [
      "table",
      "counter",
      "shelf",
      "cabinet",
      "chest",
      "barrel"
    ],
    hint: "shelf is open shelving; cabinet is closed storage; chest is a box; barrel covers barrels and jars."
  },
  {
    name: "Kitchen and bathroom",
    icons: [
      "stove",
      "refrigerator",
      "sink",
      "toilet",
      "bathtub"
    ],
    hint: ""
  },
  {
    name: "Equipment and vehicles",
    icons: [
      "terminal",
      "machine",
      "vending-machine",
      "car"
    ],
    hint: "terminal is an operator console; machine is general machinery."
  },
  {
    name: "Site fixtures",
    icons: [
      "column",
      "partition",
      "fence",
      "door-open",
      "ladder",
      "statue",
      "well",
      "fountain",
      "bridge",
      "tent"
    ],
    hint: "partition is a freestanding screen; fence follows a path; door-open is an entrance marker, not evidence of an open door; ladder is a standalone ladder, not stairs or a floor connection."
  },
  {
    name: "Plants and natural objects",
    icons: [
      "tree",
      "potted-plant",
      "rock"
    ],
    hint: "tree is one tree; a forest is terrain with material forest."
  },
  {
    name: "Lighting and signs",
    icons: [
      "light",
      "fire",
      "flag",
      "sign"
    ],
    hint: "light is a freestanding fixture; light regions use category light without an object icon."
  }
]), Ne = Object.freeze(Ct.flatMap((e) => [...e.icons])), Il = Object.freeze([
  ...Ne,
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
  "marker",
  "player",
  "actor",
  "building",
  "water"
]), Tl = Object.freeze(/* @__PURE__ */ new Set([
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
])), St = Object.freeze({
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
function Ve(e, l) {
  return `url(#${l}-material-${e || "unknown"})`;
}
function jt(e, l) {
  return `url(#${l}-face-${e || "unknown"})`;
}
function de(e) {
  return `color-mix(in srgb, ${St[e]}, var(--map-surface) var(--scene-material-mix))`;
}
var Lt = ["id"], Ot = ["stop-color", "stop-opacity"], Pt = ["stop-color", "stop-opacity"], At = ["stop-color", "stop-opacity"], Et = ["id"], Bt = ["fill", "fill-opacity"], It = {
  fill: "none",
  stroke: "var(--scene-shadow)",
  "stroke-width": ".65",
  opacity: ".24"
}, Tt = {
  key: 1,
  d: "M0 0H48V32H0ZM19 0V17M0 17H48M36 17V32M3 3h12m8 0h21"
}, Ht = {
  key: 2,
  d: "M0 0H48V32H0ZM24 0V32M0 16H48M12 4l5 4-5 4-5-4ZM36 20l5 4-5 4-5-4Z"
}, Rt = {
  key: 3,
  d: "M-3 3 8 11l17 2 9 10 18 3M27-3l-8 12 3 8-7 17",
  opacity: ".65"
}, Kt = {
  key: 4,
  d: "M3 8q6 3 13 0M25 25q7 2 17-1",
  stroke: "var(--scene-highlight)",
  "stroke-width": "1.3",
  opacity: "1"
}, zt = {
  key: 5,
  d: "M5 32 37 0M12 32 44 0",
  stroke: "var(--scene-highlight)",
  "stroke-width": "2.2"
}, Nt = {
  key: 6,
  d: "M8 15l-2-4m2 4 3-3M36 26l-1-4m1 4 3-3"
}, Vt = {
  key: 7,
  d: "M5 8h1m20-2h2m-12 17h2m23-6h1m-5 12h2",
  "stroke-linecap": "round"
}, qt = {
  key: 8,
  d: "M0 0H48V32H0M0 5H48M0 27H48M5 5v1m38-1v1m-38 20v1m38-1v1"
}, Wt = {
  key: 9,
  d: "M0 5H48M0 13H48M0 21H48M0 29H48M4 0v32m8-32v32m8-32v32m8-32v32m8-32v32m8-32v32",
  opacity: ".55"
}, Dt = {
  key: 10,
  d: "m24 5 8 11-8 11-8-11ZM24 10v12M20 16h8"
}, Ut = {
  key: 11,
  d: "M7 8q12-5 16 6t20 7M4 27l6-3"
}, Zt = {
  key: 12,
  d: "M5 19q5-3 11-1M29 8q6-2 12 1",
  stroke: "var(--scene-highlight)",
  "stroke-width": "1.4"
}, Ft = {
  key: 0,
  d: "M0 1H48",
  stroke: "var(--scene-highlight)",
  "stroke-width": ".7",
  opacity: ".35"
}, Qt = ["id"], Yt = ["id"], Gt = ["transform", "fill"], Xt = /* @__PURE__ */ U({
  __name: "SceneMaterials",
  props: { prefix: {} },
  setup(e) {
    return (l, o) => (r(), c("defs", null, [
      (r(!0), c(O, null, D(f(xt), (a) => (r(), c(O, { key: a }, [n("linearGradient", {
        id: `${e.prefix}-face-${a}`,
        x1: "0",
        y1: "0",
        x2: ".7",
        y2: "1"
      }, [
        n("stop", {
          offset: "0",
          "stop-color": `color-mix(in srgb, ${f(de)(a)}, var(--scene-highlight) 24%)`,
          "stop-opacity": a === "glass" ? 0.35 : 1
        }, null, 8, Ot),
        n("stop", {
          offset: ".52",
          "stop-color": f(de)(a),
          "stop-opacity": a === "glass" ? 0.16 : 1
        }, null, 8, Pt),
        n("stop", {
          offset: "1",
          "stop-color": `color-mix(in srgb, ${f(de)(a)}, var(--scene-shadow) 16%)`,
          "stop-opacity": a === "glass" ? 0.28 : 1
        }, null, 8, At)
      ], 8, Lt), n("pattern", {
        id: `${e.prefix}-material-${a}`,
        width: "48",
        height: "32",
        patternUnits: "userSpaceOnUse",
        class: "scene-texture"
      }, [
        n("rect", {
          width: "48",
          height: "32",
          fill: f(de)(a),
          "fill-opacity": a === "glass" ? 0.4 : 1
        }, null, 8, Bt),
        n("g", It, [a === "wood" ? (r(), c(O, { key: 0 }, [o[0] || (o[0] = n("path", { d: "M0 0H48M0 16H48M19 0V16M37 16V32" }, null, -1)), o[1] || (o[1] = n("path", {
          d: "M3 7Q12 4 26 8T47 7M2 26q10-4 25 0t23-1",
          opacity: ".5"
        }, null, -1))], 64)) : a === "stone" ? (r(), c("path", Tt)) : a === "tile" ? (r(), c("path", Ht)) : a === "marble" ? (r(), c("path", Rt)) : a === "water" ? (r(), c("path", Kt)) : a === "glass" ? (r(), c("path", zt)) : a === "grass" || a === "forest" ? (r(), c("path", Nt)) : a === "dirt" || a === "sand" ? (r(), c("path", Vt)) : a === "metal" ? (r(), c("path", qt)) : [
          "carpet",
          "fabric",
          "bed-sheet",
          "tatami"
        ].includes(a) ? (r(), c("path", Wt)) : a === "rune" ? (r(), c("path", Dt)) : a === "blood" ? (r(), c("path", Ut)) : a === "snow" ? (r(), c("path", Zt)) : k("", !0)]),
        a === "wood" || a === "stone" || a === "metal" ? (r(), c("path", Ft)) : k("", !0)
      ], 8, Et)], 64))), 128)),
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
      ])], 8, Qt),
      (r(), c(O, null, D(3, (a) => n("symbol", {
        id: `${e.prefix}-crown-${a - 1}`,
        key: a,
        viewBox: "0 0 100 100"
      }, [n("g", {
        transform: `rotate(${a * 37} 50 50)`,
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
      ])], 8, Gt)], 8, Yt)), 64))
    ]));
  }
}), Jt = Xt, ea = /* @__PURE__ */ new Set([
  "water",
  "terrain",
  "furniture",
  "decoration",
  "danger",
  "magic",
  "secret",
  "light"
]), ta = new Set(Ne), aa = /* @__PURE__ */ new Set([
  "chair",
  "table",
  "bed",
  "counter",
  "shelf",
  "sofa",
  "bridge",
  "tree",
  "rock"
]);
function na(e) {
  return !!e.icon && aa.has(e.icon);
}
var le = (e) => Number(e.toFixed(3)).toString(), ye = (e) => e.geometry.points || [];
function Se(e) {
  return e.shape === "icon" || e.shape === "label" || e.category === "actor" || e.category === "door" || e.kind === "stairs" || e.icon === "stairs" || e.icon === "door-open";
}
function _e(e) {
  return ye(e).length >= 3 && (e.closed ?? ea.has(e.category));
}
function me(e) {
  return e.category === "wall" || e.category === "grid" || e.icon === "fence" && ["path", "curve"].includes(e.shape) ? !1 : e.shape === "rect" || e.shape === "circle" ? !0 : (e.shape === "path" || e.shape === "curve") && _e(e);
}
function qe(e) {
  return ![
    "wall",
    "grid",
    "actor"
  ].includes(e.category) && (e.shape === "rect" || e.shape === "circle") && (e.icon !== void 0 && ta.has(e.icon) || [
    "furniture",
    "decoration",
    "door"
  ].includes(e.category));
}
function Ae(e, l, o) {
  const a = e[o], i = e[(o + 1) % e.length], u = e[o - 1] || (l ? e[e.length - 1] : a), d = e[o + 2] || (l ? e[(o + 2) % e.length] : i), s = (v, h, t) => Math.max(Math.min(h, t), Math.min(Math.max(h, t), v));
  return [[s(a[0] + (i[0] - u[0]) / 6, a[0], i[0]), s(a[1] + (i[1] - u[1]) / 6, a[1], i[1])], [s(i[0] - (d[0] - a[0]) / 6, a[0], i[0]), s(i[1] - (d[1] - a[1]) / 6, a[1], i[1])]];
}
function Hl(e) {
  if (e.shape === "rect") {
    const { x: u, y: d, width: s, height: v } = e.geometry;
    return {
      points: [
        [u, d],
        [u + s, d],
        [u + s, d + v],
        [u, d + v]
      ],
      closed: !0
    };
  }
  if (e.shape === "circle") {
    const { x: u, y: d, radius: s } = e.geometry;
    return {
      points: Array.from({ length: 64 }, (v, h) => [u + s * Math.cos(h * Math.PI / 32), d + s * Math.sin(h * Math.PI / 32)]),
      closed: !0
    };
  }
  if (e.shape !== "path" && e.shape !== "curve") return {
    points: [],
    closed: !1
  };
  const l = ye(e), o = _e(e), a = (u) => u.map((d) => Number(le(d)));
  if (e.shape === "path" || l.length < 2) return {
    points: l.map(a),
    closed: o
  };
  const i = [a(l[0])];
  for (let u = 0; u < l.length - (o ? 0 : 1); u += 1) {
    const d = a(l[u]), s = a(l[(u + 1) % l.length]), [v, h] = Ae(l, o, u).map(a);
    for (let t = 1; t <= 12; t += 1) {
      const p = t / 12, m = 1 - p;
      i.push([0, 1].map((M) => m ** 3 * d[M] + 3 * m ** 2 * p * v[M] + 3 * m * p ** 2 * h[M] + p ** 3 * s[M]));
    }
  }
  return o && i.pop(), {
    points: i,
    closed: o
  };
}
function la(e) {
  if (e.shape === "rect") {
    const { x: u, y: d, width: s, height: v } = e.geometry;
    return `M ${u} ${d} h ${s} v ${v} h ${-s} Z`;
  }
  if (e.shape === "circle") {
    const { x: u, y: d, radius: s } = e.geometry;
    return `M ${u - s} ${d} a ${s} ${s} 0 1 0 ${s * 2} 0 a ${s} ${s} 0 1 0 ${-s * 2} 0 Z`;
  }
  const l = ye(e);
  if (l.length < 2) return "";
  const o = _e(e);
  if (e.shape === "path") return `M ${l.map(([u, d]) => `${le(u)} ${le(d)}`).join(" L ")}${o ? " Z" : ""}`;
  const a = [`M ${l[0].map(le).join(" ")}`], i = l.length;
  for (let u = 0; u < i - (o ? 0 : 1); u += 1) {
    const [d, s] = Ae(l, o, u), v = l[(u + 1) % i];
    a.push(`C ${d.map(le).join(" ")}, ${s.map(le).join(" ")}, ${v.map(le).join(" ")}`);
  }
  return a.join(" ") + (o ? " Z" : "");
}
function ie(e) {
  if (e.shape === "rect") return { ...e.geometry };
  if (e.shape === "circle") {
    const { x: i, y: u, radius: d } = e.geometry;
    return {
      x: i - d,
      y: u - d,
      width: d * 2,
      height: d * 2
    };
  }
  const l = ye(e);
  if (!l.length) {
    const { x: i, y: u } = e.geometry;
    return {
      x: i,
      y: u,
      width: 0,
      height: 0
    };
  }
  const o = l.map((i) => i[0]), a = l.map((i) => i[1]);
  return {
    x: Math.min(...o),
    y: Math.min(...a),
    width: Math.max(...o) - Math.min(...o),
    height: Math.max(...a) - Math.min(...a)
  };
}
function oa(e) {
  if (!e.rotation) return;
  const l = ie(e);
  return `rotate(${e.rotation} ${l.x + l.width / 2} ${l.y + l.height / 2})`;
}
function Ie(e, l = 1) {
  const o = ie(e), a = [o.x + o.width / 2, o.y + o.height / 2];
  if (e.shape === "label") return a;
  if (Se(e)) return [a[0], a[1] + 23 * l];
  if ((e.category === "terrain" || e.category === "water") && me(e)) return a;
  if (e.shape === "path" || e.shape === "curve") {
    const d = ye(e), s = _e(e), v = d.length - (s ? 0 : 1), h = Array.from({ length: v }, (V, I) => Math.hypot(d[(I + 1) % d.length][0] - d[I][0], d[(I + 1) % d.length][1] - d[I][1]));
    let t = h.reduce((V, I) => V + I, 0) / 2, p = 0;
    for (; p < h.length - 1 && t > h[p]; )
      t -= h[p], p += 1;
    const m = d[p], M = d[(p + 1) % d.length], A = h[p] ? t / h[p] : 0.5;
    let N = m[0] + (M[0] - m[0]) * A, P = m[1] + (M[1] - m[1]) * A, L = M[0] - m[0], _ = M[1] - m[1];
    if (e.shape === "curve") {
      const [V, I] = Ae(d, s, p), E = 1 - A;
      N = E ** 3 * m[0] + 3 * E ** 2 * A * V[0] + 3 * E * A ** 2 * I[0] + A ** 3 * M[0], P = E ** 3 * m[1] + 3 * E ** 2 * A * V[1] + 3 * E * A ** 2 * I[1] + A ** 3 * M[1], L = 3 * E ** 2 * (V[0] - m[0]) + 6 * E * A * (I[0] - V[0]) + 3 * A ** 2 * (M[0] - I[0]), _ = 3 * E ** 2 * (V[1] - m[1]) + 6 * E * A * (I[1] - V[1]) + 3 * A ** 2 * (M[1] - I[1]);
    }
    const R = Math.hypot(L, _);
    if (!R) return [N, P - 13 * l];
    let q = -_ / R, K = L / R;
    return (K > 0 || K === 0 && q < 0) && (q = -q, K = -K), [N + q * 13 * l, P + K * 13 * l];
  }
  const i = (e.rotation || 0) * Math.PI / 180, u = e.shape === "circle" ? o.height / 2 : (Math.abs(Math.sin(i)) * o.width + Math.abs(Math.cos(i)) * o.height) / 2;
  return [a[0], a[1] + u + 13 * l];
}
function sa(e) {
  let l = 2166136261;
  for (const o of e) l = Math.imul(l ^ o.charCodeAt(0), 16777619);
  return l >>> 0;
}
function ra(e) {
  const l = e.filter((a) => a.category === "terrain" && a.material === "forest" && me(a) && !qe(a)).sort((a, i) => a.id < i.id ? -1 : a.id > i.id ? 1 : 0), o = /* @__PURE__ */ new Map();
  for (let a = 0; a < l.length; a += 1) {
    const i = l[a], u = ie(i), d = Math.floor(256 / l.length) + (a < 256 % l.length ? 1 : 0), s = u.width && u.height ? Math.min(d, Math.max(1, Math.ceil(u.width * u.height / 2704))) : 0, v = Math.min(s, Math.max(1, Math.ceil(Math.sqrt(s * u.width / Math.max(1, u.height))))), h = Math.ceil(s / Math.max(1, v));
    let t = sa(i.id);
    const p = () => (t = Math.imul(t, 1664525) + 1013904223 >>> 0, t / 4294967296), m = [];
    for (let M = 0; M < s; M += 1) m.push({
      x: u.x + (M % v + 0.5 + (p() - 0.5) * 0.35) * u.width / v,
      y: u.y + (Math.floor(M / v) + 0.5 + (p() - 0.5) * 0.35) * u.height / h,
      size: Math.min(Math.max(u.width / v, u.height / h), Math.min(u.width, u.height)) * (1.25 + p() * 0.35),
      variant: Math.floor(p() * 3)
    });
    o.set(i.id, m);
  }
  return o;
}
var ia = [
  "x",
  "y",
  "width",
  "height"
], ca = {
  key: 0,
  cx: "50",
  cy: "50",
  r: "50"
}, ua = {
  key: 1,
  width: "100",
  height: "100"
}, da = ["clip-path", "fill"], va = {
  key: 0,
  cx: "50",
  cy: "50",
  r: "49",
  class: "scene-object-edge"
}, pa = {
  key: 1,
  x: "1",
  y: "1",
  width: "98",
  height: "98",
  rx: "2",
  class: "scene-object-edge"
}, ha = ["fill"], fa = ["fill"], ya = ["d"], ma = {
  key: 0,
  d: "M9 78H91",
  class: "scene-object-seam"
}, ba = ["x"], ga = /* @__PURE__ */ U({
  __name: "SceneObject",
  props: {
    element: {},
    prefix: {},
    unitScale: {}
  },
  setup(e) {
    const l = e, o = C(() => ie(l.element)), a = C(() => Math.min(o.value.width, o.value.height) / l.unitScale >= 12), i = C(() => l.element.shape === "circle"), u = C(() => l.element.material), d = C(() => jt(u.value, l.prefix)), s = C(() => Ve(u.value, l.prefix)), v = `scene-object-${pe()}`;
    return (h, t) => (r(), c("svg", {
      x: o.value.x,
      y: o.value.y,
      width: o.value.width,
      height: o.value.height,
      viewBox: "0 0 100 100",
      preserveAspectRatio: "none",
      class: "scene-object"
    }, [n("defs", null, [n("clipPath", { id: v }, [i.value ? (r(), c("circle", ca)) : (r(), c("rect", ua))])]), n("g", {
      "clip-path": `url(#${v})`,
      fill: d.value
    }, [i.value ? (r(), c("circle", va)) : (r(), c("rect", pa)), a.value ? (r(), c(O, { key: 2 }, [i.value ? (r(), c("circle", {
      key: 0,
      cx: "50",
      cy: "50",
      r: "44",
      fill: s.value,
      class: "scene-object-inset"
    }, null, 8, ha)) : (r(), c("rect", {
      key: 1,
      x: "5",
      y: "5",
      width: "90",
      height: "90",
      rx: "2",
      fill: s.value,
      class: "scene-object-inset"
    }, null, 8, fa)), e.element.icon === "table" || e.element.icon === "counter" ? (r(), c(O, { key: 2 }, [n("path", {
      d: i.value ? "M18 36A35 35 0 0 1 72 22" : "M8 13V8H92",
      class: "scene-object-shine"
    }, null, 8, ya), e.element.icon === "counter" ? (r(), c("path", ma)) : k("", !0)], 64)) : e.element.icon === "chair" ? (r(), c(O, { key: 3 }, [
      t[0] || (t[0] = n("rect", {
        x: "12",
        y: "29",
        width: "76",
        height: "61",
        rx: "9",
        class: "scene-object-inset"
      }, null, -1)),
      t[1] || (t[1] = n("rect", {
        x: "7",
        y: "5",
        width: "86",
        height: "23",
        rx: "6",
        class: "scene-object-edge"
      }, null, -1)),
      t[2] || (t[2] = n("path", {
        d: "M16 12H84",
        class: "scene-object-shine"
      }, null, -1))
    ], 64)) : e.element.icon === "bed" ? (r(), c(O, { key: 4 }, [
      t[3] || (t[3] = n("rect", {
        x: "10",
        y: "12",
        width: "80",
        height: "79",
        rx: "5",
        class: "scene-object-inset"
      }, null, -1)),
      t[4] || (t[4] = n("rect", {
        x: "20",
        y: "17",
        width: "60",
        height: "20",
        rx: "7",
        class: "scene-object-inset"
      }, null, -1)),
      t[5] || (t[5] = n("path", {
        d: "M12 45H88M17 82H83",
        class: "scene-object-seam"
      }, null, -1)),
      t[6] || (t[6] = n("path", {
        d: "M18 49H82",
        class: "scene-object-shine"
      }, null, -1))
    ], 64)) : e.element.icon === "shelf" ? (r(), c(O, { key: 5 }, [t[7] || (t[7] = n("path", {
      d: "M8 32H92M8 66H92M40 8V32M65 32V66M35 66V92",
      class: "scene-object-seam"
    }, null, -1)), t[8] || (t[8] = n("path", {
      d: "M8 34H92M8 68H92",
      class: "scene-object-shine"
    }, null, -1))], 64)) : e.element.icon === "sofa" ? (r(), c(O, { key: 6 }, [
      t[9] || (t[9] = n("rect", {
        x: "8",
        y: "5",
        width: "84",
        height: "25",
        rx: "7",
        class: "scene-object-inset"
      }, null, -1)),
      (r(), c(O, null, D(3, (p) => n("rect", {
        key: p,
        x: 15 + (p - 1) * 24,
        y: "32",
        width: "22",
        height: "57",
        rx: "5",
        class: "scene-object-inset"
      }, null, 8, ba)), 64)),
      t[10] || (t[10] = n("rect", {
        x: "3",
        y: "23",
        width: "11",
        height: "70",
        rx: "4",
        class: "scene-object-inset"
      }, null, -1)),
      t[11] || (t[11] = n("rect", {
        x: "86",
        y: "23",
        width: "11",
        height: "70",
        rx: "4",
        class: "scene-object-inset"
      }, null, -1))
    ], 64)) : e.element.icon === "bridge" ? (r(), c(O, { key: 7 }, [t[12] || (t[12] = n("path", {
      d: "M7 7V93M93 7V93M9 20H91M9 35H91M9 50H91M9 65H91M9 80H91",
      class: "scene-object-seam"
    }, null, -1)), t[13] || (t[13] = n("path", {
      d: "M11 7V93M89 7V93",
      class: "scene-object-shine"
    }, null, -1))], 64)) : e.element.icon === "tree" ? (r(), c(O, { key: 8 }, [t[14] || (t[14] = Qe('<circle cx="34" cy="32" r="24" class="scene-object-inset"></circle><circle cx="69" cy="36" r="24" class="scene-object-inset"></circle><circle cx="30" cy="62" r="23" class="scene-object-inset"></circle><circle cx="64" cy="67" r="25" class="scene-object-inset"></circle><circle cx="49" cy="48" r="26" class="scene-object-inset"></circle><path d="M21 24q10-10 22-4M36 41q8-9 22-6M64 56q8-1 13 5" class="scene-object-shine"></path>', 6))], 64)) : e.element.icon === "rock" ? (r(), c(O, { key: 9 }, [t[15] || (t[15] = n("path", {
      d: "M8 38 33 12 76 18 93 57 71 88 25 86ZM33 12 41 44 8 38M41 44 76 18M41 44 71 88M41 44 93 57",
      class: "scene-object-seam"
    }, null, -1)), t[16] || (t[16] = n("path", {
      d: "M12 38 33 17 72 22",
      class: "scene-object-shine"
    }, null, -1))], 64)) : k("", !0)], 64)) : k("", !0)], 8, da)], 8, ia));
  }
}), ka = ga, Te = {
  chair: "椅",
  stool: "凳",
  bench: "长凳",
  sofa: "沙发",
  bed: "床",
  table: "桌",
  counter: "台",
  shelf: "架",
  cabinet: "柜",
  chest: "箱",
  barrel: "桶",
  stove: "灶",
  refrigerator: "冰箱",
  sink: "水槽",
  toilet: "厕",
  bathtub: "浴缸",
  terminal: "终端",
  machine: "机械",
  "vending-machine": "售货",
  car: "车",
  column: "柱",
  partition: "屏风",
  fence: "围栏",
  "door-open": "门",
  ladder: "梯",
  statue: "雕像",
  well: "井",
  fountain: "喷泉",
  bridge: "桥",
  tent: "帐篷",
  tree: "树",
  "potted-plant": "盆栽",
  rock: "石",
  light: "灯",
  fire: "火",
  flag: "旗",
  sign: "牌"
}, wa = Object.freeze({
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
}), Ma = Object.freeze({
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
}), $a = Object.freeze({
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
}), _a = Object.freeze({
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
}), xa = Object.freeze({
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
  water: "water_drop",
  stool: "chair_alt",
  bench: "event_seat",
  cabinet: "kitchen",
  barrel: "propane_tank",
  stove: "oven_gen",
  refrigerator: "kitchen",
  sink: "countertops",
  toilet: "wc",
  bathtub: "bathtub",
  terminal: "computer",
  machine: "precision_manufacturing",
  "vending-machine": "point_of_sale",
  car: "directions_car",
  column: "account_balance",
  partition: "view_column",
  fence: "fence",
  ladder: "format_line_spacing",
  statue: "architecture",
  well: "water_pump",
  fountain: "water",
  tent: "camping",
  "potted-plant": "potted_plant",
  flag: "flag",
  sign: "signpost"
}), Ca = Object.freeze({
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
}), je = Object.freeze({
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
}), We = Object.freeze({
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
}), De = Object.freeze({
  world: "世界",
  region: fe.world.unit,
  city: "城市",
  district: "街区",
  building: "建筑",
  floor: "楼层",
  room: "房间",
  outdoor: "户外"
}), Sa = Object.freeze({
  door: "门",
  stairs: "楼梯",
  elevator: "电梯",
  path: "小径",
  road: "道路",
  portal: "传送门",
  passage: "通道"
});
function ja(e, l) {
  return e < l ? -1 : e > l ? 1 : 0;
}
function La(e, l) {
  const o = wa[e.category], a = me(e), i = a && (e.material || e.category === "water") ? Ve(e.material || "water", l) : "", u = e.certainty === "inferred" ? "8 6" : e.certainty === "unknown" ? "3 7" : o.dash;
  return {
    ...o,
    fill: a ? i || o.fill : "none",
    opacity: e.certainty === "unknown" ? 0.48 : e.certainty === "inferred" ? 0.72 : 1,
    dash: u,
    icon: e.icon ? xa[e.icon] : e.kind ? $a[e.kind] : Ca[e.category],
    fallback: e.kind ? _a[e.kind] : e.icon && Object.hasOwn(Te, e.icon) ? Te[e.icon] : Ma[e.category].slice(0, 1),
    z: je[e.category]
  };
}
function Oa(e) {
  const l = (o) => {
    if (!me(o)) return 0;
    const a = ie(o);
    return a.width * a.height;
  };
  return [...e].sort((o, a) => je[o.category] - je[a.category] || l(a) - l(o) || ja(o.id, a.id));
}
var Pa = ["data-element", "opacity"], Aa = ["transform"], Ea = ["d"], Ba = ["d", "stroke-width"], Ia = [
  "d",
  "fill",
  "stroke",
  "stroke-width",
  "stroke-dasharray",
  "stroke-linecap"
], Ta = [
  "d",
  "stroke",
  "stroke-opacity",
  "stroke-dasharray"
], Ha = ["transform"], Ra = ["id"], Ka = ["d"], za = ["clip-path"], Na = [
  "href",
  "x",
  "y",
  "width",
  "height"
], Va = ["transform"], qa = {
  key: 0,
  r: "19",
  class: "scene-player-halo"
}, Wa = ["stroke"], Da = {
  key: 1,
  class: "map-material-symbol",
  "aria-hidden": "true"
}, Ua = {
  key: 2,
  class: "map-symbol-fallback",
  "aria-hidden": "true"
}, Za = ["x", "y"], Fa = /* @__PURE__ */ U({
  __name: "MapScene",
  props: { scene: {} },
  setup(e) {
    const l = e, o = H(!1);
    $e(() => {
      ze().then(() => {
        o.value = !0;
      }).catch(() => {
        o.value = !1;
      });
    });
    const a = `xiaobai-map-scene-${pe()}`, i = C(() => We[l.scene.mood || "neutral"]), u = C(() => ra(l.scene.elements)), d = C(() => Oa(l.scene.elements).map((s, v) => ({
      element: s,
      bounds: ie(s),
      path: la(s),
      transform: oa(s),
      area: me(s),
      presentation: La(s, a),
      clipId: `${a}-area-${v}`,
      object: qe(s) && !Se(s),
      marker: Se(s) && s.shape !== "label"
    })));
    return (s, v) => (r(), Z(Re, {
      class: "map-scene-viewport",
      style: be({ "--scene-glow": i.value.glow }),
      "view-box": e.scene.viewBox,
      "reset-key": e.scene.key,
      label: `${e.scene.name} 场景地图`
    }, {
      default: Oe(({ unitScale: h }) => [
        x(Jt, { prefix: a }),
        (r(!0), c(O, null, D(d.value, (t) => (r(), c("g", {
          key: t.element.id,
          class: J(["map-scene-element", [`is-${t.element.category}`, `is-${t.element.certainty || "confirmed"}`]]),
          "data-element": t.element.id,
          opacity: t.presentation.opacity
        }, [n("g", { transform: t.transform }, [
          t.object ? (r(), Z(ka, {
            key: 0,
            element: t.element,
            prefix: a,
            "unit-scale": h
          }, null, 8, ["element", "unit-scale"])) : t.path ? (r(), c(O, { key: 1 }, [
            t.element.category === "wall" ? (r(), c("path", {
              key: 0,
              d: t.path,
              fill: "none",
              stroke: "var(--scene-shadow)",
              "stroke-width": "9",
              opacity: ".18",
              "stroke-linejoin": "round",
              "vector-effect": "non-scaling-stroke"
            }, null, 8, Ea)) : k("", !0),
            t.element.category === "road" && !t.area ? (r(), c("path", {
              key: 1,
              d: t.path,
              fill: "none",
              stroke: "var(--scene-soft-edge)",
              "stroke-width": t.presentation.width + 2,
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "vector-effect": "non-scaling-stroke"
            }, null, 8, Ba)) : k("", !0),
            n("path", {
              d: t.path,
              fill: t.presentation.fill,
              stroke: t.presentation.stroke,
              "stroke-width": t.presentation.width,
              "stroke-dasharray": t.presentation.dash,
              "stroke-linejoin": "round",
              "stroke-linecap": t.element.category === "wall" ? "butt" : "round",
              "fill-rule": "evenodd",
              "vector-effect": "non-scaling-stroke"
            }, null, 8, Ia),
            t.element.category === "wall" ? (r(), c("path", {
              key: 2,
              d: t.path,
              fill: "none",
              stroke: t.element.material ? f(de)(t.element.material) : "var(--scene-wall)",
              "stroke-width": "3.5",
              "stroke-opacity": t.element.material === "glass" ? 0.4 : 1,
              "stroke-dasharray": t.presentation.dash,
              "stroke-linejoin": "round",
              "vector-effect": "non-scaling-stroke"
            }, null, 8, Ta)) : k("", !0)
          ], 64)) : k("", !0),
          t.object && !f(na)(t.element) && Math.min(t.bounds.width, t.bounds.height) / h >= 12 ? (r(), c("g", {
            key: 2,
            transform: `translate(${t.bounds.x + t.bounds.width / 2} ${t.bounds.y + t.bounds.height / 2})`,
            "aria-hidden": "true"
          }, [n("text", {
            class: J(o.value ? "map-material-symbol" : "map-symbol-fallback"),
            style: be({
              fontSize: `${Math.min(22 * h, Math.min(t.bounds.width, t.bounds.height) * 0.65)}px`,
              fill: "var(--scene-edge)",
              textAnchor: "middle",
              dominantBaseline: "central"
            })
          }, y(o.value ? t.presentation.icon : t.presentation.fallback), 7)], 8, Ha)) : k("", !0),
          u.value.has(t.element.id) ? (r(), c(O, { key: 3 }, [n("defs", null, [n("clipPath", { id: t.clipId }, [n("path", {
            d: t.path,
            "clip-rule": "evenodd"
          }, null, 8, Ka)], 8, Ra)]), n("g", {
            "clip-path": `url(#${t.clipId})`,
            class: "scene-forest-decoration",
            "aria-hidden": "true"
          }, [(r(!0), c(O, null, D(u.value.get(t.element.id), (p, m) => (r(), c("use", {
            key: m,
            href: `#${a}-crown-${p.variant}`,
            x: p.x - p.size / 2,
            y: p.y - p.size / 2,
            width: p.size,
            height: p.size
          }, null, 8, Na))), 128))], 8, za)], 64)) : k("", !0)
        ], 8, Aa), t.marker ? (r(), c("g", {
          key: 0,
          class: "map-scene-icon",
          transform: `translate(${t.bounds.x + t.bounds.width / 2} ${t.bounds.y + t.bounds.height / 2}) scale(${h})`
        }, [
          t.element.actorKey === "player" || t.element.kind === "player" ? (r(), c("circle", qa)) : k("", !0),
          n("circle", {
            r: "11",
            stroke: t.presentation.stroke
          }, null, 8, Wa),
          o.value ? (r(), c("text", Da, y(t.presentation.icon), 1)) : (r(), c("text", Ua, y(t.presentation.fallback), 1))
        ], 8, Va)) : k("", !0)], 10, Pa))), 128)),
        n("g", {
          class: "scene-labels",
          style: be({ "--scene-unit-scale": h })
        }, [(r(!0), c(O, null, D(d.value, (t) => (r(), c(O, { key: t.element.id }, [t.element.label ? (r(), c("text", {
          key: 0,
          class: J(["map-scene-label", { "is-primary": t.element.shape === "label" }]),
          x: f(Ie)(t.element, h)[0],
          y: f(Ie)(t.element, h)[1]
        }, y(t.element.label), 11, Za)) : k("", !0)], 64))), 128))], 4)
      ]),
      _: 1
    }, 8, [
      "style",
      "view-box",
      "reset-key",
      "label"
    ]));
  }
}), Qa = Fa, Ya = {
  key: 0,
  class: "map-3d-loading",
  role: "status"
}, Ga = {
  class: "map-viewport-controls",
  "aria-label": "三维视角"
}, Xa = /* @__PURE__ */ U({
  __name: "MapScene3D",
  props: {
    scene: {},
    lowWalls: { type: Boolean },
    showLabels: { type: Boolean }
  },
  emits: ["fallback"],
  setup(e, { emit: l }) {
    const o = e, a = l, i = H(null), u = H(null), d = H(!0);
    let s, v = !1;
    return $e(async () => {
      v = !0;
      try {
        const { createThreeRuntime: h } = await import("./xiaobai-os-three-runtime-BxKgrCpY.js");
        if (!v) return;
        s = h(i.value, u.value, { fallback: (t) => a("fallback", t) }), s.setScene(o.scene), s.walls(o.lowWalls), s.labels(o.showLabels), d.value = !1, ze().then(() => {
          v && s?.symbols(!0);
        }).catch(() => {
        });
      } catch {
        v && a("fallback", "当前设备无法打开三维，已切换二维。");
      }
    }), ee(() => o.scene, (h) => s?.setScene(h)), ee(() => o.lowWalls, (h) => s?.walls(h)), ee(() => o.showLabels, (h) => s?.labels(h)), Le(() => {
      v = !1, s?.dispose(), s = void 0;
    }), (h, t) => (r(), c("div", {
      ref_key: "host",
      ref: i,
      class: "map-scene-three",
      style: be({ "--scene-glow": f(We)[e.scene.mood || "neutral"].glow })
    }, [
      n("div", {
        ref_key: "labelHost",
        ref: u,
        class: "map-3d-labels"
      }, null, 512),
      d.value ? (r(), c("div", Ya, "正在打开三维…")) : k("", !0),
      n("div", Ga, [
        n("button", {
          type: "button",
          "aria-label": "放大三维",
          onClick: t[0] || (t[0] = (p) => f(s)?.zoom(1.2))
        }, "+"),
        n("button", {
          type: "button",
          "aria-label": "缩小三维",
          onClick: t[1] || (t[1] = (p) => f(s)?.zoom(1 / 1.2))
        }, "−"),
        n("button", {
          type: "button",
          class: "map-fit",
          "aria-label": "重置三维视角",
          onClick: t[2] || (t[2] = (p) => f(s)?.fit())
        }, "全图")
      ])
    ], 4));
  }
}), Ja = Xa, en = ["aria-label"], tn = {
  key: 0,
  class: "map-scene-toolbar"
}, an = ["aria-label"], nn = ["aria-pressed"], ln = ["aria-pressed", "disabled"], on = ["aria-pressed"], sn = ["aria-pressed"], rn = { class: "map-scene-stage" }, cn = /* @__PURE__ */ U({
  __name: "MapSceneView",
  props: /* @__PURE__ */ we({
    scene: {},
    mode: {},
    threeUnavailable: { type: Boolean },
    compact: { type: Boolean }
  }, {
    lowWalls: {
      type: Boolean,
      default: !1
    },
    lowWallsModifiers: {},
    showLabels: {
      type: Boolean,
      default: !0
    },
    showLabelsModifiers: {}
  }),
  emits: /* @__PURE__ */ we(["update:mode", "fallback"], ["update:lowWalls", "update:showLabels"]),
  setup(e, { emit: l }) {
    const o = l, a = ve(e, "lowWalls"), i = ve(e, "showLabels");
    return (u, d) => (r(), c("section", {
      class: "map-scene-view",
      "aria-label": e.scene.name
    }, [e.compact ? k("", !0) : (r(), c("div", tn, [
      n("div", {
        class: "map-render-switch",
        role: "group",
        "aria-label": f(G).mode
      }, [n("button", {
        type: "button",
        "aria-pressed": e.mode === "2d",
        onClick: d[0] || (d[0] = (s) => o("update:mode", "2d"))
      }, y(f(G).two), 9, nn), n("button", {
        type: "button",
        "aria-pressed": e.mode === "3d",
        disabled: e.threeUnavailable,
        onClick: d[1] || (d[1] = (s) => o("update:mode", "3d"))
      }, y(f(G).three), 9, ln)], 8, an),
      e.mode === "3d" ? (r(), c("button", {
        key: 0,
        type: "button",
        "aria-pressed": a.value,
        onClick: d[2] || (d[2] = (s) => a.value = !a.value)
      }, y(f(G).lowWalls), 9, on)) : k("", !0),
      e.mode === "3d" ? (r(), c("button", {
        key: 1,
        type: "button",
        "aria-pressed": i.value,
        onClick: d[3] || (d[3] = (s) => i.value = !i.value)
      }, y(f(G).labels), 9, sn)) : k("", !0)
    ])), n("div", rn, [Pe(x(Qa, { scene: e.scene }, null, 8, ["scene"]), [[He, e.mode === "2d"]]), e.mode === "3d" ? (r(), Z(Ja, {
      key: 0,
      scene: e.scene,
      "low-walls": a.value,
      "show-labels": i.value,
      onFallback: d[4] || (d[4] = (s) => o("fallback", s))
    }, null, 8, [
      "scene",
      "low-walls",
      "show-labels"
    ])) : k("", !0)])], 8, en));
  }
}), un = cn, dn = { class: "map-legend-content" }, vn = /* @__PURE__ */ U({
  __name: "MapLegend",
  setup(e) {
    return (l, o) => (r(), c("div", dn, [
      n("strong", null, y(f(B).legendTitle), 1),
      n("p", null, [
        o[0] || (o[0] = n("i", { class: "map-key-current" }, null, -1)),
        W(y(f(B).legendCurrent) + " ", 1),
        o[1] || (o[1] = n("i", { class: "map-key-place" }, null, -1)),
        W(y(f(B).legendPlace), 1)
      ]),
      n("p", null, y(f(B).legendRoutes), 1),
      n("small", null, y(f(B).legend), 1)
    ]));
  }
}), Ue = vn, pn = ["aria-label"], hn = [
  "aria-label",
  "aria-pressed",
  "onClick"
], fn = ["aria-label", "aria-expanded"], yn = ["aria-label"], mn = {
  key: 0,
  class: "map-projection-scene-options"
}, bn = ["aria-label"], gn = ["aria-pressed"], kn = ["aria-pressed", "disabled"], wn = {
  key: 0,
  class: "map-projection-toggles"
}, Mn = ["aria-pressed"], $n = ["aria-pressed"], _n = ["disabled"], xn = ["aria-expanded"], Cn = /* @__PURE__ */ U({
  __name: "MapProjectionControls",
  props: /* @__PURE__ */ we({
    view: {},
    sceneAvailable: { type: Boolean },
    threeUnavailable: { type: Boolean },
    located: { type: Boolean }
  }, {
    mode: { required: !0 },
    modeModifiers: {},
    lowWalls: {
      type: Boolean,
      required: !0
    },
    lowWallsModifiers: {},
    showLabels: {
      type: Boolean,
      required: !0
    },
    showLabelsModifiers: {}
  }),
  emits: /* @__PURE__ */ we(["navigate", "locate"], [
    "update:mode",
    "update:lowWalls",
    "update:showLabels"
  ]),
  setup(e, { emit: l }) {
    const o = e, a = l, i = ve(e, "mode"), u = ve(e, "lowWalls"), d = ve(e, "showLabels"), s = H(!1), v = H(!1), h = H(null), t = H(null), p = `map-projection-options-${pe()}`;
    function m() {
      s.value = !1, v.value = !1;
    }
    function M(N) {
      h.value?.contains(N.target) || m();
    }
    function A(N) {
      N.key !== "Escape" || !s.value || (N.preventDefault(), N.stopPropagation(), m(), t.value?.focus({ preventScroll: !0 }));
    }
    return ee(() => o.view, m), $e(() => document.addEventListener("pointerdown", M)), Le(() => document.removeEventListener("pointerdown", M)), (N, P) => (r(), c("div", {
      ref_key: "root",
      ref: h,
      class: "map-projection-controls",
      onKeydown: A
    }, [
      n("nav", {
        class: "map-projection-tabs",
        "aria-label": f(B).viewLabel
      }, [(r(!0), c(O, null, D(f(ue).views, (L, _) => (r(), c("button", {
        key: _,
        type: "button",
        "aria-label": f(X)[_],
        "aria-pressed": e.view === _,
        onClick: (R) => {
          m(), a("navigate", _);
        }
      }, y(L), 9, hn))), 128))], 8, pn),
      n("button", {
        ref_key: "trigger",
        ref: t,
        type: "button",
        class: "map-projection-options-button",
        "aria-label": f(ue).options,
        "aria-expanded": s.value,
        "aria-controls": p,
        onClick: P[0] || (P[0] = (L) => s.value ? m() : s.value = !0)
      }, [x(j, { name: "more" })], 8, fn),
      s.value ? (r(), c("section", {
        key: 0,
        id: p,
        class: "map-projection-options",
        "aria-label": f(ue).options
      }, [
        e.view === "scene" && e.sceneAvailable ? (r(), c("div", mn, [n("div", {
          class: "map-render-switch",
          role: "group",
          "aria-label": f(G).mode
        }, [n("button", {
          type: "button",
          "aria-pressed": i.value === "2d",
          onClick: P[1] || (P[1] = (L) => i.value = "2d")
        }, y(f(G).two), 9, gn), n("button", {
          type: "button",
          "aria-pressed": i.value === "3d",
          disabled: e.threeUnavailable,
          onClick: P[2] || (P[2] = (L) => i.value = "3d")
        }, y(f(G).three), 9, kn)], 8, bn), i.value === "3d" ? (r(), c("div", wn, [n("button", {
          type: "button",
          "aria-pressed": u.value,
          onClick: P[3] || (P[3] = (L) => u.value = !u.value)
        }, y(f(G).lowWalls), 9, Mn), n("button", {
          type: "button",
          "aria-pressed": d.value,
          onClick: P[4] || (P[4] = (L) => d.value = !d.value)
        }, y(f(G).labels), 9, $n)])) : k("", !0)])) : k("", !0),
        n("button", {
          type: "button",
          disabled: !e.located,
          onClick: P[5] || (P[5] = (L) => {
            a("locate"), m();
          })
        }, [x(j, { name: "locate" }), W(y(f(ue).location), 1)], 8, _n),
        n("button", {
          type: "button",
          "aria-expanded": v.value,
          onClick: P[6] || (P[6] = (L) => v.value = !v.value)
        }, [x(j, { name: "layers" }), W(y(f(B).legendLabel), 1)], 8, xn),
        v.value ? (r(), Z(Ue, { key: 1 })) : k("", !0)
      ], 8, yn)) : k("", !0)
    ], 544));
  }
}), Sn = Cn;
function jn(e) {
  const l = e?.atlas.actors.find((a) => a.actorKey === "player"), o = e?.atlas.locations.find((a) => a.key === l?.locationKey);
  return o?.sceneKey && e?.scenes[o.sceneKey]?.status === "active" ? "scene" : "world";
}
function Ln(e, l) {
  const o = l === null ? void 0 : e.locations.find((s) => s.key === l && te(s)), a = rt(e), i = (l === null ? e.locations.filter(te) : o ? e.locations.filter((s) => st(s) && ke(e, s.key)?.key === o.key) : []).map((s) => a.has(s.key) ? {
    ...s,
    status: "visited"
  } : s), u = l === null ? i.filter((s) => !he(e, s.key).slice(0, -1).some(te)) : [], d = new Set(u.map((s) => s.parent || ""));
  return {
    kind: l === null ? "world" : "region",
    region: o,
    locations: i,
    unvisited: i.filter((s) => s.status !== "visited").length,
    positionParent: o ? o.key : d.size === 1 ? [...d][0] : null
  };
}
function On(e, l, o) {
  const a = l.trim().toLocaleLowerCase();
  return e.locations.filter((i) => [i.name, i.brief].some((u) => u?.toLocaleLowerCase().includes(a)) && (o === "all" || (o === "visited" ? i.status === "visited" : i.status !== "visited")));
}
var Pn = { class: "map-search-input" }, An = ["aria-label", "placeholder"], En = { class: "map-search-scope" }, Bn = ["aria-label"], In = ["aria-pressed", "onClick"], Tn = { class: "map-search-results" }, Hn = ["onClick"], Rn = { class: "map-result-icon" }, Kn = { key: 0 }, zn = {
  key: 0,
  class: "map-search-empty"
}, Nn = /* @__PURE__ */ U({
  __name: "MapSearch",
  props: {
    scope: {},
    title: {},
    initialFilter: {}
  },
  emits: ["close", "select"],
  setup(e) {
    const l = e, o = H(""), a = H(l.initialFilter), i = C(() => fe[l.scope.kind]), u = C(() => [
      {
        id: "all",
        name: i.value.all
      },
      {
        id: "unvisited",
        name: oe.unvisited
      },
      {
        id: "visited",
        name: oe.visited
      }
    ]), d = C(() => On(l.scope, o.value, a.value));
    return (s, v) => (r(), Z(Xe, {
      class: "map-dialog map-search-dialog",
      "aria-label": i.value.search,
      onClose: v[2] || (v[2] = (h) => s.$emit("close"))
    }, {
      default: Oe(() => [
        n("header", Pn, [
          x(j, { name: "search" }),
          Pe(n("input", {
            "onUpdate:modelValue": v[0] || (v[0] = (h) => o.value = h),
            type: "search",
            "aria-label": i.value.search,
            placeholder: i.value.search,
            autofocus: ""
          }, null, 8, An), [[Ge, o.value]]),
          n("button", {
            type: "button",
            onClick: v[1] || (v[1] = (h) => s.$emit("close"))
          }, y(f(B).cancel), 1)
        ]),
        n("h2", En, y(e.title), 1),
        n("nav", {
          class: "map-search-filters",
          "aria-label": f(B).filters
        }, [(r(!0), c(O, null, D(u.value, (h) => (r(), c("button", {
          key: h.id,
          type: "button",
          "aria-pressed": a.value === h.id,
          onClick: (t) => a.value = h.id
        }, y(h.name), 9, In))), 128))], 8, Bn),
        n("div", Tn, [
          n("small", null, y(f(Ke)(e.scope.kind, d.value.length)), 1),
          (r(!0), c(O, null, D(d.value, (h) => (r(), c("button", {
            key: h.key,
            type: "button",
            class: "map-search-result",
            onClick: (t) => s.$emit("select", h.key)
          }, [
            n("span", Rn, [x(j, { name: e.scope.kind === "world" ? "globe" : "pin" }, null, 8, ["name"])]),
            n("span", null, [
              n("strong", null, y(h.name), 1),
              n("small", null, y(f(De)[h.scale]) + " · " + y(f(oe)[h.status === "visited" ? "visited" : "unvisited"]), 1),
              h.brief ? (r(), c("p", Kn, y(h.brief), 1)) : k("", !0)
            ]),
            x(j, { name: "next" })
          ], 8, Hn))), 128)),
          d.value.length ? k("", !0) : (r(), c("div", zn, [
            x(j, { name: "search" }),
            n("h3", null, y(i.value.notFound), 1),
            n("p", null, y(f(B).searchHint), 1)
          ]))
        ])
      ]),
      _: 1
    }, 8, ["aria-label"]));
  }
}), Vn = Nn, qn = {
  class: "map-place-detail",
  "aria-labelledby": "map-place-title"
}, Wn = { id: "map-place-title" }, Dn = { class: "map-place-content" }, Un = {
  key: 0,
  class: "map-place-full-name"
}, Zn = {
  key: 1,
  class: "map-address"
}, Fn = { class: "map-place-intro" }, Qn = { class: "map-place-actions" }, Yn = {
  key: 2,
  class: "map-detail-section"
}, Gn = { class: "map-people" }, Xn = {
  key: 3,
  class: "map-detail-section"
}, Jn = ["onClick"], el = /* @__PURE__ */ U({
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
    const l = e, o = C(() => he(l.map.atlas, l.location.key).slice(0, -1)), a = C(() => te(l.location)), i = C(() => l.map.atlas.actors.filter((d) => d.locationKey === l.location.key)), u = C(() => it(l.map.atlas, l.location.key));
    return (d, s) => (r(), c("section", qn, [
      s[6] || (s[6] = n("div", {
        class: "map-sheet-grip",
        "aria-hidden": "true"
      }, null, -1)),
      n("header", null, [n("div", null, [n("small", null, y(f(De)[e.location.scale]) + " · " + y(e.currentKey === e.location.key ? "当前位置" : f(oe)[e.location.status === "visited" ? "visited" : "unvisited"]), 1), n("h2", Wn, y(e.location.name), 1)]), n("button", {
        type: "button",
        class: "map-round-button",
        "aria-label": "关闭地点详情",
        onClick: s[0] || (s[0] = (v) => d.$emit("close"))
      }, [x(j, { name: "close" })])]),
      n("div", Dn, [
        e.location.name.length > 24 ? (r(), c("p", Un, y(e.location.name), 1)) : k("", !0),
        o.value.length ? (r(), c("p", Zn, [x(j, { name: "pin" }), W(y(o.value.map((v) => v.name).join(" · ")), 1)])) : k("", !0),
        n("p", Fn, y(e.location.brief || "这个地点已记录在世界地图上，更多介绍等待故事展开。"), 1),
        n("div", Qn, [a.value ? (r(), c("button", {
          key: 0,
          type: "button",
          class: "map-primary-button",
          onClick: s[1] || (s[1] = (v) => d.$emit("explore"))
        }, [x(j, { name: "compass" }), W(y(f(B).regionMap), 1)])) : (r(), c("button", {
          key: 1,
          type: "button",
          class: "map-secondary-button",
          onClick: s[2] || (s[2] = (v) => d.$emit("scene"))
        }, [x(j, { name: "layers" }), W(y(f(B).sceneMap), 1)]))]),
        i.value.length ? (r(), c("section", Yn, [s[3] || (s[3] = n("h3", null, "记录在这里的人物", -1)), n("p", Gn, [(r(!0), c(O, null, D(i.value, (v) => (r(), c("span", { key: v.actorKey }, [x(j, { name: "person" }), W(y(v.displayName), 1)]))), 128))])])) : k("", !0),
        u.value.length ? (r(), c("section", Xn, [s[4] || (s[4] = n("h3", null, "相连的地方", -1)), (r(!0), c(O, null, D(u.value, (v) => (r(), c("button", {
          key: v.link.id,
          type: "button",
          class: "map-connection",
          onClick: (h) => d.$emit("select", v.location.key)
        }, [
          x(j, { name: "route" }),
          n("span", null, [n("strong", null, y(v.location.name), 1), n("small", null, y(v.link.label || f(Sa)[v.link.kind]) + y(v.link.bidirectional ? "" : v.outgoing ? " · 单向前往" : " · 仅可从对面到达"), 1)]),
          x(j, { name: "next" })
        ], 8, Jn))), 128))])) : k("", !0),
        s[5] || (s[5] = n("p", { class: "map-detail-footnote" }, "查看地图不会改变你在故事中的位置", -1))
      ])
    ]));
  }
}), tl = el, al = { class: "map-top" }, nl = { class: "map-search-bar" }, ll = ["disabled"], ol = {
  key: 1,
  class: "map-search-entry"
}, sl = {
  key: 0,
  class: "map-view-row"
}, rl = ["aria-label"], il = ["aria-pressed"], cl = ["aria-pressed"], ul = ["aria-pressed"], dl = {
  key: 0,
  class: "map-scene-tools"
}, vl = ["aria-expanded", "aria-label"], pl = ["aria-label"], hl = ["aria-current"], fl = { "aria-current": "page" }, yl = {
  key: 1,
  class: "map-notice",
  role: "status"
}, ml = {
  key: 1,
  class: "map-empty"
}, bl = {
  key: 2,
  class: "map-empty"
}, gl = { class: "map-empty" }, kl = ["disabled"], wl = ["aria-expanded", "aria-label"], Ml = {
  key: 2,
  class: "map-key"
}, $l = ["aria-label"], _l = { class: "map-region-icon" }, xl = {
  class: "map-round-button",
  "aria-hidden": "true"
}, Cl = {
  key: 5,
  class: "map-scene-caption"
}, Sl = ["title"], jl = /* @__PURE__ */ U({
  __name: "MapBrowser",
  props: {
    map: {},
    chatIdentity: {},
    compact: { type: Boolean }
  },
  setup(e) {
    const l = e, o = `map-browse-summary-${pe()}`, a = H(""), i = () => jn(l.map) === "scene" ? {
      kind: "scene",
      key: ""
    } : { kind: "world" }, u = H(i()), d = H("3d"), s = H(!1), v = H(!0), h = H(!1), t = H("");
    let p = !1;
    const m = C(() => u.value.kind === "scene"), M = C(() => u.value.kind === "scene" ? u.value.key : ""), A = H(""), N = H(0), P = H(null), L = H(!1), _ = C(() => l.map?.atlas), R = C(() => _.value?.actors.find(($) => $.actorKey === "player")?.locationKey || ""), q = C(() => _.value?.locations.find(($) => $.key === R.value)), K = C(() => _.value?.locations.find(($) => $.key === (M.value || R.value))), V = C(() => m.value && K.value?.sceneKey ? l.map?.scenes[K.value.sceneKey] : void 0), I = C(() => {
      if (!_.value || u.value.kind === "world") return;
      const $ = u.value.key || R.value;
      return ke(_.value, $);
    }), E = C(() => Ln(_.value || {
      locations: [],
      links: [],
      actors: []
    }, u.value.kind === "world" ? null : I.value?.key || "")), F = C(() => E.value.locations.find(($) => $.key === a.value)), g = C(() => E.value.kind === "world" ? X.world : I.value?.name || B.unknownRegion), S = C(() => fe[E.value.kind]), T = C(() => E.value.unvisited ? "unvisited" : "all");
    ee(() => ({
      map: l.map,
      chatIdentity: l.chatIdentity
    }), ($, b) => {
      const w = $.chatIdentity !== b.chatIdentity;
      (w || !$.map?.atlas.locations.some((xe) => xe.key === a.value)) && (a.value = ""), w && (p = !1);
      const ae = u.value.kind === "world" ? "" : u.value.key, Fe = ae && !$.map?.atlas.locations.some((xe) => xe.key === ae);
      (w || !b.map?.atlas.locations.length && $.map?.atlas.locations.length && !p || Fe) && (u.value = i()), w && (P.value = null, L.value = !1);
    }), ee(E, ($, b) => {
      $.locations.some((w) => w.key === a.value) || (a.value = ""), ($.kind !== b.kind || $.region?.key !== b.region?.key || !_.value) && (a.value = "", P.value = null, L.value = !1);
    });
    function z($) {
      p = !0, u.value = $, a.value = "", P.value = null, L.value = !1;
    }
    function Q($ = "") {
      z({
        kind: "region",
        key: $
      });
    }
    async function Y($, b = !1) {
      const w = _.value?.locations.find((ae) => ae.key === $);
      if (w) {
        if (p = !0, b && _.value) {
          if (te(w)) re();
          else {
            const ae = ke(_.value, $);
            if (!ae) {
              se($);
              return;
            }
            Q(ae.key);
          }
          await Ce();
        }
        a.value = $, P.value = null, L.value = !1, await Ce(), A.value = _.value ? Me(_.value, $, E.value.locations) : $, N.value += 1;
      }
    }
    async function Ee() {
      if (!(!q.value || !_.value)) {
        if (te(q.value)) {
          await Y(q.value.key, !0);
          return;
        }
        if (!ke(_.value, q.value.key)) {
          se();
          return;
        }
        Q(), await Ce(), await Y(q.value.key);
      }
    }
    function se($ = "") {
      z({
        kind: "scene",
        key: $ === R.value ? "" : $
      });
    }
    function re() {
      z({ kind: "world" });
    }
    function Ze($) {
      h.value || (h.value = !0, d.value = "2d", t.value = $);
    }
    return Ye(() => L.value ? (L.value = !1, !0) : m.value ? (Q(M.value && I.value?.key || ""), !0) : a.value ? (a.value = "", !0) : u.value.kind === "region" ? (re(), !0) : !1), ($, b) => (r(), c("main", { class: J(["map-app", {
      "has-view-switch": _.value?.locations.length,
      "is-scene-view": m.value
    }]) }, [
      e.compact && _.value?.locations.length ? (r(), Z(Sn, {
        key: 0,
        mode: d.value,
        "onUpdate:mode": b[0] || (b[0] = (w) => d.value = w),
        "low-walls": s.value,
        "onUpdate:lowWalls": b[1] || (b[1] = (w) => s.value = w),
        "show-labels": v.value,
        "onUpdate:showLabels": b[2] || (b[2] = (w) => v.value = w),
        view: u.value.kind,
        "scene-available": V.value?.status === "active",
        "three-unavailable": h.value,
        located: !!q.value,
        onNavigate: b[3] || (b[3] = (w) => z(w === "world" ? { kind: w } : {
          kind: w,
          key: ""
        })),
        onLocate: b[4] || (b[4] = (w) => m.value ? se() : Ee())
      }, null, 8, [
        "mode",
        "low-walls",
        "show-labels",
        "view",
        "scene-available",
        "three-unavailable",
        "located"
      ])) : k("", !0),
      n("div", al, [
        e.compact ? k("", !0) : (r(), c(O, { key: 0 }, [
          n("header", nl, [
            x(j, { name: m.value ? "layers" : "search" }, null, 8, ["name"]),
            m.value ? (r(), c("div", ol, [W(y(K.value?.name || f(X).scene), 1), n("small", null, y(M.value ? f(B).sceneBrowsing : f(B).sceneCurrent), 1)])) : (r(), c("button", {
              key: 0,
              type: "button",
              class: "map-search-entry",
              disabled: !_.value?.locations.length,
              onClick: b[5] || (b[5] = (w) => P.value = "all")
            }, [W(y(S.value.search), 1), n("small", null, y(g.value), 1)], 8, ll)),
            ne($.$slots, "toolbar")
          ]),
          _.value?.locations.length ? (r(), c("div", sl, [n("nav", {
            class: "map-view-switch",
            "aria-label": f(B).viewLabel
          }, [
            n("button", {
              type: "button",
              "aria-pressed": u.value.kind === "world",
              onClick: re
            }, [x(j, { name: "globe" }), W(y(f(X).world), 1)], 8, il),
            n("button", {
              type: "button",
              "aria-pressed": u.value.kind === "region",
              onClick: b[6] || (b[6] = (w) => Q())
            }, [x(j, { name: "compass" }), W(y(f(X).region), 1)], 8, cl),
            n("button", {
              type: "button",
              "aria-pressed": m.value,
              onClick: b[7] || (b[7] = (w) => se())
            }, [x(j, { name: "layers" }), W(y(f(X).scene), 1)], 8, ul)
          ], 8, rl), m.value ? (r(), c("div", dl, [M.value ? (r(), c("button", {
            key: 0,
            type: "button",
            class: "map-round-button",
            "aria-label": "回到当前场景",
            onClick: b[8] || (b[8] = (w) => se())
          }, [x(j, { name: "locate" })])) : k("", !0), n("button", {
            type: "button",
            class: "map-round-button",
            "aria-expanded": L.value,
            "aria-label": f(B).legendLabel,
            onClick: b[9] || (b[9] = (w) => L.value = !L.value)
          }, [x(j, { name: "layers" })], 8, vl)])) : k("", !0)])) : k("", !0),
          _.value?.locations.length && !m.value ? (r(), c("nav", {
            key: 1,
            class: "map-region-trail",
            "aria-label": f(B).trailLabel
          }, [n("button", {
            type: "button",
            "aria-current": u.value.kind === "world" ? "page" : void 0,
            onClick: re
          }, [x(j, { name: "globe" }), W(y(f(X).world), 1)], 8, hl), u.value.kind === "region" ? (r(), c(O, { key: 0 }, [x(j, { name: "next" }), n("span", fl, y(g.value), 1)], 64)) : k("", !0)], 8, pl)) : k("", !0)
        ], 64)),
        t.value ? (r(), c("aside", yl, [n("p", null, y(t.value), 1), n("button", {
          type: "button",
          class: "map-notice-close",
          "aria-label": "关闭三维提示",
          onClick: b[10] || (b[10] = (w) => t.value = "")
        }, [x(j, { name: "close" })])])) : k("", !0),
        ne($.$slots, "feedback")
      ]),
      n("div", { class: J(["map-canvas", { "has-detail": F.value && !m.value }]) }, [e.map && _.value?.locations.length ? (r(), c(O, { key: 0 }, [
        E.value.locations.length ? Pe((r(), Z(_t, {
          key: 0,
          atlas: e.map.atlas,
          scope: E.value,
          label: g.value,
          "current-location-key": R.value,
          "selected-location-key": a.value,
          "focus-key": A.value,
          "focus-sequence": N.value,
          onSelect: b[11] || (b[11] = (w) => Y(w))
        }, null, 8, [
          "atlas",
          "scope",
          "label",
          "current-location-key",
          "selected-location-key",
          "focus-key",
          "focus-sequence"
        ])), [[He, !m.value]]) : k("", !0),
        m.value ? (r(), c(O, { key: 1 }, [V.value?.status === "active" ? (r(), Z(un, {
          key: 0,
          mode: d.value,
          "onUpdate:mode": b[12] || (b[12] = (w) => d.value = w),
          "low-walls": s.value,
          "onUpdate:lowWalls": b[13] || (b[13] = (w) => s.value = w),
          "show-labels": v.value,
          "onUpdate:showLabels": b[14] || (b[14] = (w) => v.value = w),
          scene: V.value,
          compact: e.compact,
          "three-unavailable": h.value,
          onFallback: Ze
        }, null, 8, [
          "mode",
          "low-walls",
          "show-labels",
          "scene",
          "compact",
          "three-unavailable"
        ])) : (r(), c("div", ml, [
          x(j, { name: "layers" }),
          n("h2", null, y(K.value ? f(B).sceneEmpty : f(B).unknownLocation), 1),
          M.value && M.value !== R.value ? (r(), c("button", {
            key: 0,
            type: "button",
            class: "map-secondary-button",
            onClick: b[15] || (b[15] = (w) => I.value ? Q(I.value.key) : re())
          }, y(I.value ? f(B).regionMap : f(X).world), 1)) : ne($.$slots, "scene-empty-action", {
            key: 1,
            located: !!K.value
          })
        ]))], 64)) : k("", !0),
        !m.value && !E.value.locations.length ? (r(), c("div", bl, [
          x(j, { name: "pin" }),
          n("h2", null, y(u.value.kind === "region" && !I.value ? f(B).unknownRegion : S.value.empty), 1),
          n("p", null, y(u.value.kind === "region" && !I.value ? f(B).unknownRegionHint : S.value.emptyHint), 1),
          u.value.kind === "region" ? (r(), c("button", {
            key: 0,
            type: "button",
            class: "map-secondary-button",
            onClick: re
          }, y(f(X).world), 1)) : ne($.$slots, "scope-empty-action", { key: 1 })
        ])) : k("", !0)
      ], 64)) : ne($.$slots, "empty-map", { key: 1 }, () => [n("div", gl, [x(j, { name: "globe" }), n("h2", null, y(f(ue).empty), 1)])])], 2),
      !e.compact && _.value?.locations.length && !m.value ? (r(), c("div", {
        key: 1,
        class: J(["map-floating-tools", { "has-detail": F.value }])
      }, [n("button", {
        type: "button",
        class: "map-round-button",
        disabled: !q.value,
        "aria-label": "回到我的位置",
        onClick: Ee
      }, [x(j, { name: "locate" })], 8, kl), n("button", {
        type: "button",
        class: "map-round-button",
        "aria-expanded": L.value,
        "aria-label": f(B).legendLabel,
        onClick: b[16] || (b[16] = (w) => L.value = !L.value)
      }, [x(j, { name: "layers" })], 8, wl)], 2)) : k("", !0),
      L.value ? (r(), c("aside", Ml, [x(Ue)])) : k("", !0),
      F.value && e.map && !m.value ? (r(), Z(tl, {
        key: F.value.key,
        location: F.value,
        map: e.map,
        "current-key": R.value,
        onClose: b[17] || (b[17] = (w) => a.value = ""),
        onScene: b[18] || (b[18] = (w) => se(F.value.key)),
        onExplore: b[19] || (b[19] = (w) => Q(F.value.key)),
        onSelect: b[20] || (b[20] = (w) => Y(w, !0))
      }, null, 8, [
        "location",
        "map",
        "current-key"
      ])) : !e.compact && _.value?.locations.length && !m.value ? (r(), c("button", {
        key: 4,
        type: "button",
        class: "map-region-card",
        "aria-label": f(dt)(E.value.kind, T.value),
        "aria-describedby": o,
        onClick: b[21] || (b[21] = (w) => P.value = T.value)
      }, [
        n("span", _l, [x(j, { name: E.value.kind === "world" ? "globe" : "compass" }, null, 8, ["name"])]),
        n("span", {
          id: o,
          class: "map-region-summary"
        }, [n("strong", null, y(g.value), 1), n("small", null, y(f(ut)(E.value.kind, E.value.locations.length, E.value.unvisited)), 1)]),
        n("span", xl, [x(j, { name: "next" })])
      ], 8, $l)) : !e.compact && m.value && _.value?.locations.length ? (r(), c("footer", Cl, [x(j, { name: "layers" }), n("span", null, [n("strong", null, y(K.value?.name || "当前位置待确认"), 1), n("small", null, y(M.value ? "正在查看场景图 · 不会移动人物" : "当前位置的场景图"), 1)])])) : k("", !0),
      e.compact && _.value?.locations.length && !F.value ? (r(), c("div", {
        key: 6,
        class: "map-projection-caption",
        title: m.value ? K.value?.name : g.value
      }, [x(j, { name: m.value ? "pin" : "compass" }, null, 8, ["name"]), n("span", null, y(m.value ? K.value?.name || f(B).unknownLocation : g.value), 1)], 8, Sl)) : k("", !0),
      P.value && _.value ? (r(), Z(Vn, {
        key: 7,
        scope: E.value,
        title: g.value,
        "initial-filter": P.value,
        onClose: b[22] || (b[22] = (w) => P.value = null),
        onSelect: b[23] || (b[23] = (w) => Y(w))
      }, null, 8, [
        "scope",
        "title",
        "initial-filter"
      ])) : k("", !0),
      ne($.$slots, "overlay")
    ], 2));
  }
}), Rl = jl;
export {
  ra as a,
  qe as c,
  Hl as d,
  St as f,
  j as h,
  Oa as i,
  ie as l,
  ue as m,
  Ma as n,
  me as o,
  B as p,
  La as r,
  Se as s,
  Rl as t,
  Ie as u
};
