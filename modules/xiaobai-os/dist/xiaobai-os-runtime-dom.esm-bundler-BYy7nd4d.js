/* eslint-disable */
import { B as C, F as Ot, G as V, H as Rt, I as U, J as Vt, K as $t, L as q, P as D, R as Tt, U as Kt, V as Et, W as Ft, X as z, Y as At, Z as j, g as Ht, h as Bt, i as k, n as Ut, q as w, t as qt, tt as zt, u as jt, z as Gt } from "./xiaobai-os-runtime-core.esm-bundler-Dmqi2Zbl.js";
var B = void 0, tt = typeof window < "u" && window.trustedTypes;
if (tt) try {
  B = /* @__PURE__ */ tt.createPolicy("vue", { createHTML: (t) => t });
} catch {
}
var wt = B ? (t) => B.createHTML(t) : (t) => t, Wt = "http://www.w3.org/2000/svg", Xt = "http://www.w3.org/1998/Math/MathML", g = typeof document < "u" ? document : null, et = g && /* @__PURE__ */ g.createElement("template"), Zt = {
  insert: (t, e, n) => {
    e.insertBefore(t, n || null);
  },
  remove: (t) => {
    const e = t.parentNode;
    e && e.removeChild(t);
  },
  createElement: (t, e, n, r) => {
    const i = e === "svg" ? g.createElementNS(Wt, t) : e === "mathml" ? g.createElementNS(Xt, t) : n ? g.createElement(t, { is: n }) : g.createElement(t);
    return t === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
  },
  createText: (t) => g.createTextNode(t),
  createComment: (t) => g.createComment(t),
  setText: (t, e) => {
    t.nodeValue = e;
  },
  setElementText: (t, e) => {
    t.textContent = e;
  },
  parentNode: (t) => t.parentNode,
  nextSibling: (t) => t.nextSibling,
  querySelector: (t) => g.querySelector(t),
  setScopeId(t, e) {
    t.setAttribute(e, "");
  },
  insertStaticContent(t, e, n, r, i, o) {
    const s = n ? n.previousSibling : e.lastChild;
    if (i && (i === o || i.nextSibling)) for (; e.insertBefore(i.cloneNode(!0), n), !(i === o || !(i = i.nextSibling)); )
      ;
    else {
      et.innerHTML = wt(r === "svg" ? `<svg>${t}</svg>` : r === "mathml" ? `<math>${t}</math>` : t);
      const a = et.content;
      if (r === "svg" || r === "mathml") {
        const f = a.firstChild;
        for (; f.firstChild; ) a.appendChild(f.firstChild);
        a.removeChild(f);
      }
      e.insertBefore(a, n);
    }
    return [s ? s.nextSibling : e.firstChild, n ? n.previousSibling : e.lastChild];
  }
}, S = "transition", y = "animation", P = /* @__PURE__ */ Symbol("_vtc"), _t = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: !0
  },
  duration: [
    String,
    Number,
    Object
  ],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
}, Jt = /* @__PURE__ */ U({}, Ut, _t), Yt = (t) => (t.displayName = "Transition", t.props = Jt, t), Me = /* @__PURE__ */ Yt((t, { slots: e }) => Bt(qt, Qt(t), e)), E = (t, e = []) => {
  C(t) ? t.forEach((n) => n(...e)) : t && t(...e);
}, nt = (t) => t ? C(t) ? t.some((e) => e.length > 1) : t.length > 1 : !1;
function Qt(t) {
  const e = {};
  for (const c in t) c in _t || (e[c] = t[c]);
  if (t.css === !1) return e;
  const { name: n = "v", type: r, duration: i, enterFromClass: o = `${n}-enter-from`, enterActiveClass: s = `${n}-enter-active`, enterToClass: a = `${n}-enter-to`, appearFromClass: f = o, appearActiveClass: l = s, appearToClass: u = a, leaveFromClass: p = `${n}-leave-from`, leaveActiveClass: m = `${n}-leave-active`, leaveToClass: _ = `${n}-leave-to` } = t, M = kt(i), yt = M && M[0], Lt = M && M[1], { onBeforeEnter: G, onEnter: W, onEnterCancelled: X, onLeave: Z, onLeaveCancelled: It, onBeforeAppear: Dt = G, onAppear: Pt = W, onAppearCancelled: xt = X } = e, $ = (c, d, T, O) => {
    c._enterCancelled = O, A(c, d ? u : a), A(c, d ? l : s), T && T();
  }, J = (c, d) => {
    c._isLeaving = !1, A(c, p), A(c, _), A(c, m), d && d();
  }, Y = (c) => (d, T) => {
    const O = c ? Pt : W, Q = () => $(d, c, T);
    E(O, [d, Q]), rt(() => {
      A(d, c ? f : o), h(d, c ? u : a), nt(O) || it(d, r, yt, Q);
    });
  };
  return U(e, {
    onBeforeEnter(c) {
      E(G, [c]), h(c, o), h(c, s);
    },
    onBeforeAppear(c) {
      E(Dt, [c]), h(c, f), h(c, l);
    },
    onEnter: Y(!1),
    onAppear: Y(!0),
    onLeave(c, d) {
      c._isLeaving = !0;
      const T = () => J(c, d);
      h(c, p), c._enterCancelled ? (h(c, m), at(c)) : (at(c), h(c, m)), rt(() => {
        c._isLeaving && (A(c, p), h(c, _), nt(Z) || it(c, r, Lt, T));
      }), E(Z, [c, T]);
    },
    onEnterCancelled(c) {
      $(c, !1, void 0, !0), E(X, [c]);
    },
    onAppearCancelled(c) {
      $(c, !0, void 0, !0), E(xt, [c]);
    },
    onLeaveCancelled(c) {
      J(c), E(It, [c]);
    }
  });
}
function kt(t) {
  if (t == null) return null;
  if (Kt(t)) return [K(t.enter), K(t.leave)];
  {
    const e = K(t);
    return [e, e];
  }
}
function K(t) {
  return zt(t);
}
function h(t, e) {
  e.split(/\s+/).forEach((n) => n && t.classList.add(n)), (t[P] || (t[P] = /* @__PURE__ */ new Set())).add(e);
}
function A(t, e) {
  e.split(/\s+/).forEach((r) => r && t.classList.remove(r));
  const n = t[P];
  n && (n.delete(e), n.size || (t[P] = void 0));
}
function rt(t) {
  requestAnimationFrame(() => {
    requestAnimationFrame(t);
  });
}
var te = 0;
function it(t, e, n, r) {
  const i = t._endId = ++te, o = () => {
    i === t._endId && r();
  };
  if (n != null) return setTimeout(o, n);
  const { type: s, timeout: a, propCount: f } = ee(t, e);
  if (!s) return r();
  const l = s + "end";
  let u = 0;
  const p = () => {
    t.removeEventListener(l, m), o();
  }, m = (_) => {
    _.target === t && ++u >= f && p();
  };
  setTimeout(() => {
    u < f && p();
  }, a + 1), t.addEventListener(l, m);
}
function ee(t, e) {
  const n = window.getComputedStyle(t), r = (M) => (n[M] || "").split(", "), i = r(`${S}Delay`), o = r(`${S}Duration`), s = st(i, o), a = r(`${y}Delay`), f = r(`${y}Duration`), l = st(a, f);
  let u = null, p = 0, m = 0;
  e === S ? s > 0 && (u = S, p = s, m = o.length) : e === y ? l > 0 && (u = y, p = l, m = f.length) : (p = Math.max(s, l), u = p > 0 ? s > l ? S : y : null, m = u ? u === S ? o.length : f.length : 0);
  const _ = u === S && /\b(?:transform|all)(?:,|$)/.test(r(`${S}Property`).toString());
  return {
    type: u,
    timeout: p,
    propCount: m,
    hasTransform: _
  };
}
function st(t, e) {
  for (; t.length < e.length; ) t = t.concat(t);
  return Math.max(...e.map((n, r) => ot(n) + ot(t[r])));
}
function ot(t) {
  return t === "auto" ? 0 : Number(t.slice(0, -1).replace(",", ".")) * 1e3;
}
function at(t) {
  return (t ? t.ownerDocument : document).body.offsetHeight;
}
function ne(t, e, n) {
  const r = t[P];
  r && (e = (e ? [e, ...r] : [...r]).join(" ")), e == null ? t.removeAttribute("class") : n ? t.setAttribute("class", e) : t.className = e;
}
var R = /* @__PURE__ */ Symbol("_vod"), Mt = /* @__PURE__ */ Symbol("_vsh"), Ne = {
  name: "show",
  beforeMount(t, { value: e }, { transition: n }) {
    t[R] = t.style.display === "none" ? "" : t.style.display, n && e ? n.beforeEnter(t) : L(t, e);
  },
  mounted(t, { value: e }, { transition: n }) {
    n && e && n.enter(t);
  },
  updated(t, { value: e, oldValue: n }, { transition: r }) {
    !e != !n && (r ? e ? (r.beforeEnter(t), L(t, !0), r.enter(t)) : r.leave(t, () => {
      L(t, !1);
    }) : L(t, e));
  },
  beforeUnmount(t, { value: e }) {
    L(t, e);
  }
};
function L(t, e) {
  t.style.display = e ? t[R] : "none", t[Mt] = !e;
}
var re = /* @__PURE__ */ Symbol(""), ie = /(?:^|;)\s*display\s*:/;
function se(t, e, n) {
  const r = t.style, i = w(n);
  let o = !1;
  if (n && !i) {
    if (e) if (w(e))
      for (const s of e.split(";")) {
        const a = s.slice(0, s.indexOf(":")).trim();
        n[a] == null && I(r, a, "");
      }
    else for (const s in e) n[s] == null && I(r, s, "");
    for (const s in n) {
      s === "display" && (o = !0);
      const a = n[s];
      a != null ? ae(t, s, !w(e) && e ? e[s] : void 0, a) || I(r, s, a) : I(r, s, "");
    }
  } else if (i) {
    if (e !== n) {
      const s = r[re];
      s && (n += ";" + s), r.cssText = n, o = ie.test(n);
    }
  } else e && t.removeAttribute("style");
  R in t && (t[R] = o ? r.display : "", t[Mt] && (r.display = "none"));
}
var ct = /\s*!important$/;
function I(t, e, n) {
  if (C(n)) n.forEach((r) => I(t, e, r));
  else if (n == null && (n = ""), e.startsWith("--")) t.setProperty(e, n);
  else {
    const r = oe(t, e);
    ct.test(n) ? t.setProperty(q(r), n.replace(ct, ""), "important") : t[r] = n;
  }
}
var ft = [
  "Webkit",
  "Moz",
  "ms"
], F = {};
function oe(t, e) {
  const n = F[e];
  if (n) return n;
  let r = D(e);
  if (r !== "filter" && r in t) return F[e] = r;
  r = Ot(r);
  for (let i = 0; i < ft.length; i++) {
    const o = ft[i] + r;
    if (o in t) return F[e] = o;
  }
  return e;
}
function ae(t, e, n, r) {
  return t.tagName === "TEXTAREA" && (e === "width" || e === "height") && w(r) && n === r;
}
var lt = "http://www.w3.org/1999/xlink";
function ut(t, e, n, r, i, o = $t(e)) {
  r && e.startsWith("xlink:") ? n == null ? t.removeAttributeNS(lt, e.slice(6, e.length)) : t.setAttributeNS(lt, e, n) : n == null || o && !Tt(n) ? t.removeAttribute(e) : t.setAttribute(e, o ? "" : Vt(n) ? String(n) : n);
}
function dt(t, e, n, r, i) {
  if (e === "innerHTML" || e === "textContent") {
    n != null && (t[e] = e === "innerHTML" ? wt(n) : n);
    return;
  }
  const o = t.tagName;
  if (e === "value" && o !== "PROGRESS" && !o.includes("-")) {
    const a = o === "OPTION" ? t.getAttribute("value") || "" : t.value, f = n == null ? t.type === "checkbox" ? "on" : "" : String(n);
    (a !== f || !("_value" in t)) && (t.value = f), n == null && t.removeAttribute(e), t._value = n;
    return;
  }
  let s = !1;
  if (n === "" || n == null) {
    const a = typeof t[e];
    a === "boolean" ? n = Tt(n) : n == null && a === "string" ? (n = "", s = !0) : a === "number" && (n = 0, s = !0);
  }
  try {
    t[e] = n;
  } catch {
  }
  s && t.removeAttribute(i || e);
}
function b(t, e, n, r) {
  t.addEventListener(e, n, r);
}
function ce(t, e, n, r) {
  t.removeEventListener(e, n, r);
}
var pt = /* @__PURE__ */ Symbol("_vei");
function fe(t, e, n, r, i = null) {
  const o = t[pt] || (t[pt] = {}), s = o[e];
  if (r && s) s.value = r;
  else {
    const [a, f] = le(e);
    r ? b(t, a, o[e] = pe(r, i), f) : s && (ce(t, a, s, f), o[e] = void 0);
  }
}
var mt = /(?:Once|Passive|Capture)$/;
function le(t) {
  let e;
  if (mt.test(t)) {
    e = {};
    let n;
    for (; n = t.match(mt); )
      t = t.slice(0, t.length - n[0].length), e[n[0].toLowerCase()] = !0;
  }
  return [t[2] === ":" ? t.slice(3) : q(t.slice(2)), e];
}
var H = 0, ue = /* @__PURE__ */ Promise.resolve(), de = () => H || (ue.then(() => H = 0), H = Date.now());
function pe(t, e) {
  const n = (r) => {
    if (!r._vts) r._vts = Date.now();
    else if (r._vts <= n.attached) return;
    const i = n.value;
    if (C(i)) {
      const o = r.stopImmediatePropagation;
      r.stopImmediatePropagation = () => {
        o.call(r), r._stopped = !0;
      };
      const s = i.slice(), a = [r];
      for (let f = 0; f < s.length && !r._stopped; f++) {
        const l = s[f];
        l && k(l, e, 5, a);
      }
    } else k(i, e, 5, [r]);
  };
  return n.value = t, n.attached = de(), n;
}
var ht = (t) => t.charCodeAt(0) === 111 && t.charCodeAt(1) === 110 && t.charCodeAt(2) > 96 && t.charCodeAt(2) < 123, me = (t, e, n, r, i, o) => {
  const s = i === "svg";
  e === "class" ? ne(t, r, s) : e === "style" ? se(t, n, r) : Ft(e) ? Rt(e) || fe(t, e, n, r, o) : (e[0] === "." ? (e = e.slice(1), !0) : e[0] === "^" ? (e = e.slice(1), !1) : he(t, e, r, s)) ? (dt(t, e, r), !t.tagName.includes("-") && (e === "value" || e === "checked" || e === "selected") && ut(t, e, r, s, o, e !== "value")) : t._isVueCE && (ge(t, e) || t._def.__asyncLoader && (/[A-Z]/.test(e) || !w(r))) ? dt(t, D(e), r, o, e) : (e === "true-value" ? t._trueValue = r : e === "false-value" && (t._falseValue = r), ut(t, e, r, s));
};
function he(t, e, n, r) {
  if (r)
    return !!(e === "innerHTML" || e === "textContent" || e in t && ht(e) && Et(n));
  if (e === "spellcheck" || e === "draggable" || e === "translate" || e === "autocorrect" || e === "sandbox" && t.tagName === "IFRAME" || e === "form" || e === "list" && t.tagName === "INPUT" || e === "type" && t.tagName === "TEXTAREA") return !1;
  if (e === "width" || e === "height") {
    const i = t.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE") return !1;
  }
  return ht(e) && w(n) ? !1 : e in t;
}
function ge(t, e) {
  const n = t._def.props;
  if (!n) return !1;
  const r = D(e);
  return Array.isArray(n) ? n.some((i) => D(i) === r) : Object.keys(n).some((i) => D(i) === r);
}
var N = (t) => {
  const e = t.props["onUpdate:modelValue"] || !1;
  return C(e) ? (n) => Gt(e, n) : e;
};
function ve(t) {
  t.target.composing = !0;
}
function gt(t) {
  const e = t.target;
  e.composing && (e.composing = !1, e.dispatchEvent(new Event("input")));
}
var v = /* @__PURE__ */ Symbol("_assign");
function vt(t, e, n) {
  return e && (t = t.trim()), n && (t = j(t)), t;
}
var ye = {
  created(t, { modifiers: { lazy: e, trim: n, number: r } }, i) {
    t[v] = N(i);
    const o = r || i.props && i.props.type === "number";
    b(t, e ? "change" : "input", (s) => {
      s.target.composing || t[v](vt(t.value, n, o));
    }), (n || o) && b(t, "change", () => {
      t.value = vt(t.value, n, o);
    }), e || (b(t, "compositionstart", ve), b(t, "compositionend", gt), b(t, "change", gt));
  },
  mounted(t, { value: e }) {
    t.value = e ?? "";
  },
  beforeUpdate(t, { value: e, oldValue: n, modifiers: { lazy: r, trim: i, number: o } }, s) {
    if (t[v] = N(s), t.composing) return;
    const a = (o || t.type === "number") && !/^0\d/.test(t.value) ? j(t.value) : t.value, f = e ?? "";
    if (a === f) return;
    const l = t.getRootNode();
    (l instanceof Document || l instanceof ShadowRoot) && l.activeElement === t && t.type !== "range" && (r && e === n || i && t.value.trim() === f) || (t.value = f);
  }
}, Le = {
  deep: !0,
  created(t, e, n) {
    t[v] = N(n), b(t, "change", () => {
      const r = t._modelValue, i = x(t), o = t.checked, s = t[v];
      if (C(r)) {
        const a = z(r, i), f = a !== -1;
        if (o && !f) s(r.concat(i));
        else if (!o && f) {
          const l = [...r];
          l.splice(a, 1), s(l);
        }
      } else if (V(r)) {
        const a = new Set(r);
        o ? a.add(i) : a.delete(i), s(a);
      } else s(Nt(t, o));
    });
  },
  mounted: St,
  beforeUpdate(t, e, n) {
    t[v] = N(n), St(t, e, n);
  }
};
function St(t, { value: e, oldValue: n }, r) {
  t._modelValue = e;
  let i;
  if (C(e)) i = z(e, r.props.value) > -1;
  else if (V(e)) i = e.has(r.props.value);
  else {
    if (e === n) return;
    i = At(e, Nt(t, !0));
  }
  t.checked !== i && (t.checked = i);
}
var Ie = {
  deep: !0,
  created(t, { value: e, modifiers: { number: n } }, r) {
    const i = V(e);
    b(t, "change", () => {
      const o = Array.prototype.filter.call(t.options, (s) => s.selected).map((s) => n ? j(x(s)) : x(s));
      t[v](t.multiple ? i ? new Set(o) : o : o[0]), t._assigning = !0, Ht(() => {
        t._assigning = !1;
      });
    }), t[v] = N(r);
  },
  mounted(t, { value: e }) {
    bt(t, e);
  },
  beforeUpdate(t, e, n) {
    t[v] = N(n);
  },
  updated(t, { value: e }) {
    t._assigning || bt(t, e);
  }
};
function bt(t, e) {
  const n = t.multiple, r = C(e);
  if (!(n && !r && !V(e))) {
    for (let i = 0, o = t.options.length; i < o; i++) {
      const s = t.options[i], a = x(s);
      if (n) if (r) {
        const f = typeof a;
        f === "string" || f === "number" ? s.selected = e.some((l) => String(l) === String(a)) : s.selected = z(e, a) > -1;
      } else s.selected = e.has(a);
      else if (At(x(s), e)) {
        t.selectedIndex !== i && (t.selectedIndex = i);
        return;
      }
    }
    !n && t.selectedIndex !== -1 && (t.selectedIndex = -1);
  }
}
function x(t) {
  return "_value" in t ? t._value : t.value;
}
function Nt(t, e) {
  const n = e ? "_trueValue" : "_falseValue";
  return n in t ? t[n] : e;
}
var Se = [
  "ctrl",
  "shift",
  "alt",
  "meta"
], be = {
  stop: (t) => t.stopPropagation(),
  prevent: (t) => t.preventDefault(),
  self: (t) => t.target !== t.currentTarget,
  ctrl: (t) => !t.ctrlKey,
  shift: (t) => !t.shiftKey,
  alt: (t) => !t.altKey,
  meta: (t) => !t.metaKey,
  left: (t) => "button" in t && t.button !== 0,
  middle: (t) => "button" in t && t.button !== 1,
  right: (t) => "button" in t && t.button !== 2,
  exact: (t, e) => Se.some((n) => t[`${n}Key`] && !e.includes(n))
}, De = (t, e) => {
  if (!t) return t;
  const n = t._withMods || (t._withMods = {}), r = e.join(".");
  return n[r] || (n[r] = ((i, ...o) => {
    for (let s = 0; s < e.length; s++) {
      const a = be[e[s]];
      if (a && a(i, e)) return;
    }
    return t(i, ...o);
  }));
}, Ce = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Pe = (t, e) => {
  const n = t._withKeys || (t._withKeys = {}), r = e.join(".");
  return n[r] || (n[r] = ((i) => {
    if (!("key" in i)) return;
    const o = q(i.key);
    if (e.some((s) => s === o || Ce[s] === o)) return t(i);
  }));
}, Te = /* @__PURE__ */ U({ patchProp: me }, Zt), Ct;
function Ee() {
  return Ct || (Ct = jt(Te));
}
var xe = ((...t) => {
  const e = Ee().createApp(...t), { mount: n } = e;
  return e.mount = (r) => {
    const i = we(r);
    if (!i) return;
    const o = e._component;
    !Et(o) && !o.render && !o.template && (o.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    const s = n(i, !1, Ae(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), s;
  }, e;
});
function Ae(t) {
  if (t instanceof SVGElement) return "svg";
  if (typeof MathMLElement == "function" && t instanceof MathMLElement) return "mathml";
}
function we(t) {
  return w(t) ? document.querySelector(t) : t;
}
export {
  ye as a,
  De as c,
  Ie as i,
  xe as n,
  Ne as o,
  Le as r,
  Pe as s,
  Me as t
};
