/* eslint-disable */
import { B as r, C as Xe, E as G, H as N, K as fe, L as _e, N as Oe, Q as Ae, T as L, U as le, Y as ee, Z as Pe, _ as j, b as k, ct as y, d as ze, dt as m, f as Ie, j as Se, k as Me, lt as Y, m as C, nt as H, p as ge, q as he, r as Je, u as et, ut as ke, v as a, w as D, x as c, y as Z } from "./xiaobai-os-app-navigation-DbF27MCy.js";
import { t as tt } from "./xiaobai-os-AppDialog-CirfCMYM.js";
function at(e, n) {
  const s = /* @__PURE__ */ new Set(), t = e.ownerDocument, u = [
    "pointerup",
    "pointercancel",
    "lostpointercapture"
  ];
  function d() {
    for (const l of u) t.removeEventListener(l, p, !0);
    t.removeEventListener("visibilitychange", v);
  }
  function p(l) {
    s.delete(l.pointerId) && (s.size || d(), (l.type === "lostpointercapture" || !l.composedPath().includes(e)) && n(l.pointerId));
  }
  function i() {
    const l = [...s];
    s.clear(), d();
    for (const f of l) n(f);
  }
  function v() {
    t.hidden && i();
  }
  function h(l) {
    if (!s.size) {
      for (const f of u) t.addEventListener(f, p, !0);
      t.addEventListener("visibilitychange", v);
    }
    s.add(l.pointerId);
  }
  return e.addEventListener("pointerdown", h, !0), {
    cancel: i,
    dispose() {
      e.removeEventListener("pointerdown", h, !0), i();
    }
  };
}
var nt = { class: "map-viewport" }, ot = ["viewBox", "aria-label"], lt = {
  class: "map-viewport-controls",
  "aria-label": "地图缩放"
}, st = /* @__PURE__ */ G({
  __name: "MapViewport",
  props: {
    viewBox: {},
    resetKey: { default: "" },
    label: {},
    focusPoint: { default: void 0 },
    focusSequence: { default: 0 }
  },
  setup(e) {
    const n = e, s = H(null), t = H([...n.viewBox]), u = H([0, 0]), d = j(() => u.value[0] && u.value[1] ? Math.max(t.value[2] / u.value[0], t.value[3] / u.value[1]) : 1);
    let p, i;
    _e(() => {
      i = at(s.value, F), p = new ResizeObserver((w) => {
        const S = w[0].contentRect;
        u.value = [S.width, S.height], (!S.width || !S.height) && i?.cancel();
      }), s.value && p.observe(s.value);
    });
    const v = /* @__PURE__ */ new Map();
    let h = null, l = [0, 0], f = 0, o = null, b = !1, $ = !1, P = null;
    const E = j(() => t.value.join(" "));
    function B() {
      t.value = [...n.viewBox];
    }
    function x() {
      return d.value;
    }
    function W(w, S) {
      const O = s.value?.getBoundingClientRect();
      if (!O) return [t.value[0], t.value[1]];
      const z = x();
      return [t.value[0] + t.value[2] / 2 + (w - O.left - O.width / 2) * z, t.value[1] + t.value[3] / 2 + (S - O.top - O.height / 2) * z];
    }
    function K(w, S) {
      const O = Math.max(1, n.viewBox[2]), z = Math.min(O * 3, Math.max(Math.min(O * 0.24, 240), t.value[2] * w)), U = z / t.value[2], ne = S || [t.value[0] + t.value[2] / 2, t.value[1] + t.value[3] / 2];
      t.value = [
        ne[0] - (ne[0] - t.value[0]) * U,
        ne[1] - (ne[1] - t.value[1]) * U,
        z,
        t.value[3] * U
      ];
    }
    function V() {
      if (!n.focusPoint) return;
      const w = Math.min(t.value[2], 620), S = t.value[3] * w / t.value[2];
      t.value = [
        n.focusPoint[0] - w / 2,
        n.focusPoint[1] - S / 2,
        w,
        S
      ];
    }
    function q() {
      const w = [...v.values()].map((S) => S.position);
      w.length === 1 && (h = w[0], l = [t.value[0], t.value[1]]), w.length === 2 && (f = Math.hypot(w[1][0] - w[0][0], w[1][1] - w[0][1]), o = [(w[0][0] + w[1][0]) / 2, (w[0][1] + w[1][1]) / 2], b = !0);
    }
    function R(w) {
      if (w.button !== 0 || v.size >= 2) return;
      v.size || (b = !1);
      const S = w.target;
      v.set(w.pointerId, {
        position: [w.clientX, w.clientY],
        target: S
      }), S.setPointerCapture(w.pointerId), q();
    }
    function I(w) {
      const S = v.get(w.pointerId);
      if (!S) return;
      S.position = [w.clientX, w.clientY];
      const O = [...v.values()].map((z) => z.position);
      if (O.length === 2 && o) {
        const z = Math.hypot(O[1][0] - O[0][0], O[1][1] - O[0][1]), U = [(O[0][0] + O[1][0]) / 2, (O[0][1] + O[1][1]) / 2];
        z > 0 && f > 0 && K(f / z, W(...o)), t.value[0] -= (U[0] - o[0]) * x(), t.value[1] -= (U[1] - o[1]) * x(), f = z, o = U;
      } else if (h) {
        const z = w.clientX - h[0], U = w.clientY - h[1];
        Math.abs(z) + Math.abs(U) > 4 && (b = !0), t.value = [
          l[0] - z * x(),
          l[1] - U * x(),
          t.value[2],
          t.value[3]
        ];
      }
    }
    function F(w) {
      const S = v.get(w);
      S && (v.delete(w), S.target.hasPointerCapture(w) && S.target.releasePointerCapture(w), q(), v.size || (h = null, o = null), b && ($ = !0, P && clearTimeout(P), P = setTimeout(() => {
        $ = !1;
      }, 0)));
    }
    function X(w) {
      $ && (w.preventDefault(), w.stopPropagation());
    }
    return ee(() => n.resetKey, B, { immediate: !0 }), ee(() => n.focusSequence, V, { flush: "post" }), Oe(() => {
      i?.dispose(), p?.disconnect(), P && clearTimeout(P);
    }), (w, S) => (r(), c("div", nt, [(r(), c("svg", {
      ref_key: "svg",
      ref: s,
      class: "map-viewport-svg",
      viewBox: E.value,
      preserveAspectRatio: "xMidYMid meet",
      role: "group",
      "aria-label": e.label,
      onWheel: S[0] || (S[0] = ge((O) => K(O.deltaY < 0 ? 0.84 : 1.19, W(O.clientX, O.clientY)), ["prevent"])),
      onPointerdown: R,
      onPointermove: I,
      onPointerup: S[1] || (S[1] = (O) => F(O.pointerId)),
      onPointercancel: S[2] || (S[2] = (O) => F(O.pointerId)),
      onClickCapture: X
    }, [le(w.$slots, "default", { unitScale: d.value })], 40, ot)), a("div", lt, [
      a("button", {
        type: "button",
        "aria-label": "放大地图",
        onClick: S[3] || (S[3] = (O) => K(0.8))
      }, "+"),
      a("button", {
        type: "button",
        "aria-label": "缩小地图",
        onClick: S[4] || (S[4] = (O) => K(1.25))
      }, "−"),
      a("button", {
        type: "button",
        class: "map-fit",
        onClick: B
      }, "全图")
    ])]));
  }
}), Ne = st, rt = {
  class: "map-icon",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.7",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true"
}, it = ["d"], ct = /* @__PURE__ */ G({
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
    return (s, t) => (r(), c("svg", rt, [a("path", { d: n[e.name] || n.pin }, null, 8, it)]));
  }
}), A = ct;
function te(e) {
  return e.scale === "region";
}
function ut(e) {
  return e.scale !== "world" && !te(e);
}
function ye(e, n) {
  const s = new Map(e.locations.map((d) => [d.key, d])), t = [];
  let u = s.get(n);
  for (; u; )
    t.unshift(u), u = u.parent ? s.get(u.parent) : void 0;
  return t;
}
function we(e, n) {
  return ye(e, n).reverse().find(te);
}
function dt(e) {
  const n = /* @__PURE__ */ new Set(), s = e.actors.find((t) => t.actorKey === "player")?.locationKey;
  for (const t of e.locations)
    if (!(t.status !== "visited" && t.key !== s))
      for (const u of ye(e, t.key)) n.add(u.key);
  return n;
}
function $e(e, n, s) {
  const t = new Set(s.map((u) => u.key));
  return ye(e, n).reverse().find((u) => t.has(u.key))?.key || "";
}
function vt(e, n) {
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
function pt(e, n) {
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
      const b = d * 2.3999632297, $ = 155 * Math.sqrt(d++);
      f = Math.round(500 + Math.cos(b) * $), o = Math.round(420 + Math.sin(b) * $);
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
    const f = p.get($e(e, l.from, s)), o = p.get($e(e, l.to, s));
    if (!f || !o || f === o) return [];
    const b = (f.x + o.x) / 2, $ = (f.y + o.y) / 2;
    return [{
      link: l,
      from: f,
      to: o,
      x: b,
      y: $,
      path: `M ${f.x} ${f.y} Q ${b + (o.y - f.y) * 0.12} ${$ - (o.x - f.x) * 0.12} ${o.x} ${o.y}`
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
var ve = {
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
  location: "回到当前位置",
  loadFailed: "地图投影加载失败，请刷新页面重试。"
}, Q = {
  mode: "场景显示方式",
  two: "二维",
  three: "三维",
  lowWalls: "低墙",
  labels: "名称"
}, J = {
  world: "世界地图",
  region: "当前地区",
  scene: "当前场景"
}, re = {
  visited: "已到访",
  unvisited: "未到访"
}, me = {
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
}, T = {
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
  return `${n} 个${me[e].unit}`;
}
function ht(e, n, s) {
  return `${Ke(e, n)} · ${s} 个${re.unvisited}`;
}
function ft(e, n) {
  return `查看${n === "all" ? "" : re[n]}${me[e].unit}`;
}
var yt = {
  class: "map-landscapes",
  "aria-hidden": "true"
}, mt = ["transform"], bt = {
  class: "map-world-roads",
  "aria-hidden": "true"
}, gt = ["d"], kt = ["d", "marker-end"], wt = ["x", "y"], Mt = [
  "transform",
  "aria-label",
  "onClick",
  "onKeydown"
], $t = { transform: "translate(-14 -20)" }, _t = {
  y: "64",
  class: "map-place-name"
}, xt = {
  key: 0,
  y: "89",
  class: "map-place-status"
}, Ct = {
  key: 1,
  y: "89",
  class: "map-place-status"
}, St = /* @__PURE__ */ G({
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
    const n = e, s = j(() => pt(n.atlas, n.scope)), t = j(() => $e(n.atlas, n.currentLocationKey, n.scope.locations)), u = j(() => s.value.nodes.find((i) => i.location.key === n.focusKey)), d = "map-arrow-" + fe();
    function p(i, v) {
      return i === "water" ? "water" : i === "forest" ? "tree" : i === "mountain" ? "mountain" : ["world", "region"].includes(v) ? "globe" : v === "outdoor" ? "compass" : "building";
    }
    return (i, v) => (r(), Z(Ne, {
      "view-box": s.value.viewBox,
      "reset-key": `${e.scope.kind}:${e.scope.region?.key || ""}`,
      label: e.label,
      "focus-point": u.value ? [u.value.x, u.value.y] : void 0,
      "focus-sequence": e.focusSequence
    }, {
      default: Pe(({ unitScale: h }) => [
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
        a("g", yt, [(r(!0), c(C, null, N(s.value.nodes, (l) => (r(), c("g", {
          key: l.location.key,
          transform: `translate(${l.x} ${l.y})`,
          class: Y(`is-${l.location.terrain || "urban"}`)
        }, [...v[1] || (v[1] = [a("path", { d: "M-108-20Q-100-100-32-94T87-56Q127-13 99 48T21 99Q-57 113-90 65T-108-20Z" }, null, -1), a("path", {
          class: "map-contour",
          d: "M-133-22Q-124-126-39-116T110-70Q156-17 124 60T26 123Q-71 139-112 81T-133-22Z"
        }, null, -1)])], 10, mt))), 128))]),
        a("g", bt, [(r(!0), c(C, null, N(s.value.routes, (l) => (r(), c("g", {
          key: l.link.id,
          class: Y({
            "is-path": l.link.kind === "path",
            "is-portal": l.link.kind === "portal"
          })
        }, [
          a("path", {
            class: "map-road-casing",
            d: l.path
          }, null, 8, gt),
          a("path", {
            class: "map-road-line",
            d: l.path,
            "marker-end": l.link.bidirectional ? void 0 : `url(#${d})`
          }, null, 8, kt),
          l.link.label ? (r(), c("text", {
            key: 0,
            x: l.x,
            y: l.y - 14
          }, m(l.link.label), 9, wt)) : k("", !0)
        ], 2))), 128))]),
        (r(!0), c(C, null, N(s.value.nodes, (l) => (r(), c("g", {
          key: l.location.key,
          class: Y(["map-place", {
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
          a("g", $t, [L(A, {
            name: p(l.location.terrain, l.location.scale),
            width: "28",
            height: "28"
          }, null, 8, ["name"])]),
          a("text", _t, m(l.location.name.length > 14 ? l.location.name.slice(0, 13) + "…" : l.location.name), 1),
          l.location.key === t.value ? (r(), c("text", xt, "你在这里")) : l.location.status !== "visited" ? (r(), c("text", Ct, m(y(re).unvisited), 1)) : k("", !0),
          a("title", null, m(l.location.name) + m(l.location.brief ? " · " + l.location.brief : ""), 1)
        ], 42, Mt))), 128))
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
}), Lt = St, de;
async function Ve() {
  if (!de) {
    const e = [
      "..",
      "..",
      "..",
      "libs",
      "material-symbols",
      "material-symbols-rounded.woff2"
    ].join("/"), n = new URL(e, import.meta.url);
    de = new FontFace("Xiaobai Map Symbols", `url("${n.href}")`, {
      display: "block",
      weight: "400"
    }).load(), de.catch(() => {
      de = void 0;
    });
  }
  document.fonts.add(await de);
}
var ol = Object.freeze([
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
]), ll = Object.freeze([
  "rect",
  "circle",
  "path",
  "curve",
  "icon",
  "label"
]), sl = Object.freeze([
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
]), rl = Object.freeze([
  "confirmed",
  "inferred",
  "unknown"
]), il = Object.freeze(["indoor", "outdoor"]), cl = Object.freeze([
  "sunlight",
  "daylight",
  "night"
]), ul = Object.freeze(["on", "off"]), Et = Object.freeze([
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
]), qe = Object.freeze(Et.flatMap((e) => [...e.icons])), dl = Object.freeze([
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
]), vl = Object.freeze(/* @__PURE__ */ new Set([
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
function pe(e) {
  return `color-mix(in srgb, ${Ot[e]}, var(--map-surface) var(--scene-material-mix))`;
}
var Pt = ["id"], Bt = ["stop-color", "stop-opacity"], It = ["stop-color", "stop-opacity"], Tt = ["stop-color", "stop-opacity"], Rt = ["id"], Ht = ["fill", "fill-opacity"], zt = {
  fill: "none",
  stroke: "var(--scene-shadow)",
  "stroke-width": ".65",
  opacity: ".24"
}, Nt = {
  key: 1,
  d: "M0 0H48V32H0ZM19 0V17M0 17H48M36 17V32M3 3h12m8 0h21"
}, Kt = {
  key: 2,
  d: "M0 0H48V32H0ZM24 0V32M0 16H48M12 4l5 4-5 4-5-4ZM36 20l5 4-5 4-5-4Z"
}, Vt = {
  key: 3,
  d: "M-3 3 8 11l17 2 9 10 18 3M27-3l-8 12 3 8-7 17",
  opacity: ".65"
}, qt = {
  key: 4,
  d: "M3 8q6 3 13 0M25 25q7 2 17-1",
  stroke: "var(--scene-highlight)",
  "stroke-width": "1.3",
  opacity: "1"
}, Ut = {
  key: 5,
  d: "M5 32 37 0M12 32 44 0",
  stroke: "var(--scene-highlight)",
  "stroke-width": "2.2"
}, Wt = {
  key: 6,
  d: "M8 15l-2-4m2 4 3-3M36 26l-1-4m1 4 3-3"
}, Dt = {
  key: 7,
  d: "M5 8h1m20-2h2m-12 17h2m23-6h1m-5 12h2",
  "stroke-linecap": "round"
}, Gt = {
  key: 8,
  d: "M0 0H48V32H0M0 5H48M0 27H48M5 5v1m38-1v1m-38 20v1m38-1v1"
}, Ft = {
  key: 9,
  d: "M0 5H48M0 13H48M0 21H48M0 29H48M4 0v32m8-32v32m8-32v32m8-32v32m8-32v32m8-32v32",
  opacity: ".55"
}, Zt = {
  key: 10,
  d: "m24 5 8 11-8 11-8-11ZM24 10v12M20 16h8"
}, Qt = {
  key: 11,
  d: "M7 8q12-5 16 6t20 7M4 27l6-3"
}, Yt = {
  key: 12,
  d: "M5 19q5-3 11-1M29 8q6-2 12 1",
  stroke: "var(--scene-highlight)",
  "stroke-width": "1.4"
}, Xt = {
  key: 0,
  d: "M0 1H48",
  stroke: "var(--scene-highlight)",
  "stroke-width": ".7",
  opacity: ".35"
}, Jt = ["id"], ea = ["id"], ta = ["transform", "fill"], aa = /* @__PURE__ */ G({
  __name: "SceneMaterials",
  props: { prefix: {} },
  setup(e) {
    return (n, s) => (r(), c("defs", null, [
      (r(!0), c(C, null, N(y(jt), (t) => (r(), c(C, { key: t }, [a("linearGradient", {
        id: `${e.prefix}-face-${t}`,
        x1: "0",
        y1: "0",
        x2: ".7",
        y2: "1"
      }, [
        a("stop", {
          offset: "0",
          "stop-color": `color-mix(in srgb, ${y(pe)(t)}, var(--scene-highlight) 24%)`,
          "stop-opacity": t === "glass" ? 0.35 : 1
        }, null, 8, Bt),
        a("stop", {
          offset: ".52",
          "stop-color": y(pe)(t),
          "stop-opacity": t === "glass" ? 0.16 : 1
        }, null, 8, It),
        a("stop", {
          offset: "1",
          "stop-color": `color-mix(in srgb, ${y(pe)(t)}, var(--scene-shadow) 16%)`,
          "stop-opacity": t === "glass" ? 0.28 : 1
        }, null, 8, Tt)
      ], 8, Pt), a("pattern", {
        id: `${e.prefix}-material-${t}`,
        width: "48",
        height: "32",
        patternUnits: "userSpaceOnUse",
        class: "scene-texture"
      }, [
        a("rect", {
          width: "48",
          height: "32",
          fill: y(pe)(t),
          "fill-opacity": t === "glass" ? 0.4 : 1
        }, null, 8, Ht),
        a("g", zt, [t === "wood" ? (r(), c(C, { key: 0 }, [s[0] || (s[0] = a("path", { d: "M0 0H48M0 16H48M19 0V16M37 16V32" }, null, -1)), s[1] || (s[1] = a("path", {
          d: "M3 7Q12 4 26 8T47 7M2 26q10-4 25 0t23-1",
          opacity: ".5"
        }, null, -1))], 64)) : t === "stone" ? (r(), c("path", Nt)) : t === "tile" ? (r(), c("path", Kt)) : t === "marble" ? (r(), c("path", Vt)) : t === "water" ? (r(), c("path", qt)) : t === "glass" ? (r(), c("path", Ut)) : t === "grass" || t === "forest" ? (r(), c("path", Wt)) : t === "dirt" || t === "sand" ? (r(), c("path", Dt)) : t === "metal" ? (r(), c("path", Gt)) : [
          "carpet",
          "fabric",
          "bed-sheet",
          "tatami"
        ].includes(t) ? (r(), c("path", Ft)) : t === "rune" ? (r(), c("path", Zt)) : t === "blood" ? (r(), c("path", Qt)) : t === "snow" ? (r(), c("path", Yt)) : k("", !0)]),
        t === "wood" || t === "stone" || t === "metal" ? (r(), c("path", Xt)) : k("", !0)
      ], 8, Rt)], 64))), 128)),
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
      ])], 8, Jt),
      (r(), c(C, null, N(3, (t) => a("symbol", {
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
      ])], 8, ta)], 8, ea)), 64))
    ]));
  }
}), na = aa, oa = /* @__PURE__ */ new Set([
  "water",
  "terrain",
  "furniture",
  "decoration",
  "danger",
  "magic",
  "secret",
  "light"
]), la = new Set(qe), sa = /* @__PURE__ */ new Set([
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
function ra(e) {
  return !!e.icon && sa.has(e.icon);
}
var se = (e) => Number(e.toFixed(3)).toString(), be = (e) => e.geometry.points || [];
function je(e) {
  return e.shape === "icon" || e.shape === "label" || e.category === "actor" || e.category === "door" || e.kind === "stairs" || e.icon === "stairs" || e.icon === "door-open";
}
function xe(e) {
  return be(e).length >= 3 && (e.closed ?? oa.has(e.category));
}
function ue(e) {
  return e.category === "wall" || e.category === "grid" || e.icon === "fence" && ["path", "curve"].includes(e.shape) ? !1 : e.shape === "rect" || e.shape === "circle" ? !0 : (e.shape === "path" || e.shape === "curve") && xe(e);
}
function We(e) {
  return ![
    "wall",
    "grid",
    "actor"
  ].includes(e.category) && (e.shape === "rect" || e.shape === "circle") && (e.icon !== void 0 && la.has(e.icon) || [
    "furniture",
    "decoration",
    "door"
  ].includes(e.category));
}
function Be(e, n, s) {
  const t = e[s], u = e[(s + 1) % e.length], d = e[s - 1] || (n ? e[e.length - 1] : t), p = e[s + 2] || (n ? e[(s + 2) % e.length] : u), i = (v, h, l) => Math.max(Math.min(h, l), Math.min(Math.max(h, l), v));
  return [[i(t[0] + (u[0] - d[0]) / 6, t[0], u[0]), i(t[1] + (u[1] - d[1]) / 6, t[1], u[1])], [i(u[0] - (p[0] - t[0]) / 6, t[0], u[0]), i(u[1] - (p[1] - t[1]) / 6, t[1], u[1])]];
}
function pl(e) {
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
  const n = be(e), s = xe(e), t = (d) => d.map((p) => Number(se(p)));
  if (e.shape === "path" || n.length < 2) return {
    points: n.map(t),
    closed: s
  };
  const u = [t(n[0])];
  for (let d = 0; d < n.length - (s ? 0 : 1); d += 1) {
    const p = t(n[d]), i = t(n[(d + 1) % n.length]), [v, h] = Be(n, s, d).map(t);
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
function ia(e) {
  if (e.shape === "rect") {
    const { x: d, y: p, width: i, height: v } = e.geometry;
    return `M ${d} ${p} h ${i} v ${v} h ${-i} Z`;
  }
  if (e.shape === "circle") {
    const { x: d, y: p, radius: i } = e.geometry;
    return `M ${d - i} ${p} a ${i} ${i} 0 1 0 ${i * 2} 0 a ${i} ${i} 0 1 0 ${-i * 2} 0 Z`;
  }
  const n = be(e);
  if (n.length < 2) return "";
  const s = xe(e);
  if (e.shape === "path") return `M ${n.map(([d, p]) => `${se(d)} ${se(p)}`).join(" L ")}${s ? " Z" : ""}`;
  const t = [`M ${n[0].map(se).join(" ")}`], u = n.length;
  for (let d = 0; d < u - (s ? 0 : 1); d += 1) {
    const [p, i] = Be(n, s, d), v = n[(d + 1) % u];
    t.push(`C ${p.map(se).join(" ")}, ${i.map(se).join(" ")}, ${v.map(se).join(" ")}`);
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
  const n = be(e);
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
function ca(e) {
  if (!e.rotation) return;
  const n = ae(e);
  return `rotate(${e.rotation} ${n.x + n.width / 2} ${n.y + n.height / 2})`;
}
function Te(e, n = 1) {
  const s = ae(e), t = [s.x + s.width / 2, s.y + s.height / 2];
  if (e.shape === "label") return t;
  if (je(e)) return [t[0], t[1] + 23 * n];
  if ((e.category === "terrain" || e.category === "water") && ue(e)) return t;
  if (e.shape === "path" || e.shape === "curve") {
    const p = be(e), i = xe(e), v = p.length - (i ? 0 : 1), h = Array.from({ length: v }, (q, R) => Math.hypot(p[(R + 1) % p.length][0] - p[R][0], p[(R + 1) % p.length][1] - p[R][1]));
    let l = h.reduce((q, R) => q + R, 0) / 2, f = 0;
    for (; f < h.length - 1 && l > h[f]; )
      l -= h[f], f += 1;
    const o = p[f], b = p[(f + 1) % p.length], $ = h[f] ? l / h[f] : 0.5;
    let P = o[0] + (b[0] - o[0]) * $, E = o[1] + (b[1] - o[1]) * $, B = b[0] - o[0], x = b[1] - o[1];
    if (e.shape === "curve") {
      const [q, R] = Be(p, i, f), I = 1 - $;
      P = I ** 3 * o[0] + 3 * I ** 2 * $ * q[0] + 3 * I * $ ** 2 * R[0] + $ ** 3 * b[0], E = I ** 3 * o[1] + 3 * I ** 2 * $ * q[1] + 3 * I * $ ** 2 * R[1] + $ ** 3 * b[1], B = 3 * I ** 2 * (q[0] - o[0]) + 6 * I * $ * (R[0] - q[0]) + 3 * $ ** 2 * (b[0] - R[0]), x = 3 * I ** 2 * (q[1] - o[1]) + 6 * I * $ * (R[1] - q[1]) + 3 * $ ** 2 * (b[1] - R[1]);
    }
    const W = Math.hypot(B, x);
    if (!W) return [P, E - 13 * n];
    let K = -x / W, V = B / W;
    return (V > 0 || V === 0 && K < 0) && (K = -K, V = -V), [P + K * 13 * n, E + V * 13 * n];
  }
  const u = (e.rotation || 0) * Math.PI / 180, d = e.shape === "circle" ? s.height / 2 : (Math.abs(Math.sin(u)) * s.width + Math.abs(Math.cos(u)) * s.height) / 2;
  return [t[0], t[1] + d + 13 * n];
}
function ua(e) {
  let n = 2166136261;
  for (const s of e) n = Math.imul(n ^ s.charCodeAt(0), 16777619);
  return n >>> 0;
}
function da(e) {
  const n = e.filter((t) => t.category === "terrain" && t.material === "forest" && ue(t) && !We(t)).sort((t, u) => t.id < u.id ? -1 : t.id > u.id ? 1 : 0), s = /* @__PURE__ */ new Map();
  for (let t = 0; t < n.length; t += 1) {
    const u = n[t], d = ae(u), p = Math.floor(256 / n.length) + (t < 256 % n.length ? 1 : 0), i = d.width && d.height ? Math.min(p, Math.max(1, Math.ceil(d.width * d.height / 2704))) : 0, v = Math.min(i, Math.max(1, Math.ceil(Math.sqrt(i * d.width / Math.max(1, d.height))))), h = Math.ceil(i / Math.max(1, v));
    let l = ua(u.id);
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
var va = [
  "x",
  "y",
  "width",
  "height"
], pa = {
  key: 0,
  cx: "50",
  cy: "50",
  r: "50"
}, ha = {
  key: 1,
  width: "100",
  height: "100"
}, fa = ["clip-path", "fill"], ya = {
  key: 0,
  cx: "50",
  cy: "50",
  r: "49",
  class: "scene-object-edge"
}, ma = {
  key: 1,
  x: "1",
  y: "1",
  width: "98",
  height: "98",
  rx: "2",
  class: "scene-object-edge"
}, ba = ["fill"], ga = ["fill"], ka = ["d"], wa = {
  key: 0,
  d: "M9 78H91",
  class: "scene-object-seam"
}, Ma = ["x"], $a = /* @__PURE__ */ G({
  __name: "SceneObject",
  props: {
    element: {},
    prefix: {},
    unitScale: {}
  },
  setup(e) {
    const n = e, s = j(() => ae(n.element)), t = j(() => Math.min(s.value.width, s.value.height) / n.unitScale >= 12), u = j(() => n.element.shape === "circle"), d = j(() => n.element.material), p = j(() => At(d.value, n.prefix)), i = j(() => Ue(d.value, n.prefix)), v = `scene-object-${fe()}`;
    return (h, l) => (r(), c("svg", {
      x: s.value.x,
      y: s.value.y,
      width: s.value.width,
      height: s.value.height,
      viewBox: "0 0 100 100",
      preserveAspectRatio: "none",
      class: "scene-object"
    }, [a("defs", null, [a("clipPath", { id: v }, [u.value ? (r(), c("circle", pa)) : (r(), c("rect", ha))])]), a("g", {
      "clip-path": `url(#${v})`,
      fill: p.value
    }, [u.value ? (r(), c("circle", ya)) : (r(), c("rect", ma)), t.value ? (r(), c(C, { key: 2 }, [u.value ? (r(), c("circle", {
      key: 0,
      cx: "50",
      cy: "50",
      r: "44",
      fill: i.value,
      class: "scene-object-inset"
    }, null, 8, ba)) : (r(), c("rect", {
      key: 1,
      x: "5",
      y: "5",
      width: "90",
      height: "90",
      rx: "2",
      fill: i.value,
      class: "scene-object-inset"
    }, null, 8, ga)), e.element.icon === "table" || e.element.icon === "counter" ? (r(), c(C, { key: 2 }, [a("path", {
      d: u.value ? "M18 36A35 35 0 0 1 72 22" : "M8 13V8H92",
      class: "scene-object-shine"
    }, null, 8, ka), e.element.icon === "counter" ? (r(), c("path", wa)) : k("", !0)], 64)) : e.element.icon === "chair" ? (r(), c(C, { key: 3 }, [
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
    ], 64)) : e.element.icon === "bed" ? (r(), c(C, { key: 4 }, [
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
    ], 64)) : e.element.icon === "shelf" ? (r(), c(C, { key: 5 }, [l[7] || (l[7] = a("path", {
      d: "M8 32H92M8 66H92M40 8V32M65 32V66M35 66V92",
      class: "scene-object-seam"
    }, null, -1)), l[8] || (l[8] = a("path", {
      d: "M8 34H92M8 68H92",
      class: "scene-object-shine"
    }, null, -1))], 64)) : e.element.icon === "sofa" ? (r(), c(C, { key: 6 }, [
      l[9] || (l[9] = a("rect", {
        x: "8",
        y: "5",
        width: "84",
        height: "25",
        rx: "7",
        class: "scene-object-inset"
      }, null, -1)),
      (r(), c(C, null, N(3, (f) => a("rect", {
        key: f,
        x: 15 + (f - 1) * 24,
        y: "32",
        width: "22",
        height: "57",
        rx: "5",
        class: "scene-object-inset"
      }, null, 8, Ma)), 64)),
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
    ], 64)) : e.element.icon === "bridge" ? (r(), c(C, { key: 7 }, [l[12] || (l[12] = a("path", {
      d: "M7 7V93M93 7V93M9 20H91M9 35H91M9 50H91M9 65H91M9 80H91",
      class: "scene-object-seam"
    }, null, -1)), l[13] || (l[13] = a("path", {
      d: "M11 7V93M89 7V93",
      class: "scene-object-shine"
    }, null, -1))], 64)) : e.element.icon === "tree" ? (r(), c(C, { key: 8 }, [l[14] || (l[14] = Xe('<circle cx="34" cy="32" r="24" class="scene-object-inset"></circle><circle cx="69" cy="36" r="24" class="scene-object-inset"></circle><circle cx="30" cy="62" r="23" class="scene-object-inset"></circle><circle cx="64" cy="67" r="25" class="scene-object-inset"></circle><circle cx="49" cy="48" r="26" class="scene-object-inset"></circle><path d="M21 24q10-10 22-4M36 41q8-9 22-6M64 56q8-1 13 5" class="scene-object-shine"></path>', 6))], 64)) : e.element.icon === "rock" ? (r(), c(C, { key: 9 }, [l[15] || (l[15] = a("path", {
      d: "M8 38 33 12 76 18 93 57 71 88 25 86ZM33 12 41 44 8 38M41 44 76 18M41 44 71 88M41 44 93 57",
      class: "scene-object-seam"
    }, null, -1)), l[16] || (l[16] = a("path", {
      d: "M12 38 33 17 72 22",
      class: "scene-object-shine"
    }, null, -1))], 64)) : k("", !0)], 64)) : k("", !0)], 8, fa)], 8, va));
  }
}), _a = $a, Re = {
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
}, xa = Object.freeze({
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
}), Ca = Object.freeze({
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
}), Sa = Object.freeze({
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
}), La = Object.freeze({
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
}), Ea = Object.freeze({
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
}), Ee = Object.freeze({
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
}), De = Object.freeze({
  world: "世界",
  region: me.world.unit,
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
function Pa(e, n) {
  return e < n ? -1 : e > n ? 1 : 0;
}
function Ba(e, n) {
  const s = xa[e.category], t = ue(e), u = t && (e.material || e.category === "water") ? Ue(e.material || "water", n) : "", d = e.certainty === "inferred" ? "8 6" : e.certainty === "unknown" ? "3 7" : s.dash;
  return {
    ...s,
    fill: t ? u || s.fill : "none",
    opacity: e.certainty === "unknown" ? 0.48 : e.certainty === "inferred" ? 0.72 : 1,
    dash: d,
    icon: e.icon ? ja[e.icon] : e.kind ? Sa[e.kind] : Ea[e.category],
    fallback: e.kind ? La[e.kind] : e.icon && Object.hasOwn(Re, e.icon) ? Re[e.icon] : Ca[e.category].slice(0, 1),
    z: Ee[e.category]
  };
}
function Ia(e) {
  const n = (s) => {
    if (!ue(s)) return 0;
    const t = ae(s);
    return t.width * t.height;
  };
  return [...e].sort((s, t) => Ee[s.category] - Ee[t.category] || n(t) - n(s) || Pa(s.id, t.id));
}
var Ta = {
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
}, Ra = {
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
  if (!e) return Ta;
  const n = Ra[e.space][e.natural];
  return e.artificial === "off" ? {
    ...n,
    lampEmission: 0
  } : {
    ...n,
    lampEmission: 1.2
  };
}
function Ge(e) {
  return { "--scene-glow": Oa[e.mood || "neutral"].glow };
}
function Fe(e) {
  if (!e) return;
  const [n, s, t] = e;
  return `${n} 0 0 0 0  0 ${s} 0 0 0  0 0 ${t} 0 0  0 0 0 1 0`;
}
function za(e) {
  return Fe(Ha(e).surface);
}
var He = [
  -1,
  0.95,
  -0.6
], Le = {
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
  const n = e.elements.filter((v) => v.category === "terrain" && ue(v)).map(ae).sort((v, h) => h.width * h.height - v.width * v.height)[0], [s, t, u, d] = n ? [
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
      ...v.material === "cold-light" ? Le.cold : Le.warm
    };
  }) : [{
    id: "overhead",
    x: s + u / 2,
    y: t + d / 2,
    radius: Math.max(u, d) * 0.58,
    overhead: !0,
    ...Le.warm
  }];
}
var Ka = { key: 0 }, Va = ["id"], qa = ["values"], Ua = ["id"], Wa = ["d", "transform"], Da = [
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
], Fa = [
  "cx",
  "cy",
  "r",
  "fill"
], Za = ["id"], Qa = ["values"], Ya = ["filter"], Xa = ["id"], Ja = ["data-element", "opacity"], en = ["clip-path"], tn = ["d", "transform"], an = ["transform"], nn = ["d"], on = ["d", "stroke-width"], ln = [
  "d",
  "fill",
  "stroke",
  "stroke-width",
  "stroke-dasharray",
  "stroke-linecap"
], sn = [
  "d",
  "stroke",
  "stroke-opacity",
  "stroke-dasharray"
], rn = ["transform"], cn = ["id"], un = ["d"], dn = ["clip-path"], vn = [
  "href",
  "x",
  "y",
  "width",
  "height"
], pn = ["mask"], hn = ["href", "filter"], fn = ["opacity", "transform"], yn = {
  key: 0,
  r: "19",
  class: "scene-player-halo"
}, mn = ["stroke"], bn = {
  key: 1,
  class: "map-material-symbol",
  "aria-hidden": "true"
}, gn = {
  key: 2,
  class: "map-symbol-fallback",
  "aria-hidden": "true"
}, kn = ["x", "y"], wn = /* @__PURE__ */ G({
  __name: "MapScene",
  props: { scene: {} },
  setup(e) {
    const n = e, s = H(!1);
    _e(() => {
      Ve().then(() => {
        s.value = !0;
      }).catch(() => {
        s.value = !1;
      });
    });
    const t = `xiaobai-map-scene-${fe()}`, u = j(() => za(n.scene.lighting)), d = j(() => Na(n.scene)), p = j(() => {
      if (n.scene.lighting?.natural !== "sunlight") return;
      const h = Math.max(n.scene.viewBox[2], n.scene.viewBox[3]) / 14;
      return `translate(${-He[0] * h * 0.45} ${-He[2] * h * 0.45})`;
    }), i = j(() => da(n.scene.elements)), v = j(() => Ia(n.scene.elements).map((h, l) => ({
      element: h,
      bounds: ae(h),
      path: ia(h),
      transform: ca(h),
      area: ue(h),
      presentation: Ba(h, t),
      clipId: `${t}-area-${l}`,
      object: We(h) && !je(h),
      marker: je(h) && h.shape !== "label"
    })));
    return (h, l) => (r(), Z(Ne, {
      class: "map-scene-viewport",
      style: ke(y(Ge)(e.scene)),
      "view-box": e.scene.viewBox,
      "reset-key": e.scene.key,
      label: `${e.scene.name} 场景地图`
    }, {
      default: Pe(({ unitScale: f }) => [
        L(na, { prefix: t }),
        u.value ? (r(), c("defs", Ka, [a("filter", {
          id: `${t}-lighting`,
          x: "-10%",
          y: "-10%",
          width: "120%",
          height: "120%",
          "color-interpolation-filters": "sRGB"
        }, [a("feColorMatrix", {
          type: "matrix",
          values: u.value
        }, null, 8, qa)], 8, Va)])) : k("", !0),
        a("defs", null, [a("clipPath", { id: `${t}-surfaces` }, [(r(!0), c(C, null, N(v.value, (o) => (r(), c(C, { key: o.element.id }, [o.element.category === "terrain" && o.area ? (r(), c("path", {
          key: 0,
          d: o.path,
          transform: o.transform
        }, null, 8, Wa)) : k("", !0)], 64))), 128))], 8, Ua), (r(!0), c(C, null, N(d.value, (o, b) => (r(), c(C, { key: o.id }, [
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
          ])], 8, Da),
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
          }, null, 8, Fa)], 8, Ga),
          a("filter", {
            id: `${t}-lamp-${b}`,
            "color-interpolation-filters": "sRGB"
          }, [a("feColorMatrix", {
            type: "matrix",
            values: y(Fe)(o.surface)
          }, null, 8, Qa)], 8, Za)
        ], 64))), 128))]),
        a("g", { filter: u.value ? `url(#${t}-lighting)` : void 0 }, [a("g", { id: `${t}-artwork` }, [(r(!0), c(C, null, N(v.value, (o) => (r(), c("g", {
          key: o.element.id,
          class: Y(["map-scene-element", [`is-${o.element.category}`, `is-${o.element.certainty || "confirmed"}`]]),
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
        }, null, 8, tn)], 8, en)) : k("", !0), a("g", { transform: o.transform }, [
          o.object ? (r(), Z(_a, {
            key: 0,
            element: o.element,
            prefix: t,
            "unit-scale": f
          }, null, 8, ["element", "unit-scale"])) : o.path ? (r(), c(C, { key: 1 }, [
            o.element.category === "wall" ? (r(), c("path", {
              key: 0,
              d: o.path,
              fill: "none",
              stroke: "var(--scene-shadow)",
              "stroke-width": "9",
              opacity: ".18",
              "stroke-linejoin": "round",
              "vector-effect": "non-scaling-stroke"
            }, null, 8, nn)) : k("", !0),
            o.element.category === "road" && !o.area ? (r(), c("path", {
              key: 1,
              d: o.path,
              fill: "none",
              stroke: "var(--scene-soft-edge)",
              "stroke-width": o.presentation.width + 2,
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "vector-effect": "non-scaling-stroke"
            }, null, 8, on)) : k("", !0),
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
            }, null, 8, ln),
            o.element.category === "wall" ? (r(), c("path", {
              key: 2,
              d: o.path,
              fill: "none",
              stroke: o.element.material ? y(pe)(o.element.material) : "var(--scene-wall)",
              "stroke-width": "3.5",
              "stroke-opacity": o.element.material === "glass" ? 0.4 : 1,
              "stroke-dasharray": o.presentation.dash,
              "stroke-linejoin": "round",
              "vector-effect": "non-scaling-stroke"
            }, null, 8, sn)) : k("", !0)
          ], 64)) : k("", !0),
          o.object && !y(ra)(o.element) && Math.min(o.bounds.width, o.bounds.height) / f >= 12 ? (r(), c("g", {
            key: 2,
            transform: `translate(${o.bounds.x + o.bounds.width / 2} ${o.bounds.y + o.bounds.height / 2})`,
            "aria-hidden": "true"
          }, [a("text", {
            class: Y(s.value ? "map-material-symbol" : "map-symbol-fallback"),
            style: ke({
              fontSize: `${Math.min(22 * f, Math.min(o.bounds.width, o.bounds.height) * 0.65)}px`,
              fill: "var(--scene-edge)",
              textAnchor: "middle",
              dominantBaseline: "central"
            })
          }, m(s.value ? o.presentation.icon : o.presentation.fallback), 7)], 8, rn)) : k("", !0),
          i.value.has(o.element.id) ? (r(), c(C, { key: 3 }, [a("defs", null, [a("clipPath", { id: o.clipId }, [a("path", {
            d: o.path,
            "clip-rule": "evenodd"
          }, null, 8, un)], 8, cn)]), a("g", {
            "clip-path": `url(#${o.clipId})`,
            class: "scene-forest-decoration",
            "aria-hidden": "true"
          }, [(r(!0), c(C, null, N(i.value.get(o.element.id), (b, $) => (r(), c("use", {
            key: $,
            href: `#${t}-crown-${b.variant}`,
            x: b.x - b.size / 2,
            y: b.y - b.size / 2,
            width: b.size,
            height: b.size
          }, null, 8, vn))), 128))], 8, dn)], 64)) : k("", !0)
        ], 8, an)], 10, Ja))), 128))], 8, Xa)], 8, Ya),
        (r(!0), c(C, null, N(d.value, (o, b) => (r(), c("g", {
          key: o.id,
          mask: `url(#${t}-mask-${b})`,
          "aria-hidden": "true"
        }, [a("use", {
          href: `#${t}-artwork`,
          filter: `url(#${t}-lamp-${b})`
        }, null, 8, hn)], 8, pn))), 128)),
        (r(!0), c(C, null, N(v.value, (o) => (r(), c(C, { key: o.element.id }, [o.marker ? (r(), c("g", {
          key: 0,
          class: Y(["map-scene-icon", `is-${o.element.category}`]),
          opacity: o.presentation.opacity,
          transform: `translate(${o.bounds.x + o.bounds.width / 2} ${o.bounds.y + o.bounds.height / 2}) scale(${f})`
        }, [
          o.element.actorKey === "player" || o.element.kind === "player" ? (r(), c("circle", yn)) : k("", !0),
          a("circle", {
            r: "11",
            stroke: o.presentation.stroke
          }, null, 8, mn),
          s.value ? (r(), c("text", bn, m(o.presentation.icon), 1)) : (r(), c("text", gn, m(o.presentation.fallback), 1))
        ], 10, fn)) : k("", !0)], 64))), 128)),
        a("g", {
          class: "scene-labels",
          style: ke({ "--scene-unit-scale": f })
        }, [(r(!0), c(C, null, N(v.value, (o) => (r(), c(C, { key: o.element.id }, [o.element.label ? (r(), c("text", {
          key: 0,
          class: Y(["map-scene-label", { "is-primary": o.element.shape === "label" }]),
          x: y(Te)(o.element, f)[0],
          y: y(Te)(o.element, f)[1]
        }, m(o.element.label), 11, kn)) : k("", !0)], 64))), 128))], 4)
      ]),
      _: 1
    }, 8, [
      "style",
      "view-box",
      "reset-key",
      "label"
    ]));
  }
}), Mn = wn, $n = {
  key: 0,
  class: "map-3d-loading",
  role: "status"
}, _n = {
  class: "map-viewport-controls",
  "aria-label": "三维视角"
}, xn = /* @__PURE__ */ G({
  __name: "MapScene3D",
  props: {
    scene: {},
    lowWalls: { type: Boolean },
    showLabels: { type: Boolean }
  },
  emits: ["fallback"],
  setup(e, { emit: n }) {
    const s = e, t = n, u = H(null), d = H(null), p = H(!0);
    let i, v, h, l = !1;
    function f() {
      h?.disconnect(), h = void 0, document.removeEventListener("visibilitychange", b);
    }
    function o() {
      f(), l && t("fallback", "当前设备无法打开三维，已切换二维。");
    }
    function b() {
      const $ = u.value;
      if (!l || !v || i || document.hidden || !$?.isConnected) return;
      const P = $.getBoundingClientRect();
      if (!(!P.width || !P.height)) {
        f();
        try {
          i = v($, d.value, { fallback: (E) => t("fallback", E) }), i.setScene(s.scene), i.walls(s.lowWalls), i.labels(s.showLabels), p.value = !1, Ve().then(() => {
            l && i?.symbols(!0);
          }).catch(() => {
          });
        } catch {
          o();
        }
      }
    }
    return _e(async () => {
      l = !0;
      try {
        if (v = (await import("./xiaobai-os-three-runtime-gRcOKkju.js")).createThreeRuntime, !l) return;
        h = new ResizeObserver(b), h.observe(u.value), document.addEventListener("visibilitychange", b), b();
      } catch {
        o();
      }
    }), ee(() => s.scene, ($) => i?.setScene($)), ee(() => s.lowWalls, ($) => i?.walls($)), ee(() => s.showLabels, ($) => i?.labels($)), Oe(() => {
      l = !1, f(), i?.dispose(), i = void 0;
    }), ($, P) => (r(), c("div", {
      ref_key: "host",
      ref: u,
      class: "map-scene-three",
      style: ke(y(Ge)(e.scene))
    }, [
      a("div", {
        ref_key: "labelHost",
        ref: d,
        class: "map-3d-labels"
      }, null, 512),
      p.value ? (r(), c("div", $n, "正在打开三维…")) : k("", !0),
      a("div", _n, [
        a("button", {
          type: "button",
          "aria-label": "放大三维",
          onClick: P[0] || (P[0] = (E) => y(i)?.zoom(1.2))
        }, "+"),
        a("button", {
          type: "button",
          "aria-label": "缩小三维",
          onClick: P[1] || (P[1] = (E) => y(i)?.zoom(1 / 1.2))
        }, "−"),
        a("button", {
          type: "button",
          class: "map-fit",
          "aria-label": "重置三维视角",
          onClick: P[2] || (P[2] = (E) => y(i)?.fit())
        }, "全图")
      ])
    ], 4));
  }
}), Cn = xn, Sn = ["aria-label"], Ln = {
  key: 0,
  class: "map-scene-toolbar"
}, jn = ["aria-label"], En = ["aria-pressed"], On = ["aria-pressed", "disabled"], An = ["aria-pressed"], Pn = ["aria-pressed"], Bn = { class: "map-scene-stage" }, In = /* @__PURE__ */ G({
  __name: "MapSceneView",
  props: /* @__PURE__ */ Me({
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
  emits: /* @__PURE__ */ Me(["update:mode", "fallback"], ["update:lowWalls", "update:showLabels"]),
  setup(e, { emit: n }) {
    const s = n, t = he(e, "lowWalls"), u = he(e, "showLabels");
    return (d, p) => (r(), c("section", {
      class: "map-scene-view",
      "aria-label": e.scene.name
    }, [e.compact ? k("", !0) : (r(), c("div", Ln, [
      a("div", {
        class: "map-render-switch",
        role: "group",
        "aria-label": y(Q).mode
      }, [a("button", {
        type: "button",
        "aria-pressed": e.mode === "2d",
        onClick: p[0] || (p[0] = (i) => s("update:mode", "2d"))
      }, m(y(Q).two), 9, En), a("button", {
        type: "button",
        "aria-pressed": e.mode === "3d",
        disabled: e.threeUnavailable,
        onClick: p[1] || (p[1] = (i) => s("update:mode", "3d"))
      }, m(y(Q).three), 9, On)], 8, jn),
      e.mode === "3d" ? (r(), c("button", {
        key: 0,
        type: "button",
        "aria-pressed": t.value,
        onClick: p[2] || (p[2] = (i) => t.value = !t.value)
      }, m(y(Q).lowWalls), 9, An)) : k("", !0),
      e.mode === "3d" ? (r(), c("button", {
        key: 1,
        type: "button",
        "aria-pressed": u.value,
        onClick: p[3] || (p[3] = (i) => u.value = !u.value)
      }, m(y(Q).labels), 9, Pn)) : k("", !0)
    ])), a("div", Bn, [Ae(L(Mn, { scene: e.scene }, null, 8, ["scene"]), [[ze, e.mode === "2d"]]), e.mode === "3d" ? (r(), Z(Cn, {
      key: 0,
      scene: e.scene,
      "low-walls": t.value,
      "show-labels": u.value,
      onFallback: p[4] || (p[4] = (i) => s("fallback", i))
    }, null, 8, [
      "scene",
      "low-walls",
      "show-labels"
    ])) : k("", !0)])], 8, Sn));
  }
}), Tn = In, Rn = { class: "map-legend-content" }, Hn = /* @__PURE__ */ G({
  __name: "MapLegend",
  setup(e) {
    return (n, s) => (r(), c("div", Rn, [
      a("strong", null, m(y(T).legendTitle), 1),
      a("p", null, [
        s[0] || (s[0] = a("i", { class: "map-key-current" }, null, -1)),
        D(m(y(T).legendCurrent) + " ", 1),
        s[1] || (s[1] = a("i", { class: "map-key-place" }, null, -1)),
        D(m(y(T).legendPlace), 1)
      ]),
      a("p", null, m(y(T).legendRoutes), 1),
      a("small", null, m(y(T).legend), 1)
    ]));
  }
}), Ze = Hn, zn = ["aria-label"], Nn = [
  "aria-label",
  "aria-pressed",
  "onClick"
], Kn = ["aria-label", "aria-expanded"], Vn = ["aria-label"], qn = {
  key: 0,
  class: "map-projection-scene-options"
}, Un = ["aria-label"], Wn = ["aria-pressed"], Dn = ["aria-pressed", "disabled"], Gn = {
  key: 0,
  class: "map-projection-toggles"
}, Fn = ["aria-pressed"], Zn = ["aria-pressed"], Qn = ["disabled"], Yn = ["aria-expanded"], Xn = /* @__PURE__ */ G({
  __name: "MapProjectionControls",
  props: /* @__PURE__ */ Me({
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
  emits: /* @__PURE__ */ Me(["navigate", "locate"], [
    "update:mode",
    "update:lowWalls",
    "update:showLabels"
  ]),
  setup(e, { emit: n }) {
    const s = e, t = n, u = he(e, "mode"), d = he(e, "lowWalls"), p = he(e, "showLabels"), i = H(!1), v = H(!1), h = H(null), l = H(null), f = `map-projection-options-${fe()}`;
    function o() {
      i.value = !1, v.value = !1;
    }
    function b(P) {
      (!h.value || !P.composedPath().includes(h.value)) && o();
    }
    function $(P) {
      P.key !== "Escape" || !i.value || (P.preventDefault(), P.stopPropagation(), o(), l.value?.focus({ preventScroll: !0 }));
    }
    return ee(() => s.view, o), _e(() => document.addEventListener("pointerdown", b, !0)), Oe(() => document.removeEventListener("pointerdown", b, !0)), (P, E) => (r(), c("div", {
      ref_key: "root",
      ref: h,
      class: "map-projection-controls",
      onKeydown: $
    }, [
      a("nav", {
        class: "map-projection-tabs",
        "aria-label": y(T).viewLabel
      }, [(r(!0), c(C, null, N(y(ve).views, (B, x) => (r(), c("button", {
        key: x,
        type: "button",
        "aria-label": y(J)[x],
        "aria-pressed": e.view === x,
        onClick: (W) => {
          o(), t("navigate", x);
        }
      }, m(B), 9, Nn))), 128))], 8, zn),
      a("button", {
        ref_key: "trigger",
        ref: l,
        type: "button",
        class: "map-projection-options-button",
        "aria-label": y(ve).options,
        "aria-expanded": i.value,
        "aria-controls": f,
        onClick: E[0] || (E[0] = (B) => i.value ? o() : i.value = !0)
      }, [L(A, { name: "more" })], 8, Kn),
      i.value ? (r(), c("section", {
        key: 0,
        id: f,
        class: "map-projection-options",
        "aria-label": y(ve).options
      }, [
        e.view === "scene" && e.sceneAvailable ? (r(), c("div", qn, [a("div", {
          class: "map-render-switch",
          role: "group",
          "aria-label": y(Q).mode
        }, [a("button", {
          type: "button",
          "aria-pressed": u.value === "2d",
          onClick: E[1] || (E[1] = (B) => u.value = "2d")
        }, m(y(Q).two), 9, Wn), a("button", {
          type: "button",
          "aria-pressed": u.value === "3d",
          disabled: e.threeUnavailable,
          onClick: E[2] || (E[2] = (B) => u.value = "3d")
        }, m(y(Q).three), 9, Dn)], 8, Un), u.value === "3d" ? (r(), c("div", Gn, [a("button", {
          type: "button",
          "aria-pressed": d.value,
          onClick: E[3] || (E[3] = (B) => d.value = !d.value)
        }, m(y(Q).lowWalls), 9, Fn), a("button", {
          type: "button",
          "aria-pressed": p.value,
          onClick: E[4] || (E[4] = (B) => p.value = !p.value)
        }, m(y(Q).labels), 9, Zn)])) : k("", !0)])) : k("", !0),
        a("button", {
          type: "button",
          disabled: !e.located,
          onClick: E[5] || (E[5] = (B) => {
            t("locate"), o();
          })
        }, [L(A, { name: "locate" }), D(m(y(ve).location), 1)], 8, Qn),
        a("button", {
          type: "button",
          "aria-expanded": v.value,
          onClick: E[6] || (E[6] = (B) => v.value = !v.value)
        }, [L(A, { name: "layers" }), D(m(y(T).legendLabel), 1)], 8, Yn),
        v.value ? (r(), Z(Ze, { key: 1 })) : k("", !0)
      ], 8, Vn)) : k("", !0)
    ], 544));
  }
}), Jn = Xn;
function eo(e) {
  const n = e?.atlas.actors.find((t) => t.actorKey === "player"), s = e?.atlas.locations.find((t) => t.key === n?.locationKey);
  return s?.sceneKey && e?.scenes[s.sceneKey]?.status === "active" ? "scene" : "world";
}
function to(e, n) {
  const s = n === null ? void 0 : e.locations.find((i) => i.key === n && te(i)), t = dt(e), u = (n === null ? e.locations.filter(te) : s ? e.locations.filter((i) => ut(i) && we(e, i.key)?.key === s.key) : []).map((i) => t.has(i.key) ? {
    ...i,
    status: "visited"
  } : i), d = n === null ? u.filter((i) => !ye(e, i.key).slice(0, -1).some(te)) : [], p = new Set(d.map((i) => i.parent || ""));
  return {
    kind: n === null ? "world" : "region",
    region: s,
    locations: u,
    unvisited: u.filter((i) => i.status !== "visited").length,
    positionParent: s ? s.key : p.size === 1 ? [...p][0] : null
  };
}
function ao(e, n, s) {
  const t = n.trim().toLocaleLowerCase();
  return e.locations.filter((u) => [u.name, u.brief].some((d) => d?.toLocaleLowerCase().includes(t)) && (s === "all" || (s === "visited" ? u.status === "visited" : u.status !== "visited")));
}
var no = { class: "map-search-input" }, oo = ["aria-label", "placeholder"], lo = { class: "map-search-scope" }, so = ["aria-label"], ro = ["aria-pressed", "onClick"], io = { class: "map-search-results" }, co = ["onClick"], uo = { class: "map-result-icon" }, vo = { key: 0 }, po = {
  key: 0,
  class: "map-search-empty"
}, ho = /* @__PURE__ */ G({
  __name: "MapSearch",
  props: {
    scope: {},
    title: {},
    initialFilter: {}
  },
  emits: ["close", "select"],
  setup(e) {
    const n = e, s = H(""), t = H(n.initialFilter), u = j(() => me[n.scope.kind]), d = j(() => [
      {
        id: "all",
        name: u.value.all
      },
      {
        id: "unvisited",
        name: re.unvisited
      },
      {
        id: "visited",
        name: re.visited
      }
    ]), p = j(() => ao(n.scope, s.value, t.value));
    return (i, v) => (r(), Z(tt, {
      class: "map-dialog map-search-dialog",
      "aria-label": u.value.search,
      onClose: v[2] || (v[2] = (h) => i.$emit("close"))
    }, {
      default: Pe(() => [
        a("header", no, [
          L(A, { name: "search" }),
          Ae(a("input", {
            "onUpdate:modelValue": v[0] || (v[0] = (h) => s.value = h),
            type: "search",
            "aria-label": u.value.search,
            placeholder: u.value.search,
            autofocus: ""
          }, null, 8, oo), [[et, s.value]]),
          a("button", {
            type: "button",
            onClick: v[1] || (v[1] = (h) => i.$emit("close"))
          }, m(y(T).cancel), 1)
        ]),
        a("h2", lo, m(e.title), 1),
        a("nav", {
          class: "map-search-filters",
          "aria-label": y(T).filters
        }, [(r(!0), c(C, null, N(d.value, (h) => (r(), c("button", {
          key: h.id,
          type: "button",
          "aria-pressed": t.value === h.id,
          onClick: (l) => t.value = h.id
        }, m(h.name), 9, ro))), 128))], 8, so),
        a("div", io, [
          a("small", null, m(y(Ke)(e.scope.kind, p.value.length)), 1),
          (r(!0), c(C, null, N(p.value, (h) => (r(), c("button", {
            key: h.key,
            type: "button",
            class: "map-search-result",
            onClick: (l) => i.$emit("select", h.key)
          }, [
            a("span", uo, [L(A, { name: e.scope.kind === "world" ? "globe" : "pin" }, null, 8, ["name"])]),
            a("span", null, [
              a("strong", null, m(h.name), 1),
              a("small", null, m(y(De)[h.scale]) + " · " + m(y(re)[h.status === "visited" ? "visited" : "unvisited"]), 1),
              h.brief ? (r(), c("p", vo, m(h.brief), 1)) : k("", !0)
            ]),
            L(A, { name: "next" })
          ], 8, co))), 128)),
          p.value.length ? k("", !0) : (r(), c("div", po, [
            L(A, { name: "search" }),
            a("h3", null, m(u.value.notFound), 1),
            a("p", null, m(y(T).searchHint), 1)
          ]))
        ])
      ]),
      _: 1
    }, 8, ["aria-label"]));
  }
}), fo = ho, yo = {
  class: "map-place-detail",
  "aria-labelledby": "map-place-title"
}, mo = { id: "map-place-title" }, bo = { class: "map-place-content" }, go = {
  key: 0,
  class: "map-place-full-name"
}, ko = {
  key: 1,
  class: "map-address"
}, wo = { class: "map-place-intro" }, Mo = { class: "map-place-actions" }, $o = {
  key: 2,
  class: "map-detail-section"
}, _o = { class: "map-people" }, xo = {
  key: 3,
  class: "map-detail-section"
}, Co = ["onClick"], So = /* @__PURE__ */ G({
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
    const n = e, s = j(() => ye(n.map.atlas, n.location.key).slice(0, -1)), t = j(() => te(n.location)), u = j(() => n.map.atlas.actors.filter((p) => p.locationKey === n.location.key)), d = j(() => vt(n.map.atlas, n.location.key));
    return (p, i) => (r(), c("section", yo, [
      i[6] || (i[6] = a("div", {
        class: "map-sheet-grip",
        "aria-hidden": "true"
      }, null, -1)),
      a("header", null, [a("div", null, [a("small", null, m(y(De)[e.location.scale]) + " · " + m(e.currentKey === e.location.key ? "当前位置" : y(re)[e.location.status === "visited" ? "visited" : "unvisited"]), 1), a("h2", mo, m(e.location.name), 1)]), a("button", {
        type: "button",
        class: "map-round-button",
        "aria-label": "关闭地点详情",
        onClick: i[0] || (i[0] = (v) => p.$emit("close"))
      }, [L(A, { name: "close" })])]),
      a("div", bo, [
        e.location.name.length > 24 ? (r(), c("p", go, m(e.location.name), 1)) : k("", !0),
        s.value.length ? (r(), c("p", ko, [L(A, { name: "pin" }), D(m(s.value.map((v) => v.name).join(" · ")), 1)])) : k("", !0),
        a("p", wo, m(e.location.brief || "这个地点已记录在世界地图上，更多介绍等待故事展开。"), 1),
        a("div", Mo, [t.value ? (r(), c("button", {
          key: 0,
          type: "button",
          class: "map-primary-button",
          onClick: i[1] || (i[1] = (v) => p.$emit("explore"))
        }, [L(A, { name: "compass" }), D(m(y(T).regionMap), 1)])) : (r(), c("button", {
          key: 1,
          type: "button",
          class: "map-secondary-button",
          onClick: i[2] || (i[2] = (v) => p.$emit("scene"))
        }, [L(A, { name: "layers" }), D(m(y(T).sceneMap), 1)]))]),
        u.value.length ? (r(), c("section", $o, [i[3] || (i[3] = a("h3", null, "记录在这里的人物", -1)), a("p", _o, [(r(!0), c(C, null, N(u.value, (v) => (r(), c("span", { key: v.actorKey }, [L(A, { name: "person" }), D(m(v.displayName), 1)]))), 128))])])) : k("", !0),
        d.value.length ? (r(), c("section", xo, [i[4] || (i[4] = a("h3", null, "相连的地方", -1)), (r(!0), c(C, null, N(d.value, (v) => (r(), c("button", {
          key: v.link.id,
          type: "button",
          class: "map-connection",
          onClick: (h) => p.$emit("select", v.location.key)
        }, [
          L(A, { name: "route" }),
          a("span", null, [a("strong", null, m(v.location.name), 1), a("small", null, m(v.link.label || y(Aa)[v.link.kind]) + m(v.link.bidirectional ? "" : v.outgoing ? " · 单向前往" : " · 仅可从对面到达"), 1)]),
          L(A, { name: "next" })
        ], 8, Co))), 128))])) : k("", !0),
        i[5] || (i[5] = a("p", { class: "map-detail-footnote" }, "查看地图不会改变你在故事中的位置", -1))
      ])
    ]));
  }
}), Lo = So, jo = { class: "map-top" }, Eo = { class: "map-search-bar" }, Oo = ["disabled"], Ao = {
  key: 1,
  class: "map-search-entry"
}, Po = {
  key: 0,
  class: "map-view-row"
}, Bo = ["aria-label"], Io = ["aria-pressed"], To = ["aria-pressed"], Ro = ["aria-pressed"], Ho = {
  key: 0,
  class: "map-scene-tools"
}, zo = ["aria-expanded", "aria-label"], No = ["aria-label"], Ko = ["aria-current"], Vo = { "aria-current": "page" }, qo = {
  key: 1,
  class: "map-notice",
  role: "status"
}, Uo = {
  key: 1,
  class: "map-empty"
}, Wo = {
  key: 2,
  class: "map-empty"
}, Do = { class: "map-empty" }, Go = ["disabled"], Fo = ["aria-expanded", "aria-label"], Zo = {
  key: 2,
  class: "map-key"
}, Qo = ["aria-label"], Yo = { class: "map-region-icon" }, Xo = {
  class: "map-round-button",
  "aria-hidden": "true"
}, Jo = {
  key: 5,
  class: "map-scene-caption"
}, el = ["title"], tl = /* @__PURE__ */ G({
  __name: "MapBrowser",
  props: {
    map: {},
    chatIdentity: {},
    compact: { type: Boolean }
  },
  setup(e) {
    const n = e, s = `map-browse-summary-${fe()}`, t = H(""), u = () => eo(n.map) === "scene" ? {
      kind: "scene",
      key: ""
    } : { kind: "world" }, d = H(u()), p = H("3d"), i = H(!1), v = H(!0), h = H(!1), l = H("");
    let f = !1;
    const o = j(() => d.value.kind === "scene"), b = j(() => d.value.kind === "scene" ? d.value.key : ""), $ = H(""), P = H(0), E = H(null), B = H(!1), x = j(() => n.map?.atlas), W = j(() => x.value?.actors.find((_) => _.actorKey === "player")?.locationKey || ""), K = j(() => x.value?.locations.find((_) => _.key === W.value)), V = j(() => x.value?.locations.find((_) => _.key === (b.value || W.value))), q = j(() => o.value && V.value?.sceneKey ? n.map?.scenes[V.value.sceneKey] : void 0), R = j(() => {
      if (!x.value || d.value.kind === "world") return;
      const _ = d.value.key || W.value;
      return we(x.value, _);
    }), I = j(() => to(x.value || {
      locations: [],
      links: [],
      actors: []
    }, d.value.kind === "world" ? null : R.value?.key || "")), F = j(() => I.value.locations.find((_) => _.key === t.value)), X = j(() => I.value.kind === "world" ? J.world : R.value?.name || T.unknownRegion), w = j(() => me[I.value.kind]), S = j(() => I.value.unvisited ? "unvisited" : "all");
    ee(() => ({
      map: n.map,
      chatIdentity: n.chatIdentity
    }), (_, g) => {
      const M = _.chatIdentity !== g.chatIdentity;
      (M || !_.map?.atlas.locations.some((Ce) => Ce.key === t.value)) && (t.value = ""), M && (f = !1);
      const oe = d.value.kind === "world" ? "" : d.value.key, Ye = oe && !_.map?.atlas.locations.some((Ce) => Ce.key === oe);
      (M || !g.map?.atlas.locations.length && _.map?.atlas.locations.length && !f || Ye) && (d.value = u()), M && (E.value = null, B.value = !1);
    }), ee(I, (_, g) => {
      _.locations.some((M) => M.key === t.value) || (t.value = ""), (_.kind !== g.kind || _.region?.key !== g.region?.key || !x.value) && (t.value = "", E.value = null, B.value = !1);
    });
    function O(_) {
      f = !0, d.value = _, t.value = "", E.value = null, B.value = !1;
    }
    function z(_ = "") {
      O({
        kind: "region",
        key: _
      });
    }
    async function U(_, g = !1) {
      const M = x.value?.locations.find((oe) => oe.key === _);
      if (M) {
        if (f = !0, g && x.value) {
          if (te(M)) ce();
          else {
            const oe = we(x.value, _);
            if (!oe) {
              ie(_);
              return;
            }
            z(oe.key);
          }
          await Se();
        }
        t.value = _, E.value = null, B.value = !1, await Se(), $.value = x.value ? $e(x.value, _, I.value.locations) : _, P.value += 1;
      }
    }
    async function ne() {
      if (!(!K.value || !x.value)) {
        if (te(K.value)) {
          await U(K.value.key, !0);
          return;
        }
        if (!we(x.value, K.value.key)) {
          ie();
          return;
        }
        z(), await Se(), await U(K.value.key);
      }
    }
    function ie(_ = "") {
      O({
        kind: "scene",
        key: _ === W.value ? "" : _
      });
    }
    function ce() {
      O({ kind: "world" });
    }
    function Qe(_) {
      h.value || (h.value = !0, p.value = "2d", l.value = _);
    }
    return Je(() => B.value ? (B.value = !1, !0) : o.value ? (z(b.value && R.value?.key || ""), !0) : t.value ? (t.value = "", !0) : d.value.kind === "region" ? (ce(), !0) : !1), (_, g) => (r(), c("main", { class: Y(["map-app", {
      "has-view-switch": x.value?.locations.length,
      "is-scene-view": o.value
    }]) }, [
      e.compact && x.value?.locations.length ? (r(), Z(Jn, {
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
        located: !!K.value,
        onNavigate: g[3] || (g[3] = (M) => O(M === "world" ? { kind: M } : {
          kind: M,
          key: ""
        })),
        onLocate: g[4] || (g[4] = (M) => o.value ? ie() : ne())
      }, null, 8, [
        "mode",
        "low-walls",
        "show-labels",
        "view",
        "scene-available",
        "three-unavailable",
        "located"
      ])) : k("", !0),
      a("div", jo, [
        e.compact ? k("", !0) : (r(), c(C, { key: 0 }, [
          a("header", Eo, [
            L(A, { name: o.value ? "layers" : "search" }, null, 8, ["name"]),
            o.value ? (r(), c("div", Ao, [D(m(V.value?.name || y(J).scene), 1), a("small", null, m(b.value ? y(T).sceneBrowsing : y(T).sceneCurrent), 1)])) : (r(), c("button", {
              key: 0,
              type: "button",
              class: "map-search-entry",
              disabled: !x.value?.locations.length,
              onClick: g[5] || (g[5] = (M) => E.value = "all")
            }, [D(m(w.value.search), 1), a("small", null, m(X.value), 1)], 8, Oo)),
            le(_.$slots, "toolbar")
          ]),
          x.value?.locations.length ? (r(), c("div", Po, [a("nav", {
            class: "map-view-switch",
            "aria-label": y(T).viewLabel
          }, [
            a("button", {
              type: "button",
              "aria-pressed": d.value.kind === "world",
              onClick: ce
            }, [L(A, { name: "globe" }), D(m(y(J).world), 1)], 8, Io),
            a("button", {
              type: "button",
              "aria-pressed": d.value.kind === "region",
              onClick: g[6] || (g[6] = (M) => z())
            }, [L(A, { name: "compass" }), D(m(y(J).region), 1)], 8, To),
            a("button", {
              type: "button",
              "aria-pressed": o.value,
              onClick: g[7] || (g[7] = (M) => ie())
            }, [L(A, { name: "layers" }), D(m(y(J).scene), 1)], 8, Ro)
          ], 8, Bo), o.value ? (r(), c("div", Ho, [b.value ? (r(), c("button", {
            key: 0,
            type: "button",
            class: "map-round-button",
            "aria-label": "回到当前场景",
            onClick: g[8] || (g[8] = (M) => ie())
          }, [L(A, { name: "locate" })])) : k("", !0), a("button", {
            type: "button",
            class: "map-round-button",
            "aria-expanded": B.value,
            "aria-label": y(T).legendLabel,
            onClick: g[9] || (g[9] = (M) => B.value = !B.value)
          }, [L(A, { name: "layers" })], 8, zo)])) : k("", !0)])) : k("", !0),
          x.value?.locations.length && !o.value ? (r(), c("nav", {
            key: 1,
            class: "map-region-trail",
            "aria-label": y(T).trailLabel
          }, [a("button", {
            type: "button",
            "aria-current": d.value.kind === "world" ? "page" : void 0,
            onClick: ce
          }, [L(A, { name: "globe" }), D(m(y(J).world), 1)], 8, Ko), d.value.kind === "region" ? (r(), c(C, { key: 0 }, [L(A, { name: "next" }), a("span", Vo, m(X.value), 1)], 64)) : k("", !0)], 8, No)) : k("", !0)
        ], 64)),
        l.value ? (r(), c("aside", qo, [a("p", null, m(l.value), 1), a("button", {
          type: "button",
          class: "map-notice-close",
          "aria-label": "关闭三维提示",
          onClick: g[10] || (g[10] = (M) => l.value = "")
        }, [L(A, { name: "close" })])])) : k("", !0),
        le(_.$slots, "feedback")
      ]),
      a("div", { class: Y(["map-canvas", { "has-detail": F.value && !o.value }]) }, [e.map && x.value?.locations.length ? (r(), c(C, { key: 0 }, [
        I.value.locations.length ? Ae((r(), Z(Lt, {
          key: 0,
          atlas: e.map.atlas,
          scope: I.value,
          label: X.value,
          "current-location-key": W.value,
          "selected-location-key": t.value,
          "focus-key": $.value,
          "focus-sequence": P.value,
          onSelect: g[11] || (g[11] = (M) => U(M))
        }, null, 8, [
          "atlas",
          "scope",
          "label",
          "current-location-key",
          "selected-location-key",
          "focus-key",
          "focus-sequence"
        ])), [[ze, !o.value]]) : k("", !0),
        o.value ? (r(), c(C, { key: 1 }, [q.value?.status === "active" ? (r(), Z(Tn, {
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
        ])) : (r(), c("div", Uo, [
          L(A, { name: "layers" }),
          a("h2", null, m(V.value ? y(T).sceneEmpty : y(T).unknownLocation), 1),
          b.value && b.value !== W.value ? (r(), c("button", {
            key: 0,
            type: "button",
            class: "map-secondary-button",
            onClick: g[15] || (g[15] = (M) => R.value ? z(R.value.key) : ce())
          }, m(R.value ? y(T).regionMap : y(J).world), 1)) : le(_.$slots, "scene-empty-action", {
            key: 1,
            located: !!V.value
          })
        ]))], 64)) : k("", !0),
        !o.value && !I.value.locations.length ? (r(), c("div", Wo, [
          L(A, { name: "pin" }),
          a("h2", null, m(d.value.kind === "region" && !R.value ? y(T).unknownRegion : w.value.empty), 1),
          a("p", null, m(d.value.kind === "region" && !R.value ? y(T).unknownRegionHint : w.value.emptyHint), 1),
          d.value.kind === "region" ? (r(), c("button", {
            key: 0,
            type: "button",
            class: "map-secondary-button",
            onClick: ce
          }, m(y(J).world), 1)) : le(_.$slots, "scope-empty-action", { key: 1 })
        ])) : k("", !0)
      ], 64)) : le(_.$slots, "empty-map", { key: 1 }, () => [a("div", Do, [L(A, { name: "globe" }), a("h2", null, m(y(ve).empty), 1)])])], 2),
      !e.compact && x.value?.locations.length && !o.value ? (r(), c("div", {
        key: 1,
        class: Y(["map-floating-tools", { "has-detail": F.value }])
      }, [a("button", {
        type: "button",
        class: "map-round-button",
        disabled: !K.value,
        "aria-label": "回到我的位置",
        onClick: ne
      }, [L(A, { name: "locate" })], 8, Go), a("button", {
        type: "button",
        class: "map-round-button",
        "aria-expanded": B.value,
        "aria-label": y(T).legendLabel,
        onClick: g[16] || (g[16] = (M) => B.value = !B.value)
      }, [L(A, { name: "layers" })], 8, Fo)], 2)) : k("", !0),
      B.value ? (r(), c("aside", Zo, [L(Ze)])) : k("", !0),
      F.value && e.map && !o.value ? (r(), Z(Lo, {
        key: F.value.key,
        location: F.value,
        map: e.map,
        "current-key": W.value,
        onClose: g[17] || (g[17] = (M) => t.value = ""),
        onScene: g[18] || (g[18] = (M) => ie(F.value.key)),
        onExplore: g[19] || (g[19] = (M) => z(F.value.key)),
        onSelect: g[20] || (g[20] = (M) => U(M, !0))
      }, null, 8, [
        "location",
        "map",
        "current-key"
      ])) : !e.compact && x.value?.locations.length && !o.value ? (r(), c("button", {
        key: 4,
        type: "button",
        class: "map-region-card",
        "aria-label": y(ft)(I.value.kind, S.value),
        "aria-describedby": s,
        onClick: g[21] || (g[21] = (M) => E.value = S.value)
      }, [
        a("span", Yo, [L(A, { name: I.value.kind === "world" ? "globe" : "compass" }, null, 8, ["name"])]),
        a("span", {
          id: s,
          class: "map-region-summary"
        }, [a("strong", null, m(X.value), 1), a("small", null, m(y(ht)(I.value.kind, I.value.locations.length, I.value.unvisited)), 1)]),
        a("span", Xo, [L(A, { name: "next" })])
      ], 8, Qo)) : !e.compact && o.value && x.value?.locations.length ? (r(), c("footer", Jo, [L(A, { name: "layers" }), a("span", null, [a("strong", null, m(V.value?.name || "当前位置待确认"), 1), a("small", null, m(b.value ? "正在查看场景图 · 不会移动人物" : "当前位置的场景图"), 1)])])) : k("", !0),
      e.compact && x.value?.locations.length && !F.value ? (r(), c("div", {
        key: 6,
        class: "map-projection-caption",
        title: o.value ? V.value?.name : X.value
      }, [L(A, { name: o.value ? "pin" : "compass" }, null, 8, ["name"]), a("span", null, m(o.value ? V.value?.name || y(T).unknownLocation : X.value), 1)], 8, el)) : k("", !0),
      E.value && x.value ? (r(), Z(fo, {
        key: 7,
        scope: I.value,
        title: X.value,
        "initial-filter": E.value,
        onClose: g[22] || (g[22] = (M) => E.value = null),
        onSelect: g[23] || (g[23] = (M) => U(M))
      }, null, 8, [
        "scope",
        "title",
        "initial-filter"
      ])) : k("", !0),
      le(_.$slots, "overlay")
    ], 2));
  }
}), hl = tl;
export {
  ve as _,
  Ca as a,
  da as c,
  We as d,
  ae as f,
  T as g,
  Ot as h,
  Ha as i,
  ue as l,
  pl as m,
  He as n,
  Ba as o,
  Te as p,
  Na as r,
  Ia as s,
  hl as t,
  je as u,
  A as v,
  at as y
};
