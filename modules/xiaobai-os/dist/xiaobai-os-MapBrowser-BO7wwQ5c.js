/* eslint-disable */
import { B as $e, C as w, D as W, E as Xe, G as R, I as Oe, K as oe, M as we, O as C, P as Ce, Q as ee, S as D, U as r, X as pe, Y as he, _, at as H, b as S, dt as be, et as Ae, ft as m, g as ge, h as Ie, k as G, lt as y, m as Ne, o as Je, p as et, tt as Ee, ut as X, w as c, x as a } from "./xiaobai-os-frame-bridge-CrPFvkI3.js";
import { t as tt } from "./xiaobai-os-AppDialog-Ce_C5VGF.js";
var at = { class: "map-viewport" }, nt = ["viewBox", "aria-label"], ot = {
  class: "map-viewport-controls",
  "aria-label": "地图缩放"
}, lt = /* @__PURE__ */ G({
  __name: "MapViewport",
  props: {
    viewBox: {},
    resetKey: { default: "" },
    label: {},
    focusPoint: { default: void 0 },
    focusSequence: { default: 0 }
  },
  setup(e) {
    const n = e, s = H(null), t = H([...n.viewBox]), u = H([0, 0]), d = S(() => u.value[0] && u.value[1] ? Math.max(t.value[2] / u.value[0], t.value[3] / u.value[1]) : 1);
    let p;
    $e(() => {
      p = new ResizeObserver((k) => {
        const j = k[0].contentRect;
        u.value = [j.width, j.height];
      }), s.value && p.observe(s.value);
    });
    const i = /* @__PURE__ */ new Map();
    let v = null, h = [0, 0], l = 0, f = null, o = !1, b = !1, O = null;
    const V = S(() => t.value.join(" "));
    function E() {
      t.value = [...n.viewBox];
    }
    function A() {
      return d.value;
    }
    function x(k, j) {
      const T = s.value?.getBoundingClientRect();
      if (!T) return [t.value[0], t.value[1]];
      const K = A();
      return [t.value[0] + t.value[2] / 2 + (k - T.left - T.width / 2) * K, t.value[1] + t.value[3] / 2 + (j - T.top - T.height / 2) * K];
    }
    function N(k, j) {
      const T = Math.max(1, n.viewBox[2]), K = Math.min(T * 3, Math.max(Math.min(T * 0.24, 240), t.value[2] * k)), Z = K / t.value[2], Q = j || [t.value[0] + t.value[2] / 2, t.value[1] + t.value[3] / 2];
      t.value = [
        Q[0] - (Q[0] - t.value[0]) * Z,
        Q[1] - (Q[1] - t.value[1]) * Z,
        K,
        t.value[3] * Z
      ];
    }
    function U() {
      if (!n.focusPoint) return;
      const k = Math.min(t.value[2], 620), j = t.value[3] * k / t.value[2];
      t.value = [
        n.focusPoint[0] - k / 2,
        n.focusPoint[1] - j / 2,
        k,
        j
      ];
    }
    function z() {
      const k = [...i.values()];
      k.length === 1 && (v = k[0], h = [t.value[0], t.value[1]]), k.length === 2 && (l = Math.hypot(k[1][0] - k[0][0], k[1][1] - k[0][1]), f = [(k[0][0] + k[1][0]) / 2, (k[0][1] + k[1][1]) / 2], o = !0);
    }
    function q(k) {
      k.button !== 0 || i.size >= 2 || (i.size || (o = !1), i.set(k.pointerId, [k.clientX, k.clientY]), k.target.setPointerCapture(k.pointerId), z());
    }
    function I(k) {
      if (!i.has(k.pointerId)) return;
      i.set(k.pointerId, [k.clientX, k.clientY]);
      const j = [...i.values()];
      if (j.length === 2 && f) {
        const T = Math.hypot(j[1][0] - j[0][0], j[1][1] - j[0][1]), K = [(j[0][0] + j[1][0]) / 2, (j[0][1] + j[1][1]) / 2];
        T > 0 && l > 0 && N(l / T, x(...f)), t.value[0] -= (K[0] - f[0]) * A(), t.value[1] -= (K[1] - f[1]) * A(), l = T, f = K;
      } else if (v) {
        const T = k.clientX - v[0], K = k.clientY - v[1];
        Math.abs(T) + Math.abs(K) > 4 && (o = !0), t.value = [
          h[0] - T * A(),
          h[1] - K * A(),
          t.value[2],
          t.value[3]
        ];
      }
    }
    function P(k) {
      if (!i.delete(k.pointerId)) return;
      const j = k.target;
      j.hasPointerCapture(k.pointerId) && j.releasePointerCapture(k.pointerId), z(), i.size || (v = null, f = null), o && (b = !0, O && clearTimeout(O), O = setTimeout(() => {
        b = !1;
      }, 0));
    }
    function F(k) {
      b && (k.preventDefault(), k.stopPropagation());
    }
    return ee(() => n.resetKey, E, { immediate: !0 }), ee(() => n.focusSequence, U, { flush: "post" }), Oe(() => {
      p?.disconnect(), O && clearTimeout(O);
    }), (k, j) => (r(), c("div", at, [(r(), c("svg", {
      ref_key: "svg",
      ref: s,
      class: "map-viewport-svg",
      viewBox: V.value,
      preserveAspectRatio: "xMidYMid meet",
      role: "group",
      "aria-label": e.label,
      onWheel: j[0] || (j[0] = ge((T) => N(T.deltaY < 0 ? 0.84 : 1.19, x(T.clientX, T.clientY)), ["prevent"])),
      onPointerdown: q,
      onPointermove: I,
      onPointerup: P,
      onPointercancel: P,
      onClickCapture: F
    }, [oe(k.$slots, "default", { unitScale: d.value })], 40, nt)), a("div", ot, [
      a("button", {
        type: "button",
        "aria-label": "放大地图",
        onClick: j[1] || (j[1] = (T) => N(0.8))
      }, "+"),
      a("button", {
        type: "button",
        "aria-label": "缩小地图",
        onClick: j[2] || (j[2] = (T) => N(1.25))
      }, "−"),
      a("button", {
        type: "button",
        class: "map-fit",
        onClick: E
      }, "全图")
    ])]));
  }
}), ze = lt, st = {
  class: "map-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.7",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, rt = ["d"], it = /* @__PURE__ */ G({
  __name: "MapIcon",
  props: { name: { default: "pin" } },
  setup(e) {
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
    return (s, t) => (r(), c("svg", st, [a("path", { d: n[e.name] || n.pin }, null, 8, rt)]));
  }
}), L = it;
function te(e) {
  return e.scale === "region";
}
function ct(e) {
  return e.scale !== "world" && !te(e);
}
function fe(e, n) {
  const s = new Map(e.locations.map((d) => [d.key, d])), t = [];
  let u = s.get(n);
  for (; u; )
    t.unshift(u), u = u.parent ? s.get(u.parent) : void 0;
  return t;
}
function ke(e, n) {
  return fe(e, n).reverse().find(te);
}
function ut(e) {
  const n = /* @__PURE__ */ new Set(), s = e.actors.find((t) => t.actorKey === "player")?.locationKey;
  for (const t of e.locations)
    if (!(t.status !== "visited" && t.key !== s))
      for (const u of fe(e, t.key)) n.add(u.key);
  return n;
}
function Me(e, n, s) {
  const t = new Set(s.map((u) => u.key));
  return fe(e, n).reverse().find((u) => t.has(u.key))?.key || "";
}
function dt(e, n) {
  return e.links.flatMap((s) => {
    if (s.from !== n && s.to !== n) return [];
    const t = e.locations.find((u) => u.key === (s.from === n ? s.to : s.from));
    return t ? [{
      location: t,
      link: s,
      outgoing: s.bidirectional || s.from === n
    }] : [];
  });
}
function vt(e, n) {
  const s = [...n.locations].sort((l, f) => l.key.localeCompare(f.key, "en")), t = (l) => l.position && (l.parent || "") === n.positionParent, u = s.filter(t).map((l) => ({
    location: l,
    x: l.position[0],
    y: l.position[1],
    placed: !0
  }));
  let d = 0;
  for (const l of s.filter((f) => !t(f))) {
    let f, o;
    do {
      const b = d * 2.3999632297, O = 155 * Math.sqrt(d++);
      f = Math.round(500 + Math.cos(b) * O), o = Math.round(420 + Math.sin(b) * O);
    } while (u.some((b) => Math.hypot(b.x - f, b.y - o) < 160));
    u.push({
      location: l,
      x: f,
      y: o,
      placed: !1
    });
  }
  u.sort((l, f) => l.location.key.localeCompare(f.location.key, "en"));
  const p = new Map(u.map((l) => [l.location.key, l])), i = e.links.flatMap((l) => {
    const f = p.get(Me(e, l.from, s)), o = p.get(Me(e, l.to, s));
    if (!f || !o || f === o) return [];
    const b = (f.x + o.x) / 2, O = (f.y + o.y) / 2;
    return [{
      link: l,
      from: f,
      to: o,
      x: b,
      y: O,
      path: `M ${f.x} ${f.y} Q ${b + (o.y - f.y) * 0.12} ${O - (o.x - f.x) * 0.12} ${o.x} ${o.y}`
    }];
  }), v = u.length ? Math.min(...u.map((l) => l.x)) - 140 : 0, h = u.length ? Math.min(...u.map((l) => l.y)) - 150 : 0;
  return {
    nodes: u,
    routes: i,
    viewBox: [
      v,
      h,
      u.length ? Math.max(420, Math.max(...u.map((l) => l.x)) - v + 140) : 800,
      u.length ? Math.max(500, Math.max(...u.map((l) => l.y)) - h + 190) : 900
    ]
  };
}
var de = {
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
}, Y = {
  mode: "场景显示方式",
  two: "二维",
  three: "三维",
  lowWalls: "低墙",
  labels: "名称"
}, J = {
  world: "世界地图",
  region: "当前地区",
  scene: "当前场景"
}, se = {
  visited: "已到访",
  unvisited: "未到访"
}, ye = {
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
function Ke(e, n) {
  return `${n} 个${ye[e].unit}`;
}
function pt(e, n, s) {
  return `${Ke(e, n)} · ${s} 个${se.unvisited}`;
}
function ht(e, n) {
  return `查看${n === "all" ? "" : se[n]}${ye[e].unit}`;
}
var ft = {
  class: "map-landscapes",
  "aria-hidden": "true"
}, yt = ["transform"], mt = {
  class: "map-world-roads",
  "aria-hidden": "true"
}, bt = ["d"], gt = ["d", "marker-end"], kt = ["x", "y"], wt = [
  "transform",
  "aria-label",
  "onClick",
  "onKeydown"
], Mt = { transform: "translate(-14 -20)" }, $t = {
  y: "64",
  class: "map-place-name"
}, _t = {
  key: 0,
  y: "89",
  class: "map-place-status"
}, xt = {
  key: 1,
  y: "89",
  class: "map-place-status"
}, Ct = /* @__PURE__ */ G({
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
    const n = e, s = S(() => vt(n.atlas, n.scope)), t = S(() => Me(n.atlas, n.currentLocationKey, n.scope.locations)), u = S(() => s.value.nodes.find((i) => i.location.key === n.focusKey)), d = "map-arrow-" + he();
    function p(i, v) {
      return i === "water" ? "water" : i === "forest" ? "tree" : i === "mountain" ? "mountain" : ["world", "region"].includes(v) ? "globe" : v === "outdoor" ? "compass" : "building";
    }
    return (i, v) => (r(), D(ze, {
      "view-box": s.value.viewBox,
      "reset-key": `${e.scope.kind}:${e.scope.region?.key || ""}`,
      label: e.label,
      "focus-point": u.value ? [u.value.x, u.value.y] : void 0,
      "focus-sequence": e.focusSequence
    }, {
      default: Ae(({ unitScale: h }) => [
        a("defs", null, [a("marker", {
          id: d,
          viewBox: "0 0 10 10",
          refX: "16",
          refY: "5",
          markerWidth: "5",
          markerHeight: "5",
          orient: "auto"
        }, [...v[0] || (v[0] = [a("path", {
          d: "M1 1l8 4-8 4z",
          fill: "var(--map-road-ink)"
        }, null, -1)])])]),
        a("g", ft, [(r(!0), c(_, null, R(s.value.nodes, (l) => (r(), c("g", {
          key: l.location.key,
          transform: `translate(${l.x} ${l.y})`,
          class: X(`is-${l.location.terrain || "urban"}`)
        }, [...v[1] || (v[1] = [a("path", { d: "M-108-20Q-100-100-32-94T87-56Q127-13 99 48T21 99Q-57 113-90 65T-108-20Z" }, null, -1), a("path", {
          class: "map-contour",
          d: "M-133-22Q-124-126-39-116T110-70Q156-17 124 60T26 123Q-71 139-112 81T-133-22Z"
        }, null, -1)])], 10, yt))), 128))]),
        a("g", mt, [(r(!0), c(_, null, R(s.value.routes, (l) => (r(), c("g", {
          key: l.link.id,
          class: X({
            "is-path": l.link.kind === "path",
            "is-portal": l.link.kind === "portal"
          })
        }, [
          a("path", {
            class: "map-road-casing",
            d: l.path
          }, null, 8, bt),
          a("path", {
            class: "map-road-line",
            d: l.path,
            "marker-end": l.link.bidirectional ? void 0 : `url(#${d})`
          }, null, 8, gt),
          l.link.label ? (r(), c("text", {
            key: 0,
            x: l.x,
            y: l.y - 14
          }, m(l.link.label), 9, kt)) : w("", !0)
        ], 2))), 128))]),
        (r(!0), c(_, null, R(s.value.nodes, (l) => (r(), c("g", {
          key: l.location.key,
          class: X(["map-place", {
            "is-selected": l.location.key === e.selectedLocationKey,
            "is-current": l.location.key === t.value,
            "is-unvisited": l.location.status !== "visited"
          }]),
          transform: `translate(${l.x} ${l.y}) scale(${h * 0.5})`,
          role: "button",
          tabindex: "0",
          "aria-label": `查看${l.location.name}`,
          onClick: ge((f) => i.$emit("select", l.location.key), ["stop"]),
          onKeydown: [Ie(ge((f) => i.$emit("select", l.location.key), ["stop"]), ["enter"]), Ie(ge((f) => i.$emit("select", l.location.key), ["stop", "prevent"]), ["space"])]
        }, [
          v[2] || (v[2] = a("circle", {
            class: "map-pin-halo",
            r: "39"
          }, null, -1)),
          v[3] || (v[3] = a("path", {
            class: "map-pin-body",
            d: "M0 33C-6 25-26 8-26-6a26 26 0 0 1 52 0C26 8 6 25 0 33Z"
          }, null, -1)),
          a("g", Mt, [C(L, {
            name: p(l.location.terrain, l.location.scale),
            width: "28",
            height: "28"
          }, null, 8, ["name"])]),
          a("text", $t, m(l.location.name.length > 14 ? l.location.name.slice(0, 13) + "…" : l.location.name), 1),
          l.location.key === t.value ? (r(), c("text", _t, "你在这里")) : l.location.status !== "visited" ? (r(), c("text", xt, m(y(se).unvisited), 1)) : w("", !0),
          a("title", null, m(l.location.name) + m(l.location.brief ? " · " + l.location.brief : ""), 1)
        ], 42, wt))), 128))
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
}), St = Ct, ue;
async function Ve() {
  if (!ue) {
    const e = [
      "..",
      "..",
      "..",
      "libs",
      "material-symbols",
      "material-symbols-rounded.woff2"
    ].join("/"), n = new URL(e, import.meta.url);
    ue = new FontFace("Xiaobai Map Symbols", `url("${n.href}")`, {
      display: "block",
      weight: "400"
    }).load(), ue.catch(() => {
      ue = void 0;
    });
  }
  document.fonts.add(await ue);
}
var nl = Object.freeze([
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
]), ol = Object.freeze([
  "rect",
  "circle",
  "path",
  "curve",
  "icon",
  "label"
]), ll = Object.freeze([
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
]), jt = Object.freeze([
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
]), sl = Object.freeze([
  "confirmed",
  "inferred",
  "unknown"
]), rl = Object.freeze(["indoor", "outdoor"]), il = Object.freeze([
  "sunlight",
  "daylight",
  "night"
]), cl = Object.freeze(["on", "off"]), Lt = Object.freeze([
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
]), qe = Object.freeze(Lt.flatMap((e) => [...e.icons])), ul = Object.freeze([
  ...qe,
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
]), dl = Object.freeze(/* @__PURE__ */ new Set([
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
])), Ot = Object.freeze({
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
function Ue(e, n) {
  return `url(#${n}-material-${e || "unknown"})`;
}
function At(e, n) {
  return `url(#${n}-face-${e || "unknown"})`;
}
function ve(e) {
  return `color-mix(in srgb, ${Ot[e]}, var(--map-surface) var(--scene-material-mix))`;
}
var Et = ["id"], Pt = ["stop-color", "stop-opacity"], Bt = ["stop-color", "stop-opacity"], It = ["stop-color", "stop-opacity"], Tt = ["id"], Ht = ["fill", "fill-opacity"], Rt = {
  fill: "none",
  stroke: "var(--scene-shadow)",
  "stroke-width": ".65",
  opacity: ".24"
}, Nt = {
  key: 1,
  d: "M0 0H48V32H0ZM19 0V17M0 17H48M36 17V32M3 3h12m8 0h21"
}, zt = {
  key: 2,
  d: "M0 0H48V32H0ZM24 0V32M0 16H48M12 4l5 4-5 4-5-4ZM36 20l5 4-5 4-5-4Z"
}, Kt = {
  key: 3,
  d: "M-3 3 8 11l17 2 9 10 18 3M27-3l-8 12 3 8-7 17",
  opacity: ".65"
}, Vt = {
  key: 4,
  d: "M3 8q6 3 13 0M25 25q7 2 17-1",
  stroke: "var(--scene-highlight)",
  "stroke-width": "1.3",
  opacity: "1"
}, qt = {
  key: 5,
  d: "M5 32 37 0M12 32 44 0",
  stroke: "var(--scene-highlight)",
  "stroke-width": "2.2"
}, Ut = {
  key: 6,
  d: "M8 15l-2-4m2 4 3-3M36 26l-1-4m1 4 3-3"
}, Wt = {
  key: 7,
  d: "M5 8h1m20-2h2m-12 17h2m23-6h1m-5 12h2",
  "stroke-linecap": "round"
}, Gt = {
  key: 8,
  d: "M0 0H48V32H0M0 5H48M0 27H48M5 5v1m38-1v1m-38 20v1m38-1v1"
}, Dt = {
  key: 9,
  d: "M0 5H48M0 13H48M0 21H48M0 29H48M4 0v32m8-32v32m8-32v32m8-32v32m8-32v32m8-32v32",
  opacity: ".55"
}, Ft = {
  key: 10,
  d: "m24 5 8 11-8 11-8-11ZM24 10v12M20 16h8"
}, Zt = {
  key: 11,
  d: "M7 8q12-5 16 6t20 7M4 27l6-3"
}, Qt = {
  key: 12,
  d: "M5 19q5-3 11-1M29 8q6-2 12 1",
  stroke: "var(--scene-highlight)",
  "stroke-width": "1.4"
}, Yt = {
  key: 0,
  d: "M0 1H48",
  stroke: "var(--scene-highlight)",
  "stroke-width": ".7",
  opacity: ".35"
}, Xt = ["id"], Jt = ["id"], ea = ["transform", "fill"], ta = /* @__PURE__ */ G({
  __name: "SceneMaterials",
  props: { prefix: {} },
  setup(e) {
    return (n, s) => (r(), c("defs", null, [
      (r(!0), c(_, null, R(y(jt), (t) => (r(), c(_, { key: t }, [a("linearGradient", {
        id: `${e.prefix}-face-${t}`,
        x1: "0",
        y1: "0",
        x2: ".7",
        y2: "1"
      }, [
        a("stop", {
          offset: "0",
          "stop-color": `color-mix(in srgb, ${y(ve)(t)}, var(--scene-highlight) 24%)`,
          "stop-opacity": t === "glass" ? 0.35 : 1
        }, null, 8, Pt),
        a("stop", {
          offset: ".52",
          "stop-color": y(ve)(t),
          "stop-opacity": t === "glass" ? 0.16 : 1
        }, null, 8, Bt),
        a("stop", {
          offset: "1",
          "stop-color": `color-mix(in srgb, ${y(ve)(t)}, var(--scene-shadow) 16%)`,
          "stop-opacity": t === "glass" ? 0.28 : 1
        }, null, 8, It)
      ], 8, Et), a("pattern", {
        id: `${e.prefix}-material-${t}`,
        width: "48",
        height: "32",
        patternUnits: "userSpaceOnUse",
        class: "scene-texture"
      }, [
        a("rect", {
          width: "48",
          height: "32",
          fill: y(ve)(t),
          "fill-opacity": t === "glass" ? 0.4 : 1
        }, null, 8, Ht),
        a("g", Rt, [t === "wood" ? (r(), c(_, { key: 0 }, [s[0] || (s[0] = a("path", { d: "M0 0H48M0 16H48M19 0V16M37 16V32" }, null, -1)), s[1] || (s[1] = a("path", {
          d: "M3 7Q12 4 26 8T47 7M2 26q10-4 25 0t23-1",
          opacity: ".5"
        }, null, -1))], 64)) : t === "stone" ? (r(), c("path", Nt)) : t === "tile" ? (r(), c("path", zt)) : t === "marble" ? (r(), c("path", Kt)) : t === "water" ? (r(), c("path", Vt)) : t === "glass" ? (r(), c("path", qt)) : t === "grass" || t === "forest" ? (r(), c("path", Ut)) : t === "dirt" || t === "sand" ? (r(), c("path", Wt)) : t === "metal" ? (r(), c("path", Gt)) : [
          "carpet",
          "fabric",
          "bed-sheet",
          "tatami"
        ].includes(t) ? (r(), c("path", Dt)) : t === "rune" ? (r(), c("path", Ft)) : t === "blood" ? (r(), c("path", Zt)) : t === "snow" ? (r(), c("path", Qt)) : w("", !0)]),
        t === "wood" || t === "stone" || t === "metal" ? (r(), c("path", Yt)) : w("", !0)
      ], 8, Tt)], 64))), 128)),
      a("radialGradient", {
        id: `${e.prefix}-crown-face`,
        cx: ".32",
        cy: ".25",
        r: ".8"
      }, [...s[2] || (s[2] = [
        a("stop", {
          offset: "0",
          "stop-color": "var(--scene-leaf-light)"
        }, null, -1),
        a("stop", {
          offset: ".6",
          "stop-color": "var(--scene-leaf)"
        }, null, -1),
        a("stop", {
          offset: "1",
          "stop-color": "var(--scene-leaf-dark)"
        }, null, -1)
      ])], 8, Xt),
      (r(), c(_, null, R(3, (t) => a("symbol", {
        id: `${e.prefix}-crown-${t - 1}`,
        key: t,
        viewBox: "0 0 100 100"
      }, [a("g", {
        transform: `rotate(${t * 37} 50 50)`,
        fill: `url(#${e.prefix}-crown-face)`,
        stroke: "var(--scene-leaf-dark)",
        "stroke-width": ".6"
      }, [...s[3] || (s[3] = [
        a("path", { d: "M49 5Q65 2 73 16Q91 14 93 36Q99 46 90 59Q95 76 76 81Q68 96 50 91Q30 97 23 82Q5 79 9 60Q-1 45 9 34Q7 17 28 16Q33 1 49 5Z" }, null, -1),
        a("circle", {
          cx: "34",
          cy: "32",
          r: "21"
        }, null, -1),
        a("circle", {
          cx: "69",
          cy: "36",
          r: "22"
        }, null, -1),
        a("circle", {
          cx: "30",
          cy: "62",
          r: "20"
        }, null, -1),
        a("circle", {
          cx: "64",
          cy: "67",
          r: "23"
        }, null, -1),
        a("circle", {
          cx: "49",
          cy: "48",
          r: "24"
        }, null, -1),
        a("path", {
          d: "M24 25q8-10 19-5M61 21q11-3 17 8M36 45q9-11 21-8M63 59q9-2 14 6",
          fill: "none",
          stroke: "var(--scene-leaf-light)",
          "stroke-width": "1.4",
          opacity: ".75"
        }, null, -1)
      ])], 8, ea)], 8, Jt)), 64))
    ]));
  }
}), aa = ta, na = /* @__PURE__ */ new Set([
  "water",
  "terrain",
  "furniture",
  "decoration",
  "danger",
  "magic",
  "secret",
  "light"
]), oa = new Set(qe), la = /* @__PURE__ */ new Set([
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
function sa(e) {
  return !!e.icon && la.has(e.icon);
}
var le = (e) => Number(e.toFixed(3)).toString(), me = (e) => e.geometry.points || [];
function je(e) {
  return e.shape === "icon" || e.shape === "label" || e.category === "actor" || e.category === "door" || e.kind === "stairs" || e.icon === "stairs" || e.icon === "door-open";
}
function _e(e) {
  return me(e).length >= 3 && (e.closed ?? na.has(e.category));
}
function ce(e) {
  return e.category === "wall" || e.category === "grid" || e.icon === "fence" && ["path", "curve"].includes(e.shape) ? !1 : e.shape === "rect" || e.shape === "circle" ? !0 : (e.shape === "path" || e.shape === "curve") && _e(e);
}
function We(e) {
  return ![
    "wall",
    "grid",
    "actor"
  ].includes(e.category) && (e.shape === "rect" || e.shape === "circle") && (e.icon !== void 0 && oa.has(e.icon) || [
    "furniture",
    "decoration",
    "door"
  ].includes(e.category));
}
function Pe(e, n, s) {
  const t = e[s], u = e[(s + 1) % e.length], d = e[s - 1] || (n ? e[e.length - 1] : t), p = e[s + 2] || (n ? e[(s + 2) % e.length] : u), i = (v, h, l) => Math.max(Math.min(h, l), Math.min(Math.max(h, l), v));
  return [[i(t[0] + (u[0] - d[0]) / 6, t[0], u[0]), i(t[1] + (u[1] - d[1]) / 6, t[1], u[1])], [i(u[0] - (p[0] - t[0]) / 6, t[0], u[0]), i(u[1] - (p[1] - t[1]) / 6, t[1], u[1])]];
}
function vl(e) {
  if (e.shape === "rect") {
    const { x: d, y: p, width: i, height: v } = e.geometry;
    return {
      points: [
        [d, p],
        [d + i, p],
        [d + i, p + v],
        [d, p + v]
      ],
      closed: !0
    };
  }
  if (e.shape === "circle") {
    const { x: d, y: p, radius: i } = e.geometry;
    return {
      points: Array.from({ length: 64 }, (v, h) => [d + i * Math.cos(h * Math.PI / 32), p + i * Math.sin(h * Math.PI / 32)]),
      closed: !0
    };
  }
  if (e.shape !== "path" && e.shape !== "curve") return {
    points: [],
    closed: !1
  };
  const n = me(e), s = _e(e), t = (d) => d.map((p) => Number(le(p)));
  if (e.shape === "path" || n.length < 2) return {
    points: n.map(t),
    closed: s
  };
  const u = [t(n[0])];
  for (let d = 0; d < n.length - (s ? 0 : 1); d += 1) {
    const p = t(n[d]), i = t(n[(d + 1) % n.length]), [v, h] = Pe(n, s, d).map(t);
    for (let l = 1; l <= 12; l += 1) {
      const f = l / 12, o = 1 - f;
      u.push([0, 1].map((b) => o ** 3 * p[b] + 3 * o ** 2 * f * v[b] + 3 * o * f ** 2 * h[b] + f ** 3 * i[b]));
    }
  }
  return s && u.pop(), {
    points: u,
    closed: s
  };
}
function ra(e) {
  if (e.shape === "rect") {
    const { x: d, y: p, width: i, height: v } = e.geometry;
    return `M ${d} ${p} h ${i} v ${v} h ${-i} Z`;
  }
  if (e.shape === "circle") {
    const { x: d, y: p, radius: i } = e.geometry;
    return `M ${d - i} ${p} a ${i} ${i} 0 1 0 ${i * 2} 0 a ${i} ${i} 0 1 0 ${-i * 2} 0 Z`;
  }
  const n = me(e);
  if (n.length < 2) return "";
  const s = _e(e);
  if (e.shape === "path") return `M ${n.map(([d, p]) => `${le(d)} ${le(p)}`).join(" L ")}${s ? " Z" : ""}`;
  const t = [`M ${n[0].map(le).join(" ")}`], u = n.length;
  for (let d = 0; d < u - (s ? 0 : 1); d += 1) {
    const [p, i] = Pe(n, s, d), v = n[(d + 1) % u];
    t.push(`C ${p.map(le).join(" ")}, ${i.map(le).join(" ")}, ${v.map(le).join(" ")}`);
  }
  return t.join(" ") + (s ? " Z" : "");
}
function ae(e) {
  if (e.shape === "rect") return { ...e.geometry };
  if (e.shape === "circle") {
    const { x: u, y: d, radius: p } = e.geometry;
    return {
      x: u - p,
      y: d - p,
      width: p * 2,
      height: p * 2
    };
  }
  const n = me(e);
  if (!n.length) {
    const { x: u, y: d } = e.geometry;
    return {
      x: u,
      y: d,
      width: 0,
      height: 0
    };
  }
  const s = n.map((u) => u[0]), t = n.map((u) => u[1]);
  return {
    x: Math.min(...s),
    y: Math.min(...t),
    width: Math.max(...s) - Math.min(...s),
    height: Math.max(...t) - Math.min(...t)
  };
}
function ia(e) {
  if (!e.rotation) return;
  const n = ae(e);
  return `rotate(${e.rotation} ${n.x + n.width / 2} ${n.y + n.height / 2})`;
}
function Te(e, n = 1) {
  const s = ae(e), t = [s.x + s.width / 2, s.y + s.height / 2];
  if (e.shape === "label") return t;
  if (je(e)) return [t[0], t[1] + 23 * n];
  if ((e.category === "terrain" || e.category === "water") && ce(e)) return t;
  if (e.shape === "path" || e.shape === "curve") {
    const p = me(e), i = _e(e), v = p.length - (i ? 0 : 1), h = Array.from({ length: v }, (q, I) => Math.hypot(p[(I + 1) % p.length][0] - p[I][0], p[(I + 1) % p.length][1] - p[I][1]));
    let l = h.reduce((q, I) => q + I, 0) / 2, f = 0;
    for (; f < h.length - 1 && l > h[f]; )
      l -= h[f], f += 1;
    const o = p[f], b = p[(f + 1) % p.length], O = h[f] ? l / h[f] : 0.5;
    let V = o[0] + (b[0] - o[0]) * O, E = o[1] + (b[1] - o[1]) * O, A = b[0] - o[0], x = b[1] - o[1];
    if (e.shape === "curve") {
      const [q, I] = Pe(p, i, f), P = 1 - O;
      V = P ** 3 * o[0] + 3 * P ** 2 * O * q[0] + 3 * P * O ** 2 * I[0] + O ** 3 * b[0], E = P ** 3 * o[1] + 3 * P ** 2 * O * q[1] + 3 * P * O ** 2 * I[1] + O ** 3 * b[1], A = 3 * P ** 2 * (q[0] - o[0]) + 6 * P * O * (I[0] - q[0]) + 3 * O ** 2 * (b[0] - I[0]), x = 3 * P ** 2 * (q[1] - o[1]) + 6 * P * O * (I[1] - q[1]) + 3 * O ** 2 * (b[1] - I[1]);
    }
    const N = Math.hypot(A, x);
    if (!N) return [V, E - 13 * n];
    let U = -x / N, z = A / N;
    return (z > 0 || z === 0 && U < 0) && (U = -U, z = -z), [V + U * 13 * n, E + z * 13 * n];
  }
  const u = (e.rotation || 0) * Math.PI / 180, d = e.shape === "circle" ? s.height / 2 : (Math.abs(Math.sin(u)) * s.width + Math.abs(Math.cos(u)) * s.height) / 2;
  return [t[0], t[1] + d + 13 * n];
}
function ca(e) {
  let n = 2166136261;
  for (const s of e) n = Math.imul(n ^ s.charCodeAt(0), 16777619);
  return n >>> 0;
}
function ua(e) {
  const n = e.filter((t) => t.category === "terrain" && t.material === "forest" && ce(t) && !We(t)).sort((t, u) => t.id < u.id ? -1 : t.id > u.id ? 1 : 0), s = /* @__PURE__ */ new Map();
  for (let t = 0; t < n.length; t += 1) {
    const u = n[t], d = ae(u), p = Math.floor(256 / n.length) + (t < 256 % n.length ? 1 : 0), i = d.width && d.height ? Math.min(p, Math.max(1, Math.ceil(d.width * d.height / 2704))) : 0, v = Math.min(i, Math.max(1, Math.ceil(Math.sqrt(i * d.width / Math.max(1, d.height))))), h = Math.ceil(i / Math.max(1, v));
    let l = ca(u.id);
    const f = () => (l = Math.imul(l, 1664525) + 1013904223 >>> 0, l / 4294967296), o = [];
    for (let b = 0; b < i; b += 1) o.push({
      x: d.x + (b % v + 0.5 + (f() - 0.5) * 0.35) * d.width / v,
      y: d.y + (Math.floor(b / v) + 0.5 + (f() - 0.5) * 0.35) * d.height / h,
      size: Math.min(Math.max(d.width / v, d.height / h), Math.min(d.width, d.height)) * (1.25 + f() * 0.35),
      variant: Math.floor(f() * 3)
    });
    s.set(u.id, o);
  }
  return s;
}
var da = [
  "x",
  "y",
  "width",
  "height"
], va = {
  key: 0,
  cx: "50",
  cy: "50",
  r: "50"
}, pa = {
  key: 1,
  width: "100",
  height: "100"
}, ha = ["clip-path", "fill"], fa = {
  key: 0,
  cx: "50",
  cy: "50",
  r: "49",
  class: "scene-object-edge"
}, ya = {
  key: 1,
  x: "1",
  y: "1",
  width: "98",
  height: "98",
  rx: "2",
  class: "scene-object-edge"
}, ma = ["fill"], ba = ["fill"], ga = ["d"], ka = {
  key: 0,
  d: "M9 78H91",
  class: "scene-object-seam"
}, wa = ["x"], Ma = /* @__PURE__ */ G({
  __name: "SceneObject",
  props: {
    element: {},
    prefix: {},
    unitScale: {}
  },
  setup(e) {
    const n = e, s = S(() => ae(n.element)), t = S(() => Math.min(s.value.width, s.value.height) / n.unitScale >= 12), u = S(() => n.element.shape === "circle"), d = S(() => n.element.material), p = S(() => At(d.value, n.prefix)), i = S(() => Ue(d.value, n.prefix)), v = `scene-object-${he()}`;
    return (h, l) => (r(), c("svg", {
      x: s.value.x,
      y: s.value.y,
      width: s.value.width,
      height: s.value.height,
      viewBox: "0 0 100 100",
      preserveAspectRatio: "none",
      class: "scene-object"
    }, [a("defs", null, [a("clipPath", { id: v }, [u.value ? (r(), c("circle", va)) : (r(), c("rect", pa))])]), a("g", {
      "clip-path": `url(#${v})`,
      fill: p.value
    }, [u.value ? (r(), c("circle", fa)) : (r(), c("rect", ya)), t.value ? (r(), c(_, { key: 2 }, [u.value ? (r(), c("circle", {
      key: 0,
      cx: "50",
      cy: "50",
      r: "44",
      fill: i.value,
      class: "scene-object-inset"
    }, null, 8, ma)) : (r(), c("rect", {
      key: 1,
      x: "5",
      y: "5",
      width: "90",
      height: "90",
      rx: "2",
      fill: i.value,
      class: "scene-object-inset"
    }, null, 8, ba)), e.element.icon === "table" || e.element.icon === "counter" ? (r(), c(_, { key: 2 }, [a("path", {
      d: u.value ? "M18 36A35 35 0 0 1 72 22" : "M8 13V8H92",
      class: "scene-object-shine"
    }, null, 8, ga), e.element.icon === "counter" ? (r(), c("path", ka)) : w("", !0)], 64)) : e.element.icon === "chair" ? (r(), c(_, { key: 3 }, [
      l[0] || (l[0] = a("rect", {
        x: "12",
        y: "29",
        width: "76",
        height: "61",
        rx: "9",
        class: "scene-object-inset"
      }, null, -1)),
      l[1] || (l[1] = a("rect", {
        x: "7",
        y: "5",
        width: "86",
        height: "23",
        rx: "6",
        class: "scene-object-edge"
      }, null, -1)),
      l[2] || (l[2] = a("path", {
        d: "M16 12H84",
        class: "scene-object-shine"
      }, null, -1))
    ], 64)) : e.element.icon === "bed" ? (r(), c(_, { key: 4 }, [
      l[3] || (l[3] = a("rect", {
        x: "10",
        y: "12",
        width: "80",
        height: "79",
        rx: "5",
        class: "scene-object-inset"
      }, null, -1)),
      l[4] || (l[4] = a("rect", {
        x: "20",
        y: "17",
        width: "60",
        height: "20",
        rx: "7",
        class: "scene-object-inset"
      }, null, -1)),
      l[5] || (l[5] = a("path", {
        d: "M12 45H88M17 82H83",
        class: "scene-object-seam"
      }, null, -1)),
      l[6] || (l[6] = a("path", {
        d: "M18 49H82",
        class: "scene-object-shine"
      }, null, -1))
    ], 64)) : e.element.icon === "shelf" ? (r(), c(_, { key: 5 }, [l[7] || (l[7] = a("path", {
      d: "M8 32H92M8 66H92M40 8V32M65 32V66M35 66V92",
      class: "scene-object-seam"
    }, null, -1)), l[8] || (l[8] = a("path", {
      d: "M8 34H92M8 68H92",
      class: "scene-object-shine"
    }, null, -1))], 64)) : e.element.icon === "sofa" ? (r(), c(_, { key: 6 }, [
      l[9] || (l[9] = a("rect", {
        x: "8",
        y: "5",
        width: "84",
        height: "25",
        rx: "7",
        class: "scene-object-inset"
      }, null, -1)),
      (r(), c(_, null, R(3, (f) => a("rect", {
        key: f,
        x: 15 + (f - 1) * 24,
        y: "32",
        width: "22",
        height: "57",
        rx: "5",
        class: "scene-object-inset"
      }, null, 8, wa)), 64)),
      l[10] || (l[10] = a("rect", {
        x: "3",
        y: "23",
        width: "11",
        height: "70",
        rx: "4",
        class: "scene-object-inset"
      }, null, -1)),
      l[11] || (l[11] = a("rect", {
        x: "86",
        y: "23",
        width: "11",
        height: "70",
        rx: "4",
        class: "scene-object-inset"
      }, null, -1))
    ], 64)) : e.element.icon === "bridge" ? (r(), c(_, { key: 7 }, [l[12] || (l[12] = a("path", {
      d: "M7 7V93M93 7V93M9 20H91M9 35H91M9 50H91M9 65H91M9 80H91",
      class: "scene-object-seam"
    }, null, -1)), l[13] || (l[13] = a("path", {
      d: "M11 7V93M89 7V93",
      class: "scene-object-shine"
    }, null, -1))], 64)) : e.element.icon === "tree" ? (r(), c(_, { key: 8 }, [l[14] || (l[14] = Xe('<circle cx="34" cy="32" r="24" class="scene-object-inset"></circle><circle cx="69" cy="36" r="24" class="scene-object-inset"></circle><circle cx="30" cy="62" r="23" class="scene-object-inset"></circle><circle cx="64" cy="67" r="25" class="scene-object-inset"></circle><circle cx="49" cy="48" r="26" class="scene-object-inset"></circle><path d="M21 24q10-10 22-4M36 41q8-9 22-6M64 56q8-1 13 5" class="scene-object-shine"></path>', 6))], 64)) : e.element.icon === "rock" ? (r(), c(_, { key: 9 }, [l[15] || (l[15] = a("path", {
      d: "M8 38 33 12 76 18 93 57 71 88 25 86ZM33 12 41 44 8 38M41 44 76 18M41 44 71 88M41 44 93 57",
      class: "scene-object-seam"
    }, null, -1)), l[16] || (l[16] = a("path", {
      d: "M12 38 33 17 72 22",
      class: "scene-object-shine"
    }, null, -1))], 64)) : w("", !0)], 64)) : w("", !0)], 8, ha)], 8, da));
  }
}), $a = Ma, He = {
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
}, _a = Object.freeze({
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
}), xa = Object.freeze({
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
}), Ca = Object.freeze({
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
}), Sa = Object.freeze({
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
}), ja = Object.freeze({
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
}), La = Object.freeze({
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
}), Le = Object.freeze({
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
}), Oa = Object.freeze({
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
}), Ge = Object.freeze({
  world: "世界",
  region: ye.world.unit,
  city: "城市",
  district: "街区",
  building: "建筑",
  floor: "楼层",
  room: "房间",
  outdoor: "户外"
}), Aa = Object.freeze({
  door: "门",
  stairs: "楼梯",
  elevator: "电梯",
  path: "小径",
  road: "道路",
  portal: "传送门",
  passage: "通道"
});
function Ea(e, n) {
  return e < n ? -1 : e > n ? 1 : 0;
}
function Pa(e, n) {
  const s = _a[e.category], t = ce(e), u = t && (e.material || e.category === "water") ? Ue(e.material || "water", n) : "", d = e.certainty === "inferred" ? "8 6" : e.certainty === "unknown" ? "3 7" : s.dash;
  return {
    ...s,
    fill: t ? u || s.fill : "none",
    opacity: e.certainty === "unknown" ? 0.48 : e.certainty === "inferred" ? 0.72 : 1,
    dash: d,
    icon: e.icon ? ja[e.icon] : e.kind ? Ca[e.kind] : La[e.category],
    fallback: e.kind ? Sa[e.kind] : e.icon && Object.hasOwn(He, e.icon) ? He[e.icon] : xa[e.category].slice(0, 1),
    z: Le[e.category]
  };
}
function Ba(e) {
  const n = (s) => {
    if (!ce(s)) return 0;
    const t = ae(s);
    return t.width * t.height;
  };
  return [...e].sort((s, t) => Le[s.category] - Le[t.category] || n(t) - n(s) || Ea(s.id, t.id));
}
var Ia = {
  sky: {
    color: "#f5f8ff",
    intensity: 1.65
  },
  ground: "#9c8c7a",
  key: {
    color: "#fff3df",
    intensity: 3.1
  },
  fill: {
    color: "#daeaff",
    intensity: 0.65
  },
  shadows: !0,
  lampEmission: 0.18
}, Ta = {
  indoor: {
    sunlight: {
      sky: {
        color: "#dceaff",
        intensity: 0.7
      },
      ground: "#8a8d98",
      key: {
        color: "#fff0d4",
        intensity: 3.6
      },
      fill: {
        color: "#bcd4ff",
        intensity: 0.18
      },
      shadows: !0,
      surface: [
        1.06,
        1.02,
        0.91
      ]
    },
    daylight: {
      sky: {
        color: "#e4eeff",
        intensity: 1.1
      },
      ground: "#8c929b",
      key: {
        color: "#e4edff",
        intensity: 0.4
      },
      fill: {
        color: "#dce9ff",
        intensity: 0.45
      },
      shadows: !1,
      surface: [
        0.89,
        0.94,
        1
      ]
    },
    night: {
      sky: {
        color: "#bccff0",
        intensity: 0.55
      },
      ground: "#667589",
      key: {
        color: "#c5d7ff",
        intensity: 0.12
      },
      fill: {
        color: "#bdd5ff",
        intensity: 0.3
      },
      shadows: !1,
      surface: [
        0.46,
        0.54,
        0.69
      ]
    }
  },
  outdoor: {
    sunlight: {
      sky: {
        color: "#dceeff",
        intensity: 0.9
      },
      ground: "#9b9b8c",
      key: {
        color: "#fff0d4",
        intensity: 4
      },
      fill: {
        color: "#c7deff",
        intensity: 0.25
      },
      shadows: !0,
      surface: [
        1.08,
        1.04,
        0.94
      ]
    },
    daylight: {
      sky: {
        color: "#e1eaff",
        intensity: 1.6
      },
      ground: "#a3a9b2",
      key: {
        color: "#edf2ff",
        intensity: 0.45
      },
      fill: {
        color: "#dbe6ff",
        intensity: 0.65
      },
      shadows: !1,
      surface: [
        0.93,
        0.98,
        1.03
      ]
    },
    night: {
      sky: {
        color: "#b8cfff",
        intensity: 0.48
      },
      ground: "#596f8b",
      key: {
        color: "#c5daff",
        intensity: 0.22
      },
      fill: {
        color: "#abc9ff",
        intensity: 0.26
      },
      shadows: !1,
      surface: [
        0.5,
        0.61,
        0.78
      ]
    }
  }
};
function Ha(e) {
  if (!e) return Ia;
  const n = Ta[e.space][e.natural];
  return e.artificial === "off" ? {
    ...n,
    lampEmission: 0
  } : {
    ...n,
    lampEmission: 1.2
  };
}
function De(e) {
  return { "--scene-glow": Oa[e.mood || "neutral"].glow };
}
function Fe(e) {
  if (!e) return;
  const [n, s, t] = e;
  return `${n} 0 0 0 0  0 ${s} 0 0 0  0 0 ${t} 0 0  0 0 0 1 0`;
}
function Ra(e) {
  return Fe(Ha(e).surface);
}
var Re = [
  -1,
  0.95,
  -0.6
], Se = {
  warm: {
    color: "#ffd59a",
    surface: [
      1.35,
      1.12,
      0.79
    ]
  },
  cold: {
    color: "#c5e4ff",
    surface: [
      0.99,
      1.15,
      1.35
    ]
  }
};
function Na(e) {
  if (e.lighting?.artificial !== "on") return [];
  const n = e.elements.filter((v) => v.category === "terrain" && ce(v)).map(ae).sort((v, h) => h.width * h.height - v.width * v.height)[0], [s, t, u, d] = n ? [
    n.x,
    n.y,
    n.width,
    n.height
  ] : e.viewBox, p = Math.max(u, d) / 14, i = e.elements.filter((v) => v.shape !== "label" && v.material !== "shadow" && (v.category === "light" || v.icon === "light" || v.icon === "fire")).sort((v, h) => v.id.localeCompare(h.id)).slice(0, 4);
  return i.length ? i.map((v) => {
    const h = ae(v), l = Math.max(h.width, h.height), f = v.category === "light" && !v.icon;
    return {
      id: v.id,
      x: h.x + h.width / 2,
      y: h.y + h.height / 2,
      radius: l > 0 ? l * (f ? 1.3 : 6) : p * 3.8,
      overhead: f,
      ...v.material === "cold-light" ? Se.cold : Se.warm
    };
  }) : [{
    id: "overhead",
    x: s + u / 2,
    y: t + d / 2,
    radius: Math.max(u, d) * 0.58,
    overhead: !0,
    ...Se.warm
  }];
}
var za = { key: 0 }, Ka = ["id"], Va = ["values"], qa = ["id"], Ua = ["d", "transform"], Wa = [
  "id",
  "cx",
  "cy",
  "r"
], Ga = [
  "id",
  "x",
  "y",
  "width",
  "height"
], Da = [
  "cx",
  "cy",
  "r",
  "fill"
], Fa = ["id"], Za = ["values"], Qa = ["filter"], Ya = ["id"], Xa = ["data-element", "opacity"], Ja = ["clip-path"], en = ["d", "transform"], tn = ["transform"], an = ["d"], nn = ["d", "stroke-width"], on = [
  "d",
  "fill",
  "stroke",
  "stroke-width",
  "stroke-dasharray",
  "stroke-linecap"
], ln = [
  "d",
  "stroke",
  "stroke-opacity",
  "stroke-dasharray"
], sn = ["transform"], rn = ["id"], cn = ["d"], un = ["clip-path"], dn = [
  "href",
  "x",
  "y",
  "width",
  "height"
], vn = ["mask"], pn = ["href", "filter"], hn = ["opacity", "transform"], fn = {
  key: 0,
  r: "19",
  class: "scene-player-halo"
}, yn = ["stroke"], mn = {
  key: 1,
  class: "map-material-symbol",
  "aria-hidden": "true"
}, bn = {
  key: 2,
  class: "map-symbol-fallback",
  "aria-hidden": "true"
}, gn = ["x", "y"], kn = /* @__PURE__ */ G({
  __name: "MapScene",
  props: { scene: {} },
  setup(e) {
    const n = e, s = H(!1);
    $e(() => {
      Ve().then(() => {
        s.value = !0;
      }).catch(() => {
        s.value = !1;
      });
    });
    const t = `xiaobai-map-scene-${he()}`, u = S(() => Ra(n.scene.lighting)), d = S(() => Na(n.scene)), p = S(() => {
      if (n.scene.lighting?.natural !== "sunlight") return;
      const h = Math.max(n.scene.viewBox[2], n.scene.viewBox[3]) / 14;
      return `translate(${-Re[0] * h * 0.45} ${-Re[2] * h * 0.45})`;
    }), i = S(() => ua(n.scene.elements)), v = S(() => Ba(n.scene.elements).map((h, l) => ({
      element: h,
      bounds: ae(h),
      path: ra(h),
      transform: ia(h),
      area: ce(h),
      presentation: Pa(h, t),
      clipId: `${t}-area-${l}`,
      object: We(h) && !je(h),
      marker: je(h) && h.shape !== "label"
    })));
    return (h, l) => (r(), D(ze, {
      class: "map-scene-viewport",
      style: be(y(De)(e.scene)),
      "view-box": e.scene.viewBox,
      "reset-key": e.scene.key,
      label: `${e.scene.name} 场景地图`
    }, {
      default: Ae(({ unitScale: f }) => [
        C(aa, { prefix: t }),
        u.value ? (r(), c("defs", za, [a("filter", {
          id: `${t}-lighting`,
          x: "-10%",
          y: "-10%",
          width: "120%",
          height: "120%",
          "color-interpolation-filters": "sRGB"
        }, [a("feColorMatrix", {
          type: "matrix",
          values: u.value
        }, null, 8, Va)], 8, Ka)])) : w("", !0),
        a("defs", null, [a("clipPath", { id: `${t}-surfaces` }, [(r(!0), c(_, null, R(v.value, (o) => (r(), c(_, { key: o.element.id }, [o.element.category === "terrain" && o.area ? (r(), c("path", {
          key: 0,
          d: o.path,
          transform: o.transform
        }, null, 8, Ua)) : w("", !0)], 64))), 128))], 8, qa), (r(!0), c(_, null, R(d.value, (o, b) => (r(), c(_, { key: o.id }, [
          a("radialGradient", {
            id: `${t}-pool-${b}`,
            gradientUnits: "userSpaceOnUse",
            cx: o.x,
            cy: o.y,
            r: o.radius
          }, [...l[0] || (l[0] = [
            a("stop", {
              offset: "0",
              "stop-color": "white"
            }, null, -1),
            a("stop", {
              offset: ".18",
              "stop-color": "white",
              "stop-opacity": ".95"
            }, null, -1),
            a("stop", {
              offset: ".55",
              "stop-color": "white",
              "stop-opacity": ".48"
            }, null, -1),
            a("stop", {
              offset: "1",
              "stop-color": "white",
              "stop-opacity": "0"
            }, null, -1)
          ])], 8, Wa),
          a("mask", {
            id: `${t}-mask-${b}`,
            maskUnits: "userSpaceOnUse",
            x: e.scene.viewBox[0],
            y: e.scene.viewBox[1],
            width: e.scene.viewBox[2],
            height: e.scene.viewBox[3]
          }, [a("circle", {
            cx: o.x,
            cy: o.y,
            r: o.radius,
            fill: `url(#${t}-pool-${b})`
          }, null, 8, Da)], 8, Ga),
          a("filter", {
            id: `${t}-lamp-${b}`,
            "color-interpolation-filters": "sRGB"
          }, [a("feColorMatrix", {
            type: "matrix",
            values: y(Fe)(o.surface)
          }, null, 8, Za)], 8, Fa)
        ], 64))), 128))]),
        a("g", { filter: u.value ? `url(#${t}-lighting)` : void 0 }, [a("g", { id: `${t}-artwork` }, [(r(!0), c(_, null, R(v.value, (o) => (r(), c("g", {
          key: o.element.id,
          class: X(["map-scene-element", [`is-${o.element.category}`, `is-${o.element.certainty || "confirmed"}`]]),
          "data-element": o.element.id,
          opacity: o.presentation.opacity
        }, [p.value && o.object && o.path ? (r(), c("g", {
          key: 0,
          "clip-path": `url(#${t}-surfaces)`,
          "aria-hidden": "true"
        }, [a("path", {
          d: o.path,
          transform: `${p.value} ${o.transform || ""}`,
          fill: "#263748",
          opacity: ".3"
        }, null, 8, en)], 8, Ja)) : w("", !0), a("g", { transform: o.transform }, [
          o.object ? (r(), D($a, {
            key: 0,
            element: o.element,
            prefix: t,
            "unit-scale": f
          }, null, 8, ["element", "unit-scale"])) : o.path ? (r(), c(_, { key: 1 }, [
            o.element.category === "wall" ? (r(), c("path", {
              key: 0,
              d: o.path,
              fill: "none",
              stroke: "var(--scene-shadow)",
              "stroke-width": "9",
              opacity: ".18",
              "stroke-linejoin": "round",
              "vector-effect": "non-scaling-stroke"
            }, null, 8, an)) : w("", !0),
            o.element.category === "road" && !o.area ? (r(), c("path", {
              key: 1,
              d: o.path,
              fill: "none",
              stroke: "var(--scene-soft-edge)",
              "stroke-width": o.presentation.width + 2,
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "vector-effect": "non-scaling-stroke"
            }, null, 8, nn)) : w("", !0),
            a("path", {
              d: o.path,
              fill: o.presentation.fill,
              stroke: o.presentation.stroke,
              "stroke-width": o.presentation.width,
              "stroke-dasharray": o.presentation.dash,
              "stroke-linejoin": "round",
              "stroke-linecap": o.element.category === "wall" ? "butt" : "round",
              "fill-rule": "evenodd",
              "vector-effect": "non-scaling-stroke"
            }, null, 8, on),
            o.element.category === "wall" ? (r(), c("path", {
              key: 2,
              d: o.path,
              fill: "none",
              stroke: o.element.material ? y(ve)(o.element.material) : "var(--scene-wall)",
              "stroke-width": "3.5",
              "stroke-opacity": o.element.material === "glass" ? 0.4 : 1,
              "stroke-dasharray": o.presentation.dash,
              "stroke-linejoin": "round",
              "vector-effect": "non-scaling-stroke"
            }, null, 8, ln)) : w("", !0)
          ], 64)) : w("", !0),
          o.object && !y(sa)(o.element) && Math.min(o.bounds.width, o.bounds.height) / f >= 12 ? (r(), c("g", {
            key: 2,
            transform: `translate(${o.bounds.x + o.bounds.width / 2} ${o.bounds.y + o.bounds.height / 2})`,
            "aria-hidden": "true"
          }, [a("text", {
            class: X(s.value ? "map-material-symbol" : "map-symbol-fallback"),
            style: be({
              fontSize: `${Math.min(22 * f, Math.min(o.bounds.width, o.bounds.height) * 0.65)}px`,
              fill: "var(--scene-edge)",
              textAnchor: "middle",
              dominantBaseline: "central"
            })
          }, m(s.value ? o.presentation.icon : o.presentation.fallback), 7)], 8, sn)) : w("", !0),
          i.value.has(o.element.id) ? (r(), c(_, { key: 3 }, [a("defs", null, [a("clipPath", { id: o.clipId }, [a("path", {
            d: o.path,
            "clip-rule": "evenodd"
          }, null, 8, cn)], 8, rn)]), a("g", {
            "clip-path": `url(#${o.clipId})`,
            class: "scene-forest-decoration",
            "aria-hidden": "true"
          }, [(r(!0), c(_, null, R(i.value.get(o.element.id), (b, O) => (r(), c("use", {
            key: O,
            href: `#${t}-crown-${b.variant}`,
            x: b.x - b.size / 2,
            y: b.y - b.size / 2,
            width: b.size,
            height: b.size
          }, null, 8, dn))), 128))], 8, un)], 64)) : w("", !0)
        ], 8, tn)], 10, Xa))), 128))], 8, Ya)], 8, Qa),
        (r(!0), c(_, null, R(d.value, (o, b) => (r(), c("g", {
          key: o.id,
          mask: `url(#${t}-mask-${b})`,
          "aria-hidden": "true"
        }, [a("use", {
          href: `#${t}-artwork`,
          filter: `url(#${t}-lamp-${b})`
        }, null, 8, pn)], 8, vn))), 128)),
        (r(!0), c(_, null, R(v.value, (o) => (r(), c(_, { key: o.element.id }, [o.marker ? (r(), c("g", {
          key: 0,
          class: X(["map-scene-icon", `is-${o.element.category}`]),
          opacity: o.presentation.opacity,
          transform: `translate(${o.bounds.x + o.bounds.width / 2} ${o.bounds.y + o.bounds.height / 2}) scale(${f})`
        }, [
          o.element.actorKey === "player" || o.element.kind === "player" ? (r(), c("circle", fn)) : w("", !0),
          a("circle", {
            r: "11",
            stroke: o.presentation.stroke
          }, null, 8, yn),
          s.value ? (r(), c("text", mn, m(o.presentation.icon), 1)) : (r(), c("text", bn, m(o.presentation.fallback), 1))
        ], 10, hn)) : w("", !0)], 64))), 128)),
        a("g", {
          class: "scene-labels",
          style: be({ "--scene-unit-scale": f })
        }, [(r(!0), c(_, null, R(v.value, (o) => (r(), c(_, { key: o.element.id }, [o.element.label ? (r(), c("text", {
          key: 0,
          class: X(["map-scene-label", { "is-primary": o.element.shape === "label" }]),
          x: y(Te)(o.element, f)[0],
          y: y(Te)(o.element, f)[1]
        }, m(o.element.label), 11, gn)) : w("", !0)], 64))), 128))], 4)
      ]),
      _: 1
    }, 8, [
      "style",
      "view-box",
      "reset-key",
      "label"
    ]));
  }
}), wn = kn, Mn = {
  key: 0,
  class: "map-3d-loading",
  role: "status"
}, $n = {
  class: "map-viewport-controls",
  "aria-label": "三维视角"
}, _n = /* @__PURE__ */ G({
  __name: "MapScene3D",
  props: {
    scene: {},
    lowWalls: { type: Boolean },
    showLabels: { type: Boolean }
  },
  emits: ["fallback"],
  setup(e, { emit: n }) {
    const s = e, t = n, u = H(null), d = H(null), p = H(!0);
    let i, v = !1;
    return $e(async () => {
      v = !0;
      try {
        const { createThreeRuntime: h } = await import("./xiaobai-os-three-runtime-DSJrelfs.js");
        if (!v) return;
        i = h(u.value, d.value, { fallback: (l) => t("fallback", l) }), i.setScene(s.scene), i.walls(s.lowWalls), i.labels(s.showLabels), p.value = !1, Ve().then(() => {
          v && i?.symbols(!0);
        }).catch(() => {
        });
      } catch {
        v && t("fallback", "当前设备无法打开三维，已切换二维。");
      }
    }), ee(() => s.scene, (h) => i?.setScene(h)), ee(() => s.lowWalls, (h) => i?.walls(h)), ee(() => s.showLabels, (h) => i?.labels(h)), Oe(() => {
      v = !1, i?.dispose(), i = void 0;
    }), (h, l) => (r(), c("div", {
      ref_key: "host",
      ref: u,
      class: "map-scene-three",
      style: be(y(De)(e.scene))
    }, [
      a("div", {
        ref_key: "labelHost",
        ref: d,
        class: "map-3d-labels"
      }, null, 512),
      p.value ? (r(), c("div", Mn, "正在打开三维…")) : w("", !0),
      a("div", $n, [
        a("button", {
          type: "button",
          "aria-label": "放大三维",
          onClick: l[0] || (l[0] = (f) => y(i)?.zoom(1.2))
        }, "+"),
        a("button", {
          type: "button",
          "aria-label": "缩小三维",
          onClick: l[1] || (l[1] = (f) => y(i)?.zoom(1 / 1.2))
        }, "−"),
        a("button", {
          type: "button",
          class: "map-fit",
          "aria-label": "重置三维视角",
          onClick: l[2] || (l[2] = (f) => y(i)?.fit())
        }, "全图")
      ])
    ], 4));
  }
}), xn = _n, Cn = ["aria-label"], Sn = {
  key: 0,
  class: "map-scene-toolbar"
}, jn = ["aria-label"], Ln = ["aria-pressed"], On = ["aria-pressed", "disabled"], An = ["aria-pressed"], En = ["aria-pressed"], Pn = { class: "map-scene-stage" }, Bn = /* @__PURE__ */ G({
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
  setup(e, { emit: n }) {
    const s = n, t = pe(e, "lowWalls"), u = pe(e, "showLabels");
    return (d, p) => (r(), c("section", {
      class: "map-scene-view",
      "aria-label": e.scene.name
    }, [e.compact ? w("", !0) : (r(), c("div", Sn, [
      a("div", {
        class: "map-render-switch",
        role: "group",
        "aria-label": y(Y).mode
      }, [a("button", {
        type: "button",
        "aria-pressed": e.mode === "2d",
        onClick: p[0] || (p[0] = (i) => s("update:mode", "2d"))
      }, m(y(Y).two), 9, Ln), a("button", {
        type: "button",
        "aria-pressed": e.mode === "3d",
        disabled: e.threeUnavailable,
        onClick: p[1] || (p[1] = (i) => s("update:mode", "3d"))
      }, m(y(Y).three), 9, On)], 8, jn),
      e.mode === "3d" ? (r(), c("button", {
        key: 0,
        type: "button",
        "aria-pressed": t.value,
        onClick: p[2] || (p[2] = (i) => t.value = !t.value)
      }, m(y(Y).lowWalls), 9, An)) : w("", !0),
      e.mode === "3d" ? (r(), c("button", {
        key: 1,
        type: "button",
        "aria-pressed": u.value,
        onClick: p[3] || (p[3] = (i) => u.value = !u.value)
      }, m(y(Y).labels), 9, En)) : w("", !0)
    ])), a("div", Pn, [Ee(C(wn, { scene: e.scene }, null, 8, ["scene"]), [[Ne, e.mode === "2d"]]), e.mode === "3d" ? (r(), D(xn, {
      key: 0,
      scene: e.scene,
      "low-walls": t.value,
      "show-labels": u.value,
      onFallback: p[4] || (p[4] = (i) => s("fallback", i))
    }, null, 8, [
      "scene",
      "low-walls",
      "show-labels"
    ])) : w("", !0)])], 8, Cn));
  }
}), In = Bn, Tn = { class: "map-legend-content" }, Hn = /* @__PURE__ */ G({
  __name: "MapLegend",
  setup(e) {
    return (n, s) => (r(), c("div", Tn, [
      a("strong", null, m(y(B).legendTitle), 1),
      a("p", null, [
        s[0] || (s[0] = a("i", { class: "map-key-current" }, null, -1)),
        W(m(y(B).legendCurrent) + " ", 1),
        s[1] || (s[1] = a("i", { class: "map-key-place" }, null, -1)),
        W(m(y(B).legendPlace), 1)
      ]),
      a("p", null, m(y(B).legendRoutes), 1),
      a("small", null, m(y(B).legend), 1)
    ]));
  }
}), Ze = Hn, Rn = ["aria-label"], Nn = [
  "aria-label",
  "aria-pressed",
  "onClick"
], zn = ["aria-label", "aria-expanded"], Kn = ["aria-label"], Vn = {
  key: 0,
  class: "map-projection-scene-options"
}, qn = ["aria-label"], Un = ["aria-pressed"], Wn = ["aria-pressed", "disabled"], Gn = {
  key: 0,
  class: "map-projection-toggles"
}, Dn = ["aria-pressed"], Fn = ["aria-pressed"], Zn = ["disabled"], Qn = ["aria-expanded"], Yn = /* @__PURE__ */ G({
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
  setup(e, { emit: n }) {
    const s = e, t = n, u = pe(e, "mode"), d = pe(e, "lowWalls"), p = pe(e, "showLabels"), i = H(!1), v = H(!1), h = H(null), l = H(null), f = `map-projection-options-${he()}`;
    function o() {
      i.value = !1, v.value = !1;
    }
    function b(V) {
      h.value?.contains(V.target) || o();
    }
    function O(V) {
      V.key !== "Escape" || !i.value || (V.preventDefault(), V.stopPropagation(), o(), l.value?.focus({ preventScroll: !0 }));
    }
    return ee(() => s.view, o), $e(() => document.addEventListener("pointerdown", b)), Oe(() => document.removeEventListener("pointerdown", b)), (V, E) => (r(), c("div", {
      ref_key: "root",
      ref: h,
      class: "map-projection-controls",
      onKeydown: O
    }, [
      a("nav", {
        class: "map-projection-tabs",
        "aria-label": y(B).viewLabel
      }, [(r(!0), c(_, null, R(y(de).views, (A, x) => (r(), c("button", {
        key: x,
        type: "button",
        "aria-label": y(J)[x],
        "aria-pressed": e.view === x,
        onClick: (N) => {
          o(), t("navigate", x);
        }
      }, m(A), 9, Nn))), 128))], 8, Rn),
      a("button", {
        ref_key: "trigger",
        ref: l,
        type: "button",
        class: "map-projection-options-button",
        "aria-label": y(de).options,
        "aria-expanded": i.value,
        "aria-controls": f,
        onClick: E[0] || (E[0] = (A) => i.value ? o() : i.value = !0)
      }, [C(L, { name: "more" })], 8, zn),
      i.value ? (r(), c("section", {
        key: 0,
        id: f,
        class: "map-projection-options",
        "aria-label": y(de).options
      }, [
        e.view === "scene" && e.sceneAvailable ? (r(), c("div", Vn, [a("div", {
          class: "map-render-switch",
          role: "group",
          "aria-label": y(Y).mode
        }, [a("button", {
          type: "button",
          "aria-pressed": u.value === "2d",
          onClick: E[1] || (E[1] = (A) => u.value = "2d")
        }, m(y(Y).two), 9, Un), a("button", {
          type: "button",
          "aria-pressed": u.value === "3d",
          disabled: e.threeUnavailable,
          onClick: E[2] || (E[2] = (A) => u.value = "3d")
        }, m(y(Y).three), 9, Wn)], 8, qn), u.value === "3d" ? (r(), c("div", Gn, [a("button", {
          type: "button",
          "aria-pressed": d.value,
          onClick: E[3] || (E[3] = (A) => d.value = !d.value)
        }, m(y(Y).lowWalls), 9, Dn), a("button", {
          type: "button",
          "aria-pressed": p.value,
          onClick: E[4] || (E[4] = (A) => p.value = !p.value)
        }, m(y(Y).labels), 9, Fn)])) : w("", !0)])) : w("", !0),
        a("button", {
          type: "button",
          disabled: !e.located,
          onClick: E[5] || (E[5] = (A) => {
            t("locate"), o();
          })
        }, [C(L, { name: "locate" }), W(m(y(de).location), 1)], 8, Zn),
        a("button", {
          type: "button",
          "aria-expanded": v.value,
          onClick: E[6] || (E[6] = (A) => v.value = !v.value)
        }, [C(L, { name: "layers" }), W(m(y(B).legendLabel), 1)], 8, Qn),
        v.value ? (r(), D(Ze, { key: 1 })) : w("", !0)
      ], 8, Kn)) : w("", !0)
    ], 544));
  }
}), Xn = Yn;
function Jn(e) {
  const n = e?.atlas.actors.find((t) => t.actorKey === "player"), s = e?.atlas.locations.find((t) => t.key === n?.locationKey);
  return s?.sceneKey && e?.scenes[s.sceneKey]?.status === "active" ? "scene" : "world";
}
function eo(e, n) {
  const s = n === null ? void 0 : e.locations.find((i) => i.key === n && te(i)), t = ut(e), u = (n === null ? e.locations.filter(te) : s ? e.locations.filter((i) => ct(i) && ke(e, i.key)?.key === s.key) : []).map((i) => t.has(i.key) ? {
    ...i,
    status: "visited"
  } : i), d = n === null ? u.filter((i) => !fe(e, i.key).slice(0, -1).some(te)) : [], p = new Set(d.map((i) => i.parent || ""));
  return {
    kind: n === null ? "world" : "region",
    region: s,
    locations: u,
    unvisited: u.filter((i) => i.status !== "visited").length,
    positionParent: s ? s.key : p.size === 1 ? [...p][0] : null
  };
}
function to(e, n, s) {
  const t = n.trim().toLocaleLowerCase();
  return e.locations.filter((u) => [u.name, u.brief].some((d) => d?.toLocaleLowerCase().includes(t)) && (s === "all" || (s === "visited" ? u.status === "visited" : u.status !== "visited")));
}
var ao = { class: "map-search-input" }, no = ["aria-label", "placeholder"], oo = { class: "map-search-scope" }, lo = ["aria-label"], so = ["aria-pressed", "onClick"], ro = { class: "map-search-results" }, io = ["onClick"], co = { class: "map-result-icon" }, uo = { key: 0 }, vo = {
  key: 0,
  class: "map-search-empty"
}, po = /* @__PURE__ */ G({
  __name: "MapSearch",
  props: {
    scope: {},
    title: {},
    initialFilter: {}
  },
  emits: ["close", "select"],
  setup(e) {
    const n = e, s = H(""), t = H(n.initialFilter), u = S(() => ye[n.scope.kind]), d = S(() => [
      {
        id: "all",
        name: u.value.all
      },
      {
        id: "unvisited",
        name: se.unvisited
      },
      {
        id: "visited",
        name: se.visited
      }
    ]), p = S(() => to(n.scope, s.value, t.value));
    return (i, v) => (r(), D(tt, {
      class: "map-dialog map-search-dialog",
      "aria-label": u.value.search,
      onClose: v[2] || (v[2] = (h) => i.$emit("close"))
    }, {
      default: Ae(() => [
        a("header", ao, [
          C(L, { name: "search" }),
          Ee(a("input", {
            "onUpdate:modelValue": v[0] || (v[0] = (h) => s.value = h),
            type: "search",
            "aria-label": u.value.search,
            placeholder: u.value.search,
            autofocus: ""
          }, null, 8, no), [[et, s.value]]),
          a("button", {
            type: "button",
            onClick: v[1] || (v[1] = (h) => i.$emit("close"))
          }, m(y(B).cancel), 1)
        ]),
        a("h2", oo, m(e.title), 1),
        a("nav", {
          class: "map-search-filters",
          "aria-label": y(B).filters
        }, [(r(!0), c(_, null, R(d.value, (h) => (r(), c("button", {
          key: h.id,
          type: "button",
          "aria-pressed": t.value === h.id,
          onClick: (l) => t.value = h.id
        }, m(h.name), 9, so))), 128))], 8, lo),
        a("div", ro, [
          a("small", null, m(y(Ke)(e.scope.kind, p.value.length)), 1),
          (r(!0), c(_, null, R(p.value, (h) => (r(), c("button", {
            key: h.key,
            type: "button",
            class: "map-search-result",
            onClick: (l) => i.$emit("select", h.key)
          }, [
            a("span", co, [C(L, { name: e.scope.kind === "world" ? "globe" : "pin" }, null, 8, ["name"])]),
            a("span", null, [
              a("strong", null, m(h.name), 1),
              a("small", null, m(y(Ge)[h.scale]) + " · " + m(y(se)[h.status === "visited" ? "visited" : "unvisited"]), 1),
              h.brief ? (r(), c("p", uo, m(h.brief), 1)) : w("", !0)
            ]),
            C(L, { name: "next" })
          ], 8, io))), 128)),
          p.value.length ? w("", !0) : (r(), c("div", vo, [
            C(L, { name: "search" }),
            a("h3", null, m(u.value.notFound), 1),
            a("p", null, m(y(B).searchHint), 1)
          ]))
        ])
      ]),
      _: 1
    }, 8, ["aria-label"]));
  }
}), ho = po, fo = {
  class: "map-place-detail",
  "aria-labelledby": "map-place-title"
}, yo = { id: "map-place-title" }, mo = { class: "map-place-content" }, bo = {
  key: 0,
  class: "map-place-full-name"
}, go = {
  key: 1,
  class: "map-address"
}, ko = { class: "map-place-intro" }, wo = { class: "map-place-actions" }, Mo = {
  key: 2,
  class: "map-detail-section"
}, $o = { class: "map-people" }, _o = {
  key: 3,
  class: "map-detail-section"
}, xo = ["onClick"], Co = /* @__PURE__ */ G({
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
    const n = e, s = S(() => fe(n.map.atlas, n.location.key).slice(0, -1)), t = S(() => te(n.location)), u = S(() => n.map.atlas.actors.filter((p) => p.locationKey === n.location.key)), d = S(() => dt(n.map.atlas, n.location.key));
    return (p, i) => (r(), c("section", fo, [
      i[6] || (i[6] = a("div", {
        class: "map-sheet-grip",
        "aria-hidden": "true"
      }, null, -1)),
      a("header", null, [a("div", null, [a("small", null, m(y(Ge)[e.location.scale]) + " · " + m(e.currentKey === e.location.key ? "当前位置" : y(se)[e.location.status === "visited" ? "visited" : "unvisited"]), 1), a("h2", yo, m(e.location.name), 1)]), a("button", {
        type: "button",
        class: "map-round-button",
        "aria-label": "关闭地点详情",
        onClick: i[0] || (i[0] = (v) => p.$emit("close"))
      }, [C(L, { name: "close" })])]),
      a("div", mo, [
        e.location.name.length > 24 ? (r(), c("p", bo, m(e.location.name), 1)) : w("", !0),
        s.value.length ? (r(), c("p", go, [C(L, { name: "pin" }), W(m(s.value.map((v) => v.name).join(" · ")), 1)])) : w("", !0),
        a("p", ko, m(e.location.brief || "这个地点已记录在世界地图上，更多介绍等待故事展开。"), 1),
        a("div", wo, [t.value ? (r(), c("button", {
          key: 0,
          type: "button",
          class: "map-primary-button",
          onClick: i[1] || (i[1] = (v) => p.$emit("explore"))
        }, [C(L, { name: "compass" }), W(m(y(B).regionMap), 1)])) : (r(), c("button", {
          key: 1,
          type: "button",
          class: "map-secondary-button",
          onClick: i[2] || (i[2] = (v) => p.$emit("scene"))
        }, [C(L, { name: "layers" }), W(m(y(B).sceneMap), 1)]))]),
        u.value.length ? (r(), c("section", Mo, [i[3] || (i[3] = a("h3", null, "记录在这里的人物", -1)), a("p", $o, [(r(!0), c(_, null, R(u.value, (v) => (r(), c("span", { key: v.actorKey }, [C(L, { name: "person" }), W(m(v.displayName), 1)]))), 128))])])) : w("", !0),
        d.value.length ? (r(), c("section", _o, [i[4] || (i[4] = a("h3", null, "相连的地方", -1)), (r(!0), c(_, null, R(d.value, (v) => (r(), c("button", {
          key: v.link.id,
          type: "button",
          class: "map-connection",
          onClick: (h) => p.$emit("select", v.location.key)
        }, [
          C(L, { name: "route" }),
          a("span", null, [a("strong", null, m(v.location.name), 1), a("small", null, m(v.link.label || y(Aa)[v.link.kind]) + m(v.link.bidirectional ? "" : v.outgoing ? " · 单向前往" : " · 仅可从对面到达"), 1)]),
          C(L, { name: "next" })
        ], 8, xo))), 128))])) : w("", !0),
        i[5] || (i[5] = a("p", { class: "map-detail-footnote" }, "查看地图不会改变你在故事中的位置", -1))
      ])
    ]));
  }
}), So = Co, jo = { class: "map-top" }, Lo = { class: "map-search-bar" }, Oo = ["disabled"], Ao = {
  key: 1,
  class: "map-search-entry"
}, Eo = {
  key: 0,
  class: "map-view-row"
}, Po = ["aria-label"], Bo = ["aria-pressed"], Io = ["aria-pressed"], To = ["aria-pressed"], Ho = {
  key: 0,
  class: "map-scene-tools"
}, Ro = ["aria-expanded", "aria-label"], No = ["aria-label"], zo = ["aria-current"], Ko = { "aria-current": "page" }, Vo = {
  key: 1,
  class: "map-notice",
  role: "status"
}, qo = {
  key: 1,
  class: "map-empty"
}, Uo = {
  key: 2,
  class: "map-empty"
}, Wo = { class: "map-empty" }, Go = ["disabled"], Do = ["aria-expanded", "aria-label"], Fo = {
  key: 2,
  class: "map-key"
}, Zo = ["aria-label"], Qo = { class: "map-region-icon" }, Yo = {
  class: "map-round-button",
  "aria-hidden": "true"
}, Xo = {
  key: 5,
  class: "map-scene-caption"
}, Jo = ["title"], el = /* @__PURE__ */ G({
  __name: "MapBrowser",
  props: {
    map: {},
    chatIdentity: {},
    compact: { type: Boolean }
  },
  setup(e) {
    const n = e, s = `map-browse-summary-${he()}`, t = H(""), u = () => Jn(n.map) === "scene" ? {
      kind: "scene",
      key: ""
    } : { kind: "world" }, d = H(u()), p = H("3d"), i = H(!1), v = H(!0), h = H(!1), l = H("");
    let f = !1;
    const o = S(() => d.value.kind === "scene"), b = S(() => d.value.kind === "scene" ? d.value.key : ""), O = H(""), V = H(0), E = H(null), A = H(!1), x = S(() => n.map?.atlas), N = S(() => x.value?.actors.find(($) => $.actorKey === "player")?.locationKey || ""), U = S(() => x.value?.locations.find(($) => $.key === N.value)), z = S(() => x.value?.locations.find(($) => $.key === (b.value || N.value))), q = S(() => o.value && z.value?.sceneKey ? n.map?.scenes[z.value.sceneKey] : void 0), I = S(() => {
      if (!x.value || d.value.kind === "world") return;
      const $ = d.value.key || N.value;
      return ke(x.value, $);
    }), P = S(() => eo(x.value || {
      locations: [],
      links: [],
      actors: []
    }, d.value.kind === "world" ? null : I.value?.key || "")), F = S(() => P.value.locations.find(($) => $.key === t.value)), k = S(() => P.value.kind === "world" ? J.world : I.value?.name || B.unknownRegion), j = S(() => ye[P.value.kind]), T = S(() => P.value.unvisited ? "unvisited" : "all");
    ee(() => ({
      map: n.map,
      chatIdentity: n.chatIdentity
    }), ($, g) => {
      const M = $.chatIdentity !== g.chatIdentity;
      (M || !$.map?.atlas.locations.some((xe) => xe.key === t.value)) && (t.value = ""), M && (f = !1);
      const ne = d.value.kind === "world" ? "" : d.value.key, Ye = ne && !$.map?.atlas.locations.some((xe) => xe.key === ne);
      (M || !g.map?.atlas.locations.length && $.map?.atlas.locations.length && !f || Ye) && (d.value = u()), M && (E.value = null, A.value = !1);
    }), ee(P, ($, g) => {
      $.locations.some((M) => M.key === t.value) || (t.value = ""), ($.kind !== g.kind || $.region?.key !== g.region?.key || !x.value) && (t.value = "", E.value = null, A.value = !1);
    });
    function K($) {
      f = !0, d.value = $, t.value = "", E.value = null, A.value = !1;
    }
    function Z($ = "") {
      K({
        kind: "region",
        key: $
      });
    }
    async function Q($, g = !1) {
      const M = x.value?.locations.find((ne) => ne.key === $);
      if (M) {
        if (f = !0, g && x.value) {
          if (te(M)) ie();
          else {
            const ne = ke(x.value, $);
            if (!ne) {
              re($);
              return;
            }
            Z(ne.key);
          }
          await Ce();
        }
        t.value = $, E.value = null, A.value = !1, await Ce(), O.value = x.value ? Me(x.value, $, P.value.locations) : $, V.value += 1;
      }
    }
    async function Be() {
      if (!(!U.value || !x.value)) {
        if (te(U.value)) {
          await Q(U.value.key, !0);
          return;
        }
        if (!ke(x.value, U.value.key)) {
          re();
          return;
        }
        Z(), await Ce(), await Q(U.value.key);
      }
    }
    function re($ = "") {
      K({
        kind: "scene",
        key: $ === N.value ? "" : $
      });
    }
    function ie() {
      K({ kind: "world" });
    }
    function Qe($) {
      h.value || (h.value = !0, p.value = "2d", l.value = $);
    }
    return Je(() => A.value ? (A.value = !1, !0) : o.value ? (Z(b.value && I.value?.key || ""), !0) : t.value ? (t.value = "", !0) : d.value.kind === "region" ? (ie(), !0) : !1), ($, g) => (r(), c("main", { class: X(["map-app", {
      "has-view-switch": x.value?.locations.length,
      "is-scene-view": o.value
    }]) }, [
      e.compact && x.value?.locations.length ? (r(), D(Xn, {
        key: 0,
        mode: p.value,
        "onUpdate:mode": g[0] || (g[0] = (M) => p.value = M),
        "low-walls": i.value,
        "onUpdate:lowWalls": g[1] || (g[1] = (M) => i.value = M),
        "show-labels": v.value,
        "onUpdate:showLabels": g[2] || (g[2] = (M) => v.value = M),
        view: d.value.kind,
        "scene-available": q.value?.status === "active",
        "three-unavailable": h.value,
        located: !!U.value,
        onNavigate: g[3] || (g[3] = (M) => K(M === "world" ? { kind: M } : {
          kind: M,
          key: ""
        })),
        onLocate: g[4] || (g[4] = (M) => o.value ? re() : Be())
      }, null, 8, [
        "mode",
        "low-walls",
        "show-labels",
        "view",
        "scene-available",
        "three-unavailable",
        "located"
      ])) : w("", !0),
      a("div", jo, [
        e.compact ? w("", !0) : (r(), c(_, { key: 0 }, [
          a("header", Lo, [
            C(L, { name: o.value ? "layers" : "search" }, null, 8, ["name"]),
            o.value ? (r(), c("div", Ao, [W(m(z.value?.name || y(J).scene), 1), a("small", null, m(b.value ? y(B).sceneBrowsing : y(B).sceneCurrent), 1)])) : (r(), c("button", {
              key: 0,
              type: "button",
              class: "map-search-entry",
              disabled: !x.value?.locations.length,
              onClick: g[5] || (g[5] = (M) => E.value = "all")
            }, [W(m(j.value.search), 1), a("small", null, m(k.value), 1)], 8, Oo)),
            oe($.$slots, "toolbar")
          ]),
          x.value?.locations.length ? (r(), c("div", Eo, [a("nav", {
            class: "map-view-switch",
            "aria-label": y(B).viewLabel
          }, [
            a("button", {
              type: "button",
              "aria-pressed": d.value.kind === "world",
              onClick: ie
            }, [C(L, { name: "globe" }), W(m(y(J).world), 1)], 8, Bo),
            a("button", {
              type: "button",
              "aria-pressed": d.value.kind === "region",
              onClick: g[6] || (g[6] = (M) => Z())
            }, [C(L, { name: "compass" }), W(m(y(J).region), 1)], 8, Io),
            a("button", {
              type: "button",
              "aria-pressed": o.value,
              onClick: g[7] || (g[7] = (M) => re())
            }, [C(L, { name: "layers" }), W(m(y(J).scene), 1)], 8, To)
          ], 8, Po), o.value ? (r(), c("div", Ho, [b.value ? (r(), c("button", {
            key: 0,
            type: "button",
            class: "map-round-button",
            "aria-label": "回到当前场景",
            onClick: g[8] || (g[8] = (M) => re())
          }, [C(L, { name: "locate" })])) : w("", !0), a("button", {
            type: "button",
            class: "map-round-button",
            "aria-expanded": A.value,
            "aria-label": y(B).legendLabel,
            onClick: g[9] || (g[9] = (M) => A.value = !A.value)
          }, [C(L, { name: "layers" })], 8, Ro)])) : w("", !0)])) : w("", !0),
          x.value?.locations.length && !o.value ? (r(), c("nav", {
            key: 1,
            class: "map-region-trail",
            "aria-label": y(B).trailLabel
          }, [a("button", {
            type: "button",
            "aria-current": d.value.kind === "world" ? "page" : void 0,
            onClick: ie
          }, [C(L, { name: "globe" }), W(m(y(J).world), 1)], 8, zo), d.value.kind === "region" ? (r(), c(_, { key: 0 }, [C(L, { name: "next" }), a("span", Ko, m(k.value), 1)], 64)) : w("", !0)], 8, No)) : w("", !0)
        ], 64)),
        l.value ? (r(), c("aside", Vo, [a("p", null, m(l.value), 1), a("button", {
          type: "button",
          class: "map-notice-close",
          "aria-label": "关闭三维提示",
          onClick: g[10] || (g[10] = (M) => l.value = "")
        }, [C(L, { name: "close" })])])) : w("", !0),
        oe($.$slots, "feedback")
      ]),
      a("div", { class: X(["map-canvas", { "has-detail": F.value && !o.value }]) }, [e.map && x.value?.locations.length ? (r(), c(_, { key: 0 }, [
        P.value.locations.length ? Ee((r(), D(St, {
          key: 0,
          atlas: e.map.atlas,
          scope: P.value,
          label: k.value,
          "current-location-key": N.value,
          "selected-location-key": t.value,
          "focus-key": O.value,
          "focus-sequence": V.value,
          onSelect: g[11] || (g[11] = (M) => Q(M))
        }, null, 8, [
          "atlas",
          "scope",
          "label",
          "current-location-key",
          "selected-location-key",
          "focus-key",
          "focus-sequence"
        ])), [[Ne, !o.value]]) : w("", !0),
        o.value ? (r(), c(_, { key: 1 }, [q.value?.status === "active" ? (r(), D(In, {
          key: 0,
          mode: p.value,
          "onUpdate:mode": g[12] || (g[12] = (M) => p.value = M),
          "low-walls": i.value,
          "onUpdate:lowWalls": g[13] || (g[13] = (M) => i.value = M),
          "show-labels": v.value,
          "onUpdate:showLabels": g[14] || (g[14] = (M) => v.value = M),
          scene: q.value,
          compact: e.compact,
          "three-unavailable": h.value,
          onFallback: Qe
        }, null, 8, [
          "mode",
          "low-walls",
          "show-labels",
          "scene",
          "compact",
          "three-unavailable"
        ])) : (r(), c("div", qo, [
          C(L, { name: "layers" }),
          a("h2", null, m(z.value ? y(B).sceneEmpty : y(B).unknownLocation), 1),
          b.value && b.value !== N.value ? (r(), c("button", {
            key: 0,
            type: "button",
            class: "map-secondary-button",
            onClick: g[15] || (g[15] = (M) => I.value ? Z(I.value.key) : ie())
          }, m(I.value ? y(B).regionMap : y(J).world), 1)) : oe($.$slots, "scene-empty-action", {
            key: 1,
            located: !!z.value
          })
        ]))], 64)) : w("", !0),
        !o.value && !P.value.locations.length ? (r(), c("div", Uo, [
          C(L, { name: "pin" }),
          a("h2", null, m(d.value.kind === "region" && !I.value ? y(B).unknownRegion : j.value.empty), 1),
          a("p", null, m(d.value.kind === "region" && !I.value ? y(B).unknownRegionHint : j.value.emptyHint), 1),
          d.value.kind === "region" ? (r(), c("button", {
            key: 0,
            type: "button",
            class: "map-secondary-button",
            onClick: ie
          }, m(y(J).world), 1)) : oe($.$slots, "scope-empty-action", { key: 1 })
        ])) : w("", !0)
      ], 64)) : oe($.$slots, "empty-map", { key: 1 }, () => [a("div", Wo, [C(L, { name: "globe" }), a("h2", null, m(y(de).empty), 1)])])], 2),
      !e.compact && x.value?.locations.length && !o.value ? (r(), c("div", {
        key: 1,
        class: X(["map-floating-tools", { "has-detail": F.value }])
      }, [a("button", {
        type: "button",
        class: "map-round-button",
        disabled: !U.value,
        "aria-label": "回到我的位置",
        onClick: Be
      }, [C(L, { name: "locate" })], 8, Go), a("button", {
        type: "button",
        class: "map-round-button",
        "aria-expanded": A.value,
        "aria-label": y(B).legendLabel,
        onClick: g[16] || (g[16] = (M) => A.value = !A.value)
      }, [C(L, { name: "layers" })], 8, Do)], 2)) : w("", !0),
      A.value ? (r(), c("aside", Fo, [C(Ze)])) : w("", !0),
      F.value && e.map && !o.value ? (r(), D(So, {
        key: F.value.key,
        location: F.value,
        map: e.map,
        "current-key": N.value,
        onClose: g[17] || (g[17] = (M) => t.value = ""),
        onScene: g[18] || (g[18] = (M) => re(F.value.key)),
        onExplore: g[19] || (g[19] = (M) => Z(F.value.key)),
        onSelect: g[20] || (g[20] = (M) => Q(M, !0))
      }, null, 8, [
        "location",
        "map",
        "current-key"
      ])) : !e.compact && x.value?.locations.length && !o.value ? (r(), c("button", {
        key: 4,
        type: "button",
        class: "map-region-card",
        "aria-label": y(ht)(P.value.kind, T.value),
        "aria-describedby": s,
        onClick: g[21] || (g[21] = (M) => E.value = T.value)
      }, [
        a("span", Qo, [C(L, { name: P.value.kind === "world" ? "globe" : "compass" }, null, 8, ["name"])]),
        a("span", {
          id: s,
          class: "map-region-summary"
        }, [a("strong", null, m(k.value), 1), a("small", null, m(y(pt)(P.value.kind, P.value.locations.length, P.value.unvisited)), 1)]),
        a("span", Yo, [C(L, { name: "next" })])
      ], 8, Zo)) : !e.compact && o.value && x.value?.locations.length ? (r(), c("footer", Xo, [C(L, { name: "layers" }), a("span", null, [a("strong", null, m(z.value?.name || "当前位置待确认"), 1), a("small", null, m(b.value ? "正在查看场景图 · 不会移动人物" : "当前位置的场景图"), 1)])])) : w("", !0),
      e.compact && x.value?.locations.length && !F.value ? (r(), c("div", {
        key: 6,
        class: "map-projection-caption",
        title: o.value ? z.value?.name : k.value
      }, [C(L, { name: o.value ? "pin" : "compass" }, null, 8, ["name"]), a("span", null, m(o.value ? z.value?.name || y(B).unknownLocation : k.value), 1)], 8, Jo)) : w("", !0),
      E.value && x.value ? (r(), D(ho, {
        key: 7,
        scope: P.value,
        title: k.value,
        "initial-filter": E.value,
        onClose: g[22] || (g[22] = (M) => E.value = null),
        onSelect: g[23] || (g[23] = (M) => Q(M))
      }, null, 8, [
        "scope",
        "title",
        "initial-filter"
      ])) : w("", !0),
      oe($.$slots, "overlay")
    ], 2));
  }
}), pl = el;
export {
  de as _,
  xa as a,
  ua as c,
  We as d,
  ae as f,
  B as g,
  Ot as h,
  Ha as i,
  ce as l,
  vl as m,
  Re as n,
  Pa as o,
  Te as p,
  Na as r,
  Ba as s,
  pl as t,
  je as u,
  L as v
};
