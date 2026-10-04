/* eslint-disable */
import { B as _e, C as w, D, E as Ne, G as q, I as Pe, K as J, O as C, P as ke, Q as te, S as Y, U as r, Y as me, _ as O, at as B, b as $, dt as pe, et as $e, ft as f, g as he, h as Se, k as Z, lt as b, m as Ae, o as qe, p as De, tt as xe, ut as W, w as c, x as n } from "./xiaobai-os-frame-bridge-CrPFvkI3.js";
import { t as Ze } from "./xiaobai-os-AppDialog-Ce_C5VGF.js";
var Fe = { class: "map-viewport" }, Qe = ["viewBox", "aria-label"], Ye = {
  class: "map-viewport-controls",
  "aria-label": "地图缩放"
}, We = /* @__PURE__ */ Z({
  __name: "MapViewport",
  props: {
    viewBox: {},
    resetKey: { default: "" },
    label: {},
    focusPoint: { default: void 0 },
    focusSequence: { default: 0 }
  },
  setup(e) {
    const o = e, l = B(null), a = B([...o.viewBox]), i = B([0, 0]), u = $(() => i.value[0] && i.value[1] ? Math.max(a.value[2] / i.value[0], a.value[3] / i.value[1]) : 1);
    let d;
    _e(() => {
      d = new ResizeObserver((y) => {
        const x = y[0].contentRect;
        i.value = [x.width, x.height];
      }), l.value && d.observe(l.value);
    });
    const s = /* @__PURE__ */ new Map();
    let v = null, h = [0, 0], t = 0, p = null, g = !1, _ = !1, M = null;
    const L = $(() => a.value.join(" "));
    function S() {
      a.value = [...o.viewBox];
    }
    function R() {
      return u.value;
    }
    function N(y, x) {
      const A = l.value?.getBoundingClientRect();
      if (!A) return [a.value[0], a.value[1]];
      const H = R();
      return [a.value[0] + a.value[2] / 2 + (y - A.left - A.width / 2) * H, a.value[1] + a.value[3] / 2 + (x - A.top - A.height / 2) * H];
    }
    function V(y, x) {
      const A = Math.max(1, o.viewBox[2]), H = Math.min(A * 3, Math.max(Math.min(A * 0.24, 240), a.value[2] * y)), se = H / a.value[2], F = x || [a.value[0] + a.value[2] / 2, a.value[1] + a.value[3] / 2];
      a.value = [
        F[0] - (F[0] - a.value[0]) * se,
        F[1] - (F[1] - a.value[1]) * se,
        H,
        a.value[3] * se
      ];
    }
    function Q() {
      if (!o.focusPoint) return;
      const y = Math.min(a.value[2], 620), x = a.value[3] * y / a.value[2];
      a.value = [
        o.focusPoint[0] - y / 2,
        o.focusPoint[1] - x / 2,
        y,
        x
      ];
    }
    function z() {
      const y = [...s.values()];
      y.length === 1 && (v = y[0], h = [a.value[0], a.value[1]]), y.length === 2 && (t = Math.hypot(y[1][0] - y[0][0], y[1][1] - y[0][1]), p = [(y[0][0] + y[1][0]) / 2, (y[0][1] + y[1][1]) / 2], g = !0);
    }
    function E(y) {
      y.button !== 0 || s.size >= 2 || (s.size || (g = !1), s.set(y.pointerId, [y.clientX, y.clientY]), y.target.setPointerCapture(y.pointerId), z());
    }
    function I(y) {
      if (!s.has(y.pointerId)) return;
      s.set(y.pointerId, [y.clientX, y.clientY]);
      const x = [...s.values()];
      if (x.length === 2 && p) {
        const A = Math.hypot(x[1][0] - x[0][0], x[1][1] - x[0][1]), H = [(x[0][0] + x[1][0]) / 2, (x[0][1] + x[1][1]) / 2];
        A > 0 && t > 0 && V(t / A, N(...p)), a.value[0] -= (H[0] - p[0]) * R(), a.value[1] -= (H[1] - p[1]) * R(), t = A, p = H;
      } else if (v) {
        const A = y.clientX - v[0], H = y.clientY - v[1];
        Math.abs(A) + Math.abs(H) > 4 && (g = !0), a.value = [
          h[0] - A * R(),
          h[1] - H * R(),
          a.value[2],
          a.value[3]
        ];
      }
    }
    function T(y) {
      if (!s.delete(y.pointerId)) return;
      const x = y.target;
      x.hasPointerCapture(y.pointerId) && x.releasePointerCapture(y.pointerId), z(), s.size || (v = null, p = null), g && (_ = !0, M && clearTimeout(M), M = setTimeout(() => {
        _ = !1;
      }, 0));
    }
    function le(y) {
      _ && (y.preventDefault(), y.stopPropagation());
    }
    return te(() => o.resetKey, S, { immediate: !0 }), te(() => o.focusSequence, Q, { flush: "post" }), Pe(() => {
      d?.disconnect(), M && clearTimeout(M);
    }), (y, x) => (r(), c("div", Fe, [(r(), c("svg", {
      ref_key: "svg",
      ref: l,
      class: "map-viewport-svg",
      viewBox: L.value,
      preserveAspectRatio: "xMidYMid meet",
      role: "group",
      "aria-label": e.label,
      onWheel: x[0] || (x[0] = he((A) => V(A.deltaY < 0 ? 0.84 : 1.19, N(A.clientX, A.clientY)), ["prevent"])),
      onPointerdown: E,
      onPointermove: I,
      onPointerup: T,
      onPointercancel: T,
      onClickCapture: le
    }, [J(y.$slots, "default", { unitScale: u.value })], 40, Qe)), n("div", Ye, [
      n("button", {
        type: "button",
        "aria-label": "放大地图",
        onClick: x[1] || (x[1] = (A) => V(0.8))
      }, "+"),
      n("button", {
        type: "button",
        "aria-label": "缩小地图",
        onClick: x[2] || (x[2] = (A) => V(1.25))
      }, "−"),
      n("button", {
        type: "button",
        class: "map-fit",
        onClick: S
      }, "全图")
    ])]));
  }
}), Ee = We, Ge = {
  class: "map-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.7",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, Ue = ["d"], Xe = /* @__PURE__ */ Z({
  __name: "MapIcon",
  props: { name: { default: "pin" } },
  setup(e) {
    const o = {
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
    return (l, a) => (r(), c("svg", Ge, [n("path", { d: o[e.name] || o.pin }, null, 8, Ue)]));
  }
}), P = Xe;
function U(e) {
  return e.scale === "region";
}
function Je(e) {
  return e.scale !== "world" && !U(e);
}
function ce(e, o) {
  const l = new Map(e.locations.map((u) => [u.key, u])), a = [];
  let i = l.get(o);
  for (; i; )
    a.unshift(i), i = i.parent ? l.get(i.parent) : void 0;
  return a;
}
function fe(e, o) {
  return ce(e, o).reverse().find(U);
}
function et(e) {
  const o = /* @__PURE__ */ new Set(), l = e.actors.find((a) => a.actorKey === "player")?.locationKey;
  for (const a of e.locations)
    if (!(a.status !== "visited" && a.key !== l))
      for (const i of ce(e, a.key)) o.add(i.key);
  return o;
}
function ye(e, o, l) {
  const a = new Set(l.map((i) => i.key));
  return ce(e, o).reverse().find((i) => a.has(i.key))?.key || "";
}
function tt(e, o) {
  return e.links.flatMap((l) => {
    if (l.from !== o && l.to !== o) return [];
    const a = e.locations.find((i) => i.key === (l.from === o ? l.to : l.from));
    return a ? [{
      location: a,
      link: l,
      outgoing: l.bidirectional || l.from === o
    }] : [];
  });
}
function at(e, o) {
  const l = [...o.locations].sort((t, p) => t.key.localeCompare(p.key, "en")), a = (t) => t.position && (t.parent || "") === o.positionParent, i = l.filter(a).map((t) => ({
    location: t,
    x: t.position[0],
    y: t.position[1],
    placed: !0
  }));
  let u = 0;
  for (const t of l.filter((p) => !a(p))) {
    let p, g;
    do {
      const _ = u * 2.3999632297, M = 155 * Math.sqrt(u++);
      p = Math.round(500 + Math.cos(_) * M), g = Math.round(420 + Math.sin(_) * M);
    } while (i.some((_) => Math.hypot(_.x - p, _.y - g) < 160));
    i.push({
      location: t,
      x: p,
      y: g,
      placed: !1
    });
  }
  i.sort((t, p) => t.location.key.localeCompare(p.location.key, "en"));
  const d = new Map(i.map((t) => [t.location.key, t])), s = e.links.flatMap((t) => {
    const p = d.get(ye(e, t.from, l)), g = d.get(ye(e, t.to, l));
    if (!p || !g || p === g) return [];
    const _ = (p.x + g.x) / 2, M = (p.y + g.y) / 2;
    return [{
      link: t,
      from: p,
      to: g,
      x: _,
      y: M,
      path: `M ${p.x} ${p.y} Q ${_ + (g.y - p.y) * 0.12} ${M - (g.x - p.x) * 0.12} ${g.x} ${g.y}`
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
var nt = {
  label: "投影地图",
  empty: "还没有地图",
  enabled: "地图投影已开启。",
  disabled: "地图投影已关闭。"
}, G = {
  world: "世界地图",
  region: "当前地区",
  scene: "当前场景"
}, ae = {
  visited: "已到访",
  unvisited: "未到访"
}, ue = {
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
}, K = {
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
  legend: "世界图展示地区，地区图展示所属场景；场景图展示一个地点的内部布局。地图不按实际比例。"
};
function Ie(e, o) {
  return `${o} 个${ue[e].unit}`;
}
function ot(e, o, l) {
  return `${Ie(e, o)} · ${l} 个${ae.unvisited}`;
}
function lt(e, o) {
  return `查看${o === "all" ? "" : ae[o]}${ue[e].unit}`;
}
var st = {
  class: "map-landscapes",
  "aria-hidden": "true"
}, rt = ["transform"], it = {
  class: "map-world-roads",
  "aria-hidden": "true"
}, ct = ["d"], ut = ["d", "marker-end"], dt = ["x", "y"], vt = [
  "transform",
  "aria-label",
  "onClick",
  "onKeydown"
], pt = { transform: "translate(-14 -20)" }, ht = {
  y: "64",
  class: "map-place-name"
}, ft = {
  key: 0,
  y: "89",
  class: "map-place-status"
}, yt = {
  key: 1,
  y: "89",
  class: "map-place-status"
}, mt = /* @__PURE__ */ Z({
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
    const o = e, l = $(() => at(o.atlas, o.scope)), a = $(() => ye(o.atlas, o.currentLocationKey, o.scope.locations)), i = $(() => l.value.nodes.find((s) => s.location.key === o.focusKey)), u = "map-arrow-" + me();
    function d(s, v) {
      return s === "water" ? "water" : s === "forest" ? "tree" : s === "mountain" ? "mountain" : ["world", "region"].includes(v) ? "globe" : v === "outdoor" ? "compass" : "building";
    }
    return (s, v) => (r(), Y(Ee, {
      "view-box": l.value.viewBox,
      "reset-key": `${e.scope.kind}:${e.scope.region?.key || ""}`,
      label: e.label,
      "focus-point": i.value ? [i.value.x, i.value.y] : void 0,
      "focus-sequence": e.focusSequence
    }, {
      default: $e(({ unitScale: h }) => [
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
        n("g", st, [(r(!0), c(O, null, q(l.value.nodes, (t) => (r(), c("g", {
          key: t.location.key,
          transform: `translate(${t.x} ${t.y})`,
          class: W(`is-${t.location.terrain || "urban"}`)
        }, [...v[1] || (v[1] = [n("path", { d: "M-108-20Q-100-100-32-94T87-56Q127-13 99 48T21 99Q-57 113-90 65T-108-20Z" }, null, -1), n("path", {
          class: "map-contour",
          d: "M-133-22Q-124-126-39-116T110-70Q156-17 124 60T26 123Q-71 139-112 81T-133-22Z"
        }, null, -1)])], 10, rt))), 128))]),
        n("g", it, [(r(!0), c(O, null, q(l.value.routes, (t) => (r(), c("g", {
          key: t.link.id,
          class: W({
            "is-path": t.link.kind === "path",
            "is-portal": t.link.kind === "portal"
          })
        }, [
          n("path", {
            class: "map-road-casing",
            d: t.path
          }, null, 8, ct),
          n("path", {
            class: "map-road-line",
            d: t.path,
            "marker-end": t.link.bidirectional ? void 0 : `url(#${u})`
          }, null, 8, ut),
          t.link.label ? (r(), c("text", {
            key: 0,
            x: t.x,
            y: t.y - 14
          }, f(t.link.label), 9, dt)) : w("", !0)
        ], 2))), 128))]),
        (r(!0), c(O, null, q(l.value.nodes, (t) => (r(), c("g", {
          key: t.location.key,
          class: W(["map-place", {
            "is-selected": t.location.key === e.selectedLocationKey,
            "is-current": t.location.key === a.value,
            "is-unvisited": t.location.status !== "visited"
          }]),
          transform: `translate(${t.x} ${t.y}) scale(${h * 0.5})`,
          role: "button",
          tabindex: "0",
          "aria-label": `查看${t.location.name}`,
          onClick: he((p) => s.$emit("select", t.location.key), ["stop"]),
          onKeydown: [Se(he((p) => s.$emit("select", t.location.key), ["stop"]), ["enter"]), Se(he((p) => s.$emit("select", t.location.key), ["stop", "prevent"]), ["space"])]
        }, [
          v[2] || (v[2] = n("circle", {
            class: "map-pin-halo",
            r: "39"
          }, null, -1)),
          v[3] || (v[3] = n("path", {
            class: "map-pin-body",
            d: "M0 33C-6 25-26 8-26-6a26 26 0 0 1 52 0C26 8 6 25 0 33Z"
          }, null, -1)),
          n("g", pt, [C(P, {
            name: d(t.location.terrain, t.location.scale),
            width: "28",
            height: "28"
          }, null, 8, ["name"])]),
          n("text", ht, f(t.location.name.length > 14 ? t.location.name.slice(0, 13) + "…" : t.location.name), 1),
          t.location.key === a.value ? (r(), c("text", ft, "你在这里")) : t.location.status !== "visited" ? (r(), c("text", yt, f(b(ae).unvisited), 1)) : w("", !0),
          n("title", null, f(t.location.name) + f(t.location.brief ? " · " + t.location.brief : ""), 1)
        ], 42, vt))), 128))
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
}), bt = mt, re;
async function Be() {
  if (!re) {
    const e = [
      "..",
      "..",
      "..",
      "libs",
      "material-symbols",
      "material-symbols-rounded.woff2"
    ].join("/"), o = new URL(e, import.meta.url);
    re = new FontFace("Xiaobai Map Symbols", `url("${o.href}")`, {
      display: "block",
      weight: "400"
    }).load(), re.catch(() => {
      re = void 0;
    });
  }
  document.fonts.add(await re);
}
var ro = Object.freeze([
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
]), io = Object.freeze([
  "rect",
  "circle",
  "path",
  "curve",
  "icon",
  "label"
]), co = Object.freeze([
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
]), uo = Object.freeze([
  "confirmed",
  "inferred",
  "unknown"
]), kt = Object.freeze([
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
]), Le = Object.freeze(kt.flatMap((e) => [...e.icons])), vo = Object.freeze([
  ...Le,
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
]), po = Object.freeze(/* @__PURE__ */ new Set([
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
])), wt = Object.freeze({
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
function Te(e, o) {
  return `url(#${o}-material-${e || "unknown"})`;
}
function Mt(e, o) {
  return `url(#${o}-face-${e || "unknown"})`;
}
function ie(e) {
  return `color-mix(in srgb, ${wt[e]}, var(--map-surface) var(--scene-material-mix))`;
}
var _t = ["id"], $t = ["stop-color", "stop-opacity"], xt = ["stop-color", "stop-opacity"], Ct = ["stop-color", "stop-opacity"], St = ["id"], jt = ["fill", "fill-opacity"], Ot = {
  fill: "none",
  stroke: "var(--scene-shadow)",
  "stroke-width": ".65",
  opacity: ".24"
}, Pt = {
  key: 1,
  d: "M0 0H48V32H0ZM19 0V17M0 17H48M36 17V32M3 3h12m8 0h21"
}, At = {
  key: 2,
  d: "M0 0H48V32H0ZM24 0V32M0 16H48M12 4l5 4-5 4-5-4ZM36 20l5 4-5 4-5-4Z"
}, Et = {
  key: 3,
  d: "M-3 3 8 11l17 2 9 10 18 3M27-3l-8 12 3 8-7 17",
  opacity: ".65"
}, It = {
  key: 4,
  d: "M3 8q6 3 13 0M25 25q7 2 17-1",
  stroke: "var(--scene-highlight)",
  "stroke-width": "1.3",
  opacity: "1"
}, Bt = {
  key: 5,
  d: "M5 32 37 0M12 32 44 0",
  stroke: "var(--scene-highlight)",
  "stroke-width": "2.2"
}, Lt = {
  key: 6,
  d: "M8 15l-2-4m2 4 3-3M36 26l-1-4m1 4 3-3"
}, Tt = {
  key: 7,
  d: "M5 8h1m20-2h2m-12 17h2m23-6h1m-5 12h2",
  "stroke-linecap": "round"
}, Ht = {
  key: 8,
  d: "M0 0H48V32H0M0 5H48M0 27H48M5 5v1m38-1v1m-38 20v1m38-1v1"
}, Rt = {
  key: 9,
  d: "M0 5H48M0 13H48M0 21H48M0 29H48M4 0v32m8-32v32m8-32v32m8-32v32m8-32v32m8-32v32",
  opacity: ".55"
}, zt = {
  key: 10,
  d: "m24 5 8 11-8 11-8-11ZM24 10v12M20 16h8"
}, Kt = {
  key: 11,
  d: "M7 8q12-5 16 6t20 7M4 27l6-3"
}, Vt = {
  key: 12,
  d: "M5 19q5-3 11-1M29 8q6-2 12 1",
  stroke: "var(--scene-highlight)",
  "stroke-width": "1.4"
}, Nt = {
  key: 0,
  d: "M0 1H48",
  stroke: "var(--scene-highlight)",
  "stroke-width": ".7",
  opacity: ".35"
}, qt = ["id"], Dt = ["id"], Zt = ["transform", "fill"], Ft = /* @__PURE__ */ Z({
  __name: "SceneMaterials",
  props: { prefix: {} },
  setup(e) {
    return (o, l) => (r(), c("defs", null, [
      (r(!0), c(O, null, q(b(gt), (a) => (r(), c(O, { key: a }, [n("linearGradient", {
        id: `${e.prefix}-face-${a}`,
        x1: "0",
        y1: "0",
        x2: ".7",
        y2: "1"
      }, [
        n("stop", {
          offset: "0",
          "stop-color": `color-mix(in srgb, ${b(ie)(a)}, var(--scene-highlight) 24%)`,
          "stop-opacity": a === "glass" ? 0.35 : 1
        }, null, 8, $t),
        n("stop", {
          offset: ".52",
          "stop-color": b(ie)(a),
          "stop-opacity": a === "glass" ? 0.16 : 1
        }, null, 8, xt),
        n("stop", {
          offset: "1",
          "stop-color": `color-mix(in srgb, ${b(ie)(a)}, var(--scene-shadow) 16%)`,
          "stop-opacity": a === "glass" ? 0.28 : 1
        }, null, 8, Ct)
      ], 8, _t), n("pattern", {
        id: `${e.prefix}-material-${a}`,
        width: "48",
        height: "32",
        patternUnits: "userSpaceOnUse",
        class: "scene-texture"
      }, [
        n("rect", {
          width: "48",
          height: "32",
          fill: b(ie)(a),
          "fill-opacity": a === "glass" ? 0.4 : 1
        }, null, 8, jt),
        n("g", Ot, [a === "wood" ? (r(), c(O, { key: 0 }, [l[0] || (l[0] = n("path", { d: "M0 0H48M0 16H48M19 0V16M37 16V32" }, null, -1)), l[1] || (l[1] = n("path", {
          d: "M3 7Q12 4 26 8T47 7M2 26q10-4 25 0t23-1",
          opacity: ".5"
        }, null, -1))], 64)) : a === "stone" ? (r(), c("path", Pt)) : a === "tile" ? (r(), c("path", At)) : a === "marble" ? (r(), c("path", Et)) : a === "water" ? (r(), c("path", It)) : a === "glass" ? (r(), c("path", Bt)) : a === "grass" || a === "forest" ? (r(), c("path", Lt)) : a === "dirt" || a === "sand" ? (r(), c("path", Tt)) : a === "metal" ? (r(), c("path", Ht)) : [
          "carpet",
          "fabric",
          "bed-sheet",
          "tatami"
        ].includes(a) ? (r(), c("path", Rt)) : a === "rune" ? (r(), c("path", zt)) : a === "blood" ? (r(), c("path", Kt)) : a === "snow" ? (r(), c("path", Vt)) : w("", !0)]),
        a === "wood" || a === "stone" || a === "metal" ? (r(), c("path", Nt)) : w("", !0)
      ], 8, St)], 64))), 128)),
      n("radialGradient", {
        id: `${e.prefix}-crown-face`,
        cx: ".32",
        cy: ".25",
        r: ".8"
      }, [...l[2] || (l[2] = [
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
      ])], 8, qt),
      (r(), c(O, null, q(3, (a) => n("symbol", {
        id: `${e.prefix}-crown-${a - 1}`,
        key: a,
        viewBox: "0 0 100 100"
      }, [n("g", {
        transform: `rotate(${a * 37} 50 50)`,
        fill: `url(#${e.prefix}-crown-face)`,
        stroke: "var(--scene-leaf-dark)",
        "stroke-width": ".6"
      }, [...l[3] || (l[3] = [
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
      ])], 8, Zt)], 8, Dt)), 64))
    ]));
  }
}), Qt = Ft, Yt = /* @__PURE__ */ new Set([
  "water",
  "terrain",
  "furniture",
  "decoration",
  "danger",
  "magic",
  "secret",
  "light"
]), Wt = new Set(Le), Gt = /* @__PURE__ */ new Set([
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
function Ut(e) {
  return !!e.icon && Gt.has(e.icon);
}
var ee = (e) => Number(e.toFixed(3)).toString(), de = (e) => e.geometry.points || [];
function we(e) {
  return e.shape === "icon" || e.shape === "label" || e.category === "actor" || e.category === "door" || e.kind === "stairs" || e.icon === "stairs" || e.icon === "door-open";
}
function be(e) {
  return de(e).length >= 3 && (e.closed ?? Yt.has(e.category));
}
function ve(e) {
  return e.category === "wall" || e.category === "grid" || e.icon === "fence" && ["path", "curve"].includes(e.shape) ? !1 : e.shape === "rect" || e.shape === "circle" ? !0 : (e.shape === "path" || e.shape === "curve") && be(e);
}
function He(e) {
  return ![
    "wall",
    "grid",
    "actor"
  ].includes(e.category) && (e.shape === "rect" || e.shape === "circle") && (e.icon !== void 0 && Wt.has(e.icon) || [
    "furniture",
    "decoration",
    "door"
  ].includes(e.category));
}
function Ce(e, o, l) {
  const a = e[l], i = e[(l + 1) % e.length], u = e[l - 1] || (o ? e[e.length - 1] : a), d = e[l + 2] || (o ? e[(l + 2) % e.length] : i), s = (v, h, t) => Math.max(Math.min(h, t), Math.min(Math.max(h, t), v));
  return [[s(a[0] + (i[0] - u[0]) / 6, a[0], i[0]), s(a[1] + (i[1] - u[1]) / 6, a[1], i[1])], [s(i[0] - (d[0] - a[0]) / 6, a[0], i[0]), s(i[1] - (d[1] - a[1]) / 6, a[1], i[1])]];
}
function ho(e) {
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
  const o = de(e), l = be(e), a = (u) => u.map((d) => Number(ee(d)));
  if (e.shape === "path" || o.length < 2) return {
    points: o.map(a),
    closed: l
  };
  const i = [a(o[0])];
  for (let u = 0; u < o.length - (l ? 0 : 1); u += 1) {
    const d = a(o[u]), s = a(o[(u + 1) % o.length]), [v, h] = Ce(o, l, u).map(a);
    for (let t = 1; t <= 12; t += 1) {
      const p = t / 12, g = 1 - p;
      i.push([0, 1].map((_) => g ** 3 * d[_] + 3 * g ** 2 * p * v[_] + 3 * g * p ** 2 * h[_] + p ** 3 * s[_]));
    }
  }
  return l && i.pop(), {
    points: i,
    closed: l
  };
}
function Xt(e) {
  if (e.shape === "rect") {
    const { x: u, y: d, width: s, height: v } = e.geometry;
    return `M ${u} ${d} h ${s} v ${v} h ${-s} Z`;
  }
  if (e.shape === "circle") {
    const { x: u, y: d, radius: s } = e.geometry;
    return `M ${u - s} ${d} a ${s} ${s} 0 1 0 ${s * 2} 0 a ${s} ${s} 0 1 0 ${-s * 2} 0 Z`;
  }
  const o = de(e);
  if (o.length < 2) return "";
  const l = be(e);
  if (e.shape === "path") return `M ${o.map(([u, d]) => `${ee(u)} ${ee(d)}`).join(" L ")}${l ? " Z" : ""}`;
  const a = [`M ${o[0].map(ee).join(" ")}`], i = o.length;
  for (let u = 0; u < i - (l ? 0 : 1); u += 1) {
    const [d, s] = Ce(o, l, u), v = o[(u + 1) % i];
    a.push(`C ${d.map(ee).join(" ")}, ${s.map(ee).join(" ")}, ${v.map(ee).join(" ")}`);
  }
  return a.join(" ") + (l ? " Z" : "");
}
function oe(e) {
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
  const o = de(e);
  if (!o.length) {
    const { x: i, y: u } = e.geometry;
    return {
      x: i,
      y: u,
      width: 0,
      height: 0
    };
  }
  const l = o.map((i) => i[0]), a = o.map((i) => i[1]);
  return {
    x: Math.min(...l),
    y: Math.min(...a),
    width: Math.max(...l) - Math.min(...l),
    height: Math.max(...a) - Math.min(...a)
  };
}
function Jt(e) {
  if (!e.rotation) return;
  const o = oe(e);
  return `rotate(${e.rotation} ${o.x + o.width / 2} ${o.y + o.height / 2})`;
}
function je(e, o = 1) {
  const l = oe(e), a = [l.x + l.width / 2, l.y + l.height / 2];
  if (e.shape === "label") return a;
  if (we(e)) return [a[0], a[1] + 23 * o];
  if ((e.category === "terrain" || e.category === "water") && ve(e)) return a;
  if (e.shape === "path" || e.shape === "curve") {
    const d = de(e), s = be(e), v = d.length - (s ? 0 : 1), h = Array.from({ length: v }, (E, I) => Math.hypot(d[(I + 1) % d.length][0] - d[I][0], d[(I + 1) % d.length][1] - d[I][1]));
    let t = h.reduce((E, I) => E + I, 0) / 2, p = 0;
    for (; p < h.length - 1 && t > h[p]; )
      t -= h[p], p += 1;
    const g = d[p], _ = d[(p + 1) % d.length], M = h[p] ? t / h[p] : 0.5;
    let L = g[0] + (_[0] - g[0]) * M, S = g[1] + (_[1] - g[1]) * M, R = _[0] - g[0], N = _[1] - g[1];
    if (e.shape === "curve") {
      const [E, I] = Ce(d, s, p), T = 1 - M;
      L = T ** 3 * g[0] + 3 * T ** 2 * M * E[0] + 3 * T * M ** 2 * I[0] + M ** 3 * _[0], S = T ** 3 * g[1] + 3 * T ** 2 * M * E[1] + 3 * T * M ** 2 * I[1] + M ** 3 * _[1], R = 3 * T ** 2 * (E[0] - g[0]) + 6 * T * M * (I[0] - E[0]) + 3 * M ** 2 * (_[0] - I[0]), N = 3 * T ** 2 * (E[1] - g[1]) + 6 * T * M * (I[1] - E[1]) + 3 * M ** 2 * (_[1] - I[1]);
    }
    const V = Math.hypot(R, N);
    if (!V) return [L, S - 13 * o];
    let Q = -N / V, z = R / V;
    return (z > 0 || z === 0 && Q < 0) && (Q = -Q, z = -z), [L + Q * 13 * o, S + z * 13 * o];
  }
  const i = (e.rotation || 0) * Math.PI / 180, u = e.shape === "circle" ? l.height / 2 : (Math.abs(Math.sin(i)) * l.width + Math.abs(Math.cos(i)) * l.height) / 2;
  return [a[0], a[1] + u + 13 * o];
}
function ea(e) {
  let o = 2166136261;
  for (const l of e) o = Math.imul(o ^ l.charCodeAt(0), 16777619);
  return o >>> 0;
}
function ta(e) {
  const o = e.filter((a) => a.category === "terrain" && a.material === "forest" && ve(a) && !He(a)).sort((a, i) => a.id < i.id ? -1 : a.id > i.id ? 1 : 0), l = /* @__PURE__ */ new Map();
  for (let a = 0; a < o.length; a += 1) {
    const i = o[a], u = oe(i), d = Math.floor(256 / o.length) + (a < 256 % o.length ? 1 : 0), s = u.width && u.height ? Math.min(d, Math.max(1, Math.ceil(u.width * u.height / 2704))) : 0, v = Math.min(s, Math.max(1, Math.ceil(Math.sqrt(s * u.width / Math.max(1, u.height))))), h = Math.ceil(s / Math.max(1, v));
    let t = ea(i.id);
    const p = () => (t = Math.imul(t, 1664525) + 1013904223 >>> 0, t / 4294967296), g = [];
    for (let _ = 0; _ < s; _ += 1) g.push({
      x: u.x + (_ % v + 0.5 + (p() - 0.5) * 0.35) * u.width / v,
      y: u.y + (Math.floor(_ / v) + 0.5 + (p() - 0.5) * 0.35) * u.height / h,
      size: Math.min(Math.max(u.width / v, u.height / h), Math.min(u.width, u.height)) * (1.25 + p() * 0.35),
      variant: Math.floor(p() * 3)
    });
    l.set(i.id, g);
  }
  return l;
}
var aa = [
  "x",
  "y",
  "width",
  "height"
], na = {
  key: 0,
  cx: "50",
  cy: "50",
  r: "50"
}, oa = {
  key: 1,
  width: "100",
  height: "100"
}, la = ["clip-path", "fill"], sa = {
  key: 0,
  cx: "50",
  cy: "50",
  r: "49",
  class: "scene-object-edge"
}, ra = {
  key: 1,
  x: "1",
  y: "1",
  width: "98",
  height: "98",
  rx: "2",
  class: "scene-object-edge"
}, ia = ["fill"], ca = ["fill"], ua = ["d"], da = {
  key: 0,
  d: "M9 78H91",
  class: "scene-object-seam"
}, va = ["x"], pa = /* @__PURE__ */ Z({
  __name: "SceneObject",
  props: {
    element: {},
    prefix: {},
    unitScale: {}
  },
  setup(e) {
    const o = e, l = $(() => oe(o.element)), a = $(() => Math.min(l.value.width, l.value.height) / o.unitScale >= 12), i = $(() => o.element.shape === "circle"), u = $(() => o.element.material), d = $(() => Mt(u.value, o.prefix)), s = $(() => Te(u.value, o.prefix)), v = `scene-object-${me()}`;
    return (h, t) => (r(), c("svg", {
      x: l.value.x,
      y: l.value.y,
      width: l.value.width,
      height: l.value.height,
      viewBox: "0 0 100 100",
      preserveAspectRatio: "none",
      class: "scene-object"
    }, [n("defs", null, [n("clipPath", { id: v }, [i.value ? (r(), c("circle", na)) : (r(), c("rect", oa))])]), n("g", {
      "clip-path": `url(#${v})`,
      fill: d.value
    }, [i.value ? (r(), c("circle", sa)) : (r(), c("rect", ra)), a.value ? (r(), c(O, { key: 2 }, [i.value ? (r(), c("circle", {
      key: 0,
      cx: "50",
      cy: "50",
      r: "44",
      fill: s.value,
      class: "scene-object-inset"
    }, null, 8, ia)) : (r(), c("rect", {
      key: 1,
      x: "5",
      y: "5",
      width: "90",
      height: "90",
      rx: "2",
      fill: s.value,
      class: "scene-object-inset"
    }, null, 8, ca)), e.element.icon === "table" || e.element.icon === "counter" ? (r(), c(O, { key: 2 }, [n("path", {
      d: i.value ? "M18 36A35 35 0 0 1 72 22" : "M8 13V8H92",
      class: "scene-object-shine"
    }, null, 8, ua), e.element.icon === "counter" ? (r(), c("path", da)) : w("", !0)], 64)) : e.element.icon === "chair" ? (r(), c(O, { key: 3 }, [
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
      (r(), c(O, null, q(3, (p) => n("rect", {
        key: p,
        x: 15 + (p - 1) * 24,
        y: "32",
        width: "22",
        height: "57",
        rx: "5",
        class: "scene-object-inset"
      }, null, 8, va)), 64)),
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
    }, null, -1))], 64)) : e.element.icon === "tree" ? (r(), c(O, { key: 8 }, [t[14] || (t[14] = Ne('<circle cx="34" cy="32" r="24" class="scene-object-inset"></circle><circle cx="69" cy="36" r="24" class="scene-object-inset"></circle><circle cx="30" cy="62" r="23" class="scene-object-inset"></circle><circle cx="64" cy="67" r="25" class="scene-object-inset"></circle><circle cx="49" cy="48" r="26" class="scene-object-inset"></circle><path d="M21 24q10-10 22-4M36 41q8-9 22-6M64 56q8-1 13 5" class="scene-object-shine"></path>', 6))], 64)) : e.element.icon === "rock" ? (r(), c(O, { key: 9 }, [t[15] || (t[15] = n("path", {
      d: "M8 38 33 12 76 18 93 57 71 88 25 86ZM33 12 41 44 8 38M41 44 76 18M41 44 71 88M41 44 93 57",
      class: "scene-object-seam"
    }, null, -1)), t[16] || (t[16] = n("path", {
      d: "M12 38 33 17 72 22",
      class: "scene-object-shine"
    }, null, -1))], 64)) : w("", !0)], 64)) : w("", !0)], 8, la)], 8, aa));
  }
}), ha = pa, Oe = {
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
}, fa = Object.freeze({
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
}), ya = Object.freeze({
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
}), ma = Object.freeze({
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
}), ba = Object.freeze({
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
}), ga = Object.freeze({
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
}), ka = Object.freeze({
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
}), Me = Object.freeze({
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
}), Re = Object.freeze({
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
}), ze = Object.freeze({
  world: "世界",
  region: ue.world.unit,
  city: "城市",
  district: "街区",
  building: "建筑",
  floor: "楼层",
  room: "房间",
  outdoor: "户外"
}), wa = Object.freeze({
  door: "门",
  stairs: "楼梯",
  elevator: "电梯",
  path: "小径",
  road: "道路",
  portal: "传送门",
  passage: "通道"
});
function Ma(e, o) {
  return e < o ? -1 : e > o ? 1 : 0;
}
function _a(e, o) {
  const l = fa[e.category], a = ve(e), i = a && (e.material || e.category === "water") ? Te(e.material || "water", o) : "", u = e.certainty === "inferred" ? "8 6" : e.certainty === "unknown" ? "3 7" : l.dash;
  return {
    ...l,
    fill: a ? i || l.fill : "none",
    opacity: e.certainty === "unknown" ? 0.48 : e.certainty === "inferred" ? 0.72 : 1,
    dash: u,
    icon: e.icon ? ga[e.icon] : e.kind ? ma[e.kind] : ka[e.category],
    fallback: e.kind ? ba[e.kind] : e.icon && Object.hasOwn(Oe, e.icon) ? Oe[e.icon] : ya[e.category].slice(0, 1),
    z: Me[e.category]
  };
}
function $a(e) {
  const o = (l) => {
    if (!ve(l)) return 0;
    const a = oe(l);
    return a.width * a.height;
  };
  return [...e].sort((l, a) => Me[l.category] - Me[a.category] || o(a) - o(l) || Ma(l.id, a.id));
}
var xa = ["data-element", "opacity"], Ca = ["transform"], Sa = ["d"], ja = ["d", "stroke-width"], Oa = [
  "d",
  "fill",
  "stroke",
  "stroke-width",
  "stroke-dasharray",
  "stroke-linecap"
], Pa = [
  "d",
  "stroke",
  "stroke-opacity",
  "stroke-dasharray"
], Aa = ["transform"], Ea = ["id"], Ia = ["d"], Ba = ["clip-path"], La = [
  "href",
  "x",
  "y",
  "width",
  "height"
], Ta = ["transform"], Ha = {
  key: 0,
  r: "19",
  class: "scene-player-halo"
}, Ra = ["stroke"], za = {
  key: 1,
  class: "map-material-symbol",
  "aria-hidden": "true"
}, Ka = {
  key: 2,
  class: "map-symbol-fallback",
  "aria-hidden": "true"
}, Va = ["x", "y"], Na = /* @__PURE__ */ Z({
  __name: "MapScene",
  props: { scene: {} },
  setup(e) {
    const o = e, l = B(!1);
    _e(() => {
      Be().then(() => {
        l.value = !0;
      }).catch(() => {
        l.value = !1;
      });
    });
    const a = `xiaobai-map-scene-${me()}`, i = $(() => Re[o.scene.mood || "neutral"]), u = $(() => ta(o.scene.elements)), d = $(() => $a(o.scene.elements).map((s, v) => ({
      element: s,
      bounds: oe(s),
      path: Xt(s),
      transform: Jt(s),
      area: ve(s),
      presentation: _a(s, a),
      clipId: `${a}-area-${v}`,
      object: He(s) && !we(s),
      marker: we(s) && s.shape !== "label"
    })));
    return (s, v) => (r(), Y(Ee, {
      class: "map-scene-viewport",
      style: pe({ "--scene-glow": i.value.glow }),
      "view-box": e.scene.viewBox,
      "reset-key": e.scene.key,
      label: `${e.scene.name} 场景地图`
    }, {
      default: $e(({ unitScale: h }) => [
        C(Qt, { prefix: a }),
        (r(!0), c(O, null, q(d.value, (t) => (r(), c("g", {
          key: t.element.id,
          class: W(["map-scene-element", [`is-${t.element.category}`, `is-${t.element.certainty || "confirmed"}`]]),
          "data-element": t.element.id,
          opacity: t.presentation.opacity
        }, [n("g", { transform: t.transform }, [
          t.object ? (r(), Y(ha, {
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
            }, null, 8, Sa)) : w("", !0),
            t.element.category === "road" && !t.area ? (r(), c("path", {
              key: 1,
              d: t.path,
              fill: "none",
              stroke: "var(--scene-soft-edge)",
              "stroke-width": t.presentation.width + 2,
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "vector-effect": "non-scaling-stroke"
            }, null, 8, ja)) : w("", !0),
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
            }, null, 8, Oa),
            t.element.category === "wall" ? (r(), c("path", {
              key: 2,
              d: t.path,
              fill: "none",
              stroke: t.element.material ? b(ie)(t.element.material) : "var(--scene-wall)",
              "stroke-width": "3.5",
              "stroke-opacity": t.element.material === "glass" ? 0.4 : 1,
              "stroke-dasharray": t.presentation.dash,
              "stroke-linejoin": "round",
              "vector-effect": "non-scaling-stroke"
            }, null, 8, Pa)) : w("", !0)
          ], 64)) : w("", !0),
          t.object && !b(Ut)(t.element) && Math.min(t.bounds.width, t.bounds.height) / h >= 12 ? (r(), c("g", {
            key: 2,
            transform: `translate(${t.bounds.x + t.bounds.width / 2} ${t.bounds.y + t.bounds.height / 2})`,
            "aria-hidden": "true"
          }, [n("text", {
            class: W(l.value ? "map-material-symbol" : "map-symbol-fallback"),
            style: pe({
              fontSize: `${Math.min(22 * h, Math.min(t.bounds.width, t.bounds.height) * 0.65)}px`,
              fill: "var(--scene-edge)",
              textAnchor: "middle",
              dominantBaseline: "central"
            })
          }, f(l.value ? t.presentation.icon : t.presentation.fallback), 7)], 8, Aa)) : w("", !0),
          u.value.has(t.element.id) ? (r(), c(O, { key: 3 }, [n("defs", null, [n("clipPath", { id: t.clipId }, [n("path", {
            d: t.path,
            "clip-rule": "evenodd"
          }, null, 8, Ia)], 8, Ea)]), n("g", {
            "clip-path": `url(#${t.clipId})`,
            class: "scene-forest-decoration",
            "aria-hidden": "true"
          }, [(r(!0), c(O, null, q(u.value.get(t.element.id), (p, g) => (r(), c("use", {
            key: g,
            href: `#${a}-crown-${p.variant}`,
            x: p.x - p.size / 2,
            y: p.y - p.size / 2,
            width: p.size,
            height: p.size
          }, null, 8, La))), 128))], 8, Ba)], 64)) : w("", !0)
        ], 8, Ca), t.marker ? (r(), c("g", {
          key: 0,
          class: "map-scene-icon",
          transform: `translate(${t.bounds.x + t.bounds.width / 2} ${t.bounds.y + t.bounds.height / 2}) scale(${h})`
        }, [
          t.element.actorKey === "player" || t.element.kind === "player" ? (r(), c("circle", Ha)) : w("", !0),
          n("circle", {
            r: "11",
            stroke: t.presentation.stroke
          }, null, 8, Ra),
          l.value ? (r(), c("text", za, f(t.presentation.icon), 1)) : (r(), c("text", Ka, f(t.presentation.fallback), 1))
        ], 8, Ta)) : w("", !0)], 10, xa))), 128)),
        n("g", {
          class: "scene-labels",
          style: pe({ "--scene-unit-scale": h })
        }, [(r(!0), c(O, null, q(d.value, (t) => (r(), c(O, { key: t.element.id }, [t.element.label ? (r(), c("text", {
          key: 0,
          class: W(["map-scene-label", { "is-primary": t.element.shape === "label" }]),
          x: b(je)(t.element, h)[0],
          y: b(je)(t.element, h)[1]
        }, f(t.element.label), 11, Va)) : w("", !0)], 64))), 128))], 4)
      ]),
      _: 1
    }, 8, [
      "style",
      "view-box",
      "reset-key",
      "label"
    ]));
  }
}), qa = Na, Da = {
  key: 0,
  class: "map-3d-loading",
  role: "status"
}, Za = {
  class: "map-viewport-controls",
  "aria-label": "三维视角"
}, Fa = /* @__PURE__ */ Z({
  __name: "MapScene3D",
  props: {
    scene: {},
    lowWalls: { type: Boolean },
    showLabels: { type: Boolean }
  },
  emits: ["fallback"],
  setup(e, { emit: o }) {
    const l = e, a = o, i = B(null), u = B(null), d = B(!0);
    let s, v = !1;
    return _e(async () => {
      v = !0;
      try {
        const { createThreeRuntime: h } = await import("./xiaobai-os-three-runtime-DmiH4-gQ.js");
        if (!v) return;
        s = h(i.value, u.value, { fallback: (t) => a("fallback", t) }), s.setScene(l.scene), s.walls(l.lowWalls), s.labels(l.showLabels), d.value = !1, Be().then(() => {
          v && s?.symbols(!0);
        }).catch(() => {
        });
      } catch {
        v && a("fallback", "当前设备无法打开三维，已切换二维。");
      }
    }), te(() => l.scene, (h) => s?.setScene(h)), te(() => l.lowWalls, (h) => s?.walls(h)), te(() => l.showLabels, (h) => s?.labels(h)), Pe(() => {
      v = !1, s?.dispose(), s = void 0;
    }), (h, t) => (r(), c("div", {
      ref_key: "host",
      ref: i,
      class: "map-scene-three",
      style: pe({ "--scene-glow": b(Re)[e.scene.mood || "neutral"].glow })
    }, [
      n("div", {
        ref_key: "labelHost",
        ref: u,
        class: "map-3d-labels"
      }, null, 512),
      d.value ? (r(), c("div", Da, "正在打开三维…")) : w("", !0),
      n("div", Za, [
        n("button", {
          type: "button",
          "aria-label": "放大三维",
          onClick: t[0] || (t[0] = (p) => b(s)?.zoom(1.2))
        }, "+"),
        n("button", {
          type: "button",
          "aria-label": "缩小三维",
          onClick: t[1] || (t[1] = (p) => b(s)?.zoom(1 / 1.2))
        }, "−"),
        n("button", {
          type: "button",
          class: "map-fit",
          "aria-label": "重置三维视角",
          onClick: t[2] || (t[2] = (p) => b(s)?.fit())
        }, "全图")
      ])
    ], 4));
  }
}), Qa = Fa, Ya = ["aria-label"], Wa = { class: "map-scene-toolbar" }, Ga = {
  class: "map-render-switch",
  role: "group",
  "aria-label": "场景显示方式"
}, Ua = ["aria-pressed"], Xa = ["aria-pressed", "disabled"], Ja = ["aria-pressed"], en = ["aria-pressed"], tn = { class: "map-scene-stage" }, an = /* @__PURE__ */ Z({
  __name: "MapSceneView",
  props: {
    scene: {},
    mode: {},
    threeUnavailable: { type: Boolean }
  },
  emits: ["update:mode", "fallback"],
  setup(e, { emit: o }) {
    const l = o, a = B(!1), i = B(!0);
    return (u, d) => (r(), c("section", {
      class: "map-scene-view",
      "aria-label": e.scene.name
    }, [n("div", Wa, [
      n("div", Ga, [n("button", {
        type: "button",
        "aria-pressed": e.mode === "2d",
        onClick: d[0] || (d[0] = (s) => l("update:mode", "2d"))
      }, "二维", 8, Ua), n("button", {
        type: "button",
        "aria-pressed": e.mode === "3d",
        disabled: e.threeUnavailable,
        onClick: d[1] || (d[1] = (s) => l("update:mode", "3d"))
      }, "三维", 8, Xa)]),
      e.mode === "3d" ? (r(), c("button", {
        key: 0,
        type: "button",
        "aria-pressed": a.value,
        onClick: d[2] || (d[2] = (s) => a.value = !a.value)
      }, "低墙", 8, Ja)) : w("", !0),
      e.mode === "3d" ? (r(), c("button", {
        key: 1,
        type: "button",
        "aria-pressed": i.value,
        onClick: d[3] || (d[3] = (s) => i.value = !i.value)
      }, "名称", 8, en)) : w("", !0)
    ]), n("div", tn, [xe(C(qa, { scene: e.scene }, null, 8, ["scene"]), [[Ae, e.mode === "2d"]]), e.mode === "3d" ? (r(), Y(Qa, {
      key: 0,
      scene: e.scene,
      "low-walls": a.value,
      "show-labels": i.value,
      onFallback: d[4] || (d[4] = (s) => l("fallback", s))
    }, null, 8, [
      "scene",
      "low-walls",
      "show-labels"
    ])) : w("", !0)])], 8, Ya));
  }
}), nn = an;
function on(e) {
  const o = e?.atlas.actors.find((a) => a.actorKey === "player"), l = e?.atlas.locations.find((a) => a.key === o?.locationKey);
  return l?.sceneKey && e?.scenes[l.sceneKey]?.status === "active" ? "scene" : "world";
}
function ln(e, o) {
  const l = o === null ? void 0 : e.locations.find((s) => s.key === o && U(s)), a = et(e), i = (o === null ? e.locations.filter(U) : l ? e.locations.filter((s) => Je(s) && fe(e, s.key)?.key === l.key) : []).map((s) => a.has(s.key) ? {
    ...s,
    status: "visited"
  } : s), u = o === null ? i.filter((s) => !ce(e, s.key).slice(0, -1).some(U)) : [], d = new Set(u.map((s) => s.parent || ""));
  return {
    kind: o === null ? "world" : "region",
    region: l,
    locations: i,
    unvisited: i.filter((s) => s.status !== "visited").length,
    positionParent: l ? l.key : d.size === 1 ? [...d][0] : null
  };
}
function sn(e, o, l) {
  const a = o.trim().toLocaleLowerCase();
  return e.locations.filter((i) => [i.name, i.brief].some((u) => u?.toLocaleLowerCase().includes(a)) && (l === "all" || (l === "visited" ? i.status === "visited" : i.status !== "visited")));
}
var rn = { class: "map-search-input" }, cn = ["aria-label", "placeholder"], un = { class: "map-search-scope" }, dn = ["aria-label"], vn = ["aria-pressed", "onClick"], pn = { class: "map-search-results" }, hn = ["onClick"], fn = { class: "map-result-icon" }, yn = { key: 0 }, mn = {
  key: 0,
  class: "map-search-empty"
}, bn = /* @__PURE__ */ Z({
  __name: "MapSearch",
  props: {
    scope: {},
    title: {},
    initialFilter: {}
  },
  emits: ["close", "select"],
  setup(e) {
    const o = e, l = B(""), a = B(o.initialFilter), i = $(() => ue[o.scope.kind]), u = $(() => [
      {
        id: "all",
        name: i.value.all
      },
      {
        id: "unvisited",
        name: ae.unvisited
      },
      {
        id: "visited",
        name: ae.visited
      }
    ]), d = $(() => sn(o.scope, l.value, a.value));
    return (s, v) => (r(), Y(Ze, {
      class: "map-dialog map-search-dialog",
      "aria-label": i.value.search,
      onClose: v[2] || (v[2] = (h) => s.$emit("close"))
    }, {
      default: $e(() => [
        n("header", rn, [
          C(P, { name: "search" }),
          xe(n("input", {
            "onUpdate:modelValue": v[0] || (v[0] = (h) => l.value = h),
            type: "search",
            "aria-label": i.value.search,
            placeholder: i.value.search,
            autofocus: ""
          }, null, 8, cn), [[De, l.value]]),
          n("button", {
            type: "button",
            onClick: v[1] || (v[1] = (h) => s.$emit("close"))
          }, f(b(K).cancel), 1)
        ]),
        n("h2", un, f(e.title), 1),
        n("nav", {
          class: "map-search-filters",
          "aria-label": b(K).filters
        }, [(r(!0), c(O, null, q(u.value, (h) => (r(), c("button", {
          key: h.id,
          type: "button",
          "aria-pressed": a.value === h.id,
          onClick: (t) => a.value = h.id
        }, f(h.name), 9, vn))), 128))], 8, dn),
        n("div", pn, [
          n("small", null, f(b(Ie)(e.scope.kind, d.value.length)), 1),
          (r(!0), c(O, null, q(d.value, (h) => (r(), c("button", {
            key: h.key,
            type: "button",
            class: "map-search-result",
            onClick: (t) => s.$emit("select", h.key)
          }, [
            n("span", fn, [C(P, { name: e.scope.kind === "world" ? "globe" : "pin" }, null, 8, ["name"])]),
            n("span", null, [
              n("strong", null, f(h.name), 1),
              n("small", null, f(b(ze)[h.scale]) + " · " + f(b(ae)[h.status === "visited" ? "visited" : "unvisited"]), 1),
              h.brief ? (r(), c("p", yn, f(h.brief), 1)) : w("", !0)
            ]),
            C(P, { name: "next" })
          ], 8, hn))), 128)),
          d.value.length ? w("", !0) : (r(), c("div", mn, [
            C(P, { name: "search" }),
            n("h3", null, f(i.value.notFound), 1),
            n("p", null, f(b(K).searchHint), 1)
          ]))
        ])
      ]),
      _: 1
    }, 8, ["aria-label"]));
  }
}), gn = bn, kn = {
  class: "map-place-detail",
  "aria-labelledby": "map-place-title"
}, wn = { id: "map-place-title" }, Mn = { class: "map-place-content" }, _n = {
  key: 0,
  class: "map-place-full-name"
}, $n = {
  key: 1,
  class: "map-address"
}, xn = { class: "map-place-intro" }, Cn = { class: "map-place-actions" }, Sn = {
  key: 2,
  class: "map-detail-section"
}, jn = { class: "map-people" }, On = {
  key: 3,
  class: "map-detail-section"
}, Pn = ["onClick"], An = /* @__PURE__ */ Z({
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
    const o = e, l = $(() => ce(o.map.atlas, o.location.key).slice(0, -1)), a = $(() => U(o.location)), i = $(() => o.map.atlas.actors.filter((d) => d.locationKey === o.location.key)), u = $(() => tt(o.map.atlas, o.location.key));
    return (d, s) => (r(), c("section", kn, [
      s[6] || (s[6] = n("div", {
        class: "map-sheet-grip",
        "aria-hidden": "true"
      }, null, -1)),
      n("header", null, [n("div", null, [n("small", null, f(b(ze)[e.location.scale]) + " · " + f(e.currentKey === e.location.key ? "当前位置" : b(ae)[e.location.status === "visited" ? "visited" : "unvisited"]), 1), n("h2", wn, f(e.location.name), 1)]), n("button", {
        type: "button",
        class: "map-round-button",
        "aria-label": "关闭地点详情",
        onClick: s[0] || (s[0] = (v) => d.$emit("close"))
      }, [C(P, { name: "close" })])]),
      n("div", Mn, [
        e.location.name.length > 24 ? (r(), c("p", _n, f(e.location.name), 1)) : w("", !0),
        l.value.length ? (r(), c("p", $n, [C(P, { name: "pin" }), D(f(l.value.map((v) => v.name).join(" · ")), 1)])) : w("", !0),
        n("p", xn, f(e.location.brief || "这个地点已记录在世界地图上，更多介绍等待故事展开。"), 1),
        n("div", Cn, [a.value ? (r(), c("button", {
          key: 0,
          type: "button",
          class: "map-primary-button",
          onClick: s[1] || (s[1] = (v) => d.$emit("explore"))
        }, [C(P, { name: "compass" }), D(f(b(K).regionMap), 1)])) : (r(), c("button", {
          key: 1,
          type: "button",
          class: "map-secondary-button",
          onClick: s[2] || (s[2] = (v) => d.$emit("scene"))
        }, [C(P, { name: "layers" }), D(f(b(K).sceneMap), 1)]))]),
        i.value.length ? (r(), c("section", Sn, [s[3] || (s[3] = n("h3", null, "记录在这里的人物", -1)), n("p", jn, [(r(!0), c(O, null, q(i.value, (v) => (r(), c("span", { key: v.actorKey }, [C(P, { name: "person" }), D(f(v.displayName), 1)]))), 128))])])) : w("", !0),
        u.value.length ? (r(), c("section", On, [s[4] || (s[4] = n("h3", null, "相连的地方", -1)), (r(!0), c(O, null, q(u.value, (v) => (r(), c("button", {
          key: v.link.id,
          type: "button",
          class: "map-connection",
          onClick: (h) => d.$emit("select", v.location.key)
        }, [
          C(P, { name: "route" }),
          n("span", null, [n("strong", null, f(v.location.name), 1), n("small", null, f(v.link.label || b(wa)[v.link.kind]) + f(v.link.bidirectional ? "" : v.outgoing ? " · 单向前往" : " · 仅可从对面到达"), 1)]),
          C(P, { name: "next" })
        ], 8, Pn))), 128))])) : w("", !0),
        s[5] || (s[5] = n("p", { class: "map-detail-footnote" }, "查看地图不会改变你在故事中的位置", -1))
      ])
    ]));
  }
}), En = An, In = { class: "map-top" }, Bn = { class: "map-search-bar" }, Ln = ["disabled"], Tn = {
  key: 1,
  class: "map-search-entry"
}, Hn = {
  key: 0,
  class: "map-view-row"
}, Rn = ["aria-label"], zn = ["aria-pressed"], Kn = ["aria-pressed"], Vn = ["aria-pressed"], Nn = {
  key: 0,
  class: "map-scene-tools"
}, qn = ["aria-expanded"], Dn = ["aria-label"], Zn = ["aria-current"], Fn = { "aria-current": "page" }, Qn = {
  key: 2,
  class: "map-notice",
  role: "status"
}, Yn = {
  key: 1,
  class: "map-empty"
}, Wn = {
  key: 2,
  class: "map-empty"
}, Gn = { class: "map-empty" }, Un = ["disabled"], Xn = ["aria-expanded"], Jn = {
  key: 1,
  class: "map-key"
}, eo = ["aria-label"], to = { class: "map-region-icon" }, ao = {
  class: "map-round-button",
  "aria-hidden": "true"
}, no = {
  key: 4,
  class: "map-scene-caption"
}, oo = /* @__PURE__ */ Z({
  __name: "MapBrowser",
  props: {
    map: {},
    chatIdentity: {}
  },
  setup(e) {
    const o = e, l = `map-browse-summary-${me()}`, a = B(""), i = () => on(o.map) === "scene" ? {
      kind: "scene",
      key: ""
    } : { kind: "world" }, u = B(i()), d = B("3d"), s = B(!1), v = B("");
    let h = !1;
    const t = $(() => u.value.kind === "scene"), p = $(() => u.value.kind === "scene" ? u.value.key : ""), g = B(""), _ = B(0), M = B(null), L = B(!1), S = $(() => o.map?.atlas), R = $(() => S.value?.actors.find((k) => k.actorKey === "player")?.locationKey || ""), N = $(() => S.value?.locations.find((k) => k.key === R.value)), V = $(() => S.value?.locations.find((k) => k.key === (p.value || R.value))), Q = $(() => t.value && V.value?.sceneKey ? o.map?.scenes[V.value.sceneKey] : void 0), z = $(() => {
      if (!S.value || u.value.kind === "world") return;
      const k = u.value.key || R.value;
      return fe(S.value, k);
    }), E = $(() => ln(S.value || {
      locations: [],
      links: [],
      actors: []
    }, u.value.kind === "world" ? null : z.value?.key || "")), I = $(() => E.value.locations.find((k) => k.key === a.value)), T = $(() => E.value.kind === "world" ? G.world : z.value?.name || K.unknownRegion), le = $(() => ue[E.value.kind]), y = $(() => E.value.unvisited ? "unvisited" : "all");
    te(() => ({
      map: o.map,
      chatIdentity: o.chatIdentity
    }), (k, m) => {
      const j = k.chatIdentity !== m.chatIdentity;
      (j || !k.map?.atlas.locations.some((ge) => ge.key === a.value)) && (a.value = ""), j && (h = !1);
      const X = u.value.kind === "world" ? "" : u.value.key, Ve = X && !k.map?.atlas.locations.some((ge) => ge.key === X);
      (j || !m.map?.atlas.locations.length && k.map?.atlas.locations.length && !h || Ve) && (u.value = i()), j && (M.value = null, L.value = !1);
    }), te(E, (k, m) => {
      k.locations.some((j) => j.key === a.value) || (a.value = ""), (k.kind !== m.kind || k.region?.key !== m.region?.key || !S.value) && (a.value = "", M.value = null, L.value = !1);
    });
    function x(k) {
      h = !0, u.value = k, a.value = "", M.value = null, L.value = !1;
    }
    function A(k = "") {
      x({
        kind: "region",
        key: k
      });
    }
    async function H(k, m = !1) {
      const j = S.value?.locations.find((X) => X.key === k);
      if (j) {
        if (h = !0, m && S.value) {
          if (U(j)) ne();
          else {
            const X = fe(S.value, k);
            if (!X) {
              F(k);
              return;
            }
            A(X.key);
          }
          await ke();
        }
        a.value = k, M.value = null, L.value = !1, await ke(), g.value = S.value ? ye(S.value, k, E.value.locations) : k, _.value += 1;
      }
    }
    async function se() {
      if (!(!N.value || !S.value)) {
        if (U(N.value)) {
          await H(N.value.key, !0);
          return;
        }
        if (!fe(S.value, N.value.key)) {
          F();
          return;
        }
        A(), await ke(), await H(N.value.key);
      }
    }
    function F(k = "") {
      x({
        kind: "scene",
        key: k === R.value ? "" : k
      });
    }
    function ne() {
      x({ kind: "world" });
    }
    function Ke(k) {
      s.value || (s.value = !0, d.value = "2d", v.value = k);
    }
    return qe(() => L.value ? (L.value = !1, !0) : t.value ? (A(p.value && z.value?.key || ""), !0) : a.value ? (a.value = "", !0) : u.value.kind === "region" ? (ne(), !0) : !1), (k, m) => (r(), c("main", { class: W(["map-app", {
      "has-view-switch": S.value?.locations.length,
      "is-scene-view": t.value
    }]) }, [
      n("div", In, [
        n("header", Bn, [
          C(P, { name: t.value ? "layers" : "search" }, null, 8, ["name"]),
          t.value ? (r(), c("div", Tn, [D(f(V.value?.name || b(G).scene), 1), n("small", null, f(p.value ? b(K).sceneBrowsing : b(K).sceneCurrent), 1)])) : (r(), c("button", {
            key: 0,
            type: "button",
            class: "map-search-entry",
            disabled: !S.value?.locations.length,
            onClick: m[0] || (m[0] = (j) => M.value = "all")
          }, [D(f(le.value.search), 1), n("small", null, f(T.value), 1)], 8, Ln)),
          J(k.$slots, "toolbar")
        ]),
        S.value?.locations.length ? (r(), c("div", Hn, [n("nav", {
          class: "map-view-switch",
          "aria-label": b(K).viewLabel
        }, [
          n("button", {
            type: "button",
            "aria-pressed": u.value.kind === "world",
            onClick: ne
          }, [C(P, { name: "globe" }), D(f(b(G).world), 1)], 8, zn),
          n("button", {
            type: "button",
            "aria-pressed": u.value.kind === "region",
            onClick: m[1] || (m[1] = (j) => A())
          }, [C(P, { name: "compass" }), D(f(b(G).region), 1)], 8, Kn),
          n("button", {
            type: "button",
            "aria-pressed": t.value,
            onClick: m[2] || (m[2] = (j) => F())
          }, [C(P, { name: "layers" }), D(f(b(G).scene), 1)], 8, Vn)
        ], 8, Rn), t.value ? (r(), c("div", Nn, [p.value ? (r(), c("button", {
          key: 0,
          type: "button",
          class: "map-round-button",
          "aria-label": "回到当前场景",
          onClick: m[3] || (m[3] = (j) => F())
        }, [C(P, { name: "locate" })])) : w("", !0), n("button", {
          type: "button",
          class: "map-round-button",
          "aria-expanded": L.value,
          "aria-label": "地图图例",
          onClick: m[4] || (m[4] = (j) => L.value = !L.value)
        }, [C(P, { name: "layers" })], 8, qn)])) : w("", !0)])) : w("", !0),
        S.value?.locations.length && !t.value ? (r(), c("nav", {
          key: 1,
          class: "map-region-trail",
          "aria-label": b(K).trailLabel
        }, [n("button", {
          type: "button",
          "aria-current": u.value.kind === "world" ? "page" : void 0,
          onClick: ne
        }, [C(P, { name: "globe" }), D(f(b(G).world), 1)], 8, Zn), u.value.kind === "region" ? (r(), c(O, { key: 0 }, [C(P, { name: "next" }), n("span", Fn, f(T.value), 1)], 64)) : w("", !0)], 8, Dn)) : w("", !0),
        v.value ? (r(), c("aside", Qn, [n("p", null, f(v.value), 1), n("button", {
          type: "button",
          class: "map-notice-close",
          "aria-label": "关闭三维提示",
          onClick: m[5] || (m[5] = (j) => v.value = "")
        }, [C(P, { name: "close" })])])) : w("", !0),
        J(k.$slots, "feedback")
      ]),
      n("div", { class: W(["map-canvas", { "has-detail": I.value && !t.value }]) }, [e.map && S.value?.locations.length ? (r(), c(O, { key: 0 }, [
        E.value.locations.length ? xe((r(), Y(bt, {
          key: 0,
          atlas: e.map.atlas,
          scope: E.value,
          label: T.value,
          "current-location-key": R.value,
          "selected-location-key": a.value,
          "focus-key": g.value,
          "focus-sequence": _.value,
          onSelect: m[6] || (m[6] = (j) => H(j))
        }, null, 8, [
          "atlas",
          "scope",
          "label",
          "current-location-key",
          "selected-location-key",
          "focus-key",
          "focus-sequence"
        ])), [[Ae, !t.value]]) : w("", !0),
        t.value ? (r(), c(O, { key: 1 }, [Q.value?.status === "active" ? (r(), Y(nn, {
          key: 0,
          mode: d.value,
          "onUpdate:mode": m[7] || (m[7] = (j) => d.value = j),
          scene: Q.value,
          "three-unavailable": s.value,
          onFallback: Ke
        }, null, 8, [
          "mode",
          "scene",
          "three-unavailable"
        ])) : (r(), c("div", Yn, [
          C(P, { name: "layers" }),
          n("h2", null, f(V.value ? b(K).sceneEmpty : b(K).unknownLocation), 1),
          p.value && p.value !== R.value ? (r(), c("button", {
            key: 0,
            type: "button",
            class: "map-secondary-button",
            onClick: m[8] || (m[8] = (j) => z.value ? A(z.value.key) : ne())
          }, f(z.value ? b(K).regionMap : b(G).world), 1)) : J(k.$slots, "scene-empty-action", {
            key: 1,
            located: !!V.value
          })
        ]))], 64)) : w("", !0),
        !t.value && !E.value.locations.length ? (r(), c("div", Wn, [
          C(P, { name: "pin" }),
          n("h2", null, f(u.value.kind === "region" && !z.value ? b(K).unknownRegion : le.value.empty), 1),
          n("p", null, f(u.value.kind === "region" && !z.value ? b(K).unknownRegionHint : le.value.emptyHint), 1),
          u.value.kind === "region" ? (r(), c("button", {
            key: 0,
            type: "button",
            class: "map-secondary-button",
            onClick: ne
          }, f(b(G).world), 1)) : J(k.$slots, "scope-empty-action", { key: 1 })
        ])) : w("", !0)
      ], 64)) : J(k.$slots, "empty-map", { key: 1 }, () => [n("div", Gn, [C(P, { name: "globe" }), n("h2", null, f(b(nt).empty), 1)])])], 2),
      S.value?.locations.length && !t.value ? (r(), c("div", {
        key: 0,
        class: W(["map-floating-tools", { "has-detail": I.value }])
      }, [n("button", {
        type: "button",
        class: "map-round-button",
        disabled: !N.value,
        "aria-label": "回到我的位置",
        onClick: se
      }, [C(P, { name: "locate" })], 8, Un), n("button", {
        type: "button",
        class: "map-round-button",
        "aria-expanded": L.value,
        "aria-label": "地图图例",
        onClick: m[9] || (m[9] = (j) => L.value = !L.value)
      }, [C(P, { name: "layers" })], 8, Xn)], 2)) : w("", !0),
      L.value ? (r(), c("aside", Jn, [
        m[17] || (m[17] = n("strong", null, "读懂这张地图", -1)),
        m[18] || (m[18] = n("p", null, [
          n("i", { class: "map-key-current" }),
          D("你在这里 "),
          n("i", { class: "map-key-place" }),
          D("可探索地点")
        ], -1)),
        m[19] || (m[19] = n("p", null, "路线连接已记录的地点；箭头表示单向通行。", -1)),
        n("small", null, f(b(K).legend), 1)
      ])) : w("", !0),
      I.value && e.map && !t.value ? (r(), Y(En, {
        key: I.value.key,
        location: I.value,
        map: e.map,
        "current-key": R.value,
        onClose: m[10] || (m[10] = (j) => a.value = ""),
        onScene: m[11] || (m[11] = (j) => F(I.value.key)),
        onExplore: m[12] || (m[12] = (j) => A(I.value.key)),
        onSelect: m[13] || (m[13] = (j) => H(j, !0))
      }, null, 8, [
        "location",
        "map",
        "current-key"
      ])) : S.value?.locations.length && !t.value ? (r(), c("button", {
        key: 3,
        type: "button",
        class: "map-region-card",
        "aria-label": b(lt)(E.value.kind, y.value),
        "aria-describedby": l,
        onClick: m[14] || (m[14] = (j) => M.value = y.value)
      }, [
        n("span", to, [C(P, { name: E.value.kind === "world" ? "globe" : "compass" }, null, 8, ["name"])]),
        n("span", {
          id: l,
          class: "map-region-summary"
        }, [n("strong", null, f(T.value), 1), n("small", null, f(b(ot)(E.value.kind, E.value.locations.length, E.value.unvisited)), 1)]),
        n("span", ao, [C(P, { name: "next" })])
      ], 8, eo)) : t.value && S.value?.locations.length ? (r(), c("footer", no, [C(P, { name: "layers" }), n("span", null, [n("strong", null, f(V.value?.name || "当前位置待确认"), 1), n("small", null, f(p.value ? "正在查看场景图 · 不会移动人物" : "当前位置的场景图"), 1)])])) : w("", !0),
      M.value && S.value ? (r(), Y(gn, {
        key: 5,
        scope: E.value,
        title: T.value,
        "initial-filter": M.value,
        onClose: m[15] || (m[15] = (j) => M.value = null),
        onSelect: m[16] || (m[16] = (j) => H(j))
      }, null, 8, [
        "scope",
        "title",
        "initial-filter"
      ])) : w("", !0),
      J(k.$slots, "overlay")
    ], 2));
  }
}), fo = oo;
export {
  ta as a,
  He as c,
  ho as d,
  wt as f,
  P as h,
  $a as i,
  oe as l,
  nt as m,
  ya as n,
  ve as o,
  K as p,
  _a as r,
  we as s,
  fo as t,
  je as u
};
