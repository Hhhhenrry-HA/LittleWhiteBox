/* eslint-disable */
var y = {
  fee: 50,
  habitableAward: 50,
  collectionSize: 6,
  seedAttempts: 64,
  maxParts: 40,
  maxWidth: 6,
  maxDepth: 3
}, re = [
  "courtyard",
  "duplex",
  "terrace",
  "sunroom"
], _ = {
  courtyard: {
    floors: 1,
    living: 2,
    materials: 7,
    award: 100
  },
  duplex: {
    floors: 2,
    living: 4,
    materials: 9,
    award: 140
  },
  terrace: {
    floors: 3,
    living: 5,
    materials: 11,
    award: 200
  },
  sunroom: {
    floors: 2,
    living: 2,
    materials: 12,
    award: 140
  }
}, ae = "sunroom", x = {
  hall: {
    width: 1,
    cost: 0
  },
  entry: {
    width: 1,
    cost: 0
  },
  room: {
    width: 1,
    cost: 1
  },
  study: {
    width: 1,
    cost: 2
  },
  wide: {
    width: 2,
    cost: 2
  },
  terrace: {
    width: 1,
    cost: 1
  },
  garden: {
    width: 1,
    cost: 1
  },
  path: {
    width: 1,
    cost: 0
  },
  roof: {
    width: 1,
    cost: 0
  }
}, I = [
  "room",
  "wide",
  "study",
  "garden",
  "path",
  "terrace"
];
function oe(e) {
  return e.heights.flatMap((n, a) => Array.from({ length: n }, (r, t) => ({
    x: a % e.width,
    y: t,
    z: Math.floor(a / e.width)
  })));
}
function j(e, n, a) {
  return e.heights[a * e.width + n];
}
var se = {
  width: 1.3,
  height: 1.12,
  depth: 1.15
};
function S(e) {
  return e === "room" || e === "wide" || e === "study";
}
function p(e) {
  return e === "entry" || e === "hall" || S(e);
}
function d(e) {
  return `${e.x}:${e.y}:${e.z}`;
}
function f(e) {
  return Array.from({ length: x[e.kind].width }, (n, a) => ({
    x: e.x + a,
    y: e.y,
    z: e.z
  }));
}
var U = ["room", "room"], Z = I.filter((e) => e !== "path");
function F(e, n) {
  return Object.fromEntries(Z.map((a) => [a, e.owned.filter((r) => r === a).length - n.filter((r) => r.kind === a).length]));
}
function ie(e, n) {
  return Object.values(F(e, n)).every((a) => a >= 0);
}
function z(e) {
  return [
    {
      ...e,
      x: e.x - 1
    },
    {
      ...e,
      x: e.x + 1
    },
    {
      ...e,
      z: e.z - 1
    },
    {
      ...e,
      z: e.z + 1
    }
  ];
}
function k(e) {
  const n = /* @__PURE__ */ new Map();
  for (const a of e) for (const r of f(a)) n.set(d(r), a);
  return n;
}
function O(e, n, a = {
  x: e.entrance,
  y: 0,
  z: e.entryZ
}) {
  const r = k(n), t = H(e, n), o = d(a), s = /* @__PURE__ */ new Map();
  if (!r.has(o) || r.get(o).kind === "roof") return s;
  const u = [a];
  s.set(o, null);
  for (let h = 0; h < u.length; h++) {
    const m = u[h], i = d(m), c = z(m);
    t.has(i) && c.push({
      ...m,
      y: m.y + 1
    }), t.has(d({
      ...m,
      y: m.y - 1
    })) && c.push({
      ...m,
      y: m.y - 1
    });
    for (const l of c) {
      const g = d(l), w = r.get(g);
      w && w.kind !== "roof" && !s.has(g) && (s.set(g, i), u.push(l));
    }
  }
  return s;
}
function b(e, n) {
  return O(e, n);
}
function de(e, n, a, r) {
  const t = O(e, n, r);
  let o = d(a);
  if (!t.has(o)) return [];
  const s = [];
  for (; o !== null; ) {
    const [u, h, m] = o.split(":").map(Number);
    s.unshift({
      x: u,
      y: h,
      z: m
    }), o = t.get(o);
  }
  return s;
}
function H(e, n) {
  const a = k(n), r = /* @__PURE__ */ new Set(), t = /* @__PURE__ */ new Set();
  for (const o of n.filter((s) => s.y > 0 && s.kind !== "roof").flatMap(f)) {
    if (t.has(d(o))) continue;
    const s = [o];
    t.add(d(o));
    for (let i = 0; i < s.length; i++) for (const c of z(s[i])) {
      const l = d(c), g = a.get(l);
      g && g.kind !== "roof" && !t.has(l) && (t.add(l), s.push(c));
    }
    const u = s.map((i) => ({
      ...i,
      y: i.y - 1
    })).filter((i) => {
      const c = a.get(d(i));
      return c && p(c.kind);
    }), h = (i) => ["hall", "entry"].includes(a.get(d(i)).kind) ? 0 : 1, m = (i) => Math.abs(i.x - e.entrance) + Math.abs(i.z - e.entryZ);
    u.sort((i, c) => h(i) - h(c) || m(i) - m(c) || i.z - c.z || i.x - c.x), u.length && r.add(d(u[0]));
  }
  return r;
}
function P(e, n) {
  return n.filter((a) => a.y === 0 && p(a.kind)).flatMap(f).sort((a, r) => Math.abs(a.x - e.entrance) + Math.abs(a.z - e.entryZ) - (Math.abs(r.x - e.entrance) + Math.abs(r.z - e.entryZ)) || a.x - r.x)[0] ?? null;
}
function A(e, n) {
  const a = P(e, n), r = n.map((s) => s.kind === "hall" && a && d(s) === d(a) ? {
    ...s,
    kind: "entry"
  } : s), t = k(r), o = r.filter((s) => p(s.kind)).flatMap(f).filter((s) => !t.has(d({
    x: s.x,
    y: s.y + 1,
    z: s.z
  })));
  return [...r, ...o.map((s) => ({
    kind: "roof",
    x: s.x,
    y: s.y + 1,
    z: s.z
  }))];
}
function C(e, n, a) {
  const r = P(e, a);
  return !r || Math.abs(r.y - n.y) + Math.abs(r.x - n.x) + Math.abs(r.z - n.z) > 1;
}
function V(e, n) {
  const a = k(n);
  return [-1, 1].filter((r) => {
    const t = a.get(d({
      x: r < 0 ? e.x - 1 : e.x + x[e.kind].width,
      y: e.y,
      z: e.z
    }));
    return !t || !p(t.kind);
  });
}
function B(e, n, a) {
  return !a.some((r) => r !== n && r.z === n.z && r.y >= n.y && f(r).some((t) => t.x === n.x || Math.sign(t.x - n.x) === e.sunSide));
}
function T(e, n, a) {
  return C(e, n, a) ? V(n, a).length ? null : "window" : "noisy";
}
function R(e, n) {
  const a = k(n), r = b(e, n);
  return n.flatMap((t) => {
    const o = t.kind === "study" ? "read" : t.kind === "terrace" ? "sunbathe" : t.kind === "room" ? "rest" : t.kind === "wide" ? "relax" : t.kind === "garden" ? "garden" : null;
    return o ? [{
      part: t,
      activity: o,
      issue: r.has(d(t)) ? o === "read" && T(e, t, n) ? T(e, t, n) : o === "sunbathe" && !B(e, t, n) ? "shaded" : [
        "read",
        "rest",
        "relax"
      ].includes(o) && f(t).some((s) => !a.has(d({
        x: s.x,
        y: s.y + 1,
        z: s.z
      }))) ? "uncovered" : null : "disconnected"
    }] : [];
  });
}
function G(e, n) {
  const a = b(e, n), r = n.filter((o) => a.has(d(o))), t = {
    quietReading: r.some((o) => o.kind === "study" && !T(e, o, n)),
    sunTerrace: r.some((o) => o.kind === "terrace" && B(e, o, n)),
    garden: r.some((o) => o.kind === "garden" && Math.sign(o.x - e.entrance) === e.gardenSide),
    spacious: r.filter((o) => S(o.kind)).reduce((o, s) => o + x[s.kind].width, 0) >= e.living,
    upstairs: r.some((o) => S(o.kind) && o.y === e.floors - 1),
    terrace: r.some((o) => o.kind === "terrace")
  };
  return K(e).map((o) => ({
    id: o,
    met: t[o]
  }));
}
function K(e) {
  switch (e.tier) {
    case "courtyard":
      return ["garden", "spacious"];
    case "duplex":
      return ["spacious", "upstairs"];
    case "terrace":
      return ["upstairs", "terrace"];
    case "sunroom":
      return ["quietReading", "sunTerrace"];
  }
}
function ce(e, n) {
  const a = R(e, n).filter((r) => !r.issue);
  return [
    "read",
    "sunbathe",
    "relax",
    "rest",
    "garden"
  ].flatMap((r) => {
    const t = a.find((o) => o.activity === r);
    return t ? [t] : [];
  });
}
function N(e) {
  return e.reduce((n, a) => n + x[a.kind].cost, 0);
}
function q(e, n) {
  if (n.length > y.maxParts) return "materials";
  const a = /* @__PURE__ */ new Map();
  for (const t of n) {
    if (t.kind !== "hall" && !I.includes(t.kind) || !Number.isInteger(t.x) || !Number.isInteger(t.y) || !Number.isInteger(t.z) || t.z < 0 || t.z >= e.depth || t.x < 0 || t.x + x[t.kind].width > e.width || t.y < 0 || f(t).some((o) => o.y >= j(e, o.x, o.z))) return "bounds";
    for (const o of f(t)) {
      const s = d(o);
      if (a.has(s)) return "occupied";
      a.set(s, t);
    }
  }
  if (N(n) > e.materials) return "materials";
  if (!a.has(d({
    x: e.entrance,
    y: 0,
    z: e.entryZ
  }))) return "entrance";
  for (const t of n) {
    if (t.kind === "garden" && (t.y !== 0 || n.some((o) => o.y > 0 && f(o).some((s) => s.x === t.x && s.z === t.z)))) return "garden";
    if (t.kind === "path" && t.y !== 0) return "path";
    if (t.kind === "terrace" && (t.y === 0 || !e.terraces)) return "terrace";
    if (t.y > 0 && f(t).some((o) => {
      const s = a.get(d({
        x: o.x,
        y: o.y - 1,
        z: o.z
      }));
      return !s || !p(s.kind);
    })) return "support";
  }
  const r = b(e, n);
  return n.some((t) => f(t).some((o) => !r.has(d(o)))) ? "connected" : null;
}
function J(e, n) {
  const a = A(e, n), r = b(e, a), t = G(e, a), o = !q(e, n) && n.some((s) => s.kind === "room");
  return {
    wishes: t,
    spaces: R(e, a),
    habitable: o,
    fulfilled: o && t.every((s) => s.met),
    materials: N(n),
    unreachable: n.filter((s) => !r.has(d(s))).map(d)
  };
}
function le(e, n, a) {
  const r = k(n), t = [];
  for (let o = 0; o < e.floors; o++) for (let s = 0; s < e.depth; s++) for (let u = 0; u < e.width; u++) {
    const h = {
      kind: a,
      x: u,
      y: o,
      z: s
    };
    !r.has(d(h)) && !q(e, [...n, h]) && t.push(h);
  }
  return t;
}
function ue(e, n, a) {
  const r = e.find((t) => d(t) === d(n));
  return !r || !["room", "study"].includes(r.kind) || r.kind === a ? null : e.map((t) => t === r ? {
    ...t,
    kind: a
  } : t);
}
var D = [
  "gardenWalk",
  "gardenReading",
  "gardenTea",
  "quietBedroom",
  "courtyard"
];
var Q = {
  gardenWalk: "garden",
  gardenReading: "study",
  gardenTea: "wide",
  quietBedroom: "room",
  courtyard: "garden"
};
function he(e) {
  return e.length * 2;
}
function X(e) {
  const n = [...D];
  return (e >>> 4) % 2 && ([n[1], n[2]] = [n[2], n[1]]), n;
}
function L(e, n) {
  return e.y - n.y || e.z - n.z || e.x - n.x;
}
function Y(e, n, a) {
  const r = (i) => ({
    id: e,
    part: null,
    need: i
  }), t = (i) => ({
    id: e,
    part: i,
    need: null
  });
  if (!J(n, a).habitable) return r("bedroom");
  const o = A(n, a), s = k(a), u = R(n, o).filter((i) => !i.issue).map((i) => i.part).sort(L), h = u.filter((i) => i.kind === "garden"), m = (i) => f(i).some((c) => z(c).some((l) => s.get(d(l))?.kind === "garden"));
  switch (e) {
    case "gardenWalk": {
      if (!h.length) return r("garden");
      const i = h.find((c) => z(c).some((l) => s.get(d(l))?.kind === "path"));
      return i ? t(i) : r("path");
    }
    case "gardenReading": {
      const i = u.filter((l) => l.kind === "study");
      if (!i.length) return r("study");
      const c = i.find((l) => [-1, 1].some((g) => s.get(d({
        ...l,
        x: l.x + g
      }))?.kind === "garden"));
      return c ? t(c) : r("gardenWindow");
    }
    case "gardenTea": {
      const i = u.filter((l) => l.kind === "wide");
      if (!i.length) return r("livingRoom");
      const c = i.find(m);
      return c ? t(c) : r("gardenDoor");
    }
    case "quietBedroom": {
      const i = u.filter((c) => c.kind === "room" && C(n, c, o)).find((c) => {
        const l = o.filter((w) => w !== c && w.kind !== "roof"), g = b(n, l);
        return l.every((w) => f(w).every((W) => g.has(d(W))));
      });
      return i ? t(i) : r("privacy");
    }
    case "courtyard": {
      if (!h.length) return r("garden");
      const i = h.find((c) => z(c).filter((l) => {
        const g = s.get(d(l));
        return g && p(g.kind);
      }).length >= 3);
      return i ? t(i) : r("enclosure");
    }
  }
}
function me(e, n, a) {
  const r = X(e.seed).find((t) => !a.includes(t));
  return r ? Y(r, e, n) : null;
}
function ge(e, n, a) {
  return a.flatMap((r) => {
    const t = n.filter((s) => s.kind === Q[r]).sort(L), o = Y(r, e, n).part ?? t[0];
    return o ? [{
      id: r,
      part: o
    }] : [];
  });
}
var v = {
  hall: "过厅",
  entry: "门厅",
  room: "卧室",
  wide: "客厅",
  study: "阅读角",
  terrace: "露台",
  garden: "花园",
  path: "院路",
  roof: "屋顶"
}, E = {
  courtyard: "小院平房",
  duplex: "两层小楼",
  terrace: "露台小屋",
  sunroom: "阳光书屋"
}, fe = {
  disconnected: "这里还没有接通",
  uncovered: "这里还没有封顶",
  noisy: "门口旁边和正上方都吵，隔开一格更安静",
  window: "两侧都被房间夹住了，要留一面朝户外的侧窗",
  shaded: "太阳被挡住了，向阳一侧要留空"
}, M = {
  read: "读一会儿书",
  sunbathe: "晒晒太阳",
  rest: "睡个午觉",
  relax: "坐下来喝杯茶",
  garden: "看看小院"
}, ye = {
  read: "小白在翻书",
  sunbathe: "小白在晒太阳",
  rest: "小白睡着啦",
  relax: "小白在喝茶",
  garden: "小白在赏花"
}, ee = {
  gardenWalk: {
    title: "沿小路去赏花",
    wish: "想沿着院路，走到花园里。",
    gift: "小鸟浴台",
    thanks: "小路通到花园了，也给小鸟留一碗水。"
  },
  gardenReading: {
    title: "窗外就是花园",
    wish: "想在安静的阅读角，透过侧窗看花。",
    gift: "窗边花盆",
    thanks: "翻书的时候，抬头就能看见花。"
  },
  gardenTea: {
    title: "花园下午茶",
    wish: "想有一间出门就到花园的客厅。",
    gift: "薄荷茶具",
    thanks: "茶泡好啦，坐下来陪我一会儿吧。"
  },
  quietBedroom: {
    title: "不被打扰的午睡",
    wish: "想把卧室放安静些，不让大家从床边穿行。",
    gift: "暖绒小毯",
    thanks: "这回能安心睡个午觉啦。"
  },
  courtyard: {
    title: "屋子围着的小院",
    wish: "想让花园三面挨着屋子，头顶还能看见天。",
    gift: "庭院灯串",
    thanks: "窗里有家，窗外有花。这就是我们的小院啦。"
  }
}, we = {
  bedroom: "先留一间能住的卧室。",
  garden: "添一块露天花园。",
  path: "让院路直接接到花园边，拐角相碰不算。",
  study: "阅读角要远离门口，并留一面朝户外的侧窗。",
  gardenWindow: "花园要紧挨阅读角的左侧或右侧。",
  livingRoom: "添一间双格客厅。",
  gardenDoor: "让客厅与花园共用一条边，不隔着院路。",
  privacy: "卧室离门口至少两格；去其他地方不必穿过卧室。",
  enclosure: "花园的前后左右，至少三边紧挨地面房间。"
}, $ = {
  name: "小白筑家",
  category: "3D · 小屋建造",
  tagline: "给小白造一个不一样的家。",
  entry: "随机建材 · 自由造家",
  mark: "⌂",
  description: "选房间，搭一个小白真正住得进去的家。",
  ledger: {
    fee: "小白筑家 · 开工",
    ready: "小白筑家 · 基础房屋",
    finished: "小白筑家 · 心愿交付"
  },
  start: `开工 · ${y.fee} 金币`,
  admission: (e) => `开工扣 ${y.fee} 金币，先领 ${U.length} 间卧室的建材。有卧室即返还 ${y.habitableAward}；配齐客厅和户外一角可交付。安静阅读角、向阳露台、三面围合小院，任选 2 项实现，交付再得 ${_[e].award - y.habitableAward}。旧小屋会保留。`,
  construction: "给小白造个家",
  workbench: "建造与家园",
  newProject: "开始一栋新小屋",
  another: "再建一栋",
  resume: "继续建造",
  newBrief: "先选 3 批随机建材，再动手造家。",
  supplies: "建材配给",
  batch: (e) => `第 ${e + 1} / 3 批建材`,
  pickTerms: "每批独立随机，3 选 1；不保证每种房型都有。",
  takePack: "选这份",
  stock: (e) => `余 ${e}`,
  cost: (e) => `预算 ${e}`,
  freePath: "免费",
  commission: "委托详情",
  minimumTitle: "可以入住",
  minimumGoals: {
    bedroom: "卧室",
    lounge: "客厅",
    outdoor: "花园／向阳露台"
  },
  bonusTitle: "额外心愿 · 任选 2 项",
  bonusTerms: (e) => `交付时满足任意 2 项，另得 ${_[e].award - y.habitableAward} 金币。`,
  bonusProgress: (e) => `心愿 ${Math.min(e, 2)}/2 · 详情`,
  planningHelp: "房间的数字是预算花费，小字是剩余建材。拆下会退回建材和预算。阅读角需要远离门口、侧窗朝外；露台要在楼上，向阳处不受遮挡。建材不必用完，达标后也可继续建造。",
  deliver: "交付小屋",
  delivered: "小白的新家，交付啦！",
  deliveryTerms: (e, n) => `本次共得 ${e} 金币（含已发的 ${y.habitableAward}）。${n ? "额外心愿也达成了。" : "额外心愿还没齐，交付后不再补领本次奖金。"}交付后仍可在家园自由改建。`,
  deliveryIncomplete: "卧室、客厅和可用的花园或露台齐全后，即可交付。",
  goal: {
    courtyard: "露天花园三面紧挨地面房间",
    quietReading: "远离门口、侧窗通向户外的阅读角",
    sunTerrace: "向阳无遮挡的露台"
  },
  homes: "我的家园",
  homeMode: "自由改建",
  prepare: "正在检查地块…",
  loading: "正在找回你的小屋…",
  saving: "正在保存…",
  parts: "房间",
  remove: "拆下",
  undo: "撤销",
  menu: "更多",
  budget: (e) => `预算余 ${e}`,
  selected: (e) => v[e.kind],
  cell: (e, n, a) => `第 ${n + 1} 层，第 ${a + 1} 排，第 ${e + 1} 列`,
  place: (e) => `建${v[e.kind]}，第 ${e.y + 1} 层，第 ${e.z + 1} 排，第 ${e.x + 1} 列`,
  choice: (e, n = null) => `${v[e]}，预算 ${x[e].cost}${n === null ? "" : `，剩余建材 ${n}`}`,
  refit: (e) => `改成${v[e]}`,
  remodel: "改建家园",
  done: "结束改建",
  reside: "住回这里",
  floors: "查看楼层",
  whole: "全景",
  floor: (e) => e === 0 ? "一层 · 庭院" : `${e + 1} 层`,
  invited: (e) => `好呀，去${M[e]}。`,
  focus: "看看小白",
  noPlace: "这里暂时放不下，换一种房间或拆改一下。",
  sun: (e) => `阳光从${e === -1 ? "左" : "右"}边来`,
  walking: (e) => `小白正要${M[e]}`,
  useSpace: (e) => `请小白${M[e]}`,
  archiveTitle: (e, n) => `${E[e]} · ${n + 1}`,
  complete: "小白的家",
  abandoned: "工程已停工",
  earned: (e) => `已到账 ${e} 金币`,
  net: (e) => `净收益 ${e - y.fee >= 0 ? "+" : ""}${e - y.fee}`,
  memories: "小家回忆",
  memoryProgress: (e) => `${e} / ${D.length} 段生活`,
  memoryReward: (e) => `${ee[e].gift} · 改建预算 +2`,
  remember: "请小白来看看",
  memoryReady: "布置好了，叫小白来试试吧。",
  memoryComplete: "每个角落，都有一起住下来的回忆。",
  memoryFinished: "继续按你的心意改建，纪念物会一直留下。",
  memoryStored: "已收好，添回对应房间就会摆出来",
  memoryPlaced: (e) => `摆在${v[e]}`,
  memoryLocked: "还没发生的生活",
  memoryCollection: "纪念物随对应用途房间自动摆放；拆改不丢失，也不重复领取。",
  collection: "作品册",
  collect: "收藏这栋",
  uncollect: "移出作品册",
  emptyCollection: "另建新小屋时，交付的旧屋会自动留在这里。",
  collectionCount: (e) => `${e} / ${y.collectionSize} 栋`,
  uncollectTitle: "移出作品册？",
  uncollectBody: "历史收益保留。若不是当前工程，移出后将不再保留这栋建筑，可先保存留影。",
  export: "保存留影",
  exportName: (e) => `小白筑家-${E[e]}.png`,
  exportError: "留影未能保存，请重试。",
  abandon: "放弃工程",
  abandonTitle: "停止这次建造？",
  abandonBody: "已到账的奖励保留，开工费不退。未收藏的工程会在下一次开工时替换。",
  confirm: "确定",
  cancel: "再想想",
  close: "关闭",
  back: "返回当前工程",
  rules: "玩法",
  ruleItems: [
    "选楼层和房间，再点地面空位。可前后左右扩建，院路能连通花园和房间；门、楼梯和屋顶自动安排。",
    "每块地的轮廓和预算不同。小院留在地面，露台在楼上；阅读角要远离门口，至少一侧通向户外、小院或露台。点现有房间可以拆改或请小白试住。",
    "开工后连选 3 批建材，每批独立随机 3 选 1，不按之前选择调整，也不保证都有露台。已出现的选项会保存，刷新不重抽。拆房退回建材，院路免费。",
    `有卧室立即到账 ${y.habitableAward} 金币。卧室、客厅和户外一角齐全即可主动交付，也可继续实现额外心愿。`,
    "交付后奖金结清，家园可免费改建、发展生活纪念；不补发或重发本次金币。另建新屋前确认费用，旧屋自动保留。"
  ],
  zoomIn: "放大",
  zoomOut: "缩小",
  resetView: "全屋",
  scene: "小白的建造场地",
  storyBusy: "故事生成中，施工暂歇",
  soundOn: "声音开",
  soundOff: "声音关",
  soundError: "声音设置未保存，请重试。",
  audioDispose: "[Building] Audio context disposal failed",
  noFunds: `开工需要 ${y.fee} 金币，当前余额不足。`,
  graphics: "画面暂停，工程仍在。请重新载入画面。",
  reload: "重载画面",
  saveProblem: "这次操作尚未确认，请复核原操作。",
  conflict: "工程有新版本，请重新读取。",
  recoveryProblem: "恢复记录无法读写，请允许本站存储后复核原操作。",
  recover: "复核原操作",
  refresh: "重新读取",
  retiredIntent: "旧版未完成的构件操作已取消，工程和到账记录保留，请按新布局继续。",
  balance: (e) => `钱包 ${e}`
}, ne = {
  stock: "手头没有这类建材，可以拆回已有的同类房间。",
  bounds: "这里超出了地块或层高",
  occupied: "这里已经有房间",
  materials: "建造预算不够了",
  support: "楼上的每一格都要有房间承托",
  entrance: "要保留入口的位置",
  path: "院路只能铺在地面，楼上需要房间承托",
  garden: "小院要落在地面，上方留空",
  terrace: "露台需要建在楼上",
  connected: "房间之间要连通门厅"
}, te = {
  ...Object.fromEntries(Object.entries(ne).map(([e, n]) => [`building_${e}`, n])),
  building_invalid: "这次操作不合法，请重新读取工程。",
  building_identity: "操作身份不匹配，请重新读取。",
  building_stale: $.conflict,
  building_funds: $.noFunds,
  building_active: "先完成或放弃当前工程。",
  building_memory_incomplete: "这段生活还没布置好，或已经留过纪念了。",
  building_supply: "本轮建材不可领取，请重新读取工程。",
  building_finished: "这个工程不能进行此操作。",
  building_incomplete: $.deliveryIncomplete,
  building_collection_full: "作品册已满，请先移出一栋或保存留影。",
  building_generation: "地块检查未完成，没有扣费，请再试一次。",
  building_unavailable: "当前无法施工，请稍后再试。",
  building_recovery: $.recoveryProblem
};
function ke(e) {
  return te[e && typeof e == "object" && "code" in e ? String(e.code) : e instanceof Error ? e.message : ""] ?? $.saveProblem;
}
export {
  F as A,
  j as B,
  P as C,
  de as D,
  k as E,
  ae as F,
  oe as H,
  I,
  re as L,
  y as M,
  se as N,
  H as O,
  x as P,
  _ as R,
  V as S,
  b as T,
  p as U,
  d as V,
  N as _,
  we as a,
  ce as b,
  ke as c,
  he as d,
  Y as f,
  le as g,
  J as h,
  ee as i,
  ie as j,
  Z as k,
  D as l,
  me as m,
  $ as n,
  v as o,
  X as p,
  ne as r,
  fe as s,
  ye as t,
  ge as u,
  q as v,
  A as w,
  R as x,
  ue as y,
  f as z
};
