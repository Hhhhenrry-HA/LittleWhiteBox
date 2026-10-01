/* eslint-disable */
import { A as Ze, D as Oe, E as Ye, F as h, L as ce, M as Be, O as Fe, U as Te, X as W, Z as we, _ as y, b as re, et as t, g as H, h as je, l as Ne, m as d, nt as xe, p as J, rt as m, tt as ue, u as te, v as se, x as Me, y as ne } from "./xiaobai-os-runtime-dom.esm-bundler-BeaorYpU.js";
import { i as Ve, r as Ue } from "./xiaobai-os-app-navigation-C25euSGK.js";
import { a as ve, i as We, n as de, o as Xe, r as o, s as he, t as De } from "./xiaobai-os-copy-Bo3eHGxn.js";
import { At as pe, Ot as Ke, S as Je, St as Qe, X as et, _t as tt, a as at, g as Le, gt as nt, kt as Re, m as it, mt as ot, n as lt, q as rt, rt as st, t as dt, u as ct, x as Ce } from "./xiaobai-os-RoundedBoxGeometry-CpWqoTdO.js";
var Ge = [
  "cat",
  "cup",
  "plant",
  "toast",
  "duck",
  "ufo",
  "potion",
  "star"
];
function ut(e) {
  return {
    remaining: e.items.map((s) => s.id),
    tray: []
  };
}
function me(e) {
  return !e.remaining.length && !e.tray.length ? "won" : e.tray.length >= 7 ? "lost" : "playing";
}
function qe(e, s) {
  return (e.items.length - s.remaining.length - s.tray.length) / 3;
}
function _e(e, s) {
  return me(e) === "playing" && e.remaining.includes(s.id) && (!s.above || !e.remaining.includes(s.above));
}
function ft(e, s, a) {
  if (me(s) !== "playing") return {
    ok: !1,
    reason: "finished"
  };
  const n = e.items.find((f) => f.id === a.id);
  if (!n || !s.remaining.includes(n.id)) return {
    ok: !1,
    reason: "missing"
  };
  if (!_e(s, n)) return {
    ok: !1,
    reason: "blocked"
  };
  const i = [...s.tray], r = (f) => e.items.find((g) => g.id === f).kind === n.kind, u = i.reduce((f, g, P) => r(g) ? P : f, -1);
  i.splice(u < 0 ? i.length : u + 1, 0, n.id);
  const l = i.filter(r), p = l.length === 3 ? l : [];
  return {
    ok: !0,
    packed: p,
    state: {
      remaining: s.remaining.filter((f) => f !== n.id),
      tray: i.filter((f) => !p.includes(f))
    }
  };
}
function vt(e) {
  let s = e >>> 0;
  return () => {
    s += 1831565813;
    let a = s;
    return a = Math.imul(a ^ a >>> 15, a | 1), a ^= a + Math.imul(a ^ a >>> 7, a | 61), ((a ^ a >>> 14) >>> 0) / 4294967296;
  };
}
function pt(e, s, a) {
  const n = e.flatMap((i) => Array.from({ length: 3 }, () => i));
  for (let i = n.length - 1; i > 0; i--) {
    const r = Math.floor(a() * (i + 1));
    [n[i], n[r]] = [n[r], n[i]];
  }
  return Array.from({ length: s }, (i, r) => n.filter((u, l) => l % s === r));
}
var ie = [
  [
    -2.35,
    0.7,
    -1.9
  ],
  [
    2.05,
    0.9,
    -1.85
  ],
  [
    2.05,
    0.65,
    1.2
  ],
  [
    -2.1,
    0.4,
    1.3
  ]
], bt = 0.51, rn = {
  lanes: ie.length,
  depth: Ge.length * 3 / ie.length
}, mt = [
  {
    count: 4,
    lanes: 3,
    seed: 9
  },
  {
    count: 5,
    lanes: 3,
    seed: 2
  },
  {
    count: 6,
    lanes: 3,
    seed: 3
  },
  {
    count: 7,
    lanes: 4,
    seed: 56
  },
  {
    count: 7,
    lanes: 4,
    seed: 5
  }
];
function gt(e, s, a, n) {
  const i = e.map((r, u) => r.map((l, p) => `s${u}-${p}`));
  return {
    id: s,
    key: a,
    seed: n,
    items: e.flatMap((r, u) => r.map((l, p) => {
      const [f, g, P] = ie[u];
      return {
        id: i[u][p],
        kind: l,
        above: p ? i[u][p - 1] : null,
        position: [
          f + (p % 2 ? 0.18 : -0.18),
          g + (r.length - p - 1) * bt + 0.32,
          P
        ]
      };
    })),
    stacks: i
  };
}
var be = mt.map((e, s) => gt(pt(Ge.slice(0, e.count), e.lanes, vt(e.seed)), "weekend", `chapter-${s + 1}`, e.seed));
function ht(e) {
  throw Object.assign(/* @__PURE__ */ new Error(`moving_${e}`), { code: `moving_${e}` });
}
function yt(e) {
  let s = ut(e.level);
  for (const a of e.moves) {
    const n = ft(e.level, s, {
      type: "pick",
      id: a
    });
    n.ok || ht("invalid"), s = n.state;
  }
  return s;
}
function ze(e) {
  return e.abandoned ? "abandoned" : me(yt(e));
}
function kt() {
  return [...crypto.getRandomValues(new Uint32Array(4))].map((e) => e.toString(16).padStart(8, "0")).join("");
}
function wt(e, s) {
  const a = we(null), n = W(!1), i = W(""), r = W(!1), u = we(null);
  let l = !1, p = null;
  const f = J(() => n.value || !!u.value || !a.value?.ready || a.value.writeState !== "ready" || a.value.pending);
  function g(C) {
    l || (a.value = C);
  }
  async function P(C, L) {
    if (l || n.value) return !1;
    n.value = !0, p = null, r.value = !!L && "command" in L && L.command.type === "challenge", i.value = "";
    try {
      const $ = await e.request(`game/moving/${C}`, {
        chatIdentity: s,
        ...L
      }, 35e3), O = p;
      return g(O && O.revision >= $.result.revision ? O : $.result), a.value?.writeState === "ready" && !a.value.pending && (u.value = null), !0;
    } catch ($) {
      if (!l) {
        if (p && g(p), C === "sound") throw $;
        i.value = Xe($);
        const O = $ && typeof $ == "object" && "code" in $ ? String($.code) : $ instanceof Error ? $.message : "";
        L && "command" in L && (O.startsWith("moving_save_") || O.startsWith("host_request_")) && (u.value = L);
      }
      return !1;
    } finally {
      l || (n.value = !1, r.value = !1);
    }
  }
  const T = e.subscribe((C) => {
    if (l || C.type !== "game/moving/state") return;
    const L = C.payload;
    L.chatIdentity === s && (n.value ? p = L.state : g(L.state));
  });
  async function _() {
    const C = u.value;
    !await P("confirm") || !a.value || a.value.writeState !== "ready" || a.value.pending || C && a.value.revision === C.revision && await P("act", C);
  }
  return {
    view: a,
    busy: n,
    error: i,
    generating: r,
    blocked: f,
    failed: u,
    notice: J(() => i.value || (a.value?.writeState === "conflict" ? o.conflict : a.value?.pending || a.value?.writeState === "unconfirmed" ? o.saveProblem : "")),
    read: () => P("read"),
    recover: _,
    setSoundEnabled: (C) => P("sound", { enabled: C }),
    act: (C) => f.value ? Promise.resolve(!1) : P("act", {
      actionId: kt(),
      revision: a.value.revision,
      command: C
    }),
    dispose() {
      l = !0, T();
    }
  };
}
function xt() {
  let e, s = !1, a = !1, n = 0;
  return {
    available: typeof AudioContext < "u",
    async setEnabled(i) {
      const r = ++n;
      return a ? !1 : (s = i, i ? (e ??= new AudioContext(), await e.resume()) : e?.state === "running" && await e.suspend(), r === n && !a);
    },
    play(i) {
      !s || e?.state !== "running" || (i ? [
        523.25,
        659.25,
        783.99
      ] : [392]).forEach((r, u) => {
        const l = e.createOscillator(), p = e.createGain(), f = e.currentTime + u * 0.09;
        l.type = "sine", l.frequency.value = r, p.gain.setValueAtTime(0, f), p.gain.linearRampToValueAtTime(0.065, f + 0.015), p.gain.exponentialRampToValueAtTime(1e-3, f + 0.25), l.connect(p), p.connect(e.destination), l.start(f), l.stop(f + 0.27), l.onended = () => {
          l.disconnect(), p.disconnect();
        };
      });
    },
    async dispose() {
      a = !0, n++, s = !1, e && e.state !== "closed" && await e.close();
    }
  };
}
var He = {
  cat: "#f8bbbf",
  toast: "#dd9a54",
  ufo: "#70c9b3",
  cup: "#b8a2e5",
  duck: "#ffce5b",
  plant: "#52ad89",
  potion: "#916ce1",
  star: "#ffd36b"
};
function ye(e, s) {
  const a = new Ce(), n = He[s], i = (r, u, l = 0.1) => {
    for (const p of [-l, l]) e.ball(a, [
      0.025,
      0.038,
      0.02
    ], "#343447", [
      p,
      r,
      u
    ]);
  };
  switch (s) {
    case "cat":
      e.ball(a, [
        0.26,
        0.26,
        0.21
      ], n, [
        0,
        -0.06,
        0
      ]), e.ball(a, [
        0.29,
        0.23,
        0.22
      ], n, [
        0,
        0.15,
        0
      ]);
      for (const r of [-0.19, 0.19])
        e.cylinder(a, 0, 0.12, 0.25, n, [
          r,
          0.37,
          -0.015
        ], 3).rotation.y = Math.PI, e.ball(a, [
          0.065,
          0.035,
          0.03
        ], "#ed90a1", [
          r,
          0.09,
          0.2
        ]);
      i(0.18, 0.212), e.ball(a, [
        0.032,
        0.025,
        0.03
      ], "#d97690", [
        0,
        0.11,
        0.224
      ]), e.ring(a, 0.13, 0.045, n, [
        0.26,
        -0.11,
        -0.03
      ]).rotation.y = 0.5;
      break;
    case "toast":
      e.box(a, [
        0.52,
        0.58,
        0.2
      ], n, [
        0,
        0.04,
        0
      ], 0.1), e.ball(a, [
        0.3,
        0.16,
        0.12
      ], n, [
        0,
        0.28,
        0
      ]), e.box(a, [
        0.4,
        0.43,
        0.025
      ], "#ffe9b9", [
        0,
        0.045,
        0.11
      ], 0.1), e.box(a, [
        0.18,
        0.14,
        0.045
      ], "#ffd467", [
        0,
        0.08,
        0.14
      ], 0.03).rotation.z = 0.15, i(-0.07, 0.145);
      break;
    case "ufo":
      e.ball(a, [
        0.35,
        0.1,
        0.3
      ], n, [
        0,
        -0.04,
        0
      ]), e.ball(a, [
        0.2,
        0.21,
        0.19
      ], "#bbe8ec", [
        0,
        0.09,
        0
      ]), e.ring(a, 0.26, 0.045, "#ede7aa", [
        0,
        -0.04,
        0
      ]).rotation.x = Math.PI / 2;
      for (const r of [-0.18, 0.18]) e.ball(a, [
        0.06,
        0.06,
        0.06
      ], "#f7b2b8", [
        r,
        -0.075,
        0.19
      ]);
      i(0.09, 0.172, 0.07);
      break;
    case "cup":
      e.cylinder(a, 0.235, 0.18, 0.43, n, [
        0,
        0,
        0
      ]), e.cylinder(a, 0.19, 0.19, 0.015, "#715144", [
        0,
        0.22,
        0
      ]), e.ring(a, 0.13, 0.047, n, [
        0.25,
        0.025,
        0
      ]), e.ring(a, 0.213, 0.025, "#e7d9fb", [
        0,
        0.22,
        0
      ]).rotation.x = Math.PI / 2, i(0, 0.208);
      break;
    case "duck":
      e.ball(a, [
        0.27,
        0.19,
        0.26
      ], n, [
        0,
        -0.08,
        0
      ]), e.ball(a, [
        0.18,
        0.18,
        0.17
      ], n, [
        0,
        0.16,
        0.07
      ]), e.ball(a, [
        0.1,
        0.045,
        0.11
      ], "#f59b46", [
        0,
        0.12,
        0.24
      ]);
      for (const r of [-0.22, 0.22]) e.ball(a, [
        0.06,
        0.1,
        0.15
      ], "#f4b742", [
        r,
        -0.045,
        0
      ]);
      i(0.19, 0.218, 0.07);
      break;
    case "plant":
      e.cylinder(a, 0.19, 0.14, 0.25, "#efa08e", [
        0,
        -0.19,
        0
      ]), e.cylinder(a, 0.2, 0.2, 0.06, "#ffc1ac", [
        0,
        -0.07,
        0
      ]), e.cylinder(a, 0.025, 0.025, 0.34, n, [
        0,
        0.1,
        0
      ]);
      for (let r = 0; r < 5; r++) {
        const u = r * 2.4, l = e.ball(a, [
          0.085,
          0.21,
          0.07
        ], n, [
          Math.sin(u) * 0.13,
          0.15 + r * 0.025,
          Math.cos(u) * 0.12
        ]);
        l.rotation.z = Math.sin(u) * 0.7, l.rotation.x = Math.cos(u) * 0.7;
      }
      break;
    case "potion":
      e.ball(a, [
        0.235,
        0.25,
        0.21
      ], n, [
        0,
        -0.04,
        0
      ]), e.cylinder(a, 0.095, 0.11, 0.23, "#c1a1f2", [
        0,
        0.21,
        0
      ]), e.cylinder(a, 0.105, 0.09, 0.1, "#d1a370", [
        0,
        0.35,
        0
      ]), e.box(a, [
        0.2,
        0.17,
        0.025
      ], "#fff0bc", [
        0,
        -0.03,
        0.205
      ], 0.04).rotation.z = 0.15, e.ball(a, [
        0.04,
        0.065,
        0.02
      ], "#fff5ff", [
        -0.11,
        0.05,
        0.19
      ]);
      break;
    case "star":
      e.ball(a, [
        0.2,
        0.2,
        0.115
      ], n, [
        0,
        0,
        0
      ]);
      for (let r = 0; r < 5; r++) {
        const u = r * Math.PI * 2 / 5, l = e.cylinder(a, 0, 0.13, 0.25, n, [
          Math.sin(u) * 0.22,
          Math.cos(u) * 0.22,
          0
        ], 4);
        l.rotation.z = -u;
      }
      i(0.02, 0.11, 0.07);
      break;
  }
  return a;
}
function Mt() {
  const e = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
  function a(n, i, r, u, l) {
    s.has(i) || s.set(i, r()), e.has(u) || e.set(u, new et({
      color: u,
      roughness: 0.55,
      metalness: 0.02
    }));
    const p = new rt(s.get(i), e.get(u));
    return p.position.set(...l), p.castShadow = !0, p.receiveShadow = !0, n.add(p), p;
  }
  return {
    group(n, i = [
      0,
      0,
      0
    ]) {
      const r = new Ce();
      return r.position.set(...i), n.add(r), r;
    },
    box(n, i, r, u, l = 0.08) {
      const p = Math.min(l, ...i.map((f) => f / 2));
      return a(n, `b:${i}:${p}`, () => new dt(...i, 2, p), r, u);
    },
    ball(n, i, r, u) {
      const l = a(n, "ball", () => new Qe(1, 16, 12), r, u);
      return l.scale.set(...i), l;
    },
    cylinder(n, i, r, u, l, p, f = 24) {
      return a(n, `c:${i}:${r}:${u}:${f}`, () => new it(i, r, u, f), l, p);
    },
    ring(n, i, r, u, l) {
      return a(n, `t:${i}:${r}`, () => new Ke(i, r, 8, 32), u, l);
    },
    dispose() {
      s.forEach((n) => n.dispose()), e.forEach((n) => n.dispose()), s.clear(), e.clear();
    }
  };
}
var Ct = {
  fur: "#fffaf2",
  feet: "#667486",
  eyes: "#354353",
  cheeks: "#f0afb0"
}, _t = [
  {
    name: "left-ear",
    center: [
      -0.2,
      0.48,
      0
    ],
    radius: [
      0.09,
      0.17,
      0.085
    ],
    color: "fur"
  },
  {
    name: "right-ear",
    center: [
      0.2,
      0.48,
      0
    ],
    radius: [
      0.09,
      0.17,
      0.085
    ],
    color: "fur"
  },
  {
    name: "left-foot",
    center: [
      -0.15,
      -0.28,
      0.06
    ],
    radius: [
      0.065,
      0.07,
      0.1
    ],
    color: "feet"
  },
  {
    name: "right-foot",
    center: [
      0.15,
      -0.28,
      0.06
    ],
    radius: [
      0.065,
      0.07,
      0.1
    ],
    color: "feet"
  },
  {
    name: "body",
    center: [
      0,
      0.1,
      0
    ],
    radius: [
      0.32,
      0.4,
      0.27
    ],
    color: "fur"
  },
  {
    name: "left-eye",
    center: [
      -0.1,
      0.22,
      0.252
    ],
    radius: [
      0.028,
      0.039,
      0.02
    ],
    color: "eyes"
  },
  {
    name: "right-eye",
    center: [
      0.1,
      0.22,
      0.252
    ],
    radius: [
      0.028,
      0.039,
      0.02
    ],
    color: "eyes"
  },
  {
    name: "left-cheek",
    center: [
      -0.16,
      0.12,
      0.242
    ],
    radius: [
      0.052,
      0.028,
      0.025
    ],
    color: "cheeks"
  },
  {
    name: "right-cheek",
    center: [
      0.16,
      0.12,
      0.242
    ],
    radius: [
      0.052,
      0.028,
      0.025
    ],
    color: "cheeks"
  }
];
function $t(e, s, a) {
  const n = e.group(s, a);
  for (const i of _t) e.ball(n, [
    i.radius[0],
    i.radius[1],
    i.radius[2]
  ], Ct[i.color], [
    i.center[0],
    i.center[1],
    i.center[2]
  ]);
  return n;
}
var St = {
  weekend: {
    wall: "#e0efe7",
    floor: "#fff0df",
    trim: "#95c9b3",
    seat: "#f2b4bc",
    rug: "#c9e1f3",
    cabinet: "#f4d294"
  },
  witch: {
    wall: "#e9e3fc",
    floor: "#f3efff",
    trim: "#b5a5dc",
    seat: "#b2d2e5",
    rug: "#c7eddf",
    cabinet: "#b8ded8"
  }
};
function Et(e) {
  const s = Mt(), a = new Ce(), n = St[e.id], i = s.group(a), r = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map(), l = s.box, p = s.ball;
  l(i, [
    9.6,
    0.5,
    8.8
  ], n.trim, [
    0,
    -0.46,
    0
  ], 0.22), l(i, [
    9.25,
    0.26,
    8.5
  ], n.floor, [
    0,
    -0.13,
    0
  ], 0.16), l(i, [
    9.05,
    4.35,
    0.22
  ], n.wall, [
    0,
    2.08,
    -3.58
  ], 0.08), l(i, [
    0.22,
    4.35,
    6.9
  ], n.wall, [
    -4.42,
    2.08,
    -0.22
  ], 0.08), l(i, [
    9.05,
    0.14,
    0.15
  ], n.trim, [
    0,
    0.13,
    -3.4
  ], 0.03);
  for (let b = -4; b <= 4; b++) l(i, [
    0.014,
    9e-3,
    8.15
  ], "#e5ddd2", [
    b,
    8e-3,
    0.1
  ], 0);
  for (const b of [
    -2,
    0,
    2
  ]) l(i, [
    8.8,
    9e-3,
    0.014
  ], "#e5ddd2", [
    0,
    8e-3,
    b
  ], 0);
  const f = l(i, [
    5.9,
    0.055,
    3.15
  ], n.rug, [
    0,
    0.035,
    1.45
  ], 0.025);
  f.rotation.y = -0.035;
  for (let b = 0; b < 14; b++) l(i, [
    0.055,
    0.025,
    0.18
  ], "#fffdf6", [
    -2.6 + b * 0.4,
    0.05,
    3.08
  ], 0.01);
  if (l(i, [
    2.5,
    1.65,
    0.17
  ], "#fffaf0", [
    0.35,
    3.15,
    -3.38
  ], 0.09), l(i, [
    2.24,
    1.4,
    0.06
  ], e.id === "witch" ? "#b6bde9" : "#b8e2ee", [
    0.35,
    3.15,
    -3.27
  ], 0.05), p(i, [
    0.25,
    0.25,
    0.04
  ], "#fff0ba", [
    0.98,
    3.48,
    -3.2
  ]), e.id === "witch") {
    p(i, [
      0.22,
      0.22,
      0.045
    ], "#b6bde9", [
      1.1,
      3.56,
      -3.15
    ]);
    for (const [b, E] of [
      [-0.25, 3.55],
      [0.15, 2.85],
      [0.85, 2.8]
    ]) {
      const x = ye(s, "star");
      x.position.set(b, E, -3.17), x.scale.setScalar(0.25), i.add(x);
    }
  } else for (const b of [
    -0.3,
    -0.05,
    0.2
  ]) p(i, [
    0.22,
    0.11,
    0.025
  ], "#f8fcff", [
    b,
    3.3,
    -3.21
  ]);
  l(i, [
    0.06,
    1.45,
    0.07
  ], "#fffaf0", [
    0.35,
    3.15,
    -3.15
  ], 0.02);
  for (const b of [-1.12, 1.82]) l(i, [
    0.42,
    1.8,
    0.25
  ], e.id === "witch" ? "#c4b2e7" : "#f4c4bf", [
    b,
    3.15,
    -3.12
  ], 0.1);
  const [g, P, T] = ie[0];
  if (e.id === "weekend") {
    l(i, [
      3,
      0.45,
      1.42
    ], n.seat, [
      g,
      P - 0.3,
      T
    ], 0.18), l(i, [
      3,
      0.85,
      0.32
    ], n.seat, [
      g,
      P + 0.25,
      T - 0.67
    ], 0.15);
    for (const b of [g - 1.35, g + 1.35]) l(i, [
      0.3,
      0.65,
      1.48
    ], n.seat, [
      b,
      P,
      T
    ], 0.14);
    for (const b of [
      g - 0.8,
      g,
      g + 0.8
    ]) l(i, [
      0.73,
      0.18,
      1.05
    ], "#ffd7d9", [
      b,
      P - 0.04,
      T
    ], 0.08);
  } else {
    l(i, [
      3.05,
      0.64,
      1.5
    ], n.seat, [
      g,
      P - 0.35,
      T
    ], 0.1), l(i, [
      3.2,
      0.15,
      1.6
    ], "#fff6e8", [
      g,
      P - 0.04,
      T
    ], 0.06);
    for (const E of [g - 0.9, g + 0.9])
      l(i, [
        0.68,
        0.38,
        0.035
      ], "#8699be", [
        E,
        0.31,
        T + 0.77
      ], 0.06), p(i, [
        0.055,
        0.055,
        0.03
      ], "#f6d38b", [
        E,
        0.52,
        T + 0.8
      ]);
    const b = s.group(i, [
      -3.42,
      0.46,
      0.7
    ]);
    p(b, [
      0.47,
      0.4,
      0.43
    ], "#9c91c5", [
      0,
      0,
      0
    ]), s.ring(b, 0.36, 0.06, "#c0b1e1", [
      0,
      0.26,
      0
    ]).rotation.x = Math.PI / 2, s.cylinder(b, 0.33, 0.33, 0.018, "#a8edcf", [
      0,
      0.26,
      0
    ]);
    for (const E of [-0.48, 0.48]) s.ring(b, 0.1, 0.03, "#dfcfa1", [
      E,
      0.06,
      0
    ]);
    for (const [E, x] of [
      [-0.16, 0.48],
      [0.1, 0.74],
      [0.21, 0.43]
    ]) p(b, [
      0.095,
      0.095,
      0.095
    ], "#c2f5df", [
      E,
      x,
      0
    ]);
  }
  const [_, C, L] = ie[1];
  l(i, [
    2.35,
    C,
    1.45
  ], n.cabinet, [
    _,
    C / 2,
    L
  ], 0.09), l(i, [
    2.48,
    0.13,
    1.56
  ], "#fff7e6", [
    _,
    C,
    L
  ], 0.05);
  for (const b of [0.25, 0.62])
    l(i, [
      2.12,
      0.27,
      0.04
    ], n.trim, [
      _,
      b,
      L + 0.75
    ], 0.03), l(i, [
      0.45,
      0.055,
      0.08
    ], "#fff7e6", [
      _,
      b,
      L + 0.81
    ], 0.02);
  const [$, O, X] = ie[2];
  l(i, [
    1.85,
    O,
    1.45
  ], "#e9be94", [
    $,
    O / 2,
    X
  ], 0.06), l(i, [
    0.2,
    O + 0.016,
    1.48
  ], "#ffe5b7", [
    $,
    O / 2,
    X
  ], 0.01), l(i, [
    0.5,
    0.25,
    0.02
  ], "#fff7e6", [
    $ - 0.45,
    0.35,
    X + 0.74
  ], 0.03);
  const [U, I, Z] = ie[3];
  l(i, [
    2.15,
    0.13,
    1.35
  ], e.id === "witch" ? "#c1d8f0" : "#f5d6ac", [
    U,
    I,
    Z
  ], 0.055);
  for (const b of [U - 0.7, U + 0.7]) l(i, [
    0.11,
    I,
    0.8
  ], n.trim, [
    b,
    I / 2,
    Z
  ], 0.03);
  l(i, [
    1.4,
    0.13,
    0.62
  ], n.trim, [
    3.25,
    3.45,
    -3.02
  ], 0.05);
  const z = s.group(i, [
    2.94,
    3.515,
    -2.96
  ]);
  l(z, [
    0.5,
    0.075,
    0.24
  ], n.seat, [
    0,
    0.04,
    0
  ], 0.025), s.cylinder(z, 0.25, 0.25, 0.16, n.seat, [
    0,
    0.3,
    0
  ]).rotation.x = Math.PI / 2, s.cylinder(z, 0.207, 0.207, 0.018, "#fffaf0", [
    0,
    0.3,
    0.09
  ]).rotation.x = Math.PI / 2, l(z, [
    0.025,
    0.145,
    0.018
  ], "#53646b", [
    0,
    0.36,
    0.11
  ], 8e-3), l(z, [
    0.13,
    0.025,
    0.018
  ], "#53646b", [
    0.05,
    0.3,
    0.11
  ], 8e-3);
  for (const [b, E, x] of [
    [
      3.36,
      0.42,
      n.rug
    ],
    [
      3.53,
      0.54,
      n.trim
    ],
    [
      3.7,
      0.46,
      n.seat
    ]
  ]) {
    const c = s.group(i, [
      b,
      3.515,
      -2.96
    ]);
    l(c, [
      0.14,
      E,
      0.3
    ], x, [
      0,
      E / 2,
      0
    ], 0.012), l(c, [
      0.1,
      0.018,
      0.25
    ], "#fffaf0", [
      0,
      E - 0.025,
      0.012
    ], 3e-3);
    for (const k of [0.07, E - 0.07]) l(c, [
      0.095,
      0.016,
      0.012
    ], "#fffaf0", [
      0,
      k,
      0.151
    ], 3e-3);
  }
  const w = s.group(i, [
    -4.25,
    2.55,
    0.05
  ]);
  w.rotation.y = Math.PI / 2, l(w, [
    1,
    1.1,
    0.09
  ], "#fff7e8", [
    0,
    0,
    0
  ], 0.04), l(w, [
    0.82,
    0.9,
    0.03
  ], "#cddff3", [
    0,
    0,
    0.06
  ], 0.025);
  const A = ye(s, e.id === "witch" ? "potion" : "cat");
  A.scale.setScalar(0.8), A.position.set(0, -0.08, 0.15), w.add(A);
  for (const b of e.items) {
    const E = ye(s, b.kind);
    l(E, [
      0.93,
      0.085,
      0.76
    ], "#fff9e9", [
      0,
      -0.29,
      0
    ], 0.035);
    for (const c of [-0.34, 0.34]) p(E, [
      0.1,
      0.055,
      0.25
    ], "#f4e8d5", [
      c,
      -0.23,
      0
    ]);
    E.position.set(...b.position), E.userData.itemId = b.id, a.add(E), r.set(b.id, E);
    const x = s.group(a, [
      b.position[0],
      b.position[1] - 0.27,
      b.position[2]
    ]);
    s.ring(x, 0.47, 0.023, "#eaba61", [
      0,
      0,
      0
    ]).rotation.x = Math.PI / 2, u.set(b.id, x);
  }
  const V = $t(s, a, [
    -3.05,
    0.52,
    3.55
  ]), Y = s.group(V, [
    0,
    -0.03,
    0.37
  ]);
  l(Y, [
    0.47,
    0.35,
    0.33
  ], "#dfb084", [
    0,
    0,
    0
  ], 0.035), l(Y, [
    0.08,
    0.36,
    0.34
  ], "#ffe6b8", [
    0,
    0,
    0
  ], 8e-3), Y.visible = !1;
  const B = s.group(a, [
    3.6,
    0.1,
    3.55
  ]);
  for (let b = 0; b < e.items.length / 3; b++) {
    const E = l(B, [
      0.4,
      0.26,
      0.4
    ], b % 2 ? "#e2b585" : "#efcba2", [
      b % 2 * 0.43 - 0.25,
      Math.floor(b / 2) * 0.28 + 0.14,
      0
    ], 0.03);
    E.visible = !1;
  }
  const Q = s.ring(a, 0.49, 0.03, "#e6ac44", [
    0,
    0.1,
    0
  ]);
  return Q.rotation.x = -Math.PI / 2, Q.visible = !1, Q.castShadow = !1, {
    root: a,
    items: r,
    markers: u,
    mascot: V,
    parcel: Y,
    shipped: B,
    halo: Q,
    dispose: () => s.dispose()
  };
}
var ke = 0.42;
function It() {
  return new st(-7, 7, 7, -7, 0.1, 100);
}
function At(e, s, a, n) {
  e.position.set(Math.sin(n) * 18, 13.5, Math.cos(n) * 18), e.lookAt(0, 1, 0.1), e.updateMatrixWorld(!0);
  const i = new at(new pe(-4.8, -0.8, -3.7), new pe(4.8, 4.7, 4.4));
  let r = 0, u = 0;
  for (const f of [i.min.x, i.max.x]) for (const g of [i.min.y, i.max.y]) for (const P of [i.min.z, i.max.z]) {
    const T = new pe(f, g, P).applyMatrix4(e.matrixWorldInverse);
    r = Math.max(r, Math.abs(T.x)), u = Math.max(u, Math.abs(T.y));
  }
  const l = s / a, p = Math.max(u, r / l) * 1.035;
  e.top = p, e.bottom = -p, e.left = -p * l, e.right = -e.left, e.updateProjectionMatrix();
}
var Pt = 1100;
function Tt(e, s) {
  return {
    rest(a) {
      e.position.copy(s), e.rotation.y = 0, a.visible = !1;
    },
    carry(a, n, i) {
      const r = Math.max(0, (a - 0.2) / 0.8);
      i.visible = r > 0 && r < 0.92, e.position.x = s.x + r * (n - s.x), e.position.y = s.y + Math.abs(Math.sin(r * 22)) * 0.1, e.rotation.y = 0.6;
    }
  };
}
function Lt(e, s, a, n) {
  const i = new tt(), r = It(), u = new ot(), l = new Re(), p = new Re(), f = Et(s), g = f.mascot.position.clone(), P = Tt(f.mascot, g), T = new AbortController();
  let _, C, L, $ = !1, O = !1, X = !0, U = !0, I = 0, Z = 0, z = 0, w = ke;
  const A = 0.86;
  let V = a, Y = null, B = null;
  const Q = matchMedia("(prefers-reduced-motion: reduce)");
  let b;
  const E = new Le("#fff4df", 3.1);
  E.position.set(-3, 10, 7), E.castShadow = !0, E.shadow.mapSize.set(1024, 1024), Object.assign(E.shadow.camera, {
    left: -8,
    right: 8,
    top: 8,
    bottom: -8,
    near: 0.5,
    far: 30
  }), E.shadow.normalBias = 0.025, E.shadow.bias = -15e-5, i.add(new Je("#f3f8ff", "#b6b2b0", 2.1), E, f.root);
  const x = new Le("#dbeaff", 0.7);
  x.position.set(6, 5, -3), i.add(x);
  function c() {
    for (const M of s.items) {
      const R = f.items.get(M.id);
      R.visible = V.remaining.includes(M.id), R.position.set(...M.position), R.scale.setScalar(A), f.markers.get(M.id).visible = _e(V, M);
    }
    P.rest(f.parcel), f.shipped.children.forEach((M, R) => {
      M.visible = R < qe(s, V);
    });
  }
  function k() {
    const M = b;
    b = void 0, c(), M?.done();
  }
  function G() {
    I && (cancelAnimationFrame(I), I = 0);
  }
  function q(M, R) {
    $ || O || (O = !0, G(), k(), n.error(M, R));
  }
  function K() {
    At(r, Z, z, w);
  }
  function ee(M) {
    if (I = 0, !($ || O || !X || !U || document.hidden || Z <= 0 || z <= 0))
      try {
        if (b) {
          const v = Math.min(1, (M - b.started) / b.duration), j = b.action;
          if (j?.type === "pick") {
            const D = s.items.find((le) => le.id === j.id), S = f.items.get(D.id), N = Math.min(1, v * (b.packed ? 4 : 1));
            S.visible = N < 1, S.position.set(...D.position).lerp(g.clone().add(new pe(0, 0.43, 0)), N), S.position.y += Math.sin(N * Math.PI) * 1.4, S.scale.setScalar(A * (1 - N * 0.7)), b.packed && P.carry(v, f.shipped.position.x, f.parcel);
          }
          v >= 1 && k();
        }
        const R = Y ? f.items.get(Y) : void 0;
        f.halo.visible = !!R?.visible, R?.visible && (f.halo.position.copy(R.position), f.halo.position.y -= 0.28), _.getSize(p), (p.x !== Z || p.y !== z) && _.setSize(Z, z, !1), _.render(i, r), b && F();
      } catch (R) {
        q("graphicsFailed", R);
      }
  }
  function F() {
    !I && !$ && !O && X && U && !document.hidden && Z > 0 && z > 0 && (I = requestAnimationFrame(ee));
  }
  function ae() {
    const M = e.getBoundingClientRect();
    if (Z = M.width, z = M.height, Z <= 0 || z <= 0) {
      G();
      return;
    }
    K(), F();
  }
  function ge(M, R) {
    const v = _.domElement.getBoundingClientRect();
    l.set((M - v.left) / v.width * 2 - 1, -(R - v.top) / v.height * 2 + 1), u.setFromCamera(l, r);
    const j = u.intersectObject(f.root, !0);
    for (const D of j) {
      let S = D.object, N = !0;
      for (; S; ) {
        if (!S.visible) {
          N = !1;
          break;
        }
        S = S.parent;
      }
      if (!(!N || D.object === f.halo || [...f.markers.values()].some((le) => D.object.parent === le))) {
        for (S = D.object; S; ) {
          if (S.userData.itemId) return {
            type: "pick",
            id: S.userData.itemId
          };
          S = S.parent;
        }
        return null;
      }
    }
    return null;
  }
  function $e(M, R) {
    const v = ge(M, R);
    if (v?.type === "pick") return v;
    const j = _.domElement.getBoundingClientRect(), D = s.items.flatMap((S) => {
      const N = f.items.get(S.id);
      if (!N.visible) return [];
      const le = N.position.clone().project(r), Ie = j.left + (le.x + 1) * j.width / 2, Ae = j.top + (1 - le.y) * j.height / 2, Pe = Math.hypot(M - Ie, R - Ae);
      return Pe <= 22 ? [{
        id: S.id,
        x: Ie,
        y: Ae,
        distance: Pe
      }] : [];
    }).sort((S, N) => S.distance - N.distance);
    for (const S of D) {
      const N = ge(S.x, S.y);
      if (N?.type === "pick" && N.id === S.id) return N;
    }
    return v;
  }
  function fe(M) {
    r.zoom = Math.max(1, Math.min(1.8, r.zoom * M)), r.updateProjectionMatrix(), F();
  }
  function Se(M) {
    w = Math.max(-0.15, Math.min(1.05, w + M)), K(), F();
  }
  function Ee() {
    $ || ($ = !0, G(), k(), T.abort(), C?.disconnect(), L?.disconnect(), f.dispose(), E.shadow.dispose(), i.clear(), _?.dispose(), _?.forceContextLoss(), _?.domElement.remove());
  }
  try {
    _ = new lt({
      alpha: !0,
      antialias: !0,
      powerPreference: "low-power"
    }), _.setPixelRatio(Math.min(window.devicePixelRatio, 2)), _.setClearColor(new ct("#e6f1ed"), 0), _.outputColorSpace = nt, _.toneMapping = 7, _.shadowMap.enabled = !0, _.shadowMap.type = 2, _.debug.onShaderError = () => q("graphicsFailed");
    const M = _.domElement;
    M.setAttribute("aria-label", o.sceneLabel), M.setAttribute("role", "img"), M.tabIndex = 0, e.prepend(M);
    const R = { signal: T.signal };
    M.addEventListener("webglcontextlost", (v) => {
      v.preventDefault(), q("contextLost");
    }, R), M.addEventListener("pointerdown", (v) => {
      v.button !== 0 || B || b || (M.setPointerCapture(v.pointerId), B = {
        id: v.pointerId,
        x: v.clientX,
        y: v.clientY,
        yaw: w,
        dragged: !1
      });
    }, R), M.addEventListener("pointermove", (v) => {
      if (!B) {
        if (b || v.pointerType !== "mouse") return;
        const S = $e(v.clientX, v.clientY), N = S?.type === "pick" ? S.id : null;
        M.style.cursor = S ? "pointer" : "grab", Y !== N && (Y = N, F());
        return;
      }
      if (B.id !== v.pointerId) return;
      const j = v.clientX - B.x, D = v.clientY - B.y;
      Math.hypot(j, D) > 7 && (B.dragged = !0), B.dragged && (w = Math.max(-0.15, Math.min(1.05, B.yaw - j / Z * 2.4)), K(), F());
    }, R), M.addEventListener("pointerleave", () => {
      Y && (Y = null, F());
    }, R), M.addEventListener("pointerup", (v) => {
      if (!B || B.id !== v.pointerId) return;
      const j = B.dragged;
      if (B = null, M.hasPointerCapture(v.pointerId) && M.releasePointerCapture(v.pointerId), !j && !b) {
        const D = $e(v.clientX, v.clientY);
        D && n.action(D);
      }
    }, R);
    for (const v of ["pointercancel", "lostpointercapture"]) M.addEventListener(v, () => {
      B = null;
    }, R);
    return M.addEventListener("keydown", (v) => {
      v.key === "ArrowLeft" || v.key === "ArrowRight" ? (v.preventDefault(), Se(v.key === "ArrowLeft" ? -0.14 : 0.14)) : v.key === "Home" ? (v.preventDefault(), w = ke, r.zoom = 1, K(), F()) : v.key === "+" || v.key === "=" ? (v.preventDefault(), fe(1.15)) : v.key === "-" && (v.preventDefault(), fe(1 / 1.15));
    }, R), M.addEventListener("wheel", (v) => {
      v.preventDefault(), fe(v.deltaY < 0 ? 1.1 : 1 / 1.1);
    }, {
      ...R,
      passive: !1
    }), document.addEventListener("visibilitychange", () => {
      document.hidden ? (G(), k(), B = null) : F();
    }, R), Q.addEventListener("change", () => {
      k(), F();
    }, R), C = new ResizeObserver(() => {
      try {
        ae();
      } catch (v) {
        q("graphicsFailed", v);
      }
    }), C.observe(e), L = new IntersectionObserver((v) => {
      U = v[0].isIntersecting, U ? F() : (G(), k());
    }), L.observe(e), c(), ae(), {
      dispose: Ee,
      rotate: Se,
      zoom: fe,
      visibleItems() {
        const v = _.domElement.getBoundingClientRect();
        return s.items.filter((j) => {
          const D = f.items.get(j.id);
          if (!D.visible) return !1;
          const S = D.position.clone().project(r);
          if (Math.abs(S.x) > 1 || Math.abs(S.y) > 1) return !1;
          const N = ge(v.left + (S.x + 1) * v.width / 2, v.top + (1 - S.y) * v.height / 2);
          return N?.type === "pick" && N.id === j.id;
        }).map((j) => j.id);
      },
      resetView() {
        w = ke, r.zoom = 1, K(), F();
      },
      focus(v) {
        Y = v, F();
      },
      active(v) {
        X = v, v ? ae() : (G(), k(), B = null);
      },
      update(v, j, D = !1) {
        return k(), V = v, c(), Q.matches || !X || document.hidden || O || !U || !j ? (F(), Promise.resolve()) : new Promise((S) => {
          b = {
            started: performance.now(),
            duration: D ? Pt : 300,
            action: j,
            packed: D,
            done: S
          }, F();
        });
      }
    };
  } catch (M) {
    throw Ee(), M;
  }
}
var Rt = {
  key: 0,
  fill: "currentColor"
}, zt = { key: 1 }, Ot = { key: 2 }, Bt = { key: 3 }, Ft = { key: 4 }, jt = { key: 5 }, Nt = { key: 6 }, Vt = { key: 7 }, Dt = /* @__PURE__ */ Me({
  __name: "ItemIcon",
  props: { kind: {} },
  setup(e) {
    return (s, a) => (h(), y("svg", {
      viewBox: "0 0 48 48",
      "aria-hidden": "true",
      style: xe({ color: t(He)[e.kind] }),
      class: "moving-item-icon"
    }, [e.kind === "cat" ? (h(), y("g", Rt, [...a[0] || (a[0] = [se('<path d="M11 23 10 6 22 15 29 14 39 6 38 26Z"></path><ellipse cx="24" cy="31" rx="14" ry="12"></ellipse><ellipse cx="24" cy="23" rx="17" ry="13"></ellipse><path d="M38 33q10 5 3 10" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"></path><g fill="#354353"><circle cx="18" cy="23" r="1.6"></circle><circle cx="30" cy="23" r="1.6"></circle></g><path d="m22 27 2 2 2-2" fill="#ce778a"></path>', 6)])])) : e.kind === "toast" ? (h(), y("g", zt, [...a[1] || (a[1] = [se('<path d="M9 17C1 2 47 2 39 17v24H9Z" fill="currentColor"></path><path d="M14 19C8 8 40 8 34 19v17H14Z" fill="#ffe9b9"></path><rect x="19" y="18" width="12" height="9" rx="2" fill="#f8ca54" transform="rotate(10 25 22)"></rect><g fill="#354353"><circle cx="19" cy="31" r="1.5"></circle><circle cx="29" cy="31" r="1.5"></circle></g>', 4)])])) : e.kind === "ufo" ? (h(), y("g", Ot, [...a[2] || (a[2] = [se('<ellipse cx="24" cy="29" rx="22" ry="8" fill="currentColor"></ellipse><path d="M12 27v-5a12 12 0 0 1 24 0v5Z" fill="#b0e4e8"></path><path d="M5 28q19 10 38 0" stroke="#eee4a6" stroke-width="3" fill="none"></path><g fill="#354353"><circle cx="20" cy="23" r="1.5"></circle><circle cx="28" cy="23" r="1.5"></circle></g>', 4)])])) : e.kind === "cup" ? (h(), y("g", Bt, [...a[3] || (a[3] = [se('<path d="M33 17h5c11 0 9 16-4 16" fill="none" stroke="currentColor" stroke-width="5"></path><path d="M7 13h29l-3 24q-12 8-23 0Z" fill="currentColor"></path><ellipse cx="21.5" cy="13" rx="14.5" ry="5" fill="#e7d9fb"></ellipse><ellipse cx="21.5" cy="13" rx="10" ry="3" fill="#806254"></ellipse><g fill="#354353"><circle cx="16" cy="27" r="1.5"></circle><circle cx="26" cy="27" r="1.5"></circle></g>', 5)])])) : e.kind === "duck" ? (h(), y("g", Ft, [...a[4] || (a[4] = [se('<ellipse cx="24" cy="32" rx="18" ry="11" fill="currentColor"></ellipse><circle cx="25" cy="17" r="12" fill="currentColor"></circle><ellipse cx="26" cy="23" rx="8" ry="4" fill="#f49c44"></ellipse><g fill="#354353"><circle cx="20" cy="16" r="1.5"></circle><circle cx="30" cy="16" r="1.5"></circle></g><path d="M11 30q3 8 9 4" fill="none" stroke="#eba93b" stroke-width="2"></path>', 5)])])) : e.kind === "plant" ? (h(), y("g", jt, [...a[5] || (a[5] = [
      d("path", {
        d: "M24 33V10",
        stroke: "currentColor",
        "stroke-width": "3"
      }, null, -1),
      d("path", {
        d: "M23 23C4 22 7 5 23 18 18 1 36 0 27 17 43 4 45 25 26 26Z",
        fill: "currentColor"
      }, null, -1),
      d("path", {
        d: "m12 29 3 15h19l3-15Z",
        fill: "#efa08e"
      }, null, -1),
      d("rect", {
        x: "10",
        y: "27",
        width: "28",
        height: "6",
        rx: "2",
        fill: "#ffc1ac"
      }, null, -1)
    ])])) : e.kind === "potion" ? (h(), y("g", Nt, [...a[6] || (a[6] = [
      d("path", {
        d: "M19 9h10v10c19 14 8 25-5 25S0 33 19 19Z",
        fill: "currentColor"
      }, null, -1),
      d("rect", {
        x: "18",
        y: "4",
        width: "12",
        height: "8",
        rx: "2",
        fill: "#cfa678"
      }, null, -1),
      d("rect", {
        x: "17",
        y: "26",
        width: "15",
        height: "11",
        rx: "3",
        fill: "#fff0bc",
        transform: "rotate(10 24 31)"
      }, null, -1),
      d("path", {
        d: "m15 23-3 6",
        stroke: "#e1c8ff",
        "stroke-width": "3",
        "stroke-linecap": "round"
      }, null, -1)
    ])])) : (h(), y("g", Vt, [...a[7] || (a[7] = [d("path", {
      d: "m24 2 7 14 15 3-11 12 2 15-13-7-13 7 2-15L2 19l15-3Z",
      fill: "currentColor",
      stroke: "#eab655",
      "stroke-width": "1",
      "stroke-linejoin": "round"
    }, null, -1), d("g", { fill: "#354353" }, [d("circle", {
      cx: "19",
      cy: "25",
      r: "1.6"
    }), d("circle", {
      cx: "29",
      cy: "25",
      r: "1.6"
    })], -1)])]))], 4));
  }
}), oe = Dt, Gt = [
  "aria-label",
  "data-status",
  "data-tier",
  "data-level",
  "data-run",
  "aria-busy"
], qt = { class: "moving-heading" }, Ht = ["aria-label"], Zt = { class: "moving-room-number" }, Yt = {
  key: 0,
  class: "moving-tier"
}, Ut = ["aria-label"], Wt = { class: "moving-stage" }, Xt = {
  key: 0,
  class: "moving-view-tools"
}, Kt = { class: "moving-rotate" }, Jt = ["aria-label"], Qt = ["aria-label"], ea = ["aria-label"], ta = ["aria-label"], aa = ["aria-label"], na = {
  key: 0,
  class: "moving-gesture-hint"
}, ia = {
  key: 1,
  class: "moving-scene-error",
  role: "alert"
}, oa = {
  key: 2,
  class: "moving-result",
  "aria-live": "polite"
}, la = {
  class: "moving-result-mark",
  "aria-hidden": "true"
}, ra = ["data-next-tier"], sa = { class: "moving-dock" }, da = { class: "moving-dock-label" }, ca = {
  role: "status",
  "aria-live": "polite"
}, ua = ["aria-label"], fa = ["aria-label"], va = {
  key: 1,
  "aria-hidden": "true"
}, pa = { class: "moving-tools" }, ba = ["disabled"], ma = ["disabled"], ga = ["disabled"], ha = ["disabled"], ya = ["disabled", "aria-pressed"], ka = { id: "moving-board-dialog" }, wa = ["aria-label"], xa = { class: "moving-rules" }, Ma = {
  key: 0,
  class: "moving-session-note"
}, Ca = { class: "moving-session-note" }, _a = [
  "data-item-id",
  "disabled",
  "aria-label",
  "onFocus",
  "onClick"
], $a = ["aria-label"], Sa = /* @__PURE__ */ Me({
  __name: "MovingBoard",
  props: {
    active: {},
    board: {},
    disabled: { type: Boolean },
    award: {},
    challenge: {},
    soundEnabled: { type: Boolean },
    setSoundEnabled: { type: Function }
  },
  emits: [
    "pick",
    "undo",
    "restart",
    "abandon",
    "chapters",
    "next",
    "animation"
  ],
  setup(e, { emit: s }) {
    const a = e, n = s, i = J(() => a.active.level), r = J(() => a.active.stage === null), u = J(() => a.active.abandoned ? "abandoned" : me(a.board)), l = J(() => qe(i.value, a.board)), p = W(!1), f = W(!1), g = xt(), P = J(() => a.soundEnabled && g.available), T = W(o.description), _ = W(""), C = W(null), L = W(null), $ = W(null), O = we([]), X = J(() => Array.from({ length: 7 }, (x, c) => i.value.items.find((k) => k.id === a.board.tray[c]))), U = J(() => i.value.stacks.map((x) => x.map((c) => i.value.items.find((k) => k.id === c)).filter((c) => a.board.remaining.includes(c.id))));
    let I, Z = !1, z = !0, w = 0, A = null;
    Ve(L, () => {
      $.value = null;
    });
    function V(x) {
      p.value = x, n("animation", x);
    }
    function Y() {
      if (I?.dispose(), I = void 0, _.value = "", !!C.value)
        try {
          I = Lt(C.value, i.value, a.board, {
            action: B,
            error: (x, c) => {
              _.value = o[x], V(!1), c && console.error(o[x], c);
            }
          }), I.active(z);
        } catch (x) {
          _.value = o.graphicsFailed, console.error(o.graphicsFailed, x);
        }
    }
    function B(x) {
      if (a.disabled || p.value || _.value || !z) return;
      const c = i.value.items.find((k) => k.id === x.id);
      if (!c || !_e(a.board, c)) {
        T.value = We.blocked, c?.above && I?.focus(c.above);
        return;
      }
      $.value = null, A = P.value ? g.setEnabled(!0).catch((k) => (T.value = o.soundFailed, console.error(o.soundFailed, k), !1)) : null, n("pick", x.id);
    }
    Te(() => a.active.id, async () => {
      w++, A = null, V(!1), T.value = o.description, await Ye(), Y();
    }), Te(() => a.board, async (x, c) => {
      if (!Z || !c || c === x) return;
      const k = ++w, G = c.remaining.filter((F) => !x.remaining.includes(F)), q = G.length === 1 && x.remaining.length === c.remaining.length - 1, K = q ? i.value.items.find((F) => F.id === G[0]) : void 0, ee = q && c.tray.length + 1 - x.tray.length === 3;
      if (K) {
        if (T.value = ee ? o.packed(de[K.kind]) : o.selected(de[K.kind]), z) {
          const F = A;
          A = null, F ? F.then((ae) => {
            ae && z && k === w && g.play(ee);
          }).catch((ae) => {
            T.value = o.soundFailed, console.error(o.soundFailed, ae);
          }) : g.play(ee);
        }
      } else T.value = o.description;
      V(!0), await I?.update(x, K ? {
        type: "pick",
        id: K.id
      } : void 0, ee), k === w && V(!1);
    });
    async function Q() {
      if (f.value) return;
      f.value = !0;
      const x = !P.value;
      let c = !1;
      try {
        if (x && !await g.setEnabled(!0)) return;
        c = !0, await a.setSoundEnabled(x) ? x ? g.play(!0) : await g.setEnabled(!1) : x && await g.setEnabled(!1);
      } catch (k) {
        x && await g.setEnabled(!1).catch((q) => console.error(o.soundFailed, q));
        const G = c ? o.soundSaveFailed : o.soundFailed;
        T.value = G, console.error(G, k);
      } finally {
        f.value = !1;
      }
    }
    async function b() {
      try {
        await g.setEnabled(!1);
      } catch (x) {
        T.value = o.soundFailed, console.error(o.soundFailed, x);
      }
    }
    function E() {
      O.value = I?.visibleItems() ?? [], $.value = "items";
    }
    return Be(() => {
      Z = !0, Y();
    }), Oe(() => {
      z = !0, I?.active(!0);
    }), Ze(() => {
      z = !1, A = null, $.value = null, I?.active(!1), b();
    }), Fe(() => {
      w++, Z = !1, I?.dispose(), V(!1), g.dispose().catch((x) => console.error(o.soundFailed, x));
    }), (x, c) => (h(), y("section", {
      class: ue(["moving-room", `moving-${i.value.id}`]),
      "aria-label": t(o).name,
      "data-status": u.value,
      "data-tier": e.challenge.activeTier,
      "data-level": i.value.key,
      "data-run": e.active.id,
      "aria-busy": e.disabled || p.value
    }, [
      d("header", qt, [d("button", {
        type: "button",
        class: "moving-location",
        "aria-label": t(o).backChapters,
        onClick: c[0] || (c[0] = (k) => n("chapters"))
      }, [
        d("span", Zt, m(r.value ? "Ⅱ" : String(e.active.stage + 1).padStart(2, "0")), 1),
        d("span", null, [d("strong", null, [ne(m(t(ve)[i.value.id]), 1), r.value ? (h(), y("span", Yt, m(t(De)[e.challenge.activeTier]), 1)) : H("", !0)]), d("small", null, [r.value ? H("", !0) : (h(), y(te, { key: 0 }, [ne(m(t(o).stage(e.active.stage)) + " · ", 1)], 64)), ne(m(t(o).progress(l.value, i.value.items.length / t(3))), 1)])]),
        c[18] || (c[18] = d("span", { "aria-hidden": "true" }, "⌄", -1))
      ], 8, Ht), d("button", {
        type: "button",
        class: "moving-icon-button",
        "aria-label": t(o).rules,
        onClick: c[1] || (c[1] = (k) => $.value = "rules")
      }, "?", 8, Ut)]),
      d("div", Wt, [
        d("div", {
          ref_key: "host",
          ref: C,
          class: "moving-canvas"
        }, null, 512),
        _.value ? H("", !0) : (h(), y("div", Xt, [d("div", Kt, [
          d("button", {
            type: "button",
            "aria-label": t(o).zoomOut,
            onClick: c[2] || (c[2] = (k) => t(I)?.zoom(1 / 1.2))
          }, "−", 8, Jt),
          d("button", {
            type: "button",
            "aria-label": t(o).rotateLeft,
            onClick: c[3] || (c[3] = (k) => t(I)?.rotate(-0.18))
          }, "↶", 8, Qt),
          d("button", {
            type: "button",
            "aria-label": t(o).resetView,
            onClick: c[4] || (c[4] = (k) => t(I)?.resetView())
          }, "⌂", 8, ea),
          d("button", {
            type: "button",
            "aria-label": t(o).rotateRight,
            onClick: c[5] || (c[5] = (k) => t(I)?.rotate(0.18))
          }, "↷", 8, ta),
          d("button", {
            type: "button",
            "aria-label": t(o).zoomIn,
            onClick: c[6] || (c[6] = (k) => t(I)?.zoom(1.2))
          }, "+", 8, aa)
        ]), u.value === "playing" ? (h(), y("span", na, m(t(o).rotateHint), 1)) : H("", !0)])),
        _.value ? (h(), y("section", ia, [
          d("p", null, m(_.value), 1),
          d("button", {
            type: "button",
            class: "moving-primary",
            onClick: Y
          }, m(t(o).retryGraphics), 1),
          d("button", {
            type: "button",
            class: "moving-plain",
            onClick: c[7] || (c[7] = (k) => n("chapters"))
          }, m(t(o).backChapters), 1)
        ])) : u.value !== "playing" && !p.value && !e.disabled ? (h(), y("section", oa, [
          d("span", la, m(u.value === "won" ? "✓" : "…"), 1),
          d("h2", null, m(u.value === "won" ? t(o).won : u.value === "lost" ? t(o).lost : t(o).abandoned), 1),
          d("p", null, m(u.value === "won" ? e.award ? t(o).reward(e.award) : t(o).earned : r.value ? t(o).paidLost : t(o).lostBody), 1),
          r.value ? (h(), y("p", {
            key: 0,
            "data-next-tier": e.challenge.tier
          }, m(t(o).nextTier(e.challenge.tier)), 9, ra)) : H("", !0),
          u.value === "won" ? (h(), y("button", {
            key: 1,
            type: "button",
            class: "moving-primary",
            onClick: c[8] || (c[8] = (k) => n("next"))
          }, m(r.value ? t(o).admission : e.active.stage < t(be).length - 1 ? t(o).next : t(o).chapterComplete), 1)) : r.value ? (h(), y("button", {
            key: 3,
            type: "button",
            class: "moving-primary",
            onClick: c[10] || (c[10] = (k) => n("next"))
          }, m(t(o).admission), 1)) : (h(), y("button", {
            key: 2,
            type: "button",
            class: "moving-primary",
            onClick: c[9] || (c[9] = (k) => n("undo"))
          }, m(t(o).undo), 1)),
          d("button", {
            type: "button",
            class: "moving-plain",
            onClick: c[11] || (c[11] = (k) => n("chapters"))
          }, m(t(o).backChapters), 1)
        ])) : H("", !0)
      ]),
      d("footer", sa, [
        d("div", da, [d("strong", null, [ne(m(t(o).tray) + " ", 1), d("small", null, m(t(o).slots(e.board.tray.length, t(7))), 1)]), d("p", ca, m(T.value), 1)]),
        d("ol", {
          class: ue(["moving-tray", { "is-full": u.value === "lost" }]),
          "aria-label": t(o).tray,
          style: xe({ "--moving-capacity": t(7) })
        }, [(h(!0), y(te, null, ce(X.value, (k, G) => (h(), y("li", {
          key: G,
          "aria-label": t(o).slot(k ? t(de)[k.kind] : t(o).emptySlot, G),
          class: ue({ "is-filled": k })
        }, [k ? (h(), je(oe, {
          key: 0,
          kind: k.kind
        }, null, 8, ["kind"])) : (h(), y("span", va, "·"))], 10, fa))), 128))], 14, ua),
        d("div", pa, [
          r.value ? H("", !0) : (h(), y("button", {
            key: 0,
            type: "button",
            disabled: e.disabled || p.value || !e.active.moves.length,
            onClick: c[12] || (c[12] = (k) => n("undo"))
          }, "↩ " + m(t(o).undo), 9, ba)),
          d("button", {
            type: "button",
            disabled: e.disabled || p.value || !!_.value || u.value !== "playing",
            onClick: E
          }, "⌕ " + m(t(o).pickList), 9, ma),
          r.value ? (h(), y("button", {
            key: 2,
            type: "button",
            disabled: e.disabled || p.value || u.value !== "playing",
            onClick: c[14] || (c[14] = (k) => n("abandon"))
          }, m(t(o).abandon), 9, ha)) : (h(), y("button", {
            key: 1,
            type: "button",
            disabled: e.disabled || p.value,
            onClick: c[13] || (c[13] = (k) => n("restart"))
          }, "↻ " + m(t(o).restart), 9, ga)),
          d("button", {
            type: "button",
            disabled: e.disabled || f.value || !t(g).available,
            "aria-pressed": P.value,
            onClick: Q
          }, m(P.value ? t(o).soundOn : t(o).soundOff), 9, ya)
        ])
      ]),
      $.value ? (h(), y("div", {
        key: 0,
        class: "moving-modal-backdrop",
        onClick: c[17] || (c[17] = Ne((k) => $.value = null, ["self"]))
      }, [d("section", {
        ref_key: "dialog",
        ref: L,
        class: "moving-modal",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "moving-board-dialog",
        tabindex: "-1"
      }, [d("header", null, [d("h2", ka, m($.value === "rules" ? t(o).rules : t(o).pickListTitle), 1), d("button", {
        type: "button",
        "aria-label": t(o).close,
        onClick: c[15] || (c[15] = (k) => $.value = null)
      }, "×", 8, wa)]), $.value === "rules" ? (h(), y(te, { key: 0 }, [
        d("ol", xa, [(h(!0), y(te, null, ce(t(o).instructions, (k) => (h(), y("li", { key: k }, m(k), 1))), 128))]),
        r.value ? (h(), y("p", Ma, m(t(o).admissionBody), 1)) : H("", !0),
        d("p", Ca, m(t(o).sessionNote), 1)
      ], 64)) : (h(), y("div", {
        key: 1,
        class: "moving-stack-overview",
        style: xe({ "--stack-count": U.value.length })
      }, [(h(!0), y(te, null, ce(U.value, (k, G) => (h(), y("section", { key: G }, [d("h3", null, m(t(o).shelf(G)), 1), (h(!0), y(te, null, ce(k, (q, K) => (h(), y(te, { key: q.id }, [K === 0 ? (h(), y("button", {
        key: 0,
        type: "button",
        "data-item-id": q.id,
        disabled: !O.value.includes(q.id),
        "aria-label": t(o).item(t(de)[q.kind], G + 1),
        onFocus: (ee) => t(I)?.focus(q.id),
        onBlur: c[16] || (c[16] = (ee) => t(I)?.focus(null)),
        onClick: (ee) => B({
          type: "pick",
          id: q.id
        })
      }, [re(oe, { kind: q.kind }, null, 8, ["kind"]), d("span", null, m(t(o).available), 1)], 40, _a)) : (h(), y("div", {
        key: 1,
        "aria-label": `${t(de)[q.kind]} · ${t(o).underneath}`
      }, [re(oe, { kind: q.kind }, null, 8, ["kind"])], 8, $a))], 64))), 128))]))), 128))], 4))], 512)])) : H("", !0)
    ], 10, Gt));
  }
}), Ea = Sa, Ia = {
  key: 0,
  class: "moving-account"
}, Aa = { role: "status" }, Pa = {
  key: 1,
  class: "moving-save-notice",
  role: "alert"
}, Ta = ["disabled"], La = ["disabled"], Ra = {
  key: 2,
  class: "moving-loading",
  role: "status"
}, za = ["aria-label"], Oa = { class: "moving-chapter-card chapter-home" }, Ba = {
  class: "moving-chapter-art",
  "aria-hidden": "true"
}, Fa = { class: "moving-chapter-title" }, ja = { class: "moving-stage-path" }, Na = [
  "data-stage",
  "aria-label",
  "disabled",
  "onClick"
], Va = { class: "moving-chapter-card chapter-witch" }, Da = {
  class: "moving-chapter-art",
  "aria-hidden": "true"
}, Ga = { class: "moving-chapter-title" }, qa = ["data-tier"], Ha = {
  key: 0,
  class: "moving-session-note"
}, Za = ["disabled"], Ya = {
  key: 1,
  class: "moving-session-note"
}, Ua = { class: "moving-session-note" }, Wa = {
  key: 5,
  class: "moving-generating",
  role: "status"
}, Xa = { id: "moving-confirm-title" }, Ka = ["aria-label"], Ja = ["data-tier"], Qa = { class: "moving-confirm-actions" }, en = ["disabled"], tn = /* @__PURE__ */ Me({
  __name: "MovingRoom",
  props: {
    bridge: {},
    chatIdentity: {},
    generationActive: { type: Boolean }
  },
  setup(e) {
    const s = e, a = wt(s.bridge, s.chatIdentity), { view: n, busy: i, blocked: r, notice: u, generating: l, failed: p } = a, f = W("chapters"), g = W(null), P = W(null), T = W(!1);
    let _ = !1;
    const C = J(() => n.value?.active ?? null), L = J(() => !!C.value && C.value.stage === null && ze(C.value) === "playing"), $ = J(() => n.value?.completed.length === be.length), O = J(() => r.value || T.value || s.generationActive);
    Ve(P, () => {
      g.value = null;
    }), Ue(() => f.value !== "board" ? !1 : (f.value = "chapters", !0));
    async function X(z) {
      await a.act({
        type: "start",
        stage: z
      }) && (f.value = "board");
    }
    async function U() {
      const z = g.value;
      z && (g.value = null, await a.act({ type: z === "admission" ? "challenge" : z }) && (f.value = "board"));
    }
    function I() {
      L.value ? f.value = "board" : g.value = "admission";
    }
    async function Z() {
      C.value && (C.value.stage !== null && C.value.stage < be.length - 1 ? await X(C.value.stage + 1) : I());
    }
    return Be(async () => {
      await a.read(), C.value && (f.value = "board"), _ = !0;
    }), Oe(() => {
      _ && a.read();
    }), Fe(a.dispose), (z, w) => (h(), y("div", { class: ue(["moving-app", { "moving-app-board": f.value === "board" }]) }, [
      t(n) ? (h(), y("div", Ia, [d("span", null, m(t(o).balance(t(n).balance)), 1), d("small", Aa, m(e.generationActive ? t(o).storyBusy : t(i) ? t(l) ? t(o).generating : t(o).saving : t(n).writeState === "ready" && !t(p) ? t(o).saved : ""), 1)])) : H("", !0),
      t(u) || t(p) || t(n)?.pending || t(n)?.writeState === "failed" ? (h(), y("aside", Pa, [
        d("p", null, m(t(u) || t(o).saveProblem), 1),
        d("button", {
          type: "button",
          disabled: t(i),
          onClick: w[0] || (w[0] = (...A) => t(a).recover && t(a).recover(...A))
        }, m(t(o).recover), 9, Ta),
        t(n)?.writeState === "conflict" ? (h(), y("button", {
          key: 0,
          type: "button",
          disabled: t(i),
          onClick: w[1] || (w[1] = (...A) => t(a).read && t(a).read(...A))
        }, m(t(o).refresh), 9, La)) : H("", !0)
      ])) : H("", !0),
      t(n) ? f.value === "board" && C.value && t(n).board ? (h(), je(Ea, {
        key: C.value.id,
        active: C.value,
        board: t(n).board,
        disabled: t(r) || e.generationActive,
        award: t(n).award,
        challenge: t(n).challenge,
        "sound-enabled": t(n).soundEnabled,
        "set-sound-enabled": t(a).setSoundEnabled,
        onPick: w[2] || (w[2] = (A) => t(a).act({
          type: "pick",
          id: A
        })),
        onUndo: w[3] || (w[3] = (A) => t(a).act({ type: "undo" })),
        onRestart: w[4] || (w[4] = (A) => g.value = "restart"),
        onAbandon: w[5] || (w[5] = (A) => g.value = "abandon"),
        onChapters: w[6] || (w[6] = (A) => f.value = "chapters"),
        onNext: Z,
        onAnimation: w[7] || (w[7] = (A) => T.value = A)
      }, null, 8, [
        "active",
        "board",
        "disabled",
        "award",
        "challenge",
        "sound-enabled",
        "set-sound-enabled"
      ])) : t(n) ? (h(), y("section", {
        key: 4,
        class: "moving-chapters moving-room",
        "aria-label": t(o).chapters
      }, [
        C.value && t(ze)(C.value) === "playing" ? (h(), y("button", {
          key: 0,
          type: "button",
          class: "moving-resume",
          onClick: w[8] || (w[8] = (A) => f.value = "board")
        }, [d("span", null, m(t(o).resume) + " · " + m(t(ve)[C.value.level.id]), 1), w[12] || (w[12] = d("span", { "aria-hidden": "true" }, "→", -1))])) : H("", !0),
        d("article", Oa, [
          d("div", Ba, [re(oe, { kind: "cat" }), re(oe, { kind: "plant" })]),
          d("div", Fa, [
            d("small", null, m(t(o).chapterOne), 1),
            d("h2", null, m(t(ve).weekend), 1),
            d("p", null, m(t(o).firstReward), 1)
          ]),
          d("ol", ja, [(h(!0), y(te, null, ce(t(be), (A, V) => (h(), y("li", { key: A.key }, [d("button", {
            type: "button",
            "data-stage": V,
            "aria-label": t(o).stage(V),
            disabled: O.value || L.value || V > t(n).completed.length,
            class: ue({ "is-cleared": t(n).completed.includes(V) }),
            onClick: (Y) => X(V)
          }, [d("strong", null, m(V + 1), 1), d("small", null, m(t(n).completed.includes(V) ? "✓" : "+" + t(he).chapterReward), 1)], 10, Na)]))), 128))])
        ]),
        d("article", Va, [
          d("div", Da, [re(oe, { kind: "potion" }), re(oe, { kind: "star" })]),
          d("div", Ga, [
            d("small", null, [ne(m(t(o).chapterTwo) + " · ", 1), d("span", { "data-tier": t(n).challenge.tier }, m(t(De)[t(n).challenge.tier]), 9, qa)]),
            d("h2", null, m(t(ve).witch), 1),
            d("p", null, m(t(o).challengeTerms), 1)
          ]),
          $.value ? (h(), y("p", Ha, m(t(o).tierProgress(t(n).challenge)), 1)) : H("", !0),
          d("button", {
            type: "button",
            class: "moving-primary",
            disabled: O.value || !$.value || !L.value && t(n).balance < t(he).challengeFee,
            onClick: I
          }, m(L.value ? t(o).resume : $.value ? t(o).admission : t(o).challengeLocked), 9, Za),
          $.value && !L.value && t(n).balance < t(he).challengeFee ? (h(), y("p", Ya, m(t(o).noFunds), 1)) : H("", !0)
        ]),
        d("p", Ua, m(t(o).sessionNote), 1)
      ], 8, za)) : H("", !0) : (h(), y("p", Ra, m(t(o).loading), 1)),
      t(l) ? (h(), y("div", Wa, m(t(o).generating), 1)) : H("", !0),
      g.value ? (h(), y("div", {
        key: 6,
        class: "moving-modal-backdrop moving-room-theme",
        onClick: w[11] || (w[11] = Ne((A) => g.value = null, ["self"]))
      }, [d("section", {
        ref_key: "dialog",
        ref: P,
        class: "moving-modal",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "moving-confirm-title",
        tabindex: "-1"
      }, [
        d("header", null, [d("h2", Xa, m(g.value === "admission" && t(n) ? t(o).admissionTitle(t(n).challenge.tier) : g.value === "abandon" ? t(o).abandonTitle : t(o).restartTitle), 1), d("button", {
          type: "button",
          "aria-label": t(o).close,
          onClick: w[9] || (w[9] = (A) => g.value = null)
        }, "×", 8, Ka)]),
        d("p", null, m(g.value === "admission" ? t(o).admissionBody : g.value === "abandon" ? t(o).abandonBody : t(o).discard), 1),
        g.value === "admission" && t(n) ? (h(), y("p", {
          key: 0,
          class: "moving-session-note",
          "data-tier": t(n).challenge.tier
        }, [
          ne(m(t(o).tierProgress(t(n).challenge)), 1),
          w[13] || (w[13] = d("br", null, null, -1)),
          ne(m(t(o).tierRule), 1)
        ], 8, Ja)) : H("", !0),
        d("div", Qa, [d("button", {
          type: "button",
          class: "moving-plain",
          onClick: w[10] || (w[10] = (A) => g.value = null)
        }, m(t(o).cancel), 1), d("button", {
          type: "button",
          class: "moving-primary",
          disabled: O.value,
          onClick: U
        }, m(g.value === "admission" ? t(o).admission : t(o).confirm), 9, en)])
      ], 512)])) : H("", !0)
    ], 2));
  }
}), sn = tn;
export {
  sn as default
};
