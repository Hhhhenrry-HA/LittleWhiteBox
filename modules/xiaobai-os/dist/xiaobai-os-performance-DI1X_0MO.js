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
function h(e, r, i) {
  const a = e.group(r, i);
  for (const t of f) e.ball(a, [
    t.radius[0],
    t.radius[1],
    t.radius[2]
  ], c[t.color], [
    t.center[0],
    t.center[1],
    t.center[2]
  ]);
  return a;
}
var l = 1100;
function M(e) {
  return { walk(r, i) {
    if (!r.length) return !1;
    const a = Math.max(0, i / l), t = Math.min(r.length - 1, Math.floor(a)), n = r[Math.min(t + 1, r.length - 1)], o = r[t], s = Math.min(1, Math.max(0, (a - t - 0.16) / 0.84));
    return e.position.copy(o).lerp(n, s), e.position.y += Math.abs(Math.sin(s * Math.PI * 4)) * 0.045, e.rotation.y = Math.sign(n.x - o.x) * 0.4, t < r.length - 1;
  } };
}
function u(e) {
  return {
    pose(r, i, a, t = !1) {
      const n = t ? 0 : Math.sin(a / 520) * 0.012;
      e.position.copy(i), e.rotation.set(0, 0, 0), r === "reading" && (e.rotation.x = 0.2 + n), r === "reclining" && e.rotation.set(-0.23, -0.15, -0.14 + n), r === "sleeping" && (e.rotation.z = Math.PI / 2), r === "sipping" && (e.rotation.x = -0.08 + n), r === "looking" && (e.rotation.y = t ? 0.25 : Math.sin(a / 850) * 0.3), e.position.y += n;
    },
    reset() {
      e.rotation.set(0, 0, 0);
    }
  };
}
function y(e, r) {
  return {
    rest(i) {
      e.position.copy(r), e.rotation.y = 0, i.visible = !1;
    },
    carry(i, a, t) {
      const n = Math.max(0, (i - 0.2) / 0.8);
      t.visible = n > 0 && n < 0.92, e.position.x = r.x + n * (a - r.x), e.position.y = r.y + Math.abs(Math.sin(n * 22)) * 0.1, e.rotation.y = 0.6;
    }
  };
}
export {
  h as a,
  M as i,
  y as n,
  c as o,
  u as r,
  l as t
};
