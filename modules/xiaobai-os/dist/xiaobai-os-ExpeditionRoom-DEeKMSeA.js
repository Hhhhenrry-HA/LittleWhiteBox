/* eslint-disable */
import { B as E, E as xt, F as kn, H as _e, L as ea, M as _n, N as Zt, Q as Sn, T as Xe, U as en, Y as Se, Z as tn, _ as oe, b as V, ct as p, dt as P, f as ps, i as an, it as Ct, j as Ft, lt as Et, m as ne, nt as J, p as rt, r as Pn, st as ms, u as In, ut as Pa, v as S, w as Le, x as $, y as qt } from "./xiaobai-os-app-navigation-DbF27MCy.js";
import { n as va, t as ys } from "./xiaobai-os-context-tokens-D2DVKxEb.js";
import { t as Fa } from "./xiaobai-os-_plugin-vue_export-helper-Dj7HTbfw.js";
import { t as gs } from "./xiaobai-os-constants-CDXgazQ7.js";
import { C as zn, Ct as vs, Dt as bs, Ft as _t, J as xs, Nt as nn, Q as ws, S as St, St as sn, X as Ms, Y as vt, a as ks, at as Cn, bt as En, c as _s, f as Ss, g as Ia, gt as Ps, ht as Is, i as zs, m as Cs, t as An, u as qa, v as on, vt as ba, w as rn, x as Es, xt as As, yt as $n } from "./xiaobai-os-three.module-CTsY3HDb.js";
import { n as $s, o as Ts } from "./xiaobai-os-performance-C_L35DGq.js";
import { t as Zs } from "./xiaobai-os-BufferGeometryUtils-DP7IVjMs.js";
import { C as Tn, S as js, _ as Pe, a as gt, b as za, c as me, d as xa, f as Ca, g as Zn, h as Rs, i as Dt, l as j, m as ie, n as Ea, o as ct, p as Be, r as kt, s as wa, t as Y, u as Gt, v as W, x as ye, y as dt } from "./xiaobai-os-copy-B9-7_xqW.js";
function ta(e) {
  return e.seed = Math.imul(e.seed, 1664525) + 1013904223 >>> 0, e.seed / 4294967296;
}
function Os(e, t, s) {
  const a = [...t], n = [];
  for (; a.length && n.length < s; ) n.push(a.splice(Math.floor(ta(e) * a.length), 1)[0]);
  return n;
}
function Ma() {
  return Array.from(crypto.getRandomValues(new Uint32Array(4)), (e) => e.toString(16).padStart(8, "0")).join("");
}
function pe(e, t) {
  throw Object.assign(/* @__PURE__ */ new Error(`expedition_${e}`), {
    code: `expedition_${e}`,
    ...t === void 0 ? {} : { cause: t }
  });
}
var lt = {
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
function ka(e, t) {
  const s = lt[t];
  return t === "traveler" || e.purchases.some((a) => a.id === t) || s.achievement !== null && e.awards.some((a) => a.key === s.achievement);
}
var he = (e, t, s = 0) => ({
  family: e,
  chapter: s,
  ...t ? { requires: [t] } : {}
}), te = (e, t = 0) => ({
  family: e,
  weapons: [e],
  chapter: t
}), At = {
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
  riposte: te("blade"),
  "shield-break": te("blade"),
  "cleave-wave": te("blade", 1),
  duelist: te("blade"),
  "blood-dance": te("blade"),
  valor: te("blade", 1),
  ricochet: te("bow"),
  "split-arrow": te("bow"),
  pinning: te("bow"),
  "distance-draw": te("bow"),
  "hunter-mark": te("bow", 1),
  trapper: te("bow"),
  nova: te("staff"),
  inferno: {
    ...te("staff"),
    requires: [["cinder"]]
  },
  fracture: {
    ...te("staff"),
    requires: [[
      "frost",
      "nova",
      "orbitals"
    ]]
  },
  overload: {
    ...te("staff", 1),
    requires: [["cinder"], [
      "frost",
      "nova",
      "orbitals"
    ]]
  },
  orbitals: te("staff"),
  convergence: te("staff"),
  backstab: te("daggers"),
  shadowstep: te("daggers"),
  hemorrhage: te("daggers"),
  "execution-chain": te("daggers", 1),
  smoke: te("daggers"),
  venom: te("daggers"),
  "pack-bond": te("grimoire"),
  martyr: te("grimoire"),
  covenant: te("grimoire"),
  frenzy: te("grimoire"),
  "soul-harvest": te("grimoire", 1),
  command: te("grimoire"),
  shrapnel: te("cannon"),
  minefield: te("cannon"),
  overclock: te("cannon"),
  bunker: te("cannon"),
  salvage: te("cannon"),
  railgun: te("cannon", 1)
}, I = (e, t) => e.relics.find((s) => s.id === t)?.rank ?? 0;
function Ls(e) {
  return Zn.filter((t) => !At[t].weapons || At[t].weapons.includes(e));
}
function jn(e, t, s = null) {
  const a = At[t];
  return (!a.weapons || a.weapons.includes(e.weapon)) && (!a.requires || a.requires.every((n) => n.some((i) => i !== s && I(e, i) > 0)));
}
function ve(e) {
  throw Object.assign(/* @__PURE__ */ new Error(`expedition_world_${e}`), { code: `expedition_world_${e}` });
}
var Ns = 1e-9;
function bt(e, t, s) {
  return {
    x: e.origin.x + (t + 0.5) * e.cellSize,
    y: e.origin.y + (s + 0.5) * e.cellSize
  };
}
function ht(e, t) {
  return {
    column: Math.floor((t.x - e.origin.x) / e.cellSize),
    row: Math.floor((t.y - e.origin.y) / e.cellSize)
  };
}
function Rn(e, t) {
  const s = e.rows[0]?.length ?? 0, a = e.rows.length;
  (!s || !a || !Number.isFinite(e.cellSize) || e.cellSize <= 0 || !Number.isFinite(e.origin.x) || !Number.isFinite(e.origin.y) || e.rows.some((o) => o.length !== s || /[^.# ]/.test(o))) && ve("map_invalid");
  const n = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), r = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Set();
  for (const o of e.gates) {
    (!o.id || n.has(o.id) || !o.cells.length) && ve("map_invalid"), n.add(o.id);
    const c = !t.has(o.id);
    c && d.add(o.id);
    for (const { column: l, row: h } of o.cells) {
      (!Number.isInteger(l) || !Number.isInteger(h) || l < 0 || l >= s || e.rows[h]?.[l] !== ".") && ve("map_invalid");
      const u = h * s + l;
      i.has(u) && ve("map_invalid"), i.add(u), c && r.add(u);
    }
  }
  for (const o of t) n.has(o) || ve("gate_unknown");
  return {
    map: e,
    columns: s,
    rows: a,
    closedGates: d,
    blocked(o, c) {
      return o < 0 || o >= s || c < 0 || c >= a || e.rows[c][o] !== "." || r.has(c * s + o);
    }
  };
}
function Kt(e, t, s, a) {
  const n = Math.max(t - e.x, 0, e.x - t - a), i = Math.max(s - e.y, 0, e.y - s - a);
  return n * n + i * i;
}
function Bt(e, t, s) {
  const a = s.x - t.x, n = s.y - t.y, i = a * a + n * n, r = i === 0 ? 0 : Math.max(0, Math.min(1, ((e.x - t.x) * a + (e.y - t.y) * n) / i));
  return (e.x - t.x - a * r) ** 2 + (e.y - t.y - n * r) ** 2;
}
function On(e, t, s, a, n) {
  let i = 0, r = 1;
  for (const [d, o, c] of [[
    e.x,
    t.x - e.x,
    s
  ], [
    e.y,
    t.y - e.y,
    a
  ]]) if (o === 0) {
    if (d <= c || d >= c + n) return !1;
  } else {
    const l = (c - d) / o, h = (c + n - d) / o;
    if (i = Math.max(i, Math.min(l, h)), r = Math.min(r, Math.max(l, h)), i >= r) return !1;
  }
  return i < r;
}
function Fs(e, t, s, a, n) {
  return On(e, t, s, a, n) ? 0 : Math.min(Kt(e, s, a, n), Kt(t, s, a, n), Bt({
    x: s,
    y: a
  }, e, t), Bt({
    x: s + n,
    y: a
  }, e, t), Bt({
    x: s,
    y: a + n
  }, e, t), Bt({
    x: s + n,
    y: a + n
  }, e, t));
}
function Ie(e, t, s, a = 0) {
  (![
    t.x,
    t.y,
    s.x,
    s.y,
    a
  ].every(Number.isFinite) || a < 0) && ve("input_invalid");
  const { map: n } = e, i = n.cellSize, r = ht(n, {
    x: Math.min(t.x, s.x) - a,
    y: Math.min(t.y, s.y) - a
  }), d = ht(n, {
    x: Math.max(t.x, s.x) + a,
    y: Math.max(t.y, s.y) + a
  });
  for (let o = r.row; o <= d.row; o++) for (let c = r.column; c <= d.column; c++) {
    if (!e.blocked(c, o)) continue;
    const l = n.origin.x + c * i, h = n.origin.y + o * i;
    if (a === 0 ? On(t, s, l, h, i) || Kt(t, l, h, i) === 0 && Kt(s, l, h, i) === 0 : Fs(t, s, l, h, i) < a * a - Ns) return !1;
  }
  return !0;
}
var Ke = (e, t, s) => Ie(e, t, t, s);
function Da(e, t, s, a) {
  [s.x, s.y].every(Number.isFinite) || ve("input_invalid"), Ke(e, t, a) || ve("position_blocked");
  const n = Math.hypot(s.x, s.y);
  if (n === 0) return;
  const i = Math.ceil(n / (e.map.cellSize / 4)), r = s.x / i, d = s.y / i;
  for (let o = 0; o < i; o++) {
    const c = {
      x: t.x + r,
      y: t.y + d
    };
    if (Ie(e, t, c, a)) {
      Object.assign(t, c);
      continue;
    }
    const l = Math.abs(r) >= Math.abs(d) ? ["x", "y"] : ["y", "x"];
    for (const h of l) {
      const u = {
        ...t,
        [h]: t[h] + (h === "x" ? r : d)
      };
      Ie(e, t, u, a) && Object.assign(t, u);
    }
  }
}
var tt = Math.PI * 2, F = (e, t) => Math.hypot(e.x - t.x, e.y - t.y), ue = (e, t) => Math.atan2(t.y - e.y, t.x - e.x), Ba = (e) => (e - 1) * Math.PI / 4 - Math.PI / 2, Re = (e, t, s) => ({
  x: e.x + Math.cos(t) * s,
  y: e.y + Math.sin(t) * s
});
function Ne(e, t, s, a, n, i) {
  if (i) {
    Da(i.space, t, {
      x: Math.cos(s) * a,
      y: Math.sin(s) * a
    }, n);
    return;
  }
  t.x += Math.cos(s) * a, t.y += Math.sin(s) * a;
  for (const r of e.obstacles) {
    const d = F(t, r), o = n + r.radius;
    if (d < o) {
      const c = d < 1e-3 ? s : ue(r, t);
      t.x = r.x + Math.cos(c) * o, t.y = r.y + Math.sin(c) * o;
    }
  }
  t.x = Math.max(-W.arena + n, Math.min(W.arena - n, t.x)), t.y = Math.max(-W.arena + n, Math.min(W.arena - n, t.y));
}
function qs(e, t, s, a) {
  const n = e.x - t.x, i = e.y - t.y, r = Math.max(0, Math.min(a, n * Math.cos(s) + i * Math.sin(s)));
  return Math.hypot(n - Math.cos(s) * r, i - Math.sin(s) * r);
}
var Ds = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
  [1, -1],
  [1, 1],
  [-1, 1],
  [-1, -1]
], _a = (e, t) => Math.hypot(t.x - e.x, t.y - e.y);
function $t(e, t, s, a) {
  if (!Ke(e, t, a) || !Ke(e, s, a)) return null;
  if (Ie(e, t, s, a)) return [{ ...s }];
  const { map: n, columns: i, rows: r } = e, d = ht(n, t), o = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Set(), h = [];
  function u(f) {
    return bt(n, f % i, Math.floor(f / i));
  }
  function y(f, g, v, b) {
    if (f < 0 || f >= i || g < 0 || g >= r) return;
    const m = g * i + f;
    l.has(m) || (o.get(m) ?? 1 / 0) <= v || (o.set(m, v), c.set(m, b), h.push({
      id: m,
      score: v + _a(u(m), s)
    }));
  }
  for (let f = -1; f <= 1; f++) for (let g = -1; g <= 1; g++) {
    const v = d.column + g, b = d.row + f, m = bt(n, v, b);
    Ie(e, t, m, a) && y(v, b, _a(t, m), -1);
  }
  for (; h.length; ) {
    h.sort((v, b) => b.score - v.score || b.id - v.id);
    const { id: f } = h.pop();
    if (l.has(f)) continue;
    l.add(f);
    const g = u(f);
    if (Ie(e, g, s, a)) {
      const v = [{ ...s }];
      let b = f;
      for (; b !== -1; )
        v.push(u(b)), b = c.get(b);
      v.reverse();
      const m = [];
      let x = t;
      for (let w = 0; w < v.length; ) {
        let k = w;
        for (; k + 1 < v.length && Ie(e, x, v[k + 1], a); ) k++;
        x = v[k], m.push(x), w = k + 1;
      }
      return m;
    }
    for (const [v, b] of Ds) {
      const m = f % i + v, x = Math.floor(f / i) + b, w = bt(n, m, x);
      Ie(e, g, w, a) && y(m, x, o.get(f) + _a(g, w), f);
    }
  }
  return null;
}
var ln = (e) => !ye(e) || e === "warden" || e === "thornheart", ee = (e, t, s, a = 0) => !e || Ie(e.space, t, s, a);
function Bs(e, t, s) {
  return e.summonPoints.filter((a) => Ke(e.space, a, s) && $t(e.space, e.entry, a, s)).sort((a, n) => Math.hypot(a.x - t.x, a.y - t.y) - Math.hypot(n.x - t.x, n.y - t.y))[0] ?? null;
}
function Ln(e, t, s) {
  return !e || Ie(e.space, t, s, 0.3) ? s : {
    x: t.x,
    y: t.y
  };
}
function Nn(e, t, s, a) {
  if (!e) return Math.atan2(s.y - t.y, s.x - t.x);
  let n = s;
  if (!Ke(e.space, n, a)) {
    const r = [], d = a + e.space.map.cellSize, o = ht(e.space.map, {
      x: s.x - d,
      y: s.y - d
    }), c = ht(e.space.map, {
      x: s.x + d,
      y: s.y + d
    });
    for (let h = Math.max(0, o.row); h <= Math.min(e.space.rows - 1, c.row); h++) for (let u = Math.max(0, o.column); u <= Math.min(e.space.columns - 1, c.column); u++) {
      const y = bt(e.space.map, u, h);
      Math.hypot(y.x - s.x, y.y - s.y) <= a + e.space.map.cellSize && Ke(e.space, y, a) && Ie(e.space, y, s) && r.push(y);
    }
    r.sort((h, u) => Math.hypot(h.x - s.x, h.y - s.y) - Math.hypot(u.x - s.x, u.y - s.y));
    const l = r.find((h) => $t(e.space, t, h, a));
    if (!l) return null;
    n = l;
  }
  const i = $t(e.space, t, n, a);
  return i?.length ? Math.atan2(i[0].y - t.y, i[0].x - t.x) : null;
}
function fe(e, t, s, a = 1, n = 0) {
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
function Me(e, t, s, a) {
  if (!ye(t) && e.enemies.filter((r) => r.hp > 0).length >= W.maxEnemies) return null;
  if (a) {
    const r = Bs(a, s, ie[t].radius);
    if (!r) return null;
    s = r;
  }
  const n = ie[t].hp * (ye(t) ? 1 : 1 + e.chapter * 0.2 + (e.elite ? 0.25 : 0)), i = {
    id: ++e.serial,
    kind: t,
    x: s.x,
    y: s.y,
    hp: n,
    maxHp: n,
    angle: Math.PI / 2,
    cooldown: 35 + Math.floor(ta(e) * 20),
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
function Ye(e, t, s, a, n, i = {}) {
  const r = {
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
  return e.shots.push(r), r;
}
function le(e, t, s, a, n, i, r, d = !1, o = {}) {
  const c = {
    id: ++e.serial,
    x: t.x,
    y: t.y,
    kind: s,
    radius: a,
    wait: n,
    life: i,
    damage: r,
    friendly: d,
    angle: 0,
    length: 0,
    width: 0.65,
    inner: 0,
    source: d ? "passive" : "attack",
    hits: [],
    ...o
  };
  return e.hazards.push(c), c;
}
function De(e, t, s, a, n) {
  return le(e, t, "slam", s, a, 8, n);
}
function we(e, t, s, a, n, i, r) {
  return le(e, t, "beam", 0, i, 9, r, !1, {
    angle: s,
    length: a,
    width: n
  });
}
function Qe(e, t, s, a, n, i, r = 0.22) {
  for (let d = 0; d < a; d++) Ye(e, t, s + (d / Math.max(1, a - 1) - 0.5) * n, i, !1, { speed: r });
}
function cn(e, t, s, a, n, i = 0.16) {
  for (let r = 0; r < s; r++) Ye(e, t, a + r * tt / s, n, !1, { speed: i });
}
function Aa(e, t, s, a, n = 0) {
  const i = {
    id: ++e.serial,
    kind: t,
    x: s.x,
    y: s.y,
    hp: t === "turret" ? 65 : t === "familiar" ? Be.familiarHp : 38,
    life: a,
    cooldown: 12,
    angle: 0,
    empowered: n
  };
  return e.companions.push(i), i;
}
var Ht = (e) => e === "attack" || e === "skill";
function Fn(e, t) {
  if (e.player.hp <= 0) return;
  const s = Math.min(W.maxHp - e.player.hp, t);
  e.player.hp += s, s > 0 && fe(e, e.player, "heal");
}
function Ge(e, t, s) {
  if (ye(t.kind)) {
    if (t.stagger += s, t.stagger < 100) return;
    t.stagger = 0, s = 24;
  }
  t.stun = Math.max(t.stun, s), t.windup = 0, t.motion = 0, t.cooldown = Math.max(20, t.cooldown), fe(e, t, "guard", 1.4);
}
function Ae(e, t, s, a, n, i = e.player, r) {
  if (t.hp <= 0 || !ee(r, i, t)) return;
  const d = t.burn > 0 || Ht(n) && I(a, "cinder") > 0, o = t.chill > 0 || Ht(n) && I(a, "frost") > 0, c = (n === "skill" || n === "companion" && a.weapon === "cannon") && o && I(a, "shatter") > 0, l = Ht(n) && d && o && I(a, "overload") > 0;
  let h = s * (I(a, "blood-price") ? Pe.bloodDamage + (I(a, "blood-price") - 1) * 0.12 : 1);
  if (I(a, "execution") && t.hp / t.maxHp < Pe.executeThreshold && (h *= Pe.executeDamage + (I(a, "execution") - 1) * 0.1), t.exposed > 0 && (h *= 1.25), (t.kind === "guard" || r && t.kind === "warden") && n === "attack" && Math.cos(ue(t, i) - t.angle) > 0.4 && t.exposed <= 0 && (h *= I(a, "shield-break") ? 0.8 : 0.35), t.kind !== "priest" && !ye(t.kind) && e.enemies.some((u) => u.kind === "priest" && u.hp > 0 && F(t, u) < 3.5 && ee(r, t, u)) && (h *= 0.7), n === "attack" && I(a, "backstab") && Math.cos(ue(t, e.player) - t.angle) < -0.3 && (h *= 1.6 + I(a, "backstab") * 0.2, t.exposed = Math.max(t.exposed, 55)), n === "attack" && I(a, "duelist") && Ge(e, t, 9 * I(a, "duelist")), c) {
    h += 15 * I(a, "shatter"), t.chill = 0, fe(e, t, "burst", 2.2);
    for (const u of e.enemies) u.id !== t.id && F(t, u) < 2.2 && Ae(e, u, 9 * I(a, "shatter"), a, "passive", t, r);
  }
  if (Ht(n) && (I(a, "cinder") && (t.burn = Math.max(t.burn, 80 + I(a, "cinder") * 25)), I(a, "frost") && (t.chill = Math.max(t.chill, 45 + I(a, "frost") * 20)), (I(a, "blood-dance") || I(a, "hemorrhage")) && (t.bleed = 100 + 25 * (I(a, "blood-dance") + I(a, "hemorrhage"))), I(a, "venom") && (t.poison = 100 + I(a, "venom") * 35), l && (h += 20 * I(a, "overload"), fe(e, t, "lightning")), n === "skill" && I(a, "hunter-mark") && (t.exposed = Math.max(t.exposed, 100 + I(a, "hunter-mark") * 40)), I(a, "inferno") && d && n === "skill" && le(e, t, "fire", 1.5 + I(a, "inferno") * 0.3, 0, 70, 4 * I(a, "inferno"), !0)), l && (t.burn = 0), (l || c) && (t.chill = 0), t.hp = Math.max(0, t.hp - h), t.marked = 5, n === "lightning" && I(a, "momentum") && e.tick % 6 === 0 && (e.player.dash = Math.max(0, e.player.dash - I(a, "momentum") * 2)), !(t.hp > 0)) {
    if (e.kills++, fe(e, t, "burst", ye(t.kind) ? 3 : 0.8), I(a, "wildfire") && d && le(e, t, "fire", 1.8 + I(a, "wildfire") * 0.2, 0, 90, 3 * I(a, "wildfire"), !0), I(a, "fracture") && o) for (let u = 0; u < 4 + I(a, "fracture"); u++) Ye(e, t, u * tt / (4 + I(a, "fracture")), 9, !0, { source: "passive" });
    if (I(a, "siphon") && (e.kills % Pe.siphonEvery === 0 || ye(t.kind)) && Fn(e, (ye(t.kind) ? Pe.siphonBossHeal : Pe.siphonHeal) + I(a, "siphon") - 1), I(a, "execution-chain") && (e.player.dash = Math.max(0, e.player.dash - 12 * I(a, "execution-chain")), e.player.skill = Math.max(0, e.player.skill - 8)), I(a, "soul-harvest") && (e.player.resource = Math.min(Be.maxPower, e.player.resource + 9 * I(a, "soul-harvest"))), n === "companion" && I(a, "salvage") && (e.player.skill = Math.max(0, e.player.skill - 12 * I(a, "salvage"))), I(a, "magnet"))
      for (const u of e.enemies) u.hp > 0 && F(t, u) < 3 + I(a, "magnet") && ee(r, t, u) && Ne(e, u, ue(u, t), 0.7, ie[u.kind].radius, r);
  }
}
function $a(e, t, s, a, n, i = e.player) {
  const r = [t];
  if (ee(n, i, t)) {
    I(s, "conductor") && r.push(...e.enemies.filter((d) => d.id !== t.id && d.hp > 0 && F(d, t) < 4.5 && ee(n, t, d)).sort((d, o) => F(d, t) - F(o, t)).slice(0, I(s, "conductor") + 1));
    for (const d of r)
      fe(e, d, "lightning"), Ae(e, d, a, s, "lightning", n ? d === t ? i : t : e.player, n);
  }
}
function qn(e, t, s) {
  const a = e.player, n = a.guard > 0;
  a.resource = Math.min(100, a.resource + (n ? 25 : 8)), fe(e, a, n ? "parry" : "block", n ? 2 : 1, a.facing), n && (a.skill = Math.max(35, a.skill - 15));
  const i = I(t, "riposte"), r = I(t, "thorns");
  if (i || r)
    for (const d of e.enemies) F(d, a) < 3.2 + i * 0.3 && ee(s, a, d) && (Ae(e, d, (n ? 20 : 8) * i + 9 * r, t, "passive", a, s), Ge(e, d, n ? 20 : 7));
}
function aa(e, t, s, a) {
  const n = e.player;
  if (n.invulnerable > 0 || n.hp <= 0) return;
  if (n.shield > 0) {
    qn(e, s, a), n.invulnerable = n.guard > 0 ? 8 : 4;
    return;
  }
  let i = t * dt[s.weapon].guard * (I(s, "blood-price") ? Pe.bloodHurt : 1) * (I(s, "gambit") ? 1.2 : 1);
  const r = Math.min(n.ward, i);
  if (n.ward -= r, i -= r, n.hp <= i && I(s, "last-stand") && !n.rescues) {
    n.rescues++, n.hp = 15 + I(s, "last-stand") * 8, n.invulnerable = 60, fe(e, n, r > 0 ? "ward-break" : "guard", 3);
    return;
  }
  if (n.hp = Math.max(0, n.hp - i), e.damageTaken += i, n.invulnerable = 18, n.lastHit = e.tick, fe(e, n, r > 0 ? n.ward > 0 ? "ward-hit" : "ward-break" : "hit"), I(s, "thorns"))
    for (const d of e.enemies) F(d, n) < 3 && Ae(e, d, 10 * I(s, "thorns"), s, "passive", n, a);
}
function Pt(e, t, s = 45) {
  e.ward += Math.max(0, Math.min(t, s - e.ward));
}
function dn(e, t, s, a = !1, n) {
  const i = dt[t.weapon], r = e.player, d = ue(r, s), o = (a ? 0.6 : 1) * (I(t, "gambit") ? 1 + I(t, "gambit") * 0.12 : 1);
  if (r.facing = d, r.swing = t.weapon === "cannon" ? 15 : 8, t.weapon === "blade" || t.weapon === "daggers") {
    const u = i.range + I(t, "piercing") * 0.25;
    fe(e, r, "slash", u, d);
    for (const y of e.enemies)
      F(r, y) > u + ie[y.kind].radius || Math.cos(ue(r, y) - d) < -0.1 || !ee(n, r, y) || (Ae(e, y, i.damage * o, t, "attack", r, n), t.weapon === "blade" && !a && r.combo % 3 === 2 && Ge(e, y, 14));
    t.weapon === "blade" && (r.resource = Math.min(100, r.resource + 9), I(t, "cleave-wave") && r.combo % 3 === 2 && Ye(e, r, d, 14 * I(t, "cleave-wave"), !0, {
      pierce: 5,
      radius: 0.4,
      speed: 0.3,
      source: "passive"
    }));
    return;
  }
  let c = i.damage * o;
  I(t, "distance-draw") && (c *= 1 + Math.min(1, F(r, s) / 8) * 0.15 * I(t, "distance-draw")), t.weapon === "staff" && (r.resource = Math.min(100, r.resource + 18)), t.weapon === "grimoire" && (r.resource = Math.min(Be.maxPower, r.resource + 12));
  const l = I(t, "piercing") * Pe.extraPierce + I(t, "railgun") * 2, h = Ye(e, r, d, c, !0, {
    pierce: l,
    speed: t.weapon === "bow" ? 0.38 : 0.28,
    splash: t.weapon === "staff" ? 1.4 : t.weapon === "cannon" ? 1.8 + I(t, "shrapnel") * 0.3 : 0,
    bounce: I(t, "ricochet"),
    radius: t.weapon === "cannon" ? 0.3 : 0.16
  });
  if (t.weapon === "bow" && I(t, "split-arrow") && r.combo % 3 === 2) for (const u of [-0.18, 0.18]) Ye(e, r, d + u, c * (0.35 + I(t, "split-arrow") * 0.1), !0, {
    speed: h.speed,
    pierce: l
  });
}
function Hs(e, t, s, a) {
  const n = e.player, i = dt[t.weapon], r = I(t, "focus");
  switch (n.skill = Math.round(i.skillCooldown * (r ? Pe.focusSkill - (r - 1) * 0.06 : 1)), I(t, "aegis") && (n.shield = 18 + I(t, "aegis") * 6, n.guard = 8, Pt(n, I(t, "aegis") * 6)), t.weapon) {
    case "blade": {
      n.shield = 26 + I(t, "aegis") * 6, n.guard = 9;
      const d = 1 + n.resource / 100;
      n.resource = 0, fe(e, n, "slash", 3.6, n.facing);
      for (const o of e.enemies)
        o.hp <= 0 || F(n, o) > 3.6 + ie[o.kind].radius || !ee(a, n, o) || (I(t, "shield-break") && (o.exposed = Math.max(o.exposed, 70 + 30 * I(t, "shield-break"))), Ae(e, o, i.skill * d, t, "skill", n, a), Ge(e, o, 40), ye(o.kind) || Ne(e, o, ue(n, o), 1.5, ie[o.kind].radius, a));
      I(t, "valor") && Pt(n, 12 * I(t, "valor") * d);
      break;
    }
    case "bow":
      for (let d = -2; d <= 2; d++) Ye(e, n, n.facing + d * 0.15, i.skill, !0, {
        pierce: 6,
        speed: 0.42,
        source: "skill"
      });
      Ne(e, n, n.facing + Math.PI, 0.85, W.playerRadius, a);
      break;
    case "staff": {
      const d = s ?? n, o = 1 + n.resource / 125;
      if (n.resource = 0, I(t, "convergence"))
        for (const c of e.enemies) F(c, d) < 4 + I(t, "convergence") && ee(a, d, c) && Ne(e, c, ue(c, d), 1.2, ie[c.kind].radius, a);
      for (let c = 0; c < 3; c++) {
        const l = Re(d, c * tt / 3, 0.7);
        le(e, ee(a, d, l) ? l : d, "slam", 2.3, 10 + c * 10, 1, i.skill * o, !0, { source: "skill" });
      }
      if (I(t, "nova")) {
        le(e, n, "frost", 3 + I(t, "nova") * 0.5, 0, 32, 6 * I(t, "nova"), !0, { source: "skill" });
        for (const c of e.enemies) F(n, c) < 3.5 && ee(a, n, c) && (c.chill = 120, Ge(e, c, 25));
      }
      break;
    }
    case "daggers":
      if (n.invulnerable = Math.max(n.invulnerable, 12), s) {
        const d = Re(s, s.angle + Math.PI, ie[s.kind].radius + 0.55);
        Ne(e, n, ue(n, d), Math.min(5, F(n, d)), W.playerRadius, a), n.facing = ue(n, s), ee(a, n, s) && (!a || F(n, s) <= i.range + ie[s.kind].radius) && (s.exposed = Math.max(s.exposed, 60), Ae(e, s, i.skill, t, "skill", n, a), Ge(e, s, 20)), fe(e, n, "slash", 2, n.facing);
      }
      I(t, "shadowstep") && Aa(e, "shade", n, 95 + I(t, "shadowstep") * 30, I(t, "shadowstep"));
      break;
    case "grimoire": {
      const d = n.resource;
      n.resource = 0, n.resonance = Be.resonanceTicks + d, fe(e, n, "resonance", 2);
      for (const o of e.companions) o.kind === "familiar" && o.hp > 0 && o.life > 0 && (o.hp = Math.max(o.hp, Be.familiarHp), o.cooldown = 0);
      s && (s.exposed = Math.max(s.exposed, 100), Ae(e, s, i.skill + d * 0.3, t, "skill", n, a)), I(t, "command") && le(e, s ?? n, "storm", 2.4 + I(t, "command") * 0.3, 10, 65, 7 * I(t, "command"), !0, { source: "skill" });
      break;
    }
    case "cannon": {
      const d = 1 + (I(t, "overclock") >= 2 ? 1 : 0), o = e.companions.filter((c) => c.kind === "turret");
      o.length >= d && (o[0].life = 0), Aa(e, "turret", Ln(a, n, Re(n, n.facing, 0.9)), 240 + I(t, "overclock") * 45, I(t, "overclock")), I(t, "bunker") && Pt(n, 15 * I(t, "bunker"));
      break;
    }
  }
}
function Ws(e, t, s, a) {
  const n = e.player, i = I(s, "quicksilver");
  if (n.dash = Math.round(W.dashCooldown * (1 - i * 0.08)), n.dashTime = W.dashTicks, n.dashAngle = t.move ? Ba(t.move) : n.facing, n.invulnerable = W.dashTicks + 2, I(s, "storm-step") && le(e, n, "storm", 1.7 + I(s, "storm-step") * 0.15, 0, 70, 6 + I(s, "storm-step") * 3, !0), I(s, "trapper") && le(e, n, "frost", 1.8, 12, 110, 5 * I(s, "trapper"), !0), I(s, "minefield") && le(e, n, "mine", 2 + I(s, "minefield") * 0.2, 12, 180, 25 * I(s, "minefield"), !0), I(s, "smoke")) {
    for (const r of e.enemies) F(r, n) < 3 + I(s, "smoke") * 0.4 && ee(a, n, r) && (Ge(e, r, 30 + I(s, "smoke") * 8), r.exposed = Math.max(r.exposed, 65));
    fe(e, n, "guard", 3);
  }
}
function Qs(e, t, s, a) {
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
  const i = e.enemies.filter((c) => c.hp > 0 && ee(a, n, c)).sort((c, l) => F(n, c) - F(n, l))[0];
  t.dash && !n.dash && !n.dashTime && Ws(e, t, s, a);
  const r = {
    x: n.x,
    y: n.y
  };
  if (n.dashTime > 0)
    Ne(e, n, n.dashAngle, W.speed * 3.6, W.playerRadius, a), n.dashTime--, !n.dashTime && I(s, "momentum") && i && F(n, i) < 3 && $a(e, i, s, 10 + I(s, "momentum") * 5, a);
  else if (t.move) {
    n.facing = Ba(t.move);
    const c = n.swing > 0;
    let l = W.speed * (c ? dt[s.weapon].moveFire : 1);
    I(s, "quicksilver") && n.dash > W.dashCooldown / 2 && (l *= 1 + I(s, "quicksilver") * 0.1), e.hazards.some((h) => !h.friendly && h.kind === "frost" && !h.wait && F(h, n) < h.radius && ee(a, h, n)) && (l *= 0.65), Ne(e, n, n.facing, l, W.playerRadius, a);
  }
  n.travel += F(r, n), I(s, "pilgrim") && n.travel >= 28 && (n.travel -= 28, Pt(n, I(s, "pilgrim") * 6, 35)), I(s, "wardstone") && e.tick - n.lastHit > 150 && e.tick % 30 === 0 && Pt(n, 2, I(s, "wardstone") * 10);
  const d = i && ee(a, n, i) ? i : void 0;
  t.skill && !n.skill && (d && (n.facing = ue(n, d)), Hs(e, s, d, a));
  const o = dt[s.weapon].range + (s.weapon === "blade" || s.weapon === "daggers" ? I(s, "piercing") * 0.25 : 0);
  if (d && !n.attack && F(n, d) <= o + ie[d.kind].radius && (dn(e, s, d, !1, a), n.combo++, I(s, "echo") && n.combo % Math.max(2, Pe.echoEvery + 1 - I(s, "echo")) === 0 && dn(e, s, d, !0, a), n.attack = Math.round(dt[s.weapon].period * (I(s, "focus") ? Pe.focusAttack : 1))), I(s, "orbit") && e.tick % Math.round(Pe.orbitTicks / (1 + I(s, "orbit") * 0.25)) === 0 && i && F(n, i) < 4.5 && $a(e, i, s, 12 + I(s, "orbit") * 3, a), I(s, "orbitals") && e.tick % 35 === 0) {
    for (const c of e.enemies) F(n, c) < 2.5 + I(s, "orbitals") * 0.35 && ee(a, n, c) && (Ae(e, c, 12 * I(s, "orbitals"), s, "passive", n, a), c.chill = Math.max(c.chill, 30));
    fe(e, n, "burst", 2.8);
  }
  return {
    x: n.x - r.x,
    y: n.y - r.y
  };
}
function Us(e, t, s) {
  if (e.player.resonance = Math.max(0, e.player.resonance - 1), t.weapon === "grimoire" && e.tick % 45 === 1) {
    const a = 2 + I(t, "pack-bond");
    e.companions.filter((n) => n.kind === "familiar" && n.hp > 0 && n.life > 0).length < a && Aa(e, "familiar", Ln(s, e.player, Re(e.player, e.tick, 1)), 36e3);
  }
  for (const a of e.companions) {
    a.life--, a.cooldown = Math.max(0, a.cooldown - 1);
    const n = e.enemies.filter((r) => r.hp > 0 && (a.kind !== "turret" || ee(s, a, r))).sort((r, d) => F(r, a) - F(d, a))[0];
    if (a.hp <= 0 || a.life <= 0 || !n) continue;
    if (a.angle = ue(a, n), a.kind !== "turret") {
      const r = F(a, e.player) > 8;
      if (r || F(a, n) > 1.3 || !ee(s, a, n)) {
        const d = Nn(s, a, r ? e.player : n, 0.25);
        d !== null && Ne(e, a, d, r ? 0.19 : 0.14 + I(t, "frenzy") * 0.015, 0.25, s);
      }
    }
    const i = a.kind === "turret" ? 8 : 1.8;
    if (!a.cooldown && F(a, n) < i && ee(s, a, n)) if (a.kind === "turret")
      Ye(e, a, a.angle, dt.cannon.skill * (1 + a.empowered * 0.15), !0, {
        source: "companion",
        speed: 0.35
      }), a.cooldown = 28 - a.empowered * 3;
    else {
      const r = a.kind === "familiar" && e.player.resonance > 0;
      Ae(e, n, a.kind === "shade" ? 9 + a.empowered * 4 : (r ? Be.empoweredDamage : Be.damage) * (1 + I(t, "covenant") * 0.15), t, "companion", a, s), fe(e, a, "slash", 1.2, a.angle);
      const d = a.kind === "shade" ? 32 : r ? Be.empoweredAttackTicks : Be.attackTicks;
      a.cooldown = Math.round(d / (1 + I(t, "frenzy") * 0.18));
    }
  }
  for (const a of e.companions) a.hp <= 0 && a.kind === "familiar" && I(t, "martyr") && (Fn(e, I(t, "martyr")), le(e, a, "slam", 2.2, 0, 1, 15 * I(t, "martyr"), !0));
  e.companions = e.companions.filter((a) => a.hp > 0 && a.life > 0);
}
var et = Object.freeze({
  ritualTicks: 330,
  survivalTicks: 1500,
  pursuitInterval: 390,
  reinforcementInterval: 270,
  warningAfter: 1800
}), Vt = [
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
function Qt(e, t, s) {
  if (e.wave++, s) {
    for (const i of s.waves[e.wave - 1]) Me(e, i.kind, i.position);
    return;
  }
  if (e.boss) {
    Me(e, e.bossKind, {
      x: 0,
      y: -5
    });
    return;
  }
  const a = Rs[e.zone].mobs, n = 4 + e.chapter + (e.elite ? 2 : 0) + (t.oaths.includes("legion") ? 2 : 0);
  for (let i = 0; i < n; i++) {
    const r = tt * i / n + (e.wave - 1) * 0.8;
    let d = a[(i + e.wave - 1) % a.length];
    e.wave === 1 && e.chapter === 0 && i < 2 && (d = a[0]), e.encounter === "pursuit" && i === 0 && (d = "stalker"), e.encounter === "siege" && i === 0 && (d = "guard"), Me(e, d, {
      x: Math.cos(r) * 8.7,
      y: Math.sin(r) * 8.7
    });
  }
}
function Ys(e, t, s) {
  if (e.boss) return;
  const a = e.objective, n = e.enemies.some((i) => i.hp > 0);
  if (e.encounter === "ritual") {
    a.progress < a.target && F(e.player, a) < 2.5 && !e.enemies.some((r) => r.hp > 0 && F(r, a) < 2.2) && a.progress++;
    const i = Math.min(2, Math.floor(a.progress / et.ritualTicks));
    a.x = Vt[i].x, a.y = Vt[i].y, e.tick % et.reinforcementInterval === 0 && a.progress < a.target && e.enemies.length < 8 && Me(e, e.chapter ? "wisp" : "stalker", {
      x: a.x > 0 ? -9 : 9,
      y: ta(e) * 12 - 6
    });
  } else if (e.encounter === "survival")
    a.progress = Math.min(a.target, a.progress + 1), e.tick % et.reinforcementInterval === 0 && a.progress < a.target && e.enemies.length < 10 && Qt(e, t), e.tick % 150 === 0 && le(e, {
      x: 0,
      y: 0
    }, "ring", 15, 35, 90, 12, !1, { inner: Math.max(4.8, 9 - e.tick / 400) });
  else if (e.encounter === "pursuit")
    a.progress = e.tick % et.pursuitInterval, e.wave < e.waves && a.progress === 0 && Qt(e, t);
  else if (e.encounter === "crossfire" && e.tick % 150 === 0) {
    const i = e.tick % 300 === 0, r = Math.round((i ? e.player.y : e.player.x) / 3) * 3;
    we(e, i ? {
      x: -10,
      y: r
    } : {
      x: r,
      y: -10
    }, i ? 0 : Math.PI / 2, 20, 0.65, 36, 15);
  }
  e.tick > et.warningAfter && e.tick % 180 === 0 && le(e, e.player, "fire", 2.2, 36, 90, 13), !n && e.wave < e.waves && e.encounter !== "survival" ? ++e.nextWave >= 40 && (e.nextWave = 0, Qt(e, t, s)) : n && (e.nextWave = 0);
}
function Gs(e) {
  return e.enemies.some((t) => t.hp > 0) ? !1 : !e.boss && e.encounter === "survival" ? e.objective.progress >= e.objective.target : !e.boss && e.encounter === "ritual" ? e.objective.progress >= e.objective.target && e.wave >= e.waves : e.wave >= e.waves;
}
function Ks(e) {
  const t = e.objective;
  e.encounter === "ritual" && (Object.assign(t, Vt[0]), t.target = et.ritualTicks * Vt.length), e.encounter === "survival" && (t.target = et.survivalTicks), e.encounter === "pursuit" && (t.target = et.pursuitInterval);
}
var yt = (e, t) => {
  e.motion = t, e.motionAngle = ue(e, e.target), e.stun = 18;
}, Vs = {
  warden(e, t, s) {
    const a = t.pattern % 3, n = Ca.warden.damage;
    if (a === 0)
      yt(t, 24), we(e, t, t.motionAngle, 13, 1.1, 18, n);
    else if (a === 1) {
      for (let i = -1; i <= 1; i++) De(e, Re(t, t.angle + i * 0.55, 3.5), 1.8, 12 + Math.abs(i) * 8, n);
      t.exposed = Math.max(t.exposed, 65);
    } else
      Qe(e, t, t.angle, 5 + t.phase * 2, 1.5, n * 0.65), t.phase > 1 && Me(e, "guard", {
        x: -7,
        y: -7
      }, s);
  },
  thornheart(e, t, s) {
    const a = t.pattern % 4;
    if (a === 0) for (let n = 0; n < 5; n++) le(e, Re(t.target, n * tt / 5, 3.6), "poison", 1.4, 26, 110, 12);
    else if (a === 1)
      le(e, t, "ring", 7.5, 25, 14, 22, !1, { inner: 3 }), t.exposed = Math.max(t.exposed, 80);
    else if (a === 2) for (const n of [-7, 7]) Me(e, "stalker", {
      x: n,
      y: -6
    }, s);
    else for (let n = 0; n < 3 + t.phase; n++) we(e, t, t.angle + n * tt / (3 + t.phase), 15, 0.55, 25, 18);
  },
  weaver(e, t) {
    const s = t.pattern % 4;
    if (s === 0)
      t.x = t.target.x > 0 ? -7 : 7, t.y = -5, fe(e, t, "burst", 2), we(e, {
        x: -10,
        y: t.target.y
      }, 0, 20, 0.7, 30, 21), we(e, {
        x: t.target.x,
        y: -10
      }, Math.PI / 2, 20, 0.7, 42, 21);
    else if (s === 1) Qe(e, t, ue(t, e.player), 7 + t.phase, 1.8, 13, 0.2);
    else if (s === 2) {
      for (let a = 0; a < 4; a++) {
        const n = Re({
          x: 0,
          y: 0
        }, a * Math.PI / 2 + Math.PI / 4, 7);
        we(e, n, ue(n, {
          x: 0,
          y: 0
        }), 11, 0.6, 25 + a * 8, 18);
      }
      t.exposed = Math.max(t.exposed, 75);
    } else
      Me(e, "wisp", {
        x: -7,
        y: 5
      }), Me(e, "wisp", {
        x: 7,
        y: 5
      });
  },
  astrologer(e, t) {
    const s = t.pattern % 3, a = t.pattern * 0.53;
    if (s === 0) for (let n = 0; n < 7; n++)
      n !== t.phase && we(e, t, a + n * tt / 7, 18, 0.6, 32, 23);
    else if (s === 1) for (let n = 0; n < 6; n++) {
      const i = Re({
        x: 0,
        y: 0
      }, n * tt / 6, 9);
      Qe(e, i, ue(i, t.target), 2 + t.phase, 0.45, 12, 0.16);
    }
    else
      De(e, t.target, 2, 18, 24), le(e, {
        x: 0,
        y: 0
      }, "ring", 10.5, 38, 12, 22, !1, { inner: 5.5 }), t.exposed = Math.max(t.exposed, 90);
  },
  king(e, t) {
    const s = t.pattern % 4;
    if (s === 0)
      yt(t, 18), we(e, t, t.motionAngle, 10, 0.9, 18, 24);
    else if (s === 1) for (let a = 0; a < 2 + t.phase; a++) De(e, Re(t, t.angle + (a % 2 ? 0.65 : -0.65), 3), 2, 7 + a * 10, 23);
    else s === 2 ? (we(e, {
      x: -10,
      y: 0
    }, 0, 20, 0.8, 22, 26), we(e, {
      x: 0,
      y: -10
    }, Math.PI / 2, 20, 0.8, 35, 26), t.exposed = Math.max(t.exposed, 65)) : (Qe(e, t, t.angle, 3, 0.55, 18, 0.29), t.phase > 1 && (Me(e, "stalker", {
      x: -8,
      y: 3
    }), Me(e, "archer", {
      x: 8,
      y: -3
    })));
  },
  phoenix(e, t) {
    const s = t.pattern % 4;
    if (s === 0) {
      yt(t, 28);
      for (let a = 0; a < 6; a++) le(e, Re(t, t.motionAngle, a * 2), "fire", 1.2, 20 + a * 4, 95, 13);
    } else if (s === 1) cn(e, t, 10 + t.phase * 2, t.pattern * 0.32, 13, 0.17);
    else if (s === 2)
      t.x = 0, t.y = 0, le(e, t, "ring", 9, 30, 15, 25, !1, { inner: 3.5 }), t.exposed = Math.max(t.exposed, 85);
    else for (const a of [{
      x: -6,
      y: -5
    }, {
      x: 6,
      y: 5
    }]) Me(e, "bomber", a);
  },
  forgemaster(e, t) {
    const s = t.pattern % 4;
    if (s === 0) for (const a of [
      -7,
      0,
      7
    ]) we(e, {
      x: a,
      y: -10
    }, Math.PI / 2, 20, 1.1, 26, 24);
    else if (s === 1) for (let a = -1; a <= 1; a++) le(e, {
      x: t.target.x + a * 2.5,
      y: t.target.y
    }, "fire", 1.6, 28 + Math.abs(a) * 7, 100, 14);
    else s === 2 ? (De(e, t, 4, 18, 26), t.exposed = Math.max(t.exposed, 100)) : (Me(e, "bomber", {
      x: -8,
      y: 5
    }), t.phase > 1 && Me(e, "guard", {
      x: 8,
      y: 5
    }));
  },
  colossus(e, t) {
    const s = t.pattern % 3;
    if (s === 0) for (let a = 0; a < 3; a++) le(e, t, "ring", 3 + a * 3, 20 + a * 19, 9, 23, !1, { inner: 1.4 + a * 3 });
    else if (s === 1)
      yt(t, 30), we(e, t, t.motionAngle, 18, 1.4, 18, 27);
    else {
      for (const a of [-1, 1]) De(e, {
        x: t.target.x + a * 2,
        y: t.target.y
      }, 2.7, 30, 25);
      t.exposed = Math.max(t.exposed, 110);
    }
  },
  frostqueen(e, t) {
    const s = t.pattern % 4;
    if (s === 0) for (let a = 0; a < 4; a++) le(e, Re(t.target, a * Math.PI / 2, 3), "frost", 1.8, 24, 100, 10);
    else s === 1 ? Qe(e, t, t.angle, 9, 2.2, 14, 0.21) : s === 2 ? (t.x = -t.x, t.y = -t.y, we(e, t, ue(t, t.target), 20, 1.2, 32, 24), t.exposed = Math.max(t.exposed, 85)) : (le(e, {
      x: 0,
      y: 0
    }, "ring", 10.5, 32, 18, 22, !1, { inner: 5 }), Me(e, "stalker", {
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
      }, yt(t, 40), we(e, t, 0, 19, 1.4, 14, 25);
    else if (s === 1) for (let a = 0; a < 4; a++) we(e, {
      x: -10,
      y: -8 + a * 5
    }, 0, 20, 0.7, 20 + a * 13, 20);
    else s === 2 ? (De(e, t.target, 3.8, 28, 26), t.exposed = Math.max(t.exposed, 95)) : (le(e, {
      x: 0,
      y: 0
    }, "ring", 10, 26, 14, 23, !1, { inner: t.phase > 1 ? 4 : 6 }), Qe(e, t, t.angle, 5, 1.3, 14));
  },
  archivist(e, t) {
    const s = t.pattern % 4;
    if (s === 0)
      t.memory.push({ ...t.target }), t.memory = t.memory.slice(-4), De(e, t.target, 2.3, 24, 21);
    else if (s === 1) for (let a = 0; a < t.memory.length; a++) De(e, t.memory[a], 2.6, 22 + a * 8, 24);
    else if (s === 2) {
      for (const a of t.memory) we(e, a, ue(a, t.target), 18, 0.65, 32, 22);
      Me(e, "wisp", {
        x: -7,
        y: -7
      }), Me(e, "wisp", {
        x: 7,
        y: 7
      });
    } else
      cn(e, t, 12, t.pattern * 0.2, 14), t.exposed = Math.max(t.exposed, 100);
  },
  voidknight(e, t) {
    const s = t.pattern % 4;
    if (s === 0)
      t.x = Math.max(-8, Math.min(8, -t.target.x)), t.y = Math.max(-8, Math.min(8, -t.target.y)), fe(e, t, "burst", 2), we(e, t, ue(t, t.target), 20, 0.8, 24, 26);
    else if (s === 1)
      yt(t, 20), Qe(e, t, t.angle, 3 + t.phase, 0.9, 15, 0.26);
    else if (s === 2)
      De(e, t, 3, 12, 26), le(e, t, "ring", 7, 30, 10, 22, !1, { inner: 3.5 }), t.exposed = Math.max(t.exposed, 65);
    else for (const a of [{
      x: t.target.x,
      y: -9
    }, {
      x: -9,
      y: t.target.y
    }]) we(e, a, ue(a, t.target), 20, 0.6, 22, 23);
  }
};
function Xs(e, t, s, a) {
  const n = t.kind;
  for (; t.phase < (t.hp / t.maxHp < 0.3 ? 3 : t.hp / t.maxHp < 0.65 ? 2 : 1); ) {
    const i = t.phase + 1;
    t.phase = i, fe(e, t, "burst", 4), n === "phoenix" && i === 2 && (t.hp = Math.min(t.maxHp, t.hp + t.maxHp * 0.12), le(e, t, "fire", 3, 25, 100, 14)), n === "archivist" && (t.memory.push({
      x: e.player.x,
      y: e.player.y
    }), t.memory = t.memory.slice(-4)), s.oaths.includes("legion") && Me(e, "stalker", {
      x: t.x > 0 ? -8 : 8,
      y: 6
    }, a);
  }
  Vs[n](e, t, a), t.pattern++;
}
function Js(e, t, s) {
  if (!ye(t.kind)) {
    const a = e.companions.filter((n) => n.hp > 0 && n.life > 0 && F(n, t) < 2.8 && ee(s, t, n)).sort((n, i) => F(n, t) - F(i, t))[0];
    if (a) return a;
    if (e.encounter === "siege" && !e.boss && (t.kind === "soldier" || t.kind === "guard" || t.kind === "charger") && F(t, e.player) > 3) return e.objective;
  }
  return e.player;
}
function eo(e, t, s, a, n) {
  const i = ie[t.kind];
  F(t.target, e.player) < a && F(t, e.player) < i.reach + 1 && ee(n, t, e.player) && aa(e, i.damage, s, n);
  for (const r of e.companions) F(t.target, r) < a && F(t, r) < i.reach + 1 && ee(n, t, r) && (r.hp -= i.damage);
  !e.boss && e.encounter === "siege" && F(t.target, e.objective) < a && F(t, e.objective) < i.reach + 1 && (e.objective.hp = Math.max(0, e.objective.hp - i.damage * 0.5)), fe(e, t.target, "slash", a, t.angle);
}
function to(e, t, s, a) {
  const n = ie[t.kind];
  if (ye(t.kind)) {
    Xs(e, t, s, a);
    return;
  }
  switch (t.kind) {
    case "archer":
      Qe(e, t, t.angle, e.chapter > 0 ? 3 : 2, 0.36, n.damage, 0.24);
      break;
    case "priest":
      for (const i of e.enemies) i.hp > 0 && !ye(i.kind) && F(i, t) < 3.5 && ee(a, t, i) && (i.hp = Math.min(i.maxHp, i.hp + 8));
      Qe(e, t, t.angle, 3, 0.7, n.damage, 0.18), fe(e, t, "heal", 3.5);
      break;
    case "charger":
      t.motion = 23, t.motionAngle = t.angle;
      break;
    case "bomber":
      le(e, t.target, "fire", 1.9, 23, 75, n.damage);
      break;
    case "wisp":
      Ye(e, t, t.angle, n.damage, !1, { speed: 0.3 }), t.motion = 7, t.motionAngle = t.angle + Math.PI / 2;
      break;
    case "guard":
      De(e, t.target, 1.7, 8, n.damage);
      break;
    default:
      eo(e, t, s, n.reach + 0.15, a);
  }
}
function ao(e, t, s, a) {
  const n = ie[t.kind], i = {
    x: t.x,
    y: t.y
  }, r = t.kind === "leviathan" ? 0.44 : t.kind === "wisp" ? 0.24 : 0.32;
  if (Ne(e, t, t.motionAngle, r, n.radius, a), t.motion--, t.kind !== "wisp") {
    F(t, e.player) < n.radius + 0.4 && ee(a, t, e.player) && aa(e, n.damage, s, a);
    for (const d of e.companions) F(t, d) < n.radius + 0.3 && ee(a, t, d) && (d.hp -= n.damage, t.motion = 0);
    !e.boss && e.encounter === "siege" && F(t, e.objective) < n.radius + 0.6 && (e.objective.hp = Math.max(0, e.objective.hp - n.damage * 0.5), t.motion = 0), F(i, t) < r * 0.65 && (t.motion = 0, t.exposed = Math.max(t.exposed, 80), t.stun = 24, fe(e, t, "guard", 2));
  }
  t.motion || (t.cooldown = Math.max(t.cooldown, 28));
}
function no(e, t, s, a) {
  for (const n of [...e.enemies]) {
    if (n.hp <= 0) continue;
    for (const h of [
      "marked",
      "chill",
      "exposed"
    ]) n[h] = Math.max(0, n[h] - 1);
    for (const h of [
      "burn",
      "bleed",
      "poison"
    ]) n[h] > 0 && (n[h]--, e.tick % 15 === 0 && Ae(e, n, 2 + (h === "burn" ? I(t, "cinder") + I(t, "inferno") : h === "bleed" ? I(t, "hemorrhage") + I(t, "blood-dance") : I(t, "venom")) * 1.5, t, "passive", a ? n : e.player, a));
    if (n.hp <= 0) continue;
    if (n.stun > 0) {
      n.stun--;
      continue;
    }
    if (n.motion > 0) {
      ao(e, n, t, a);
      continue;
    }
    const i = ie[n.kind], r = t.oaths.includes("haste");
    if (n.windup > 0) {
      --n.windup === 0 && (to(e, n, t, a), n.cooldown = Math.round(i.cooldown * (r ? 0.8 : 1) / (ye(n.kind) ? 1 + (n.phase - 1) * 0.12 : 1)));
      continue;
    }
    const d = Js(e, n, a), o = F(n, d), c = ee(a, n, d);
    if (n.cooldown = Math.max(0, n.cooldown - 1), n.angle = ue(n, d), !n.cooldown && o < i.reach && c) {
      if (n.target = {
        x: d.x,
        y: d.y
      }, n.windup = Math.round(i.windup * (r ? 0.8 : 1)), d === e.player && (n.kind === "archer" || n.kind === "bomber")) {
        const h = n.kind === "bomber" ? 23 : o / 0.24, u = Math.min(n.windup + h, 4.5 / Math.max(1e-3, Math.hypot(s.x, s.y))), y = {
          x: d.x + s.x * u,
          y: d.y + s.y * u
        };
        a ? ee(a, n, y) && ee(a, d, y) && (n.target = y) : (n.target.x = Math.max(-10, Math.min(10, y.x)), n.target.y = Math.max(-10, Math.min(10, y.y))), n.angle = ue(n, n.target);
      }
      continue;
    }
    const l = n.kind === "archer" || n.kind === "priest" || n.kind === "bomber" || n.kind === "wisp";
    if (o > (l ? 5 : ye(n.kind) ? 2.8 : 0.95) || l && o < 3 || !c) {
      const h = n.kind === "stalker" && o > 3 ? n.id % 2 ? 0.28 : -0.28 : 0, u = Nn(a, n, d, i.radius);
      u !== null && Ne(e, n, u + (l && o < 3 && c ? Math.PI : a ? 0 : h), i.speed * (n.chill ? ye(n.kind) ? 0.8 : 0.5 : 1) * (r ? 1.08 : 1), i.radius, a);
    }
    for (const h of e.enemies) h.id !== n.id && h.hp > 0 && F(n, h) < i.radius + ie[h.kind].radius && Ne(e, n, ue(h, n), 0.027, i.radius, a);
  }
}
function Wt(e, t, s) {
  if (e.kind === "beam") return qs(t, e, e.angle, e.length) < e.width + s;
  const a = F(e, t);
  return a < e.radius + s && (e.kind !== "ring" || a > e.inner - s);
}
function so(e, t, s) {
  for (const a of e.shots) {
    if (a.life <= 0) continue;
    const n = {
      x: a.x,
      y: a.y
    };
    if (a.x += Math.cos(a.angle) * a.speed, a.y += Math.sin(a.angle) * a.speed, a.life--, s ? !ee(s, n, a, a.radius) : Math.abs(a.x) > W.arena || Math.abs(a.y) > W.arena || e.obstacles.some((i) => F(i, a) < i.radius + a.radius)) {
      a.life = 0;
      continue;
    }
    if (!a.friendly) {
      if (F(a, e.player) < W.playerRadius + a.radius && ee(s, a, e.player)) e.player.shield > 0 ? (qn(e, t, s), a.friendly = !0, a.source = "skill", a.angle += Math.PI, a.damage *= 1.8, a.hits = []) : (aa(e, a.damage, t, s), a.life = 0);
      else {
        const i = e.companions.find((r) => r.hp > 0 && F(a, r) < 0.3 + a.radius && ee(s, a, r));
        i && (i.hp -= a.damage * (1 - I(t, "covenant") * 0.12), a.life = 0);
      }
      continue;
    }
    for (const i of e.enemies) {
      if (i.hp <= 0 || a.hits.includes(i.id) || F(i, a) > ie[i.kind].radius + a.radius || !ee(s, a, i)) continue;
      a.hits.push(i.id);
      const r = a.damage * (I(t, "hunter") && F(i, e.player) > Pe.hunterRange ? Pe.hunterDamage + (I(t, "hunter") - 1) * 0.15 : 1);
      if (Ae(e, i, r, t, a.source, a, s), I(t, "pinning") && a.source === "attack" && (i.chill = 50 + I(t, "pinning") * 20, e.player.combo % 3 === 0 && Ge(e, i, 8 * I(t, "pinning"))), a.splash > 0) {
        fe(e, i, "burst", a.splash);
        for (const d of e.enemies) d.id !== i.id && F(d, i) < a.splash + ie[d.kind].radius && Ae(e, d, r * 0.55, t, a.source, i, s);
      }
      if (a.bounce > 0) {
        const d = e.enemies.filter((o) => o.hp > 0 && !a.hits.includes(o.id) && F(o, i) < 6 && ee(s, a, o, a.radius)).sort((o, c) => F(i, o) - F(i, c))[0];
        if (d) {
          a.bounce--, a.angle = ue(a, d), a.damage *= 0.8;
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
function oo(e, t, s) {
  for (const a of [...e.hazards]) {
    if (a.wait > 0) {
      a.wait--;
      continue;
    }
    if (a.life--, !a.friendly) {
      Wt(a, e.player, W.playerRadius) && ee(s, a, e.player) && aa(e, a.damage, t, s), !e.boss && e.encounter === "siege" && e.tick % 15 === 0 && Wt(a, e.objective, 0.6) && ee(s, a, e.objective) && (e.objective.hp = Math.max(0, e.objective.hp - a.damage * 0.35));
      const i = a.kind === "slam" || a.kind === "beam" || a.kind === "ring";
      if (i || e.tick % 15 === 0)
        for (const r of e.companions) r.hp > 0 && (!i || !a.hits.includes(r.id)) && Wt(a, r, 0.3) && ee(s, a, r) && (r.hp -= a.damage * 0.25, i && a.hits.push(r.id));
      continue;
    }
    if (a.kind !== "slam" && a.kind !== "mine" && e.tick % 15 !== 0) continue;
    const n = e.enemies.filter((i) => i.hp > 0 && Wt(a, i, ie[i.kind].radius) && ee(s, a, i));
    a.kind === "mine" && n.length && (a.life = 0, fe(e, a, "burst", a.radius));
    for (const i of n) a.kind === "storm" ? $a(e, i, t, a.damage, s, a) : (a.kind === "fire" && (i.burn = Math.max(i.burn, 45)), a.kind === "frost" && (i.chill = Math.max(i.chill, 60)), a.kind === "mine" && Ge(e, i, 25), Ae(e, i, a.damage, t, a.source, a, s));
  }
  e.hazards = e.hazards.filter((a) => a.life > 0);
}
function io(e, t, s) {
  so(e, t, s), oo(e, t, s);
}
function ro(e) {
  return e.player.hp <= 0 ? "fallen" : !e.boss && e.encounter === "siege" && e.objective.hp <= 0 ? "beacon" : null;
}
function lo(e, t, s) {
  const { seed: a, zone: n, chapter: i, elite: r, boss: d, bossKind: o, encounter: c, hp: l } = e, h = {
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
    obstacles: d ? o === "warden" || o === "colossus" ? [{
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
    waves: d ? 1 : r ? 3 : 2,
    nextWave: 0,
    kills: 0,
    damageTaken: 0,
    status: "fighting",
    zone: n,
    chapter: i,
    elite: r,
    boss: d,
    bossKind: o,
    encounter: c,
    objective: {
      x: 0,
      y: 0,
      hp: 100,
      progress: 0,
      target: 0
    }
  };
  return s && ((d && !ln(o) || s.waves.some((u) => u.some((y) => !ln(y.kind)))) && ve("encounter_unsupported"), (c !== "skirmish" || !s.waves.length || !Ke(s.space, s.entry, W.playerRadius) || s.waves.some((u) => !u.length || u.some((y) => !Ke(s.space, y.position, ie[y.kind].radius) || !$t(s.space, s.entry, y.position, W.playerRadius)))) && ve("map_invalid"), Object.assign(h.player, s.entry), Object.assign(h.objective, s.objective), h.obstacles = [], h.waves = s.waves.length), Ks(h), Qt(h, t, s), h;
}
function co(e, t, s, a) {
  if (e.status !== "fighting") return;
  e.tick++, e.effects = e.effects.filter((i) => --i.life > 0).slice(-80);
  const n = Qs(e, t, s, a);
  Us(e, s, a), no(e, s, n, a), io(e, s, a), e.enemies = e.enemies.filter((i) => i.hp > 0), ro(e) ? e.status = "lost" : (Ys(e, s, a), Gs(e) && (e.status = "won", e.shots = [], e.hazards = []));
}
function ho(e, t) {
  const s = e.at(-1);
  s && s.move === t.move && s.dash === t.dash && s.skill === t.skill ? s.ticks++ : e.push({
    ...t,
    ticks: 1
  });
}
function Dn(e, t) {
  return e.x >= t.x - t.width / 2 && e.x < t.x + t.width / 2 && e.y >= t.z - t.depth / 2 && e.y < t.z + t.depth / 2;
}
function at(e) {
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
  ].every(Number.isInteger)) && ve("map_invalid");
  const i = t.features.map((l) => l.id);
  new Set(i).size !== i.length && ve("map_invalid"), t.features.some((l) => [
    "tree",
    "tower",
    "wall",
    "arch",
    "column",
    "root"
  ].includes(l.kind) && (l.height === void 0 || !Number.isFinite(l.height) || l.height <= 0)) && ve("map_invalid");
  for (const l of n.slice(1)) (l.x - l.width / 2 < a.x || l.z - l.depth / 2 < a.y || l.x + l.width / 2 > a.x + s.width || l.z + l.depth / 2 > a.y + s.depth) && ve("map_invalid");
  t.roads.some((l) => !Number.isFinite(l.width) || l.width <= 0 || l.points.length < 2 || l.points.some(([h, u], y) => !Number.isFinite(h) || !Number.isFinite(u) || y > 0 && h === l.points[y - 1][0] && u === l.points[y - 1][1])) && ve("map_invalid");
  const r = [];
  for (let l = 0; l < s.depth; l++) {
    let h = "";
    for (let u = 0; u < s.width; u++) {
      const y = {
        x: a.x + u + 0.5,
        y: a.y + l + 0.5
      };
      h += t.features.some((f) => f.kind !== "arch" && Dn(y, f.footprint)) ? "#" : ".";
    }
    r.push(h);
  }
  const d = {
    origin: a,
    cellSize: 1,
    rows: r,
    gates: t.gates.map((l) => {
      const h = l.footprint, u = [];
      for (let y = h.z - h.depth / 2 - a.y; y < h.z + h.depth / 2 - a.y; y++) for (let f = h.x - h.width / 2 - a.x; f < h.x + h.width / 2 - a.x; f++) u.push({
        column: f,
        row: y
      });
      return {
        id: l.id,
        cells: u
      };
    })
  }, o = Rn(d, new Set(d.gates.map((l) => l.id)));
  Object.values(e.anchors).some((l) => !Ke(o, l, W.playerRadius)) && ve("map_invalid");
  const c = /* @__PURE__ */ new Set();
  for (const l of [...e.exits, ...e.objects])
    (!e.anchors[l.anchor] || c.has(l.id)) && ve("map_invalid"), c.add(l.id);
  return {
    ...e,
    map: d,
    gates: t.gates
  };
}
var _ = (e, t, s, a, n, i, r = {}) => ({
  id: e,
  kind: t,
  footprint: {
    x: s,
    z: a,
    width: n,
    depth: i
  },
  ...r
}), uo = at({
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
      _("clinic", "clinic", -19, 4, 14, 10),
      _("storehouse", "storehouse", 12, -9, 12, 12),
      _("hearth", "hearth", 0, 6, 4, 4),
      _("rest-bench", "bench", -5, 15, 2, 4),
      _("wagon", "wagon", 22, 3, 4, 6),
      _("supply-crates", "supplies", 20, -5, 4, 4),
      _("herbs", "planter", -29, 0, 4, 10),
      _("herbs-small", "planter", -23, 10, 6, 2),
      _("plaza-tree", "tree", -12, 20, 4, 4, {
        height: 7,
        tint: "amber"
      }),
      _("orchard-tree", "tree", 15, 20, 4, 4, {
        height: 8,
        tint: "sage"
      }),
      _("clinic-tree", "tree", -31, -12, 4, 4, {
        height: 9,
        tint: "rose"
      }),
      _("east-tree", "tree", 34, -16, 4, 4, {
        height: 10,
        tint: "sage"
      }),
      _("garden-tree", "tree", -16, -19, 4, 4, {
        height: 8,
        tint: "sage"
      }),
      _("canal-west", "water", -26, -28, 44, 4),
      _("canal-east", "water", 26, -28, 44, 4),
      _("bridge-west", "wall", -5, -28, 2, 6, { height: 0.8 }),
      _("bridge-east", "wall", 5, -28, 2, 6, { height: 0.8 }),
      _("gate-west", "wall", -26, -49, 44, 4, { height: 6 }),
      _("gate-east", "wall", 26, -49, 44, 4, { height: 6 }),
      _("west-watchtower", "tower", -8, -49, 6, 8, { height: 12 }),
      _("east-watchtower", "tower", 8, -49, 6, 8, { height: 12 }),
      _("departure-arch", "arch", 0, -49, 10, 4, { height: 8 }),
      _("west-boundary", "wall", -37, -26, 2, 62, { height: 2.4 }),
      _("postern-bottom", "wall", -37, 25, 2, 32, { height: 2.4 }),
      _("south-boundary", "wall", 0, 40, 96, 4, { height: 1 }),
      _("east-boundary", "wall", 46, -8, 4, 96, { height: 1.2 }),
      _("postern-end", "wall", -47, -8, 2, 100, { height: 2.4 }),
      _("north-boundary", "wall", 0, -57, 96, 2, { height: 5 }),
      _("roadside-garden", "planter", -17, -38, 16, 8),
      _("lookout-ruin", "ruin", 24, -38, 6, 6, { height: 3 }),
      _("south-tree-a", "tree", -27, 28, 6, 6, {
        height: 10,
        tint: "sage"
      }),
      _("south-tree-b", "tree", 28, 30, 6, 6, {
        height: 10,
        tint: "amber"
      }),
      _("north-grove", "thicket", -24, -21, 18, 4),
      _("roadside-herbs", "thicket", -8, -12, 4, 10),
      _("clinic-hedge", "thicket", -20, -5, 16, 2)
    ]
  }
}), fo = at({
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
      _("wall-west", "wall", -30, -32, 2, 32, { height: 3 }),
      _("wall-west-low", "wall", -30, 19, 2, 58, { height: 2 }),
      _("wall-east", "wall", 24, -25, 4, 44, { height: 7 }),
      _("rampart-tower", "tower", 24, -16, 8, 8, { height: 15 }),
      _("gate-tower-left", "tower", -8, -41, 6, 8, { height: 11 }),
      _("gate-tower-right", "tower", 8, -41, 6, 8, { height: 11 }),
      _("north-arch", "arch", 0, -41, 10, 4, { height: 8 }),
      _("west-gate-wall", "wall", -26, -43, 40, 4, { height: 5 }),
      _("east-gate-wall", "wall", 36, -43, 20, 4, { height: 5 }),
      _("road-ruin", "ruin", -12, 1, 6, 6, { height: 3.5 }),
      _("fallen-column", "ruin", 12, -2, 4, 4, { height: 1.2 }),
      _("road-tree", "tree", -17, 27, 4, 4, {
        height: 9,
        tint: "amber"
      }),
      _("roots-tree", "tree", -39, -25, 6, 6, {
        height: 13,
        tint: "sage"
      }),
      _("southern-tree", "tree", 17, 37, 4, 4, {
        height: 9,
        tint: "sage"
      }),
      _("arrival-watch-west", "tower", -8, 44, 6, 8, { height: 10 }),
      _("arrival-watch-east", "tower", 8, 44, 6, 8, { height: 10 }),
      _("arrival-arch", "arch", 0, 44, 10, 4, { height: 8 }),
      _("broken-convoy", "wagon", -12, 19, 4, 6),
      _("convoy-supplies", "supplies", -16, 16, 4, 4),
      _("west-growth", "thicket", -24, 28, 8, 12),
      _("east-growth", "thicket", 18, 25, 6, 8),
      _("old-border", "thicket", -18, -6, 14, 4),
      _("waterway-bank", "water", 37, 21, 22, 16),
      _("north-boundary", "wall", 0, -47, 96, 2, { height: 5 }),
      _("south-boundary-west", "wall", -26, 47, 44, 2, { height: 5 }),
      _("south-boundary-east", "wall", 26, 47, 44, 2, { height: 5 }),
      _("west-boundary", "wall", -47, 0, 2, 96, { height: 2 }),
      _("east-boundary", "wall", 47, 0, 2, 96, { height: 2 })
    ]
  }
}), po = at({
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
      _("outer-west", "wall", -35, 0, 2, 80, { height: 8 }),
      _("outer-east", "wall", 35, 0, 2, 80, { height: 8 }),
      _("north-wall", "wall", 0, -39, 72, 2, { height: 9 }),
      _("south-wall", "wall", 0, 39, 72, 2, { height: 5 }),
      _("gate-tower-west", "tower", -10, -27, 8, 12, { height: 16 }),
      _("gate-tower-east", "tower", 10, -27, 8, 12, { height: 16 }),
      _("main-arch", "arch", 0, -27, 12, 6, { height: 12 }),
      _("gate-flank-west", "wall", -25, -27, 22, 6, { height: 9 }),
      _("gate-flank-east", "wall", 25, -27, 22, 6, { height: 9 }),
      _("west-pillars", "ruin", -13, -3, 6, 4, { height: 4.8 }),
      _("east-pillars", "ruin", 13, -3, 6, 4, { height: 4.8 }),
      _("western-barracks", "storehouse", -25, 2, 12, 12),
      _("eastern-barracks", "storehouse", 25, 2, 12, 12),
      _("left-border", "planter", -15, 23, 4, 12),
      _("right-border", "planter", 15, 23, 4, 12),
      _("inspection-cart", "wagon", 25, 19, 4, 6),
      _("inspection-crates", "supplies", 28, 25, 4, 4),
      _("barracks-tree", "tree", -27, 26, 4, 4, {
        height: 9,
        tint: "amber"
      })
    ]
  }
}), mo = at({
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
      _("west-parapet", "wall", -35, 0, 2, 84, { height: 3 }),
      _("east-parapet", "wall", 35, 0, 2, 84, { height: 3 }),
      _("north-wall", "wall", 0, -41, 72, 2, { height: 9 }),
      _("south-wall", "wall", 0, 41, 72, 2, { height: 5 }),
      _("signal-brazier", "beacon", 0, -8, 6, 6),
      _("west-signal-column", "column", -20, -10, 4, 4, { height: 11 }),
      _("east-signal-column", "column", 20, -10, 4, 4, { height: 11 }),
      _("west-approach-column", "column", -20, 12, 4, 4, { height: 8 }),
      _("east-approach-column", "column", 20, 12, 4, 4, { height: 8 }),
      _("hall-tower-west", "tower", -10, -30, 8, 8, { height: 16 }),
      _("hall-tower-east", "tower", 10, -30, 8, 8, { height: 16 }),
      _("hall-arch", "arch", 0, -30, 12, 4, { height: 12 }),
      _("west-garden", "planter", -27, 19, 8, 22),
      _("east-garden", "planter", 27, 19, 8, 22),
      _("west-copper-store", "supplies", -26, -23, 6, 6),
      _("east-copper-store", "supplies", 26, -23, 6, 6)
    ]
  }
}), yo = at({
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
      _("west-wall", "wall", -31, 0, 2, 88, { height: 7 }),
      _("east-wall", "wall", 31, 0, 2, 88, { height: 7 }),
      _("north-wall", "wall", 0, -43, 64, 2, { height: 8 }),
      _("south-wall", "wall", 0, 43, 64, 2, { height: 8 }),
      _("upper-channel-west", "water", -24, -3, 12, 58),
      _("upper-channel-east", "water", 23, -12, 14, 48),
      _("lower-channel-west", "water", -13, 32, 30, 20),
      _("lower-channel-east", "water", 28, 32, 4, 20),
      _("sluice-west-abutment", "wall", -18, 16, 24, 4, { height: 5 }),
      _("sluice-east-abutment", "wall", 18, 16, 24, 4, { height: 5 }),
      _("upper-pier-west", "column", -15, -18, 4, 4, { height: 9 }),
      _("upper-pier-east", "column", 11, -18, 4, 4, { height: 9 }),
      _("lower-pier-west", "column", -13, 0, 4, 4, { height: 9 }),
      _("lower-pier-east", "column", 13, 0, 4, 4, { height: 9 }),
      _("vault-north", "arch", -2, -18, 26, 2, { height: 10 }),
      _("vault-middle", "arch", 0, 0, 26, 2, { height: 10 }),
      _("entry-marker", "ruin", -24, -39, 6, 2, { height: 5 }),
      _("maintenance-supplies", "supplies", 8, 36, 4, 4)
    ]
  }
}), go = at({
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
      _("west-wall", "wall", -31, 0, 2, 76, { height: 6 }),
      _("east-wall", "wall", 31, 0, 2, 76, { height: 6 }),
      _("north-wall", "wall", 0, -37, 64, 2, { height: 8 }),
      _("south-wall", "wall", 0, 37, 64, 2, { height: 6 }),
      _("cells-divider", "wall", 0, -24, 2, 28, { height: 6 }),
      _("cells-front-center", "wall", 0, -10, 20, 2, { height: 6 }),
      _("cells-front-west", "wall", -26, -10, 12, 2, { height: 6 }),
      _("cells-front-east", "wall", 26, -10, 12, 2, { height: 6 }),
      _("postern-divider", "wall", -7, 24, 50, 2, { height: 5 }),
      _("waterway-passage", "arch", -21, 19, 10, 2, { height: 7 }),
      _("postern-corridor", "wall", 17, 31, 2, 12, { height: 5 }),
      _("west-bunk", "bunk", -26, -24, 4, 8),
      _("east-bunk", "bunk", 26, -24, 4, 8),
      _("west-cell-bench", "bench", -8, -30, 2, 4),
      _("east-cell-bench", "bench", 8, -30, 2, 4),
      _("guard-desk", "supplies", 3, 12, 4, 4),
      _("hall-pier-west", "column", -7, -4, 2, 2, { height: 7 }),
      _("hall-pier-east", "column", 7, -4, 2, 2, { height: 7 })
    ]
  }
}), vo = at({
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
      _("west-wall", "wall", -39, 0, 2, 92, { height: 11 }),
      _("east-wall", "wall", 39, 0, 2, 92, { height: 11 }),
      _("north-wall", "wall", 0, -45, 80, 2, { height: 13 }),
      _("south-wall", "wall", 0, 45, 80, 2, { height: 8 }),
      _("western-front-column", "column", -15, 17, 4, 4, { height: 12 }),
      _("eastern-front-column", "column", 15, 17, 4, 4, { height: 12 }),
      _("western-middle-column", "column", -15, -3, 4, 4, { height: 12 }),
      _("eastern-middle-column", "column", 15, -3, 4, 4, { height: 12 }),
      _("western-rear-column", "column", -15, -25, 4, 4, { height: 12 }),
      _("eastern-rear-column", "column", 15, -25, 4, 4, { height: 12 }),
      _("entry-vault", "arch", 0, 17, 30, 2, { height: 14 }),
      _("rear-vault", "arch", 0, -25, 30, 2, { height: 14 }),
      _("west-gallery", "planter", -32, 4, 6, 28),
      _("east-gallery", "planter", 32, 4, 6, 28),
      _("west-gallery-bench", "bench", -28, 28, 2, 6),
      _("east-gallery-bench", "bench", 28, 28, 2, 6),
      _("crown-console", "supplies", 0, -41, 6, 4),
      _("northern-west-pillar", "column", -29, -35, 4, 4, { height: 14 }),
      _("northern-east-pillar", "column", 29, -35, 4, 4, { height: 14 })
    ]
  }
}), bo = at({
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
      _("west-enclosure", "wall", -39, 0, 2, 84, { height: 3 }),
      _("east-enclosure", "wall", 39, 0, 2, 84, { height: 3 }),
      _("north-enclosure", "wall", 0, -41, 80, 2, { height: 4 }),
      _("south-enclosure", "wall", 0, 41, 80, 2, { height: 3 }),
      _("dead-heartwood", "root", 0, -29, 12, 10, { height: 17 }),
      _("western-root", "root", -22, -15, 8, 4, { height: 3.8 }),
      _("eastern-root", "root", 22, -11, 8, 4, { height: 3.2 }),
      _("west-reflecting-pool", "water", -26, 9, 12, 16),
      _("east-reflecting-pool", "water", 26, 9, 12, 16),
      _("west-old-colonnade", "ruin", -15, 7, 4, 4, { height: 5 }),
      _("east-old-colonnade", "ruin", 15, 9, 4, 4, { height: 4 }),
      _("western-growth", "thicket", -29, -27, 14, 12),
      _("eastern-growth", "thicket", 29, -27, 14, 12),
      _("west-entry-pillar", "column", -7, 30, 4, 4, { height: 7 }),
      _("east-entry-pillar", "column", 7, 30, 4, 4, { height: 7 }),
      _("garden-arch", "arch", 0, 30, 14, 2, { height: 9 }),
      _("west-entry-tree", "tree", -21, 29, 6, 6, {
        height: 12,
        tint: "rose"
      }),
      _("east-entry-tree", "tree", 23, 29, 6, 6, {
        height: 12,
        tint: "sage"
      }),
      _("west-north-tree", "tree", -18, -33, 6, 6, {
        height: 14,
        tint: "sage"
      }),
      _("east-north-tree", "tree", 18, -33, 6, 6, {
        height: 14,
        tint: "rose"
      })
    ]
  }
}), be = {
  camp: uo,
  crossroads: fo,
  gate: po,
  beacon: mo,
  waterway: yo,
  cells: go,
  hall: vo,
  roots: bo
}, xo = 2.4;
function Xt(e, t) {
  return (!e?.all || e.all.every((s) => t.has(s))) && (!e?.none || e.none.every((s) => !t.has(s)));
}
var hn = /* @__PURE__ */ new WeakMap();
function ft(e, t) {
  const s = e.gates.filter((r) => Xt(r.condition, t)).map((r) => r.id), a = s.join("/");
  let n = hn.get(e);
  n || (n = /* @__PURE__ */ new Map(), hn.set(e, n));
  let i = n.get(a);
  return i || (i = Rn(e.map, new Set(s)), n.set(a, i)), i;
}
function wo(e, t) {
  const s = e.anchors[t];
  return s || ve("map_invalid"), {
    scene: e.id,
    position: { ...s },
    facing: -Math.PI / 2,
    visited: [e.id]
  };
}
function na(e, t) {
  const s = e.exits.filter((n) => Xt(n.condition, t)).map((n) => ({
    kind: "exit",
    target: n,
    position: e.anchors[n.anchor]
  })), a = e.objects.filter((n) => Xt(n.condition, t) && !(n.kind === "switch" && t.has(n.fact))).map((n) => ({
    kind: "object",
    target: n,
    position: e.anchors[n.anchor]
  }));
  return [...s, ...a];
}
function Mo(e, t, s) {
  const a = ft(e, s);
  return na(e, s).filter((n) => F(t.position, n.position) <= 2.4 && Ie(a, t.position, n.position)).sort((n, i) => F(t.position, n.position) - F(t.position, i.position) || n.target.id.localeCompare(i.target.id));
}
function ko(e, t, s, a = 1) {
  (!Number.isInteger(t) || t < 0 || t > 8) && ve("input_invalid"), t && (e.facing = Ba(t), Da(s, e.position, {
    x: Math.cos(e.facing) * W.speed * a,
    y: Math.sin(e.facing) * W.speed * a
  }, W.playerRadius));
}
var wt = {
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
function Bn(e, t, s, a, n, i) {
  const r = wt[e];
  if (!r || t.has(r.complete)) return null;
  const d = be[e], o = r.waves.map((c) => c.map((l) => ({
    kind: l.kind,
    position: d.anchors[l.anchor]
  })));
  return e === "hall" && i && o[0].push({
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
      boss: r.boss !== null,
      bossKind: r.boss ?? "warden",
      encounter: "skirmish",
      hp: n
    },
    field: {
      space: ft(d, t),
      entry: s,
      objective: d.anchors.encounter,
      waves: o,
      summonPoints: r.summons.map((c) => d.anchors[c])
    }
  };
}
var sa = {
  sanniang: "三娘",
  anian: "阿念",
  kouzi: "扣子",
  laobai: "老白"
}, qe = Object.keys(sa), _o = {
  sanniang: "changyounian_intel",
  laobai: "bajin_intel",
  anian: null,
  kouzi: null
}, se = Object.freeze({
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
  people: sa,
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
}), jt = {
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
}, Hn = {
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
    name: se.scenes.crossroads
  },
  gate: {
    scene: "gate",
    anchor: "crossroads",
    name: se.scenes.gate
  },
  beacon: {
    scene: "beacon",
    anchor: "gate",
    name: se.scenes.beacon
  },
  waterway: {
    scene: "waterway",
    anchor: "crossroads",
    name: se.scenes.waterway
  },
  cells: {
    scene: "cells",
    anchor: "release",
    name: se.scenes.cells
  },
  hall: {
    scene: "hall",
    anchor: "cells",
    name: se.scenes.hall
  },
  roots: {
    scene: "roots",
    anchor: "crossroads",
    name: se.scenes.roots
  }
}, oa = {
  briefing: {
    atHome: !1,
    people: ["sanniang", "laobai"],
    requires: [],
    fact: "briefed",
    label: "去哨站找人",
    meaning: "玩家接下哨站救援，得知正门与旧水道两条路线。",
    moments: ["一根细枝划过墙根的湿土。正门后是烽火台，旧水道通向牢房；牢房的小门朝着檐下。人带不动时，得先把那扇门打开。"]
  },
  receiving: {
    atHome: !1,
    people: ["laobai"],
    requires: [],
    fact: "receiving_arranged",
    label: "安排担架接应",
    meaning: "老白安排担架队在小门接应。牢门和小门打开后，玩家回到檐下才完成接回。",
    moments: ["老白把签本夹在腋下，腾出手去够门后的绳索。他没试着把伤腿踩实，只叫来两个人，把担架沿墙摆好。小门这边有人守着了。"]
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
    label: "清点归来的人与药",
    meaning: "与三娘核对回来的两个人和药材，结束第一章。第二章尚未开放。",
    moments: ["药箱合上，名单上多了两个勾。三娘把笔搁在箱沿，终于没有再伸手去找下一件事。"]
  },
  clinic: {
    atHome: !0,
    people: ["sanniang"],
    requires: ["captives_arrived", "supplies_secured"],
    fact: "clinic_helped",
    label: "一起整理诊棚",
    meaning: "协助三娘归置归还的药材。记录共同经历，不规定她的好感或态度。",
    moments: ["三娘把药材分成几堆，袖口挽得整齐。你把散开的绷带卷好，留出桌边一小块空处。她的手停了一下，才把那把椅子拉近。"]
  },
  sit: {
    atHome: !0,
    people: ["sanniang"],
    requires: [],
    fact: null,
    label: "在诊棚边坐一会儿",
    meaning: "玩家在诊棚边安静陪坐一会儿，不替人物决定关系进展。",
    moments: [
      "帘边漏进一线风。三娘把手里的针放回布包，拢了拢衣领。桌边空出来的位置没有再被药箱占住。",
      "诊棚外有人咳嗽，三娘侧耳听了听，没起身。药碾子搁在膝上，她慢慢推了两圈，又停下来。",
      "灯芯短了，三娘伸手拨亮，顺手把你那边的灯罩也擦了一下。帘外的人声远了些。"
    ]
  },
  stones: {
    atHome: !1,
    people: ["laobai"],
    requires: [],
    fact: null,
    label: "陪他摆一盘石子棋",
    meaning: "玩家陪老白用石子下棋，这是两人共同度过的一段时间。",
    moments: [
      "老白从墙根挑出几枚颜色不同的石子，把原先摆在左手边的一半推过来。这回另一边不用他自己下了。签本仍搁在够得着的地方。",
      "老白下到一半，盯着门外看了一会儿，回头才发现你挪了他一颗子。他没说破，把那颗又推回原处。",
      "石子不够了，老白从签本里抖出两粒干豆子顶上。这一盘他下得慢，伤腿伸直了搁在门槛上。"
    ]
  },
  play: {
    atHome: !1,
    people: ["anian"],
    requires: ["captives_arrived"],
    fact: null,
    label: "用小石子逗她玩",
    meaning: "玩家和阿念在诊棚旁玩猜石子的游戏，不自动改变剧情、认知或关系。",
    moments: [
      "阿念的目光跟着小石子转了一圈，伸手把地上的细沙抹平。货签压在膝下，她不再一张张摸它们了。",
      "石子藏在你左手，阿念猜右手。又猜右手。第三回她不猜了，直接来掰你的手指头，笑出了声。",
      "阿念把货签翻过来当棋盘，画了几道歪线。规矩是她现编的，编到一半忘了，又改了一条。"
    ]
  },
  tools: {
    atHome: !0,
    people: ["kouzi"],
    requires: ["supplies_secured", "captives_arrived"],
    fact: null,
    label: "把管件放到她够得着处",
    meaning: "把归还的管件放到管架旁，不强塞给扣子，也不替她修理。",
    moments: [
      "管件落在管架下的干地上。扣子先看了看你，没有伸手接。等你让开，她才换了个落脚点，把那枚松动的接头拧紧。",
      "你把一截弯管放在管架下。扣子蹲在上头没动，过了一会儿垂下一根绳，绳头打了个活扣。",
      "扣子在高处拧一枚卡死的阀，你在底下递不上手。她拧开了，把旧垫圈往下一扔，正落在你脚边。"
    ]
  }
}, Wn = Object.keys(oa);
function Qn(e, t, s) {
  return s.scene !== "camp" ? [] : Wn.filter((a) => {
    const n = oa[a], i = jt[t].home, r = be[i.scene].anchors[i.anchor];
    return n.atHome && Math.hypot(s.position.x - r.x, s.position.y - r.y) > 2.4 ? !1 : n.people.includes(t) && (n.fact === null || !e.includes(n.fact)) && n.requires.every((d) => e.includes(d));
  });
}
var ut = (e, t) => Math.hypot(e.x - t.x, e.y - t.y), un = /* @__PURE__ */ new WeakMap();
function Ta(e, t, s) {
  if (Ie(e, t, s, W.playerRadius)) return s;
  const a = ht(e.map, t), n = ht(e.map, s), i = `${a.column},${a.row}/${n.column},${n.row}`;
  let r = un.get(e);
  r || (r = /* @__PURE__ */ new Map(), un.set(e, r));
  const d = bt(e.map, a.column, a.row);
  if (!r.has(i)) {
    const c = $t(e, d, bt(e.map, n.column, n.row), W.playerRadius);
    r.size >= 512 && r.delete(r.keys().next().value), r.set(i, c?.find((l) => ut(l, d) > 0.01) ?? null);
  }
  const o = r.get(i);
  return o ? Ie(e, t, o, W.playerRadius) ? o : d : null;
}
function So(e) {
  return {
    scene: e.scene,
    position: { ...be[e.scene].anchors[e.anchor] },
    facing: 0,
    mode: "idle",
    destination: null
  };
}
function Po() {
  return Object.fromEntries(qe.map((e) => [e, So(jt[e].initial)]));
}
function Ut(e, t) {
  const s = wt[e];
  return !s || t.has(s.complete);
}
function Za(e, t, s, a) {
  const n = [{
    ...e,
    route: []
  }], i = /* @__PURE__ */ new Set();
  for (; n.length; ) {
    const r = n.shift(), d = be[r.scene], o = ft(d, s);
    if (r.scene === t.scene && Ta(o, r.position, d.anchors[t.anchor])) return r.route;
    for (const c of be[r.scene].exits) {
      const l = `${c.to}/${c.arrival}`;
      i.has(l) || !Xt(c.condition, s) || a && !Ut(c.to, s) || !Ta(o, r.position, d.anchors[c.anchor]) || (i.add(l), n.push({
        scene: c.to,
        position: be[c.to].anchors[c.arrival],
        route: [...r.route, c]
      }));
    }
  }
  return null;
}
function Un(e, t) {
  const s = new Set(e.facts), a = e.people[t];
  return Object.entries(Hn).map(([n, i]) => ({
    id: n,
    name: i.name,
    personHere: a.scene === i.scene && (n === i.scene || ut(a.position, be[i.scene].anchors[i.anchor]) <= 2.4),
    playerHere: e.location.scene === i.scene && (n === i.scene || ut(e.location.position, be[i.scene].anchors[i.anchor]) <= 2.4),
    accessible: (i.scene === "camp" || s.has("briefed")) && Za(a, i, s, !1) !== null,
    safe: Ut(i.scene, s),
    solo: Ut(a.scene, s) && Ut(i.scene, s) && Za(a, i, s, !0) !== null
  }));
}
function Io(e, t) {
  return !jt[t].captive || e.facts.includes("captives_arrived");
}
var Yn = (e) => xo * (0.7 + qe.indexOf(e) / qe.length * 0.2);
function zo(e) {
  return qe.some((t) => e.people[t].mode === "travel" || e.people[t].mode === "follow" && ut(e.people[t].position, e.location.position) >= Yn(t));
}
function Gn(e, t) {
  return qe.filter((s) => t[s].scene === e).map((s) => ({
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
function Kn(e) {
  return [...na(be[e.location.scene], new Set(e.facts)), ...Gn(e.location.scene, e.people)];
}
function Vn(e, t, s, a) {
  return Gn(e.id, a).filter((n) => {
    if (n.kind !== "object" || n.target.kind !== "person") return !1;
    const i = e.id === "cells" && jt[n.target.person].captive && !s.has("captives_arrived"), r = ft(e, i ? /* @__PURE__ */ new Set([...s, "captives_released"]) : s);
    return ut(n.position, t) <= (i ? 5 : 2.4) && Ie(r, t, n.position);
  });
}
function Co(e) {
  const t = new Set(e.facts);
  for (const s of qe) {
    const a = e.people[s];
    if (a.mode === "idle") continue;
    const n = be[a.scene], i = ft(n, t);
    let r, d;
    if (a.mode === "follow") {
      if (a.scene !== e.location.scene && pe("invalid"), r = e.location.position, ut(a.position, r) < Yn(s)) continue;
    } else {
      const y = Hn[a.destination], f = Za(a, y, t, !0);
      if (f || pe("unavailable"), d = f[0], r = n.anchors[d?.anchor ?? y.anchor], ut(a.position, r) < 0.2) {
        d ? (a.scene = d.to, a.position = { ...be[d.to].anchors[d.arrival] }) : (a.mode = "idle", a.destination = null);
        continue;
      }
    }
    const o = Ta(i, a.position, r);
    o || pe("unavailable");
    const c = o.x - a.position.x, l = o.y - a.position.y, h = Math.hypot(c, l), u = Math.min(h, W.speed * 1.8);
    h && (a.facing = Math.atan2(l, c), Da(i, a.position, {
      x: c / h * u,
      y: l / h * u
    }, W.playerRadius));
  }
}
var Ze = {
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
}, ia = Object.keys(Ze), Sa = [...qe, ...ia];
function Fe(e) {
  return Object.hasOwn(sa, e);
}
function He(e) {
  return Fe(e) ? sa[e] : Ze[e].name;
}
function ja(e, t) {
  const s = Ze[e];
  return be[s.scene].anchors[t.has(s.complete) ? s.clearedAnchor : s.anchor];
}
function Ha(e, t, s) {
  return ia.filter((a) => Ze[a].scene === e).flatMap((a) => {
    const n = ja(a, s), i = Ze[a];
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
var It = Object.freeze({
  encounterReach: 14,
  alarmTicks: 900,
  explorationSpeed: 1.65,
  playerTextLimit: 2e3,
  replyTextLimit: 8e3
});
function Ra(e) {
  return {
    weapon: e.weapon,
    oaths: [],
    relics: e.equipped.map((t) => e.collection.find((s) => s.id === t))
  };
}
function Eo(e, t) {
  if (e.phase !== "exploration" || !be[e.location.scene].safe) return "unavailable";
  if (t.length > W.relicSlots) return "capacity";
  if (new Set(t).size !== t.length || t.some((a) => !e.collection.some((n) => n.id === a))) return "invalid";
  const s = {
    weapon: e.weapon,
    oaths: [],
    relics: e.collection.filter((a) => t.includes(a.id))
  };
  return t.some((a) => !jn(s, a)) ? "dependency" : null;
}
function Ao(e, t, s, a) {
  return {
    id: e,
    seed: t,
    weapon: s,
    outfit: a,
    location: wo(be.camp, "start"),
    facts: [],
    hp: W.maxHp,
    collection: [],
    equipped: [],
    offers: [],
    phase: "exploration",
    battle: null,
    checkpoint: null,
    alarmTicks: 0,
    relationships: Object.fromEntries(qe.map((n) => [n, {
      affection: 0,
      highestBand: 0
    }])),
    people: Po(),
    pendingParley: null,
    evidence: { dispatchNoteSeen: !1 },
    conversations: Object.fromEntries(Sa.map((n) => [n, []])),
    memories: Object.fromEntries(Sa.map((n) => [n, null])),
    knowledge: Object.fromEntries(Sa.map((n) => [n, []]))
  };
}
function Xn(e, t, s) {
  e.facts.includes(t) || e.facts.push(t);
  const a = s ?? [...qe.filter((n) => e.people[n].scene === e.location.scene), ...ia.filter((n) => Ze[n].scene === e.location.scene)];
  for (const n of a) e.knowledge[n].includes(t) || e.knowledge[n].push(t);
}
function $o(e) {
  const t = e.checkpoint;
  return Bn(e.location.scene, new Set(e.facts), t?.player ?? e.location.position, t?.seed ?? e.seed, t?.player.hp ?? e.hp, e.facts.includes("alarm_raised") && !e.facts.includes("alarm_silenced"))?.field;
}
function To(e) {
  const t = wt[e.location.scene];
  Xn(e, t.complete);
  const s = Ra(e);
  t.boss && (e.hp = Math.min(W.maxHp, e.hp + 20 + I(s, "renewal") * Pe.renewalZoneHeal)), e.offers = Os(e, Ls(e.weapon).flatMap((a) => {
    const n = e.collection.find((i) => i.id === a)?.rank ?? 0;
    return n < W.maxRelicRank && jn(s, a) && (At[a].chapter === 0 || e.facts.includes("warden_defeated")) ? [{
      id: a,
      rank: n + 1
    }] : [];
  }), 3), e.phase = e.offers.length ? "reward" : "exploration", e.battle = null, e.checkpoint = null;
}
function fn(e, t) {
  if (!e.pendingParley) {
    if (e.phase === "battle" && e.battle) {
      const s = $o(e);
      s || pe("invalid"), co(e.battle, t, Ra(e), s);
      const a = e.battle;
      e.hp = a.player.hp, e.location.position = {
        x: a.player.x,
        y: a.player.y
      }, e.location.facing = a.player.facing, ["gate", "beacon"].includes(e.location.scene) && !e.facts.includes("alarm_silenced") && (e.alarmTicks++, e.alarmTicks >= It.alarmTicks && Xn(e, "alarm_raised")), a.status === "won" ? To(e) : a.status === "lost" && (e.phase = "lost");
    } else if (e.phase === "exploration") {
      const s = be[e.location.scene], a = new Set(e.facts);
      ko(e.location, t.move, ft(s, a), It.explorationSpeed);
      const n = wt[s.id], i = s.anchors.encounter;
      if (n && !a.has(n.complete) && i && Math.hypot(e.location.position.x - i.x, e.location.position.y - i.y) <= (n.triggerRadius ?? It.encounterReach)) {
        const r = Bn(s.id, a, e.location.position, Math.floor(ta(e) * 4294967296), e.hp, a.has("alarm_raised") && !a.has("alarm_silenced"));
        e.battle = lo(r.setup, Ra(e), r.field), e.checkpoint = structuredClone(e.battle), e.phase = "battle";
      }
    }
    (e.phase === "exploration" || e.phase === "battle") && Co(e);
  }
}
function pn(e) {
  return (!e || typeof e != "object" || Array.isArray(e)) && pe("invalid"), e;
}
function mn(e, t = 0, s = Number.MAX_SAFE_INTEGER) {
  return (!Number.isSafeInteger(e) || Number(e) < t || Number(e) > s) && pe("invalid"), e;
}
function Tt(e, t) {
  return (typeof e != "string" || !t.includes(e)) && pe("invalid"), e;
}
function yn(e, t, s) {
  return (!Array.isArray(e) || e.length > t) && pe("invalid"), e.map(s);
}
function Zo(e) {
  return new Set(e).size !== e.length && pe("invalid"), e;
}
function gn(e) {
  typeof e != "boolean" && pe("invalid");
}
function jo(e) {
  return (typeof e != "string" || !/^[a-zA-Z0-9_-]{1,100}$/.test(e)) && pe("identity"), e;
}
var Jt = Object.freeze({
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
function Wa(e) {
  return Jt.bands.filter((t) => e >= t).length - 1;
}
var Ro = (e) => Tt(e, za), vn = (e) => Tt(e, Zn), bn = (e) => Tt(e, Tn);
function Oo(e) {
  const t = pn(e);
  switch (t.type) {
    case "start":
    case "restart":
      return {
        type: t.type,
        weapon: Ro(t.weapon),
        outfit: bn(t.outfit)
      };
    case "purchase":
    case "equip":
      return {
        type: t.type,
        id: bn(t.id)
      };
    case "interact":
      return {
        type: "interact",
        id: jo(t.id)
      };
    case "choice":
      return {
        type: "choice",
        id: Tt(t.id, Wn),
        person: Tt(t.person, qe)
      };
    case "loadout":
      return {
        type: "loadout",
        equipped: Zo(yn(t.equipped, W.relicSlots, vn))
      };
    case "input": {
      const s = yn(t.spans, W.maxInputTicks, (a) => {
        const n = pn(a);
        return gn(n.dash), gn(n.skill), {
          move: mn(n.move, 0, 8),
          dash: n.dash,
          skill: n.skill,
          ticks: mn(n.ticks, 1, W.maxInputTicks)
        };
      });
      return (!s.length || s.reduce((a, n) => a + n.ticks, 0) > W.maxInputTicks) && pe("invalid"), {
        type: "input",
        spans: s
      };
    }
    case "relic":
      return {
        type: "relic",
        id: vn(t.id)
      };
    case "leave":
    case "retry":
    case "retreat":
    case "resolve_parley":
      return { type: t.type };
    default:
      return pe("invalid");
  }
}
function Lo(e, t) {
  const s = Ct(null), a = J(!1), n = J(""), i = Ct(null), r = J(!1), d = J(!1), o = J(null), c = oe(() => s.value?.replyFailure?.actionId === o.value ? null : s.value?.replyFailure ?? null), l = oe(() => r.value || !!s.value?.conversation), h = J(!1), u = J(!1);
  let y = !1, f = null;
  const g = oe(() => a.value || l.value || d.value || !!i.value || !s.value?.ready || s.value.writeState !== "ready" || s.value.pending);
  function v(C) {
    !y && (!s.value || C.data.revision >= s.value.data.revision) && (s.value = C);
  }
  async function b(C, L) {
    if (y || a.value) return !1;
    a.value = !0, f = null, n.value = "";
    try {
      const N = await e.request(`game/expedition/${C}`, {
        chatIdentity: t,
        ...C === "rebuild" ? { actionId: Ma() } : {},
        ...L
      }, 35e3), A = f;
      return v(A && A.data.revision >= N.result.data.revision ? A : N.result), h.value = !1, u.value = !1, s.value?.writeState === "ready" && !s.value.pending && C !== "read" && (i.value = null), !0;
    } catch (N) {
      if (!y) {
        h.value = !0, f && v(f), n.value = ct(N);
        const A = N && typeof N == "object" && "code" in N ? String(N.code) : "";
        u.value = A === "expedition_data_invalid", L && (A.startsWith("expedition_save_") || A.startsWith("host_request_")) && (i.value = L);
      }
      return !1;
    } finally {
      y || (a.value = !1);
    }
  }
  const m = e.subscribe((C) => {
    if (y) return;
    if (C.type === "game/expedition/error") {
      const N = C.payload;
      N.chatIdentity === t && (n.value = ct(N), u.value = N.code === "expedition_data_invalid");
      return;
    }
    if (C.type !== "game/expedition/state") return;
    const L = C.payload;
    L.chatIdentity === t && (a.value ? f = L.state : v(L.state));
  });
  async function x() {
    const C = i.value;
    return !await b("confirm") || !s.value || s.value.writeState !== "ready" || s.value.pending ? !1 : C && s.value.data.revision === C.revision ? b("act", C) : (i.value = null, d.value = !1, !0);
  }
  async function w(C, L) {
    if (g.value || y) return !1;
    const N = Ma();
    r.value = !0, a.value = !0, n.value = "", f = null;
    try {
      const A = await e.request("game/expedition/talk", {
        chatIdentity: t,
        actionId: N,
        revision: s.value.data.revision,
        person: C,
        text: L
      }, 18e4), R = f;
      return v(R && R.data.revision >= A.result.data.revision ? R : A.result), !0;
    } catch (A) {
      if (!y) {
        f && v(f);
        const R = A && typeof A == "object" && "code" in A ? String(A.code) : A instanceof Error ? A.message : "";
        if (R === "expedition_cancelled")
          return n.value = "", !1;
        d.value = R.startsWith("host_request_") || R.startsWith("expedition_save_"), n.value = d.value ? j.aiUnknown : s.value?.replyFailure?.actionId === N ? "" : ct(A);
      }
      return !1;
    } finally {
      r.value = !1, y || (a.value = !1);
    }
  }
  async function k() {
    if (l.value)
      try {
        await e.request("game/expedition/cancel", { chatIdentity: t }, 35e3);
      } catch (C) {
        y || (n.value = ct(C));
      }
  }
  const z = oe(() => h.value || !!i.value || d.value || !s.value || s.value.pending || s.value.writeState !== "ready");
  return {
    view: s,
    busy: a,
    error: n,
    blocked: g,
    failed: i,
    talking: l,
    uncertainTalk: d,
    talk: w,
    cancelTalk: k,
    recoveryRequired: z,
    dataInvalid: u,
    conversationFailure: c,
    dismissConversationFailure() {
      o.value = s.value?.replyFailure?.actionId ?? null;
    },
    rebuild: () => b("rebuild"),
    dismissError() {
      z.value || (n.value = "");
    },
    notice: oe(() => n.value || (s.value && (s.value.pending || s.value.writeState !== "ready") ? Y.saveError : "")),
    read: () => b("read"),
    recover: x,
    act: (C) => g.value ? Promise.resolve(!1) : b("act", {
      actionId: Ma(),
      revision: s.value.data.revision,
      command: Oo(C)
    }),
    dispose() {
      y = !0, m();
    }
  };
}
function No(e) {
  const t = Ct(null), s = Ct(!1);
  let a = [], n = 0, i = null, r = !1;
  function d() {
    const h = e.view.value?.data.active;
    if (t.value = h ? structuredClone(h) : null, t.value) for (const u of a) for (let y = 0; y < u.ticks; y++) fn(t.value, u);
    s.value = a.length > 0;
  }
  const o = Se(e.view, () => {
    !i && !a.length && d();
  }, { immediate: !0 });
  async function c() {
    if (i)
      return await i ? c() : !1;
    if (!a.length) return !e.blocked.value;
    if (e.blocked.value || r) return !1;
    const h = a;
    a = [], n = 0, i = e.act({
      type: "input",
      spans: h
    });
    const u = await i;
    return i = null, u ? d() : e.failed.value || (a = h.concat(a), n = a.reduce((y, f) => y + f.ticks, 0)), s.value = a.length > 0 || !u, u;
  }
  function l(h) {
    const u = t.value;
    !u || r || e.failed.value || e.uncertainTalk.value || e.notice.value || n >= W.maxInputTicks || !["exploration", "battle"].includes(u.phase) || u.phase === "exploration" && !h.move && !zo(u) || (fn(u, h), ho(a, h), n++, s.value = !0, ms(t), (n >= W.checkpointTicks || !["exploration", "battle"].includes(u.phase)) && c());
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
      r = !0, o();
    }
  };
}
function Fo(e) {
  let t = null, s = null, a = null, n = !1, i = !1, r = null, d = -1, o = 0, c = 0, l = 0, h = 0, u = 0;
  function y(g, v, b, m = "sine", x = g * 0.8, w = 0) {
    if (!n || !t || !s || t.state !== "running") return;
    const k = t.createOscillator(), z = t.createGain(), C = t.currentTime + w;
    k.type = m, k.frequency.setValueAtTime(g, C), k.frequency.exponentialRampToValueAtTime(Math.max(30, x), C + v), z.gain.setValueAtTime(1e-4, C), z.gain.exponentialRampToValueAtTime(b, C + 9e-3), z.gain.exponentialRampToValueAtTime(1e-4, C + v), k.connect(z).connect(s), k.start(C), k.stop(C + v), k.onended = () => {
      k.disconnect(), z.disconnect();
    };
  }
  function f(g, v, b, m) {
    if (!n || !t || !s || !a || t.state !== "running") return;
    const x = t.createBufferSource(), w = t.createBiquadFilter(), k = t.createGain(), z = t.currentTime;
    x.buffer = a, w.type = "bandpass", w.Q.value = 0.65, w.frequency.setValueAtTime(b, z), w.frequency.exponentialRampToValueAtTime(m, z + g), k.gain.setValueAtTime(1e-4, z), k.gain.exponentialRampToValueAtTime(v, z + 8e-3), k.gain.exponentialRampToValueAtTime(1e-4, z + g), x.connect(w).connect(k).connect(s), x.start(z), x.stop(z + g), x.onended = () => {
      x.disconnect(), w.disconnect(), k.disconnect();
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
            const v = a.getChannelData(0);
            for (let b = 0; b < v.length; b++) v[b] = Math.random() * 2 - 1;
          }
          await t.resume();
        } catch {
          n = !1, i || e();
        }
      }
    },
    tick(g) {
      (!r || g.tick < d) && (d = -1, o = g.player.hp, c = g.kills, l = g.player.skill, h = g.serial, u = g.player.combo), r = g, d !== g.tick && (d = g.tick, g.player.hp < o && (f(0.16, 0.17, 800, 120), y(95, 0.2, 0.12, "triangle", 42)), g.kills > c && (y(659, 0.22, 0.045), y(988, 0.3, 0.025, "sine", 980, 0.035)), g.player.combo > u && f(0.095, 0.08, 2700, 500), g.player.dashTime === 7 && f(0.2, 0.09, 500, 2600), g.player.skill > l && (f(0.24, 0.12, 2200, 250), y(165, 0.35, 0.075, "triangle", 82), y(660, 0.36, 0.035, "sine", 440, 0.02)), g.effects.some((v) => v.id > h && v.kind === "lightning") && (f(0.12, 0.1, 4400, 1e3), y(1200, 0.08, 0.018, "sine", 210)), g.effects.some((v) => v.id > h && (v.kind === "block" || v.kind === "parry")) && (y(1350, 0.18, 0.07, "triangle", 740), y(2200, 0.11, 0.025, "sine", 1600)), g.effects.some((v) => v.id > h && v.kind === "ward-hit") && y(510, 0.16, 0.06, "sine", 250), g.effects.some((v) => v.id > h && v.kind === "ward-break") && (f(0.25, 0.1, 3600, 650), y(720, 0.3, 0.05, "sine", 120)), g.status === "won" && [
        392,
        494,
        587,
        784
      ].forEach((v, b) => y(v, 0.65, 0.04, "sine", v, b * 0.075)), g.status === "lost" && y(147, 0.7, 0.06, "triangle", 73), o = g.player.hp, c = g.kills, l = g.player.skill, h = g.serial, u = g.player.combo);
    },
    dispose() {
      i = !0, n = !1, t && (t.close().catch(e), t = null), s = null, a = null;
    }
  };
}
var Ue = {
  height: 23,
  distance: 25,
  lead: 5,
  minimumWidth: 42,
  mobileWidth: 26,
  tallSpan: 28,
  shortSpan: 19
}, Ee = {
  ward: "#75c7eb",
  edge: "#e5f6ff",
  block: "#dcc08a",
  parry: "#fff2c9",
  enamel: "#42647c",
  silver: "#e4e7df"
}, Oe = {
  familiar: "#8cc9bc",
  empowered: "#f1d89e",
  crest: "#9daedc",
  page: "#f2ecda",
  cover: "#4d5876"
}, ra = [
  {
    sky: "#bfe3e8",
    haze: "#d2edef",
    stone: "#dce1cf",
    light: "#f2f0dc",
    floor: "#b8c6b1",
    tile: "#becab6",
    seam: "#a0b59f",
    dark: "#214e54",
    trim: "#c0a477",
    accent: "#78baa0",
    foliage: "#39775f",
    flower: "#e8b995",
    water: "#82aeb0"
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
], qo = {
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
}, uc = Object.fromEntries(Object.entries(At).map(([e, t]) => [e, qo[t.family]]));
function Do(e, t, s) {
  const a = /* @__PURE__ */ new Set();
  let n = {
    x: 0,
    y: 0
  }, i = !1, r = !1;
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
  function o(u) {
    if (!(!d.includes(u.code) || u.target instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(u.target.tagName)) && !(u.code === "Space" && u.target instanceof HTMLElement && u.target.closest("button"))) {
      if (u.preventDefault(), u.stopPropagation(), s(), u.code === "Escape") {
        u.repeat || t();
        return;
      }
      a.add(u.code), !u.repeat && u.code === "Space" && (i = !0), !u.repeat && u.code === "KeyE" && (r = !0);
    }
  }
  function c(u) {
    a.delete(u.code);
  }
  function l() {
    a.clear(), n = {
      x: 0,
      y: 0
    }, i = !1, r = !1;
  }
  function h() {
    l(), t();
  }
  return e.addEventListener("keydown", o), window.addEventListener("keyup", c), window.addEventListener("blur", h), {
    frame() {
      const u = n.x || Number(a.has("KeyD") || a.has("ArrowRight")) - Number(a.has("KeyA") || a.has("ArrowLeft")), y = n.y || Number(a.has("KeyS") || a.has("ArrowDown")) - Number(a.has("KeyW") || a.has("ArrowUp")), f = {
        move: Math.hypot(u, y) < 0.15 ? 0 : (Math.round((Math.atan2(y, u) + Math.PI / 2) / (Math.PI / 4)) + 8 - 1) % 8 + 1,
        dash: i,
        skill: r
      };
      return i = !1, r = !1, f;
    },
    stick(u, y) {
      n = {
        x: u,
        y
      };
    },
    dash() {
      i = !0, s();
    },
    skill() {
      r = !0, s();
    },
    clear: l,
    dispose() {
      l(), e.removeEventListener("keydown", o), window.removeEventListener("keyup", c), window.removeEventListener("blur", h);
    }
  };
}
function Bo(e, t) {
  let s = null;
  function a(i) {
    if (!s || i.pointerId !== s.id) return;
    const r = s.surface.getBoundingClientRect(), d = r.width * 0.36, o = (i.clientX - r.left - r.width / 2) / d, c = (i.clientY - r.top - r.height / 2) / d, l = Math.max(1, Math.hypot(o, c));
    e(o / l, c / l);
  }
  function n() {
    const i = s;
    s = null, e(0, 0), i?.surface.hasPointerCapture(i.id) && i.surface.releasePointerCapture(i.id);
  }
  return {
    down(i) {
      if (s || i.button !== 0) return;
      t();
      const r = i.currentTarget;
      r.setPointerCapture(i.pointerId), s = {
        id: i.pointerId,
        surface: r
      }, a(i);
    },
    move: a,
    release(i) {
      s?.id === i.pointerId && n();
    },
    clear: n
  };
}
function Oa() {
  const e = new sn();
  e.absarc(0, 0, 1.1, 0, Math.PI, !1), e.lineTo(-0.86, 0), e.absarc(0, 0, 0.86, Math.PI, 0, !0), e.closePath();
  const t = {
    box: new ks(1, 1, 1),
    sphere: new bs(1, 20, 14),
    rock: new rn(1, 0),
    crown: new rn(1, 1),
    cylinder: new Cs(1, 1, 1, 24),
    cone: new Ss(1, 1, 12),
    disc: new _s(1, 48),
    ring: new ba(0.965, 1, 64),
    arc: new ba(0.87, 1, 40, 1, -0.2, Math.PI * 1.3),
    torus: new nn(1, 0.08, 8, 40),
    stroke: new ba(0.975, 1, 48, 1, -0.2, Math.PI * 1.3),
    crescent: new nn(1, 0.14, 6, 24, Math.PI * 1.45),
    arch: new on(e, {
      depth: 1,
      bevelEnabled: !1,
      curveSegments: 24
    }).translate(0, 0, -0.5)
  }, s = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
  function n(l, h = !1, u = 1, y = !1) {
    const f = `${l}/${h}/${u}/${y}`;
    let g = a.get(f);
    return g || (g = h ? new Ms({
      color: l,
      transparent: u < 1,
      opacity: u,
      depthWrite: u === 1,
      side: 2
    }) : new ws({
      color: l,
      roughness: y ? 0.34 : 0.88,
      metalness: y ? 0.45 : 0.02,
      side: 2
    }), a.set(f, g)), g;
  }
  function i(l, h, u, y, f = [
    0,
    0,
    0
  ], g = !1, v = 1, b = !1) {
    const m = new vt(t[h], n(u, g, v, b));
    return m.scale.set(...y), m.position.set(...f), m.castShadow = !g, m.receiveShadow = !g, l.add(m), m;
  }
  function r(l, h = [
    0,
    0,
    0
  ]) {
    const u = new St();
    return u.position.set(...h), l.add(u), u;
  }
  function d(l, h, u, y, f, g = 1, v = !1, b = 0.04) {
    const m = i(l, v ? "disc" : "ring", h, [
      u,
      u,
      1
    ], [
      y,
      b,
      f
    ], !0, g);
    return m.rotation.x = -Math.PI / 2, m;
  }
  function o(l, h, u, y = [
    0,
    0,
    0
  ], f = 0) {
    const g = JSON.stringify([h, f]);
    let v = s.get(g);
    if (!v) {
      const m = new sn();
      h.forEach(([x, w], k) => k ? m.lineTo(x, w) : m.moveTo(x, w)), m.closePath(), v = f ? new on(m, {
        depth: f,
        steps: 1,
        bevelEnabled: !0,
        bevelThickness: f * 0.3,
        bevelSize: f * 0.3,
        bevelSegments: 2
      }) : new vs(m), s.set(g, v);
    }
    const b = new vt(v, n(u));
    return b.position.set(...y), b.castShadow = !0, b.receiveShadow = !0, l.add(b), b;
  }
  function c(l) {
    l.updateMatrixWorld(!0);
    const h = l.matrixWorld.clone().invert(), u = new xs(), y = /* @__PURE__ */ new Map();
    l.traverse((g) => {
      if (!(g instanceof vt) || Array.isArray(g.material)) return;
      const v = (g.geometry.index ? g.geometry.toNonIndexed() : g.geometry.clone()).applyMatrix4(u.multiplyMatrices(h, g.matrixWorld)), b = `${g.material.uuid}/${g.castShadow}/${g.receiveShadow}`;
      let m = y.get(b);
      m || (m = {
        material: g.material,
        castShadow: g.castShadow,
        receiveShadow: g.receiveShadow,
        geometries: []
      }, y.set(b, m)), m.geometries.push(v);
    }), l.clear();
    const f = [];
    for (const { material: g, castShadow: v, receiveShadow: b, geometries: m } of y.values()) {
      const x = Zs(m);
      if (m.forEach((k) => k.dispose()), !x) throw new Error("expedition_geometry_merge");
      const w = new vt(x, g);
      w.castShadow = v, w.receiveShadow = b, l.add(w), f.push(x);
    }
    return () => {
      l.clear(), f.forEach((g) => g.dispose());
    };
  }
  return {
    mesh: i,
    group: r,
    ring: d,
    shape: o,
    material: n,
    bake: c,
    geometries: t,
    dispose() {
      Object.values(t).forEach((l) => l.dispose()), s.forEach((l) => l.dispose()), a.forEach((l) => l.dispose());
    }
  };
}
function Ho(e, t, s, a) {
  const n = ra[s], i = W.arena, { mesh: r, group: d, ring: o } = e, c = (f, g, v, b = n.stone) => r(f, "box", b, g, v);
  function l(f, g, v, b = !0) {
    const m = d(t, [
      f,
      0,
      g
    ]);
    c(m, [
      1.65,
      0.38,
      1.65
    ], [
      0,
      0.15,
      0
    ]), c(m, [
      1.3,
      0.3,
      1.3
    ], [
      0,
      0.49,
      0
    ], n.light), c(m, [
      0.91,
      v,
      0.91
    ], [
      0,
      v / 2 + 0.6,
      0
    ]);
    for (const x of [-0.38, 0.38]) c(m, [
      0.08,
      v - 0.35,
      0.12
    ], [
      x,
      v / 2 + 0.6,
      0.48
    ], n.light);
    return c(m, [
      1.3,
      0.24,
      1.3
    ], [
      0,
      v + 0.6,
      0
    ], n.light), c(m, [
      1.56,
      0.3,
      1.56
    ], [
      0,
      v + 0.85,
      0
    ], n.dark), b && (r(m, "cone", n.trim, [
      0.2,
      0.65,
      0.2
    ], [
      0,
      v + 1.24,
      0
    ]), c(m, [
      0.16,
      0.6,
      0.08
    ], [
      0,
      v - 0.15,
      0.52
    ], n.trim)), m;
  }
  function h(f, g, v, b) {
    l(f - v / 2, g, b - 2), l(f + v / 2, g, b - 2);
    const m = d(t, [
      f,
      b - 2,
      g
    ]);
    r(m, "arch", n.light, [
      v / 2,
      2.3,
      1.15
    ]);
    for (let x = 1; x < 10; x++) {
      const w = x / 10 * Math.PI, k = c(m, [
        0.025,
        0.64,
        0.025
      ], [
        Math.cos(w) * v * 0.49,
        Math.sin(w) * 2.25,
        0.59
      ], n.trim);
      k.rotation.z = w - Math.PI / 2;
    }
    c(m, [
      0.6,
      0.9,
      1.3
    ], [
      0,
      2.28,
      0
    ], n.trim);
  }
  function u(f, g, v = 1) {
    const b = d(t, [
      f,
      0,
      g
    ]);
    b.scale.setScalar(v);
    for (let m = 0; m < 5; m++) {
      const x = m * 2.4, w = r(b, "rock", m % 2 ? n.foliage : n.accent, [
        0.55,
        0.8 + m % 2 * 0.3,
        0.45
      ], [
        Math.cos(x) * 0.4,
        0.5,
        Math.sin(x) * 0.4
      ]);
      w.rotation.z = Math.sin(x) * 0.4;
    }
    for (let m = 0; m < 3; m++) r(b, "rock", n.flower, [
      0.13,
      0.16,
      0.13
    ], [
      Math.sin(m * 4) * 0.5,
      1,
      Math.cos(m * 4) * 0.4
    ]);
  }
  function y(f, g, v) {
    const b = d(t, [
      f,
      0,
      g
    ]);
    b.scale.setScalar(v);
    const m = r(b, "cylinder", n.dark, [
      0.15,
      3.5,
      0.19
    ], [
      0,
      1.65,
      0
    ]);
    m.rotation.z = -0.1;
    for (let x = 0; x < 6; x++) {
      const w = x * 2.4;
      r(b, "rock", x % 2 ? n.foliage : n.accent, [
        1.65,
        0.88,
        1.4
      ], [
        Math.cos(w) * 0.95,
        3 + Math.sin(w) * 0.5,
        Math.sin(w) * 0.85
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
  for (let f = 0; f < 16; f++) c(t, [
    3 + f % 4 * 2,
    0.015,
    0.055
  ], [
    Math.sin(f * 7) * 32,
    -3.92,
    Math.cos(f * 3) * 25
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
  for (let f = -10; f <= 10; f += 2) for (let g = -10; g <= 10; g += 2) c(t, [
    1.96,
    0.045,
    1.96
  ], [
    f,
    0.025,
    g
  ], (f * 3 + g + 40) % 8 === 0 ? n.tile : n.floor);
  if (a) {
    o(t, n.trim, 5.35, 0, 0, 1, !1, 0.058), o(t, n.light, 5.18, 0, 0, 0.6, !1, 0.059), o(t, n.seam, 4.72, 0, 0, 0.65, !1, 0.061);
    for (let f = 0; f < 8; f++) {
      const g = f * Math.PI / 4, v = c(t, [
        0.18,
        0.025,
        0.55
      ], [
        Math.cos(g) * 5.04,
        0.065,
        Math.sin(g) * 5.04
      ], n.trim);
      v.rotation.y = -g + Math.PI / 2;
    }
    if (s === 1) r(t, "crescent", n.seam, [
      3,
      3,
      0.12
    ], [
      0,
      0.065,
      0
    ]).rotation.set(-Math.PI / 2, 0, 0.7);
    else {
      const f = [];
      for (let v = 0; v < (s === 2 ? 24 : 16); v++) {
        const b = v * Math.PI * 2 / (s === 2 ? 24 : 16), m = v % 2 ? 0.85 : s === 2 ? 2.6 : v % 4 ? 1.8 : 3.2;
        f.push([Math.cos(b) * m, Math.sin(b) * m]);
      }
      const g = e.shape(t, f, n.seam, [
        0,
        0.061,
        0
      ]);
      g.rotation.x = -Math.PI / 2, o(t, n.floor, 0.65, 0, 0, 1, !0, 0.065);
    }
  }
  for (const f of [-1, 1]) for (let g = 0; g < 4; g++) {
    const v = f * (7 + g % 2), b = -7 + g * 4, m = c(t, [
      0.035,
      0.016,
      0.55 + g * 0.1
    ], [
      v,
      0.055,
      b
    ], n.seam);
    m.rotation.y = g * 1.3;
    const x = c(t, [
      0.028,
      0.015,
      0.3
    ], [
      v + 0.1,
      0.055,
      b + 0.3
    ], n.seam);
    x.rotation.y = g * 1.3 + 0.8;
  }
  for (const f of [-i - 0.35, i + 0.35]) {
    c(t, [
      0.38,
      0.18,
      i * 2 + 1
    ], [
      f,
      0.08,
      0
    ], n.light);
    for (let g = -10; g <= 10; g += 5) l(f + Math.sign(f) * 0.5, g, g === -10 ? 3.6 : 1.35);
  }
  for (let f = 0; f < 6; f++) c(t, [
    7.2,
    0.24,
    1
  ], [
    0,
    -0.12 - f * 0.26,
    i + 0.65 + f * 0.8
  ], f % 2 ? n.stone : n.light);
  h(0, -i - 3, 8, 6.3);
  for (const f of [-1, 1]) {
    c(t, [
      5,
      3.2,
      1.9
    ], [
      f * 8.4,
      1.45,
      -i - 3
    ], n.dark), c(t, [
      5.5,
      0.3,
      2.3
    ], [
      f * 8.4,
      3.2,
      -i - 3
    ], n.light);
    const g = d(t, [
      f * 5.8,
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
    for (let v = 0; v < 5; v++) c(g, [
      0.35,
      2.6 - Math.abs(v - 2) * 0.12,
      0.08
    ], [
      (v - 2) * 0.34,
      -1.35,
      Math.sin(v * 2) * 0.08
    ], v % 2 ? n.foliage : n.dark);
    if (c(g, [
      0.12,
      1.8,
      0.09
    ], [
      0,
      -1.15,
      0.13
    ], n.trim), s < 3) {
      for (let v = 0; v < 4; v++) u(f * (12.8 + v % 2), -9 + v * 5, 0.8 + v * 0.1);
      y(f * 15, -13, 1.5), y(f * 17, 1, 1.7);
    } else if (s === 3) for (let v = 0; v < 3; v++) {
      const b = d(t, [
        f * 15,
        0,
        -9 + v * 7
      ]);
      r(b, "cylinder", n.dark, [
        1.4,
        2.8,
        1.4
      ], [
        0,
        1.4,
        0
      ]), r(b, "cylinder", n.trim, [
        0.7,
        4.5,
        0.7
      ], [
        0,
        4.9,
        0
      ]), c(b, [
        1.5,
        1,
        0.2
      ], [
        0,
        1,
        1.3
      ], n.accent), r(b, "torus", n.trim, [
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
      for (let b = 0; b < 5; b++) r(t, "rock", b % 2 ? n.light : n.accent, [
        1,
        2.2 + b % 3,
        0.9
      ], [
        f * (13.5 + b % 2),
        1.2,
        -9 + b * 4
      ]).rotation.z = f * -0.2;
      const v = d(t, [
        f * 17,
        0,
        -13
      ]);
      c(v, [
        0.22,
        8,
        0.22
      ], [
        0,
        3.5,
        0
      ], n.dark), e.shape(v, [
        [0, 0],
        [3, -1],
        [0, -4]
      ], n.light, [
        0,
        6.5,
        0
      ]);
    } else {
      for (let b = 0; b < 4; b++) {
        const m = d(t, [
          f * 14,
          0,
          -10 + b * 6
        ]);
        c(m, [
          2.4,
          3.5,
          1
        ], [
          0,
          1.75,
          0
        ], n.dark);
        for (let x = 0; x < 3; x++) {
          c(m, [
            2.6,
            0.12,
            1.1
          ], [
            0,
            0.8 + x,
            0
          ], n.trim);
          for (let w = 0; w < 5; w++) c(m, [
            0.27,
            0.65 + w % 2 * 0.12,
            0.6
          ], [
            -0.85 + w * 0.4,
            1.2 + x,
            0.1
          ], w % 2 ? n.foliage : n.stone);
        }
      }
      const v = r(t, "torus", n.trim, [
        3.4,
        4,
        0.5
      ], [
        f * 18,
        6.2,
        -13
      ]);
      v.rotation.y = f * 0.3;
    }
    c(t, [
      7,
      1.4,
      18
    ], [
      f * 17,
      -0.7,
      -3
    ], n.dark), c(t, [
      6.7,
      0.1,
      17.7
    ], [
      f * 17,
      0.06,
      -3
    ], n.seam);
    for (const v of [-3.5, 3.5]) c(t, [
      0.22,
      0.25,
      18.2
    ], [
      f * 17 + v,
      0.13,
      -3
    ], n.stone);
    c(t, [
      9,
      1.8,
      10
    ], [
      f * 15,
      -0.9,
      -17
    ], n.dark), c(t, [
      8.7,
      0.1,
      9.7
    ], [
      f * 15,
      0.06,
      -17
    ], n.seam);
  }
  for (let f = 0; f < 7; f++) {
    const g = (f - 3) * 8, v = -26 - f % 3 * 6, b = 7 + f * 5 % 7;
    if (c(t, [
      5.2,
      b,
      5.5
    ], [
      g,
      b / 2 - 3,
      v
    ], n.stone), c(t, [
      5.8,
      0.4,
      6
    ], [
      g,
      b - 3,
      v
    ], n.light), s === 1) {
      const m = r(t, "crescent", n.trim, [
        1.5,
        1.5,
        1.5
      ], [
        g,
        b - 0.8,
        v
      ]);
      m.rotation.z = 0.9;
    } else if (s === 2) r(t, "cone", n.trim, [
      3.4,
      4.8,
      3.4
    ], [
      g,
      b - 0.8,
      v
    ]);
    else if (s === 3) {
      for (const m of [-1.3, 1.3]) r(t, "cylinder", n.dark, [
        0.7,
        5 + f % 2 * 2,
        0.7
      ], [
        g + m,
        b - 1,
        v
      ]);
      c(t, [
        3.8,
        0.25,
        4
      ], [
        g,
        b - 2.5,
        v
      ], n.trim);
    } else if (s === 4) {
      r(t, "cone", n.light, [
        3.2,
        4.5,
        3.2
      ], [
        g,
        b - 0.8,
        v
      ]);
      for (const m of [-1, 1]) r(t, "rock", n.accent, [
        0.4,
        2,
        0.4
      ], [
        g + m,
        b - 3,
        v + 3
      ]);
    } else if (s === 5)
      r(t, "rock", n.trim, [
        1.4,
        2.3,
        1.4
      ], [
        g,
        b + 0.7,
        v
      ]), r(t, "torus", n.accent, [
        2,
        2,
        2
      ], [
        g,
        b - 1,
        v
      ]).rotation.x = Math.PI / 2;
    else {
      for (const m of [
        -2,
        0,
        2
      ]) c(t, [
        0.7,
        1.2,
        5.6
      ], [
        g + m,
        b - 2.35,
        v
      ], n.light);
      f % 2 && y(g + 1, v + 2, 1.5);
    }
    for (const m of [
      -1.5,
      0,
      1.5
    ]) c(t, [
      0.5,
      2.8,
      0.12
    ], [
      g + m,
      b - 5.6,
      v + 2.8
    ], n.dark);
  }
  for (const f of a?.obstacles ?? []) {
    const g = d(t, [
      f.x,
      0,
      f.y
    ]);
    r(g, "cylinder", n.dark, [
      f.radius,
      0.22,
      f.radius
    ], [
      0,
      0.11,
      0
    ]), r(g, "cylinder", n.stone, [
      f.radius * 0.85,
      1.15,
      f.radius * 0.85
    ], [
      0,
      0.78,
      0
    ]), r(g, "cylinder", n.light, [
      f.radius,
      0.2,
      f.radius
    ], [
      0,
      1.4,
      0
    ]), r(g, "rock", n.accent, [
      0.28,
      0.58,
      0.28
    ], [
      0,
      1.9,
      0
    ]);
    for (let v = 0; v < 6; v++) {
      const b = v * Math.PI / 3;
      c(g, [
        0.09,
        0.8,
        0.09
      ], [
        Math.cos(b) * f.radius * 0.86,
        0.8,
        Math.sin(b) * f.radius * 0.86
      ], n.trim);
    }
  }
  if (!a) {
    r(t, "cylinder", n.dark, [
      2.1,
      0.16,
      2.1
    ], [
      0,
      0.08,
      -8
    ]), r(t, "cylinder", n.light, [
      1.95,
      0.14,
      1.95
    ], [
      0,
      0.2,
      -8
    ]), o(t, n.trim, 1.68, 0, -8, 1, !1, 0.28);
    for (const f of [-1, 1]) {
      u(f * 3, -8, 1.2), u(f * 4, -10, 0.85);
      const g = d(t, [
        f * 2.6,
        0.5,
        -6
      ]);
      r(g, "box", n.dark, [
        0.5,
        0.16,
        0.5
      ]), r(g, "box", n.flower, [
        0.3,
        0.55,
        0.3
      ], [
        0,
        0.35,
        0
      ]), r(g, "cone", n.trim, [
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
function Wo(e, t, s) {
  const a = lt[s], { mesh: n, group: i, shape: r } = e, d = i(t, [
    0,
    0.2,
    -0.23
  ]), o = i(t), c = i(t, [
    0,
    0.33,
    0
  ]), l = a.silhouette === "robe" || a.silhouette === "coat";
  if (r(d, [
    [-0.23, 0],
    [0.23, 0],
    [0.38, l ? -0.68 : -0.48],
    [0.1, l ? -0.77 : -0.59],
    [-0.36, l ? -0.68 : -0.5]
  ], a.fabric), r(d, [
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
    0.25,
    0.18,
    0.24
  ], [
    0,
    -0.045,
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
    for (const h of [-1, 1]) n(t, "rock", a.metal, [
      0.15,
      0.12,
      0.17
    ], [
      h * 0.3,
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
  ]), r(t, [
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
    n(o, "sphere", a.metal, [
      0.31,
      0.13,
      0.265
    ], [
      0,
      0.44,
      -0.015
    ], !1, 1, !0);
    for (const h of [-1, 1]) n(o, "box", a.metal, [
      0.065,
      0.22,
      0.17
    ], [
      h * 0.285,
      0.29,
      -0.02
    ], !1, 1, !0);
  } else if (a.head === "hat")
    n(o, "cylinder", a.fabric, [
      0.43,
      0.045,
      0.32
    ], [
      0,
      0.46,
      0
    ]), n(o, "cone", a.fabric, [
      0.23,
      0.48,
      0.23
    ], [
      0.055,
      0.7,
      -0.02
    ]).rotation.z = -0.18, n(o, "torus", a.metal, [
      0.245,
      0.245,
      0.24
    ], [
      0,
      0.52,
      -0.01
    ]).rotation.x = Math.PI / 2;
  else if (a.head === "hood") {
    n(o, "sphere", a.fabric, [
      0.345,
      0.35,
      0.265
    ], [
      0,
      0.22,
      -0.12
    ]);
    for (const h of [-1, 1]) n(o, "sphere", a.fabric, [
      0.075,
      0.19,
      0.08
    ], [
      h * 0.285,
      0.19,
      0.055
    ]);
  } else if (a.head === "crown") {
    n(o, "torus", a.metal, [
      0.28,
      0.28,
      0.28
    ], [
      0,
      0.48,
      0
    ], !1, 1, !0).rotation.x = Math.PI / 2;
    for (let h = 0; h < 5; h++) {
      const u = h * Math.PI * 2 / 5;
      n(o, "cone", a.metal, [
        0.045,
        0.2,
        0.045
      ], [
        Math.sin(u) * 0.27,
        0.57,
        Math.cos(u) * 0.27
      ]);
    }
  } else if (a.head === "horns") for (const h of [-1, 1]) {
    const u = i(o, [
      h * 0.26,
      0.5,
      -0.06
    ]);
    u.rotation.z = h * -0.45, n(u, "cylinder", a.metal, [
      0.035,
      0.44,
      0.03
    ], [
      0,
      0.18,
      0
    ]);
    for (const y of [0.16, 0.3]) n(u, "cone", a.metal, [
      0.025,
      0.22,
      0.025
    ], [
      h * 0.06,
      y,
      0
    ]).rotation.z = h * -0.8;
  }
  else if (a.head === "goggles") {
    n(o, "torus", "#4c4a42", [
      0.32,
      0.22,
      0.27
    ], [
      0,
      0.4,
      0
    ]).rotation.x = Math.PI / 2;
    for (const h of [-1, 1])
      n(o, "torus", a.metal, [
        0.095,
        0.075,
        0.05
      ], [
        h * 0.115,
        0.39,
        0.24
      ]), n(o, "sphere", a.glow, [
        0.08,
        0.06,
        0.045
      ], [
        h * 0.115,
        0.39,
        0.24
      ]);
  }
  switch (s) {
    case "guardian":
      n(o, "cone", a.fabric, [
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
      n(o, "crescent", a.metal, [
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
      for (const h of [-1, 1]) n(t, "cone", a.metal, [
        0.1,
        0.2,
        0.12
      ], [
        h * 0.35,
        0.12,
        -0.03
      ]).rotation.z = h * -0.5;
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
      for (let h = 0; h < 3; h++) n(t, "cylinder", a.metal, [
        0.012,
        0.32,
        0.012
      ], [
        -0.21 + h * 0.04,
        0.4,
        -0.29
      ]);
      n(o, "cone", a.glow, [
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
      for (const h of [-1, 1]) r(t, [
        [0, 0],
        [h * 0.22, 0.24],
        [h * 0.18, -0.05],
        [h * 0.05, -0.12]
      ], a.metal, [
        h * 0.32,
        0.02,
        -0.06
      ]);
      break;
    case "witch":
      for (const h of [-1, 1])
        n(t, "sphere", a.glow, [
          0.05,
          0.065,
          0.04
        ], [
          h * 0.27,
          -0.16,
          0.17
        ]), n(t, "box", a.metal, [
          0.07,
          0.025,
          0.07
        ], [
          h * 0.27,
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
      ]), r(t, [
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
      for (const h of [-1, 1]) n(t, "cylinder", "#c99767", [
        0.06,
        0.32,
        0.06
      ], [
        h * 0.14,
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
      for (let h = -2; h <= 2; h++) n(t, "rock", h % 2 ? a.fabric : a.metal, [
        0.07,
        0.17,
        0.045
      ], [
        h * 0.11,
        -0.07,
        0.21
      ]).rotation.z = h * 0.27;
      break;
    case "frostbound":
      for (let h = -2; h <= 2; h++) n(t, "sphere", "#f6ffff", [
        0.08,
        0.075,
        0.09
      ], [
        h * 0.115,
        5e-3,
        0.13
      ]);
      for (const h of [-1, 1]) n(t, "rock", a.glow, [
        0.09,
        0.36,
        0.09
      ], [
        h * 0.3,
        0.22,
        -0.35
      ]).rotation.z = h * -0.5;
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
      for (let h = 0; h < 3; h++) {
        const u = h * Math.PI * 2 / 3;
        n(c, "rock", a.glow, [
          0.04,
          0.075,
          0.04
        ], [
          Math.cos(u) * 0.47,
          0.16,
          Math.sin(u) * 0.47
        ]);
      }
      break;
    case "traveler":
      break;
  }
  return {
    cape: d,
    animate(h, u) {
      c.rotation.y = u ? 0.4 : h * 0.014;
    }
  };
}
function Qo(e, t, s, a, n, i) {
  const { mesh: r, group: d, shape: o } = e, c = "#d6b881", l = "#fff0c1", h = (u, y, f) => {
    for (const g of [-1, 1]) r(s, "sphere", l, [
      0.09,
      0.055,
      0.06
    ], [
      g * f,
      u,
      y
    ], !0);
  };
  switch (n) {
    case "thornheart":
      r(t, "cone", "#576e58", [
        1.6,
        2.9,
        1.3
      ], [
        0,
        1.45,
        0
      ]), r(s, "rock", "#8da17f", [
        0.8,
        1,
        0.65
      ], [
        0,
        2.3,
        0.5
      ]), h(2.6, 1.06, 0.28);
      for (let u = 0; u < 7; u++) {
        const y = u * Math.PI * 2 / 7, f = d(t, [
          Math.cos(y) * 0.8,
          2.6,
          Math.sin(y) * 0.6
        ]);
        f.rotation.z = Math.cos(y) * 0.8, r(f, "cone", "#526451", [
          0.18,
          2.4,
          0.18
        ], [
          0,
          0.9,
          0
        ]), r(f, "rock", i.foliage, [
          0.6,
          0.6,
          0.4
        ], [
          0,
          1.3,
          0
        ]), r(t, "cone", "#67765a", [
          0.3,
          2,
          0.3
        ], [
          Math.cos(y),
          0.28,
          Math.sin(y)
        ]).rotation.z = 1.15;
      }
      r(t, "rock", "#ebbb73", [
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
      r(t, "cone", "#777191", [
        0.85,
        2.2,
        0.75
      ], [
        0,
        1.8,
        0
      ]), r(s, "sphere", "#c3c1db", [
        0.5,
        0.6,
        0.42
      ], [
        0,
        3.1,
        0
      ]), r(s, "box", "#4c4469", [
        0.94,
        0.18,
        0.16
      ], [
        0,
        3.2,
        0.38
      ]);
      for (const u of [
        1.35,
        1.8,
        2.25
      ]) r(a, "torus", c, [
        u,
        u,
        u
      ], [
        0,
        2.2,
        0
      ], !1, 1, !0).rotation.set(u * 0.7, 0.5, u);
      r(a, "sphere", "#d6dbff", [
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
      r(t, "rock", "#ac6249", [
        0.65,
        1.3,
        0.7
      ], [
        0,
        1.8,
        0
      ]), r(s, "sphere", "#e4ac68", [
        0.4,
        0.5,
        0.43
      ], [
        0,
        3.15,
        0.25
      ]), h(3.25, 0.63, 0.18), r(s, "cone", c, [
        0.18,
        0.55,
        0.15
      ], [
        0,
        3.03,
        0.76
      ]).rotation.x = Math.PI / 2;
      for (const u of [-1, 1]) {
        for (let y = 0; y < 5; y++) o(a, [
          [0, 0],
          [u * (2.4 - y * 0.25), 0.95 - y * 0.22],
          [u * (2 - y * 0.24), -0.1 - y * 0.24],
          [0, -0.45]
        ], y % 2 ? "#e2a465" : "#d47c4f", [
          u * 0.4,
          2.5,
          -0.1 - y * 0.06
        ]);
        r(t, "cone", "#e3a25b", [
          0.18,
          1.5,
          0.25
        ], [
          u * 0.3,
          0.6,
          -0.6
        ]).rotation.x = -0.8;
      }
      break;
    case "forgemaster":
      r(t, "box", "#675756", [
        1.8,
        2.1,
        1.2
      ], [
        0,
        1.6,
        0
      ]), r(t, "box", "#9b6148", [
        1.2,
        1.6,
        0.17
      ], [
        0,
        1.55,
        0.7
      ]), r(s, "cylinder", "#b08563", [
        0.7,
        0.7,
        0.6
      ], [
        0,
        3.05,
        0
      ]), r(s, "box", "#ffd18c", [
        0.65,
        0.1,
        0.08
      ], [
        0,
        3.12,
        0.63
      ], !0);
      for (const u of [-1, 1])
        r(t, "cylinder", i.dark, [
          0.36,
          0.8,
          0.38
        ], [
          u * 0.55,
          0.5,
          0
        ]), r(t, "sphere", "#c9976e", [
          0.65,
          0.55,
          0.55
        ], [
          u * 1.05,
          2.5,
          0
        ], !1, 1, !0);
      a.position.set(1.4, 1.7, 0.4), r(a, "cylinder", "#765948", [
        0.1,
        2.3,
        0.1
      ]), r(a, "box", "#444e57", [
        1.8,
        0.8,
        0.9
      ], [
        0,
        1.3,
        0
      ]), r(a, "box", "#ffc482", [
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
      r(t, "sphere", "#565d63", [
        1.45,
        1.6,
        0.95
      ], [
        0,
        2.15,
        0
      ]), r(t, "torus", "#b68d66", [
        0.78,
        0.78,
        0.45
      ], [
        0,
        2.25,
        0.82
      ], !1, 1, !0), r(t, "sphere", "#ffb77b", [
        0.57,
        0.57,
        0.2
      ], [
        0,
        2.25,
        1
      ], !0), r(s, "box", "#818883", [
        1.3,
        0.5,
        1
      ], [
        0,
        3.7,
        0
      ]), h(3.73, 0.51, 0.3);
      for (const u of [-1, 1])
        r(t, "box", "#818883", [
          0.8,
          1.2,
          0.95
        ], [
          u * 0.8,
          0.6,
          0
        ]), r(a, "cylinder", "#6b7375", [
          0.65,
          2.1,
          0.65
        ], [
          u * 1.75,
          1.85,
          0
        ]), r(a, "box", "#b29370", [
          1.1,
          0.8,
          1.1
        ], [
          u * 1.75,
          0.8,
          0.15
        ]);
      break;
    case "frostqueen":
      r(t, "cone", "#82a9c1", [
        1.1,
        2.7,
        0.95
      ], [
        0,
        1.8,
        0
      ]), r(s, "sphere", "#d5e9ec", [
        0.45,
        0.58,
        0.4
      ], [
        0,
        3.35,
        0
      ]), h(3.4, 0.39, 0.18);
      for (let u = -2; u <= 2; u++) r(s, "rock", "#d8fbff", [
        0.11,
        0.48 - Math.abs(u) * 0.08,
        0.11
      ], [
        u * 0.18,
        3.94,
        0.02
      ]);
      for (const u of [-1, 1]) o(t, [
        [0, 0],
        [u * 0.95, 0.8],
        [u * 0.5, -1.3],
        [0, -0.5]
      ], "#bddeeb", [
        u * 0.5,
        2.7,
        -0.35
      ]);
      a.position.set(1.05, 1.9, 0), r(a, "cylinder", "#aec9d5", [
        0.045,
        2.5,
        0.045
      ]), r(a, "rock", "#ddfbff", [
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
      for (let u = 0; u < 5; u++) {
        const y = 1 - u * 0.14;
        r(t, "sphere", u % 2 ? "#658c9c" : "#7da9b8", [
          y,
          y * 0.8,
          y
        ], [
          Math.sin(u * 0.6) * 0.4,
          0.8,
          0.5 - u * 0.8
        ]), r(t, "cone", "#d7e9dc", [
          0.2 * y,
          0.6 * y,
          0.25 * y
        ], [
          0,
          1.5 - u * 0.13,
          0.4 - u * 0.7
        ]);
      }
      r(s, "rock", "#7da9b8", [
        1.05,
        0.7,
        0.85
      ], [
        0,
        1.05,
        1
      ]), h(1.32, 1.65, 0.43);
      for (const u of [-1, 1])
        o(a, [
          [0, 0],
          [u * 1.4, 0.1],
          [u * 0.8, -0.7]
        ], "#b6d6d8", [
          u * 0.7,
          0.7,
          0
        ]), r(s, "cone", "#e4efde", [
          0.15,
          1,
          0.15
        ], [
          u * 0.72,
          1.65,
          1.2
        ]).rotation.z = u * -0.7;
      break;
    case "archivist":
      r(t, "cone", "#685881", [
        0.95,
        2.6,
        0.8
      ], [
        0,
        2,
        0
      ]), r(s, "rock", "#e7dcc4", [
        0.45,
        0.62,
        0.38
      ], [
        0,
        3.6,
        0
      ]), h(3.65, 0.38, 0.16);
      for (let u = 0; u < 5; u++) {
        const y = u * Math.PI * 2 / 5, f = d(a, [
          Math.cos(y) * 1.7,
          2.5 + Math.sin(y) * 0.6,
          Math.sin(y) * 1.3
        ]);
        f.rotation.z = y * 0.3, r(f, "box", "#baa481", [
          0.55,
          0.72,
          0.14
        ]), r(f, "box", "#f1e4c6", [
          0.48,
          0.65,
          0.15
        ], [
          0,
          0,
          0.03
        ]);
      }
      r(s, "torus", c, [
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
      r(t, "box", "#51486f", [
        0.95,
        1.5,
        0.65
      ], [
        0,
        1.75,
        0
      ]), r(s, "rock", "#b8afcc", [
        0.43,
        0.66,
        0.4
      ], [
        0,
        2.95,
        0
      ]), h(3, 0.4, 0.17);
      for (const u of [-1, 1]) {
        r(t, "box", "#867995", [
          0.33,
          0.9,
          0.4
        ], [
          u * 0.3,
          0.55,
          0
        ]), r(t, "rock", "#b8afcc", [
          0.5,
          0.28,
          0.38
        ], [
          u * 0.6,
          2.4,
          0
        ]);
        const y = d(a, [
          u * 0.85,
          1.8,
          0.2
        ]);
        y.rotation.z = u * -0.25, o(y, [
          [-0.07, 0],
          [0.15, 0],
          [0.3, 1.5],
          [0.12, 2.25],
          [-0.13, 1.7]
        ], "#dfc9ff");
      }
      o(t, [
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
function Uo(e, t) {
  const s = e.group(t), a = e.group(s);
  e.mesh(s, "sphere", "#fffaf2", [
    0.11,
    0.11,
    0.1
  ], [
    0,
    0,
    -0.04
  ]);
  const n = [
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
  ], i = e.shape(a, n, Ee.block, [
    0,
    0,
    0
  ], 0.055), r = e.shape(a, n, Ee.enamel, [
    0,
    0,
    0.057
  ], 0.025);
  r.scale.set(0.87, 0.87, 1), e.shape(a, n, Ee.enamel, [
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
    ], Ee.silver, [
      0,
      0,
      c
    ]), e.mesh(a, "rock", Ee.block, [
      0.035,
      0.06,
      0.015
    ], [
      0,
      0.075,
      c + Math.sign(c) * 0.014
    ], !1, 1, !0);
  let d = 0, o = -1;
  return s.visible = !1, { update(c, l, h, u, y) {
    const f = l ? 1 : 0, g = Math.max(0, Math.min(4, u - o));
    d = y || o < 0 || u < o ? f : d + (f - d) * (1 - Math.exp(-g * 0.85)), o = u, s.visible = c === "blade" || l || d > 0.04, s.position.set(-0.4 + d * 0.12, -0.1 + d * 0.3, 0.17 + d * 0.25), s.rotation.set(0.12 - d * 0.22, 0.15 - d * 0.3, -0.16 + d * 0.22), a.scale.setScalar(0.94 + d * 0.07), i.material = e.material(h ? Ee.parry : c === "blade" ? Ee.block : Ee.ward, !1, 1, !0), r.material = e.material(l ? "#617f99" : Ee.enamel);
  } };
}
function Yo(e, t) {
  const s = e.group(t), a = new As({
    transparent: !0,
    depthWrite: !1,
    uniforms: {
      tint: { value: new qa(Ee.ward) },
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
  }), n = new vt(e.geometries.sphere, a);
  return n.scale.set(1.12, 1.4, 1.12), n.position.y = 1.3, s.add(n), s.visible = !1, {
    update(i, r) {
      s.visible = !!i && i.ward > 0, !(!i || !s.visible) && (s.position.set(i.x, 0, i.y), a.uniforms.impact.value = r, s.scale.setScalar(1 + r * 0.035));
    },
    dispose() {
      a.dispose(), s.removeFromParent();
    }
  };
}
function Go(e, t) {
  const s = e.group(t, [
    0,
    0.15,
    0.12
  ]), a = [];
  s.rotation.set(-0.45, 0, -0.2);
  for (const l of [-1, 1]) {
    const h = e.group(s);
    e.mesh(h, "box", Oe.cover, [
      0.25,
      0.055,
      0.44
    ], [
      l * 0.125,
      0,
      0
    ]), e.mesh(h, "box", Oe.page, [
      0.22,
      0.06,
      0.38
    ], [
      l * 0.12,
      0.04,
      0
    ]), a.push(h);
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
  const i = e.mesh(s, "rock", Oe.empowered, [
    0.07,
    0.1,
    0.07
  ], [
    0,
    0.3,
    0
  ], !1, 1, !0), r = e.mesh(s, "torus", Oe.crest, [
    0.17,
    0.17,
    0.17
  ], [
    0,
    0.31,
    0
  ], !0, 0.65);
  r.rotation.x = Math.PI / 2;
  let d = 0, o = 0.15, c = -1;
  return { update(l, h, u, y) {
    const f = y || c < 0 || u < c ? 1 : 1 - Math.exp(-Math.min(4, u - c) * 0.5);
    c = u, d += ((l ? 1 : 0) - d) * f, o += ((h ? 0.5 : l ? 0.28 : 0.15) - o) * f, s.position.y = o, s.rotation.x = -0.45 + (o - 0.15) * 0.7, a[0].rotation.z = -0.65 + d * 0.5, a[1].rotation.z = 0.65 - d * 0.5, n.rotation.z = y ? 0.2 : 0.2 + d * (Math.sin(u * 0.18) + 1) * 1.3, i.scale.set(0.07 + d * 0.025, 0.1 + d * 0.06, 0.07 + d * 0.025), r.visible = l, y || (i.rotation.y = u * 0.08);
  } };
}
function Jn(e, t, s = 1) {
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
function es(e, t) {
  const s = e.group(t), a = Ts({
    group: e.group,
    ball(x, w, k, z) {
      return e.mesh(x, "sphere", k, w, z);
    }
  }, s, [
    0,
    0.78,
    0
  ]);
  a.scale.setScalar(2.1);
  const n = $s(a), i = e.ring(s, "#193f49", 0.6, 0, 0, 0.14, !0), r = e.group(a), d = e.group(r, [
    0.3,
    0.05,
    0.17
  ]), o = e.group(r), c = Uo(e, r);
  let l = null, h = -1, u = Math.PI / 2, y = null, f = null, g = null, v = 0, b = 0;
  function m(x, w) {
    if (!(x === f && w === g)) {
      if (f = x, g = w, o.clear(), d.clear(), l = null, y = Wo(e, o, g), e.mesh(d, "sphere", "#fffaf2", [
        0.1,
        0.1,
        0.09
      ]), f === "blade")
        e.mesh(d, "cylinder", "#624d42", [
          0.035,
          0.28,
          0.035
        ], [
          0,
          -0.08,
          0.06
        ]), e.mesh(d, "box", "#d4b470", [
          0.32,
          0.05,
          0.11
        ], [
          0,
          0.07,
          0.06
        ], !1, 1, !0), e.shape(d, [
          [-0.07, 0.1],
          [0.07, 0.1],
          [0.07, 0.65],
          [0, 0.83],
          [-0.07, 0.65]
        ], "#f5f8ef", [
          0,
          0,
          0.07
        ], 0.018), e.shape(d, [
          [0, 0.1],
          [0.07, 0.1],
          [0.07, 0.65],
          [0, 0.83]
        ], "#9cc6ce", [
          0,
          0,
          0.094
        ]);
      else if (f === "bow") Jn(e, d);
      else if (f === "staff")
        e.mesh(d, "cylinder", "#796889", [
          0.035,
          1.12,
          0.035
        ], [
          0,
          0.18,
          0.04
        ]), e.mesh(d, "torus", "#d8bc80", [
          0.19,
          0.24,
          0.18
        ], [
          0,
          0.85,
          0.04
        ], !1, 1, !0), e.mesh(d, "rock", "#b9ecff", [
          0.11,
          0.18,
          0.1
        ], [
          0,
          0.85,
          0.04
        ]);
      else if (f === "daggers") for (const k of [-1, 1]) {
        const z = e.group(d, [
          k < 0 ? -0.58 : 0,
          0,
          0
        ]);
        e.mesh(z, "box", "#974953", [
          0.07,
          0.2,
          0.07
        ]), e.shape(z, [
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
      else if (f === "grimoire") l = Go(e, d);
      else if (f === "cannon") {
        const k = e.group(d, [
          0.02,
          0.08,
          0.17
        ]);
        k.rotation.x = Math.PI / 2, e.mesh(k, "cylinder", "#586e77", [
          0.12,
          0.55,
          0.12
        ], [
          0,
          0.1,
          0
        ], !1, 1, !0), e.mesh(k, "torus", "#d2a96c", [
          0.15,
          0.15,
          0.15
        ], [
          0,
          0.39,
          0
        ], !1, 1, !0).rotation.x = Math.PI / 2, e.mesh(d, "box", "#906749", [
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
    root: s,
    update(x, w, k, z, C, L, N = !1) {
      m(w, k), c.update(w, !!x?.shield, !!x?.guard, z, C);
      const A = C || h < 0 || z < h ? 1 : 1 - Math.exp(-Math.min(4, z - h) * 0.65);
      h = z;
      const R = L ? Math.PI / 2 + 0.23 : x?.facing ?? Math.PI / 2;
      u += Math.atan2(Math.sin(R - u), Math.cos(R - u)) * A;
      const q = !!x && Math.abs(x.x - v) + Math.abs(x.y - b) > 1e-3, G = !!x?.dashTime;
      s.position.set(x?.x ?? 0, L ? 0.3 : 0, x?.y ?? -8), s.scale.setScalar(L ? 1.65 : 1), n.pose(0, 0, u, z, q, G, C), a.position.y += 0.3, y.cape.rotation.x = C ? -0.15 : -0.15 - (q ? 0.5 : 0.06) - Math.sin(z * 0.15) * 0.12, y.animate(z, C);
      const B = x?.swing && !C ? Math.sin(x.swing / (w === "cannon" ? 16 : 9) * Math.PI) : 0;
      d.rotation.z += ((N ? -0.3 : -0.2 - B * 1.3) - d.rotation.z) * A, d.rotation.x += ((N ? -0.25 : 0.1 + B * 0.6) - d.rotation.x) * A, l && l.update(!!x?.resonance, N, z, C), i.scale.set(0.6 + (G ? 0.25 : 0), 0.6, 1), x && (v = x.x, b = x.y);
    }
  };
}
function Qa(e, t, s, a) {
  const { mesh: n, group: i } = e, r = i(t), d = i(r), o = i(d), c = i(d), l = [], h = ye(s), u = ie[s].radius;
  e.ring(r, "#1d3540", u * 1.15, 0, 0, 0.16, !0);
  const y = "#cfad70", f = "#fff0b0", g = a.dark;
  function v(A, R, q) {
    const G = i(d, [
      A,
      q,
      R
    ]);
    n(G, "box", g, [
      0.32,
      q,
      0.42
    ], [
      0,
      -q / 2,
      0
    ]), n(G, "box", a.stone, [
      0.38,
      0.22,
      0.55
    ], [
      0,
      -q + 0.11,
      0.1
    ]), l.push(G);
  }
  function b(A, R, q = "#d9e8df") {
    n(A, "box", y, [
      0.55,
      0.1,
      0.24
    ], [
      0,
      0.25,
      0
    ], !1, 1, !0), n(A, "box", g, [
      0.11,
      0.4,
      0.11
    ]), n(A, "box", q, [
      0.2,
      R,
      0.13
    ], [
      0,
      R / 2 + 0.35,
      0
    ], !1, 1, !0), n(A, "cone", q, [
      0.15,
      0.4,
      0.13
    ], [
      0,
      R + 0.5,
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
    for (const A of [-0.27, 0.27]) {
      const R = n(c, "cone", y, [
        0.15,
        0.7,
        0.15
      ], [
        A,
        1.15,
        0.9
      ]);
      R.rotation.x = 0.55, n(c, "sphere", f, [
        0.05,
        0.04,
        0.06
      ], [
        A,
        0.82,
        1.02
      ], !0), v(A, -0.42, 0.45), v(A, 0.45, 0.45);
    }
    for (let A = 0; A < 3; A++) n(d, "cone", a.accent, [
      0.2,
      0.45,
      0.25
    ], [
      0,
      1.25,
      -0.5 + A * 0.4
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
    const A = n(c, "crescent", y, [
      1.35,
      1.35,
      0.8
    ], [
      0,
      4.35,
      -0.3
    ], !1, 1, !0);
    A.rotation.z = 0.87;
    for (const R of [-0.23, 0.23]) n(c, "sphere", "#e4e3ff", [
      0.09,
      0.055,
      0.05
    ], [
      R,
      4.08,
      0.45
    ], !0);
    for (const R of [-1, 1]) {
      const q = i(d, [
        R * 0.8,
        3.3,
        0
      ]);
      q.rotation.z = R * 0.65, n(q, "cone", "#757caf", [
        0.5,
        1.8,
        0.45
      ], [
        0,
        -0.65,
        0
      ]), n(q, "sphere", a.light, [
        0.22,
        0.25,
        0.22
      ], [
        0,
        -1.45,
        0.1
      ]), l.push(q);
    }
    for (let R = 0; R < 5; R++) {
      const q = R / 5 * Math.PI * 2, G = n(o, "rock", a.accent, [
        0.2,
        0.34,
        0.2
      ], [
        Math.cos(q) * 1.95,
        3.3 + Math.sin(q) * 1.1,
        -0.3
      ]);
      G.rotation.z = q;
    }
  } else if (s === "king") {
    v(-0.5, 0, 0.8), v(0.5, 0, 0.8), n(d, "cone", "#7c4550", [
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
    ]), n(d, "rock", y, [
      0.5,
      0.9,
      0.3
    ], [
      0,
      2.25,
      0.62
    ]);
    for (const A of [-1, 1]) n(d, "rock", a.stone, [
      0.85,
      0.5,
      0.7
    ], [
      A * 0.95,
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
    ]), n(c, "box", f, [
      0.48,
      0.08,
      0.09
    ], [
      0,
      3.7,
      0.51
    ], !0), n(c, "torus", y, [
      0.86,
      0.86,
      0.86
    ], [
      0,
      4.6,
      0
    ], !1, 1, !0).rotation.x = Math.PI / 2;
    for (let A = 0; A < 7; A++) {
      const R = A * Math.PI * 2 / 7;
      n(c, "cone", y, [
        0.17,
        0.85,
        0.17
      ], [
        Math.cos(R) * 0.78,
        4.85,
        Math.sin(R) * 0.78
      ]);
    }
    o.position.set(1.55, 1.35, 0.2), o.rotation.z = -0.3, b(o, 3.4, "#f6dc9f"), n(d, "box", a.stone, [
      0.5,
      1.2,
      0.5
    ], [
      -1.15,
      2,
      0.1
    ]);
  } else if (s === "warden") {
    v(-0.65, 0.05, 0.85), v(0.65, 0.05, 0.85), n(d, "cylinder", g, [
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
    for (const R of [-1, 1])
      n(d, "rock", a.stone, [
        0.83,
        0.6,
        0.7
      ], [
        R * 1.03,
        2.7,
        0
      ]), n(d, "box", y, [
        0.7,
        0.1,
        0.8
      ], [
        R * 1.08,
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
    ]), n(c, "box", f, [
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
    const A = i(d, [
      -1.32,
      1.5,
      0.6
    ]);
    n(A, "box", g, [
      1.2,
      1.8,
      0.25
    ]), n(A, "box", y, [
      1,
      1.58,
      0.28
    ]), n(A, "box", a.foliage, [
      0.85,
      1.42,
      0.31
    ]), n(A, "rock", a.light, [
      0.28,
      0.4,
      0.1
    ], [
      0,
      0.1,
      0.22
    ]), o.position.set(1.5, 1.8, 0.25), n(o, "cylinder", "#766450", [
      0.1,
      2.5,
      0.1
    ]), n(o, "box", g, [
      1.25,
      0.9,
      0.9
    ], [
      0,
      1.4,
      0
    ]), n(o, "box", y, [
      0.24,
      0.96,
      0.94
    ], [
      0,
      1.4,
      0
    ], !1, 1, !0), n(o, "box", a.light, [
      0.22,
      0.77,
      0.74
    ], [
      0.65,
      1.4,
      0
    ]);
  } else if (ye(s)) Qo(e, d, c, o, s, a);
  else if (s === "wisp")
    n(d, "rock", a.accent, [
      0.35,
      0.6,
      0.35
    ], [
      0,
      1,
      0
    ]), n(c, "torus", y, [
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
    for (const A of [-1, 1])
      v(A * 0.27, -0.25, 0.35), n(c, "cone", y, [
        0.09,
        0.35,
        0.09
      ], [
        A * 0.21,
        1.09,
        0.42
      ]), n(c, "sphere", f, [
        0.05,
        0.04,
        0.035
      ], [
        A * 0.15,
        0.8,
        0.77
      ], !0), n(o, "cone", a.light, [
        0.09,
        0.38,
        0.08
      ], [
        A * 0.37,
        0.3,
        0.5
      ]).rotation.x = Math.PI / 2;
  } else if (s === "bomber")
    v(-0.22, 0, 0.45), v(0.22, 0, 0.45), n(d, "sphere", "#85654c", [
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
    ]), n(o, "sphere", "#404c57", [
      0.25,
      0.25,
      0.25
    ], [
      0.56,
      1.1,
      0.18
    ]), n(o, "cone", "#ffca88", [
      0.07,
      0.3,
      0.07
    ], [
      0.56,
      1.41,
      0.18
    ]);
  else {
    const A = s === "priest", R = s === "guard";
    if (A ? n(d, "cone", "#767da5", [
      0.55,
      1.5,
      0.5
    ], [
      0,
      0.95,
      0
    ]) : (v(-0.22, 0, 0.5), v(0.22, 0, 0.5), n(d, "box", g, [
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
    ]), n(c, "box", f, [
      0.39,
      0.045,
      0.05
    ], [
      0,
      1.65,
      0.39
    ], !0), A)
      n(c, "cone", "#626a9c", [
        0.55,
        0.8,
        0.5
      ], [
        0,
        2.14,
        0
      ]), o.position.set(0.52, 1, 0.1), n(o, "cylinder", y, [
        0.04,
        1.6,
        0.04
      ]), n(o, "rock", "#d1dcff", [
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
      for (const q of [-1, 1]) n(d, "rock", a.stone, [
        0.28,
        0.23,
        0.3
      ], [
        q * 0.45,
        1.22,
        0
      ]);
      o.position.set(0.54, 1, 0.2), s === "archer" ? Jn(e, o, 1.3) : (o.rotation.z = -0.3, b(o, 0.75)), R && (n(d, "box", y, [
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
  const m = i(r, [
    0,
    h ? 5.5 : s === "charger" ? 1.7 : 2.45,
    0
  ]);
  n(m, "box", "#233f48", [
    1.06,
    0.105,
    0.02
  ], [
    0,
    0,
    0
  ], !0);
  const x = n(m, "box", "#f0ba83", [
    1,
    0.055,
    0.03
  ], [
    0,
    0,
    0.02
  ], !0), w = [];
  d.traverse((A) => {
    A instanceof vt && w.push({
      mesh: A,
      material: A.material
    });
  });
  let k = 0, z = -100, C = 0, L = 0;
  const N = o.rotation.z;
  return {
    root: r,
    bar: m,
    update(A, R, q) {
      const G = Math.abs(A.x - C) + Math.abs(A.y - L) > 5e-3;
      C = A.x, L = A.y, k && !A.windup && (z = R), k = A.windup;
      const B = A.windup ? 1 - A.windup / ie[A.kind].windup : 0, T = Math.max(0, 1 - (R - z) / 10);
      r.position.set(A.x, 0, A.y), d.rotation.y = Math.PI / 2 - A.angle, d.position.y = q ? 0 : s === "weaver" || s === "priest" ? 0.13 + Math.sin(R * 0.055) * 0.1 : G ? Math.abs(Math.sin(R * 0.3)) * 0.055 : 0, d.rotation.x = q ? 0 : -B * 0.16 + T * 0.2, c.rotation.z = !q && s === "king" ? Math.sin(R * 0.035) * 0.08 : 0, o.rotation.x = q ? 0 : B * -1.3 + T * 1.4, o.rotation.z = N + (q ? 0 : B * -0.35);
      for (let O = 0; O < l.length; O++) l[O].rotation.x = !q && G ? Math.sin(R * 0.32 + O * Math.PI) * 0.28 : 0;
      for (const O of w) O.mesh.material = A.marked > 2 && !q ? e.material("#fff6dd") : O.material;
      m.visible = !h && A.hp < A.maxHp, x.scale.x = A.hp / A.maxHp, x.position.x = (A.hp / A.maxHp - 1) * 0.5;
    }
  };
}
var ae = {
  danger: "#c34740",
  warning: "#ec8754",
  magic: "#8bd9f2",
  frost: "#addffc",
  gold: "#fff0bb",
  heal: "#75dbb0",
  fire: "#f0ad55"
};
function Ko(e, t) {
  const s = /* @__PURE__ */ new Map();
  function a(i, r, d = 1, o = !1) {
    const c = Math.max(0.1, Math.min(1, Math.round(d * 10) / 10)), l = `${i}/${r}/${c}/${o}`;
    let h = s.get(l);
    h || (h = {
      list: [],
      used: 0
    }, s.set(l, h));
    let u = h.list[h.used++];
    return u || (u = e.mesh(t, i, r, [
      1,
      1,
      1
    ], [
      0,
      0,
      0
    ], !o, c), h.list.push(u)), u.visible = !0, u.rotation.set(0, 0, 0), u.scale.set(1, 1, 1), u;
  }
  function n(i, r, d, o, c, l = 1, h = 0.09) {
    const u = a(i, r, l);
    return u.position.set(o, h, c), u.scale.set(d, d, 1), u.rotation.x = -Math.PI / 2, u;
  }
  return { update(i, r) {
    for (const o of s.values())
      o.used = 0, o.list.forEach((c) => c.visible = !1);
    if (!i) return;
    const d = i.player;
    if (n("ring", "#f2f6e2", 0.64, d.x, d.y, 0.8), d.dashTime && !r) for (let o = 1; o <= 3; o++) {
      const c = a("cone", ae.gold, 0.7 - o * 0.15);
      c.position.set(d.x - Math.cos(d.dashAngle) * o * 0.43, 0.45, d.y - Math.sin(d.dashAngle) * o * 0.43), c.scale.set(0.13, d.dashTime / 8 * 1.7, 0.13), c.rotation.set(0, -d.dashAngle, -Math.PI / 2);
    }
    if (!i.boss && (i.encounter === "siege" || i.encounter === "ritual")) {
      const o = i.objective;
      i.encounter === "ritual" && (n("disc", ae.magic, 2.5, o.x, o.y, 0.12), n("ring", ae.magic, 2.5, o.x, o.y), n("ring", ae.gold, 2.2, o.x, o.y, 0.8));
      const c = a("cylinder", "#526b79");
      c.position.set(o.x, 0.3, o.y), c.scale.set(0.5, 0.6, 0.5);
      const l = a("rock", i.encounter === "siege" ? ae.fire : ae.magic);
      if (l.position.set(o.x, 1, o.y), l.scale.set(0.23, 0.5, 0.23), i.encounter === "siege") {
        l.position.y = 1.35, l.scale.set(0.4, 0.85, 0.4);
        const h = a("cone", ae.gold, 0.8);
        h.position.set(o.x, 1.4, o.y), h.scale.set(0.2, 0.85, 0.2), n("ring", ae.fire, 0.9, o.x, o.y, 0.8);
      }
      r || (l.rotation.y = i.tick * 0.025);
    }
    for (const o of i.companions)
      if (!(o.hp <= 0 || o.life <= 0))
        if (n("ring", ae.heal, 0.4, o.x, o.y, 0.8), o.kind === "turret") {
          const c = a("cylinder", "#687c81");
          c.position.set(o.x, 0.25, o.y), c.scale.set(0.4, 0.5, 0.4);
          const l = a("box", "#bd9a68");
          l.position.set(o.x, 0.65, o.y), l.scale.set(0.9, 0.2, 0.25), l.rotation.y = -o.angle;
          const h = a("sphere", ae.magic);
          h.position.set(o.x + Math.cos(o.angle) * 0.45, 0.65, o.y + Math.sin(o.angle) * 0.45), h.scale.setScalar(0.11);
        } else {
          const c = o.kind === "familiar" && d.resonance > 0, l = c ? 1.5 : 1, h = o.kind === "shade" ? "#a6acd8" : c ? Oe.empowered : Oe.familiar, u = r ? 0 : Math.sin(i.tick * 0.1 + o.id) * 0.08, y = a("sphere", h, 1, !0);
          y.position.set(o.x, 0.55 * l + u, o.y), y.scale.set(0.3 * l, 0.36 * l, 0.3 * l);
          for (const g of [-1, 1]) {
            const v = a("cone", h, 1, !0);
            v.position.set(o.x + g * 0.2 * l, 0.93 * l + u, o.y), v.scale.set(0.08 * l, 0.22 * l, 0.08 * l);
          }
          const f = a("sphere", "#35475b");
          if (f.position.set(o.x + Math.cos(o.angle) * 0.28 * l, 0.63 * l + u, o.y + Math.sin(o.angle) * 0.28 * l), f.scale.setScalar(0.07 * l), c) {
            const g = a("torus", Oe.crest, 1, !0);
            g.position.set(o.x, 1.45 + u, o.y), g.rotation.x = Math.PI / 2, g.scale.setScalar(0.32);
            for (let v = 0; v < 3; v++) {
              const b = v * Math.PI * 2 / 3, m = a("rock", Oe.crest, 1, !0);
              m.position.set(o.x + Math.cos(b) * 0.32, 1.55 + u, o.y + Math.sin(b) * 0.32), m.scale.set(0.08, 0.17, 0.08);
            }
          }
        }
    for (const o of i.enemies) {
      if (ye(o.kind) && o.phase > 1) {
        const c = ie[o.kind].radius + 0.55;
        if (n("ring", o.kind === "king" ? ae.fire : ae.magic, c, o.x, o.y, 0.65), !r) for (let l = 0; l < o.phase + 2; l++) {
          const h = i.tick * 0.025 + l * Math.PI * 2 / (o.phase + 2), u = a("rock", o.kind === "king" ? ae.fire : ae.magic, 0.8);
          u.position.set(o.x + Math.cos(h) * c, 0.55 + Math.sin(h * 2) * 0.2, o.y + Math.sin(h) * c), u.scale.set(0.08, 0.19, 0.08);
        }
      }
      if (o.windup) {
        const c = 1 - o.windup / ie[o.kind].windup;
        if (n("ring", ae.warning, ie[o.kind].radius + 0.35, o.x, o.y, 0.8), o.kind === "charger") {
          const l = Math.min(9, Math.hypot(o.target.x - o.x, o.target.y - o.y)), h = a("box", ae.danger, 0.3);
          h.scale.set(0.75, 0.035, l), h.position.set(o.x + Math.cos(o.angle) * l / 2, 0.09, o.y + Math.sin(o.angle) * l / 2), h.rotation.y = Math.PI / 2 - o.angle, n("ring", ae.danger, 0.5, o.target.x, o.target.y, 0.9);
        } else if (o.kind === "archer") {
          const l = Math.hypot(o.target.x - o.x, o.target.y - o.y), h = a("box", ae.warning, 0.6);
          h.position.set((o.x + o.target.x) / 2, 0.11, (o.y + o.target.y) / 2), h.scale.set(l, 0.03, 0.09), h.rotation.y = -o.angle;
        } else o.kind === "bomber" ? n("ring", ae.warning, 1.9, o.target.x, o.target.y) : (o.kind === "soldier" || o.kind === "guard" || o.kind === "stalker") && (n("disc", ae.danger, ie[o.kind].reach, o.target.x, o.target.y, 0.15 + c * 0.2), n("ring", ae.danger, ie[o.kind].reach, o.target.x, o.target.y));
      }
      if (o.chill && n("ring", ae.frost, ie[o.kind].radius + 0.13, o.x, o.y), o.exposed && n("arc", ae.gold, ie[o.kind].radius + 0.3, o.x, o.y, 0.9), o.burn && !r) for (let c = 0; c < 3; c++) {
        const l = a("rock", ae.fire, 0.8);
        l.position.set(o.x + Math.sin(c * 2) * 0.3, 0.35 + (i.tick + c * 7) % 20 / 18, o.y + Math.cos(c * 2) * 0.3), l.scale.set(0.08, 0.2, 0.08);
      }
      o.kind === "priest" && n("ring", "#a39aca", 3.5, o.x, o.y, 0.4);
    }
    for (const o of i.hazards) {
      const c = o.friendly ? o.kind === "fire" ? ae.fire : ae.magic : ae.danger;
      if (o.kind === "beam") {
        const l = a("box", c, o.wait ? 0.3 : 0.75);
        l.position.set(o.x + Math.cos(o.angle) * o.length / 2, 0.11, o.y + Math.sin(o.angle) * o.length / 2), l.scale.set(o.length, 0.04, o.width * 2), l.rotation.y = -o.angle;
        for (const h of [0, o.length]) n("disc", c, o.width, o.x + Math.cos(o.angle) * h, o.y + Math.sin(o.angle) * h, o.wait ? 0.3 : 0.75);
        continue;
      }
      if (o.kind === "ring") {
        n("ring", c, o.inner, o.x, o.y), n("ring", c, o.radius, o.x, o.y);
        for (let l = 1; l <= 4; l++) n("ring", c, o.inner + (o.radius - o.inner) * l / 5, o.x, o.y, o.wait ? 0.35 : 0.8);
        continue;
      }
      if (n("disc", c, o.radius, o.x, o.y, o.wait ? 0.2 : 0.4), n("ring", c, o.radius, o.x, o.y), o.wait) {
        n("ring", c, o.radius * (1 - Math.min(1, o.wait / 45)), o.x, o.y, 0.7);
        const l = a("box", c, 0.7);
        l.position.set(o.x, 0.12, o.y), l.scale.set(0.08, 0.02, 0.6);
        const h = a("box", c, 0.7);
        h.position.copy(l.position), h.scale.set(0.6, 0.02, 0.08);
      } else if (!r) {
        n("ring", ae.gold, o.radius * (0.7 + Math.sin(i.tick * 0.1) * 0.1), o.x, o.y, 0.7, 0.25);
        for (let l = 0; l < 6; l++) {
          const h = l * Math.PI / 3, u = a("cone", c, 0.7);
          u.position.set(o.x + Math.cos(h) * o.radius * 0.65, 0.45, o.y + Math.sin(h) * o.radius * 0.65), u.scale.set(0.15, 0.9, 0.15);
        }
      }
    }
    for (const o of i.shots) {
      const c = o.friendly ? ae.gold : ae.danger, l = a("sphere", o.friendly ? "#fffbea" : "#fff1c9");
      l.position.set(o.x, 0.6, o.y), l.scale.set(0.11, 0.11, 0.11);
      const h = a("sphere", c, 0.8);
      h.position.copy(l.position), h.scale.set(0.21, 0.18, 0.21);
      const u = a("cone", c, 0.5);
      u.position.set(o.x - Math.cos(o.angle) * 0.38, 0.6, o.y - Math.sin(o.angle) * 0.38), u.scale.set(0.14, 0.75, 0.14), u.rotation.set(0, -o.angle, -Math.PI / 2);
    }
    for (const o of i.effects) {
      const c = 1 - o.life / (o.kind === "slash" ? 9 : 15);
      if (o.kind === "slash") {
        const l = n("arc", ae.gold, o.size, o.x, o.y, 0.3 * (1 - c), 0.42);
        l.rotation.z = -o.angle - 0.9 + c * 0.4;
        const h = n("stroke", "#fff4d2", o.size, o.x, o.y, 0.9 * (1 - c), 0.43);
        h.rotation.z = l.rotation.z;
      } else if (o.kind === "resonance") {
        n("ring", Oe.crest, o.size * (r ? 1 : 0.6 + c * (2 - c)), o.x, o.y, 0.8 - c * 0.6, 0.16);
        for (const l of i.companions) {
          if (l.kind !== "familiar" || l.hp <= 0 || l.life <= 0) continue;
          const h = l.x - d.x, u = l.y - d.y, y = a("box", Oe.empowered, 1 - c * 0.7);
          y.position.set((d.x + l.x) / 2, 1.1, (d.y + l.y) / 2), y.scale.set(Math.hypot(h, u), 0.045, 0.045), y.rotation.y = -Math.atan2(u, h);
        }
        for (let l = 0; l < 4; l++) {
          const h = l * Math.PI / 2 + (r ? 0 : c), u = a("rock", Oe.empowered, 1 - c * 0.4);
          u.position.set(d.x + Math.cos(h) * 0.95, 1.7 + (r ? 0 : c * 0.5), d.y + Math.sin(h) * 0.95), u.scale.set(0.08, 0.18, 0.08);
        }
      } else if (o.kind === "lightning") {
        for (let l = 0; l < 4; l++) {
          const h = a("box", l % 2 ? "#ffffff" : ae.magic, 1 - c * 0.6);
          h.scale.set(0.09 + (1 - c) * 0.09, 1.05, 0.08), h.position.set(o.x + (l % 2 ? 0.14 : -0.14), 0.5 + l * 0.85, o.y), h.rotation.z = l % 2 ? -0.35 : 0.35;
        }
        n("ring", ae.magic, 0.4 + c, o.x, o.y, 1 - c);
      } else if (o.kind === "block" || o.kind === "parry" || o.kind === "ward-hit" || o.kind === "ward-break") {
        const l = o.kind === "block" || o.kind === "parry", h = o.kind === "ward-break", u = l ? o.kind === "parry" ? Ee.parry : Ee.block : Ee.ward;
        if (l) {
          const y = a("ring", u, 1 - c);
          y.position.set(o.x + Math.cos(o.angle) * 0.7, 1.3, o.y + Math.sin(o.angle) * 0.7), y.rotation.y = Math.PI / 2 - o.angle, y.scale.setScalar(0.6 + c * (o.kind === "parry" ? 1.3 : 0.6));
        }
        for (let y = 0; y < (h ? 6 : 4); y++) {
          const f = y * 2.4 + o.id, g = a(h ? "rock" : "box", u, 1 - c), v = r ? 1.1 : 0.7 + c * (h ? 1.5 : 0.6);
          g.position.set(o.x + Math.cos(f) * v, 0.7 + y % 3 * 0.55, o.y + Math.sin(f) * v), g.scale.set(0.07 * (1 - c), (h ? 0.3 : 0.16) * (1 - c), 0.04), g.rotation.set(f, f, f);
        }
      } else if (o.kind === "heal") n("ring", ae.heal, 0.4 + c, o.x, o.y, 1 - c);
      else {
        const l = o.kind === "hit" ? ae.danger : ae.gold;
        if (n("ring", l, o.size * (0.4 + c), o.x, o.y, 1 - c), !r) for (let h = 0; h < 7; h++) {
          const u = h * 2.4 + o.id, y = a("rock", l, 1 - c * 0.8);
          y.position.set(o.x + Math.cos(u) * c * o.size, 0.4 + Math.sin(c * Math.PI) * 0.8, o.y + Math.sin(u) * c * o.size), y.scale.set(0.1 * (1 - c), 0.28 * (1 - c), 0.1 * (1 - c)), y.rotation.z = u;
        }
      }
    }
  } };
}
function Vo(e) {
  const t = document.createElement("div"), s = document.createElement("i");
  t.className = "exp-world-ward", t.style.setProperty("--ward-color", Ee.ward), t.setAttribute("role", "meter"), t.setAttribute("aria-label", Y.ward), t.setAttribute("aria-valuemin", "0"), t.setAttribute("aria-valuemax", String(W.maxHp)), t.append(s);
  const a = document.createElement("div");
  a.className = "exp-world-defense", e.append(t, a), t.hidden = !0, a.hidden = !0;
  const n = new _t();
  let i = null, r = 0, d = 0, o = null;
  function c(l, h, u, y, f, g, v) {
    n.set(h, u, y).project(f), l.style.left = `${(n.x * 0.5 + 0.5) * g}px`, l.style.top = `${(-n.y * 0.5 + 0.5) * v}px`;
  }
  return {
    update(l, h, u, y) {
      if (l !== i && (i = l, r = 0, o = null, d = 0), t.hidden = !l || l.player.ward <= 0, a.hidden = !l, !l) return;
      const f = l.player;
      t.hidden || (s.style.width = `${f.ward / W.maxHp * 100}%`, t.setAttribute("aria-valuenow", String(f.ward)), c(t, f.x, 0, f.y, h, u, y));
      const g = l.effects.filter((b) => b.id > r && b.kind in Y.defenseFeedback), v = g.find((b) => b.kind === "parry" || b.kind === "ward-break") ?? g.at(-1);
      v && (o = v.kind, d = l.tick + 27), r = l.serial, l.tick >= d && (o = null), a.hidden = !o && !f.shield, a.dataset.state = o ?? "blocking", a.textContent = o ? Y.defenseFeedback[o] : f.shield ? Y.guardActive : "", c(a, f.x, f.shield ? 3.65 : 3.05, f.y, h, u, y);
    },
    dispose() {
      t.remove(), a.remove();
    }
  };
}
var M = {
  grass: "#7eaa8a",
  grassLight: "#91b699",
  grassDark: "#689b7d",
  soil: "#637f72",
  stone: "#d2d3bc",
  light: "#f3eedb",
  mortar: "#8b9e92",
  slate: "#3e7478",
  roof: "#407c7c",
  roofLight: "#57908a",
  timber: "#635748",
  wood: "#a88b63",
  shadow: "#304f52",
  brass: "#c49d60",
  cloth: "#e6b978",
  leaf: "#568876",
  leafLight: "#82ad86",
  amber: "#d9a568",
  amberLight: "#ebc78a",
  rose: "#c78f86",
  water: "#5fa5af",
  ripple: "#b6d7c9",
  ember: "#ffce87",
  pottery: "#b4775e",
  undercroft: "#536f75",
  wetStone: "#96b5b5",
  marble: "#c6d4d0",
  marbleLight: "#e4e9dc",
  root: "#665e58",
  rootLight: "#9b8870"
};
function ts(e, t, s, a, n = 2.8) {
  e.mesh(t, "cylinder", M.shadow, [
    0.055,
    n,
    0.055
  ], [
    s,
    n / 2,
    a
  ]), e.mesh(t, "box", M.brass, [
    0.4,
    0.08,
    0.4
  ], [
    s,
    n,
    a
  ]), e.mesh(t, "box", M.ember, [
    0.22,
    0.38,
    0.22
  ], [
    s,
    n + 0.21,
    a
  ], !0), e.mesh(t, "cone", M.shadow, [
    0.32,
    0.24,
    0.32
  ], [
    s,
    n + 0.51,
    a
  ]);
  for (const i of [-1, 1]) e.mesh(t, "box", M.shadow, [
    0.035,
    0.4,
    0.035
  ], [
    s + i * 0.14,
    n + 0.2,
    a + 0.14
  ]);
}
function as(e, t, s, a, n, i) {
  const r = s / 2 + 0.45, d = Math.atan2(i, r), o = Math.hypot(r, i);
  for (const c of [-1, 1]) {
    const l = e.group(t, [
      c * r / 2,
      n + i / 2,
      0
    ]);
    l.rotation.z = -c * d, e.mesh(l, "box", M.roof, [
      o + 0.2,
      0.18,
      a + 1.1
    ]);
    for (let h = 0; h < Math.ceil(o / 0.65); h++) e.mesh(l, "box", h % 3 ? M.roof : M.roofLight, [
      0.14,
      0.07,
      a + 1.15
    ], [
      -o / 2 + h * 0.65,
      0.13,
      0
    ]);
    e.mesh(l, "box", M.shadow, [
      0.2,
      0.24,
      a + 1.25
    ], [
      c * o / 2,
      -0.05,
      0
    ]);
  }
  e.mesh(t, "box", M.brass, [
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
    ], M.light, [
      0,
      n,
      c
    ], 0.08), e.mesh(t, "box", M.timber, [
      0.15,
      i,
      0.18
    ], [
      0,
      n + i / 2,
      c + 0.12
    ]);
}
function Yt(e, t, s, a, n, i = 1.1) {
  e.mesh(t, "box", M.shadow, [
    i,
    1.45,
    0.12
  ], [
    s,
    n,
    a
  ]), e.mesh(t, "box", "#a5c5ba", [
    i - 0.18,
    1.25,
    0.14
  ], [
    s,
    n,
    a + 0.07
  ]);
  for (const r of [-1, 1])
    e.mesh(t, "box", M.wood, [
      0.13,
      1.6,
      0.2
    ], [
      s + r * i / 2,
      n,
      a + 0.12
    ]), e.mesh(t, "box", M.light, [
      i + 0.28,
      0.14,
      0.26
    ], [
      s,
      n + r * 0.8,
      a + 0.12
    ]);
  e.mesh(t, "box", M.timber, [
    0.07,
    1.3,
    0.16
  ], [
    s,
    n,
    a + 0.16
  ]), e.mesh(t, "box", M.timber, [
    i,
    0.06,
    0.16
  ], [
    s,
    n,
    a + 0.16
  ]);
}
function Xo(e, t, s) {
  const { width: a, depth: n } = s.footprint, i = s.kind === "clinic", r = i ? 3.7 : 5;
  e.mesh(t, "box", M.stone, [
    a - 0.3,
    r,
    n - 0.3
  ], [
    0,
    r / 2,
    0
  ]), e.mesh(t, "box", M.light, [
    a - 0.4,
    r - 1,
    n - 0.1
  ], [
    0,
    r / 2 + 0.4,
    0
  ]);
  for (const c of [-a / 2 + 0.15, a / 2 - 0.15]) for (const l of [-n / 2 + 0.15, n / 2 - 0.15]) e.mesh(t, "box", M.timber, [
    0.27,
    r,
    0.27
  ], [
    c,
    r / 2,
    l
  ]);
  for (const c of [0.8, r - 0.25]) e.mesh(t, "box", M.timber, [
    a,
    0.18,
    n
  ], [
    0,
    c,
    0
  ]);
  for (const c of [-a * 0.29, a * 0.29]) Yt(e, t, c, n / 2, 2.3, i ? 1.6 : 1.2);
  const d = e.group(t, [
    a / 2,
    0,
    0
  ]);
  d.rotation.y = Math.PI / 2;
  for (const c of [-n * 0.27, n * 0.27]) Yt(e, d, c, 0.03, 2.3);
  e.mesh(t, "box", M.shadow, [
    1.9,
    2.65,
    0.13
  ], [
    0,
    1.35,
    n / 2
  ]);
  for (const c of [-1, 1]) e.mesh(t, "box", M.wood, [
    0.85,
    2.5,
    0.12
  ], [
    c * 0.46,
    1.3,
    n / 2 + 0.08
  ]);
  e.mesh(t, "sphere", M.brass, [
    0.07,
    0.07,
    0.05
  ], [
    0.23,
    1.15,
    n / 2 + 0.19
  ]), as(e, t, a, n, r, i ? 2.4 : 3.2);
  const o = e.group(t, [
    -a * 0.27,
    r,
    -n * 0.18
  ]);
  if (e.mesh(o, "box", M.stone, [
    1.1,
    3.3,
    1.2
  ], [
    0,
    1.65,
    0
  ]), e.mesh(o, "box", M.light, [
    1.4,
    0.3,
    1.5
  ], [
    0,
    3.1,
    0
  ]), e.mesh(o, "box", M.shadow, [
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
    for (let l = -3; l <= 3; l++) e.mesh(c, "box", l % 2 ? M.light : M.cloth, [
      0.59,
      0.06,
      2.3
    ], [
      l * 0.6,
      0,
      0
    ]);
    for (const l of [-1, 1]) e.mesh(t, "cylinder", M.timber, [
      0.045,
      2.7,
      0.045
    ], [
      l * 2.1,
      1.35,
      n / 2 + 2.05
    ]);
    e.mesh(t, "box", M.slate, [
      0.9,
      1.2,
      0.14
    ], [
      2.8,
      2.8,
      n / 2 + 0.25
    ]), e.mesh(t, "cylinder", M.brass, [
      0.21,
      0.47,
      0.06
    ], [
      2.8,
      2.75,
      n / 2 + 0.36
    ]), e.mesh(t, "box", M.brass, [
      0.18,
      0.16,
      0.1
    ], [
      2.8,
      3.08,
      n / 2 + 0.36
    ]);
  } else
    Yt(e, t, 0, n / 2 + 0.09, r + 1, 0.9), e.mesh(t, "box", M.timber, [
      a + 0.4,
      0.26,
      0.24
    ], [
      0,
      3.5,
      n / 2 + 0.25
    ]);
}
function Jo(e, t, s) {
  const a = s.height, n = s.footprint.width, i = s.tint === "amber", r = s.tint === "rose", d = i ? M.amber : r ? M.rose : M.leaf, o = i ? M.amberLight : r ? "#dfb2a1" : M.leafLight, c = e.mesh(t, "cylinder", M.timber, [
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
    const h = e.group(t, [
      0,
      a * 0.39,
      0
    ]);
    h.rotation.set(0.4 * Math.sin(l * 2), 0, (l - 1) * 0.65), e.mesh(h, "cylinder", M.timber, [
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
    const h = l * 2.4, u = l === 8 ? 0.1 : n * 0.56, y = e.mesh(t, "crown", l % 3 ? d : o, [
      n * 0.49 + 0.4,
      a * 0.16,
      n * 0.45 + 0.4
    ], [
      Math.sin(h) * u,
      a * (0.68 + l % 3 * 0.11),
      Math.cos(h) * u
    ]);
    y.rotation.set(l * 0.37, l * 0.61, 0.14), y.receiveShadow = !1;
  }
}
function ei(e, t, s) {
  const { width: a, depth: n } = s.footprint, i = s.height;
  e.mesh(t, "box", M.stone, [
    a,
    i,
    n
  ], [
    0,
    i / 2,
    0
  ]);
  for (const r of [
    1,
    i * 0.55,
    i - 0.6
  ]) e.mesh(t, "box", M.light, [
    a + 0.25,
    0.3,
    n + 0.25
  ], [
    0,
    r,
    0
  ]);
  for (const r of [-a / 2 + 0.3, a / 2 - 0.3]) e.mesh(t, "box", M.mortar, [
    0.55,
    i - 1,
    n + 0.15
  ], [
    r,
    i / 2,
    0
  ]);
  for (const r of [i * 0.35, i * 0.7]) Yt(e, t, 0, n / 2 + 0.02, r, 0.7);
  as(e, t, a + 0.35, n + 0.35, i, i * 0.32), e.mesh(t, "cylinder", M.brass, [
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
  ], M.cloth, [
    0.05,
    i * 1.32 + 2.4,
    0
  ]);
}
function ti(e, t, s, a, n) {
  const i = a.footprint, r = e.group(t, [
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
      e.mesh(r, "box", M.mortar, [
        i.width,
        0.3,
        i.depth
      ], [
        0,
        0.15,
        0
      ]), Xo(e, d, a);
      break;
    case "tree":
      e.mesh(r, "box", M.soil, [
        i.width,
        0.18,
        i.depth
      ], [
        0,
        0.08,
        0
      ]);
      for (let o = 0; o < 7; o++) {
        const c = o * 0.9;
        e.mesh(r, "rock", M.grassDark, [
          0.7,
          0.3,
          0.5
        ], [
          Math.sin(c) * i.width * 0.33,
          0.2,
          Math.cos(c) * i.depth * 0.33
        ]);
      }
      Jo(e, d, a);
      break;
    case "tower":
      ei(e, d, a);
      break;
    case "column": {
      const o = a.height, c = Math.min(i.width, i.depth) * 0.3;
      e.mesh(r, "box", M.mortar, [
        i.width,
        0.35,
        i.depth
      ], [
        0,
        0.17,
        0
      ]), e.mesh(r, "box", M.light, [
        i.width * 0.84,
        0.35,
        i.depth * 0.84
      ], [
        0,
        0.5,
        0
      ]), e.mesh(d, "cylinder", M.stone, [
        c,
        o - 1.1,
        c
      ], [
        0,
        o / 2,
        0
      ]);
      for (let l = 0; l < 10; l++) {
        const h = l * Math.PI / 5;
        e.mesh(d, "box", M.light, [
          0.085,
          o - 2,
          0.085
        ], [
          Math.sin(h) * c,
          o / 2,
          Math.cos(h) * c
        ]);
      }
      for (const l of [0.85, o - 0.7]) e.mesh(d, "cylinder", M.brass, [
        c * 1.15,
        0.18,
        c * 1.15
      ], [
        0,
        l,
        0
      ]);
      e.mesh(d, "box", M.light, [
        i.width,
        0.4,
        i.depth
      ], [
        0,
        o - 0.3,
        0
      ]), e.mesh(d, "box", M.slate, [
        i.width * 0.9,
        0.3,
        i.depth * 0.9
      ], [
        0,
        o,
        0
      ]);
      break;
    }
    case "beacon":
      e.mesh(r, "box", M.mortar, [
        i.width,
        0.28,
        i.depth
      ], [
        0,
        0.14,
        0
      ]), e.mesh(r, "cylinder", M.stone, [
        2.5,
        0.5,
        2.5
      ], [
        0,
        0.5,
        0
      ]), e.mesh(d, "cylinder", M.slate, [
        1.35,
        3.9,
        1.35
      ], [
        0,
        2.3,
        0
      ]);
      for (const o of [
        1.2,
        3.5,
        4.4
      ]) e.mesh(d, "cylinder", M.brass, [
        1.55,
        0.2,
        1.55
      ], [
        0,
        o,
        0
      ]);
      e.mesh(d, "cylinder", M.shadow, [
        2.2,
        0.5,
        2.2
      ], [
        0,
        4.8,
        0
      ]), e.mesh(d, "torus", M.brass, [
        2.3,
        2.3,
        1.4
      ], [
        0,
        5.1,
        0
      ]).rotation.x = Math.PI / 2;
      for (let o = 0; o < 6; o++) {
        const c = o * Math.PI / 3, l = e.group(d, [
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
        ], M.brass, [
          0,
          0,
          0
        ], 0.14);
      }
      break;
    case "bunk":
      for (const o of [0.55, 1.9])
        e.mesh(r, "box", M.timber, [
          i.width - 0.5,
          0.18,
          i.depth - 0.5
        ], [
          0,
          o,
          0
        ]), e.mesh(r, "box", M.cloth, [
          i.width - 0.8,
          0.18,
          i.depth - 0.9
        ], [
          0,
          o + 0.16,
          0
        ]), e.mesh(r, "box", M.light, [
          i.width - 1,
          0.24,
          1.2
        ], [
          0,
          o + 0.28,
          -i.depth / 2 + 1.3
        ]);
      for (const o of [-1, 1]) for (const c of [-1, 1]) e.mesh(r, "box", M.shadow, [
        0.12,
        2.7,
        0.12
      ], [
        o * (i.width / 2 - 0.3),
        1.35,
        c * (i.depth / 2 - 0.3)
      ]);
      break;
    case "root": {
      const o = a.height, c = i.width * 0.23;
      e.mesh(r, "rock", M.soil, [
        i.width * 0.5,
        0.65,
        i.depth * 0.5
      ], [
        0,
        0.1,
        0
      ]);
      for (let l = 0; l < 5; l++) {
        const h = l * Math.PI * 0.4, u = i.width * 0.25, y = e.group(d, [
          Math.sin(h) * c * 0.45,
          0,
          Math.cos(h) * c * 0.45
        ]);
        y.rotation.y = h;
        const f = e.mesh(y, "cylinder", l % 2 ? M.root : M.rootLight, [
          c * 0.65,
          o * 0.64,
          c * 0.49
        ], [
          0,
          o * 0.3,
          0
        ]);
        f.rotation.z = 0.13;
        const g = e.group(y, [
          0,
          o * 0.48,
          0
        ]);
        g.rotation.z = 0.4 + l * 0.12, e.mesh(g, "cone", M.root, [
          c * 0.47,
          o * 0.55,
          c * 0.4
        ], [
          0,
          o * 0.25,
          0
        ]);
        const v = e.mesh(y, "cone", M.root, [
          c * 0.5,
          u * 1.4,
          c * 0.4
        ], [
          u * 0.6,
          0.7,
          0
        ]);
        v.rotation.z = -1.15;
      }
      if (o > 8) {
        e.mesh(d, "rock", M.shadow, [
          c * 0.65,
          o * 0.22,
          0.35
        ], [
          0,
          o * 0.38,
          c * 0.65
        ]), e.mesh(d, "rock", M.brass, [
          c * 0.16,
          o * 0.16,
          0.15
        ], [
          0,
          o * 0.4,
          c * 0.68
        ], !0);
        for (let l = 0; l < 7; l++) e.mesh(d, "crown", l % 2 ? M.leaf : M.leafLight, [
          1.4,
          0.8,
          1.2
        ], [
          Math.sin(l * 2) * c,
          o * 0.55 + l * 0.4,
          Math.cos(l * 2) * c
        ]);
      }
      break;
    }
    case "arch": {
      const o = a.height;
      e.mesh(d, "arch", M.light, [
        i.width / 2 - 0.4,
        3.1,
        i.depth * 0.65
      ], [
        0,
        o - 3,
        0
      ]), e.mesh(d, "box", M.brass, [
        0.8,
        1.4,
        i.depth * 0.75
      ], [
        0,
        o + 0.2,
        0
      ]);
      for (const c of [-1, 1]) {
        const l = e.group(d, [
          c * (i.width / 2 - 0.5),
          o - 2.2,
          i.depth / 2 - 0.4
        ]);
        e.mesh(l, "box", M.brass, [
          1.5,
          0.08,
          0.1
        ]), e.shape(l, [
          [-0.6, 0],
          [0.6, 0],
          [0.6, -2.5],
          [0, -2.9],
          [-0.6, -2.5]
        ], M.slate, [
          0,
          -0.05,
          0.06
        ]), e.mesh(l, "box", M.cloth, [
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
      const o = a.height;
      e.mesh(r, "box", M.mortar, [
        i.width,
        Math.min(o, 0.65),
        i.depth
      ], [
        0,
        Math.min(o, 0.65) / 2,
        0
      ]), e.mesh(d, "box", n ? M.marble : M.stone, [
        i.width,
        o,
        i.depth
      ], [
        0,
        o / 2,
        0
      ]), e.mesh(d, "box", M.light, [
        i.width + 0.12,
        0.23,
        i.depth + 0.12
      ], [
        0,
        o,
        0
      ]);
      const c = i.width > i.depth, l = Math.max(i.width, i.depth);
      if (n) {
        for (const h of [1.1, o - 0.55]) e.mesh(d, "box", M.light, [
          i.width + 0.15,
          0.22,
          i.depth + 0.15
        ], [
          0,
          h,
          0
        ]);
        for (let h = -l / 2 + 3; h < l / 2 - 1; h += 6) for (const u of [-1, 1]) {
          const y = e.group(d, [
            c ? h : u * (i.width / 2 + 0.04),
            0,
            c ? u * (i.depth / 2 + 0.04) : h
          ]);
          y.rotation.y = c ? u < 0 ? Math.PI : 0 : u * Math.PI / 2;
          const f = o * 0.61, g = Math.min(2.1, o * 0.3);
          e.mesh(y, "box", M.undercroft, [
            1.5,
            g,
            0.05
          ], [
            0,
            f,
            0
          ]);
          for (const v of [
            -0.55,
            0,
            0.55
          ]) e.mesh(y, "box", M.shadow, [
            0.07,
            g,
            0.06
          ], [
            v,
            f,
            0.06
          ]);
          for (const v of [-1, 1]) e.mesh(y, "box", M.light, [
            1.9,
            0.15,
            0.2
          ], [
            0,
            f + v * g / 2,
            0.06
          ]);
          e.mesh(y, "box", M.stone, [
            0.45,
            o - 1,
            0.32
          ], [
            2.2,
            o / 2,
            0
          ]);
        }
        break;
      }
      for (let h = -l / 2 + 1; h < l / 2; h += 3.5) {
        o > 4 && e.mesh(d, "box", M.stone, c ? [
          1.3,
          0.85,
          i.depth
        ] : [
          i.width,
          0.85,
          1.3
        ], [
          c ? h : 0,
          o + 0.55,
          c ? 0 : h
        ]);
        for (let u = 0; u < Math.floor(o / 0.9); u++) e.mesh(d, "box", M.mortar, c ? [
          0.035,
          0.6,
          0.025
        ] : [
          0.025,
          0.6,
          0.035
        ], [
          c ? h + u % 2 * 0.7 : i.width / 2 + 0.01,
          0.55 + u * 0.85,
          c ? i.depth / 2 + 0.01 : h + u % 2 * 0.7
        ]);
      }
      break;
    }
    case "water":
      e.mesh(r, "box", M.water, [
        i.width,
        0.12,
        i.depth
      ], [
        0,
        -0.18,
        0
      ]);
      for (let o = 0; o < i.width * i.depth / 9; o++) {
        const c = Math.sin(o * 7.3) * (i.width / 2 - 0.8), l = Math.cos(o * 3.7) * (i.depth / 2 - 0.3);
        e.mesh(r, "box", M.ripple, [
          0.4 + o % 4 * 0.3,
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
      e.mesh(r, "box", M.stone, [
        i.width,
        0.55,
        i.depth
      ], [
        0,
        0.275,
        0
      ]), e.mesh(r, "box", M.soil, [
        i.width - 0.35,
        0.1,
        i.depth - 0.35
      ], [
        0,
        0.57,
        0
      ]);
      for (let o = -i.width / 2 + 0.65; o < i.width / 2; o += 1) for (let c = -i.depth / 2 + 0.6; c < i.depth / 2; c += 0.95) {
        const l = Math.sin(o * 7 + c * 19), h = i.width > 8 ? 0.63 : 0.37;
        e.mesh(r, "crown", l > 0.3 ? M.leafLight : M.leaf, [
          h,
          0.32 + l * 0.1,
          h * 0.9
        ], [
          o + l * 0.15,
          0.81,
          c
        ]), l > 0.5 && e.mesh(r, "rock", l > 0.8 ? M.light : M.rose, [
          0.1,
          0.12,
          0.1
        ], [
          o + 0.1,
          1.13,
          c
        ]);
      }
      break;
    case "thicket":
      e.mesh(r, "box", M.soil, [
        i.width,
        0.2,
        i.depth
      ], [
        0,
        0.07,
        0
      ]);
      for (let o = -i.width / 2 + 0.7; o < i.width / 2; o += 1.3) for (let c = -i.depth / 2 + 0.65; c < i.depth / 2; c += 1.25) {
        const l = Math.sin(o * 13 + c * 7), h = 0.6 + l * 0.2;
        e.mesh(r, "crown", l > 0 ? M.leaf : M.leafLight, [
          0.7,
          h,
          0.7
        ], [
          o,
          h * 0.75,
          c
        ]), l > 0.75 && e.mesh(r, "rock", M.amberLight, [
          0.16,
          0.15,
          0.16
        ], [
          o,
          h * 1.65,
          c
        ]);
      }
      break;
    case "hearth":
      e.mesh(r, "box", M.mortar, [
        i.width,
        0.24,
        i.depth
      ], [
        0,
        0.12,
        0
      ]), e.mesh(r, "cylinder", M.stone, [
        1.35,
        0.65,
        1.35
      ], [
        0,
        0.49,
        0
      ]), e.mesh(r, "cylinder", M.shadow, [
        1.06,
        0.06,
        1.06
      ], [
        0,
        0.84,
        0
      ]);
      for (let o = 0; o < 8; o++) {
        const c = o * Math.PI / 4, l = e.mesh(r, "cylinder", M.timber, [
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
      for (let o = 0; o < 5; o++) e.mesh(r, "rock", o % 2 ? M.ember : "#ea9963", [
        0.23,
        0.5 + o % 3 * 0.16,
        0.23
      ], [
        Math.sin(o * 2.4) * 0.35,
        1.35,
        Math.cos(o * 2.4) * 0.35
      ], !0);
      for (const o of [-1, 1])
        e.mesh(r, "cylinder", M.slate, [
          0.13,
          2.15,
          0.13
        ], [
          o * 1.22,
          1.35,
          0
        ]), e.mesh(r, "cone", M.brass, [
          0.23,
          0.45,
          0.23
        ], [
          o * 1.22,
          2.65,
          0
        ]);
      e.mesh(r, "torus", M.brass, [
        1.2,
        1.2,
        1.2
      ], [
        0,
        2.22,
        0
      ]).rotation.x = Math.PI / 2, e.mesh(r, "rock", M.ember, [
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
      e.mesh(r, "box", M.wood, [
        i.width - 1,
        0.35,
        i.depth - 1.2
      ], [
        0,
        1.1,
        0
      ]);
      for (const o of [-1, 1]) {
        for (let c = 0; c < 3; c++) e.mesh(r, "box", M.wood, [
          0.12,
          0.24,
          i.depth - 1
        ], [
          o * (i.width / 2 - 0.5),
          1.4 + c * 0.29,
          0
        ]);
        for (const c of [-i.depth * 0.28, i.depth * 0.28]) {
          e.mesh(r, "torus", M.shadow, [
            0.7,
            0.7,
            0.7
          ], [
            o * (i.width / 2 - 0.2),
            0.76,
            c
          ]).rotation.y = Math.PI / 2;
          for (let l = 0; l < 4; l++) {
            const h = e.mesh(r, "box", M.wood, [
              0.09,
              1.25,
              0.09
            ], [
              o * (i.width / 2 - 0.2),
              0.76,
              c
            ]);
            h.rotation.x = l * Math.PI / 4;
          }
        }
      }
      e.mesh(r, "box", M.cloth, [
        1.4,
        0.8,
        1.8
      ], [
        0,
        1.7,
        -0.8
      ]), e.mesh(r, "cylinder", M.timber, [
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
      for (let o = 0; o < 4; o++) {
        const c = e.group(r, [
          o % 2 * 1.5 - 0.75,
          o === 3 ? 1.3 : 0,
          o < 2 ? -0.7 : 0.7
        ]);
        e.mesh(c, "box", M.wood, [
          1.2,
          1.2,
          1.2
        ], [
          0,
          0.6,
          0
        ]);
        for (const l of [-1, 1]) e.mesh(c, "box", M.timber, [
          0.1,
          1.25,
          1.3
        ], [
          l * 0.43,
          0.6,
          0
        ]);
        e.mesh(c, "box", M.light, [
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
      e.mesh(r, "box", M.wood, [
        i.width - 0.3,
        0.18,
        i.depth - 0.2
      ], [
        0,
        0.72,
        0
      ]), e.mesh(r, "box", M.wood, [
        0.13,
        0.75,
        i.depth - 0.2
      ], [
        -i.width / 2 + 0.1,
        1.12,
        0
      ]);
      for (const o of [-1, 1]) e.mesh(r, "box", M.shadow, [
        i.width - 0.5,
        0.7,
        0.22
      ], [
        0,
        0.35,
        o * (i.depth / 2 - 0.5)
      ]);
      break;
    case "ruin":
      e.mesh(r, "box", M.stone, [
        i.width,
        0.5,
        i.depth
      ], [
        0,
        0.25,
        0
      ]);
      for (let o = 0; o < 3; o++) {
        const c = -i.width * 0.3 + o * i.width * 0.3, l = (a.height ?? 3) * (1 - o * 0.22), h = i.width * 0.11;
        e.mesh(d, "cylinder", M.stone, [
          h,
          l,
          h
        ], [
          c,
          l / 2 + 0.3,
          -i.depth * 0.2
        ]), e.mesh(d, "box", M.light, [
          h * 2.6,
          0.25,
          h * 2.6
        ], [
          c,
          l + 0.3,
          -i.depth * 0.2
        ]);
        for (let u = 0; u < 6; u++) {
          const y = u * Math.PI / 3;
          e.mesh(d, "box", M.mortar, [
            0.055,
            l * 0.8,
            0.055
          ], [
            c + Math.sin(y) * h,
            l / 2 + 0.3,
            -i.depth * 0.2 + Math.cos(y) * h
          ]);
        }
      }
      e.mesh(r, "rock", M.grassDark, [
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
var zt = 1e-7;
function La(e, t, s) {
  return (t[0] - e[0]) * (s[1] - e[1]) - (t[1] - e[1]) * (s[0] - e[0]);
}
function xn(e, t, s, a) {
  const n = [];
  for (let i = 0; i < e.length; i++) {
    const r = e[i], d = e[(i + 1) % e.length], o = La(t, s, r), c = La(t, s, d), l = a ? o >= -1e-7 : o <= zt, h = a ? c >= -1e-7 : c <= zt;
    if (l && n.push(r), l !== h && Math.abs(o - c) > zt) {
      const u = o / (o - c);
      n.push([r[0] + (d[0] - r[0]) * u, r[1] + (d[1] - r[1]) * u]);
    }
  }
  return n;
}
function ns(e) {
  return Math.abs(e.reduce((t, s, a) => t + s[0] * e[(a + 1) % e.length][1] - s[1] * e[(a + 1) % e.length][0], 0)) / 2;
}
function ai(e, t) {
  let s = e;
  const a = [];
  for (let n = 0; n < t.length && s.length >= 3; n++) {
    const i = t[n], r = t[(n + 1) % t.length], d = xn(s, i, r, !1);
    ns(d) > zt && a.push(d), s = xn(s, i, r, !0);
  }
  return a;
}
function ni(e, t, s) {
  const a = t[0] - e[0], n = t[1] - e[1], i = s / (2 * Math.hypot(a, n)), r = -n * i, d = a * i;
  return [
    [e[0] + r, e[1] + d],
    [e[0] - r, e[1] - d],
    [t[0] - r, t[1] - d],
    [t[0] + r, t[1] + d]
  ];
}
function ss(e, t) {
  const s = [];
  for (const a of e) {
    for (let n = 1; n < a.points.length; n++) s.push(ni(a.points[n - 1], a.points[n], a.width + t));
    for (const [n, i] of a.points.slice(1, -1)) s.push(Array.from({ length: 12 }, (r, d) => {
      const o = d * Math.PI / 6, c = (a.width + t) / 2;
      return [n + Math.cos(o) * c, i + Math.sin(o) * c];
    }));
  }
  return s;
}
function si(e, t = 0) {
  const s = ss(e, t), a = [];
  for (let n = 0; n < s.length; n++) {
    let i = [s[n]];
    for (let r = 0; r < n && i.length; r++) i = i.flatMap((d) => ai(d, s[r]));
    a.push(...i.filter((r) => ns(r) > zt));
  }
  return a;
}
function oi(e, t, s, a) {
  for (const [r, d, o] of [[
    0.4,
    0.025,
    s ? M.brass : M.mortar
  ], [
    0,
    0.04,
    s ? M.slate : M.stone
  ]]) for (const c of si(t, r)) {
    const l = c.reduce((y, f) => y + f[0], 0) / c.length, h = c.reduce((y, f) => y + f[1], 0) / c.length, u = e.shape(a(l, h), c.map((y) => [y[0], -y[1]]), o, [
      0,
      d,
      0
    ]);
    u.rotation.x = -Math.PI / 2, u.castShadow = !1;
  }
  const n = ss(t, 0.4);
  let i = 0;
  for (const r of t) {
    for (let d = 1; d < r.points.length; d++, i++) {
      const o = r.points[d - 1], c = r.points[d], l = c[0] - o[0], h = c[1] - o[1], u = Math.hypot(l, h);
      for (let y = 1.5; y < u; y += 1.65) {
        const f = o[0] + l * y / u, g = o[1] + h * y / u;
        if (n.some((b, m) => m !== i && b.every((x, w) => La(x, b[(w + 1) % b.length], [f, g]) >= -1e-7))) continue;
        const v = e.mesh(a(f, g), "box", s ? M.shadow : M.mortar, [
          r.width - 0.08,
          0.012,
          0.025
        ], [
          f,
          0.049,
          g
        ]);
        v.rotation.y = Math.atan2(l, h), v.castShadow = !1;
      }
    }
    i += r.points.length - 2;
  }
}
function ii(e, t) {
  const s = e.x - e.width / 2, a = s + e.width, n = e.z - e.depth / 2, i = n + e.depth, r = Math.max(s, t.x - t.width / 2), d = Math.min(a, t.x + t.width / 2), o = Math.max(n, t.z - t.depth / 2), c = Math.min(i, t.z + t.depth / 2);
  return r >= d || o >= c ? [e] : [
    [
      s,
      n,
      a,
      o
    ],
    [
      s,
      c,
      a,
      i
    ],
    [
      s,
      o,
      r,
      c
    ],
    [
      d,
      o,
      a,
      c
    ]
  ].filter(([l, h, u, y]) => u > l && y > h).map(([l, h, u, y]) => ({
    x: (l + u) / 2,
    z: (h + y) / 2,
    width: u - l,
    depth: y - h
  }));
}
function ri(e, t, s) {
  const a = s[0] - t[0], n = s[1] - t[1], i = Math.max(0, Math.min(1, ((e.x - t[0]) * a + (e.y - t[1]) * n) / (a * a + n * n)));
  return Math.hypot(e.x - t[0] - a * i, e.y - t[1] - n * i);
}
function li(e, t, s) {
  const a = [], n = /* @__PURE__ */ new Map(), i = [], r = new Is(), d = new _t(), o = new Ps(), c = [];
  function l(m, x) {
    const w = `${Math.floor(m / 16)}:${Math.floor(x / 16)}`;
    let k = n.get(w);
    return k || (k = e.group(t), n.set(w, k)), k;
  }
  let h = [s.bounds];
  for (const m of s.features.filter((x) => x.kind === "water")) h = h.flatMap((x) => ii(x, m.footprint));
  const u = s.surface === "grass", y = s.surface === "marble", f = u ? M.grass : s.surface === "wet" ? M.wetStone : y ? M.marble : M.stone;
  for (const m of h)
    if (e.mesh(l(m.x, m.z), "box", f, [
      m.width,
      0.6,
      m.depth
    ], [
      m.x,
      -0.32,
      m.z
    ]).castShadow = !1, !u) for (let x = m.x - m.width / 2; x < m.x + m.width / 2; x += 4) for (let w = m.z - m.depth / 2; w < m.z + m.depth / 2; w += 4) {
      const k = Math.min(4, m.x + m.width / 2 - x), z = Math.min(4, m.z + m.depth / 2 - w), C = y ? Math.round(x / 4 + w / 4) % 2 ? M.marble : M.marbleLight : f;
      e.mesh(l(x, w), "box", C, [
        k - 0.04,
        0.018,
        z - 0.04
      ], [
        x + k / 2,
        -9e-3,
        w + z / 2
      ]).castShadow = !1;
    }
  if (oi(e, s.roads, y, l), y) {
    const m = l(0, -17);
    for (const x of [
      4,
      4.4,
      5.5
    ]) e.ring(m, M.brass, x, 0, -17, 1, !1, 0.09);
    for (let x = 0; x < 12; x++) {
      const w = x * Math.PI / 6;
      e.shape(m, [
        [0, 0],
        [0.35, 0.7],
        [0, 2.5],
        [-0.35, 0.7]
      ], M.brass, [
        Math.sin(w) * 4.6,
        0.095,
        -17 + Math.cos(w) * 4.6
      ]).rotation.set(-Math.PI / 2, 0, w);
    }
  }
  if (s.vista === "camp") {
    const m = l(0, 8);
    e.ring(m, M.mortar, 10.7, 0, 8, 1, !0, 0.08), e.ring(m, M.stone, 10.35, 0, 8, 1, !0, 0.085);
    for (let x = 0; x < 6; x++) {
      const w = 2 + x * 1.29, k = w + 1.23, z = 10 + x * 6;
      for (let C = 0; C < z; C++) {
        const L = (C + x % 2 * 0.5) / z * Math.PI * 2 + 8e-3, N = L + Math.PI * 2 / z - 0.02, A = [
          [Math.cos(L) * w, Math.sin(L) * w],
          [Math.cos(N) * w, Math.sin(N) * w],
          [Math.cos(N) * k, Math.sin(N) * k],
          [Math.cos(L) * k, Math.sin(L) * k]
        ], R = e.shape(m, A, (x * 7 + C) % 5 ? M.stone : "#c5c9b7", [
          0,
          0.096,
          8
        ]);
        R.rotation.x = -Math.PI / 2;
      }
    }
    e.ring(m, M.mortar, 4.5, 0, 6, 1, !1, 0.11);
    for (let x = 0; x < 20; x++) {
      const w = x * Math.PI / 10, k = e.mesh(m, "box", M.light, [
        0.15,
        0.025,
        0.75
      ], [
        Math.sin(w) * 9.65,
        0.12,
        8 + Math.cos(w) * 9.65
      ]);
      k.rotation.y = w;
    }
  }
  const { bounds: g } = s;
  for (let m = 0; m < (u ? 420 : 0); m++) {
    const x = g.x + Math.sin(m * 127.13) * (g.width / 2 - 3), w = g.z + Math.cos(m * 53.71) * (g.depth / 2 - 3), k = {
      x,
      y: w
    };
    if (s.features.some((C) => Dn(k, {
      ...C.footprint,
      width: C.footprint.width + 1.5,
      depth: C.footprint.depth + 1.5
    })) || s.roads.some((C) => C.points.slice(1).some((L, N) => ri(k, C.points[N], L) < C.width / 2 + 1)) || s.vista === "camp" && Math.hypot(x, w - 8) < 11) continue;
    const z = l(x, w);
    if (m % 4 === 0) {
      const C = Array.from({ length: 9 }, (N, A) => {
        const R = A * Math.PI * 2 / 9, q = 1 + Math.sin(A * 7 + m) * 0.3;
        return [Math.cos(R) * q * (1.2 + m % 3), Math.sin(R) * q * (0.7 + m % 2)];
      }), L = e.shape(z, C, m % 8 ? M.grassDark : M.grassLight, [
        x,
        5e-3,
        w
      ]);
      L.rotation.x = -Math.PI / 2;
    } else {
      for (let C = 0; C < 3; C++) {
        const L = e.mesh(z, "cone", m % 3 ? M.grassDark : M.leafLight, [
          0.035,
          0.3 + C * 0.09,
          0.035
        ], [
          x + (C - 1) * 0.16,
          0.15,
          w
        ]);
        L.rotation.z = (C - 1) * 0.35;
      }
      m % 11 === 0 && e.mesh(z, "rock", M.light, [
        0.12,
        0.13,
        0.12
      ], [
        x,
        0.38,
        w
      ]);
    }
  }
  for (const m of s.features) {
    const x = m.footprint, w = x.width > x.depth, k = Math.max(x.width, x.depth), z = m.kind === "wall" ? Math.ceil(k / 7) : 1, C = e.group(t);
    C.name = m.id;
    for (let L = 0; L < z; L++) {
      const N = -k / 2 + (L + 0.5) * k / z, A = z === 1 ? x : {
        ...x,
        x: x.x + (w ? N : 0),
        z: x.z + (w ? 0 : N),
        width: w ? k / z : x.width,
        depth: w ? x.depth : k / z
      }, R = z === 1 ? C : e.group(C);
      ti(e, l(A.x, A.z), R, {
        ...m,
        footprint: A
      }, s.vista === "interior") ? (a.push(e.bake(R)), i.push({
        root: R,
        bounds: new zs().setFromObject(R).expandByScalar(0.35)
      })) : R.removeFromParent();
    }
  }
  for (const m of s.roads.slice(0, 1)) for (let x = 1; x < m.points.length; x++) {
    const [w, k] = m.points[x];
    if (!(s.vista === "camp" && Math.hypot(w, k - 8) < 13))
      for (const z of [-1, 1]) ts(e, l(w, k), w + z * (m.width / 2 + 0.6), k);
  }
  const v = e.group(t), b = s.vista === "interior";
  e.mesh(v, "box", b ? M.undercroft : "#709d87", [
    300,
    8,
    300
  ], [
    0,
    -4.65,
    0
  ]).castShadow = !1;
  for (let m = 0; m < (b ? 0 : 12); m++) {
    const x = (m % 2 ? 1 : -1) * (g.width / 2 + 15 + m % 3 * 8), w = g.z - 25 + m * 7;
    e.mesh(v, "crown", m % 3 ? "#7da993" : "#92b6a1", [
      17 + m % 4 * 3,
      6 + m % 3 * 2,
      22
    ], [
      x,
      -3,
      w
    ]);
  }
  for (let m = 0; m < (b || s.vista === "garden" ? 0 : 9); m++) {
    const x = (m - 4) * 12, w = g.z - g.depth / 2 - 15 - m % 3 * 6, k = 9 + m % 4 * 3;
    e.mesh(v, "box", "#9dbab0", [
      9,
      k,
      9
    ], [
      x,
      k / 2 - 2,
      w
    ]), e.mesh(v, "cone", "#669692", [
      7,
      6,
      7
    ], [
      x,
      k + 1,
      w
    ]);
    for (let z = -1; z <= 1; z++) e.mesh(v, "box", "#759c96", [
      0.8,
      2.5,
      0.08
    ], [
      x + z * 2.2,
      k - 4,
      w + 4.55
    ]);
  }
  if (!b && s.vista !== "garden") {
    const m = g.z - g.depth / 2 - 25;
    e.mesh(v, "box", "#d6dcc9", [
      8,
      35,
      8
    ], [
      -17,
      15.5,
      m
    ]), e.mesh(v, "cone", M.slate, [
      7,
      13,
      7
    ], [
      -17,
      39,
      m
    ]), e.mesh(v, "torus", M.brass, [
      2.5,
      2.5,
      0.6
    ], [
      -17,
      28,
      m + 4.1
    ]), e.mesh(v, "box", M.shadow, [
      0.13,
      1.8,
      0.1
    ], [
      -17,
      28.8,
      m + 4.2
    ]), e.mesh(v, "box", M.shadow, [
      1.4,
      0.13,
      0.1
    ], [
      -16.4,
      28,
      m + 4.2
    ]);
  }
  a.push(e.bake(v));
  for (const m of n.values()) a.push(e.bake(m));
  return {
    update(m, x) {
      r.direction.copy(d.set(Math.sin(x), Ue.height / Ue.distance, Math.cos(x)).normalize());
      for (const w of i) {
        c.length = 0;
        for (const k of [0.1, 1.6])
          if (r.origin.set(m.x, k, m.y), o.ray.copy(r), r.intersectsBox(w.bounds) && o.intersectObject(w.root, !0, c), c.length) break;
        w.root.visible = c.length === 0;
      }
    },
    dispose() {
      a.forEach((m) => m()), t.clear();
    }
  };
}
function ci(e, t, s, a, n, i, r = !0) {
  const d = i.has("captives_arrived"), o = e.group(t, [
    a,
    0,
    n
  ]), c = e.group(t), l = s === "sanniang", h = s === "laobai", u = s === "kouzi";
  o.rotation.y = l ? 0.25 : -0.35, r && (u || s === "anian") && (o.position.y = -0.3), o.scale.setScalar(h ? 1.24 : u ? 1.06 : s === "anian" ? 1.19 : 1.12);
  const y = l ? "#426e69" : h ? "#485d74" : u ? "#a08652" : "#a76850", f = "#615047", g = "#dfbaa0", v = h ? 0.39 : u ? 0.25 : 0.29, b = h ? 0.31 : 0.23, m = [];
  for (const T of [-1, 1]) {
    const O = e.group(o, [
      T * 0.16,
      0.78,
      T > 0 ? 0.03 : -0.04
    ]);
    O.rotation.x = r && (u || s === "anian") ? -1.15 : T * 0.06, m.push(O), e.mesh(O, "cylinder", "#48545d", [
      0.115,
      0.61,
      0.12
    ], [
      0,
      -0.28,
      0
    ]), e.mesh(O, "cylinder", f, [
      0.135,
      0.37,
      0.14
    ], [
      0,
      -0.53,
      0
    ]), e.mesh(O, "sphere", f, [
      0.14,
      0.12,
      0.23
    ], [
      0,
      -0.69,
      0.08
    ]);
  }
  e.mesh(o, "sphere", y, [
    v,
    0.46,
    0.22
  ], [
    0,
    1.24,
    0
  ]), e.mesh(o, "cylinder", y, [
    b,
    0.34,
    0.21
  ], [
    0,
    0.92,
    0
  ]), e.mesh(o, "cylinder", f, [
    b + 0.015,
    0.08,
    0.23
  ], [
    0,
    1.01,
    0
  ]), e.mesh(o, "box", "#c6aa72", [
    0.13,
    0.11,
    0.03
  ], [
    0,
    1.01,
    0.244
  ]), e.mesh(o, "cylinder", g, [
    0.095,
    0.2,
    0.1
  ], [
    0,
    1.68,
    0
  ]);
  const x = e.group(o, [
    0,
    1.93,
    0.025
  ]);
  x.rotation.x = l ? 0.1 : -0.025, e.mesh(x, "sphere", g, [
    0.215,
    0.285,
    0.22
  ]);
  const w = l ? "#654336" : "#424344";
  e.mesh(x, "sphere", w, [
    0.23,
    0.18,
    0.23
  ], [
    0,
    0.16,
    -0.025
  ]);
  for (const T of [-1, 1])
    e.mesh(x, "sphere", w, [
      0.045,
      0.17,
      0.095
    ], [
      T * 0.2,
      0.02,
      -0.03
    ]), e.mesh(x, "sphere", "#303b3b", [
      0.026,
      0.033,
      0.013
    ], [
      T * 0.083,
      0.025,
      0.216
    ]), e.mesh(x, "box", w, [
      0.069,
      0.018,
      0.016
    ], [
      T * 0.086,
      0.093,
      0.219
    ]), e.mesh(x, "sphere", g, [
      0.036,
      0.062,
      0.045
    ], [
      T * 0.212,
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
  for (const T of [-1, 1]) {
    const O = e.group(o, [
      T * v,
      1.48,
      0
    ]);
    O.rotation.z = T * 0.11, O.rotation.x = l ? T > 0 ? -0.85 : -0.2 : T > 0 ? -0.4 : -0.1, e.mesh(O, "cylinder", y, [
      0.11,
      0.39,
      0.12
    ], [
      0,
      -0.17,
      0
    ]), e.mesh(O, "cylinder", l ? "#e8e1cc" : "#80969d", [
      0.12,
      0.14,
      0.13
    ], [
      0,
      -0.39,
      0
    ]), e.mesh(O, "cylinder", g, [
      0.076,
      0.22,
      0.085
    ], [
      0,
      -0.51,
      0
    ]), e.mesh(O, "sphere", g, [
      0.09,
      0.105,
      0.075
    ], [
      0,
      -0.65,
      0
    ]), l && T > 0 && (e.mesh(O, "cylinder", "#b67e3f", [
      0.073,
      0.21,
      0.073
    ], [
      0,
      -0.68,
      0.1
    ]), e.mesh(O, "cylinder", "#dbc8a2", [
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
    e.mesh(o, "cylinder", y, [
      0.125,
      0.23,
      0.12
    ], [
      0,
      1.66,
      0
    ]), e.shape(o, [
      [-0.21, 0.36],
      [0.21, 0.36],
      [0.3, -0.36],
      [-0.3, -0.36]
    ], "#eee7d3", [
      0,
      1.02,
      0.238
    ], 0.014), e.mesh(o, "box", "#d0c4a4", [
      0.18,
      0.17,
      0.025
    ], [
      0.07,
      0.85,
      0.276
    ]);
    for (const T of [-1, 1]) {
      const O = e.mesh(o, "box", "#eee7d3", [
        0.052,
        0.53,
        0.025
      ], [
        T * 0.16,
        1.39,
        0.19
      ]);
      O.rotation.z = -T * 0.15;
    }
    for (let T = 0; T < 5; T++) e.mesh(x, "sphere", w, [
      0.085 - T * 8e-3,
      0.12,
      0.095 - T * 0.01
    ], [
      0.16,
      -0.04 - T * 0.15,
      -0.2
    ]);
    e.mesh(x, "box", "#dfba7a", [
      0.16,
      0.065,
      0.12
    ], [
      0.16,
      -0.46,
      -0.2
    ]), e.mesh(o, "box", f, [
      0.24,
      0.28,
      0.17
    ], [
      -0.31,
      0.9,
      -0.05
    ]);
  } else if (h) {
    e.mesh(o, "sphere", y, [
      0.34,
      0.35,
      0.2
    ], [
      0,
      1.17,
      0.1
    ]), e.shape(o, [
      [-0.41, 0.34],
      [0.41, 0.34],
      [0.49, -0.58],
      [0.18, -0.7],
      [-0.35, -0.57]
    ], "#627a92", [
      0,
      1.18,
      -0.26
    ], 0.025), e.mesh(o, "box", "#aeb7b6", [
      0.44,
      0.14,
      0.11
    ], [
      0,
      1.62,
      0.19
    ]);
    const T = e.group(o, [
      -0.36,
      1.1,
      0.2
    ]);
    T.rotation.z = -0.18, e.mesh(T, "box", "#7a624b", [
      0.32,
      0.42,
      0.075
    ]), e.mesh(T, "box", "#e4dfcd", [
      0.27,
      0.36,
      0.025
    ], [
      0,
      0,
      0.047
    ]), e.mesh(o, "cylinder", "#e4dfcd", [
      0.13,
      0.25,
      0.14
    ], [
      0.16,
      0.36,
      0.06
    ]);
  } else if (u) {
    if (d && r) {
      o.position.y = 0.5;
      const T = e.mesh(c, "cylinder", "#849b95", [
        0.24,
        2.4,
        0.24
      ], [
        a,
        0.72,
        n
      ]);
      T.rotation.z = Math.PI / 2;
      for (const O of [-1, 1]) e.mesh(c, "box", "#637b7c", [
        0.2,
        0.7,
        0.6
      ], [
        a + O * 0.8,
        0.35,
        n
      ]);
    }
    e.mesh(o, "box", "#e7dbc4", [
      0.28,
      0.22,
      0.23
    ], [
      0.16,
      0.53,
      0.03
    ]), e.mesh(o, "box", "#6f5540", [
      0.24,
      0.21,
      0.15
    ], [
      -0.3,
      1,
      0.12
    ]), i.has("supplies_secured") && e.mesh(o, "cylinder", "#8caaa7", [
      0.035,
      0.44,
      0.035
    ], [
      -0.32,
      1.11,
      0.22
    ]), e.mesh(o, "box", "#6b5944", [
      0.52,
      0.43,
      0.03
    ], [
      0,
      1.29,
      0.24
    ]);
  } else {
    e.mesh(o, "cone", y, [
      0.34,
      0.75,
      0.25
    ], [
      0,
      0.78,
      0
    ]), e.mesh(x, "sphere", w, [
      0.2,
      0.32,
      0.16
    ], [
      0,
      -0.12,
      -0.16
    ]);
    for (let O = 0; O < 3; O++) {
      const xe = e.mesh(o, "box", "#ded3b5", [
        0.29,
        0.34,
        0.018
      ], [
        -0.12 + O * 0.02,
        1.02,
        0.31 + O * 0.023
      ]);
      xe.rotation.z = O * 0.1;
    }
    const T = e.mesh(o, "box", "#d8ba87", [
      0.075,
      0.83,
      0.04
    ], [
      0,
      1.25,
      0.22
    ]);
    T.rotation.z = -0.55, e.mesh(o, "box", f, [
      0.42,
      0.44,
      0.21
    ], [
      0.21,
      0.91,
      -0.28
    ]);
  }
  const k = e.ring(t, "#e8c77b", 0.75, a, n, 0.8);
  x.removeFromParent(), m.forEach((T) => T.removeFromParent());
  const z = m.map((T) => e.bake(T)), C = e.bake(o), L = e.bake(x), N = e.bake(c);
  o.add(x, ...m);
  const A = o.position.y, R = o.rotation.y, q = {
    x: a,
    y: n
  };
  let G = -1 / 0, B = 0;
  return {
    root: o,
    ring: k,
    id: s,
    position: q,
    seated: r,
    locate(T, O) {
      const xe = q.x !== T.position.x || q.y !== T.position.y;
      return xe && (G = O), B = T.facing, q.x = T.position.x, q.y = T.position.y, o.position.x = q.x, o.position.z = q.y, k.position.x = q.x, k.position.z = q.y, xe;
    },
    update(T, O, xe) {
      const $e = O - G < 120, je = Math.hypot(T.x - q.x, T.y - q.y) < 10;
      k.visible = je;
      const ge = $e ? Math.PI / 2 - B : je ? Math.atan2(T.x - q.x, T.y - q.y) : R, de = Math.atan2(Math.sin(ge - o.rotation.y), Math.cos(ge - o.rotation.y));
      o.rotation.y += xe ? de : de * 0.16, o.position.y = A + (xe ? 0 : Math.sin(O * 15e-4 + a) * 0.012), x.rotation.y = xe ? 0 : Math.sin(O * 8e-4 + n) * 0.04, r || m.forEach((ce, ke) => {
        ce.rotation.x = xe || !$e ? 0 : Math.sin(O * 0.012 + ke * Math.PI) * 0.45;
      });
    },
    dispose() {
      C(), L(), N(), z.forEach((T) => T()), o.removeFromParent(), c.removeFromParent(), k.removeFromParent();
    }
  };
}
function di(e, t, s, a) {
  const n = e.group(t), i = wt[s.id], r = Object.values(Ze).find((h) => h.scene === s.id);
  let d = a, o = !1;
  const c = (i?.waves[0] ?? []).map((h) => {
    const u = Qa(e, n, h.kind, ra[0]);
    u.bar.removeFromParent();
    const y = s.anchors[h.anchor], f = r?.sentryExits[h.anchor], g = f ? s.anchors[f] : y, v = a.has(i.complete) ? g : y;
    return u.root.position.set(v.x, 0, v.y), {
      ...u,
      home: y,
      aside: g,
      dispose: e.bake(u.root)
    };
  }), l = () => {
    n.visible = !o && !!i && (!!r || !d.has(i.complete));
  };
  return l(), {
    setFacts(h) {
      d = h, l();
    },
    setEncounterActive(h) {
      o = h, l();
    },
    animate(h) {
      if (!n.visible) return !1;
      let u = !1;
      for (const y of c) {
        const f = d.has(i.complete) ? y.aside : y.home, g = f.x - y.root.position.x, v = f.y - y.root.position.z, b = Math.hypot(g, v);
        if (b < 1e-3) continue;
        const m = h ? 1 : Math.min(1, 0.36 / b);
        y.root.position.x += g * m, y.root.position.z += v * m, y.root.rotation.y = b > 0.4 ? Math.atan2(g, v) : 0, u = !0;
      }
      return u;
    },
    dispose() {
      c.forEach((h) => h.dispose()), n.removeFromParent();
    }
  };
}
function hi(e, t, s, a) {
  const n = Ze[s], i = Qa(e, t, n.kind, ra[0]);
  i.bar.removeFromParent();
  const r = e.bake(i.root), d = { ...ja(s, a) };
  i.root.position.set(d.x, 0, d.y);
  let o = a;
  return {
    id: s,
    root: i.root,
    position: d,
    setFacts(c) {
      o = c;
    },
    update(c, l) {
      const h = ja(s, o), u = c.x - h.x, y = c.y - h.y, f = Math.hypot(u, y), g = f <= n.approachRadius, v = g && !o.has(n.complete) ? 1 : 0, b = h.x + (f ? u / f * v : 0), m = h.y + (f ? y / f * v : 0), x = d.x + d.y + i.root.rotation.y;
      d.x += l ? b - d.x : (b - d.x) * 0.22, d.y += l ? m - d.y : (m - d.y) * 0.22, Math.abs(b - d.x) + Math.abs(m - d.y) < 0.01 && (d.x = b, d.y = m);
      const w = g ? Math.atan2(u, y) : 0, k = Math.atan2(Math.sin(w - i.root.rotation.y), Math.cos(w - i.root.rotation.y));
      return i.root.rotation.y += l || Math.abs(k) < 5e-3 ? k : k * 0.2, i.root.position.set(d.x, 0, d.y), x !== d.x + d.y + i.root.rotation.y;
    },
    dispose() {
      r(), i.root.removeFromParent();
    }
  };
}
function ui(e, t, s, a) {
  const n = li(e, t, s.landscape), i = e.group(t), r = e.group(t), d = di(e, t, s, a), o = [], c = ia.filter((f) => Ze[f].scene === s.id).map((f) => hi(e, r, f, a));
  let l = -1, h = null, u = null;
  function y(f) {
    const g = [...f].sort().join("/");
    if (g === u) return;
    u = g, c.forEach((b) => b.setFacts(f)), h?.(), d.setFacts(f);
    for (const b of na(s, f)) {
      const m = b.position;
      if (b.kind === "exit") {
        for (const x of [-1, 1]) ts(e, i, m.x + x * 1.7, m.y, 1.5);
        e.mesh(i, "box", M.brass, [
          3,
          0.025,
          0.35
        ], [
          m.x,
          0.12,
          m.y
        ]).castShadow = !1;
      } else if (b.target.kind === "inspect" && b.target.passage === "warning")
        e.mesh(i, "box", M.timber, [
          0.12,
          1.8,
          0.12
        ], [
          m.x,
          0.9,
          m.y
        ]), e.mesh(i, "box", M.wood, [
          1.4,
          0.7,
          0.13
        ], [
          m.x,
          1.6,
          m.y
        ]), e.mesh(i, "box", M.light, [
          0.7,
          0.4,
          0.025
        ], [
          m.x,
          1.6,
          m.y + 0.08
        ]);
      else if (b.target.kind === "inspect" && b.target.passage === "orders") {
        e.mesh(i, "box", M.slate, [
          2.2,
          0.8,
          1.2
        ], [
          m.x,
          0.4,
          m.y - 0.8
        ]);
        const x = e.mesh(i, "box", M.light, [
          1.8,
          0.08,
          0.9
        ], [
          m.x,
          0.85,
          m.y - 0.8
        ]);
        x.rotation.x = 0.2;
        for (let w = -1; w <= 1; w++) e.mesh(i, "cylinder", M.brass, [
          0.12,
          0.12,
          0.12
        ], [
          m.x + w * 0.45,
          0.95,
          m.y - 0.55
        ]);
      }
    }
    if (s.id === "camp") {
      const b = s.landscape.features.find((m) => m.kind === "clinic").footprint;
      if (f.has("clinic_helped")) {
        const m = s.landscape.features.find((x) => x.kind === "bench").footprint;
        for (const x of [-1, 1])
          e.mesh(i, "cylinder", "#ede3c9", [
            0.16,
            0.22,
            0.16
          ], [
            m.x,
            0.91,
            m.z + x * 0.65
          ]), e.mesh(i, "cylinder", "#99704c", [
            0.125,
            0.012,
            0.125
          ], [
            m.x,
            1.024,
            m.z + x * 0.65
          ]);
      }
      if (f.has("receiving_arranged")) for (const m of [-1, 1]) {
        const x = b.x + m * 2.4, w = b.z + b.depth / 2 - 0.2, k = e.group(i, [
          x,
          0.2,
          w
        ]);
        k.rotation.x = -0.16;
        for (const z of [-1, 1]) e.mesh(k, "cylinder", M.timber, [
          0.055,
          2.9,
          0.055
        ], [
          z * 0.42,
          1.4,
          0
        ]);
        e.mesh(k, "box", f.has("captives_arrived") ? "#bdccc0" : "#eee7d1", [
          0.76,
          2.2,
          0.09
        ], [
          0,
          1.4,
          0.05
        ]);
        for (const z of [0.7, 2.1]) e.mesh(k, "box", M.timber, [
          0.94,
          0.055,
          0.08
        ], [
          0,
          z,
          0.12
        ]);
      }
      if (f.has("warden_defeated")) {
        const m = s.landscape.features.find((x) => x.kind === "wagon").footprint;
        for (let x = 0; x < 4; x++) {
          const w = e.group(i, [
            m.x + (x % 2 ? 0.65 : -0.65),
            1.4,
            m.z + (x < 2 ? -0.9 : 0.6)
          ]);
          e.mesh(w, "box", M.wood, [
            1.1,
            0.75,
            1.2
          ], [
            0,
            0.375,
            0
          ]);
          for (const k of [-1, 1]) e.mesh(w, "box", M.brass, [
            0.08,
            0.78,
            1.22
          ], [
            k * 0.35,
            0.38,
            0
          ]);
          e.mesh(w, "box", M.light, [
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
    for (const b of s.objects) {
      if (b.kind !== "switch") continue;
      const m = s.anchors[b.anchor], x = f.has(b.fact), w = e.group(i, [
        m.x,
        0,
        m.y
      ]);
      e.mesh(w, "box", M.slate, [
        0.7,
        0.65,
        0.7
      ], [
        0,
        0.325,
        0
      ]), e.mesh(w, "box", M.brass, [
        0.5,
        0.1,
        0.5
      ], [
        0,
        0.7,
        0
      ]);
      const k = e.group(w, [
        0,
        0.75,
        0
      ]);
      k.rotation.z = x ? 0.65 : -0.65, e.mesh(k, "cylinder", M.brass, [
        0.065,
        0.7,
        0.065
      ], [
        0,
        0.35,
        0
      ]), e.mesh(k, "cylinder", M.timber, [
        0.09,
        0.44,
        0.09
      ], [
        0,
        0.73,
        0
      ]).rotation.z = Math.PI / 2;
    }
    const v = ft(s, f);
    for (const b of s.landscape.gates) {
      const m = b.footprint, x = m.width > m.depth, w = Math.max(m.width, m.depth), k = e.group(i, [
        m.x,
        0,
        m.z
      ]);
      x || (k.rotation.y = Math.PI / 2);
      for (const z of [-1, 1]) e.mesh(k, "box", M.stone, [
        0.35,
        3.2,
        0.7
      ], [
        z * w / 2,
        1.6,
        0
      ]);
      if (e.mesh(k, "box", M.light, [
        w + 0.5,
        0.35,
        0.9
      ], [
        0,
        3.25,
        0
      ]), v.closedGates.has(b.id)) {
        for (let z = -w / 2 + 0.2; z < w / 2; z += 0.4) e.mesh(k, "box", M.shadow, [
          0.065,
          3,
          0.1
        ], [
          z,
          1.5,
          0
        ]);
        for (const z of [0.4, 2.5]) e.mesh(k, "box", M.brass, [
          w,
          0.12,
          0.15
        ], [
          0,
          z,
          0
        ]);
      } else e.mesh(k, "box", M.shadow, [
        w,
        0.42,
        0.16
      ], [
        0,
        3,
        0
      ]);
    }
    for (const b of s.landscape.features) {
      if (b.kind !== "beacon" || f.has("alarm_silenced")) continue;
      const m = b.footprint, x = e.mesh(i, "cylinder", M.timber, [
        0.045,
        4.8,
        0.045
      ], [
        m.x + 3.3,
        2.7,
        m.z + 2.5
      ]);
      x.rotation.z = -0.32;
      for (let w = 0; w < 5; w++) e.mesh(i, "rock", w % 2 ? M.ember : M.cloth, [
        0.55,
        1.2 + w % 3 * 0.3,
        0.55
      ], [
        m.x + Math.sin(w * 2) * 0.7,
        5.4 + w % 3 * 0.3,
        m.z + Math.cos(w * 2) * 0.7
      ], !0);
    }
    h = e.bake(i);
  }
  return y(a), {
    setFacts: y,
    people: o,
    parleyPeople: c,
    setPeople(f, g) {
      let v = !1;
      for (const b of qe) {
        const m = f[b], x = jt[b].home, w = be[x.scene].anchors[x.anchor], k = m.mode === "idle" && (m.scene === "cells" || m.scene === x.scene && Math.hypot(m.position.x - w.x, m.position.y - w.y) < 1);
        let z = o.find((C) => C.id === b);
        z && (m.scene !== s.id || z.seated !== k) && (z.dispose(), o.splice(o.indexOf(z), 1), z = void 0, v = !0), m.scene === s.id && (z || (z = ci(e, r, b, m.position.x, m.position.y, new Set(u?.split("/")), k), o.push(z), v = !0), v = z.locate(m, g) || v);
      }
      return v;
    },
    setEncounterActive(f) {
      d.setEncounterActive(f), c.forEach((g) => {
        g.root.visible = !f;
      });
    },
    update: n.update,
    animate(f, g, v) {
      const b = Math.floor(g / 80);
      if (b === l) return !1;
      l = b;
      let m = d.animate(v);
      for (const x of c) m = x.update(f, v) || m;
      for (const x of o) Math.hypot(x.position.x - f.x, x.position.y - f.y) < 22 ? (x.update(f, g, v), m = !v) : x.ring.visible = !1;
      return m;
    },
    dispose() {
      o.splice(0).forEach((f) => f.dispose()), c.forEach((f) => f.dispose()), r.removeFromParent(), h?.(), d.dispose(), n.dispose();
    }
  };
}
function fi(e, t, s = {}) {
  const a = new An({
    antialias: !0,
    alpha: !1,
    powerPreference: s.world ? "default" : "high-performance"
  });
  a.outputColorSpace = $n, a.toneMapping = 7, a.toneMappingExposure = 1, a.setPixelRatio(Math.min(devicePixelRatio || 1, s.world ? 1.4 : 1.8)), a.shadowMap.enabled = !0, a.shadowMap.type = 2, e.append(a.domElement);
  const n = document.createElement("div");
  n.className = "exp-world-labels", n.setAttribute("aria-hidden", "true"), e.append(n);
  const i = new En(), r = new Cn(-10, 10, 10, -10, 0.1, 180), d = Oa();
  i.add(new zn("#effbff", "#74918a", 2));
  const o = new Ia("#fff4e5", 1.9);
  o.position.set(-12, 25, 13), o.castShadow = !0;
  const c = s.world ? 1024 : 1536;
  o.shadow.mapSize.set(c, c), Object.assign(o.shadow.camera, {
    left: -23,
    right: 23,
    top: 24,
    bottom: -24,
    far: 80
  }), o.shadow.bias = -4e-4, o.shadow.normalBias = 0.035, o.shadow.radius = 3, i.add(o);
  const l = new Ia("#c3edff", 1.1);
  l.position.set(7, 8, -15), i.add(l);
  const h = new St(), u = new St(), y = new St();
  i.add(h, u, y);
  const f = es(d, u), g = Ko(d, y), v = Yo(d, y), b = Vo(n), m = /* @__PURE__ */ new Map(), x = /* @__PURE__ */ new Map(), w = [], k = matchMedia("(prefers-reduced-motion: reduce)"), z = new _t(), C = new _t();
  let L = null, N = "", A = "", R = "", q = null, G = null, B = NaN, T = NaN, O = NaN, xe = null, $e = 0, je = 0, ge = 1, de = 1, ce = !0, ke = !1, Te = !1, ze = 0, Mt = -1, nt = 0, Ve = !1;
  function Rt() {
    const re = e.getBoundingClientRect();
    ge = Math.max(1, re.width), de = Math.max(1, re.height), a.setSize(ge, de, !1), ce = !0, Ve = !1, s.invalidate?.();
  }
  const Ot = new ResizeObserver(Rt);
  Ot.observe(e), Rt();
  function X(re) {
    re.preventDefault(), Te = !0, t();
  }
  a.domElement.addEventListener("webglcontextlost", X);
  function D(re, pt, mt, st, ot = !1) {
    if (Math.abs(re) < 1) return;
    const H = document.createElement("span");
    H.className = ot ? "exp-damage is-player" : re < 0 ? "exp-damage is-heal" : "exp-damage", H.textContent = `${re < 0 ? "+" : ""}${Math.ceil(Math.abs(re))}`, n.append(H), w.push({
      element: H,
      position: new _t(pt, 2, mt),
      born: st
    });
  }
  function Z() {
    for (const re of m.values())
      u.remove(re.actor.root), re.marker.remove();
    m.clear(), w.splice(0).forEach((re) => re.element.remove());
  }
  return {
    draw(re, pt, mt, st = "battle", ot = 0, H) {
      if (ke || Te) return;
      const is = performance.now(), Q = st === "battle" ? re : null, rs = Q?.tick ?? (k.matches ? 0 : ot * 0.025), Lt = (Q?.tick ?? -1) !== Mt, la = `${pt.weapon}/${pt.outfit}/${mt}`;
      if (!H && !ce && st === A && la === R && Q === q && (!Lt && Q || !Q && (st === "between" || k.matches || ot - ze < 40))) return;
      ze = ot;
      const ca = ra[mt], Ua = H ? H.definition.id : `${mt}:${Q?.boss ?? !1}:${!!Q}`;
      if (Ua !== N) {
        if (x.forEach((U) => U.remove()), x.clear(), L?.(), H) {
          const U = Oa();
          G = ui(U, h, H.definition, H.facts);
          const K = G;
          L = () => {
            K.dispose(), U.dispose();
          };
        } else
          G = null, L = Ho(d, h, mt, Q);
        Ve = !1, N = Ua, i.background = new qa(ca.sky), i.fog = new Es(ca.haze, 42, 95);
      } else H && xe !== H.facts && G?.setFacts(H.facts);
      (!!Q != !!q || Q && q && Q.tick < Mt) && (Z(), nt = Q?.player.hp ?? 0);
      const da = !H && st !== "battle", it = ge < 600, Ya = it || de < 400, ha = ge / de, Nt = H ? it ? Ue.mobileWidth : Math.max(Ue.minimumWidth, ha * (de < 400 ? Ue.shortSpan : Ue.tallSpan)) : da ? it ? 13 : 28 : it ? 18.5 : Math.max(27, ha * (de < 400 ? 14 : 23)), Ga = Math.max(0, W.arena - Nt / 2 + 0.5), ua = H ? H.location.position.x : Q ? Ya ? Q.player.x * 0.62 : Math.max(-Ga, Math.min(Ga, Q.player.x * 0.62)) : it ? 0 : 5.5, fa = H ? H.location.position.y - Ue.lead : Q ? Q.player.y * (Ya ? 0.62 : 0.2) - 0.4 : it ? -4.2 : -11.8;
      H && Math.hypot(B - H.location.position.x, T - H.location.position.y) > 8 && (Ve = !1);
      const ls = Math.abs(z.x - ua) + Math.abs(z.z - fa) < 0.015, cs = H && G?.setPeople(H.people, ot), ds = H && G?.animate(H.location.position, ot, k.matches);
      if (H && !ce && Ve && ls && la === R && Q === q && !Lt && B === H.location.position.x && T === H.location.position.y && O === H.location.facing && xe === H.facts && !ds && !cs) return;
      !Ve || k.matches ? (z.set(ua, 0, fa), Ve = !0) : (z.x += (ua - z.x) * 0.14, z.z += (fa - z.z) * 0.14), r.left = -Nt / 2, r.right = Nt / 2, r.top = Nt / ha / 2, r.bottom = -r.top;
      const pa = da ? 0 : 1 * Math.PI / 4, Ka = H ? Ue.distance : 25;
      r.position.set(z.x + Math.sin(pa) * Ka, H ? Ue.height : 28, z.z + Math.cos(pa) * Ka), r.lookAt(z.x, 0, z.z), r.updateProjectionMatrix(), r.updateMatrixWorld(), H && (G?.setEncounterActive(!!Q), G?.update(H.location.position, pa)), x.forEach((U) => {
        U.hidden = !0;
      });
      const hs = new Set(H && !Q ? [...Vn(H.definition, H.location.position, H.facts, H.people), ...Ha(H.definition.id, H.location.position, H.facts)].map((U) => U.target.id) : []);
      for (const U of [...G?.people ?? [], ...G?.parleyPeople ?? []]) {
        if (Q || !H || Math.hypot(U.position.x - H.location.position.x, U.position.y - H.location.position.y) > 10) continue;
        let K = x.get(U.id);
        K || (K = document.createElement("span"), K.className = "exp-person-name", K.textContent = He(U.id), n.append(K), x.set(U.id, K)), K.textContent = hs.has(U.id) ? `${He(U.id)} · ${se.actions.talk}` : He(U.id), C.set(U.position.x, 2.9 + U.root.position.y, U.position.y).project(r);
        const Ce = (C.x * 0.5 + 0.5) * ge, We = (-C.y * 0.5 + 0.5) * de;
        K.hidden = Ce < 30 || Ce > ge - 30 || We < 20 || We > de - 20, K.style.transform = `translate(${Ce}px,${We}px) translate(-50%,-100%)`;
      }
      s.world && (o.position.set(z.x - 12, 25, z.z + 13), o.target.position.set(z.x, 0, z.z), o.target.updateMatrixWorld());
      const us = H ? {
        ...H.location.position,
        facing: H.location.facing,
        dashTime: 0,
        swing: 0,
        shield: 0,
        guard: 0,
        resonance: 0
      } : null;
      f.update(Q?.player ?? us, pt.weapon, pt.outfit, rs, k.matches, da, !!Q?.effects.some((U) => U.kind === "resonance"));
      for (const U of Q?.enemies ?? []) {
        let K = m.get(U.id);
        if (!K) {
          const ga = document.createElement("i");
          ga.className = ye(U.kind) ? "exp-threat is-boss" : "exp-threat", n.append(ga), K = {
            actor: Qa(d, u, U.kind, ca),
            hp: U.hp,
            death: null,
            marker: ga
          }, m.set(U.id, K);
        }
        K.hp > U.hp && Lt && D(K.hp - U.hp, U.x, U.y, Q.tick), K.hp = U.hp, K.actor.update(U, Q.tick, k.matches), K.actor.bar.quaternion.copy(r.quaternion), C.set(U.x, 1.2, U.y).project(r);
        const Ce = (C.x * 0.5 + 0.5) * ge, We = (-C.y * 0.5 + 0.5) * de, Xa = Math.min(18, ge / 2), Ja = Math.min(it ? 132 : 95, de * 0.3), fs = Math.max(Ja, de - Math.min(130, de * 0.3)), ma = Math.max(Xa, Math.min(ge - Xa, Ce)), ya = Math.max(Ja, Math.min(fs, We));
        K.marker.hidden = Math.abs(Ce - ma) + Math.abs(We - ya) < 10, K.marker.style.transform = `translate(${ma}px,${ya}px) rotate(${Math.atan2(We - ya, Ce - ma) + Math.PI / 2}rad)`;
      }
      for (const [U, K] of m) {
        if (Q?.enemies.some((We) => We.id === U)) continue;
        K.death === null && (K.death = Q?.tick ?? 0, Q && K.hp > 0 && D(K.hp, K.actor.root.position.x, K.actor.root.position.z, Q.tick));
        const Ce = ((Q?.tick ?? 0) - K.death) / 12;
        K.actor.bar.visible = !1, K.marker.hidden = !0, K.actor.root.scale.setScalar(Math.max(0, 1 - Ce)), (Ce >= 1 || !Q || k.matches) && (u.remove(K.actor.root), K.marker.remove(), m.delete(U));
      }
      Q && Lt && (nt !== Q.player.hp && D(nt - Q.player.hp, Q.player.x, Q.player.y, Q.tick, nt > Q.player.hp), nt = Q.player.hp), g.update(Q, k.matches);
      const Va = Q?.effects.filter((U) => U.kind === "ward-hit").at(-1);
      v.update(Q?.player ?? null, Va ? Math.max(0, (Va.life - 5) / 10) : 0), b.update(Q, r, ge, de);
      for (let U = w.length - 1; U >= 0; U--) {
        const K = w[U], Ce = ((Q?.tick ?? 0) - K.born) / 27;
        if (Ce >= 1 || !Q) {
          K.element.remove(), w.splice(U, 1);
          continue;
        }
        C.copy(K.position), C.y += k.matches ? 0 : Ce * 0.9, C.project(r), K.element.style.transform = `translate(${(C.x * 0.5 + 0.5) * ge}px,${(-C.y * 0.5 + 0.5) * de}px)`, K.element.style.opacity = String(Math.min(1, (1 - Ce) * 3));
      }
      a.render(i, r), $e++, je += performance.now() - is, ce = !1, A = st, R = la, q = Q, Mt = Q?.tick ?? -1, H && (B = H.location.position.x, T = H.location.position.y, O = H.location.facing, xe = H.facts);
    },
    invalidate() {
      ce = !0, s.invalidate?.();
    },
    stats() {
      return {
        draws: $e,
        submitMs: je,
        calls: a.info.render.calls,
        triangles: a.info.render.triangles,
        geometries: a.info.memory.geometries,
        textures: a.info.memory.textures
      };
    },
    dispose() {
      ke = !0, Ot.disconnect(), a.domElement.removeEventListener("webglcontextlost", X), Z(), b.dispose(), v.dispose(), L?.(), o.shadow.dispose(), d.dispose(), i.clear(), a.dispose(), a.forceContextLoss(), a.domElement.remove(), n.remove();
    }
  };
}
function Na(e) {
  if (e.kind === "exit") return `${se.actions.travel} ${se.scenes[e.target.to]}`;
  const t = e.target;
  switch (t.kind) {
    case "person":
      return `${se.actions.talk} · ${se.people[t.person]}`;
    case "enemy":
      return `${se.actions.talk} · ${He(t.enemy)}`;
    case "inspect":
      return se.passages[t.passage].title;
    case "rest":
      return se.actions.rest;
    case "switch":
      return se.switches[t.fact];
  }
}
var pi = ["aria-label"], mi = { class: "journey-heading" }, yi = {
  key: 0,
  class: "journey-controls"
}, gi = ["aria-label"], vi = {
  key: 0,
  class: "journey-interaction"
}, bi = {
  key: 1,
  class: "journey-interaction journey-battle-actions"
}, xi = {
  key: 0,
  class: "journey-resource"
}, wi = [
  "max",
  "value",
  "aria-label"
], Mi = ["disabled"], ki = ["disabled"], _i = {
  key: 1,
  class: "journey-overlay"
}, Si = /* @__PURE__ */ xt({
  __name: "ExplorationField",
  props: {
    world: {},
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
    const a = e, n = s, i = J(null), r = J(null), d = J({
      x: 0,
      y: 0
    }), o = J(null), c = oe(() => a.battle ? [] : [
      ...Ha(a.world.definition.id, a.world.location.position, a.world.facts),
      ...Mo(a.world.definition, a.world.location, a.world.facts),
      ...Vn(a.world.definition, a.world.location.position, a.world.facts, a.world.people)
    ]), l = oe(() => c.value.find((B) => B.target.id === o.value) ?? null), h = oe(() => a.weapon === "grimoire" ? Y.contractPower : Y.resource);
    let u = null, y = null, f = 0, g = 0, v = 0, b = !1, m = !0;
    const x = Bo((B, T) => {
      d.value = {
        x: B * 26,
        y: T * 26
      }, y?.stick(B, T);
    }, () => i.value?.focus({ preventScroll: !0 }));
    function w() {
      x.clear(), y?.clear(), v = 0;
    }
    function k() {
      w(), n("pause");
    }
    function z() {
      document.hidden ? (cancelAnimationFrame(f), f = 0, k()) : (u?.invalidate(), C());
    }
    function C() {
      !f && !b && m && (g = 0, f = requestAnimationFrame(G));
    }
    function L() {
      !a.paused && l.value && (w(), n("interact", l.value.target.id));
    }
    function N(B) {
      (!B || B.detail === 0) && y?.dash();
    }
    function A(B) {
      (!B || B.detail === 0) && y?.skill();
    }
    function R(B, T) {
      B.button === 0 && y?.[T]();
    }
    function q() {
      const B = c.value.findIndex((T) => T.target.id === o.value);
      o.value = c.value[(B + 1) % c.value.length]?.target.id ?? null;
    }
    function G(B) {
      if (f = 0, b || !m) return;
      !a.paused && !document.hidden && (f = requestAnimationFrame(G));
      const T = g ? Math.min(100, B - g) : 0;
      if (g = B, !a.paused && !document.hidden)
        for (v += T; v >= 1e3 / W.hz && !a.paused; ) {
          v -= 1e3 / W.hz;
          const O = y.frame();
          if (O.skill && !a.battle) {
            L();
            break;
          }
          n("input", O);
        }
      else v = 0;
      if (!document.hidden) try {
        u?.draw(a.battle ?? null, a, 0, "battle", B, a.world);
      } catch (O) {
        cancelAnimationFrame(f), f = 0, w(), n("error", O);
      }
    }
    return Se(c, (B) => {
      B.some((T) => T.target.id === o.value) || (o.value = B[0]?.target.id ?? null);
    }, { immediate: !0 }), Se(() => a.world.definition.id, () => {
      w(), o.value = c.value[0]?.target.id ?? null, i.value?.focus({ preventScroll: !0 });
    }), Se(() => a.paused, (B) => {
      w(), C(), B || i.value?.focus({ preventScroll: !0 });
    }), Se(() => [
      a.world.definition,
      a.world.facts,
      a.world.location.position.x,
      a.world.location.position.y,
      a.weapon,
      a.outfit
    ], C), ea(() => {
      try {
        u = fi(r.value, () => {
          k(), n("error", /* @__PURE__ */ new Error("expedition_webgl_context_lost"));
        }, {
          world: !0,
          invalidate: C
        });
      } catch (B) {
        n("error", B);
        return;
      }
      y = Do(i.value, k, () => {
      }), document.addEventListener("visibilitychange", z), C(), i.value?.focus({ preventScroll: !0 });
    }), kn(() => {
      m = !1, cancelAnimationFrame(f), f = 0, k();
    }), _n(() => {
      m = !0, C();
    }), Zt(() => {
      b = !0, cancelAnimationFrame(f), w(), y?.dispose(), document.removeEventListener("visibilitychange", z), u?.dispose();
    }), t({
      stats: () => u?.stats(),
      focus: () => i.value?.focus({ preventScroll: !0 })
    }), (B, T) => (E(), $("section", {
      ref_key: "root",
      ref: i,
      class: "journey-field",
      tabindex: "0",
      "aria-label": e.battle ? p(Y).controls : p(se).actions.controls
    }, [
      S("div", {
        ref_key: "canvas",
        ref: r,
        class: "journey-canvas"
      }, null, 512),
      S("header", mi, [S("h1", null, P(p(se).scenes[e.world.definition.id]), 1), en(B.$slots, "status", {}, void 0, !0)]),
      e.paused ? V("", !0) : (E(), $("div", yi, [
        S("div", {
          class: "journey-stick",
          role: "group",
          "aria-label": p(se).actions.move,
          onPointerdown: T[0] || (T[0] = rt((...O) => p(x).down && p(x).down(...O), ["prevent"])),
          onPointermove: T[1] || (T[1] = rt((...O) => p(x).move && p(x).move(...O), ["prevent"])),
          onPointerup: T[2] || (T[2] = (...O) => p(x).release && p(x).release(...O)),
          onPointercancel: T[3] || (T[3] = (...O) => p(x).release && p(x).release(...O)),
          onLostpointercapture: T[4] || (T[4] = (...O) => p(x).release && p(x).release(...O)),
          onContextmenu: T[5] || (T[5] = rt(() => {
          }, ["prevent"]))
        }, [S("span", { style: Pa({ transform: `translate(${d.value.x}px, ${d.value.y}px)` }) }, null, 4)], 40, gi),
        l.value ? (E(), $("div", vi, [S("button", {
          type: "button",
          class: "journey-act",
          onClick: L
        }, [T[9] || (T[9] = S("kbd", null, "E", -1)), Le(P(p(Na)(l.value)), 1)]), c.value.length > 1 ? (E(), $("button", {
          key: 0,
          type: "button",
          class: "journey-switch",
          onClick: q
        }, P(p(se).actions.next), 1)) : V("", !0)])) : V("", !0),
        e.battle ? (E(), $("div", bi, [
          [
            "blade",
            "staff",
            "grimoire"
          ].includes(e.weapon) ? (E(), $("div", xi, [
            S("span", null, P(e.battle.player.resonance > 0 ? p(Y).resonanceActive : h.value), 1),
            S("meter", {
              min: "0",
              max: p(Be).maxPower,
              value: e.battle.player.resource,
              "aria-label": h.value
            }, null, 8, wi),
            S("small", null, P(e.battle.player.resonance > 0 ? p(Y).secondsLeft(e.battle.player.resonance) : Math.floor(e.battle.player.resource)), 1)
          ])) : V("", !0),
          S("button", {
            class: "journey-act",
            type: "button",
            disabled: e.battle.player.dash > 0,
            onPointerdown: T[6] || (T[6] = rt((O) => R(O, "dash"), ["prevent"])),
            onClick: N
          }, [
            S("kbd", null, P(p(Y).dashKey), 1),
            Le(P(p(Y).dash), 1),
            S("small", null, P(e.battle.player.dash > 0 ? p(Y).secondsLeft(e.battle.player.dash) : p(Y).ready), 1)
          ], 40, Mi),
          S("button", {
            class: "journey-act",
            type: "button",
            disabled: e.battle.player.skill > 0,
            onPointerdown: T[7] || (T[7] = rt((O) => R(O, "skill"), ["prevent"])),
            onClick: A
          }, [
            S("kbd", null, P(p(Y).skillKey), 1),
            Le(P(p(gt)[e.weapon].action), 1),
            S("small", null, P(e.battle.player.skill > 0 ? p(Y).secondsLeft(e.battle.player.skill) : p(Y).ready), 1)
          ], 40, ki)
        ])) : V("", !0)
      ])),
      e.paused ? (E(), $("div", _i, [en(B.$slots, "overlay", {}, () => [S("button", {
        class: "journey-act",
        type: "button",
        onClick: T[8] || (T[8] = (O) => n("resume"))
      }, P(p(se).actions.resume), 1)], !0)])) : V("", !0)
    ], 8, pi));
  }
}), Pi = /* @__PURE__ */ Fa(Si, [["__scopeId", "data-v-f0221a1b"]]);
function Ii(e) {
  const t = new Set(e.location.visited), s = new Set(e.facts), a = /* @__PURE__ */ new Map();
  for (const n of e.location.visited) for (const i of na(be[n], s)) {
    if (i.kind !== "exit") continue;
    const r = i.target.to, d = [n, r].sort().join("/");
    t.add(r), a.set(d, {
      id: d,
      from: n,
      to: r
    });
  }
  return {
    scenes: [...t],
    links: [...a.values()]
  };
}
function zi(e, t) {
  const a = [], n = (i) => ({
    x: Math.max(t.x - t.width / 2 + 3, Math.min(t.x + t.width / 2 - 3, i.x)),
    y: Math.max(t.z - t.depth / 2 + 3, Math.min(t.z + t.depth / 2 - 3, i.y))
  });
  for (const i of e) {
    let r = n(i), d = -1;
    for (let o = 0; o <= 48; o++) {
      const c = Math.ceil(o / 8) * 5.2, l = o * Math.PI / 4, h = n({
        x: i.x + Math.cos(l) * c,
        y: i.y + Math.sin(l) * c
      }), u = Math.min(1 / 0, ...a.map((y) => Math.hypot(y.x - h.x, y.y - h.y)));
      if (u > d && (r = h, d = u), u >= 5.2) break;
    }
    a.push(r);
  }
  return a;
}
var Ci = { class: "ember-map-header" }, Ei = ["aria-pressed"], Ai = ["viewBox", "aria-label"], $i = [
  "x1",
  "y1",
  "x2",
  "y2",
  "stroke-dasharray"
], Ti = ["transform"], Zi = ["fill"], ji = {
  y: "22",
  "text-anchor": "middle"
}, Ri = ["viewBox", "aria-label"], Oi = [
  "x",
  "y",
  "width",
  "height"
], Li = ["points", "stroke-width"], Ni = [
  "x",
  "y",
  "width",
  "height",
  "fill"
], Fi = ["cx", "cy"], qi = [
  "x1",
  "y1",
  "x2",
  "y2"
], Di = [
  "cx",
  "cy",
  "fill"
], Bi = ["x", "y"], Hi = {
  key: 2,
  class: "ember-map-key"
}, Wi = {
  key: 3,
  class: "ember-map-places"
}, Qi = /* @__PURE__ */ xt({
  __name: "CampaignMap",
  props: { campaign: {} },
  emits: ["close"],
  setup(e, { emit: t }) {
    const s = e, a = t, n = J(!1), i = J(null), r = J(!1), d = J(null), o = J({
      width: 400,
      height: 400
    }), c = new ResizeObserver((x) => {
      for (const w of x) {
        const { width: k, height: z } = w.contentRect;
        w.target === i.value ? r.value = k > z * 1.55 : o.value = {
          width: k,
          height: z
        };
      }
    });
    Se(d, (x, w) => {
      w && c.unobserve(w), x && c.observe(x);
    }), ea(() => {
      c.observe(i.value);
    }), Zt(() => c.disconnect());
    const l = {
      camp: [52, 89],
      crossroads: [52, 66],
      gate: [25, 44],
      beacon: [25, 22],
      hall: [52, 10],
      cells: [79, 32],
      waterway: [79, 54],
      roots: [16, 70]
    }, h = oe(() => Ii(s.campaign)), u = oe(() => Object.fromEntries(h.value.scenes.map((x) => {
      const [w, k] = l[x], { width: z, height: C } = o.value;
      return [x, r.value ? [50 + (104 - k) / 104 * (z - 100), 10 + (w - 10) / 80 * (C - 40)] : [45 + w / 104 * (z - 90), 10 + k / 104 * (C - 40)]];
    }))), y = oe(() => h.value.links), f = oe(() => be[s.campaign.location.scene]), g = oe(() => f.value.landscape.bounds), v = oe(() => `${g.value.x - g.value.width / 2 - 5} ${g.value.z - g.value.depth / 2 - 5} ${g.value.width + 10} ${g.value.depth + 10}`), b = oe(() => Kn(s.campaign)), m = oe(() => {
      const x = zi(b.value.map((w) => w.position), g.value);
      return b.value.map((w, k) => ({
        ...w,
        marker: x[k]
      }));
    });
    return (x, w) => (E(), $("div", {
      ref_key: "root",
      ref: i,
      class: Et(["ember-map", {
        "ember-map-wide": r.value,
        "ember-map-local": !n.value
      }])
    }, [
      S("div", Ci, [S("h2", null, P(n.value ? p(j).chapterMap : p(se).scenes[f.value.id]), 1), S("div", null, [S("button", {
        type: "button",
        "aria-pressed": n.value,
        onClick: w[0] || (w[0] = (k) => n.value = !n.value)
      }, P(n.value ? p(j).localMap : p(j).chapterMap), 9, Ei), S("button", {
        type: "button",
        onClick: w[1] || (w[1] = (k) => a("close"))
      }, P(p(j).close), 1)])]),
      n.value ? (E(), $("svg", {
        key: 0,
        ref_key: "routeMap",
        ref: d,
        viewBox: `0 0 ${o.value.width} ${o.value.height}`,
        role: "img",
        "aria-label": p(j).chapterMap,
        class: "ember-route-map"
      }, [(E(!0), $(ne, null, _e(y.value, (k) => (E(), $("line", {
        key: k.id,
        x1: u.value[k.from][0],
        y1: u.value[k.from][1],
        x2: u.value[k.to][0],
        y2: u.value[k.to][1],
        stroke: "#9ab5ae",
        "stroke-width": "1.5",
        "stroke-dasharray": e.campaign.location.visited.includes(k.from) && e.campaign.location.visited.includes(k.to) ? void 0 : "4 4"
      }, null, 8, $i))), 128)), (E(!0), $(ne, null, _e(u.value, (k, z) => (E(), $("g", {
        key: z,
        transform: `translate(${k.join(",")})`
      }, [
        S("circle", {
          r: "6",
          fill: z === f.value.id ? "#bf6242" : e.campaign.location.visited.includes(z) ? "#366678" : "#b6c9c2",
          stroke: "#fffcef",
          "stroke-width": "1.5"
        }, null, 8, Zi),
        S("text", ji, P(e.campaign.location.visited.includes(z) ? p(se).scenes[z] : p(j).unknownArea), 1),
        S("title", null, P(e.campaign.location.visited.includes(z) ? p(se).scenes[z] : p(j).unknownArea), 1)
      ], 8, Ti))), 128))], 8, Ai)) : (E(), $("svg", {
        key: 1,
        viewBox: v.value,
        role: "img",
        "aria-label": p(se).scenes[f.value.id]
      }, [
        S("rect", {
          x: g.value.x - g.value.width / 2,
          y: g.value.z - g.value.depth / 2,
          width: g.value.width,
          height: g.value.depth,
          rx: "2",
          fill: "#d4e5d9"
        }, null, 8, Oi),
        (E(!0), $(ne, null, _e(f.value.landscape.roads, (k, z) => (E(), $("polyline", {
          key: z,
          points: k.points.map((C) => C.join(",")).join(" "),
          fill: "none",
          stroke: "#f8f1d9",
          "stroke-width": k.width,
          "stroke-linejoin": "round"
        }, null, 8, Li))), 128)),
        (E(!0), $(ne, null, _e(f.value.landscape.features, (k) => (E(), $("rect", {
          key: k.id,
          x: k.footprint.x - k.footprint.width / 2,
          y: k.footprint.z - k.footprint.depth / 2,
          width: k.footprint.width,
          height: k.footprint.depth,
          fill: k.kind === "water" ? "#6eb8c6" : k.kind === "tree" || k.kind === "thicket" ? "#80a28a" : "#8a9e9f",
          rx: ".5"
        }, null, 8, Ni))), 128)),
        S("circle", {
          cx: e.campaign.location.position.x,
          cy: e.campaign.location.position.y,
          r: "3.2",
          fill: "none",
          stroke: "#c84f3c",
          "stroke-width": "1"
        }, [S("title", null, P(p(j).here), 1)], 8, Fi),
        (E(!0), $(ne, null, _e(m.value, (k, z) => (E(), $("g", { key: k.target.id }, [
          S("line", {
            x1: k.position.x,
            y1: k.position.y,
            x2: k.marker.x,
            y2: k.marker.y,
            stroke: "#a3642a",
            "stroke-width": ".5"
          }, null, 8, qi),
          S("circle", {
            cx: k.marker.x,
            cy: k.marker.y,
            r: "2.4",
            fill: k.kind === "exit" ? "#356987" : "#a3642a"
          }, null, 8, Di),
          S("text", {
            class: "ember-map-number",
            x: k.marker.x,
            y: k.marker.y + 1.1,
            "text-anchor": "middle"
          }, P(z + 1), 9, Bi),
          S("title", null, P(p(Na)(k)), 1)
        ]))), 128))
      ], 8, Ri)),
      n.value ? (E(), $("p", Hi, P(p(j).mapKey), 1)) : (E(), $("ol", Wi, [(E(!0), $(ne, null, _e(b.value, (k) => (E(), $("li", { key: k.target.id }, P(p(Na)(k)), 1))), 128))]))
    ], 2));
  }
}), Ui = /* @__PURE__ */ Fa(Qi, [["__scopeId", "data-v-9f651a92"]]), wn = {
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
}, Yi = {
  class: "exp-icon",
  viewBox: "0 0 64 64",
  fill: "none",
  "aria-hidden": "true"
}, Gi = ["d"], Ki = ["d"], Vi = /* @__PURE__ */ xt({
  __name: "ExpeditionIcon",
  props: { name: {} },
  setup(e) {
    return (t, s) => (E(), $("svg", Yi, [S("path", {
      d: p(wn)[e.name].body,
      fill: "currentColor",
      "fill-opacity": ".17",
      "fill-rule": "evenodd",
      stroke: "currentColor",
      "stroke-width": "2.2",
      "stroke-linejoin": "round"
    }, null, 8, Gi), S("path", {
      d: p(wn)[e.name].detail,
      stroke: "currentColor",
      "stroke-width": "2.2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, 8, Ki)]));
  }
}), Je = Vi, Xi = { class: "exp-wardrobe" }, Ji = { class: "exp-fitting" }, er = ["aria-label"], tr = {
  key: 0,
  class: "exp-preview-error",
  role: "alert"
}, ar = { class: "exp-preview-tools" }, nr = ["aria-label"], sr = ["disabled"], or = { class: "exp-muted" }, ir = ["disabled"], rr = { key: 1 }, lr = { class: "exp-purchase-confirm" }, cr = ["disabled"], dr = ["disabled"], hr = ["aria-label"], ur = ["aria-pressed", "onClick"], fr = ["src"], pr = /* @__PURE__ */ xt({
  __name: "ExpeditionWardrobe",
  props: {
    data: {},
    balance: {},
    blocked: { type: Boolean },
    weapon: {}
  },
  emits: ["command"],
  setup(e, { emit: t }) {
    const s = e, a = t, n = J(s.data.equippedOutfit), i = J(!1), r = J(0), d = J(!1), o = J(null), c = J({}), l = oe(() => lt[n.value]), h = oe(() => ka(s.data, n.value)), u = oe(() => js.find((C) => Ca[C].awardKey === l.value.achievement)), y = oe(() => Tn.filter((C) => ka(s.data, C) || lt[C].achievement === null || Object.values(wt).some((L) => L.boss && Ca[L.boss].awardKey === lt[C].achievement)));
    let f = null, g = !0, v = 0, b = () => {
    };
    Se([
      n,
      r,
      () => s.weapon
    ], () => {
      g = !0, b(), i.value = !1;
    });
    function m(C) {
      n.value = C;
    }
    function x() {
      v = performance.now() + 1100, g = !0, b();
    }
    function w() {
      i.value = !1, a("command", {
        type: "purchase",
        id: n.value
      });
    }
    function k() {
      g = !0;
      let C;
      try {
        C = new An({
          antialias: !0,
          alpha: !1
        });
      } catch {
        d.value = !0;
        return;
      }
      C.outputColorSpace = $n, C.toneMapping = 7, C.setPixelRatio(Math.min(devicePixelRatio, 1.8));
      const L = new En(), N = Oa(), A = new St(), R = es(N, A);
      L.background = new qa("#d1e0e1"), L.add(A, new zn("#fff6e3", "#627c93", 2.7));
      const q = new Ia("#fff6e0", 3);
      q.position.set(-3, 5, 6), L.add(q);
      const G = new Cn(-2.35, 2.35, 2.35, -2.35, 0.1, 30);
      G.position.set(0, 2.9, 7), G.lookAt(0, 1.7, 0), C.setSize(144, 144, !1);
      try {
        for (const ce of y.value)
          R.update({
            x: 0,
            y: 0,
            facing: Math.PI / 2,
            dashTime: 0,
            swing: 0,
            shield: 0,
            guard: 0,
            resonance: 0
          }, s.weapon, ce, 0, !0, !1), R.root.position.set(0, 0.1, 0), R.root.rotation.y = -0.2, R.root.scale.setScalar(1.35), C.render(L, G), c.value[ce] = C.domElement.toDataURL("image/png");
      } catch {
        d.value = !0, N.dispose(), L.clear(), C.dispose(), C.forceContextLoss();
        return;
      }
      o.value.append(C.domElement);
      let B = 0, T = 1, O = 1;
      const xe = new ResizeObserver(() => {
        const ce = o.value.getBoundingClientRect();
        T = Math.max(1, ce.width), O = Math.max(1, ce.height), C.setSize(T, O, !1), G.left = -2.35 * T / O, G.right = -G.left, G.top = 2.35, G.bottom = -2.35, G.updateProjectionMatrix(), g = !0, b();
      });
      xe.observe(o.value);
      const $e = matchMedia("(prefers-reduced-motion: reduce)");
      function je(ce) {
        ce.preventDefault(), d.value = !0, cancelAnimationFrame(B), B = 0;
      }
      C.domElement.addEventListener("webglcontextlost", je);
      function ge(ce) {
        if (B = 0, d.value || document.hidden || !g && (ce > v || $e.matches)) return;
        const ke = ce < v && !$e.matches, Te = ce * 0.03;
        R.update({
          x: ke ? Math.sin(Te * 0.4) * 0.03 : 0,
          y: 0,
          facing: Math.PI / 2,
          dashTime: 0,
          swing: ke ? 8 - Te % 8 : 0,
          shield: 0,
          guard: 0,
          resonance: 0
        }, s.weapon, n.value, Te, $e.matches, !1), R.root.position.set(0, 0.1, 0), R.root.rotation.y = Number(r.value) * Math.PI / 180, R.root.scale.setScalar(1.35);
        try {
          C.render(L, G), g = !1;
        } catch {
          d.value = !0;
        }
        ke && !d.value && b();
      }
      b = () => {
        !B && !d.value && !document.hidden && (B = requestAnimationFrame(ge));
      };
      function de() {
        document.hidden ? (cancelAnimationFrame(B), B = 0) : (g = !0, b());
      }
      document.addEventListener("visibilitychange", de), b(), f = () => {
        b = () => {
        }, cancelAnimationFrame(B), xe.disconnect(), document.removeEventListener("visibilitychange", de), C.domElement.removeEventListener("webglcontextlost", je), N.dispose(), L.clear(), C.dispose(), C.forceContextLoss(), C.domElement.remove();
      };
    }
    function z() {
      f?.(), f = null, d.value = !1, k();
    }
    return ea(k), Zt(() => f?.()), (C, L) => (E(), $("div", Xi, [S("section", Ji, [
      S("div", {
        ref_key: "host",
        ref: o,
        class: "exp-outfit-preview",
        "aria-label": p(kt)[n.value].name
      }, [d.value ? (E(), $("div", tr, [S("p", null, P(p(Y).presentationError.rendering), 1), S("button", {
        type: "button",
        onClick: z
      }, P(p(j).reload), 1)])) : V("", !0)], 8, er),
      S("div", ar, [S("label", null, [Le(P(p(Y).rotate), 1), Sn(S("input", {
        "onUpdate:modelValue": L[0] || (L[0] = (N) => r.value = N),
        type: "range",
        min: "-180",
        max: "180",
        step: "5",
        "aria-label": p(Y).rotate
      }, null, 8, nr), [[In, r.value]])]), S("button", {
        type: "button",
        disabled: d.value,
        onClick: x
      }, P(p(Y).previewAction), 9, sr)]),
      S("h3", null, P(p(kt)[n.value].name), 1),
      S("p", null, P(p(kt)[n.value].detail), 1),
      S("p", or, P(p(Y).wardrobeNote), 1),
      h.value ? (E(), $("button", {
        key: 0,
        type: "button",
        class: "exp-primary",
        disabled: e.blocked || e.data.equippedOutfit === n.value,
        onClick: L[1] || (L[1] = (N) => a("command", {
          type: "equip",
          id: n.value
        }))
      }, P(e.data.equippedOutfit === n.value ? p(Y).equipped : p(Y).equip), 9, ir)) : u.value ? (E(), $("p", rr, P(p(Y).unlockWeapon(p(Ea)[u.value])), 1)) : i.value ? (E(), $(ne, { key: 2 }, [S("p", null, P(p(Y).buyOutfit(p(kt)[n.value].name, l.value.price)), 1), S("div", lr, [S("button", {
        type: "button",
        class: "exp-primary",
        disabled: e.blocked || e.balance < l.value.price,
        onClick: w
      }, P(p(Y).confirm), 9, cr), S("button", {
        type: "button",
        onClick: L[2] || (L[2] = (N) => i.value = !1)
      }, P(p(Y).cancel), 1)])], 64)) : (E(), $("button", {
        key: 3,
        type: "button",
        class: "exp-primary",
        disabled: e.blocked || e.balance < l.value.price,
        onClick: L[3] || (L[3] = (N) => i.value = !0)
      }, P(e.balance < l.value.price ? p(Y).noCoins : p(Y).purchase) + " · " + P(p(Y).coins(l.value.price)), 9, dr))
    ]), S("div", {
      class: "exp-outfit-rack",
      "aria-label": p(Y).tryOn
    }, [(E(!0), $(ne, null, _e(y.value, (N) => (E(), $("button", {
      key: N,
      type: "button",
      "aria-pressed": n.value === N,
      onClick: (A) => m(N)
    }, [
      c.value[N] ? (E(), $("img", {
        key: 0,
        class: "exp-outfit-swatch",
        src: c.value[N],
        alt: ""
      }, null, 8, fr)) : V("", !0),
      S("strong", null, P(p(kt)[N].name), 1),
      S("small", null, P(e.data.equippedOutfit === N ? p(Y).equipped : p(ka)(e.data, N) ? p(Y).owned : p(lt)[N].price ? p(Y).coins(p(lt)[N].price) : p(Y).achievement), 1)
    ], 8, ur))), 128))], 8, hr)]));
  }
}), mr = pr;
function yr(e, t = 1) {
  const s = [];
  for (const a of e.matchAll(/<!-- stage:(\d+):(\d+) -->\s*([\s\S]*?)<!-- \/stage -->/g)) {
    if (Number(a[1]) !== t) continue;
    const n = Number(a[2]);
    (s[n] || n >= Jt.bands.length) && pe("narrative_unavailable");
    const i = /* @__PURE__ */ new Map();
    for (const d of a[3].matchAll(/<!-- field:([a-z]+) -->\s*([^]*?)(?=<!-- field:|$)/g))
      i.has(d[1]) && pe("narrative_unavailable"), i.set(d[1], d[2].replace(/^[^:\n]+:\s*/, "").trim());
    const r = (d) => {
      const o = i.get(d);
      return o || pe("narrative_unavailable"), o;
    };
    s[n] = {
      name: r("name"),
      relationship: r("relationship"),
      memory: i.get("memory") ?? "",
      shadow: i.get("shadow") ?? "",
      intimacy: r("intimacy"),
      secret: i.get("secret") ?? null
    };
  }
  return Jt.bands.some((a, n) => !s[n]) && pe("narrative_unavailable"), s;
}
function gr(e, t, s) {
  const a = e[Wa(t.affection)];
  return {
    name: a.name,
    relationship: a.relationship,
    shadow: a.shadow,
    intimacy: a.intimacy,
    memory: e.slice(0, t.highestBand + 1).map((n) => n.memory).filter(Boolean),
    secret: a.secret,
    disclosedSecret: s ? e.find((n) => n.secret)?.secret ?? null : null
  };
}
var vr = async (e, t) => {
  const s = await fetch(`/${gs}/modules/xiaobai-os/docs/expedition-cards/${e}.md`, {
    signal: t,
    cache: "no-cache"
  });
  s.ok || pe("narrative_unavailable");
  const a = await s.text();
  return a.trim() || pe("narrative_unavailable"), a;
};
async function br(e, t, s = vr) {
  if (!Fe(e)) {
    const [h, u, y] = await Promise.all([
      "enemy-system-prompt",
      "world",
      Ze[e].card
    ].map((g) => s(g, t))), f = /<!-- opening:([a-z]+\.initial) -->\s*([\s\S]*?)\s*<!-- \/opening -->/.exec(y);
    return (!f || f[1] !== `${e}.initial`) && pe("narrative_unavailable"), {
      system: h,
      world: u,
      character: y.slice(0, f.index).replace(/# 开场\s*$/, "").trim(),
      stages: [],
      opening: {
        initial: f[2],
        returned: null
      }
    };
  }
  const [a, n, i, r, d] = await Promise.all([
    "system-prompt",
    "world",
    e,
    "openings",
    `${e}-stages`
  ].map((h) => s(h, t))), o = new Map([...r.matchAll(/<!-- opening:([a-z]+\.(?:initial|returned)) -->\s*([\s\S]*?)\s*<!-- \/opening -->/g)].map((h) => [h[1], h[2].trim()])), c = o.get(`${e}.initial`), l = o.get(`${e}.returned`) ?? null;
  return (!c || (e === "anian" || e === "kouzi") && !l) && pe("narrative_unavailable"), {
    system: a,
    world: n,
    character: i,
    stages: yr(d),
    opening: {
      initial: c,
      returned: l
    }
  };
}
function os(e) {
  return _o[e];
}
function xr(e, t, s = []) {
  if (!Fe(t)) {
    const r = Ze[t];
    return e.facts.includes(r.complete) || e.pendingParley ? {} : {
      attack: me.attack,
      ...e.facts.includes(r.intel) ? { pass: me.pass } : {}
    };
  }
  const a = Object.fromEntries(Qn(e.facts, t, e.people[t]).map((r) => [r, oa[r].meaning])), n = os(t), i = e.relationships[t].affection;
  if (n && !e.facts.includes(n) && i >= Jt.bands[4] && s[Wa(i)]?.secret && (a.share_secret = me.shareSecret), Io(e, t)) {
    a.follow = me.follow, a.stay = me.stay;
    for (const r of Un(e, t).filter((d) => d.accessible && d.solo)) a[`go:${r.id}`] = me.go(r.name);
  }
  return a;
}
function wr(e, t, s = []) {
  const a = xr(e, t, s), n = Object.keys(a);
  if (!Fe(t)) {
    const i = Ze[t];
    return {
      person: He(t),
      place: se.scenes[i.scene],
      rescued: !1,
      resolved: e.facts.includes(i.complete),
      events: e.knowledge[t].map((r) => ({
        id: r,
        event: Gt[r],
        source: "亲历"
      })),
      companions: Object.entries(e.people).filter(([, r]) => r.mode === "follow" && r.scene === i.scene).map(([r]) => He(r)),
      actions: n,
      actionMeanings: a
    };
  }
  return {
    person: se.people[t],
    place: se.scenes[e.people[t].scene],
    map: Un(e, t),
    rescued: e.knowledge[t].includes("captives_arrived"),
    events: e.knowledge[t].map((i) => ({
      id: i,
      event: Gt[i],
      source: "亲历"
    })),
    affection: e.relationships[t].affection,
    actions: n,
    actionMeanings: a
  };
}
function Mr(e) {
  return e.filter((t) => t.kind !== "receipt").flatMap((t) => t.kind === "interaction" ? [{
    role: "user",
    content: JSON.stringify({
      source: "游戏确认的互动结果",
      player: t.player,
      action: t.action,
      result: t.reply,
      place: se.scenes[t.scene],
      events: t.facts.map((s) => ({
        id: s,
        event: Gt[s]
      }))
    })
  }] : [{
    role: "user",
    content: t.player
  }, {
    role: "assistant",
    content: JSON.stringify({
      reply: t.reply,
      action: t.action
    })
  }]);
}
function kr(e, t) {
  return t ? e.findIndex((s) => s.id === t.throughId) + 1 : 0;
}
function _r(e, t, s, a, n = e.memories[t]) {
  const i = wr(e, t, a.stages), r = Fe(t) ? os(t) : null, d = Fe(t) ? gr(a.stages, e.relationships[t], !!r && e.facts.includes(r)) : null;
  return {
    systemPrompt: [
      a.system,
      a.world,
      a.character
    ].join(`

`),
    messages: [
      {
        role: "user",
        content: JSON.stringify({
          source: "游戏提供的当前处境与本人亲历",
          ...i,
          opening: e.conversations[t].some((o) => o.kind !== "receipt") || !Fe(t) && e.facts.includes(Ze[t].complete) ? null : i.rescued ? a.opening.returned : a.opening.initial,
          stage: d,
          memory: n?.text ?? null
        })
      },
      ...Mr(e.conversations[t].slice(kr(e.conversations[t], n))),
      {
        role: "user",
        content: s
      }
    ]
  };
}
var Mn = Object.freeze({
  trigger: 128e3,
  inputBudget: 158e3,
  recentExchanges: 5,
  outputTokens: 6e3
});
function Sr(e, t, s, a) {
  const n = _r(e, t, s, a), i = ys({ messages: [{
    role: "system",
    content: n.systemPrompt
  }, ...n.messages] }), r = va(n.systemPrompt), d = va(e.memories[t]?.text ?? ""), o = va(JSON.stringify(n.messages.slice(1)));
  return {
    used: i,
    system: r,
    memory: d,
    history: o,
    situation: Math.max(0, i - r - d - o),
    limit: Mn.inputBudget,
    trigger: Mn.trigger
  };
}
var Pr = ["aria-label", "aria-expanded"], Ir = ["aria-label", "aria-expanded"], zr = {
  key: 1,
  class: "ember-meter-popover"
}, Cr = ["aria-label"], Er = { class: "ember-meter-total" }, Ar = { key: 0 }, $r = { class: "ember-meter-total" }, Tr = { key: 2 }, Zr = { role: "status" }, jr = /* @__PURE__ */ xt({
  __name: "ConversationMeters",
  props: {
    campaign: {},
    person: {},
    draft: {}
  },
  setup(e) {
    const t = e, s = Ct(null), a = J(null), n = J(0), i = J("");
    let r = null, d;
    async function o() {
      r?.abort(), r = new AbortController();
      const y = r;
      s.value = null, i.value = "";
      try {
        const f = await br(t.person, y.signal);
        y.signal.aborted || (s.value = f);
      } catch (f) {
        y.signal.aborted || (i.value = ct(f));
      }
    }
    Se(() => t.person, () => {
      a.value = null, n.value = 0, o();
    }, { immediate: !0 });
    const c = oe(() => Fe(t.person) ? t.campaign.relationships[t.person].affection : 0), l = oe(() => s.value?.stages[Wa(c.value)]?.name ?? ""), h = oe(() => s.value ? Sr(t.campaign, t.person, t.draft, s.value) : null);
    Se(c, (y, f) => {
      d && clearTimeout(d), n.value = y - f, d = setTimeout(() => {
        n.value = 0;
      }, 2200);
    }), Pn(() => (a.value = null, !0), () => !!a.value), Zt(() => {
      r?.abort(), d && clearTimeout(d);
    });
    const u = (y) => `${(y / 1e3).toFixed(1)}k`;
    return (y, f) => (E(), $("div", {
      class: "ember-meters",
      onKeydown: f[3] || (f[3] = ps(rt((g) => a.value = null, ["stop"]), ["esc"]))
    }, [
      p(Fe)(e.person) ? (E(), $("button", {
        key: 0,
        type: "button",
        class: "ember-meter-button",
        "aria-label": p(me).affection,
        "aria-expanded": a.value === "affection",
        onClick: f[0] || (f[0] = (g) => a.value = a.value === "affection" ? null : "affection")
      }, [S("span", {
        class: "ember-meter-ring ember-affection-ring",
        style: Pa({ "--meter-fill": `${c.value * 3.6}deg` })
      }, [...f[4] || (f[4] = [S("span", null, [S("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, [S("path", { d: "M12 20S3 14.5 3 8.5a4.5 4.5 0 0 1 9-1 4.5 4.5 0 0 1 9 1C21 14.5 12 20 12 20Z" })])], -1)])], 4), n.value ? (E(), $("small", {
        key: 0,
        class: Et(["ember-affection-change", { "is-down": n.value < 0 }]),
        role: "status"
      }, P(n.value > 0 ? "+" : "") + P(n.value), 3)) : V("", !0)], 8, Pr)) : V("", !0),
      S("button", {
        type: "button",
        class: "ember-meter-button",
        "aria-label": p(me).context,
        "aria-expanded": a.value === "context",
        onClick: f[1] || (f[1] = (g) => a.value = a.value === "context" ? null : "context")
      }, [S("span", {
        class: Et(["ember-meter-ring", { "is-warning": h.value && h.value.used >= h.value.trigger }]),
        style: Pa({ "--meter-fill": `${Math.min(1, (h.value?.used ?? 0) / (h.value?.limit ?? 1)) * 360}deg` })
      }, [...f[5] || (f[5] = [S("span", null, null, -1)])], 6)], 8, Ir),
      a.value ? (E(), $("section", zr, [
        S("header", null, [S("strong", null, P(a.value === "affection" ? p(me).affection : p(me).context), 1), S("button", {
          type: "button",
          "aria-label": p(me).close,
          onClick: f[2] || (f[2] = (g) => a.value = null)
        }, "×", 8, Cr)]),
        a.value === "affection" ? (E(), $(ne, { key: 0 }, [S("p", Er, [Le(P(c.value) + " ", 1), f[6] || (f[6] = S("small", null, "/ 100", -1))]), i.value ? V("", !0) : (E(), $("p", Ar, P(l.value || p(me).loading), 1))], 64)) : h.value ? (E(), $(ne, { key: 1 }, [
          S("p", $r, P(u(h.value.used)) + " / " + P(u(h.value.limit)), 1),
          S("dl", null, [(E(!0), $(ne, null, _e(p(me).contextParts, (g, v) => (E(), $(ne, { key: v }, [S("dt", null, P(g), 1), S("dd", null, P(u(h.value[v])), 1)], 64))), 128))]),
          S("p", null, P(p(me).threshold(h.value.trigger - h.value.used)), 1),
          S("small", null, P(p(me).estimate), 1)
        ], 64)) : i.value ? V("", !0) : (E(), $("p", Tr, P(p(me).loading), 1)),
        i.value ? (E(), $(ne, { key: 3 }, [S("p", Zr, P(i.value), 1), S("button", {
          type: "button",
          onClick: o
        }, P(p(me).retry), 1)], 64)) : V("", !0)
      ])) : V("", !0)
    ], 32));
  }
}), Rr = /* @__PURE__ */ Fa(jr, [["__scopeId", "data-v-0150bcb9"]]), Or = { class: "ember-campaign" }, Lr = { class: "ember-health" }, Nr = [
  "max",
  "value",
  "aria-label"
], Fr = { class: "ember-objective" }, qr = { class: "ember-save" }, Dr = ["aria-label"], Br = ["aria-label"], Hr = ["aria-label"], Wr = ["aria-label"], Qr = ["aria-label"], Ur = {
  key: 1,
  class: "ember-boss"
}, Yr = [
  "max",
  "value",
  "aria-label"
], Gr = {
  key: 2,
  class: "ember-alarm"
}, Kr = ["aria-label"], Vr = ["disabled"], Xr = ["disabled"], Jr = {
  key: 4,
  class: "ember-conversation-notice",
  role: "status"
}, el = { key: 0 }, tl = { class: "ember-prose" }, al = {
  key: 5,
  class: "ember-intro"
}, nl = { class: "ember-chapter" }, sl = { class: "ember-opening" }, ol = ["aria-label"], il = ["aria-pressed", "onClick"], rl = { class: "ember-weapon-detail" }, ll = ["disabled"], cl = {
  key: 6,
  class: "ember-curtain"
}, dl = ["aria-label"], hl = {
  key: 0,
  class: "ember-panel-heading"
}, ul = { key: 0 }, fl = { key: 1 }, pl = ["disabled"], ml = ["aria-label"], yl = ["aria-pressed", "onClick"], gl = { class: "ember-weapon-detail" }, vl = ["disabled"], bl = { class: "ember-objective-panel" }, xl = { class: "ember-journal" }, wl = { key: 0 }, Ml = { key: 1 }, kl = { class: "ember-relics" }, _l = { key: 0 }, Sl = ["disabled", "onClick"], Pl = { class: "ember-dialogue-heading" }, Il = {
  key: 0,
  class: "ember-greeting"
}, zl = {
  key: 0,
  class: "ember-player-line"
}, Cl = {
  key: 1,
  class: "ember-dialogue-issue"
}, El = { key: 2 }, Al = { class: "ember-prose" }, $l = {
  key: 1,
  class: "ember-dialogue-issue",
  role: "status"
}, Tl = { key: 0 }, Zl = { class: "ember-prose" }, jl = { key: 2 }, Rl = {
  key: 0,
  class: "ember-choices"
}, Ol = [
  "data-choice",
  "disabled",
  "onClick"
], Ll = ["disabled"], Nl = [
  "maxlength",
  "aria-label",
  "placeholder",
  "disabled"
], Fl = ["disabled"], ql = {
  key: 3,
  class: "ember-ai-note"
}, Dl = { class: "ember-prose" }, Bl = { class: "ember-prose" }, Hl = { class: "ember-prose" }, Wl = { class: "ember-continued" }, Ql = { class: "ember-relics" }, Ul = ["disabled", "onClick"], Yl = ["disabled"], Gl = { class: "ember-prose" }, Kl = ["disabled"], Vl = ["disabled"], Xl = ["disabled"], Jl = { class: "ember-pause-actions" }, ec = ["aria-pressed"], tc = { class: "ember-help ember-keyboard-help" }, ac = { class: "ember-help ember-touch-help" }, nc = /* @__PURE__ */ xt({
  __name: "ExpeditionRoom",
  props: {
    bridge: {},
    chatIdentity: {},
    generationActive: { type: Boolean }
  },
  setup(e) {
    const t = e, s = Lo(t.bridge, t.chatIdentity), a = No(s), { view: n, notice: i, busy: r, blocked: d, talking: o, conversationFailure: c } = s, { current: l, dirty: h } = a, u = J("blade"), y = J(!0), f = J(!1), g = J(!1), v = J(0), b = J(null), m = J("sanniang"), x = J("warning"), w = J(""), k = J(null), z = J(null), C = J(null), L = J(null), N = Ao("preview", 1, "blade", "traveler"), A = oe((X) => {
      const D = l.value?.facts ?? [];
      return X && X.size === D.length && D.every((Z) => X.has(Z)) ? X : new Set(D);
    }), R = oe(() => ({
      definition: be[l.value?.location.scene ?? "camp"],
      location: l.value?.location ?? N.location,
      facts: A.value,
      people: l.value?.people ?? N.people
    })), q = oe(() => l.value?.outfit ?? n.value?.data.equippedOutfit ?? "traveler"), G = oe(() => !l.value || !!l.value.pendingParley || y.value || !!b.value || !!i.value || o.value || g.value || t.generationActive || !["exploration", "battle"].includes(l.value.phase) || !n.value?.ready || n.value.pending || n.value.writeState !== "ready"), B = oe(() => l.value?.battle?.enemies.find((X) => ye(X.kind))), T = oe(() => l.value?.conversations[m.value] ?? []), O = oe(() => l.value && Fe(m.value) ? Qn(l.value.facts, m.value, l.value.people[m.value]) : []), xe = oe(() => l.value?.collection.map((X) => {
      const D = l.value.equipped.includes(X.id) ? l.value.equipped.filter((Z) => Z !== X.id) : [...l.value.equipped, X.id];
      return {
        ...X,
        equipped: D,
        issue: Eo(l.value, D)
      };
    }) ?? []), $e = Fo(() => {
      s.error.value = Y.presentationError.sound, f.value = !1;
    });
    let je = !1;
    function ge() {
      if (l.value?.pendingParley) {
        l.value.pendingParley.decision === "pass" && de();
        return;
      }
      b.value = null, y.value = !0;
    }
    async function de() {
      await ze({ type: "resolve_parley" }) && (b.value = null, await Ft(), L.value?.focus());
    }
    an(k, ge), Pn(() => b.value ? (ge(), !0) : y.value ? !1 : (ce(), !0)), an(C, () => {
      !r.value && !g.value && !t.generationActive && s.dismissError();
    });
    function ce() {
      y.value = !0, a.flush();
    }
    async function ke(X) {
      y.value = !0, await a.flush() && (b.value = X);
    }
    async function Te() {
      if (l.value?.pendingParley) {
        l.value.pendingParley.decision === "pass" && await de();
        return;
      }
      !i.value && !t.generationActive && (b.value = null, y.value = !1, await Ft(), L.value?.focus());
    }
    async function ze(X) {
      if (y.value = !0, !await a.flush()) return !1;
      const D = await s.act(X);
      return D && (a.sync(), y.value = !1, b.value || (await Ft(), L.value?.focus())), D;
    }
    async function Mt() {
      await ze({
        type: "start",
        weapon: u.value,
        outfit: q.value
      });
    }
    async function nt() {
      await ze({
        type: "restart",
        weapon: u.value,
        outfit: q.value
      }) && (w.value = "", b.value = null);
    }
    async function Ve(X) {
      if (y.value = !0, !await a.flush() || !l.value) return;
      const D = [...Kn(l.value), ...Ha(l.value.location.scene, l.value.location.position, new Set(l.value.facts))].find((re) => re.target.id === X), Z = D?.kind === "object" ? D.target : null;
      if (Z?.kind === "person") {
        m.value = Z.person, w.value = "", b.value = "person";
        return;
      }
      if (Z?.kind === "enemy") {
        m.value = Z.enemy, w.value = "", b.value = "person";
        return;
      }
      await ze({
        type: "interact",
        id: X
      }) && Z?.kind === "inspect" && (x.value = Z.passage, b.value = "passage");
    }
    async function Rt() {
      if (!w.value.trim() || !await a.flush()) return;
      const X = w.value.trim();
      await s.talk(m.value, X) && (w.value = "", a.sync());
    }
    async function Ot() {
      await a.recover() && (y.value = !0, v.value++);
    }
    return Se(() => t.generationActive, (X) => {
      X && ce();
    }), Se(() => l.value?.pendingParley, (X) => {
      X && (m.value = X.enemy, b.value = "person", y.value = !0);
    }, { immediate: !0 }), Se(f, (X) => {
      $e.enable(X);
    }), Se(l, (X) => {
      f.value && X?.battle && $e.tick(X.battle);
    }), Se(() => n.value?.data, (X, D) => {
      if (!X?.active || !D?.active || X.active.id !== D.active.id) return;
      const Z = new Set(D.active.facts), re = new Set(X.active.facts);
      !Z.has("chapter_completed") && re.has("chapter_completed") ? b.value = "ending" : !Z.has("captives_arrived") && re.has("captives_arrived") && (b.value = "arrival");
    }), Se(() => [
      b.value,
      m.value,
      T.value.length,
      o.value
    ], async () => {
      await Ft(), z.value && (z.value.scrollTop = z.value.scrollHeight);
    }), ea(async () => {
      await s.read(), je = !0;
    }), _n(() => {
      je && !h.value && s.read();
    }), kn(() => {
      ce();
    }), Zt(() => {
      a.dispose(), s.dispose(), $e.dispose();
    }), (X, D) => (E(), $("section", Or, [
      (E(), qt(Pi, {
        key: v.value,
        ref_key: "field",
        ref: L,
        world: R.value,
        paused: G.value,
        weapon: p(l)?.weapon ?? u.value,
        outfit: q.value,
        battle: p(l)?.battle,
        onInput: p(a).input,
        onInteract: Ve,
        onPause: ce,
        onResume: Te,
        onError: D[0] || (D[0] = (Z) => g.value = !0)
      }, {
        status: tn(() => [p(l) ? (E(), $(ne, { key: 0 }, [
          S("div", Lr, [S("meter", {
            min: 0,
            max: p(W).maxHp,
            value: p(l).hp,
            "aria-label": p(Y).hp
          }, null, 8, Nr), S("span", null, P(Math.ceil(p(l).hp)) + " / " + P(p(W).maxHp), 1)]),
          S("p", Fr, P(p(xa)(p(l))), 1),
          S("small", qr, P(p(o) ? p(j).thinking : p(r) ? p(j).saving : p(h) ? "" : p(j).saved), 1)
        ], 64)) : V("", !0)]),
        overlay: tn(() => [...D[19] || (D[19] = [S("span", null, null, -1)])]),
        _: 1
      }, 8, [
        "world",
        "paused",
        "weapon",
        "outfit",
        "battle",
        "onInput"
      ])),
      p(l) && !p(l).pendingParley ? (E(), $("nav", {
        key: 0,
        class: "ember-tools",
        "aria-label": p(j).prepare
      }, [
        S("button", {
          type: "button",
          "aria-label": p(j).map,
          onClick: D[1] || (D[1] = (Z) => ke("map"))
        }, [Xe(Je, { name: "map" }), S("span", null, P(p(j).map), 1)], 8, Br),
        S("button", {
          type: "button",
          "aria-label": p(j).build,
          onClick: D[2] || (D[2] = (Z) => ke("build"))
        }, [Xe(Je, { name: "bag" }), S("span", null, P(p(j).build), 1)], 8, Hr),
        S("button", {
          type: "button",
          "aria-label": p(j).journal,
          onClick: D[3] || (D[3] = (Z) => ke("journal"))
        }, [Xe(Je, { name: "journal" }), S("span", null, P(p(j).journal), 1)], 8, Wr),
        S("button", {
          type: "button",
          "aria-label": p(j).pause,
          onClick: ce
        }, [Xe(Je, { name: "pause" })], 8, Qr)
      ], 8, Dr)) : V("", !0),
      B.value && !b.value ? (E(), $("div", Ur, [S("strong", null, P(p(Ea)[B.value.kind]), 1), S("meter", {
        min: "0",
        max: B.value.maxHp,
        value: B.value.hp,
        "aria-label": p(Ea)[B.value.kind]
      }, null, 8, Yr)])) : V("", !0),
      p(l)?.phase === "battle" && ["gate", "beacon"].includes(p(l).location.scene) && !A.value.has("alarm_silenced") ? (E(), $("div", Gr, P(A.value.has("alarm_raised") ? p(j).alarmRaised : p(j).alarmSeconds(Math.ceil((p(It).alarmTicks - p(l).alarmTicks) / p(W).hz))), 1)) : V("", !0),
      p(i) || g.value || e.generationActive ? (E(), $("section", {
        key: 3,
        ref_key: "noticePanel",
        ref: C,
        class: "ember-notice",
        role: "alertdialog",
        "aria-modal": "true",
        "aria-label": p(j).noticeTitle,
        tabindex: "-1"
      }, [S("p", null, P(g.value ? p(j).renderError : e.generationActive ? p(j).generation : p(i)), 1), g.value ? (E(), $("button", {
        key: 0,
        type: "button",
        onClick: D[4] || (D[4] = (Z) => {
          g.value = !1, v.value++;
        })
      }, P(p(j).reload), 1)) : p(s).dataInvalid.value && !e.generationActive ? (E(), $(ne, { key: 1 }, [S("p", null, P(p(j).rebuildWarning), 1), S("button", {
        type: "button",
        disabled: p(r),
        onClick: D[5] || (D[5] = (...Z) => p(s).rebuild && p(s).rebuild(...Z))
      }, P(p(j).rebuild), 9, Vr)], 64)) : e.generationActive ? V("", !0) : (E(), $("button", {
        key: 2,
        type: "button",
        disabled: p(r),
        onClick: D[6] || (D[6] = (Z) => p(s).recoveryRequired.value ? Ot() : p(s).dismissError())
      }, P(p(s).recoveryRequired.value ? p(j).recover : p(j).acknowledge), 9, Xr))], 8, Kr)) : V("", !0),
      p(c) && !p(i) && (b.value !== "person" || m.value !== p(c).person) ? (E(), $("aside", Jr, [
        S("strong", null, P(p(He)(p(c).person)), 1),
        S("p", null, P(p(ct)(p(c))), 1),
        p(c).text ? (E(), $("details", el, [S("summary", null, P(p(j).receivedReply), 1), S("p", tl, P(p(c).text), 1)])) : V("", !0),
        S("button", {
          type: "button",
          onClick: D[7] || (D[7] = (...Z) => p(s).dismissConversationFailure && p(s).dismissConversationFailure(...Z))
        }, P(p(j).acknowledge), 1)
      ])) : V("", !0),
      p(l) ? !p(i) && !g.value && !e.generationActive && (b.value || y.value || p(l).phase === "reward" || p(l).phase === "lost") ? (E(), $("div", cl, [S("section", {
        ref_key: "dialog",
        ref: k,
        class: Et(["ember-panel", {
          "ember-wide": b.value === "map" || b.value === "wardrobe",
          "ember-map-panel": b.value === "map",
          "ember-wardrobe-panel": b.value === "wardrobe",
          "ember-dialogue": b.value === "person"
        }]),
        role: "dialog",
        "aria-modal": "true",
        "aria-label": b.value === "person" ? p(He)(m.value) : p(j).chapter,
        tabindex: "-1"
      }, [b.value !== "map" ? (E(), $("header", hl, [b.value === "wardrobe" ? (E(), $("h2", ul, P(p(j).wardrobe), 1)) : (E(), $("span", fl, P(p(j).chapter), 1)), p(l).pendingParley?.decision !== "attack" && (b.value || p(l).phase !== "lost" && p(l).phase !== "reward") ? (E(), $("button", {
        key: 2,
        type: "button",
        disabled: !!p(l).pendingParley && p(d),
        onClick: Te
      }, P(p(j).close), 9, pl)) : V("", !0)])) : V("", !0), b.value === "map" ? (E(), qt(Ui, {
        key: 1,
        campaign: p(l),
        onClose: Te
      }, null, 8, ["campaign"])) : b.value === "restart" ? (E(), $(ne, { key: 2 }, [
        S("h2", null, P(p(j).restart), 1),
        S("p", null, P(p(j).restartWarning), 1),
        S("div", {
          class: "ember-weapons",
          "aria-label": p(Y).weapons
        }, [(E(!0), $(ne, null, _e(p(za), (Z) => (E(), $("button", {
          key: Z,
          type: "button",
          "aria-pressed": u.value === Z,
          onClick: (re) => u.value = Z
        }, [Xe(Je, { name: Z }, null, 8, ["name"]), S("span", null, P(p(gt)[Z].name), 1)], 8, yl))), 128))], 8, ml),
        S("p", gl, [Le(P(p(gt)[u.value].detail), 1), S("small", null, P(p(wa)(u.value)), 1)]),
        S("button", {
          class: "ember-primary",
          type: "button",
          disabled: p(d),
          onClick: nt
        }, P(p(j).restart), 9, vl)
      ], 64)) : b.value === "journal" ? (E(), $(ne, { key: 3 }, [
        S("h2", null, P(p(j).journal), 1),
        S("p", bl, P(p(xa)(p(l))), 1),
        S("ol", xl, [(E(!0), $(ne, null, _e(p(l).facts, (Z) => (E(), $("li", { key: Z }, P(p(Gt)[Z]), 1))), 128))])
      ], 64)) : b.value === "build" ? (E(), $(ne, { key: 4 }, [
        S("h2", null, [Le(P(p(j).build) + " ", 1), S("small", null, P(p(j).slots(p(l).equipped.length, p(W).relicSlots)), 1)]),
        S("p", null, P(p(gt)[p(l).weapon].name) + " · " + P(p(wa)(p(l).weapon)), 1),
        p(l).location.scene !== "camp" ? (E(), $("p", wl, P(p(j).safeBuild), 1)) : V("", !0),
        p(l).collection.length ? V("", !0) : (E(), $("p", Ml, P(p(j).emptyBuild), 1)),
        S("div", kl, [(E(!0), $(ne, null, _e(xe.value, (Z) => (E(), $("article", { key: Z.id }, [
          Xe(Je, { name: Z.id }, null, 8, ["name"]),
          S("h3", null, [Le(P(p(Dt)[Z.id].name) + " ", 1), S("small", null, P(p(Y).rank(Z.rank)), 1)]),
          S("p", null, P(p(Dt)[Z.id].detail), 1),
          Z.issue === "dependency" || Z.issue === "capacity" ? (E(), $("small", _l, P(p(j).loadoutIssue[Z.issue]), 1)) : V("", !0),
          S("button", {
            type: "button",
            disabled: p(d) || !!Z.issue,
            onClick: (re) => ze({
              type: "loadout",
              equipped: Z.equipped
            })
          }, P(p(l).equipped.includes(Z.id) ? p(j).takeOff : p(j).putOn), 9, Sl)
        ]))), 128))])
      ], 64)) : b.value === "wardrobe" && p(n) ? (E(), qt(mr, {
        key: 5,
        data: p(n).data,
        balance: p(n).balance,
        blocked: p(d),
        weapon: p(l).weapon,
        onCommand: ze
      }, null, 8, [
        "data",
        "balance",
        "blocked",
        "weapon"
      ])) : b.value === "person" ? (E(), $(ne, { key: 6 }, [
        S("div", Pl, [S("h2", null, P(p(He)(m.value)), 1), (E(), qt(Rr, {
          key: m.value,
          campaign: p(l),
          person: m.value,
          draft: w.value
        }, null, 8, [
          "campaign",
          "person",
          "draft"
        ]))]),
        S("div", {
          ref_key: "transcript",
          ref: z,
          class: "ember-dialogue-scroll",
          role: "log",
          "aria-live": "polite"
        }, [
          T.value.length ? V("", !0) : (E(), $("p", Il, P(p(se).scenes[p(l).location.scene]) + " · " + P(p(He)(m.value)), 1)),
          (E(!0), $(ne, null, _e(T.value, (Z) => (E(), $(ne, { key: Z.id }, [
            Z.kind !== "interaction" ? (E(), $("p", zl, [S("small", null, P(p(j).player), 1), Le(P(Z.player), 1)])) : V("", !0),
            Z.issue ? (E(), $("p", Cl, P(p(me).issues[Z.issue]), 1)) : V("", !0),
            Z.kind === "receipt" ? (E(), $("details", El, [S("summary", null, P(p(me).rawReply), 1), S("p", Al, P(Z.reply), 1)])) : (E(), $("p", {
              key: 3,
              class: Et(Z.kind === "interaction" ? "ember-greeting" : "ember-npc-line")
            }, P(Z.reply), 3))
          ], 64))), 128)),
          p(c)?.person === m.value && !T.value.some((Z) => Z.id === p(c)?.actionId) ? (E(), $("div", $l, [
            S("p", null, P(p(ct)(p(c))), 1),
            p(c).text ? (E(), $("details", Tl, [S("summary", null, P(p(j).receivedReply), 1), S("p", Zl, P(p(c).text), 1)])) : V("", !0),
            S("button", {
              type: "button",
              onClick: D[8] || (D[8] = (...Z) => p(s).dismissConversationFailure && p(s).dismissConversationFailure(...Z))
            }, P(p(j).acknowledge), 1)
          ])) : V("", !0),
          p(o) ? (E(), $("p", jl, P(p(j).thinking), 1)) : V("", !0)
        ], 512),
        O.value.length && !p(l).pendingParley ? (E(), $("div", Rl, [(E(!0), $(ne, null, _e(O.value, (Z) => (E(), $("button", {
          key: Z,
          "data-choice": Z,
          type: "button",
          disabled: p(d),
          onClick: (re) => p(Fe)(m.value) && ze({
            type: "choice",
            id: Z,
            person: m.value
          })
        }, P(p(oa)[Z].label), 9, Ol))), 128))])) : V("", !0),
        p(l).pendingParley?.decision === "attack" ? (E(), $("button", {
          key: 1,
          class: "ember-primary",
          type: "button",
          disabled: p(d),
          onClick: de
        }, P(p(me).fight), 9, Ll)) : V("", !0),
        p(l).pendingParley ? V("", !0) : (E(), $("form", {
          key: 2,
          class: "ember-chat-form",
          onSubmit: rt(Rt, ["prevent"])
        }, [Sn(S("textarea", {
          "onUpdate:modelValue": D[9] || (D[9] = (Z) => w.value = Z),
          maxlength: p(It).playerTextLimit,
          "aria-label": p(j).input,
          placeholder: p(j).input,
          disabled: p(o),
          rows: "2"
        }, null, 8, Nl), [[In, w.value]]), p(o) ? (E(), $("button", {
          key: 0,
          type: "button",
          onClick: D[10] || (D[10] = (...Z) => p(s).cancelTalk && p(s).cancelTalk(...Z))
        }, P(p(j).cancel), 1)) : (E(), $("button", {
          key: 1,
          class: "ember-primary",
          type: "submit",
          disabled: p(d) || !w.value.trim()
        }, P(p(j).send), 9, Fl))], 32)),
        p(l).pendingParley ? V("", !0) : (E(), $("small", ql, P(p(j).aiNotice), 1))
      ], 64)) : b.value === "passage" ? (E(), $(ne, { key: 7 }, [S("h2", null, P(p(se).passages[x.value].title), 1), S("p", Dl, P(p(se).passages[x.value].body), 1)], 64)) : b.value === "arrival" ? (E(), $(ne, { key: 8 }, [
        S("h2", null, P(p(se).scenes.camp), 1),
        S("p", Bl, P(p(j).received), 1),
        S("button", {
          class: "ember-primary",
          type: "button",
          onClick: Te
        }, P(p(j).resume), 1)
      ], 64)) : b.value === "ending" ? (E(), $(ne, { key: 9 }, [
        S("h2", null, P(p(j).endingTitle), 1),
        S("p", Hl, P(p(j).ending), 1),
        S("strong", Wl, P(p(j).continued), 1),
        S("p", null, P(p(j).optional), 1),
        S("button", {
          class: "ember-primary",
          type: "button",
          onClick: Te
        }, P(p(j).remain), 1)
      ], 64)) : p(l).phase === "reward" ? (E(), $(ne, { key: 10 }, [
        S("h2", null, P(p(j).reward), 1),
        S("p", null, P(p(j).rewardDetail), 1),
        S("div", Ql, [(E(!0), $(ne, null, _e(p(l).offers, (Z) => (E(), $("button", {
          key: Z.id,
          type: "button",
          disabled: p(d),
          onClick: (re) => ze({
            type: "relic",
            id: Z.id
          })
        }, [
          Xe(Je, { name: Z.id }, null, 8, ["name"]),
          S("h3", null, [Le(P(p(Dt)[Z.id].name) + " ", 1), S("small", null, P(p(Y).rank(Z.rank)), 1)]),
          S("p", null, P(p(Dt)[Z.id].detail), 1)
        ], 8, Ul))), 128))]),
        S("button", {
          type: "button",
          disabled: p(d),
          onClick: D[11] || (D[11] = (Z) => ze({ type: "leave" }))
        }, P(p(j).skip), 9, Yl)
      ], 64)) : p(l).phase === "lost" ? (E(), $(ne, { key: 11 }, [
        S("h2", null, P(p(j).fallen), 1),
        S("p", Gl, P(p(j).fallenDetail), 1),
        S("button", {
          class: "ember-primary",
          type: "button",
          disabled: p(d),
          onClick: D[12] || (D[12] = (Z) => ze({ type: "retry" }))
        }, P(p(j).retry), 9, Kl),
        S("button", {
          type: "button",
          disabled: p(d),
          onClick: D[13] || (D[13] = (Z) => ze({ type: "retreat" }))
        }, P(p(j).retreat), 9, Vl)
      ], 64)) : (E(), $(ne, { key: 12 }, [
        S("h2", null, P(p(j).title), 1),
        S("p", null, P(p(xa)(p(l))), 1),
        S("button", {
          class: "ember-primary",
          type: "button",
          disabled: !!p(i) || e.generationActive,
          onClick: Te
        }, P(p(j).resume), 9, Xl),
        S("div", Jl, [
          S("button", {
            type: "button",
            onClick: D[14] || (D[14] = (Z) => ke("map"))
          }, P(p(j).map), 1),
          S("button", {
            type: "button",
            onClick: D[15] || (D[15] = (Z) => ke("build"))
          }, P(p(j).build), 1),
          p(l).location.scene === "camp" ? (E(), $("button", {
            key: 0,
            type: "button",
            onClick: D[16] || (D[16] = (Z) => ke("wardrobe"))
          }, P(p(j).wardrobe), 1)) : V("", !0),
          S("button", {
            type: "button",
            "aria-pressed": f.value,
            onClick: D[17] || (D[17] = (Z) => f.value = !f.value)
          }, P(p(j).sound), 9, ec)
        ]),
        S("p", tc, P(p(j).controls), 1),
        S("p", ac, P(p(j).touchControls), 1),
        p(l).location.scene === "camp" && p(l).phase === "exploration" ? (E(), $("button", {
          key: 0,
          type: "button",
          onClick: D[18] || (D[18] = (Z) => {
            u.value = p(l).weapon, ke("restart");
          })
        }, P(p(j).restart), 1)) : V("", !0)
      ], 64))], 10, dl)])) : V("", !0) : (E(), $("section", al, [
        S("p", nl, P(p(j).chapter), 1),
        S("h1", null, P(p(j).title), 1),
        S("p", sl, P(p(j).opening), 1),
        S("div", {
          class: "ember-weapons",
          "aria-label": p(Y).weapons
        }, [(E(!0), $(ne, null, _e(p(za), (Z) => (E(), $("button", {
          key: Z,
          type: "button",
          "aria-pressed": u.value === Z,
          onClick: (re) => u.value = Z
        }, [Xe(Je, { name: Z }, null, 8, ["name"]), S("span", null, P(p(gt)[Z].name), 1)], 8, il))), 128))], 8, ol),
        S("p", rl, [Le(P(p(gt)[u.value].detail), 1), S("small", null, P(p(wa)(u.value)), 1)]),
        S("button", {
          class: "ember-primary",
          type: "button",
          disabled: p(d) || e.generationActive,
          onClick: Mt
        }, P(p(n) ? p(j).start : p(Y).preparing), 9, ll)
      ]))
    ]));
  }
}), fc = nc;
export {
  fc as default
};
