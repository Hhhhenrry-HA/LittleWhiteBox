/* eslint-disable */
import { $ as jt, A as pn, D as Ne, E as Ye, I as Ga, J as Un, M as Tt, N as Nn, P as vt, Q as mn, R as It, S as I, T as Ue, U as Ee, V as $, W as vn, X as me, at as Ht, b as wt, c as $s, ct as Is, d as Ya, dt as Vt, ft as R, h as se, i as gn, l as Dn, lt as m, m as nt, p as Es, q as Fn, r as Bn, rt as q, ut as zt, v as ae, x as G, y as _ } from "./xiaobai-os-app-navigation-Dv7QNwzp.js";
import { t as ct } from "./xiaobai-os-_plugin-vue_export-helper-Dj7HTbfw.js";
import { n as Ls, r as Pa, t as As } from "./xiaobai-os-composer-keyboard-COt-GHsA.js";
import { t as Ts } from "./xiaobai-os-constants-CDXgazQ7.js";
import { C as Ft, Ct as js, Ft as yn, Lt as St, Pt as Os, S as Zs, St as qn, T as bn, Tt as Us, X as Mt, Y as Ns, Z as Ds, _ as Aa, _t as Fs, a as Ta, bt as $a, d as Qa, et as Bs, h as qs, kt as Ws, l as Hs, n as Wn, o as Vs, p as Gs, st as Hn, vt as Ys, w as Vn, wt as wn, xt as Ka, y as xn, yt as Qs } from "./xiaobai-os-three.module-Ah3xIFOr.js";
import { t as Ks } from "./xiaobai-os-BufferGeometryUtils-BLglYbHr.js";
import { C as Xs, S as we, _ as Gn, a as ft, b as Rt, c as ye, d as Mn, f as le, g as Js, h as de, i as Xt, l as T, m as Ke, n as ja, o as kt, p as Oa, r as At, s as er, t as K, u as Yn, v as ze, w as Qn, x as Kn, y as V } from "./xiaobai-os-copy-CsUmkC9o.js";
function da(e) {
  return e.seed = Math.imul(e.seed, 1664525) + 1013904223 >>> 0, e.seed / 4294967296;
}
function tr(e, t, s) {
  const a = [...t], n = [];
  for (; a.length && n.length < s; ) n.push(a.splice(Math.floor(da(e) * a.length), 1)[0]);
  return n;
}
function Ia() {
  return Array.from(crypto.getRandomValues(new Uint32Array(4)), (e) => e.toString(16).padStart(8, "0")).join("");
}
function ve(e, t) {
  throw Object.assign(/* @__PURE__ */ new Error(`expedition_${e}`), {
    code: `expedition_${e}`,
    ...t === void 0 ? {} : { cause: t }
  });
}
function kn(e) {
  return !e || e.location.scene === "camp" && e.phase === "exploration";
}
var Qe = {
  traveler: {
    price: 0,
    achievement: null,
    fabric: "#326d9f",
    metal: "#d5b77b",
    glow: "#a7def3",
    silhouette: "cloak",
    head: "none"
  },
  guardian: {
    price: 0,
    achievement: "boss-0",
    fabric: "#278c7f",
    metal: "#d9bb75",
    glow: "#99e2c5",
    silhouette: "armor",
    head: "helm"
  },
  moonweaver: {
    price: 0,
    achievement: "boss-1",
    fabric: "#7863b4",
    metal: "#ddd9ed",
    glow: "#bdceff",
    silhouette: "robe",
    head: "hat"
  },
  sovereign: {
    price: 0,
    achievement: "boss-2",
    fabric: "#973f59",
    metal: "#e3bd64",
    glow: "#ffe4a4",
    silhouette: "armor",
    head: "crown"
  },
  ranger: {
    price: 180,
    achievement: null,
    fabric: "#387759",
    metal: "#d2b989",
    glow: "#c8ebad",
    silhouette: "hood",
    head: "hood"
  },
  paladin: {
    price: 320,
    achievement: null,
    fabric: "#e9e6d4",
    metal: "#a1b9c5",
    glow: "#e8dba3",
    silhouette: "armor",
    head: "helm"
  },
  witch: {
    price: 240,
    achievement: null,
    fabric: "#383b69",
    metal: "#cda56d",
    glow: "#b9a6f3",
    silhouette: "robe",
    head: "hat"
  },
  assassin: {
    price: 280,
    achievement: null,
    fabric: "#343947",
    metal: "#d88675",
    glow: "#ce9cac",
    silhouette: "hood",
    head: "hood"
  },
  machinist: {
    price: 260,
    achievement: null,
    fabric: "#b67745",
    metal: "#3f636c",
    glow: "#b0eff1",
    silhouette: "coat",
    head: "goggles"
  },
  beastcaller: {
    price: 300,
    achievement: null,
    fabric: "#70906b",
    metal: "#ece0b7",
    glow: "#c5e895",
    silhouette: "cloak",
    head: "horns"
  },
  frostbound: {
    price: 420,
    achievement: null,
    fabric: "#8dbbc7",
    metal: "#e4eef0",
    glow: "#c3fbff",
    silhouette: "coat",
    head: "crown"
  },
  stargazer: {
    price: 480,
    achievement: null,
    fabric: "#504881",
    metal: "#d4bc8c",
    glow: "#ddcbff",
    silhouette: "robe",
    head: "crown"
  }
};
function Ea(e, t) {
  const s = Qe[t];
  return t === "traveler" || e.purchases.some((a) => a.id === t) || s.achievement !== null && e.awards.some((a) => a.key === s.achievement);
}
var he = (e, t, s = 0) => ({
  family: e,
  chapter: s,
  ...t ? { requires: [t] } : {}
}), ee = (e, t = 0) => ({
  family: e,
  weapons: [e],
  chapter: t
}), Gt = {
  "storm-step": he("storm"),
  conductor: he("storm", [
    "storm-step",
    "orbit",
    "momentum",
    "command"
  ]),
  momentum: he("storm"),
  cinder: he("fire"),
  wildfire: he("fire", ["cinder", "inferno"]),
  "blood-price": he("risk"),
  frost: he("frost"),
  shatter: he("frost", [
    "frost",
    "nova",
    "pinning",
    "trapper",
    "orbitals"
  ]),
  echo: he("skill"),
  hunter: {
    ...he("bow"),
    weapons: [
      "bow",
      "staff",
      "grimoire",
      "cannon"
    ]
  },
  piercing: he("blade"),
  orbit: he("storm"),
  thorns: he("guard"),
  aegis: he("guard"),
  siphon: he("life"),
  focus: he("skill"),
  renewal: he("life"),
  execution: he("blade"),
  "last-stand": he("guard", void 0, 1),
  quicksilver: he("skill"),
  magnet: he("skill"),
  wardstone: he("guard"),
  pilgrim: he("life"),
  gambit: he("risk", void 0, 1),
  riposte: ee("blade"),
  "shield-break": ee("blade"),
  "cleave-wave": ee("blade", 1),
  duelist: ee("blade"),
  "blood-dance": ee("blade"),
  valor: ee("blade", 1),
  ricochet: ee("bow"),
  "split-arrow": ee("bow"),
  pinning: ee("bow"),
  "distance-draw": ee("bow"),
  "hunter-mark": ee("bow", 1),
  trapper: ee("bow"),
  nova: ee("staff"),
  inferno: {
    ...ee("staff"),
    requires: [["cinder"]]
  },
  fracture: {
    ...ee("staff"),
    requires: [[
      "frost",
      "nova",
      "orbitals"
    ]]
  },
  overload: {
    ...ee("staff", 1),
    requires: [["cinder"], [
      "frost",
      "nova",
      "orbitals"
    ]]
  },
  orbitals: ee("staff"),
  convergence: ee("staff"),
  backstab: ee("daggers"),
  shadowstep: ee("daggers"),
  hemorrhage: ee("daggers"),
  "execution-chain": ee("daggers", 1),
  smoke: ee("daggers"),
  venom: ee("daggers"),
  "pack-bond": ee("grimoire"),
  martyr: ee("grimoire"),
  covenant: ee("grimoire"),
  frenzy: ee("grimoire"),
  "soul-harvest": ee("grimoire", 1),
  command: ee("grimoire"),
  shrapnel: ee("cannon"),
  minefield: ee("cannon"),
  overclock: ee("cannon"),
  bunker: ee("cannon"),
  salvage: ee("cannon"),
  railgun: ee("cannon", 1)
}, C = (e, t) => e.relics.find((s) => s.id === t)?.rank ?? 0;
function ar(e) {
  return Gn.filter((t) => !Gt[t].weapons || Gt[t].weapons.includes(e));
}
function Xn(e, t, s = null) {
  const a = Gt[t];
  return (!a.weapons || a.weapons.includes(e.weapon)) && (!a.requires || a.requires.every((n) => n.some((i) => i !== s && C(e, i) > 0)));
}
function ke(e) {
  throw Object.assign(/* @__PURE__ */ new Error(`expedition_world_${e}`), { code: `expedition_world_${e}` });
}
var nr = 1e-9;
function Ot(e, t, s) {
  return {
    x: e.origin.x + (t + 0.5) * e.cellSize,
    y: e.origin.y + (s + 0.5) * e.cellSize
  };
}
function Pt(e, t) {
  return {
    column: Math.floor((t.x - e.origin.x) / e.cellSize),
    row: Math.floor((t.y - e.origin.y) / e.cellSize)
  };
}
function Jn(e, t) {
  const s = e.rows[0]?.length ?? 0, a = e.rows.length;
  (!s || !a || !Number.isFinite(e.cellSize) || e.cellSize <= 0 || !Number.isFinite(e.origin.x) || !Number.isFinite(e.origin.y) || e.rows.some((r) => r.length !== s || /[^.# ]/.test(r))) && ke("map_invalid");
  const n = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Set();
  for (const r of e.gates) {
    (!r.id || n.has(r.id) || !r.cells.length) && ke("map_invalid"), n.add(r.id);
    const c = !t.has(r.id);
    c && d.add(r.id);
    for (const { column: l, row: u } of r.cells) {
      (!Number.isInteger(l) || !Number.isInteger(u) || l < 0 || l >= s || e.rows[u]?.[l] !== ".") && ke("map_invalid");
      const h = u * s + l;
      i.has(h) && ke("map_invalid"), i.add(h), c && o.add(h);
    }
  }
  for (const r of t) n.has(r) || ke("gate_unknown");
  return {
    map: e,
    columns: s,
    rows: a,
    closedGates: d,
    blocked(r, c) {
      return r < 0 || r >= s || c < 0 || c >= a || e.rows[c][r] !== "." || o.has(c * s + r);
    }
  };
}
function ra(e, t, s, a) {
  const n = Math.max(t - e.x, 0, e.x - t - a), i = Math.max(s - e.y, 0, e.y - s - a);
  return n * n + i * i;
}
function Jt(e, t, s) {
  const a = s.x - t.x, n = s.y - t.y, i = a * a + n * n, o = i === 0 ? 0 : Math.max(0, Math.min(1, ((e.x - t.x) * a + (e.y - t.y) * n) / i));
  return (e.x - t.x - a * o) ** 2 + (e.y - t.y - n * o) ** 2;
}
function es(e, t, s, a, n) {
  let i = 0, o = 1;
  for (const [d, r, c] of [[
    e.x,
    t.x - e.x,
    s
  ], [
    e.y,
    t.y - e.y,
    a
  ]]) if (r === 0) {
    if (d <= c || d >= c + n) return !1;
  } else {
    const l = (c - d) / r, u = (c + n - d) / r;
    if (i = Math.max(i, Math.min(l, u)), o = Math.min(o, Math.max(l, u)), i >= o) return !1;
  }
  return i < o;
}
function sr(e, t, s, a, n) {
  return es(e, t, s, a, n) ? 0 : Math.min(ra(e, s, a, n), ra(t, s, a, n), Jt({
    x: s,
    y: a
  }, e, t), Jt({
    x: s + n,
    y: a
  }, e, t), Jt({
    x: s,
    y: a + n
  }, e, t), Jt({
    x: s + n,
    y: a + n
  }, e, t));
}
function Ce(e, t, s, a = 0) {
  (![
    t.x,
    t.y,
    s.x,
    s.y,
    a
  ].every(Number.isFinite) || a < 0) && ke("input_invalid");
  const { map: n } = e, i = n.cellSize, o = Pt(n, {
    x: Math.min(t.x, s.x) - a,
    y: Math.min(t.y, s.y) - a
  }), d = Pt(n, {
    x: Math.max(t.x, s.x) + a,
    y: Math.max(t.y, s.y) + a
  });
  for (let r = o.row; r <= d.row; r++) for (let c = o.column; c <= d.column; c++) {
    if (!e.blocked(c, r)) continue;
    const l = n.origin.x + c * i, u = n.origin.y + r * i;
    if (a === 0 ? es(t, s, l, u, i) || ra(t, l, u, i) === 0 && ra(s, l, u, i) === 0 : sr(t, s, l, u, i) < a * a - nr) return !1;
  }
  return !0;
}
var ot = (e, t, s) => Ce(e, t, t, s);
function Xa(e, t, s, a) {
  [s.x, s.y].every(Number.isFinite) || ke("input_invalid"), ot(e, t, a) || ke("position_blocked");
  const n = Math.hypot(s.x, s.y);
  if (n === 0) return;
  const i = Math.ceil(n / (e.map.cellSize / 4)), o = s.x / i, d = s.y / i;
  for (let r = 0; r < i; r++) {
    const c = {
      x: t.x + o,
      y: t.y + d
    };
    if (Ce(e, t, c, a)) {
      Object.assign(t, c);
      continue;
    }
    const l = Math.abs(o) >= Math.abs(d) ? ["x", "y"] : ["y", "x"];
    for (const u of l) {
      const h = {
        ...t,
        [u]: t[u] + (u === "x" ? o : d)
      };
      Ce(e, t, h, a) && Object.assign(t, h);
    }
  }
}
var mt = Math.PI * 2, B = (e, t) => Math.hypot(e.x - t.x, e.y - t.y), fe = (e, t) => Math.atan2(t.y - e.y, t.x - e.x), Ja = (e) => (e - 1) * Math.PI / 4 - Math.PI / 2, De = (e, t, s) => ({
  x: e.x + Math.cos(t) * s,
  y: e.y + Math.sin(t) * s
});
function Be(e, t, s, a, n, i) {
  if (i) {
    Xa(i.space, t, {
      x: Math.cos(s) * a,
      y: Math.sin(s) * a
    }, n);
    return;
  }
  t.x += Math.cos(s) * a, t.y += Math.sin(s) * a;
  for (const o of e.obstacles) {
    const d = B(t, o), r = n + o.radius;
    if (d < r) {
      const c = d < 1e-3 ? s : fe(o, t);
      t.x = o.x + Math.cos(c) * r, t.y = o.y + Math.sin(c) * r;
    }
  }
  t.x = Math.max(-V.arena + n, Math.min(V.arena - n, t.x)), t.y = Math.max(-V.arena + n, Math.min(V.arena - n, t.y));
}
function rr(e, t, s, a) {
  const n = e.x - t.x, i = e.y - t.y, o = Math.max(0, Math.min(a, n * Math.cos(s) + i * Math.sin(s)));
  return Math.hypot(n - Math.cos(s) * o, i - Math.sin(s) * o);
}
var ir = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
  [1, -1],
  [1, 1],
  [-1, 1],
  [-1, -1]
], La = (e, t) => Math.hypot(t.x - e.x, t.y - e.y);
function Yt(e, t, s, a) {
  if (!ot(e, t, a) || !ot(e, s, a)) return null;
  if (Ce(e, t, s, a)) return [{ ...s }];
  const { map: n, columns: i, rows: o } = e, d = Pt(n, t), r = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Set(), u = [];
  function h(p) {
    return Ot(n, p % i, Math.floor(p / i));
  }
  function v(p, g, y, w) {
    if (p < 0 || p >= i || g < 0 || g >= o) return;
    const f = g * i + p;
    l.has(f) || (r.get(f) ?? 1 / 0) <= y || (r.set(f, y), c.set(f, w), u.push({
      id: f,
      score: y + La(h(f), s)
    }));
  }
  for (let p = -1; p <= 1; p++) for (let g = -1; g <= 1; g++) {
    const y = d.column + g, w = d.row + p, f = Ot(n, y, w);
    Ce(e, t, f, a) && v(y, w, La(t, f), -1);
  }
  for (; u.length; ) {
    u.sort((y, w) => w.score - y.score || w.id - y.id);
    const { id: p } = u.pop();
    if (l.has(p)) continue;
    l.add(p);
    const g = h(p);
    if (Ce(e, g, s, a)) {
      const y = [{ ...s }];
      let w = p;
      for (; w !== -1; )
        y.push(h(w)), w = c.get(w);
      y.reverse();
      const f = [];
      let x = t;
      for (let b = 0; b < y.length; ) {
        let M = b;
        for (; M + 1 < y.length && Ce(e, x, y[M + 1], a); ) M++;
        x = y[M], f.push(x), b = M + 1;
      }
      return f;
    }
    for (const [y, w] of ir) {
      const f = p % i + y, x = Math.floor(p / i) + w, b = Ot(n, f, x);
      Ce(e, g, b, a) && v(f, x, r.get(p) + La(g, b), p);
    }
  }
  return null;
}
var _n = (e) => !we(e) || e === "warden" || e === "thornheart", X = (e, t, s, a = 0) => !e || Ce(e.space, t, s, a);
function or(e, t, s) {
  return e.summonPoints.filter((a) => ot(e.space, a, s) && Yt(e.space, e.entry, a, s)).sort((a, n) => Math.hypot(a.x - t.x, a.y - t.y) - Math.hypot(n.x - t.x, n.y - t.y))[0] ?? null;
}
function ts(e, t, s) {
  return !e || Ce(e.space, t, s, 0.3) ? s : {
    x: t.x,
    y: t.y
  };
}
function as(e, t, s, a) {
  if (!e) return Math.atan2(s.y - t.y, s.x - t.x);
  let n = s;
  if (!ot(e.space, n, a)) {
    const o = [], d = a + e.space.map.cellSize, r = Pt(e.space.map, {
      x: s.x - d,
      y: s.y - d
    }), c = Pt(e.space.map, {
      x: s.x + d,
      y: s.y + d
    });
    for (let u = Math.max(0, r.row); u <= Math.min(e.space.rows - 1, c.row); u++) for (let h = Math.max(0, r.column); h <= Math.min(e.space.columns - 1, c.column); h++) {
      const v = Ot(e.space.map, h, u);
      Math.hypot(v.x - s.x, v.y - s.y) <= a + e.space.map.cellSize && ot(e.space, v, a) && Ce(e.space, v, s) && o.push(v);
    }
    o.sort((u, h) => Math.hypot(u.x - s.x, u.y - s.y) - Math.hypot(h.x - s.x, h.y - s.y));
    const l = o.find((u) => Yt(e.space, t, u, a));
    if (!l) return null;
    n = l;
  }
  const i = Yt(e.space, t, n, a);
  return i?.length ? Math.atan2(i[0].y - t.y, i[0].x - t.x) : null;
}
function pe(e, t, s, a = 1, n = 0) {
  e.effects.push({
    id: ++e.serial,
    x: t.x,
    y: t.y,
    kind: s,
    size: a,
    angle: n,
    life: s === "slash" ? 9 : 15
  });
}
function Se(e, t, s, a) {
  if (!we(t) && e.enemies.filter((o) => o.hp > 0).length >= V.maxEnemies) return null;
  if (a) {
    const o = or(a, s, de[t].radius);
    if (!o) return null;
    s = o;
  }
  const n = de[t].hp * (we(t) ? 1 : 1 + e.chapter * 0.2 + (e.elite ? 0.25 : 0)), i = {
    id: ++e.serial,
    kind: t,
    x: s.x,
    y: s.y,
    hp: n,
    maxHp: n,
    angle: Math.PI / 2,
    cooldown: 35 + Math.floor(da(e) * 20),
    windup: 0,
    target: { ...s },
    pattern: 0,
    phase: 1,
    chill: 0,
    burn: 0,
    marked: 0,
    stun: 0,
    bleed: 0,
    poison: 0,
    exposed: 0,
    motion: 0,
    motionAngle: 0,
    stagger: 0,
    memory: []
  };
  return e.enemies.push(i), i;
}
function st(e, t, s, a, n, i = {}) {
  const o = {
    id: ++e.serial,
    x: t.x,
    y: t.y,
    angle: s,
    damage: a,
    friendly: n,
    source: "attack",
    pierce: 0,
    hits: [],
    speed: 0.22,
    life: 130,
    radius: 0.16,
    splash: 0,
    bounce: 0,
    ...i
  };
  return e.shots.push(o), o;
}
function ue(e, t, s, a, n, i, o, d = !1, r = {}) {
  const c = {
    id: ++e.serial,
    x: t.x,
    y: t.y,
    kind: s,
    radius: a,
    wait: n,
    life: i,
    damage: o,
    friendly: d,
    angle: 0,
    length: 0,
    width: 0.65,
    inner: 0,
    source: d ? "passive" : "attack",
    hits: [],
    ...r
  };
  return e.hazards.push(c), c;
}
function Ge(e, t, s, a, n) {
  return ue(e, t, "slam", s, a, 8, n);
}
function Me(e, t, s, a, n, i, o) {
  return ue(e, t, "beam", 0, i, 9, o, !1, {
    angle: s,
    length: a,
    width: n
  });
}
function tt(e, t, s, a, n, i, o = 0.22) {
  for (let d = 0; d < a; d++) st(e, t, s + (d / Math.max(1, a - 1) - 0.5) * n, i, !1, { speed: o });
}
function Sn(e, t, s, a, n, i = 0.16) {
  for (let o = 0; o < s; o++) st(e, t, a + o * mt / s, n, !1, { speed: i });
}
function Za(e, t, s, a, n = 0) {
  const i = {
    id: ++e.serial,
    kind: t,
    x: s.x,
    y: s.y,
    hp: t === "turret" ? 65 : t === "familiar" ? Ke.familiarHp : 38,
    life: a,
    cooldown: 12,
    angle: 0,
    empowered: n
  };
  return e.companions.push(i), i;
}
var ea = (e) => e === "attack" || e === "skill";
function ns(e, t) {
  if (e.player.hp <= 0) return;
  const s = Math.min(V.maxHp - e.player.hp, t);
  e.player.hp += s, s > 0 && pe(e, e.player, "heal");
}
function rt(e, t, s) {
  if (we(t.kind)) {
    if (t.stagger += s, t.stagger < 100) return;
    t.stagger = 0, s = 24;
  }
  t.stun = Math.max(t.stun, s), t.windup = 0, t.motion = 0, t.cooldown = Math.max(20, t.cooldown), pe(e, t, "guard", 1.4);
}
function Le(e, t, s, a, n, i = e.player, o) {
  if (t.hp <= 0 || !X(o, i, t)) return;
  const d = t.burn > 0 || ea(n) && C(a, "cinder") > 0, r = t.chill > 0 || ea(n) && C(a, "frost") > 0, c = (n === "skill" || n === "companion" && a.weapon === "cannon") && r && C(a, "shatter") > 0, l = ea(n) && d && r && C(a, "overload") > 0;
  let u = s * (C(a, "blood-price") ? ze.bloodDamage + (C(a, "blood-price") - 1) * 0.12 : 1);
  if (C(a, "execution") && t.hp / t.maxHp < ze.executeThreshold && (u *= ze.executeDamage + (C(a, "execution") - 1) * 0.1), t.exposed > 0 && (u *= 1.25), (t.kind === "guard" || o && t.kind === "warden") && n === "attack" && Math.cos(fe(t, i) - t.angle) > 0.4 && t.exposed <= 0 && (u *= C(a, "shield-break") ? 0.8 : 0.35), t.kind !== "priest" && !we(t.kind) && e.enemies.some((h) => h.kind === "priest" && h.hp > 0 && B(t, h) < 3.5 && X(o, t, h)) && (u *= 0.7), n === "attack" && C(a, "backstab") && Math.cos(fe(t, e.player) - t.angle) < -0.3 && (u *= 1.6 + C(a, "backstab") * 0.2, t.exposed = Math.max(t.exposed, 55)), n === "attack" && C(a, "duelist") && rt(e, t, 9 * C(a, "duelist")), c) {
    u += 15 * C(a, "shatter"), t.chill = 0, pe(e, t, "burst", 2.2);
    for (const h of e.enemies) h.id !== t.id && B(t, h) < 2.2 && Le(e, h, 9 * C(a, "shatter"), a, "passive", t, o);
  }
  if (ea(n) && (C(a, "cinder") && (t.burn = Math.max(t.burn, 80 + C(a, "cinder") * 25)), C(a, "frost") && (t.chill = Math.max(t.chill, 45 + C(a, "frost") * 20)), (C(a, "blood-dance") || C(a, "hemorrhage")) && (t.bleed = 100 + 25 * (C(a, "blood-dance") + C(a, "hemorrhage"))), C(a, "venom") && (t.poison = 100 + C(a, "venom") * 35), l && (u += 20 * C(a, "overload"), pe(e, t, "lightning")), n === "skill" && C(a, "hunter-mark") && (t.exposed = Math.max(t.exposed, 100 + C(a, "hunter-mark") * 40)), C(a, "inferno") && d && n === "skill" && ue(e, t, "fire", 1.5 + C(a, "inferno") * 0.3, 0, 70, 4 * C(a, "inferno"), !0)), l && (t.burn = 0), (l || c) && (t.chill = 0), t.hp = Math.max(0, t.hp - u), t.marked = 5, n === "lightning" && C(a, "momentum") && e.tick % 6 === 0 && (e.player.dash = Math.max(0, e.player.dash - C(a, "momentum") * 2)), !(t.hp > 0)) {
    if (e.kills++, pe(e, t, "burst", we(t.kind) ? 3 : 0.8), C(a, "wildfire") && d && ue(e, t, "fire", 1.8 + C(a, "wildfire") * 0.2, 0, 90, 3 * C(a, "wildfire"), !0), C(a, "fracture") && r) for (let h = 0; h < 4 + C(a, "fracture"); h++) st(e, t, h * mt / (4 + C(a, "fracture")), 9, !0, { source: "passive" });
    if (C(a, "siphon") && (e.kills % ze.siphonEvery === 0 || we(t.kind)) && ns(e, (we(t.kind) ? ze.siphonBossHeal : ze.siphonHeal) + C(a, "siphon") - 1), C(a, "execution-chain") && (e.player.dash = Math.max(0, e.player.dash - 12 * C(a, "execution-chain")), e.player.skill = Math.max(0, e.player.skill - 8)), C(a, "soul-harvest") && (e.player.resource = Math.min(Ke.maxPower, e.player.resource + 9 * C(a, "soul-harvest"))), n === "companion" && C(a, "salvage") && (e.player.skill = Math.max(0, e.player.skill - 12 * C(a, "salvage"))), C(a, "magnet"))
      for (const h of e.enemies) h.hp > 0 && B(t, h) < 3 + C(a, "magnet") && X(o, t, h) && Be(e, h, fe(h, t), 0.7, de[h.kind].radius, o);
  }
}
function Ua(e, t, s, a, n, i = e.player) {
  const o = [t];
  if (X(n, i, t)) {
    C(s, "conductor") && o.push(...e.enemies.filter((d) => d.id !== t.id && d.hp > 0 && B(d, t) < 4.5 && X(n, t, d)).sort((d, r) => B(d, t) - B(r, t)).slice(0, C(s, "conductor") + 1));
    for (const d of o)
      pe(e, d, "lightning"), Le(e, d, a, s, "lightning", n ? d === t ? i : t : e.player, n);
  }
}
function ss(e, t, s) {
  const a = e.player, n = a.guard > 0;
  a.resource = Math.min(100, a.resource + (n ? 25 : 8)), pe(e, a, n ? "parry" : "block", n ? 2 : 1, a.facing), n && (a.skill = Math.max(35, a.skill - 15));
  const i = C(t, "riposte"), o = C(t, "thorns");
  if (i || o)
    for (const d of e.enemies) B(d, a) < 3.2 + i * 0.3 && X(s, a, d) && (Le(e, d, (n ? 20 : 8) * i + 9 * o, t, "passive", a, s), rt(e, d, n ? 20 : 7));
}
function ua(e, t, s, a) {
  const n = e.player;
  if (n.invulnerable > 0 || n.hp <= 0) return;
  if (n.shield > 0) {
    ss(e, s, a), n.invulnerable = n.guard > 0 ? 8 : 4;
    return;
  }
  let i = t * Rt[s.weapon].guard * (C(s, "blood-price") ? ze.bloodHurt : 1) * (C(s, "gambit") ? 1.2 : 1);
  const o = Math.min(n.ward, i);
  if (n.ward -= o, i -= o, n.hp <= i && C(s, "last-stand") && !n.rescues) {
    n.rescues++, n.hp = 15 + C(s, "last-stand") * 8, n.invulnerable = 60, pe(e, n, o > 0 ? "ward-break" : "guard", 3);
    return;
  }
  if (n.hp = Math.max(0, n.hp - i), e.damageTaken += i, n.invulnerable = 18, n.lastHit = e.tick, pe(e, n, o > 0 ? n.ward > 0 ? "ward-hit" : "ward-break" : "hit"), C(s, "thorns"))
    for (const d of e.enemies) B(d, n) < 3 && Le(e, d, 10 * C(s, "thorns"), s, "passive", n, a);
}
function Bt(e, t, s = 45) {
  e.ward += Math.max(0, Math.min(t, s - e.ward));
}
function Rn(e, t, s, a = !1, n) {
  const i = Rt[t.weapon], o = e.player, d = fe(o, s), r = (a ? 0.6 : 1) * (C(t, "gambit") ? 1 + C(t, "gambit") * 0.12 : 1);
  if (o.facing = d, o.swing = t.weapon === "cannon" ? 15 : 8, t.weapon === "blade" || t.weapon === "daggers") {
    const h = i.range + C(t, "piercing") * 0.25;
    pe(e, o, "slash", h, d);
    for (const v of e.enemies)
      B(o, v) > h + de[v.kind].radius || Math.cos(fe(o, v) - d) < -0.1 || !X(n, o, v) || (Le(e, v, i.damage * r, t, "attack", o, n), t.weapon === "blade" && !a && o.combo % 3 === 2 && rt(e, v, 14));
    t.weapon === "blade" && (o.resource = Math.min(100, o.resource + 9), C(t, "cleave-wave") && o.combo % 3 === 2 && st(e, o, d, 14 * C(t, "cleave-wave"), !0, {
      pierce: 5,
      radius: 0.4,
      speed: 0.3,
      source: "passive"
    }));
    return;
  }
  let c = i.damage * r;
  C(t, "distance-draw") && (c *= 1 + Math.min(1, B(o, s) / 8) * 0.15 * C(t, "distance-draw")), t.weapon === "staff" && (o.resource = Math.min(100, o.resource + 18)), t.weapon === "grimoire" && (o.resource = Math.min(Ke.maxPower, o.resource + 12));
  const l = C(t, "piercing") * ze.extraPierce + C(t, "railgun") * 2, u = st(e, o, d, c, !0, {
    pierce: l,
    speed: t.weapon === "bow" ? 0.38 : 0.28,
    splash: t.weapon === "staff" ? 1.4 : t.weapon === "cannon" ? 1.8 + C(t, "shrapnel") * 0.3 : 0,
    bounce: C(t, "ricochet"),
    radius: t.weapon === "cannon" ? 0.3 : 0.16
  });
  if (t.weapon === "bow" && C(t, "split-arrow") && o.combo % 3 === 2) for (const h of [-0.18, 0.18]) st(e, o, d + h, c * (0.35 + C(t, "split-arrow") * 0.1), !0, {
    speed: u.speed,
    pierce: l
  });
}
function lr(e, t, s, a) {
  const n = e.player, i = Rt[t.weapon], o = C(t, "focus");
  switch (n.skill = Math.round(i.skillCooldown * (o ? ze.focusSkill - (o - 1) * 0.06 : 1)), C(t, "aegis") && (n.shield = 18 + C(t, "aegis") * 6, n.guard = 8, Bt(n, C(t, "aegis") * 6)), t.weapon) {
    case "blade": {
      n.shield = 26 + C(t, "aegis") * 6, n.guard = 9;
      const d = 1 + n.resource / 100;
      n.resource = 0, pe(e, n, "slash", 3.6, n.facing);
      for (const r of e.enemies)
        r.hp <= 0 || B(n, r) > 3.6 + de[r.kind].radius || !X(a, n, r) || (C(t, "shield-break") && (r.exposed = Math.max(r.exposed, 70 + 30 * C(t, "shield-break"))), Le(e, r, i.skill * d, t, "skill", n, a), rt(e, r, 40), we(r.kind) || Be(e, r, fe(n, r), 1.5, de[r.kind].radius, a));
      C(t, "valor") && Bt(n, 12 * C(t, "valor") * d);
      break;
    }
    case "bow":
      for (let d = -2; d <= 2; d++) st(e, n, n.facing + d * 0.15, i.skill, !0, {
        pierce: 6,
        speed: 0.42,
        source: "skill"
      });
      Be(e, n, n.facing + Math.PI, 0.85, V.playerRadius, a);
      break;
    case "staff": {
      const d = s ?? n, r = 1 + n.resource / 125;
      if (n.resource = 0, C(t, "convergence"))
        for (const c of e.enemies) B(c, d) < 4 + C(t, "convergence") && X(a, d, c) && Be(e, c, fe(c, d), 1.2, de[c.kind].radius, a);
      for (let c = 0; c < 3; c++) {
        const l = De(d, c * mt / 3, 0.7);
        ue(e, X(a, d, l) ? l : d, "slam", 2.3, 10 + c * 10, 1, i.skill * r, !0, { source: "skill" });
      }
      if (C(t, "nova")) {
        ue(e, n, "frost", 3 + C(t, "nova") * 0.5, 0, 32, 6 * C(t, "nova"), !0, { source: "skill" });
        for (const c of e.enemies) B(n, c) < 3.5 && X(a, n, c) && (c.chill = 120, rt(e, c, 25));
      }
      break;
    }
    case "daggers":
      if (n.invulnerable = Math.max(n.invulnerable, 12), s) {
        const d = De(s, s.angle + Math.PI, de[s.kind].radius + 0.55);
        Be(e, n, fe(n, d), Math.min(5, B(n, d)), V.playerRadius, a), n.facing = fe(n, s), X(a, n, s) && (!a || B(n, s) <= i.range + de[s.kind].radius) && (s.exposed = Math.max(s.exposed, 60), Le(e, s, i.skill, t, "skill", n, a), rt(e, s, 20)), pe(e, n, "slash", 2, n.facing);
      }
      C(t, "shadowstep") && Za(e, "shade", n, 95 + C(t, "shadowstep") * 30, C(t, "shadowstep"));
      break;
    case "grimoire": {
      const d = n.resource;
      n.resource = 0, n.resonance = Ke.resonanceTicks + d, pe(e, n, "resonance", 2);
      for (const r of e.companions) r.kind === "familiar" && r.hp > 0 && r.life > 0 && (r.hp = Math.max(r.hp, Ke.familiarHp), r.cooldown = 0);
      s && (s.exposed = Math.max(s.exposed, 100), Le(e, s, i.skill + d * 0.3, t, "skill", n, a)), C(t, "command") && ue(e, s ?? n, "storm", 2.4 + C(t, "command") * 0.3, 10, 65, 7 * C(t, "command"), !0, { source: "skill" });
      break;
    }
    case "cannon": {
      const d = 1 + (C(t, "overclock") >= 2 ? 1 : 0), r = e.companions.filter((c) => c.kind === "turret");
      r.length >= d && (r[0].life = 0), Za(e, "turret", ts(a, n, De(n, n.facing, 0.9)), 240 + C(t, "overclock") * 45, C(t, "overclock")), C(t, "bunker") && Bt(n, 15 * C(t, "bunker"));
      break;
    }
  }
}
function cr(e, t, s, a) {
  const n = e.player, i = C(s, "quicksilver");
  if (n.dash = Math.round(V.dashCooldown * (1 - i * 0.08)), n.dashTime = V.dashTicks, n.dashAngle = t.move ? Ja(t.move) : n.facing, n.invulnerable = V.dashTicks + 2, C(s, "storm-step") && ue(e, n, "storm", 1.7 + C(s, "storm-step") * 0.15, 0, 70, 6 + C(s, "storm-step") * 3, !0), C(s, "trapper") && ue(e, n, "frost", 1.8, 12, 110, 5 * C(s, "trapper"), !0), C(s, "minefield") && ue(e, n, "mine", 2 + C(s, "minefield") * 0.2, 12, 180, 25 * C(s, "minefield"), !0), C(s, "smoke")) {
    for (const o of e.enemies) B(o, n) < 3 + C(s, "smoke") * 0.4 && X(a, n, o) && (rt(e, o, 30 + C(s, "smoke") * 8), o.exposed = Math.max(o.exposed, 65));
    pe(e, n, "guard", 3);
  }
}
function dr(e, t, s, a) {
  const n = e.player;
  for (const c of [
    "attack",
    "dash",
    "skill",
    "invulnerable",
    "swing",
    "shield",
    "guard"
  ]) n[c] = Math.max(0, n[c] - 1);
  const i = e.enemies.filter((c) => c.hp > 0 && X(a, n, c)).sort((c, l) => B(n, c) - B(n, l))[0];
  t.dash && !n.dash && !n.dashTime && cr(e, t, s, a);
  const o = {
    x: n.x,
    y: n.y
  };
  if (n.dashTime > 0)
    Be(e, n, n.dashAngle, V.speed * 3.6, V.playerRadius, a), n.dashTime--, !n.dashTime && C(s, "momentum") && i && B(n, i) < 3 && Ua(e, i, s, 10 + C(s, "momentum") * 5, a);
  else if (t.move) {
    n.facing = Ja(t.move);
    const c = n.swing > 0;
    let l = V.speed * (c ? Rt[s.weapon].moveFire : 1);
    C(s, "quicksilver") && n.dash > V.dashCooldown / 2 && (l *= 1 + C(s, "quicksilver") * 0.1), e.hazards.some((u) => !u.friendly && u.kind === "frost" && !u.wait && B(u, n) < u.radius && X(a, u, n)) && (l *= 0.65), Be(e, n, n.facing, l, V.playerRadius, a);
  }
  n.travel += B(o, n), C(s, "pilgrim") && n.travel >= 28 && (n.travel -= 28, Bt(n, C(s, "pilgrim") * 6, 35)), C(s, "wardstone") && e.tick - n.lastHit > 150 && e.tick % 30 === 0 && Bt(n, 2, C(s, "wardstone") * 10);
  const d = i && X(a, n, i) ? i : void 0;
  t.skill && !n.skill && (d && (n.facing = fe(n, d)), lr(e, s, d, a));
  const r = Rt[s.weapon].range + (s.weapon === "blade" || s.weapon === "daggers" ? C(s, "piercing") * 0.25 : 0);
  if (d && !n.attack && B(n, d) <= r + de[d.kind].radius && (Rn(e, s, d, !1, a), n.combo++, C(s, "echo") && n.combo % Math.max(2, ze.echoEvery + 1 - C(s, "echo")) === 0 && Rn(e, s, d, !0, a), n.attack = Math.round(Rt[s.weapon].period * (C(s, "focus") ? ze.focusAttack : 1))), C(s, "orbit") && e.tick % Math.round(ze.orbitTicks / (1 + C(s, "orbit") * 0.25)) === 0 && i && B(n, i) < 4.5 && Ua(e, i, s, 12 + C(s, "orbit") * 3, a), C(s, "orbitals") && e.tick % 35 === 0) {
    for (const c of e.enemies) B(n, c) < 2.5 + C(s, "orbitals") * 0.35 && X(a, n, c) && (Le(e, c, 12 * C(s, "orbitals"), s, "passive", n, a), c.chill = Math.max(c.chill, 30));
    pe(e, n, "burst", 2.8);
  }
  return {
    x: n.x - o.x,
    y: n.y - o.y
  };
}
function ur(e, t, s) {
  if (e.player.resonance = Math.max(0, e.player.resonance - 1), t.weapon === "grimoire" && e.tick % 45 === 1) {
    const a = 2 + C(t, "pack-bond");
    e.companions.filter((n) => n.kind === "familiar" && n.hp > 0 && n.life > 0).length < a && Za(e, "familiar", ts(s, e.player, De(e.player, e.tick, 1)), 36e3);
  }
  for (const a of e.companions) {
    a.life--, a.cooldown = Math.max(0, a.cooldown - 1);
    const n = e.enemies.filter((o) => o.hp > 0 && (a.kind !== "turret" || X(s, a, o))).sort((o, d) => B(o, a) - B(d, a))[0];
    if (a.hp <= 0 || a.life <= 0 || !n) continue;
    if (a.angle = fe(a, n), a.kind !== "turret") {
      const o = B(a, e.player) > 8;
      if (o || B(a, n) > 1.3 || !X(s, a, n)) {
        const d = as(s, a, o ? e.player : n, 0.25);
        d !== null && Be(e, a, d, o ? 0.19 : 0.14 + C(t, "frenzy") * 0.015, 0.25, s);
      }
    }
    const i = a.kind === "turret" ? 8 : 1.8;
    if (!a.cooldown && B(a, n) < i && X(s, a, n)) if (a.kind === "turret")
      st(e, a, a.angle, Rt.cannon.skill * (1 + a.empowered * 0.15), !0, {
        source: "companion",
        speed: 0.35
      }), a.cooldown = 28 - a.empowered * 3;
    else {
      const o = a.kind === "familiar" && e.player.resonance > 0;
      Le(e, n, a.kind === "shade" ? 9 + a.empowered * 4 : (o ? Ke.empoweredDamage : Ke.damage) * (1 + C(t, "covenant") * 0.15), t, "companion", a, s), pe(e, a, "slash", 1.2, a.angle);
      const d = a.kind === "shade" ? 32 : o ? Ke.empoweredAttackTicks : Ke.attackTicks;
      a.cooldown = Math.round(d / (1 + C(t, "frenzy") * 0.18));
    }
  }
  for (const a of e.companions) a.hp <= 0 && a.kind === "familiar" && C(t, "martyr") && (ns(e, C(t, "martyr")), ue(e, a, "slam", 2.2, 0, 1, 15 * C(t, "martyr"), !0));
  e.companions = e.companions.filter((a) => a.hp > 0 && a.life > 0);
}
var pt = Object.freeze({
  ritualTicks: 330,
  survivalTicks: 1500,
  pursuitInterval: 390,
  reinforcementInterval: 270,
  warningAfter: 1800
}), ia = [
  {
    x: -4,
    y: 0
  },
  {
    x: 4,
    y: -3
  },
  {
    x: 0,
    y: 4
  }
];
function aa(e, t, s) {
  if (e.wave++, s) {
    for (const i of s.waves[e.wave - 1]) Se(e, i.kind, i.position);
    return;
  }
  if (e.boss) {
    Se(e, e.bossKind, {
      x: 0,
      y: -5
    });
    return;
  }
  const a = Js[e.zone].mobs, n = 4 + e.chapter + (e.elite ? 2 : 0) + (t.oaths.includes("legion") ? 2 : 0);
  for (let i = 0; i < n; i++) {
    const o = mt * i / n + (e.wave - 1) * 0.8;
    let d = a[(i + e.wave - 1) % a.length];
    e.wave === 1 && e.chapter === 0 && i < 2 && (d = a[0]), e.encounter === "pursuit" && i === 0 && (d = "stalker"), e.encounter === "siege" && i === 0 && (d = "guard"), Se(e, d, {
      x: Math.cos(o) * 8.7,
      y: Math.sin(o) * 8.7
    });
  }
}
function hr(e, t, s) {
  if (e.boss) return;
  const a = e.objective, n = e.enemies.some((i) => i.hp > 0);
  if (e.encounter === "ritual") {
    a.progress < a.target && B(e.player, a) < 2.5 && !e.enemies.some((o) => o.hp > 0 && B(o, a) < 2.2) && a.progress++;
    const i = Math.min(2, Math.floor(a.progress / pt.ritualTicks));
    a.x = ia[i].x, a.y = ia[i].y, e.tick % pt.reinforcementInterval === 0 && a.progress < a.target && e.enemies.length < 8 && Se(e, e.chapter ? "wisp" : "stalker", {
      x: a.x > 0 ? -9 : 9,
      y: da(e) * 12 - 6
    });
  } else if (e.encounter === "survival")
    a.progress = Math.min(a.target, a.progress + 1), e.tick % pt.reinforcementInterval === 0 && a.progress < a.target && e.enemies.length < 10 && aa(e, t), e.tick % 150 === 0 && ue(e, {
      x: 0,
      y: 0
    }, "ring", 15, 35, 90, 12, !1, { inner: Math.max(4.8, 9 - e.tick / 400) });
  else if (e.encounter === "pursuit")
    a.progress = e.tick % pt.pursuitInterval, e.wave < e.waves && a.progress === 0 && aa(e, t);
  else if (e.encounter === "crossfire" && e.tick % 150 === 0) {
    const i = e.tick % 300 === 0, o = Math.round((i ? e.player.y : e.player.x) / 3) * 3;
    Me(e, i ? {
      x: -10,
      y: o
    } : {
      x: o,
      y: -10
    }, i ? 0 : Math.PI / 2, 20, 0.65, 36, 15);
  }
  e.tick > pt.warningAfter && e.tick % 180 === 0 && ue(e, e.player, "fire", 2.2, 36, 90, 13), !n && e.wave < e.waves && e.encounter !== "survival" ? ++e.nextWave >= 40 && (e.nextWave = 0, aa(e, t, s)) : n && (e.nextWave = 0);
}
function fr(e) {
  return e.enemies.some((t) => t.hp > 0) ? !1 : !e.boss && e.encounter === "survival" ? e.objective.progress >= e.objective.target : !e.boss && e.encounter === "ritual" ? e.objective.progress >= e.objective.target && e.wave >= e.waves : e.wave >= e.waves;
}
function pr(e) {
  const t = e.objective;
  e.encounter === "ritual" && (Object.assign(t, ia[0]), t.target = pt.ritualTicks * ia.length), e.encounter === "survival" && (t.target = pt.survivalTicks), e.encounter === "pursuit" && (t.target = pt.pursuitInterval);
}
var Et = (e, t) => {
  e.motion = t, e.motionAngle = fe(e, e.target), e.stun = 18;
}, mr = {
  warden(e, t, s) {
    const a = t.pattern % 3, n = Oa.warden.damage;
    if (a === 0)
      Et(t, 24), Me(e, t, t.motionAngle, 13, 1.1, 18, n);
    else if (a === 1) {
      for (let i = -1; i <= 1; i++) Ge(e, De(t, t.angle + i * 0.55, 3.5), 1.8, 12 + Math.abs(i) * 8, n);
      t.exposed = Math.max(t.exposed, 65);
    } else
      tt(e, t, t.angle, 5 + t.phase * 2, 1.5, n * 0.65), t.phase > 1 && Se(e, "guard", {
        x: -7,
        y: -7
      }, s);
  },
  thornheart(e, t, s) {
    const a = t.pattern % 4;
    if (a === 0) for (let n = 0; n < 5; n++) ue(e, De(t.target, n * mt / 5, 3.6), "poison", 1.4, 26, 110, 12);
    else if (a === 1)
      ue(e, t, "ring", 7.5, 25, 14, 22, !1, { inner: 3 }), t.exposed = Math.max(t.exposed, 80);
    else if (a === 2) for (const n of [-7, 7]) Se(e, "stalker", {
      x: n,
      y: -6
    }, s);
    else for (let n = 0; n < 3 + t.phase; n++) Me(e, t, t.angle + n * mt / (3 + t.phase), 15, 0.55, 25, 18);
  },
  weaver(e, t) {
    const s = t.pattern % 4;
    if (s === 0)
      t.x = t.target.x > 0 ? -7 : 7, t.y = -5, pe(e, t, "burst", 2), Me(e, {
        x: -10,
        y: t.target.y
      }, 0, 20, 0.7, 30, 21), Me(e, {
        x: t.target.x,
        y: -10
      }, Math.PI / 2, 20, 0.7, 42, 21);
    else if (s === 1) tt(e, t, fe(t, e.player), 7 + t.phase, 1.8, 13, 0.2);
    else if (s === 2) {
      for (let a = 0; a < 4; a++) {
        const n = De({
          x: 0,
          y: 0
        }, a * Math.PI / 2 + Math.PI / 4, 7);
        Me(e, n, fe(n, {
          x: 0,
          y: 0
        }), 11, 0.6, 25 + a * 8, 18);
      }
      t.exposed = Math.max(t.exposed, 75);
    } else
      Se(e, "wisp", {
        x: -7,
        y: 5
      }), Se(e, "wisp", {
        x: 7,
        y: 5
      });
  },
  astrologer(e, t) {
    const s = t.pattern % 3, a = t.pattern * 0.53;
    if (s === 0) for (let n = 0; n < 7; n++)
      n !== t.phase && Me(e, t, a + n * mt / 7, 18, 0.6, 32, 23);
    else if (s === 1) for (let n = 0; n < 6; n++) {
      const i = De({
        x: 0,
        y: 0
      }, n * mt / 6, 9);
      tt(e, i, fe(i, t.target), 2 + t.phase, 0.45, 12, 0.16);
    }
    else
      Ge(e, t.target, 2, 18, 24), ue(e, {
        x: 0,
        y: 0
      }, "ring", 10.5, 38, 12, 22, !1, { inner: 5.5 }), t.exposed = Math.max(t.exposed, 90);
  },
  king(e, t) {
    const s = t.pattern % 4;
    if (s === 0)
      Et(t, 18), Me(e, t, t.motionAngle, 10, 0.9, 18, 24);
    else if (s === 1) for (let a = 0; a < 2 + t.phase; a++) Ge(e, De(t, t.angle + (a % 2 ? 0.65 : -0.65), 3), 2, 7 + a * 10, 23);
    else s === 2 ? (Me(e, {
      x: -10,
      y: 0
    }, 0, 20, 0.8, 22, 26), Me(e, {
      x: 0,
      y: -10
    }, Math.PI / 2, 20, 0.8, 35, 26), t.exposed = Math.max(t.exposed, 65)) : (tt(e, t, t.angle, 3, 0.55, 18, 0.29), t.phase > 1 && (Se(e, "stalker", {
      x: -8,
      y: 3
    }), Se(e, "archer", {
      x: 8,
      y: -3
    })));
  },
  phoenix(e, t) {
    const s = t.pattern % 4;
    if (s === 0) {
      Et(t, 28);
      for (let a = 0; a < 6; a++) ue(e, De(t, t.motionAngle, a * 2), "fire", 1.2, 20 + a * 4, 95, 13);
    } else if (s === 1) Sn(e, t, 10 + t.phase * 2, t.pattern * 0.32, 13, 0.17);
    else if (s === 2)
      t.x = 0, t.y = 0, ue(e, t, "ring", 9, 30, 15, 25, !1, { inner: 3.5 }), t.exposed = Math.max(t.exposed, 85);
    else for (const a of [{
      x: -6,
      y: -5
    }, {
      x: 6,
      y: 5
    }]) Se(e, "bomber", a);
  },
  forgemaster(e, t) {
    const s = t.pattern % 4;
    if (s === 0) for (const a of [
      -7,
      0,
      7
    ]) Me(e, {
      x: a,
      y: -10
    }, Math.PI / 2, 20, 1.1, 26, 24);
    else if (s === 1) for (let a = -1; a <= 1; a++) ue(e, {
      x: t.target.x + a * 2.5,
      y: t.target.y
    }, "fire", 1.6, 28 + Math.abs(a) * 7, 100, 14);
    else s === 2 ? (Ge(e, t, 4, 18, 26), t.exposed = Math.max(t.exposed, 100)) : (Se(e, "bomber", {
      x: -8,
      y: 5
    }), t.phase > 1 && Se(e, "guard", {
      x: 8,
      y: 5
    }));
  },
  colossus(e, t) {
    const s = t.pattern % 3;
    if (s === 0) for (let a = 0; a < 3; a++) ue(e, t, "ring", 3 + a * 3, 20 + a * 19, 9, 23, !1, { inner: 1.4 + a * 3 });
    else if (s === 1)
      Et(t, 30), Me(e, t, t.motionAngle, 18, 1.4, 18, 27);
    else {
      for (const a of [-1, 1]) Ge(e, {
        x: t.target.x + a * 2,
        y: t.target.y
      }, 2.7, 30, 25);
      t.exposed = Math.max(t.exposed, 110);
    }
  },
  frostqueen(e, t) {
    const s = t.pattern % 4;
    if (s === 0) for (let a = 0; a < 4; a++) ue(e, De(t.target, a * Math.PI / 2, 3), "frost", 1.8, 24, 100, 10);
    else s === 1 ? tt(e, t, t.angle, 9, 2.2, 14, 0.21) : s === 2 ? (t.x = -t.x, t.y = -t.y, Me(e, t, fe(t, t.target), 20, 1.2, 32, 24), t.exposed = Math.max(t.exposed, 85)) : (ue(e, {
      x: 0,
      y: 0
    }, "ring", 10.5, 32, 18, 22, !1, { inner: 5 }), Se(e, "stalker", {
      x: 0,
      y: -8
    }));
  },
  leviathan(e, t) {
    const s = t.pattern % 4;
    if (s === 0)
      t.x = -9, t.y = t.target.y, t.target = {
        x: 9,
        y: t.y
      }, Et(t, 40), Me(e, t, 0, 19, 1.4, 14, 25);
    else if (s === 1) for (let a = 0; a < 4; a++) Me(e, {
      x: -10,
      y: -8 + a * 5
    }, 0, 20, 0.7, 20 + a * 13, 20);
    else s === 2 ? (Ge(e, t.target, 3.8, 28, 26), t.exposed = Math.max(t.exposed, 95)) : (ue(e, {
      x: 0,
      y: 0
    }, "ring", 10, 26, 14, 23, !1, { inner: t.phase > 1 ? 4 : 6 }), tt(e, t, t.angle, 5, 1.3, 14));
  },
  archivist(e, t) {
    const s = t.pattern % 4;
    if (s === 0)
      t.memory.push({ ...t.target }), t.memory = t.memory.slice(-4), Ge(e, t.target, 2.3, 24, 21);
    else if (s === 1) for (let a = 0; a < t.memory.length; a++) Ge(e, t.memory[a], 2.6, 22 + a * 8, 24);
    else if (s === 2) {
      for (const a of t.memory) Me(e, a, fe(a, t.target), 18, 0.65, 32, 22);
      Se(e, "wisp", {
        x: -7,
        y: -7
      }), Se(e, "wisp", {
        x: 7,
        y: 7
      });
    } else
      Sn(e, t, 12, t.pattern * 0.2, 14), t.exposed = Math.max(t.exposed, 100);
  },
  voidknight(e, t) {
    const s = t.pattern % 4;
    if (s === 0)
      t.x = Math.max(-8, Math.min(8, -t.target.x)), t.y = Math.max(-8, Math.min(8, -t.target.y)), pe(e, t, "burst", 2), Me(e, t, fe(t, t.target), 20, 0.8, 24, 26);
    else if (s === 1)
      Et(t, 20), tt(e, t, t.angle, 3 + t.phase, 0.9, 15, 0.26);
    else if (s === 2)
      Ge(e, t, 3, 12, 26), ue(e, t, "ring", 7, 30, 10, 22, !1, { inner: 3.5 }), t.exposed = Math.max(t.exposed, 65);
    else for (const a of [{
      x: t.target.x,
      y: -9
    }, {
      x: -9,
      y: t.target.y
    }]) Me(e, a, fe(a, t.target), 20, 0.6, 22, 23);
  }
};
function vr(e, t, s, a) {
  const n = t.kind;
  for (; t.phase < (t.hp / t.maxHp < 0.3 ? 3 : t.hp / t.maxHp < 0.65 ? 2 : 1); ) {
    const i = t.phase + 1;
    t.phase = i, pe(e, t, "burst", 4), n === "phoenix" && i === 2 && (t.hp = Math.min(t.maxHp, t.hp + t.maxHp * 0.12), ue(e, t, "fire", 3, 25, 100, 14)), n === "archivist" && (t.memory.push({
      x: e.player.x,
      y: e.player.y
    }), t.memory = t.memory.slice(-4)), s.oaths.includes("legion") && Se(e, "stalker", {
      x: t.x > 0 ? -8 : 8,
      y: 6
    }, a);
  }
  mr[n](e, t, a), t.pattern++;
}
function gr(e, t, s) {
  if (!we(t.kind)) {
    const a = e.companions.filter((n) => n.hp > 0 && n.life > 0 && B(n, t) < 2.8 && X(s, t, n)).sort((n, i) => B(n, t) - B(i, t))[0];
    if (a) return a;
    if (e.encounter === "siege" && !e.boss && (t.kind === "soldier" || t.kind === "guard" || t.kind === "charger") && B(t, e.player) > 3) return e.objective;
  }
  return e.player;
}
function yr(e, t, s, a, n) {
  const i = de[t.kind];
  B(t.target, e.player) < a && B(t, e.player) < i.reach + 1 && X(n, t, e.player) && ua(e, i.damage, s, n);
  for (const o of e.companions) B(t.target, o) < a && B(t, o) < i.reach + 1 && X(n, t, o) && (o.hp -= i.damage);
  !e.boss && e.encounter === "siege" && B(t.target, e.objective) < a && B(t, e.objective) < i.reach + 1 && (e.objective.hp = Math.max(0, e.objective.hp - i.damage * 0.5)), pe(e, t.target, "slash", a, t.angle);
}
function br(e, t, s, a) {
  const n = de[t.kind];
  if (we(t.kind)) {
    vr(e, t, s, a);
    return;
  }
  switch (t.kind) {
    case "archer":
      tt(e, t, t.angle, e.chapter > 0 ? 3 : 2, 0.36, n.damage, 0.24);
      break;
    case "priest":
      for (const i of e.enemies) i.hp > 0 && !we(i.kind) && B(i, t) < 3.5 && X(a, t, i) && (i.hp = Math.min(i.maxHp, i.hp + 8));
      tt(e, t, t.angle, 3, 0.7, n.damage, 0.18), pe(e, t, "heal", 3.5);
      break;
    case "charger":
      t.motion = 23, t.motionAngle = t.angle;
      break;
    case "bomber":
      ue(e, t.target, "fire", 1.9, 23, 75, n.damage);
      break;
    case "wisp":
      st(e, t, t.angle, n.damage, !1, { speed: 0.3 }), t.motion = 7, t.motionAngle = t.angle + Math.PI / 2;
      break;
    case "guard":
      Ge(e, t.target, 1.7, 8, n.damage);
      break;
    default:
      yr(e, t, s, n.reach + 0.15, a);
  }
}
function wr(e, t, s, a) {
  const n = de[t.kind], i = {
    x: t.x,
    y: t.y
  }, o = t.kind === "leviathan" ? 0.44 : t.kind === "wisp" ? 0.24 : 0.32;
  if (Be(e, t, t.motionAngle, o, n.radius, a), t.motion--, t.kind !== "wisp") {
    B(t, e.player) < n.radius + 0.4 && X(a, t, e.player) && ua(e, n.damage, s, a);
    for (const d of e.companions) B(t, d) < n.radius + 0.3 && X(a, t, d) && (d.hp -= n.damage, t.motion = 0);
    !e.boss && e.encounter === "siege" && B(t, e.objective) < n.radius + 0.6 && (e.objective.hp = Math.max(0, e.objective.hp - n.damage * 0.5), t.motion = 0), B(i, t) < o * 0.65 && (t.motion = 0, t.exposed = Math.max(t.exposed, 80), t.stun = 24, pe(e, t, "guard", 2));
  }
  t.motion || (t.cooldown = Math.max(t.cooldown, 28));
}
function xr(e, t, s, a) {
  for (const n of [...e.enemies]) {
    if (n.hp <= 0) continue;
    for (const u of [
      "marked",
      "chill",
      "exposed"
    ]) n[u] = Math.max(0, n[u] - 1);
    for (const u of [
      "burn",
      "bleed",
      "poison"
    ]) n[u] > 0 && (n[u]--, e.tick % 15 === 0 && Le(e, n, 2 + (u === "burn" ? C(t, "cinder") + C(t, "inferno") : u === "bleed" ? C(t, "hemorrhage") + C(t, "blood-dance") : C(t, "venom")) * 1.5, t, "passive", a ? n : e.player, a));
    if (n.hp <= 0) continue;
    if (n.stun > 0) {
      n.stun--;
      continue;
    }
    if (n.motion > 0) {
      wr(e, n, t, a);
      continue;
    }
    const i = de[n.kind], o = t.oaths.includes("haste");
    if (n.windup > 0) {
      --n.windup === 0 && (br(e, n, t, a), n.cooldown = Math.round(i.cooldown * (o ? 0.8 : 1) / (we(n.kind) ? 1 + (n.phase - 1) * 0.12 : 1)));
      continue;
    }
    const d = gr(e, n, a), r = B(n, d), c = X(a, n, d);
    if (n.cooldown = Math.max(0, n.cooldown - 1), n.angle = fe(n, d), !n.cooldown && r < i.reach && c) {
      if (n.target = {
        x: d.x,
        y: d.y
      }, n.windup = Math.round(i.windup * (o ? 0.8 : 1)), d === e.player && (n.kind === "archer" || n.kind === "bomber")) {
        const u = n.kind === "bomber" ? 23 : r / 0.24, h = Math.min(n.windup + u, 4.5 / Math.max(1e-3, Math.hypot(s.x, s.y))), v = {
          x: d.x + s.x * h,
          y: d.y + s.y * h
        };
        a ? X(a, n, v) && X(a, d, v) && (n.target = v) : (n.target.x = Math.max(-10, Math.min(10, v.x)), n.target.y = Math.max(-10, Math.min(10, v.y))), n.angle = fe(n, n.target);
      }
      continue;
    }
    const l = n.kind === "archer" || n.kind === "priest" || n.kind === "bomber" || n.kind === "wisp";
    if (r > (l ? 5 : we(n.kind) ? 2.8 : 0.95) || l && r < 3 || !c) {
      const u = n.kind === "stalker" && r > 3 ? n.id % 2 ? 0.28 : -0.28 : 0, h = as(a, n, d, i.radius);
      h !== null && Be(e, n, h + (l && r < 3 && c ? Math.PI : a ? 0 : u), i.speed * (n.chill ? we(n.kind) ? 0.8 : 0.5 : 1) * (o ? 1.08 : 1), i.radius, a);
    }
    for (const u of e.enemies) u.id !== n.id && u.hp > 0 && B(n, u) < i.radius + de[u.kind].radius && Be(e, n, fe(u, n), 0.027, i.radius, a);
  }
}
function ta(e, t, s) {
  if (e.kind === "beam") return rr(t, e, e.angle, e.length) < e.width + s;
  const a = B(e, t);
  return a < e.radius + s && (e.kind !== "ring" || a > e.inner - s);
}
function Mr(e, t, s) {
  for (const a of e.shots) {
    if (a.life <= 0) continue;
    const n = {
      x: a.x,
      y: a.y
    };
    if (a.x += Math.cos(a.angle) * a.speed, a.y += Math.sin(a.angle) * a.speed, a.life--, s ? !X(s, n, a, a.radius) : Math.abs(a.x) > V.arena || Math.abs(a.y) > V.arena || e.obstacles.some((i) => B(i, a) < i.radius + a.radius)) {
      a.life = 0;
      continue;
    }
    if (!a.friendly) {
      if (B(a, e.player) < V.playerRadius + a.radius && X(s, a, e.player)) e.player.shield > 0 ? (ss(e, t, s), a.friendly = !0, a.source = "skill", a.angle += Math.PI, a.damage *= 1.8, a.hits = []) : (ua(e, a.damage, t, s), a.life = 0);
      else {
        const i = e.companions.find((o) => o.hp > 0 && B(a, o) < 0.3 + a.radius && X(s, a, o));
        i && (i.hp -= a.damage * (1 - C(t, "covenant") * 0.12), a.life = 0);
      }
      continue;
    }
    for (const i of e.enemies) {
      if (i.hp <= 0 || a.hits.includes(i.id) || B(i, a) > de[i.kind].radius + a.radius || !X(s, a, i)) continue;
      a.hits.push(i.id);
      const o = a.damage * (C(t, "hunter") && B(i, e.player) > ze.hunterRange ? ze.hunterDamage + (C(t, "hunter") - 1) * 0.15 : 1);
      if (Le(e, i, o, t, a.source, a, s), C(t, "pinning") && a.source === "attack" && (i.chill = 50 + C(t, "pinning") * 20, e.player.combo % 3 === 0 && rt(e, i, 8 * C(t, "pinning"))), a.splash > 0) {
        pe(e, i, "burst", a.splash);
        for (const d of e.enemies) d.id !== i.id && B(d, i) < a.splash + de[d.kind].radius && Le(e, d, o * 0.55, t, a.source, i, s);
      }
      if (a.bounce > 0) {
        const d = e.enemies.filter((r) => r.hp > 0 && !a.hits.includes(r.id) && B(r, i) < 6 && X(s, a, r, a.radius)).sort((r, c) => B(i, r) - B(i, c))[0];
        if (d) {
          a.bounce--, a.angle = fe(a, d), a.damage *= 0.8;
          break;
        }
      }
      if (a.pierce-- <= 0) {
        a.life = 0;
        break;
      }
    }
  }
  e.shots = e.shots.filter((a) => a.life > 0);
}
function kr(e, t, s) {
  for (const a of [...e.hazards]) {
    if (a.wait > 0) {
      a.wait--;
      continue;
    }
    if (a.life--, !a.friendly) {
      ta(a, e.player, V.playerRadius) && X(s, a, e.player) && ua(e, a.damage, t, s), !e.boss && e.encounter === "siege" && e.tick % 15 === 0 && ta(a, e.objective, 0.6) && X(s, a, e.objective) && (e.objective.hp = Math.max(0, e.objective.hp - a.damage * 0.35));
      const i = a.kind === "slam" || a.kind === "beam" || a.kind === "ring";
      if (i || e.tick % 15 === 0)
        for (const o of e.companions) o.hp > 0 && (!i || !a.hits.includes(o.id)) && ta(a, o, 0.3) && X(s, a, o) && (o.hp -= a.damage * 0.25, i && a.hits.push(o.id));
      continue;
    }
    if (a.kind !== "slam" && a.kind !== "mine" && e.tick % 15 !== 0) continue;
    const n = e.enemies.filter((i) => i.hp > 0 && ta(a, i, de[i.kind].radius) && X(s, a, i));
    a.kind === "mine" && n.length && (a.life = 0, pe(e, a, "burst", a.radius));
    for (const i of n) a.kind === "storm" ? Ua(e, i, t, a.damage, s, a) : (a.kind === "fire" && (i.burn = Math.max(i.burn, 45)), a.kind === "frost" && (i.chill = Math.max(i.chill, 60)), a.kind === "mine" && rt(e, i, 25), Le(e, i, a.damage, t, a.source, a, s));
  }
  e.hazards = e.hazards.filter((a) => a.life > 0);
}
function _r(e, t, s) {
  Mr(e, t, s), kr(e, t, s);
}
function Sr(e) {
  return e.player.hp <= 0 ? "fallen" : !e.boss && e.encounter === "siege" && e.objective.hp <= 0 ? "beacon" : null;
}
function Rr(e, t, s) {
  const { seed: a, zone: n, chapter: i, elite: o, boss: d, bossKind: r, encounter: c, hp: l } = e, u = {
    tick: 0,
    seed: a,
    serial: 0,
    player: {
      x: 0,
      y: 5,
      hp: l,
      facing: -Math.PI / 2,
      attack: 0,
      dash: 0,
      skill: 0,
      invulnerable: 30,
      dashTime: 0,
      dashAngle: 0,
      swing: 0,
      shield: 0,
      combo: 0,
      guard: 0,
      resource: 0,
      resonance: 0,
      ward: 0,
      lastHit: 0,
      travel: 0,
      rescues: 0
    },
    enemies: [],
    shots: [],
    hazards: [],
    effects: [],
    companions: [],
    obstacles: d ? r === "warden" || r === "colossus" ? [{
      x: -5,
      y: 0,
      radius: 0.85
    }, {
      x: 5,
      y: 0,
      radius: 0.85
    }] : [] : [{
      x: -5,
      y: -4,
      radius: 0.9
    }, {
      x: 5,
      y: 3,
      radius: 0.9
    }],
    wave: 0,
    waves: d ? 1 : o ? 3 : 2,
    nextWave: 0,
    kills: 0,
    damageTaken: 0,
    status: "fighting",
    zone: n,
    chapter: i,
    elite: o,
    boss: d,
    bossKind: r,
    encounter: c,
    objective: {
      x: 0,
      y: 0,
      hp: 100,
      progress: 0,
      target: 0
    }
  };
  return s && ((d && !_n(r) || s.waves.some((h) => h.some((v) => !_n(v.kind)))) && ke("encounter_unsupported"), (c !== "skirmish" || !s.waves.length || !ot(s.space, s.entry, V.playerRadius) || s.waves.some((h) => !h.length || h.some((v) => !ot(s.space, v.position, de[v.kind].radius) || !Yt(s.space, s.entry, v.position, V.playerRadius)))) && ke("map_invalid"), Object.assign(u.player, s.entry), Object.assign(u.objective, s.objective), u.obstacles = [], u.waves = s.waves.length), pr(u), aa(u, t, s), u;
}
function Cr(e, t, s, a) {
  if (e.status !== "fighting") return;
  e.tick++, e.effects = e.effects.filter((i) => --i.life > 0).slice(-80);
  const n = dr(e, t, s, a);
  ur(e, s, a), xr(e, s, n, a), _r(e, s, a), e.enemies = e.enemies.filter((i) => i.hp > 0), Sr(e) ? e.status = "lost" : (hr(e, s, a), fr(e) && (e.status = "won", e.shots = [], e.hazards = []));
}
function zr(e, t) {
  const s = e.at(-1);
  s && s.move === t.move && s.dash === t.dash && s.skill === t.skill ? s.ticks++ : e.push({
    ...t,
    ticks: 1
  });
}
function rs(e, t) {
  return e.x >= t.x - t.width / 2 && e.x < t.x + t.width / 2 && e.y >= t.z - t.depth / 2 && e.y < t.z + t.depth / 2;
}
function gt(e) {
  const { landscape: t } = e, { bounds: s } = t, a = {
    x: s.x - s.width / 2,
    y: s.z - s.depth / 2
  }, n = [
    s,
    ...t.features.map((l) => l.footprint),
    ...t.gates.map((l) => l.footprint)
  ];
  n.some((l) => ![
    l.x,
    l.z,
    l.width,
    l.depth
  ].every(Number.isFinite) || l.width <= 0 || l.depth <= 0 || ![
    l.x - l.width / 2,
    l.z - l.depth / 2,
    l.width,
    l.depth
  ].every(Number.isInteger)) && ke("map_invalid");
  const i = t.features.map((l) => l.id);
  new Set(i).size !== i.length && ke("map_invalid"), t.features.some((l) => [
    "tree",
    "tower",
    "wall",
    "arch",
    "column",
    "root"
  ].includes(l.kind) && (l.height === void 0 || !Number.isFinite(l.height) || l.height <= 0)) && ke("map_invalid");
  for (const l of n.slice(1)) (l.x - l.width / 2 < a.x || l.z - l.depth / 2 < a.y || l.x + l.width / 2 > a.x + s.width || l.z + l.depth / 2 > a.y + s.depth) && ke("map_invalid");
  t.roads.some((l) => !Number.isFinite(l.width) || l.width <= 0 || l.points.length < 2 || l.points.some(([u, h], v) => !Number.isFinite(u) || !Number.isFinite(h) || v > 0 && u === l.points[v - 1][0] && h === l.points[v - 1][1])) && ke("map_invalid");
  const o = [];
  for (let l = 0; l < s.depth; l++) {
    let u = "";
    for (let h = 0; h < s.width; h++) {
      const v = {
        x: a.x + h + 0.5,
        y: a.y + l + 0.5
      };
      u += t.features.some((p) => p.kind !== "arch" && rs(v, p.footprint)) ? "#" : ".";
    }
    o.push(u);
  }
  const d = {
    origin: a,
    cellSize: 1,
    rows: o,
    gates: t.gates.map((l) => {
      const u = l.footprint, h = [];
      for (let v = u.z - u.depth / 2 - a.y; v < u.z + u.depth / 2 - a.y; v++) for (let p = u.x - u.width / 2 - a.x; p < u.x + u.width / 2 - a.x; p++) h.push({
        column: p,
        row: v
      });
      return {
        id: l.id,
        cells: h
      };
    })
  }, r = Jn(d, new Set(d.gates.map((l) => l.id)));
  Object.values(e.anchors).some((l) => !ot(r, l, V.playerRadius)) && ke("map_invalid");
  const c = /* @__PURE__ */ new Set();
  for (const l of [...e.exits, ...e.objects])
    (!e.anchors[l.anchor] || c.has(l.id)) && ke("map_invalid"), c.add(l.id);
  return {
    ...e,
    map: d,
    gates: t.gates
  };
}
var S = (e, t, s, a, n, i, o = {}) => ({
  id: e,
  kind: t,
  footprint: {
    x: s,
    z: a,
    width: n,
    depth: i
  },
  ...o
}), Pr = gt({
  id: "camp",
  safe: !0,
  anchors: {
    start: {
      x: 1,
      y: 14
    },
    road: {
      x: 0,
      y: -53
    },
    clinic: {
      x: -13,
      y: 12
    },
    guard: {
      x: 7,
      y: -39
    },
    kouzi: {
      x: 32,
      y: 8
    },
    anian: {
      x: -18,
      y: 15
    },
    rest: {
      x: -3,
      y: 15
    },
    cargo: {
      x: 16,
      y: 7
    },
    postern: {
      x: -42,
      y: 7
    },
    receiving: {
      x: -16,
      y: 16
    },
    gatehouse: {
      x: 11,
      y: -37
    },
    clinic_back: {
      x: -29,
      y: 8
    },
    registry: {
      x: -10,
      y: 15
    }
  },
  exits: [{
    id: "road",
    anchor: "road",
    to: "crossroads",
    arrival: "camp"
  }, {
    id: "postern",
    anchor: "postern",
    to: "cells",
    arrival: "postern",
    condition: { all: ["postern_opened"] }
  }],
  objects: [{
    id: "rest",
    anchor: "rest",
    kind: "rest"
  }, {
    id: "cargo",
    anchor: "cargo",
    kind: "inspect",
    passage: "cargo",
    condition: { all: ["warden_defeated"] }
  }],
  landscape: {
    vista: "camp",
    surface: "grass",
    bounds: {
      x: 0,
      z: -8,
      width: 96,
      depth: 100
    },
    gates: [{
      id: "postern",
      footprint: {
        x: -36,
        z: 7,
        width: 2,
        depth: 4
      },
      condition: { all: ["postern_opened"] }
    }],
    roads: [
      {
        points: [
          [0, 36],
          [0, 16],
          [0, 3],
          [2, -12],
          [0, -24],
          [0, -53]
        ],
        width: 5
      },
      {
        points: [
          [-29, 13],
          [-14, 13],
          [0, 9],
          [16, 6],
          [24, -1]
        ],
        width: 3
      },
      {
        points: [
          [-32, 17],
          [-22, 14],
          [-16, 10]
        ],
        width: 3
      },
      {
        points: [
          [0, -36],
          [17, -37],
          [27, -43]
        ],
        width: 4
      }
    ],
    features: [
      S("clinic", "clinic", -19, 4, 14, 10),
      S("storehouse", "storehouse", 12, -9, 12, 12),
      S("hearth", "hearth", 0, 6, 4, 4),
      S("rest-bench", "bench", -5, 15, 2, 4),
      S("wagon", "wagon", 22, 3, 4, 6),
      S("supply-crates", "supplies", 20, -5, 4, 4),
      S("herbs", "planter", -29, 0, 4, 10),
      S("herbs-small", "planter", -23, 10, 6, 2),
      S("plaza-tree", "tree", -12, 20, 4, 4, {
        height: 7,
        tint: "amber"
      }),
      S("orchard-tree", "tree", 15, 20, 4, 4, {
        height: 8,
        tint: "sage"
      }),
      S("clinic-tree", "tree", -31, -12, 4, 4, {
        height: 9,
        tint: "rose"
      }),
      S("east-tree", "tree", 34, -16, 4, 4, {
        height: 10,
        tint: "sage"
      }),
      S("garden-tree", "tree", -16, -19, 4, 4, {
        height: 8,
        tint: "sage"
      }),
      S("canal-west", "water", -26, -28, 44, 4),
      S("canal-east", "water", 26, -28, 44, 4),
      S("bridge-west", "wall", -5, -28, 2, 6, { height: 0.8 }),
      S("bridge-east", "wall", 5, -28, 2, 6, { height: 0.8 }),
      S("gate-west", "wall", -26, -49, 44, 4, { height: 6 }),
      S("gate-east", "wall", 26, -49, 44, 4, { height: 6 }),
      S("west-watchtower", "tower", -8, -49, 6, 8, { height: 12 }),
      S("east-watchtower", "tower", 8, -49, 6, 8, { height: 12 }),
      S("departure-arch", "arch", 0, -49, 10, 4, { height: 8 }),
      S("west-boundary", "wall", -37, -26, 2, 62, { height: 2.4 }),
      S("postern-bottom", "wall", -37, 25, 2, 32, { height: 2.4 }),
      S("south-boundary", "wall", 0, 40, 96, 4, { height: 1 }),
      S("east-boundary", "wall", 46, -8, 4, 96, { height: 1.2 }),
      S("postern-end", "wall", -47, -8, 2, 100, { height: 2.4 }),
      S("north-boundary", "wall", 0, -57, 96, 2, { height: 5 }),
      S("roadside-garden", "planter", -17, -38, 16, 8),
      S("lookout-ruin", "ruin", 24, -38, 6, 6, { height: 3 }),
      S("south-tree-a", "tree", -27, 28, 6, 6, {
        height: 10,
        tint: "sage"
      }),
      S("south-tree-b", "tree", 28, 30, 6, 6, {
        height: 10,
        tint: "amber"
      }),
      S("north-grove", "thicket", -24, -21, 18, 4),
      S("roadside-herbs", "thicket", -8, -12, 4, 10),
      S("clinic-hedge", "thicket", -20, -5, 16, 2)
    ]
  }
}), $r = gt({
  id: "crossroads",
  safe: !1,
  anchors: {
    camp: {
      x: 0,
      y: 43
    },
    gate: {
      x: 0,
      y: -43
    },
    waterway: {
      x: 34,
      y: 7
    },
    roots: {
      x: -36,
      y: -13
    },
    warning: {
      x: 5,
      y: 19
    },
    encounter: {
      x: 0,
      y: 9
    },
    patrol: {
      x: -4,
      y: -8
    },
    lookout: {
      x: 8,
      y: -18
    }
  },
  exits: [
    {
      id: "camp",
      anchor: "camp",
      to: "camp",
      arrival: "road"
    },
    {
      id: "gate",
      anchor: "gate",
      to: "gate",
      arrival: "crossroads",
      condition: { all: ["crossroads_cleared"] }
    },
    {
      id: "waterway",
      anchor: "waterway",
      to: "waterway",
      arrival: "crossroads",
      condition: { all: ["crossroads_cleared"] }
    },
    {
      id: "roots",
      anchor: "roots",
      to: "roots",
      arrival: "crossroads",
      condition: { all: ["warden_defeated"] }
    }
  ],
  objects: [{
    id: "warning",
    anchor: "warning",
    kind: "inspect",
    passage: "warning"
  }],
  landscape: {
    vista: "ramparts",
    surface: "grass",
    bounds: {
      x: 0,
      z: 0,
      width: 96,
      depth: 96
    },
    gates: [{
      id: "roots",
      footprint: {
        x: -29,
        z: -13,
        width: 2,
        depth: 6
      },
      condition: { all: ["warden_defeated"] }
    }],
    roads: [
      {
        points: [
          [0, 44],
          [0, 28],
          [-4, 14],
          [2, 0],
          [0, -20],
          [0, -44]
        ],
        width: 8
      },
      {
        points: [
          [-4, 14],
          [14, 14],
          [24, 7],
          [35, 7]
        ],
        width: 4
      },
      {
        points: [
          [0, -13],
          [-18, -13],
          [-37, -13]
        ],
        width: 5
      }
    ],
    features: [
      S("wall-west", "wall", -30, -32, 2, 32, { height: 3 }),
      S("wall-west-low", "wall", -30, 19, 2, 58, { height: 2 }),
      S("wall-east", "wall", 24, -25, 4, 44, { height: 7 }),
      S("rampart-tower", "tower", 24, -16, 8, 8, { height: 15 }),
      S("gate-tower-left", "tower", -8, -41, 6, 8, { height: 11 }),
      S("gate-tower-right", "tower", 8, -41, 6, 8, { height: 11 }),
      S("north-arch", "arch", 0, -41, 10, 4, { height: 8 }),
      S("west-gate-wall", "wall", -26, -43, 40, 4, { height: 5 }),
      S("east-gate-wall", "wall", 36, -43, 20, 4, { height: 5 }),
      S("road-ruin", "ruin", -12, 1, 6, 6, { height: 3.5 }),
      S("fallen-column", "ruin", 12, -2, 4, 4, { height: 1.2 }),
      S("road-tree", "tree", -17, 27, 4, 4, {
        height: 9,
        tint: "amber"
      }),
      S("roots-tree", "tree", -39, -25, 6, 6, {
        height: 13,
        tint: "sage"
      }),
      S("southern-tree", "tree", 17, 37, 4, 4, {
        height: 9,
        tint: "sage"
      }),
      S("arrival-watch-west", "tower", -8, 44, 6, 8, { height: 10 }),
      S("arrival-watch-east", "tower", 8, 44, 6, 8, { height: 10 }),
      S("arrival-arch", "arch", 0, 44, 10, 4, { height: 8 }),
      S("broken-convoy", "wagon", -12, 19, 4, 6),
      S("convoy-supplies", "supplies", -16, 16, 4, 4),
      S("west-growth", "thicket", -24, 28, 8, 12),
      S("east-growth", "thicket", 18, 25, 6, 8),
      S("old-border", "thicket", -18, -6, 14, 4),
      S("waterway-bank", "water", 37, 21, 22, 16),
      S("north-boundary", "wall", 0, -47, 96, 2, { height: 5 }),
      S("south-boundary-west", "wall", -26, 47, 44, 2, { height: 5 }),
      S("south-boundary-east", "wall", 26, 47, 44, 2, { height: 5 }),
      S("west-boundary", "wall", -47, 0, 2, 96, { height: 2 }),
      S("east-boundary", "wall", 47, 0, 2, 96, { height: 2 })
    ]
  }
}), Ir = gt({
  id: "gate",
  safe: !1,
  anchors: {
    crossroads: {
      x: 0,
      y: 32
    },
    beacon: {
      x: 0,
      y: -33
    },
    encounter: {
      x: 0,
      y: 0
    },
    guard: {
      x: -5,
      y: -9
    },
    archer: {
      x: 8,
      y: -17
    },
    parley: {
      x: 0,
      y: 19
    },
    parley_side: {
      x: -7,
      y: 19
    },
    guard_side: {
      x: -8,
      y: 9
    },
    archer_side: {
      x: 8,
      y: 9
    }
  },
  exits: [{
    id: "crossroads",
    anchor: "crossroads",
    to: "crossroads",
    arrival: "gate"
  }, {
    id: "beacon",
    anchor: "beacon",
    to: "beacon",
    arrival: "gate",
    condition: { all: ["patrol_cleared"] }
  }],
  objects: [],
  landscape: {
    vista: "ramparts",
    surface: "paving",
    bounds: {
      x: 0,
      z: 0,
      width: 72,
      depth: 80
    },
    gates: [],
    roads: [{
      points: [
        [0, 34],
        [0, 13],
        [0, -9],
        [0, -34]
      ],
      width: 10
    }, {
      points: [
        [-26, 12],
        [0, 12],
        [26, 12]
      ],
      width: 4
    }],
    features: [
      S("outer-west", "wall", -35, 0, 2, 80, { height: 8 }),
      S("outer-east", "wall", 35, 0, 2, 80, { height: 8 }),
      S("north-wall", "wall", 0, -39, 72, 2, { height: 9 }),
      S("south-wall", "wall", 0, 39, 72, 2, { height: 5 }),
      S("gate-tower-west", "tower", -10, -27, 8, 12, { height: 16 }),
      S("gate-tower-east", "tower", 10, -27, 8, 12, { height: 16 }),
      S("main-arch", "arch", 0, -27, 12, 6, { height: 12 }),
      S("gate-flank-west", "wall", -25, -27, 22, 6, { height: 9 }),
      S("gate-flank-east", "wall", 25, -27, 22, 6, { height: 9 }),
      S("west-pillars", "ruin", -13, -3, 6, 4, { height: 4.8 }),
      S("east-pillars", "ruin", 13, -3, 6, 4, { height: 4.8 }),
      S("western-barracks", "storehouse", -25, 2, 12, 12),
      S("eastern-barracks", "storehouse", 25, 2, 12, 12),
      S("left-border", "planter", -15, 23, 4, 12),
      S("right-border", "planter", 15, 23, 4, 12),
      S("inspection-cart", "wagon", 25, 19, 4, 6),
      S("inspection-crates", "supplies", 28, 25, 4, 4),
      S("barracks-tree", "tree", -27, 26, 4, 4, {
        height: 9,
        tint: "amber"
      })
    ]
  }
}), Er = gt({
  id: "beacon",
  safe: !1,
  anchors: {
    gate: {
      x: 0,
      y: 35
    },
    hall: {
      x: 0,
      y: -35
    },
    beacon: {
      x: 0,
      y: 0
    },
    encounter: {
      x: 0,
      y: 9
    },
    guard: {
      x: -9,
      y: -13
    },
    archer: {
      x: 12,
      y: -13
    },
    parley: {
      x: 0,
      y: 28
    },
    parley_side: {
      x: -8,
      y: 28
    },
    guard_side: {
      x: -14,
      y: 2
    },
    archer_side: {
      x: 14,
      y: 2
    }
  },
  exits: [{
    id: "gate",
    anchor: "gate",
    to: "gate",
    arrival: "beacon"
  }, {
    id: "hall",
    anchor: "hall",
    to: "hall",
    arrival: "beacon",
    condition: { all: ["alarm_silenced"] }
  }],
  objects: [],
  landscape: {
    vista: "ramparts",
    surface: "paving",
    bounds: {
      x: 0,
      z: 0,
      width: 72,
      depth: 84
    },
    gates: [],
    roads: [{
      points: [
        [0, 36],
        [0, 10],
        [-9, 0],
        [-9, -18],
        [0, -27],
        [0, -36]
      ],
      width: 6
    }, {
      points: [
        [0, 10],
        [10, 0],
        [10, -18],
        [0, -27]
      ],
      width: 6
    }],
    features: [
      S("west-parapet", "wall", -35, 0, 2, 84, { height: 3 }),
      S("east-parapet", "wall", 35, 0, 2, 84, { height: 3 }),
      S("north-wall", "wall", 0, -41, 72, 2, { height: 9 }),
      S("south-wall", "wall", 0, 41, 72, 2, { height: 5 }),
      S("signal-brazier", "beacon", 0, -8, 6, 6),
      S("west-signal-column", "column", -20, -10, 4, 4, { height: 11 }),
      S("east-signal-column", "column", 20, -10, 4, 4, { height: 11 }),
      S("west-approach-column", "column", -20, 12, 4, 4, { height: 8 }),
      S("east-approach-column", "column", 20, 12, 4, 4, { height: 8 }),
      S("hall-tower-west", "tower", -10, -30, 8, 8, { height: 16 }),
      S("hall-tower-east", "tower", 10, -30, 8, 8, { height: 16 }),
      S("hall-arch", "arch", 0, -30, 12, 4, { height: 12 }),
      S("west-garden", "planter", -27, 19, 8, 22),
      S("east-garden", "planter", 27, 19, 8, 22),
      S("west-copper-store", "supplies", -26, -23, 6, 6),
      S("east-copper-store", "supplies", 26, -23, 6, 6)
    ]
  }
}), Lr = gt({
  id: "waterway",
  safe: !1,
  anchors: {
    crossroads: {
      x: -21,
      y: -35
    },
    cells: {
      x: 20,
      y: 35
    },
    sluice: {
      x: -9,
      y: 8
    },
    encounter: {
      x: 4,
      y: 4
    },
    guard: {
      x: 10,
      y: -5
    }
  },
  exits: [{
    id: "crossroads",
    anchor: "crossroads",
    to: "crossroads",
    arrival: "waterway"
  }, {
    id: "cells",
    anchor: "cells",
    to: "cells",
    arrival: "waterway",
    condition: { all: ["waterway_cleared"] }
  }],
  objects: [{
    id: "sluice",
    anchor: "sluice",
    kind: "switch",
    fact: "sluice_opened"
  }],
  landscape: {
    vista: "interior",
    surface: "wet",
    bounds: {
      x: 0,
      z: 0,
      width: 64,
      depth: 88
    },
    gates: [{
      id: "sluice",
      footprint: {
        x: 0,
        z: 16,
        width: 12,
        depth: 4
      },
      condition: { all: ["sluice_opened"] }
    }],
    roads: [{
      points: [
        [-21, -35],
        [-10, -32],
        [-10, -12],
        [3, 0],
        [0, 16],
        [14, 28],
        [20, 35]
      ],
      width: 5
    }],
    features: [
      S("west-wall", "wall", -31, 0, 2, 88, { height: 7 }),
      S("east-wall", "wall", 31, 0, 2, 88, { height: 7 }),
      S("north-wall", "wall", 0, -43, 64, 2, { height: 8 }),
      S("south-wall", "wall", 0, 43, 64, 2, { height: 8 }),
      S("upper-channel-west", "water", -24, -3, 12, 58),
      S("upper-channel-east", "water", 23, -12, 14, 48),
      S("lower-channel-west", "water", -13, 32, 30, 20),
      S("lower-channel-east", "water", 28, 32, 4, 20),
      S("sluice-west-abutment", "wall", -18, 16, 24, 4, { height: 5 }),
      S("sluice-east-abutment", "wall", 18, 16, 24, 4, { height: 5 }),
      S("upper-pier-west", "column", -15, -18, 4, 4, { height: 9 }),
      S("upper-pier-east", "column", 11, -18, 4, 4, { height: 9 }),
      S("lower-pier-west", "column", -13, 0, 4, 4, { height: 9 }),
      S("lower-pier-east", "column", 13, 0, 4, 4, { height: 9 }),
      S("vault-north", "arch", -2, -18, 26, 2, { height: 10 }),
      S("vault-middle", "arch", 0, 0, 26, 2, { height: 10 }),
      S("entry-marker", "ruin", -24, -39, 6, 2, { height: 5 }),
      S("maintenance-supplies", "supplies", 8, 36, 4, 4)
    ]
  }
}), Ar = gt({
  id: "cells",
  safe: !1,
  anchors: {
    waterway: {
      x: -21,
      y: 21
    },
    hall: {
      x: 0,
      y: -3
    },
    postern: {
      x: 23,
      y: 33
    },
    latch: {
      x: 20,
      y: 16
    },
    release: {
      x: -3,
      y: 5
    },
    kouzi: {
      x: -15,
      y: -12
    },
    anian: {
      x: 15,
      y: -12
    },
    kouzi_talk: {
      x: -15,
      y: -8
    },
    anian_talk: {
      x: 15,
      y: -8
    }
  },
  exits: [
    {
      id: "waterway",
      anchor: "waterway",
      to: "waterway",
      arrival: "cells"
    },
    {
      id: "hall",
      anchor: "hall",
      to: "hall",
      arrival: "cells"
    },
    {
      id: "postern",
      anchor: "postern",
      to: "camp",
      arrival: "postern",
      condition: { all: ["postern_opened"] }
    }
  ],
  objects: [{
    id: "release",
    anchor: "release",
    kind: "switch",
    fact: "captives_released"
  }, {
    id: "postern_latch",
    anchor: "latch",
    kind: "switch",
    fact: "postern_opened"
  }],
  landscape: {
    vista: "interior",
    surface: "paving",
    bounds: {
      x: 0,
      z: 0,
      width: 64,
      depth: 76
    },
    gates: [
      {
        id: "cell-west",
        footprint: {
          x: -15,
          z: -10,
          width: 10,
          depth: 2
        },
        condition: { all: ["captives_released"] }
      },
      {
        id: "cell-east",
        footprint: {
          x: 15,
          z: -10,
          width: 10,
          depth: 2
        },
        condition: { all: ["captives_released"] }
      },
      {
        id: "postern",
        footprint: {
          x: 24,
          z: 24,
          width: 12,
          depth: 2
        },
        condition: { all: ["postern_opened"] }
      }
    ],
    roads: [{
      points: [
        [-21, 21],
        [-21, 12],
        [0, 5],
        [20, 12],
        [24, 24],
        [23, 34]
      ],
      width: 4
    }, {
      points: [
        [-16, -23],
        [-15, -10],
        [0, 5],
        [15, -10],
        [16, -23]
      ],
      width: 4
    }],
    features: [
      S("west-wall", "wall", -31, 0, 2, 76, { height: 6 }),
      S("east-wall", "wall", 31, 0, 2, 76, { height: 6 }),
      S("north-wall", "wall", 0, -37, 64, 2, { height: 8 }),
      S("south-wall", "wall", 0, 37, 64, 2, { height: 6 }),
      S("cells-divider", "wall", 0, -24, 2, 28, { height: 6 }),
      S("cells-front-center", "wall", 0, -10, 20, 2, { height: 6 }),
      S("cells-front-west", "wall", -26, -10, 12, 2, { height: 6 }),
      S("cells-front-east", "wall", 26, -10, 12, 2, { height: 6 }),
      S("postern-divider", "wall", -7, 24, 50, 2, { height: 5 }),
      S("waterway-passage", "arch", -21, 19, 10, 2, { height: 7 }),
      S("postern-corridor", "wall", 17, 31, 2, 12, { height: 5 }),
      S("west-bunk", "bunk", -26, -24, 4, 8),
      S("east-bunk", "bunk", 26, -24, 4, 8),
      S("west-cell-bench", "bench", -8, -30, 2, 4),
      S("east-cell-bench", "bench", 8, -30, 2, 4),
      S("guard-desk", "supplies", 3, 12, 4, 4),
      S("hall-pier-west", "column", -7, -4, 2, 2, { height: 7 }),
      S("hall-pier-east", "column", 7, -4, 2, 2, { height: 7 })
    ]
  }
}), Tr = gt({
  id: "hall",
  safe: !1,
  anchors: {
    beacon: {
      x: -22,
      y: 35
    },
    cells: {
      x: 22,
      y: 35
    },
    encounter: {
      x: 0,
      y: 5
    },
    warden: {
      x: 0,
      y: -17
    },
    orders: {
      x: 0,
      y: -36
    },
    reinforcementLeft: {
      x: -24,
      y: -12
    },
    reinforcementRight: {
      x: 24,
      y: -12
    }
  },
  exits: [{
    id: "beacon",
    anchor: "beacon",
    to: "beacon",
    arrival: "hall"
  }, {
    id: "cells",
    anchor: "cells",
    to: "cells",
    arrival: "hall"
  }],
  objects: [{
    id: "orders",
    anchor: "orders",
    kind: "inspect",
    passage: "orders",
    condition: { all: ["warden_defeated"] }
  }],
  landscape: {
    vista: "interior",
    surface: "marble",
    bounds: {
      x: 0,
      z: 0,
      width: 80,
      depth: 92
    },
    gates: [],
    roads: [{
      points: [
        [-22, 36],
        [-22, 27],
        [0, 19],
        [22, 27],
        [22, 36]
      ],
      width: 5
    }, {
      points: [
        [0, 27],
        [0, 4],
        [0, -17],
        [0, -35]
      ],
      width: 10
    }],
    features: [
      S("west-wall", "wall", -39, 0, 2, 92, { height: 11 }),
      S("east-wall", "wall", 39, 0, 2, 92, { height: 11 }),
      S("north-wall", "wall", 0, -45, 80, 2, { height: 13 }),
      S("south-wall", "wall", 0, 45, 80, 2, { height: 8 }),
      S("western-front-column", "column", -15, 17, 4, 4, { height: 12 }),
      S("eastern-front-column", "column", 15, 17, 4, 4, { height: 12 }),
      S("western-middle-column", "column", -15, -3, 4, 4, { height: 12 }),
      S("eastern-middle-column", "column", 15, -3, 4, 4, { height: 12 }),
      S("western-rear-column", "column", -15, -25, 4, 4, { height: 12 }),
      S("eastern-rear-column", "column", 15, -25, 4, 4, { height: 12 }),
      S("entry-vault", "arch", 0, 17, 30, 2, { height: 14 }),
      S("rear-vault", "arch", 0, -25, 30, 2, { height: 14 }),
      S("west-gallery", "planter", -32, 4, 6, 28),
      S("east-gallery", "planter", 32, 4, 6, 28),
      S("west-gallery-bench", "bench", -28, 28, 2, 6),
      S("east-gallery-bench", "bench", 28, 28, 2, 6),
      S("crown-console", "supplies", 0, -41, 6, 4),
      S("northern-west-pillar", "column", -29, -35, 4, 4, { height: 14 }),
      S("northern-east-pillar", "column", 29, -35, 4, 4, { height: 14 })
    ]
  }
}), jr = gt({
  id: "roots",
  safe: !1,
  anchors: {
    crossroads: {
      x: 0,
      y: 34
    },
    encounter: {
      x: 0,
      y: 5
    },
    tree: {
      x: 0,
      y: -12
    },
    rootLeft: {
      x: -12,
      y: -13
    },
    rootRight: {
      x: 12,
      y: -13
    }
  },
  exits: [{
    id: "crossroads",
    anchor: "crossroads",
    to: "crossroads",
    arrival: "roots"
  }],
  objects: [],
  landscape: {
    vista: "garden",
    surface: "grass",
    bounds: {
      x: 0,
      z: 0,
      width: 80,
      depth: 84
    },
    gates: [],
    roads: [{
      points: [
        [0, 35],
        [0, 23],
        [-9, 11],
        [-12, -7],
        [0, -19]
      ],
      width: 5
    }, {
      points: [
        [0, 23],
        [11, 12],
        [13, -5],
        [0, -19]
      ],
      width: 4
    }],
    features: [
      S("west-enclosure", "wall", -39, 0, 2, 84, { height: 3 }),
      S("east-enclosure", "wall", 39, 0, 2, 84, { height: 3 }),
      S("north-enclosure", "wall", 0, -41, 80, 2, { height: 4 }),
      S("south-enclosure", "wall", 0, 41, 80, 2, { height: 3 }),
      S("dead-heartwood", "root", 0, -29, 12, 10, { height: 17 }),
      S("western-root", "root", -22, -15, 8, 4, { height: 3.8 }),
      S("eastern-root", "root", 22, -11, 8, 4, { height: 3.2 }),
      S("west-reflecting-pool", "water", -26, 9, 12, 16),
      S("east-reflecting-pool", "water", 26, 9, 12, 16),
      S("west-old-colonnade", "ruin", -15, 7, 4, 4, { height: 5 }),
      S("east-old-colonnade", "ruin", 15, 9, 4, 4, { height: 4 }),
      S("western-growth", "thicket", -29, -27, 14, 12),
      S("eastern-growth", "thicket", 29, -27, 14, 12),
      S("west-entry-pillar", "column", -7, 30, 4, 4, { height: 7 }),
      S("east-entry-pillar", "column", 7, 30, 4, 4, { height: 7 }),
      S("garden-arch", "arch", 0, 30, 14, 2, { height: 9 }),
      S("west-entry-tree", "tree", -21, 29, 6, 6, {
        height: 12,
        tint: "rose"
      }),
      S("east-entry-tree", "tree", 23, 29, 6, 6, {
        height: 12,
        tint: "sage"
      }),
      S("west-north-tree", "tree", -18, -33, 6, 6, {
        height: 14,
        tint: "sage"
      }),
      S("east-north-tree", "tree", 18, -33, 6, 6, {
        height: 14,
        tint: "rose"
      })
    ]
  }
}), _e = {
  camp: Pr,
  crossroads: $r,
  gate: Ir,
  beacon: Er,
  waterway: Lr,
  cells: Ar,
  hall: Tr,
  roots: jr
}, Or = 2.4;
function oa(e, t) {
  return (!e?.all || e.all.every((s) => t.has(s))) && (!e?.none || e.none.every((s) => !t.has(s)));
}
var Cn = /* @__PURE__ */ new WeakMap();
function yt(e, t) {
  const s = e.gates.filter((o) => oa(o.condition, t)).map((o) => o.id), a = s.join("/");
  let n = Cn.get(e);
  n || (n = /* @__PURE__ */ new Map(), Cn.set(e, n));
  let i = n.get(a);
  return i || (i = Jn(e.map, new Set(s)), n.set(a, i)), i;
}
function ha(e, t) {
  const s = e.exits.filter((n) => oa(n.condition, t)).map((n) => ({
    kind: "exit",
    target: n,
    position: e.anchors[n.anchor]
  })), a = e.objects.filter((n) => oa(n.condition, t) && !(n.kind === "switch" && t.has(n.fact))).map((n) => ({
    kind: "object",
    target: n,
    position: e.anchors[n.anchor]
  }));
  return [...s, ...a];
}
function Zr(e, t, s) {
  const a = yt(e, s);
  return ha(e, s).filter((n) => B(t.position, n.position) <= 2.4 && Ce(a, t.position, n.position)).sort((n, i) => B(t.position, n.position) - B(t.position, i.position) || n.target.id.localeCompare(i.target.id));
}
function Ur(e, t, s, a = 1) {
  (!Number.isInteger(t) || t < 0 || t > 8) && ke("input_invalid"), t && (e.facing = Ja(t), Xa(s, e.position, {
    x: Math.cos(e.facing) * V.speed * a,
    y: Math.sin(e.facing) * V.speed * a
  }, V.playerRadius));
}
var Zt = {
  crossroads: {
    complete: "crossroads_cleared",
    triggerRadius: 26,
    boss: null,
    summons: [],
    waves: [[{
      kind: "soldier",
      anchor: "patrol"
    }, {
      kind: "soldier",
      anchor: "lookout"
    }]]
  },
  gate: {
    complete: "patrol_cleared",
    boss: null,
    summons: [],
    waves: [[{
      kind: "guard",
      anchor: "guard"
    }, {
      kind: "archer",
      anchor: "archer"
    }]]
  },
  beacon: {
    complete: "alarm_silenced",
    boss: null,
    summons: [],
    waves: [[{
      kind: "guard",
      anchor: "guard"
    }, {
      kind: "archer",
      anchor: "archer"
    }], [{
      kind: "charger",
      anchor: "guard"
    }]]
  },
  waterway: {
    complete: "waterway_cleared",
    boss: null,
    summons: [],
    waves: [[{
      kind: "guard",
      anchor: "guard"
    }]]
  },
  hall: {
    complete: "warden_defeated",
    boss: "warden",
    summons: ["reinforcementLeft", "reinforcementRight"],
    waves: [[{
      kind: "warden",
      anchor: "warden"
    }]]
  },
  roots: {
    complete: "roots_cleared",
    boss: "thornheart",
    summons: ["rootLeft", "rootRight"],
    waves: [[{
      kind: "thornheart",
      anchor: "tree"
    }]]
  }
};
function is(e, t, s, a, n, i) {
  const o = Zt[e];
  if (!o || t.has(o.complete)) return null;
  const d = _e[e], r = o.waves.map((c) => c.map((l) => ({
    kind: l.kind,
    position: d.anchors[l.anchor]
  })));
  return e === "hall" && i && r[0].push({
    kind: "guard",
    position: d.anchors.reinforcementLeft
  }, {
    kind: "archer",
    position: d.anchors.reinforcementRight
  }), {
    setup: {
      seed: a,
      zone: 0,
      chapter: 0,
      elite: !1,
      boss: o.boss !== null,
      bossKind: o.boss ?? "warden",
      encounter: "skirmish",
      hp: n
    },
    field: {
      space: yt(d, t),
      entry: s,
      objective: d.anchors.encounter,
      waves: r,
      summonPoints: o.summons.map((c) => d.anchors[c])
    }
  };
}
var fa = {
  sanniang: "三娘",
  anian: "阿念",
  kouzi: "扣子",
  laobai: "老白"
}, lt = Object.keys(fa), Nr = {
  sanniang: "changyounian_intel",
  laobai: "bajin_intel",
  anian: null,
  kouzi: null
}, ne = Object.freeze({
  artwork: {
    unavailable: "部分场景纹理未载入，不影响游玩。",
    retry: "重新载入",
    loading: "载入中…"
  },
  scenes: {
    camp: "檐下",
    crossroads: "外墙岔口",
    gate: "哨站正门",
    beacon: "烽火台",
    waterway: "旧水道",
    cells: "牢房",
    hall: "内堡门厅",
    roots: "根庭"
  },
  people: fa,
  switches: {
    sluice_opened: "升起水闸",
    captives_released: "打开牢门",
    postern_opened: "拉开小门"
  },
  passages: {
    warning: {
      title: "哨站的烽火",
      body: "墙上的传令管正通向烽火台。先熄灭烽火，能截住内堡的增援；若从水道先去救人，守军会在撤离途中或内堡集结。受困者不会因为你停下来查看道路而被处决。"
    },
    cargo: {
      title: "归还的货签",
      body: `货车上是药材和冷却管件。

哨站随货送来的放还单：
“冷却管件十二副，库中仅此，余者冻裂报损。”

管件箱里夹着的出库签：
“本箱原装二十四副，出十二，存十二，完好。”`
    },
    orders: {
      title: "主闸控制台",
      body: "封锁的闸齿停了下来，外墙的输送轨道正在逐段亮起。控制台上的旧命令只有“内城优先”四个字，没有撤销日期。"
    }
  },
  actions: {
    inspect: "查看",
    talk: "交谈",
    rest: "休整",
    travel: "前往",
    close: "返回",
    interact: "交互",
    next: "切换对象",
    map: "地图",
    resume: "继续",
    move: "移动",
    controls: "WASD 或方向键移动，E 交互",
    paused: "已暂停"
  }
}), pa = {
  sanniang: {
    initial: {
      scene: "camp",
      anchor: "clinic"
    },
    home: {
      scene: "camp",
      anchor: "clinic"
    },
    captive: !1
  },
  laobai: {
    initial: {
      scene: "camp",
      anchor: "guard"
    },
    home: {
      scene: "camp",
      anchor: "guard"
    },
    captive: !1
  },
  kouzi: {
    initial: {
      scene: "cells",
      anchor: "kouzi"
    },
    home: {
      scene: "camp",
      anchor: "kouzi"
    },
    captive: !0
  },
  anian: {
    initial: {
      scene: "cells",
      anchor: "anian"
    },
    home: {
      scene: "camp",
      anchor: "anian"
    },
    captive: !0
  }
}, en = {
  camp: {
    scene: "camp",
    anchor: "start",
    name: "檐下营地"
  },
  gatehouse: {
    scene: "camp",
    anchor: "gatehouse",
    name: "外门门楼"
  },
  pipewalk: {
    scene: "camp",
    anchor: "kouzi",
    name: "管架高处"
  },
  clinic_back: {
    scene: "camp",
    anchor: "clinic_back",
    name: "诊棚后"
  },
  registry: {
    scene: "camp",
    anchor: "registry",
    name: "登记棚"
  },
  crossroads: {
    scene: "crossroads",
    anchor: "warning",
    name: ne.scenes.crossroads
  },
  gate: {
    scene: "gate",
    anchor: "crossroads",
    name: ne.scenes.gate
  },
  beacon: {
    scene: "beacon",
    anchor: "gate",
    name: ne.scenes.beacon
  },
  waterway: {
    scene: "waterway",
    anchor: "crossroads",
    name: ne.scenes.waterway
  },
  cells: {
    scene: "cells",
    anchor: "release",
    name: ne.scenes.cells
  },
  hall: {
    scene: "hall",
    anchor: "cells",
    name: ne.scenes.hall
  },
  roots: {
    scene: "roots",
    anchor: "crossroads",
    name: ne.scenes.roots
  }
}, tn = {
  briefing: {
    atHome: !1,
    people: ["sanniang", "laobai"],
    requires: [],
    fact: "briefed",
    meaning: "玩家明确愿意去哨站救人时提交，确认接下救援委托、开放营地外的路线。对白说明正门与旧水道两条路线；是否邀你同行另算，实际救援由探索完成。"
  },
  receiving: {
    atHome: !1,
    people: ["laobai"],
    requires: [],
    fact: "receiving_arranged",
    meaning: "玩家请求或接受担架接应，老白答应安排时提交。担架队在小门接应；牢门和小门打开后，玩家回到檐下才完成接回。"
  },
  finish: {
    atHome: !1,
    people: ["sanniang"],
    requires: [
      "captives_arrived",
      "supplies_secured",
      "warden_defeated"
    ],
    fact: "chapter_completed",
    meaning: "与玩家核对回来的两个人和药材后提交，完成这一章的收尾。第二章尚未开放。"
  },
  clinic: {
    atHome: !0,
    people: ["sanniang"],
    requires: ["captives_arrived", "supplies_secured"],
    fact: "clinic_helped",
    meaning: "玩家帮三娘归置归还的药材、你在对白中回应这次协助时提交。记录共同经历，好感和态度由你另行判断。"
  }
}, os = Object.keys(tn);
function Dr(e, t, s) {
  return s.scene !== "camp" ? [] : os.filter((a) => {
    const n = tn[a], i = pa[t].home, o = _e[i.scene].anchors[i.anchor];
    return n.atHome && Math.hypot(s.position.x - o.x, s.position.y - o.y) > 2.4 ? !1 : n.people.includes(t) && !e.includes(n.fact) && n.requires.every((d) => e.includes(d));
  });
}
var $t = (e, t) => Math.hypot(e.x - t.x, e.y - t.y), zn = /* @__PURE__ */ new WeakMap();
function Na(e, t, s) {
  if (Ce(e, t, s, V.playerRadius)) return s;
  const a = Pt(e.map, t), n = Pt(e.map, s), i = `${a.column},${a.row}/${n.column},${n.row}`;
  let o = zn.get(e);
  o || (o = /* @__PURE__ */ new Map(), zn.set(e, o));
  const d = Ot(e.map, a.column, a.row);
  if (!o.has(i)) {
    const c = Yt(e, d, Ot(e.map, n.column, n.row), V.playerRadius);
    o.size >= 512 && o.delete(o.keys().next().value), o.set(i, c?.find((l) => $t(l, d) > 0.01) ?? null);
  }
  const r = o.get(i);
  return r ? Ce(e, t, r, V.playerRadius) ? r : d : null;
}
function na(e, t) {
  const s = Zt[e];
  return !s || t.has(s.complete);
}
function Da(e, t, s, a) {
  const n = [{
    ...e,
    route: []
  }], i = /* @__PURE__ */ new Set();
  for (; n.length; ) {
    const o = n.shift(), d = _e[o.scene], r = yt(d, s);
    if (o.scene === t.scene && Na(r, o.position, d.anchors[t.anchor])) return o.route;
    for (const c of _e[o.scene].exits) {
      const l = `${c.to}/${c.arrival}`;
      i.has(l) || !oa(c.condition, s) || a && !na(c.to, s) || !Na(r, o.position, d.anchors[c.anchor]) || (i.add(l), n.push({
        scene: c.to,
        position: _e[c.to].anchors[c.arrival],
        route: [...o.route, c]
      }));
    }
  }
  return null;
}
function ls(e, t) {
  const s = new Set(e.facts), a = e.people[t];
  return Object.entries(en).map(([n, i]) => ({
    id: n,
    name: i.name,
    personHere: a.scene === i.scene && (n === i.scene || $t(a.position, _e[i.scene].anchors[i.anchor]) <= 2.4),
    playerHere: e.location.scene === i.scene && (n === i.scene || $t(e.location.position, _e[i.scene].anchors[i.anchor]) <= 2.4),
    accessible: (i.scene === "camp" || s.has("briefed")) && Da(a, i, s, !1) !== null,
    safe: na(i.scene, s),
    solo: na(a.scene, s) && na(i.scene, s) && Da(a, i, s, !0) !== null
  }));
}
function Fr(e, t) {
  return !pa[t].captive || e.facts.includes("captives_arrived");
}
var cs = (e) => Or * (0.7 + lt.indexOf(e) / lt.length * 0.2);
function Br(e) {
  return lt.some((t) => e.people[t].mode === "travel" || e.people[t].mode === "follow" && $t(e.people[t].position, e.location.position) >= cs(t));
}
function ds(e, t) {
  return lt.filter((s) => t[s].scene === e).map((s) => ({
    kind: "object",
    position: t[s].position,
    target: {
      id: s,
      anchor: "",
      kind: "person",
      person: s
    }
  }));
}
function us(e) {
  return [...ha(_e[e.location.scene], new Set(e.facts)), ...ds(e.location.scene, e.people)];
}
function an(e, t, s, a) {
  return ds(e.id, a).filter((n) => {
    if (n.kind !== "object" || n.target.kind !== "person") return !1;
    const i = e.id === "cells" && pa[n.target.person].captive && !s.has("captives_arrived"), o = yt(e, i ? /* @__PURE__ */ new Set([...s, "captives_released"]) : s);
    return $t(n.position, t) <= (i ? 5 : 2.4) && Ce(o, t, n.position);
  });
}
function qr(e) {
  const t = new Set(e.facts);
  for (const s of lt) {
    const a = e.people[s];
    if (a.mode === "idle") continue;
    const n = _e[a.scene], i = yt(n, t);
    let o, d;
    if (a.mode === "follow") {
      if (a.scene !== e.location.scene && ve("invalid"), o = e.location.position, $t(a.position, o) < cs(s)) continue;
    } else {
      const v = en[a.destination], p = Da(a, v, t, !0);
      if (p || ve("unavailable"), d = p[0], o = n.anchors[d?.anchor ?? v.anchor], $t(a.position, o) < 0.2) {
        d ? (a.scene = d.to, a.position = { ..._e[d.to].anchors[d.arrival] }) : (a.mode = "idle", a.destination = null);
        continue;
      }
    }
    const r = Na(i, a.position, o);
    r || ve("unavailable");
    const c = r.x - a.position.x, l = r.y - a.position.y, u = Math.hypot(c, l), h = Math.min(u, V.speed * 1.8);
    u && (a.facing = Math.atan2(l, c), Xa(i, a.position, {
      x: c / u * h,
      y: l / u * h
    }, V.playerRadius));
  }
}
var Ae = {
  bajin: {
    name: "八斤",
    card: "enemy-bajin",
    scene: "gate",
    intel: "bajin_intel",
    complete: "patrol_cleared",
    persuaded: "bajin_passed",
    kind: "guard",
    anchor: "parley",
    clearedAnchor: "parley_side",
    approachRadius: 7,
    sentryExits: {
      guard: "guard_side",
      archer: "archer_side"
    }
  },
  changyounian: {
    name: "常有年",
    card: "enemy-changyounian",
    scene: "beacon",
    intel: "changyounian_intel",
    complete: "alarm_silenced",
    persuaded: "changyounian_passed",
    kind: "archer",
    anchor: "parley",
    clearedAnchor: "parley_side",
    approachRadius: 7,
    sentryExits: {
      guard: "guard_side",
      archer: "archer_side"
    }
  }
}, ma = Object.keys(Ae), Wr = [...lt, ...ma];
function je(e) {
  return Object.hasOwn(fa, e);
}
function it(e) {
  return je(e) ? fa[e] : Ae[e].name;
}
function la(e, t) {
  const s = Ae[e];
  return _e[s.scene].anchors[t.has(s.complete) ? s.clearedAnchor : s.anchor];
}
function va(e, t, s) {
  return ma.filter((a) => Ae[a].scene === e).flatMap((a) => {
    const n = la(a, s), i = Ae[a];
    return Math.hypot(t.x - n.x, t.y - n.y) <= i.approachRadius ? [{
      kind: "object",
      target: {
        id: a,
        anchor: "",
        kind: "enemy",
        enemy: a
      },
      position: n
    }] : [];
  });
}
function Fa(e) {
  return (!e || typeof e != "object" || Array.isArray(e)) && ve("invalid"), e;
}
function Pn(e, t = 0, s = Number.MAX_SAFE_INTEGER) {
  return (!Number.isSafeInteger(e) || Number(e) < t || Number(e) > s) && ve("invalid"), e;
}
function Ct(e, t) {
  return (typeof e != "string" || !t.includes(e)) && ve("invalid"), e;
}
function $n(e, t, s) {
  return (!Array.isArray(e) || e.length > t) && ve("invalid"), e.map(s);
}
function Hr(e) {
  return new Set(e).size !== e.length && ve("invalid"), e;
}
function In(e) {
  typeof e != "boolean" && ve("invalid");
}
function Vr(e) {
  return (typeof e != "string" || !/^[a-zA-Z0-9_-]{1,100}$/.test(e)) && ve("identity"), e;
}
var hs = ["male", "female"];
function Gr(e) {
  const t = Fa(e);
  return (typeof t.name != "string" || !t.name.trim() || t.name.trim().length > 24 || /[\r\n]/.test(t.name)) && ve("invalid"), {
    name: t.name.trim(),
    gender: Ct(t.gender, hs)
  };
}
var _t = Object.freeze({
  id: "outpost",
  number: "第一章",
  numeral: "I",
  title: "哨站救援"
}), fs = `${_t.number} · ${_t.title}`, qt = Object.freeze({
  encounterReach: 14,
  alarmTicks: 900,
  explorationSpeed: 1.65,
  playerTextLimit: 2e3,
  replyTextLimit: 8e3
});
function Ba(e) {
  return {
    weapon: e.weapon,
    oaths: [],
    relics: e.equipped.map((t) => e.collection.find((s) => s.id === t))
  };
}
function Yr(e, t) {
  if (e.phase !== "exploration" || !_e[e.location.scene].safe) return "unavailable";
  if (t.length > V.relicSlots) return "capacity";
  if (new Set(t).size !== t.length || t.some((a) => !e.collection.some((n) => n.id === a))) return "invalid";
  const s = {
    weapon: e.weapon,
    oaths: [],
    relics: e.collection.filter((a) => t.includes(a.id))
  };
  return t.some((a) => !Xn(s, a)) ? "dependency" : null;
}
function ps(e, t, s) {
  e.facts.includes(t) || e.facts.push(t);
  const a = s ?? [...lt.filter((n) => e.people[n].scene === e.location.scene), ...ma.filter((n) => Ae[n].scene === e.location.scene)];
  for (const n of a) e.knowledge[n].includes(t) || e.knowledge[n].push(t);
}
function Qr(e) {
  const t = e.checkpoint;
  return is(e.location.scene, new Set(e.facts), t?.player ?? e.location.position, t?.seed ?? e.seed, t?.player.hp ?? e.hp, e.facts.includes("alarm_raised") && !e.facts.includes("alarm_silenced"))?.field;
}
function Kr(e) {
  const t = Zt[e.location.scene];
  ps(e, t.complete);
  const s = Ba(e);
  t.boss && (e.hp = Math.min(V.maxHp, e.hp + 20 + C(s, "renewal") * ze.renewalZoneHeal)), e.offers = tr(e, ar(e.weapon).flatMap((a) => {
    const n = e.collection.find((i) => i.id === a)?.rank ?? 0;
    return n < V.maxRelicRank && Xn(s, a) && (Gt[a].chapter === 0 || e.facts.includes("warden_defeated")) ? [{
      id: a,
      rank: n + 1
    }] : [];
  }), 3), e.phase = e.offers.length ? "reward" : "exploration", e.battle = null, e.checkpoint = null;
}
function En(e, t) {
  if (!e.pendingParley) {
    if (e.phase === "battle" && e.battle) {
      const s = Qr(e);
      s || ve("invalid"), Cr(e.battle, t, Ba(e), s);
      const a = e.battle;
      e.hp = a.player.hp, e.location.position = {
        x: a.player.x,
        y: a.player.y
      }, e.location.facing = a.player.facing, ["gate", "beacon"].includes(e.location.scene) && !e.facts.includes("alarm_silenced") && (e.alarmTicks++, e.alarmTicks >= qt.alarmTicks && ps(e, "alarm_raised")), a.status === "won" ? Kr(e) : a.status === "lost" && (e.phase = "lost");
    } else if (e.phase === "exploration") {
      const s = _e[e.location.scene], a = new Set(e.facts);
      Ur(e.location, t.move, yt(s, a), qt.explorationSpeed);
      const n = Zt[s.id], i = s.anchors.encounter;
      if (n && !a.has(n.complete) && i && Math.hypot(e.location.position.x - i.x, e.location.position.y - i.y) <= (n.triggerRadius ?? qt.encounterReach)) {
        const o = is(s.id, a, e.location.position, Math.floor(da(e) * 4294967296), e.hp, a.has("alarm_raised") && !a.has("alarm_silenced"));
        e.battle = Rr(o.setup, Ba(e), o.field), e.checkpoint = structuredClone(e.battle), e.phase = "battle";
      }
    }
    (e.phase === "exploration" || e.phase === "battle") && qr(e);
  }
}
var ca = Object.freeze({
  minimum: 0,
  maximum: 100,
  changeMin: 2,
  changeMax: 4,
  bands: [
    0,
    21,
    41,
    61,
    81
  ]
});
function nn(e) {
  return ca.bands.filter((t) => e >= t).length - 1;
}
var Lt = {
  none: "保持这一句的表情与姿态",
  nod: "轻轻点头一次",
  tilt: "略侧头打量，再回正",
  shake: "轻轻摇头一次",
  gesture: "抬起空着的手掌，作一个轻缓的示意",
  withdraw: "外伸的手略向内收，停一下再放松"
}, Xr = {
  sanniang: {
    expressions: {
      neutral: "平静倾听",
      smile: "真诚愉快地微笑",
      teasing: "从容、有一点逗弄的笑意",
      blush: "脸颊泛红，仍看向对方",
      rest: "安心合眼、短暂休憩",
      serious: "收起笑意，认真而冷静",
      worried: "眉间担忧，仍专注看着对方",
      sad: "垂眼含泪，流露难过",
      displeased: "收起客气，冷淡地表达不悦",
      fond: "眼帘半垂，仍看着对方，微张嘴温柔回应",
      laugh: "笑弯眼睛，自然地笑出声",
      surprised: "睁大眼，微张嘴，短暂失去从容"
    },
    gestures: Lt
  },
  anian: {
    expressions: {
      neutral: "略带出神地听着",
      smile: "回过神来，露出自然坦率的微笑",
      laugh: "玩得高兴，放开地笑出声",
      blush: "脸颊明显泛红，有些迟疑地看着对方",
      fond: "眼帘半垂，带着柔和笑意回应对方",
      rest: "安心合眼，短暂休憩",
      surprised: "睁大眼，微张嘴，忽然回过神",
      worried: "眉间担忧，留神听着",
      displeased: "皱眉抿嘴，明显不高兴",
      sad: "垂眼难过，嘴角低下来"
    },
    gestures: Lt
  },
  kouzi: {
    expressions: {
      neutral: "利落、直接地看着对方",
      blush: "脸颊泛红，别开目光，嘴上仍有些倔",
      smile: "办成事情后，露出利落得意的笑",
      teasing: "挑起一边眉梢，嘴角带着促狭的笑",
      laugh: "忘了绷着，痛快地笑出声",
      fond: "目光难得柔和下来，微张嘴想说真心话",
      serious: "收起玩笑，冷静专注",
      surprised: "睁大眼，微张嘴，有些不敢相信",
      worried: "眉间紧起来，尽量藏住担心",
      displeased: "目光变锐，明确表示不悦",
      sad: "垂下眼，咬住话头，不愿露出受伤的样子"
    },
    gestures: Lt
  },
  laobai: {
    expressions: {
      neutral: "松松地站着，听对方说话",
      smile: "眉眼松开，好相处地笑了笑",
      teasing: "挑起一边眉梢，带着自嘲的促狭笑意",
      laugh: "没绷住，真心笑出声",
      blush: "脸颊泛红，目光躲开，有些措手不及",
      fond: "目光柔和下来，半垂眼帘，微张嘴回应",
      serious: "玩笑收住，目光安静而认真",
      surprised: "眉梢抬起，睁大眼，话停了一下",
      worried: "眉间微皱，藏不住担心",
      sad: "垂下目光，笑意消失，安静地难过"
    },
    gestures: Lt
  },
  bajin: {
    expressions: {
      neutral: "绷着脸，警惕地审视来人",
      suspicious: "眯起眼，带着怀疑审视",
      angry: "眉头压紧，硬声发令",
      worried: "眉间露出紧张，眼神有些慌",
      relieved: "脸上稍松，仍然保持警惕",
      resigned: "垂下目光，不情愿地让步"
    },
    gestures: {
      ...Lt,
      gesture: "略抬拿签的手，作一个示意",
      withdraw: "拿签的手略向内收，再放松"
    }
  },
  changyounian: {
    expressions: {
      neutral: "眯着眼，保持克制的官家神色",
      smile: "带着分寸的客气微笑",
      squint: "眼睛眯得更紧，费力辨认",
      displeased: "客气收住，神色冷下来",
      worried: "眉间绷紧，露出一丝不安",
      relieved: "眉眼稍松，露出疲惫的淡笑"
    },
    gestures: Lt
  }
};
function Jr(e) {
  return Xr[e];
}
var ei = (e) => Ct(e, Kn), Ln = (e) => Ct(e, Gn), An = (e) => Ct(e, Qn);
function ti(e) {
  const t = Fa(e);
  switch (t.type) {
    case "start":
    case "restart":
      return {
        type: t.type,
        weapon: ei(t.weapon),
        outfit: An(t.outfit),
        traveler: Gr(t.traveler),
        chapter: Ct(t.chapter, [_t.id])
      };
    case "purchase":
    case "equip":
      return {
        type: t.type,
        id: An(t.id)
      };
    case "interact":
      return {
        type: "interact",
        id: Vr(t.id)
      };
    case "choice":
      return {
        type: "choice",
        id: Ct(t.id, os),
        person: Ct(t.person, lt)
      };
    case "loadout":
      return {
        type: "loadout",
        equipped: Hr($n(t.equipped, V.relicSlots, Ln))
      };
    case "input": {
      const s = $n(t.spans, V.maxInputTicks, (a) => {
        const n = Fa(a);
        return In(n.dash), In(n.skill), {
          move: Pn(n.move, 0, 8),
          dash: n.dash,
          skill: n.skill,
          ticks: Pn(n.ticks, 1, V.maxInputTicks)
        };
      });
      return (!s.length || s.reduce((a, n) => a + n.ticks, 0) > V.maxInputTicks) && ve("invalid"), {
        type: "input",
        spans: s
      };
    }
    case "relic":
      return {
        type: "relic",
        id: Ln(t.id)
      };
    case "leave":
    case "retry":
    case "retreat":
    case "resolve_parley":
      return { type: t.type };
    default:
      return ve("invalid");
  }
}
function ai(e, t) {
  const s = Ht(null), a = q(!1), n = q(""), i = Ht(null), o = q(!1), d = q(!1), r = q(null), c = ae(() => s.value?.replyFailure?.actionId === r.value ? null : s.value?.replyFailure ?? null), l = ae(() => o.value || !!s.value?.conversation), u = q(!1), h = q(!1);
  let v = !1, p = null;
  const g = ae(() => a.value || l.value || d.value || !!i.value || !s.value?.ready || s.value.writeState !== "ready" || s.value.pending);
  function y(L) {
    !v && (!s.value || L.data.revision >= s.value.data.revision) && (s.value = L);
  }
  async function w(L, A) {
    if (v || a.value) return !1;
    a.value = !0, p = null, n.value = "";
    try {
      const j = await e.request(`game/expedition/${L}`, {
        chatIdentity: t,
        ...L === "rebuild" ? { actionId: Ia() } : {},
        ...A
      }, 35e3), P = p;
      return y(P && P.data.revision >= j.result.data.revision ? P : j.result), u.value = !1, h.value = !1, s.value?.writeState === "ready" && !s.value.pending && L !== "read" && (i.value = null), !0;
    } catch (j) {
      if (!v) {
        u.value = !0, p && y(p), n.value = kt(j);
        const P = j && typeof j == "object" && "code" in j ? String(j.code) : "";
        h.value = P === "expedition_data_invalid", A && (P.startsWith("expedition_save_") || P.startsWith("host_request_")) && (i.value = A);
      }
      return !1;
    } finally {
      v || (a.value = !1);
    }
  }
  const f = e.subscribe((L) => {
    if (v) return;
    if (L.type === "game/expedition/error") {
      const j = L.payload;
      j.chatIdentity === t && (n.value = kt(j), h.value = j.code === "expedition_data_invalid");
      return;
    }
    if (L.type !== "game/expedition/state") return;
    const A = L.payload;
    A.chatIdentity === t && (a.value ? p = A.state : y(A.state));
  });
  async function x() {
    const L = i.value;
    return !await w("confirm") || !s.value || s.value.writeState !== "ready" || s.value.pending ? !1 : L && s.value.data.revision === L.revision ? w("act", L) : (i.value = null, d.value = !1, !0);
  }
  async function b(L, A) {
    if (g.value || v) return !1;
    const j = Ia();
    o.value = !0, a.value = !0, n.value = "", p = null;
    try {
      const P = await e.request("game/expedition/talk", {
        chatIdentity: t,
        actionId: j,
        revision: s.value.data.revision,
        person: L,
        text: A
      }, 18e4), U = p;
      return y(U && U.data.revision >= P.result.data.revision ? U : P.result), !0;
    } catch (P) {
      if (!v) {
        p && y(p);
        const U = P && typeof P == "object" && "code" in P ? String(P.code) : P instanceof Error ? P.message : "";
        if (U === "expedition_cancelled")
          return n.value = "", !1;
        d.value = U.startsWith("host_request_") || U.startsWith("expedition_save_"), n.value = d.value ? T.aiUnknown : s.value?.replyFailure?.actionId === j ? "" : kt(P);
      }
      return !1;
    } finally {
      o.value = !1, v || (a.value = !1);
    }
  }
  async function M() {
    if (l.value)
      try {
        await e.request("game/expedition/cancel", { chatIdentity: t }, 35e3);
      } catch (L) {
        v || (n.value = kt(L));
      }
  }
  const z = ae(() => u.value || !!i.value || d.value || !s.value || s.value.pending || s.value.writeState !== "ready");
  return {
    view: s,
    busy: a,
    error: n,
    blocked: g,
    failed: i,
    talking: l,
    uncertainTalk: d,
    talk: b,
    cancelTalk: M,
    recoveryRequired: z,
    dataInvalid: h,
    conversationFailure: c,
    dismissConversationFailure() {
      r.value = s.value?.replyFailure?.actionId ?? null;
    },
    rebuild: () => w("rebuild"),
    dismissError() {
      z.value || (n.value = "");
    },
    notice: ae(() => n.value || (s.value && (s.value.pending || s.value.writeState !== "ready") ? K.saveError : "")),
    read: () => w("read"),
    recover: x,
    act: (L) => g.value ? Promise.resolve(!1) : w("act", {
      actionId: Ia(),
      revision: s.value.data.revision,
      command: ti(L)
    }),
    dispose() {
      v = !0, f();
    }
  };
}
function ni(e) {
  const t = Ht(null), s = Ht(!1);
  let a = [], n = 0, i = null, o = !1;
  function d() {
    const u = e.view.value?.data.active;
    if (t.value = u ? structuredClone(u) : null, t.value) for (const h of a) for (let v = 0; v < h.ticks; v++) En(t.value, h);
    s.value = a.length > 0;
  }
  const r = me(e.view, () => {
    !i && !a.length && d();
  }, { immediate: !0 });
  async function c() {
    if (i)
      return await i ? c() : !1;
    if (!a.length) return !e.blocked.value;
    if (e.blocked.value || o) return !1;
    const u = a;
    a = [], n = 0, i = e.act({
      type: "input",
      spans: u
    });
    const h = await i;
    return i = null, h ? d() : e.failed.value || (a = u.concat(a), n = a.reduce((v, p) => v + p.ticks, 0)), s.value = a.length > 0 || !h, h;
  }
  function l(u) {
    const h = t.value;
    !h || o || e.failed.value || e.uncertainTalk.value || e.notice.value || n >= V.maxInputTicks || !["exploration", "battle"].includes(h.phase) || h.phase === "exploration" && !u.move && !Br(h) || (En(h, u), zr(a, u), n++, s.value = !0, Is(t), (n >= V.checkpointTicks || !["exploration", "battle"].includes(h.phase)) && c());
  }
  return {
    current: t,
    dirty: s,
    input: l,
    flush: c,
    sync: d,
    async recover() {
      return await e.recover() ? (d(), c()) : !1;
    },
    dispose() {
      o = !0, r();
    }
  };
}
function si(e) {
  let t = null, s = null, a = null, n = !1, i = !1, o = null, d = -1, r = 0, c = 0, l = 0, u = 0, h = 0;
  function v(g, y, w, f = "sine", x = g * 0.8, b = 0) {
    if (!n || !t || !s || t.state !== "running") return;
    const M = t.createOscillator(), z = t.createGain(), L = t.currentTime + b;
    M.type = f, M.frequency.setValueAtTime(g, L), M.frequency.exponentialRampToValueAtTime(Math.max(30, x), L + y), z.gain.setValueAtTime(1e-4, L), z.gain.exponentialRampToValueAtTime(w, L + 9e-3), z.gain.exponentialRampToValueAtTime(1e-4, L + y), M.connect(z).connect(s), M.start(L), M.stop(L + y), M.onended = () => {
      M.disconnect(), z.disconnect();
    };
  }
  function p(g, y, w, f) {
    if (!n || !t || !s || !a || t.state !== "running") return;
    const x = t.createBufferSource(), b = t.createBiquadFilter(), M = t.createGain(), z = t.currentTime;
    x.buffer = a, b.type = "bandpass", b.Q.value = 0.65, b.frequency.setValueAtTime(w, z), b.frequency.exponentialRampToValueAtTime(f, z + g), M.gain.setValueAtTime(1e-4, z), M.gain.exponentialRampToValueAtTime(y, z + 8e-3), M.gain.exponentialRampToValueAtTime(1e-4, z + g), x.connect(b).connect(M).connect(s), x.start(z), x.stop(z + g), x.onended = () => {
      x.disconnect(), b.disconnect(), M.disconnect();
    };
  }
  return {
    async enable(g) {
      if (!i) {
        n = g;
        try {
          if (!g) {
            t && await t.suspend();
            return;
          }
          if (!t) {
            t = new AudioContext(), s = t.createGain(), s.gain.value = 0.55, s.connect(t.destination), a = t.createBuffer(1, t.sampleRate, t.sampleRate);
            const y = a.getChannelData(0);
            for (let w = 0; w < y.length; w++) y[w] = Math.random() * 2 - 1;
          }
          await t.resume();
        } catch {
          n = !1, i || e();
        }
      }
    },
    tick(g) {
      (!o || g.tick < d) && (d = -1, r = g.player.hp, c = g.kills, l = g.player.skill, u = g.serial, h = g.player.combo), o = g, d !== g.tick && (d = g.tick, g.player.hp < r && (p(0.16, 0.17, 800, 120), v(95, 0.2, 0.12, "triangle", 42)), g.kills > c && (v(659, 0.22, 0.045), v(988, 0.3, 0.025, "sine", 980, 0.035)), g.player.combo > h && p(0.095, 0.08, 2700, 500), g.player.dashTime === 7 && p(0.2, 0.09, 500, 2600), g.player.skill > l && (p(0.24, 0.12, 2200, 250), v(165, 0.35, 0.075, "triangle", 82), v(660, 0.36, 0.035, "sine", 440, 0.02)), g.effects.some((y) => y.id > u && y.kind === "lightning") && (p(0.12, 0.1, 4400, 1e3), v(1200, 0.08, 0.018, "sine", 210)), g.effects.some((y) => y.id > u && (y.kind === "block" || y.kind === "parry")) && (v(1350, 0.18, 0.07, "triangle", 740), v(2200, 0.11, 0.025, "sine", 1600)), g.effects.some((y) => y.id > u && y.kind === "ward-hit") && v(510, 0.16, 0.06, "sine", 250), g.effects.some((y) => y.id > u && y.kind === "ward-break") && (p(0.25, 0.1, 3600, 650), v(720, 0.3, 0.05, "sine", 120)), g.status === "won" && [
        392,
        494,
        587,
        784
      ].forEach((y, w) => v(y, 0.65, 0.04, "sine", y, w * 0.075)), g.status === "lost" && v(147, 0.7, 0.06, "triangle", 73), r = g.player.hp, c = g.kills, l = g.player.skill, u = g.serial, h = g.player.combo);
    },
    dispose() {
      i = !0, n = !1, t && (t.close().catch(e), t = null), s = null, a = null;
    }
  };
}
var k = {
  grass: "#a5afc1",
  grassLight: "#c2c9d8",
  grassDark: "#909bb1",
  soil: "#67717e",
  stone: "#c4c7d9",
  light: "#edf0fa",
  mortar: "#8290a9",
  slate: "#465271",
  roof: "#3d4666",
  roofLight: "#667396",
  timber: "#42465c",
  wood: "#9d8171",
  shadow: "#2a354f",
  brass: "#bf926f",
  cloth: "#d9c9be",
  leaf: "#556e83",
  leafLight: "#8fabc0",
  amber: "#ad927c",
  amberLight: "#d9b993",
  rose: "#bfa3bd",
  water: "#627fba",
  ripple: "#c7d9f1",
  ember: "#ffcb92",
  pottery: "#ad7d74",
  undercroft: "#485977",
  wetStone: "#98abc9",
  marble: "#cbd5ea",
  marbleLight: "#e4eafa",
  root: "#64627a",
  rootLight: "#9290a1",
  sky: "#cbd5f0",
  haze: "#e3e6f6",
  pavingAccent: "#c5cadd",
  window: "#c4d1e5",
  distantGround: "#8596b2",
  distantLeaf: "#a2b0c8",
  distantWall: "#bac5df",
  distantRoof: "#818cac"
}, at = {
  height: 23,
  distance: 25,
  lead: 5,
  minimumWidth: 42,
  mobileWidth: 26,
  tallSpan: 28,
  shortSpan: 19
}, Ie = {
  ward: "#75c7eb",
  edge: "#e5f6ff",
  block: "#dcc08a",
  parry: "#fff2c9",
  enamel: "#42647c",
  silver: "#e4e7df"
}, Fe = {
  familiar: "#8cc9bc",
  empowered: "#f1d89e",
  crest: "#9daedc",
  page: "#f2ecda",
  cover: "#4d5876"
}, ga = [
  {
    sky: k.sky,
    haze: k.haze,
    stone: k.stone,
    light: k.light,
    floor: k.grass,
    tile: k.grassLight,
    seam: k.mortar,
    dark: k.shadow,
    trim: k.brass,
    accent: k.ember,
    foliage: k.leaf,
    flower: k.rose,
    water: k.water
  },
  {
    sky: "#bfcfe9",
    haze: "#dde5f5",
    stone: "#dce3ed",
    light: "#f4f1ff",
    floor: "#abb6cb",
    tile: "#b2bcd0",
    seam: "#93a1bb",
    dark: "#364869",
    trim: "#c4bcdf",
    accent: "#9cbeff",
    foliage: "#626ca0",
    flower: "#e0b2dd",
    water: "#88a0bc"
  },
  {
    sky: "#f3d8b0",
    haze: "#fbebd2",
    stone: "#f0ddba",
    light: "#fff4da",
    floor: "#c9bda5",
    tile: "#cfc3ac",
    seam: "#b6a88f",
    dark: "#5a565d",
    trim: "#c99249",
    accent: "#ffd481",
    foliage: "#b87056",
    flower: "#ffe2a3",
    water: "#a6b8b0"
  },
  {
    sky: "#e0c6bb",
    haze: "#f0dccc",
    stone: "#bfada1",
    light: "#eee3ce",
    floor: "#a9a1a0",
    tile: "#b4aaa5",
    seam: "#88878c",
    dark: "#3e4a55",
    trim: "#c18c59",
    accent: "#ffb06d",
    foliage: "#8a634b",
    flower: "#ffd6a5",
    water: "#c77446"
  },
  {
    sky: "#c1e4f1",
    haze: "#e0f4f8",
    stone: "#d7e9ed",
    light: "#f6ffff",
    floor: "#a7c5d2",
    tile: "#b0cfd9",
    seam: "#8dabbc",
    dark: "#365773",
    trim: "#afcdd9",
    accent: "#9ce4f0",
    foliage: "#6395ad",
    flower: "#edf5ff",
    water: "#599aba"
  },
  {
    sky: "#c9c1e6",
    haze: "#e5dff5",
    stone: "#ddd6ec",
    light: "#f8f3ff",
    floor: "#b8b0ce",
    tile: "#c4bcd9",
    seam: "#9f95b5",
    dark: "#44395e",
    trim: "#d5ba8e",
    accent: "#c6aff9",
    foliage: "#766a9f",
    flower: "#eadba9",
    water: "#9482bb"
  }
], ri = {
  storm: "#428dad",
  fire: "#b96839",
  frost: "#558eaf",
  guard: "#4e8776",
  life: "#ad5261",
  skill: "#8170ac",
  risk: "#a54853",
  blade: "#a98243",
  bow: "#498362",
  staff: "#8170ac",
  daggers: "#a95176",
  grimoire: "#578476",
  cannon: "#987347"
}, x1 = Object.fromEntries(Object.entries(Gt).map(([e, t]) => [e, ri[t.family]]));
function ii(e, t, s) {
  const a = /* @__PURE__ */ new Set();
  let n = {
    x: 0,
    y: 0
  }, i = !1, o = !1;
  const d = [
    "KeyW",
    "KeyA",
    "KeyS",
    "KeyD",
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "Space",
    "KeyE",
    "Escape"
  ];
  function r(h) {
    if (!(!d.includes(h.code) || h.target instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(h.target.tagName)) && !(h.code === "Space" && h.target instanceof HTMLElement && h.target.closest("button"))) {
      if (h.preventDefault(), h.stopPropagation(), s(), h.code === "Escape") {
        h.repeat || t();
        return;
      }
      a.add(h.code), !h.repeat && h.code === "Space" && (i = !0), !h.repeat && h.code === "KeyE" && (o = !0);
    }
  }
  function c(h) {
    a.delete(h.code);
  }
  function l() {
    a.clear(), n = {
      x: 0,
      y: 0
    }, i = !1, o = !1;
  }
  function u() {
    l(), t();
  }
  return e.addEventListener("keydown", r), window.addEventListener("keyup", c), window.addEventListener("blur", u), {
    frame() {
      const h = n.x || Number(a.has("KeyD") || a.has("ArrowRight")) - Number(a.has("KeyA") || a.has("ArrowLeft")), v = n.y || Number(a.has("KeyS") || a.has("ArrowDown")) - Number(a.has("KeyW") || a.has("ArrowUp")), p = {
        move: Math.hypot(h, v) < 0.15 ? 0 : (Math.round((Math.atan2(v, h) + Math.PI / 2) / (Math.PI / 4)) + 8 - 1) % 8 + 1,
        dash: i,
        skill: o
      };
      return i = !1, o = !1, p;
    },
    stick(h, v) {
      n = {
        x: h,
        y: v
      };
    },
    dash() {
      i = !0, s();
    },
    skill() {
      o = !0, s();
    },
    clear: l,
    dispose() {
      l(), e.removeEventListener("keydown", r), window.removeEventListener("keyup", c), window.removeEventListener("blur", u);
    }
  };
}
function oi(e, t) {
  let s = null;
  function a(i) {
    if (!s || i.pointerId !== s.id) return;
    const o = s.surface.getBoundingClientRect(), d = o.width * 0.36, r = (i.clientX - o.left - o.width / 2) / d, c = (i.clientY - o.top - o.height / 2) / d, l = Math.max(1, Math.hypot(r, c));
    e(r / l, c / l);
  }
  function n() {
    const i = s;
    s = null, e(0, 0), i?.surface.hasPointerCapture(i.id) && i.surface.releasePointerCapture(i.id);
  }
  return {
    down(i) {
      if (s || i.button !== 0) return;
      t();
      const o = i.currentTarget;
      o.setPointerCapture(i.pointerId), s = {
        id: i.pointerId,
        surface: o
      }, a(i);
    },
    move: a,
    release(i) {
      s?.id === i.pointerId && n();
    },
    clear: n
  };
}
function qa(e) {
  const t = new wn();
  t.absarc(0, 0, 1.1, 0, Math.PI, !1), t.lineTo(-0.86, 0), t.absarc(0, 0, 0.86, Math.PI, 0, !0), t.closePath();
  const s = {
    box: new Vs(1, 1, 1),
    sphere: new Ws(1, 20, 14),
    rock: new bn(1, 0),
    crown: new bn(1, 1),
    cylinder: new qs(1, 1, 1, 24),
    cone: new Gs(1, 1, 12),
    disc: new Hs(1, 48),
    ring: new $a(0.965, 1, 64),
    arc: new $a(0.87, 1, 40, 1, -0.2, Math.PI * 1.3),
    torus: new yn(1, 0.08, 8, 40),
    stroke: new $a(0.975, 1, 48, 1, -0.2, Math.PI * 1.3),
    crescent: new yn(1, 0.14, 6, 24, Math.PI * 1.45),
    arch: new xn(t, {
      depth: 1,
      bevelEnabled: !1,
      curveSegments: 24
    }).translate(0, 0, -0.5)
  }, a = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Set();
  function o(h, v = !1, p = 1, g = !1) {
    const y = `${h}/${v}/${p}/${g}`;
    let w = n.get(y);
    return w || (w = v ? new Ds({
      color: h,
      transparent: p < 1,
      opacity: p,
      depthWrite: p === 1,
      side: 2
    }) : new Bs({
      color: h,
      map: e?.get(h) ?? null,
      roughness: g ? 0.34 : 0.88,
      metalness: g ? 0.45 : 0.02,
      side: 2
    }), n.set(y, w)), w;
  }
  function d(h, v, p, g, y = [
    0,
    0,
    0
  ], w = !1, f = 1, x = !1) {
    let b = s[v];
    if (!w && v === "box" && e?.has(p)) {
      b = b.clone(), i.add(b);
      const z = b.getAttribute("position"), L = b.getAttribute("normal"), A = b.getAttribute("uv");
      for (let j = 0; j < A.count; j++) {
        const P = Math.abs(L.getX(j)) > 0.5 ? z.getZ(j) * g[2] : z.getX(j) * g[0], U = Math.abs(L.getY(j)) > 0.5 ? z.getZ(j) * g[2] : z.getY(j) * g[1];
        A.setXY(j, P / 8, U / 8);
      }
    }
    const M = new Mt(b, o(p, w, f, x));
    return M.scale.set(...g), M.position.set(...y), M.castShadow = !w, M.receiveShadow = !w, h.add(M), M;
  }
  function r(h, v = [
    0,
    0,
    0
  ]) {
    const p = new Ft();
    return p.position.set(...v), h.add(p), p;
  }
  function c(h, v, p, g, y, w = 1, f = !1, x = 0.04) {
    const b = d(h, f ? "disc" : "ring", v, [
      p,
      p,
      1
    ], [
      g,
      x,
      y
    ], !0, w);
    return b.rotation.x = -Math.PI / 2, b;
  }
  function l(h, v, p, g = [
    0,
    0,
    0
  ], y = 0) {
    const w = e?.has(p) ?? !1, f = JSON.stringify([
      v,
      y,
      w
    ]);
    let x = a.get(f);
    if (!x) {
      const M = new wn();
      if (v.forEach(([z, L], A) => A ? M.lineTo(z, L) : M.moveTo(z, L)), M.closePath(), x = y ? new xn(M, {
        depth: y,
        steps: 1,
        bevelEnabled: !0,
        bevelThickness: y * 0.3,
        bevelSize: y * 0.3,
        bevelSegments: 2
      }) : new Us(M), w) {
        const z = x.getAttribute("uv");
        for (let L = 0; L < z.count; L++) z.setXY(L, z.getX(L) / 8, z.getY(L) / 8);
      }
      a.set(f, x);
    }
    const b = new Mt(x, o(p));
    return b.position.set(...g), b.castShadow = !0, b.receiveShadow = !0, h.add(b), b;
  }
  function u(h) {
    h.updateMatrixWorld(!0);
    const v = h.matrixWorld.clone().invert(), p = new Ns(), g = /* @__PURE__ */ new Map();
    h.traverse((w) => {
      if (!(w instanceof Mt) || Array.isArray(w.material)) return;
      const f = (w.geometry.index ? w.geometry.toNonIndexed() : w.geometry.clone()).applyMatrix4(p.multiplyMatrices(v, w.matrixWorld)), x = `${w.material.uuid}/${w.castShadow}/${w.receiveShadow}`;
      let b = g.get(x);
      b || (b = {
        material: w.material,
        castShadow: w.castShadow,
        receiveShadow: w.receiveShadow,
        geometries: []
      }, g.set(x, b)), b.geometries.push(f);
    }), h.clear();
    const y = [];
    for (const { material: w, castShadow: f, receiveShadow: x, geometries: b } of g.values()) {
      const M = Ks(b);
      if (b.forEach((L) => L.dispose()), !M) throw new Error("expedition_geometry_merge");
      const z = new Mt(M, w);
      z.castShadow = f, z.receiveShadow = x, h.add(z), y.push(M);
    }
    return () => {
      h.clear(), y.forEach((w) => w.dispose());
    };
  }
  return {
    mesh: d,
    group: r,
    ring: c,
    shape: l,
    material: o,
    bake: u,
    geometries: s,
    dispose() {
      Object.values(s).forEach((h) => h.dispose()), a.forEach((h) => h.dispose()), i.forEach((h) => h.dispose()), n.forEach((h) => h.dispose());
    }
  };
}
function li(e, t, s, a) {
  const n = ga[s], i = V.arena, { mesh: o, group: d, ring: r } = e, c = (p, g, y, w = n.stone) => o(p, "box", w, g, y);
  function l(p, g, y, w = !0) {
    const f = d(t, [
      p,
      0,
      g
    ]);
    c(f, [
      1.65,
      0.38,
      1.65
    ], [
      0,
      0.15,
      0
    ]), c(f, [
      1.3,
      0.3,
      1.3
    ], [
      0,
      0.49,
      0
    ], n.light), c(f, [
      0.91,
      y,
      0.91
    ], [
      0,
      y / 2 + 0.6,
      0
    ]);
    for (const x of [-0.38, 0.38]) c(f, [
      0.08,
      y - 0.35,
      0.12
    ], [
      x,
      y / 2 + 0.6,
      0.48
    ], n.light);
    return c(f, [
      1.3,
      0.24,
      1.3
    ], [
      0,
      y + 0.6,
      0
    ], n.light), c(f, [
      1.56,
      0.3,
      1.56
    ], [
      0,
      y + 0.85,
      0
    ], n.dark), w && (o(f, "cone", n.trim, [
      0.2,
      0.65,
      0.2
    ], [
      0,
      y + 1.24,
      0
    ]), c(f, [
      0.16,
      0.6,
      0.08
    ], [
      0,
      y - 0.15,
      0.52
    ], n.trim)), f;
  }
  function u(p, g, y, w) {
    l(p - y / 2, g, w - 2), l(p + y / 2, g, w - 2);
    const f = d(t, [
      p,
      w - 2,
      g
    ]);
    o(f, "arch", n.light, [
      y / 2,
      2.3,
      1.15
    ]);
    for (let x = 1; x < 10; x++) {
      const b = x / 10 * Math.PI, M = c(f, [
        0.025,
        0.64,
        0.025
      ], [
        Math.cos(b) * y * 0.49,
        Math.sin(b) * 2.25,
        0.59
      ], n.trim);
      M.rotation.z = b - Math.PI / 2;
    }
    c(f, [
      0.6,
      0.9,
      1.3
    ], [
      0,
      2.28,
      0
    ], n.trim);
  }
  function h(p, g, y = 1) {
    const w = d(t, [
      p,
      0,
      g
    ]);
    w.scale.setScalar(y);
    for (let f = 0; f < 5; f++) {
      const x = f * 2.4, b = o(w, "rock", f % 2 ? n.foliage : n.accent, [
        0.55,
        0.8 + f % 2 * 0.3,
        0.45
      ], [
        Math.cos(x) * 0.4,
        0.5,
        Math.sin(x) * 0.4
      ]);
      b.rotation.z = Math.sin(x) * 0.4;
    }
    for (let f = 0; f < 3; f++) o(w, "rock", n.flower, [
      0.13,
      0.16,
      0.13
    ], [
      Math.sin(f * 4) * 0.5,
      1,
      Math.cos(f * 4) * 0.4
    ]);
  }
  function v(p, g, y) {
    const w = d(t, [
      p,
      0,
      g
    ]);
    w.scale.setScalar(y);
    const f = o(w, "cylinder", n.dark, [
      0.15,
      3.5,
      0.19
    ], [
      0,
      1.65,
      0
    ]);
    f.rotation.z = -0.1;
    for (let x = 0; x < 6; x++) {
      const b = x * 2.4;
      o(w, "rock", x % 2 ? n.foliage : n.accent, [
        1.65,
        0.88,
        1.4
      ], [
        Math.cos(b) * 0.95,
        3 + Math.sin(b) * 0.5,
        Math.sin(b) * 0.85
      ]);
    }
  }
  c(t, [
    180,
    0.3,
    180
  ], [
    0,
    -4.1,
    0
  ], n.water);
  for (let p = 0; p < 16; p++) c(t, [
    3 + p % 4 * 2,
    0.015,
    0.055
  ], [
    Math.sin(p * 7) * 32,
    -3.92,
    Math.cos(p * 3) * 25
  ], n.haze);
  c(t, [
    i * 2 + 2.4,
    2.4,
    i * 2 + 2.4
  ], [
    0,
    -1.5,
    0
  ], n.dark), c(t, [
    i * 2 + 1.1,
    0.42,
    i * 2 + 1.1
  ], [
    0,
    -0.42,
    0
  ], n.trim), c(t, [
    i * 2 + 0.5,
    0.35,
    i * 2 + 0.5
  ], [
    0,
    -0.14,
    0
  ], n.floor);
  for (let p = -10; p <= 10; p += 2) for (let g = -10; g <= 10; g += 2) c(t, [
    1.96,
    0.045,
    1.96
  ], [
    p,
    0.025,
    g
  ], (p * 3 + g + 40) % 8 === 0 ? n.tile : n.floor);
  if (a) {
    r(t, n.trim, 5.35, 0, 0, 1, !1, 0.058), r(t, n.light, 5.18, 0, 0, 0.6, !1, 0.059), r(t, n.seam, 4.72, 0, 0, 0.65, !1, 0.061);
    for (let p = 0; p < 8; p++) {
      const g = p * Math.PI / 4, y = c(t, [
        0.18,
        0.025,
        0.55
      ], [
        Math.cos(g) * 5.04,
        0.065,
        Math.sin(g) * 5.04
      ], n.trim);
      y.rotation.y = -g + Math.PI / 2;
    }
    if (s === 1) o(t, "crescent", n.seam, [
      3,
      3,
      0.12
    ], [
      0,
      0.065,
      0
    ]).rotation.set(-Math.PI / 2, 0, 0.7);
    else {
      const p = [];
      for (let y = 0; y < (s === 2 ? 24 : 16); y++) {
        const w = y * Math.PI * 2 / (s === 2 ? 24 : 16), f = y % 2 ? 0.85 : s === 2 ? 2.6 : y % 4 ? 1.8 : 3.2;
        p.push([Math.cos(w) * f, Math.sin(w) * f]);
      }
      const g = e.shape(t, p, n.seam, [
        0,
        0.061,
        0
      ]);
      g.rotation.x = -Math.PI / 2, r(t, n.floor, 0.65, 0, 0, 1, !0, 0.065);
    }
  }
  for (const p of [-1, 1]) for (let g = 0; g < 4; g++) {
    const y = p * (7 + g % 2), w = -7 + g * 4, f = c(t, [
      0.035,
      0.016,
      0.55 + g * 0.1
    ], [
      y,
      0.055,
      w
    ], n.seam);
    f.rotation.y = g * 1.3;
    const x = c(t, [
      0.028,
      0.015,
      0.3
    ], [
      y + 0.1,
      0.055,
      w + 0.3
    ], n.seam);
    x.rotation.y = g * 1.3 + 0.8;
  }
  for (const p of [-i - 0.35, i + 0.35]) {
    c(t, [
      0.38,
      0.18,
      i * 2 + 1
    ], [
      p,
      0.08,
      0
    ], n.light);
    for (let g = -10; g <= 10; g += 5) l(p + Math.sign(p) * 0.5, g, g === -10 ? 3.6 : 1.35);
  }
  for (let p = 0; p < 6; p++) c(t, [
    7.2,
    0.24,
    1
  ], [
    0,
    -0.12 - p * 0.26,
    i + 0.65 + p * 0.8
  ], p % 2 ? n.stone : n.light);
  u(0, -i - 3, 8, 6.3);
  for (const p of [-1, 1]) {
    c(t, [
      5,
      3.2,
      1.9
    ], [
      p * 8.4,
      1.45,
      -i - 3
    ], n.dark), c(t, [
      5.5,
      0.3,
      2.3
    ], [
      p * 8.4,
      3.2,
      -i - 3
    ], n.light);
    const g = d(t, [
      p * 5.8,
      4.8,
      -i - 2.9
    ]);
    c(g, [
      2,
      0.08,
      0.08
    ], [
      0,
      0,
      0
    ], n.trim);
    for (let y = 0; y < 5; y++) c(g, [
      0.35,
      2.6 - Math.abs(y - 2) * 0.12,
      0.08
    ], [
      (y - 2) * 0.34,
      -1.35,
      Math.sin(y * 2) * 0.08
    ], y % 2 ? n.foliage : n.dark);
    if (c(g, [
      0.12,
      1.8,
      0.09
    ], [
      0,
      -1.15,
      0.13
    ], n.trim), s < 3) {
      for (let y = 0; y < 4; y++) h(p * (12.8 + y % 2), -9 + y * 5, 0.8 + y * 0.1);
      v(p * 15, -13, 1.5), v(p * 17, 1, 1.7);
    } else if (s === 3) for (let y = 0; y < 3; y++) {
      const w = d(t, [
        p * 15,
        0,
        -9 + y * 7
      ]);
      o(w, "cylinder", n.dark, [
        1.4,
        2.8,
        1.4
      ], [
        0,
        1.4,
        0
      ]), o(w, "cylinder", n.trim, [
        0.7,
        4.5,
        0.7
      ], [
        0,
        4.9,
        0
      ]), c(w, [
        1.5,
        1,
        0.2
      ], [
        0,
        1,
        1.3
      ], n.accent), o(w, "torus", n.trim, [
        1.1,
        1.1,
        0.3
      ], [
        0,
        1.2,
        1.4
      ]);
    }
    else if (s === 4) {
      for (let w = 0; w < 5; w++) o(t, "rock", w % 2 ? n.light : n.accent, [
        1,
        2.2 + w % 3,
        0.9
      ], [
        p * (13.5 + w % 2),
        1.2,
        -9 + w * 4
      ]).rotation.z = p * -0.2;
      const y = d(t, [
        p * 17,
        0,
        -13
      ]);
      c(y, [
        0.22,
        8,
        0.22
      ], [
        0,
        3.5,
        0
      ], n.dark), e.shape(y, [
        [0, 0],
        [3, -1],
        [0, -4]
      ], n.light, [
        0,
        6.5,
        0
      ]);
    } else {
      for (let w = 0; w < 4; w++) {
        const f = d(t, [
          p * 14,
          0,
          -10 + w * 6
        ]);
        c(f, [
          2.4,
          3.5,
          1
        ], [
          0,
          1.75,
          0
        ], n.dark);
        for (let x = 0; x < 3; x++) {
          c(f, [
            2.6,
            0.12,
            1.1
          ], [
            0,
            0.8 + x,
            0
          ], n.trim);
          for (let b = 0; b < 5; b++) c(f, [
            0.27,
            0.65 + b % 2 * 0.12,
            0.6
          ], [
            -0.85 + b * 0.4,
            1.2 + x,
            0.1
          ], b % 2 ? n.foliage : n.stone);
        }
      }
      const y = o(t, "torus", n.trim, [
        3.4,
        4,
        0.5
      ], [
        p * 18,
        6.2,
        -13
      ]);
      y.rotation.y = p * 0.3;
    }
    c(t, [
      7,
      1.4,
      18
    ], [
      p * 17,
      -0.7,
      -3
    ], n.dark), c(t, [
      6.7,
      0.1,
      17.7
    ], [
      p * 17,
      0.06,
      -3
    ], n.seam);
    for (const y of [-3.5, 3.5]) c(t, [
      0.22,
      0.25,
      18.2
    ], [
      p * 17 + y,
      0.13,
      -3
    ], n.stone);
    c(t, [
      9,
      1.8,
      10
    ], [
      p * 15,
      -0.9,
      -17
    ], n.dark), c(t, [
      8.7,
      0.1,
      9.7
    ], [
      p * 15,
      0.06,
      -17
    ], n.seam);
  }
  for (let p = 0; p < 7; p++) {
    const g = (p - 3) * 8, y = -26 - p % 3 * 6, w = 7 + p * 5 % 7;
    if (c(t, [
      5.2,
      w,
      5.5
    ], [
      g,
      w / 2 - 3,
      y
    ], n.stone), c(t, [
      5.8,
      0.4,
      6
    ], [
      g,
      w - 3,
      y
    ], n.light), s === 1) {
      const f = o(t, "crescent", n.trim, [
        1.5,
        1.5,
        1.5
      ], [
        g,
        w - 0.8,
        y
      ]);
      f.rotation.z = 0.9;
    } else if (s === 2) o(t, "cone", n.trim, [
      3.4,
      4.8,
      3.4
    ], [
      g,
      w - 0.8,
      y
    ]);
    else if (s === 3) {
      for (const f of [-1.3, 1.3]) o(t, "cylinder", n.dark, [
        0.7,
        5 + p % 2 * 2,
        0.7
      ], [
        g + f,
        w - 1,
        y
      ]);
      c(t, [
        3.8,
        0.25,
        4
      ], [
        g,
        w - 2.5,
        y
      ], n.trim);
    } else if (s === 4) {
      o(t, "cone", n.light, [
        3.2,
        4.5,
        3.2
      ], [
        g,
        w - 0.8,
        y
      ]);
      for (const f of [-1, 1]) o(t, "rock", n.accent, [
        0.4,
        2,
        0.4
      ], [
        g + f,
        w - 3,
        y + 3
      ]);
    } else if (s === 5)
      o(t, "rock", n.trim, [
        1.4,
        2.3,
        1.4
      ], [
        g,
        w + 0.7,
        y
      ]), o(t, "torus", n.accent, [
        2,
        2,
        2
      ], [
        g,
        w - 1,
        y
      ]).rotation.x = Math.PI / 2;
    else {
      for (const f of [
        -2,
        0,
        2
      ]) c(t, [
        0.7,
        1.2,
        5.6
      ], [
        g + f,
        w - 2.35,
        y
      ], n.light);
      p % 2 && v(g + 1, y + 2, 1.5);
    }
    for (const f of [
      -1.5,
      0,
      1.5
    ]) c(t, [
      0.5,
      2.8,
      0.12
    ], [
      g + f,
      w - 5.6,
      y + 2.8
    ], n.dark);
  }
  for (const p of a?.obstacles ?? []) {
    const g = d(t, [
      p.x,
      0,
      p.y
    ]);
    o(g, "cylinder", n.dark, [
      p.radius,
      0.22,
      p.radius
    ], [
      0,
      0.11,
      0
    ]), o(g, "cylinder", n.stone, [
      p.radius * 0.85,
      1.15,
      p.radius * 0.85
    ], [
      0,
      0.78,
      0
    ]), o(g, "cylinder", n.light, [
      p.radius,
      0.2,
      p.radius
    ], [
      0,
      1.4,
      0
    ]), o(g, "rock", n.accent, [
      0.28,
      0.58,
      0.28
    ], [
      0,
      1.9,
      0
    ]);
    for (let y = 0; y < 6; y++) {
      const w = y * Math.PI / 3;
      c(g, [
        0.09,
        0.8,
        0.09
      ], [
        Math.cos(w) * p.radius * 0.86,
        0.8,
        Math.sin(w) * p.radius * 0.86
      ], n.trim);
    }
  }
  if (!a) {
    o(t, "cylinder", n.dark, [
      2.1,
      0.16,
      2.1
    ], [
      0,
      0.08,
      -8
    ]), o(t, "cylinder", n.light, [
      1.95,
      0.14,
      1.95
    ], [
      0,
      0.2,
      -8
    ]), r(t, n.trim, 1.68, 0, -8, 1, !1, 0.28);
    for (const p of [-1, 1]) {
      h(p * 3, -8, 1.2), h(p * 4, -10, 0.85);
      const g = d(t, [
        p * 2.6,
        0.5,
        -6
      ]);
      o(g, "box", n.dark, [
        0.5,
        0.16,
        0.5
      ]), o(g, "box", n.flower, [
        0.3,
        0.55,
        0.3
      ], [
        0,
        0.35,
        0
      ]), o(g, "cone", n.trim, [
        0.42,
        0.3,
        0.42
      ], [
        0,
        0.74,
        0
      ]);
    }
  }
  return e.bake(t);
}
function ci(e, t, s) {
  const a = e.group(t, [
    0,
    1.3,
    0
  ]);
  a.scale.setScalar(1.5);
  const n = e.group(a), i = e.group(a, [
    0,
    0.5,
    0
  ]), o = e.group(i), d = s === "female", r = d ? 0.225 : 0.255, c = Qe.traveler.fabric, l = "#574a40", u = "#d7ab8b", h = "#463f3b";
  e.mesh(n, "sphere", c, [
    r,
    0.28,
    0.155
  ], [
    0,
    -0.04,
    0
  ]), e.mesh(n, "cylinder", c, [
    d ? 0.165 : 0.185,
    0.24,
    0.16
  ], [
    0,
    -0.25,
    0
  ]), e.mesh(n, "cylinder", l, [
    0.196,
    0.06,
    0.175
  ], [
    0,
    -0.24,
    0
  ]), e.mesh(n, "box", "#d5b77b", [
    0.07,
    0.067,
    0.025
  ], [
    0,
    -0.24,
    0.178
  ]), e.mesh(n, "cylinder", u, [
    0.066,
    0.16,
    0.07
  ], [
    0,
    0.265,
    0
  ]), e.mesh(i, "sphere", u, [
    d ? 0.161 : 0.172,
    0.22,
    0.165
  ]), e.mesh(o, "sphere", h, [
    0.18,
    0.125,
    0.173
  ], [
    0,
    0.135,
    -0.022
  ]);
  for (const f of [-1, 1])
    e.mesh(i, "sphere", u, [
      0.027,
      0.042,
      0.027
    ], [
      f * 0.166,
      -0.01,
      0
    ]), e.mesh(i, "sphere", "#303b3b", [
      0.019,
      0.023,
      0.012
    ], [
      f * 0.061,
      0.016,
      0.155
    ]), e.mesh(i, "box", h, [
      0.047,
      0.012,
      0.014
    ], [
      f * 0.064,
      0.062,
      0.154
    ]), e.mesh(o, "sphere", h, [
      0.035,
      0.12,
      0.08
    ], [
      f * 0.157,
      0.035,
      -0.036
    ]);
  if (e.mesh(i, "sphere", u, [
    0.027,
    0.041,
    0.028
  ], [
    0,
    -0.025,
    0.16
  ]), e.mesh(i, "box", "#a86e60", [
    0.045,
    9e-3,
    0.012
  ], [
    0,
    -0.1,
    0.148
  ]), d) {
    const f = e.group(o, [
      0,
      0.06,
      -0.17
    ]);
    for (let x = 0; x < 4; x++) e.mesh(f, "sphere", h, [
      0.064 - x * 9e-3,
      0.09,
      0.063 - x * 8e-3
    ], [
      x % 2 ? 0.014 : -0.014,
      -x * 0.115,
      0
    ]);
    e.mesh(f, "box", c, [
      0.066,
      0.032,
      0.066
    ], [
      0,
      -0.33,
      0
    ]);
  }
  const v = [], p = [];
  for (const f of [-1, 1]) {
    const x = e.group(a, [
      f * r,
      0.12,
      0
    ]);
    v.push(x), e.mesh(x, "cylinder", c, [
      0.076,
      0.27,
      0.078
    ], [
      0,
      -0.12,
      0
    ]), e.mesh(x, "cylinder", "#e5dfcd", [
      0.081,
      0.085,
      0.081
    ], [
      0,
      -0.27,
      0
    ]), e.mesh(x, "cylinder", u, [
      0.052,
      0.14,
      0.057
    ], [
      0,
      -0.36,
      8e-3
    ]), e.mesh(x, "sphere", u, [
      0.06,
      0.075,
      0.047
    ], [
      0,
      -0.45,
      0.015
    ]);
    const b = e.group(a, [
      f * 0.105,
      -0.32,
      0
    ]);
    p.push(b), e.mesh(b, "cylinder", "#434e55", [
      0.078,
      0.35,
      0.085
    ], [
      0,
      -0.15,
      0
    ]), e.mesh(b, "cylinder", l, [
      0.085,
      0.23,
      0.091
    ], [
      0,
      -0.39,
      0
    ]), e.mesh(b, "sphere", l, [
      0.089,
      0.066,
      0.155
    ], [
      0,
      -0.485,
      0.056
    ]);
  }
  o.removeFromParent();
  const g = [
    n,
    i,
    o,
    ...v,
    ...p
  ].map((f) => e.bake(f));
  i.add(o);
  const y = [];
  a.traverse((f) => {
    f instanceof Mt && f.material === e.material(c) && y.push(f);
  });
  let w = null;
  return {
    body: a,
    hand: e.group(v[1], [
      0,
      -0.45,
      0.015
    ]),
    dress(f) {
      if (f !== w) {
        w = f;
        for (const x of y) x.material = e.material(Qe[f].fabric);
        o.visible = ![
          "helm",
          "hat",
          "hood"
        ].includes(Qe[f].head);
      }
    },
    pose(f, x, b, M, z, L) {
      const A = !z && b ? Math.sin(x * 0.55) * 0.48 : 0;
      a.position.y = 1.3 + (!z && b ? Math.abs(Math.sin(x * 0.55)) * 0.025 : 0), a.rotation.set(!z && M ? 0.16 : 0, Math.PI / 2 - f, 0), p.forEach((j, P) => {
        j.rotation.x = (P ? -1 : 1) * A;
      }), v.forEach((j, P) => {
        j.rotation.set(P && L ? -0.55 : (P ? 1 : -1) * A * 0.65, 0, (P ? -1 : 1) * 0.1);
      });
    },
    dispose() {
      g.forEach((f) => f()), a.removeFromParent();
    }
  };
}
function di(e, t, s) {
  const a = Qe[s], { mesh: n, group: i, shape: o } = e, d = i(t, [
    0,
    0.2,
    -0.23
  ]), r = i(t, [
    0,
    0.328,
    0
  ]), c = i(t, [
    0,
    0.55,
    0
  ]);
  r.scale.set(0.64, 0.78, 0.72);
  const l = a.silhouette === "robe" || a.silhouette === "coat";
  if (o(d, [
    [-0.23, 0],
    [0.23, 0],
    [0.38, l ? -0.68 : -0.48],
    [0.1, l ? -0.77 : -0.59],
    [-0.36, l ? -0.68 : -0.5]
  ], a.fabric), o(d, [
    [-0.04, -0.08],
    [0.04, -0.08],
    [0.055, l ? -0.61 : -0.45],
    [0, l ? -0.68 : -0.5],
    [-0.05, l ? -0.61 : -0.45]
  ], a.metal, [
    0,
    0,
    -0.012
  ]), n(t, "torus", a.fabric, [
    0.2,
    0.15,
    0.19
  ], [
    0,
    0.19,
    0
  ]).rotation.x = Math.PI / 2, a.silhouette === "armor") {
    n(t, "sphere", a.metal, [
      0.295,
      0.18,
      0.27
    ], [
      0,
      -0.15,
      0
    ], !1, 1, !0), n(t, "rock", a.glow, [
      0.065,
      0.09,
      0.025
    ], [
      0,
      -0.07,
      0.285
    ]);
    for (const u of [-1, 1]) n(t, "rock", a.metal, [
      0.15,
      0.12,
      0.17
    ], [
      u * 0.3,
      -0.02,
      0
    ], !1, 1, !0);
  } else l && (n(t, "cone", a.fabric, [
    0.34,
    0.46,
    0.27
  ], [
    0,
    -0.2,
    -0.025
  ]), o(t, [
    [-0.07, 0],
    [0.07, 0],
    [0.14, -0.42],
    [-0.14, -0.42]
  ], a.metal, [
    0,
    -0.02,
    0.245
  ]), n(t, "rock", a.glow, [
    0.055,
    0.065,
    0.035
  ], [
    0,
    -0.12,
    0.285
  ]));
  if (a.head === "helm") {
    n(r, "sphere", a.metal, [
      0.31,
      0.13,
      0.265
    ], [
      0,
      0.44,
      -0.015
    ], !1, 1, !0);
    for (const u of [-1, 1]) n(r, "box", a.metal, [
      0.065,
      0.22,
      0.17
    ], [
      u * 0.285,
      0.29,
      -0.02
    ], !1, 1, !0);
  } else if (a.head === "hat")
    n(r, "cylinder", a.fabric, [
      0.43,
      0.045,
      0.32
    ], [
      0,
      0.46,
      0
    ]), n(r, "cone", a.fabric, [
      0.23,
      0.48,
      0.23
    ], [
      0.055,
      0.7,
      -0.02
    ]).rotation.z = -0.18, n(r, "torus", a.metal, [
      0.245,
      0.245,
      0.24
    ], [
      0,
      0.52,
      -0.01
    ]).rotation.x = Math.PI / 2;
  else if (a.head === "hood") {
    n(r, "sphere", a.fabric, [
      0.345,
      0.35,
      0.265
    ], [
      0,
      0.22,
      -0.12
    ]);
    for (const u of [-1, 1]) n(r, "sphere", a.fabric, [
      0.075,
      0.19,
      0.08
    ], [
      u * 0.285,
      0.19,
      0.055
    ]);
  } else if (a.head === "crown") {
    n(r, "torus", a.metal, [
      0.28,
      0.28,
      0.28
    ], [
      0,
      0.48,
      0
    ], !1, 1, !0).rotation.x = Math.PI / 2;
    for (let u = 0; u < 5; u++) {
      const h = u * Math.PI * 2 / 5;
      n(r, "cone", a.metal, [
        0.045,
        0.2,
        0.045
      ], [
        Math.sin(h) * 0.27,
        0.57,
        Math.cos(h) * 0.27
      ]);
    }
  } else if (a.head === "horns") for (const u of [-1, 1]) {
    const h = i(r, [
      u * 0.26,
      0.5,
      -0.06
    ]);
    h.rotation.z = u * -0.45, n(h, "cylinder", a.metal, [
      0.035,
      0.44,
      0.03
    ], [
      0,
      0.18,
      0
    ]);
    for (const v of [0.16, 0.3]) n(h, "cone", a.metal, [
      0.025,
      0.22,
      0.025
    ], [
      u * 0.06,
      v,
      0
    ]).rotation.z = u * -0.8;
  }
  else if (a.head === "goggles") {
    n(r, "torus", "#4c4a42", [
      0.32,
      0.22,
      0.27
    ], [
      0,
      0.4,
      0
    ]).rotation.x = Math.PI / 2;
    for (const u of [-1, 1])
      n(r, "torus", a.metal, [
        0.095,
        0.075,
        0.05
      ], [
        u * 0.115,
        0.39,
        0.24
      ]), n(r, "sphere", a.glow, [
        0.08,
        0.06,
        0.045
      ], [
        u * 0.115,
        0.39,
        0.24
      ]);
  }
  switch (s) {
    case "guardian":
      n(r, "cone", a.fabric, [
        0.08,
        0.28,
        0.1
      ], [
        0,
        0.67,
        -0.06
      ]);
      break;
    case "moonweaver":
      n(r, "crescent", a.metal, [
        0.15,
        0.15,
        0.05
      ], [
        0,
        0.67,
        0.19
      ]).rotation.z = 0.8;
      break;
    case "sovereign":
      for (const u of [-1, 1]) n(t, "cone", a.metal, [
        0.1,
        0.2,
        0.12
      ], [
        u * 0.35,
        0.12,
        -0.03
      ]).rotation.z = u * -0.5;
      break;
    case "ranger":
      n(t, "cylinder", "#79543d", [
        0.095,
        0.46,
        0.085
      ], [
        -0.25,
        0.1,
        -0.31
      ]).rotation.z = -0.35;
      for (let u = 0; u < 3; u++) n(t, "cylinder", a.metal, [
        0.012,
        0.32,
        0.012
      ], [
        -0.21 + u * 0.04,
        0.4,
        -0.29
      ]);
      n(r, "cone", a.glow, [
        0.06,
        0.25,
        0.04
      ], [
        -0.31,
        0.48,
        -0.05
      ]).rotation.z = -0.6;
      break;
    case "paladin":
      for (const u of [-1, 1]) o(t, [
        [0, 0],
        [u * 0.22, 0.24],
        [u * 0.18, -0.05],
        [u * 0.05, -0.12]
      ], a.metal, [
        u * 0.32,
        0.02,
        -0.06
      ]);
      break;
    case "witch":
      for (const u of [-1, 1])
        n(t, "sphere", a.glow, [
          0.05,
          0.065,
          0.04
        ], [
          u * 0.27,
          -0.16,
          0.17
        ]), n(t, "box", a.metal, [
          0.07,
          0.025,
          0.07
        ], [
          u * 0.27,
          -0.09,
          0.17
        ]);
      break;
    case "assassin":
      n(t, "sphere", a.metal, [
        0.21,
        0.045,
        0.055
      ], [
        0,
        0.045,
        0.25
      ]), o(t, [
        [0, 0],
        [0.1, -0.07],
        [0.08, -0.29],
        [0, -0.19]
      ], a.metal, [
        -0.1,
        -0.02,
        0.27
      ]);
      break;
    case "machinist":
      n(t, "box", a.metal, [
        0.38,
        0.4,
        0.18
      ], [
        0,
        0.06,
        -0.35
      ], !1, 1, !0);
      for (const u of [-1, 1]) n(t, "cylinder", "#c99767", [
        0.06,
        0.32,
        0.06
      ], [
        u * 0.14,
        0.21,
        -0.38
      ]);
      n(t, "rock", a.glow, [
        0.09,
        0.14,
        0.05
      ], [
        0,
        0.06,
        -0.46
      ]);
      break;
    case "beastcaller":
      for (let u = -2; u <= 2; u++) n(t, "rock", u % 2 ? a.fabric : a.metal, [
        0.07,
        0.17,
        0.045
      ], [
        u * 0.11,
        -0.07,
        0.21
      ]).rotation.z = u * 0.27;
      break;
    case "frostbound":
      for (let u = -2; u <= 2; u++) n(t, "sphere", "#f6ffff", [
        0.08,
        0.075,
        0.09
      ], [
        u * 0.115,
        5e-3,
        0.13
      ]);
      for (const u of [-1, 1]) n(t, "rock", a.glow, [
        0.09,
        0.36,
        0.09
      ], [
        u * 0.3,
        0.22,
        -0.35
      ]).rotation.z = u * -0.5;
      break;
    case "stargazer":
      n(c, "torus", a.metal, [
        0.43,
        0.43,
        0.43
      ], [
        0,
        0.16,
        0
      ], !1, 1, !0).rotation.x = 0.6;
      for (let u = 0; u < 3; u++) {
        const h = u * Math.PI * 2 / 3;
        n(c, "rock", a.glow, [
          0.04,
          0.075,
          0.04
        ], [
          Math.cos(h) * 0.47,
          0.16,
          Math.sin(h) * 0.47
        ]);
      }
      break;
    case "traveler":
      break;
  }
  return {
    cape: d,
    animate(u, h) {
      c.rotation.y = h ? 0.4 : u * 0.014;
    }
  };
}
function ui(e, t, s, a, n, i) {
  const { mesh: o, group: d, shape: r } = e, c = "#d6b881", l = "#fff0c1", u = (h, v, p) => {
    for (const g of [-1, 1]) o(s, "sphere", l, [
      0.09,
      0.055,
      0.06
    ], [
      g * p,
      h,
      v
    ], !0);
  };
  switch (n) {
    case "thornheart":
      o(t, "cone", "#576e58", [
        1.6,
        2.9,
        1.3
      ], [
        0,
        1.45,
        0
      ]), o(s, "rock", "#8da17f", [
        0.8,
        1,
        0.65
      ], [
        0,
        2.3,
        0.5
      ]), u(2.6, 1.06, 0.28);
      for (let h = 0; h < 7; h++) {
        const v = h * Math.PI * 2 / 7, p = d(t, [
          Math.cos(v) * 0.8,
          2.6,
          Math.sin(v) * 0.6
        ]);
        p.rotation.z = Math.cos(v) * 0.8, o(p, "cone", "#526451", [
          0.18,
          2.4,
          0.18
        ], [
          0,
          0.9,
          0
        ]), o(p, "rock", i.foliage, [
          0.6,
          0.6,
          0.4
        ], [
          0,
          1.3,
          0
        ]), o(t, "cone", "#67765a", [
          0.3,
          2,
          0.3
        ], [
          Math.cos(v),
          0.28,
          Math.sin(v)
        ]).rotation.z = 1.15;
      }
      o(t, "rock", "#ebbb73", [
        0.35,
        0.55,
        0.2
      ], [
        0,
        1.6,
        1.1
      ]);
      break;
    case "astrologer":
      o(t, "cone", "#777191", [
        0.85,
        2.2,
        0.75
      ], [
        0,
        1.8,
        0
      ]), o(s, "sphere", "#c3c1db", [
        0.5,
        0.6,
        0.42
      ], [
        0,
        3.1,
        0
      ]), o(s, "box", "#4c4469", [
        0.94,
        0.18,
        0.16
      ], [
        0,
        3.2,
        0.38
      ]);
      for (const h of [
        1.35,
        1.8,
        2.25
      ]) o(a, "torus", c, [
        h,
        h,
        h
      ], [
        0,
        2.2,
        0
      ], !1, 1, !0).rotation.set(h * 0.7, 0.5, h);
      o(a, "sphere", "#d6dbff", [
        0.23,
        0.23,
        0.23
      ], [
        1.8,
        2.3,
        0.3
      ], !0);
      break;
    case "phoenix":
      o(t, "rock", "#ac6249", [
        0.65,
        1.3,
        0.7
      ], [
        0,
        1.8,
        0
      ]), o(s, "sphere", "#e4ac68", [
        0.4,
        0.5,
        0.43
      ], [
        0,
        3.15,
        0.25
      ]), u(3.25, 0.63, 0.18), o(s, "cone", c, [
        0.18,
        0.55,
        0.15
      ], [
        0,
        3.03,
        0.76
      ]).rotation.x = Math.PI / 2;
      for (const h of [-1, 1]) {
        for (let v = 0; v < 5; v++) r(a, [
          [0, 0],
          [h * (2.4 - v * 0.25), 0.95 - v * 0.22],
          [h * (2 - v * 0.24), -0.1 - v * 0.24],
          [0, -0.45]
        ], v % 2 ? "#e2a465" : "#d47c4f", [
          h * 0.4,
          2.5,
          -0.1 - v * 0.06
        ]);
        o(t, "cone", "#e3a25b", [
          0.18,
          1.5,
          0.25
        ], [
          h * 0.3,
          0.6,
          -0.6
        ]).rotation.x = -0.8;
      }
      break;
    case "forgemaster":
      o(t, "box", "#675756", [
        1.8,
        2.1,
        1.2
      ], [
        0,
        1.6,
        0
      ]), o(t, "box", "#9b6148", [
        1.2,
        1.6,
        0.17
      ], [
        0,
        1.55,
        0.7
      ]), o(s, "cylinder", "#b08563", [
        0.7,
        0.7,
        0.6
      ], [
        0,
        3.05,
        0
      ]), o(s, "box", "#ffd18c", [
        0.65,
        0.1,
        0.08
      ], [
        0,
        3.12,
        0.63
      ], !0);
      for (const h of [-1, 1])
        o(t, "cylinder", i.dark, [
          0.36,
          0.8,
          0.38
        ], [
          h * 0.55,
          0.5,
          0
        ]), o(t, "sphere", "#c9976e", [
          0.65,
          0.55,
          0.55
        ], [
          h * 1.05,
          2.5,
          0
        ], !1, 1, !0);
      a.position.set(1.4, 1.7, 0.4), o(a, "cylinder", "#765948", [
        0.1,
        2.3,
        0.1
      ]), o(a, "box", "#444e57", [
        1.8,
        0.8,
        0.9
      ], [
        0,
        1.3,
        0
      ]), o(a, "box", "#ffc482", [
        0.5,
        0.72,
        0.95
      ], [
        0,
        1.3,
        0
      ]);
      break;
    case "colossus":
      o(t, "sphere", "#565d63", [
        1.45,
        1.6,
        0.95
      ], [
        0,
        2.15,
        0
      ]), o(t, "torus", "#b68d66", [
        0.78,
        0.78,
        0.45
      ], [
        0,
        2.25,
        0.82
      ], !1, 1, !0), o(t, "sphere", "#ffb77b", [
        0.57,
        0.57,
        0.2
      ], [
        0,
        2.25,
        1
      ], !0), o(s, "box", "#818883", [
        1.3,
        0.5,
        1
      ], [
        0,
        3.7,
        0
      ]), u(3.73, 0.51, 0.3);
      for (const h of [-1, 1])
        o(t, "box", "#818883", [
          0.8,
          1.2,
          0.95
        ], [
          h * 0.8,
          0.6,
          0
        ]), o(a, "cylinder", "#6b7375", [
          0.65,
          2.1,
          0.65
        ], [
          h * 1.75,
          1.85,
          0
        ]), o(a, "box", "#b29370", [
          1.1,
          0.8,
          1.1
        ], [
          h * 1.75,
          0.8,
          0.15
        ]);
      break;
    case "frostqueen":
      o(t, "cone", "#82a9c1", [
        1.1,
        2.7,
        0.95
      ], [
        0,
        1.8,
        0
      ]), o(s, "sphere", "#d5e9ec", [
        0.45,
        0.58,
        0.4
      ], [
        0,
        3.35,
        0
      ]), u(3.4, 0.39, 0.18);
      for (let h = -2; h <= 2; h++) o(s, "rock", "#d8fbff", [
        0.11,
        0.48 - Math.abs(h) * 0.08,
        0.11
      ], [
        h * 0.18,
        3.94,
        0.02
      ]);
      for (const h of [-1, 1]) r(t, [
        [0, 0],
        [h * 0.95, 0.8],
        [h * 0.5, -1.3],
        [0, -0.5]
      ], "#bddeeb", [
        h * 0.5,
        2.7,
        -0.35
      ]);
      a.position.set(1.05, 1.9, 0), o(a, "cylinder", "#aec9d5", [
        0.045,
        2.5,
        0.045
      ]), o(a, "rock", "#ddfbff", [
        0.28,
        0.5,
        0.2
      ], [
        0,
        1.5,
        0
      ]);
      break;
    case "leviathan":
      for (let h = 0; h < 5; h++) {
        const v = 1 - h * 0.14;
        o(t, "sphere", h % 2 ? "#658c9c" : "#7da9b8", [
          v,
          v * 0.8,
          v
        ], [
          Math.sin(h * 0.6) * 0.4,
          0.8,
          0.5 - h * 0.8
        ]), o(t, "cone", "#d7e9dc", [
          0.2 * v,
          0.6 * v,
          0.25 * v
        ], [
          0,
          1.5 - h * 0.13,
          0.4 - h * 0.7
        ]);
      }
      o(s, "rock", "#7da9b8", [
        1.05,
        0.7,
        0.85
      ], [
        0,
        1.05,
        1
      ]), u(1.32, 1.65, 0.43);
      for (const h of [-1, 1])
        r(a, [
          [0, 0],
          [h * 1.4, 0.1],
          [h * 0.8, -0.7]
        ], "#b6d6d8", [
          h * 0.7,
          0.7,
          0
        ]), o(s, "cone", "#e4efde", [
          0.15,
          1,
          0.15
        ], [
          h * 0.72,
          1.65,
          1.2
        ]).rotation.z = h * -0.7;
      break;
    case "archivist":
      o(t, "cone", "#685881", [
        0.95,
        2.6,
        0.8
      ], [
        0,
        2,
        0
      ]), o(s, "rock", "#e7dcc4", [
        0.45,
        0.62,
        0.38
      ], [
        0,
        3.6,
        0
      ]), u(3.65, 0.38, 0.16);
      for (let h = 0; h < 5; h++) {
        const v = h * Math.PI * 2 / 5, p = d(a, [
          Math.cos(v) * 1.7,
          2.5 + Math.sin(v) * 0.6,
          Math.sin(v) * 1.3
        ]);
        p.rotation.z = v * 0.3, o(p, "box", "#baa481", [
          0.55,
          0.72,
          0.14
        ]), o(p, "box", "#f1e4c6", [
          0.48,
          0.65,
          0.15
        ], [
          0,
          0,
          0.03
        ]);
      }
      o(s, "torus", c, [
        0.75,
        0.75,
        0.75
      ], [
        0,
        4.25,
        0
      ]).rotation.x = Math.PI / 2;
      break;
    case "voidknight":
      o(t, "box", "#51486f", [
        0.95,
        1.5,
        0.65
      ], [
        0,
        1.75,
        0
      ]), o(s, "rock", "#b8afcc", [
        0.43,
        0.66,
        0.4
      ], [
        0,
        2.95,
        0
      ]), u(3, 0.4, 0.17);
      for (const h of [-1, 1]) {
        o(t, "box", "#867995", [
          0.33,
          0.9,
          0.4
        ], [
          h * 0.3,
          0.55,
          0
        ]), o(t, "rock", "#b8afcc", [
          0.5,
          0.28,
          0.38
        ], [
          h * 0.6,
          2.4,
          0
        ]);
        const v = d(a, [
          h * 0.85,
          1.8,
          0.2
        ]);
        v.rotation.z = h * -0.25, r(v, [
          [-0.07, 0],
          [0.15, 0],
          [0.3, 1.5],
          [0.12, 2.25],
          [-0.13, 1.7]
        ], "#dfc9ff");
      }
      r(t, [
        [-0.4, 0],
        [0.4, 0],
        [0.85, -2.1],
        [0, -1.4],
        [-0.65, -2.3]
      ], "#4a4266", [
        0,
        2.45,
        -0.4
      ]);
      break;
  }
}
function hi(e, t) {
  const s = e.group(t), a = e.group(s), n = [
    [0, 0.35],
    [0.16, 0.32],
    [0.26, 0.22],
    [0.25, -0.02],
    [0.19, -0.18],
    [0.09, -0.29],
    [0, -0.34],
    [-0.09, -0.29],
    [-0.19, -0.18],
    [-0.25, -0.02],
    [-0.26, 0.22],
    [-0.16, 0.32]
  ], i = e.shape(a, n, Ie.block, [
    0,
    0,
    0
  ], 0.055), o = e.shape(a, n, Ie.enamel, [
    0,
    0,
    0.057
  ], 0.025);
  o.scale.set(0.87, 0.87, 1), e.shape(a, n, Ie.enamel, [
    0,
    0,
    -0.018
  ]).scale.set(0.87, 0.87, 1);
  for (const c of [-0.025, 0.09])
    e.shape(a, [
      [0, 0.24],
      [0.08, 0.12],
      [0.045, -0.07],
      [0, -0.2],
      [-0.045, -0.07],
      [-0.08, 0.12]
    ], Ie.silver, [
      0,
      0,
      c
    ]), e.mesh(a, "rock", Ie.block, [
      0.035,
      0.06,
      0.015
    ], [
      0,
      0.075,
      c + Math.sign(c) * 0.014
    ], !1, 1, !0);
  let d = 0, r = -1;
  return s.visible = !1, { update(c, l, u, h, v) {
    const p = l ? 1 : 0, g = Math.max(0, Math.min(4, h - r));
    d = v || r < 0 || h < r ? p : d + (p - d) * (1 - Math.exp(-g * 0.85)), r = h, s.visible = c === "blade" || l || d > 0.04, s.position.set(-0.4 + d * 0.12, -0.1 + d * 0.3, 0.17 + d * 0.25), s.rotation.set(0.12 - d * 0.22, 0.15 - d * 0.3, -0.16 + d * 0.22), a.scale.setScalar(0.94 + d * 0.07), i.material = e.material(u ? Ie.parry : c === "blade" ? Ie.block : Ie.ward, !1, 1, !0), o.material = e.material(l ? "#617f99" : Ie.enamel);
  } };
}
function fi(e, t) {
  const s = e.group(t), a = new js({
    transparent: !0,
    depthWrite: !1,
    uniforms: {
      tint: { value: new Qa(Ie.ward) },
      impact: { value: 0 }
    },
    vertexShader: `varying vec3 surfaceNormal; varying vec3 viewDirection;
            void main() { vec4 p = modelViewMatrix * vec4(position, 1.0); surfaceNormal = normalMatrix * normal;
                viewDirection = -p.xyz; gl_Position = projectionMatrix * p; }`,
    fragmentShader: `uniform vec3 tint; uniform float impact; varying vec3 surfaceNormal; varying vec3 viewDirection;
            void main() { float rim = pow(1.0 - abs(dot(normalize(surfaceNormal), normalize(viewDirection))), 2.2);
                gl_FragColor = vec4(mix(tint, vec3(1.0), rim * .4 + impact * .3), .045 + rim * .65 + impact * .16);
                #include <tonemapping_fragment>
                #include <colorspace_fragment>
            }`
  }), n = new Mt(e.geometries.sphere, a);
  return n.scale.set(1.12, 1.4, 1.12), n.position.y = 1.3, s.add(n), s.visible = !1, {
    update(i, o) {
      s.visible = !!i && i.ward > 0, !(!i || !s.visible) && (s.position.set(i.x, 0, i.y), a.uniforms.impact.value = o, s.scale.setScalar(1 + o * 0.035));
    },
    dispose() {
      a.dispose(), s.removeFromParent();
    }
  };
}
function pi(e, t) {
  const s = e.group(t, [
    0,
    0.15,
    0.12
  ]), a = [];
  s.rotation.set(-0.45, 0, -0.2);
  for (const l of [-1, 1]) {
    const u = e.group(s);
    e.mesh(u, "box", Fe.cover, [
      0.25,
      0.055,
      0.44
    ], [
      l * 0.125,
      0,
      0
    ]), e.mesh(u, "box", Fe.page, [
      0.22,
      0.06,
      0.38
    ], [
      l * 0.12,
      0.04,
      0
    ]), a.push(u);
  }
  const n = e.group(s, [
    0,
    0.085,
    0
  ]);
  e.mesh(n, "box", "#fffced", [
    0.22,
    0.012,
    0.37
  ], [
    0.11,
    0,
    0
  ]);
  const i = e.mesh(s, "rock", Fe.empowered, [
    0.07,
    0.1,
    0.07
  ], [
    0,
    0.3,
    0
  ], !1, 1, !0), o = e.mesh(s, "torus", Fe.crest, [
    0.17,
    0.17,
    0.17
  ], [
    0,
    0.31,
    0
  ], !0, 0.65);
  o.rotation.x = Math.PI / 2;
  let d = 0, r = 0.15, c = -1;
  return { update(l, u, h, v) {
    const p = v || c < 0 || h < c ? 1 : 1 - Math.exp(-Math.min(4, h - c) * 0.5);
    c = h, d += ((l ? 1 : 0) - d) * p, r += ((u ? 0.5 : l ? 0.28 : 0.15) - r) * p, s.position.y = r, s.rotation.x = -0.45 + (r - 0.15) * 0.7, a[0].rotation.z = -0.65 + d * 0.5, a[1].rotation.z = 0.65 - d * 0.5, n.rotation.z = v ? 0.2 : 0.2 + d * (Math.sin(h * 0.18) + 1) * 1.3, i.scale.set(0.07 + d * 0.025, 0.1 + d * 0.06, 0.07 + d * 0.025), o.visible = l, v || (i.rotation.y = h * 0.08);
  } };
}
function ms(e, t, s = 1) {
  const a = e.group(t);
  a.scale.setScalar(s), e.shape(a, [
    [0.02, -0.44],
    [0.11, -0.41],
    [0.27, -0.2],
    [0.29, 0.12],
    [0.18, 0.42],
    [0.04, 0.51],
    [0.1, 0.28],
    [0.14, 0],
    [0.08, -0.25]
  ], "#ceac6e", [
    0,
    0,
    0.06
  ]), e.mesh(a, "box", "#f5f3dc", [
    0.012,
    0.94,
    0.015
  ], [
    0.04,
    0.03,
    0.07
  ]), e.mesh(a, "box", "#705444", [
    0.09,
    0.18,
    0.09
  ], [
    0.12,
    0,
    0.06
  ]);
}
function vs(e, t, s) {
  const a = e.group(t), n = ci(e, a, s), i = n.body, o = e.ring(a, "#193f49", 0.6, 0, 0, 0.14, !0), d = e.group(i), r = n.hand, c = e.group(d), l = hi(e, d);
  let u = null, h = -1, v = Math.PI / 2, p = null, g = null, y = null, w = 0, f = 0;
  function x(b, M) {
    if (!(b === g && M === y)) {
      if (g = b, y = M, c.clear(), r.clear(), u = null, p = di(e, c, y), n.dress(y), g === "blade")
        e.mesh(r, "cylinder", "#624d42", [
          0.035,
          0.28,
          0.035
        ], [
          0,
          -0.08,
          0.06
        ]), e.mesh(r, "box", "#d4b470", [
          0.32,
          0.05,
          0.11
        ], [
          0,
          0.07,
          0.06
        ], !1, 1, !0), e.shape(r, [
          [-0.07, 0.1],
          [0.07, 0.1],
          [0.07, 0.65],
          [0, 0.83],
          [-0.07, 0.65]
        ], "#f5f8ef", [
          0,
          0,
          0.07
        ], 0.018), e.shape(r, [
          [0, 0.1],
          [0.07, 0.1],
          [0.07, 0.65],
          [0, 0.83]
        ], "#9cc6ce", [
          0,
          0,
          0.094
        ]);
      else if (g === "bow") ms(e, r);
      else if (g === "staff")
        e.mesh(r, "cylinder", "#796889", [
          0.035,
          1.12,
          0.035
        ], [
          0,
          0.18,
          0.04
        ]), e.mesh(r, "torus", "#d8bc80", [
          0.19,
          0.24,
          0.18
        ], [
          0,
          0.85,
          0.04
        ], !1, 1, !0), e.mesh(r, "rock", "#b9ecff", [
          0.11,
          0.18,
          0.1
        ], [
          0,
          0.85,
          0.04
        ]);
      else if (g === "daggers") for (const z of [-1, 1]) {
        const L = e.group(r, [
          z < 0 ? -0.58 : 0,
          0,
          0
        ]);
        e.mesh(L, "box", "#974953", [
          0.07,
          0.2,
          0.07
        ]), e.shape(L, [
          [-0.045, 0.1],
          [0.05, 0.1],
          [0.035, 0.34],
          [0, 0.47],
          [-0.06, 0.27]
        ], "#dce9ed", [
          0,
          0,
          0.03
        ]);
      }
      else if (g === "grimoire") u = pi(e, r);
      else if (g === "cannon") {
        const z = e.group(r, [
          0.02,
          0.08,
          0.17
        ]);
        z.rotation.x = Math.PI / 2, e.mesh(z, "cylinder", "#586e77", [
          0.12,
          0.55,
          0.12
        ], [
          0,
          0.1,
          0
        ], !1, 1, !0), e.mesh(z, "torus", "#d2a96c", [
          0.15,
          0.15,
          0.15
        ], [
          0,
          0.39,
          0
        ], !1, 1, !0).rotation.x = Math.PI / 2, e.mesh(r, "box", "#906749", [
          0.22,
          0.16,
          0.2
        ], [
          0,
          -0.1,
          0.13
        ]);
      }
    }
  }
  return {
    root: a,
    update(b, M, z, L, A, j, P = !1) {
      x(M, z), l.update(M, !!b?.shield, !!b?.guard, L, A);
      const U = A || h < 0 || L < h ? 1 : 1 - Math.exp(-Math.min(4, L - h) * 0.65);
      h = L;
      const D = j ? Math.PI / 2 + 0.23 : b?.facing ?? Math.PI / 2;
      v += Math.atan2(Math.sin(D - v), Math.cos(D - v)) * U;
      const J = !!b && Math.abs(b.x - w) + Math.abs(b.y - f) > 1e-3, ie = !!b?.dashTime;
      a.position.set(b?.x ?? 0, j ? 0.3 : 0, b?.y ?? -8), a.scale.setScalar(j ? 1.65 : 1), n.pose(v, L, J, ie, A, !!b?.swing || P), p.cape.rotation.x = A ? -0.15 : -0.15 - (J ? 0.5 : 0.06) - Math.sin(L * 0.15) * 0.12, p.animate(L, A);
      const F = b?.swing && !A ? Math.sin(b.swing / (M === "cannon" ? 16 : 9) * Math.PI) : 0;
      r.rotation.z += ((P ? -0.3 : -0.2 - F * 1.3) - r.rotation.z) * U, r.rotation.x += ((P ? -0.25 : 0.1 + F * 0.6) - r.rotation.x) * U, u && u.update(!!b?.resonance, P, L, A), o.scale.set(0.6 + (ie ? 0.25 : 0), 0.6, 1), b && (w = b.x, f = b.y);
    },
    dispose() {
      n.dispose(), a.removeFromParent();
    }
  };
}
function sn(e, t, s, a) {
  const { mesh: n, group: i } = e, o = i(t), d = i(o), r = i(d), c = i(d), l = [], u = we(s), h = de[s].radius;
  e.ring(o, "#1d3540", h * 1.15, 0, 0, 0.16, !0);
  const v = "#cfad70", p = "#fff0b0", g = a.dark;
  function y(P, U, D) {
    const J = i(d, [
      P,
      D,
      U
    ]);
    n(J, "box", g, [
      0.32,
      D,
      0.42
    ], [
      0,
      -D / 2,
      0
    ]), n(J, "box", a.stone, [
      0.38,
      0.22,
      0.55
    ], [
      0,
      -D + 0.11,
      0.1
    ]), l.push(J);
  }
  function w(P, U, D = "#d9e8df") {
    n(P, "box", v, [
      0.55,
      0.1,
      0.24
    ], [
      0,
      0.25,
      0
    ], !1, 1, !0), n(P, "box", g, [
      0.11,
      0.4,
      0.11
    ]), n(P, "box", D, [
      0.2,
      U,
      0.13
    ], [
      0,
      U / 2 + 0.35,
      0
    ], !1, 1, !0), n(P, "cone", D, [
      0.15,
      0.4,
      0.13
    ], [
      0,
      U + 0.5,
      0
    ]);
  }
  if (s === "charger") {
    n(d, "rock", a.stone, [
      0.58,
      0.58,
      0.9
    ], [
      0,
      0.7,
      0
    ]), n(c, "rock", g, [
      0.43,
      0.45,
      0.46
    ], [
      0,
      0.73,
      0.7
    ]);
    for (const P of [-0.27, 0.27]) {
      const U = n(c, "cone", v, [
        0.15,
        0.7,
        0.15
      ], [
        P,
        1.15,
        0.9
      ]);
      U.rotation.x = 0.55, n(c, "sphere", p, [
        0.05,
        0.04,
        0.06
      ], [
        P,
        0.82,
        1.02
      ], !0), y(P, -0.42, 0.45), y(P, 0.45, 0.45);
    }
    for (let P = 0; P < 3; P++) n(d, "cone", a.accent, [
      0.2,
      0.45,
      0.25
    ], [
      0,
      1.25,
      -0.5 + P * 0.4
    ]);
  } else if (s === "weaver") {
    n(d, "cone", "#63689d", [
      1.45,
      3,
      1.2
    ], [
      0,
      2.1,
      0
    ]), n(d, "cone", a.light, [
      0.8,
      1.8,
      0.65
    ], [
      0,
      2.65,
      0.3
    ]), n(c, "sphere", g, [
      0.6,
      0.72,
      0.45
    ], [
      0,
      4,
      0
    ]);
    const P = n(c, "crescent", v, [
      1.35,
      1.35,
      0.8
    ], [
      0,
      4.35,
      -0.3
    ], !1, 1, !0);
    P.rotation.z = 0.87;
    for (const U of [-0.23, 0.23]) n(c, "sphere", "#e4e3ff", [
      0.09,
      0.055,
      0.05
    ], [
      U,
      4.08,
      0.45
    ], !0);
    for (const U of [-1, 1]) {
      const D = i(d, [
        U * 0.8,
        3.3,
        0
      ]);
      D.rotation.z = U * 0.65, n(D, "cone", "#757caf", [
        0.5,
        1.8,
        0.45
      ], [
        0,
        -0.65,
        0
      ]), n(D, "sphere", a.light, [
        0.22,
        0.25,
        0.22
      ], [
        0,
        -1.45,
        0.1
      ]), l.push(D);
    }
    for (let U = 0; U < 5; U++) {
      const D = U / 5 * Math.PI * 2, J = n(r, "rock", a.accent, [
        0.2,
        0.34,
        0.2
      ], [
        Math.cos(D) * 1.95,
        3.3 + Math.sin(D) * 1.1,
        -0.3
      ]);
      J.rotation.z = D;
    }
  } else if (s === "king") {
    y(-0.5, 0, 0.8), y(0.5, 0, 0.8), n(d, "cone", "#7c4550", [
      1.8,
      3.6,
      0.8
    ], [
      0,
      2,
      -0.3
    ]), n(d, "box", g, [
      1.6,
      1.7,
      1
    ], [
      0,
      2.1,
      0
    ]), n(d, "rock", v, [
      0.5,
      0.9,
      0.3
    ], [
      0,
      2.25,
      0.62
    ]);
    for (const P of [-1, 1]) n(d, "rock", a.stone, [
      0.85,
      0.5,
      0.7
    ], [
      P * 0.95,
      2.95,
      0
    ]);
    n(c, "sphere", g, [
      0.65,
      0.8,
      0.5
    ], [
      0,
      3.6,
      0
    ]), n(c, "box", p, [
      0.48,
      0.08,
      0.09
    ], [
      0,
      3.7,
      0.51
    ], !0), n(c, "torus", v, [
      0.86,
      0.86,
      0.86
    ], [
      0,
      4.6,
      0
    ], !1, 1, !0).rotation.x = Math.PI / 2;
    for (let P = 0; P < 7; P++) {
      const U = P * Math.PI * 2 / 7;
      n(c, "cone", v, [
        0.17,
        0.85,
        0.17
      ], [
        Math.cos(U) * 0.78,
        4.85,
        Math.sin(U) * 0.78
      ]);
    }
    r.position.set(1.55, 1.35, 0.2), r.rotation.z = -0.3, w(r, 3.4, "#f6dc9f"), n(d, "box", a.stone, [
      0.5,
      1.2,
      0.5
    ], [
      -1.15,
      2,
      0.1
    ]);
  } else if (s === "warden") {
    y(-0.65, 0.05, 0.85), y(0.65, 0.05, 0.85), n(d, "cylinder", g, [
      1.1,
      1.85,
      0.8
    ], [
      0,
      1.9,
      0
    ]), n(d, "box", a.stone, [
      1.1,
      1.45,
      0.35
    ], [
      0,
      2,
      0.72
    ]), n(d, "rock", a.accent, [
      0.28,
      0.4,
      0.14
    ], [
      0,
      2.1,
      0.94
    ]);
    for (const U of [-1, 1])
      n(d, "rock", a.stone, [
        0.83,
        0.6,
        0.7
      ], [
        U * 1.03,
        2.7,
        0
      ]), n(d, "box", v, [
        0.7,
        0.1,
        0.8
      ], [
        U * 1.08,
        2.45,
        0.1
      ], !1, 1, !0);
    n(c, "sphere", a.stone, [
      0.73,
      0.77,
      0.63
    ], [
      0,
      3.2,
      0
    ]), n(c, "box", g, [
      1.12,
      0.33,
      0.2
    ], [
      0,
      3.22,
      0.54
    ]), n(c, "box", p, [
      0.74,
      0.095,
      0.05
    ], [
      0,
      3.22,
      0.66
    ], !0), n(c, "cone", a.foliage, [
      0.27,
      1.1,
      0.5
    ], [
      0,
      4,
      -0.2
    ]);
    const P = i(d, [
      -1.32,
      1.5,
      0.6
    ]);
    n(P, "box", g, [
      1.2,
      1.8,
      0.25
    ]), n(P, "box", v, [
      1,
      1.58,
      0.28
    ]), n(P, "box", a.foliage, [
      0.85,
      1.42,
      0.31
    ]), n(P, "rock", a.light, [
      0.28,
      0.4,
      0.1
    ], [
      0,
      0.1,
      0.22
    ]), r.position.set(1.5, 1.8, 0.25), n(r, "cylinder", "#766450", [
      0.1,
      2.5,
      0.1
    ]), n(r, "box", g, [
      1.25,
      0.9,
      0.9
    ], [
      0,
      1.4,
      0
    ]), n(r, "box", v, [
      0.24,
      0.96,
      0.94
    ], [
      0,
      1.4,
      0
    ], !1, 1, !0), n(r, "box", a.light, [
      0.22,
      0.77,
      0.74
    ], [
      0.65,
      1.4,
      0
    ]);
  } else if (we(s)) ui(e, d, c, r, s, a);
  else if (s === "wisp")
    n(d, "rock", a.accent, [
      0.35,
      0.6,
      0.35
    ], [
      0,
      1,
      0
    ]), n(c, "torus", v, [
      0.48,
      0.6,
      0.4
    ], [
      0,
      1,
      0
    ]), n(c, "sphere", "#f7f5e8", [
      0.12,
      0.13,
      0.1
    ], [
      0,
      1.05,
      0.31
    ], !0), n(d, "cone", a.light, [
      0.16,
      0.6,
      0.16
    ], [
      0,
      0.35,
      0
    ]).rotation.z = Math.PI;
  else if (s === "stalker") {
    n(d, "sphere", a.dark, [
      0.4,
      0.35,
      0.65
    ], [
      0,
      0.55,
      0
    ]), n(c, "rock", a.foliage, [
      0.33,
      0.38,
      0.32
    ], [
      0,
      0.75,
      0.5
    ]);
    for (const P of [-1, 1])
      y(P * 0.27, -0.25, 0.35), n(c, "cone", v, [
        0.09,
        0.35,
        0.09
      ], [
        P * 0.21,
        1.09,
        0.42
      ]), n(c, "sphere", p, [
        0.05,
        0.04,
        0.035
      ], [
        P * 0.15,
        0.8,
        0.77
      ], !0), n(r, "cone", a.light, [
        0.09,
        0.38,
        0.08
      ], [
        P * 0.37,
        0.3,
        0.5
      ]).rotation.x = Math.PI / 2;
  } else if (s === "bomber")
    y(-0.22, 0, 0.45), y(0.22, 0, 0.45), n(d, "sphere", "#85654c", [
      0.5,
      0.6,
      0.4
    ], [
      0,
      0.95,
      0
    ]), n(c, "sphere", a.stone, [
      0.35,
      0.38,
      0.31
    ], [
      0,
      1.62,
      0
    ]), n(c, "box", a.dark, [
      0.63,
      0.15,
      0.08
    ], [
      0,
      1.69,
      0.3
    ]), n(d, "cylinder", "#ac7b54", [
      0.3,
      0.75,
      0.3
    ], [
      0,
      1.05,
      -0.4
    ]), n(r, "sphere", "#404c57", [
      0.25,
      0.25,
      0.25
    ], [
      0.56,
      1.1,
      0.18
    ]), n(r, "cone", "#ffca88", [
      0.07,
      0.3,
      0.07
    ], [
      0.56,
      1.41,
      0.18
    ]);
  else {
    const P = s === "priest", U = s === "guard";
    if (P ? n(d, "cone", "#767da5", [
      0.55,
      1.5,
      0.5
    ], [
      0,
      0.95,
      0
    ]) : (y(-0.22, 0, 0.5), y(0.22, 0, 0.5), n(d, "box", g, [
      0.72,
      0.85,
      0.52
    ], [
      0,
      0.92,
      0
    ])), n(d, "box", a.stone, [
      0.5,
      0.55,
      0.15
    ], [
      0,
      1,
      0.3
    ]), n(c, "sphere", a.stone, [
      0.43,
      0.45,
      0.38
    ], [
      0,
      1.63,
      0
    ]), n(c, "box", g, [
      0.68,
      0.17,
      0.12
    ], [
      0,
      1.65,
      0.32
    ]), n(c, "box", p, [
      0.39,
      0.045,
      0.05
    ], [
      0,
      1.65,
      0.39
    ], !0), P)
      n(c, "cone", "#626a9c", [
        0.55,
        0.8,
        0.5
      ], [
        0,
        2.14,
        0
      ]), r.position.set(0.52, 1, 0.1), n(r, "cylinder", v, [
        0.04,
        1.6,
        0.04
      ]), n(r, "rock", "#d1dcff", [
        0.22,
        0.32,
        0.22
      ], [
        0,
        0.95,
        0
      ]);
    else {
      n(c, "box", a.foliage, [
        0.12,
        0.38,
        0.55
      ], [
        0,
        2,
        -0.07
      ]);
      for (const D of [-1, 1]) n(d, "rock", a.stone, [
        0.28,
        0.23,
        0.3
      ], [
        D * 0.45,
        1.22,
        0
      ]);
      r.position.set(0.54, 1, 0.2), s === "archer" ? ms(e, r, 1.3) : (r.rotation.z = -0.3, w(r, 0.75)), U && (n(d, "box", v, [
        0.85,
        1.1,
        0.18
      ], [
        -0.4,
        0.95,
        0.46
      ]), n(d, "box", a.foliage, [
        0.72,
        0.92,
        0.22
      ], [
        -0.4,
        0.95,
        0.47
      ]));
    }
  }
  const f = i(o, [
    0,
    u ? 5.5 : s === "charger" ? 1.7 : 2.45,
    0
  ]);
  n(f, "box", "#233f48", [
    1.06,
    0.105,
    0.02
  ], [
    0,
    0,
    0
  ], !0);
  const x = n(f, "box", "#f0ba83", [
    1,
    0.055,
    0.03
  ], [
    0,
    0,
    0.02
  ], !0), b = [];
  d.traverse((P) => {
    P instanceof Mt && b.push({
      mesh: P,
      material: P.material
    });
  });
  let M = 0, z = -100, L = 0, A = 0;
  const j = r.rotation.z;
  return {
    root: o,
    bar: f,
    update(P, U, D) {
      const J = Math.abs(P.x - L) + Math.abs(P.y - A) > 5e-3;
      L = P.x, A = P.y, M && !P.windup && (z = U), M = P.windup;
      const ie = P.windup ? 1 - P.windup / de[P.kind].windup : 0, F = Math.max(0, 1 - (U - z) / 10);
      o.position.set(P.x, 0, P.y), d.rotation.y = Math.PI / 2 - P.angle, d.position.y = D ? 0 : s === "weaver" || s === "priest" ? 0.13 + Math.sin(U * 0.055) * 0.1 : J ? Math.abs(Math.sin(U * 0.3)) * 0.055 : 0, d.rotation.x = D ? 0 : -ie * 0.16 + F * 0.2, c.rotation.z = !D && s === "king" ? Math.sin(U * 0.035) * 0.08 : 0, r.rotation.x = D ? 0 : ie * -1.3 + F * 1.4, r.rotation.z = j + (D ? 0 : ie * -0.35);
      for (let Z = 0; Z < l.length; Z++) l[Z].rotation.x = !D && J ? Math.sin(U * 0.32 + Z * Math.PI) * 0.28 : 0;
      for (const Z of b) Z.mesh.material = P.marked > 2 && !D ? e.material("#fff6dd") : Z.material;
      f.visible = !u && P.hp < P.maxHp, x.scale.x = P.hp / P.maxHp, x.position.x = (P.hp / P.maxHp - 1) * 0.5;
    }
  };
}
var te = {
  danger: "#c34740",
  warning: "#ec8754",
  magic: "#8bd9f2",
  frost: "#addffc",
  gold: "#fff0bb",
  heal: "#75dbb0",
  fire: "#f0ad55"
};
function mi(e, t) {
  const s = /* @__PURE__ */ new Map();
  function a(i, o, d = 1, r = !1) {
    const c = Math.max(0.1, Math.min(1, Math.round(d * 10) / 10)), l = `${i}/${o}/${c}/${r}`;
    let u = s.get(l);
    u || (u = {
      list: [],
      used: 0
    }, s.set(l, u));
    let h = u.list[u.used++];
    return h || (h = e.mesh(t, i, o, [
      1,
      1,
      1
    ], [
      0,
      0,
      0
    ], !r, c), u.list.push(h)), h.visible = !0, h.rotation.set(0, 0, 0), h.scale.set(1, 1, 1), h;
  }
  function n(i, o, d, r, c, l = 1, u = 0.09) {
    const h = a(i, o, l);
    return h.position.set(r, u, c), h.scale.set(d, d, 1), h.rotation.x = -Math.PI / 2, h;
  }
  return { update(i, o) {
    for (const r of s.values())
      r.used = 0, r.list.forEach((c) => c.visible = !1);
    if (!i) return;
    const d = i.player;
    if (n("ring", "#f2f6e2", 0.64, d.x, d.y, 0.8), d.dashTime && !o) for (let r = 1; r <= 3; r++) {
      const c = a("cone", te.gold, 0.7 - r * 0.15);
      c.position.set(d.x - Math.cos(d.dashAngle) * r * 0.43, 0.45, d.y - Math.sin(d.dashAngle) * r * 0.43), c.scale.set(0.13, d.dashTime / 8 * 1.7, 0.13), c.rotation.set(0, -d.dashAngle, -Math.PI / 2);
    }
    if (!i.boss && (i.encounter === "siege" || i.encounter === "ritual")) {
      const r = i.objective;
      i.encounter === "ritual" && (n("disc", te.magic, 2.5, r.x, r.y, 0.12), n("ring", te.magic, 2.5, r.x, r.y), n("ring", te.gold, 2.2, r.x, r.y, 0.8));
      const c = a("cylinder", "#526b79");
      c.position.set(r.x, 0.3, r.y), c.scale.set(0.5, 0.6, 0.5);
      const l = a("rock", i.encounter === "siege" ? te.fire : te.magic);
      if (l.position.set(r.x, 1, r.y), l.scale.set(0.23, 0.5, 0.23), i.encounter === "siege") {
        l.position.y = 1.35, l.scale.set(0.4, 0.85, 0.4);
        const u = a("cone", te.gold, 0.8);
        u.position.set(r.x, 1.4, r.y), u.scale.set(0.2, 0.85, 0.2), n("ring", te.fire, 0.9, r.x, r.y, 0.8);
      }
      o || (l.rotation.y = i.tick * 0.025);
    }
    for (const r of i.companions)
      if (!(r.hp <= 0 || r.life <= 0))
        if (n("ring", te.heal, 0.4, r.x, r.y, 0.8), r.kind === "turret") {
          const c = a("cylinder", "#687c81");
          c.position.set(r.x, 0.25, r.y), c.scale.set(0.4, 0.5, 0.4);
          const l = a("box", "#bd9a68");
          l.position.set(r.x, 0.65, r.y), l.scale.set(0.9, 0.2, 0.25), l.rotation.y = -r.angle;
          const u = a("sphere", te.magic);
          u.position.set(r.x + Math.cos(r.angle) * 0.45, 0.65, r.y + Math.sin(r.angle) * 0.45), u.scale.setScalar(0.11);
        } else {
          const c = r.kind === "familiar" && d.resonance > 0, l = c ? 1.5 : 1, u = r.kind === "shade" ? "#a6acd8" : c ? Fe.empowered : Fe.familiar, h = o ? 0 : Math.sin(i.tick * 0.1 + r.id) * 0.08, v = a("sphere", u, 1, !0);
          v.position.set(r.x, 0.55 * l + h, r.y), v.scale.set(0.3 * l, 0.36 * l, 0.3 * l);
          for (const g of [-1, 1]) {
            const y = a("cone", u, 1, !0);
            y.position.set(r.x + g * 0.2 * l, 0.93 * l + h, r.y), y.scale.set(0.08 * l, 0.22 * l, 0.08 * l);
          }
          const p = a("sphere", "#35475b");
          if (p.position.set(r.x + Math.cos(r.angle) * 0.28 * l, 0.63 * l + h, r.y + Math.sin(r.angle) * 0.28 * l), p.scale.setScalar(0.07 * l), c) {
            const g = a("torus", Fe.crest, 1, !0);
            g.position.set(r.x, 1.45 + h, r.y), g.rotation.x = Math.PI / 2, g.scale.setScalar(0.32);
            for (let y = 0; y < 3; y++) {
              const w = y * Math.PI * 2 / 3, f = a("rock", Fe.crest, 1, !0);
              f.position.set(r.x + Math.cos(w) * 0.32, 1.55 + h, r.y + Math.sin(w) * 0.32), f.scale.set(0.08, 0.17, 0.08);
            }
          }
        }
    for (const r of i.enemies) {
      if (we(r.kind) && r.phase > 1) {
        const c = de[r.kind].radius + 0.55;
        if (n("ring", r.kind === "king" ? te.fire : te.magic, c, r.x, r.y, 0.65), !o) for (let l = 0; l < r.phase + 2; l++) {
          const u = i.tick * 0.025 + l * Math.PI * 2 / (r.phase + 2), h = a("rock", r.kind === "king" ? te.fire : te.magic, 0.8);
          h.position.set(r.x + Math.cos(u) * c, 0.55 + Math.sin(u * 2) * 0.2, r.y + Math.sin(u) * c), h.scale.set(0.08, 0.19, 0.08);
        }
      }
      if (r.windup) {
        const c = 1 - r.windup / de[r.kind].windup;
        if (n("ring", te.warning, de[r.kind].radius + 0.35, r.x, r.y, 0.8), r.kind === "charger") {
          const l = Math.min(9, Math.hypot(r.target.x - r.x, r.target.y - r.y)), u = a("box", te.danger, 0.3);
          u.scale.set(0.75, 0.035, l), u.position.set(r.x + Math.cos(r.angle) * l / 2, 0.09, r.y + Math.sin(r.angle) * l / 2), u.rotation.y = Math.PI / 2 - r.angle, n("ring", te.danger, 0.5, r.target.x, r.target.y, 0.9);
        } else if (r.kind === "archer") {
          const l = Math.hypot(r.target.x - r.x, r.target.y - r.y), u = a("box", te.warning, 0.6);
          u.position.set((r.x + r.target.x) / 2, 0.11, (r.y + r.target.y) / 2), u.scale.set(l, 0.03, 0.09), u.rotation.y = -r.angle;
        } else r.kind === "bomber" ? n("ring", te.warning, 1.9, r.target.x, r.target.y) : (r.kind === "soldier" || r.kind === "guard" || r.kind === "stalker") && (n("disc", te.danger, de[r.kind].reach, r.target.x, r.target.y, 0.15 + c * 0.2), n("ring", te.danger, de[r.kind].reach, r.target.x, r.target.y));
      }
      if (r.chill && n("ring", te.frost, de[r.kind].radius + 0.13, r.x, r.y), r.exposed && n("arc", te.gold, de[r.kind].radius + 0.3, r.x, r.y, 0.9), r.burn && !o) for (let c = 0; c < 3; c++) {
        const l = a("rock", te.fire, 0.8);
        l.position.set(r.x + Math.sin(c * 2) * 0.3, 0.35 + (i.tick + c * 7) % 20 / 18, r.y + Math.cos(c * 2) * 0.3), l.scale.set(0.08, 0.2, 0.08);
      }
      r.kind === "priest" && n("ring", "#a39aca", 3.5, r.x, r.y, 0.4);
    }
    for (const r of i.hazards) {
      const c = r.friendly ? r.kind === "fire" ? te.fire : te.magic : te.danger;
      if (r.kind === "beam") {
        const l = a("box", c, r.wait ? 0.3 : 0.75);
        l.position.set(r.x + Math.cos(r.angle) * r.length / 2, 0.11, r.y + Math.sin(r.angle) * r.length / 2), l.scale.set(r.length, 0.04, r.width * 2), l.rotation.y = -r.angle;
        for (const u of [0, r.length]) n("disc", c, r.width, r.x + Math.cos(r.angle) * u, r.y + Math.sin(r.angle) * u, r.wait ? 0.3 : 0.75);
        continue;
      }
      if (r.kind === "ring") {
        n("ring", c, r.inner, r.x, r.y), n("ring", c, r.radius, r.x, r.y);
        for (let l = 1; l <= 4; l++) n("ring", c, r.inner + (r.radius - r.inner) * l / 5, r.x, r.y, r.wait ? 0.35 : 0.8);
        continue;
      }
      if (n("disc", c, r.radius, r.x, r.y, r.wait ? 0.2 : 0.4), n("ring", c, r.radius, r.x, r.y), r.wait) {
        n("ring", c, r.radius * (1 - Math.min(1, r.wait / 45)), r.x, r.y, 0.7);
        const l = a("box", c, 0.7);
        l.position.set(r.x, 0.12, r.y), l.scale.set(0.08, 0.02, 0.6);
        const u = a("box", c, 0.7);
        u.position.copy(l.position), u.scale.set(0.6, 0.02, 0.08);
      } else if (!o) {
        n("ring", te.gold, r.radius * (0.7 + Math.sin(i.tick * 0.1) * 0.1), r.x, r.y, 0.7, 0.25);
        for (let l = 0; l < 6; l++) {
          const u = l * Math.PI / 3, h = a("cone", c, 0.7);
          h.position.set(r.x + Math.cos(u) * r.radius * 0.65, 0.45, r.y + Math.sin(u) * r.radius * 0.65), h.scale.set(0.15, 0.9, 0.15);
        }
      }
    }
    for (const r of i.shots) {
      const c = r.friendly ? te.gold : te.danger, l = a("sphere", r.friendly ? "#fffbea" : "#fff1c9");
      l.position.set(r.x, 0.6, r.y), l.scale.set(0.11, 0.11, 0.11);
      const u = a("sphere", c, 0.8);
      u.position.copy(l.position), u.scale.set(0.21, 0.18, 0.21);
      const h = a("cone", c, 0.5);
      h.position.set(r.x - Math.cos(r.angle) * 0.38, 0.6, r.y - Math.sin(r.angle) * 0.38), h.scale.set(0.14, 0.75, 0.14), h.rotation.set(0, -r.angle, -Math.PI / 2);
    }
    for (const r of i.effects) {
      const c = 1 - r.life / (r.kind === "slash" ? 9 : 15);
      if (r.kind === "slash") {
        const l = n("arc", te.gold, r.size, r.x, r.y, 0.3 * (1 - c), 0.42);
        l.rotation.z = -r.angle - 0.9 + c * 0.4;
        const u = n("stroke", "#fff4d2", r.size, r.x, r.y, 0.9 * (1 - c), 0.43);
        u.rotation.z = l.rotation.z;
      } else if (r.kind === "resonance") {
        n("ring", Fe.crest, r.size * (o ? 1 : 0.6 + c * (2 - c)), r.x, r.y, 0.8 - c * 0.6, 0.16);
        for (const l of i.companions) {
          if (l.kind !== "familiar" || l.hp <= 0 || l.life <= 0) continue;
          const u = l.x - d.x, h = l.y - d.y, v = a("box", Fe.empowered, 1 - c * 0.7);
          v.position.set((d.x + l.x) / 2, 1.1, (d.y + l.y) / 2), v.scale.set(Math.hypot(u, h), 0.045, 0.045), v.rotation.y = -Math.atan2(h, u);
        }
        for (let l = 0; l < 4; l++) {
          const u = l * Math.PI / 2 + (o ? 0 : c), h = a("rock", Fe.empowered, 1 - c * 0.4);
          h.position.set(d.x + Math.cos(u) * 0.95, 1.7 + (o ? 0 : c * 0.5), d.y + Math.sin(u) * 0.95), h.scale.set(0.08, 0.18, 0.08);
        }
      } else if (r.kind === "lightning") {
        for (let l = 0; l < 4; l++) {
          const u = a("box", l % 2 ? "#ffffff" : te.magic, 1 - c * 0.6);
          u.scale.set(0.09 + (1 - c) * 0.09, 1.05, 0.08), u.position.set(r.x + (l % 2 ? 0.14 : -0.14), 0.5 + l * 0.85, r.y), u.rotation.z = l % 2 ? -0.35 : 0.35;
        }
        n("ring", te.magic, 0.4 + c, r.x, r.y, 1 - c);
      } else if (r.kind === "block" || r.kind === "parry" || r.kind === "ward-hit" || r.kind === "ward-break") {
        const l = r.kind === "block" || r.kind === "parry", u = r.kind === "ward-break", h = l ? r.kind === "parry" ? Ie.parry : Ie.block : Ie.ward;
        if (l) {
          const v = a("ring", h, 1 - c);
          v.position.set(r.x + Math.cos(r.angle) * 0.7, 1.3, r.y + Math.sin(r.angle) * 0.7), v.rotation.y = Math.PI / 2 - r.angle, v.scale.setScalar(0.6 + c * (r.kind === "parry" ? 1.3 : 0.6));
        }
        for (let v = 0; v < (u ? 6 : 4); v++) {
          const p = v * 2.4 + r.id, g = a(u ? "rock" : "box", h, 1 - c), y = o ? 1.1 : 0.7 + c * (u ? 1.5 : 0.6);
          g.position.set(r.x + Math.cos(p) * y, 0.7 + v % 3 * 0.55, r.y + Math.sin(p) * y), g.scale.set(0.07 * (1 - c), (u ? 0.3 : 0.16) * (1 - c), 0.04), g.rotation.set(p, p, p);
        }
      } else if (r.kind === "heal") n("ring", te.heal, 0.4 + c, r.x, r.y, 1 - c);
      else {
        const l = r.kind === "hit" ? te.danger : te.gold;
        if (n("ring", l, r.size * (0.4 + c), r.x, r.y, 1 - c), !o) for (let u = 0; u < 7; u++) {
          const h = u * 2.4 + r.id, v = a("rock", l, 1 - c * 0.8);
          v.position.set(r.x + Math.cos(h) * c * r.size, 0.4 + Math.sin(c * Math.PI) * 0.8, r.y + Math.sin(h) * c * r.size), v.scale.set(0.1 * (1 - c), 0.28 * (1 - c), 0.1 * (1 - c)), v.rotation.z = h;
        }
      }
    }
  } };
}
function vi(e) {
  const t = document.createElement("div"), s = document.createElement("i");
  t.className = "exp-world-ward", t.style.setProperty("--ward-color", Ie.ward), t.setAttribute("role", "meter"), t.setAttribute("aria-label", K.ward), t.setAttribute("aria-valuemin", "0"), t.setAttribute("aria-valuemax", String(V.maxHp)), t.append(s);
  const a = document.createElement("div");
  a.className = "exp-world-defense", e.append(t, a), t.hidden = !0, a.hidden = !0;
  const n = new St();
  let i = null, o = 0, d = 0, r = null;
  function c(l, u, h, v, p, g, y) {
    n.set(u, h, v).project(p), l.style.left = `${(n.x * 0.5 + 0.5) * g}px`, l.style.top = `${(-n.y * 0.5 + 0.5) * y}px`;
  }
  return {
    update(l, u, h, v) {
      if (l !== i && (i = l, o = 0, r = null, d = 0), t.hidden = !l || l.player.ward <= 0, a.hidden = !l, !l) return;
      const p = l.player;
      t.hidden || (s.style.width = `${p.ward / V.maxHp * 100}%`, t.setAttribute("aria-valuenow", String(p.ward)), c(t, p.x, 0, p.y, u, h, v));
      const g = l.effects.filter((w) => w.id > o && w.kind in K.defenseFeedback), y = g.find((w) => w.kind === "parry" || w.kind === "ward-break") ?? g.at(-1);
      y && (r = y.kind, d = l.tick + 27), o = l.serial, l.tick >= d && (r = null), a.hidden = !r && !p.shield, a.dataset.state = r ?? "blocking", a.textContent = r ? K.defenseFeedback[r] : p.shield ? K.guardActive : "", c(a, p.x, p.shield ? 3.65 : 3.05, p.y, u, h, v);
    },
    dispose() {
      t.remove(), a.remove();
    }
  };
}
function gs(e, t, s, a, n = 2.8) {
  e.mesh(t, "cylinder", k.shadow, [
    0.055,
    n,
    0.055
  ], [
    s,
    n / 2,
    a
  ]), e.mesh(t, "box", k.brass, [
    0.4,
    0.08,
    0.4
  ], [
    s,
    n,
    a
  ]), e.mesh(t, "box", k.ember, [
    0.22,
    0.38,
    0.22
  ], [
    s,
    n + 0.21,
    a
  ], !0), e.mesh(t, "cone", k.shadow, [
    0.32,
    0.24,
    0.32
  ], [
    s,
    n + 0.51,
    a
  ]);
  for (const i of [-1, 1]) e.mesh(t, "box", k.shadow, [
    0.035,
    0.4,
    0.035
  ], [
    s + i * 0.14,
    n + 0.2,
    a + 0.14
  ]);
}
function ys(e, t, s, a, n, i) {
  const o = s / 2 + 0.45, d = Math.atan2(i, o), r = Math.hypot(o, i);
  for (const c of [-1, 1]) {
    const l = e.group(t, [
      c * o / 2,
      n + i / 2,
      0
    ]);
    l.rotation.z = -c * d, e.mesh(l, "box", k.roof, [
      r + 0.2,
      0.18,
      a + 1.1
    ]);
    for (let u = 0; u < Math.ceil(r / 0.65); u++) e.mesh(l, "box", u % 3 ? k.roof : k.roofLight, [
      0.14,
      0.07,
      a + 1.15
    ], [
      -r / 2 + u * 0.65,
      0.13,
      0
    ]);
    e.mesh(l, "box", k.shadow, [
      0.2,
      0.24,
      a + 1.25
    ], [
      c * r / 2,
      -0.05,
      0
    ]);
  }
  e.mesh(t, "box", k.brass, [
    0.24,
    0.23,
    a + 1.4
  ], [
    0,
    n + i + 0.14,
    0
  ]);
  for (const c of [-a / 2 - 0.08, a / 2 + 0.08])
    e.shape(t, [
      [-s / 2, 0],
      [s / 2, 0],
      [0, i]
    ], k.light, [
      0,
      n,
      c
    ], 0.08), e.mesh(t, "box", k.timber, [
      0.15,
      i,
      0.18
    ], [
      0,
      n + i / 2,
      c + 0.12
    ]);
}
function sa(e, t, s, a, n, i = 1.1) {
  e.mesh(t, "box", k.shadow, [
    i,
    1.45,
    0.12
  ], [
    s,
    n,
    a
  ]), e.mesh(t, "box", k.window, [
    i - 0.18,
    1.25,
    0.14
  ], [
    s,
    n,
    a + 0.07
  ]);
  for (const o of [-1, 1])
    e.mesh(t, "box", k.wood, [
      0.13,
      1.6,
      0.2
    ], [
      s + o * i / 2,
      n,
      a + 0.12
    ]), e.mesh(t, "box", k.light, [
      i + 0.28,
      0.14,
      0.26
    ], [
      s,
      n + o * 0.8,
      a + 0.12
    ]);
  e.mesh(t, "box", k.timber, [
    0.07,
    1.3,
    0.16
  ], [
    s,
    n,
    a + 0.16
  ]), e.mesh(t, "box", k.timber, [
    i,
    0.06,
    0.16
  ], [
    s,
    n,
    a + 0.16
  ]);
}
function gi(e, t, s) {
  const { width: a, depth: n } = s.footprint, i = s.kind === "clinic", o = i ? 3.7 : 5;
  e.mesh(t, "box", k.stone, [
    a - 0.3,
    o,
    n - 0.3
  ], [
    0,
    o / 2,
    0
  ]), e.mesh(t, "box", k.light, [
    a - 0.4,
    o - 1,
    n - 0.1
  ], [
    0,
    o / 2 + 0.4,
    0
  ]);
  for (const c of [-a / 2 + 0.15, a / 2 - 0.15]) for (const l of [-n / 2 + 0.15, n / 2 - 0.15]) e.mesh(t, "box", k.timber, [
    0.27,
    o,
    0.27
  ], [
    c,
    o / 2,
    l
  ]);
  for (const c of [0.8, o - 0.25]) e.mesh(t, "box", k.timber, [
    a,
    0.18,
    n
  ], [
    0,
    c,
    0
  ]);
  for (const c of [-a * 0.29, a * 0.29]) sa(e, t, c, n / 2, 2.3, i ? 1.6 : 1.2);
  const d = e.group(t, [
    a / 2,
    0,
    0
  ]);
  d.rotation.y = Math.PI / 2;
  for (const c of [-n * 0.27, n * 0.27]) sa(e, d, c, 0.03, 2.3);
  e.mesh(t, "box", k.shadow, [
    1.9,
    2.65,
    0.13
  ], [
    0,
    1.35,
    n / 2
  ]);
  for (const c of [-1, 1]) e.mesh(t, "box", k.wood, [
    0.85,
    2.5,
    0.12
  ], [
    c * 0.46,
    1.3,
    n / 2 + 0.08
  ]);
  e.mesh(t, "sphere", k.brass, [
    0.07,
    0.07,
    0.05
  ], [
    0.23,
    1.15,
    n / 2 + 0.19
  ]), ys(e, t, a, n, o, i ? 2.4 : 3.2);
  const r = e.group(t, [
    -a * 0.27,
    o,
    -n * 0.18
  ]);
  if (e.mesh(r, "box", k.stone, [
    1.1,
    3.3,
    1.2
  ], [
    0,
    1.65,
    0
  ]), e.mesh(r, "box", k.light, [
    1.4,
    0.3,
    1.5
  ], [
    0,
    3.1,
    0
  ]), e.mesh(r, "box", k.shadow, [
    0.85,
    0.04,
    0.95
  ], [
    0,
    3.27,
    0
  ]), i) {
    const c = e.group(t, [
      0,
      2.9,
      n / 2 + 1
    ]);
    c.rotation.x = 0.19;
    for (let l = -3; l <= 3; l++) e.mesh(c, "box", l % 2 ? k.light : k.cloth, [
      0.59,
      0.06,
      2.3
    ], [
      l * 0.6,
      0,
      0
    ]);
    for (const l of [-1, 1]) e.mesh(t, "cylinder", k.timber, [
      0.045,
      2.7,
      0.045
    ], [
      l * 2.1,
      1.35,
      n / 2 + 2.05
    ]);
    e.mesh(t, "box", k.slate, [
      0.9,
      1.2,
      0.14
    ], [
      2.8,
      2.8,
      n / 2 + 0.25
    ]), e.mesh(t, "cylinder", k.brass, [
      0.21,
      0.47,
      0.06
    ], [
      2.8,
      2.75,
      n / 2 + 0.36
    ]), e.mesh(t, "box", k.brass, [
      0.18,
      0.16,
      0.1
    ], [
      2.8,
      3.08,
      n / 2 + 0.36
    ]);
  } else
    sa(e, t, 0, n / 2 + 0.09, o + 1, 0.9), e.mesh(t, "box", k.timber, [
      a + 0.4,
      0.26,
      0.24
    ], [
      0,
      3.5,
      n / 2 + 0.25
    ]);
}
function yi(e, t, s) {
  const a = s.height, n = s.footprint.width, i = s.tint === "amber", o = s.tint === "rose", d = i ? k.amber : o ? k.rose : k.leaf, r = i ? k.amberLight : o ? "#dfb2a1" : k.leafLight, c = e.mesh(t, "cylinder", k.timber, [
    0.24,
    a * 0.67,
    0.28
  ], [
    0,
    a * 0.33,
    0
  ]);
  c.rotation.z = 0.06;
  for (let l = 0; l < 3; l++) {
    const u = e.group(t, [
      0,
      a * 0.39,
      0
    ]);
    u.rotation.set(0.4 * Math.sin(l * 2), 0, (l - 1) * 0.65), e.mesh(u, "cylinder", k.timber, [
      0.095,
      a * 0.32,
      0.095
    ], [
      0,
      a * 0.16,
      0
    ]);
  }
  for (let l = 0; l < 9; l++) {
    const u = l * 2.4, h = l === 8 ? 0.1 : n * 0.56, v = e.mesh(t, "crown", l % 3 ? d : r, [
      n * 0.49 + 0.4,
      a * 0.16,
      n * 0.45 + 0.4
    ], [
      Math.sin(u) * h,
      a * (0.68 + l % 3 * 0.11),
      Math.cos(u) * h
    ]);
    v.rotation.set(l * 0.37, l * 0.61, 0.14), v.receiveShadow = !1;
  }
}
function bi(e, t, s) {
  const { width: a, depth: n } = s.footprint, i = s.height;
  e.mesh(t, "box", k.stone, [
    a,
    i,
    n
  ], [
    0,
    i / 2,
    0
  ]);
  for (const o of [
    1,
    i * 0.55,
    i - 0.6
  ]) e.mesh(t, "box", k.light, [
    a + 0.25,
    0.3,
    n + 0.25
  ], [
    0,
    o,
    0
  ]);
  for (const o of [-a / 2 + 0.3, a / 2 - 0.3]) e.mesh(t, "box", k.mortar, [
    0.55,
    i - 1,
    n + 0.15
  ], [
    o,
    i / 2,
    0
  ]);
  for (const o of [i * 0.35, i * 0.7]) sa(e, t, 0, n / 2 + 0.02, o, 0.7);
  ys(e, t, a + 0.35, n + 0.35, i, i * 0.32), e.mesh(t, "cylinder", k.brass, [
    0.055,
    2.7,
    0.055
  ], [
    0,
    i * 1.32 + 1.2,
    0
  ]), e.shape(t, [
    [0, 0],
    [1.6, -0.3],
    [1.2, -0.75],
    [0, -0.95]
  ], k.cloth, [
    0.05,
    i * 1.32 + 2.4,
    0
  ]);
}
function wi(e, t, s, a, n) {
  const i = a.footprint, o = e.group(t, [
    i.x,
    0,
    i.z
  ]), d = e.group(s, [
    i.x,
    0,
    i.z
  ]);
  switch (a.kind) {
    case "clinic":
    case "storehouse":
      e.mesh(o, "box", k.mortar, [
        i.width,
        0.3,
        i.depth
      ], [
        0,
        0.15,
        0
      ]), gi(e, d, a);
      break;
    case "tree":
      e.mesh(o, "box", k.soil, [
        i.width,
        0.18,
        i.depth
      ], [
        0,
        0.08,
        0
      ]);
      for (let r = 0; r < 7; r++) {
        const c = r * 0.9;
        e.mesh(o, "rock", k.grassDark, [
          0.7,
          0.3,
          0.5
        ], [
          Math.sin(c) * i.width * 0.33,
          0.2,
          Math.cos(c) * i.depth * 0.33
        ]);
      }
      yi(e, d, a);
      break;
    case "tower":
      bi(e, d, a);
      break;
    case "column": {
      const r = a.height, c = Math.min(i.width, i.depth) * 0.3;
      e.mesh(o, "box", k.mortar, [
        i.width,
        0.35,
        i.depth
      ], [
        0,
        0.17,
        0
      ]), e.mesh(o, "box", k.light, [
        i.width * 0.84,
        0.35,
        i.depth * 0.84
      ], [
        0,
        0.5,
        0
      ]), e.mesh(d, "cylinder", k.stone, [
        c,
        r - 1.1,
        c
      ], [
        0,
        r / 2,
        0
      ]);
      for (let l = 0; l < 10; l++) {
        const u = l * Math.PI / 5;
        e.mesh(d, "box", k.light, [
          0.085,
          r - 2,
          0.085
        ], [
          Math.sin(u) * c,
          r / 2,
          Math.cos(u) * c
        ]);
      }
      for (const l of [0.85, r - 0.7]) e.mesh(d, "cylinder", k.brass, [
        c * 1.15,
        0.18,
        c * 1.15
      ], [
        0,
        l,
        0
      ]);
      e.mesh(d, "box", k.light, [
        i.width,
        0.4,
        i.depth
      ], [
        0,
        r - 0.3,
        0
      ]), e.mesh(d, "box", k.slate, [
        i.width * 0.9,
        0.3,
        i.depth * 0.9
      ], [
        0,
        r,
        0
      ]);
      break;
    }
    case "beacon":
      e.mesh(o, "box", k.mortar, [
        i.width,
        0.28,
        i.depth
      ], [
        0,
        0.14,
        0
      ]), e.mesh(o, "cylinder", k.stone, [
        2.5,
        0.5,
        2.5
      ], [
        0,
        0.5,
        0
      ]), e.mesh(d, "cylinder", k.slate, [
        1.35,
        3.9,
        1.35
      ], [
        0,
        2.3,
        0
      ]);
      for (const r of [
        1.2,
        3.5,
        4.4
      ]) e.mesh(d, "cylinder", k.brass, [
        1.55,
        0.2,
        1.55
      ], [
        0,
        r,
        0
      ]);
      e.mesh(d, "cylinder", k.shadow, [
        2.2,
        0.5,
        2.2
      ], [
        0,
        4.8,
        0
      ]), e.mesh(d, "torus", k.brass, [
        2.3,
        2.3,
        1.4
      ], [
        0,
        5.1,
        0
      ]).rotation.x = Math.PI / 2;
      for (let r = 0; r < 6; r++) {
        const c = r * Math.PI / 3, l = e.group(d, [
          Math.sin(c) * 2.1,
          4.8,
          Math.cos(c) * 2.1
        ]);
        l.rotation.y = c, e.shape(l, [
          [-0.12, 0],
          [0.12, 0],
          [0.2, 1.8],
          [0, 2.4],
          [-0.2, 1.8]
        ], k.brass, [
          0,
          0,
          0
        ], 0.14);
      }
      break;
    case "bunk":
      for (const r of [0.55, 1.9])
        e.mesh(o, "box", k.timber, [
          i.width - 0.5,
          0.18,
          i.depth - 0.5
        ], [
          0,
          r,
          0
        ]), e.mesh(o, "box", k.cloth, [
          i.width - 0.8,
          0.18,
          i.depth - 0.9
        ], [
          0,
          r + 0.16,
          0
        ]), e.mesh(o, "box", k.light, [
          i.width - 1,
          0.24,
          1.2
        ], [
          0,
          r + 0.28,
          -i.depth / 2 + 1.3
        ]);
      for (const r of [-1, 1]) for (const c of [-1, 1]) e.mesh(o, "box", k.shadow, [
        0.12,
        2.7,
        0.12
      ], [
        r * (i.width / 2 - 0.3),
        1.35,
        c * (i.depth / 2 - 0.3)
      ]);
      break;
    case "root": {
      const r = a.height, c = i.width * 0.23;
      e.mesh(o, "rock", k.soil, [
        i.width * 0.5,
        0.65,
        i.depth * 0.5
      ], [
        0,
        0.1,
        0
      ]);
      for (let l = 0; l < 5; l++) {
        const u = l * Math.PI * 0.4, h = i.width * 0.25, v = e.group(d, [
          Math.sin(u) * c * 0.45,
          0,
          Math.cos(u) * c * 0.45
        ]);
        v.rotation.y = u;
        const p = e.mesh(v, "cylinder", l % 2 ? k.root : k.rootLight, [
          c * 0.65,
          r * 0.64,
          c * 0.49
        ], [
          0,
          r * 0.3,
          0
        ]);
        p.rotation.z = 0.13;
        const g = e.group(v, [
          0,
          r * 0.48,
          0
        ]);
        g.rotation.z = 0.4 + l * 0.12, e.mesh(g, "cone", k.root, [
          c * 0.47,
          r * 0.55,
          c * 0.4
        ], [
          0,
          r * 0.25,
          0
        ]);
        const y = e.mesh(v, "cone", k.root, [
          c * 0.5,
          h * 1.4,
          c * 0.4
        ], [
          h * 0.6,
          0.7,
          0
        ]);
        y.rotation.z = -1.15;
      }
      if (r > 8) {
        e.mesh(d, "rock", k.shadow, [
          c * 0.65,
          r * 0.22,
          0.35
        ], [
          0,
          r * 0.38,
          c * 0.65
        ]), e.mesh(d, "rock", k.brass, [
          c * 0.16,
          r * 0.16,
          0.15
        ], [
          0,
          r * 0.4,
          c * 0.68
        ], !0);
        for (let l = 0; l < 7; l++) e.mesh(d, "crown", l % 2 ? k.leaf : k.leafLight, [
          1.4,
          0.8,
          1.2
        ], [
          Math.sin(l * 2) * c,
          r * 0.55 + l * 0.4,
          Math.cos(l * 2) * c
        ]);
      }
      break;
    }
    case "arch": {
      const r = a.height;
      e.mesh(d, "arch", k.light, [
        i.width / 2 - 0.4,
        3.1,
        i.depth * 0.65
      ], [
        0,
        r - 3,
        0
      ]), e.mesh(d, "box", k.brass, [
        0.8,
        1.4,
        i.depth * 0.75
      ], [
        0,
        r + 0.2,
        0
      ]);
      for (const c of [-1, 1]) {
        const l = e.group(d, [
          c * (i.width / 2 - 0.5),
          r - 2.2,
          i.depth / 2 - 0.4
        ]);
        e.mesh(l, "box", k.brass, [
          1.5,
          0.08,
          0.1
        ]), e.shape(l, [
          [-0.6, 0],
          [0.6, 0],
          [0.6, -2.5],
          [0, -2.9],
          [-0.6, -2.5]
        ], k.slate, [
          0,
          -0.05,
          0.06
        ]), e.mesh(l, "box", k.cloth, [
          0.08,
          1.9,
          0.06
        ], [
          0,
          -1.2,
          0.14
        ]);
      }
      break;
    }
    case "wall": {
      const r = a.height, c = Math.min(r, 0.65);
      e.mesh(o, "box", k.mortar, [
        i.width,
        c,
        i.depth
      ], [
        0,
        c / 2,
        0
      ]), r > c && e.mesh(d, "box", n ? k.marble : k.stone, [
        i.width,
        r - c,
        i.depth
      ], [
        0,
        (r + c) / 2,
        0
      ]), e.mesh(d, "box", k.light, [
        i.width + 0.12,
        0.23,
        i.depth + 0.12
      ], [
        0,
        r,
        0
      ]);
      const l = i.width > i.depth, u = Math.max(i.width, i.depth);
      if (n) {
        for (const h of [1.1, r - 0.55]) e.mesh(d, "box", k.light, [
          i.width + 0.15,
          0.22,
          i.depth + 0.15
        ], [
          0,
          h,
          0
        ]);
        for (let h = -u / 2 + 3; h < u / 2 - 1; h += 6) for (const v of [-1, 1]) {
          const p = e.group(d, [
            l ? h : v * (i.width / 2 + 0.04),
            0,
            l ? v * (i.depth / 2 + 0.04) : h
          ]);
          p.rotation.y = l ? v < 0 ? Math.PI : 0 : v * Math.PI / 2;
          const g = r * 0.61, y = Math.min(2.1, r * 0.3);
          e.mesh(p, "box", k.undercroft, [
            1.5,
            y,
            0.05
          ], [
            0,
            g,
            0
          ]);
          for (const w of [
            -0.55,
            0,
            0.55
          ]) e.mesh(p, "box", k.shadow, [
            0.07,
            y,
            0.06
          ], [
            w,
            g,
            0.06
          ]);
          for (const w of [-1, 1]) e.mesh(p, "box", k.light, [
            1.9,
            0.15,
            0.2
          ], [
            0,
            g + w * y / 2,
            0.06
          ]);
          e.mesh(p, "box", k.stone, [
            0.45,
            r - 1,
            0.32
          ], [
            2.2,
            r / 2,
            0
          ]);
        }
        break;
      }
      for (let h = -u / 2 + 1; h < u / 2; h += 3.5) {
        r > 4 && e.mesh(d, "box", k.stone, l ? [
          1.3,
          0.85,
          i.depth
        ] : [
          i.width,
          0.85,
          1.3
        ], [
          l ? h : 0,
          r + 0.55,
          l ? 0 : h
        ]);
        for (let v = 0; v < Math.floor(r / 0.9); v++) e.mesh(d, "box", k.mortar, l ? [
          0.035,
          0.6,
          0.025
        ] : [
          0.025,
          0.6,
          0.035
        ], [
          l ? h + v % 2 * 0.7 : i.width / 2 + 0.01,
          0.55 + v * 0.85,
          l ? i.depth / 2 + 0.01 : h + v % 2 * 0.7
        ]);
      }
      break;
    }
    case "water":
      e.mesh(o, "box", k.water, [
        i.width,
        0.12,
        i.depth
      ], [
        0,
        -0.18,
        0
      ]);
      for (let r = 0; r < i.width * i.depth / 9; r++) {
        const c = Math.sin(r * 7.3) * (i.width / 2 - 0.8), l = Math.cos(r * 3.7) * (i.depth / 2 - 0.3);
        e.mesh(o, "box", k.ripple, [
          0.4 + r % 4 * 0.3,
          0.012,
          0.04
        ], [
          c,
          -0.11,
          l
        ], !0);
      }
      break;
    case "planter":
      e.mesh(o, "box", k.stone, [
        i.width,
        0.55,
        i.depth
      ], [
        0,
        0.275,
        0
      ]), e.mesh(o, "box", k.soil, [
        i.width - 0.35,
        0.1,
        i.depth - 0.35
      ], [
        0,
        0.57,
        0
      ]);
      for (let r = -i.width / 2 + 0.65; r < i.width / 2; r += 1) for (let c = -i.depth / 2 + 0.6; c < i.depth / 2; c += 0.95) {
        const l = Math.sin(r * 7 + c * 19), u = i.width > 8 ? 0.63 : 0.37;
        e.mesh(o, "crown", l > 0.3 ? k.leafLight : k.leaf, [
          u,
          0.32 + l * 0.1,
          u * 0.9
        ], [
          r + l * 0.15,
          0.81,
          c
        ]), l > 0.5 && e.mesh(o, "rock", l > 0.8 ? k.light : k.rose, [
          0.1,
          0.12,
          0.1
        ], [
          r + 0.1,
          1.13,
          c
        ]);
      }
      break;
    case "thicket":
      e.mesh(o, "box", k.soil, [
        i.width,
        0.2,
        i.depth
      ], [
        0,
        0.07,
        0
      ]);
      for (let r = -i.width / 2 + 0.7; r < i.width / 2; r += 1.3) for (let c = -i.depth / 2 + 0.65; c < i.depth / 2; c += 1.25) {
        const l = Math.sin(r * 13 + c * 7), u = 0.6 + l * 0.2;
        e.mesh(o, "crown", l > 0 ? k.leaf : k.leafLight, [
          0.7,
          u,
          0.7
        ], [
          r,
          u * 0.75,
          c
        ]), l > 0.75 && e.mesh(o, "rock", k.amberLight, [
          0.16,
          0.15,
          0.16
        ], [
          r,
          u * 1.65,
          c
        ]);
      }
      break;
    case "hearth":
      e.mesh(o, "box", k.mortar, [
        i.width,
        0.24,
        i.depth
      ], [
        0,
        0.12,
        0
      ]), e.mesh(o, "cylinder", k.stone, [
        1.35,
        0.65,
        1.35
      ], [
        0,
        0.49,
        0
      ]), e.mesh(o, "cylinder", k.shadow, [
        1.06,
        0.06,
        1.06
      ], [
        0,
        0.84,
        0
      ]);
      for (let r = 0; r < 8; r++) {
        const c = r * Math.PI / 4, l = e.mesh(o, "cylinder", k.timber, [
          0.15,
          1.5,
          0.15
        ], [
          Math.sin(c) * 0.35,
          1,
          Math.cos(c) * 0.35
        ]);
        l.rotation.z = 1.1, l.rotation.y = c;
      }
      for (let r = 0; r < 5; r++) e.mesh(o, "rock", r % 2 ? k.ember : "#ea9963", [
        0.23,
        0.5 + r % 3 * 0.16,
        0.23
      ], [
        Math.sin(r * 2.4) * 0.35,
        1.35,
        Math.cos(r * 2.4) * 0.35
      ], !0);
      for (const r of [-1, 1])
        e.mesh(o, "cylinder", k.slate, [
          0.13,
          2.15,
          0.13
        ], [
          r * 1.22,
          1.35,
          0
        ]), e.mesh(o, "cone", k.brass, [
          0.23,
          0.45,
          0.23
        ], [
          r * 1.22,
          2.65,
          0
        ]);
      e.mesh(o, "torus", k.brass, [
        1.2,
        1.2,
        1.2
      ], [
        0,
        2.22,
        0
      ]).rotation.x = Math.PI / 2, e.mesh(o, "rock", k.ember, [
        0.27,
        0.58,
        0.27
      ], [
        0,
        2.42,
        0
      ], !0);
      break;
    case "wagon":
      e.mesh(o, "box", k.wood, [
        i.width - 1,
        0.35,
        i.depth - 1.2
      ], [
        0,
        1.1,
        0
      ]);
      for (const r of [-1, 1]) {
        for (let c = 0; c < 3; c++) e.mesh(o, "box", k.wood, [
          0.12,
          0.24,
          i.depth - 1
        ], [
          r * (i.width / 2 - 0.5),
          1.4 + c * 0.29,
          0
        ]);
        for (const c of [-i.depth * 0.28, i.depth * 0.28]) {
          e.mesh(o, "torus", k.shadow, [
            0.7,
            0.7,
            0.7
          ], [
            r * (i.width / 2 - 0.2),
            0.76,
            c
          ]).rotation.y = Math.PI / 2;
          for (let l = 0; l < 4; l++) {
            const u = e.mesh(o, "box", k.wood, [
              0.09,
              1.25,
              0.09
            ], [
              r * (i.width / 2 - 0.2),
              0.76,
              c
            ]);
            u.rotation.x = l * Math.PI / 4;
          }
        }
      }
      e.mesh(o, "box", k.cloth, [
        1.4,
        0.8,
        1.8
      ], [
        0,
        1.7,
        -0.8
      ]), e.mesh(o, "cylinder", k.timber, [
        0.45,
        0.9,
        0.45
      ], [
        0.6,
        1.8,
        1
      ]);
      break;
    case "supplies":
      for (let r = 0; r < 4; r++) {
        const c = e.group(o, [
          r % 2 * 1.5 - 0.75,
          r === 3 ? 1.3 : 0,
          r < 2 ? -0.7 : 0.7
        ]);
        e.mesh(c, "box", k.wood, [
          1.2,
          1.2,
          1.2
        ], [
          0,
          0.6,
          0
        ]);
        for (const l of [-1, 1]) e.mesh(c, "box", k.timber, [
          0.1,
          1.25,
          1.3
        ], [
          l * 0.43,
          0.6,
          0
        ]);
        e.mesh(c, "box", k.light, [
          0.32,
          0.35,
          0.02
        ], [
          0,
          0.7,
          0.62
        ]);
      }
      break;
    case "bench":
      e.mesh(o, "box", k.wood, [
        i.width - 0.3,
        0.18,
        i.depth - 0.2
      ], [
        0,
        0.72,
        0
      ]), e.mesh(o, "box", k.wood, [
        0.13,
        0.75,
        i.depth - 0.2
      ], [
        -i.width / 2 + 0.1,
        1.12,
        0
      ]);
      for (const r of [-1, 1]) e.mesh(o, "box", k.shadow, [
        i.width - 0.5,
        0.7,
        0.22
      ], [
        0,
        0.35,
        r * (i.depth / 2 - 0.5)
      ]);
      break;
    case "ruin":
      e.mesh(o, "box", k.stone, [
        i.width,
        0.5,
        i.depth
      ], [
        0,
        0.25,
        0
      ]);
      for (let r = 0; r < 3; r++) {
        const c = -i.width * 0.3 + r * i.width * 0.3, l = (a.height ?? 3) * (1 - r * 0.22), u = i.width * 0.11;
        e.mesh(d, "cylinder", k.stone, [
          u,
          l,
          u
        ], [
          c,
          l / 2 + 0.3,
          -i.depth * 0.2
        ]), e.mesh(d, "box", k.light, [
          u * 2.6,
          0.25,
          u * 2.6
        ], [
          c,
          l + 0.3,
          -i.depth * 0.2
        ]);
        for (let h = 0; h < 6; h++) {
          const v = h * Math.PI / 3;
          e.mesh(d, "box", k.mortar, [
            0.055,
            l * 0.8,
            0.055
          ], [
            c + Math.sin(v) * u,
            l / 2 + 0.3,
            -i.depth * 0.2 + Math.cos(v) * u
          ]);
        }
      }
      e.mesh(o, "rock", k.grassDark, [
        i.width * 0.4,
        0.3,
        i.depth * 0.3
      ], [
        0,
        0.7,
        i.depth * 0.2
      ]);
      break;
  }
  return d.children.length > 0;
}
var Wt = 1e-7;
function Wa(e, t, s) {
  return (t[0] - e[0]) * (s[1] - e[1]) - (t[1] - e[1]) * (s[0] - e[0]);
}
function Tn(e, t, s, a) {
  const n = [];
  for (let i = 0; i < e.length; i++) {
    const o = e[i], d = e[(i + 1) % e.length], r = Wa(t, s, o), c = Wa(t, s, d), l = a ? r >= -1e-7 : r <= Wt, u = a ? c >= -1e-7 : c <= Wt;
    if (l && n.push(o), l !== u && Math.abs(r - c) > Wt) {
      const h = r / (r - c);
      n.push([o[0] + (d[0] - o[0]) * h, o[1] + (d[1] - o[1]) * h]);
    }
  }
  return n;
}
function bs(e) {
  return Math.abs(e.reduce((t, s, a) => t + s[0] * e[(a + 1) % e.length][1] - s[1] * e[(a + 1) % e.length][0], 0)) / 2;
}
function xi(e, t) {
  let s = e;
  const a = [];
  for (let n = 0; n < t.length && s.length >= 3; n++) {
    const i = t[n], o = t[(n + 1) % t.length], d = Tn(s, i, o, !1);
    bs(d) > Wt && a.push(d), s = Tn(s, i, o, !0);
  }
  return a;
}
function Mi(e, t, s) {
  const a = t[0] - e[0], n = t[1] - e[1], i = s / (2 * Math.hypot(a, n)), o = -n * i, d = a * i;
  return [
    [e[0] + o, e[1] + d],
    [e[0] - o, e[1] - d],
    [t[0] - o, t[1] - d],
    [t[0] + o, t[1] + d]
  ];
}
function ws(e, t) {
  const s = [];
  for (const a of e) {
    for (let n = 1; n < a.points.length; n++) s.push(Mi(a.points[n - 1], a.points[n], a.width + t));
    for (const [n, i] of a.points.slice(1, -1)) s.push(Array.from({ length: 12 }, (o, d) => {
      const r = d * Math.PI / 6, c = (a.width + t) / 2;
      return [n + Math.cos(r) * c, i + Math.sin(r) * c];
    }));
  }
  return s;
}
function ki(e, t = 0) {
  const s = ws(e, t), a = [];
  for (let n = 0; n < s.length; n++) {
    let i = [s[n]];
    for (let o = 0; o < n && i.length; o++) i = i.flatMap((d) => xi(d, s[o]));
    a.push(...i.filter((o) => bs(o) > Wt));
  }
  return a;
}
function _i(e, t, s, a) {
  for (const [o, d, r] of [[
    0.4,
    0.025,
    s ? k.brass : k.mortar
  ], [
    0,
    0.04,
    s ? k.slate : k.stone
  ]]) for (const c of ki(t, o)) {
    const l = c.reduce((v, p) => v + p[0], 0) / c.length, u = c.reduce((v, p) => v + p[1], 0) / c.length, h = e.shape(a(l, u), c.map((v) => [v[0], -v[1]]), r, [
      0,
      d,
      0
    ]);
    h.rotation.x = -Math.PI / 2, h.castShadow = !1;
  }
  const n = ws(t, 0.4);
  let i = 0;
  for (const o of t) {
    for (let d = 1; d < o.points.length; d++, i++) {
      const r = o.points[d - 1], c = o.points[d], l = c[0] - r[0], u = c[1] - r[1], h = Math.hypot(l, u);
      for (let v = 1.5; v < h; v += 1.65) {
        const p = r[0] + l * v / h, g = r[1] + u * v / h;
        if (n.some((w, f) => f !== i && w.every((x, b) => Wa(x, w[(b + 1) % w.length], [p, g]) >= -1e-7))) continue;
        const y = e.mesh(a(p, g), "box", s ? k.shadow : k.mortar, [
          o.width - 0.08,
          0.012,
          0.025
        ], [
          p,
          0.049,
          g
        ]);
        y.rotation.y = Math.atan2(l, u), y.castShadow = !1;
      }
    }
    i += o.points.length - 2;
  }
}
function Si(e, t) {
  const s = e.x - e.width / 2, a = s + e.width, n = e.z - e.depth / 2, i = n + e.depth, o = Math.max(s, t.x - t.width / 2), d = Math.min(a, t.x + t.width / 2), r = Math.max(n, t.z - t.depth / 2), c = Math.min(i, t.z + t.depth / 2);
  return o >= d || r >= c ? [e] : [
    [
      s,
      n,
      a,
      r
    ],
    [
      s,
      c,
      a,
      i
    ],
    [
      s,
      r,
      o,
      c
    ],
    [
      d,
      r,
      a,
      c
    ]
  ].filter(([l, u, h, v]) => h > l && v > u).map(([l, u, h, v]) => ({
    x: (l + h) / 2,
    z: (u + v) / 2,
    width: h - l,
    depth: v - u
  }));
}
function Ri(e, t, s) {
  const a = s[0] - t[0], n = s[1] - t[1], i = Math.max(0, Math.min(1, ((e.x - t[0]) * a + (e.y - t[1]) * n) / (a * a + n * n)));
  return Math.hypot(e.x - t[0] - a * i, e.y - t[1] - n * i);
}
function Ci(e, t, s) {
  const a = [], n = /* @__PURE__ */ new Map(), i = [], o = new Fs(), d = new St(), r = new Ys(), c = [];
  function l(f, x) {
    const b = `${Math.floor(f / 16)}:${Math.floor(x / 16)}`;
    let M = n.get(b);
    return M || (M = e.group(t), n.set(b, M)), M;
  }
  let u = [s.bounds];
  for (const f of s.features.filter((x) => x.kind === "water")) u = u.flatMap((x) => Si(x, f.footprint));
  const h = s.surface === "grass", v = s.surface === "marble", p = h ? k.grass : s.surface === "wet" ? k.wetStone : v ? k.marble : k.stone;
  for (const f of u)
    if (e.mesh(l(f.x, f.z), "box", p, [
      f.width,
      0.6,
      f.depth
    ], [
      f.x,
      -0.32,
      f.z
    ]).castShadow = !1, !h) for (let x = f.x - f.width / 2; x < f.x + f.width / 2; x += 4) for (let b = f.z - f.depth / 2; b < f.z + f.depth / 2; b += 4) {
      const M = Math.min(4, f.x + f.width / 2 - x), z = Math.min(4, f.z + f.depth / 2 - b), L = v ? Math.round(x / 4 + b / 4) % 2 ? k.marble : k.marbleLight : p;
      e.mesh(l(x, b), "box", L, [
        M - 0.04,
        0.018,
        z - 0.04
      ], [
        x + M / 2,
        -9e-3,
        b + z / 2
      ]).castShadow = !1;
    }
  if (_i(e, s.roads, v, l), v) {
    const f = l(0, -17);
    for (const x of [
      4,
      4.4,
      5.5
    ]) e.ring(f, k.brass, x, 0, -17, 1, !1, 0.09);
    for (let x = 0; x < 12; x++) {
      const b = x * Math.PI / 6;
      e.shape(f, [
        [0, 0],
        [0.35, 0.7],
        [0, 2.5],
        [-0.35, 0.7]
      ], k.brass, [
        Math.sin(b) * 4.6,
        0.095,
        -17 + Math.cos(b) * 4.6
      ]).rotation.set(-Math.PI / 2, 0, b);
    }
  }
  if (s.vista === "camp") {
    const f = l(0, 8);
    e.ring(f, k.mortar, 10.7, 0, 8, 1, !0, 0.08), e.ring(f, k.stone, 10.35, 0, 8, 1, !0, 0.085);
    for (let x = 0; x < 6; x++) {
      const b = 2 + x * 1.29, M = b + 1.23, z = 10 + x * 6;
      for (let L = 0; L < z; L++) {
        const A = (L + x % 2 * 0.5) / z * Math.PI * 2 + 8e-3, j = A + Math.PI * 2 / z - 0.02, P = [
          [Math.cos(A) * b, Math.sin(A) * b],
          [Math.cos(j) * b, Math.sin(j) * b],
          [Math.cos(j) * M, Math.sin(j) * M],
          [Math.cos(A) * M, Math.sin(A) * M]
        ], U = e.shape(f, P, (x * 7 + L) % 5 ? k.stone : k.pavingAccent, [
          0,
          0.096,
          8
        ]);
        U.rotation.x = -Math.PI / 2;
      }
    }
    e.ring(f, k.mortar, 4.5, 0, 6, 1, !1, 0.11);
    for (let x = 0; x < 20; x++) {
      const b = x * Math.PI / 10, M = e.mesh(f, "box", k.light, [
        0.15,
        0.025,
        0.75
      ], [
        Math.sin(b) * 9.65,
        0.12,
        8 + Math.cos(b) * 9.65
      ]);
      M.rotation.y = b;
    }
  }
  const { bounds: g } = s;
  for (let f = 0; f < (h ? 420 : 0); f++) {
    const x = g.x + Math.sin(f * 127.13) * (g.width / 2 - 3), b = g.z + Math.cos(f * 53.71) * (g.depth / 2 - 3), M = {
      x,
      y: b
    };
    if (s.features.some((L) => rs(M, {
      ...L.footprint,
      width: L.footprint.width + 1.5,
      depth: L.footprint.depth + 1.5
    })) || s.roads.some((L) => L.points.slice(1).some((A, j) => Ri(M, L.points[j], A) < L.width / 2 + 1)) || s.vista === "camp" && Math.hypot(x, b - 8) < 11) continue;
    const z = l(x, b);
    if (f % 4 === 0) {
      const L = Array.from({ length: 9 }, (j, P) => {
        const U = P * Math.PI * 2 / 9, D = 1 + Math.sin(P * 7 + f) * 0.3;
        return [Math.cos(U) * D * (1.2 + f % 3), Math.sin(U) * D * (0.7 + f % 2)];
      }), A = e.shape(z, L, f % 8 ? k.grassDark : k.grassLight, [
        x,
        5e-3,
        b
      ]);
      A.rotation.x = -Math.PI / 2;
    } else {
      for (let L = 0; L < 3; L++) {
        const A = e.mesh(z, "cone", f % 3 ? k.grassDark : k.leafLight, [
          0.035,
          0.3 + L * 0.09,
          0.035
        ], [
          x + (L - 1) * 0.16,
          0.15,
          b
        ]);
        A.rotation.z = (L - 1) * 0.35;
      }
      f % 11 === 0 && e.mesh(z, "rock", k.light, [
        0.12,
        0.13,
        0.12
      ], [
        x,
        0.38,
        b
      ]);
    }
  }
  for (const f of s.features) {
    const x = f.footprint, b = x.width > x.depth, M = Math.max(x.width, x.depth), z = f.kind === "wall" ? Math.ceil(M / 7) : 1, L = e.group(t);
    L.name = f.id;
    for (let A = 0; A < z; A++) {
      const j = -M / 2 + (A + 0.5) * M / z, P = z === 1 ? x : {
        ...x,
        x: x.x + (b ? j : 0),
        z: x.z + (b ? 0 : j),
        width: b ? M / z : x.width,
        depth: b ? x.depth : M / z
      }, U = z === 1 ? L : e.group(L);
      wi(e, l(P.x, P.z), U, {
        ...f,
        footprint: P
      }, s.vista === "interior") ? (a.push(e.bake(U)), i.push({
        root: U,
        bounds: new Ta().setFromObject(U).expandByScalar(0.35)
      })) : U.removeFromParent();
    }
  }
  for (const f of s.roads.slice(0, 1)) for (let x = 1; x < f.points.length; x++) {
    const [b, M] = f.points[x];
    if (!(s.vista === "camp" && Math.hypot(b, M - 8) < 13))
      for (const z of [-1, 1]) gs(e, l(b, M), b + z * (f.width / 2 + 0.6), M);
  }
  const y = e.group(t), w = s.vista === "interior";
  e.mesh(y, "box", w ? k.undercroft : k.distantGround, [
    300,
    8,
    300
  ], [
    0,
    -4.65,
    0
  ]).castShadow = !1;
  for (let f = 0; f < (w ? 0 : 12); f++) {
    const x = (f % 2 ? 1 : -1) * (g.width / 2 + 15 + f % 3 * 8), b = g.z - 25 + f * 7;
    e.mesh(y, "crown", f % 3 ? k.distantGround : k.distantLeaf, [
      17 + f % 4 * 3,
      6 + f % 3 * 2,
      22
    ], [
      x,
      -3,
      b
    ]);
  }
  for (let f = 0; f < (w || s.vista === "garden" ? 0 : 9); f++) {
    const x = (f - 4) * 12, b = g.z - g.depth / 2 - 15 - f % 3 * 6, M = 9 + f % 4 * 3;
    e.mesh(y, "box", k.distantWall, [
      9,
      M,
      9
    ], [
      x,
      M / 2 - 2,
      b
    ]), e.mesh(y, "cone", k.distantRoof, [
      7,
      6,
      7
    ], [
      x,
      M + 1,
      b
    ]);
    for (let z = -1; z <= 1; z++) e.mesh(y, "box", k.distantGround, [
      0.8,
      2.5,
      0.08
    ], [
      x + z * 2.2,
      M - 4,
      b + 4.55
    ]);
  }
  if (!w && s.vista !== "garden") {
    const f = g.z - g.depth / 2 - 25;
    e.mesh(y, "box", k.distantWall, [
      8,
      35,
      8
    ], [
      -17,
      15.5,
      f
    ]), e.mesh(y, "cone", k.slate, [
      7,
      13,
      7
    ], [
      -17,
      39,
      f
    ]), e.mesh(y, "torus", k.brass, [
      2.5,
      2.5,
      0.6
    ], [
      -17,
      28,
      f + 4.1
    ]), e.mesh(y, "box", k.shadow, [
      0.13,
      1.8,
      0.1
    ], [
      -17,
      28.8,
      f + 4.2
    ]), e.mesh(y, "box", k.shadow, [
      1.4,
      0.13,
      0.1
    ], [
      -16.4,
      28,
      f + 4.2
    ]);
  }
  a.push(e.bake(y));
  for (const f of n.values()) a.push(e.bake(f));
  return {
    update(f, x) {
      o.direction.copy(d.set(Math.sin(x), at.height / at.distance, Math.cos(x)).normalize());
      for (const b of i) {
        c.length = 0;
        for (const M of [0.1, 1.6])
          if (o.origin.set(f.x, M, f.y), r.ray.copy(o), o.intersectsBox(b.bounds) && r.intersectObject(b.root, !0, c), c.length) break;
        b.root.visible = c.length === 0;
      }
    },
    dispose() {
      a.forEach((f) => f()), t.clear();
    }
  };
}
function zi(e, t, s, a, n, i, o = !0) {
  const d = i.has("captives_arrived"), r = e.group(t, [
    a,
    0,
    n
  ]), c = e.group(t), l = s === "sanniang", u = s === "laobai", h = s === "kouzi";
  r.rotation.y = l ? 0.25 : -0.35, o && (h || s === "anian") && (r.position.y = -0.3), r.scale.setScalar(u ? 1.24 : h ? 1.06 : s === "anian" ? 1.19 : 1.12);
  const v = l ? "#343d59" : u ? "#596a80" : h ? "#53617a" : "#79647d", p = "#615047", g = "#dfbaa0", y = u ? 0.39 : h ? 0.25 : 0.29, w = u ? 0.31 : 0.23, f = [];
  for (const F of [-1, 1]) {
    const Z = e.group(r, [
      F * 0.16,
      0.78,
      F > 0 ? 0.03 : -0.04
    ]);
    Z.rotation.x = o && (h || s === "anian") ? -1.15 : F * 0.06, f.push(Z), e.mesh(Z, "cylinder", "#48545d", [
      0.115,
      0.61,
      0.12
    ], [
      0,
      -0.28,
      0
    ]), e.mesh(Z, "cylinder", p, [
      0.135,
      0.37,
      0.14
    ], [
      0,
      -0.53,
      0
    ]), e.mesh(Z, "sphere", p, [
      0.14,
      0.12,
      0.23
    ], [
      0,
      -0.69,
      0.08
    ]);
  }
  e.mesh(r, "sphere", v, [
    y,
    0.46,
    0.22
  ], [
    0,
    1.24,
    0
  ]), e.mesh(r, "cylinder", v, [
    w,
    0.34,
    0.21
  ], [
    0,
    0.92,
    0
  ]), e.mesh(r, "cylinder", p, [
    w + 0.015,
    0.08,
    0.23
  ], [
    0,
    1.01,
    0
  ]), e.mesh(r, "box", "#c6aa72", [
    0.13,
    0.11,
    0.03
  ], [
    0,
    1.01,
    0.244
  ]), e.mesh(r, "cylinder", g, [
    0.095,
    0.2,
    0.1
  ], [
    0,
    1.68,
    0
  ]);
  const x = e.group(r, [
    0,
    1.93,
    0.025
  ]);
  x.rotation.x = l ? 0.1 : -0.025, e.mesh(x, "sphere", g, [
    0.215,
    0.285,
    0.22
  ]);
  const b = l ? "#272b42" : h ? "#643d41" : s === "anian" ? "#483b40" : "#30343e";
  e.mesh(x, "sphere", b, [
    0.23,
    0.18,
    0.23
  ], [
    0,
    0.16,
    -0.025
  ]);
  for (const F of [-1, 1])
    e.mesh(x, "sphere", b, [
      0.045,
      0.17,
      0.095
    ], [
      F * 0.2,
      0.02,
      -0.03
    ]), e.mesh(x, "sphere", "#303b3b", [
      0.026,
      0.033,
      0.013
    ], [
      F * 0.083,
      0.025,
      0.216
    ]), e.mesh(x, "box", b, [
      0.069,
      0.018,
      0.016
    ], [
      F * 0.086,
      0.093,
      0.219
    ]), e.mesh(x, "sphere", g, [
      0.036,
      0.062,
      0.045
    ], [
      F * 0.212,
      -0.025,
      0
    ]);
  e.mesh(x, "sphere", g, [
    0.035,
    0.05,
    0.045
  ], [
    0,
    -0.025,
    0.223
  ]), e.mesh(x, "box", "#b47f70", [
    0.06,
    0.012,
    0.014
  ], [
    0,
    -0.126,
    0.194
  ]);
  for (const F of [-1, 1]) {
    const Z = e.group(r, [
      F * y,
      1.48,
      0
    ]);
    Z.rotation.z = F * 0.11, Z.rotation.x = l ? F > 0 ? -0.85 : -0.2 : F > 0 ? -0.4 : -0.1, e.mesh(Z, "cylinder", v, [
      0.11,
      0.39,
      0.12
    ], [
      0,
      -0.17,
      0
    ]), e.mesh(Z, "cylinder", l ? "#e8e1cc" : "#80969d", [
      0.12,
      0.14,
      0.13
    ], [
      0,
      -0.39,
      0
    ]), e.mesh(Z, "cylinder", g, [
      0.076,
      0.22,
      0.085
    ], [
      0,
      -0.51,
      0
    ]), e.mesh(Z, "sphere", g, [
      0.09,
      0.105,
      0.075
    ], [
      0,
      -0.65,
      0
    ]), l && F > 0 && (e.mesh(Z, "cylinder", "#b67e3f", [
      0.073,
      0.21,
      0.073
    ], [
      0,
      -0.68,
      0.1
    ]), e.mesh(Z, "cylinder", "#dbc8a2", [
      0.045,
      0.055,
      0.045
    ], [
      0,
      -0.55,
      0.1
    ]));
  }
  if (l) {
    e.mesh(r, "cylinder", v, [
      0.125,
      0.23,
      0.12
    ], [
      0,
      1.66,
      0
    ]), e.shape(r, [
      [-0.21, 0.36],
      [0.21, 0.36],
      [0.3, -0.36],
      [-0.3, -0.36]
    ], "#eee7d3", [
      0,
      1.02,
      0.238
    ], 0.014), e.mesh(r, "box", "#d0c4a4", [
      0.18,
      0.17,
      0.025
    ], [
      0.07,
      0.85,
      0.276
    ]);
    for (const F of [-1, 1]) {
      const Z = e.mesh(r, "box", "#eee7d3", [
        0.052,
        0.53,
        0.025
      ], [
        F * 0.16,
        1.39,
        0.19
      ]);
      Z.rotation.z = -F * 0.15;
    }
    e.mesh(x, "sphere", b, [
      0.19,
      0.17,
      0.13
    ], [
      0.09,
      -0.03,
      -0.22
    ]), e.mesh(x, "cylinder", "#dfba7a", [
      0.014,
      0.38,
      0.014
    ], [
      0.12,
      0.03,
      -0.26
    ]).rotation.z = 1.2, e.mesh(r, "cone", v, [
      0.4,
      0.85,
      0.32
    ], [
      0,
      0.66,
      0
    ]), e.mesh(r, "cylinder", "#803f4e", [
      0.27,
      0.075,
      0.245
    ], [
      0,
      1.01,
      0
    ]), e.shape(r, [
      [-0.35, 0.2],
      [0.35, 0.2],
      [0.43, -0.22],
      [-0.43, -0.22]
    ], v, [
      0,
      1.43,
      -0.23
    ], 0.018), e.mesh(r, "box", p, [
      0.24,
      0.28,
      0.17
    ], [
      -0.31,
      0.9,
      -0.05
    ]);
  } else if (u) {
    e.mesh(r, "sphere", v, [
      0.34,
      0.35,
      0.2
    ], [
      0,
      1.17,
      0.1
    ]), e.shape(r, [
      [-0.41, 0.34],
      [0.41, 0.34],
      [0.49, -0.58],
      [0.18, -0.7],
      [-0.35, -0.57]
    ], "#627a92", [
      0,
      1.18,
      -0.26
    ], 0.025), e.mesh(r, "box", "#aeb7b6", [
      0.44,
      0.14,
      0.11
    ], [
      0,
      1.62,
      0.19
    ]);
    const F = e.group(r, [
      -0.36,
      1.1,
      0.2
    ]);
    F.rotation.z = -0.18, e.mesh(F, "box", "#7a624b", [
      0.32,
      0.42,
      0.075
    ]), e.mesh(F, "box", "#e4dfcd", [
      0.27,
      0.36,
      0.025
    ], [
      0,
      0,
      0.047
    ]), e.mesh(r, "cylinder", "#e4dfcd", [
      0.13,
      0.25,
      0.14
    ], [
      0.16,
      0.36,
      0.06
    ]);
  } else if (h) {
    if (e.mesh(r, "cylinder", "#b48859", [
      0.18,
      0.17,
      0.17
    ], [
      0,
      1.65,
      0
    ]), e.mesh(r, "box", "#b48859", [
      0.17,
      0.38,
      0.04
    ], [
      0.08,
      1.42,
      0.24
    ]), e.mesh(r, "cylinder", "#74869e", [
      0.025,
      0.48,
      0.025
    ], [
      -0.36,
      0.67,
      0.18
    ]), e.mesh(r, "box", "#74869e", [
      0.13,
      0.11,
      0.055
    ], [
      -0.36,
      0.92,
      0.18
    ]), d && o) {
      r.position.y = 0.5;
      const F = e.mesh(c, "cylinder", "#849b95", [
        0.24,
        2.4,
        0.24
      ], [
        a,
        0.72,
        n
      ]);
      F.rotation.z = Math.PI / 2;
      for (const Z of [-1, 1]) e.mesh(c, "box", "#637b7c", [
        0.2,
        0.7,
        0.6
      ], [
        a + Z * 0.8,
        0.35,
        n
      ]);
    }
    e.mesh(r, "box", "#e7dbc4", [
      0.28,
      0.22,
      0.23
    ], [
      0.16,
      0.53,
      0.03
    ]), e.mesh(r, "box", "#6f5540", [
      0.24,
      0.21,
      0.15
    ], [
      -0.3,
      1,
      0.12
    ]), i.has("supplies_secured") && e.mesh(r, "cylinder", "#8caaa7", [
      0.035,
      0.44,
      0.035
    ], [
      -0.32,
      1.11,
      0.22
    ]), e.mesh(r, "box", "#6b5944", [
      0.52,
      0.43,
      0.03
    ], [
      0,
      1.29,
      0.24
    ]);
  } else {
    e.mesh(r, "cone", v, [
      0.36,
      1.05,
      0.28
    ], [
      0,
      0.67,
      0
    ]), e.mesh(x, "sphere", b, [
      0.22,
      0.48,
      0.16
    ], [
      0,
      -0.26,
      -0.17
    ]);
    for (let Z = 0; Z < 3; Z++) {
      const H = e.mesh(r, "box", "#ded3b5", [
        0.29,
        0.34,
        0.018
      ], [
        -0.12 + Z * 0.02,
        1.02,
        0.31 + Z * 0.023
      ]);
      H.rotation.z = Z * 0.1;
    }
    const F = e.mesh(r, "box", "#d8ba87", [
      0.075,
      0.83,
      0.04
    ], [
      0,
      1.25,
      0.22
    ]);
    F.rotation.z = -0.55, e.mesh(r, "box", p, [
      0.42,
      0.44,
      0.21
    ], [
      0.21,
      0.91,
      -0.28
    ]);
  }
  const M = e.ring(t, "#e8c77b", 0.75, a, n, 0.8);
  x.removeFromParent(), f.forEach((F) => F.removeFromParent());
  const z = f.map((F) => e.bake(F)), L = e.bake(r), A = e.bake(x), j = e.bake(c);
  r.add(x, ...f);
  const P = r.position.y, U = r.rotation.y, D = {
    x: a,
    y: n
  };
  let J = -1 / 0, ie = 0;
  return {
    root: r,
    ring: M,
    id: s,
    position: D,
    seated: o,
    locate(F, Z) {
      const H = D.x !== F.position.x || D.y !== F.position.y;
      return H && (J = Z), ie = F.facing, D.x = F.position.x, D.y = F.position.y, r.position.x = D.x, r.position.z = D.y, M.position.x = D.x, M.position.z = D.y, H;
    },
    update(F, Z, H) {
      const oe = Z - J < 120, Te = Math.hypot(F.x - D.x, F.y - D.y) < 10;
      M.visible = Te;
      const ge = oe ? Math.PI / 2 - ie : Te ? Math.atan2(F.x - D.x, F.y - D.y) : U, ce = Math.atan2(Math.sin(ge - r.rotation.y), Math.cos(ge - r.rotation.y));
      r.rotation.y += H ? ce : ce * 0.16, r.position.y = P + (H ? 0 : Math.sin(Z * 15e-4 + a) * 0.012), x.rotation.y = H ? 0 : Math.sin(Z * 8e-4 + n) * 0.04, o || f.forEach((xe, Oe) => {
        xe.rotation.x = H || !oe ? 0 : Math.sin(Z * 0.012 + Oe * Math.PI) * 0.45;
      });
    },
    dispose() {
      L(), A(), j(), z.forEach((F) => F()), r.removeFromParent(), c.removeFromParent(), M.removeFromParent();
    }
  };
}
function Pi(e, t, s, a) {
  const n = e.group(t), i = Zt[s.id], o = Object.values(Ae).find((u) => u.scene === s.id);
  let d = a, r = !1;
  const c = (i?.waves[0] ?? []).map((u) => {
    const h = sn(e, n, u.kind, ga[0]);
    h.bar.removeFromParent();
    const v = s.anchors[u.anchor], p = o?.sentryExits[u.anchor], g = p ? s.anchors[p] : v, y = a.has(i.complete) ? g : v;
    return h.root.position.set(y.x, 0, y.y), {
      ...h,
      home: v,
      aside: g,
      dispose: e.bake(h.root)
    };
  }), l = () => {
    n.visible = !r && !!i && (!!o || !d.has(i.complete));
  };
  return l(), {
    setFacts(u) {
      d = u, l();
    },
    setEncounterActive(u) {
      r = u, l();
    },
    animate(u) {
      if (!n.visible) return !1;
      let h = !1;
      for (const v of c) {
        const p = d.has(i.complete) ? v.aside : v.home, g = p.x - v.root.position.x, y = p.y - v.root.position.z, w = Math.hypot(g, y);
        if (w < 1e-3) continue;
        const f = u ? 1 : Math.min(1, 0.36 / w);
        v.root.position.x += g * f, v.root.position.z += y * f, v.root.rotation.y = w > 0.4 ? Math.atan2(g, y) : 0, h = !0;
      }
      return h;
    },
    dispose() {
      c.forEach((u) => u.dispose()), n.removeFromParent();
    }
  };
}
function $i(e, t, s, a) {
  const n = Ae[s], i = sn(e, t, n.kind, ga[0]);
  i.bar.removeFromParent();
  const o = e.bake(i.root), d = { ...la(s, a) };
  i.root.position.set(d.x, 0, d.y);
  let r = a;
  return {
    id: s,
    root: i.root,
    position: d,
    setFacts(c) {
      r = c;
    },
    update(c, l) {
      const u = la(s, r), h = c.x - u.x, v = c.y - u.y, p = Math.hypot(h, v), g = p <= n.approachRadius, y = g && !r.has(n.complete) ? 1 : 0, w = u.x + (p ? h / p * y : 0), f = u.y + (p ? v / p * y : 0), x = d.x + d.y + i.root.rotation.y;
      d.x += l ? w - d.x : (w - d.x) * 0.22, d.y += l ? f - d.y : (f - d.y) * 0.22, Math.abs(w - d.x) + Math.abs(f - d.y) < 0.01 && (d.x = w, d.y = f);
      const b = g ? Math.atan2(h, v) : 0, M = Math.atan2(Math.sin(b - i.root.rotation.y), Math.cos(b - i.root.rotation.y));
      return i.root.rotation.y += l || Math.abs(M) < 5e-3 ? M : M * 0.2, i.root.position.set(d.x, 0, d.y), x !== d.x + d.y + i.root.rotation.y;
    },
    dispose() {
      o(), i.root.removeFromParent();
    }
  };
}
function Ii(e, t, s, a) {
  const n = Ci(e, t, s.landscape), i = e.group(t), o = e.group(t), d = Pi(e, t, s, a), r = [], c = ma.filter((p) => Ae[p].scene === s.id).map((p) => $i(e, o, p, a));
  let l = -1, u = null, h = null;
  function v(p) {
    const g = [...p].sort().join("/");
    if (g === h) return;
    h = g, c.forEach((w) => w.setFacts(p)), u?.(), d.setFacts(p);
    for (const w of ha(s, p)) {
      const f = w.position;
      if (w.kind === "exit") {
        for (const x of [-1, 1]) gs(e, i, f.x + x * 1.7, f.y, 1.5);
        e.mesh(i, "box", k.brass, [
          3,
          0.025,
          0.35
        ], [
          f.x,
          0.12,
          f.y
        ]).castShadow = !1;
      } else if (w.target.kind === "inspect" && w.target.passage === "warning")
        e.mesh(i, "box", k.timber, [
          0.12,
          1.8,
          0.12
        ], [
          f.x,
          0.9,
          f.y
        ]), e.mesh(i, "box", k.wood, [
          1.4,
          0.7,
          0.13
        ], [
          f.x,
          1.6,
          f.y
        ]), e.mesh(i, "box", k.light, [
          0.7,
          0.4,
          0.025
        ], [
          f.x,
          1.6,
          f.y + 0.08
        ]);
      else if (w.target.kind === "inspect" && w.target.passage === "orders") {
        e.mesh(i, "box", k.slate, [
          2.2,
          0.8,
          1.2
        ], [
          f.x,
          0.4,
          f.y - 0.8
        ]);
        const x = e.mesh(i, "box", k.light, [
          1.8,
          0.08,
          0.9
        ], [
          f.x,
          0.85,
          f.y - 0.8
        ]);
        x.rotation.x = 0.2;
        for (let b = -1; b <= 1; b++) e.mesh(i, "cylinder", k.brass, [
          0.12,
          0.12,
          0.12
        ], [
          f.x + b * 0.45,
          0.95,
          f.y - 0.55
        ]);
      }
    }
    if (s.id === "camp") {
      const w = s.landscape.features.find((f) => f.kind === "clinic").footprint;
      if (p.has("clinic_helped")) {
        const f = s.landscape.features.find((x) => x.kind === "bench").footprint;
        for (const x of [-1, 1])
          e.mesh(i, "cylinder", "#ede3c9", [
            0.16,
            0.22,
            0.16
          ], [
            f.x,
            0.91,
            f.z + x * 0.65
          ]), e.mesh(i, "cylinder", "#99704c", [
            0.125,
            0.012,
            0.125
          ], [
            f.x,
            1.024,
            f.z + x * 0.65
          ]);
      }
      if (p.has("receiving_arranged")) for (const f of [-1, 1]) {
        const x = w.x + f * 2.4, b = w.z + w.depth / 2 - 0.2, M = e.group(i, [
          x,
          0.2,
          b
        ]);
        M.rotation.x = -0.16;
        for (const z of [-1, 1]) e.mesh(M, "cylinder", k.timber, [
          0.055,
          2.9,
          0.055
        ], [
          z * 0.42,
          1.4,
          0
        ]);
        e.mesh(M, "box", p.has("captives_arrived") ? "#bdccc0" : "#eee7d1", [
          0.76,
          2.2,
          0.09
        ], [
          0,
          1.4,
          0.05
        ]);
        for (const z of [0.7, 2.1]) e.mesh(M, "box", k.timber, [
          0.94,
          0.055,
          0.08
        ], [
          0,
          z,
          0.12
        ]);
      }
      if (p.has("warden_defeated")) {
        const f = s.landscape.features.find((x) => x.kind === "wagon").footprint;
        for (let x = 0; x < 4; x++) {
          const b = e.group(i, [
            f.x + (x % 2 ? 0.65 : -0.65),
            1.4,
            f.z + (x < 2 ? -0.9 : 0.6)
          ]);
          e.mesh(b, "box", k.wood, [
            1.1,
            0.75,
            1.2
          ], [
            0,
            0.375,
            0
          ]);
          for (const M of [-1, 1]) e.mesh(b, "box", k.brass, [
            0.08,
            0.78,
            1.22
          ], [
            M * 0.35,
            0.38,
            0
          ]);
          e.mesh(b, "box", k.light, [
            0.25,
            0.025,
            0.55
          ], [
            0,
            0.77,
            0
          ]);
        }
      }
    }
    for (const w of s.objects) {
      if (w.kind !== "switch") continue;
      const f = s.anchors[w.anchor], x = p.has(w.fact), b = e.group(i, [
        f.x,
        0,
        f.y
      ]);
      e.mesh(b, "box", k.slate, [
        0.7,
        0.65,
        0.7
      ], [
        0,
        0.325,
        0
      ]), e.mesh(b, "box", k.brass, [
        0.5,
        0.1,
        0.5
      ], [
        0,
        0.7,
        0
      ]);
      const M = e.group(b, [
        0,
        0.75,
        0
      ]);
      M.rotation.z = x ? 0.65 : -0.65, e.mesh(M, "cylinder", k.brass, [
        0.065,
        0.7,
        0.065
      ], [
        0,
        0.35,
        0
      ]), e.mesh(M, "cylinder", k.timber, [
        0.09,
        0.44,
        0.09
      ], [
        0,
        0.73,
        0
      ]).rotation.z = Math.PI / 2;
    }
    const y = yt(s, p);
    for (const w of s.landscape.gates) {
      const f = w.footprint, x = f.width > f.depth, b = Math.max(f.width, f.depth), M = e.group(i, [
        f.x,
        0,
        f.z
      ]);
      x || (M.rotation.y = Math.PI / 2);
      for (const z of [-1, 1]) e.mesh(M, "box", k.stone, [
        0.35,
        3.2,
        0.7
      ], [
        z * b / 2,
        1.6,
        0
      ]);
      if (e.mesh(M, "box", k.light, [
        b + 0.5,
        0.35,
        0.9
      ], [
        0,
        3.25,
        0
      ]), y.closedGates.has(w.id)) {
        for (let z = -b / 2 + 0.2; z < b / 2; z += 0.4) e.mesh(M, "box", k.shadow, [
          0.065,
          3,
          0.1
        ], [
          z,
          1.5,
          0
        ]);
        for (const z of [0.4, 2.5]) e.mesh(M, "box", k.brass, [
          b,
          0.12,
          0.15
        ], [
          0,
          z,
          0
        ]);
      } else e.mesh(M, "box", k.shadow, [
        b,
        0.42,
        0.16
      ], [
        0,
        3,
        0
      ]);
    }
    for (const w of s.landscape.features) {
      if (w.kind !== "beacon" || p.has("alarm_silenced")) continue;
      const f = w.footprint, x = e.mesh(i, "cylinder", k.timber, [
        0.045,
        4.8,
        0.045
      ], [
        f.x + 3.3,
        2.7,
        f.z + 2.5
      ]);
      x.rotation.z = -0.32;
      for (let b = 0; b < 5; b++) e.mesh(i, "rock", b % 2 ? k.ember : k.cloth, [
        0.55,
        1.2 + b % 3 * 0.3,
        0.55
      ], [
        f.x + Math.sin(b * 2) * 0.7,
        5.4 + b % 3 * 0.3,
        f.z + Math.cos(b * 2) * 0.7
      ], !0);
    }
    u = e.bake(i);
  }
  return v(a), {
    setFacts: v,
    people: r,
    parleyPeople: c,
    setPeople(p, g) {
      let y = !1;
      for (const w of lt) {
        const f = p[w], x = pa[w].home, b = _e[x.scene].anchors[x.anchor], M = f.mode === "idle" && (f.scene === "cells" || f.scene === x.scene && Math.hypot(f.position.x - b.x, f.position.y - b.y) < 1);
        let z = r.find((L) => L.id === w);
        z && (f.scene !== s.id || z.seated !== M) && (z.dispose(), r.splice(r.indexOf(z), 1), z = void 0, y = !0), f.scene === s.id && (z || (z = zi(e, o, w, f.position.x, f.position.y, new Set(h?.split("/")), M), r.push(z), y = !0), y = z.locate(f, g) || y);
      }
      return y;
    },
    setEncounterActive(p) {
      d.setEncounterActive(p), c.forEach((g) => {
        g.root.visible = !p;
      });
    },
    update: n.update,
    animate(p, g, y) {
      const w = Math.floor(g / 80);
      if (w === l) return !1;
      l = w;
      let f = d.animate(y);
      for (const x of c) f = x.update(p, y) || f;
      for (const x of r) Math.hypot(x.position.x - p.x, x.position.y - p.y) < 22 ? (x.update(p, g, y), f = !y) : x.ring.visible = !1;
      return f;
    },
    dispose() {
      r.splice(0).forEach((p) => p.dispose()), c.forEach((p) => p.dispose()), o.removeFromParent(), u?.(), d.dispose(), n.dispose();
    }
  };
}
var Ei = "" + new URL("ember-assets/texture-stone-VVv9Pl_s.webp", import.meta.url).href, Li = "" + new URL("ember-assets/texture-plaster-Cljz23wF.webp", import.meta.url).href, Ai = "" + new URL("ember-assets/texture-slate-BGr9mHj3.webp", import.meta.url).href, Ti = "" + new URL("ember-assets/texture-ground-DGpe7Gdj.webp", import.meta.url).href;
function ji(e, t) {
  const s = new Os(), a = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Map();
  let o = 0, d = !1;
  function r(c, l) {
    o++;
    const u = s.load(c, (h) => {
      if (d) {
        h.dispose();
        return;
      }
      o--, i.delete(c);
      for (const v of l) a.set(v, h);
      e(), t(i.size, o);
    }, void 0, () => {
      d || (o--, n.delete(u), u.dispose(), i.set(c, l), t(i.size, o));
    });
    u.colorSpace = Ka, u.wrapS = u.wrapT = Qs, u.anisotropy = 2, n.add(u);
  }
  for (const [c, l] of [
    [Ei, [
      k.stone,
      k.wetStone,
      k.marble,
      k.marbleLight
    ]],
    [Li, [k.light]],
    [Ai, [k.roof, k.roofLight]],
    [Ti, [
      k.grass,
      k.grassLight,
      k.grassDark
    ]]
  ]) r(c, l);
  return {
    maps: a,
    retry() {
      if (!d && o === 0) {
        for (const [c, l] of i) r(c, l);
        t(i.size, o);
      }
    },
    dispose() {
      d = !0, n.forEach((c) => c.dispose()), n.clear(), a.clear(), i.clear();
    }
  };
}
function Oi(e, t, s) {
  const a = new Wn({
    antialias: !0,
    alpha: !1,
    powerPreference: s.world ? "default" : "high-performance"
  });
  a.outputColorSpace = Ka, a.toneMapping = 7, a.toneMappingExposure = 1, a.setPixelRatio(Math.min(devicePixelRatio || 1, s.world ? 1.4 : 1.8)), a.shadowMap.enabled = !0, a.shadowMap.type = 2, e.append(a.domElement);
  const n = document.createElement("div");
  n.className = "exp-world-labels", n.setAttribute("aria-hidden", "true"), e.append(n);
  const i = new qn(), o = new Hn(-10, 10, 10, -10, 0.1, 180), d = qa();
  i.add(new Vn("#effbff", "#74918a", 2));
  const r = new Aa("#fff4e5", 1.9);
  r.position.set(-12, 25, 13), r.castShadow = !0;
  const c = s.world ? 1024 : 1536;
  r.shadow.mapSize.set(c, c), Object.assign(r.shadow.camera, {
    left: -23,
    right: 23,
    top: 24,
    bottom: -24,
    far: 80
  }), r.shadow.bias = -4e-4, r.shadow.normalBias = 0.035, r.shadow.radius = 3, i.add(r);
  const l = new Aa("#c3edff", 1.1);
  l.position.set(7, 8, -15), i.add(l);
  const u = new Ft(), h = new Ft(), v = new Ft();
  i.add(u, h, v);
  const p = vs(d, h, s.traveler.gender), g = mi(d, v), y = fi(d, v), w = vi(n), f = /* @__PURE__ */ new Map(), x = /* @__PURE__ */ new Map(), b = [], M = matchMedia("(prefers-reduced-motion: reduce)"), z = new St(), L = new St();
  let A = null, j = "", P = "", U = "", D = null, J = null, ie = NaN, F = NaN, Z = NaN, H = null, oe = 0, Te = 0, ge = 1, ce = 1, xe = !0, Oe = !1, Xe = !1, dt = 0, qe = -1, Pe = 0, We = !1;
  const He = s.world ? ji(() => {
    j = "", xe = !0, s.invalidate?.();
  }, (be, Ve) => s.artworkStatus?.(be, Ve)) : null;
  function re() {
    const be = e.getBoundingClientRect();
    ge = Math.max(1, be.width), ce = Math.max(1, be.height), a.setSize(ge, ce, !1), xe = !0, We = !1, s.invalidate?.();
  }
  const Ze = new ResizeObserver(re);
  Ze.observe(e), re();
  function Re(be) {
    be.preventDefault(), Xe = !0, t();
  }
  a.domElement.addEventListener("webglcontextlost", Re);
  function Ut(be, Ve, ut, Je, N = !1) {
    if (Math.abs(be) < 1) return;
    const E = document.createElement("span");
    E.className = N ? "exp-damage is-player" : be < 0 ? "exp-damage is-heal" : "exp-damage", E.textContent = `${be < 0 ? "+" : ""}${Math.ceil(Math.abs(be))}`, n.append(E), b.push({
      element: E,
      position: new St(Ve, 2, ut),
      born: Je
    });
  }
  function Qt() {
    for (const be of f.values())
      h.remove(be.actor.root), be.marker.remove();
    f.clear(), b.splice(0).forEach((be) => be.element.remove());
  }
  return {
    draw(be, Ve, ut, Je = "battle", N = 0, E) {
      if (Oe || Xe) return;
      const O = performance.now(), W = Je === "battle" ? be : null, Nt = W?.tick ?? (M.matches ? 0 : N * 0.025), ht = (W?.tick ?? -1) !== qe, ba = `${Ve.weapon}/${Ve.outfit}/${ut}`;
      if (!E && !xe && Je === P && ba === U && W === D && (!ht && W || !W && (Je === "between" || M.matches || N - dt < 40))) return;
      dt = N;
      const wa = ga[ut], on = E ? E.definition.id : `${ut}:${W?.boss ?? !1}:${!!W}`;
      if (on !== j) {
        if (x.forEach((Y) => Y.remove()), x.clear(), A?.(), E) {
          const Y = qa(He?.maps);
          J = Ii(Y, u, E.definition, E.facts);
          const Q = J;
          A = () => {
            Q.dispose(), Y.dispose();
          };
        } else
          J = null, A = li(d, u, ut, W);
        We = !1, j = on, i.background = new Qa(wa.sky), i.fog = new Zs(wa.haze, 42, 95);
      } else E && H !== E.facts && J?.setFacts(E.facts);
      (!!W != !!D || W && D && W.tick < qe) && (Qt(), Pe = W?.player.hp ?? 0);
      const xa = !E && Je !== "battle", bt = ge < 600, ln = bt || ce < 400, Ma = ge / ce, Kt = E ? bt ? at.mobileWidth : Math.max(at.minimumWidth, Ma * (ce < 400 ? at.shortSpan : at.tallSpan)) : xa ? bt ? 13 : 28 : bt ? 18.5 : Math.max(27, Ma * (ce < 400 ? 14 : 23)), cn = Math.max(0, V.arena - Kt / 2 + 0.5), ka = E ? E.location.position.x : W ? ln ? W.player.x * 0.62 : Math.max(-cn, Math.min(cn, W.player.x * 0.62)) : bt ? 0 : 5.5, _a = E ? E.location.position.y - at.lead : W ? W.player.y * (ln ? 0.62 : 0.2) - 0.4 : bt ? -4.2 : -11.8;
      E && Math.hypot(ie - E.location.position.x, F - E.location.position.y) > 8 && (We = !1);
      const _s = Math.abs(z.x - ka) + Math.abs(z.z - _a) < 0.015, Ss = E && J?.setPeople(E.people, N), Rs = E && J?.animate(E.location.position, N, M.matches);
      if (E && !xe && We && _s && ba === U && W === D && !ht && ie === E.location.position.x && F === E.location.position.y && Z === E.location.facing && H === E.facts && !Rs && !Ss) return;
      !We || M.matches ? (z.set(ka, 0, _a), We = !0) : (z.x += (ka - z.x) * 0.14, z.z += (_a - z.z) * 0.14), o.left = -Kt / 2, o.right = Kt / 2, o.top = Kt / Ma / 2, o.bottom = -o.top;
      const Sa = xa ? 0 : 1 * Math.PI / 4, dn = E ? at.distance : 25;
      o.position.set(z.x + Math.sin(Sa) * dn, E ? at.height : 28, z.z + Math.cos(Sa) * dn), o.lookAt(z.x, 0, z.z), o.updateProjectionMatrix(), o.updateMatrixWorld(), E && (J?.setEncounterActive(!!W), J?.update(E.location.position, Sa)), x.forEach((Y) => {
        Y.hidden = !0;
      });
      const Cs = new Set(E && !W ? [...an(E.definition, E.location.position, E.facts, E.people), ...va(E.definition.id, E.location.position, E.facts)].map((Y) => Y.target.id) : []);
      for (const Y of [...J?.people ?? [], ...J?.parleyPeople ?? []]) {
        if (W || !E || Math.hypot(Y.position.x - E.location.position.x, Y.position.y - E.location.position.y) > 10) continue;
        let Q = x.get(Y.id);
        Q || (Q = document.createElement("span"), Q.className = "exp-person-name", Q.textContent = it(Y.id), n.append(Q), x.set(Y.id, Q)), Q.textContent = Cs.has(Y.id) ? `${it(Y.id)} · ${ne.actions.talk}` : it(Y.id), L.set(Y.position.x, 2.9 + Y.root.position.y, Y.position.y).project(o);
        const $e = (L.x * 0.5 + 0.5) * ge, et = (-L.y * 0.5 + 0.5) * ce;
        Q.hidden = $e < 30 || $e > ge - 30 || et < 20 || et > ce - 20, Q.style.transform = `translate(${$e}px,${et}px) translate(-50%,-100%)`;
      }
      s.world && (r.position.set(z.x - 12, 25, z.z + 13), r.target.position.set(z.x, 0, z.z), r.target.updateMatrixWorld());
      const zs = E ? {
        ...E.location.position,
        facing: E.location.facing,
        dashTime: 0,
        swing: 0,
        shield: 0,
        guard: 0,
        resonance: 0
      } : null;
      p.update(W?.player ?? zs, Ve.weapon, Ve.outfit, Nt, M.matches, xa, !!W?.effects.some((Y) => Y.kind === "resonance"));
      for (const Y of W?.enemies ?? []) {
        let Q = f.get(Y.id);
        if (!Q) {
          const za = document.createElement("i");
          za.className = we(Y.kind) ? "exp-threat is-boss" : "exp-threat", n.append(za), Q = {
            actor: sn(d, h, Y.kind, wa),
            hp: Y.hp,
            death: null,
            marker: za
          }, f.set(Y.id, Q);
        }
        Q.hp > Y.hp && ht && Ut(Q.hp - Y.hp, Y.x, Y.y, W.tick), Q.hp = Y.hp, Q.actor.update(Y, W.tick, M.matches), Q.actor.bar.quaternion.copy(o.quaternion), L.set(Y.x, 1.2, Y.y).project(o);
        const $e = (L.x * 0.5 + 0.5) * ge, et = (-L.y * 0.5 + 0.5) * ce, hn = Math.min(18, ge / 2), fn = Math.min(bt ? 132 : 95, ce * 0.3), Ps = Math.max(fn, ce - Math.min(130, ce * 0.3)), Ra = Math.max(hn, Math.min(ge - hn, $e)), Ca = Math.max(fn, Math.min(Ps, et));
        Q.marker.hidden = Math.abs($e - Ra) + Math.abs(et - Ca) < 10, Q.marker.style.transform = `translate(${Ra}px,${Ca}px) rotate(${Math.atan2(et - Ca, $e - Ra) + Math.PI / 2}rad)`;
      }
      for (const [Y, Q] of f) {
        if (W?.enemies.some((et) => et.id === Y)) continue;
        Q.death === null && (Q.death = W?.tick ?? 0, W && Q.hp > 0 && Ut(Q.hp, Q.actor.root.position.x, Q.actor.root.position.z, W.tick));
        const $e = ((W?.tick ?? 0) - Q.death) / 12;
        Q.actor.bar.visible = !1, Q.marker.hidden = !0, Q.actor.root.scale.setScalar(Math.max(0, 1 - $e)), ($e >= 1 || !W || M.matches) && (h.remove(Q.actor.root), Q.marker.remove(), f.delete(Y));
      }
      W && ht && (Pe !== W.player.hp && Ut(Pe - W.player.hp, W.player.x, W.player.y, W.tick, Pe > W.player.hp), Pe = W.player.hp), g.update(W, M.matches);
      const un = W?.effects.filter((Y) => Y.kind === "ward-hit").at(-1);
      y.update(W?.player ?? null, un ? Math.max(0, (un.life - 5) / 10) : 0), w.update(W, o, ge, ce);
      for (let Y = b.length - 1; Y >= 0; Y--) {
        const Q = b[Y], $e = ((W?.tick ?? 0) - Q.born) / 27;
        if ($e >= 1 || !W) {
          Q.element.remove(), b.splice(Y, 1);
          continue;
        }
        L.copy(Q.position), L.y += M.matches ? 0 : $e * 0.9, L.project(o), Q.element.style.transform = `translate(${(L.x * 0.5 + 0.5) * ge}px,${(-L.y * 0.5 + 0.5) * ce}px)`, Q.element.style.opacity = String(Math.min(1, (1 - $e) * 3));
      }
      a.render(i, o), oe++, Te += performance.now() - O, xe = !1, P = Je, U = ba, D = W, qe = W?.tick ?? -1, E && (ie = E.location.position.x, F = E.location.position.y, Z = E.location.facing, H = E.facts);
    },
    invalidate() {
      xe = !0, s.invalidate?.();
    },
    retryArtwork() {
      He?.retry();
    },
    stats() {
      return {
        draws: oe,
        submitMs: Te,
        calls: a.info.render.calls,
        triangles: a.info.render.triangles,
        geometries: a.info.memory.geometries,
        textures: a.info.memory.textures
      };
    },
    dispose() {
      Oe = !0, Ze.disconnect(), a.domElement.removeEventListener("webglcontextlost", Re), Qt(), p.dispose(), w.dispose(), y.dispose(), A?.(), He?.dispose(), r.shadow.dispose(), d.dispose(), i.clear(), a.dispose(), a.forceContextLoss(), a.domElement.remove(), n.remove();
    }
  };
}
function Ha(e) {
  if (e.kind === "exit") return `${ne.actions.travel} ${ne.scenes[e.target.to]}`;
  const t = e.target;
  switch (t.kind) {
    case "person":
      return `${ne.actions.talk} · ${ne.people[t.person]}`;
    case "enemy":
      return `${ne.actions.talk} · ${it(t.enemy)}`;
    case "inspect":
      return ne.passages[t.passage].title;
    case "rest":
      return ne.actions.rest;
    case "switch":
      return ne.switches[t.fact];
  }
}
var Zi = ["aria-label"], Ui = { class: "journey-heading" }, Ni = {
  key: 0,
  class: "journey-artwork-issue",
  role: "status"
}, Di = ["disabled"], Fi = {
  key: 1,
  class: "journey-controls"
}, Bi = ["aria-label"], qi = {
  key: 0,
  class: "journey-interaction"
}, Wi = {
  key: 1,
  class: "journey-interaction journey-battle-actions"
}, Hi = {
  key: 0,
  class: "journey-resource"
}, Vi = [
  "max",
  "value",
  "aria-label"
], Gi = ["disabled"], Yi = ["disabled"], Qi = {
  key: 2,
  class: "journey-overlay"
}, Ki = /* @__PURE__ */ Ne({
  __name: "ExplorationField",
  props: {
    world: {},
    traveler: {},
    paused: { type: Boolean },
    weapon: {},
    outfit: {},
    battle: {}
  },
  emits: [
    "input",
    "interact",
    "pause",
    "resume",
    "error"
  ],
  setup(e, { expose: t, emit: s }) {
    const a = e, n = s, i = q(null), o = q(null), d = q({
      x: 0,
      y: 0
    }), r = q(null), c = q({
      failed: 0,
      pending: 0
    }), l = ae(() => a.battle ? [] : [
      ...va(a.world.definition.id, a.world.location.position, a.world.facts),
      ...Zr(a.world.definition, a.world.location, a.world.facts),
      ...an(a.world.definition, a.world.location.position, a.world.facts, a.world.people)
    ]), u = ae(() => l.value.find((Z) => Z.target.id === r.value) ?? null), h = ae(() => a.weapon === "grimoire" ? K.contractPower : K.resource);
    let v = null, p = null, g = 0, y = 0, w = 0, f = !1, x = !0;
    const b = oi((Z, H) => {
      d.value = {
        x: Z * 26,
        y: H * 26
      }, p?.stick(Z, H);
    }, () => i.value?.focus({ preventScroll: !0 }));
    function M() {
      b.clear(), p?.clear(), w = 0;
    }
    function z() {
      M(), n("pause");
    }
    function L() {
      v?.retryArtwork();
    }
    function A() {
      document.hidden ? (cancelAnimationFrame(g), g = 0, z()) : (v?.invalidate(), j());
    }
    function j() {
      !g && !f && x && (y = 0, g = requestAnimationFrame(F));
    }
    function P() {
      !a.paused && u.value && (M(), n("interact", u.value.target.id));
    }
    function U(Z) {
      (!Z || Z.detail === 0) && p?.dash();
    }
    function D(Z) {
      (!Z || Z.detail === 0) && p?.skill();
    }
    function J(Z, H) {
      Z.button === 0 && p?.[H]();
    }
    function ie() {
      const Z = l.value.findIndex((H) => H.target.id === r.value);
      r.value = l.value[(Z + 1) % l.value.length]?.target.id ?? null;
    }
    function F(Z) {
      if (g = 0, f || !x) return;
      !a.paused && !document.hidden && (g = requestAnimationFrame(F));
      const H = y ? Math.min(100, Z - y) : 0;
      if (y = Z, !a.paused && !document.hidden)
        for (w += H; w >= 1e3 / V.hz && !a.paused; ) {
          w -= 1e3 / V.hz;
          const oe = p.frame();
          if (oe.skill && !a.battle) {
            P();
            break;
          }
          n("input", oe);
        }
      else w = 0;
      if (!document.hidden) try {
        v?.draw(a.battle ?? null, a, 0, "battle", Z, a.world);
      } catch (oe) {
        cancelAnimationFrame(g), g = 0, M(), n("error", oe);
      }
    }
    return me(l, (Z) => {
      Z.some((H) => H.target.id === r.value) || (r.value = Z[0]?.target.id ?? null);
    }, { immediate: !0 }), me(() => a.world.definition.id, () => {
      M(), r.value = l.value[0]?.target.id ?? null, i.value?.focus({ preventScroll: !0 });
    }), me(() => a.paused, (Z) => {
      M(), j(), Z || i.value?.focus({ preventScroll: !0 });
    }), me(() => [
      a.world.definition,
      a.world.facts,
      a.world.location.position.x,
      a.world.location.position.y,
      a.weapon,
      a.outfit
    ], j), It(() => {
      try {
        v = Oi(o.value, () => {
          z(), n("error", /* @__PURE__ */ new Error("expedition_webgl_context_lost"));
        }, {
          traveler: a.traveler,
          world: !0,
          invalidate: j,
          artworkStatus: (Z, H) => {
            c.value = {
              failed: Z,
              pending: H
            };
          }
        });
      } catch (Z) {
        n("error", Z);
        return;
      }
      p = ii(i.value, z, () => {
      }), document.addEventListener("visibilitychange", A), j(), i.value?.focus({ preventScroll: !0 });
    }), Ga(() => {
      x = !1, cancelAnimationFrame(g), g = 0, z();
    }), Nn(() => {
      x = !0, j();
    }), vt(() => {
      f = !0, cancelAnimationFrame(g), M(), p?.dispose(), document.removeEventListener("visibilitychange", A), v?.dispose();
    }), t({
      stats: () => v?.stats(),
      focus: () => i.value?.focus({ preventScroll: !0 })
    }), (Z, H) => ($(), I("section", {
      ref_key: "root",
      ref: i,
      class: "journey-field",
      tabindex: "0",
      "aria-label": e.battle ? m(K).controls : m(ne).actions.controls
    }, [
      _("div", {
        ref_key: "canvas",
        ref: o,
        class: "journey-canvas"
      }, null, 512),
      _("header", Ui, [_("h1", null, R(m(ne).scenes[e.world.definition.id]), 1), vn(Z.$slots, "status", {}, void 0, !0)]),
      c.value.failed ? ($(), I("div", Ni, [_("span", null, R(m(ne).artwork.unavailable), 1), _("button", {
        type: "button",
        disabled: c.value.pending > 0,
        onClick: L
      }, R(c.value.pending ? m(ne).artwork.loading : m(ne).artwork.retry), 9, Di)])) : G("", !0),
      e.paused ? G("", !0) : ($(), I("div", Fi, [
        _("div", {
          class: "journey-stick",
          role: "group",
          "aria-label": m(ne).actions.move,
          onPointerdown: H[0] || (H[0] = nt((...oe) => m(b).down && m(b).down(...oe), ["prevent"])),
          onPointermove: H[1] || (H[1] = nt((...oe) => m(b).move && m(b).move(...oe), ["prevent"])),
          onPointerup: H[2] || (H[2] = (...oe) => m(b).release && m(b).release(...oe)),
          onPointercancel: H[3] || (H[3] = (...oe) => m(b).release && m(b).release(...oe)),
          onLostpointercapture: H[4] || (H[4] = (...oe) => m(b).release && m(b).release(...oe)),
          onContextmenu: H[5] || (H[5] = nt(() => {
          }, ["prevent"]))
        }, [_("span", { style: Vt({ transform: `translate(${d.value.x}px, ${d.value.y}px)` }) }, null, 4)], 40, Bi),
        u.value ? ($(), I("div", qi, [_("button", {
          type: "button",
          class: "journey-act",
          onClick: P
        }, [H[9] || (H[9] = _("kbd", null, "E", -1)), Ue(R(m(Ha)(u.value)), 1)]), l.value.length > 1 ? ($(), I("button", {
          key: 0,
          type: "button",
          class: "journey-switch",
          onClick: ie
        }, R(m(ne).actions.next), 1)) : G("", !0)])) : G("", !0),
        e.battle ? ($(), I("div", Wi, [
          [
            "blade",
            "staff",
            "grimoire"
          ].includes(e.weapon) ? ($(), I("div", Hi, [
            _("span", null, R(e.battle.player.resonance > 0 ? m(K).resonanceActive : h.value), 1),
            _("meter", {
              min: "0",
              max: m(Ke).maxPower,
              value: e.battle.player.resource,
              "aria-label": h.value
            }, null, 8, Vi),
            _("small", null, R(e.battle.player.resonance > 0 ? m(K).secondsLeft(e.battle.player.resonance) : Math.floor(e.battle.player.resource)), 1)
          ])) : G("", !0),
          _("button", {
            class: "journey-act",
            type: "button",
            disabled: e.battle.player.dash > 0,
            onPointerdown: H[6] || (H[6] = nt((oe) => J(oe, "dash"), ["prevent"])),
            onClick: U
          }, [
            _("kbd", null, R(m(K).dashKey), 1),
            Ue(R(m(K).dash), 1),
            _("small", null, R(e.battle.player.dash > 0 ? m(K).secondsLeft(e.battle.player.dash) : m(K).ready), 1)
          ], 40, Gi),
          _("button", {
            class: "journey-act",
            type: "button",
            disabled: e.battle.player.skill > 0,
            onPointerdown: H[7] || (H[7] = nt((oe) => J(oe, "skill"), ["prevent"])),
            onClick: D
          }, [
            _("kbd", null, R(m(K).skillKey), 1),
            Ue(R(m(ft)[e.weapon].action), 1),
            _("small", null, R(e.battle.player.skill > 0 ? m(K).secondsLeft(e.battle.player.skill) : m(K).ready), 1)
          ], 40, Yi)
        ])) : G("", !0)
      ])),
      e.paused ? ($(), I("div", Qi, [vn(Z.$slots, "overlay", {}, () => [_("button", {
        class: "journey-act",
        type: "button",
        onClick: H[8] || (H[8] = (oe) => n("resume"))
      }, R(m(ne).actions.resume), 1)], !0)])) : G("", !0)
    ], 8, Zi));
  }
}), Xi = /* @__PURE__ */ ct(Ki, [["__scopeId", "data-v-2f3c7684"]]);
function Ji(e) {
  const t = new Set(e.location.visited), s = new Set(e.facts), a = /* @__PURE__ */ new Map();
  for (const n of e.location.visited) for (const i of ha(_e[n], s)) {
    if (i.kind !== "exit") continue;
    const o = i.target.to, d = [n, o].sort().join("/");
    t.add(o), a.set(d, {
      id: d,
      from: n,
      to: o
    });
  }
  return {
    scenes: [...t],
    links: [...a.values()]
  };
}
function eo(e, t) {
  const a = [], n = (i) => ({
    x: Math.max(t.x - t.width / 2 + 3, Math.min(t.x + t.width / 2 - 3, i.x)),
    y: Math.max(t.z - t.depth / 2 + 3, Math.min(t.z + t.depth / 2 - 3, i.y))
  });
  for (const i of e) {
    let o = n(i), d = -1;
    for (let r = 0; r <= 48; r++) {
      const c = Math.ceil(r / 8) * 5.2, l = r * Math.PI / 4, u = n({
        x: i.x + Math.cos(l) * c,
        y: i.y + Math.sin(l) * c
      }), h = Math.min(1 / 0, ...a.map((v) => Math.hypot(v.x - u.x, v.y - u.y)));
      if (h > d && (o = u, d = h), h >= 5.2) break;
    }
    a.push(o);
  }
  return a;
}
var to = "" + new URL("ember-assets/city-title-PvPTt7VM.webp", import.meta.url).href, ao = "" + new URL("ember-assets/city-title-mobile-DjRh8y0I.webp", import.meta.url).href, no = "" + new URL("ember-assets/chapter-outpost-eNUTzzZ8.webp", import.meta.url).href, so = "" + new URL("ember-assets/weapon-blade-cX_cx3lv.webp", import.meta.url).href, ro = "" + new URL("ember-assets/weapon-bow-dl92j0XJ.webp", import.meta.url).href, io = "" + new URL("ember-assets/weapon-staff-BlMY2GK0.webp", import.meta.url).href, oo = "" + new URL("ember-assets/weapon-daggers-BP7rLrAU.webp", import.meta.url).href, lo = "" + new URL("ember-assets/weapon-grimoire-CrYKQ0FK.webp", import.meta.url).href, co = "" + new URL("ember-assets/weapon-cannon-9qcVnfRp.webp", import.meta.url).href, uo = "" + new URL("ember-assets/scene-camp-BGT9GK8h.webp", import.meta.url).href, ho = "" + new URL("ember-assets/scene-crossroads-DameO7fS.webp", import.meta.url).href, fo = "" + new URL("ember-assets/scene-gate-MnD2gO90.webp", import.meta.url).href, po = "" + new URL("ember-assets/scene-beacon-CzhjDyj7.webp", import.meta.url).href, mo = "" + new URL("ember-assets/scene-waterway-CTX5alhT.webp", import.meta.url).href, vo = "" + new URL("ember-assets/scene-cells-DA9NefcD.webp", import.meta.url).href, go = "" + new URL("ember-assets/scene-hall-D9VKJOHX.webp", import.meta.url).href, yo = "" + new URL("ember-assets/scene-roots-3TArgp-z.webp", import.meta.url).href, bo = "" + new URL("ember-assets/cg-arrival-CkFm1ndl.webp", import.meta.url).href, wo = "" + new URL("ember-assets/cg-ending-FbNUmL5I.webp", import.meta.url).href, Va = {
  city: to,
  cityMobile: ao,
  chapter: no
}, xo = {
  blade: so,
  bow: ro,
  staff: io,
  daggers: oo,
  grimoire: lo,
  cannon: co
}, xs = {
  camp: uo,
  crossroads: ho,
  gate: fo,
  beacon: po,
  waterway: mo,
  cells: vo,
  hall: go,
  roots: yo
}, jn = {
  arrival: bo,
  ending: wo
}, Mo = { class: "ember-map-header" }, ko = ["src"], _o = ["aria-pressed"], So = ["viewBox", "aria-label"], Ro = [
  "x1",
  "y1",
  "x2",
  "y2",
  "stroke-dasharray"
], Co = ["transform"], zo = ["fill"], Po = {
  y: "22",
  "text-anchor": "middle"
}, $o = ["viewBox", "aria-label"], Io = [
  "x",
  "y",
  "width",
  "height"
], Eo = ["points", "stroke-width"], Lo = [
  "x",
  "y",
  "width",
  "height",
  "fill"
], Ao = ["cx", "cy"], To = [
  "x1",
  "y1",
  "x2",
  "y2"
], jo = [
  "cx",
  "cy",
  "fill"
], Oo = ["x", "y"], Zo = {
  key: 2,
  class: "ember-map-key"
}, Uo = {
  key: 3,
  class: "ember-map-places"
}, No = /* @__PURE__ */ Ne({
  __name: "CampaignMap",
  props: { campaign: {} },
  emits: ["close"],
  setup(e, { emit: t }) {
    const s = e, a = t, n = q(!1), i = q(null), o = q(!1), d = q(null), r = q({
      width: 400,
      height: 400
    }), c = new ResizeObserver((x) => {
      for (const b of x) {
        const { width: M, height: z } = b.contentRect;
        b.target === i.value ? o.value = M > z * 1.55 : r.value = {
          width: M,
          height: z
        };
      }
    });
    me(d, (x, b) => {
      b && c.unobserve(b), x && c.observe(x);
    }), It(() => {
      c.observe(i.value);
    }), vt(() => c.disconnect());
    const l = {
      camp: [52, 89],
      crossroads: [52, 66],
      gate: [25, 44],
      beacon: [25, 22],
      hall: [52, 10],
      cells: [79, 32],
      waterway: [79, 54],
      roots: [16, 70]
    }, u = ae(() => Ji(s.campaign)), h = ae(() => Object.fromEntries(u.value.scenes.map((x) => {
      const [b, M] = l[x], { width: z, height: L } = r.value;
      return [x, o.value ? [50 + (104 - M) / 104 * (z - 100), 10 + (b - 10) / 80 * (L - 40)] : [45 + b / 104 * (z - 90), 10 + M / 104 * (L - 40)]];
    }))), v = ae(() => u.value.links), p = ae(() => _e[s.campaign.location.scene]), g = ae(() => p.value.landscape.bounds), y = ae(() => `${g.value.x - g.value.width / 2 - 5} ${g.value.z - g.value.depth / 2 - 5} ${g.value.width + 10} ${g.value.depth + 10}`), w = ae(() => us(s.campaign)), f = ae(() => {
      const x = eo(w.value.map((b) => b.position), g.value);
      return w.value.map((b, M) => ({
        ...b,
        marker: x[M]
      }));
    });
    return (x, b) => ($(), I("div", {
      ref_key: "root",
      ref: i,
      class: zt(["ember-map", {
        "ember-map-wide": o.value,
        "ember-map-local": !n.value
      }])
    }, [
      _("div", Mo, [
        _("img", {
          src: m(xs)[p.value.id],
          alt: "",
          decoding: "async"
        }, null, 8, ko),
        _("h2", null, R(n.value ? m(T).chapterMap : m(ne).scenes[p.value.id]), 1),
        _("div", null, [_("button", {
          type: "button",
          "aria-pressed": n.value,
          onClick: b[0] || (b[0] = (M) => n.value = !n.value)
        }, R(n.value ? m(T).localMap : m(T).chapterMap), 9, _o), _("button", {
          type: "button",
          onClick: b[1] || (b[1] = (M) => a("close"))
        }, R(m(T).close), 1)])
      ]),
      n.value ? ($(), I("svg", {
        key: 0,
        ref_key: "routeMap",
        ref: d,
        viewBox: `0 0 ${r.value.width} ${r.value.height}`,
        role: "img",
        "aria-label": m(T).chapterMap,
        class: "ember-route-map"
      }, [($(!0), I(se, null, Ee(v.value, (M) => ($(), I("line", {
        key: M.id,
        x1: h.value[M.from][0],
        y1: h.value[M.from][1],
        x2: h.value[M.to][0],
        y2: h.value[M.to][1],
        stroke: "#9ab5ae",
        "stroke-width": "1.5",
        "stroke-dasharray": e.campaign.location.visited.includes(M.from) && e.campaign.location.visited.includes(M.to) ? void 0 : "4 4"
      }, null, 8, Ro))), 128)), ($(!0), I(se, null, Ee(h.value, (M, z) => ($(), I("g", {
        key: z,
        transform: `translate(${M.join(",")})`
      }, [
        _("circle", {
          r: "6",
          fill: z === p.value.id ? "#bf6242" : e.campaign.location.visited.includes(z) ? "#366678" : "#b6c9c2",
          stroke: "#fffcef",
          "stroke-width": "1.5"
        }, null, 8, zo),
        _("text", Po, R(e.campaign.location.visited.includes(z) ? m(ne).scenes[z] : m(T).unknownArea), 1),
        _("title", null, R(e.campaign.location.visited.includes(z) ? m(ne).scenes[z] : m(T).unknownArea), 1)
      ], 8, Co))), 128))], 8, So)) : ($(), I("svg", {
        key: 1,
        viewBox: y.value,
        role: "img",
        "aria-label": m(ne).scenes[p.value.id]
      }, [
        _("rect", {
          x: g.value.x - g.value.width / 2,
          y: g.value.z - g.value.depth / 2,
          width: g.value.width,
          height: g.value.depth,
          rx: "2",
          fill: "#d4e5d9"
        }, null, 8, Io),
        ($(!0), I(se, null, Ee(p.value.landscape.roads, (M, z) => ($(), I("polyline", {
          key: z,
          points: M.points.map((L) => L.join(",")).join(" "),
          fill: "none",
          stroke: "#f8f1d9",
          "stroke-width": M.width,
          "stroke-linejoin": "round"
        }, null, 8, Eo))), 128)),
        ($(!0), I(se, null, Ee(p.value.landscape.features, (M) => ($(), I("rect", {
          key: M.id,
          x: M.footprint.x - M.footprint.width / 2,
          y: M.footprint.z - M.footprint.depth / 2,
          width: M.footprint.width,
          height: M.footprint.depth,
          fill: M.kind === "water" ? "#6eb8c6" : M.kind === "tree" || M.kind === "thicket" ? "#80a28a" : "#8a9e9f",
          rx: ".5"
        }, null, 8, Lo))), 128)),
        _("circle", {
          cx: e.campaign.location.position.x,
          cy: e.campaign.location.position.y,
          r: "3.2",
          fill: "none",
          stroke: "#c84f3c",
          "stroke-width": "1"
        }, [_("title", null, R(m(T).here), 1)], 8, Ao),
        ($(!0), I(se, null, Ee(f.value, (M, z) => ($(), I("g", { key: M.target.id }, [
          _("line", {
            x1: M.position.x,
            y1: M.position.y,
            x2: M.marker.x,
            y2: M.marker.y,
            stroke: "#a3642a",
            "stroke-width": ".5"
          }, null, 8, To),
          _("circle", {
            cx: M.marker.x,
            cy: M.marker.y,
            r: "2.4",
            fill: M.kind === "exit" ? "#356987" : "#a3642a"
          }, null, 8, jo),
          _("text", {
            class: "ember-map-number",
            x: M.marker.x,
            y: M.marker.y + 1.1,
            "text-anchor": "middle"
          }, R(z + 1), 9, Oo),
          _("title", null, R(m(Ha)(M)), 1)
        ]))), 128))
      ], 8, $o)),
      n.value ? ($(), I("p", Zo, R(m(T).mapKey), 1)) : ($(), I("ol", Uo, [($(!0), I(se, null, Ee(w.value, (M) => ($(), I("li", { key: M.target.id }, R(m(Ha)(M)), 1))), 128))]))
    ], 2));
  }
}), Do = /* @__PURE__ */ ct(No, [["__scopeId", "data-v-3622629e"]]), On = {
  map: {
    body: "M8 15 24 9 40 15 56 9 56 49 40 55 24 49 8 55Z",
    detail: "M24 9V49 M40 15V55 M14 38 20 31 30 36 47 23 M44 19 50 25 M50 19 44 25"
  },
  blade: {
    body: "M31 5 38 15 26 39 20 35Z M18 32 30 39 27 44 15 37Z M19 41 24 44 17 57 12 54Z",
    detail: "M31 12 23 35 M15 54 20 45"
  },
  bow: {
    body: "M19 7Q51 28 21 57L25 48Q40 31 24 16Z M30 31 50 27 45 34Z",
    detail: "M19 7 28 32 21 57 M13 37 48 29 M13 37 15 30 M13 37 20 39"
  },
  staff: {
    body: "M29 28 35 29 31 58 26 57Z M32 6 42 17 32 30 22 17Z",
    detail: "M32 6 32 30 M22 17 42 17 M19 9 15 13 M45 22 48 18 M23 46 35 47"
  },
  daggers: {
    body: "M10 7 28 25 23 36 16 29Z M54 7 36 25 41 36 48 29Z M22 39 29 33 35 52 29 55Z M42 39 35 33 29 52 35 55Z",
    detail: "M12 34 31 29 M52 34 33 29"
  },
  grimoire: {
    body: "M9 15Q22 9 32 17 43 9 55 15L52 51Q40 45 32 53 22 45 12 51Z",
    detail: "M32 17 32 53 M16 23 26 26 M38 26 48 23 M17 33 25 35 M39 35 47 33"
  },
  cannon: {
    body: "M15 23 51 16 55 32 21 40Z M23 42 42 42 48 54 14 54Z",
    detail: "M46 17 50 33 M23 24 27 37 M32 42 32 52 M11 15 6 10 M13 23 5 23"
  },
  wardrobe: {
    body: "M21 12 28 9 36 9 43 12 54 23 45 31 42 26 42 54 22 54 22 26 19 31 10 23Z",
    detail: "M28 9Q32 25 36 9 M27 46 37 46"
  },
  "storm-step": {
    body: "M23 10 40 13 34 37 46 43 44 52 17 52 15 44 23 35Z",
    detail: "M30 15 25 28 35 25 27 40 M19 45 43 45 M17 56 45 56"
  },
  conductor: {
    body: "M30 7 36 18 31 47 27 53 24 46Z M17 22 44 26 42 32 16 28Z",
    detail: "M12 12 8 20 17 18 11 28 M48 35 54 31 49 42 56 41 M20 56 35 56"
  },
  momentum: {
    body: "M32 12 41 17 45 27 42 40 31 48 21 42 17 30 21 19Z M31 22 36 29 32 37 27 30Z",
    detail: "M9 31A23 23 0 0 1 43 10 M43 5 44 11 38 13 M55 30A23 23 0 0 1 20 53 M20 59 18 53 25 51"
  },
  cinder: {
    body: "M32 7C38 23 49 27 46 42 44 52 20 57 17 42 14 33 21 24 25 21 23 33 29 35 32 7Z",
    detail: "M32 34Q44 47 32 52 24 49 32 34 M12 20 15 17 M48 16 51 21"
  },
  wildfire: {
    body: "M24 8 41 8 39 16 39 24Q53 37 44 50 32 58 21 50 11 39 26 24L26 16Z",
    detail: "M24 16 40 16 M20 35Q32 30 45 35 M31 34Q24 47 33 49 43 46 35 39 M30 5 37 5"
  },
  "blood-price": {
    body: "M32 7C36 21 49 28 46 40 42 58 19 56 17 41 15 30 28 19 32 7Z",
    detail: "M28 27 22 39 28 46 M34 34 42 26 M36 47 47 50 M14 14 19 19"
  },
  frost: {
    body: "M32 12C21 12 21 24 20 33L15 43Q32 51 49 43L44 33C43 24 43 12 32 12Z M28 48 36 48 35 54 29 54Z",
    detail: "M29 6 35 6 35 12 M18 39 46 39 M32 20 32 34 M26 24 38 30 M38 24 26 30"
  },
  shatter: {
    body: "M29 8 39 23 34 43 24 47 20 27Z M43 35 52 37 42 52 37 48Z M12 14 17 18 14 25 8 21Z",
    detail: "M29 8 29 30 24 47 M20 27 39 23 M15 48 20 53 M30 54 30 59"
  },
  echo: {
    body: "M27 17 39 23 39 42 27 48 17 41 17 24Z M27 25 32 28 32 38 27 41 23 37 23 28Z",
    detail: "M41 15Q58 32 41 50 M47 7Q69 32 47 57 M9 30 5 34"
  },
  hunter: {
    body: "M26 9 41 16 42 33 32 45 17 38 13 22Z M28 17 35 21 36 31 30 36 22 33 20 24Z M28 44 35 44 34 57 26 57Z",
    detail: "M28 21 28 32 M23 27 34 27 M7 10 12 15 M45 44 50 49"
  },
  piercing: {
    body: "M48 7Q23 7 17 36L13 52 28 45Q48 29 48 7Z",
    detail: "M9 57 40 17 M21 43 21 29 M28 35 29 20 M33 30 43 28 M38 23 46 19"
  },
  orbit: {
    body: "M32 20 42 26 41 37 31 44 22 38 21 27Z M49 10 54 13 53 18 48 20 45 15Z",
    detail: "M21 11C-4 19 13 52 44 50 64 48 54 26 45 21 M19 41C5 45 2 36 15 24 26 14 43 11 49 13"
  },
  thorns: {
    body: "M32 12A20 20 0 1 1 31.9 12M32 19A13 13 0 1 0 32.1 19Z",
    detail: "M19 16 15 5 27 12 M43 17 54 14 48 27 M46 43 52 54 38 51 M16 44 5 46 12 34"
  },
  aegis: {
    body: "M32 7 50 15 46 39 32 55 18 39 14 15Z M32 15 42 20 39 36 32 45 25 36 22 20Z",
    detail: "M32 15 32 45 M22 20 39 36 M42 20 25 36"
  },
  siphon: {
    body: "M32 12 48 23 44 44 29 54 15 39 18 21Z",
    detail: "M18 21 29 31 48 23 M29 31 29 54 M18 34 25 34 29 25 34 41 38 33 45 33"
  },
  focus: {
    body: "M32 7 49 24 42 45 32 55 20 44 15 24Z",
    detail: "M32 7 32 55 M15 24 49 24 M15 24 32 40 49 24 M22 12 17 7 M49 49 54 54"
  },
  renewal: {
    body: "M21 19 43 19 47 46 39 53 24 53 17 46Z M26 6 38 6 41 16 23 16Z",
    detail: "M24 23 23 44 40 44 39 23 M32 27 36 35 32 40 28 35Z M17 47 46 47"
  },
  execution: {
    body: "M45 7 48 19 34 38 27 31Z M22 31 37 43 32 48 17 35Z M21 41 28 47 18 57 12 51Z",
    detail: "M42 16 30 33 M36 25 41 27 M10 15 17 20 M10 27 15 26"
  },
  "last-stand": {
    body: "M32 6 48 17 44 42 32 56 20 42 16 17Z",
    detail: "M32 19Q43 35 34 44 22 39 28 30L32 35Z M9 42 15 45 M49 45 55 42"
  },
  quicksilver: {
    body: "M29 8 43 13 38 29 45 38 39 53 19 51 15 40 26 31Z",
    detail: "M7 23 19 23 M5 31 16 31 M30 14 27 24 M21 45 38 46"
  },
  magnet: {
    body: "M13 13 24 13 24 35Q32 46 40 35L40 13 51 13 51 36Q32 66 13 36Z",
    detail: "M13 24 24 24 M40 24 51 24 M32 7 32 19 M7 46 4 51 M57 46 60 51"
  },
  wardstone: {
    body: "M32 10 47 22 43 45 32 54 21 45 17 22Z",
    detail: "M24 26 40 26 38 38 32 44 26 38Z M9 19 13 15 M51 15 55 19"
  },
  pilgrim: {
    body: "M28 9 35 9 35 41 43 46 42 52 21 52 20 46 28 41Z",
    detail: "M28 20 35 20 M10 50Q4 24 20 15 M14 13 21 14 19 21 M47 18 53 26 47 34"
  },
  gambit: {
    body: "M20 10 45 10 51 46 26 55 13 29Z",
    detail: "M32 18 41 31 33 42 24 30Z M21 16 22 19 M43 42 44 46"
  },
  riposte: {
    body: "M32 9 48 17 43 41 32 52 21 41 16 17Z",
    detail: "M23 31 41 31 M34 23 42 31 34 39 M10 16 6 23 M54 40 58 34"
  },
  "shield-break": {
    body: "M30 8 17 16 21 41 28 51 31 36 26 28 33 20Z M37 10 49 17 44 41 35 52 36 36 31 28 38 20Z",
    detail: "M9 34 15 31 M50 31 57 34"
  },
  "cleave-wave": {
    body: "M43 8 47 18 28 37 22 31Z M17 31 34 44 29 48 13 36Z M17 42 24 47 16 56 10 51Z",
    detail: "M43 28Q58 36 49 50 M48 23Q66 35 56 53"
  },
  duelist: {
    body: "M14 10 32 31 27 36 11 21Z M50 10 53 21 30 48 24 43Z",
    detail: "M11 41 27 54 M37 41 53 54 M32 6 32 16"
  },
  "blood-dance": {
    body: "M46 8 49 18 29 39 23 33Z M16 34 33 47 29 51 12 38Z M22 45 28 50 20 58 14 53Z",
    detail: "M17 9Q7 22 17 26 27 22 17 9 M37 42Q49 43 49 54"
  },
  valor: {
    body: "M32 7 39 20 54 23 43 35 44 50 32 44 20 50 21 35 10 23 25 20Z",
    detail: "M32 20 39 29 32 37 25 29Z"
  },
  ricochet: {
    body: "M44 7 54 11 49 22 46 16 26 36 22 32 42 12Z",
    detail: "M10 55 24 39 18 27 9 23 M38 34 47 43 53 40 M50 34 54 40 49 46"
  },
  "split-arrow": {
    body: "M32 6 40 18 35 18 35 53 29 53 29 18 24 18Z",
    detail: "M32 39 13 20 M9 27 12 18 21 18 M32 39 51 20 M43 18 52 18 55 27"
  },
  pinning: {
    body: "M32 7 40 21 35 21 35 45 29 45 29 21 24 21Z",
    detail: "M14 35 50 35 M17 41 47 41 M16 52Q32 43 48 52 M32 45 32 57"
  },
  "distance-draw": {
    body: "M17 8Q53 31 17 56L23 44Q39 31 23 20Z",
    detail: "M17 8 30 31 17 56 M8 32 55 32 M48 25 56 32 48 39"
  },
  "hunter-mark": {
    body: "M32 19 44 31 32 43 20 31Z",
    detail: "M32 6 32 16 M32 46 32 57 M7 31 17 31 M47 31 57 31 M18 13A23 23 0 0 1 47 16 M46 49A23 23 0 0 1 16 47"
  },
  trapper: {
    body: "M12 21 52 21 48 48 16 48Z",
    detail: "M18 21 21 48 M27 21 29 48 M37 21 35 48 M46 21 43 48 M14 31 50 31 M15 40 49 40 M32 8 32 17 M25 12 39 12"
  },
  nova: {
    body: "M32 7 38 22 53 17 45 31 56 42 40 42 32 57 25 42 9 42 20 31 12 17 26 22Z",
    detail: "M32 22 39 32 32 42 25 32Z"
  },
  inferno: {
    body: "M17 10 42 10 49 17 47 52 17 52Z",
    detail: "M32 21Q46 39 35 46 24 45 25 33L31 36Z M42 10 42 18 49 18"
  },
  fracture: {
    body: "M16 15 27 22 32 9 39 22 50 15 45 45 19 45Z",
    detail: "M21 51 43 51 M29 23 26 33 34 35 30 45 M8 37 13 35 M51 35 57 37"
  },
  overload: {
    body: "M32 7 49 26 40 49 23 49 14 26Z",
    detail: "M32 7 32 20 24 31 38 28 30 43 32 55 M14 26 24 31 M38 28 49 26"
  },
  orbitals: {
    body: "M32 23 42 32 32 42 22 32Z M9 28 16 33 12 40 5 35Z M45 10 53 14 50 22 42 18Z",
    detail: "M20 14Q45 4 54 33 52 54 27 54 11 50 10 42 M17 24Q33 13 45 36"
  },
  convergence: {
    body: "M32 20 43 32 32 44 21 32Z",
    detail: "M6 7 23 23 M15 22 24 24 22 15 M58 7 41 23 M42 15 40 24 49 22 M32 58 32 46 M26 50 32 44 38 50"
  },
  backstab: {
    body: "M46 7 49 18 28 38 22 32Z M17 34 32 45 27 49 12 38Z M21 46 27 50 18 58 12 53Z",
    detail: "M11 12 24 12 24 25 M36 38Q50 35 53 46 M48 41 54 47 58 40"
  },
  shadowstep: {
    body: "M18 10 28 16 25 35 35 44 32 53 11 53 8 44 17 33Z",
    detail: "M36 12 45 18 42 34 53 44 50 52 40 52 M34 26 40 26 M36 32 39 32"
  },
  hemorrhage: {
    body: "M32 7 48 29 43 48 21 48 16 29Z",
    detail: "M19 30 27 30 31 21 36 39 40 30 46 30 M24 53 40 53"
  },
  "execution-chain": {
    body: "M15 12 26 10 34 18 26 29 15 30 7 22Z M38 35 49 33 57 41 49 52 38 53 30 45Z",
    detail: "M21 21 44 44 M43 8 52 17 M43 17 52 8"
  },
  smoke: {
    body: "M25 28 39 28 45 44 40 54 23 54 18 44Z",
    detail: "M25 35 39 35 M29 24Q14 23 18 14 24 8 30 17 M35 24Q49 22 46 13 39 6 35 15 M31 5 31 11"
  },
  venom: {
    body: "M44 7 50 13 25 43 18 38Z M17 39 24 44 15 58 11 55Z",
    detail: "M35 11 47 21 M20 31 31 41 M49 31Q39 46 49 49 59 46 49 31"
  },
  "pack-bond": {
    body: "M32 21 43 32 39 47 25 47 21 32Z M13 14 20 21 15 28 7 23Z M51 14 57 23 49 28 44 21Z",
    detail: "M18 41 12 36 6 41 M46 41 52 36 58 41 M32 10 32 17"
  },
  martyr: {
    body: "M32 12Q21 12 20 27L15 41 49 41 44 27Q43 12 32 12Z",
    detail: "M27 47 37 47 32 54Z M32 21 32 35 M25 28 39 28 M29 6 35 6"
  },
  covenant: {
    body: "M19 12 30 16 28 28 17 32 10 23Z M45 12 54 23 47 32 36 28 34 16Z M24 37 40 37 44 49 32 56 20 49Z",
    detail: "M20 23 32 33 44 23 M32 33 32 47"
  },
  frenzy: {
    body: "M15 8 26 17 22 44 15 55 12 32Z M33 7 42 17 35 48 29 57 29 31Z M50 13 56 23 47 47 39 54 45 30Z",
    detail: "M13 23 23 26 M30 21 39 24 M46 27 53 30"
  },
  "soul-harvest": {
    body: "M20 24 44 24 48 50 16 50Z M27 9 37 9 42 20 22 20Z",
    detail: "M32 29Q41 39 32 45 23 39 32 29 M10 7 9 15 16 20 M53 7 55 15 48 20 M17 55 47 55"
  },
  command: {
    body: "M18 8 45 8 45 56 32 48 18 56Z",
    detail: "M32 16 27 29 38 26 28 42 M22 12 40 12"
  },
  shrapnel: {
    body: "M21 24 36 17 47 38 32 48Z",
    detail: "M25 29 40 23 M14 12 21 18 M41 7 39 15 M54 21 47 24 M52 49 46 44 M21 50 17 56 M9 35 18 34"
  },
  minefield: {
    body: "M20 22 44 22 51 40 44 51 20 51 13 40Z",
    detail: "M32 10 32 22 M25 10 39 10 M13 40 51 40 M25 30 39 30 M25 45 39 45"
  },
  overclock: {
    body: "M27 8 37 8 39 16 48 19 54 27 49 35 48 45 39 48 36 56 26 56 23 48 14 45 10 35 15 27 16 18 25 16Z",
    detail: "M32 21 25 34 35 32 30 43 M42 9 50 5 M53 50 58 54"
  },
  bunker: {
    body: "M11 22 18 12 46 12 53 22 50 50 14 50Z",
    detail: "M13 26 51 26 M22 33 42 33 42 42 22 42Z M19 55 45 55"
  },
  salvage: {
    body: "M42 8 38 21 46 25 55 15 55 30 44 38 33 34 17 55 10 49 28 28 27 16Z",
    detail: "M14 49 17 50 M9 15 18 15 18 24 9 24Z"
  },
  railgun: {
    body: "M13 19 47 12 50 22 20 30Z M20 35 51 27 54 37 20 45Z M24 47 39 44 43 55 19 55Z",
    detail: "M5 33 57 20 M50 17 58 20 53 27"
  },
  battle: {
    body: "M17 7 32 25 27 30 13 17Z M47 7 51 17 23 49 17 44Z",
    detail: "M10 37 27 53 M38 37 54 52 M35 38 46 51 M17 48 11 55 M45 48 52 55"
  },
  elite: {
    body: "M32 8 48 21 44 42 32 55 20 42 16 21Z",
    detail: "M24 27 28 29 M40 27 36 29 M24 39 40 39 M32 18 32 35 M9 24 5 34 M55 24 59 34"
  },
  camp: {
    body: "M32 12C33 26 47 27 41 39 36 48 23 47 21 36 21 30 27 23 27 23L28 33Z",
    detail: "M14 47 49 57 M15 57 49 47 M15 18 11 23 M46 16 48 21"
  },
  shrine: {
    body: "M32 7 41 21 32 34 23 21Z M19 42 45 42 49 53 15 53Z",
    detail: "M12 58 52 58 M32 7 32 34 M9 23 15 23 M49 23 55 23 M20 36 16 40 M44 36 48 40"
  },
  merchant: {
    body: "M13 28 51 28 48 53 16 53Z M18 11 46 11 54 27 10 27Z",
    detail: "M24 12 21 26 M40 12 43 26 M23 35 23 46 M41 35 41 46 M28 33 36 33 36 52"
  },
  boss: {
    body: "M13 19 24 26 32 9 40 26 51 19 46 45 18 45Z",
    detail: "M18 51 46 51 M25 35 25 38 M39 35 39 38 M32 30 32 41"
  },
  crown: {
    body: "M10 18 23 28 32 10 41 28 54 18 47 46 17 46Z",
    detail: "M19 53 45 53 M32 28 37 35 32 41 27 35Z"
  },
  coin: {
    body: "M32 9A23 23 0 1 1 31.9 9 M32 16A16 16 0 1 0 32.1 16Z",
    detail: "M32 21 40 32 32 43 24 32Z"
  },
  heart: {
    body: "M32 52 12 32C0 14 22 6 32 20 43 6 64 15 52 32Z",
    detail: ""
  },
  bag: {
    body: "M20 22 44 22 50 51 14 51Z",
    detail: "M24 22 24 12 40 12 40 22 M15 32Q32 41 49 32 M28 35 36 35 36 43 28 43Z"
  },
  journal: {
    body: "M15 10 48 10 48 54 15 54Z",
    detail: "M22 10 22 54 M31 22 41 22 M31 29 39 29 M10 20 17 20 M10 42 17 42"
  },
  sound: {
    body: "M13 25 23 25 35 14 35 50 23 39 13 39Z",
    detail: "M43 22Q54 32 43 42 M49 15Q64 32 49 49"
  },
  mute: {
    body: "M13 25 23 25 35 14 35 50 23 39 13 39Z",
    detail: "M44 25 56 39 M56 25 44 39"
  },
  pause: {
    body: "M20 15 27 15 27 49 20 49Z M37 15 44 15 44 49 37 49Z",
    detail: ""
  },
  close: {
    body: "",
    detail: "M18 18 46 46 M46 18 18 46"
  },
  arrow: {
    body: "",
    detail: "M12 32 51 32 M37 18 51 32 37 46"
  },
  lock: {
    body: "M17 28 47 28 47 53 17 53Z",
    detail: "M23 28 23 19A9 9 0 0 1 41 19L41 28 M32 38 32 45"
  },
  dash: {
    body: "M34 12 52 31 34 51 26 43 36 31 26 20Z",
    detail: "M10 21 23 21 M5 32 23 32 M10 43 23 43"
  },
  help: {
    body: "",
    detail: "M22 22C22 8 47 10 43 26 41 33 32 30 32 39 M32 49 32 51"
  }
}, Fo = {
  class: "exp-icon",
  viewBox: "0 0 64 64",
  fill: "none",
  "aria-hidden": "true"
}, Bo = ["d"], qo = ["d"], Wo = /* @__PURE__ */ Ne({
  __name: "ExpeditionIcon",
  props: { name: {} },
  setup(e) {
    return (t, s) => ($(), I("svg", Fo, [_("path", {
      d: m(On)[e.name].body,
      fill: "currentColor",
      "fill-opacity": ".17",
      "fill-rule": "evenodd",
      stroke: "currentColor",
      "stroke-width": "2.2",
      "stroke-linejoin": "round"
    }, null, 8, Bo), _("path", {
      d: m(On)[e.name].detail,
      stroke: "currentColor",
      "stroke-width": "2.2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, 8, qo)]));
  }
}), xt = Wo, Ho = { class: "exp-wardrobe" }, Vo = { class: "exp-fitting-body" }, Go = { class: "exp-preview-stage" }, Yo = ["aria-label"], Qo = {
  key: 0,
  class: "exp-preview-error",
  role: "alert"
}, Ko = { class: "exp-preview-tools" }, Xo = ["aria-label"], Jo = ["disabled"], el = { class: "exp-outfit-info" }, tl = { class: "exp-muted" }, al = { class: "exp-fitting-actions" }, nl = {
  key: 0,
  class: "exp-muted"
}, sl = ["disabled"], rl = { key: 2 }, il = { class: "exp-purchase-confirm" }, ol = ["disabled"], ll = ["disabled"], cl = ["aria-label"], dl = ["aria-pressed", "onClick"], ul = ["src"], hl = /* @__PURE__ */ Ne({
  __name: "ExpeditionWardrobe",
  props: {
    data: {},
    traveler: {},
    balance: {},
    blocked: { type: Boolean },
    weapon: {}
  },
  emits: ["command"],
  setup(e, { emit: t }) {
    const s = e, a = t, n = q(s.data.equippedOutfit), i = q(!1), o = q(0), d = q(!1), r = q(null), c = q(null), l = q({}), u = ae(() => Qe[n.value]), h = ae(() => Ea(s.data, n.value)), v = ae(() => Xs.find((A) => Oa[A].awardKey === u.value.achievement)), p = ae(() => Qn.filter((A) => Ea(s.data, A) || Qe[A].achievement === null || Object.values(Zt).some((j) => j.boss && Oa[j.boss].awardKey === Qe[A].achievement)));
    let g = null, y = !0, w = 0, f = () => {
    };
    me([
      n,
      o,
      () => s.weapon
    ], () => {
      y = !0, f(), i.value = !1;
    });
    function x(A) {
      n.value = A, c.value?.scrollTo({ top: 0 });
    }
    function b() {
      w = performance.now() + 1100, y = !0, f();
    }
    function M() {
      i.value = !1, a("command", {
        type: "purchase",
        id: n.value
      });
    }
    function z() {
      y = !0;
      let A;
      try {
        A = new Wn({
          antialias: !0,
          alpha: !1
        });
      } catch {
        d.value = !0;
        return;
      }
      A.outputColorSpace = Ka, A.toneMapping = 7, A.setPixelRatio(Math.min(devicePixelRatio, 1.8));
      const j = new qn(), P = qa(), U = new Ft(), D = vs(P, U, s.traveler.gender);
      j.background = new Qa("#d1e0e1"), j.add(U, new Vn("#fff6e3", "#627c93", 2.7));
      const J = new Aa("#fff6e0", 3);
      J.position.set(-3, 5, 6), j.add(J);
      const ie = new Hn(-2.35, 2.35, 2.35, -2.35, 0.1, 30), F = new Ta();
      function Z(re) {
        D.update({
          x: 0,
          y: 0,
          facing: Math.PI / 2,
          dashTime: 0,
          swing: 0,
          shield: 0,
          guard: 0,
          resonance: 0
        }, s.weapon, re, 0, !0, !1), D.root.position.set(0, 0.1, 0), D.root.rotation.y = -0.2, D.root.scale.setScalar(1.35);
      }
      for (const re of p.value)
        Z(re), F.union(new Ta().setFromObject(U));
      const H = F.getSize(new St()), oe = F.getCenter(new St()), Te = H.y * 0.5 + H.z * 0.1 + 0.2, ge = Math.hypot(H.x, H.z) * 0.5 + 0.2;
      ie.position.set(0, oe.y + 0.8, 7), ie.lookAt(0, oe.y, 0);
      function ce(re) {
        const Ze = Math.max(Te, ge / re);
        ie.left = -Ze * re, ie.right = -ie.left, ie.top = Ze, ie.bottom = -Ze, ie.updateProjectionMatrix();
      }
      ce(1), A.setSize(144, 144, !1);
      try {
        for (const re of p.value)
          Z(re), A.render(j, ie), l.value[re] = A.domElement.toDataURL("image/png");
      } catch {
        d.value = !0, D.dispose(), P.dispose(), j.clear(), A.dispose(), A.forceContextLoss();
        return;
      }
      r.value.append(A.domElement);
      let xe = 0, Oe = 1, Xe = 1;
      const dt = new ResizeObserver(() => {
        const re = r.value.getBoundingClientRect();
        Oe = Math.max(1, re.width), Xe = Math.max(1, re.height), A.setSize(Oe, Xe, !1), ce(Oe / Xe), y = !0, f();
      });
      dt.observe(r.value);
      const qe = matchMedia("(prefers-reduced-motion: reduce)");
      function Pe(re) {
        re.preventDefault(), d.value = !0, cancelAnimationFrame(xe), xe = 0;
      }
      A.domElement.addEventListener("webglcontextlost", Pe);
      function We(re) {
        if (xe = 0, d.value || document.hidden || !y && (re > w || qe.matches)) return;
        const Ze = re < w && !qe.matches, Re = re * 0.03;
        D.update({
          x: Ze ? Math.sin(Re * 0.4) * 0.03 : 0,
          y: 0,
          facing: Math.PI / 2,
          dashTime: 0,
          swing: Ze ? 8 - Re % 8 : 0,
          shield: 0,
          guard: 0,
          resonance: 0
        }, s.weapon, n.value, Re, qe.matches, !1), D.root.position.set(0, 0.1, 0), D.root.rotation.y = Number(o.value) * Math.PI / 180, D.root.scale.setScalar(1.35);
        try {
          A.render(j, ie), y = !1;
        } catch {
          d.value = !0;
        }
        Ze && !d.value && f();
      }
      f = () => {
        !xe && !d.value && !document.hidden && (xe = requestAnimationFrame(We));
      };
      function He() {
        document.hidden ? (cancelAnimationFrame(xe), xe = 0) : (y = !0, f());
      }
      document.addEventListener("visibilitychange", He), f(), g = () => {
        f = () => {
        }, cancelAnimationFrame(xe), dt.disconnect(), document.removeEventListener("visibilitychange", He), A.domElement.removeEventListener("webglcontextlost", Pe), D.dispose(), P.dispose(), j.clear(), A.dispose(), A.forceContextLoss(), A.domElement.remove();
      };
    }
    function L() {
      g?.(), g = null, d.value = !1, z();
    }
    return It(z), vt(() => g?.()), (A, j) => ($(), I("div", Ho, [_("section", {
      ref_key: "fitting",
      ref: c,
      class: "exp-fitting"
    }, [_("div", Vo, [_("div", Go, [_("div", {
      ref_key: "host",
      ref: r,
      class: "exp-outfit-preview",
      "aria-label": m(At)[n.value].name
    }, [d.value ? ($(), I("div", Qo, [_("p", null, R(m(K).presentationError.rendering), 1), _("button", {
      type: "button",
      onClick: L
    }, R(m(T).reload), 1)])) : G("", !0)], 8, Yo), _("div", Ko, [_("label", null, [Ue(R(m(K).rotate), 1), jt(_("input", {
      "onUpdate:modelValue": j[0] || (j[0] = (P) => o.value = P),
      type: "range",
      min: "-180",
      max: "180",
      step: "5",
      "aria-label": m(K).rotate
    }, null, 8, Xo), [[Ya, o.value]])]), _("button", {
      type: "button",
      disabled: d.value,
      onClick: b
    }, R(m(K).previewAction), 9, Jo)])]), _("div", el, [
      _("h3", null, R(m(At)[n.value].name), 1),
      _("p", null, R(m(At)[n.value].detail), 1),
      _("p", tl, R(m(K).wardrobeNote), 1)
    ])]), _("div", al, [m(kn)(e.data.active) ? G("", !0) : ($(), I("p", nl, R(m(T).safeWardrobe), 1)), h.value ? ($(), I("button", {
      key: 1,
      type: "button",
      class: "exp-primary",
      disabled: e.blocked || !m(kn)(e.data.active) || e.data.equippedOutfit === n.value,
      onClick: j[1] || (j[1] = (P) => a("command", {
        type: "equip",
        id: n.value
      }))
    }, R(e.data.equippedOutfit === n.value ? m(K).equipped : m(K).equip), 9, sl)) : v.value ? ($(), I("p", rl, R(m(K).unlockWeapon(m(ja)[v.value])), 1)) : i.value ? ($(), I(se, { key: 3 }, [_("p", null, R(m(K).buyOutfit(m(At)[n.value].name, u.value.price)), 1), _("div", il, [_("button", {
      type: "button",
      class: "exp-primary",
      disabled: e.blocked || e.balance < u.value.price,
      onClick: M
    }, R(m(K).confirm), 9, ol), _("button", {
      type: "button",
      onClick: j[2] || (j[2] = (P) => i.value = !1)
    }, R(m(K).cancel), 1)])], 64)) : ($(), I("button", {
      key: 4,
      type: "button",
      class: "exp-primary",
      disabled: e.blocked || e.balance < u.value.price,
      onClick: j[3] || (j[3] = (P) => i.value = !0)
    }, R(e.balance < u.value.price ? m(K).noCoins : m(K).purchase) + " · " + R(m(K).coins(u.value.price)), 9, ll))])], 512), _("div", {
      class: "exp-outfit-rack",
      "aria-label": m(K).tryOn
    }, [($(!0), I(se, null, Ee(p.value, (P) => ($(), I("button", {
      key: P,
      type: "button",
      "aria-pressed": n.value === P,
      onClick: (U) => x(P)
    }, [
      l.value[P] ? ($(), I("img", {
        key: 0,
        class: "exp-outfit-swatch",
        src: l.value[P],
        alt: ""
      }, null, 8, ul)) : G("", !0),
      _("strong", null, R(m(At)[P].name), 1),
      _("small", null, R(e.data.equippedOutfit === P ? m(K).equipped : m(Ea)(e.data, P) ? m(K).owned : m(Qe)[P].price ? m(K).coins(m(Qe)[P].price) : m(K).achievement), 1)
    ], 8, dl))), 128))], 8, cl)]));
  }
}), fl = hl;
function pl(e, t = 1) {
  const s = [];
  for (const a of e.matchAll(/<!-- stage:(\d+):(\d+) -->\s*([\s\S]*?)<!-- \/stage -->/g)) {
    if (Number(a[1]) !== t) continue;
    const n = Number(a[2]);
    (s[n] || n >= ca.bands.length) && ve("narrative_unavailable");
    const i = /* @__PURE__ */ new Map();
    for (const d of a[3].matchAll(/<!-- field:([a-z]+) -->\s*([^]*?)(?=<!-- field:|$)/g))
      i.has(d[1]) && ve("narrative_unavailable"), i.set(d[1], d[2].replace(/^[^:\n]+:\s*/, "").trim());
    const o = (d) => {
      const r = i.get(d);
      return r || ve("narrative_unavailable"), r;
    };
    s[n] = {
      name: o("name"),
      relationship: o("relationship"),
      memory: i.get("memory") ?? "",
      shadow: i.get("shadow") ?? "",
      intimacy: o("intimacy"),
      secret: i.get("secret") ?? null
    };
  }
  return ca.bands.some((a, n) => !s[n]) && ve("narrative_unavailable"), s;
}
function ml(e, t, s) {
  const a = e[nn(t.affection)];
  return {
    relationship: a.relationship,
    shadow: a.shadow,
    intimacy: a.intimacy,
    personalPast: e.slice(0, t.highestBand + 1).map((n) => n.memory).filter(Boolean),
    secret: a.secret,
    disclosedSecret: s ? e.find((n) => n.secret)?.secret ?? null : null
  };
}
var vl = async (e, t) => {
  const s = await fetch(`/${Ts}/modules/xiaobai-os/docs/expedition-cards/${e}.md`, {
    signal: t,
    cache: "no-cache"
  });
  s.ok || ve("narrative_unavailable");
  const a = await s.text();
  return a.trim() || ve("narrative_unavailable"), a;
};
async function gl(e, t, s = vl) {
  const [a, n, i, o, d] = await Promise.all([
    s("system-prompt", t),
    s("world", t),
    s("player", t),
    s("meta-protocol", t),
    Promise.all(Wr.map(async (w) => ({
      id: w,
      document: await s(je(w) ? w : Ae[w].card, t)
    })))
  ]), r = d.map(({ id: w, document: f }) => {
    const x = [...f.matchAll(/<!-- public -->\s*([\s\S]*?)\s*<!-- \/public -->/g)];
    return (x.length !== 1 || !x[0][1].trim()) && ve("narrative_unavailable"), {
      id: w,
      introduction: x[0][1].trim(),
      document: f.replace(x[0][0], "").trim()
    };
  }), c = r.map((w) => w.introduction).join(`
`), l = r.find((w) => w.id === e).document, u = {
    system: a,
    world: n,
    player: i,
    protocol: o,
    npcs: c
  };
  if (!je(e)) {
    const w = /<!-- opening:([a-z]+\.initial) -->\s*([\s\S]*?)\s*<!-- \/opening -->/.exec(l);
    return (!w || w[1] !== `${e}.initial`) && ve("narrative_unavailable"), {
      ...u,
      character: l.slice(0, w.index).replace(/# 开场\s*$/, "").trim(),
      stages: [],
      opening: {
        initial: w[2],
        returned: null
      }
    };
  }
  const [h, v] = await Promise.all(["openings", `${e}-stages`].map((w) => s(w, t))), p = new Map([...h.matchAll(/<!-- opening:([a-z]+\.(?:initial|returned)) -->\s*([\s\S]*?)\s*<!-- \/opening -->/g)].map((w) => [w[1], w[2].trim()])), g = p.get(`${e}.initial`), y = p.get(`${e}.returned`) ?? null;
  return (!g || (e === "anian" || e === "kouzi") && !y) && ve("narrative_unavailable"), {
    ...u,
    character: l,
    stages: pl(v),
    opening: {
      initial: g,
      returned: y
    }
  };
}
function Ms(e) {
  return Nr[e];
}
function yl(e, t, s = []) {
  if (!je(t)) {
    const o = Ae[t];
    return e.facts.includes(o.complete) || e.pendingParley ? {} : {
      attack: ye.attack,
      ...e.facts.includes(o.intel) ? { pass: ye.pass } : {}
    };
  }
  const a = Object.fromEntries(Dr(e.facts, t, e.people[t]).map((o) => [o, tn[o].meaning])), n = Ms(t), i = e.relationships[t].affection;
  if (n && !e.facts.includes(n) && i >= ca.bands[4] && s[nn(i)]?.secret && (a.share_secret = ye.shareSecret), Fr(e, t)) {
    a.follow = ye.follow, a.stay = ye.stay;
    for (const o of ls(e, t).filter((d) => d.accessible && d.solo)) a[`go:${o.id}`] = ye.go(o.name);
  }
  return a;
}
var ks = "dialogue", ya = `<${ks}>`, rn = `</${ks}>`, M1 = new RegExp(`${ya}([\\s\\S]*?)${rn}`, "i"), k1 = new RegExp(ya, "i");
function bl(e) {
  const t = e.affectionDelta ? e.affectionDelta > 0 ? "up" : "down" : null;
  return `${ya}
${e.reply}
${rn}
${JSON.stringify({
    action: e.action,
    affection: t,
    performance: e.performance ?? null
  })}`;
}
function wl(e) {
  return `［开工强调］：

每次输出均由两部分组成：XML 正文与 JSON 操作，缺一不可。

在${ya}…${rn}中用【${e}】的身份第一人称叙事。在JSON 对象中提交操作。
开工：`;
}
function xl(e) {
  return e.map((t) => ({
    id: t,
    event: Yn[t]
  }));
}
function Ml(e) {
  const t = /* @__PURE__ */ new Set();
  let s;
  return e.filter((a) => a.kind === "dialogue").flatMap((a) => {
    const n = a.facts.filter((o) => !t.has(o)), i = {
      ...a.scene === s ? {} : { place: ne.scenes[a.scene] },
      ...n.length ? { newEvents: n } : {}
    };
    return a.facts.forEach((o) => t.add(o)), s = a.scene, [{
      role: "user",
      content: (Object.keys(i).length ? `<scene>
${JSON.stringify(i)}
</scene>
` : "") + a.player
    }, {
      role: "assistant",
      content: bl(a)
    }];
  });
}
function kl(e, t) {
  return t ? e.findIndex((s) => s.id === t.throughId) + 1 : 0;
}
function _l(e, t) {
  const s = new Set(e.facts), a = je(t) ? e.people[t] : null, n = _e[je(t) ? e.people[t].scene : Ae[t].scene], i = je(t) ? e.people[t].position : la(t, s), o = an(n, i, s, e.people), d = va(n.id, i, s).filter((r) => Ce(yt(n, s), i, r.position));
  return {
    place: ne.scenes[n.id],
    movement: a ? {
      mode: a.mode,
      destination: a.destination ? en[a.destination].name : null
    } : null,
    nearby: [...o, ...d].filter((r) => r.target.id !== t).map((r) => it(r.target.id))
  };
}
function Sl(e, t, s = []) {
  const a = yl(e, t, s), n = Object.keys(a), i = {
    person: it(t),
    ..._l(e, t),
    events: xl(e.knowledge[t]),
    actions: n,
    actionMeanings: a
  };
  if (!je(t)) {
    const o = Ae[t];
    return {
      ...i,
      rescued: !1,
      resolved: e.facts.includes(o.complete)
    };
  }
  return {
    ...i,
    map: ls(e, t),
    rescued: e.knowledge[t].includes("captives_arrived"),
    affection: e.relationships[t].affection
  };
}
function Dt(e, t) {
  return `<${e}>
${t}
</${e}>`;
}
function Rl(e, t, s, a, n = e.memories[t]) {
  const i = Sl(e, t, a.stages), o = Jr(t), d = je(t) ? Ms(t) : null, r = je(t) ? ml(a.stages, e.relationships[t], !!d && e.facts.includes(d)) : null, { actions: c, actionMeanings: l, events: u, ...h } = i, v = {
    actions: l,
    performance: o
  }, p = {
    memory: n?.text ?? null,
    events: u,
    ...h,
    opening: e.conversations[t].some((g) => g.kind !== "receipt") || !je(t) && e.facts.includes(Ae[t].complete) ? null : i.rescued ? a.opening.returned : a.opening.initial,
    stage: r
  };
  return {
    systemPrompt: [
      a.system.trim(),
      Dt("background", a.world.trim()),
      Dt("player", `${a.player.trim()}

${JSON.stringify({
        ...e.traveler,
        outfit: At[e.outfit].detail,
        equipment: ft[e.weapon].equipment
      }, null, 2)}`),
      Dt("NPCs", `${a.npcs}

${a.character.trim()}`)
    ].join(`

`),
    messages: [
      {
        role: "user",
        content: `${Dt("meta_protocol", `${a.protocol.trim()}

${Dt("operations", JSON.stringify(v, null, 2))}`)}

<story>
${JSON.stringify(p, null, 2)}`
      },
      ...Ml(e.conversations[t].slice(kl(e.conversations[t], n))),
      {
        role: "user",
        content: `${s}
</story>

${wl(i.person)}`
      }
    ]
  };
}
var Zn = Object.freeze({
  trigger: 128e3,
  inputBudget: 158e3,
  recentExchanges: 5,
  outputTokens: 6e3
});
function Cl(e, t, s, a) {
  const n = Rl(e, t, s, a), i = Ls({ messages: [{
    role: "system",
    content: n.systemPrompt
  }, ...n.messages] }), o = Pa(n.systemPrompt), d = Pa(e.memories[t]?.text ?? ""), r = Pa(JSON.stringify(n.messages.slice(1, -1)));
  return {
    used: i,
    system: o,
    memory: d,
    history: r,
    situation: Math.max(0, i - o - d - r),
    limit: Zn.inputBudget,
    trigger: Zn.trigger
  };
}
var zl = ["aria-label", "aria-expanded"], Pl = {
  class: "ember-affection-heart",
  viewBox: "2 3 20 19",
  "aria-hidden": "true"
}, $l = ["offset"], Il = ["offset"], El = ["fill"], Ll = ["aria-label", "aria-expanded"], Al = {
  key: 1,
  class: "ember-meter-popover"
}, Tl = ["aria-label"], jl = { class: "ember-meter-total" }, Ol = { key: 0 }, Zl = { class: "ember-meter-total" }, Ul = { key: 2 }, Nl = { role: "status" }, Dl = /* @__PURE__ */ Ne({
  __name: "ConversationMeters",
  props: {
    campaign: {},
    person: {},
    draft: {}
  },
  setup(e) {
    const t = e, s = Ht(null), a = q(null), n = q(0), i = q("");
    let o = null, d;
    async function r() {
      o?.abort(), o = new AbortController();
      const g = o;
      s.value = null, i.value = "";
      try {
        const y = await gl(t.person, g.signal);
        g.signal.aborted || (s.value = y);
      } catch (y) {
        g.signal.aborted || (i.value = kt(y));
      }
    }
    me(() => t.person, () => {
      a.value = null, n.value = 0, r();
    }, { immediate: !0 });
    const c = ae(() => je(t.person) ? t.campaign.relationships[t.person].affection : 0), l = `ember-affection-${Fn()}`, u = ae(() => `${100 - c.value}%`), h = ae(() => s.value?.stages[nn(c.value)]?.name ?? ""), v = ae(() => s.value ? Cl(t.campaign, t.person, t.draft, s.value) : null);
    me(c, (g, y) => {
      d && clearTimeout(d), n.value = g - y, d = setTimeout(() => {
        n.value = 0;
      }, 2200);
    }), Bn(() => (a.value = null, !0), () => !!a.value), vt(() => {
      o?.abort(), d && clearTimeout(d);
    });
    const p = (g) => `${(g / 1e3).toFixed(1)}k`;
    return (g, y) => ($(), I("div", {
      class: "ember-meters",
      onKeydown: y[3] || (y[3] = Es(nt((w) => a.value = null, ["stop"]), ["esc"]))
    }, [
      m(je)(e.person) ? ($(), I("button", {
        key: 0,
        type: "button",
        class: "ember-meter-button",
        "aria-label": m(ye).affection,
        "aria-expanded": a.value === "affection",
        onClick: y[0] || (y[0] = (w) => a.value = a.value === "affection" ? null : "affection")
      }, [($(), I("svg", Pl, [_("defs", null, [_("linearGradient", {
        id: l,
        x1: "0",
        y1: "4",
        x2: "0",
        y2: "21",
        gradientUnits: "userSpaceOnUse"
      }, [_("stop", {
        offset: u.value,
        class: "ember-affection-empty"
      }, null, 8, $l), _("stop", {
        offset: u.value,
        class: "ember-affection-filled"
      }, null, 8, Il)])]), _("path", {
        d: "M12 21C10.6 19.8 3 14.7 3 8.5C3 5.9 5.1 4 7.5 4C9.4 4 11 5 12 6.5C13 5 14.6 4 16.5 4C18.9 4 21 5.9 21 8.5C21 14.7 13.4 19.8 12 21Z",
        fill: `url(#${l})`
      }, null, 8, El)])), n.value ? ($(), I("small", {
        key: 0,
        class: zt(["ember-affection-change", { "is-down": n.value < 0 }]),
        role: "status"
      }, R(n.value > 0 ? "+" : "") + R(n.value), 3)) : G("", !0)], 8, zl)) : G("", !0),
      _("button", {
        type: "button",
        class: "ember-meter-button",
        "aria-label": m(ye).context,
        "aria-expanded": a.value === "context",
        onClick: y[1] || (y[1] = (w) => a.value = a.value === "context" ? null : "context")
      }, [_("span", {
        class: zt(["ember-meter-ring", { "is-warning": v.value && v.value.used >= v.value.trigger }]),
        style: Vt({ "--meter-fill": `${Math.min(1, (v.value?.used ?? 0) / (v.value?.limit ?? 1)) * 360}deg` })
      }, [...y[4] || (y[4] = [_("span", null, null, -1)])], 6)], 8, Ll),
      a.value ? ($(), I("section", Al, [
        _("header", null, [_("strong", null, R(a.value === "affection" ? m(ye).affection : m(ye).context), 1), _("button", {
          type: "button",
          "aria-label": m(ye).close,
          onClick: y[2] || (y[2] = (w) => a.value = null)
        }, "×", 8, Tl)]),
        a.value === "affection" ? ($(), I(se, { key: 0 }, [_("p", jl, [Ue(R(c.value) + " ", 1), y[5] || (y[5] = _("small", null, "/ 100", -1))]), i.value ? G("", !0) : ($(), I("p", Ol, R(h.value || m(ye).loading), 1))], 64)) : v.value ? ($(), I(se, { key: 1 }, [
          _("p", Zl, R(p(v.value.used)) + " / " + R(p(v.value.limit)), 1),
          _("dl", null, [($(!0), I(se, null, Ee(m(ye).contextParts, (w, f) => ($(), I(se, { key: f }, [_("dt", null, R(w), 1), _("dd", null, R(p(v.value[f])), 1)], 64))), 128))]),
          _("p", null, R(m(ye).threshold(v.value.trigger - v.value.used)), 1),
          _("small", null, R(m(ye).estimate), 1)
        ], 64)) : i.value ? G("", !0) : ($(), I("p", Ul, R(m(ye).loading), 1)),
        i.value ? ($(), I(se, { key: 3 }, [_("p", Nl, R(i.value), 1), _("button", {
          type: "button",
          onClick: r
        }, R(m(ye).retry), 1)], 64)) : G("", !0)
      ])) : G("", !0)
    ], 32));
  }
}), Fl = /* @__PURE__ */ ct(Dl, [["__scopeId", "data-v-ea63f6c2"]]), Bl = ["aria-label"], ql = { class: "ember-weapon-layout" }, Wl = { class: "ember-weapon-list" }, Hl = ["name", "value"], Vl = {
  class: "ember-weapon-profile",
  "aria-live": "polite",
  "aria-atomic": "true"
}, Gl = ["src"], Yl = { class: "ember-weapon-skill" }, Ql = /* @__PURE__ */ Ne({
  __name: "WeaponSelection",
  props: {
    modelValue: { required: !0 },
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(e) {
    const t = Un(e, "modelValue"), s = Fn();
    return (a, n) => ($(), I("fieldset", {
      class: "ember-weapon-selector",
      "aria-label": m(le).chooseWeapon
    }, [_("div", ql, [_("div", Wl, [($(!0), I(se, null, Ee(m(Kn), (i) => ($(), I("label", {
      key: i,
      class: zt({ "is-selected": t.value === i })
    }, [
      jt(_("input", {
        "onUpdate:modelValue": n[0] || (n[0] = (o) => t.value = o),
        type: "radio",
        name: m(s),
        value: i
      }, null, 8, Hl), [[Dn, t.value]]),
      Ye(xt, { name: i }, null, 8, ["name"]),
      _("span", null, R(m(ft)[i].name), 1)
    ], 2))), 128))]), _("div", Vl, [
      ($(), I("img", {
        key: t.value,
        class: "ember-weapon-art",
        src: m(xo)[t.value],
        alt: "",
        decoding: "async",
        width: "640",
        height: "640"
      }, null, 8, Gl)),
      _("h3", null, R(m(ft)[t.value].name), 1),
      _("p", null, R(m(ft)[t.value].detail), 1),
      _("div", Yl, [_("strong", null, R(m(ft)[t.value].action), 1), _("p", null, R(m(ft)[t.value].skill), 1)])
    ])])], 8, Bl));
  }
}), Kl = /* @__PURE__ */ ct(Ql, [["__scopeId", "data-v-0c0d4e2b"]]), Xl = ["src"], Jl = /* @__PURE__ */ Ne({
  __name: "WorldFrontispiece",
  setup(e) {
    const t = q(null), s = q(null), a = new ResizeObserver((n) => {
      const { width: i, height: o } = n[0].contentRect;
      s.value = i <= 700 && o > i;
    });
    return It(() => a.observe(t.value)), vt(() => a.disconnect()), (n, i) => ($(), I("div", {
      ref_key: "root",
      ref: t,
      class: "ember-frontispiece",
      "aria-hidden": "true"
    }, [s.value !== null ? ($(), I("img", {
      key: 0,
      src: s.value ? m(Va).cityMobile : m(Va).city,
      alt: "",
      fetchpriority: "high",
      decoding: "async",
      width: "1376",
      height: "768"
    }, null, 8, Xl)) : G("", !0)], 512));
  }
}), ec = /* @__PURE__ */ ct(Jl, [["__scopeId", "data-v-f5a6e0d9"]]), tc = ["aria-label"], ac = {
  key: 0,
  class: "entry-title"
}, nc = { class: "entry-city" }, sc = ["aria-label"], rc = ["disabled"], ic = ["disabled"], oc = ["disabled"], lc = ["disabled"], cc = {
  key: 0,
  class: "entry-save"
}, dc = ["disabled"], uc = { for: "ember-traveler-name" }, hc = ["maxlength", "placeholder"], fc = ["value"], pc = {
  class: "entry-primary",
  type: "submit"
}, mc = {
  key: 1,
  class: "entry-chapters"
}, vc = ["src"], gc = {
  class: "entry-numeral",
  "aria-hidden": "true"
}, yc = { class: "entry-chapter-body" }, bc = { key: 0 }, wc = { class: "entry-forthcoming" }, xc = { class: "entry-traveler" }, Mc = {
  key: 0,
  class: "entry-restart"
}, kc = ["disabled"], _c = {
  key: 0,
  "aria-hidden": "true"
}, Sc = /* @__PURE__ */ Ne({
  __name: "JourneyEntry",
  props: {
    campaign: {},
    ready: { type: Boolean },
    busy: { type: Boolean },
    blocked: { type: Boolean }
  },
  emits: ["start", "continue"],
  setup(e, { expose: t, emit: s }) {
    const a = e, n = s, i = q("title"), o = q(!1), d = q(a.campaign?.traveler.name ?? ""), r = q(a.campaign?.traveler.gender ?? null), c = q(a.campaign?.weapon ?? "blade"), l = q(!1), u = q(null), h = q(null), v = ae(() => ({
      title: T.title,
      identity: le.identity,
      chapters: le.chooseChapter,
      weapon: le.chooseWeapon
    })[i.value]);
    me(i, async () => {
      await Tt(), h.value && (h.value.scrollTop = 0), u.value?.focus({ preventScroll: !0 });
    });
    function p() {
      o.value = !0, l.value = !1, i.value = "identity";
    }
    function g() {
      d.value.trim() && r.value && (d.value = d.value.trim(), i.value = "chapters");
    }
    function y() {
      i.value = i.value === "weapon" ? "chapters" : i.value === "chapters" && o.value ? "identity" : "title";
    }
    function w() {
      a.campaign && !o.value ? n("continue") : i.value = "weapon";
    }
    function f() {
      !r.value || !d.value.trim() || a.blocked || a.campaign && !l.value || n("start", {
        traveler: {
          name: d.value.trim(),
          gender: r.value
        },
        weapon: c.value,
        chapter: _t.id
      });
    }
    return t({ back: () => i.value === "title" ? !1 : (y(), !0) }), (x, b) => ($(), I("section", {
      class: zt(["ember-entry", { "is-title": i.value === "title" }]),
      "aria-label": m(T).title
    }, [
      Ye(ec),
      b[10] || (b[10] = _("div", { class: "entry-shade" }, null, -1)),
      i.value === "title" ? ($(), I("div", ac, [
        _("p", nc, R(m(le).city), 1),
        _("h1", {
          ref_key: "heading",
          ref: u,
          tabindex: "-1"
        }, R(m(T).title), 513),
        _("nav", { "aria-label": m(T).title }, [
          e.campaign ? ($(), I("button", {
            key: 0,
            class: "entry-primary",
            type: "button",
            disabled: !e.ready || e.blocked,
            onClick: b[0] || (b[0] = (M) => n("continue"))
          }, [Ue(R(m(T).resume), 1), b[6] || (b[6] = _("span", { "aria-hidden": "true" }, "→", -1))], 8, rc)) : ($(), I("button", {
            key: 1,
            class: "entry-primary",
            type: "button",
            disabled: !e.ready || e.blocked,
            onClick: p
          }, [Ue(R(e.ready ? m(le).begin : m(le).loading), 1), b[7] || (b[7] = _("span", { "aria-hidden": "true" }, "→", -1))], 8, ic)),
          e.campaign ? ($(), I("button", {
            key: 2,
            type: "button",
            disabled: !e.ready || e.blocked,
            onClick: b[1] || (b[1] = (M) => {
              o.value = !1, i.value = "chapters";
            })
          }, R(m(le).chapters), 9, oc)) : G("", !0),
          e.campaign ? ($(), I("button", {
            key: 3,
            type: "button",
            disabled: !e.ready || e.blocked,
            onClick: p
          }, R(m(le).newJourney), 9, lc)) : G("", !0)
        ], 8, sc),
        e.campaign ? ($(), I("p", cc, [_("span", null, R(e.campaign.traveler.name), 1), _("span", null, R(m(fs)), 1)])) : G("", !0)
      ])) : ($(), I("div", {
        key: 1,
        ref_key: "sheet",
        ref: h,
        class: "entry-sheet"
      }, [
        _("header", null, [_("button", {
          type: "button",
          disabled: e.busy,
          onClick: y
        }, "← " + R(m(le).back), 9, dc), _("span", null, R(m(T).title), 1)]),
        _("h2", {
          ref_key: "heading",
          ref: u,
          tabindex: "-1"
        }, R(v.value), 513),
        i.value === "identity" ? ($(), I("form", {
          key: 0,
          class: "entry-identity",
          onSubmit: nt(g, ["prevent"])
        }, [
          _("label", uc, R(m(le).name), 1),
          jt(_("input", {
            id: "ember-traveler-name",
            "onUpdate:modelValue": b[2] || (b[2] = (M) => d.value = M),
            maxlength: m(24),
            placeholder: m(le).namePlaceholder,
            required: "",
            autocomplete: "off",
            pattern: ".*\\S.*"
          }, null, 8, hc), [[Ya, d.value]]),
          _("fieldset", null, [_("legend", null, R(m(le).gender), 1), ($(!0), I(se, null, Ee(m(hs), (M) => ($(), I("label", { key: M }, [jt(_("input", {
            "onUpdate:modelValue": b[3] || (b[3] = (z) => r.value = z),
            type: "radio",
            name: "ember-traveler-gender",
            value: M,
            required: ""
          }, null, 8, fc), [[Dn, r.value]]), _("span", null, R(m(le).genders[M]), 1)]))), 128))]),
          _("button", pc, [Ue(R(m(le).next), 1), b[8] || (b[8] = _("span", { "aria-hidden": "true" }, "→", -1))])
        ], 32)) : i.value === "chapters" ? ($(), I("div", mc, [_("button", {
          type: "button",
          class: "entry-chapter",
          onClick: w
        }, [
          _("img", {
            class: "entry-chapter-art",
            src: m(Va).chapter,
            alt: "",
            decoding: "async"
          }, null, 8, vc),
          _("span", gc, R(m(_t).numeral), 1),
          _("span", yc, [
            _("small", null, R(m(_t).number), 1),
            _("strong", null, R(m(_t).title), 1),
            _("span", null, R(m(T).opening), 1),
            e.campaign && !o.value ? ($(), I("small", bc, R(e.campaign.facts.includes("chapter_completed") ? m(le).completeChapter : m(le).currentChapter), 1)) : G("", !0)
          ]),
          b[9] || (b[9] = _("span", {
            class: "entry-chapter-arrow",
            "aria-hidden": "true"
          }, "→", -1))
        ]), _("div", wc, [_("span", null, R(m(le).nextChapter), 1), _("span", null, R(m(le).forthcoming), 1)])])) : ($(), I("form", {
          key: 2,
          class: "entry-loadout",
          onSubmit: nt(f, ["prevent"])
        }, [
          _("p", xc, [_("strong", null, R(d.value), 1), _("span", null, R(r.value ? m(le).genders[r.value] : "") + " · " + R(m(le).identityRole), 1)]),
          Ye(Kl, {
            modelValue: c.value,
            "onUpdate:modelValue": b[4] || (b[4] = (M) => c.value = M)
          }, null, 8, ["modelValue"]),
          e.campaign ? ($(), I("label", Mc, [jt(_("input", {
            "onUpdate:modelValue": b[5] || (b[5] = (M) => l.value = M),
            type: "checkbox",
            required: ""
          }, null, 512), [[$s, l.value]]), _("span", null, R(m(le).restartWarning), 1)])) : G("", !0),
          _("button", {
            class: "entry-primary",
            type: "submit",
            disabled: e.blocked
          }, [Ue(R(e.busy ? m(le).entering : e.campaign ? m(le).confirmRestart : m(le).enter), 1), e.busy ? G("", !0) : ($(), I("span", _c, "→"))], 8, kc)
        ], 32))
      ], 512))
    ], 10, tc));
  }
}), Rc = /* @__PURE__ */ ct(Sc, [["__scopeId", "data-v-93861d5f"]]), Cc = [
  "maxlength",
  "aria-label",
  "placeholder",
  "disabled"
], zc = ["aria-label", "title"], Pc = [
  "aria-label",
  "title",
  "disabled"
], $c = /* @__PURE__ */ Ne({
  __name: "DialogueComposer",
  props: /* @__PURE__ */ pn({
    blocked: { type: Boolean },
    talking: { type: Boolean }
  }, {
    modelValue: { required: !0 },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ pn(["send", "cancel"], ["update:modelValue"]),
  setup(e, { emit: t }) {
    const s = Un(e, "modelValue"), a = e, n = t, i = q(null), o = q(!1);
    let d = null, r = 0;
    function c() {
      i.value && (i.value.style.height = "44px", i.value.style.height = `${Math.min(132, i.value.scrollHeight + 2)}px`);
    }
    function l() {
      !a.blocked && s.value.trim() && n("send");
    }
    function u(h) {
      As(h, o.value) && (h.preventDefault(), l());
    }
    return me(s, async () => {
      await Tt(), c();
    }), It(() => {
      c(), d = new ResizeObserver((h) => {
        const v = h[0].contentRect.width;
        v !== r && (r = v, c());
      }), d.observe(i.value);
    }), vt(() => d?.disconnect()), (h, v) => ($(), I("form", {
      class: "ember-composer",
      onSubmit: nt(l, ["prevent"])
    }, [jt(_("textarea", {
      ref_key: "input",
      ref: i,
      "onUpdate:modelValue": v[0] || (v[0] = (p) => s.value = p),
      rows: "1",
      maxlength: m(qt).playerTextLimit,
      "aria-label": m(T).input,
      placeholder: m(T).input,
      disabled: e.talking,
      enterkeyhint: "enter",
      onKeydown: u,
      onCompositionstart: v[1] || (v[1] = (p) => o.value = !0),
      onCompositionend: v[2] || (v[2] = (p) => o.value = !1)
    }, null, 40, Cc), [[Ya, s.value]]), e.talking ? ($(), I("button", {
      key: 0,
      type: "button",
      "aria-label": m(T).cancel,
      title: m(T).cancel,
      onClick: v[3] || (v[3] = (p) => n("cancel"))
    }, [...v[4] || (v[4] = [_("svg", {
      viewBox: "0 0 24 24",
      "aria-hidden": "true"
    }, [_("rect", {
      x: "6",
      y: "6",
      width: "12",
      height: "12",
      rx: "2"
    })], -1)])], 8, zc)) : ($(), I("button", {
      key: 1,
      type: "submit",
      "aria-label": m(T).send,
      title: m(T).send,
      disabled: e.blocked || !s.value.trim()
    }, [...v[5] || (v[5] = [_("svg", {
      viewBox: "0 0 24 24",
      "aria-hidden": "true"
    }, [_("path", { d: "M12 19V5m-6 6 6-6 6 6" })], -1)])], 8, Pc))], 32));
  }
}), Ic = /* @__PURE__ */ ct($c, [["__scopeId", "data-v-85a32063"]]), Ec = "" + new URL("ember-assets/sanniang-body-B_tq-dMO.webp", import.meta.url).href, Lc = "" + new URL("ember-assets/sanniang-arm-Bm6H1dRj.webp", import.meta.url).href, Ac = "" + new URL("ember-assets/sanniang-neutral-DXTdZp3i.webp", import.meta.url).href, Tc = "" + new URL("ember-assets/sanniang-smile-noV3jnDd.webp", import.meta.url).href, jc = "" + new URL("ember-assets/sanniang-teasing-Dg0_1bnn.webp", import.meta.url).href, Oc = "" + new URL("ember-assets/sanniang-blush-CCS7mL7q.webp", import.meta.url).href, Zc = "" + new URL("ember-assets/sanniang-relaxed-DW4eA74n.webp", import.meta.url).href, Uc = "" + new URL("ember-assets/sanniang-serious-CwUT-_7U.webp", import.meta.url).href, Nc = "" + new URL("ember-assets/sanniang-worried-BfIdgkTU.webp", import.meta.url).href, Dc = "" + new URL("ember-assets/sanniang-sad-COe1aNTp.webp", import.meta.url).href, Fc = "" + new URL("ember-assets/sanniang-displeased-C2M9rHVA.webp", import.meta.url).href, Bc = "" + new URL("ember-assets/sanniang-fond-BPtREJDc.webp", import.meta.url).href, qc = "" + new URL("ember-assets/sanniang-laugh-DiCXV8k0.webp", import.meta.url).href, Wc = "" + new URL("ember-assets/sanniang-surprised-BV1JYuTz.webp", import.meta.url).href, Hc = "" + new URL("ember-assets/anian-body-DCOYRRf4.webp", import.meta.url).href, Vc = "" + new URL("ember-assets/anian-neutral-CUA1T09A.webp", import.meta.url).href, Gc = "" + new URL("ember-assets/anian-arm-CxeZ5EK2.webp", import.meta.url).href, Yc = "" + new URL("ember-assets/anian-blush-C8gvbv5I.webp", import.meta.url).href, Qc = "" + new URL("ember-assets/anian-displeased-Dy2sm-18.webp", import.meta.url).href, Kc = "" + new URL("ember-assets/anian-fond-WFHkgJZI.webp", import.meta.url).href, Xc = "" + new URL("ember-assets/anian-laugh-D2ZZqjUz.webp", import.meta.url).href, Jc = "" + new URL("ember-assets/anian-rest-B5smyaQa.webp", import.meta.url).href, ed = "" + new URL("ember-assets/anian-sad-957wfM7Z.webp", import.meta.url).href, td = "" + new URL("ember-assets/anian-surprised-CRBE7-3g.webp", import.meta.url).href, ad = "" + new URL("ember-assets/anian-worried-CoEnP0Ls.webp", import.meta.url).href, nd = "" + new URL("ember-assets/anian-smile-vqfRMj9V.webp", import.meta.url).href, sd = "" + new URL("ember-assets/kouzi-body-pi_GesdX.webp", import.meta.url).href, rd = "" + new URL("ember-assets/kouzi-neutral-BHN8FRWd.webp", import.meta.url).href, id = "" + new URL("ember-assets/kouzi-arm-Dt1k7QS3.webp", import.meta.url).href, od = "" + new URL("ember-assets/kouzi-displeased-u3BA-oF8.webp", import.meta.url).href, ld = "" + new URL("ember-assets/kouzi-fond-BNLlxNvH.webp", import.meta.url).href, cd = "" + new URL("ember-assets/kouzi-laugh-CmRDrIYh.webp", import.meta.url).href, dd = "" + new URL("ember-assets/kouzi-sad--tSsbCmM.webp", import.meta.url).href, ud = "" + new URL("ember-assets/kouzi-serious-CUEjL5ps.webp", import.meta.url).href, hd = "" + new URL("ember-assets/kouzi-smile-DQS1bOIn.webp", import.meta.url).href, fd = "" + new URL("ember-assets/kouzi-surprised-D_m47QNy.webp", import.meta.url).href, pd = "" + new URL("ember-assets/kouzi-teasing-HV1Xbjwg.webp", import.meta.url).href, md = "" + new URL("ember-assets/kouzi-worried-noVjOF-2.webp", import.meta.url).href, vd = "" + new URL("ember-assets/kouzi-blush-D1R6yAj4.webp", import.meta.url).href, gd = "" + new URL("ember-assets/laobai-body-CiCiUXaK.webp", import.meta.url).href, yd = "" + new URL("ember-assets/laobai-arm-BPcvdc_G.webp", import.meta.url).href, bd = "" + new URL("ember-assets/laobai-neutral-BszZr6uU.webp", import.meta.url).href, wd = "" + new URL("ember-assets/laobai-smile-B6Lrl5WC.webp", import.meta.url).href, xd = "" + new URL("ember-assets/laobai-teasing-D7aVLAY_.webp", import.meta.url).href, Md = "" + new URL("ember-assets/laobai-laugh-C7nooIV7.webp", import.meta.url).href, kd = "" + new URL("ember-assets/laobai-blush-DhABNQ2i.webp", import.meta.url).href, _d = "" + new URL("ember-assets/laobai-fond-Bi7eZfNv.webp", import.meta.url).href, Sd = "" + new URL("ember-assets/laobai-serious-CWzUzqsj.webp", import.meta.url).href, Rd = "" + new URL("ember-assets/laobai-surprised-DWl6WaG1.webp", import.meta.url).href, Cd = "" + new URL("ember-assets/laobai-worried-NHYVPdJS.webp", import.meta.url).href, zd = "" + new URL("ember-assets/laobai-sad-Dh9Oip1e.webp", import.meta.url).href, Pd = "" + new URL("ember-assets/bajin-body-CP5YAbCV.webp", import.meta.url).href, $d = "" + new URL("ember-assets/bajin-neutral-CpkizK1M.webp", import.meta.url).href, Id = "" + new URL("ember-assets/bajin-arm-BokEMFK-.webp", import.meta.url).href, Ed = "" + new URL("ember-assets/bajin-angry-0gZe6btz.webp", import.meta.url).href, Ld = "" + new URL("ember-assets/bajin-relieved-wp9h8D8n.webp", import.meta.url).href, Ad = "" + new URL("ember-assets/bajin-resigned-xaqeiOk2.webp", import.meta.url).href, Td = "" + new URL("ember-assets/bajin-suspicious-BahktpZg.webp", import.meta.url).href, jd = "" + new URL("ember-assets/bajin-worried-DbSEIW6Z.webp", import.meta.url).href, Od = "" + new URL("ember-assets/changyounian-body-DOfy0pe5.webp", import.meta.url).href, Zd = "" + new URL("ember-assets/changyounian-neutral-Dvjv70fG.webp", import.meta.url).href, Ud = "" + new URL("ember-assets/changyounian-arm-CWiq1e__.webp", import.meta.url).href, Nd = "" + new URL("ember-assets/changyounian-displeased-Bd-oNqUw.webp", import.meta.url).href, Dd = "" + new URL("ember-assets/changyounian-relieved-BbpArqR5.webp", import.meta.url).href, Fd = "" + new URL("ember-assets/changyounian-smile-DW4L1gw7.webp", import.meta.url).href, Bd = "" + new URL("ember-assets/changyounian-squint-K1sh8q-4.webp", import.meta.url).href, qd = "" + new URL("ember-assets/changyounian-worried-FQS8Z8hb.webp", import.meta.url).href, Wd = {
  sanniang: {
    body: Ec,
    arm: Lc,
    heads: {
      neutral: Ac,
      smile: Tc,
      teasing: jc,
      blush: Oc,
      rest: Zc,
      serious: Uc,
      worried: Nc,
      sad: Dc,
      displeased: Fc,
      fond: Bc,
      laugh: qc,
      surprised: Wc
    },
    headOrigin: "58% 34%",
    armOrigin: "34.6% 67%",
    armDirection: 1
  },
  anian: {
    body: Hc,
    arm: Gc,
    heads: {
      neutral: Vc,
      smile: nd,
      blush: Yc,
      displeased: Qc,
      fond: Kc,
      laugh: Xc,
      rest: Jc,
      sad: ed,
      surprised: td,
      worried: ad
    },
    headOrigin: "58.140% 35.108%",
    armOrigin: "40.814% 67.258%",
    armDirection: 1
  },
  kouzi: {
    body: sd,
    arm: id,
    heads: {
      neutral: rd,
      blush: vd,
      displeased: od,
      fond: ld,
      laugh: cd,
      sad: dd,
      serious: ud,
      smile: hd,
      surprised: fd,
      teasing: pd,
      worried: md
    },
    headOrigin: "44.500% 34.677%",
    armOrigin: "74.625% 64.687%",
    armDirection: -1
  },
  laobai: {
    body: gd,
    arm: yd,
    heads: {
      neutral: bd,
      smile: wd,
      teasing: xd,
      laugh: Md,
      blush: kd,
      fond: _d,
      serious: Sd,
      surprised: Rd,
      worried: Cd,
      sad: zd
    },
    headOrigin: "57.065% 33.026%",
    armOrigin: "25.543% 70.203%",
    armDirection: 1
  },
  bajin: {
    body: Pd,
    arm: Id,
    heads: {
      neutral: $d,
      angry: Ed,
      relieved: Ld,
      resigned: Ad,
      suspicious: Td,
      worried: jd
    },
    headOrigin: "55.618% 32.031%",
    armOrigin: "89.888% 63.203%",
    armDirection: -1
  },
  changyounian: {
    body: Od,
    arm: Ud,
    heads: {
      neutral: Zd,
      displeased: Nd,
      relieved: Dd,
      smile: Fd,
      squint: Bd,
      worried: qd
    },
    headOrigin: "56.559% 32.847%",
    armOrigin: "30.000% 70.620%",
    armDirection: 1
  }
}, Hd = {
  nod: {
    joint: "head",
    frames: [
      "translateY(0) rotate(0)",
      "translateY(2.5px) rotate(2deg)",
      "translateY(0) rotate(0)"
    ],
    duration: 1e3
  },
  tilt: {
    joint: "head",
    frames: [
      "rotate(0)",
      "rotate(-5deg)",
      "rotate(-5deg)",
      "rotate(0)"
    ],
    duration: 1750
  },
  shake: {
    joint: "head",
    frames: [
      "rotate(0)",
      "rotate(-2deg)",
      "rotate(2deg)",
      "rotate(-1deg)",
      "rotate(0)"
    ],
    duration: 1350
  },
  gesture: {
    joint: "arm",
    angles: [
      0,
      8,
      6,
      0
    ],
    duration: 1600
  },
  withdraw: {
    joint: "arm",
    angles: [
      0,
      -8,
      -8,
      0
    ],
    duration: 1800
  }
};
function Vd(e, t, s) {
  if (e === "none") return null;
  const a = Hd[e], n = a.joint === "arm" ? a.angles.map((i) => `rotate(${i * s}deg)`) : a.frames;
  return t[a.joint].animate(n.map((i) => ({ transform: i })), {
    duration: a.duration,
    easing: "ease-in-out",
    iterations: 1
  });
}
var Gd = ["src"], Yd = ["src"], Qd = ["src"], Kd = /* @__PURE__ */ Ne({
  __name: "DialogueActor",
  props: {
    person: {},
    performance: {},
    animate: { type: Boolean }
  },
  setup(e) {
    const t = e, s = q(null), a = q(null), n = q(null), i = ae(() => Wd[t.person]), o = q(!1), d = q(0);
    let r = 0, c = !1, l = !1, u = null, h, v;
    function p() {
      l = !0, u?.cancel(), u = null;
    }
    function g() {
      if (!(!t.animate || l || o.value || r < 3 || !c)) {
        if (document.hidden || v?.matches) {
          p();
          return;
        }
        a.value && n.value && (l = !0, u = Vd(t.performance?.gesture ?? "none", {
          head: a.value,
          arm: n.value
        }, i.value.armDirection));
      }
    }
    function y() {
      r++, g();
    }
    function w() {
      o.value = !0, p();
    }
    function f() {
      r = 0, o.value = !1, d.value++;
    }
    function x() {
      document.hidden && p();
    }
    function b() {
      v?.matches && p();
    }
    return me(() => t.animate, (M) => {
      M ? g() : p();
    }), It(() => {
      v = matchMedia("(prefers-reduced-motion: reduce)"), (document.hidden || v.matches) && p(), v.addEventListener("change", b), document.addEventListener("visibilitychange", x), h = new IntersectionObserver((M) => {
        c = M[0].isIntersecting && M[0].intersectionRatio >= 0.25, c ? g() : u && p();
      }, { threshold: 0.25 }), s.value && h.observe(s.value);
    }), Ga(p), vt(() => {
      p(), h?.disconnect(), v?.removeEventListener("change", b), document.removeEventListener("visibilitychange", x);
    }), (M, z) => ($(), I("span", {
      ref_key: "root",
      ref: s,
      class: zt(["ember-dialogue-actor", { "actor-failed": o.value }])
    }, [o.value ? ($(), I("button", {
      key: 1,
      type: "button",
      onClick: f
    }, R(m(ye).reloadArtwork), 1)) : ($(), I(se, { key: 0 }, [
      ($(), I("img", {
        key: "body-" + d.value,
        src: i.value.body,
        alt: "",
        width: "420",
        height: "495",
        decoding: "async",
        loading: "lazy",
        onLoad: y,
        onError: w
      }, null, 40, Gd)),
      ($(), I("img", {
        key: "head-" + d.value,
        ref_key: "head",
        ref: a,
        class: "actor-head",
        src: i.value.heads[e.performance?.expression ?? "neutral"],
        style: Vt({ transformOrigin: i.value.headOrigin }),
        alt: "",
        width: "420",
        height: "495",
        decoding: "async",
        loading: "lazy",
        onLoad: y,
        onError: w
      }, null, 44, Yd)),
      ($(), I("img", {
        key: "arm-" + d.value,
        ref_key: "arm",
        ref: n,
        class: "actor-arm",
        src: i.value.arm,
        style: Vt({ transformOrigin: i.value.armOrigin }),
        alt: "",
        width: "420",
        height: "495",
        decoding: "async",
        loading: "lazy",
        onLoad: y,
        onError: w
      }, null, 44, Qd))
    ], 64))], 2));
  }
}), Xd = /* @__PURE__ */ ct(Kd, [["__scopeId", "data-v-606c2ccc"]]), Jd = { class: "ember-npc-bubble" }, eu = { class: "ember-npc-line" }, tu = /* @__PURE__ */ Ne({
  __name: "DialogueBubble",
  props: {
    person: {},
    reply: {},
    performance: {},
    animate: { type: Boolean }
  },
  setup(e) {
    return (t, s) => ($(), I("div", Jd, [Ye(Xd, {
      person: e.person,
      performance: e.performance,
      animate: e.animate
    }, null, 8, [
      "person",
      "performance",
      "animate"
    ]), _("p", eu, R(e.reply), 1)]));
  }
}), au = /* @__PURE__ */ ct(tu, [["__scopeId", "data-v-83753490"]]), nu = { class: "ember-campaign" }, su = { class: "ember-health" }, ru = [
  "max",
  "value",
  "aria-label"
], iu = { class: "ember-objective" }, ou = { class: "ember-save" }, lu = ["aria-label"], cu = ["aria-label"], du = ["aria-label"], uu = ["aria-label"], hu = ["aria-label"], fu = {
  key: 3,
  class: "ember-boss"
}, pu = [
  "max",
  "value",
  "aria-label"
], mu = {
  key: 4,
  class: "ember-alarm"
}, vu = ["aria-label"], gu = ["disabled"], yu = ["disabled"], bu = {
  key: 6,
  class: "ember-conversation-notice",
  role: "status"
}, wu = { key: 0 }, xu = { class: "ember-prose" }, Mu = ["aria-label"], ku = {
  key: 0,
  class: "ember-panel-heading"
}, _u = ["aria-label"], Su = ["aria-pressed"], Ru = ["aria-pressed"], Cu = ["disabled"], zu = { class: "ember-prose ember-prologue" }, Pu = { class: "ember-objective-panel" }, $u = { class: "ember-journal" }, Iu = { class: "ember-pack-heading" }, Eu = { key: 0 }, Lu = { key: 1 }, Au = { class: "ember-relics" }, Tu = { key: 0 }, ju = ["disabled", "onClick"], Ou = { class: "ember-dialogue-heading" }, Zu = { class: "ember-person-heading" }, Uu = ["disabled"], Nu = { class: "ember-player-line" }, Du = {
  key: 0,
  class: "ember-dialogue-issue"
}, Fu = { key: 1 }, Bu = { class: "ember-prose" }, qu = {
  key: 2,
  class: "ember-prose"
}, Wu = {
  key: 0,
  class: "ember-dialogue-issue",
  role: "status"
}, Hu = { key: 0 }, Vu = { class: "ember-prose" }, Gu = { key: 1 }, Yu = ["disabled"], Qu = {
  key: 6,
  class: "ember-prose"
}, Ku = ["src"], Xu = { class: "ember-prose" }, Ju = ["src"], e1 = { class: "ember-prose" }, t1 = { class: "ember-continued" }, a1 = { class: "ember-relics" }, n1 = ["disabled", "onClick"], s1 = ["disabled"], r1 = { class: "ember-prose" }, i1 = ["disabled"], o1 = ["disabled"], l1 = ["disabled"], c1 = { class: "ember-pause-actions" }, d1 = ["aria-pressed"], u1 = { class: "ember-help ember-keyboard-help" }, h1 = { class: "ember-help ember-touch-help" }, f1 = /* @__PURE__ */ Ne({
  __name: "ExpeditionRoom",
  props: {
    bridge: {},
    chatIdentity: {},
    generationActive: { type: Boolean }
  },
  setup(e) {
    const t = e, s = ai(t.bridge, t.chatIdentity), a = ni(s), { view: n, notice: i, busy: o, blocked: d, talking: r, conversationFailure: c } = s, { current: l, dirty: u } = a, h = q(!0), v = q(!1), p = q(!1), g = q(0), y = q(!1), w = q(null), f = q(null), x = q("relics"), b = ae(() => f.value === "map" ? T.map : f.value === "journal" ? T.journal : f.value === "build" ? T.build : f.value === "person" ? it(M.value) : f.value === "passage" ? ne.passages[z.value].title : f.value === "arrival" ? ne.scenes.camp : f.value === "ending" || f.value === "prologue" ? fs : l.value?.phase === "reward" ? T.reward : l.value?.phase === "lost" ? T.fallen : T.pause), M = q("sanniang"), z = q("warning"), L = q(null), A = q({}), j = ae({
      get: () => A.value[M.value] ?? "",
      set: (N) => {
        A.value[M.value] = N;
      }
    }), P = /* @__PURE__ */ new Map(), U = q(null), D = q(null), J = q(null), ie = ae((N) => {
      const E = l.value?.facts ?? [];
      return N && N.size === E.length && E.every((O) => N.has(O)) ? N : new Set(E);
    }), F = ae(() => l.value ? {
      definition: _e[l.value.location.scene],
      location: l.value.location,
      facts: ie.value,
      people: l.value.people
    } : null), Z = ae(() => l.value ? { "--scene-art": `url("${xs[l.value.location.scene]}")` } : void 0), H = ae(() => l.value?.outfit ?? n.value?.data.equippedOutfit ?? "traveler"), oe = ae(() => !y.value || !l.value || !!l.value.pendingParley || h.value || !!f.value || !!i.value || r.value || p.value || t.generationActive || !["exploration", "battle"].includes(l.value.phase) || !n.value?.ready || n.value.pending || n.value.writeState !== "ready"), Te = ae(() => l.value?.battle?.enemies.find((N) => we(N.kind))), ge = ae(() => l.value?.conversations[M.value] ?? []), ce = q(null), xe = ae(() => l.value?.collection.map((N) => {
      const E = l.value.equipped.includes(N.id) ? l.value.equipped.filter((O) => O !== N.id) : [...l.value.equipped, N.id];
      return {
        ...N,
        equipped: E,
        issue: Yr(l.value, E)
      };
    }) ?? []), Oe = si(() => {
      s.error.value = K.presentationError.sound, v.value = !1;
    });
    let Xe = !1;
    function dt() {
      (f.value || l.value && ["exploration", "battle"].includes(l.value.phase)) && re();
    }
    async function qe() {
      await Re({ type: "resolve_parley" }) && (f.value = null, await Tt(), J.value?.focus());
    }
    gn(L, dt), Bn(() => y.value ? f.value ? (dt(), !0) : h.value ? !1 : (Pe(), !0) : w.value?.back() ?? !1), gn(D, () => {
      !o.value && !p.value && !t.generationActive && s.dismissError();
    });
    function Pe() {
      h.value = !0, a.flush();
    }
    function We() {
      f.value = null, Pe();
    }
    async function He(N) {
      h.value = !0, f.value = N, N === "build" && (x.value = "relics"), await a.flush();
    }
    async function re() {
      if (l.value?.pendingParley) {
        l.value.pendingParley.decision === "pass" && await qe();
        return;
      }
      !i.value && !t.generationActive && (y.value = !0, f.value = null, h.value = !1, await Tt(), J.value?.focus());
    }
    function Ze() {
      y.value = !0, l.value?.pendingParley ? (M.value = l.value.pendingParley.enemy, f.value = "person", h.value = !0) : re();
    }
    async function Re(N) {
      if (h.value = !0, !await a.flush()) return !1;
      const E = await s.act(N);
      return E && (a.sync(), h.value = !1, f.value || (await Tt(), J.value?.focus())), E;
    }
    async function Ut(N) {
      await Re({
        type: l.value ? "restart" : "start",
        ...N,
        outfit: H.value
      }) && (y.value = !0, f.value = "prologue");
    }
    function Qt() {
      h.value = !0, f.value = null, y.value = !1, a.flush();
    }
    async function be(N) {
      if (!l.value) return;
      h.value = !0;
      const E = [...us(l.value), ...va(l.value.location.scene, l.value.location.position, new Set(l.value.facts))].find((W) => W.target.id === N), O = E?.kind === "object" ? E.target : null;
      if (O?.kind === "person" || O?.kind === "enemy") {
        M.value = O.kind === "person" ? O.person : O.enemy, f.value = "person", await a.flush();
        return;
      }
      await Re({
        type: "interact",
        id: N
      }) && O?.kind === "inspect" && (z.value = O.passage, f.value = "passage");
    }
    async function Ve() {
      const N = M.value, E = j.value.trim();
      d.value || !E || !await a.flush() || (P.delete(N), await s.talk(N, E) && (A.value[N]?.trim() === E && (A.value[N] = ""), a.sync()));
    }
    function ut() {
      const N = U.value;
      N && P.set(M.value, {
        top: N.scrollTop,
        latest: N.scrollHeight - N.clientHeight - N.scrollTop < 32
      });
    }
    async function Je() {
      await a.recover() && (h.value = !0, g.value++);
    }
    return me(() => t.generationActive, (N) => {
      N && Pe();
    }), me(() => l.value?.pendingParley, (N) => {
      N && (M.value = N.enemy, f.value = "person", h.value = !0);
    }, { immediate: !0 }), me(v, (N) => {
      Oe.enable(N);
    }), me(l, (N) => {
      v.value && N?.battle && Oe.tick(N.battle);
    }), me(() => n.value?.data, (N, E) => {
      if (!N?.active || !E?.active || N.active.id !== E.active.id) return;
      const O = new Set(E.active.facts), W = new Set(N.active.facts);
      !O.has("chapter_completed") && W.has("chapter_completed") ? f.value = "ending" : !O.has("captives_arrived") && W.has("captives_arrived") && (f.value = "arrival");
    }), me(() => l.value?.id, () => {
      A.value = {}, P.clear();
    }), me([f, M], () => {
      ce.value = null;
    }), me(i, (N) => {
      N && (ce.value = null);
    }), me(() => [M.value, ge.value], ([N, E], [O, W]) => {
      const Nt = E.filter((ht) => ht.kind === "dialogue").at(-1);
      N === O && f.value === "person" && Nt && !W.some((ht) => ht.id === Nt.id) && (ce.value = Nt.id);
    }), me([U, M], ([N, E]) => {
      const O = P.get(E);
      N && (N.scrollTop = O && !O.latest ? O.top : N.scrollHeight);
    }, { flush: "post" }), me(() => [ge.value.length, r.value], async () => {
      await Tt();
      const N = U.value;
      if (N && P.get(M.value)?.latest !== !1) {
        const E = ce.value ? N.querySelector('[data-fresh-reply="true"]') : null;
        N.scrollTop = E && E.offsetHeight > N.clientHeight ? E.getBoundingClientRect().top - N.getBoundingClientRect().top + N.scrollTop - 12 : N.scrollHeight;
      }
    }), It(async () => {
      await s.read(), Xe = !0;
    }), Nn(() => {
      Xe && !u.value && s.read();
    }), Ga(() => {
      ce.value = null, Pe();
    }), vt(() => {
      a.dispose(), s.dispose(), Oe.dispose();
    }), (N, E) => ($(), I("section", nu, [
      y.value ? G("", !0) : ($(), wt(Rc, {
        key: 0,
        ref_key: "entry",
        ref: w,
        campaign: m(l),
        ready: !!m(n)?.ready,
        busy: m(o),
        blocked: m(d) || e.generationActive,
        onStart: Ut,
        onContinue: Ze
      }, null, 8, [
        "campaign",
        "ready",
        "busy",
        "blocked"
      ])),
      y.value && m(l) && F.value ? ($(), wt(Xi, {
        key: g.value,
        ref_key: "field",
        ref: J,
        world: F.value,
        traveler: m(l).traveler,
        paused: oe.value,
        weapon: m(l).weapon,
        outfit: H.value,
        battle: m(l).battle,
        onInput: m(a).input,
        onInteract: be,
        onPause: Pe,
        onResume: re,
        onError: E[0] || (E[0] = (O) => p.value = !0)
      }, {
        status: mn(() => [m(l) ? ($(), I(se, { key: 0 }, [
          _("div", su, [_("meter", {
            min: 0,
            max: m(V).maxHp,
            value: m(l).hp,
            "aria-label": m(K).hp
          }, null, 8, ru), _("span", null, R(Math.ceil(m(l).hp)) + " / " + R(m(V).maxHp), 1)]),
          _("p", iu, R(m(Mn)(m(l))), 1),
          _("small", ou, R(m(r) ? m(T).thinking : m(o) ? m(T).saving : m(u) ? "" : m(T).saved), 1)
        ], 64)) : G("", !0)]),
        overlay: mn(() => [...E[16] || (E[16] = [_("span", null, null, -1)])]),
        _: 1
      }, 8, [
        "world",
        "traveler",
        "paused",
        "weapon",
        "outfit",
        "battle",
        "onInput"
      ])) : G("", !0),
      y.value && m(l) && !m(l).pendingParley ? ($(), I("nav", {
        key: 2,
        class: "ember-tools",
        "aria-label": m(T).prepare
      }, [
        _("button", {
          type: "button",
          "aria-label": m(T).map,
          onClick: E[1] || (E[1] = (O) => He("map"))
        }, [Ye(xt, { name: "map" }), _("span", null, R(m(T).map), 1)], 8, cu),
        _("button", {
          type: "button",
          "aria-label": m(T).build,
          onClick: E[2] || (E[2] = (O) => He("build"))
        }, [Ye(xt, { name: "bag" }), _("span", null, R(m(T).build), 1)], 8, du),
        _("button", {
          type: "button",
          "aria-label": m(T).journal,
          onClick: E[3] || (E[3] = (O) => He("journal"))
        }, [Ye(xt, { name: "journal" }), _("span", null, R(m(T).journal), 1)], 8, uu),
        _("button", {
          type: "button",
          "aria-label": m(T).pause,
          onClick: We
        }, [Ye(xt, { name: "pause" }), _("span", null, R(m(T).pause), 1)], 8, hu)
      ], 8, lu)) : G("", !0),
      y.value && Te.value && !f.value ? ($(), I("div", fu, [_("strong", null, R(m(ja)[Te.value.kind]), 1), _("meter", {
        min: "0",
        max: Te.value.maxHp,
        value: Te.value.hp,
        "aria-label": m(ja)[Te.value.kind]
      }, null, 8, pu)])) : G("", !0),
      y.value && m(l)?.phase === "battle" && ["gate", "beacon"].includes(m(l).location.scene) && !ie.value.has("alarm_silenced") ? ($(), I("div", mu, R(ie.value.has("alarm_raised") ? m(T).alarmRaised : m(T).alarmSeconds(Math.ceil((m(qt).alarmTicks - m(l).alarmTicks) / m(V).hz))), 1)) : G("", !0),
      m(i) || p.value || e.generationActive ? ($(), I("section", {
        key: 5,
        ref_key: "noticePanel",
        ref: D,
        class: "ember-notice",
        role: "alertdialog",
        "aria-modal": "true",
        "aria-label": m(T).noticeTitle,
        tabindex: "-1"
      }, [_("p", null, R(p.value ? m(T).renderError : e.generationActive ? m(T).generation : m(i)), 1), p.value ? ($(), I("button", {
        key: 0,
        type: "button",
        onClick: E[4] || (E[4] = (O) => {
          p.value = !1, g.value++;
        })
      }, R(m(T).reload), 1)) : m(s).dataInvalid.value && !e.generationActive ? ($(), I(se, { key: 1 }, [_("p", null, R(m(T).rebuildWarning), 1), _("button", {
        type: "button",
        disabled: m(o),
        onClick: E[5] || (E[5] = (...O) => m(s).rebuild && m(s).rebuild(...O))
      }, R(m(T).rebuild), 9, gu)], 64)) : e.generationActive ? G("", !0) : ($(), I("button", {
        key: 2,
        type: "button",
        disabled: m(o),
        onClick: E[6] || (E[6] = (O) => m(s).recoveryRequired.value ? Je() : m(s).dismissError())
      }, R(m(s).recoveryRequired.value ? m(T).recover : m(T).acknowledge), 9, yu))], 8, vu)) : G("", !0),
      m(c) && !m(i) && (f.value !== "person" || M.value !== m(c).person) ? ($(), I("aside", bu, [
        _("strong", null, R(m(it)(m(c).person)), 1),
        _("p", null, R(m(kt)(m(c))), 1),
        m(c).text ? ($(), I("details", wu, [_("summary", null, R(m(T).receivedReply), 1), _("p", xu, R(m(c).text), 1)])) : G("", !0),
        _("button", {
          type: "button",
          onClick: E[7] || (E[7] = (...O) => m(s).dismissConversationFailure && m(s).dismissConversationFailure(...O))
        }, R(m(T).acknowledge), 1)
      ])) : G("", !0),
      y.value && m(l) && !m(i) && !p.value && !e.generationActive && (f.value || h.value || m(l).phase === "reward" || m(l).phase === "lost") ? ($(), I("div", {
        key: 7,
        class: "ember-curtain",
        style: Vt(f.value === "person" ? Z.value : void 0)
      }, [_("section", {
        ref_key: "dialog",
        ref: L,
        class: zt(["ember-panel", {
          "ember-wide": f.value === "map" || f.value === "build" && x.value === "wardrobe",
          "ember-map-panel": f.value === "map",
          "ember-wardrobe-panel": f.value === "build" && x.value === "wardrobe",
          "ember-dialogue": f.value === "person"
        }]),
        role: "dialog",
        "aria-modal": "true",
        "aria-label": b.value,
        tabindex: "-1"
      }, [f.value !== "map" && f.value !== "person" ? ($(), I("header", ku, [
        _("h2", null, R(b.value), 1),
        f.value === "build" ? ($(), I("nav", {
          key: 0,
          class: "ember-pack-tabs",
          "aria-label": m(T).build
        }, [_("button", {
          type: "button",
          "aria-pressed": x.value === "relics",
          onClick: E[8] || (E[8] = (O) => x.value = "relics")
        }, R(m(le).equipment), 9, Su), _("button", {
          type: "button",
          "aria-pressed": x.value === "wardrobe",
          onClick: E[9] || (E[9] = (O) => x.value = "wardrobe")
        }, R(m(T).wardrobe), 9, Ru)], 8, _u)) : G("", !0),
        f.value !== "prologue" && m(l).pendingParley?.decision !== "attack" && (f.value || m(l).phase !== "lost" && m(l).phase !== "reward") ? ($(), I("button", {
          key: 1,
          type: "button",
          disabled: !!m(l).pendingParley && m(d),
          onClick: re
        }, R(m(T).close), 9, Cu)) : G("", !0)
      ])) : G("", !0), f.value === "map" ? ($(), wt(Do, {
        key: 1,
        campaign: m(l),
        onClose: re
      }, null, 8, ["campaign"])) : f.value === "prologue" ? ($(), I(se, { key: 2 }, [_("p", zu, R(m(T).opening), 1), _("button", {
        class: "ember-primary",
        type: "button",
        onClick: re
      }, R(m(T).start), 1)], 64)) : f.value === "journal" ? ($(), I(se, { key: 3 }, [_("p", Pu, R(m(Mn)(m(l))), 1), _("ol", $u, [($(!0), I(se, null, Ee(m(l).facts, (O) => ($(), I("li", { key: O }, R(m(Yn)[O]), 1))), 128))])], 64)) : f.value === "build" ? ($(), I(se, { key: 4 }, [x.value === "wardrobe" && m(n) ? ($(), wt(fl, {
        key: 0,
        data: m(n).data,
        traveler: m(l).traveler,
        balance: m(n).balance,
        blocked: m(d),
        weapon: m(l).weapon,
        onCommand: Re
      }, null, 8, [
        "data",
        "traveler",
        "balance",
        "blocked",
        "weapon"
      ])) : ($(), I(se, { key: 1 }, [
        _("div", Iu, [_("strong", null, R(m(l).traveler.name), 1), _("span", null, R(m(le).genders[m(l).traveler.gender]) + " · " + R(m(le).identityRole), 1)]),
        _("small", null, R(m(T).slots(m(l).equipped.length, m(V).relicSlots)), 1),
        _("p", null, R(m(ft)[m(l).weapon].name) + " · " + R(m(er)(m(l).weapon)), 1),
        m(l).location.scene !== "camp" ? ($(), I("p", Eu, R(m(T).safeBuild), 1)) : G("", !0),
        m(l).collection.length ? G("", !0) : ($(), I("p", Lu, R(m(T).emptyBuild), 1)),
        _("div", Au, [($(!0), I(se, null, Ee(xe.value, (O) => ($(), I("article", { key: O.id }, [
          Ye(xt, { name: O.id }, null, 8, ["name"]),
          _("h3", null, [Ue(R(m(Xt)[O.id].name) + " ", 1), _("small", null, R(m(K).rank(O.rank)), 1)]),
          _("p", null, R(m(Xt)[O.id].detail), 1),
          O.issue === "dependency" || O.issue === "capacity" ? ($(), I("small", Tu, R(m(T).loadoutIssue[O.issue]), 1)) : G("", !0),
          _("button", {
            type: "button",
            disabled: m(d) || !!O.issue,
            onClick: (W) => Re({
              type: "loadout",
              equipped: O.equipped
            })
          }, R(m(l).equipped.includes(O.id) ? m(T).takeOff : m(T).putOn), 9, ju)
        ]))), 128))])
      ], 64))], 64)) : f.value === "person" ? ($(), I(se, { key: 5 }, [
        _("header", Ou, [
          _("div", Zu, [_("h2", null, R(m(it)(M.value)), 1), _("small", null, R(m(ne).scenes[m(l).location.scene]), 1)]),
          ($(), wt(Fl, {
            key: M.value,
            campaign: m(l),
            person: M.value,
            draft: j.value
          }, null, 8, [
            "campaign",
            "person",
            "draft"
          ])),
          m(l).pendingParley?.decision !== "attack" ? ($(), I("button", {
            key: 0,
            type: "button",
            disabled: !!m(l).pendingParley && m(d),
            onClick: re
          }, R(m(T).close), 9, Uu)) : G("", !0)
        ]),
        _("div", {
          ref_key: "transcript",
          ref: U,
          class: "ember-dialogue-scroll",
          role: "log",
          "aria-live": "polite",
          onScroll: ut
        }, [
          ($(!0), I(se, null, Ee(ge.value, (O) => ($(), I(se, { key: O.id }, [
            _("p", Nu, [_("small", null, R(m(l).traveler.name), 1), Ue(R(O.player), 1)]),
            O.issue ? ($(), I("p", Du, R(m(ye).issues[O.issue]), 1)) : G("", !0),
            O.kind === "receipt" && O.issue === "reply_invalid" ? ($(), I("details", Fu, [_("summary", null, R(m(ye).rawReply), 1), _("p", Bu, R(O.reply), 1)])) : O.kind === "receipt" ? ($(), I("p", qu, R(O.reply), 1)) : ($(), wt(au, {
              key: 3,
              person: M.value,
              reply: O.reply,
              performance: O.performance,
              animate: ce.value === O.id,
              "data-fresh-reply": ce.value === O.id
            }, null, 8, [
              "person",
              "reply",
              "performance",
              "animate",
              "data-fresh-reply"
            ]))
          ], 64))), 128)),
          m(c)?.person === M.value && !ge.value.some((O) => O.id === m(c)?.actionId) ? ($(), I("div", Wu, [
            _("p", null, R(m(kt)(m(c))), 1),
            m(c).text ? ($(), I("details", Hu, [_("summary", null, R(m(T).receivedReply), 1), _("p", Vu, R(m(c).text), 1)])) : G("", !0),
            _("button", {
              type: "button",
              onClick: E[10] || (E[10] = (...O) => m(s).dismissConversationFailure && m(s).dismissConversationFailure(...O))
            }, R(m(T).acknowledge), 1)
          ])) : G("", !0),
          m(r) ? ($(), I("p", Gu, R(m(T).thinking), 1)) : G("", !0)
        ], 544),
        m(l).pendingParley?.decision === "attack" ? ($(), I("button", {
          key: 0,
          class: "ember-primary",
          type: "button",
          disabled: m(d),
          onClick: qe
        }, R(m(ye).fight), 9, Yu)) : G("", !0),
        m(l).pendingParley ? G("", !0) : ($(), wt(Ic, {
          key: 1,
          modelValue: j.value,
          "onUpdate:modelValue": E[11] || (E[11] = (O) => j.value = O),
          blocked: m(d),
          talking: m(r),
          onSend: Ve,
          onCancel: m(s).cancelTalk
        }, null, 8, [
          "modelValue",
          "blocked",
          "talking",
          "onCancel"
        ]))
      ], 64)) : f.value === "passage" ? ($(), I("p", Qu, R(m(ne).passages[z.value].body), 1)) : f.value === "arrival" ? ($(), I(se, { key: 7 }, [
        _("img", {
          class: "ember-story-art",
          src: m(jn).arrival,
          alt: "",
          decoding: "async"
        }, null, 8, Ku),
        _("p", Xu, R(m(T).received), 1),
        _("button", {
          class: "ember-primary",
          type: "button",
          onClick: re
        }, R(m(T).resume), 1)
      ], 64)) : f.value === "ending" ? ($(), I(se, { key: 8 }, [
        _("img", {
          class: "ember-story-art",
          src: m(jn).ending,
          alt: "",
          decoding: "async"
        }, null, 8, Ju),
        _("h2", null, R(m(T).endingTitle), 1),
        _("p", e1, R(m(T).ending), 1),
        _("strong", t1, R(m(T).continued), 1),
        _("p", null, R(m(T).optional), 1),
        _("button", {
          class: "ember-primary",
          type: "button",
          onClick: re
        }, R(m(T).remain), 1)
      ], 64)) : m(l).phase === "reward" ? ($(), I(se, { key: 9 }, [
        _("p", null, R(m(T).rewardDetail), 1),
        _("div", a1, [($(!0), I(se, null, Ee(m(l).offers, (O) => ($(), I("button", {
          key: O.id,
          type: "button",
          disabled: m(d),
          onClick: (W) => Re({
            type: "relic",
            id: O.id
          })
        }, [
          Ye(xt, { name: O.id }, null, 8, ["name"]),
          _("h3", null, [Ue(R(m(Xt)[O.id].name) + " ", 1), _("small", null, R(m(K).rank(O.rank)), 1)]),
          _("p", null, R(m(Xt)[O.id].detail), 1)
        ], 8, n1))), 128))]),
        _("button", {
          type: "button",
          disabled: m(d),
          onClick: E[12] || (E[12] = (O) => Re({ type: "leave" }))
        }, R(m(T).skip), 9, s1)
      ], 64)) : m(l).phase === "lost" ? ($(), I(se, { key: 10 }, [
        _("p", r1, R(m(T).fallenDetail), 1),
        _("button", {
          class: "ember-primary",
          type: "button",
          disabled: m(d),
          onClick: E[13] || (E[13] = (O) => Re({ type: "retry" }))
        }, R(m(T).retry), 9, i1),
        _("button", {
          type: "button",
          disabled: m(d),
          onClick: E[14] || (E[14] = (O) => Re({ type: "retreat" }))
        }, R(m(T).retreat), 9, o1)
      ], 64)) : ($(), I(se, { key: 11 }, [
        _("button", {
          class: "ember-primary",
          type: "button",
          disabled: !!m(i) || e.generationActive,
          onClick: re
        }, R(m(T).resume), 9, l1),
        _("div", c1, [_("button", {
          type: "button",
          "aria-pressed": v.value,
          onClick: E[15] || (E[15] = (O) => v.value = !v.value)
        }, R(m(T).sound), 9, d1)]),
        _("details", null, [
          _("summary", null, R(m(le).controls), 1),
          _("p", u1, R(m(T).controls), 1),
          _("p", h1, R(m(T).touchControls), 1)
        ]),
        _("button", {
          type: "button",
          onClick: Qt
        }, R(m(le).title), 1)
      ], 64))], 10, Mu)], 4)) : G("", !0)
    ]));
  }
}), _1 = f1;
export {
  _1 as default
};
