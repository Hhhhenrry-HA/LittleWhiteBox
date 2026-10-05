/* eslint-disable */
var c = {
  fur: "#fffaf2",
  feet: "#667486",
  eyes: "#354353",
  cheeks: "#f0afb0"
}, f = [
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
function l(e, t, i) {
  const a = e.group(t, i);
  for (const r of f) e.ball(a, [
    r.radius[0],
    r.radius[1],
    r.radius[2]
  ], c[r.color], [
    r.center[0],
    r.center[1],
    r.center[2]
  ]);
  return a;
}
var h = 1100;
function M(e) {
  return { walk(t, i) {
    if (!t.length) return !1;
    const a = Math.max(0, i / h), r = Math.min(t.length - 1, Math.floor(a)), n = t[Math.min(r + 1, t.length - 1)], s = t[r], o = Math.min(1, Math.max(0, (a - r - 0.16) / 0.84));
    return e.position.copy(s).lerp(n, o), e.position.y += Math.abs(Math.sin(o * Math.PI * 4)) * 0.045, e.rotation.y = Math.sign(n.x - s.x) * 0.4, r < t.length - 1;
  } };
}
function u(e) {
  return {
    pose(t, i, a, r = !1) {
      const n = r ? 0 : Math.sin(a / 520) * 0.012;
      e.position.copy(i), e.rotation.set(0, 0, 0), t === "reading" && (e.rotation.x = 0.2 + n), t === "reclining" && e.rotation.set(-0.23, -0.15, -0.14 + n), t === "sleeping" && (e.rotation.z = Math.PI / 2), t === "sipping" && (e.rotation.x = -0.08 + n), t === "looking" && (e.rotation.y = r ? 0.25 : Math.sin(a / 850) * 0.3), e.position.y += n;
    },
    reset() {
      e.rotation.set(0, 0, 0);
    }
  };
}
function y(e) {
  return { pose(t, i, a, r, n, s, o) {
    e.position.set(t, 0.48 + (n && !o ? Math.abs(Math.sin(r * 0.5)) * 0.075 : 0), i), e.rotation.set(s && !o ? 0.22 : 0, Math.PI / 2 - a, n && !o ? Math.sin(r * 0.5) * 0.07 : 0);
  } };
}
function g(e, t) {
  return {
    rest(i) {
      e.position.copy(t), e.rotation.y = 0, i.visible = !1;
    },
    carry(i, a, r) {
      const n = Math.max(0, (i - 0.2) / 0.8);
      r.visible = n > 0 && n < 0.92, e.position.x = t.x + n * (a - t.x), e.position.y = t.y + Math.abs(Math.sin(n * 22)) * 0.1, e.rotation.y = 0.6;
    }
  };
}
export {
  M as a,
  u as i,
  y as n,
  l as o,
  g as r,
  c as s,
  h as t
};
