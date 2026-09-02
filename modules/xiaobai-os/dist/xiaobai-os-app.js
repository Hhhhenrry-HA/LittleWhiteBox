/* eslint-disable */
// @__NO_SIDE_EFFECTS__
function Pn(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const a of e.split(",")) t[a] = 1;
  return (a) => a in t;
}
var Se = {}, va = [], St = () => {
}, Jl = () => !1, On = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Rn = (e) => e.startsWith("onUpdate:"), Oe = Object.assign, _s = (e, t) => {
  const a = e.indexOf(t);
  a > -1 && e.splice(a, 1);
}, Or = Object.prototype.hasOwnProperty, we = (e, t) => Or.call(e, t), ie = Array.isArray, pa = (e) => an(e) === "[object Map]", xa = (e) => an(e) === "[object Set]", el = (e) => an(e) === "[object Date]", fe = (e) => typeof e == "function", Ae = (e) => typeof e == "string", mt = (e) => typeof e == "symbol", Te = (e) => e !== null && typeof e == "object", ei = (e) => (Te(e) || fe(e)) && fe(e.then) && fe(e.catch), ti = Object.prototype.toString, an = (e) => ti.call(e), Rr = (e) => an(e).slice(8, -1), ai = (e) => an(e) === "[object Object]", qs = (e) => Ae(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Na = /* @__PURE__ */ Pn(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), Bn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((a) => t[a] || (t[a] = e(a)));
}, Br = /-\w/g, Xe = Bn((e) => e.replace(Br, (t) => t.slice(1).toUpperCase())), Lr = /\B([A-Z])/g, Qt = Bn((e) => e.replace(Lr, "-$1").toLowerCase()), Ln = Bn((e) => e.charAt(0).toUpperCase() + e.slice(1)), Zn = Bn((e) => e ? `on${Ln(e)}` : ""), $t = (e, t) => !Object.is(e, t), bn = (e, ...t) => {
  for (let a = 0; a < e.length; a++) e[a](...t);
}, ni = (e, t, a, n = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: n,
    value: a
  });
}, Dn = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Dr = (e) => {
  const t = Ae(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
}, tl, Nn = () => tl || (tl = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {});
function qt(e) {
  if (ie(e)) {
    const t = {};
    for (let a = 0; a < e.length; a++) {
      const n = e[a], l = Ae(n) ? Hr(n) : qt(n);
      if (l) for (const i in l) t[i] = l[i];
    }
    return t;
  } else if (Ae(e) || Te(e)) return e;
}
var Nr = /;(?![^(]*\))/g, Ur = /:([^]+)/, Fr = /\/\*[^]*?\*\//g;
function Hr(e) {
  const t = {};
  return e.replace(Fr, "").split(Nr).forEach((a) => {
    if (a) {
      const n = a.split(Ur);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function ae(e) {
  let t = "";
  if (Ae(e)) t = e;
  else if (ie(e)) for (let a = 0; a < e.length; a++) {
    const n = ae(e[a]);
    n && (t += n + " ");
  }
  else if (Te(e))
    for (const a in e) e[a] && (t += a + " ");
  return t.trim();
}
var si = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", jr = /* @__PURE__ */ Pn(si), M5 = /* @__PURE__ */ Pn(si + ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");
function li(e) {
  return !!e || e === "";
}
function Kr(e, t) {
  if (e.length !== t.length) return !1;
  let a = !0;
  for (let n = 0; a && n < e.length; n++) a = $a(e[n], t[n]);
  return a;
}
function $a(e, t) {
  if (e === t) return !0;
  let a = el(e), n = el(t);
  if (a || n) return a && n ? e.getTime() === t.getTime() : !1;
  if (a = mt(e), n = mt(t), a || n) return e === t;
  if (a = ie(e), n = ie(t), a || n) return a && n ? Kr(e, t) : !1;
  if (a = Te(e), n = Te(t), a || n) {
    if (!a || !n || Object.keys(e).length !== Object.keys(t).length) return !1;
    for (const l in e) {
      const i = e.hasOwnProperty(l), r = t.hasOwnProperty(l);
      if (i && !r || !i && r || !$a(e[l], t[l])) return !1;
    }
  }
  return String(e) === String(t);
}
function Cs(e, t) {
  return e.findIndex((a) => $a(a, t));
}
var ii = (e) => !!(e && e.__v_isRef === !0), g = (e) => Ae(e) ? e : e == null ? "" : ie(e) || Te(e) && (e.toString === ti || !fe(e.toString)) ? ii(e) ? g(e.value) : JSON.stringify(e, ri, 2) : String(e), ri = (e, t) => ii(t) ? ri(e, t.value) : pa(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((a, [n, l], i) => (a[Wn(n, i) + " =>"] = l, a), {}) } : xa(t) ? { [`Set(${t.size})`]: [...t.values()].map((a) => Wn(a)) } : mt(t) ? Wn(t) : Te(t) && !ie(t) && !ai(t) ? String(t) : t, Wn = (e, t = "") => {
  var a;
  return mt(e) ? `Symbol(${(a = e.description) != null ? a : t})` : e;
}, Ne, Gr = class {
  constructor(e = !1) {
    this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && Ne && (Ne.active ? (this.parent = Ne, this.index = (Ne.scopes || (Ne.scopes = [])).push(this) - 1) : (this._active = !1, this._warnOnRun = !1));
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let e, t;
      if (this.scopes) for (e = 0, t = this.scopes.length; e < t; e++) this.scopes[e].pause();
      for (e = 0, t = this.effects.length; e < t; e++) this.effects[e].pause();
    }
  }
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let e, t;
      if (this.scopes) for (e = 0, t = this.scopes.length; e < t; e++) this.scopes[e].resume();
      for (e = 0, t = this.effects.length; e < t; e++) this.effects[e].resume();
    }
  }
  run(e) {
    if (this._active) {
      const t = Ne;
      try {
        return Ne = this, e();
      } finally {
        Ne = t;
      }
    }
  }
  on() {
    ++this._on === 1 && (this.prevScope = Ne, Ne = this);
  }
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (Ne === this) Ne = this.prevScope;
      else {
        let e = Ne;
        for (; e; ) {
          if (e.prevScope === this) {
            e.prevScope = this.prevScope;
            break;
          }
          e = e.prevScope;
        }
      }
      this.prevScope = void 0;
    }
  }
  stop(e) {
    if (this._active) {
      this._active = !1;
      let t, a;
      for (t = 0, a = this.effects.length; t < a; t++) this.effects[t].stop();
      for (this.effects.length = 0, t = 0, a = this.cleanups.length; t < a; t++) this.cleanups[t]();
      if (this.cleanups.length = 0, this.scopes) {
        for (t = 0, a = this.scopes.length; t < a; t++) this.scopes[t].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !e) {
        const n = this.parent.scopes.pop();
        n && n !== this && (this.parent.scopes[this.index] = n, n.index = this.index);
      }
      this.parent = void 0;
    }
  }
};
function zr() {
  return Ne;
}
var qe, Yn = /* @__PURE__ */ new WeakSet(), oi = class {
  constructor(e) {
    this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Ne && (Ne.active ? Ne.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Yn.has(this) && (Yn.delete(this), this.trigger()));
  }
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || di(this);
  }
  run() {
    if (!(this.flags & 1)) return this.fn();
    this.flags |= 2, al(this), ci(this);
    const e = qe, t = pt;
    qe = this, pt = !0;
    try {
      return this.fn();
    } finally {
      fi(this), qe = e, pt = t, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let e = this.deps; e; e = e.nextDep) Is(e);
      this.deps = this.depsTail = void 0, al(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Yn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  runIfDirty() {
    cs(this) && this.run();
  }
  get dirty() {
    return cs(this);
  }
}, ui = 0, Ua, Fa;
function di(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Fa, Fa = e;
    return;
  }
  e.next = Ua, Ua = e;
}
function Ms() {
  ui++;
}
function As() {
  if (--ui > 0) return;
  if (Fa) {
    let t = Fa;
    for (Fa = void 0; t; ) {
      const a = t.next;
      t.next = void 0, t.flags &= -9, t = a;
    }
  }
  let e;
  for (; Ua; ) {
    let t = Ua;
    for (Ua = void 0; t; ) {
      const a = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
        t.trigger();
      } catch (n) {
        e || (e = n);
      }
      t = a;
    }
  }
  if (e) throw e;
}
function ci(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function fi(e) {
  let t, a = e.depsTail, n = a;
  for (; n; ) {
    const l = n.prevDep;
    n.version === -1 ? (n === a && (a = l), Is(n), Vr(n)) : t = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = l;
  }
  e.deps = t, e.depsTail = a;
}
function cs(e) {
  for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (vi(t.dep.computed) || t.dep.version !== t.version)) return !0;
  return !!e._dirty;
}
function vi(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Ga) || (e.globalVersion = Ga, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !cs(e)))) return;
  e.flags |= 2;
  const t = e.dep, a = qe, n = pt;
  qe = e, pt = !0;
  try {
    ci(e);
    const l = e.fn(e._value);
    (t.version === 0 || $t(l, e._value)) && (e.flags |= 128, e._value = l, t.version++);
  } catch (l) {
    throw t.version++, l;
  } finally {
    qe = a, pt = n, fi(e), e.flags &= -3;
  }
}
function Is(e, t = !1) {
  const { dep: a, prevSub: n, nextSub: l } = e;
  if (n && (n.nextSub = l, e.prevSub = void 0), l && (l.prevSub = n, e.nextSub = void 0), a.subs === e && (a.subs = n, !n && a.computed)) {
    a.computed.flags &= -5;
    for (let i = a.computed.deps; i; i = i.nextDep) Is(i, !0);
  }
  !t && !--a.sc && a.map && a.map.delete(a.key);
}
function Vr(e) {
  const { prevDep: t, nextDep: a } = e;
  t && (t.nextDep = a, e.prevDep = void 0), a && (a.prevDep = t, e.nextDep = void 0);
}
var pt = !0, pi = [];
function Nt() {
  pi.push(pt), pt = !1;
}
function Ut() {
  const e = pi.pop();
  pt = e === void 0 ? !0 : e;
}
function al(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const a = qe;
    qe = void 0;
    try {
      t();
    } finally {
      qe = a;
    }
  }
}
var Ga = 0, Zr = class {
  constructor(e, t) {
    this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}, Es = class {
  constructor(e) {
    this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(e) {
    if (!qe || !pt || qe === this.computed) return;
    let t = this.activeLink;
    if (t === void 0 || t.sub !== qe)
      t = this.activeLink = new Zr(qe, this), qe.deps ? (t.prevDep = qe.depsTail, qe.depsTail.nextDep = t, qe.depsTail = t) : qe.deps = qe.depsTail = t, mi(t);
    else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
      const a = t.nextDep;
      a.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = a), t.prevDep = qe.depsTail, t.nextDep = void 0, qe.depsTail.nextDep = t, qe.depsTail = t, qe.deps === t && (qe.deps = a);
    }
    return t;
  }
  trigger(e) {
    this.version++, Ga++, this.notify(e);
  }
  notify(e) {
    Ms();
    try {
      for (let t = this.subs; t; t = t.prevSub) t.sub.notify() && t.sub.dep.notify();
    } finally {
      As();
    }
  }
};
function mi(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let n = t.deps; n; n = n.nextDep) mi(n);
    }
    const a = e.dep.subs;
    a !== e && (e.prevSub = a, a && (a.nextSub = e)), e.dep.subs = e;
  }
}
var fs = /* @__PURE__ */ new WeakMap(), sa = /* @__PURE__ */ Symbol(""), vs = /* @__PURE__ */ Symbol(""), za = /* @__PURE__ */ Symbol("");
function Ge(e, t, a) {
  if (pt && qe) {
    let n = fs.get(e);
    n || fs.set(e, n = /* @__PURE__ */ new Map());
    let l = n.get(a);
    l || (n.set(a, l = new Es()), l.map = n, l.key = a), l.track();
  }
}
function Rt(e, t, a, n, l, i) {
  const r = fs.get(e);
  if (!r) {
    Ga++;
    return;
  }
  const o = (u) => {
    u && u.trigger();
  };
  if (Ms(), t === "clear") r.forEach(o);
  else {
    const u = ie(e), p = u && qs(a);
    if (u && a === "length") {
      const d = Number(n);
      r.forEach((y, w) => {
        (w === "length" || w === za || !mt(w) && w >= d) && o(y);
      });
    } else
      switch ((a !== void 0 || r.has(void 0)) && o(r.get(a)), p && o(r.get(za)), t) {
        case "add":
          u ? p && o(r.get("length")) : (o(r.get(sa)), pa(e) && o(r.get(vs)));
          break;
        case "delete":
          u || (o(r.get(sa)), pa(e) && o(r.get(vs)));
          break;
        case "set":
          pa(e) && o(r.get(sa));
          break;
      }
  }
  As();
}
function oa(e) {
  const t = /* @__PURE__ */ oe(e);
  return t === e ? t : (Ge(t, "iterate", za), /* @__PURE__ */ ft(e) ? t : t.map(gt));
}
function Un(e) {
  return Ge(e = /* @__PURE__ */ oe(e), "iterate", za), e;
}
function Tt(e, t) {
  return /* @__PURE__ */ Ft(e) ? ha(/* @__PURE__ */ la(e) ? gt(t) : t) : gt(t);
}
var Wr = {
  __proto__: null,
  [Symbol.iterator]() {
    return Qn(this, Symbol.iterator, (e) => Tt(this, e));
  },
  concat(...e) {
    return oa(this).concat(...e.map((t) => ie(t) ? oa(t) : t));
  },
  entries() {
    return Qn(this, "entries", (e) => (e[1] = Tt(this, e[1]), e));
  },
  every(e, t) {
    return At(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return At(this, "filter", e, t, (a) => a.map((n) => Tt(this, n)), arguments);
  },
  find(e, t) {
    return At(this, "find", e, t, (a) => Tt(this, a), arguments);
  },
  findIndex(e, t) {
    return At(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return At(this, "findLast", e, t, (a) => Tt(this, a), arguments);
  },
  findLastIndex(e, t) {
    return At(this, "findLastIndex", e, t, void 0, arguments);
  },
  forEach(e, t) {
    return At(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Xn(this, "includes", e);
  },
  indexOf(...e) {
    return Xn(this, "indexOf", e);
  },
  join(e) {
    return oa(this).join(e);
  },
  lastIndexOf(...e) {
    return Xn(this, "lastIndexOf", e);
  },
  map(e, t) {
    return At(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Ma(this, "pop");
  },
  push(...e) {
    return Ma(this, "push", e);
  },
  reduce(e, ...t) {
    return nl(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return nl(this, "reduceRight", e, t);
  },
  shift() {
    return Ma(this, "shift");
  },
  some(e, t) {
    return At(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Ma(this, "splice", e);
  },
  toReversed() {
    return oa(this).toReversed();
  },
  toSorted(e) {
    return oa(this).toSorted(e);
  },
  toSpliced(...e) {
    return oa(this).toSpliced(...e);
  },
  unshift(...e) {
    return Ma(this, "unshift", e);
  },
  values() {
    return Qn(this, "values", (e) => Tt(this, e));
  }
};
function Qn(e, t, a) {
  const n = Un(e), l = n[t]();
  return n !== e && !/* @__PURE__ */ ft(e) && (l._next = l.next, l.next = () => {
    const i = l._next();
    return i.done || (i.value = a(i.value)), i;
  }), l;
}
var Yr = Array.prototype;
function At(e, t, a, n, l, i) {
  const r = Un(e), o = r !== e && !/* @__PURE__ */ ft(e), u = r[t];
  if (u !== Yr[t]) {
    const y = u.apply(e, i);
    return o ? gt(y) : y;
  }
  let p = a;
  r !== e && (o ? p = function(y, w) {
    return a.call(this, Tt(e, y), w, e);
  } : a.length > 2 && (p = function(y, w) {
    return a.call(this, y, w, e);
  }));
  const d = u.call(r, p, n);
  return o && l ? l(d) : d;
}
function nl(e, t, a, n) {
  const l = Un(e), i = l !== e && !/* @__PURE__ */ ft(e);
  let r = a, o = !1;
  l !== e && (i ? (o = n.length === 0, r = function(p, d, y) {
    return o && (o = !1, p = Tt(e, p)), a.call(this, p, Tt(e, d), y, e);
  }) : a.length > 3 && (r = function(p, d, y) {
    return a.call(this, p, d, y, e);
  }));
  const u = l[t](r, ...n);
  return o ? Tt(e, u) : u;
}
function Xn(e, t, a) {
  const n = /* @__PURE__ */ oe(e);
  Ge(n, "iterate", za);
  const l = n[t](...a);
  return (l === -1 || l === !1) && /* @__PURE__ */ Rs(a[0]) ? (a[0] = /* @__PURE__ */ oe(a[0]), n[t](...a)) : l;
}
function Ma(e, t, a = []) {
  Nt(), Ms();
  const n = (/* @__PURE__ */ oe(e))[t].apply(e, a);
  return As(), Ut(), n;
}
var Qr = /* @__PURE__ */ Pn("__proto__,__v_isRef,__isVue"), gi = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(mt));
function Xr(e) {
  mt(e) || (e = String(e));
  const t = /* @__PURE__ */ oe(this);
  return Ge(t, "has", e), t.hasOwnProperty(e);
}
var bi = class {
  constructor(e = !1, t = !1) {
    this._isReadonly = e, this._isShallow = t;
  }
  get(e, t, a) {
    if (t === "__v_skip") return e.__v_skip;
    const n = this._isReadonly, l = this._isShallow;
    if (t === "__v_isReactive") return !n;
    if (t === "__v_isReadonly") return n;
    if (t === "__v_isShallow") return l;
    if (t === "__v_raw")
      return a === (n ? l ? oo : wi : l ? ki : yi).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(a) ? e : void 0;
    const i = ie(e);
    if (!n) {
      let o;
      if (i && (o = Wr[t])) return o;
      if (t === "hasOwnProperty") return Xr;
    }
    const r = Reflect.get(e, t, /* @__PURE__ */ Ze(e) ? e : a);
    if ((mt(t) ? gi.has(t) : Qr(t)) || (n || Ge(e, "get", t), l)) return r;
    if (/* @__PURE__ */ Ze(r)) {
      const o = i && qs(t) ? r : r.value;
      return n && Te(o) ? /* @__PURE__ */ ms(o) : o;
    }
    return Te(r) ? n ? /* @__PURE__ */ ms(r) : /* @__PURE__ */ _t(r) : r;
  }
}, hi = class extends bi {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, t, a, n) {
    let l = e[t];
    const i = ie(e) && qs(t);
    if (!this._isShallow) {
      const u = /* @__PURE__ */ Ft(l);
      if (!/* @__PURE__ */ ft(a) && !/* @__PURE__ */ Ft(a) && (l = /* @__PURE__ */ oe(l), a = /* @__PURE__ */ oe(a)), !i && /* @__PURE__ */ Ze(l) && !/* @__PURE__ */ Ze(a)) return u || (l.value = a), !0;
    }
    const r = i ? Number(t) < e.length : we(e, t), o = Reflect.set(e, t, a, /* @__PURE__ */ Ze(e) ? e : n);
    return e === /* @__PURE__ */ oe(n) && (r ? $t(a, l) && Rt(e, "set", t, a, l) : Rt(e, "add", t, a)), o;
  }
  deleteProperty(e, t) {
    const a = we(e, t), n = e[t], l = Reflect.deleteProperty(e, t);
    return l && a && Rt(e, "delete", t, void 0, n), l;
  }
  has(e, t) {
    const a = Reflect.has(e, t);
    return (!mt(t) || !gi.has(t)) && Ge(e, "has", t), a;
  }
  ownKeys(e) {
    return Ge(e, "iterate", ie(e) ? "length" : sa), Reflect.ownKeys(e);
  }
}, Jr = class extends bi {
  constructor(e = !1) {
    super(!0, e);
  }
  set(e, t) {
    return !0;
  }
  deleteProperty(e, t) {
    return !0;
  }
}, eo = /* @__PURE__ */ new hi(), to = /* @__PURE__ */ new Jr(), ao = /* @__PURE__ */ new hi(!0), ps = (e) => e, un = (e) => Reflect.getPrototypeOf(e);
function no(e, t, a) {
  return function(...n) {
    const l = this.__v_raw, i = /* @__PURE__ */ oe(l), r = pa(i), o = e === "entries" || e === Symbol.iterator && r, u = e === "keys" && r, p = l[e](...n), d = a ? ps : t ? ha : gt;
    return !t && Ge(i, "iterate", u ? vs : sa), Oe(Object.create(p), { next() {
      const { value: y, done: w } = p.next();
      return w ? {
        value: y,
        done: w
      } : {
        value: o ? [d(y[0]), d(y[1])] : d(y),
        done: w
      };
    } });
  };
}
function dn(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function so(e, t) {
  const a = {
    get(n) {
      const l = this.__v_raw, i = /* @__PURE__ */ oe(l), r = /* @__PURE__ */ oe(n);
      e || ($t(n, r) && Ge(i, "get", n), Ge(i, "get", r));
      const { has: o } = un(i), u = t ? ps : e ? ha : gt;
      if (o.call(i, n)) return u(l.get(n));
      if (o.call(i, r)) return u(l.get(r));
      l !== i && l.get(n);
    },
    get size() {
      const n = this.__v_raw;
      return !e && Ge(/* @__PURE__ */ oe(n), "iterate", sa), n.size;
    },
    has(n) {
      const l = this.__v_raw, i = /* @__PURE__ */ oe(l), r = /* @__PURE__ */ oe(n);
      return e || ($t(n, r) && Ge(i, "has", n), Ge(i, "has", r)), n === r ? l.has(n) : l.has(n) || l.has(r);
    },
    forEach(n, l) {
      const i = this, r = i.__v_raw, o = /* @__PURE__ */ oe(r), u = t ? ps : e ? ha : gt;
      return !e && Ge(o, "iterate", sa), r.forEach((p, d) => n.call(l, u(p), u(d), i));
    }
  };
  return Oe(a, e ? {
    add: dn("add"),
    set: dn("set"),
    delete: dn("delete"),
    clear: dn("clear")
  } : {
    add(n) {
      const l = /* @__PURE__ */ oe(this), i = un(l), r = /* @__PURE__ */ oe(n), o = !t && !/* @__PURE__ */ ft(n) && !/* @__PURE__ */ Ft(n) ? r : n;
      return i.has.call(l, o) || $t(n, o) && i.has.call(l, n) || $t(r, o) && i.has.call(l, r) || (l.add(o), Rt(l, "add", o, o)), this;
    },
    set(n, l) {
      !t && !/* @__PURE__ */ ft(l) && !/* @__PURE__ */ Ft(l) && (l = /* @__PURE__ */ oe(l));
      const i = /* @__PURE__ */ oe(this), { has: r, get: o } = un(i);
      let u = r.call(i, n);
      u || (n = /* @__PURE__ */ oe(n), u = r.call(i, n));
      const p = o.call(i, n);
      return i.set(n, l), u ? $t(l, p) && Rt(i, "set", n, l, p) : Rt(i, "add", n, l), this;
    },
    delete(n) {
      const l = /* @__PURE__ */ oe(this), { has: i, get: r } = un(l);
      let o = i.call(l, n);
      o || (n = /* @__PURE__ */ oe(n), o = i.call(l, n));
      const u = r ? r.call(l, n) : void 0, p = l.delete(n);
      return o && Rt(l, "delete", n, void 0, u), p;
    },
    clear() {
      const n = /* @__PURE__ */ oe(this), l = n.size !== 0, i = void 0, r = n.clear();
      return l && Rt(n, "clear", void 0, void 0, i), r;
    }
  }), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((n) => {
    a[n] = no(n, e, t);
  }), a;
}
function Ps(e, t) {
  const a = so(e, t);
  return (n, l, i) => l === "__v_isReactive" ? !e : l === "__v_isReadonly" ? e : l === "__v_raw" ? n : Reflect.get(we(a, l) && l in n ? a : n, l, i);
}
var lo = { get: /* @__PURE__ */ Ps(!1, !1) }, io = { get: /* @__PURE__ */ Ps(!1, !0) }, ro = { get: /* @__PURE__ */ Ps(!0, !1) }, yi = /* @__PURE__ */ new WeakMap(), ki = /* @__PURE__ */ new WeakMap(), wi = /* @__PURE__ */ new WeakMap(), oo = /* @__PURE__ */ new WeakMap();
function uo(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
// @__NO_SIDE_EFFECTS__
function _t(e) {
  return /* @__PURE__ */ Ft(e) ? e : Os(e, !1, eo, lo, yi);
}
// @__NO_SIDE_EFFECTS__
function co(e) {
  return Os(e, !1, ao, io, ki);
}
// @__NO_SIDE_EFFECTS__
function ms(e) {
  return Os(e, !0, to, ro, wi);
}
function Os(e, t, a, n, l) {
  if (!Te(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
  const i = l.get(e);
  if (i) return i;
  const r = uo(Rr(e));
  if (r === 0) return e;
  const o = new Proxy(e, r === 2 ? n : a);
  return l.set(e, o), o;
}
// @__NO_SIDE_EFFECTS__
function la(e) {
  return /* @__PURE__ */ Ft(e) ? /* @__PURE__ */ la(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Ft(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function ft(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Rs(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function oe(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ oe(t) : e;
}
function fo(e) {
  return !we(e, "__v_skip") && Object.isExtensible(e) && ni(e, "__v_skip", !0), e;
}
var gt = (e) => Te(e) ? /* @__PURE__ */ _t(e) : e, ha = (e) => Te(e) ? /* @__PURE__ */ ms(e) : e;
// @__NO_SIDE_EFFECTS__
function Ze(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function K(e) {
  return vo(e, !1);
}
function vo(e, t) {
  return /* @__PURE__ */ Ze(e) ? e : new po(e, t);
}
var po = class {
  constructor(e, t) {
    this.dep = new Es(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ oe(e), this._value = t ? e : gt(e), this.__v_isShallow = t;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e) {
    const t = this._rawValue, a = this.__v_isShallow || /* @__PURE__ */ ft(e) || /* @__PURE__ */ Ft(e);
    e = a ? e : /* @__PURE__ */ oe(e), $t(e, t) && (this._rawValue = e, this._value = a ? e : gt(e), this.dep.trigger());
  }
};
function me(e) {
  return /* @__PURE__ */ Ze(e) ? e.value : e;
}
var mo = {
  get: (e, t, a) => t === "__v_raw" ? e : me(Reflect.get(e, t, a)),
  set: (e, t, a, n) => {
    const l = e[t];
    return /* @__PURE__ */ Ze(l) && !/* @__PURE__ */ Ze(a) ? (l.value = a, !0) : Reflect.set(e, t, a, n);
  }
};
function Ti(e) {
  return /* @__PURE__ */ la(e) ? e : new Proxy(e, mo);
}
var go = class {
  constructor(e, t, a) {
    this.fn = e, this.setter = t, this._value = void 0, this.dep = new Es(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Ga - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = a;
  }
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && qe !== this)
      return di(this, !0), !0;
  }
  get value() {
    const e = this.dep.track();
    return vi(this), e && (e.version = this.dep.version), this._value;
  }
  set value(e) {
    this.setter && this.setter(e);
  }
};
// @__NO_SIDE_EFFECTS__
function bo(e, t, a = !1) {
  let n, l;
  return fe(e) ? n = e : (n = e.get, l = e.set), new go(n, l, a);
}
var cn = {}, Tn = /* @__PURE__ */ new WeakMap(), aa = void 0;
function ho(e, t = !1, a = aa) {
  if (a) {
    let n = Tn.get(a);
    n || Tn.set(a, n = []), n.push(e);
  }
}
function yo(e, t, a = Se) {
  const { immediate: n, deep: l, once: i, scheduler: r, augmentJob: o, call: u } = a, p = (C) => l ? C : /* @__PURE__ */ ft(C) || l === !1 || l === 0 ? Bt(C, 1) : Bt(C);
  let d, y, w, h, q = !1, P = !1;
  if (/* @__PURE__ */ Ze(e) ? (y = () => e.value, q = /* @__PURE__ */ ft(e)) : /* @__PURE__ */ la(e) ? (y = () => p(e), q = !0) : ie(e) ? (P = !0, q = e.some((C) => /* @__PURE__ */ la(C) || /* @__PURE__ */ ft(C)), y = () => e.map((C) => {
    if (/* @__PURE__ */ Ze(C)) return C.value;
    if (/* @__PURE__ */ la(C)) return p(C);
    if (fe(C)) return u ? u(C, 2) : C();
  })) : fe(e) ? t ? y = u ? () => u(e, 2) : e : y = () => {
    if (w) {
      Nt();
      try {
        w();
      } finally {
        Ut();
      }
    }
    const C = aa;
    aa = d;
    try {
      return u ? u(e, 3, [h]) : e(h);
    } finally {
      aa = C;
    }
  } : y = St, t && l) {
    const C = y, T = l === !0 ? 1 / 0 : l;
    y = () => Bt(C(), T);
  }
  const R = zr(), D = () => {
    d.stop(), R && R.active && _s(R.effects, d);
  };
  if (i && t) {
    const C = t;
    t = (...T) => {
      C(...T), D();
    };
  }
  let L = P ? new Array(e.length).fill(cn) : cn;
  const A = (C) => {
    if (!(!(d.flags & 1) || !d.dirty && !C))
      if (t) {
        const T = d.run();
        if (l || q || (P ? T.some((M, $) => $t(M, L[$])) : $t(T, L))) {
          w && w();
          const M = aa;
          aa = d;
          try {
            const $ = [
              T,
              L === cn ? void 0 : P && L[0] === cn ? [] : L,
              h
            ];
            L = T, u ? u(t, 3, $) : t(...$);
          } finally {
            aa = M;
          }
        }
      } else d.run();
  };
  return o && o(A), d = new oi(y), d.scheduler = r ? () => r(A, !1) : A, h = (C) => ho(C, !1, d), w = d.onStop = () => {
    const C = Tn.get(d);
    if (C) {
      if (u) u(C, 4);
      else for (const T of C) T();
      Tn.delete(d);
    }
  }, t ? n ? A(!0) : L = d.run() : r ? r(A.bind(null, !0), !0) : d.run(), D.pause = d.pause.bind(d), D.resume = d.resume.bind(d), D.stop = D, D;
}
function Bt(e, t = 1 / 0, a) {
  if (t <= 0 || !Te(e) || e.__v_skip || (a = a || /* @__PURE__ */ new Map(), (a.get(e) || 0) >= t)) return e;
  if (a.set(e, t), t--, /* @__PURE__ */ Ze(e)) Bt(e.value, t, a);
  else if (ie(e)) for (let n = 0; n < e.length; n++) Bt(e[n], t, a);
  else if (xa(e) || pa(e)) e.forEach((n) => {
    Bt(n, t, a);
  });
  else if (ai(e)) {
    for (const n in e) Bt(e[n], t, a);
    for (const n of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, n) && Bt(e[n], t, a);
  }
  return e;
}
function nn(e, t, a, n) {
  try {
    return n ? e(...n) : e();
  } catch (l) {
    Fn(l, t, a);
  }
}
function vt(e, t, a, n) {
  if (fe(e)) {
    const l = nn(e, t, a, n);
    return l && ei(l) && l.catch((i) => {
      Fn(i, t, a);
    }), l;
  }
  if (ie(e)) {
    const l = [];
    for (let i = 0; i < e.length; i++) l.push(vt(e[i], t, a, n));
    return l;
  }
}
function Fn(e, t, a, n = !0) {
  const l = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: r } = t && t.appContext.config || Se;
  if (t) {
    let o = t.parent;
    const u = t.proxy, p = `https://vuejs.org/error-reference/#runtime-${a}`;
    for (; o; ) {
      const d = o.ec;
      if (d) {
        for (let y = 0; y < d.length; y++) if (d[y](e, u, p) === !1) return;
      }
      o = o.parent;
    }
    if (i) {
      Nt(), nn(i, null, 10, [
        e,
        u,
        p
      ]), Ut();
      return;
    }
  }
  ko(e, a, l, n, r);
}
function ko(e, t, a, n = !0, l = !1) {
  if (l) throw e;
  console.error(e);
}
var Qe = [], kt = -1, ma = [], Vt = null, da = 0, xi = /* @__PURE__ */ Promise.resolve(), xn = null;
function sn(e) {
  const t = xn || xi;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function wo(e) {
  let t = kt + 1, a = Qe.length;
  for (; t < a; ) {
    const n = t + a >>> 1, l = Qe[n], i = Va(l);
    i < e || i === e && l.flags & 2 ? t = n + 1 : a = n;
  }
  return t;
}
function Bs(e) {
  if (!(e.flags & 1)) {
    const t = Va(e), a = Qe[Qe.length - 1];
    !a || !(e.flags & 2) && t >= Va(a) ? Qe.push(e) : Qe.splice(wo(t), 0, e), e.flags |= 1, $i();
  }
}
function $i() {
  xn || (xn = xi.then(_i));
}
function To(e) {
  ie(e) ? ma.push(...e) : Vt && e.id === -1 ? Vt.splice(da + 1, 0, e) : e.flags & 1 || (ma.push(e), e.flags |= 1), $i();
}
function sl(e, t, a = kt + 1) {
  for (; a < Qe.length; a++) {
    const n = Qe[a];
    if (n && n.flags & 2) {
      if (e && n.id !== e.uid) continue;
      Qe.splice(a, 1), a--, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
    }
  }
}
function Si(e) {
  if (ma.length) {
    const t = [...new Set(ma)].sort((a, n) => Va(a) - Va(n));
    if (ma.length = 0, Vt) {
      Vt.push(...t);
      return;
    }
    for (Vt = t, da = 0; da < Vt.length; da++) {
      const a = Vt[da];
      a.flags & 4 && (a.flags &= -2), a.flags & 8 || a(), a.flags &= -2;
    }
    Vt = null, da = 0;
  }
}
var Va = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function _i(e) {
  try {
    for (kt = 0; kt < Qe.length; kt++) {
      const t = Qe[kt];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), nn(t, t.i, t.i ? 15 : 14), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; kt < Qe.length; kt++) {
      const t = Qe[kt];
      t && (t.flags &= -2);
    }
    kt = -1, Qe.length = 0, Si(e), xn = null, (Qe.length || ma.length) && _i(e);
  }
}
var Ue = null, qi = null;
function $n(e) {
  const t = Ue;
  return Ue = e, qi = e && e.type.__scopeId || null, t;
}
function ia(e, t = Ue, a) {
  if (!t || e._n) return e;
  const n = (...l) => {
    n._d && Cn(-1);
    const i = $n(t);
    let r;
    try {
      r = e(...l);
    } finally {
      $n(i), n._d && Cn(1);
    }
    return r;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function Me(e, t) {
  if (Ue === null) return e;
  const a = zn(Ue), n = e.dirs || (e.dirs = []);
  for (let l = 0; l < t.length; l++) {
    let [i, r, o, u = Se] = t[l];
    i && (fe(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && Bt(r), n.push({
      dir: i,
      instance: a,
      value: r,
      oldValue: void 0,
      arg: o,
      modifiers: u
    }));
  }
  return e;
}
function Xt(e, t, a, n) {
  const l = e.dirs, i = t && t.dirs;
  for (let r = 0; r < l.length; r++) {
    const o = l[r];
    i && (o.oldValue = i[r].value);
    let u = o.dir[n];
    u && (Nt(), vt(u, a, 8, [
      e.el,
      o,
      e,
      t
    ]), Ut());
  }
}
function xo(e, t) {
  if (Ve) {
    let a = Ve.provides;
    const n = Ve.parent && Ve.parent.provides;
    n === a && (a = Ve.provides = Object.create(n)), a[e] = t;
  }
}
function hn(e, t, a = !1) {
  const n = ir();
  if (n || ba) {
    let l = ba ? ba._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (l && e in l) return l[e];
    if (arguments.length > 1) return a && fe(t) ? t.call(n && n.proxy) : t;
  }
}
var $o = /* @__PURE__ */ Symbol.for("v-scx"), So = () => {
  {
    const e = hn($o);
    return e;
  }
};
function et(e, t, a) {
  return Ci(e, t, a);
}
function Ci(e, t, a = Se) {
  const { immediate: n, deep: l, flush: i, once: r } = a, o = Oe({}, a), u = t && n || !t && i !== "post";
  let p;
  if (Qa) {
    if (i === "sync") {
      const h = So();
      p = h.__watcherHandles || (h.__watcherHandles = []);
    } else if (!u) {
      const h = () => {
      };
      return h.stop = St, h.resume = St, h.pause = St, h;
    }
  }
  const d = Ve;
  o.call = (h, q, P) => vt(h, d, q, P);
  let y = !1;
  i === "post" ? o.scheduler = (h) => {
    Je(h, d && d.suspense);
  } : i !== "sync" && (y = !0, o.scheduler = (h, q) => {
    q ? h() : Bs(h);
  }), o.augmentJob = (h) => {
    t && (h.flags |= 4), y && (h.flags |= 2, d && (h.id = d.uid, h.i = d));
  };
  const w = yo(e, t, o);
  return Qa && (p ? p.push(w) : u && w()), w;
}
function _o(e, t, a) {
  const n = this.proxy, l = Ae(e) ? e.includes(".") ? Mi(n, e) : () => n[e] : e.bind(n, n);
  let i;
  fe(t) ? i = t : (i = t.handler, a = t);
  const r = ln(this), o = Ci(l, i.bind(n), a);
  return r(), o;
}
function Mi(e, t) {
  const a = t.split(".");
  return () => {
    let n = e;
    for (let l = 0; l < a.length && n; l++) n = n[a[l]];
    return n;
  };
}
var qo = /* @__PURE__ */ Symbol("_vte"), Ai = (e) => e.__isTeleport, ct = /* @__PURE__ */ Symbol("_leaveCb"), Aa = /* @__PURE__ */ Symbol("_enterCb");
function Co() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return at(() => {
    e.isMounted = !0;
  }), ot(() => {
    e.isUnmounting = !0;
  }), e;
}
var ut = [Function, Array], Ii = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  onBeforeEnter: ut,
  onEnter: ut,
  onAfterEnter: ut,
  onEnterCancelled: ut,
  onBeforeLeave: ut,
  onLeave: ut,
  onAfterLeave: ut,
  onLeaveCancelled: ut,
  onBeforeAppear: ut,
  onAppear: ut,
  onAfterAppear: ut,
  onAppearCancelled: ut
}, Ei = (e) => {
  const t = e.subTree;
  return t.component ? Ei(t.component) : t;
}, Mo = {
  name: "BaseTransition",
  props: Ii,
  setup(e, { slots: t }) {
    const a = ir(), n = Co();
    return () => {
      const l = t.default && Ri(t.default(), !0), i = l && l.length ? Pi(l) : a.subTree ? H() : void 0;
      if (!i) return;
      const r = /* @__PURE__ */ oe(e), { mode: o } = r;
      if (n.isLeaving) return Jn(i);
      const u = ll(i);
      if (!u) return Jn(i);
      let p = gs(u, r, n, a, (y) => p = y);
      u.type !== ze && Za(u, p);
      let d = a.subTree && ll(a.subTree);
      if (d && d.type !== ze && !na(d, u) && Ei(a).type !== ze) {
        let y = gs(d, r, n, a);
        if (Za(d, y), o === "out-in" && u.type !== ze)
          return n.isLeaving = !0, y.afterLeave = () => {
            n.isLeaving = !1, a.job.flags & 8 || a.update(), delete y.afterLeave, d = void 0;
          }, Jn(i);
        o === "in-out" && u.type !== ze ? y.delayLeave = (w, h, q) => {
          const P = Oi(n, d);
          P[String(d.key)] = d, w[ct] = () => {
            h(), w[ct] = void 0, delete p.delayedLeave, d = void 0;
          }, p.delayedLeave = () => {
            q(), delete p.delayedLeave, d = void 0;
          };
        } : d = void 0;
      } else d && (d = void 0);
      return i;
    };
  }
};
function Pi(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const a of e) if (a.type !== ze) {
      t = a;
      break;
    }
  }
  return t;
}
var Ao = Mo;
function Oi(e, t) {
  const { leavingVNodes: a } = e;
  let n = a.get(t.type);
  return n || (n = /* @__PURE__ */ Object.create(null), a.set(t.type, n)), n;
}
function gs(e, t, a, n, l) {
  const { appear: i, mode: r, persisted: o = !1, onBeforeEnter: u, onEnter: p, onAfterEnter: d, onEnterCancelled: y, onBeforeLeave: w, onLeave: h, onAfterLeave: q, onLeaveCancelled: P, onBeforeAppear: R, onAppear: D, onAfterAppear: L, onAppearCancelled: A } = t, C = String(e.key), T = Oi(a, e), M = (S, G) => {
    S && vt(S, n, 9, G);
  }, $ = (S, G) => {
    const te = G[1];
    M(S, G), ie(S) ? S.every((X) => X.length <= 1) && te() : S.length <= 1 && te();
  }, _ = {
    mode: r,
    persisted: o,
    beforeEnter(S) {
      let G = u;
      if (!a.isMounted) if (i) G = R || u;
      else return;
      S[ct] && S[ct](!0);
      const te = T[C];
      te && na(e, te) && te.el[ct] && te.el[ct](), M(G, [S]);
    },
    enter(S) {
      if (T[C] === e) return;
      let G = p, te = d, X = y;
      if (!a.isMounted) if (i)
        G = D || p, te = L || d, X = A || y;
      else return;
      let W = !1;
      S[Aa] = (re) => {
        W || (W = !0, re ? M(X, [S]) : M(te, [S]), _.delayedLeave && _.delayedLeave(), S[Aa] = void 0);
      };
      const F = S[Aa].bind(null, !1);
      G ? $(G, [S, F]) : F();
    },
    leave(S, G) {
      const te = String(e.key);
      if (S[Aa] && S[Aa](!0), a.isUnmounting) return G();
      M(w, [S]);
      let X = !1;
      S[ct] = (F) => {
        X || (X = !0, G(), F ? M(P, [S]) : M(q, [S]), S[ct] = void 0, T[te] === e && delete T[te]);
      };
      const W = S[ct].bind(null, !1);
      T[te] = e, h ? $(h, [S, W]) : W();
    },
    clone(S) {
      const G = gs(S, t, a, n, l);
      return l && l(G), G;
    }
  };
  return _;
}
function Jn(e) {
  if (Hn(e))
    return e = Yt(e), e.children = null, e;
}
function ll(e) {
  if (!Hn(e))
    return Ai(e.type) && e.children ? Pi(e.children) : e;
  if (e.component) return e.component.subTree;
  const { shapeFlag: t, children: a } = e;
  if (a) {
    if (t & 16) return a[0];
    if (t & 32 && fe(a.default)) return a.default();
  }
}
function Za(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Za(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Ri(e, t = !1, a) {
  let n = [], l = 0;
  for (let i = 0; i < e.length; i++) {
    let r = e[i];
    const o = a == null ? r.key : String(a) + String(r.key != null ? r.key : i);
    r.type === J ? (r.patchFlag & 128 && l++, n = n.concat(Ri(r.children, t, o))) : (t || r.type !== ze) && n.push(o != null ? Yt(r, { key: o }) : r);
  }
  if (l > 1) for (let i = 0; i < n.length; i++) n[i].patchFlag = -2;
  return n;
}
// @__NO_SIDE_EFFECTS__
function se(e, t) {
  return fe(e) ? Oe({ name: e.name }, t, { setup: e }) : e;
}
function Bi(e) {
  e.ids = [
    e.ids[0] + e.ids[2]++ + "-",
    0,
    0
  ];
}
function il(e, t) {
  let a;
  return !!((a = Object.getOwnPropertyDescriptor(e, t)) && !a.configurable);
}
var Sn = /* @__PURE__ */ new WeakMap();
function Ha(e, t, a, n, l = !1) {
  if (ie(e)) {
    e.forEach((P, R) => Ha(P, t && (ie(t) ? t[R] : t), a, n, l));
    return;
  }
  if (ga(n) && !l) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && Ha(e, t, a, n.component.subTree);
    return;
  }
  const i = n.shapeFlag & 4 ? zn(n.component) : n.el, r = l ? null : i, { i: o, r: u } = e, p = t && t.r, d = o.refs === Se ? o.refs = {} : o.refs, y = o.setupState, w = /* @__PURE__ */ oe(y), h = y === Se ? Jl : (P) => il(d, P) ? !1 : we(w, P), q = (P, R) => !(R && il(d, R));
  if (p != null && p !== u) {
    if (rl(t), Ae(p))
      d[p] = null, h(p) && (y[p] = null);
    else if (/* @__PURE__ */ Ze(p)) {
      const P = t;
      q(p, P.k) && (p.value = null), P.k && (d[P.k] = null);
    }
  }
  if (fe(u)) nn(u, o, 12, [r, d]);
  else {
    const P = Ae(u), R = /* @__PURE__ */ Ze(u);
    if (P || R) {
      const D = () => {
        if (e.f) {
          const L = P ? h(u) ? y[u] : d[u] : q(u) || !e.k ? u.value : d[e.k];
          if (l) ie(L) && _s(L, i);
          else if (ie(L)) L.includes(i) || L.push(i);
          else if (P)
            d[u] = [i], h(u) && (y[u] = d[u]);
          else {
            const A = [i];
            q(u, e.k) && (u.value = A), e.k && (d[e.k] = A);
          }
        } else P ? (d[u] = r, h(u) && (y[u] = r)) : R && (q(u, e.k) && (u.value = r), e.k && (d[e.k] = r));
      };
      if (r) {
        const L = () => {
          D(), Sn.delete(e);
        };
        L.id = -1, Sn.set(e, L), Je(L, a);
      } else
        rl(e), D();
    }
  }
}
function rl(e) {
  const t = Sn.get(e);
  t && (t.flags |= 8, Sn.delete(e));
}
var A5 = Nn().requestIdleCallback || ((e) => setTimeout(e, 1)), I5 = Nn().cancelIdleCallback || ((e) => clearTimeout(e)), ga = (e) => !!e.type.__asyncLoader, Hn = (e) => e.type.__isKeepAlive;
function Io(e, t) {
  Li(e, "a", t);
}
function Eo(e, t) {
  Li(e, "da", t);
}
function Li(e, t, a = Ve) {
  const n = e.__wdc || (e.__wdc = () => {
    let l = a;
    for (; l; ) {
      if (l.isDeactivated) return;
      l = l.parent;
    }
    return e();
  });
  if (jn(t, n, a), a) {
    let l = a.parent;
    for (; l && l.parent; )
      Hn(l.parent.vnode) && Po(n, t, a, l), l = l.parent;
  }
}
function Po(e, t, a, n) {
  const l = jn(t, e, n, !0);
  Sa(() => {
    _s(n[t], l);
  }, a);
}
function jn(e, t, a = Ve, n = !1) {
  if (a) {
    const l = a[e] || (a[e] = []), i = t.__weh || (t.__weh = (...r) => {
      Nt();
      const o = ln(a), u = vt(t, a, e, r);
      return o(), Ut(), u;
    });
    return n ? l.unshift(i) : l.push(i), i;
  }
}
var Ht = (e) => (t, a = Ve) => {
  (!Qa || e === "sp") && jn(e, (...n) => t(...n), a);
}, Oo = Ht("bm"), at = Ht("m"), Ro = Ht("bu"), Bo = Ht("u"), ot = Ht("bum"), Sa = Ht("um"), Lo = Ht("sp"), Do = Ht("rtg"), No = Ht("rtc");
function Uo(e, t = Ve) {
  jn("ec", e, t);
}
var Di = "components", Ni = /* @__PURE__ */ Symbol.for("v-ndc");
function Fo(e) {
  return Ae(e) ? Ho(Di, e, !1) || e : e || Ni;
}
function Ho(e, t, a = !0, n = !1) {
  const l = Ue || Ve;
  if (l) {
    const i = l.type;
    if (e === Di) {
      const o = _u(i, !1);
      if (o && (o === t || o === Xe(t) || o === Ln(Xe(t)))) return i;
    }
    const r = ol(l[e] || i[e], t) || ol(l.appContext[e], t);
    return !r && n ? i : r;
  }
}
function ol(e, t) {
  return e && (e[t] || e[Xe(t)] || e[Ln(Xe(t))]);
}
function de(e, t, a, n) {
  let l;
  const i = a && a[n], r = ie(e);
  if (r || Ae(e)) {
    const o = r && /* @__PURE__ */ la(e);
    let u = !1, p = !1;
    o && (u = !/* @__PURE__ */ ft(e), p = /* @__PURE__ */ Ft(e), e = Un(e)), l = new Array(e.length);
    for (let d = 0, y = e.length; d < y; d++) l[d] = t(u ? p ? ha(gt(e[d])) : gt(e[d]) : e[d], d, void 0, i && i[d]);
  } else if (typeof e == "number") {
    l = new Array(e);
    for (let o = 0; o < e; o++) l[o] = t(o + 1, o, void 0, i && i[o]);
  } else if (Te(e)) if (e[Symbol.iterator]) l = Array.from(e, (o, u) => t(o, u, void 0, i && i[u]));
  else {
    const o = Object.keys(e);
    l = new Array(o.length);
    for (let u = 0, p = o.length; u < p; u++) {
      const d = o[u];
      l[u] = t(e[d], d, u, i && i[u]);
    }
  }
  else l = [];
  return a && (a[n] = l), l;
}
function _n(e, t, a = {}, n, l) {
  if (Ue.ce || Ue.parent && ga(Ue.parent) && Ue.parent.ce) {
    const p = Object.keys(a).length > 0;
    return t !== "default" && (a.name = t), v(), ge(J, null, [be("slot", a, n && n())], p ? -2 : 64);
  }
  let i = e[t];
  i && i._c && (i._d = !1), v();
  const r = i && Ui(i(a)), o = a.key || r && r.key, u = ge(J, { key: (o && !mt(o) ? o : `_${t}`) + (!r && n ? "_fb" : "") }, r || (n ? n() : []), r && e._ === 1 ? 64 : -2);
  return !l && u.scopeId && (u.slotScopeIds = [u.scopeId + "-s"]), i && i._c && (i._d = !0), u;
}
function Ui(e) {
  return e.some((t) => Ya(t) ? !(t.type === ze || t.type === J && !Ui(t.children)) : !0) ? e : null;
}
var bs = (e) => e ? rr(e) ? zn(e) : bs(e.parent) : null, ja = /* @__PURE__ */ Oe(/* @__PURE__ */ Object.create(null), {
  $: (e) => e,
  $el: (e) => e.vnode.el,
  $data: (e) => e.data,
  $props: (e) => e.props,
  $attrs: (e) => e.attrs,
  $slots: (e) => e.slots,
  $refs: (e) => e.refs,
  $parent: (e) => bs(e.parent),
  $root: (e) => bs(e.root),
  $host: (e) => e.ce,
  $emit: (e) => e.emit,
  $options: (e) => Ls(e),
  $forceUpdate: (e) => e.f || (e.f = () => {
    Bs(e.update);
  }),
  $nextTick: (e) => e.n || (e.n = sn.bind(e.proxy)),
  $watch: (e) => _o.bind(e)
}), es = (e, t) => e !== Se && !e.__isScriptSetup && we(e, t), jo = {
  get({ _: e }, t) {
    if (t === "__v_skip") return !0;
    const { ctx: a, setupState: n, data: l, props: i, accessCache: r, type: o, appContext: u } = e;
    if (t[0] !== "$") {
      const w = r[t];
      if (w !== void 0) switch (w) {
        case 1:
          return n[t];
        case 2:
          return l[t];
        case 4:
          return a[t];
        case 3:
          return i[t];
      }
      else {
        if (es(n, t))
          return r[t] = 1, n[t];
        if (l !== Se && we(l, t))
          return r[t] = 2, l[t];
        if (we(i, t))
          return r[t] = 3, i[t];
        if (a !== Se && we(a, t))
          return r[t] = 4, a[t];
        hs && (r[t] = 0);
      }
    }
    const p = ja[t];
    let d, y;
    if (p)
      return t === "$attrs" && Ge(e.attrs, "get", ""), p(e);
    if ((d = o.__cssModules) && (d = d[t])) return d;
    if (a !== Se && we(a, t))
      return r[t] = 4, a[t];
    if (y = u.config.globalProperties, we(y, t)) return y[t];
  },
  set({ _: e }, t, a) {
    const { data: n, setupState: l, ctx: i } = e;
    return es(l, t) ? (l[t] = a, !0) : n !== Se && we(n, t) ? (n[t] = a, !0) : we(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = a, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: a, ctx: n, appContext: l, props: i, type: r } }, o) {
    let u;
    return !!(a[o] || e !== Se && o[0] !== "$" && we(e, o) || es(t, o) || we(i, o) || we(n, o) || we(ja, o) || we(l.config.globalProperties, o) || (u = r.__cssModules) && u[o]);
  },
  defineProperty(e, t, a) {
    return a.get != null ? e._.accessCache[t] = 0 : we(a, "value") && this.set(e, t, a.value, null), Reflect.defineProperty(e, t, a);
  }
};
function ul(e) {
  return ie(e) ? e.reduce((t, a) => (t[a] = null, t), {}) : e;
}
var hs = !0;
function Ko(e) {
  const t = Ls(e), a = e.proxy, n = e.ctx;
  hs = !1, t.beforeCreate && dl(t.beforeCreate, e, "bc");
  const { data: l, computed: i, methods: r, watch: o, provide: u, inject: p, created: d, beforeMount: y, mounted: w, beforeUpdate: h, updated: q, activated: P, deactivated: R, beforeDestroy: D, beforeUnmount: L, destroyed: A, unmounted: C, render: T, renderTracked: M, renderTriggered: $, errorCaptured: _, serverPrefetch: S, expose: G, inheritAttrs: te, components: X, directives: W, filters: F } = t;
  if (p && Go(p, n, null), r) for (const pe in r) {
    const he = r[pe];
    fe(he) && (n[pe] = he.bind(a));
  }
  if (l) {
    const pe = l.call(a, a);
    Te(pe) && (e.data = /* @__PURE__ */ _t(pe));
  }
  if (hs = !0, i) for (const pe in i) {
    const he = i[pe], _e = V({
      get: fe(he) ? he.bind(a, a) : fe(he.get) ? he.get.bind(a, a) : St,
      set: !fe(he) && fe(he.set) ? he.set.bind(a) : St
    });
    Object.defineProperty(n, pe, {
      enumerable: !0,
      configurable: !0,
      get: () => _e.value,
      set: (Ee) => _e.value = Ee
    });
  }
  if (o) for (const pe in o) Fi(o[pe], n, a, pe);
  if (u) {
    const pe = fe(u) ? u.call(a) : u;
    Reflect.ownKeys(pe).forEach((he) => {
      xo(he, pe[he]);
    });
  }
  d && dl(d, e, "c");
  function ce(pe, he) {
    ie(he) ? he.forEach((_e) => pe(_e.bind(a))) : he && pe(he.bind(a));
  }
  if (ce(Oo, y), ce(at, w), ce(Ro, h), ce(Bo, q), ce(Io, P), ce(Eo, R), ce(Uo, _), ce(No, M), ce(Do, $), ce(ot, L), ce(Sa, C), ce(Lo, S), ie(G))
    if (G.length) {
      const pe = e.exposed || (e.exposed = {});
      G.forEach((he) => {
        Object.defineProperty(pe, he, {
          get: () => a[he],
          set: (_e) => a[he] = _e,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  T && e.render === St && (e.render = T), te != null && (e.inheritAttrs = te), X && (e.components = X), W && (e.directives = W), S && Bi(e);
}
function Go(e, t, a = St) {
  ie(e) && (e = ys(e));
  for (const n in e) {
    const l = e[n];
    let i;
    Te(l) ? "default" in l ? i = hn(l.from || n, l.default, !0) : i = hn(l.from || n) : i = hn(l), /* @__PURE__ */ Ze(i) ? Object.defineProperty(t, n, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (r) => i.value = r
    }) : t[n] = i;
  }
}
function dl(e, t, a) {
  vt(ie(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy), t, a);
}
function Fi(e, t, a, n) {
  let l = n.includes(".") ? Mi(a, n) : () => a[n];
  if (Ae(e)) {
    const i = t[e];
    fe(i) && et(l, i);
  } else if (fe(e)) et(l, e.bind(a));
  else if (Te(e)) if (ie(e)) e.forEach((i) => Fi(i, t, a, n));
  else {
    const i = fe(e.handler) ? e.handler.bind(a) : t[e.handler];
    fe(i) && et(l, i, e);
  }
}
function Ls(e) {
  const t = e.type, { mixins: a, extends: n } = t, { mixins: l, optionsCache: i, config: { optionMergeStrategies: r } } = e.appContext, o = i.get(t);
  let u;
  return o ? u = o : !l.length && !a && !n ? u = t : (u = {}, l.length && l.forEach((p) => qn(u, p, r, !0)), qn(u, t, r)), Te(t) && i.set(t, u), u;
}
function qn(e, t, a, n = !1) {
  const { mixins: l, extends: i } = t;
  i && qn(e, i, a, !0), l && l.forEach((r) => qn(e, r, a, !0));
  for (const r in t) if (!(n && r === "expose")) {
    const o = zo[r] || a && a[r];
    e[r] = o ? o(e[r], t[r]) : t[r];
  }
  return e;
}
var zo = {
  data: cl,
  props: fl,
  emits: fl,
  methods: Ba,
  computed: Ba,
  beforeCreate: Ye,
  created: Ye,
  beforeMount: Ye,
  mounted: Ye,
  beforeUpdate: Ye,
  updated: Ye,
  beforeDestroy: Ye,
  beforeUnmount: Ye,
  destroyed: Ye,
  unmounted: Ye,
  activated: Ye,
  deactivated: Ye,
  errorCaptured: Ye,
  serverPrefetch: Ye,
  components: Ba,
  directives: Ba,
  watch: Zo,
  provide: cl,
  inject: Vo
};
function cl(e, t) {
  return t ? e ? function() {
    return Oe(fe(e) ? e.call(this, this) : e, fe(t) ? t.call(this, this) : t);
  } : t : e;
}
function Vo(e, t) {
  return Ba(ys(e), ys(t));
}
function ys(e) {
  if (ie(e)) {
    const t = {};
    for (let a = 0; a < e.length; a++) t[e[a]] = e[a];
    return t;
  }
  return e;
}
function Ye(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Ba(e, t) {
  return e ? Oe(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function fl(e, t) {
  return e ? ie(e) && ie(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Oe(/* @__PURE__ */ Object.create(null), ul(e), ul(t ?? {})) : t;
}
function Zo(e, t) {
  if (!e) return t;
  if (!t) return e;
  const a = Oe(/* @__PURE__ */ Object.create(null), e);
  for (const n in t) a[n] = Ye(e[n], t[n]);
  return a;
}
function Hi() {
  return {
    app: null,
    config: {
      isNativeTag: Jl,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
var Wo = 0;
function Yo(e, t) {
  return function(n, l = null) {
    fe(n) || (n = Oe({}, n)), l != null && !Te(l) && (l = null);
    const i = Hi(), r = /* @__PURE__ */ new WeakSet(), o = [];
    let u = !1;
    const p = i.app = {
      _uid: Wo++,
      _component: n,
      _props: l,
      _container: null,
      _context: i,
      _instance: null,
      version: Mu,
      get config() {
        return i.config;
      },
      set config(d) {
      },
      use(d, ...y) {
        return r.has(d) || (d && fe(d.install) ? (r.add(d), d.install(p, ...y)) : fe(d) && (r.add(d), d(p, ...y))), p;
      },
      mixin(d) {
        return i.mixins.includes(d) || i.mixins.push(d), p;
      },
      component(d, y) {
        return y ? (i.components[d] = y, p) : i.components[d];
      },
      directive(d, y) {
        return y ? (i.directives[d] = y, p) : i.directives[d];
      },
      mount(d, y, w) {
        if (!u) {
          const h = p._ceVNode || be(n, l);
          return h.appContext = i, w === !0 ? w = "svg" : w === !1 && (w = void 0), y && t ? t(h, d) : e(h, d, w), u = !0, p._container = d, d.__vue_app__ = p, zn(h.component);
        }
      },
      onUnmount(d) {
        o.push(d);
      },
      unmount() {
        u && (vt(o, p._instance, 16), e(null, p._container), delete p._container.__vue_app__);
      },
      provide(d, y) {
        return i.provides[d] = y, p;
      },
      runWithContext(d) {
        const y = ba;
        ba = p;
        try {
          return d();
        } finally {
          ba = y;
        }
      }
    };
    return p;
  };
}
var ba = null, Qo = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Xe(t)}Modifiers`] || e[`${Qt(t)}Modifiers`];
function Xo(e, t, ...a) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || Se;
  let l = a;
  const i = t.startsWith("update:"), r = i && Qo(n, t.slice(7));
  r && (r.trim && (l = a.map((d) => Ae(d) ? d.trim() : d)), r.number && (l = a.map(Dn)));
  let o, u = n[o = Zn(t)] || n[o = Zn(Xe(t))];
  !u && i && (u = n[o = Zn(Qt(t))]), u && vt(u, e, 6, l);
  const p = n[o + "Once"];
  if (p) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[o]) return;
    e.emitted[o] = !0, vt(p, e, 6, l);
  }
}
var Jo = /* @__PURE__ */ new WeakMap();
function ji(e, t, a = !1) {
  const n = a ? Jo : t.emitsCache, l = n.get(e);
  if (l !== void 0) return l;
  const i = e.emits;
  let r = {}, o = !1;
  if (!fe(e)) {
    const u = (p) => {
      const d = ji(p, t, !0);
      d && (o = !0, Oe(r, d));
    };
    !a && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  return !i && !o ? (Te(e) && n.set(e, null), null) : (ie(i) ? i.forEach((u) => r[u] = null) : Oe(r, i), Te(e) && n.set(e, r), r);
}
function Kn(e, t) {
  return !e || !On(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), we(e, t[0].toLowerCase() + t.slice(1)) || we(e, Qt(t)) || we(e, t));
}
function ts(e) {
  const { type: t, vnode: a, proxy: n, withProxy: l, propsOptions: [i], slots: r, attrs: o, emit: u, render: p, renderCache: d, props: y, data: w, setupState: h, ctx: q, inheritAttrs: P } = e, R = $n(e);
  let D, L;
  try {
    if (a.shapeFlag & 4) {
      const C = l || n, T = C;
      D = xt(p.call(T, C, d, y, h, w, q)), L = o;
    } else {
      const C = t;
      D = xt(C.length > 1 ? C(y, {
        attrs: o,
        slots: r,
        emit: u
      }) : C(y, null)), L = t.props ? o : eu(o);
    }
  } catch (C) {
    Ka.length = 0, Fn(C, e, 1), D = be(ze);
  }
  let A = D;
  if (L && P !== !1) {
    const C = Object.keys(L), { shapeFlag: T } = A;
    C.length && T & 7 && (i && C.some(Rn) && (L = tu(L, i)), A = Yt(A, L, !1, !0));
  }
  return a.dirs && (A = Yt(A, null, !1, !0), A.dirs = A.dirs ? A.dirs.concat(a.dirs) : a.dirs), a.transition && Za(A, a.transition), D = A, $n(R), D;
}
var eu = (e) => {
  let t;
  for (const a in e) (a === "class" || a === "style" || On(a)) && ((t || (t = {}))[a] = e[a]);
  return t;
}, tu = (e, t) => {
  const a = {};
  for (const n in e) (!Rn(n) || !(n.slice(9) in t)) && (a[n] = e[n]);
  return a;
};
function au(e, t, a) {
  const { props: n, children: l, component: i } = e, { props: r, children: o, patchFlag: u } = t, p = i.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (a && u >= 0) {
    if (u & 1024) return !0;
    if (u & 16)
      return n ? vl(n, r, p) : !!r;
    if (u & 8) {
      const d = t.dynamicProps;
      for (let y = 0; y < d.length; y++) {
        const w = d[y];
        if (Ki(r, n, w) && !Kn(p, w)) return !0;
      }
    }
  } else
    return (l || o) && (!o || !o.$stable) ? !0 : n === r ? !1 : n ? r ? vl(n, r, p) : !0 : !!r;
  return !1;
}
function vl(e, t, a) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length) return !0;
  for (let l = 0; l < n.length; l++) {
    const i = n[l];
    if (Ki(t, e, i) && !Kn(a, i)) return !0;
  }
  return !1;
}
function Ki(e, t, a) {
  const n = e[a], l = t[a];
  return a === "style" && Te(n) && Te(l) ? !$a(n, l) : n !== l;
}
function nu({ vnode: e, parent: t, suspense: a }, n) {
  for (; t; ) {
    const l = t.subTree;
    if (l.suspense && l.suspense.activeBranch === e && (l.suspense.vnode.el = l.el = n, e = l), l === e)
      (e = t.vnode).el = n, t = t.parent;
    else break;
  }
  a && a.activeBranch === e && (a.vnode.el = n);
}
var Gi = {}, zi = () => Object.create(Gi), Vi = (e) => Object.getPrototypeOf(e) === Gi;
function su(e, t, a, n = !1) {
  const l = {}, i = zi();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Zi(e, t, l, i);
  for (const r in e.propsOptions[0]) r in l || (l[r] = void 0);
  a ? e.props = n ? l : /* @__PURE__ */ co(l) : e.type.props ? e.props = l : e.props = i, e.attrs = i;
}
function lu(e, t, a, n) {
  const { props: l, attrs: i, vnode: { patchFlag: r } } = e, o = /* @__PURE__ */ oe(l), [u] = e.propsOptions;
  let p = !1;
  if ((n || r > 0) && !(r & 16)) {
    if (r & 8) {
      const d = e.vnode.dynamicProps;
      for (let y = 0; y < d.length; y++) {
        let w = d[y];
        if (Kn(e.emitsOptions, w)) continue;
        const h = t[w];
        if (u) if (we(i, w))
          h !== i[w] && (i[w] = h, p = !0);
        else {
          const q = Xe(w);
          l[q] = ks(u, o, q, h, e, !1);
        }
        else h !== i[w] && (i[w] = h, p = !0);
      }
    }
  } else {
    Zi(e, t, l, i) && (p = !0);
    let d;
    for (const y in o) (!t || !we(t, y) && ((d = Qt(y)) === y || !we(t, d))) && (u ? a && (a[y] !== void 0 || a[d] !== void 0) && (l[y] = ks(u, o, y, void 0, e, !0)) : delete l[y]);
    if (i !== o)
      for (const y in i) (!t || !we(t, y)) && (delete i[y], p = !0);
  }
  p && Rt(e.attrs, "set", "");
}
function Zi(e, t, a, n) {
  const [l, i] = e.propsOptions;
  let r = !1, o;
  if (t) for (let u in t) {
    if (Na(u)) continue;
    const p = t[u];
    let d;
    l && we(l, d = Xe(u)) ? !i || !i.includes(d) ? a[d] = p : (o || (o = {}))[d] = p : Kn(e.emitsOptions, u) || (!(u in n) || p !== n[u]) && (n[u] = p, r = !0);
  }
  if (i) {
    const u = /* @__PURE__ */ oe(a), p = o || Se;
    for (let d = 0; d < i.length; d++) {
      const y = i[d];
      a[y] = ks(l, u, y, p[y], e, !we(p, y));
    }
  }
  return r;
}
function ks(e, t, a, n, l, i) {
  const r = e[a];
  if (r != null) {
    const o = we(r, "default");
    if (o && n === void 0) {
      const u = r.default;
      if (r.type !== Function && !r.skipFactory && fe(u)) {
        const { propsDefaults: p } = l;
        if (a in p) n = p[a];
        else {
          const d = ln(l);
          n = p[a] = u.call(null, t), d();
        }
      } else n = u;
      l.ce && l.ce._setProp(a, n);
    }
    r[0] && (i && !o ? n = !1 : r[1] && (n === "" || n === Qt(a)) && (n = !0));
  }
  return n;
}
var iu = /* @__PURE__ */ new WeakMap();
function Wi(e, t, a = !1) {
  const n = a ? iu : t.propsCache, l = n.get(e);
  if (l) return l;
  const i = e.props, r = {}, o = [];
  let u = !1;
  if (!fe(e)) {
    const d = (y) => {
      u = !0;
      const [w, h] = Wi(y, t, !0);
      Oe(r, w), h && o.push(...h);
    };
    !a && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  if (!i && !u)
    return Te(e) && n.set(e, va), va;
  if (ie(i)) for (let d = 0; d < i.length; d++) {
    const y = Xe(i[d]);
    pl(y) && (r[y] = Se);
  }
  else if (i) for (const d in i) {
    const y = Xe(d);
    if (pl(y)) {
      const w = i[d], h = r[y] = ie(w) || fe(w) ? { type: w } : Oe({}, w), q = h.type;
      let P = !1, R = !0;
      if (ie(q)) for (let D = 0; D < q.length; ++D) {
        const L = q[D], A = fe(L) && L.name;
        if (A === "Boolean") {
          P = !0;
          break;
        } else A === "String" && (R = !1);
      }
      else P = fe(q) && q.name === "Boolean";
      h[0] = P, h[1] = R, (P || we(h, "default")) && o.push(y);
    }
  }
  const p = [r, o];
  return Te(e) && n.set(e, p), p;
}
function pl(e) {
  return e[0] !== "$" && !Na(e);
}
var Ds = (e) => e === "_" || e === "_ctx" || e === "$stable", Ns = (e) => ie(e) ? e.map(xt) : [xt(e)], ru = (e, t, a) => {
  if (t._n) return t;
  const n = ia((...l) => Ns(t(...l)), a);
  return n._c = !1, n;
}, Yi = (e, t, a) => {
  const n = e._ctx;
  for (const l in e) {
    if (Ds(l)) continue;
    const i = e[l];
    if (fe(i)) t[l] = ru(l, i, n);
    else if (i != null) {
      const r = Ns(i);
      t[l] = () => r;
    }
  }
}, Qi = (e, t) => {
  const a = Ns(t);
  e.slots.default = () => a;
}, Xi = (e, t, a) => {
  for (const n in t) (a || !Ds(n)) && (e[n] = t[n]);
}, ou = (e, t, a) => {
  const n = e.slots = zi();
  if (e.vnode.shapeFlag & 32) {
    const l = t._;
    l ? (Xi(n, t, a), a && ni(n, "_", l, !0)) : Yi(t, n);
  } else t && Qi(e, t);
}, uu = (e, t, a) => {
  const { vnode: n, slots: l } = e;
  let i = !0, r = Se;
  if (n.shapeFlag & 32) {
    const o = t._;
    o ? a && o === 1 ? i = !1 : Xi(l, t, a) : (i = !t.$stable, Yi(t, l)), r = t;
  } else t && (Qi(e, t), r = { default: 1 });
  if (i)
    for (const o in l) !Ds(o) && r[o] == null && delete l[o];
}, Je = pu;
function du(e) {
  return cu(e);
}
function cu(e, t) {
  const a = Nn();
  a.__VUE__ = !0;
  const { insert: n, remove: l, patchProp: i, createElement: r, createText: o, createComment: u, setText: p, setElementText: d, parentNode: y, nextSibling: w, setScopeId: h = St, insertStaticContent: q } = e, P = (f, m, x, E = null, N = null, B = null, I = void 0, k = null, O = !!m.dynamicChildren) => {
    if (f === m) return;
    f && !na(f, m) && (E = j(f), Be(f, N, B, !0), f = null), m.patchFlag === -2 && (O = !1, m.dynamicChildren = null);
    const { type: U, ref: Q, shapeFlag: z } = m;
    switch (U) {
      case Gn:
        R(f, m, x, E);
        break;
      case ze:
        D(f, m, x, E);
        break;
      case yn:
        f == null && L(m, x, E, I);
        break;
      case J:
        X(f, m, x, E, N, B, I, k, O);
        break;
      default:
        z & 1 ? T(f, m, x, E, N, B, I, k, O) : z & 6 ? W(f, m, x, E, N, B, I, k, O) : (z & 64 || z & 128) && U.process(f, m, x, E, N, B, I, k, O, Pe);
    }
    Q != null && N ? Ha(Q, f && f.ref, B, m || f, !m) : Q == null && f && f.ref != null && Ha(f.ref, null, B, f, !0);
  }, R = (f, m, x, E) => {
    if (f == null) n(m.el = o(m.children), x, E);
    else {
      const N = m.el = f.el;
      m.children !== f.children && p(N, m.children);
    }
  }, D = (f, m, x, E) => {
    f == null ? n(m.el = u(m.children || ""), x, E) : m.el = f.el;
  }, L = (f, m, x, E) => {
    [f.el, f.anchor] = q(f.children, m, x, E, f.el, f.anchor);
  }, A = ({ el: f, anchor: m }, x, E) => {
    let N;
    for (; f && f !== m; )
      N = w(f), n(f, x, E), f = N;
    n(m, x, E);
  }, C = ({ el: f, anchor: m }) => {
    let x;
    for (; f && f !== m; )
      x = w(f), l(f), f = x;
    l(m);
  }, T = (f, m, x, E, N, B, I, k, O) => {
    if (m.type === "svg" ? I = "svg" : m.type === "math" && (I = "mathml"), f == null) M(m, x, E, N, B, I, k, O);
    else {
      const U = f.el && f.el._isVueCE ? f.el : null;
      try {
        U && U._beginPatch(), S(f, m, N, B, I, k, O);
      } finally {
        U && U._endPatch();
      }
    }
  }, M = (f, m, x, E, N, B, I, k) => {
    let O, U;
    const { props: Q, shapeFlag: z, transition: ee, dirs: ne } = f;
    if (O = f.el = r(f.type, B, Q && Q.is, Q), z & 8 ? d(O, f.children) : z & 16 && _(f.children, O, null, E, N, as(f, B), I, k), ne && Xt(f, null, E, "created"), $(O, f, f.scopeId, I, E), Q) {
      for (const ye in Q) ye !== "value" && !Na(ye) && i(O, ye, null, Q[ye], B, E);
      "value" in Q && i(O, "value", null, Q.value, B), (U = Q.onVnodeBeforeMount) && ht(U, E, f);
    }
    ne && Xt(f, null, E, "beforeMount");
    const ve = fu(N, ee);
    ve && ee.beforeEnter(O), n(O, m, x), ((U = Q && Q.onVnodeMounted) || ve || ne) && Je(() => {
      U && ht(U, E, f), ve && ee.enter(O), ne && Xt(f, null, E, "mounted");
    }, N);
  }, $ = (f, m, x, E, N) => {
    if (x && h(f, x), E) for (let B = 0; B < E.length; B++) h(f, E[B]);
    if (N) {
      let B = N.subTree;
      if (m === B || ar(B.type) && (B.ssContent === m || B.ssFallback === m)) {
        const I = N.vnode;
        $(f, I, I.scopeId, I.slotScopeIds, N.parent);
      }
    }
  }, _ = (f, m, x, E, N, B, I, k, O = 0) => {
    for (let U = O; U < f.length; U++) P(null, f[U] = k ? Ot(f[U]) : xt(f[U]), m, x, E, N, B, I, k);
  }, S = (f, m, x, E, N, B, I) => {
    const k = m.el = f.el;
    let { patchFlag: O, dynamicChildren: U, dirs: Q } = m;
    O |= f.patchFlag & 16;
    const z = f.props || Se, ee = m.props || Se;
    let ne;
    if (x && Jt(x, !1), (ne = ee.onVnodeBeforeUpdate) && ht(ne, x, m, f), Q && Xt(m, f, x, "beforeUpdate"), x && Jt(x, !0), (z.innerHTML && ee.innerHTML == null || z.textContent && ee.textContent == null) && d(k, ""), U ? G(f.dynamicChildren, U, k, x, E, as(m, N), B) : I || he(f, m, k, null, x, E, as(m, N), B, !1), O > 0) {
      if (O & 16) te(k, z, ee, x, N);
      else if (O & 2 && z.class !== ee.class && i(k, "class", null, ee.class, N), O & 4 && i(k, "style", z.style, ee.style, N), O & 8) {
        const ve = m.dynamicProps;
        for (let ye = 0; ye < ve.length; ye++) {
          const ke = ve[ye], xe = z[ke], $e = ee[ke];
          ($e !== xe || ke === "value") && i(k, ke, xe, $e, N, x);
        }
      }
      O & 1 && f.children !== m.children && d(k, m.children);
    } else !I && U == null && te(k, z, ee, x, N);
    ((ne = ee.onVnodeUpdated) || Q) && Je(() => {
      ne && ht(ne, x, m, f), Q && Xt(m, f, x, "updated");
    }, E);
  }, G = (f, m, x, E, N, B, I) => {
    for (let k = 0; k < m.length; k++) {
      const O = f[k], U = m[k];
      P(O, U, O.el && (O.type === J || !na(O, U) || O.shapeFlag & 198) ? y(O.el) : x, null, E, N, B, I, !0);
    }
  }, te = (f, m, x, E, N) => {
    if (m !== x) {
      if (m !== Se)
        for (const B in m) !Na(B) && !(B in x) && i(f, B, m[B], null, N, E);
      for (const B in x) {
        if (Na(B)) continue;
        const I = x[B], k = m[B];
        I !== k && B !== "value" && i(f, B, k, I, N, E);
      }
      "value" in x && i(f, "value", m.value, x.value, N);
    }
  }, X = (f, m, x, E, N, B, I, k, O) => {
    const U = m.el = f ? f.el : o(""), Q = m.anchor = f ? f.anchor : o("");
    let { patchFlag: z, dynamicChildren: ee, slotScopeIds: ne } = m;
    ne && (k = k ? k.concat(ne) : ne), f == null ? (n(U, x, E), n(Q, x, E), _(m.children || [], x, Q, N, B, I, k, O)) : z > 0 && z & 64 && ee && f.dynamicChildren && f.dynamicChildren.length === ee.length ? (G(f.dynamicChildren, ee, x, N, B, I, k), (m.key != null || N && m === N.subTree) && Ji(f, m, !0)) : he(f, m, x, Q, N, B, I, k, O);
  }, W = (f, m, x, E, N, B, I, k, O) => {
    m.slotScopeIds = k, f == null ? m.shapeFlag & 512 ? N.ctx.activate(m, x, E, I, O) : F(m, x, E, N, B, I, O) : re(f, m, O);
  }, F = (f, m, x, E, N, B, I) => {
    const k = f.component = wu(f, E, N);
    if (Hn(f) && (k.ctx.renderer = Pe), Tu(k, !1, I), k.asyncDep) {
      if (N && N.registerDep(k, ce, I), !f.el) {
        const O = k.subTree = be(ze);
        D(null, O, m, x), f.placeholder = O.el;
      }
    } else ce(k, f, m, x, N, B, I);
  }, re = (f, m, x) => {
    const E = m.component = f.component;
    if (au(f, m, x)) if (E.asyncDep && !E.asyncResolved) {
      pe(E, m, x);
      return;
    } else
      E.next = m, E.update();
    else
      m.el = f.el, E.vnode = m;
  }, ce = (f, m, x, E, N, B, I) => {
    const k = () => {
      if (f.isMounted) {
        let { next: z, bu: ee, u: ne, parent: ve, vnode: ye } = f;
        {
          const Fe = er(f);
          if (Fe) {
            z && (z.el = ye.el, pe(f, z, I)), Fe.asyncDep.then(() => {
              Je(() => {
                f.isUnmounted || U();
              }, N);
            });
            return;
          }
        }
        let ke = z, xe;
        Jt(f, !1), z ? (z.el = ye.el, pe(f, z, I)) : z = ye, ee && bn(ee), (xe = z.props && z.props.onVnodeBeforeUpdate) && ht(xe, ve, z, ye), Jt(f, !0);
        const $e = ts(f), We = f.subTree;
        f.subTree = $e, P(We, $e, y(We.el), j(We), f, N, B), z.el = $e.el, ke === null && nu(f, $e.el), ne && Je(ne, N), (xe = z.props && z.props.onVnodeUpdated) && Je(() => ht(xe, ve, z, ye), N);
      } else {
        let z;
        const { el: ee, props: ne } = m, { bm: ve, m: ye, parent: ke, root: xe, type: $e } = f, We = ga(m);
        if (Jt(f, !1), ve && bn(ve), !We && (z = ne && ne.onVnodeBeforeMount) && ht(z, ke, m), Jt(f, !0), ee && c) {
          const Fe = () => {
            f.subTree = ts(f), c(ee, f.subTree, f, N, null);
          };
          We && $e.__asyncHydrate ? $e.__asyncHydrate(ee, f, Fe) : Fe();
        } else {
          xe.ce && xe.ce._hasShadowRoot() && xe.ce._injectChildStyle($e, f.parent ? f.parent.type : void 0);
          const Fe = f.subTree = ts(f);
          P(null, Fe, x, E, f, N, B), m.el = Fe.el;
        }
        if (ye && Je(ye, N), !We && (z = ne && ne.onVnodeMounted)) {
          const Fe = m;
          Je(() => ht(z, ke, Fe), N);
        }
        (m.shapeFlag & 256 || ke && ga(ke.vnode) && ke.vnode.shapeFlag & 256) && f.a && Je(f.a, N), f.isMounted = !0, m = x = E = null;
      }
    };
    f.scope.on();
    const O = f.effect = new oi(k);
    f.scope.off();
    const U = f.update = O.run.bind(O), Q = f.job = O.runIfDirty.bind(O);
    Q.i = f, Q.id = f.uid, O.scheduler = () => Bs(Q), Jt(f, !0), U();
  }, pe = (f, m, x) => {
    m.component = f;
    const E = f.vnode.props;
    f.vnode = m, f.next = null, lu(f, m.props, E, x), uu(f, m.children, x), Nt(), sl(f), Ut();
  }, he = (f, m, x, E, N, B, I, k, O = !1) => {
    const U = f && f.children, Q = f ? f.shapeFlag : 0, z = m.children, { patchFlag: ee, shapeFlag: ne } = m;
    if (ee > 0) {
      if (ee & 128) {
        Ee(U, z, x, E, N, B, I, k, O);
        return;
      } else if (ee & 256) {
        _e(U, z, x, E, N, B, I, k, O);
        return;
      }
    }
    ne & 8 ? (Q & 16 && Z(U, N, B), z !== U && d(x, z)) : Q & 16 ? ne & 16 ? Ee(U, z, x, E, N, B, I, k, O) : Z(U, N, B, !0) : (Q & 8 && d(x, ""), ne & 16 && _(z, x, E, N, B, I, k, O));
  }, _e = (f, m, x, E, N, B, I, k, O) => {
    f = f || va, m = m || va;
    const U = f.length, Q = m.length, z = Math.min(U, Q);
    let ee;
    for (ee = 0; ee < z; ee++) {
      const ne = m[ee] = O ? Ot(m[ee]) : xt(m[ee]);
      P(f[ee], ne, x, null, N, B, I, k, O);
    }
    U > Q ? Z(f, N, B, !0, !1, z) : _(m, x, E, N, B, I, k, O, z);
  }, Ee = (f, m, x, E, N, B, I, k, O) => {
    let U = 0;
    const Q = m.length;
    let z = f.length - 1, ee = Q - 1;
    for (; U <= z && U <= ee; ) {
      const ne = f[U], ve = m[U] = O ? Ot(m[U]) : xt(m[U]);
      if (na(ne, ve)) P(ne, ve, x, null, N, B, I, k, O);
      else break;
      U++;
    }
    for (; U <= z && U <= ee; ) {
      const ne = f[z], ve = m[ee] = O ? Ot(m[ee]) : xt(m[ee]);
      if (na(ne, ve)) P(ne, ve, x, null, N, B, I, k, O);
      else break;
      z--, ee--;
    }
    if (U > z) {
      if (U <= ee) {
        const ne = ee + 1, ve = ne < Q ? m[ne].el : E;
        for (; U <= ee; )
          P(null, m[U] = O ? Ot(m[U]) : xt(m[U]), x, ve, N, B, I, k, O), U++;
      }
    } else if (U > ee) for (; U <= z; )
      Be(f[U], N, B, !0), U++;
    else {
      const ne = U, ve = U, ye = /* @__PURE__ */ new Map();
      for (U = ve; U <= ee; U++) {
        const He = m[U] = O ? Ot(m[U]) : xt(m[U]);
        He.key != null && ye.set(He.key, U);
      }
      let ke, xe = 0;
      const $e = ee - ve + 1;
      let We = !1, Fe = 0;
      const jt = new Array($e);
      for (U = 0; U < $e; U++) jt[U] = 0;
      for (U = ne; U <= z; U++) {
        const He = f[U];
        if (xe >= $e) {
          Be(He, N, B, !0);
          continue;
        }
        let st;
        if (He.key != null) st = ye.get(He.key);
        else for (ke = ve; ke <= ee; ke++) if (jt[ke - ve] === 0 && na(He, m[ke])) {
          st = ke;
          break;
        }
        st === void 0 ? Be(He, N, B, !0) : (jt[st - ve] = U + 1, st >= Fe ? Fe = st : We = !0, P(He, m[st], x, null, N, B, I, k, O), xe++);
      }
      const qa = We ? vu(jt) : va;
      for (ke = qa.length - 1, U = $e - 1; U >= 0; U--) {
        const He = ve + U, st = m[He], ra = m[He + 1], Ca = He + 1 < Q ? ra.el || tr(ra) : E;
        jt[U] === 0 ? P(null, st, x, Ca, N, B, I, k, O) : We && (ke < 0 || U !== qa[ke] ? nt(st, x, Ca, 2) : ke--);
      }
    }
  }, nt = (f, m, x, E, N = null) => {
    const { el: B, type: I, transition: k, children: O, shapeFlag: U } = f;
    if (U & 6) {
      nt(f.component.subTree, m, x, E);
      return;
    }
    if (U & 128) {
      f.suspense.move(m, x, E);
      return;
    }
    if (U & 64) {
      I.move(f, m, x, Pe);
      return;
    }
    if (I === J) {
      n(B, m, x);
      for (let Q = 0; Q < O.length; Q++) nt(O[Q], m, x, E);
      n(f.anchor, m, x);
      return;
    }
    if (I === yn) {
      A(f, m, x);
      return;
    }
    if (E !== 2 && U & 1 && k) if (E === 0) k.persisted && !B[ct] ? n(B, m, x) : (k.beforeEnter(B), n(B, m, x), Je(() => k.enter(B), N));
    else {
      const { leave: Q, delayLeave: z, afterLeave: ee } = k, ne = () => {
        f.ctx.isUnmounted ? l(B) : n(B, m, x);
      }, ve = () => {
        const ye = B._isLeaving || !!B[ct];
        B._isLeaving && B[ct](!0), k.persisted && !ye ? ne() : Q(B, () => {
          ne(), ee && ee();
        });
      };
      z ? z(B, ne, ve) : ve();
    }
    else n(B, m, x);
  }, Be = (f, m, x, E = !1, N = !1) => {
    const { type: B, props: I, ref: k, children: O, dynamicChildren: U, shapeFlag: Q, patchFlag: z, dirs: ee, cacheIndex: ne, memo: ve } = f;
    if (z === -2 && (N = !1), k != null && (Nt(), Ha(k, null, x, f, !0), Ut()), ne != null && (m.renderCache[ne] = void 0), Q & 256) {
      m.ctx.deactivate(f);
      return;
    }
    const ye = Q & 1 && ee, ke = !ga(f);
    let xe;
    if (ke && (xe = I && I.onVnodeBeforeUnmount) && ht(xe, m, f), Q & 6) bt(f.component, x, E);
    else {
      if (Q & 128) {
        f.suspense.unmount(x, E);
        return;
      }
      ye && Xt(f, null, m, "beforeUnmount"), Q & 64 ? f.type.remove(f, m, x, Pe, E) : U && !U.hasOnce && (B !== J || z > 0 && z & 64) ? Z(U, m, x, !1, !0) : (B === J && z & 384 || !N && Q & 16) && Z(O, m, x), E && Le(f);
    }
    const $e = ve != null && ne == null;
    (ke && (xe = I && I.onVnodeUnmounted) || ye || $e) && Je(() => {
      xe && ht(xe, m, f), ye && Xt(f, null, m, "unmounted"), $e && (f.el = null);
    }, x);
  }, Le = (f) => {
    const { type: m, el: x, anchor: E, transition: N } = f;
    if (m === J) {
      Mt(x, E);
      return;
    }
    if (m === yn) {
      C(f);
      return;
    }
    const B = () => {
      l(x), N && !N.persisted && N.afterLeave && N.afterLeave();
    };
    if (f.shapeFlag & 1 && N && !N.persisted) {
      const { leave: I, delayLeave: k } = N, O = () => I(x, B);
      k ? k(f.el, B, O) : O();
    } else B();
  }, Mt = (f, m) => {
    let x;
    for (; f !== m; )
      x = w(f), l(f), f = x;
    l(m);
  }, bt = (f, m, x) => {
    const { bum: E, scope: N, job: B, subTree: I, um: k, m: O, a: U } = f;
    ml(O), ml(U), E && bn(E), N.stop(), B && (B.flags |= 8, Be(I, f, m, x)), k && Je(k, m), Je(() => {
      f.isUnmounted = !0;
    }, m);
  }, Z = (f, m, x, E = !1, N = !1, B = 0) => {
    for (let I = B; I < f.length; I++) Be(f[I], m, x, E, N);
  }, j = (f) => {
    if (f.shapeFlag & 6) return j(f.component.subTree);
    if (f.shapeFlag & 128) return f.suspense.next();
    const m = w(f.anchor || f.el), x = m && m[qo];
    return x ? w(x) : m;
  };
  let le = !1;
  const Ie = (f, m, x) => {
    let E;
    f == null ? m._vnode && (Be(m._vnode, null, null, !0), E = m._vnode.component) : P(m._vnode || null, f, m, null, null, null, x), m._vnode = f, le || (le = !0, sl(E), Si(), le = !1);
  }, Pe = {
    p: P,
    um: Be,
    m: nt,
    r: Le,
    mt: F,
    mc: _,
    pc: he,
    pbc: G,
    n: j,
    o: e
  };
  let Y, c;
  return t && ([Y, c] = t(Pe)), {
    render: Ie,
    hydrate: Y,
    createApp: Yo(Ie, Y)
  };
}
function as({ type: e, props: t }, a) {
  return a === "svg" && e === "foreignObject" || a === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : a;
}
function Jt({ effect: e, job: t }, a) {
  a ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function fu(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Ji(e, t, a = !1) {
  const n = e.children, l = t.children;
  if (ie(n) && ie(l)) for (let i = 0; i < n.length; i++) {
    const r = n[i];
    let o = l[i];
    o.shapeFlag & 1 && !o.dynamicChildren && ((o.patchFlag <= 0 || o.patchFlag === 32) && (o = l[i] = Ot(l[i]), o.el = r.el), !a && o.patchFlag !== -2 && Ji(r, o)), o.type === Gn && (o.patchFlag === -1 && (o = l[i] = Ot(o)), o.el = r.el), o.type === ze && !o.el && (o.el = r.el);
  }
}
function vu(e) {
  const t = e.slice(), a = [0];
  let n, l, i, r, o;
  const u = e.length;
  for (n = 0; n < u; n++) {
    const p = e[n];
    if (p !== 0) {
      if (l = a[a.length - 1], e[l] < p) {
        t[n] = l, a.push(n);
        continue;
      }
      for (i = 0, r = a.length - 1; i < r; )
        o = i + r >> 1, e[a[o]] < p ? i = o + 1 : r = o;
      p < e[a[i]] && (i > 0 && (t[n] = a[i - 1]), a[i] = n);
    }
  }
  for (i = a.length, r = a[i - 1]; i-- > 0; )
    a[i] = r, r = t[r];
  return a;
}
function er(e) {
  const t = e.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : er(t);
}
function ml(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function tr(e) {
  if (e.placeholder) return e.placeholder;
  const t = e.component;
  return t ? tr(t.subTree) : null;
}
var ar = (e) => e.__isSuspense;
function pu(e, t) {
  t && t.pendingBranch ? ie(e) ? t.effects.push(...e) : t.effects.push(e) : To(e);
}
var J = /* @__PURE__ */ Symbol.for("v-fgt"), Gn = /* @__PURE__ */ Symbol.for("v-txt"), ze = /* @__PURE__ */ Symbol.for("v-cmt"), yn = /* @__PURE__ */ Symbol.for("v-stc"), Ka = [], rt = null;
function v(e = !1) {
  Ka.push(rt = e ? null : []);
}
function mu() {
  Ka.pop(), rt = Ka[Ka.length - 1] || null;
}
var Wa = 1;
function Cn(e, t = !1) {
  Wa += e, e < 0 && rt && t && (rt.hasOnce = !0);
}
function nr(e) {
  return e.dynamicChildren = Wa > 0 ? rt || va : null, mu(), Wa > 0 && rt && rt.push(e), e;
}
function b(e, t, a, n, l, i) {
  return nr(s(e, t, a, n, l, i, !0));
}
function ge(e, t, a, n, l) {
  return nr(be(e, t, a, n, l, !0));
}
function Ya(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function na(e, t) {
  return e.type === t.type && e.key === t.key;
}
var sr = ({ key: e }) => e ?? null, kn = ({ ref: e, ref_key: t, ref_for: a }) => (typeof e == "number" && (e = "" + e), e != null ? Ae(e) || /* @__PURE__ */ Ze(e) || fe(e) ? {
  i: Ue,
  r: e,
  k: t,
  f: !!a
} : e : null);
function s(e, t = null, a = null, n = 0, l = null, i = e === J ? 0 : 1, r = !1, o = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && sr(t),
    ref: t && kn(t),
    scopeId: qi,
    slotScopeIds: null,
    children: a,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: n,
    dynamicProps: l,
    dynamicChildren: null,
    appContext: null,
    ctx: Ue
  };
  return o ? (Us(u, a), i & 128 && e.normalize(u)) : a && (u.shapeFlag |= Ae(a) ? 8 : 16), Wa > 0 && !r && rt && (u.patchFlag > 0 || i & 6) && u.patchFlag !== 32 && rt.push(u), u;
}
var be = gu;
function gu(e, t = null, a = null, n = 0, l = null, i = !1) {
  if ((!e || e === Ni) && (e = ze), Ya(e)) {
    const o = Yt(e, t, !0);
    return a && Us(o, a), Wa > 0 && !i && rt && (o.shapeFlag & 6 ? rt[rt.indexOf(e)] = o : rt.push(o)), o.patchFlag = -2, o;
  }
  if (qu(e) && (e = e.__vccOpts), t) {
    t = bu(t);
    let { class: o, style: u } = t;
    o && !Ae(o) && (t.class = ae(o)), Te(u) && (/* @__PURE__ */ Rs(u) && !ie(u) && (u = Oe({}, u)), t.style = qt(u));
  }
  const r = Ae(e) ? 1 : ar(e) ? 128 : Ai(e) ? 64 : Te(e) ? 4 : fe(e) ? 2 : 0;
  return s(e, t, a, n, l, r, i, !0);
}
function bu(e) {
  return e ? /* @__PURE__ */ Rs(e) || Vi(e) ? Oe({}, e) : e : null;
}
function Yt(e, t, a = !1, n = !1) {
  const { props: l, ref: i, patchFlag: r, children: o, transition: u } = e, p = t ? hu(l || {}, t) : l, d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: p,
    key: p && sr(p),
    ref: t && t.ref ? a && i ? ie(i) ? i.concat(kn(t)) : [i, kn(t)] : kn(t) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: o,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== J ? r === -1 ? 16 : r | 16 : r,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: u,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Yt(e.ssContent),
    ssFallback: e.ssFallback && Yt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return u && n && Za(d, u.clone(d)), d;
}
function ue(e = " ", t = 0) {
  return be(Gn, null, e, t);
}
function lr(e, t) {
  const a = be(yn, null, e);
  return a.staticCount = t, a;
}
function H(e = "", t = !1) {
  return t ? (v(), ge(ze, null, e)) : be(ze, null, e);
}
function xt(e) {
  return e == null || typeof e == "boolean" ? be(ze) : ie(e) ? be(J, null, e.slice()) : Ya(e) ? Ot(e) : be(Gn, null, String(e));
}
function Ot(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Yt(e);
}
function Us(e, t) {
  let a = 0;
  const { shapeFlag: n } = e;
  if (t == null) t = null;
  else if (ie(t)) a = 16;
  else if (typeof t == "object") if (n & 65) {
    const l = t.default;
    l && (l._c && (l._d = !1), Us(e, l()), l._c && (l._d = !0));
    return;
  } else {
    a = 32;
    const l = t._;
    !l && !Vi(t) ? t._ctx = Ue : l === 3 && Ue && (Ue.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
  }
  else fe(t) ? (t = {
    default: t,
    _ctx: Ue
  }, a = 32) : (t = String(t), n & 64 ? (a = 16, t = [ue(t)]) : a = 8);
  e.children = t, e.shapeFlag |= a;
}
function hu(...e) {
  const t = {};
  for (let a = 0; a < e.length; a++) {
    const n = e[a];
    for (const l in n) if (l === "class")
      t.class !== n.class && (t.class = ae([t.class, n.class]));
    else if (l === "style") t.style = qt([t.style, n.style]);
    else if (On(l)) {
      const i = t[l], r = n[l];
      r && i !== r && !(ie(i) && i.includes(r)) ? t[l] = i ? [].concat(i, r) : r : r == null && i == null && !Rn(l) && (t[l] = r);
    } else l !== "" && (t[l] = n[l]);
  }
  return t;
}
function ht(e, t, a, n = null) {
  vt(e, t, 7, [a, n]);
}
var yu = Hi(), ku = 0;
function wu(e, t, a) {
  const n = e.type, l = (t ? t.appContext : e.appContext) || yu, i = {
    uid: ku++,
    vnode: e,
    type: n,
    parent: t,
    appContext: l,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    job: null,
    scope: new Gr(!0),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(l.provides),
    ids: t ? t.ids : [
      "",
      0,
      0
    ],
    accessCache: null,
    renderCache: [],
    components: null,
    directives: null,
    propsOptions: Wi(n, l),
    emitsOptions: ji(n, l),
    emit: null,
    emitted: null,
    propsDefaults: Se,
    inheritAttrs: n.inheritAttrs,
    ctx: Se,
    data: Se,
    props: Se,
    attrs: Se,
    slots: Se,
    refs: Se,
    setupState: Se,
    setupContext: null,
    suspense: a,
    suspenseId: a ? a.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = Xo.bind(null, i), e.ce && e.ce(i), i;
}
var Ve = null, ir = () => Ve || Ue, Mn, ws;
{
  const e = Nn(), t = (a, n) => {
    let l;
    return (l = e[a]) || (l = e[a] = []), l.push(n), (i) => {
      l.length > 1 ? l.forEach((r) => r(i)) : l[0](i);
    };
  };
  Mn = t("__VUE_INSTANCE_SETTERS__", (a) => Ve = a), ws = t("__VUE_SSR_SETTERS__", (a) => Qa = a);
}
var ln = (e) => {
  const t = Ve;
  return Mn(e), e.scope.on(), () => {
    e.scope.off(), Mn(t);
  };
}, gl = () => {
  Ve && Ve.scope.off(), Mn(null);
};
function rr(e) {
  return e.vnode.shapeFlag & 4;
}
var Qa = !1;
function Tu(e, t = !1, a = !1) {
  t && ws(t);
  const { props: n, children: l } = e.vnode, i = rr(e);
  su(e, n, i, t), ou(e, l, a || t);
  const r = i ? xu(e, t) : void 0;
  return t && ws(!1), r;
}
function xu(e, t) {
  const a = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, jo);
  const { setup: n } = a;
  if (n) {
    Nt();
    const l = e.setupContext = n.length > 1 ? Su(e) : null, i = ln(e), r = nn(n, e, 0, [e.props, l]), o = ei(r);
    if (Ut(), i(), (o || e.sp) && !ga(e) && Bi(e), o) {
      if (r.then(gl, gl), t) return r.then((u) => {
        bl(e, u, t);
      }).catch((u) => {
        Fn(u, e, 0);
      });
      e.asyncDep = r;
    } else bl(e, r, t);
  } else or(e, t);
}
function bl(e, t, a) {
  fe(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Te(t) && (e.setupState = Ti(t)), or(e, a);
}
var hl, yl;
function or(e, t, a) {
  const n = e.type;
  if (!e.render) {
    if (!t && hl && !n.render) {
      const l = n.template || Ls(e).template;
      if (l) {
        const { isCustomElement: i, compilerOptions: r } = e.appContext.config, { delimiters: o, compilerOptions: u } = n, p = Oe(Oe({
          isCustomElement: i,
          delimiters: o
        }, r), u);
        n.render = hl(l, p);
      }
    }
    e.render = n.render || St, yl && yl(e);
  }
  {
    const l = ln(e);
    Nt();
    try {
      Ko(e);
    } finally {
      Ut(), l();
    }
  }
}
var $u = { get(e, t) {
  return Ge(e, "get", ""), e[t];
} };
function Su(e) {
  const t = (a) => {
    e.exposed = a || {};
  };
  return {
    attrs: new Proxy(e.attrs, $u),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function zn(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Ti(fo(e.exposed)), {
    get(t, a) {
      if (a in t) return t[a];
      if (a in ja) return ja[a](e);
    },
    has(t, a) {
      return a in t || a in ja;
    }
  })) : e.proxy;
}
function _u(e, t = !0) {
  return fe(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function qu(e) {
  return fe(e) && "__vccOpts" in e;
}
var V = (e, t) => /* @__PURE__ */ bo(e, t, Qa);
function Cu(e, t, a) {
  try {
    Cn(-1);
    const n = arguments.length;
    return n === 2 ? Te(t) && !ie(t) ? Ya(t) ? be(e, null, [t]) : be(e, t) : be(e, null, t) : (n > 3 ? a = Array.prototype.slice.call(arguments, 2) : n === 3 && Ya(a) && (a = [a]), be(e, t, a));
  } finally {
    Cn(1);
  }
}
var Mu = "3.5.35", Ts = void 0, kl = typeof window < "u" && window.trustedTypes;
if (kl) try {
  Ts = /* @__PURE__ */ kl.createPolicy("vue", { createHTML: (e) => e });
} catch {
}
var ur = Ts ? (e) => Ts.createHTML(e) : (e) => e, Au = "http://www.w3.org/2000/svg", Iu = "http://www.w3.org/1998/Math/MathML", Et = typeof document < "u" ? document : null, wl = Et && /* @__PURE__ */ Et.createElement("template"), Eu = {
  insert: (e, t, a) => {
    t.insertBefore(e, a || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, a, n) => {
    const l = t === "svg" ? Et.createElementNS(Au, e) : t === "mathml" ? Et.createElementNS(Iu, e) : a ? Et.createElement(e, { is: a }) : Et.createElement(e);
    return e === "select" && n && n.multiple != null && l.setAttribute("multiple", n.multiple), l;
  },
  createText: (e) => Et.createTextNode(e),
  createComment: (e) => Et.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Et.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  insertStaticContent(e, t, a, n, l, i) {
    const r = a ? a.previousSibling : t.lastChild;
    if (l && (l === i || l.nextSibling)) for (; t.insertBefore(l.cloneNode(!0), a), !(l === i || !(l = l.nextSibling)); )
      ;
    else {
      wl.innerHTML = ur(n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e);
      const o = wl.content;
      if (n === "svg" || n === "mathml") {
        const u = o.firstChild;
        for (; u.firstChild; ) o.appendChild(u.firstChild);
        o.removeChild(u);
      }
      t.insertBefore(o, a);
    }
    return [r ? r.nextSibling : t.firstChild, a ? a.previousSibling : t.lastChild];
  }
}, Gt = "transition", Ia = "animation", Xa = /* @__PURE__ */ Symbol("_vtc"), dr = {
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
}, Pu = /* @__PURE__ */ Oe({}, Ii, dr), Ou = (e) => (e.displayName = "Transition", e.props = Pu, e), cr = /* @__PURE__ */ Ou((e, { slots: t }) => Cu(Ao, Ru(e), t)), ea = (e, t = []) => {
  ie(e) ? e.forEach((a) => a(...t)) : e && e(...t);
}, Tl = (e) => e ? ie(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function Ru(e) {
  const t = {};
  for (const X in e) X in dr || (t[X] = e[X]);
  if (e.css === !1) return t;
  const { name: a = "v", type: n, duration: l, enterFromClass: i = `${a}-enter-from`, enterActiveClass: r = `${a}-enter-active`, enterToClass: o = `${a}-enter-to`, appearFromClass: u = i, appearActiveClass: p = r, appearToClass: d = o, leaveFromClass: y = `${a}-leave-from`, leaveActiveClass: w = `${a}-leave-active`, leaveToClass: h = `${a}-leave-to` } = e, q = Bu(l), P = q && q[0], R = q && q[1], { onBeforeEnter: D, onEnter: L, onEnterCancelled: A, onLeave: C, onLeaveCancelled: T, onBeforeAppear: M = D, onAppear: $ = L, onAppearCancelled: _ = A } = t, S = (X, W, F, re) => {
    X._enterCancelled = re, ta(X, W ? d : o), ta(X, W ? p : r), F && F();
  }, G = (X, W) => {
    X._isLeaving = !1, ta(X, y), ta(X, h), ta(X, w), W && W();
  }, te = (X) => (W, F) => {
    const re = X ? $ : L, ce = () => S(W, X, F);
    ea(re, [W, ce]), xl(() => {
      ta(W, X ? u : i), It(W, X ? d : o), Tl(re) || $l(W, n, P, ce);
    });
  };
  return Oe(t, {
    onBeforeEnter(X) {
      ea(D, [X]), It(X, i), It(X, r);
    },
    onBeforeAppear(X) {
      ea(M, [X]), It(X, u), It(X, p);
    },
    onEnter: te(!1),
    onAppear: te(!0),
    onLeave(X, W) {
      X._isLeaving = !0;
      const F = () => G(X, W);
      It(X, y), X._enterCancelled ? (It(X, w), ql(X)) : (ql(X), It(X, w)), xl(() => {
        X._isLeaving && (ta(X, y), It(X, h), Tl(C) || $l(X, n, R, F));
      }), ea(C, [X, F]);
    },
    onEnterCancelled(X) {
      S(X, !1, void 0, !0), ea(A, [X]);
    },
    onAppearCancelled(X) {
      S(X, !0, void 0, !0), ea(_, [X]);
    },
    onLeaveCancelled(X) {
      G(X), ea(T, [X]);
    }
  });
}
function Bu(e) {
  if (e == null) return null;
  if (Te(e)) return [ns(e.enter), ns(e.leave)];
  {
    const t = ns(e);
    return [t, t];
  }
}
function ns(e) {
  return Dr(e);
}
function It(e, t) {
  t.split(/\s+/).forEach((a) => a && e.classList.add(a)), (e[Xa] || (e[Xa] = /* @__PURE__ */ new Set())).add(t);
}
function ta(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.remove(n));
  const a = e[Xa];
  a && (a.delete(t), a.size || (e[Xa] = void 0));
}
function xl(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
var Lu = 0;
function $l(e, t, a, n) {
  const l = e._endId = ++Lu, i = () => {
    l === e._endId && n();
  };
  if (a != null) return setTimeout(i, a);
  const { type: r, timeout: o, propCount: u } = Du(e, t);
  if (!r) return n();
  const p = r + "end";
  let d = 0;
  const y = () => {
    e.removeEventListener(p, w), i();
  }, w = (h) => {
    h.target === e && ++d >= u && y();
  };
  setTimeout(() => {
    d < u && y();
  }, o + 1), e.addEventListener(p, w);
}
function Du(e, t) {
  const a = window.getComputedStyle(e), n = (q) => (a[q] || "").split(", "), l = n(`${Gt}Delay`), i = n(`${Gt}Duration`), r = Sl(l, i), o = n(`${Ia}Delay`), u = n(`${Ia}Duration`), p = Sl(o, u);
  let d = null, y = 0, w = 0;
  t === Gt ? r > 0 && (d = Gt, y = r, w = i.length) : t === Ia ? p > 0 && (d = Ia, y = p, w = u.length) : (y = Math.max(r, p), d = y > 0 ? r > p ? Gt : Ia : null, w = d ? d === Gt ? i.length : u.length : 0);
  const h = d === Gt && /\b(?:transform|all)(?:,|$)/.test(n(`${Gt}Property`).toString());
  return {
    type: d,
    timeout: y,
    propCount: w,
    hasTransform: h
  };
}
function Sl(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((a, n) => _l(a) + _l(e[n])));
}
function _l(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function ql(e) {
  return (e ? e.ownerDocument : document).body.offsetHeight;
}
function Nu(e, t, a) {
  const n = e[Xa];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : a ? e.setAttribute("class", t) : e.className = t;
}
var An = /* @__PURE__ */ Symbol("_vod"), fr = /* @__PURE__ */ Symbol("_vsh"), Uu = {
  name: "show",
  beforeMount(e, { value: t }, { transition: a }) {
    e[An] = e.style.display === "none" ? "" : e.style.display, a && t ? a.beforeEnter(e) : Ea(e, t);
  },
  mounted(e, { value: t }, { transition: a }) {
    a && t && a.enter(e);
  },
  updated(e, { value: t, oldValue: a }, { transition: n }) {
    !t != !a && (n ? t ? (n.beforeEnter(e), Ea(e, !0), n.enter(e)) : n.leave(e, () => {
      Ea(e, !1);
    }) : Ea(e, t));
  },
  beforeUnmount(e, { value: t }) {
    Ea(e, t);
  }
};
function Ea(e, t) {
  e.style.display = t ? e[An] : "none", e[fr] = !t;
}
var Fu = /* @__PURE__ */ Symbol(""), Hu = /(?:^|;)\s*display\s*:/;
function ju(e, t, a) {
  const n = e.style, l = Ae(a);
  let i = !1;
  if (a && !l) {
    if (t) if (Ae(t))
      for (const r of t.split(";")) {
        const o = r.slice(0, r.indexOf(":")).trim();
        a[o] == null && La(n, o, "");
      }
    else for (const r in t) a[r] == null && La(n, r, "");
    for (const r in a) {
      r === "display" && (i = !0);
      const o = a[r];
      o != null ? Gu(e, r, !Ae(t) && t ? t[r] : void 0, o) || La(n, r, o) : La(n, r, "");
    }
  } else if (l) {
    if (t !== a) {
      const r = n[Fu];
      r && (a += ";" + r), n.cssText = a, i = Hu.test(a);
    }
  } else t && e.removeAttribute("style");
  An in e && (e[An] = i ? n.display : "", e[fr] && (n.display = "none"));
}
var Cl = /\s*!important$/;
function La(e, t, a) {
  if (ie(a)) a.forEach((n) => La(e, t, n));
  else if (a == null && (a = ""), t.startsWith("--")) e.setProperty(t, a);
  else {
    const n = Ku(e, t);
    Cl.test(a) ? e.setProperty(Qt(n), a.replace(Cl, ""), "important") : e[n] = a;
  }
}
var Ml = [
  "Webkit",
  "Moz",
  "ms"
], ss = {};
function Ku(e, t) {
  const a = ss[t];
  if (a) return a;
  let n = Xe(t);
  if (n !== "filter" && n in e) return ss[t] = n;
  n = Ln(n);
  for (let l = 0; l < Ml.length; l++) {
    const i = Ml[l] + n;
    if (i in e) return ss[t] = i;
  }
  return t;
}
function Gu(e, t, a, n) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && Ae(n) && a === n;
}
var Al = "http://www.w3.org/1999/xlink";
function Il(e, t, a, n, l, i = jr(t)) {
  n && t.startsWith("xlink:") ? a == null ? e.removeAttributeNS(Al, t.slice(6, t.length)) : e.setAttributeNS(Al, t, a) : a == null || i && !li(a) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : mt(a) ? String(a) : a);
}
function El(e, t, a, n, l) {
  if (t === "innerHTML" || t === "textContent") {
    a != null && (e[t] = t === "innerHTML" ? ur(a) : a);
    return;
  }
  const i = e.tagName;
  if (t === "value" && i !== "PROGRESS" && !i.includes("-")) {
    const o = i === "OPTION" ? e.getAttribute("value") || "" : e.value, u = a == null ? e.type === "checkbox" ? "on" : "" : String(a);
    (o !== u || !("_value" in e)) && (e.value = u), a == null && e.removeAttribute(t), e._value = a;
    return;
  }
  let r = !1;
  if (a === "" || a == null) {
    const o = typeof e[t];
    o === "boolean" ? a = li(a) : a == null && o === "string" ? (a = "", r = !0) : o === "number" && (a = 0, r = !0);
  }
  try {
    e[t] = a;
  } catch {
  }
  r && e.removeAttribute(l || t);
}
function Zt(e, t, a, n) {
  e.addEventListener(t, a, n);
}
function zu(e, t, a, n) {
  e.removeEventListener(t, a, n);
}
var Pl = /* @__PURE__ */ Symbol("_vei");
function Vu(e, t, a, n, l = null) {
  const i = e[Pl] || (e[Pl] = {}), r = i[t];
  if (n && r) r.value = n;
  else {
    const [o, u] = Zu(t);
    n ? Zt(e, o, i[t] = Qu(n, l), u) : r && (zu(e, o, r, u), i[t] = void 0);
  }
}
var Ol = /(?:Once|Passive|Capture)$/;
function Zu(e) {
  let t;
  if (Ol.test(e)) {
    t = {};
    let a;
    for (; a = e.match(Ol); )
      e = e.slice(0, e.length - a[0].length), t[a[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Qt(e.slice(2)), t];
}
var ls = 0, Wu = /* @__PURE__ */ Promise.resolve(), Yu = () => ls || (Wu.then(() => ls = 0), ls = Date.now());
function Qu(e, t) {
  const a = (n) => {
    if (!n._vts) n._vts = Date.now();
    else if (n._vts <= a.attached) return;
    const l = a.value;
    if (ie(l)) {
      const i = n.stopImmediatePropagation;
      n.stopImmediatePropagation = () => {
        i.call(n), n._stopped = !0;
      };
      const r = l.slice(), o = [n];
      for (let u = 0; u < r.length && !n._stopped; u++) {
        const p = r[u];
        p && vt(p, t, 5, o);
      }
    } else vt(l, t, 5, [n]);
  };
  return a.value = e, a.attached = Yu(), a;
}
var Rl = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Xu = (e, t, a, n, l, i) => {
  const r = l === "svg";
  t === "class" ? Nu(e, n, r) : t === "style" ? ju(e, a, n) : On(t) ? Rn(t) || Vu(e, t, a, n, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Ju(e, t, n, r)) ? (El(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Il(e, t, n, r, i, t !== "value")) : e._isVueCE && (ed(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !Ae(n))) ? El(e, Xe(t), n, i, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), Il(e, t, n, r));
};
function Ju(e, t, a, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Rl(t) && fe(a));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
  if (t === "width" || t === "height") {
    const l = e.tagName;
    if (l === "IMG" || l === "VIDEO" || l === "CANVAS" || l === "SOURCE") return !1;
  }
  return Rl(t) && Ae(a) ? !1 : t in e;
}
function ed(e, t) {
  const a = e._def.props;
  if (!a) return !1;
  const n = Xe(t);
  return Array.isArray(a) ? a.some((l) => Xe(l) === n) : Object.keys(a).some((l) => Xe(l) === n);
}
var ya = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return ie(t) ? (a) => bn(t, a) : t;
};
function td(e) {
  e.target.composing = !0;
}
function Bl(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var Lt = /* @__PURE__ */ Symbol("_assign");
function Ll(e, t, a) {
  return t && (e = e.trim()), a && (e = Dn(e)), e;
}
var De = {
  created(e, { modifiers: { lazy: t, trim: a, number: n } }, l) {
    e[Lt] = ya(l);
    const i = n || l.props && l.props.type === "number";
    Zt(e, t ? "change" : "input", (r) => {
      r.target.composing || e[Lt](Ll(e.value, a, i));
    }), (a || i) && Zt(e, "change", () => {
      e.value = Ll(e.value, a, i);
    }), t || (Zt(e, "compositionstart", td), Zt(e, "compositionend", Bl), Zt(e, "change", Bl));
  },
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: a, modifiers: { lazy: n, trim: l, number: i } }, r) {
    if (e[Lt] = ya(r), e.composing) return;
    const o = (i || e.type === "number") && !/^0\d/.test(e.value) ? Dn(e.value) : e.value, u = t ?? "";
    if (o === u) return;
    const p = e.getRootNode();
    (p instanceof Document || p instanceof ShadowRoot) && p.activeElement === e && e.type !== "range" && (n && t === a || l && e.value.trim() === u) || (e.value = u);
  }
}, Pa = {
  deep: !0,
  created(e, t, a) {
    e[Lt] = ya(a), Zt(e, "change", () => {
      const n = e._modelValue, l = Ja(e), i = e.checked, r = e[Lt];
      if (ie(n)) {
        const o = Cs(n, l), u = o !== -1;
        if (i && !u) r(n.concat(l));
        else if (!i && u) {
          const p = [...n];
          p.splice(o, 1), r(p);
        }
      } else if (xa(n)) {
        const o = new Set(n);
        i ? o.add(l) : o.delete(l), r(o);
      } else r(vr(e, i));
    });
  },
  mounted: Dl,
  beforeUpdate(e, t, a) {
    e[Lt] = ya(a), Dl(e, t, a);
  }
};
function Dl(e, { value: t, oldValue: a }, n) {
  e._modelValue = t;
  let l;
  if (ie(t)) l = Cs(t, n.props.value) > -1;
  else if (xa(t)) l = t.has(n.props.value);
  else {
    if (t === a) return;
    l = $a(t, vr(e, !0));
  }
  e.checked !== l && (e.checked = l);
}
var ad = {
  deep: !0,
  created(e, { value: t, modifiers: { number: a } }, n) {
    const l = xa(t);
    Zt(e, "change", () => {
      const i = Array.prototype.filter.call(e.options, (r) => r.selected).map((r) => a ? Dn(Ja(r)) : Ja(r));
      e[Lt](e.multiple ? l ? new Set(i) : i : i[0]), e._assigning = !0, sn(() => {
        e._assigning = !1;
      });
    }), e[Lt] = ya(n);
  },
  mounted(e, { value: t }) {
    Nl(e, t);
  },
  beforeUpdate(e, t, a) {
    e[Lt] = ya(a);
  },
  updated(e, { value: t }) {
    e._assigning || Nl(e, t);
  }
};
function Nl(e, t) {
  const a = e.multiple, n = ie(t);
  if (!(a && !n && !xa(t))) {
    for (let l = 0, i = e.options.length; l < i; l++) {
      const r = e.options[l], o = Ja(r);
      if (a) if (n) {
        const u = typeof o;
        u === "string" || u === "number" ? r.selected = t.some((p) => String(p) === String(o)) : r.selected = Cs(t, o) > -1;
      } else r.selected = t.has(o);
      else if ($a(Ja(r), t)) {
        e.selectedIndex !== l && (e.selectedIndex = l);
        return;
      }
    }
    !a && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function Ja(e) {
  return "_value" in e ? e._value : e.value;
}
function vr(e, t) {
  const a = t ? "_trueValue" : "_falseValue";
  return a in e ? e[a] : t;
}
var nd = [
  "ctrl",
  "shift",
  "alt",
  "meta"
], sd = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => nd.some((a) => e[`${a}Key`] && !t.includes(a))
}, tt = (e, t) => {
  if (!e) return e;
  const a = e._withMods || (e._withMods = {}), n = t.join(".");
  return a[n] || (a[n] = ((l, ...i) => {
    for (let r = 0; r < t.length; r++) {
      const o = sd[t[r]];
      if (o && o(l, t)) return;
    }
    return e(l, ...i);
  }));
}, ld = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, pr = (e, t) => {
  const a = e._withKeys || (e._withKeys = {}), n = t.join(".");
  return a[n] || (a[n] = ((l) => {
    if (!("key" in l)) return;
    const i = Qt(l.key);
    if (t.some((r) => r === i || ld[r] === i)) return e(l);
  }));
}, id = /* @__PURE__ */ Oe({ patchProp: Xu }, Eu), Ul;
function rd() {
  return Ul || (Ul = du(id));
}
var od = ((...e) => {
  const t = rd().createApp(...e), { mount: a } = t;
  return t.mount = (n) => {
    const l = dd(n);
    if (!l) return;
    const i = t._component;
    !fe(i) && !i.render && !i.template && (i.template = l.innerHTML), l.nodeType === 1 && (l.textContent = "");
    const r = a(l, !1, ud(l));
    return l instanceof Element && (l.removeAttribute("v-cloak"), l.setAttribute("data-v-app", "")), r;
  }, t;
});
function ud(e) {
  if (e instanceof SVGElement) return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function dd(e) {
  return Ae(e) ? document.querySelector(e) : e;
}
var cd = Object.freeze({
  id: "agent-api",
  name: "Agent API",
  accent: "#63d8c6"
}), fd = "https://api.tavily.com";
function vd(e = "") {
  return String(e || "").trim();
}
function wt(e = "") {
  return String(e || "").trim().replace(/\/+$/, "") || "https://api.tavily.com";
}
var E5 = Object.freeze([
  Object.freeze({
    value: "inherit",
    label: "跟随模型默认"
  }),
  Object.freeze({
    value: "on",
    label: "开启"
  }),
  Object.freeze({
    value: "off",
    label: "关闭"
  })
]);
function pd(e = "") {
  return e === "on" || e === "off" ? e : "inherit";
}
function md(e) {
  return String(e ?? "").trim().toLowerCase() || void 0;
}
function gd(e) {
  if (e == null || e === "") return;
  const t = Number(e);
  return Number.isFinite(t) ? Math.floor(t) : void 0;
}
function ka(e = {}) {
  const t = e && typeof e == "object" ? e : {}, a = md(t.effort), n = gd(t.budgetTokens);
  return {
    mode: pd(t.mode),
    ...a ? { effort: a } : {},
    ...n !== void 0 ? { budgetTokens: n } : {}
  };
}
var mr = "openai-compatible", Fs = "默认", gr = "default", bd = "deny", Pt = 32e3, hd = Object.freeze([{
  value: "default",
  label: "默认权限"
}, {
  value: "full",
  label: "完全权限"
}]), yd = Object.freeze([{
  value: "deny",
  label: "禁止"
}, {
  value: "allow",
  label: "允许"
}]), xs = {
  "openai-responses": {
    baseUrl: "https://api.openai.com/v1",
    model: "gpt-4.1-mini",
    apiKey: "",
    temperature: 1,
    maxTokens: Pt,
    sendTemperature: !0
  },
  "openai-compatible": {
    baseUrl: "https://api.openai.com/v1",
    model: "gpt-4o-mini",
    apiKey: "",
    temperature: 1,
    maxTokens: Pt,
    sendTemperature: !0,
    toolMode: "tagged-json"
  },
  "sillytavern-openai-compatible": {
    baseUrl: "",
    model: "gpt-4o-mini",
    apiKey: "",
    temperature: 1,
    maxTokens: Pt,
    sendTemperature: !0,
    toolMode: "tagged-json"
  },
  "sillytavern-claude": {
    baseUrl: "",
    model: "claude-sonnet-4-0",
    apiKey: "",
    temperature: 1,
    maxTokens: Pt,
    sendTemperature: !0
  },
  "sillytavern-google": {
    baseUrl: "",
    model: "gemini-2.5-pro",
    apiKey: "",
    temperature: 1,
    maxTokens: Pt,
    sendTemperature: !0
  },
  anthropic: {
    baseUrl: "https://api.anthropic.com",
    model: "claude-sonnet-4-0",
    apiKey: "",
    temperature: 1,
    maxTokens: Pt,
    sendTemperature: !0
  },
  google: {
    baseUrl: "https://generativelanguage.googleapis.com/v1beta",
    model: "gemini-2.5-pro",
    apiKey: "",
    temperature: 1,
    maxTokens: Pt,
    sendTemperature: !0
  }
};
function br() {
  return JSON.parse(JSON.stringify(xs));
}
function it() {
  return {
    provider: mr,
    modelConfigs: br(),
    permissionMode: gr
  };
}
function hr(e = it()) {
  const t = e && typeof e == "object" ? e : it();
  return {
    provider: Hs(t.provider),
    modelConfigs: lt(t.modelConfigs || {})
  };
}
function fa(e) {
  return e === "full" ? "full" : gr;
}
function zt(e) {
  return e === "allow" ? "allow" : bd;
}
function Ke(e, t = Pt) {
  const a = Number(e);
  if (!Number.isFinite(a) || a <= 0) {
    const n = Number(t);
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : Pt;
  }
  return Math.min(Number.MAX_SAFE_INTEGER, Math.floor(a));
}
function Re(e) {
  return String(e || "").trim() || "默认";
}
function lt(e = {}) {
  const t = br();
  return Object.keys(xs).forEach((a) => {
    const n = e && typeof e[a] == "object" ? e[a] : {}, l = xs[a];
    t[a] = {
      baseUrl: String(n.baseUrl ?? l.baseUrl ?? ""),
      model: String(n.model ?? l.model ?? ""),
      apiKey: String(n.apiKey ?? l.apiKey ?? ""),
      temperature: n.temperature ?? l.temperature,
      maxTokens: Ke(n.maxTokens, l.maxTokens),
      sendTemperature: typeof n.sendTemperature == "boolean" ? n.sendTemperature : l.sendTemperature,
      ..."toolMode" in l ? { toolMode: String(n.toolMode || l.toolMode || "native") } : {},
      reasoning: ka(n.reasoning)
    };
  }), t;
}
function Hs(e) {
  return typeof e == "string" && e.trim() ? e : mr;
}
function js(e = {}, t) {
  return e && typeof e.presets == "object" && e.presets ? e.presets : e?.modelConfigs ? { [t]: {
    provider: e.provider || "openai-compatible",
    modelConfigs: e.modelConfigs,
    permissionMode: e.permissionMode
  } } : {};
}
function kd(e = {}, t) {
  const a = {}, n = js(e, t);
  return Object.entries(n).forEach(([l, i]) => {
    if (!i || typeof i != "object") return;
    const r = Re(l);
    a[r] = {
      provider: Hs(i.provider),
      modelConfigs: lt(i.modelConfigs || {}),
      permissionMode: fa(i.permissionMode)
    };
  }), Object.keys(a).length || (a[Fs] = it()), a;
}
function wd(e, t) {
  const a = Re(t);
  return e[a] ? a : Object.keys(e)[0];
}
function Td(e, t, a) {
  const n = Re(t || a);
  return e[n] ? n : e[a] ? a : Object.keys(e)[0];
}
function yr(e = {}, t = it()) {
  const a = hr(t), n = e && typeof e == "object" ? e : {};
  return {
    provider: Hs(n.provider || a.provider),
    modelConfigs: lt(n.modelConfigs || a.modelConfigs)
  };
}
function xd(e = {}, t = {}, a = Fs, n = a) {
  if (e?.delegateConfigured === !1) return !1;
  if (n !== a) return !0;
  const l = e?.delegateConfig;
  if (!l || typeof l != "object" || Array.isArray(l) || !(typeof l.provider == "string" && l.provider.trim() || l.modelConfigs && typeof l.modelConfigs == "object" && Object.keys(l.modelConfigs).length)) return !1;
  if (e?.delegateConfigured === !0) return !0;
  const i = t[a] || it(), r = hr(i), o = yr(l, i);
  return JSON.stringify(o) !== JSON.stringify(r);
}
function $d(e = {}, t, a, n, l) {
  const i = l(e?.[n]);
  if (i) return i;
  const r = js(e, t), o = [
    a,
    t,
    e?.currentPresetName,
    e?.delegatePresetName,
    ...Object.keys(r || {})
  ].map(Re), u = /* @__PURE__ */ new Set();
  for (const p of o) {
    if (u.has(p)) continue;
    u.add(p);
    const d = l(r?.[p]?.[n]);
    if (d) return d;
  }
  return l(e?.delegateConfig?.[n]);
}
function Sd(e = {}, t, a) {
  const n = (o) => String(o || "").trim();
  if (n(e?.tavilyBaseUrl)) return wt(e.tavilyBaseUrl);
  const l = js(e, t), i = [
    a,
    t,
    e?.currentPresetName,
    e?.delegatePresetName,
    ...Object.keys(l || {})
  ].map(Re), r = /* @__PURE__ */ new Set();
  for (const o of i) {
    if (r.has(o)) continue;
    r.add(o);
    const u = l?.[o]?.tavilyBaseUrl;
    if (n(u)) return wt(u);
  }
  return n(e?.delegateConfig?.tavilyBaseUrl) ? wt(e.delegateConfig.tavilyBaseUrl) : fd;
}
function _d(e = {}, t, a) {
  return {
    tavilyApiKey: $d(e, t, a, "tavilyApiKey", vd),
    tavilyBaseUrl: Sd(e, t, a)
  };
}
function In(e = {}) {
  const t = Re(e.currentPresetName || e.presetDraftName || "默认"), a = kd(e, t), n = wd(a, e.currentPresetName), l = Td(a, e.delegatePresetName, n), i = a[n] || it(), r = a[l] || i, o = yr(e.delegateConfig, r), u = xd(e, a, n, l), p = _d(e, t, n);
  return {
    workspaceFileName: String(e.workspaceFileName || ""),
    updatedAt: Number(e.updatedAt) || 0,
    jsApiPermission: zt(e.jsApiPermission),
    currentPresetName: n,
    delegatePresetName: l,
    delegateConfig: o,
    delegateConfigured: u,
    presetDraftName: Re(e.presetDraftName || n),
    presetNames: Object.keys(a),
    presets: a,
    provider: i.provider,
    modelConfigs: i.modelConfigs,
    permissionMode: fa(i.permissionMode),
    tavilyApiKey: p.tavilyApiKey,
    tavilyBaseUrl: p.tavilyBaseUrl
  };
}
async function qd(e, t) {
  const a = e.body?.getReader?.();
  if (!a) throw new Error("host_chat_completions_stream_missing_body");
  const n = new TextDecoder();
  let l = "";
  const i = /\r?\n\r?\n/, r = (u) => {
    const p = u.split(/\r?\n/).filter((d) => d.startsWith("data:")).map((d) => d.slice(5).trimStart()).join(`
`).trim();
    !p || p === "[DONE]" || t(JSON.parse(p));
  };
  for (; ; ) {
    const { done: u, value: p } = await a.read();
    if (u) break;
    for (l += n.decode(p, { stream: !0 }); ; ) {
      const d = l.match(i);
      if (!d || typeof d.index != "number") break;
      const y = l.slice(0, d.index);
      l = l.slice(d.index + d[0].length), r(y);
    }
  }
  const o = l.trim();
  o && r(o);
}
function Cd(e = "") {
  return String(e || "").trim().toLowerCase();
}
function Md(e = "") {
  const t = Cd(e);
  return t.includes("deepseek") ? "deepseek" : t.includes("kimi") || t.includes("moonshot") ? "kimi" : t.includes("gemini") ? "gemini" : t.includes("claude") ? "claude" : /(?:^|[/_.-])gpt(?:\d|[/_.-]|$)/.test(t) || /(?:^|[/_.-])o\d+(?:[/_.-]|$)/.test(t) ? "openai" : "";
}
var _a = "openai", kr = "claude", wr = "makersuite", Ad = "/api/backends/chat-completions/status", Id = "/api/backends/chat-completions/generate", Tr = Object.freeze({
  [kr]: "https://api.anthropic.com/v1",
  [wr]: "https://generativelanguage.googleapis.com"
}), rn = null;
function Ed(e) {
  return String(e || "").trim().replace(/\/+$/, "");
}
function Pd(e, t) {
  const a = Ed(e);
  return t === "claude" ? !a || /\/v\d[\w.-]*$/i.test(a) ? a : `${a}/v1` : t === "makersuite" ? a.replace(/\/v\d[\w.-]*$/i, "") : a;
}
async function xr(e = rn) {
  if (typeof e != "function") throw new Error("宿主请求头未注册，无法调用酒馆后端。");
  return {
    "Content-Type": "application/json",
    ...await Promise.resolve(e() || {}),
    Accept: "application/json"
  };
}
function Od(e = {}) {
  const t = {};
  return Object.entries(e || {}).forEach(([a, n]) => {
    t[a] = /authorization|cookie|csrf|token|api[-_]?key/i.test(a) ? "[redacted]" : n;
  }), t;
}
async function Ks(e = {}, t = !1, a = rn) {
  const n = await xr(a), l = {
    url: Id,
    method: "POST",
    headers: Od(n),
    body: {
      ...e,
      stream: !!t
    }
  };
  return Object.defineProperty(l, "rawHeaders", {
    value: n,
    enumerable: !1
  }), l;
}
async function Rd(e = {}, t = !1) {
  return await Ks(e, t);
}
function Bd(e = "") {
  return /^\s*(?:<!DOCTYPE\s+html\b|<html\b)/i.test(String(e || ""));
}
function Ld(e = "") {
  return /invalid csrf token/i.test(String(e || ""));
}
function Dd() {
  return "酒馆当前页面的 CSRF token 已失效，请按 F5 刷新并重新进入酒馆后再试。";
}
function Fl(e = "", t = 10) {
  const a = Number.parseInt(String(e || ""), t);
  return Number.isInteger(a) && a >= 0 && a <= 1114111 ? String.fromCodePoint(a) : "";
}
function Hl(e = "") {
  return String(e || "").replace(/&nbsp;|&#160;/gi, " ").replace(/&amp;/gi, "&").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&quot;/gi, '"').replace(/&#39;|&apos;/gi, "'").replace(/&#x([0-9a-f]+);?/gi, (t, a) => Fl(a, 16)).replace(/&#([0-9]+);?/g, (t, a) => Fl(a));
}
function Nd(e = "") {
  const t = String(e || ""), a = Hl((t.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "").replace(/\s+/g, " ").trim(), n = Hl(t.replace(/<script\b[\s\S]*?<\/script>/gi, " ").replace(/<style\b[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim(), l = a || n;
  return l.length > 240 ? `${l.slice(0, 237)}...` : l;
}
function Ud(e = null) {
  const t = Number(e?.status), a = String(e?.statusText || "").trim();
  let n = "";
  try {
    n = String(e?.headers?.get?.("content-type") || "").trim();
  } catch {
    n = "";
  }
  return {
    status: Number.isFinite(t) && t > 0 ? t : 0,
    statusText: a,
    contentType: n
  };
}
function Fd(e = {}) {
  return e.status ? `HTTP ${e.status}${e.statusText ? ` ${e.statusText}` : ""}` : "";
}
function Hd(e = "") {
  const t = String(e || "").trim();
  if (!t || t[0] !== "{" && t[0] !== "[") return "";
  try {
    const a = JSON.parse(t), n = a?.error?.message;
    if (typeof n == "string" && n.trim()) return n.trim();
    if (typeof a?.message == "string" && a.message.trim()) return a.message.trim();
  } catch {
    return "";
  }
  return "";
}
function wa(e = "", t = "", a = null) {
  if (Ld(e)) return Dd();
  const n = Ud(a);
  if (Bd(e) || /\btext\/html\b/i.test(n.contentType)) {
    const l = Fd(n), i = Nd(e);
    return [
      "酒馆后端返回了非 JSON 的 HTML 页面",
      l ? `（${l}）` : "",
      i ? `：${i}` : ""
    ].join("");
  }
  return Hd(e) || String(e || t || "").trim();
}
function jd(e = {}, t = _a) {
  const a = Pd(e.baseUrl, t), n = String(e.apiKey || "").trim(), l = Tr[t] || "", i = a || (n ? l : ""), r = { chat_completion_source: t || "openai" };
  return i && (r.reverse_proxy = i), n && (r.proxy_password = n), r;
}
function Kd(e = {}, t = _a) {
  return jd(e, t);
}
function Gs(e) {
  const t = e || globalThis.fetch;
  if (typeof t != "function") throw new Error("当前运行环境没有可用的 fetch，无法调用酒馆后端。");
  return t;
}
async function Gd(e = {}, t = _a, a = {}, n = {}) {
  const l = await Gs(n.fetch)(Ad, {
    method: "POST",
    headers: await xr(n.requestHeadersProvider),
    body: JSON.stringify(Kd(e, t)),
    signal: a.signal
  }), i = await l.text();
  let r = null;
  try {
    r = i ? JSON.parse(i) : {};
  } catch (u) {
    throw new Error(`酒馆后端模型列表拉取失败：${wa(i, String(u?.message || u), l)}`);
  }
  if (!l.ok || r?.error) {
    const u = wa(r?.message || r?.error?.message || i, `HTTP ${l.status}`, l);
    throw new Error(`酒馆后端模型列表拉取失败：${u}`);
  }
  const o = Array.isArray(r?.data) ? r.data.map((u) => String(u?.id || u?.name || "").trim()).filter(Boolean) : [];
  return [...new Set(o)];
}
async function zs(e = {}, t = _a, a = {}) {
  return await Gd(e, t, a, { requestHeadersProvider: rn });
}
async function zd(e = {}, t = {}) {
  return await zs(e, _a, t);
}
async function Vd(e = {}, t = {}, a = {}) {
  const n = await Ks(e, !1, a.requestHeadersProvider);
  typeof t.onRequest == "function" && t.onRequest(n);
  const l = await Gs(a.fetch)(n.url, {
    method: n.method,
    headers: n.rawHeaders || n.headers,
    body: JSON.stringify(n.body),
    signal: t.signal
  }), i = await l.text();
  let r = null;
  try {
    r = i ? JSON.parse(i) : {};
  } catch (o) {
    const u = /* @__PURE__ */ new Error(`酒馆后端生成失败：${wa(i, String(o?.message || o), l)}`);
    throw u.status = l.status, u.body = i, u;
  }
  if (!l.ok || r?.error) {
    const o = wa(r?.error?.message || r?.message || i, `HTTP ${l.status}`, l), u = /* @__PURE__ */ new Error(`酒馆后端生成失败：${o}`);
    throw u.status = l.status, u.error = r?.error, u;
  }
  return r;
}
async function Zd(e = {}, t = {}) {
  return await Vd(e, t, { requestHeadersProvider: rn });
}
async function Wd(e = {}, t, a = {}, n = {}) {
  const l = await Ks(e, !0, n.requestHeadersProvider);
  typeof a.onRequest == "function" && a.onRequest(l);
  const i = await Gs(n.fetch)(l.url, {
    method: l.method,
    headers: l.rawHeaders || l.headers,
    body: JSON.stringify(l.body),
    signal: a.signal
  });
  if (!i.ok) {
    const r = await i.text().catch(() => ""), o = new Error(wa(r, `酒馆后端流式生成失败：HTTP ${i.status}`, i));
    throw o.status = i.status, o.body = r, o;
  }
  typeof a.onResponseAccepted == "function" && a.onResponseAccepted(), await qd(i, (r) => {
    if (r?.error) {
      const o = wa(r.error?.message || r.message || JSON.stringify(r.error), "酒馆后端流式生成失败");
      throw new Error(o);
    }
    t(r);
  });
}
async function Yd(e = {}, t, a = {}) {
  return await Wd(e, t, a, { requestHeadersProvider: rn });
}
var P5 = Object.freeze([
  "buildHostChatCompletionGenerateRequest",
  "createHostChatCompletion",
  "streamHostChatCompletion"
]), O5 = Object.freeze({
  buildHostChatCompletionGenerateRequest: Rd,
  fetchHostChatCompletionsModels: zs,
  fetchHostOpenAICompatibleModels: zd,
  createHostChatCompletion: Zd,
  streamHostChatCompletion: Yd
}), Qd = Object.freeze({
  minimal: "最小",
  low: "低",
  medium: "中",
  high: "高",
  xhigh: "超高",
  max: "最大",
  min: "最小"
});
function $r(e) {
  const t = e.intensity || { kind: "none" };
  return Object.freeze({
    ...e,
    modes: Object.freeze([...e.modes || ["inherit"]]),
    outputModes: Object.freeze([...e.outputModes || ["hide", "show"]]),
    temperatureOmitModes: Object.freeze([...e.temperatureOmitModes || []]),
    intensity: Object.freeze({
      ...t,
      ...Array.isArray(t.values) ? { values: Object.freeze([...t.values]) } : {}
    })
  });
}
function Ct(e, t, a, n, l = {}) {
  return $r({
    profileId: e,
    modes: t,
    intensity: {
      kind: "effort",
      values: a,
      defaultValue: n
    },
    outputModes: l.outputModes,
    temperatureOmitModes: l.temperatureOmitModes
  });
}
var Vs = $r({
  profileId: "unsupported",
  modes: ["inherit"],
  outputModes: ["hide"],
  intensity: { kind: "none" },
  unsupportedReason: "当前 Provider、传输方式与模型组合没有已验证的 Reasoning 控制协议。"
}), on = Object.freeze(["on"]), Zs = Object.freeze([
  "inherit",
  "on",
  "off"
]), Sr = Ct("openai-gpt-5.6", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "medium",
  "high",
  "xhigh",
  "max"
], "medium", { temperatureOmitModes: Zs }), Xd = Ct("kimi-k3", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "high",
  "max"
], "max", { temperatureOmitModes: on }), Jd = Ct("deepseek-thinking", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "high",
  "max"
], "high", { temperatureOmitModes: on }), ec = Ct("openai-compatible-gemini-latest", [
  "inherit",
  "on",
  "off"
], [
  "minimal",
  "low",
  "medium",
  "high"
], "high", { temperatureOmitModes: on }), tc = Ct("openai-compatible-claude-latest", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "medium",
  "high",
  "xhigh",
  "max"
], "high", { temperatureOmitModes: on }), ac = Ct("openai-compatible-default", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "medium",
  "high"
], "medium", { temperatureOmitModes: on }), nc = Ct("anthropic-adaptive", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "medium",
  "high",
  "xhigh",
  "max"
], "high", { temperatureOmitModes: Zs }), sc = Ct("sillytavern-claude-adaptive", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "medium",
  "high",
  "max"
], "high", { temperatureOmitModes: Zs }), lc = Ct("google-gemini-3-flash", ["inherit", "on"], [
  "minimal",
  "low",
  "medium",
  "high"
], "high"), ic = Ct("sillytavern-google-3-flash", ["inherit", "on"], [
  "min",
  "low",
  "medium",
  "high"
], "high");
function rc(e = "") {
  switch (Md(e)) {
    case "deepseek":
      return Jd;
    case "kimi":
      return Xd;
    case "gemini":
      return ec;
    case "claude":
      return tc;
    case "openai":
      return Sr;
    default:
      return ac;
  }
}
function Ws(e = {}) {
  const t = String(e.provider || "").trim(), a = String(e.model || "").trim().toLowerCase();
  switch (t) {
    case "openai-responses":
      return Sr;
    case "openai-compatible":
    case "sillytavern-openai-compatible":
      return rc(a);
    case "anthropic":
      return nc;
    case "sillytavern-claude":
      return sc;
    case "google":
      return lc;
    case "sillytavern-google":
      return ic;
    default:
      return Vs;
  }
}
function oc(e = Vs) {
  const t = new Set(e.modes || ["inherit"]);
  return [
    {
      value: "inherit",
      label: "跟随模型默认",
      disabled: !1
    },
    {
      value: "on",
      label: "开启",
      disabled: !t.has("on")
    },
    {
      value: "off",
      label: "关闭",
      disabled: !t.has("off")
    }
  ];
}
function uc(e = Vs) {
  return e.intensity?.kind !== "effort" ? [] : e.intensity.values.map((t) => ({
    value: t,
    label: Qd[t] || t
  }));
}
function is(e, t, a, n = "REASONING_CAPABILITY_UNSUPPORTED") {
  return {
    ...e,
    profileId: t.profileId,
    valid: !1,
    error: a,
    code: n
  };
}
function dc(e, t) {
  const a = { ...e };
  return delete a.effort, delete a.budgetTokens, t.intensity?.kind === "effort" ? {
    ...a,
    ...e.effort ? { effort: e.effort } : {}
  } : a;
}
function fn(e = {}, t = {}) {
  const a = Ws(e), n = ka(t), l = t?.output === "show" || t?.output === "hide" ? t.output : null, i = dc({
    ...n,
    output: n.mode === "off" ? "hide" : l || (a.outputModes.includes("show") ? "show" : "hide")
  }, a);
  if (!a.outputModes.includes(i.output)) return is(i, a, "当前任务要求返回 Reasoning 内容，但所选模型不支持。");
  if (!a.modes.includes(i.mode)) return is(i, a, i.mode === "off" ? "当前模型不支持显式关闭 Reasoning。请选择“跟随模型默认”。" : a.unsupportedReason || "当前模型不支持显式开启 Reasoning。");
  if (i.mode !== "on") return {
    ...i,
    profileId: a.profileId,
    valid: !0
  };
  if (a.intensity.kind === "effort") {
    const r = i.effort || a.intensity.defaultValue;
    return a.intensity.values.includes(r) ? {
      ...i,
      effort: r,
      profileId: a.profileId,
      valid: !0
    } : is(i, a, `当前模型不支持 Reasoning 强度“${r}”。`, "REASONING_CONFIG_INVALID");
  }
  return {
    ...i,
    profileId: a.profileId,
    valid: !0
  };
}
var jl = 900 * 1e3, Kl = Object.freeze([{
  value: "native",
  label: "原生 Tool Calling"
}, {
  value: "tagged-json",
  label: "Tagged JSON 兼容模式"
}]), cc = Object.freeze([
  {
    value: "openai-responses",
    label: "OpenAI Responses"
  },
  {
    value: "openai-compatible",
    label: "OpenAI 兼容"
  },
  {
    value: "sillytavern-openai-compatible",
    label: "酒馆 OpenAI 兼容"
  },
  {
    value: "sillytavern-claude",
    label: "酒馆 Claude"
  },
  {
    value: "sillytavern-google",
    label: "酒馆 Google AI"
  },
  {
    value: "anthropic",
    label: "Anthropic"
  },
  {
    value: "google",
    label: "Google AI"
  }
]);
function dt(e, t = 1) {
  const a = typeof e == "string" && !e.trim() ? t : e, n = Number(a);
  return Number.isFinite(n) ? Math.max(0, Math.min(2, n)) : dt(t, 1);
}
function rs(e = {}) {
  return e.sendTemperature !== !1;
}
function Gl(e = "", t = {}) {
  return t && typeof t == "object" && t[e] ? t[e] : cc.find((a) => a.value === e)?.label || e || "未配置";
}
var fc = { chat: { exclude: [
  "embedding",
  "embed",
  "rerank",
  "reranker",
  "tts",
  "speech",
  "audio",
  "whisper",
  "transcription",
  "stt",
  "image",
  "sdxl",
  "flux",
  "moderation"
] } }, vc = Object.freeze([
  "claude-opus-4-7",
  "claude-opus-4-6",
  "claude-opus-4-5",
  "claude-opus-4-5-20251101",
  "claude-sonnet-4-6",
  "claude-sonnet-4-5",
  "claude-sonnet-4-5-20250929",
  "claude-opus-4-1",
  "claude-opus-4-1-20250805",
  "claude-opus-4-0",
  "claude-opus-4-20250514",
  "claude-sonnet-4-0",
  "claude-sonnet-4-20250514"
]);
function yt(e, t, a = "") {
  if (e.replaceChildren(), a) {
    const n = document.createElement("option");
    n.value = "", n.textContent = a, e.appendChild(n);
  }
  t.forEach((n) => {
    const l = document.createElement("option");
    l.value = n.value, l.textContent = n.label, l.disabled = n.disabled === !0, e.appendChild(l);
  });
}
function vn(e = "", t = {}) {
  const a = ka(t.reasoning), n = Ws({
    provider: e,
    baseUrl: t.baseUrl,
    model: t.model
  }), l = {
    reasoningMode: a.mode,
    reasoningEffort: "",
    reasoningBudgetTokens: void 0
  };
  if (n.intensity.kind === "effort") l.reasoningEffort = n.intensity.values.includes(a.effort) ? a.effort : n.intensity.defaultValue;
  else if (n.intensity.kind === "budget") {
    const i = a.budgetTokens, r = n.intensity.allowAuto && i === -1, o = Number.isInteger(i) && i >= n.intensity.min && i <= n.intensity.max;
    l.reasoningBudgetTokens = r || o ? i : n.intensity.defaultValue;
  }
  return l;
}
function zl(e = {}) {
  return ka(e);
}
function en(e = []) {
  const t = [...new Set(e.filter(Boolean).map((l) => String(l).trim()).filter(Boolean))], a = fc.chat, n = t.filter((l) => {
    const i = l.toLowerCase();
    return !a.exclude.some((r) => i.includes(r));
  });
  return n.length ? n : t;
}
function pn(e = "") {
  return e === "delegate" ? "delegate" : "main";
}
function Ta(e) {
  return String(e || "").trim().replace(/\/+$/, "");
}
function pc(e = "") {
  return e === "sillytavern-openai-compatible" || e === "sillytavern-claude" || e === "sillytavern-google";
}
function ua(e = "") {
  return e === "openai-compatible" || e === "sillytavern-openai-compatible";
}
function mc(e = "") {
  return e === "anthropic" || e === "sillytavern-claude";
}
function gc(e = "") {
  return e === "sillytavern-claude" ? kr : e === "sillytavern-google" ? wr : _a;
}
function tn(e = []) {
  return [...new Set(e.filter(Boolean).map((t) => String(t).trim()).filter(Boolean))];
}
function bc(e) {
  const t = Ta(e);
  if (!t) return [];
  if (t.endsWith("/v1")) {
    const a = t.slice(0, -3);
    return tn([
      `${t}/models`,
      `${a}/v1/models`,
      `${a}/models`
    ]);
  }
  return tn([`${t}/v1/models`, `${t}/models`]);
}
function _r(e) {
  const t = Ta(e);
  if (!t) return [];
  if (t.endsWith("/v1")) {
    const a = t.slice(0, -3);
    return tn([
      `${t}/models`,
      `${a}/v1/models`,
      `${a}/models`
    ]);
  }
  return tn([`${t}/v1/models`, `${t}/models`]);
}
function hc(e, t) {
  const a = Ta(e);
  if (!a) return [];
  const n = a.endsWith("/v1beta") ? a.slice(0, -7) : a;
  return tn([
    `${a}/models?key=${encodeURIComponent(t)}`,
    `${a}/models`,
    `${n}/v1beta/models?key=${encodeURIComponent(t)}`,
    `${n}/v1beta/models`,
    `${n}/models?key=${encodeURIComponent(t)}`,
    `${n}/models`
  ]);
}
function yc(e, t) {
  const a = [
    e?.error?.message,
    e?.message,
    e?.detail,
    e?.details,
    e?.error
  ].find((n) => typeof n == "string" && n.trim());
  return a ? a.trim() : String(t || "").trim().slice(0, 160);
}
async function kc(e, t = {}) {
  const a = await fetch(e, t), n = await a.text();
  let l = null, i = null;
  try {
    l = n ? JSON.parse(n) : {};
  } catch (r) {
    i = r;
  }
  return {
    ok: a.ok,
    status: a.status,
    url: e,
    data: l,
    rawText: n,
    parseError: i,
    errorSnippet: yc(l, n)
  };
}
function wc(e) {
  return en((e?.data || []).map((t) => String(t?.id || "").trim()).filter(Boolean));
}
function qr(e) {
  return en((e?.data || []).map((t) => String(t?.id || "").trim()).filter(Boolean));
}
function Tc(e) {
  return en((e?.models || e?.data || []).map((t) => String(t?.id || t?.name || "")).map((t) => t.split("/").pop() || "").filter(Boolean));
}
async function wn({ urls: e, requestOptionsList: t, extractModels: a, providerLabel: n }) {
  let l = null;
  for (const i of e) for (const r of t) {
    const o = await kc(i, r);
    if (!o.ok) {
      l = o;
      continue;
    }
    if (o.parseError) {
      l = {
        ...o,
        errorSnippet: "返回的不是 JSON"
      };
      continue;
    }
    const u = a(o.data);
    if (u.length) return u;
    l = {
      ...o,
      errorSnippet: "返回成功，但模型列表为空"
    };
  }
  if (l) {
    const i = l.url ? ` (${l.url})` : "", r = l.errorSnippet ? `：${l.errorSnippet}` : "";
    throw new Error(`${n} 拉取模型失败：${l.status || "unknown"}${r}${i}`);
  }
  throw new Error(`${n} 拉取模型失败：未获取到模型列表。`);
}
async function xc(e, t = {}) {
  const a = String(e.apiKey || "").trim(), n = Ta(e.baseUrl || ""), l = Ta(n || Tr.claude);
  if (a && l) try {
    return await wn({
      urls: _r(l),
      requestOptionsList: [{
        headers: {
          "x-api-key": a,
          "anthropic-version": "2023-06-01",
          Accept: "application/json"
        },
        signal: t.signal
      }],
      extractModels: qr,
      providerLabel: "Anthropic"
    });
  } catch (i) {
    if (n) throw i;
  }
  return [...vc];
}
async function $c(e, t = {}) {
  const a = e.provider, n = Ta(e.baseUrl || ""), l = String(e.apiKey || "").trim();
  if (a === "sillytavern-claude") return en(await xc(e, t));
  if (pc(a)) return en(await zs(e, gc(a), { signal: t.signal }));
  if (!l) throw new Error("请先填写 API Key。");
  if (!n) throw new Error("请先填写 Base URL。");
  return a === "google" ? await wn({
    urls: hc(n, l),
    requestOptionsList: [
      {
        headers: {
          Accept: "application/json",
          "x-goog-api-key": l
        },
        signal: t.signal
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${l}`
        },
        signal: t.signal
      },
      {
        headers: { Accept: "application/json" },
        signal: t.signal
      }
    ],
    extractModels: Tc,
    providerLabel: "Google AI"
  }) : mc(a) ? await wn({
    urls: _r(n),
    requestOptionsList: [{
      headers: {
        "x-api-key": l,
        "anthropic-version": "2023-06-01",
        Accept: "application/json"
      },
      signal: t.signal
    }],
    extractModels: qr,
    providerLabel: "Anthropic"
  }) : await wn({
    urls: bc(n),
    requestOptionsList: [{
      headers: {
        Authorization: `Bearer ${l}`,
        Accept: "application/json"
      },
      signal: t.signal
    }],
    extractModels: wc,
    providerLabel: a === "openai-responses" ? "OpenAI Responses" : "OpenAI-Compatible"
  });
}
function Sc(e) {
  return e instanceof Error ? e.message : String(e || "unknown_error");
}
function _c(e = {}) {
  const { state: t, render: a, showToast: n, createRequestId: l = (c = "req") => `${c}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, saveConfig: i, reloadConfig: r, pullModels: o = $c, describeError: u = Sc, getRuntimeSummaryText: p } = e;
  function d() {
    t.configFormSyncPending = !0;
  }
  function y(c, f = "main") {
    const m = String(c || "").trim() || "openai-compatible";
    return f === "delegate" ? `delegate:${m}` : m;
  }
  function w(c, f = "main") {
    return t.pullStateByProvider?.[y(c, f)] || {
      status: "idle",
      message: ""
    };
  }
  function h(c, f, m = "main") {
    t.pullStateByProvider = {
      ...t.pullStateByProvider || {},
      [y(c, m)]: f
    };
  }
  function q(c, f, m = "main") {
    t.modelOptionsByProvider = {
      ...t.modelOptionsByProvider || {},
      [y(c, m)]: Array.isArray(f) ? f : []
    };
  }
  function P(c, f = "main") {
    const m = y(c, f);
    return Array.isArray(t.modelOptionsByProvider?.[m]) ? t.modelOptionsByProvider[m] : [];
  }
  function R(c, f) {
    const m = t.config?.presets || {}, x = Re(c || f || "默认");
    return m[x] ? x : f && m[f] ? f : Object.keys(m)[0] || "默认";
  }
  function D(c, f) {
    const m = R(c, Fs), x = f && typeof f == "object" ? f : it(), E = x.provider || "openai-compatible", N = lt(x.modelConfigs || {}), B = N[E] || {}, I = vn(E, B);
    return {
      delegatePresetName: m,
      delegateProvider: E,
      delegateModelConfigs: N,
      delegateBaseUrl: String(B.baseUrl || ""),
      delegateModel: String(B.model || ""),
      delegateApiKey: String(B.apiKey || ""),
      delegateTemperature: dt(B.temperature, 1),
      delegateMaxTokens: Ke(B.maxTokens),
      delegateSendTemperature: rs(B),
      delegateReasoningMode: I.reasoningMode,
      delegateReasoningEffort: I.reasoningEffort,
      delegateReasoningBudgetTokens: I.reasoningBudgetTokens,
      delegateToolMode: B.toolMode || "native"
    };
  }
  function L(c = "openai-compatible", f = {}) {
    const m = lt(f || {})[c] || {}, x = vn(c, m);
    return {
      baseUrl: String(m.baseUrl || ""),
      model: String(m.model || ""),
      apiKey: String(m.apiKey || ""),
      temperature: dt(m.temperature, 1),
      maxTokens: Ke(m.maxTokens),
      sendTemperature: rs(m),
      ...x,
      toolMode: m.toolMode || "native"
    };
  }
  function A(c = "openai-compatible", f = {}) {
    const m = lt(f || {})[c] || {}, x = vn(c, m);
    return {
      delegateBaseUrl: String(m.baseUrl || ""),
      delegateModel: String(m.model || ""),
      delegateApiKey: String(m.apiKey || ""),
      delegateTemperature: dt(m.temperature, 1),
      delegateMaxTokens: Ke(m.maxTokens),
      delegateSendTemperature: rs(m),
      delegateReasoningMode: x.reasoningMode,
      delegateReasoningEffort: x.reasoningEffort,
      delegateReasoningBudgetTokens: x.reasoningBudgetTokens,
      delegateToolMode: m.toolMode || "native"
    };
  }
  function C(c, f, m = t.config) {
    const x = Re(c || "默认"), E = f && typeof f == "object" ? f : it(), N = E.provider || "openai-compatible", B = lt(E.modelConfigs || {}), I = L(N, B), k = R(m?.delegatePresetName, x), O = D(k, m?.delegateConfig && typeof m.delegateConfig == "object" ? m.delegateConfig : (m?.presets || {})[k] || E);
    return {
      currentPresetName: x,
      presetDraftName: x,
      provider: N,
      modelConfigs: B,
      ...I,
      tavilyApiKey: String(m?.tavilyApiKey || ""),
      tavilyBaseUrl: wt(m?.tavilyBaseUrl || "https://api.tavily.com"),
      permissionMode: fa(E.permissionMode),
      jsApiPermission: zt(m?.jsApiPermission),
      ...O
    };
  }
  function T() {
    if (t.configDraft) return t.configDraft;
    const c = Re(t.config?.currentPresetName || "默认");
    return t.configDraft = C(c, (t.config?.presets || {})[c] || it()), t.configDraft;
  }
  function M(c, f = {}) {
    const m = T(), x = f.provider || c.querySelector("#xb-assistant-provider")?.value || m.provider || "openai-compatible", E = f.delegateProvider || c.querySelector("#xb-assistant-delegate-provider")?.value || m.delegateProvider || "openai-compatible", N = c.querySelector("#xb-assistant-base-url")?.value.trim() || "", B = c.querySelector("#xb-assistant-model")?.value.trim() || "", I = c.querySelector("#xb-assistant-delegate-base-url")?.value.trim() ?? m.delegateBaseUrl ?? "", k = c.querySelector("#xb-assistant-delegate-model")?.value.trim() ?? m.delegateModel ?? "", O = zl({
      mode: c.querySelector("#xb-assistant-reasoning-mode")?.value || m.reasoningMode,
      effort: c.querySelector("#xb-assistant-reasoning-effort")?.value || m.reasoningEffort,
      budgetTokens: c.querySelector("#xb-assistant-reasoning-budget")?.value ?? m.reasoningBudgetTokens
    }), U = zl({
      mode: c.querySelector("#xb-assistant-delegate-reasoning-mode")?.value || m.delegateReasoningMode,
      effort: c.querySelector("#xb-assistant-delegate-reasoning-effort")?.value || m.delegateReasoningEffort,
      budgetTokens: c.querySelector("#xb-assistant-delegate-reasoning-budget")?.value ?? m.delegateReasoningBudgetTokens
    }), Q = {
      baseUrl: N,
      model: B,
      apiKey: c.querySelector("#xb-assistant-api-key")?.value.trim() || "",
      temperature: dt(c.querySelector("#xb-assistant-temperature")?.value, m.temperature ?? 1),
      maxTokens: Ke(c.querySelector("#xb-assistant-max-tokens")?.value, m.maxTokens),
      sendTemperature: c.querySelector("#xb-assistant-send-temperature")?.checked ?? !!(m.sendTemperature ?? !0),
      reasoning: O,
      toolMode: ua(x) ? c.querySelector("#xb-assistant-tool-mode")?.value || m.toolMode || "native" : void 0
    }, z = {
      baseUrl: I,
      model: k,
      apiKey: c.querySelector("#xb-assistant-delegate-api-key")?.value.trim() ?? m.delegateApiKey ?? "",
      temperature: dt(c.querySelector("#xb-assistant-delegate-temperature")?.value, m.delegateTemperature ?? 1),
      maxTokens: Ke(c.querySelector("#xb-assistant-delegate-max-tokens")?.value, m.delegateMaxTokens),
      sendTemperature: c.querySelector("#xb-assistant-delegate-send-temperature")?.checked ?? !!(m.delegateSendTemperature ?? !0),
      reasoning: U,
      toolMode: ua(E) ? c.querySelector("#xb-assistant-delegate-tool-mode")?.value || m.delegateToolMode || "native" : void 0
    }, ee = {
      ...lt(m.modelConfigs || {}),
      [x]: {
        ...lt(m.modelConfigs || {})[x] || {},
        ...Q
      }
    }, ne = {
      ...lt(m.delegateModelConfigs || {}),
      [E]: {
        ...lt(m.delegateModelConfigs || {})[E] || {},
        ...z
      }
    };
    return {
      ...m,
      currentPresetName: m.currentPresetName,
      presetDraftName: Re(c.querySelector("#xb-assistant-preset-name")?.value),
      provider: x,
      modelConfigs: ee,
      baseUrl: Q.baseUrl,
      model: Q.model,
      apiKey: Q.apiKey,
      temperature: Q.temperature,
      maxTokens: Q.maxTokens,
      sendTemperature: Q.sendTemperature,
      reasoningMode: Q.reasoning.mode,
      reasoningEffort: Q.reasoning.effort || "",
      reasoningBudgetTokens: Q.reasoning.budgetTokens,
      toolMode: Q.toolMode || m.toolMode || "native",
      tavilyApiKey: c.querySelector("#xb-assistant-tavily-api-key")?.value.trim() ?? m.tavilyApiKey ?? "",
      tavilyBaseUrl: wt(m.tavilyBaseUrl || "https://api.tavily.com"),
      permissionMode: fa(c.querySelector("#xb-assistant-permission-mode")?.value || m.permissionMode),
      jsApiPermission: zt(c.querySelector("#xb-assistant-jsapi-permission")?.value || m.jsApiPermission),
      delegatePresetName: R(c.querySelector("#xb-assistant-delegate-preset-select")?.value || m.delegatePresetName, m.currentPresetName),
      delegateProvider: E,
      delegateModelConfigs: ne,
      delegateBaseUrl: z.baseUrl,
      delegateModel: z.model,
      delegateApiKey: z.apiKey,
      delegateTemperature: z.temperature,
      delegateMaxTokens: z.maxTokens,
      delegateSendTemperature: z.sendTemperature,
      delegateReasoningMode: z.reasoning.mode,
      delegateReasoningEffort: z.reasoning.effort || "",
      delegateReasoningBudgetTokens: z.reasoning.budgetTokens,
      delegateToolMode: z.toolMode || m.delegateToolMode || "native"
    };
  }
  function $(c, f = {}) {
    return t.configDraft = M(c, f), t.configDirty = !0, t.configDraft;
  }
  function _(c = T()) {
    return {
      baseUrl: String(c.baseUrl || ""),
      model: String(c.model || ""),
      apiKey: String(c.apiKey || ""),
      temperature: dt(c.temperature, 1),
      maxTokens: Ke(c.maxTokens),
      sendTemperature: !!(c.sendTemperature ?? !0),
      reasoning: ka({
        mode: c.reasoningMode,
        effort: c.reasoningEffort,
        budgetTokens: c.reasoningBudgetTokens
      }),
      toolMode: ua(c.provider) ? c.toolMode || "native" : void 0
    };
  }
  function S(c = T()) {
    return {
      baseUrl: String(c.delegateBaseUrl || ""),
      model: String(c.delegateModel || ""),
      apiKey: String(c.delegateApiKey || ""),
      temperature: dt(c.delegateTemperature, 1),
      maxTokens: Ke(c.delegateMaxTokens),
      sendTemperature: !!(c.delegateSendTemperature ?? !0),
      reasoning: ka({
        mode: c.delegateReasoningMode,
        effort: c.delegateReasoningEffort,
        budgetTokens: c.delegateReasoningBudgetTokens
      }),
      toolMode: ua(c.delegateProvider) ? c.delegateToolMode || "native" : void 0
    };
  }
  function G(c = T()) {
    const f = c.delegateProvider || "openai-compatible", m = lt(c.delegateModelConfigs || {});
    return {
      provider: f,
      modelConfigs: {
        ...m,
        [f]: {
          ...m[f] || {},
          ...S(c)
        }
      }
    };
  }
  function te(c = T()) {
    return {
      provider: c.provider || "openai-compatible",
      baseUrl: c.baseUrl || "",
      model: c.model || "",
      apiKey: c.apiKey || "",
      tavilyApiKey: c.tavilyApiKey || "",
      tavilyBaseUrl: wt(c.tavilyBaseUrl || "https://api.tavily.com"),
      temperature: c.sendTemperature === !1 ? void 0 : dt(c.temperature, 1),
      sendTemperature: !!(c.sendTemperature ?? !0),
      maxTokens: Ke(c.maxTokens),
      timeoutMs: jl,
      toolMode: c.toolMode || "native",
      reasoning: fn({
        provider: c.provider,
        baseUrl: c.baseUrl,
        model: c.model,
        maxTokens: Ke(c.maxTokens)
      }, {
        mode: c.reasoningMode,
        effort: c.reasoningEffort,
        budgetTokens: c.reasoningBudgetTokens
      })
    };
  }
  function X(c = T()) {
    return {
      provider: c.delegateProvider || "openai-compatible",
      baseUrl: c.delegateBaseUrl || "",
      model: c.delegateModel || "",
      apiKey: c.delegateApiKey || "",
      tavilyApiKey: c.tavilyApiKey || "",
      tavilyBaseUrl: wt(c.tavilyBaseUrl || "https://api.tavily.com"),
      temperature: c.delegateSendTemperature === !1 ? void 0 : dt(c.delegateTemperature, 1),
      sendTemperature: !!(c.delegateSendTemperature ?? !0),
      maxTokens: Ke(c.delegateMaxTokens),
      timeoutMs: jl,
      toolMode: c.delegateToolMode || "native",
      reasoning: fn({
        provider: c.delegateProvider,
        baseUrl: c.delegateBaseUrl,
        model: c.delegateModel,
        maxTokens: Ke(c.delegateMaxTokens)
      }, {
        mode: c.delegateReasoningMode,
        effort: c.delegateReasoningEffort,
        budgetTokens: c.delegateReasoningBudgetTokens
      })
    };
  }
  function W(c = {}) {
    const f = [];
    Object.entries(c.presets || {}).forEach(([N, B]) => {
      const I = B?.provider || "openai-compatible", k = B?.modelConfigs?.[I] || {}, O = fn({
        provider: I,
        baseUrl: k.baseUrl,
        model: k.model,
        maxTokens: Ke(k.maxTokens)
      }, k.reasoning);
      O.valid === !1 && f.push(`预设“${N}”：${O.error}`);
    });
    const m = c.delegateConfig?.provider || "openai-compatible", x = c.delegateConfig?.modelConfigs?.[m] || {}, E = fn({
      provider: m,
      baseUrl: x.baseUrl,
      model: x.model,
      maxTokens: Ke(x.maxTokens)
    }, x.reasoning);
    return E.valid === !1 && f.push(`分身模型：${E.error}`), f;
  }
  function F(c = {}) {
    const f = (c.role === "delegate", T());
    return c.role === "delegate" ? X(f) : te(f);
  }
  function re(c) {
    T(), t.configDraft = {
      ...t.configDraft,
      presetDraftName: Re(c.querySelector("#xb-assistant-preset-name")?.value)
    };
  }
  function ce(c = T(), f = c.provider || "openai-compatible", m = "main") {
    const x = w(f, m);
    return typeof p == "function" ? p({
      state: t,
      draft: c,
      provider: f,
      pullState: x,
      providerLabel: Gl(f)
    }) : `预设「${c.currentPresetName || "默认"}」 · ${Gl(f)}`;
  }
  function pe(c, f, m) {
    const x = c?.querySelector?.(f);
    if (!x) return;
    const E = String(m?.status || "idle"), N = String(m?.message || "").trim();
    x.textContent = N, x.hidden = !N, x.classList.toggle("is-loading", E === "loading"), x.classList.toggle("is-success", E === "success"), x.classList.toggle("is-error", E === "error");
  }
  function he(c) {
    if (!c) return;
    const f = pn(t.configPage);
    t.configPage = f, c.querySelectorAll("[data-config-page]").forEach((m) => {
      const x = pn(m?.dataset?.configPage) === f;
      m.classList.toggle("is-active", x), m.setAttribute("aria-selected", x ? "true" : "false");
    }), c.querySelectorAll("[data-config-page-panel]").forEach((m) => {
      const x = pn(m?.dataset?.configPagePanel) === f;
      m.toggleAttribute("hidden", !x);
    }), c.querySelector("#xb-assistant-delete-preset")?.toggleAttribute("hidden", f === "delegate");
  }
  function _e(c, f = "main") {
    const m = T(), x = f === "delegate", E = x ? "#xb-assistant-delegate-reasoning" : "#xb-assistant-reasoning", N = x ? m.delegateProvider : m.provider, B = x ? m.delegateBaseUrl : m.baseUrl, I = x ? m.delegateModel : m.model, k = {
      mode: x ? m.delegateReasoningMode : m.reasoningMode,
      effort: x ? m.delegateReasoningEffort : m.reasoningEffort,
      budgetTokens: x ? m.delegateReasoningBudgetTokens : m.reasoningBudgetTokens
    }, O = Ws({
      provider: N,
      baseUrl: B,
      model: I
    }), U = vn(N, {
      baseUrl: B,
      model: I,
      reasoning: k
    }), Q = U.reasoningMode, z = U.reasoningEffort, ee = U.reasoningBudgetTokens, ne = c.querySelector(`${E}-mode`), ve = c.querySelector(`${E}-capability`), ye = c.querySelector(`${E}-effort-wrap`), ke = c.querySelector(`${E}-effort`), xe = c.querySelector(`${E}-budget-wrap`), $e = c.querySelector(`${E}-budget`);
    ne && (yt(ne, oc(O)), ne.value = Q), ve && (ve.textContent = O.unsupportedReason || `能力配置：${O.profileId}`), ke && (yt(ke, uc(O)), ke.value = z), ye && (ye.style.display = Q === "on" && O.intensity.kind === "effort" ? "" : "none"), $e && O.intensity.kind === "budget" && ($e.min = O.intensity.allowAuto ? "-1" : String(O.intensity.min), $e.max = String(O.intensity.max), $e.value = String(ee)), xe && (xe.style.display = Q === "on" && O.intensity.kind === "budget" ? "" : "none");
  }
  function Ee(c) {
    const f = c.querySelector("#xb-assistant-runtime");
    if (!f) return;
    const m = T(), x = t.configPage === "delegate", E = x ? m.delegateProvider : m.provider;
    f.textContent = ce(x ? {
      ...m,
      currentPresetName: "分身",
      provider: E
    } : m, E || "openai-compatible", x ? "delegate" : "main");
  }
  function nt(c) {
    if (!t.config) return;
    he(c);
    const f = T(), m = f.provider || "openai-compatible", x = P(m), E = f.delegateProvider || "openai-compatible", N = P(E, "delegate"), B = c.querySelector("#xb-assistant-provider"), I = c.querySelector("#xb-assistant-base-url"), k = c.querySelector("#xb-assistant-model"), O = c.querySelector("#xb-assistant-api-key"), U = c.querySelector("#xb-assistant-temperature"), Q = c.querySelector("#xb-assistant-send-temperature"), z = c.querySelector("#xb-assistant-tool-mode-wrap"), ee = c.querySelector("#xb-assistant-tool-mode"), ne = c.querySelector("#xb-assistant-permission-mode"), ve = c.querySelector("#xb-assistant-jsapi-permission"), ye = c.querySelector("#xb-assistant-model-pulled"), ke = c.querySelector("#xb-assistant-max-tokens"), xe = c.querySelector("#xb-assistant-preset-select"), $e = c.querySelector("#xb-assistant-preset-name"), We = c.querySelector("#xb-assistant-delegate-preset-select"), Fe = c.querySelector("#xb-assistant-delegate-provider"), jt = c.querySelector("#xb-assistant-delegate-base-url"), qa = c.querySelector("#xb-assistant-delegate-model"), He = c.querySelector("#xb-assistant-delegate-api-key"), st = c.querySelector("#xb-assistant-tavily-api-key"), ra = c.querySelector("#xb-assistant-delegate-model-pulled"), Ca = c.querySelector("#xb-assistant-delegate-max-tokens"), Ys = c.querySelector("#xb-assistant-delegate-tool-mode-wrap"), Vn = c.querySelector("#xb-assistant-delegate-tool-mode");
    if (!xe || !$e) return;
    const Qs = (t.config.presetNames || []).map((Kt) => ({
      value: Kt,
      label: Kt
    }));
    yt(xe, Qs), xe.value = f.currentPresetName || t.config.currentPresetName || "默认", We && (yt(We, Qs), We.value = R(f.delegatePresetName, f.currentPresetName)), $e.value = f.presetDraftName || f.currentPresetName || "默认", B && (B.value = m), I && (I.value = f.baseUrl || ""), k && (k.value = f.model || ""), O && (O.value = f.apiKey || ""), ke && (ke.value = String(Ke(f.maxTokens))), U && (U.value = String(dt(f.temperature, 1))), Q && (Q.checked = !!(f.sendTemperature ?? !0)), st && (st.value = f.tavilyApiKey || ""), z && (z.style.display = ua(m) ? "" : "none"), ee && (yt(ee, Kl), ee.value = f.toolMode || "native"), ne && (yt(ne, hd), ne.value = fa(f.permissionMode)), ve && (yt(ve, yd), ve.value = zt(f.jsApiPermission)), _e(c), ye && (yt(ye, x.map((Kt) => ({
      value: Kt,
      label: Kt
    })), "手动填写"), ye.value = x.includes(f.model) ? f.model : ""), Fe && (Fe.value = E), jt && (jt.value = f.delegateBaseUrl || ""), qa && (qa.value = f.delegateModel || ""), He && (He.value = f.delegateApiKey || "");
    const Xs = c.querySelector("#xb-assistant-delegate-temperature"), Js = c.querySelector("#xb-assistant-delegate-send-temperature");
    Ca && (Ca.value = String(Ke(f.delegateMaxTokens))), Xs && (Xs.value = String(dt(f.delegateTemperature, 1))), Js && (Js.checked = !!(f.delegateSendTemperature ?? !0)), Ys && (Ys.style.display = ua(E) ? "" : "none"), Vn && (yt(Vn, Kl), Vn.value = f.delegateToolMode || "native"), _e(c, "delegate"), ra && (yt(ra, N.map((Kt) => ({
      value: Kt,
      label: Kt
    })), "手动填写"), ra.value = N.includes(f.delegateModel) ? f.delegateModel : ""), pe(c, "#xb-assistant-model-pull-status", w(m)), pe(c, "#xb-assistant-delegate-model-pull-status", w(E, "delegate")), Ee(c);
  }
  function Be(c) {
    if (typeof i != "function") return;
    const f = i(c);
    f && typeof f.catch == "function" && f.catch((m) => {
      n?.(u(m));
    });
  }
  function Le(c, f, m) {
    c.querySelector(f)?.addEventListener("click", () => {
      const x = c.querySelector(m);
      x && (x.type = x.type === "password" ? "text" : "password");
    });
  }
  function Mt(c) {
    return {
      expectedUpdatedAt: Number(c?.updatedAt) || 0,
      workspaceFileName: c?.workspaceFileName || "",
      jsApiPermission: zt(c?.jsApiPermission),
      tavilyApiKey: String(c?.tavilyApiKey || ""),
      tavilyBaseUrl: wt(c?.tavilyBaseUrl || "https://api.tavily.com"),
      currentPresetName: c?.currentPresetName || "默认",
      delegatePresetName: c?.delegatePresetName || c?.currentPresetName || "默认",
      delegateConfig: c?.delegateConfig || {},
      delegateConfigured: c?.delegateConfigured === !0,
      presets: c?.presets || {}
    };
  }
  function bt(c, f = {}) {
    const m = In(c), x = W(m);
    if (x.length)
      return n?.(x[0]), !1;
    t.config = m;
    const E = Re(f.presetName || m.currentPresetName || "默认");
    return t.configDraft = C(E, m.presets?.[E] || it(), m), d(), Be({
      requestId: l(f.requestPrefix || "save-config"),
      config: m,
      payload: Mt(m)
    }), !0;
  }
  function Z(c, f = {}) {
    const m = $(c), x = Re(f.presetName || m.presetDraftName), E = Re(m.currentPresetName || t.config?.currentPresetName || "默认"), N = (t.config?.presets || {})[E] || it(), B = lt(m.modelConfigs || N.modelConfigs || {}), I = {
      ...N,
      provider: m.provider,
      permissionMode: fa(m.permissionMode),
      modelConfigs: {
        ...B,
        [m.provider]: {
          ...B[m.provider] || {},
          ..._(m)
        }
      }
    }, k = { ...t.config?.presets || {} };
    f.renameCurrentPreset && x !== E && delete k[E], k[x] = I, bt({
      ...t.config,
      jsApiPermission: zt(m.jsApiPermission),
      tavilyApiKey: String(m.tavilyApiKey || ""),
      tavilyBaseUrl: wt(m.tavilyBaseUrl || "https://api.tavily.com"),
      currentPresetName: x,
      delegatePresetName: R(m.delegatePresetName, x),
      delegateConfig: G(m),
      delegateConfigured: f.configureDelegate === !0 || t.config?.delegateConfigured === !0,
      presets: k
    }, {
      presetName: x,
      requestPrefix: f.requestPrefix
    });
  }
  function j(c, f = "") {
    const m = Re(f || "默认"), x = typeof window < "u" && typeof window.prompt == "function" ? window.prompt(c, m) : m;
    return x === null ? "" : Re(x);
  }
  function le(c) {
    const f = j("输入新预设名称：", `${$(c).currentPresetName || "默认"} 副本`);
    if (!f) {
      n?.("预设名称不能为空");
      return;
    }
    const m = c.querySelector("#xb-assistant-preset-name");
    m && (m.value = f, Z(c, {
      presetName: f,
      requestPrefix: "create-preset"
    }));
  }
  function Ie(c) {
    const f = $(c), m = Re(f.currentPresetName || t.config?.currentPresetName || "默认"), x = j("输入预设名称：", f.presetDraftName || m);
    if (!x) {
      n?.("预设名称不能为空");
      return;
    }
    if (x === m) return;
    const E = c.querySelector("#xb-assistant-preset-name");
    E && (E.value = x, Z(c, {
      presetName: x,
      renameCurrentPreset: !0,
      requestPrefix: "rename-preset"
    }));
  }
  function Pe(c) {
    if (Object.keys(t.config?.presets || {}).length <= 1) {
      n?.("至少要保留一套预设");
      return;
    }
    const f = $(c), m = Re(t.configDraft?.currentPresetName || t.config?.currentPresetName || "默认"), x = { ...t.config?.presets || {} };
    delete x[m];
    const E = Object.keys(x)[0] || "默认";
    bt({
      ...t.config,
      jsApiPermission: zt(f.jsApiPermission),
      tavilyApiKey: String(f.tavilyApiKey || t.config?.tavilyApiKey || ""),
      tavilyBaseUrl: wt(f.tavilyBaseUrl || t.config?.tavilyBaseUrl || "https://api.tavily.com"),
      currentPresetName: E,
      delegatePresetName: R(f.delegatePresetName, E),
      delegateConfig: G(f),
      presets: x
    }, {
      presetName: E,
      requestPrefix: "delete-preset"
    }) && a?.();
  }
  function Y(c) {
    c?.querySelector?.("[data-xb-agent-config-retry]")?.addEventListener("click", () => {
      r?.();
    }), c?.querySelector?.("[data-xb-agent-config-reload]")?.addEventListener("click", () => {
      t.configDraft = null, t.configDirty = !1, t.configExternalChangePending = !1, d(), r?.();
    }), c?.querySelector?.("#xb-assistant-provider") && (c.querySelector("#xb-assistant-provider")?.addEventListener("change", (f) => {
      const m = f.currentTarget.value, x = T().provider, E = $(c, { provider: x });
      t.configDraft = {
        ...E,
        provider: m,
        ...L(m, E.modelConfigs)
      }, d(), a?.();
    }), c.querySelector("#xb-assistant-preset-select")?.addEventListener("change", (f) => {
      const m = Re(f.currentTarget.value), x = (t.config?.presets || {})[m] || it(), E = $(c);
      t.config = In({
        ...t.config,
        jsApiPermission: zt(E.jsApiPermission),
        currentPresetName: m,
        delegatePresetName: R(E.delegatePresetName, m),
        delegateConfig: G(E)
      }), t.configDraft = C(m, x, t.config), d(), a?.();
    }), c.querySelector("#xb-assistant-preset-name")?.addEventListener("input", () => {
      re(c);
    }), c.querySelector("#xb-assistant-base-url")?.addEventListener("input", () => {
      $(c), _e(c), Ee(c);
    }), c.querySelector("#xb-assistant-model")?.addEventListener("input", () => {
      $(c), _e(c), Ee(c);
    }), c.querySelector("#xb-assistant-api-key")?.addEventListener("input", () => {
      $(c);
    }), c.querySelector("#xb-assistant-max-tokens")?.addEventListener("input", () => {
      $(c);
    }), c.querySelector("#xb-assistant-temperature")?.addEventListener("input", () => {
      $(c);
    }), c.querySelector("#xb-assistant-send-temperature")?.addEventListener("change", () => {
      $(c);
    }), c.querySelector("#xb-assistant-tavily-api-key")?.addEventListener("input", () => {
      $(c);
    }), c.querySelector("#xb-assistant-model-pulled")?.addEventListener("change", (f) => {
      const m = f.currentTarget.value;
      if (!m) return;
      const x = c.querySelector("#xb-assistant-model");
      x && (x.value = m), $(c), _e(c), Ee(c);
    }), Le(c, "#xb-assistant-toggle-key", "#xb-assistant-api-key"), Le(c, "#xb-assistant-toggle-tavily-key", "#xb-assistant-tavily-api-key"), c.querySelector("#xb-assistant-delegate-provider")?.addEventListener("change", (f) => {
      const m = f.currentTarget.value, x = T().delegateProvider, E = $(c, { delegateProvider: x });
      t.configDraft = {
        ...E,
        delegateProvider: m,
        ...A(m, E.delegateModelConfigs)
      }, d(), a?.();
    }), c.querySelector("#xb-assistant-delegate-base-url")?.addEventListener("input", () => {
      $(c), _e(c, "delegate"), Ee(c);
    }), c.querySelector("#xb-assistant-delegate-model")?.addEventListener("input", () => {
      $(c), _e(c, "delegate"), Ee(c);
    }), c.querySelector("#xb-assistant-delegate-api-key")?.addEventListener("input", () => {
      $(c);
    }), c.querySelector("#xb-assistant-delegate-max-tokens")?.addEventListener("input", () => {
      $(c);
    }), c.querySelector("#xb-assistant-delegate-temperature")?.addEventListener("input", () => {
      $(c);
    }), c.querySelector("#xb-assistant-delegate-send-temperature")?.addEventListener("change", () => {
      $(c);
    }), c.querySelector("#xb-assistant-delegate-model-pulled")?.addEventListener("change", (f) => {
      const m = f.currentTarget.value;
      if (!m) return;
      const x = c.querySelector("#xb-assistant-delegate-model");
      x && (x.value = m), $(c), _e(c, "delegate"), Ee(c);
    }), Le(c, "#xb-assistant-delegate-toggle-key", "#xb-assistant-delegate-api-key"), c.querySelector("#xb-assistant-reasoning-mode")?.addEventListener("change", () => {
      $(c), _e(c), Ee(c);
    }), c.querySelector("#xb-assistant-reasoning-effort")?.addEventListener("change", () => {
      $(c);
    }), c.querySelector("#xb-assistant-reasoning-budget")?.addEventListener("input", () => {
      $(c);
    }), c.querySelector("#xb-assistant-tool-mode")?.addEventListener("change", () => {
      $(c);
    }), c.querySelector("#xb-assistant-delegate-reasoning-mode")?.addEventListener("change", () => {
      $(c), _e(c, "delegate"), Ee(c);
    }), c.querySelector("#xb-assistant-delegate-reasoning-effort")?.addEventListener("change", () => {
      $(c);
    }), c.querySelector("#xb-assistant-delegate-reasoning-budget")?.addEventListener("input", () => {
      $(c);
    }), c.querySelector("#xb-assistant-delegate-tool-mode")?.addEventListener("change", () => {
      $(c);
    }), c.querySelector("#xb-assistant-permission-mode")?.addEventListener("change", () => {
      $(c);
    }), c.querySelector("#xb-assistant-jsapi-permission")?.addEventListener("change", () => {
      $(c);
    }), c.querySelector("#xb-assistant-delegate-preset-select")?.addEventListener("change", (f) => {
      const m = R(f.currentTarget?.value, t.configDraft?.currentPresetName || t.config?.currentPresetName || "默认"), x = (t.config?.presets || {})[m] || it();
      t.configDraft = {
        ...$(c),
        ...D(m, x)
      }, d(), a?.();
    }), c.querySelectorAll("[data-config-page]").forEach((f) => {
      f.addEventListener("click", (m) => {
        $(c), t.configPage = pn(m.currentTarget?.dataset?.configPage), he(c), nt(c);
      });
    }), c.querySelector("#xb-assistant-pull-models")?.addEventListener("click", async () => {
      $(c), d();
      const f = F();
      h(f.provider, {
        status: "loading",
        message: "正在拉取模型列表…"
      }), a?.();
      try {
        const m = await o(f);
        q(f.provider, m), h(f.provider, {
          status: "success",
          message: `已拉取 ${m.length} 个模型`
        });
      } catch (m) {
        q(f.provider, []), h(f.provider, {
          status: "error",
          message: u(m)
        });
      }
      d(), a?.();
    }), c.querySelector("#xb-assistant-delegate-pull-models")?.addEventListener("click", async () => {
      $(c), d();
      const f = F({ role: "delegate" });
      h(f.provider, {
        status: "loading",
        message: "正在拉取模型列表…"
      }, "delegate"), a?.();
      try {
        const m = await o(f);
        q(f.provider, m, "delegate"), h(f.provider, {
          status: "success",
          message: `已拉取 ${m.length} 个模型`
        }, "delegate");
      } catch (m) {
        q(f.provider, [], "delegate"), h(f.provider, {
          status: "error",
          message: u(m)
        }, "delegate");
      }
      d(), a?.();
    }), c.querySelector("#xb-assistant-new-preset")?.addEventListener("click", () => {
      le(c);
    }), c.querySelector("#xb-assistant-rename-preset")?.addEventListener("click", () => {
      Ie(c);
    }), c.querySelector("#xb-assistant-save")?.addEventListener("click", () => {
      Z(c);
    }), c.querySelector("#xb-assistant-delegate-save")?.addEventListener("click", () => {
      Z(c, {
        requestPrefix: "save-delegate-config",
        configureDelegate: !0
      });
    }), c.querySelector("#xb-assistant-delete-preset")?.addEventListener("click", () => {
      Pe(c);
    }));
  }
  return {
    getActiveProviderConfig: F,
    getActiveProviderConfigFromForm(c, f = {}) {
      return t.configDraft = M(c), F(f);
    },
    syncConfigToForm: nt,
    bindSettingsPanelEvents: Y
  };
}
function Da(e = "") {
  return String(e || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function Oa(e) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${{
    add: '<path d="M12 5v14" /><path d="M5 12h14" />',
    rename: '<path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />',
    save: '<path d="M5 21h14a1 1 0 0 0 1-1V7.5L16.5 4H5a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1Z" /><path d="M8 21v-7h8v7" /><path d="M8 4v5h7" />',
    saving: '<path class="xb-assistant-save-spinner" d="M12 3a9 9 0 1 1-8.2 5.3" />',
    success: '<path d="M20 6 9 17l-5-5" />',
    error: '<path d="M18 6 6 18" /><path d="M6 6l12 12" />',
    delete: '<path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M19 6l-1 14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1L5 6" /><path d="M10 11v6" /><path d="M14 11v6" />'
  }[e] || ""}</svg>`;
}
function qc(e = {}) {
  const t = String(e?.status || "idle");
  return t === "saving" ? "saving" : t === "success" ? "success" : t === "error" ? "error" : "save";
}
function Cc(e = {}) {
  const t = String(e?.status || "idle");
  return t === "saving" ? {
    className: "xb-assistant-save-button is-saving",
    title: "正在保存配置"
  } : t === "success" ? {
    className: "xb-assistant-save-button is-success",
    title: "配置已保存"
  } : t === "error" ? {
    className: "xb-assistant-save-button is-error",
    title: Da(e?.error || "保存失败")
  } : {
    className: "xb-assistant-save-button",
    title: "保存配置"
  };
}
function Mc(e = {}) {
  const { configSave: t = {}, runtimeText: a = "", inlineToastText: n = "", showInlineToast: l = !0, showAssistantPermissions: i = !0, showDelegateSettings: r = !0, showTavilySettings: o = !0, activePage: u = "main", delegatePresetHint: p = "DelegateRun 分身会使用这里的独立 API 配置；可以和主助手使用不同 Provider、Base URL、模型和 Tool 调用格式。", isBusy: d = !1, canDeletePreset: y = !0, configLoadError: w = "", configExternalChangePending: h = !1 } = e, q = String(w || "").trim(), P = Cc(t), R = qc(t), D = d || q || String(t?.status || "") === "saving" ? "disabled" : "", L = d || !y ? "disabled" : "", A = u === "delegate" ? "delegate" : "main", C = A === "main", T = A === "delegate", M = i ? `
            <label>
                <span>斜杠命令权限</span>
                <select id="xb-assistant-permission-mode"></select>
            </label>
            <label>
                <span>JavaScript API 权限</span>
                <select id="xb-assistant-jsapi-permission"></select>
            </label>` : "", $ = r ? `
            <div class="xb-assistant-config-tabs" role="tablist" aria-label="API 配置分页">
                <button id="xb-assistant-config-tab-main" type="button" class="xb-assistant-config-tab ${C ? "is-active" : ""}" data-config-page="main" role="tab" aria-selected="${C ? "true" : "false"}">主助手 API</button>
                <button id="xb-assistant-config-tab-delegate" type="button" class="xb-assistant-config-tab ${T ? "is-active" : ""}" data-config-page="delegate" role="tab" aria-selected="${T ? "true" : "false"}">分身 API</button>
            </div>` : "", _ = r ? `
            <div class="xb-assistant-config-page" data-config-page-panel="delegate" ${T ? "" : "hidden"}>
                <p class="xb-assistant-config-note">${Da(p)}</p>
                <div class="xb-assistant-preset-row">
                    <select id="xb-assistant-delegate-preset-select" class="xb-assistant-preset-field" aria-label="已存预设"></select>
                    <div class="xb-assistant-preset-tools is-single" aria-label="分身 API 预设操作">
                        <button id="xb-assistant-delegate-save" type="button" class="xb-assistant-icon-button ${P.className}" title="${P.title}" aria-label="${P.title}" ${D}>${Oa(R)}</button>
                    </div>
                </div>
                <label>
                    <span>Provider</span>
                    <select id="xb-assistant-delegate-provider">
                        <option value="openai-responses">OpenAI Responses</option>
                        <option value="openai-compatible">OpenAI 兼容</option>
                        <option value="sillytavern-openai-compatible">酒馆 OpenAI 兼容</option>
                        <option value="sillytavern-claude">酒馆 Claude</option>
                        <option value="sillytavern-google">酒馆 Google AI</option>
                        <option value="anthropic">Anthropic</option>
                        <option value="google">Google AI</option>
                    </select>
                </label>
                <label>
                    <span>Base URL</span>
                    <input id="xb-assistant-delegate-base-url" type="text" />
                </label>
                <label>
                    <span>API Key</span>
                    <div class="xb-assistant-inline-input">
                        <input id="xb-assistant-delegate-api-key" type="password" />
                        <button id="xb-assistant-delegate-toggle-key" type="button" class="secondary ghost">显示</button>
                    </div>
                </label>
                <label>
                    <span>Model</span>
                    <input id="xb-assistant-delegate-model" type="text" />
                </label>
                <div class="xb-assistant-inline-input xb-assistant-model-row">
                    <label class="xb-assistant-grow">
                        <span>已拉取模型</span>
                        <select id="xb-assistant-delegate-model-pulled">
                            <option value="">手动填写</option>
                        </select>
                    </label>
                    <button id="xb-assistant-delegate-pull-models" type="button" class="secondary" ${d ? "disabled" : ""}>拉取模型</button>
                </div>
                <div class="xb-assistant-inline-status" id="xb-assistant-delegate-model-pull-status" aria-live="polite" hidden></div>
                <label>
                    <span>最大输出 Token</span>
                    <input id="xb-assistant-delegate-max-tokens" type="number" min="1" step="1" inputmode="numeric" />
                </label>
                <div class="xb-assistant-temperature-row">
                    <label>
                        <span>温度</span>
                        <input id="xb-assistant-delegate-temperature" type="number" min="0" max="2" step="0.05" />
                    </label>
                    <label class="xb-assistant-checkbox-row">
                        <span>允许传参</span>
                        <span class="xb-assistant-checkbox-control">
                            <input id="xb-assistant-delegate-send-temperature" type="checkbox" />
                        </span>
                    </label>
                </div>
                <label id="xb-assistant-delegate-tool-mode-wrap">
                    <span>Tool 调用格式</span>
                    <select id="xb-assistant-delegate-tool-mode"></select>
                </label>
                <label>
                    <span>Reasoning 模式</span>
                    <select id="xb-assistant-delegate-reasoning-mode"></select>
                    <small id="xb-assistant-delegate-reasoning-capability"></small>
                </label>
                <label id="xb-assistant-delegate-reasoning-effort-wrap">
                    <span>思考强度</span>
                    <select id="xb-assistant-delegate-reasoning-effort"></select>
                </label>
                <label id="xb-assistant-delegate-reasoning-budget-wrap">
                    <span>思考 Token 预算</span>
                    <input id="xb-assistant-delegate-reasoning-budget" type="number" step="1" inputmode="numeric" />
                    <small>支持 -1 时表示由模型自动决定</small>
                </label>
            </div>` : "";
  return `
        <section class="xb-assistant-config">
            <div class="xb-assistant-config-alert is-error" data-xb-agent-config-load-error ${q ? "" : "hidden"}>
                <span data-xb-agent-config-load-error-message>${Da(q)}</span>
                <button type="button" data-xb-agent-config-retry>重新读取</button>
            </div>
            <div class="xb-assistant-config-alert is-conflict" data-xb-agent-config-conflict ${q || !h ? "hidden" : ""}>
                <span>共享配置已在其他页面更新。当前未保存编辑仍保留；重新载入会放弃这些编辑。</span>
                <button type="button" data-xb-agent-config-reload>重新载入</button>
            </div>
            <fieldset class="xb-assistant-config-fields" data-xb-agent-config-fields ${q ? "disabled" : ""}>
            ${$}
            <div class="xb-assistant-config-page" data-config-page-panel="main" ${C ? "" : "hidden"}>
            <div class="xb-assistant-preset-row">
                <select id="xb-assistant-preset-select" class="xb-assistant-preset-field" aria-label="已存预设"></select>
                <input id="xb-assistant-preset-name" type="hidden" />
                <div class="xb-assistant-preset-tools" aria-label="API 预设操作">
                    <button id="xb-assistant-new-preset" type="button" class="xb-assistant-icon-button" title="新增预设" aria-label="新增预设" ${d ? "disabled" : ""}>${Oa("add")}</button>
                    <button id="xb-assistant-rename-preset" type="button" class="xb-assistant-icon-button" title="重命名预设" aria-label="重命名预设" ${d ? "disabled" : ""}>${Oa("rename")}</button>
                    <button id="xb-assistant-save" type="button" class="xb-assistant-icon-button ${P.className}" title="${P.title}" aria-label="${P.title}" ${D}>${Oa(R)}</button>
                    <button id="xb-assistant-delete-preset" type="button" class="xb-assistant-icon-button" title="删除预设" aria-label="删除预设" ${L}>${Oa("delete")}</button>
                </div>
            </div>
            <label>
                <span>Provider</span>
                <select id="xb-assistant-provider">
                    <option value="openai-responses">OpenAI Responses</option>
                    <option value="openai-compatible">OpenAI 兼容</option>
                    <option value="sillytavern-openai-compatible">酒馆 OpenAI 兼容</option>
                    <option value="sillytavern-claude">酒馆 Claude</option>
                    <option value="sillytavern-google">酒馆 Google AI</option>
                    <option value="anthropic">Anthropic</option>
                    <option value="google">Google AI</option>
                </select>
            </label>
            <label>
                <span>Base URL</span>
                <input id="xb-assistant-base-url" type="text" />
            </label>
            <label>
                <span>API Key</span>
                <div class="xb-assistant-inline-input">
                    <input id="xb-assistant-api-key" type="password" />
                    <button id="xb-assistant-toggle-key" type="button" class="secondary ghost">显示</button>
                </div>
            </label>
            <label>
                <span>Model</span>
                <input id="xb-assistant-model" type="text" />
            </label>
            <div class="xb-assistant-inline-input xb-assistant-model-row">
                <label class="xb-assistant-grow">
                    <span>已拉取模型</span>
                    <select id="xb-assistant-model-pulled">
                        <option value="">手动填写</option>
                    </select>
                </label>
                <button id="xb-assistant-pull-models" type="button" class="secondary" ${d ? "disabled" : ""}>拉取模型</button>
            </div>
            <div class="xb-assistant-inline-status" id="xb-assistant-model-pull-status" aria-live="polite" hidden></div>
            <label>
                <span>最大输出 Token</span>
                <input id="xb-assistant-max-tokens" type="number" min="1" step="1" inputmode="numeric" />
            </label>
            <div class="xb-assistant-temperature-row">
                <label>
                    <span>温度</span>
                    <input id="xb-assistant-temperature" type="number" min="0" max="2" step="0.05" />
                </label>
                <label class="xb-assistant-checkbox-row">
                    <span>允许传参</span>
                    <span class="xb-assistant-checkbox-control">
                        <input id="xb-assistant-send-temperature" type="checkbox" />
                    </span>
                </label>
            </div>
            ${o ? `<label>
                <span>Tavily API Key（全局）</span>
                <div class="xb-assistant-inline-input">
                    <input id="xb-assistant-tavily-api-key" type="password" />
                    <button id="xb-assistant-toggle-tavily-key" type="button" class="secondary ghost">显示</button>
                </div>
            </label>` : ""}
            <label id="xb-assistant-tool-mode-wrap">
                <span>Tool 调用格式</span>
                <select id="xb-assistant-tool-mode"></select>
            </label>
            ${M}
            <label>
                <span>Reasoning 模式</span>
                <select id="xb-assistant-reasoning-mode"></select>
                <small id="xb-assistant-reasoning-capability"></small>
            </label>
            <label id="xb-assistant-reasoning-effort-wrap">
                <span>思考强度</span>
                <select id="xb-assistant-reasoning-effort"></select>
            </label>
            <label id="xb-assistant-reasoning-budget-wrap">
                <span>思考 Token 预算</span>
                <input id="xb-assistant-reasoning-budget" type="number" step="1" inputmode="numeric" />
                <small>支持 -1 时表示由模型自动决定</small>
            </label>
            </div>
            ${_}
            <div class="xb-assistant-runtime" id="xb-assistant-runtime">${Da(a)}</div>
            </fieldset>
            ${l ? `<div class="xb-assistant-toast xb-assistant-toast-inline" id="xb-assistant-toast" aria-live="polite">${Da(n)}</div>` : ""}
        </section>
    `;
}
var Ac = { class: "agent-api-app" }, Ic = { class: "agent-api-scroll" }, Ec = { class: "agent-api-content" }, Pc = {
  key: 0,
  class: "agent-api-state",
  "aria-live": "polite"
}, Oc = {
  key: 1,
  class: "agent-api-state is-error",
  role: "alert"
}, Rc = {
  class: "agent-api-panel xb-agent-settings-surface",
  "aria-label": "Agent API 配置"
}, Bc = { "aria-live": "polite" }, Lc = ["disabled"], Vl = 13e4, Dc = /* @__PURE__ */ se({
  __name: "AgentApiApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const t = e, a = structuredClone(/* @__PURE__ */ oe(t.initialState)), n = /* @__PURE__ */ K(a), l = /* @__PURE__ */ K(null), i = /* @__PURE__ */ K("idle"), r = /* @__PURE__ */ K("连接尚未测试");
    let o = () => {
    }, u = null, p = 0;
    const d = /* @__PURE__ */ _t({
      config: null,
      configDraft: null,
      configDirty: !1,
      configExternalChangePending: !1,
      configFormSyncPending: !0,
      configPage: "main",
      configSave: {
        status: "idle",
        requestId: "",
        error: ""
      },
      modelOptionsByProvider: {},
      pullStateByProvider: {},
      inlineToastText: ""
    }), y = V(() => n.value.status === "ready" && d.config !== null), w = V(() => Object.keys(d.config?.presets || {}).length), h = V(() => i.value === "testing");
    function q($) {
      const _ = $ instanceof Error ? $.message : String($ || "unknown_error");
      return _ === "host_request_timeout" ? "请求等待超时，请检查网络后重试。" : _ === "app_inactive" ? "页面已经关闭。" : _;
    }
    function P() {
      u && clearTimeout(u), u = setTimeout(() => {
        d.configSave = {
          status: "idle",
          requestId: "",
          error: ""
        }, d.inlineToastText = "", C();
      }, 1800);
    }
    async function R($) {
      const _ = $.payload || {};
      d.configSave = {
        status: "saving",
        requestId: "",
        error: ""
      }, d.inlineToastText = "正在保存配置…", C();
      try {
        const S = (await t.bridge.request("agent-api/save", { patch: _ }, 35e3)).result;
        if (S.ok !== !0 || !S.config)
          throw S.conflict && (d.configExternalChangePending = !0), new Error(S.error || "共享 Agent API 配置保存失败");
        d.config = In(S.config), d.configDraft = null, d.configDirty = !1, d.configExternalChangePending = !1, d.configFormSyncPending = !0, d.configSave = {
          status: "success",
          requestId: "",
          error: ""
        }, d.inlineToastText = "配置已保存";
      } catch (S) {
        const G = q(S);
        d.configSave = {
          status: "error",
          requestId: "",
          error: G
        }, d.inlineToastText = G;
      }
      C(), P();
    }
    async function D($ = !1) {
      const _ = ++p;
      try {
        const S = await t.bridge.request("agent-api/reload", {}, 35e3);
        if (_ !== p) return;
        if ($ && d.configDirty) {
          d.configExternalChangePending = !0, C();
          return;
        }
        T(S.result);
      } catch (S) {
        if (_ !== p) return;
        n.value = {
          status: "error",
          config: null,
          message: q(S)
        }, C();
      }
    }
    async function L($) {
      return (await t.bridge.request("agent-api/pull-models", { providerConfig: $ }, Vl)).result.models;
    }
    const A = _c({
      state: d,
      render: C,
      saveConfig: R,
      reloadConfig: D,
      pullModels: L,
      describeError: q
    });
    function C() {
      const $ = l.value;
      !$ || !d.config || ($.innerHTML = Mc({
        configSave: d.configSave,
        inlineToastText: d.inlineToastText,
        showAssistantPermissions: !1,
        showDelegateSettings: !1,
        showTavilySettings: !1,
        canDeletePreset: w.value > 1,
        configLoadError: n.value.status === "error" ? n.value.message : "",
        configExternalChangePending: d.configExternalChangePending
      }), A.syncConfigToForm($), A.bindSettingsPanelEvents($));
    }
    function T($) {
      n.value = structuredClone($), $.status === "ready" && $.config && (d.config = In($.config), d.configDraft = null, d.configDirty = !1, d.configExternalChangePending = !1, d.configFormSyncPending = !0), sn(C);
    }
    async function M() {
      const $ = l.value;
      if (!$ || !y.value || h.value) return;
      const _ = A.getActiveProviderConfigFromForm($);
      i.value = "testing", r.value = "正在测试当前表单中的连接…";
      try {
        const S = (await t.bridge.request("agent-api/test-connection", { providerConfig: structuredClone(/* @__PURE__ */ oe(_)) }, Vl)).result;
        i.value = "success", r.value = `${S.provider || "当前服务"} · ${S.model || "当前模型"} · ${S.latencyMs} 毫秒`;
      } catch (S) {
        i.value = "error", r.value = q(S);
      }
    }
    return at(() => {
      o = t.bridge.subscribe(($) => {
        if ($.type === "agent-api/state") {
          T($.payload.state);
          return;
        }
        $.type === "agent-api/config-changed" && (d.configDirty ? (d.configExternalChangePending = !0, C()) : D(!0));
      }), T(a);
    }), ot(() => {
      p += 1, o(), u && clearTimeout(u);
    }), ($, _) => (v(), b("main", Ac, [s("div", Ic, [s("div", Ec, [
      _[2] || (_[2] = s("header", { class: "agent-api-header" }, [s("h1", null, "Agent API 配置"), s("p", null, "共享 Agent 主预设")], -1)),
      n.value.status === "loading" ? (v(), b("section", Pc, " 正在读取配置 ")) : n.value.status === "error" ? (v(), b("section", Oc, [s("div", null, [_[1] || (_[1] = s("strong", null, "配置暂时无法读取", -1)), s("span", null, g(n.value.message), 1)]), s("button", {
        type: "button",
        onClick: _[0] || (_[0] = (S) => D())
      }, "重新读取")])) : H("", !0),
      Me(s("section", Rc, [s("div", {
        ref_key: "panelRoot",
        ref: l
      }, null, 512), s("div", { class: ae(["agent-api-connection", `is-${i.value}`]) }, [s("p", Bc, g(r.value), 1), s("button", {
        type: "button",
        disabled: !y.value || h.value,
        onClick: M
      }, g(h.value ? "测试中…" : "测试当前连接"), 9, Lc)], 2)], 512), [[Uu, y.value]])
    ])])]));
  }
}), Nc = Dc, Uc = Object.freeze({
  id: "bank",
  name: "银行",
  accent: "#b89a58"
}), Fc = {
  class: "bank-product-icon",
  viewBox: "0 0 24 24",
  "aria-hidden": "true",
  focusable: "false"
}, Hc = /* @__PURE__ */ se({
  __name: "BankProductIcon",
  props: { kind: {} },
  setup(e) {
    return (t, a) => (v(), b("svg", Fc, [e.kind === "deposit" ? (v(), b(J, { key: 0 }, [
      a[0] || (a[0] = s("path", { d: "M5 3.5h11l3 3V20.5H5z" }, null, -1)),
      a[1] || (a[1] = s("path", { d: "M16 3.5v3h3M8 10h8M8 13h6M8 16h4" }, null, -1)),
      a[2] || (a[2] = s("circle", {
        cx: "16.5",
        cy: "16.5",
        r: "2.5"
      }, null, -1))
    ], 64)) : e.kind === "fund" ? (v(), b(J, { key: 1 }, [a[3] || (a[3] = lr('<path d="M4 19.5h16M5.5 16l4-4 3 2 6-7"></path><path d="m15.5 7 3-.5-.5 3"></path><circle cx="5.5" cy="16" r="1"></circle><circle cx="9.5" cy="12" r="1"></circle><circle cx="12.5" cy="14" r="1"></circle>', 5))], 64)) : e.kind === "records" ? (v(), b(J, { key: 2 }, [a[4] || (a[4] = s("path", { d: "M5 4.5h12a2 2 0 0 1 2 2v13H7a2 2 0 0 1-2-2z" }, null, -1)), a[5] || (a[5] = s("path", { d: "M7 4.5v12.8M9.5 8h6M9.5 11h6M9.5 14h4" }, null, -1))], 64)) : (v(), b(J, { key: 3 }, [a[6] || (a[6] = s("path", { d: "M4 12h12M12 8l4 4-4 4M19 5v14" }, null, -1)), a[7] || (a[7] = s("circle", {
      cx: "7",
      cy: "12",
      r: "5"
    }, null, -1))], 64))]));
  }
}), Dt = Hc, jc = ["aria-labelledby"], Kc = ["id"], Gc = { class: "bank-dialog-subject" }, zc = { key: 0 }, Vc = { key: 1 }, Zc = {
  key: 0,
  class: "bank-dialog-field"
}, Wc = { id: "bank-amount-help" }, Yc = {
  key: 1,
  class: "bank-dialog-validation"
}, Qc = {
  key: 2,
  class: "bank-dialog-summary"
}, Xc = {
  key: 3,
  class: "bank-dialog-warning"
}, Jc = {
  key: 4,
  class: "bank-dialog-warning is-loss"
}, ef = {
  key: 5,
  class: "bank-dialog-error",
  role: "alert"
}, tf = { class: "bank-dialog-actions" }, af = ["disabled"], nf = ["disabled"], sf = /* @__PURE__ */ se({
  __name: "BankActionDialog",
  props: {
    mode: {},
    product: {},
    position: {},
    balance: {},
    busy: { type: Boolean },
    error: {}
  },
  emits: ["cancel", "confirm"],
  setup(e, { emit: t }) {
    const a = e, n = t, l = /* @__PURE__ */ K(a.product ? String(a.product.minAmount) : ""), i = V(() => a.mode === "deposit-open" ? "开立定期存单" : a.mode === "fund-open" ? "申购浮动理财" : "确认提前支取"), r = V(() => /^\d+$/.test(l.value.trim()) ? Number(l.value) : 0), o = V(() => a.mode === "withdraw" ? "" : !a.product || !Number.isSafeInteger(r.value) || r.value <= 0 ? "请输入正整数金额" : r.value < a.product.minAmount || r.value > a.product.maxAmount ? `金额须在 ${a.product.minAmount} 至 ${a.product.maxAmount} 之间` : r.value > a.balance ? "可用余额不足" : ""), u = V(() => a.mode === "deposit-open" ? a.product : null), p = V(() => u.value ? Math.floor(r.value * (1e4 + u.value.interestBps) / 1e4) : 0), d = V(() => !a.busy && (a.mode === "withdraw" || !o.value));
    function y() {
      if (d.value) {
        if (a.mode === "withdraw") {
          n("confirm");
          return;
        }
        n("confirm", r.value);
      }
    }
    return (w, h) => (v(), b("dialog", {
      open: "",
      class: "bank-dialog",
      "aria-labelledby": `bank-dialog-${e.mode}`,
      onClick: h[2] || (h[2] = tt((q) => !e.busy && w.$emit("cancel"), ["self"])),
      onKeydown: h[3] || (h[3] = pr(tt((q) => !e.busy && w.$emit("cancel"), ["stop", "prevent"]), ["esc"]))
    }, [s("form", {
      method: "dialog",
      class: "bank-dialog-card",
      onSubmit: tt(y, ["prevent"])
    }, [
      s("h2", { id: `bank-dialog-${e.mode}` }, g(i.value), 9, Kc),
      s("div", Gc, [s("span", null, [be(Dt, { kind: e.mode === "withdraw" ? "withdraw" : e.mode === "deposit-open" ? "deposit" : "fund" }, null, 8, ["kind"])]), s("div", null, [s("strong", null, g(e.position?.name || e.product?.name), 1), e.product ? (v(), b("small", zc, g(e.product.lockLabel), 1)) : (v(), b("small", Vc, "当前本金 ¤ " + g(e.position?.principal.toLocaleString("zh-CN")), 1))])]),
      e.mode !== "withdraw" ? (v(), b("label", Zc, [
        h[5] || (h[5] = s("span", null, "开户金额", -1)),
        s("div", null, [h[4] || (h[4] = s("i", null, "¤", -1)), Me(s("input", {
          "onUpdate:modelValue": h[0] || (h[0] = (q) => l.value = q),
          type: "text",
          inputmode: "numeric",
          autocomplete: "off",
          "aria-describedby": "bank-amount-help"
        }, null, 512), [[De, l.value]])]),
        s("small", Wc, "可用 " + g(e.balance.toLocaleString("zh-CN")) + " · 范围 " + g(e.product?.minAmount) + " - " + g(e.product?.maxAmount), 1)
      ])) : H("", !0),
      o.value ? (v(), b("p", Yc, g(o.value), 1)) : H("", !0),
      e.mode === "deposit-open" && u.value && !o.value ? (v(), b("dl", Qc, [s("div", null, [h[6] || (h[6] = s("dt", null, "锁定期限", -1)), s("dd", null, g(u.value.lockLabel), 1)]), s("div", null, [h[7] || (h[7] = s("dt", null, "到期兑付", -1)), s("dd", null, "¤ " + g(p.value.toLocaleString("zh-CN")), 1)])])) : H("", !0),
      e.mode === "fund-open" ? (v(), b("p", Xc, " 实际收益将在开户时封存，锁定期间不可退出，到期后才会揭晓并可领取。 ")) : H("", !0),
      e.mode === "withdraw" && e.position ? (v(), b("p", Jc, [
        h[8] || (h[8] = ue(" 将立即收回 ", -1)),
        s("strong", null, g(e.position.earlyWithdrawalAmount.toLocaleString("zh-CN")) + " 小白币", 1),
        ue("，相较本金损失 " + g((e.position.principal - e.position.earlyWithdrawalAmount).toLocaleString("zh-CN")) + " 小白币。此操作不可撤销。 ", 1)
      ])) : H("", !0),
      e.error ? (v(), b("p", ef, g(e.error), 1)) : H("", !0),
      s("div", tf, [s("button", {
        type: "button",
        disabled: e.busy,
        onClick: h[1] || (h[1] = (q) => w.$emit("cancel"))
      }, "取消", 8, af), s("button", {
        type: "submit",
        class: "is-primary",
        disabled: !d.value
      }, g(e.busy ? "正在封存…" : e.mode === "withdraw" ? `确认收回 ${e.position?.earlyWithdrawalAmount || 0}` : "确认开户"), 9, nf)])
    ], 32)], 40, jc));
  }
}), lf = sf, rf = { "aria-labelledby": "bank-deposits-title" }, of = { class: "bank-product-grid" }, uf = { class: "bank-product-index" }, df = { class: "bank-product-seal" }, cf = { class: "bank-rate-block" }, ff = { class: "bank-product-terms" }, vf = [
  "disabled",
  "title",
  "onClick"
], pf = /* @__PURE__ */ se({
  __name: "BankDeposits",
  props: {
    products: {},
    balance: {},
    writeDisabledReason: {}
  },
  emits: ["open"],
  setup(e) {
    return (t, a) => (v(), b("section", rf, [
      a[5] || (a[5] = s("header", { class: "bank-section-heading" }, [s("h2", { id: "bank-deposits-title" }, "定期存单"), s("small", null, "到期收益确定")], -1)),
      a[6] || (a[6] = s("p", { class: "bank-section-intro" }, "本金锁定至约定回合。到期前可提前支取，最终到账额会在确认时明确列出。", -1)),
      s("div", of, [(v(!0), b(J, null, de(e.products, (n, l) => (v(), b("article", {
        key: n.id,
        class: "bank-product-card bank-deposit-card"
      }, [
        s("header", null, [
          s("span", uf, "0" + g(l + 1), 1),
          s("div", null, [s("small", null, g(n.lockLabel), 1), s("h3", null, g(n.name), 1)]),
          s("span", df, [be(Dt, { kind: "deposit" })])
        ]),
        s("div", cf, [
          a[0] || (a[0] = s("span", null, "到期收益率", -1)),
          s("strong", null, g(n.interestLabel), 1),
          a[1] || (a[1] = s("small", null, "固定收益", -1))
        ]),
        s("dl", ff, [s("div", null, [a[2] || (a[2] = s("dt", null, "开户范围", -1)), s("dd", null, g(n.amountLabel), 1)]), s("div", null, [a[3] || (a[3] = s("dt", null, "提前支取", -1)), s("dd", null, g(n.earlyPenaltyLabel), 1)])]),
        s("button", {
          type: "button",
          disabled: !!e.writeDisabledReason || e.balance < n.minAmount,
          title: e.writeDisabledReason || (e.balance < n.minAmount ? "可用余额不足最低开户额" : ""),
          onClick: (i) => t.$emit("open", n)
        }, [...a[4] || (a[4] = [ue(" 开立存单", -1), s("span", null, "›", -1)])], 8, vf)
      ]))), 128))])
    ]));
  }
}), mf = pf, gf = { "aria-labelledby": "bank-funds-title" }, bf = { class: "bank-product-grid" }, hf = { class: "bank-product-index" }, yf = { class: "bank-rate-block" }, kf = { class: "bank-product-terms" }, wf = [
  "disabled",
  "title",
  "onClick"
], Tf = /* @__PURE__ */ se({
  __name: "BankFunds",
  props: {
    products: {},
    balance: {},
    writeDisabledReason: {}
  },
  emits: ["open"],
  setup(e) {
    return (t, a) => (v(), b("section", gf, [
      a[4] || (a[4] = s("header", { class: "bank-section-heading" }, [s("h2", { id: "bank-funds-title" }, "浮动理财"), s("small", null, "到期前不揭晓结果")], -1)),
      a[5] || (a[5] = s("p", { class: "bank-section-intro" }, "收益在开户时封存，到期后才会公开。理财锁定期间不可提前退出。", -1)),
      s("div", bf, [(v(!0), b(J, null, de(e.products, (n, l) => (v(), b("article", {
        key: n.id,
        class: "bank-product-card bank-fund-card"
      }, [
        s("header", null, [
          s("span", hf, "F" + g(l + 1), 1),
          s("div", null, [s("small", null, g(n.lockLabel), 1), s("h3", null, g(n.name), 1)]),
          s("span", { class: ae(["bank-risk-badge", `is-${n.riskLevel}`]) }, g(n.riskLabel), 3)
        ]),
        s("p", null, g(n.description), 1),
        s("div", yf, [
          a[0] || (a[0] = s("span", null, "合同收益区间", -1)),
          s("strong", null, g(n.returnLabel), 1),
          a[1] || (a[1] = s("small", null, "实际结果到期可见", -1))
        ]),
        s("dl", kf, [s("div", null, [a[2] || (a[2] = s("dt", null, "开户范围", -1)), s("dd", null, g(n.amountLabel), 1)])]),
        s("button", {
          type: "button",
          disabled: !!e.writeDisabledReason || e.balance < n.minAmount,
          title: e.writeDisabledReason || (e.balance < n.minAmount ? "可用余额不足最低开户额" : ""),
          onClick: (i) => t.$emit("open", n)
        }, [...a[3] || (a[3] = [ue(" 申购理财", -1), s("span", null, "›", -1)])], 8, wf)
      ]))), 128))])
    ]));
  }
}), xf = Tf, $f = { "aria-labelledby": "bank-positions-title" }, Sf = { class: "bank-section-heading" }, _f = ["disabled"], qf = {
  key: 0,
  class: "bank-empty-state"
}, Cf = {
  key: 1,
  class: "bank-position-group"
}, Mf = { class: "bank-position-top" }, Af = { class: "bank-position-mark" }, If = { key: 0 }, Ef = { class: "is-loss" }, Pf = [
  "disabled",
  "title",
  "onClick"
], Of = {
  key: 1,
  class: "bank-due-note"
}, Rf = {
  key: 2,
  class: "bank-position-group"
}, Bf = { class: "bank-position-top" }, Lf = { class: "bank-position-mark" }, Df = {
  key: 0,
  class: "bank-fund-result"
}, Nf = {
  key: 1,
  class: "bank-sealed-copy"
}, Uf = /* @__PURE__ */ se({
  __name: "BankPositions",
  props: {
    deposits: {},
    investments: {},
    claimableCount: {},
    writeDisabledReason: {}
  },
  emits: ["withdraw", "settle"],
  setup(e) {
    return (t, a) => (v(), b("section", $f, [
      s("header", Sf, [a[1] || (a[1] = s("h2", { id: "bank-positions-title" }, "我的头寸", -1)), e.claimableCount ? (v(), b("button", {
        key: 0,
        type: "button",
        class: "bank-small-claim",
        disabled: !!e.writeDisabledReason,
        onClick: a[0] || (a[0] = (n) => t.$emit("settle"))
      }, " 领取全部 " + g(e.claimableCount) + " 笔 ", 9, _f)) : H("", !0)]),
      !e.deposits.length && !e.investments.length ? (v(), b("div", qf, [...a[2] || (a[2] = [
        s("span", null, "◇", -1),
        s("strong", null, "金库尚无头寸", -1),
        s("p", null, "从定期或理财页面选择一份产品开始配置资产。", -1)
      ])])) : H("", !0),
      e.deposits.length ? (v(), b("div", Cf, [s("header", null, [a[3] || (a[3] = s("h3", null, "定期存单", -1)), s("span", null, g(e.deposits.length), 1)]), (v(!0), b(J, null, de(e.deposits, (n) => (v(), b("article", {
        key: n.id,
        class: "bank-position-card"
      }, [
        s("div", Mf, [
          s("span", Af, [be(Dt, { kind: "deposit" })]),
          s("div", null, [s("h4", null, g(n.name), 1), s("small", null, "本金 ¤ " + g(n.principal.toLocaleString("zh-CN")), 1)]),
          s("span", { class: ae(["bank-position-status", { "is-due": n.claimable }]) }, g(n.statusLabel), 3)
        ]),
        s("dl", null, [s("div", null, [a[4] || (a[4] = s("dt", null, "到期兑付", -1)), s("dd", null, "¤ " + g(n.maturityAmount.toLocaleString("zh-CN")), 1)]), n.claimable ? H("", !0) : (v(), b("div", If, [a[5] || (a[5] = s("dt", null, "现在支取", -1)), s("dd", Ef, "¤ " + g(n.earlyWithdrawalAmount.toLocaleString("zh-CN")), 1)]))]),
        n.claimable ? (v(), b("span", Of, "将在“领取全部”时统一兑付")) : (v(), b("button", {
          key: 0,
          type: "button",
          class: "bank-withdraw-button",
          disabled: !!e.writeDisabledReason,
          title: e.writeDisabledReason,
          onClick: (l) => t.$emit("withdraw", n)
        }, " 提前支取 ", 8, Pf))
      ]))), 128))])) : H("", !0),
      e.investments.length ? (v(), b("div", Rf, [s("header", null, [a[6] || (a[6] = s("h3", null, "浮动理财", -1)), s("span", null, g(e.investments.length), 1)]), (v(!0), b(J, null, de(e.investments, (n) => (v(), b("article", {
        key: n.id,
        class: "bank-position-card"
      }, [s("div", Bf, [
        s("span", Lf, [be(Dt, { kind: "fund" })]),
        s("div", null, [s("h4", null, g(n.name), 1), s("small", null, g(n.riskLabel) + " · 本金 ¤ " + g(n.principal.toLocaleString("zh-CN")), 1)]),
        s("span", { class: ae(["bank-position-status", { "is-due": n.claimable }]) }, g(n.statusLabel), 3)
      ]), n.claimable ? (v(), b("div", Df, [
        a[7] || (a[7] = s("span", null, "封存结果已揭晓", -1)),
        s("strong", { class: ae({ "is-negative": n.resolvedReturnBps < 0 }) }, g(n.returnLabel), 3),
        s("small", null, "可兑付 ¤ " + g(n.settlementAmount.toLocaleString("zh-CN")), 1)
      ])) : (v(), b("p", Nf, "收益结果仍在金库中封存，到期前不会公开。"))]))), 128))])) : H("", !0)
    ]));
  }
}), Ff = Uf, Hf = { "aria-labelledby": "bank-records-title" }, jf = { class: "bank-section-heading" }, Kf = {
  key: 0,
  class: "bank-empty-state"
}, Gf = {
  key: 1,
  class: "bank-record-list"
}, zf = { class: "bank-record-mark" }, Vf = { class: "bank-record-main" }, Zf = {
  key: 0,
  class: "bank-inline-error",
  role: "alert"
}, Wf = ["disabled"], Yf = {
  key: 2,
  class: "bank-record-end"
}, Qf = /* @__PURE__ */ se({
  __name: "BankRecords",
  props: {
    activities: {},
    total: {},
    hasMore: { type: Boolean },
    loadingMore: { type: Boolean },
    error: {}
  },
  emits: ["loadMore"],
  setup(e) {
    const t = new Intl.DateTimeFormat("zh-CN", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
    return (a, n) => (v(), b("section", Hf, [s("header", jf, [n[1] || (n[1] = s("h2", { id: "bank-records-title" }, "金融记录", -1)), s("small", null, g(e.total) + " 笔", 1)]), e.activities.length ? (v(), b("div", Gf, [
      (v(!0), b(J, null, de(e.activities, (l) => (v(), b("article", {
        key: l.id,
        class: "bank-record-row"
      }, [
        s("span", zf, [be(Dt, { kind: l.kind }, null, 8, ["kind"])]),
        s("div", Vf, [
          s("header", null, [s("strong", null, g(l.productName), 1), s("span", null, g(l.resultLabel), 1)]),
          s("dl", null, [s("div", null, [n[4] || (n[4] = s("dt", null, "投入", -1)), s("dd", null, "¤ " + g(l.amountIn.toLocaleString("zh-CN")), 1)]), s("div", null, [n[5] || (n[5] = s("dt", null, "兑付", -1)), s("dd", null, "¤ " + g(l.payout.toLocaleString("zh-CN")), 1)])]),
          s("small", null, g(l.turnLabel) + " · " + g(me(t).format(l.createdAt)), 1)
        ]),
        s("strong", { class: ae(["bank-record-net", {
          "is-negative": l.net < 0,
          "is-flat": l.net === 0
        }]) }, [ue(g(l.net > 0 ? "+" : "") + g(l.net) + " ", 1), s("small", null, g(l.netLabel), 1)], 2)
      ]))), 128)),
      e.error ? (v(), b("p", Zf, g(e.error), 1)) : H("", !0),
      e.hasMore ? (v(), b("button", {
        key: 1,
        type: "button",
        class: "bank-load-more",
        disabled: e.loadingMore,
        onClick: n[0] || (n[0] = (l) => a.$emit("loadMore"))
      }, g(e.loadingMore ? "正在开启下一册…" : "载入更多记录"), 9, Wf)) : (v(), b("p", Yf, "金库档案已全部展开"))
    ])) : (v(), b("div", Kf, [
      s("span", null, [be(Dt, { kind: "records" })]),
      n[2] || (n[2] = s("strong", null, "尚无兑付记录", -1)),
      n[3] || (n[3] = s("p", null, "头寸到期领取或提前支取后，结果会归档在这里。", -1))
    ]))]));
  }
}), Xf = Qf, Jf = {
  class: "bank-vault",
  "aria-labelledby": "bank-vault-title"
}, ev = { class: "bank-section-heading bank-vault-heading" }, tv = { class: "bank-balance-panel" }, av = { class: "bank-vault-metrics" }, nv = ["disabled", "title"], sv = { class: "bank-vault-portals" }, lv = { class: "bank-portal-mark" }, iv = { class: "bank-portal-mark" }, rv = { class: "bank-portal-mark" }, ov = /* @__PURE__ */ se({
  __name: "BankVault",
  props: {
    balance: {},
    lockedAmount: {},
    currentTurn: {},
    depositCount: {},
    fundCount: {},
    claimableCount: {},
    writeDisabledReason: {}
  },
  emits: ["navigate", "settle"],
  setup(e) {
    return (t, a) => (v(), b("section", Jf, [
      a[18] || (a[18] = s("div", {
        class: "bank-vault-door",
        "aria-hidden": "true"
      }, [s("div", { class: "bank-vault-ring" }, [
        s("span", null, "III"),
        s("i"),
        s("span", null, "VI"),
        s("i"),
        s("span", null, "IX")
      ])], -1)),
      s("header", ev, [a[4] || (a[4] = s("h2", { id: "bank-vault-title" }, "金库总览", -1)), s("small", null, "第 " + g(e.currentTurn) + " 回合", 1)]),
      s("div", tv, [
        a[6] || (a[6] = s("span", null, "可用资产", -1)),
        s("strong", null, [a[5] || (a[5] = s("small", null, "¤", -1)), ue(g(e.balance.toLocaleString("zh-CN")), 1)]),
        a[7] || (a[7] = s("div", null, [s("span", null, "小白币活期余额"), s("i", null, "随时可用")], -1))
      ]),
      s("div", av, [s("article", null, [
        a[8] || (a[8] = s("span", null, "锁定本金", -1)),
        s("strong", null, "¤ " + g(e.lockedAmount.toLocaleString("zh-CN")), 1),
        s("small", null, g(e.depositCount + e.fundCount) + " 笔持仓", 1)
      ]), s("article", { class: ae({ "is-claimable": e.claimableCount > 0 }) }, [
        a[9] || (a[9] = s("span", null, "待领取", -1)),
        s("strong", null, g(e.claimableCount), 1),
        s("small", null, g(e.claimableCount ? "已到期，可统一兑付" : "暂无到期头寸"), 1)
      ], 2)]),
      e.claimableCount ? (v(), b("button", {
        key: 0,
        type: "button",
        class: "bank-claim-button",
        disabled: !!e.writeDisabledReason,
        title: e.writeDisabledReason,
        onClick: a[0] || (a[0] = (n) => t.$emit("settle"))
      }, [a[10] || (a[10] = s("span", null, "领取全部到期资产", -1)), s("small", null, g(e.claimableCount) + " 笔一并结算", 1)], 8, nv)) : H("", !0),
      s("div", sv, [
        s("button", {
          type: "button",
          onClick: a[1] || (a[1] = (n) => t.$emit("navigate", "deposits"))
        }, [
          s("span", lv, [be(Dt, { kind: "deposit" })]),
          a[11] || (a[11] = s("strong", null, "定期存单", -1)),
          s("small", null, g(e.depositCount) + " 笔持有", 1),
          a[12] || (a[12] = s("i", null, "›", -1))
        ]),
        s("button", {
          type: "button",
          onClick: a[2] || (a[2] = (n) => t.$emit("navigate", "funds"))
        }, [
          s("span", iv, [be(Dt, { kind: "fund" })]),
          a[13] || (a[13] = s("strong", null, "浮动理财", -1)),
          s("small", null, g(e.fundCount) + " 笔持有", 1),
          a[14] || (a[14] = s("i", null, "›", -1))
        ]),
        s("button", {
          type: "button",
          onClick: a[3] || (a[3] = (n) => t.$emit("navigate", "records"))
        }, [
          s("span", rv, [be(Dt, { kind: "records" })]),
          a[15] || (a[15] = s("strong", null, "金融记录", -1)),
          a[16] || (a[16] = s("small", null, "查阅历史兑付", -1)),
          a[17] || (a[17] = s("i", null, "›", -1))
        ])
      ])
    ]));
  }
}), uv = ov, dv = { class: "bank-app" }, cv = { class: "bank-header" }, fv = { class: "bank-header-balance" }, vv = ["disabled"], pv = {
  class: "bank-navigation",
  "aria-label": "银行页面"
}, mv = { key: 0 }, gv = ["disabled"], bv = ["disabled"], hv = { class: "bank-scroll" }, Ra = 35e3, yv = /* @__PURE__ */ se({
  __name: "BankApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const t = e, a = /* @__PURE__ */ K(structuredClone(/* @__PURE__ */ oe(t.initialState))), n = /* @__PURE__ */ K("vault"), l = /* @__PURE__ */ K(null), i = /* @__PURE__ */ K(!1), r = /* @__PURE__ */ K(!1), o = /* @__PURE__ */ K(!1), u = /* @__PURE__ */ K(""), p = /* @__PURE__ */ K(""), d = /* @__PURE__ */ K("");
    let y = null, w = () => {
    }, h = 0;
    const q = V(() => a.value.status === "unconfirmed"), P = V(() => r.value ? "正在处理上一项银行操作" : i.value ? "正在刷新金库状态" : a.value.status !== "ready" ? a.value.message || "金库暂时不可写入" : a.value.generationActive ? "主剧情正在生成，请等待回复完成" : ""), R = V(() => i.value || r.value || q.value);
    function D() {
      return typeof globalThis.crypto?.randomUUID == "function" ? `bank-ui:${globalThis.crypto.randomUUID()}` : `bank-ui:${Date.now()}:${Math.random().toString(36).slice(2, 10)}`;
    }
    function L() {
      return { chatIdentity: a.value.chatIdentity };
    }
    function A(W) {
      a.value = structuredClone(W), i.value = !1, o.value = !1, u.value = "", d.value = "", W.claimableCount === 0 && (y = null);
    }
    function C(W) {
      const F = W instanceof Error ? W.message : String(W);
      return F.includes("economy_insufficient_funds") || F.includes("cannot be overdrawn") ? "可用小白币不足，开户未完成。" : F.includes("bank_amount_out_of_range") ? "开户金额不在该产品允许范围内。" : F.includes("bank_amount_invalid") ? "开户金额必须是正整数。" : F.includes("bank_revision_conflict") || F.includes("bank_event_id_conflict") ? "金库状态已变化，请关闭确认框并刷新后重试。" : F.includes("bank_position_missing") || F.includes("bank_position_state_changed") ? "该头寸状态已经变化，请刷新金库。" : F.includes("bank_no_due_positions") ? "当前没有可领取的到期头寸。" : F === "host_request_timeout" ? "等待保存结果超时，请保留当前页面并重试。" : "银行操作未完成，请稍后重试。";
    }
    async function T() {
      if (R.value) return;
      const W = ++h;
      i.value = !0, u.value = "";
      try {
        const F = await t.bridge.request("bank/refresh", L(), Ra);
        W === h && A(F.result);
      } catch (F) {
        W === h && (u.value = C(F));
      } finally {
        W === h && (i.value = !1);
      }
    }
    async function M() {
      if (i.value || r.value) return;
      const W = ++h;
      i.value = !0, u.value = "";
      try {
        const F = await t.bridge.request("bank/confirm-save", L(), Ra);
        W === h && A(F.result.state);
      } catch (F) {
        W === h && (u.value = C(F));
      } finally {
        W === h && (i.value = !1);
      }
    }
    function $(W, F) {
      P.value || (p.value = "", l.value = {
        mode: F,
        product: W,
        actionId: D()
      });
    }
    function _(W) {
      P.value || (p.value = "", l.value = {
        mode: "withdraw",
        position: W,
        actionId: D()
      });
    }
    function S() {
      r.value || (l.value = null, p.value = "");
    }
    async function G(W) {
      const F = l.value;
      if (!F || r.value) return;
      const re = h;
      r.value = !0, p.value = "";
      const ce = F.mode === "deposit-open" ? "bank/deposit/open" : F.mode === "fund-open" ? "bank/fund/open" : "bank/deposit/withdraw";
      try {
        const pe = await t.bridge.request(ce, {
          ...L(),
          expectedRevision: a.value.revision,
          expectedEventId: a.value.eventId,
          actionId: F.actionId,
          ...F.product ? {
            productId: F.product.id,
            amount: W
          } : {},
          ...F.position ? { positionId: F.position.id } : {}
        }, Ra);
        if (re !== h || l.value !== F) return;
        A(pe.result), l.value = null;
      } catch (pe) {
        re === h && l.value === F && (p.value = C(pe));
      } finally {
        re === h && (r.value = !1);
      }
    }
    async function te() {
      if (P.value || a.value.claimableCount === 0) return;
      const W = h;
      y ||= D();
      const F = y;
      r.value = !0, u.value = "";
      try {
        const re = await t.bridge.request("bank/settle-due", {
          ...L(),
          expectedRevision: a.value.revision,
          expectedEventId: a.value.eventId,
          actionId: F
        }, Ra);
        if (W !== h) return;
        y = null, A(re.result);
      } catch (re) {
        W === h && (u.value = C(re));
      } finally {
        W === h && (r.value = !1);
      }
    }
    async function X() {
      if (!a.value.activityPage.hasMore || o.value || r.value) return;
      const W = h, F = a.value.activities.length;
      o.value = !0, d.value = "";
      try {
        const re = await t.bridge.request("bank/records/load-more", {
          ...L(),
          offset: F
        }, Ra);
        if (W !== h) return;
        const ce = new Set(a.value.activities.map((pe) => pe.id));
        a.value.activities.push(...re.result.activities.filter((pe) => !ce.has(pe.id))), a.value.activityPage = re.result.activityPage;
      } catch (re) {
        W === h && (d.value = C(re));
      } finally {
        W === h && (o.value = !1);
      }
    }
    return at(() => {
      w = t.bridge.subscribe((W) => {
        W.type === "bank/state" && (r.value || (h += 1), A(W.payload.state)), W.type === "bank/error" && (u.value = C(W.payload?.message || ""));
      });
    }), ot(() => {
      h += 1, w(), l.value = null, y = null;
    }), (W, F) => (v(), b("main", dv, [
      s("header", cv, [
        F[10] || (F[10] = s("div", null, [s("h1", null, "白银金库")], -1)),
        s("div", fv, [F[8] || (F[8] = s("small", null, "可用余额", -1)), s("strong", null, "¤ " + g(a.value.balance.toLocaleString("zh-CN")), 1)]),
        s("button", {
          type: "button",
          class: "bank-refresh",
          disabled: R.value,
          title: "重新读取金库",
          onClick: T
        }, [...F[9] || (F[9] = [s("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [s("path", { d: "M20 7v5h-5M4 17v-5h5M18.2 9A7 7 0 0 0 6.1 6.7L4 9m16 6-2.1 2.3A7 7 0 0 1 5.8 15" })], -1), s("span", { class: "bank-sr-only" }, "重新读取金库", -1)])], 8, vv)
      ]),
      s("nav", pv, [
        s("button", {
          type: "button",
          class: ae({ "is-active": n.value === "vault" }),
          onClick: F[0] || (F[0] = (re) => n.value = "vault")
        }, [...F[11] || (F[11] = [s("span", null, "总览", -1)])], 2),
        s("button", {
          type: "button",
          class: ae({ "is-active": n.value === "deposits" }),
          onClick: F[1] || (F[1] = (re) => n.value = "deposits")
        }, [...F[12] || (F[12] = [s("span", null, "定期", -1)])], 2),
        s("button", {
          type: "button",
          class: ae({ "is-active": n.value === "funds" }),
          onClick: F[2] || (F[2] = (re) => n.value = "funds")
        }, [...F[13] || (F[13] = [s("span", null, "理财", -1)])], 2),
        s("button", {
          type: "button",
          class: ae({ "is-active": n.value === "positions" }),
          onClick: F[3] || (F[3] = (re) => n.value = "positions")
        }, [F[14] || (F[14] = s("span", null, "头寸", -1)), a.value.claimableCount ? (v(), b("i", mv, g(a.value.claimableCount), 1)) : H("", !0)], 2),
        s("button", {
          type: "button",
          class: ae({ "is-active": n.value === "records" }),
          onClick: F[4] || (F[4] = (re) => n.value = "records")
        }, [...F[15] || (F[15] = [s("span", null, "记录", -1)])], 2)
      ]),
      a.value.message || u.value ? (v(), b("aside", {
        key: 0,
        class: ae(["bank-notice", `is-${a.value.status}`]),
        role: "status"
      }, [F[16] || (F[16] = s("span", { "aria-hidden": "true" }, "鉴", -1)), s("div", null, [
        s("strong", null, g(u.value && a.value.status === "ready" ? "操作未完成" : a.value.statusLabel), 1),
        s("p", null, g(u.value || a.value.message), 1),
        q.value ? (v(), b("button", {
          key: 0,
          type: "button",
          disabled: i.value,
          onClick: M
        }, g(i.value ? "正在核实…" : "核实保存结果"), 9, gv)) : a.value.status === "blocked" || a.value.status === "conflict" ? (v(), b("button", {
          key: 1,
          type: "button",
          disabled: i.value,
          onClick: T
        }, g(i.value ? "正在读取…" : "重新读取金库"), 9, bv)) : H("", !0)
      ])], 2)) : H("", !0),
      s("div", hv, [n.value === "vault" ? (v(), ge(uv, {
        key: 0,
        balance: a.value.balance,
        "locked-amount": a.value.lockedAmount,
        "current-turn": a.value.currentTurn,
        "deposit-count": a.value.deposits.length,
        "fund-count": a.value.investments.length,
        "claimable-count": a.value.claimableCount,
        "write-disabled-reason": P.value,
        onNavigate: F[5] || (F[5] = (re) => n.value = re),
        onSettle: te
      }, null, 8, [
        "balance",
        "locked-amount",
        "current-turn",
        "deposit-count",
        "fund-count",
        "claimable-count",
        "write-disabled-reason"
      ])) : n.value === "deposits" ? (v(), ge(mf, {
        key: 1,
        products: a.value.products.deposits,
        balance: a.value.balance,
        "write-disabled-reason": P.value,
        onOpen: F[6] || (F[6] = (re) => $(re, "deposit-open"))
      }, null, 8, [
        "products",
        "balance",
        "write-disabled-reason"
      ])) : n.value === "funds" ? (v(), ge(xf, {
        key: 2,
        products: a.value.products.funds,
        balance: a.value.balance,
        "write-disabled-reason": P.value,
        onOpen: F[7] || (F[7] = (re) => $(re, "fund-open"))
      }, null, 8, [
        "products",
        "balance",
        "write-disabled-reason"
      ])) : n.value === "positions" ? (v(), ge(Ff, {
        key: 3,
        deposits: a.value.deposits,
        investments: a.value.investments,
        "claimable-count": a.value.claimableCount,
        "write-disabled-reason": P.value,
        onWithdraw: _,
        onSettle: te
      }, null, 8, [
        "deposits",
        "investments",
        "claimable-count",
        "write-disabled-reason"
      ])) : (v(), ge(Xf, {
        key: 4,
        activities: a.value.activities,
        total: a.value.activityPage.total,
        "has-more": a.value.activityPage.hasMore,
        "loading-more": o.value,
        error: d.value,
        onLoadMore: X
      }, null, 8, [
        "activities",
        "total",
        "has-more",
        "loading-more",
        "error"
      ]))]),
      l.value ? (v(), ge(lf, {
        key: 1,
        mode: l.value.mode,
        product: l.value.product,
        position: l.value.position,
        balance: a.value.balance,
        busy: r.value,
        error: p.value,
        onCancel: S,
        onConfirm: G
      }, null, 8, [
        "mode",
        "product",
        "position",
        "balance",
        "busy",
        "error"
      ])) : H("", !0)
    ]));
  }
}), kv = yv, wv = Object.freeze({
  id: "game",
  name: "游戏",
  accent: "#c8a35a"
}), Tv = { class: "game-dialog-card" }, xv = { class: "game-dialog-actions" }, $v = /* @__PURE__ */ se({
  __name: "GameActionDialog",
  props: {
    heading: {},
    summary: {},
    confirmLabel: {},
    danger: { type: Boolean }
  },
  emits: ["cancel", "confirm"],
  setup(e) {
    return (t, a) => (v(), b("dialog", {
      open: "",
      class: "game-dialog",
      onCancel: a[2] || (a[2] = tt((n) => t.$emit("cancel"), ["prevent"]))
    }, [s("section", Tv, [
      a[3] || (a[3] = s("span", { class: "game-eyebrow" }, "FINAL CALL", -1)),
      s("h2", null, g(e.heading), 1),
      s("p", null, g(e.summary), 1),
      s("div", xv, [s("button", {
        type: "button",
        onClick: a[0] || (a[0] = (n) => t.$emit("cancel"))
      }, "再想想"), s("button", {
        type: "button",
        class: ae(["is-primary", { "is-danger": e.danger }]),
        onClick: a[1] || (a[1] = (n) => t.$emit("confirm"))
      }, g(e.confirmLabel), 3)])
    ])], 32));
  }
}), Sv = $v, Cr = {
  1: [[2, 2]],
  2: [[1, 1], [3, 3]],
  3: [
    [1, 1],
    [2, 2],
    [3, 3]
  ],
  4: [
    [1, 1],
    [1, 3],
    [3, 1],
    [3, 3]
  ],
  5: [
    [1, 1],
    [1, 3],
    [2, 2],
    [3, 1],
    [3, 3]
  ],
  6: [
    [1, 1],
    [1, 3],
    [2, 1],
    [2, 3],
    [3, 1],
    [3, 3]
  ]
};
var _v = 80, qv = 180, Cv = 200;
function Mv(e) {
  const t = Math.max(0, e - 1) * 45 + 720 + _v, a = t + qv;
  return {
    countAt: t,
    verdictAt: a,
    settledAt: a + Cv
  };
}
var Av = ["aria-label"], Iv = { class: "game-die-stage" }, Ev = { class: "game-die-pips" }, Pv = /* @__PURE__ */ se({
  __name: "GameDie",
  props: {
    value: {},
    delay: { default: 0 },
    highlight: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    const t = e, a = [
      {
        side: "is-front",
        face: 1
      },
      {
        side: "is-back",
        face: 6
      },
      {
        side: "is-top",
        face: 5
      },
      {
        side: "is-bottom",
        face: 2
      },
      {
        side: "is-left",
        face: 4
      },
      {
        side: "is-right",
        face: 3
      }
    ], n = {
      1: [0, 0],
      2: [90, 180],
      3: [0, -90],
      4: [0, 90],
      5: [-90, 0],
      6: [180, 0]
    };
    function l(w, h) {
      return `rotateX(${w}deg) rotateY(${h}deg)`;
    }
    function i() {
      return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    const r = /* @__PURE__ */ K(null), o = /* @__PURE__ */ K(null);
    let u = null, p = null;
    function d() {
      const [w, h] = n[t.value];
      r.value && (r.value.style.transform = l(w, h));
    }
    function y() {
      const w = r.value;
      if (!w) return;
      if (u?.cancel(), p?.cancel(), u = null, p = null, i() || typeof w.animate != "function") {
        d();
        return;
      }
      const [h, q] = n[t.value], P = 360 * (2 + Math.floor(Math.random() * 2)) + 146, R = 360 * (1 + Math.floor(Math.random() * 2)) + 101;
      u = w.animate([
        {
          transform: l(h - P, q - R),
          easing: "cubic-bezier(.11,.58,.32,1)"
        },
        {
          transform: l(h + 13, q + 9),
          offset: 0.84,
          easing: "cubic-bezier(.36,0,.4,1)"
        },
        { transform: l(h, q) }
      ], {
        duration: 720,
        delay: t.delay,
        fill: "both"
      }), p = o.value?.animate([
        {
          transform: "translateY(-16px) scale(1.06)",
          easing: "cubic-bezier(.4,0,.7,1)"
        },
        {
          transform: "translateY(0) scale(1)",
          offset: 0.5,
          easing: "cubic-bezier(.2,0,.2,1)"
        },
        {
          transform: "translateY(-6px) scale(1.02)",
          offset: 0.68,
          easing: "cubic-bezier(.4,0,.7,1)"
        },
        {
          transform: "translateY(0) scale(1)",
          offset: 0.82,
          easing: "cubic-bezier(.2,0,.4,1)"
        },
        {
          transform: "translateY(-1.5px) scale(1)",
          offset: 0.9
        },
        { transform: "translateY(0) scale(1)" }
      ], {
        duration: 720,
        delay: t.delay,
        fill: "both"
      }) ?? null;
    }
    return at(y), Sa(() => {
      u?.cancel(), p?.cancel();
    }), et(() => t.value, y), (w, h) => (v(), b("div", {
      ref_key: "shell",
      ref: o,
      class: ae(["game-die", { "is-hit": e.highlight }]),
      role: "img",
      "aria-label": `骰子 ${e.value} 点`
    }, [s("div", Iv, [s("div", {
      ref_key: "cube",
      ref: r,
      class: "game-die-cube"
    }, [(v(), b(J, null, de(a, (q) => s("div", {
      key: q.side,
      class: ae(["game-die-face", [q.side, { "is-result": q.face === e.value }]])
    }, [s("div", Ev, [(v(!0), b(J, null, de(me(Cr)[q.face], ([P, R], D) => (v(), b("i", {
      key: D,
      class: "game-die-pip",
      style: qt({ gridArea: `${P} / ${R}` })
    }, null, 4))), 128))])], 2)), 64))], 512)])], 10, Av));
  }
}), $s = Pv, Ov = {
  class: "game-table game-dice-table",
  "aria-labelledby": "game-dice-title"
}, Rv = { class: "game-table-heading" }, Bv = { class: "game-dice-cloth" }, Lv = { class: "game-dealer-position" }, Dv = {
  key: 0,
  class: "game-current-bid"
}, Nv = {
  key: 1,
  class: "game-current-bid is-empty"
}, Uv = { class: "game-player-hand" }, Fv = { class: "game-dice-row" }, Hv = {
  key: 0,
  class: "game-bid-builder"
}, jv = {
  class: "game-bid-count",
  role: "group",
  "aria-label": "叫牌数量"
}, Kv = ["disabled"], Gv = ["disabled"], zv = {
  class: "game-bid-faces",
  role: "group",
  "aria-label": "叫牌点数"
}, Vv = [
  "disabled",
  "aria-pressed",
  "aria-label",
  "onClick"
], Zv = { class: "game-face-pips" }, Wv = { class: "game-dice-controls" }, Yv = ["disabled", "title"], Qv = ["disabled", "title"], Xv = ["disabled", "title"], Jv = {
  key: 1,
  class: "game-bid-history",
  "aria-label": "公开叫牌记录"
}, e1 = /* @__PURE__ */ se({
  __name: "GameDiceGame",
  props: {
    game: {},
    writeDisabledReason: {}
  },
  emits: [
    "bid",
    "challenge",
    "lobby"
  ],
  setup(e, { emit: t }) {
    const a = e, n = t, l = [
      2,
      3,
      4,
      5,
      6
    ], i = a.game.legalBids[0] || {
      count: 1,
      face: 2
    }, r = /* @__PURE__ */ K(i.count), o = /* @__PURE__ */ K(i.face), u = V(() => a.game.bids.at(-1) || null), p = V(() => a.game.legalBids[0] || null), d = V(() => {
      const R = a.game.legalBids.map((D) => D.count);
      return R.length === 0 ? {
        min: 1,
        max: 10
      } : {
        min: Math.min(...R),
        max: Math.max(...R)
      };
    }), y = V(() => a.game.legalBids.find((R) => R.count === r.value && R.face === o.value) || null);
    function w(R) {
      return a.game.legalBids.some((D) => D.face === R);
    }
    function h(R) {
      const D = r.value + R, { min: L, max: A } = d.value;
      D >= L && D <= A && (r.value = D);
    }
    et(() => d.value.min, (R) => {
      r.value < R && (r.value = R);
    });
    function q() {
      y.value && !a.writeDisabledReason && n("bid", {
        count: y.value.count,
        face: y.value.face
      });
    }
    function P() {
      const R = p.value;
      R && !a.writeDisabledReason && (r.value = R.count, o.value = R.face, n("bid", {
        count: R.count,
        face: R.face
      }));
    }
    return (R, D) => (v(), b("section", Ov, [
      s("header", Rv, [
        s("button", {
          type: "button",
          class: "game-back",
          onClick: D[0] || (D[0] = (L) => n("lobby"))
        }, "返回大厅"),
        D[4] || (D[4] = s("div", null, [s("span", null, "LIAR'S DICE"), s("h2", { id: "game-dice-title" }, "秘骰对决")], -1)),
        s("strong", null, "托管 ¤ " + g(e.game.bet), 1)
      ]),
      s("div", Bv, [
        s("div", Lv, [D[5] || (D[5] = s("span", {
          class: "game-dealer-chip",
          "aria-hidden": "true"
        }, "庄", -1)), s("p", null, g(u.value?.by === "dealer" ? "庄家已经加叫，轮到你决断。" : "庄家静候你的第一口价。"), 1)]),
        u.value ? (v(), b("div", Dv, [
          D[6] || (D[6] = s("small", null, "桌面叫数", -1)),
          s("strong", null, g(u.value.count), 1),
          s("span", null, "枚 " + g(u.value.face) + " 点", 1),
          s("em", null, g(u.value.by === "dealer" ? "庄家" : "你") + "叫牌", 1)
        ])) : (v(), b("div", Nv, [...D[7] || (D[7] = [s("span", null, "等待首轮叫牌", -1)])])),
        s("div", Uv, [
          D[8] || (D[8] = s("span", null, "你的骰子", -1)),
          s("div", Fv, [(v(!0), b(J, null, de(e.game.playerDice, (L, A) => (v(), ge($s, {
            key: A,
            value: L,
            delay: A * me(45)
          }, null, 8, ["value", "delay"]))), 128))]),
          D[9] || (D[9] = s("small", null, "一点可代替任意叫面", -1))
        ])
      ]),
      e.game.legalActions.includes("bid") ? (v(), b("div", Hv, [s("div", jv, [
        s("button", {
          type: "button",
          disabled: !!e.writeDisabledReason || r.value <= d.value.min,
          "aria-label": "减少数量",
          onClick: D[1] || (D[1] = (L) => h(-1))
        }, " − ", 8, Kv),
        s("strong", null, g(r.value), 1),
        s("button", {
          type: "button",
          disabled: !!e.writeDisabledReason || r.value >= d.value.max,
          "aria-label": "增加数量",
          onClick: D[2] || (D[2] = (L) => h(1))
        }, " + ", 8, Gv),
        D[10] || (D[10] = s("small", null, "枚", -1))
      ]), s("div", zv, [(v(), b(J, null, de(l, (L) => s("button", {
        key: L,
        type: "button",
        class: ae(["game-face-chip", { "is-active": L === o.value }]),
        disabled: !!e.writeDisabledReason || !w(L),
        "aria-pressed": L === o.value,
        "aria-label": `${L} 点`,
        onClick: (A) => o.value = L
      }, [s("span", Zv, [(v(!0), b(J, null, de(me(Cr)[L], ([A, C], T) => (v(), b("i", {
        key: T,
        style: qt({ gridArea: `${A} / ${C}` })
      }, null, 4))), 128))])], 10, Vv)), 64))])])) : H("", !0),
      s("div", Wv, [
        e.game.legalActions.includes("bid") && p.value ? (v(), b("button", {
          key: 0,
          type: "button",
          class: "game-table-button game-min-raise",
          disabled: !!e.writeDisabledReason,
          title: e.writeDisabledReason,
          onClick: P
        }, " 最小加叫 " + g(p.value.count) + " × " + g(p.value.face), 9, Yv)) : H("", !0),
        e.game.legalActions.includes("bid") ? (v(), b("button", {
          key: 1,
          type: "button",
          class: "game-primary-action",
          disabled: !!e.writeDisabledReason || !y.value,
          title: y.value ? e.writeDisabledReason : "这口叫数不高于桌面叫数",
          onClick: q
        }, " 加叫 " + g(r.value) + " × " + g(o.value), 9, Qv)) : H("", !0),
        e.game.legalActions.includes("challenge") ? (v(), b("button", {
          key: 2,
          type: "button",
          class: "game-danger-action",
          disabled: !!e.writeDisabledReason,
          title: e.writeDisabledReason,
          onClick: D[3] || (D[3] = (L) => n("challenge"))
        }, " 开骰 ", 8, Xv)) : H("", !0)
      ]),
      e.game.bids.length ? (v(), b("ol", Jv, [(v(!0), b(J, null, de(e.game.bids, (L, A) => (v(), b("li", { key: `${A}:${L.count}:${L.face}` }, [s("span", null, g(L.by === "player" ? "你" : "庄家"), 1), s("strong", null, g(L.count) + " × " + g(L.face) + " 点", 1)]))), 128))])) : H("", !0)
    ]));
  }
}), t1 = e1, a1 = {
  class: "game-table game-dice-reveal",
  "aria-labelledby": "game-reveal-title"
}, n1 = { class: "game-reveal-call" }, s1 = { class: "game-reveal-side" }, l1 = { class: "game-dice-row" }, i1 = { class: "game-reveal-side" }, r1 = { class: "game-dice-row" }, o1 = {
  key: 0,
  class: "game-reveal-tally"
}, u1 = {
  key: 0,
  class: "game-reveal-actions"
}, d1 = {
  key: 1,
  class: "game-reveal-hint"
}, c1 = /* @__PURE__ */ se({
  __name: "GameDiceReveal",
  props: {
    record: {},
    detail: {}
  },
  emits: ["done"],
  setup(e, { emit: t }) {
    const a = e, n = t, l = [
      "rolling",
      "counting",
      "verdict",
      "settled"
    ], i = /* @__PURE__ */ K("rolling"), r = [];
    function o(D) {
      return l.indexOf(i.value) >= l.indexOf(D);
    }
    function u() {
      for (; r.length > 0; ) {
        const D = r.pop();
        D !== void 0 && window.clearTimeout(D);
      }
    }
    function p() {
      u(), i.value = "settled";
    }
    function d() {
      return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    function y(D) {
      return D === 1 || D === a.detail.finalBid.face;
    }
    const w = V(() => a.detail.matchingDiceCount >= a.detail.finalBid.count), h = V(() => a.detail.challenger === "player" ? "你" : "庄家"), q = V(() => a.detail.finalBid.by === "player" ? "你" : "庄家"), P = V(() => a.record.outcome === "player-win" ? "你赢了" : "你输了"), R = V(() => `${a.record.net > 0 ? "+" : ""}${a.record.net} 小白币`);
    return at(() => {
      if (typeof window > "u" || d()) {
        i.value = "settled";
        return;
      }
      const D = Mv(Math.max(a.detail.dealerDice.length, a.detail.playerDice.length));
      r.push(window.setTimeout(() => {
        i.value = "counting";
      }, D.countAt)), r.push(window.setTimeout(() => {
        i.value = "verdict";
      }, D.verdictAt)), r.push(window.setTimeout(() => {
        i.value = "settled";
      }, D.settledAt));
    }), Sa(u), (D, L) => (v(), b("section", a1, [
      L[5] || (L[5] = s("header", { class: "game-table-heading game-reveal-heading" }, [s("div", null, [s("span", null, "SHOWDOWN"), s("h2", { id: "game-reveal-title" }, "开骰")])], -1)),
      s("div", {
        class: "game-reveal-cloth",
        onClick: p
      }, [
        s("div", n1, [s("span", null, "最终叫牌 · " + g(q.value), 1), s("strong", null, g(e.detail.finalBid.count) + " 枚 " + g(e.detail.finalBid.face) + " 点", 1)]),
        s("div", s1, [L[1] || (L[1] = s("span", null, "庄家", -1)), s("div", l1, [(v(!0), b(J, null, de(e.detail.dealerDice, (A, C) => (v(), ge($s, {
          key: `dealer:${C}`,
          value: A,
          delay: C * me(45),
          highlight: o("counting") && y(A)
        }, null, 8, [
          "value",
          "delay",
          "highlight"
        ]))), 128))])]),
        s("div", i1, [L[2] || (L[2] = s("span", null, "你", -1)), s("div", r1, [(v(!0), b(J, null, de(e.detail.playerDice, (A, C) => (v(), ge($s, {
          key: `player:${C}`,
          value: A,
          delay: C * me(45),
          highlight: o("counting") && y(A)
        }, null, 8, [
          "value",
          "delay",
          "highlight"
        ]))), 128))])]),
        o("counting") ? (v(), b("p", o1, [
          s("span", null, "实际开出（" + g(e.detail.finalBid.face) + " 点及 1 点）", 1),
          s("strong", null, g(e.detail.matchingDiceCount), 1),
          L[3] || (L[3] = s("span", null, "枚", -1))
        ])) : H("", !0),
        o("verdict") ? (v(), b("div", {
          key: 1,
          class: ae(["game-reveal-verdict", `is-${e.record.outcomeTone}`]),
          role: "status",
          "aria-live": "polite"
        }, [
          L[4] || (L[4] = s("small", null, "本局结果", -1)),
          s("div", null, [s("strong", null, g(P.value), 1), s("em", null, g(R.value), 1)]),
          s("p", null, " 实际 " + g(e.detail.matchingDiceCount) + " 枚 " + g(w.value ? "≥" : "<") + " 叫牌 " + g(e.detail.finalBid.count) + " 枚； " + g(h.value) + "开骰，" + g(q.value) + "的叫牌" + g(w.value ? "成立" : "不成立") + "。 ", 1)
        ], 2)) : H("", !0)
      ]),
      o("settled") ? (v(), b("div", u1, [s("button", {
        type: "button",
        class: "game-primary-action",
        onClick: L[0] || (L[0] = (A) => n("done"))
      }, "回到大厅")])) : (v(), b("p", d1, "点击牌桌跳过"))
    ]));
  }
}), f1 = c1, v1 = {
  class: "game-table game-ladder-table",
  "aria-labelledby": "game-ladder-title"
}, p1 = { class: "game-table-heading" }, m1 = { class: "game-ladder-stage" }, g1 = {
  class: "game-ladder-track",
  "aria-label": "五层挑战进度"
}, b1 = { key: 0 }, h1 = { key: 1 }, y1 = { class: "game-ladder-purse" }, k1 = {
  key: 1,
  class: "game-ladder-settling",
  role: "status"
}, w1 = {
  key: 0,
  class: "game-ladder-choices"
}, T1 = [
  "disabled",
  "title",
  "onClick"
], x1 = ["disabled", "title"], $1 = 720, S1 = 620, _1 = /* @__PURE__ */ se({
  __name: "GameLadderGame",
  props: {
    game: {},
    writeDisabledReason: {},
    ending: {}
  },
  emits: [
    "step",
    "cashOut",
    "lobby",
    "finished"
  ],
  setup(e, { emit: t }) {
    const a = e, n = t, l = Object.freeze({
      safe: {
        name: "稳",
        note: "守住筹码"
      },
      medium: {
        name: "中",
        note: "均衡一搏"
      },
      risky: {
        name: "险",
        note: "追逐高筹"
      }
    }), i = /* @__PURE__ */ K(a.game.completedFloors), r = /* @__PURE__ */ K(a.game.cashoutAmount), o = /* @__PURE__ */ K(a.game.canCashOut), u = /* @__PURE__ */ K(0), p = /* @__PURE__ */ K(null), d = [];
    function y() {
      return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    function w() {
      for (; d.length > 0; ) {
        const A = d.pop();
        A !== void 0 && window.clearTimeout(A);
      }
    }
    function h(A, C) {
      if (w(), u.value = i.value + 1, p.value = null, y() || typeof window > "u") {
        p.value = A, C();
        return;
      }
      d.push(window.setTimeout(() => {
        p.value = A, C(), A === "rise" && !a.ending && d.push(window.setTimeout(() => {
          u.value = 0, p.value = null;
        }, S1));
      }, $1));
    }
    et(() => a.game.completedFloors, (A, C) => {
      if (A > C) {
        h("rise", () => {
          i.value = A, r.value = a.game.cashoutAmount, o.value = a.game.canCashOut;
        });
        return;
      }
      i.value = A, r.value = a.game.cashoutAmount, o.value = a.game.canCashOut;
    }), et(() => a.ending, (A) => {
      if (!A || A.detail.kind !== "ladder") return;
      const C = A.detail.steps.at(-1);
      C && h(C.success ? "rise" : "fall", () => {
        C.success && (i.value = C.floor, r.value = C.amountAfterStep);
      });
    }, { immediate: !0 });
    const q = V(() => u.value > 0 && p.value === null), P = V(() => !!a.ending && (p.value !== null || u.value === 0)), R = V(() => !!a.writeDisabledReason || !!a.ending || u.value > 0);
    function D(A) {
      return {
        "is-complete": A <= i.value,
        "is-next": A === i.value + 1 && u.value === 0,
        "is-judging": A === u.value && p.value === null,
        "is-risen": A === u.value && p.value === "rise",
        "is-fallen": A === u.value && p.value === "fall"
      };
    }
    function L(A) {
      return `${A / 100}%`;
    }
    return Sa(w), (A, C) => (v(), b("section", v1, [
      s("header", p1, [
        s("button", {
          type: "button",
          class: "game-back",
          onClick: C[0] || (C[0] = (T) => n("lobby"))
        }, "返回大厅"),
        C[3] || (C[3] = s("div", null, [s("span", null, "THE GILDED ASCENT"), s("h2", { id: "game-ladder-title" }, "鎏金阶梯")], -1)),
        s("strong", null, "托管 ¤ " + g(e.game.bet), 1)
      ]),
      s("div", m1, [s("div", g1, [(v(), b(J, null, de(5, (T) => s("div", {
        key: T,
        class: ae(["game-ladder-floor", D(T)])
      }, [s("span", null, g(T), 1), e.game.steps[T - 1] && T <= i.value ? (v(), b("small", b1, " ¤ " + g(e.game.steps[T - 1]?.amountAfterSuccess), 1)) : (v(), b("small", h1, "第 " + g(T) + " 层", 1))], 2)), 64))]), s("div", y1, [
        s("span", null, g(o.value ? "当前可收手" : "风险起点"), 1),
        s("strong", null, "¤ " + g(r.value), 1),
        s("small", null, "已完成 " + g(i.value) + " / 5 层", 1)
      ])]),
      P.value && e.ending ? (v(), b("div", {
        key: 0,
        class: ae(["game-reveal-outcome", `is-${e.ending.outcomeTone}`])
      }, [
        s("strong", null, g(e.ending.outcomeLabel), 1),
        s("em", null, g(e.ending.net > 0 ? "+" : "") + g(e.ending.net) + " 小白币", 1),
        s("button", {
          type: "button",
          class: "game-primary-action",
          onClick: C[1] || (C[1] = (T) => n("finished"))
        }, "回到大厅")
      ], 2)) : q.value ? (v(), b("p", k1, "正在判定第 " + g(u.value) + " 层…", 1)) : e.ending ? H("", !0) : (v(), b(J, { key: 2 }, [e.game.legalActions.includes("step") ? (v(), b("div", w1, [(v(!0), b(J, null, de(e.game.nextChoices, (T) => (v(), b("button", {
        key: T.choice,
        type: "button",
        class: ae(`is-${T.choice}`),
        disabled: R.value,
        title: e.writeDisabledReason,
        onClick: (M) => n("step", T.choice)
      }, [
        s("span", null, g(me(l)[T.choice].name), 1),
        s("small", null, g(me(l)[T.choice].note), 1),
        s("strong", null, g(L(T.successProbabilityBps)), 1),
        s("em", null, "成功得 ¤ " + g(T.successAmount), 1)
      ], 10, T1))), 128))])) : H("", !0), e.game.legalActions.includes("cash-out") ? (v(), b("button", {
        key: 1,
        type: "button",
        class: "game-ladder-cashout",
        disabled: R.value,
        title: e.writeDisabledReason,
        onClick: C[2] || (C[2] = (T) => n("cashOut"))
      }, " 收手并领取 ¤ " + g(r.value), 9, x1)) : H("", !0)], 64))
    ]));
  }
}), q1 = _1, C1 = {
  class: "game-lobby",
  "aria-labelledby": "game-lobby-title"
}, M1 = {
  key: 0,
  class: "game-continue-card"
}, A1 = {
  key: 1,
  class: "game-grid"
}, I1 = { class: "game-card is-dice" }, E1 = { class: "game-bet-field" }, P1 = ["disabled", "title"], O1 = {
  key: 0,
  class: "game-card-reason"
}, R1 = { class: "game-card is-push" }, B1 = ["disabled", "title"], L1 = {
  key: 0,
  class: "game-card-reason"
}, D1 = { class: "game-card is-ladder" }, N1 = { class: "game-bet-field" }, U1 = ["disabled", "title"], F1 = {
  key: 0,
  class: "game-card-reason"
}, H1 = /* @__PURE__ */ se({
  __name: "GameLobby",
  props: {
    activeGame: {},
    balance: {},
    lockedAmount: {},
    writeDisabledReason: {}
  },
  emits: ["start", "continue"],
  setup(e, { emit: t }) {
    const a = e, n = t, l = /* @__PURE__ */ K(50), i = /* @__PURE__ */ K(30), r = V(() => a.activeGame?.kind === "dice" ? "秘骰对决" : a.activeGame?.kind === "push" ? "翻倍或收手" : a.activeGame?.kind === "ladder" ? "鎏金阶梯" : "");
    function o() {
      return a.writeDisabledReason ? a.writeDisabledReason : !Number.isSafeInteger(l.value) || l.value < 50 || l.value > 500 || l.value % 10 !== 0 ? "下注须为 50 至 500，且为 10 的倍数" : a.balance < l.value ? "余额不足" : "";
    }
    function u() {
      return a.writeDisabledReason ? a.writeDisabledReason : a.balance < 50 ? "余额不足" : "";
    }
    function p() {
      return a.writeDisabledReason ? a.writeDisabledReason : !Number.isSafeInteger(i.value) || i.value < 30 || i.value > 800 || i.value % 10 !== 0 ? "下注须为 30 至 800，且为 10 的倍数" : a.balance < i.value ? "余额不足" : "";
    }
    return (d, y) => (v(), b("section", C1, [y[17] || (y[17] = s("div", { class: "game-lobby-hero" }, [
      s("span", { class: "game-eyebrow" }, "THE GILDED PARLOUR"),
      s("h2", { id: "game-lobby-title" }, "今夜，押注你的判断"),
      s("p", null, "三张独立牌桌，只认明确选择。每一步都会先落账，再揭晓。")
    ], -1)), e.activeGame ? (v(), b("article", M1, [
      y[7] || (y[7] = s("div", {
        class: "game-continue-seal",
        "aria-hidden": "true"
      }, "续", -1)),
      s("div", null, [
        y[6] || (y[6] = s("span", null, "牌桌仍在等候", -1)),
        s("h3", null, g(r.value), 1),
        s("p", null, "已有 ¤ " + g(e.lockedAmount) + " 托管在本局，离开页面不会结束赌局。", 1)
      ]),
      s("button", {
        type: "button",
        onClick: y[0] || (y[0] = (w) => n("continue", e.activeGame.kind))
      }, "继续本局")
    ])) : (v(), b("div", A1, [
      s("article", I1, [
        y[9] || (y[9] = s("div", {
          class: "game-glyph",
          "aria-hidden": "true"
        }, [s("span", null, "⚄"), s("span", null, "⚂")], -1)),
        y[10] || (y[10] = s("div", { class: "game-copy" }, [
          s("span", { class: "game-card-index" }, "TABLE 01"),
          s("h3", null, "秘骰对决"),
          s("p", null, "五骰藏锋，一点为百搭。抬高叫数，或当场开骰验牌。"),
          s("ul", null, [s("li", null, "下注 50–500"), s("li", null, "胜出返还 1.8 倍")])
        ], -1)),
        s("label", E1, [y[8] || (y[8] = s("span", null, "下注", -1)), Me(s("input", {
          "onUpdate:modelValue": y[1] || (y[1] = (w) => l.value = w),
          type: "number",
          min: "50",
          max: "500",
          step: "10"
        }, null, 512), [[
          De,
          l.value,
          void 0,
          { number: !0 }
        ]])]),
        s("button", {
          type: "button",
          class: "game-table-button",
          disabled: !!o(),
          title: o(),
          onClick: y[2] || (y[2] = (w) => n("start", "dice", l.value))
        }, " 入席 ", 8, P1),
        o() ? (v(), b("small", O1, g(o()), 1)) : H("", !0)
      ]),
      s("article", R1, [
        y[11] || (y[11] = s("div", {
          class: "game-glyph is-coin",
          "aria-hidden": "true"
        }, "¤", -1)),
        y[12] || (y[12] = s("div", { class: "game-copy" }, [
          s("span", { class: "game-card-index" }, "TABLE 02"),
          s("h3", null, "翻倍或收手"),
          s("p", null, "十张暗牌藏着七枚金币与三枚炸弹。每次翻牌都更接近答案。"),
          s("ul", null, [s("li", null, "固定下注 50"), s("li", null, "每枚金币价值 50")])
        ], -1)),
        y[13] || (y[13] = s("div", { class: "game-fixed-bet" }, [s("span", null, "入场"), s("strong", null, "¤ 50")], -1)),
        s("button", {
          type: "button",
          class: "game-table-button",
          disabled: !!u(),
          title: u(),
          onClick: y[3] || (y[3] = (w) => n("start", "push", 50))
        }, " 揭牌 ", 8, B1),
        u() ? (v(), b("small", L1, g(u()), 1)) : H("", !0)
      ]),
      s("article", D1, [
        y[15] || (y[15] = s("div", {
          class: "game-glyph is-ladder-mark",
          "aria-hidden": "true"
        }, "Ⅴ", -1)),
        y[16] || (y[16] = s("div", { class: "game-copy" }, [
          s("span", { class: "game-card-index" }, "TABLE 03"),
          s("h3", null, "鎏金阶梯"),
          s("p", null, "五层风险逐级累积。每层选择稳、中、险，成功后可随时收手。"),
          s("ul", null, [s("li", null, "下注 30–800"), s("li", null, "最高返还 50,000")])
        ], -1)),
        s("label", N1, [y[14] || (y[14] = s("span", null, "下注", -1)), Me(s("input", {
          "onUpdate:modelValue": y[4] || (y[4] = (w) => i.value = w),
          type: "number",
          min: "30",
          max: "800",
          step: "10"
        }, null, 512), [[
          De,
          i.value,
          void 0,
          { number: !0 }
        ]])]),
        s("button", {
          type: "button",
          class: "game-table-button",
          disabled: !!p(),
          title: p(),
          onClick: y[5] || (y[5] = (w) => n("start", "ladder", i.value))
        }, " 登阶 ", 8, U1),
        p() ? (v(), b("small", F1, g(p()), 1)) : H("", !0)
      ])
    ]))]));
  }
}), j1 = H1, K1 = {
  class: "game-table game-push-table",
  "aria-labelledby": "game-push-title"
}, G1 = { class: "game-table-heading" }, z1 = { class: "game-push-stage" }, V1 = { class: "game-flip-card" }, Z1 = {
  class: "game-coin-stack",
  "aria-label": "已翻出的金币"
}, W1 = {
  key: 0,
  class: "game-empty-stack"
}, Y1 = {
  class: "game-card-fan",
  "aria-hidden": "true"
}, Q1 = { class: "game-push-metrics" }, X1 = {
  key: 1,
  class: "game-actions"
}, J1 = ["disabled", "title"], ep = ["disabled", "title"], tp = 660, ap = /* @__PURE__ */ se({
  __name: "GamePushGame",
  props: {
    game: {},
    writeDisabledReason: {},
    ending: {}
  },
  emits: [
    "draw",
    "cashOut",
    "lobby",
    "finished"
  ],
  setup(e, { emit: t }) {
    const a = e, n = t, l = /* @__PURE__ */ K(a.game.revealedCoins), i = /* @__PURE__ */ K({
      cashoutAmount: a.game.cashoutAmount,
      remainingCards: a.game.remainingCards,
      remainingBombs: a.game.remainingBombs,
      nextBombProbabilityBps: a.game.nextBombProbabilityBps
    }), r = /* @__PURE__ */ K(null), o = /* @__PURE__ */ K(!1), u = /* @__PURE__ */ K(!1);
    let p = 0;
    function d() {
      i.value = {
        cashoutAmount: a.game.cashoutAmount,
        remainingCards: a.game.remainingCards,
        remainingBombs: a.game.remainingBombs,
        nextBombProbabilityBps: a.game.nextBombProbabilityBps
      };
    }
    function y() {
      return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    function w() {
      p !== 0 && (window.clearTimeout(p), p = 0);
    }
    function h(L, A) {
      if (w(), r.value = L, u.value = !1, y() || typeof window > "u") {
        o.value = !0, u.value = !0, A();
        return;
      }
      o.value = !1, window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          o.value = !0;
        });
      }), p = window.setTimeout(() => {
        u.value = !0, A();
      }, tp);
    }
    et(() => a.game.revealedCoins, (L, A) => {
      if (L > A) {
        h("coin", () => {
          l.value = L, d();
        });
        return;
      }
      l.value = L, d();
    }), et(() => a.ending, (L) => {
      L?.outcome === "busted" && h("bomb", () => {
      });
    }, { immediate: !0 });
    const q = V(() => a.ending?.outcome === "busted"), P = V(() => !!a.ending && (!q.value || u.value)), R = V(() => !!a.writeDisabledReason || !!a.ending);
    function D(L) {
      return `${(L / 100).toFixed(L % 100 === 0 ? 0 : 2)}%`;
    }
    return Sa(w), (L, A) => (v(), b("section", K1, [
      s("header", G1, [
        s("button", {
          type: "button",
          class: "game-back",
          onClick: A[0] || (A[0] = (C) => n("lobby"))
        }, "返回大厅"),
        A[4] || (A[4] = s("div", null, [s("span", null, "DOUBLE OR HOLD"), s("h2", { id: "game-push-title" }, "翻倍或收手")], -1)),
        s("strong", null, "托管 ¤ " + g(e.game.bet), 1)
      ]),
      s("div", z1, [
        r.value ? (v(), b("div", {
          key: 0,
          class: ae(["game-flip-slot", { "is-flipped": o.value }])
        }, [s("div", V1, [A[5] || (A[5] = s("span", {
          class: "game-flip-back",
          "aria-hidden": "true"
        }, null, -1)), s("span", { class: ae(["game-flip-front", `is-${r.value}`]) }, g(r.value === "bomb" ? "✸" : "¤"), 3)])], 2)) : H("", !0),
        s("div", Z1, [l.value === 0 && !r.value ? (v(), b("span", W1, "尚未揭牌")) : H("", !0), (v(!0), b(J, null, de(l.value, (C) => (v(), b("b", {
          key: C,
          class: "game-revealed-coin"
        }, "¤"))), 128))]),
        s("div", Y1, [(v(!0), b(J, null, de(i.value.remainingCards, (C) => (v(), b("i", {
          key: C,
          style: qt({ "--card": C })
        }, null, 4))), 128))])
      ]),
      s("div", Q1, [
        s("div", null, [A[6] || (A[6] = s("span", null, "可收手", -1)), s("strong", null, "¤ " + g(i.value.cashoutAmount), 1)]),
        s("div", null, [A[7] || (A[7] = s("span", null, "余牌", -1)), s("strong", null, g(i.value.remainingCards), 1)]),
        s("div", null, [A[8] || (A[8] = s("span", null, "余雷", -1)), s("strong", null, g(i.value.remainingBombs), 1)]),
        s("div", null, [A[9] || (A[9] = s("span", null, "下一张风险", -1)), s("strong", null, g(D(i.value.nextBombProbabilityBps)), 1)])
      ]),
      A[10] || (A[10] = s("p", { class: "game-rule-note" }, "每枚金币增加 ¤ 50；翻到炸弹立即以零返还结束。", -1)),
      P.value && e.ending ? (v(), b("div", {
        key: 0,
        class: ae(["game-reveal-outcome", `is-${e.ending.outcomeTone}`])
      }, [
        s("strong", null, g(e.ending.outcomeLabel), 1),
        s("em", null, g(e.ending.net > 0 ? "+" : "") + g(e.ending.net) + " 小白币", 1),
        s("button", {
          type: "button",
          class: "game-primary-action",
          onClick: A[1] || (A[1] = (C) => n("finished"))
        }, "回到大厅")
      ], 2)) : e.ending ? H("", !0) : (v(), b("div", X1, [e.game.legalActions.includes("draw") ? (v(), b("button", {
        key: 0,
        type: "button",
        class: "game-primary-action",
        disabled: R.value,
        title: e.writeDisabledReason,
        onClick: A[2] || (A[2] = (C) => n("draw"))
      }, " 再翻一张 ", 8, J1)) : H("", !0), e.game.legalActions.includes("cash-out") ? (v(), b("button", {
        key: 1,
        type: "button",
        class: "game-secondary-action",
        disabled: R.value,
        title: e.writeDisabledReason,
        onClick: A[3] || (A[3] = (C) => n("cashOut"))
      }, " 收手入账 ", 8, ep)) : H("", !0)]))
    ]));
  }
}), np = ap, sp = {
  class: "game-records",
  "aria-labelledby": "game-records-title"
}, lp = { class: "game-section-heading" }, ip = {
  key: 0,
  class: "game-record-list"
}, rp = {
  class: "game-record-mark",
  "aria-hidden": "true"
}, op = { class: "game-record-main" }, up = ["datetime"], dp = { class: "game-record-money" }, cp = {
  key: 0,
  class: "game-record-detail"
}, fp = {
  key: 1,
  class: "game-record-detail"
}, vp = {
  key: 2,
  class: "game-record-steps"
}, pp = {
  key: 1,
  class: "game-record-empty"
}, mp = {
  key: 2,
  class: "game-inline-error",
  role: "status"
}, gp = ["disabled"], bp = /* @__PURE__ */ se({
  __name: "GameRecords",
  props: {
    records: {},
    total: {},
    hasMore: { type: Boolean },
    loadingMore: { type: Boolean },
    error: {}
  },
  emits: ["loadMore"],
  setup(e) {
    const t = Object.freeze({
      safe: "稳",
      medium: "中",
      risky: "险"
    });
    function a(n) {
      return new Intl.DateTimeFormat("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      }).format(new Date(n));
    }
    return (n, l) => (v(), b("section", sp, [
      s("header", lp, [l[1] || (l[1] = s("div", null, [s("span", null, "HOUSE LEDGER"), s("h2", { id: "game-records-title" }, "牌桌记录")], -1)), s("small", null, g(e.total) + " 局", 1)]),
      e.records.length ? (v(), b("div", ip, [(v(!0), b(J, null, de(e.records, (i) => (v(), b("article", {
        key: i.id,
        class: ae(["game-record", `is-${i.outcomeTone}`])
      }, [s("div", rp, g(i.game === "dice" ? "骰" : i.game === "push" ? "翻" : "阶"), 1), s("div", op, [
        s("header", null, [s("div", null, [s("span", null, g(i.gameLabel), 1), s("strong", null, g(i.outcomeLabel), 1)]), s("time", { datetime: new Date(i.createdAt).toISOString() }, g(a(i.createdAt)), 9, up)]),
        s("div", dp, [
          s("span", null, "下注 ¤ " + g(i.amountIn), 1),
          s("span", null, "返还 ¤ " + g(i.payout), 1),
          s("strong", null, g(i.net > 0 ? "+" : "") + g(i.net), 1)
        ]),
        s("details", null, [l[2] || (l[2] = s("summary", null, "查看公开牌局", -1)), i.detail.kind === "dice" ? (v(), b("div", cp, [
          s("p", null, "终局叫数：" + g(i.detail.finalBid.count) + " 枚 " + g(i.detail.finalBid.face) + " 点", 1),
          s("p", null, "实际匹配：" + g(i.detail.matchingDiceCount) + " 枚 · " + g(i.detail.challenger === "player" ? "玩家" : "庄家") + "开骰", 1),
          s("p", null, "你的骰子：" + g(i.detail.playerDice.join(" · ")), 1)
        ])) : i.detail.kind === "push" ? (v(), b("div", fp, [s("p", null, "共翻出 " + g(i.detail.revealedCoins) + " 枚金币", 1)])) : (v(), b("ol", vp, [(v(!0), b(J, null, de(i.detail.steps, (r) => (v(), b("li", { key: r.floor }, " 第 " + g(r.floor) + " 层 · " + g(me(t)[r.choice]) + " · " + g(r.success ? `成功至 ¤ ${r.amountAfterStep}` : "挑战失败"), 1))), 128))]))])
      ])], 2))), 128))])) : (v(), b("div", pp, [...l[3] || (l[3] = [s("span", { "aria-hidden": "true" }, "◇", -1), s("p", null, "尚无结算记录", -1)])])),
      e.error ? (v(), b("p", mp, g(e.error), 1)) : H("", !0),
      e.hasMore ? (v(), b("button", {
        key: 3,
        type: "button",
        class: "game-load-more",
        disabled: e.loadingMore,
        onClick: l[0] || (l[0] = (i) => n.$emit("loadMore"))
      }, g(e.loadingMore ? "正在翻阅…" : "继续翻阅记录"), 9, gp)) : H("", !0)
    ]));
  }
}), hp = bp, yp = { class: "game-app" }, kp = { class: "game-header" }, wp = { class: "game-funds" }, Tp = ["disabled"], xp = {
  class: "game-nav",
  "aria-label": "游戏页面"
}, $p = ["disabled"], Sp = ["disabled"], _p = {
  key: 1,
  class: "game-action-error",
  role: "status"
}, qp = ["disabled"], Cp = { class: "game-scroll" }, mn = 35e3, Mp = /* @__PURE__ */ se({
  __name: "GameApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const t = /* @__PURE__ */ new Set([
      "busted",
      "failed",
      "cleared",
      "capped"
    ]), a = e, n = /* @__PURE__ */ K(structuredClone(/* @__PURE__ */ oe(a.initialState))), l = /* @__PURE__ */ K(n.value.activeGame?.kind || "lobby"), i = /* @__PURE__ */ K(!1), r = /* @__PURE__ */ K(!1), o = /* @__PURE__ */ K(!1), u = /* @__PURE__ */ K(""), p = /* @__PURE__ */ K(""), d = /* @__PURE__ */ K(""), y = /* @__PURE__ */ K(null), w = /* @__PURE__ */ K(null), h = /* @__PURE__ */ K(""), q = /* @__PURE__ */ K(null);
    let P = () => {
    }, R = 0, D = 0;
    const L = V(() => n.value.status === "unconfirmed"), A = V(() => r.value ? "正在处理上一项操作" : i.value ? "正在刷新游戏状态" : n.value.status !== "ready" ? n.value.message || "游戏暂时不可写入" : n.value.generationActive ? "主剧情正在生成，请等待回复完成" : ""), C = V(() => i.value || r.value || L.value || n.value.status === "conflict"), T = V(() => n.value.records.find((Z) => Z.id === h.value) || null), M = V(() => q.value?.kind === "push" ? q.value.game : n.value.activeGame?.kind === "push" ? n.value.activeGame : null), $ = V(() => q.value?.kind === "ladder" ? q.value.game : n.value.activeGame?.kind === "ladder" ? n.value.activeGame : null);
    function _() {
      return typeof globalThis.crypto?.randomUUID == "function" ? `game-ui:${globalThis.crypto.randomUUID()}` : (D += 1, `game-ui:${Date.now()}:${D}`);
    }
    function S() {
      return { chatIdentity: n.value.chatIdentity };
    }
    function G(Z) {
      const j = Z instanceof Error ? Z.message : String(Z);
      return j.includes("cannot be overdrawn") || j.includes("economy_insufficient_funds") ? "小白币余额不足，未能入局。" : j.includes("game_revision_conflict") || j.includes("game_event_id_conflict") ? "牌局已经变化，请重新读取后再操作。" : j.includes("game_dice_bid_not_higher") ? "叫数必须高于桌面当前叫数。" : j.includes("game_action_invalid") ? "当前牌局不接受这项操作。" : j.includes("game_main_generation_active") ? "主剧情正在生成，请等待回复完成。" : j.includes("game_push_cashout_invalid") || j.includes("game_ladder_cashout_invalid") ? "当前还不能收手。" : j.includes("聊天已切换") ? "聊天已切换，请重新打开游戏。" : j === "host_request_timeout" ? "等待落账结果超时；可用同一操作标识安全重试。" : "游戏操作未完成，请稍后重试。";
    }
    function te(Z, j) {
      return !t.has(j.outcome) && j.detail.kind !== "dice" ? null : Z.kind === "dice" && j.detail.kind === "dice" ? {
        kind: "dice",
        record: j,
        detail: j.detail
      } : Z.kind === "push" && j.detail.kind === "push" ? {
        kind: "push",
        record: j,
        game: Z
      } : Z.kind === "ladder" && j.detail.kind === "ladder" ? {
        kind: "ladder",
        record: j,
        game: Z
      } : null;
    }
    function X() {
      q.value = null;
    }
    function W(Z) {
      X(), l.value = Z;
    }
    function F(Z) {
      const j = n.value.activeGame;
      if (n.value = structuredClone(Z), i.value = !1, o.value = !1, u.value = "", d.value = "", j && !Z.activeGame) {
        const le = Z.records.find((Pe) => Pe.gameId === j.id), Ie = le ? te(j, le) : null;
        Ie ? (q.value = Ie, h.value = "", l.value = Ie.kind) : (h.value = le?.id || "", l.value = "lobby");
      } else Z.activeGame && l.value !== "records" && l.value !== "lobby" ? l.value = Z.activeGame.kind : !Z.activeGame && l.value !== "records" && !q.value && (l.value = "lobby");
    }
    function re(Z, j) {
      const le = {
        ...S(),
        expectedRevision: n.value.revision,
        expectedEventId: n.value.eventId,
        actionId: j
      };
      return Z.endpoint === "game/dice/start" || Z.endpoint === "game/ladder/start" ? {
        ...le,
        bet: Z.bet
      } : Z.endpoint === "game/push/start" ? le : Z.endpoint === "game/dice/bid" ? {
        ...le,
        gameId: Z.gameId,
        bid: {
          count: Z.bid.count,
          face: Z.bid.face
        }
      } : Z.endpoint === "game/ladder/step" ? {
        ...le,
        gameId: Z.gameId,
        choice: Z.choice
      } : {
        ...le,
        gameId: Z.gameId
      };
    }
    async function ce(Z, j = _()) {
      if (A.value) return !1;
      const le = R;
      r.value = !0, p.value = "", w.value = null;
      try {
        const Ie = await a.bridge.request(Z.endpoint, re(Z, j), mn);
        return le !== R ? !1 : (F(Ie.result), Ie.result.activeGame && (l.value = Ie.result.activeGame.kind), !0);
      } catch (Ie) {
        return le === R && (p.value = G(Ie), n.value.status === "unconfirmed" ? (y.value = null, w.value = null) : w.value = {
          request: Z,
          actionId: j
        }), !1;
      } finally {
        le === R && (r.value = !1);
      }
    }
    function pe(Z, j) {
      if (A.value || n.value.activeGame) return;
      const le = Z === "dice" ? {
        heading: "确认入席秘骰对决",
        summary: `托管 ¤ ${j}，胜出返还下注的 1.8 倍。`,
        confirmLabel: "确认入席"
      } : Z === "push" ? {
        heading: "确认揭开第一张牌",
        summary: "托管 ¤ 50。金币可以累积，炸弹会立即结束本局。",
        confirmLabel: "确认揭牌"
      } : {
        heading: "确认踏上鎏金阶梯",
        summary: `托管 ¤ ${j}，首层成功后才可收手。`,
        confirmLabel: "确认登阶"
      };
      y.value = {
        request: Z === "dice" ? {
          endpoint: "game/dice/start",
          bet: j
        } : Z === "push" ? { endpoint: "game/push/start" } : {
          endpoint: "game/ladder/start",
          bet: j
        },
        actionId: _(),
        ...le
      }, p.value = "";
    }
    function he() {
      const Z = n.value.activeGame;
      Z?.kind !== "dice" || !Z.legalActions.includes("challenge") || (y.value = {
        request: {
          endpoint: "game/dice/challenge",
          gameId: Z.id
        },
        actionId: _(),
        heading: "现在开骰？",
        summary: "双方骰盅将同时揭开，按桌面最终叫牌直接判定输赢。",
        confirmLabel: "确认开骰",
        danger: !0
      }, p.value = "");
    }
    function _e(Z) {
      const j = n.value.activeGame;
      if (!j || j.kind !== Z || !j.legalActions.includes("cash-out")) return;
      const le = j.cashoutAmount;
      y.value = {
        request: Z === "push" ? {
          endpoint: "game/push/cash-out",
          gameId: j.id
        } : {
          endpoint: "game/ladder/cash-out",
          gameId: j.id
        },
        actionId: _(),
        heading: "现在收手？",
        summary: `本局将结束，并返还 ¤ ${le}。`,
        confirmLabel: "收手入账"
      }, p.value = "";
    }
    function Ee() {
      const Z = y.value;
      Z && (y.value = null, ce(Z.request, Z.actionId));
    }
    function nt() {
      y.value = null, p.value = "";
    }
    async function Be() {
      if (C.value) return;
      const Z = ++R;
      i.value = !0, u.value = "";
      try {
        const j = await a.bridge.request("game/refresh", S(), mn);
        Z === R && F(j.result);
      } catch (j) {
        Z === R && (u.value = G(j));
      } finally {
        Z === R && (i.value = !1);
      }
    }
    async function Le() {
      if (i.value || r.value) return;
      const Z = ++R;
      i.value = !0, u.value = "";
      try {
        const j = await a.bridge.request("game/confirm-save", S(), mn);
        Z === R && F(j.result.state);
      } catch (j) {
        Z === R && (u.value = G(j));
      } finally {
        Z === R && (i.value = !1);
      }
    }
    async function Mt() {
      if (!n.value.hasMore || o.value || r.value) return;
      const Z = R;
      o.value = !0, d.value = "";
      try {
        const j = await a.bridge.request("game/records/load-more", {
          ...S(),
          offset: n.value.records.length
        }, mn);
        if (Z !== R) return;
        const le = new Set(n.value.records.map((Ie) => Ie.id));
        n.value.records.push(...j.result.records.filter((Ie) => !le.has(Ie.id))), n.value.total = j.result.total, n.value.hasMore = j.result.hasMore;
      } catch (j) {
        Z === R && (d.value = G(j));
      } finally {
        Z === R && (o.value = !1);
      }
    }
    function bt() {
      const Z = w.value;
      Z && ce(Z.request, Z.actionId);
    }
    return at(() => {
      P = a.bridge.subscribe((Z) => {
        if (Z.type === "game/state") {
          const j = Z.payload.state;
          r.value || (R += 1), p.value = "", w.value = null, F(j);
        }
        Z.type === "game/error" && (u.value = "游戏状态暂时无法读取，请重新打开。");
      });
    }), ot(() => {
      R += 1, P(), y.value = null, w.value = null;
    }), (Z, j) => (v(), b("main", yp, [
      s("header", kp, [
        j[19] || (j[19] = s("div", { class: "game-brand" }, [s("h1", null, "游戏")], -1)),
        s("div", wp, [s("span", null, [j[16] || (j[16] = s("small", null, "可用", -1)), s("strong", null, "¤ " + g(n.value.balance), 1)]), s("span", null, [j[17] || (j[17] = s("small", null, "托管", -1)), s("strong", null, "¤ " + g(n.value.lockedAmount), 1)])]),
        s("button", {
          type: "button",
          class: "game-refresh",
          disabled: C.value,
          title: "重新读取游戏",
          onClick: Be
        }, [...j[18] || (j[18] = [s("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [s("path", { d: "M20 7v5h-5M4 17v-5h5M18.2 9A7 7 0 0 0 6.1 6.7L4 9m16 6-2.1 2.3A7 7 0 0 1 5.8 15" })], -1), s("span", { class: "game-sr-only" }, "重新读取游戏", -1)])], 8, Tp)
      ]),
      s("nav", xp, [
        s("button", {
          type: "button",
          class: ae({ "is-active": l.value === "lobby" }),
          onClick: j[0] || (j[0] = (le) => W("lobby"))
        }, "大厅", 2),
        n.value.activeGame ? (v(), b("button", {
          key: 0,
          type: "button",
          class: ae({ "is-active": l.value === n.value.activeGame.kind }),
          onClick: j[1] || (j[1] = (le) => l.value = n.value.activeGame?.kind || "lobby")
        }, [...j[20] || (j[20] = [ue(" 当前牌桌", -1), s("i", null, null, -1)])], 2)) : H("", !0),
        s("button", {
          type: "button",
          class: ae({ "is-active": l.value === "records" }),
          onClick: j[2] || (j[2] = (le) => W("records"))
        }, "记录", 2)
      ]),
      n.value.message || u.value ? (v(), b("aside", {
        key: 0,
        class: ae(["game-notice", `is-${n.value.status}`]),
        role: "status"
      }, [j[21] || (j[21] = s("span", { "aria-hidden": "true" }, "!", -1)), s("div", null, [
        s("strong", null, g(n.value.status === "unconfirmed" ? "落账待核实" : n.value.status === "conflict" ? "牌局状态冲突" : "游戏状态"), 1),
        s("p", null, g(u.value || n.value.message), 1),
        L.value ? (v(), b("button", {
          key: 0,
          type: "button",
          disabled: i.value,
          onClick: Le
        }, g(i.value ? "正在核实…" : "核实保存结果"), 9, $p)) : n.value.status === "blocked" ? (v(), b("button", {
          key: 1,
          type: "button",
          disabled: i.value,
          onClick: Be
        }, g(i.value ? "正在读取…" : "重新读取"), 9, Sp)) : H("", !0)
      ])], 2)) : H("", !0),
      p.value && !y.value ? (v(), b("aside", _p, [s("span", null, g(p.value), 1), w.value && n.value.status === "ready" ? (v(), b("button", {
        key: 0,
        type: "button",
        disabled: r.value,
        onClick: bt
      }, "重试同一操作", 8, qp)) : H("", !0)])) : H("", !0),
      s("div", Cp, [T.value && l.value === "lobby" ? (v(), b("div", {
        key: 0,
        class: ae(["game-result-banner", `is-${T.value.outcomeTone}`]),
        role: "status"
      }, [
        s("span", null, g(T.value.gameLabel), 1),
        s("strong", null, g(T.value.outcomeLabel), 1),
        s("em", null, g(T.value.net > 0 ? "+" : "") + g(T.value.net) + " 小白币", 1),
        s("button", {
          type: "button",
          onClick: j[3] || (j[3] = (le) => h.value = "")
        }, "关闭")
      ], 2)) : H("", !0), l.value === "lobby" ? (v(), ge(j1, {
        key: 1,
        "active-game": n.value.activeGame,
        balance: n.value.balance,
        "locked-amount": n.value.lockedAmount,
        "write-disabled-reason": A.value,
        onStart: pe,
        onContinue: j[4] || (j[4] = (le) => l.value = le)
      }, null, 8, [
        "active-game",
        "balance",
        "locked-amount",
        "write-disabled-reason"
      ])) : l.value === "dice" && n.value.activeGame?.kind === "dice" ? (v(), ge(t1, {
        key: 2,
        game: n.value.activeGame,
        "write-disabled-reason": A.value,
        onBid: j[5] || (j[5] = (le) => ce({
          endpoint: "game/dice/bid",
          gameId: n.value.activeGame?.id || "",
          bid: le
        })),
        onChallenge: he,
        onLobby: j[6] || (j[6] = (le) => W("lobby"))
      }, null, 8, ["game", "write-disabled-reason"])) : l.value === "dice" && q.value?.kind === "dice" ? (v(), ge(f1, {
        key: 3,
        record: q.value.record,
        detail: q.value.detail,
        onDone: j[7] || (j[7] = (le) => W("lobby"))
      }, null, 8, ["record", "detail"])) : l.value === "push" && M.value ? (v(), ge(np, {
        key: 4,
        game: M.value,
        "write-disabled-reason": A.value,
        ending: q.value?.kind === "push" ? q.value.record : null,
        onDraw: j[8] || (j[8] = (le) => ce({
          endpoint: "game/push/draw",
          gameId: n.value.activeGame?.id || ""
        })),
        onCashOut: j[9] || (j[9] = (le) => _e("push")),
        onLobby: j[10] || (j[10] = (le) => W("lobby")),
        onFinished: j[11] || (j[11] = (le) => W("lobby"))
      }, null, 8, [
        "game",
        "write-disabled-reason",
        "ending"
      ])) : l.value === "ladder" && $.value ? (v(), ge(q1, {
        key: 5,
        game: $.value,
        "write-disabled-reason": A.value,
        ending: q.value?.kind === "ladder" ? q.value.record : null,
        onStep: j[12] || (j[12] = (le) => ce({
          endpoint: "game/ladder/step",
          gameId: n.value.activeGame?.id || "",
          choice: le
        })),
        onCashOut: j[13] || (j[13] = (le) => _e("ladder")),
        onLobby: j[14] || (j[14] = (le) => W("lobby")),
        onFinished: j[15] || (j[15] = (le) => W("lobby"))
      }, null, 8, [
        "game",
        "write-disabled-reason",
        "ending"
      ])) : l.value === "records" ? (v(), ge(hp, {
        key: 6,
        records: n.value.records,
        total: n.value.total,
        "has-more": n.value.hasMore,
        "loading-more": o.value,
        error: d.value,
        onLoadMore: Mt
      }, null, 8, [
        "records",
        "total",
        "has-more",
        "loading-more",
        "error"
      ])) : H("", !0)]),
      y.value ? (v(), ge(Sv, {
        key: 2,
        heading: y.value.heading,
        summary: y.value.summary,
        "confirm-label": y.value.confirmLabel,
        danger: y.value.danger,
        onCancel: nt,
        onConfirm: Ee
      }, null, 8, [
        "heading",
        "summary",
        "confirm-label",
        "danger"
      ])) : H("", !0)
    ]));
  }
}), Ap = Mp, Ip = Object.freeze({
  id: "map",
  name: "地图",
  accent: "#3aa9ff"
}), Ep = { class: "map-viewport" }, Pp = ["viewBox", "aria-label"], Op = {
  class: "map-viewport-controls",
  "aria-label": "地图缩放控制"
}, Rp = /* @__PURE__ */ se({
  __name: "MapViewport",
  props: {
    viewBox: {},
    resetKey: { default: "" },
    label: {}
  },
  setup(e) {
    const t = e, a = /* @__PURE__ */ K(null), n = /* @__PURE__ */ K([...t.viewBox]);
    let l = null, i = [0, 0], r = [0, 0], o = null, u = !1, p = !1, d = null;
    const y = V(() => n.value.join(" "));
    function w() {
      const [T, M, $, _] = t.viewBox;
      n.value = [
        T,
        M,
        Math.max(1, $),
        Math.max(1, _)
      ];
    }
    function h() {
      const T = a.value?.getBoundingClientRect();
      return !T?.width || !T.height ? 1 : Math.max(n.value[2] / T.width, n.value[3] / T.height);
    }
    function q(T, M) {
      const $ = a.value?.getBoundingClientRect();
      if (!$?.width || !$.height) return [n.value[0] + n.value[2] / 2, n.value[1] + n.value[3] / 2];
      const _ = h(), S = n.value[2] / _, G = n.value[3] / _, te = ($.width - S) / 2, X = ($.height - G) / 2;
      return [n.value[0] + (T - $.left - te) * _, n.value[1] + (M - $.top - X) * _];
    }
    function P(T, M) {
      const $ = Math.max(1, t.viewBox[2]), _ = Math.min($ * 5, Math.max($ * 0.24, n.value[2] * T)), S = _ / n.value[2], G = n.value[3] * S, te = M || [n.value[0] + n.value[2] / 2, n.value[1] + n.value[3] / 2], X = (te[0] - n.value[0]) / n.value[2], W = (te[1] - n.value[1]) / n.value[3];
      n.value = [
        te[0] - _ * X,
        te[1] - G * W,
        _,
        G
      ];
    }
    function R(T) {
      P(T.deltaY < 0 ? 0.84 : 1.19, q(T.clientX, T.clientY));
    }
    function D(T) {
      T.button !== 0 || l !== null || (l = T.pointerId, i = [T.clientX, T.clientY], r = [n.value[0], n.value[1]], u = !1, o = T.target instanceof Element ? T.target : a.value, o?.setPointerCapture(T.pointerId));
    }
    function L(T) {
      if (T.pointerId !== l) return;
      const M = T.clientX - i[0], $ = T.clientY - i[1];
      Math.abs(M) + Math.abs($) > 4 && (u = !0);
      const _ = h();
      n.value = [
        r[0] - M * _,
        r[1] - $ * _,
        n.value[2],
        n.value[3]
      ];
    }
    function A(T) {
      T.pointerId === l && (o?.hasPointerCapture(T.pointerId) && o.releasePointerCapture(T.pointerId), o = null, l = null, u && (p = !0, d && clearTimeout(d), d = setTimeout(() => {
        p = !1;
      }, 0)));
    }
    function C(T) {
      p && (T.preventDefault(), T.stopPropagation());
    }
    return et(() => [
      t.viewBox[0],
      t.viewBox[1],
      t.viewBox[2],
      t.viewBox[3],
      t.resetKey
    ], w, { immediate: !0 }), ot(() => {
      d && clearTimeout(d);
    }), (T, M) => (v(), b("div", Ep, [(v(), b("svg", {
      ref_key: "svg",
      ref: a,
      class: "map-viewport-svg",
      viewBox: y.value,
      preserveAspectRatio: "xMidYMid meet",
      role: "img",
      "aria-label": e.label,
      onWheel: tt(R, ["prevent"]),
      onPointerdown: D,
      onPointermove: L,
      onPointerup: A,
      onPointercancel: A,
      onClickCapture: C
    }, [_n(T.$slots, "default")], 40, Pp)), s("div", Op, [
      s("button", {
        type: "button",
        title: "放大",
        "aria-label": "放大",
        onClick: M[0] || (M[0] = ($) => P(0.8))
      }, "+"),
      s("button", {
        type: "button",
        title: "缩小",
        "aria-label": "缩小",
        onClick: M[1] || (M[1] = ($) => P(1.25))
      }, "-"),
      s("button", {
        type: "button",
        class: "map-viewport-reset",
        onClick: w
      }, "复位")
    ])]));
  }
}), Mr = Rp, Bp = Object.freeze({
  wall: {
    stroke: "#b7d8f7",
    fill: "rgba(120, 168, 209, .12)",
    width: 3
  },
  road: {
    stroke: "#e0aa63",
    fill: "rgba(199, 139, 65, .18)",
    width: 5
  },
  water: {
    stroke: "#46c7ef",
    fill: "rgba(36, 154, 207, .30)",
    width: 2.4
  },
  terrain: {
    stroke: "#8ebd86",
    fill: "rgba(89, 139, 90, .25)",
    width: 2.2
  },
  furniture: {
    stroke: "#d5a86d",
    fill: "rgba(160, 105, 51, .28)",
    width: 2.1
  },
  decoration: {
    stroke: "#c7a6e8",
    fill: "rgba(141, 98, 184, .22)",
    width: 2
  },
  door: {
    stroke: "#ffbe69",
    fill: "rgba(229, 144, 53, .20)",
    width: 3.2
  },
  danger: {
    stroke: "#ff6d7a",
    fill: "rgba(218, 52, 72, .24)",
    width: 2.6,
    dash: "7 4"
  },
  marker: {
    stroke: "#66d9ff",
    fill: "rgba(48, 166, 222, .22)",
    width: 2.2
  },
  actor: {
    stroke: "#f4f8ff",
    fill: "#167fc3",
    width: 2.2
  },
  label: {
    stroke: "none",
    fill: "#e9f4ff",
    width: 0
  },
  grid: {
    stroke: "#54738d",
    fill: "none",
    width: 1,
    dash: "2 5"
  },
  magic: {
    stroke: "#c18cff",
    fill: "rgba(139, 83, 213, .25)",
    width: 2.5
  },
  secret: {
    stroke: "#8198aa",
    fill: "rgba(74, 96, 113, .20)",
    width: 2,
    dash: "3 6"
  },
  light: {
    stroke: "#ffe49a",
    fill: "rgba(255, 210, 91, .22)",
    width: 1.5
  }
}), ca = Object.freeze({
  wall: "墙体",
  road: "道路",
  water: "水域",
  terrain: "地形",
  furniture: "家具",
  decoration: "陈设",
  door: "出入口",
  danger: "危险",
  marker: "标记",
  actor: "人物",
  label: "标注",
  grid: "网格",
  magic: "魔法",
  secret: "未知",
  light: "光源"
}), Lp = Object.freeze({
  door: "door_open",
  stairs: "stairs",
  elevator: "elevator",
  portal: "captive_portal",
  passage: "conversion_path",
  entrance: "login",
  exit: "exit_to_app",
  north: "north",
  south: "south",
  east: "east",
  west: "west",
  up: "arrow_upward",
  down: "arrow_downward",
  trap: "warning",
  chest: "inventory_2",
  marker: "location_on",
  player: "person_pin_circle",
  actor: "person"
}), Dp = Object.freeze({
  door: "D",
  stairs: "S",
  elevator: "E",
  portal: "O",
  passage: "P",
  entrance: "I",
  exit: "O",
  north: "N",
  south: "S",
  east: "E",
  west: "W",
  up: "↑",
  down: "↓",
  trap: "!",
  chest: "X",
  marker: "+",
  player: "P",
  actor: "A"
}), Np = Object.freeze({
  "door-open": "door_open",
  stairs: "stairs",
  elevator: "elevator",
  portal: "captive_portal",
  passage: "conversion_path",
  entrance: "login",
  exit: "exit_to_app",
  north: "north",
  south: "south",
  east: "east",
  west: "west",
  up: "arrow_upward",
  down: "arrow_downward",
  trap: "warning",
  chest: "inventory_2",
  marker: "location_on",
  player: "person_pin_circle",
  actor: "person",
  chair: "chair",
  table: "table_restaurant",
  bed: "bed",
  counter: "countertops",
  shelf: "shelves",
  tree: "park",
  rock: "landscape",
  building: "apartment",
  fire: "local_fire_department",
  light: "lightbulb",
  water: "water_drop"
}), Up = Object.freeze({
  wall: "architecture",
  road: "route",
  water: "water_drop",
  terrain: "terrain",
  furniture: "chair",
  decoration: "category",
  door: "door_open",
  danger: "warning",
  marker: "location_on",
  actor: "person",
  label: "label",
  grid: "grid_on",
  magic: "auto_awesome",
  secret: "visibility_off",
  light: "lightbulb"
}), Ss = Object.freeze({
  terrain: 10,
  water: 20,
  grid: 25,
  road: 30,
  wall: 40,
  furniture: 50,
  decoration: 52,
  door: 55,
  danger: 60,
  secret: 62,
  magic: 65,
  light: 70,
  marker: 80,
  actor: 85,
  label: 90
}), Ar = Object.freeze({
  unknown: "#52616d",
  wood: "#7c5938",
  stone: "#687988",
  tile: "#637783",
  carpet: "#76576f",
  "bed-sheet": "#8a7b91",
  fabric: "#85679c",
  tatami: "#7f7a4f",
  sand: "#9d8050",
  marble: "#88939d",
  blood: "#792f38",
  water: "#176f9b",
  grass: "#47784e",
  dirt: "#75583d",
  snow: "#b9d5df",
  metal: "#788c9e",
  rune: "#744ab5",
  "warm-light": "#bd7a32",
  "cold-light": "#3f83a4",
  shadow: "#17202a"
}), Ir = Object.freeze({
  neutral: {
    background: "#071019",
    glow: "rgba(59, 157, 219, .13)",
    accent: "#55baff"
  },
  warm: {
    background: "#130e0b",
    glow: "rgba(235, 142, 65, .14)",
    accent: "#f2ad68"
  },
  cold: {
    background: "#07121b",
    glow: "rgba(88, 190, 231, .14)",
    accent: "#73d2f4"
  },
  dark: {
    background: "#05070a",
    glow: "rgba(92, 114, 137, .10)",
    accent: "#8aa6bd"
  },
  mystic: {
    background: "#0d0a17",
    glow: "rgba(156, 94, 231, .16)",
    accent: "#c89aff"
  },
  danger: {
    background: "#16090d",
    glow: "rgba(239, 66, 85, .15)",
    accent: "#ff7180"
  },
  calm: {
    background: "#071411",
    glow: "rgba(61, 189, 158, .13)",
    accent: "#69d8b8"
  }
}), Fp = Object.freeze({
  city: "location_city",
  district: "apartment",
  building: "home_work",
  floor: "stairs",
  room: "meeting_room",
  outdoor: "park"
}), Zl = Object.freeze({
  city: "城市",
  district: "区域",
  building: "建筑",
  floor: "楼层",
  room: "房间",
  outdoor: "户外"
}), Hp = Object.freeze({
  door: "门",
  stairs: "楼梯",
  elevator: "电梯",
  path: "小径",
  road: "道路",
  portal: "传送门",
  passage: "通道"
}), jp = /* @__PURE__ */ new Set([
  "water",
  "terrain",
  "furniture",
  "decoration",
  "danger",
  "magic",
  "secret",
  "light"
]);
function Wt(e, t) {
  return e < t ? -1 : e > t ? 1 : 0;
}
function Ce(e) {
  return Number(e.toFixed(3)).toString();
}
function Er(e) {
  const t = e.geometry;
  return Array.isArray(t.points) ? t.points : [];
}
function Pr(e) {
  return e.shape === "rect" || e.shape === "circle" ? !0 : Er(e).length >= 3 && (e.closed === !0 || jp.has(e.category));
}
function Kp(e) {
  const t = Er(e);
  if (t.length < 2) return "";
  const a = Pr(e) ? " Z" : "";
  if (e.shape === "path") return `M ${t.map(([l, i]) => `${Ce(l)} ${Ce(i)}`).join(" L ")}${a}`;
  const n = [`M ${Ce(t[0][0])} ${Ce(t[0][1])}`];
  for (let l = 0; l < t.length - 1; l += 1) {
    const i = t[l - 1] || t[l], r = t[l], o = t[l + 1], u = t[l + 2] || o, p = r[0] + (o[0] - i[0]) / 6, d = r[1] + (o[1] - i[1]) / 6, y = o[0] - (u[0] - r[0]) / 6, w = o[1] - (u[1] - r[1]) / 6;
    n.push(`C ${Ce(p)} ${Ce(d)}, ${Ce(y)} ${Ce(w)}, ${Ce(o[0])} ${Ce(o[1])}`);
  }
  return n.join(" ") + a;
}
function Wl(e) {
  const t = e.geometry;
  if (typeof t.x == "number" && typeof t.y == "number")
    return e.shape === "rect" ? [t.x + (t.width || 0) / 2, t.y + (t.height || 0) / 2] : e.shape === "circle" ? [t.x, t.y - (t.radius || 0) - 8] : [t.x, t.y + (e.shape === "icon" ? 18 : 0)];
  const a = t.points || [];
  if (!a.length) return [0, 0];
  const [n, l] = a.reduce((i, r) => [i[0] + r[0], i[1] + r[1]], [0, 0]);
  return [n / a.length, l / a.length];
}
function je(e, t) {
  const a = Bp[e.category], n = Pr(e), l = n && e.material ? `url(#${t}-material-${e.material})` : "", i = e.certainty === "inferred" ? "8 6" : e.certainty === "unknown" ? "3 7" : a.dash;
  return {
    ...a,
    fill: n ? l || a.fill || Ar[e.material] : "none",
    opacity: e.certainty === "unknown" ? 0.48 : e.certainty === "inferred" ? 0.72 : 1,
    dash: i,
    icon: e.icon ? Np[e.icon] : e.kind ? Lp[e.kind] : Up[e.category],
    fallback: e.kind ? Dp[e.kind] : ca[e.category].slice(0, 1),
    z: Ss[e.category]
  };
}
function Gp(e) {
  return [...e].sort((t, a) => Ss[t.category] - Ss[a.category] || Wt(t.id, a.id));
}
var gn = 156, zp = 66, Yl = 34, Vp = 70;
function os(e) {
  return [...e].sort((t, a) => Wt(t.parent || "", a.parent || "") || Wt(t.name, a.name) || Wt(t.key, a.key));
}
function Zp(e) {
  const t = /* @__PURE__ */ new Set();
  return e.forEach((a) => {
    const n = [], l = /* @__PURE__ */ new Map();
    let i = a;
    for (; i?.parent; ) {
      const r = l.get(i.key);
      if (r !== void 0) {
        n.slice(r).forEach((o) => t.add(o));
        break;
      }
      l.set(i.key, n.length), n.push(i.key), i = e.get(i.parent);
    }
  }), t;
}
function Wp(e) {
  return [
    Math.min(...e.map((t) => t[0])),
    Math.min(...e.map((t) => t[1])),
    Math.max(...e.map((t) => t[0])),
    Math.max(...e.map((t) => t[1]))
  ];
}
function Yp(e, t, a, n) {
  const l = [t.x + t.width / 2, t.y + t.height / 2], i = [a.x + a.width / 2, a.y + a.height / 2], r = i[0] - l[0], o = i[1] - l[1], u = Math.abs(r) >= Math.abs(o), p = u ? [r >= 0 ? t.x + t.width : t.x, l[1]] : [l[0], o >= 0 ? t.y + t.height : t.y], d = u ? [r >= 0 ? a.x : a.x + a.width, i[1]] : [i[0], o >= 0 ? a.y : a.y + a.height], y = (p[0] + d[0]) / 2, w = (p[1] + d[1]) / 2 + n, h = u ? [[y, p[1] + n], [y, d[1] + n]] : [[p[0] + n, w], [d[0] + n, w]];
  return {
    id: e.id,
    from: e.from,
    to: e.to,
    path: `M ${Ce(p[0])} ${Ce(p[1])} C ${Ce(h[0][0])} ${Ce(h[0][1])}, ${Ce(h[1][0])} ${Ce(h[1][1])}, ${Ce(d[0])} ${Ce(d[1])}`,
    labelX: y,
    labelY: w - 7,
    bounds: Wp([
      p,
      d,
      h[0],
      h[1],
      [y, w - 7]
    ])
  };
}
function Qp(e) {
  const t = os(e.locations), a = new Map(t.map((C) => [C.key, C])), n = Zp(a), l = /* @__PURE__ */ new Map(), i = [];
  t.forEach((C) => {
    const T = C.parent || "";
    if (T && a.has(T) && !n.has(T) && !n.has(C.key)) {
      const M = l.get(T) || [];
      M.push(C), l.set(T, M);
    } else i.push(C);
  }), l.forEach((C, T) => l.set(T, os(C)));
  const r = /* @__PURE__ */ new Map(), o = (C) => {
    const T = r.get(C.key);
    if (T !== void 0) return T;
    const M = l.get(C.key) || [], $ = M.length ? Math.max(gn, M.reduce((_, S, G) => _ + o(S) + (G ? Yl : 0), 0)) : gn;
    return r.set(C.key, $), $;
  }, u = [], p = (C, T, M) => {
    const $ = o(C);
    u.push({
      key: C.key,
      x: T + ($ - gn) / 2,
      y: M * 158,
      width: gn,
      height: zp,
      depth: M
    });
    let _ = T;
    (l.get(C.key) || []).forEach((S) => {
      p(S, _, M + 1), _ += o(S) + Yl;
    });
  };
  let d = 0;
  os(i).forEach((C) => {
    p(C, d, 0), d += o(C) + Vp;
  });
  const y = new Map(u.map((C) => [C.key, C])), w = t.flatMap((C) => {
    const T = y.get(C.key), M = C.parent ? y.get(C.parent) : void 0;
    if (!T || !M) return [];
    const $ = M.x + M.width / 2, _ = M.y + M.height, S = T.x + T.width / 2, G = T.y, te = (_ + G) / 2;
    return [{
      id: `${M.key}:${T.key}`,
      path: `M ${Ce($)} ${Ce(_)} C ${Ce($)} ${Ce(te)}, ${Ce(S)} ${Ce(te)}, ${Ce(S)} ${Ce(G)}`
    }];
  }), h = /* @__PURE__ */ new Map(), q = [...e.links].sort((C, T) => Wt(C.id, T.id)).flatMap((C) => {
    const T = y.get(C.from), M = y.get(C.to);
    if (!T || !M) return [];
    const $ = [C.from, C.to].sort(Wt).join(":"), _ = h.get($) || 0;
    return h.set($, _ + 1), [Yp(C, T, M, _ === 0 ? 0 : (_ % 2 ? 1 : -1) * Math.ceil(_ / 2) * 24)];
  });
  if (!u.length) return {
    nodes: u,
    hierarchy: w,
    routes: q,
    viewBox: [
      0,
      0,
      640,
      420
    ]
  };
  const P = q.flatMap((C) => [C.bounds]), R = Math.min(...u.map((C) => C.x), ...P.map((C) => C[0])) - 60, D = Math.min(...u.map((C) => C.y), ...P.map((C) => C[1])) - 60, L = Math.max(...u.map((C) => C.x + C.width), ...P.map((C) => C[2])) + 60, A = Math.max(...u.map((C) => C.y + C.height), ...P.map((C) => C[3])) + 60;
  return {
    nodes: u,
    hierarchy: w,
    routes: q,
    viewBox: [
      R,
      D,
      Math.max(420, L - R),
      Math.max(300, A - D)
    ]
  };
}
function Xp(e, t) {
  return e.filter((a) => a.locationKey === t).sort((a, n) => Wt(a.displayName, n.displayName) || Wt(a.actorKey, n.actorKey));
}
var Jp = [
  "x",
  "y",
  "width",
  "height"
], em = [
  "x",
  "y",
  "width",
  "height"
], tm = {
  class: "map-atlas-hierarchy",
  "aria-hidden": "true"
}, am = ["d"], nm = { class: "map-atlas-routes" }, sm = ["d", "marker-start"], lm = ["x", "y"], im = [
  "role",
  "tabindex",
  "aria-label",
  "onClick",
  "onKeydown"
], rm = [
  "x",
  "y",
  "width",
  "height"
], om = ["d"], um = ["cx", "cy"], dm = ["x", "y"], cm = ["x", "y"], fm = ["x", "y"], vm = ["x", "y"], pm = {
  key: 2,
  class: "map-atlas-actors"
}, mm = ["transform"], gm = {
  key: 0,
  class: "map-material-symbol"
}, bm = {
  key: 1,
  class: "map-symbol-fallback"
}, hm = ["x", "y"], ym = ["transform"], km = /* @__PURE__ */ se({
  __name: "MapAtlas",
  props: {
    atlas: {},
    revision: {},
    currentLocationKey: {},
    selectedLocationKey: {},
    symbolsReady: { type: Boolean }
  },
  emits: ["viewScene"],
  setup(e, { emit: t }) {
    const a = e, n = t, l = V(() => Qp(a.atlas)), i = V(() => new Map(a.atlas.locations.map((w) => [w.key, w]))), r = V(() => new Map(a.atlas.links.map((w) => [w.id, w])));
    function o(w) {
      return i.value.get(w.key);
    }
    function u(w) {
      return r.value.get(w);
    }
    function p(w) {
      return Xp(a.atlas.actors, w);
    }
    function d(w) {
      w.sceneKey && n("viewScene", w.key);
    }
    function y(w, h) {
      !h.sceneKey || w.key !== "Enter" && w.key !== " " || (w.preventDefault(), d(h));
    }
    return (w, h) => (v(), ge(Mr, {
      class: "map-atlas-viewport",
      "view-box": l.value.viewBox,
      "reset-key": String(e.revision),
      label: "世界地点关系图"
    }, {
      default: ia(() => [
        h[2] || (h[2] = s("defs", null, [
          s("pattern", {
            id: "map-atlas-grid",
            width: "28",
            height: "28",
            patternUnits: "userSpaceOnUse"
          }, [s("path", {
            d: "M28 0H0V28",
            fill: "none",
            stroke: "rgba(92, 176, 228, .08)",
            "stroke-width": "1"
          })]),
          s("marker", {
            id: "map-atlas-arrow",
            viewBox: "0 0 10 10",
            refX: "8",
            refY: "5",
            markerWidth: "7",
            markerHeight: "7",
            orient: "auto-start-reverse"
          }, [s("path", {
            d: "M1 1l8 4-8 4z",
            fill: "#58bce9"
          })]),
          s("filter", {
            id: "map-atlas-current-glow",
            x: "-80%",
            y: "-80%",
            width: "260%",
            height: "260%"
          }, [s("feGaussianBlur", {
            stdDeviation: "3",
            result: "blur"
          }), s("feMerge", null, [s("feMergeNode", { in: "blur" }), s("feMergeNode", { in: "SourceGraphic" })])])
        ], -1)),
        s("rect", {
          x: l.value.viewBox[0],
          y: l.value.viewBox[1],
          width: l.value.viewBox[2],
          height: l.value.viewBox[3],
          class: "map-atlas-background"
        }, null, 8, Jp),
        s("rect", {
          x: l.value.viewBox[0],
          y: l.value.viewBox[1],
          width: l.value.viewBox[2],
          height: l.value.viewBox[3],
          fill: "url(#map-atlas-grid)"
        }, null, 8, em),
        s("g", tm, [(v(!0), b(J, null, de(l.value.hierarchy, (q) => (v(), b("path", {
          key: q.id,
          d: q.path,
          "vector-effect": "non-scaling-stroke"
        }, null, 8, am))), 128))]),
        s("g", nm, [(v(!0), b(J, null, de(l.value.routes, (q) => (v(), b("g", { key: q.id }, [s("path", {
          d: q.path,
          "marker-start": u(q.id).bidirectional ? "url(#map-atlas-arrow)" : void 0,
          "marker-end": "url(#map-atlas-arrow)",
          "vector-effect": "non-scaling-stroke"
        }, null, 8, sm), s("text", {
          x: q.labelX,
          y: q.labelY
        }, g(u(q.id).label || me(Hp)[u(q.id).kind]), 9, lm)]))), 128))]),
        (v(!0), b(J, null, de(l.value.nodes, (q) => (v(), b("g", {
          key: q.key,
          class: ae(["map-atlas-node", {
            "is-current": q.key === e.currentLocationKey,
            "is-selected": q.key === e.selectedLocationKey,
            "is-visited": o(q).status === "visited",
            "is-clickable": !!o(q).sceneKey
          }]),
          role: o(q).sceneKey ? "button" : void 0,
          tabindex: o(q).sceneKey ? 0 : void 0,
          "aria-label": o(q).sceneKey ? `查看 ${o(q).name} 场景` : o(q).name,
          onClick: tt((P) => d(o(q)), ["stop"]),
          onKeydown: (P) => y(P, o(q))
        }, [
          s("rect", {
            x: q.x,
            y: q.y,
            width: q.width,
            height: q.height,
            rx: "9"
          }, null, 8, rm),
          s("path", {
            class: "map-atlas-node-cut",
            d: `M ${q.x + q.width - 24} ${q.y} L ${q.x + q.width} ${q.y + 24}`
          }, null, 8, om),
          s("circle", {
            cx: q.x + 24,
            cy: q.y + 24,
            r: "13",
            class: "map-atlas-node-icon-ring"
          }, null, 8, um),
          e.symbolsReady ? (v(), b("text", {
            key: 0,
            x: q.x + 24,
            y: q.y + 24,
            class: "map-material-symbol"
          }, g(me(Fp)[o(q).scale]), 9, dm)) : (v(), b("text", {
            key: 1,
            x: q.x + 24,
            y: q.y + 24,
            class: "map-symbol-fallback"
          }, g(me(Zl)[o(q).scale].slice(0, 1)), 9, cm)),
          s("text", {
            x: q.x + 45,
            y: q.y + 23,
            class: "map-atlas-node-name"
          }, g(o(q).name), 9, fm),
          s("text", {
            x: q.x + 45,
            y: q.y + 42,
            class: "map-atlas-node-meta"
          }, g(me(Zl)[o(q).scale]) + " · " + g(o(q).status === "visited" ? "已到访" : "仅提及"), 9, vm),
          p(q.key).length ? (v(), b("g", pm, [(v(!0), b(J, null, de(p(q.key).slice(0, 4), (P, R) => (v(), b("g", {
            key: P.actorKey,
            transform: `translate(${q.x + 19 + R * 18} ${q.y + q.height - 2})`,
            class: ae({ "is-player": P.actorKey === "player" })
          }, [
            h[0] || (h[0] = s("circle", { r: "7" }, null, -1)),
            e.symbolsReady ? (v(), b("text", gm, g(P.actorKey === "player" ? "person_pin_circle" : "person"), 1)) : (v(), b("text", bm, g(P.actorKey === "player" ? "P" : "N"), 1)),
            s("title", null, g(P.displayName), 1)
          ], 10, mm))), 128)), p(q.key).length > 4 ? (v(), b("text", {
            key: 0,
            x: q.x + 88,
            y: q.y + q.height + 2,
            class: "map-atlas-actor-overflow"
          }, " +" + g(p(q.key).length - 4), 9, hm)) : H("", !0)])) : H("", !0),
          q.key === e.currentLocationKey ? (v(), b("g", {
            key: 3,
            class: "map-atlas-current-pin",
            transform: `translate(${q.x + q.width - 13} ${q.y + 13})`
          }, [...h[1] || (h[1] = [s("circle", { r: "7" }, null, -1), s("path", { d: "M-3 0l2 2 4-5" }, null, -1)])], 8, ym)) : H("", !0),
          s("title", null, g(o(q).brief || o(q).name), 1)
        ], 42, im))), 128))
      ]),
      _: 1
    }, 8, ["view-box", "reset-key"]));
  }
}), wm = km, R5 = Object.freeze([
  "wall",
  "road",
  "water",
  "terrain",
  "furniture",
  "decoration",
  "door",
  "danger",
  "marker",
  "actor",
  "label",
  "grid",
  "magic",
  "secret",
  "light"
]), B5 = Object.freeze([
  "rect",
  "circle",
  "path",
  "curve",
  "icon",
  "label"
]), L5 = Object.freeze([
  "door",
  "stairs",
  "elevator",
  "portal",
  "passage",
  "entrance",
  "exit",
  "north",
  "south",
  "east",
  "west",
  "up",
  "down",
  "trap",
  "chest",
  "marker",
  "player",
  "actor"
]), Tm = Object.freeze([
  "unknown",
  "wood",
  "stone",
  "tile",
  "carpet",
  "bed-sheet",
  "fabric",
  "tatami",
  "sand",
  "marble",
  "blood",
  "water",
  "grass",
  "dirt",
  "snow",
  "metal",
  "rune",
  "warm-light",
  "cold-light",
  "shadow"
]), D5 = Object.freeze([
  "confirmed",
  "inferred",
  "unknown"
]), N5 = Object.freeze([
  "door-open",
  "stairs",
  "elevator",
  "portal",
  "passage",
  "entrance",
  "exit",
  "north",
  "south",
  "east",
  "west",
  "up",
  "down",
  "trap",
  "chest",
  "marker",
  "player",
  "actor",
  "chair",
  "table",
  "bed",
  "counter",
  "shelf",
  "tree",
  "rock",
  "building",
  "fire",
  "light",
  "water"
]), U5 = Object.freeze(/* @__PURE__ */ new Set([
  "floor",
  "ground",
  "surface",
  "base",
  "area",
  "deck",
  "platform",
  "walkway",
  "clearing",
  "yard"
])), xm = ["id"], $m = ["fill"], Sm = {
  key: 0,
  d: "M0 6H24M0 18H24M7 0V6M17 6V18M10 18V24"
}, _m = {
  key: 1,
  d: "M0 8L7 3l8 3 9-4M2 19l8-5 10 4 4-3"
}, qm = {
  key: 2,
  d: "M0 8H24M0 16H24M8 0v24m8-24v24"
}, Cm = {
  key: 3,
  d: "M-4 6q6-5 12 0t12 0t12 0M-4 17q6-5 12 0t12 0t12 0"
}, Mm = {
  key: 4,
  d: "M4 20l2-7 2 7M13 13l2-8 2 8M19 23l2-6 2 6"
}, Am = {
  key: 5,
  d: "M3 5h2m8 3h3m3 10h2M7 19h3"
}, Im = {
  key: 6,
  cx: "6",
  cy: "7",
  r: "1.1"
}, Em = {
  key: 7,
  cx: "18",
  cy: "16",
  r: "1"
}, Pm = {
  key: 8,
  d: "M12 3v18M4 7l16 10M20 7L4 17"
}, Om = {
  key: 9,
  d: "M0 4h24M0 20h24"
}, Rm = {
  key: 10,
  cx: "5",
  cy: "12",
  r: "1.2"
}, Bm = {
  key: 11,
  cx: "19",
  cy: "12",
  r: "1.2"
}, Lm = {
  key: 12,
  d: "M0 4q6 4 12 0t12 0M0 16q6 4 12 0t12 0"
}, Dm = {
  key: 13,
  d: "M0 6l7 5 5-8 5 13 7-5M0 22l8-5 6 4 10-8"
}, Nm = {
  key: 14,
  d: "M12 2l4 7 6 3-6 4-4 6-4-6-6-4 6-3zM8 9l8 7m0-7l-8 7"
}, Um = {
  key: 15,
  d: "M12 2v20M2 12h20M5 5l14 14M19 5L5 19"
}, Fm = [
  "x",
  "y",
  "width",
  "height"
], Hm = [
  "x",
  "y",
  "width",
  "height"
], jm = [
  "cx",
  "cy",
  "rx",
  "ry"
], Km = ["opacity"], Gm = [
  "x",
  "y",
  "width",
  "height",
  "fill",
  "stroke",
  "stroke-width",
  "stroke-dasharray"
], zm = [
  "cx",
  "cy",
  "r",
  "fill",
  "stroke",
  "stroke-width",
  "stroke-dasharray"
], Vm = [
  "d",
  "fill",
  "stroke",
  "stroke-width",
  "stroke-dasharray"
], Zm = ["transform"], Wm = ["stroke"], Ym = {
  key: 0,
  class: "map-material-symbol",
  "aria-hidden": "true"
}, Qm = {
  key: 1,
  class: "map-symbol-fallback",
  "aria-hidden": "true"
}, Xm = ["x", "y"], Jm = ["x", "y"], eg = /* @__PURE__ */ se({
  __name: "MapScene",
  props: {
    scene: {},
    symbolsReady: { type: Boolean }
  },
  setup(e) {
    let t = 0;
    const a = e, n = `xiaobai-map-scene-${t += 1}`, l = Tm, i = V(() => Gp(a.scene.elements)), r = V(() => Ir[a.scene.mood || "neutral"]), o = V(() => ({
      "--map-canvas-bg": r.value.background,
      "--map-canvas-glow": r.value.glow,
      "--map-canvas-accent": r.value.accent
    }));
    function u(y) {
      return y.geometry;
    }
    function p(y) {
      return y.geometry;
    }
    function d(y) {
      return y.geometry;
    }
    return (y, w) => (v(), ge(Mr, {
      class: "map-scene-viewport",
      style: qt(o.value),
      "view-box": e.scene.viewBox,
      "reset-key": e.scene.key,
      label: `${e.scene.name} 场景地图`
    }, {
      default: ia(() => [
        s("defs", null, [
          w[0] || (w[0] = s("pattern", {
            id: "map-scene-minor-grid",
            width: "20",
            height: "20",
            patternUnits: "userSpaceOnUse"
          }, [s("path", {
            d: "M20 0H0V20",
            fill: "none",
            stroke: "rgba(102, 181, 231, .08)",
            "stroke-width": "1"
          })], -1)),
          w[1] || (w[1] = s("pattern", {
            id: "map-scene-major-grid",
            width: "100",
            height: "100",
            patternUnits: "userSpaceOnUse"
          }, [s("rect", {
            width: "100",
            height: "100",
            fill: "url(#map-scene-minor-grid)"
          }), s("path", {
            d: "M100 0H0V100",
            fill: "none",
            stroke: "rgba(102, 181, 231, .15)",
            "stroke-width": "1.4"
          })], -1)),
          (v(!0), b(J, null, de(me(l), (h) => (v(), b("pattern", {
            id: `${n}-material-${h}`,
            key: h,
            width: "24",
            height: "24",
            patternUnits: "userSpaceOnUse",
            class: ae(`map-material-pattern is-${h}`)
          }, [
            s("rect", {
              width: "24",
              height: "24",
              fill: me(Ar)[h]
            }, null, 8, $m),
            h === "wood" ? (v(), b("path", Sm)) : h === "stone" ? (v(), b("path", _m)) : h === "tile" || h === "marble" ? (v(), b("path", qm)) : h === "water" ? (v(), b("path", Cm)) : h === "grass" ? (v(), b("path", Mm)) : h === "dirt" ? (v(), b("path", Am)) : h === "sand" ? (v(), b("circle", Im)) : H("", !0),
            h === "sand" ? (v(), b("circle", Em)) : h === "snow" ? (v(), b("path", Pm)) : h === "metal" ? (v(), b("path", Om)) : H("", !0),
            h === "metal" ? (v(), b("circle", Rm)) : H("", !0),
            h === "metal" ? (v(), b("circle", Bm)) : h === "fabric" || h === "carpet" || h === "bed-sheet" || h === "tatami" ? (v(), b("path", Lm)) : h === "blood" ? (v(), b("path", Dm)) : h === "rune" ? (v(), b("path", Nm)) : h === "warm-light" || h === "cold-light" || h === "shadow" ? (v(), b("path", Um)) : H("", !0)
          ], 10, xm))), 128)),
          w[2] || (w[2] = s("filter", {
            id: "map-scene-icon-glow",
            x: "-80%",
            y: "-80%",
            width: "260%",
            height: "260%"
          }, [s("feGaussianBlur", {
            stdDeviation: "2.5",
            result: "blur"
          }), s("feMerge", null, [s("feMergeNode", { in: "blur" }), s("feMergeNode", { in: "SourceGraphic" })])], -1))
        ]),
        s("rect", {
          x: e.scene.viewBox[0],
          y: e.scene.viewBox[1],
          width: e.scene.viewBox[2],
          height: e.scene.viewBox[3],
          fill: "var(--map-canvas-bg)"
        }, null, 8, Fm),
        s("rect", {
          x: e.scene.viewBox[0],
          y: e.scene.viewBox[1],
          width: e.scene.viewBox[2],
          height: e.scene.viewBox[3],
          fill: "url(#map-scene-major-grid)"
        }, null, 8, Hm),
        s("ellipse", {
          cx: e.scene.viewBox[0] + e.scene.viewBox[2] / 2,
          cy: e.scene.viewBox[1] + e.scene.viewBox[3] / 2,
          rx: e.scene.viewBox[2] * 0.42,
          ry: e.scene.viewBox[3] * 0.42,
          fill: "var(--map-canvas-glow)"
        }, null, 8, jm),
        (v(!0), b(J, null, de(i.value, (h) => (v(), b("g", {
          key: h.id,
          class: ae(["map-scene-element", [`is-${h.category}`, `is-${h.certainty || "confirmed"}`]]),
          opacity: me(je)(h, n).opacity
        }, [h.shape === "rect" ? (v(), b("rect", {
          key: 0,
          x: u(h).x,
          y: u(h).y,
          width: u(h).width,
          height: u(h).height,
          fill: me(je)(h, n).fill,
          stroke: me(je)(h, n).stroke,
          "stroke-width": me(je)(h, n).width,
          "stroke-dasharray": me(je)(h, n).dash,
          "vector-effect": "non-scaling-stroke"
        }, null, 8, Gm)) : h.shape === "circle" ? (v(), b("circle", {
          key: 1,
          cx: p(h).x,
          cy: p(h).y,
          r: p(h).radius,
          fill: me(je)(h, n).fill,
          stroke: me(je)(h, n).stroke,
          "stroke-width": me(je)(h, n).width,
          "stroke-dasharray": me(je)(h, n).dash,
          "vector-effect": "non-scaling-stroke"
        }, null, 8, zm)) : h.shape === "path" || h.shape === "curve" ? (v(), b("path", {
          key: 2,
          d: me(Kp)(h),
          fill: me(je)(h, n).fill,
          stroke: me(je)(h, n).stroke,
          "stroke-width": me(je)(h, n).width,
          "stroke-dasharray": me(je)(h, n).dash,
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "fill-rule": "evenodd",
          "vector-effect": "non-scaling-stroke"
        }, null, 8, Vm)) : h.shape === "icon" ? (v(), b("g", {
          key: 3,
          class: "map-scene-icon",
          transform: `translate(${d(h).x} ${d(h).y})`
        }, [s("circle", {
          r: "11",
          stroke: me(je)(h, n).stroke
        }, null, 8, Wm), e.symbolsReady ? (v(), b("text", Ym, g(me(je)(h, n).icon), 1)) : (v(), b("text", Qm, g(me(je)(h, n).fallback), 1))], 8, Zm)) : h.shape === "label" ? (v(), b("text", {
          key: 4,
          class: "map-scene-label is-primary",
          x: d(h).x,
          y: d(h).y
        }, g(h.label || ""), 9, Xm)) : H("", !0), h.label && h.shape !== "label" ? (v(), b("text", {
          key: 5,
          class: "map-scene-label",
          x: me(Wl)(h)[0],
          y: me(Wl)(h)[1]
        }, g(h.label), 9, Jm)) : H("", !0)], 10, Km))), 128))
      ]),
      _: 1
    }, 8, [
      "style",
      "view-box",
      "reset-key",
      "label"
    ]));
  }
}), tg = eg, ag = {
  class: "map-settings",
  "aria-labelledby": "map-settings-title"
}, ng = { class: "map-settings-body" }, sg = { class: "map-settings-card" }, lg = { class: "map-setting-row" }, ig = [
  "aria-checked",
  "aria-label",
  "disabled"
], rg = { class: "map-settings-card" }, og = ["disabled", "title"], ug = { class: "map-settings-card is-danger-zone" }, dg = { class: "map-settings-action-copy" }, cg = ["disabled", "title"], fg = {
  key: 0,
  class: "map-disabled-reason",
  role: "status"
}, vg = {
  key: 1,
  class: "map-maintenance-message",
  role: "status"
}, pg = /* @__PURE__ */ se({
  __name: "MapSettings",
  props: {
    autoMaintenance: { type: Boolean },
    busy: { type: Boolean },
    autoToggleBusy: { type: Boolean },
    disabledReason: {},
    hasMap: { type: Boolean },
    maintenanceStatus: {},
    maintenanceMessage: {}
  },
  emits: [
    "close",
    "setAutoMaintenance",
    "maintainOnce",
    "requestRebuild"
  ],
  setup(e) {
    return (t, a) => (v(), b("aside", ag, [s("header", null, [a[4] || (a[4] = s("div", null, [s("span", null, "MAP SYSTEM / CONFIG"), s("h2", { id: "map-settings-title" }, "地图设置")], -1)), s("button", {
      type: "button",
      class: "map-icon-button",
      "aria-label": "关闭地图设置",
      onClick: a[0] || (a[0] = (n) => t.$emit("close"))
    }, "×")]), s("div", ng, [
      s("section", sg, [s("div", lg, [a[6] || (a[6] = s("div", null, [s("h3", null, "所有普通聊天自动维护"), s("p", null, "每次发送新的 User 消息后，让地图维护刚被接受的上一轮空间事实。")], -1)), s("button", {
        type: "button",
        class: "map-switch",
        role: "switch",
        "aria-checked": e.autoMaintenance,
        "aria-label": e.autoMaintenance ? "关闭所有普通聊天自动维护" : "开启所有普通聊天自动维护",
        disabled: e.autoToggleBusy,
        onClick: a[1] || (a[1] = (n) => t.$emit("setAutoMaintenance", !e.autoMaintenance))
      }, [...a[5] || (a[5] = [s("span", null, null, -1)])], 8, ig)]), a[7] || (a[7] = s("div", { class: "map-cost-note" }, [s("strong", null, "API 成本说明"), s("p", null, "自动维护和下方两个手动操作都会调用已配置的 AI 模型，消耗 token / API 额度。切换此开关本身只保存设置，不会立即调用 AI。")], -1))]),
      s("section", rg, [a[8] || (a[8] = s("div", { class: "map-settings-action-copy" }, [s("h3", null, "增量维护"), s("p", null, "读取聊天尾部最新完整的 User 与 Assistant 对话，补充地点、路线、人物位置和场景细节。")], -1)), s("button", {
        type: "button",
        class: "map-action-button",
        disabled: e.busy || !!e.disabledReason || !e.hasMap,
        title: e.hasMap ? e.disabledReason : "请先从当前聊天建立地图",
        onClick: a[2] || (a[2] = (n) => t.$emit("maintainOnce"))
      }, g(e.maintenanceStatus === "maintaining" ? "正在维护…" : "维护一次"), 9, og)]),
      s("section", ug, [s("div", dg, [s("h3", null, g(e.hasMap ? "重建地图" : "建立地图"), 1), a[9] || (a[9] = s("p", null, "重新读取当前聊天并生成完整地图。已有地图会在保存成功后被新结果替换。", -1))]), s("button", {
        type: "button",
        class: "map-action-button is-strong",
        disabled: e.busy || !!e.disabledReason,
        title: e.disabledReason,
        onClick: a[3] || (a[3] = (n) => t.$emit("requestRebuild"))
      }, g(e.maintenanceStatus === "rebuilding" ? "正在重建…" : "从当前聊天建立/重建地图"), 9, cg)]),
      e.disabledReason ? (v(), b("p", fg, g(e.disabledReason), 1)) : H("", !0),
      e.maintenanceMessage ? (v(), b("p", vg, g(e.maintenanceMessage), 1)) : H("", !0)
    ])]));
  }
}), mg = pg, gg = { class: "map-app" }, bg = { class: "map-header" }, hg = { class: "map-header-actions" }, yg = ["disabled"], kg = { class: "map-command-bar" }, wg = {
  class: "map-tabs",
  "aria-label": "地图视图"
}, Tg = {
  key: 0,
  class: "map-location-select"
}, xg = ["disabled"], $g = {
  key: 0,
  value: ""
}, Sg = ["value"], _g = {
  key: 1,
  class: "map-atlas-summary",
  "aria-label": "世界地图统计"
}, qg = { class: "map-notice-code" }, Cg = { key: 0 }, Mg = ["disabled"], Ag = ["disabled"], Ig = ["disabled"], Eg = {
  key: 0,
  class: "map-empty-state"
}, Pg = ["disabled"], Og = {
  key: 1,
  class: "map-empty-state"
}, Rg = ["disabled"], Bg = {
  key: 2,
  class: "map-empty-state"
}, Lg = ["disabled"], Dg = { class: "map-canvas-heading" }, Ng = {
  class: "map-legend is-scene",
  "aria-label": "场景地图图例"
}, Ug = {
  key: 0,
  class: "map-location-brief"
}, Fg = {
  key: 0,
  class: "map-empty-state"
}, Hg = ["disabled"], jg = { class: "map-canvas-heading is-atlas" }, Kg = { key: 0 }, Gg = {
  key: 2,
  class: "map-loading-scrim",
  role: "status"
}, zg = {
  class: "map-dialog",
  role: "alertdialog",
  "aria-modal": "true",
  "aria-labelledby": "map-rebuild-title"
}, Vg = { id: "map-rebuild-title" }, Zg = {
  key: 0,
  class: "map-dialog-error",
  role: "alert"
}, Wg = ["disabled"], Yg = ["disabled", "title"], Ql = 35e3, Qg = 18e4, Xg = 24e4, Jg = "Xiaobai Map Symbols", eb = /* @__PURE__ */ se({
  __name: "MapApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    let t = null;
    const a = e;
    function n() {
      if (!t) {
        const I = [
          "..",
          "..",
          "..",
          "libs",
          "material-symbols",
          "material-symbols-rounded.woff2"
        ].join("/"), k = new URL(I, import.meta.url).href;
        t = new FontFace(Jg, `url("${k}")`, {
          display: "block",
          style: "normal",
          weight: "400"
        }).load().catch((O) => {
          throw t = null, O;
        });
      }
      return t;
    }
    function l() {
      return {
        chatIdentity: "",
        map: null,
        writeState: "ready",
        status: "error",
        message: "地图状态未能载入。",
        autoMaintenance: !1,
        maintenanceStatus: "idle",
        maintenanceMessage: ""
      };
    }
    function i(I) {
      return !I || typeof I != "object" ? l() : structuredClone(/* @__PURE__ */ oe(I));
    }
    function r(I) {
      const k = I.map;
      if (!k) return "";
      const O = new Map(k.atlas.locations.map((z) => [z.key, z]));
      let U = O.get(k.atlas.actors.find((z) => z.actorKey === "player")?.locationKey || "");
      const Q = /* @__PURE__ */ new Set();
      for (; U && !Q.has(U.key); ) {
        if (Q.add(U.key), U.sceneKey && k.scenes[U.sceneKey]) return U.key;
        U = U.parent ? O.get(U.parent) : void 0;
      }
      return k.atlas.locations.find((z) => z.sceneKey && k.scenes[z.sceneKey])?.key || "";
    }
    const o = /* @__PURE__ */ K(i(a.initialState)), u = /* @__PURE__ */ K("scene"), p = /* @__PURE__ */ K(r(o.value)), d = /* @__PURE__ */ K(!1), y = /* @__PURE__ */ K(!1), w = /* @__PURE__ */ K(null), h = /* @__PURE__ */ K(""), q = /* @__PURE__ */ K(""), P = /* @__PURE__ */ K(!1);
    let R = () => {
    }, D = 0, L = 0, A = !1;
    const C = V(() => {
      const I = o.value.map;
      return I ? I.atlas.locations.filter((k) => k.sceneKey && I.scenes[k.sceneKey]) : [];
    }), T = V(() => o.value.map?.atlas.actors.find((I) => I.actorKey === "player") || null), M = V(() => o.value.map?.atlas.locations.find((I) => I.key === T.value?.locationKey) || null), $ = V(() => o.value.map?.atlas.locations.find((I) => I.key === p.value) || null), _ = V(() => {
      const I = $.value?.sceneKey;
      return I && o.value.map?.scenes[I] || null;
    }), S = V(() => {
      const I = o.value.map;
      let k = $.value;
      if (!I || !k) return "";
      const O = new Map(I.atlas.locations.map((z) => [z.key, z])), U = [], Q = /* @__PURE__ */ new Set();
      for (; k && !Q.has(k.key); )
        Q.add(k.key), U.unshift(k.name), k = k.parent && O.get(k.parent) || null;
      return U.join(" / ");
    }), G = V(() => o.value.status === "loading" || o.value.status === "saving" || o.value.maintenanceStatus === "maintaining" || o.value.maintenanceStatus === "rebuilding"), te = V(() => w.value !== null || G.value), X = V(() => o.value.status === "unconfirmed" || o.value.writeState === "unconfirmed"), W = V(() => te.value || X.value), F = V(() => w.value ? "正在处理上一项地图操作" : o.value.maintenanceStatus === "maintaining" ? "地图正在维护，请等待本次维护完成" : o.value.maintenanceStatus === "rebuilding" ? "地图正在重建，请等待本次重建完成" : o.value.status === "loading" ? "地图状态正在载入" : o.value.status === "saving" ? "地图正在保存" : X.value ? "请先核实上一次保存结果" : o.value.status === "conflict" ? "地图版本发生冲突，请先采用服务端数据" : o.value.status === "blocked" ? o.value.message || "当前地图不可维护" : o.value.status === "error" ? o.value.message || "地图状态异常，请先重新读取" : o.value.chatIdentity ? "" : "当前聊天不可用"), re = Object.freeze({
      ready: "地图就绪",
      loading: "正在载入",
      saving: "正在保存",
      unconfirmed: "保存待核实",
      conflict: "版本冲突",
      blocked: "暂时不可用",
      error: "状态异常"
    }), ce = V(() => o.value.maintenanceStatus === "maintaining" ? "正在维护地图" : o.value.maintenanceStatus === "rebuilding" ? "正在重建地图" : w.value === "refresh" ? "正在重新读取" : w.value === "settings" ? "正在保存设置" : w.value === "confirm" ? "正在核实保存" : w.value === "adopt" ? "正在采用服务端数据" : w.value === "maintain" ? "正在维护地图" : w.value === "rebuild" ? "正在重建地图" : re[o.value.status]), pe = V(() => !!(h.value || o.value.message || o.value.maintenanceMessage || q.value) || te.value || o.value.status !== "ready" || o.value.maintenanceStatus === "error"), he = V(() => h.value || [
      "error",
      "blocked",
      "conflict"
    ].includes(o.value.status) || o.value.maintenanceStatus === "error" ? "danger" : X.value ? "warning" : te.value ? "busy" : "info"), _e = V(() => X.value ? "保存结果尚未确认" : o.value.status === "conflict" ? "地图版本发生冲突" : o.value.maintenanceStatus === "error" ? "地图维护未完成" : h.value || o.value.status === "error" ? "地图操作未完成" : o.value.status === "blocked" ? "地图暂时不可用" : ce.value), Ee = V(() => h.value || o.value.maintenanceMessage || o.value.message || q.value), nt = V(() => Ir[_.value?.mood || "neutral"]), Be = V(() => ({
      locations: o.value.map?.atlas.locations.length || 0,
      routes: o.value.map?.atlas.links.length || 0,
      actors: o.value.map?.atlas.actors.length || 0
    }));
    function Le(I) {
      return I !== null && typeof I == "object" && !Array.isArray(I);
    }
    function Mt(I) {
      if (!Le(I)) return null;
      const k = I.result, O = Le(k) && Le(k.state) ? k.state : k;
      return Le(O) && typeof O.chatIdentity == "string" && typeof O.status == "string" ? O : null;
    }
    function bt(I, k) {
      const O = I.map;
      if (O) {
        const U = O.atlas.locations.find((Q) => Q.key === k);
        if (U?.sceneKey && O.scenes[U.sceneKey]) return k;
      }
      return r(I);
    }
    function Z(I) {
      const k = structuredClone(I);
      p.value = bt(k, k.chatIdentity === o.value.chatIdentity ? p.value : ""), o.value = k, h.value = "", q.value = "";
    }
    function j(I, k) {
      const O = I instanceof Error ? I.message : String(I);
      return O.includes("聊天已切换") ? "聊天已切换，请重新打开地图。" : O.includes("map_revision_conflict") ? "地图已被另一项操作更新，请重新读取后再试。" : O === "host_request_timeout" ? k === "maintain" || k === "rebuild" ? "等待 AI 处理超时；后台结果仍可能稍后送达，请勿立即重复操作。" : "等待地图服务响应超时，请稍后重试。" : O.includes("已有") && O.includes("维护") ? "已有地图维护正在进行，请等待完成。" : k === "settings" ? "自动维护设置未能保存，请重试。" : k === "refresh" ? "地图状态未能重新读取，请稍后重试。" : k === "confirm" ? "保存结果仍无法确认，请稍后再次核实。" : k === "adopt" ? "暂时无法采用服务端数据，冲突仍保持冻结。" : k === "rebuild" ? "地图建立/重建未完成，请检查模型配置后重试。" : "地图维护未完成，请检查模型配置后重试。";
    }
    async function le(I, k, O = Ql, U = {}) {
      if (w.value) return null;
      const Q = ++D, z = L, ee = o.value.chatIdentity;
      w.value = k, h.value = "", q.value = "";
      try {
        const ne = await a.bridge.request(I, {
          chatIdentity: ee,
          ...U
        }, O);
        if (!A || Q !== D || o.value.chatIdentity !== ee) return null;
        const ve = L !== z, ye = Mt(ne);
        let ke = !1;
        return !ve && ye?.chatIdentity === ee && (Z(ye), ke = !0), {
          response: ne,
          stateApplied: ke,
          newerStateReceived: ve
        };
      } catch (ne) {
        return A && Q === D && (h.value = j(ne, k)), null;
      } finally {
        A && Q === D && (w.value = null);
      }
    }
    async function Ie() {
      W.value || await le("map/refresh", "refresh") && (q.value = "已读取当前聊天的最新地图状态。");
    }
    async function Pe() {
      te.value || await le("map/confirm-save", "confirm") && (q.value = "保存结果已重新核实。");
    }
    async function Y() {
      if (te.value) return;
      const I = await le("map/adopt-server-state", "adopt");
      if (!I) return;
      const k = Le(I.response) ? I.response.result : null;
      q.value = (Le(k) ? k.adoption : "") === "adopted" ? "已采用服务端数据，可以继续维护地图。" : "服务端数据仍无法采用，地图继续保持冻结。";
    }
    function c(I) {
      const k = Le(I.response) ? I.response.result : null;
      return Le(k) && typeof k.message == "string" ? k.message : "地图操作已结束。";
    }
    async function f(I) {
      if (w.value) return;
      const k = await le("map/set-auto-maintenance", "settings", Ql, { enabled: I });
      k && (!k.stateApplied && !k.newerStateReceived && (o.value = {
        ...o.value,
        autoMaintenance: I
      }), q.value = I ? "普通聊天自动维护已开启。" : "普通聊天自动维护已关闭。");
    }
    async function m() {
      if (F.value || !o.value.map) return;
      const I = await le("map/maintain-once", "maintain", Qg);
      I && (q.value = c(I));
    }
    function x() {
      F.value || (y.value = !0);
    }
    async function E() {
      if (F.value) return;
      const I = await le("map/rebuild", "rebuild", Xg);
      I && (y.value = !1, q.value = c(I));
    }
    function N(I) {
      const k = o.value.map?.atlas.locations.find((O) => O.key === I);
      !k?.sceneKey || !o.value.map?.scenes[k.sceneKey] || (p.value = I, u.value = "scene");
    }
    function B(I) {
      return I.key === M.value?.key ? `${I.name}（当前位置）` : I.name;
    }
    return at(() => {
      A = !0, R = a.bridge.subscribe((I) => {
        if (I.type === "map/state") {
          const k = I.payload?.state;
          k && (L += 1, Z(k));
        }
        I.type === "map/error" && (L += 1, q.value = "", h.value = I.payload?.message || "地图服务报告了一个错误，请重新读取。");
      }), typeof FontFace == "function" && document.fonts?.add && n().then((I) => {
        document.fonts.add(I), A && (P.value = !0);
      }).catch(() => {
        P.value = !1;
      });
    }), ot(() => {
      A = !1, D += 1, R(), y.value = !1;
    }), (I, k) => (v(), b("main", gg, [
      s("header", bg, [k[12] || (k[12] = s("div", { class: "map-brand" }, [s("span", {
        class: "map-brand-mark",
        "aria-hidden": "true"
      }, [
        s("i"),
        s("i"),
        s("i")
      ]), s("div", null, [s("small", null, "XIAOBAI CARTOGRAPHY / 01"), s("h1", null, "地图")])], -1)), s("div", hg, [
        s("span", { class: ae(["map-status-chip", `is-${he.value}`]) }, [k[9] || (k[9] = s("i", null, null, -1)), ue(g(ce.value), 1)], 2),
        s("button", {
          type: "button",
          class: "map-icon-button",
          disabled: W.value,
          title: "重新读取地图",
          "aria-label": "重新读取地图",
          onClick: Ie
        }, [...k[10] || (k[10] = [s("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [s("path", { d: "M20 7v5h-5M4 17v-5h5M18.2 9A7 7 0 0 0 6.1 6.7L4 9m16 6-2.1 2.3A7 7 0 0 1 5.8 15" })], -1)])], 8, yg),
        s("button", {
          type: "button",
          class: ae(["map-icon-button", { "is-active": d.value }]),
          title: "地图设置",
          "aria-label": "地图设置",
          onClick: k[0] || (k[0] = (O) => d.value = !d.value)
        }, [...k[11] || (k[11] = [s("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [s("path", { d: "M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM19 13.5l2-1.5-2-1.5-.5-1.3.4-2.5-2.5-.4L15 4l-2 1h-2L9 4 7.6 6.3l-2.5.4.4 2.5L5 10.5 3 12l2 1.5.5 1.3-.4 2.5 2.5.4L9 20l2-1h2l2 1 1.4-2.3 2.5-.4-.4-2.5z" })], -1)])], 2)
      ])]),
      s("div", kg, [s("nav", wg, [s("button", {
        type: "button",
        class: ae({ "is-active": u.value === "scene" }),
        onClick: k[1] || (k[1] = (O) => u.value = "scene")
      }, "场景", 2), s("button", {
        type: "button",
        class: ae({ "is-active": u.value === "atlas" }),
        onClick: k[2] || (k[2] = (O) => u.value = "atlas")
      }, "世界", 2)]), u.value === "scene" ? (v(), b("label", Tg, [k[13] || (k[13] = s("span", null, "观察地点", -1)), Me(s("select", {
        "onUpdate:modelValue": k[3] || (k[3] = (O) => p.value = O),
        disabled: C.value.length === 0
      }, [C.value.length === 0 ? (v(), b("option", $g, "暂无可查看场景")) : H("", !0), (v(!0), b(J, null, de(C.value, (O) => (v(), b("option", {
        key: O.key,
        value: O.key
      }, g(B(O)), 9, Sg))), 128))], 8, xg), [[ad, p.value]])])) : (v(), b("div", _g, [
        s("span", null, g(Be.value.locations) + " 地点", 1),
        k[14] || (k[14] = s("i", null, null, -1)),
        s("span", null, g(Be.value.routes) + " 路线", 1),
        k[15] || (k[15] = s("i", null, null, -1)),
        s("span", null, g(Be.value.actors) + " 人物", 1)
      ]))]),
      pe.value ? (v(), b("aside", {
        key: 0,
        class: ae(["map-notice", `is-${he.value}`]),
        role: "status"
      }, [
        s("span", qg, g(he.value === "danger" ? "!" : he.value === "warning" ? "?" : "i"), 1),
        s("div", null, [s("strong", null, g(_e.value), 1), Ee.value ? (v(), b("p", Cg, g(Ee.value), 1)) : H("", !0)]),
        X.value ? (v(), b("button", {
          key: 0,
          type: "button",
          disabled: te.value,
          onClick: Pe
        }, g(w.value === "confirm" ? "正在核实…" : "确认保存结果"), 9, Mg)) : o.value.status === "conflict" ? (v(), b("button", {
          key: 1,
          type: "button",
          disabled: te.value,
          onClick: Y
        }, g(w.value === "adopt" ? "正在采用…" : "采用服务端数据"), 9, Ag)) : o.value.status === "blocked" || o.value.status === "error" || h.value ? (v(), b("button", {
          key: 2,
          type: "button",
          disabled: W.value,
          onClick: Ie
        }, g(w.value === "refresh" ? "正在读取…" : "重新读取"), 9, Ig)) : H("", !0)
      ], 2)) : H("", !0),
      s("section", { class: ae(["map-workspace", { "has-notice": pe.value }]) }, [u.value === "scene" ? (v(), b(J, { key: 0 }, [o.value.map ? _.value ? _.value.status === "uninitialized" ? (v(), b("div", Bg, [
        k[24] || (k[24] = s("span", {
          class: "map-empty-radar",
          "aria-hidden": "true"
        }, [s("i")], -1)),
        k[25] || (k[25] = s("small", null, "SCENE PENDING", -1)),
        s("h2", null, g(_.value.name) + " 尚未绘制", 1),
        k[26] || (k[26] = s("p", null, "地点已记录，场景几何仍待地图维护补全。", -1)),
        s("button", {
          type: "button",
          disabled: !!F.value,
          onClick: k[5] || (k[5] = (O) => d.value = !0)
        }, "打开维护设置", 8, Lg)
      ])) : (v(), b(J, { key: 3 }, [
        be(tg, {
          scene: _.value,
          "symbols-ready": P.value
        }, null, 8, ["scene", "symbols-ready"]),
        s("div", Dg, [
          s("small", null, g(S.value || _.value.name), 1),
          s("h2", null, g(_.value.name), 1),
          s("span", null, [s("i", { style: qt({ background: nt.value.accent }) }, null, 4), ue(g(_.value.mood || "neutral"), 1)])
        ]),
        s("aside", Ng, [
          k[32] || (k[32] = s("strong", null, "图例", -1)),
          s("span", null, [k[27] || (k[27] = s("i", { class: "is-wall" }, null, -1)), ue(g(me(ca).wall), 1)]),
          s("span", null, [k[28] || (k[28] = s("i", { class: "is-road" }, null, -1)), ue(g(me(ca).road), 1)]),
          s("span", null, [k[29] || (k[29] = s("i", { class: "is-water" }, null, -1)), ue(g(me(ca).water), 1)]),
          s("span", null, [k[30] || (k[30] = s("i", { class: "is-danger" }, null, -1)), ue(g(me(ca).danger), 1)]),
          s("span", null, [k[31] || (k[31] = s("i", { class: "is-actor" }, null, -1)), ue(g(me(ca).actor), 1)]),
          k[33] || (k[33] = s("span", null, [s("i", { class: "is-inferred" }), ue("推断")], -1))
        ]),
        $.value?.brief ? (v(), b("div", Ug, g($.value.brief), 1)) : H("", !0)
      ], 64)) : (v(), b("div", Og, [
        k[20] || (k[20] = s("span", {
          class: "map-empty-radar",
          "aria-hidden": "true"
        }, [s("i")], -1)),
        k[21] || (k[21] = s("small", null, "SCENE NOT AVAILABLE", -1)),
        k[22] || (k[22] = s("h2", null, "暂无可绘制的场景", -1)),
        k[23] || (k[23] = s("p", null, "世界地点已经存在，但还没有地点具备场景图。可维护一次地图来补充。", -1)),
        s("button", {
          type: "button",
          disabled: !!F.value,
          onClick: k[4] || (k[4] = (O) => d.value = !0)
        }, "打开维护设置", 8, Rg)
      ])) : (v(), b("div", Eg, [
        k[16] || (k[16] = s("span", {
          class: "map-empty-radar",
          "aria-hidden": "true"
        }, [s("i")], -1)),
        k[17] || (k[17] = s("small", null, "NO CARTOGRAPHIC DATA", -1)),
        k[18] || (k[18] = s("h2", null, "当前聊天还没有地图", -1)),
        k[19] || (k[19] = s("p", null, "从当前聊天中识别地点、路线与场景。只有确认后才会开始调用 AI。", -1)),
        s("button", {
          type: "button",
          disabled: !!F.value,
          onClick: x
        }, "从当前聊天建立地图", 8, Pg)
      ]))], 64)) : (v(), b(J, { key: 1 }, [!o.value.map || o.value.map.atlas.locations.length === 0 ? (v(), b("div", Fg, [
        k[34] || (k[34] = s("span", {
          class: "map-empty-radar",
          "aria-hidden": "true"
        }, [s("i")], -1)),
        k[35] || (k[35] = s("small", null, "ATLAS IS EMPTY", -1)),
        k[36] || (k[36] = s("h2", null, "世界地图尚未建立", -1)),
        k[37] || (k[37] = s("p", null, "建立地图后，这里会显示地点层级、通行路线和人物所在位置。", -1)),
        s("button", {
          type: "button",
          disabled: !!F.value,
          onClick: x
        }, "从当前聊天建立地图", 8, Hg)
      ])) : (v(), b(J, { key: 1 }, [
        be(wm, {
          atlas: o.value.map.atlas,
          revision: o.value.map.revision,
          "current-location-key": M.value?.key || "",
          "selected-location-key": p.value,
          "symbols-ready": P.value,
          onViewScene: N
        }, null, 8, [
          "atlas",
          "revision",
          "current-location-key",
          "selected-location-key",
          "symbols-ready"
        ]),
        s("div", jg, [
          k[39] || (k[39] = s("small", null, "DETERMINISTIC WORLD GRAPH", -1)),
          k[40] || (k[40] = s("h2", null, "地点网络", -1)),
          M.value ? (v(), b("span", Kg, [k[38] || (k[38] = s("i", null, null, -1)), ue("当前位置 · " + g(M.value.name), 1)])) : H("", !0)
        ]),
        k[41] || (k[41] = lr('<aside class="map-legend is-atlas" aria-label="世界地图图例"><strong>图例</strong><span><i class="is-current"></i>当前位置</span><span><i class="is-visited"></i>已到访</span><span><i class="is-route"></i>通行路线</span><span><i class="is-hierarchy"></i>隶属层级</span><small>点击有场景的地点可查看</small></aside>', 1))
      ], 64))], 64)), o.value.status === "loading" ? (v(), b("div", Gg, [...k[42] || (k[42] = [s("span", null, null, -1), s("p", null, "正在校准地图坐标", -1)])])) : H("", !0)], 2),
      be(cr, { name: "map-panel" }, {
        default: ia(() => [d.value ? (v(), ge(mg, {
          key: 0,
          "auto-maintenance": o.value.autoMaintenance,
          busy: te.value,
          "auto-toggle-busy": w.value !== null,
          "disabled-reason": F.value,
          "has-map": !!o.value.map,
          "maintenance-status": o.value.maintenanceStatus || "idle",
          "maintenance-message": o.value.maintenanceMessage || "",
          onClose: k[6] || (k[6] = (O) => d.value = !1),
          onSetAutoMaintenance: f,
          onMaintainOnce: m,
          onRequestRebuild: x
        }, null, 8, [
          "auto-maintenance",
          "busy",
          "auto-toggle-busy",
          "disabled-reason",
          "has-map",
          "maintenance-status",
          "maintenance-message"
        ])) : H("", !0)]),
        _: 1
      }),
      y.value ? (v(), b("div", {
        key: 1,
        class: "map-dialog-backdrop",
        onClick: k[8] || (k[8] = tt((O) => !te.value && (y.value = !1), ["self"]))
      }, [s("section", zg, [
        k[43] || (k[43] = s("small", null, "AI CARTOGRAPHY REQUEST", -1)),
        s("h2", Vg, g(o.value.map ? "从当前聊天重建地图？" : "从当前聊天建立地图？"), 1),
        s("p", null, "此操作会调用已配置的 AI 模型并消耗 token / API 额度。" + g(o.value.map ? "现有地图将在新地图成功保存后被替换。" : "模型会读取当前聊天并生成第一版地图。"), 1),
        h.value ? (v(), b("p", Zg, g(h.value), 1)) : H("", !0),
        s("div", null, [s("button", {
          type: "button",
          disabled: te.value,
          onClick: k[7] || (k[7] = (O) => y.value = !1)
        }, "取消", 8, Wg), s("button", {
          type: "button",
          class: "is-confirm",
          disabled: te.value || !!F.value,
          title: F.value,
          onClick: E
        }, g(w.value === "rebuild" || o.value.maintenanceStatus === "rebuilding" ? "正在建立地图…" : "确认并开始"), 9, Yg)])
      ])])) : H("", !0)
    ]));
  }
}), tb = eb, ab = Object.freeze({
  id: "tasks",
  name: "任务",
  accent: "#e8b84a"
}), nb = { class: "tasks-page tasks-detail-page" }, sb = { class: "tasks-page-heading" }, lb = ["data-status"], ib = {
  key: 0,
  class: "tasks-empty"
}, rb = { class: "tasks-contract-sheet" }, ob = { class: "tasks-party-line" }, ub = { key: 0 }, db = { key: 1 }, cb = { class: "tasks-timeline" }, fb = {
  key: 2,
  class: "tasks-empty"
}, vb = /* @__PURE__ */ se({
  __name: "TaskDetail",
  props: {
    detail: {},
    loading: { type: Boolean }
  },
  emits: ["back"],
  setup(e, { emit: t }) {
    const a = t, n = {
      recruiting: "招募中",
      active: "进行中",
      completed: "已完成",
      failed: "已失败",
      cancelled: "已撤回"
    };
    function l(i) {
      return new Date(i).toLocaleString("zh-CN", { hour12: !1 });
    }
    return (i, r) => (v(), b("section", nb, [s("header", sb, [s("button", {
      type: "button",
      class: "tasks-back",
      onClick: r[0] || (r[0] = (o) => a("back"))
    }, "← 返回"), e.detail ? (v(), b("span", {
      key: 0,
      class: "tasks-detail-status",
      "data-status": e.detail.task.status
    }, g(n[e.detail.task.status]), 9, lb)) : H("", !0)]), e.loading ? (v(), b("div", ib, [...r[1] || (r[1] = [s("h3", null, "正在读取任务…", -1)])])) : e.detail ? (v(), b(J, { key: 1 }, [s("article", rb, [
      s("header", null, [s("div", null, [s("small", null, g(e.detail.task.grade) + " · " + g(e.detail.task.source === "received" ? "大厅任务" : "我的任务"), 1), s("h2", null, g(e.detail.task.title), 1)]), s("strong", null, "¤ " + g(e.detail.task.reward), 1)]),
      s("div", ob, [
        s("span", null, [r[2] || (r[2] = ue("出资方", -1)), s("strong", null, g(e.detail.task.issuer.displayName), 1)]),
        r[4] || (r[4] = s("i", null, "→", -1)),
        s("span", null, [r[3] || (r[3] = ue("执行方", -1)), s("strong", null, g(e.detail.task.assignee?.displayName || "等待指派"), 1)])
      ]),
      s("dl", null, [
        s("div", null, [r[5] || (r[5] = s("dt", null, "唯一完成目标", -1)), s("dd", null, g(e.detail.task.objective), 1)]),
        s("div", null, [r[6] || (r[6] = s("dt", null, "执行约束", -1)), s("dd", null, g(e.detail.task.requirements || "无附加执行约束"), 1)]),
        s("div", null, [r[7] || (r[7] = s("dt", null, "行动地点", -1)), s("dd", null, g(e.detail.task.location), 1)]),
        e.detail.task.timing ? (v(), b("div", ub, [r[8] || (r[8] = s("dt", null, "时机", -1)), s("dd", null, g(e.detail.task.timing), 1)])) : H("", !0),
        s("div", null, [r[9] || (r[9] = s("dt", null, "合同风险", -1)), s("dd", null, g(e.detail.task.risk || "未注明"), 1)]),
        s("div", null, [r[10] || (r[10] = s("dt", null, "累计进展", -1)), s("dd", null, g(e.detail.task.progressSummary || "尚无已确认进展"), 1)]),
        e.detail.task.resultSummary ? (v(), b("div", db, [r[11] || (r[11] = s("dt", null, "最终结果", -1)), s("dd", null, g(e.detail.task.resultSummary), 1)])) : H("", !0)
      ])
    ]), s("section", cb, [r[13] || (r[13] = s("h3", null, "任务进展", -1)), s("ol", null, [(v(!0), b(J, null, de(e.detail.timeline, (o) => (v(), b("li", { key: o.eventId }, [r[12] || (r[12] = s("i", null, null, -1)), s("div", null, [s("small", null, g(l(o.createdAt)), 1), s("p", null, g(o.summary), 1)])]))), 128))])])], 64)) : (v(), b("div", fb, [...r[14] || (r[14] = [s("h3", null, "任务无法读取", -1), s("p", null, "请返回后重试。", -1)])]))]));
  }
}), pb = vb, mb = { class: "tasks-page tasks-publish-page" }, gb = { class: "tasks-page-heading" }, bb = ["disabled"], hb = { class: "tasks-reward-input" }, yb = ["disabled"], kb = ["disabled", "title"], wb = /* @__PURE__ */ se({
  __name: "TaskPublishForm",
  props: {
    balance: {},
    busy: { type: Boolean },
    disabledReason: {}
  },
  emits: ["submit", "cancel"],
  setup(e, { emit: t }) {
    const a = t, n = /* @__PURE__ */ _t({
      title: "",
      objective: "",
      requirements: "",
      location: "",
      risk: "",
      reward: 20
    });
    function l() {
      a("submit", {
        title: n.title,
        objective: n.objective,
        ...n.requirements.trim() ? { requirements: n.requirements } : {},
        location: n.location,
        risk: n.risk,
        reward: Number(n.reward)
      });
    }
    return (i, r) => (v(), b("section", mb, [s("header", gb, [s("button", {
      type: "button",
      class: "tasks-back",
      disabled: e.busy,
      onClick: r[0] || (r[0] = (o) => a("cancel"))
    }, "← 返回", 8, bb), r[8] || (r[8] = s("div", null, [s("h2", null, "发布任务")], -1))]), s("form", {
      class: "tasks-publish-form",
      onSubmit: tt(l, ["prevent"])
    }, [
      s("aside", null, [
        r[9] || (r[9] = s("small", null, "当前可用余额", -1)),
        s("strong", null, "¤ " + g(e.balance), 1),
        r[10] || (r[10] = s("p", null, "发布后，报酬会立即托管。招募期间撤回可全额退回；选定执行者后不可撤回。", -1))
      ]),
      s("label", null, [r[11] || (r[11] = s("span", null, [ue("任务标题 "), s("b", null, "*")], -1)), Me(s("input", {
        "onUpdate:modelValue": r[1] || (r[1] = (o) => n.title = o),
        required: "",
        maxlength: "120",
        autocomplete: "off",
        placeholder: "一句清楚的任务名称"
      }, null, 512), [[De, n.title]])]),
      s("label", null, [r[12] || (r[12] = s("span", null, [ue("唯一完成目标 "), s("b", null, "*")], -1)), Me(s("textarea", {
        "onUpdate:modelValue": r[2] || (r[2] = (o) => n.objective = o),
        required: "",
        maxlength: "8000",
        rows: "4",
        placeholder: "只写一个可以明确判定完成的目标"
      }, null, 512), [[De, n.objective]])]),
      s("label", null, [r[13] || (r[13] = s("span", null, "执行约束", -1)), Me(s("textarea", {
        "onUpdate:modelValue": r[3] || (r[3] = (o) => n.requirements = o),
        maxlength: "8000",
        rows: "3",
        placeholder: "可空；只约束执行方式，不增加第二目标"
      }, null, 512), [[De, n.requirements]])]),
      s("label", null, [r[14] || (r[14] = s("span", null, [ue("行动地点 "), s("b", null, "*")], -1)), Me(s("input", {
        "onUpdate:modelValue": r[4] || (r[4] = (o) => n.location = o),
        required: "",
        maxlength: "600",
        autocomplete: "off",
        placeholder: "目标行动实际发生的位置"
      }, null, 512), [[De, n.location]])]),
      s("label", null, [r[15] || (r[15] = s("span", null, "已知风险", -1)), Me(s("textarea", {
        "onUpdate:modelValue": r[5] || (r[5] = (o) => n.risk = o),
        maxlength: "2000",
        rows: "3",
        placeholder: "可空；写明一个具体坏结果"
      }, null, 512), [[De, n.risk]])]),
      s("label", hb, [
        r[17] || (r[17] = s("span", null, [ue("托管报酬 "), s("b", null, "*")], -1)),
        s("div", null, [r[16] || (r[16] = s("i", null, "¤", -1)), Me(s("input", {
          "onUpdate:modelValue": r[6] || (r[6] = (o) => n.reward = o),
          type: "number",
          required: "",
          min: "1",
          step: "1"
        }, null, 512), [[
          De,
          n.reward,
          void 0,
          { number: !0 }
        ]])]),
        s("small", { class: ae({ "is-danger": n.reward > e.balance }) }, "发布后可用余额：¤ " + g(e.balance - (Number(n.reward) || 0)), 3)
      ]),
      s("footer", null, [s("button", {
        type: "button",
        disabled: e.busy,
        onClick: r[7] || (r[7] = (o) => a("cancel"))
      }, "取消", 8, yb), s("button", {
        type: "submit",
        class: "tasks-primary-button",
        disabled: e.busy || !!e.disabledReason || n.reward > e.balance,
        title: e.disabledReason
      }, g(e.busy ? "正在发布…" : "确认托管并发布"), 9, kb)])
    ], 32)]));
  }
}), Tb = wb, xb = { class: "tasks-page" }, $b = { class: "tasks-page-heading" }, Sb = { class: "tasks-count" }, _b = {
  key: 0,
  class: "tasks-empty"
}, qb = {
  key: 1,
  class: "tasks-record-list"
}, Cb = ["onClick"], Mb = { class: "tasks-record-grade" }, Ab = { class: "tasks-record-main" }, Ib = { class: "tasks-record-aside" }, Eb = /* @__PURE__ */ se({
  __name: "TasksActive",
  props: { records: {} },
  emits: ["detail"],
  setup(e, { emit: t }) {
    const a = t;
    return (n, l) => (v(), b("section", xb, [s("header", $b, [l[0] || (l[0] = s("div", null, [s("h2", null, "进行中的任务")], -1)), s("span", Sb, g(e.records.length), 1)]), e.records.length ? (v(), b("div", qb, [(v(!0), b(J, null, de(e.records, (i) => (v(), b("button", {
      key: i.taskId,
      type: "button",
      class: "tasks-record",
      onClick: (r) => a("detail", i.taskId)
    }, [
      s("span", Mb, g(i.grade), 1),
      s("span", Ab, [
        s("small", null, g(i.source === "received" ? "大厅委托" : "我的委托") + " · " + g(i.location), 1),
        s("strong", null, g(i.title), 1),
        s("em", null, g(i.progressSummary), 1)
      ]),
      s("span", Ib, [s("strong", null, "¤ " + g(i.reward), 1), s("small", null, g(i.assignee?.displayName || "未指派"), 1)])
    ], 8, Cb))), 128))])) : (v(), b("div", _b, [...l[1] || (l[1] = [s("h3", null, "当前没有进行中的任务", -1), s("p", null, "接取大厅任务，或为自己发布的任务选定执行者后，任务会出现在这里。", -1)])]))]));
  }
}), Pb = Eb, Ob = { class: "tasks-page tasks-board-page" }, Rb = { class: "tasks-page-heading" }, Bb = ["disabled", "title"], Lb = {
  key: 0,
  class: "tasks-empty"
}, Db = {
  key: 1,
  class: "tasks-board-grid"
}, Nb = ["data-grade"], Ub = { class: "tasks-listing-body" }, Fb = { class: "tasks-hook" }, Hb = { key: 0 }, jb = { class: "tasks-tags" }, Kb = [
  "disabled",
  "title",
  "onClick"
], Gb = /* @__PURE__ */ se({
  __name: "TasksBoard",
  props: {
    board: {},
    busy: { type: Boolean },
    disabledReason: {}
  },
  emits: ["refresh", "accept"],
  setup(e, { emit: t }) {
    const a = t;
    return (n, l) => (v(), b("section", Ob, [s("header", Rb, [l[1] || (l[1] = s("div", null, [s("h2", null, "世界任务大厅")], -1)), s("button", {
      type: "button",
      class: "tasks-primary-button",
      disabled: e.busy || !!e.disabledReason,
      title: e.disabledReason,
      onClick: l[0] || (l[0] = (i) => a("refresh"))
    }, g(e.busy ? "正在刷新…" : "刷新任务"), 9, Bb)]), e.board ? (v(), b("div", Db, [(v(!0), b(J, null, de(e.board.listings, (i) => (v(), b("article", {
      key: i.listingId,
      class: ae(["tasks-listing", { "is-accepted": i.accepted }])
    }, [s("div", {
      class: "tasks-grade",
      "data-grade": i.grade
    }, [s("strong", null, g(i.grade), 1), s("small", null, g(i.tags[0]), 1)], 8, Nb), s("div", Ub, [
      s("header", null, [s("div", null, [s("span", null, g(i.posture), 1), s("span", null, g(i.timing), 1)]), s("strong", null, "¤ " + g(i.reward), 1)]),
      s("h3", null, g(i.title), 1),
      s("p", Fb, g(i.hook), 1),
      s("dl", null, [
        s("div", null, [l[3] || (l[3] = s("dt", null, "唯一目标", -1)), s("dd", null, g(i.objective), 1)]),
        i.requirements ? (v(), b("div", Hb, [l[4] || (l[4] = s("dt", null, "执行约束", -1)), s("dd", null, g(i.requirements), 1)])) : H("", !0),
        s("div", null, [l[5] || (l[5] = s("dt", null, "地点", -1)), s("dd", null, g(i.location), 1)]),
        s("div", null, [l[6] || (l[6] = s("dt", null, "风险", -1)), s("dd", null, g(i.risk), 1)])
      ]),
      s("footer", null, [s("div", jb, [(v(!0), b(J, null, de(i.tags, (r) => (v(), b("span", { key: r }, g(r), 1))), 128))]), s("button", {
        type: "button",
        disabled: i.accepted || e.busy || !!e.disabledReason,
        title: e.disabledReason,
        onClick: (r) => a("accept", e.board.boardId, i.listingId)
      }, g(i.accepted ? "已接取" : "接取任务"), 9, Kb)])
    ])], 2))), 128))])) : (v(), b("div", Lb, [...l[2] || (l[2] = [s("h3", null, "当前没有任务", -1), s("p", null, "请点击右上角“刷新任务”获取新任务。", -1)])]))]));
  }
}), zb = Gb, Vb = { class: "tasks-page" }, Zb = { class: "tasks-page-heading" }, Wb = { class: "tasks-count" }, Yb = {
  key: 0,
  class: "tasks-empty"
}, Qb = {
  key: 1,
  class: "tasks-history-list"
}, Xb = ["data-status", "onClick"], Jb = ["disabled"], e0 = /* @__PURE__ */ se({
  __name: "TasksHistory",
  props: {
    history: {},
    loading: { type: Boolean }
  },
  emits: ["detail", "loadMore"],
  setup(e, { emit: t }) {
    const a = t, n = {
      completed: "已完成",
      failed: "已失败",
      cancelled: "已撤回"
    };
    return (l, i) => (v(), b("section", Vb, [s("header", Zb, [i[1] || (i[1] = s("div", null, [s("h2", null, "任务历史")], -1)), s("span", Wb, g(e.history.items.length), 1)]), e.history.items.length ? (v(), b("div", Qb, [(v(!0), b(J, null, de(e.history.items, (r) => (v(), b("button", {
      key: r.taskId,
      type: "button",
      class: "tasks-history-row",
      "data-status": r.status,
      onClick: (o) => a("detail", r.taskId)
    }, [
      s("span", null, g(n[r.status]), 1),
      s("strong", null, g(r.title), 1),
      s("em", null, g(r.resultSummary), 1),
      s("b", null, "¤ " + g(r.reward), 1)
    ], 8, Xb))), 128)), e.history.hasMore ? (v(), b("button", {
      key: 0,
      type: "button",
      class: "tasks-load-more",
      disabled: e.loading,
      onClick: i[0] || (i[0] = (r) => a("loadMore"))
    }, g(e.loading ? "正在加载…" : "加载更多"), 9, Jb)) : H("", !0)])) : (v(), b("div", Yb, [...i[2] || (i[2] = [s("h3", null, "还没有历史任务", -1), s("p", null, "已完成、失败或撤回的任务会保存在这里。", -1)])]))]));
  }
}), t0 = e0, a0 = {
  key: 0,
  class: "tasks-candidates"
}, n0 = [
  "disabled",
  "title",
  "onClick"
], s0 = {
  key: 1,
  class: "tasks-inline-empty"
}, l0 = /* @__PURE__ */ se({
  __name: "TaskCandidateList",
  props: {
    task: {},
    busy: { type: Boolean },
    disabledReason: {}
  },
  emits: ["assign"],
  setup(e, { emit: t }) {
    const a = t;
    return (n, l) => e.task.candidates.length ? (v(), b("div", a0, [(v(!0), b(J, null, de(e.task.candidates, (i) => (v(), b("article", {
      key: i.candidateId,
      class: "tasks-candidate"
    }, [
      s("header", null, [s("strong", null, g(i.name), 1), l[0] || (l[0] = s("span", null, "应征者", -1))]),
      s("p", null, g(i.description), 1),
      s("blockquote", null, "“" + g(i.pitch) + "”", 1),
      s("dl", null, [s("div", null, [l[1] || (l[1] = s("dt", null, "能力", -1)), s("dd", null, g(i.capability), 1)]), s("div", null, [l[2] || (l[2] = s("dt", null, "隐患", -1)), s("dd", null, g(i.risk), 1)])]),
      s("button", {
        type: "button",
        class: "tasks-primary-button",
        disabled: e.busy || !!e.disabledReason,
        title: e.disabledReason,
        onClick: (r) => a("assign", e.task, i.candidateId)
      }, " 选择此人 ", 8, n0)
    ]))), 128))])) : (v(), b("p", s0, "还没有候选人，请先招募；不再需要该任务时也可以撤回。"));
  }
}), i0 = l0, r0 = { class: "tasks-page" }, o0 = { class: "tasks-page-heading" }, u0 = ["disabled", "title"], d0 = {
  key: 0,
  class: "tasks-empty"
}, c0 = {
  key: 1,
  class: "tasks-published-list"
}, f0 = { key: 0 }, v0 = { key: 1 }, p0 = { class: "tasks-published-actions" }, m0 = ["onClick"], g0 = [
  "disabled",
  "title",
  "onClick"
], b0 = [
  "disabled",
  "title",
  "onClick"
], h0 = /* @__PURE__ */ se({
  __name: "TasksPublished",
  props: {
    records: {},
    candidateBusyTaskId: {},
    writeBusy: { type: Boolean },
    disabledReason: {}
  },
  emits: [
    "recruit",
    "assign",
    "cancel",
    "detail",
    "publish"
  ],
  setup(e, { emit: t }) {
    const a = t;
    return (n, l) => (v(), b("section", r0, [s("header", o0, [l[2] || (l[2] = s("div", null, [s("h2", null, "我发布的任务")], -1)), s("button", {
      type: "button",
      class: "tasks-primary-button",
      disabled: !!e.disabledReason,
      title: e.disabledReason,
      onClick: l[0] || (l[0] = (i) => a("publish"))
    }, "发布新任务", 8, u0)]), e.records.length ? (v(), b("div", c0, [(v(!0), b(J, null, de(e.records, (i) => (v(), b("article", {
      key: i.taskId,
      class: "tasks-published-card"
    }, [
      s("header", null, [s("div", null, [l[4] || (l[4] = s("small", null, "招募中 · 报酬已托管", -1)), s("h3", null, g(i.title), 1)]), s("strong", null, "¤ " + g(i.reward), 1)]),
      s("dl", null, [
        s("div", null, [l[5] || (l[5] = s("dt", null, "唯一目标", -1)), s("dd", null, g(i.objective), 1)]),
        i.requirements ? (v(), b("div", f0, [l[6] || (l[6] = s("dt", null, "执行约束", -1)), s("dd", null, g(i.requirements), 1)])) : H("", !0),
        s("div", null, [l[7] || (l[7] = s("dt", null, "地点", -1)), s("dd", null, g(i.location), 1)]),
        i.risk ? (v(), b("div", v0, [l[8] || (l[8] = s("dt", null, "风险", -1)), s("dd", null, g(i.risk), 1)])) : H("", !0)
      ]),
      s("div", p0, [
        s("button", {
          type: "button",
          onClick: (r) => a("detail", i.taskId)
        }, "查看详情", 8, m0),
        s("button", {
          type: "button",
          disabled: e.writeBusy || !!e.candidateBusyTaskId || !!e.disabledReason,
          title: e.disabledReason,
          onClick: (r) => a("recruit", i)
        }, g(e.candidateBusyTaskId === i.taskId ? "正在招募…" : "招募候选人"), 9, g0),
        s("button", {
          type: "button",
          class: "is-danger",
          disabled: e.writeBusy || !!e.disabledReason,
          title: e.disabledReason,
          onClick: (r) => a("cancel", i)
        }, "撤回并退款", 8, b0)
      ]),
      be(i0, {
        task: i,
        busy: e.writeBusy || !!e.candidateBusyTaskId,
        "disabled-reason": e.disabledReason,
        onAssign: l[1] || (l[1] = (r, o) => a("assign", r, o))
      }, null, 8, [
        "task",
        "busy",
        "disabled-reason"
      ])
    ]))), 128))])) : (v(), b("div", d0, [...l[3] || (l[3] = [s("h3", null, "还没有发布任务", -1), s("p", null, "点击右上角“发布新任务”创建委托。", -1)])]))]));
  }
}), y0 = h0, k0 = { class: "tasks-page tasks-settings-page" }, w0 = { class: "tasks-setting-card" }, T0 = { class: "tasks-switch" }, x0 = ["checked", "disabled"], $0 = { class: "tasks-setting-card is-manual" }, S0 = ["disabled", "title"], _0 = /* @__PURE__ */ se({
  __name: "TasksSettings",
  props: {
    autoMaintenance: { type: Boolean },
    settingsBusy: { type: Boolean },
    maintenanceBusy: { type: Boolean },
    disabledReason: {}
  },
  emits: ["update", "maintain"],
  setup(e, { emit: t }) {
    const a = t;
    return (n, l) => (v(), b("section", k0, [
      l[5] || (l[5] = s("header", { class: "tasks-page-heading" }, [s("div", null, [s("h2", null, "任务设置")])], -1)),
      s("article", w0, [l[3] || (l[3] = s("div", null, [s("h3", null, "自动更新任务进展"), s("p", null, "开启后，每次对话推进时，系统会根据最新剧情更新进行中任务的进展和结果。")], -1)), s("label", T0, [
        s("input", {
          type: "checkbox",
          checked: e.autoMaintenance,
          disabled: e.settingsBusy,
          onChange: l[0] || (l[0] = (i) => a("update", i.target.checked))
        }, null, 40, x0),
        l[2] || (l[2] = s("span", null, null, -1)),
        s("em", null, g(e.autoMaintenance ? "开启" : "关闭"), 1)
      ])]),
      s("article", $0, [l[4] || (l[4] = s("div", null, [s("h3", null, "立即更新任务"), s("p", null, "根据当前最新剧情，检查所有进行中的任务并更新状态。")], -1)), s("button", {
        type: "button",
        disabled: e.maintenanceBusy || !!e.disabledReason,
        title: e.disabledReason,
        onClick: l[1] || (l[1] = (i) => a("maintain"))
      }, g(e.maintenanceBusy ? "正在更新…" : "立即更新"), 9, S0)])
    ]));
  }
}), q0 = _0;
function C0(e, t, a, n) {
  if (n !== a.stateVersion || e.nextCursor !== a.cursor) return null;
  const l = new Set(e.items.map((i) => i.taskId));
  return {
    items: [...e.items, ...t.items.filter((i) => !l.has(i.taskId))],
    nextCursor: t.nextCursor,
    hasMore: t.hasMore
  };
}
var M0 = { class: "tasks-app" }, A0 = { class: "tasks-app-header" }, I0 = { class: "tasks-balance" }, E0 = ["disabled"], P0 = ["disabled"], O0 = { class: "tasks-content" }, R0 = {
  class: "tasks-nav",
  "aria-label": "任务页面"
}, B0 = { key: 0 }, L0 = { key: 0 }, D0 = {
  class: "tasks-dialog",
  role: "alertdialog",
  "aria-modal": "true",
  "aria-labelledby": "tasks-publish-confirm-title"
}, N0 = ["disabled"], U0 = ["disabled", "title"], F0 = 35e3, us = 18e4, H0 = /* @__PURE__ */ se({
  __name: "TasksApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const t = e;
    function a() {
      return {
        chatIdentity: "",
        status: "blocked",
        message: "任务状态未能载入。",
        writeState: "ready",
        settings: { autoMaintenance: !1 },
        playerBalance: 0,
        generationActive: !1,
        board: null,
        active: [],
        recruiting: [],
        history: {
          items: [],
          nextCursor: null,
          hasMore: !1
        },
        maintenance: {
          state: "idle",
          lastOutcome: "none"
        }
      };
    }
    function n(Y) {
      return Y && typeof Y == "object" ? structuredClone(/* @__PURE__ */ oe(Y)) : a();
    }
    function l(Y) {
      return Y !== null && typeof Y == "object" && !Array.isArray(Y);
    }
    function i(Y) {
      return l(Y) ? Y.result : null;
    }
    const r = /* @__PURE__ */ K(n(t.initialState)), o = /* @__PURE__ */ K("board"), u = /* @__PURE__ */ K("board"), p = /* @__PURE__ */ K(null), d = /* @__PURE__ */ K(null), y = /* @__PURE__ */ K(!1), w = /* @__PURE__ */ K(""), h = /* @__PURE__ */ K(!1), q = /* @__PURE__ */ K(!1), P = /* @__PURE__ */ K(!1), R = /* @__PURE__ */ K(!1), D = /* @__PURE__ */ K(!1), L = /* @__PURE__ */ K(!1), A = /* @__PURE__ */ K(""), C = /* @__PURE__ */ K("");
    let T = 0, M = !1, $ = () => {
    };
    const _ = V(() => r.value.status === "unconfirmed"), S = V(() => h.value ? "正在处理上一项任务操作" : r.value.status === "loading" ? "任务数据正在准备" : r.value.status === "saving" ? "任务与资金正在保存" : r.value.status === "unconfirmed" ? "请先核实上一次保存结果" : r.value.status === "conflict" ? "请先采用服务端数据" : r.value.status === "blocked" ? r.value.message || "任务暂时不可用" : r.value.generationActive ? "正在生成内容，请稍后" : ""), G = V(() => S.value || (q.value ? "正在更新任务" : ""));
    function te(Y) {
      !Y || typeof Y.chatIdentity != "string" || (r.value = structuredClone(Y), A.value = "");
    }
    function X(Y) {
      if (!l(Y)) return null;
      const c = l(Y.state) ? Y.state : Y;
      return typeof c.chatIdentity == "string" ? c : null;
    }
    function W(Y) {
      const c = Y instanceof Error ? Y.message : String(Y);
      return c === "tasks_insufficient_funds" ? "小白币余额不足，任务没有发布。" : c === "tasks_state_changed" || c === "tasks_listing_already_accepted" ? "任务状态已经变化，请按最新状态重试。" : c === "tasks_terminal" ? "该任务已经结束，不能再次操作。" : c === "tasks_publish_invalid" || c === "tasks_request_invalid" ? "任务内容不完整或超出允许范围。" : c === "tasks_write_blocked" || c === "tasks_generation_active" ? "当前有生成或保存正在进行，请稍后重试。" : c === "tasks_chat_changed" ? "聊天已经切换，请重新打开任务。" : c === "host_request_timeout" ? "操作响应超时，结果可能稍后返回，请勿立即重复。" : "任务操作未完成，请稍后重试。";
    }
    async function F(Y, c = {}, f = F0) {
      return i(await t.bridge.request(Y, {
        chatIdentity: r.value.chatIdentity,
        ...c
      }, f));
    }
    function re(Y, c) {
      if (T !== c) return;
      const f = X(Y);
      f?.chatIdentity === r.value.chatIdentity && te(f);
    }
    function ce(Y) {
      C.value = Y, A.value = "";
    }
    async function pe() {
      if (y.value || G.value) return;
      y.value = !0, A.value = "";
      const Y = T;
      try {
        const c = await F("tasks/refresh", {}, us);
        if (!M) return;
        re(c, Y);
        const f = l(c) && l(c.outcome) ? c.outcome : null;
        ce(typeof f?.message == "string" ? f.message : "任务已刷新");
      } catch (c) {
        M && (A.value = W(c));
      } finally {
        M && (y.value = !1);
      }
    }
    async function he(Y, c) {
      if (S.value) return;
      h.value = !0;
      const f = T;
      try {
        re(await F("tasks/board/accept", {
          boardId: Y,
          listingId: c
        }), f), ce("任务已接取，报酬已进入托管。");
      } catch (m) {
        A.value = W(m);
      } finally {
        h.value = !1;
      }
    }
    async function _e(Y) {
      if (w.value || G.value) return;
      w.value = Y.taskId;
      const c = T;
      try {
        const f = await F("tasks/candidates/refresh", {
          taskId: Y.taskId,
          expectedTaskRevision: Y.taskRevision,
          expectedEventId: Y.eventId
        }, us);
        re(f, c);
        const m = l(f) && l(f.outcome) ? f.outcome : null;
        ce(typeof m?.message == "string" ? m.message : "招募请求已结束");
      } catch (f) {
        A.value = W(f);
      } finally {
        w.value = "";
      }
    }
    async function Ee(Y, c) {
      if (S.value) return;
      h.value = !0;
      const f = T;
      try {
        re(await F("tasks/candidates/assign", {
          taskId: Y.taskId,
          expectedTaskRevision: Y.taskRevision,
          expectedEventId: Y.eventId,
          candidateId: c
        }), f), ce("执行者已确认，任务进入进行中。");
      } catch (m) {
        A.value = W(m);
      } finally {
        h.value = !1;
      }
    }
    async function nt(Y) {
      if (S.value || !globalThis.confirm(`撤回“${Y.title}”并退回 ¤ ${Y.reward}？`)) return;
      h.value = !0;
      const c = T;
      try {
        re(await F("tasks/cancel", {
          taskId: Y.taskId,
          expectedTaskRevision: Y.taskRevision,
          expectedEventId: Y.eventId
        }), c), ce("任务已撤回，托管报酬已退回钱包。");
      } catch (f) {
        A.value = W(f);
      } finally {
        h.value = !1;
      }
    }
    function Be(Y) {
      S.value || (d.value = structuredClone(Y));
    }
    async function Le() {
      const Y = d.value;
      if (!Y || S.value) return;
      h.value = !0;
      const c = T;
      try {
        re(await F("tasks/publish", { form: Y }), c), d.value = null, o.value = "published", ce("任务已发布，报酬已锁入托管。");
      } catch (f) {
        A.value = W(f);
      } finally {
        h.value = !1;
      }
    }
    async function Mt(Y) {
      if (P.value) return;
      P.value = !0;
      const c = T;
      try {
        re(await F("tasks/settings/update", { autoMaintenance: Y }), c), ce(Y ? "已开启任务进展自动更新。" : "已关闭任务进展自动更新。");
      } catch (f) {
        A.value = W(f);
      } finally {
        P.value = !1;
      }
    }
    async function bt() {
      if (q.value || G.value) return;
      q.value = !0;
      const Y = T;
      try {
        const c = await F("tasks/maintenance/run", {}, us);
        re(c, Y), ce(l(c) && typeof c.message == "string" ? c.message : "任务已更新");
      } catch (c) {
        A.value = W(c);
      } finally {
        q.value = !1;
      }
    }
    async function Z(Y) {
      u.value = o.value === "detail" || o.value === "publish" ? "active" : o.value, o.value = "detail", p.value = null, D.value = !0;
      try {
        const c = await F("tasks/detail/read", { taskId: Y });
        l(c) && l(c.task) && Array.isArray(c.timeline) && (p.value = structuredClone(c));
      } catch (c) {
        A.value = W(c);
      } finally {
        D.value = !1;
      }
    }
    async function j() {
      const Y = r.value.history.nextCursor;
      if (!Y || L.value) return;
      L.value = !0;
      const c = {
        cursor: Y,
        stateVersion: T
      };
      try {
        const f = await F("tasks/history/load-more", { cursor: Y });
        if (M && l(f) && Array.isArray(f.items)) {
          const m = f, x = C0(r.value.history, m, c, T);
          x && (r.value.history = x);
        }
      } catch (f) {
        A.value = W(f);
      } finally {
        L.value = !1;
      }
    }
    async function le() {
      if (R.value) return;
      R.value = !0;
      const Y = T;
      try {
        re(await F("tasks/save/confirm"), Y), ce("保存结果已重新核实。");
      } catch (c) {
        A.value = W(c);
      } finally {
        R.value = !1;
      }
    }
    async function Ie() {
      if (R.value) return;
      R.value = !0;
      const Y = T;
      try {
        re(await F("tasks/save/adopt-server"), Y), ce("已采用服务端数据。");
      } catch (c) {
        A.value = W(c);
      } finally {
        R.value = !1;
      }
    }
    function Pe(Y) {
      Y !== "publish" && (u.value = Y), o.value = Y;
    }
    return et(o, (Y) => {
      const c = Y === "publish" ? "published" : Y;
      t.bridge.post("tasks/activate", {
        chatIdentity: r.value.chatIdentity,
        page: c
      });
    }), at(() => {
      M = !0, $ = t.bridge.subscribe((Y) => {
        if (Y.type === "tasks/state") {
          const c = Y.payload?.state;
          c && (T += 1, te(c));
        }
        Y.type === "tasks/error" && (A.value = "任务状态暂时无法读取，请重新打开。");
      }), t.bridge.post("tasks/activate", {
        chatIdentity: r.value.chatIdentity,
        page: "board"
      });
    }), ot(() => {
      M = !1, $(), d.value = null;
    }), (Y, c) => (v(), b("main", M0, [
      s("header", A0, [c[11] || (c[11] = s("div", { class: "tasks-brand" }, [s("span", { "aria-hidden": "true" }, [
        s("i"),
        s("i"),
        s("i")
      ]), s("div", null, [s("h1", null, "任务")])], -1)), s("div", I0, [c[10] || (c[10] = s("small", null, "可用余额", -1)), s("strong", null, "¤ " + g(r.value.playerBalance), 1)])]),
      r.value.message || A.value || C.value ? (v(), b("aside", {
        key: 0,
        class: ae(["tasks-notice", {
          "is-error": !!A.value || r.value.status === "conflict" || r.value.status === "blocked",
          "is-warning": _.value
        }]),
        role: "status"
      }, [
        s("span", null, g(A.value ? "!" : _.value ? "?" : "i"), 1),
        s("p", null, g(A.value || r.value.message || C.value), 1),
        _.value ? (v(), b("button", {
          key: 0,
          type: "button",
          disabled: R.value,
          onClick: le
        }, g(R.value ? "正在核实…" : "核实保存结果"), 9, E0)) : r.value.status === "conflict" ? (v(), b("button", {
          key: 1,
          type: "button",
          disabled: R.value,
          onClick: Ie
        }, g(R.value ? "正在采用…" : "采用服务端数据"), 9, P0)) : H("", !0)
      ], 2)) : H("", !0),
      s("div", O0, [o.value === "board" ? (v(), ge(zb, {
        key: 0,
        board: r.value.board,
        busy: y.value,
        "disabled-reason": G.value,
        onRefresh: pe,
        onAccept: he
      }, null, 8, [
        "board",
        "busy",
        "disabled-reason"
      ])) : o.value === "active" ? (v(), ge(Pb, {
        key: 1,
        records: r.value.active,
        onDetail: Z
      }, null, 8, ["records"])) : o.value === "published" ? (v(), ge(y0, {
        key: 2,
        records: r.value.recruiting,
        "candidate-busy-task-id": w.value,
        "write-busy": h.value,
        "disabled-reason": S.value,
        onRecruit: _e,
        onAssign: Ee,
        onCancel: nt,
        onDetail: Z,
        onPublish: c[0] || (c[0] = (f) => Pe("publish"))
      }, null, 8, [
        "records",
        "candidate-busy-task-id",
        "write-busy",
        "disabled-reason"
      ])) : o.value === "history" ? (v(), ge(t0, {
        key: 3,
        history: r.value.history,
        loading: L.value,
        onDetail: Z,
        onLoadMore: j
      }, null, 8, ["history", "loading"])) : o.value === "settings" ? (v(), ge(q0, {
        key: 4,
        "auto-maintenance": r.value.settings.autoMaintenance,
        "settings-busy": P.value,
        "maintenance-busy": q.value || r.value.maintenance.state === "running",
        "disabled-reason": G.value,
        onUpdate: Mt,
        onMaintain: bt
      }, null, 8, [
        "auto-maintenance",
        "settings-busy",
        "maintenance-busy",
        "disabled-reason"
      ])) : o.value === "publish" ? (v(), ge(Tb, {
        key: 5,
        balance: r.value.playerBalance,
        busy: h.value,
        "disabled-reason": S.value,
        onSubmit: Be,
        onCancel: c[1] || (c[1] = (f) => Pe("published"))
      }, null, 8, [
        "balance",
        "busy",
        "disabled-reason"
      ])) : (v(), ge(pb, {
        key: 6,
        detail: p.value,
        loading: D.value,
        onBack: c[2] || (c[2] = (f) => Pe(u.value))
      }, null, 8, ["detail", "loading"]))]),
      s("nav", R0, [
        s("button", {
          type: "button",
          class: ae({ "is-active": o.value === "board" }),
          onClick: c[3] || (c[3] = (f) => Pe("board"))
        }, [...c[12] || (c[12] = [s("span", null, "⌁", -1), ue("大厅", -1)])], 2),
        s("button", {
          type: "button",
          class: ae({ "is-active": o.value === "active" }),
          onClick: c[4] || (c[4] = (f) => Pe("active"))
        }, [
          c[13] || (c[13] = s("span", null, "▶", -1)),
          c[14] || (c[14] = ue("进行中", -1)),
          r.value.active.length ? (v(), b("b", B0, g(r.value.active.length), 1)) : H("", !0)
        ], 2),
        s("button", {
          type: "button",
          class: ae({ "is-active": o.value === "published" || o.value === "publish" }),
          onClick: c[5] || (c[5] = (f) => Pe("published"))
        }, [
          c[15] || (c[15] = s("span", null, "◇", -1)),
          c[16] || (c[16] = ue("我发布的", -1)),
          r.value.recruiting.length ? (v(), b("b", L0, g(r.value.recruiting.length), 1)) : H("", !0)
        ], 2),
        s("button", {
          type: "button",
          class: ae({ "is-active": o.value === "history" }),
          onClick: c[6] || (c[6] = (f) => Pe("history"))
        }, [...c[17] || (c[17] = [s("span", null, "▤", -1), ue("历史", -1)])], 2),
        s("button", {
          type: "button",
          class: ae({ "is-active": o.value === "settings" }),
          onClick: c[7] || (c[7] = (f) => Pe("settings"))
        }, [...c[18] || (c[18] = [s("span", null, "⚙", -1), ue("设置", -1)])], 2)
      ]),
      d.value ? (v(), b("div", {
        key: 1,
        class: "tasks-dialog-backdrop",
        onClick: c[9] || (c[9] = tt((f) => !h.value && (d.value = null), ["self"]))
      }, [s("section", D0, [
        c[20] || (c[20] = s("h2", { id: "tasks-publish-confirm-title" }, "确认发布任务？", -1)),
        s("p", null, [
          ue("“" + g(d.value.title) + "”将立即从钱包锁定 ", 1),
          s("strong", null, "¤ " + g(d.value.reward), 1),
          c[19] || (c[19] = ue("。招募期间可以撤回；选定执行者后不能撤回。", -1))
        ]),
        s("div", null, [s("button", {
          type: "button",
          disabled: h.value,
          onClick: c[8] || (c[8] = (f) => d.value = null)
        }, "返回修改", 8, N0), s("button", {
          type: "button",
          class: "tasks-primary-button",
          disabled: !!S.value,
          title: S.value || void 0,
          onClick: Le
        }, g(h.value ? "正在保存…" : "确认发布"), 9, U0)])
      ])])) : H("", !0)
    ]));
  }
}), j0 = H0, K0 = Object.freeze({
  id: "fourth-wall",
  name: "四次元壁",
  accent: "#7567d8"
}), G0 = ["src"], z0 = {
  key: 1,
  class: "fourth-wall-avatar is-placeholder",
  "aria-hidden": "true"
}, V0 = { class: "fourth-wall-message-stack" }, Z0 = {
  key: 0,
  class: "fourth-wall-thinking"
}, W0 = { class: "fourth-wall-bubble" }, Y0 = {
  key: 0,
  class: "fourth-wall-message-text"
}, Q0 = {
  key: 1,
  class: "fourth-wall-image-card"
}, X0 = ["src", "alt"], J0 = ["onClick"], eh = { key: 2 }, th = { key: 3 }, ah = ["onClick"], nh = { "aria-hidden": "true" }, sh = { key: 0 }, lh = { class: "fourth-wall-message-actions" }, ih = { key: 1 }, rh = /* @__PURE__ */ se({
  __name: "FourthWallMessage",
  props: {
    message: {},
    messageIndex: {},
    chatIdentity: {},
    sessionId: {},
    userAvatar: {},
    characterAvatar: {},
    imageAvailable: { type: Boolean },
    voiceAvailable: { type: Boolean },
    bridge: {}
  },
  emits: ["edit", "delete"],
  setup(e, { emit: t }) {
    const a = e, n = t, l = /* @__PURE__ */ K(!1), i = /* @__PURE__ */ K(""), r = /* @__PURE__ */ _t({}), o = /* @__PURE__ */ new Set();
    let u = () => {
    };
    function p(T) {
      const M = /\[(?:img|图片)\s*:\s*([^\]]+)\]|\[(?:voice|语音)\s*:([^:\]]*):([^\]]+)\]|\[(?:voice|语音)\s*:\s*([^\]]+)\]/gi, $ = [];
      let _ = 0, S;
      for (; (S = M.exec(T)) !== null; )
        S.index > _ && $.push({
          kind: "text",
          raw: T.slice(_, S.index),
          value: T.slice(_, S.index)
        }), S[1] !== void 0 ? $.push({
          kind: "image",
          raw: S[0],
          value: S[1].trim()
        }) : $.push({
          kind: "voice",
          raw: S[0],
          value: String(S[3] ?? S[4] ?? "").trim(),
          emotion: String(S[2] || "").trim().toLowerCase()
        }), _ = M.lastIndex;
      return _ < T.length && $.push({
        kind: "text",
        raw: T.slice(_),
        value: T.slice(_)
      }), $.length ? $ : [{
        kind: "text",
        raw: T,
        value: T
      }];
    }
    const d = V(() => p(a.message.content)), y = V(() => a.message.ts ? new Intl.DateTimeFormat("zh-CN", {
      hour: "2-digit",
      minute: "2-digit"
    }).format(a.message.ts) : "");
    function w(T, M) {
      return `fw-${T}-${Date.now()}-${a.messageIndex}-${M}-${Math.random().toString(36).slice(2, 7)}`;
    }
    function h(T) {
      return T.result;
    }
    function q(T, M) {
      return o.has(M) && r[T]?.requestId === M;
    }
    async function P(T, M) {
      if (r[M]?.status === "loading" || r[M]?.status === "ready") return;
      if (!a.imageAvailable) {
        r[M] = {
          status: "unavailable",
          message: "画图能力未启用"
        };
        return;
      }
      const $ = w("image", M);
      o.add($), r[M] = {
        status: "loading",
        message: "查询图片缓存",
        requestId: $
      };
      const _ = {
        chatIdentity: a.chatIdentity,
        sessionId: a.sessionId
      };
      try {
        const S = h(await a.bridge.request("fourth-wall/image-check", {
          ..._,
          tags: T.value,
          mediaRequestId: $
        }, 3e4));
        if (!q(M, $)) return;
        if (!S.available) {
          r[M] = {
            status: "unavailable",
            message: "画图能力未启用",
            requestId: $
          };
          return;
        }
        let G = S.cached || "";
        if (!G) {
          r[M] = {
            status: "loading",
            message: "正在生成图片",
            requestId: $
          };
          const te = h(await a.bridge.request("fourth-wall/image-generate", {
            ..._,
            tags: T.value,
            mediaRequestId: $
          }, 18e4));
          if (!q(M, $)) return;
          G = te.base64;
        }
        r[M] = {
          status: "ready",
          source: /^(?:data:|blob:|https?:)/i.test(G) ? G : `data:image/png;base64,${G}`
        };
      } catch (S) {
        q(M, $) && (r[M] = {
          status: "error",
          message: S instanceof Error ? S.message : String(S),
          requestId: $
        });
      } finally {
        o.delete($);
      }
    }
    async function R(T, M) {
      if (!a.voiceAvailable) {
        r[M] = {
          status: "unavailable",
          message: "TTS 能力未启用"
        };
        return;
      }
      const $ = r[M];
      if ($?.status === "loading") return;
      if ($?.status === "playing" && $.requestId) {
        a.bridge.post("fourth-wall/voice-stop", {
          chatIdentity: a.chatIdentity,
          mediaRequestId: $.requestId
        }), r[M] = { status: "idle" };
        return;
      }
      const _ = w("voice", M);
      o.add(_), r[M] = {
        status: "loading",
        message: "正在准备语音",
        requestId: _
      };
      try {
        await a.bridge.request("fourth-wall/voice-play", {
          chatIdentity: a.chatIdentity,
          sessionId: a.sessionId,
          mediaRequestId: _,
          text: T.value,
          emotion: T.emotion
        });
      } catch (S) {
        q(M, _) && (r[M] = {
          status: "error",
          message: S instanceof Error ? S.message : String(S),
          requestId: _
        }), o.delete(_);
      }
    }
    function D() {
      i.value = a.message.content, l.value = !0;
    }
    function L() {
      const T = i.value.trim();
      T && (n("edit", a.messageIndex, T), l.value = !1);
    }
    function A() {
      o.forEach((T) => {
        a.bridge.post("fourth-wall/image-cancel", {
          chatIdentity: a.chatIdentity,
          mediaRequestId: T
        }), a.bridge.post("fourth-wall/voice-stop", {
          chatIdentity: a.chatIdentity,
          mediaRequestId: T
        });
      }), o.clear();
    }
    function C() {
      d.value.forEach((T, M) => {
        T.kind === "image" && P(T, M);
      });
    }
    return at(() => {
      u = a.bridge.subscribe((T) => {
        if (T.type === "fourth-wall/image-progress") {
          const M = T.payload, $ = Object.keys(r).map(Number).find((_) => r[_]?.requestId === M.mediaRequestId);
          $ !== void 0 && (r[$].message = M.status === "queued" ? `图片队列第 ${M.position || 1} 位` : "正在生成图片");
        }
        if (T.type === "fourth-wall/voice-state") {
          const M = T.payload, $ = Object.keys(r).map(Number).find((_) => r[_]?.requestId === M.requestId);
          if ($ === void 0) return;
          M.state === "playing" && (r[$].status = "playing"), (M.state === "ended" || M.state === "stopped") && (o.delete(String(M.requestId || "")), r[$] = { status: "idle" }), M.state === "error" && (o.delete(String(M.requestId || "")), r[$] = {
            status: "error",
            message: M.message || "语音播放失败"
          });
        }
      }), C();
    }), et(() => a.message.content, () => {
      A(), Object.keys(r).forEach((T) => delete r[Number(T)]), C();
    }), ot(() => {
      u(), A();
    }), (T, M) => (v(), b("article", { class: ae(["fourth-wall-message", e.message.role === "user" ? "is-user" : "is-ai"]) }, [(e.message.role === "user" ? e.userAvatar : e.characterAvatar) ? (v(), b("img", {
      key: 0,
      class: "fourth-wall-avatar",
      src: e.message.role === "user" ? e.userAvatar : e.characterAvatar,
      alt: ""
    }, null, 8, G0)) : (v(), b("span", z0)), s("div", V0, [
      e.message.thinking ? (v(), b("details", Z0, [M[3] || (M[3] = s("summary", null, "思考过程", -1)), s("div", null, g(e.message.thinking), 1)])) : H("", !0),
      s("div", W0, [l.value ? Me((v(), b("textarea", {
        key: 0,
        "onUpdate:modelValue": M[0] || (M[0] = ($) => i.value = $),
        class: "fourth-wall-edit",
        rows: "3"
      }, null, 512)), [[De, i.value]]) : (v(!0), b(J, { key: 1 }, de(d.value, ($, _) => (v(), b(J, { key: `${$.kind}-${_}` }, [$.kind === "text" ? (v(), b("span", Y0, g($.value), 1)) : $.kind === "image" ? (v(), b("figure", Q0, [r[_]?.status === "ready" ? (v(), b("img", {
        key: 0,
        src: r[_].source,
        alt: $.value
      }, null, 8, X0)) : r[_]?.status === "error" ? (v(), b("button", {
        key: 1,
        type: "button",
        onClick: (S) => P($, _)
      }, [ue(g($.raw), 1), s("small", null, g(r[_].message) + "，点此重试", 1)], 8, J0)) : r[_]?.status === "unavailable" ? (v(), b("div", eh, [ue(g($.raw), 1), s("small", null, g(r[_].message), 1)])) : (v(), b("div", th, [ue(g($.raw), 1), s("small", null, g(r[_]?.message || "准备图片"), 1)]))])) : (v(), b("button", {
        key: 2,
        class: "fourth-wall-voice",
        type: "button",
        onClick: (S) => R($, _)
      }, [
        s("span", nh, g(r[_]?.status === "playing" ? "■" : "▶"), 1),
        s("span", null, g($.value), 1),
        r[_]?.message ? (v(), b("small", sh, g(r[_].message), 1)) : H("", !0)
      ], 8, ah))], 64))), 128)), s("div", lh, [l.value ? (v(), b(J, { key: 0 }, [s("button", {
        type: "button",
        onClick: L
      }, "保存"), s("button", {
        type: "button",
        onClick: M[1] || (M[1] = ($) => l.value = !1)
      }, "取消")], 64)) : (v(), b(J, { key: 1 }, [s("button", {
        type: "button",
        onClick: D
      }, "编辑"), s("button", {
        type: "button",
        onClick: M[2] || (M[2] = ($) => n("delete", e.messageIndex))
      }, "删除")], 64))])]),
      y.value ? (v(), b("time", ih, g(y.value), 1)) : H("", !0)
    ])], 2));
  }
}), oh = rh, uh = {
  key: 1,
  class: "fourth-wall-empty"
}, dh = {
  key: 2,
  class: "fourth-wall-message is-ai is-streaming"
}, ch = ["src"], fh = {
  key: 1,
  class: "fourth-wall-avatar is-placeholder"
}, vh = { class: "fourth-wall-message-stack" }, ph = {
  key: 0,
  class: "fourth-wall-thinking",
  open: ""
}, mh = { class: "fourth-wall-bubble" }, gh = {
  key: 0,
  class: "fourth-wall-unsaved"
}, bh = /* @__PURE__ */ se({
  __name: "FourthWallConversation",
  props: {
    history: {},
    sessionId: {},
    chatIdentity: {},
    userAvatar: {},
    characterAvatar: {},
    imageAvailable: { type: Boolean },
    voiceAvailable: { type: Boolean },
    generation: {},
    bridge: {}
  },
  emits: ["edit", "delete"],
  setup(e) {
    const t = e, a = /* @__PURE__ */ K(null), n = /* @__PURE__ */ K(40), l = V(() => Math.max(0, t.history.length - n.value)), i = V(() => t.history.slice(l.value));
    function r() {
      n.value = Math.min(t.history.length, n.value + 40);
    }
    return et(() => t.sessionId, () => {
      n.value = 40;
    }), et(() => [t.history.length, t.generation.text], async () => {
      await sn(), a.value && (a.value.scrollTop = a.value.scrollHeight);
    }, { immediate: !0 }), (o, u) => (v(), b("section", {
      ref_key: "viewport",
      ref: a,
      class: "fourth-wall-conversation",
      "aria-live": "polite"
    }, [
      l.value > 0 ? (v(), b("button", {
        key: 0,
        type: "button",
        class: "fourth-wall-earlier",
        onClick: r
      }, " 显示更早的 " + g(l.value) + " 条记录 ", 1)) : H("", !0),
      e.history.length === 0 && e.generation.status === "idle" ? (v(), b("div", uh, [...u[2] || (u[2] = [
        s("span", null, "IV", -1),
        s("strong", null, "越过故事边界", -1),
        s("p", null, "这里是你与角色扮演者的皮下私聊。", -1)
      ])])) : H("", !0),
      (v(!0), b(J, null, de(i.value, (p, d) => (v(), ge(oh, {
        key: `${p.ts}-${l.value + d}`,
        message: p,
        "message-index": l.value + d,
        "chat-identity": e.chatIdentity,
        "session-id": e.sessionId,
        "user-avatar": e.userAvatar,
        "character-avatar": e.characterAvatar,
        "image-available": e.imageAvailable,
        "voice-available": e.voiceAvailable,
        bridge: e.bridge,
        onEdit: u[0] || (u[0] = (y, w) => o.$emit("edit", y, w)),
        onDelete: u[1] || (u[1] = (y) => o.$emit("delete", y))
      }, null, 8, [
        "message",
        "message-index",
        "chat-identity",
        "session-id",
        "user-avatar",
        "character-avatar",
        "image-available",
        "voice-available",
        "bridge"
      ]))), 128)),
      e.generation.status !== "idle" ? (v(), b("article", dh, [e.characterAvatar ? (v(), b("img", {
        key: 0,
        class: "fourth-wall-avatar",
        src: e.characterAvatar,
        alt: ""
      }, null, 8, ch)) : (v(), b("span", fh)), s("div", vh, [e.generation.thinking ? (v(), b("details", ph, [u[3] || (u[3] = s("summary", null, "思考中", -1)), s("div", null, g(e.generation.thinking), 1)])) : H("", !0), s("div", mh, [ue(g(e.generation.text || (e.generation.status === "error" ? e.generation.message : "等待回应...")) + " ", 1), e.generation.unsaved ? (v(), b("small", gh, "未保存")) : H("", !0)])])])) : H("", !0)
    ], 512));
  }
}), hh = bh, yh = {
  class: "fourth-wall-modal",
  role: "dialog",
  "aria-modal": "true",
  "aria-label": "四次元壁提示词"
}, kh = { class: "fourth-wall-prompt-fields" }, wh = /* @__PURE__ */ se({
  __name: "FourthWallPromptEditor",
  props: { templates: {} },
  emits: [
    "close",
    "save",
    "restore"
  ],
  setup(e, { emit: t }) {
    const a = e, n = t, l = /* @__PURE__ */ _t(structuredClone(/* @__PURE__ */ oe(a.templates)));
    function i() {
      n("save", structuredClone(/* @__PURE__ */ oe(l)));
    }
    return (r, o) => (v(), b("div", {
      class: "fourth-wall-modal-backdrop",
      onClick: o[6] || (o[6] = tt((u) => n("close"), ["self"]))
    }, [s("section", yh, [
      s("header", null, [o[7] || (o[7] = s("strong", null, "提示词模板", -1)), s("button", {
        type: "button",
        onClick: o[0] || (o[0] = (u) => n("close"))
      }, "关闭")]),
      s("div", kh, [
        s("label", null, [o[8] || (o[8] = ue("Top User", -1)), Me(s("textarea", {
          "onUpdate:modelValue": o[1] || (o[1] = (u) => l.topuser = u),
          rows: "5"
        }, null, 512), [[De, l.topuser]])]),
        s("label", null, [o[9] || (o[9] = ue("Confirm", -1)), Me(s("textarea", {
          "onUpdate:modelValue": o[2] || (o[2] = (u) => l.confirm = u),
          rows: "3"
        }, null, 512), [[De, l.confirm]])]),
        s("label", null, [o[10] || (o[10] = ue("Meta Protocol", -1)), Me(s("textarea", {
          "onUpdate:modelValue": o[3] || (o[3] = (u) => l.metaProtocol = u),
          rows: "12"
        }, null, 512), [[De, l.metaProtocol]])]),
        s("label", null, [o[11] || (o[11] = ue("Bottom", -1)), Me(s("textarea", {
          "onUpdate:modelValue": o[4] || (o[4] = (u) => l.bottom = u),
          rows: "5"
        }, null, 512), [[De, l.bottom]])])
      ]),
      s("footer", null, [s("button", {
        type: "button",
        class: "is-danger",
        onClick: o[5] || (o[5] = (u) => n("restore"))
      }, "恢复默认"), s("button", {
        type: "button",
        class: "is-primary",
        onClick: i
      }, "保存")])
    ])]));
  }
}), Th = wh, xh = { class: "fourth-wall-settings-section" }, $h = { class: "fourth-wall-session-row" }, Sh = ["value", "disabled"], _h = ["value"], qh = ["disabled"], Ch = ["disabled"], Mh = ["disabled"], Ah = /* @__PURE__ */ se({
  __name: "FourthWallSessions",
  props: {
    sessions: {},
    activeSessionId: {},
    disabled: { type: Boolean }
  },
  emits: [
    "switch",
    "add",
    "rename",
    "delete"
  ],
  setup(e, { emit: t }) {
    const a = t;
    function n() {
      const r = window.prompt("新记录名称", "新记录")?.trim();
      r && a("add", r);
    }
    function l(r, o) {
      const u = window.prompt("重命名记录", o)?.trim();
      u && a("rename", r, u);
    }
    function i(r) {
      window.confirm("确定删除当前记录吗？") && a("delete", r);
    }
    return (r, o) => (v(), b("section", xh, [o[3] || (o[3] = s("h3", null, "聊天记录", -1)), s("div", $h, [
      s("select", {
        value: e.activeSessionId,
        disabled: e.disabled,
        onChange: o[0] || (o[0] = (u) => a("switch", u.target.value))
      }, [(v(!0), b(J, null, de(e.sessions, (u) => (v(), b("option", {
        key: u.id,
        value: u.id
      }, g(u.name), 9, _h))), 128))], 40, Sh),
      s("button", {
        type: "button",
        disabled: e.disabled,
        title: "新建记录",
        onClick: n
      }, "＋", 8, qh),
      s("button", {
        type: "button",
        disabled: e.disabled,
        title: "重命名记录",
        onClick: o[1] || (o[1] = (u) => l(e.activeSessionId, e.sessions.find((p) => p.id === e.activeSessionId)?.name || ""))
      }, " 改 ", 8, Ch),
      s("button", {
        type: "button",
        disabled: e.disabled || e.sessions.length <= 1,
        title: "删除记录",
        class: "is-danger",
        onClick: o[2] || (o[2] = (u) => i(e.activeSessionId))
      }, " 删 ", 8, Mh)
    ])]));
  }
}), Ih = Ah, Eh = {
  class: "fourth-wall-settings",
  "aria-label": "四次元壁设置"
}, Ph = { class: "fourth-wall-settings-scroll" }, Oh = { class: "fourth-wall-settings-section" }, Rh = { class: "is-toggle" }, Bh = { class: "is-toggle" }, Lh = ["disabled"], Dh = { class: "fourth-wall-settings-section" }, Nh = { class: "is-toggle" }, Uh = { class: "is-toggle" }, Fh = { class: "is-toggle" }, Hh = { key: 0 }, jh = ["disabled"], Kh = { class: "fourth-wall-settings-section is-actions" }, Gh = /* @__PURE__ */ se({
  __name: "FourthWallSettings",
  props: {
    chat: {},
    global: {},
    busy: { type: Boolean }
  },
  emits: [
    "close",
    "updateChat",
    "updateGlobal",
    "switchSession",
    "addSession",
    "renameSession",
    "deleteSession",
    "openPrompts"
  ],
  setup(e, { emit: t }) {
    const a = e, n = t, l = /* @__PURE__ */ _t(structuredClone(/* @__PURE__ */ oe(a.chat.settings))), i = /* @__PURE__ */ _t(structuredClone(/* @__PURE__ */ oe(a.global)));
    function r() {
      n("updateChat", structuredClone(/* @__PURE__ */ oe(l)));
    }
    function o() {
      n("updateGlobal", {
        image: structuredClone(/* @__PURE__ */ oe(i.image)),
        voice: structuredClone(/* @__PURE__ */ oe(i.voice)),
        commentary: structuredClone(/* @__PURE__ */ oe(i.commentary))
      });
    }
    return (u, p) => (v(), b("aside", Eh, [s("header", null, [p[14] || (p[14] = s("strong", null, "四次元壁设置", -1)), s("button", {
      type: "button",
      onClick: p[0] || (p[0] = (d) => n("close"))
    }, "关闭")]), s("div", Ph, [
      be(Ih, {
        sessions: e.chat.sessions,
        "active-session-id": e.chat.activeSessionId,
        disabled: e.busy,
        onSwitch: p[1] || (p[1] = (d) => n("switchSession", d)),
        onAdd: p[2] || (p[2] = (d) => n("addSession", d)),
        onRename: p[3] || (p[3] = (d, y) => n("renameSession", d, y)),
        onDelete: p[4] || (p[4] = (d) => n("deleteSession", d))
      }, null, 8, [
        "sessions",
        "active-session-id",
        "disabled"
      ]),
      s("section", Oh, [
        p[19] || (p[19] = s("h3", null, "上下文", -1)),
        s("label", null, [p[15] || (p[15] = ue("普通聊天层数", -1)), Me(s("input", {
          "onUpdate:modelValue": p[5] || (p[5] = (d) => l.maxChatLayers = d),
          type: "number",
          min: "1",
          max: "9999"
        }, null, 512), [[
          De,
          l.maxChatLayers,
          void 0,
          { number: !0 }
        ]])]),
        s("label", null, [p[16] || (p[16] = ue("皮下聊天轮数", -1)), Me(s("input", {
          "onUpdate:modelValue": p[6] || (p[6] = (d) => l.maxMetaTurns = d),
          type: "number",
          min: "1",
          max: "9999"
        }, null, 512), [[
          De,
          l.maxMetaTurns,
          void 0,
          { number: !0 }
        ]])]),
        s("label", Rh, [p[17] || (p[17] = s("span", null, "流式生成", -1)), Me(s("input", {
          "onUpdate:modelValue": p[7] || (p[7] = (d) => l.stream = d),
          type: "checkbox"
        }, null, 512), [[Pa, l.stream]])]),
        s("label", Bh, [p[18] || (p[18] = s("span", null, "禁用 Assistant Prefill", -1)), Me(s("input", {
          "onUpdate:modelValue": p[8] || (p[8] = (d) => l.disableAssistantPrefill = d),
          type: "checkbox"
        }, null, 512), [[Pa, l.disableAssistantPrefill]])]),
        s("button", {
          type: "button",
          class: "is-primary",
          disabled: e.busy,
          onClick: r
        }, "保存上下文设置", 8, Lh)
      ]),
      s("section", Dh, [
        p[23] || (p[23] = s("h3", null, "能力", -1)),
        s("label", Nh, [p[20] || (p[20] = s("span", null, "在提示词中允许图片", -1)), Me(s("input", {
          "onUpdate:modelValue": p[9] || (p[9] = (d) => i.image.enablePrompt = d),
          type: "checkbox"
        }, null, 512), [[Pa, i.image.enablePrompt]])]),
        s("label", Uh, [p[21] || (p[21] = s("span", null, "在提示词中允许语音", -1)), Me(s("input", {
          "onUpdate:modelValue": p[10] || (p[10] = (d) => i.voice.enabled = d),
          type: "checkbox"
        }, null, 512), [[Pa, i.voice.enabled]])]),
        s("label", Fh, [p[22] || (p[22] = s("span", null, "实时吐槽", -1)), Me(s("input", {
          "onUpdate:modelValue": p[11] || (p[11] = (d) => i.commentary.enabled = d),
          type: "checkbox"
        }, null, 512), [[Pa, i.commentary.enabled]])]),
        i.commentary.enabled ? (v(), b("label", Hh, [ue(" 吐槽概率 " + g(i.commentary.probability) + "% ", 1), Me(s("input", {
          "onUpdate:modelValue": p[12] || (p[12] = (d) => i.commentary.probability = d),
          type: "range",
          min: "1",
          max: "99"
        }, null, 512), [[
          De,
          i.commentary.probability,
          void 0,
          { number: !0 }
        ]])])) : H("", !0),
        s("button", {
          type: "button",
          class: "is-primary",
          disabled: e.busy,
          onClick: o
        }, "保存能力设置", 8, jh)
      ]),
      s("section", Kh, [s("button", {
        type: "button",
        onClick: p[13] || (p[13] = (d) => n("openPrompts"))
      }, "提示词模板")])
    ])]));
  }
}), zh = Gh, Vh = { class: "fourth-wall-app" }, Zh = { class: "fourth-wall-header" }, Wh = { class: "fourth-wall-heading" }, Yh = { class: "fourth-wall-header-actions" }, Qh = ["disabled"], Xh = ["disabled"], Jh = {
  key: 0,
  class: "fourth-wall-error",
  role: "alert"
}, ey = { class: "fourth-wall-composer" }, ty = ["disabled"], ay = ["disabled"], ny = 35e3, sy = /* @__PURE__ */ se({
  __name: "FourthWallApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const t = e, a = /* @__PURE__ */ K(structuredClone(/* @__PURE__ */ oe(t.initialState))), n = /* @__PURE__ */ K(""), l = /* @__PURE__ */ K(!1), i = /* @__PURE__ */ K(!1), r = /* @__PURE__ */ K(!1), o = /* @__PURE__ */ K(""), u = /* @__PURE__ */ K(!1), p = /* @__PURE__ */ K({
      status: "idle",
      sessionId: "",
      text: "",
      thinking: "",
      message: "",
      unsaved: !1
    });
    let d = () => {
    };
    const y = V(() => a.value.chat.sessions.find((_) => _.id === a.value.chat.activeSessionId)), w = V(() => p.value.status === "started" || p.value.status === "progress");
    function h(_ = y.value.id) {
      return {
        chatIdentity: a.value.chatIdentity,
        sessionId: _
      };
    }
    function q(_) {
      return structuredClone(_.result);
    }
    async function P(_, S) {
      r.value = !0, o.value = "";
      try {
        a.value = q(await t.bridge.request(_, S, ny));
      } catch (G) {
        o.value = G instanceof Error ? G.message : String(G);
      } finally {
        r.value = !1;
      }
    }
    async function R() {
      const _ = n.value.trim();
      !_ || w.value || r.value || (n.value = "", p.value = {
        status: "started",
        sessionId: y.value.id,
        text: "",
        thinking: "",
        message: "",
        unsaved: !1
      }, await P("fourth-wall/send", {
        ...h(),
        content: _
      }), o.value && (p.value.status = "idle"));
    }
    async function D() {
      w.value || r.value || (p.value = {
        status: "started",
        sessionId: y.value.id,
        text: "",
        thinking: "",
        message: "",
        unsaved: !1
      }, await P("fourth-wall/regenerate", h()), o.value && (p.value.status = "idle"));
    }
    function L() {
      t.bridge.post("fourth-wall/cancel", h());
    }
    function A(_) {
      _.key !== "Enter" || _.shiftKey || u.value || (_.preventDefault(), w.value ? L() : R());
    }
    function C(_) {
      window.confirm("确定删除这条消息吗？") && P("fourth-wall/delete-message", {
        ...h(),
        messageIndex: _
      });
    }
    function T() {
      window.confirm("确定清空当前记录吗？") && P("fourth-wall/clear-history", h());
    }
    function M(_) {
      P("fourth-wall/update-chat-settings", {
        ...h(),
        patch: _
      });
    }
    function $(_) {
      P("fourth-wall/update-global-settings", {
        ...h(),
        patch: _
      });
    }
    return at(() => {
      d = t.bridge.subscribe((_) => {
        if (_.type === "fourth-wall/state" && (a.value = structuredClone(_.payload.state)), _.type !== "fourth-wall/generation") return;
        const S = _.payload;
        if (!(S.sessionId && S.sessionId !== y.value.id)) {
          if (S.status === "complete" || S.status === "cancelled") {
            p.value = {
              status: "idle",
              sessionId: "",
              text: "",
              thinking: "",
              message: "",
              unsaved: !1
            };
            return;
          }
          if (S.status === "error") {
            o.value = S.message || "生成失败", p.value = S.kind === "save" && (S.draft?.text || S.draft?.thinking) ? {
              status: "error",
              sessionId: S.sessionId || y.value.id,
              text: S.draft?.text || "",
              thinking: S.draft?.thinking || "",
              message: "",
              unsaved: !0
            } : {
              status: "idle",
              sessionId: "",
              text: "",
              thinking: "",
              message: "",
              unsaved: !1
            };
            return;
          }
          p.value = {
            status: S.status || "progress",
            sessionId: S.sessionId || y.value.id,
            text: S.text || p.value.text,
            thinking: S.thinking || p.value.thinking,
            message: "",
            unsaved: !1
          };
        }
      });
    }), ot(() => d()), (_, S) => (v(), b("main", Vh, [
      s("header", Zh, [s("div", Wh, [S[17] || (S[17] = s("span", null, "IV", -1)), s("div", null, [S[16] || (S[16] = s("strong", null, "四次元壁", -1)), s("small", null, g(y.value.name), 1)])]), s("div", Yh, [
        s("button", {
          type: "button",
          title: "重答",
          disabled: r.value || w.value,
          onClick: D
        }, "↻", 8, Qh),
        s("button", {
          type: "button",
          title: "清空当前记录",
          "aria-label": "清空当前记录",
          disabled: r.value,
          onClick: T
        }, [...S[18] || (S[18] = [s("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [s("path", { d: "M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7m4 4v5m4-5v5" })], -1)])], 8, Xh),
        s("button", {
          type: "button",
          title: "设置",
          onClick: S[0] || (S[0] = (G) => l.value = !0)
        }, "⚙")
      ])]),
      o.value ? (v(), b("div", Jh, [s("span", null, g(o.value), 1), s("button", {
        type: "button",
        onClick: S[1] || (S[1] = (G) => o.value = "")
      }, "×")])) : H("", !0),
      be(hh, {
        history: y.value.history,
        "session-id": y.value.id,
        "chat-identity": a.value.chatIdentity,
        "user-avatar": a.value.userAvatar,
        "character-avatar": a.value.characterAvatar,
        "image-available": a.value.capabilities.image.available,
        "voice-available": a.value.capabilities.voice.available,
        generation: p.value,
        bridge: e.bridge,
        onEdit: S[2] || (S[2] = (G, te) => P("fourth-wall/edit-message", {
          ...h(),
          messageIndex: G,
          content: te
        })),
        onDelete: C
      }, null, 8, [
        "history",
        "session-id",
        "chat-identity",
        "user-avatar",
        "character-avatar",
        "image-available",
        "voice-available",
        "generation",
        "bridge"
      ]),
      s("footer", ey, [Me(s("textarea", {
        "onUpdate:modelValue": S[3] || (S[3] = (G) => n.value = G),
        rows: "1",
        placeholder: "聊点什么...",
        disabled: r.value,
        onCompositionstart: S[4] || (S[4] = (G) => u.value = !0),
        onCompositionend: S[5] || (S[5] = (G) => u.value = !1),
        onKeydown: A
      }, null, 40, ty), [[De, n.value]]), s("button", {
        type: "button",
        class: ae({ "is-stop": w.value }),
        disabled: r.value,
        onClick: S[6] || (S[6] = (G) => w.value ? L() : R())
      }, g(w.value ? "■" : "↑"), 11, ay)]),
      l.value ? (v(), ge(zh, {
        key: 1,
        chat: a.value.chat,
        global: a.value.global,
        busy: r.value || w.value,
        onClose: S[7] || (S[7] = (G) => l.value = !1),
        onUpdateChat: M,
        onUpdateGlobal: $,
        onSwitchSession: S[8] || (S[8] = (G) => P("fourth-wall/switch-session", {
          ...h(),
          targetSessionId: G
        })),
        onAddSession: S[9] || (S[9] = (G) => P("fourth-wall/add-session", {
          ...h(),
          name: G
        })),
        onRenameSession: S[10] || (S[10] = (G, te) => P("fourth-wall/rename-session", {
          ...h(G),
          name: te
        })),
        onDeleteSession: S[11] || (S[11] = (G) => P("fourth-wall/delete-session", h(G))),
        onOpenPrompts: S[12] || (S[12] = (G) => i.value = !0)
      }, null, 8, [
        "chat",
        "global",
        "busy"
      ])) : H("", !0),
      i.value ? (v(), ge(Th, {
        key: 2,
        templates: a.value.global.promptTemplates,
        onClose: S[13] || (S[13] = (G) => i.value = !1),
        onSave: S[14] || (S[14] = (G) => {
          $({ promptTemplates: G }), i.value = !1;
        }),
        onRestore: S[15] || (S[15] = () => {
          P("fourth-wall/restore-prompts", h()), i.value = !1;
        })
      }, null, 8, ["templates"])) : H("", !0)
    ]));
  }
}), ly = sy, iy = Object.freeze({
  id: "shop",
  name: "奇物商店",
  accent: "#a83b32"
}), ry = {
  class: "shop-item-icon",
  viewBox: "0 -960 960 960",
  "aria-hidden": "true",
  focusable: "false"
}, oy = ["d"], uy = /* @__PURE__ */ se({
  __name: "ShopItemIcon",
  props: { name: {} },
  setup(e) {
    const t = e, a = Object.freeze({
      local_florist: "M480-81q0-126 76-223t193-126q19-5 37.5-3.5T819-418q12 13 13.5 31t-3.5 35q-28 118-125.5 194.5T480-81Zm98-97q57-21 100-64t64-100q-57 21-100 64t-64 100Zm-98 98q0-126-76-223T211-429q-19-5-37.5-3.5T141-417q-12 13-13.5 31t3.5 35q28 118 125.5 194.5T480-80Zm-98-98q-57-21-100-64t-64-100q57 21 100 64t64 100Zm98-422q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm-70.5 218.5Q378-403 364-438q-5 0-9 .5t-9 .5q-52 0-89-37t-37-89q0-21 7-40.5t21-36.5q-13-17-20-36.5t-7-40.5q0-52 36.5-89t88.5-37q5 0 9 .5t9 .5q14-35 45.5-56.5T480-920q39 0 70.5 21.5T596-842q5 0 9-.5t9-.5q52 0 88.5 37t36.5 89q0 21-6.5 40.5T712-640q13 17 20 36.5t7 40.5q0 52-36.5 89T614-437q-5 0-9-.5t-9-.5q-14 35-45.5 56.5T480-360q-39 0-70.5-21.5ZM614-517q19 0 32.5-13.5T660-563q0-14-7.5-24.5T633-604l-35-17q-2 11-6 21.5t-9 19.5q-5 9-12 17t-15 15l32 23q5 4 11.5 6t14.5 2Zm-16-142 35-17q12-6 19-17t7-24q0-19-13-32.5T614-763q-8 0-14 2t-12 6l-33 23q8 7 15.5 15t12.5 17q5 9 9 19.5t6 21.5Zm-159-93q10-4 20-6t21-2q11 0 21 2t20 6l5-44q2-18-12.5-31T480-840q-19 0-33.5 13T434-796l5 44Zm41 312q19 0 33.5-13t12.5-31l-5-44q-10 4-20 6t-21 2q-11 0-21-2t-20-6l-5 44q-2 18 12.5 31t33.5 13ZM362-659q2-11 6-21.5t9-19.5q5-9 12-17t15-15l-32-23q-5-4-11.5-6t-14.5-2q-19 0-32.5 13.5T300-717q0 13 7.5 24t19.5 17l35 17Zm-16 141q8 0 14-1.5t12-6.5l33-22q-8-7-15.5-15T377-580q-5-9-9-19.5t-6-21.5l-35 17q-12 6-19 17t-7 24q1 19 13.5 32t31.5 13Z",
      card_giftcard: "M160-280v80h640v-80H160Zm0-440h88q-5-9-6.5-19t-1.5-21q0-50 35-85t85-35q30 0 55.5 15.5T460-826l20 26 20-26q18-24 44-39t56-15q50 0 85 35t35 85q0 11-1.5 21t-6.5 19h88q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720Zm0 320h640v-240H596l60 82q10 14 8 29.5T648-503q-14 10-29.5 7.5T593-511L480-664 367-511q-10 13-25.5 15.5T312-503q-14-10-16.5-25.5T303-558l59-82H160v240Zm228.5-331.5Q400-743 400-760t-11.5-28.5Q377-800 360-800t-28.5 11.5Q320-777 320-760t11.5 28.5Q343-720 360-720t28.5-11.5ZM600-720q17 0 28.5-11.5T640-760q0-17-11.5-28.5T600-800q-17 0-28.5 11.5T560-760q0 17 11.5 28.5T600-720Z",
      sentiment_satisfied: "M480-260q53 0 100.5-23t76.5-67q11-17 3-33.5T634-400q-8 0-14.5 3.5T609-386q-23 31-57 48.5T480-320q-38 0-72-17.5T351-386q-5-7-11.5-10.5T325-400q-18 0-26 16t3 32q29 45 76.5 68.5T480-260Zm140-260q25 0 42.5-17.5T680-580q0-25-17.5-42.5T620-640q-25 0-42.5 17.5T560-580q0 25 17.5 42.5T620-520Zm-280 0q25 0 42.5-17.5T400-580q0-25-17.5-42.5T340-640q-25 0-42.5 17.5T280-580q0 25 17.5 42.5T340-520Zm-16 408.5Q251-143 197-197t-85.5-127Q80-397 80-480t31.5-156Q143-709 197-763t127-85.5Q397-880 480-880t156 31.5Q709-817 763-763t85.5 127Q880-563 880-480t-31.5 156Q817-251 763-197t-127 85.5Q563-80 480-80t-156-31.5ZM480-160q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z",
      star: "m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143Zm126 18L314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Z",
      eco: "M216-176q-45-45-70.5-104T120-402q0-63 24-124.5T222-642q60-60 169.5-91T675-759q26 1 48 11t39 27q17 17 27 39.5t11 48.5q2 82-4.5 151.5t-21 125.5q-14.5 56-37 99.5T684-182q-53 53-112.5 77.5T450-80q-65 0-127-25.5T216-176Zm112-16q29 17 59.5 24.5T450-160q46 0 91-18.5t86-59.5q18-18 36.5-50.5t32-85Q709-426 716-500.5t2-177.5q-49-2-110.5-1.5T485-670q-61 9-116 29t-90 55q-45 45-62 89t-17 85q0 59 22.5 103.5T262-246q42-80 111-153.5T534-520q-72 63-125.5 142.5T328-192Z",
      healing: "M480-254 330-104q-23 23-56 23t-56-23L104-218q-23-23-23-56t23-56l150-150-150-150q-23-23-23-56t23-56l114-114q23-23 56-23t56 23l150 150 150-150q23-23 56-23t56 23l114 114q23 23 23 56t-23 56L706-480l150 150q23 23 23 56t-23 56L742-104q-23 23-56 23t-56-23L480-254Zm-170-282 114-114-150-150-114 114 150 150Zm90 96q17 0 28.5-11.5T440-480q0-17-11.5-28.5T400-520q-17 0-28.5 11.5T360-480q0 17 11.5 28.5T400-440Zm80-80q17 0 28.5-11.5T520-560q0-17-11.5-28.5T480-600q-17 0-28.5 11.5T440-560q0 17 11.5 28.5T480-520Zm0 160q17 0 28.5-11.5T520-400q0-17-11.5-28.5T480-440q-17 0-28.5 11.5T440-400q0 17 11.5 28.5T480-360Zm80-80q17 0 28.5-11.5T600-480q0-17-11.5-28.5T560-520q-17 0-28.5 11.5T520-480q0 17 11.5 28.5T560-440Zm-24 130 150 150 114-114-150-150-114 114Z",
      ink_eraser: "M690-240h150q17 0 28.5 11.5T880-200q0 17-11.5 28.5T840-160H610l80-80Zm-483 80q-8 0-15.5-3t-13.5-9l-73-73q-23-23-23.5-57t22.5-58l440-456q23-24 56.5-24t56.5 23l199 199q23 23 23 57t-23 57L532-172q-6 6-13.5 9t-15.5 3H207Zm279-80 314-322-198-198-442 456 64 64h262Z",
      badge: "M240-240h240v-18q0-17-9.5-31.5T444-312q-20-9-40.5-13.5T360-330q-23 0-43.5 4.5T276-312q-17 8-26.5 22.5T240-258v18Zm350-60h100q13 0 21.5-8.5T720-330q0-13-8.5-21.5T690-360H590q-13 0-21.5 8.5T560-330q0 13 8.5 21.5T590-300Zm-230-60q25 0 42.5-17.5T420-420q0-25-17.5-42.5T360-480q-25 0-42.5 17.5T300-420q0 25 17.5 42.5T360-360Zm230-60h100q13 0 21.5-8.5T720-450q0-13-8.5-21.5T690-480H590q-13 0-21.5 8.5T560-450q0 13 8.5 21.5T590-420ZM160-80q-33 0-56.5-23.5T80-160v-440q0-33 23.5-56.5T160-680h200v-120q0-33 23.5-56.5T440-880h80q33 0 56.5 23.5T600-800v120h200q33 0 56.5 23.5T880-600v440q0 33-23.5 56.5T800-80H160Zm0-80h640v-440H600q0 33-23.5 56.5T520-520h-80q-33 0-56.5-23.5T360-600H160v440Zm280-440h80v-200h-80v200Z",
      theater_comedy: "M760-660q17 0 28.5-11.5T800-700q0-17-11.5-28.5T760-740q-17 0-28.5 11.5T720-700q0 17 11.5 28.5T760-660Zm-160 0q17 0 28.5-11.5T640-700q0-17-11.5-28.5T600-740q-17 0-28.5 11.5T560-700q0 17 11.5 28.5T600-660Zm80 60q-29 0-55.5 11.5T586-551q-5 10 2.5 18.5T608-524h144q12 0 19.5-8.5T774-551q-12-26-38.5-37.5T680-600ZM110-150q-70-70-70-170v-200q0-33 23.5-56.5T120-600h320q33 0 56.5 23.5T520-520v200q0 100-70 170T280-80q-100 0-170-70Zm283-57q47-47 47-113v-200H120v200q0 66 47 113t113 47q66 0 113-47Zm527-593v200q0 102-70 171t-171 69q-17 0-33.5-2t-32.5-7q-16-5-23-20t-2-31q5-16 20-23.5t31-2.5q11 3 21 4.5t21 1.5q66 0 112.5-47T840-600v-200H520v100q0 17-11.5 28.5T480-660q-17 0-28.5-11.5T440-700v-100q0-33 23.5-56.5T520-880h320q33 0 56.5 23.5T920-800ZM200-380q17 0 28.5-11.5T240-420q0-17-11.5-28.5T200-460q-17 0-28.5 11.5T160-420q0 17 11.5 28.5T200-380Zm160 0q17 0 28.5-11.5T400-420q0-17-11.5-28.5T360-460q-17 0-28.5 11.5T320-420q0 17 11.5 28.5T360-380Zm-80 40q-28 0-53 11t-39 35q-5 11 1 20.5t17 9.5h148q11 0 17-9.5t1-20.5q-14-24-39-35t-53-11Z",
      lab_research: "M360-280q-17 0-28.5-11.5T320-320q0-17 11.5-28.5T360-360h40q17 0 28.5 11.5T440-320q0 17-11.5 28.5T400-280h-40ZM320-80q-83 0-141.5-58.5T120-280v-360q-33 0-56.5-23.5T40-720v-80q0-33 23.5-56.5T120-880h400q33 0 56.5 23.5T600-800v80q0 33-23.5 56.5T520-640v120q0 33-23.5 56.5T440-440h-80q-17 0-28.5-11.5T320-480q0-17 11.5-28.5T360-520h80v-120H200v360q0 50 35 85t85 35q18 0 34.5-5t30.5-14q13-8 28-4t23 18q9 14 5 30.5T423-109q-23 14-48.5 21.5T320-80ZM120-720h400v-80H120v80Zm540 520q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Zm0 80q-75 0-127.5-52.5T480-300q0-75 52.5-127.5T660-480q75 0 127.5 52.5T840-300q0 26-7 50t-21 46l80 80q11 11 11 28t-11 28q-11 11-28 11t-28-11l-80-80q-22 14-46 21t-50 7Z",
      photo_camera: "M480-260q75 0 127.5-52.5T660-440q0-75-52.5-127.5T480-620q-75 0-127.5 52.5T300-440q0 75 52.5 127.5T480-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM160-120q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h126l50-54q11-12 26.5-19t32.5-7h170q17 0 32.5 7t26.5 19l50 54h126q33 0 56.5 23.5T880-680v480q0 33-23.5 56.5T800-120H160Zm0-80h640v-480H638l-73-80H395l-73 80H160v480Z",
      handshake: "M475-160q4 0 8-2t6-4l328-328q12-12 17.5-27t5.5-30q0-16-5.5-30.5T817-607L647-777q-11-12-25.5-17.5T591-800q-15 0-30 5.5T534-777l-11 11 74 75q15 14 22 32t7 38q0 42-28.5 70.5T527-522q-20 0-38.5-7T456-550l-75-74-175 175q-3 3-4.5 6.5T200-435q0 8 6 14.5t14 6.5q4 0 8-2t6-4l108-108q11-11 27.5-11.5T398-528q11 11 11 28t-11 28L291-364q-3 3-4.5 6.5T285-350q0 8 6 14t14 6q4 0 8-2t6-4l108-107q11-11 27.5-11.5T483-443q11 11 11 28t-11 28L376-279q-3 2-4.5 6t-1.5 8q0 8 6 14t14 6q4 0 7.5-1.5t6.5-4.5l108-107q11-11 27.5-11.5T568-358q11 11 11 28t-11 28L460-194q-3 3-4.5 6.5T454-180q0 8 6.5 14t14.5 6Zm-1 80q-37 0-65.5-24.5T375-166q-34-5-57-28t-28-57q-34-5-56.5-28.5T206-336q-38-5-62-33t-24-66q0-20 7.5-38.5T149-506l175-175q23-23 56.5-23t56.5 23l75 75q2 3 6 4.5t8 1.5q9 0 15-5.5t6-14.5q0-4-1.5-8t-4.5-6L398-777q-11-12-25.5-17.5T342-800q-15 0-30 5.5T285-777L144-635q-14 14-20 33t-3 38q3 17-7 30t-27 15q-17 2-30-7.5T42-553q-6-38 5.5-74.5T87-692l141-141q24-23 53.5-35t60.5-12q31 0 60.5 12t52.5 35l11 11 11-11q24-23 53.5-35t60.5-12q31 0 60.5 12t52.5 35l169 169q23 23 35 53t12 61q0 31-12 60.5T873-437L545-110q-14 14-32.5 22T474-80Z",
      visibility_off: "M607-627q29 29 42.5 66t9.5 76q0 15-11 25.5T622-449q-15 0-25.5-10.5T586-485q5-26-3-50t-25-41q-17-17-41-26t-51-4q-15 0-25.5-11T430-643q0-15 10.5-25.5T466-679q38-4 75 9.5t66 42.5Zm-127-93q-19 0-37 1.5t-36 5.5q-17 3-30.5-5T358-742q-5-16 3.5-31t24.5-18q23-5 46.5-7t47.5-2q137 0 250.5 72T904-534q4 8 6 16.5t2 17.5q0 9-1.5 17.5T905-466q-18 40-44.5 75T802-327q-12 11-28 9t-26-16q-10-14-8.5-30.5T753-392q24-23 44-50t35-58q-50-101-144.5-160.5T480-720Zm0 520q-134 0-245-72.5T60-463q-5-8-7.5-17.5T50-500q0-10 2-19t7-18q20-40 46.5-76.5T166-680l-83-84q-11-12-10.5-28.5T84-820q11-11 28-11t28 11l680 680q11 11 11.5 27.5T820-84q-11 11-28 11t-28-11L624-222q-35 11-71 16.5t-73 5.5ZM222-624q-29 26-53 57t-41 67q50 101 144.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Z",
      gavel: "M200-200h400q17 0 28.5 11.5T640-160q0 17-11.5 28.5T600-120H200q-17 0-28.5-11.5T160-160q0-17 11.5-28.5T200-200Zm129-171L216-484q-23-23-23.5-56.5T215-597l29-29 228 226-29 29q-23 23-57 23t-57-23Zm311-197L414-796l29-29q23-23 56.5-22.5T556-824l113 113q23 23 23 57t-23 57l-29 29Zm156 380L302-682l56-56 494 494q11 11 11 28t-11 28q-11 11-28 11t-28-11Z",
      auto_awesome: "m706-706-70-32q-6-3-8.5-8t-2.5-10q0-5 2.5-10t8.5-8l70-32 32-70q3-6 8-9t10-3q5 0 10 3t8 9l32 70 70 32q6 3 9 8t3 10q0 5-3 10t-9 8l-70 32-32 70q-3 6-8 8.5t-10 2.5q-5 0-10-2.5t-8-8.5l-32-70ZM260-380l-160-73q-9-4-13-11.5T83-480q0-8 4-15.5t13-11.5l160-73 73-160q4-9 11.5-13t15.5-4q8 0 15.5 4t11.5 13l73 160 160 73q9 4 13 11.5t4 15.5q0 8-4 15.5T620-453l-160 73-73 160q-4 9-11.5 13t-15.5 4q-8 0-15.5-4T333-220l-73-160Zm100 26 40-86 86-40-86-40-40-86-40 86-86 40 86 40 40 86Zm350 204-70-32q-6-3-9-8t-3-10q0-5 3-10t9-8l70-32 32-70q3-6 8-9t10-3q5 0 10 3t8 9l32 70 70 32q6 3 9 8t3 10q0 5-3 10t-9 8l-70 32-32 70q-3 6-8 9t-10 3q-5 0-10-3t-8-9l-32-70Z",
      forum: "M840-136q-8 0-15-3t-13-9l-92-92H320q-33 0-56.5-23.5T240-320v-40h440q33 0 56.5-23.5T760-440v-280h40q33 0 56.5 23.5T880-640v463q0 18-12 29.5T840-136ZM160-473l47-47h393v-280H160v327Zm-40 137q-16 0-28-11.5T80-377v-423q0-33 23.5-56.5T160-880h440q33 0 56.5 23.5T680-800v280q0 33-23.5 56.5T600-440H240l-92 92q-6 6-13 9t-15 3Z",
      spa: "M448-85q-70-13-136-45t-117.5-89q-51.5-57-83-141T80-560v-8q0-14 9-23t23-9h8q51 0 105 13t101 39q11-74 44-152t79-141q12-17 31-17t31 17q46 63 79 141t44 152q47-26 101-39t105-13h4q15 0 25.5 10.5T880-564v4q0 116-31.5 200t-83 141Q714-162 648-130T512-85q-13 2-32 2t-32-2Zm30-77q-11-165-99.5-250.5T162-518q11 169 102.5 254T478-162Zm-76-340q20 17 42 40.5t36 45.5q15-22 36.5-45.5T558-502q-2-57-22.5-119T480-742q-35 59-55.5 121T402-502Zm122 170q12 32 20.5 70t13.5 82q36-12 76-36t74-64q34-40 59-98.5T798-518q-94 14-165 62.5T524-332Z",
      face: "M324.5-404.5Q310-419 310-440t14.5-35.5Q339-490 360-490t35.5 14.5Q410-461 410-440t-14.5 35.5Q381-390 360-390t-35.5-14.5Zm240 0Q550-419 550-440t14.5-35.5Q579-490 600-490t35.5 14.5Q650-461 650-440t-14.5 35.5Q621-390 600-390t-35.5-14.5ZM480-160q134 0 227-93t93-227q0-24-3-46.5T786-570q-21 5-42 7.5t-44 2.5q-91 0-172-39T390-708q-32 78-91.5 135.5T160-486v6q0 134 93 227t227 93Zm0 80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-54-715q42 70 114 112.5T700-640q14 0 27-1.5t27-3.5q-42-70-114-112.5T480-800q-14 0-27 1.5t-27 3.5ZM177-581q51-29 89-75t57-103q-51 29-89 75t-57 103Z",
      switch_account: "M645-555q35-35 35-85t-35-85q-35-35-85-35t-85 35q-35 35-35 85t35 85q35 35 85 35t85-35ZM320-330q45-53 108-81.5T560-440q69 0 132 28.5T800-330v-470H320v470Zm0 90q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320ZM160-80q-33 0-56.5-23.5T80-160v-520q0-17 11.5-28.5T120-720q17 0 28.5 11.5T160-680v520h520q17 0 28.5 11.5T720-120q0 17-11.5 28.5T680-80H160Zm268-240h264q-29-20-63-30t-69-10q-35 0-69 10t-63 30Z",
      medical_services: "M440-360v80q0 17 11.5 28.5T480-240q17 0 28.5-11.5T520-280v-80h80q17 0 28.5-11.5T640-400q0-17-11.5-28.5T600-440h-80v-80q0-17-11.5-28.5T480-560q-17 0-28.5 11.5T440-520v80h-80q-17 0-28.5 11.5T320-400q0 17 11.5 28.5T360-360h80ZM160-80q-33 0-56.5-23.5T80-160v-480q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v480q0 33-23.5 56.5T800-80H160Zm0-80h640v-480H160v480Zm240-560h160v-80H400v80Z",
      timer_off: "M480-800q60 0 117.5 20T706-722l28-28q11-11 28-11t28 11q11 11 11 28t-11 28l-28 28q38 51 58 108.5T840-440q0 26-4 51.5T824-337q-7 22-22.5 29t-29.5 2q-14-5-23.5-18t-3.5-30q8-22 11.5-43.5T760-440q0-116-82-198t-198-82q-20 0-43 3.5T391-705q-17 5-29-4t-17-23q-5-14 1.5-29.5T373-784q26-8 53-12t54-4Zm40 248v-48q0-17-11.5-28.5T480-640q-10 0-18.5 4T448-624l72 72ZM480-80q-74 0-139.5-28.5T226-186q-49-49-77.5-114.5T120-440q0-60 18.5-115.5T192-656L84-764q-11-11-11-28t11-28q11-11 28-11t28 11l680 680q11 11 11 28t-11 28q-11 11-28 11t-28-11l-68-68q-48 35-103.5 53.5T480-80Zm0-80q42 0 82-13t75-37L248-599q-24 35-36 75t-12 84q0 116 82 198t198 82Zm-80-680q-17 0-28.5-11.5T360-880q0-17 11.5-28.5T400-920h160q17 0 28.5 11.5T600-880q0 17-11.5 28.5T560-840H400Z",
      door_sliding: "M331.5-451.5Q320-463 320-480t11.5-28.5Q343-520 360-520t28.5 11.5Q400-497 400-480t-11.5 28.5Q377-440 360-440t-28.5-11.5Zm240 0Q560-463 560-480t11.5-28.5Q583-520 600-520t28.5 11.5Q640-497 640-480t-11.5 28.5Q617-440 600-440t-28.5-11.5ZM160-120q-17 0-28.5-11.5T120-160q0-16 14.5-22.5T160-200v-560q0-33 23.5-56.5T240-840h480q33 0 56.5 23.5T800-760v560q17 0 28.5 11.5T840-160q0 17-11.5 28.5T800-120H160Zm80-80h200v-560H240v560Zm280 0h200v-560H520v560Z",
      near_me: "M402-402 143-507q-13-5-19-15.5t-6-21.5q0-11 6.5-21.5T144-581l614-228q12-5 23-2t19 11q8 8 11 19t-2 23L581-144q-5 13-15.5 19.5T544-118q-11 0-21.5-6T507-143L402-402Zm140 134 162-436-436 162 196 78 78 196Z",
      shield_moon: "M501-320q38 0 74.5-16t63.5-48q7-8 3-18t-14-12q-38-6-72-28.5T501-502q-20-35-23.5-75.5T488-656q4-10-2.5-18t-17.5-6q-69 13-109 65t-40 115q0 75 53.5 127.5T501-320ZM467-85q-6-1-12-3-135-45-215-166.5T160-516v-189q0-25 14.5-45t37.5-29l240-90q14-5 28-5t28 5l240 90q23 9 37.5 29t14.5 45v189q0 140-80 261.5T505-88q-6 2-12 3t-13 1q-7 0-13-1Zm13-79q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Z",
      thunderstorm: "M327-40q-10 0-15.5-8T309-65l27-75h-62q-5 0-8-4t-1-9l38-107q3-9 10.5-14.5T331-280h49q11 0 17 9t1 19l-31 72h62q6 0 9 5.5t-1 10.5L346-47q-3 4-7 5.5T327-40Zm270-40q-10 0-15.5-8t-2.5-17l19-55h-64q-5 0-8-4t-1-9l31-87q3-9 10.5-14.5T584-280h48q11 0 17.5 9t1.5 19l-23 52h61q6 0 8.5 5.5T696-184l-80 97q-1 1-19 7ZM300-320q-91 0-155.5-64.5T80-540q0-83 55-145t136-73q32-57 87.5-89.5T480-880q90 0 156.5 57.5T717-679q69 6 116 57t47 122q0 75-52.5 127.5T700-320H300Zm0-80h400q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-40q0-66-47-113t-113-47q-48 0-87.5 26T333-704l-10 24h-25q-57 2-97.5 42.5T160-540q0 58 41 99t99 41Z"
    }), n = V(() => a[t.name] || a.auto_awesome);
    return (l, i) => (v(), b("svg", ry, [s("path", { d: n.value }, null, 8, oy)]));
  }
}), En = uy, dy = ["aria-labelledby"], cy = ["id"], fy = { class: "shop-dialog-item" }, vy = [
  "onUpdate:modelValue",
  "maxlength",
  "placeholder"
], py = {
  key: 0,
  class: "shop-dialog-error",
  role: "alert"
}, my = { class: "shop-dialog-actions" }, gy = ["disabled"], by = ["disabled"], hy = /* @__PURE__ */ se({
  __name: "ShopActionDialog",
  props: {
    mode: {},
    item: {},
    activation: {},
    busy: { type: Boolean },
    error: {}
  },
  emits: ["cancel", "confirm"],
  setup(e, { emit: t }) {
    const a = e, n = t, l = /* @__PURE__ */ _t({}), i = V(() => a.mode === "purchase" ? "确认购入" : a.mode === "deactivate" ? "关闭效果" : "确认使用"), r = V(() => a.mode === "purchase" ? `将支付 ${a.item.price} 小白币，奇物会先放入背包。` : a.mode === "deactivate" ? "关闭后将从下一次回复起停止影响剧情，已经发生的事实不会消失。" : a.item.duration === "permanent" ? "这件奇物将永久影响后续剧情，使用后无法关闭。" : `使用后从下一次回复起${a.item.durationLabel}。`), o = V(() => a.mode !== "use" || a.item.inputs.every((p) => String(l[p.key] || "").trim().length > 0));
    function u() {
      !a.busy && o.value && n("confirm", { ...l });
    }
    return (p, d) => (v(), b("dialog", {
      open: "",
      class: "shop-dialog",
      "aria-labelledby": `shop-dialog-${e.mode}`,
      onClick: d[1] || (d[1] = tt((y) => !e.busy && p.$emit("cancel"), ["self"])),
      onKeydown: d[2] || (d[2] = pr(tt((y) => !e.busy && p.$emit("cancel"), ["stop", "prevent"]), ["esc"]))
    }, [s("form", {
      method: "dialog",
      class: "shop-dialog-card",
      onSubmit: tt(u, ["prevent"])
    }, [
      s("h2", { id: `shop-dialog-${e.mode}` }, g(i.value), 9, cy),
      s("div", fy, [s("span", null, [be(En, { name: e.item.icon }, null, 8, ["name"])]), s("div", null, [s("strong", null, g(e.item.name), 1), s("small", null, g(e.item.durationLabel), 1)])]),
      (v(!0), b(J, null, de(e.mode === "use" ? e.item.inputs : [], (y) => (v(), b("label", {
        key: y.key,
        class: "shop-dialog-field"
      }, [s("span", null, g(y.label), 1), Me(s("input", {
        "onUpdate:modelValue": (w) => l[y.key] = w,
        type: "text",
        maxlength: y.maxLength,
        placeholder: y.placeholder,
        autocomplete: "off",
        required: ""
      }, null, 8, vy), [[De, l[y.key]]])]))), 128)),
      s("p", { class: ae(["shop-dialog-warning", { "is-permanent": e.mode === "use" && e.item.duration === "permanent" }]) }, g(r.value), 3),
      e.error ? (v(), b("p", py, g(e.error), 1)) : H("", !0),
      s("div", my, [s("button", {
        type: "button",
        disabled: e.busy,
        onClick: d[0] || (d[0] = (y) => p.$emit("cancel"))
      }, "再想想", 8, gy), s("button", {
        type: "submit",
        class: "is-primary",
        disabled: e.busy || !o.value
      }, g(e.busy ? "正在封存…" : e.mode === "purchase" ? "确认支付" : e.mode === "deactivate" ? "确认关闭" : "确认使用"), 9, by)])
    ], 32)], 40, dy));
  }
}), yy = hy, ky = {
  class: "shop-inventory",
  "aria-labelledby": "shop-inventory-title"
}, wy = { class: "shop-section-heading" }, Ty = {
  key: 0,
  class: "shop-write-reason",
  role: "status"
}, xy = {
  class: "shop-inventory-group",
  "aria-labelledby": "shop-active-title"
}, $y = {
  key: 0,
  class: "shop-activation-list"
}, Sy = { class: "shop-mini-mark" }, _y = [
  "disabled",
  "title",
  "onClick"
], qy = {
  key: 1,
  class: "shop-empty-copy"
}, Cy = {
  class: "shop-inventory-group",
  "aria-labelledby": "shop-held-title"
}, My = {
  key: 0,
  class: "shop-held-grid"
}, Ay = { class: "shop-mini-mark" }, Iy = [
  "disabled",
  "title",
  "onClick"
], Ey = {
  key: 1,
  class: "shop-empty-copy"
}, Py = {
  key: 1,
  class: "shop-inventory-group is-exhausted"
}, Oy = ["aria-expanded"], Ry = {
  key: 0,
  class: "shop-exhausted-list"
}, By = { key: 0 }, Ly = /* @__PURE__ */ se({
  __name: "ShopInventory",
  props: {
    catalog: {},
    activations: {},
    writeDisabledReason: {}
  },
  emits: ["use", "deactivate"],
  setup(e) {
    const t = e, a = /* @__PURE__ */ K(!1), n = V(() => t.activations.filter((o) => o.state === "active")), l = V(() => t.catalog.filter((o) => o.quantity > 0)), i = V(() => t.catalog.filter((o) => o.purchasedCount > 0 && o.quantity === 0)), r = V(() => {
      const o = /* @__PURE__ */ new Map();
      for (const u of t.activations) u.state !== "active" && o.set(u.itemId, (o.get(u.itemId) || 0) + 1);
      return o;
    });
    return (o, u) => (v(), b("section", ky, [
      s("header", wy, [u[1] || (u[1] = s("h2", { id: "shop-inventory-title" }, "我的奇物", -1)), s("small", null, g(l.value.reduce((p, d) => p + d.quantity, 0)) + " 件可用", 1)]),
      e.writeDisabledReason ? (v(), b("p", Ty, g(e.writeDisabledReason), 1)) : H("", !0),
      s("section", xy, [s("header", null, [u[2] || (u[2] = s("h3", { id: "shop-active-title" }, "生效中", -1)), s("span", null, g(n.value.length), 1)]), n.value.length ? (v(), b("div", $y, [(v(!0), b(J, null, de(n.value, (p) => (v(), b("article", {
        key: p.activationId,
        class: "shop-activation-card"
      }, [
        s("div", Sy, [be(En, { name: p.icon }, null, 8, ["name"])]),
        s("div", null, [
          s("h4", null, g(p.name), 1),
          (v(!0), b(J, null, de(p.parameters, (d) => (v(), b("p", { key: d.label }, [s("span", null, g(d.label), 1), ue(g(d.value), 1)]))), 128)),
          s("small", null, g(p.stateLabel), 1)
        ]),
        p.canDeactivate ? (v(), b("button", {
          key: 0,
          type: "button",
          disabled: !!e.writeDisabledReason,
          title: e.writeDisabledReason,
          onClick: (d) => o.$emit("deactivate", p)
        }, " 关闭 ", 8, _y)) : H("", !0)
      ]))), 128))])) : (v(), b("p", qy, "尚无正在影响剧情的奇物。"))]),
      s("section", Cy, [s("header", null, [u[3] || (u[3] = s("h3", { id: "shop-held-title" }, "持有", -1)), s("span", null, g(l.value.length), 1)]), l.value.length ? (v(), b("div", My, [(v(!0), b(J, null, de(l.value, (p) => (v(), b("article", {
        key: p.id,
        class: "shop-held-card"
      }, [
        s("div", Ay, [be(En, { name: p.icon }, null, 8, ["name"])]),
        s("div", null, [s("h4", null, g(p.name), 1), s("p", null, g(p.durationLabel), 1)]),
        s("strong", null, "×" + g(p.quantity), 1),
        s("button", {
          type: "button",
          disabled: !!e.writeDisabledReason,
          title: e.writeDisabledReason,
          onClick: (d) => o.$emit("use", p)
        }, " 使用 ", 8, Iy)
      ]))), 128))])) : (v(), b("p", Ey, "背包还是空的，去货架挑一件吧。"))]),
      i.value.length ? (v(), b("section", Py, [s("button", {
        type: "button",
        class: "shop-collapse-button",
        "aria-expanded": a.value,
        onClick: u[0] || (u[0] = (p) => a.value = !a.value)
      }, [
        u[4] || (u[4] = s("span", null, "已耗尽", -1)),
        s("small", null, g(i.value.length), 1),
        u[5] || (u[5] = s("i", { "aria-hidden": "true" }, "⌄", -1))
      ], 8, Oy), a.value ? (v(), b("div", Ry, [(v(!0), b(J, null, de(i.value, (p) => (v(), b("article", { key: p.id }, [s("span", null, g(p.name), 1), s("small", null, [ue("购入 " + g(p.purchasedCount) + " 次", 1), r.value.get(p.id) ? (v(), b("span", By, " · 已结束 " + g(r.value.get(p.id)), 1)) : H("", !0)])]))), 128))])) : H("", !0)])) : H("", !0)
    ]));
  }
}), Dy = Ly, Ny = {
  class: "shop-shelf",
  "aria-labelledby": "shop-shelf-title"
}, Uy = { class: "shop-section-heading" }, Fy = {
  class: "shop-category-strip",
  "aria-label": "商品分类"
}, Hy = ["onClick"], jy = { class: "shop-product-grid" }, Ky = { class: "shop-product-mark" }, Gy = { class: "shop-product-copy" }, zy = { class: "shop-product-title" }, Vy = { class: "shop-product-footer" }, Zy = { key: 0 }, Wy = [
  "disabled",
  "title",
  "onClick"
], Yy = {
  key: 0,
  class: "shop-card-reason"
}, Qy = /* @__PURE__ */ se({
  __name: "ShopShelf",
  props: {
    catalog: {},
    balance: {},
    writeDisabledReason: {}
  },
  emits: ["purchase"],
  setup(e) {
    const t = e, a = /* @__PURE__ */ K("all"), n = V(() => t.catalog.filter((u) => u.onShelf)), l = V(() => {
      const u = /* @__PURE__ */ new Map();
      for (const p of n.value) u.set(p.category, p.categoryLabel);
      return [{
        id: "all",
        label: "全部"
      }, ...Array.from(u, ([p, d]) => ({
        id: p,
        label: d
      }))];
    }), i = V(() => a.value === "all" ? n.value : n.value.filter((u) => u.category === a.value));
    function r(u) {
      return t.writeDisabledReason ? t.writeDisabledReason : o(u);
    }
    function o(u) {
      return u.purchaseLimit !== null && u.purchasedCount >= u.purchaseLimit ? "此奇物已达购买上限" : t.balance < u.price ? `还差 ${u.price - t.balance} 小白币` : "";
    }
    return (u, p) => (v(), b("section", Ny, [
      s("header", Uy, [p[0] || (p[0] = s("h2", { id: "shop-shelf-title" }, "今日陈列", -1)), s("small", null, g(i.value.length) + " 件奇物", 1)]),
      s("nav", Fy, [(v(!0), b(J, null, de(l.value, (d) => (v(), b("button", {
        key: d.id,
        type: "button",
        class: ae({ "is-active": a.value === d.id }),
        onClick: (y) => a.value = d.id
      }, g(d.label), 11, Hy))), 128))]),
      s("div", jy, [(v(!0), b(J, null, de(i.value, (d) => (v(), b("article", {
        key: d.id,
        class: "shop-product-card"
      }, [s("div", Ky, [be(En, { name: d.icon }, null, 8, ["name"])]), s("div", Gy, [
        s("div", zy, [s("h3", null, g(d.name), 1), s("span", null, g(d.categoryLabel), 1)]),
        s("p", null, g(d.description), 1),
        s("small", null, g(d.durationLabel), 1),
        s("div", Vy, [
          s("strong", null, [p[1] || (p[1] = s("i", null, "¤", -1)), ue(g(d.price), 1)]),
          d.quantity ? (v(), b("span", Zy, "持有 " + g(d.quantity), 1)) : H("", !0),
          s("button", {
            type: "button",
            disabled: !!r(d),
            title: r(d),
            onClick: (y) => u.$emit("purchase", d)
          }, g(d.purchaseLimit !== null && d.purchasedCount >= d.purchaseLimit ? "已购得" : "购入"), 9, Wy)
        ]),
        o(d) ? (v(), b("p", Yy, g(o(d)), 1)) : H("", !0)
      ])]))), 128))])
    ]));
  }
}), Xy = Qy, Jy = { class: "shop-app" }, e2 = { class: "shop-header" }, t2 = {
  class: "shop-balance",
  "aria-label": "小白币余额"
}, a2 = ["disabled"], n2 = {
  class: "shop-root-tabs",
  "aria-label": "商店页面"
}, s2 = { key: 0 }, l2 = ["disabled"], i2 = ["disabled"], r2 = { class: "shop-scroll" }, ds = 35e3, o2 = /* @__PURE__ */ se({
  __name: "ShopApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const t = e, a = /* @__PURE__ */ K(structuredClone(/* @__PURE__ */ oe(t.initialState))), n = /* @__PURE__ */ K("shelf"), l = /* @__PURE__ */ K(null), i = /* @__PURE__ */ K(!1), r = /* @__PURE__ */ K(!1), o = /* @__PURE__ */ K(""), u = /* @__PURE__ */ K("");
    let p = () => {
    }, d = 0;
    const y = V(() => a.value.status === "unconfirmed"), w = V(() => r.value ? "正在处理上一项操作" : i.value ? "正在刷新商店状态" : a.value.status !== "ready" ? a.value.message || "商店暂时不可写入" : a.value.generationActive ? "主剧情正在生成，请等待回复完成" : ""), h = V(() => i.value || r.value || y.value);
    function q() {
      return typeof globalThis.crypto?.randomUUID == "function" ? `shop-ui:${globalThis.crypto.randomUUID()}` : `shop-ui:${Date.now()}:${Math.random().toString(36).slice(2, 10)}`;
    }
    function P() {
      return { chatIdentity: a.value.chatIdentity };
    }
    function R($) {
      a.value = structuredClone($), i.value = !1, o.value = "";
    }
    function D($) {
      const _ = $ instanceof Error ? $.message : String($);
      return _.includes("cannot be overdrawn") ? "小白币余额不足，未完成购买。" : _.includes("shop_main_generation_active") ? "主剧情正在生成，请等待回复完成。" : _.includes("shop_revision_conflict") || _.includes("shop_event_id_conflict") ? "商店状态已变化，请关闭确认框后重试。" : _ === "host_request_timeout" ? "等待保存结果超时，请使用同一确认框重试。" : "商店操作未完成，请稍后重试。";
    }
    async function L() {
      if (h.value) return;
      const $ = ++d;
      i.value = !0, o.value = "";
      try {
        const _ = await t.bridge.request("shop/refresh", P(), ds);
        $ === d && R(_.result);
      } catch (_) {
        $ === d && (o.value = D(_));
      } finally {
        $ === d && (i.value = !1);
      }
    }
    async function A() {
      if (i.value || r.value) return;
      const $ = ++d;
      i.value = !0, o.value = "";
      try {
        const _ = await t.bridge.request("shop/confirm-save", P(), ds);
        $ === d && R(_.result.state);
      } catch (_) {
        $ === d && (o.value = D(_));
      } finally {
        $ === d && (i.value = !1);
      }
    }
    function C($, _, S) {
      w.value || (u.value = "", l.value = {
        mode: $,
        item: _,
        activation: S,
        actionId: q()
      });
    }
    function T() {
      r.value || (l.value = null, u.value = "");
    }
    async function M($) {
      const _ = l.value;
      if (!_ || r.value) return;
      r.value = !0, u.value = "";
      const S = d, G = _.mode === "purchase" ? "shop/purchase" : _.mode === "use" ? "shop/activate" : "shop/deactivate";
      try {
        const te = await t.bridge.request(G, {
          ...P(),
          expectedRevision: a.value.revision,
          expectedEventId: a.value.eventId,
          actionId: _.actionId,
          itemId: _.item.id,
          ..._.mode === "use" ? { parameters: $ } : {},
          ..._.activation ? { activationId: _.activation.activationId } : {}
        }, ds);
        if (S !== d || l.value !== _) return;
        R(te.result), l.value = null;
      } catch (te) {
        S === d && l.value === _ && (u.value = D(te));
      } finally {
        S === d && (r.value = !1);
      }
    }
    return at(() => {
      p = t.bridge.subscribe(($) => {
        $.type === "shop/state" && (r.value || (d += 1), R($.payload.state)), $.type === "shop/error" && (o.value = D($.payload?.message || ""));
      });
    }), ot(() => {
      d += 1, p(), l.value = null;
    }), ($, _) => (v(), b("main", Jy, [
      s("header", e2, [
        _[7] || (_[7] = s("div", null, [s("h1", null, "奇物商店")], -1)),
        s("div", t2, [_[5] || (_[5] = s("small", null, "余额", -1)), s("strong", null, "¤ " + g(a.value.balance), 1)]),
        s("button", {
          type: "button",
          class: "shop-refresh",
          disabled: h.value,
          title: "重新读取商店",
          onClick: L
        }, [..._[6] || (_[6] = [s("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [s("path", { d: "M20 7v5h-5M4 17v-5h5M18.2 9A7 7 0 0 0 6.1 6.7L4 9m16 6-2.1 2.3A7 7 0 0 1 5.8 15" })], -1), s("span", { class: "shop-sr-only" }, "重新读取商店", -1)])], 8, a2)
      ]),
      s("nav", n2, [s("button", {
        type: "button",
        class: ae({ "is-active": n.value === "shelf" }),
        onClick: _[0] || (_[0] = (S) => n.value = "shelf")
      }, "货架", 2), s("button", {
        type: "button",
        class: ae({ "is-active": n.value === "inventory" }),
        onClick: _[1] || (_[1] = (S) => n.value = "inventory")
      }, [_[8] || (_[8] = ue(" 背包", -1)), a.value.catalog.some((S) => S.quantity) ? (v(), b("span", s2, g(a.value.catalog.reduce((S, G) => S + G.quantity, 0)), 1)) : H("", !0)], 2)]),
      a.value.message || o.value ? (v(), b("aside", {
        key: 0,
        class: ae(["shop-notice", `is-${a.value.status}`]),
        role: "status"
      }, [_[9] || (_[9] = s("span", { "aria-hidden": "true" }, "印", -1)), s("div", null, [
        s("strong", null, g(a.value.status === "unconfirmed" ? "保存待核实" : a.value.status === "conflict" ? "状态冲突" : "商店状态"), 1),
        s("p", null, g(o.value || a.value.message), 1),
        y.value ? (v(), b("button", {
          key: 0,
          type: "button",
          disabled: i.value,
          onClick: A
        }, g(i.value ? "正在核实…" : "核实保存结果"), 9, l2)) : a.value.status === "blocked" ? (v(), b("button", {
          key: 1,
          type: "button",
          disabled: i.value,
          onClick: L
        }, g(i.value ? "正在读取…" : "重新读取"), 9, i2)) : H("", !0)
      ])], 2)) : H("", !0),
      s("div", r2, [n.value === "shelf" ? (v(), ge(Xy, {
        key: 0,
        catalog: a.value.catalog,
        balance: a.value.balance,
        "write-disabled-reason": w.value,
        onPurchase: _[2] || (_[2] = (S) => C("purchase", S))
      }, null, 8, [
        "catalog",
        "balance",
        "write-disabled-reason"
      ])) : (v(), ge(Dy, {
        key: 1,
        catalog: a.value.catalog,
        activations: a.value.activations,
        "write-disabled-reason": w.value,
        onUse: _[3] || (_[3] = (S) => C("use", S)),
        onDeactivate: _[4] || (_[4] = (S) => {
          const G = a.value.catalog.find((te) => te.id === S.itemId);
          G && C("deactivate", G, S);
        })
      }, null, 8, [
        "catalog",
        "activations",
        "write-disabled-reason"
      ]))]),
      l.value ? (v(), ge(yy, {
        key: 1,
        mode: l.value.mode,
        item: l.value.item,
        activation: l.value.activation,
        busy: r.value,
        error: u.value,
        onCancel: T,
        onConfirm: M
      }, null, 8, [
        "mode",
        "item",
        "activation",
        "busy",
        "error"
      ])) : H("", !0)
    ]));
  }
}), u2 = o2, d2 = Object.freeze({
  id: "wallet",
  name: "钱包",
  accent: "#a9660f"
}), c2 = { class: "wallet-ui-header" }, f2 = { class: "wallet-ui-header-copy" }, v2 = { class: "wallet-ui-title" }, p2 = /* @__PURE__ */ se({
  __name: "WalletAppHeader",
  props: { title: {} },
  setup(e) {
    return (t, a) => (v(), b("header", c2, [s("div", f2, [s("h1", v2, g(e.title), 1)])]));
  }
}), m2 = p2, g2 = {
  class: "wallet-balance wallet-ui-rise",
  "aria-labelledby": "wallet-balance-title"
}, b2 = { class: "wallet-balance-chip" }, h2 = ["aria-label"], y2 = /* @__PURE__ */ se({
  __name: "WalletBalanceCard",
  props: {
    balance: {},
    currency: {},
    status: {}
  },
  setup(e) {
    const t = e, a = V(() => Number(t.balance).toLocaleString("zh-CN")), n = V(() => ({
      ready: "账目就绪",
      loading: "正在开户",
      saving: "正在保存",
      unconfirmed: "保存待确认",
      conflict: "账目已冻结",
      blocked: "暂时不可用"
    })[t.status]);
    return (l, i) => (v(), b("section", g2, [
      s("header", null, [i[0] || (i[0] = s("p", { id: "wallet-balance-title" }, "当前结余", -1)), s("span", b2, [s("i", {
        class: ae(`is-${e.status}`),
        "aria-hidden": "true"
      }, null, 2), ue(g(n.value), 1)])]),
      s("div", {
        class: "wallet-balance-value",
        "aria-label": `${a.value} ${e.currency}`
      }, [i[1] || (i[1] = s("span", { "aria-hidden": "true" }, "¤", -1)), ue(g(a.value), 1)], 8, h2),
      s("footer", null, g(e.currency), 1)
    ]));
  }
}), k2 = y2, w2 = {
  class: "wallet-ui-notice-icon",
  "aria-hidden": "true"
}, T2 = { class: "wallet-ui-notice-copy" }, x2 = { key: 0 }, $2 = /* @__PURE__ */ se({
  __name: "WalletNotice",
  props: {
    title: {},
    message: { default: "" },
    tone: { default: "info" }
  },
  setup(e) {
    return (t, a) => (v(), b("aside", {
      class: ae(["wallet-ui-notice", `is-${e.tone}`]),
      role: "status"
    }, [s("span", w2, [_n(t.$slots, "icon", {}, () => [a[0] || (a[0] = ue("!", -1))])]), s("div", T2, [
      s("strong", null, g(e.title), 1),
      e.message ? (v(), b("p", x2, g(e.message), 1)) : H("", !0),
      _n(t.$slots, "default")
    ])], 2));
  }
}), S2 = $2, _2 = { class: "wallet-ui-empty" }, q2 = {
  key: 0,
  class: "wallet-ui-empty-icon",
  "aria-hidden": "true"
}, C2 = { key: 1 }, M2 = /* @__PURE__ */ se({
  __name: "WalletEmpty",
  props: {
    title: {},
    message: { default: "" }
  },
  setup(e) {
    return (t, a) => (v(), b("div", _2, [
      t.$slots.icon ? (v(), b("span", q2, [_n(t.$slots, "icon")])) : H("", !0),
      s("strong", null, g(e.title), 1),
      e.message ? (v(), b("p", C2, g(e.message), 1)) : H("", !0)
    ]));
  }
}), A2 = M2, I2 = {
  class: "wallet-row-mark",
  "aria-hidden": "true"
}, E2 = { viewBox: "0 0 24 24" }, P2 = ["d"], O2 = { class: "wallet-row-copy" }, R2 = { key: 0 }, B2 = { class: "wallet-row-amount" }, L2 = /* @__PURE__ */ se({
  __name: "WalletTransactionRow",
  props: { transaction: {} },
  setup(e) {
    const t = {
      income: "M12 5v14m0 0-5.5-5.5M12 19l5.5-5.5",
      expense: "M12 19V5m0 0L6.5 10.5M12 5l5.5 5.5",
      transfer: "M4 9h16m0 0-4-4m4 4-4 4M20 15H4m0 0 4 4m-4-4 4-4"
    }, a = e, n = V(() => t[a.transaction.direction] || t.transfer), l = V(() => {
      const r = a.transaction.amount.toLocaleString("zh-CN");
      return a.transaction.direction === "income" ? `+${r}` : a.transaction.direction === "expense" ? `−${r}` : r;
    }), i = V(() => {
      const r = new Date(a.transaction.createdAt), o = new Intl.DateTimeFormat("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: !1
      }).format(r);
      return a.transaction.sequence === 1 && a.transaction.sourceDomain === "economy" ? `开户 · ${o}` : o;
    });
    return (r, o) => (v(), b("li", { class: ae(["wallet-row", `is-${e.transaction.direction}`]) }, [
      s("span", I2, [(v(), b("svg", E2, [s("path", { d: n.value }, null, 8, P2)]))]),
      s("div", O2, [
        s("strong", null, g(e.transaction.title), 1),
        e.transaction.note ? (v(), b("p", R2, g(e.transaction.note), 1)) : H("", !0),
        s("small", null, g(e.transaction.source) + " · " + g(i.value), 1)
      ]),
      s("span", B2, g(l.value), 1)
    ], 2));
  }
}), D2 = L2, N2 = {
  key: 1,
  class: "wallet-ui-list"
}, U2 = {
  key: 2,
  class: "wallet-ledger-foot"
}, F2 = {
  key: 0,
  class: "wallet-load-error",
  role: "alert"
}, H2 = ["disabled"], j2 = {
  key: 2,
  class: "wallet-ledger-end"
}, K2 = /* @__PURE__ */ se({
  __name: "WalletTransactionList",
  props: {
    transactions: {},
    hasMore: { type: Boolean },
    loadingMore: { type: Boolean },
    error: {}
  },
  emits: ["loadMore"],
  setup(e) {
    return (t, a) => (v(), b("div", null, [e.transactions.length === 1 && e.transactions[0]?.sequence === 1 && e.transactions[0]?.sourceDomain === "economy" ? (v(), ge(A2, {
      key: 0,
      title: "新账簿已经启用",
      message: "除了开户赠礼，还没有其他收支。"
    }, {
      icon: ia(() => [...a[1] || (a[1] = [s("svg", { viewBox: "0 0 24 24" }, [s("path", { d: "m5 12.5 4.5 4.5L19 7.5" })], -1)])]),
      _: 1
    })) : (v(), b("ol", N2, [(v(!0), b(J, null, de(e.transactions, (n) => (v(), ge(D2, {
      key: n.id,
      transaction: n
    }, null, 8, ["transaction"]))), 128))])), e.hasMore || e.transactions.length > 1 ? (v(), b("div", U2, [e.error ? (v(), b("p", F2, g(e.error), 1)) : H("", !0), e.hasMore ? (v(), b("button", {
      key: 1,
      type: "button",
      class: "wallet-ui-text-button",
      disabled: e.loadingMore,
      onClick: a[0] || (a[0] = (n) => t.$emit("loadMore"))
    }, g(e.loadingMore ? "正在翻阅…" : "翻阅更早账目"), 9, H2)) : (v(), b("span", j2, "账簿至此"))])) : H("", !0)]));
  }
}), G2 = K2, z2 = { class: "wallet-ui-app wallet-app" }, V2 = { class: "wallet-ui-scroll" }, Z2 = ["disabled"], W2 = ["disabled"], Y2 = {
  class: "wallet-ledger",
  "aria-labelledby": "wallet-ledger-title"
}, Q2 = { class: "wallet-ui-section-title" }, X2 = { class: "wallet-ui-card" }, Xl = 35e3, J2 = /* @__PURE__ */ se({
  __name: "WalletApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const t = e, a = /* @__PURE__ */ K(structuredClone(/* @__PURE__ */ oe(t.initialState))), n = /* @__PURE__ */ K(!1), l = /* @__PURE__ */ K(!1), i = /* @__PURE__ */ K(""), r = /* @__PURE__ */ K("");
    let o = () => {
    }, u = 0;
    const p = V(() => a.value.status === "unconfirmed"), d = V(() => n.value || a.value.status === "loading" || a.value.status === "saving"), y = V(() => d.value || p.value || a.value.status === "conflict"), w = V(() => !!(a.value.message || i.value)), h = V(() => i.value || a.value.status === "conflict" || a.value.status === "blocked" ? "danger" : p.value ? "warning" : "info"), q = V(() => a.value.status === "conflict" ? "账本发生冲突" : a.value.status === "blocked" ? "钱包暂时无法读取" : "账本状态");
    function P(T) {
      const M = T instanceof Error ? T.message : String(T);
      return M.includes("聊天已切换") ? "聊天已切换，请重新打开钱包。" : M === "host_request_timeout" ? "读取等待超时，请稍后重新读取。" : "钱包数据暂时无法读取，请稍后重试。";
    }
    function R() {
      return { chatIdentity: a.value.chatIdentity };
    }
    function D(T) {
      a.value = structuredClone(T), n.value = !1, l.value = !1, i.value = "", r.value = "";
    }
    async function L() {
      if (d.value || p.value || a.value.status === "conflict") return;
      const T = ++u;
      n.value = !0, i.value = "";
      try {
        const M = await t.bridge.request("wallet/refresh", R(), Xl);
        T === u && D(M.result);
      } catch (M) {
        T === u && (i.value = P(M));
      } finally {
        T === u && (n.value = !1);
      }
    }
    async function A() {
      if (d.value) return;
      const T = ++u;
      n.value = !0, i.value = "";
      try {
        const M = await t.bridge.request("wallet/confirm-save", R(), Xl);
        T === u && D(M.result.state);
      } catch (M) {
        T === u && (i.value = P(M));
      } finally {
        T === u && (n.value = !1);
      }
    }
    async function C() {
      const T = a.value.nextCursor;
      if (!T || l.value) return;
      const M = u;
      l.value = !0, r.value = "";
      try {
        const $ = await t.bridge.request("wallet/load-more", {
          ...R(),
          beforeSequence: T
        });
        if (M !== u) return;
        const _ = new Set(a.value.transactions.map((S) => S.id));
        a.value.transactions.push(...$.result.transactions.filter((S) => !_.has(S.id))), a.value.nextCursor = $.result.nextCursor, a.value.hasMore = $.result.hasMore;
      } catch {
        M === u && (r.value = "更多流水暂时无法读取，请稍后重试。");
      } finally {
        M === u && (l.value = !1);
      }
    }
    return at(() => {
      o = t.bridge.subscribe((T) => {
        T.type === "wallet/state" && (u += 1, D(T.payload.state)), T.type === "wallet/error" && (i.value = P(T.payload?.message || ""));
      });
    }), ot(() => {
      u += 1, o();
    }), (T, M) => (v(), b("main", z2, [be(m2, { title: "钱包" }), s("div", V2, [
      be(k2, {
        balance: a.value.balance,
        currency: a.value.currency,
        status: a.value.status
      }, null, 8, [
        "balance",
        "currency",
        "status"
      ]),
      w.value ? (v(), ge(S2, {
        key: 0,
        class: "wallet-notice",
        tone: h.value,
        title: q.value,
        message: i.value || a.value.message
      }, {
        default: ia(() => [p.value ? (v(), b("button", {
          key: 0,
          type: "button",
          class: "wallet-ui-text-button",
          disabled: n.value,
          onClick: A
        }, g(n.value ? "正在核实…" : "核实保存结果"), 9, Z2)) : a.value.status === "blocked" || i.value ? (v(), b("button", {
          key: 1,
          type: "button",
          class: "wallet-ui-text-button",
          disabled: y.value,
          onClick: L
        }, g(n.value ? "正在读取…" : "重新读取"), 9, W2)) : H("", !0)]),
        _: 1
      }, 8, [
        "tone",
        "title",
        "message"
      ])) : H("", !0),
      s("section", Y2, [s("div", Q2, [M[0] || (M[0] = s("h2", { id: "wallet-ledger-title" }, "流水明细", -1)), s("small", null, g(a.value.transactionCount) + " 笔", 1)]), s("div", X2, [be(G2, {
        transactions: a.value.transactions,
        "has-more": a.value.hasMore,
        "loading-more": l.value,
        error: r.value,
        onLoadMore: C
      }, null, 8, [
        "transactions",
        "has-more",
        "loading-more",
        "error"
      ])])])
    ])]));
  }
}), e5 = J2, t5 = Object.freeze([
  {
    ...cd,
    iconPaths: ["M14 11h36a4 4 0 0 1 4 4v34a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V15a4 4 0 0 1 4-4z", "M19 24h26M19 34h18M19 44h11M45 44h.1"],
    component: Nc
  },
  {
    ...K0,
    iconPaths: ["M13 15h38v29H32l-12 9 3-9H13z", "M22 25h20M22 33h14"],
    component: ly
  },
  {
    ...d2,
    iconPaths: ["M12 19.5h37a5 5 0 0 1 5 5v24a5 5 0 0 1-5 5H15a5 5 0 0 1-5-5v-30a8 8 0 0 1 8-8h27", "M54 30H42a6 6 0 0 0 0 12h12M43 36h.1"],
    component: e5
  },
  {
    ...iy,
    iconPaths: ["M14 19h36l-3 35H17z", "M11 19h42M19 19V11h26v8M23 29h18M22 38h20M21 47h22"],
    component: u2
  },
  {
    ...Uc,
    iconPaths: ["M9 24h46L32 9z", "M14 52h36M18 24v28M28 24v28M38 24v28M48 24v28"],
    component: kv
  },
  {
    ...wv,
    iconPaths: ["M15 12h34a6 6 0 0 1 6 6v28a6 6 0 0 1-6 6H15a6 6 0 0 1-6-6V18a6 6 0 0 1 6-6z", "M21 23h.1M43 23h.1M32 32h.1M21 41h.1M43 41h.1"],
    component: Ap
  },
  {
    ...Ip,
    iconPaths: ["M11 16l13-6 16 6 13-6v38l-13 6-16-6-13 6z", "M24 10v38M40 16v38M18 31l6-3 8 3 8-4 7 3"],
    component: tb
  },
  {
    ...ab,
    iconPaths: [
      "M17 12h30a5 5 0 0 1 5 5v35H12V17a5 5 0 0 1 5-5z",
      "M21 23h22M21 32h22M21 41h14",
      "M18 9h28v8H18z"
    ],
    component: j0
  }
]), a5 = { class: "xiaobai-os-home" }, n5 = ["src"], s5 = {
  class: "xiaobai-os-app-grid",
  "aria-label": "应用"
}, l5 = ["onClick"], i5 = {
  class: "xiaobai-os-app-icon",
  "aria-hidden": "true"
}, r5 = { viewBox: "0 0 64 64" }, o5 = ["d"], u5 = { class: "xiaobai-os-app-name" }, d5 = /* @__PURE__ */ se({
  __name: "XiaobaiOsHome",
  props: {
    apps: {},
    characterAvatar: {}
  },
  emits: ["openApp"],
  setup(e) {
    return (t, a) => (v(), b("main", a5, [
      e.characterAvatar ? (v(), b("img", {
        key: 0,
        class: "xiaobai-os-wallpaper",
        src: e.characterAvatar,
        alt: ""
      }, null, 8, n5)) : H("", !0),
      a[0] || (a[0] = s("div", {
        class: "xiaobai-os-home-wash",
        "aria-hidden": "true"
      }, null, -1)),
      s("section", s5, [(v(!0), b(J, null, de(e.apps, (n) => (v(), b("button", {
        key: n.id,
        type: "button",
        class: "xiaobai-os-app-tile",
        style: qt({ "--app-accent": n.accent }),
        onClick: (l) => t.$emit("openApp", n)
      }, [s("span", i5, [(v(), b("svg", r5, [(v(!0), b(J, null, de(n.iconPaths, (l) => (v(), b("path", {
        key: l,
        d: l
      }, null, 8, o5))), 128))]))]), s("span", u5, g(n.name), 1)], 12, l5))), 128))])
    ]));
  }
}), c5 = d5, f5 = ["disabled"], v5 = {
  key: 0,
  "aria-hidden": "true"
}, p5 = /* @__PURE__ */ se({
  __name: "XiaobaiOsNavigation",
  props: { isHome: { type: Boolean } },
  emits: [
    "back",
    "home",
    "close"
  ],
  setup(e) {
    return (t, a) => (v(), b("nav", {
      class: ae(["xiaobai-os-navigation", { "is-home": e.isHome }]),
      "aria-label": "系统导航"
    }, [
      s("button", {
        type: "button",
        class: "xiaobai-os-nav-button",
        disabled: e.isHome,
        "aria-label": "返回",
        onClick: a[0] || (a[0] = (n) => t.$emit("back"))
      }, [...a[3] || (a[3] = [s("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, [s("path", { d: "m14.5 6-6 6 6 6" })], -1)])], 8, f5),
      s("button", {
        type: "button",
        class: "xiaobai-os-nav-button xiaobai-os-home-button",
        "aria-label": "主页",
        onClick: a[1] || (a[1] = (n) => t.$emit("home"))
      }, [a[4] || (a[4] = s("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, [s("path", { d: "m4.5 11 7.5-6 7.5 6v8h-5v-5h-5v5h-5z" })], -1)), e.isHome ? (v(), b("i", v5)) : H("", !0)]),
      s("button", {
        type: "button",
        class: "xiaobai-os-nav-button xiaobai-os-close-button",
        "aria-label": "关闭",
        onClick: a[2] || (a[2] = (n) => t.$emit("close"))
      }, [...a[5] || (a[5] = [s("span", null, [s("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, [s("path", { d: "m7 9.5 5 5 5-5" })])], -1)])])
    ], 2));
  }
}), m5 = p5, g5 = /* @__PURE__ */ se({
  __name: "XiaobaiOsSystemBar",
  props: { isHome: { type: Boolean } },
  setup(e) {
    return (t, a) => (v(), b("header", {
      class: ae(["xiaobai-os-system-bar", { "is-home": e.isHome }]),
      "aria-label": "系统状态"
    }, [...a[0] || (a[0] = [s("span", { class: "xiaobai-os-system-mark" }, "小白", -1), s("span", {
      class: "xiaobai-os-system-status",
      "aria-hidden": "true"
    }, [s("span", { class: "xiaobai-os-signal" }, [
      s("i"),
      s("i"),
      s("i"),
      s("i")
    ]), s("span", { class: "xiaobai-os-battery" }, [s("i")])], -1)])], 2));
  }
}), b5 = g5, h5 = { class: "xiaobai-os-device" }, y5 = { class: "xiaobai-os-glass" }, k5 = /* @__PURE__ */ se({
  __name: "XiaobaiOsDevice",
  props: {
    apps: {},
    activeApp: {},
    activeState: {},
    bridge: {},
    characterAvatar: {}
  },
  emits: [
    "openApp",
    "back",
    "home",
    "close"
  ],
  setup(e) {
    const t = e, a = V(() => t.activeApp === null);
    return (n, l) => (v(), b("div", h5, [l[4] || (l[4] = s("span", {
      class: "xiaobai-os-side-key",
      "aria-hidden": "true"
    }, null, -1)), s("div", y5, [
      be(b5, { "is-home": a.value }, null, 8, ["is-home"]),
      s("div", {
        class: "xiaobai-os-stage",
        style: qt(e.activeApp ? { "--app-accent": e.activeApp.accent } : null)
      }, [be(cr, {
        name: "xiaobai-os-route",
        mode: "out-in"
      }, {
        default: ia(() => [a.value ? (v(), ge(c5, {
          key: "home",
          apps: e.apps,
          "character-avatar": e.characterAvatar,
          onOpenApp: l[0] || (l[0] = (i) => n.$emit("openApp", i))
        }, null, 8, ["apps", "character-avatar"])) : e.activeApp ? (v(), ge(Fo(e.activeApp.component), {
          key: "app",
          bridge: e.bridge,
          "initial-state": e.activeState
        }, null, 8, ["bridge", "initial-state"])) : H("", !0)]),
        _: 1
      })], 4),
      be(m5, {
        "is-home": a.value,
        onBack: l[1] || (l[1] = (i) => n.$emit("back")),
        onHome: l[2] || (l[2] = (i) => n.$emit("home")),
        onClose: l[3] || (l[3] = (i) => n.$emit("close"))
      }, null, 8, ["is-home"])
    ])]));
  }
}), w5 = k5, T5 = "LittleWhiteBox-XiaobaiOS";
function x5() {
  return `xiaobai-os-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function $5() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Set();
  let a = !1;
  function n(d, y = {}, w = "") {
    parent.postMessage({
      source: T5,
      type: d,
      requestId: w,
      payload: y
    }, window.location.origin);
  }
  function l(d) {
    const y = String(d.requestId || "");
    if (!y) return !1;
    const w = e.get(y);
    if (!w) return !1;
    e.delete(y), clearTimeout(w.timer);
    const h = d.payload;
    return h?.ok === !1 ? w.reject(new Error(h.error || "host_request_failed")) : w.resolve(h), !0;
  }
  function i(d) {
    d.origin !== window.location.origin || d.source !== parent || d.data?.source !== "LittleWhiteBox-XiaobaiOS" || typeof d.data.type != "string" || l(d.data) || t.forEach((y) => y(d.data));
  }
  function r() {
    a || (a = !0, window.addEventListener("message", i), n("os/frame-ready"));
  }
  function o(d, y = {}, w = 15e3) {
    const h = x5();
    return new Promise((q, P) => {
      const R = setTimeout(() => {
        e.delete(h), P(/* @__PURE__ */ new Error("host_request_timeout"));
      }, w);
      e.set(h, {
        resolve: q,
        reject: P,
        timer: R
      }), n(d, y, h);
    });
  }
  function u(d) {
    return t.add(d), () => t.delete(d);
  }
  function p() {
    a && window.removeEventListener("message", i), a = !1, t.clear(), e.forEach((d) => {
      clearTimeout(d.timer), d.reject(/* @__PURE__ */ new Error("frame_bridge_disposed"));
    }), e.clear();
  }
  return Object.freeze({
    start: r,
    post: n,
    request: o,
    subscribe: u,
    dispose: p
  });
}
var S5 = {
  key: 0,
  class: "xiaobai-os-error",
  role: "alert"
}, _5 = {
  key: 1,
  class: "xiaobai-os-loading",
  role: "status"
}, q5 = /* @__PURE__ */ se({
  __name: "App",
  setup(e) {
    const t = $5(), a = /* @__PURE__ */ K(null), n = /* @__PURE__ */ K(!1), l = /* @__PURE__ */ K("light"), i = /* @__PURE__ */ K(/* @__PURE__ */ new Set()), r = /* @__PURE__ */ K(""), o = /* @__PURE__ */ K(null), u = /* @__PURE__ */ K(null), p = /* @__PURE__ */ K("");
    let d = null, y = () => {
    }, w = 0, h = null;
    const q = V(() => t5.filter((M) => i.value.has(M.id)));
    function P(M) {
      const $ = new Set(M.map((G) => String(G.id))), _ = o.value && !$.has(o.value.id), S = h && !$.has(h.appId);
      i.value = $, !(!_ && !S) && (w += 1, h = null, o.value = null, u.value = null);
    }
    function R(M) {
      w += 1, h = null, l.value = M.theme === "dark" ? "dark" : "light", P(M.apps || []), r.value = String(M.chat?.characterAvatar || ""), o.value = null, u.value = null, n.value = !0;
    }
    function D(M) {
      if (M.type === "os/init" && R(M.payload || {}), M.type === "os/theme-changed" && (l.value = M.payload?.theme === "dark" ? "dark" : "light"), M.type === "os/apps-changed") {
        const _ = M.payload;
        P(_?.apps || []);
      }
      M.type === "os/error" && (p.value = String(M.payload?.message || "小白 OS 初始化失败"));
      const $ = M.payload?.state;
      h && M.type === `${h.appId}/state` && (h.latestState = $), o.value && M.type === `${o.value.id}/state` && (u.value = $);
    }
    async function L(M) {
      const $ = ++w, _ = { appId: M.id };
      h = _, p.value = "";
      try {
        const S = await t.request("app/activate", { appId: M.id });
        if ($ !== w) return;
        if (S.appId !== M.id) throw new Error("app_activation_mismatch");
        u.value = _.latestState ?? S.state ?? null, o.value = M;
      } catch (S) {
        if ($ !== w) return;
        o.value = null, p.value = S instanceof Error ? S.message : String(S);
      } finally {
        h === _ && (h = null);
      }
    }
    function A() {
      w += 1, h = null, t.post("app/deactivate", { appId: o.value?.id || "" }), o.value = null, u.value = null;
    }
    function C() {
      w += 1, h = null, t.post("os/close");
    }
    function T(M) {
      if (M.key === "Escape") {
        M.preventDefault(), o.value ? A() : C();
        return;
      }
      if (M.key !== "Tab" || !a.value) return;
      const $ = Array.from(a.value.querySelectorAll('button:not(:disabled), [href], input:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'));
      if ($.length === 0) return;
      const _ = $[0], S = $[$.length - 1];
      M.shiftKey && document.activeElement === _ ? (M.preventDefault(), S.focus()) : !M.shiftKey && document.activeElement === S && (M.preventDefault(), _.focus());
    }
    return at(async () => {
      d = document.activeElement instanceof HTMLElement ? document.activeElement : null, y = t.subscribe(D), t.start(), await sn(), a.value?.focus();
    }), ot(() => {
      w += 1, h = null, y(), t.dispose(), d?.focus();
    }), (M, $) => (v(), b("main", {
      ref_key: "root",
      ref: a,
      class: ae(["xiaobai-os-shell", `theme-${l.value}`]),
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "小白 OS",
      tabindex: "-1",
      onKeydown: T,
      onClick: tt(C, ["self"])
    }, [p.value ? (v(), b("div", S5, g(p.value), 1)) : H("", !0), n.value ? (v(), ge(w5, {
      key: 2,
      apps: q.value,
      "active-app": o.value,
      "active-state": u.value,
      bridge: me(t),
      "character-avatar": r.value,
      onOpenApp: L,
      onBack: A,
      onHome: A,
      onClose: C
    }, null, 8, [
      "apps",
      "active-app",
      "active-state",
      "bridge",
      "character-avatar"
    ])) : (v(), b("div", _5, "正在启动小白 OS"))], 34));
  }
}), C5 = q5;
od(C5).mount("#app");
