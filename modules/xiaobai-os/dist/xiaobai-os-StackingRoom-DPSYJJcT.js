/* eslint-disable */
import { $ as tt, A as at, D as nt, E as ot, F as w, H as $e, L as st, M as rt, O as it, Q as t, X as ze, Y as T, _ as k, b as Ne, g as A, l as lt, m as l, p as D, tt as m, u as we, x as Xe, y as Ee } from "./xiaobai-os-runtime-dom.esm-bundler-DuiaxqDz.js";
import { n as ut, r as ct } from "./xiaobai-os-app-navigation-CKmHuh0u.js";
import { At as dt, J as vt, S as ft, St as pt, X as mt, _t as ht, g as bt, gt as yt, m as gt, n as wt, o as Fe, q as Ye, rt as kt, t as _t, u as xt, x as J } from "./xiaobai-os-RoundedBoxGeometry-CpWqoTdO.js";
import { a as V, c as St, i as ve, n as He, o as Et, r as Ge, s as Ue, t as s } from "./xiaobai-os-copy-i0wrrpaY.js";
function Mt() {
  return {
    placed: [],
    supports: [],
    failure: null,
    weak: -1
  };
}
function Ke(e) {
  const o = e.placed.at(-1);
  if (!o) return {
    left: -V.groundWidth / 2,
    right: V.groundWidth / 2,
    y: 0
  };
  const r = ve[o.kind], a = o.x + r.offset * o.direction;
  return {
    left: a - r.top / 2,
    right: a + r.top / 2,
    y: o.y + r.height
  };
}
function Je(e) {
  return Number.isSafeInteger(e.x) && Math.abs(e.x) <= V.rail && (e.direction === 1 || e.direction === -1);
}
function Ct(e, o, r) {
  if (e.failure || e.placed.length >= V.houses || !Je(r)) throw new Error("stacking_invalid");
  const a = ve[o], n = Ke(e), i = [...e.placed, {
    ...r,
    kind: o,
    y: n.y,
    left: Math.max(n.left, r.x - a.foot / 2),
    right: Math.min(n.right, r.x + a.foot / 2)
  }], v = i.at(-1);
  let h = v.right <= v.left ? "miss" : v.right - v.left < V.contact ? "contact" : null, C = 0, M = 0;
  const _ = [];
  for (let u = i.length - 1; u >= 0; u--) {
    const b = i[u], E = ve[b.kind];
    C += E.mass, M += E.mass * (b.x + E.center * b.direction);
    const L = M / C, P = Math.min(L - b.left, b.right - L) - V.margin;
    _.unshift({
      index: u,
      center: L,
      margin: P,
      ratio: P / Math.max(1, (b.right - b.left) / 2 - V.margin)
    }), P <= 0 && (h ??= "balance");
  }
  const I = _.reduce((u, b) => b.ratio < _[u].ratio ? b.index : u, 0);
  return {
    placed: i,
    supports: _,
    failure: h,
    weak: I
  };
}
function Me(e) {
  let o = e >>> 0;
  function r() {
    return o = Math.imul(o, 1664525) + 1013904223 >>> 0, o / 4294967296;
  }
  const a = [
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
  return Array.from({ length: V.houses }, (n, i) => {
    const v = a[St(i)];
    return v[Math.floor(r() * v.length)];
  });
}
function oe(e) {
  throw Object.assign(/* @__PURE__ */ new Error(`stacking_${e}`), { code: `stacking_${e}` });
}
function qe(e) {
  let o = Mt();
  const r = Me(e.seed);
  for (const a of e.moves) o = Ct(o, r[o.placed.length], a);
  return o;
}
function Re(e) {
  const o = qe(e);
  return o.placed.length - +!!o.failure;
}
function Ce(e) {
  if (e.end) return e.end === "cashout" ? "cashed" : "abandoned";
  const o = qe(e);
  return o.failure ? "lost" : o.placed.length === V.houses ? "won" : "playing";
}
function It(e) {
  return (!e || typeof e != "object" || Array.isArray(e)) && oe("invalid"), e;
}
function Ve(e) {
  return (typeof e != "string" || !/^[a-zA-Z0-9_-]{1,100}$/.test(e)) && oe("identity"), e;
}
function Lt() {
  return [...crypto.getRandomValues(new Uint32Array(4))].map((e) => e.toString(16).padStart(8, "0")).join("");
}
function $t(e) {
  const o = It(e);
  switch (o.type) {
    case "start":
    case "cashout":
    case "abandon":
      return { type: o.type };
    case "drop": {
      const r = {
        x: o.x,
        direction: o.direction
      };
      return Je(r) || oe("invalid"), {
        type: "drop",
        ...r
      };
    }
    default:
      return oe("invalid");
  }
}
function Rt(e, o, r) {
  const a = ze(null), n = T(!1), i = T(""), v = T(!1), h = ze(null), C = T(!1);
  let M = !1, _ = null;
  const I = D(() => n.value || C.value || !!h.value || !a.value?.ready || a.value.writeState !== "ready" || a.value.pending);
  function u(y) {
    M || (a.value = y);
  }
  function b() {
    const y = r.read(), g = a.value;
    !y || !g?.ready || (g.active?.id === y.runId && g.revision === y.request.revision ? h.value = y.request : g.writeState === "ready" && !g.pending && r.clear());
  }
  async function E(y, g) {
    if (M || n.value) return !1;
    n.value = !0, _ = null, v.value = !!g && "command" in g && g.command.type === "start", i.value = "";
    try {
      y === "act" && g && "command" in g && g.command.type !== "start" && a.value?.active && (h.value = g, r.write({
        runId: a.value.active.id,
        request: g
      }));
      const f = await e.request(`game/stacking/${y}`, {
        chatIdentity: o,
        ...g
      }, 35e3), x = _;
      return u(x && x.revision >= f.result.revision ? x : f.result), b(), C.value = !1, a.value?.writeState === "ready" && !a.value.pending && (!h.value || a.value.revision > h.value.revision) && (h.value = null), !0;
    } catch (f) {
      if (!M) {
        if (_ && u(_), y === "sound") throw f;
        i.value = Ge(f);
        const x = f && typeof f == "object" && "code" in f ? String(f.code) : f instanceof Error ? f.message : "";
        if (x === "stacking_recovery" && (C.value = !0), g && "command" in g && (x.startsWith("stacking_save_") || x.startsWith("host_request_"))) h.value = g;
        else if (y === "act" && x !== "stacking_recovery") try {
          r.clear(), h.value = null;
        } catch (Q) {
          C.value = !0, i.value = Ge(Q);
        }
      }
      return !1;
    } finally {
      M || (n.value = !1, v.value = !1);
    }
  }
  const L = e.subscribe((y) => {
    if (M || y.type !== "game/stacking/state") return;
    const g = y.payload;
    g.chatIdentity === o && (n.value ? _ = g.state : u(g.state));
  });
  async function P() {
    let y = h.value;
    !await E("confirm") || !a.value || a.value.writeState !== "ready" || a.value.pending || (y ??= h.value, y && a.value.revision === y.revision && await E("act", y));
  }
  return {
    view: a,
    busy: n,
    error: i,
    generating: v,
    blocked: I,
    failed: h,
    notice: D(() => i.value || (C.value ? s.recoveryProblem : a.value?.writeState === "conflict" ? s.conflict : a.value?.pending || a.value?.writeState === "unconfirmed" ? s.saveProblem : "")),
    read: () => E("read"),
    recover: P,
    setSoundEnabled: (y) => E("sound", { enabled: y }),
    act: (y) => I.value ? Promise.resolve(!1) : E("act", {
      actionId: Lt(),
      revision: a.value.revision,
      command: y
    }),
    dispose() {
      M = !0, L();
    }
  };
}
function At() {
  const e = {
    box: new _t(1, 1, 1, 2, 0.06),
    flat: new Fe(1, 1, 1),
    sphere: new pt(1, 12, 8),
    rod: new gt(1, 1, 1, 8)
  }, o = /* @__PURE__ */ new Map();
  function r(n, i = !1) {
    const v = `${n}:${i}`;
    return o.has(v) || o.set(v, new mt({
      color: n,
      roughness: 0.78,
      emissive: i ? n : 0,
      emissiveIntensity: i ? 0.3 : 0
    })), o.get(v);
  }
  function a(n, i, v, h, C, M = !1) {
    const _ = new Ye(e[i], r(v, M));
    return _.scale.set(...h), _.position.set(...C), _.castShadow = !0, _.receiveShadow = !0, n.add(_), _;
  }
  return {
    mesh: a,
    material: r,
    dispose() {
      Object.values(e).forEach((n) => n.dispose()), o.forEach((n) => n.dispose()), o.clear();
    }
  };
}
function Ae(e, o, r, a, n = !0) {
  const i = new J(), v = new J();
  i.add(v), v.scale.x = r;
  const h = ve[o], C = h.foot / 1e3, M = h.height / 1e3, _ = h.top / 1e3, I = h.offset / 1e3, u = (b, E, L, P = !1) => e.mesh(v, "box", b, E, L, P);
  u(h.color, [
    C,
    o === "step" ? M * 0.64 : M - 0.12,
    1.12
  ], [
    0,
    o === "step" ? M * 0.32 : (M - 0.12) / 2,
    0
  ]), o === "step" && u(h.color, [
    _,
    M * 0.4,
    1.12
  ], [
    I,
    M * 0.77,
    0
  ]), o === "balcony" && (u(13346772, [
    0.66,
    0.7,
    0.94
  ], [
    0.9,
    0.48,
    0.03
  ]), u(n ? 16770468 : 9153466, [
    0.4,
    0.37,
    0.05
  ], [
    0.92,
    0.52,
    0.52
  ], n), u(16775404, [
    0.78,
    0.1,
    1.04
  ], [
    0.92,
    0.17,
    0.03
  ])), u(16775920, [
    _,
    0.12,
    1.2
  ], [
    I,
    M - 0.06,
    0
  ]);
  for (const b of C > 1.4 ? [-0.45, 0.4] : [-0.24, 0.23])
    u(8887719, [
      0.29,
      0.36,
      0.055
    ], [
      b,
      0.48,
      0.579
    ]), u(n ? 16770987 : 9153466, [
      0.22,
      0.29,
      0.025
    ], [
      b,
      0.48,
      0.615
    ], n), u(16775147, [
      0.028,
      0.31,
      0.025
    ], [
      b,
      0.48,
      0.632
    ]);
  if (u(7903642, [
    0.2,
    0.36,
    0.035
  ], [
    0,
    0.2,
    0.575
  ]), n && a % 2 === 0) {
    const b = new J();
    v.add(b), i.userData.resident = b, e.mesh(b, "sphere", 16769472, [
      0.065,
      0.075,
      0.06
    ], [
      -0.24,
      0.46,
      0.7
    ]), e.mesh(b, "box", 9420212, [
      0.11,
      0.1,
      0.065
    ], [
      -0.24,
      0.36,
      0.7
    ]);
  }
  return a % 3 === 1 && (u(8691108, [
    0.62,
    0.018,
    0.018
  ], [
    0,
    0.72,
    0.71
  ]), [-0.17, 0.08].forEach((b, E) => u(E ? 16578013 : 15248035, [
    0.14,
    0.18,
    0.03
  ], [
    b,
    0.63,
    0.71
  ]))), i;
}
function Bt(e) {
  const o = new J(), r = new J(), a = new J();
  e.mesh(o, "box", 16381417, [
    V.groundWidth / 1e3,
    0.26,
    1.65
  ], [
    0,
    -0.13,
    0
  ]), e.mesh(o, "box", 12048329, [
    2.5,
    0.22,
    1.95
  ], [
    0,
    -0.36,
    0
  ]);
  for (let i = 0; i < 16; i++) {
    const v = i * 2.4, h = i % 2 ? 4.5 : 2.3;
    e.mesh(r, "sphere", i % 3 ? 16186105 : 14872817, [
      1.35 + i % 3 * 0.5,
      0.4 + i % 2 * 0.2,
      1.2
    ], [
      Math.sin(v) * h,
      -0.75 - i % 3 * 0.22,
      Math.cos(v) * h
    ]);
  }
  o.add(r), e.mesh(a, "box", 15119998, [
    7,
    0.17,
    0.23
  ], [
    0,
    0,
    0
  ]), e.mesh(a, "box", 16772553, [
    7,
    0.055,
    0.26
  ], [
    0,
    0.11,
    0
  ]);
  const n = new J();
  return a.add(n), e.mesh(n, "box", 8560297, [
    0.45,
    0.22,
    0.36
  ], [
    0,
    -0.1,
    0
  ]), e.mesh(n, "rod", 6585739, [
    0.022,
    0.7,
    0.022
  ], [
    0,
    -0.53,
    0
  ]), e.mesh(n, "box", 14197099, [
    0.35,
    0.09,
    0.18
  ], [
    0,
    -0.9,
    0
  ]), {
    world: o,
    clouds: r,
    crane: a,
    carriage: n
  };
}
var ue = {
  maxPixels: 16e5,
  maxDpr: 2,
  shadow: 1024,
  slowMs: 32,
  fastMs: 19,
  slowSamples: 90,
  fastSamples: 600
};
function je(e, o, r, a) {
  return Math.min(r, [
    1,
    1.5,
    ue.maxDpr
  ][a], Math.sqrt(ue.maxPixels / Math.max(1, e * o)));
}
function qt() {
  let e = 2, o = 0, r = 0, a = null;
  return {
    sample(n) {
      if (n > 250) {
        o = 0, r = 0;
        return;
      }
      o = n > ue.slowMs ? o + 1 : 0, r = n < ue.fastMs ? r + 1 : 0, o >= ue.slowSamples && e > 0 && (a = e - 1), r >= ue.fastSamples && e < 2 && (a = e + 1);
    },
    boundary() {
      return a !== null && (e = a, a = null, o = 0, r = 0), e;
    },
    current: () => e
  };
}
function Ot(e, o, r) {
  const a = new wt({
    alpha: !1,
    antialias: !0,
    powerPreference: "low-power"
  });
  a.outputColorSpace = yt, a.toneMapping = 4, a.toneMappingExposure = 1, a.shadowMap.enabled = !0, a.shadowMap.type = 2, e.append(a.domElement);
  const n = new ht();
  n.background = new xt(14019825);
  const i = new kt(-5, 5, 5, -5, 0.1, 160), v = At(), h = Bt(v), C = new J(), M = new J(), _ = new J();
  n.add(h.world, h.crane, C, M, _), n.add(new ft(16449535, 11976369, 1.7));
  const I = new bt(16773081, 2.8);
  I.position.set(-5, 12, 8), I.castShadow = !0, I.shadow.mapSize.setScalar(ue.shadow), I.shadow.camera.left = -6, I.shadow.camera.right = 6, I.shadow.camera.top = 6, I.shadow.camera.bottom = -6, I.shadow.normalBias = 0.035, n.add(I, I.target);
  const u = new Fe(1, 0.025, 1.24), b = new vt({
    color: 7052720,
    transparent: !0,
    opacity: 0.28
  }), E = new Ye(u, b);
  n.add(E);
  const L = v.mesh(_, "box", 16030584, [
    1,
    0.055,
    0.06
  ], [
    0,
    0,
    0.75
  ]), P = v.mesh(_, "sphere", 14645088, [
    0.075,
    0.075,
    0.075
  ], [
    0,
    0,
    0.79
  ]), y = qt(), g = matchMedia("(prefers-reduced-motion: reduce)");
  let f = {
    run: null,
    direction: 1,
    overview: !0,
    enabled: !1
  }, x = null, Q = !1, B = !0, W = 0, O = 0, q = 0, Z = 0, $ = null, ne = 0, ee = !1, se = 0.3, te = 1, G = 1.7, U = 4.5, X = !1, ae = 0, fe = !1;
  const pe = new dt();
  function F() {
    if (Q) return;
    const { width: d, height: z } = e.getBoundingClientRect();
    a.setPixelRatio(je(d, z, window.devicePixelRatio || 1, y.current())), a.setSize(Math.max(1, d), Math.max(1, z), !1);
    const K = Math.max(0.2, d / Math.max(1, z));
    i.left = -U * K, i.right = U * K, i.top = U, i.bottom = -U, i.updateProjectionMatrix();
  }
  function re() {
    return !Q && B && !document.hidden;
  }
  function Y() {
    return !!f.run && Ce(f.run) === "playing" && !f.overview;
  }
  function ce(d) {
    const z = O ? Math.max(0, d - O) : 0;
    return O = d, re() && f.enabled && Y() && !$ && (q += z / 1e3), z;
  }
  function ke() {
    return ce(performance.now()), f.run ? Ue(f.run.seed, f.run.moves.length, q) : 0;
  }
  function me(d, z = !1) {
    const K = ce(d), R = x ? Ke(x).y / 1e3 : 3.2, H = f.overview || !Y(), le = H ? Math.max(5.6, R + 2.7) : 6.7, { width: Qe, height: Ze } = e.getBoundingClientRect(), et = Qe / Math.max(1, Ze), Ie = Math.max(le / 2, (H ? 2.4 : 3.7) / Math.max(0.3, et)) * te, Pe = H ? R / 2 + 0.4 : Math.max(1.9, R + 0.6);
    fe = Math.abs(Ie - U) > 0.01 || Math.abs(Pe - G) > 0.01;
    const Te = z || g.matches ? 1 : Math.min(1, K / 160);
    G += (Pe - G) * Te, Math.abs(Ie - U) > 2e-3 && (U += (Ie - U) * Te, F()), pe.set(0, G, 0), i.position.set(Math.sin(se) * 16, G + 6.2, Math.cos(se) * 16), i.lookAt(pe), I.position.set(-5, G + 10, 8), I.target.position.set(0, G, 0);
    const Le = f.run ? Ue(f.run.seed, f.run.moves.length, q) / 1e3 : 0, De = ve[(f.run ? Me(f.run.seed)[f.run.moves.length] : "wide") ?? "wide"];
    if (h.crane.visible = M.visible = E.visible = Y() && !$, h.crane.position.y = R + De.height / 1e3 + 2.1, h.carriage.position.x = Le, M.position.set(Le, R + 1.2, 0), E.position.set(Le, R + 0.025, 0), E.scale.x = De.foot / 1e3, $) {
      const j = g.matches ? 1 : Math.min(1, (d - Z) / 550);
      $.position.y = ne + (1 - j) ** 3 * 1.7, $.scale.y = 1 - Math.sin(j * Math.PI) * 0.045;
      const de = $.userData.resident;
      de && (de.position.y = Math.sin(j * Math.PI * 2) * 0.08), j >= 1 && ($.position.y = ne, $.scale.y = 1, $ = null, r(!1));
    }
    if (ee) {
      const j = Math.min(1, (d - Z) / (g.matches ? 1 : 1300));
      C.children.forEach((de, ge) => {
        de.rotation.z = (ge % 2 ? -1 : 1) * j * 0.3, de.position.x = x.placed[ge].x / 1e3 + j * j * (ge % 2 ? -1 : 1) * 2, de.position.y = x.placed[ge].y / 1e3 - j * j * (ge + 2);
      }), j === 1 && (ee = !1, r(!1));
    }
    a.render(n, i), Y() && f.enabled && !$ && K && y.sample(K);
  }
  function _e(d) {
    if (W = 0, !re()) {
      O = 0;
      return;
    }
    try {
      me(d);
    } catch (z) {
      f.enabled = !1, o(z);
      return;
    }
    Y() && f.enabled || $ || ee || fe ? W = requestAnimationFrame(_e) : O = 0;
  }
  function N() {
    !W && re() && (W = requestAnimationFrame(_e));
  }
  function ie() {
    W && (cancelAnimationFrame(W), W = 0), O = 0;
  }
  function he(d) {
    ce(performance.now());
    const z = f.run?.id !== d.run?.id || f.run?.moves.length !== d.run?.moves.length || f.overview !== d.overview, K = d.run && d.run.id === f.run?.id && d.run.moves.length === f.run.moves.length + 1;
    if (f = d, z || !C.children.length) {
      if (q = 0, ee = !1, $ = null, r(!1), C.clear(), x = d.run ? qe(d.run) : null, x) {
        if (x.placed.slice(0, x.placed.length - +!!x.failure).forEach((R, H) => {
          const le = Ae(v, R.kind, R.direction, H);
          le.position.set(R.x / 1e3, R.y / 1e3, 0), C.add(le);
        }), K && !x.failure && !d.overview && ($ = C.children.at(-1), ne = $.position.y, Z = performance.now(), r(!0)), _.visible = !d.overview && Ce(d.run) === "playing" && !!x.supports.length, _.visible) {
          const R = x.placed[x.weak], H = x.supports[x.weak];
          _.position.y = R.y / 1e3 + 0.03, L.position.x = (R.left + R.right) / 2e3, L.scale.x = Math.max(0.01, (R.right - R.left) / 1e3), P.position.x = H.center / 1e3, L.material = P.material = v.material(H.ratio < 0.25 ? 14645088 : 4954513);
        }
      } else
        _.visible = !1, [
          "wide",
          "loft",
          "balcony"
        ].forEach((R, H) => {
          const le = Ae(v, R, 1, H);
          le.position.set([
            0,
            -0.12,
            -0.32
          ][H], H === 2 ? 2.2 : H, 0), C.add(le);
        }), G = 1.6;
      y.boundary(), a.shadowMap.enabled = y.current() > 0, F();
    }
    M.clear(), d.run && Y() && M.add(Ae(v, Me(d.run.seed)[d.run.moves.length], d.direction, d.run.moves.length, !1)), f.enabled || (O = 0), N();
  }
  function be() {
    ie(), N();
  }
  function xe(d) {
    d.preventDefault(), ie(), o(/* @__PURE__ */ new Error("stacking_webgl_context_lost"));
  }
  function ye(d) {
    !f.overview && Y() || (X = !0, ae = d.clientX, e.setPointerCapture(d.pointerId));
  }
  function Se(d) {
    X && (se += (d.clientX - ae) * 8e-3, ae = d.clientX, N());
  }
  function p() {
    X = !1;
  }
  function c(d) {
    !f.overview && Y() || (d.preventDefault(), te = Math.max(0.65, Math.min(1.5, te + d.deltaY * 1e-3)), N());
  }
  const S = new ResizeObserver(() => {
    F(), N();
  });
  S.observe(e);
  const Oe = new IntersectionObserver((d) => {
    B = d[0].isIntersecting, be();
  });
  return Oe.observe(e), document.addEventListener("visibilitychange", be), a.domElement.addEventListener("webglcontextlost", xe), e.addEventListener("pointerdown", ye), e.addEventListener("pointermove", Se), e.addEventListener("pointerup", p), e.addEventListener("pointercancel", p), e.addEventListener("wheel", c, { passive: !1 }), he(f), F(), N(), {
    set: he,
    coordinate: ke,
    suspend() {
      B = !1, ie();
    },
    resume() {
      B = !0, O = 0, N();
    },
    collapse() {
      !x || !x.failure || (Z = performance.now(), ee = !0, r(!0), N());
    },
    rotate(d) {
      se += d, N();
    },
    zoom(d) {
      te = Math.max(0.65, Math.min(1.5, te + d)), N();
    },
    async snapshot() {
      const d = e.getBoundingClientRect();
      me(performance.now(), !0), a.setPixelRatio(je(d.width, d.height, 2, 2)), a.render(n, i);
      try {
        return await new Promise((z, K) => a.domElement.toBlob((R) => R ? z(R) : K(/* @__PURE__ */ new Error("stacking_export")), "image/png"));
      } finally {
        F(), N();
      }
    },
    stats: () => ({
      ...a.info.memory,
      calls: a.info.render.calls,
      quality: y.current(),
      width: a.domElement.width,
      height: a.domElement.height
    }),
    dispose() {
      Q = !0, ie(), S.disconnect(), Oe.disconnect(), document.removeEventListener("visibilitychange", be), a.domElement.removeEventListener("webglcontextlost", xe), e.removeEventListener("pointerdown", ye), e.removeEventListener("pointermove", Se), e.removeEventListener("pointerup", p), e.removeEventListener("pointercancel", p), e.removeEventListener("wheel", c), u.dispose(), b.dispose(), v.dispose(), a.dispose(), a.forceContextLoss(), a.domElement.remove();
    }
  };
}
function Pt() {
  let e = null;
  const o = {
    drop: [320, 190],
    land: [520, 660],
    danger: [260, 220],
    lose: [
      260,
      200,
      120
    ],
    reward: [
      523,
      659,
      784,
      1047
    ]
  };
  return {
    async unlock() {
      e ??= new AudioContext(), e.state === "suspended" && await e.resume();
    },
    play(r) {
      !e || e.state !== "running" || o[r].forEach((a, n) => {
        const i = e.createOscillator(), v = e.createGain(), h = e.currentTime + n * 0.085;
        i.type = r === "lose" ? "triangle" : "sine", i.frequency.setValueAtTime(a, h), v.gain.setValueAtTime(0, h), v.gain.linearRampToValueAtTime(0.065, h + 8e-3), v.gain.exponentialRampToValueAtTime(1e-3, h + 0.2), i.connect(v), v.connect(e.destination), i.start(h), i.stop(h + 0.21), i.onended = () => {
          i.disconnect(), v.disconnect();
        };
      });
    },
    async pause() {
      e?.state === "running" && await e.suspend();
    },
    async dispose() {
      const r = e;
      e = null, r && r.state !== "closed" && await r.close();
    }
  };
}
var Be = "LittleWhiteBox:stacking:pending";
function Tt(e) {
  return {
    read() {
      try {
        const o = e.getItem(Be);
        if (o === null) return null;
        const r = JSON.parse(o), a = Ve(r.runId), n = Ve(r.request.actionId), i = r.request.revision, v = $t(r.request.command);
        return (!Number.isSafeInteger(i) || i < 0 || v.type === "start") && oe("recovery"), {
          runId: a,
          request: {
            actionId: n,
            revision: i,
            command: v
          }
        };
      } catch {
        return oe("recovery");
      }
    },
    write(o) {
      try {
        e.setItem(Be, JSON.stringify(o));
      } catch {
        oe("recovery");
      }
    },
    clear() {
      try {
        e.removeItem(Be);
      } catch {
        oe("recovery");
      }
    }
  };
}
var Dt = {
  viewBox: "-1400 -1350 2900 1550",
  "aria-hidden": "true",
  class: "stack-house-icon"
}, zt = ["transform"], Nt = [
  "x",
  "y",
  "width",
  "height",
  "fill"
], Ht = {
  key: 0,
  x: "600",
  y: "-850",
  width: "650",
  height: "670",
  rx: "80",
  fill: "#b88ac2"
}, Gt = [
  "x",
  "y",
  "width"
], Ut = ["cx"], Vt = /* @__PURE__ */ Xe({
  __name: "HouseIcon",
  props: {
    kind: {},
    direction: {}
  },
  setup(e) {
    const o = e, r = D(() => ve[o.kind]), a = D(() => "#" + r.value.color.toString(16).padStart(6, "0"));
    return (n, i) => (w(), k("svg", Dt, [l("g", { transform: `scale(${e.direction ?? 1},1)` }, [
      l("rect", {
        x: -r.value.foot / 2,
        y: -r.value.height,
        width: r.value.foot,
        height: r.value.height,
        rx: "100",
        fill: a.value
      }, null, 8, Nt),
      e.kind === "balcony" ? (w(), k("rect", Ht)) : A("", !0),
      l("rect", {
        x: r.value.offset - r.value.top / 2,
        y: -r.value.height - 50,
        width: r.value.top,
        height: "140",
        rx: "50",
        fill: "#fffaf0"
      }, null, 8, Gt),
      i[0] || (i[0] = l("rect", {
        x: "-360",
        y: "-760",
        width: "260",
        height: "300",
        rx: "40",
        fill: "#fff0b4"
      }, null, -1)),
      i[1] || (i[1] = l("rect", {
        x: "100",
        y: "-760",
        width: "260",
        height: "300",
        rx: "40",
        fill: "#fff0b4"
      }, null, -1)),
      l("circle", {
        cx: r.value.center,
        cy: "-160",
        r: "60",
        fill: "#536f7b"
      }, null, 8, Ut)
    ], 8, zt)]));
  }
}), We = Vt, jt = ["aria-label"], Wt = { class: "stack-topbar" }, Xt = { key: 0 }, Ft = ["aria-label"], Yt = ["disabled", "aria-pressed"], Kt = {
  key: 0,
  class: "stack-notice",
  role: "alert"
}, Jt = ["disabled"], Qt = ["disabled"], Zt = {
  key: 1,
  class: "stack-notice",
  role: "alert"
}, ea = ["aria-label"], ta = { class: "stack-stage" }, aa = ["aria-label"], na = {
  key: 0,
  class: "stack-hud"
}, oa = {
  key: 1,
  class: "stack-overlay",
  role: "alert"
}, sa = {
  key: 2,
  class: "stack-pause"
}, ra = {
  key: 3,
  class: "stack-view-controls"
}, ia = ["aria-label"], la = ["aria-label"], ua = ["aria-label"], ca = ["aria-label"], da = ["disabled"], va = {
  key: 2,
  class: "stack-controls"
}, fa = {
  key: 0,
  class: "stack-result"
}, pa = { class: "stack-queue" }, ma = { key: 0 }, ha = {
  key: 1,
  class: "stack-next"
}, ba = { class: "stack-actions" }, ya = ["disabled"], ga = ["disabled"], wa = ["disabled"], ka = ["disabled"], _a = { class: "stack-bottom" }, xa = { role: "status" }, Sa = ["disabled"], Ea = {
  key: 0,
  class: "stack-result"
}, Ma = { key: 0 }, Ca = {
  key: 1,
  class: "stack-reason"
}, Ia = { class: "stack-actions" }, La = ["disabled"], $a = {
  key: 2,
  class: "stack-reason"
}, Ra = { id: "stack-dialog-title" }, Aa = ["aria-label"], Ba = { key: 0 }, qa = { class: "stack-actions" }, Oa = ["disabled"], Pa = /* @__PURE__ */ Xe({
  __name: "StackingRoom",
  props: {
    bridge: {},
    chatIdentity: {},
    generationActive: { type: Boolean }
  },
  setup(e) {
    const o = e, r = Tt({
      getItem: (p) => localStorage.getItem(p),
      setItem: (p, c) => localStorage.setItem(p, c),
      removeItem: (p) => localStorage.removeItem(p)
    }), a = Rt(o.bridge, o.chatIdentity, r), { view: n, busy: i, blocked: v, failed: h, notice: C, generating: M } = a, _ = T(null), I = T(null), u = T(null), b = T(1), E = T(!1), L = T(!1), P = T(!1), y = T(!0), g = T(!1), f = T(""), x = T(!1), Q = T(!1);
    let B = null, W = !1;
    const O = Pt(), q = D(() => L.value ? n.value?.best ?? null : n.value?.active ?? null), Z = D(() => q.value ? Ce(q.value) : null), $ = D(() => Z.value === "playing" && !L.value), ne = D(() => q.value ? Re(q.value) : 0), ee = D(() => Et(ne.value)), se = D(() => q.value ? Me(q.value.seed) : []), te = D(() => se.value[q.value?.moves.length ?? 0]), G = D(() => se.value[(q.value?.moves.length ?? 0) + 1]), U = D(() => y.value && !v.value && !o.generationActive && !E.value && !u.value && !g.value), X = D(() => !U.value || P.value), ae = D(() => n.value?.board?.supports[n.value.board.weak]);
    ct(I, () => {
      u.value = null;
    }), ut(() => L.value ? (L.value = !1, !0) : !1);
    function fe() {
      B?.set({
        run: q.value,
        direction: b.value,
        overview: L.value || !$.value,
        enabled: U.value
      });
    }
    function pe() {
      B?.dispose(), B = null, g.value = !1;
      try {
        B = Ot(_.value, () => {
          g.value = !0, F();
        }, (p) => {
          P.value = p;
        }), fe();
      } catch {
        g.value = !0;
      }
    }
    async function F() {
      try {
        await O.pause();
      } catch {
        f.value = s.soundError;
      }
    }
    async function re() {
      if (n.value?.soundEnabled)
        try {
          await O.unlock();
        } catch {
          f.value = s.soundError;
        }
    }
    async function Y() {
      if (!(x.value || !n.value)) {
        x.value = !0, f.value = "";
        try {
          const p = !n.value.soundEnabled;
          p && await O.unlock(), await a.setSoundEnabled(p), p || await O.pause();
        } catch {
          f.value = s.soundError;
        } finally {
          x.value = !1;
        }
      }
    }
    async function ce(p) {
      if (re(), await a.act(p) && (L.value = !1, Q.value = !1, p.type === "start" && (b.value = 1, E.value = !1), n.value?.soundEnabled)) {
        const c = n.value.active ? Ce(n.value.active) : null;
        O.play(c === "lost" ? "lose" : c === "won" || c === "cashed" ? "reward" : "land");
      }
    }
    function ke() {
      if (X.value || !$.value || !B) return;
      const p = B.coordinate();
      re(), n.value?.soundEnabled && O.play("drop"), ce({
        type: "drop",
        x: p,
        direction: b.value
      });
    }
    function me() {
      !X.value && $.value && (b.value = b.value === 1 ? -1 : 1, re());
    }
    async function _e() {
      const p = u.value;
      u.value = null, p && p !== "rules" && await ce({ type: p });
    }
    async function N() {
      if (B)
        try {
          const p = await B.snapshot(), c = URL.createObjectURL(p), S = document.createElement("a");
          S.href = c, S.download = s.exportName(ne.value), S.click(), setTimeout(() => URL.revokeObjectURL(c), 1e3);
        } catch {
          f.value = s.exportError;
        }
    }
    function ie(p) {
      B?.rotate(p);
    }
    function he(p) {
      B?.zoom(p);
    }
    function be() {
      B?.collapse(), Q.value = !0;
    }
    function xe(p) {
      p.repeat || u.value || p.target.closest("input, textarea, select") || (p.code === "Space" && !p.target.closest("button") && (p.preventDefault(), ke()), (p.code === "ArrowLeft" || p.code === "ArrowRight") && (p.preventDefault(), me()));
    }
    function ye() {
      document.hidden && F();
    }
    $e([
      q,
      b,
      U,
      L
    ], fe), $e(() => ae.value?.ratio, (p, c) => {
      p !== void 0 && p < 0.25 && (c === void 0 || c >= 0.25) && n.value?.soundEnabled && O.play("danger");
    }), $e([
      E,
      u,
      y,
      g,
      () => o.generationActive
    ], () => {
      (E.value || u.value || !y.value || g.value || o.generationActive) && F();
    }), rt(async () => {
      pe(), document.addEventListener("visibilitychange", ye), await a.read(), W = !0;
    }), nt(() => {
      y.value = !0, B?.resume(), W && a.read();
    }), at(() => {
      y.value = !1, B?.suspend(), F();
    }), it(() => {
      a.dispose(), B?.dispose(), document.removeEventListener("visibilitychange", ye), O.dispose().catch((p) => console.error(s.audioDispose, p));
    });
    async function Se() {
      await ot(), pe();
    }
    return (p, c) => (w(), k("section", {
      class: "stacking-room",
      tabindex: "0",
      "aria-label": t(s).name,
      onKeydown: xe
    }, [
      l("header", Wt, [l("div", null, [l("strong", null, m(t(n) ? t(s).balance(t(n).balance) : t(s).loading), 1), t(n)?.best ? (w(), k("small", Xt, m(L.value ? t(s).best : t(s).bestCount(t(Re)(t(n).best))), 1)) : A("", !0)]), l("nav", { "aria-label": t(s).name }, [l("button", {
        type: "button",
        disabled: x.value || t(i) || !t(n),
        "aria-pressed": t(n)?.soundEnabled,
        onClick: Y
      }, m(t(n)?.soundEnabled ? t(s).soundOn : t(s).soundOff), 9, Yt), l("button", {
        type: "button",
        onClick: c[0] || (c[0] = (S) => u.value = "rules")
      }, m(t(s).rules), 1)], 8, Ft)]),
      t(C) || t(h) || t(n)?.pending || t(n)?.writeState === "failed" ? (w(), k("aside", Kt, [
        l("span", null, m(t(C) || t(s).saveProblem), 1),
        l("button", {
          type: "button",
          disabled: t(i),
          onClick: c[1] || (c[1] = (...S) => t(a).recover && t(a).recover(...S))
        }, m(t(s).recover), 9, Jt),
        l("button", {
          type: "button",
          disabled: t(i),
          onClick: c[2] || (c[2] = (...S) => t(a).read && t(a).read(...S))
        }, m(t(s).refresh), 9, Qt)
      ])) : A("", !0),
      f.value ? (w(), k("p", Zt, [Ee(m(f.value), 1), l("button", {
        type: "button",
        "aria-label": t(s).close,
        onClick: c[3] || (c[3] = (S) => f.value = "")
      }, "×", 8, ea)])) : A("", !0),
      l("div", ta, [
        l("div", {
          ref_key: "canvas",
          ref: _,
          class: "stack-canvas",
          "aria-label": t(s).name,
          role: "img"
        }, null, 8, aa),
        q.value ? (w(), k("div", na, [l("strong", null, m(t(s).progress(ne.value)), 1), $.value && ae.value ? (w(), k("span", {
          key: 0,
          class: tt({ "is-risk": ae.value.ratio < 0.25 })
        }, m(ae.value.ratio < 0.25 ? t(s).weak(ae.value.index) : t(s).stable), 3)) : A("", !0)])) : A("", !0),
        g.value ? (w(), k("div", oa, [l("p", null, m(t(s).graphics), 1), l("button", {
          type: "button",
          onClick: Se
        }, m(t(s).reload), 1)])) : $.value && (E.value || e.generationActive) ? (w(), k("div", sa, [l("span", null, m(e.generationActive ? t(s).storyBusy : t(s).paused), 1), e.generationActive ? A("", !0) : (w(), k("button", {
          key: 0,
          type: "button",
          onClick: c[4] || (c[4] = (S) => E.value = !1)
        }, m(t(s).play), 1))])) : A("", !0),
        q.value && !$.value && !g.value ? (w(), k("div", ra, [
          l("button", {
            type: "button",
            "aria-label": t(s).rotateLeft,
            onClick: c[5] || (c[5] = (S) => ie(-0.3))
          }, "↶", 8, ia),
          l("button", {
            type: "button",
            "aria-label": t(s).rotateRight,
            onClick: c[6] || (c[6] = (S) => ie(0.3))
          }, "↷", 8, la),
          l("button", {
            type: "button",
            "aria-label": t(s).zoomIn,
            onClick: c[7] || (c[7] = (S) => he(-0.12))
          }, "＋", 8, ua),
          l("button", {
            type: "button",
            "aria-label": t(s).zoomOut,
            onClick: c[8] || (c[8] = (S) => he(0.12))
          }, "−", 8, ca),
          l("button", {
            type: "button",
            disabled: P.value,
            onClick: N
          }, m(t(s).export), 9, da)
        ])) : A("", !0)
      ]),
      t(n) ? (w(), k("footer", va, [L.value ? (w(), k("div", fa, [l("strong", null, m(t(s).bestCount(ne.value)), 1), l("button", {
        type: "button",
        onClick: c[9] || (c[9] = (S) => L.value = !1)
      }, m(t(s).back), 1)])) : $.value ? (w(), k(we, { key: 1 }, [
        l("div", pa, [te.value ? (w(), k("div", ma, [Ne(We, {
          kind: te.value,
          direction: b.value
        }, null, 8, ["kind", "direction"]), l("span", null, [l("small", null, m(t(s).now) + " · " + m(t(s).orient(b.value)), 1), Ee(m(t(He)[te.value]), 1)])])) : A("", !0), G.value ? (w(), k("div", ha, [Ne(We, { kind: G.value }, null, 8, ["kind"]), l("span", null, [l("small", null, m(t(s).next), 1), Ee(m(t(He)[G.value]), 1)])])) : A("", !0)]),
        l("div", ba, [
          l("button", {
            type: "button",
            disabled: X.value,
            onClick: me
          }, m(t(s).flip), 9, ya),
          l("button", {
            type: "button",
            class: "stack-primary",
            disabled: X.value,
            onClick: ke
          }, m(t(s).drop) + " ↓", 9, ga),
          ee.value ? (w(), k("button", {
            key: 0,
            type: "button",
            disabled: X.value,
            onClick: c[10] || (c[10] = (S) => u.value = "cashout")
          }, m(t(s).cash(ee.value)), 9, wa)) : (w(), k("button", {
            key: 1,
            type: "button",
            disabled: t(i) || P.value,
            onClick: c[11] || (c[11] = (S) => E.value = !E.value)
          }, m(E.value ? t(s).play : t(s).pause), 9, ka))
        ]),
        l("div", _a, [l("span", xa, m(t(M) ? t(s).generating : t(i) ? t(s).saving : t(s).saved), 1), l("button", {
          type: "button",
          disabled: t(v) || P.value,
          onClick: c[12] || (c[12] = (S) => u.value = "abandon")
        }, m(t(s).abandon), 9, Sa)])
      ], 64)) : (w(), k(we, { key: 2 }, [
        Z.value ? (w(), k("div", Ea, [l("strong", null, m(t(s)[Z.value]), 1), q.value ? (w(), k("span", Ma, m(t(s).reward(t(n).award)), 1)) : A("", !0)])) : A("", !0),
        Z.value === "lost" && t(n).board?.failure ? (w(), k("p", Ca, [Ee(m(t(s).failure[t(n).board.failure]), 1), Q.value ? A("", !0) : (w(), k("button", {
          key: 0,
          type: "button",
          onClick: be
        }, m(t(s).collapse), 1))])) : A("", !0),
        l("div", Ia, [l("button", {
          type: "button",
          class: "stack-primary",
          disabled: X.value || t(n).balance < t(V).fee,
          onClick: c[13] || (c[13] = (S) => u.value = "start")
        }, m(t(s).start), 9, La), t(n).best ? (w(), k("button", {
          key: 0,
          type: "button",
          onClick: c[14] || (c[14] = (S) => L.value = !0)
        }, m(t(s).bestCount(t(Re)(t(n).best))), 1)) : A("", !0)]),
        t(n).balance < t(V).fee ? (w(), k("p", $a, m(t(s).noFunds), 1)) : A("", !0)
      ], 64))])) : A("", !0),
      u.value ? (w(), k("div", {
        key: 3,
        class: "stack-backdrop",
        onClick: c[17] || (c[17] = lt((S) => u.value = null, ["self"]))
      }, [l("section", {
        ref_key: "dialog",
        ref: I,
        class: "stack-dialog",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "stack-dialog-title",
        tabindex: "-1"
      }, [l("header", null, [l("h2", Ra, m(u.value === "rules" ? t(s).rules : u.value === "start" ? t(s).admissionTitle : u.value === "cashout" ? t(s).cashTitle : t(s).abandonTitle), 1), l("button", {
        type: "button",
        "aria-label": t(s).close,
        onClick: c[15] || (c[15] = (S) => u.value = null)
      }, "×", 8, Aa)]), u.value === "rules" ? (w(), k(we, { key: 0 }, [l("ul", null, [(w(!0), k(we, null, st(t(s).ruleItems, (S) => (w(), k("li", { key: S }, m(S), 1))), 128))]), l("p", null, m(t(s).stages), 1)], 64)) : (w(), k(we, { key: 1 }, [
        l("p", null, m(u.value === "start" ? t(s).admissionBody : u.value === "cashout" ? t(s).cashBody : t(s).abandonBody), 1),
        u.value === "start" ? (w(), k("p", Ba, m(t(s).stages), 1)) : A("", !0),
        l("div", qa, [l("button", {
          type: "button",
          onClick: c[16] || (c[16] = (S) => u.value = null)
        }, m(t(s).cancel), 1), l("button", {
          type: "button",
          class: "stack-primary",
          disabled: t(v) || e.generationActive,
          onClick: _e
        }, m(u.value === "start" ? t(s).start : u.value === "cashout" ? t(s).cash(ee.value) : t(s).confirm), 9, Oa)])
      ], 64))], 512)])) : A("", !0)
    ], 40, jt));
  }
}), Ha = Pa;
export {
  Ha as default
};
