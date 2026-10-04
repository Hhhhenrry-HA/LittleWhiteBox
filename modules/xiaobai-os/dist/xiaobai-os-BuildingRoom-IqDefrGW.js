/* eslint-disable */
import { B as Tt, C as B, D as At, E as ct, F as qt, G as ke, I as Wt, O as Ye, P as vt, Q as Ue, R as Zt, S as Ve, U as c, _ as V, at as J, b as F, dt as _t, ft as k, g as Ut, k as Ee, lt as t, o as Gt, ot as mt, s as Yt, ut as tt, w as m, x as v } from "./xiaobai-os-frame-bridge-CrPFvkI3.js";
import { A as Ft, B as Kt, C as Xt, D as Jt, E as Pt, F as Qt, H as Mt, I as Bt, L as Ot, M as Ae, N as W, O as ea, P as De, R as st, S as ta, T as aa, U as St, V as N, _ as Ct, a as Lt, b as at, c as $t, d as la, f as ia, g as na, h as wt, i as Ge, j as oa, k as sa, l as ra, m as ua, n as o, o as lt, p as da, r as It, s as ca, t as va, u as Nt, v as jt, w as xt, x as Vt, y as ma, z as it } from "./xiaobai-os-copy-KuhUsS8Y.js";
import { At as bt, K as fa, Ot as pa, S as ha, St as ba, X as ya, _t as ka, a as ga, g as wa, gt as xa, m as _a, n as Ma, o as Sa, q as ft, rt as Ca, t as $a, u as Ia, x as Pe } from "./xiaobai-os-RoundedBoxGeometry-CpWqoTdO.js";
import { a as za, i as Ea, o as Ra, r as Ta } from "./xiaobai-os-performance-DI1X_0MO.js";
import { t as Aa } from "./xiaobai-os-BufferGeometryUtils-lRQBSDG9.js";
function Pa(e, l) {
  const a = wt(e, l), n = {
    bedroom: a.habitable,
    lounge: a.spaces.some((i) => i.activity === "relax" && !i.issue),
    outdoor: a.spaces.some((i) => (i.activity === "garden" || i.activity === "sunbathe") && !i.issue)
  }, u = Object.values(n).every(Boolean), b = [
    {
      id: "quietReading",
      met: a.spaces.some((i) => i.activity === "read" && !i.issue)
    },
    {
      id: "sunTerrace",
      met: a.spaces.some((i) => i.activity === "sunbathe" && !i.issue)
    },
    {
      id: "courtyard",
      met: !!ia("courtyard", e, l).part
    }
  ];
  return {
    minimum: n,
    ready: u,
    bonus: u && b.filter((i) => i.met).length >= 2,
    wishes: b
  };
}
function Ba(e) {
  const l = st[e];
  return {
    minWidth: e === "courtyard" ? 5 : 4,
    maxWidth: Ae.maxWidth,
    floors: l.floors,
    minMaterials: l.materials,
    maxMaterials: l.materials + 1
  };
}
function Oa(e, l) {
  let a = e >>> 0;
  const n = (S) => (a = Math.imul(a, 1664525) + 1013904223 >>> 0, Math.floor(a / 4294967296 * S)), u = Ba(l), b = u.minWidth + n(u.maxWidth - u.minWidth + 1), i = st[l], y = {
    seed: e,
    tier: l,
    width: b,
    depth: 3,
    entryZ: 2,
    floors: i.floors,
    entrance: 1 + n(b - 2),
    living: i.living + n(2),
    gardenSide: n(2) ? 1 : -1,
    terraces: l === "terrace" || l === "sunroom" ? 1 : 0,
    materials: u.minMaterials + n(u.maxMaterials - u.minMaterials + 1),
    sunSide: n(2) ? 1 : -1
  }, d = Array(b).fill(1);
  let h = 0, R = b;
  for (let S = 2; S <= i.floors; S++) {
    const s = 2 + n(Math.min(R - 1, 3));
    h += n(R - s + 1), R = s;
    for (let p = h; p < h + R; p++) d[p] = S;
  }
  return {
    ...y,
    heights: Array.from({ length: y.depth }, () => d).flat(),
    gardenSide: y.gardenSide,
    sunSide: y.sunSide
  };
}
function La(e, l = 2) {
  const a = [], n = (b) => {
    !jt(e, b) && wt(e, b).fulfilled && a.push(b);
  };
  for (let b = 0; b <= e.entrance; b++) for (let i = Math.max(b + 1, e.entrance); i < e.width; i++) {
    const y = Array.from({ length: i - b + 1 }, (d, h) => ({
      kind: b + h === e.entrance ? "hall" : "room",
      x: b + h,
      y: 0,
      z: e.entryZ
    }));
    if (y.sort((d, h) => Math.abs(d.x - e.entrance) - Math.abs(h.x - e.entrance)), e.tier === "courtyard") {
      const d = e.gardenSide === -1 ? b - 1 : i + 1;
      n([...y, {
        kind: "garden",
        x: d,
        y: 0,
        z: e.entryZ
      }]);
    } else for (let d = b; d <= i; d++) for (let h = d; h <= i; h++) {
      const R = [...y];
      for (let S = 1; S < e.floors; S++) for (let s = d; s <= h; s++) {
        const p = (e.tier === "sunroom" ? e.sunSide : e.gardenSide) === -1 ? d : h;
        R.push({
          kind: e.terraces && S === e.floors - 1 && s === p ? "terrace" : "room",
          x: s,
          y: S,
          z: e.entryZ
        });
      }
      if (e.tier === "sunroom") for (const S of R.filter((s) => s.kind === "room")) n(R.map((s) => s === S ? {
        ...s,
        kind: "study"
      } : s));
      else n(R);
    }
  }
  a.sort((b, i) => Ct(b) - Ct(i));
  const u = /* @__PURE__ */ new Set();
  return a.filter((b) => {
    const i = JSON.stringify(b.filter((y) => e.tier !== "sunroom" || y.kind === "study" || y.kind === "terrace"));
    return u.has(i) ? !1 : (u.add(i), !0);
  }).slice(0, l);
}
function Fe(e) {
  return {
    seed: e.seed,
    tier: e.tier,
    ...e.site,
    materials: e.site.materials + la(e.memories)
  };
}
function de(e) {
  throw Object.assign(/* @__PURE__ */ new Error(`building_${e}`), { code: `building_${e}` });
}
function pt(e, l) {
  return jt(Fe(e), l) || (e.supply && !oa(e.supply, l) ? "stock" : null);
}
function Dt(e) {
  return (!e || typeof e != "object" || Array.isArray(e)) && de("invalid"), e;
}
function nt(e) {
  return (typeof e != "string" || !/^[a-zA-Z0-9_-]{1,100}$/.test(e)) && de("identity"), e;
}
function Na() {
  return [...crypto.getRandomValues(new Uint32Array(4))].map((e) => e.toString(16).padStart(8, "0")).join("");
}
function yt(e) {
  return (!Number.isInteger(e.z) || Number(e.z) < 0 || Number(e.z) >= Ae.maxDepth || !Number.isInteger(e.x) || !Number.isInteger(e.y) || Number(e.x) < 0 || Number(e.x) >= Ae.maxWidth || Number(e.y) < 0 || Number(e.y) > Math.max(...Ot.map((l) => st[l].floors))) && de("invalid"), {
    x: Number(e.x),
    y: Number(e.y),
    z: Number(e.z)
  };
}
function zt(e) {
  const l = Dt(e);
  return l.kind !== "hall" && !Bt.includes(l.kind) && de("invalid"), {
    kind: l.kind,
    ...yt(l)
  };
}
function ja(e) {
  const l = Dt(e);
  switch (l.type) {
    case "start":
      return { type: l.type };
    case "choose":
      return (!Number.isInteger(l.choice) || Number(l.choice) < 0 || Number(l.choice) >= 3) && de("invalid"), {
        type: l.type,
        choice: Number(l.choice)
      };
    case "put": {
      const a = zt(l.part);
      return a.kind === "hall" && de("invalid"), {
        type: l.type,
        part: a
      };
    }
    case "restore":
      return (!Array.isArray(l.rooms) || l.rooms.length > Ae.maxParts) && de("invalid"), {
        type: l.type,
        rooms: l.rooms.map(zt)
      };
    case "remove":
      return {
        type: l.type,
        ...yt(l)
      };
    case "refit":
      return l.kind !== "room" && l.kind !== "study" && de("invalid"), {
        type: l.type,
        ...yt(l),
        kind: l.kind
      };
    case "finish":
    case "abandon":
      return { type: l.type };
    case "remember":
      return ra.includes(l.memory) || de("invalid"), {
        type: l.type,
        memory: l.memory
      };
    case "reside":
      return {
        type: l.type,
        runId: nt(l.runId)
      };
    case "collect":
      return typeof l.save != "boolean" && de("invalid"), {
        type: l.type,
        runId: nt(l.runId),
        save: l.save
      };
    default:
      return de("invalid");
  }
}
function Va(e, l, a) {
  const n = mt(null), u = J(!1), b = J(""), i = J(!1), y = mt(null), d = J(!1), h = mt(null), R = F(() => !p.value && n.value?.active?.state !== "abandoned" && h.value?.runId === n.value?.active?.id && h.value?.revision === n.value?.revision && !!h.value?.layouts.length);
  let S = !1, s = null;
  const p = F(() => u.value || d.value || !!y.value || !n.value?.ready || n.value.writeState !== "ready" || n.value.pending);
  function x(z) {
    S || (n.value = z);
  }
  function $() {
    const z = a.read(), T = n.value;
    if (!(!z || !T?.ready)) {
      if ("retired" in z) {
        T.writeState === "ready" && !T.pending && (a.clear(), T.active?.id === z.runId && T.revision === z.revision && (b.value = o.retiredIntent));
        return;
      }
      T.active?.id === z.runId && T.revision === z.request.revision ? y.value = z.request : T.writeState === "ready" && !T.pending && a.clear();
    }
  }
  async function E(z, T) {
    if (S || u.value) return !1;
    u.value = !0, s = null, i.value = !!T && "command" in T && T.command.type === "start", b.value = "";
    try {
      z === "act" && T && "command" in T && T.command.type !== "start" && n.value?.active && (y.value = T, a.write({
        runId: n.value.active.id,
        request: T
      }));
      const L = await e.request(`game/building/${z}`, {
        chatIdentity: l,
        ...T
      }, 35e3), P = s;
      return x(P && P.revision >= L.result.revision ? P : L.result), $(), d.value = !1, n.value?.writeState === "ready" && !n.value.pending && (!y.value || n.value.revision > y.value.revision) && (y.value = null), !0;
    } catch (L) {
      if (!S) {
        if (s && x(s), z === "sound") throw L;
        b.value = $t(L);
        const P = L && typeof L == "object" && "code" in L ? String(L.code) : L instanceof Error ? L.message : "";
        if (P === "building_recovery" && (d.value = !0), T && "command" in T && (P.startsWith("building_save_") || P.startsWith("host_request_"))) y.value = T;
        else if (z === "act" && P !== "building_recovery") try {
          a.clear(), y.value = null;
        } catch (U) {
          d.value = !0, b.value = $t(U);
        }
      }
      return !1;
    } finally {
      S || (u.value = !1, i.value = !1);
    }
  }
  const C = e.subscribe((z) => {
    if (S || z.type !== "game/building/state") return;
    const T = z.payload;
    T.chatIdentity === l && (u.value ? s = T.state : x(T.state));
  });
  async function I() {
    let z = y.value;
    !await E("confirm") || !n.value || n.value.writeState !== "ready" || n.value.pending || (z ??= y.value, z && n.value.revision === z.revision && await E("act", z));
  }
  async function j(z) {
    if (p.value) return !1;
    const T = n.value, L = T.active?.rooms ? structuredClone(T.active.rooms) : null, P = h.value?.runId === T.active?.id && h.value?.revision === T.revision ? h.value.layouts : [], U = await E("act", {
      actionId: Na(),
      revision: T.revision,
      command: z
    }), X = n.value;
    if (U && L && X && X.active?.id === T.active?.id && X.revision === T.revision + 1) {
      const H = z.type === "restore" ? P.slice(0, -1) : [
        "put",
        "remove",
        "refit"
      ].includes(z.type) ? [...P, L] : [];
      h.value = {
        runId: T.active.id,
        revision: X.revision,
        layouts: H
      };
    } else h.value = null;
    return U;
  }
  return {
    view: n,
    busy: u,
    error: b,
    generating: i,
    blocked: p,
    failed: y,
    notice: F(() => b.value || (d.value ? o.recoveryProblem : n.value?.writeState === "conflict" ? o.conflict : n.value?.pending || n.value?.writeState === "unconfirmed" ? o.saveProblem : "")),
    read: () => E("read"),
    recover: I,
    setSoundEnabled: (z) => E("sound", { enabled: z }),
    act: j,
    canUndo: R,
    undo: () => R.value ? j({
      type: "restore",
      rooms: h.value.layouts.at(-1)
    }) : Promise.resolve(!1),
    dispose() {
      S = !0, C();
    }
  };
}
var Da = {
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
function Ha() {
  const e = {
    box: new $a(1, 1, 1, 2, 0.055),
    flat: new Sa(1, 1, 1),
    sphere: new ba(1, 24, 16),
    rod: new _a(1, 1, 1, 16),
    ring: new pa(1, 0.1, 8, 24)
  }, l = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Set();
  function n(i, y = "chalk") {
    const d = `${i}:${y}`;
    return l.has(d) || l.set(d, new ya({
      color: i,
      ...Da[y],
      emissive: y === "light" ? i : 0
    })), l.get(d);
  }
  function u(i, y, d, h, R, S = "chalk") {
    const s = new ft(e[y], n(d, S));
    return s.scale.set(...h), s.position.set(...R), s.castShadow = S !== "cloud", s.receiveShadow = S !== "light", i.add(s), s;
  }
  function b(i) {
    i.updateWorldMatrix(!0, !0);
    const y = i.matrixWorld.clone().invert(), d = /* @__PURE__ */ new Map();
    i.traverse((S) => {
      if (!(S instanceof ft)) return;
      const s = S.geometry.index ? S.geometry.toNonIndexed() : S.geometry.clone();
      s.applyMatrix4(new fa().multiplyMatrices(y, S.matrixWorld));
      const p = S.material, x = d.get(p) ?? [];
      x.push(s), d.set(p, x);
    }), i.clear();
    const h = [], R = [];
    for (const [S, s] of d) {
      const p = Aa(s);
      if (s.forEach(($) => $.dispose()), !p) throw new Error("building_geometry_merge");
      a.add(p), h.push(p);
      const x = new ft(p, S);
      x.castShadow = !0, x.receiveShadow = !0, i.add(x), R.push(x);
    }
    return {
      root: i,
      replace(S, s) {
        R.forEach((p) => {
          p.material === S && (p.material = s);
        });
      },
      dispose() {
        h.forEach((S) => {
          a.delete(S) && S.dispose();
        });
      }
    };
  }
  return {
    mesh: u,
    material: n,
    batch: b,
    dispose() {
      a.forEach((i) => i.dispose()), a.clear(), Object.values(e).forEach((i) => i.dispose()), l.forEach((i) => i.dispose()), l.clear();
    }
  };
}
function qa(e) {
  const l = [];
  function a() {
    const n = [];
    for (; l.length; ) try {
      l.pop()();
    } catch (u) {
      n.push(u);
    }
    if (n.length) throw new AggregateError(n, "building_scene_dispose");
  }
  try {
    return e({
      own(n) {
        return l.push(() => n.dispose()), n;
      },
      defer(n) {
        l.push(n);
      },
      dispose: a
    });
  } catch (n) {
    try {
      a();
    } catch (u) {
      throw new AggregateError([n, u], "building_scene_initialization");
    }
    throw n;
  }
}
var kt = {
  maxPixels: 16e5,
  maxDpr: 2,
  shadow: 1024
};
function Wa(e, l, a) {
  return Math.min(a, kt.maxDpr, Math.sqrt(kt.maxPixels / Math.max(1, e * l)));
}
var r = {
  milk: Number.parseInt(Ra.fur.slice(1), 16),
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
};
function ze(e, l) {
  return (l - (e.width - 1) / 2) * W.width;
}
function Me(e, l) {
  return (l - (e.depth - 1) / 2) * W.depth;
}
function Za(e, l, a, n, u, b) {
  const i = new Pe(), y = De[n.kind], d = y.width * W.width, h = W.height;
  i.position.set(ze(l, n.x) + (y.width - 1) * W.width / 2, n.y * h, Me(l, n.z));
  const R = Pt(a), S = Xt(l, a), s = (x, $, E, C = "chalk") => e.mesh(i, "box", x, $, E, C), p = (x, $, E) => e.mesh(i, "sphere", x, $, E);
  if (St(n.kind)) {
    s(r.porcelain, [
      d,
      0.1,
      W.depth
    ], [
      0,
      0.05,
      0
    ]);
    const x = it(n).some((C) => R.has(N({
      ...C,
      z: C.z - 1
    })));
    if (!x) s(r.milk, [
      d,
      0.38,
      0.1
    ], [
      0,
      0.24,
      -0.52
    ]);
    else for (const C of [-d / 2 + 0.05, d / 2 - 0.05]) s(r.milk, [
      0.1,
      0.38,
      0.1
    ], [
      C,
      0.24,
      -0.52
    ]);
    for (const C of [-1, 1]) {
      const I = R.get(N({
        x: C < 0 ? n.x - 1 : n.x + y.width,
        y: n.y,
        z: n.z
      }));
      if (!I || I.kind === "roof") {
        const j = C * (d / 2 - 0.05);
        if (n.kind === "study" && ta(n, a).includes(C)) {
          for (const z of [-0.44, 0.44]) s(r.milk, [
            0.1,
            h,
            0.27
          ], [
            j,
            h / 2,
            z
          ]);
          s(r.milk, [
            0.1,
            0.35,
            0.62
          ], [
            j,
            0.175,
            0
          ]), s(r.milk, [
            0.1,
            0.12,
            0.62
          ], [
            j,
            h - 0.06,
            0
          ]), s(r.glass, [
            0.035,
            0.62,
            0.62
          ], [
            j,
            0.67,
            0
          ], "glass"), s(r.mint, [
            0.12,
            0.045,
            0.64
          ], [
            j,
            0.35,
            0
          ], "enamel"), s(r.porcelain, [
            0.055,
            0.63,
            0.025
          ], [
            j,
            0.67,
            0
          ]);
        } else s(r.milk, [
          0.1,
          0.38,
          W.depth
        ], [
          j,
          0.24,
          0
        ]);
      } else if (!St(I.kind)) {
        if (n.kind === "study") {
          const j = C * (d / 2 - 0.05);
          for (const z of [-0.53, 0.02]) s(r.milk, [
            0.1,
            h,
            0.09
          ], [
            j,
            h / 2,
            z
          ]);
          s(r.milk, [
            0.1,
            0.3,
            0.47
          ], [
            j,
            0.15,
            -0.26
          ]), s(r.glass, [
            0.035,
            0.62,
            0.47
          ], [
            j,
            0.64,
            -0.26
          ], "glass"), s(r.mint, [
            0.12,
            0.04,
            0.5
          ], [
            j,
            0.33,
            -0.26
          ], "enamel"), s(r.porcelain, [
            0.055,
            0.62,
            0.025
          ], [
            j,
            0.64,
            -0.26
          ]);
        }
        for (const j of [-0.48, 0.48]) s(r.milk, [
          0.1,
          h,
          0.16
        ], [
          C * (d / 2 - 0.05),
          h / 2,
          j
        ]);
        s(r.milk, [
          0.1,
          0.13,
          W.depth
        ], [
          C * (d / 2 - 0.05),
          h - 0.065,
          0
        ]);
      }
      s(r.porcelain, [
        0.06,
        h,
        0.1
      ], [
        C * (d / 2 - 0.035),
        h / 2,
        0.51
      ]);
    }
    s(r.porcelain, [
      d,
      0.08,
      0.12
    ], [
      0,
      h - 0.04,
      0.52
    ]), s(r.timber, [
      d - 0.16,
      0.035,
      0.93
    ], [
      0,
      0.115,
      0
    ]);
    const $ = S && it(n).some((C) => N(C) === N(S));
    if ($ && !x) {
      const C = (S.x - n.x - (y.width - 1) / 2) * W.width;
      s(r.mint, [
        0.64,
        0.88,
        0.07
      ], [
        C,
        0.5,
        -0.42
      ], "enamel"), s(u ? r.windowLight : r.glass, [
        0.43,
        0.34,
        0.04
      ], [
        C,
        0.66,
        -0.37
      ], u ? "light" : "glass"), p(r.brass, [
        0.025,
        0.025,
        0.025
      ], [
        C + 0.23,
        0.39,
        -0.36
      ]), s(r.rose, [
        0.64,
        0.025,
        0.36
      ], [
        C,
        0.14,
        0.26
      ]), s(r.porcelain, [
        0.94,
        0.09,
        0.35
      ], [
        C,
        0.04,
        0.69
      ]), s(r.brass, [
        0.12,
        0.19,
        0.12
      ], [
        C - 0.43,
        0.79,
        0.59
      ], "metal"), p(u ? r.windowLight : r.porcelain, [
        0.065,
        0.07,
        0.06
      ], [
        C - 0.43,
        0.78,
        0.65
      ]);
    }
    if (n.kind !== "entry") {
      for (let C = -d / 2 + 0.39; !x && n.kind !== "study" && C < d / 2; C += W.width)
        $ && Math.abs(C - (S.x - n.x - (y.width - 1) / 2) * W.width) < W.width / 2 || (s(r.mint, [
          0.62,
          0.62,
          0.05
        ], [
          C,
          0.7,
          -0.445
        ], "enamel"), s(u ? r.windowLight : r.glass, [
          0.51,
          0.51,
          0.035
        ], [
          C,
          0.7,
          -0.405
        ], u ? "light" : "glass"), s(r.porcelain, [
          0.025,
          0.53,
          0.04
        ], [
          C,
          0.7,
          -0.375
        ]), s(r.porcelain, [
          0.54,
          0.025,
          0.04
        ], [
          C,
          0.7,
          -0.375
        ]));
      if (n.kind === "wide") {
        s(r.rose, [
          1.18,
          0.25,
          0.46
        ], [
          -0.38,
          0.27,
          -0.06
        ], "enamel"), s(r.rose, [
          1.2,
          0.32,
          0.14
        ], [
          -0.38,
          0.49,
          -0.24
        ], "enamel");
        for (const C of [-0.85, 0.11]) s(r.milk, [
          0.17,
          0.21,
          0.47
        ], [
          C,
          0.45,
          -0.055
        ]);
        s(r.timber, [
          0.69,
          0.06,
          0.32
        ], [
          0.59,
          0.43,
          -0.12
        ]), s(r.porcelain, [
          0.09,
          0.28,
          0.09
        ], [
          0.59,
          0.27,
          -0.12
        ]), b.includes("gardenTea") || (p(r.leaves, [
          0.13,
          0.13,
          0.13
        ], [
          0.65,
          0.6,
          -0.12
        ]), s(r.porcelain, [
          0.15,
          0.12,
          0.15
        ], [
          0.65,
          0.49,
          -0.12
        ]));
      } else if (n.kind === "study") {
        s(r.timber, [
          0.29,
          0.74,
          0.22
        ], [
          0.4,
          0.5,
          -0.29
        ]);
        for (const C of [
          0.24,
          0.47,
          0.69
        ]) {
          s(r.milk, [
            0.29,
            0.035,
            0.24
          ], [
            0.4,
            C,
            -0.27
          ]);
          for (let I = 0; I < 3; I++) s([
            r.mint,
            r.rose,
            r.porcelain
          ][I], [
            0.045,
            0.15 - I * 0.02,
            0.16
          ], [
            0.32 + I * 0.075,
            C + 0.09,
            -0.24
          ]);
        }
        s(r.mint, [
          0.46,
          0.13,
          0.44
        ], [
          -0.18,
          0.26,
          -0.06
        ], "enamel"), s(r.mint, [
          0.46,
          0.38,
          0.12
        ], [
          -0.18,
          0.47,
          -0.23
        ], "enamel");
        for (const C of [-0.4, 0.04]) s(r.milk, [
          0.065,
          0.18,
          0.41
        ], [
          C,
          0.37,
          -0.025
        ]);
        s(r.rose, [
          0.71,
          0.018,
          0.6
        ], [
          -0.12,
          0.141,
          0.1
        ]);
      } else n.kind === "room" && (s((n.x + n.y) % 2 ? r.mint : r.rose, [
        0.76,
        0.23,
        0.45
      ], [
        0,
        0.26,
        -0.13
      ], "enamel"), s(r.milk, [
        0.78,
        0.13,
        0.46
      ], [
        0,
        0.43,
        -0.13
      ]), s(r.porcelain, [
        0.6,
        0.09,
        0.18
      ], [
        0,
        0.53,
        -0.27
      ]), s(r.timber, [
        0.16,
        0.33,
        0.19
      ], [
        0.48,
        0.29,
        -0.19
      ]), p(r.windowLight, [
        0.07,
        0.095,
        0.07
      ], [
        0.48,
        0.56,
        -0.19
      ]));
      s(r.porcelain, [
        d - 0.1,
        0.065,
        0.1
      ], [
        0,
        0.16,
        0.52
      ]);
    }
    const E = ea(l, a);
    for (const C of it(n).filter((I) => E.has(N(I)))) {
      const I = (C.x - n.x - (y.width - 1) / 2) * W.width;
      for (let z = 0; z < 8; z++) s(r.porcelain, [
        0.14,
        0.055,
        0.28
      ], [
        I - 0.45 + z * 0.128,
        0.15 + z * h / 8,
        0.39
      ]);
      const j = s(r.brass, [
        1.37,
        0.022,
        0.022
      ], [
        I,
        0.81,
        0.54
      ], "metal");
      j.rotation.z = 0.85;
    }
  } else if (n.kind === "roof") {
    for (const x of [-1, 1]) {
      const $ = s(r.mint, [
        d + 0.055,
        0.12,
        0.78
      ], [
        0,
        0.28,
        x * 0.3
      ], "enamel");
      $.rotation.x = x * 0.44;
      const E = s(r.porcelain, [
        d + 0.08,
        0.07,
        0.1
      ], [
        0,
        0.09,
        x * 0.66
      ]);
      E.rotation.x = x * 0.44;
    }
    s(r.porcelain, [
      d + 0.05,
      0.075,
      0.08
    ], [
      0,
      0.47,
      0
    ]), n.x % 3 === 0 && (s(r.milk, [
      0.22,
      0.43,
      0.24
    ], [
      0.3,
      0.54,
      -0.25
    ]), s(r.timber, [
      0.27,
      0.065,
      0.29
    ], [
      0.3,
      0.78,
      -0.25
    ]));
  } else if (n.kind === "path") {
    s(r.leaves, [
      d - 0.02,
      0.07,
      W.depth - 0.02
    ], [
      0,
      0.035,
      0
    ]);
    for (const x of [
      -0.34,
      0,
      0.34
    ]) s(r.porcelain, [
      0.48,
      0.04,
      0.26
    ], [
      0,
      0.1,
      x
    ]);
  } else if (n.kind === "garden") {
    s(r.leaves, [
      d - 0.04,
      0.1,
      1.2
    ], [
      0,
      0.05,
      0
    ]);
    for (const x of [
      -0.23,
      0.1,
      0.4
    ]) s(r.porcelain, [
      0.4,
      0.035,
      0.24
    ], [
      -0.2,
      0.13,
      x
    ]);
    e.mesh(i, "rod", r.timber, [
      0.055,
      0.63,
      0.055
    ], [
      0.35,
      0.37,
      -0.21
    ]), p(r.mint, [
      0.33,
      0.39,
      0.31
    ], [
      0.35,
      0.88,
      -0.21
    ]), p(r.leaves, [
      0.29,
      0.3,
      0.27
    ], [
      0.47,
      0.72,
      -0.12
    ]);
    for (const x of [
      -0.46,
      0.03,
      0.44
    ]) p(r.rose, [
      0.05,
      0.05,
      0.05
    ], [
      x,
      0.18,
      0.46
    ]);
    if (!R.has(N({
      ...n,
      z: n.z - 1
    }))) {
      s(r.timber, [
        0.9,
        0.035,
        0.035
      ], [
        0,
        0.43,
        -0.55
      ]);
      for (const x of [
        -0.48,
        -0.24,
        0,
        0.24,
        0.48
      ]) s(r.porcelain, [
        0.065,
        0.4,
        0.07
      ], [
        x,
        0.28,
        -0.55
      ]);
    }
  } else {
    s(r.porcelain, [
      d,
      0.11,
      1.17
    ], [
      0,
      0.055,
      0
    ]), s(r.timber, [
      d - 0.12,
      0.035,
      1
    ], [
      0,
      0.13,
      0
    ]);
    for (const x of [
      -0.52,
      -0.26,
      0,
      0.26,
      0.52
    ]) s(r.porcelain, [
      0.035,
      0.43,
      0.045
    ], [
      x,
      0.34,
      0.52
    ]);
    s(r.brass, [
      d - 0.15,
      0.035,
      0.055
    ], [
      0,
      0.56,
      0.52
    ], "metal"), s(r.timber, [
      0.28,
      0.25,
      0.28
    ], [
      0.35,
      0.25,
      -0.23
    ]), p(r.leaves, [
      0.2,
      0.24,
      0.2
    ], [
      0.35,
      0.59,
      -0.23
    ]), s(r.mint, [
      0.36,
      0.07,
      0.33
    ], [
      -0.31,
      0.36,
      -0.12
    ]), s(r.mint, [
      0.36,
      0.35,
      0.06
    ], [
      -0.31,
      0.51,
      -0.25
    ]);
    for (const x of [-0.45, -0.17]) s(r.porcelain, [
      0.04,
      0.23,
      0.04
    ], [
      x,
      0.23,
      -0.1
    ]);
  }
  return {
    root: i,
    dispose: e.batch(i).dispose
  };
}
function Ua(e, l) {
  const a = new Pe(), n = l.width * W.width, u = l.depth * W.depth;
  e.mesh(a, "box", r.milk, [
    n + 0.3,
    0.25,
    u + 0.35
  ], [
    0,
    -0.135,
    0
  ]), e.mesh(a, "box", r.mint, [
    n + 0.43,
    0.16,
    u + 0.5
  ], [
    0,
    -0.34,
    0
  ], "enamel"), e.mesh(a, "box", r.porcelain, [
    n + 0.57,
    0.075,
    u + 0.65
  ], [
    0,
    -0.45,
    0
  ]);
  for (let i = 0; i < l.depth; i++) for (let y = 0; y < l.width; y++) {
    if (l.heights[i * l.width + y] !== 0) continue;
    const d = ze(l, y), h = Me(l, i);
    e.mesh(a, "box", r.glass, [
      W.width,
      0.025,
      W.depth
    ], [
      d,
      5e-3,
      h
    ], "enamel"), e.mesh(a, "sphere", r.stone, [
      0.4,
      0.28,
      0.33
    ], [
      d + 0.23,
      0.1,
      h + 0.22
    ]), e.mesh(a, "sphere", r.leaves, [
      0.28,
      0.08,
      0.22
    ], [
      d - 0.26,
      0.07,
      h - 0.13
    ]);
  }
  const b = ze(l, l.entrance);
  for (let i = 0; i < 3; i++) e.mesh(a, "box", r.porcelain, [
    0.53,
    0.055,
    0.28
  ], [
    b,
    -0.04,
    u / 2 + 0.25 + i * 0.34
  ]);
  for (let i = 0; i < 12; i++) e.mesh(a, "sphere", i % 3 ? r.cloud : r.distantCloud, [
    1 + i % 2 * 0.4,
    0.35,
    0.75
  ], [
    (i - 5.5) * 0.95,
    -0.78 - i % 3 * 0.15,
    (i % 2 ? -1 : 1) * (u / 2 + 0.2)
  ], "cloud");
  return e.batch(a);
}
function Ga(e, l, a) {
  const n = new Pe(), u = a.part;
  n.position.set(ze(l, u.x) + (De[u.kind].width - 1) * W.width / 2, u.y * W.height, Me(l, u.z));
  const b = (d, h, R) => e.mesh(n, "box", d, h, R), i = (d, h, R) => e.mesh(n, "sphere", d, h, R), y = (d, h, R) => e.mesh(n, "rod", d, h, R);
  switch (a.id) {
    case "gardenWalk":
      y(r.porcelain, [
        0.15,
        0.1,
        0.15
      ], [
        -0.38,
        0.15,
        -0.32
      ]), y(r.milk, [
        0.05,
        0.35,
        0.05
      ], [
        -0.38,
        0.34,
        -0.32
      ]), y(r.porcelain, [
        0.24,
        0.08,
        0.24
      ], [
        -0.38,
        0.53,
        -0.32
      ]), y(r.glass, [
        0.2,
        0.018,
        0.2
      ], [
        -0.38,
        0.578,
        -0.32
      ]), i(r.rose, [
        0.07,
        0.08,
        0.06
      ], [
        -0.21,
        0.65,
        -0.32
      ]), i(r.porcelain, [
        0.045,
        0.05,
        0.045
      ], [
        -0.17,
        0.72,
        -0.32
      ]);
      break;
    case "gardenReading":
      b(r.timber, [
        0.36,
        0.15,
        0.2
      ], [
        -0.38,
        0.34,
        -0.38
      ]);
      for (const d of [-0.1, 0.06])
        y(r.leaves, [
          0.015,
          0.3,
          0.015
        ], [
          -0.38 + d,
          0.55,
          -0.38
        ]), i(r.mint, [
          0.09,
          0.055,
          0.07
        ], [
          -0.44 + d,
          0.6,
          -0.38
        ]), i(r.rose, [
          0.055,
          0.06,
          0.05
        ], [
          -0.38 + d,
          0.72,
          -0.38
        ]);
      break;
    case "gardenTea":
      b(r.rose, [
        0.72,
        0.015,
        0.34
      ], [
        0.59,
        0.47,
        -0.12
      ]), i(r.porcelain, [
        0.09,
        0.075,
        0.08
      ], [
        0.65,
        0.59,
        -0.12
      ]), y(r.mint, [
        0.045,
        0.1,
        0.045
      ], [
        0.4,
        0.54,
        -0.12
      ]), y(r.mint, [
        0.045,
        0.1,
        0.045
      ], [
        0.81,
        0.54,
        -0.12
      ]), b(r.timber, [
        0.13,
        0.018,
        0.13
      ], [
        0.55,
        0.49,
        -0.01
      ]);
      break;
    case "quietBedroom":
      b(r.mint, [
        0.77,
        0.025,
        0.3
      ], [
        0,
        0.509,
        -0.055
      ]);
      for (const d of [
        -0.25,
        0,
        0.25
      ]) {
        const h = b(r.milk, [
          0.09,
          0.018,
          0.09
        ], [
          d,
          0.53,
          -0.055
        ]);
        h.rotation.y = Math.PI / 4;
      }
      break;
    case "courtyard":
      for (const d of [-0.5, 0.5]) y(r.timber, [
        0.025,
        1.3,
        0.025
      ], [
        d,
        0.72,
        -0.48
      ]);
      for (let d = 0; d < 7; d++) {
        const h = -0.46 + d * 0.153, R = 1.36 - Math.sin(d / 6 * Math.PI) * 0.14;
        b(r.brass, [
          0.16,
          0.015,
          0.02
        ], [
          h,
          R,
          -0.48
        ]), i(r.windowLight, [
          0.045,
          0.065,
          0.045
        ], [
          h,
          R - 0.085,
          -0.48
        ]);
      }
      break;
  }
  return e.batch(n);
}
var Ya = {
  read: "reading",
  sunbathe: "reclining",
  rest: "sleeping",
  relax: "sipping",
  garden: "looking"
}, Fa = 3600;
function Ka(e, l, a, n) {
  const u = Ea(l), b = Ta(l), i = new Pe();
  i.position.set(0, -0.01, 0.39), i.rotation.x = -0.35, l.add(i);
  for (const O of [-1, 1]) {
    const A = e.mesh(i, "box", r.mint, [
      0.25,
      0.035,
      0.33
    ], [
      O * 0.126,
      0,
      0
    ]);
    A.rotation.z = O * -0.16;
    const w = e.mesh(i, "box", r.porcelain, [
      0.22,
      0.032,
      0.3
    ], [
      O * 0.12,
      0.03,
      0
    ]);
    w.rotation.z = O * -0.16;
  }
  const y = e.mesh(i, "box", r.milk, [
    0.22,
    0.01,
    0.29
  ], [
    0.12,
    0.056,
    0
  ]), d = new Pe();
  d.position.set(0.15, 0.03, 0.36), l.add(d), e.mesh(d, "rod", r.porcelain, [
    0.09,
    0.15,
    0.09
  ], [
    0,
    0,
    0
  ]), e.mesh(d, "rod", r.timber, [
    0.071,
    8e-3,
    0.071
  ], [
    0,
    0.078,
    0
  ]), i.visible = !1, d.visible = !1;
  let h, R = [], S = null, s = [], p = null, x = !1, $ = 0, E = !1, C = [], I = new bt();
  const j = (O) => new bt(ze(h, O.x), O.y * W.height + 0.14 + a, Me(h, O.z) + 0.39);
  function z(O) {
    p = O, n(O);
  }
  function T() {
    S = null, l.position.set(ze(h, h.entrance), 0.05 + a, Me(h, h.entryZ) + 0.72);
  }
  function L() {
    i.visible = !1, d.visible = !1, b.reset();
  }
  function P(O, A, w) {
    h = O, R = A, s = [], E = !1, x = !1, L(), w || !S || !aa(h, R).has(N(S)) ? T() : l.position.copy(j(S)), z(null);
  }
  function U(O) {
    const A = j(O.part);
    return O.activity === "read" && (A.x -= 0.18, A.z = Me(h, O.part.z) + 0.06, A.y += 0.15), O.activity === "sunbathe" && (A.x -= 0.31, A.z = Me(h, O.part.z) + 0.03, A.y += 0.18), O.activity === "rest" && (A.z = Me(h, O.part.z) - 0.13, A.y = O.part.y * W.height + 0.68), O.activity === "relax" && (A.x += 0.2, A.z = Me(h, O.part.z) + 0.1, A.y += 0.23), A;
  }
  function X(O) {
    const A = p.space;
    i.visible = A.activity === "read", d.visible = A.activity === "relax", b.pose(Ya[A.activity], I, $, O);
    const w = O ? 0 : Math.max(0, Math.sin($ / 470));
    y.rotation.z = -w * Math.PI, y.position.x = 0.12 * Math.cos(w * Math.PI), d.position.y = 0.03 + (O ? 0.035 : Math.sin($ / 650) * 0.035);
  }
  function H(O) {
    const A = p.space;
    S = {
      x: A.part.x,
      y: A.part.y,
      z: A.part.z
    }, $ = 0, z({
      phase: "using",
      space: A
    }), X(O);
  }
  function ve(O) {
    const A = s.shift();
    if (!A) {
      x = !1;
      return;
    }
    const w = Jt(h, R, A.part, S ?? void 0);
    if (!w.length) throw new Error("building_life_route");
    L(), I = U(A), C = [l.position.clone()], w.forEach((D, Se) => {
      const se = w[Se - 1];
      if (se && se.y !== D.y) {
        const ye = Math.sign(D.y - se.y), le = j(se), ne = j(D);
        le.x -= 0.43 * ye, ne.x += 0.43 * ye, C.push(le, ne);
      }
      C.push(j(D));
    }), C.push(I.clone()), $ = 0, x = !O, z({
      phase: "walking",
      space: A
    }), O && (s = [], H(!0));
  }
  function ie(O, A = !1) {
    const w = O ? Vt(h, R).filter((D) => !D.issue && N(D.part) === N(O)) : at(h, R);
    w.length && (s = w, E = !0, (!x || A || p?.phase === "using") && (E = !1, ve(A)));
  }
  function ae(O) {
    return !x || !p ? !1 : ($ += O, p.phase === "walking" ? u.walk(C, $) || (H(!1), E && (E = !1, ve(!1))) : (X(!1), $ >= Fa && ve(!1)), x);
  }
  function te() {
    s = [], x = !1, p && (I = U(p.space), H(!0));
  }
  return {
    configure: P,
    visit: ie,
    tick: ae,
    reduce: te
  };
}
var ot = Oa(17, Ot[0]), Et = xt(ot, La(ot)[1]);
function Xa(e, l, a, n, u, b) {
  return qa((i) => {
    const y = new Ma({
      antialias: !0,
      alpha: !1,
      powerPreference: "low-power"
    });
    i.defer(() => y.domElement.remove()), i.defer(() => y.forceContextLoss()), i.own(y), y.domElement.className = "build-canvas", e.append(y.domElement), y.outputColorSpace = xa, y.toneMapping = 7, y.shadowMap.enabled = !0, y.shadowMap.type = 2;
    const d = new ka();
    d.background = new Ia(r.sky);
    const h = new Ca(-5, 5, 5, -5, 0.1, 100), R = i.own(Ha());
    d.add(new ha(r.porcelain, r.mint, 2.1));
    const S = new wa(r.milk, 2.6);
    S.position.set(-5, 10, 8), S.castShadow = !0, S.shadow.mapSize.setScalar(kt.shadow), S.shadow.camera.left = -8, S.shadow.camera.right = 8, S.shadow.camera.top = 8, S.shadow.camera.bottom = -8, S.shadow.normalBias = 0.03, i.own(S.shadow), d.add(S, S.target);
    const s = new Pe();
    d.add(s);
    const p = za({
      group(g, G) {
        const Z = new Pe();
        return Z.position.set(...G), g.add(Z), Z;
      },
      ball(g, G, Z, Q) {
        return R.mesh(g, "sphere", Z, G, Q);
      }
    }, d, [
      0,
      0,
      0
    ]);
    p.scale.setScalar(0.7);
    let x = null, $ = !1, E = null;
    const C = -new ga().setFromObject(p).min.y, I = Ka(R, p, C, (g) => {
      E = g, g?.phase === "using" && (x = null), b(g), $ && re();
    });
    let j = [], z = null, T = [], L = {
      project: null,
      enabled: !0,
      floor: null
    }, P = ot, U = Et, X = "", H = 1, ve = 1, ie = 1, ae = 0.55, te = null, O = 0, A = 0, w = 0, D = !1, Se = !1, se = !1, ye = !1, le = null, ne = null;
    const ge = matchMedia("(prefers-reduced-motion: reduce)"), ce = /* @__PURE__ */ new Map();
    let me = !1;
    i.defer(() => {
      se = !0, we(), T.forEach((g) => g.dispose()), j.forEach((g) => g.model.dispose()), z?.dispose();
    });
    function q() {
      return !se && !ye && !D && !Se && !document.hidden && L.enabled;
    }
    function re() {
      const g = Mt(P), G = [...U.filter((Y) => Y.kind !== "roof").flatMap(it), ...g], Z = Math.min(...G.map((Y) => Y.x)), Q = Math.max(...G.map((Y) => Y.x)), oe = H / ve, Ce = Math.max(1, ...U.map((Y) => Y.y + (Y.kind === "roof" ? 0.6 : 1)), ...g.map((Y) => Y.y + 1)) * W.height, _e = $ ? x ?? E?.space.part : null, Te = Math.max((Ce + P.depth * W.depth + 2) / 2, ((Q - Z + 1) * W.width + P.depth * W.depth * 0.65 + 1.2) / (2 * oe)) * ie, je = _e ? (_e.y + 0.48) * W.height : Ce / 2 - 0.12, ee = _e ? ze(P, _e.x) : ze(P, (Z + Q) / 2);
      h.left = -Te * oe, h.right = Te * oe, h.top = Te, h.bottom = -Te;
      const fe = _e ? Me(P, _e.z) : 0;
      h.position.set(ee + Math.sin(ae) * 12, je + 13, fe + Math.cos(ae) * 12), h.lookAt(ee, je, fe), h.updateProjectionMatrix(), h.updateMatrixWorld();
      const K = [];
      for (const Y of Mt(P)) {
        if (L.floor !== null && Y.y !== L.floor) continue;
        const $e = [
          [-0.49, -0.49],
          [0.49, -0.49],
          [0.49, 0.49],
          [-0.49, 0.49]
        ].map(([f, be]) => new bt(ze(P, Y.x) + f * W.width, Y.y * W.height + 0.15, Me(P, Y.z) + be * W.depth).project(h)), He = $e.map((f) => (f.x + 1) * 50), qe = $e.map((f) => (1 - f.y) * 50), We = Math.min(...He), Ze = Math.min(...qe), M = Math.max(...He) - We, _ = Math.max(...qe) - Ze;
        K.push({
          ...Y,
          left: We,
          top: Ze,
          width: M,
          height: _,
          polygon: He.map((f, be) => `${(f - We) / M * 100}% ${(qe[be] - Ze) / _ * 100}%`).join(",")
        });
      }
      l(K);
    }
    function Re() {
      const g = e.getBoundingClientRect();
      H = Math.max(1, g.width), ve = Math.max(1, g.height), y.setPixelRatio(Wa(H, ve, window.devicePixelRatio || 1)), y.setSize(H, ve, !1), re(), pe();
    }
    function ue(g) {
      !q() || le || (Ie(), I.visit(g, ge.matches), g && (x = g, $ = !0, ie = 0.75, re()), pe());
    }
    function Ke(g) {
      g.enabled || we();
      const G = g.project ? Fe(g.project) : ot, Z = g.project ? xt(G, g.project.rooms) : Et, Q = JSON.stringify([
        g.project?.id,
        g.project?.state,
        g.project?.memories,
        Z
      ]), oe = L.project?.id !== g.project?.id;
      oe && (x = null, ie = 1, ae = 0.55, $ = !1, ce.clear());
      const Ce = oe ? null : Z.find((ee) => ee.kind !== "roof" && !U.some((fe) => fe.kind !== "roof" && N(fe) === N(ee))), _e = oe ? null : g.project?.memories.find((ee) => !L.project?.memories.includes(ee)), Te = !oe && L.project?.state === "building" && g.project?.state === "living", je = new Set(Vt(P, U).filter((ee) => !ee.issue).map((ee) => `${N(ee.part)}:${ee.activity}`));
      if (L = g, P = G, X !== Q) {
        Ie(), le = null, ne = null, a(!1), T.forEach((K) => K.dispose()), j.forEach((K) => K.model.dispose()), s.clear(), z?.dispose(), z && d.remove(z.root), U = Z, X = Q, z = Ua(R, P), d.add(z.root);
        const ee = g.project ? Nt(P, g.project.rooms, g.project.memories) : [];
        T = U.map((K) => {
          const Y = Za(R, P, U, K, !0, ee.filter(($e) => N($e.part) === N(K) && $e.part.kind === K.kind).map(($e) => $e.id));
          return s.add(Y.root), Y;
        }), j = ee.map((K) => {
          const Y = Ga(R, P, K);
          return s.add(Y.root), {
            model: Y,
            floor: K.part.y
          };
        }), I.configure(P, U, oe), S.position.x = P.sunSide * 7;
        const fe = at(P, U).find((K) => !je.has(`${N(K.part)}:${K.activity}`));
        if (Ce && g.enabled && !ge.matches) {
          const K = T[U.indexOf(Ce)].root;
          le = {
            model: K,
            y: K.position.y,
            elapsed: 0
          }, a(!0), u("release");
        } else Ce && u("land");
        if (_e && g.project) {
          u("reward");
          const K = ee.find((Y) => Y.id === _e);
          K && (x = K.part, $ = !0, ie = 0.75, I.visit(K.part, ge.matches));
        } else Te ? (u("reward"), I.visit(void 0, ge.matches)) : fe && !oe ? le ? ne = fe.part : I.visit(fe.part, ge.matches) : (!g.project || oe && g.project.state === "living") && I.visit(at(P, U)[0]?.part, ge.matches);
      }
      T.forEach((ee, fe) => {
        ee.root.visible = L.floor === null || U[fe].kind !== "roof" && U[fe].y <= L.floor;
      }), j.forEach((ee) => {
        ee.model.root.visible = L.floor === null || ee.floor <= L.floor;
      }), re(), pe();
    }
    function rt(g) {
      if (A = 0, !q()) {
        w = 0;
        return;
      }
      const G = w ? Math.min(64, g - w) : 0;
      if (w = g, le) {
        le.elapsed += G;
        const Q = Math.min(1, le.elapsed / 420);
        le.model.position.y = le.y + (1 - Q) ** 2 * 1.7, Q === 1 && (le = null, a(!1), u("land"), ne && (I.visit(ne, ge.matches), ne = null));
      }
      let Z = !1;
      try {
        Z = I.tick(G), p.visible = L.floor === null || p.position.y - C < (L.floor + 1) * W.height, y.render(d, h);
      } catch (Q) {
        ye = !0, we(), n(Q);
        return;
      }
      le || Z ? pe() : (w = 0, !ge.matches && L.project?.state === "living" && te === null && (te = setTimeout(() => {
        if (te = null, q()) {
          const Q = at(P, U);
          Q.length && (I.visit(Q[O++ % Q.length].part), pe());
        }
      }, 6500)));
    }
    function pe() {
      !A && q() && (A = requestAnimationFrame(rt));
    }
    function Ie() {
      te !== null && (clearTimeout(te), te = null);
    }
    function we() {
      Ie(), A && (cancelAnimationFrame(A), A = 0), w = 0;
    }
    function xe() {
      we(), pe();
    }
    function ut() {
      we(), ge.matches && (le && (le.model.position.y = le.y, le = null, a(!1)), ne && (I.visit(ne, !0), ne = null), I.reduce()), pe();
    }
    function Be(g) {
      g.preventDefault(), ye = !0, we(), n(/* @__PURE__ */ new Error("building_webgl_context_lost"));
    }
    function Oe(g) {
      ie = Math.max(0.48, Math.min(2, ie * g)), re(), pe();
    }
    function Xe(g) {
      g.preventDefault(), Oe(Math.exp(g.deltaY * (g.deltaMode === 1 ? 16 : g.deltaMode === 2 ? ve : 1) * 1e-3));
    }
    function dt(g) {
      ce.size || (me = !1), !g.target.closest("button:not(.build-cell)") && (ce.size && (me = !0), ce.set(g.pointerId, {
        x: g.clientX,
        y: g.clientY
      }), g.target.closest("button") || e.setPointerCapture(g.pointerId));
    }
    function Le(g) {
      const G = ce.get(g.pointerId);
      if (!G) return;
      const Z = [...ce.entries()].find(([Q]) => Q !== g.pointerId)?.[1];
      if (Z) {
        const Q = Math.hypot(G.x - Z.x, G.y - Z.y), oe = Math.hypot(g.clientX - Z.x, g.clientY - Z.y);
        Q && oe && Oe(Q / oe);
      } else g.target.closest("button") || (Math.hypot(g.clientX - G.x, g.clientY - G.y) > 3 && (me = !0), ae = Math.max(-1.2, Math.min(1.2, ae - (g.clientX - G.x) * 8e-3)), re(), pe());
      ce.set(g.pointerId, {
        x: g.clientX,
        y: g.clientY
      });
    }
    function Ne(g) {
      ce.delete(g.pointerId);
    }
    function Je(g) {
      me && (g.preventDefault(), g.stopPropagation(), me = !1);
    }
    e.addEventListener("click", Je, !0), i.defer(() => e.removeEventListener("click", Je, !0));
    const he = [
      [
        e,
        "wheel",
        Xe
      ],
      [
        e,
        "pointerdown",
        dt
      ],
      [
        e,
        "pointermove",
        Le
      ],
      [
        e,
        "pointerup",
        Ne
      ],
      [
        e,
        "pointercancel",
        Ne
      ],
      [
        e,
        "lostpointercapture",
        Ne
      ],
      [
        document,
        "visibilitychange",
        xe
      ],
      [
        y.domElement,
        "webglcontextlost",
        Be
      ],
      [
        ge,
        "change",
        ut
      ]
    ];
    i.defer(() => he.forEach(([g, G, Z]) => g.removeEventListener(G, Z))), he.forEach(([g, G, Z]) => g.addEventListener(G, Z, { passive: !1 }));
    const Qe = new ResizeObserver(Re);
    i.defer(() => Qe.disconnect()), Qe.observe(e);
    const et = new IntersectionObserver((g) => {
      D = !g[0].isIntersecting, xe();
    });
    return i.defer(() => et.disconnect()), et.observe(e), Ke(L), Re(), {
      set: Ke,
      visit: ue,
      focus() {
        E && (x = null, $ = !0, ie = 0.6, re(), pe());
      },
      zoom(g) {
        Oe(Math.exp(g));
      },
      reset() {
        x = null, $ = !1, ie = 1, ae = 0.55, re(), pe();
      },
      suspend() {
        Se = !0, we();
      },
      resume() {
        Se = !1, pe();
      },
      async snapshot() {
        return y.render(d, h), new Promise((g, G) => y.domElement.toBlob((Z) => Z ? g(Z) : G(/* @__PURE__ */ new Error("building_export")), "image/png"));
      },
      dispose: i.dispose
    };
  });
}
function Ja() {
  let e = null, l = null;
  const a = /* @__PURE__ */ new Set();
  function n(y, d, h) {
    a.add(y), y.onended = () => {
      a.delete(y), y.disconnect(), d.disconnect(), h?.disconnect();
    };
  }
  function u(y, d, h, R, S = 0, s = "sine") {
    const p = e, x = p.createOscillator(), $ = p.createGain(), E = p.currentTime + S;
    x.type = s, x.frequency.setValueAtTime(y, E), x.frequency.exponentialRampToValueAtTime(d, E + h), $.gain.setValueAtTime(0, E), $.gain.linearRampToValueAtTime(R, E + 8e-3), $.gain.exponentialRampToValueAtTime(1e-3, E + h), x.connect($), $.connect(p.destination), n(x, $), x.start(E), x.stop(E + h + 0.015);
  }
  function b(y, d, h, R = 0) {
    const S = e, s = S.createBufferSource(), p = S.createBiquadFilter(), x = S.createGain(), $ = S.currentTime + R;
    s.buffer = l, p.type = "bandpass", p.frequency.value = y, p.Q.value = 0.75, x.gain.setValueAtTime(0, $), x.gain.linearRampToValueAtTime(h, $ + 0.012), x.gain.exponentialRampToValueAtTime(1e-3, $ + d), s.connect(p), p.connect(x), x.connect(S.destination), n(s, x, p), s.start($), s.stop($ + d + 0.015);
  }
  function i() {
    for (const y of a) y.stop();
  }
  return {
    async unlock() {
      if (!e) {
        e = new AudioContext(), l = e.createBuffer(1, e.sampleRate, e.sampleRate);
        const y = l.getChannelData(0);
        for (let d = 0; d < y.length; d++) y[d] = Math.random() * 2 - 1;
      }
      e.state === "suspended" && await e.resume();
    },
    play(y) {
      !e || e.state !== "running" || (y === "release" && (b(1700, 0.12, 0.045), u(340, 250, 0.1, 0.022)), y === "land" && (u(150, 62, 0.19, 0.11), b(750, 0.105, 0.08), u(880, 860, 0.24, 0.018, 0.025), u(1320, 1290, 0.19, 9e-3, 0.04)), y === "reward" && [
        523,
        659,
        784,
        1047
      ].forEach((d, h) => {
        u(d, d, 0.5, 0.038, h * 0.11), u(d * 2, d * 2, 0.25, 9e-3, h * 0.11);
      }));
    },
    async pause() {
      e?.state === "running" && (i(), await e.suspend());
    },
    async dispose() {
      i();
      const y = e;
      e = null, l = null, y && y.state !== "closed" && await y.close();
    }
  };
}
var ht = "LittleWhiteBox:building:pending", Rt = 5;
function Qa(e) {
  return {
    read() {
      try {
        const l = e.getItem(ht);
        if (l === null) return null;
        const a = JSON.parse(l), n = nt(a.runId), u = nt(a.request.actionId), b = a.request.revision;
        if ((!Number.isSafeInteger(b) || b < 0) && de("recovery"), a.format === void 0 || a.format === 2 || a.format === 3 || a.format === 4) return {
          runId: n,
          revision: b,
          retired: !0
        };
        a.format !== Rt && de("recovery");
        const i = ja(a.request.command);
        return (!Number.isSafeInteger(b) || b < 0 || i.type === "start") && de("recovery"), {
          runId: n,
          request: {
            actionId: u,
            revision: b,
            command: i
          }
        };
      } catch {
        return de("recovery");
      }
    },
    write(l) {
      try {
        e.setItem(ht, JSON.stringify({
          format: Rt,
          ...l
        }));
      } catch {
        de("recovery");
      }
    },
    clear() {
      try {
        e.removeItem(ht);
      } catch {
        de("recovery");
      }
    }
  };
}
var el = {
  viewBox: "0 0 48 40",
  fill: "none",
  "aria-hidden": "true",
  class: "build-part-icon"
}, tl = ["d"], al = {
  key: 0,
  d: "M18 35V15h12v20",
  fill: "#bcd8ca",
  stroke: "#789b8c",
  "stroke-width": "2"
}, ll = ["d"], il = ["d"], nl = /* @__PURE__ */ Ee({
  __name: "PartIcon",
  props: { kind: {} },
  setup(e) {
    return (l, a) => (c(), m("svg", el, [e.kind === "roof" ? (c(), m(V, { key: 0 }, [a[0] || (a[0] = v("path", {
      d: "m4 28 20-19 20 19H4Z",
      fill: "#bbdcd0",
      stroke: "#668c83",
      "stroke-width": "2"
    }, null, -1)), a[1] || (a[1] = v("path", {
      d: "M9 30h30",
      stroke: "#e0c6a5",
      "stroke-width": "3"
    }, null, -1))], 64)) : e.kind === "garden" ? (c(), m(V, { key: 1 }, [
      a[2] || (a[2] = v("path", {
        d: "M5 33h38v4H5z",
        fill: "#abcabd"
      }, null, -1)),
      a[3] || (a[3] = v("path", {
        d: "M29 17v16",
        stroke: "#b08b61",
        "stroke-width": "3"
      }, null, -1)),
      a[4] || (a[4] = v("path", {
        d: "M17 19c-4-8 4-12 7-11 2-9 17-5 13 4 10 8-3 17-8 12-4 3-12 1-12-5Z",
        fill: "#bbdcd0"
      }, null, -1)),
      a[5] || (a[5] = v("path", {
        d: "M9 33v-9m-4 4h9",
        stroke: "#d4a398",
        "stroke-width": "3"
      }, null, -1))
    ], 64)) : e.kind === "path" ? (c(), m(V, { key: 2 }, [a[6] || (a[6] = v("path", {
      d: "M4 35 15 4h27L32 35Z",
      fill: "#bbdcd0"
    }, null, -1)), a[7] || (a[7] = v("path", {
      d: "m12 28 19 1m-15-10 19 1m-15-10 19 1",
      stroke: "#fffdf3",
      "stroke-width": "6"
    }, null, -1))], 64)) : e.kind === "terrace" ? (c(), m(V, { key: 3 }, [a[8] || (a[8] = v("path", {
      d: "M5 33h38M7 33V20m11 13V20m11 13V20m12 13V20M5 20h38",
      stroke: "#ab9275",
      "stroke-width": "2"
    }, null, -1)), a[9] || (a[9] = v("path", {
      d: "M31 18h8v-7h-8z",
      fill: "#bcd8ca"
    }, null, -1))], 64)) : (c(), m(V, { key: 4 }, [v("path", {
      d: e.kind === "wide" ? "M3 5h42v30H3z" : "M10 5h28v30H10z",
      fill: "#fffaf0",
      stroke: "#baa990",
      "stroke-width": "2"
    }, null, 8, tl), e.kind === "entry" ? (c(), m("path", al)) : e.kind === "study" ? (c(), m(V, { key: 1 }, [a[10] || (a[10] = v("path", {
      d: "M15 15q5-3 9 0 5-3 10 0v14q-5-3-10 0-4-3-9 0Z",
      fill: "#bbdcd0",
      stroke: "#668c83"
    }, null, -1)), a[11] || (a[11] = v("path", {
      d: "M24 15v14m-7-10h4m6 0h4",
      stroke: "#668c83"
    }, null, -1))], 64)) : (c(), m(V, { key: 2 }, [v("path", {
      d: e.kind === "wide" ? "M9 12h10v10H9zm20 0h10v10H29z" : "M18 12h12v12H18z",
      fill: "#bddde8"
    }, null, 8, ll), v("path", {
      d: e.kind === "wide" ? "M10 29h28" : "M16 30h16",
      stroke: "#e3b8ae",
      "stroke-width": "4"
    }, null, 8, il)], 64))], 64))]));
  }
}), gt = nl, ol = ["aria-label", "data-build-batch"], sl = { class: "build-supply-packs" }, rl = [
  "data-build-pack",
  "disabled",
  "onClick"
], ul = /* @__PURE__ */ Ee({
  __name: "SupplyChoices",
  props: {
    packs: {},
    round: {},
    disabled: { type: Boolean }
  },
  emits: ["choose"],
  setup(e) {
    const l = J(null);
    return Tt(() => l.value?.focus({ preventScroll: !0 })), (a, n) => (c(), m("section", {
      class: "build-supply",
      "aria-label": t(o).supplies,
      "data-build-batch": e.round
    }, [
      v("header", null, [v("strong", {
        ref_key: "heading",
        ref: l,
        tabindex: "-1",
        role: "heading",
        "aria-level": "2"
      }, k(t(o).batch(e.round)), 513)]),
      v("p", null, k(t(o).pickTerms), 1),
      v("div", sl, [(c(!0), m(V, null, ke(e.packs, (u, b) => (c(), m("button", {
        key: b,
        type: "button",
        "data-build-pack": b,
        disabled: e.disabled,
        onClick: (i) => a.$emit("choose", b)
      }, [(c(!0), m(V, null, ke(t(sa).filter((i) => u.includes(i)), (i) => (c(), m("span", { key: i }, [Ye(gt, { kind: i }, null, 8, ["kind"]), v("span", null, k(t(lt)[i]) + " ×" + k(u.filter((y) => y === i).length), 1)]))), 128)), v("strong", null, k(t(o).takePack), 1)], 8, rl))), 128))])
    ], 8, ol));
  }
}), dl = ul, cl = ["aria-label"], vl = ["data-build-goal", "data-goal-met"], ml = { "aria-hidden": "true" }, fl = ["aria-label"], pl = /* @__PURE__ */ Ee({
  __name: "DeliveryBrief",
  props: { result: {} },
  emits: ["details"],
  setup(e) {
    return (l, a) => (c(), m("section", {
      class: "build-delivery-brief",
      "aria-label": t(o).minimumTitle
    }, [v("ul", null, [(c(!0), m(V, null, ke(e.result.minimum, (n, u) => (c(), m("li", {
      key: u,
      "data-build-goal": u,
      "data-goal-met": n
    }, [v("span", ml, k(n ? "✓" : "○"), 1), At(k(t(o).minimumGoals[u]), 1)], 8, vl))), 128))]), v("button", {
      type: "button",
      "data-build-action": "brief",
      "aria-label": t(o).commission,
      onClick: a[0] || (a[0] = (n) => l.$emit("details"))
    }, k(t(o).bonusProgress(e.result.wishes.filter((n) => n.met).length)), 9, fl)], 8, cl));
  }
}), hl = pl, bl = {
  class: "build-delivery-result",
  "data-build-result": "delivered",
  role: "status"
}, yl = ["data-build-award"], kl = ["disabled"], gl = ["disabled"], wl = /* @__PURE__ */ Ee({
  __name: "DeliveryResult",
  props: {
    award: {},
    disabled: { type: Boolean }
  },
  emits: ["homes", "start"],
  setup(e) {
    return (l, a) => (c(), m("section", bl, [
      v("h2", null, k(t(o).delivered), 1),
      v("p", { "data-build-award": e.award }, k(t(o).earned(e.award)) + " · " + k(t(o).net(e.award)), 9, yl),
      v("button", {
        type: "button",
        class: "build-primary",
        "data-build-action": "homes",
        disabled: e.disabled,
        onClick: a[0] || (a[0] = (n) => l.$emit("homes"))
      }, k(t(o).homes), 9, kl),
      v("button", {
        type: "button",
        "data-build-action": "start",
        disabled: e.disabled,
        onClick: a[1] || (a[1] = (n) => l.$emit("start"))
      }, k(t(o).another), 9, gl)
    ]));
  }
}), xl = wl, _l = {
  viewBox: "0 0 48 48",
  fill: "none",
  "aria-hidden": "true",
  class: "build-keepsake-icon"
}, Ml = /* @__PURE__ */ Ee({
  __name: "KeepsakeIcon",
  props: { memory: {} },
  setup(e) {
    return (l, a) => (c(), m("svg", _l, [e.memory === "gardenWalk" ? (c(), m(V, { key: 0 }, [a[0] || (a[0] = ct('<path d="M10 23h28c-1 9-8 10-14 10S11 32 10 23Z" fill="#fffdf3" stroke="#789b8c" stroke-width="2"></path><path d="M24 33v8m-7 0h14" stroke="#789b8c" stroke-width="3"></path><path d="M14 23h20" stroke="#b2d9e6" stroke-width="3"></path><ellipse cx="31" cy="15" rx="6" ry="5" fill="#deb3a9"></ellipse><path d="m36 15 6 2-6 2" fill="#c49e62"></path>', 5))], 64)) : e.memory === "gardenReading" ? (c(), m(V, { key: 1 }, [a[1] || (a[1] = ct('<path d="M12 29h24l-3 14H15Z" fill="#d4b99b"></path><path d="M24 30V11m0 15L13 18m11 3 10-9" stroke="#789b8c" stroke-width="2"></path><ellipse cx="12" cy="16" rx="7" ry="5" fill="#b4d6c4"></ellipse><ellipse cx="32" cy="11" rx="7" ry="6" fill="#e8bdb3"></ellipse><circle cx="24" cy="8" r="5" fill="#e8bdb3"></circle>', 5))], 64)) : e.memory === "gardenTea" ? (c(), m(V, { key: 2 }, [
      a[2] || (a[2] = v("path", {
        d: "M5 35h38v5H5Z",
        fill: "#e8bdb3"
      }, null, -1)),
      a[3] || (a[3] = v("path", {
        d: "M17 15h14v13c0 7-14 7-14 0Z",
        fill: "#fffdf3",
        stroke: "#789b8c",
        "stroke-width": "2"
      }, null, -1)),
      a[4] || (a[4] = v("path", {
        d: "M32 18h7l-6 8M15 18c-9-2-9 12 0 8M21 11h6",
        stroke: "#789b8c",
        "stroke-width": "2"
      }, null, -1)),
      a[5] || (a[5] = v("path", {
        d: "M7 28h8v6H7m28-6h7v6h-7",
        fill: "#b4d6c4"
      }, null, -1))
    ], 64)) : e.memory === "quietBedroom" ? (c(), m(V, { key: 3 }, [
      a[6] || (a[6] = v("path", {
        d: "M9 9h30v30H9Z",
        fill: "#b4d6c4",
        stroke: "#789b8c",
        "stroke-width": "2"
      }, null, -1)),
      a[7] || (a[7] = v("path", {
        d: "m16 17 4 4-4 4-4-4Zm16 0 4 4-4 4-4-4Z",
        fill: "#fffdf3"
      }, null, -1)),
      a[8] || (a[8] = v("path", {
        d: "M10 40v4m7-4v4m7-4v4m7-4v4m7-4v4",
        stroke: "#789b8c"
      }, null, -1))
    ], 64)) : (c(), m(V, { key: 4 }, [a[9] || (a[9] = ct('<path d="M5 12q19 17 38 0" stroke="#789b8c" stroke-width="2"></path><path d="M8 15v7m10-2v7m12-7v7m10-12v7" stroke="#b39c75"></path><g fill="#f6d99b"><ellipse cx="8" cy="25" rx="4" ry="5"></ellipse><ellipse cx="18" cy="30" rx="4" ry="5"></ellipse><ellipse cx="30" cy="30" rx="4" ry="5"></ellipse><ellipse cx="40" cy="25" rx="4" ry="5"></ellipse></g>', 3))], 64))]));
  }
}), Ht = Ml, Sl = [
  "aria-label",
  "data-build-memory",
  "data-memory-ready"
], Cl = {
  key: 0,
  class: "build-memory-reward"
}, $l = { class: "build-home-actions" }, Il = ["disabled"], zl = ["disabled"], El = /* @__PURE__ */ Ee({
  __name: "HomeWish",
  props: {
    opportunity: {},
    count: {},
    disabled: { type: Boolean }
  },
  emits: [
    "remodel",
    "remember",
    "album"
  ],
  setup(e) {
    return (l, a) => (c(), m("section", {
      class: "build-home-wish",
      "aria-label": t(o).memories,
      "data-build-memory": e.opportunity?.id ?? "complete",
      "data-memory-ready": !!e.opportunity?.part
    }, [
      v("header", null, [v("strong", null, k(e.opportunity ? t(Ge)[e.opportunity.id].wish : t(o).memoryComplete), 1), v("button", {
        type: "button",
        "data-build-action": "memories",
        onClick: a[0] || (a[0] = (n) => l.$emit("album"))
      }, k(t(o).memoryProgress(e.count)), 1)]),
      v("p", null, k(e.opportunity ? e.opportunity.need ? t(Lt)[e.opportunity.need] : t(o).memoryReady : t(o).memoryFinished), 1),
      e.opportunity ? (c(), m("div", Cl, [Ye(Ht, { memory: e.opportunity.id }, null, 8, ["memory"]), v("span", null, k(t(o).memoryReward(e.opportunity.id)), 1)])) : B("", !0),
      v("div", $l, [v("button", {
        type: "button",
        class: tt({ "build-primary": !e.opportunity?.part }),
        disabled: e.disabled,
        "data-build-action": "remodel",
        onClick: a[1] || (a[1] = (n) => l.$emit("remodel"))
      }, k(t(o).remodel), 11, Il), e.opportunity?.part ? (c(), m("button", {
        key: 0,
        type: "button",
        class: "build-primary",
        disabled: e.disabled,
        "data-build-action": "remember",
        onClick: a[2] || (a[2] = (n) => l.$emit("remember"))
      }, k(t(o).remember), 9, zl)) : B("", !0)])
    ], 8, Sl));
  }
}), Rl = El, Tl = { class: "build-memory-album" }, Al = [
  "data-build-memory-id",
  "data-memory-earned",
  "data-memory-displayed"
], Pl = { "aria-hidden": "true" }, Bl = { class: "build-memory-note" }, Ol = /* @__PURE__ */ Ee({
  __name: "MemoryAlbum",
  props: { project: {} },
  setup(e) {
    const l = e, a = F(() => Nt(Fe(l.project), l.project.rooms, l.project.memories));
    return (n, u) => (c(), m(V, null, [
      v("p", null, k(t(o).memoryProgress(e.project.memories.length)), 1),
      v("ol", Tl, [(c(!0), m(V, null, ke(t(da)(e.project.seed), (b) => (c(), m("li", {
        key: b,
        "data-build-memory-id": b,
        "data-memory-earned": e.project.memories.includes(b),
        "data-memory-displayed": a.value.some((i) => i.id === b)
      }, [
        Ye(Ht, { memory: b }, null, 8, ["memory"]),
        v("div", null, [
          v("strong", null, k(t(Ge)[b].title), 1),
          v("p", null, k(e.project.memories.includes(b) ? t(Ge)[b].thanks : t(Ge)[b].wish), 1),
          v("small", null, k(e.project.memories.includes(b) ? a.value.some((i) => i.id === b) ? t(o).memoryPlaced(a.value.find((i) => i.id === b).part.kind) : t(o).memoryStored : t(o).memoryLocked), 1)
        ]),
        v("span", Pl, k(e.project.memories.includes(b) ? "✓" : "○"), 1)
      ], 8, Al))), 128))]),
      v("p", Bl, k(t(o).memoryCollection), 1)
    ], 64));
  }
}), Ll = Ol, Nl = ["viewBox"], jl = ["d"], Vl = ["transform"], Dl = {
  key: 0,
  d: "M0 22 12 10 24 22Z",
  fill: "#a8cbb9"
}, Hl = {
  key: 1,
  d: "M3 22h18",
  stroke: "#fffdf3",
  "stroke-width": "4"
}, ql = {
  key: 3,
  d: "M1 22h22M2 22V12m6 10V12m8 10V12m6 10V12M1 12h22",
  stroke: "#bdaa90",
  "stroke-width": "1.5"
}, Wl = ["width"], Zl = {
  key: 0,
  d: "M8 23V9h9v14",
  fill: "#b1cebd"
}, Ul = {
  key: 1,
  d: "M4 9q4-2 8 0 4-2 8 0v10q-4-2-8 0-4-2-8 0Z",
  fill: "#b1cebd",
  stroke: "#789b8c"
}, Gl = ["x"], Yl = /* @__PURE__ */ Ee({
  __name: "HousePortrait",
  props: {
    brief: {},
    rooms: {}
  },
  setup(e) {
    const l = e, a = F(() => xt(l.brief, l.rooms).sort((n, u) => n.z - u.z || n.y - u.y || n.x - u.x));
    return (n, u) => (c(), m("svg", {
      viewBox: `-8 -8 ${e.brief.width * 24 + e.brief.depth * 10 + 16} ${(e.brief.floors + 1) * 23 + e.brief.depth * 12 + 15}`,
      fill: "none",
      "aria-hidden": "true",
      class: "build-house-portrait"
    }, [v("path", {
      d: `M-3 ${(e.brief.floors + 1) * 23 + 2}h${e.brief.width * 24 + 6}`,
      stroke: "#bdcfbe",
      "stroke-width": "5",
      "stroke-linecap": "round"
    }, null, 8, jl), (c(!0), m(V, null, ke(a.value, (b) => (c(), m("g", {
      key: t(N)(b),
      transform: `translate(${b.x * 24 + b.z * 10} ${(e.brief.floors - b.y) * 23 + b.z * 12})`
    }, [b.kind === "roof" ? (c(), m("path", Dl)) : b.kind === "path" ? (c(), m("path", Hl)) : b.kind === "garden" ? (c(), m(V, { key: 2 }, [u[0] || (u[0] = v("path", {
      d: "M12 23V8",
      stroke: "#ba997a",
      "stroke-width": "2"
    }, null, -1)), u[1] || (u[1] = v("ellipse", {
      cx: "12",
      cy: "8",
      rx: "8",
      ry: "9",
      fill: "#a8cbb9"
    }, null, -1))], 64)) : b.kind === "terrace" ? (c(), m("path", ql)) : (c(), m(V, { key: 4 }, [v("rect", {
      width: t(De)[b.kind].width * 24,
      height: "23",
      fill: "#fffdf3",
      stroke: "#cfbda3"
    }, null, 8, Wl), b.kind === "entry" ? (c(), m("path", Zl)) : b.kind === "study" ? (c(), m("path", Ul)) : (c(!0), m(V, { key: 2 }, ke(t(De)[b.kind].width, (i) => (c(), m("rect", {
      key: i,
      x: (i - 1) * 24 + 7,
      y: "5",
      width: "10",
      height: "12",
      fill: "#f6d99b"
    }, null, 8, Gl))), 128))], 64))], 8, Vl))), 128))], 8, Nl));
  }
}), Fl = Yl, Kl = [
  "aria-label",
  "aria-busy",
  "data-build-presenting"
], Xl = {
  key: 0,
  class: "build-topbar"
}, Jl = {
  key: 0,
  class: "build-budget"
}, Ql = ["aria-label"], ei = {
  key: 1,
  class: "build-notice",
  role: "alert"
}, ti = ["disabled"], ai = ["disabled"], li = {
  key: 2,
  class: "build-notice",
  role: "alert"
}, ii = ["aria-label"], ni = {
  key: 3,
  class: "build-loading"
}, oi = {
  key: 4,
  class: "build-loading",
  role: "status"
}, si = ["aria-label"], ri = {
  key: 0,
  class: "build-thought",
  role: "status"
}, ui = ["aria-label"], di = ["aria-label"], ci = ["aria-pressed"], vi = [
  "aria-pressed",
  "data-build-floor",
  "onClick"
], mi = {
  key: 3,
  class: "build-grid"
}, fi = [
  "data-build-cell",
  "data-build-place",
  "aria-label",
  "disabled",
  "onClick"
], pi = {
  viewBox: "0 0 100 100",
  preserveAspectRatio: "none",
  class: "build-cell-outline",
  "aria-hidden": "true"
}, hi = ["points"], bi = ["data-build-life", "data-life-phase"], yi = {
  key: 6,
  class: "build-camera"
}, ki = ["aria-label"], gi = ["aria-label"], wi = ["aria-label"], xi = {
  key: 7,
  class: "build-overlay",
  role: "alert"
}, _i = {
  key: 8,
  class: "build-overlay",
  role: "status"
}, Mi = {
  key: 5,
  class: "build-controls"
}, Si = {
  key: 0,
  class: "build-desk"
}, Ci = ["disabled"], $i = ["disabled"], Ii = ["disabled"], zi = {
  key: 3,
  class: "build-context"
}, Ei = ["aria-label"], Ri = { key: 0 }, Ti = { class: "build-context-actions" }, Ai = ["disabled"], Pi = ["disabled"], Bi = ["disabled"], Oi = { key: 1 }, Li = ["aria-label"], Ni = [
  "data-build-kind",
  "aria-label",
  "aria-pressed",
  "disabled",
  "onClick"
], ji = { class: "build-part-cost" }, Vi = { key: 0 }, Di = {
  key: 1,
  class: "build-placement-note",
  role: "status"
}, Hi = { class: "build-footer-actions" }, qi = ["disabled"], Wi = ["data-build-award"], Zi = ["disabled"], Ui = {
  key: 0,
  class: "build-result"
}, Gi = ["data-build-award"], Yi = {
  key: 2,
  class: "build-finished-actions"
}, Fi = ["disabled"], Ki = { id: "build-dialog-title" }, Xi = ["aria-label"], Ji = {
  key: 0,
  class: "build-menu"
}, Qi = ["data-build-balance"], en = ["disabled"], tn = ["disabled"], an = ["disabled", "aria-pressed"], ln = ["disabled"], nn = {
  key: 1,
  class: "build-commission-details"
}, on = { key: 3 }, sn = { key: 0 }, rn = { class: "build-collection" }, un = ["onClick"], dn = {
  key: 0,
  class: "build-notice"
}, cn = { class: "build-dialog-actions" }, vn = ["disabled"], mn = /* @__PURE__ */ Ee({
  __name: "BuildingRoom",
  props: {
    bridge: {},
    chatIdentity: {},
    generationActive: { type: Boolean }
  },
  setup(e) {
    const l = e, a = Qa({
      getItem: (M) => localStorage.getItem(M),
      setItem: (M, _) => localStorage.setItem(M, _),
      removeItem: (M) => localStorage.removeItem(M)
    }), n = Va(l.bridge, l.chatIdentity, a), { view: u, busy: b, blocked: i, failed: y, notice: d, generating: h, canUndo: R } = n, S = J(null), s = J(null), p = J(null), x = J("desk"), $ = J(!1), E = J(null), C = J("room"), I = J(null), j = J([]), z = J(!1), T = J(!0), L = J(!1), P = J(""), U = J(!1), X = J(!1), H = J(null), ve = J(""), ie = J(null), ae = J(null);
    let te = null, O = !1;
    const A = Ja(), w = F(() => E.value ? u.value?.collection.find((M) => M.id === E.value) ?? null : u.value?.active ?? null), D = F(() => w.value ? Fe(w.value) : null), Se = F(() => D.value && w.value ? wt(D.value, w.value.rooms) : null), se = F(() => D.value && w.value ? Pa(D.value, w.value.rooms) : null), ye = F(() => w.value?.supply ? Ft(w.value.supply, w.value.rooms) : null), le = F(() => w.value?.supply?.offers ?? []), ne = F(() => x.value === "house" && !E.value && !!w.value?.supply?.remaining), ge = F(() => w.value && se.value?.bonus ? st[w.value.tier].award : Ae.habitableAward), ce = F(() => D.value && w.value?.state === "living" ? ua(D.value, w.value.rooms, w.value.memories) : null), me = F(() => Pt(w.value?.rooms ?? [])), q = F(() => I.value ? me.value.get(N(I.value)) ?? null : null), re = F(() => x.value === "house" && !!w.value && !E.value && !ne.value && (w.value.state === "building" || X.value)), Re = F(() => T.value && !l.generationActive && !p.value && !L.value), ue = F(() => !Re.value || i.value || z.value), Ke = F(() => Bt.filter((M) => M !== "terrace" || D.value?.terraces)), rt = F(() => D.value && w.value && C.value ? new Set(na(D.value, w.value.rooms, C.value).map(N)) : /* @__PURE__ */ new Set()), pe = F(() => j.value.filter((M) => H.value !== null && (me.value.has(N(M)) || re.value && M.y < Kt(D.value, M.x, M.z)))), Ie = F(() => Se.value?.spaces.find((M) => q.value && N(M.part) === N(q.value))), we = F(() => D.value && w.value && q.value ? pt(w.value, w.value.rooms.filter((M) => N(M) !== N(q.value))) : null), xe = F(() => {
      if (!q.value || !w.value || !D.value) return null;
      const M = q.value.kind === "room" ? "study" : "room", _ = ma(w.value.rooms, q.value, M);
      return _ ? {
        kind: M,
        issue: pt(w.value, _)
      } : null;
    }), ut = F(() => ce.value ? ce.value.need ? Lt[ce.value.need] : o.memoryReady : o.memoryComplete), Be = F(() => q.value ? j.value.find((M) => N(M) === N(q.value)) : null);
    Yt(s, () => {
      p.value = null;
    }), Gt(() => I.value ? (I.value = null, !0) : E.value ? (fe(), !0) : x.value === "house" ? (Ce(), !0) : !1);
    function Oe() {
      te?.set({
        project: w.value,
        enabled: Re.value,
        floor: H.value
      });
    }
    function Xe() {
      te?.dispose(), te = null, L.value = !1, z.value = !1;
      try {
        te = Xa(S.value, (M) => {
          j.value = M;
        }, (M) => {
          z.value = M;
        }, () => {
          L.value = !0, Le();
        }, dt, (M) => {
          ae.value = M;
        }), Oe();
      } catch {
        L.value = !0;
      }
    }
    function dt(M) {
      u.value?.soundEnabled && Re.value && !document.hidden && A.play(M);
    }
    async function Le() {
      try {
        await A.pause();
      } catch {
        P.value = o.soundError;
      }
    }
    async function Ne() {
      if (u.value?.soundEnabled) try {
        await A.unlock();
      } catch {
        P.value = o.soundError;
      }
    }
    async function Je() {
      if (!(U.value || !u.value)) {
        U.value = !0;
        try {
          const M = !u.value.soundEnabled;
          M && await A.unlock(), await n.setSoundEnabled(M), M || await A.pause();
        } catch {
          P.value = o.soundError;
        } finally {
          U.value = !1;
        }
      }
    }
    async function he(M) {
      const _ = M.type === "remember" ? ce.value?.part : null;
      Ne(), P.value = "", await n.act(M) && (I.value = null, M.type === "start" && (E.value = null, x.value = "house", $.value = !1, C.value = "room", X.value = !1, H.value = 0), M.type === "remember" && w.value?.memories.includes(M.memory) && (ie.value = M.memory, X.value = !1, H.value = _?.y ?? null), M.type === "finish" && (X.value = !1, $.value = !0, H.value = null), M.type === "reside" && (E.value = null, x.value = "house", $.value = !1, X.value = !0, H.value = 0), M.type === "collect" && !M.save && (E.value = null));
    }
    function Qe(M) {
      if (ue.value) return;
      const _ = me.value.get(N(M));
      if (_) I.value = I.value && N(I.value) === N(_) ? null : {
        x: _.x,
        y: _.y,
        z: _.z
      };
      else if (re.value && C.value && D.value && w.value) {
        const f = {
          kind: C.value,
          x: M.x,
          y: M.y,
          z: M.z
        }, be = pt(w.value, [...w.value.rooms, f]);
        if (be) {
          P.value = It[be];
          return;
        }
        he({
          type: "put",
          part: f
        });
      }
    }
    function et() {
      X.value = !0, H.value = 0, ie.value = null;
    }
    function g() {
      !ue.value && ce.value?.part && he({
        type: "remember",
        memory: ce.value.id
      });
    }
    function G(M) {
      C.value = M, I.value = null, P.value = "";
    }
    async function Z() {
      !ue.value && await n.undo() && (I.value = null);
    }
    function Q() {
      w.value?.state === "living" ? (X.value = !1, I.value = null, H.value = null) : se.value?.ready && (p.value = "deliver");
    }
    function oe() {
      u.value?.active?.state === "living" ? (E.value = null, x.value = "house", $.value = !1, X.value = !1, H.value = null, I.value = null) : p.value = "collection";
    }
    function Ce() {
      x.value = "desk", E.value = null, I.value = null, X.value = !1, ie.value = null, $.value = !1;
    }
    function _e() {
      x.value = "house", $.value = !1, H.value = 0;
    }
    function Te() {
      !ue.value && q.value && xe.value && !xe.value.issue && he({
        type: "refit",
        x: q.value.x,
        y: q.value.y,
        z: q.value.z,
        kind: xe.value.kind
      });
    }
    async function je() {
      const M = p.value;
      p.value = null, M === "start" ? await he({ type: "start" }) : M === "deliver" ? await he({ type: "finish" }) : M === "abandon" ? await he({ type: "abandon" }) : M === "uncollect" && w.value && await he({
        type: "collect",
        runId: w.value.id,
        save: !1
      });
    }
    function ee(M) {
      x.value = "house", $.value = !1, X.value = !1, H.value = null, E.value = M, I.value = null, p.value = null;
    }
    function fe() {
      E.value = null, I.value = null, X.value = !1, $.value = !1, H.value = u.value?.active?.state === "building" ? 0 : null;
    }
    async function K() {
      if (!(!te || !w.value))
        try {
          const M = await te.snapshot(), _ = URL.createObjectURL(M), f = document.createElement("a");
          f.href = _, f.download = o.exportName(w.value.tier), f.click(), setTimeout(() => URL.revokeObjectURL(_), 1e3);
        } catch {
          P.value = o.exportError;
        }
    }
    function Y() {
      document.hidden && Le();
    }
    function $e(M) {
      te?.zoom(M);
    }
    function He() {
      te?.reset();
    }
    async function qe() {
      ae.value && (H.value = ae.value.space.part.y, await vt()), te?.focus();
    }
    async function We(M) {
      const _ = Se.value?.spaces.find((f) => N(f.part) === N(M));
      !_ || _.issue || (ve.value = o.invited(_.activity), H.value = M.y, Ne(), await vt(), te?.visit(M), I.value = null);
    }
    Ue([
      w,
      Re,
      H
    ], Oe), Ue(() => w.value?.id, () => {
      X.value = !1, $.value = !1, ie.value = null, H.value = w.value?.state === "building" ? 0 : null, ve.value = "", I.value = null;
    }), Ue(() => u.value?.active?.state, (M, _) => {
      M === "living" && _ === "building" && ($.value = !0, H.value = null, I.value = null);
    }), Ue(ae, () => {
      ae.value?.phase === "using" && (ve.value = "");
    }), Ue(Re, (M) => {
      M || Le();
    }), Tt(async () => {
      Xe(), document.addEventListener("visibilitychange", Y), await n.read(), u.value?.active?.state === "building" && (x.value = "house"), O = !0;
    }), qt(() => {
      T.value = !0, te?.resume(), O && n.read();
    }), Zt(() => {
      T.value = !1, te?.suspend(), Le();
    }), Wt(() => {
      n.dispose(), te?.dispose(), document.removeEventListener("visibilitychange", Y), A.dispose().catch((M) => console.error(o.audioDispose, M));
    });
    async function Ze() {
      await vt(), Xe();
    }
    return (M, _) => (c(), m("section", {
      class: tt(["building-room", { "is-desk": x.value === "desk" }]),
      "aria-label": t(o).name,
      "aria-busy": t(b),
      "data-build-presenting": z.value
    }, [
      x.value === "house" ? (c(), m("header", Xl, [
        v("button", {
          type: "button",
          class: "build-location",
          "data-build-action": "desk",
          onClick: Ce
        }, [
          v("small", null, k(w.value?.state === "building" ? t(o).construction : t(o).homeMode), 1),
          v("strong", null, k(t(o).name), 1),
          _[28] || (_[28] = v("span", { "aria-hidden": "true" }, "⌄", -1))
        ]),
        re.value && D.value && Se.value ? (c(), m("span", Jl, k(t(o).budget(D.value.materials - Se.value.materials)), 1)) : B("", !0),
        v("button", {
          type: "button",
          "aria-label": t(o).menu,
          onClick: _[0] || (_[0] = (f) => p.value = "menu")
        }, "•••", 8, Ql)
      ])) : B("", !0),
      t(d) || t(y) || t(u)?.pending || t(u)?.writeState === "failed" ? (c(), m("aside", ei, [
        v("span", null, k(t(d) || t(o).saveProblem), 1),
        v("button", {
          type: "button",
          disabled: t(b),
          onClick: _[1] || (_[1] = (...f) => t(n).recover && t(n).recover(...f))
        }, k(t(o).recover), 9, ti),
        v("button", {
          type: "button",
          disabled: t(b),
          onClick: _[2] || (_[2] = (...f) => t(n).read && t(n).read(...f))
        }, k(t(o).refresh), 9, ai)
      ])) : B("", !0),
      P.value ? (c(), m("aside", li, [At(k(P.value), 1), v("button", {
        type: "button",
        "aria-label": t(o).close,
        onClick: _[3] || (_[3] = (f) => P.value = "")
      }, "×", 8, ii)])) : B("", !0),
      t(u) ? B("", !0) : (c(), m("p", ni, k(t(o).loading), 1)),
      t(h) ? (c(), m("p", oi, k(t(o).prepare), 1)) : B("", !0),
      v("div", {
        ref_key: "canvas",
        ref: S,
        class: "build-stage",
        "aria-label": t(o).scene
      }, [
        x.value === "house" && (X.value && w.value?.state === "living" || ve.value || ie.value) ? (c(), m("p", ri, k(ve.value || (ie.value ? t(Ge)[ie.value].thanks : ut.value)), 1)) : B("", !0),
        D.value?.tier === "sunroom" && re.value ? (c(), m("span", {
          key: 1,
          class: tt(["build-sun", { "from-left": D.value.sunSide === -1 }]),
          "aria-label": t(o).sun(D.value.sunSide)
        }, k(D.value.sunSide === -1 ? "☀ →" : "← ☀"), 11, ui)) : B("", !0),
        D.value && x.value === "house" ? (c(), m("nav", {
          key: 2,
          class: "build-floors",
          "aria-label": t(o).floors
        }, [v("button", {
          type: "button",
          "aria-pressed": H.value === null,
          onClick: _[4] || (_[4] = (f) => {
            H.value = null, I.value = null;
          })
        }, k(t(o).whole), 9, ci), (c(!0), m(V, null, ke(D.value.floors, (f) => (c(), m("button", {
          key: f,
          type: "button",
          "aria-pressed": H.value === f - 1,
          "data-build-floor": f - 1,
          onClick: (be) => {
            H.value = f - 1, I.value = null;
          }
        }, k(t(o).floor(f - 1)), 9, vi))), 128))], 8, di)) : B("", !0),
        w.value && x.value === "house" && !L.value ? (c(), m("div", mi, [(c(!0), m(V, null, ke(pe.value, (f) => (c(), m("button", {
          key: t(N)(f),
          type: "button",
          class: tt(["build-cell", {
            "is-occupied": me.value.has(t(N)(f)),
            "is-selected": q.value && me.value.get(t(N)(f)) === q.value
          }]),
          style: _t({
            left: f.left + "%",
            top: f.top + "%",
            width: f.width + "%",
            height: f.height + "%",
            clipPath: `polygon(${f.polygon})`
          }),
          "data-build-cell": t(N)(f),
          "data-build-place": !me.value.has(t(N)(f)),
          "aria-label": me.value.has(t(N)(f)) ? t(lt)[me.value.get(t(N)(f)).kind] + "，" + t(o).cell(f.x, f.y, f.z) : t(o).place({
            kind: C.value,
            x: f.x,
            y: f.y,
            z: f.z
          }),
          disabled: ue.value || ne.value,
          onClick: (be) => Qe(f)
        }, [(c(), m("svg", pi, [v("polygon", { points: f.polygon.replaceAll("%", "").replaceAll(",", " ") }, null, 8, hi)])), !me.value.has(t(N)(f)) && C.value ? (c(), Ve(gt, {
          key: 0,
          kind: C.value,
          class: "build-cell-preview"
        }, null, 8, ["kind"])) : B("", !0)], 14, fi))), 128))])) : B("", !0),
        q.value && Be.value ? (c(), m("div", {
          key: 4,
          class: "build-room-label",
          style: _t({
            left: Be.value.left + Be.value.width / 2 + "%",
            top: Be.value.top + "%"
          })
        }, k(t(o).selected(q.value)), 5)) : B("", !0),
        ae.value && w.value && x.value === "house" && !L.value ? (c(), m("div", {
          key: 5,
          class: "build-life-status",
          "data-build-life": ae.value.space.activity,
          "data-life-phase": ae.value.phase,
          role: "status"
        }, k(ae.value.phase === "walking" ? t(o).walking(ae.value.space.activity) : t(va)[ae.value.space.activity]), 9, bi)) : B("", !0),
        x.value === "house" ? (c(), m("div", yi, [
          v("button", {
            type: "button",
            "aria-label": t(o).focus,
            onClick: qe
          }, "⌕", 8, ki),
          v("button", {
            type: "button",
            "aria-label": t(o).zoomOut,
            onClick: _[5] || (_[5] = (f) => $e(0.14))
          }, "−", 8, gi),
          v("button", {
            type: "button",
            "aria-label": t(o).zoomIn,
            onClick: _[6] || (_[6] = (f) => $e(-0.14))
          }, "＋", 8, wi),
          v("button", {
            type: "button",
            onClick: He
          }, k(t(o).resetView), 1)
        ])) : B("", !0),
        L.value ? (c(), m("div", xi, [v("p", null, k(t(o).graphics), 1), v("button", {
          type: "button",
          onClick: Ze
        }, k(t(o).reload), 1)])) : e.generationActive ? (c(), m("div", _i, k(t(o).storyBusy), 1)) : B("", !0)
      ], 8, si),
      t(u) ? (c(), m("footer", Mi, [x.value === "desk" ? (c(), m("section", Si, [
        v("h2", null, k(t(o).construction), 1),
        v("p", null, k(t(o).newBrief), 1),
        t(u).active?.state === "building" ? (c(), m("button", {
          key: 0,
          type: "button",
          class: "build-primary",
          "data-build-action": "resume",
          disabled: t(i) || e.generationActive,
          onClick: _e
        }, k(t(o).resume), 9, Ci)) : (c(), m("button", {
          key: 1,
          type: "button",
          class: "build-primary",
          "data-build-action": "start",
          disabled: t(i) || e.generationActive,
          onClick: _[7] || (_[7] = (f) => p.value = "start")
        }, k(t(o).start), 9, $i)),
        t(u).active?.state === "living" || t(u).collection.length ? (c(), m("button", {
          key: 2,
          type: "button",
          "data-build-action": "homes",
          disabled: t(i),
          onClick: oe
        }, k(t(o).homes), 9, Ii)) : B("", !0)
      ])) : (c(), m(V, { key: 1 }, [
        $.value && w.value && !E.value ? (c(), Ve(xl, {
          key: 0,
          award: t(u).award,
          disabled: ue.value,
          onHomes: oe,
          onStart: _[8] || (_[8] = (f) => p.value = "start")
        }, null, 8, ["award", "disabled"])) : B("", !0),
        w.value?.state === "building" && se.value ? (c(), Ve(hl, {
          key: 1,
          result: se.value,
          onDetails: _[9] || (_[9] = (f) => p.value = "brief")
        }, null, 8, ["result"])) : B("", !0),
        ne.value && w.value?.supply ? (c(), Ve(dl, {
          key: w.value.supply.remaining,
          packs: le.value,
          round: t(3) - w.value.supply.remaining,
          disabled: ue.value,
          onChoose: _[10] || (_[10] = (f) => he({
            type: "choose",
            choice: f
          }))
        }, null, 8, [
          "packs",
          "round",
          "disabled"
        ])) : B("", !0),
        q.value && !ne.value && !$.value ? (c(), m("div", zi, [
          v("div", null, [v("strong", null, k(t(lt)[q.value.kind]), 1), v("button", {
            type: "button",
            "aria-label": t(o).close,
            onClick: _[11] || (_[11] = (f) => I.value = null)
          }, "×", 8, Ei)]),
          Ie.value?.issue ? (c(), m("p", Ri, k(t(ca)[Ie.value.issue]), 1)) : B("", !0),
          v("div", Ti, [
            Ie.value && !Ie.value.issue ? (c(), m("button", {
              key: 0,
              type: "button",
              disabled: ue.value,
              "data-build-action": "try",
              onClick: _[12] || (_[12] = (f) => We(q.value))
            }, k(t(o).useSpace(Ie.value.activity)), 9, Ai)) : B("", !0),
            re.value && xe.value ? (c(), m("button", {
              key: 1,
              type: "button",
              disabled: ue.value || !!xe.value.issue,
              "data-build-action": "refit",
              onClick: Te
            }, k(t(o).refit(xe.value.kind)), 9, Pi)) : B("", !0),
            re.value ? (c(), m("button", {
              key: 2,
              type: "button",
              disabled: ue.value || !!we.value,
              "data-build-action": "remove",
              onClick: _[13] || (_[13] = (f) => he({
                type: "remove",
                x: q.value.x,
                y: q.value.y,
                z: q.value.z
              }))
            }, k(t(o).remove), 9, Bi)) : B("", !0)
          ]),
          re.value && (we.value || xe.value?.issue) ? (c(), m("small", Oi, k(t(It)[we.value || xe.value.issue]), 1)) : B("", !0)
        ])) : B("", !0),
        re.value && !ne.value ? (c(), m(V, { key: 4 }, [
          q.value ? B("", !0) : (c(), m("div", {
            key: 0,
            class: "build-tray",
            "aria-label": t(o).parts
          }, [(c(!0), m(V, null, ke(Ke.value, (f) => (c(), m("button", {
            key: f,
            type: "button",
            "data-build-kind": f,
            "aria-label": t(o).choice(f, ye.value && f !== "path" ? ye.value[f] : null),
            "aria-pressed": C.value === f,
            disabled: ue.value || !!ye.value && f !== "path" && ye.value[f] <= 0,
            onClick: (be) => G(f)
          }, [
            Ye(gt, { kind: f }, null, 8, ["kind"]),
            v("span", null, k(t(lt)[f]), 1),
            v("span", ji, k(t(De)[f].cost ? t(o).cost(t(De)[f].cost) : t(o).freePath), 1),
            ye.value && f !== "path" ? (c(), m("small", Vi, k(t(o).stock(ye.value[f])), 1)) : B("", !0)
          ], 8, Ni))), 128))], 8, Li)),
          !q.value && C.value && !rt.value.size ? (c(), m("p", Di, k(t(o).noPlace), 1)) : B("", !0),
          v("div", Hi, [
            v("button", {
              type: "button",
              disabled: ue.value || !t(R),
              "data-build-action": "undo",
              onClick: Z
            }, k(t(o).undo), 9, qi),
            v("span", {
              role: "status",
              "data-build-award": t(u).award
            }, k(t(b) ? t(o).saving : t(o).earned(t(u).award)), 9, Wi),
            v("button", {
              type: "button",
              class: "build-primary",
              disabled: ue.value || w.value?.state === "building" && !se.value?.ready,
              "data-build-action": "finish",
              onClick: Q
            }, k(w.value?.state === "living" ? t(o).done : t(o).deliver), 9, Zi)
          ])
        ], 64)) : !ne.value && !$.value ? (c(), m(V, { key: 5 }, [
          w.value && (E.value || w.value.state === "abandoned") ? (c(), m("div", Ui, [v("strong", null, k(w.value.state === "living" ? t(o).complete : t(o).abandoned), 1), E.value ? B("", !0) : (c(), m("span", {
            key: 0,
            "data-build-award": t(u).award
          }, k(t(o).earned(t(u).award)) + " · " + k(t(o).net(t(u).award)), 9, Gi))])) : B("", !0),
          w.value?.state === "living" && !E.value && !q.value ? (c(), Ve(Rl, {
            key: 1,
            opportunity: ce.value,
            count: w.value.memories.length,
            disabled: ue.value,
            onRemodel: et,
            onRemember: g,
            onAlbum: _[14] || (_[14] = (f) => p.value = "memories")
          }, null, 8, [
            "opportunity",
            "count",
            "disabled"
          ])) : B("", !0),
          E.value && w.value?.state === "living" ? (c(), m("div", Yi, [v("button", {
            type: "button",
            class: "build-primary",
            disabled: ue.value,
            "data-build-action": "reside",
            onClick: _[15] || (_[15] = (f) => he({
              type: "reside",
              runId: w.value.id
            }))
          }, k(t(o).reside), 9, Fi)])) : B("", !0),
          E.value ? (c(), m("button", {
            key: 3,
            type: "button",
            class: "build-return",
            "data-build-action": "return",
            onClick: fe
          }, k(t(o).back), 1)) : B("", !0),
          w.value?.state === "abandoned" ? (c(), m("button", {
            key: 4,
            type: "button",
            class: "build-primary build-start",
            "data-build-action": "start",
            onClick: _[16] || (_[16] = (f) => p.value = "start")
          }, k(t(o).another), 1)) : B("", !0)
        ], 64)) : B("", !0)
      ], 64))])) : B("", !0),
      p.value ? (c(), m("div", {
        key: 6,
        class: "build-backdrop",
        onClick: _[27] || (_[27] = Ut((f) => p.value = null, ["self"]))
      }, [v("section", {
        ref_key: "dialog",
        ref: s,
        class: "build-dialog",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "build-dialog-title",
        tabindex: "-1"
      }, [v("header", null, [v("h2", Ki, k(p.value === "menu" ? t(o).name : p.value === "rules" ? t(o).rules : p.value === "collection" ? t(o).collection : p.value === "memories" ? t(o).memories : p.value === "brief" ? t(o).commission : p.value === "deliver" ? t(o).deliver : p.value === "start" ? t(o).newProject : p.value === "uncollect" ? t(o).uncollectTitle : t(o).abandonTitle), 1), v("button", {
        type: "button",
        "aria-label": t(o).close,
        onClick: _[17] || (_[17] = (f) => p.value = null)
      }, "×", 8, Xi)]), p.value === "menu" ? (c(), m("div", Ji, [
        v("p", { "data-build-balance": t(u)?.balance }, k(t(u) ? t(o).balance(t(u).balance) : t(o).loading), 9, Qi),
        v("button", {
          type: "button",
          onClick: _[18] || (_[18] = (f) => {
            p.value = null, Ce();
          })
        }, k(t(o).workbench), 1),
        v("button", {
          type: "button",
          onClick: _[19] || (_[19] = (f) => p.value = "collection")
        }, k(t(o).collection), 1),
        w.value?.state === "living" ? (c(), m(V, { key: 0 }, [
          $.value ? (c(), m("button", {
            key: 0,
            type: "button",
            onClick: _[20] || (_[20] = (f) => {
              p.value = null, oe();
            })
          }, k(t(o).homes), 1)) : B("", !0),
          $.value ? B("", !0) : (c(), m("button", {
            key: 1,
            type: "button",
            onClick: _[21] || (_[21] = (f) => p.value = "memories")
          }, k(t(o).memories), 1)),
          v("button", {
            type: "button",
            disabled: t(i),
            "data-build-action": "collect",
            onClick: _[22] || (_[22] = (f) => w.value.saved ? p.value = "uncollect" : (p.value = null, he({
              type: "collect",
              runId: w.value.id,
              save: !0
            })))
          }, k(w.value.saved ? t(o).uncollect : t(o).collect), 9, en),
          v("button", {
            type: "button",
            disabled: t(i),
            onClick: _[23] || (_[23] = (f) => {
              p.value = null, K();
            })
          }, k(t(o).export), 9, tn)
        ], 64)) : B("", !0),
        v("button", {
          type: "button",
          disabled: U.value || t(b) || !t(u),
          "aria-pressed": t(u)?.soundEnabled,
          onClick: Je
        }, k(t(u)?.soundEnabled ? t(o).soundOn : t(o).soundOff), 9, an),
        v("button", {
          type: "button",
          onClick: _[24] || (_[24] = (f) => p.value = "rules")
        }, k(t(o).rules), 1),
        w.value?.state === "building" ? (c(), m("button", {
          key: 1,
          type: "button",
          disabled: t(i),
          onClick: _[25] || (_[25] = (f) => p.value = "abandon")
        }, k(t(o).abandon), 9, ln)) : B("", !0)
      ])) : p.value === "brief" && se.value && D.value ? (c(), m("section", nn, [
        v("h3", null, k(t(o).minimumTitle), 1),
        (c(!0), m(V, null, ke(se.value.minimum, (f, be) => (c(), m("p", { key: be }, k(f ? "✓" : "○") + " " + k(t(o).minimumGoals[be]), 1))), 128)),
        v("h3", null, k(t(o).bonusTitle), 1),
        (c(!0), m(V, null, ke(se.value.wishes, (f) => (c(), m("p", { key: f.id }, k(f.met ? "✓" : "○") + " " + k(t(o).goal[f.id]), 1))), 128)),
        v("p", null, k(t(o).bonusTerms(w.value.tier)), 1),
        v("p", null, k(t(o).planningHelp), 1)
      ])) : p.value === "memories" && w.value ? (c(), Ve(Ll, {
        key: 2,
        project: w.value
      }, null, 8, ["project"])) : p.value === "rules" ? (c(), m("ul", on, [(c(!0), m(V, null, ke(t(o).ruleItems, (f) => (c(), m("li", { key: f }, k(f), 1))), 128))])) : p.value === "collection" ? (c(), m(V, { key: 4 }, [
        v("p", null, k(t(o).collectionCount(t(u)?.collection.length ?? 0)), 1),
        t(u)?.collection.length ? B("", !0) : (c(), m("p", sn, k(t(o).emptyCollection), 1)),
        v("div", rn, [(c(!0), m(V, null, ke(t(u)?.collection, (f, be) => (c(), m("button", {
          key: f.id,
          type: "button",
          onClick: (fn) => ee(f.id)
        }, [Ye(Fl, {
          brief: t(Fe)(f),
          rooms: f.rooms
        }, null, 8, ["brief", "rooms"]), v("strong", null, k(t(o).archiveTitle(f.tier, be)), 1)], 8, un))), 128))])
      ], 64)) : (c(), m(V, { key: 5 }, [
        v("p", null, k(p.value === "deliver" ? t(o).deliveryTerms(ge.value, !!se.value?.bonus) : p.value === "start" ? t(o).admission(t(Qt)) : p.value === "uncollect" ? t(o).uncollectBody : t(o).abandonBody), 1),
        p.value === "start" && t(u) && t(u).balance < t(Ae).fee ? (c(), m("p", dn, k(t(o).noFunds), 1)) : B("", !0),
        v("div", cn, [v("button", {
          type: "button",
          onClick: _[26] || (_[26] = (f) => p.value = null)
        }, k(t(o).cancel), 1), v("button", {
          type: "button",
          class: "build-primary",
          disabled: t(i) || e.generationActive || p.value === "start" && (!t(u) || t(u).balance < t(Ae).fee),
          "data-build-action": "confirm",
          onClick: je
        }, k(p.value === "start" ? t(o).start : p.value === "deliver" ? t(o).deliver : t(o).confirm), 9, vn)])
      ], 64))], 512)])) : B("", !0)
    ], 10, Kl));
  }
}), gn = mn;
export {
  gn as default
};
