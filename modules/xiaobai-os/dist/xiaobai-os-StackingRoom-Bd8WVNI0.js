/* eslint-disable */
import { $ as tt, D as wt, G as Le, I as $, N as kt, O as xt, Q as H, R as _t, S as vt, _ as B, at as E, b as $e, g as G, j as St, k as Mt, l as Et, m as k, nt as n, p as U, rt as Ct, u as _e, x as at } from "./xiaobai-os-runtime-dom.esm-bundler-C2atLQPd.js";
import { i as It, r as Rt } from "./xiaobai-os-app-navigation-5cBwNoCT.js";
import { C as Tt, Ct as At, J as Be, S as Y, Y as Lt, Z as $t, _ as nt, _t as ft, d as ot, h as Bt, it as zt, jt as Ot, kt as Pt, l as qt, n as Nt, o as pt, q as Gt, t as Dt, vt as Vt } from "./xiaobai-os-RoundedBoxGeometry-Bku_-j4f.js";
import { n as Wt, t as jt } from "./xiaobai-os-model-DIvRHoyh.js";
import { a as Z, c as Ht, i as ae, n as st, o as Ft, r as rt, s as lt, t as p } from "./xiaobai-os-copy-BjKOpD_F.js";
import { t as Ut } from "./xiaobai-os-BufferGeometryUtils-CkG6G2OV.js";
function Yt() {
  return {
    placed: [],
    supports: [],
    failure: null,
    weak: -1
  };
}
function ht(e) {
  const t = e.placed.at(-1);
  if (!t) return {
    left: -Z.groundWidth / 2,
    right: Z.groundWidth / 2,
    y: 0
  };
  const r = ae[t.kind], s = t.x + r.offset * t.direction;
  return {
    left: s - r.top / 2,
    right: s + r.top / 2,
    y: t.y + r.height
  };
}
function mt(e) {
  return Number.isSafeInteger(e.x) && Math.abs(e.x) <= Z.rail && (e.direction === 1 || e.direction === -1);
}
function Kt(e, t, r) {
  if (e.failure || e.placed.length >= Z.houses || !mt(r)) throw new Error("stacking_invalid");
  const s = ae[t], o = ht(e), v = [...e.placed, {
    ...r,
    kind: t,
    y: o.y,
    left: Math.max(o.left, r.x - s.foot / 2),
    right: Math.min(o.right, r.x + s.foot / 2)
  }], d = v.at(-1);
  let l = d.right <= d.left ? "miss" : d.right - d.left < Z.contact ? "contact" : null, h = 0, f = 0;
  const m = [];
  for (let c = v.length - 1; c >= 0; c--) {
    const a = v[c], u = ae[a.kind];
    h += u.mass, f += u.mass * (a.x + u.center * a.direction);
    const _ = f / h, S = Math.min(_ - a.left, a.right - _) - Z.margin;
    m.unshift({
      index: c,
      center: _,
      margin: S,
      ratio: S / Math.max(1, (a.right - a.left) / 2 - Z.margin)
    }), S <= 0 && (l ??= "balance");
  }
  const w = m.reduce((c, a) => a.ratio < m[c].ratio ? a.index : c, 0);
  return {
    placed: v,
    supports: m,
    failure: l,
    weak: w
  };
}
function Oe(e) {
  let t = e >>> 0;
  function r() {
    return t = Math.imul(t, 1664525) + 1013904223 >>> 0, t / 4294967296;
  }
  const s = [
    [
      "wide",
      "wide",
      "loft"
    ],
    [
      "wide",
      "balcony",
      "balcony",
      "loft"
    ],
    [
      "step",
      "loft",
      "balcony"
    ],
    [
      "step",
      "balcony",
      "loft",
      "step"
    ]
  ];
  return Array.from({ length: Z.houses }, (o, v) => {
    const d = s[Ht(v)];
    return d[Math.floor(r() * d.length)];
  });
}
function ie(e) {
  throw Object.assign(/* @__PURE__ */ new Error(`stacking_${e}`), { code: `stacking_${e}` });
}
function He(e) {
  let t = Yt();
  const r = Oe(e.seed);
  for (const s of e.moves) t = Kt(t, r[t.placed.length], s);
  return t;
}
function it(e) {
  const t = He(e);
  return t.placed.length - +!!t.failure;
}
function ze(e) {
  if (e.end) return e.end === "cashout" ? "cashed" : "abandoned";
  const t = He(e);
  return t.failure ? "lost" : t.placed.length === Z.houses ? "won" : "playing";
}
function Xt(e) {
  return (!e || typeof e != "object" || Array.isArray(e)) && ie("invalid"), e;
}
function ct(e) {
  return (typeof e != "string" || !/^[a-zA-Z0-9_-]{1,100}$/.test(e)) && ie("identity"), e;
}
function Jt() {
  return [...crypto.getRandomValues(new Uint32Array(4))].map((e) => e.toString(16).padStart(8, "0")).join("");
}
function Qt(e) {
  const t = Xt(e);
  switch (t.type) {
    case "start":
    case "cashout":
    case "abandon":
      return { type: t.type };
    case "drop": {
      const r = {
        x: t.x,
        direction: t.direction
      };
      return mt(r) || ie("invalid"), {
        type: "drop",
        ...r
      };
    }
    default:
      return ie("invalid");
  }
}
function Zt(e, t, r) {
  const s = tt(null), o = H(!1), v = H(""), d = H(!1), l = tt(null), h = H(!1);
  let f = !1, m = null;
  const w = U(() => o.value || h.value || !!l.value || !s.value?.ready || s.value.writeState !== "ready" || s.value.pending);
  function c(I) {
    f || (s.value = I);
  }
  function a() {
    const I = r.read(), R = s.value;
    !I || !R?.ready || (R.active?.id === I.runId && R.revision === I.request.revision ? l.value = I.request : R.writeState === "ready" && !R.pending && r.clear());
  }
  async function u(I, R) {
    if (f || o.value) return !1;
    o.value = !0, m = null, d.value = !!R && "command" in R && R.command.type === "start", v.value = "";
    try {
      I === "act" && R && "command" in R && R.command.type !== "start" && s.value?.active && (l.value = R, r.write({
        runId: s.value.active.id,
        request: R
      }));
      const O = await e.request(`game/stacking/${I}`, {
        chatIdentity: t,
        ...R
      }, 35e3), C = m;
      return c(C && C.revision >= O.result.revision ? C : O.result), a(), h.value = !1, s.value?.writeState === "ready" && !s.value.pending && (!l.value || s.value.revision > l.value.revision) && (l.value = null), !0;
    } catch (O) {
      if (!f) {
        if (m && c(m), I === "sound") throw O;
        v.value = rt(O);
        const C = O && typeof O == "object" && "code" in O ? String(O.code) : O instanceof Error ? O.message : "";
        if (C === "stacking_recovery" && (h.value = !0), R && "command" in R && (C.startsWith("stacking_save_") || C.startsWith("host_request_"))) l.value = R;
        else if (I === "act" && C !== "stacking_recovery") try {
          r.clear(), l.value = null;
        } catch (b) {
          h.value = !0, v.value = rt(b);
        }
      }
      return !1;
    } finally {
      f || (o.value = !1, d.value = !1);
    }
  }
  const _ = e.subscribe((I) => {
    if (f || I.type !== "game/stacking/state") return;
    const R = I.payload;
    R.chatIdentity === t && (o.value ? m = R.state : c(R.state));
  });
  async function S() {
    let I = l.value;
    !await u("confirm") || !s.value || s.value.writeState !== "ready" || s.value.pending || (I ??= l.value, I && s.value.revision === I.revision && await u("act", I));
  }
  return {
    view: s,
    busy: o,
    error: v,
    generating: d,
    blocked: w,
    failed: l,
    notice: U(() => v.value || (h.value ? p.recoveryProblem : s.value?.writeState === "conflict" ? p.conflict : s.value?.pending || s.value?.writeState === "unconfirmed" ? p.saveProblem : "")),
    read: () => u("read"),
    recover: S,
    setSoundEnabled: (I) => u("sound", { enabled: I }),
    act: (I) => w.value ? Promise.resolve(!1) : u("act", {
      actionId: Jt(),
      revision: s.value.revision,
      command: I
    }),
    dispose() {
      f = !0, _();
    }
  };
}
var ea = {
  chalk: {
    roughness: 0.88,
    metalness: 0
  },
  enamel: {
    roughness: 0.4,
    metalness: 0.03
  },
  glass: {
    roughness: 0.23,
    metalness: 0.15
  },
  metal: {
    roughness: 0.38,
    metalness: 0.35
  },
  light: {
    roughness: 0.55,
    metalness: 0,
    emissiveIntensity: 0.55
  },
  cloud: {
    roughness: 1,
    metalness: 0
  }
};
function ta() {
  const e = {
    box: new Dt(1, 1, 1, 2, 0.055),
    flat: new pt(1, 1, 1),
    sphere: new At(1, 24, 16),
    rod: new Bt(1, 1, 1, 16),
    ring: new Pt(1, 0.1, 8, 24)
  }, t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Set();
  function s(d, l = "chalk") {
    const h = `${d}:${l}`;
    return t.has(h) || t.set(h, new $t({
      color: d,
      ...ea[l],
      emissive: l === "light" ? d : 0
    })), t.get(h);
  }
  function o(d, l, h, f, m, w = "chalk") {
    const c = new Be(e[l], s(h, w));
    return c.scale.set(...f), c.position.set(...m), c.castShadow = w !== "cloud", c.receiveShadow = w !== "light", d.add(c), c;
  }
  function v(d) {
    d.updateWorldMatrix(!0, !0);
    const l = d.matrixWorld.clone().invert(), h = /* @__PURE__ */ new Map();
    d.traverse((w) => {
      if (!(w instanceof Be)) return;
      const c = w.geometry.index ? w.geometry.toNonIndexed() : w.geometry.clone();
      c.applyMatrix4(new Gt().multiplyMatrices(l, w.matrixWorld));
      const a = w.material, u = h.get(a) ?? [];
      u.push(c), h.set(a, u);
    }), d.clear();
    const f = [], m = [];
    for (const [w, c] of h) {
      const a = Ut(c);
      if (c.forEach((_) => _.dispose()), !a) throw new Error("stacking_geometry_merge");
      r.add(a), f.push(a);
      const u = new Be(a, w);
      u.castShadow = !0, u.receiveShadow = !0, d.add(u), m.push(u);
    }
    return {
      root: d,
      replace(w, c) {
        m.forEach((a) => {
          a.material === w && (a.material = c);
        });
      },
      dispose() {
        f.forEach((w) => {
          r.delete(w) && w.dispose();
        });
      }
    };
  }
  return {
    mesh: o,
    material: s,
    batch: v,
    dispose() {
      r.forEach((d) => d.dispose()), r.clear(), Object.values(e).forEach((d) => d.dispose()), t.forEach((d) => d.dispose()), t.clear();
    }
  };
}
function aa(e) {
  const t = [];
  function r() {
    const s = [];
    for (; t.length; ) try {
      t.pop()();
    } catch (o) {
      s.push(o);
    }
    if (s.length) throw new AggregateError(s, "stacking_scene_dispose");
  }
  try {
    return e({
      own(s) {
        return t.push(() => s.dispose()), s;
      },
      defer(s) {
        t.push(s);
      },
      dispose: r
    });
  } catch (s) {
    try {
      r();
    } catch (o) {
      throw new AggregateError([s, o], "stacking_scene_initialization");
    }
    throw s;
  }
}
var g = {
  milk: Number.parseInt(Wt.fur.slice(1), 16),
  porcelain: 16777215,
  stone: 14869979,
  mint: 12179661,
  timber: 14399634,
  brass: 12818790,
  steel: 7047057,
  glass: 8632519,
  windowLight: 16768926,
  leaves: 9351072,
  rose: 15251890,
  sky: 13231599,
  horizon: 15923189,
  cloud: 16514555,
  distantCloud: 14806768,
  safe: 5675658,
  risk: 14188645
}, na = 0.25;
function Ve(e, t, r, s, o = !0) {
  const v = new Y(), d = new Y();
  v.add(d), d.scale.x = r;
  const l = ae[t], h = l.foot / 1e3, f = l.height / 1e3, m = l.top / 1e3, w = l.offset / 1e3, c = 0.572, a = (C, b, x, T = "chalk") => e.mesh(d, "box", C, b, x, T), u = t === "step" ? f * 0.59 : f - 0.14;
  a(g.milk, [
    h,
    u,
    1.12
  ], [
    0,
    u / 2,
    0
  ]), a(l.color, [
    h,
    0.1,
    1.13
  ], [
    0,
    0.06,
    0
  ], "enamel");
  for (const C of [-h / 2 + 0.065, h / 2 - 0.065]) a(g.porcelain, [
    0.1,
    u - 0.1,
    0.08
  ], [
    C,
    u / 2 + 0.03,
    c
  ]);
  t === "step" && (a(g.milk, [
    m,
    f - u - 0.12,
    1.12
  ], [
    w,
    (f + u - 0.12) / 2,
    0
  ]), a(l.color, [
    h,
    0.065,
    1.15
  ], [
    0,
    u,
    0
  ], "enamel")), a(l.color, [
    m,
    0.085,
    1.16
  ], [
    w,
    f - 0.13,
    0
  ], "enamel"), a(g.porcelain, [
    m,
    0.12,
    1.2
  ], [
    w,
    f - 0.06,
    0
  ]);
  for (const C of [-0.28, 0.28]) a(g.stone, [
    Math.min(0.36, m * 0.28),
    6e-3,
    0.75
  ], [
    w + C * m,
    f - 4e-3,
    0
  ]);
  function _(C, b, x, T, D = c) {
    a(l.color, [
      x + 0.09,
      T + 0.09,
      0.075
    ], [
      C,
      b,
      D
    ], "enamel"), a(g.glass, [
      x,
      T,
      0.035
    ], [
      C,
      b,
      D + 0.05
    ], "glass"), a(g.porcelain, [
      0.024,
      T + 0.01,
      0.026
    ], [
      C,
      b,
      D + 0.075
    ]), a(g.porcelain, [
      x + 0.025,
      0.022,
      0.025
    ], [
      C,
      b - T * 0.05,
      D + 0.075
    ]), a(g.porcelain, [
      x + 0.13,
      0.048,
      0.16
    ], [
      C,
      b - T / 2 - 0.065,
      D + 0.055
    ]);
  }
  if (t === "wide")
    _(-0.51, 0.51, 0.31, 0.37), _(0.51, 0.51, 0.31, 0.37), a(g.mint, [
      0.32,
      0.56,
      0.06
    ], [
      0,
      0.3,
      c
    ], "enamel"), a(g.glass, [
      0.2,
      0.19,
      0.025
    ], [
      0,
      0.44,
      0.617
    ], "glass"), e.mesh(d, "sphere", g.brass, [
      0.025,
      0.025,
      0.025
    ], [
      0.1,
      0.26,
      0.6419999999999999
    ], "metal"), a(g.porcelain, [
      0.42,
      0.055,
      0.24
    ], [
      0,
      0.035,
      0.622
    ]);
  else if (t === "loft") {
    _(0, 0.68, 0.48, 0.5), a(l.color, [
      0.72,
      0.09,
      0.27
    ], [
      0,
      1.01,
      0.597
    ], "enamel"), a(g.timber, [
      0.5,
      0.095,
      0.15
    ], [
      0,
      0.34,
      0.6719999999999999
    ]);
    for (const C of [
      -0.17,
      0,
      0.17
    ]) e.mesh(d, "sphere", g.leaves, [
      0.1,
      0.065,
      0.085
    ], [
      C,
      0.425,
      0.6719999999999999
    ]);
  } else if (t === "balcony") {
    _(-0.17, 0.55, 0.44, 0.41), a(l.color, [
      0.68,
      0.64,
      0.99
    ], [
      0.85,
      0.48,
      5e-3
    ], "enamel"), _(0.88, 0.53, 0.35, 0.38, 0.51), a(g.porcelain, [
      0.79,
      0.1,
      1.12
    ], [
      0.89,
      0.12,
      0.04
    ]), a(g.brass, [
      0.73,
      0.025,
      0.025
    ], [
      0.89,
      0.38,
      0.64
    ], "metal");
    for (const C of [
      0.58,
      0.79,
      1,
      1.21
    ]) a(g.porcelain, [
      0.025,
      0.22,
      0.025
    ], [
      C,
      0.25,
      0.64
    ]);
    a(g.steel, [
      0.085,
      0.12,
      0.9
    ], [
      1.13,
      0.075,
      0
    ]);
  } else
    _(-0.34, 0.3, 0.37, 0.27), _(w, 0.77, 0.39, 0.25), a(g.timber, [
      0.2,
      0.26,
      0.06
    ], [
      0.22,
      0.15,
      c
    ], "enamel");
  if (s % 3 === 1 && t === "wide") {
    a(g.brass, [
      0.65,
      0.017,
      0.017
    ], [
      -0.46,
      0.82,
      0.692
    ], "metal");
    for (const [C, b] of [[-0.62, g.rose], [-0.39, g.mint]]) a(b, [
      0.16,
      0.15,
      0.035
    ], [
      C,
      0.735,
      0.692
    ]);
  }
  const S = e.batch(d), I = e.material(g.glass, "glass"), R = e.material(g.windowLight, "light");
  function O(C) {
    S.replace(C ? I : R, C ? R : I);
  }
  return O(o), {
    root: v,
    lightWindows: O,
    dispose: S.dispose
  };
}
function oa(e) {
  const t = new Y(), r = new Y(), s = new Y(), o = new Y();
  e.mesh(t, "box", g.milk, [
    Z.groundWidth / 1e3,
    0.22,
    1.72
  ], [
    0,
    -0.11,
    0
  ]), e.mesh(t, "box", g.mint, [
    2.48,
    0.22,
    1.98
  ], [
    0,
    -0.33,
    0
  ], "enamel"), e.mesh(t, "box", g.porcelain, [
    2.65,
    0.1,
    2.12
  ], [
    0,
    -0.49,
    0
  ]);
  for (const a of [
    -0.92,
    0,
    0.92
  ]) e.mesh(t, "box", g.timber, [
    0.12,
    0.42,
    1.73
  ], [
    a,
    -0.52,
    0
  ]);
  for (const a of [-0.77, 0.77]) {
    const u = e.mesh(t, "box", g.brass, [
      0.08,
      0.6,
      0.08
    ], [
      a,
      -0.5,
      0.91
    ], "metal");
    u.rotation.z = a < 0 ? -0.55 : 0.55;
  }
  e.batch(t);
  for (let a = 0; a < 11; a++) {
    const u = a * 2.399, _ = a < 5 ? 3.6 : 7.4;
    for (let S = 0; S < 4; S++) {
      const I = a >= 5, R = I ? s : r;
      e.mesh(R, "sphere", I ? g.distantCloud : g.cloud, [
        0.92 + S * 0.13,
        0.38 + S % 3 * 0.18,
        0.84 + S * 0.08
      ], [
        Math.sin(u) * _ + S * 0.55,
        -1.2 - a % 3 * 0.35 + (S === 1 ? 0.18 : 0),
        Math.cos(u) * _ + S * 0.22
      ], "cloud");
    }
  }
  e.mesh(o, "box", g.milk, [
    8.1,
    0.16,
    0.33
  ], [
    -0.35,
    0,
    0
  ], "enamel"), e.mesh(o, "box", g.brass, [
    8.1,
    0.065,
    0.36
  ], [
    -0.35,
    0.3,
    0
  ], "metal");
  for (let a = 0; a < 15; a++) {
    const u = e.mesh(o, "box", g.timber, [
      0.035,
      0.43,
      0.06
    ], [
      -4.12 + a * 0.53,
      0.16,
      0.14
    ]);
    u.rotation.z = a % 2 ? -0.9 : 0.9;
  }
  e.batch(o);
  const v = new Y(), d = new Y(), l = new Y();
  o.add(v), v.add(d, l), e.mesh(v, "box", g.mint, [
    0.48,
    0.26,
    0.48
  ], [
    0,
    -0.12,
    0
  ], "enamel");
  for (const a of [-0.16, 0.16]) {
    const u = e.mesh(v, "rod", g.steel, [
      0.085,
      0.1,
      0.085
    ], [
      a,
      -0.03,
      0.23
    ], "metal");
    u.rotation.x = Math.PI / 2;
  }
  for (const a of [-0.11, 0.11]) e.mesh(d, "rod", g.steel, [
    0.012,
    1,
    0.012
  ], [
    a,
    -0.5,
    0
  ], "metal");
  e.mesh(l, "box", g.brass, [
    0.52,
    0.09,
    0.23
  ], [
    0,
    0,
    0
  ], "metal");
  const h = [-1, 1].map((a) => ({
    jaw: e.mesh(l, "box", g.steel, [
      0.045,
      0.16,
      0.16
    ], [
      a * 0.22,
      -0.09,
      0
    ], "metal"),
    direction: a
  })), f = document.createElement("canvas");
  f.width = 2, f.height = 128;
  const m = f.getContext("2d");
  if (!m) throw new Error("stacking_sky_canvas");
  const w = m.createLinearGradient(0, 0, 0, 128);
  w.addColorStop(0, new ot(g.sky).getStyle()), w.addColorStop(1, new ot(g.horizon).getStyle()), m.fillStyle = w, m.fillRect(0, 0, 2, 128);
  const c = new qt(f);
  return c.colorSpace = ft, {
    world: t,
    clouds: r,
    farClouds: s,
    crane: o,
    carriage: v,
    sky: c,
    hoist(a, u) {
      d.scale.y = a, l.position.y = -a, h.forEach(({ jaw: _, direction: S }) => {
        _.rotation.z = S * u * 0.6;
      });
    },
    dispose() {
      c.dispose();
    }
  };
}
function sa(e) {
  const t = e.position.clone(), r = e.scale.clone();
  function s() {
    e.position.copy(t), e.scale.copy(r), e.rotation.set(0, 0, 0);
  }
  return {
    rest: s,
    pose(o, v, d) {
      s();
      const l = Math.max(0, Math.min(1, v));
      if (e.rotation.y = Math.max(-0.45, Math.min(0.45, d)), o === "watch" && (e.rotation.x = -0.075), o === "careful" && (e.rotation.z = -0.07, e.scale.y *= 0.95, e.position.y -= 0.015), o === "happy") {
        const h = Math.sin(l * Math.PI);
        e.position.y += h * 0.14, e.rotation.z = Math.sin(l * Math.PI * 2) * 0.08 * (1 - l);
      }
      o === "sad" && (e.rotation.x = 0.13, e.scale.y *= 0.91, e.position.y -= 0.035);
    }
  };
}
function ra(e) {
  const t = new Y(), r = new Y(), s = new Y();
  t.add(r, s), e.mesh(r, "box", g.milk, [
    1.23,
    0.16,
    1
  ], [
    0,
    0,
    0
  ]), e.mesh(r, "box", g.mint, [
    1.15,
    0.1,
    0.94
  ], [
    0,
    -0.11,
    0
  ], "enamel");
  for (const f of [-0.53, 0.53])
    e.mesh(r, "rod", g.brass, [
      0.022,
      0.43,
      0.022
    ], [
      f,
      0.24,
      0.39
    ], "metal"), e.mesh(s, "rod", g.steel, [
      0.024,
      0.4,
      0.024
    ], [
      f,
      -0.26,
      -0.37
    ], "metal");
  e.mesh(r, "box", g.brass, [
    1.1,
    0.03,
    0.03
  ], [
    0,
    0.45,
    0.39
  ], "metal"), e.mesh(r, "box", g.steel, [
    0.28,
    0.23,
    0.25
  ], [
    0.38,
    0.22,
    0
  ], "enamel");
  const o = e.mesh(r, "rod", g.brass, [
    0.022,
    0.17,
    0.022
  ], [
    0.38,
    0.41,
    0
  ], "metal");
  o.rotation.z = -0.3, e.mesh(r, "sphere", g.rose, [
    0.052,
    0.052,
    0.052
  ], [
    0.405,
    0.48,
    0
  ]);
  const v = e.batch(r), d = e.mesh(t, "sphere", g.cloud, [
    0.7,
    0.18,
    0.52
  ], [
    0,
    -0.28,
    0
  ], "cloud"), l = jt({
    group(f, m) {
      const w = new Y();
      return w.position.set(...m), f.add(w), w;
    },
    ball(f, m, w, c) {
      return e.mesh(f, "sphere", w, m, c);
    }
  }, t, [
    -0.14,
    0.47,
    0
  ]);
  l.scale.setScalar(1.12);
  const h = sa(l);
  return {
    root: t,
    update(f, m, w, c, a) {
      t.position.set(a ? -3.27 : -1.92, a ? c + 0.5 : 0.08, a ? 0.2 : 0.85), h.pose(f, m, (w - t.position.x) * 0.045), s.visible = a, d.visible = !a;
    },
    dispose: v.dispose
  };
}
function la() {
  const e = new zt(-5, 5, 5, -5, 0.1, 160), t = new Ot();
  let r = 4.8, s = 1.9, o = 0.24, v = 1, d = 1;
  function l() {
    e.left = -r * d, e.right = r * d, e.top = r, e.bottom = -r, e.updateProjectionMatrix();
  }
  return {
    camera: e,
    resize(h, f) {
      d = Math.max(0.2, h / Math.max(1, f)), l();
    },
    update(h, f, m, w) {
      const c = Math.max(f ? (h + 2.7) / 2 : 3.8, (f ? 2.7 : 4.45) / d) * v, a = f ? h / 2 + 0.2 : Math.max(1.7, h + 1.3), u = w ? 1 : 1 - Math.exp(-m / 170);
      return r += (c - r) * u, s += (a - s) * u, t.set(-0.18, s, 0), e.position.set(Math.sin(o) * 18 - 0.18, s + 6.4, Math.cos(o) * 18), e.lookAt(t), l(), {
        center: s,
        settling: Math.abs(c - r) > 5e-3 || Math.abs(a - s) > 5e-3
      };
    },
    rotate(h) {
      o += h;
    },
    zoom(h) {
      v = Math.max(0.7, Math.min(1.5, v + h));
    }
  };
}
var q = {
  fall: 390,
  settle: 250,
  collapse: 980,
  celebration: 700,
  acknowledgement: 140
};
function ia(e) {
  let t = null, r = 0, s = !0;
  const o = /* @__PURE__ */ new Set(), v = () => s ? q.settle : 0, d = () => t === "cashed" ? q.celebration : q.fall + v() + (t === "lost" ? q.collapse : t === "won" ? q.celebration : 0);
  function l(f, m) {
    r >= m && !o.has(f) && (o.add(f), e(f));
  }
  const h = (f, m) => Math.max(0, Math.min(1, (r - f) / m));
  return {
    start(f, m = !0) {
      t = f, s = m, r = 0, o.clear();
    },
    clear() {
      t = null, r = 0, o.clear();
    },
    advance(f, m) {
      t && (r = m ? d() : Math.min(d(), r + f), t !== "cashed" && s && l("land", q.fall), t === "lost" && l("lose", q.fall + v()), (t === "won" || t === "cashed") && l("reward", t === "cashed" ? 0 : q.fall + q.settle));
    },
    sample() {
      return {
        kind: t,
        elapsed: r,
        active: t !== null && r < d(),
        fall: t === "cashed" ? 1 : h(0, q.fall),
        settle: s ? h(q.fall, q.settle) : 0,
        collapse: t === "lost" ? h(q.fall + v(), q.collapse) : 0,
        celebration: h(t === "cashed" ? 0 : q.fall, t === "won" ? q.settle + q.celebration : q.settle)
      };
    }
  };
}
var ve = {
  maxPixels: 16e5,
  maxDpr: 2,
  shadow: 1024,
  slowMs: 32,
  fastMs: 19,
  slowSamples: 90,
  fastSamples: 600
};
function ut(e, t, r, s) {
  return Math.min(r, [
    1,
    1.5,
    ve.maxDpr
  ][s], Math.sqrt(ve.maxPixels / Math.max(1, e * t)));
}
function ca() {
  let e = 2, t = 0, r = 0, s = null;
  return {
    sample(o) {
      if (o > 250) {
        t = 0, r = 0;
        return;
      }
      t = o > ve.slowMs ? t + 1 : 0, r = o < ve.fastMs ? r + 1 : 0, t >= ve.slowSamples && e > 0 && (s = e - 1), r >= ve.fastSamples && e < 2 && (s = e + 1);
    },
    boundary() {
      return s !== null && (e = s, s = null, t = 0, r = 0), e;
    },
    current: () => e
  };
}
var We = 1.2;
function ua(e, t, r, s) {
  return aa((o) => {
    const v = new Nt({
      alpha: !1,
      antialias: !0,
      powerPreference: "low-power"
    });
    o.defer(() => v.domElement.remove()), o.defer(() => v.forceContextLoss()), o.own(v), v.outputColorSpace = ft, v.toneMapping = 7, v.toneMappingExposure = 1, v.shadowMap.enabled = !0, v.shadowMap.type = 2, e.append(v.domElement);
    const d = new Vt(), l = la(), h = l.camera, f = o.own(ta()), m = o.own(oa(f)), w = o.own(ra(f)), c = new Y(), a = new Y();
    d.background = m.sky, d.add(m.world, m.clouds, m.farClouds, m.crane, c, a, w.root), d.add(new Tt(g.porcelain, g.mint, 1.85));
    const u = new nt(g.milk, 2.6);
    u.position.set(-4, 12, 8), u.castShadow = !0, o.own(u.shadow), u.shadow.mapSize.setScalar(ve.shadow), u.shadow.camera.left = -6, u.shadow.camera.right = 6, u.shadow.camera.top = 7, u.shadow.camera.bottom = -7, u.shadow.normalBias = 0.025, u.shadow.bias = -1e-4, d.add(u, u.target);
    const _ = new nt(g.sky, 0.55);
    _.position.set(5, 5, -4), d.add(_);
    const S = new Be(o.own(new pt(1, 0.012, 1.2)), o.own(new Lt({
      color: g.steel,
      transparent: !0,
      opacity: 0.2,
      depthWrite: !1
    })));
    d.add(S);
    const I = f.mesh(a, "box", g.safe, [
      1,
      0.036,
      0.025
    ], [
      0,
      0,
      0.655
    ], "enamel"), R = f.mesh(a, "sphere", g.safe, [
      0.055,
      0.055,
      0.035
    ], [
      0,
      0,
      0.68
    ], "enamel"), O = ca(), C = matchMedia("(prefers-reduced-motion: reduce)");
    let b = {
      run: null,
      direction: 1,
      overview: !0,
      enabled: !1
    }, x = null, T = [], D = null, ne = "", V = !1, ce = !1, Q = !0, oe = !1, ee = 0, te = 0, se = 0, fe = 0, pe = !1, P = !1, le = q.acknowledgement, W = null, he = !1, we = 0;
    o.defer(() => {
      V = !0, z(), Se(), D?.dispose();
    });
    const X = ia((i) => {
      i === "land" ? (s(i), x?.failure || (T.at(-1)?.lightWindows(!0), x && x.supports[x.weak]?.ratio < 0.25 && s("danger"))) : s(i);
    });
    function re() {
      if (V) return;
      const { width: i, height: L } = e.getBoundingClientRect();
      v.setPixelRatio(ut(i, L, window.devicePixelRatio || 1, O.current())), v.setSize(Math.max(1, i), Math.max(1, L), !1), l.resize(i, L);
    }
    function ke() {
      return !V && !oe && Q && !document.hidden;
    }
    function J() {
      return !!b.run && ze(b.run) === "playing" && !b.overview;
    }
    function me(i) {
      const L = te ? Math.max(0, i - te) : 0;
      return te = i, ke() && b.enabled && J() && !P && !W && (se += L / 1e3), L;
    }
    function ge(i) {
      P !== i && (P = i, r(i));
    }
    function be() {
      x && T.forEach((i, L) => {
        const A = x.placed[L];
        i.root.position.set(A.x / 1e3, A.y / 1e3, 0), i.root.rotation.set(0, 0, 0), i.root.scale.setScalar(1), i.root.visible = !(x.failure && L === T.length - 1);
      });
    }
    function Se() {
      T.forEach((i) => {
        c.remove(i.root), i.dispose();
      }), T = [];
    }
    function Me(i, L) {
      if (i && Se(), !x) {
        if (!T.length) {
          let A = 0;
          [
            "wide",
            "wide",
            "loft"
          ].forEach((F, N) => {
            const K = Ve(f, F, 1, N);
            K.root.position.set([
              0,
              0.08,
              -0.04
            ][N], A, 0), A += ae[F].height / 1e3, T.push(K), c.add(K.root);
          });
        }
        return;
      }
      for (; T.length > x.placed.length; ) {
        const A = T.pop();
        c.remove(A.root), A.dispose();
      }
      for (let A = T.length; A < x.placed.length; A++) {
        const F = x.placed[A], N = Ve(f, F.kind, F.direction, A, !(L && A === x.placed.length - 1));
        T.push(N), c.add(N.root);
      }
      be();
    }
    function Ee() {
      const i = b.run && J() ? Oe(b.run.seed)[b.run.moves.length] : null, L = i ? [
        b.run.id,
        b.run.moves.length,
        b.direction
      ].join(":") : "";
      L !== ne && (D && (d.remove(D.root), D.dispose(), D = null), ne = L, i && (D = Ve(f, i, b.direction, b.run.moves.length, !1), d.add(D.root)));
    }
    function Pe(i) {
      if (a.visible = i && !!x?.supports.length, !a.visible || !x) return;
      const L = x.placed[x.weak], A = x.supports[x.weak];
      a.position.y = L.y / 1e3 + 0.03, I.position.x = (L.left + L.right) / 2e3, I.scale.x = Math.max(0.01, (L.right - L.left) / 1e3), R.position.x = A.center / 1e3, I.material = R.material = f.material(A.ratio < 0.25 ? g.risk : g.safe, "enamel");
    }
    function qe(i) {
      if (!x?.failure || !x.placed.length) return;
      const L = x.failure === "balance" ? x.weak : x.placed.length - 1, A = x.placed[L], F = x.supports[L].center >= (A.left + A.right) / 2 ? 1 : -1, N = (F > 0 ? A.right : A.left) / 1e3, K = A.y / 1e3, j = -F * i * i * 0.8;
      T.forEach((ue, Re) => {
        if (Re < L) return;
        const de = x.placed[Re], ye = de.x / 1e3 - N, Te = de.y / 1e3 - K;
        ue.root.visible = !0, ue.root.position.set(N + Math.cos(j) * ye - Math.sin(j) * Te + F * i ** 2 * 0.6, K + Math.sin(j) * ye + Math.cos(j) * Te - i ** 2 * 2.3 - (x.failure === "miss" ? i * 1.6 : 0), 0), ue.root.rotation.z = j;
      });
    }
    function xe(i, L = !1) {
      const A = me(i);
      W && (W.age += A), le += A;
      const F = X.sample();
      P && X.advance(A, C.matches);
      const N = X.sample();
      F.active && !N.active && P && (be(), ge(!1), W = null, se = 0, O.boundary(), v.shadowMap.enabled = O.current() > 0, re());
      const K = P && N.kind !== "cashed", j = x?.placed.at(-1), ue = b.overview && !P, Re = x ? ht(x).y / 1e3 : ae.wide.height / 500 + ae.loft.height / 1e3, de = K && j ? j.y / 1e3 : Re, { center: ye, settling: Te } = l.update(de, ue || !b.run, A, L || C.matches);
      pe = Te, u.position.set(-4, ye + 10, 8), u.target.position.set(0, ye, 0);
      const Ae = W ? W.x / 1e3 : b.run ? lt(b.run.seed, b.run.moves.length, se) / 1e3 : 0, Ze = K && j ? j.kind : b.run && J() ? Oe(b.run.seed)[b.run.moves.length] : "wide", et = de + ae[Ze].height / 1e3 + We + 0.66, Ge = W ? Math.min(1, W.age / q.acknowledgement) : 0;
      if (m.crane.visible = !!b.run && (!ue || P), m.crane.position.y = et, m.carriage.position.x = K && j ? j.x / 1e3 : Ae, m.hoist(0.61 + Ge * 0.045, K ? N.fall : Ge * 0.3), D && (D.root.visible = J() && !P, D.root.position.set(Ae, de + We - Ge * 0.045, 0), D.root.scale.y = 1 - Math.sin(Math.min(1, le / q.acknowledgement) * Math.PI) * 0.035), S.visible = J() && !P, S.position.set(Ae, de + 0.015, 0), S.scale.x = ae[Ze].foot / 1e3, K && j && T.length) {
        const De = T.at(-1);
        De.root.visible = !0, De.root.position.y = j.y / 1e3 + (1 - N.fall ** 2) * We, De.root.scale.y = 1 - Math.sin(N.settle * Math.PI) * 0.035, x?.failure && N.collapse > 0 && qe(N.collapse);
      }
      Pe(J() && !P);
      const gt = !!x?.supports.length && x.supports[x.weak].ratio < 0.25, bt = P ? N.kind === "lost" ? "sad" : N.fall >= 1 ? "happy" : "watch" : b.run && ["lost", "abandoned"].includes(ze(b.run)) ? "sad" : gt && J() ? "careful" : "watch", yt = !ue && !!b.run;
      w.update(bt, N.celebration, Ae, et, yt), b.enabled && !C.matches && (fe += Math.min(A, 60) / 1e3), m.clouds.position.x = C.matches ? 0 : Math.sin(fe * 0.1) * 0.14, m.farClouds.position.y = ye * 0.06, v.render(d, h), J() && b.enabled && !P && A && O.sample(A);
    }
    function Ce(i) {
      oe = !0, z(), t(i);
    }
    function M(i) {
      if (ee = 0, !ke()) {
        te = 0;
        return;
      }
      try {
        xe(i);
      } catch (L) {
        Ce(L);
        return;
      }
      J() && b.enabled || P || pe || W && W.age < q.acknowledgement ? ee = requestAnimationFrame(M) : te = 0;
    }
    function y() {
      !ee && ke() && (ee = requestAnimationFrame(M));
    }
    function z() {
      ee && (cancelAnimationFrame(ee), ee = 0), te = 0;
    }
    function Fe(i) {
      me(performance.now());
      const L = b.run?.id !== i.run?.id, A = !!i.run && i.run.id === b.run?.id && i.run.moves.length === b.run.moves.length + 1, F = !!i.run && i.run.id === b.run?.id && i.run.end !== b.run.end, N = L || b.run?.moves.length !== i.run?.moves.length, K = b.overview !== i.overview;
      if (i.direction !== b.direction && (le = 0, J() && i.enabled && s("turn")), b = i, N || !ce)
        if (ce = !0, x = i.run ? He(i.run) : null, se = 0, X.clear(), Me(L || !i.run || !x || T.length > x.placed.length, A), A) {
          const j = ze(i.run);
          X.start(j === "lost" ? "lost" : j === "won" ? "won" : "placed", x?.failure !== "miss"), W = null;
        } else W = null;
      else F && i.run?.end === "cashout" ? X.start("cashed") : K && !P && be();
      ge(X.sample().active), Ee(), b.enabled || (te = 0), y();
    }
    function Ne() {
      z(), y();
    }
    function Ue(i) {
      i.preventDefault(), Ce(/* @__PURE__ */ new Error("stacking_webgl_context_lost"));
    }
    function Ye(i) {
      !b.overview || P || (he = !0, we = i.clientX, e.setPointerCapture(i.pointerId));
    }
    function Ke(i) {
      he && (l.rotate((i.clientX - we) * 8e-3), we = i.clientX, y());
    }
    function Ie() {
      he = !1;
    }
    function Xe(i) {
      !b.overview || P || (i.preventDefault(), l.zoom(i.deltaY * 1e-3), y());
    }
    const Je = new ResizeObserver(() => {
      re(), y();
    });
    o.defer(() => Je.disconnect()), Je.observe(e);
    const Qe = new IntersectionObserver((i) => {
      Q = i[0].isIntersecting, Ne();
    });
    return o.defer(() => Qe.disconnect()), Qe.observe(e), o.defer(() => {
      document.removeEventListener("visibilitychange", Ne), C.removeEventListener("change", y), v.domElement.removeEventListener("webglcontextlost", Ue), e.removeEventListener("pointerdown", Ye), e.removeEventListener("pointermove", Ke), e.removeEventListener("pointerup", Ie), e.removeEventListener("pointercancel", Ie), e.removeEventListener("wheel", Xe);
    }), document.addEventListener("visibilitychange", Ne), C.addEventListener("change", y), v.domElement.addEventListener("webglcontextlost", Ue), e.addEventListener("pointerdown", Ye), e.addEventListener("pointermove", Ke), e.addEventListener("pointerup", Ie), e.addEventListener("pointercancel", Ie), e.addEventListener("wheel", Xe, { passive: !1 }), Fe(b), re(), y(), {
      set: Fe,
      release() {
        me(performance.now());
        const i = b.run ? lt(b.run.seed, b.run.moves.length, se) : 0;
        return W = {
          x: i,
          age: 0
        }, s("release"), y(), i;
      },
      cancelRelease() {
        W = null, y();
      },
      suspend() {
        Q = !1, z();
      },
      resume() {
        Q = !0, te = 0, y();
      },
      replayFailure() {
        !x?.failure || P || (be(), X.start("lost", x.failure !== "miss"), ge(!0), y());
      },
      rotate(i) {
        P || (l.rotate(i), y());
      },
      zoom(i) {
        P || (l.zoom(i), y());
      },
      async snapshot() {
        const i = e.getBoundingClientRect();
        xe(performance.now(), !0), v.setPixelRatio(ut(i.width, i.height, 2, 2)), v.render(d, h);
        try {
          return await new Promise((L, A) => v.domElement.toBlob((F) => F ? L(F) : A(/* @__PURE__ */ new Error("stacking_export")), "image/png"));
        } finally {
          re(), y();
        }
      },
      stats: () => ({
        ...v.info.memory,
        calls: v.info.render.calls,
        triangles: v.info.render.triangles,
        quality: O.current()
      }),
      dispose: o.dispose
    };
  });
}
function da() {
  let e = null, t = null;
  const r = /* @__PURE__ */ new Set();
  function s(l, h, f) {
    r.add(l), l.onended = () => {
      r.delete(l), l.disconnect(), h.disconnect(), f?.disconnect();
    };
  }
  function o(l, h, f, m, w = 0, c = "sine") {
    const a = e, u = a.createOscillator(), _ = a.createGain(), S = a.currentTime + w;
    u.type = c, u.frequency.setValueAtTime(l, S), u.frequency.exponentialRampToValueAtTime(h, S + f), _.gain.setValueAtTime(0, S), _.gain.linearRampToValueAtTime(m, S + 8e-3), _.gain.exponentialRampToValueAtTime(1e-3, S + f), u.connect(_), _.connect(a.destination), s(u, _), u.start(S), u.stop(S + f + 0.015);
  }
  function v(l, h, f, m = 0) {
    const w = e, c = w.createBufferSource(), a = w.createBiquadFilter(), u = w.createGain(), _ = w.currentTime + m;
    c.buffer = t, a.type = "bandpass", a.frequency.value = l, a.Q.value = 0.75, u.gain.setValueAtTime(0, _), u.gain.linearRampToValueAtTime(f, _ + 0.012), u.gain.exponentialRampToValueAtTime(1e-3, _ + h), c.connect(a), a.connect(u), u.connect(w.destination), s(c, u, a), c.start(_), c.stop(_ + h + 0.015);
  }
  function d() {
    for (const l of r) l.stop();
  }
  return {
    async unlock() {
      if (!e) {
        e = new AudioContext(), t = e.createBuffer(1, e.sampleRate, e.sampleRate);
        const l = t.getChannelData(0);
        for (let h = 0; h < l.length; h++) l[h] = Math.random() * 2 - 1;
      }
      e.state === "suspended" && await e.resume();
    },
    play(l) {
      !e || e.state !== "running" || (l === "release" && (v(1700, 0.12, 0.045), o(340, 250, 0.1, 0.022)), l === "turn" && (v(850, 0.075, 0.03), o(480, 410, 0.065, 0.018)), l === "land" && (o(150, 62, 0.19, 0.11), v(750, 0.105, 0.08), o(880, 860, 0.24, 0.018, 0.025), o(1320, 1290, 0.19, 9e-3, 0.04)), l === "danger" && (o(295, 285, 0.2, 0.023, 0.13, "triangle"), o(250, 240, 0.22, 0.02, 0.34, "triangle")), l === "lose" && (v(420, 0.55, 0.13), o(180, 48, 0.55, 0.055, 0, "triangle")), l === "reward" && [
        523,
        659,
        784,
        1047
      ].forEach((h, f) => {
        o(h, h, 0.5, 0.038, f * 0.11), o(h * 2, h * 2, 0.25, 9e-3, f * 0.11);
      }));
    },
    async pause() {
      e?.state === "running" && (d(), await e.suspend());
    },
    async dispose() {
      d();
      const l = e;
      e = null, t = null, l && l.state !== "closed" && await l.close();
    }
  };
}
var je = "LittleWhiteBox:stacking:pending";
function va(e) {
  return {
    read() {
      try {
        const t = e.getItem(je);
        if (t === null) return null;
        const r = JSON.parse(t), s = ct(r.runId), o = ct(r.request.actionId), v = r.request.revision, d = Qt(r.request.command);
        return (!Number.isSafeInteger(v) || v < 0 || d.type === "start") && ie("recovery"), {
          runId: s,
          request: {
            actionId: o,
            revision: v,
            command: d
          }
        };
      } catch {
        return ie("recovery");
      }
    },
    write(t) {
      try {
        e.setItem(je, JSON.stringify(t));
      } catch {
        ie("recovery");
      }
    },
    clear() {
      try {
        e.removeItem(je);
      } catch {
        ie("recovery");
      }
    }
  };
}
var fa = {
  viewBox: "-1400 -1350 2900 1550",
  "aria-hidden": "true",
  class: "stack-house-icon"
}, pa = ["transform"], ha = [
  "x",
  "y",
  "width",
  "height",
  "fill",
  "stroke"
], ma = [
  "x",
  "y",
  "width",
  "height",
  "fill",
  "stroke"
], ga = ["fill"], ba = [
  "x",
  "y",
  "width",
  "fill"
], ya = ["y", "fill"], wa = ["x", "fill"], ka = ["cx", "fill"], xa = /* @__PURE__ */ vt({
  __name: "HouseIcon",
  props: {
    kind: {},
    direction: {}
  },
  setup(e) {
    const t = e, r = U(() => ae[t.kind]), s = U(() => "#" + r.value.color.toString(16).padStart(6, "0")), o = Object.fromEntries(Object.entries(g).map(([v, d]) => [v, "#" + d.toString(16).padStart(6, "0")]));
    return (v, d) => ($(), B("svg", fa, [k("g", { transform: `scale(${e.direction ?? 1},1)` }, [
      k("rect", {
        x: -r.value.foot / 2,
        y: -r.value.height * (e.kind === "step" ? 0.59 : 1),
        width: r.value.foot,
        height: r.value.height * (e.kind === "step" ? 0.59 : 1),
        rx: "75",
        fill: n(o).milk,
        stroke: s.value,
        "stroke-width": "35"
      }, null, 8, ha),
      e.kind === "step" ? ($(), B("rect", {
        key: 0,
        x: r.value.offset - r.value.top / 2,
        y: -r.value.height,
        width: r.value.top,
        height: r.value.height * 0.5,
        rx: "65",
        fill: n(o).milk,
        stroke: s.value,
        "stroke-width": "35"
      }, null, 8, ma)) : G("", !0),
      e.kind === "balcony" ? ($(), B("rect", {
        key: 1,
        x: "510",
        y: "-800",
        width: "680",
        height: "640",
        rx: "65",
        fill: s.value
      }, null, 8, ga)) : G("", !0),
      k("rect", {
        x: r.value.offset - r.value.top / 2,
        y: -r.value.height,
        width: r.value.top,
        height: "120",
        rx: "35",
        fill: s.value
      }, null, 8, ba),
      k("rect", {
        x: "-290",
        y: e.kind === "step" ? -470 : -760,
        width: "230",
        height: "250",
        rx: "35",
        fill: n(o).glass
      }, null, 8, ya),
      k("rect", {
        x: e.kind === "step" ? r.value.offset - 100 : 100,
        y: "-760",
        width: "230",
        height: "250",
        rx: "35",
        fill: n(o).glass
      }, null, 8, wa),
      k("circle", {
        cx: r.value.center,
        cy: "-160",
        r: "60",
        fill: n(o).steel
      }, null, 8, ka)
    ], 8, pa)]));
  }
}), dt = xa, _a = ["aria-label", "data-stack-presenting"], Sa = { class: "stack-topbar" }, Ma = ["data-stack-balance"], Ea = { key: 0 }, Ca = ["aria-label"], Ia = ["disabled", "aria-pressed"], Ra = {
  key: 0,
  class: "stack-notice",
  role: "alert"
}, Ta = ["disabled"], Aa = ["disabled"], La = {
  key: 1,
  class: "stack-notice",
  role: "alert"
}, $a = ["aria-label"], Ba = { class: "stack-stage" }, za = ["aria-label"], Oa = {
  key: 0,
  class: "stack-hud"
}, Pa = ["data-stack-count"], qa = {
  key: 1,
  class: "stack-overlay",
  role: "alert"
}, Na = {
  key: 2,
  class: "stack-pause"
}, Ga = {
  key: 2,
  class: "stack-controls"
}, Da = {
  key: 0,
  class: "stack-view-controls"
}, Va = ["aria-label"], Wa = ["aria-label"], ja = ["aria-label"], Ha = ["aria-label"], Fa = {
  key: 1,
  class: "stack-result"
}, Ua = { class: "stack-queue" }, Ya = { key: 0 }, Ka = {
  key: 1,
  class: "stack-next"
}, Xa = { class: "stack-actions" }, Ja = ["disabled"], Qa = ["disabled"], Za = ["disabled"], en = ["disabled"], tn = { class: "stack-bottom" }, an = { role: "status" }, nn = ["disabled"], on = {
  key: 0,
  class: "stack-reveal-status",
  role: "status"
}, sn = {
  key: 1,
  class: "stack-result"
}, rn = { key: 0 }, ln = {
  key: 2,
  class: "stack-reason"
}, cn = { class: "stack-actions" }, un = ["disabled"], dn = ["disabled"], vn = {
  key: 3,
  class: "stack-reason"
}, fn = { id: "stack-dialog-title" }, pn = ["aria-label"], hn = { key: 0 }, mn = { class: "stack-actions" }, gn = ["disabled"], bn = /* @__PURE__ */ vt({
  __name: "StackingRoom",
  props: {
    bridge: {},
    chatIdentity: {},
    generationActive: { type: Boolean }
  },
  setup(e) {
    const t = e, r = va({
      getItem: (M) => localStorage.getItem(M),
      setItem: (M, y) => localStorage.setItem(M, y),
      removeItem: (M) => localStorage.removeItem(M)
    }), s = Zt(t.bridge, t.chatIdentity, r), { view: o, busy: v, blocked: d, failed: l, notice: h, generating: f } = s, m = H(null), w = H(null), c = H(null), a = H(1), u = H(!1), _ = H(!1), S = H(!1), I = H(!0), R = H(!1), O = H(""), C = H(!1), b = H(0), x = H(0);
    let T = null, D = !1;
    const ne = da(), V = U(() => _.value ? o.value?.best ?? null : o.value?.active ?? null), ce = U(() => V.value ? ze(V.value) : null), Q = U(() => ce.value === "playing" && !_.value), oe = U(() => V.value ? it(V.value) : 0), ee = U(() => Ft(oe.value)), te = U(() => V.value ? Oe(V.value.seed) : []), se = U(() => te.value[V.value?.moves.length ?? 0]), fe = U(() => te.value[(V.value?.moves.length ?? 0) + 1]), pe = U(() => I.value && !d.value && !t.generationActive && !u.value && !c.value && !R.value), P = U(() => !pe.value || S.value), le = U(() => o.value?.board?.supports[o.value.board.weak]);
    It(w, () => {
      c.value = null;
    }), Rt(() => _.value ? (_.value = !1, !0) : !1);
    function W() {
      T?.set({
        run: V.value,
        direction: a.value,
        overview: _.value || !Q.value,
        enabled: pe.value
      });
    }
    function he() {
      T?.dispose(), T = null, R.value = !1, S.value = !1;
      try {
        T = ua(m.value, () => {
          R.value = !0, X();
        }, (M) => {
          S.value = M;
        }, we), W();
      } catch {
        R.value = !0;
      }
    }
    function we(M) {
      M === "land" && (x.value = oe.value), o.value?.soundEnabled && I.value && !c.value && !u.value && !document.hidden && ne.play(M);
    }
    async function X() {
      try {
        await ne.pause();
      } catch {
        O.value = p.soundError;
      }
    }
    async function re() {
      if (o.value?.soundEnabled)
        try {
          await ne.unlock();
        } catch {
          O.value = p.soundError;
        }
    }
    async function ke() {
      if (!(C.value || !o.value)) {
        C.value = !0, O.value = "";
        try {
          const M = !o.value.soundEnabled;
          M && await ne.unlock(), await s.setSoundEnabled(M), M || await ne.pause();
        } catch {
          O.value = p.soundError;
        } finally {
          C.value = !1;
        }
      }
    }
    async function J(M) {
      re(), await s.act(M) && (_.value = !1, M.type === "start" && (a.value = 1, u.value = !1));
    }
    function me() {
      P.value || !Q.value || !T || (re(), J({
        type: "drop",
        x: T.release(),
        direction: a.value
      }));
    }
    function ge() {
      !P.value && Q.value && (a.value = a.value === 1 ? -1 : 1, re());
    }
    async function be() {
      const M = c.value;
      c.value = null, M && M !== "rules" && await J({ type: M });
    }
    async function Se() {
      if (T)
        try {
          const M = await T.snapshot(), y = URL.createObjectURL(M), z = document.createElement("a");
          z.href = y, z.download = p.exportName(oe.value), z.click(), setTimeout(() => URL.revokeObjectURL(y), 1e3);
        } catch {
          O.value = p.exportError;
        }
    }
    function Me(M) {
      T?.rotate(M);
    }
    function Ee(M) {
      T?.zoom(M);
    }
    function Pe() {
      re(), T?.replayFailure();
    }
    function qe(M) {
      M.repeat || c.value || M.target.closest("input, textarea, select") || (M.code === "Space" && !M.target.closest("button") && (M.preventDefault(), me()), (M.code === "ArrowLeft" || M.code === "ArrowRight") && (M.preventDefault(), ge()));
    }
    function xe() {
      document.hidden && X();
    }
    Le([
      V,
      a,
      pe,
      _
    ], W), Le(d, (M) => {
      M || T?.cancelRelease();
    }, { flush: "post" }), Le([
      () => o.value?.balance,
      oe,
      S
    ], () => {
      S.value || (b.value = o.value?.balance ?? 0, x.value = oe.value);
    }, {
      flush: "post",
      immediate: !0
    }), Le([
      u,
      c,
      I,
      R,
      () => t.generationActive
    ], () => {
      (u.value || c.value || !I.value || R.value || t.generationActive) && X();
    }), kt(async () => {
      he(), document.addEventListener("visibilitychange", xe), await s.read(), D = !0;
    }), xt(() => {
      I.value = !0, T?.resume(), D && s.read();
    }), St(() => {
      I.value = !1, T?.suspend(), X();
    }), Mt(() => {
      s.dispose(), T?.dispose(), document.removeEventListener("visibilitychange", xe), ne.dispose().catch((M) => console.error(p.audioDispose, M));
    });
    async function Ce() {
      await wt(), he();
    }
    return (M, y) => ($(), B("section", {
      class: "stacking-room",
      tabindex: "0",
      "aria-label": n(p).name,
      "data-stack-presenting": S.value,
      onKeydown: qe
    }, [
      k("header", Sa, [k("div", null, [k("strong", { "data-stack-balance": n(o) ? b.value : void 0 }, E(n(o) ? n(p).balance(b.value) : n(p).loading), 9, Ma), _.value ? ($(), B("small", Ea, E(n(p).best), 1)) : G("", !0)]), k("nav", { "aria-label": n(p).name }, [k("button", {
        type: "button",
        disabled: C.value || n(v) || !n(o),
        "aria-pressed": n(o)?.soundEnabled,
        onClick: ke
      }, E(n(o)?.soundEnabled ? n(p).soundOn : n(p).soundOff), 9, Ia), k("button", {
        type: "button",
        onClick: y[0] || (y[0] = (z) => c.value = "rules")
      }, E(n(p).rules), 1)], 8, Ca)]),
      n(h) || n(l) || n(o)?.pending || n(o)?.writeState === "failed" ? ($(), B("aside", Ra, [
        k("span", null, E(n(h) || n(p).saveProblem), 1),
        k("button", {
          type: "button",
          disabled: n(v),
          onClick: y[1] || (y[1] = (...z) => n(s).recover && n(s).recover(...z))
        }, E(n(p).recover), 9, Ta),
        k("button", {
          type: "button",
          disabled: n(v),
          onClick: y[2] || (y[2] = (...z) => n(s).read && n(s).read(...z))
        }, E(n(p).refresh), 9, Aa)
      ])) : G("", !0),
      O.value ? ($(), B("p", La, [$e(E(O.value), 1), k("button", {
        type: "button",
        "aria-label": n(p).close,
        onClick: y[3] || (y[3] = (z) => O.value = "")
      }, "×", 8, $a)])) : G("", !0),
      k("div", Ba, [
        k("div", {
          ref_key: "canvas",
          ref: m,
          class: "stack-canvas",
          "aria-label": n(p).scene,
          role: "img"
        }, null, 8, za),
        V.value ? ($(), B("div", Oa, [k("strong", { "data-stack-count": x.value }, E(n(p).progress(x.value)), 9, Pa), Q.value && le.value && !S.value ? ($(), B("span", {
          key: 0,
          class: Ct({ "is-risk": le.value.ratio < n(na) })
        }, E(le.value.ratio < n(0.25) ? n(p).weak(le.value.index) : n(p).stable), 3)) : G("", !0)])) : G("", !0),
        R.value ? ($(), B("div", qa, [k("p", null, E(n(p).graphics), 1), k("button", {
          type: "button",
          onClick: Ce
        }, E(n(p).reload), 1)])) : Q.value && (u.value || e.generationActive) ? ($(), B("div", Na, [k("span", null, E(e.generationActive ? n(p).storyBusy : n(p).paused), 1), e.generationActive ? G("", !0) : ($(), B("button", {
          key: 0,
          type: "button",
          onClick: y[4] || (y[4] = (z) => u.value = !1)
        }, E(n(p).play), 1))])) : G("", !0)
      ]),
      n(o) ? ($(), B("footer", Ga, [V.value && !Q.value && !R.value && !S.value ? ($(), B("div", Da, [
        k("button", {
          type: "button",
          "aria-label": n(p).rotateLeft,
          onClick: y[5] || (y[5] = (z) => Me(-0.3))
        }, "↶", 8, Va),
        k("button", {
          type: "button",
          "aria-label": n(p).rotateRight,
          onClick: y[6] || (y[6] = (z) => Me(0.3))
        }, "↷", 8, Wa),
        k("button", {
          type: "button",
          "aria-label": n(p).zoomIn,
          onClick: y[7] || (y[7] = (z) => Ee(-0.12))
        }, "＋", 8, ja),
        k("button", {
          type: "button",
          "aria-label": n(p).zoomOut,
          onClick: y[8] || (y[8] = (z) => Ee(0.12))
        }, "−", 8, Ha),
        k("button", {
          type: "button",
          onClick: Se
        }, E(n(p).export), 1)
      ])) : G("", !0), _.value ? ($(), B("div", Fa, [k("strong", null, E(n(p).bestCount(oe.value)), 1), k("button", {
        type: "button",
        onClick: y[9] || (y[9] = (z) => _.value = !1)
      }, E(n(p).back), 1)])) : Q.value ? ($(), B(_e, { key: 2 }, [
        k("div", Ua, [se.value ? ($(), B("div", Ya, [at(dt, {
          kind: se.value,
          direction: a.value
        }, null, 8, ["kind", "direction"]), k("span", null, [k("small", null, E(n(p).now) + " · " + E(n(p).orient(a.value)), 1), $e(E(n(st)[se.value]), 1)])])) : G("", !0), fe.value ? ($(), B("div", Ka, [at(dt, { kind: fe.value }, null, 8, ["kind"]), k("span", null, [k("small", null, E(n(p).next), 1), $e(E(n(st)[fe.value]), 1)])])) : G("", !0)]),
        k("div", Xa, [
          k("button", {
            type: "button",
            disabled: P.value,
            onClick: ge
          }, E(n(p).flip), 9, Ja),
          k("button", {
            type: "button",
            class: "stack-primary",
            disabled: P.value,
            onClick: me
          }, E(n(p).drop) + " ↓", 9, Qa),
          ee.value ? ($(), B("button", {
            key: 0,
            type: "button",
            disabled: P.value,
            onClick: y[10] || (y[10] = (z) => c.value = "cashout")
          }, E(n(p).cash(ee.value)), 9, Za)) : ($(), B("button", {
            key: 1,
            type: "button",
            disabled: n(v) || S.value,
            onClick: y[11] || (y[11] = (z) => u.value = !u.value)
          }, E(u.value ? n(p).play : n(p).pause), 9, en))
        ]),
        k("div", tn, [k("span", an, E(n(f) ? n(p).generating : n(v) ? n(p).saving : n(l) || n(o).pending || n(o).writeState !== "ready" ? n(p).awaiting : S.value ? n(p).revealing : n(p).saved), 1), k("button", {
          type: "button",
          disabled: n(d) || S.value,
          onClick: y[12] || (y[12] = (z) => c.value = "abandon")
        }, E(n(p).abandon), 9, nn)])
      ], 64)) : ($(), B(_e, { key: 3 }, [
        S.value ? ($(), B("p", on, E(n(p).revealing), 1)) : G("", !0),
        ce.value && !S.value ? ($(), B("div", sn, [k("strong", null, E(n(p)[ce.value]), 1), V.value ? ($(), B("span", rn, E(n(p).reward(n(o).award)), 1)) : G("", !0)])) : G("", !0),
        ce.value === "lost" && n(o).board?.failure && !S.value ? ($(), B("p", ln, [$e(E(n(p).failure[n(o).board.failure]), 1), k("button", {
          type: "button",
          "data-stack-action": "replay",
          onClick: Pe
        }, E(n(p).replay), 1)])) : G("", !0),
        k("div", cn, [k("button", {
          type: "button",
          class: "stack-primary",
          disabled: P.value || n(o).balance < n(Z).fee,
          onClick: y[13] || (y[13] = (z) => c.value = "start")
        }, E(n(p).start), 9, un), n(o).best ? ($(), B("button", {
          key: 0,
          type: "button",
          disabled: S.value,
          onClick: y[14] || (y[14] = (z) => _.value = !0)
        }, E(n(p).bestCount(n(it)(n(o).best))), 9, dn)) : G("", !0)]),
        n(o).balance < n(Z).fee ? ($(), B("p", vn, E(n(p).noFunds), 1)) : G("", !0)
      ], 64))])) : G("", !0),
      c.value ? ($(), B("div", {
        key: 3,
        class: "stack-backdrop",
        onClick: y[17] || (y[17] = Et((z) => c.value = null, ["self"]))
      }, [k("section", {
        ref_key: "dialog",
        ref: w,
        class: "stack-dialog",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "stack-dialog-title",
        tabindex: "-1"
      }, [k("header", null, [k("h2", fn, E(c.value === "rules" ? n(p).rules : c.value === "start" ? n(p).admissionTitle : c.value === "cashout" ? n(p).cashTitle : n(p).abandonTitle), 1), k("button", {
        type: "button",
        "aria-label": n(p).close,
        onClick: y[15] || (y[15] = (z) => c.value = null)
      }, "×", 8, pn)]), c.value === "rules" ? ($(), B(_e, { key: 0 }, [k("ul", null, [($(!0), B(_e, null, _t(n(p).ruleItems, (z) => ($(), B("li", { key: z }, E(z), 1))), 128))]), k("p", null, E(n(p).stages), 1)], 64)) : ($(), B(_e, { key: 1 }, [
        k("p", null, E(c.value === "start" ? n(p).admissionBody : c.value === "cashout" ? n(p).cashBody : n(p).abandonBody), 1),
        c.value === "start" ? ($(), B("p", hn, E(n(p).stages), 1)) : G("", !0),
        k("div", mn, [k("button", {
          type: "button",
          onClick: y[16] || (y[16] = (z) => c.value = null)
        }, E(n(p).cancel), 1), k("button", {
          type: "button",
          class: "stack-primary",
          disabled: n(d) || e.generationActive,
          onClick: be
        }, E(c.value === "start" ? n(p).start : c.value === "cashout" ? n(p).cash(ee.value) : n(p).confirm), 9, gn)])
      ], 64))], 512)])) : G("", !0)
    ], 40, _a));
  }
}), Mn = bn;
export {
  Mn as default
};
