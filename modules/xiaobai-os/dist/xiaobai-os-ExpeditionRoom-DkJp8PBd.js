/* eslint-disable */
import { B as Ea, C as j, D as se, F as Sa, G as de, I as Ia, O as N, Q as Ne, R as Pa, S as Ce, U as w, _ as F, at as X, b as le, dt as Ae, ft as k, g as Be, k as la, lt as l, o as Za, ot as ha, s as Ra, ut as ze, w as C, x as f } from "./xiaobai-os-frame-bridge-CrPFvkI3.js";
import { C as La, Et as Ba, Mt as va, Pt as Xe, Q as Ha, S as Ge, St as Na, X as ma, Y as He, a as Oa, at as ja, bt as qa, c as Wa, f as Fa, g as ya, m as Ga, t as Ka, u as Da, v as Qa, vt as ga, w as Va, x as Ua, xt as Ma, yt as Ya } from "./xiaobai-os-three.module-Bh6B3L2B.js";
import { n as Xa, o as Ja } from "./xiaobai-os-performance-C5Lr0_LZ.js";
import { t as et } from "./xiaobai-os-BufferGeometryUtils-BKRv0Kh0.js";
import { _ as ne, a as ye, c as Pe, d as J, f as De, g as pe, h as z, i as ka, l as at, m as re, n as g, o as Je, p as ta, r as Te, s as ge, t as xa, u as Oe } from "./xiaobai-os-copy-CQ9firSJ.js";
function na(e) {
  return e.seed = Math.imul(e.seed, 1664525) + 1013904223 >>> 0, e.seed / 4294967296;
}
function tt() {
  return Array.from(crypto.getRandomValues(new Uint32Array(4)), (e) => e.toString(16).padStart(8, "0")).join("");
}
function we(e) {
  throw Object.assign(/* @__PURE__ */ new Error(`expedition_${e}`), { code: `expedition_${e}` });
}
var sa = Math.PI * 2, W = (e, n) => Math.hypot(e.x - n.x, e.y - n.y), fe = (e, n) => Math.atan2(n.y - e.y, n.x - e.x), V = (e, n) => e.relics.includes(n), ba = (e) => (e - 1) * Math.PI / 4 - Math.PI / 2;
function Ee(e, n, a, s, t) {
  n.x = Math.max(-z.arena + t, Math.min(z.arena - t, n.x + Math.cos(a) * s)), n.y = Math.max(-z.arena + t, Math.min(z.arena - t, n.y + Math.sin(a) * s));
  for (const c of e.obstacles) {
    const h = W(n, c), u = t + c.radius;
    if (h < u) {
      const i = h < 1e-3 ? 0 : fe(c, n);
      n.x = c.x + Math.cos(i) * u, n.y = c.y + Math.sin(i) * u;
    }
  }
}
function he(e, n, a, s = 1, t = 0) {
  e.effects.push({
    id: ++e.serial,
    x: n.x,
    y: n.y,
    kind: a,
    size: s,
    angle: t,
    life: a === "slash" ? 9 : 15
  });
}
function je(e, n, a) {
  const s = J[n].hp * (ne(n) ? 1 : 1 + e.zone * 0.22 + (e.elite ? 0.35 : 0));
  e.enemies.push({
    id: ++e.serial,
    kind: n,
    x: a.x,
    y: a.y,
    hp: s,
    maxHp: s,
    angle: Math.PI / 2,
    cooldown: 25 + Math.floor(na(e) * 35),
    windup: 0,
    target: { ...a },
    pattern: 0,
    phase: 1,
    chill: 0,
    burn: 0,
    marked: 0
  });
}
function nt(e, n) {
  if (e.wave++, e.boss) {
    je(e, Oe[e.zone], {
      x: 0,
      y: -5
    });
    return;
  }
  const a = [
    "soldier",
    "archer",
    "guard",
    ...e.zone > 0 ? ["priest", "charger"] : ["charger"]
  ], s = 3 + e.zone + (e.elite ? 2 : 0) + (n.oaths.includes("legion") ? 2 : 0);
  for (let t = 0; t < s; t++) {
    const c = sa * t / s + na(e) * 0.5;
    je(e, a[Math.floor(na(e) * a.length)], {
      x: Math.cos(c) * 8.4,
      y: Math.sin(c) * 8.4
    });
  }
}
function st(e, n) {
  e.player.hp <= 0 || (e.player.hp = Math.min(z.maxHp, e.player.hp + n), he(e, e.player, "heal"));
}
function ke(e, n, a, s, t, c = e.player) {
  if (n.hp <= 0) return;
  let h = a * (V(s, "blood-price") ? re.bloodDamage : 1);
  if (V(s, "execution") && n.hp / n.maxHp < re.executeThreshold && (h *= re.executeDamage), n.kind === "guard" && t === "attack" && Math.cos(fe(n, c) - n.angle) > 0.4 && (h *= 0.25), n.kind !== "priest" && !ne(n.kind) && e.enemies.some((u) => u.kind === "priest" && u.hp > 0 && W(n, u) < 4) && (h *= 0.6), t === "skill" && n.chill > 0 && V(s, "shatter")) {
    h += 22, n.chill = 0, he(e, n, "burst", 2.2);
    for (const u of e.enemies) u.id !== n.id && W(n, u) < 2.2 && ke(e, u, 12, s, "passive", n);
  }
  n.hp = Math.max(0, n.hp - h), n.marked = 5, (t === "attack" || t === "skill") && (V(s, "cinder") && (n.burn = 120), V(s, "frost") && (n.chill = 90)), t === "lightning" && V(s, "momentum") && (e.player.dash = Math.max(0, e.player.dash - 6)), !(n.hp > 0) && (e.kills++, he(e, n, "burst", ne(n.kind) ? 3 : 0.8), V(s, "wildfire") && n.burn > 0 && e.hazards.push({
    id: ++e.serial,
    x: n.x,
    y: n.y,
    radius: 2,
    wait: 0,
    life: 90,
    damage: 4,
    friendly: !0,
    kind: "fire"
  }), V(s, "siphon") && (e.kills % re.siphonEvery === 0 || ne(n.kind)) && st(e, ne(n.kind) ? re.siphonBossHeal : re.siphonHeal));
}
function ia(e, n, a, s) {
  const t = [n];
  V(a, "conductor") && t.push(...e.enemies.filter((c) => c.id !== n.id && c.hp > 0 && W(c, n) < 4).sort((c, h) => W(c, n) - W(h, n)).slice(0, 2));
  for (const c of t)
    he(e, c, "lightning", 1), ke(e, c, s, a, "lightning");
}
function Qe(e, n, a) {
  if (e.player.invulnerable > 0 || e.player.hp <= 0) return;
  const s = e.player.shield > 0 ? 0 : n * (V(a, "blood-price") ? re.bloodHurt : 1);
  if (e.player.hp = Math.max(0, e.player.hp - s), e.damageTaken += s, e.player.invulnerable = 20, he(e, e.player, "hit", 1), V(a, "thorns"))
    for (const t of e.enemies) W(t, e.player) < 3 && (ke(e, t, 18, a, "passive"), ne(t.kind) || Ee(e, t, fe(e.player, t), 1.1, J[t.kind].radius));
}
function $e(e, n, a, s, t, c = 0, h = 0.19, u = "attack") {
  e.shots.push({
    id: ++e.serial,
    x: n.x,
    y: n.y,
    angle: a,
    speed: h,
    damage: s,
    friendly: t,
    source: u,
    pierce: c,
    hits: [],
    life: 150
  });
}
function Re(e, n, a, s, t) {
  e.hazards.push({
    id: ++e.serial,
    x: n.x,
    y: n.y,
    radius: a,
    wait: s,
    life: 12,
    damage: t,
    friendly: !1,
    kind: "slam"
  });
}
function wa(e, n, a, s = !1) {
  const t = pe[n.weapon], c = e.player, h = fe(c, a);
  if (c.facing = h, c.swing = 9, n.weapon === "blade") {
    const u = t.range + (V(n, "piercing") ? 0.7 : 0);
    he(e, c, "slash", u, h);
    for (const i of e.enemies) W(c, i) <= u + J[i.kind].radius && Math.cos(fe(c, i) - h) > -0.1 && ke(e, i, t.damage * (s ? 0.65 : 1), n, "attack");
  } else $e(e, c, h + (s ? 0.12 : 0), t.damage * (s ? 0.65 : 1), !0, V(n, "piercing") ? re.extraPierce : 0, n.weapon === "bow" ? 0.36 : 0.25);
}
function it(e, n) {
  const a = e.player, s = pe[n.weapon];
  if (a.skill = Math.round(z.skillCooldown * (V(n, "focus") ? re.focusSkill : 1)), (V(n, "aegis") || n.weapon === "blade") && (a.shield = 32), n.weapon === "blade") {
    he(e, a, "slash", 3.5, a.facing);
    for (const t of e.enemies) W(a, t) < 3.5 + J[t.kind].radius && (ke(e, t, s.skill, n, "skill"), ne(t.kind) || (Ee(e, t, fe(a, t), 1.7, J[t.kind].radius), t.windup = 0, t.cooldown = 35));
  } else if (n.weapon === "bow") for (let t = -2; t <= 2; t++) $e(e, a, a.facing + t * 0.15, s.skill, !0, 8, 0.4, "skill");
  else {
    const t = e.enemies.filter((c) => c.hp > 0).sort((c, h) => W(a, c) - W(a, h))[0] ?? a;
    for (let c = 0; c < 3; c++) e.hazards.push({
      id: ++e.serial,
      x: t.x + (c - 1) * 1.1,
      y: t.y,
      radius: 2.4,
      wait: 10 + c * 8,
      life: 1,
      damage: s.skill,
      friendly: !0,
      kind: "slam"
    });
  }
}
function lt(e, n, a) {
  const s = J[n.kind], t = n.pattern++ % 3;
  if (t === 0)
    Re(e, n.target, n.kind === "warden" ? 3 : 2.2, 20, s.damage), n.phase > 1 && (Re(e, {
      x: n.target.x + 3,
      y: n.target.y
    }, 2.5, 35, s.damage), Re(e, {
      x: n.target.x - 3,
      y: n.target.y
    }, 2.5, 35, s.damage));
  else if (t === 1) {
    const h = (n.kind === "weaver" ? 14 : 10) + n.phase * 2;
    for (let u = 0; u < h; u++) $e(e, n, u * sa / h + e.tick * 8e-3, s.damage * 0.7, !1, 0, 0.12 + n.phase * 0.016);
  } else if (n.kind === "warden") {
    const h = fe(n, n.target);
    for (let u = 1; u <= 5; u++) Re(e, {
      x: n.x + Math.cos(h) * u * 1.8,
      y: n.y + Math.sin(h) * u * 1.8
    }, 1.5, 8 + u * 6, s.damage);
  } else {
    for (let h = 0; h < 5 + n.phase; h++) {
      const u = h * sa / (5 + n.phase);
      Re(e, {
        x: Math.cos(u) * 5,
        y: Math.sin(u) * 5
      }, 2.3, 28 + h * 3, s.damage);
    }
    $e(e, n, fe(n, e.player), s.damage, !1, 0, 0.22);
  }
  const c = n.hp / n.maxHp < 0.32 && n.kind === "king" ? 3 : n.hp / n.maxHp < 0.6 ? 2 : 1;
  c > n.phase && (n.phase = c, he(e, n, "burst", 5), n.cooldown = 55, (n.kind !== "warden" || a.oaths.includes("legion")) && (je(e, "guard", {
    x: -6,
    y: -5
  }), je(e, n.kind === "king" ? "priest" : "archer", {
    x: 6,
    y: -5
  })), a.oaths.includes("legion") && je(e, "charger", {
    x: 0,
    y: -8
  }));
}
function rt(e, n) {
  for (const a of [...e.enemies]) {
    if (a.hp <= 0 || (a.marked = Math.max(0, a.marked - 1), a.chill = Math.max(0, a.chill - 1), a.burn > 0 && (a.burn--, e.tick % 15 === 0 && ke(e, a, 3, n, "passive")), a.hp <= 0)) continue;
    const s = J[a.kind], t = W(a, e.player), c = n.oaths.includes("haste");
    if (a.windup > 0) {
      if (a.windup--, a.windup > 0) continue;
      if (ne(a.kind)) lt(e, a, n);
      else if (a.kind === "archer") $e(e, a, a.angle, s.damage, !1);
      else if (a.kind === "priest") for (let u = -1; u <= 1; u++) $e(e, a, a.angle + u * 0.2, s.damage, !1, 0, 0.13);
      else a.kind === "charger" ? a.cooldown = -18 : W(a.target, e.player) < s.reach + 0.4 && t < s.reach + 0.8 && (Qe(e, s.damage, n), he(e, a.target, "slash", s.reach, a.angle));
      a.cooldown >= 0 && (a.cooldown = Math.round(s.cooldown * (c ? 0.8 : 1) / (ne(a.kind) ? 1 + (a.phase - 1) * 0.12 : 1)));
      continue;
    }
    if (a.cooldown < 0) {
      Ee(e, a, a.angle, 0.29, s.radius), W(a, e.player) < s.radius + 0.4 && Qe(e, s.damage, n), a.cooldown++, a.cooldown || (a.cooldown = s.cooldown);
      continue;
    }
    if (a.cooldown = Math.max(0, a.cooldown - 1), a.angle = fe(a, e.player), !a.cooldown && t < s.reach) {
      a.target = {
        x: e.player.x,
        y: e.player.y
      }, a.windup = Math.round(s.windup * (c ? 0.75 : 1));
      continue;
    }
    const h = a.kind === "archer" || a.kind === "priest";
    (t > (h ? 5 : ne(a.kind) ? 3 : 0.95) || h && t < 3) && Ee(e, a, a.angle + (h && t < 3 ? Math.PI : 0), s.speed * (a.chill ? ne(a.kind) ? 0.8 : 0.5 : 1), s.radius);
    for (const u of e.enemies) {
      if (u.id === a.id || u.hp <= 0) continue;
      const i = s.radius + J[u.kind].radius;
      W(a, u) < i && Ee(e, a, fe(u, a), 0.024, s.radius);
    }
  }
}
function ot(e, n) {
  for (const a of e.shots) {
    if (a.x += Math.cos(a.angle) * a.speed, a.y += Math.sin(a.angle) * a.speed, a.life--, Math.abs(a.x) > z.arena || Math.abs(a.y) > z.arena || e.obstacles.some((s) => W(s, a) < s.radius)) {
      a.life = 0;
      continue;
    }
    if (!a.friendly) {
      W(a, e.player) < 0.6 && (e.player.shield > 0 ? (a.friendly = !0, a.source = "skill", a.angle += Math.PI, a.damage *= 2, a.hits = [], he(e, e.player, "lightning")) : (Qe(e, a.damage, n), a.life = 0));
      continue;
    }
    for (const s of e.enemies) {
      if (s.hp <= 0 || a.hits.includes(s.id) || W(s, a) > J[s.kind].radius + 0.2) continue;
      a.hits.push(s.id);
      const t = a.damage * (V(n, "hunter") && W(s, e.player) > re.hunterRange ? re.hunterDamage : 1);
      if (ke(e, s, t, n, a.source, a), n.weapon === "staff") {
        he(e, s, "burst", 1.5);
        for (const c of e.enemies) c.id !== s.id && W(c, s) < 1.6 && ke(e, c, t * 0.5, n, "attack", s);
      }
      if (a.pierce-- <= 0) {
        a.life = 0;
        break;
      }
    }
  }
  for (const a of [...e.hazards]) {
    if (a.wait > 0) {
      a.wait--;
      continue;
    }
    if (a.life--, !a.friendly) {
      W(a, e.player) < a.radius + 0.25 && Qe(e, a.damage, n);
      continue;
    }
    if (a.kind !== "slam" && e.tick % 15 !== 0) continue;
    const s = e.enemies.filter((t) => t.hp > 0 && W(t, a) < a.radius + J[t.kind].radius);
    for (const t of s) a.kind === "storm" ? ia(e, t, n, a.damage) : (a.kind === "fire" && (t.burn = Math.max(t.burn, 45)), ke(e, t, a.damage, n, a.kind === "slam" ? "skill" : "passive", a));
  }
  e.shots = e.shots.filter((a) => a.life > 0), e.hazards = e.hazards.filter((a) => a.life > 0);
}
function ct(e, n, a) {
  if (e.status !== "fighting") return;
  e.tick++;
  const s = e.player;
  for (const c of [
    "attack",
    "dash",
    "skill",
    "invulnerable",
    "swing",
    "shield"
  ]) s[c] = Math.max(0, s[c] - 1);
  if (e.effects = e.effects.filter((c) => --c.life > 0).slice(-80), n.dash && !s.dash && !s.dashTime && (s.dash = z.dashCooldown, s.dashTime = z.dashTicks, s.dashAngle = n.move ? ba(n.move) : s.facing, s.invulnerable = z.dashTicks + 2, V(a, "storm-step") && e.hazards.push({
    id: ++e.serial,
    x: s.x,
    y: s.y,
    radius: 1.7,
    wait: 0,
    life: 70,
    damage: 9,
    friendly: !0,
    kind: "storm"
  })), s.dashTime > 0) {
    if (Ee(e, s, s.dashAngle, z.speed * 3.6, z.playerRadius), s.dashTime--, !s.dashTime && V(a, "momentum")) {
      const c = e.enemies.find((h) => h.hp > 0 && W(s, h) < 2.5);
      c && ia(e, c, a, 14);
    }
  } else n.move && (s.facing = ba(n.move), Ee(e, s, s.facing, z.speed, z.playerRadius));
  const t = e.enemies.filter((c) => c.hp > 0).sort((c, h) => W(s, c) - W(s, h))[0];
  n.skill && !s.skill && (t && (s.facing = fe(s, t)), it(e, a)), t && !s.attack && W(s, t) <= pe[a.weapon].range + J[t.kind].radius + (a.weapon === "blade" && V(a, "piercing") ? 0.7 : 0) && (wa(e, a, t), s.combo++, V(a, "echo") && s.combo % re.echoEvery === 0 && wa(e, a, t, !0), s.attack = Math.round(pe[a.weapon].period * (V(a, "focus") ? re.focusAttack : 1))), V(a, "orbit") && e.tick % re.orbitTicks === 0 && t && W(s, t) < 4 && ia(e, t, a, 14), rt(e, a), ot(e, a), e.enemies = e.enemies.filter((c) => c.hp > 0), s.hp <= 0 ? (e.status = "lost", s.hp = 0) : e.enemies.length || (e.wave >= e.waves ? (e.status = "won", e.shots = [], e.hazards = []) : ++e.nextWave >= 45 && (e.nextWave = 0, nt(e, a)));
}
function ut(e, n) {
  const a = e.at(-1);
  a && a.move === n.move && a.dash === n.dash && a.skill === n.skill ? a.ticks++ : e.push({
    ...n,
    ticks: 1
  });
}
function dt(e) {
  const n = new Set(e.awards.map((a) => a.key));
  return {
    bossClears: Oe.flatMap((a, s) => n.has(`boss-${s}`) ? [s] : []),
    mastered: Object.keys(pe).filter((a) => n.has(`mastery-${a}`)),
    oathWins: De.filter((a) => n.has(`oath-${a}`))
  };
}
var ea = (e) => [
  "won",
  "lost",
  "abandoned"
].includes(e.phase), pt = (e) => Math.floor(e.step / z.zoneSteps);
function Le(e, n) {
  return pe[n].unlock < 0 || dt(e).bossClears.includes(pe[n].unlock);
}
function ft(e) {
  return Math.floor(z.restHeal * (e.oaths.includes("scarcity") ? 0.5 : 1));
}
function _a(e) {
  return (!e || typeof e != "object" || Array.isArray(e)) && we("invalid"), e;
}
function Fe(e, n = 0, a = Number.MAX_SAFE_INTEGER) {
  return (!Number.isSafeInteger(e) || Number(e) < n || Number(e) > a) && we("invalid"), e;
}
function ra(e, n) {
  return (typeof e != "string" || !n.includes(e)) && we("invalid"), e;
}
function Ta(e, n, a) {
  return (!Array.isArray(e) || e.length > n) && we("invalid"), e.map(a);
}
function ht(e) {
  return new Set(e).size !== e.length && we("invalid"), e;
}
var vt = (e) => ra(e, Object.keys(pe)), Ca = (e) => ra(e, ta), mt = (e) => ht(Ta(e, De.length, (n) => ra(n, De)));
function yt(e) {
  const n = _a(e);
  switch (n.type) {
    case "start":
      return {
        type: "start",
        weapon: vt(n.weapon),
        cloak: Fe(n.cloak, 0, 3),
        oaths: mt(n.oaths)
      };
    case "route":
      return {
        type: "route",
        id: Fe(n.id, 0, 2)
      };
    case "input": {
      const a = Ta(n.spans, z.maxInputTicks, (s) => {
        const t = _a(s);
        return (typeof t.dash != "boolean" || typeof t.skill != "boolean") && we("invalid"), {
          move: Fe(t.move, 0, 8),
          dash: t.dash,
          skill: t.skill,
          ticks: Fe(t.ticks, 1, z.maxInputTicks)
        };
      });
      return (!a.length || a.reduce((s, t) => s + t.ticks, 0) > z.maxInputTicks) && we("invalid"), {
        type: "input",
        spans: a
      };
    }
    case "relic":
      return {
        type: "relic",
        id: Ca(n.id),
        replace: n.replace === null ? null : Ca(n.replace)
      };
    case "leave":
    case "rest":
    case "sacrifice":
    case "abandon":
      return { type: n.type };
    default:
      return we("invalid");
  }
}
function gt(e, n) {
  const a = ha(null), s = X(!1), t = X(""), c = ha(null);
  let h = !1, u = null;
  const i = le(() => s.value || !!c.value || !a.value?.ready || a.value.writeState !== "ready" || a.value.pending);
  function d(x) {
    !h && (!a.value || x.data.revision >= a.value.data.revision) && (a.value = x);
  }
  async function v(x, o) {
    if (h || s.value) return !1;
    s.value = !0, u = null, t.value = "";
    try {
      const r = await e.request(`game/expedition/${x}`, {
        chatIdentity: n,
        ...o
      }, 35e3), p = u;
      return d(p && p.data.revision >= r.result.data.revision ? p : r.result), a.value?.writeState === "ready" && !a.value.pending && x !== "read" && (c.value = null), !0;
    } catch (r) {
      if (!h) {
        u && d(u), t.value = at(r);
        const p = r && typeof r == "object" && "code" in r ? String(r.code) : "";
        o && (p.startsWith("expedition_save_") || p.startsWith("host_request_")) && (c.value = o);
      }
      return !1;
    } finally {
      h || (s.value = !1);
    }
  }
  const y = e.subscribe((x) => {
    if (h || x.type !== "game/expedition/state") return;
    const o = x.payload;
    o.chatIdentity === n && (s.value ? u = o.state : d(o.state));
  });
  async function M() {
    const x = c.value;
    return !await v("confirm") || !a.value || a.value.writeState !== "ready" || a.value.pending ? !1 : x && a.value.data.revision === x.revision ? v("act", x) : (c.value = null, !0);
  }
  return {
    view: a,
    busy: s,
    error: t,
    blocked: i,
    failed: c,
    notice: le(() => t.value || (a.value && (a.value.pending || a.value.writeState !== "ready") ? g.saveError : "")),
    read: () => v("read"),
    recover: M,
    act: (x) => i.value ? Promise.resolve(!1) : v("act", {
      actionId: tt(),
      revision: a.value.data.revision,
      command: yt(x)
    }),
    dispose() {
      h = !0, y();
    }
  };
}
var za = [
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
  }
], Ke = [
  "#326d9f",
  "#278c7f",
  "#7863b4",
  "#c59248"
], aa = {
  "storm-step": "#428dad",
  conductor: "#428dad",
  momentum: "#428dad",
  orbit: "#428dad",
  cinder: "#b96839",
  wildfire: "#b96839",
  "blood-price": "#ad5261",
  frost: "#558eaf",
  shatter: "#558eaf",
  echo: "#8170ac",
  focus: "#8170ac",
  hunter: "#a98243",
  piercing: "#a98243",
  execution: "#a98243",
  thorns: "#4e8776",
  aegis: "#4e8776",
  siphon: "#ad5261",
  renewal: "#4e8776"
};
function Mt(e, n, a) {
  const s = /* @__PURE__ */ new Set();
  let t = {
    x: 0,
    y: 0
  }, c = !1, h = !1;
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
  function i(M) {
    if (!(!u.includes(M.code) || M.target instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(M.target.tagName)) && !(M.code === "Space" && M.target instanceof HTMLElement && M.target.closest("button"))) {
      if (M.preventDefault(), M.stopPropagation(), a(), M.code === "Escape") {
        M.repeat || n();
        return;
      }
      s.add(M.code), !M.repeat && M.code === "Space" && (c = !0), !M.repeat && M.code === "KeyE" && (h = !0);
    }
  }
  function d(M) {
    s.delete(M.code);
  }
  function v() {
    s.clear(), t = {
      x: 0,
      y: 0
    }, c = !1, h = !1;
  }
  function y() {
    v(), n();
  }
  return e.addEventListener("keydown", i), window.addEventListener("keyup", d), window.addEventListener("blur", y), {
    frame() {
      const M = t.x || Number(s.has("KeyD") || s.has("ArrowRight")) - Number(s.has("KeyA") || s.has("ArrowLeft")), x = t.y || Number(s.has("KeyS") || s.has("ArrowDown")) - Number(s.has("KeyW") || s.has("ArrowUp")), o = {
        move: Math.hypot(M, x) < 0.15 ? 0 : (Math.round((Math.atan2(x, M) + Math.PI / 2) / (Math.PI / 4)) + 8 - 1) % 8 + 1,
        dash: c,
        skill: h
      };
      return c = !1, h = !1, o;
    },
    stick(M, x) {
      t = {
        x: M,
        y: x
      };
    },
    dash() {
      c = !0, a();
    },
    skill() {
      h = !0, a();
    },
    clear: v,
    dispose() {
      v(), e.removeEventListener("keydown", i), window.removeEventListener("keyup", d), window.removeEventListener("blur", y);
    }
  };
}
function kt() {
  const e = new Ma();
  e.absarc(0, 0, 1.1, 0, Math.PI, !1), e.lineTo(-0.86, 0), e.absarc(0, 0, 0.86, Math.PI, 0, !0), e.closePath();
  const n = {
    box: new Oa(1, 1, 1),
    sphere: new Ba(1, 20, 14),
    rock: new Va(1, 0),
    cylinder: new Ga(1, 1, 1, 12),
    cone: new Fa(1, 1, 8),
    disc: new Wa(1, 48),
    ring: new ga(0.965, 1, 64),
    arc: new ga(0.77, 1, 40, 1, -0.2, Math.PI * 1.3),
    torus: new va(1, 0.08, 6, 32),
    crescent: new va(1, 0.14, 6, 24, Math.PI * 1.45),
    arch: new Qa(e, {
      depth: 1,
      bevelEnabled: !1,
      curveSegments: 24
    }).translate(0, 0, -0.5)
  }, a = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
  function t(v, y = !1, M = 1, x = !1) {
    const o = `${v}/${y}/${M}/${x}`;
    let r = s.get(o);
    return r || (r = y ? new ma({
      color: v,
      transparent: M < 1,
      opacity: M,
      depthWrite: M === 1,
      side: 2
    }) : new Ha({
      color: v,
      roughness: x ? 0.34 : 0.88,
      metalness: x ? 0.45 : 0.02,
      side: 2
    }), s.set(o, r)), r;
  }
  function c(v, y, M, x, o = [
    0,
    0,
    0
  ], r = !1, p = 1, _ = !1) {
    const b = new He(n[y], t(M, r, p, _));
    return b.scale.set(...x), b.position.set(...o), b.castShadow = !r, b.receiveShadow = !r, v.add(b), b;
  }
  function h(v, y = [
    0,
    0,
    0
  ]) {
    const M = new Ge();
    return M.position.set(...y), v.add(M), M;
  }
  function u(v, y, M, x, o, r = 1, p = !1, _ = 0.04) {
    const b = c(v, p ? "disc" : "ring", y, [
      M,
      M,
      1
    ], [
      x,
      _,
      o
    ], !0, r);
    return b.rotation.x = -Math.PI / 2, b;
  }
  function i(v, y, M, x = [
    0,
    0,
    0
  ]) {
    const o = JSON.stringify(y);
    let r = a.get(o);
    if (!r) {
      const _ = new Ma();
      y.forEach(([b, S], T) => T ? _.lineTo(b, S) : _.moveTo(b, S)), _.closePath(), r = new Na(_), a.set(o, r);
    }
    const p = new He(r, t(M));
    return p.position.set(...x), p.castShadow = !0, v.add(p), p;
  }
  function d(v) {
    v.updateMatrixWorld(!0);
    const y = /* @__PURE__ */ new Map();
    v.traverse((x) => {
      if (!(x instanceof He) || Array.isArray(x.material)) return;
      const o = (x.geometry.index ? x.geometry.toNonIndexed() : x.geometry.clone()).applyMatrix4(x.matrixWorld), r = y.get(x.material) ?? [];
      r.push(o), y.set(x.material, r);
    }), v.clear();
    const M = [];
    for (const [x, o] of y) {
      const r = et(o);
      if (o.forEach((_) => _.dispose()), !r) throw new Error("expedition_geometry_merge");
      const p = new He(r, x);
      p.castShadow = !(x instanceof ma), p.receiveShadow = !0, v.add(p), M.push(r);
    }
    return () => {
      v.clear(), M.forEach((x) => x.dispose());
    };
  }
  return {
    mesh: c,
    group: h,
    ring: u,
    shape: i,
    material: t,
    bake: d,
    geometries: n,
    dispose() {
      Object.values(n).forEach((v) => v.dispose()), a.forEach((v) => v.dispose()), s.forEach((v) => v.dispose());
    }
  };
}
function xt(e, n, a, s) {
  const t = za[a], c = z.arena, { mesh: h, group: u, ring: i } = e, d = (o, r, p, _ = t.stone) => h(o, "box", _, r, p);
  function v(o, r, p, _ = !0) {
    const b = u(n, [
      o,
      0,
      r
    ]);
    d(b, [
      1.65,
      0.38,
      1.65
    ], [
      0,
      0.15,
      0
    ]), d(b, [
      1.3,
      0.3,
      1.3
    ], [
      0,
      0.49,
      0
    ], t.light), d(b, [
      0.91,
      p,
      0.91
    ], [
      0,
      p / 2 + 0.6,
      0
    ]);
    for (const S of [-0.38, 0.38]) d(b, [
      0.08,
      p - 0.35,
      0.12
    ], [
      S,
      p / 2 + 0.6,
      0.48
    ], t.light);
    return d(b, [
      1.3,
      0.24,
      1.3
    ], [
      0,
      p + 0.6,
      0
    ], t.light), d(b, [
      1.56,
      0.3,
      1.56
    ], [
      0,
      p + 0.85,
      0
    ], t.dark), _ && (h(b, "cone", t.trim, [
      0.2,
      0.65,
      0.2
    ], [
      0,
      p + 1.24,
      0
    ]), d(b, [
      0.16,
      0.6,
      0.08
    ], [
      0,
      p - 0.15,
      0.52
    ], t.trim)), b;
  }
  function y(o, r, p, _) {
    v(o - p / 2, r, _ - 2), v(o + p / 2, r, _ - 2);
    const b = u(n, [
      o,
      _ - 2,
      r
    ]);
    h(b, "arch", t.light, [
      p / 2,
      2.3,
      1.15
    ]);
    for (let S = 1; S < 10; S++) {
      const T = S / 10 * Math.PI, Z = d(b, [
        0.025,
        0.64,
        0.025
      ], [
        Math.cos(T) * p * 0.49,
        Math.sin(T) * 2.25,
        0.59
      ], t.trim);
      Z.rotation.z = T - Math.PI / 2;
    }
    d(b, [
      0.6,
      0.9,
      1.3
    ], [
      0,
      2.28,
      0
    ], t.trim);
  }
  function M(o, r, p = 1) {
    const _ = u(n, [
      o,
      0,
      r
    ]);
    _.scale.setScalar(p);
    for (let b = 0; b < 5; b++) {
      const S = b * 2.4, T = h(_, "rock", b % 2 ? t.foliage : t.accent, [
        0.55,
        0.8 + b % 2 * 0.3,
        0.45
      ], [
        Math.cos(S) * 0.4,
        0.5,
        Math.sin(S) * 0.4
      ]);
      T.rotation.z = Math.sin(S) * 0.4;
    }
    for (let b = 0; b < 3; b++) h(_, "rock", t.flower, [
      0.13,
      0.16,
      0.13
    ], [
      Math.sin(b * 4) * 0.5,
      1,
      Math.cos(b * 4) * 0.4
    ]);
  }
  function x(o, r, p) {
    const _ = u(n, [
      o,
      0,
      r
    ]);
    _.scale.setScalar(p);
    const b = h(_, "cylinder", t.dark, [
      0.15,
      3.5,
      0.19
    ], [
      0,
      1.65,
      0
    ]);
    b.rotation.z = -0.1;
    for (let S = 0; S < 6; S++) {
      const T = S * 2.4;
      h(_, "rock", S % 2 ? t.foliage : t.accent, [
        1.65,
        0.88,
        1.4
      ], [
        Math.cos(T) * 0.95,
        3 + Math.sin(T) * 0.5,
        Math.sin(T) * 0.85
      ]);
    }
  }
  d(n, [
    180,
    0.3,
    180
  ], [
    0,
    -4.1,
    0
  ], t.water);
  for (let o = 0; o < 16; o++) d(n, [
    3 + o % 4 * 2,
    0.015,
    0.055
  ], [
    Math.sin(o * 7) * 32,
    -3.92,
    Math.cos(o * 3) * 25
  ], t.haze);
  d(n, [
    c * 2 + 2.4,
    2.4,
    c * 2 + 2.4
  ], [
    0,
    -1.5,
    0
  ], t.dark), d(n, [
    c * 2 + 1.1,
    0.42,
    c * 2 + 1.1
  ], [
    0,
    -0.42,
    0
  ], t.trim), d(n, [
    c * 2 + 0.5,
    0.35,
    c * 2 + 0.5
  ], [
    0,
    -0.14,
    0
  ], t.floor);
  for (let o = -10; o <= 10; o += 2) for (let r = -10; r <= 10; r += 2) d(n, [
    1.96,
    0.045,
    1.96
  ], [
    o,
    0.025,
    r
  ], (o * 3 + r + 40) % 8 === 0 ? t.tile : t.floor);
  if (s) {
    i(n, t.trim, 5.35, 0, 0, 1, !1, 0.058), i(n, t.light, 5.18, 0, 0, 0.6, !1, 0.059), i(n, t.seam, 4.72, 0, 0, 0.65, !1, 0.061);
    for (let o = 0; o < 8; o++) {
      const r = o * Math.PI / 4, p = d(n, [
        0.18,
        0.025,
        0.55
      ], [
        Math.cos(r) * 5.04,
        0.065,
        Math.sin(r) * 5.04
      ], t.trim);
      p.rotation.y = -r + Math.PI / 2;
    }
    if (a === 1) h(n, "crescent", t.seam, [
      3,
      3,
      0.12
    ], [
      0,
      0.065,
      0
    ]).rotation.set(-Math.PI / 2, 0, 0.7);
    else {
      const o = [];
      for (let p = 0; p < (a === 2 ? 24 : 16); p++) {
        const _ = p * Math.PI * 2 / (a === 2 ? 24 : 16), b = p % 2 ? 0.85 : a === 2 ? 2.6 : p % 4 ? 1.8 : 3.2;
        o.push([Math.cos(_) * b, Math.sin(_) * b]);
      }
      const r = e.shape(n, o, t.seam, [
        0,
        0.061,
        0
      ]);
      r.rotation.x = -Math.PI / 2, i(n, t.floor, 0.65, 0, 0, 1, !0, 0.065);
    }
  }
  for (const o of [-1, 1]) for (let r = 0; r < 4; r++) {
    const p = o * (7 + r % 2), _ = -7 + r * 4, b = d(n, [
      0.035,
      0.016,
      0.55 + r * 0.1
    ], [
      p,
      0.055,
      _
    ], t.seam);
    b.rotation.y = r * 1.3;
    const S = d(n, [
      0.028,
      0.015,
      0.3
    ], [
      p + 0.1,
      0.055,
      _ + 0.3
    ], t.seam);
    S.rotation.y = r * 1.3 + 0.8;
  }
  for (const o of [-c - 0.35, c + 0.35]) {
    d(n, [
      0.38,
      0.18,
      c * 2 + 1
    ], [
      o,
      0.08,
      0
    ], t.light);
    for (let r = -10; r <= 10; r += 5) v(o + Math.sign(o) * 0.5, r, r === -10 ? 3.6 : 1.35);
  }
  for (let o = 0; o < 6; o++) d(n, [
    7.2,
    0.24,
    1
  ], [
    0,
    -0.12 - o * 0.26,
    c + 0.65 + o * 0.8
  ], o % 2 ? t.stone : t.light);
  y(0, -c - 3, 8, 6.3);
  for (const o of [-1, 1]) {
    d(n, [
      5,
      3.2,
      1.9
    ], [
      o * 8.4,
      1.45,
      -c - 3
    ], t.dark), d(n, [
      5.5,
      0.3,
      2.3
    ], [
      o * 8.4,
      3.2,
      -c - 3
    ], t.light);
    const r = u(n, [
      o * 5.8,
      4.8,
      -c - 2.9
    ]);
    d(r, [
      2,
      0.08,
      0.08
    ], [
      0,
      0,
      0
    ], t.trim);
    for (let p = 0; p < 5; p++) d(r, [
      0.35,
      2.6 - Math.abs(p - 2) * 0.12,
      0.08
    ], [
      (p - 2) * 0.34,
      -1.35,
      Math.sin(p * 2) * 0.08
    ], p % 2 ? t.foliage : t.dark);
    d(r, [
      0.12,
      1.8,
      0.09
    ], [
      0,
      -1.15,
      0.13
    ], t.trim);
    for (let p = 0; p < 4; p++) M(o * (12.8 + p % 2), -9 + p * 5, 0.8 + p * 0.1);
    x(o * 15, -13, 1.5), x(o * 17, 1, 1.7), d(n, [
      7,
      1.4,
      18
    ], [
      o * 17,
      -0.7,
      -3
    ], t.dark), d(n, [
      6.7,
      0.1,
      17.7
    ], [
      o * 17,
      0.06,
      -3
    ], t.seam);
    for (const p of [-3.5, 3.5]) d(n, [
      0.22,
      0.25,
      18.2
    ], [
      o * 17 + p,
      0.13,
      -3
    ], t.stone);
    d(n, [
      9,
      1.8,
      10
    ], [
      o * 15,
      -0.9,
      -17
    ], t.dark), d(n, [
      8.7,
      0.1,
      9.7
    ], [
      o * 15,
      0.06,
      -17
    ], t.seam);
  }
  for (let o = 0; o < 7; o++) {
    const r = (o - 3) * 8, p = -26 - o % 3 * 6, _ = 7 + o * 5 % 7;
    if (d(n, [
      5.2,
      _,
      5.5
    ], [
      r,
      _ / 2 - 3,
      p
    ], t.stone), d(n, [
      5.8,
      0.4,
      6
    ], [
      r,
      _ - 3,
      p
    ], t.light), a === 1) {
      const b = h(n, "crescent", t.trim, [
        1.5,
        1.5,
        1.5
      ], [
        r,
        _ - 0.8,
        p
      ]);
      b.rotation.z = 0.9;
    } else if (a === 2) h(n, "cone", t.trim, [
      3.4,
      4.8,
      3.4
    ], [
      r,
      _ - 0.8,
      p
    ]);
    else {
      for (const b of [
        -2,
        0,
        2
      ]) d(n, [
        0.7,
        1.2,
        5.6
      ], [
        r + b,
        _ - 2.35,
        p
      ], t.light);
      o % 2 && x(r + 1, p + 2, 1.5);
    }
    for (const b of [
      -1.5,
      0,
      1.5
    ]) d(n, [
      0.5,
      2.8,
      0.12
    ], [
      r + b,
      _ - 5.6,
      p + 2.8
    ], t.dark);
  }
  for (const o of s?.obstacles ?? []) {
    const r = u(n, [
      o.x,
      0,
      o.y
    ]);
    h(r, "cylinder", t.dark, [
      o.radius,
      0.22,
      o.radius
    ], [
      0,
      0.11,
      0
    ]), h(r, "cylinder", t.stone, [
      o.radius * 0.85,
      1.15,
      o.radius * 0.85
    ], [
      0,
      0.78,
      0
    ]), h(r, "cylinder", t.light, [
      o.radius,
      0.2,
      o.radius
    ], [
      0,
      1.4,
      0
    ]), h(r, "rock", t.accent, [
      0.28,
      0.58,
      0.28
    ], [
      0,
      1.9,
      0
    ]);
    for (let p = 0; p < 6; p++) {
      const _ = p * Math.PI / 3;
      d(r, [
        0.09,
        0.8,
        0.09
      ], [
        Math.cos(_) * o.radius * 0.86,
        0.8,
        Math.sin(_) * o.radius * 0.86
      ], t.trim);
    }
  }
  if (!s) {
    h(n, "cylinder", t.dark, [
      2.1,
      0.16,
      2.1
    ], [
      0,
      0.08,
      -8
    ]), h(n, "cylinder", t.light, [
      1.95,
      0.14,
      1.95
    ], [
      0,
      0.2,
      -8
    ]), i(n, t.trim, 1.68, 0, -8, 1, !1, 0.28);
    for (const o of [-1, 1]) {
      M(o * 3, -8, 1.2), M(o * 4, -10, 0.85);
      const r = u(n, [
        o * 2.6,
        0.5,
        -6
      ]);
      h(r, "box", t.dark, [
        0.5,
        0.16,
        0.5
      ]), h(r, "box", t.flower, [
        0.3,
        0.55,
        0.3
      ], [
        0,
        0.35,
        0
      ]), h(r, "cone", t.trim, [
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
  return e.bake(n);
}
function $a(e, n, a = 1) {
  const s = e.group(n);
  s.scale.setScalar(a), e.shape(s, [
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
  ]), e.mesh(s, "box", "#f5f3dc", [
    0.012,
    0.94,
    0.015
  ], [
    0.04,
    0.03,
    0.07
  ]), e.mesh(s, "box", "#705444", [
    0.09,
    0.18,
    0.09
  ], [
    0.12,
    0,
    0.06
  ]);
}
function bt(e, n) {
  const a = e.group(n), s = Ja({
    group: e.group,
    ball(r, p, _, b) {
      return e.mesh(r, "sphere", _, p, b);
    }
  }, a, [
    0,
    0.78,
    0
  ]);
  s.scale.setScalar(2.1);
  const t = Xa(s), c = e.ring(a, "#193f49", 0.6, 0, 0, 0.14, !0), h = e.group(s), u = e.group(h, [
    0.3,
    0.05,
    0.17
  ]), i = e.group(h, [
    0,
    0.2,
    -0.21
  ]), d = e.mesh(h, "torus", Ke[0], [
    0.24,
    0.18,
    0.23
  ], [
    0,
    -0.04,
    0
  ]);
  d.rotation.x = Math.PI / 2;
  let v = null, y = -1, M = 0, x = 0;
  function o(r, p) {
    r === v && p === y || (v = r, y = p, i.clear(), u.clear(), d.material = e.material(Ke[y]), e.shape(i, [
      [-0.23, 0],
      [0.23, 0],
      [0.37, -0.5],
      [0.12, -0.62],
      [-0.35, -0.52]
    ], Ke[y]), e.shape(i, [
      [-0.04, -0.06],
      [0.04, -0.06],
      [0.05, -0.49],
      [0, -0.55],
      [-0.05, -0.49]
    ], "#e6c88f", [
      0,
      0,
      -9e-3
    ]), e.mesh(u, "sphere", "#fffaf2", [
      0.1,
      0.1,
      0.09
    ]), v === "blade" ? (e.mesh(u, "cylinder", "#624d42", [
      0.035,
      0.28,
      0.035
    ], [
      0,
      -0.08,
      0.06
    ]), e.mesh(u, "box", "#d4b470", [
      0.32,
      0.05,
      0.11
    ], [
      0,
      0.07,
      0.06
    ], !1, 1, !0), e.shape(u, [
      [-0.07, 0.1],
      [0.07, 0.1],
      [0.07, 0.65],
      [0, 0.83],
      [-0.07, 0.65]
    ], "#f5f8ef", [
      0,
      0,
      0.07
    ]), e.shape(u, [
      [0, 0.1],
      [0.07, 0.1],
      [0.07, 0.65],
      [0, 0.83]
    ], "#9cc6ce", [
      0,
      0,
      0.076
    ])) : v === "bow" ? $a(e, u) : (e.mesh(u, "cylinder", "#796889", [
      0.035,
      1.12,
      0.035
    ], [
      0,
      0.18,
      0.04
    ]), e.mesh(u, "torus", "#d8bc80", [
      0.19,
      0.24,
      0.18
    ], [
      0,
      0.85,
      0.04
    ], !1, 1, !0), e.mesh(u, "rock", "#b9ecff", [
      0.11,
      0.18,
      0.1
    ], [
      0,
      0.85,
      0.04
    ])));
  }
  return {
    root: a,
    update(r, p, _, b, S, T) {
      o(p, _);
      const Z = !!r && Math.abs(r.x - M) + Math.abs(r.y - x) > 1e-3, K = !!r?.dashTime;
      a.position.set(r?.x ?? 0, T ? 0.3 : 0, r?.y ?? -8), a.scale.setScalar(T ? 1.65 : 1), t.pose(0, 0, T ? Math.PI / 2 + 0.23 : r?.facing ?? Math.PI / 2, b, Z, K, S), s.position.y += 0.3, i.rotation.x = S ? -0.15 : -0.15 - (Z ? 0.5 : 0.06) - Math.sin(b * 0.15) * 0.12, u.rotation.z = r?.swing && !S ? -1.7 * Math.sin(r.swing / 9 * Math.PI) + 0.3 : -0.2, u.rotation.x = r?.swing && !S ? 0.8 : 0.1, c.scale.set(0.6 + (K ? 0.25 : 0), 0.6, 1), r && (M = r.x, x = r.y);
    }
  };
}
function wt(e, n, a, s) {
  const { mesh: t, group: c } = e, h = c(n), u = c(h), i = c(u), d = c(u), v = [], y = ne(a), M = J[a].radius;
  e.ring(h, "#1d3540", M * 1.15, 0, 0, 0.16, !0);
  const x = "#cfad70", o = "#fff0b0", r = s.dark;
  function p(A, I, R) {
    const te = c(u, [
      A,
      R,
      I
    ]);
    t(te, "box", r, [
      0.32,
      R,
      0.42
    ], [
      0,
      -R / 2,
      0
    ]), t(te, "box", s.stone, [
      0.38,
      0.22,
      0.55
    ], [
      0,
      -R + 0.11,
      0.1
    ]), v.push(te);
  }
  function _(A, I, R = "#d9e8df") {
    t(A, "box", x, [
      0.55,
      0.1,
      0.24
    ], [
      0,
      0.25,
      0
    ], !1, 1, !0), t(A, "box", r, [
      0.11,
      0.4,
      0.11
    ]), t(A, "box", R, [
      0.2,
      I,
      0.13
    ], [
      0,
      I / 2 + 0.35,
      0
    ], !1, 1, !0), t(A, "cone", R, [
      0.15,
      0.4,
      0.13
    ], [
      0,
      I + 0.5,
      0
    ]);
  }
  if (a === "charger") {
    t(u, "rock", s.stone, [
      0.58,
      0.58,
      0.9
    ], [
      0,
      0.7,
      0
    ]), t(d, "rock", r, [
      0.43,
      0.45,
      0.46
    ], [
      0,
      0.73,
      0.7
    ]);
    for (const A of [-0.27, 0.27]) {
      const I = t(d, "cone", x, [
        0.15,
        0.7,
        0.15
      ], [
        A,
        1.15,
        0.9
      ]);
      I.rotation.x = 0.55, t(d, "sphere", o, [
        0.05,
        0.04,
        0.06
      ], [
        A,
        0.82,
        1.02
      ], !0), p(A, -0.42, 0.45), p(A, 0.45, 0.45);
    }
    for (let A = 0; A < 3; A++) t(u, "cone", s.accent, [
      0.2,
      0.45,
      0.25
    ], [
      0,
      1.25,
      -0.5 + A * 0.4
    ]);
  } else if (a === "weaver") {
    t(u, "cone", "#63689d", [
      1.45,
      3,
      1.2
    ], [
      0,
      2.1,
      0
    ]), t(u, "cone", s.light, [
      0.8,
      1.8,
      0.65
    ], [
      0,
      2.65,
      0.3
    ]), t(d, "sphere", r, [
      0.6,
      0.72,
      0.45
    ], [
      0,
      4,
      0
    ]);
    const A = t(d, "crescent", x, [
      1.35,
      1.35,
      0.8
    ], [
      0,
      4.35,
      -0.3
    ], !1, 1, !0);
    A.rotation.z = 0.87;
    for (const I of [-0.23, 0.23]) t(d, "sphere", "#e4e3ff", [
      0.09,
      0.055,
      0.05
    ], [
      I,
      4.08,
      0.45
    ], !0);
    for (const I of [-1, 1]) {
      const R = c(u, [
        I * 0.8,
        3.3,
        0
      ]);
      R.rotation.z = I * 0.65, t(R, "cone", "#757caf", [
        0.5,
        1.8,
        0.45
      ], [
        0,
        -0.65,
        0
      ]), t(R, "sphere", s.light, [
        0.22,
        0.25,
        0.22
      ], [
        0,
        -1.45,
        0.1
      ]), v.push(R);
    }
    for (let I = 0; I < 5; I++) {
      const R = I / 5 * Math.PI * 2, te = t(i, "rock", s.accent, [
        0.2,
        0.34,
        0.2
      ], [
        Math.cos(R) * 1.95,
        3.3 + Math.sin(R) * 1.1,
        -0.3
      ]);
      te.rotation.z = R;
    }
  } else if (a === "king") {
    p(-0.5, 0, 0.8), p(0.5, 0, 0.8), t(u, "cone", "#7c4550", [
      1.8,
      3.6,
      0.8
    ], [
      0,
      2,
      -0.3
    ]), t(u, "box", r, [
      1.6,
      1.7,
      1
    ], [
      0,
      2.1,
      0
    ]), t(u, "rock", x, [
      0.5,
      0.9,
      0.3
    ], [
      0,
      2.25,
      0.62
    ]);
    for (const A of [-1, 1]) t(u, "rock", s.stone, [
      0.85,
      0.5,
      0.7
    ], [
      A * 0.95,
      2.95,
      0
    ]);
    t(d, "sphere", r, [
      0.65,
      0.8,
      0.5
    ], [
      0,
      3.6,
      0
    ]), t(d, "box", o, [
      0.48,
      0.08,
      0.09
    ], [
      0,
      3.7,
      0.51
    ], !0), t(d, "torus", x, [
      0.86,
      0.86,
      0.86
    ], [
      0,
      4.6,
      0
    ], !1, 1, !0).rotation.x = Math.PI / 2;
    for (let A = 0; A < 7; A++) {
      const I = A * Math.PI * 2 / 7;
      t(d, "cone", x, [
        0.17,
        0.85,
        0.17
      ], [
        Math.cos(I) * 0.78,
        4.85,
        Math.sin(I) * 0.78
      ]);
    }
    i.position.set(1.55, 1.35, 0.2), i.rotation.z = -0.3, _(i, 3.4, "#f6dc9f"), t(u, "box", s.stone, [
      0.5,
      1.2,
      0.5
    ], [
      -1.15,
      2,
      0.1
    ]);
  } else if (a === "warden") {
    p(-0.65, 0.05, 0.85), p(0.65, 0.05, 0.85), t(u, "cylinder", r, [
      1.1,
      1.85,
      0.8
    ], [
      0,
      1.9,
      0
    ]), t(u, "box", s.stone, [
      1.1,
      1.45,
      0.35
    ], [
      0,
      2,
      0.72
    ]), t(u, "rock", s.accent, [
      0.28,
      0.4,
      0.14
    ], [
      0,
      2.1,
      0.94
    ]);
    for (const I of [-1, 1])
      t(u, "rock", s.stone, [
        0.83,
        0.6,
        0.7
      ], [
        I * 1.03,
        2.7,
        0
      ]), t(u, "box", x, [
        0.7,
        0.1,
        0.8
      ], [
        I * 1.08,
        2.45,
        0.1
      ], !1, 1, !0);
    t(d, "sphere", s.stone, [
      0.73,
      0.77,
      0.63
    ], [
      0,
      3.2,
      0
    ]), t(d, "box", r, [
      1.12,
      0.33,
      0.2
    ], [
      0,
      3.22,
      0.54
    ]), t(d, "box", o, [
      0.74,
      0.095,
      0.05
    ], [
      0,
      3.22,
      0.66
    ], !0), t(d, "cone", s.foliage, [
      0.27,
      1.1,
      0.5
    ], [
      0,
      4,
      -0.2
    ]);
    const A = c(u, [
      -1.32,
      1.5,
      0.6
    ]);
    t(A, "box", r, [
      1.2,
      1.8,
      0.25
    ]), t(A, "box", x, [
      1,
      1.58,
      0.28
    ]), t(A, "box", s.foliage, [
      0.85,
      1.42,
      0.31
    ]), t(A, "rock", s.light, [
      0.28,
      0.4,
      0.1
    ], [
      0,
      0.1,
      0.22
    ]), i.position.set(1.5, 1.8, 0.25), t(i, "cylinder", "#766450", [
      0.1,
      2.5,
      0.1
    ]), t(i, "box", r, [
      1.25,
      0.9,
      0.9
    ], [
      0,
      1.4,
      0
    ]), t(i, "box", x, [
      0.24,
      0.96,
      0.94
    ], [
      0,
      1.4,
      0
    ], !1, 1, !0), t(i, "box", s.light, [
      0.22,
      0.77,
      0.74
    ], [
      0.65,
      1.4,
      0
    ]);
  } else {
    const A = a === "priest", I = a === "guard";
    if (A ? t(u, "cone", "#767da5", [
      0.55,
      1.5,
      0.5
    ], [
      0,
      0.95,
      0
    ]) : (p(-0.22, 0, 0.5), p(0.22, 0, 0.5), t(u, "box", r, [
      0.72,
      0.85,
      0.52
    ], [
      0,
      0.92,
      0
    ])), t(u, "box", s.stone, [
      0.5,
      0.55,
      0.15
    ], [
      0,
      1,
      0.3
    ]), t(d, "sphere", s.stone, [
      0.43,
      0.45,
      0.38
    ], [
      0,
      1.63,
      0
    ]), t(d, "box", r, [
      0.68,
      0.17,
      0.12
    ], [
      0,
      1.65,
      0.32
    ]), t(d, "box", o, [
      0.39,
      0.045,
      0.05
    ], [
      0,
      1.65,
      0.39
    ], !0), A)
      t(d, "cone", "#626a9c", [
        0.55,
        0.8,
        0.5
      ], [
        0,
        2.14,
        0
      ]), i.position.set(0.52, 1, 0.1), t(i, "cylinder", x, [
        0.04,
        1.6,
        0.04
      ]), t(i, "rock", "#d1dcff", [
        0.22,
        0.32,
        0.22
      ], [
        0,
        0.95,
        0
      ]);
    else {
      t(d, "box", s.foliage, [
        0.12,
        0.38,
        0.55
      ], [
        0,
        2,
        -0.07
      ]);
      for (const R of [-1, 1]) t(u, "rock", s.stone, [
        0.28,
        0.23,
        0.3
      ], [
        R * 0.45,
        1.22,
        0
      ]);
      i.position.set(0.54, 1, 0.2), a === "archer" ? $a(e, i, 1.3) : (i.rotation.z = -0.3, _(i, 0.75)), I && (t(u, "box", x, [
        0.85,
        1.1,
        0.18
      ], [
        -0.4,
        0.95,
        0.46
      ]), t(u, "box", s.foliage, [
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
  const b = c(h, [
    0,
    y ? 5.5 : a === "charger" ? 1.7 : 2.45,
    0
  ]);
  t(b, "box", "#233f48", [
    1.06,
    0.105,
    0.02
  ], [
    0,
    0,
    0
  ], !0);
  const S = t(b, "box", "#f0ba83", [
    1,
    0.055,
    0.03
  ], [
    0,
    0,
    0.02
  ], !0), T = [];
  u.traverse((A) => {
    A instanceof He && T.push({
      mesh: A,
      material: A.material
    });
  });
  let Z = 0, K = -100, oe = 0, ae = 0;
  const O = i.rotation.z;
  return {
    root: h,
    bar: b,
    update(A, I, R) {
      const te = Math.abs(A.x - oe) + Math.abs(A.y - ae) > 5e-3;
      oe = A.x, ae = A.y, Z && !A.windup && (K = I), Z = A.windup;
      const D = A.windup ? 1 - A.windup / J[A.kind].windup : 0, ie = Math.max(0, 1 - (I - K) / 10);
      h.position.set(A.x, 0, A.y), u.rotation.y = Math.PI / 2 - A.angle, u.position.y = R ? 0 : a === "weaver" || a === "priest" ? 0.13 + Math.sin(I * 0.055) * 0.1 : te ? Math.abs(Math.sin(I * 0.3)) * 0.055 : 0, u.rotation.x = R ? 0 : -D * 0.16 + ie * 0.2, d.rotation.z = !R && a === "king" ? Math.sin(I * 0.035) * 0.08 : 0, i.rotation.x = R ? 0 : D * -1.3 + ie * 1.4, i.rotation.z = O + (R ? 0 : D * -0.35);
      for (let ee = 0; ee < v.length; ee++) v[ee].rotation.x = !R && te ? Math.sin(I * 0.32 + ee * Math.PI) * 0.28 : 0;
      for (const ee of T) ee.mesh.material = A.marked > 2 && !R ? e.material("#fff6dd") : ee.material;
      b.visible = !y && A.hp < A.maxHp, S.scale.x = A.hp / A.maxHp, S.position.x = (A.hp / A.maxHp - 1) * 0.5;
    }
  };
}
var G = {
  danger: "#c34740",
  warning: "#ec8754",
  magic: "#8bd9f2",
  frost: "#addffc",
  gold: "#fff0bb",
  heal: "#75dbb0",
  fire: "#f0ad55"
};
function _t(e, n) {
  const a = /* @__PURE__ */ new Map();
  function s(c, h, u = 1) {
    const i = Math.max(0.1, Math.min(1, Math.round(u * 10) / 10)), d = `${c}/${h}/${i}`;
    let v = a.get(d);
    v || (v = {
      list: [],
      used: 0
    }, a.set(d, v));
    let y = v.list[v.used++];
    return y || (y = e.mesh(n, c, h, [
      1,
      1,
      1
    ], [
      0,
      0,
      0
    ], !0, i), v.list.push(y)), y.visible = !0, y.rotation.set(0, 0, 0), y.scale.set(1, 1, 1), y;
  }
  function t(c, h, u, i, d, v = 1, y = 0.09) {
    const M = s(c, h, v);
    return M.position.set(i, y, d), M.scale.set(u, u, 1), M.rotation.x = -Math.PI / 2, M;
  }
  return { update(c, h) {
    for (const i of a.values())
      i.used = 0, i.list.forEach((d) => d.visible = !1);
    if (!c) return;
    const u = c.player;
    if (t("ring", "#f2f6e2", 0.64, u.x, u.y, 0.8), u.dashTime && !h) for (let i = 1; i <= 3; i++) {
      const d = s("cone", G.gold, 0.7 - i * 0.15);
      d.position.set(u.x - Math.cos(u.dashAngle) * i * 0.43, 0.45, u.y - Math.sin(u.dashAngle) * i * 0.43), d.scale.set(0.13, u.dashTime / 8 * 1.7, 0.13), d.rotation.set(0, -u.dashAngle, -Math.PI / 2);
    }
    u.shield && t("ring", G.magic, 0.9, u.x, u.y);
    for (const i of c.enemies) {
      if (ne(i.kind) && i.phase > 1) {
        const d = J[i.kind].radius + 0.55;
        if (t("ring", i.kind === "king" ? G.fire : G.magic, d, i.x, i.y, 0.65), !h) for (let v = 0; v < i.phase + 2; v++) {
          const y = c.tick * 0.025 + v * Math.PI * 2 / (i.phase + 2), M = s("rock", i.kind === "king" ? G.fire : G.magic, 0.8);
          M.position.set(i.x + Math.cos(y) * d, 0.55 + Math.sin(y * 2) * 0.2, i.y + Math.sin(y) * d), M.scale.set(0.08, 0.19, 0.08);
        }
      }
      if (i.windup) {
        const d = 1 - i.windup / J[i.kind].windup;
        if (t("ring", G.warning, J[i.kind].radius + 0.35, i.x, i.y, 0.8), i.kind === "charger") {
          const v = Math.min(9, Math.hypot(i.target.x - i.x, i.target.y - i.y)), y = s("box", G.danger, 0.3);
          y.scale.set(0.75, 0.035, v), y.position.set(i.x + Math.cos(i.angle) * v / 2, 0.09, i.y + Math.sin(i.angle) * v / 2), y.rotation.y = Math.PI / 2 - i.angle, t("ring", G.danger, 0.5, i.target.x, i.target.y, 0.9);
        } else !ne(i.kind) && i.kind !== "archer" && i.kind !== "priest" && (t("disc", G.danger, J[i.kind].reach, i.target.x, i.target.y, 0.15 + d * 0.2), t("ring", G.danger, J[i.kind].reach, i.target.x, i.target.y));
      }
      if (i.chill && t("ring", G.frost, J[i.kind].radius + 0.13, i.x, i.y), i.burn && !h) for (let d = 0; d < 3; d++) {
        const v = s("rock", G.fire, 0.8);
        v.position.set(i.x + Math.sin(d * 2) * 0.3, 0.35 + (c.tick + d * 7) % 20 / 18, i.y + Math.cos(d * 2) * 0.3), v.scale.set(0.08, 0.2, 0.08);
      }
      i.kind === "priest" && t("ring", "#a39aca", 4, i.x, i.y, 0.4);
    }
    for (const i of c.hazards) {
      const d = i.friendly ? i.kind === "fire" ? G.fire : G.magic : G.danger;
      if (t("disc", d, i.radius, i.x, i.y, i.wait ? 0.2 : 0.4), t("ring", d, i.radius, i.x, i.y), i.wait) {
        t("ring", d, i.radius * (1 - Math.min(1, i.wait / 45)), i.x, i.y, 0.7);
        const v = s("box", d, 0.7);
        v.position.set(i.x, 0.12, i.y), v.scale.set(0.08, 0.02, 0.6);
        const y = s("box", d, 0.7);
        y.position.copy(v.position), y.scale.set(0.6, 0.02, 0.08);
      } else if (!h) {
        t("ring", G.gold, i.radius * (1.15 - i.life / 60), i.x, i.y, 0.7, 0.25);
        for (let v = 0; v < 6; v++) {
          const y = v * Math.PI / 3, M = s("cone", d, 0.7);
          M.position.set(i.x + Math.cos(y) * i.radius * 0.65, 0.45, i.y + Math.sin(y) * i.radius * 0.65), M.scale.set(0.15, 0.9, 0.15);
        }
      }
    }
    for (const i of c.shots) {
      const d = i.friendly ? G.gold : G.danger, v = s("sphere", i.friendly ? "#fffbea" : "#fff1c9");
      v.position.set(i.x, 0.6, i.y), v.scale.set(0.11, 0.11, 0.11);
      const y = s("sphere", d, 0.8);
      y.position.copy(v.position), y.scale.set(0.21, 0.18, 0.21);
      const M = s("cone", d, 0.5);
      M.position.set(i.x - Math.cos(i.angle) * 0.38, 0.6, i.y - Math.sin(i.angle) * 0.38), M.scale.set(0.14, 0.75, 0.14), M.rotation.set(0, -i.angle, -Math.PI / 2);
    }
    for (const i of c.effects) {
      const d = 1 - i.life / (i.kind === "slash" ? 9 : 15);
      if (i.kind === "slash") {
        const v = t("arc", G.gold, i.size, i.x, i.y, 1 - d * 0.6, 0.42);
        v.rotation.z = -i.angle - 0.9 + d * 0.4;
        const y = t("arc", "#ffffff", i.size * 0.86, i.x, i.y, 1 - d * 0.8, 0.43);
        y.rotation.z = v.rotation.z;
      } else if (i.kind === "lightning") {
        for (let v = 0; v < 4; v++) {
          const y = s("box", v % 2 ? "#ffffff" : G.magic, 1 - d * 0.6);
          y.scale.set(0.09 + (1 - d) * 0.09, 1.05, 0.08), y.position.set(i.x + (v % 2 ? 0.14 : -0.14), 0.5 + v * 0.85, i.y), y.rotation.z = v % 2 ? -0.35 : 0.35;
        }
        t("ring", G.magic, 0.4 + d, i.x, i.y, 1 - d);
      } else if (i.kind === "heal") t("ring", G.heal, 0.4 + d, i.x, i.y, 1 - d);
      else {
        const v = i.kind === "hit" ? G.danger : G.gold;
        if (t("ring", v, i.size * (0.4 + d), i.x, i.y, 1 - d), !h) for (let y = 0; y < 7; y++) {
          const M = y * 2.4 + i.id, x = s("rock", v, 1 - d * 0.8);
          x.position.set(i.x + Math.cos(M) * d * i.size, 0.4 + Math.sin(d * Math.PI) * 0.8, i.y + Math.sin(M) * d * i.size), x.scale.set(0.1 * (1 - d), 0.28 * (1 - d), 0.1 * (1 - d)), x.rotation.z = M;
        }
      }
    }
  } };
}
function Ct(e, n) {
  const a = new Ka({
    antialias: !0,
    alpha: !1,
    powerPreference: "high-performance"
  });
  a.outputColorSpace = Ya, a.toneMapping = 7, a.toneMappingExposure = 1, a.setPixelRatio(Math.min(devicePixelRatio || 1, 1.8)), a.shadowMap.enabled = !0, a.shadowMap.type = 2, e.append(a.domElement);
  const s = document.createElement("div");
  s.className = "exp-world-labels", s.setAttribute("aria-hidden", "true"), e.append(s);
  const t = new qa(), c = new ja(-10, 10, 10, -10, 0.1, 180), h = kt();
  t.add(new La("#effbff", "#74918a", 1.7));
  const u = new ya("#fff1d6", 2.2);
  u.position.set(-12, 25, 13), u.castShadow = !0, u.shadow.mapSize.set(1536, 1536), Object.assign(u.shadow.camera, {
    left: -23,
    right: 23,
    top: 24,
    bottom: -24,
    far: 80
  }), u.shadow.bias = -4e-4, u.shadow.normalBias = 0.035, u.shadow.radius = 3, t.add(u);
  const i = new ya("#c3edff", 1.1);
  i.position.set(7, 8, -15), t.add(i);
  const d = new Ge(), v = new Ge(), y = new Ge();
  t.add(d, v, y);
  const M = bt(h, v), x = _t(h, y), o = /* @__PURE__ */ new Map(), r = [], p = matchMedia("(prefers-reduced-motion: reduce)"), _ = new Xe(), b = new Xe();
  let S = null, T = "", Z = "", K = "", oe = null, ae = 1, O = 1, A = !0, I = !1, R = !1, te = 0, D = -1, ie = 0, ee = !1;
  function ve() {
    const q = e.getBoundingClientRect();
    ae = Math.max(1, q.width), O = Math.max(1, q.height), a.setSize(ae, O, !1), A = !0, ee = !1;
  }
  const _e = new ResizeObserver(ve);
  _e.observe(e), ve();
  function xe(q) {
    q.preventDefault(), R = !0, n();
  }
  a.domElement.addEventListener("webglcontextlost", xe);
  function P(q, ce, ue, Me, be = !1) {
    if (Math.abs(q) < 1) return;
    const $ = document.createElement("span");
    $.className = be ? "exp-damage is-player" : q < 0 ? "exp-damage is-heal" : "exp-damage", $.textContent = `${q < 0 ? "+" : ""}${Math.ceil(Math.abs(q))}`, s.append($), r.push({
      element: $,
      position: new Xe(ce, 2, ue),
      born: Me
    });
  }
  function Q() {
    for (const q of o.values())
      v.remove(q.actor.root), q.marker.remove();
    o.clear(), r.splice(0).forEach((q) => q.element.remove());
  }
  return {
    draw(q, ce, ue, Me = "battle", be = 0) {
      if (I || R) return;
      const $ = Me === "battle" ? q : null, Se = $?.tick ?? (p.matches ? 0 : be * 0.025), B = $?.tick !== D, E = `${ce.weapon}/${ce.cloak}/${ue}`;
      if (!A && Me === Z && E === K && $ === oe && (!B && $ || !$ && (Me === "between" || p.matches || be - te < 40))) return;
      te = be;
      const m = za[ue], Y = `${ue}:${$?.boss ?? !1}:${!!$}`;
      Y !== T && (S?.(), S = xt(h, d, ue, $), T = Y, t.background = new Da(m.sky), t.fog = new Ua(m.haze, 42, 95)), $ !== oe && (Q(), ie = $?.player.hp ?? 0, ee = !1);
      const qe = Me !== "battle", Ie = ae < 600, oa = Ie || O < 400, ca = ae / O, We = qe ? Ie ? 13 : 28 : Ie ? 18.5 : Math.max(27, ca * (O < 400 ? 14 : 23)), ua = Math.max(0, z.arena - We / 2 + 0.5), da = $ ? oa ? $.player.x * 0.62 : Math.max(-ua, Math.min(ua, $.player.x * 0.62)) : Ie ? 0 : 5.5, pa = $ ? $.player.y * (oa ? 0.62 : 0.2) - 0.4 : Ie ? -4.2 : -11.8;
      !ee || p.matches ? (_.set(da, 0, pa), ee = !0) : (_.x += (da - _.x) * 0.14, _.z += (pa - _.z) * 0.14), c.left = -We / 2, c.right = We / 2, c.top = We / ca / 2, c.bottom = -c.top;
      const fa = qe ? 0 : 1 * Math.PI / 4;
      c.position.set(_.x + Math.sin(fa) * 25, 28, _.z + Math.cos(fa) * 25), c.lookAt(_.x, 0, _.z), c.updateProjectionMatrix(), c.updateMatrixWorld(), M.update($?.player ?? null, ce.weapon, ce.cloak, Se, p.matches, qe);
      for (const U of $?.enemies ?? []) {
        let H = o.get(U.id);
        if (!H) {
          const Ye = document.createElement("i");
          Ye.className = ne(U.kind) ? "exp-threat is-boss" : "exp-threat", s.append(Ye), H = {
            actor: wt(h, v, U.kind, m),
            hp: U.hp,
            death: null,
            marker: Ye
          }, o.set(U.id, H);
        }
        H.hp > U.hp && B && P(H.hp - U.hp, U.x, U.y, $.tick), H.hp = U.hp, H.actor.update(U, $.tick, p.matches), H.actor.bar.quaternion.copy(c.quaternion), b.set(U.x, 1.2, U.y).project(c);
        const me = (b.x * 0.5 + 0.5) * ae, Ze = (-b.y * 0.5 + 0.5) * O, Ve = Math.max(18, Math.min(ae - 18, me)), Ue = Math.max(Ie ? 132 : 95, Math.min(O - 130, Ze));
        H.marker.hidden = Math.abs(me - Ve) + Math.abs(Ze - Ue) < 10, H.marker.style.transform = `translate(${Ve}px,${Ue}px) rotate(${Math.atan2(Ze - Ue, me - Ve) + Math.PI / 2}rad)`;
      }
      for (const [U, H] of o) {
        if ($?.enemies.some((Ze) => Ze.id === U)) continue;
        H.death === null && (H.death = $?.tick ?? 0, $ && H.hp > 0 && P(H.hp, H.actor.root.position.x, H.actor.root.position.z, $.tick));
        const me = (($?.tick ?? 0) - H.death) / 12;
        H.actor.bar.visible = !1, H.marker.hidden = !0, H.actor.root.scale.setScalar(Math.max(0, 1 - me)), (me >= 1 || !$ || p.matches) && (v.remove(H.actor.root), H.marker.remove(), o.delete(U));
      }
      $ && B && (ie !== $.player.hp && P(ie - $.player.hp, $.player.x, $.player.y, $.tick, ie > $.player.hp), ie = $.player.hp), x.update($, p.matches);
      for (let U = r.length - 1; U >= 0; U--) {
        const H = r[U], me = (($?.tick ?? 0) - H.born) / 27;
        if (me >= 1 || !$) {
          H.element.remove(), r.splice(U, 1);
          continue;
        }
        b.copy(H.position), b.y += p.matches ? 0 : me * 0.9, b.project(c), H.element.style.transform = `translate(${(b.x * 0.5 + 0.5) * ae}px,${(-b.y * 0.5 + 0.5) * O}px)`, H.element.style.opacity = String(Math.min(1, (1 - me) * 3));
      }
      a.render(t, c), A = !1, Z = Me, K = E, oe = $, D = $?.tick ?? -1;
    },
    dispose() {
      I = !0, _e.disconnect(), a.domElement.removeEventListener("webglcontextlost", xe), Q(), S?.(), u.shadow.dispose(), h.dispose(), t.clear(), a.dispose(), a.forceContextLoss(), a.domElement.remove(), s.remove();
    }
  };
}
function At(e) {
  let n = null, a = null, s = null, t = !1, c = !1, h = null, u = -1, i = 0, d = 0, v = 0, y = 0;
  function M(o, r, p, _ = "sine", b = o * 0.8, S = 0) {
    if (!t || !n || !a || n.state !== "running") return;
    const T = n.createOscillator(), Z = n.createGain(), K = n.currentTime + S;
    T.type = _, T.frequency.setValueAtTime(o, K), T.frequency.exponentialRampToValueAtTime(Math.max(30, b), K + r), Z.gain.setValueAtTime(1e-4, K), Z.gain.exponentialRampToValueAtTime(p, K + 9e-3), Z.gain.exponentialRampToValueAtTime(1e-4, K + r), T.connect(Z).connect(a), T.start(K), T.stop(K + r), T.onended = () => {
      T.disconnect(), Z.disconnect();
    };
  }
  function x(o, r, p, _) {
    if (!t || !n || !a || !s || n.state !== "running") return;
    const b = n.createBufferSource(), S = n.createBiquadFilter(), T = n.createGain(), Z = n.currentTime;
    b.buffer = s, S.type = "bandpass", S.Q.value = 0.65, S.frequency.setValueAtTime(p, Z), S.frequency.exponentialRampToValueAtTime(_, Z + o), T.gain.setValueAtTime(1e-4, Z), T.gain.exponentialRampToValueAtTime(r, Z + 8e-3), T.gain.exponentialRampToValueAtTime(1e-4, Z + o), b.connect(S).connect(T).connect(a), b.start(Z), b.stop(Z + o), b.onended = () => {
      b.disconnect(), S.disconnect(), T.disconnect();
    };
  }
  return {
    async enable(o) {
      if (!c) {
        t = o;
        try {
          if (!o) {
            n && await n.suspend();
            return;
          }
          if (!n) {
            n = new AudioContext(), a = n.createGain(), a.gain.value = 0.55, a.connect(n.destination), s = n.createBuffer(1, n.sampleRate, n.sampleRate);
            const r = s.getChannelData(0);
            for (let p = 0; p < r.length; p++) r[p] = Math.random() * 2 - 1;
          }
          await n.resume();
        } catch {
          t = !1, c || e();
        }
      }
    },
    tick(o) {
      h !== o && (h = o, u = -1, i = o.player.hp, d = o.kills, v = o.player.skill, y = o.serial), u !== o.tick && (u = o.tick, o.player.hp < i && (x(0.16, 0.17, 800, 120), M(95, 0.2, 0.12, "triangle", 42)), o.kills > d && (M(659, 0.22, 0.045), M(988, 0.3, 0.025, "sine", 980, 0.035)), o.player.swing === 9 && x(0.095, 0.08, 2700, 500), o.player.dashTime === 7 && x(0.2, 0.09, 500, 2600), o.player.skill > v && (x(0.24, 0.12, 2200, 250), M(165, 0.35, 0.075, "triangle", 82), M(660, 0.36, 0.035, "sine", 440, 0.02)), o.effects.some((r) => r.id > y && r.kind === "lightning") && (x(0.12, 0.1, 4400, 1e3), M(1200, 0.08, 0.018, "sine", 210)), o.status === "won" && [
        392,
        494,
        587,
        784
      ].forEach((r, p) => M(r, 0.65, 0.04, "sine", r, p * 0.075)), o.status === "lost" && M(147, 0.7, 0.06, "triangle", 73), i = o.player.hp, d = o.kills, v = o.player.skill, y = o.serial);
    },
    dispose() {
      c = !0, t = !1, n && (n.close().catch(e), n = null), a = null, s = null;
    }
  };
}
var Aa = {
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
}, Et = {
  class: "exp-icon",
  viewBox: "0 0 64 64",
  fill: "none",
  "aria-hidden": "true"
}, St = ["d"], It = ["d"], Pt = /* @__PURE__ */ la({
  __name: "ExpeditionIcon",
  props: { name: {} },
  setup(e) {
    return (n, a) => (w(), C("svg", Et, [f("path", {
      d: l(Aa)[e.name].body,
      fill: "currentColor",
      "fill-opacity": ".17",
      "fill-rule": "evenodd",
      stroke: "currentColor",
      "stroke-width": "2.2",
      "stroke-linejoin": "round"
    }, null, 8, St), f("path", {
      d: l(Aa)[e.name].detail,
      stroke: "currentColor",
      "stroke-width": "2.2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }, null, 8, It)]));
  }
}), L = Pt, Tt = ["aria-label"], zt = {
  key: 0,
  class: "exp-touch"
}, $t = ["aria-label"], Zt = { class: "exp-combat-buttons" }, Rt = ["aria-label"], Lt = ["aria-label"], Bt = /* @__PURE__ */ la({
  __name: "ExpeditionField",
  props: {
    run: {},
    client: {},
    paused: { type: Boolean },
    camp: { type: Boolean },
    generationActive: { type: Boolean },
    weapon: {},
    cloak: {},
    sound: { type: Boolean }
  },
  emits: [
    "pause",
    "error",
    "hud"
  ],
  setup(e, { expose: n, emit: a }) {
    const s = e, t = a, c = X(null), h = X(null), u = X({
      x: 0,
      y: 0
    }), i = X({
      dash: 0,
      skill: 0
    });
    let d = null, v = null, y = null, M = "", x = 0, o = 0, r = -1, p = 0, _ = [], b = 0, S = !1, T = !0, Z = !1;
    const K = At(() => t("error", "sound"));
    function oe() {
      const P = s.run, Q = P ? `${P.id}:${P.step}:${P.phase === "battle" ? "battle" : "between"}` : "";
      Q !== M && (M = Q, y = P?.phase === "battle" && P.battle ? structuredClone(P.battle) : null, _ = [], b = 0, r = -1, y ? (v?.clear(), c.value?.focus({ preventScroll: !0 }), ae()) : t("hud", null));
    }
    function ae() {
      !y || y.tick === r || (r = y.tick, i.value = {
        dash: y.player.dash,
        skill: y.player.skill
      }, t("hud", {
        player: { ...y.player },
        enemies: y.enemies.filter((P) => ne(P.kind)).map((P) => ({ ...P })),
        wave: y.wave,
        waves: y.waves,
        tick: y.tick
      }));
    }
    async function O() {
      if (S || !_.length || s.client.blocked.value || s.generationActive) return;
      S = !0;
      const P = _;
      _ = [], b = 0;
      const Q = await s.client.act({
        type: "input",
        spans: P
      });
      S = !1, Q ? _.length && (s.paused || y?.status !== "fighting" || !T) && O() : t("pause");
    }
    function A() {
      v?.clear(), D = null, u.value = {
        x: 0,
        y: 0
      };
    }
    function I() {
      A(), t("pause"), O();
    }
    function R() {
      document.hidden && I();
    }
    function te(P) {
      if (Z || !T) return;
      x = requestAnimationFrame(te), oe();
      const Q = o ? Math.min(100, P - o) : 0;
      if (o = P, !s.paused && !s.generationActive && !document.hidden && !s.client.failed.value && s.client.view.value?.writeState === "ready" && b < z.maxInputTicks && y?.status === "fighting" && y && s.run) {
        for (p += Q; p >= 1e3 / z.hz && y.status === "fighting" && b < z.maxInputTicks; ) {
          const q = v.frame();
          ct(y, q, s.run), ut(_, q), b++, p -= 1e3 / z.hz, K.tick(y);
        }
        (b >= z.checkpointTicks || y.status !== "fighting") && O(), (y.tick % 3 === 0 || y.status !== "fighting") && ae();
      } else p = 0;
      try {
        document.hidden || d?.draw(y, s.camp ? {
          weapon: s.weapon,
          cloak: s.cloak
        } : s.run ?? {
          weapon: s.weapon,
          cloak: s.cloak
        }, s.run ? Math.floor(s.run.step / z.zoneSteps) : 0, s.camp ? "camp" : y ? "battle" : "between", P);
      } catch {
        t("error", "rendering"), I(), cancelAnimationFrame(x);
      }
    }
    Ne(() => s.paused, (P) => {
      P ? (A(), O()) : c.value?.focus({ preventScroll: !0 });
    }), Ne(() => s.sound, (P) => {
      K.enable(P);
    }), Ne(() => s.generationActive, (P) => {
      !P && s.paused && O();
    });
    let D = null;
    function ie(P) {
      if (D !== P.pointerId) return;
      const Q = P.currentTarget.getBoundingClientRect(), q = (P.clientX - Q.left - Q.width / 2) / 38, ce = (P.clientY - Q.top - Q.height / 2) / 38, ue = Math.max(1, Math.hypot(q, ce));
      u.value = {
        x: q / ue * 27,
        y: ce / ue * 27
      }, v?.stick(q / ue, ce / ue);
    }
    function ee(P) {
      D = P.pointerId, P.currentTarget.setPointerCapture(D), ie(P), c.value?.focus({ preventScroll: !0 });
    }
    function ve(P) {
      D === P.pointerId && (D = null, u.value = {
        x: 0,
        y: 0
      }, v?.stick(0, 0));
    }
    function _e(P) {
      (!P || P.detail === 0) && v?.dash();
    }
    function xe(P) {
      (!P || P.detail === 0) && v?.skill();
    }
    return Ea(() => {
      try {
        d = Ct(h.value, () => {
          t("error", "rendering"), I();
        });
      } catch {
        t("error", "rendering");
        return;
      }
      v = Mt(c.value, I, () => {
        s.sound && K.enable(!0);
      }), document.addEventListener("visibilitychange", R), oe(), x = requestAnimationFrame(te), c.value?.focus({ preventScroll: !0 });
    }), Pa(() => {
      T = !1, cancelAnimationFrame(x), I();
    }), Sa(() => {
      T || (T = !0, o = 0, x = requestAnimationFrame(te));
    }), Ia(() => {
      Z = !0, cancelAnimationFrame(x), v?.dispose(), document.removeEventListener("visibilitychange", R), d?.dispose(), K.dispose();
    }), n({ flush: O }), (P, Q) => (w(), C("div", {
      ref_key: "root",
      ref: c,
      class: "exp-field",
      tabindex: "0",
      "aria-label": l(g).controls
    }, [f("div", {
      ref_key: "canvas",
      ref: h,
      class: "exp-canvas"
    }, null, 512), e.run?.phase === "battle" && !e.paused ? (w(), C("div", zt, [f("div", {
      class: "exp-stick",
      role: "group",
      "aria-label": l(g).touchMove,
      onPointerdown: Be(ee, ["prevent"]),
      onPointermove: Be(ie, ["prevent"]),
      onPointerup: ve,
      onPointercancel: ve,
      onLostpointercapture: ve
    }, [f("span", { style: Ae({ transform: `translate(${u.value.x}px, ${u.value.y}px)` }) }, null, 4), Q[2] || (Q[2] = f("i", { "aria-hidden": "true" }, null, -1))], 40, $t), f("div", Zt, [f("button", {
      type: "button",
      "aria-label": l(g).dash,
      class: ze({ "is-cooling": i.value.dash > 0 }),
      onPointerdown: Q[0] || (Q[0] = Be((q) => _e(), ["prevent"])),
      onClick: _e
    }, [
      N(L, { name: "dash" }),
      f("span", null, k(i.value.dash ? (i.value.dash / l(z).hz).toFixed(1) : l(g).dash), 1),
      f("kbd", null, k(l(g).dashKey), 1)
    ], 42, Rt), f("button", {
      type: "button",
      "aria-label": l(g).skill,
      class: ze({ "is-cooling": i.value.skill > 0 }),
      onPointerdown: Q[1] || (Q[1] = Be((q) => xe(), ["prevent"])),
      onClick: xe
    }, [
      N(L, { name: e.run.weapon }, null, 8, ["name"]),
      f("span", null, k(i.value.skill ? (i.value.skill / l(z).hz).toFixed(1) : l(g).skill), 1),
      f("kbd", null, k(l(g).skillKey), 1)
    ], 42, Lt)])])) : j("", !0)], 8, Tt));
  }
}), Ht = Bt, Nt = ["data-zone"], Ot = { class: "exp-hud" }, jt = {
  key: 0,
  class: "exp-health"
}, qt = [
  "aria-label",
  "aria-valuenow",
  "aria-valuemax"
], Wt = ["aria-label"], Ft = { key: 0 }, Gt = ["aria-label"], Kt = { class: "exp-tools" }, Dt = ["aria-label", "aria-pressed"], Qt = ["aria-label"], Vt = ["aria-label"], Ut = ["aria-label"], Yt = {
  key: 0,
  class: "exp-notice",
  role: "alert"
}, Xt = ["disabled"], Jt = ["disabled"], en = [
  "aria-label",
  "aria-valuenow",
  "aria-valuemax"
], an = {
  key: 2,
  class: "exp-wave"
}, tn = {
  key: 3,
  class: "exp-encounter",
  "aria-hidden": "true"
}, nn = {
  key: 4,
  class: "exp-camp"
}, sn = { class: "exp-title" }, ln = { class: "exp-camp-location" }, rn = { class: "exp-camp-relics" }, on = ["disabled"], cn = { class: "exp-camp-loadout" }, un = ["aria-label"], dn = [
  "disabled",
  "aria-pressed",
  "title",
  "onClick"
], pn = { key: 0 }, fn = { class: "exp-weapon-detail" }, hn = {
  key: 0,
  class: "exp-next-unlock"
}, vn = { class: "exp-camp-options" }, mn = ["aria-label"], yn = [
  "disabled",
  "aria-pressed",
  "aria-label",
  "title",
  "onClick"
], gn = ["aria-label"], Mn = {
  key: 1,
  class: "exp-oaths"
}, kn = ["checked", "onChange"], xn = { key: 0 }, bn = ["disabled"], wn = { class: "exp-free" }, _n = { class: "exp-screen-heading" }, Cn = ["aria-label"], An = { key: 1 }, En = { class: "exp-section-label" }, Sn = { class: "exp-route-options" }, In = [
  "disabled",
  "data-route",
  "onClick"
], Pn = { class: "exp-decision-content" }, Tn = { class: "exp-screen-heading" }, zn = {
  key: 0,
  class: "exp-prize",
  role: "status"
}, $n = { key: 0 }, Zn = { class: "exp-relic-options" }, Rn = [
  "disabled",
  "data-relic",
  "onClick"
], Ln = { class: "exp-relic-art" }, Bn = { class: "exp-relic-family" }, Hn = {
  key: 1,
  class: "exp-muted"
}, Nn = ["disabled"], On = { class: "exp-screen-heading" }, jn = ["disabled"], qn = ["disabled"], Wn = ["disabled"], Fn = { class: "exp-decision-content" }, Gn = { class: "exp-screen-heading" }, Kn = { class: "exp-result-stats" }, Dn = { class: "exp-prize" }, Qn = { class: "exp-result-build" }, Vn = { class: "exp-muted" }, Un = {
  key: 6,
  class: "exp-pause-overlay"
}, Yn = { class: "exp-panel" }, Xn = { class: "exp-muted" }, Jn = ["disabled"], es = {
  key: 7,
  class: "exp-keyboard-hint"
}, as = ["aria-label"], ts = ["aria-label"], ns = ["aria-label"], ss = { class: "exp-inventory" }, is = ["disabled", "onClick"], ls = { class: "exp-muted" }, rs = { key: 0 }, os = { class: "exp-inventory" }, cs = ["disabled"], us = { class: "exp-collection" }, ds = { key: 0 }, ps = { key: 0 }, fs = { class: "exp-list" }, hs = /* @__PURE__ */ la({
  __name: "ExpeditionRoom",
  props: {
    bridge: {},
    chatIdentity: {},
    generationActive: { type: Boolean }
  },
  setup(e) {
    const n = e, a = gt(n.bridge, n.chatIdentity), { view: s, busy: t, notice: c, blocked: h, failed: u } = a, i = le(() => s.value?.data.active ?? null), d = X("blade"), v = X(0), y = X([]), M = X(!0), x = X(!1), o = X(null), r = X(null), p = X(null), _ = X(null), b = X(null), S = X(null), T = X(0), Z = X(!0);
    let K = !1;
    const oe = Object.keys(pe), ae = le(() => i.value && !ea(i.value)), O = le(() => !Z.value && i.value?.phase === "battle"), A = le(() => M.value || Z.value || n.generationActive || !!c.value || !!r.value || !!S.value), I = le(() => o.value?.enemies.find((B) => ne(B.kind))), R = le(() => O.value && o.value ? o.value.player.hp : i.value?.hp ?? z.maxHp), te = le(() => i.value?.relics.length === z.relicSlots), D = le(() => i.value ? pt(i.value) : 0), ie = le(() => Te[Oe[D.value]]), ee = le(() => s.value && oe.find((B) => !Le(s.value.data, B))), ve = le(() => s.value?.data.awards.filter((B) => B.actionId === s.value?.data.last?.id) ?? []), _e = le(() => s.value?.data.awards.filter((B) => B.runId === i.value?.id).reduce((B, E) => B + E.amount, 0) ?? 0), xe = le(() => {
      if (!ve.value.length || i.value?.phase !== "reward" || !i.value.battle?.boss) return [];
      const B = i.value.battle.zone;
      return [...oe.filter((E) => pe[E].unlock === B).map((E) => ge[E].name), xa[B + 1]];
    });
    Ra(b, () => {
      r.value = null, p.value = null;
    }), Za(() => r.value || p.value ? (r.value = null, p.value = null, !0) : Z.value ? !1 : (M.value = !0, Z.value = !0, !0)), Ne(() => n.generationActive, (B) => {
      B && (M.value = !0);
    }), Ne(() => i.value?.phase, (B) => {
      B !== "battle" && (o.value = null);
    });
    function P(B) {
      y.value = y.value.includes(B) ? y.value.filter((E) => E !== B) : [...y.value, B];
    }
    async function Q() {
      await a.act({
        type: "start",
        weapon: d.value,
        cloak: v.value,
        oaths: y.value
      }) && (Z.value = !1, M.value = !1);
    }
    async function q(B) {
      await a.act({
        type: "route",
        id: B
      }) && (M.value = !1);
    }
    async function ce(B, E = null) {
      if (te.value && E === null) {
        p.value = B;
        return;
      }
      await a.act({
        type: "relic",
        id: B,
        replace: E
      }) && (p.value = null);
    }
    async function ue() {
      await a.recover() && (T.value++, M.value = !0);
    }
    async function Me() {
      r.value = null, await _.value?.flush(), await a.act({ type: "abandon" }) && (Z.value = !0);
    }
    async function be() {
      await a.read() && T.value++;
    }
    function $() {
      Z.value = !1, M.value = !1;
    }
    function Se(B) {
      M.value = !0, r.value = B;
    }
    return Ea(async () => {
      await a.read(), K = !0;
    }), Sa(() => {
      K && be();
    }), Pa(() => {
      M.value = !0;
    }), Ia(a.dispose), (B, E) => (w(), C("section", {
      class: ze(["exp-app", {
        "exp-is-battle": O.value,
        "exp-is-camp": Z.value,
        "exp-is-between": !Z.value && !O.value
      }]),
      "data-zone": D.value
    }, [
      (w(), Ce(Ht, {
        key: T.value,
        ref_key: "field",
        ref: _,
        run: i.value,
        client: l(a),
        paused: A.value,
        camp: Z.value,
        "generation-active": e.generationActive,
        weapon: ae.value ? i.value.weapon : d.value,
        cloak: ae.value ? i.value.cloak : v.value,
        sound: x.value,
        onPause: E[0] || (E[0] = (m) => M.value = !0),
        onError: E[1] || (E[1] = (m) => S.value = m),
        onHud: E[2] || (E[2] = (m) => o.value = m)
      }, null, 8, [
        "run",
        "client",
        "paused",
        "camp",
        "generation-active",
        "weapon",
        "cloak",
        "sound"
      ])),
      f("header", Ot, [!Z.value && i.value ? (w(), C("div", jt, [
        f("span", null, k(l(g).progress(l(Pe)[D.value], i.value.step % l(z).zoneSteps)), 1),
        f("div", {
          class: "exp-health-track",
          role: "progressbar",
          "aria-label": l(g).hp,
          "aria-valuenow": Math.ceil(R.value),
          "aria-valuemin": 0,
          "aria-valuemax": l(z).maxHp
        }, [f("i", { style: Ae({ width: R.value / l(z).maxHp * 100 + "%" }) }, null, 4), f("b", null, [se(k(Math.ceil(R.value)), 1), f("small", null, " / " + k(l(z).maxHp), 1)])], 8, qt),
        f("small", { "aria-label": l(g).shards + " " + i.value.shards }, [
          N(L, { name: "shrine" }),
          se(k(i.value.shards) + " ", 1),
          l(t) ? (w(), C("span", Ft, " · " + k(l(g).saving), 1)) : j("", !0)
        ], 8, Wt)
      ])) : (w(), C("span", {
        key: 1,
        class: "exp-wallet",
        "aria-label": l(s) ? l(g).wallet(l(s).balance) : l(g).preparing
      }, [N(L, { name: "coin" }), se(k(l(s) ? l(s).balance : l(g).preparing), 1)], 8, Gt)), f("nav", Kt, [
        f("button", {
          type: "button",
          "aria-label": l(g).sound,
          "aria-pressed": x.value,
          onClick: E[3] || (E[3] = (m) => x.value = !x.value)
        }, [N(L, { name: x.value ? "sound" : "mute" }, null, 8, ["name"])], 8, Dt),
        Z.value ? j("", !0) : (w(), C("button", {
          key: 0,
          type: "button",
          "aria-label": l(g).equipment,
          onClick: E[4] || (E[4] = (m) => Se("bag"))
        }, [N(L, { name: "bag" })], 8, Qt)),
        O.value ? (w(), C("button", {
          key: 1,
          type: "button",
          "aria-label": l(g).pause,
          onClick: E[5] || (E[5] = (m) => M.value = !0)
        }, [N(L, { name: "pause" })], 8, Vt)) : (w(), C("button", {
          key: 2,
          type: "button",
          "aria-label": l(g).archive,
          onClick: E[6] || (E[6] = (m) => Se("journal"))
        }, [N(L, { name: "journal" })], 8, Ut))
      ])]),
      l(c) || S.value || e.generationActive ? (w(), C("aside", Yt, [
        f("p", null, k(S.value ? l(g).presentationError[S.value] : l(c) || l(g).story), 1),
        l(c) || l(u) ? (w(), C("button", {
          key: 0,
          type: "button",
          disabled: l(t) || e.generationActive,
          onClick: ue
        }, k(l(g).retry), 9, Xt)) : j("", !0),
        l(s)?.writeState === "conflict" || !l(s) ? (w(), C("button", {
          key: 1,
          type: "button",
          disabled: l(t),
          onClick: be
        }, k(l(g).refresh), 9, Jt)) : j("", !0),
        S.value === "sound" ? (w(), C("button", {
          key: 2,
          type: "button",
          onClick: E[7] || (E[7] = (m) => {
            x.value = !1, S.value = null;
          })
        }, k(l(g).close), 1)) : j("", !0)
      ])) : j("", !0),
      I.value && !Z.value ? (w(), C("div", {
        key: 1,
        class: "exp-boss",
        role: "progressbar",
        "aria-label": l(Te)[I.value.kind],
        "aria-valuenow": Math.ceil(I.value.hp),
        "aria-valuemin": 0,
        "aria-valuemax": Math.ceil(I.value.maxHp)
      }, [f("span", null, [
        N(L, { name: "boss" }),
        se(k(l(Te)[I.value.kind]), 1),
        f("small", null, k(l(g).bossPhase(I.value.phase)), 1)
      ]), f("div", null, [f("i", { style: Ae({ width: I.value.hp / I.value.maxHp * 100 + "%" }) }, null, 4)])], 8, en)) : o.value && O.value ? (w(), C("span", an, k(l(g).wave(o.value.wave, o.value.waves)), 1)) : j("", !0),
      O.value && o.value && o.value.tick < 54 && !A.value ? (w(), C("div", tn, [f("small", null, k(l(g).chapter(D.value)), 1), f("strong", null, k(I.value ? l(Te)[I.value.kind] : l(Pe)[D.value]), 1)])) : j("", !0),
      Z.value && l(s) ? (w(), C("section", nn, [f("div", sn, [f("span", null, k(l(g).titleFirst), 1), f("span", null, k(l(g).titleSecond), 1)]), ae.value ? (w(), C(F, { key: 0 }, [
        f("p", ln, [se(k(l(Pe)[D.value]), 1), f("span", null, k(l(ge)[i.value.weapon].name), 1)]),
        f("div", rn, [(w(!0), C(F, null, de(i.value.relics, (m) => (w(), Ce(L, {
          key: m,
          name: m
        }, null, 8, ["name"]))), 128))]),
        f("button", {
          type: "button",
          class: "exp-primary",
          disabled: l(h) || e.generationActive,
          onClick: $
        }, [se(k(l(g).resume), 1), N(L, { name: "arrow" })], 8, on),
        f("button", {
          type: "button",
          class: "exp-quiet",
          onClick: E[8] || (E[8] = (m) => Se("abandon"))
        }, k(l(g).abandon), 1)
      ], 64)) : (w(), C(F, { key: 1 }, [
        f("div", cn, [
          f("div", {
            class: "exp-weapon-select",
            "aria-label": l(g).weapons
          }, [(w(!0), C(F, null, de(l(oe), (m) => (w(), C("button", {
            key: m,
            type: "button",
            disabled: !l(Le)(l(s).data, m),
            "aria-pressed": d.value === m,
            title: l(Le)(l(s).data, m) ? l(ge)[m].detail : l(g).unlockWeapon(l(Te)[l(Oe)[l(pe)[m].unlock]]),
            onClick: (Y) => d.value = m
          }, [
            N(L, { name: m }, null, 8, ["name"]),
            f("span", null, [se(k(l(ge)[m].name), 1), l(Le)(l(s).data, m) ? j("", !0) : (w(), C("small", pn, k(l(g).lockedTag), 1))]),
            l(Le)(l(s).data, m) ? j("", !0) : (w(), Ce(L, {
              key: 0,
              class: "exp-lock",
              name: "lock"
            }))
          ], 8, dn))), 128))], 8, un),
          f("p", fn, [se(k(l(ge)[d.value].detail), 1), f("span", null, k(l(ge)[d.value].skill), 1)]),
          ee.value ? (w(), C("p", hn, k(l(g).unlockReward(l(Te)[l(Oe)[l(pe)[ee.value].unlock]], l(ge)[ee.value].name)), 1)) : j("", !0),
          f("div", vn, [f("div", {
            class: "exp-cloaks",
            "aria-label": l(g).cloaks
          }, [(w(!0), C(F, null, de(l(xa), (m, Y) => (w(), C("button", {
            key: m,
            type: "button",
            disabled: Y > l(s).data.bossClears.length,
            "aria-pressed": v.value === Y,
            "aria-label": Y > l(s).data.bossClears.length ? m + " · " + l(g).unlockCloak(Y) : m,
            title: Y > l(s).data.bossClears.length ? l(g).unlockCloak(Y) : m,
            style: Ae({ "--cloak": l(Ke)[Y] }),
            onClick: (qe) => v.value = Y
          }, [E[19] || (E[19] = f("i", null, null, -1)), Y > l(s).data.bossClears.length ? (w(), Ce(L, {
            key: 0,
            name: "lock"
          })) : j("", !0)], 12, yn))), 128))], 8, mn), f("button", {
            type: "button",
            class: "exp-help-button",
            "aria-label": l(g).help,
            onClick: E[9] || (E[9] = (m) => Se("help"))
          }, [N(L, { name: "help" })], 8, gn)]),
          l(s).data.victories ? (w(), C("details", Mn, [f("summary", null, [se(k(l(g).oaths) + " ", 1), f("span", null, k(y.value.length ? "· " + y.value.length : ""), 1)]), (w(!0), C(F, null, de(l(De), (m) => (w(), C("label", { key: m }, [
            f("input", {
              type: "checkbox",
              checked: y.value.includes(m),
              onChange: (Y) => P(m)
            }, null, 40, kn),
            f("span", null, [se(k(l(ka)[m].name), 1), f("small", null, k(l(ka)[m].detail), 1)]),
            l(s).data.oathWins.includes(m) ? (w(), C("b", xn, "✓")) : j("", !0)
          ]))), 128))])) : j("", !0)
        ]),
        f("button", {
          type: "button",
          class: "exp-primary",
          disabled: l(h) || e.generationActive,
          onClick: Q
        }, [se(k(l(g).start), 1), N(L, { name: "arrow" })], 8, bn),
        f("small", wn, k(l(g).free), 1)
      ], 64))])) : i.value && !O.value ? (w(), C("section", {
        key: 5,
        class: ze(["exp-between", {
          "exp-loot-screen": i.value.phase === "reward" || i.value.phase === "merchant",
          "exp-decision-screen": i.value.phase === "reward" || i.value.phase === "merchant" || l(ea)(i.value)
        }])
      }, [i.value.phase === "route" ? (w(), C(F, { key: 0 }, [
        f("header", _n, [
          f("small", null, k(l(g).chapter(D.value)), 1),
          f("h2", null, k(l(Pe)[D.value]), 1),
          f("p", null, k(l(g).nextGoal(ie.value)), 1)
        ]),
        f("ol", {
          class: "exp-map",
          "aria-label": l(g).journey
        }, [(w(!0), C(F, null, de(l(z).zoneSteps, (m) => (w(), C("li", {
          key: m,
          class: ze({
            "is-past": m - 1 < i.value.step % l(z).zoneSteps,
            "is-current": m - 1 === i.value.step % l(z).zoneSteps
          })
        }, [m === l(z).zoneSteps ? (w(), Ce(L, {
          key: 0,
          name: "boss"
        })) : (w(), C("span", An, k(m), 1))], 2))), 128))], 8, Cn),
        f("h3", En, k(l(g).route), 1),
        f("div", Sn, [(w(!0), C(F, null, de(i.value.routes, (m) => (w(), C("button", {
          key: m.id,
          type: "button",
          disabled: l(h) || e.generationActive,
          "data-route": m.kind,
          onClick: (Y) => q(m.id)
        }, [
          N(L, { name: m.kind }, null, 8, ["name"]),
          f("span", null, [f("strong", null, k(m.kind === "boss" ? ie.value : l(Je)[m.kind].name), 1), f("small", null, k(l(Je)[m.kind].detail), 1)]),
          N(L, {
            class: "exp-option-arrow",
            name: "arrow"
          })
        ], 8, In))), 128))])
      ], 64)) : i.value.phase === "reward" || i.value.phase === "merchant" ? (w(), C(F, { key: 1 }, [f("div", Pn, [
        f("header", Tn, [f("small", null, k(i.value.phase === "merchant" ? l(Pe)[D.value] : i.value.battle?.boss ? l(g).bossDefeated(ie.value) : l(g).victory), 1), f("h2", null, k(i.value.phase === "reward" ? l(g).reward : l(g).merchant), 1)]),
        ve.value.length ? (w(), C("div", zn, [N(L, { name: "coin" }), f("div", null, [f("strong", null, k(l(g).earned(ve.value.reduce((m, Y) => m + Y.amount, 0))), 1), xe.value.length ? (w(), C("small", $n, k(l(g).newUnlocks(xe.value)), 1)) : j("", !0)])])) : j("", !0),
        f("div", Zn, [(w(!0), C(F, null, de(i.value.offers, (m) => (w(), C("button", {
          key: m,
          type: "button",
          disabled: l(h) || e.generationActive || i.value.phase === "merchant" && i.value.shards < l(z).shopCost,
          "data-relic": m,
          style: Ae({ "--relic": l(aa)[m] }),
          onClick: (Y) => ce(m)
        }, [f("div", Ln, [N(L, { name: m }, null, 8, ["name"])]), f("span", null, [
          f("small", Bn, k(l(ye)[m].family), 1),
          f("strong", null, k(l(ye)[m].name), 1),
          f("small", null, k(l(ye)[m].detail), 1)
        ])], 12, Rn))), 128))]),
        i.value.phase === "merchant" ? (w(), C("p", Hn, k(l(g).buy(l(z).shopCost)) + " · " + k(i.value.shards < l(z).shopCost ? l(g).noShards : l(g).shards + " " + i.value.shards), 1)) : j("", !0)
      ]), f("button", {
        type: "button",
        class: "exp-quiet",
        disabled: l(h) || e.generationActive,
        onClick: E[10] || (E[10] = (m) => l(a).act({ type: "leave" }))
      }, k(i.value.phase === "reward" ? l(g).discard : l(g).leave), 9, Nn)], 64)) : i.value.phase === "camp" || i.value.phase === "shrine" ? (w(), C(F, { key: 2 }, [
        N(L, {
          class: "exp-landmark",
          name: i.value.phase
        }, null, 8, ["name"]),
        f("header", On, [f("h2", null, k(l(Je)[i.value.phase].name), 1), f("p", null, k(i.value.phase === "camp" ? l(g).restDetail(l(ft)(i.value)) : l(g).sacrifice), 1)]),
        i.value.phase === "camp" ? (w(), C("button", {
          key: 0,
          type: "button",
          class: "exp-primary",
          disabled: l(h) || e.generationActive,
          onClick: E[11] || (E[11] = (m) => l(a).act({ type: "rest" }))
        }, [se(k(l(g).rest), 1), N(L, { name: "heart" })], 8, jn)) : (w(), C(F, { key: 1 }, [f("button", {
          type: "button",
          class: "exp-primary",
          disabled: l(h) || e.generationActive || R.value <= l(z).sacrificeHp,
          onClick: E[12] || (E[12] = (m) => l(a).act({ type: "sacrifice" }))
        }, [se(k(R.value <= l(z).sacrificeHp ? l(g).healthCost : l(g).shrine), 1), N(L, { name: "shrine" })], 8, qn), f("button", {
          type: "button",
          class: "exp-quiet",
          disabled: l(h) || e.generationActive,
          onClick: E[13] || (E[13] = (m) => l(a).act({ type: "leave" }))
        }, k(l(g).leave), 9, Wn)], 64))
      ], 64)) : l(ea)(i.value) ? (w(), C(F, { key: 3 }, [f("div", Fn, [
        N(L, {
          class: "exp-landmark",
          name: i.value.phase === "won" ? "crown" : "renewal"
        }, null, 8, ["name"]),
        f("header", Gn, [f("small", null, k(l(ge)[i.value.weapon].name), 1), f("h2", null, k(i.value.phase === "won" ? l(g).won : i.value.phase === "lost" ? l(g).lost : l(g).abandoned), 1)]),
        f("p", Kn, k(l(g).stats(i.value.kills, i.value.ticks)), 1),
        f("div", Dn, [N(L, { name: "coin" }), f("strong", null, k(l(g).gold(_e.value)), 1)]),
        f("div", Qn, [(w(!0), C(F, null, de(i.value.relics, (m) => (w(), Ce(L, {
          key: m,
          name: m
        }, null, 8, ["name"]))), 128))]),
        f("p", Vn, k(l(g).resultDetail), 1)
      ]), f("button", {
        type: "button",
        class: "exp-primary",
        onClick: E[14] || (E[14] = (m) => Z.value = !0)
      }, [se(k(l(g).return), 1), N(L, { name: "arrow" })])], 64)) : j("", !0)], 2)) : j("", !0),
      O.value && A.value && !r.value && !l(c) && !S.value ? (w(), C("div", Un, [f("section", Yn, [
        N(L, {
          class: "exp-pause-emblem",
          name: "pause"
        }),
        f("h2", null, k(l(g).paused), 1),
        f("p", Xn, k(l(g).controls), 1),
        f("p", null, k(l(ge)[i.value.weapon].skill), 1),
        f("button", {
          type: "button",
          class: "exp-primary",
          disabled: l(h) || e.generationActive,
          onClick: E[15] || (E[15] = (m) => M.value = !1)
        }, [se(k(l(g).continue), 1), N(L, { name: "arrow" })], 8, Jn),
        f("button", {
          type: "button",
          class: "exp-quiet",
          onClick: E[16] || (E[16] = (m) => Z.value = !0)
        }, k(l(g).return), 1)
      ])])) : j("", !0),
      O.value && !A.value ? (w(), C("div", es, [se(k(l(g).moveKeys), 1), f("span", null, k(l(g).autoAttack), 1)])) : j("", !0),
      O.value && i.value.relics.length ? (w(), C("div", {
        key: 8,
        class: "exp-equipped-strip",
        "aria-label": l(g).equipped
      }, [(w(!0), C(F, null, de(i.value.relics, (m) => (w(), Ce(L, {
        key: m,
        name: m
      }, null, 8, ["name"]))), 128))], 8, as)) : j("", !0),
      r.value || p.value ? (w(), C("div", {
        key: 9,
        class: "exp-modal-wrap",
        onClick: E[18] || (E[18] = Be((m) => {
          r.value = null, p.value = null;
        }, ["self"]))
      }, [f("section", {
        ref_key: "dialog",
        ref: b,
        class: "exp-modal exp-panel",
        role: "dialog",
        "aria-modal": "true",
        tabindex: "-1",
        "aria-label": p.value ? l(g).replace : r.value === "journal" ? l(g).archive : r.value === "bag" ? l(g).equipment : r.value === "help" ? l(g).help : l(g).abandon
      }, [f("header", null, [f("h2", null, k(p.value ? l(g).replace : r.value === "journal" ? l(g).archive : r.value === "bag" ? l(g).equipment : r.value === "help" ? l(g).help : l(g).abandon), 1), f("button", {
        type: "button",
        "aria-label": l(g).close,
        onClick: E[17] || (E[17] = (m) => {
          r.value = null, p.value = null;
        })
      }, [N(L, { name: "close" })], 8, ns)]), p.value ? (w(), C(F, { key: 0 }, [f("p", null, k(l(ye)[p.value].name), 1), f("div", ss, [(w(!0), C(F, null, de(i.value.relics, (m) => (w(), C("button", {
        key: m,
        type: "button",
        disabled: l(h),
        style: Ae({ "--relic": l(aa)[m] }),
        onClick: (Y) => ce(p.value, m)
      }, [N(L, { name: m }, null, 8, ["name"]), f("span", null, [f("strong", null, k(l(ye)[m].name), 1), f("small", null, k(l(ye)[m].detail), 1)])], 12, is))), 128))])], 64)) : r.value === "bag" ? (w(), C(F, { key: 1 }, [
        f("p", ls, k(l(g).slots(i.value?.relics.length ?? 0)), 1),
        i.value?.relics.length ? j("", !0) : (w(), C("p", rs, k(l(g).noRelics), 1)),
        f("ul", os, [(w(!0), C(F, null, de(i.value?.relics, (m) => (w(), C("li", {
          key: m,
          style: Ae({ "--relic": l(aa)[m] })
        }, [N(L, { name: m }, null, 8, ["name"]), f("span", null, [f("strong", null, k(l(ye)[m].name), 1), f("small", null, k(l(ye)[m].detail), 1)])], 4))), 128))])
      ], 64)) : r.value === "help" ? (w(), C(F, { key: 2 }, [
        f("p", null, k(l(g).controls), 1),
        f("p", null, k(l(g).autoAttack), 1),
        f("p", null, k(l(g).lootPool), 1),
        f("p", null, k(l(g).checkpoint), 1),
        f("p", null, k(l(g).rewardRule), 1)
      ], 64)) : r.value === "abandon" ? (w(), C(F, { key: 3 }, [f("p", null, k(l(g).abandonBody), 1), f("button", {
        type: "button",
        class: "exp-primary",
        disabled: l(h) || e.generationActive,
        onClick: Me
      }, k(l(g).confirm), 9, cs)], 64)) : r.value === "journal" && l(s) ? (w(), C(F, { key: 4 }, [
        f("h3", null, k(l(g).discoveries) + " " + k(l(s).data.discoveries.length) + " / " + k(l(ta).length), 1),
        f("ul", us, [(w(!0), C(F, null, de(l(ta), (m) => (w(), C("li", {
          key: m,
          class: ze({ "is-unknown": !l(s).data.discoveries.includes(m) })
        }, [
          N(L, { name: l(s).data.discoveries.includes(m) ? m : "lock" }, null, 8, ["name"]),
          f("strong", null, k(l(s).data.discoveries.includes(m) ? l(ye)[m].name : l(g).unknown), 1),
          l(s).data.discoveries.includes(m) ? (w(), C("small", ds, k(l(ye)[m].detail), 1)) : j("", !0)
        ], 2))), 128))]),
        f("h3", null, k(l(g).history), 1),
        l(s).data.records.length ? j("", !0) : (w(), C("p", ps, k(l(g).journalEmpty), 1)),
        f("ul", fs, [(w(!0), C(F, null, de(l(s).data.records, (m) => (w(), C("li", { key: m.id }, [f("strong", null, k(l(ge)[m.weapon].name) + " · " + k(m.outcome === "won" ? l(g).mastered : l(Pe)[Math.floor(m.step / l(z).zoneSteps)]), 1), f("small", null, k(l(g).stats(m.kills, m.ticks)), 1)]))), 128))])
      ], 64)) : j("", !0)], 8, ts)])) : j("", !0)
    ], 10, Nt));
  }
}), ks = hs;
export {
  ks as default
};
