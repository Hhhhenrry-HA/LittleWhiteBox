/* eslint-disable */
// @__NO_SIDE_EFFECTS__
function Bn(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
var ve = {}, Rt = [], nt = () => {
}, Pl = () => !1, Fn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Nn = (e) => e.startsWith("onUpdate:"), we = Object.assign, xa = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Qs = Object.prototype.hasOwnProperty, de = (e, t) => Qs.call(e, t), J = Array.isArray, Pt = (e) => yn(e) === "[object Map]", Gt = (e) => yn(e) === "[object Set]", Ka = (e) => yn(e) === "[object Date]", ne = (e) => typeof e == "function", _e = (e) => typeof e == "string", ze = (e) => typeof e == "symbol", ce = (e) => e !== null && typeof e == "object", Bl = (e) => (ce(e) || ne(e)) && ne(e.then) && ne(e.catch), Fl = Object.prototype.toString, yn = (e) => Fl.call(e), Zs = (e) => yn(e).slice(8, -1), Nl = (e) => yn(e) === "[object Object]", Ia = (e) => _e(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, nn = /* @__PURE__ */ Bn(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), Vn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, ei = /-\w/g, Pe = Vn((e) => e.replace(ei, (t) => t.slice(1).toUpperCase())), ti = /\B([A-Z])/g, $t = Vn((e) => e.replace(ti, "-$1").toLowerCase()), Hn = Vn((e) => e.charAt(0).toUpperCase() + e.slice(1)), ta = Vn((e) => e ? `on${Hn(e)}` : ""), tt = (e, t) => !Object.is(e, t), xn = (e, ...t) => {
  for (let n = 0; n < e.length; n++) e[n](...t);
}, Vl = (e, t, n, a = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: a,
    value: n
  });
}, Un = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, ni = (e) => {
  const t = _e(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
}, za, Wn = () => za || (za = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {});
function jt(e) {
  if (J(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const a = e[n], l = _e(a) ? ii(a) : jt(a);
      if (l) for (const i in l) t[i] = l[i];
    }
    return t;
  } else if (_e(e) || ce(e)) return e;
}
var ai = /;(?![^(]*\))/g, li = /:([^]+)/, si = /\/\*[^]*?\*\//g;
function ii(e) {
  const t = {};
  return e.replace(si, "").split(ai).forEach((n) => {
    if (n) {
      const a = n.split(li);
      a.length > 1 && (t[a[0].trim()] = a[1].trim());
    }
  }), t;
}
function se(e) {
  let t = "";
  if (_e(e)) t = e;
  else if (J(e)) for (let n = 0; n < e.length; n++) {
    const a = se(e[n]);
    a && (t += a + " ");
  }
  else if (ce(e))
    for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
var Hl = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", ri = /* @__PURE__ */ Bn(Hl), Em = /* @__PURE__ */ Bn(Hl + ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");
function Ul(e) {
  return !!e || e === "";
}
function oi(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let a = 0; n && a < e.length; a++) n = qt(e[a], t[a]);
  return n;
}
function qt(e, t) {
  if (e === t) return !0;
  let n = Ka(e), a = Ka(t);
  if (n || a) return n && a ? e.getTime() === t.getTime() : !1;
  if (n = ze(e), a = ze(t), n || a) return e === t;
  if (n = J(e), a = J(t), n || a) return n && a ? oi(e, t) : !1;
  if (n = ce(e), a = ce(t), n || a) {
    if (!n || !a || Object.keys(e).length !== Object.keys(t).length) return !1;
    for (const l in e) {
      const i = e.hasOwnProperty(l), r = t.hasOwnProperty(l);
      if (i && !r || !i && r || !qt(e[l], t[l])) return !1;
    }
  }
  return String(e) === String(t);
}
function Ea(e, t) {
  return e.findIndex((n) => qt(n, t));
}
var Wl = (e) => !!(e && e.__v_isRef === !0), m = (e) => _e(e) ? e : e == null ? "" : J(e) || ce(e) && (e.toString === Fl || !ne(e.toString)) ? Wl(e) ? m(e.value) : JSON.stringify(e, Gl, 2) : String(e), Gl = (e, t) => Wl(t) ? Gl(e, t.value) : Pt(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((n, [a, l], i) => (n[na(a, i) + " =>"] = l, n), {}) } : Gt(t) ? { [`Set(${t.size})`]: [...t.values()].map((n) => na(n)) } : ze(t) ? na(t) : ce(t) && !J(t) && !Nl(t) ? String(t) : t, na = (e, t = "") => {
  var n;
  return ze(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
}, Ie, ui = class {
  constructor(e = !1) {
    this.detached = e, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !e && Ie && (Ie.active ? (this.parent = Ie, this.index = (Ie.scopes || (Ie.scopes = [])).push(this) - 1) : (this._active = !1, this._warnOnRun = !1));
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
      const t = Ie;
      try {
        return Ie = this, e();
      } finally {
        Ie = t;
      }
    }
  }
  on() {
    ++this._on === 1 && (this.prevScope = Ie, Ie = this);
  }
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (Ie === this) Ie = this.prevScope;
      else {
        let e = Ie;
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
      let t, n;
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].stop();
      for (this.effects.length = 0, t = 0, n = this.cleanups.length; t < n; t++) this.cleanups[t]();
      if (this.cleanups.length = 0, this.scopes) {
        for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !e) {
        const a = this.parent.scopes.pop();
        a && a !== this && (this.parent.scopes[this.index] = a, a.index = this.index);
      }
      this.parent = void 0;
    }
  }
};
function di() {
  return Ie;
}
var be, aa = /* @__PURE__ */ new WeakSet(), jl = class {
  constructor(e) {
    this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Ie && (Ie.active ? Ie.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, aa.has(this) && (aa.delete(this), this.trigger()));
  }
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Kl(this);
  }
  run() {
    if (!(this.flags & 1)) return this.fn();
    this.flags |= 2, Xa(this), zl(this);
    const e = be, t = Ke;
    be = this, Ke = !0;
    try {
      return this.fn();
    } finally {
      Xl(this), be = e, Ke = t, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let e = this.deps; e; e = e.nextDep) Da(e);
      this.deps = this.depsTail = void 0, Xa(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? aa.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  runIfDirty() {
    ma(this) && this.run();
  }
  get dirty() {
    return ma(this);
  }
}, ql = 0, an, ln;
function Kl(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = ln, ln = e;
    return;
  }
  e.next = an, an = e;
}
function Ta() {
  ql++;
}
function Ma() {
  if (--ql > 0) return;
  if (ln) {
    let t = ln;
    for (ln = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; an; ) {
    let t = an;
    for (an = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1) try {
        t.trigger();
      } catch (a) {
        e || (e = a);
      }
      t = n;
    }
  }
  if (e) throw e;
}
function zl(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Xl(e) {
  let t, n = e.depsTail, a = n;
  for (; a; ) {
    const l = a.prevDep;
    a.version === -1 ? (a === n && (n = l), Da(a), ci(a)) : t = a, a.dep.activeLink = a.prevActiveLink, a.prevActiveLink = void 0, a = l;
  }
  e.deps = t, e.depsTail = n;
}
function ma(e) {
  for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (Jl(t.dep.computed) || t.dep.version !== t.version)) return !0;
  return !!e._dirty;
}
function Jl(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === un) || (e.globalVersion = un, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !ma(e)))) return;
  e.flags |= 2;
  const t = e.dep, n = be, a = Ke;
  be = e, Ke = !0;
  try {
    zl(e);
    const l = e.fn(e._value);
    (t.version === 0 || tt(l, e._value)) && (e.flags |= 128, e._value = l, t.version++);
  } catch (l) {
    throw t.version++, l;
  } finally {
    be = n, Ke = a, Xl(e), e.flags &= -3;
  }
}
function Da(e, t = !1) {
  const { dep: n, prevSub: a, nextSub: l } = e;
  if (a && (a.nextSub = l, e.prevSub = void 0), l && (l.prevSub = a, e.nextSub = void 0), n.subs === e && (n.subs = a, !a && n.computed)) {
    n.computed.flags &= -5;
    for (let i = n.computed.deps; i; i = i.nextDep) Da(i, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function ci(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
var Ke = !0, Yl = [];
function ct() {
  Yl.push(Ke), Ke = !1;
}
function ft() {
  const e = Yl.pop();
  Ke = e === void 0 ? !0 : e;
}
function Xa(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = be;
    be = void 0;
    try {
      t();
    } finally {
      be = n;
    }
  }
}
var un = 0, fi = class {
  constructor(e, t) {
    this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}, La = class {
  constructor(e) {
    this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(e) {
    if (!be || !Ke || be === this.computed) return;
    let t = this.activeLink;
    if (t === void 0 || t.sub !== be)
      t = this.activeLink = new fi(be, this), be.deps ? (t.prevDep = be.depsTail, be.depsTail.nextDep = t, be.depsTail = t) : be.deps = be.depsTail = t, Ql(t);
    else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
      const n = t.nextDep;
      n.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = n), t.prevDep = be.depsTail, t.nextDep = void 0, be.depsTail.nextDep = t, be.depsTail = t, be.deps === t && (be.deps = n);
    }
    return t;
  }
  trigger(e) {
    this.version++, un++, this.notify(e);
  }
  notify(e) {
    Ta();
    try {
      for (let t = this.subs; t; t = t.prevSub) t.sub.notify() && t.sub.dep.notify();
    } finally {
      Ma();
    }
  }
};
function Ql(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let a = t.deps; a; a = a.nextDep) Ql(a);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
var ga = /* @__PURE__ */ new WeakMap(), Et = /* @__PURE__ */ Symbol(""), ha = /* @__PURE__ */ Symbol(""), dn = /* @__PURE__ */ Symbol("");
function Te(e, t, n) {
  if (Ke && be) {
    let a = ga.get(e);
    a || ga.set(e, a = /* @__PURE__ */ new Map());
    let l = a.get(n);
    l || (a.set(n, l = new La()), l.map = a, l.key = n), l.track();
  }
}
function rt(e, t, n, a, l, i) {
  const r = ga.get(e);
  if (!r) {
    un++;
    return;
  }
  const o = (u) => {
    u && u.trigger();
  };
  if (Ta(), t === "clear") r.forEach(o);
  else {
    const u = J(e), c = u && Ia(n);
    if (u && n === "length") {
      const d = Number(a);
      r.forEach((f, y) => {
        (y === "length" || y === dn || !ze(y) && y >= d) && o(f);
      });
    } else
      switch ((n !== void 0 || r.has(void 0)) && o(r.get(n)), c && o(r.get(dn)), t) {
        case "add":
          u ? c && o(r.get("length")) : (o(r.get(Et)), Pt(e) && o(r.get(ha)));
          break;
        case "delete":
          u || (o(r.get(Et)), Pt(e) && o(r.get(ha)));
          break;
        case "set":
          Pt(e) && o(r.get(Et));
          break;
      }
  }
  Ma();
}
function Lt(e) {
  const t = /* @__PURE__ */ te(e);
  return t === e ? t : (Te(t, "iterate", dn), /* @__PURE__ */ Ge(e) ? t : t.map(Xe));
}
function Gn(e) {
  return Te(e = /* @__PURE__ */ te(e), "iterate", dn), e;
}
function Ze(e, t) {
  return /* @__PURE__ */ vt(e) ? Ht(/* @__PURE__ */ Tt(e) ? Xe(t) : t) : Xe(t);
}
var vi = {
  __proto__: null,
  [Symbol.iterator]() {
    return la(this, Symbol.iterator, (e) => Ze(this, e));
  },
  concat(...e) {
    return Lt(this).concat(...e.map((t) => J(t) ? Lt(t) : t));
  },
  entries() {
    return la(this, "entries", (e) => (e[1] = Ze(this, e[1]), e));
  },
  every(e, t) {
    return at(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return at(this, "filter", e, t, (n) => n.map((a) => Ze(this, a)), arguments);
  },
  find(e, t) {
    return at(this, "find", e, t, (n) => Ze(this, n), arguments);
  },
  findIndex(e, t) {
    return at(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return at(this, "findLast", e, t, (n) => Ze(this, n), arguments);
  },
  findLastIndex(e, t) {
    return at(this, "findLastIndex", e, t, void 0, arguments);
  },
  forEach(e, t) {
    return at(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return sa(this, "includes", e);
  },
  indexOf(...e) {
    return sa(this, "indexOf", e);
  },
  join(e) {
    return Lt(this).join(e);
  },
  lastIndexOf(...e) {
    return sa(this, "lastIndexOf", e);
  },
  map(e, t) {
    return at(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Xt(this, "pop");
  },
  push(...e) {
    return Xt(this, "push", e);
  },
  reduce(e, ...t) {
    return Ja(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Ja(this, "reduceRight", e, t);
  },
  shift() {
    return Xt(this, "shift");
  },
  some(e, t) {
    return at(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Xt(this, "splice", e);
  },
  toReversed() {
    return Lt(this).toReversed();
  },
  toSorted(e) {
    return Lt(this).toSorted(e);
  },
  toSpliced(...e) {
    return Lt(this).toSpliced(...e);
  },
  unshift(...e) {
    return Xt(this, "unshift", e);
  },
  values() {
    return la(this, "values", (e) => Ze(this, e));
  }
};
function la(e, t, n) {
  const a = Gn(e), l = a[t]();
  return a !== e && !/* @__PURE__ */ Ge(e) && (l._next = l.next, l.next = () => {
    const i = l._next();
    return i.done || (i.value = n(i.value)), i;
  }), l;
}
var pi = Array.prototype;
function at(e, t, n, a, l, i) {
  const r = Gn(e), o = r !== e && !/* @__PURE__ */ Ge(e), u = r[t];
  if (u !== pi[t]) {
    const f = u.apply(e, i);
    return o ? Xe(f) : f;
  }
  let c = n;
  r !== e && (o ? c = function(f, y) {
    return n.call(this, Ze(e, f), y, e);
  } : n.length > 2 && (c = function(f, y) {
    return n.call(this, f, y, e);
  }));
  const d = u.call(r, c, a);
  return o && l ? l(d) : d;
}
function Ja(e, t, n, a) {
  const l = Gn(e), i = l !== e && !/* @__PURE__ */ Ge(e);
  let r = n, o = !1;
  l !== e && (i ? (o = a.length === 0, r = function(c, d, f) {
    return o && (o = !1, c = Ze(e, c)), n.call(this, c, Ze(e, d), f, e);
  }) : n.length > 3 && (r = function(c, d, f) {
    return n.call(this, c, d, f, e);
  }));
  const u = l[t](r, ...a);
  return o ? Ze(e, u) : u;
}
function sa(e, t, n) {
  const a = /* @__PURE__ */ te(e);
  Te(a, "iterate", dn);
  const l = a[t](...n);
  return (l === -1 || l === !1) && /* @__PURE__ */ Pa(n[0]) ? (n[0] = /* @__PURE__ */ te(n[0]), a[t](...n)) : l;
}
function Xt(e, t, n = []) {
  ct(), Ta();
  const a = (/* @__PURE__ */ te(e))[t].apply(e, n);
  return Ma(), ft(), a;
}
var mi = /* @__PURE__ */ Bn("__proto__,__v_isRef,__isVue"), Zl = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(ze));
function gi(e) {
  ze(e) || (e = String(e));
  const t = /* @__PURE__ */ te(this);
  return Te(t, "has", e), t.hasOwnProperty(e);
}
var es = class {
  constructor(e = !1, t = !1) {
    this._isReadonly = e, this._isShallow = t;
  }
  get(e, t, n) {
    if (t === "__v_skip") return e.__v_skip;
    const a = this._isReadonly, l = this._isShallow;
    if (t === "__v_isReactive") return !a;
    if (t === "__v_isReadonly") return a;
    if (t === "__v_isShallow") return l;
    if (t === "__v_raw")
      return n === (a ? l ? Ai : ls : l ? as : ns).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(n) ? e : void 0;
    const i = J(e);
    if (!a) {
      let o;
      if (i && (o = vi[t])) return o;
      if (t === "hasOwnProperty") return gi;
    }
    const r = Reflect.get(e, t, /* @__PURE__ */ Le(e) ? e : n);
    if ((ze(t) ? Zl.has(t) : mi(t)) || (a || Te(e, "get", t), l)) return r;
    if (/* @__PURE__ */ Le(r)) {
      const o = i && Ia(t) ? r : r.value;
      return a && ce(o) ? /* @__PURE__ */ ya(o) : o;
    }
    return ce(r) ? a ? /* @__PURE__ */ ya(r) : /* @__PURE__ */ kt(r) : r;
  }
}, ts = class extends es {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, t, n, a) {
    let l = e[t];
    const i = J(e) && Ia(t);
    if (!this._isShallow) {
      const u = /* @__PURE__ */ vt(l);
      if (!/* @__PURE__ */ Ge(n) && !/* @__PURE__ */ vt(n) && (l = /* @__PURE__ */ te(l), n = /* @__PURE__ */ te(n)), !i && /* @__PURE__ */ Le(l) && !/* @__PURE__ */ Le(n)) return u || (l.value = n), !0;
    }
    const r = i ? Number(t) < e.length : de(e, t), o = Reflect.set(e, t, n, /* @__PURE__ */ Le(e) ? e : a);
    return e === /* @__PURE__ */ te(a) && (r ? tt(n, l) && rt(e, "set", t, n, l) : rt(e, "add", t, n)), o;
  }
  deleteProperty(e, t) {
    const n = de(e, t), a = e[t], l = Reflect.deleteProperty(e, t);
    return l && n && rt(e, "delete", t, void 0, a), l;
  }
  has(e, t) {
    const n = Reflect.has(e, t);
    return (!ze(t) || !Zl.has(t)) && Te(e, "has", t), n;
  }
  ownKeys(e) {
    return Te(e, "iterate", J(e) ? "length" : Et), Reflect.ownKeys(e);
  }
}, hi = class extends es {
  constructor(e = !1) {
    super(!0, e);
  }
  set(e, t) {
    return !0;
  }
  deleteProperty(e, t) {
    return !0;
  }
}, bi = /* @__PURE__ */ new ts(), yi = /* @__PURE__ */ new hi(), ki = /* @__PURE__ */ new ts(!0), ba = (e) => e, wn = (e) => Reflect.getPrototypeOf(e);
function _i(e, t, n) {
  return function(...a) {
    const l = this.__v_raw, i = /* @__PURE__ */ te(l), r = Pt(i), o = e === "entries" || e === Symbol.iterator && r, u = e === "keys" && r, c = l[e](...a), d = n ? ba : t ? Ht : Xe;
    return !t && Te(i, "iterate", u ? ha : Et), we(Object.create(c), { next() {
      const { value: f, done: y } = c.next();
      return y ? {
        value: f,
        done: y
      } : {
        value: o ? [d(f[0]), d(f[1])] : d(f),
        done: y
      };
    } });
  };
}
function Cn(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function $i(e, t) {
  const n = {
    get(a) {
      const l = this.__v_raw, i = /* @__PURE__ */ te(l), r = /* @__PURE__ */ te(a);
      e || (tt(a, r) && Te(i, "get", a), Te(i, "get", r));
      const { has: o } = wn(i), u = t ? ba : e ? Ht : Xe;
      if (o.call(i, a)) return u(l.get(a));
      if (o.call(i, r)) return u(l.get(r));
      l !== i && l.get(a);
    },
    get size() {
      const a = this.__v_raw;
      return !e && Te(/* @__PURE__ */ te(a), "iterate", Et), a.size;
    },
    has(a) {
      const l = this.__v_raw, i = /* @__PURE__ */ te(l), r = /* @__PURE__ */ te(a);
      return e || (tt(a, r) && Te(i, "has", a), Te(i, "has", r)), a === r ? l.has(a) : l.has(a) || l.has(r);
    },
    forEach(a, l) {
      const i = this, r = i.__v_raw, o = /* @__PURE__ */ te(r), u = t ? ba : e ? Ht : Xe;
      return !e && Te(o, "iterate", Et), r.forEach((c, d) => a.call(l, u(c), u(d), i));
    }
  };
  return we(n, e ? {
    add: Cn("add"),
    set: Cn("set"),
    delete: Cn("delete"),
    clear: Cn("clear")
  } : {
    add(a) {
      const l = /* @__PURE__ */ te(this), i = wn(l), r = /* @__PURE__ */ te(a), o = !t && !/* @__PURE__ */ Ge(a) && !/* @__PURE__ */ vt(a) ? r : a;
      return i.has.call(l, o) || tt(a, o) && i.has.call(l, a) || tt(r, o) && i.has.call(l, r) || (l.add(o), rt(l, "add", o, o)), this;
    },
    set(a, l) {
      !t && !/* @__PURE__ */ Ge(l) && !/* @__PURE__ */ vt(l) && (l = /* @__PURE__ */ te(l));
      const i = /* @__PURE__ */ te(this), { has: r, get: o } = wn(i);
      let u = r.call(i, a);
      u || (a = /* @__PURE__ */ te(a), u = r.call(i, a));
      const c = o.call(i, a);
      return i.set(a, l), u ? tt(l, c) && rt(i, "set", a, l, c) : rt(i, "add", a, l), this;
    },
    delete(a) {
      const l = /* @__PURE__ */ te(this), { has: i, get: r } = wn(l);
      let o = i.call(l, a);
      o || (a = /* @__PURE__ */ te(a), o = i.call(l, a));
      const u = r ? r.call(l, a) : void 0, c = l.delete(a);
      return o && rt(l, "delete", a, void 0, u), c;
    },
    clear() {
      const a = /* @__PURE__ */ te(this), l = a.size !== 0, i = void 0, r = a.clear();
      return l && rt(a, "clear", void 0, void 0, i), r;
    }
  }), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((a) => {
    n[a] = _i(a, e, t);
  }), n;
}
function Oa(e, t) {
  const n = $i(e, t);
  return (a, l, i) => l === "__v_isReactive" ? !e : l === "__v_isReadonly" ? e : l === "__v_raw" ? a : Reflect.get(de(n, l) && l in a ? n : a, l, i);
}
var wi = { get: /* @__PURE__ */ Oa(!1, !1) }, Ci = { get: /* @__PURE__ */ Oa(!1, !0) }, Si = { get: /* @__PURE__ */ Oa(!0, !1) }, ns = /* @__PURE__ */ new WeakMap(), as = /* @__PURE__ */ new WeakMap(), ls = /* @__PURE__ */ new WeakMap(), Ai = /* @__PURE__ */ new WeakMap();
function xi(e) {
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
function kt(e) {
  return /* @__PURE__ */ vt(e) ? e : Ra(e, !1, bi, wi, ns);
}
// @__NO_SIDE_EFFECTS__
function Ii(e) {
  return Ra(e, !1, ki, Ci, as);
}
// @__NO_SIDE_EFFECTS__
function ya(e) {
  return Ra(e, !0, yi, Si, ls);
}
function Ra(e, t, n, a, l) {
  if (!ce(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
  const i = l.get(e);
  if (i) return i;
  const r = xi(Zs(e));
  if (r === 0) return e;
  const o = new Proxy(e, r === 2 ? a : n);
  return l.set(e, o), o;
}
// @__NO_SIDE_EFFECTS__
function Tt(e) {
  return /* @__PURE__ */ vt(e) ? /* @__PURE__ */ Tt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function vt(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Ge(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Pa(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function te(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ te(t) : e;
}
function Ei(e) {
  return !de(e, "__v_skip") && Object.isExtensible(e) && Vl(e, "__v_skip", !0), e;
}
var Xe = (e) => ce(e) ? /* @__PURE__ */ kt(e) : e, Ht = (e) => ce(e) ? /* @__PURE__ */ ya(e) : e;
// @__NO_SIDE_EFFECTS__
function Le(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function q(e) {
  return Ti(e, !1);
}
function Ti(e, t) {
  return /* @__PURE__ */ Le(e) ? e : new Mi(e, t);
}
var Mi = class {
  constructor(e, t) {
    this.dep = new La(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ te(e), this._value = t ? e : Xe(e), this.__v_isShallow = t;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e) {
    const t = this._rawValue, n = this.__v_isShallow || /* @__PURE__ */ Ge(e) || /* @__PURE__ */ vt(e);
    e = n ? e : /* @__PURE__ */ te(e), tt(e, t) && (this._rawValue = e, this._value = n ? e : Xe(e), this.dep.trigger());
  }
};
function Ut(e) {
  return /* @__PURE__ */ Le(e) ? e.value : e;
}
var Di = {
  get: (e, t, n) => t === "__v_raw" ? e : Ut(Reflect.get(e, t, n)),
  set: (e, t, n, a) => {
    const l = e[t];
    return /* @__PURE__ */ Le(l) && !/* @__PURE__ */ Le(n) ? (l.value = n, !0) : Reflect.set(e, t, n, a);
  }
};
function ss(e) {
  return /* @__PURE__ */ Tt(e) ? e : new Proxy(e, Di);
}
var Li = class {
  constructor(e, t, n) {
    this.fn = e, this.setter = t, this._value = void 0, this.dep = new La(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = un - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = n;
  }
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && be !== this)
      return Kl(this, !0), !0;
  }
  get value() {
    const e = this.dep.track();
    return Jl(this), e && (e.version = this.dep.version), this._value;
  }
  set value(e) {
    this.setter && this.setter(e);
  }
};
// @__NO_SIDE_EFFECTS__
function Oi(e, t, n = !1) {
  let a, l;
  return ne(e) ? a = e : (a = e.get, l = e.set), new Li(a, l, n);
}
var Sn = {}, Tn = /* @__PURE__ */ new WeakMap(), xt = void 0;
function Ri(e, t = !1, n = xt) {
  if (n) {
    let a = Tn.get(n);
    a || Tn.set(n, a = []), a.push(e);
  }
}
function Pi(e, t, n = ve) {
  const { immediate: a, deep: l, once: i, scheduler: r, augmentJob: o, call: u } = n, c = ($) => l ? $ : /* @__PURE__ */ Ge($) || l === !1 || l === 0 ? ot($, 1) : ot($);
  let d, f, y, b, R = !1, L = !1;
  if (/* @__PURE__ */ Le(e) ? (f = () => e.value, R = /* @__PURE__ */ Ge(e)) : /* @__PURE__ */ Tt(e) ? (f = () => c(e), R = !0) : J(e) ? (L = !0, R = e.some(($) => /* @__PURE__ */ Tt($) || /* @__PURE__ */ Ge($)), f = () => e.map(($) => {
    if (/* @__PURE__ */ Le($)) return $.value;
    if (/* @__PURE__ */ Tt($)) return c($);
    if (ne($)) return u ? u($, 2) : $();
  })) : ne(e) ? t ? f = u ? () => u(e, 2) : e : f = () => {
    if (y) {
      ct();
      try {
        y();
      } finally {
        ft();
      }
    }
    const $ = xt;
    xt = d;
    try {
      return u ? u(e, 3, [b]) : e(b);
    } finally {
      xt = $;
    }
  } : f = nt, t && l) {
    const $ = f, w = l === !0 ? 1 / 0 : l;
    f = () => ot($(), w);
  }
  const Q = di(), z = () => {
    d.stop(), Q && Q.active && xa(Q.effects, d);
  };
  if (i && t) {
    const $ = t;
    t = (...w) => {
      $(...w), z();
    };
  }
  let j = L ? new Array(e.length).fill(Sn) : Sn;
  const X = ($) => {
    if (!(!(d.flags & 1) || !d.dirty && !$))
      if (t) {
        const w = d.run();
        if (l || R || (L ? w.some((E, A) => tt(E, j[A])) : tt(w, j))) {
          y && y();
          const E = xt;
          xt = d;
          try {
            const A = [
              w,
              j === Sn ? void 0 : L && j[0] === Sn ? [] : j,
              b
            ];
            j = w, u ? u(t, 3, A) : t(...A);
          } finally {
            xt = E;
          }
        }
      } else d.run();
  };
  return o && o(X), d = new jl(f), d.scheduler = r ? () => r(X, !1) : X, b = ($) => Ri($, !1, d), y = d.onStop = () => {
    const $ = Tn.get(d);
    if ($) {
      if (u) u($, 4);
      else for (const w of $) w();
      Tn.delete(d);
    }
  }, t ? a ? X(!0) : j = d.run() : r ? r(X.bind(null, !0), !0) : d.run(), z.pause = d.pause.bind(d), z.resume = d.resume.bind(d), z.stop = z, z;
}
function ot(e, t = 1 / 0, n) {
  if (t <= 0 || !ce(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t)) return e;
  if (n.set(e, t), t--, /* @__PURE__ */ Le(e)) ot(e.value, t, n);
  else if (J(e)) for (let a = 0; a < e.length; a++) ot(e[a], t, n);
  else if (Gt(e) || Pt(e)) e.forEach((a) => {
    ot(a, t, n);
  });
  else if (Nl(e)) {
    for (const a in e) ot(e[a], t, n);
    for (const a of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, a) && ot(e[a], t, n);
  }
  return e;
}
function kn(e, t, n, a) {
  try {
    return a ? e(...a) : e();
  } catch (l) {
    jn(l, t, n);
  }
}
function je(e, t, n, a) {
  if (ne(e)) {
    const l = kn(e, t, n, a);
    return l && Bl(l) && l.catch((i) => {
      jn(i, t, n);
    }), l;
  }
  if (J(e)) {
    const l = [];
    for (let i = 0; i < e.length; i++) l.push(je(e[i], t, n, a));
    return l;
  }
}
function jn(e, t, n, a = !0) {
  const l = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: r } = t && t.appContext.config || ve;
  if (t) {
    let o = t.parent;
    const u = t.proxy, c = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; o; ) {
      const d = o.ec;
      if (d) {
        for (let f = 0; f < d.length; f++) if (d[f](e, u, c) === !1) return;
      }
      o = o.parent;
    }
    if (i) {
      ct(), kn(i, null, 10, [
        e,
        u,
        c
      ]), ft();
      return;
    }
  }
  Bi(e, n, l, a, r);
}
function Bi(e, t, n, a = !0, l = !1) {
  if (l) throw e;
  console.error(e);
}
var Re = [], Qe = -1, Bt = [], bt = null, Ot = 0, is = /* @__PURE__ */ Promise.resolve(), Mn = null;
function qn(e) {
  const t = Mn || is;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Fi(e) {
  let t = Qe + 1, n = Re.length;
  for (; t < n; ) {
    const a = t + n >>> 1, l = Re[a], i = cn(l);
    i < e || i === e && l.flags & 2 ? t = a + 1 : n = a;
  }
  return t;
}
function Ba(e) {
  if (!(e.flags & 1)) {
    const t = cn(e), n = Re[Re.length - 1];
    !n || !(e.flags & 2) && t >= cn(n) ? Re.push(e) : Re.splice(Fi(t), 0, e), e.flags |= 1, rs();
  }
}
function rs() {
  Mn || (Mn = is.then(us));
}
function Ni(e) {
  J(e) ? Bt.push(...e) : bt && e.id === -1 ? bt.splice(Ot + 1, 0, e) : e.flags & 1 || (Bt.push(e), e.flags |= 1), rs();
}
function Ya(e, t, n = Qe + 1) {
  for (; n < Re.length; n++) {
    const a = Re[n];
    if (a && a.flags & 2) {
      if (e && a.id !== e.uid) continue;
      Re.splice(n, 1), n--, a.flags & 4 && (a.flags &= -2), a(), a.flags & 4 || (a.flags &= -2);
    }
  }
}
function os(e) {
  if (Bt.length) {
    const t = [...new Set(Bt)].sort((n, a) => cn(n) - cn(a));
    if (Bt.length = 0, bt) {
      bt.push(...t);
      return;
    }
    for (bt = t, Ot = 0; Ot < bt.length; Ot++) {
      const n = bt[Ot];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    bt = null, Ot = 0;
  }
}
var cn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function us(e) {
  try {
    for (Qe = 0; Qe < Re.length; Qe++) {
      const t = Re[Qe];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), kn(t, t.i, t.i ? 15 : 14), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Qe < Re.length; Qe++) {
      const t = Re[Qe];
      t && (t.flags &= -2);
    }
    Qe = -1, Re.length = 0, os(e), Mn = null, (Re.length || Bt.length) && us(e);
  }
}
var Ee = null, ds = null;
function Dn(e) {
  const t = Ee;
  return Ee = e, ds = e && e.type.__scopeId || null, t;
}
function Ft(e, t = Ee, n) {
  if (!t || e._n) return e;
  const a = (...l) => {
    a._d && Rn(-1);
    const i = Dn(t);
    let r;
    try {
      r = e(...l);
    } finally {
      Dn(i), a._d && Rn(1);
    }
    return r;
  };
  return a._n = !0, a._c = !0, a._d = !0, a;
}
function Ae(e, t) {
  if (Ee === null) return e;
  const n = Yn(Ee), a = e.dirs || (e.dirs = []);
  for (let l = 0; l < t.length; l++) {
    let [i, r, o, u = ve] = t[l];
    i && (ne(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && ot(r), a.push({
      dir: i,
      instance: n,
      value: r,
      oldValue: void 0,
      arg: o,
      modifiers: u
    }));
  }
  return e;
}
function wt(e, t, n, a) {
  const l = e.dirs, i = t && t.dirs;
  for (let r = 0; r < l.length; r++) {
    const o = l[r];
    i && (o.oldValue = i[r].value);
    let u = o.dir[a];
    u && (ct(), je(u, n, 8, [
      e.el,
      o,
      e,
      t
    ]), ft());
  }
}
function Vi(e, t) {
  if (De) {
    let n = De.provides;
    const a = De.parent && De.parent.provides;
    a === n && (n = De.provides = Object.create(a)), n[e] = t;
  }
}
function In(e, t, n = !1) {
  const a = Ws();
  if (a || Vt) {
    let l = Vt ? Vt._context.provides : a ? a.parent == null || a.ce ? a.vnode.appContext && a.vnode.appContext.provides : a.parent.provides : void 0;
    if (l && e in l) return l[e];
    if (arguments.length > 1) return n && ne(t) ? t.call(a && a.proxy) : t;
  }
}
var Hi = /* @__PURE__ */ Symbol.for("v-scx"), Ui = () => {
  {
    const e = In(Hi);
    return e;
  }
};
function Mt(e, t, n) {
  return cs(e, t, n);
}
function cs(e, t, n = ve) {
  const { immediate: a, deep: l, flush: i, once: r } = n, o = we({}, n), u = t && a || !t && i !== "post";
  let c;
  if (gn) {
    if (i === "sync") {
      const b = Ui();
      c = b.__watcherHandles || (b.__watcherHandles = []);
    } else if (!u) {
      const b = () => {
      };
      return b.stop = nt, b.resume = nt, b.pause = nt, b;
    }
  }
  const d = De;
  o.call = (b, R, L) => je(b, d, R, L);
  let f = !1;
  i === "post" ? o.scheduler = (b) => {
    Be(b, d && d.suspense);
  } : i !== "sync" && (f = !0, o.scheduler = (b, R) => {
    R ? b() : Ba(b);
  }), o.augmentJob = (b) => {
    t && (b.flags |= 4), f && (b.flags |= 2, d && (b.id = d.uid, b.i = d));
  };
  const y = Pi(e, t, o);
  return gn && (c ? c.push(y) : u && y()), y;
}
function Wi(e, t, n) {
  const a = this.proxy, l = _e(e) ? e.includes(".") ? fs(a, e) : () => a[e] : e.bind(a, a);
  let i;
  ne(t) ? i = t : (i = t.handler, n = t);
  const r = _n(this), o = cs(l, i.bind(a), n);
  return r(), o;
}
function fs(e, t) {
  const n = t.split(".");
  return () => {
    let a = e;
    for (let l = 0; l < n.length && a; l++) a = a[n[l]];
    return a;
  };
}
var Gi = /* @__PURE__ */ Symbol("_vte"), vs = (e) => e.__isTeleport, We = /* @__PURE__ */ Symbol("_leaveCb"), Jt = /* @__PURE__ */ Symbol("_enterCb");
function ji() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return mt(() => {
    e.isMounted = !0;
  }), gt(() => {
    e.isUnmounting = !0;
  }), e;
}
var Ue = [Function, Array], ps = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  onBeforeEnter: Ue,
  onEnter: Ue,
  onAfterEnter: Ue,
  onEnterCancelled: Ue,
  onBeforeLeave: Ue,
  onLeave: Ue,
  onAfterLeave: Ue,
  onLeaveCancelled: Ue,
  onBeforeAppear: Ue,
  onAppear: Ue,
  onAfterAppear: Ue,
  onAppearCancelled: Ue
}, ms = (e) => {
  const t = e.subTree;
  return t.component ? ms(t.component) : t;
}, qi = {
  name: "BaseTransition",
  props: ps,
  setup(e, { slots: t }) {
    const n = Ws(), a = ji();
    return () => {
      const l = t.default && bs(t.default(), !0), i = l && l.length ? gs(l) : n.subTree ? F() : void 0;
      if (!i) return;
      const r = /* @__PURE__ */ te(e), { mode: o } = r;
      if (a.isLeaving) return ia(i);
      const u = Qa(i);
      if (!u) return ia(i);
      let c = ka(u, r, a, n, (f) => c = f);
      u.type !== Me && fn(u, c);
      let d = n.subTree && Qa(n.subTree);
      if (d && d.type !== Me && !It(d, u) && ms(n).type !== Me) {
        let f = ka(d, r, a, n);
        if (fn(d, f), o === "out-in" && u.type !== Me)
          return a.isLeaving = !0, f.afterLeave = () => {
            a.isLeaving = !1, n.job.flags & 8 || n.update(), delete f.afterLeave, d = void 0;
          }, ia(i);
        o === "in-out" && u.type !== Me ? f.delayLeave = (y, b, R) => {
          const L = hs(a, d);
          L[String(d.key)] = d, y[We] = () => {
            b(), y[We] = void 0, delete c.delayedLeave, d = void 0;
          }, c.delayedLeave = () => {
            R(), delete c.delayedLeave, d = void 0;
          };
        } : d = void 0;
      } else d && (d = void 0);
      return i;
    };
  }
};
function gs(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const n of e) if (n.type !== Me) {
      t = n;
      break;
    }
  }
  return t;
}
var Ki = qi;
function hs(e, t) {
  const { leavingVNodes: n } = e;
  let a = n.get(t.type);
  return a || (a = /* @__PURE__ */ Object.create(null), n.set(t.type, a)), a;
}
function ka(e, t, n, a, l) {
  const { appear: i, mode: r, persisted: o = !1, onBeforeEnter: u, onEnter: c, onAfterEnter: d, onEnterCancelled: f, onBeforeLeave: y, onLeave: b, onAfterLeave: R, onLeaveCancelled: L, onBeforeAppear: Q, onAppear: z, onAfterAppear: j, onAppearCancelled: X } = t, $ = String(e.key), w = hs(n, e), E = (_, S) => {
    _ && je(_, a, 9, S);
  }, A = (_, S) => {
    const W = S[1];
    E(_, S), J(_) ? _.every((H) => H.length <= 1) && W() : _.length <= 1 && W();
  }, C = {
    mode: r,
    persisted: o,
    beforeEnter(_) {
      let S = u;
      if (!n.isMounted) if (i) S = Q || u;
      else return;
      _[We] && _[We](!0);
      const W = w[$];
      W && It(e, W) && W.el[We] && W.el[We](), E(S, [_]);
    },
    enter(_) {
      if (w[$] === e) return;
      let S = c, W = d, H = f;
      if (!n.isMounted) if (i)
        S = z || c, W = j || d, H = X || f;
      else return;
      let G = !1;
      _[Jt] = (re) => {
        G || (G = !0, re ? E(H, [_]) : E(W, [_]), C.delayedLeave && C.delayedLeave(), _[Jt] = void 0);
      };
      const D = _[Jt].bind(null, !1);
      S ? A(S, [_, D]) : D();
    },
    leave(_, S) {
      const W = String(e.key);
      if (_[Jt] && _[Jt](!0), n.isUnmounting) return S();
      E(y, [_]);
      let H = !1;
      _[We] = (D) => {
        H || (H = !0, S(), D ? E(L, [_]) : E(R, [_]), _[We] = void 0, w[W] === e && delete w[W]);
      };
      const G = _[We].bind(null, !1);
      w[W] = e, b ? A(b, [_, G]) : G();
    },
    clone(_) {
      const S = ka(_, t, n, a, l);
      return l && l(S), S;
    }
  };
  return C;
}
function ia(e) {
  if (Kn(e))
    return e = _t(e), e.children = null, e;
}
function Qa(e) {
  if (!Kn(e))
    return vs(e.type) && e.children ? gs(e.children) : e;
  if (e.component) return e.component.subTree;
  const { shapeFlag: t, children: n } = e;
  if (n) {
    if (t & 16) return n[0];
    if (t & 32 && ne(n.default)) return n.default();
  }
}
function fn(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, fn(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function bs(e, t = !1, n) {
  let a = [], l = 0;
  for (let i = 0; i < e.length; i++) {
    let r = e[i];
    const o = n == null ? r.key : String(n) + String(r.key != null ? r.key : i);
    r.type === ae ? (r.patchFlag & 128 && l++, a = a.concat(bs(r.children, t, o))) : (t || r.type !== Me) && a.push(o != null ? _t(r, { key: o }) : r);
  }
  if (l > 1) for (let i = 0; i < a.length; i++) a[i].patchFlag = -2;
  return a;
}
// @__NO_SIDE_EFFECTS__
function ie(e, t) {
  return ne(e) ? we({ name: e.name }, t, { setup: e }) : e;
}
function ys(e) {
  e.ids = [
    e.ids[0] + e.ids[2]++ + "-",
    0,
    0
  ];
}
function Za(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
var Ln = /* @__PURE__ */ new WeakMap();
function sn(e, t, n, a, l = !1) {
  if (J(e)) {
    e.forEach((L, Q) => sn(L, t && (J(t) ? t[Q] : t), n, a, l));
    return;
  }
  if (Nt(a) && !l) {
    a.shapeFlag & 512 && a.type.__asyncResolved && a.component.subTree.component && sn(e, t, n, a.component.subTree);
    return;
  }
  const i = a.shapeFlag & 4 ? Yn(a.component) : a.el, r = l ? null : i, { i: o, r: u } = e, c = t && t.r, d = o.refs === ve ? o.refs = {} : o.refs, f = o.setupState, y = /* @__PURE__ */ te(f), b = f === ve ? Pl : (L) => Za(d, L) ? !1 : de(y, L), R = (L, Q) => !(Q && Za(d, Q));
  if (c != null && c !== u) {
    if (el(t), _e(c))
      d[c] = null, b(c) && (f[c] = null);
    else if (/* @__PURE__ */ Le(c)) {
      const L = t;
      R(c, L.k) && (c.value = null), L.k && (d[L.k] = null);
    }
  }
  if (ne(u)) kn(u, o, 12, [r, d]);
  else {
    const L = _e(u), Q = /* @__PURE__ */ Le(u);
    if (L || Q) {
      const z = () => {
        if (e.f) {
          const j = L ? b(u) ? f[u] : d[u] : R(u) || !e.k ? u.value : d[e.k];
          if (l) J(j) && xa(j, i);
          else if (J(j)) j.includes(i) || j.push(i);
          else if (L)
            d[u] = [i], b(u) && (f[u] = d[u]);
          else {
            const X = [i];
            R(u, e.k) && (u.value = X), e.k && (d[e.k] = X);
          }
        } else L ? (d[u] = r, b(u) && (f[u] = r)) : Q && (R(u, e.k) && (u.value = r), e.k && (d[e.k] = r));
      };
      if (r) {
        const j = () => {
          z(), Ln.delete(e);
        };
        j.id = -1, Ln.set(e, j), Be(j, n);
      } else
        el(e), z();
    }
  }
}
function el(e) {
  const t = Ln.get(e);
  t && (t.flags |= 8, Ln.delete(e));
}
var Tm = Wn().requestIdleCallback || ((e) => setTimeout(e, 1)), Mm = Wn().cancelIdleCallback || ((e) => clearTimeout(e)), Nt = (e) => !!e.type.__asyncLoader, Kn = (e) => e.type.__isKeepAlive;
function zi(e, t) {
  ks(e, "a", t);
}
function Xi(e, t) {
  ks(e, "da", t);
}
function ks(e, t, n = De) {
  const a = e.__wdc || (e.__wdc = () => {
    let l = n;
    for (; l; ) {
      if (l.isDeactivated) return;
      l = l.parent;
    }
    return e();
  });
  if (zn(t, a, n), n) {
    let l = n.parent;
    for (; l && l.parent; )
      Kn(l.parent.vnode) && Ji(a, t, n, l), l = l.parent;
  }
}
function Ji(e, t, n, a) {
  const l = zn(t, e, a, !0);
  _s(() => {
    xa(a[t], l);
  }, n);
}
function zn(e, t, n = De, a = !1) {
  if (n) {
    const l = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...r) => {
      ct();
      const o = _n(n), u = je(t, n, e, r);
      return o(), ft(), u;
    });
    return a ? l.unshift(i) : l.push(i), i;
  }
}
var pt = (e) => (t, n = De) => {
  (!gn || e === "sp") && zn(e, (...a) => t(...a), n);
}, Yi = pt("bm"), mt = pt("m"), Qi = pt("bu"), Zi = pt("u"), gt = pt("bum"), _s = pt("um"), er = pt("sp"), tr = pt("rtg"), nr = pt("rtc");
function ar(e, t = De) {
  zn("ec", e, t);
}
var $s = "components", ws = /* @__PURE__ */ Symbol.for("v-ndc");
function lr(e) {
  return _e(e) ? sr($s, e, !1) || e : e || ws;
}
function sr(e, t, n = !0, a = !1) {
  const l = Ee || De;
  if (l) {
    const i = l.type;
    if (e === $s) {
      const o = Wr(i, !1);
      if (o && (o === t || o === Pe(t) || o === Hn(Pe(t)))) return i;
    }
    const r = tl(l[e] || i[e], t) || tl(l.appContext[e], t);
    return !r && a ? i : r;
  }
}
function tl(e, t) {
  return e && (e[t] || e[Pe(t)] || e[Hn(Pe(t))]);
}
function me(e, t, n, a) {
  let l;
  const i = n && n[a], r = J(e);
  if (r || _e(e)) {
    const o = r && /* @__PURE__ */ Tt(e);
    let u = !1, c = !1;
    o && (u = !/* @__PURE__ */ Ge(e), c = /* @__PURE__ */ vt(e), e = Gn(e)), l = new Array(e.length);
    for (let d = 0, f = e.length; d < f; d++) l[d] = t(u ? c ? Ht(Xe(e[d])) : Xe(e[d]) : e[d], d, void 0, i && i[d]);
  } else if (typeof e == "number") {
    l = new Array(e);
    for (let o = 0; o < e; o++) l[o] = t(o + 1, o, void 0, i && i[o]);
  } else if (ce(e)) if (e[Symbol.iterator]) l = Array.from(e, (o, u) => t(o, u, void 0, i && i[u]));
  else {
    const o = Object.keys(e);
    l = new Array(o.length);
    for (let u = 0, c = o.length; u < c; u++) {
      const d = o[u];
      l[u] = t(e[d], d, u, i && i[u]);
    }
  }
  else l = [];
  return n && (n[a] = l), l;
}
function vn(e, t, n = {}, a, l) {
  if (Ee.ce || Ee.parent && Nt(Ee.parent) && Ee.parent.ce) {
    const c = Object.keys(n).length > 0;
    return t !== "default" && (n.name = t), v(), pe(ae, null, [$e("slot", n, a && a())], c ? -2 : 64);
  }
  let i = e[t];
  i && i._c && (i._d = !1), v();
  const r = i && Cs(i(n)), o = n.key || r && r.key, u = pe(ae, { key: (o && !ze(o) ? o : `_${t}`) + (!r && a ? "_fb" : "") }, r || (a ? a() : []), r && e._ === 1 ? 64 : -2);
  return !l && u.scopeId && (u.slotScopeIds = [u.scopeId + "-s"]), i && i._c && (i._d = !0), u;
}
function Cs(e) {
  return e.some((t) => mn(t) ? !(t.type === Me || t.type === ae && !Cs(t.children)) : !0) ? e : null;
}
var _a = (e) => e ? Gs(e) ? Yn(e) : _a(e.parent) : null, rn = /* @__PURE__ */ we(/* @__PURE__ */ Object.create(null), {
  $: (e) => e,
  $el: (e) => e.vnode.el,
  $data: (e) => e.data,
  $props: (e) => e.props,
  $attrs: (e) => e.attrs,
  $slots: (e) => e.slots,
  $refs: (e) => e.refs,
  $parent: (e) => _a(e.parent),
  $root: (e) => _a(e.root),
  $host: (e) => e.ce,
  $emit: (e) => e.emit,
  $options: (e) => Fa(e),
  $forceUpdate: (e) => e.f || (e.f = () => {
    Ba(e.update);
  }),
  $nextTick: (e) => e.n || (e.n = qn.bind(e.proxy)),
  $watch: (e) => Wi.bind(e)
}), ra = (e, t) => e !== ve && !e.__isScriptSetup && de(e, t), ir = {
  get({ _: e }, t) {
    if (t === "__v_skip") return !0;
    const { ctx: n, setupState: a, data: l, props: i, accessCache: r, type: o, appContext: u } = e;
    if (t[0] !== "$") {
      const y = r[t];
      if (y !== void 0) switch (y) {
        case 1:
          return a[t];
        case 2:
          return l[t];
        case 4:
          return n[t];
        case 3:
          return i[t];
      }
      else {
        if (ra(a, t))
          return r[t] = 1, a[t];
        if (l !== ve && de(l, t))
          return r[t] = 2, l[t];
        if (de(i, t))
          return r[t] = 3, i[t];
        if (n !== ve && de(n, t))
          return r[t] = 4, n[t];
        $a && (r[t] = 0);
      }
    }
    const c = rn[t];
    let d, f;
    if (c)
      return t === "$attrs" && Te(e.attrs, "get", ""), c(e);
    if ((d = o.__cssModules) && (d = d[t])) return d;
    if (n !== ve && de(n, t))
      return r[t] = 4, n[t];
    if (f = u.config.globalProperties, de(f, t)) return f[t];
  },
  set({ _: e }, t, n) {
    const { data: a, setupState: l, ctx: i } = e;
    return ra(l, t) ? (l[t] = n, !0) : a !== ve && de(a, t) ? (a[t] = n, !0) : de(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: n, ctx: a, appContext: l, props: i, type: r } }, o) {
    let u;
    return !!(n[o] || e !== ve && o[0] !== "$" && de(e, o) || ra(t, o) || de(i, o) || de(a, o) || de(rn, o) || de(l.config.globalProperties, o) || (u = r.__cssModules) && u[o]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : de(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function nl(e) {
  return J(e) ? e.reduce((t, n) => (t[n] = null, t), {}) : e;
}
var $a = !0;
function rr(e) {
  const t = Fa(e), n = e.proxy, a = e.ctx;
  $a = !1, t.beforeCreate && al(t.beforeCreate, e, "bc");
  const { data: l, computed: i, methods: r, watch: o, provide: u, inject: c, created: d, beforeMount: f, mounted: y, beforeUpdate: b, updated: R, activated: L, deactivated: Q, beforeDestroy: z, beforeUnmount: j, destroyed: X, unmounted: $, render: w, renderTracked: E, renderTriggered: A, errorCaptured: C, serverPrefetch: _, expose: S, inheritAttrs: W, components: H, directives: G, filters: D } = t;
  if (c && or(c, a, null), r) for (const oe in r) {
    const fe = r[oe];
    ne(fe) && (a[oe] = fe.bind(n));
  }
  if (l) {
    const oe = l.call(n, n);
    ce(oe) && (e.data = /* @__PURE__ */ kt(oe));
  }
  if ($a = !0, i) for (const oe in i) {
    const fe = i[oe], N = Z({
      get: ne(fe) ? fe.bind(n, n) : ne(fe.get) ? fe.get.bind(n, n) : nt,
      set: !ne(fe) && ne(fe.set) ? fe.set.bind(n) : nt
    });
    Object.defineProperty(a, oe, {
      enumerable: !0,
      configurable: !0,
      get: () => N.value,
      set: (O) => N.value = O
    });
  }
  if (o) for (const oe in o) Ss(o[oe], a, n, oe);
  if (u) {
    const oe = ne(u) ? u.call(n) : u;
    Reflect.ownKeys(oe).forEach((fe) => {
      Vi(fe, oe[fe]);
    });
  }
  d && al(d, e, "c");
  function ke(oe, fe) {
    J(fe) ? fe.forEach((N) => oe(N.bind(n))) : fe && oe(fe.bind(n));
  }
  if (ke(Yi, f), ke(mt, y), ke(Qi, b), ke(Zi, R), ke(zi, L), ke(Xi, Q), ke(ar, C), ke(nr, E), ke(tr, A), ke(gt, j), ke(_s, $), ke(er, _), J(S))
    if (S.length) {
      const oe = e.exposed || (e.exposed = {});
      S.forEach((fe) => {
        Object.defineProperty(oe, fe, {
          get: () => n[fe],
          set: (N) => n[fe] = N,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  w && e.render === nt && (e.render = w), W != null && (e.inheritAttrs = W), H && (e.components = H), G && (e.directives = G), _ && ys(e);
}
function or(e, t, n = nt) {
  J(e) && (e = wa(e));
  for (const a in e) {
    const l = e[a];
    let i;
    ce(l) ? "default" in l ? i = In(l.from || a, l.default, !0) : i = In(l.from || a) : i = In(l), /* @__PURE__ */ Le(i) ? Object.defineProperty(t, a, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (r) => i.value = r
    }) : t[a] = i;
  }
}
function al(e, t, n) {
  je(J(e) ? e.map((a) => a.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Ss(e, t, n, a) {
  let l = a.includes(".") ? fs(n, a) : () => n[a];
  if (_e(e)) {
    const i = t[e];
    ne(i) && Mt(l, i);
  } else if (ne(e)) Mt(l, e.bind(n));
  else if (ce(e)) if (J(e)) e.forEach((i) => Ss(i, t, n, a));
  else {
    const i = ne(e.handler) ? e.handler.bind(n) : t[e.handler];
    ne(i) && Mt(l, i, e);
  }
}
function Fa(e) {
  const t = e.type, { mixins: n, extends: a } = t, { mixins: l, optionsCache: i, config: { optionMergeStrategies: r } } = e.appContext, o = i.get(t);
  let u;
  return o ? u = o : !l.length && !n && !a ? u = t : (u = {}, l.length && l.forEach((c) => On(u, c, r, !0)), On(u, t, r)), ce(t) && i.set(t, u), u;
}
function On(e, t, n, a = !1) {
  const { mixins: l, extends: i } = t;
  i && On(e, i, n, !0), l && l.forEach((r) => On(e, r, n, !0));
  for (const r in t) if (!(a && r === "expose")) {
    const o = ur[r] || n && n[r];
    e[r] = o ? o(e[r], t[r]) : t[r];
  }
  return e;
}
var ur = {
  data: ll,
  props: sl,
  emits: sl,
  methods: en,
  computed: en,
  beforeCreate: Oe,
  created: Oe,
  beforeMount: Oe,
  mounted: Oe,
  beforeUpdate: Oe,
  updated: Oe,
  beforeDestroy: Oe,
  beforeUnmount: Oe,
  destroyed: Oe,
  unmounted: Oe,
  activated: Oe,
  deactivated: Oe,
  errorCaptured: Oe,
  serverPrefetch: Oe,
  components: en,
  directives: en,
  watch: cr,
  provide: ll,
  inject: dr
};
function ll(e, t) {
  return t ? e ? function() {
    return we(ne(e) ? e.call(this, this) : e, ne(t) ? t.call(this, this) : t);
  } : t : e;
}
function dr(e, t) {
  return en(wa(e), wa(t));
}
function wa(e) {
  if (J(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Oe(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function en(e, t) {
  return e ? we(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function sl(e, t) {
  return e ? J(e) && J(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : we(/* @__PURE__ */ Object.create(null), nl(e), nl(t ?? {})) : t;
}
function cr(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = we(/* @__PURE__ */ Object.create(null), e);
  for (const a in t) n[a] = Oe(e[a], t[a]);
  return n;
}
function As() {
  return {
    app: null,
    config: {
      isNativeTag: Pl,
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
var fr = 0;
function vr(e, t) {
  return function(a, l = null) {
    ne(a) || (a = we({}, a)), l != null && !ce(l) && (l = null);
    const i = As(), r = /* @__PURE__ */ new WeakSet(), o = [];
    let u = !1;
    const c = i.app = {
      _uid: fr++,
      _component: a,
      _props: l,
      _container: null,
      _context: i,
      _instance: null,
      version: qr,
      get config() {
        return i.config;
      },
      set config(d) {
      },
      use(d, ...f) {
        return r.has(d) || (d && ne(d.install) ? (r.add(d), d.install(c, ...f)) : ne(d) && (r.add(d), d(c, ...f))), c;
      },
      mixin(d) {
        return i.mixins.includes(d) || i.mixins.push(d), c;
      },
      component(d, f) {
        return f ? (i.components[d] = f, c) : i.components[d];
      },
      directive(d, f) {
        return f ? (i.directives[d] = f, c) : i.directives[d];
      },
      mount(d, f, y) {
        if (!u) {
          const b = c._ceVNode || $e(a, l);
          return b.appContext = i, y === !0 ? y = "svg" : y === !1 && (y = void 0), f && t ? t(b, d) : e(b, d, y), u = !0, c._container = d, d.__vue_app__ = c, Yn(b.component);
        }
      },
      onUnmount(d) {
        o.push(d);
      },
      unmount() {
        u && (je(o, c._instance, 16), e(null, c._container), delete c._container.__vue_app__);
      },
      provide(d, f) {
        return i.provides[d] = f, c;
      },
      runWithContext(d) {
        const f = Vt;
        Vt = c;
        try {
          return d();
        } finally {
          Vt = f;
        }
      }
    };
    return c;
  };
}
var Vt = null, pr = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Pe(t)}Modifiers`] || e[`${$t(t)}Modifiers`];
function mr(e, t, ...n) {
  if (e.isUnmounted) return;
  const a = e.vnode.props || ve;
  let l = n;
  const i = t.startsWith("update:"), r = i && pr(a, t.slice(7));
  r && (r.trim && (l = n.map((d) => _e(d) ? d.trim() : d)), r.number && (l = n.map(Un)));
  let o, u = a[o = ta(t)] || a[o = ta(Pe(t))];
  !u && i && (u = a[o = ta($t(t))]), u && je(u, e, 6, l);
  const c = a[o + "Once"];
  if (c) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[o]) return;
    e.emitted[o] = !0, je(c, e, 6, l);
  }
}
var gr = /* @__PURE__ */ new WeakMap();
function xs(e, t, n = !1) {
  const a = n ? gr : t.emitsCache, l = a.get(e);
  if (l !== void 0) return l;
  const i = e.emits;
  let r = {}, o = !1;
  if (!ne(e)) {
    const u = (c) => {
      const d = xs(c, t, !0);
      d && (o = !0, we(r, d));
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  return !i && !o ? (ce(e) && a.set(e, null), null) : (J(i) ? i.forEach((u) => r[u] = null) : we(r, i), ce(e) && a.set(e, r), r);
}
function Xn(e, t) {
  return !e || !Fn(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), de(e, t[0].toLowerCase() + t.slice(1)) || de(e, $t(t)) || de(e, t));
}
function oa(e) {
  const { type: t, vnode: n, proxy: a, withProxy: l, propsOptions: [i], slots: r, attrs: o, emit: u, render: c, renderCache: d, props: f, data: y, setupState: b, ctx: R, inheritAttrs: L } = e, Q = Dn(e);
  let z, j;
  try {
    if (n.shapeFlag & 4) {
      const $ = l || a, w = $;
      z = et(c.call(w, $, d, f, b, y, R)), j = o;
    } else {
      const $ = t;
      z = et($.length > 1 ? $(f, {
        attrs: o,
        slots: r,
        emit: u
      }) : $(f, null)), j = t.props ? o : hr(o);
    }
  } catch ($) {
    on.length = 0, jn($, e, 1), z = $e(Me);
  }
  let X = z;
  if (j && L !== !1) {
    const $ = Object.keys(j), { shapeFlag: w } = X;
    $.length && w & 7 && (i && $.some(Nn) && (j = br(j, i)), X = _t(X, j, !1, !0));
  }
  return n.dirs && (X = _t(X, null, !1, !0), X.dirs = X.dirs ? X.dirs.concat(n.dirs) : n.dirs), n.transition && fn(X, n.transition), z = X, Dn(Q), z;
}
var hr = (e) => {
  let t;
  for (const n in e) (n === "class" || n === "style" || Fn(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, br = (e, t) => {
  const n = {};
  for (const a in e) (!Nn(a) || !(a.slice(9) in t)) && (n[a] = e[a]);
  return n;
};
function yr(e, t, n) {
  const { props: a, children: l, component: i } = e, { props: r, children: o, patchFlag: u } = t, c = i.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && u >= 0) {
    if (u & 1024) return !0;
    if (u & 16)
      return a ? il(a, r, c) : !!r;
    if (u & 8) {
      const d = t.dynamicProps;
      for (let f = 0; f < d.length; f++) {
        const y = d[f];
        if (Is(r, a, y) && !Xn(c, y)) return !0;
      }
    }
  } else
    return (l || o) && (!o || !o.$stable) ? !0 : a === r ? !1 : a ? r ? il(a, r, c) : !0 : !!r;
  return !1;
}
function il(e, t, n) {
  const a = Object.keys(t);
  if (a.length !== Object.keys(e).length) return !0;
  for (let l = 0; l < a.length; l++) {
    const i = a[l];
    if (Is(t, e, i) && !Xn(n, i)) return !0;
  }
  return !1;
}
function Is(e, t, n) {
  const a = e[n], l = t[n];
  return n === "style" && ce(a) && ce(l) ? !qt(a, l) : a !== l;
}
function kr({ vnode: e, parent: t, suspense: n }, a) {
  for (; t; ) {
    const l = t.subTree;
    if (l.suspense && l.suspense.activeBranch === e && (l.suspense.vnode.el = l.el = a, e = l), l === e)
      (e = t.vnode).el = a, t = t.parent;
    else break;
  }
  n && n.activeBranch === e && (n.vnode.el = a);
}
var Es = {}, Ts = () => Object.create(Es), Ms = (e) => Object.getPrototypeOf(e) === Es;
function _r(e, t, n, a = !1) {
  const l = {}, i = Ts();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Ds(e, t, l, i);
  for (const r in e.propsOptions[0]) r in l || (l[r] = void 0);
  n ? e.props = a ? l : /* @__PURE__ */ Ii(l) : e.type.props ? e.props = l : e.props = i, e.attrs = i;
}
function $r(e, t, n, a) {
  const { props: l, attrs: i, vnode: { patchFlag: r } } = e, o = /* @__PURE__ */ te(l), [u] = e.propsOptions;
  let c = !1;
  if ((a || r > 0) && !(r & 16)) {
    if (r & 8) {
      const d = e.vnode.dynamicProps;
      for (let f = 0; f < d.length; f++) {
        let y = d[f];
        if (Xn(e.emitsOptions, y)) continue;
        const b = t[y];
        if (u) if (de(i, y))
          b !== i[y] && (i[y] = b, c = !0);
        else {
          const R = Pe(y);
          l[R] = Ca(u, o, R, b, e, !1);
        }
        else b !== i[y] && (i[y] = b, c = !0);
      }
    }
  } else {
    Ds(e, t, l, i) && (c = !0);
    let d;
    for (const f in o) (!t || !de(t, f) && ((d = $t(f)) === f || !de(t, d))) && (u ? n && (n[f] !== void 0 || n[d] !== void 0) && (l[f] = Ca(u, o, f, void 0, e, !0)) : delete l[f]);
    if (i !== o)
      for (const f in i) (!t || !de(t, f)) && (delete i[f], c = !0);
  }
  c && rt(e.attrs, "set", "");
}
function Ds(e, t, n, a) {
  const [l, i] = e.propsOptions;
  let r = !1, o;
  if (t) for (let u in t) {
    if (nn(u)) continue;
    const c = t[u];
    let d;
    l && de(l, d = Pe(u)) ? !i || !i.includes(d) ? n[d] = c : (o || (o = {}))[d] = c : Xn(e.emitsOptions, u) || (!(u in a) || c !== a[u]) && (a[u] = c, r = !0);
  }
  if (i) {
    const u = /* @__PURE__ */ te(n), c = o || ve;
    for (let d = 0; d < i.length; d++) {
      const f = i[d];
      n[f] = Ca(l, u, f, c[f], e, !de(c, f));
    }
  }
  return r;
}
function Ca(e, t, n, a, l, i) {
  const r = e[n];
  if (r != null) {
    const o = de(r, "default");
    if (o && a === void 0) {
      const u = r.default;
      if (r.type !== Function && !r.skipFactory && ne(u)) {
        const { propsDefaults: c } = l;
        if (n in c) a = c[n];
        else {
          const d = _n(l);
          a = c[n] = u.call(null, t), d();
        }
      } else a = u;
      l.ce && l.ce._setProp(n, a);
    }
    r[0] && (i && !o ? a = !1 : r[1] && (a === "" || a === $t(n)) && (a = !0));
  }
  return a;
}
var wr = /* @__PURE__ */ new WeakMap();
function Ls(e, t, n = !1) {
  const a = n ? wr : t.propsCache, l = a.get(e);
  if (l) return l;
  const i = e.props, r = {}, o = [];
  let u = !1;
  if (!ne(e)) {
    const d = (f) => {
      u = !0;
      const [y, b] = Ls(f, t, !0);
      we(r, y), b && o.push(...b);
    };
    !n && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  if (!i && !u)
    return ce(e) && a.set(e, Rt), Rt;
  if (J(i)) for (let d = 0; d < i.length; d++) {
    const f = Pe(i[d]);
    rl(f) && (r[f] = ve);
  }
  else if (i) for (const d in i) {
    const f = Pe(d);
    if (rl(f)) {
      const y = i[d], b = r[f] = J(y) || ne(y) ? { type: y } : we({}, y), R = b.type;
      let L = !1, Q = !0;
      if (J(R)) for (let z = 0; z < R.length; ++z) {
        const j = R[z], X = ne(j) && j.name;
        if (X === "Boolean") {
          L = !0;
          break;
        } else X === "String" && (Q = !1);
      }
      else L = ne(R) && R.name === "Boolean";
      b[0] = L, b[1] = Q, (L || de(b, "default")) && o.push(f);
    }
  }
  const c = [r, o];
  return ce(e) && a.set(e, c), c;
}
function rl(e) {
  return e[0] !== "$" && !nn(e);
}
var Na = (e) => e === "_" || e === "_ctx" || e === "$stable", Va = (e) => J(e) ? e.map(et) : [et(e)], Cr = (e, t, n) => {
  if (t._n) return t;
  const a = Ft((...l) => Va(t(...l)), n);
  return a._c = !1, a;
}, Os = (e, t, n) => {
  const a = e._ctx;
  for (const l in e) {
    if (Na(l)) continue;
    const i = e[l];
    if (ne(i)) t[l] = Cr(l, i, a);
    else if (i != null) {
      const r = Va(i);
      t[l] = () => r;
    }
  }
}, Rs = (e, t) => {
  const n = Va(t);
  e.slots.default = () => n;
}, Ps = (e, t, n) => {
  for (const a in t) (n || !Na(a)) && (e[a] = t[a]);
}, Sr = (e, t, n) => {
  const a = e.slots = Ts();
  if (e.vnode.shapeFlag & 32) {
    const l = t._;
    l ? (Ps(a, t, n), n && Vl(a, "_", l, !0)) : Os(t, a);
  } else t && Rs(e, t);
}, Ar = (e, t, n) => {
  const { vnode: a, slots: l } = e;
  let i = !0, r = ve;
  if (a.shapeFlag & 32) {
    const o = t._;
    o ? n && o === 1 ? i = !1 : Ps(l, t, n) : (i = !t.$stable, Os(t, l)), r = t;
  } else t && (Rs(e, t), r = { default: 1 });
  if (i)
    for (const o in l) !Na(o) && r[o] == null && delete l[o];
}, Be = Mr;
function xr(e) {
  return Ir(e);
}
function Ir(e, t) {
  const n = Wn();
  n.__VUE__ = !0;
  const { insert: a, remove: l, patchProp: i, createElement: r, createText: o, createComment: u, setText: c, setElementText: d, parentNode: f, nextSibling: y, setScopeId: b = nt, insertStaticContent: R } = e, L = (p, h, k, M = null, I = null, x = null, V = void 0, B = null, P = !!h.dynamicChildren) => {
    if (p === h) return;
    p && !It(p, h) && (M = $n(p), xe(p, I, x, !0), p = null), h.patchFlag === -2 && (P = !1, h.dynamicChildren = null);
    const { type: T, ref: Y, shapeFlag: U } = h;
    switch (T) {
      case Jn:
        Q(p, h, k, M);
        break;
      case Me:
        z(p, h, k, M);
        break;
      case da:
        p == null && j(h, k, M, V);
        break;
      case ae:
        H(p, h, k, M, I, x, V, B, P);
        break;
      default:
        U & 1 ? w(p, h, k, M, I, x, V, B, P) : U & 6 ? G(p, h, k, M, I, x, V, B, P) : (U & 64 || U & 128) && T.process(p, h, k, M, I, x, V, B, P, Dt);
    }
    Y != null && I ? sn(Y, p && p.ref, x, h || p, !h) : Y == null && p && p.ref != null && sn(p.ref, null, x, p, !0);
  }, Q = (p, h, k, M) => {
    if (p == null) a(h.el = o(h.children), k, M);
    else {
      const I = h.el = p.el;
      h.children !== p.children && c(I, h.children);
    }
  }, z = (p, h, k, M) => {
    p == null ? a(h.el = u(h.children || ""), k, M) : h.el = p.el;
  }, j = (p, h, k, M) => {
    [p.el, p.anchor] = R(p.children, h, k, M, p.el, p.anchor);
  }, X = ({ el: p, anchor: h }, k, M) => {
    let I;
    for (; p && p !== h; )
      I = y(p), a(p, k, M), p = I;
    a(h, k, M);
  }, $ = ({ el: p, anchor: h }) => {
    let k;
    for (; p && p !== h; )
      k = y(p), l(p), p = k;
    l(h);
  }, w = (p, h, k, M, I, x, V, B, P) => {
    if (h.type === "svg" ? V = "svg" : h.type === "math" && (V = "mathml"), p == null) E(h, k, M, I, x, V, B, P);
    else {
      const T = p.el && p.el._isVueCE ? p.el : null;
      try {
        T && T._beginPatch(), _(p, h, I, x, V, B, P);
      } finally {
        T && T._endPatch();
      }
    }
  }, E = (p, h, k, M, I, x, V, B) => {
    let P, T;
    const { props: Y, shapeFlag: U, transition: K, dirs: ee } = p;
    if (P = p.el = r(p.type, x, Y && Y.is, Y), U & 8 ? d(P, p.children) : U & 16 && C(p.children, P, null, M, I, ua(p, x), V, B), ee && wt(p, null, M, "created"), A(P, p, p.scopeId, V, M), Y) {
      for (const ge in Y) ge !== "value" && !nn(ge) && i(P, ge, null, Y[ge], x, M);
      "value" in Y && i(P, "value", null, Y.value, x), (T = Y.onVnodeBeforeMount) && Ye(T, M, p);
    }
    ee && wt(p, null, M, "beforeMount");
    const ue = Er(I, K);
    ue && K.beforeEnter(P), a(P, h, k), ((T = Y && Y.onVnodeMounted) || ue || ee) && Be(() => {
      T && Ye(T, M, p), ue && K.enter(P), ee && wt(p, null, M, "mounted");
    }, I);
  }, A = (p, h, k, M, I) => {
    if (k && b(p, k), M) for (let x = 0; x < M.length; x++) b(p, M[x]);
    if (I) {
      let x = I.subTree;
      if (h === x || Vs(x.type) && (x.ssContent === h || x.ssFallback === h)) {
        const V = I.vnode;
        A(p, V, V.scopeId, V.slotScopeIds, I.parent);
      }
    }
  }, C = (p, h, k, M, I, x, V, B, P = 0) => {
    for (let T = P; T < p.length; T++) L(null, p[T] = B ? it(p[T]) : et(p[T]), h, k, M, I, x, V, B);
  }, _ = (p, h, k, M, I, x, V) => {
    const B = h.el = p.el;
    let { patchFlag: P, dynamicChildren: T, dirs: Y } = h;
    P |= p.patchFlag & 16;
    const U = p.props || ve, K = h.props || ve;
    let ee;
    if (k && Ct(k, !1), (ee = K.onVnodeBeforeUpdate) && Ye(ee, k, h, p), Y && wt(h, p, k, "beforeUpdate"), k && Ct(k, !0), (U.innerHTML && K.innerHTML == null || U.textContent && K.textContent == null) && d(B, ""), T ? S(p.dynamicChildren, T, B, k, M, ua(h, I), x) : V || fe(p, h, B, null, k, M, ua(h, I), x, !1), P > 0) {
      if (P & 16) W(B, U, K, k, I);
      else if (P & 2 && U.class !== K.class && i(B, "class", null, K.class, I), P & 4 && i(B, "style", U.style, K.style, I), P & 8) {
        const ue = h.dynamicProps;
        for (let ge = 0; ge < ue.length; ge++) {
          const he = ue[ge], Ce = U[he], Se = K[he];
          (Se !== Ce || he === "value") && i(B, he, Ce, Se, I, k);
        }
      }
      P & 1 && p.children !== h.children && d(B, h.children);
    } else !V && T == null && W(B, U, K, k, I);
    ((ee = K.onVnodeUpdated) || Y) && Be(() => {
      ee && Ye(ee, k, h, p), Y && wt(h, p, k, "updated");
    }, M);
  }, S = (p, h, k, M, I, x, V) => {
    for (let B = 0; B < h.length; B++) {
      const P = p[B], T = h[B];
      L(P, T, P.el && (P.type === ae || !It(P, T) || P.shapeFlag & 198) ? f(P.el) : k, null, M, I, x, V, !0);
    }
  }, W = (p, h, k, M, I) => {
    if (h !== k) {
      if (h !== ve)
        for (const x in h) !nn(x) && !(x in k) && i(p, x, h[x], null, I, M);
      for (const x in k) {
        if (nn(x)) continue;
        const V = k[x], B = h[x];
        V !== B && x !== "value" && i(p, x, B, V, I, M);
      }
      "value" in k && i(p, "value", h.value, k.value, I);
    }
  }, H = (p, h, k, M, I, x, V, B, P) => {
    const T = h.el = p ? p.el : o(""), Y = h.anchor = p ? p.anchor : o("");
    let { patchFlag: U, dynamicChildren: K, slotScopeIds: ee } = h;
    ee && (B = B ? B.concat(ee) : ee), p == null ? (a(T, k, M), a(Y, k, M), C(h.children || [], k, Y, I, x, V, B, P)) : U > 0 && U & 64 && K && p.dynamicChildren && p.dynamicChildren.length === K.length ? (S(p.dynamicChildren, K, k, I, x, V, B), (h.key != null || I && h === I.subTree) && Bs(p, h, !0)) : fe(p, h, k, Y, I, x, V, B, P);
  }, G = (p, h, k, M, I, x, V, B, P) => {
    h.slotScopeIds = B, p == null ? h.shapeFlag & 512 ? I.ctx.activate(h, k, M, V, P) : D(h, k, M, I, x, V, P) : re(p, h, P);
  }, D = (p, h, k, M, I, x, V) => {
    const B = p.component = Fr(p, M, I);
    if (Kn(p) && (B.ctx.renderer = Dt), Nr(B, !1, V), B.asyncDep) {
      if (I && I.registerDep(B, ke, V), !p.el) {
        const P = B.subTree = $e(Me);
        z(null, P, h, k), p.placeholder = P.el;
      }
    } else ke(B, p, h, k, I, x, V);
  }, re = (p, h, k) => {
    const M = h.component = p.component;
    if (yr(p, h, k)) if (M.asyncDep && !M.asyncResolved) {
      oe(M, h, k);
      return;
    } else
      M.next = h, M.update();
    else
      h.el = p.el, M.vnode = h;
  }, ke = (p, h, k, M, I, x, V) => {
    const B = () => {
      if (p.isMounted) {
        let { next: U, bu: K, u: ee, parent: ue, vnode: ge } = p;
        {
          const Fe = Fs(p);
          if (Fe) {
            U && (U.el = ge.el, oe(p, U, V)), Fe.asyncDep.then(() => {
              Be(() => {
                p.isUnmounted || T();
              }, I);
            });
            return;
          }
        }
        let he = U, Ce;
        Ct(p, !1), U ? (U.el = ge.el, oe(p, U, V)) : U = ge, K && xn(K), (Ce = U.props && U.props.onVnodeBeforeUpdate) && Ye(Ce, ue, U, ge), Ct(p, !0);
        const Se = oa(p), qe = p.subTree;
        p.subTree = Se, L(qe, Se, f(qe.el), $n(qe), p, I, x), U.el = Se.el, he === null && kr(p, Se.el), ee && Be(ee, I), (Ce = U.props && U.props.onVnodeUpdated) && Be(() => Ye(Ce, ue, U, ge), I);
      } else {
        let U;
        const { el: K, props: ee } = h, { bm: ue, m: ge, parent: he, root: Ce, type: Se } = p, qe = Nt(h);
        if (Ct(p, !1), ue && xn(ue), !qe && (U = ee && ee.onVnodeBeforeMount) && Ye(U, he, h), Ct(p, !0), K && ea) {
          const Fe = () => {
            p.subTree = oa(p), ea(K, p.subTree, p, I, null);
          };
          qe && Se.__asyncHydrate ? Se.__asyncHydrate(K, p, Fe) : Fe();
        } else {
          Ce.ce && Ce.ce._hasShadowRoot() && Ce.ce._injectChildStyle(Se, p.parent ? p.parent.type : void 0);
          const Fe = p.subTree = oa(p);
          L(null, Fe, k, M, p, I, x), h.el = Fe.el;
        }
        if (ge && Be(ge, I), !qe && (U = ee && ee.onVnodeMounted)) {
          const Fe = h;
          Be(() => Ye(U, he, Fe), I);
        }
        (h.shapeFlag & 256 || he && Nt(he.vnode) && he.vnode.shapeFlag & 256) && p.a && Be(p.a, I), p.isMounted = !0, h = k = M = null;
      }
    };
    p.scope.on();
    const P = p.effect = new jl(B);
    p.scope.off();
    const T = p.update = P.run.bind(P), Y = p.job = P.runIfDirty.bind(P);
    Y.i = p, Y.id = p.uid, P.scheduler = () => Ba(Y), Ct(p, !0), T();
  }, oe = (p, h, k) => {
    h.component = p;
    const M = p.vnode.props;
    p.vnode = h, p.next = null, $r(p, h.props, M, k), Ar(p, h.children, k), ct(), Ya(p), ft();
  }, fe = (p, h, k, M, I, x, V, B, P = !1) => {
    const T = p && p.children, Y = p ? p.shapeFlag : 0, U = h.children, { patchFlag: K, shapeFlag: ee } = h;
    if (K > 0) {
      if (K & 128) {
        O(T, U, k, M, I, x, V, B, P);
        return;
      } else if (K & 256) {
        N(T, U, k, M, I, x, V, B, P);
        return;
      }
    }
    ee & 8 ? (Y & 16 && Kt(T, I, x), U !== T && d(k, U)) : Y & 16 ? ee & 16 ? O(T, U, k, M, I, x, V, B, P) : Kt(T, I, x, !0) : (Y & 8 && d(k, ""), ee & 16 && C(U, k, M, I, x, V, B, P));
  }, N = (p, h, k, M, I, x, V, B, P) => {
    p = p || Rt, h = h || Rt;
    const T = p.length, Y = h.length, U = Math.min(T, Y);
    let K;
    for (K = 0; K < U; K++) {
      const ee = h[K] = P ? it(h[K]) : et(h[K]);
      L(p[K], ee, k, null, I, x, V, B, P);
    }
    T > Y ? Kt(p, I, x, !0, !1, U) : C(h, k, M, I, x, V, B, P, U);
  }, O = (p, h, k, M, I, x, V, B, P) => {
    let T = 0;
    const Y = h.length;
    let U = p.length - 1, K = Y - 1;
    for (; T <= U && T <= K; ) {
      const ee = p[T], ue = h[T] = P ? it(h[T]) : et(h[T]);
      if (It(ee, ue)) L(ee, ue, k, null, I, x, V, B, P);
      else break;
      T++;
    }
    for (; T <= U && T <= K; ) {
      const ee = p[U], ue = h[K] = P ? it(h[K]) : et(h[K]);
      if (It(ee, ue)) L(ee, ue, k, null, I, x, V, B, P);
      else break;
      U--, K--;
    }
    if (T > U) {
      if (T <= K) {
        const ee = K + 1, ue = ee < Y ? h[ee].el : M;
        for (; T <= K; )
          L(null, h[T] = P ? it(h[T]) : et(h[T]), k, ue, I, x, V, B, P), T++;
      }
    } else if (T > K) for (; T <= U; )
      xe(p[T], I, x, !0), T++;
    else {
      const ee = T, ue = T, ge = /* @__PURE__ */ new Map();
      for (T = ue; T <= K; T++) {
        const Ne = h[T] = P ? it(h[T]) : et(h[T]);
        Ne.key != null && ge.set(Ne.key, T);
      }
      let he, Ce = 0;
      const Se = K - ue + 1;
      let qe = !1, Fe = 0;
      const zt = new Array(Se);
      for (T = 0; T < Se; T++) zt[T] = 0;
      for (T = ee; T <= U; T++) {
        const Ne = p[T];
        if (Ce >= Se) {
          xe(Ne, I, x, !0);
          continue;
        }
        let Je;
        if (Ne.key != null) Je = ge.get(Ne.key);
        else for (he = ue; he <= K; he++) if (zt[he - ue] === 0 && It(Ne, h[he])) {
          Je = he;
          break;
        }
        Je === void 0 ? xe(Ne, I, x, !0) : (zt[Je - ue] = T + 1, Je >= Fe ? Fe = Je : qe = !0, L(Ne, h[Je], k, null, I, x, V, B, P), Ce++);
      }
      const Ga = qe ? Tr(zt) : Rt;
      for (he = Ga.length - 1, T = Se - 1; T >= 0; T--) {
        const Ne = ue + T, Je = h[Ne], ja = h[Ne + 1], qa = Ne + 1 < Y ? ja.el || Ns(ja) : M;
        zt[T] === 0 ? L(null, Je, k, qa, I, x, V, B, P) : qe && (he < 0 || T !== Ga[he] ? le(Je, k, qa, 2) : he--);
      }
    }
  }, le = (p, h, k, M, I = null) => {
    const { el: x, type: V, transition: B, children: P, shapeFlag: T } = p;
    if (T & 6) {
      le(p.component.subTree, h, k, M);
      return;
    }
    if (T & 128) {
      p.suspense.move(h, k, M);
      return;
    }
    if (T & 64) {
      V.move(p, h, k, Dt);
      return;
    }
    if (V === ae) {
      a(x, h, k);
      for (let Y = 0; Y < P.length; Y++) le(P[Y], h, k, M);
      a(p.anchor, h, k);
      return;
    }
    if (V === da) {
      X(p, h, k);
      return;
    }
    if (M !== 2 && T & 1 && B) if (M === 0) B.persisted && !x[We] ? a(x, h, k) : (B.beforeEnter(x), a(x, h, k), Be(() => B.enter(x), I));
    else {
      const { leave: Y, delayLeave: U, afterLeave: K } = B, ee = () => {
        p.ctx.isUnmounted ? l(x) : a(x, h, k);
      }, ue = () => {
        const ge = x._isLeaving || !!x[We];
        x._isLeaving && x[We](!0), B.persisted && !ge ? ee() : Y(x, () => {
          ee(), K && K();
        });
      };
      U ? U(x, ee, ue) : ue();
    }
    else a(x, h, k);
  }, xe = (p, h, k, M = !1, I = !1) => {
    const { type: x, props: V, ref: B, children: P, dynamicChildren: T, shapeFlag: Y, patchFlag: U, dirs: K, cacheIndex: ee, memo: ue } = p;
    if (U === -2 && (I = !1), B != null && (ct(), sn(B, null, k, p, !0), ft()), ee != null && (h.renderCache[ee] = void 0), Y & 256) {
      h.ctx.deactivate(p);
      return;
    }
    const ge = Y & 1 && K, he = !Nt(p);
    let Ce;
    if (he && (Ce = V && V.onVnodeBeforeUnmount) && Ye(Ce, h, p), Y & 6) Ys(p.component, k, M);
    else {
      if (Y & 128) {
        p.suspense.unmount(k, M);
        return;
      }
      ge && wt(p, null, h, "beforeUnmount"), Y & 64 ? p.type.remove(p, h, k, Dt, M) : T && !T.hasOnce && (x !== ae || U > 0 && U & 64) ? Kt(T, h, k, !1, !0) : (x === ae && U & 384 || !I && Y & 16) && Kt(P, h, k), M && Ua(p);
    }
    const Se = ue != null && ee == null;
    (he && (Ce = V && V.onVnodeUnmounted) || ge || Se) && Be(() => {
      Ce && Ye(Ce, h, p), ge && wt(p, null, h, "unmounted"), Se && (p.el = null);
    }, k);
  }, Ua = (p) => {
    const { type: h, el: k, anchor: M, transition: I } = p;
    if (h === ae) {
      Js(k, M);
      return;
    }
    if (h === da) {
      $(p);
      return;
    }
    const x = () => {
      l(k), I && !I.persisted && I.afterLeave && I.afterLeave();
    };
    if (p.shapeFlag & 1 && I && !I.persisted) {
      const { leave: V, delayLeave: B } = I, P = () => V(k, x);
      B ? B(p.el, x, P) : P();
    } else x();
  }, Js = (p, h) => {
    let k;
    for (; p !== h; )
      k = y(p), l(p), p = k;
    l(h);
  }, Ys = (p, h, k) => {
    const { bum: M, scope: I, job: x, subTree: V, um: B, m: P, a: T } = p;
    ol(P), ol(T), M && xn(M), I.stop(), x && (x.flags |= 8, xe(V, p, h, k)), B && Be(B, h), Be(() => {
      p.isUnmounted = !0;
    }, h);
  }, Kt = (p, h, k, M = !1, I = !1, x = 0) => {
    for (let V = x; V < p.length; V++) xe(p[V], h, k, M, I);
  }, $n = (p) => {
    if (p.shapeFlag & 6) return $n(p.component.subTree);
    if (p.shapeFlag & 128) return p.suspense.next();
    const h = y(p.anchor || p.el), k = h && h[Gi];
    return k ? y(k) : h;
  };
  let Qn = !1;
  const Wa = (p, h, k) => {
    let M;
    p == null ? h._vnode && (xe(h._vnode, null, null, !0), M = h._vnode.component) : L(h._vnode || null, p, h, null, null, null, k), h._vnode = p, Qn || (Qn = !0, Ya(M), os(), Qn = !1);
  }, Dt = {
    p: L,
    um: xe,
    m: le,
    r: Ua,
    mt: D,
    mc: C,
    pc: fe,
    pbc: S,
    n: $n,
    o: e
  };
  let Zn, ea;
  return t && ([Zn, ea] = t(Dt)), {
    render: Wa,
    hydrate: Zn,
    createApp: vr(Wa, Zn)
  };
}
function ua({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Ct({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function Er(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Bs(e, t, n = !1) {
  const a = e.children, l = t.children;
  if (J(a) && J(l)) for (let i = 0; i < a.length; i++) {
    const r = a[i];
    let o = l[i];
    o.shapeFlag & 1 && !o.dynamicChildren && ((o.patchFlag <= 0 || o.patchFlag === 32) && (o = l[i] = it(l[i]), o.el = r.el), !n && o.patchFlag !== -2 && Bs(r, o)), o.type === Jn && (o.patchFlag === -1 && (o = l[i] = it(o)), o.el = r.el), o.type === Me && !o.el && (o.el = r.el);
  }
}
function Tr(e) {
  const t = e.slice(), n = [0];
  let a, l, i, r, o;
  const u = e.length;
  for (a = 0; a < u; a++) {
    const c = e[a];
    if (c !== 0) {
      if (l = n[n.length - 1], e[l] < c) {
        t[a] = l, n.push(a);
        continue;
      }
      for (i = 0, r = n.length - 1; i < r; )
        o = i + r >> 1, e[n[o]] < c ? i = o + 1 : r = o;
      c < e[n[i]] && (i > 0 && (t[a] = n[i - 1]), n[i] = a);
    }
  }
  for (i = n.length, r = n[i - 1]; i-- > 0; )
    n[i] = r, r = t[r];
  return n;
}
function Fs(e) {
  const t = e.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : Fs(t);
}
function ol(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function Ns(e) {
  if (e.placeholder) return e.placeholder;
  const t = e.component;
  return t ? Ns(t.subTree) : null;
}
var Vs = (e) => e.__isSuspense;
function Mr(e, t) {
  t && t.pendingBranch ? J(e) ? t.effects.push(...e) : t.effects.push(e) : Ni(e);
}
var ae = /* @__PURE__ */ Symbol.for("v-fgt"), Jn = /* @__PURE__ */ Symbol.for("v-txt"), Me = /* @__PURE__ */ Symbol.for("v-cmt"), da = /* @__PURE__ */ Symbol.for("v-stc"), on = [], Ve = null;
function v(e = !1) {
  on.push(Ve = e ? null : []);
}
function Dr() {
  on.pop(), Ve = on[on.length - 1] || null;
}
var pn = 1;
function Rn(e, t = !1) {
  pn += e, e < 0 && Ve && t && (Ve.hasOnce = !0);
}
function Hs(e) {
  return e.dynamicChildren = pn > 0 ? Ve || Rt : null, Dr(), pn > 0 && Ve && Ve.push(e), e;
}
function g(e, t, n, a, l, i) {
  return Hs(s(e, t, n, a, l, i, !0));
}
function pe(e, t, n, a, l) {
  return Hs($e(e, t, n, a, l, !0));
}
function mn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function It(e, t) {
  return e.type === t.type && e.key === t.key;
}
var Us = ({ key: e }) => e ?? null, En = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e != null ? _e(e) || /* @__PURE__ */ Le(e) || ne(e) ? {
  i: Ee,
  r: e,
  k: t,
  f: !!n
} : e : null);
function s(e, t = null, n = null, a = 0, l = null, i = e === ae ? 0 : 1, r = !1, o = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Us(t),
    ref: t && En(t),
    scopeId: ds,
    slotScopeIds: null,
    children: n,
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
    patchFlag: a,
    dynamicProps: l,
    dynamicChildren: null,
    appContext: null,
    ctx: Ee
  };
  return o ? (Ha(u, n), i & 128 && e.normalize(u)) : n && (u.shapeFlag |= _e(n) ? 8 : 16), pn > 0 && !r && Ve && (u.patchFlag > 0 || i & 6) && u.patchFlag !== 32 && Ve.push(u), u;
}
var $e = Lr;
function Lr(e, t = null, n = null, a = 0, l = null, i = !1) {
  if ((!e || e === ws) && (e = Me), mn(e)) {
    const o = _t(e, t, !0);
    return n && Ha(o, n), pn > 0 && !i && Ve && (o.shapeFlag & 6 ? Ve[Ve.indexOf(e)] = o : Ve.push(o)), o.patchFlag = -2, o;
  }
  if (Gr(e) && (e = e.__vccOpts), t) {
    t = Or(t);
    let { class: o, style: u } = t;
    o && !_e(o) && (t.class = se(o)), ce(u) && (/* @__PURE__ */ Pa(u) && !J(u) && (u = we({}, u)), t.style = jt(u));
  }
  const r = _e(e) ? 1 : Vs(e) ? 128 : vs(e) ? 64 : ce(e) ? 4 : ne(e) ? 2 : 0;
  return s(e, t, n, a, l, r, i, !0);
}
function Or(e) {
  return e ? /* @__PURE__ */ Pa(e) || Ms(e) ? we({}, e) : e : null;
}
function _t(e, t, n = !1, a = !1) {
  const { props: l, ref: i, patchFlag: r, children: o, transition: u } = e, c = t ? Rr(l || {}, t) : l, d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && Us(c),
    ref: t && t.ref ? n && i ? J(i) ? i.concat(En(t)) : [i, En(t)] : En(t) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: o,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== ae ? r === -1 ? 16 : r | 16 : r,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: u,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && _t(e.ssContent),
    ssFallback: e.ssFallback && _t(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return u && a && fn(d, u.clone(d)), d;
}
function ye(e = " ", t = 0) {
  return $e(Jn, null, e, t);
}
function F(e = "", t = !1) {
  return t ? (v(), pe(Me, null, e)) : $e(Me, null, e);
}
function et(e) {
  return e == null || typeof e == "boolean" ? $e(Me) : J(e) ? $e(ae, null, e.slice()) : mn(e) ? it(e) : $e(Jn, null, String(e));
}
function it(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : _t(e);
}
function Ha(e, t) {
  let n = 0;
  const { shapeFlag: a } = e;
  if (t == null) t = null;
  else if (J(t)) n = 16;
  else if (typeof t == "object") if (a & 65) {
    const l = t.default;
    l && (l._c && (l._d = !1), Ha(e, l()), l._c && (l._d = !0));
    return;
  } else {
    n = 32;
    const l = t._;
    !l && !Ms(t) ? t._ctx = Ee : l === 3 && Ee && (Ee.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
  }
  else ne(t) ? (t = {
    default: t,
    _ctx: Ee
  }, n = 32) : (t = String(t), a & 64 ? (n = 16, t = [ye(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Rr(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const a = e[n];
    for (const l in a) if (l === "class")
      t.class !== a.class && (t.class = se([t.class, a.class]));
    else if (l === "style") t.style = jt([t.style, a.style]);
    else if (Fn(l)) {
      const i = t[l], r = a[l];
      r && i !== r && !(J(i) && i.includes(r)) ? t[l] = i ? [].concat(i, r) : r : r == null && i == null && !Nn(l) && (t[l] = r);
    } else l !== "" && (t[l] = a[l]);
  }
  return t;
}
function Ye(e, t, n, a = null) {
  je(e, t, 7, [n, a]);
}
var Pr = As(), Br = 0;
function Fr(e, t, n) {
  const a = e.type, l = (t ? t.appContext : e.appContext) || Pr, i = {
    uid: Br++,
    vnode: e,
    type: a,
    parent: t,
    appContext: l,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    job: null,
    scope: new ui(!0),
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
    propsOptions: Ls(a, l),
    emitsOptions: xs(a, l),
    emit: null,
    emitted: null,
    propsDefaults: ve,
    inheritAttrs: a.inheritAttrs,
    ctx: ve,
    data: ve,
    props: ve,
    attrs: ve,
    slots: ve,
    refs: ve,
    setupState: ve,
    setupContext: null,
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
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
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = mr.bind(null, i), e.ce && e.ce(i), i;
}
var De = null, Ws = () => De || Ee, Pn, Sa;
{
  const e = Wn(), t = (n, a) => {
    let l;
    return (l = e[n]) || (l = e[n] = []), l.push(a), (i) => {
      l.length > 1 ? l.forEach((r) => r(i)) : l[0](i);
    };
  };
  Pn = t("__VUE_INSTANCE_SETTERS__", (n) => De = n), Sa = t("__VUE_SSR_SETTERS__", (n) => gn = n);
}
var _n = (e) => {
  const t = De;
  return Pn(e), e.scope.on(), () => {
    e.scope.off(), Pn(t);
  };
}, ul = () => {
  De && De.scope.off(), Pn(null);
};
function Gs(e) {
  return e.vnode.shapeFlag & 4;
}
var gn = !1;
function Nr(e, t = !1, n = !1) {
  t && Sa(t);
  const { props: a, children: l } = e.vnode, i = Gs(e);
  _r(e, a, i, t), Sr(e, l, n || t);
  const r = i ? Vr(e, t) : void 0;
  return t && Sa(!1), r;
}
function Vr(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, ir);
  const { setup: a } = n;
  if (a) {
    ct();
    const l = e.setupContext = a.length > 1 ? Ur(e) : null, i = _n(e), r = kn(a, e, 0, [e.props, l]), o = Bl(r);
    if (ft(), i(), (o || e.sp) && !Nt(e) && ys(e), o) {
      if (r.then(ul, ul), t) return r.then((u) => {
        dl(e, u, t);
      }).catch((u) => {
        jn(u, e, 0);
      });
      e.asyncDep = r;
    } else dl(e, r, t);
  } else js(e, t);
}
function dl(e, t, n) {
  ne(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ce(t) && (e.setupState = ss(t)), js(e, n);
}
var cl, fl;
function js(e, t, n) {
  const a = e.type;
  if (!e.render) {
    if (!t && cl && !a.render) {
      const l = a.template || Fa(e).template;
      if (l) {
        const { isCustomElement: i, compilerOptions: r } = e.appContext.config, { delimiters: o, compilerOptions: u } = a, c = we(we({
          isCustomElement: i,
          delimiters: o
        }, r), u);
        a.render = cl(l, c);
      }
    }
    e.render = a.render || nt, fl && fl(e);
  }
  {
    const l = _n(e);
    ct();
    try {
      rr(e);
    } finally {
      ft(), l();
    }
  }
}
var Hr = { get(e, t) {
  return Te(e, "get", ""), e[t];
} };
function Ur(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Hr),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Yn(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(ss(Ei(e.exposed)), {
    get(t, n) {
      if (n in t) return t[n];
      if (n in rn) return rn[n](e);
    },
    has(t, n) {
      return n in t || n in rn;
    }
  })) : e.proxy;
}
function Wr(e, t = !0) {
  return ne(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Gr(e) {
  return ne(e) && "__vccOpts" in e;
}
var Z = (e, t) => /* @__PURE__ */ Oi(e, t, gn);
function jr(e, t, n) {
  try {
    Rn(-1);
    const a = arguments.length;
    return a === 2 ? ce(t) && !J(t) ? mn(t) ? $e(e, null, [t]) : $e(e, t) : $e(e, null, t) : (a > 3 ? n = Array.prototype.slice.call(arguments, 2) : a === 3 && mn(n) && (n = [n]), $e(e, t, n));
  } finally {
    Rn(1);
  }
}
var qr = "3.5.35", Aa = void 0, vl = typeof window < "u" && window.trustedTypes;
if (vl) try {
  Aa = /* @__PURE__ */ vl.createPolicy("vue", { createHTML: (e) => e });
} catch {
}
var qs = Aa ? (e) => Aa.createHTML(e) : (e) => e, Kr = "http://www.w3.org/2000/svg", zr = "http://www.w3.org/1998/Math/MathML", st = typeof document < "u" ? document : null, pl = st && /* @__PURE__ */ st.createElement("template"), Xr = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, a) => {
    const l = t === "svg" ? st.createElementNS(Kr, e) : t === "mathml" ? st.createElementNS(zr, e) : n ? st.createElement(e, { is: n }) : st.createElement(e);
    return e === "select" && a && a.multiple != null && l.setAttribute("multiple", a.multiple), l;
  },
  createText: (e) => st.createTextNode(e),
  createComment: (e) => st.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => st.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  insertStaticContent(e, t, n, a, l, i) {
    const r = n ? n.previousSibling : t.lastChild;
    if (l && (l === i || l.nextSibling)) for (; t.insertBefore(l.cloneNode(!0), n), !(l === i || !(l = l.nextSibling)); )
      ;
    else {
      pl.innerHTML = qs(a === "svg" ? `<svg>${e}</svg>` : a === "mathml" ? `<math>${e}</math>` : e);
      const o = pl.content;
      if (a === "svg" || a === "mathml") {
        const u = o.firstChild;
        for (; u.firstChild; ) o.appendChild(u.firstChild);
        o.removeChild(u);
      }
      t.insertBefore(o, n);
    }
    return [r ? r.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
  }
}, ht = "transition", Yt = "animation", hn = /* @__PURE__ */ Symbol("_vtc"), Ks = {
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
}, Jr = /* @__PURE__ */ we({}, ps, Ks), Yr = (e) => (e.displayName = "Transition", e.props = Jr, e), Qr = /* @__PURE__ */ Yr((e, { slots: t }) => jr(Ki, Zr(e), t)), St = (e, t = []) => {
  J(e) ? e.forEach((n) => n(...t)) : e && e(...t);
}, ml = (e) => e ? J(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function Zr(e) {
  const t = {};
  for (const H in e) H in Ks || (t[H] = e[H]);
  if (e.css === !1) return t;
  const { name: n = "v", type: a, duration: l, enterFromClass: i = `${n}-enter-from`, enterActiveClass: r = `${n}-enter-active`, enterToClass: o = `${n}-enter-to`, appearFromClass: u = i, appearActiveClass: c = r, appearToClass: d = o, leaveFromClass: f = `${n}-leave-from`, leaveActiveClass: y = `${n}-leave-active`, leaveToClass: b = `${n}-leave-to` } = e, R = eo(l), L = R && R[0], Q = R && R[1], { onBeforeEnter: z, onEnter: j, onEnterCancelled: X, onLeave: $, onLeaveCancelled: w, onBeforeAppear: E = z, onAppear: A = j, onAppearCancelled: C = X } = t, _ = (H, G, D, re) => {
    H._enterCancelled = re, At(H, G ? d : o), At(H, G ? c : r), D && D();
  }, S = (H, G) => {
    H._isLeaving = !1, At(H, f), At(H, b), At(H, y), G && G();
  }, W = (H) => (G, D) => {
    const re = H ? A : j, ke = () => _(G, H, D);
    St(re, [G, ke]), gl(() => {
      At(G, H ? u : i), lt(G, H ? d : o), ml(re) || hl(G, a, L, ke);
    });
  };
  return we(t, {
    onBeforeEnter(H) {
      St(z, [H]), lt(H, i), lt(H, r);
    },
    onBeforeAppear(H) {
      St(E, [H]), lt(H, u), lt(H, c);
    },
    onEnter: W(!1),
    onAppear: W(!0),
    onLeave(H, G) {
      H._isLeaving = !0;
      const D = () => S(H, G);
      lt(H, f), H._enterCancelled ? (lt(H, y), kl(H)) : (kl(H), lt(H, y)), gl(() => {
        H._isLeaving && (At(H, f), lt(H, b), ml($) || hl(H, a, Q, D));
      }), St($, [H, D]);
    },
    onEnterCancelled(H) {
      _(H, !1, void 0, !0), St(X, [H]);
    },
    onAppearCancelled(H) {
      _(H, !0, void 0, !0), St(C, [H]);
    },
    onLeaveCancelled(H) {
      S(H), St(w, [H]);
    }
  });
}
function eo(e) {
  if (e == null) return null;
  if (ce(e)) return [ca(e.enter), ca(e.leave)];
  {
    const t = ca(e);
    return [t, t];
  }
}
function ca(e) {
  return ni(e);
}
function lt(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e[hn] || (e[hn] = /* @__PURE__ */ new Set())).add(t);
}
function At(e, t) {
  t.split(/\s+/).forEach((a) => a && e.classList.remove(a));
  const n = e[hn];
  n && (n.delete(t), n.size || (e[hn] = void 0));
}
function gl(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
var to = 0;
function hl(e, t, n, a) {
  const l = e._endId = ++to, i = () => {
    l === e._endId && a();
  };
  if (n != null) return setTimeout(i, n);
  const { type: r, timeout: o, propCount: u } = no(e, t);
  if (!r) return a();
  const c = r + "end";
  let d = 0;
  const f = () => {
    e.removeEventListener(c, y), i();
  }, y = (b) => {
    b.target === e && ++d >= u && f();
  };
  setTimeout(() => {
    d < u && f();
  }, o + 1), e.addEventListener(c, y);
}
function no(e, t) {
  const n = window.getComputedStyle(e), a = (R) => (n[R] || "").split(", "), l = a(`${ht}Delay`), i = a(`${ht}Duration`), r = bl(l, i), o = a(`${Yt}Delay`), u = a(`${Yt}Duration`), c = bl(o, u);
  let d = null, f = 0, y = 0;
  t === ht ? r > 0 && (d = ht, f = r, y = i.length) : t === Yt ? c > 0 && (d = Yt, f = c, y = u.length) : (f = Math.max(r, c), d = f > 0 ? r > c ? ht : Yt : null, y = d ? d === ht ? i.length : u.length : 0);
  const b = d === ht && /\b(?:transform|all)(?:,|$)/.test(a(`${ht}Property`).toString());
  return {
    type: d,
    timeout: f,
    propCount: y,
    hasTransform: b
  };
}
function bl(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((n, a) => yl(n) + yl(e[a])));
}
function yl(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function kl(e) {
  return (e ? e.ownerDocument : document).body.offsetHeight;
}
function ao(e, t, n) {
  const a = e[hn];
  a && (t = (t ? [t, ...a] : [...a]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
var _l = /* @__PURE__ */ Symbol("_vod"), lo = /* @__PURE__ */ Symbol("_vsh"), so = /* @__PURE__ */ Symbol(""), io = /(?:^|;)\s*display\s*:/;
function ro(e, t, n) {
  const a = e.style, l = _e(n);
  let i = !1;
  if (n && !l) {
    if (t) if (_e(t))
      for (const r of t.split(";")) {
        const o = r.slice(0, r.indexOf(":")).trim();
        n[o] == null && tn(a, o, "");
      }
    else for (const r in t) n[r] == null && tn(a, r, "");
    for (const r in n) {
      r === "display" && (i = !0);
      const o = n[r];
      o != null ? uo(e, r, !_e(t) && t ? t[r] : void 0, o) || tn(a, r, o) : tn(a, r, "");
    }
  } else if (l) {
    if (t !== n) {
      const r = a[so];
      r && (n += ";" + r), a.cssText = n, i = io.test(n);
    }
  } else t && e.removeAttribute("style");
  _l in e && (e[_l] = i ? a.display : "", e[lo] && (a.display = "none"));
}
var $l = /\s*!important$/;
function tn(e, t, n) {
  if (J(n)) n.forEach((a) => tn(e, t, a));
  else if (n == null && (n = ""), t.startsWith("--")) e.setProperty(t, n);
  else {
    const a = oo(e, t);
    $l.test(n) ? e.setProperty($t(a), n.replace($l, ""), "important") : e[a] = n;
  }
}
var wl = [
  "Webkit",
  "Moz",
  "ms"
], fa = {};
function oo(e, t) {
  const n = fa[t];
  if (n) return n;
  let a = Pe(t);
  if (a !== "filter" && a in e) return fa[t] = a;
  a = Hn(a);
  for (let l = 0; l < wl.length; l++) {
    const i = wl[l] + a;
    if (i in e) return fa[t] = i;
  }
  return t;
}
function uo(e, t, n, a) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && _e(a) && n === a;
}
var Cl = "http://www.w3.org/1999/xlink";
function Sl(e, t, n, a, l, i = ri(t)) {
  a && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(Cl, t.slice(6, t.length)) : e.setAttributeNS(Cl, t, n) : n == null || i && !Ul(n) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : ze(n) ? String(n) : n);
}
function Al(e, t, n, a, l) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? qs(n) : n);
    return;
  }
  const i = e.tagName;
  if (t === "value" && i !== "PROGRESS" && !i.includes("-")) {
    const o = i === "OPTION" ? e.getAttribute("value") || "" : e.value, u = n == null ? e.type === "checkbox" ? "on" : "" : String(n);
    (o !== u || !("_value" in e)) && (e.value = u), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let r = !1;
  if (n === "" || n == null) {
    const o = typeof e[t];
    o === "boolean" ? n = Ul(n) : n == null && o === "string" ? (n = "", r = !0) : o === "number" && (n = 0, r = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  r && e.removeAttribute(l || t);
}
function yt(e, t, n, a) {
  e.addEventListener(t, n, a);
}
function co(e, t, n, a) {
  e.removeEventListener(t, n, a);
}
var xl = /* @__PURE__ */ Symbol("_vei");
function fo(e, t, n, a, l = null) {
  const i = e[xl] || (e[xl] = {}), r = i[t];
  if (a && r) r.value = a;
  else {
    const [o, u] = vo(t);
    a ? yt(e, o, i[t] = go(a, l), u) : r && (co(e, o, r, u), i[t] = void 0);
  }
}
var Il = /(?:Once|Passive|Capture)$/;
function vo(e) {
  let t;
  if (Il.test(e)) {
    t = {};
    let n;
    for (; n = e.match(Il); )
      e = e.slice(0, e.length - n[0].length), t[n[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : $t(e.slice(2)), t];
}
var va = 0, po = /* @__PURE__ */ Promise.resolve(), mo = () => va || (po.then(() => va = 0), va = Date.now());
function go(e, t) {
  const n = (a) => {
    if (!a._vts) a._vts = Date.now();
    else if (a._vts <= n.attached) return;
    const l = n.value;
    if (J(l)) {
      const i = a.stopImmediatePropagation;
      a.stopImmediatePropagation = () => {
        i.call(a), a._stopped = !0;
      };
      const r = l.slice(), o = [a];
      for (let u = 0; u < r.length && !a._stopped; u++) {
        const c = r[u];
        c && je(c, t, 5, o);
      }
    } else je(l, t, 5, [a]);
  };
  return n.value = e, n.attached = mo(), n;
}
var El = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, ho = (e, t, n, a, l, i) => {
  const r = l === "svg";
  t === "class" ? ao(e, a, r) : t === "style" ? ro(e, n, a) : Fn(t) ? Nn(t) || fo(e, t, n, a, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : bo(e, t, a, r)) ? (Al(e, t, a), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && Sl(e, t, a, r, i, t !== "value")) : e._isVueCE && (yo(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !_e(a))) ? Al(e, Pe(t), a, i, t) : (t === "true-value" ? e._trueValue = a : t === "false-value" && (e._falseValue = a), Sl(e, t, a, r));
};
function bo(e, t, n, a) {
  if (a)
    return !!(t === "innerHTML" || t === "textContent" || t in e && El(t) && ne(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
  if (t === "width" || t === "height") {
    const l = e.tagName;
    if (l === "IMG" || l === "VIDEO" || l === "CANVAS" || l === "SOURCE") return !1;
  }
  return El(t) && _e(n) ? !1 : t in e;
}
function yo(e, t) {
  const n = e._def.props;
  if (!n) return !1;
  const a = Pe(t);
  return Array.isArray(n) ? n.some((l) => Pe(l) === a) : Object.keys(n).some((l) => Pe(l) === a);
}
var Wt = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return J(t) ? (n) => xn(t, n) : t;
};
function ko(e) {
  e.target.composing = !0;
}
function Tl(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var ut = /* @__PURE__ */ Symbol("_assign");
function Ml(e, t, n) {
  return t && (e = e.trim()), n && (e = Un(e)), e;
}
var He = {
  created(e, { modifiers: { lazy: t, trim: n, number: a } }, l) {
    e[ut] = Wt(l);
    const i = a || l.props && l.props.type === "number";
    yt(e, t ? "change" : "input", (r) => {
      r.target.composing || e[ut](Ml(e.value, n, i));
    }), (n || i) && yt(e, "change", () => {
      e.value = Ml(e.value, n, i);
    }), t || (yt(e, "compositionstart", ko), yt(e, "compositionend", Tl), yt(e, "change", Tl));
  },
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: a, trim: l, number: i } }, r) {
    if (e[ut] = Wt(r), e.composing) return;
    const o = (i || e.type === "number") && !/^0\d/.test(e.value) ? Un(e.value) : e.value, u = t ?? "";
    if (o === u) return;
    const c = e.getRootNode();
    (c instanceof Document || c instanceof ShadowRoot) && c.activeElement === e && e.type !== "range" && (a && t === n || l && e.value.trim() === u) || (e.value = u);
  }
}, Qt = {
  deep: !0,
  created(e, t, n) {
    e[ut] = Wt(n), yt(e, "change", () => {
      const a = e._modelValue, l = bn(e), i = e.checked, r = e[ut];
      if (J(a)) {
        const o = Ea(a, l), u = o !== -1;
        if (i && !u) r(a.concat(l));
        else if (!i && u) {
          const c = [...a];
          c.splice(o, 1), r(c);
        }
      } else if (Gt(a)) {
        const o = new Set(a);
        i ? o.add(l) : o.delete(l), r(o);
      } else r(zs(e, i));
    });
  },
  mounted: Dl,
  beforeUpdate(e, t, n) {
    e[ut] = Wt(n), Dl(e, t, n);
  }
};
function Dl(e, { value: t, oldValue: n }, a) {
  e._modelValue = t;
  let l;
  if (J(t)) l = Ea(t, a.props.value) > -1;
  else if (Gt(t)) l = t.has(a.props.value);
  else {
    if (t === n) return;
    l = qt(t, zs(e, !0));
  }
  e.checked !== l && (e.checked = l);
}
var _o = {
  deep: !0,
  created(e, { value: t, modifiers: { number: n } }, a) {
    const l = Gt(t);
    yt(e, "change", () => {
      const i = Array.prototype.filter.call(e.options, (r) => r.selected).map((r) => n ? Un(bn(r)) : bn(r));
      e[ut](e.multiple ? l ? new Set(i) : i : i[0]), e._assigning = !0, qn(() => {
        e._assigning = !1;
      });
    }), e[ut] = Wt(a);
  },
  mounted(e, { value: t }) {
    Ll(e, t);
  },
  beforeUpdate(e, t, n) {
    e[ut] = Wt(n);
  },
  updated(e, { value: t }) {
    e._assigning || Ll(e, t);
  }
};
function Ll(e, t) {
  const n = e.multiple, a = J(t);
  if (!(n && !a && !Gt(t))) {
    for (let l = 0, i = e.options.length; l < i; l++) {
      const r = e.options[l], o = bn(r);
      if (n) if (a) {
        const u = typeof o;
        u === "string" || u === "number" ? r.selected = t.some((c) => String(c) === String(o)) : r.selected = Ea(t, o) > -1;
      } else r.selected = t.has(o);
      else if (qt(bn(r), t)) {
        e.selectedIndex !== l && (e.selectedIndex = l);
        return;
      }
    }
    !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function bn(e) {
  return "_value" in e ? e._value : e.value;
}
function zs(e, t) {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e ? e[n] : t;
}
var $o = [
  "ctrl",
  "shift",
  "alt",
  "meta"
], wo = {
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
  exact: (e, t) => $o.some((n) => e[`${n}Key`] && !t.includes(n))
}, dt = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), a = t.join(".");
  return n[a] || (n[a] = ((l, ...i) => {
    for (let r = 0; r < t.length; r++) {
      const o = wo[t[r]];
      if (o && o(l, t)) return;
    }
    return e(l, ...i);
  }));
}, Co = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Xs = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), a = t.join(".");
  return n[a] || (n[a] = ((l) => {
    if (!("key" in l)) return;
    const i = $t(l.key);
    if (t.some((r) => r === i || Co[r] === i)) return e(l);
  }));
}, So = /* @__PURE__ */ we({ patchProp: ho }, Xr), Ol;
function Ao() {
  return Ol || (Ol = xr(So));
}
var xo = ((...e) => {
  const t = Ao().createApp(...e), { mount: n } = t;
  return t.mount = (a) => {
    const l = Eo(a);
    if (!l) return;
    const i = t._component;
    !ne(i) && !i.render && !i.template && (i.template = l.innerHTML), l.nodeType === 1 && (l.textContent = "");
    const r = n(l, !1, Io(l));
    return l instanceof Element && (l.removeAttribute("v-cloak"), l.setAttribute("data-v-app", "")), r;
  }, t;
});
function Io(e) {
  if (e instanceof SVGElement) return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function Eo(e) {
  return _e(e) ? document.querySelector(e) : e;
}
var To = Object.freeze({
  id: "bank",
  name: "银行",
  accent: "#b89a58"
}), Mo = ["aria-labelledby"], Do = ["id"], Lo = { class: "bank-dialog-subject" }, Oo = { key: 0 }, Ro = { key: 1 }, Po = {
  key: 0,
  class: "bank-dialog-field"
}, Bo = { id: "bank-amount-help" }, Fo = {
  key: 1,
  class: "bank-dialog-validation"
}, No = {
  key: 2,
  class: "bank-dialog-summary"
}, Vo = {
  key: 3,
  class: "bank-dialog-warning"
}, Ho = {
  key: 4,
  class: "bank-dialog-warning is-loss"
}, Uo = {
  key: 5,
  class: "bank-dialog-error",
  role: "alert"
}, Wo = { class: "bank-dialog-actions" }, Go = ["disabled"], jo = ["disabled"], qo = /* @__PURE__ */ ie({
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
    const n = e, a = t, l = /* @__PURE__ */ q(n.product ? String(n.product.minAmount) : ""), i = Z(() => n.mode === "deposit-open" ? "开立定期存单" : n.mode === "fund-open" ? "申购浮动理财" : "确认提前支取"), r = Z(() => /^\d+$/.test(l.value.trim()) ? Number(l.value) : 0), o = Z(() => n.mode === "withdraw" ? "" : !n.product || !Number.isSafeInteger(r.value) || r.value <= 0 ? "请输入正整数金额" : r.value < n.product.minAmount || r.value > n.product.maxAmount ? `金额须在 ${n.product.minAmount} 至 ${n.product.maxAmount} 之间` : r.value > n.balance ? "可用余额不足" : ""), u = Z(() => n.mode === "deposit-open" ? n.product : null), c = Z(() => u.value ? Math.floor(r.value * (1e4 + u.value.interestBps) / 1e4) : 0), d = Z(() => !n.busy && (n.mode === "withdraw" || !o.value));
    function f() {
      if (d.value) {
        if (n.mode === "withdraw") {
          a("confirm");
          return;
        }
        a("confirm", r.value);
      }
    }
    return (y, b) => (v(), g("dialog", {
      open: "",
      class: "bank-dialog",
      "aria-labelledby": `bank-dialog-${e.mode}`,
      onClick: b[2] || (b[2] = dt((R) => !e.busy && y.$emit("cancel"), ["self"])),
      onKeydown: b[3] || (b[3] = Xs(dt((R) => !e.busy && y.$emit("cancel"), ["stop", "prevent"]), ["esc"]))
    }, [s("form", {
      method: "dialog",
      class: "bank-dialog-card",
      onSubmit: dt(f, ["prevent"])
    }, [
      b[9] || (b[9] = s("span", { class: "bank-dialog-kicker" }, "VAULT AUTHORIZATION", -1)),
      s("h2", { id: `bank-dialog-${e.mode}` }, m(i.value), 9, Do),
      s("div", Lo, [s("span", null, m(e.mode === "withdraw" ? "取" : e.mode === "deposit-open" ? "定" : "理"), 1), s("div", null, [s("strong", null, m(e.position?.name || e.product?.name), 1), e.product ? (v(), g("small", Oo, m(e.product.lockLabel), 1)) : (v(), g("small", Ro, "当前本金 ¤ " + m(e.position?.principal.toLocaleString("zh-CN")), 1))])]),
      e.mode !== "withdraw" ? (v(), g("label", Po, [
        b[5] || (b[5] = s("span", null, "开户金额", -1)),
        s("div", null, [b[4] || (b[4] = s("i", null, "¤", -1)), Ae(s("input", {
          "onUpdate:modelValue": b[0] || (b[0] = (R) => l.value = R),
          type: "text",
          inputmode: "numeric",
          autocomplete: "off",
          "aria-describedby": "bank-amount-help"
        }, null, 512), [[He, l.value]])]),
        s("small", Bo, "可用 " + m(e.balance.toLocaleString("zh-CN")) + " · 范围 " + m(e.product?.minAmount) + " - " + m(e.product?.maxAmount), 1)
      ])) : F("", !0),
      o.value ? (v(), g("p", Fo, m(o.value), 1)) : F("", !0),
      e.mode === "deposit-open" && u.value && !o.value ? (v(), g("dl", No, [s("div", null, [b[6] || (b[6] = s("dt", null, "锁定期限", -1)), s("dd", null, m(u.value.lockLabel), 1)]), s("div", null, [b[7] || (b[7] = s("dt", null, "到期兑付", -1)), s("dd", null, "¤ " + m(c.value.toLocaleString("zh-CN")), 1)])])) : F("", !0),
      e.mode === "fund-open" ? (v(), g("p", Vo, " 实际收益将在开户时封存，锁定期间不可退出，到期后才会揭晓并可领取。 ")) : F("", !0),
      e.mode === "withdraw" && e.position ? (v(), g("p", Ho, [
        b[8] || (b[8] = ye(" 将立即收回 ", -1)),
        s("strong", null, m(e.position.earlyWithdrawalAmount.toLocaleString("zh-CN")) + " 小白币", 1),
        ye("，相较本金损失 " + m((e.position.principal - e.position.earlyWithdrawalAmount).toLocaleString("zh-CN")) + " 小白币。此操作不可撤销。 ", 1)
      ])) : F("", !0),
      e.error ? (v(), g("p", Uo, m(e.error), 1)) : F("", !0),
      s("div", Wo, [s("button", {
        type: "button",
        disabled: e.busy,
        onClick: b[1] || (b[1] = (R) => y.$emit("cancel"))
      }, "取消", 8, Go), s("button", {
        type: "submit",
        class: "is-primary",
        disabled: !d.value
      }, m(e.busy ? "正在封存…" : e.mode === "withdraw" ? `确认收回 ${e.position?.earlyWithdrawalAmount || 0}` : "确认开户"), 9, jo)])
    ], 32)], 40, Mo));
  }
}), Ko = qo, zo = { "aria-labelledby": "bank-deposits-title" }, Xo = { class: "bank-product-grid" }, Jo = { class: "bank-product-index" }, Yo = { class: "bank-rate-block" }, Qo = { class: "bank-product-terms" }, Zo = [
  "disabled",
  "title",
  "onClick"
], eu = /* @__PURE__ */ ie({
  __name: "BankDeposits",
  props: {
    products: {},
    balance: {},
    writeDisabledReason: {}
  },
  emits: ["open"],
  setup(e) {
    return (t, n) => (v(), g("section", zo, [
      n[6] || (n[6] = s("header", { class: "bank-section-heading" }, [s("div", null, [s("span", null, "FIXED CERTIFICATES"), s("h2", { id: "bank-deposits-title" }, "定期存单")]), s("small", null, "到期收益确定")], -1)),
      n[7] || (n[7] = s("p", { class: "bank-section-intro" }, "本金锁定至约定回合。到期前可提前支取，最终到账额会在确认时明确列出。", -1)),
      s("div", Xo, [(v(!0), g(ae, null, me(e.products, (a, l) => (v(), g("article", {
        key: a.id,
        class: "bank-product-card bank-deposit-card"
      }, [
        s("header", null, [
          s("span", Jo, "0" + m(l + 1), 1),
          s("div", null, [s("small", null, m(a.lockLabel), 1), s("h3", null, m(a.name), 1)]),
          n[0] || (n[0] = s("span", { class: "bank-product-seal" }, "定", -1))
        ]),
        s("div", Yo, [
          n[1] || (n[1] = s("span", null, "到期收益率", -1)),
          s("strong", null, m(a.interestLabel), 1),
          n[2] || (n[2] = s("small", null, "固定收益", -1))
        ]),
        s("dl", Qo, [s("div", null, [n[3] || (n[3] = s("dt", null, "开户范围", -1)), s("dd", null, m(a.amountLabel), 1)]), s("div", null, [n[4] || (n[4] = s("dt", null, "提前支取", -1)), s("dd", null, m(a.earlyPenaltyLabel), 1)])]),
        s("button", {
          type: "button",
          disabled: !!e.writeDisabledReason || e.balance < a.minAmount,
          title: e.writeDisabledReason || (e.balance < a.minAmount ? "可用余额不足最低开户额" : ""),
          onClick: (i) => t.$emit("open", a)
        }, [...n[5] || (n[5] = [ye(" 开立存单", -1), s("span", null, "›", -1)])], 8, Zo)
      ]))), 128))])
    ]));
  }
}), tu = eu, nu = { "aria-labelledby": "bank-funds-title" }, au = { class: "bank-product-grid" }, lu = { class: "bank-product-index" }, su = { class: "bank-rate-block" }, iu = { class: "bank-product-terms" }, ru = [
  "disabled",
  "title",
  "onClick"
], ou = /* @__PURE__ */ ie({
  __name: "BankFunds",
  props: {
    products: {},
    balance: {},
    writeDisabledReason: {}
  },
  emits: ["open"],
  setup(e) {
    return (t, n) => (v(), g("section", nu, [
      n[4] || (n[4] = s("header", { class: "bank-section-heading" }, [s("div", null, [s("span", null, "MANAGED FUNDS"), s("h2", { id: "bank-funds-title" }, "浮动理财")]), s("small", null, "到期前不揭晓结果")], -1)),
      n[5] || (n[5] = s("p", { class: "bank-section-intro" }, "收益在开户时封存，到期后才会公开。理财锁定期间不可提前退出。", -1)),
      s("div", au, [(v(!0), g(ae, null, me(e.products, (a, l) => (v(), g("article", {
        key: a.id,
        class: "bank-product-card bank-fund-card"
      }, [
        s("header", null, [
          s("span", lu, "F" + m(l + 1), 1),
          s("div", null, [s("small", null, m(a.lockLabel), 1), s("h3", null, m(a.name), 1)]),
          s("span", { class: se(["bank-risk-badge", `is-${a.riskLevel}`]) }, m(a.riskLabel), 3)
        ]),
        s("p", null, m(a.description), 1),
        s("div", su, [
          n[0] || (n[0] = s("span", null, "合同收益区间", -1)),
          s("strong", null, m(a.returnLabel), 1),
          n[1] || (n[1] = s("small", null, "实际结果到期可见", -1))
        ]),
        s("dl", iu, [s("div", null, [n[2] || (n[2] = s("dt", null, "开户范围", -1)), s("dd", null, m(a.amountLabel), 1)])]),
        s("button", {
          type: "button",
          disabled: !!e.writeDisabledReason || e.balance < a.minAmount,
          title: e.writeDisabledReason || (e.balance < a.minAmount ? "可用余额不足最低开户额" : ""),
          onClick: (i) => t.$emit("open", a)
        }, [...n[3] || (n[3] = [ye(" 申购理财", -1), s("span", null, "›", -1)])], 8, ru)
      ]))), 128))])
    ]));
  }
}), uu = ou, du = { "aria-labelledby": "bank-positions-title" }, cu = { class: "bank-section-heading" }, fu = ["disabled"], vu = {
  key: 0,
  class: "bank-empty-state"
}, pu = {
  key: 1,
  class: "bank-position-group"
}, mu = { class: "bank-position-top" }, gu = { key: 0 }, hu = { class: "is-loss" }, bu = [
  "disabled",
  "title",
  "onClick"
], yu = {
  key: 1,
  class: "bank-due-note"
}, ku = {
  key: 2,
  class: "bank-position-group"
}, _u = { class: "bank-position-top" }, $u = {
  key: 0,
  class: "bank-fund-result"
}, wu = {
  key: 1,
  class: "bank-sealed-copy"
}, Cu = /* @__PURE__ */ ie({
  __name: "BankPositions",
  props: {
    deposits: {},
    investments: {},
    claimableCount: {},
    writeDisabledReason: {}
  },
  emits: ["withdraw", "settle"],
  setup(e) {
    return (t, n) => (v(), g("section", du, [
      s("header", cu, [n[1] || (n[1] = s("div", null, [s("span", null, "SEALED POSITIONS"), s("h2", { id: "bank-positions-title" }, "我的头寸")], -1)), e.claimableCount ? (v(), g("button", {
        key: 0,
        type: "button",
        class: "bank-small-claim",
        disabled: !!e.writeDisabledReason,
        onClick: n[0] || (n[0] = (a) => t.$emit("settle"))
      }, " 领取全部 " + m(e.claimableCount) + " 笔 ", 9, fu)) : F("", !0)]),
      !e.deposits.length && !e.investments.length ? (v(), g("div", vu, [...n[2] || (n[2] = [
        s("span", null, "◇", -1),
        s("strong", null, "金库尚无头寸", -1),
        s("p", null, "从定期或理财页面选择一份产品开始配置资产。", -1)
      ])])) : F("", !0),
      e.deposits.length ? (v(), g("div", pu, [s("header", null, [n[3] || (n[3] = s("h3", null, "定期存单", -1)), s("span", null, m(e.deposits.length), 1)]), (v(!0), g(ae, null, me(e.deposits, (a) => (v(), g("article", {
        key: a.id,
        class: "bank-position-card"
      }, [
        s("div", mu, [
          n[4] || (n[4] = s("span", { class: "bank-position-mark" }, "定", -1)),
          s("div", null, [s("h4", null, m(a.name), 1), s("small", null, "本金 ¤ " + m(a.principal.toLocaleString("zh-CN")), 1)]),
          s("span", { class: se(["bank-position-status", { "is-due": a.claimable }]) }, m(a.statusLabel), 3)
        ]),
        s("dl", null, [s("div", null, [n[5] || (n[5] = s("dt", null, "到期兑付", -1)), s("dd", null, "¤ " + m(a.maturityAmount.toLocaleString("zh-CN")), 1)]), a.claimable ? F("", !0) : (v(), g("div", gu, [n[6] || (n[6] = s("dt", null, "现在支取", -1)), s("dd", hu, "¤ " + m(a.earlyWithdrawalAmount.toLocaleString("zh-CN")), 1)]))]),
        a.claimable ? (v(), g("span", yu, "将在“领取全部”时统一兑付")) : (v(), g("button", {
          key: 0,
          type: "button",
          class: "bank-withdraw-button",
          disabled: !!e.writeDisabledReason,
          title: e.writeDisabledReason,
          onClick: (l) => t.$emit("withdraw", a)
        }, " 提前支取 ", 8, bu))
      ]))), 128))])) : F("", !0),
      e.investments.length ? (v(), g("div", ku, [s("header", null, [n[7] || (n[7] = s("h3", null, "浮动理财", -1)), s("span", null, m(e.investments.length), 1)]), (v(!0), g(ae, null, me(e.investments, (a) => (v(), g("article", {
        key: a.id,
        class: "bank-position-card"
      }, [s("div", _u, [
        n[8] || (n[8] = s("span", { class: "bank-position-mark" }, "理", -1)),
        s("div", null, [s("h4", null, m(a.name), 1), s("small", null, m(a.riskLabel) + " · 本金 ¤ " + m(a.principal.toLocaleString("zh-CN")), 1)]),
        s("span", { class: se(["bank-position-status", { "is-due": a.claimable }]) }, m(a.statusLabel), 3)
      ]), a.claimable ? (v(), g("div", $u, [
        n[9] || (n[9] = s("span", null, "封存结果已揭晓", -1)),
        s("strong", { class: se({ "is-negative": a.resolvedReturnBps < 0 }) }, m(a.returnLabel), 3),
        s("small", null, "可兑付 ¤ " + m(a.settlementAmount.toLocaleString("zh-CN")), 1)
      ])) : (v(), g("p", wu, "收益结果仍在金库中封存，到期前不会公开。"))]))), 128))])) : F("", !0)
    ]));
  }
}), Su = Cu, Au = { "aria-labelledby": "bank-records-title" }, xu = { class: "bank-section-heading" }, Iu = {
  key: 0,
  class: "bank-empty-state"
}, Eu = {
  key: 1,
  class: "bank-record-list"
}, Tu = { class: "bank-record-mark" }, Mu = { class: "bank-record-main" }, Du = {
  key: 0,
  class: "bank-inline-error",
  role: "alert"
}, Lu = ["disabled"], Ou = {
  key: 2,
  class: "bank-record-end"
}, Ru = /* @__PURE__ */ ie({
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
    return (n, a) => (v(), g("section", Au, [s("header", xu, [a[1] || (a[1] = s("div", null, [s("span", null, "SETTLEMENT ARCHIVE"), s("h2", { id: "bank-records-title" }, "金融记录")], -1)), s("small", null, m(e.total) + " 笔", 1)]), e.activities.length ? (v(), g("div", Eu, [
      (v(!0), g(ae, null, me(e.activities, (l) => (v(), g("article", {
        key: l.id,
        class: "bank-record-row"
      }, [
        s("span", Tu, m(l.kind === "deposit" ? "定" : "理"), 1),
        s("div", Mu, [
          s("header", null, [s("strong", null, m(l.productName), 1), s("span", null, m(l.resultLabel), 1)]),
          s("dl", null, [s("div", null, [a[3] || (a[3] = s("dt", null, "投入", -1)), s("dd", null, "¤ " + m(l.amountIn.toLocaleString("zh-CN")), 1)]), s("div", null, [a[4] || (a[4] = s("dt", null, "兑付", -1)), s("dd", null, "¤ " + m(l.payout.toLocaleString("zh-CN")), 1)])]),
          s("small", null, m(l.turnLabel) + " · " + m(Ut(t).format(l.createdAt)), 1)
        ]),
        s("strong", { class: se(["bank-record-net", {
          "is-negative": l.net < 0,
          "is-flat": l.net === 0
        }]) }, [ye(m(l.net > 0 ? "+" : "") + m(l.net) + " ", 1), s("small", null, m(l.netLabel), 1)], 2)
      ]))), 128)),
      e.error ? (v(), g("p", Du, m(e.error), 1)) : F("", !0),
      e.hasMore ? (v(), g("button", {
        key: 1,
        type: "button",
        class: "bank-load-more",
        disabled: e.loadingMore,
        onClick: a[0] || (a[0] = (l) => n.$emit("loadMore"))
      }, m(e.loadingMore ? "正在开启下一册…" : "载入更多记录"), 9, Lu)) : (v(), g("p", Ou, "金库档案已全部展开"))
    ])) : (v(), g("div", Iu, [...a[2] || (a[2] = [
      s("span", null, "簿", -1),
      s("strong", null, "尚无兑付记录", -1),
      s("p", null, "头寸到期领取或提前支取后，结果会归档在这里。", -1)
    ])]))]));
  }
}), Pu = Ru, Bu = {
  class: "bank-vault",
  "aria-labelledby": "bank-vault-title"
}, Fu = { class: "bank-section-heading bank-vault-heading" }, Nu = { class: "bank-balance-panel" }, Vu = { class: "bank-vault-metrics" }, Hu = ["disabled", "title"], Uu = { class: "bank-vault-portals" }, Wu = /* @__PURE__ */ ie({
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
    return (t, n) => (v(), g("section", Bu, [
      n[18] || (n[18] = s("div", {
        class: "bank-vault-door",
        "aria-hidden": "true"
      }, [s("div", { class: "bank-vault-ring" }, [
        s("span", null, "III"),
        s("i"),
        s("span", null, "VI"),
        s("i"),
        s("span", null, "IX")
      ])], -1)),
      s("header", Fu, [n[4] || (n[4] = s("div", null, [s("span", null, "PRIVATE RESERVE"), s("h2", { id: "bank-vault-title" }, "金库总览")], -1)), s("small", null, "第 " + m(e.currentTurn) + " 回合", 1)]),
      s("div", Nu, [
        n[6] || (n[6] = s("span", null, "可用资产", -1)),
        s("strong", null, [n[5] || (n[5] = s("small", null, "¤", -1)), ye(m(e.balance.toLocaleString("zh-CN")), 1)]),
        n[7] || (n[7] = s("div", null, [s("span", null, "小白币活期余额"), s("i", null, "AVAILABLE")], -1))
      ]),
      s("div", Vu, [s("article", null, [
        n[8] || (n[8] = s("span", null, "锁定本金", -1)),
        s("strong", null, "¤ " + m(e.lockedAmount.toLocaleString("zh-CN")), 1),
        s("small", null, m(e.depositCount + e.fundCount) + " 笔持仓", 1)
      ]), s("article", { class: se({ "is-claimable": e.claimableCount > 0 }) }, [
        n[9] || (n[9] = s("span", null, "待领取", -1)),
        s("strong", null, m(e.claimableCount), 1),
        s("small", null, m(e.claimableCount ? "已到期，可统一兑付" : "暂无到期头寸"), 1)
      ], 2)]),
      e.claimableCount ? (v(), g("button", {
        key: 0,
        type: "button",
        class: "bank-claim-button",
        disabled: !!e.writeDisabledReason,
        title: e.writeDisabledReason,
        onClick: n[0] || (n[0] = (a) => t.$emit("settle"))
      }, [n[10] || (n[10] = s("span", null, "领取全部到期资产", -1)), s("small", null, m(e.claimableCount) + " 笔一并结算", 1)], 8, Hu)) : F("", !0),
      s("div", Uu, [
        s("button", {
          type: "button",
          onClick: n[1] || (n[1] = (a) => t.$emit("navigate", "deposits"))
        }, [
          n[11] || (n[11] = s("span", { class: "bank-portal-mark" }, "定", -1)),
          n[12] || (n[12] = s("strong", null, "定期存单", -1)),
          s("small", null, m(e.depositCount) + " 笔持有", 1),
          n[13] || (n[13] = s("i", null, "›", -1))
        ]),
        s("button", {
          type: "button",
          onClick: n[2] || (n[2] = (a) => t.$emit("navigate", "funds"))
        }, [
          n[14] || (n[14] = s("span", { class: "bank-portal-mark" }, "理", -1)),
          n[15] || (n[15] = s("strong", null, "浮动理财", -1)),
          s("small", null, m(e.fundCount) + " 笔持有", 1),
          n[16] || (n[16] = s("i", null, "›", -1))
        ]),
        s("button", {
          type: "button",
          onClick: n[3] || (n[3] = (a) => t.$emit("navigate", "records"))
        }, [...n[17] || (n[17] = [
          s("span", { class: "bank-portal-mark" }, "簿", -1),
          s("strong", null, "金融记录", -1),
          s("small", null, "查阅历史兑付", -1),
          s("i", null, "›", -1)
        ])])
      ])
    ]));
  }
}), Gu = Wu, ju = { class: "bank-app" }, qu = { class: "bank-header" }, Ku = { class: "bank-header-balance" }, zu = ["disabled"], Xu = {
  class: "bank-navigation",
  "aria-label": "银行页面"
}, Ju = { key: 0 }, Yu = ["disabled"], Qu = ["disabled"], Zu = { class: "bank-scroll" }, Zt = 35e3, ed = /* @__PURE__ */ ie({
  __name: "BankApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const t = e, n = /* @__PURE__ */ q(structuredClone(/* @__PURE__ */ te(t.initialState))), a = /* @__PURE__ */ q("vault"), l = /* @__PURE__ */ q(null), i = /* @__PURE__ */ q(!1), r = /* @__PURE__ */ q(!1), o = /* @__PURE__ */ q(!1), u = /* @__PURE__ */ q(""), c = /* @__PURE__ */ q(""), d = /* @__PURE__ */ q("");
    let f = null, y = () => {
    }, b = 0;
    const R = Z(() => n.value.status === "unconfirmed"), L = Z(() => r.value ? "正在处理上一项银行操作" : i.value ? "正在刷新金库状态" : n.value.status !== "ready" ? n.value.message || "金库暂时不可写入" : n.value.generationActive ? "主剧情正在生成，请等待回复完成" : ""), Q = Z(() => i.value || r.value || R.value);
    function z() {
      return typeof crypto.randomUUID == "function" ? `bank-ui:${crypto.randomUUID()}` : `bank-ui:${Date.now()}:${Math.random().toString(36).slice(2, 10)}`;
    }
    function j() {
      return { chatIdentity: n.value.chatIdentity };
    }
    function X(G) {
      n.value = structuredClone(G), i.value = !1, o.value = !1, u.value = "", d.value = "", G.claimableCount === 0 && (f = null);
    }
    function $(G) {
      const D = G instanceof Error ? G.message : String(G);
      return D.includes("economy_insufficient_funds") || D.includes("cannot be overdrawn") ? "可用小白币不足，开户未完成。" : D.includes("bank_amount_out_of_range") ? "开户金额不在该产品允许范围内。" : D.includes("bank_amount_invalid") ? "开户金额必须是正整数。" : D.includes("bank_revision_conflict") || D.includes("bank_event_id_conflict") ? "金库状态已变化，请关闭确认框并刷新后重试。" : D.includes("bank_position_missing") || D.includes("bank_position_state_changed") ? "该头寸状态已经变化，请刷新金库。" : D.includes("bank_no_due_positions") ? "当前没有可领取的到期头寸。" : D === "host_request_timeout" ? "等待保存结果超时，请保留当前页面并重试。" : D;
    }
    async function w() {
      if (Q.value) return;
      const G = ++b;
      i.value = !0, u.value = "";
      try {
        const D = await t.bridge.request("bank/refresh", j(), Zt);
        G === b && X(D.result);
      } catch (D) {
        G === b && (u.value = $(D));
      } finally {
        G === b && (i.value = !1);
      }
    }
    async function E() {
      if (i.value || r.value) return;
      const G = ++b;
      i.value = !0, u.value = "";
      try {
        const D = await t.bridge.request("bank/confirm-save", j(), Zt);
        G === b && X(D.result.state);
      } catch (D) {
        G === b && (u.value = $(D));
      } finally {
        G === b && (i.value = !1);
      }
    }
    function A(G, D) {
      L.value || (c.value = "", l.value = {
        mode: D,
        product: G,
        actionId: z()
      });
    }
    function C(G) {
      L.value || (c.value = "", l.value = {
        mode: "withdraw",
        position: G,
        actionId: z()
      });
    }
    function _() {
      r.value || (l.value = null, c.value = "");
    }
    async function S(G) {
      const D = l.value;
      if (!D || r.value) return;
      const re = b;
      r.value = !0, c.value = "";
      const ke = D.mode === "deposit-open" ? "bank/deposit/open" : D.mode === "fund-open" ? "bank/fund/open" : "bank/deposit/withdraw";
      try {
        const oe = await t.bridge.request(ke, {
          ...j(),
          expectedRevision: n.value.revision,
          expectedEventId: n.value.eventId,
          actionId: D.actionId,
          ...D.product ? {
            productId: D.product.id,
            amount: G
          } : {},
          ...D.position ? { positionId: D.position.id } : {}
        }, Zt);
        if (re !== b || l.value !== D) return;
        X(oe.result), l.value = null;
      } catch (oe) {
        re === b && l.value === D && (c.value = $(oe));
      } finally {
        re === b && (r.value = !1);
      }
    }
    async function W() {
      if (L.value || n.value.claimableCount === 0) return;
      const G = b;
      f ||= z();
      const D = f;
      r.value = !0, u.value = "";
      try {
        const re = await t.bridge.request("bank/settle-due", {
          ...j(),
          expectedRevision: n.value.revision,
          expectedEventId: n.value.eventId,
          actionId: D
        }, Zt);
        if (G !== b) return;
        f = null, X(re.result);
      } catch (re) {
        G === b && (u.value = $(re));
      } finally {
        G === b && (r.value = !1);
      }
    }
    async function H() {
      if (!n.value.activityPage.hasMore || o.value || r.value) return;
      const G = b, D = n.value.activities.length;
      o.value = !0, d.value = "";
      try {
        const re = await t.bridge.request("bank/records/load-more", {
          ...j(),
          offset: D
        }, Zt);
        if (G !== b) return;
        const ke = new Set(n.value.activities.map((oe) => oe.id));
        n.value.activities.push(...re.result.activities.filter((oe) => !ke.has(oe.id))), n.value.activityPage = re.result.activityPage;
      } catch (re) {
        G === b && (d.value = $(re));
      } finally {
        G === b && (o.value = !1);
      }
    }
    return mt(() => {
      y = t.bridge.subscribe((G) => {
        G.type === "bank/state" && (r.value || (b += 1), X(G.payload.state)), G.type === "bank/error" && (u.value = String(G.payload?.message || "金库暂时无法读取"));
      });
    }), gt(() => {
      b += 1, y(), l.value = null, f = null;
    }), (G, D) => (v(), g("main", ju, [
      s("header", qu, [
        D[10] || (D[10] = s("div", null, [s("span", { class: "bank-header-kicker" }, "JADE RESERVE · 01"), s("h1", null, "白银金库")], -1)),
        s("div", Ku, [D[8] || (D[8] = s("small", null, "可用余额", -1)), s("strong", null, "¤ " + m(n.value.balance.toLocaleString("zh-CN")), 1)]),
        s("button", {
          type: "button",
          class: "bank-refresh",
          disabled: Q.value,
          title: "重新读取金库",
          onClick: w
        }, [...D[9] || (D[9] = [s("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [s("path", { d: "M20 7v5h-5M4 17v-5h5M18.2 9A7 7 0 0 0 6.1 6.7L4 9m16 6-2.1 2.3A7 7 0 0 1 5.8 15" })], -1), s("span", { class: "bank-sr-only" }, "重新读取金库", -1)])], 8, zu)
      ]),
      s("nav", Xu, [
        s("button", {
          type: "button",
          class: se({ "is-active": a.value === "vault" }),
          onClick: D[0] || (D[0] = (re) => a.value = "vault")
        }, [...D[11] || (D[11] = [s("span", null, "总览", -1)])], 2),
        s("button", {
          type: "button",
          class: se({ "is-active": a.value === "deposits" }),
          onClick: D[1] || (D[1] = (re) => a.value = "deposits")
        }, [...D[12] || (D[12] = [s("span", null, "定期", -1)])], 2),
        s("button", {
          type: "button",
          class: se({ "is-active": a.value === "funds" }),
          onClick: D[2] || (D[2] = (re) => a.value = "funds")
        }, [...D[13] || (D[13] = [s("span", null, "理财", -1)])], 2),
        s("button", {
          type: "button",
          class: se({ "is-active": a.value === "positions" }),
          onClick: D[3] || (D[3] = (re) => a.value = "positions")
        }, [D[14] || (D[14] = s("span", null, "头寸", -1)), n.value.claimableCount ? (v(), g("i", Ju, m(n.value.claimableCount), 1)) : F("", !0)], 2),
        s("button", {
          type: "button",
          class: se({ "is-active": a.value === "records" }),
          onClick: D[4] || (D[4] = (re) => a.value = "records")
        }, [...D[15] || (D[15] = [s("span", null, "记录", -1)])], 2)
      ]),
      n.value.message || u.value ? (v(), g("aside", {
        key: 0,
        class: se(["bank-notice", `is-${n.value.status}`]),
        role: "status"
      }, [D[16] || (D[16] = s("span", { "aria-hidden": "true" }, "鉴", -1)), s("div", null, [
        s("strong", null, m(u.value && n.value.status === "ready" ? "操作未完成" : n.value.statusLabel), 1),
        s("p", null, m(u.value || n.value.message), 1),
        R.value ? (v(), g("button", {
          key: 0,
          type: "button",
          disabled: i.value,
          onClick: E
        }, m(i.value ? "正在核实…" : "核实保存结果"), 9, Yu)) : n.value.status === "blocked" || n.value.status === "conflict" ? (v(), g("button", {
          key: 1,
          type: "button",
          disabled: i.value,
          onClick: w
        }, m(i.value ? "正在读取…" : "重新读取金库"), 9, Qu)) : F("", !0)
      ])], 2)) : F("", !0),
      s("div", Zu, [a.value === "vault" ? (v(), pe(Gu, {
        key: 0,
        balance: n.value.balance,
        "locked-amount": n.value.lockedAmount,
        "current-turn": n.value.currentTurn,
        "deposit-count": n.value.deposits.length,
        "fund-count": n.value.investments.length,
        "claimable-count": n.value.claimableCount,
        "write-disabled-reason": L.value,
        onNavigate: D[5] || (D[5] = (re) => a.value = re),
        onSettle: W
      }, null, 8, [
        "balance",
        "locked-amount",
        "current-turn",
        "deposit-count",
        "fund-count",
        "claimable-count",
        "write-disabled-reason"
      ])) : a.value === "deposits" ? (v(), pe(tu, {
        key: 1,
        products: n.value.products.deposits,
        balance: n.value.balance,
        "write-disabled-reason": L.value,
        onOpen: D[6] || (D[6] = (re) => A(re, "deposit-open"))
      }, null, 8, [
        "products",
        "balance",
        "write-disabled-reason"
      ])) : a.value === "funds" ? (v(), pe(uu, {
        key: 2,
        products: n.value.products.funds,
        balance: n.value.balance,
        "write-disabled-reason": L.value,
        onOpen: D[7] || (D[7] = (re) => A(re, "fund-open"))
      }, null, 8, [
        "products",
        "balance",
        "write-disabled-reason"
      ])) : a.value === "positions" ? (v(), pe(Su, {
        key: 3,
        deposits: n.value.deposits,
        investments: n.value.investments,
        "claimable-count": n.value.claimableCount,
        "write-disabled-reason": L.value,
        onWithdraw: C,
        onSettle: W
      }, null, 8, [
        "deposits",
        "investments",
        "claimable-count",
        "write-disabled-reason"
      ])) : (v(), pe(Pu, {
        key: 4,
        activities: n.value.activities,
        total: n.value.activityPage.total,
        "has-more": n.value.activityPage.hasMore,
        "loading-more": o.value,
        error: d.value,
        onLoadMore: H
      }, null, 8, [
        "activities",
        "total",
        "has-more",
        "loading-more",
        "error"
      ]))]),
      l.value ? (v(), pe(Ko, {
        key: 1,
        mode: l.value.mode,
        product: l.value.product,
        position: l.value.position,
        balance: n.value.balance,
        busy: r.value,
        error: c.value,
        onCancel: _,
        onConfirm: S
      }, null, 8, [
        "mode",
        "product",
        "position",
        "balance",
        "busy",
        "error"
      ])) : F("", !0)
    ]));
  }
}), td = ed, nd = Object.freeze({
  id: "game",
  name: "游戏",
  accent: "#c8a35a"
}), ad = { class: "game-dialog-card" }, ld = {
  key: 0,
  class: "game-inline-error",
  role: "status"
}, sd = { class: "game-dialog-actions" }, id = ["disabled"], rd = ["disabled"], od = /* @__PURE__ */ ie({
  __name: "GameActionDialog",
  props: {
    heading: {},
    summary: {},
    confirmLabel: {},
    busy: { type: Boolean },
    error: {},
    danger: { type: Boolean }
  },
  emits: ["cancel", "confirm"],
  setup(e) {
    return (t, n) => (v(), g("dialog", {
      open: "",
      class: "game-dialog",
      onCancel: n[2] || (n[2] = dt((a) => t.$emit("cancel"), ["prevent"]))
    }, [s("section", ad, [
      n[3] || (n[3] = s("span", { class: "game-eyebrow" }, "FINAL CALL", -1)),
      s("h2", null, m(e.heading), 1),
      s("p", null, m(e.summary), 1),
      e.error ? (v(), g("p", ld, m(e.error), 1)) : F("", !0),
      s("div", sd, [s("button", {
        type: "button",
        disabled: e.busy,
        onClick: n[0] || (n[0] = (a) => t.$emit("cancel"))
      }, "再想想", 8, id), s("button", {
        type: "button",
        class: se(["is-primary", { "is-danger": e.danger }]),
        disabled: e.busy,
        onClick: n[1] || (n[1] = (a) => t.$emit("confirm"))
      }, m(e.busy ? "正在落账…" : e.confirmLabel), 11, rd)])
    ])], 32));
  }
}), ud = od, dd = {
  class: "game-table game-dice-table",
  "aria-labelledby": "game-dice-title"
}, cd = { class: "game-table-heading" }, fd = { class: "game-dice-cloth" }, vd = { class: "game-dealer-position" }, pd = {
  key: 0,
  class: "game-current-bid"
}, md = {
  key: 1,
  class: "game-current-bid is-empty"
}, gd = { class: "game-player-hand" }, hd = { class: "game-dice-row" }, bd = { class: "game-dice-controls" }, yd = {
  key: 0,
  class: "game-bid-picker"
}, kd = ["disabled"], _d = ["value"], $d = ["disabled", "title"], wd = ["disabled", "title"], Cd = {
  key: 0,
  class: "game-bid-history",
  "aria-label": "公开叫牌记录"
}, Sd = /* @__PURE__ */ ie({
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
    const n = e, a = t;
    function l(c) {
      return `${c.count}:${c.face}`;
    }
    const i = /* @__PURE__ */ q(l(n.game.legalBids[0] || {
      count: 1,
      face: 2
    })), r = Z(() => n.game.legalBids.find((c) => l(c) === i.value) || null), o = Z(() => n.game.bids.at(-1) || null);
    Mt(() => n.game.legalBids.map(l).join("|"), () => {
      !r.value && n.game.legalBids[0] && (i.value = l(n.game.legalBids[0]));
    });
    function u() {
      r.value && !n.writeDisabledReason && a("bid", {
        count: r.value.count,
        face: r.value.face
      });
    }
    return (c, d) => (v(), g("section", dd, [
      s("header", cd, [
        s("button", {
          type: "button",
          class: "game-back",
          onClick: d[0] || (d[0] = (f) => a("lobby"))
        }, "返回大厅"),
        d[3] || (d[3] = s("div", null, [s("span", null, "LIAR'S DICE"), s("h2", { id: "game-dice-title" }, "秘骰对决")], -1)),
        s("strong", null, "托管 ¤ " + m(e.game.bet), 1)
      ]),
      s("div", fd, [
        s("div", vd, [d[4] || (d[4] = s("span", {
          class: "game-dealer-chip",
          "aria-hidden": "true"
        }, "庄", -1)), s("p", null, m(o.value?.by === "dealer" ? "庄家已经加叫，轮到你决断。" : "庄家静候你的第一口价。"), 1)]),
        o.value ? (v(), g("div", pd, [
          d[5] || (d[5] = s("small", null, "桌面叫数", -1)),
          s("strong", null, m(o.value.count), 1),
          s("span", null, "枚 " + m(o.value.face) + " 点", 1),
          s("em", null, m(o.value.by === "dealer" ? "庄家" : "你") + "叫牌", 1)
        ])) : (v(), g("div", md, [...d[6] || (d[6] = [s("span", null, "等待首轮叫牌", -1)])])),
        s("div", gd, [
          d[7] || (d[7] = s("span", null, "你的骰子", -1)),
          s("div", hd, [(v(!0), g(ae, null, me(e.game.playerDice, (f, y) => (v(), g("b", {
            key: y,
            class: "game-die"
          }, m(f), 1))), 128))]),
          d[8] || (d[8] = s("small", null, "一点可代替任意叫面", -1))
        ])
      ]),
      s("div", bd, [
        e.game.legalActions.includes("bid") ? (v(), g("label", yd, [d[9] || (d[9] = s("span", null, "下一口合法叫数", -1)), Ae(s("select", {
          "onUpdate:modelValue": d[1] || (d[1] = (f) => i.value = f),
          disabled: !!e.writeDisabledReason
        }, [(v(!0), g(ae, null, me(e.game.legalBids, (f) => (v(), g("option", {
          key: l(f),
          value: l(f)
        }, m(f.count) + " 枚 " + m(f.face) + " 点 ", 9, _d))), 128))], 8, kd), [[_o, i.value]])])) : F("", !0),
        e.game.legalActions.includes("bid") ? (v(), g("button", {
          key: 1,
          type: "button",
          class: "game-primary-action",
          disabled: !!e.writeDisabledReason || !r.value,
          title: e.writeDisabledReason,
          onClick: u
        }, " 加叫 ", 8, $d)) : F("", !0),
        e.game.legalActions.includes("challenge") ? (v(), g("button", {
          key: 2,
          type: "button",
          class: "game-danger-action",
          disabled: !!e.writeDisabledReason,
          title: e.writeDisabledReason,
          onClick: d[2] || (d[2] = (f) => a("challenge"))
        }, " 质疑 ", 8, wd)) : F("", !0)
      ]),
      e.game.bids.length ? (v(), g("ol", Cd, [(v(!0), g(ae, null, me(e.game.bids, (f, y) => (v(), g("li", { key: `${y}:${f.count}:${f.face}` }, [s("span", null, m(f.by === "player" ? "你" : "庄家"), 1), s("strong", null, m(f.count) + " × " + m(f.face) + " 点", 1)]))), 128))])) : F("", !0)
    ]));
  }
}), Ad = Sd, xd = {
  class: "game-table game-ladder-table",
  "aria-labelledby": "game-ladder-title"
}, Id = { class: "game-table-heading" }, Ed = { class: "game-ladder-stage" }, Td = {
  class: "game-ladder-track",
  "aria-label": "五层挑战进度"
}, Md = { key: 0 }, Dd = { key: 1 }, Ld = { class: "game-ladder-purse" }, Od = {
  key: 0,
  class: "game-ladder-choices"
}, Rd = [
  "disabled",
  "title",
  "onClick"
], Pd = ["disabled", "title"], Bd = /* @__PURE__ */ ie({
  __name: "GameLadderGame",
  props: {
    game: {},
    writeDisabledReason: {}
  },
  emits: [
    "step",
    "cashOut",
    "lobby"
  ],
  setup(e, { emit: t }) {
    const n = t, a = Object.freeze({
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
    });
    function l(i) {
      return `${i / 100}%`;
    }
    return (i, r) => (v(), g("section", xd, [
      s("header", Id, [
        s("button", {
          type: "button",
          class: "game-back",
          onClick: r[0] || (r[0] = (o) => n("lobby"))
        }, "返回大厅"),
        r[2] || (r[2] = s("div", null, [s("span", null, "THE GILDED ASCENT"), s("h2", { id: "game-ladder-title" }, "鎏金阶梯")], -1)),
        s("strong", null, "托管 ¤ " + m(e.game.bet), 1)
      ]),
      s("div", Ed, [s("div", Td, [(v(), g(ae, null, me(5, (o) => s("div", {
        key: o,
        class: se(["game-ladder-floor", {
          "is-complete": o <= e.game.completedFloors,
          "is-next": o === e.game.completedFloors + 1
        }])
      }, [s("span", null, m(o), 1), e.game.steps[o - 1] ? (v(), g("small", Md, "¤ " + m(e.game.steps[o - 1]?.amountAfterSuccess), 1)) : (v(), g("small", Dd, "第 " + m(o) + " 层", 1))], 2)), 64))]), s("div", Ld, [
        s("span", null, m(e.game.canCashOut ? "当前可收手" : "风险起点"), 1),
        s("strong", null, "¤ " + m(e.game.cashoutAmount), 1),
        s("small", null, "已完成 " + m(e.game.completedFloors) + " / 5 层", 1)
      ])]),
      e.game.legalActions.includes("step") ? (v(), g("div", Od, [(v(!0), g(ae, null, me(e.game.nextChoices, (o) => (v(), g("button", {
        key: o.choice,
        type: "button",
        class: se(`is-${o.choice}`),
        disabled: !!e.writeDisabledReason,
        title: e.writeDisabledReason,
        onClick: (u) => n("step", o.choice)
      }, [
        s("span", null, m(Ut(a)[o.choice].name), 1),
        s("small", null, m(Ut(a)[o.choice].note), 1),
        s("strong", null, m(l(o.successProbabilityBps)), 1),
        s("em", null, "成功得 ¤ " + m(o.successAmount), 1)
      ], 10, Rd))), 128))])) : F("", !0),
      e.game.legalActions.includes("cash-out") ? (v(), g("button", {
        key: 1,
        type: "button",
        class: "game-ladder-cashout",
        disabled: !!e.writeDisabledReason,
        title: e.writeDisabledReason,
        onClick: r[1] || (r[1] = (o) => n("cashOut"))
      }, " 收手并领取 ¤ " + m(e.game.cashoutAmount), 9, Pd)) : F("", !0)
    ]));
  }
}), Fd = Bd, Nd = {
  class: "game-lobby",
  "aria-labelledby": "game-lobby-title"
}, Vd = {
  key: 0,
  class: "game-continue-card"
}, Hd = {
  key: 1,
  class: "game-grid"
}, Ud = { class: "game-card is-dice" }, Wd = { class: "game-bet-field" }, Gd = ["disabled", "title"], jd = {
  key: 0,
  class: "game-card-reason"
}, qd = { class: "game-card is-push" }, Kd = ["disabled", "title"], zd = {
  key: 0,
  class: "game-card-reason"
}, Xd = { class: "game-card is-ladder" }, Jd = { class: "game-bet-field" }, Yd = ["disabled", "title"], Qd = {
  key: 0,
  class: "game-card-reason"
}, Zd = /* @__PURE__ */ ie({
  __name: "GameLobby",
  props: {
    activeGame: {},
    balance: {},
    lockedAmount: {},
    writeDisabledReason: {}
  },
  emits: ["start", "continue"],
  setup(e, { emit: t }) {
    const n = e, a = t, l = /* @__PURE__ */ q(50), i = /* @__PURE__ */ q(30), r = Z(() => n.activeGame?.kind === "dice" ? "秘骰对决" : n.activeGame?.kind === "push" ? "翻倍或收手" : n.activeGame?.kind === "ladder" ? "鎏金阶梯" : "");
    function o() {
      return n.writeDisabledReason ? n.writeDisabledReason : !Number.isSafeInteger(l.value) || l.value < 50 || l.value > 500 || l.value % 10 !== 0 ? "下注须为 50 至 500，且为 10 的倍数" : n.balance < l.value ? "余额不足" : "";
    }
    function u() {
      return n.writeDisabledReason ? n.writeDisabledReason : n.balance < 50 ? "余额不足" : "";
    }
    function c() {
      return n.writeDisabledReason ? n.writeDisabledReason : !Number.isSafeInteger(i.value) || i.value < 30 || i.value > 800 || i.value % 10 !== 0 ? "下注须为 30 至 800，且为 10 的倍数" : n.balance < i.value ? "余额不足" : "";
    }
    return (d, f) => (v(), g("section", Nd, [f[17] || (f[17] = s("div", { class: "game-lobby-hero" }, [
      s("span", { class: "game-eyebrow" }, "THE GILDED PARLOUR"),
      s("h2", { id: "game-lobby-title" }, "今夜，押注你的判断"),
      s("p", null, "三张独立牌桌，只认明确选择。每一步都会先落账，再揭晓。")
    ], -1)), e.activeGame ? (v(), g("article", Vd, [
      f[7] || (f[7] = s("div", {
        class: "game-continue-seal",
        "aria-hidden": "true"
      }, "续", -1)),
      s("div", null, [
        f[6] || (f[6] = s("span", null, "牌桌仍在等候", -1)),
        s("h3", null, m(r.value), 1),
        s("p", null, "已有 ¤ " + m(e.lockedAmount) + " 托管在本局，离开页面不会结束赌局。", 1)
      ]),
      s("button", {
        type: "button",
        onClick: f[0] || (f[0] = (y) => a("continue", e.activeGame.kind))
      }, "继续本局")
    ])) : (v(), g("div", Hd, [
      s("article", Ud, [
        f[9] || (f[9] = s("div", {
          class: "game-glyph",
          "aria-hidden": "true"
        }, [s("span", null, "⚄"), s("span", null, "⚂")], -1)),
        f[10] || (f[10] = s("div", { class: "game-copy" }, [
          s("span", { class: "game-card-index" }, "TABLE 01"),
          s("h3", null, "秘骰对决"),
          s("p", null, "五骰藏锋，一点为百搭。抬高叫数，或当场质疑庄家。"),
          s("ul", null, [s("li", null, "下注 50–500"), s("li", null, "胜出返还 1.9 倍")])
        ], -1)),
        s("label", Wd, [f[8] || (f[8] = s("span", null, "下注", -1)), Ae(s("input", {
          "onUpdate:modelValue": f[1] || (f[1] = (y) => l.value = y),
          type: "number",
          min: "50",
          max: "500",
          step: "10"
        }, null, 512), [[
          He,
          l.value,
          void 0,
          { number: !0 }
        ]])]),
        s("button", {
          type: "button",
          class: "game-table-button",
          disabled: !!o(),
          title: o(),
          onClick: f[2] || (f[2] = (y) => a("start", "dice", l.value))
        }, " 入席 ", 8, Gd),
        o() ? (v(), g("small", jd, m(o()), 1)) : F("", !0)
      ]),
      s("article", qd, [
        f[11] || (f[11] = s("div", {
          class: "game-glyph is-coin",
          "aria-hidden": "true"
        }, "¤", -1)),
        f[12] || (f[12] = s("div", { class: "game-copy" }, [
          s("span", { class: "game-card-index" }, "TABLE 02"),
          s("h3", null, "翻倍或收手"),
          s("p", null, "十张暗牌藏着七枚金币与三枚炸弹。每次翻牌都更接近答案。"),
          s("ul", null, [s("li", null, "固定下注 50"), s("li", null, "每枚金币价值 50")])
        ], -1)),
        f[13] || (f[13] = s("div", { class: "game-fixed-bet" }, [s("span", null, "入场"), s("strong", null, "¤ 50")], -1)),
        s("button", {
          type: "button",
          class: "game-table-button",
          disabled: !!u(),
          title: u(),
          onClick: f[3] || (f[3] = (y) => a("start", "push", 50))
        }, " 揭牌 ", 8, Kd),
        u() ? (v(), g("small", zd, m(u()), 1)) : F("", !0)
      ]),
      s("article", Xd, [
        f[15] || (f[15] = s("div", {
          class: "game-glyph is-ladder-mark",
          "aria-hidden": "true"
        }, "Ⅴ", -1)),
        f[16] || (f[16] = s("div", { class: "game-copy" }, [
          s("span", { class: "game-card-index" }, "TABLE 03"),
          s("h3", null, "鎏金阶梯"),
          s("p", null, "五层风险逐级累积。每层选择稳、中、险，成功后可随时收手。"),
          s("ul", null, [s("li", null, "下注 30–800"), s("li", null, "最高返还 50,000")])
        ], -1)),
        s("label", Jd, [f[14] || (f[14] = s("span", null, "下注", -1)), Ae(s("input", {
          "onUpdate:modelValue": f[4] || (f[4] = (y) => i.value = y),
          type: "number",
          min: "30",
          max: "800",
          step: "10"
        }, null, 512), [[
          He,
          i.value,
          void 0,
          { number: !0 }
        ]])]),
        s("button", {
          type: "button",
          class: "game-table-button",
          disabled: !!c(),
          title: c(),
          onClick: f[5] || (f[5] = (y) => a("start", "ladder", i.value))
        }, " 登阶 ", 8, Yd),
        c() ? (v(), g("small", Qd, m(c()), 1)) : F("", !0)
      ])
    ]))]));
  }
}), ec = Zd, tc = {
  class: "game-table game-push-table",
  "aria-labelledby": "game-push-title"
}, nc = { class: "game-table-heading" }, ac = { class: "game-push-stage" }, lc = {
  class: "game-coin-stack",
  "aria-label": "已翻出的金币"
}, sc = {
  key: 0,
  class: "game-empty-stack"
}, ic = {
  class: "game-card-fan",
  "aria-hidden": "true"
}, rc = { class: "game-push-metrics" }, oc = { class: "game-actions" }, uc = ["disabled", "title"], dc = ["disabled", "title"], cc = /* @__PURE__ */ ie({
  __name: "GamePushGame",
  props: {
    game: {},
    writeDisabledReason: {}
  },
  emits: [
    "draw",
    "cashOut",
    "lobby"
  ],
  setup(e, { emit: t }) {
    const n = t;
    function a(l) {
      return `${(l / 100).toFixed(l % 100 === 0 ? 0 : 2)}%`;
    }
    return (l, i) => (v(), g("section", tc, [
      s("header", nc, [
        s("button", {
          type: "button",
          class: "game-back",
          onClick: i[0] || (i[0] = (r) => n("lobby"))
        }, "返回大厅"),
        i[3] || (i[3] = s("div", null, [s("span", null, "DOUBLE OR HOLD"), s("h2", { id: "game-push-title" }, "翻倍或收手")], -1)),
        s("strong", null, "托管 ¤ " + m(e.game.bet), 1)
      ]),
      s("div", ac, [s("div", lc, [e.game.revealedCoins === 0 ? (v(), g("span", sc, "尚未揭牌")) : F("", !0), (v(!0), g(ae, null, me(e.game.revealedCoins, (r) => (v(), g("b", {
        key: r,
        class: "game-revealed-coin"
      }, "¤"))), 128))]), s("div", ic, [(v(!0), g(ae, null, me(e.game.remainingCards, (r) => (v(), g("i", {
        key: r,
        style: jt({ "--card": r })
      }, null, 4))), 128))])]),
      s("div", rc, [
        s("div", null, [i[4] || (i[4] = s("span", null, "可收手", -1)), s("strong", null, "¤ " + m(e.game.cashoutAmount), 1)]),
        s("div", null, [i[5] || (i[5] = s("span", null, "余牌", -1)), s("strong", null, m(e.game.remainingCards), 1)]),
        s("div", null, [i[6] || (i[6] = s("span", null, "余雷", -1)), s("strong", null, m(e.game.remainingBombs), 1)]),
        s("div", null, [i[7] || (i[7] = s("span", null, "下一张风险", -1)), s("strong", null, m(a(e.game.nextBombProbabilityBps)), 1)])
      ]),
      i[8] || (i[8] = s("p", { class: "game-rule-note" }, "每枚金币增加 ¤ 50；翻到炸弹立即以零返还结束。", -1)),
      s("div", oc, [e.game.legalActions.includes("draw") ? (v(), g("button", {
        key: 0,
        type: "button",
        class: "game-primary-action",
        disabled: !!e.writeDisabledReason,
        title: e.writeDisabledReason,
        onClick: i[1] || (i[1] = (r) => n("draw"))
      }, " 再翻一张 ", 8, uc)) : F("", !0), e.game.legalActions.includes("cash-out") ? (v(), g("button", {
        key: 1,
        type: "button",
        class: "game-secondary-action",
        disabled: !!e.writeDisabledReason,
        title: e.writeDisabledReason,
        onClick: i[2] || (i[2] = (r) => n("cashOut"))
      }, " 收手入账 ", 8, dc)) : F("", !0)])
    ]));
  }
}), fc = cc, vc = {
  class: "game-records",
  "aria-labelledby": "game-records-title"
}, pc = { class: "game-section-heading" }, mc = {
  key: 0,
  class: "game-record-list"
}, gc = {
  class: "game-record-mark",
  "aria-hidden": "true"
}, hc = { class: "game-record-main" }, bc = ["datetime"], yc = { class: "game-record-money" }, kc = {
  key: 0,
  class: "game-record-detail"
}, _c = {
  key: 1,
  class: "game-record-detail"
}, $c = {
  key: 2,
  class: "game-record-steps"
}, wc = {
  key: 1,
  class: "game-record-empty"
}, Cc = {
  key: 2,
  class: "game-inline-error",
  role: "status"
}, Sc = ["disabled"], Ac = /* @__PURE__ */ ie({
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
    function n(a) {
      return new Intl.DateTimeFormat("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      }).format(new Date(a));
    }
    return (a, l) => (v(), g("section", vc, [
      s("header", pc, [l[1] || (l[1] = s("div", null, [s("span", null, "HOUSE LEDGER"), s("h2", { id: "game-records-title" }, "牌桌记录")], -1)), s("small", null, m(e.total) + " 局", 1)]),
      e.records.length ? (v(), g("div", mc, [(v(!0), g(ae, null, me(e.records, (i) => (v(), g("article", {
        key: i.id,
        class: se(["game-record", `is-${i.outcomeTone}`])
      }, [s("div", gc, m(i.game === "dice" ? "骰" : i.game === "push" ? "翻" : "阶"), 1), s("div", hc, [
        s("header", null, [s("div", null, [s("span", null, m(i.gameLabel), 1), s("strong", null, m(i.outcomeLabel), 1)]), s("time", { datetime: new Date(i.createdAt).toISOString() }, m(n(i.createdAt)), 9, bc)]),
        s("div", yc, [
          s("span", null, "下注 ¤ " + m(i.amountIn), 1),
          s("span", null, "返还 ¤ " + m(i.payout), 1),
          s("strong", null, m(i.net > 0 ? "+" : "") + m(i.net), 1)
        ]),
        s("details", null, [l[2] || (l[2] = s("summary", null, "查看公开牌局", -1)), i.detail.kind === "dice" ? (v(), g("div", kc, [
          s("p", null, "终局叫数：" + m(i.detail.finalBid.count) + " 枚 " + m(i.detail.finalBid.face) + " 点", 1),
          s("p", null, "实际匹配：" + m(i.detail.matchingDiceCount) + " 枚 · " + m(i.detail.challenger === "player" ? "玩家" : "庄家") + "质疑", 1),
          s("p", null, "你的骰子：" + m(i.detail.playerDice.join(" · ")), 1)
        ])) : i.detail.kind === "push" ? (v(), g("div", _c, [s("p", null, "共翻出 " + m(i.detail.revealedCoins) + " 枚金币", 1)])) : (v(), g("ol", $c, [(v(!0), g(ae, null, me(i.detail.steps, (r) => (v(), g("li", { key: r.floor }, " 第 " + m(r.floor) + " 层 · " + m(Ut(t)[r.choice]) + " · " + m(r.success ? `成功至 ¤ ${r.amountAfterStep}` : "挑战失败"), 1))), 128))]))])
      ])], 2))), 128))])) : (v(), g("div", wc, [...l[3] || (l[3] = [s("span", { "aria-hidden": "true" }, "◇", -1), s("p", null, "尚无结算记录", -1)])])),
      e.error ? (v(), g("p", Cc, m(e.error), 1)) : F("", !0),
      e.hasMore ? (v(), g("button", {
        key: 3,
        type: "button",
        class: "game-load-more",
        disabled: e.loadingMore,
        onClick: l[0] || (l[0] = (i) => a.$emit("loadMore"))
      }, m(e.loadingMore ? "正在翻阅…" : "继续翻阅记录"), 9, Sc)) : F("", !0)
    ]));
  }
}), xc = Ac, Ic = { class: "game-app" }, Ec = { class: "game-header" }, Tc = { class: "game-funds" }, Mc = ["disabled"], Dc = {
  class: "game-nav",
  "aria-label": "游戏页面"
}, Lc = ["disabled"], Oc = ["disabled"], Rc = {
  key: 1,
  class: "game-action-error",
  role: "status"
}, Pc = ["disabled"], Bc = { class: "game-scroll" }, An = 35e3, Fc = /* @__PURE__ */ ie({
  __name: "GameApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const t = e, n = /* @__PURE__ */ q(structuredClone(/* @__PURE__ */ te(t.initialState))), a = /* @__PURE__ */ q(n.value.activeGame?.kind || "lobby"), l = /* @__PURE__ */ q(!1), i = /* @__PURE__ */ q(!1), r = /* @__PURE__ */ q(!1), o = /* @__PURE__ */ q(""), u = /* @__PURE__ */ q(""), c = /* @__PURE__ */ q(""), d = /* @__PURE__ */ q(null), f = /* @__PURE__ */ q(null), y = /* @__PURE__ */ q("");
    let b = () => {
    }, R = 0, L = 0;
    const Q = Z(() => n.value.status === "unconfirmed"), z = Z(() => i.value ? "正在处理上一项操作" : l.value ? "正在刷新游戏状态" : n.value.status !== "ready" ? n.value.message || "游戏暂时不可写入" : n.value.generationActive ? "主剧情正在生成，请等待回复完成" : ""), j = Z(() => l.value || i.value || Q.value || n.value.status === "conflict"), X = Z(() => n.value.records.find((N) => N.id === y.value) || null);
    function $() {
      return typeof crypto.randomUUID == "function" ? `game-ui:${crypto.randomUUID()}` : (L += 1, `game-ui:${Date.now()}:${L}`);
    }
    function w() {
      return { chatIdentity: n.value.chatIdentity };
    }
    function E(N) {
      const O = N instanceof Error ? N.message : String(N);
      return O.includes("cannot be overdrawn") || O.includes("economy_insufficient_funds") ? "小白币余额不足，未能入局。" : O.includes("game_revision_conflict") || O.includes("game_event_id_conflict") ? "牌局已经变化，请重新读取后再操作。" : O.includes("game_dice_bid_not_higher") ? "叫数必须高于桌面当前叫数。" : O.includes("game_action_invalid") ? "当前牌局不接受这项操作。" : O.includes("game_main_generation_active") ? "主剧情正在生成，请等待回复完成。" : O.includes("game_push_cashout_invalid") || O.includes("game_ladder_cashout_invalid") ? "当前还不能收手。" : O.includes("聊天已切换") ? "聊天已切换，请重新打开游戏。" : O === "host_request_timeout" ? "等待落账结果超时；可用同一操作标识安全重试。" : "游戏操作未完成，请稍后重试。";
    }
    function A(N) {
      const O = n.value.activeGame;
      n.value = structuredClone(N), l.value = !1, r.value = !1, o.value = "", c.value = "", O && !N.activeGame ? (y.value = N.records.find((le) => le.gameId === O.id)?.id || "", a.value = "lobby") : N.activeGame && a.value !== "records" && a.value !== "lobby" ? a.value = N.activeGame.kind : !N.activeGame && a.value !== "records" && (a.value = "lobby");
    }
    function C(N, O) {
      const le = {
        ...w(),
        expectedRevision: n.value.revision,
        expectedEventId: n.value.eventId,
        actionId: O
      };
      return N.endpoint === "game/dice/start" || N.endpoint === "game/ladder/start" ? {
        ...le,
        bet: N.bet
      } : N.endpoint === "game/push/start" ? le : N.endpoint === "game/dice/bid" ? {
        ...le,
        gameId: N.gameId,
        bid: {
          count: N.bid.count,
          face: N.bid.face
        }
      } : N.endpoint === "game/ladder/step" ? {
        ...le,
        gameId: N.gameId,
        choice: N.choice
      } : {
        ...le,
        gameId: N.gameId
      };
    }
    async function _(N, O = $()) {
      if (z.value) return !1;
      const le = R;
      i.value = !0, u.value = "", f.value = null;
      try {
        const xe = await t.bridge.request(N.endpoint, C(N, O), An);
        return le !== R ? !1 : (A(xe.result), xe.result.activeGame && (a.value = xe.result.activeGame.kind), d.value = null, !0);
      } catch (xe) {
        return le === R && (u.value = E(xe), n.value.status === "unconfirmed" ? (d.value = null, f.value = null) : f.value = {
          request: N,
          actionId: O
        }), !1;
      } finally {
        le === R && (i.value = !1);
      }
    }
    function S(N, O) {
      if (z.value || n.value.activeGame) return;
      const le = N === "dice" ? {
        heading: "确认入席秘骰对决",
        summary: `托管 ¤ ${O}，胜出返还下注的 1.9 倍。`,
        confirmLabel: "确认入席"
      } : N === "push" ? {
        heading: "确认揭开第一张牌",
        summary: "托管 ¤ 50。金币可以累积，炸弹会立即结束本局。",
        confirmLabel: "确认揭牌"
      } : {
        heading: "确认踏上鎏金阶梯",
        summary: `托管 ¤ ${O}，首层成功后才可收手。`,
        confirmLabel: "确认登阶"
      };
      d.value = {
        request: N === "dice" ? {
          endpoint: "game/dice/start",
          bet: O
        } : N === "push" ? { endpoint: "game/push/start" } : {
          endpoint: "game/ladder/start",
          bet: O
        },
        actionId: $(),
        ...le
      }, u.value = "";
    }
    function W() {
      const N = n.value.activeGame;
      N?.kind !== "dice" || !N.legalActions.includes("challenge") || (d.value = {
        request: {
          endpoint: "game/dice/challenge",
          gameId: N.id
        },
        actionId: $(),
        heading: "确定质疑庄家？",
        summary: "双方骰子将立即核验，本局随结果结算。",
        confirmLabel: "提出质疑",
        danger: !0
      }, u.value = "");
    }
    function H(N) {
      const O = n.value.activeGame;
      if (!O || O.kind !== N || !O.legalActions.includes("cash-out")) return;
      const le = O.cashoutAmount;
      d.value = {
        request: N === "push" ? {
          endpoint: "game/push/cash-out",
          gameId: O.id
        } : {
          endpoint: "game/ladder/cash-out",
          gameId: O.id
        },
        actionId: $(),
        heading: "现在收手？",
        summary: `本局将结束，并返还 ¤ ${le}。`,
        confirmLabel: "收手入账"
      }, u.value = "";
    }
    async function G() {
      const N = d.value;
      N && await _(N.request, N.actionId);
    }
    function D() {
      i.value || (d.value = null, u.value = "");
    }
    async function re() {
      if (j.value) return;
      const N = ++R;
      l.value = !0, o.value = "";
      try {
        const O = await t.bridge.request("game/refresh", w(), An);
        N === R && A(O.result);
      } catch (O) {
        N === R && (o.value = E(O));
      } finally {
        N === R && (l.value = !1);
      }
    }
    async function ke() {
      if (l.value || i.value) return;
      const N = ++R;
      l.value = !0, o.value = "";
      try {
        const O = await t.bridge.request("game/confirm-save", w(), An);
        N === R && A(O.result.state);
      } catch (O) {
        N === R && (o.value = E(O));
      } finally {
        N === R && (l.value = !1);
      }
    }
    async function oe() {
      if (!n.value.hasMore || r.value || i.value) return;
      const N = R;
      r.value = !0, c.value = "";
      try {
        const O = await t.bridge.request("game/records/load-more", {
          ...w(),
          offset: n.value.records.length
        }, An);
        if (N !== R) return;
        const le = new Set(n.value.records.map((xe) => xe.id));
        n.value.records.push(...O.result.records.filter((xe) => !le.has(xe.id))), n.value.total = O.result.total, n.value.hasMore = O.result.hasMore;
      } catch (O) {
        N === R && (c.value = E(O));
      } finally {
        N === R && (r.value = !1);
      }
    }
    function fe() {
      const N = f.value;
      N && _(N.request, N.actionId);
    }
    return mt(() => {
      b = t.bridge.subscribe((N) => {
        N.type === "game/state" && (i.value || (R += 1), u.value = "", f.value = null, A(N.payload.state)), N.type === "game/error" && (o.value = "游戏状态暂时无法读取，请重新打开。");
      });
    }), gt(() => {
      R += 1, b(), d.value = null, f.value = null;
    }), (N, O) => (v(), g("main", Ic, [
      s("header", Ec, [
        O[16] || (O[16] = s("div", { class: "game-brand" }, [s("span", null, "GAME CENTER"), s("h1", null, "游戏")], -1)),
        s("div", Tc, [s("span", null, [O[13] || (O[13] = s("small", null, "可用", -1)), s("strong", null, "¤ " + m(n.value.balance), 1)]), s("span", null, [O[14] || (O[14] = s("small", null, "托管", -1)), s("strong", null, "¤ " + m(n.value.lockedAmount), 1)])]),
        s("button", {
          type: "button",
          class: "game-refresh",
          disabled: j.value,
          title: "重新读取游戏",
          onClick: re
        }, [...O[15] || (O[15] = [s("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [s("path", { d: "M20 7v5h-5M4 17v-5h5M18.2 9A7 7 0 0 0 6.1 6.7L4 9m16 6-2.1 2.3A7 7 0 0 1 5.8 15" })], -1), s("span", { class: "game-sr-only" }, "重新读取游戏", -1)])], 8, Mc)
      ]),
      s("nav", Dc, [
        s("button", {
          type: "button",
          class: se({ "is-active": a.value === "lobby" }),
          onClick: O[0] || (O[0] = (le) => a.value = "lobby")
        }, "大厅", 2),
        n.value.activeGame ? (v(), g("button", {
          key: 0,
          type: "button",
          class: se({ "is-active": a.value === n.value.activeGame.kind }),
          onClick: O[1] || (O[1] = (le) => a.value = n.value.activeGame?.kind || "lobby")
        }, [...O[17] || (O[17] = [ye(" 当前牌桌", -1), s("i", null, null, -1)])], 2)) : F("", !0),
        s("button", {
          type: "button",
          class: se({ "is-active": a.value === "records" }),
          onClick: O[2] || (O[2] = (le) => a.value = "records")
        }, "记录", 2)
      ]),
      n.value.message || o.value ? (v(), g("aside", {
        key: 0,
        class: se(["game-notice", `is-${n.value.status}`]),
        role: "status"
      }, [O[18] || (O[18] = s("span", { "aria-hidden": "true" }, "!", -1)), s("div", null, [
        s("strong", null, m(n.value.status === "unconfirmed" ? "落账待核实" : n.value.status === "conflict" ? "牌局状态冲突" : "游戏状态"), 1),
        s("p", null, m(o.value || n.value.message), 1),
        Q.value ? (v(), g("button", {
          key: 0,
          type: "button",
          disabled: l.value,
          onClick: ke
        }, m(l.value ? "正在核实…" : "核实保存结果"), 9, Lc)) : n.value.status === "blocked" ? (v(), g("button", {
          key: 1,
          type: "button",
          disabled: l.value,
          onClick: re
        }, m(l.value ? "正在读取…" : "重新读取"), 9, Oc)) : F("", !0)
      ])], 2)) : F("", !0),
      u.value && !d.value ? (v(), g("aside", Rc, [s("span", null, m(u.value), 1), f.value && n.value.status === "ready" ? (v(), g("button", {
        key: 0,
        type: "button",
        disabled: i.value,
        onClick: fe
      }, "重试同一操作", 8, Pc)) : F("", !0)])) : F("", !0),
      s("div", Bc, [X.value && a.value === "lobby" ? (v(), g("div", {
        key: 0,
        class: se(["game-result-banner", `is-${X.value.outcomeTone}`]),
        role: "status"
      }, [
        s("span", null, m(X.value.gameLabel), 1),
        s("strong", null, m(X.value.outcomeLabel), 1),
        s("em", null, m(X.value.net > 0 ? "+" : "") + m(X.value.net) + " 小白币", 1),
        s("button", {
          type: "button",
          onClick: O[3] || (O[3] = (le) => y.value = "")
        }, "关闭")
      ], 2)) : F("", !0), a.value === "lobby" ? (v(), pe(ec, {
        key: 1,
        "active-game": n.value.activeGame,
        balance: n.value.balance,
        "locked-amount": n.value.lockedAmount,
        "write-disabled-reason": z.value,
        onStart: S,
        onContinue: O[4] || (O[4] = (le) => a.value = le)
      }, null, 8, [
        "active-game",
        "balance",
        "locked-amount",
        "write-disabled-reason"
      ])) : a.value === "dice" && n.value.activeGame?.kind === "dice" ? (v(), pe(Ad, {
        key: 2,
        game: n.value.activeGame,
        "write-disabled-reason": z.value,
        onBid: O[5] || (O[5] = (le) => _({
          endpoint: "game/dice/bid",
          gameId: n.value.activeGame?.id || "",
          bid: le
        })),
        onChallenge: W,
        onLobby: O[6] || (O[6] = (le) => a.value = "lobby")
      }, null, 8, ["game", "write-disabled-reason"])) : a.value === "push" && n.value.activeGame?.kind === "push" ? (v(), pe(fc, {
        key: 3,
        game: n.value.activeGame,
        "write-disabled-reason": z.value,
        onDraw: O[7] || (O[7] = (le) => _({
          endpoint: "game/push/draw",
          gameId: n.value.activeGame?.id || ""
        })),
        onCashOut: O[8] || (O[8] = (le) => H("push")),
        onLobby: O[9] || (O[9] = (le) => a.value = "lobby")
      }, null, 8, ["game", "write-disabled-reason"])) : a.value === "ladder" && n.value.activeGame?.kind === "ladder" ? (v(), pe(Fd, {
        key: 4,
        game: n.value.activeGame,
        "write-disabled-reason": z.value,
        onStep: O[10] || (O[10] = (le) => _({
          endpoint: "game/ladder/step",
          gameId: n.value.activeGame?.id || "",
          choice: le
        })),
        onCashOut: O[11] || (O[11] = (le) => H("ladder")),
        onLobby: O[12] || (O[12] = (le) => a.value = "lobby")
      }, null, 8, ["game", "write-disabled-reason"])) : a.value === "records" ? (v(), pe(xc, {
        key: 5,
        records: n.value.records,
        total: n.value.total,
        "has-more": n.value.hasMore,
        "loading-more": r.value,
        error: c.value,
        onLoadMore: oe
      }, null, 8, [
        "records",
        "total",
        "has-more",
        "loading-more",
        "error"
      ])) : F("", !0)]),
      d.value ? (v(), pe(ud, {
        key: 2,
        heading: d.value.heading,
        summary: d.value.summary,
        "confirm-label": d.value.confirmLabel,
        busy: i.value,
        error: u.value,
        danger: d.value.danger,
        onCancel: D,
        onConfirm: G
      }, null, 8, [
        "heading",
        "summary",
        "confirm-label",
        "busy",
        "error",
        "danger"
      ])) : F("", !0)
    ]));
  }
}), Nc = Fc, Vc = Object.freeze({
  id: "fourth-wall",
  name: "四次元壁",
  accent: "#7567d8"
}), Hc = ["src"], Uc = {
  key: 1,
  class: "fourth-wall-avatar is-placeholder",
  "aria-hidden": "true"
}, Wc = { class: "fourth-wall-message-stack" }, Gc = {
  key: 0,
  class: "fourth-wall-thinking"
}, jc = { class: "fourth-wall-bubble" }, qc = {
  key: 0,
  class: "fourth-wall-message-text"
}, Kc = {
  key: 1,
  class: "fourth-wall-image-card"
}, zc = ["src", "alt"], Xc = ["onClick"], Jc = { key: 2 }, Yc = { key: 3 }, Qc = ["onClick"], Zc = { "aria-hidden": "true" }, ef = { key: 0 }, tf = { class: "fourth-wall-message-actions" }, nf = { key: 1 }, af = /* @__PURE__ */ ie({
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
    const n = e, a = t, l = /* @__PURE__ */ q(!1), i = /* @__PURE__ */ q(""), r = /* @__PURE__ */ kt({}), o = /* @__PURE__ */ new Set();
    let u = () => {
    };
    function c(w) {
      const E = /\[(?:img|图片)\s*:\s*([^\]]+)\]|\[(?:voice|语音)\s*:([^:\]]*):([^\]]+)\]|\[(?:voice|语音)\s*:\s*([^\]]+)\]/gi, A = [];
      let C = 0, _;
      for (; (_ = E.exec(w)) !== null; )
        _.index > C && A.push({
          kind: "text",
          raw: w.slice(C, _.index),
          value: w.slice(C, _.index)
        }), _[1] !== void 0 ? A.push({
          kind: "image",
          raw: _[0],
          value: _[1].trim()
        }) : A.push({
          kind: "voice",
          raw: _[0],
          value: String(_[3] ?? _[4] ?? "").trim(),
          emotion: String(_[2] || "").trim().toLowerCase()
        }), C = E.lastIndex;
      return C < w.length && A.push({
        kind: "text",
        raw: w.slice(C),
        value: w.slice(C)
      }), A.length ? A : [{
        kind: "text",
        raw: w,
        value: w
      }];
    }
    const d = Z(() => c(n.message.content)), f = Z(() => n.message.ts ? new Intl.DateTimeFormat("zh-CN", {
      hour: "2-digit",
      minute: "2-digit"
    }).format(n.message.ts) : "");
    function y(w, E) {
      return `fw-${w}-${Date.now()}-${n.messageIndex}-${E}-${Math.random().toString(36).slice(2, 7)}`;
    }
    function b(w) {
      return w.result;
    }
    function R(w, E) {
      return o.has(E) && r[w]?.requestId === E;
    }
    async function L(w, E) {
      if (r[E]?.status === "loading" || r[E]?.status === "ready") return;
      if (!n.imageAvailable) {
        r[E] = {
          status: "unavailable",
          message: "画图能力未启用"
        };
        return;
      }
      const A = y("image", E);
      o.add(A), r[E] = {
        status: "loading",
        message: "查询图片缓存",
        requestId: A
      };
      const C = {
        chatIdentity: n.chatIdentity,
        sessionId: n.sessionId
      };
      try {
        const _ = b(await n.bridge.request("fourth-wall/image-check", {
          ...C,
          tags: w.value,
          mediaRequestId: A
        }, 3e4));
        if (!R(E, A)) return;
        if (!_.available) {
          r[E] = {
            status: "unavailable",
            message: "画图能力未启用",
            requestId: A
          };
          return;
        }
        let S = _.cached || "";
        if (!S) {
          r[E] = {
            status: "loading",
            message: "正在生成图片",
            requestId: A
          };
          const W = b(await n.bridge.request("fourth-wall/image-generate", {
            ...C,
            tags: w.value,
            mediaRequestId: A
          }, 18e4));
          if (!R(E, A)) return;
          S = W.base64;
        }
        r[E] = {
          status: "ready",
          source: /^(?:data:|blob:|https?:)/i.test(S) ? S : `data:image/png;base64,${S}`
        };
      } catch (_) {
        R(E, A) && (r[E] = {
          status: "error",
          message: _ instanceof Error ? _.message : String(_),
          requestId: A
        });
      } finally {
        o.delete(A);
      }
    }
    async function Q(w, E) {
      if (!n.voiceAvailable) {
        r[E] = {
          status: "unavailable",
          message: "TTS 能力未启用"
        };
        return;
      }
      const A = r[E];
      if (A?.status === "loading") return;
      if (A?.status === "playing" && A.requestId) {
        n.bridge.post("fourth-wall/voice-stop", {
          chatIdentity: n.chatIdentity,
          mediaRequestId: A.requestId
        }), r[E] = { status: "idle" };
        return;
      }
      const C = y("voice", E);
      o.add(C), r[E] = {
        status: "loading",
        message: "正在准备语音",
        requestId: C
      };
      try {
        await n.bridge.request("fourth-wall/voice-play", {
          chatIdentity: n.chatIdentity,
          sessionId: n.sessionId,
          mediaRequestId: C,
          text: w.value,
          emotion: w.emotion
        });
      } catch (_) {
        R(E, C) && (r[E] = {
          status: "error",
          message: _ instanceof Error ? _.message : String(_),
          requestId: C
        }), o.delete(C);
      }
    }
    function z() {
      i.value = n.message.content, l.value = !0;
    }
    function j() {
      const w = i.value.trim();
      w && (a("edit", n.messageIndex, w), l.value = !1);
    }
    function X() {
      o.forEach((w) => {
        n.bridge.post("fourth-wall/image-cancel", {
          chatIdentity: n.chatIdentity,
          mediaRequestId: w
        }), n.bridge.post("fourth-wall/voice-stop", {
          chatIdentity: n.chatIdentity,
          mediaRequestId: w
        });
      }), o.clear();
    }
    function $() {
      d.value.forEach((w, E) => {
        w.kind === "image" && L(w, E);
      });
    }
    return mt(() => {
      u = n.bridge.subscribe((w) => {
        if (w.type === "fourth-wall/image-progress") {
          const E = w.payload, A = Object.keys(r).map(Number).find((C) => r[C]?.requestId === E.mediaRequestId);
          A !== void 0 && (r[A].message = E.status === "queued" ? `图片队列第 ${E.position || 1} 位` : "正在生成图片");
        }
        if (w.type === "fourth-wall/voice-state") {
          const E = w.payload, A = Object.keys(r).map(Number).find((C) => r[C]?.requestId === E.requestId);
          if (A === void 0) return;
          E.state === "playing" && (r[A].status = "playing"), (E.state === "ended" || E.state === "stopped") && (o.delete(String(E.requestId || "")), r[A] = { status: "idle" }), E.state === "error" && (o.delete(String(E.requestId || "")), r[A] = {
            status: "error",
            message: E.message || "语音播放失败"
          });
        }
      }), $();
    }), Mt(() => n.message.content, () => {
      X(), Object.keys(r).forEach((w) => delete r[Number(w)]), $();
    }), gt(() => {
      u(), X();
    }), (w, E) => (v(), g("article", { class: se(["fourth-wall-message", e.message.role === "user" ? "is-user" : "is-ai"]) }, [(e.message.role === "user" ? e.userAvatar : e.characterAvatar) ? (v(), g("img", {
      key: 0,
      class: "fourth-wall-avatar",
      src: e.message.role === "user" ? e.userAvatar : e.characterAvatar,
      alt: ""
    }, null, 8, Hc)) : (v(), g("span", Uc)), s("div", Wc, [
      e.message.thinking ? (v(), g("details", Gc, [E[3] || (E[3] = s("summary", null, "思考过程", -1)), s("div", null, m(e.message.thinking), 1)])) : F("", !0),
      s("div", jc, [l.value ? Ae((v(), g("textarea", {
        key: 0,
        "onUpdate:modelValue": E[0] || (E[0] = (A) => i.value = A),
        class: "fourth-wall-edit",
        rows: "3"
      }, null, 512)), [[He, i.value]]) : (v(!0), g(ae, { key: 1 }, me(d.value, (A, C) => (v(), g(ae, { key: `${A.kind}-${C}` }, [A.kind === "text" ? (v(), g("span", qc, m(A.value), 1)) : A.kind === "image" ? (v(), g("figure", Kc, [r[C]?.status === "ready" ? (v(), g("img", {
        key: 0,
        src: r[C].source,
        alt: A.value
      }, null, 8, zc)) : r[C]?.status === "error" ? (v(), g("button", {
        key: 1,
        type: "button",
        onClick: (_) => L(A, C)
      }, [ye(m(A.raw), 1), s("small", null, m(r[C].message) + "，点此重试", 1)], 8, Xc)) : r[C]?.status === "unavailable" ? (v(), g("div", Jc, [ye(m(A.raw), 1), s("small", null, m(r[C].message), 1)])) : (v(), g("div", Yc, [ye(m(A.raw), 1), s("small", null, m(r[C]?.message || "准备图片"), 1)]))])) : (v(), g("button", {
        key: 2,
        class: "fourth-wall-voice",
        type: "button",
        onClick: (_) => Q(A, C)
      }, [
        s("span", Zc, m(r[C]?.status === "playing" ? "■" : "▶"), 1),
        s("span", null, m(A.value), 1),
        r[C]?.message ? (v(), g("small", ef, m(r[C].message), 1)) : F("", !0)
      ], 8, Qc))], 64))), 128)), s("div", tf, [l.value ? (v(), g(ae, { key: 0 }, [s("button", {
        type: "button",
        onClick: j
      }, "保存"), s("button", {
        type: "button",
        onClick: E[1] || (E[1] = (A) => l.value = !1)
      }, "取消")], 64)) : (v(), g(ae, { key: 1 }, [s("button", {
        type: "button",
        onClick: z
      }, "编辑"), s("button", {
        type: "button",
        onClick: E[2] || (E[2] = (A) => a("delete", e.messageIndex))
      }, "删除")], 64))])]),
      f.value ? (v(), g("time", nf, m(f.value), 1)) : F("", !0)
    ])], 2));
  }
}), lf = af, sf = {
  key: 1,
  class: "fourth-wall-empty"
}, rf = {
  key: 2,
  class: "fourth-wall-message is-ai is-streaming"
}, of = ["src"], uf = {
  key: 1,
  class: "fourth-wall-avatar is-placeholder"
}, df = { class: "fourth-wall-message-stack" }, cf = {
  key: 0,
  class: "fourth-wall-thinking",
  open: ""
}, ff = { class: "fourth-wall-bubble" }, vf = {
  key: 0,
  class: "fourth-wall-unsaved"
}, pf = /* @__PURE__ */ ie({
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
    const t = e, n = /* @__PURE__ */ q(null), a = /* @__PURE__ */ q(40), l = Z(() => Math.max(0, t.history.length - a.value)), i = Z(() => t.history.slice(l.value));
    function r() {
      a.value = Math.min(t.history.length, a.value + 40);
    }
    return Mt(() => t.sessionId, () => {
      a.value = 40;
    }), Mt(() => [t.history.length, t.generation.text], async () => {
      await qn(), n.value && (n.value.scrollTop = n.value.scrollHeight);
    }, { immediate: !0 }), (o, u) => (v(), g("section", {
      ref_key: "viewport",
      ref: n,
      class: "fourth-wall-conversation",
      "aria-live": "polite"
    }, [
      l.value > 0 ? (v(), g("button", {
        key: 0,
        type: "button",
        class: "fourth-wall-earlier",
        onClick: r
      }, " 显示更早的 " + m(l.value) + " 条记录 ", 1)) : F("", !0),
      e.history.length === 0 && e.generation.status === "idle" ? (v(), g("div", sf, [...u[2] || (u[2] = [
        s("span", null, "IV", -1),
        s("strong", null, "越过故事边界", -1),
        s("p", null, "这里是你与角色扮演者的皮下私聊。", -1)
      ])])) : F("", !0),
      (v(!0), g(ae, null, me(i.value, (c, d) => (v(), pe(lf, {
        key: `${c.ts}-${l.value + d}`,
        message: c,
        "message-index": l.value + d,
        "chat-identity": e.chatIdentity,
        "session-id": e.sessionId,
        "user-avatar": e.userAvatar,
        "character-avatar": e.characterAvatar,
        "image-available": e.imageAvailable,
        "voice-available": e.voiceAvailable,
        bridge: e.bridge,
        onEdit: u[0] || (u[0] = (f, y) => o.$emit("edit", f, y)),
        onDelete: u[1] || (u[1] = (f) => o.$emit("delete", f))
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
      e.generation.status !== "idle" ? (v(), g("article", rf, [e.characterAvatar ? (v(), g("img", {
        key: 0,
        class: "fourth-wall-avatar",
        src: e.characterAvatar,
        alt: ""
      }, null, 8, of)) : (v(), g("span", uf)), s("div", df, [e.generation.thinking ? (v(), g("details", cf, [u[3] || (u[3] = s("summary", null, "思考中", -1)), s("div", null, m(e.generation.thinking), 1)])) : F("", !0), s("div", ff, [ye(m(e.generation.text || (e.generation.status === "error" ? e.generation.message : "等待回应...")) + " ", 1), e.generation.unsaved ? (v(), g("small", vf, "未保存")) : F("", !0)])])])) : F("", !0)
    ], 512));
  }
}), mf = pf, gf = {
  class: "fourth-wall-modal",
  role: "dialog",
  "aria-modal": "true",
  "aria-label": "四次元壁提示词"
}, hf = { class: "fourth-wall-prompt-fields" }, bf = /* @__PURE__ */ ie({
  __name: "FourthWallPromptEditor",
  props: { templates: {} },
  emits: [
    "close",
    "save",
    "restore"
  ],
  setup(e, { emit: t }) {
    const n = e, a = t, l = /* @__PURE__ */ kt(structuredClone(/* @__PURE__ */ te(n.templates)));
    function i() {
      a("save", structuredClone(/* @__PURE__ */ te(l)));
    }
    return (r, o) => (v(), g("div", {
      class: "fourth-wall-modal-backdrop",
      onClick: o[6] || (o[6] = dt((u) => a("close"), ["self"]))
    }, [s("section", gf, [
      s("header", null, [o[7] || (o[7] = s("strong", null, "提示词模板", -1)), s("button", {
        type: "button",
        onClick: o[0] || (o[0] = (u) => a("close"))
      }, "关闭")]),
      s("div", hf, [
        s("label", null, [o[8] || (o[8] = ye("Top User", -1)), Ae(s("textarea", {
          "onUpdate:modelValue": o[1] || (o[1] = (u) => l.topuser = u),
          rows: "5"
        }, null, 512), [[He, l.topuser]])]),
        s("label", null, [o[9] || (o[9] = ye("Confirm", -1)), Ae(s("textarea", {
          "onUpdate:modelValue": o[2] || (o[2] = (u) => l.confirm = u),
          rows: "3"
        }, null, 512), [[He, l.confirm]])]),
        s("label", null, [o[10] || (o[10] = ye("Meta Protocol", -1)), Ae(s("textarea", {
          "onUpdate:modelValue": o[3] || (o[3] = (u) => l.metaProtocol = u),
          rows: "12"
        }, null, 512), [[He, l.metaProtocol]])]),
        s("label", null, [o[11] || (o[11] = ye("Bottom", -1)), Ae(s("textarea", {
          "onUpdate:modelValue": o[4] || (o[4] = (u) => l.bottom = u),
          rows: "5"
        }, null, 512), [[He, l.bottom]])])
      ]),
      s("footer", null, [s("button", {
        type: "button",
        class: "is-danger",
        onClick: o[5] || (o[5] = (u) => a("restore"))
      }, "恢复默认"), s("button", {
        type: "button",
        class: "is-primary",
        onClick: i
      }, "保存")])
    ])]));
  }
}), yf = bf, kf = { class: "fourth-wall-settings-section" }, _f = { class: "fourth-wall-session-row" }, $f = ["value", "disabled"], wf = ["value"], Cf = ["disabled"], Sf = ["disabled"], Af = ["disabled"], xf = /* @__PURE__ */ ie({
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
    const n = t;
    function a() {
      const r = window.prompt("新记录名称", "新记录")?.trim();
      r && n("add", r);
    }
    function l(r, o) {
      const u = window.prompt("重命名记录", o)?.trim();
      u && n("rename", r, u);
    }
    function i(r) {
      window.confirm("确定删除当前记录吗？") && n("delete", r);
    }
    return (r, o) => (v(), g("section", kf, [o[3] || (o[3] = s("h3", null, "聊天记录", -1)), s("div", _f, [
      s("select", {
        value: e.activeSessionId,
        disabled: e.disabled,
        onChange: o[0] || (o[0] = (u) => n("switch", u.target.value))
      }, [(v(!0), g(ae, null, me(e.sessions, (u) => (v(), g("option", {
        key: u.id,
        value: u.id
      }, m(u.name), 9, wf))), 128))], 40, $f),
      s("button", {
        type: "button",
        disabled: e.disabled,
        title: "新建记录",
        onClick: a
      }, "＋", 8, Cf),
      s("button", {
        type: "button",
        disabled: e.disabled,
        title: "重命名记录",
        onClick: o[1] || (o[1] = (u) => l(e.activeSessionId, e.sessions.find((c) => c.id === e.activeSessionId)?.name || ""))
      }, " 改 ", 8, Sf),
      s("button", {
        type: "button",
        disabled: e.disabled || e.sessions.length <= 1,
        title: "删除记录",
        class: "is-danger",
        onClick: o[2] || (o[2] = (u) => i(e.activeSessionId))
      }, " 删 ", 8, Af)
    ])]));
  }
}), If = xf, Ef = {
  class: "fourth-wall-settings",
  "aria-label": "四次元壁设置"
}, Tf = { class: "fourth-wall-settings-scroll" }, Mf = { class: "fourth-wall-settings-section" }, Df = { class: "is-toggle" }, Lf = { class: "is-toggle" }, Of = ["disabled"], Rf = { class: "fourth-wall-settings-section" }, Pf = { class: "is-toggle" }, Bf = { class: "is-toggle" }, Ff = { class: "is-toggle" }, Nf = { key: 0 }, Vf = ["disabled"], Hf = { class: "fourth-wall-settings-section is-actions" }, Uf = /* @__PURE__ */ ie({
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
    "openPrompts",
    "openAgent"
  ],
  setup(e, { emit: t }) {
    const n = e, a = t, l = /* @__PURE__ */ kt(structuredClone(/* @__PURE__ */ te(n.chat.settings))), i = /* @__PURE__ */ kt(structuredClone(/* @__PURE__ */ te(n.global)));
    function r() {
      a("updateChat", structuredClone(/* @__PURE__ */ te(l)));
    }
    function o() {
      a("updateGlobal", {
        image: structuredClone(/* @__PURE__ */ te(i.image)),
        voice: structuredClone(/* @__PURE__ */ te(i.voice)),
        commentary: structuredClone(/* @__PURE__ */ te(i.commentary))
      });
    }
    return (u, c) => (v(), g("aside", Ef, [s("header", null, [c[15] || (c[15] = s("strong", null, "四次元壁设置", -1)), s("button", {
      type: "button",
      onClick: c[0] || (c[0] = (d) => a("close"))
    }, "关闭")]), s("div", Tf, [
      $e(If, {
        sessions: e.chat.sessions,
        "active-session-id": e.chat.activeSessionId,
        disabled: e.busy,
        onSwitch: c[1] || (c[1] = (d) => a("switchSession", d)),
        onAdd: c[2] || (c[2] = (d) => a("addSession", d)),
        onRename: c[3] || (c[3] = (d, f) => a("renameSession", d, f)),
        onDelete: c[4] || (c[4] = (d) => a("deleteSession", d))
      }, null, 8, [
        "sessions",
        "active-session-id",
        "disabled"
      ]),
      s("section", Mf, [
        c[20] || (c[20] = s("h3", null, "上下文", -1)),
        s("label", null, [c[16] || (c[16] = ye("普通聊天层数", -1)), Ae(s("input", {
          "onUpdate:modelValue": c[5] || (c[5] = (d) => l.maxChatLayers = d),
          type: "number",
          min: "1",
          max: "9999"
        }, null, 512), [[
          He,
          l.maxChatLayers,
          void 0,
          { number: !0 }
        ]])]),
        s("label", null, [c[17] || (c[17] = ye("皮下聊天轮数", -1)), Ae(s("input", {
          "onUpdate:modelValue": c[6] || (c[6] = (d) => l.maxMetaTurns = d),
          type: "number",
          min: "1",
          max: "9999"
        }, null, 512), [[
          He,
          l.maxMetaTurns,
          void 0,
          { number: !0 }
        ]])]),
        s("label", Df, [c[18] || (c[18] = s("span", null, "流式生成", -1)), Ae(s("input", {
          "onUpdate:modelValue": c[7] || (c[7] = (d) => l.stream = d),
          type: "checkbox"
        }, null, 512), [[Qt, l.stream]])]),
        s("label", Lf, [c[19] || (c[19] = s("span", null, "禁用 Assistant Prefill", -1)), Ae(s("input", {
          "onUpdate:modelValue": c[8] || (c[8] = (d) => l.disableAssistantPrefill = d),
          type: "checkbox"
        }, null, 512), [[Qt, l.disableAssistantPrefill]])]),
        s("button", {
          type: "button",
          class: "is-primary",
          disabled: e.busy,
          onClick: r
        }, "保存上下文设置", 8, Of)
      ]),
      s("section", Rf, [
        c[24] || (c[24] = s("h3", null, "能力", -1)),
        s("label", Pf, [c[21] || (c[21] = s("span", null, "在提示词中允许图片", -1)), Ae(s("input", {
          "onUpdate:modelValue": c[9] || (c[9] = (d) => i.image.enablePrompt = d),
          type: "checkbox"
        }, null, 512), [[Qt, i.image.enablePrompt]])]),
        s("label", Bf, [c[22] || (c[22] = s("span", null, "在提示词中允许语音", -1)), Ae(s("input", {
          "onUpdate:modelValue": c[10] || (c[10] = (d) => i.voice.enabled = d),
          type: "checkbox"
        }, null, 512), [[Qt, i.voice.enabled]])]),
        s("label", Ff, [c[23] || (c[23] = s("span", null, "实时吐槽", -1)), Ae(s("input", {
          "onUpdate:modelValue": c[11] || (c[11] = (d) => i.commentary.enabled = d),
          type: "checkbox"
        }, null, 512), [[Qt, i.commentary.enabled]])]),
        i.commentary.enabled ? (v(), g("label", Nf, [ye(" 吐槽概率 " + m(i.commentary.probability) + "% ", 1), Ae(s("input", {
          "onUpdate:modelValue": c[12] || (c[12] = (d) => i.commentary.probability = d),
          type: "range",
          min: "1",
          max: "99"
        }, null, 512), [[
          He,
          i.commentary.probability,
          void 0,
          { number: !0 }
        ]])])) : F("", !0),
        s("button", {
          type: "button",
          class: "is-primary",
          disabled: e.busy,
          onClick: o
        }, "保存能力设置", 8, Vf)
      ]),
      s("section", Hf, [s("button", {
        type: "button",
        onClick: c[13] || (c[13] = (d) => a("openPrompts"))
      }, "提示词模板"), s("button", {
        type: "button",
        "aria-haspopup": "dialog",
        onClick: c[14] || (c[14] = (d) => a("openAgent"))
      }, "Agent API 配置")])
    ])]));
  }
}), Wf = Uf, Gf = { class: "fourth-wall-app" }, jf = { class: "fourth-wall-header" }, qf = { class: "fourth-wall-heading" }, Kf = { class: "fourth-wall-header-actions" }, zf = ["disabled"], Xf = ["disabled"], Jf = {
  key: 0,
  class: "fourth-wall-error",
  role: "alert"
}, Yf = { class: "fourth-wall-composer" }, Qf = ["disabled"], Zf = ["disabled"], ev = 35e3, tv = /* @__PURE__ */ ie({
  __name: "FourthWallApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const t = e, n = /* @__PURE__ */ q(structuredClone(/* @__PURE__ */ te(t.initialState))), a = /* @__PURE__ */ q(""), l = /* @__PURE__ */ q(!1), i = /* @__PURE__ */ q(!1), r = /* @__PURE__ */ q(!1), o = /* @__PURE__ */ q(""), u = /* @__PURE__ */ q(!1), c = /* @__PURE__ */ q({
      status: "idle",
      sessionId: "",
      text: "",
      thinking: "",
      message: "",
      unsaved: !1
    });
    let d = () => {
    };
    const f = Z(() => n.value.chat.sessions.find((_) => _.id === n.value.chat.activeSessionId)), y = Z(() => c.value.status === "started" || c.value.status === "progress");
    function b(_ = f.value.id) {
      return {
        chatIdentity: n.value.chatIdentity,
        sessionId: _
      };
    }
    function R(_) {
      return structuredClone(_.result);
    }
    async function L(_, S) {
      r.value = !0, o.value = "";
      try {
        n.value = R(await t.bridge.request(_, S, ev));
      } catch (W) {
        o.value = W instanceof Error ? W.message : String(W);
      } finally {
        r.value = !1;
      }
    }
    async function Q() {
      const _ = a.value.trim();
      !_ || y.value || r.value || (a.value = "", c.value = {
        status: "started",
        sessionId: f.value.id,
        text: "",
        thinking: "",
        message: "",
        unsaved: !1
      }, await L("fourth-wall/send", {
        ...b(),
        content: _
      }), o.value && (c.value.status = "idle"));
    }
    async function z() {
      y.value || r.value || (c.value = {
        status: "started",
        sessionId: f.value.id,
        text: "",
        thinking: "",
        message: "",
        unsaved: !1
      }, await L("fourth-wall/regenerate", b()), o.value && (c.value.status = "idle"));
    }
    function j() {
      t.bridge.post("fourth-wall/cancel", b());
    }
    function X(_) {
      _.key !== "Enter" || _.shiftKey || u.value || (_.preventDefault(), y.value ? j() : Q());
    }
    function $(_) {
      window.confirm("确定删除这条消息吗？") && L("fourth-wall/delete-message", {
        ...b(),
        messageIndex: _
      });
    }
    function w() {
      window.confirm("确定清空当前记录吗？") && L("fourth-wall/clear-history", b());
    }
    function E(_) {
      L("fourth-wall/update-chat-settings", {
        ...b(),
        patch: _
      });
    }
    function A(_) {
      L("fourth-wall/update-global-settings", {
        ...b(),
        patch: _
      });
    }
    async function C() {
      o.value = "";
      try {
        await t.bridge.request("fourth-wall/open-agent-settings", b());
      } catch (_) {
        o.value = _ instanceof Error ? _.message : String(_);
      }
    }
    return mt(() => {
      d = t.bridge.subscribe((_) => {
        if (_.type === "fourth-wall/state" && (n.value = structuredClone(_.payload.state)), _.type !== "fourth-wall/generation") return;
        const S = _.payload;
        if (!(S.sessionId && S.sessionId !== f.value.id)) {
          if (S.status === "complete" || S.status === "cancelled") {
            c.value = {
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
            o.value = S.message || "生成失败", c.value = S.kind === "save" && (S.draft?.text || S.draft?.thinking) ? {
              status: "error",
              sessionId: S.sessionId || f.value.id,
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
          c.value = {
            status: S.status || "progress",
            sessionId: S.sessionId || f.value.id,
            text: S.text || c.value.text,
            thinking: S.thinking || c.value.thinking,
            message: "",
            unsaved: !1
          };
        }
      });
    }), gt(() => d()), (_, S) => (v(), g("main", Gf, [
      s("header", jf, [s("div", qf, [S[17] || (S[17] = s("span", null, "IV", -1)), s("div", null, [S[16] || (S[16] = s("strong", null, "四次元壁", -1)), s("small", null, m(f.value.name), 1)])]), s("div", Kf, [
        s("button", {
          type: "button",
          title: "重答",
          disabled: r.value || y.value,
          onClick: z
        }, "↻", 8, zf),
        s("button", {
          type: "button",
          title: "清空当前记录",
          "aria-label": "清空当前记录",
          disabled: r.value,
          onClick: w
        }, [...S[18] || (S[18] = [s("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [s("path", { d: "M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7m4 4v5m4-5v5" })], -1)])], 8, Xf),
        s("button", {
          type: "button",
          title: "设置",
          onClick: S[0] || (S[0] = (W) => l.value = !0)
        }, "⚙")
      ])]),
      o.value ? (v(), g("div", Jf, [s("span", null, m(o.value), 1), s("button", {
        type: "button",
        onClick: S[1] || (S[1] = (W) => o.value = "")
      }, "×")])) : F("", !0),
      $e(mf, {
        history: f.value.history,
        "session-id": f.value.id,
        "chat-identity": n.value.chatIdentity,
        "user-avatar": n.value.userAvatar,
        "character-avatar": n.value.characterAvatar,
        "image-available": n.value.capabilities.image.available,
        "voice-available": n.value.capabilities.voice.available,
        generation: c.value,
        bridge: e.bridge,
        onEdit: S[2] || (S[2] = (W, H) => L("fourth-wall/edit-message", {
          ...b(),
          messageIndex: W,
          content: H
        })),
        onDelete: $
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
      s("footer", Yf, [Ae(s("textarea", {
        "onUpdate:modelValue": S[3] || (S[3] = (W) => a.value = W),
        rows: "1",
        placeholder: "聊点什么...",
        disabled: r.value,
        onCompositionstart: S[4] || (S[4] = (W) => u.value = !0),
        onCompositionend: S[5] || (S[5] = (W) => u.value = !1),
        onKeydown: X
      }, null, 40, Qf), [[He, a.value]]), s("button", {
        type: "button",
        class: se({ "is-stop": y.value }),
        disabled: r.value,
        onClick: S[6] || (S[6] = (W) => y.value ? j() : Q())
      }, m(y.value ? "■" : "↑"), 11, Zf)]),
      l.value ? (v(), pe(Wf, {
        key: 1,
        chat: n.value.chat,
        global: n.value.global,
        busy: r.value || y.value,
        onClose: S[7] || (S[7] = (W) => l.value = !1),
        onUpdateChat: E,
        onUpdateGlobal: A,
        onSwitchSession: S[8] || (S[8] = (W) => L("fourth-wall/switch-session", {
          ...b(),
          targetSessionId: W
        })),
        onAddSession: S[9] || (S[9] = (W) => L("fourth-wall/add-session", {
          ...b(),
          name: W
        })),
        onRenameSession: S[10] || (S[10] = (W, H) => L("fourth-wall/rename-session", {
          ...b(W),
          name: H
        })),
        onDeleteSession: S[11] || (S[11] = (W) => L("fourth-wall/delete-session", b(W))),
        onOpenPrompts: S[12] || (S[12] = (W) => i.value = !0),
        onOpenAgent: C
      }, null, 8, [
        "chat",
        "global",
        "busy"
      ])) : F("", !0),
      i.value ? (v(), pe(yf, {
        key: 2,
        templates: n.value.global.promptTemplates,
        onClose: S[13] || (S[13] = (W) => i.value = !1),
        onSave: S[14] || (S[14] = (W) => {
          A({ promptTemplates: W }), i.value = !1;
        }),
        onRestore: S[15] || (S[15] = () => {
          L("fourth-wall/restore-prompts", b()), i.value = !1;
        })
      }, null, 8, ["templates"])) : F("", !0)
    ]));
  }
}), nv = tv, av = Object.freeze({
  id: "shop",
  name: "奇物商店",
  accent: "#a83b32"
}), lv = ["aria-labelledby"], sv = ["id"], iv = { class: "shop-dialog-item" }, rv = { "aria-hidden": "true" }, ov = [
  "onUpdate:modelValue",
  "maxlength",
  "placeholder"
], uv = {
  key: 0,
  class: "shop-dialog-error",
  role: "alert"
}, dv = { class: "shop-dialog-actions" }, cv = ["disabled"], fv = ["disabled"], vv = /* @__PURE__ */ ie({
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
    const n = e, a = t, l = /* @__PURE__ */ kt({}), i = Z(() => n.mode === "purchase" ? "确认购入" : n.mode === "deactivate" ? "关闭效果" : "确认使用"), r = Z(() => n.mode === "purchase" ? `将支付 ${n.item.price} 小白币，奇物会先放入背包。` : n.mode === "deactivate" ? "关闭后将从下一次回复起停止影响剧情，已经发生的事实不会消失。" : n.item.duration === "permanent" ? "这件奇物将永久影响后续剧情，使用后无法关闭。" : `使用后从下一次回复起${n.item.durationLabel}。`), o = Z(() => n.mode !== "use" || n.item.inputs.every((c) => String(l[c.key] || "").trim().length > 0));
    function u() {
      !n.busy && o.value && a("confirm", { ...l });
    }
    return (c, d) => (v(), g("dialog", {
      open: "",
      class: "shop-dialog",
      "aria-labelledby": `shop-dialog-${e.mode}`,
      onClick: d[1] || (d[1] = dt((f) => !e.busy && c.$emit("cancel"), ["self"])),
      onKeydown: d[2] || (d[2] = Xs(dt((f) => !e.busy && c.$emit("cancel"), ["stop", "prevent"]), ["esc"]))
    }, [s("form", {
      method: "dialog",
      class: "shop-dialog-card",
      onSubmit: dt(u, ["prevent"])
    }, [
      d[3] || (d[3] = s("span", { class: "shop-dialog-kicker" }, "SEALED DECISION", -1)),
      s("h2", { id: `shop-dialog-${e.mode}` }, m(i.value), 9, sv),
      s("div", iv, [s("span", rv, m(e.item.name.slice(0, 1)), 1), s("div", null, [s("strong", null, m(e.item.name), 1), s("small", null, m(e.item.durationLabel), 1)])]),
      (v(!0), g(ae, null, me(e.mode === "use" ? e.item.inputs : [], (f) => (v(), g("label", {
        key: f.key,
        class: "shop-dialog-field"
      }, [s("span", null, m(f.label), 1), Ae(s("input", {
        "onUpdate:modelValue": (y) => l[f.key] = y,
        type: "text",
        maxlength: f.maxLength,
        placeholder: f.placeholder,
        autocomplete: "off",
        required: ""
      }, null, 8, ov), [[He, l[f.key]]])]))), 128)),
      s("p", { class: se(["shop-dialog-warning", { "is-permanent": e.mode === "use" && e.item.duration === "permanent" }]) }, m(r.value), 3),
      e.error ? (v(), g("p", uv, m(e.error), 1)) : F("", !0),
      s("div", dv, [s("button", {
        type: "button",
        disabled: e.busy,
        onClick: d[0] || (d[0] = (f) => c.$emit("cancel"))
      }, "再想想", 8, cv), s("button", {
        type: "submit",
        class: "is-primary",
        disabled: e.busy || !o.value
      }, m(e.busy ? "正在封存…" : e.mode === "purchase" ? "确认支付" : e.mode === "deactivate" ? "确认关闭" : "确认使用"), 9, fv)])
    ], 32)], 40, lv));
  }
}), pv = vv, mv = {
  class: "shop-inventory",
  "aria-labelledby": "shop-inventory-title"
}, gv = { class: "shop-section-heading" }, hv = {
  key: 0,
  class: "shop-write-reason",
  role: "status"
}, bv = {
  class: "shop-inventory-group",
  "aria-labelledby": "shop-active-title"
}, yv = {
  key: 0,
  class: "shop-activation-list"
}, kv = {
  class: "shop-mini-mark",
  "aria-hidden": "true"
}, _v = [
  "disabled",
  "title",
  "onClick"
], $v = {
  key: 1,
  class: "shop-empty-copy"
}, wv = {
  class: "shop-inventory-group",
  "aria-labelledby": "shop-held-title"
}, Cv = {
  key: 0,
  class: "shop-held-grid"
}, Sv = {
  class: "shop-mini-mark",
  "aria-hidden": "true"
}, Av = [
  "disabled",
  "title",
  "onClick"
], xv = {
  key: 1,
  class: "shop-empty-copy"
}, Iv = {
  key: 1,
  class: "shop-inventory-group is-exhausted"
}, Ev = ["aria-expanded"], Tv = {
  key: 0,
  class: "shop-exhausted-list"
}, Mv = { key: 0 }, Dv = /* @__PURE__ */ ie({
  __name: "ShopInventory",
  props: {
    catalog: {},
    activations: {},
    writeDisabledReason: {}
  },
  emits: ["use", "deactivate"],
  setup(e) {
    const t = e, n = /* @__PURE__ */ q(!1), a = Z(() => t.activations.filter((o) => o.state === "active")), l = Z(() => t.catalog.filter((o) => o.quantity > 0)), i = Z(() => t.catalog.filter((o) => o.purchasedCount > 0 && o.quantity === 0)), r = Z(() => {
      const o = /* @__PURE__ */ new Map();
      for (const u of t.activations) u.state !== "active" && o.set(u.itemId, (o.get(u.itemId) || 0) + 1);
      return o;
    });
    return (o, u) => (v(), g("section", mv, [
      s("header", gv, [u[1] || (u[1] = s("div", null, [s("span", null, "PRIVATE COLLECTION"), s("h2", { id: "shop-inventory-title" }, "我的奇物")], -1)), s("small", null, m(l.value.reduce((c, d) => c + d.quantity, 0)) + " 件可用", 1)]),
      e.writeDisabledReason ? (v(), g("p", hv, m(e.writeDisabledReason), 1)) : F("", !0),
      s("section", bv, [s("header", null, [u[2] || (u[2] = s("h3", { id: "shop-active-title" }, "生效中", -1)), s("span", null, m(a.value.length), 1)]), a.value.length ? (v(), g("div", yv, [(v(!0), g(ae, null, me(a.value, (c) => (v(), g("article", {
        key: c.activationId,
        class: "shop-activation-card"
      }, [
        s("div", kv, m(c.name.slice(0, 1)), 1),
        s("div", null, [
          s("h4", null, m(c.name), 1),
          (v(!0), g(ae, null, me(c.parameters, (d) => (v(), g("p", { key: d.label }, [s("span", null, m(d.label), 1), ye(m(d.value), 1)]))), 128)),
          s("small", null, m(c.stateLabel), 1)
        ]),
        c.canDeactivate ? (v(), g("button", {
          key: 0,
          type: "button",
          disabled: !!e.writeDisabledReason,
          title: e.writeDisabledReason,
          onClick: (d) => o.$emit("deactivate", c)
        }, " 关闭 ", 8, _v)) : F("", !0)
      ]))), 128))])) : (v(), g("p", $v, "尚无正在影响剧情的奇物。"))]),
      s("section", wv, [s("header", null, [u[3] || (u[3] = s("h3", { id: "shop-held-title" }, "持有", -1)), s("span", null, m(l.value.length), 1)]), l.value.length ? (v(), g("div", Cv, [(v(!0), g(ae, null, me(l.value, (c) => (v(), g("article", {
        key: c.id,
        class: "shop-held-card"
      }, [
        s("div", Sv, m(c.name.slice(0, 1)), 1),
        s("div", null, [s("h4", null, m(c.name), 1), s("p", null, m(c.durationLabel), 1)]),
        s("strong", null, "×" + m(c.quantity), 1),
        s("button", {
          type: "button",
          disabled: !!e.writeDisabledReason,
          title: e.writeDisabledReason,
          onClick: (d) => o.$emit("use", c)
        }, " 使用 ", 8, Av)
      ]))), 128))])) : (v(), g("p", xv, "背包还是空的，去货架挑一件吧。"))]),
      i.value.length ? (v(), g("section", Iv, [s("button", {
        type: "button",
        class: "shop-collapse-button",
        "aria-expanded": n.value,
        onClick: u[0] || (u[0] = (c) => n.value = !n.value)
      }, [
        u[4] || (u[4] = s("span", null, "已耗尽", -1)),
        s("small", null, m(i.value.length), 1),
        u[5] || (u[5] = s("i", { "aria-hidden": "true" }, "⌄", -1))
      ], 8, Ev), n.value ? (v(), g("div", Tv, [(v(!0), g(ae, null, me(i.value, (c) => (v(), g("article", { key: c.id }, [s("span", null, m(c.name), 1), s("small", null, [ye("购入 " + m(c.purchasedCount) + " 次", 1), r.value.get(c.id) ? (v(), g("span", Mv, " · 已结束 " + m(r.value.get(c.id)), 1)) : F("", !0)])]))), 128))])) : F("", !0)])) : F("", !0)
    ]));
  }
}), Lv = Dv, Ov = {
  class: "shop-shelf",
  "aria-labelledby": "shop-shelf-title"
}, Rv = { class: "shop-section-heading" }, Pv = {
  class: "shop-category-strip",
  "aria-label": "商品分类"
}, Bv = ["onClick"], Fv = { class: "shop-product-grid" }, Nv = {
  class: "shop-product-mark",
  "aria-hidden": "true"
}, Vv = { class: "shop-product-copy" }, Hv = { class: "shop-product-title" }, Uv = { class: "shop-product-footer" }, Wv = { key: 0 }, Gv = [
  "disabled",
  "title",
  "onClick"
], jv = {
  key: 0,
  class: "shop-card-reason"
}, qv = /* @__PURE__ */ ie({
  __name: "ShopShelf",
  props: {
    catalog: {},
    balance: {},
    writeDisabledReason: {}
  },
  emits: ["purchase"],
  setup(e) {
    const t = e, n = /* @__PURE__ */ q("all"), a = Z(() => {
      const r = /* @__PURE__ */ new Map();
      for (const o of t.catalog) r.set(o.category, o.categoryLabel);
      return [{
        id: "all",
        label: "全部"
      }, ...Array.from(r, ([o, u]) => ({
        id: o,
        label: u
      }))];
    }), l = Z(() => n.value === "all" ? t.catalog : t.catalog.filter((r) => r.category === n.value));
    function i(r) {
      return t.writeDisabledReason ? t.writeDisabledReason : r.purchaseLimit !== null && r.purchasedCount >= r.purchaseLimit ? "此奇物已达购买上限" : t.balance < r.price ? `还差 ${r.price - t.balance} 小白币` : "";
    }
    return (r, o) => (v(), g("section", Ov, [
      s("header", Rv, [o[0] || (o[0] = s("div", null, [s("span", null, "CURIO CABINET"), s("h2", { id: "shop-shelf-title" }, "今日陈列")], -1)), s("small", null, m(l.value.length) + " 件奇物", 1)]),
      s("nav", Pv, [(v(!0), g(ae, null, me(a.value, (u) => (v(), g("button", {
        key: u.id,
        type: "button",
        class: se({ "is-active": n.value === u.id }),
        onClick: (c) => n.value = u.id
      }, m(u.label), 11, Bv))), 128))]),
      s("div", Fv, [(v(!0), g(ae, null, me(l.value, (u) => (v(), g("article", {
        key: u.id,
        class: "shop-product-card"
      }, [s("div", Nv, m(u.name.slice(0, 1)), 1), s("div", Vv, [
        s("div", Hv, [s("h3", null, m(u.name), 1), s("span", null, m(u.categoryLabel), 1)]),
        s("p", null, m(u.description), 1),
        s("small", null, m(u.durationLabel), 1),
        s("div", Uv, [
          s("strong", null, [o[1] || (o[1] = s("i", null, "¤", -1)), ye(m(u.price), 1)]),
          u.quantity ? (v(), g("span", Wv, "持有 " + m(u.quantity), 1)) : F("", !0),
          s("button", {
            type: "button",
            disabled: !!i(u),
            title: i(u),
            onClick: (c) => r.$emit("purchase", u)
          }, m(u.purchaseLimit !== null && u.purchasedCount >= u.purchaseLimit ? "已购得" : "购入"), 9, Gv)
        ]),
        i(u) ? (v(), g("p", jv, m(i(u)), 1)) : F("", !0)
      ])]))), 128))])
    ]));
  }
}), Kv = qv, zv = { class: "shop-app" }, Xv = { class: "shop-header" }, Jv = {
  class: "shop-balance",
  "aria-label": "小白币余额"
}, Yv = ["disabled"], Qv = {
  class: "shop-root-tabs",
  "aria-label": "商店页面"
}, Zv = { key: 0 }, ep = ["disabled"], tp = ["disabled"], np = { class: "shop-scroll" }, pa = 35e3, ap = /* @__PURE__ */ ie({
  __name: "ShopApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const t = e, n = /* @__PURE__ */ q(structuredClone(/* @__PURE__ */ te(t.initialState))), a = /* @__PURE__ */ q("shelf"), l = /* @__PURE__ */ q(null), i = /* @__PURE__ */ q(!1), r = /* @__PURE__ */ q(!1), o = /* @__PURE__ */ q(""), u = /* @__PURE__ */ q("");
    let c = () => {
    }, d = 0;
    const f = Z(() => n.value.status === "unconfirmed"), y = Z(() => r.value ? "正在处理上一项操作" : i.value ? "正在刷新商店状态" : n.value.status !== "ready" ? n.value.message || "商店暂时不可写入" : n.value.generationActive ? "主剧情正在生成，请等待回复完成" : ""), b = Z(() => i.value || r.value || f.value);
    function R() {
      return typeof crypto.randomUUID == "function" ? `shop-ui:${crypto.randomUUID()}` : `shop-ui:${Date.now()}:${Math.random().toString(36).slice(2, 10)}`;
    }
    function L() {
      return { chatIdentity: n.value.chatIdentity };
    }
    function Q(A) {
      n.value = structuredClone(A), i.value = !1, o.value = "";
    }
    function z(A) {
      const C = A instanceof Error ? A.message : String(A);
      return C.includes("cannot be overdrawn") ? "小白币余额不足，未完成购买。" : C.includes("shop_main_generation_active") ? "主剧情正在生成，请等待回复完成。" : C.includes("shop_revision_conflict") || C.includes("shop_event_id_conflict") ? "商店状态已变化，请关闭确认框后重试。" : C === "host_request_timeout" ? "等待保存结果超时，请使用同一确认框重试。" : C;
    }
    async function j() {
      if (b.value) return;
      const A = ++d;
      i.value = !0, o.value = "";
      try {
        const C = await t.bridge.request("shop/refresh", L(), pa);
        A === d && Q(C.result);
      } catch (C) {
        A === d && (o.value = z(C));
      } finally {
        A === d && (i.value = !1);
      }
    }
    async function X() {
      if (i.value || r.value) return;
      const A = ++d;
      i.value = !0, o.value = "";
      try {
        const C = await t.bridge.request("shop/confirm-save", L(), pa);
        A === d && Q(C.result.state);
      } catch (C) {
        A === d && (o.value = z(C));
      } finally {
        A === d && (i.value = !1);
      }
    }
    function $(A, C, _) {
      y.value || (u.value = "", l.value = {
        mode: A,
        item: C,
        activation: _,
        actionId: R()
      });
    }
    function w() {
      r.value || (l.value = null, u.value = "");
    }
    async function E(A) {
      const C = l.value;
      if (!C || r.value) return;
      r.value = !0, u.value = "";
      const _ = d, S = C.mode === "purchase" ? "shop/purchase" : C.mode === "use" ? "shop/activate" : "shop/deactivate";
      try {
        const W = await t.bridge.request(S, {
          ...L(),
          expectedRevision: n.value.revision,
          expectedEventId: n.value.eventId,
          actionId: C.actionId,
          itemId: C.item.id,
          ...C.mode === "use" ? { parameters: A } : {},
          ...C.activation ? { activationId: C.activation.activationId } : {}
        }, pa);
        if (_ !== d || l.value !== C) return;
        Q(W.result), l.value = null;
      } catch (W) {
        _ === d && l.value === C && (u.value = z(W));
      } finally {
        _ === d && (r.value = !1);
      }
    }
    return mt(() => {
      c = t.bridge.subscribe((A) => {
        A.type === "shop/state" && (r.value || (d += 1), Q(A.payload.state)), A.type === "shop/error" && (o.value = String(A.payload?.message || "商店暂时无法读取"));
      });
    }), gt(() => {
      d += 1, c(), l.value = null;
    }), (A, C) => (v(), g("main", zv, [
      s("header", Xv, [
        C[7] || (C[7] = s("div", null, [s("span", { class: "shop-header-kicker" }, "VERMILION CABINET"), s("h1", null, "奇物商店")], -1)),
        s("div", Jv, [C[5] || (C[5] = s("small", null, "余额", -1)), s("strong", null, "¤ " + m(n.value.balance), 1)]),
        s("button", {
          type: "button",
          class: "shop-refresh",
          disabled: b.value,
          title: "重新读取商店",
          onClick: j
        }, [...C[6] || (C[6] = [s("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [s("path", { d: "M20 7v5h-5M4 17v-5h5M18.2 9A7 7 0 0 0 6.1 6.7L4 9m16 6-2.1 2.3A7 7 0 0 1 5.8 15" })], -1), s("span", { class: "shop-sr-only" }, "重新读取商店", -1)])], 8, Yv)
      ]),
      s("nav", Qv, [s("button", {
        type: "button",
        class: se({ "is-active": a.value === "shelf" }),
        onClick: C[0] || (C[0] = (_) => a.value = "shelf")
      }, "货架", 2), s("button", {
        type: "button",
        class: se({ "is-active": a.value === "inventory" }),
        onClick: C[1] || (C[1] = (_) => a.value = "inventory")
      }, [C[8] || (C[8] = ye(" 背包", -1)), n.value.catalog.some((_) => _.quantity) ? (v(), g("span", Zv, m(n.value.catalog.reduce((_, S) => _ + S.quantity, 0)), 1)) : F("", !0)], 2)]),
      n.value.message || o.value ? (v(), g("aside", {
        key: 0,
        class: se(["shop-notice", `is-${n.value.status}`]),
        role: "status"
      }, [C[9] || (C[9] = s("span", { "aria-hidden": "true" }, "印", -1)), s("div", null, [
        s("strong", null, m(n.value.status === "unconfirmed" ? "保存待核实" : n.value.status === "conflict" ? "状态冲突" : "商店状态"), 1),
        s("p", null, m(o.value || n.value.message), 1),
        f.value ? (v(), g("button", {
          key: 0,
          type: "button",
          disabled: i.value,
          onClick: X
        }, m(i.value ? "正在核实…" : "核实保存结果"), 9, ep)) : n.value.status === "blocked" ? (v(), g("button", {
          key: 1,
          type: "button",
          disabled: i.value,
          onClick: j
        }, m(i.value ? "正在读取…" : "重新读取"), 9, tp)) : F("", !0)
      ])], 2)) : F("", !0),
      s("div", np, [a.value === "shelf" ? (v(), pe(Kv, {
        key: 0,
        catalog: n.value.catalog,
        balance: n.value.balance,
        "write-disabled-reason": y.value,
        onPurchase: C[2] || (C[2] = (_) => $("purchase", _))
      }, null, 8, [
        "catalog",
        "balance",
        "write-disabled-reason"
      ])) : (v(), pe(Lv, {
        key: 1,
        catalog: n.value.catalog,
        activations: n.value.activations,
        "write-disabled-reason": y.value,
        onUse: C[3] || (C[3] = (_) => $("use", _)),
        onDeactivate: C[4] || (C[4] = (_) => {
          const S = n.value.catalog.find((W) => W.id === _.itemId);
          S && $("deactivate", S, _);
        })
      }, null, 8, [
        "catalog",
        "activations",
        "write-disabled-reason"
      ]))]),
      l.value ? (v(), pe(pv, {
        key: 1,
        mode: l.value.mode,
        item: l.value.item,
        activation: l.value.activation,
        busy: r.value,
        error: u.value,
        onCancel: w,
        onConfirm: E
      }, null, 8, [
        "mode",
        "item",
        "activation",
        "busy",
        "error"
      ])) : F("", !0)
    ]));
  }
}), lp = ap, sp = Object.freeze({
  id: "wallet",
  name: "钱包",
  accent: "#a9660f"
}), ip = { class: "wallet-ui-header" }, rp = { class: "wallet-ui-header-copy" }, op = {
  key: 0,
  class: "wallet-ui-kicker"
}, up = { class: "wallet-ui-title" }, dp = {
  key: 0,
  class: "wallet-ui-header-actions"
}, cp = /* @__PURE__ */ ie({
  __name: "WalletAppHeader",
  props: {
    kicker: {},
    title: {}
  },
  setup(e) {
    return (t, n) => (v(), g("header", ip, [s("div", rp, [e.kicker ? (v(), g("span", op, m(e.kicker), 1)) : F("", !0), s("h1", up, m(e.title), 1)]), t.$slots.actions ? (v(), g("div", dp, [vn(t.$slots, "actions")])) : F("", !0)]));
  }
}), fp = cp, vp = {
  class: "wallet-balance wallet-ui-rise",
  "aria-labelledby": "wallet-balance-title"
}, pp = { class: "wallet-balance-chip" }, mp = ["aria-label"], gp = /* @__PURE__ */ ie({
  __name: "WalletBalanceCard",
  props: {
    balance: {},
    currency: {},
    status: {}
  },
  setup(e) {
    const t = e, n = Z(() => Number(t.balance).toLocaleString("zh-CN")), a = Z(() => ({
      ready: "账目已核",
      reconciling: "剧情核对中",
      saving: "保存确认中",
      unconfirmed: "保存待核实",
      conflict: "账目已冻结",
      blocked: "账目已暂停"
    })[t.status]);
    return (l, i) => (v(), g("section", vp, [
      s("header", null, [i[0] || (i[0] = s("p", { id: "wallet-balance-title" }, "当前结余", -1)), s("span", pp, [s("i", {
        class: se(`is-${e.status}`),
        "aria-hidden": "true"
      }, null, 2), ye(m(a.value), 1)])]),
      s("div", {
        class: "wallet-balance-value",
        "aria-label": `${n.value} ${e.currency}`
      }, [i[1] || (i[1] = s("span", { "aria-hidden": "true" }, "¤", -1)), ye(m(n.value), 1)], 8, mp),
      s("footer", null, m(e.currency), 1)
    ]));
  }
}), hp = gp, bp = [
  "title",
  "aria-label",
  "disabled"
], yp = /* @__PURE__ */ ie({
  __name: "WalletIconButton",
  props: {
    label: {},
    disabled: { type: Boolean },
    busy: { type: Boolean }
  },
  emits: ["activate"],
  setup(e) {
    return (t, n) => (v(), g("button", {
      type: "button",
      class: se(["wallet-ui-icon-button", { "is-busy": e.busy }]),
      title: e.label,
      "aria-label": e.label,
      disabled: e.disabled,
      onClick: n[0] || (n[0] = (a) => t.$emit("activate"))
    }, [vn(t.$slots, "default")], 10, bp));
  }
}), kp = yp, _p = {
  class: "wallet-ui-notice-icon",
  "aria-hidden": "true"
}, $p = { class: "wallet-ui-notice-copy" }, wp = { key: 0 }, Cp = /* @__PURE__ */ ie({
  __name: "WalletNotice",
  props: {
    title: {},
    message: { default: "" },
    tone: { default: "info" }
  },
  setup(e) {
    return (t, n) => (v(), g("aside", {
      class: se(["wallet-ui-notice", `is-${e.tone}`]),
      role: "status"
    }, [s("span", _p, [vn(t.$slots, "icon", {}, () => [n[0] || (n[0] = ye("!", -1))])]), s("div", $p, [
      s("strong", null, m(e.title), 1),
      e.message ? (v(), g("p", wp, m(e.message), 1)) : F("", !0),
      vn(t.$slots, "default")
    ])], 2));
  }
}), Sp = Cp, Ap = { class: "wallet-ui-empty" }, xp = {
  key: 0,
  class: "wallet-ui-empty-icon",
  "aria-hidden": "true"
}, Ip = { key: 1 }, Ep = /* @__PURE__ */ ie({
  __name: "WalletEmpty",
  props: {
    title: {},
    message: { default: "" }
  },
  setup(e) {
    return (t, n) => (v(), g("div", Ap, [
      t.$slots.icon ? (v(), g("span", xp, [vn(t.$slots, "icon")])) : F("", !0),
      s("strong", null, m(e.title), 1),
      e.message ? (v(), g("p", Ip, m(e.message), 1)) : F("", !0)
    ]));
  }
}), Tp = Ep, Mp = {
  class: "wallet-row-mark",
  "aria-hidden": "true"
}, Dp = { viewBox: "0 0 24 24" }, Lp = ["d"], Op = { class: "wallet-row-copy" }, Rp = { key: 0 }, Pp = { class: "wallet-row-amount" }, Bp = /* @__PURE__ */ ie({
  __name: "WalletTransactionRow",
  props: { transaction: {} },
  setup(e) {
    const t = {
      income: "M12 5v14m0 0-5.5-5.5M12 19l5.5-5.5",
      expense: "M12 19V5m0 0L6.5 10.5M12 5l5.5 5.5",
      transfer: "M4 9h16m0 0-4-4m4 4-4 4M20 15H4m0 0 4 4m-4-4 4-4"
    }, n = e, a = Z(() => t[n.transaction.direction] || t.transfer), l = Z(() => {
      const r = n.transaction.amount.toLocaleString("zh-CN");
      return n.transaction.direction === "income" ? `+${r}` : n.transaction.direction === "expense" ? `−${r}` : r;
    }), i = Z(() => {
      const r = new Date(n.transaction.createdAt), o = new Intl.DateTimeFormat("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: !1
      }).format(r);
      return n.transaction.anchorFloor < 0 ? `开户 · ${o}` : `第 ${n.transaction.anchorFloor} 楼 · ${o}`;
    });
    return (r, o) => (v(), g("li", { class: se(["wallet-row", `is-${e.transaction.direction}`]) }, [
      s("span", Mp, [(v(), g("svg", Dp, [s("path", { d: a.value }, null, 8, Lp)]))]),
      s("div", Op, [
        s("strong", null, m(e.transaction.title), 1),
        e.transaction.note ? (v(), g("p", Rp, m(e.transaction.note), 1)) : F("", !0),
        s("small", null, m(e.transaction.source) + " · " + m(i.value), 1)
      ]),
      s("span", Pp, m(l.value), 1)
    ], 2));
  }
}), Fp = Bp, Np = {
  key: 1,
  class: "wallet-ui-list"
}, Vp = {
  key: 2,
  class: "wallet-ledger-foot"
}, Hp = {
  key: 0,
  class: "wallet-load-error",
  role: "alert"
}, Up = ["disabled"], Wp = {
  key: 2,
  class: "wallet-ledger-end"
}, Gp = /* @__PURE__ */ ie({
  __name: "WalletTransactionList",
  props: {
    transactions: {},
    hasMore: { type: Boolean },
    loadingMore: { type: Boolean },
    error: {}
  },
  emits: ["loadMore"],
  setup(e) {
    return (t, n) => (v(), g("div", null, [e.transactions.length === 1 && e.transactions[0]?.anchorFloor === -1 ? (v(), pe(Tp, {
      key: 0,
      title: "新账簿已经启用",
      message: "除了开户赠礼，还没有其他收支。"
    }, {
      icon: Ft(() => [...n[1] || (n[1] = [s("svg", { viewBox: "0 0 24 24" }, [s("path", { d: "m5 12.5 4.5 4.5L19 7.5" })], -1)])]),
      _: 1
    })) : (v(), g("ol", Np, [(v(!0), g(ae, null, me(e.transactions, (a) => (v(), pe(Fp, {
      key: a.id,
      transaction: a
    }, null, 8, ["transaction"]))), 128))])), e.hasMore || e.transactions.length > 1 ? (v(), g("div", Vp, [e.error ? (v(), g("p", Hp, m(e.error), 1)) : F("", !0), e.hasMore ? (v(), g("button", {
      key: 1,
      type: "button",
      class: "wallet-ui-text-button",
      disabled: e.loadingMore,
      onClick: n[0] || (n[0] = (a) => t.$emit("loadMore"))
    }, m(e.loadingMore ? "正在翻阅…" : "翻阅更早账目"), 9, Up)) : (v(), g("span", Wp, "账簿至此"))])) : F("", !0)]));
  }
}), jp = Gp, qp = { class: "wallet-ui-app wallet-app" }, Kp = { class: "wallet-ui-scroll" }, zp = ["disabled"], Xp = ["disabled"], Jp = {
  class: "wallet-ledger",
  "aria-labelledby": "wallet-ledger-title"
}, Yp = { class: "wallet-ui-section-title" }, Qp = { class: "wallet-ui-card" }, Rl = 35e3, Zp = /* @__PURE__ */ ie({
  __name: "WalletApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const t = e, n = /* @__PURE__ */ q(structuredClone(/* @__PURE__ */ te(t.initialState))), a = /* @__PURE__ */ q(!1), l = /* @__PURE__ */ q(!1), i = /* @__PURE__ */ q(""), r = /* @__PURE__ */ q("");
    let o = () => {
    }, u = 0;
    const c = Z(() => n.value.status === "unconfirmed"), d = Z(() => a.value || n.value.status === "reconciling" || n.value.status === "saving"), f = Z(() => d.value || c.value || n.value.status === "conflict"), y = Z(() => !!(n.value.message || i.value)), b = Z(() => i.value || n.value.status === "conflict" || n.value.status === "blocked" ? "danger" : c.value ? "warning" : "info"), R = Z(() => n.value.status === "conflict" ? "账本发生冲突" : n.value.status === "blocked" ? "账本暂停" : "账本状态");
    function L() {
      return { chatIdentity: n.value.chatIdentity };
    }
    function Q($) {
      n.value = structuredClone($), a.value = !1, l.value = !1, i.value = "", r.value = "";
    }
    async function z() {
      if (d.value || c.value || n.value.status === "conflict") return;
      const $ = ++u;
      a.value = !0, i.value = "";
      try {
        const w = await t.bridge.request("wallet/refresh", L(), Rl);
        $ === u && Q(w.result);
      } catch (w) {
        $ === u && (i.value = w instanceof Error ? w.message : String(w));
      } finally {
        $ === u && (a.value = !1);
      }
    }
    async function j() {
      if (d.value) return;
      const $ = ++u;
      a.value = !0, i.value = "";
      try {
        const w = await t.bridge.request("wallet/confirm-save", L(), Rl);
        $ === u && Q(w.result.state);
      } catch (w) {
        $ === u && (i.value = w instanceof Error ? w.message : String(w));
      } finally {
        $ === u && (a.value = !1);
      }
    }
    async function X() {
      const $ = n.value.nextCursor;
      if (!$ || l.value) return;
      const w = u;
      l.value = !0, r.value = "";
      try {
        const E = await t.bridge.request("wallet/load-more", {
          ...L(),
          beforeSequence: $
        });
        if (w !== u) return;
        const A = new Set(n.value.transactions.map((C) => C.id));
        n.value.transactions.push(...E.result.transactions.filter((C) => !A.has(C.id))), n.value.nextCursor = E.result.nextCursor, n.value.hasMore = E.result.hasMore;
      } catch (E) {
        w === u && (r.value = E instanceof Error ? E.message : String(E));
      } finally {
        w === u && (l.value = !1);
      }
    }
    return mt(() => {
      o = t.bridge.subscribe(($) => {
        $.type === "wallet/state" && (u += 1, Q($.payload.state)), $.type === "wallet/error" && (i.value = String($.payload?.message || "钱包暂时无法读取"));
      });
    }), gt(() => {
      u += 1, o();
    }), ($, w) => (v(), g("main", qp, [$e(fp, {
      kicker: "Wallet",
      title: "钱包"
    }, {
      actions: Ft(() => [$e(kp, {
        label: "重新读取账本",
        disabled: f.value,
        busy: a.value,
        onActivate: z
      }, {
        default: Ft(() => [...w[0] || (w[0] = [s("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [s("path", { d: "M20 7v5h-5M4 17v-5h5M18.2 9A7 7 0 0 0 6.1 6.7L4 9m16 6-2.1 2.3A7 7 0 0 1 5.8 15" })], -1)])]),
        _: 1
      }, 8, ["disabled", "busy"])]),
      _: 1
    }), s("div", Kp, [
      $e(hp, {
        balance: n.value.balance,
        currency: n.value.currency,
        status: n.value.status
      }, null, 8, [
        "balance",
        "currency",
        "status"
      ]),
      y.value ? (v(), pe(Sp, {
        key: 0,
        class: "wallet-notice",
        tone: b.value,
        title: R.value,
        message: i.value || n.value.message
      }, {
        default: Ft(() => [c.value ? (v(), g("button", {
          key: 0,
          type: "button",
          class: "wallet-ui-text-button",
          disabled: a.value,
          onClick: j
        }, m(a.value ? "正在核实…" : "核实保存结果"), 9, zp)) : n.value.status === "blocked" ? (v(), g("button", {
          key: 1,
          type: "button",
          class: "wallet-ui-text-button",
          disabled: a.value,
          onClick: z
        }, m(a.value ? "正在读取…" : "重新读取"), 9, Xp)) : F("", !0)]),
        _: 1
      }, 8, [
        "tone",
        "title",
        "message"
      ])) : F("", !0),
      s("section", Jp, [s("div", Yp, [w[1] || (w[1] = s("h2", { id: "wallet-ledger-title" }, "流水明细", -1)), s("small", null, m(n.value.transactionCount) + " 笔", 1)]), s("div", Qp, [$e(jp, {
        transactions: n.value.transactions,
        "has-more": n.value.hasMore,
        "loading-more": l.value,
        error: r.value,
        onLoadMore: X
      }, null, 8, [
        "transactions",
        "has-more",
        "loading-more",
        "error"
      ])])])
    ])]));
  }
}), em = Zp, tm = Object.freeze([
  {
    ...Vc,
    iconPaths: ["M13 15h38v29H32l-12 9 3-9H13z", "M22 25h20M22 33h14"],
    component: nv
  },
  {
    ...sp,
    iconPaths: ["M12 19.5h37a5 5 0 0 1 5 5v24a5 5 0 0 1-5 5H15a5 5 0 0 1-5-5v-30a8 8 0 0 1 8-8h27", "M54 30H42a6 6 0 0 0 0 12h12M43 36h.1"],
    component: em
  },
  {
    ...av,
    iconPaths: ["M14 19h36l-3 35H17z", "M11 19h42M19 19V11h26v8M23 29h18M22 38h20M21 47h22"],
    component: lp
  },
  {
    ...To,
    iconPaths: ["M9 24h46L32 9z", "M14 52h36M18 24v28M28 24v28M38 24v28M48 24v28"],
    component: td
  },
  {
    ...nd,
    iconPaths: ["M15 12h34a6 6 0 0 1 6 6v28a6 6 0 0 1-6 6H15a6 6 0 0 1-6-6V18a6 6 0 0 1 6-6z", "M21 23h.1M43 23h.1M32 32h.1M21 41h.1M43 41h.1"],
    component: Nc
  }
]), nm = { class: "xiaobai-os-home" }, am = ["src"], lm = {
  class: "xiaobai-os-app-grid",
  "aria-label": "应用"
}, sm = ["onClick"], im = {
  class: "xiaobai-os-app-icon",
  "aria-hidden": "true"
}, rm = { viewBox: "0 0 64 64" }, om = ["d"], um = { class: "xiaobai-os-app-name" }, dm = /* @__PURE__ */ ie({
  __name: "XiaobaiOsHome",
  props: {
    apps: {},
    characterAvatar: {}
  },
  emits: ["openApp"],
  setup(e) {
    return (t, n) => (v(), g("main", nm, [
      e.characterAvatar ? (v(), g("img", {
        key: 0,
        class: "xiaobai-os-wallpaper",
        src: e.characterAvatar,
        alt: ""
      }, null, 8, am)) : F("", !0),
      n[0] || (n[0] = s("div", {
        class: "xiaobai-os-home-wash",
        "aria-hidden": "true"
      }, null, -1)),
      s("section", lm, [(v(!0), g(ae, null, me(e.apps, (a) => (v(), g("button", {
        key: a.id,
        type: "button",
        class: "xiaobai-os-app-tile",
        style: jt({ "--app-accent": a.accent }),
        onClick: (l) => t.$emit("openApp", a)
      }, [s("span", im, [(v(), g("svg", rm, [(v(!0), g(ae, null, me(a.iconPaths, (l) => (v(), g("path", {
        key: l,
        d: l
      }, null, 8, om))), 128))]))]), s("span", um, m(a.name), 1)], 12, sm))), 128))])
    ]));
  }
}), cm = dm, fm = ["disabled"], vm = {
  key: 0,
  "aria-hidden": "true"
}, pm = /* @__PURE__ */ ie({
  __name: "XiaobaiOsNavigation",
  props: { isHome: { type: Boolean } },
  emits: [
    "back",
    "home",
    "close"
  ],
  setup(e) {
    return (t, n) => (v(), g("nav", {
      class: se(["xiaobai-os-navigation", { "is-home": e.isHome }]),
      "aria-label": "系统导航"
    }, [
      s("button", {
        type: "button",
        class: "xiaobai-os-nav-button",
        disabled: e.isHome,
        "aria-label": "返回",
        onClick: n[0] || (n[0] = (a) => t.$emit("back"))
      }, [...n[3] || (n[3] = [s("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, [s("path", { d: "m14.5 6-6 6 6 6" })], -1)])], 8, fm),
      s("button", {
        type: "button",
        class: "xiaobai-os-nav-button xiaobai-os-home-button",
        "aria-label": "主页",
        onClick: n[1] || (n[1] = (a) => t.$emit("home"))
      }, [n[4] || (n[4] = s("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, [s("path", { d: "m4.5 11 7.5-6 7.5 6v8h-5v-5h-5v5h-5z" })], -1)), e.isHome ? (v(), g("i", vm)) : F("", !0)]),
      s("button", {
        type: "button",
        class: "xiaobai-os-nav-button xiaobai-os-close-button",
        "aria-label": "关闭",
        onClick: n[2] || (n[2] = (a) => t.$emit("close"))
      }, [...n[5] || (n[5] = [s("span", null, [s("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, [s("path", { d: "m7 9.5 5 5 5-5" })])], -1)])])
    ], 2));
  }
}), mm = pm, gm = /* @__PURE__ */ ie({
  __name: "XiaobaiOsSystemBar",
  props: { isHome: { type: Boolean } },
  setup(e) {
    return (t, n) => (v(), g("header", {
      class: se(["xiaobai-os-system-bar", { "is-home": e.isHome }]),
      "aria-label": "系统状态"
    }, [...n[0] || (n[0] = [s("span", { class: "xiaobai-os-system-mark" }, "小白", -1), s("span", {
      class: "xiaobai-os-system-status",
      "aria-hidden": "true"
    }, [s("span", { class: "xiaobai-os-signal" }, [
      s("i"),
      s("i"),
      s("i"),
      s("i")
    ]), s("span", { class: "xiaobai-os-battery" }, [s("i")])], -1)])], 2));
  }
}), hm = gm, bm = { class: "xiaobai-os-device" }, ym = { class: "xiaobai-os-glass" }, km = /* @__PURE__ */ ie({
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
    const t = e, n = Z(() => t.activeApp === null);
    return (a, l) => (v(), g("div", bm, [l[4] || (l[4] = s("span", {
      class: "xiaobai-os-side-key",
      "aria-hidden": "true"
    }, null, -1)), s("div", ym, [
      $e(hm, { "is-home": n.value }, null, 8, ["is-home"]),
      s("div", {
        class: "xiaobai-os-stage",
        style: jt(e.activeApp ? { "--app-accent": e.activeApp.accent } : null)
      }, [$e(Qr, {
        name: "xiaobai-os-route",
        mode: "out-in"
      }, {
        default: Ft(() => [n.value ? (v(), pe(cm, {
          key: "home",
          apps: e.apps,
          "character-avatar": e.characterAvatar,
          onOpenApp: l[0] || (l[0] = (i) => a.$emit("openApp", i))
        }, null, 8, ["apps", "character-avatar"])) : e.activeApp ? (v(), pe(lr(e.activeApp.component), {
          key: "app",
          bridge: e.bridge,
          "initial-state": e.activeState
        }, null, 8, ["bridge", "initial-state"])) : F("", !0)]),
        _: 1
      })], 4),
      $e(mm, {
        "is-home": n.value,
        onBack: l[1] || (l[1] = (i) => a.$emit("back")),
        onHome: l[2] || (l[2] = (i) => a.$emit("home")),
        onClose: l[3] || (l[3] = (i) => a.$emit("close"))
      }, null, 8, ["is-home"])
    ])]));
  }
}), _m = km, $m = "LittleWhiteBox-XiaobaiOS";
function wm() {
  return `xiaobai-os-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function Cm() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Set();
  let n = !1;
  function a(d, f = {}, y = "") {
    parent.postMessage({
      source: $m,
      type: d,
      requestId: y,
      payload: f
    }, window.location.origin);
  }
  function l(d) {
    const f = String(d.requestId || "");
    if (!f) return !1;
    const y = e.get(f);
    if (!y) return !1;
    e.delete(f), clearTimeout(y.timer);
    const b = d.payload;
    return b?.ok === !1 ? y.reject(new Error(b.error || "host_request_failed")) : y.resolve(b), !0;
  }
  function i(d) {
    d.origin !== window.location.origin || d.source !== parent || d.data?.source !== "LittleWhiteBox-XiaobaiOS" || typeof d.data.type != "string" || l(d.data) || t.forEach((f) => f(d.data));
  }
  function r() {
    n || (n = !0, window.addEventListener("message", i), a("os/frame-ready"));
  }
  function o(d, f = {}, y = 15e3) {
    const b = wm();
    return new Promise((R, L) => {
      const Q = setTimeout(() => {
        e.delete(b), L(/* @__PURE__ */ new Error("host_request_timeout"));
      }, y);
      e.set(b, {
        resolve: R,
        reject: L,
        timer: Q
      }), a(d, f, b);
    });
  }
  function u(d) {
    return t.add(d), () => t.delete(d);
  }
  function c() {
    n && window.removeEventListener("message", i), n = !1, t.clear(), e.forEach((d) => {
      clearTimeout(d.timer), d.reject(/* @__PURE__ */ new Error("frame_bridge_disposed"));
    }), e.clear();
  }
  return Object.freeze({
    start: r,
    post: a,
    request: o,
    subscribe: u,
    dispose: c
  });
}
var Sm = {
  key: 0,
  class: "xiaobai-os-error",
  role: "alert"
}, Am = {
  key: 1,
  class: "xiaobai-os-loading",
  role: "status"
}, xm = /* @__PURE__ */ ie({
  __name: "App",
  setup(e) {
    const t = Cm(), n = /* @__PURE__ */ q(null), a = /* @__PURE__ */ q(!1), l = /* @__PURE__ */ q("light"), i = /* @__PURE__ */ q(/* @__PURE__ */ new Set()), r = /* @__PURE__ */ q(""), o = /* @__PURE__ */ q(null), u = /* @__PURE__ */ q(null), c = /* @__PURE__ */ q("");
    let d = null, f = () => {
    }, y = 0;
    const b = Z(() => tm.filter(($) => i.value.has($.id)));
    function R($) {
      y += 1, l.value = $.theme === "dark" ? "dark" : "light", i.value = new Set(($.apps || []).map((w) => String(w.id))), r.value = String($.chat?.characterAvatar || ""), o.value = null, u.value = null, a.value = !0;
    }
    function L($) {
      $.type === "os/init" && R($.payload || {}), $.type === "os/theme-changed" && (l.value = $.payload?.theme === "dark" ? "dark" : "light"), $.type === "os/error" && (c.value = String($.payload?.message || "小白 OS 初始化失败"));
    }
    async function Q($) {
      const w = ++y;
      c.value = "";
      try {
        const E = await t.request("app/activate", { appId: $.id });
        if (w !== y) return;
        if (E.appId !== $.id) throw new Error("app_activation_mismatch");
        u.value = E.state ?? null, o.value = $;
      } catch (E) {
        if (w !== y) return;
        o.value = null, c.value = E instanceof Error ? E.message : String(E);
      }
    }
    function z() {
      y += 1, t.post("app/deactivate", { appId: o.value?.id || "" }), o.value = null, u.value = null;
    }
    function j() {
      y += 1, t.post("os/close");
    }
    function X($) {
      if ($.key === "Escape") {
        $.preventDefault(), o.value ? z() : j();
        return;
      }
      if ($.key !== "Tab" || !n.value) return;
      const w = Array.from(n.value.querySelectorAll('button:not(:disabled), [href], input:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'));
      if (w.length === 0) return;
      const E = w[0], A = w[w.length - 1];
      $.shiftKey && document.activeElement === E ? ($.preventDefault(), A.focus()) : !$.shiftKey && document.activeElement === A && ($.preventDefault(), E.focus());
    }
    return mt(async () => {
      d = document.activeElement instanceof HTMLElement ? document.activeElement : null, f = t.subscribe(L), t.start(), await qn(), n.value?.focus();
    }), gt(() => {
      y += 1, f(), t.dispose(), d?.focus();
    }), ($, w) => (v(), g("main", {
      ref_key: "root",
      ref: n,
      class: se(["xiaobai-os-shell", `theme-${l.value}`]),
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "小白 OS",
      tabindex: "-1",
      onKeydown: X,
      onClick: dt(j, ["self"])
    }, [c.value ? (v(), g("div", Sm, m(c.value), 1)) : F("", !0), a.value ? (v(), pe(_m, {
      key: 2,
      apps: b.value,
      "active-app": o.value,
      "active-state": u.value,
      bridge: Ut(t),
      "character-avatar": r.value,
      onOpenApp: Q,
      onBack: z,
      onHome: z,
      onClose: j
    }, null, 8, [
      "apps",
      "active-app",
      "active-state",
      "bridge",
      "character-avatar"
    ])) : (v(), g("div", Am, "正在启动小白 OS"))], 34));
  }
}), Im = xm;
xo(Im).mount("#app");
