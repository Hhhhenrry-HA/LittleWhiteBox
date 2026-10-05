/* eslint-disable */
import { B as Ca, C as H, D as ce, F as Va, G as ge, I as Ia, O as W, P as vt, Q as Qe, R as Ya, S as Re, U as Z, _ as D, at as Y, b as oe, dt as Fe, ft as b, g as Xe, k as da, lt as r, o as gt, ot as $a, p as yt, s as Mt, tt as kt, ut as qe, w as A, x as v, y as xt } from "./xiaobai-os-frame-bridge-CrPFvkI3.js";
import { C as Xa, Et as bt, Mt as za, Pt as ya, Q as wt, S as aa, St as _t, X as Ra, Y as Je, a as Zt, at as Ja, bt as et, c as At, f as Ct, g as wa, m as It, t as at, u as tt, v as Et, vt as ja, w as Pt, x as St, xt as La, yt as nt } from "./xiaobai-os-three.module-Bh6B3L2B.js";
import { n as Tt, o as $t } from "./xiaobai-os-performance-C_L35DGq.js";
import { t as zt } from "./xiaobai-os-BufferGeometryUtils-BKRv0Kh0.js";
import { C as Rt, S as ue, _ as _a, a as He, b as _e, c as Pe, d as jt, f as Lt, g as Ot, h as ca, i as Oa, l as ia, m as J, n as sa, o as we, p as Ea, r as ea, s as ra, t as g, u as qt, v as ye, w as ua, x as Ht, y as T } from "./xiaobai-os-copy-DyWH-QSz.js";
function it(a) {
  return a.seed = Math.imul(a.seed, 1664525) + 1013904223 >>> 0, a.seed / 4294967296;
}
function Qt() {
  return Array.from(crypto.getRandomValues(new Uint32Array(4)), (a) => a.toString(16).padStart(8, "0")).join("");
}
function Le(a) {
  throw Object.assign(/* @__PURE__ */ new Error(`expedition_${a}`), { code: `expedition_${a}` });
}
var te = (a, e, n = 0) => ({
  family: a,
  chapter: n,
  ...e ? { requires: [e] } : {}
}), F = (a, e = 0) => ({
  family: a,
  weapons: [a],
  chapter: e
}), st = {
  "storm-step": te("storm"),
  conductor: te("storm", [
    "storm-step",
    "orbit",
    "momentum",
    "command"
  ]),
  momentum: te("storm"),
  cinder: te("fire"),
  wildfire: te("fire", ["cinder", "inferno"]),
  "blood-price": te("risk"),
  frost: te("frost"),
  shatter: te("frost", [
    "frost",
    "nova",
    "pinning",
    "trapper",
    "orbitals"
  ]),
  echo: te("skill"),
  hunter: {
    ...te("bow"),
    weapons: [
      "bow",
      "staff",
      "grimoire",
      "cannon"
    ]
  },
  piercing: te("blade"),
  orbit: te("storm"),
  thorns: te("guard"),
  aegis: te("guard"),
  siphon: te("life"),
  focus: te("skill"),
  renewal: te("life"),
  execution: te("blade"),
  "last-stand": te("guard", void 0, 1),
  quicksilver: te("skill"),
  magnet: te("skill"),
  wardstone: te("guard"),
  pilgrim: te("life"),
  gambit: te("risk", void 0, 1),
  riposte: F("blade"),
  "shield-break": F("blade"),
  "cleave-wave": F("blade", 1),
  duelist: F("blade"),
  "blood-dance": F("blade"),
  valor: F("blade", 1),
  ricochet: F("bow"),
  "split-arrow": F("bow"),
  pinning: F("bow"),
  "distance-draw": F("bow"),
  "hunter-mark": F("bow", 1),
  trapper: F("bow"),
  nova: F("staff"),
  inferno: {
    ...F("staff"),
    requires: [["cinder"]]
  },
  fracture: {
    ...F("staff"),
    requires: [[
      "frost",
      "nova",
      "orbitals"
    ]]
  },
  overload: {
    ...F("staff", 1),
    requires: [["cinder"], [
      "frost",
      "nova",
      "orbitals"
    ]]
  },
  orbitals: F("staff"),
  convergence: F("staff"),
  backstab: F("daggers"),
  shadowstep: F("daggers"),
  hemorrhage: F("daggers"),
  "execution-chain": F("daggers", 1),
  smoke: F("daggers"),
  venom: F("daggers"),
  "pack-bond": F("grimoire"),
  martyr: F("grimoire"),
  covenant: F("grimoire"),
  frenzy: F("grimoire"),
  "soul-harvest": F("grimoire", 1),
  command: F("grimoire"),
  shrapnel: F("cannon"),
  minefield: F("cannon"),
  overclock: F("cannon"),
  bunker: F("cannon"),
  salvage: F("cannon"),
  railgun: F("cannon", 1)
}, M = (a, e) => a.relics.find((n) => n.id === e)?.rank ?? 0;
function qa(a, e, n = null) {
  const t = st[e];
  return (!t.weapons || t.weapons.includes(a.weapon)) && (!t.requires || t.requires.every((i) => i.some((l) => l !== n && M(a, l) > 0)));
}
function Ma(a, e, n) {
  return n !== null && qa(a, e) && !qa(a, e, n);
}
function Ha(a) {
  return T.shopCost + (a.rank - 1) * 35;
}
var je = Math.PI * 2, S = (a, e) => Math.hypot(a.x - e.x, a.y - e.y), ee = (a, e) => Math.atan2(e.y - a.y, e.x - a.x), rt = (a) => (a - 1) * Math.PI / 4 - Math.PI / 2, Ce = (a, e, n) => ({
  x: a.x + Math.cos(e) * n,
  y: a.y + Math.sin(e) * n
});
function Ae(a, e, n, t, i) {
  e.x += Math.cos(n) * t, e.y += Math.sin(n) * t;
  for (const l of a.obstacles) {
    const o = S(e, l), u = i + l.radius;
    if (o < u) {
      const s = o < 1e-3 ? n : ee(l, e);
      e.x = l.x + Math.cos(s) * u, e.y = l.y + Math.sin(s) * u;
    }
  }
  e.x = Math.max(-T.arena + i, Math.min(T.arena - i, e.x)), e.y = Math.max(-T.arena + i, Math.min(T.arena - i, e.y));
}
function Nt(a, e, n, t) {
  const i = a.x - e.x, l = a.y - e.y, o = Math.max(0, Math.min(t, i * Math.cos(n) + l * Math.sin(n)));
  return Math.hypot(i - Math.cos(n) * o, l - Math.sin(n) * o);
}
function se(a, e, n, t = 1, i = 0) {
  a.effects.push({
    id: ++a.serial,
    x: e.x,
    y: e.y,
    kind: n,
    size: t,
    angle: i,
    life: n === "slash" ? 9 : 15
  });
}
function he(a, e, n) {
  if (!ue(e) && a.enemies.filter((l) => l.hp > 0).length >= T.maxEnemies) return null;
  const t = J[e].hp * (ue(e) ? 1 : 1 + a.chapter * 0.2 + (a.elite ? 0.25 : 0)), i = {
    id: ++a.serial,
    kind: e,
    x: n.x,
    y: n.y,
    hp: t,
    maxHp: t,
    angle: Math.PI / 2,
    cooldown: 35 + Math.floor(it(a) * 20),
    windup: 0,
    target: { ...n },
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
  return a.enemies.push(i), i;
}
function $e(a, e, n, t, i, l = {}) {
  const o = {
    id: ++a.serial,
    x: e.x,
    y: e.y,
    angle: n,
    damage: t,
    friendly: i,
    source: "attack",
    pierce: 0,
    hits: [],
    speed: 0.22,
    life: 130,
    radius: 0.16,
    splash: 0,
    bounce: 0,
    ...l
  };
  return a.shots.push(o), o;
}
function X(a, e, n, t, i, l, o, u = !1, s = {}) {
  const c = {
    id: ++a.serial,
    x: e.x,
    y: e.y,
    kind: n,
    radius: t,
    wait: i,
    life: l,
    damage: o,
    friendly: u,
    angle: 0,
    length: 0,
    width: 0.65,
    inner: 0,
    source: u ? "passive" : "attack",
    ...s
  };
  return a.hazards.push(c), c;
}
function Se(a, e, n, t, i) {
  return X(a, e, "slam", n, t, 8, i);
}
function pe(a, e, n, t, i, l, o) {
  return X(a, e, "beam", 0, l, 9, o, !1, {
    angle: n,
    length: t,
    width: i
  });
}
function Te(a, e, n, t, i, l, o = 0.22) {
  for (let u = 0; u < t; u++) $e(a, e, n + (u / Math.max(1, t - 1) - 0.5) * i, l, !1, { speed: o });
}
function Qa(a, e, n, t, i, l = 0.16) {
  for (let o = 0; o < n; o++) $e(a, e, t + o * je / n, i, !1, { speed: l });
}
function Za(a, e, n, t, i = 0) {
  const l = {
    id: ++a.serial,
    kind: e,
    x: n.x,
    y: n.y,
    hp: e === "turret" ? 65 : 38,
    life: t,
    cooldown: 12,
    angle: 0,
    empowered: i
  };
  return a.companions.push(l), l;
}
var Bt = (a) => a === "attack" || a === "skill";
function ot(a, e) {
  if (a.player.hp <= 0) return;
  const n = Math.min(T.maxHp - a.player.hp, e);
  a.player.hp += n, n > 0 && se(a, a.player, "heal");
}
function ze(a, e, n) {
  if (ue(e.kind)) {
    if (e.stagger += n, e.stagger < 100) return;
    e.stagger = 0, n = 24;
  }
  e.stun = Math.max(e.stun, n), e.windup = 0, e.motion = 0, e.cooldown = Math.max(20, e.cooldown), se(a, e, "guard", 1.4);
}
function Me(a, e, n, t, i, l = a.player) {
  if (e.hp <= 0) return;
  let o = n * (M(t, "blood-price") ? ye.bloodDamage + (M(t, "blood-price") - 1) * 0.12 : 1);
  if (M(t, "execution") && e.hp / e.maxHp < ye.executeThreshold && (o *= ye.executeDamage + (M(t, "execution") - 1) * 0.1), e.exposed > 0 && (o *= 1.25), e.kind === "guard" && i === "attack" && Math.cos(ee(e, l) - e.angle) > 0.4 && e.exposed <= 0 && (o *= M(t, "shield-break") ? 0.8 : 0.35), e.kind !== "priest" && !ue(e.kind) && a.enemies.some((u) => u.kind === "priest" && u.hp > 0 && S(e, u) < 3.5) && (o *= 0.7), i === "attack" && M(t, "backstab") && Math.cos(ee(e, a.player) - e.angle) < -0.3 && (o *= 1.6 + M(t, "backstab") * 0.2, e.exposed = 55), i === "attack" && M(t, "duelist") && ze(a, e, 9 * M(t, "duelist")), (i === "skill" || i === "companion" && t.weapon === "cannon") && e.chill > 0 && M(t, "shatter")) {
    o += 15 * M(t, "shatter"), e.chill = 0, se(a, e, "burst", 2.2);
    for (const u of a.enemies) u.id !== e.id && S(e, u) < 2.2 && Me(a, u, 9 * M(t, "shatter"), t, "passive", e);
  }
  if (Bt(i) && (M(t, "cinder") && (e.burn = Math.max(e.burn, 80 + M(t, "cinder") * 25)), M(t, "frost") && (e.chill = Math.max(e.chill, 45 + M(t, "frost") * 20)), (M(t, "blood-dance") || M(t, "hemorrhage")) && (e.bleed = 100 + 25 * (M(t, "blood-dance") + M(t, "hemorrhage"))), M(t, "venom") && (e.poison = 100 + M(t, "venom") * 35), M(t, "overload") && e.burn > 0 && e.chill > 0 && (e.burn = 0, e.chill = 0, o += 20 * M(t, "overload"), se(a, e, "lightning")), i === "skill" && M(t, "hunter-mark") && (e.exposed = 100 + M(t, "hunter-mark") * 40), M(t, "inferno") && e.burn && i === "skill" && X(a, e, "fire", 1.5 + M(t, "inferno") * 0.3, 0, 70, 4 * M(t, "inferno"), !0)), e.hp = Math.max(0, e.hp - o), e.marked = 5, i === "lightning" && M(t, "momentum") && a.tick % 6 === 0 && (a.player.dash = Math.max(0, a.player.dash - M(t, "momentum") * 2)), !(e.hp > 0)) {
    if (a.kills++, se(a, e, "burst", ue(e.kind) ? 3 : 0.8), M(t, "wildfire") && e.burn > 0 && X(a, e, "fire", 1.8 + M(t, "wildfire") * 0.2, 0, 90, 3 * M(t, "wildfire"), !0), M(t, "fracture") && e.chill > 0) for (let u = 0; u < 4 + M(t, "fracture"); u++) $e(a, e, u * je / (4 + M(t, "fracture")), 9, !0, { source: "passive" });
    if (M(t, "siphon") && (a.kills % ye.siphonEvery === 0 || ue(e.kind)) && ot(a, (ue(e.kind) ? ye.siphonBossHeal : ye.siphonHeal) + M(t, "siphon") - 1), M(t, "execution-chain") && (a.player.dash = Math.max(0, a.player.dash - 12 * M(t, "execution-chain")), a.player.skill = Math.max(0, a.player.skill - 8)), M(t, "soul-harvest") && (a.player.resource = Math.min(100, a.player.resource + 9 * M(t, "soul-harvest"))), i === "companion" && M(t, "salvage") && (a.player.skill = Math.max(0, a.player.skill - 12 * M(t, "salvage"))), M(t, "magnet"))
      for (const u of a.enemies) u.hp > 0 && S(e, u) < 3 + M(t, "magnet") && Ae(a, u, ee(u, e), 0.7, J[u.kind].radius);
  }
}
function Aa(a, e, n, t) {
  const i = [e];
  M(n, "conductor") && i.push(...a.enemies.filter((l) => l.id !== e.id && l.hp > 0 && S(l, e) < 4.5).sort((l, o) => S(l, e) - S(o, e)).slice(0, M(n, "conductor") + 1));
  for (const l of i)
    se(a, l, "lightning"), Me(a, l, t, n, "lightning");
}
function lt(a, e) {
  const n = a.player, t = n.guard > 0;
  n.resource = Math.min(100, n.resource + (t ? 25 : 8)), se(a, n, "guard", t ? 2 : 1), t && (n.skill = Math.max(35, n.skill - 15));
  const i = M(e, "riposte"), l = M(e, "thorns");
  if (i || l)
    for (const o of a.enemies) S(o, n) < 3.2 + i * 0.3 && (Me(a, o, (t ? 20 : 8) * i + 9 * l, e, "passive"), ze(a, o, t ? 20 : 7));
}
function fa(a, e, n) {
  const t = a.player;
  if (t.invulnerable > 0 || t.hp <= 0) return;
  if (t.shield > 0) {
    lt(a, n), t.invulnerable = t.guard > 0 ? 8 : 4;
    return;
  }
  let i = e * _e[n.weapon].guard * (M(n, "blood-price") ? ye.bloodHurt : 1) * (M(n, "gambit") ? 1.2 : 1);
  const l = Math.min(t.ward, i);
  if (t.ward -= l, i -= l, t.hp <= i && M(n, "last-stand") && !t.rescues) {
    t.rescues++, t.hp = 15 + M(n, "last-stand") * 8, t.invulnerable = 60, se(a, t, "guard", 3);
    return;
  }
  if (t.hp = Math.max(0, t.hp - i), a.damageTaken += i, t.invulnerable = 18, t.lastHit = a.tick, se(a, t, "hit"), M(n, "thorns"))
    for (const o of a.enemies) S(o, t) < 3 && Me(a, o, 10 * M(n, "thorns"), n, "passive");
}
function ta(a, e, n = 45) {
  a.ward += Math.max(0, Math.min(e, n - a.ward));
}
function Na(a, e, n, t = !1) {
  const i = _e[e.weapon], l = a.player, o = ee(l, n), u = (t ? 0.6 : 1) * (M(e, "gambit") ? 1 + M(e, "gambit") * 0.12 : 1);
  if (l.facing = o, l.swing = e.weapon === "cannon" ? 15 : 8, e.weapon === "blade" || e.weapon === "daggers") {
    const f = i.range + M(e, "piercing") * 0.25;
    se(a, l, "slash", f, o);
    for (const h of a.enemies)
      S(l, h) > f + J[h.kind].radius || Math.cos(ee(l, h) - o) < -0.1 || (Me(a, h, i.damage * u, e, "attack"), e.weapon === "blade" && !t && l.combo % 3 === 2 && ze(a, h, 14));
    e.weapon === "blade" && (l.resource = Math.min(100, l.resource + 9), M(e, "cleave-wave") && l.combo % 3 === 2 && $e(a, l, o, 14 * M(e, "cleave-wave"), !0, {
      pierce: 5,
      radius: 0.4,
      speed: 0.3,
      source: "passive"
    }));
    return;
  }
  let s = i.damage * u;
  M(e, "distance-draw") && (s *= 1 + Math.min(1, S(l, n) / 8) * 0.15 * M(e, "distance-draw")), e.weapon === "staff" && (l.resource = Math.min(100, l.resource + 18)), e.weapon === "grimoire" && (l.resource = Math.min(100, l.resource + 12));
  const c = M(e, "piercing") * ye.extraPierce + M(e, "railgun") * 2, m = $e(a, l, o, s, !0, {
    pierce: c,
    speed: e.weapon === "bow" ? 0.38 : 0.28,
    splash: e.weapon === "staff" ? 1.4 : e.weapon === "cannon" ? 1.8 + M(e, "shrapnel") * 0.3 : 0,
    bounce: M(e, "ricochet"),
    radius: e.weapon === "cannon" ? 0.3 : 0.16
  });
  if (e.weapon === "bow" && M(e, "split-arrow") && l.combo % 3 === 2) for (const f of [-0.18, 0.18]) $e(a, l, o + f, s * (0.35 + M(e, "split-arrow") * 0.1), !0, {
    speed: m.speed,
    pierce: c
  });
}
function Ft(a, e, n) {
  const t = a.player, i = _e[e.weapon], l = M(e, "focus");
  switch (t.skill = Math.round(i.skillCooldown * (l ? ye.focusSkill - (l - 1) * 0.06 : 1)), M(e, "aegis") && (t.shield = 18 + M(e, "aegis") * 6, t.guard = 8, ta(t, M(e, "aegis") * 6)), e.weapon) {
    case "blade": {
      t.shield = 26 + M(e, "aegis") * 6, t.guard = 9;
      const o = 1 + t.resource / 100;
      t.resource = 0, se(a, t, "slash", 3.6, t.facing);
      for (const u of a.enemies)
        u.hp <= 0 || S(t, u) > 3.6 + J[u.kind].radius || (M(e, "shield-break") && (u.exposed = 70 + 30 * M(e, "shield-break")), Me(a, u, i.skill * o, e, "skill"), ze(a, u, 40), ue(u.kind) || Ae(a, u, ee(t, u), 1.5, J[u.kind].radius));
      M(e, "valor") && ta(t, 12 * M(e, "valor") * o);
      break;
    }
    case "bow":
      for (let o = -2; o <= 2; o++) $e(a, t, t.facing + o * 0.15, i.skill, !0, {
        pierce: 6,
        speed: 0.42,
        source: "skill"
      });
      Ae(a, t, t.facing + Math.PI, 0.85, T.playerRadius);
      break;
    case "staff": {
      const o = n ?? t, u = 1 + t.resource / 125;
      if (t.resource = 0, M(e, "convergence"))
        for (const s of a.enemies) S(s, o) < 4 + M(e, "convergence") && Ae(a, s, ee(s, o), 1.2, J[s.kind].radius);
      for (let s = 0; s < 3; s++) X(a, Ce(o, s * je / 3, 0.7), "slam", 2.3, 10 + s * 10, 1, i.skill * u, !0, { source: "skill" });
      if (M(e, "nova")) {
        X(a, t, "frost", 3 + M(e, "nova") * 0.5, 0, 32, 6 * M(e, "nova"), !0, { source: "skill" });
        for (const s of a.enemies) S(t, s) < 3.5 && (s.chill = 120, ze(a, s, 25));
      }
      break;
    }
    case "daggers":
      if (t.invulnerable = Math.max(t.invulnerable, 12), n) {
        const o = Ce(n, n.angle + Math.PI, J[n.kind].radius + 0.55);
        Ae(a, t, ee(t, o), Math.min(5, S(t, o)), T.playerRadius), t.facing = ee(t, n), n.exposed = 60, Me(a, n, i.skill, e, "skill"), ze(a, n, 20), se(a, t, "slash", 2, t.facing);
      }
      M(e, "shadowstep") && Za(a, "shade", t, 95 + M(e, "shadowstep") * 30, M(e, "shadowstep"));
      break;
    case "grimoire": {
      const o = t.resource;
      t.resource = 0;
      for (const u of a.companions) u.kind === "familiar" && (u.empowered = 90 + o, u.hp = Math.max(u.hp, 38), u.cooldown = 0);
      n && (n.exposed = 100, Me(a, n, i.skill + o * 0.3, e, "skill")), M(e, "command") && X(a, n ?? t, "storm", 2.4 + M(e, "command") * 0.3, 10, 65, 7 * M(e, "command"), !0, { source: "skill" });
      break;
    }
    case "cannon": {
      const o = 1 + (M(e, "overclock") >= 2 ? 1 : 0), u = a.companions.filter((s) => s.kind === "turret");
      u.length >= o && (u[0].life = 0), Za(a, "turret", Ce(t, t.facing, 0.9), 240 + M(e, "overclock") * 45, M(e, "overclock")), M(e, "bunker") && ta(t, 15 * M(e, "bunker"));
      break;
    }
  }
}
function Wt(a, e, n) {
  const t = a.player, i = M(n, "quicksilver");
  if (t.dash = Math.round(T.dashCooldown * (1 - i * 0.08)), t.dashTime = T.dashTicks, t.dashAngle = e.move ? rt(e.move) : t.facing, t.invulnerable = T.dashTicks + 2, M(n, "storm-step") && X(a, t, "storm", 1.7 + M(n, "storm-step") * 0.15, 0, 70, 6 + M(n, "storm-step") * 3, !0), M(n, "trapper") && X(a, t, "frost", 1.8, 12, 110, 5 * M(n, "trapper"), !0), M(n, "minefield") && X(a, t, "mine", 2 + M(n, "minefield") * 0.2, 12, 180, 25 * M(n, "minefield"), !0), M(n, "smoke")) {
    for (const l of a.enemies) S(l, t) < 3 + M(n, "smoke") * 0.4 && (ze(a, l, 30 + M(n, "smoke") * 8), l.exposed = 65);
    se(a, t, "guard", 3);
  }
}
function Dt(a, e, n) {
  const t = a.player;
  for (const u of [
    "attack",
    "dash",
    "skill",
    "invulnerable",
    "swing",
    "shield",
    "guard"
  ]) t[u] = Math.max(0, t[u] - 1);
  const i = a.enemies.filter((u) => u.hp > 0).sort((u, s) => S(t, u) - S(t, s))[0];
  e.dash && !t.dash && !t.dashTime && Wt(a, e, n);
  const l = {
    x: t.x,
    y: t.y
  };
  if (t.dashTime > 0)
    Ae(a, t, t.dashAngle, T.speed * 3.6, T.playerRadius), t.dashTime--, !t.dashTime && M(n, "momentum") && i && S(t, i) < 3 && Aa(a, i, n, 10 + M(n, "momentum") * 5);
  else if (e.move) {
    t.facing = rt(e.move);
    const u = t.swing > 0;
    let s = T.speed * (u ? _e[n.weapon].moveFire : 1);
    M(n, "quicksilver") && t.dash > T.dashCooldown / 2 && (s *= 1 + M(n, "quicksilver") * 0.1), a.hazards.some((c) => !c.friendly && c.kind === "frost" && !c.wait && S(c, t) < c.radius) && (s *= 0.65), Ae(a, t, t.facing, s, T.playerRadius);
  }
  t.travel += S(l, t), M(n, "pilgrim") && t.travel >= 28 && (t.travel -= 28, ta(t, M(n, "pilgrim") * 6, 35)), M(n, "wardstone") && a.tick - t.lastHit > 150 && a.tick % 30 === 0 && ta(t, 2, M(n, "wardstone") * 10), e.skill && !t.skill && (i && (t.facing = ee(t, i)), Ft(a, n, i));
  const o = _e[n.weapon].range + (n.weapon === "blade" || n.weapon === "daggers" ? M(n, "piercing") * 0.25 : 0);
  if (i && !t.attack && S(t, i) <= o + J[i.kind].radius && (Na(a, n, i), t.combo++, M(n, "echo") && t.combo % Math.max(2, ye.echoEvery + 1 - M(n, "echo")) === 0 && Na(a, n, i, !0), t.attack = Math.round(_e[n.weapon].period * (M(n, "focus") ? ye.focusAttack : 1))), M(n, "orbit") && a.tick % Math.round(ye.orbitTicks / (1 + M(n, "orbit") * 0.25)) === 0 && i && S(t, i) < 4.5 && Aa(a, i, n, 12 + M(n, "orbit") * 3), M(n, "orbitals") && a.tick % 35 === 0) {
    for (const u of a.enemies) S(t, u) < 2.5 + M(n, "orbitals") * 0.35 && (Me(a, u, 12 * M(n, "orbitals"), n, "passive"), u.chill = Math.max(u.chill, 30));
    se(a, t, "burst", 2.8);
  }
  return {
    x: t.x - l.x,
    y: t.y - l.y
  };
}
function Ut(a, e) {
  if (e.weapon === "grimoire" && a.tick % 45 === 1) {
    const n = 2 + M(e, "pack-bond");
    a.companions.filter((t) => t.kind === "familiar" && t.hp > 0).length < n && Za(a, "familiar", Ce(a.player, a.tick, 1), 36e3);
  }
  for (const n of a.companions) {
    n.life--, n.cooldown = Math.max(0, n.cooldown - 1), n.kind === "familiar" && (n.empowered = Math.max(0, n.empowered - 1));
    const t = a.enemies.filter((l) => l.hp > 0).sort((l, o) => S(l, n) - S(o, n))[0];
    if (n.hp <= 0 || n.life <= 0 || !t) continue;
    n.angle = ee(n, t), n.kind !== "turret" && (S(n, a.player) > 8 ? Ae(a, n, ee(n, a.player), 0.19, 0.25) : S(n, t) > 1.3 && Ae(a, n, n.angle, 0.14 + M(e, "frenzy") * 0.015, 0.25));
    const i = n.kind === "turret" ? 8 : 1.8;
    if (!n.cooldown && S(n, t) < i) if (n.kind === "turret")
      $e(a, n, n.angle, _e.cannon.skill * (1 + n.empowered * 0.15), !0, {
        source: "companion",
        speed: 0.35
      }), n.cooldown = 28 - n.empowered * 3;
    else {
      const l = n.kind === "familiar" && n.empowered > 0;
      Me(a, t, n.kind === "shade" ? 9 + n.empowered * 4 : (l ? 17 : 10) * (1 + M(e, "covenant") * 0.15), e, "companion", n), se(a, n, "slash", 1.2, n.angle), n.cooldown = Math.round((l ? 20 : 32) / (1 + M(e, "frenzy") * 0.18));
    }
  }
  for (const n of a.companions) n.hp <= 0 && n.kind === "familiar" && M(e, "martyr") && (ot(a, M(e, "martyr")), X(a, n, "slam", 2.2, 0, 1, 15 * M(e, "martyr"), !0));
  a.companions = a.companions.filter((n) => n.hp > 0 && n.life > 0);
}
var Ve = Object.freeze({
  ritualTicks: 330,
  survivalTicks: 1500,
  pursuitInterval: 390,
  reinforcementInterval: 270,
  warningAfter: 1800
}), Ba = [
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
function ka(a, e) {
  if (a.wave++, a.boss) {
    he(a, a.bossKind, {
      x: 0,
      y: -5
    });
    return;
  }
  const n = Ot[a.zone].mobs, t = 4 + a.chapter + (a.elite ? 2 : 0) + (e.oaths.includes("legion") ? 2 : 0);
  for (let i = 0; i < t; i++) {
    const l = je * i / t + (a.wave - 1) * 0.8;
    let o = n[(i + a.wave - 1) % n.length];
    a.wave === 1 && a.chapter === 0 && i < 2 && (o = n[0]), a.encounter === "pursuit" && i === 0 && (o = "stalker"), a.encounter === "siege" && i === 0 && (o = "guard"), he(a, o, {
      x: Math.cos(l) * 8.7,
      y: Math.sin(l) * 8.7
    });
  }
}
function Gt(a, e) {
  if (a.boss) return;
  const n = a.objective, t = a.enemies.some((i) => i.hp > 0);
  if (a.encounter === "ritual") {
    n.progress < n.target && S(a.player, n) < 2.5 && !a.enemies.some((l) => l.hp > 0 && S(l, n) < 2.2) && n.progress++;
    const i = Math.min(2, Math.floor(n.progress / Ve.ritualTicks));
    n.x = Ba[i].x, n.y = Ba[i].y, a.tick % Ve.reinforcementInterval === 0 && n.progress < n.target && a.enemies.length < 8 && he(a, a.chapter ? "wisp" : "stalker", {
      x: n.x > 0 ? -9 : 9,
      y: it(a) * 12 - 6
    });
  } else if (a.encounter === "survival")
    n.progress = Math.min(n.target, n.progress + 1), a.tick % Ve.reinforcementInterval === 0 && n.progress < n.target && a.enemies.length < 10 && ka(a, e), a.tick % 150 === 0 && X(a, {
      x: 0,
      y: 0
    }, "ring", 15, 35, 90, 12, !1, { inner: Math.max(4.8, 9 - a.tick / 400) });
  else if (a.encounter === "pursuit")
    n.progress = a.tick % Ve.pursuitInterval, a.wave < a.waves && n.progress === 0 && ka(a, e);
  else if (a.encounter === "crossfire" && a.tick % 150 === 0) {
    const i = a.tick % 300 === 0, l = Math.round((i ? a.player.y : a.player.x) / 3) * 3;
    pe(a, i ? {
      x: -10,
      y: l
    } : {
      x: l,
      y: -10
    }, i ? 0 : Math.PI / 2, 20, 0.65, 36, 15);
  }
  a.tick > Ve.warningAfter && a.tick % 180 === 0 && X(a, a.player, "fire", 2.2, 36, 90, 13), !t && a.wave < a.waves && a.encounter !== "survival" ? ++a.nextWave >= 40 && (a.nextWave = 0, ka(a, e)) : t && (a.nextWave = 0);
}
function Kt(a) {
  return a.enemies.some((e) => e.hp > 0) ? !1 : !a.boss && a.encounter === "survival" ? a.objective.progress >= a.objective.target : !a.boss && a.encounter === "ritual" ? a.objective.progress >= a.objective.target && a.wave >= a.waves : a.wave >= a.waves;
}
var Be = (a, e) => {
  a.motion = e, a.motionAngle = ee(a, a.target), a.stun = 18;
}, Vt = {
  warden(a, e) {
    const n = e.pattern % 3, t = Ea.warden.damage;
    if (n === 0)
      Be(e, 24), pe(a, e, e.motionAngle, 13, 1.1, 18, t);
    else if (n === 1) {
      for (let i = -1; i <= 1; i++) Se(a, Ce(e, e.angle + i * 0.55, 3.5), 1.8, 12 + Math.abs(i) * 8, t);
      e.exposed = 65;
    } else
      Te(a, e, e.angle, 5 + e.phase * 2, 1.5, t * 0.65), e.phase > 1 && he(a, "guard", {
        x: -7,
        y: -7
      });
  },
  thornheart(a, e) {
    const n = e.pattern % 4;
    if (n === 0) for (let t = 0; t < 5; t++) X(a, Ce(e.target, t * je / 5, 3.6), "poison", 1.4, 26, 110, 12);
    else if (n === 1)
      X(a, e, "ring", 7.5, 25, 14, 22, !1, { inner: 3 }), e.exposed = 80;
    else if (n === 2) for (const t of [-7, 7]) he(a, "stalker", {
      x: t,
      y: -6
    });
    else for (let t = 0; t < 3 + e.phase; t++) pe(a, e, e.angle + t * je / (3 + e.phase), 15, 0.55, 25, 18);
  },
  weaver(a, e) {
    const n = e.pattern % 4;
    if (n === 0)
      e.x = e.target.x > 0 ? -7 : 7, e.y = -5, se(a, e, "burst", 2), pe(a, {
        x: -10,
        y: e.target.y
      }, 0, 20, 0.7, 30, 21), pe(a, {
        x: e.target.x,
        y: -10
      }, Math.PI / 2, 20, 0.7, 42, 21);
    else if (n === 1) Te(a, e, ee(e, a.player), 7 + e.phase, 1.8, 13, 0.2);
    else if (n === 2) {
      for (let t = 0; t < 4; t++) {
        const i = Ce({
          x: 0,
          y: 0
        }, t * Math.PI / 2 + Math.PI / 4, 7);
        pe(a, i, ee(i, {
          x: 0,
          y: 0
        }), 11, 0.6, 25 + t * 8, 18);
      }
      e.exposed = 75;
    } else
      he(a, "wisp", {
        x: -7,
        y: 5
      }), he(a, "wisp", {
        x: 7,
        y: 5
      });
  },
  astrologer(a, e) {
    const n = e.pattern % 3, t = e.pattern * 0.53;
    if (n === 0) for (let i = 0; i < 7; i++)
      i !== e.phase && pe(a, e, t + i * je / 7, 18, 0.6, 32, 23);
    else if (n === 1) for (let i = 0; i < 6; i++) {
      const l = Ce({
        x: 0,
        y: 0
      }, i * je / 6, 9);
      Te(a, l, ee(l, e.target), 2 + e.phase, 0.45, 12, 0.16);
    }
    else
      Se(a, e.target, 2, 18, 24), X(a, {
        x: 0,
        y: 0
      }, "ring", 10.5, 38, 12, 22, !1, { inner: 5.5 }), e.exposed = 90;
  },
  king(a, e) {
    const n = e.pattern % 4;
    if (n === 0)
      Be(e, 18), pe(a, e, e.motionAngle, 10, 0.9, 18, 24);
    else if (n === 1) for (let t = 0; t < 2 + e.phase; t++) Se(a, Ce(e, e.angle + (t % 2 ? 0.65 : -0.65), 3), 2, 7 + t * 10, 23);
    else n === 2 ? (pe(a, {
      x: -10,
      y: 0
    }, 0, 20, 0.8, 22, 26), pe(a, {
      x: 0,
      y: -10
    }, Math.PI / 2, 20, 0.8, 35, 26), e.exposed = 65) : (Te(a, e, e.angle, 3, 0.55, 18, 0.29), e.phase > 1 && (he(a, "stalker", {
      x: -8,
      y: 3
    }), he(a, "archer", {
      x: 8,
      y: -3
    })));
  },
  phoenix(a, e) {
    const n = e.pattern % 4;
    if (n === 0) {
      Be(e, 28);
      for (let t = 0; t < 6; t++) X(a, Ce(e, e.motionAngle, t * 2), "fire", 1.2, 20 + t * 4, 95, 13);
    } else if (n === 1) Qa(a, e, 10 + e.phase * 2, e.pattern * 0.32, 13, 0.17);
    else if (n === 2)
      e.x = 0, e.y = 0, X(a, e, "ring", 9, 30, 15, 25, !1, { inner: 3.5 }), e.exposed = 85;
    else for (const t of [{
      x: -6,
      y: -5
    }, {
      x: 6,
      y: 5
    }]) he(a, "bomber", t);
  },
  forgemaster(a, e) {
    const n = e.pattern % 4;
    if (n === 0) for (const t of [
      -7,
      0,
      7
    ]) pe(a, {
      x: t,
      y: -10
    }, Math.PI / 2, 20, 1.1, 26, 24);
    else if (n === 1) for (let t = -1; t <= 1; t++) X(a, {
      x: e.target.x + t * 2.5,
      y: e.target.y
    }, "fire", 1.6, 28 + Math.abs(t) * 7, 100, 14);
    else n === 2 ? (Se(a, e, 4, 18, 26), e.exposed = 100) : (he(a, "bomber", {
      x: -8,
      y: 5
    }), e.phase > 1 && he(a, "guard", {
      x: 8,
      y: 5
    }));
  },
  colossus(a, e) {
    const n = e.pattern % 3;
    if (n === 0) for (let t = 0; t < 3; t++) X(a, e, "ring", 3 + t * 3, 20 + t * 19, 9, 23, !1, { inner: 1.4 + t * 3 });
    else if (n === 1)
      Be(e, 30), pe(a, e, e.motionAngle, 18, 1.4, 18, 27);
    else {
      for (const t of [-1, 1]) Se(a, {
        x: e.target.x + t * 2,
        y: e.target.y
      }, 2.7, 30, 25);
      e.exposed = 110;
    }
  },
  frostqueen(a, e) {
    const n = e.pattern % 4;
    if (n === 0) for (let t = 0; t < 4; t++) X(a, Ce(e.target, t * Math.PI / 2, 3), "frost", 1.8, 24, 100, 10);
    else n === 1 ? Te(a, e, e.angle, 9, 2.2, 14, 0.21) : n === 2 ? (e.x = -e.x, e.y = -e.y, pe(a, e, ee(e, e.target), 20, 1.2, 32, 24), e.exposed = 85) : (X(a, {
      x: 0,
      y: 0
    }, "ring", 10.5, 32, 18, 22, !1, { inner: 5 }), he(a, "stalker", {
      x: 0,
      y: -8
    }));
  },
  leviathan(a, e) {
    const n = e.pattern % 4;
    if (n === 0)
      e.x = -9, e.y = e.target.y, e.target = {
        x: 9,
        y: e.y
      }, Be(e, 40), pe(a, e, 0, 19, 1.4, 14, 25);
    else if (n === 1) for (let t = 0; t < 4; t++) pe(a, {
      x: -10,
      y: -8 + t * 5
    }, 0, 20, 0.7, 20 + t * 13, 20);
    else n === 2 ? (Se(a, e.target, 3.8, 28, 26), e.exposed = 95) : (X(a, {
      x: 0,
      y: 0
    }, "ring", 10, 26, 14, 23, !1, { inner: e.phase > 1 ? 4 : 6 }), Te(a, e, e.angle, 5, 1.3, 14));
  },
  archivist(a, e) {
    const n = e.pattern % 4;
    if (n === 0)
      e.memory.push({ ...e.target }), e.memory = e.memory.slice(-4), Se(a, e.target, 2.3, 24, 21);
    else if (n === 1) for (let t = 0; t < e.memory.length; t++) Se(a, e.memory[t], 2.6, 22 + t * 8, 24);
    else if (n === 2) {
      for (const t of e.memory) pe(a, t, ee(t, e.target), 18, 0.65, 32, 22);
      he(a, "wisp", {
        x: -7,
        y: -7
      }), he(a, "wisp", {
        x: 7,
        y: 7
      });
    } else
      Qa(a, e, 12, e.pattern * 0.2, 14), e.exposed = 100;
  },
  voidknight(a, e) {
    const n = e.pattern % 4;
    if (n === 0)
      e.x = Math.max(-8, Math.min(8, -e.target.x)), e.y = Math.max(-8, Math.min(8, -e.target.y)), se(a, e, "burst", 2), pe(a, e, ee(e, e.target), 20, 0.8, 24, 26);
    else if (n === 1)
      Be(e, 20), Te(a, e, e.angle, 3 + e.phase, 0.9, 15, 0.26);
    else if (n === 2)
      Se(a, e, 3, 12, 26), X(a, e, "ring", 7, 30, 10, 22, !1, { inner: 3.5 }), e.exposed = 65;
    else for (const t of [{
      x: e.target.x,
      y: -9
    }, {
      x: -9,
      y: e.target.y
    }]) pe(a, t, ee(t, e.target), 20, 0.6, 22, 23);
  }
};
function Yt(a, e, n) {
  const t = e.kind, i = e.hp / e.maxHp < 0.3 ? 3 : e.hp / e.maxHp < 0.65 ? 2 : 1;
  i > e.phase && (e.phase = i, se(a, e, "burst", 4), t === "phoenix" && i === 2 && (e.hp = Math.min(e.maxHp, e.hp + e.maxHp * 0.12), X(a, e, "fire", 3, 25, 100, 14)), t === "archivist" && (e.memory.push({
    x: a.player.x,
    y: a.player.y
  }), e.memory = e.memory.slice(-4)), n.oaths.includes("legion") && he(a, "stalker", {
    x: e.x > 0 ? -8 : 8,
    y: 6
  })), Vt[t](a, e), e.pattern++;
}
function Xt(a, e) {
  if (!ue(e.kind)) {
    const n = a.companions.filter((t) => t.hp > 0 && t.life > 0 && S(t, e) < 2.8).sort((t, i) => S(t, e) - S(i, e))[0];
    if (n) return n;
    if (a.encounter === "siege" && !a.boss && (e.kind === "soldier" || e.kind === "guard" || e.kind === "charger") && S(e, a.player) > 3) return a.objective;
  }
  return a.player;
}
function Jt(a, e, n, t) {
  const i = J[e.kind];
  S(e.target, a.player) < t && S(e, a.player) < i.reach + 1 && fa(a, i.damage, n);
  for (const l of a.companions) S(e.target, l) < t && S(e, l) < i.reach + 1 && (l.hp -= i.damage);
  !a.boss && a.encounter === "siege" && S(e.target, a.objective) < t && S(e, a.objective) < i.reach + 1 && (a.objective.hp = Math.max(0, a.objective.hp - i.damage * 0.5)), se(a, e.target, "slash", t, e.angle);
}
function en(a, e, n) {
  const t = J[e.kind];
  if (ue(e.kind)) {
    Yt(a, e, n);
    return;
  }
  switch (e.kind) {
    case "archer":
      Te(a, e, e.angle, a.chapter > 0 ? 3 : 2, 0.36, t.damage, 0.24);
      break;
    case "priest":
      for (const i of a.enemies) i.hp > 0 && !ue(i.kind) && S(i, e) < 3.5 && (i.hp = Math.min(i.maxHp, i.hp + 8));
      Te(a, e, e.angle, 3, 0.7, t.damage, 0.18), se(a, e, "heal", 3.5);
      break;
    case "charger":
      e.motion = 23, e.motionAngle = e.angle;
      break;
    case "bomber":
      X(a, e.target, "fire", 1.9, 23, 75, t.damage);
      break;
    case "wisp":
      $e(a, e, e.angle, t.damage, !1, { speed: 0.3 }), e.motion = 7, e.motionAngle = e.angle + Math.PI / 2;
      break;
    case "guard":
      Se(a, e.target, 1.7, 8, t.damage);
      break;
    default:
      Jt(a, e, n, t.reach + 0.15);
  }
}
function an(a, e, n) {
  const t = J[e.kind], i = {
    x: e.x,
    y: e.y
  }, l = e.kind === "leviathan" ? 0.44 : e.kind === "wisp" ? 0.24 : 0.32;
  if (Ae(a, e, e.motionAngle, l, t.radius), e.motion--, e.kind !== "wisp") {
    S(e, a.player) < t.radius + 0.4 && fa(a, t.damage, n);
    for (const o of a.companions) S(e, o) < t.radius + 0.3 && (o.hp -= t.damage, e.motion = 0);
    !a.boss && a.encounter === "siege" && S(e, a.objective) < t.radius + 0.6 && (a.objective.hp = Math.max(0, a.objective.hp - t.damage * 0.5), e.motion = 0), S(i, e) < l * 0.65 && (e.motion = 0, e.exposed = 80, e.stun = 24, se(a, e, "guard", 2));
  }
  e.motion || (e.cooldown = Math.max(e.cooldown, 28));
}
function tn(a, e, n) {
  for (const t of [...a.enemies]) {
    if (t.hp <= 0) continue;
    for (const c of [
      "marked",
      "chill",
      "exposed"
    ]) t[c] = Math.max(0, t[c] - 1);
    for (const c of [
      "burn",
      "bleed",
      "poison"
    ]) t[c] > 0 && (t[c]--, a.tick % 15 === 0 && Me(a, t, 2 + (c === "burn" ? M(e, "cinder") + M(e, "inferno") : c === "bleed" ? M(e, "hemorrhage") + M(e, "blood-dance") : M(e, "venom")) * 1.5, e, "passive"));
    if (t.hp <= 0) continue;
    if (t.stun > 0) {
      t.stun--;
      continue;
    }
    if (t.motion > 0) {
      an(a, t, e);
      continue;
    }
    const i = J[t.kind], l = e.oaths.includes("haste");
    if (t.windup > 0) {
      --t.windup === 0 && (en(a, t, e), t.cooldown = Math.round(i.cooldown * (l ? 0.8 : 1) / (ue(t.kind) ? 1 + (t.phase - 1) * 0.12 : 1)));
      continue;
    }
    const o = Xt(a, t), u = S(t, o);
    if (t.cooldown = Math.max(0, t.cooldown - 1), t.angle = ee(t, o), !t.cooldown && u < i.reach) {
      if (t.target = {
        x: o.x,
        y: o.y
      }, t.windup = Math.round(i.windup * (l ? 0.8 : 1)), o === a.player && (t.kind === "archer" || t.kind === "bomber")) {
        const c = Math.min(t.windup + u / 0.24, 4.5 / Math.max(1e-3, Math.hypot(n.x, n.y)));
        t.target.x = Math.max(-10, Math.min(10, o.x + n.x * c)), t.target.y = Math.max(-10, Math.min(10, o.y + n.y * c)), t.angle = ee(t, t.target);
      }
      continue;
    }
    const s = t.kind === "archer" || t.kind === "priest" || t.kind === "bomber" || t.kind === "wisp";
    if (u > (s ? 5 : ue(t.kind) ? 2.8 : 0.95) || s && u < 3) {
      const c = t.kind === "stalker" && u > 3 ? t.id % 2 ? 0.28 : -0.28 : 0;
      Ae(a, t, t.angle + (s && u < 3 ? Math.PI : c), i.speed * (t.chill ? ue(t.kind) ? 0.8 : 0.5 : 1) * (l ? 1.08 : 1), i.radius);
    }
    for (const c of a.enemies) c.id !== t.id && c.hp > 0 && S(t, c) < i.radius + J[c.kind].radius && Ae(a, t, ee(c, t), 0.027, i.radius);
  }
}
function oa(a, e, n) {
  if (a.kind === "beam") return Nt(e, a, a.angle, a.length) < a.width + n;
  const t = S(a, e);
  return t < a.radius + n && (a.kind !== "ring" || t > a.inner - n);
}
function nn(a, e) {
  for (const n of a.shots)
    if (!(n.life <= 0)) {
      if (n.x += Math.cos(n.angle) * n.speed, n.y += Math.sin(n.angle) * n.speed, n.life--, Math.abs(n.x) > T.arena || Math.abs(n.y) > T.arena || a.obstacles.some((t) => S(t, n) < t.radius + n.radius)) {
        n.life = 0;
        continue;
      }
      if (!n.friendly) {
        if (S(n, a.player) < T.playerRadius + n.radius) a.player.shield > 0 ? (lt(a, e), n.friendly = !0, n.source = "skill", n.angle += Math.PI, n.damage *= 1.8, n.hits = []) : (fa(a, n.damage, e), n.life = 0);
        else {
          const t = a.companions.find((i) => i.hp > 0 && S(n, i) < 0.3 + n.radius);
          t && (t.hp -= n.damage * (1 - M(e, "covenant") * 0.12), n.life = 0);
        }
        continue;
      }
      for (const t of a.enemies) {
        if (t.hp <= 0 || n.hits.includes(t.id) || S(t, n) > J[t.kind].radius + n.radius) continue;
        n.hits.push(t.id);
        const i = n.damage * (M(e, "hunter") && S(t, a.player) > ye.hunterRange ? ye.hunterDamage + (M(e, "hunter") - 1) * 0.15 : 1);
        if (Me(a, t, i, e, n.source, n), M(e, "pinning") && n.source === "attack" && (t.chill = 50 + M(e, "pinning") * 20, a.player.combo % 3 === 0 && ze(a, t, 8 * M(e, "pinning"))), n.splash > 0) {
          se(a, t, "burst", n.splash);
          for (const l of a.enemies) l.id !== t.id && S(l, t) < n.splash + J[l.kind].radius && Me(a, l, i * 0.55, e, n.source, t);
        }
        if (n.bounce > 0) {
          const l = a.enemies.filter((o) => o.hp > 0 && !n.hits.includes(o.id) && S(o, t) < 6).sort((o, u) => S(t, o) - S(t, u))[0];
          if (l) {
            n.bounce--, n.angle = ee(n, l), n.damage *= 0.8;
            break;
          }
        }
        if (n.pierce-- <= 0) {
          n.life = 0;
          break;
        }
      }
    }
  a.shots = a.shots.filter((n) => n.life > 0);
}
function sn(a, e) {
  for (const n of [...a.hazards]) {
    if (n.wait > 0) {
      n.wait--;
      continue;
    }
    if (n.life--, !n.friendly) {
      if (oa(n, a.player, T.playerRadius) && fa(a, n.damage, e), !a.boss && a.encounter === "siege" && a.tick % 15 === 0 && oa(n, a.objective, 0.6) && (a.objective.hp = Math.max(0, a.objective.hp - n.damage * 0.35)), a.tick % 15 === 0 || n.kind === "slam" || n.kind === "beam" || n.kind === "ring")
        for (const i of a.companions) oa(n, i, 0.3) && (i.hp -= n.damage * 0.25);
      continue;
    }
    if (n.kind !== "slam" && n.kind !== "mine" && a.tick % 15 !== 0) continue;
    const t = a.enemies.filter((i) => i.hp > 0 && oa(n, i, J[i.kind].radius));
    n.kind === "mine" && t.length && (n.life = 0, se(a, n, "burst", n.radius));
    for (const i of t) n.kind === "storm" ? Aa(a, i, e, n.damage) : (n.kind === "fire" && (i.burn = Math.max(i.burn, 45)), n.kind === "frost" && (i.chill = Math.max(i.chill, 60)), n.kind === "mine" && ze(a, i, 25), Me(a, i, n.damage, e, n.source, n));
  }
  a.hazards = a.hazards.filter((n) => n.life > 0);
}
function rn(a, e) {
  nn(a, e), sn(a, e);
}
function on(a, e, n) {
  if (a.status !== "fighting") return;
  a.tick++, a.effects = a.effects.filter((i) => --i.life > 0).slice(-80);
  const t = Dt(a, e, n);
  Ut(a, n), tn(a, n, t), rn(a, n), a.enemies = a.enemies.filter((i) => i.hp > 0), a.player.hp <= 0 || !a.boss && a.encounter === "siege" && a.objective.hp <= 0 ? a.status = "lost" : (Gt(a, n), Kt(a) && (a.status = "won", a.shots = [], a.hazards = []));
}
function ln(a, e) {
  const n = a.at(-1);
  n && n.move === e.move && n.dash === e.dash && n.skill === e.skill ? n.ticks++ : a.push({
    ...e,
    ticks: 1
  });
}
var We = {
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
function Fa(a, e) {
  const n = We[e];
  return e === "traveler" || a.purchases.some((t) => t.id === e) || n.achievement !== null && a.awards.some((t) => t.key === n.achievement);
}
function cn(a) {
  const e = new Set(a.awards.map((n) => n.key));
  return {
    bossClears: Lt.filter((n) => e.has(Ea[n].awardKey)),
    mastered: Object.keys(_e).filter((n) => e.has(`mastery-${n}`)),
    oathWins: ca.filter((n) => e.has(`oath-${n}`))
  };
}
var la = (a) => [
  "won",
  "lost",
  "abandoned"
].includes(a.phase), ct = (a) => Math.floor(a.step / T.zoneSteps), ut = (a) => a.regions[ct(a)];
function Ye(a, e) {
  return cn(a).bossClears.length >= _e[e].unlock;
}
function un(a) {
  return Math.floor(T.restHeal * (a.oaths.includes("scarcity") ? 0.5 : 1));
}
function Wa(a) {
  return (!a || typeof a != "object" || Array.isArray(a)) && Le("invalid"), a;
}
function xa(a, e = 0, n = Number.MAX_SAFE_INTEGER) {
  return (!Number.isSafeInteger(a) || Number(a) < e || Number(a) > n) && Le("invalid"), a;
}
function pa(a, e) {
  return (typeof a != "string" || !e.includes(a)) && Le("invalid"), a;
}
function dt(a, e, n) {
  return (!Array.isArray(a) || a.length > e) && Le("invalid"), a.map(n);
}
function dn(a) {
  return new Set(a).size !== a.length && Le("invalid"), a;
}
function Da(a) {
  typeof a != "boolean" && Le("invalid");
}
var fn = (a) => pa(a, Ht), Ua = (a) => pa(a, _a), Ga = (a) => pa(a, ua), pn = (a) => dn(dt(a, ca.length, (e) => pa(e, ca)));
function hn(a) {
  const e = Wa(a);
  switch (e.type) {
    case "start":
      return {
        type: "start",
        weapon: fn(e.weapon),
        outfit: Ga(e.outfit),
        oaths: pn(e.oaths)
      };
    case "purchase":
    case "equip":
      return {
        type: e.type,
        id: Ga(e.id)
      };
    case "route":
      return {
        type: "route",
        id: xa(e.id, 0, 2)
      };
    case "input": {
      const n = dt(e.spans, T.maxInputTicks, (t) => {
        const i = Wa(t);
        return Da(i.dash), Da(i.skill), {
          move: xa(i.move, 0, 8),
          dash: i.dash,
          skill: i.skill,
          ticks: xa(i.ticks, 1, T.maxInputTicks)
        };
      });
      return (!n.length || n.reduce((t, i) => t + i.ticks, 0) > T.maxInputTicks) && Le("invalid"), {
        type: "input",
        spans: n
      };
    }
    case "relic":
      return {
        type: "relic",
        id: Ua(e.id),
        replace: e.replace === null ? null : Ua(e.replace)
      };
    case "supply":
    case "leave":
    case "rest":
    case "sacrifice":
    case "abandon":
      return { type: e.type };
    default:
      return Le("invalid");
  }
}
function mn(a, e) {
  const n = $a(null), t = Y(!1), i = Y(""), l = $a(null);
  let o = !1, u = null;
  const s = oe(() => t.value || !!l.value || !n.value?.ready || n.value.writeState !== "ready" || n.value.pending);
  function c(x) {
    !o && (!n.value || x.data.revision >= n.value.data.revision) && (n.value = x);
  }
  async function m(x, d) {
    if (o || t.value) return !1;
    t.value = !0, u = null, i.value = "";
    try {
      const p = await a.request(`game/expedition/${x}`, {
        chatIdentity: e,
        ...d
      }, 35e3), k = u;
      return c(k && k.data.revision >= p.result.data.revision ? k : p.result), n.value?.writeState === "ready" && !n.value.pending && x !== "read" && (l.value = null), !0;
    } catch (p) {
      if (!o) {
        u && c(u), i.value = jt(p);
        const k = p && typeof p == "object" && "code" in p ? String(p.code) : "";
        d && (k.startsWith("expedition_save_") || k.startsWith("host_request_")) && (l.value = d);
      }
      return !1;
    } finally {
      o || (t.value = !1);
    }
  }
  const f = a.subscribe((x) => {
    if (o || x.type !== "game/expedition/state") return;
    const d = x.payload;
    d.chatIdentity === e && (t.value ? u = d.state : c(d.state));
  });
  async function h() {
    const x = l.value;
    return !await m("confirm") || !n.value || n.value.writeState !== "ready" || n.value.pending ? !1 : x && n.value.data.revision === x.revision ? m("act", x) : (l.value = null, !0);
  }
  return {
    view: n,
    busy: t,
    error: i,
    blocked: s,
    failed: l,
    notice: oe(() => i.value || (n.value && (n.value.pending || n.value.writeState !== "ready") ? g.saveError : "")),
    read: () => m("read"),
    recover: h,
    act: (x) => s.value ? Promise.resolve(!1) : m("act", {
      actionId: Qt(),
      revision: n.value.data.revision,
      command: hn(x)
    }),
    dispose() {
      o = !0, f();
    }
  };
}
var ft = [
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
], vn = {
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
}, ba = Object.fromEntries(Object.entries(st).map(([a, e]) => [a, vn[e.family]]));
function gn(a, e, n) {
  const t = /* @__PURE__ */ new Set();
  let i = {
    x: 0,
    y: 0
  }, l = !1, o = !1;
  const u = [
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
  function s(h) {
    if (!(!u.includes(h.code) || h.target instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(h.target.tagName)) && !(h.code === "Space" && h.target instanceof HTMLElement && h.target.closest("button"))) {
      if (h.preventDefault(), h.stopPropagation(), n(), h.code === "Escape") {
        h.repeat || e();
        return;
      }
      t.add(h.code), !h.repeat && h.code === "Space" && (l = !0), !h.repeat && h.code === "KeyE" && (o = !0);
    }
  }
  function c(h) {
    t.delete(h.code);
  }
  function m() {
    t.clear(), i = {
      x: 0,
      y: 0
    }, l = !1, o = !1;
  }
  function f() {
    m(), e();
  }
  return a.addEventListener("keydown", s), window.addEventListener("keyup", c), window.addEventListener("blur", f), {
    frame() {
      const h = i.x || Number(t.has("KeyD") || t.has("ArrowRight")) - Number(t.has("KeyA") || t.has("ArrowLeft")), x = i.y || Number(t.has("KeyS") || t.has("ArrowDown")) - Number(t.has("KeyW") || t.has("ArrowUp")), d = {
        move: Math.hypot(h, x) < 0.15 ? 0 : (Math.round((Math.atan2(x, h) + Math.PI / 2) / (Math.PI / 4)) + 8 - 1) % 8 + 1,
        dash: l,
        skill: o
      };
      return l = !1, o = !1, d;
    },
    stick(h, x) {
      i = {
        x: h,
        y: x
      };
    },
    dash() {
      l = !0, n();
    },
    skill() {
      o = !0, n();
    },
    clear: m,
    dispose() {
      m(), a.removeEventListener("keydown", s), window.removeEventListener("keyup", c), window.removeEventListener("blur", f);
    }
  };
}
function pt() {
  const a = new La();
  a.absarc(0, 0, 1.1, 0, Math.PI, !1), a.lineTo(-0.86, 0), a.absarc(0, 0, 0.86, Math.PI, 0, !0), a.closePath();
  const e = {
    box: new Zt(1, 1, 1),
    sphere: new bt(1, 20, 14),
    rock: new Pt(1, 0),
    cylinder: new It(1, 1, 1, 12),
    cone: new Ct(1, 1, 8),
    disc: new At(1, 48),
    ring: new ja(0.965, 1, 64),
    arc: new ja(0.77, 1, 40, 1, -0.2, Math.PI * 1.3),
    torus: new za(1, 0.08, 6, 32),
    crescent: new za(1, 0.14, 6, 24, Math.PI * 1.45),
    arch: new Et(a, {
      depth: 1,
      bevelEnabled: !1,
      curveSegments: 24
    }).translate(0, 0, -0.5)
  }, n = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  function i(m, f = !1, h = 1, x = !1) {
    const d = `${m}/${f}/${h}/${x}`;
    let p = t.get(d);
    return p || (p = f ? new Ra({
      color: m,
      transparent: h < 1,
      opacity: h,
      depthWrite: h === 1,
      side: 2
    }) : new wt({
      color: m,
      roughness: x ? 0.34 : 0.88,
      metalness: x ? 0.45 : 0.02,
      side: 2
    }), t.set(d, p)), p;
  }
  function l(m, f, h, x, d = [
    0,
    0,
    0
  ], p = !1, k = 1, w = !1) {
    const _ = new Je(e[f], i(h, p, k, w));
    return _.scale.set(...x), _.position.set(...d), _.castShadow = !p, _.receiveShadow = !p, m.add(_), _;
  }
  function o(m, f = [
    0,
    0,
    0
  ]) {
    const h = new aa();
    return h.position.set(...f), m.add(h), h;
  }
  function u(m, f, h, x, d, p = 1, k = !1, w = 0.04) {
    const _ = l(m, k ? "disc" : "ring", f, [
      h,
      h,
      1
    ], [
      x,
      w,
      d
    ], !0, p);
    return _.rotation.x = -Math.PI / 2, _;
  }
  function s(m, f, h, x = [
    0,
    0,
    0
  ]) {
    const d = JSON.stringify(f);
    let p = n.get(d);
    if (!p) {
      const w = new La();
      f.forEach(([_, C], P) => P ? w.lineTo(_, C) : w.moveTo(_, C)), w.closePath(), p = new _t(w), n.set(d, p);
    }
    const k = new Je(p, i(h));
    return k.position.set(...x), k.castShadow = !0, m.add(k), k;
  }
  function c(m) {
    m.updateMatrixWorld(!0);
    const f = /* @__PURE__ */ new Map();
    m.traverse((x) => {
      if (!(x instanceof Je) || Array.isArray(x.material)) return;
      const d = (x.geometry.index ? x.geometry.toNonIndexed() : x.geometry.clone()).applyMatrix4(x.matrixWorld), p = f.get(x.material) ?? [];
      p.push(d), f.set(x.material, p);
    }), m.clear();
    const h = [];
    for (const [x, d] of f) {
      const p = zt(d);
      if (d.forEach((w) => w.dispose()), !p) throw new Error("expedition_geometry_merge");
      const k = new Je(p, x);
      k.castShadow = !(x instanceof Ra), k.receiveShadow = !0, m.add(k), h.push(p);
    }
    return () => {
      m.clear(), h.forEach((x) => x.dispose());
    };
  }
  return {
    mesh: l,
    group: o,
    ring: u,
    shape: s,
    material: i,
    bake: c,
    geometries: e,
    dispose() {
      Object.values(e).forEach((m) => m.dispose()), n.forEach((m) => m.dispose()), t.forEach((m) => m.dispose());
    }
  };
}
function yn(a, e, n, t) {
  const i = ft[n], l = T.arena, { mesh: o, group: u, ring: s } = a, c = (d, p, k, w = i.stone) => o(d, "box", w, p, k);
  function m(d, p, k, w = !0) {
    const _ = u(e, [
      d,
      0,
      p
    ]);
    c(_, [
      1.65,
      0.38,
      1.65
    ], [
      0,
      0.15,
      0
    ]), c(_, [
      1.3,
      0.3,
      1.3
    ], [
      0,
      0.49,
      0
    ], i.light), c(_, [
      0.91,
      k,
      0.91
    ], [
      0,
      k / 2 + 0.6,
      0
    ]);
    for (const C of [-0.38, 0.38]) c(_, [
      0.08,
      k - 0.35,
      0.12
    ], [
      C,
      k / 2 + 0.6,
      0.48
    ], i.light);
    return c(_, [
      1.3,
      0.24,
      1.3
    ], [
      0,
      k + 0.6,
      0
    ], i.light), c(_, [
      1.56,
      0.3,
      1.56
    ], [
      0,
      k + 0.85,
      0
    ], i.dark), w && (o(_, "cone", i.trim, [
      0.2,
      0.65,
      0.2
    ], [
      0,
      k + 1.24,
      0
    ]), c(_, [
      0.16,
      0.6,
      0.08
    ], [
      0,
      k - 0.15,
      0.52
    ], i.trim)), _;
  }
  function f(d, p, k, w) {
    m(d - k / 2, p, w - 2), m(d + k / 2, p, w - 2);
    const _ = u(e, [
      d,
      w - 2,
      p
    ]);
    o(_, "arch", i.light, [
      k / 2,
      2.3,
      1.15
    ]);
    for (let C = 1; C < 10; C++) {
      const P = C / 10 * Math.PI, $ = c(_, [
        0.025,
        0.64,
        0.025
      ], [
        Math.cos(P) * k * 0.49,
        Math.sin(P) * 2.25,
        0.59
      ], i.trim);
      $.rotation.z = P - Math.PI / 2;
    }
    c(_, [
      0.6,
      0.9,
      1.3
    ], [
      0,
      2.28,
      0
    ], i.trim);
  }
  function h(d, p, k = 1) {
    const w = u(e, [
      d,
      0,
      p
    ]);
    w.scale.setScalar(k);
    for (let _ = 0; _ < 5; _++) {
      const C = _ * 2.4, P = o(w, "rock", _ % 2 ? i.foliage : i.accent, [
        0.55,
        0.8 + _ % 2 * 0.3,
        0.45
      ], [
        Math.cos(C) * 0.4,
        0.5,
        Math.sin(C) * 0.4
      ]);
      P.rotation.z = Math.sin(C) * 0.4;
    }
    for (let _ = 0; _ < 3; _++) o(w, "rock", i.flower, [
      0.13,
      0.16,
      0.13
    ], [
      Math.sin(_ * 4) * 0.5,
      1,
      Math.cos(_ * 4) * 0.4
    ]);
  }
  function x(d, p, k) {
    const w = u(e, [
      d,
      0,
      p
    ]);
    w.scale.setScalar(k);
    const _ = o(w, "cylinder", i.dark, [
      0.15,
      3.5,
      0.19
    ], [
      0,
      1.65,
      0
    ]);
    _.rotation.z = -0.1;
    for (let C = 0; C < 6; C++) {
      const P = C * 2.4;
      o(w, "rock", C % 2 ? i.foliage : i.accent, [
        1.65,
        0.88,
        1.4
      ], [
        Math.cos(P) * 0.95,
        3 + Math.sin(P) * 0.5,
        Math.sin(P) * 0.85
      ]);
    }
  }
  c(e, [
    180,
    0.3,
    180
  ], [
    0,
    -4.1,
    0
  ], i.water);
  for (let d = 0; d < 16; d++) c(e, [
    3 + d % 4 * 2,
    0.015,
    0.055
  ], [
    Math.sin(d * 7) * 32,
    -3.92,
    Math.cos(d * 3) * 25
  ], i.haze);
  c(e, [
    l * 2 + 2.4,
    2.4,
    l * 2 + 2.4
  ], [
    0,
    -1.5,
    0
  ], i.dark), c(e, [
    l * 2 + 1.1,
    0.42,
    l * 2 + 1.1
  ], [
    0,
    -0.42,
    0
  ], i.trim), c(e, [
    l * 2 + 0.5,
    0.35,
    l * 2 + 0.5
  ], [
    0,
    -0.14,
    0
  ], i.floor);
  for (let d = -10; d <= 10; d += 2) for (let p = -10; p <= 10; p += 2) c(e, [
    1.96,
    0.045,
    1.96
  ], [
    d,
    0.025,
    p
  ], (d * 3 + p + 40) % 8 === 0 ? i.tile : i.floor);
  if (t) {
    s(e, i.trim, 5.35, 0, 0, 1, !1, 0.058), s(e, i.light, 5.18, 0, 0, 0.6, !1, 0.059), s(e, i.seam, 4.72, 0, 0, 0.65, !1, 0.061);
    for (let d = 0; d < 8; d++) {
      const p = d * Math.PI / 4, k = c(e, [
        0.18,
        0.025,
        0.55
      ], [
        Math.cos(p) * 5.04,
        0.065,
        Math.sin(p) * 5.04
      ], i.trim);
      k.rotation.y = -p + Math.PI / 2;
    }
    if (n === 1) o(e, "crescent", i.seam, [
      3,
      3,
      0.12
    ], [
      0,
      0.065,
      0
    ]).rotation.set(-Math.PI / 2, 0, 0.7);
    else {
      const d = [];
      for (let k = 0; k < (n === 2 ? 24 : 16); k++) {
        const w = k * Math.PI * 2 / (n === 2 ? 24 : 16), _ = k % 2 ? 0.85 : n === 2 ? 2.6 : k % 4 ? 1.8 : 3.2;
        d.push([Math.cos(w) * _, Math.sin(w) * _]);
      }
      const p = a.shape(e, d, i.seam, [
        0,
        0.061,
        0
      ]);
      p.rotation.x = -Math.PI / 2, s(e, i.floor, 0.65, 0, 0, 1, !0, 0.065);
    }
  }
  for (const d of [-1, 1]) for (let p = 0; p < 4; p++) {
    const k = d * (7 + p % 2), w = -7 + p * 4, _ = c(e, [
      0.035,
      0.016,
      0.55 + p * 0.1
    ], [
      k,
      0.055,
      w
    ], i.seam);
    _.rotation.y = p * 1.3;
    const C = c(e, [
      0.028,
      0.015,
      0.3
    ], [
      k + 0.1,
      0.055,
      w + 0.3
    ], i.seam);
    C.rotation.y = p * 1.3 + 0.8;
  }
  for (const d of [-l - 0.35, l + 0.35]) {
    c(e, [
      0.38,
      0.18,
      l * 2 + 1
    ], [
      d,
      0.08,
      0
    ], i.light);
    for (let p = -10; p <= 10; p += 5) m(d + Math.sign(d) * 0.5, p, p === -10 ? 3.6 : 1.35);
  }
  for (let d = 0; d < 6; d++) c(e, [
    7.2,
    0.24,
    1
  ], [
    0,
    -0.12 - d * 0.26,
    l + 0.65 + d * 0.8
  ], d % 2 ? i.stone : i.light);
  f(0, -l - 3, 8, 6.3);
  for (const d of [-1, 1]) {
    c(e, [
      5,
      3.2,
      1.9
    ], [
      d * 8.4,
      1.45,
      -l - 3
    ], i.dark), c(e, [
      5.5,
      0.3,
      2.3
    ], [
      d * 8.4,
      3.2,
      -l - 3
    ], i.light);
    const p = u(e, [
      d * 5.8,
      4.8,
      -l - 2.9
    ]);
    c(p, [
      2,
      0.08,
      0.08
    ], [
      0,
      0,
      0
    ], i.trim);
    for (let k = 0; k < 5; k++) c(p, [
      0.35,
      2.6 - Math.abs(k - 2) * 0.12,
      0.08
    ], [
      (k - 2) * 0.34,
      -1.35,
      Math.sin(k * 2) * 0.08
    ], k % 2 ? i.foliage : i.dark);
    if (c(p, [
      0.12,
      1.8,
      0.09
    ], [
      0,
      -1.15,
      0.13
    ], i.trim), n < 3) {
      for (let k = 0; k < 4; k++) h(d * (12.8 + k % 2), -9 + k * 5, 0.8 + k * 0.1);
      x(d * 15, -13, 1.5), x(d * 17, 1, 1.7);
    } else if (n === 3) for (let k = 0; k < 3; k++) {
      const w = u(e, [
        d * 15,
        0,
        -9 + k * 7
      ]);
      o(w, "cylinder", i.dark, [
        1.4,
        2.8,
        1.4
      ], [
        0,
        1.4,
        0
      ]), o(w, "cylinder", i.trim, [
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
      ], i.accent), o(w, "torus", i.trim, [
        1.1,
        1.1,
        0.3
      ], [
        0,
        1.2,
        1.4
      ]);
    }
    else if (n === 4) {
      for (let w = 0; w < 5; w++) o(e, "rock", w % 2 ? i.light : i.accent, [
        1,
        2.2 + w % 3,
        0.9
      ], [
        d * (13.5 + w % 2),
        1.2,
        -9 + w * 4
      ]).rotation.z = d * -0.2;
      const k = u(e, [
        d * 17,
        0,
        -13
      ]);
      c(k, [
        0.22,
        8,
        0.22
      ], [
        0,
        3.5,
        0
      ], i.dark), a.shape(k, [
        [0, 0],
        [3, -1],
        [0, -4]
      ], i.light, [
        0,
        6.5,
        0
      ]);
    } else {
      for (let w = 0; w < 4; w++) {
        const _ = u(e, [
          d * 14,
          0,
          -10 + w * 6
        ]);
        c(_, [
          2.4,
          3.5,
          1
        ], [
          0,
          1.75,
          0
        ], i.dark);
        for (let C = 0; C < 3; C++) {
          c(_, [
            2.6,
            0.12,
            1.1
          ], [
            0,
            0.8 + C,
            0
          ], i.trim);
          for (let P = 0; P < 5; P++) c(_, [
            0.27,
            0.65 + P % 2 * 0.12,
            0.6
          ], [
            -0.85 + P * 0.4,
            1.2 + C,
            0.1
          ], P % 2 ? i.foliage : i.stone);
        }
      }
      const k = o(e, "torus", i.trim, [
        3.4,
        4,
        0.5
      ], [
        d * 18,
        6.2,
        -13
      ]);
      k.rotation.y = d * 0.3;
    }
    c(e, [
      7,
      1.4,
      18
    ], [
      d * 17,
      -0.7,
      -3
    ], i.dark), c(e, [
      6.7,
      0.1,
      17.7
    ], [
      d * 17,
      0.06,
      -3
    ], i.seam);
    for (const k of [-3.5, 3.5]) c(e, [
      0.22,
      0.25,
      18.2
    ], [
      d * 17 + k,
      0.13,
      -3
    ], i.stone);
    c(e, [
      9,
      1.8,
      10
    ], [
      d * 15,
      -0.9,
      -17
    ], i.dark), c(e, [
      8.7,
      0.1,
      9.7
    ], [
      d * 15,
      0.06,
      -17
    ], i.seam);
  }
  for (let d = 0; d < 7; d++) {
    const p = (d - 3) * 8, k = -26 - d % 3 * 6, w = 7 + d * 5 % 7;
    if (c(e, [
      5.2,
      w,
      5.5
    ], [
      p,
      w / 2 - 3,
      k
    ], i.stone), c(e, [
      5.8,
      0.4,
      6
    ], [
      p,
      w - 3,
      k
    ], i.light), n === 1) {
      const _ = o(e, "crescent", i.trim, [
        1.5,
        1.5,
        1.5
      ], [
        p,
        w - 0.8,
        k
      ]);
      _.rotation.z = 0.9;
    } else if (n === 2) o(e, "cone", i.trim, [
      3.4,
      4.8,
      3.4
    ], [
      p,
      w - 0.8,
      k
    ]);
    else if (n === 3) {
      for (const _ of [-1.3, 1.3]) o(e, "cylinder", i.dark, [
        0.7,
        5 + d % 2 * 2,
        0.7
      ], [
        p + _,
        w - 1,
        k
      ]);
      c(e, [
        3.8,
        0.25,
        4
      ], [
        p,
        w - 2.5,
        k
      ], i.trim);
    } else if (n === 4) {
      o(e, "cone", i.light, [
        3.2,
        4.5,
        3.2
      ], [
        p,
        w - 0.8,
        k
      ]);
      for (const _ of [-1, 1]) o(e, "rock", i.accent, [
        0.4,
        2,
        0.4
      ], [
        p + _,
        w - 3,
        k + 3
      ]);
    } else if (n === 5)
      o(e, "rock", i.trim, [
        1.4,
        2.3,
        1.4
      ], [
        p,
        w + 0.7,
        k
      ]), o(e, "torus", i.accent, [
        2,
        2,
        2
      ], [
        p,
        w - 1,
        k
      ]).rotation.x = Math.PI / 2;
    else {
      for (const _ of [
        -2,
        0,
        2
      ]) c(e, [
        0.7,
        1.2,
        5.6
      ], [
        p + _,
        w - 2.35,
        k
      ], i.light);
      d % 2 && x(p + 1, k + 2, 1.5);
    }
    for (const _ of [
      -1.5,
      0,
      1.5
    ]) c(e, [
      0.5,
      2.8,
      0.12
    ], [
      p + _,
      w - 5.6,
      k + 2.8
    ], i.dark);
  }
  for (const d of t?.obstacles ?? []) {
    const p = u(e, [
      d.x,
      0,
      d.y
    ]);
    o(p, "cylinder", i.dark, [
      d.radius,
      0.22,
      d.radius
    ], [
      0,
      0.11,
      0
    ]), o(p, "cylinder", i.stone, [
      d.radius * 0.85,
      1.15,
      d.radius * 0.85
    ], [
      0,
      0.78,
      0
    ]), o(p, "cylinder", i.light, [
      d.radius,
      0.2,
      d.radius
    ], [
      0,
      1.4,
      0
    ]), o(p, "rock", i.accent, [
      0.28,
      0.58,
      0.28
    ], [
      0,
      1.9,
      0
    ]);
    for (let k = 0; k < 6; k++) {
      const w = k * Math.PI / 3;
      c(p, [
        0.09,
        0.8,
        0.09
      ], [
        Math.cos(w) * d.radius * 0.86,
        0.8,
        Math.sin(w) * d.radius * 0.86
      ], i.trim);
    }
  }
  if (!t) {
    o(e, "cylinder", i.dark, [
      2.1,
      0.16,
      2.1
    ], [
      0,
      0.08,
      -8
    ]), o(e, "cylinder", i.light, [
      1.95,
      0.14,
      1.95
    ], [
      0,
      0.2,
      -8
    ]), s(e, i.trim, 1.68, 0, -8, 1, !1, 0.28);
    for (const d of [-1, 1]) {
      h(d * 3, -8, 1.2), h(d * 4, -10, 0.85);
      const p = u(e, [
        d * 2.6,
        0.5,
        -6
      ]);
      o(p, "box", i.dark, [
        0.5,
        0.16,
        0.5
      ]), o(p, "box", i.flower, [
        0.3,
        0.55,
        0.3
      ], [
        0,
        0.35,
        0
      ]), o(p, "cone", i.trim, [
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
  return a.bake(e);
}
function Mn(a, e, n) {
  const t = We[n], { mesh: i, group: l, shape: o } = a, u = l(e, [
    0,
    0.2,
    -0.23
  ]), s = l(e), c = l(e, [
    0,
    0.33,
    0
  ]), m = t.silhouette === "robe" || t.silhouette === "coat";
  if (o(u, [
    [-0.23, 0],
    [0.23, 0],
    [0.38, m ? -0.68 : -0.48],
    [0.1, m ? -0.77 : -0.59],
    [-0.36, m ? -0.68 : -0.5]
  ], t.fabric), o(u, [
    [-0.04, -0.08],
    [0.04, -0.08],
    [0.055, m ? -0.61 : -0.45],
    [0, m ? -0.68 : -0.5],
    [-0.05, m ? -0.61 : -0.45]
  ], t.metal, [
    0,
    0,
    -0.012
  ]), i(e, "torus", t.fabric, [
    0.25,
    0.18,
    0.24
  ], [
    0,
    -0.045,
    0
  ]).rotation.x = Math.PI / 2, t.silhouette === "armor") {
    i(e, "sphere", t.metal, [
      0.295,
      0.18,
      0.27
    ], [
      0,
      -0.15,
      0
    ], !1, 1, !0), i(e, "rock", t.glow, [
      0.065,
      0.09,
      0.025
    ], [
      0,
      -0.07,
      0.285
    ]);
    for (const f of [-1, 1]) i(e, "rock", t.metal, [
      0.15,
      0.12,
      0.17
    ], [
      f * 0.3,
      -0.02,
      0
    ], !1, 1, !0);
  } else m && (i(e, "cone", t.fabric, [
    0.34,
    0.46,
    0.27
  ], [
    0,
    -0.2,
    -0.025
  ]), o(e, [
    [-0.07, 0],
    [0.07, 0],
    [0.14, -0.42],
    [-0.14, -0.42]
  ], t.metal, [
    0,
    -0.02,
    0.245
  ]), i(e, "rock", t.glow, [
    0.055,
    0.065,
    0.035
  ], [
    0,
    -0.12,
    0.285
  ]));
  if (t.head === "helm") {
    i(s, "sphere", t.metal, [
      0.31,
      0.13,
      0.265
    ], [
      0,
      0.44,
      -0.015
    ], !1, 1, !0);
    for (const f of [-1, 1]) i(s, "box", t.metal, [
      0.065,
      0.22,
      0.17
    ], [
      f * 0.285,
      0.29,
      -0.02
    ], !1, 1, !0);
  } else if (t.head === "hat")
    i(s, "cylinder", t.fabric, [
      0.43,
      0.045,
      0.32
    ], [
      0,
      0.46,
      0
    ]), i(s, "cone", t.fabric, [
      0.23,
      0.48,
      0.23
    ], [
      0.055,
      0.7,
      -0.02
    ]).rotation.z = -0.18, i(s, "torus", t.metal, [
      0.245,
      0.245,
      0.24
    ], [
      0,
      0.52,
      -0.01
    ]).rotation.x = Math.PI / 2;
  else if (t.head === "hood") {
    i(s, "sphere", t.fabric, [
      0.345,
      0.35,
      0.265
    ], [
      0,
      0.22,
      -0.12
    ]);
    for (const f of [-1, 1]) i(s, "sphere", t.fabric, [
      0.075,
      0.19,
      0.08
    ], [
      f * 0.285,
      0.19,
      0.055
    ]);
  } else if (t.head === "crown") {
    i(s, "torus", t.metal, [
      0.28,
      0.28,
      0.28
    ], [
      0,
      0.48,
      0
    ], !1, 1, !0).rotation.x = Math.PI / 2;
    for (let f = 0; f < 5; f++) {
      const h = f * Math.PI * 2 / 5;
      i(s, "cone", t.metal, [
        0.045,
        0.2,
        0.045
      ], [
        Math.sin(h) * 0.27,
        0.57,
        Math.cos(h) * 0.27
      ]);
    }
  } else if (t.head === "horns") for (const f of [-1, 1]) {
    const h = l(s, [
      f * 0.26,
      0.5,
      -0.06
    ]);
    h.rotation.z = f * -0.45, i(h, "cylinder", t.metal, [
      0.035,
      0.44,
      0.03
    ], [
      0,
      0.18,
      0
    ]);
    for (const x of [0.16, 0.3]) i(h, "cone", t.metal, [
      0.025,
      0.22,
      0.025
    ], [
      f * 0.06,
      x,
      0
    ]).rotation.z = f * -0.8;
  }
  else if (t.head === "goggles") {
    i(s, "torus", "#4c4a42", [
      0.32,
      0.22,
      0.27
    ], [
      0,
      0.4,
      0
    ]).rotation.x = Math.PI / 2;
    for (const f of [-1, 1])
      i(s, "torus", t.metal, [
        0.095,
        0.075,
        0.05
      ], [
        f * 0.115,
        0.39,
        0.24
      ]), i(s, "sphere", t.glow, [
        0.08,
        0.06,
        0.045
      ], [
        f * 0.115,
        0.39,
        0.24
      ]);
  }
  switch (n) {
    case "guardian":
      i(s, "cone", t.fabric, [
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
      i(s, "crescent", t.metal, [
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
      for (const f of [-1, 1]) i(e, "cone", t.metal, [
        0.1,
        0.2,
        0.12
      ], [
        f * 0.35,
        0.12,
        -0.03
      ]).rotation.z = f * -0.5;
      break;
    case "ranger":
      i(e, "cylinder", "#79543d", [
        0.095,
        0.46,
        0.085
      ], [
        -0.25,
        0.1,
        -0.31
      ]).rotation.z = -0.35;
      for (let f = 0; f < 3; f++) i(e, "cylinder", t.metal, [
        0.012,
        0.32,
        0.012
      ], [
        -0.21 + f * 0.04,
        0.4,
        -0.29
      ]);
      i(s, "cone", t.glow, [
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
      for (const f of [-1, 1]) o(e, [
        [0, 0],
        [f * 0.22, 0.24],
        [f * 0.18, -0.05],
        [f * 0.05, -0.12]
      ], t.metal, [
        f * 0.32,
        0.02,
        -0.06
      ]);
      break;
    case "witch":
      for (const f of [-1, 1])
        i(e, "sphere", t.glow, [
          0.05,
          0.065,
          0.04
        ], [
          f * 0.27,
          -0.16,
          0.17
        ]), i(e, "box", t.metal, [
          0.07,
          0.025,
          0.07
        ], [
          f * 0.27,
          -0.09,
          0.17
        ]);
      break;
    case "assassin":
      i(e, "sphere", t.metal, [
        0.21,
        0.045,
        0.055
      ], [
        0,
        0.045,
        0.25
      ]), o(e, [
        [0, 0],
        [0.1, -0.07],
        [0.08, -0.29],
        [0, -0.19]
      ], t.metal, [
        -0.1,
        -0.02,
        0.27
      ]);
      break;
    case "machinist":
      i(e, "box", t.metal, [
        0.38,
        0.4,
        0.18
      ], [
        0,
        0.06,
        -0.35
      ], !1, 1, !0);
      for (const f of [-1, 1]) i(e, "cylinder", "#c99767", [
        0.06,
        0.32,
        0.06
      ], [
        f * 0.14,
        0.21,
        -0.38
      ]);
      i(e, "rock", t.glow, [
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
      for (let f = -2; f <= 2; f++) i(e, "rock", f % 2 ? t.fabric : t.metal, [
        0.07,
        0.17,
        0.045
      ], [
        f * 0.11,
        -0.07,
        0.21
      ]).rotation.z = f * 0.27;
      break;
    case "frostbound":
      for (let f = -2; f <= 2; f++) i(e, "sphere", "#f6ffff", [
        0.08,
        0.075,
        0.09
      ], [
        f * 0.115,
        5e-3,
        0.13
      ]);
      for (const f of [-1, 1]) i(e, "rock", t.glow, [
        0.09,
        0.36,
        0.09
      ], [
        f * 0.3,
        0.22,
        -0.35
      ]).rotation.z = f * -0.5;
      break;
    case "stargazer":
      i(c, "torus", t.metal, [
        0.43,
        0.43,
        0.43
      ], [
        0,
        0.16,
        0
      ], !1, 1, !0).rotation.x = 0.6;
      for (let f = 0; f < 3; f++) {
        const h = f * Math.PI * 2 / 3;
        i(c, "rock", t.glow, [
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
    cape: u,
    animate(f, h) {
      c.rotation.y = h ? 0.4 : f * 0.014;
    }
  };
}
function kn(a, e, n, t, i, l) {
  const { mesh: o, group: u, shape: s } = a, c = "#d6b881", m = "#fff0c1", f = (h, x, d) => {
    for (const p of [-1, 1]) o(n, "sphere", m, [
      0.09,
      0.055,
      0.06
    ], [
      p * d,
      h,
      x
    ], !0);
  };
  switch (i) {
    case "thornheart":
      o(e, "cone", "#576e58", [
        1.6,
        2.9,
        1.3
      ], [
        0,
        1.45,
        0
      ]), o(n, "rock", "#8da17f", [
        0.8,
        1,
        0.65
      ], [
        0,
        2.3,
        0.5
      ]), f(2.6, 1.06, 0.28);
      for (let h = 0; h < 7; h++) {
        const x = h * Math.PI * 2 / 7, d = u(e, [
          Math.cos(x) * 0.8,
          2.6,
          Math.sin(x) * 0.6
        ]);
        d.rotation.z = Math.cos(x) * 0.8, o(d, "cone", "#526451", [
          0.18,
          2.4,
          0.18
        ], [
          0,
          0.9,
          0
        ]), o(d, "rock", l.foliage, [
          0.6,
          0.6,
          0.4
        ], [
          0,
          1.3,
          0
        ]), o(e, "cone", "#67765a", [
          0.3,
          2,
          0.3
        ], [
          Math.cos(x),
          0.28,
          Math.sin(x)
        ]).rotation.z = 1.15;
      }
      o(e, "rock", "#ebbb73", [
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
      o(e, "cone", "#777191", [
        0.85,
        2.2,
        0.75
      ], [
        0,
        1.8,
        0
      ]), o(n, "sphere", "#c3c1db", [
        0.5,
        0.6,
        0.42
      ], [
        0,
        3.1,
        0
      ]), o(n, "box", "#4c4469", [
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
      ]) o(t, "torus", c, [
        h,
        h,
        h
      ], [
        0,
        2.2,
        0
      ], !1, 1, !0).rotation.set(h * 0.7, 0.5, h);
      o(t, "sphere", "#d6dbff", [
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
      o(e, "rock", "#ac6249", [
        0.65,
        1.3,
        0.7
      ], [
        0,
        1.8,
        0
      ]), o(n, "sphere", "#e4ac68", [
        0.4,
        0.5,
        0.43
      ], [
        0,
        3.15,
        0.25
      ]), f(3.25, 0.63, 0.18), o(n, "cone", c, [
        0.18,
        0.55,
        0.15
      ], [
        0,
        3.03,
        0.76
      ]).rotation.x = Math.PI / 2;
      for (const h of [-1, 1]) {
        for (let x = 0; x < 5; x++) s(t, [
          [0, 0],
          [h * (2.4 - x * 0.25), 0.95 - x * 0.22],
          [h * (2 - x * 0.24), -0.1 - x * 0.24],
          [0, -0.45]
        ], x % 2 ? "#e2a465" : "#d47c4f", [
          h * 0.4,
          2.5,
          -0.1 - x * 0.06
        ]);
        o(e, "cone", "#e3a25b", [
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
      o(e, "box", "#675756", [
        1.8,
        2.1,
        1.2
      ], [
        0,
        1.6,
        0
      ]), o(e, "box", "#9b6148", [
        1.2,
        1.6,
        0.17
      ], [
        0,
        1.55,
        0.7
      ]), o(n, "cylinder", "#b08563", [
        0.7,
        0.7,
        0.6
      ], [
        0,
        3.05,
        0
      ]), o(n, "box", "#ffd18c", [
        0.65,
        0.1,
        0.08
      ], [
        0,
        3.12,
        0.63
      ], !0);
      for (const h of [-1, 1])
        o(e, "cylinder", l.dark, [
          0.36,
          0.8,
          0.38
        ], [
          h * 0.55,
          0.5,
          0
        ]), o(e, "sphere", "#c9976e", [
          0.65,
          0.55,
          0.55
        ], [
          h * 1.05,
          2.5,
          0
        ], !1, 1, !0);
      t.position.set(1.4, 1.7, 0.4), o(t, "cylinder", "#765948", [
        0.1,
        2.3,
        0.1
      ]), o(t, "box", "#444e57", [
        1.8,
        0.8,
        0.9
      ], [
        0,
        1.3,
        0
      ]), o(t, "box", "#ffc482", [
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
      o(e, "sphere", "#565d63", [
        1.45,
        1.6,
        0.95
      ], [
        0,
        2.15,
        0
      ]), o(e, "torus", "#b68d66", [
        0.78,
        0.78,
        0.45
      ], [
        0,
        2.25,
        0.82
      ], !1, 1, !0), o(e, "sphere", "#ffb77b", [
        0.57,
        0.57,
        0.2
      ], [
        0,
        2.25,
        1
      ], !0), o(n, "box", "#818883", [
        1.3,
        0.5,
        1
      ], [
        0,
        3.7,
        0
      ]), f(3.73, 0.51, 0.3);
      for (const h of [-1, 1])
        o(e, "box", "#818883", [
          0.8,
          1.2,
          0.95
        ], [
          h * 0.8,
          0.6,
          0
        ]), o(t, "cylinder", "#6b7375", [
          0.65,
          2.1,
          0.65
        ], [
          h * 1.75,
          1.85,
          0
        ]), o(t, "box", "#b29370", [
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
      o(e, "cone", "#82a9c1", [
        1.1,
        2.7,
        0.95
      ], [
        0,
        1.8,
        0
      ]), o(n, "sphere", "#d5e9ec", [
        0.45,
        0.58,
        0.4
      ], [
        0,
        3.35,
        0
      ]), f(3.4, 0.39, 0.18);
      for (let h = -2; h <= 2; h++) o(n, "rock", "#d8fbff", [
        0.11,
        0.48 - Math.abs(h) * 0.08,
        0.11
      ], [
        h * 0.18,
        3.94,
        0.02
      ]);
      for (const h of [-1, 1]) s(e, [
        [0, 0],
        [h * 0.95, 0.8],
        [h * 0.5, -1.3],
        [0, -0.5]
      ], "#bddeeb", [
        h * 0.5,
        2.7,
        -0.35
      ]);
      t.position.set(1.05, 1.9, 0), o(t, "cylinder", "#aec9d5", [
        0.045,
        2.5,
        0.045
      ]), o(t, "rock", "#ddfbff", [
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
        const x = 1 - h * 0.14;
        o(e, "sphere", h % 2 ? "#658c9c" : "#7da9b8", [
          x,
          x * 0.8,
          x
        ], [
          Math.sin(h * 0.6) * 0.4,
          0.8,
          0.5 - h * 0.8
        ]), o(e, "cone", "#d7e9dc", [
          0.2 * x,
          0.6 * x,
          0.25 * x
        ], [
          0,
          1.5 - h * 0.13,
          0.4 - h * 0.7
        ]);
      }
      o(n, "rock", "#7da9b8", [
        1.05,
        0.7,
        0.85
      ], [
        0,
        1.05,
        1
      ]), f(1.32, 1.65, 0.43);
      for (const h of [-1, 1])
        s(t, [
          [0, 0],
          [h * 1.4, 0.1],
          [h * 0.8, -0.7]
        ], "#b6d6d8", [
          h * 0.7,
          0.7,
          0
        ]), o(n, "cone", "#e4efde", [
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
      o(e, "cone", "#685881", [
        0.95,
        2.6,
        0.8
      ], [
        0,
        2,
        0
      ]), o(n, "rock", "#e7dcc4", [
        0.45,
        0.62,
        0.38
      ], [
        0,
        3.6,
        0
      ]), f(3.65, 0.38, 0.16);
      for (let h = 0; h < 5; h++) {
        const x = h * Math.PI * 2 / 5, d = u(t, [
          Math.cos(x) * 1.7,
          2.5 + Math.sin(x) * 0.6,
          Math.sin(x) * 1.3
        ]);
        d.rotation.z = x * 0.3, o(d, "box", "#baa481", [
          0.55,
          0.72,
          0.14
        ]), o(d, "box", "#f1e4c6", [
          0.48,
          0.65,
          0.15
        ], [
          0,
          0,
          0.03
        ]);
      }
      o(n, "torus", c, [
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
      o(e, "box", "#51486f", [
        0.95,
        1.5,
        0.65
      ], [
        0,
        1.75,
        0
      ]), o(n, "rock", "#b8afcc", [
        0.43,
        0.66,
        0.4
      ], [
        0,
        2.95,
        0
      ]), f(3, 0.4, 0.17);
      for (const h of [-1, 1]) {
        o(e, "box", "#867995", [
          0.33,
          0.9,
          0.4
        ], [
          h * 0.3,
          0.55,
          0
        ]), o(e, "rock", "#b8afcc", [
          0.5,
          0.28,
          0.38
        ], [
          h * 0.6,
          2.4,
          0
        ]);
        const x = u(t, [
          h * 0.85,
          1.8,
          0.2
        ]);
        x.rotation.z = h * -0.25, s(x, [
          [-0.07, 0],
          [0.15, 0],
          [0.3, 1.5],
          [0.12, 2.25],
          [-0.13, 1.7]
        ], "#dfc9ff");
      }
      s(e, [
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
function ht(a, e, n = 1) {
  const t = a.group(e);
  t.scale.setScalar(n), a.shape(t, [
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
  ]), a.mesh(t, "box", "#f5f3dc", [
    0.012,
    0.94,
    0.015
  ], [
    0.04,
    0.03,
    0.07
  ]), a.mesh(t, "box", "#705444", [
    0.09,
    0.18,
    0.09
  ], [
    0.12,
    0,
    0.06
  ]);
}
function mt(a, e) {
  const n = a.group(e), t = $t({
    group: a.group,
    ball(p, k, w, _) {
      return a.mesh(p, "sphere", w, k, _);
    }
  }, n, [
    0,
    0.78,
    0
  ]);
  t.scale.setScalar(2.1);
  const i = Tt(t), l = a.ring(n, "#193f49", 0.6, 0, 0, 0.14, !0), o = a.group(t), u = a.group(o, [
    0.3,
    0.05,
    0.17
  ]), s = a.group(o);
  let c = null, m = null, f = null, h = 0, x = 0;
  function d(p, k) {
    if (!(p === m && k === f)) {
      if (m = p, f = k, s.clear(), u.clear(), c = Mn(a, s, f), a.mesh(u, "sphere", "#fffaf2", [
        0.1,
        0.1,
        0.09
      ]), m === "blade")
        a.mesh(u, "cylinder", "#624d42", [
          0.035,
          0.28,
          0.035
        ], [
          0,
          -0.08,
          0.06
        ]), a.mesh(u, "box", "#d4b470", [
          0.32,
          0.05,
          0.11
        ], [
          0,
          0.07,
          0.06
        ], !1, 1, !0), a.shape(u, [
          [-0.07, 0.1],
          [0.07, 0.1],
          [0.07, 0.65],
          [0, 0.83],
          [-0.07, 0.65]
        ], "#f5f8ef", [
          0,
          0,
          0.07
        ]), a.shape(u, [
          [0, 0.1],
          [0.07, 0.1],
          [0.07, 0.65],
          [0, 0.83]
        ], "#9cc6ce", [
          0,
          0,
          0.076
        ]);
      else if (m === "bow") ht(a, u);
      else if (m === "staff")
        a.mesh(u, "cylinder", "#796889", [
          0.035,
          1.12,
          0.035
        ], [
          0,
          0.18,
          0.04
        ]), a.mesh(u, "torus", "#d8bc80", [
          0.19,
          0.24,
          0.18
        ], [
          0,
          0.85,
          0.04
        ], !1, 1, !0), a.mesh(u, "rock", "#b9ecff", [
          0.11,
          0.18,
          0.1
        ], [
          0,
          0.85,
          0.04
        ]);
      else if (m === "daggers") for (const w of [-1, 1]) {
        const _ = a.group(u, [
          w < 0 ? -0.58 : 0,
          0,
          0
        ]);
        a.mesh(_, "box", "#974953", [
          0.07,
          0.2,
          0.07
        ]), a.shape(_, [
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
      else if (m === "grimoire") {
        const w = a.group(u, [
          0,
          0.15,
          0.12
        ]);
        w.rotation.set(-0.45, 0, -0.2), a.mesh(w, "box", "#5d618a", [
          0.34,
          0.06,
          0.42
        ]), a.mesh(w, "box", "#eee5c9", [
          0.29,
          0.075,
          0.36
        ], [
          0,
          0.03,
          0
        ]), a.mesh(w, "rock", "#b4eed5", [
          0.07,
          0.1,
          0.07
        ], [
          0,
          0.22,
          0
        ]);
      } else if (m === "cannon") {
        const w = a.group(u, [
          0.02,
          0.08,
          0.17
        ]);
        w.rotation.x = Math.PI / 2, a.mesh(w, "cylinder", "#586e77", [
          0.12,
          0.55,
          0.12
        ], [
          0,
          0.1,
          0
        ], !1, 1, !0), a.mesh(w, "torus", "#d2a96c", [
          0.15,
          0.15,
          0.15
        ], [
          0,
          0.39,
          0
        ], !1, 1, !0).rotation.x = Math.PI / 2, a.mesh(u, "box", "#906749", [
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
    root: n,
    update(p, k, w, _, C, P) {
      d(k, w);
      const $ = !!p && Math.abs(p.x - h) + Math.abs(p.y - x) > 1e-3, V = !!p?.dashTime;
      n.position.set(p?.x ?? 0, P ? 0.3 : 0, p?.y ?? -8), n.scale.setScalar(P ? 1.65 : 1), i.pose(0, 0, P ? Math.PI / 2 + 0.23 : p?.facing ?? Math.PI / 2, _, $, V, C), t.position.y += 0.3, c.cape.rotation.x = C ? -0.15 : -0.15 - ($ ? 0.5 : 0.06) - Math.sin(_ * 0.15) * 0.12, c.animate(_, C), u.rotation.z = p?.swing && !C ? -1.7 * Math.sin(p.swing / 9 * Math.PI) + 0.3 : -0.2, u.rotation.x = p?.swing && !C ? 0.8 : 0.1, l.scale.set(0.6 + (V ? 0.25 : 0), 0.6, 1), p && (h = p.x, x = p.y);
    }
  };
}
function xn(a, e, n, t) {
  const { mesh: i, group: l } = a, o = l(e), u = l(o), s = l(u), c = l(u), m = [], f = ue(n), h = J[n].radius;
  a.ring(o, "#1d3540", h * 1.15, 0, 0, 0.16, !0);
  const x = "#cfad70", d = "#fff0b0", p = t.dark;
  function k(I, z, L) {
    const ne = l(u, [
      I,
      L,
      z
    ]);
    i(ne, "box", p, [
      0.32,
      L,
      0.42
    ], [
      0,
      -L / 2,
      0
    ]), i(ne, "box", t.stone, [
      0.38,
      0.22,
      0.55
    ], [
      0,
      -L + 0.11,
      0.1
    ]), m.push(ne);
  }
  function w(I, z, L = "#d9e8df") {
    i(I, "box", x, [
      0.55,
      0.1,
      0.24
    ], [
      0,
      0.25,
      0
    ], !1, 1, !0), i(I, "box", p, [
      0.11,
      0.4,
      0.11
    ]), i(I, "box", L, [
      0.2,
      z,
      0.13
    ], [
      0,
      z / 2 + 0.35,
      0
    ], !1, 1, !0), i(I, "cone", L, [
      0.15,
      0.4,
      0.13
    ], [
      0,
      z + 0.5,
      0
    ]);
  }
  if (n === "charger") {
    i(u, "rock", t.stone, [
      0.58,
      0.58,
      0.9
    ], [
      0,
      0.7,
      0
    ]), i(c, "rock", p, [
      0.43,
      0.45,
      0.46
    ], [
      0,
      0.73,
      0.7
    ]);
    for (const I of [-0.27, 0.27]) {
      const z = i(c, "cone", x, [
        0.15,
        0.7,
        0.15
      ], [
        I,
        1.15,
        0.9
      ]);
      z.rotation.x = 0.55, i(c, "sphere", d, [
        0.05,
        0.04,
        0.06
      ], [
        I,
        0.82,
        1.02
      ], !0), k(I, -0.42, 0.45), k(I, 0.45, 0.45);
    }
    for (let I = 0; I < 3; I++) i(u, "cone", t.accent, [
      0.2,
      0.45,
      0.25
    ], [
      0,
      1.25,
      -0.5 + I * 0.4
    ]);
  } else if (n === "weaver") {
    i(u, "cone", "#63689d", [
      1.45,
      3,
      1.2
    ], [
      0,
      2.1,
      0
    ]), i(u, "cone", t.light, [
      0.8,
      1.8,
      0.65
    ], [
      0,
      2.65,
      0.3
    ]), i(c, "sphere", p, [
      0.6,
      0.72,
      0.45
    ], [
      0,
      4,
      0
    ]);
    const I = i(c, "crescent", x, [
      1.35,
      1.35,
      0.8
    ], [
      0,
      4.35,
      -0.3
    ], !1, 1, !0);
    I.rotation.z = 0.87;
    for (const z of [-0.23, 0.23]) i(c, "sphere", "#e4e3ff", [
      0.09,
      0.055,
      0.05
    ], [
      z,
      4.08,
      0.45
    ], !0);
    for (const z of [-1, 1]) {
      const L = l(u, [
        z * 0.8,
        3.3,
        0
      ]);
      L.rotation.z = z * 0.65, i(L, "cone", "#757caf", [
        0.5,
        1.8,
        0.45
      ], [
        0,
        -0.65,
        0
      ]), i(L, "sphere", t.light, [
        0.22,
        0.25,
        0.22
      ], [
        0,
        -1.45,
        0.1
      ]), m.push(L);
    }
    for (let z = 0; z < 5; z++) {
      const L = z / 5 * Math.PI * 2, ne = i(s, "rock", t.accent, [
        0.2,
        0.34,
        0.2
      ], [
        Math.cos(L) * 1.95,
        3.3 + Math.sin(L) * 1.1,
        -0.3
      ]);
      ne.rotation.z = L;
    }
  } else if (n === "king") {
    k(-0.5, 0, 0.8), k(0.5, 0, 0.8), i(u, "cone", "#7c4550", [
      1.8,
      3.6,
      0.8
    ], [
      0,
      2,
      -0.3
    ]), i(u, "box", p, [
      1.6,
      1.7,
      1
    ], [
      0,
      2.1,
      0
    ]), i(u, "rock", x, [
      0.5,
      0.9,
      0.3
    ], [
      0,
      2.25,
      0.62
    ]);
    for (const I of [-1, 1]) i(u, "rock", t.stone, [
      0.85,
      0.5,
      0.7
    ], [
      I * 0.95,
      2.95,
      0
    ]);
    i(c, "sphere", p, [
      0.65,
      0.8,
      0.5
    ], [
      0,
      3.6,
      0
    ]), i(c, "box", d, [
      0.48,
      0.08,
      0.09
    ], [
      0,
      3.7,
      0.51
    ], !0), i(c, "torus", x, [
      0.86,
      0.86,
      0.86
    ], [
      0,
      4.6,
      0
    ], !1, 1, !0).rotation.x = Math.PI / 2;
    for (let I = 0; I < 7; I++) {
      const z = I * Math.PI * 2 / 7;
      i(c, "cone", x, [
        0.17,
        0.85,
        0.17
      ], [
        Math.cos(z) * 0.78,
        4.85,
        Math.sin(z) * 0.78
      ]);
    }
    s.position.set(1.55, 1.35, 0.2), s.rotation.z = -0.3, w(s, 3.4, "#f6dc9f"), i(u, "box", t.stone, [
      0.5,
      1.2,
      0.5
    ], [
      -1.15,
      2,
      0.1
    ]);
  } else if (n === "warden") {
    k(-0.65, 0.05, 0.85), k(0.65, 0.05, 0.85), i(u, "cylinder", p, [
      1.1,
      1.85,
      0.8
    ], [
      0,
      1.9,
      0
    ]), i(u, "box", t.stone, [
      1.1,
      1.45,
      0.35
    ], [
      0,
      2,
      0.72
    ]), i(u, "rock", t.accent, [
      0.28,
      0.4,
      0.14
    ], [
      0,
      2.1,
      0.94
    ]);
    for (const z of [-1, 1])
      i(u, "rock", t.stone, [
        0.83,
        0.6,
        0.7
      ], [
        z * 1.03,
        2.7,
        0
      ]), i(u, "box", x, [
        0.7,
        0.1,
        0.8
      ], [
        z * 1.08,
        2.45,
        0.1
      ], !1, 1, !0);
    i(c, "sphere", t.stone, [
      0.73,
      0.77,
      0.63
    ], [
      0,
      3.2,
      0
    ]), i(c, "box", p, [
      1.12,
      0.33,
      0.2
    ], [
      0,
      3.22,
      0.54
    ]), i(c, "box", d, [
      0.74,
      0.095,
      0.05
    ], [
      0,
      3.22,
      0.66
    ], !0), i(c, "cone", t.foliage, [
      0.27,
      1.1,
      0.5
    ], [
      0,
      4,
      -0.2
    ]);
    const I = l(u, [
      -1.32,
      1.5,
      0.6
    ]);
    i(I, "box", p, [
      1.2,
      1.8,
      0.25
    ]), i(I, "box", x, [
      1,
      1.58,
      0.28
    ]), i(I, "box", t.foliage, [
      0.85,
      1.42,
      0.31
    ]), i(I, "rock", t.light, [
      0.28,
      0.4,
      0.1
    ], [
      0,
      0.1,
      0.22
    ]), s.position.set(1.5, 1.8, 0.25), i(s, "cylinder", "#766450", [
      0.1,
      2.5,
      0.1
    ]), i(s, "box", p, [
      1.25,
      0.9,
      0.9
    ], [
      0,
      1.4,
      0
    ]), i(s, "box", x, [
      0.24,
      0.96,
      0.94
    ], [
      0,
      1.4,
      0
    ], !1, 1, !0), i(s, "box", t.light, [
      0.22,
      0.77,
      0.74
    ], [
      0.65,
      1.4,
      0
    ]);
  } else if (ue(n)) kn(a, u, c, s, n, t);
  else if (n === "wisp")
    i(u, "rock", t.accent, [
      0.35,
      0.6,
      0.35
    ], [
      0,
      1,
      0
    ]), i(c, "torus", x, [
      0.48,
      0.6,
      0.4
    ], [
      0,
      1,
      0
    ]), i(c, "sphere", "#f7f5e8", [
      0.12,
      0.13,
      0.1
    ], [
      0,
      1.05,
      0.31
    ], !0), i(u, "cone", t.light, [
      0.16,
      0.6,
      0.16
    ], [
      0,
      0.35,
      0
    ]).rotation.z = Math.PI;
  else if (n === "stalker") {
    i(u, "sphere", t.dark, [
      0.4,
      0.35,
      0.65
    ], [
      0,
      0.55,
      0
    ]), i(c, "rock", t.foliage, [
      0.33,
      0.38,
      0.32
    ], [
      0,
      0.75,
      0.5
    ]);
    for (const I of [-1, 1])
      k(I * 0.27, -0.25, 0.35), i(c, "cone", x, [
        0.09,
        0.35,
        0.09
      ], [
        I * 0.21,
        1.09,
        0.42
      ]), i(c, "sphere", d, [
        0.05,
        0.04,
        0.035
      ], [
        I * 0.15,
        0.8,
        0.77
      ], !0), i(s, "cone", t.light, [
        0.09,
        0.38,
        0.08
      ], [
        I * 0.37,
        0.3,
        0.5
      ]).rotation.x = Math.PI / 2;
  } else if (n === "bomber")
    k(-0.22, 0, 0.45), k(0.22, 0, 0.45), i(u, "sphere", "#85654c", [
      0.5,
      0.6,
      0.4
    ], [
      0,
      0.95,
      0
    ]), i(c, "sphere", t.stone, [
      0.35,
      0.38,
      0.31
    ], [
      0,
      1.62,
      0
    ]), i(c, "box", t.dark, [
      0.63,
      0.15,
      0.08
    ], [
      0,
      1.69,
      0.3
    ]), i(u, "cylinder", "#ac7b54", [
      0.3,
      0.75,
      0.3
    ], [
      0,
      1.05,
      -0.4
    ]), i(s, "sphere", "#404c57", [
      0.25,
      0.25,
      0.25
    ], [
      0.56,
      1.1,
      0.18
    ]), i(s, "cone", "#ffca88", [
      0.07,
      0.3,
      0.07
    ], [
      0.56,
      1.41,
      0.18
    ]);
  else {
    const I = n === "priest", z = n === "guard";
    if (I ? i(u, "cone", "#767da5", [
      0.55,
      1.5,
      0.5
    ], [
      0,
      0.95,
      0
    ]) : (k(-0.22, 0, 0.5), k(0.22, 0, 0.5), i(u, "box", p, [
      0.72,
      0.85,
      0.52
    ], [
      0,
      0.92,
      0
    ])), i(u, "box", t.stone, [
      0.5,
      0.55,
      0.15
    ], [
      0,
      1,
      0.3
    ]), i(c, "sphere", t.stone, [
      0.43,
      0.45,
      0.38
    ], [
      0,
      1.63,
      0
    ]), i(c, "box", p, [
      0.68,
      0.17,
      0.12
    ], [
      0,
      1.65,
      0.32
    ]), i(c, "box", d, [
      0.39,
      0.045,
      0.05
    ], [
      0,
      1.65,
      0.39
    ], !0), I)
      i(c, "cone", "#626a9c", [
        0.55,
        0.8,
        0.5
      ], [
        0,
        2.14,
        0
      ]), s.position.set(0.52, 1, 0.1), i(s, "cylinder", x, [
        0.04,
        1.6,
        0.04
      ]), i(s, "rock", "#d1dcff", [
        0.22,
        0.32,
        0.22
      ], [
        0,
        0.95,
        0
      ]);
    else {
      i(c, "box", t.foliage, [
        0.12,
        0.38,
        0.55
      ], [
        0,
        2,
        -0.07
      ]);
      for (const L of [-1, 1]) i(u, "rock", t.stone, [
        0.28,
        0.23,
        0.3
      ], [
        L * 0.45,
        1.22,
        0
      ]);
      s.position.set(0.54, 1, 0.2), n === "archer" ? ht(a, s, 1.3) : (s.rotation.z = -0.3, w(s, 0.75)), z && (i(u, "box", x, [
        0.85,
        1.1,
        0.18
      ], [
        -0.4,
        0.95,
        0.46
      ]), i(u, "box", t.foliage, [
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
  const _ = l(o, [
    0,
    f ? 5.5 : n === "charger" ? 1.7 : 2.45,
    0
  ]);
  i(_, "box", "#233f48", [
    1.06,
    0.105,
    0.02
  ], [
    0,
    0,
    0
  ], !0);
  const C = i(_, "box", "#f0ba83", [
    1,
    0.055,
    0.03
  ], [
    0,
    0,
    0.02
  ], !0), P = [];
  u.traverse((I) => {
    I instanceof Je && P.push({
      mesh: I,
      material: I.material
    });
  });
  let $ = 0, V = -100, Q = 0, de = 0;
  const N = s.rotation.z;
  return {
    root: o,
    bar: _,
    update(I, z, L) {
      const ne = Math.abs(I.x - Q) + Math.abs(I.y - de) > 5e-3;
      Q = I.x, de = I.y, $ && !I.windup && (V = z), $ = I.windup;
      const U = I.windup ? 1 - I.windup / J[I.kind].windup : 0, le = Math.max(0, 1 - (z - V) / 10);
      o.position.set(I.x, 0, I.y), u.rotation.y = Math.PI / 2 - I.angle, u.position.y = L ? 0 : n === "weaver" || n === "priest" ? 0.13 + Math.sin(z * 0.055) * 0.1 : ne ? Math.abs(Math.sin(z * 0.3)) * 0.055 : 0, u.rotation.x = L ? 0 : -U * 0.16 + le * 0.2, c.rotation.z = !L && n === "king" ? Math.sin(z * 0.035) * 0.08 : 0, s.rotation.x = L ? 0 : U * -1.3 + le * 1.4, s.rotation.z = N + (L ? 0 : U * -0.35);
      for (let fe = 0; fe < m.length; fe++) m[fe].rotation.x = !L && ne ? Math.sin(z * 0.32 + fe * Math.PI) * 0.28 : 0;
      for (const fe of P) fe.mesh.material = I.marked > 2 && !L ? a.material("#fff6dd") : fe.material;
      _.visible = !f && I.hp < I.maxHp, C.scale.x = I.hp / I.maxHp, C.position.x = (I.hp / I.maxHp - 1) * 0.5;
    }
  };
}
var q = {
  danger: "#c34740",
  warning: "#ec8754",
  magic: "#8bd9f2",
  frost: "#addffc",
  gold: "#fff0bb",
  heal: "#75dbb0",
  fire: "#f0ad55"
};
function bn(a, e) {
  const n = /* @__PURE__ */ new Map();
  function t(l, o, u = 1) {
    const s = Math.max(0.1, Math.min(1, Math.round(u * 10) / 10)), c = `${l}/${o}/${s}`;
    let m = n.get(c);
    m || (m = {
      list: [],
      used: 0
    }, n.set(c, m));
    let f = m.list[m.used++];
    return f || (f = a.mesh(e, l, o, [
      1,
      1,
      1
    ], [
      0,
      0,
      0
    ], !0, s), m.list.push(f)), f.visible = !0, f.rotation.set(0, 0, 0), f.scale.set(1, 1, 1), f;
  }
  function i(l, o, u, s, c, m = 1, f = 0.09) {
    const h = t(l, o, m);
    return h.position.set(s, f, c), h.scale.set(u, u, 1), h.rotation.x = -Math.PI / 2, h;
  }
  return { update(l, o) {
    for (const s of n.values())
      s.used = 0, s.list.forEach((c) => c.visible = !1);
    if (!l) return;
    const u = l.player;
    if (i("ring", "#f2f6e2", 0.64, u.x, u.y, 0.8), u.dashTime && !o) for (let s = 1; s <= 3; s++) {
      const c = t("cone", q.gold, 0.7 - s * 0.15);
      c.position.set(u.x - Math.cos(u.dashAngle) * s * 0.43, 0.45, u.y - Math.sin(u.dashAngle) * s * 0.43), c.scale.set(0.13, u.dashTime / 8 * 1.7, 0.13), c.rotation.set(0, -u.dashAngle, -Math.PI / 2);
    }
    if (u.shield && i("ring", q.magic, 0.9, u.x, u.y), u.ward > 0 && i("ring", q.heal, 0.8, u.x, u.y, 0.7), !l.boss && (l.encounter === "siege" || l.encounter === "ritual")) {
      const s = l.objective;
      l.encounter === "ritual" && (i("disc", q.magic, 2.5, s.x, s.y, 0.12), i("ring", q.magic, 2.5, s.x, s.y), i("ring", q.gold, 2.2, s.x, s.y, 0.8));
      const c = t("cylinder", "#526b79");
      c.position.set(s.x, 0.3, s.y), c.scale.set(0.5, 0.6, 0.5);
      const m = t("rock", l.encounter === "siege" ? q.fire : q.magic);
      m.position.set(s.x, 1, s.y), m.scale.set(0.23, 0.5, 0.23), o || (m.rotation.y = l.tick * 0.025);
    }
    for (const s of l.companions)
      if (!(s.hp <= 0 || s.life <= 0))
        if (i("ring", q.heal, 0.4, s.x, s.y, 0.8), s.kind === "turret") {
          const c = t("cylinder", "#687c81");
          c.position.set(s.x, 0.25, s.y), c.scale.set(0.4, 0.5, 0.4);
          const m = t("box", "#bd9a68");
          m.position.set(s.x, 0.65, s.y), m.scale.set(0.9, 0.2, 0.25), m.rotation.y = -s.angle;
          const f = t("sphere", q.magic);
          f.position.set(s.x + Math.cos(s.angle) * 0.45, 0.65, s.y + Math.sin(s.angle) * 0.45), f.scale.setScalar(0.11);
        } else {
          const c = t("sphere", s.kind === "shade" ? "#a6acd8" : s.empowered ? q.gold : q.heal, 0.8);
          c.position.set(s.x, 0.55 + (o ? 0 : Math.sin(l.tick * 0.1 + s.id) * 0.08), s.y), c.scale.set(0.3, 0.36, 0.3);
          for (const f of [-1, 1]) {
            const h = t("cone", s.kind === "shade" ? "#a6acd8" : q.heal);
            h.position.set(s.x + f * 0.2, 0.93, s.y), h.scale.set(0.08, 0.22, 0.08);
          }
          const m = t("sphere", "#fff9d3");
          m.position.set(s.x + Math.cos(s.angle) * 0.26, 0.63, s.y + Math.sin(s.angle) * 0.26), m.scale.setScalar(0.07);
        }
    for (const s of l.enemies) {
      if (ue(s.kind) && s.phase > 1) {
        const c = J[s.kind].radius + 0.55;
        if (i("ring", s.kind === "king" ? q.fire : q.magic, c, s.x, s.y, 0.65), !o) for (let m = 0; m < s.phase + 2; m++) {
          const f = l.tick * 0.025 + m * Math.PI * 2 / (s.phase + 2), h = t("rock", s.kind === "king" ? q.fire : q.magic, 0.8);
          h.position.set(s.x + Math.cos(f) * c, 0.55 + Math.sin(f * 2) * 0.2, s.y + Math.sin(f) * c), h.scale.set(0.08, 0.19, 0.08);
        }
      }
      if (s.windup) {
        const c = 1 - s.windup / J[s.kind].windup;
        if (i("ring", q.warning, J[s.kind].radius + 0.35, s.x, s.y, 0.8), s.kind === "charger") {
          const m = Math.min(9, Math.hypot(s.target.x - s.x, s.target.y - s.y)), f = t("box", q.danger, 0.3);
          f.scale.set(0.75, 0.035, m), f.position.set(s.x + Math.cos(s.angle) * m / 2, 0.09, s.y + Math.sin(s.angle) * m / 2), f.rotation.y = Math.PI / 2 - s.angle, i("ring", q.danger, 0.5, s.target.x, s.target.y, 0.9);
        } else if (s.kind === "archer") {
          const m = Math.hypot(s.target.x - s.x, s.target.y - s.y), f = t("box", q.warning, 0.6);
          f.position.set((s.x + s.target.x) / 2, 0.11, (s.y + s.target.y) / 2), f.scale.set(m, 0.03, 0.09), f.rotation.y = -s.angle;
        } else s.kind === "bomber" ? i("ring", q.warning, 1.9, s.target.x, s.target.y) : (s.kind === "soldier" || s.kind === "guard" || s.kind === "stalker") && (i("disc", q.danger, J[s.kind].reach, s.target.x, s.target.y, 0.15 + c * 0.2), i("ring", q.danger, J[s.kind].reach, s.target.x, s.target.y));
      }
      if (s.chill && i("ring", q.frost, J[s.kind].radius + 0.13, s.x, s.y), s.exposed && i("arc", q.gold, J[s.kind].radius + 0.3, s.x, s.y, 0.9), s.burn && !o) for (let c = 0; c < 3; c++) {
        const m = t("rock", q.fire, 0.8);
        m.position.set(s.x + Math.sin(c * 2) * 0.3, 0.35 + (l.tick + c * 7) % 20 / 18, s.y + Math.cos(c * 2) * 0.3), m.scale.set(0.08, 0.2, 0.08);
      }
      s.kind === "priest" && i("ring", "#a39aca", 3.5, s.x, s.y, 0.4);
    }
    for (const s of l.hazards) {
      const c = s.friendly ? s.kind === "fire" ? q.fire : q.magic : q.danger;
      if (s.kind === "beam") {
        const m = t("box", c, s.wait ? 0.3 : 0.75);
        m.position.set(s.x + Math.cos(s.angle) * s.length / 2, 0.11, s.y + Math.sin(s.angle) * s.length / 2), m.scale.set(s.length, 0.04, s.width * 2), m.rotation.y = -s.angle;
        for (const f of [0, s.length]) i("disc", c, s.width, s.x + Math.cos(s.angle) * f, s.y + Math.sin(s.angle) * f, s.wait ? 0.3 : 0.75);
        continue;
      }
      if (s.kind === "ring") {
        i("ring", c, s.inner, s.x, s.y), i("ring", c, s.radius, s.x, s.y);
        for (let m = 1; m <= 4; m++) i("ring", c, s.inner + (s.radius - s.inner) * m / 5, s.x, s.y, s.wait ? 0.35 : 0.8);
        continue;
      }
      if (i("disc", c, s.radius, s.x, s.y, s.wait ? 0.2 : 0.4), i("ring", c, s.radius, s.x, s.y), s.wait) {
        i("ring", c, s.radius * (1 - Math.min(1, s.wait / 45)), s.x, s.y, 0.7);
        const m = t("box", c, 0.7);
        m.position.set(s.x, 0.12, s.y), m.scale.set(0.08, 0.02, 0.6);
        const f = t("box", c, 0.7);
        f.position.copy(m.position), f.scale.set(0.6, 0.02, 0.08);
      } else if (!o) {
        i("ring", q.gold, s.radius * (0.7 + Math.sin(l.tick * 0.1) * 0.1), s.x, s.y, 0.7, 0.25);
        for (let m = 0; m < 6; m++) {
          const f = m * Math.PI / 3, h = t("cone", c, 0.7);
          h.position.set(s.x + Math.cos(f) * s.radius * 0.65, 0.45, s.y + Math.sin(f) * s.radius * 0.65), h.scale.set(0.15, 0.9, 0.15);
        }
      }
    }
    for (const s of l.shots) {
      const c = s.friendly ? q.gold : q.danger, m = t("sphere", s.friendly ? "#fffbea" : "#fff1c9");
      m.position.set(s.x, 0.6, s.y), m.scale.set(0.11, 0.11, 0.11);
      const f = t("sphere", c, 0.8);
      f.position.copy(m.position), f.scale.set(0.21, 0.18, 0.21);
      const h = t("cone", c, 0.5);
      h.position.set(s.x - Math.cos(s.angle) * 0.38, 0.6, s.y - Math.sin(s.angle) * 0.38), h.scale.set(0.14, 0.75, 0.14), h.rotation.set(0, -s.angle, -Math.PI / 2);
    }
    for (const s of l.effects) {
      const c = 1 - s.life / (s.kind === "slash" ? 9 : 15);
      if (s.kind === "slash") {
        const m = i("arc", q.gold, s.size, s.x, s.y, 1 - c * 0.6, 0.42);
        m.rotation.z = -s.angle - 0.9 + c * 0.4;
        const f = i("arc", "#ffffff", s.size * 0.86, s.x, s.y, 1 - c * 0.8, 0.43);
        f.rotation.z = m.rotation.z;
      } else if (s.kind === "lightning") {
        for (let m = 0; m < 4; m++) {
          const f = t("box", m % 2 ? "#ffffff" : q.magic, 1 - c * 0.6);
          f.scale.set(0.09 + (1 - c) * 0.09, 1.05, 0.08), f.position.set(s.x + (m % 2 ? 0.14 : -0.14), 0.5 + m * 0.85, s.y), f.rotation.z = m % 2 ? -0.35 : 0.35;
        }
        i("ring", q.magic, 0.4 + c, s.x, s.y, 1 - c);
      } else if (s.kind === "heal") i("ring", q.heal, 0.4 + c, s.x, s.y, 1 - c);
      else {
        const m = s.kind === "hit" ? q.danger : q.gold;
        if (i("ring", m, s.size * (0.4 + c), s.x, s.y, 1 - c), !o) for (let f = 0; f < 7; f++) {
          const h = f * 2.4 + s.id, x = t("rock", m, 1 - c * 0.8);
          x.position.set(s.x + Math.cos(h) * c * s.size, 0.4 + Math.sin(c * Math.PI) * 0.8, s.y + Math.sin(h) * c * s.size), x.scale.set(0.1 * (1 - c), 0.28 * (1 - c), 0.1 * (1 - c)), x.rotation.z = h;
        }
      }
    }
  } };
}
function wn(a, e) {
  const n = new at({
    antialias: !0,
    alpha: !1,
    powerPreference: "high-performance"
  });
  n.outputColorSpace = nt, n.toneMapping = 7, n.toneMappingExposure = 1, n.setPixelRatio(Math.min(devicePixelRatio || 1, 1.8)), n.shadowMap.enabled = !0, n.shadowMap.type = 2, a.append(n.domElement);
  const t = document.createElement("div");
  t.className = "exp-world-labels", t.setAttribute("aria-hidden", "true"), a.append(t);
  const i = new et(), l = new Ja(-10, 10, 10, -10, 0.1, 180), o = pt();
  i.add(new Xa("#effbff", "#74918a", 1.7));
  const u = new wa("#fff1d6", 2.2);
  u.position.set(-12, 25, 13), u.castShadow = !0, u.shadow.mapSize.set(1536, 1536), Object.assign(u.shadow.camera, {
    left: -23,
    right: 23,
    top: 24,
    bottom: -24,
    far: 80
  }), u.shadow.bias = -4e-4, u.shadow.normalBias = 0.035, u.shadow.radius = 3, i.add(u);
  const s = new wa("#c3edff", 1.1);
  s.position.set(7, 8, -15), i.add(s);
  const c = new aa(), m = new aa(), f = new aa();
  i.add(c, m, f);
  const h = mt(o, m), x = bn(o, f), d = /* @__PURE__ */ new Map(), p = [], k = matchMedia("(prefers-reduced-motion: reduce)"), w = new ya(), _ = new ya();
  let C = null, P = "", $ = "", V = "", Q = null, de = 1, N = 1, I = !0, z = !1, L = !1, ne = 0, U = -1, le = 0, fe = !1;
  function ae() {
    const G = a.getBoundingClientRect();
    de = Math.max(1, G.width), N = Math.max(1, G.height), n.setSize(de, N, !1), I = !0, fe = !1;
  }
  const Ze = new ResizeObserver(ae);
  Ze.observe(a), ae();
  function ke(G) {
    G.preventDefault(), L = !0, e();
  }
  n.domElement.addEventListener("webglcontextlost", ke);
  function j(G, me, xe, Ie, Oe = !1) {
    if (Math.abs(G) < 1) return;
    const O = document.createElement("span");
    O.className = Oe ? "exp-damage is-player" : G < 0 ? "exp-damage is-heal" : "exp-damage", O.textContent = `${G < 0 ? "+" : ""}${Math.ceil(Math.abs(G))}`, t.append(O), p.push({
      element: O,
      position: new ya(me, 2, xe),
      born: Ie
    });
  }
  function ie() {
    for (const G of d.values())
      m.remove(G.actor.root), G.marker.remove();
    d.clear(), p.splice(0).forEach((G) => G.element.remove());
  }
  return {
    draw(G, me, xe, Ie = "battle", Oe = 0) {
      if (z || L) return;
      const O = Ie === "battle" ? G : null, ha = O?.tick ?? (k.matches ? 0 : Oe * 0.025), Ne = O?.tick !== U, na = `${me.weapon}/${me.outfit}/${xe}`;
      if (!I && Ie === $ && na === V && O === Q && (!Ne && O || !O && (Ie === "between" || k.matches || Oe - ne < 40))) return;
      ne = Oe;
      const De = ft[xe], Ue = `${xe}:${O?.boss ?? !1}:${!!O}`;
      Ue !== P && (C?.(), C = yn(o, c, xe, O), P = Ue, i.background = new tt(De.sky), i.fog = new St(De.haze, 42, 95)), O !== Q && (ie(), le = O?.player.hp ?? 0, fe = !1);
      const Ge = Ie !== "battle", ve = de < 600, R = ve || N < 400, E = de / N, y = Ge ? ve ? 13 : 28 : ve ? 18.5 : Math.max(27, E * (N < 400 ? 14 : 23)), be = Math.max(0, T.arena - y / 2 + 0.5), Pa = O ? R ? O.player.x * 0.62 : Math.max(-be, Math.min(be, O.player.x * 0.62)) : ve ? 0 : 5.5, Sa = O ? O.player.y * (R ? 0.62 : 0.2) - 0.4 : ve ? -4.2 : -11.8;
      !fe || k.matches ? (w.set(Pa, 0, Sa), fe = !0) : (w.x += (Pa - w.x) * 0.14, w.z += (Sa - w.z) * 0.14), l.left = -y / 2, l.right = y / 2, l.top = y / E / 2, l.bottom = -l.top;
      const Ta = Ge ? 0 : 1 * Math.PI / 4;
      l.position.set(w.x + Math.sin(Ta) * 25, 28, w.z + Math.cos(Ta) * 25), l.lookAt(w.x, 0, w.z), l.updateProjectionMatrix(), l.updateMatrixWorld(), h.update(O?.player ?? null, me.weapon, me.outfit, ha, k.matches, Ge);
      for (const re of O?.enemies ?? []) {
        let K = d.get(re.id);
        if (!K) {
          const ga = document.createElement("i");
          ga.className = ue(re.kind) ? "exp-threat is-boss" : "exp-threat", t.append(ga), K = {
            actor: xn(o, m, re.kind, De),
            hp: re.hp,
            death: null,
            marker: ga
          }, d.set(re.id, K);
        }
        K.hp > re.hp && Ne && j(K.hp - re.hp, re.x, re.y, O.tick), K.hp = re.hp, K.actor.update(re, O.tick, k.matches), K.actor.bar.quaternion.copy(l.quaternion), _.set(re.x, 1.2, re.y).project(l);
        const Ee = (_.x * 0.5 + 0.5) * de, Ke = (-_.y * 0.5 + 0.5) * N, ma = Math.max(18, Math.min(de - 18, Ee)), va = Math.max(ve ? 132 : 95, Math.min(N - 130, Ke));
        K.marker.hidden = Math.abs(Ee - ma) + Math.abs(Ke - va) < 10, K.marker.style.transform = `translate(${ma}px,${va}px) rotate(${Math.atan2(Ke - va, Ee - ma) + Math.PI / 2}rad)`;
      }
      for (const [re, K] of d) {
        if (O?.enemies.some((Ke) => Ke.id === re)) continue;
        K.death === null && (K.death = O?.tick ?? 0, O && K.hp > 0 && j(K.hp, K.actor.root.position.x, K.actor.root.position.z, O.tick));
        const Ee = ((O?.tick ?? 0) - K.death) / 12;
        K.actor.bar.visible = !1, K.marker.hidden = !0, K.actor.root.scale.setScalar(Math.max(0, 1 - Ee)), (Ee >= 1 || !O || k.matches) && (m.remove(K.actor.root), K.marker.remove(), d.delete(re));
      }
      O && Ne && (le !== O.player.hp && j(le - O.player.hp, O.player.x, O.player.y, O.tick, le > O.player.hp), le = O.player.hp), x.update(O, k.matches);
      for (let re = p.length - 1; re >= 0; re--) {
        const K = p[re], Ee = ((O?.tick ?? 0) - K.born) / 27;
        if (Ee >= 1 || !O) {
          K.element.remove(), p.splice(re, 1);
          continue;
        }
        _.copy(K.position), _.y += k.matches ? 0 : Ee * 0.9, _.project(l), K.element.style.transform = `translate(${(_.x * 0.5 + 0.5) * de}px,${(-_.y * 0.5 + 0.5) * N}px)`, K.element.style.opacity = String(Math.min(1, (1 - Ee) * 3));
      }
      n.render(i, l), I = !1, $ = Ie, V = na, Q = O, U = O?.tick ?? -1;
    },
    dispose() {
      z = !0, Ze.disconnect(), n.domElement.removeEventListener("webglcontextlost", ke), ie(), C?.(), u.shadow.dispose(), o.dispose(), i.clear(), n.dispose(), n.forceContextLoss(), n.domElement.remove(), t.remove();
    }
  };
}
function _n(a) {
  let e = null, n = null, t = null, i = !1, l = !1, o = null, u = -1, s = 0, c = 0, m = 0, f = 0;
  function h(d, p, k, w = "sine", _ = d * 0.8, C = 0) {
    if (!i || !e || !n || e.state !== "running") return;
    const P = e.createOscillator(), $ = e.createGain(), V = e.currentTime + C;
    P.type = w, P.frequency.setValueAtTime(d, V), P.frequency.exponentialRampToValueAtTime(Math.max(30, _), V + p), $.gain.setValueAtTime(1e-4, V), $.gain.exponentialRampToValueAtTime(k, V + 9e-3), $.gain.exponentialRampToValueAtTime(1e-4, V + p), P.connect($).connect(n), P.start(V), P.stop(V + p), P.onended = () => {
      P.disconnect(), $.disconnect();
    };
  }
  function x(d, p, k, w) {
    if (!i || !e || !n || !t || e.state !== "running") return;
    const _ = e.createBufferSource(), C = e.createBiquadFilter(), P = e.createGain(), $ = e.currentTime;
    _.buffer = t, C.type = "bandpass", C.Q.value = 0.65, C.frequency.setValueAtTime(k, $), C.frequency.exponentialRampToValueAtTime(w, $ + d), P.gain.setValueAtTime(1e-4, $), P.gain.exponentialRampToValueAtTime(p, $ + 8e-3), P.gain.exponentialRampToValueAtTime(1e-4, $ + d), _.connect(C).connect(P).connect(n), _.start($), _.stop($ + d), _.onended = () => {
      _.disconnect(), C.disconnect(), P.disconnect();
    };
  }
  return {
    async enable(d) {
      if (!l) {
        i = d;
        try {
          if (!d) {
            e && await e.suspend();
            return;
          }
          if (!e) {
            e = new AudioContext(), n = e.createGain(), n.gain.value = 0.55, n.connect(e.destination), t = e.createBuffer(1, e.sampleRate, e.sampleRate);
            const p = t.getChannelData(0);
            for (let k = 0; k < p.length; k++) p[k] = Math.random() * 2 - 1;
          }
          await e.resume();
        } catch {
          i = !1, l || a();
        }
      }
    },
    tick(d) {
      o !== d && (o = d, u = -1, s = d.player.hp, c = d.kills, m = d.player.skill, f = d.serial), u !== d.tick && (u = d.tick, d.player.hp < s && (x(0.16, 0.17, 800, 120), h(95, 0.2, 0.12, "triangle", 42)), d.kills > c && (h(659, 0.22, 0.045), h(988, 0.3, 0.025, "sine", 980, 0.035)), d.player.swing === 9 && x(0.095, 0.08, 2700, 500), d.player.dashTime === 7 && x(0.2, 0.09, 500, 2600), d.player.skill > m && (x(0.24, 0.12, 2200, 250), h(165, 0.35, 0.075, "triangle", 82), h(660, 0.36, 0.035, "sine", 440, 0.02)), d.effects.some((p) => p.id > f && p.kind === "lightning") && (x(0.12, 0.1, 4400, 1e3), h(1200, 0.08, 0.018, "sine", 210)), d.status === "won" && [
        392,
        494,
        587,
        784
      ].forEach((p, k) => h(p, 0.65, 0.04, "sine", p, k * 0.075)), d.status === "lost" && h(147, 0.7, 0.06, "triangle", 73), s = d.player.hp, c = d.kills, m = d.player.skill, f = d.serial);
    },
    dispose() {
      l = !0, i = !1, e && (e.close().catch(a), e = null), n = null, t = null;
    }
  };
}
var Ka = {
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
}, Zn = {
  class: "exp-icon",
  viewBox: "0 0 64 64",
  fill: "none",
  "aria-hidden": "true"
}, An = ["d"], Cn = ["d"], In = /* @__PURE__ */ da({
  __name: "ExpeditionIcon",
  props: { name: {} },
  setup(a) {
    return (e, n) => (Z(), A("svg", Zn, [v("path", {
      d: r(Ka)[a.name].body,
      fill: "currentColor",
      "fill-opacity": ".17",
      "fill-rule": "evenodd",
      stroke: "currentColor",
      "stroke-width": "2.2",
      "stroke-linejoin": "round"
    }, null, 8, An), v("path", {
      d: r(Ka)[a.name].detail,
      stroke: "currentColor",
      "stroke-width": "2.2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, 8, Cn)]));
  }
}), B = In, En = ["aria-label"], Pn = {
  key: 0,
  class: "exp-touch"
}, Sn = ["aria-label"], Tn = { class: "exp-combat-buttons" }, $n = ["aria-label"], zn = ["aria-label"], Rn = /* @__PURE__ */ da({
  __name: "ExpeditionField",
  props: {
    run: {},
    client: {},
    paused: { type: Boolean },
    camp: { type: Boolean },
    generationActive: { type: Boolean },
    weapon: {},
    outfit: {},
    sound: { type: Boolean }
  },
  emits: [
    "pause",
    "error",
    "hud"
  ],
  setup(a, { expose: e, emit: n }) {
    const t = a, i = n, l = Y(null), o = Y(null), u = Y({
      x: 0,
      y: 0
    }), s = Y({
      dash: 0,
      skill: 0
    });
    let c = null, m = null, f = null, h = "", x = 0, d = 0, p = -1, k = 0, w = [], _ = 0, C = !1, P = !0, $ = !1;
    const V = _n(() => i("error", "sound"));
    function Q() {
      const j = t.run, ie = j ? `${j.id}:${j.step}:${j.phase === "battle" ? "battle" : "between"}` : "";
      ie !== h && (h = ie, f = j?.phase === "battle" && j.battle ? structuredClone(j.battle) : null, w = [], _ = 0, p = -1, f ? (m?.clear(), l.value?.focus({ preventScroll: !0 }), de()) : i("hud", null));
    }
    function de() {
      !f || f.tick === p || (p = f.tick, s.value = {
        dash: f.player.dash,
        skill: f.player.skill
      }, i("hud", {
        player: { ...f.player },
        enemies: f.enemies.filter((j) => ue(j.kind)).map((j) => ({ ...j })),
        wave: f.wave,
        waves: f.waves,
        tick: f.tick,
        objective: { ...f.objective },
        encounter: f.encounter
      }));
    }
    async function N() {
      if (C || !w.length || t.client.blocked.value || t.generationActive) return;
      C = !0;
      const j = w;
      w = [], _ = 0;
      const ie = await t.client.act({
        type: "input",
        spans: j
      });
      C = !1, ie ? w.length && (t.paused || f?.status !== "fighting" || !P) && N() : i("pause");
    }
    function I() {
      m?.clear(), U = null, u.value = {
        x: 0,
        y: 0
      };
    }
    function z() {
      I(), i("pause"), N();
    }
    function L() {
      document.hidden && z();
    }
    function ne(j) {
      if ($ || !P) return;
      x = requestAnimationFrame(ne), Q();
      const ie = d ? Math.min(100, j - d) : 0;
      if (d = j, !t.paused && !t.generationActive && !document.hidden && !t.client.failed.value && t.client.view.value?.writeState === "ready" && _ < T.maxInputTicks && f?.status === "fighting" && f && t.run) {
        for (k += ie; k >= 1e3 / T.hz && f.status === "fighting" && _ < T.maxInputTicks; ) {
          const G = m.frame();
          on(f, G, t.run), ln(w, G), _++, k -= 1e3 / T.hz, V.tick(f);
        }
        (_ >= T.checkpointTicks || f.status !== "fighting") && N(), (f.tick % 3 === 0 || f.status !== "fighting") && de();
      } else k = 0;
      try {
        document.hidden || c?.draw(f, t.camp ? {
          weapon: t.weapon,
          outfit: t.outfit
        } : t.run ?? {
          weapon: t.weapon,
          outfit: t.outfit
        }, t.run ? ut(t.run) : 0, t.camp ? "camp" : f ? "battle" : "between", j);
      } catch {
        i("error", "rendering"), z(), cancelAnimationFrame(x);
      }
    }
    Qe(() => t.paused, (j) => {
      j ? (I(), N()) : l.value?.focus({ preventScroll: !0 });
    }), Qe(() => t.sound, (j) => {
      V.enable(j);
    }), Qe(() => t.generationActive, (j) => {
      !j && t.paused && N();
    });
    let U = null;
    function le(j) {
      if (U !== j.pointerId) return;
      const ie = j.currentTarget.getBoundingClientRect(), G = (j.clientX - ie.left - ie.width / 2) / 38, me = (j.clientY - ie.top - ie.height / 2) / 38, xe = Math.max(1, Math.hypot(G, me));
      u.value = {
        x: G / xe * 27,
        y: me / xe * 27
      }, m?.stick(G / xe, me / xe);
    }
    function fe(j) {
      U = j.pointerId, j.currentTarget.setPointerCapture(U), le(j), l.value?.focus({ preventScroll: !0 });
    }
    function ae(j) {
      U === j.pointerId && (U = null, u.value = {
        x: 0,
        y: 0
      }, m?.stick(0, 0));
    }
    function Ze(j) {
      (!j || j.detail === 0) && m?.dash();
    }
    function ke(j) {
      (!j || j.detail === 0) && m?.skill();
    }
    return Ca(() => {
      try {
        c = wn(o.value, () => {
          i("error", "rendering"), z();
        });
      } catch {
        i("error", "rendering");
        return;
      }
      m = gn(l.value, z, () => {
        t.sound && V.enable(!0);
      }), document.addEventListener("visibilitychange", L), Q(), x = requestAnimationFrame(ne), l.value?.focus({ preventScroll: !0 });
    }), Ya(() => {
      P = !1, cancelAnimationFrame(x), z();
    }), Va(() => {
      P || (P = !0, d = 0, x = requestAnimationFrame(ne));
    }), Ia(() => {
      $ = !0, cancelAnimationFrame(x), m?.dispose(), document.removeEventListener("visibilitychange", L), c?.dispose(), V.dispose();
    }), e({ flush: N }), (j, ie) => (Z(), A("div", {
      ref_key: "root",
      ref: l,
      class: "exp-field",
      tabindex: "0",
      "aria-label": r(g).controls
    }, [v("div", {
      ref_key: "canvas",
      ref: o,
      class: "exp-canvas"
    }, null, 512), a.run?.phase === "battle" && !a.paused ? (Z(), A("div", Pn, [v("div", {
      class: "exp-stick",
      role: "group",
      "aria-label": r(g).touchMove,
      onPointerdown: Xe(fe, ["prevent"]),
      onPointermove: Xe(le, ["prevent"]),
      onPointerup: ae,
      onPointercancel: ae,
      onLostpointercapture: ae
    }, [v("span", { style: Fe({ transform: `translate(${u.value.x}px, ${u.value.y}px)` }) }, null, 4), ie[2] || (ie[2] = v("i", { "aria-hidden": "true" }, null, -1))], 40, Sn), v("div", Tn, [v("button", {
      type: "button",
      "aria-label": r(g).dash,
      class: qe({ "is-cooling": s.value.dash > 0 }),
      onPointerdown: ie[0] || (ie[0] = Xe((G) => Ze(), ["prevent"])),
      onClick: Ze
    }, [
      W(B, { name: "dash" }),
      v("span", null, b(s.value.dash ? (s.value.dash / r(T).hz).toFixed(1) : r(g).dash), 1),
      v("kbd", null, b(r(g).dashKey), 1)
    ], 42, $n), v("button", {
      type: "button",
      "aria-label": r(g).skill,
      class: qe({ "is-cooling": s.value.skill > 0 }),
      onPointerdown: ie[1] || (ie[1] = Xe((G) => ke(), ["prevent"])),
      onClick: ke
    }, [
      W(B, { name: a.run.weapon }, null, 8, ["name"]),
      v("span", null, b(s.value.skill ? (s.value.skill / r(T).hz).toFixed(1) : r(g).skill), 1),
      v("kbd", null, b(r(g).skillKey), 1)
    ], 42, zn)])])) : H("", !0)], 8, En));
  }
}), jn = Rn, Ln = { class: "exp-wardrobe" }, On = { class: "exp-fitting" }, qn = ["aria-label"], Hn = {
  key: 0,
  role: "alert"
}, Qn = { class: "exp-preview-tools" }, Nn = ["aria-label"], Bn = ["disabled"], Fn = { class: "exp-muted" }, Wn = ["disabled"], Dn = { key: 0 }, Un = { key: 1 }, Gn = { class: "exp-purchase-confirm" }, Kn = ["disabled"], Vn = ["disabled"], Yn = ["aria-label"], Xn = ["aria-pressed", "onClick"], Jn = ["src"], ei = /* @__PURE__ */ da({
  __name: "ExpeditionWardrobe",
  props: {
    data: {},
    balance: {},
    blocked: { type: Boolean },
    weapon: {}
  },
  emits: ["command"],
  setup(a, { emit: e }) {
    const n = a, t = e, i = Y(n.data.equippedOutfit), l = Y(!1), o = Y(0), u = Y(!1), s = Y(null), c = Y({}), m = oe(() => We[i.value]), f = oe(() => Fa(n.data, i.value)), h = oe(() => Rt.find((C) => Ea[C].awardKey === m.value.achievement));
    let x = null, d = !0, p = 0;
    Qe([
      i,
      o,
      () => n.weapon
    ], () => {
      d = !0, l.value = !1;
    });
    function k(C) {
      i.value = C;
    }
    function w() {
      p = performance.now() + 1100, d = !0;
    }
    function _() {
      l.value = !1, t("command", {
        type: "purchase",
        id: i.value
      });
    }
    return Ca(() => {
      let C;
      try {
        C = new at({
          antialias: !0,
          alpha: !1
        });
      } catch {
        u.value = !0;
        return;
      }
      C.outputColorSpace = nt, C.toneMapping = 7, C.setPixelRatio(Math.min(devicePixelRatio, 1.8));
      const P = new et(), $ = pt(), V = new aa(), Q = mt($, V);
      P.background = new tt("#d1e0e1"), P.add(V, new Xa("#fff6e3", "#627c93", 2.7));
      const de = new wa("#fff6e0", 3);
      de.position.set(-3, 5, 6), P.add(de);
      const N = new Ja(-2.35, 2.35, 2.35, -2.35, 0.1, 30);
      N.position.set(0, 2.9, 7), N.lookAt(0, 1.7, 0), C.setSize(144, 144, !1);
      try {
        for (const ae of ua)
          Q.update({
            x: 0,
            y: 0,
            facing: Math.PI / 2,
            dashTime: 0,
            swing: 0
          }, n.weapon, ae, 0, !0, !1), Q.root.position.set(0, 0.1, 0), Q.root.rotation.y = -0.2, Q.root.scale.setScalar(1.35), C.render(P, N), c.value[ae] = C.domElement.toDataURL("image/png");
      } catch {
        u.value = !0, $.dispose(), P.clear(), C.dispose(), C.forceContextLoss();
        return;
      }
      s.value.append(C.domElement);
      let I = 0, z = 1, L = 1;
      const ne = new ResizeObserver(() => {
        const ae = s.value.getBoundingClientRect();
        z = Math.max(1, ae.width), L = Math.max(1, ae.height), C.setSize(z, L, !1), N.left = -2.35 * z / L, N.right = -N.left, N.top = 2.35, N.bottom = -2.35, N.updateProjectionMatrix(), d = !0;
      });
      ne.observe(s.value);
      const U = matchMedia("(prefers-reduced-motion: reduce)");
      function le(ae) {
        ae.preventDefault(), u.value = !0, cancelAnimationFrame(I);
      }
      C.domElement.addEventListener("webglcontextlost", le);
      function fe(ae) {
        if (I = requestAnimationFrame(fe), !d && (ae > p || U.matches)) return;
        const Ze = ae < p && !U.matches, ke = ae * 0.03;
        Q.update({
          x: Ze ? Math.sin(ke * 0.4) * 0.03 : 0,
          y: 0,
          facing: Math.PI / 2,
          dashTime: 0,
          swing: Ze ? 8 - ke % 8 : 0
        }, n.weapon, i.value, ke, U.matches, !1), Q.root.position.set(0, 0.1, 0), Q.root.rotation.y = Number(o.value) * Math.PI / 180, Q.root.scale.setScalar(1.35);
        try {
          C.render(P, N), d = !1;
        } catch {
          u.value = !0, cancelAnimationFrame(I);
        }
      }
      I = requestAnimationFrame(fe), x = () => {
        cancelAnimationFrame(I), ne.disconnect(), C.domElement.removeEventListener("webglcontextlost", le), $.dispose(), P.clear(), C.dispose(), C.forceContextLoss(), C.domElement.remove();
      };
    }), Ia(() => x?.()), (C, P) => (Z(), A("div", Ln, [v("section", On, [
      v("div", {
        ref_key: "host",
        ref: s,
        class: "exp-outfit-preview",
        "aria-label": r(He)[i.value].name
      }, [u.value ? (Z(), A("p", Hn, b(r(g).presentationError.rendering), 1)) : H("", !0)], 8, qn),
      v("div", Qn, [v("label", null, [ce(b(r(g).rotate), 1), kt(v("input", {
        "onUpdate:modelValue": P[0] || (P[0] = ($) => o.value = $),
        type: "range",
        min: "-180",
        max: "180",
        step: "5",
        "aria-label": r(g).rotate
      }, null, 8, Nn), [[yt, o.value]])]), v("button", {
        type: "button",
        disabled: u.value,
        onClick: w
      }, b(r(g).previewAction), 9, Bn)]),
      v("h3", null, b(r(He)[i.value].name), 1),
      v("p", null, b(r(He)[i.value].detail), 1),
      v("p", Fn, b(r(g).wardrobeNote), 1),
      f.value ? (Z(), A(D, { key: 0 }, [v("button", {
        type: "button",
        class: "exp-primary",
        disabled: a.blocked || a.data.equippedOutfit === i.value,
        onClick: P[1] || (P[1] = ($) => t("command", {
          type: "equip",
          id: i.value
        }))
      }, b(a.data.equippedOutfit === i.value ? r(g).equipped : r(g).equip), 9, Wn), a.data.active && !r(la)(a.data.active) ? (Z(), A("small", Dn, b(r(g).nextRunOutfit), 1)) : H("", !0)], 64)) : h.value ? (Z(), A("p", Un, b(r(g).unlockWeapon(r(ea)[h.value])), 1)) : l.value ? (Z(), A(D, { key: 2 }, [v("p", null, b(r(g).buyOutfit(r(He)[i.value].name, m.value.price)), 1), v("div", Gn, [v("button", {
        type: "button",
        class: "exp-primary",
        disabled: a.blocked || a.balance < m.value.price,
        onClick: _
      }, b(r(g).confirm), 9, Kn), v("button", {
        type: "button",
        onClick: P[2] || (P[2] = ($) => l.value = !1)
      }, b(r(g).cancel), 1)])], 64)) : (Z(), A("button", {
        key: 3,
        type: "button",
        class: "exp-primary",
        disabled: a.blocked || a.balance < m.value.price,
        onClick: P[3] || (P[3] = ($) => l.value = !0)
      }, b(a.balance < m.value.price ? r(g).noCoins : r(g).purchase) + " · " + b(r(g).coins(m.value.price)), 9, Vn))
    ]), v("div", {
      class: "exp-outfit-rack",
      "aria-label": r(g).tryOn
    }, [(Z(!0), A(D, null, ge(r(ua), ($) => (Z(), A("button", {
      key: $,
      type: "button",
      "aria-pressed": i.value === $,
      onClick: (V) => k($)
    }, [
      c.value[$] ? (Z(), A("img", {
        key: 0,
        class: "exp-outfit-swatch",
        src: c.value[$],
        alt: ""
      }, null, 8, Jn)) : H("", !0),
      v("strong", null, b(r(He)[$].name), 1),
      v("small", null, b(a.data.equippedOutfit === $ ? r(g).equipped : r(Fa)(a.data, $) ? r(g).owned : r(We)[$].price ? r(g).coins(r(We)[$].price) : r(g).achievement), 1)
    ], 8, Xn))), 128))], 8, Yn)]));
  }
}), ai = ei, ti = ["data-zone"], ni = { class: "exp-hud" }, ii = {
  key: 0,
  class: "exp-health"
}, si = [
  "aria-label",
  "aria-valuenow",
  "aria-valuemax"
], ri = {
  key: 0,
  class: "exp-ward-stat"
}, oi = ["value", "aria-label"], li = ["aria-label"], ci = { key: 0 }, ui = ["aria-label"], di = { class: "exp-tools" }, fi = ["aria-label", "aria-pressed"], pi = ["aria-label"], hi = ["aria-label"], mi = ["aria-label"], vi = ["aria-label"], gi = ["aria-label"], yi = [
  "aria-label",
  "aria-valuenow",
  "aria-valuemax"
], Mi = {
  key: 1,
  class: "exp-wave"
}, ki = {
  key: 2,
  class: "exp-encounter",
  "aria-hidden": "true"
}, xi = { key: 0 }, bi = {
  key: 3,
  class: "exp-camp"
}, wi = { class: "exp-title" }, _i = { class: "exp-camp-location" }, Zi = { class: "exp-camp-relics" }, Ai = ["disabled"], Ci = { class: "exp-camp-loadout" }, Ii = ["aria-label"], Ei = [
  "disabled",
  "aria-pressed",
  "title",
  "onClick"
], Pi = { key: 0 }, Si = { class: "exp-weapon-detail" }, Ti = {
  key: 0,
  class: "exp-next-unlock"
}, $i = { class: "exp-camp-options" }, zi = ["disabled"], Ri = { class: "exp-screen-heading" }, ji = ["aria-label"], Li = { key: 1 }, Oi = { class: "exp-section-label" }, qi = { class: "exp-route-options" }, Hi = [
  "disabled",
  "data-route",
  "onClick"
], Qi = { class: "exp-decision-content" }, Ni = { class: "exp-screen-heading" }, Bi = {
  key: 0,
  class: "exp-prize",
  role: "status"
}, Fi = { key: 0 }, Wi = { class: "exp-relic-options" }, Di = [
  "disabled",
  "data-relic",
  "onClick"
], Ui = { class: "exp-relic-art" }, Gi = { class: "exp-relic-family" }, Ki = {
  key: 0,
  class: "exp-relic-price"
}, Vi = {
  key: 1,
  class: "exp-muted"
}, Yi = { class: "exp-muted exp-upgrade-hint" }, Xi = ["disabled"], Ji = ["disabled"], es = { class: "exp-screen-heading" }, as = ["disabled"], ts = ["disabled"], ns = ["disabled"], is = { class: "exp-decision-content" }, ss = { class: "exp-screen-heading" }, rs = { class: "exp-result-stats" }, os = { class: "exp-prize" }, ls = { class: "exp-result-build" }, cs = { class: "exp-muted" }, us = {
  key: 5,
  class: "exp-pause-overlay"
}, ds = { class: "exp-panel" }, fs = { class: "exp-muted" }, ps = ["disabled"], hs = {
  key: 6,
  class: "exp-keyboard-hint"
}, ms = ["aria-label"], vs = ["aria-label"], gs = ["aria-label"], ys = {
  key: 1,
  class: "exp-oaths"
}, Ms = { key: 0 }, ks = [
  "checked",
  "disabled",
  "onChange"
], xs = { key: 0 }, bs = { class: "exp-inventory" }, ws = [
  "disabled",
  "title",
  "onClick"
], _s = { class: "exp-muted" }, Zs = { key: 0 }, As = { class: "exp-inventory" }, Cs = ["disabled"], Is = { class: "exp-journal-tabs" }, Es = ["aria-pressed"], Ps = ["aria-pressed"], Ss = ["aria-pressed"], Ts = { class: "exp-collection" }, $s = { key: 0 }, zs = { class: "exp-muted" }, Rs = { key: 0 }, js = { class: "exp-list exp-receipts" }, Ls = { key: 0 }, Os = { class: "exp-list" }, qs = ["disabled"], Hs = ["disabled"], Qs = /* @__PURE__ */ da({
  __name: "ExpeditionRoom",
  props: {
    bridge: {},
    chatIdentity: {},
    generationActive: { type: Boolean }
  },
  setup(a) {
    const e = a, n = mn(e.bridge, e.chatIdentity), { view: t, busy: i, notice: l, blocked: o, failed: u } = n, s = oe(() => t.value?.data.active ?? null), c = Y("blade"), m = Y([]), f = Y(!0), h = Y(!1), x = Y(null), d = Y(null), p = Y(null), k = Y(null), w = Y(null), _ = Y(null), C = Y(0), P = Y(null), $ = Y(null), V = Y(null), Q = Y(!0);
    let de = !1;
    const N = Y("records"), I = Object.keys(_e), z = oe(() => s.value && !la(s.value)), L = oe(() => !Q.value && s.value?.phase === "battle"), ne = oe(() => f.value || Q.value || e.generationActive || !!l.value || !!d.value || !!_.value), U = oe(() => x.value?.enemies.find((R) => ue(R.kind))), le = oe(() => L.value && x.value ? x.value.player.hp : s.value?.hp ?? T.maxHp), fe = oe(() => s.value?.relics.length === T.relicSlots), ae = oe(() => s.value ? ut(s.value) : 0), Ze = oe(() => s.value ? ct(s.value) : 0), ke = oe(() => s.value ? ea[s.value.bosses[Ze.value]] : ""), j = oe(() => t.value?.data.equippedOutfit ?? "traveler"), ie = oe(() => {
      const R = x.value;
      return R ? R.encounter === "ritual" ? g.objectiveProgress(R.objective.progress, R.objective.target) : R.encounter === "siege" ? g.beacon(R.objective.hp) : R.encounter === "survival" ? g.survive(R.objective.target - R.objective.progress) : R.encounter === "pursuit" && R.wave < R.waves ? g.reinforcement(R.objective.target - R.objective.progress) : g.wave(R.wave, R.waves) : "";
    }), G = oe(() => t.value && I.find((R) => !Ye(t.value.data, R))), me = oe(() => t.value?.data.awards.filter((R) => R.actionId === t.value?.data.last?.id) ?? []), xe = oe(() => t.value?.data.awards.filter((R) => R.runId === s.value?.id).reduce((R, E) => R + E.amount, 0) ?? 0), Ie = oe(() => {
      if (!me.value.length || s.value?.phase !== "reward" || !s.value.battle?.boss) return [];
      const R = t.value.data.bossClears.length;
      return [...I.filter((E) => _e[E].unlock === R).map((E) => Pe[E].name), ...ua.filter((E) => me.value.some((y) => y.key === We[E].achievement)).map((E) => He[E].name)];
    });
    Mt(w, () => {
      d.value = null, p.value = null;
    }), gt(() => d.value || p.value ? (d.value = null, p.value = null, !0) : Q.value ? !1 : (f.value = !0, Q.value = !0, !0)), Qe(() => e.generationActive, (R) => {
      R && (f.value = !0);
    }), Qe(() => s.value?.phase, (R) => {
      R !== "battle" && (x.value = null);
    }), Qe(l, async (R) => {
      R && (d.value || p.value) && (await vt(), V.value?.focus({ preventScroll: !0 }));
    });
    function Oe(R) {
      m.value = m.value.includes(R) ? m.value.filter((E) => E !== R) : [...m.value, R];
    }
    async function O() {
      await n.act({
        type: "start",
        weapon: c.value,
        outfit: j.value,
        oaths: m.value
      }) && (Q.value = !1, f.value = !1);
    }
    async function ha(R) {
      await n.act({
        type: "route",
        id: R
      }) && (f.value = !1);
    }
    async function Ne(R, E = null) {
      if (fe.value && E === null && !s.value?.relics.some((y) => y.id === R)) {
        p.value = R;
        return;
      }
      await n.act({
        type: "relic",
        id: R,
        replace: E
      }) && (p.value = null);
    }
    async function na() {
      await n.recover() && (C.value++, f.value = !0);
    }
    async function De() {
      d.value = null, await k.value?.flush(), await n.act({ type: "abandon" }) && (Q.value = !0);
    }
    async function Ue() {
      await n.read() && C.value++;
    }
    function Ge() {
      Q.value = !1, f.value = !1;
    }
    function ve(R) {
      f.value = !0, d.value = R;
    }
    return Ca(async () => {
      await n.read(), de = !0;
    }), Va(() => {
      de && Ue();
    }), Ya(() => {
      f.value = !0;
    }), Ia(n.dispose), (R, E) => (Z(), A("section", {
      class: qe(["exp-app", {
        "exp-is-battle": L.value,
        "exp-is-camp": Q.value,
        "exp-is-between": !Q.value && !L.value
      }]),
      "data-zone": ae.value
    }, [
      (Z(), Re(jn, {
        key: C.value,
        ref_key: "field",
        ref: k,
        run: s.value,
        client: r(n),
        paused: ne.value,
        camp: Q.value,
        "generation-active": a.generationActive,
        weapon: z.value ? s.value.weapon : c.value,
        outfit: z.value ? s.value.outfit : j.value,
        sound: h.value,
        onPause: E[0] || (E[0] = (y) => f.value = !0),
        onError: E[1] || (E[1] = (y) => _.value = y),
        onHud: E[2] || (E[2] = (y) => x.value = y)
      }, null, 8, [
        "run",
        "client",
        "paused",
        "camp",
        "generation-active",
        "weapon",
        "outfit",
        "sound"
      ])),
      v("header", ni, [!Q.value && s.value ? (Z(), A("div", ii, [
        v("span", null, b(r(g).progress(r(ia)[ae.value], s.value.step % r(T).zoneSteps)), 1),
        v("div", {
          class: "exp-health-track",
          role: "progressbar",
          "aria-label": r(g).hp,
          "aria-valuenow": Math.ceil(le.value),
          "aria-valuemin": 0,
          "aria-valuemax": r(T).maxHp
        }, [v("i", { style: Fe({ width: le.value / r(T).maxHp * 100 + "%" }) }, null, 4), v("b", null, [ce(b(Math.ceil(le.value)), 1), v("small", null, " / " + b(r(T).maxHp), 1)])], 8, si),
        x.value && x.value.player.ward > 0 ? (Z(), A("span", ri, b(r(g).ward) + " " + b(Math.ceil(x.value.player.ward)), 1)) : H("", !0),
        x.value && [
          "blade",
          "staff",
          "grimoire"
        ].includes(s.value.weapon) ? (Z(), A("meter", {
          key: 1,
          class: "exp-resource",
          min: "0",
          max: "100",
          value: x.value.player.resource,
          "aria-label": r(g).resource
        }, null, 8, oi)) : H("", !0),
        v("small", { "aria-label": r(g).shards + " " + s.value.shards }, [
          W(B, { name: "shrine" }),
          ce(b(s.value.shards) + " ", 1),
          r(i) ? (Z(), A("span", ci, " · " + b(r(g).saving), 1)) : H("", !0)
        ], 8, li)
      ])) : (Z(), A("span", {
        key: 1,
        class: "exp-wallet",
        "aria-label": r(t) ? r(g).wallet(r(t).balance) : r(g).preparing
      }, [W(B, { name: "coin" }), ce(b(r(t) ? r(t).balance : r(g).preparing), 1)], 8, ui)), v("nav", di, [
        v("button", {
          type: "button",
          "aria-label": r(g).sound,
          "aria-pressed": h.value,
          onClick: E[3] || (E[3] = (y) => h.value = !h.value)
        }, [W(B, { name: h.value ? "sound" : "mute" }, null, 8, ["name"])], 8, fi),
        Q.value && z.value ? (Z(), A("button", {
          key: 0,
          type: "button",
          "aria-label": r(g).wardrobe,
          onClick: E[4] || (E[4] = (y) => ve("wardrobe"))
        }, [W(B, { name: "wardrobe" })], 8, pi)) : H("", !0),
        Q.value ? (Z(), A("button", {
          key: 1,
          type: "button",
          "aria-label": r(g).help,
          onClick: E[5] || (E[5] = (y) => ve("help"))
        }, [W(B, { name: "help" })], 8, hi)) : H("", !0),
        Q.value ? H("", !0) : (Z(), A("button", {
          key: 2,
          type: "button",
          "aria-label": r(g).equipment,
          onClick: E[6] || (E[6] = (y) => ve("bag"))
        }, [W(B, { name: "bag" })], 8, mi)),
        L.value ? (Z(), A("button", {
          key: 3,
          type: "button",
          "aria-label": r(g).pause,
          onClick: E[7] || (E[7] = (y) => f.value = !0)
        }, [W(B, { name: "pause" })], 8, vi)) : (Z(), A("button", {
          key: 4,
          type: "button",
          "aria-label": r(g).archive,
          onClick: E[8] || (E[8] = (y) => ve("journal"))
        }, [W(B, { name: "journal" })], 8, gi))
      ])]),
      v("div", {
        ref_key: "noticeHost",
        ref: P
      }, null, 512),
      U.value && !Q.value ? (Z(), A("div", {
        key: 0,
        class: "exp-boss",
        role: "progressbar",
        "aria-label": r(ea)[U.value.kind],
        "aria-valuenow": Math.ceil(U.value.hp),
        "aria-valuemin": 0,
        "aria-valuemax": Math.ceil(U.value.maxHp)
      }, [v("span", null, [
        W(B, { name: "boss" }),
        ce(b(r(ea)[U.value.kind]), 1),
        v("small", null, b(r(g).bossPhase(U.value.phase)), 1)
      ]), v("div", null, [v("i", { style: Fe({ width: U.value.hp / U.value.maxHp * 100 + "%" }) }, null, 4)])], 8, yi)) : x.value && L.value ? (Z(), A("span", Mi, [v("strong", null, b(r(sa)[x.value.encounter].name), 1), ce(" · " + b(ie.value), 1)])) : H("", !0),
      L.value && x.value && x.value.tick < 54 && !ne.value ? (Z(), A("div", ki, [
        v("small", null, b(r(g).chapter(Ze.value)), 1),
        v("strong", null, b(U.value ? r(ea)[U.value.kind] : r(sa)[x.value.encounter].name), 1),
        U.value ? H("", !0) : (Z(), A("p", xi, b(r(sa)[x.value.encounter].detail), 1))
      ])) : H("", !0),
      Q.value && r(t) ? (Z(), A("section", bi, [v("div", wi, [v("span", null, b(r(g).titleFirst), 1), v("span", null, b(r(g).titleSecond), 1)]), z.value ? (Z(), A(D, { key: 0 }, [
        v("p", _i, [ce(b(r(ia)[ae.value]), 1), v("span", null, b(r(Pe)[s.value.weapon].name), 1)]),
        v("div", Zi, [(Z(!0), A(D, null, ge(s.value.relics, (y) => (Z(), Re(B, {
          key: y.id,
          name: y.id,
          title: r(we)[y.id].name + " · " + r(g).rank(y.rank)
        }, null, 8, ["name", "title"]))), 128))]),
        v("button", {
          type: "button",
          class: "exp-primary",
          disabled: r(o) || a.generationActive,
          onClick: Ge
        }, [ce(b(r(g).resume), 1), W(B, { name: "arrow" })], 8, Ai),
        v("button", {
          type: "button",
          class: "exp-quiet",
          onClick: E[9] || (E[9] = (y) => ve("abandon"))
        }, b(r(g).abandon), 1)
      ], 64)) : (Z(), A(D, { key: 1 }, [
        v("div", Ci, [
          v("div", {
            class: "exp-weapon-select",
            "aria-label": r(g).weapons
          }, [(Z(!0), A(D, null, ge(r(I), (y) => (Z(), A("button", {
            key: y,
            type: "button",
            disabled: !r(Ye)(r(t).data, y),
            "aria-pressed": c.value === y,
            title: r(Ye)(r(t).data, y) ? r(Pe)[y].detail : r(g).weaponUnlock(r(_e)[y].unlock),
            onClick: (be) => c.value = y
          }, [
            W(B, { name: y }, null, 8, ["name"]),
            v("span", null, [ce(b(r(Pe)[y].name), 1), r(Ye)(r(t).data, y) ? H("", !0) : (Z(), A("small", Pi, b(r(g).lockedTag), 1))]),
            r(Ye)(r(t).data, y) ? H("", !0) : (Z(), Re(B, {
              key: 0,
              class: "exp-lock",
              name: "lock"
            }))
          ], 8, Ei))), 128))], 8, Ii),
          v("p", Si, [ce(b(r(Pe)[c.value].detail), 1), v("span", null, b(r(Pe)[c.value].skill), 1)]),
          G.value ? (Z(), A("p", Ti, b(r(g).weaponUnlock(r(_e)[G.value].unlock) + " · " + r(Pe)[G.value].name), 1)) : H("", !0)
        ]),
        v("div", $i, [v("button", {
          type: "button",
          class: "exp-wardrobe-entry",
          onClick: E[10] || (E[10] = (y) => ve("wardrobe"))
        }, [W(B, { name: "wardrobe" }), v("span", null, [ce(b(r(g).wardrobe), 1), v("small", null, b(r(He)[j.value].name), 1)])]), v("button", {
          type: "button",
          class: "exp-difficulty-entry",
          onClick: E[11] || (E[11] = (y) => ve("oaths"))
        }, [ce(b(r(g).oaths), 1), v("small", null, b(m.value.length ? r(g).oathCount(m.value.length) : r(g).normal), 1)])]),
        v("button", {
          type: "button",
          class: "exp-primary",
          disabled: r(o) || a.generationActive,
          onClick: O
        }, [ce(b(r(g).start), 1), W(B, { name: "arrow" })], 8, zi)
      ], 64))])) : s.value && !L.value ? (Z(), A("section", {
        key: 4,
        class: qe(["exp-between", {
          "exp-loot-screen": s.value.phase === "reward" || s.value.phase === "merchant",
          "exp-decision-screen": s.value.phase === "reward" || s.value.phase === "merchant" || r(la)(s.value)
        }])
      }, [s.value.phase === "route" ? (Z(), A(D, { key: 0 }, [
        v("header", Ri, [
          v("small", null, b(r(g).chapter(Ze.value)), 1),
          v("h2", null, b(r(ia)[ae.value]), 1),
          v("p", null, b(r(g).nextGoal(ke.value)), 1)
        ]),
        v("ol", {
          class: "exp-map",
          "aria-label": r(g).journey
        }, [(Z(!0), A(D, null, ge(r(T).zoneSteps, (y) => (Z(), A("li", {
          key: y,
          class: qe({
            "is-past": y - 1 < s.value.step % r(T).zoneSteps,
            "is-current": y - 1 === s.value.step % r(T).zoneSteps
          })
        }, [y === r(T).zoneSteps ? (Z(), Re(B, {
          key: 0,
          name: "boss"
        })) : (Z(), A("span", Li, b(y), 1))], 2))), 128))], 8, ji),
        v("h3", Oi, b(r(g).route), 1),
        v("div", qi, [(Z(!0), A(D, null, ge(s.value.routes, (y) => (Z(), A("button", {
          key: y.id,
          type: "button",
          disabled: r(o) || a.generationActive,
          "data-route": y.kind,
          onClick: (be) => ha(y.id)
        }, [
          W(B, { name: y.kind }, null, 8, ["name"]),
          v("span", null, [v("strong", null, b(y.kind === "boss" ? ke.value : r(ra)[y.kind].name), 1), v("small", null, b(["battle", "elite"].includes(y.kind) ? r(sa)[y.encounter].name + " · " + r(ra)[y.kind].detail : r(ra)[y.kind].detail), 1)]),
          W(B, {
            class: "exp-option-arrow",
            name: "arrow"
          })
        ], 8, Hi))), 128))])
      ], 64)) : s.value.phase === "reward" || s.value.phase === "merchant" ? (Z(), A(D, { key: 1 }, [v("div", Qi, [
        v("header", Ni, [v("small", null, b(s.value.phase === "merchant" ? r(ia)[ae.value] : s.value.battle?.boss ? r(g).bossDefeated(ke.value) : r(g).victory), 1), v("h2", null, b(s.value.phase === "reward" ? r(g).reward : r(g).merchant), 1)]),
        me.value.length ? (Z(), A("div", Bi, [W(B, { name: "coin" }), v("div", null, [v("strong", null, b(r(g).earned(me.value.reduce((y, be) => y + be.amount, 0))), 1), Ie.value.length ? (Z(), A("small", Fi, b(r(g).newUnlocks(Ie.value)), 1)) : H("", !0)])])) : H("", !0),
        v("div", Wi, [(Z(!0), A(D, null, ge(s.value.offers, (y) => (Z(), A("button", {
          key: y.id,
          type: "button",
          disabled: r(o) || a.generationActive || s.value.phase === "merchant" && s.value.shards < r(Ha)(y),
          "data-relic": y.id,
          style: Fe({ "--relic": r(ba)[y.id] }),
          onClick: (be) => Ne(y.id)
        }, [v("div", Ui, [W(B, { name: y.id }, null, 8, ["name"]), v("b", null, b(r(g).rank(y.rank)), 1)]), v("span", null, [
          v("small", Gi, b(s.value.relics.some((be) => be.id === y.id) ? r(g).upgrade(y.rank) : r(we)[y.id].family + " · " + r(g).newRelic), 1),
          v("strong", null, b(r(we)[y.id].name), 1),
          v("small", null, b(r(we)[y.id].detail), 1),
          s.value.phase === "merchant" ? (Z(), A("b", Ki, b(r(g).buy(r(Ha)(y))), 1)) : H("", !0)
        ])], 12, Di))), 128))]),
        s.value.offers.length ? H("", !0) : (Z(), A("p", Vi, b(r(g).noOffers), 1)),
        v("p", Yi, b(r(g).upgradeHint), 1),
        s.value.phase === "merchant" ? (Z(), A("button", {
          key: 2,
          type: "button",
          class: "exp-supply",
          disabled: r(o) || a.generationActive || s.value.shards < r(T).supplyCost || s.value.hp >= r(T).maxHp,
          onClick: E[12] || (E[12] = (y) => r(n).act({ type: "supply" }))
        }, [W(B, { name: "heart" }), v("span", null, [ce(b(r(g).supply) + " · " + b(r(g).buy(r(T).supplyCost)), 1), v("small", null, b(r(g).supplyDetail(r(T).supplyHeal * (s.value.oaths.includes("scarcity") ? 0.5 : 1))), 1)])], 8, Xi)) : H("", !0)
      ]), v("button", {
        type: "button",
        class: "exp-quiet",
        disabled: r(o) || a.generationActive,
        onClick: E[13] || (E[13] = (y) => r(n).act({ type: "leave" }))
      }, b(s.value.phase === "reward" ? r(g).discard : r(g).leave), 9, Ji)], 64)) : s.value.phase === "camp" || s.value.phase === "shrine" ? (Z(), A(D, { key: 2 }, [
        W(B, {
          class: "exp-landmark",
          name: s.value.phase
        }, null, 8, ["name"]),
        v("header", es, [v("h2", null, b(r(ra)[s.value.phase].name), 1), v("p", null, b(s.value.phase === "camp" ? r(g).restDetail(r(un)(s.value)) : r(g).sacrifice), 1)]),
        s.value.phase === "camp" ? (Z(), A("button", {
          key: 0,
          type: "button",
          class: "exp-primary",
          disabled: r(o) || a.generationActive,
          onClick: E[14] || (E[14] = (y) => r(n).act({ type: "rest" }))
        }, [ce(b(r(g).rest), 1), W(B, { name: "heart" })], 8, as)) : (Z(), A(D, { key: 1 }, [v("button", {
          type: "button",
          class: "exp-primary",
          disabled: r(o) || a.generationActive || le.value <= r(T).sacrificeHp,
          onClick: E[15] || (E[15] = (y) => r(n).act({ type: "sacrifice" }))
        }, [ce(b(le.value <= r(T).sacrificeHp ? r(g).healthCost : r(g).shrine), 1), W(B, { name: "shrine" })], 8, ts), v("button", {
          type: "button",
          class: "exp-quiet",
          disabled: r(o) || a.generationActive,
          onClick: E[16] || (E[16] = (y) => r(n).act({ type: "leave" }))
        }, b(r(g).leave), 9, ns)], 64))
      ], 64)) : r(la)(s.value) ? (Z(), A(D, { key: 3 }, [v("div", is, [
        W(B, {
          class: "exp-landmark",
          name: s.value.phase === "won" ? "crown" : "renewal"
        }, null, 8, ["name"]),
        v("header", ss, [v("small", null, b(r(Pe)[s.value.weapon].name), 1), v("h2", null, b(s.value.phase === "won" ? r(g).won : s.value.phase === "lost" ? r(g).lost : r(g).abandoned), 1)]),
        v("p", rs, b(r(g).stats(s.value.kills, s.value.ticks)), 1),
        v("div", os, [W(B, { name: "coin" }), v("strong", null, b(r(g).gold(xe.value)), 1)]),
        v("div", ls, [(Z(!0), A(D, null, ge(s.value.relics, (y) => (Z(), Re(B, {
          key: y.id,
          name: y.id,
          title: r(we)[y.id].name + " · " + r(g).rank(y.rank)
        }, null, 8, ["name", "title"]))), 128))]),
        v("p", cs, b(r(g).resultDetail), 1)
      ]), v("button", {
        type: "button",
        class: "exp-primary",
        onClick: E[17] || (E[17] = (y) => Q.value = !0)
      }, [ce(b(r(g).return), 1), W(B, { name: "arrow" })])], 64)) : H("", !0)], 2)) : H("", !0),
      L.value && ne.value && !d.value && !r(l) && !_.value ? (Z(), A("div", us, [v("section", ds, [
        W(B, {
          class: "exp-pause-emblem",
          name: "pause"
        }),
        v("h2", null, b(r(g).paused), 1),
        v("p", fs, b(r(g).controls), 1),
        v("p", null, b(r(Pe)[s.value.weapon].skill), 1),
        v("button", {
          type: "button",
          class: "exp-primary",
          disabled: r(o) || a.generationActive,
          onClick: E[18] || (E[18] = (y) => f.value = !1)
        }, [ce(b(r(g).continue), 1), W(B, { name: "arrow" })], 8, ps),
        v("button", {
          type: "button",
          class: "exp-quiet",
          onClick: E[19] || (E[19] = (y) => Q.value = !0)
        }, b(r(g).return), 1)
      ])])) : H("", !0),
      L.value && !ne.value ? (Z(), A("div", hs, [ce(b(r(g).moveKeys), 1), v("span", null, b(r(g).autoAttack), 1)])) : H("", !0),
      L.value && s.value.relics.length ? (Z(), A("div", {
        key: 7,
        class: "exp-equipped-strip",
        "aria-label": r(g).equipped
      }, [(Z(!0), A(D, null, ge(s.value.relics, (y) => (Z(), Re(B, {
        key: y.id,
        name: y.id,
        title: r(we)[y.id].name + " · " + r(g).rank(y.rank)
      }, null, 8, ["name", "title"]))), 128))], 8, ms)) : H("", !0),
      d.value || p.value ? (Z(), A("div", {
        key: 8,
        class: "exp-modal-wrap",
        onClick: E[25] || (E[25] = Xe((y) => {
          d.value = null, p.value = null;
        }, ["self"]))
      }, [v("section", {
        ref_key: "dialog",
        ref: w,
        class: qe(["exp-modal exp-panel", { "exp-wardrobe-modal": d.value === "wardrobe" }]),
        role: "dialog",
        "aria-modal": "true",
        tabindex: "-1",
        "aria-label": p.value ? r(g).replace : d.value === "wardrobe" ? r(g).wardrobe : d.value === "oaths" ? r(g).oaths : d.value === "journal" ? r(g).archive : d.value === "bag" ? r(g).equipment : d.value === "help" ? r(g).help : r(g).abandon
      }, [
        v("header", null, [v("h2", null, b(p.value ? r(g).replace : d.value === "wardrobe" ? r(g).wardrobe : d.value === "oaths" ? r(g).oaths : d.value === "journal" ? r(g).archive : d.value === "bag" ? r(g).equipment : d.value === "help" ? r(g).help : r(g).abandon), 1), v("button", {
          type: "button",
          "aria-label": r(g).close,
          onClick: E[20] || (E[20] = (y) => {
            d.value = null, p.value = null;
          })
        }, [W(B, { name: "close" })], 8, gs)]),
        v("div", {
          ref_key: "dialogNoticeHost",
          ref: $,
          class: "exp-dialog-notice-host"
        }, null, 512),
        d.value === "wardrobe" && r(t) ? (Z(), Re(ai, {
          key: 0,
          data: r(t).data,
          balance: r(t).balance,
          blocked: r(o) || a.generationActive,
          weapon: z.value ? s.value.weapon : c.value,
          onCommand: E[21] || (E[21] = (y) => r(n).act(y))
        }, null, 8, [
          "data",
          "balance",
          "blocked",
          "weapon"
        ])) : d.value === "oaths" && r(t) ? (Z(), A("div", ys, [r(t).data.victories ? H("", !0) : (Z(), A("p", Ms, b(r(g).oathsLocked), 1)), (Z(!0), A(D, null, ge(r(ca), (y) => (Z(), A("label", { key: y }, [
          v("input", {
            type: "checkbox",
            checked: m.value.includes(y),
            disabled: !r(t).data.victories,
            onChange: (be) => Oe(y)
          }, null, 40, ks),
          v("span", null, [ce(b(r(Oa)[y].name), 1), v("small", null, b(r(Oa)[y].detail), 1)]),
          r(t).data.oathWins.includes(y) ? (Z(), A("b", xs, "✓")) : H("", !0)
        ]))), 128))])) : p.value ? (Z(), A(D, { key: 2 }, [v("p", null, b(r(we)[p.value].name), 1), v("div", bs, [(Z(!0), A(D, null, ge(s.value.relics, (y) => (Z(), A("button", {
          key: y.id,
          type: "button",
          disabled: r(o) || r(Ma)(s.value, p.value, y.id),
          title: r(Ma)(s.value, p.value, y.id) ? r(g).requiredRelic : void 0,
          style: Fe({ "--relic": r(ba)[y.id] }),
          onClick: (be) => Ne(p.value, y.id)
        }, [W(B, { name: y.id }, null, 8, ["name"]), v("span", null, [v("strong", null, b(r(we)[y.id].name) + " · " + b(r(g).rank(y.rank)), 1), v("small", null, b(r(Ma)(s.value, p.value, y.id) ? r(g).requiredRelic : r(we)[y.id].detail), 1)])], 12, ws))), 128))])], 64)) : d.value === "bag" ? (Z(), A(D, { key: 3 }, [
          v("p", _s, b(r(g).slots(s.value?.relics.length ?? 0)), 1),
          s.value?.relics.length ? H("", !0) : (Z(), A("p", Zs, b(r(g).noRelics), 1)),
          v("ul", As, [(Z(!0), A(D, null, ge(s.value?.relics, (y) => (Z(), A("li", {
            key: y.id,
            style: Fe({ "--relic": r(ba)[y.id] })
          }, [W(B, { name: y.id }, null, 8, ["name"]), v("span", null, [v("strong", null, b(r(we)[y.id].name) + " · " + b(r(g).rank(y.rank)), 1), v("small", null, b(r(we)[y.id].detail), 1)])], 4))), 128))])
        ], 64)) : d.value === "help" ? (Z(), A(D, { key: 4 }, [
          v("p", null, b(r(g).controls), 1),
          v("p", null, b(r(g).autoAttack), 1),
          v("p", null, b(r(g).lootPool), 1),
          v("p", null, b(r(g).checkpoint), 1),
          v("p", null, b(r(g).rewardRule), 1)
        ], 64)) : d.value === "abandon" ? (Z(), A(D, { key: 5 }, [v("p", null, b(r(g).abandonBody), 1), v("button", {
          type: "button",
          class: "exp-primary",
          disabled: r(o) || a.generationActive,
          onClick: De
        }, b(r(g).confirm), 9, Cs)], 64)) : d.value === "journal" && r(t) ? (Z(), A(D, { key: 6 }, [v("nav", Is, [
          v("button", {
            type: "button",
            "aria-pressed": N.value === "records",
            onClick: E[22] || (E[22] = (y) => N.value = "records")
          }, b(r(g).history), 9, Es),
          v("button", {
            type: "button",
            "aria-pressed": N.value === "relics",
            onClick: E[23] || (E[23] = (y) => N.value = "relics")
          }, b(r(g).discoveries), 9, Ps),
          v("button", {
            type: "button",
            "aria-pressed": N.value === "awards",
            onClick: E[24] || (E[24] = (y) => N.value = "awards")
          }, b(r(g).awardHistory), 9, Ss)
        ]), N.value === "relics" ? (Z(), A(D, { key: 0 }, [v("h3", null, b(r(g).discoveries) + " " + b(r(t).data.discoveries.length) + " / " + b(r(_a).length), 1), v("ul", Ts, [(Z(!0), A(D, null, ge(r(_a), (y) => (Z(), A("li", {
          key: y,
          class: qe({ "is-unknown": !r(t).data.discoveries.includes(y) })
        }, [
          W(B, { name: r(t).data.discoveries.includes(y) ? y : "lock" }, null, 8, ["name"]),
          v("strong", null, b(r(t).data.discoveries.includes(y) ? r(we)[y].name : r(g).unknown), 1),
          r(t).data.discoveries.includes(y) ? (Z(), A("small", $s, b(r(we)[y].detail), 1)) : H("", !0)
        ], 2))), 128))])], 64)) : N.value === "awards" ? (Z(), A(D, { key: 1 }, [
          v("p", null, b(r(g).totalEarned(r(t).data.awards.reduce((y, be) => y + be.amount, 0))), 1),
          v("p", zs, b(r(g).rewardRule), 1),
          r(t).data.awards.length ? H("", !0) : (Z(), A("p", Rs, b(r(g).noAwards), 1)),
          v("ul", js, [(Z(!0), A(D, null, ge([...r(t).data.awards].reverse(), (y) => (Z(), A("li", { key: y.key }, [
            v("strong", null, b(r(qt)(y.key)), 1),
            v("b", null, "+" + b(y.amount), 1),
            v("details", null, [v("summary", null, b(r(g).receipt), 1), v("code", null, b(y.actionId), 1)])
          ]))), 128))])
        ], 64)) : (Z(), A(D, { key: 2 }, [r(t).data.records.length ? H("", !0) : (Z(), A("p", Ls, b(r(g).journalEmpty), 1)), v("ul", Os, [(Z(!0), A(D, null, ge(r(t).data.records, (y) => (Z(), A("li", { key: y.id }, [v("strong", null, b(r(Pe)[y.weapon].name) + " · " + b(y.outcome === "won" ? r(g).mastered : r(g).reached(Math.floor(y.step / r(T).zoneSteps))), 1), v("small", null, b(r(g).stats(y.kills, y.ticks)), 1)]))), 128))])], 64))], 64)) : H("", !0)
      ], 10, vs)])) : H("", !0),
      P.value ? (Z(), Re(xt, {
        key: 9,
        to: $.value ?? P.value
      }, [r(l) || _.value || a.generationActive ? (Z(), A("aside", {
        key: 0,
        ref_key: "noticePanel",
        ref: V,
        class: "exp-notice",
        role: "alert",
        tabindex: "-1"
      }, [
        v("p", null, b(_.value ? r(g).presentationError[_.value] : r(l) || r(g).story), 1),
        r(l) || r(u) ? (Z(), A("button", {
          key: 0,
          type: "button",
          disabled: r(i) || a.generationActive,
          onClick: na
        }, b(r(g).retry), 9, qs)) : H("", !0),
        r(t)?.writeState === "conflict" || !r(t) ? (Z(), A("button", {
          key: 1,
          type: "button",
          disabled: r(i),
          onClick: Ue
        }, b(r(g).refresh), 9, Hs)) : H("", !0),
        _.value === "sound" ? (Z(), A("button", {
          key: 2,
          type: "button",
          onClick: E[26] || (E[26] = (y) => {
            h.value = !1, _.value = null;
          })
        }, b(r(g).close), 1)) : H("", !0)
      ], 512)) : H("", !0)], 8, ["to"])) : H("", !0)
    ], 10, ti));
  }
}), Us = Qs;
export {
  Us as default
};
