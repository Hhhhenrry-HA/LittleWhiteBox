/* eslint-disable */
import { B as $a, C as q, D as le, F as st, G as ge, I as za, O as W, P as Zt, Q as Ne, R as rt, S as Le, U as _, _ as G, at as X, b as re, dt as Fe, ft as b, g as Ke, k as ga, lt as r, o as Ct, ot as qa, p as At, s as Pt, tt as Et, ut as Oe, w as A, x as g, y as It } from "./xiaobai-os-frame-bridge-CrPFvkI3.js";
import { C as ot, Ct as St, Dt as Tt, Ft as pa, Nt as Qa, Q as $t, S as ra, St as Ba, X as Fa, Y as Ve, a as zt, at as lt, bt as ct, c as jt, f as Rt, g as Ea, m as Lt, t as ut, u as ja, v as Da, vt as _a, w as Ot, x as Nt, xt as Ht, yt as dt } from "./xiaobai-os-three.module-CTsY3HDb.js";
import { n as qt, o as Qt } from "./xiaobai-os-performance-C_L35DGq.js";
import { t as Bt } from "./xiaobai-os-BufferGeometryUtils-DP7IVjMs.js";
import { C as Ft, E as ma, S as we, T as Dt, _ as va, a as De, b as ye, c as Se, d as Wt, f as Wa, g as te, h as Te, i as Ua, l as ua, m as Ra, n as ta, o as xe, p as Ut, r as sa, s as da, t as y, u as Gt, v as Kt, w as ue, x as R, y as Ia } from "./xiaobai-os-copy-tZe7hhYt.js";
function ft(a) {
  return a.seed = Math.imul(a.seed, 1664525) + 1013904223 >>> 0, a.seed / 4294967296;
}
function Vt() {
  return Array.from(crypto.getRandomValues(new Uint32Array(4)), (a) => a.toString(16).padStart(8, "0")).join("");
}
function qe(a) {
  throw Object.assign(/* @__PURE__ */ new Error(`expedition_${a}`), { code: `expedition_${a}` });
}
var ie = (a, e, n = 0) => ({
  family: a,
  chapter: n,
  ...e ? { requires: [e] } : {}
}), F = (a, e = 0) => ({
  family: a,
  weapons: [a],
  chapter: e
}), pt = {
  "storm-step": ie("storm"),
  conductor: ie("storm", [
    "storm-step",
    "orbit",
    "momentum",
    "command"
  ]),
  momentum: ie("storm"),
  cinder: ie("fire"),
  wildfire: ie("fire", ["cinder", "inferno"]),
  "blood-price": ie("risk"),
  frost: ie("frost"),
  shatter: ie("frost", [
    "frost",
    "nova",
    "pinning",
    "trapper",
    "orbitals"
  ]),
  echo: ie("skill"),
  hunter: {
    ...ie("bow"),
    weapons: [
      "bow",
      "staff",
      "grimoire",
      "cannon"
    ]
  },
  piercing: ie("blade"),
  orbit: ie("storm"),
  thorns: ie("guard"),
  aegis: ie("guard"),
  siphon: ie("life"),
  focus: ie("skill"),
  renewal: ie("life"),
  execution: ie("blade"),
  "last-stand": ie("guard", void 0, 1),
  quicksilver: ie("skill"),
  magnet: ie("skill"),
  wardstone: ie("guard"),
  pilgrim: ie("life"),
  gambit: ie("risk", void 0, 1),
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
}, x = (a, e) => a.relics.find((n) => n.id === e)?.rank ?? 0;
function Ga(a, e, n = null) {
  const t = pt[e];
  return (!t.weapons || t.weapons.includes(a.weapon)) && (!t.requires || t.requires.every((i) => i.some((l) => l !== n && x(a, l) > 0)));
}
function Za(a, e, n) {
  return n !== null && Ga(a, e) && !Ga(a, e, n);
}
function Ka(a) {
  return R.shopCost + (a.rank - 1) * 35;
}
var He = Math.PI * 2, $ = (a, e) => Math.hypot(a.x - e.x, a.y - e.y), ne = (a, e) => Math.atan2(e.y - a.y, e.x - a.x), ht = (a) => (a - 1) * Math.PI / 4 - Math.PI / 2, Ce = (a, e, n) => ({
  x: a.x + Math.cos(e) * n,
  y: a.y + Math.sin(e) * n
});
function _e(a, e, n, t, i) {
  e.x += Math.cos(n) * t, e.y += Math.sin(n) * t;
  for (const l of a.obstacles) {
    const o = $(e, l), u = i + l.radius;
    if (o < u) {
      const s = o < 1e-3 ? n : ne(l, e);
      e.x = l.x + Math.cos(s) * u, e.y = l.y + Math.sin(s) * u;
    }
  }
  e.x = Math.max(-R.arena + i, Math.min(R.arena - i, e.x)), e.y = Math.max(-R.arena + i, Math.min(R.arena - i, e.y));
}
function Yt(a, e, n, t) {
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
function me(a, e, n) {
  if (!ue(e) && a.enemies.filter((l) => l.hp > 0).length >= R.maxEnemies) return null;
  const t = te[e].hp * (ue(e) ? 1 : 1 + a.chapter * 0.2 + (a.elite ? 0.25 : 0)), i = {
    id: ++a.serial,
    kind: e,
    x: n.x,
    y: n.y,
    hp: t,
    maxHp: t,
    angle: Math.PI / 2,
    cooldown: 35 + Math.floor(ft(a) * 20),
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
function ze(a, e, n, t, i, l = {}) {
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
function ee(a, e, n, t, i, l, o, u = !1, s = {}) {
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
function Ie(a, e, n, t, i) {
  return ee(a, e, "slam", n, t, 8, i);
}
function pe(a, e, n, t, i, l, o) {
  return ee(a, e, "beam", 0, l, 9, o, !1, {
    angle: n,
    length: t,
    width: i
  });
}
function $e(a, e, n, t, i, l, o = 0.22) {
  for (let u = 0; u < t; u++) ze(a, e, n + (u / Math.max(1, t - 1) - 0.5) * i, l, !1, { speed: o });
}
function Va(a, e, n, t, i, l = 0.16) {
  for (let o = 0; o < n; o++) ze(a, e, t + o * He / n, i, !1, { speed: l });
}
function Sa(a, e, n, t, i = 0) {
  const l = {
    id: ++a.serial,
    kind: e,
    x: n.x,
    y: n.y,
    hp: e === "turret" ? 65 : e === "familiar" ? Te.familiarHp : 38,
    life: t,
    cooldown: 12,
    angle: 0,
    empowered: i
  };
  return a.companions.push(l), l;
}
var Xt = (a) => a === "attack" || a === "skill";
function mt(a, e) {
  if (a.player.hp <= 0) return;
  const n = Math.min(R.maxHp - a.player.hp, e);
  a.player.hp += n, n > 0 && se(a, a.player, "heal");
}
function je(a, e, n) {
  if (ue(e.kind)) {
    if (e.stagger += n, e.stagger < 100) return;
    e.stagger = 0, n = 24;
  }
  e.stun = Math.max(e.stun, n), e.windup = 0, e.motion = 0, e.cooldown = Math.max(20, e.cooldown), se(a, e, "guard", 1.4);
}
function Me(a, e, n, t, i, l = a.player) {
  if (e.hp <= 0) return;
  let o = n * (x(t, "blood-price") ? ye.bloodDamage + (x(t, "blood-price") - 1) * 0.12 : 1);
  if (x(t, "execution") && e.hp / e.maxHp < ye.executeThreshold && (o *= ye.executeDamage + (x(t, "execution") - 1) * 0.1), e.exposed > 0 && (o *= 1.25), e.kind === "guard" && i === "attack" && Math.cos(ne(e, l) - e.angle) > 0.4 && e.exposed <= 0 && (o *= x(t, "shield-break") ? 0.8 : 0.35), e.kind !== "priest" && !ue(e.kind) && a.enemies.some((u) => u.kind === "priest" && u.hp > 0 && $(e, u) < 3.5) && (o *= 0.7), i === "attack" && x(t, "backstab") && Math.cos(ne(e, a.player) - e.angle) < -0.3 && (o *= 1.6 + x(t, "backstab") * 0.2, e.exposed = 55), i === "attack" && x(t, "duelist") && je(a, e, 9 * x(t, "duelist")), (i === "skill" || i === "companion" && t.weapon === "cannon") && e.chill > 0 && x(t, "shatter")) {
    o += 15 * x(t, "shatter"), e.chill = 0, se(a, e, "burst", 2.2);
    for (const u of a.enemies) u.id !== e.id && $(e, u) < 2.2 && Me(a, u, 9 * x(t, "shatter"), t, "passive", e);
  }
  if (Xt(i) && (x(t, "cinder") && (e.burn = Math.max(e.burn, 80 + x(t, "cinder") * 25)), x(t, "frost") && (e.chill = Math.max(e.chill, 45 + x(t, "frost") * 20)), (x(t, "blood-dance") || x(t, "hemorrhage")) && (e.bleed = 100 + 25 * (x(t, "blood-dance") + x(t, "hemorrhage"))), x(t, "venom") && (e.poison = 100 + x(t, "venom") * 35), x(t, "overload") && e.burn > 0 && e.chill > 0 && (e.burn = 0, e.chill = 0, o += 20 * x(t, "overload"), se(a, e, "lightning")), i === "skill" && x(t, "hunter-mark") && (e.exposed = 100 + x(t, "hunter-mark") * 40), x(t, "inferno") && e.burn && i === "skill" && ee(a, e, "fire", 1.5 + x(t, "inferno") * 0.3, 0, 70, 4 * x(t, "inferno"), !0)), e.hp = Math.max(0, e.hp - o), e.marked = 5, i === "lightning" && x(t, "momentum") && a.tick % 6 === 0 && (a.player.dash = Math.max(0, a.player.dash - x(t, "momentum") * 2)), !(e.hp > 0)) {
    if (a.kills++, se(a, e, "burst", ue(e.kind) ? 3 : 0.8), x(t, "wildfire") && e.burn > 0 && ee(a, e, "fire", 1.8 + x(t, "wildfire") * 0.2, 0, 90, 3 * x(t, "wildfire"), !0), x(t, "fracture") && e.chill > 0) for (let u = 0; u < 4 + x(t, "fracture"); u++) ze(a, e, u * He / (4 + x(t, "fracture")), 9, !0, { source: "passive" });
    if (x(t, "siphon") && (a.kills % ye.siphonEvery === 0 || ue(e.kind)) && mt(a, (ue(e.kind) ? ye.siphonBossHeal : ye.siphonHeal) + x(t, "siphon") - 1), x(t, "execution-chain") && (a.player.dash = Math.max(0, a.player.dash - 12 * x(t, "execution-chain")), a.player.skill = Math.max(0, a.player.skill - 8)), x(t, "soul-harvest") && (a.player.resource = Math.min(Te.maxPower, a.player.resource + 9 * x(t, "soul-harvest"))), i === "companion" && x(t, "salvage") && (a.player.skill = Math.max(0, a.player.skill - 12 * x(t, "salvage"))), x(t, "magnet"))
      for (const u of a.enemies) u.hp > 0 && $(e, u) < 3 + x(t, "magnet") && _e(a, u, ne(u, e), 0.7, te[u.kind].radius);
  }
}
function Ta(a, e, n, t) {
  const i = [e];
  x(n, "conductor") && i.push(...a.enemies.filter((l) => l.id !== e.id && l.hp > 0 && $(l, e) < 4.5).sort((l, o) => $(l, e) - $(o, e)).slice(0, x(n, "conductor") + 1));
  for (const l of i)
    se(a, l, "lightning"), Me(a, l, t, n, "lightning");
}
function vt(a, e) {
  const n = a.player, t = n.guard > 0;
  n.resource = Math.min(100, n.resource + (t ? 25 : 8)), se(a, n, t ? "parry" : "block", t ? 2 : 1, n.facing), t && (n.skill = Math.max(35, n.skill - 15));
  const i = x(e, "riposte"), l = x(e, "thorns");
  if (i || l)
    for (const o of a.enemies) $(o, n) < 3.2 + i * 0.3 && (Me(a, o, (t ? 20 : 8) * i + 9 * l, e, "passive"), je(a, o, t ? 20 : 7));
}
function ya(a, e, n) {
  const t = a.player;
  if (t.invulnerable > 0 || t.hp <= 0) return;
  if (t.shield > 0) {
    vt(a, n), t.invulnerable = t.guard > 0 ? 8 : 4;
    return;
  }
  let i = e * we[n.weapon].guard * (x(n, "blood-price") ? ye.bloodHurt : 1) * (x(n, "gambit") ? 1.2 : 1);
  const l = Math.min(t.ward, i);
  if (t.ward -= l, i -= l, t.hp <= i && x(n, "last-stand") && !t.rescues) {
    t.rescues++, t.hp = 15 + x(n, "last-stand") * 8, t.invulnerable = 60, se(a, t, l > 0 ? "ward-break" : "guard", 3);
    return;
  }
  if (t.hp = Math.max(0, t.hp - i), a.damageTaken += i, t.invulnerable = 18, t.lastHit = a.tick, se(a, t, l > 0 ? t.ward > 0 ? "ward-hit" : "ward-break" : "hit"), x(n, "thorns"))
    for (const o of a.enemies) $(o, t) < 3 && Me(a, o, 10 * x(n, "thorns"), n, "passive");
}
function oa(a, e, n = 45) {
  a.ward += Math.max(0, Math.min(e, n - a.ward));
}
function Ya(a, e, n, t = !1) {
  const i = we[e.weapon], l = a.player, o = ne(l, n), u = (t ? 0.6 : 1) * (x(e, "gambit") ? 1 + x(e, "gambit") * 0.12 : 1);
  if (l.facing = o, l.swing = e.weapon === "cannon" ? 15 : 8, e.weapon === "blade" || e.weapon === "daggers") {
    const f = i.range + x(e, "piercing") * 0.25;
    se(a, l, "slash", f, o);
    for (const p of a.enemies)
      $(l, p) > f + te[p.kind].radius || Math.cos(ne(l, p) - o) < -0.1 || (Me(a, p, i.damage * u, e, "attack"), e.weapon === "blade" && !t && l.combo % 3 === 2 && je(a, p, 14));
    e.weapon === "blade" && (l.resource = Math.min(100, l.resource + 9), x(e, "cleave-wave") && l.combo % 3 === 2 && ze(a, l, o, 14 * x(e, "cleave-wave"), !0, {
      pierce: 5,
      radius: 0.4,
      speed: 0.3,
      source: "passive"
    }));
    return;
  }
  let s = i.damage * u;
  x(e, "distance-draw") && (s *= 1 + Math.min(1, $(l, n) / 8) * 0.15 * x(e, "distance-draw")), e.weapon === "staff" && (l.resource = Math.min(100, l.resource + 18)), e.weapon === "grimoire" && (l.resource = Math.min(Te.maxPower, l.resource + 12));
  const c = x(e, "piercing") * ye.extraPierce + x(e, "railgun") * 2, h = ze(a, l, o, s, !0, {
    pierce: c,
    speed: e.weapon === "bow" ? 0.38 : 0.28,
    splash: e.weapon === "staff" ? 1.4 : e.weapon === "cannon" ? 1.8 + x(e, "shrapnel") * 0.3 : 0,
    bounce: x(e, "ricochet"),
    radius: e.weapon === "cannon" ? 0.3 : 0.16
  });
  if (e.weapon === "bow" && x(e, "split-arrow") && l.combo % 3 === 2) for (const f of [-0.18, 0.18]) ze(a, l, o + f, s * (0.35 + x(e, "split-arrow") * 0.1), !0, {
    speed: h.speed,
    pierce: c
  });
}
function Jt(a, e, n) {
  const t = a.player, i = we[e.weapon], l = x(e, "focus");
  switch (t.skill = Math.round(i.skillCooldown * (l ? ye.focusSkill - (l - 1) * 0.06 : 1)), x(e, "aegis") && (t.shield = 18 + x(e, "aegis") * 6, t.guard = 8, oa(t, x(e, "aegis") * 6)), e.weapon) {
    case "blade": {
      t.shield = 26 + x(e, "aegis") * 6, t.guard = 9;
      const o = 1 + t.resource / 100;
      t.resource = 0, se(a, t, "slash", 3.6, t.facing);
      for (const u of a.enemies)
        u.hp <= 0 || $(t, u) > 3.6 + te[u.kind].radius || (x(e, "shield-break") && (u.exposed = 70 + 30 * x(e, "shield-break")), Me(a, u, i.skill * o, e, "skill"), je(a, u, 40), ue(u.kind) || _e(a, u, ne(t, u), 1.5, te[u.kind].radius));
      x(e, "valor") && oa(t, 12 * x(e, "valor") * o);
      break;
    }
    case "bow":
      for (let o = -2; o <= 2; o++) ze(a, t, t.facing + o * 0.15, i.skill, !0, {
        pierce: 6,
        speed: 0.42,
        source: "skill"
      });
      _e(a, t, t.facing + Math.PI, 0.85, R.playerRadius);
      break;
    case "staff": {
      const o = n ?? t, u = 1 + t.resource / 125;
      if (t.resource = 0, x(e, "convergence"))
        for (const s of a.enemies) $(s, o) < 4 + x(e, "convergence") && _e(a, s, ne(s, o), 1.2, te[s.kind].radius);
      for (let s = 0; s < 3; s++) ee(a, Ce(o, s * He / 3, 0.7), "slam", 2.3, 10 + s * 10, 1, i.skill * u, !0, { source: "skill" });
      if (x(e, "nova")) {
        ee(a, t, "frost", 3 + x(e, "nova") * 0.5, 0, 32, 6 * x(e, "nova"), !0, { source: "skill" });
        for (const s of a.enemies) $(t, s) < 3.5 && (s.chill = 120, je(a, s, 25));
      }
      break;
    }
    case "daggers":
      if (t.invulnerable = Math.max(t.invulnerable, 12), n) {
        const o = Ce(n, n.angle + Math.PI, te[n.kind].radius + 0.55);
        _e(a, t, ne(t, o), Math.min(5, $(t, o)), R.playerRadius), t.facing = ne(t, n), n.exposed = 60, Me(a, n, i.skill, e, "skill"), je(a, n, 20), se(a, t, "slash", 2, t.facing);
      }
      x(e, "shadowstep") && Sa(a, "shade", t, 95 + x(e, "shadowstep") * 30, x(e, "shadowstep"));
      break;
    case "grimoire": {
      const o = t.resource;
      t.resource = 0, t.resonance = Te.resonanceTicks + o, se(a, t, "resonance", 2);
      for (const u of a.companions) u.kind === "familiar" && u.hp > 0 && u.life > 0 && (u.hp = Math.max(u.hp, Te.familiarHp), u.cooldown = 0);
      n && (n.exposed = 100, Me(a, n, i.skill + o * 0.3, e, "skill")), x(e, "command") && ee(a, n ?? t, "storm", 2.4 + x(e, "command") * 0.3, 10, 65, 7 * x(e, "command"), !0, { source: "skill" });
      break;
    }
    case "cannon": {
      const o = 1 + (x(e, "overclock") >= 2 ? 1 : 0), u = a.companions.filter((s) => s.kind === "turret");
      u.length >= o && (u[0].life = 0), Sa(a, "turret", Ce(t, t.facing, 0.9), 240 + x(e, "overclock") * 45, x(e, "overclock")), x(e, "bunker") && oa(t, 15 * x(e, "bunker"));
      break;
    }
  }
}
function en(a, e, n) {
  const t = a.player, i = x(n, "quicksilver");
  if (t.dash = Math.round(R.dashCooldown * (1 - i * 0.08)), t.dashTime = R.dashTicks, t.dashAngle = e.move ? ht(e.move) : t.facing, t.invulnerable = R.dashTicks + 2, x(n, "storm-step") && ee(a, t, "storm", 1.7 + x(n, "storm-step") * 0.15, 0, 70, 6 + x(n, "storm-step") * 3, !0), x(n, "trapper") && ee(a, t, "frost", 1.8, 12, 110, 5 * x(n, "trapper"), !0), x(n, "minefield") && ee(a, t, "mine", 2 + x(n, "minefield") * 0.2, 12, 180, 25 * x(n, "minefield"), !0), x(n, "smoke")) {
    for (const l of a.enemies) $(l, t) < 3 + x(n, "smoke") * 0.4 && (je(a, l, 30 + x(n, "smoke") * 8), l.exposed = 65);
    se(a, t, "guard", 3);
  }
}
function an(a, e, n) {
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
  const i = a.enemies.filter((u) => u.hp > 0).sort((u, s) => $(t, u) - $(t, s))[0];
  e.dash && !t.dash && !t.dashTime && en(a, e, n);
  const l = {
    x: t.x,
    y: t.y
  };
  if (t.dashTime > 0)
    _e(a, t, t.dashAngle, R.speed * 3.6, R.playerRadius), t.dashTime--, !t.dashTime && x(n, "momentum") && i && $(t, i) < 3 && Ta(a, i, n, 10 + x(n, "momentum") * 5);
  else if (e.move) {
    t.facing = ht(e.move);
    const u = t.swing > 0;
    let s = R.speed * (u ? we[n.weapon].moveFire : 1);
    x(n, "quicksilver") && t.dash > R.dashCooldown / 2 && (s *= 1 + x(n, "quicksilver") * 0.1), a.hazards.some((c) => !c.friendly && c.kind === "frost" && !c.wait && $(c, t) < c.radius) && (s *= 0.65), _e(a, t, t.facing, s, R.playerRadius);
  }
  t.travel += $(l, t), x(n, "pilgrim") && t.travel >= 28 && (t.travel -= 28, oa(t, x(n, "pilgrim") * 6, 35)), x(n, "wardstone") && a.tick - t.lastHit > 150 && a.tick % 30 === 0 && oa(t, 2, x(n, "wardstone") * 10), e.skill && !t.skill && (i && (t.facing = ne(t, i)), Jt(a, n, i));
  const o = we[n.weapon].range + (n.weapon === "blade" || n.weapon === "daggers" ? x(n, "piercing") * 0.25 : 0);
  if (i && !t.attack && $(t, i) <= o + te[i.kind].radius && (Ya(a, n, i), t.combo++, x(n, "echo") && t.combo % Math.max(2, ye.echoEvery + 1 - x(n, "echo")) === 0 && Ya(a, n, i, !0), t.attack = Math.round(we[n.weapon].period * (x(n, "focus") ? ye.focusAttack : 1))), x(n, "orbit") && a.tick % Math.round(ye.orbitTicks / (1 + x(n, "orbit") * 0.25)) === 0 && i && $(t, i) < 4.5 && Ta(a, i, n, 12 + x(n, "orbit") * 3), x(n, "orbitals") && a.tick % 35 === 0) {
    for (const u of a.enemies) $(t, u) < 2.5 + x(n, "orbitals") * 0.35 && (Me(a, u, 12 * x(n, "orbitals"), n, "passive"), u.chill = Math.max(u.chill, 30));
    se(a, t, "burst", 2.8);
  }
  return {
    x: t.x - l.x,
    y: t.y - l.y
  };
}
function tn(a, e) {
  if (a.player.resonance = Math.max(0, a.player.resonance - 1), e.weapon === "grimoire" && a.tick % 45 === 1) {
    const n = 2 + x(e, "pack-bond");
    a.companions.filter((t) => t.kind === "familiar" && t.hp > 0 && t.life > 0).length < n && Sa(a, "familiar", Ce(a.player, a.tick, 1), 36e3);
  }
  for (const n of a.companions) {
    n.life--, n.cooldown = Math.max(0, n.cooldown - 1);
    const t = a.enemies.filter((l) => l.hp > 0).sort((l, o) => $(l, n) - $(o, n))[0];
    if (n.hp <= 0 || n.life <= 0 || !t) continue;
    n.angle = ne(n, t), n.kind !== "turret" && ($(n, a.player) > 8 ? _e(a, n, ne(n, a.player), 0.19, 0.25) : $(n, t) > 1.3 && _e(a, n, n.angle, 0.14 + x(e, "frenzy") * 0.015, 0.25));
    const i = n.kind === "turret" ? 8 : 1.8;
    if (!n.cooldown && $(n, t) < i) if (n.kind === "turret")
      ze(a, n, n.angle, we.cannon.skill * (1 + n.empowered * 0.15), !0, {
        source: "companion",
        speed: 0.35
      }), n.cooldown = 28 - n.empowered * 3;
    else {
      const l = n.kind === "familiar" && a.player.resonance > 0;
      Me(a, t, n.kind === "shade" ? 9 + n.empowered * 4 : (l ? Te.empoweredDamage : Te.damage) * (1 + x(e, "covenant") * 0.15), e, "companion", n), se(a, n, "slash", 1.2, n.angle);
      const o = n.kind === "shade" ? 32 : l ? Te.empoweredAttackTicks : Te.attackTicks;
      n.cooldown = Math.round(o / (1 + x(e, "frenzy") * 0.18));
    }
  }
  for (const n of a.companions) n.hp <= 0 && n.kind === "familiar" && x(e, "martyr") && (mt(a, x(e, "martyr")), ee(a, n, "slam", 2.2, 0, 1, 15 * x(e, "martyr"), !0));
  a.companions = a.companions.filter((n) => n.hp > 0 && n.life > 0);
}
var na = Object.freeze({
  ritualTicks: 330,
  survivalTicks: 1500,
  pursuitInterval: 390,
  reinforcementInterval: 270,
  warningAfter: 1800
}), Xa = [
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
function Ca(a, e) {
  if (a.wave++, a.boss) {
    me(a, a.bossKind, {
      x: 0,
      y: -5
    });
    return;
  }
  const n = Kt[a.zone].mobs, t = 4 + a.chapter + (a.elite ? 2 : 0) + (e.oaths.includes("legion") ? 2 : 0);
  for (let i = 0; i < t; i++) {
    const l = He * i / t + (a.wave - 1) * 0.8;
    let o = n[(i + a.wave - 1) % n.length];
    a.wave === 1 && a.chapter === 0 && i < 2 && (o = n[0]), a.encounter === "pursuit" && i === 0 && (o = "stalker"), a.encounter === "siege" && i === 0 && (o = "guard"), me(a, o, {
      x: Math.cos(l) * 8.7,
      y: Math.sin(l) * 8.7
    });
  }
}
function nn(a, e) {
  if (a.boss) return;
  const n = a.objective, t = a.enemies.some((i) => i.hp > 0);
  if (a.encounter === "ritual") {
    n.progress < n.target && $(a.player, n) < 2.5 && !a.enemies.some((l) => l.hp > 0 && $(l, n) < 2.2) && n.progress++;
    const i = Math.min(2, Math.floor(n.progress / na.ritualTicks));
    n.x = Xa[i].x, n.y = Xa[i].y, a.tick % na.reinforcementInterval === 0 && n.progress < n.target && a.enemies.length < 8 && me(a, a.chapter ? "wisp" : "stalker", {
      x: n.x > 0 ? -9 : 9,
      y: ft(a) * 12 - 6
    });
  } else if (a.encounter === "survival")
    n.progress = Math.min(n.target, n.progress + 1), a.tick % na.reinforcementInterval === 0 && n.progress < n.target && a.enemies.length < 10 && Ca(a, e), a.tick % 150 === 0 && ee(a, {
      x: 0,
      y: 0
    }, "ring", 15, 35, 90, 12, !1, { inner: Math.max(4.8, 9 - a.tick / 400) });
  else if (a.encounter === "pursuit")
    n.progress = a.tick % na.pursuitInterval, a.wave < a.waves && n.progress === 0 && Ca(a, e);
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
  a.tick > na.warningAfter && a.tick % 180 === 0 && ee(a, a.player, "fire", 2.2, 36, 90, 13), !t && a.wave < a.waves && a.encounter !== "survival" ? ++a.nextWave >= 40 && (a.nextWave = 0, Ca(a, e)) : t && (a.nextWave = 0);
}
function sn(a) {
  return a.enemies.some((e) => e.hp > 0) ? !1 : !a.boss && a.encounter === "survival" ? a.objective.progress >= a.objective.target : !a.boss && a.encounter === "ritual" ? a.objective.progress >= a.objective.target && a.wave >= a.waves : a.wave >= a.waves;
}
var Ge = (a, e) => {
  a.motion = e, a.motionAngle = ne(a, a.target), a.stun = 18;
}, rn = {
  warden(a, e) {
    const n = e.pattern % 3, t = Ra.warden.damage;
    if (n === 0)
      Ge(e, 24), pe(a, e, e.motionAngle, 13, 1.1, 18, t);
    else if (n === 1) {
      for (let i = -1; i <= 1; i++) Ie(a, Ce(e, e.angle + i * 0.55, 3.5), 1.8, 12 + Math.abs(i) * 8, t);
      e.exposed = 65;
    } else
      $e(a, e, e.angle, 5 + e.phase * 2, 1.5, t * 0.65), e.phase > 1 && me(a, "guard", {
        x: -7,
        y: -7
      });
  },
  thornheart(a, e) {
    const n = e.pattern % 4;
    if (n === 0) for (let t = 0; t < 5; t++) ee(a, Ce(e.target, t * He / 5, 3.6), "poison", 1.4, 26, 110, 12);
    else if (n === 1)
      ee(a, e, "ring", 7.5, 25, 14, 22, !1, { inner: 3 }), e.exposed = 80;
    else if (n === 2) for (const t of [-7, 7]) me(a, "stalker", {
      x: t,
      y: -6
    });
    else for (let t = 0; t < 3 + e.phase; t++) pe(a, e, e.angle + t * He / (3 + e.phase), 15, 0.55, 25, 18);
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
    else if (n === 1) $e(a, e, ne(e, a.player), 7 + e.phase, 1.8, 13, 0.2);
    else if (n === 2) {
      for (let t = 0; t < 4; t++) {
        const i = Ce({
          x: 0,
          y: 0
        }, t * Math.PI / 2 + Math.PI / 4, 7);
        pe(a, i, ne(i, {
          x: 0,
          y: 0
        }), 11, 0.6, 25 + t * 8, 18);
      }
      e.exposed = 75;
    } else
      me(a, "wisp", {
        x: -7,
        y: 5
      }), me(a, "wisp", {
        x: 7,
        y: 5
      });
  },
  astrologer(a, e) {
    const n = e.pattern % 3, t = e.pattern * 0.53;
    if (n === 0) for (let i = 0; i < 7; i++)
      i !== e.phase && pe(a, e, t + i * He / 7, 18, 0.6, 32, 23);
    else if (n === 1) for (let i = 0; i < 6; i++) {
      const l = Ce({
        x: 0,
        y: 0
      }, i * He / 6, 9);
      $e(a, l, ne(l, e.target), 2 + e.phase, 0.45, 12, 0.16);
    }
    else
      Ie(a, e.target, 2, 18, 24), ee(a, {
        x: 0,
        y: 0
      }, "ring", 10.5, 38, 12, 22, !1, { inner: 5.5 }), e.exposed = 90;
  },
  king(a, e) {
    const n = e.pattern % 4;
    if (n === 0)
      Ge(e, 18), pe(a, e, e.motionAngle, 10, 0.9, 18, 24);
    else if (n === 1) for (let t = 0; t < 2 + e.phase; t++) Ie(a, Ce(e, e.angle + (t % 2 ? 0.65 : -0.65), 3), 2, 7 + t * 10, 23);
    else n === 2 ? (pe(a, {
      x: -10,
      y: 0
    }, 0, 20, 0.8, 22, 26), pe(a, {
      x: 0,
      y: -10
    }, Math.PI / 2, 20, 0.8, 35, 26), e.exposed = 65) : ($e(a, e, e.angle, 3, 0.55, 18, 0.29), e.phase > 1 && (me(a, "stalker", {
      x: -8,
      y: 3
    }), me(a, "archer", {
      x: 8,
      y: -3
    })));
  },
  phoenix(a, e) {
    const n = e.pattern % 4;
    if (n === 0) {
      Ge(e, 28);
      for (let t = 0; t < 6; t++) ee(a, Ce(e, e.motionAngle, t * 2), "fire", 1.2, 20 + t * 4, 95, 13);
    } else if (n === 1) Va(a, e, 10 + e.phase * 2, e.pattern * 0.32, 13, 0.17);
    else if (n === 2)
      e.x = 0, e.y = 0, ee(a, e, "ring", 9, 30, 15, 25, !1, { inner: 3.5 }), e.exposed = 85;
    else for (const t of [{
      x: -6,
      y: -5
    }, {
      x: 6,
      y: 5
    }]) me(a, "bomber", t);
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
    else if (n === 1) for (let t = -1; t <= 1; t++) ee(a, {
      x: e.target.x + t * 2.5,
      y: e.target.y
    }, "fire", 1.6, 28 + Math.abs(t) * 7, 100, 14);
    else n === 2 ? (Ie(a, e, 4, 18, 26), e.exposed = 100) : (me(a, "bomber", {
      x: -8,
      y: 5
    }), e.phase > 1 && me(a, "guard", {
      x: 8,
      y: 5
    }));
  },
  colossus(a, e) {
    const n = e.pattern % 3;
    if (n === 0) for (let t = 0; t < 3; t++) ee(a, e, "ring", 3 + t * 3, 20 + t * 19, 9, 23, !1, { inner: 1.4 + t * 3 });
    else if (n === 1)
      Ge(e, 30), pe(a, e, e.motionAngle, 18, 1.4, 18, 27);
    else {
      for (const t of [-1, 1]) Ie(a, {
        x: e.target.x + t * 2,
        y: e.target.y
      }, 2.7, 30, 25);
      e.exposed = 110;
    }
  },
  frostqueen(a, e) {
    const n = e.pattern % 4;
    if (n === 0) for (let t = 0; t < 4; t++) ee(a, Ce(e.target, t * Math.PI / 2, 3), "frost", 1.8, 24, 100, 10);
    else n === 1 ? $e(a, e, e.angle, 9, 2.2, 14, 0.21) : n === 2 ? (e.x = -e.x, e.y = -e.y, pe(a, e, ne(e, e.target), 20, 1.2, 32, 24), e.exposed = 85) : (ee(a, {
      x: 0,
      y: 0
    }, "ring", 10.5, 32, 18, 22, !1, { inner: 5 }), me(a, "stalker", {
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
      }, Ge(e, 40), pe(a, e, 0, 19, 1.4, 14, 25);
    else if (n === 1) for (let t = 0; t < 4; t++) pe(a, {
      x: -10,
      y: -8 + t * 5
    }, 0, 20, 0.7, 20 + t * 13, 20);
    else n === 2 ? (Ie(a, e.target, 3.8, 28, 26), e.exposed = 95) : (ee(a, {
      x: 0,
      y: 0
    }, "ring", 10, 26, 14, 23, !1, { inner: e.phase > 1 ? 4 : 6 }), $e(a, e, e.angle, 5, 1.3, 14));
  },
  archivist(a, e) {
    const n = e.pattern % 4;
    if (n === 0)
      e.memory.push({ ...e.target }), e.memory = e.memory.slice(-4), Ie(a, e.target, 2.3, 24, 21);
    else if (n === 1) for (let t = 0; t < e.memory.length; t++) Ie(a, e.memory[t], 2.6, 22 + t * 8, 24);
    else if (n === 2) {
      for (const t of e.memory) pe(a, t, ne(t, e.target), 18, 0.65, 32, 22);
      me(a, "wisp", {
        x: -7,
        y: -7
      }), me(a, "wisp", {
        x: 7,
        y: 7
      });
    } else
      Va(a, e, 12, e.pattern * 0.2, 14), e.exposed = 100;
  },
  voidknight(a, e) {
    const n = e.pattern % 4;
    if (n === 0)
      e.x = Math.max(-8, Math.min(8, -e.target.x)), e.y = Math.max(-8, Math.min(8, -e.target.y)), se(a, e, "burst", 2), pe(a, e, ne(e, e.target), 20, 0.8, 24, 26);
    else if (n === 1)
      Ge(e, 20), $e(a, e, e.angle, 3 + e.phase, 0.9, 15, 0.26);
    else if (n === 2)
      Ie(a, e, 3, 12, 26), ee(a, e, "ring", 7, 30, 10, 22, !1, { inner: 3.5 }), e.exposed = 65;
    else for (const t of [{
      x: e.target.x,
      y: -9
    }, {
      x: -9,
      y: e.target.y
    }]) pe(a, t, ne(t, e.target), 20, 0.6, 22, 23);
  }
};
function on(a, e, n) {
  const t = e.kind, i = e.hp / e.maxHp < 0.3 ? 3 : e.hp / e.maxHp < 0.65 ? 2 : 1;
  i > e.phase && (e.phase = i, se(a, e, "burst", 4), t === "phoenix" && i === 2 && (e.hp = Math.min(e.maxHp, e.hp + e.maxHp * 0.12), ee(a, e, "fire", 3, 25, 100, 14)), t === "archivist" && (e.memory.push({
    x: a.player.x,
    y: a.player.y
  }), e.memory = e.memory.slice(-4)), n.oaths.includes("legion") && me(a, "stalker", {
    x: e.x > 0 ? -8 : 8,
    y: 6
  })), rn[t](a, e), e.pattern++;
}
function ln(a, e) {
  if (!ue(e.kind)) {
    const n = a.companions.filter((t) => t.hp > 0 && t.life > 0 && $(t, e) < 2.8).sort((t, i) => $(t, e) - $(i, e))[0];
    if (n) return n;
    if (a.encounter === "siege" && !a.boss && (e.kind === "soldier" || e.kind === "guard" || e.kind === "charger") && $(e, a.player) > 3) return a.objective;
  }
  return a.player;
}
function cn(a, e, n, t) {
  const i = te[e.kind];
  $(e.target, a.player) < t && $(e, a.player) < i.reach + 1 && ya(a, i.damage, n);
  for (const l of a.companions) $(e.target, l) < t && $(e, l) < i.reach + 1 && (l.hp -= i.damage);
  !a.boss && a.encounter === "siege" && $(e.target, a.objective) < t && $(e, a.objective) < i.reach + 1 && (a.objective.hp = Math.max(0, a.objective.hp - i.damage * 0.5)), se(a, e.target, "slash", t, e.angle);
}
function un(a, e, n) {
  const t = te[e.kind];
  if (ue(e.kind)) {
    on(a, e, n);
    return;
  }
  switch (e.kind) {
    case "archer":
      $e(a, e, e.angle, a.chapter > 0 ? 3 : 2, 0.36, t.damage, 0.24);
      break;
    case "priest":
      for (const i of a.enemies) i.hp > 0 && !ue(i.kind) && $(i, e) < 3.5 && (i.hp = Math.min(i.maxHp, i.hp + 8));
      $e(a, e, e.angle, 3, 0.7, t.damage, 0.18), se(a, e, "heal", 3.5);
      break;
    case "charger":
      e.motion = 23, e.motionAngle = e.angle;
      break;
    case "bomber":
      ee(a, e.target, "fire", 1.9, 23, 75, t.damage);
      break;
    case "wisp":
      ze(a, e, e.angle, t.damage, !1, { speed: 0.3 }), e.motion = 7, e.motionAngle = e.angle + Math.PI / 2;
      break;
    case "guard":
      Ie(a, e.target, 1.7, 8, t.damage);
      break;
    default:
      cn(a, e, n, t.reach + 0.15);
  }
}
function dn(a, e, n) {
  const t = te[e.kind], i = {
    x: e.x,
    y: e.y
  }, l = e.kind === "leviathan" ? 0.44 : e.kind === "wisp" ? 0.24 : 0.32;
  if (_e(a, e, e.motionAngle, l, t.radius), e.motion--, e.kind !== "wisp") {
    $(e, a.player) < t.radius + 0.4 && ya(a, t.damage, n);
    for (const o of a.companions) $(e, o) < t.radius + 0.3 && (o.hp -= t.damage, e.motion = 0);
    !a.boss && a.encounter === "siege" && $(e, a.objective) < t.radius + 0.6 && (a.objective.hp = Math.max(0, a.objective.hp - t.damage * 0.5), e.motion = 0), $(i, e) < l * 0.65 && (e.motion = 0, e.exposed = 80, e.stun = 24, se(a, e, "guard", 2));
  }
  e.motion || (e.cooldown = Math.max(e.cooldown, 28));
}
function fn(a, e, n) {
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
    ]) t[c] > 0 && (t[c]--, a.tick % 15 === 0 && Me(a, t, 2 + (c === "burn" ? x(e, "cinder") + x(e, "inferno") : c === "bleed" ? x(e, "hemorrhage") + x(e, "blood-dance") : x(e, "venom")) * 1.5, e, "passive"));
    if (t.hp <= 0) continue;
    if (t.stun > 0) {
      t.stun--;
      continue;
    }
    if (t.motion > 0) {
      dn(a, t, e);
      continue;
    }
    const i = te[t.kind], l = e.oaths.includes("haste");
    if (t.windup > 0) {
      --t.windup === 0 && (un(a, t, e), t.cooldown = Math.round(i.cooldown * (l ? 0.8 : 1) / (ue(t.kind) ? 1 + (t.phase - 1) * 0.12 : 1)));
      continue;
    }
    const o = ln(a, t), u = $(t, o);
    if (t.cooldown = Math.max(0, t.cooldown - 1), t.angle = ne(t, o), !t.cooldown && u < i.reach) {
      if (t.target = {
        x: o.x,
        y: o.y
      }, t.windup = Math.round(i.windup * (l ? 0.8 : 1)), o === a.player && (t.kind === "archer" || t.kind === "bomber")) {
        const c = Math.min(t.windup + u / 0.24, 4.5 / Math.max(1e-3, Math.hypot(n.x, n.y)));
        t.target.x = Math.max(-10, Math.min(10, o.x + n.x * c)), t.target.y = Math.max(-10, Math.min(10, o.y + n.y * c)), t.angle = ne(t, t.target);
      }
      continue;
    }
    const s = t.kind === "archer" || t.kind === "priest" || t.kind === "bomber" || t.kind === "wisp";
    if (u > (s ? 5 : ue(t.kind) ? 2.8 : 0.95) || s && u < 3) {
      const c = t.kind === "stalker" && u > 3 ? t.id % 2 ? 0.28 : -0.28 : 0;
      _e(a, t, t.angle + (s && u < 3 ? Math.PI : c), i.speed * (t.chill ? ue(t.kind) ? 0.8 : 0.5 : 1) * (l ? 1.08 : 1), i.radius);
    }
    for (const c of a.enemies) c.id !== t.id && c.hp > 0 && $(t, c) < i.radius + te[c.kind].radius && _e(a, t, ne(c, t), 0.027, i.radius);
  }
}
function fa(a, e, n) {
  if (a.kind === "beam") return Yt(e, a, a.angle, a.length) < a.width + n;
  const t = $(a, e);
  return t < a.radius + n && (a.kind !== "ring" || t > a.inner - n);
}
function pn(a, e) {
  for (const n of a.shots)
    if (!(n.life <= 0)) {
      if (n.x += Math.cos(n.angle) * n.speed, n.y += Math.sin(n.angle) * n.speed, n.life--, Math.abs(n.x) > R.arena || Math.abs(n.y) > R.arena || a.obstacles.some((t) => $(t, n) < t.radius + n.radius)) {
        n.life = 0;
        continue;
      }
      if (!n.friendly) {
        if ($(n, a.player) < R.playerRadius + n.radius) a.player.shield > 0 ? (vt(a, e), n.friendly = !0, n.source = "skill", n.angle += Math.PI, n.damage *= 1.8, n.hits = []) : (ya(a, n.damage, e), n.life = 0);
        else {
          const t = a.companions.find((i) => i.hp > 0 && $(n, i) < 0.3 + n.radius);
          t && (t.hp -= n.damage * (1 - x(e, "covenant") * 0.12), n.life = 0);
        }
        continue;
      }
      for (const t of a.enemies) {
        if (t.hp <= 0 || n.hits.includes(t.id) || $(t, n) > te[t.kind].radius + n.radius) continue;
        n.hits.push(t.id);
        const i = n.damage * (x(e, "hunter") && $(t, a.player) > ye.hunterRange ? ye.hunterDamage + (x(e, "hunter") - 1) * 0.15 : 1);
        if (Me(a, t, i, e, n.source, n), x(e, "pinning") && n.source === "attack" && (t.chill = 50 + x(e, "pinning") * 20, a.player.combo % 3 === 0 && je(a, t, 8 * x(e, "pinning"))), n.splash > 0) {
          se(a, t, "burst", n.splash);
          for (const l of a.enemies) l.id !== t.id && $(l, t) < n.splash + te[l.kind].radius && Me(a, l, i * 0.55, e, n.source, t);
        }
        if (n.bounce > 0) {
          const l = a.enemies.filter((o) => o.hp > 0 && !n.hits.includes(o.id) && $(o, t) < 6).sort((o, u) => $(t, o) - $(t, u))[0];
          if (l) {
            n.bounce--, n.angle = ne(n, l), n.damage *= 0.8;
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
function hn(a, e) {
  for (const n of [...a.hazards]) {
    if (n.wait > 0) {
      n.wait--;
      continue;
    }
    if (n.life--, !n.friendly) {
      if (fa(n, a.player, R.playerRadius) && ya(a, n.damage, e), !a.boss && a.encounter === "siege" && a.tick % 15 === 0 && fa(n, a.objective, 0.6) && (a.objective.hp = Math.max(0, a.objective.hp - n.damage * 0.35)), a.tick % 15 === 0 || n.kind === "slam" || n.kind === "beam" || n.kind === "ring")
        for (const i of a.companions) fa(n, i, 0.3) && (i.hp -= n.damage * 0.25);
      continue;
    }
    if (n.kind !== "slam" && n.kind !== "mine" && a.tick % 15 !== 0) continue;
    const t = a.enemies.filter((i) => i.hp > 0 && fa(n, i, te[i.kind].radius));
    n.kind === "mine" && t.length && (n.life = 0, se(a, n, "burst", n.radius));
    for (const i of t) n.kind === "storm" ? Ta(a, i, e, n.damage) : (n.kind === "fire" && (i.burn = Math.max(i.burn, 45)), n.kind === "frost" && (i.chill = Math.max(i.chill, 60)), n.kind === "mine" && je(a, i, 25), Me(a, i, n.damage, e, n.source, n));
  }
  a.hazards = a.hazards.filter((n) => n.life > 0);
}
function mn(a, e) {
  pn(a, e), hn(a, e);
}
function gt(a) {
  return a.player.hp <= 0 ? "fallen" : !a.boss && a.encounter === "siege" && a.objective.hp <= 0 ? "beacon" : null;
}
function vn(a, e, n) {
  if (a.status !== "fighting") return;
  a.tick++, a.effects = a.effects.filter((i) => --i.life > 0).slice(-80);
  const t = an(a, e, n);
  tn(a, n), fn(a, n, t), mn(a, n), a.enemies = a.enemies.filter((i) => i.hp > 0), gt(a) ? a.status = "lost" : (nn(a, n), sn(a) && (a.status = "won", a.shots = [], a.hazards = []));
}
function gn(a, e) {
  const n = a.at(-1);
  n && n.move === e.move && n.dash === e.dash && n.skill === e.skill ? n.ticks++ : a.push({
    ...e,
    ticks: 1
  });
}
var Ye = {
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
function Ja(a, e) {
  const n = Ye[e];
  return e === "traveler" || a.purchases.some((t) => t.id === e) || n.achievement !== null && a.awards.some((t) => t.key === n.achievement);
}
function yn(a) {
  const e = new Set(a.awards.map((n) => n.key));
  return {
    bossClears: Ut.filter((n) => e.has(Ra[n].awardKey)),
    mastered: Object.keys(we).filter((n) => e.has(`mastery-${n}`)),
    oathWins: va.filter((n) => e.has(`oath-${n}`))
  };
}
var ha = (a) => [
  "won",
  "lost",
  "abandoned"
].includes(a.phase), yt = (a) => Math.floor(a.step / R.zoneSteps), Mt = (a) => a.regions[yt(a)];
function ia(a, e) {
  return yn(a).bossClears.length >= we[e].unlock;
}
function Mn(a) {
  return Math.floor(R.restHeal * (a.oaths.includes("scarcity") ? 0.5 : 1));
}
function et(a) {
  return (!a || typeof a != "object" || Array.isArray(a)) && qe("invalid"), a;
}
function Aa(a, e = 0, n = Number.MAX_SAFE_INTEGER) {
  return (!Number.isSafeInteger(a) || Number(a) < e || Number(a) > n) && qe("invalid"), a;
}
function Ma(a, e) {
  return (typeof a != "string" || !e.includes(a)) && qe("invalid"), a;
}
function kt(a, e, n) {
  return (!Array.isArray(a) || a.length > e) && qe("invalid"), a.map(n);
}
function kn(a) {
  return new Set(a).size !== a.length && qe("invalid"), a;
}
function at(a) {
  typeof a != "boolean" && qe("invalid");
}
var xn = (a) => Ma(a, Ft), tt = (a) => Ma(a, Ia), nt = (a) => Ma(a, ma), bn = (a) => kn(kt(a, va.length, (e) => Ma(e, va)));
function wn(a) {
  const e = et(a);
  switch (e.type) {
    case "start":
      return {
        type: "start",
        weapon: xn(e.weapon),
        outfit: nt(e.outfit),
        oaths: bn(e.oaths)
      };
    case "purchase":
    case "equip":
      return {
        type: e.type,
        id: nt(e.id)
      };
    case "route":
      return {
        type: "route",
        id: Aa(e.id, 0, 2)
      };
    case "input": {
      const n = kt(e.spans, R.maxInputTicks, (t) => {
        const i = et(t);
        return at(i.dash), at(i.skill), {
          move: Aa(i.move, 0, 8),
          dash: i.dash,
          skill: i.skill,
          ticks: Aa(i.ticks, 1, R.maxInputTicks)
        };
      });
      return (!n.length || n.reduce((t, i) => t + i.ticks, 0) > R.maxInputTicks) && qe("invalid"), {
        type: "input",
        spans: n
      };
    }
    case "relic":
      return {
        type: "relic",
        id: tt(e.id),
        replace: e.replace === null ? null : tt(e.replace)
      };
    case "supply":
    case "leave":
    case "rest":
    case "sacrifice":
    case "abandon":
      return { type: e.type };
    default:
      return qe("invalid");
  }
}
function _n(a, e) {
  const n = qa(null), t = X(!1), i = X(""), l = qa(null);
  let o = !1, u = null;
  const s = re(() => t.value || !!l.value || !n.value?.ready || n.value.writeState !== "ready" || n.value.pending);
  function c(v) {
    !o && (!n.value || v.data.revision >= n.value.data.revision) && (n.value = v);
  }
  async function h(v, d) {
    if (o || t.value) return !1;
    t.value = !0, u = null, i.value = "";
    try {
      const m = await a.request(`game/expedition/${v}`, {
        chatIdentity: e,
        ...d
      }, 35e3), M = u;
      return c(M && M.data.revision >= m.result.data.revision ? M : m.result), n.value?.writeState === "ready" && !n.value.pending && v !== "read" && (l.value = null), !0;
    } catch (m) {
      if (!o) {
        u && c(u), i.value = Wt(m);
        const M = m && typeof m == "object" && "code" in m ? String(m.code) : "";
        d && (M.startsWith("expedition_save_") || M.startsWith("host_request_")) && (l.value = d);
      }
      return !1;
    } finally {
      o || (t.value = !1);
    }
  }
  const f = a.subscribe((v) => {
    if (o || v.type !== "game/expedition/state") return;
    const d = v.payload;
    d.chatIdentity === e && (t.value ? u = d.state : c(d.state));
  });
  async function p() {
    const v = l.value;
    return !await h("confirm") || !n.value || n.value.writeState !== "ready" || n.value.pending ? !1 : v && n.value.data.revision === v.revision ? h("act", v) : (l.value = null, !0);
  }
  return {
    view: n,
    busy: t,
    error: i,
    blocked: s,
    failed: l,
    notice: re(() => i.value || (n.value && (n.value.pending || n.value.writeState !== "ready") ? y.saveError : "")),
    read: () => h("read"),
    recover: p,
    act: (v) => s.value ? Promise.resolve(!1) : h("act", {
      actionId: Vt(),
      revision: n.value.data.revision,
      command: wn(v)
    }),
    dispose() {
      o = !0, f();
    }
  };
}
var be = {
  ward: "#75c7eb",
  edge: "#e5f6ff",
  block: "#dcc08a",
  parry: "#fff2c9",
  enamel: "#42647c",
  silver: "#e4e7df"
}, Ae = {
  familiar: "#8cc9bc",
  empowered: "#f1d89e",
  crest: "#9daedc",
  page: "#f2ecda",
  cover: "#4d5876"
}, xt = [
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
], Zn = {
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
}, Pa = Object.fromEntries(Object.entries(pt).map(([a, e]) => [a, Zn[e.family]]));
function Cn(a, e, n) {
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
  function s(p) {
    if (!(!u.includes(p.code) || p.target instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(p.target.tagName)) && !(p.code === "Space" && p.target instanceof HTMLElement && p.target.closest("button"))) {
      if (p.preventDefault(), p.stopPropagation(), n(), p.code === "Escape") {
        p.repeat || e();
        return;
      }
      t.add(p.code), !p.repeat && p.code === "Space" && (l = !0), !p.repeat && p.code === "KeyE" && (o = !0);
    }
  }
  function c(p) {
    t.delete(p.code);
  }
  function h() {
    t.clear(), i = {
      x: 0,
      y: 0
    }, l = !1, o = !1;
  }
  function f() {
    h(), e();
  }
  return a.addEventListener("keydown", s), window.addEventListener("keyup", c), window.addEventListener("blur", f), {
    frame() {
      const p = i.x || Number(t.has("KeyD") || t.has("ArrowRight")) - Number(t.has("KeyA") || t.has("ArrowLeft")), v = i.y || Number(t.has("KeyS") || t.has("ArrowDown")) - Number(t.has("KeyW") || t.has("ArrowUp")), d = {
        move: Math.hypot(p, v) < 0.15 ? 0 : (Math.round((Math.atan2(v, p) + Math.PI / 2) / (Math.PI / 4)) + 8 - 1) % 8 + 1,
        dash: l,
        skill: o
      };
      return l = !1, o = !1, d;
    },
    stick(p, v) {
      i = {
        x: p,
        y: v
      };
    },
    dash() {
      l = !0, n();
    },
    skill() {
      o = !0, n();
    },
    clear: h,
    dispose() {
      h(), a.removeEventListener("keydown", s), window.removeEventListener("keyup", c), window.removeEventListener("blur", f);
    }
  };
}
function An(a, e) {
  let n = null;
  function t(l) {
    if (!n || l.pointerId !== n.id) return;
    const o = n.surface.getBoundingClientRect(), u = o.width * 0.36, s = (l.clientX - o.left - o.width / 2) / u, c = (l.clientY - o.top - o.height / 2) / u, h = Math.max(1, Math.hypot(s, c));
    a(s / h, c / h);
  }
  function i() {
    const l = n;
    n = null, a(0, 0), l?.surface.hasPointerCapture(l.id) && l.surface.releasePointerCapture(l.id);
  }
  return {
    down(l) {
      if (n || l.button !== 0) return;
      e();
      const o = l.currentTarget;
      o.setPointerCapture(l.pointerId), n = {
        id: l.pointerId,
        surface: o
      }, t(l);
    },
    move: t,
    release(l) {
      n?.id === l.pointerId && i();
    },
    clear: i
  };
}
function bt() {
  const a = new Ba();
  a.absarc(0, 0, 1.1, 0, Math.PI, !1), a.lineTo(-0.86, 0), a.absarc(0, 0, 0.86, Math.PI, 0, !0), a.closePath();
  const e = {
    box: new zt(1, 1, 1),
    sphere: new Tt(1, 20, 14),
    rock: new Ot(1, 0),
    cylinder: new Lt(1, 1, 1, 24),
    cone: new Rt(1, 1, 12),
    disc: new jt(1, 48),
    ring: new _a(0.965, 1, 64),
    arc: new _a(0.87, 1, 40, 1, -0.2, Math.PI * 1.3),
    torus: new Qa(1, 0.08, 8, 40),
    stroke: new _a(0.975, 1, 48, 1, -0.2, Math.PI * 1.3),
    crescent: new Qa(1, 0.14, 6, 24, Math.PI * 1.45),
    arch: new Da(a, {
      depth: 1,
      bevelEnabled: !1,
      curveSegments: 24
    }).translate(0, 0, -0.5)
  }, n = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  function i(h, f = !1, p = 1, v = !1) {
    const d = `${h}/${f}/${p}/${v}`;
    let m = t.get(d);
    return m || (m = f ? new Fa({
      color: h,
      transparent: p < 1,
      opacity: p,
      depthWrite: p === 1,
      side: 2
    }) : new $t({
      color: h,
      roughness: v ? 0.34 : 0.88,
      metalness: v ? 0.45 : 0.02,
      side: 2
    }), t.set(d, m)), m;
  }
  function l(h, f, p, v, d = [
    0,
    0,
    0
  ], m = !1, M = 1, C = !1) {
    const w = new Ve(e[f], i(p, m, M, C));
    return w.scale.set(...v), w.position.set(...d), w.castShadow = !m, w.receiveShadow = !m, h.add(w), w;
  }
  function o(h, f = [
    0,
    0,
    0
  ]) {
    const p = new ra();
    return p.position.set(...f), h.add(p), p;
  }
  function u(h, f, p, v, d, m = 1, M = !1, C = 0.04) {
    const w = l(h, M ? "disc" : "ring", f, [
      p,
      p,
      1
    ], [
      v,
      C,
      d
    ], !0, m);
    return w.rotation.x = -Math.PI / 2, w;
  }
  function s(h, f, p, v = [
    0,
    0,
    0
  ], d = 0) {
    const m = JSON.stringify([f, d]);
    let M = n.get(m);
    if (!M) {
      const w = new Ba();
      f.forEach(([Z, P], S) => S ? w.lineTo(Z, P) : w.moveTo(Z, P)), w.closePath(), M = d ? new Da(w, {
        depth: d,
        steps: 1,
        bevelEnabled: !0,
        bevelThickness: d * 0.3,
        bevelSize: d * 0.3,
        bevelSegments: 2
      }) : new St(w), n.set(m, M);
    }
    const C = new Ve(M, i(p));
    return C.position.set(...v), C.castShadow = !0, h.add(C), C;
  }
  function c(h) {
    h.updateMatrixWorld(!0);
    const f = /* @__PURE__ */ new Map();
    h.traverse((v) => {
      if (!(v instanceof Ve) || Array.isArray(v.material)) return;
      const d = (v.geometry.index ? v.geometry.toNonIndexed() : v.geometry.clone()).applyMatrix4(v.matrixWorld), m = f.get(v.material) ?? [];
      m.push(d), f.set(v.material, m);
    }), h.clear();
    const p = [];
    for (const [v, d] of f) {
      const m = Bt(d);
      if (d.forEach((C) => C.dispose()), !m) throw new Error("expedition_geometry_merge");
      const M = new Ve(m, v);
      M.castShadow = !(v instanceof Fa), M.receiveShadow = !0, h.add(M), p.push(m);
    }
    return () => {
      h.clear(), p.forEach((v) => v.dispose());
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
      Object.values(e).forEach((h) => h.dispose()), n.forEach((h) => h.dispose()), t.forEach((h) => h.dispose());
    }
  };
}
function Pn(a, e, n, t) {
  const i = xt[n], l = R.arena, { mesh: o, group: u, ring: s } = a, c = (d, m, M, C = i.stone) => o(d, "box", C, m, M);
  function h(d, m, M, C = !0) {
    const w = u(e, [
      d,
      0,
      m
    ]);
    c(w, [
      1.65,
      0.38,
      1.65
    ], [
      0,
      0.15,
      0
    ]), c(w, [
      1.3,
      0.3,
      1.3
    ], [
      0,
      0.49,
      0
    ], i.light), c(w, [
      0.91,
      M,
      0.91
    ], [
      0,
      M / 2 + 0.6,
      0
    ]);
    for (const Z of [-0.38, 0.38]) c(w, [
      0.08,
      M - 0.35,
      0.12
    ], [
      Z,
      M / 2 + 0.6,
      0.48
    ], i.light);
    return c(w, [
      1.3,
      0.24,
      1.3
    ], [
      0,
      M + 0.6,
      0
    ], i.light), c(w, [
      1.56,
      0.3,
      1.56
    ], [
      0,
      M + 0.85,
      0
    ], i.dark), C && (o(w, "cone", i.trim, [
      0.2,
      0.65,
      0.2
    ], [
      0,
      M + 1.24,
      0
    ]), c(w, [
      0.16,
      0.6,
      0.08
    ], [
      0,
      M - 0.15,
      0.52
    ], i.trim)), w;
  }
  function f(d, m, M, C) {
    h(d - M / 2, m, C - 2), h(d + M / 2, m, C - 2);
    const w = u(e, [
      d,
      C - 2,
      m
    ]);
    o(w, "arch", i.light, [
      M / 2,
      2.3,
      1.15
    ]);
    for (let Z = 1; Z < 10; Z++) {
      const P = Z / 10 * Math.PI, S = c(w, [
        0.025,
        0.64,
        0.025
      ], [
        Math.cos(P) * M * 0.49,
        Math.sin(P) * 2.25,
        0.59
      ], i.trim);
      S.rotation.z = P - Math.PI / 2;
    }
    c(w, [
      0.6,
      0.9,
      1.3
    ], [
      0,
      2.28,
      0
    ], i.trim);
  }
  function p(d, m, M = 1) {
    const C = u(e, [
      d,
      0,
      m
    ]);
    C.scale.setScalar(M);
    for (let w = 0; w < 5; w++) {
      const Z = w * 2.4, P = o(C, "rock", w % 2 ? i.foliage : i.accent, [
        0.55,
        0.8 + w % 2 * 0.3,
        0.45
      ], [
        Math.cos(Z) * 0.4,
        0.5,
        Math.sin(Z) * 0.4
      ]);
      P.rotation.z = Math.sin(Z) * 0.4;
    }
    for (let w = 0; w < 3; w++) o(C, "rock", i.flower, [
      0.13,
      0.16,
      0.13
    ], [
      Math.sin(w * 4) * 0.5,
      1,
      Math.cos(w * 4) * 0.4
    ]);
  }
  function v(d, m, M) {
    const C = u(e, [
      d,
      0,
      m
    ]);
    C.scale.setScalar(M);
    const w = o(C, "cylinder", i.dark, [
      0.15,
      3.5,
      0.19
    ], [
      0,
      1.65,
      0
    ]);
    w.rotation.z = -0.1;
    for (let Z = 0; Z < 6; Z++) {
      const P = Z * 2.4;
      o(C, "rock", Z % 2 ? i.foliage : i.accent, [
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
  for (let d = -10; d <= 10; d += 2) for (let m = -10; m <= 10; m += 2) c(e, [
    1.96,
    0.045,
    1.96
  ], [
    d,
    0.025,
    m
  ], (d * 3 + m + 40) % 8 === 0 ? i.tile : i.floor);
  if (t) {
    s(e, i.trim, 5.35, 0, 0, 1, !1, 0.058), s(e, i.light, 5.18, 0, 0, 0.6, !1, 0.059), s(e, i.seam, 4.72, 0, 0, 0.65, !1, 0.061);
    for (let d = 0; d < 8; d++) {
      const m = d * Math.PI / 4, M = c(e, [
        0.18,
        0.025,
        0.55
      ], [
        Math.cos(m) * 5.04,
        0.065,
        Math.sin(m) * 5.04
      ], i.trim);
      M.rotation.y = -m + Math.PI / 2;
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
      for (let M = 0; M < (n === 2 ? 24 : 16); M++) {
        const C = M * Math.PI * 2 / (n === 2 ? 24 : 16), w = M % 2 ? 0.85 : n === 2 ? 2.6 : M % 4 ? 1.8 : 3.2;
        d.push([Math.cos(C) * w, Math.sin(C) * w]);
      }
      const m = a.shape(e, d, i.seam, [
        0,
        0.061,
        0
      ]);
      m.rotation.x = -Math.PI / 2, s(e, i.floor, 0.65, 0, 0, 1, !0, 0.065);
    }
  }
  for (const d of [-1, 1]) for (let m = 0; m < 4; m++) {
    const M = d * (7 + m % 2), C = -7 + m * 4, w = c(e, [
      0.035,
      0.016,
      0.55 + m * 0.1
    ], [
      M,
      0.055,
      C
    ], i.seam);
    w.rotation.y = m * 1.3;
    const Z = c(e, [
      0.028,
      0.015,
      0.3
    ], [
      M + 0.1,
      0.055,
      C + 0.3
    ], i.seam);
    Z.rotation.y = m * 1.3 + 0.8;
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
    for (let m = -10; m <= 10; m += 5) h(d + Math.sign(d) * 0.5, m, m === -10 ? 3.6 : 1.35);
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
    const m = u(e, [
      d * 5.8,
      4.8,
      -l - 2.9
    ]);
    c(m, [
      2,
      0.08,
      0.08
    ], [
      0,
      0,
      0
    ], i.trim);
    for (let M = 0; M < 5; M++) c(m, [
      0.35,
      2.6 - Math.abs(M - 2) * 0.12,
      0.08
    ], [
      (M - 2) * 0.34,
      -1.35,
      Math.sin(M * 2) * 0.08
    ], M % 2 ? i.foliage : i.dark);
    if (c(m, [
      0.12,
      1.8,
      0.09
    ], [
      0,
      -1.15,
      0.13
    ], i.trim), n < 3) {
      for (let M = 0; M < 4; M++) p(d * (12.8 + M % 2), -9 + M * 5, 0.8 + M * 0.1);
      v(d * 15, -13, 1.5), v(d * 17, 1, 1.7);
    } else if (n === 3) for (let M = 0; M < 3; M++) {
      const C = u(e, [
        d * 15,
        0,
        -9 + M * 7
      ]);
      o(C, "cylinder", i.dark, [
        1.4,
        2.8,
        1.4
      ], [
        0,
        1.4,
        0
      ]), o(C, "cylinder", i.trim, [
        0.7,
        4.5,
        0.7
      ], [
        0,
        4.9,
        0
      ]), c(C, [
        1.5,
        1,
        0.2
      ], [
        0,
        1,
        1.3
      ], i.accent), o(C, "torus", i.trim, [
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
      for (let C = 0; C < 5; C++) o(e, "rock", C % 2 ? i.light : i.accent, [
        1,
        2.2 + C % 3,
        0.9
      ], [
        d * (13.5 + C % 2),
        1.2,
        -9 + C * 4
      ]).rotation.z = d * -0.2;
      const M = u(e, [
        d * 17,
        0,
        -13
      ]);
      c(M, [
        0.22,
        8,
        0.22
      ], [
        0,
        3.5,
        0
      ], i.dark), a.shape(M, [
        [0, 0],
        [3, -1],
        [0, -4]
      ], i.light, [
        0,
        6.5,
        0
      ]);
    } else {
      for (let C = 0; C < 4; C++) {
        const w = u(e, [
          d * 14,
          0,
          -10 + C * 6
        ]);
        c(w, [
          2.4,
          3.5,
          1
        ], [
          0,
          1.75,
          0
        ], i.dark);
        for (let Z = 0; Z < 3; Z++) {
          c(w, [
            2.6,
            0.12,
            1.1
          ], [
            0,
            0.8 + Z,
            0
          ], i.trim);
          for (let P = 0; P < 5; P++) c(w, [
            0.27,
            0.65 + P % 2 * 0.12,
            0.6
          ], [
            -0.85 + P * 0.4,
            1.2 + Z,
            0.1
          ], P % 2 ? i.foliage : i.stone);
        }
      }
      const M = o(e, "torus", i.trim, [
        3.4,
        4,
        0.5
      ], [
        d * 18,
        6.2,
        -13
      ]);
      M.rotation.y = d * 0.3;
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
    for (const M of [-3.5, 3.5]) c(e, [
      0.22,
      0.25,
      18.2
    ], [
      d * 17 + M,
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
    const m = (d - 3) * 8, M = -26 - d % 3 * 6, C = 7 + d * 5 % 7;
    if (c(e, [
      5.2,
      C,
      5.5
    ], [
      m,
      C / 2 - 3,
      M
    ], i.stone), c(e, [
      5.8,
      0.4,
      6
    ], [
      m,
      C - 3,
      M
    ], i.light), n === 1) {
      const w = o(e, "crescent", i.trim, [
        1.5,
        1.5,
        1.5
      ], [
        m,
        C - 0.8,
        M
      ]);
      w.rotation.z = 0.9;
    } else if (n === 2) o(e, "cone", i.trim, [
      3.4,
      4.8,
      3.4
    ], [
      m,
      C - 0.8,
      M
    ]);
    else if (n === 3) {
      for (const w of [-1.3, 1.3]) o(e, "cylinder", i.dark, [
        0.7,
        5 + d % 2 * 2,
        0.7
      ], [
        m + w,
        C - 1,
        M
      ]);
      c(e, [
        3.8,
        0.25,
        4
      ], [
        m,
        C - 2.5,
        M
      ], i.trim);
    } else if (n === 4) {
      o(e, "cone", i.light, [
        3.2,
        4.5,
        3.2
      ], [
        m,
        C - 0.8,
        M
      ]);
      for (const w of [-1, 1]) o(e, "rock", i.accent, [
        0.4,
        2,
        0.4
      ], [
        m + w,
        C - 3,
        M + 3
      ]);
    } else if (n === 5)
      o(e, "rock", i.trim, [
        1.4,
        2.3,
        1.4
      ], [
        m,
        C + 0.7,
        M
      ]), o(e, "torus", i.accent, [
        2,
        2,
        2
      ], [
        m,
        C - 1,
        M
      ]).rotation.x = Math.PI / 2;
    else {
      for (const w of [
        -2,
        0,
        2
      ]) c(e, [
        0.7,
        1.2,
        5.6
      ], [
        m + w,
        C - 2.35,
        M
      ], i.light);
      d % 2 && v(m + 1, M + 2, 1.5);
    }
    for (const w of [
      -1.5,
      0,
      1.5
    ]) c(e, [
      0.5,
      2.8,
      0.12
    ], [
      m + w,
      C - 5.6,
      M + 2.8
    ], i.dark);
  }
  for (const d of t?.obstacles ?? []) {
    const m = u(e, [
      d.x,
      0,
      d.y
    ]);
    o(m, "cylinder", i.dark, [
      d.radius,
      0.22,
      d.radius
    ], [
      0,
      0.11,
      0
    ]), o(m, "cylinder", i.stone, [
      d.radius * 0.85,
      1.15,
      d.radius * 0.85
    ], [
      0,
      0.78,
      0
    ]), o(m, "cylinder", i.light, [
      d.radius,
      0.2,
      d.radius
    ], [
      0,
      1.4,
      0
    ]), o(m, "rock", i.accent, [
      0.28,
      0.58,
      0.28
    ], [
      0,
      1.9,
      0
    ]);
    for (let M = 0; M < 6; M++) {
      const C = M * Math.PI / 3;
      c(m, [
        0.09,
        0.8,
        0.09
      ], [
        Math.cos(C) * d.radius * 0.86,
        0.8,
        Math.sin(C) * d.radius * 0.86
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
      p(d * 3, -8, 1.2), p(d * 4, -10, 0.85);
      const m = u(e, [
        d * 2.6,
        0.5,
        -6
      ]);
      o(m, "box", i.dark, [
        0.5,
        0.16,
        0.5
      ]), o(m, "box", i.flower, [
        0.3,
        0.55,
        0.3
      ], [
        0,
        0.35,
        0
      ]), o(m, "cone", i.trim, [
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
function En(a, e, n) {
  const t = Ye[n], { mesh: i, group: l, shape: o } = a, u = l(e, [
    0,
    0.2,
    -0.23
  ]), s = l(e), c = l(e, [
    0,
    0.33,
    0
  ]), h = t.silhouette === "robe" || t.silhouette === "coat";
  if (o(u, [
    [-0.23, 0],
    [0.23, 0],
    [0.38, h ? -0.68 : -0.48],
    [0.1, h ? -0.77 : -0.59],
    [-0.36, h ? -0.68 : -0.5]
  ], t.fabric), o(u, [
    [-0.04, -0.08],
    [0.04, -0.08],
    [0.055, h ? -0.61 : -0.45],
    [0, h ? -0.68 : -0.5],
    [-0.05, h ? -0.61 : -0.45]
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
  } else h && (i(e, "cone", t.fabric, [
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
      const p = f * Math.PI * 2 / 5;
      i(s, "cone", t.metal, [
        0.045,
        0.2,
        0.045
      ], [
        Math.sin(p) * 0.27,
        0.57,
        Math.cos(p) * 0.27
      ]);
    }
  } else if (t.head === "horns") for (const f of [-1, 1]) {
    const p = l(s, [
      f * 0.26,
      0.5,
      -0.06
    ]);
    p.rotation.z = f * -0.45, i(p, "cylinder", t.metal, [
      0.035,
      0.44,
      0.03
    ], [
      0,
      0.18,
      0
    ]);
    for (const v of [0.16, 0.3]) i(p, "cone", t.metal, [
      0.025,
      0.22,
      0.025
    ], [
      f * 0.06,
      v,
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
        const p = f * Math.PI * 2 / 3;
        i(c, "rock", t.glow, [
          0.04,
          0.075,
          0.04
        ], [
          Math.cos(p) * 0.47,
          0.16,
          Math.sin(p) * 0.47
        ]);
      }
      break;
    case "traveler":
      break;
  }
  return {
    cape: u,
    animate(f, p) {
      c.rotation.y = p ? 0.4 : f * 0.014;
    }
  };
}
function In(a, e, n, t, i, l) {
  const { mesh: o, group: u, shape: s } = a, c = "#d6b881", h = "#fff0c1", f = (p, v, d) => {
    for (const m of [-1, 1]) o(n, "sphere", h, [
      0.09,
      0.055,
      0.06
    ], [
      m * d,
      p,
      v
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
      for (let p = 0; p < 7; p++) {
        const v = p * Math.PI * 2 / 7, d = u(e, [
          Math.cos(v) * 0.8,
          2.6,
          Math.sin(v) * 0.6
        ]);
        d.rotation.z = Math.cos(v) * 0.8, o(d, "cone", "#526451", [
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
          Math.cos(v),
          0.28,
          Math.sin(v)
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
      for (const p of [
        1.35,
        1.8,
        2.25
      ]) o(t, "torus", c, [
        p,
        p,
        p
      ], [
        0,
        2.2,
        0
      ], !1, 1, !0).rotation.set(p * 0.7, 0.5, p);
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
      for (const p of [-1, 1]) {
        for (let v = 0; v < 5; v++) s(t, [
          [0, 0],
          [p * (2.4 - v * 0.25), 0.95 - v * 0.22],
          [p * (2 - v * 0.24), -0.1 - v * 0.24],
          [0, -0.45]
        ], v % 2 ? "#e2a465" : "#d47c4f", [
          p * 0.4,
          2.5,
          -0.1 - v * 0.06
        ]);
        o(e, "cone", "#e3a25b", [
          0.18,
          1.5,
          0.25
        ], [
          p * 0.3,
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
      for (const p of [-1, 1])
        o(e, "cylinder", l.dark, [
          0.36,
          0.8,
          0.38
        ], [
          p * 0.55,
          0.5,
          0
        ]), o(e, "sphere", "#c9976e", [
          0.65,
          0.55,
          0.55
        ], [
          p * 1.05,
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
      for (const p of [-1, 1])
        o(e, "box", "#818883", [
          0.8,
          1.2,
          0.95
        ], [
          p * 0.8,
          0.6,
          0
        ]), o(t, "cylinder", "#6b7375", [
          0.65,
          2.1,
          0.65
        ], [
          p * 1.75,
          1.85,
          0
        ]), o(t, "box", "#b29370", [
          1.1,
          0.8,
          1.1
        ], [
          p * 1.75,
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
      for (let p = -2; p <= 2; p++) o(n, "rock", "#d8fbff", [
        0.11,
        0.48 - Math.abs(p) * 0.08,
        0.11
      ], [
        p * 0.18,
        3.94,
        0.02
      ]);
      for (const p of [-1, 1]) s(e, [
        [0, 0],
        [p * 0.95, 0.8],
        [p * 0.5, -1.3],
        [0, -0.5]
      ], "#bddeeb", [
        p * 0.5,
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
      for (let p = 0; p < 5; p++) {
        const v = 1 - p * 0.14;
        o(e, "sphere", p % 2 ? "#658c9c" : "#7da9b8", [
          v,
          v * 0.8,
          v
        ], [
          Math.sin(p * 0.6) * 0.4,
          0.8,
          0.5 - p * 0.8
        ]), o(e, "cone", "#d7e9dc", [
          0.2 * v,
          0.6 * v,
          0.25 * v
        ], [
          0,
          1.5 - p * 0.13,
          0.4 - p * 0.7
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
      for (const p of [-1, 1])
        s(t, [
          [0, 0],
          [p * 1.4, 0.1],
          [p * 0.8, -0.7]
        ], "#b6d6d8", [
          p * 0.7,
          0.7,
          0
        ]), o(n, "cone", "#e4efde", [
          0.15,
          1,
          0.15
        ], [
          p * 0.72,
          1.65,
          1.2
        ]).rotation.z = p * -0.7;
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
      for (let p = 0; p < 5; p++) {
        const v = p * Math.PI * 2 / 5, d = u(t, [
          Math.cos(v) * 1.7,
          2.5 + Math.sin(v) * 0.6,
          Math.sin(v) * 1.3
        ]);
        d.rotation.z = v * 0.3, o(d, "box", "#baa481", [
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
      for (const p of [-1, 1]) {
        o(e, "box", "#867995", [
          0.33,
          0.9,
          0.4
        ], [
          p * 0.3,
          0.55,
          0
        ]), o(e, "rock", "#b8afcc", [
          0.5,
          0.28,
          0.38
        ], [
          p * 0.6,
          2.4,
          0
        ]);
        const v = u(t, [
          p * 0.85,
          1.8,
          0.2
        ]);
        v.rotation.z = p * -0.25, s(v, [
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
function Sn(a, e) {
  const n = a.group(e), t = a.group(n);
  a.mesh(n, "sphere", "#fffaf2", [
    0.11,
    0.11,
    0.1
  ], [
    0,
    0,
    -0.04
  ]);
  const i = [
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
  ], l = a.shape(t, i, be.block, [
    0,
    0,
    0
  ], 0.055), o = a.shape(t, i, be.enamel, [
    0,
    0,
    0.057
  ], 0.025);
  o.scale.set(0.87, 0.87, 1), a.shape(t, i, be.enamel, [
    0,
    0,
    -0.018
  ]).scale.set(0.87, 0.87, 1);
  for (const c of [-0.025, 0.09])
    a.shape(t, [
      [0, 0.24],
      [0.08, 0.12],
      [0.045, -0.07],
      [0, -0.2],
      [-0.045, -0.07],
      [-0.08, 0.12]
    ], be.silver, [
      0,
      0,
      c
    ]), a.mesh(t, "rock", be.block, [
      0.035,
      0.06,
      0.015
    ], [
      0,
      0.075,
      c + Math.sign(c) * 0.014
    ], !1, 1, !0);
  let u = 0, s = -1;
  return n.visible = !1, { update(c, h, f, p, v) {
    const d = h ? 1 : 0, m = Math.max(0, Math.min(4, p - s));
    u = v || s < 0 || p < s ? d : u + (d - u) * (1 - Math.exp(-m * 0.85)), s = p, n.visible = c === "blade" || h || u > 0.04, n.position.set(-0.4 + u * 0.12, -0.1 + u * 0.3, 0.17 + u * 0.25), n.rotation.set(0.12 - u * 0.22, 0.15 - u * 0.3, -0.16 + u * 0.22), t.scale.setScalar(0.94 + u * 0.07), l.material = a.material(f ? be.parry : c === "blade" ? be.block : be.ward, !1, 1, !0), o.material = a.material(h ? "#617f99" : be.enamel);
  } };
}
function Tn(a, e) {
  const n = a.group(e), t = new Ht({
    transparent: !0,
    depthWrite: !1,
    uniforms: {
      tint: { value: new ja(be.ward) },
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
  }), i = new Ve(a.geometries.sphere, t);
  return i.scale.set(1.12, 1.4, 1.12), i.position.y = 1.3, n.add(i), n.visible = !1, {
    update(l, o) {
      n.visible = !!l && l.ward > 0, !(!l || !n.visible) && (n.position.set(l.x, 0, l.y), t.uniforms.impact.value = o, n.scale.setScalar(1 + o * 0.035));
    },
    dispose() {
      t.dispose(), n.removeFromParent();
    }
  };
}
function $n(a, e) {
  const n = a.group(e, [
    0,
    0.15,
    0.12
  ]), t = [];
  n.rotation.set(-0.45, 0, -0.2);
  for (const h of [-1, 1]) {
    const f = a.group(n);
    a.mesh(f, "box", Ae.cover, [
      0.25,
      0.055,
      0.44
    ], [
      h * 0.125,
      0,
      0
    ]), a.mesh(f, "box", Ae.page, [
      0.22,
      0.06,
      0.38
    ], [
      h * 0.12,
      0.04,
      0
    ]), t.push(f);
  }
  const i = a.group(n, [
    0,
    0.085,
    0
  ]);
  a.mesh(i, "box", "#fffced", [
    0.22,
    0.012,
    0.37
  ], [
    0.11,
    0,
    0
  ]);
  const l = a.mesh(n, "rock", Ae.empowered, [
    0.07,
    0.1,
    0.07
  ], [
    0,
    0.3,
    0
  ], !1, 1, !0), o = a.mesh(n, "torus", Ae.crest, [
    0.17,
    0.17,
    0.17
  ], [
    0,
    0.31,
    0
  ], !0, 0.65);
  o.rotation.x = Math.PI / 2;
  let u = 0, s = 0.15, c = -1;
  return { update(h, f, p, v) {
    const d = v || c < 0 || p < c ? 1 : 1 - Math.exp(-Math.min(4, p - c) * 0.5);
    c = p, u += ((h ? 1 : 0) - u) * d, s += ((f ? 0.5 : h ? 0.28 : 0.15) - s) * d, n.position.y = s, n.rotation.x = -0.45 + (s - 0.15) * 0.7, t[0].rotation.z = -0.65 + u * 0.5, t[1].rotation.z = 0.65 - u * 0.5, i.rotation.z = v ? 0.2 : 0.2 + u * (Math.sin(p * 0.18) + 1) * 1.3, l.scale.set(0.07 + u * 0.025, 0.1 + u * 0.06, 0.07 + u * 0.025), o.visible = h, v || (l.rotation.y = p * 0.08);
  } };
}
function wt(a, e, n = 1) {
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
function _t(a, e) {
  const n = a.group(e), t = Qt({
    group: a.group,
    ball(Z, P, S, O) {
      return a.mesh(Z, "sphere", S, P, O);
    }
  }, n, [
    0,
    0.78,
    0
  ]);
  t.scale.setScalar(2.1);
  const i = qt(t), l = a.ring(n, "#193f49", 0.6, 0, 0, 0.14, !0), o = a.group(t), u = a.group(o, [
    0.3,
    0.05,
    0.17
  ]), s = a.group(o), c = Sn(a, o);
  let h = null, f = -1, p = Math.PI / 2, v = null, d = null, m = null, M = 0, C = 0;
  function w(Z, P) {
    if (!(Z === d && P === m)) {
      if (d = Z, m = P, s.clear(), u.clear(), h = null, v = En(a, s, m), a.mesh(u, "sphere", "#fffaf2", [
        0.1,
        0.1,
        0.09
      ]), d === "blade")
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
        ], 0.018), a.shape(u, [
          [0, 0.1],
          [0.07, 0.1],
          [0.07, 0.65],
          [0, 0.83]
        ], "#9cc6ce", [
          0,
          0,
          0.094
        ]);
      else if (d === "bow") wt(a, u);
      else if (d === "staff")
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
      else if (d === "daggers") for (const S of [-1, 1]) {
        const O = a.group(u, [
          S < 0 ? -0.58 : 0,
          0,
          0
        ]);
        a.mesh(O, "box", "#974953", [
          0.07,
          0.2,
          0.07
        ]), a.shape(O, [
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
      else if (d === "grimoire") h = $n(a, u);
      else if (d === "cannon") {
        const S = a.group(u, [
          0.02,
          0.08,
          0.17
        ]);
        S.rotation.x = Math.PI / 2, a.mesh(S, "cylinder", "#586e77", [
          0.12,
          0.55,
          0.12
        ], [
          0,
          0.1,
          0
        ], !1, 1, !0), a.mesh(S, "torus", "#d2a96c", [
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
    update(Z, P, S, O, z, de, U = !1) {
      w(P, S), c.update(P, !!Z?.shield, !!Z?.guard, O, z);
      const E = z || f < 0 || O < f ? 1 : 1 - Math.exp(-Math.min(4, O - f) * 0.65);
      f = O;
      const T = de ? Math.PI / 2 + 0.23 : Z?.facing ?? Math.PI / 2;
      p += Math.atan2(Math.sin(T - p), Math.cos(T - p)) * E;
      const j = !!Z && Math.abs(Z.x - M) + Math.abs(Z.y - C) > 1e-3, V = !!Z?.dashTime;
      n.position.set(Z?.x ?? 0, de ? 0.3 : 0, Z?.y ?? -8), n.scale.setScalar(de ? 1.65 : 1), i.pose(0, 0, p, O, j, V, z), t.position.y += 0.3, v.cape.rotation.x = z ? -0.15 : -0.15 - (j ? 0.5 : 0.06) - Math.sin(O * 0.15) * 0.12, v.animate(O, z);
      const Y = Z?.swing && !z ? Math.sin(Z.swing / (P === "cannon" ? 16 : 9) * Math.PI) : 0;
      u.rotation.z += ((U ? -0.3 : -0.2 - Y * 1.3) - u.rotation.z) * E, u.rotation.x += ((U ? -0.25 : 0.1 + Y * 0.6) - u.rotation.x) * E, h && h.update(!!Z?.resonance, U, O, z), l.scale.set(0.6 + (V ? 0.25 : 0), 0.6, 1), Z && (M = Z.x, C = Z.y);
    }
  };
}
function zn(a, e, n, t) {
  const { mesh: i, group: l } = a, o = l(e), u = l(o), s = l(u), c = l(u), h = [], f = ue(n), p = te[n].radius;
  a.ring(o, "#1d3540", p * 1.15, 0, 0, 0.16, !0);
  const v = "#cfad70", d = "#fff0b0", m = t.dark;
  function M(E, T, j) {
    const V = l(u, [
      E,
      j,
      T
    ]);
    i(V, "box", m, [
      0.32,
      j,
      0.42
    ], [
      0,
      -j / 2,
      0
    ]), i(V, "box", t.stone, [
      0.38,
      0.22,
      0.55
    ], [
      0,
      -j + 0.11,
      0.1
    ]), h.push(V);
  }
  function C(E, T, j = "#d9e8df") {
    i(E, "box", v, [
      0.55,
      0.1,
      0.24
    ], [
      0,
      0.25,
      0
    ], !1, 1, !0), i(E, "box", m, [
      0.11,
      0.4,
      0.11
    ]), i(E, "box", j, [
      0.2,
      T,
      0.13
    ], [
      0,
      T / 2 + 0.35,
      0
    ], !1, 1, !0), i(E, "cone", j, [
      0.15,
      0.4,
      0.13
    ], [
      0,
      T + 0.5,
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
    ]), i(c, "rock", m, [
      0.43,
      0.45,
      0.46
    ], [
      0,
      0.73,
      0.7
    ]);
    for (const E of [-0.27, 0.27]) {
      const T = i(c, "cone", v, [
        0.15,
        0.7,
        0.15
      ], [
        E,
        1.15,
        0.9
      ]);
      T.rotation.x = 0.55, i(c, "sphere", d, [
        0.05,
        0.04,
        0.06
      ], [
        E,
        0.82,
        1.02
      ], !0), M(E, -0.42, 0.45), M(E, 0.45, 0.45);
    }
    for (let E = 0; E < 3; E++) i(u, "cone", t.accent, [
      0.2,
      0.45,
      0.25
    ], [
      0,
      1.25,
      -0.5 + E * 0.4
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
    ]), i(c, "sphere", m, [
      0.6,
      0.72,
      0.45
    ], [
      0,
      4,
      0
    ]);
    const E = i(c, "crescent", v, [
      1.35,
      1.35,
      0.8
    ], [
      0,
      4.35,
      -0.3
    ], !1, 1, !0);
    E.rotation.z = 0.87;
    for (const T of [-0.23, 0.23]) i(c, "sphere", "#e4e3ff", [
      0.09,
      0.055,
      0.05
    ], [
      T,
      4.08,
      0.45
    ], !0);
    for (const T of [-1, 1]) {
      const j = l(u, [
        T * 0.8,
        3.3,
        0
      ]);
      j.rotation.z = T * 0.65, i(j, "cone", "#757caf", [
        0.5,
        1.8,
        0.45
      ], [
        0,
        -0.65,
        0
      ]), i(j, "sphere", t.light, [
        0.22,
        0.25,
        0.22
      ], [
        0,
        -1.45,
        0.1
      ]), h.push(j);
    }
    for (let T = 0; T < 5; T++) {
      const j = T / 5 * Math.PI * 2, V = i(s, "rock", t.accent, [
        0.2,
        0.34,
        0.2
      ], [
        Math.cos(j) * 1.95,
        3.3 + Math.sin(j) * 1.1,
        -0.3
      ]);
      V.rotation.z = j;
    }
  } else if (n === "king") {
    M(-0.5, 0, 0.8), M(0.5, 0, 0.8), i(u, "cone", "#7c4550", [
      1.8,
      3.6,
      0.8
    ], [
      0,
      2,
      -0.3
    ]), i(u, "box", m, [
      1.6,
      1.7,
      1
    ], [
      0,
      2.1,
      0
    ]), i(u, "rock", v, [
      0.5,
      0.9,
      0.3
    ], [
      0,
      2.25,
      0.62
    ]);
    for (const E of [-1, 1]) i(u, "rock", t.stone, [
      0.85,
      0.5,
      0.7
    ], [
      E * 0.95,
      2.95,
      0
    ]);
    i(c, "sphere", m, [
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
    ], !0), i(c, "torus", v, [
      0.86,
      0.86,
      0.86
    ], [
      0,
      4.6,
      0
    ], !1, 1, !0).rotation.x = Math.PI / 2;
    for (let E = 0; E < 7; E++) {
      const T = E * Math.PI * 2 / 7;
      i(c, "cone", v, [
        0.17,
        0.85,
        0.17
      ], [
        Math.cos(T) * 0.78,
        4.85,
        Math.sin(T) * 0.78
      ]);
    }
    s.position.set(1.55, 1.35, 0.2), s.rotation.z = -0.3, C(s, 3.4, "#f6dc9f"), i(u, "box", t.stone, [
      0.5,
      1.2,
      0.5
    ], [
      -1.15,
      2,
      0.1
    ]);
  } else if (n === "warden") {
    M(-0.65, 0.05, 0.85), M(0.65, 0.05, 0.85), i(u, "cylinder", m, [
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
    for (const T of [-1, 1])
      i(u, "rock", t.stone, [
        0.83,
        0.6,
        0.7
      ], [
        T * 1.03,
        2.7,
        0
      ]), i(u, "box", v, [
        0.7,
        0.1,
        0.8
      ], [
        T * 1.08,
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
    ]), i(c, "box", m, [
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
    const E = l(u, [
      -1.32,
      1.5,
      0.6
    ]);
    i(E, "box", m, [
      1.2,
      1.8,
      0.25
    ]), i(E, "box", v, [
      1,
      1.58,
      0.28
    ]), i(E, "box", t.foliage, [
      0.85,
      1.42,
      0.31
    ]), i(E, "rock", t.light, [
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
    ]), i(s, "box", m, [
      1.25,
      0.9,
      0.9
    ], [
      0,
      1.4,
      0
    ]), i(s, "box", v, [
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
  } else if (ue(n)) In(a, u, c, s, n, t);
  else if (n === "wisp")
    i(u, "rock", t.accent, [
      0.35,
      0.6,
      0.35
    ], [
      0,
      1,
      0
    ]), i(c, "torus", v, [
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
    for (const E of [-1, 1])
      M(E * 0.27, -0.25, 0.35), i(c, "cone", v, [
        0.09,
        0.35,
        0.09
      ], [
        E * 0.21,
        1.09,
        0.42
      ]), i(c, "sphere", d, [
        0.05,
        0.04,
        0.035
      ], [
        E * 0.15,
        0.8,
        0.77
      ], !0), i(s, "cone", t.light, [
        0.09,
        0.38,
        0.08
      ], [
        E * 0.37,
        0.3,
        0.5
      ]).rotation.x = Math.PI / 2;
  } else if (n === "bomber")
    M(-0.22, 0, 0.45), M(0.22, 0, 0.45), i(u, "sphere", "#85654c", [
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
    const E = n === "priest", T = n === "guard";
    if (E ? i(u, "cone", "#767da5", [
      0.55,
      1.5,
      0.5
    ], [
      0,
      0.95,
      0
    ]) : (M(-0.22, 0, 0.5), M(0.22, 0, 0.5), i(u, "box", m, [
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
    ]), i(c, "box", m, [
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
    ], !0), E)
      i(c, "cone", "#626a9c", [
        0.55,
        0.8,
        0.5
      ], [
        0,
        2.14,
        0
      ]), s.position.set(0.52, 1, 0.1), i(s, "cylinder", v, [
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
      for (const j of [-1, 1]) i(u, "rock", t.stone, [
        0.28,
        0.23,
        0.3
      ], [
        j * 0.45,
        1.22,
        0
      ]);
      s.position.set(0.54, 1, 0.2), n === "archer" ? wt(a, s, 1.3) : (s.rotation.z = -0.3, C(s, 0.75)), T && (i(u, "box", v, [
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
  const w = l(o, [
    0,
    f ? 5.5 : n === "charger" ? 1.7 : 2.45,
    0
  ]);
  i(w, "box", "#233f48", [
    1.06,
    0.105,
    0.02
  ], [
    0,
    0,
    0
  ], !0);
  const Z = i(w, "box", "#f0ba83", [
    1,
    0.055,
    0.03
  ], [
    0,
    0,
    0.02
  ], !0), P = [];
  u.traverse((E) => {
    E instanceof Ve && P.push({
      mesh: E,
      material: E.material
    });
  });
  let S = 0, O = -100, z = 0, de = 0;
  const U = s.rotation.z;
  return {
    root: o,
    bar: w,
    update(E, T, j) {
      const V = Math.abs(E.x - z) + Math.abs(E.y - de) > 5e-3;
      z = E.x, de = E.y, S && !E.windup && (O = T), S = E.windup;
      const Y = E.windup ? 1 - E.windup / te[E.kind].windup : 0, he = Math.max(0, 1 - (T - O) / 10);
      o.position.set(E.x, 0, E.y), u.rotation.y = Math.PI / 2 - E.angle, u.position.y = j ? 0 : n === "weaver" || n === "priest" ? 0.13 + Math.sin(T * 0.055) * 0.1 : V ? Math.abs(Math.sin(T * 0.3)) * 0.055 : 0, u.rotation.x = j ? 0 : -Y * 0.16 + he * 0.2, c.rotation.z = !j && n === "king" ? Math.sin(T * 0.035) * 0.08 : 0, s.rotation.x = j ? 0 : Y * -1.3 + he * 1.4, s.rotation.z = U + (j ? 0 : Y * -0.35);
      for (let fe = 0; fe < h.length; fe++) h[fe].rotation.x = !j && V ? Math.sin(T * 0.32 + fe * Math.PI) * 0.28 : 0;
      for (const fe of P) fe.mesh.material = E.marked > 2 && !j ? a.material("#fff6dd") : fe.material;
      w.visible = !f && E.hp < E.maxHp, Z.scale.x = E.hp / E.maxHp, Z.position.x = (E.hp / E.maxHp - 1) * 0.5;
    }
  };
}
var D = {
  danger: "#c34740",
  warning: "#ec8754",
  magic: "#8bd9f2",
  frost: "#addffc",
  gold: "#fff0bb",
  heal: "#75dbb0",
  fire: "#f0ad55"
};
function jn(a, e) {
  const n = /* @__PURE__ */ new Map();
  function t(l, o, u = 1, s = !1) {
    const c = Math.max(0.1, Math.min(1, Math.round(u * 10) / 10)), h = `${l}/${o}/${c}/${s}`;
    let f = n.get(h);
    f || (f = {
      list: [],
      used: 0
    }, n.set(h, f));
    let p = f.list[f.used++];
    return p || (p = a.mesh(e, l, o, [
      1,
      1,
      1
    ], [
      0,
      0,
      0
    ], !s, c), f.list.push(p)), p.visible = !0, p.rotation.set(0, 0, 0), p.scale.set(1, 1, 1), p;
  }
  function i(l, o, u, s, c, h = 1, f = 0.09) {
    const p = t(l, o, h);
    return p.position.set(s, f, c), p.scale.set(u, u, 1), p.rotation.x = -Math.PI / 2, p;
  }
  return { update(l, o) {
    for (const s of n.values())
      s.used = 0, s.list.forEach((c) => c.visible = !1);
    if (!l) return;
    const u = l.player;
    if (i("ring", "#f2f6e2", 0.64, u.x, u.y, 0.8), u.dashTime && !o) for (let s = 1; s <= 3; s++) {
      const c = t("cone", D.gold, 0.7 - s * 0.15);
      c.position.set(u.x - Math.cos(u.dashAngle) * s * 0.43, 0.45, u.y - Math.sin(u.dashAngle) * s * 0.43), c.scale.set(0.13, u.dashTime / 8 * 1.7, 0.13), c.rotation.set(0, -u.dashAngle, -Math.PI / 2);
    }
    if (!l.boss && (l.encounter === "siege" || l.encounter === "ritual")) {
      const s = l.objective;
      l.encounter === "ritual" && (i("disc", D.magic, 2.5, s.x, s.y, 0.12), i("ring", D.magic, 2.5, s.x, s.y), i("ring", D.gold, 2.2, s.x, s.y, 0.8));
      const c = t("cylinder", "#526b79");
      c.position.set(s.x, 0.3, s.y), c.scale.set(0.5, 0.6, 0.5);
      const h = t("rock", l.encounter === "siege" ? D.fire : D.magic);
      if (h.position.set(s.x, 1, s.y), h.scale.set(0.23, 0.5, 0.23), l.encounter === "siege") {
        h.position.y = 1.35, h.scale.set(0.4, 0.85, 0.4);
        const f = t("cone", D.gold, 0.8);
        f.position.set(s.x, 1.4, s.y), f.scale.set(0.2, 0.85, 0.2), i("ring", D.fire, 0.9, s.x, s.y, 0.8);
      }
      o || (h.rotation.y = l.tick * 0.025);
    }
    for (const s of l.companions)
      if (!(s.hp <= 0 || s.life <= 0))
        if (i("ring", D.heal, 0.4, s.x, s.y, 0.8), s.kind === "turret") {
          const c = t("cylinder", "#687c81");
          c.position.set(s.x, 0.25, s.y), c.scale.set(0.4, 0.5, 0.4);
          const h = t("box", "#bd9a68");
          h.position.set(s.x, 0.65, s.y), h.scale.set(0.9, 0.2, 0.25), h.rotation.y = -s.angle;
          const f = t("sphere", D.magic);
          f.position.set(s.x + Math.cos(s.angle) * 0.45, 0.65, s.y + Math.sin(s.angle) * 0.45), f.scale.setScalar(0.11);
        } else {
          const c = s.kind === "familiar" && u.resonance > 0, h = c ? 1.5 : 1, f = s.kind === "shade" ? "#a6acd8" : c ? Ae.empowered : Ae.familiar, p = o ? 0 : Math.sin(l.tick * 0.1 + s.id) * 0.08, v = t("sphere", f, 1, !0);
          v.position.set(s.x, 0.55 * h + p, s.y), v.scale.set(0.3 * h, 0.36 * h, 0.3 * h);
          for (const m of [-1, 1]) {
            const M = t("cone", f, 1, !0);
            M.position.set(s.x + m * 0.2 * h, 0.93 * h + p, s.y), M.scale.set(0.08 * h, 0.22 * h, 0.08 * h);
          }
          const d = t("sphere", "#35475b");
          if (d.position.set(s.x + Math.cos(s.angle) * 0.28 * h, 0.63 * h + p, s.y + Math.sin(s.angle) * 0.28 * h), d.scale.setScalar(0.07 * h), c) {
            const m = t("torus", Ae.crest, 1, !0);
            m.position.set(s.x, 1.45 + p, s.y), m.rotation.x = Math.PI / 2, m.scale.setScalar(0.32);
            for (let M = 0; M < 3; M++) {
              const C = M * Math.PI * 2 / 3, w = t("rock", Ae.crest, 1, !0);
              w.position.set(s.x + Math.cos(C) * 0.32, 1.55 + p, s.y + Math.sin(C) * 0.32), w.scale.set(0.08, 0.17, 0.08);
            }
          }
        }
    for (const s of l.enemies) {
      if (ue(s.kind) && s.phase > 1) {
        const c = te[s.kind].radius + 0.55;
        if (i("ring", s.kind === "king" ? D.fire : D.magic, c, s.x, s.y, 0.65), !o) for (let h = 0; h < s.phase + 2; h++) {
          const f = l.tick * 0.025 + h * Math.PI * 2 / (s.phase + 2), p = t("rock", s.kind === "king" ? D.fire : D.magic, 0.8);
          p.position.set(s.x + Math.cos(f) * c, 0.55 + Math.sin(f * 2) * 0.2, s.y + Math.sin(f) * c), p.scale.set(0.08, 0.19, 0.08);
        }
      }
      if (s.windup) {
        const c = 1 - s.windup / te[s.kind].windup;
        if (i("ring", D.warning, te[s.kind].radius + 0.35, s.x, s.y, 0.8), s.kind === "charger") {
          const h = Math.min(9, Math.hypot(s.target.x - s.x, s.target.y - s.y)), f = t("box", D.danger, 0.3);
          f.scale.set(0.75, 0.035, h), f.position.set(s.x + Math.cos(s.angle) * h / 2, 0.09, s.y + Math.sin(s.angle) * h / 2), f.rotation.y = Math.PI / 2 - s.angle, i("ring", D.danger, 0.5, s.target.x, s.target.y, 0.9);
        } else if (s.kind === "archer") {
          const h = Math.hypot(s.target.x - s.x, s.target.y - s.y), f = t("box", D.warning, 0.6);
          f.position.set((s.x + s.target.x) / 2, 0.11, (s.y + s.target.y) / 2), f.scale.set(h, 0.03, 0.09), f.rotation.y = -s.angle;
        } else s.kind === "bomber" ? i("ring", D.warning, 1.9, s.target.x, s.target.y) : (s.kind === "soldier" || s.kind === "guard" || s.kind === "stalker") && (i("disc", D.danger, te[s.kind].reach, s.target.x, s.target.y, 0.15 + c * 0.2), i("ring", D.danger, te[s.kind].reach, s.target.x, s.target.y));
      }
      if (s.chill && i("ring", D.frost, te[s.kind].radius + 0.13, s.x, s.y), s.exposed && i("arc", D.gold, te[s.kind].radius + 0.3, s.x, s.y, 0.9), s.burn && !o) for (let c = 0; c < 3; c++) {
        const h = t("rock", D.fire, 0.8);
        h.position.set(s.x + Math.sin(c * 2) * 0.3, 0.35 + (l.tick + c * 7) % 20 / 18, s.y + Math.cos(c * 2) * 0.3), h.scale.set(0.08, 0.2, 0.08);
      }
      s.kind === "priest" && i("ring", "#a39aca", 3.5, s.x, s.y, 0.4);
    }
    for (const s of l.hazards) {
      const c = s.friendly ? s.kind === "fire" ? D.fire : D.magic : D.danger;
      if (s.kind === "beam") {
        const h = t("box", c, s.wait ? 0.3 : 0.75);
        h.position.set(s.x + Math.cos(s.angle) * s.length / 2, 0.11, s.y + Math.sin(s.angle) * s.length / 2), h.scale.set(s.length, 0.04, s.width * 2), h.rotation.y = -s.angle;
        for (const f of [0, s.length]) i("disc", c, s.width, s.x + Math.cos(s.angle) * f, s.y + Math.sin(s.angle) * f, s.wait ? 0.3 : 0.75);
        continue;
      }
      if (s.kind === "ring") {
        i("ring", c, s.inner, s.x, s.y), i("ring", c, s.radius, s.x, s.y);
        for (let h = 1; h <= 4; h++) i("ring", c, s.inner + (s.radius - s.inner) * h / 5, s.x, s.y, s.wait ? 0.35 : 0.8);
        continue;
      }
      if (i("disc", c, s.radius, s.x, s.y, s.wait ? 0.2 : 0.4), i("ring", c, s.radius, s.x, s.y), s.wait) {
        i("ring", c, s.radius * (1 - Math.min(1, s.wait / 45)), s.x, s.y, 0.7);
        const h = t("box", c, 0.7);
        h.position.set(s.x, 0.12, s.y), h.scale.set(0.08, 0.02, 0.6);
        const f = t("box", c, 0.7);
        f.position.copy(h.position), f.scale.set(0.6, 0.02, 0.08);
      } else if (!o) {
        i("ring", D.gold, s.radius * (0.7 + Math.sin(l.tick * 0.1) * 0.1), s.x, s.y, 0.7, 0.25);
        for (let h = 0; h < 6; h++) {
          const f = h * Math.PI / 3, p = t("cone", c, 0.7);
          p.position.set(s.x + Math.cos(f) * s.radius * 0.65, 0.45, s.y + Math.sin(f) * s.radius * 0.65), p.scale.set(0.15, 0.9, 0.15);
        }
      }
    }
    for (const s of l.shots) {
      const c = s.friendly ? D.gold : D.danger, h = t("sphere", s.friendly ? "#fffbea" : "#fff1c9");
      h.position.set(s.x, 0.6, s.y), h.scale.set(0.11, 0.11, 0.11);
      const f = t("sphere", c, 0.8);
      f.position.copy(h.position), f.scale.set(0.21, 0.18, 0.21);
      const p = t("cone", c, 0.5);
      p.position.set(s.x - Math.cos(s.angle) * 0.38, 0.6, s.y - Math.sin(s.angle) * 0.38), p.scale.set(0.14, 0.75, 0.14), p.rotation.set(0, -s.angle, -Math.PI / 2);
    }
    for (const s of l.effects) {
      const c = 1 - s.life / (s.kind === "slash" ? 9 : 15);
      if (s.kind === "slash") {
        const h = i("arc", D.gold, s.size, s.x, s.y, 0.3 * (1 - c), 0.42);
        h.rotation.z = -s.angle - 0.9 + c * 0.4;
        const f = i("stroke", "#fff4d2", s.size, s.x, s.y, 0.9 * (1 - c), 0.43);
        f.rotation.z = h.rotation.z;
      } else if (s.kind === "resonance") {
        i("ring", Ae.crest, s.size * (o ? 1 : 0.6 + c * (2 - c)), s.x, s.y, 0.8 - c * 0.6, 0.16);
        for (const h of l.companions) {
          if (h.kind !== "familiar" || h.hp <= 0 || h.life <= 0) continue;
          const f = h.x - u.x, p = h.y - u.y, v = t("box", Ae.empowered, 1 - c * 0.7);
          v.position.set((u.x + h.x) / 2, 1.1, (u.y + h.y) / 2), v.scale.set(Math.hypot(f, p), 0.045, 0.045), v.rotation.y = -Math.atan2(p, f);
        }
        for (let h = 0; h < 4; h++) {
          const f = h * Math.PI / 2 + (o ? 0 : c), p = t("rock", Ae.empowered, 1 - c * 0.4);
          p.position.set(u.x + Math.cos(f) * 0.95, 1.7 + (o ? 0 : c * 0.5), u.y + Math.sin(f) * 0.95), p.scale.set(0.08, 0.18, 0.08);
        }
      } else if (s.kind === "lightning") {
        for (let h = 0; h < 4; h++) {
          const f = t("box", h % 2 ? "#ffffff" : D.magic, 1 - c * 0.6);
          f.scale.set(0.09 + (1 - c) * 0.09, 1.05, 0.08), f.position.set(s.x + (h % 2 ? 0.14 : -0.14), 0.5 + h * 0.85, s.y), f.rotation.z = h % 2 ? -0.35 : 0.35;
        }
        i("ring", D.magic, 0.4 + c, s.x, s.y, 1 - c);
      } else if (s.kind === "block" || s.kind === "parry" || s.kind === "ward-hit" || s.kind === "ward-break") {
        const h = s.kind === "block" || s.kind === "parry", f = s.kind === "ward-break", p = h ? s.kind === "parry" ? be.parry : be.block : be.ward;
        if (h) {
          const v = t("ring", p, 1 - c);
          v.position.set(s.x + Math.cos(s.angle) * 0.7, 1.3, s.y + Math.sin(s.angle) * 0.7), v.rotation.y = Math.PI / 2 - s.angle, v.scale.setScalar(0.6 + c * (s.kind === "parry" ? 1.3 : 0.6));
        }
        for (let v = 0; v < (f ? 6 : 4); v++) {
          const d = v * 2.4 + s.id, m = t(f ? "rock" : "box", p, 1 - c), M = o ? 1.1 : 0.7 + c * (f ? 1.5 : 0.6);
          m.position.set(s.x + Math.cos(d) * M, 0.7 + v % 3 * 0.55, s.y + Math.sin(d) * M), m.scale.set(0.07 * (1 - c), (f ? 0.3 : 0.16) * (1 - c), 0.04), m.rotation.set(d, d, d);
        }
      } else if (s.kind === "heal") i("ring", D.heal, 0.4 + c, s.x, s.y, 1 - c);
      else {
        const h = s.kind === "hit" ? D.danger : D.gold;
        if (i("ring", h, s.size * (0.4 + c), s.x, s.y, 1 - c), !o) for (let f = 0; f < 7; f++) {
          const p = f * 2.4 + s.id, v = t("rock", h, 1 - c * 0.8);
          v.position.set(s.x + Math.cos(p) * c * s.size, 0.4 + Math.sin(c * Math.PI) * 0.8, s.y + Math.sin(p) * c * s.size), v.scale.set(0.1 * (1 - c), 0.28 * (1 - c), 0.1 * (1 - c)), v.rotation.z = p;
        }
      }
    }
  } };
}
function Rn(a) {
  const e = document.createElement("div");
  e.className = "exp-world-beacon";
  const n = document.createElement("strong"), t = document.createElement("div"), i = document.createElement("i"), l = document.createElement("b");
  t.className = "exp-objective-track", t.dataset.objective = "beacon", t.setAttribute("role", "progressbar"), t.setAttribute("aria-label", y.beaconName), t.setAttribute("aria-valuemin", "0"), t.setAttribute("aria-valuemax", "100"), t.append(i, l), e.append(n, t);
  const o = document.createElement("div");
  o.className = "exp-world-defense", a.append(e, o), e.hidden = !0, o.hidden = !0;
  const u = new pa();
  let s = null, c = 0, h = 100, f = 0, p = 0, v = null;
  function d(m, M, C, w, Z, P, S) {
    u.set(M, C, w).project(Z), m.style.left = `${(u.x * 0.5 + 0.5) * P}px`, m.style.top = `${(-u.y * 0.5 + 0.5) * S}px`;
  }
  return {
    update(m, M, C, w) {
      if (m !== s && (s = m, c = 0, h = m?.objective.hp ?? 100, f = 0, v = null, p = 0), e.hidden = !m || m.boss || m.encounter !== "siege", o.hidden = !m, !m) return;
      if (!e.hidden) {
        m.objective.hp < h && (f = m.tick + 24), h = m.objective.hp;
        const O = h <= 30, z = m.tick < f;
        e.classList.toggle("is-critical", O), e.classList.toggle("is-hit", z), n.textContent = O ? y.beaconDanger : z ? y.beaconHit : y.beaconName, i.style.width = `${h}%`, l.textContent = `${Math.ceil(h)} / 100`, t.setAttribute("aria-valuenow", String(Math.ceil(h))), d(e, m.objective.x, 2.5, m.objective.y, M, C, w);
      }
      const Z = m.effects.filter((O) => O.id > c && O.kind in y.defenseFeedback), P = Z.find((O) => O.kind === "parry" || O.kind === "ward-break") ?? Z.at(-1);
      P && (v = P.kind, p = m.tick + 27), c = m.serial, m.tick >= p && (v = null);
      const S = m.player;
      o.hidden = !v && !S.shield && !S.ward, o.dataset.state = v ?? (S.shield ? "blocking" : "ward"), o.textContent = v ? y.defenseFeedback[v] : S.shield ? y.guardActive : y.wardValue(S.ward), d(o, S.x, S.shield ? 3.65 : 3.05, S.y, M, C, w);
    },
    dispose() {
      e.remove(), o.remove();
    }
  };
}
function Ln(a, e) {
  const n = new ut({
    antialias: !0,
    alpha: !1,
    powerPreference: "high-performance"
  });
  n.outputColorSpace = dt, n.toneMapping = 7, n.toneMappingExposure = 1, n.setPixelRatio(Math.min(devicePixelRatio || 1, 1.8)), n.shadowMap.enabled = !0, n.shadowMap.type = 2, a.append(n.domElement);
  const t = document.createElement("div");
  t.className = "exp-world-labels", t.setAttribute("aria-hidden", "true"), a.append(t);
  const i = new ct(), l = new lt(-10, 10, 10, -10, 0.1, 180), o = bt();
  i.add(new ot("#effbff", "#74918a", 2));
  const u = new Ea("#fff4e5", 1.9);
  u.position.set(-12, 25, 13), u.castShadow = !0, u.shadow.mapSize.set(1536, 1536), Object.assign(u.shadow.camera, {
    left: -23,
    right: 23,
    top: 24,
    bottom: -24,
    far: 80
  }), u.shadow.bias = -4e-4, u.shadow.normalBias = 0.035, u.shadow.radius = 3, i.add(u);
  const s = new Ea("#c3edff", 1.1);
  s.position.set(7, 8, -15), i.add(s);
  const c = new ra(), h = new ra(), f = new ra();
  i.add(c, h, f);
  const p = _t(o, h), v = jn(o, f), d = Tn(o, f), m = Rn(t), M = /* @__PURE__ */ new Map(), C = [], w = matchMedia("(prefers-reduced-motion: reduce)"), Z = new pa(), P = new pa();
  let S = null, O = "", z = "", de = "", U = null, E = 1, T = 1, j = !0, V = !1, Y = !1, he = 0, fe = -1, J = 0, H = !1;
  function Q() {
    const ce = a.getBoundingClientRect();
    E = Math.max(1, ce.width), T = Math.max(1, ce.height), n.setSize(E, T, !1), j = !0, H = !1;
  }
  const oe = new ResizeObserver(Q);
  oe.observe(a), Q();
  function We(ce) {
    ce.preventDefault(), Y = !0, e();
  }
  n.domElement.addEventListener("webglcontextlost", We);
  function Qe(ce, Ze, Re, Pe, Be = !1) {
    if (Math.abs(ce) < 1) return;
    const L = document.createElement("span");
    L.className = Be ? "exp-damage is-player" : ce < 0 ? "exp-damage is-heal" : "exp-damage", L.textContent = `${ce < 0 ? "+" : ""}${Math.ceil(Math.abs(ce))}`, t.append(L), C.push({
      element: L,
      position: new pa(Ze, 2, Re),
      born: Pe
    });
  }
  function la() {
    for (const ce of M.values())
      h.remove(ce.actor.root), ce.marker.remove();
    M.clear(), C.splice(0).forEach((ce) => ce.element.remove());
  }
  return {
    draw(ce, Ze, Re, Pe = "battle", Be = 0) {
      if (V || Y) return;
      const L = Pe === "battle" ? ce : null, ka = L?.tick ?? (w.matches ? 0 : Be * 0.025), Ue = L?.tick !== fe, ca = `${Ze.weapon}/${Ze.outfit}/${Re}`;
      if (!j && Pe === z && ca === de && L === U && (!Ue && L || !L && (Pe === "between" || w.matches || Be - he < 40))) return;
      he = Be;
      const Xe = xt[Re], Je = `${Re}:${L?.boss ?? !1}:${!!L}`;
      Je !== O && (S?.(), S = Pn(o, c, Re, L), O = Je, i.background = new ja(Xe.sky), i.fog = new Nt(Xe.haze, 42, 95)), L !== U && (la(), J = L?.player.hp ?? 0, H = !1);
      const ea = Pe !== "battle", ve = E < 600, N = ve || T < 400, I = E / T, k = ea ? ve ? 13 : 28 : ve ? 18.5 : Math.max(27, I * (T < 400 ? 14 : 23)), ke = Math.max(0, R.arena - k / 2 + 0.5), La = L ? N ? L.player.x * 0.62 : Math.max(-ke, Math.min(ke, L.player.x * 0.62)) : ve ? 0 : 5.5, Oa = L ? L.player.y * (N ? 0.62 : 0.2) - 0.4 : ve ? -4.2 : -11.8;
      !H || w.matches ? (Z.set(La, 0, Oa), H = !0) : (Z.x += (La - Z.x) * 0.14, Z.z += (Oa - Z.z) * 0.14), l.left = -k / 2, l.right = k / 2, l.top = k / I / 2, l.bottom = -l.top;
      const Na = ea ? 0 : 1 * Math.PI / 4;
      l.position.set(Z.x + Math.sin(Na) * 25, 28, Z.z + Math.cos(Na) * 25), l.lookAt(Z.x, 0, Z.z), l.updateProjectionMatrix(), l.updateMatrixWorld(), p.update(L?.player ?? null, Ze.weapon, Ze.outfit, ka, w.matches, ea, !!L?.effects.some((ae) => ae.kind === "resonance"));
      for (const ae of L?.enemies ?? []) {
        let K = M.get(ae.id);
        if (!K) {
          const wa = document.createElement("i");
          wa.className = ue(ae.kind) ? "exp-threat is-boss" : "exp-threat", t.append(wa), K = {
            actor: zn(o, h, ae.kind, Xe),
            hp: ae.hp,
            death: null,
            marker: wa
          }, M.set(ae.id, K);
        }
        K.hp > ae.hp && Ue && Qe(K.hp - ae.hp, ae.x, ae.y, L.tick), K.hp = ae.hp, K.actor.update(ae, L.tick, w.matches), K.actor.bar.quaternion.copy(l.quaternion), P.set(ae.x, 1.2, ae.y).project(l);
        const Ee = (P.x * 0.5 + 0.5) * E, aa = (-P.y * 0.5 + 0.5) * T, xa = Math.max(18, Math.min(E - 18, Ee)), ba = Math.max(ve ? 132 : 95, Math.min(T - 130, aa));
        K.marker.hidden = Math.abs(Ee - xa) + Math.abs(aa - ba) < 10, K.marker.style.transform = `translate(${xa}px,${ba}px) rotate(${Math.atan2(aa - ba, Ee - xa) + Math.PI / 2}rad)`;
      }
      for (const [ae, K] of M) {
        if (L?.enemies.some((aa) => aa.id === ae)) continue;
        K.death === null && (K.death = L?.tick ?? 0, L && K.hp > 0 && Qe(K.hp, K.actor.root.position.x, K.actor.root.position.z, L.tick));
        const Ee = ((L?.tick ?? 0) - K.death) / 12;
        K.actor.bar.visible = !1, K.marker.hidden = !0, K.actor.root.scale.setScalar(Math.max(0, 1 - Ee)), (Ee >= 1 || !L || w.matches) && (h.remove(K.actor.root), K.marker.remove(), M.delete(ae));
      }
      L && Ue && (J !== L.player.hp && Qe(J - L.player.hp, L.player.x, L.player.y, L.tick, J > L.player.hp), J = L.player.hp), v.update(L, w.matches);
      const Ha = L?.effects.filter((ae) => ae.kind === "ward-hit").at(-1);
      d.update(L?.player ?? null, Ha ? Math.max(0, (Ha.life - 5) / 10) : 0), m.update(L, l, E, T);
      for (let ae = C.length - 1; ae >= 0; ae--) {
        const K = C[ae], Ee = ((L?.tick ?? 0) - K.born) / 27;
        if (Ee >= 1 || !L) {
          K.element.remove(), C.splice(ae, 1);
          continue;
        }
        P.copy(K.position), P.y += w.matches ? 0 : Ee * 0.9, P.project(l), K.element.style.transform = `translate(${(P.x * 0.5 + 0.5) * E}px,${(-P.y * 0.5 + 0.5) * T}px)`, K.element.style.opacity = String(Math.min(1, (1 - Ee) * 3));
      }
      n.render(i, l), j = !1, z = Pe, de = ca, U = L, fe = L?.tick ?? -1;
    },
    dispose() {
      V = !0, oe.disconnect(), n.domElement.removeEventListener("webglcontextlost", We), la(), m.dispose(), d.dispose(), S?.(), u.shadow.dispose(), o.dispose(), i.clear(), n.dispose(), n.forceContextLoss(), n.domElement.remove(), t.remove();
    }
  };
}
function On(a) {
  let e = null, n = null, t = null, i = !1, l = !1, o = null, u = -1, s = 0, c = 0, h = 0, f = 0;
  function p(d, m, M, C = "sine", w = d * 0.8, Z = 0) {
    if (!i || !e || !n || e.state !== "running") return;
    const P = e.createOscillator(), S = e.createGain(), O = e.currentTime + Z;
    P.type = C, P.frequency.setValueAtTime(d, O), P.frequency.exponentialRampToValueAtTime(Math.max(30, w), O + m), S.gain.setValueAtTime(1e-4, O), S.gain.exponentialRampToValueAtTime(M, O + 9e-3), S.gain.exponentialRampToValueAtTime(1e-4, O + m), P.connect(S).connect(n), P.start(O), P.stop(O + m), P.onended = () => {
      P.disconnect(), S.disconnect();
    };
  }
  function v(d, m, M, C) {
    if (!i || !e || !n || !t || e.state !== "running") return;
    const w = e.createBufferSource(), Z = e.createBiquadFilter(), P = e.createGain(), S = e.currentTime;
    w.buffer = t, Z.type = "bandpass", Z.Q.value = 0.65, Z.frequency.setValueAtTime(M, S), Z.frequency.exponentialRampToValueAtTime(C, S + d), P.gain.setValueAtTime(1e-4, S), P.gain.exponentialRampToValueAtTime(m, S + 8e-3), P.gain.exponentialRampToValueAtTime(1e-4, S + d), w.connect(Z).connect(P).connect(n), w.start(S), w.stop(S + d), w.onended = () => {
      w.disconnect(), Z.disconnect(), P.disconnect();
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
            const m = t.getChannelData(0);
            for (let M = 0; M < m.length; M++) m[M] = Math.random() * 2 - 1;
          }
          await e.resume();
        } catch {
          i = !1, l || a();
        }
      }
    },
    tick(d) {
      o !== d && (o = d, u = -1, s = d.player.hp, c = d.kills, h = d.player.skill, f = d.serial), u !== d.tick && (u = d.tick, d.player.hp < s && (v(0.16, 0.17, 800, 120), p(95, 0.2, 0.12, "triangle", 42)), d.kills > c && (p(659, 0.22, 0.045), p(988, 0.3, 0.025, "sine", 980, 0.035)), d.player.swing === 9 && v(0.095, 0.08, 2700, 500), d.player.dashTime === 7 && v(0.2, 0.09, 500, 2600), d.player.skill > h && (v(0.24, 0.12, 2200, 250), p(165, 0.35, 0.075, "triangle", 82), p(660, 0.36, 0.035, "sine", 440, 0.02)), d.effects.some((m) => m.id > f && m.kind === "lightning") && (v(0.12, 0.1, 4400, 1e3), p(1200, 0.08, 0.018, "sine", 210)), d.effects.some((m) => m.id > f && (m.kind === "block" || m.kind === "parry")) && (p(1350, 0.18, 0.07, "triangle", 740), p(2200, 0.11, 0.025, "sine", 1600)), d.effects.some((m) => m.id > f && m.kind === "ward-hit") && p(510, 0.16, 0.06, "sine", 250), d.effects.some((m) => m.id > f && m.kind === "ward-break") && (v(0.25, 0.1, 3600, 650), p(720, 0.3, 0.05, "sine", 120)), d.status === "won" && [
        392,
        494,
        587,
        784
      ].forEach((m, M) => p(m, 0.65, 0.04, "sine", m, M * 0.075)), d.status === "lost" && p(147, 0.7, 0.06, "triangle", 73), s = d.player.hp, c = d.kills, h = d.player.skill, f = d.serial);
    },
    dispose() {
      l = !0, i = !1, e && (e.close().catch(a), e = null), n = null, t = null;
    }
  };
}
var it = {
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
}, Nn = {
  class: "exp-icon",
  viewBox: "0 0 64 64",
  fill: "none",
  "aria-hidden": "true"
}, Hn = ["d"], qn = ["d"], Qn = /* @__PURE__ */ ga({
  __name: "ExpeditionIcon",
  props: { name: {} },
  setup(a) {
    return (e, n) => (_(), A("svg", Nn, [g("path", {
      d: r(it)[a.name].body,
      fill: "currentColor",
      "fill-opacity": ".17",
      "fill-rule": "evenodd",
      stroke: "currentColor",
      "stroke-width": "2.2",
      "stroke-linejoin": "round"
    }, null, 8, Hn), g("path", {
      d: r(it)[a.name].detail,
      stroke: "currentColor",
      "stroke-width": "2.2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, 8, qn)]));
  }
}), B = Qn, Bn = ["aria-label"], Fn = {
  key: 0,
  class: "exp-touch"
}, Dn = ["aria-label"], Wn = { class: "exp-combat-buttons" }, Un = {
  key: 0,
  class: "exp-resonance-status",
  "data-state": "resonance"
}, Gn = ["aria-label"], Kn = ["aria-label"], Vn = { key: 0 }, Yn = /* @__PURE__ */ ga({
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
    const t = a, i = n, l = X(null), o = X(null), u = X({
      x: 0,
      y: 0
    }), s = X({
      dash: 0,
      skill: 0,
      shield: 0,
      resonance: 0
    });
    let c = null, h = null, f = null, p = "", v = 0, d = 0, m = -1, M = 0, C = [], w = 0, Z = !1, P = !0, S = !1;
    const O = On(() => i("error", "sound")), z = An((H, Q) => {
      u.value = {
        x: H * 27,
        y: Q * 27
      }, h?.stick(H, Q);
    }, () => {
      l.value?.focus({ preventScroll: !0 });
    });
    function de() {
      const H = t.run;
      return H ? `${H.id}:${H.step}:${H.phase === "battle" ? "battle" : "between"}` : "";
    }
    function U() {
      const H = t.run, Q = de();
      Q !== p && (p = Q, f = H?.phase === "battle" && H.battle ? structuredClone(H.battle) : null, C = [], w = 0, m = -1, j(), f ? (l.value?.focus({ preventScroll: !0 }), E()) : i("hud", null));
    }
    function E() {
      !f || f.tick === m || (m = f.tick, s.value = {
        dash: f.player.dash,
        skill: f.player.skill,
        shield: f.player.shield,
        resonance: f.player.resonance
      }, i("hud", {
        player: { ...f.player },
        enemies: f.enemies.filter((H) => ue(H.kind)).map((H) => ({ ...H })),
        wave: f.wave,
        waves: f.waves,
        tick: f.tick,
        objective: { ...f.objective },
        encounter: f.encounter
      }));
    }
    async function T() {
      if (Z || !C.length || t.client.blocked.value || t.generationActive) return;
      Z = !0;
      const H = C;
      C = [], w = 0;
      const Q = await t.client.act({
        type: "input",
        spans: H
      });
      Z = !1, Q ? C.length && (t.paused || f?.status !== "fighting" || !P) && T() : i("pause");
    }
    function j() {
      z.clear(), h?.clear();
    }
    function V() {
      j(), i("pause"), T();
    }
    function Y() {
      document.hidden && V();
    }
    function he(H) {
      if (S || !P) return;
      v = requestAnimationFrame(he);
      const Q = d ? Math.min(100, H - d) : 0;
      if (d = H, !t.paused && !t.generationActive && !document.hidden && !t.client.failed.value && t.client.view.value?.writeState === "ready" && w < R.maxInputTicks && f?.status === "fighting" && f && t.run) {
        for (M += Q; M >= 1e3 / R.hz && f.status === "fighting" && w < R.maxInputTicks; ) {
          const oe = h.frame();
          vn(f, oe, t.run), gn(C, oe), w++, M -= 1e3 / R.hz, O.tick(f);
        }
        (w >= R.checkpointTicks || f.status !== "fighting") && T(), (f.tick % 3 === 0 || f.status !== "fighting") && E();
      } else M = 0;
      try {
        document.hidden || c?.draw(f, t.camp ? {
          weapon: t.weapon,
          outfit: t.outfit
        } : t.run ?? {
          weapon: t.weapon,
          outfit: t.outfit
        }, t.run ? Mt(t.run) : 0, t.camp ? "camp" : f ? "battle" : "between", H);
      } catch {
        i("error", "rendering"), V(), cancelAnimationFrame(v);
      }
    }
    Ne(de, U, { flush: "sync" }), Ne(() => t.paused, (H) => {
      H ? (j(), T()) : l.value?.focus({ preventScroll: !0 });
    }), Ne(() => t.sound, (H) => {
      O.enable(H);
    }), Ne(() => t.generationActive, (H) => {
      !H && t.paused && T();
    });
    function fe(H) {
      (!H || H.detail === 0) && h?.dash();
    }
    function J(H) {
      (!H || H.detail === 0) && h?.skill();
    }
    return $a(() => {
      try {
        c = Ln(o.value, () => {
          i("error", "rendering"), V();
        });
      } catch {
        i("error", "rendering");
        return;
      }
      h = Cn(l.value, V, () => {
        t.sound && O.enable(!0);
      }), document.addEventListener("visibilitychange", Y), U(), v = requestAnimationFrame(he), l.value?.focus({ preventScroll: !0 });
    }), rt(() => {
      P = !1, cancelAnimationFrame(v), V();
    }), st(() => {
      P || (P = !0, d = 0, v = requestAnimationFrame(he));
    }), za(() => {
      S = !0, cancelAnimationFrame(v), j(), h?.dispose(), document.removeEventListener("visibilitychange", Y), c?.dispose(), O.dispose();
    }), e({ flush: T }), (H, Q) => (_(), A("div", {
      ref_key: "root",
      ref: l,
      class: "exp-field",
      tabindex: "0",
      "aria-label": r(y).controls
    }, [g("div", {
      ref_key: "canvas",
      ref: o,
      class: "exp-canvas"
    }, null, 512), a.run?.phase === "battle" && !a.paused ? (_(), A("div", Fn, [g("div", {
      class: "exp-stick",
      role: "group",
      "aria-label": r(y).touchMove,
      onPointerdown: Q[0] || (Q[0] = Ke((...oe) => r(z).down && r(z).down(...oe), ["prevent"])),
      onPointermove: Q[1] || (Q[1] = Ke((...oe) => r(z).move && r(z).move(...oe), ["prevent"])),
      onPointerup: Q[2] || (Q[2] = (...oe) => r(z).release && r(z).release(...oe)),
      onPointercancel: Q[3] || (Q[3] = (...oe) => r(z).release && r(z).release(...oe)),
      onLostpointercapture: Q[4] || (Q[4] = (...oe) => r(z).release && r(z).release(...oe)),
      onContextmenu: Q[5] || (Q[5] = Ke(() => {
      }, ["prevent"]))
    }, [g("span", { style: Fe({ transform: `translate(${u.value.x}px, ${u.value.y}px)` }) }, null, 4), Q[8] || (Q[8] = g("i", { "aria-hidden": "true" }, null, -1))], 40, Dn), g("div", Wn, [
      s.value.resonance > 0 ? (_(), A("div", Un, [
        W(B, { name: "grimoire" }),
        g("strong", null, b(r(y).resonanceActive), 1),
        g("b", null, b(r(y).secondsLeft(s.value.resonance)), 1)
      ])) : q("", !0),
      g("button", {
        type: "button",
        "aria-label": r(y).dash,
        class: Oe({ "is-cooling": s.value.dash > 0 }),
        onPointerdown: Q[6] || (Q[6] = Ke((oe) => fe(), ["prevent"])),
        onClick: fe
      }, [
        W(B, { name: "dash" }),
        g("span", null, b(s.value.dash ? (s.value.dash / r(R).hz).toFixed(1) : r(y).dash), 1),
        g("kbd", null, b(r(y).dashKey), 1)
      ], 42, Gn),
      g("button", {
        type: "button",
        "aria-label": r(Se)[a.run.weapon].action,
        class: Oe({
          "is-cooling": s.value.skill > 0,
          "is-guarding": s.value.shield > 0,
          "is-resonating": s.value.resonance > 0
        }),
        onPointerdown: Q[7] || (Q[7] = Ke((oe) => J(), ["prevent"])),
        onClick: J
      }, [
        W(B, { name: s.value.shield ? "aegis" : a.run.weapon }, null, 8, ["name"]),
        g("span", null, b(s.value.shield ? r(y).guardActive : r(Se)[a.run.weapon].action), 1),
        s.value.skill && !s.value.shield ? (_(), A("small", Vn, b((s.value.skill / r(R).hz).toFixed(1)), 1)) : q("", !0),
        g("kbd", null, b(r(y).skillKey), 1)
      ], 42, Kn)
    ])])) : q("", !0)], 8, Bn));
  }
}), Xn = Yn, Jn = { class: "exp-wardrobe" }, ei = { class: "exp-fitting" }, ai = ["aria-label"], ti = {
  key: 0,
  role: "alert"
}, ni = { class: "exp-preview-tools" }, ii = ["aria-label"], si = ["disabled"], ri = { class: "exp-muted" }, oi = ["disabled"], li = { key: 0 }, ci = { key: 1 }, ui = { class: "exp-purchase-confirm" }, di = ["disabled"], fi = ["disabled"], pi = ["aria-label"], hi = ["aria-pressed", "onClick"], mi = ["src"], vi = /* @__PURE__ */ ga({
  __name: "ExpeditionWardrobe",
  props: {
    data: {},
    balance: {},
    blocked: { type: Boolean },
    weapon: {}
  },
  emits: ["command"],
  setup(a, { emit: e }) {
    const n = a, t = e, i = X(n.data.equippedOutfit), l = X(!1), o = X(0), u = X(!1), s = X(null), c = X({}), h = re(() => Ye[i.value]), f = re(() => Ja(n.data, i.value)), p = re(() => Dt.find((Z) => Ra[Z].awardKey === h.value.achievement));
    let v = null, d = !0, m = 0;
    Ne([
      i,
      o,
      () => n.weapon
    ], () => {
      d = !0, l.value = !1;
    });
    function M(Z) {
      i.value = Z;
    }
    function C() {
      m = performance.now() + 1100, d = !0;
    }
    function w() {
      l.value = !1, t("command", {
        type: "purchase",
        id: i.value
      });
    }
    return $a(() => {
      let Z;
      try {
        Z = new ut({
          antialias: !0,
          alpha: !1
        });
      } catch {
        u.value = !0;
        return;
      }
      Z.outputColorSpace = dt, Z.toneMapping = 7, Z.setPixelRatio(Math.min(devicePixelRatio, 1.8));
      const P = new ct(), S = bt(), O = new ra(), z = _t(S, O);
      P.background = new ja("#d1e0e1"), P.add(O, new ot("#fff6e3", "#627c93", 2.7));
      const de = new Ea("#fff6e0", 3);
      de.position.set(-3, 5, 6), P.add(de);
      const U = new lt(-2.35, 2.35, 2.35, -2.35, 0.1, 30);
      U.position.set(0, 2.9, 7), U.lookAt(0, 1.7, 0), Z.setSize(144, 144, !1);
      try {
        for (const J of ma)
          z.update({
            x: 0,
            y: 0,
            facing: Math.PI / 2,
            dashTime: 0,
            swing: 0,
            shield: 0,
            guard: 0,
            resonance: 0
          }, n.weapon, J, 0, !0, !1), z.root.position.set(0, 0.1, 0), z.root.rotation.y = -0.2, z.root.scale.setScalar(1.35), Z.render(P, U), c.value[J] = Z.domElement.toDataURL("image/png");
      } catch {
        u.value = !0, S.dispose(), P.clear(), Z.dispose(), Z.forceContextLoss();
        return;
      }
      s.value.append(Z.domElement);
      let E = 0, T = 1, j = 1;
      const V = new ResizeObserver(() => {
        const J = s.value.getBoundingClientRect();
        T = Math.max(1, J.width), j = Math.max(1, J.height), Z.setSize(T, j, !1), U.left = -2.35 * T / j, U.right = -U.left, U.top = 2.35, U.bottom = -2.35, U.updateProjectionMatrix(), d = !0;
      });
      V.observe(s.value);
      const Y = matchMedia("(prefers-reduced-motion: reduce)");
      function he(J) {
        J.preventDefault(), u.value = !0, cancelAnimationFrame(E);
      }
      Z.domElement.addEventListener("webglcontextlost", he);
      function fe(J) {
        if (E = requestAnimationFrame(fe), !d && (J > m || Y.matches)) return;
        const H = J < m && !Y.matches, Q = J * 0.03;
        z.update({
          x: H ? Math.sin(Q * 0.4) * 0.03 : 0,
          y: 0,
          facing: Math.PI / 2,
          dashTime: 0,
          swing: H ? 8 - Q % 8 : 0,
          shield: 0,
          guard: 0,
          resonance: 0
        }, n.weapon, i.value, Q, Y.matches, !1), z.root.position.set(0, 0.1, 0), z.root.rotation.y = Number(o.value) * Math.PI / 180, z.root.scale.setScalar(1.35);
        try {
          Z.render(P, U), d = !1;
        } catch {
          u.value = !0, cancelAnimationFrame(E);
        }
      }
      E = requestAnimationFrame(fe), v = () => {
        cancelAnimationFrame(E), V.disconnect(), Z.domElement.removeEventListener("webglcontextlost", he), S.dispose(), P.clear(), Z.dispose(), Z.forceContextLoss(), Z.domElement.remove();
      };
    }), za(() => v?.()), (Z, P) => (_(), A("div", Jn, [g("section", ei, [
      g("div", {
        ref_key: "host",
        ref: s,
        class: "exp-outfit-preview",
        "aria-label": r(De)[i.value].name
      }, [u.value ? (_(), A("p", ti, b(r(y).presentationError.rendering), 1)) : q("", !0)], 8, ai),
      g("div", ni, [g("label", null, [le(b(r(y).rotate), 1), Et(g("input", {
        "onUpdate:modelValue": P[0] || (P[0] = (S) => o.value = S),
        type: "range",
        min: "-180",
        max: "180",
        step: "5",
        "aria-label": r(y).rotate
      }, null, 8, ii), [[At, o.value]])]), g("button", {
        type: "button",
        disabled: u.value,
        onClick: C
      }, b(r(y).previewAction), 9, si)]),
      g("h3", null, b(r(De)[i.value].name), 1),
      g("p", null, b(r(De)[i.value].detail), 1),
      g("p", ri, b(r(y).wardrobeNote), 1),
      f.value ? (_(), A(G, { key: 0 }, [g("button", {
        type: "button",
        class: "exp-primary",
        disabled: a.blocked || a.data.equippedOutfit === i.value,
        onClick: P[1] || (P[1] = (S) => t("command", {
          type: "equip",
          id: i.value
        }))
      }, b(a.data.equippedOutfit === i.value ? r(y).equipped : r(y).equip), 9, oi), a.data.active && !r(ha)(a.data.active) ? (_(), A("small", li, b(r(y).nextRunOutfit), 1)) : q("", !0)], 64)) : p.value ? (_(), A("p", ci, b(r(y).unlockWeapon(r(sa)[p.value])), 1)) : l.value ? (_(), A(G, { key: 2 }, [g("p", null, b(r(y).buyOutfit(r(De)[i.value].name, h.value.price)), 1), g("div", ui, [g("button", {
        type: "button",
        class: "exp-primary",
        disabled: a.blocked || a.balance < h.value.price,
        onClick: w
      }, b(r(y).confirm), 9, di), g("button", {
        type: "button",
        onClick: P[2] || (P[2] = (S) => l.value = !1)
      }, b(r(y).cancel), 1)])], 64)) : (_(), A("button", {
        key: 3,
        type: "button",
        class: "exp-primary",
        disabled: a.blocked || a.balance < h.value.price,
        onClick: P[3] || (P[3] = (S) => l.value = !0)
      }, b(a.balance < h.value.price ? r(y).noCoins : r(y).purchase) + " · " + b(r(y).coins(h.value.price)), 9, fi))
    ]), g("div", {
      class: "exp-outfit-rack",
      "aria-label": r(y).tryOn
    }, [(_(!0), A(G, null, ge(r(ma), (S) => (_(), A("button", {
      key: S,
      type: "button",
      "aria-pressed": i.value === S,
      onClick: (O) => M(S)
    }, [
      c.value[S] ? (_(), A("img", {
        key: 0,
        class: "exp-outfit-swatch",
        src: c.value[S],
        alt: ""
      }, null, 8, mi)) : q("", !0),
      g("strong", null, b(r(De)[S].name), 1),
      g("small", null, b(a.data.equippedOutfit === S ? r(y).equipped : r(Ja)(a.data, S) ? r(y).owned : r(Ye)[S].price ? r(y).coins(r(Ye)[S].price) : r(y).achievement), 1)
    ], 8, hi))), 128))], 8, pi)]));
  }
}), gi = vi, yi = ["data-zone"], Mi = { class: "exp-hud" }, ki = {
  key: 0,
  class: "exp-health"
}, xi = [
  "aria-label",
  "aria-valuenow",
  "aria-valuemax"
], bi = {
  key: 0,
  class: "exp-sr-only"
}, wi = {
  key: 1,
  class: "exp-contract-power"
}, _i = [
  "max",
  "value",
  "aria-label"
], Zi = ["value", "aria-label"], Ci = ["aria-label"], Ai = { key: 0 }, Pi = ["aria-label"], Ei = { class: "exp-tools" }, Ii = ["aria-label", "aria-pressed"], Si = ["aria-label"], Ti = ["aria-label"], $i = ["aria-label"], zi = ["aria-label"], ji = ["aria-label"], Ri = [
  "aria-label",
  "aria-valuenow",
  "aria-valuemax"
], Li = ["aria-label", "aria-valuenow"], Oi = {
  key: 2,
  class: "exp-wave"
}, Ni = {
  key: 3,
  class: "exp-encounter",
  "aria-hidden": "true"
}, Hi = { key: 0 }, qi = {
  key: 4,
  class: "exp-camp"
}, Qi = { class: "exp-title" }, Bi = { class: "exp-camp-location" }, Fi = { class: "exp-camp-relics" }, Di = ["disabled"], Wi = { class: "exp-camp-loadout" }, Ui = ["aria-label"], Gi = [
  "disabled",
  "aria-pressed",
  "title",
  "onClick"
], Ki = { key: 0 }, Vi = { class: "exp-weapon-detail" }, Yi = {
  key: 0,
  class: "exp-next-unlock"
}, Xi = { class: "exp-camp-options" }, Ji = ["disabled"], es = { class: "exp-screen-heading" }, as = ["aria-label"], ts = { key: 1 }, ns = { class: "exp-section-label" }, is = { class: "exp-route-options" }, ss = [
  "disabled",
  "data-route",
  "onClick"
], rs = { class: "exp-decision-content" }, os = { class: "exp-screen-heading" }, ls = {
  key: 0,
  class: "exp-prize",
  role: "status"
}, cs = { key: 0 }, us = { class: "exp-relic-options" }, ds = [
  "disabled",
  "data-relic",
  "onClick"
], fs = { class: "exp-relic-art" }, ps = { class: "exp-relic-family" }, hs = {
  key: 0,
  class: "exp-relic-price"
}, ms = {
  key: 1,
  class: "exp-muted"
}, vs = { class: "exp-muted exp-upgrade-hint" }, gs = ["disabled"], ys = ["disabled"], Ms = { class: "exp-screen-heading" }, ks = ["disabled"], xs = ["disabled"], bs = ["disabled"], ws = { class: "exp-decision-content" }, _s = { class: "exp-screen-heading" }, Zs = { key: 0 }, Cs = { class: "exp-result-stats" }, As = { class: "exp-prize" }, Ps = { class: "exp-result-build" }, Es = { class: "exp-muted" }, Is = {
  key: 6,
  class: "exp-pause-overlay"
}, Ss = { class: "exp-panel" }, Ts = { class: "exp-muted" }, $s = ["disabled"], zs = {
  key: 7,
  class: "exp-keyboard-hint"
}, js = ["aria-label"], Rs = ["aria-label"], Ls = ["aria-label"], Os = {
  key: 1,
  class: "exp-oaths"
}, Ns = { key: 0 }, Hs = [
  "checked",
  "disabled",
  "onChange"
], qs = { key: 0 }, Qs = { class: "exp-inventory" }, Bs = [
  "disabled",
  "title",
  "onClick"
], Fs = { class: "exp-muted" }, Ds = { key: 0 }, Ws = { class: "exp-inventory" }, Us = ["disabled"], Gs = { class: "exp-journal-tabs" }, Ks = ["aria-pressed"], Vs = ["aria-pressed"], Ys = ["aria-pressed"], Xs = { class: "exp-collection" }, Js = { key: 0 }, er = { class: "exp-muted" }, ar = { key: 0 }, tr = { class: "exp-list exp-receipts" }, nr = { key: 0 }, ir = { class: "exp-list" }, sr = ["disabled"], rr = ["disabled"], or = /* @__PURE__ */ ga({
  __name: "ExpeditionRoom",
  props: {
    bridge: {},
    chatIdentity: {},
    generationActive: { type: Boolean }
  },
  setup(a) {
    const e = a, n = _n(e.bridge, e.chatIdentity), { view: t, busy: i, notice: l, blocked: o, failed: u } = n, s = re(() => t.value?.data.active ?? null), c = X("blade"), h = X([]), f = X(!0), p = X(!1), v = X(null), d = X(null), m = X(null), M = X(null), C = X(null), w = X(null), Z = X(0), P = X(null), S = X(null), O = X(null), z = X(!0);
    let de = !1;
    const U = X("records"), E = Object.keys(we), T = re(() => s.value && !ha(s.value)), j = re(() => !z.value && s.value?.phase === "battle"), V = re(() => f.value || z.value || e.generationActive || !!l.value || !!d.value || !!w.value), Y = re(() => v.value?.enemies.find((N) => ue(N.kind))), he = re(() => s.value?.phase === "lost" && s.value.battle ? gt(s.value.battle) : null), fe = re(() => j.value && !s.value?.battle?.boss && v.value?.encounter === "siege"), J = re(() => j.value && v.value ? v.value.player.hp : s.value?.hp ?? R.maxHp), H = re(() => s.value?.relics.length === R.relicSlots), Q = re(() => s.value ? Mt(s.value) : 0), oe = re(() => s.value ? yt(s.value) : 0), We = re(() => s.value ? sa[s.value.bosses[oe.value]] : ""), Qe = re(() => t.value?.data.equippedOutfit ?? "traveler"), la = re(() => {
      const N = v.value;
      return N ? N.encounter === "ritual" ? y.objectiveProgress(N.objective.progress, N.objective.target) : N.encounter === "survival" ? y.survive(N.objective.target - N.objective.progress) : N.encounter === "pursuit" && N.wave < N.waves ? y.reinforcement(N.objective.target - N.objective.progress) : y.wave(N.wave, N.waves) : "";
    }), ce = re(() => t.value && E.find((N) => !ia(t.value.data, N))), Ze = re(() => t.value?.data.awards.filter((N) => N.actionId === t.value?.data.last?.id) ?? []), Re = re(() => t.value?.data.awards.filter((N) => N.runId === s.value?.id).reduce((N, I) => N + I.amount, 0) ?? 0), Pe = re(() => {
      if (!Ze.value.length || s.value?.phase !== "reward" || !s.value.battle?.boss) return [];
      const N = t.value.data.bossClears.length;
      return [...E.filter((I) => we[I].unlock === N).map((I) => Se[I].name), ...ma.filter((I) => Ze.value.some((k) => k.key === Ye[I].achievement)).map((I) => De[I].name)];
    });
    Pt(C, () => {
      d.value = null, m.value = null;
    }), Ct(() => d.value || m.value ? (d.value = null, m.value = null, !0) : z.value ? !1 : (f.value = !0, z.value = !0, !0)), Ne(() => e.generationActive, (N) => {
      N && (f.value = !0);
    }), Ne(() => s.value?.phase, (N) => {
      N !== "battle" && (v.value = null);
    }), Ne(l, async (N) => {
      N && (d.value || m.value) && (await Zt(), O.value?.focus({ preventScroll: !0 }));
    });
    function Be(N) {
      h.value = h.value.includes(N) ? h.value.filter((I) => I !== N) : [...h.value, N];
    }
    async function L() {
      await n.act({
        type: "start",
        weapon: c.value,
        outfit: Qe.value,
        oaths: h.value
      }) && (z.value = !1, f.value = !1);
    }
    async function ka(N) {
      await n.act({
        type: "route",
        id: N
      }) && (f.value = !1);
    }
    async function Ue(N, I = null) {
      if (H.value && I === null && !s.value?.relics.some((k) => k.id === N)) {
        m.value = N;
        return;
      }
      await n.act({
        type: "relic",
        id: N,
        replace: I
      }) && (m.value = null);
    }
    async function ca() {
      await n.recover() && (Z.value++, f.value = !0);
    }
    async function Xe() {
      d.value = null, await M.value?.flush(), await n.act({ type: "abandon" }) && (z.value = !0);
    }
    async function Je() {
      await n.read() && Z.value++;
    }
    function ea() {
      z.value = !1, f.value = !1;
    }
    function ve(N) {
      f.value = !0, d.value = N;
    }
    return $a(async () => {
      await n.read(), de = !0;
    }), st(() => {
      de && Je();
    }), rt(() => {
      f.value = !0;
    }), za(n.dispose), (N, I) => (_(), A("section", {
      class: Oe(["exp-app", {
        "exp-is-battle": j.value,
        "exp-is-camp": z.value,
        "exp-is-between": !z.value && !j.value
      }]),
      "data-zone": Q.value
    }, [
      (_(), Le(Xn, {
        key: Z.value,
        ref_key: "field",
        ref: M,
        run: s.value,
        client: r(n),
        paused: V.value,
        camp: z.value,
        "generation-active": a.generationActive,
        weapon: T.value ? s.value.weapon : c.value,
        outfit: T.value ? s.value.outfit : Qe.value,
        sound: p.value,
        onPause: I[0] || (I[0] = (k) => f.value = !0),
        onError: I[1] || (I[1] = (k) => w.value = k),
        onHud: I[2] || (I[2] = (k) => v.value = k)
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
      g("header", Mi, [!z.value && s.value ? (_(), A("div", ki, [
        g("span", null, b(r(y).progress(r(ua)[Q.value], s.value.step % r(R).zoneSteps)), 1),
        g("div", {
          class: "exp-health-track",
          role: "progressbar",
          "aria-label": r(y).hp,
          "aria-valuenow": Math.ceil(J.value),
          "aria-valuemin": 0,
          "aria-valuemax": r(R).maxHp
        }, [g("i", { style: Fe({ width: J.value / r(R).maxHp * 100 + "%" }) }, null, 4), g("b", null, [le(b(Math.ceil(J.value)), 1), g("small", null, " / " + b(r(R).maxHp), 1)])], 8, xi),
        v.value && v.value.player.ward > 0 ? (_(), A("span", bi, b(r(y).wardValue(v.value.player.ward)), 1)) : q("", !0),
        v.value && s.value.weapon === "grimoire" ? (_(), A("label", wi, [g("span", null, [le(b(r(y).contractPower), 1), g("b", null, b(Math.floor(v.value.player.resource)), 1)]), g("meter", {
          class: "exp-resource",
          min: "0",
          max: r(Te).maxPower,
          value: v.value.player.resource,
          "aria-label": r(y).contractPower
        }, null, 8, _i)])) : v.value && ["blade", "staff"].includes(s.value.weapon) ? (_(), A("meter", {
          key: 2,
          class: "exp-resource",
          min: "0",
          max: "100",
          value: v.value.player.resource,
          "aria-label": r(y).resource
        }, null, 8, Zi)) : q("", !0),
        g("small", { "aria-label": r(y).shards + " " + s.value.shards }, [
          W(B, { name: "shrine" }),
          le(b(s.value.shards) + " ", 1),
          r(i) ? (_(), A("span", Ai, " · " + b(r(y).saving), 1)) : q("", !0)
        ], 8, Ci)
      ])) : (_(), A("span", {
        key: 1,
        class: "exp-wallet",
        "aria-label": r(t) ? r(y).wallet(r(t).balance) : r(y).preparing
      }, [W(B, { name: "coin" }), le(b(r(t) ? r(t).balance : r(y).preparing), 1)], 8, Pi)), g("nav", Ei, [
        g("button", {
          type: "button",
          "aria-label": r(y).sound,
          "aria-pressed": p.value,
          onClick: I[3] || (I[3] = (k) => p.value = !p.value)
        }, [W(B, { name: p.value ? "sound" : "mute" }, null, 8, ["name"])], 8, Ii),
        z.value && T.value ? (_(), A("button", {
          key: 0,
          type: "button",
          "aria-label": r(y).wardrobe,
          onClick: I[4] || (I[4] = (k) => ve("wardrobe"))
        }, [W(B, { name: "wardrobe" })], 8, Si)) : q("", !0),
        z.value ? (_(), A("button", {
          key: 1,
          type: "button",
          "aria-label": r(y).help,
          onClick: I[5] || (I[5] = (k) => ve("help"))
        }, [W(B, { name: "help" })], 8, Ti)) : q("", !0),
        z.value ? q("", !0) : (_(), A("button", {
          key: 2,
          type: "button",
          "aria-label": r(y).equipment,
          onClick: I[6] || (I[6] = (k) => ve("bag"))
        }, [W(B, { name: "bag" })], 8, $i)),
        j.value ? (_(), A("button", {
          key: 3,
          type: "button",
          "aria-label": r(y).pause,
          onClick: I[7] || (I[7] = (k) => f.value = !0)
        }, [W(B, { name: "pause" })], 8, zi)) : (_(), A("button", {
          key: 4,
          type: "button",
          "aria-label": r(y).archive,
          onClick: I[8] || (I[8] = (k) => ve("journal"))
        }, [W(B, { name: "journal" })], 8, ji))
      ])]),
      g("div", {
        ref_key: "noticeHost",
        ref: P
      }, null, 512),
      Y.value && !z.value ? (_(), A("div", {
        key: 0,
        class: "exp-boss",
        role: "progressbar",
        "aria-label": r(sa)[Y.value.kind],
        "aria-valuenow": Math.ceil(Y.value.hp),
        "aria-valuemin": 0,
        "aria-valuemax": Math.ceil(Y.value.maxHp)
      }, [g("span", null, [
        W(B, { name: "boss" }),
        le(b(r(sa)[Y.value.kind]), 1),
        g("small", null, b(r(y).bossPhase(Y.value.phase)), 1)
      ]), g("div", null, [g("i", { style: Fe({ width: Y.value.hp / Y.value.maxHp * 100 + "%" }) }, null, 4)])], 8, Ri)) : fe.value && v.value ? (_(), A("div", {
        key: 1,
        class: Oe(["exp-beacon-hud", { "is-critical": v.value.objective.hp <= r(30) }])
      }, [
        g("strong", null, b(v.value.objective.hp <= r(30) ? r(y).beaconDanger : r(ta).siege.name), 1),
        g("div", {
          class: "exp-objective-track",
          role: "progressbar",
          "aria-label": r(y).beaconName,
          "aria-valuenow": Math.ceil(v.value.objective.hp),
          "aria-valuemin": 0,
          "aria-valuemax": 100
        }, [g("i", { style: Fe({ width: v.value.objective.hp + "%" }) }, null, 4), g("b", null, b(Math.ceil(v.value.objective.hp)) + " / 100", 1)], 8, Li),
        g("small", null, b(r(y).beaconRule), 1)
      ], 2)) : v.value && j.value ? (_(), A("span", Oi, [g("strong", null, b(r(ta)[v.value.encounter].name), 1), le(" · " + b(la.value), 1)])) : q("", !0),
      j.value && v.value && v.value.tick < 54 && !V.value ? (_(), A("div", Ni, [
        g("small", null, b(r(y).chapter(oe.value)), 1),
        g("strong", null, b(Y.value ? r(sa)[Y.value.kind] : r(ta)[v.value.encounter].name), 1),
        Y.value ? q("", !0) : (_(), A("p", Hi, b(r(ta)[v.value.encounter].detail), 1))
      ])) : q("", !0),
      z.value && r(t) ? (_(), A("section", qi, [g("div", Qi, [g("span", null, b(r(y).titleFirst), 1), g("span", null, b(r(y).titleSecond), 1)]), T.value ? (_(), A(G, { key: 0 }, [
        g("p", Bi, [le(b(r(ua)[Q.value]), 1), g("span", null, b(r(Se)[s.value.weapon].name), 1)]),
        g("div", Fi, [(_(!0), A(G, null, ge(s.value.relics, (k) => (_(), Le(B, {
          key: k.id,
          name: k.id,
          title: r(xe)[k.id].name + " · " + r(y).rank(k.rank)
        }, null, 8, ["name", "title"]))), 128))]),
        g("button", {
          type: "button",
          class: "exp-primary",
          disabled: r(o) || a.generationActive,
          onClick: ea
        }, [le(b(r(y).resume), 1), W(B, { name: "arrow" })], 8, Di),
        g("button", {
          type: "button",
          class: "exp-quiet",
          onClick: I[9] || (I[9] = (k) => ve("abandon"))
        }, b(r(y).abandon), 1)
      ], 64)) : (_(), A(G, { key: 1 }, [
        g("div", Wi, [
          g("div", {
            class: "exp-weapon-select",
            "aria-label": r(y).weapons
          }, [(_(!0), A(G, null, ge(r(E), (k) => (_(), A("button", {
            key: k,
            type: "button",
            disabled: !r(ia)(r(t).data, k),
            "aria-pressed": c.value === k,
            title: r(ia)(r(t).data, k) ? r(Se)[k].detail : r(y).weaponUnlock(r(we)[k].unlock),
            onClick: (ke) => c.value = k
          }, [
            W(B, { name: k }, null, 8, ["name"]),
            g("span", null, [le(b(r(Se)[k].name), 1), r(ia)(r(t).data, k) ? q("", !0) : (_(), A("small", Ki, b(r(y).lockedTag), 1))]),
            r(ia)(r(t).data, k) ? q("", !0) : (_(), Le(B, {
              key: 0,
              class: "exp-lock",
              name: "lock"
            }))
          ], 8, Gi))), 128))], 8, Ui),
          g("p", Vi, [le(b(r(Se)[c.value].detail), 1), g("span", null, b(r(Wa)(c.value)), 1)]),
          ce.value ? (_(), A("p", Yi, b(r(y).weaponUnlock(r(we)[ce.value].unlock) + " · " + r(Se)[ce.value].name), 1)) : q("", !0)
        ]),
        g("div", Xi, [g("button", {
          type: "button",
          class: "exp-wardrobe-entry",
          onClick: I[10] || (I[10] = (k) => ve("wardrobe"))
        }, [W(B, { name: "wardrobe" }), g("span", null, [le(b(r(y).wardrobe), 1), g("small", null, b(r(De)[Qe.value].name), 1)])]), g("button", {
          type: "button",
          class: "exp-difficulty-entry",
          onClick: I[11] || (I[11] = (k) => ve("oaths"))
        }, [le(b(r(y).oaths), 1), g("small", null, b(h.value.length ? r(y).oathCount(h.value.length) : r(y).normal), 1)])]),
        g("button", {
          type: "button",
          class: "exp-primary",
          disabled: r(o) || a.generationActive,
          onClick: L
        }, [le(b(r(y).start), 1), W(B, { name: "arrow" })], 8, Ji)
      ], 64))])) : s.value && !j.value ? (_(), A("section", {
        key: 5,
        class: Oe(["exp-between", {
          "exp-loot-screen": s.value.phase === "reward" || s.value.phase === "merchant",
          "exp-decision-screen": s.value.phase === "reward" || s.value.phase === "merchant" || r(ha)(s.value)
        }])
      }, [s.value.phase === "route" ? (_(), A(G, { key: 0 }, [
        g("header", es, [
          g("small", null, b(r(y).chapter(oe.value)), 1),
          g("h2", null, b(r(ua)[Q.value]), 1),
          g("p", null, b(r(y).nextGoal(We.value)), 1)
        ]),
        g("ol", {
          class: "exp-map",
          "aria-label": r(y).journey
        }, [(_(!0), A(G, null, ge(r(R).zoneSteps, (k) => (_(), A("li", {
          key: k,
          class: Oe({
            "is-past": k - 1 < s.value.step % r(R).zoneSteps,
            "is-current": k - 1 === s.value.step % r(R).zoneSteps
          })
        }, [k === r(R).zoneSteps ? (_(), Le(B, {
          key: 0,
          name: "boss"
        })) : (_(), A("span", ts, b(k), 1))], 2))), 128))], 8, as),
        g("h3", ns, b(r(y).route), 1),
        g("div", is, [(_(!0), A(G, null, ge(s.value.routes, (k) => (_(), A("button", {
          key: k.id,
          type: "button",
          disabled: r(o) || a.generationActive,
          "data-route": k.kind,
          onClick: (ke) => ka(k.id)
        }, [
          W(B, { name: k.kind }, null, 8, ["name"]),
          g("span", null, [g("strong", null, b(k.kind === "boss" ? We.value : r(da)[k.kind].name), 1), g("small", null, b(["battle", "elite"].includes(k.kind) ? r(ta)[k.encounter].name + " · " + r(da)[k.kind].detail : r(da)[k.kind].detail), 1)]),
          W(B, {
            class: "exp-option-arrow",
            name: "arrow"
          })
        ], 8, ss))), 128))])
      ], 64)) : s.value.phase === "reward" || s.value.phase === "merchant" ? (_(), A(G, { key: 1 }, [g("div", rs, [
        g("header", os, [g("small", null, b(s.value.phase === "merchant" ? r(ua)[Q.value] : s.value.battle?.boss ? r(y).bossDefeated(We.value) : r(y).victory), 1), g("h2", null, b(s.value.phase === "reward" ? r(y).reward : r(y).merchant), 1)]),
        Ze.value.length ? (_(), A("div", ls, [W(B, { name: "coin" }), g("div", null, [g("strong", null, b(r(y).earned(Ze.value.reduce((k, ke) => k + ke.amount, 0))), 1), Pe.value.length ? (_(), A("small", cs, b(r(y).newUnlocks(Pe.value)), 1)) : q("", !0)])])) : q("", !0),
        g("div", us, [(_(!0), A(G, null, ge(s.value.offers, (k) => (_(), A("button", {
          key: k.id,
          type: "button",
          disabled: r(o) || a.generationActive || s.value.phase === "merchant" && s.value.shards < r(Ka)(k),
          "data-relic": k.id,
          style: Fe({ "--relic": r(Pa)[k.id] }),
          onClick: (ke) => Ue(k.id)
        }, [g("div", fs, [W(B, { name: k.id }, null, 8, ["name"]), g("b", null, b(r(y).rank(k.rank)), 1)]), g("span", null, [
          g("small", ps, b(s.value.relics.some((ke) => ke.id === k.id) ? r(y).upgrade(k.rank) : r(xe)[k.id].family + " · " + r(y).newRelic), 1),
          g("strong", null, b(r(xe)[k.id].name), 1),
          g("small", null, b(r(xe)[k.id].detail), 1),
          s.value.phase === "merchant" ? (_(), A("b", hs, b(r(y).buy(r(Ka)(k))), 1)) : q("", !0)
        ])], 12, ds))), 128))]),
        s.value.offers.length ? q("", !0) : (_(), A("p", ms, b(r(y).noOffers), 1)),
        g("p", vs, b(r(y).upgradeHint), 1),
        s.value.phase === "merchant" ? (_(), A("button", {
          key: 2,
          type: "button",
          class: "exp-supply",
          disabled: r(o) || a.generationActive || s.value.shards < r(R).supplyCost || s.value.hp >= r(R).maxHp,
          onClick: I[12] || (I[12] = (k) => r(n).act({ type: "supply" }))
        }, [W(B, { name: "heart" }), g("span", null, [le(b(r(y).supply) + " · " + b(r(y).buy(r(R).supplyCost)), 1), g("small", null, b(r(y).supplyDetail(r(R).supplyHeal * (s.value.oaths.includes("scarcity") ? 0.5 : 1))), 1)])], 8, gs)) : q("", !0)
      ]), g("button", {
        type: "button",
        class: "exp-quiet",
        disabled: r(o) || a.generationActive,
        onClick: I[13] || (I[13] = (k) => r(n).act({ type: "leave" }))
      }, b(s.value.phase === "reward" ? r(y).discard : r(y).leave), 9, ys)], 64)) : s.value.phase === "camp" || s.value.phase === "shrine" ? (_(), A(G, { key: 2 }, [
        W(B, {
          class: "exp-landmark",
          name: s.value.phase
        }, null, 8, ["name"]),
        g("header", Ms, [g("h2", null, b(r(da)[s.value.phase].name), 1), g("p", null, b(s.value.phase === "camp" ? r(y).restDetail(r(Mn)(s.value)) : r(y).sacrifice), 1)]),
        s.value.phase === "camp" ? (_(), A("button", {
          key: 0,
          type: "button",
          class: "exp-primary",
          disabled: r(o) || a.generationActive,
          onClick: I[14] || (I[14] = (k) => r(n).act({ type: "rest" }))
        }, [le(b(r(y).rest), 1), W(B, { name: "heart" })], 8, ks)) : (_(), A(G, { key: 1 }, [g("button", {
          type: "button",
          class: "exp-primary",
          disabled: r(o) || a.generationActive || J.value <= r(R).sacrificeHp,
          onClick: I[15] || (I[15] = (k) => r(n).act({ type: "sacrifice" }))
        }, [le(b(J.value <= r(R).sacrificeHp ? r(y).healthCost : r(y).shrine), 1), W(B, { name: "shrine" })], 8, xs), g("button", {
          type: "button",
          class: "exp-quiet",
          disabled: r(o) || a.generationActive,
          onClick: I[16] || (I[16] = (k) => r(n).act({ type: "leave" }))
        }, b(r(y).leave), 9, bs)], 64))
      ], 64)) : r(ha)(s.value) ? (_(), A(G, { key: 3 }, [g("div", ws, [
        W(B, {
          class: "exp-landmark",
          name: s.value.phase === "won" ? "crown" : "renewal"
        }, null, 8, ["name"]),
        g("header", _s, [
          g("small", null, b(r(Se)[s.value.weapon].name), 1),
          g("h2", null, b(s.value.phase === "won" ? r(y).won : he.value ? r(y).defeat[he.value] : s.value.phase === "lost" ? r(y).lost : r(y).abandoned), 1),
          he.value ? (_(), A("p", Zs, b(r(y).defeatDetail[he.value]), 1)) : q("", !0)
        ]),
        g("p", Cs, b(r(y).stats(s.value.kills, s.value.ticks)), 1),
        g("div", As, [W(B, { name: "coin" }), g("strong", null, b(r(y).gold(Re.value)), 1)]),
        g("div", Ps, [(_(!0), A(G, null, ge(s.value.relics, (k) => (_(), Le(B, {
          key: k.id,
          name: k.id,
          title: r(xe)[k.id].name + " · " + r(y).rank(k.rank)
        }, null, 8, ["name", "title"]))), 128))]),
        g("p", Es, b(r(y).resultDetail), 1)
      ]), g("button", {
        type: "button",
        class: "exp-primary",
        onClick: I[17] || (I[17] = (k) => z.value = !0)
      }, [le(b(r(y).return), 1), W(B, { name: "arrow" })])], 64)) : q("", !0)], 2)) : q("", !0),
      j.value && V.value && !d.value && !r(l) && !w.value ? (_(), A("div", Is, [g("section", Ss, [
        W(B, {
          class: "exp-pause-emblem",
          name: "pause"
        }),
        g("h2", null, b(r(y).paused), 1),
        g("p", Ts, b(r(y).controls), 1),
        g("p", null, b(r(Wa)(s.value.weapon)), 1),
        g("button", {
          type: "button",
          class: "exp-primary",
          disabled: r(o) || a.generationActive,
          onClick: I[18] || (I[18] = (k) => f.value = !1)
        }, [le(b(r(y).continue), 1), W(B, { name: "arrow" })], 8, $s),
        g("button", {
          type: "button",
          class: "exp-quiet",
          onClick: I[19] || (I[19] = (k) => z.value = !0)
        }, b(r(y).return), 1)
      ])])) : q("", !0),
      j.value && !V.value ? (_(), A("div", zs, [le(b(r(y).moveKeys), 1), g("span", null, b(r(y).autoAttack), 1)])) : q("", !0),
      j.value && s.value.relics.length ? (_(), A("div", {
        key: 8,
        class: "exp-equipped-strip",
        "aria-label": r(y).equipped
      }, [(_(!0), A(G, null, ge(s.value.relics, (k) => (_(), Le(B, {
        key: k.id,
        name: k.id,
        title: r(xe)[k.id].name + " · " + r(y).rank(k.rank)
      }, null, 8, ["name", "title"]))), 128))], 8, js)) : q("", !0),
      d.value || m.value ? (_(), A("div", {
        key: 9,
        class: "exp-modal-wrap",
        onClick: I[25] || (I[25] = Ke((k) => {
          d.value = null, m.value = null;
        }, ["self"]))
      }, [g("section", {
        ref_key: "dialog",
        ref: C,
        class: Oe(["exp-modal exp-panel", { "exp-wardrobe-modal": d.value === "wardrobe" }]),
        role: "dialog",
        "aria-modal": "true",
        tabindex: "-1",
        "aria-label": m.value ? r(y).replace : d.value === "wardrobe" ? r(y).wardrobe : d.value === "oaths" ? r(y).oaths : d.value === "journal" ? r(y).archive : d.value === "bag" ? r(y).equipment : d.value === "help" ? r(y).help : r(y).abandon
      }, [
        g("header", null, [g("h2", null, b(m.value ? r(y).replace : d.value === "wardrobe" ? r(y).wardrobe : d.value === "oaths" ? r(y).oaths : d.value === "journal" ? r(y).archive : d.value === "bag" ? r(y).equipment : d.value === "help" ? r(y).help : r(y).abandon), 1), g("button", {
          type: "button",
          "aria-label": r(y).close,
          onClick: I[20] || (I[20] = (k) => {
            d.value = null, m.value = null;
          })
        }, [W(B, { name: "close" })], 8, Ls)]),
        g("div", {
          ref_key: "dialogNoticeHost",
          ref: S,
          class: "exp-dialog-notice-host"
        }, null, 512),
        d.value === "wardrobe" && r(t) ? (_(), Le(gi, {
          key: 0,
          data: r(t).data,
          balance: r(t).balance,
          blocked: r(o) || a.generationActive,
          weapon: T.value ? s.value.weapon : c.value,
          onCommand: I[21] || (I[21] = (k) => r(n).act(k))
        }, null, 8, [
          "data",
          "balance",
          "blocked",
          "weapon"
        ])) : d.value === "oaths" && r(t) ? (_(), A("div", Os, [r(t).data.victories ? q("", !0) : (_(), A("p", Ns, b(r(y).oathsLocked), 1)), (_(!0), A(G, null, ge(r(va), (k) => (_(), A("label", { key: k }, [
          g("input", {
            type: "checkbox",
            checked: h.value.includes(k),
            disabled: !r(t).data.victories,
            onChange: (ke) => Be(k)
          }, null, 40, Hs),
          g("span", null, [le(b(r(Ua)[k].name), 1), g("small", null, b(r(Ua)[k].detail), 1)]),
          r(t).data.oathWins.includes(k) ? (_(), A("b", qs, "✓")) : q("", !0)
        ]))), 128))])) : m.value ? (_(), A(G, { key: 2 }, [g("p", null, b(r(xe)[m.value].name), 1), g("div", Qs, [(_(!0), A(G, null, ge(s.value.relics, (k) => (_(), A("button", {
          key: k.id,
          type: "button",
          disabled: r(o) || r(Za)(s.value, m.value, k.id),
          title: r(Za)(s.value, m.value, k.id) ? r(y).requiredRelic : void 0,
          style: Fe({ "--relic": r(Pa)[k.id] }),
          onClick: (ke) => Ue(m.value, k.id)
        }, [W(B, { name: k.id }, null, 8, ["name"]), g("span", null, [g("strong", null, b(r(xe)[k.id].name) + " · " + b(r(y).rank(k.rank)), 1), g("small", null, b(r(Za)(s.value, m.value, k.id) ? r(y).requiredRelic : r(xe)[k.id].detail), 1)])], 12, Bs))), 128))])], 64)) : d.value === "bag" ? (_(), A(G, { key: 3 }, [
          g("p", Fs, b(r(y).slots(s.value?.relics.length ?? 0)), 1),
          s.value?.relics.length ? q("", !0) : (_(), A("p", Ds, b(r(y).noRelics), 1)),
          g("ul", Ws, [(_(!0), A(G, null, ge(s.value?.relics, (k) => (_(), A("li", {
            key: k.id,
            style: Fe({ "--relic": r(Pa)[k.id] })
          }, [W(B, { name: k.id }, null, 8, ["name"]), g("span", null, [g("strong", null, b(r(xe)[k.id].name) + " · " + b(r(y).rank(k.rank)), 1), g("small", null, b(r(xe)[k.id].detail), 1)])], 4))), 128))])
        ], 64)) : d.value === "help" ? (_(), A(G, { key: 4 }, [
          g("p", null, b(r(y).controls), 1),
          g("p", null, b(r(y).autoAttack), 1),
          g("p", null, b(r(y).lootPool), 1),
          g("p", null, b(r(y).checkpoint), 1),
          g("p", null, b(r(y).rewardRule), 1)
        ], 64)) : d.value === "abandon" ? (_(), A(G, { key: 5 }, [g("p", null, b(r(y).abandonBody), 1), g("button", {
          type: "button",
          class: "exp-primary",
          disabled: r(o) || a.generationActive,
          onClick: Xe
        }, b(r(y).confirm), 9, Us)], 64)) : d.value === "journal" && r(t) ? (_(), A(G, { key: 6 }, [g("nav", Gs, [
          g("button", {
            type: "button",
            "aria-pressed": U.value === "records",
            onClick: I[22] || (I[22] = (k) => U.value = "records")
          }, b(r(y).history), 9, Ks),
          g("button", {
            type: "button",
            "aria-pressed": U.value === "relics",
            onClick: I[23] || (I[23] = (k) => U.value = "relics")
          }, b(r(y).discoveries), 9, Vs),
          g("button", {
            type: "button",
            "aria-pressed": U.value === "awards",
            onClick: I[24] || (I[24] = (k) => U.value = "awards")
          }, b(r(y).awardHistory), 9, Ys)
        ]), U.value === "relics" ? (_(), A(G, { key: 0 }, [g("h3", null, b(r(y).discoveries) + " " + b(r(t).data.discoveries.length) + " / " + b(r(Ia).length), 1), g("ul", Xs, [(_(!0), A(G, null, ge(r(Ia), (k) => (_(), A("li", {
          key: k,
          class: Oe({ "is-unknown": !r(t).data.discoveries.includes(k) })
        }, [
          W(B, { name: r(t).data.discoveries.includes(k) ? k : "lock" }, null, 8, ["name"]),
          g("strong", null, b(r(t).data.discoveries.includes(k) ? r(xe)[k].name : r(y).unknown), 1),
          r(t).data.discoveries.includes(k) ? (_(), A("small", Js, b(r(xe)[k].detail), 1)) : q("", !0)
        ], 2))), 128))])], 64)) : U.value === "awards" ? (_(), A(G, { key: 1 }, [
          g("p", null, b(r(y).totalEarned(r(t).data.awards.reduce((k, ke) => k + ke.amount, 0))), 1),
          g("p", er, b(r(y).rewardRule), 1),
          r(t).data.awards.length ? q("", !0) : (_(), A("p", ar, b(r(y).noAwards), 1)),
          g("ul", tr, [(_(!0), A(G, null, ge([...r(t).data.awards].reverse(), (k) => (_(), A("li", { key: k.key }, [
            g("strong", null, b(r(Gt)(k.key)), 1),
            g("b", null, "+" + b(k.amount), 1),
            g("details", null, [g("summary", null, b(r(y).receipt), 1), g("code", null, b(k.actionId), 1)])
          ]))), 128))])
        ], 64)) : (_(), A(G, { key: 2 }, [r(t).data.records.length ? q("", !0) : (_(), A("p", nr, b(r(y).journalEmpty), 1)), g("ul", ir, [(_(!0), A(G, null, ge(r(t).data.records, (k) => (_(), A("li", { key: k.id }, [g("strong", null, b(r(Se)[k.weapon].name) + " · " + b(k.outcome === "won" ? r(y).mastered : r(y).reached(Math.floor(k.step / r(R).zoneSteps))), 1), g("small", null, b(r(y).stats(k.kills, k.ticks)), 1)]))), 128))])], 64))], 64)) : q("", !0)
      ], 10, Rs)])) : q("", !0),
      P.value ? (_(), Le(It, {
        key: 10,
        to: S.value ?? P.value
      }, [r(l) || w.value || a.generationActive ? (_(), A("aside", {
        key: 0,
        ref_key: "noticePanel",
        ref: O,
        class: "exp-notice",
        role: "alert",
        tabindex: "-1"
      }, [
        g("p", null, b(w.value ? r(y).presentationError[w.value] : r(l) || r(y).story), 1),
        r(l) || r(u) ? (_(), A("button", {
          key: 0,
          type: "button",
          disabled: r(i) || a.generationActive,
          onClick: ca
        }, b(r(y).retry), 9, sr)) : q("", !0),
        r(t)?.writeState === "conflict" || !r(t) ? (_(), A("button", {
          key: 1,
          type: "button",
          disabled: r(i),
          onClick: Je
        }, b(r(y).refresh), 9, rr)) : q("", !0),
        w.value === "sound" ? (_(), A("button", {
          key: 2,
          type: "button",
          onClick: I[26] || (I[26] = (k) => {
            p.value = !1, w.value = null;
          })
        }, b(r(y).close), 1)) : q("", !0)
      ], 512)) : q("", !0)], 8, ["to"])) : q("", !0)
    ], 10, yi));
  }
}), pr = or;
export {
  pr as default
};
