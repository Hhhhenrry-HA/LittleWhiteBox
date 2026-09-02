/* eslint-disable */
// @__NO_SIDE_EFFECTS__
function In(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const a of e.split(",")) t[a] = 1;
  return (a) => a in t;
}
var xe = {}, fa = [], Ct = () => {
}, ei = () => !1, Pn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), On = (e) => e.startsWith("onUpdate:"), Pe = Object.assign, Cs = (e, t) => {
  const a = e.indexOf(t);
  a > -1 && e.splice(a, 1);
}, Rr = Object.prototype.hasOwnProperty, ye = (e, t) => Rr.call(e, t), ie = Array.isArray, va = (e) => tn(e) === "[object Map]", $a = (e) => tn(e) === "[object Set]", Zs = (e) => tn(e) === "[object Date]", fe = (e) => typeof e == "function", Me = (e) => typeof e == "string", gt = (e) => typeof e == "symbol", ke = (e) => e !== null && typeof e == "object", ti = (e) => (ke(e) || fe(e)) && fe(e.then) && fe(e.catch), ai = Object.prototype.toString, tn = (e) => ai.call(e), Lr = (e) => tn(e).slice(8, -1), ni = (e) => tn(e) === "[object Object]", _s = (e) => Me(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Da = /* @__PURE__ */ In(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"), Rn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((a) => t[a] || (t[a] = e(a)));
}, Br = /-\w/g, Je = Rn((e) => e.replace(Br, (t) => t.slice(1).toUpperCase())), Nr = /\B([A-Z])/g, Xt = Rn((e) => e.replace(Nr, "-$1").toLowerCase()), Ln = Rn((e) => e.charAt(0).toUpperCase() + e.slice(1)), Vn = Rn((e) => e ? `on${Ln(e)}` : ""), St = (e, t) => !Object.is(e, t), mn = (e, ...t) => {
  for (let a = 0; a < e.length; a++) e[a](...t);
}, si = (e, t, a, n = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: n,
    value: a
  });
}, Bn = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
}, Dr = (e) => {
  const t = Me(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
}, el, Nn = () => el || (el = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {});
function Tt(e) {
  if (ie(e)) {
    const t = {};
    for (let a = 0; a < e.length; a++) {
      const n = e[a], l = Me(n) ? jr(n) : Tt(n);
      if (l) for (const i in l) t[i] = l[i];
    }
    return t;
  } else if (Me(e) || ke(e)) return e;
}
var qr = /;(?![^(]*\))/g, Ur = /:([^]+)/, Fr = /\/\*[^]*?\*\//g;
function jr(e) {
  const t = {};
  return e.replace(Fr, "").split(qr).forEach((a) => {
    if (a) {
      const n = a.split(Ur);
      n.length > 1 && (t[n[0].trim()] = n[1].trim());
    }
  }), t;
}
function te(e) {
  let t = "";
  if (Me(e)) t = e;
  else if (ie(e)) for (let a = 0; a < e.length; a++) {
    const n = te(e[a]);
    n && (t += n + " ");
  }
  else if (ke(e))
    for (const a in e) e[a] && (t += a + " ");
  return t.trim();
}
var li = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Hr = /* @__PURE__ */ In(li), $w = /* @__PURE__ */ In(li + ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");
function ii(e) {
  return !!e || e === "";
}
function Kr(e, t) {
  if (e.length !== t.length) return !1;
  let a = !0;
  for (let n = 0; a && n < e.length; n++) a = xa(e[n], t[n]);
  return a;
}
function xa(e, t) {
  if (e === t) return !0;
  let a = Zs(e), n = Zs(t);
  if (a || n) return a && n ? e.getTime() === t.getTime() : !1;
  if (a = gt(e), n = gt(t), a || n) return e === t;
  if (a = ie(e), n = ie(t), a || n) return a && n ? Kr(e, t) : !1;
  if (a = ke(e), n = ke(t), a || n) {
    if (!a || !n || Object.keys(e).length !== Object.keys(t).length) return !1;
    for (const l in e) {
      const i = e.hasOwnProperty(l), r = t.hasOwnProperty(l);
      if (i && !r || !i && r || !xa(e[l], t[l])) return !1;
    }
  }
  return String(e) === String(t);
}
function Ts(e, t) {
  return e.findIndex((a) => xa(a, t));
}
var ri = (e) => !!(e && e.__v_isRef === !0), m = (e) => Me(e) ? e : e == null ? "" : ie(e) || ke(e) && (e.toString === ai || !fe(e.toString)) ? ri(e) ? m(e.value) : JSON.stringify(e, oi, 2) : String(e), oi = (e, t) => ri(t) ? oi(e, t.value) : va(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((a, [n, l], i) => (a[zn(n, i) + " =>"] = l, a), {}) } : $a(t) ? { [`Set(${t.size})`]: [...t.values()].map((a) => zn(a)) } : gt(t) ? zn(t) : ke(t) && !ie(t) && !ni(t) ? String(t) : t, zn = (e, t = "") => {
  var a;
  return gt(e) ? `Symbol(${(a = e.description) != null ? a : t})` : e;
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
function Vr() {
  return Ne;
}
var _e, Wn = /* @__PURE__ */ new WeakSet(), ui = class {
  constructor(e) {
    this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Ne && (Ne.active ? Ne.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Wn.has(this) && (Wn.delete(this), this.trigger()));
  }
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || ci(this);
  }
  run() {
    if (!(this.flags & 1)) return this.fn();
    this.flags |= 2, tl(this), fi(this);
    const e = _e, t = pt;
    _e = this, pt = !0;
    try {
      return this.fn();
    } finally {
      vi(this), _e = e, pt = t, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let e = this.deps; e; e = e.nextDep) Es(e);
      this.deps = this.depsTail = void 0, tl(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Wn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  runIfDirty() {
    ds(this) && this.run();
  }
  get dirty() {
    return ds(this);
  }
}, di = 0, qa, Ua;
function ci(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Ua, Ua = e;
    return;
  }
  e.next = qa, qa = e;
}
function As() {
  di++;
}
function Ms() {
  if (--di > 0) return;
  if (Ua) {
    let t = Ua;
    for (Ua = void 0; t; ) {
      const a = t.next;
      t.next = void 0, t.flags &= -9, t = a;
    }
  }
  let e;
  for (; qa; ) {
    let t = qa;
    for (qa = void 0; t; ) {
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
function fi(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function vi(e) {
  let t, a = e.depsTail, n = a;
  for (; n; ) {
    const l = n.prevDep;
    n.version === -1 ? (n === a && (a = l), Es(n), zr(n)) : t = n, n.dep.activeLink = n.prevActiveLink, n.prevActiveLink = void 0, n = l;
  }
  e.deps = t, e.depsTail = a;
}
function ds(e) {
  for (let t = e.deps; t; t = t.nextDep) if (t.dep.version !== t.version || t.dep.computed && (pi(t.dep.computed) || t.dep.version !== t.version)) return !0;
  return !!e._dirty;
}
function pi(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Ka) || (e.globalVersion = Ka, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !ds(e)))) return;
  e.flags |= 2;
  const t = e.dep, a = _e, n = pt;
  _e = e, pt = !0;
  try {
    fi(e);
    const l = e.fn(e._value);
    (t.version === 0 || St(l, e._value)) && (e.flags |= 128, e._value = l, t.version++);
  } catch (l) {
    throw t.version++, l;
  } finally {
    _e = a, pt = n, vi(e), e.flags &= -3;
  }
}
function Es(e, t = !1) {
  const { dep: a, prevSub: n, nextSub: l } = e;
  if (n && (n.nextSub = l, e.prevSub = void 0), l && (l.prevSub = n, e.nextSub = void 0), a.subs === e && (a.subs = n, !n && a.computed)) {
    a.computed.flags &= -5;
    for (let i = a.computed.deps; i; i = i.nextDep) Es(i, !0);
  }
  !t && !--a.sc && a.map && a.map.delete(a.key);
}
function zr(e) {
  const { prevDep: t, nextDep: a } = e;
  t && (t.nextDep = a, e.prevDep = void 0), a && (a.prevDep = t, e.nextDep = void 0);
}
var pt = !0, gi = [];
function Dt() {
  gi.push(pt), pt = !1;
}
function qt() {
  const e = gi.pop();
  pt = e === void 0 ? !0 : e;
}
function tl(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const a = _e;
    _e = void 0;
    try {
      t();
    } finally {
      _e = a;
    }
  }
}
var Ka = 0, Wr = class {
  constructor(e, t) {
    this.sub = e, this.dep = t, this.version = t.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}, Is = class {
  constructor(e) {
    this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(e) {
    if (!_e || !pt || _e === this.computed) return;
    let t = this.activeLink;
    if (t === void 0 || t.sub !== _e)
      t = this.activeLink = new Wr(_e, this), _e.deps ? (t.prevDep = _e.depsTail, _e.depsTail.nextDep = t, _e.depsTail = t) : _e.deps = _e.depsTail = t, mi(t);
    else if (t.version === -1 && (t.version = this.version, t.nextDep)) {
      const a = t.nextDep;
      a.prevDep = t.prevDep, t.prevDep && (t.prevDep.nextDep = a), t.prevDep = _e.depsTail, t.nextDep = void 0, _e.depsTail.nextDep = t, _e.depsTail = t, _e.deps === t && (_e.deps = a);
    }
    return t;
  }
  trigger(e) {
    this.version++, Ka++, this.notify(e);
  }
  notify(e) {
    As();
    try {
      for (let t = this.subs; t; t = t.prevSub) t.sub.notify() && t.sub.dep.notify();
    } finally {
      Ms();
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
var cs = /* @__PURE__ */ new WeakMap(), na = /* @__PURE__ */ Symbol(""), fs = /* @__PURE__ */ Symbol(""), Ga = /* @__PURE__ */ Symbol("");
function Ke(e, t, a) {
  if (pt && _e) {
    let n = cs.get(e);
    n || cs.set(e, n = /* @__PURE__ */ new Map());
    let l = n.get(a);
    l || (n.set(a, l = new Is()), l.map = n, l.key = a), l.track();
  }
}
function Lt(e, t, a, n, l, i) {
  const r = cs.get(e);
  if (!r) {
    Ka++;
    return;
  }
  const o = (d) => {
    d && d.trigger();
  };
  if (As(), t === "clear") r.forEach(o);
  else {
    const d = ie(e), p = d && _s(a);
    if (d && a === "length") {
      const c = Number(n);
      r.forEach((y, w) => {
        (w === "length" || w === Ga || !gt(w) && w >= c) && o(y);
      });
    } else
      switch ((a !== void 0 || r.has(void 0)) && o(r.get(a)), p && o(r.get(Ga)), t) {
        case "add":
          d ? p && o(r.get("length")) : (o(r.get(na)), va(e) && o(r.get(fs)));
          break;
        case "delete":
          d || (o(r.get(na)), va(e) && o(r.get(fs)));
          break;
        case "set":
          va(e) && o(r.get(na));
          break;
      }
  }
  Ms();
}
function ra(e) {
  const t = /* @__PURE__ */ ue(e);
  return t === e ? t : (Ke(t, "iterate", Ga), /* @__PURE__ */ ft(e) ? t : t.map(mt));
}
function Dn(e) {
  return Ke(e = /* @__PURE__ */ ue(e), "iterate", Ga), e;
}
function $t(e, t) {
  return /* @__PURE__ */ Ut(e) ? ba(/* @__PURE__ */ sa(e) ? mt(t) : t) : mt(t);
}
var Yr = {
  __proto__: null,
  [Symbol.iterator]() {
    return Yn(this, Symbol.iterator, (e) => $t(this, e));
  },
  concat(...e) {
    return ra(this).concat(...e.map((t) => ie(t) ? ra(t) : t));
  },
  entries() {
    return Yn(this, "entries", (e) => (e[1] = $t(this, e[1]), e));
  },
  every(e, t) {
    return Et(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Et(this, "filter", e, t, (a) => a.map((n) => $t(this, n)), arguments);
  },
  find(e, t) {
    return Et(this, "find", e, t, (a) => $t(this, a), arguments);
  },
  findIndex(e, t) {
    return Et(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Et(this, "findLast", e, t, (a) => $t(this, a), arguments);
  },
  findLastIndex(e, t) {
    return Et(this, "findLastIndex", e, t, void 0, arguments);
  },
  forEach(e, t) {
    return Et(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Xn(this, "includes", e);
  },
  indexOf(...e) {
    return Xn(this, "indexOf", e);
  },
  join(e) {
    return ra(this).join(e);
  },
  lastIndexOf(...e) {
    return Xn(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Et(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Aa(this, "pop");
  },
  push(...e) {
    return Aa(this, "push", e);
  },
  reduce(e, ...t) {
    return al(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return al(this, "reduceRight", e, t);
  },
  shift() {
    return Aa(this, "shift");
  },
  some(e, t) {
    return Et(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Aa(this, "splice", e);
  },
  toReversed() {
    return ra(this).toReversed();
  },
  toSorted(e) {
    return ra(this).toSorted(e);
  },
  toSpliced(...e) {
    return ra(this).toSpliced(...e);
  },
  unshift(...e) {
    return Aa(this, "unshift", e);
  },
  values() {
    return Yn(this, "values", (e) => $t(this, e));
  }
};
function Yn(e, t, a) {
  const n = Dn(e), l = n[t]();
  return n !== e && !/* @__PURE__ */ ft(e) && (l._next = l.next, l.next = () => {
    const i = l._next();
    return i.done || (i.value = a(i.value)), i;
  }), l;
}
var Xr = Array.prototype;
function Et(e, t, a, n, l, i) {
  const r = Dn(e), o = r !== e && !/* @__PURE__ */ ft(e), d = r[t];
  if (d !== Xr[t]) {
    const y = d.apply(e, i);
    return o ? mt(y) : y;
  }
  let p = a;
  r !== e && (o ? p = function(y, w) {
    return a.call(this, $t(e, y), w, e);
  } : a.length > 2 && (p = function(y, w) {
    return a.call(this, y, w, e);
  }));
  const c = d.call(r, p, n);
  return o && l ? l(c) : c;
}
function al(e, t, a, n) {
  const l = Dn(e), i = l !== e && !/* @__PURE__ */ ft(e);
  let r = a, o = !1;
  l !== e && (i ? (o = n.length === 0, r = function(p, c, y) {
    return o && (o = !1, p = $t(e, p)), a.call(this, p, $t(e, c), y, e);
  }) : a.length > 3 && (r = function(p, c, y) {
    return a.call(this, p, c, y, e);
  }));
  const d = l[t](r, ...n);
  return o ? $t(e, d) : d;
}
function Xn(e, t, a) {
  const n = /* @__PURE__ */ ue(e);
  Ke(n, "iterate", Ga);
  const l = n[t](...a);
  return (l === -1 || l === !1) && /* @__PURE__ */ Rs(a[0]) ? (a[0] = /* @__PURE__ */ ue(a[0]), n[t](...a)) : l;
}
function Aa(e, t, a = []) {
  Dt(), As();
  const n = (/* @__PURE__ */ ue(e))[t].apply(e, a);
  return Ms(), qt(), n;
}
var Jr = /* @__PURE__ */ In("__proto__,__v_isRef,__isVue"), bi = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(gt));
function Qr(e) {
  gt(e) || (e = String(e));
  const t = /* @__PURE__ */ ue(this);
  return Ke(t, "has", e), t.hasOwnProperty(e);
}
var hi = class {
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
      return a === (n ? l ? oo : $i : l ? wi : ki).get(e) || Object.getPrototypeOf(e) === Object.getPrototypeOf(a) ? e : void 0;
    const i = ie(e);
    if (!n) {
      let o;
      if (i && (o = Yr[t])) return o;
      if (t === "hasOwnProperty") return Qr;
    }
    const r = Reflect.get(e, t, /* @__PURE__ */ ze(e) ? e : a);
    if ((gt(t) ? bi.has(t) : Jr(t)) || (n || Ke(e, "get", t), l)) return r;
    if (/* @__PURE__ */ ze(r)) {
      const o = i && _s(t) ? r : r.value;
      return n && ke(o) ? /* @__PURE__ */ ps(o) : o;
    }
    return ke(r) ? n ? /* @__PURE__ */ ps(r) : /* @__PURE__ */ _t(r) : r;
  }
}, yi = class extends hi {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, t, a, n) {
    let l = e[t];
    const i = ie(e) && _s(t);
    if (!this._isShallow) {
      const d = /* @__PURE__ */ Ut(l);
      if (!/* @__PURE__ */ ft(a) && !/* @__PURE__ */ Ut(a) && (l = /* @__PURE__ */ ue(l), a = /* @__PURE__ */ ue(a)), !i && /* @__PURE__ */ ze(l) && !/* @__PURE__ */ ze(a)) return d || (l.value = a), !0;
    }
    const r = i ? Number(t) < e.length : ye(e, t), o = Reflect.set(e, t, a, /* @__PURE__ */ ze(e) ? e : n);
    return e === /* @__PURE__ */ ue(n) && (r ? St(a, l) && Lt(e, "set", t, a, l) : Lt(e, "add", t, a)), o;
  }
  deleteProperty(e, t) {
    const a = ye(e, t), n = e[t], l = Reflect.deleteProperty(e, t);
    return l && a && Lt(e, "delete", t, void 0, n), l;
  }
  has(e, t) {
    const a = Reflect.has(e, t);
    return (!gt(t) || !bi.has(t)) && Ke(e, "has", t), a;
  }
  ownKeys(e) {
    return Ke(e, "iterate", ie(e) ? "length" : na), Reflect.ownKeys(e);
  }
}, Zr = class extends hi {
  constructor(e = !1) {
    super(!0, e);
  }
  set(e, t) {
    return !0;
  }
  deleteProperty(e, t) {
    return !0;
  }
}, eo = /* @__PURE__ */ new yi(), to = /* @__PURE__ */ new Zr(), ao = /* @__PURE__ */ new yi(!0), vs = (e) => e, on = (e) => Reflect.getPrototypeOf(e);
function no(e, t, a) {
  return function(...n) {
    const l = this.__v_raw, i = /* @__PURE__ */ ue(l), r = va(i), o = e === "entries" || e === Symbol.iterator && r, d = e === "keys" && r, p = l[e](...n), c = a ? vs : t ? ba : mt;
    return !t && Ke(i, "iterate", d ? fs : na), Pe(Object.create(p), { next() {
      const { value: y, done: w } = p.next();
      return w ? {
        value: y,
        done: w
      } : {
        value: o ? [c(y[0]), c(y[1])] : c(y),
        done: w
      };
    } });
  };
}
function un(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function so(e, t) {
  const a = {
    get(n) {
      const l = this.__v_raw, i = /* @__PURE__ */ ue(l), r = /* @__PURE__ */ ue(n);
      e || (St(n, r) && Ke(i, "get", n), Ke(i, "get", r));
      const { has: o } = on(i), d = t ? vs : e ? ba : mt;
      if (o.call(i, n)) return d(l.get(n));
      if (o.call(i, r)) return d(l.get(r));
      l !== i && l.get(n);
    },
    get size() {
      const n = this.__v_raw;
      return !e && Ke(/* @__PURE__ */ ue(n), "iterate", na), n.size;
    },
    has(n) {
      const l = this.__v_raw, i = /* @__PURE__ */ ue(l), r = /* @__PURE__ */ ue(n);
      return e || (St(n, r) && Ke(i, "has", n), Ke(i, "has", r)), n === r ? l.has(n) : l.has(n) || l.has(r);
    },
    forEach(n, l) {
      const i = this, r = i.__v_raw, o = /* @__PURE__ */ ue(r), d = t ? vs : e ? ba : mt;
      return !e && Ke(o, "iterate", na), r.forEach((p, c) => n.call(l, d(p), d(c), i));
    }
  };
  return Pe(a, e ? {
    add: un("add"),
    set: un("set"),
    delete: un("delete"),
    clear: un("clear")
  } : {
    add(n) {
      const l = /* @__PURE__ */ ue(this), i = on(l), r = /* @__PURE__ */ ue(n), o = !t && !/* @__PURE__ */ ft(n) && !/* @__PURE__ */ Ut(n) ? r : n;
      return i.has.call(l, o) || St(n, o) && i.has.call(l, n) || St(r, o) && i.has.call(l, r) || (l.add(o), Lt(l, "add", o, o)), this;
    },
    set(n, l) {
      !t && !/* @__PURE__ */ ft(l) && !/* @__PURE__ */ Ut(l) && (l = /* @__PURE__ */ ue(l));
      const i = /* @__PURE__ */ ue(this), { has: r, get: o } = on(i);
      let d = r.call(i, n);
      d || (n = /* @__PURE__ */ ue(n), d = r.call(i, n));
      const p = o.call(i, n);
      return i.set(n, l), d ? St(l, p) && Lt(i, "set", n, l, p) : Lt(i, "add", n, l), this;
    },
    delete(n) {
      const l = /* @__PURE__ */ ue(this), { has: i, get: r } = on(l);
      let o = i.call(l, n);
      o || (n = /* @__PURE__ */ ue(n), o = i.call(l, n));
      const d = r ? r.call(l, n) : void 0, p = l.delete(n);
      return o && Lt(l, "delete", n, void 0, d), p;
    },
    clear() {
      const n = /* @__PURE__ */ ue(this), l = n.size !== 0, i = void 0, r = n.clear();
      return l && Lt(n, "clear", void 0, void 0, i), r;
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
  return (n, l, i) => l === "__v_isReactive" ? !e : l === "__v_isReadonly" ? e : l === "__v_raw" ? n : Reflect.get(ye(a, l) && l in n ? a : n, l, i);
}
var lo = { get: /* @__PURE__ */ Ps(!1, !1) }, io = { get: /* @__PURE__ */ Ps(!1, !0) }, ro = { get: /* @__PURE__ */ Ps(!0, !1) }, ki = /* @__PURE__ */ new WeakMap(), wi = /* @__PURE__ */ new WeakMap(), $i = /* @__PURE__ */ new WeakMap(), oo = /* @__PURE__ */ new WeakMap();
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
  return /* @__PURE__ */ Ut(e) ? e : Os(e, !1, eo, lo, ki);
}
// @__NO_SIDE_EFFECTS__
function co(e) {
  return Os(e, !1, ao, io, wi);
}
// @__NO_SIDE_EFFECTS__
function ps(e) {
  return Os(e, !0, to, ro, $i);
}
function Os(e, t, a, n, l) {
  if (!ke(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e)) return e;
  const i = l.get(e);
  if (i) return i;
  const r = uo(Lr(e));
  if (r === 0) return e;
  const o = new Proxy(e, r === 2 ? n : a);
  return l.set(e, o), o;
}
// @__NO_SIDE_EFFECTS__
function sa(e) {
  return /* @__PURE__ */ Ut(e) ? /* @__PURE__ */ sa(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function Ut(e) {
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
function ue(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ ue(t) : e;
}
function fo(e) {
  return !ye(e, "__v_skip") && Object.isExtensible(e) && si(e, "__v_skip", !0), e;
}
var mt = (e) => ke(e) ? /* @__PURE__ */ _t(e) : e, ba = (e) => ke(e) ? /* @__PURE__ */ ps(e) : e;
// @__NO_SIDE_EFFECTS__
function ze(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function K(e) {
  return vo(e, !1);
}
function vo(e, t) {
  return /* @__PURE__ */ ze(e) ? e : new po(e, t);
}
var po = class {
  constructor(e, t) {
    this.dep = new Is(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = t ? e : /* @__PURE__ */ ue(e), this._value = t ? e : mt(e), this.__v_isShallow = t;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(e) {
    const t = this._rawValue, a = this.__v_isShallow || /* @__PURE__ */ ft(e) || /* @__PURE__ */ Ut(e);
    e = a ? e : /* @__PURE__ */ ue(e), St(e, t) && (this._rawValue = e, this._value = a ? e : mt(e), this.dep.trigger());
  }
};
function me(e) {
  return /* @__PURE__ */ ze(e) ? e.value : e;
}
var go = {
  get: (e, t, a) => t === "__v_raw" ? e : me(Reflect.get(e, t, a)),
  set: (e, t, a, n) => {
    const l = e[t];
    return /* @__PURE__ */ ze(l) && !/* @__PURE__ */ ze(a) ? (l.value = a, !0) : Reflect.set(e, t, a, n);
  }
};
function xi(e) {
  return /* @__PURE__ */ sa(e) ? e : new Proxy(e, go);
}
var mo = class {
  constructor(e, t, a) {
    this.fn = e, this.setter = t, this._value = void 0, this.dep = new Is(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Ka - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t, this.isSSR = a;
  }
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && _e !== this)
      return ci(this, !0), !0;
  }
  get value() {
    const e = this.dep.track();
    return pi(this), e && (e.version = this.dep.version), this._value;
  }
  set value(e) {
    this.setter && this.setter(e);
  }
};
// @__NO_SIDE_EFFECTS__
function bo(e, t, a = !1) {
  let n, l;
  return fe(e) ? n = e : (n = e.get, l = e.set), new mo(n, l, a);
}
var dn = {}, wn = /* @__PURE__ */ new WeakMap(), ta = void 0;
function ho(e, t = !1, a = ta) {
  if (a) {
    let n = wn.get(a);
    n || wn.set(a, n = []), n.push(e);
  }
}
function yo(e, t, a = xe) {
  const { immediate: n, deep: l, once: i, scheduler: r, augmentJob: o, call: d } = a, p = (A) => l ? A : /* @__PURE__ */ ft(A) || l === !1 || l === 0 ? Bt(A, 1) : Bt(A);
  let c, y, w, h, T = !1, O = !1;
  if (/* @__PURE__ */ ze(e) ? (y = () => e.value, T = /* @__PURE__ */ ft(e)) : /* @__PURE__ */ sa(e) ? (y = () => p(e), T = !0) : ie(e) ? (O = !0, T = e.some((A) => /* @__PURE__ */ sa(A) || /* @__PURE__ */ ft(A)), y = () => e.map((A) => {
    if (/* @__PURE__ */ ze(A)) return A.value;
    if (/* @__PURE__ */ sa(A)) return p(A);
    if (fe(A)) return d ? d(A, 2) : A();
  })) : fe(e) ? t ? y = d ? () => d(e, 2) : e : y = () => {
    if (w) {
      Dt();
      try {
        w();
      } finally {
        qt();
      }
    }
    const A = ta;
    ta = c;
    try {
      return d ? d(e, 3, [h]) : e(h);
    } finally {
      ta = A;
    }
  } : y = Ct, t && l) {
    const A = y, x = l === !0 ? 1 / 0 : l;
    y = () => Bt(A(), x);
  }
  const R = Vr(), F = () => {
    c.stop(), R && R.active && Cs(R.effects, c);
  };
  if (i && t) {
    const A = t;
    t = (...x) => {
      A(...x), F();
    };
  }
  let q = O ? new Array(e.length).fill(dn) : dn;
  const I = (A) => {
    if (!(!(c.flags & 1) || !c.dirty && !A))
      if (t) {
        const x = c.run();
        if (l || T || (O ? x.some((M, S) => St(M, q[S])) : St(x, q))) {
          w && w();
          const M = ta;
          ta = c;
          try {
            const S = [
              x,
              q === dn ? void 0 : O && q[0] === dn ? [] : q,
              h
            ];
            q = x, d ? d(t, 3, S) : t(...S);
          } finally {
            ta = M;
          }
        }
      } else c.run();
  };
  return o && o(I), c = new ui(y), c.scheduler = r ? () => r(I, !1) : I, h = (A) => ho(A, !1, c), w = c.onStop = () => {
    const A = wn.get(c);
    if (A) {
      if (d) d(A, 4);
      else for (const x of A) x();
      wn.delete(c);
    }
  }, t ? n ? I(!0) : q = c.run() : r ? r(I.bind(null, !0), !0) : c.run(), F.pause = c.pause.bind(c), F.resume = c.resume.bind(c), F.stop = F, F;
}
function Bt(e, t = 1 / 0, a) {
  if (t <= 0 || !ke(e) || e.__v_skip || (a = a || /* @__PURE__ */ new Map(), (a.get(e) || 0) >= t)) return e;
  if (a.set(e, t), t--, /* @__PURE__ */ ze(e)) Bt(e.value, t, a);
  else if (ie(e)) for (let n = 0; n < e.length; n++) Bt(e[n], t, a);
  else if ($a(e) || va(e)) e.forEach((n) => {
    Bt(n, t, a);
  });
  else if (ni(e)) {
    for (const n in e) Bt(e[n], t, a);
    for (const n of Object.getOwnPropertySymbols(e)) Object.prototype.propertyIsEnumerable.call(e, n) && Bt(e[n], t, a);
  }
  return e;
}
function an(e, t, a, n) {
  try {
    return n ? e(...n) : e();
  } catch (l) {
    qn(l, t, a);
  }
}
function vt(e, t, a, n) {
  if (fe(e)) {
    const l = an(e, t, a, n);
    return l && ti(l) && l.catch((i) => {
      qn(i, t, a);
    }), l;
  }
  if (ie(e)) {
    const l = [];
    for (let i = 0; i < e.length; i++) l.push(vt(e[i], t, a, n));
    return l;
  }
}
function qn(e, t, a, n = !0) {
  const l = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: r } = t && t.appContext.config || xe;
  if (t) {
    let o = t.parent;
    const d = t.proxy, p = `https://vuejs.org/error-reference/#runtime-${a}`;
    for (; o; ) {
      const c = o.ec;
      if (c) {
        for (let y = 0; y < c.length; y++) if (c[y](e, d, p) === !1) return;
      }
      o = o.parent;
    }
    if (i) {
      Dt(), an(i, null, 10, [
        e,
        d,
        p
      ]), qt();
      return;
    }
  }
  ko(e, a, l, n, r);
}
function ko(e, t, a, n = !0, l = !1) {
  if (l) throw e;
  console.error(e);
}
var Xe = [], kt = -1, pa = [], Vt = null, ua = 0, Si = /* @__PURE__ */ Promise.resolve(), $n = null;
function nn(e) {
  const t = $n || Si;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function wo(e) {
  let t = kt + 1, a = Xe.length;
  for (; t < a; ) {
    const n = t + a >>> 1, l = Xe[n], i = Va(l);
    i < e || i === e && l.flags & 2 ? t = n + 1 : a = n;
  }
  return t;
}
function Ls(e) {
  if (!(e.flags & 1)) {
    const t = Va(e), a = Xe[Xe.length - 1];
    !a || !(e.flags & 2) && t >= Va(a) ? Xe.push(e) : Xe.splice(wo(t), 0, e), e.flags |= 1, Ci();
  }
}
function Ci() {
  $n || ($n = Si.then(Ti));
}
function $o(e) {
  ie(e) ? pa.push(...e) : Vt && e.id === -1 ? Vt.splice(ua + 1, 0, e) : e.flags & 1 || (pa.push(e), e.flags |= 1), Ci();
}
function nl(e, t, a = kt + 1) {
  for (; a < Xe.length; a++) {
    const n = Xe[a];
    if (n && n.flags & 2) {
      if (e && n.id !== e.uid) continue;
      Xe.splice(a, 1), a--, n.flags & 4 && (n.flags &= -2), n(), n.flags & 4 || (n.flags &= -2);
    }
  }
}
function _i(e) {
  if (pa.length) {
    const t = [...new Set(pa)].sort((a, n) => Va(a) - Va(n));
    if (pa.length = 0, Vt) {
      Vt.push(...t);
      return;
    }
    for (Vt = t, ua = 0; ua < Vt.length; ua++) {
      const a = Vt[ua];
      a.flags & 4 && (a.flags &= -2), a.flags & 8 || a(), a.flags &= -2;
    }
    Vt = null, ua = 0;
  }
}
var Va = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Ti(e) {
  try {
    for (kt = 0; kt < Xe.length; kt++) {
      const t = Xe[kt];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), an(t, t.i, t.i ? 15 : 14), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; kt < Xe.length; kt++) {
      const t = Xe[kt];
      t && (t.flags &= -2);
    }
    kt = -1, Xe.length = 0, _i(e), $n = null, (Xe.length || pa.length) && Ti(e);
  }
}
var De = null, Ai = null;
function xn(e) {
  const t = De;
  return De = e, Ai = e && e.type.__scopeId || null, t;
}
function la(e, t = De, a) {
  if (!t || e._n) return e;
  const n = (...l) => {
    n._d && Tn(-1);
    const i = xn(t);
    let r;
    try {
      r = e(...l);
    } finally {
      xn(i), n._d && Tn(1);
    }
    return r;
  };
  return n._n = !0, n._c = !0, n._d = !0, n;
}
function Ae(e, t) {
  if (De === null) return e;
  const a = Kn(De), n = e.dirs || (e.dirs = []);
  for (let l = 0; l < t.length; l++) {
    let [i, r, o, d = xe] = t[l];
    i && (fe(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && Bt(r), n.push({
      dir: i,
      instance: a,
      value: r,
      oldValue: void 0,
      arg: o,
      modifiers: d
    }));
  }
  return e;
}
function Jt(e, t, a, n) {
  const l = e.dirs, i = t && t.dirs;
  for (let r = 0; r < l.length; r++) {
    const o = l[r];
    i && (o.oldValue = i[r].value);
    let d = o.dir[n];
    d && (Dt(), vt(d, a, 8, [
      e.el,
      o,
      e,
      t
    ]), qt());
  }
}
function xo(e, t) {
  if (Ve) {
    let a = Ve.provides;
    const n = Ve.parent && Ve.parent.provides;
    n === a && (a = Ve.provides = Object.create(n)), a[e] = t;
  }
}
function bn(e, t, a = !1) {
  const n = ir();
  if (n || ma) {
    let l = ma ? ma._context.provides : n ? n.parent == null || n.ce ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides : void 0;
    if (l && e in l) return l[e];
    if (arguments.length > 1) return a && fe(t) ? t.call(n && n.proxy) : t;
  }
}
var So = /* @__PURE__ */ Symbol.for("v-scx"), Co = () => {
  {
    const e = bn(So);
    return e;
  }
};
function et(e, t, a) {
  return Mi(e, t, a);
}
function Mi(e, t, a = xe) {
  const { immediate: n, deep: l, flush: i, once: r } = a, o = Pe({}, a), d = t && n || !t && i !== "post";
  let p;
  if (Xa) {
    if (i === "sync") {
      const h = Co();
      p = h.__watcherHandles || (h.__watcherHandles = []);
    } else if (!d) {
      const h = () => {
      };
      return h.stop = Ct, h.resume = Ct, h.pause = Ct, h;
    }
  }
  const c = Ve;
  o.call = (h, T, O) => vt(h, c, T, O);
  let y = !1;
  i === "post" ? o.scheduler = (h) => {
    Ze(h, c && c.suspense);
  } : i !== "sync" && (y = !0, o.scheduler = (h, T) => {
    T ? h() : Ls(h);
  }), o.augmentJob = (h) => {
    t && (h.flags |= 4), y && (h.flags |= 2, c && (h.id = c.uid, h.i = c));
  };
  const w = yo(e, t, o);
  return Xa && (p ? p.push(w) : d && w()), w;
}
function _o(e, t, a) {
  const n = this.proxy, l = Me(e) ? e.includes(".") ? Ei(n, e) : () => n[e] : e.bind(n, n);
  let i;
  fe(t) ? i = t : (i = t.handler, a = t);
  const r = sn(this), o = Mi(l, i.bind(n), a);
  return r(), o;
}
function Ei(e, t) {
  const a = t.split(".");
  return () => {
    let n = e;
    for (let l = 0; l < a.length && n; l++) n = n[a[l]];
    return n;
  };
}
var To = /* @__PURE__ */ Symbol("_vte"), Ii = (e) => e.__isTeleport, ct = /* @__PURE__ */ Symbol("_leaveCb"), Ma = /* @__PURE__ */ Symbol("_enterCb");
function Ao() {
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
var ut = [Function, Array], Pi = {
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
}, Oi = (e) => {
  const t = e.subTree;
  return t.component ? Oi(t.component) : t;
}, Mo = {
  name: "BaseTransition",
  props: Pi,
  setup(e, { slots: t }) {
    const a = ir(), n = Ao();
    return () => {
      const l = t.default && Bi(t.default(), !0), i = l && l.length ? Ri(l) : a.subTree ? j() : void 0;
      if (!i) return;
      const r = /* @__PURE__ */ ue(e), { mode: o } = r;
      if (n.isLeaving) return Jn(i);
      const d = sl(i);
      if (!d) return Jn(i);
      let p = gs(d, r, n, a, (y) => p = y);
      d.type !== Ge && za(d, p);
      let c = a.subTree && sl(a.subTree);
      if (c && c.type !== Ge && !aa(c, d) && Oi(a).type !== Ge) {
        let y = gs(c, r, n, a);
        if (za(c, y), o === "out-in" && d.type !== Ge)
          return n.isLeaving = !0, y.afterLeave = () => {
            n.isLeaving = !1, a.job.flags & 8 || a.update(), delete y.afterLeave, c = void 0;
          }, Jn(i);
        o === "in-out" && d.type !== Ge ? y.delayLeave = (w, h, T) => {
          const O = Li(n, c);
          O[String(c.key)] = c, w[ct] = () => {
            h(), w[ct] = void 0, delete p.delayedLeave, c = void 0;
          }, p.delayedLeave = () => {
            T(), delete p.delayedLeave, c = void 0;
          };
        } : c = void 0;
      } else c && (c = void 0);
      return i;
    };
  }
};
function Ri(e) {
  let t = e[0];
  if (e.length > 1) {
    for (const a of e) if (a.type !== Ge) {
      t = a;
      break;
    }
  }
  return t;
}
var Eo = Mo;
function Li(e, t) {
  const { leavingVNodes: a } = e;
  let n = a.get(t.type);
  return n || (n = /* @__PURE__ */ Object.create(null), a.set(t.type, n)), n;
}
function gs(e, t, a, n, l) {
  const { appear: i, mode: r, persisted: o = !1, onBeforeEnter: d, onEnter: p, onAfterEnter: c, onEnterCancelled: y, onBeforeLeave: w, onLeave: h, onAfterLeave: T, onLeaveCancelled: O, onBeforeAppear: R, onAppear: F, onAfterAppear: q, onAppearCancelled: I } = t, A = String(e.key), x = Li(a, e), M = (_, G) => {
    _ && vt(_, n, 9, G);
  }, S = (_, G) => {
    const ee = G[1];
    M(_, G), ie(_) ? _.every((X) => X.length <= 1) && ee() : _.length <= 1 && ee();
  }, C = {
    mode: r,
    persisted: o,
    beforeEnter(_) {
      let G = d;
      if (!a.isMounted) if (i) G = R || d;
      else return;
      _[ct] && _[ct](!0);
      const ee = x[A];
      ee && aa(e, ee) && ee.el[ct] && ee.el[ct](), M(G, [_]);
    },
    enter(_) {
      if (x[A] === e) return;
      let G = p, ee = c, X = y;
      if (!a.isMounted) if (i)
        G = F || p, ee = q || c, X = I || y;
      else return;
      let J = !1;
      _[Ma] = (le) => {
        J || (J = !0, le ? M(X, [_]) : M(ee, [_]), C.delayedLeave && C.delayedLeave(), _[Ma] = void 0);
      };
      const U = _[Ma].bind(null, !1);
      G ? S(G, [_, U]) : U();
    },
    leave(_, G) {
      const ee = String(e.key);
      if (_[Ma] && _[Ma](!0), a.isUnmounting) return G();
      M(w, [_]);
      let X = !1;
      _[ct] = (U) => {
        X || (X = !0, G(), U ? M(O, [_]) : M(T, [_]), _[ct] = void 0, x[ee] === e && delete x[ee]);
      };
      const J = _[ct].bind(null, !1);
      x[ee] = e, h ? S(h, [_, J]) : J();
    },
    clone(_) {
      const G = gs(_, t, a, n, l);
      return l && l(G), G;
    }
  };
  return C;
}
function Jn(e) {
  if (Un(e))
    return e = Yt(e), e.children = null, e;
}
function sl(e) {
  if (!Un(e))
    return Ii(e.type) && e.children ? Ri(e.children) : e;
  if (e.component) return e.component.subTree;
  const { shapeFlag: t, children: a } = e;
  if (a) {
    if (t & 16) return a[0];
    if (t & 32 && fe(a.default)) return a.default();
  }
}
function za(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, za(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function Bi(e, t = !1, a) {
  let n = [], l = 0;
  for (let i = 0; i < e.length; i++) {
    let r = e[i];
    const o = a == null ? r.key : String(a) + String(r.key != null ? r.key : i);
    r.type === Z ? (r.patchFlag & 128 && l++, n = n.concat(Bi(r.children, t, o))) : (t || r.type !== Ge) && n.push(o != null ? Yt(r, { key: o }) : r);
  }
  if (l > 1) for (let i = 0; i < n.length; i++) n[i].patchFlag = -2;
  return n;
}
// @__NO_SIDE_EFFECTS__
function se(e, t) {
  return fe(e) ? Pe({ name: e.name }, t, { setup: e }) : e;
}
function Ni(e) {
  e.ids = [
    e.ids[0] + e.ids[2]++ + "-",
    0,
    0
  ];
}
function ll(e, t) {
  let a;
  return !!((a = Object.getOwnPropertyDescriptor(e, t)) && !a.configurable);
}
var Sn = /* @__PURE__ */ new WeakMap();
function Fa(e, t, a, n, l = !1) {
  if (ie(e)) {
    e.forEach((O, R) => Fa(O, t && (ie(t) ? t[R] : t), a, n, l));
    return;
  }
  if (ga(n) && !l) {
    n.shapeFlag & 512 && n.type.__asyncResolved && n.component.subTree.component && Fa(e, t, a, n.component.subTree);
    return;
  }
  const i = n.shapeFlag & 4 ? Kn(n.component) : n.el, r = l ? null : i, { i: o, r: d } = e, p = t && t.r, c = o.refs === xe ? o.refs = {} : o.refs, y = o.setupState, w = /* @__PURE__ */ ue(y), h = y === xe ? ei : (O) => ll(c, O) ? !1 : ye(w, O), T = (O, R) => !(R && ll(c, R));
  if (p != null && p !== d) {
    if (il(t), Me(p))
      c[p] = null, h(p) && (y[p] = null);
    else if (/* @__PURE__ */ ze(p)) {
      const O = t;
      T(p, O.k) && (p.value = null), O.k && (c[O.k] = null);
    }
  }
  if (fe(d)) an(d, o, 12, [r, c]);
  else {
    const O = Me(d), R = /* @__PURE__ */ ze(d);
    if (O || R) {
      const F = () => {
        if (e.f) {
          const q = O ? h(d) ? y[d] : c[d] : T(d) || !e.k ? d.value : c[e.k];
          if (l) ie(q) && Cs(q, i);
          else if (ie(q)) q.includes(i) || q.push(i);
          else if (O)
            c[d] = [i], h(d) && (y[d] = c[d]);
          else {
            const I = [i];
            T(d, e.k) && (d.value = I), e.k && (c[e.k] = I);
          }
        } else O ? (c[d] = r, h(d) && (y[d] = r)) : R && (T(d, e.k) && (d.value = r), e.k && (c[e.k] = r));
      };
      if (r) {
        const q = () => {
          F(), Sn.delete(e);
        };
        q.id = -1, Sn.set(e, q), Ze(q, a);
      } else
        il(e), F();
    }
  }
}
function il(e) {
  const t = Sn.get(e);
  t && (t.flags |= 8, Sn.delete(e));
}
var xw = Nn().requestIdleCallback || ((e) => setTimeout(e, 1)), Sw = Nn().cancelIdleCallback || ((e) => clearTimeout(e)), ga = (e) => !!e.type.__asyncLoader, Un = (e) => e.type.__isKeepAlive;
function Io(e, t) {
  Di(e, "a", t);
}
function Po(e, t) {
  Di(e, "da", t);
}
function Di(e, t, a = Ve) {
  const n = e.__wdc || (e.__wdc = () => {
    let l = a;
    for (; l; ) {
      if (l.isDeactivated) return;
      l = l.parent;
    }
    return e();
  });
  if (Fn(t, n, a), a) {
    let l = a.parent;
    for (; l && l.parent; )
      Un(l.parent.vnode) && Oo(n, t, a, l), l = l.parent;
  }
}
function Oo(e, t, a, n) {
  const l = Fn(t, e, n, !0);
  Sa(() => {
    Cs(n[t], l);
  }, a);
}
function Fn(e, t, a = Ve, n = !1) {
  if (a) {
    const l = a[e] || (a[e] = []), i = t.__weh || (t.__weh = (...r) => {
      Dt();
      const o = sn(a), d = vt(t, a, e, r);
      return o(), qt(), d;
    });
    return n ? l.unshift(i) : l.push(i), i;
  }
}
var Ft = (e) => (t, a = Ve) => {
  (!Xa || e === "sp") && Fn(e, (...n) => t(...n), a);
}, Ro = Ft("bm"), at = Ft("m"), Lo = Ft("bu"), Bo = Ft("u"), ot = Ft("bum"), Sa = Ft("um"), No = Ft("sp"), Do = Ft("rtg"), qo = Ft("rtc");
function Uo(e, t = Ve) {
  Fn("ec", e, t);
}
var qi = "components", Ui = /* @__PURE__ */ Symbol.for("v-ndc");
function Fo(e) {
  return Me(e) ? jo(qi, e, !1) || e : e || Ui;
}
function jo(e, t, a = !0, n = !1) {
  const l = De || Ve;
  if (l) {
    const i = l.type;
    if (e === qi) {
      const o = Tu(i, !1);
      if (o && (o === t || o === Je(t) || o === Ln(Je(t)))) return i;
    }
    const r = rl(l[e] || i[e], t) || rl(l.appContext[e], t);
    return !r && n ? i : r;
  }
}
function rl(e, t) {
  return e && (e[t] || e[Je(t)] || e[Ln(Je(t))]);
}
function de(e, t, a, n) {
  let l;
  const i = a && a[n], r = ie(e);
  if (r || Me(e)) {
    const o = r && /* @__PURE__ */ sa(e);
    let d = !1, p = !1;
    o && (d = !/* @__PURE__ */ ft(e), p = /* @__PURE__ */ Ut(e), e = Dn(e)), l = new Array(e.length);
    for (let c = 0, y = e.length; c < y; c++) l[c] = t(d ? p ? ba(mt(e[c])) : mt(e[c]) : e[c], c, void 0, i && i[c]);
  } else if (typeof e == "number") {
    l = new Array(e);
    for (let o = 0; o < e; o++) l[o] = t(o + 1, o, void 0, i && i[o]);
  } else if (ke(e)) if (e[Symbol.iterator]) l = Array.from(e, (o, d) => t(o, d, void 0, i && i[d]));
  else {
    const o = Object.keys(e);
    l = new Array(o.length);
    for (let d = 0, p = o.length; d < p; d++) {
      const c = o[d];
      l[d] = t(e[c], c, d, i && i[d]);
    }
  }
  else l = [];
  return a && (a[n] = l), l;
}
function Cn(e, t, a = {}, n, l) {
  if (De.ce || De.parent && ga(De.parent) && De.parent.ce) {
    const p = Object.keys(a).length > 0;
    return t !== "default" && (a.name = t), g(), pe(Z, null, [Se("slot", a, n && n())], p ? -2 : 64);
  }
  let i = e[t];
  i && i._c && (i._d = !1), g();
  const r = i && Fi(i(a)), o = a.key || r && r.key, d = pe(Z, { key: (o && !gt(o) ? o : `_${t}`) + (!r && n ? "_fb" : "") }, r || (n ? n() : []), r && e._ === 1 ? 64 : -2);
  return !l && d.scopeId && (d.slotScopeIds = [d.scopeId + "-s"]), i && i._c && (i._d = !0), d;
}
function Fi(e) {
  return e.some((t) => Ya(t) ? !(t.type === Ge || t.type === Z && !Fi(t.children)) : !0) ? e : null;
}
var ms = (e) => e ? rr(e) ? Kn(e) : ms(e.parent) : null, ja = /* @__PURE__ */ Pe(/* @__PURE__ */ Object.create(null), {
  $: (e) => e,
  $el: (e) => e.vnode.el,
  $data: (e) => e.data,
  $props: (e) => e.props,
  $attrs: (e) => e.attrs,
  $slots: (e) => e.slots,
  $refs: (e) => e.refs,
  $parent: (e) => ms(e.parent),
  $root: (e) => ms(e.root),
  $host: (e) => e.ce,
  $emit: (e) => e.emit,
  $options: (e) => Bs(e),
  $forceUpdate: (e) => e.f || (e.f = () => {
    Ls(e.update);
  }),
  $nextTick: (e) => e.n || (e.n = nn.bind(e.proxy)),
  $watch: (e) => _o.bind(e)
}), Qn = (e, t) => e !== xe && !e.__isScriptSetup && ye(e, t), Ho = {
  get({ _: e }, t) {
    if (t === "__v_skip") return !0;
    const { ctx: a, setupState: n, data: l, props: i, accessCache: r, type: o, appContext: d } = e;
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
        if (Qn(n, t))
          return r[t] = 1, n[t];
        if (l !== xe && ye(l, t))
          return r[t] = 2, l[t];
        if (ye(i, t))
          return r[t] = 3, i[t];
        if (a !== xe && ye(a, t))
          return r[t] = 4, a[t];
        bs && (r[t] = 0);
      }
    }
    const p = ja[t];
    let c, y;
    if (p)
      return t === "$attrs" && Ke(e.attrs, "get", ""), p(e);
    if ((c = o.__cssModules) && (c = c[t])) return c;
    if (a !== xe && ye(a, t))
      return r[t] = 4, a[t];
    if (y = d.config.globalProperties, ye(y, t)) return y[t];
  },
  set({ _: e }, t, a) {
    const { data: n, setupState: l, ctx: i } = e;
    return Qn(l, t) ? (l[t] = a, !0) : n !== xe && ye(n, t) ? (n[t] = a, !0) : ye(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = a, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: a, ctx: n, appContext: l, props: i, type: r } }, o) {
    let d;
    return !!(a[o] || e !== xe && o[0] !== "$" && ye(e, o) || Qn(t, o) || ye(i, o) || ye(n, o) || ye(ja, o) || ye(l.config.globalProperties, o) || (d = r.__cssModules) && d[o]);
  },
  defineProperty(e, t, a) {
    return a.get != null ? e._.accessCache[t] = 0 : ye(a, "value") && this.set(e, t, a.value, null), Reflect.defineProperty(e, t, a);
  }
};
function ol(e) {
  return ie(e) ? e.reduce((t, a) => (t[a] = null, t), {}) : e;
}
var bs = !0;
function Ko(e) {
  const t = Bs(e), a = e.proxy, n = e.ctx;
  bs = !1, t.beforeCreate && ul(t.beforeCreate, e, "bc");
  const { data: l, computed: i, methods: r, watch: o, provide: d, inject: p, created: c, beforeMount: y, mounted: w, beforeUpdate: h, updated: T, activated: O, deactivated: R, beforeDestroy: F, beforeUnmount: q, destroyed: I, unmounted: A, render: x, renderTracked: M, renderTriggered: S, errorCaptured: C, serverPrefetch: _, expose: G, inheritAttrs: ee, components: X, directives: J, filters: U } = t;
  if (p && Go(p, n, null), r) for (const oe in r) {
    const ge = r[oe];
    fe(ge) && (n[oe] = ge.bind(a));
  }
  if (l) {
    const oe = l.call(a, a);
    ke(oe) && (e.data = /* @__PURE__ */ _t(oe));
  }
  if (bs = !0, i) for (const oe in i) {
    const ge = i[oe], Ce = z({
      get: fe(ge) ? ge.bind(a, a) : fe(ge.get) ? ge.get.bind(a, a) : Ct,
      set: !fe(ge) && fe(ge.set) ? ge.set.bind(a) : Ct
    });
    Object.defineProperty(n, oe, {
      enumerable: !0,
      configurable: !0,
      get: () => Ce.value,
      set: (Ie) => Ce.value = Ie
    });
  }
  if (o) for (const oe in o) ji(o[oe], n, a, oe);
  if (d) {
    const oe = fe(d) ? d.call(a) : d;
    Reflect.ownKeys(oe).forEach((ge) => {
      xo(ge, oe[ge]);
    });
  }
  c && ul(c, e, "c");
  function ce(oe, ge) {
    ie(ge) ? ge.forEach((Ce) => oe(Ce.bind(a))) : ge && oe(ge.bind(a));
  }
  if (ce(Ro, y), ce(at, w), ce(Lo, h), ce(Bo, T), ce(Io, O), ce(Po, R), ce(Uo, C), ce(qo, M), ce(Do, S), ce(ot, q), ce(Sa, A), ce(No, _), ie(G))
    if (G.length) {
      const oe = e.exposed || (e.exposed = {});
      G.forEach((ge) => {
        Object.defineProperty(oe, ge, {
          get: () => a[ge],
          set: (Ce) => a[ge] = Ce,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  x && e.render === Ct && (e.render = x), ee != null && (e.inheritAttrs = ee), X && (e.components = X), J && (e.directives = J), _ && Ni(e);
}
function Go(e, t, a = Ct) {
  ie(e) && (e = hs(e));
  for (const n in e) {
    const l = e[n];
    let i;
    ke(l) ? "default" in l ? i = bn(l.from || n, l.default, !0) : i = bn(l.from || n) : i = bn(l), /* @__PURE__ */ ze(i) ? Object.defineProperty(t, n, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (r) => i.value = r
    }) : t[n] = i;
  }
}
function ul(e, t, a) {
  vt(ie(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy), t, a);
}
function ji(e, t, a, n) {
  let l = n.includes(".") ? Ei(a, n) : () => a[n];
  if (Me(e)) {
    const i = t[e];
    fe(i) && et(l, i);
  } else if (fe(e)) et(l, e.bind(a));
  else if (ke(e)) if (ie(e)) e.forEach((i) => ji(i, t, a, n));
  else {
    const i = fe(e.handler) ? e.handler.bind(a) : t[e.handler];
    fe(i) && et(l, i, e);
  }
}
function Bs(e) {
  const t = e.type, { mixins: a, extends: n } = t, { mixins: l, optionsCache: i, config: { optionMergeStrategies: r } } = e.appContext, o = i.get(t);
  let d;
  return o ? d = o : !l.length && !a && !n ? d = t : (d = {}, l.length && l.forEach((p) => _n(d, p, r, !0)), _n(d, t, r)), ke(t) && i.set(t, d), d;
}
function _n(e, t, a, n = !1) {
  const { mixins: l, extends: i } = t;
  i && _n(e, i, a, !0), l && l.forEach((r) => _n(e, r, a, !0));
  for (const r in t) if (!(n && r === "expose")) {
    const o = Vo[r] || a && a[r];
    e[r] = o ? o(e[r], t[r]) : t[r];
  }
  return e;
}
var Vo = {
  data: dl,
  props: cl,
  emits: cl,
  methods: La,
  computed: La,
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
  components: La,
  directives: La,
  watch: Wo,
  provide: dl,
  inject: zo
};
function dl(e, t) {
  return t ? e ? function() {
    return Pe(fe(e) ? e.call(this, this) : e, fe(t) ? t.call(this, this) : t);
  } : t : e;
}
function zo(e, t) {
  return La(hs(e), hs(t));
}
function hs(e) {
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
function La(e, t) {
  return e ? Pe(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function cl(e, t) {
  return e ? ie(e) && ie(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Pe(/* @__PURE__ */ Object.create(null), ol(e), ol(t ?? {})) : t;
}
function Wo(e, t) {
  if (!e) return t;
  if (!t) return e;
  const a = Pe(/* @__PURE__ */ Object.create(null), e);
  for (const n in t) a[n] = Ye(e[n], t[n]);
  return a;
}
function Hi() {
  return {
    app: null,
    config: {
      isNativeTag: ei,
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
var Yo = 0;
function Xo(e, t) {
  return function(n, l = null) {
    fe(n) || (n = Pe({}, n)), l != null && !ke(l) && (l = null);
    const i = Hi(), r = /* @__PURE__ */ new WeakSet(), o = [];
    let d = !1;
    const p = i.app = {
      _uid: Yo++,
      _component: n,
      _props: l,
      _container: null,
      _context: i,
      _instance: null,
      version: Eu,
      get config() {
        return i.config;
      },
      set config(c) {
      },
      use(c, ...y) {
        return r.has(c) || (c && fe(c.install) ? (r.add(c), c.install(p, ...y)) : fe(c) && (r.add(c), c(p, ...y))), p;
      },
      mixin(c) {
        return i.mixins.includes(c) || i.mixins.push(c), p;
      },
      component(c, y) {
        return y ? (i.components[c] = y, p) : i.components[c];
      },
      directive(c, y) {
        return y ? (i.directives[c] = y, p) : i.directives[c];
      },
      mount(c, y, w) {
        if (!d) {
          const h = p._ceVNode || Se(n, l);
          return h.appContext = i, w === !0 ? w = "svg" : w === !1 && (w = void 0), y && t ? t(h, c) : e(h, c, w), d = !0, p._container = c, c.__vue_app__ = p, Kn(h.component);
        }
      },
      onUnmount(c) {
        o.push(c);
      },
      unmount() {
        d && (vt(o, p._instance, 16), e(null, p._container), delete p._container.__vue_app__);
      },
      provide(c, y) {
        return i.provides[c] = y, p;
      },
      runWithContext(c) {
        const y = ma;
        ma = p;
        try {
          return c();
        } finally {
          ma = y;
        }
      }
    };
    return p;
  };
}
var ma = null, Jo = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Je(t)}Modifiers`] || e[`${Xt(t)}Modifiers`];
function Qo(e, t, ...a) {
  if (e.isUnmounted) return;
  const n = e.vnode.props || xe;
  let l = a;
  const i = t.startsWith("update:"), r = i && Jo(n, t.slice(7));
  r && (r.trim && (l = a.map((c) => Me(c) ? c.trim() : c)), r.number && (l = a.map(Bn)));
  let o, d = n[o = Vn(t)] || n[o = Vn(Je(t))];
  !d && i && (d = n[o = Vn(Xt(t))]), d && vt(d, e, 6, l);
  const p = n[o + "Once"];
  if (p) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[o]) return;
    e.emitted[o] = !0, vt(p, e, 6, l);
  }
}
var Zo = /* @__PURE__ */ new WeakMap();
function Ki(e, t, a = !1) {
  const n = a ? Zo : t.emitsCache, l = n.get(e);
  if (l !== void 0) return l;
  const i = e.emits;
  let r = {}, o = !1;
  if (!fe(e)) {
    const d = (p) => {
      const c = Ki(p, t, !0);
      c && (o = !0, Pe(r, c));
    };
    !a && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  return !i && !o ? (ke(e) && n.set(e, null), null) : (ie(i) ? i.forEach((d) => r[d] = null) : Pe(r, i), ke(e) && n.set(e, r), r);
}
function jn(e, t) {
  return !e || !Pn(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), ye(e, t[0].toLowerCase() + t.slice(1)) || ye(e, Xt(t)) || ye(e, t));
}
function Zn(e) {
  const { type: t, vnode: a, proxy: n, withProxy: l, propsOptions: [i], slots: r, attrs: o, emit: d, render: p, renderCache: c, props: y, data: w, setupState: h, ctx: T, inheritAttrs: O } = e, R = xn(e);
  let F, q;
  try {
    if (a.shapeFlag & 4) {
      const A = l || n, x = A;
      F = xt(p.call(x, A, c, y, h, w, T)), q = o;
    } else {
      const A = t;
      F = xt(A.length > 1 ? A(y, {
        attrs: o,
        slots: r,
        emit: d
      }) : A(y, null)), q = t.props ? o : eu(o);
    }
  } catch (A) {
    Ha.length = 0, qn(A, e, 1), F = Se(Ge);
  }
  let I = F;
  if (q && O !== !1) {
    const A = Object.keys(q), { shapeFlag: x } = I;
    A.length && x & 7 && (i && A.some(On) && (q = tu(q, i)), I = Yt(I, q, !1, !0));
  }
  return a.dirs && (I = Yt(I, null, !1, !0), I.dirs = I.dirs ? I.dirs.concat(a.dirs) : a.dirs), a.transition && za(I, a.transition), F = I, xn(R), F;
}
var eu = (e) => {
  let t;
  for (const a in e) (a === "class" || a === "style" || Pn(a)) && ((t || (t = {}))[a] = e[a]);
  return t;
}, tu = (e, t) => {
  const a = {};
  for (const n in e) (!On(n) || !(n.slice(9) in t)) && (a[n] = e[n]);
  return a;
};
function au(e, t, a) {
  const { props: n, children: l, component: i } = e, { props: r, children: o, patchFlag: d } = t, p = i.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (a && d >= 0) {
    if (d & 1024) return !0;
    if (d & 16)
      return n ? fl(n, r, p) : !!r;
    if (d & 8) {
      const c = t.dynamicProps;
      for (let y = 0; y < c.length; y++) {
        const w = c[y];
        if (Gi(r, n, w) && !jn(p, w)) return !0;
      }
    }
  } else
    return (l || o) && (!o || !o.$stable) ? !0 : n === r ? !1 : n ? r ? fl(n, r, p) : !0 : !!r;
  return !1;
}
function fl(e, t, a) {
  const n = Object.keys(t);
  if (n.length !== Object.keys(e).length) return !0;
  for (let l = 0; l < n.length; l++) {
    const i = n[l];
    if (Gi(t, e, i) && !jn(a, i)) return !0;
  }
  return !1;
}
function Gi(e, t, a) {
  const n = e[a], l = t[a];
  return a === "style" && ke(n) && ke(l) ? !xa(n, l) : n !== l;
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
var Vi = {}, zi = () => Object.create(Vi), Wi = (e) => Object.getPrototypeOf(e) === Vi;
function su(e, t, a, n = !1) {
  const l = {}, i = zi();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Yi(e, t, l, i);
  for (const r in e.propsOptions[0]) r in l || (l[r] = void 0);
  a ? e.props = n ? l : /* @__PURE__ */ co(l) : e.type.props ? e.props = l : e.props = i, e.attrs = i;
}
function lu(e, t, a, n) {
  const { props: l, attrs: i, vnode: { patchFlag: r } } = e, o = /* @__PURE__ */ ue(l), [d] = e.propsOptions;
  let p = !1;
  if ((n || r > 0) && !(r & 16)) {
    if (r & 8) {
      const c = e.vnode.dynamicProps;
      for (let y = 0; y < c.length; y++) {
        let w = c[y];
        if (jn(e.emitsOptions, w)) continue;
        const h = t[w];
        if (d) if (ye(i, w))
          h !== i[w] && (i[w] = h, p = !0);
        else {
          const T = Je(w);
          l[T] = ys(d, o, T, h, e, !1);
        }
        else h !== i[w] && (i[w] = h, p = !0);
      }
    }
  } else {
    Yi(e, t, l, i) && (p = !0);
    let c;
    for (const y in o) (!t || !ye(t, y) && ((c = Xt(y)) === y || !ye(t, c))) && (d ? a && (a[y] !== void 0 || a[c] !== void 0) && (l[y] = ys(d, o, y, void 0, e, !0)) : delete l[y]);
    if (i !== o)
      for (const y in i) (!t || !ye(t, y)) && (delete i[y], p = !0);
  }
  p && Lt(e.attrs, "set", "");
}
function Yi(e, t, a, n) {
  const [l, i] = e.propsOptions;
  let r = !1, o;
  if (t) for (let d in t) {
    if (Da(d)) continue;
    const p = t[d];
    let c;
    l && ye(l, c = Je(d)) ? !i || !i.includes(c) ? a[c] = p : (o || (o = {}))[c] = p : jn(e.emitsOptions, d) || (!(d in n) || p !== n[d]) && (n[d] = p, r = !0);
  }
  if (i) {
    const d = /* @__PURE__ */ ue(a), p = o || xe;
    for (let c = 0; c < i.length; c++) {
      const y = i[c];
      a[y] = ys(l, d, y, p[y], e, !ye(p, y));
    }
  }
  return r;
}
function ys(e, t, a, n, l, i) {
  const r = e[a];
  if (r != null) {
    const o = ye(r, "default");
    if (o && n === void 0) {
      const d = r.default;
      if (r.type !== Function && !r.skipFactory && fe(d)) {
        const { propsDefaults: p } = l;
        if (a in p) n = p[a];
        else {
          const c = sn(l);
          n = p[a] = d.call(null, t), c();
        }
      } else n = d;
      l.ce && l.ce._setProp(a, n);
    }
    r[0] && (i && !o ? n = !1 : r[1] && (n === "" || n === Xt(a)) && (n = !0));
  }
  return n;
}
var iu = /* @__PURE__ */ new WeakMap();
function Xi(e, t, a = !1) {
  const n = a ? iu : t.propsCache, l = n.get(e);
  if (l) return l;
  const i = e.props, r = {}, o = [];
  let d = !1;
  if (!fe(e)) {
    const c = (y) => {
      d = !0;
      const [w, h] = Xi(y, t, !0);
      Pe(r, w), h && o.push(...h);
    };
    !a && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  if (!i && !d)
    return ke(e) && n.set(e, fa), fa;
  if (ie(i)) for (let c = 0; c < i.length; c++) {
    const y = Je(i[c]);
    vl(y) && (r[y] = xe);
  }
  else if (i) for (const c in i) {
    const y = Je(c);
    if (vl(y)) {
      const w = i[c], h = r[y] = ie(w) || fe(w) ? { type: w } : Pe({}, w), T = h.type;
      let O = !1, R = !0;
      if (ie(T)) for (let F = 0; F < T.length; ++F) {
        const q = T[F], I = fe(q) && q.name;
        if (I === "Boolean") {
          O = !0;
          break;
        } else I === "String" && (R = !1);
      }
      else O = fe(T) && T.name === "Boolean";
      h[0] = O, h[1] = R, (O || ye(h, "default")) && o.push(y);
    }
  }
  const p = [r, o];
  return ke(e) && n.set(e, p), p;
}
function vl(e) {
  return e[0] !== "$" && !Da(e);
}
var Ns = (e) => e === "_" || e === "_ctx" || e === "$stable", Ds = (e) => ie(e) ? e.map(xt) : [xt(e)], ru = (e, t, a) => {
  if (t._n) return t;
  const n = la((...l) => Ds(t(...l)), a);
  return n._c = !1, n;
}, Ji = (e, t, a) => {
  const n = e._ctx;
  for (const l in e) {
    if (Ns(l)) continue;
    const i = e[l];
    if (fe(i)) t[l] = ru(l, i, n);
    else if (i != null) {
      const r = Ds(i);
      t[l] = () => r;
    }
  }
}, Qi = (e, t) => {
  const a = Ds(t);
  e.slots.default = () => a;
}, Zi = (e, t, a) => {
  for (const n in t) (a || !Ns(n)) && (e[n] = t[n]);
}, ou = (e, t, a) => {
  const n = e.slots = zi();
  if (e.vnode.shapeFlag & 32) {
    const l = t._;
    l ? (Zi(n, t, a), a && si(n, "_", l, !0)) : Ji(t, n);
  } else t && Qi(e, t);
}, uu = (e, t, a) => {
  const { vnode: n, slots: l } = e;
  let i = !0, r = xe;
  if (n.shapeFlag & 32) {
    const o = t._;
    o ? a && o === 1 ? i = !1 : Zi(l, t, a) : (i = !t.$stable, Ji(t, l)), r = t;
  } else t && (Qi(e, t), r = { default: 1 });
  if (i)
    for (const o in l) !Ns(o) && r[o] == null && delete l[o];
}, Ze = pu;
function du(e) {
  return cu(e);
}
function cu(e, t) {
  const a = Nn();
  a.__VUE__ = !0;
  const { insert: n, remove: l, patchProp: i, createElement: r, createText: o, createComment: d, setText: p, setElementText: c, parentNode: y, nextSibling: w, setScopeId: h = Ct, insertStaticContent: T } = e, O = (u, f, $, P = null, N = null, B = null, E = void 0, k = null, L = !!f.dynamicChildren) => {
    if (u === f) return;
    u && !aa(u, f) && (P = H(u), Re(u, N, B, !0), u = null), f.patchFlag === -2 && (L = !1, f.dynamicChildren = null);
    const { type: D, ref: Y, shapeFlag: V } = f;
    switch (D) {
      case Hn:
        R(u, f, $, P);
        break;
      case Ge:
        F(u, f, $, P);
        break;
      case hn:
        u == null && q(f, $, P, E);
        break;
      case Z:
        X(u, f, $, P, N, B, E, k, L);
        break;
      default:
        V & 1 ? x(u, f, $, P, N, B, E, k, L) : V & 6 ? J(u, f, $, P, N, B, E, k, L) : (V & 64 || V & 128) && D.process(u, f, $, P, N, B, E, k, L, Qe);
    }
    Y != null && N ? Fa(Y, u && u.ref, B, f || u, !f) : Y == null && u && u.ref != null && Fa(u.ref, null, B, u, !0);
  }, R = (u, f, $, P) => {
    if (u == null) n(f.el = o(f.children), $, P);
    else {
      const N = f.el = u.el;
      f.children !== u.children && p(N, f.children);
    }
  }, F = (u, f, $, P) => {
    u == null ? n(f.el = d(f.children || ""), $, P) : f.el = u.el;
  }, q = (u, f, $, P) => {
    [u.el, u.anchor] = T(u.children, f, $, P, u.el, u.anchor);
  }, I = ({ el: u, anchor: f }, $, P) => {
    let N;
    for (; u && u !== f; )
      N = w(u), n(u, $, P), u = N;
    n(f, $, P);
  }, A = ({ el: u, anchor: f }) => {
    let $;
    for (; u && u !== f; )
      $ = w(u), l(u), u = $;
    l(f);
  }, x = (u, f, $, P, N, B, E, k, L) => {
    if (f.type === "svg" ? E = "svg" : f.type === "math" && (E = "mathml"), u == null) M(f, $, P, N, B, E, k, L);
    else {
      const D = u.el && u.el._isVueCE ? u.el : null;
      try {
        D && D._beginPatch(), _(u, f, N, B, E, k, L);
      } finally {
        D && D._endPatch();
      }
    }
  }, M = (u, f, $, P, N, B, E, k) => {
    let L, D;
    const { props: Y, shapeFlag: V, transition: Q, dirs: ae } = u;
    if (L = u.el = r(u.type, B, Y && Y.is, Y), V & 8 ? c(L, u.children) : V & 16 && C(u.children, L, null, P, N, es(u, B), E, k), ae && Jt(u, null, P, "created"), S(L, u, u.scopeId, E, P), Y) {
      for (const be in Y) be !== "value" && !Da(be) && i(L, be, null, Y[be], B, P);
      "value" in Y && i(L, "value", null, Y.value, B), (D = Y.onVnodeBeforeMount) && ht(D, P, u);
    }
    ae && Jt(u, null, P, "beforeMount");
    const ve = fu(N, Q);
    ve && Q.beforeEnter(L), n(L, f, $), ((D = Y && Y.onVnodeMounted) || ve || ae) && Ze(() => {
      D && ht(D, P, u), ve && Q.enter(L), ae && Jt(u, null, P, "mounted");
    }, N);
  }, S = (u, f, $, P, N) => {
    if ($ && h(u, $), P) for (let B = 0; B < P.length; B++) h(u, P[B]);
    if (N) {
      let B = N.subTree;
      if (f === B || nr(B.type) && (B.ssContent === f || B.ssFallback === f)) {
        const E = N.vnode;
        S(u, E, E.scopeId, E.slotScopeIds, N.parent);
      }
    }
  }, C = (u, f, $, P, N, B, E, k, L = 0) => {
    for (let D = L; D < u.length; D++) O(null, u[D] = k ? Rt(u[D]) : xt(u[D]), f, $, P, N, B, E, k);
  }, _ = (u, f, $, P, N, B, E) => {
    const k = f.el = u.el;
    let { patchFlag: L, dynamicChildren: D, dirs: Y } = f;
    L |= u.patchFlag & 16;
    const V = u.props || xe, Q = f.props || xe;
    let ae;
    if ($ && Qt($, !1), (ae = Q.onVnodeBeforeUpdate) && ht(ae, $, f, u), Y && Jt(f, u, $, "beforeUpdate"), $ && Qt($, !0), (V.innerHTML && Q.innerHTML == null || V.textContent && Q.textContent == null) && c(k, ""), D ? G(u.dynamicChildren, D, k, $, P, es(f, N), B) : E || ge(u, f, k, null, $, P, es(f, N), B, !1), L > 0) {
      if (L & 16) ee(k, V, Q, $, N);
      else if (L & 2 && V.class !== Q.class && i(k, "class", null, Q.class, N), L & 4 && i(k, "style", V.style, Q.style, N), L & 8) {
        const ve = f.dynamicProps;
        for (let be = 0; be < ve.length; be++) {
          const he = ve[be], we = V[he], $e = Q[he];
          ($e !== we || he === "value") && i(k, he, we, $e, N, $);
        }
      }
      L & 1 && u.children !== f.children && c(k, f.children);
    } else !E && D == null && ee(k, V, Q, $, N);
    ((ae = Q.onVnodeUpdated) || Y) && Ze(() => {
      ae && ht(ae, $, f, u), Y && Jt(f, u, $, "updated");
    }, P);
  }, G = (u, f, $, P, N, B, E) => {
    for (let k = 0; k < f.length; k++) {
      const L = u[k], D = f[k];
      O(L, D, L.el && (L.type === Z || !aa(L, D) || L.shapeFlag & 198) ? y(L.el) : $, null, P, N, B, E, !0);
    }
  }, ee = (u, f, $, P, N) => {
    if (f !== $) {
      if (f !== xe)
        for (const B in f) !Da(B) && !(B in $) && i(u, B, f[B], null, N, P);
      for (const B in $) {
        if (Da(B)) continue;
        const E = $[B], k = f[B];
        E !== k && B !== "value" && i(u, B, k, E, N, P);
      }
      "value" in $ && i(u, "value", f.value, $.value, N);
    }
  }, X = (u, f, $, P, N, B, E, k, L) => {
    const D = f.el = u ? u.el : o(""), Y = f.anchor = u ? u.anchor : o("");
    let { patchFlag: V, dynamicChildren: Q, slotScopeIds: ae } = f;
    ae && (k = k ? k.concat(ae) : ae), u == null ? (n(D, $, P), n(Y, $, P), C(f.children || [], $, Y, N, B, E, k, L)) : V > 0 && V & 64 && Q && u.dynamicChildren && u.dynamicChildren.length === Q.length ? (G(u.dynamicChildren, Q, $, N, B, E, k), (f.key != null || N && f === N.subTree) && er(u, f, !0)) : ge(u, f, $, Y, N, B, E, k, L);
  }, J = (u, f, $, P, N, B, E, k, L) => {
    f.slotScopeIds = k, u == null ? f.shapeFlag & 512 ? N.ctx.activate(f, $, P, E, L) : U(f, $, P, N, B, E, L) : le(u, f, L);
  }, U = (u, f, $, P, N, B, E) => {
    const k = u.component = $u(u, P, N);
    if (Un(u) && (k.ctx.renderer = Qe), xu(k, !1, E), k.asyncDep) {
      if (N && N.registerDep(k, ce, E), !u.el) {
        const L = k.subTree = Se(Ge);
        F(null, L, f, $), u.placeholder = L.el;
      }
    } else ce(k, u, f, $, N, B, E);
  }, le = (u, f, $) => {
    const P = f.component = u.component;
    if (au(u, f, $)) if (P.asyncDep && !P.asyncResolved) {
      oe(P, f, $);
      return;
    } else
      P.next = f, P.update();
    else
      f.el = u.el, P.vnode = f;
  }, ce = (u, f, $, P, N, B, E) => {
    const k = () => {
      if (u.isMounted) {
        let { next: V, bu: Q, u: ae, parent: ve, vnode: be } = u;
        {
          const Ue = tr(u);
          if (Ue) {
            V && (V.el = be.el, oe(u, V, E)), Ue.asyncDep.then(() => {
              Ze(() => {
                u.isUnmounted || D();
              }, N);
            });
            return;
          }
        }
        let he = V, we;
        Qt(u, !1), V ? (V.el = be.el, oe(u, V, E)) : V = be, Q && mn(Q), (we = V.props && V.props.onVnodeBeforeUpdate) && ht(we, ve, V, be), Qt(u, !0);
        const $e = Zn(u), We = u.subTree;
        u.subTree = $e, O(We, $e, y(We.el), H(We), u, N, B), V.el = $e.el, he === null && nu(u, $e.el), ae && Ze(ae, N), (we = V.props && V.props.onVnodeUpdated) && Ze(() => ht(we, ve, V, be), N);
      } else {
        let V;
        const { el: Q, props: ae } = f, { bm: ve, m: be, parent: he, root: we, type: $e } = u, We = ga(f);
        if (Qt(u, !1), ve && mn(ve), !We && (V = ae && ae.onVnodeBeforeMount) && ht(V, he, f), Qt(u, !0), Q && v) {
          const Ue = () => {
            u.subTree = Zn(u), v(Q, u.subTree, u, N, null);
          };
          We && $e.__asyncHydrate ? $e.__asyncHydrate(Q, u, Ue) : Ue();
        } else {
          we.ce && we.ce._hasShadowRoot() && we.ce._injectChildStyle($e, u.parent ? u.parent.type : void 0);
          const Ue = u.subTree = Zn(u);
          O(null, Ue, $, P, u, N, B), f.el = Ue.el;
        }
        if (be && Ze(be, N), !We && (V = ae && ae.onVnodeMounted)) {
          const Ue = f;
          Ze(() => ht(V, he, Ue), N);
        }
        (f.shapeFlag & 256 || he && ga(he.vnode) && he.vnode.shapeFlag & 256) && u.a && Ze(u.a, N), u.isMounted = !0, f = $ = P = null;
      }
    };
    u.scope.on();
    const L = u.effect = new ui(k);
    u.scope.off();
    const D = u.update = L.run.bind(L), Y = u.job = L.runIfDirty.bind(L);
    Y.i = u, Y.id = u.uid, L.scheduler = () => Ls(Y), Qt(u, !0), D();
  }, oe = (u, f, $) => {
    f.component = u;
    const P = u.vnode.props;
    u.vnode = f, u.next = null, lu(u, f.props, P, $), uu(u, f.children, $), Dt(), nl(u), qt();
  }, ge = (u, f, $, P, N, B, E, k, L = !1) => {
    const D = u && u.children, Y = u ? u.shapeFlag : 0, V = f.children, { patchFlag: Q, shapeFlag: ae } = f;
    if (Q > 0) {
      if (Q & 128) {
        Ie(D, V, $, P, N, B, E, k, L);
        return;
      } else if (Q & 256) {
        Ce(D, V, $, P, N, B, E, k, L);
        return;
      }
    }
    ae & 8 ? (Y & 16 && W(D, N, B), V !== D && c($, V)) : Y & 16 ? ae & 16 ? Ie(D, V, $, P, N, B, E, k, L) : W(D, N, B, !0) : (Y & 8 && c($, ""), ae & 16 && C(V, $, P, N, B, E, k, L));
  }, Ce = (u, f, $, P, N, B, E, k, L) => {
    u = u || fa, f = f || fa;
    const D = u.length, Y = f.length, V = Math.min(D, Y);
    let Q;
    for (Q = 0; Q < V; Q++) {
      const ae = f[Q] = L ? Rt(f[Q]) : xt(f[Q]);
      O(u[Q], ae, $, null, N, B, E, k, L);
    }
    D > Y ? W(u, N, B, !0, !1, V) : C(f, $, P, N, B, E, k, L, V);
  }, Ie = (u, f, $, P, N, B, E, k, L) => {
    let D = 0;
    const Y = f.length;
    let V = u.length - 1, Q = Y - 1;
    for (; D <= V && D <= Q; ) {
      const ae = u[D], ve = f[D] = L ? Rt(f[D]) : xt(f[D]);
      if (aa(ae, ve)) O(ae, ve, $, null, N, B, E, k, L);
      else break;
      D++;
    }
    for (; D <= V && D <= Q; ) {
      const ae = u[V], ve = f[Q] = L ? Rt(f[Q]) : xt(f[Q]);
      if (aa(ae, ve)) O(ae, ve, $, null, N, B, E, k, L);
      else break;
      V--, Q--;
    }
    if (D > V) {
      if (D <= Q) {
        const ae = Q + 1, ve = ae < Y ? f[ae].el : P;
        for (; D <= Q; )
          O(null, f[D] = L ? Rt(f[D]) : xt(f[D]), $, ve, N, B, E, k, L), D++;
      }
    } else if (D > Q) for (; D <= V; )
      Re(u[D], N, B, !0), D++;
    else {
      const ae = D, ve = D, be = /* @__PURE__ */ new Map();
      for (D = ve; D <= Q; D++) {
        const Fe = f[D] = L ? Rt(f[D]) : xt(f[D]);
        Fe.key != null && be.set(Fe.key, D);
      }
      let he, we = 0;
      const $e = Q - ve + 1;
      let We = !1, Ue = 0;
      const jt = new Array($e);
      for (D = 0; D < $e; D++) jt[D] = 0;
      for (D = ae; D <= V; D++) {
        const Fe = u[D];
        if (we >= $e) {
          Re(Fe, N, B, !0);
          continue;
        }
        let st;
        if (Fe.key != null) st = be.get(Fe.key);
        else for (he = ve; he <= Q; he++) if (jt[he - ve] === 0 && aa(Fe, f[he])) {
          st = he;
          break;
        }
        st === void 0 ? Re(Fe, N, B, !0) : (jt[st - ve] = D + 1, st >= Ue ? Ue = st : We = !0, O(Fe, f[st], $, null, N, B, E, k, L), we++);
      }
      const _a = We ? vu(jt) : fa;
      for (he = _a.length - 1, D = $e - 1; D >= 0; D--) {
        const Fe = ve + D, st = f[Fe], ia = f[Fe + 1], Ta = Fe + 1 < Y ? ia.el || ar(ia) : P;
        jt[D] === 0 ? O(null, st, $, Ta, N, B, E, k, L) : We && (he < 0 || D !== _a[he] ? nt(st, $, Ta, 2) : he--);
      }
    }
  }, nt = (u, f, $, P, N = null) => {
    const { el: B, type: E, transition: k, children: L, shapeFlag: D } = u;
    if (D & 6) {
      nt(u.component.subTree, f, $, P);
      return;
    }
    if (D & 128) {
      u.suspense.move(f, $, P);
      return;
    }
    if (D & 64) {
      E.move(u, f, $, Qe);
      return;
    }
    if (E === Z) {
      n(B, f, $);
      for (let Y = 0; Y < L.length; Y++) nt(L[Y], f, $, P);
      n(u.anchor, f, $);
      return;
    }
    if (E === hn) {
      I(u, f, $);
      return;
    }
    if (P !== 2 && D & 1 && k) if (P === 0) k.persisted && !B[ct] ? n(B, f, $) : (k.beforeEnter(B), n(B, f, $), Ze(() => k.enter(B), N));
    else {
      const { leave: Y, delayLeave: V, afterLeave: Q } = k, ae = () => {
        u.ctx.isUnmounted ? l(B) : n(B, f, $);
      }, ve = () => {
        const be = B._isLeaving || !!B[ct];
        B._isLeaving && B[ct](!0), k.persisted && !be ? ae() : Y(B, () => {
          ae(), Q && Q();
        });
      };
      V ? V(B, ae, ve) : ve();
    }
    else n(B, f, $);
  }, Re = (u, f, $, P = !1, N = !1) => {
    const { type: B, props: E, ref: k, children: L, dynamicChildren: D, shapeFlag: Y, patchFlag: V, dirs: Q, cacheIndex: ae, memo: ve } = u;
    if (V === -2 && (N = !1), k != null && (Dt(), Fa(k, null, $, u, !0), qt()), ae != null && (f.renderCache[ae] = void 0), Y & 256) {
      f.ctx.deactivate(u);
      return;
    }
    const be = Y & 1 && Q, he = !ga(u);
    let we;
    if (he && (we = E && E.onVnodeBeforeUnmount) && ht(we, f, u), Y & 6) bt(u.component, $, P);
    else {
      if (Y & 128) {
        u.suspense.unmount($, P);
        return;
      }
      be && Jt(u, null, f, "beforeUnmount"), Y & 64 ? u.type.remove(u, f, $, Qe, P) : D && !D.hasOnce && (B !== Z || V > 0 && V & 64) ? W(D, f, $, !1, !0) : (B === Z && V & 384 || !N && Y & 16) && W(L, f, $), P && Le(u);
    }
    const $e = ve != null && ae == null;
    (he && (we = E && E.onVnodeUnmounted) || be || $e) && Ze(() => {
      we && ht(we, f, u), be && Jt(u, null, f, "unmounted"), $e && (u.el = null);
    }, $);
  }, Le = (u) => {
    const { type: f, el: $, anchor: P, transition: N } = u;
    if (f === Z) {
      Mt($, P);
      return;
    }
    if (f === hn) {
      A(u);
      return;
    }
    const B = () => {
      l($), N && !N.persisted && N.afterLeave && N.afterLeave();
    };
    if (u.shapeFlag & 1 && N && !N.persisted) {
      const { leave: E, delayLeave: k } = N, L = () => E($, B);
      k ? k(u.el, B, L) : L();
    } else B();
  }, Mt = (u, f) => {
    let $;
    for (; u !== f; )
      $ = w(u), l(u), u = $;
    l(f);
  }, bt = (u, f, $) => {
    const { bum: P, scope: N, job: B, subTree: E, um: k, m: L, a: D } = u;
    pl(L), pl(D), P && mn(P), N.stop(), B && (B.flags |= 8, Re(E, u, f, $)), k && Ze(k, f), Ze(() => {
      u.isUnmounted = !0;
    }, f);
  }, W = (u, f, $, P = !1, N = !1, B = 0) => {
    for (let E = B; E < u.length; E++) Re(u[E], f, $, P, N);
  }, H = (u) => {
    if (u.shapeFlag & 6) return H(u.component.subTree);
    if (u.shapeFlag & 128) return u.suspense.next();
    const f = w(u.anchor || u.el), $ = f && f[To];
    return $ ? w($) : f;
  };
  let ne = !1;
  const Ee = (u, f, $) => {
    let P;
    u == null ? f._vnode && (Re(f._vnode, null, null, !0), P = f._vnode.component) : O(f._vnode || null, u, f, null, null, null, $), f._vnode = u, ne || (ne = !0, nl(P), _i(), ne = !1);
  }, Qe = {
    p: O,
    um: Re,
    m: nt,
    r: Le,
    mt: U,
    mc: C,
    pc: ge,
    pbc: G,
    n: H,
    o: e
  };
  let qe, v;
  return t && ([qe, v] = t(Qe)), {
    render: Ee,
    hydrate: qe,
    createApp: Xo(Ee, qe)
  };
}
function es({ type: e, props: t }, a) {
  return a === "svg" && e === "foreignObject" || a === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : a;
}
function Qt({ effect: e, job: t }, a) {
  a ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function fu(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function er(e, t, a = !1) {
  const n = e.children, l = t.children;
  if (ie(n) && ie(l)) for (let i = 0; i < n.length; i++) {
    const r = n[i];
    let o = l[i];
    o.shapeFlag & 1 && !o.dynamicChildren && ((o.patchFlag <= 0 || o.patchFlag === 32) && (o = l[i] = Rt(l[i]), o.el = r.el), !a && o.patchFlag !== -2 && er(r, o)), o.type === Hn && (o.patchFlag === -1 && (o = l[i] = Rt(o)), o.el = r.el), o.type === Ge && !o.el && (o.el = r.el);
  }
}
function vu(e) {
  const t = e.slice(), a = [0];
  let n, l, i, r, o;
  const d = e.length;
  for (n = 0; n < d; n++) {
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
function tr(e) {
  const t = e.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : tr(t);
}
function pl(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
function ar(e) {
  if (e.placeholder) return e.placeholder;
  const t = e.component;
  return t ? ar(t.subTree) : null;
}
var nr = (e) => e.__isSuspense;
function pu(e, t) {
  t && t.pendingBranch ? ie(e) ? t.effects.push(...e) : t.effects.push(e) : $o(e);
}
var Z = /* @__PURE__ */ Symbol.for("v-fgt"), Hn = /* @__PURE__ */ Symbol.for("v-txt"), Ge = /* @__PURE__ */ Symbol.for("v-cmt"), hn = /* @__PURE__ */ Symbol.for("v-stc"), Ha = [], rt = null;
function g(e = !1) {
  Ha.push(rt = e ? null : []);
}
function gu() {
  Ha.pop(), rt = Ha[Ha.length - 1] || null;
}
var Wa = 1;
function Tn(e, t = !1) {
  Wa += e, e < 0 && rt && t && (rt.hasOnce = !0);
}
function sr(e) {
  return e.dynamicChildren = Wa > 0 ? rt || fa : null, gu(), Wa > 0 && rt && rt.push(e), e;
}
function b(e, t, a, n, l, i) {
  return sr(s(e, t, a, n, l, i, !0));
}
function pe(e, t, a, n, l) {
  return sr(Se(e, t, a, n, l, !0));
}
function Ya(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function aa(e, t) {
  return e.type === t.type && e.key === t.key;
}
var lr = ({ key: e }) => e ?? null, yn = ({ ref: e, ref_key: t, ref_for: a }) => (typeof e == "number" && (e = "" + e), e != null ? Me(e) || /* @__PURE__ */ ze(e) || fe(e) ? {
  i: De,
  r: e,
  k: t,
  f: !!a
} : e : null);
function s(e, t = null, a = null, n = 0, l = null, i = e === Z ? 0 : 1, r = !1, o = !1) {
  const d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && lr(t),
    ref: t && yn(t),
    scopeId: Ai,
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
    ctx: De
  };
  return o ? (qs(d, a), i & 128 && e.normalize(d)) : a && (d.shapeFlag |= Me(a) ? 8 : 16), Wa > 0 && !r && rt && (d.patchFlag > 0 || i & 6) && d.patchFlag !== 32 && rt.push(d), d;
}
var Se = mu;
function mu(e, t = null, a = null, n = 0, l = null, i = !1) {
  if ((!e || e === Ui) && (e = Ge), Ya(e)) {
    const o = Yt(e, t, !0);
    return a && qs(o, a), Wa > 0 && !i && rt && (o.shapeFlag & 6 ? rt[rt.indexOf(e)] = o : rt.push(o)), o.patchFlag = -2, o;
  }
  if (Au(e) && (e = e.__vccOpts), t) {
    t = bu(t);
    let { class: o, style: d } = t;
    o && !Me(o) && (t.class = te(o)), ke(d) && (/* @__PURE__ */ Rs(d) && !ie(d) && (d = Pe({}, d)), t.style = Tt(d));
  }
  const r = Me(e) ? 1 : nr(e) ? 128 : Ii(e) ? 64 : ke(e) ? 4 : fe(e) ? 2 : 0;
  return s(e, t, a, n, l, r, i, !0);
}
function bu(e) {
  return e ? /* @__PURE__ */ Rs(e) || Wi(e) ? Pe({}, e) : e : null;
}
function Yt(e, t, a = !1, n = !1) {
  const { props: l, ref: i, patchFlag: r, children: o, transition: d } = e, p = t ? yu(l || {}, t) : l, c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: p,
    key: p && lr(p),
    ref: t && t.ref ? a && i ? ie(i) ? i.concat(yn(t)) : [i, yn(t)] : yn(t) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: o,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Z ? r === -1 ? 16 : r | 16 : r,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: d,
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
  return d && n && za(c, d.clone(c)), c;
}
function re(e = " ", t = 0) {
  return Se(Hn, null, e, t);
}
function hu(e, t) {
  const a = Se(hn, null, e);
  return a.staticCount = t, a;
}
function j(e = "", t = !1) {
  return t ? (g(), pe(Ge, null, e)) : Se(Ge, null, e);
}
function xt(e) {
  return e == null || typeof e == "boolean" ? Se(Ge) : ie(e) ? Se(Z, null, e.slice()) : Ya(e) ? Rt(e) : Se(Hn, null, String(e));
}
function Rt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Yt(e);
}
function qs(e, t) {
  let a = 0;
  const { shapeFlag: n } = e;
  if (t == null) t = null;
  else if (ie(t)) a = 16;
  else if (typeof t == "object") if (n & 65) {
    const l = t.default;
    l && (l._c && (l._d = !1), qs(e, l()), l._c && (l._d = !0));
    return;
  } else {
    a = 32;
    const l = t._;
    !l && !Wi(t) ? t._ctx = De : l === 3 && De && (De.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
  }
  else fe(t) ? (t = {
    default: t,
    _ctx: De
  }, a = 32) : (t = String(t), n & 64 ? (a = 16, t = [re(t)]) : a = 8);
  e.children = t, e.shapeFlag |= a;
}
function yu(...e) {
  const t = {};
  for (let a = 0; a < e.length; a++) {
    const n = e[a];
    for (const l in n) if (l === "class")
      t.class !== n.class && (t.class = te([t.class, n.class]));
    else if (l === "style") t.style = Tt([t.style, n.style]);
    else if (Pn(l)) {
      const i = t[l], r = n[l];
      r && i !== r && !(ie(i) && i.includes(r)) ? t[l] = i ? [].concat(i, r) : r : r == null && i == null && !On(l) && (t[l] = r);
    } else l !== "" && (t[l] = n[l]);
  }
  return t;
}
function ht(e, t, a, n = null) {
  vt(e, t, 7, [a, n]);
}
var ku = Hi(), wu = 0;
function $u(e, t, a) {
  const n = e.type, l = (t ? t.appContext : e.appContext) || ku, i = {
    uid: wu++,
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
    propsOptions: Xi(n, l),
    emitsOptions: Ki(n, l),
    emit: null,
    emitted: null,
    propsDefaults: xe,
    inheritAttrs: n.inheritAttrs,
    ctx: xe,
    data: xe,
    props: xe,
    attrs: xe,
    slots: xe,
    refs: xe,
    setupState: xe,
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
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = Qo.bind(null, i), e.ce && e.ce(i), i;
}
var Ve = null, ir = () => Ve || De, An, ks;
{
  const e = Nn(), t = (a, n) => {
    let l;
    return (l = e[a]) || (l = e[a] = []), l.push(n), (i) => {
      l.length > 1 ? l.forEach((r) => r(i)) : l[0](i);
    };
  };
  An = t("__VUE_INSTANCE_SETTERS__", (a) => Ve = a), ks = t("__VUE_SSR_SETTERS__", (a) => Xa = a);
}
var sn = (e) => {
  const t = Ve;
  return An(e), e.scope.on(), () => {
    e.scope.off(), An(t);
  };
}, gl = () => {
  Ve && Ve.scope.off(), An(null);
};
function rr(e) {
  return e.vnode.shapeFlag & 4;
}
var Xa = !1;
function xu(e, t = !1, a = !1) {
  t && ks(t);
  const { props: n, children: l } = e.vnode, i = rr(e);
  su(e, n, i, t), ou(e, l, a || t);
  const r = i ? Su(e, t) : void 0;
  return t && ks(!1), r;
}
function Su(e, t) {
  const a = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Ho);
  const { setup: n } = a;
  if (n) {
    Dt();
    const l = e.setupContext = n.length > 1 ? _u(e) : null, i = sn(e), r = an(n, e, 0, [e.props, l]), o = ti(r);
    if (qt(), i(), (o || e.sp) && !ga(e) && Ni(e), o) {
      if (r.then(gl, gl), t) return r.then((d) => {
        ml(e, d, t);
      }).catch((d) => {
        qn(d, e, 0);
      });
      e.asyncDep = r;
    } else ml(e, r, t);
  } else or(e, t);
}
function ml(e, t, a) {
  fe(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ke(t) && (e.setupState = xi(t)), or(e, a);
}
var bl, hl;
function or(e, t, a) {
  const n = e.type;
  if (!e.render) {
    if (!t && bl && !n.render) {
      const l = n.template || Bs(e).template;
      if (l) {
        const { isCustomElement: i, compilerOptions: r } = e.appContext.config, { delimiters: o, compilerOptions: d } = n, p = Pe(Pe({
          isCustomElement: i,
          delimiters: o
        }, r), d);
        n.render = bl(l, p);
      }
    }
    e.render = n.render || Ct, hl && hl(e);
  }
  {
    const l = sn(e);
    Dt();
    try {
      Ko(e);
    } finally {
      qt(), l();
    }
  }
}
var Cu = { get(e, t) {
  return Ke(e, "get", ""), e[t];
} };
function _u(e) {
  const t = (a) => {
    e.exposed = a || {};
  };
  return {
    attrs: new Proxy(e.attrs, Cu),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Kn(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(xi(fo(e.exposed)), {
    get(t, a) {
      if (a in t) return t[a];
      if (a in ja) return ja[a](e);
    },
    has(t, a) {
      return a in t || a in ja;
    }
  })) : e.proxy;
}
function Tu(e, t = !0) {
  return fe(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Au(e) {
  return fe(e) && "__vccOpts" in e;
}
var z = (e, t) => /* @__PURE__ */ bo(e, t, Xa);
function Mu(e, t, a) {
  try {
    Tn(-1);
    const n = arguments.length;
    return n === 2 ? ke(t) && !ie(t) ? Ya(t) ? Se(e, null, [t]) : Se(e, t) : Se(e, null, t) : (n > 3 ? a = Array.prototype.slice.call(arguments, 2) : n === 3 && Ya(a) && (a = [a]), Se(e, t, a));
  } finally {
    Tn(1);
  }
}
var Eu = "3.5.35", ws = void 0, yl = typeof window < "u" && window.trustedTypes;
if (yl) try {
  ws = /* @__PURE__ */ yl.createPolicy("vue", { createHTML: (e) => e });
} catch {
}
var ur = ws ? (e) => ws.createHTML(e) : (e) => e, Iu = "http://www.w3.org/2000/svg", Pu = "http://www.w3.org/1998/Math/MathML", Pt = typeof document < "u" ? document : null, kl = Pt && /* @__PURE__ */ Pt.createElement("template"), Ou = {
  insert: (e, t, a) => {
    t.insertBefore(e, a || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, a, n) => {
    const l = t === "svg" ? Pt.createElementNS(Iu, e) : t === "mathml" ? Pt.createElementNS(Pu, e) : a ? Pt.createElement(e, { is: a }) : Pt.createElement(e);
    return e === "select" && n && n.multiple != null && l.setAttribute("multiple", n.multiple), l;
  },
  createText: (e) => Pt.createTextNode(e),
  createComment: (e) => Pt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Pt.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  insertStaticContent(e, t, a, n, l, i) {
    const r = a ? a.previousSibling : t.lastChild;
    if (l && (l === i || l.nextSibling)) for (; t.insertBefore(l.cloneNode(!0), a), !(l === i || !(l = l.nextSibling)); )
      ;
    else {
      kl.innerHTML = ur(n === "svg" ? `<svg>${e}</svg>` : n === "mathml" ? `<math>${e}</math>` : e);
      const o = kl.content;
      if (n === "svg" || n === "mathml") {
        const d = o.firstChild;
        for (; d.firstChild; ) o.appendChild(d.firstChild);
        o.removeChild(d);
      }
      t.insertBefore(o, a);
    }
    return [r ? r.nextSibling : t.firstChild, a ? a.previousSibling : t.lastChild];
  }
}, Kt = "transition", Ea = "animation", Ja = /* @__PURE__ */ Symbol("_vtc"), dr = {
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
}, Ru = /* @__PURE__ */ Pe({}, Pi, dr), Lu = (e) => (e.displayName = "Transition", e.props = Ru, e), cr = /* @__PURE__ */ Lu((e, { slots: t }) => Mu(Eo, Bu(e), t)), Zt = (e, t = []) => {
  ie(e) ? e.forEach((a) => a(...t)) : e && e(...t);
}, wl = (e) => e ? ie(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function Bu(e) {
  const t = {};
  for (const X in e) X in dr || (t[X] = e[X]);
  if (e.css === !1) return t;
  const { name: a = "v", type: n, duration: l, enterFromClass: i = `${a}-enter-from`, enterActiveClass: r = `${a}-enter-active`, enterToClass: o = `${a}-enter-to`, appearFromClass: d = i, appearActiveClass: p = r, appearToClass: c = o, leaveFromClass: y = `${a}-leave-from`, leaveActiveClass: w = `${a}-leave-active`, leaveToClass: h = `${a}-leave-to` } = e, T = Nu(l), O = T && T[0], R = T && T[1], { onBeforeEnter: F, onEnter: q, onEnterCancelled: I, onLeave: A, onLeaveCancelled: x, onBeforeAppear: M = F, onAppear: S = q, onAppearCancelled: C = I } = t, _ = (X, J, U, le) => {
    X._enterCancelled = le, ea(X, J ? c : o), ea(X, J ? p : r), U && U();
  }, G = (X, J) => {
    X._isLeaving = !1, ea(X, y), ea(X, h), ea(X, w), J && J();
  }, ee = (X) => (J, U) => {
    const le = X ? S : q, ce = () => _(J, X, U);
    Zt(le, [J, ce]), $l(() => {
      ea(J, X ? d : i), It(J, X ? c : o), wl(le) || xl(J, n, O, ce);
    });
  };
  return Pe(t, {
    onBeforeEnter(X) {
      Zt(F, [X]), It(X, i), It(X, r);
    },
    onBeforeAppear(X) {
      Zt(M, [X]), It(X, d), It(X, p);
    },
    onEnter: ee(!1),
    onAppear: ee(!0),
    onLeave(X, J) {
      X._isLeaving = !0;
      const U = () => G(X, J);
      It(X, y), X._enterCancelled ? (It(X, w), _l(X)) : (_l(X), It(X, w)), $l(() => {
        X._isLeaving && (ea(X, y), It(X, h), wl(A) || xl(X, n, R, U));
      }), Zt(A, [X, U]);
    },
    onEnterCancelled(X) {
      _(X, !1, void 0, !0), Zt(I, [X]);
    },
    onAppearCancelled(X) {
      _(X, !0, void 0, !0), Zt(C, [X]);
    },
    onLeaveCancelled(X) {
      G(X), Zt(x, [X]);
    }
  });
}
function Nu(e) {
  if (e == null) return null;
  if (ke(e)) return [ts(e.enter), ts(e.leave)];
  {
    const t = ts(e);
    return [t, t];
  }
}
function ts(e) {
  return Dr(e);
}
function It(e, t) {
  t.split(/\s+/).forEach((a) => a && e.classList.add(a)), (e[Ja] || (e[Ja] = /* @__PURE__ */ new Set())).add(t);
}
function ea(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.remove(n));
  const a = e[Ja];
  a && (a.delete(t), a.size || (e[Ja] = void 0));
}
function $l(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
var Du = 0;
function xl(e, t, a, n) {
  const l = e._endId = ++Du, i = () => {
    l === e._endId && n();
  };
  if (a != null) return setTimeout(i, a);
  const { type: r, timeout: o, propCount: d } = qu(e, t);
  if (!r) return n();
  const p = r + "end";
  let c = 0;
  const y = () => {
    e.removeEventListener(p, w), i();
  }, w = (h) => {
    h.target === e && ++c >= d && y();
  };
  setTimeout(() => {
    c < d && y();
  }, o + 1), e.addEventListener(p, w);
}
function qu(e, t) {
  const a = window.getComputedStyle(e), n = (T) => (a[T] || "").split(", "), l = n(`${Kt}Delay`), i = n(`${Kt}Duration`), r = Sl(l, i), o = n(`${Ea}Delay`), d = n(`${Ea}Duration`), p = Sl(o, d);
  let c = null, y = 0, w = 0;
  t === Kt ? r > 0 && (c = Kt, y = r, w = i.length) : t === Ea ? p > 0 && (c = Ea, y = p, w = d.length) : (y = Math.max(r, p), c = y > 0 ? r > p ? Kt : Ea : null, w = c ? c === Kt ? i.length : d.length : 0);
  const h = c === Kt && /\b(?:transform|all)(?:,|$)/.test(n(`${Kt}Property`).toString());
  return {
    type: c,
    timeout: y,
    propCount: w,
    hasTransform: h
  };
}
function Sl(e, t) {
  for (; e.length < t.length; ) e = e.concat(e);
  return Math.max(...t.map((a, n) => Cl(a) + Cl(e[n])));
}
function Cl(e) {
  return e === "auto" ? 0 : Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function _l(e) {
  return (e ? e.ownerDocument : document).body.offsetHeight;
}
function Uu(e, t, a) {
  const n = e[Ja];
  n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : a ? e.setAttribute("class", t) : e.className = t;
}
var Mn = /* @__PURE__ */ Symbol("_vod"), fr = /* @__PURE__ */ Symbol("_vsh"), Fu = {
  name: "show",
  beforeMount(e, { value: t }, { transition: a }) {
    e[Mn] = e.style.display === "none" ? "" : e.style.display, a && t ? a.beforeEnter(e) : Ia(e, t);
  },
  mounted(e, { value: t }, { transition: a }) {
    a && t && a.enter(e);
  },
  updated(e, { value: t, oldValue: a }, { transition: n }) {
    !t != !a && (n ? t ? (n.beforeEnter(e), Ia(e, !0), n.enter(e)) : n.leave(e, () => {
      Ia(e, !1);
    }) : Ia(e, t));
  },
  beforeUnmount(e, { value: t }) {
    Ia(e, t);
  }
};
function Ia(e, t) {
  e.style.display = t ? e[Mn] : "none", e[fr] = !t;
}
var ju = /* @__PURE__ */ Symbol(""), Hu = /(?:^|;)\s*display\s*:/;
function Ku(e, t, a) {
  const n = e.style, l = Me(a);
  let i = !1;
  if (a && !l) {
    if (t) if (Me(t))
      for (const r of t.split(";")) {
        const o = r.slice(0, r.indexOf(":")).trim();
        a[o] == null && Ba(n, o, "");
      }
    else for (const r in t) a[r] == null && Ba(n, r, "");
    for (const r in a) {
      r === "display" && (i = !0);
      const o = a[r];
      o != null ? Vu(e, r, !Me(t) && t ? t[r] : void 0, o) || Ba(n, r, o) : Ba(n, r, "");
    }
  } else if (l) {
    if (t !== a) {
      const r = n[ju];
      r && (a += ";" + r), n.cssText = a, i = Hu.test(a);
    }
  } else t && e.removeAttribute("style");
  Mn in e && (e[Mn] = i ? n.display : "", e[fr] && (n.display = "none"));
}
var Tl = /\s*!important$/;
function Ba(e, t, a) {
  if (ie(a)) a.forEach((n) => Ba(e, t, n));
  else if (a == null && (a = ""), t.startsWith("--")) e.setProperty(t, a);
  else {
    const n = Gu(e, t);
    Tl.test(a) ? e.setProperty(Xt(n), a.replace(Tl, ""), "important") : e[n] = a;
  }
}
var Al = [
  "Webkit",
  "Moz",
  "ms"
], as = {};
function Gu(e, t) {
  const a = as[t];
  if (a) return a;
  let n = Je(t);
  if (n !== "filter" && n in e) return as[t] = n;
  n = Ln(n);
  for (let l = 0; l < Al.length; l++) {
    const i = Al[l] + n;
    if (i in e) return as[t] = i;
  }
  return t;
}
function Vu(e, t, a, n) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && Me(n) && a === n;
}
var Ml = "http://www.w3.org/1999/xlink";
function El(e, t, a, n, l, i = Hr(t)) {
  n && t.startsWith("xlink:") ? a == null ? e.removeAttributeNS(Ml, t.slice(6, t.length)) : e.setAttributeNS(Ml, t, a) : a == null || i && !ii(a) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : gt(a) ? String(a) : a);
}
function Il(e, t, a, n, l) {
  if (t === "innerHTML" || t === "textContent") {
    a != null && (e[t] = t === "innerHTML" ? ur(a) : a);
    return;
  }
  const i = e.tagName;
  if (t === "value" && i !== "PROGRESS" && !i.includes("-")) {
    const o = i === "OPTION" ? e.getAttribute("value") || "" : e.value, d = a == null ? e.type === "checkbox" ? "on" : "" : String(a);
    (o !== d || !("_value" in e)) && (e.value = d), a == null && e.removeAttribute(t), e._value = a;
    return;
  }
  let r = !1;
  if (a === "" || a == null) {
    const o = typeof e[t];
    o === "boolean" ? a = ii(a) : a == null && o === "string" ? (a = "", r = !0) : o === "number" && (a = 0, r = !0);
  }
  try {
    e[t] = a;
  } catch {
  }
  r && e.removeAttribute(l || t);
}
function zt(e, t, a, n) {
  e.addEventListener(t, a, n);
}
function zu(e, t, a, n) {
  e.removeEventListener(t, a, n);
}
var Pl = /* @__PURE__ */ Symbol("_vei");
function Wu(e, t, a, n, l = null) {
  const i = e[Pl] || (e[Pl] = {}), r = i[t];
  if (n && r) r.value = n;
  else {
    const [o, d] = Yu(t);
    n ? zt(e, o, i[t] = Qu(n, l), d) : r && (zu(e, o, r, d), i[t] = void 0);
  }
}
var Ol = /(?:Once|Passive|Capture)$/;
function Yu(e) {
  let t;
  if (Ol.test(e)) {
    t = {};
    let a;
    for (; a = e.match(Ol); )
      e = e.slice(0, e.length - a[0].length), t[a[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Xt(e.slice(2)), t];
}
var ns = 0, Xu = /* @__PURE__ */ Promise.resolve(), Ju = () => ns || (Xu.then(() => ns = 0), ns = Date.now());
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
      for (let d = 0; d < r.length && !n._stopped; d++) {
        const p = r[d];
        p && vt(p, t, 5, o);
      }
    } else vt(l, t, 5, [n]);
  };
  return a.value = e, a.attached = Ju(), a;
}
var Rl = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Zu = (e, t, a, n, l, i) => {
  const r = l === "svg";
  t === "class" ? Uu(e, n, r) : t === "style" ? Ku(e, a, n) : Pn(t) ? On(t) || Wu(e, t, a, n, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : ed(e, t, n, r)) ? (Il(e, t, n), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && El(e, t, n, r, i, t !== "value")) : e._isVueCE && (td(e, t) || e._def.__asyncLoader && (/[A-Z]/.test(t) || !Me(n))) ? Il(e, Je(t), n, i, t) : (t === "true-value" ? e._trueValue = n : t === "false-value" && (e._falseValue = n), El(e, t, n, r));
};
function ed(e, t, a, n) {
  if (n)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Rl(t) && fe(a));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA") return !1;
  if (t === "width" || t === "height") {
    const l = e.tagName;
    if (l === "IMG" || l === "VIDEO" || l === "CANVAS" || l === "SOURCE") return !1;
  }
  return Rl(t) && Me(a) ? !1 : t in e;
}
function td(e, t) {
  const a = e._def.props;
  if (!a) return !1;
  const n = Je(t);
  return Array.isArray(a) ? a.some((l) => Je(l) === n) : Object.keys(a).some((l) => Je(l) === n);
}
var ha = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return ie(t) ? (a) => mn(t, a) : t;
};
function ad(e) {
  e.target.composing = !0;
}
function Ll(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
var Nt = /* @__PURE__ */ Symbol("_assign");
function Bl(e, t, a) {
  return t && (e = e.trim()), a && (e = Bn(e)), e;
}
var Be = {
  created(e, { modifiers: { lazy: t, trim: a, number: n } }, l) {
    e[Nt] = ha(l);
    const i = n || l.props && l.props.type === "number";
    zt(e, t ? "change" : "input", (r) => {
      r.target.composing || e[Nt](Bl(e.value, a, i));
    }), (a || i) && zt(e, "change", () => {
      e.value = Bl(e.value, a, i);
    }), t || (zt(e, "compositionstart", ad), zt(e, "compositionend", Ll), zt(e, "change", Ll));
  },
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: a, modifiers: { lazy: n, trim: l, number: i } }, r) {
    if (e[Nt] = ha(r), e.composing) return;
    const o = (i || e.type === "number") && !/^0\d/.test(e.value) ? Bn(e.value) : e.value, d = t ?? "";
    if (o === d) return;
    const p = e.getRootNode();
    (p instanceof Document || p instanceof ShadowRoot) && p.activeElement === e && e.type !== "range" && (n && t === a || l && e.value.trim() === d) || (e.value = d);
  }
}, Pa = {
  deep: !0,
  created(e, t, a) {
    e[Nt] = ha(a), zt(e, "change", () => {
      const n = e._modelValue, l = Qa(e), i = e.checked, r = e[Nt];
      if (ie(n)) {
        const o = Ts(n, l), d = o !== -1;
        if (i && !d) r(n.concat(l));
        else if (!i && d) {
          const p = [...n];
          p.splice(o, 1), r(p);
        }
      } else if ($a(n)) {
        const o = new Set(n);
        i ? o.add(l) : o.delete(l), r(o);
      } else r(vr(e, i));
    });
  },
  mounted: Nl,
  beforeUpdate(e, t, a) {
    e[Nt] = ha(a), Nl(e, t, a);
  }
};
function Nl(e, { value: t, oldValue: a }, n) {
  e._modelValue = t;
  let l;
  if (ie(t)) l = Ts(t, n.props.value) > -1;
  else if ($a(t)) l = t.has(n.props.value);
  else {
    if (t === a) return;
    l = xa(t, vr(e, !0));
  }
  e.checked !== l && (e.checked = l);
}
var nd = {
  deep: !0,
  created(e, { value: t, modifiers: { number: a } }, n) {
    const l = $a(t);
    zt(e, "change", () => {
      const i = Array.prototype.filter.call(e.options, (r) => r.selected).map((r) => a ? Bn(Qa(r)) : Qa(r));
      e[Nt](e.multiple ? l ? new Set(i) : i : i[0]), e._assigning = !0, nn(() => {
        e._assigning = !1;
      });
    }), e[Nt] = ha(n);
  },
  mounted(e, { value: t }) {
    Dl(e, t);
  },
  beforeUpdate(e, t, a) {
    e[Nt] = ha(a);
  },
  updated(e, { value: t }) {
    e._assigning || Dl(e, t);
  }
};
function Dl(e, t) {
  const a = e.multiple, n = ie(t);
  if (!(a && !n && !$a(t))) {
    for (let l = 0, i = e.options.length; l < i; l++) {
      const r = e.options[l], o = Qa(r);
      if (a) if (n) {
        const d = typeof o;
        d === "string" || d === "number" ? r.selected = t.some((p) => String(p) === String(o)) : r.selected = Ts(t, o) > -1;
      } else r.selected = t.has(o);
      else if (xa(Qa(r), t)) {
        e.selectedIndex !== l && (e.selectedIndex = l);
        return;
      }
    }
    !a && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function Qa(e) {
  return "_value" in e ? e._value : e.value;
}
function vr(e, t) {
  const a = t ? "_trueValue" : "_falseValue";
  return a in e ? e[a] : t;
}
var sd = [
  "ctrl",
  "shift",
  "alt",
  "meta"
], ld = {
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
  exact: (e, t) => sd.some((a) => e[`${a}Key`] && !t.includes(a))
}, tt = (e, t) => {
  if (!e) return e;
  const a = e._withMods || (e._withMods = {}), n = t.join(".");
  return a[n] || (a[n] = ((l, ...i) => {
    for (let r = 0; r < t.length; r++) {
      const o = ld[t[r]];
      if (o && o(l, t)) return;
    }
    return e(l, ...i);
  }));
}, id = {
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
    const i = Xt(l.key);
    if (t.some((r) => r === i || id[r] === i)) return e(l);
  }));
}, rd = /* @__PURE__ */ Pe({ patchProp: Zu }, Ou), ql;
function od() {
  return ql || (ql = du(rd));
}
var ud = ((...e) => {
  const t = od().createApp(...e), { mount: a } = t;
  return t.mount = (n) => {
    const l = cd(n);
    if (!l) return;
    const i = t._component;
    !fe(i) && !i.render && !i.template && (i.template = l.innerHTML), l.nodeType === 1 && (l.textContent = "");
    const r = a(l, !1, dd(l));
    return l instanceof Element && (l.removeAttribute("v-cloak"), l.setAttribute("data-v-app", "")), r;
  }, t;
});
function dd(e) {
  if (e instanceof SVGElement) return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function cd(e) {
  return Me(e) ? document.querySelector(e) : e;
}
var fd = Object.freeze({
  id: "agent-api",
  name: "Agent API",
  accent: "#63d8c6"
}), vd = "https://api.tavily.com";
function pd(e = "") {
  return String(e || "").trim();
}
function wt(e = "") {
  return String(e || "").trim().replace(/\/+$/, "") || "https://api.tavily.com";
}
var Cw = Object.freeze([
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
function gd(e = "") {
  return e === "on" || e === "off" ? e : "inherit";
}
function md(e) {
  return String(e ?? "").trim().toLowerCase() || void 0;
}
function bd(e) {
  if (e == null || e === "") return;
  const t = Number(e);
  return Number.isFinite(t) ? Math.floor(t) : void 0;
}
function ya(e = {}) {
  const t = e && typeof e == "object" ? e : {}, a = md(t.effort), n = bd(t.budgetTokens);
  return {
    mode: gd(t.mode),
    ...a ? { effort: a } : {},
    ...n !== void 0 ? { budgetTokens: n } : {}
  };
}
var gr = "openai-compatible", Us = "默认", mr = "default", hd = "deny", Ot = 32e3, yd = Object.freeze([{
  value: "default",
  label: "默认权限"
}, {
  value: "full",
  label: "完全权限"
}]), kd = Object.freeze([{
  value: "deny",
  label: "禁止"
}, {
  value: "allow",
  label: "允许"
}]), $s = {
  "openai-responses": {
    baseUrl: "https://api.openai.com/v1",
    model: "gpt-4.1-mini",
    apiKey: "",
    temperature: 1,
    maxTokens: Ot,
    sendTemperature: !0
  },
  "openai-compatible": {
    baseUrl: "https://api.openai.com/v1",
    model: "gpt-4o-mini",
    apiKey: "",
    temperature: 1,
    maxTokens: Ot,
    sendTemperature: !0,
    toolMode: "native"
  },
  "sillytavern-openai-compatible": {
    baseUrl: "",
    model: "gpt-4o-mini",
    apiKey: "",
    temperature: 1,
    maxTokens: Ot,
    sendTemperature: !0,
    toolMode: "native"
  },
  "sillytavern-claude": {
    baseUrl: "",
    model: "claude-sonnet-4-0",
    apiKey: "",
    temperature: 1,
    maxTokens: Ot,
    sendTemperature: !0
  },
  "sillytavern-google": {
    baseUrl: "",
    model: "gemini-2.5-pro",
    apiKey: "",
    temperature: 1,
    maxTokens: Ot,
    sendTemperature: !0
  },
  anthropic: {
    baseUrl: "https://api.anthropic.com",
    model: "claude-sonnet-4-0",
    apiKey: "",
    temperature: 1,
    maxTokens: Ot,
    sendTemperature: !0
  },
  google: {
    baseUrl: "https://generativelanguage.googleapis.com/v1beta",
    model: "gemini-2.5-pro",
    apiKey: "",
    temperature: 1,
    maxTokens: Ot,
    sendTemperature: !0
  }
};
function br() {
  return JSON.parse(JSON.stringify($s));
}
function it() {
  return {
    provider: gr,
    modelConfigs: br(),
    permissionMode: mr
  };
}
function hr(e = it()) {
  const t = e && typeof e == "object" ? e : it();
  return {
    provider: Fs(t.provider),
    modelConfigs: lt(t.modelConfigs || {})
  };
}
function ca(e) {
  return e === "full" ? "full" : mr;
}
function Gt(e) {
  return e === "allow" ? "allow" : hd;
}
function He(e, t = Ot) {
  const a = Number(e);
  if (!Number.isFinite(a) || a <= 0) {
    const n = Number(t);
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : Ot;
  }
  return Math.min(Number.MAX_SAFE_INTEGER, Math.floor(a));
}
function Oe(e) {
  return String(e || "").trim() || "默认";
}
function lt(e = {}) {
  const t = br();
  return Object.keys($s).forEach((a) => {
    const n = e && typeof e[a] == "object" ? e[a] : {}, l = $s[a];
    t[a] = {
      baseUrl: String(n.baseUrl ?? l.baseUrl ?? ""),
      model: String(n.model ?? l.model ?? ""),
      apiKey: String(n.apiKey ?? l.apiKey ?? ""),
      temperature: n.temperature ?? l.temperature,
      maxTokens: He(n.maxTokens, l.maxTokens),
      sendTemperature: typeof n.sendTemperature == "boolean" ? n.sendTemperature : l.sendTemperature,
      ..."toolMode" in l ? { toolMode: String(n.toolMode || l.toolMode || "native") } : {},
      reasoning: ya(n.reasoning)
    };
  }), t;
}
function Fs(e) {
  return typeof e == "string" && e.trim() ? e : gr;
}
function js(e = {}, t) {
  return e && typeof e.presets == "object" && e.presets ? e.presets : e?.modelConfigs ? { [t]: {
    provider: e.provider || "openai-compatible",
    modelConfigs: e.modelConfigs,
    permissionMode: e.permissionMode
  } } : {};
}
function wd(e = {}, t) {
  const a = {}, n = js(e, t);
  return Object.entries(n).forEach(([l, i]) => {
    if (!i || typeof i != "object") return;
    const r = Oe(l);
    a[r] = {
      provider: Fs(i.provider),
      modelConfigs: lt(i.modelConfigs || {}),
      permissionMode: ca(i.permissionMode)
    };
  }), Object.keys(a).length || (a[Us] = it()), a;
}
function $d(e, t) {
  const a = Oe(t);
  return e[a] ? a : Object.keys(e)[0];
}
function xd(e, t, a) {
  const n = Oe(t || a);
  return e[n] ? n : e[a] ? a : Object.keys(e)[0];
}
function yr(e = {}, t = it()) {
  const a = hr(t), n = e && typeof e == "object" ? e : {};
  return {
    provider: Fs(n.provider || a.provider),
    modelConfigs: lt(n.modelConfigs || a.modelConfigs)
  };
}
function Sd(e = {}, t = {}, a = Us, n = a) {
  if (e?.delegateConfigured === !1) return !1;
  if (n !== a) return !0;
  const l = e?.delegateConfig;
  if (!l || typeof l != "object" || Array.isArray(l) || !(typeof l.provider == "string" && l.provider.trim() || l.modelConfigs && typeof l.modelConfigs == "object" && Object.keys(l.modelConfigs).length)) return !1;
  if (e?.delegateConfigured === !0) return !0;
  const i = t[a] || it(), r = hr(i), o = yr(l, i);
  return JSON.stringify(o) !== JSON.stringify(r);
}
function Cd(e = {}, t, a, n, l) {
  const i = l(e?.[n]);
  if (i) return i;
  const r = js(e, t), o = [
    a,
    t,
    e?.currentPresetName,
    e?.delegatePresetName,
    ...Object.keys(r || {})
  ].map(Oe), d = /* @__PURE__ */ new Set();
  for (const p of o) {
    if (d.has(p)) continue;
    d.add(p);
    const c = l(r?.[p]?.[n]);
    if (c) return c;
  }
  return l(e?.delegateConfig?.[n]);
}
function _d(e = {}, t, a) {
  const n = (o) => String(o || "").trim();
  if (n(e?.tavilyBaseUrl)) return wt(e.tavilyBaseUrl);
  const l = js(e, t), i = [
    a,
    t,
    e?.currentPresetName,
    e?.delegatePresetName,
    ...Object.keys(l || {})
  ].map(Oe), r = /* @__PURE__ */ new Set();
  for (const o of i) {
    if (r.has(o)) continue;
    r.add(o);
    const d = l?.[o]?.tavilyBaseUrl;
    if (n(d)) return wt(d);
  }
  return n(e?.delegateConfig?.tavilyBaseUrl) ? wt(e.delegateConfig.tavilyBaseUrl) : vd;
}
function Td(e = {}, t, a) {
  return {
    tavilyApiKey: Cd(e, t, a, "tavilyApiKey", pd),
    tavilyBaseUrl: _d(e, t, a)
  };
}
function En(e = {}) {
  const t = Oe(e.currentPresetName || e.presetDraftName || "默认"), a = wd(e, t), n = $d(a, e.currentPresetName), l = xd(a, e.delegatePresetName, n), i = a[n] || it(), r = a[l] || i, o = yr(e.delegateConfig, r), d = Sd(e, a, n, l), p = Td(e, t, n);
  return {
    workspaceFileName: String(e.workspaceFileName || ""),
    updatedAt: Number(e.updatedAt) || 0,
    jsApiPermission: Gt(e.jsApiPermission),
    currentPresetName: n,
    delegatePresetName: l,
    delegateConfig: o,
    delegateConfigured: d,
    presetDraftName: Oe(e.presetDraftName || n),
    presetNames: Object.keys(a),
    presets: a,
    provider: i.provider,
    modelConfigs: i.modelConfigs,
    permissionMode: ca(i.permissionMode),
    tavilyApiKey: p.tavilyApiKey,
    tavilyBaseUrl: p.tavilyBaseUrl
  };
}
async function Ad(e, t) {
  const a = e.body?.getReader?.();
  if (!a) throw new Error("host_chat_completions_stream_missing_body");
  const n = new TextDecoder();
  let l = "";
  const i = /\r?\n\r?\n/, r = (d) => {
    const p = d.split(/\r?\n/).filter((c) => c.startsWith("data:")).map((c) => c.slice(5).trimStart()).join(`
`).trim();
    !p || p === "[DONE]" || t(JSON.parse(p));
  };
  for (; ; ) {
    const { done: d, value: p } = await a.read();
    if (d) break;
    for (l += n.decode(p, { stream: !0 }); ; ) {
      const c = l.match(i);
      if (!c || typeof c.index != "number") break;
      const y = l.slice(0, c.index);
      l = l.slice(c.index + c[0].length), r(y);
    }
  }
  const o = l.trim();
  o && r(o);
}
function Md(e = "") {
  return String(e || "").trim().toLowerCase();
}
function Ed(e = "") {
  const t = Md(e);
  return t.includes("deepseek") ? "deepseek" : t.includes("kimi") || t.includes("moonshot") ? "kimi" : t.includes("gemini") ? "gemini" : t.includes("claude") ? "claude" : /(?:^|[/_.-])gpt(?:\d|[/_.-]|$)/.test(t) || /(?:^|[/_.-])o\d+(?:[/_.-]|$)/.test(t) ? "openai" : "";
}
var Ca = "openai", kr = "claude", wr = "makersuite", Id = "/api/backends/chat-completions/status", Pd = "/api/backends/chat-completions/generate", $r = Object.freeze({
  [kr]: "https://api.anthropic.com/v1",
  [wr]: "https://generativelanguage.googleapis.com"
}), ln = null;
function Od(e) {
  return String(e || "").trim().replace(/\/+$/, "");
}
function Rd(e, t) {
  const a = Od(e);
  return t === "claude" ? !a || /\/v\d[\w.-]*$/i.test(a) ? a : `${a}/v1` : t === "makersuite" ? a.replace(/\/v\d[\w.-]*$/i, "") : a;
}
async function xr(e = ln) {
  if (typeof e != "function") throw new Error("宿主请求头未注册，无法调用酒馆后端。");
  return {
    "Content-Type": "application/json",
    ...await Promise.resolve(e() || {}),
    Accept: "application/json"
  };
}
function Ld(e = {}) {
  const t = {};
  return Object.entries(e || {}).forEach(([a, n]) => {
    t[a] = /authorization|cookie|csrf|token|api[-_]?key/i.test(a) ? "[redacted]" : n;
  }), t;
}
async function Hs(e = {}, t = !1, a = ln) {
  const n = await xr(a), l = {
    url: Pd,
    method: "POST",
    headers: Ld(n),
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
async function Bd(e = {}, t = !1) {
  return await Hs(e, t);
}
function Nd(e = "") {
  return /^\s*(?:<!DOCTYPE\s+html\b|<html\b)/i.test(String(e || ""));
}
function Dd(e = "") {
  return /invalid csrf token/i.test(String(e || ""));
}
function qd() {
  return "酒馆当前页面的 CSRF token 已失效，请按 F5 刷新并重新进入酒馆后再试。";
}
function Ul(e = "", t = 10) {
  const a = Number.parseInt(String(e || ""), t);
  return Number.isInteger(a) && a >= 0 && a <= 1114111 ? String.fromCodePoint(a) : "";
}
function Fl(e = "") {
  return String(e || "").replace(/&nbsp;|&#160;/gi, " ").replace(/&amp;/gi, "&").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&quot;/gi, '"').replace(/&#39;|&apos;/gi, "'").replace(/&#x([0-9a-f]+);?/gi, (t, a) => Ul(a, 16)).replace(/&#([0-9]+);?/g, (t, a) => Ul(a));
}
function Ud(e = "") {
  const t = String(e || ""), a = Fl((t.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "").replace(/\s+/g, " ").trim(), n = Fl(t.replace(/<script\b[\s\S]*?<\/script>/gi, " ").replace(/<style\b[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim(), l = a || n;
  return l.length > 240 ? `${l.slice(0, 237)}...` : l;
}
function Fd(e = null) {
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
function jd(e = {}) {
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
function ka(e = "", t = "", a = null) {
  if (Dd(e)) return qd();
  const n = Fd(a);
  if (Nd(e) || /\btext\/html\b/i.test(n.contentType)) {
    const l = jd(n), i = Ud(e);
    return [
      "酒馆后端返回了非 JSON 的 HTML 页面",
      l ? `（${l}）` : "",
      i ? `：${i}` : ""
    ].join("");
  }
  return Hd(e) || String(e || t || "").trim();
}
function Kd(e = {}, t = Ca) {
  const a = Rd(e.baseUrl, t), n = String(e.apiKey || "").trim(), l = $r[t] || "", i = a || (n ? l : ""), r = { chat_completion_source: t || "openai" };
  return i && (r.reverse_proxy = i), n && (r.proxy_password = n), r;
}
function Gd(e = {}, t = Ca) {
  return Kd(e, t);
}
function Ks(e) {
  const t = e || globalThis.fetch;
  if (typeof t != "function") throw new Error("当前运行环境没有可用的 fetch，无法调用酒馆后端。");
  return t;
}
async function Vd(e = {}, t = Ca, a = {}, n = {}) {
  const l = await Ks(n.fetch)(Id, {
    method: "POST",
    headers: await xr(n.requestHeadersProvider),
    body: JSON.stringify(Gd(e, t)),
    signal: a.signal
  }), i = await l.text();
  let r = null;
  try {
    r = i ? JSON.parse(i) : {};
  } catch (d) {
    throw new Error(`酒馆后端模型列表拉取失败：${ka(i, String(d?.message || d), l)}`);
  }
  if (!l.ok || r?.error) {
    const d = ka(r?.message || r?.error?.message || i, `HTTP ${l.status}`, l);
    throw new Error(`酒馆后端模型列表拉取失败：${d}`);
  }
  const o = Array.isArray(r?.data) ? r.data.map((d) => String(d?.id || d?.name || "").trim()).filter(Boolean) : [];
  return [...new Set(o)];
}
async function Gs(e = {}, t = Ca, a = {}) {
  return await Vd(e, t, a, { requestHeadersProvider: ln });
}
async function zd(e = {}, t = {}) {
  return await Gs(e, Ca, t);
}
async function Wd(e = {}, t = {}, a = {}) {
  const n = await Hs(e, !1, a.requestHeadersProvider);
  typeof t.onRequest == "function" && t.onRequest(n);
  const l = await Ks(a.fetch)(n.url, {
    method: n.method,
    headers: n.rawHeaders || n.headers,
    body: JSON.stringify(n.body),
    signal: t.signal
  }), i = await l.text();
  let r = null;
  try {
    r = i ? JSON.parse(i) : {};
  } catch (o) {
    const d = /* @__PURE__ */ new Error(`酒馆后端生成失败：${ka(i, String(o?.message || o), l)}`);
    throw d.status = l.status, d.body = i, d;
  }
  if (!l.ok || r?.error) {
    const o = ka(r?.error?.message || r?.message || i, `HTTP ${l.status}`, l), d = /* @__PURE__ */ new Error(`酒馆后端生成失败：${o}`);
    throw d.status = l.status, d.error = r?.error, d;
  }
  return r;
}
async function Yd(e = {}, t = {}) {
  return await Wd(e, t, { requestHeadersProvider: ln });
}
async function Xd(e = {}, t, a = {}, n = {}) {
  const l = await Hs(e, !0, n.requestHeadersProvider);
  typeof a.onRequest == "function" && a.onRequest(l);
  const i = await Ks(n.fetch)(l.url, {
    method: l.method,
    headers: l.rawHeaders || l.headers,
    body: JSON.stringify(l.body),
    signal: a.signal
  });
  if (!i.ok) {
    const r = await i.text().catch(() => ""), o = new Error(ka(r, `酒馆后端流式生成失败：HTTP ${i.status}`, i));
    throw o.status = i.status, o.body = r, o;
  }
  typeof a.onResponseAccepted == "function" && a.onResponseAccepted(), await Ad(i, (r) => {
    if (r?.error) {
      const o = ka(r.error?.message || r.message || JSON.stringify(r.error), "酒馆后端流式生成失败");
      throw new Error(o);
    }
    t(r);
  });
}
async function Jd(e = {}, t, a = {}) {
  return await Xd(e, t, a, { requestHeadersProvider: ln });
}
var _w = Object.freeze([
  "buildHostChatCompletionGenerateRequest",
  "createHostChatCompletion",
  "streamHostChatCompletion"
]), Tw = Object.freeze({
  buildHostChatCompletionGenerateRequest: Bd,
  fetchHostChatCompletionsModels: Gs,
  fetchHostOpenAICompatibleModels: zd,
  createHostChatCompletion: Yd,
  streamHostChatCompletion: Jd
}), Qd = Object.freeze({
  minimal: "最小",
  low: "低",
  medium: "中",
  high: "高",
  xhigh: "超高",
  max: "最大",
  min: "最小"
});
function Sr(e) {
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
function At(e, t, a, n, l = {}) {
  return Sr({
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
var Vs = Sr({
  profileId: "unsupported",
  modes: ["inherit"],
  outputModes: ["hide"],
  intensity: { kind: "none" },
  unsupportedReason: "当前 Provider、传输方式与模型组合没有已验证的 Reasoning 控制协议。"
}), rn = Object.freeze(["on"]), zs = Object.freeze([
  "inherit",
  "on",
  "off"
]), Cr = At("openai-gpt-5.6", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "medium",
  "high",
  "xhigh",
  "max"
], "medium", { temperatureOmitModes: zs }), Zd = At("kimi-k3", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "high",
  "max"
], "max", { temperatureOmitModes: rn }), ec = At("deepseek-thinking", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "high",
  "max"
], "high", { temperatureOmitModes: rn }), tc = At("openai-compatible-gemini-latest", [
  "inherit",
  "on",
  "off"
], [
  "minimal",
  "low",
  "medium",
  "high"
], "high", { temperatureOmitModes: rn }), ac = At("openai-compatible-claude-latest", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "medium",
  "high",
  "xhigh",
  "max"
], "high", { temperatureOmitModes: rn }), nc = At("openai-compatible-default", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "medium",
  "high"
], "medium", { temperatureOmitModes: rn }), sc = At("anthropic-adaptive", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "medium",
  "high",
  "xhigh",
  "max"
], "high", { temperatureOmitModes: zs }), lc = At("sillytavern-claude-adaptive", [
  "inherit",
  "on",
  "off"
], [
  "low",
  "medium",
  "high",
  "max"
], "high", { temperatureOmitModes: zs }), ic = At("google-gemini-3-flash", ["inherit", "on"], [
  "minimal",
  "low",
  "medium",
  "high"
], "high"), rc = At("sillytavern-google-3-flash", ["inherit", "on"], [
  "min",
  "low",
  "medium",
  "high"
], "high");
function oc(e = "") {
  switch (Ed(e)) {
    case "deepseek":
      return ec;
    case "kimi":
      return Zd;
    case "gemini":
      return tc;
    case "claude":
      return ac;
    case "openai":
      return Cr;
    default:
      return nc;
  }
}
function Ws(e = {}) {
  const t = String(e.provider || "").trim(), a = String(e.model || "").trim().toLowerCase();
  switch (t) {
    case "openai-responses":
      return Cr;
    case "openai-compatible":
    case "sillytavern-openai-compatible":
      return oc(a);
    case "anthropic":
      return sc;
    case "sillytavern-claude":
      return lc;
    case "google":
      return ic;
    case "sillytavern-google":
      return rc;
    default:
      return Vs;
  }
}
function uc(e = Vs) {
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
function dc(e = Vs) {
  return e.intensity?.kind !== "effort" ? [] : e.intensity.values.map((t) => ({
    value: t,
    label: Qd[t] || t
  }));
}
function ss(e, t, a, n = "REASONING_CAPABILITY_UNSUPPORTED") {
  return {
    ...e,
    profileId: t.profileId,
    valid: !1,
    error: a,
    code: n
  };
}
function cc(e, t) {
  const a = { ...e };
  return delete a.effort, delete a.budgetTokens, t.intensity?.kind === "effort" ? {
    ...a,
    ...e.effort ? { effort: e.effort } : {}
  } : a;
}
function cn(e = {}, t = {}) {
  const a = Ws(e), n = ya(t), l = t?.output === "show" || t?.output === "hide" ? t.output : null, i = cc({
    ...n,
    output: n.mode === "off" ? "hide" : l || (a.outputModes.includes("show") ? "show" : "hide")
  }, a);
  if (!a.outputModes.includes(i.output)) return ss(i, a, "当前任务要求返回 Reasoning 内容，但所选模型不支持。");
  if (!a.modes.includes(i.mode)) return ss(i, a, i.mode === "off" ? "当前模型不支持显式关闭 Reasoning。请选择“跟随模型默认”。" : a.unsupportedReason || "当前模型不支持显式开启 Reasoning。");
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
    } : ss(i, a, `当前模型不支持 Reasoning 强度“${r}”。`, "REASONING_CONFIG_INVALID");
  }
  return {
    ...i,
    profileId: a.profileId,
    valid: !0
  };
}
var jl = 900 * 1e3, Hl = Object.freeze([{
  value: "native",
  label: "原生 Tool Calling"
}, {
  value: "tagged-json",
  label: "Tagged JSON 兼容模式"
}]), fc = Object.freeze([
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
function ls(e = {}) {
  return e.sendTemperature !== !1;
}
function Kl(e = "", t = {}) {
  return t && typeof t == "object" && t[e] ? t[e] : fc.find((a) => a.value === e)?.label || e || "未配置";
}
var vc = { chat: { exclude: [
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
] } }, pc = Object.freeze([
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
function fn(e = "", t = {}) {
  const a = ya(t.reasoning), n = Ws({
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
function Gl(e = {}) {
  return ya(e);
}
function Za(e = []) {
  const t = [...new Set(e.filter(Boolean).map((l) => String(l).trim()).filter(Boolean))], a = vc.chat, n = t.filter((l) => {
    const i = l.toLowerCase();
    return !a.exclude.some((r) => i.includes(r));
  });
  return n.length ? n : t;
}
function vn(e = "") {
  return e === "delegate" ? "delegate" : "main";
}
function wa(e) {
  return String(e || "").trim().replace(/\/+$/, "");
}
function gc(e = "") {
  return e === "sillytavern-openai-compatible" || e === "sillytavern-claude" || e === "sillytavern-google";
}
function oa(e = "") {
  return e === "openai-compatible" || e === "sillytavern-openai-compatible";
}
function mc(e = "") {
  return e === "anthropic" || e === "sillytavern-claude";
}
function bc(e = "") {
  return e === "sillytavern-claude" ? kr : e === "sillytavern-google" ? wr : Ca;
}
function en(e = []) {
  return [...new Set(e.filter(Boolean).map((t) => String(t).trim()).filter(Boolean))];
}
function hc(e) {
  const t = wa(e);
  if (!t) return [];
  if (t.endsWith("/v1")) {
    const a = t.slice(0, -3);
    return en([
      `${t}/models`,
      `${a}/v1/models`,
      `${a}/models`
    ]);
  }
  return en([`${t}/v1/models`, `${t}/models`]);
}
function _r(e) {
  const t = wa(e);
  if (!t) return [];
  if (t.endsWith("/v1")) {
    const a = t.slice(0, -3);
    return en([
      `${t}/models`,
      `${a}/v1/models`,
      `${a}/models`
    ]);
  }
  return en([`${t}/v1/models`, `${t}/models`]);
}
function yc(e, t) {
  const a = wa(e);
  if (!a) return [];
  const n = a.endsWith("/v1beta") ? a.slice(0, -7) : a;
  return en([
    `${a}/models?key=${encodeURIComponent(t)}`,
    `${a}/models`,
    `${n}/v1beta/models?key=${encodeURIComponent(t)}`,
    `${n}/v1beta/models`,
    `${n}/models?key=${encodeURIComponent(t)}`,
    `${n}/models`
  ]);
}
function kc(e, t) {
  const a = [
    e?.error?.message,
    e?.message,
    e?.detail,
    e?.details,
    e?.error
  ].find((n) => typeof n == "string" && n.trim());
  return a ? a.trim() : String(t || "").trim().slice(0, 160);
}
async function wc(e, t = {}) {
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
    errorSnippet: kc(l, n)
  };
}
function $c(e) {
  return Za((e?.data || []).map((t) => String(t?.id || "").trim()).filter(Boolean));
}
function Tr(e) {
  return Za((e?.data || []).map((t) => String(t?.id || "").trim()).filter(Boolean));
}
function xc(e) {
  return Za((e?.models || e?.data || []).map((t) => String(t?.id || t?.name || "")).map((t) => t.split("/").pop() || "").filter(Boolean));
}
async function kn({ urls: e, requestOptionsList: t, extractModels: a, providerLabel: n }) {
  let l = null;
  for (const i of e) for (const r of t) {
    const o = await wc(i, r);
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
    const d = a(o.data);
    if (d.length) return d;
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
async function Sc(e, t = {}) {
  const a = String(e.apiKey || "").trim(), n = wa(e.baseUrl || ""), l = wa(n || $r.claude);
  if (a && l) try {
    return await kn({
      urls: _r(l),
      requestOptionsList: [{
        headers: {
          "x-api-key": a,
          "anthropic-version": "2023-06-01",
          Accept: "application/json"
        },
        signal: t.signal
      }],
      extractModels: Tr,
      providerLabel: "Anthropic"
    });
  } catch (i) {
    if (n) throw i;
  }
  return [...pc];
}
async function Cc(e, t = {}) {
  const a = e.provider, n = wa(e.baseUrl || ""), l = String(e.apiKey || "").trim();
  if (a === "sillytavern-claude") return Za(await Sc(e, t));
  if (gc(a)) return Za(await Gs(e, bc(a), { signal: t.signal }));
  if (!l) throw new Error("请先填写 API Key。");
  if (!n) throw new Error("请先填写 Base URL。");
  return a === "google" ? await kn({
    urls: yc(n, l),
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
    extractModels: xc,
    providerLabel: "Google AI"
  }) : mc(a) ? await kn({
    urls: _r(n),
    requestOptionsList: [{
      headers: {
        "x-api-key": l,
        "anthropic-version": "2023-06-01",
        Accept: "application/json"
      },
      signal: t.signal
    }],
    extractModels: Tr,
    providerLabel: "Anthropic"
  }) : await kn({
    urls: hc(n),
    requestOptionsList: [{
      headers: {
        Authorization: `Bearer ${l}`,
        Accept: "application/json"
      },
      signal: t.signal
    }],
    extractModels: $c,
    providerLabel: a === "openai-responses" ? "OpenAI Responses" : "OpenAI-Compatible"
  });
}
function _c(e) {
  return e instanceof Error ? e.message : String(e || "unknown_error");
}
function Tc(e = {}) {
  const { state: t, render: a, showToast: n, createRequestId: l = (v = "req") => `${v}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, saveConfig: i, reloadConfig: r, pullModels: o = Cc, describeError: d = _c, getRuntimeSummaryText: p } = e;
  function c() {
    t.configFormSyncPending = !0;
  }
  function y(v, u = "main") {
    const f = String(v || "").trim() || "openai-compatible";
    return u === "delegate" ? `delegate:${f}` : f;
  }
  function w(v, u = "main") {
    return t.pullStateByProvider?.[y(v, u)] || {
      status: "idle",
      message: ""
    };
  }
  function h(v, u, f = "main") {
    t.pullStateByProvider = {
      ...t.pullStateByProvider || {},
      [y(v, f)]: u
    };
  }
  function T(v, u, f = "main") {
    t.modelOptionsByProvider = {
      ...t.modelOptionsByProvider || {},
      [y(v, f)]: Array.isArray(u) ? u : []
    };
  }
  function O(v, u = "main") {
    const f = y(v, u);
    return Array.isArray(t.modelOptionsByProvider?.[f]) ? t.modelOptionsByProvider[f] : [];
  }
  function R(v, u) {
    const f = t.config?.presets || {}, $ = Oe(v || u || "默认");
    return f[$] ? $ : u && f[u] ? u : Object.keys(f)[0] || "默认";
  }
  function F(v, u) {
    const f = R(v, Us), $ = u && typeof u == "object" ? u : it(), P = $.provider || "openai-compatible", N = lt($.modelConfigs || {}), B = N[P] || {}, E = fn(P, B);
    return {
      delegatePresetName: f,
      delegateProvider: P,
      delegateModelConfigs: N,
      delegateBaseUrl: String(B.baseUrl || ""),
      delegateModel: String(B.model || ""),
      delegateApiKey: String(B.apiKey || ""),
      delegateTemperature: dt(B.temperature, 1),
      delegateMaxTokens: He(B.maxTokens),
      delegateSendTemperature: ls(B),
      delegateReasoningMode: E.reasoningMode,
      delegateReasoningEffort: E.reasoningEffort,
      delegateReasoningBudgetTokens: E.reasoningBudgetTokens,
      delegateToolMode: B.toolMode || "native"
    };
  }
  function q(v = "openai-compatible", u = {}) {
    const f = lt(u || {})[v] || {}, $ = fn(v, f);
    return {
      baseUrl: String(f.baseUrl || ""),
      model: String(f.model || ""),
      apiKey: String(f.apiKey || ""),
      temperature: dt(f.temperature, 1),
      maxTokens: He(f.maxTokens),
      sendTemperature: ls(f),
      ...$,
      toolMode: f.toolMode || "native"
    };
  }
  function I(v = "openai-compatible", u = {}) {
    const f = lt(u || {})[v] || {}, $ = fn(v, f);
    return {
      delegateBaseUrl: String(f.baseUrl || ""),
      delegateModel: String(f.model || ""),
      delegateApiKey: String(f.apiKey || ""),
      delegateTemperature: dt(f.temperature, 1),
      delegateMaxTokens: He(f.maxTokens),
      delegateSendTemperature: ls(f),
      delegateReasoningMode: $.reasoningMode,
      delegateReasoningEffort: $.reasoningEffort,
      delegateReasoningBudgetTokens: $.reasoningBudgetTokens,
      delegateToolMode: f.toolMode || "native"
    };
  }
  function A(v, u, f = t.config) {
    const $ = Oe(v || "默认"), P = u && typeof u == "object" ? u : it(), N = P.provider || "openai-compatible", B = lt(P.modelConfigs || {}), E = q(N, B), k = R(f?.delegatePresetName, $), L = F(k, f?.delegateConfig && typeof f.delegateConfig == "object" ? f.delegateConfig : (f?.presets || {})[k] || P);
    return {
      currentPresetName: $,
      presetDraftName: $,
      provider: N,
      modelConfigs: B,
      ...E,
      tavilyApiKey: String(f?.tavilyApiKey || ""),
      tavilyBaseUrl: wt(f?.tavilyBaseUrl || "https://api.tavily.com"),
      permissionMode: ca(P.permissionMode),
      jsApiPermission: Gt(f?.jsApiPermission),
      ...L
    };
  }
  function x() {
    if (t.configDraft) return t.configDraft;
    const v = Oe(t.config?.currentPresetName || "默认");
    return t.configDraft = A(v, (t.config?.presets || {})[v] || it()), t.configDraft;
  }
  function M(v, u = {}) {
    const f = x(), $ = u.provider || v.querySelector("#xb-assistant-provider")?.value || f.provider || "openai-compatible", P = u.delegateProvider || v.querySelector("#xb-assistant-delegate-provider")?.value || f.delegateProvider || "openai-compatible", N = v.querySelector("#xb-assistant-base-url")?.value.trim() || "", B = v.querySelector("#xb-assistant-model")?.value.trim() || "", E = v.querySelector("#xb-assistant-delegate-base-url")?.value.trim() ?? f.delegateBaseUrl ?? "", k = v.querySelector("#xb-assistant-delegate-model")?.value.trim() ?? f.delegateModel ?? "", L = Gl({
      mode: v.querySelector("#xb-assistant-reasoning-mode")?.value || f.reasoningMode,
      effort: v.querySelector("#xb-assistant-reasoning-effort")?.value || f.reasoningEffort,
      budgetTokens: v.querySelector("#xb-assistant-reasoning-budget")?.value ?? f.reasoningBudgetTokens
    }), D = Gl({
      mode: v.querySelector("#xb-assistant-delegate-reasoning-mode")?.value || f.delegateReasoningMode,
      effort: v.querySelector("#xb-assistant-delegate-reasoning-effort")?.value || f.delegateReasoningEffort,
      budgetTokens: v.querySelector("#xb-assistant-delegate-reasoning-budget")?.value ?? f.delegateReasoningBudgetTokens
    }), Y = {
      baseUrl: N,
      model: B,
      apiKey: v.querySelector("#xb-assistant-api-key")?.value.trim() || "",
      temperature: dt(v.querySelector("#xb-assistant-temperature")?.value, f.temperature ?? 1),
      maxTokens: He(v.querySelector("#xb-assistant-max-tokens")?.value, f.maxTokens),
      sendTemperature: v.querySelector("#xb-assistant-send-temperature")?.checked ?? !!(f.sendTemperature ?? !0),
      reasoning: L,
      toolMode: oa($) ? v.querySelector("#xb-assistant-tool-mode")?.value || f.toolMode || "native" : void 0
    }, V = {
      baseUrl: E,
      model: k,
      apiKey: v.querySelector("#xb-assistant-delegate-api-key")?.value.trim() ?? f.delegateApiKey ?? "",
      temperature: dt(v.querySelector("#xb-assistant-delegate-temperature")?.value, f.delegateTemperature ?? 1),
      maxTokens: He(v.querySelector("#xb-assistant-delegate-max-tokens")?.value, f.delegateMaxTokens),
      sendTemperature: v.querySelector("#xb-assistant-delegate-send-temperature")?.checked ?? !!(f.delegateSendTemperature ?? !0),
      reasoning: D,
      toolMode: oa(P) ? v.querySelector("#xb-assistant-delegate-tool-mode")?.value || f.delegateToolMode || "native" : void 0
    }, Q = {
      ...lt(f.modelConfigs || {}),
      [$]: {
        ...lt(f.modelConfigs || {})[$] || {},
        ...Y
      }
    }, ae = {
      ...lt(f.delegateModelConfigs || {}),
      [P]: {
        ...lt(f.delegateModelConfigs || {})[P] || {},
        ...V
      }
    };
    return {
      ...f,
      currentPresetName: f.currentPresetName,
      presetDraftName: Oe(v.querySelector("#xb-assistant-preset-name")?.value),
      provider: $,
      modelConfigs: Q,
      baseUrl: Y.baseUrl,
      model: Y.model,
      apiKey: Y.apiKey,
      temperature: Y.temperature,
      maxTokens: Y.maxTokens,
      sendTemperature: Y.sendTemperature,
      reasoningMode: Y.reasoning.mode,
      reasoningEffort: Y.reasoning.effort || "",
      reasoningBudgetTokens: Y.reasoning.budgetTokens,
      toolMode: Y.toolMode || f.toolMode || "native",
      tavilyApiKey: v.querySelector("#xb-assistant-tavily-api-key")?.value.trim() ?? f.tavilyApiKey ?? "",
      tavilyBaseUrl: wt(f.tavilyBaseUrl || "https://api.tavily.com"),
      permissionMode: ca(v.querySelector("#xb-assistant-permission-mode")?.value || f.permissionMode),
      jsApiPermission: Gt(v.querySelector("#xb-assistant-jsapi-permission")?.value || f.jsApiPermission),
      delegatePresetName: R(v.querySelector("#xb-assistant-delegate-preset-select")?.value || f.delegatePresetName, f.currentPresetName),
      delegateProvider: P,
      delegateModelConfigs: ae,
      delegateBaseUrl: V.baseUrl,
      delegateModel: V.model,
      delegateApiKey: V.apiKey,
      delegateTemperature: V.temperature,
      delegateMaxTokens: V.maxTokens,
      delegateSendTemperature: V.sendTemperature,
      delegateReasoningMode: V.reasoning.mode,
      delegateReasoningEffort: V.reasoning.effort || "",
      delegateReasoningBudgetTokens: V.reasoning.budgetTokens,
      delegateToolMode: V.toolMode || f.delegateToolMode || "native"
    };
  }
  function S(v, u = {}) {
    return t.configDraft = M(v, u), t.configDirty = !0, t.configDraft;
  }
  function C(v = x()) {
    return {
      baseUrl: String(v.baseUrl || ""),
      model: String(v.model || ""),
      apiKey: String(v.apiKey || ""),
      temperature: dt(v.temperature, 1),
      maxTokens: He(v.maxTokens),
      sendTemperature: !!(v.sendTemperature ?? !0),
      reasoning: ya({
        mode: v.reasoningMode,
        effort: v.reasoningEffort,
        budgetTokens: v.reasoningBudgetTokens
      }),
      toolMode: oa(v.provider) ? v.toolMode || "native" : void 0
    };
  }
  function _(v = x()) {
    return {
      baseUrl: String(v.delegateBaseUrl || ""),
      model: String(v.delegateModel || ""),
      apiKey: String(v.delegateApiKey || ""),
      temperature: dt(v.delegateTemperature, 1),
      maxTokens: He(v.delegateMaxTokens),
      sendTemperature: !!(v.delegateSendTemperature ?? !0),
      reasoning: ya({
        mode: v.delegateReasoningMode,
        effort: v.delegateReasoningEffort,
        budgetTokens: v.delegateReasoningBudgetTokens
      }),
      toolMode: oa(v.delegateProvider) ? v.delegateToolMode || "native" : void 0
    };
  }
  function G(v = x()) {
    const u = v.delegateProvider || "openai-compatible", f = lt(v.delegateModelConfigs || {});
    return {
      provider: u,
      modelConfigs: {
        ...f,
        [u]: {
          ...f[u] || {},
          ..._(v)
        }
      }
    };
  }
  function ee(v = x()) {
    return {
      provider: v.provider || "openai-compatible",
      baseUrl: v.baseUrl || "",
      model: v.model || "",
      apiKey: v.apiKey || "",
      tavilyApiKey: v.tavilyApiKey || "",
      tavilyBaseUrl: wt(v.tavilyBaseUrl || "https://api.tavily.com"),
      temperature: v.sendTemperature === !1 ? void 0 : dt(v.temperature, 1),
      sendTemperature: !!(v.sendTemperature ?? !0),
      maxTokens: He(v.maxTokens),
      timeoutMs: jl,
      toolMode: v.toolMode || "native",
      reasoning: cn({
        provider: v.provider,
        baseUrl: v.baseUrl,
        model: v.model,
        maxTokens: He(v.maxTokens)
      }, {
        mode: v.reasoningMode,
        effort: v.reasoningEffort,
        budgetTokens: v.reasoningBudgetTokens
      })
    };
  }
  function X(v = x()) {
    return {
      provider: v.delegateProvider || "openai-compatible",
      baseUrl: v.delegateBaseUrl || "",
      model: v.delegateModel || "",
      apiKey: v.delegateApiKey || "",
      tavilyApiKey: v.tavilyApiKey || "",
      tavilyBaseUrl: wt(v.tavilyBaseUrl || "https://api.tavily.com"),
      temperature: v.delegateSendTemperature === !1 ? void 0 : dt(v.delegateTemperature, 1),
      sendTemperature: !!(v.delegateSendTemperature ?? !0),
      maxTokens: He(v.delegateMaxTokens),
      timeoutMs: jl,
      toolMode: v.delegateToolMode || "native",
      reasoning: cn({
        provider: v.delegateProvider,
        baseUrl: v.delegateBaseUrl,
        model: v.delegateModel,
        maxTokens: He(v.delegateMaxTokens)
      }, {
        mode: v.delegateReasoningMode,
        effort: v.delegateReasoningEffort,
        budgetTokens: v.delegateReasoningBudgetTokens
      })
    };
  }
  function J(v = {}) {
    const u = [];
    Object.entries(v.presets || {}).forEach(([N, B]) => {
      const E = B?.provider || "openai-compatible", k = B?.modelConfigs?.[E] || {}, L = cn({
        provider: E,
        baseUrl: k.baseUrl,
        model: k.model,
        maxTokens: He(k.maxTokens)
      }, k.reasoning);
      L.valid === !1 && u.push(`预设“${N}”：${L.error}`);
    });
    const f = v.delegateConfig?.provider || "openai-compatible", $ = v.delegateConfig?.modelConfigs?.[f] || {}, P = cn({
      provider: f,
      baseUrl: $.baseUrl,
      model: $.model,
      maxTokens: He($.maxTokens)
    }, $.reasoning);
    return P.valid === !1 && u.push(`分身模型：${P.error}`), u;
  }
  function U(v = {}) {
    const u = (v.role === "delegate", x());
    return v.role === "delegate" ? X(u) : ee(u);
  }
  function le(v) {
    x(), t.configDraft = {
      ...t.configDraft,
      presetDraftName: Oe(v.querySelector("#xb-assistant-preset-name")?.value)
    };
  }
  function ce(v = x(), u = v.provider || "openai-compatible", f = "main") {
    const $ = w(u, f);
    return typeof p == "function" ? p({
      state: t,
      draft: v,
      provider: u,
      pullState: $,
      providerLabel: Kl(u)
    }) : `预设「${v.currentPresetName || "默认"}」 · ${Kl(u)}`;
  }
  function oe(v, u, f) {
    const $ = v?.querySelector?.(u);
    if (!$) return;
    const P = String(f?.status || "idle"), N = String(f?.message || "").trim();
    $.textContent = N, $.hidden = !N, $.classList.toggle("is-loading", P === "loading"), $.classList.toggle("is-success", P === "success"), $.classList.toggle("is-error", P === "error");
  }
  function ge(v) {
    if (!v) return;
    const u = vn(t.configPage);
    t.configPage = u, v.querySelectorAll("[data-config-page]").forEach((f) => {
      const $ = vn(f?.dataset?.configPage) === u;
      f.classList.toggle("is-active", $), f.setAttribute("aria-selected", $ ? "true" : "false");
    }), v.querySelectorAll("[data-config-page-panel]").forEach((f) => {
      const $ = vn(f?.dataset?.configPagePanel) === u;
      f.toggleAttribute("hidden", !$);
    }), v.querySelector("#xb-assistant-delete-preset")?.toggleAttribute("hidden", u === "delegate");
  }
  function Ce(v, u = "main") {
    const f = x(), $ = u === "delegate", P = $ ? "#xb-assistant-delegate-reasoning" : "#xb-assistant-reasoning", N = $ ? f.delegateProvider : f.provider, B = $ ? f.delegateBaseUrl : f.baseUrl, E = $ ? f.delegateModel : f.model, k = {
      mode: $ ? f.delegateReasoningMode : f.reasoningMode,
      effort: $ ? f.delegateReasoningEffort : f.reasoningEffort,
      budgetTokens: $ ? f.delegateReasoningBudgetTokens : f.reasoningBudgetTokens
    }, L = Ws({
      provider: N,
      baseUrl: B,
      model: E
    }), D = fn(N, {
      baseUrl: B,
      model: E,
      reasoning: k
    }), Y = D.reasoningMode, V = D.reasoningEffort, Q = D.reasoningBudgetTokens, ae = v.querySelector(`${P}-mode`), ve = v.querySelector(`${P}-capability`), be = v.querySelector(`${P}-effort-wrap`), he = v.querySelector(`${P}-effort`), we = v.querySelector(`${P}-budget-wrap`), $e = v.querySelector(`${P}-budget`);
    ae && (yt(ae, uc(L)), ae.value = Y), ve && (ve.textContent = L.unsupportedReason || `能力配置：${L.profileId}`), he && (yt(he, dc(L)), he.value = V), be && (be.style.display = Y === "on" && L.intensity.kind === "effort" ? "" : "none"), $e && L.intensity.kind === "budget" && ($e.min = L.intensity.allowAuto ? "-1" : String(L.intensity.min), $e.max = String(L.intensity.max), $e.value = String(Q)), we && (we.style.display = Y === "on" && L.intensity.kind === "budget" ? "" : "none");
  }
  function Ie(v) {
    const u = v.querySelector("#xb-assistant-runtime");
    if (!u) return;
    const f = x(), $ = t.configPage === "delegate", P = $ ? f.delegateProvider : f.provider;
    u.textContent = ce($ ? {
      ...f,
      currentPresetName: "分身",
      provider: P
    } : f, P || "openai-compatible", $ ? "delegate" : "main");
  }
  function nt(v) {
    if (!t.config) return;
    ge(v);
    const u = x(), f = u.provider || "openai-compatible", $ = O(f), P = u.delegateProvider || "openai-compatible", N = O(P, "delegate"), B = v.querySelector("#xb-assistant-provider"), E = v.querySelector("#xb-assistant-base-url"), k = v.querySelector("#xb-assistant-model"), L = v.querySelector("#xb-assistant-api-key"), D = v.querySelector("#xb-assistant-temperature"), Y = v.querySelector("#xb-assistant-send-temperature"), V = v.querySelector("#xb-assistant-tool-mode-wrap"), Q = v.querySelector("#xb-assistant-tool-mode"), ae = v.querySelector("#xb-assistant-permission-mode"), ve = v.querySelector("#xb-assistant-jsapi-permission"), be = v.querySelector("#xb-assistant-model-pulled"), he = v.querySelector("#xb-assistant-max-tokens"), we = v.querySelector("#xb-assistant-preset-select"), $e = v.querySelector("#xb-assistant-preset-name"), We = v.querySelector("#xb-assistant-delegate-preset-select"), Ue = v.querySelector("#xb-assistant-delegate-provider"), jt = v.querySelector("#xb-assistant-delegate-base-url"), _a = v.querySelector("#xb-assistant-delegate-model"), Fe = v.querySelector("#xb-assistant-delegate-api-key"), st = v.querySelector("#xb-assistant-tavily-api-key"), ia = v.querySelector("#xb-assistant-delegate-model-pulled"), Ta = v.querySelector("#xb-assistant-delegate-max-tokens"), Ys = v.querySelector("#xb-assistant-delegate-tool-mode-wrap"), Gn = v.querySelector("#xb-assistant-delegate-tool-mode");
    if (!we || !$e) return;
    const Xs = (t.config.presetNames || []).map((Ht) => ({
      value: Ht,
      label: Ht
    }));
    yt(we, Xs), we.value = u.currentPresetName || t.config.currentPresetName || "默认", We && (yt(We, Xs), We.value = R(u.delegatePresetName, u.currentPresetName)), $e.value = u.presetDraftName || u.currentPresetName || "默认", B && (B.value = f), E && (E.value = u.baseUrl || ""), k && (k.value = u.model || ""), L && (L.value = u.apiKey || ""), he && (he.value = String(He(u.maxTokens))), D && (D.value = String(dt(u.temperature, 1))), Y && (Y.checked = !!(u.sendTemperature ?? !0)), st && (st.value = u.tavilyApiKey || ""), V && (V.style.display = oa(f) ? "" : "none"), Q && (yt(Q, Hl), Q.value = u.toolMode || "native"), ae && (yt(ae, yd), ae.value = ca(u.permissionMode)), ve && (yt(ve, kd), ve.value = Gt(u.jsApiPermission)), Ce(v), be && (yt(be, $.map((Ht) => ({
      value: Ht,
      label: Ht
    })), "手动填写"), be.value = $.includes(u.model) ? u.model : ""), Ue && (Ue.value = P), jt && (jt.value = u.delegateBaseUrl || ""), _a && (_a.value = u.delegateModel || ""), Fe && (Fe.value = u.delegateApiKey || "");
    const Js = v.querySelector("#xb-assistant-delegate-temperature"), Qs = v.querySelector("#xb-assistant-delegate-send-temperature");
    Ta && (Ta.value = String(He(u.delegateMaxTokens))), Js && (Js.value = String(dt(u.delegateTemperature, 1))), Qs && (Qs.checked = !!(u.delegateSendTemperature ?? !0)), Ys && (Ys.style.display = oa(P) ? "" : "none"), Gn && (yt(Gn, Hl), Gn.value = u.delegateToolMode || "native"), Ce(v, "delegate"), ia && (yt(ia, N.map((Ht) => ({
      value: Ht,
      label: Ht
    })), "手动填写"), ia.value = N.includes(u.delegateModel) ? u.delegateModel : ""), oe(v, "#xb-assistant-model-pull-status", w(f)), oe(v, "#xb-assistant-delegate-model-pull-status", w(P, "delegate")), Ie(v);
  }
  function Re(v) {
    if (typeof i != "function") return;
    const u = i(v);
    u && typeof u.catch == "function" && u.catch((f) => {
      n?.(d(f));
    });
  }
  function Le(v, u, f) {
    v.querySelector(u)?.addEventListener("click", () => {
      const $ = v.querySelector(f);
      $ && ($.type = $.type === "password" ? "text" : "password");
    });
  }
  function Mt(v) {
    return {
      expectedUpdatedAt: Number(v?.updatedAt) || 0,
      workspaceFileName: v?.workspaceFileName || "",
      jsApiPermission: Gt(v?.jsApiPermission),
      tavilyApiKey: String(v?.tavilyApiKey || ""),
      tavilyBaseUrl: wt(v?.tavilyBaseUrl || "https://api.tavily.com"),
      currentPresetName: v?.currentPresetName || "默认",
      delegatePresetName: v?.delegatePresetName || v?.currentPresetName || "默认",
      delegateConfig: v?.delegateConfig || {},
      delegateConfigured: v?.delegateConfigured === !0,
      presets: v?.presets || {}
    };
  }
  function bt(v, u = {}) {
    const f = En(v), $ = J(f);
    if ($.length)
      return n?.($[0]), !1;
    t.config = f;
    const P = Oe(u.presetName || f.currentPresetName || "默认");
    return t.configDraft = A(P, f.presets?.[P] || it(), f), c(), Re({
      requestId: l(u.requestPrefix || "save-config"),
      config: f,
      payload: Mt(f)
    }), !0;
  }
  function W(v, u = {}) {
    const f = S(v), $ = Oe(u.presetName || f.presetDraftName), P = Oe(f.currentPresetName || t.config?.currentPresetName || "默认"), N = (t.config?.presets || {})[P] || it(), B = lt(f.modelConfigs || N.modelConfigs || {}), E = {
      ...N,
      provider: f.provider,
      permissionMode: ca(f.permissionMode),
      modelConfigs: {
        ...B,
        [f.provider]: {
          ...B[f.provider] || {},
          ...C(f)
        }
      }
    }, k = { ...t.config?.presets || {} };
    u.renameCurrentPreset && $ !== P && delete k[P], k[$] = E, bt({
      ...t.config,
      jsApiPermission: Gt(f.jsApiPermission),
      tavilyApiKey: String(f.tavilyApiKey || ""),
      tavilyBaseUrl: wt(f.tavilyBaseUrl || "https://api.tavily.com"),
      currentPresetName: $,
      delegatePresetName: R(f.delegatePresetName, $),
      delegateConfig: G(f),
      delegateConfigured: u.configureDelegate === !0 || t.config?.delegateConfigured === !0,
      presets: k
    }, {
      presetName: $,
      requestPrefix: u.requestPrefix
    });
  }
  function H(v, u = "") {
    const f = Oe(u || "默认"), $ = typeof window < "u" && typeof window.prompt == "function" ? window.prompt(v, f) : f;
    return $ === null ? "" : Oe($);
  }
  function ne(v) {
    const u = H("输入新预设名称：", `${S(v).currentPresetName || "默认"} 副本`);
    if (!u) {
      n?.("预设名称不能为空");
      return;
    }
    const f = v.querySelector("#xb-assistant-preset-name");
    f && (f.value = u, W(v, {
      presetName: u,
      requestPrefix: "create-preset"
    }));
  }
  function Ee(v) {
    const u = S(v), f = Oe(u.currentPresetName || t.config?.currentPresetName || "默认"), $ = H("输入预设名称：", u.presetDraftName || f);
    if (!$) {
      n?.("预设名称不能为空");
      return;
    }
    if ($ === f) return;
    const P = v.querySelector("#xb-assistant-preset-name");
    P && (P.value = $, W(v, {
      presetName: $,
      renameCurrentPreset: !0,
      requestPrefix: "rename-preset"
    }));
  }
  function Qe(v) {
    if (Object.keys(t.config?.presets || {}).length <= 1) {
      n?.("至少要保留一套预设");
      return;
    }
    const u = S(v), f = Oe(t.configDraft?.currentPresetName || t.config?.currentPresetName || "默认"), $ = { ...t.config?.presets || {} };
    delete $[f];
    const P = Object.keys($)[0] || "默认";
    bt({
      ...t.config,
      jsApiPermission: Gt(u.jsApiPermission),
      tavilyApiKey: String(u.tavilyApiKey || t.config?.tavilyApiKey || ""),
      tavilyBaseUrl: wt(u.tavilyBaseUrl || t.config?.tavilyBaseUrl || "https://api.tavily.com"),
      currentPresetName: P,
      delegatePresetName: R(u.delegatePresetName, P),
      delegateConfig: G(u),
      presets: $
    }, {
      presetName: P,
      requestPrefix: "delete-preset"
    }) && a?.();
  }
  function qe(v) {
    v?.querySelector?.("[data-xb-agent-config-retry]")?.addEventListener("click", () => {
      r?.();
    }), v?.querySelector?.("[data-xb-agent-config-reload]")?.addEventListener("click", () => {
      t.configDraft = null, t.configDirty = !1, t.configExternalChangePending = !1, c(), r?.();
    }), v?.querySelector?.("#xb-assistant-provider") && (v.querySelector("#xb-assistant-provider")?.addEventListener("change", (u) => {
      const f = u.currentTarget.value, $ = x().provider, P = S(v, { provider: $ });
      t.configDraft = {
        ...P,
        provider: f,
        ...q(f, P.modelConfigs)
      }, c(), a?.();
    }), v.querySelector("#xb-assistant-preset-select")?.addEventListener("change", (u) => {
      const f = Oe(u.currentTarget.value), $ = (t.config?.presets || {})[f] || it(), P = S(v);
      t.config = En({
        ...t.config,
        jsApiPermission: Gt(P.jsApiPermission),
        currentPresetName: f,
        delegatePresetName: R(P.delegatePresetName, f),
        delegateConfig: G(P)
      }), t.configDraft = A(f, $, t.config), c(), a?.();
    }), v.querySelector("#xb-assistant-preset-name")?.addEventListener("input", () => {
      le(v);
    }), v.querySelector("#xb-assistant-base-url")?.addEventListener("input", () => {
      S(v), Ce(v), Ie(v);
    }), v.querySelector("#xb-assistant-model")?.addEventListener("input", () => {
      S(v), Ce(v), Ie(v);
    }), v.querySelector("#xb-assistant-api-key")?.addEventListener("input", () => {
      S(v);
    }), v.querySelector("#xb-assistant-max-tokens")?.addEventListener("input", () => {
      S(v);
    }), v.querySelector("#xb-assistant-temperature")?.addEventListener("input", () => {
      S(v);
    }), v.querySelector("#xb-assistant-send-temperature")?.addEventListener("change", () => {
      S(v);
    }), v.querySelector("#xb-assistant-tavily-api-key")?.addEventListener("input", () => {
      S(v);
    }), v.querySelector("#xb-assistant-model-pulled")?.addEventListener("change", (u) => {
      const f = u.currentTarget.value;
      if (!f) return;
      const $ = v.querySelector("#xb-assistant-model");
      $ && ($.value = f), S(v), Ce(v), Ie(v);
    }), Le(v, "#xb-assistant-toggle-key", "#xb-assistant-api-key"), Le(v, "#xb-assistant-toggle-tavily-key", "#xb-assistant-tavily-api-key"), v.querySelector("#xb-assistant-delegate-provider")?.addEventListener("change", (u) => {
      const f = u.currentTarget.value, $ = x().delegateProvider, P = S(v, { delegateProvider: $ });
      t.configDraft = {
        ...P,
        delegateProvider: f,
        ...I(f, P.delegateModelConfigs)
      }, c(), a?.();
    }), v.querySelector("#xb-assistant-delegate-base-url")?.addEventListener("input", () => {
      S(v), Ce(v, "delegate"), Ie(v);
    }), v.querySelector("#xb-assistant-delegate-model")?.addEventListener("input", () => {
      S(v), Ce(v, "delegate"), Ie(v);
    }), v.querySelector("#xb-assistant-delegate-api-key")?.addEventListener("input", () => {
      S(v);
    }), v.querySelector("#xb-assistant-delegate-max-tokens")?.addEventListener("input", () => {
      S(v);
    }), v.querySelector("#xb-assistant-delegate-temperature")?.addEventListener("input", () => {
      S(v);
    }), v.querySelector("#xb-assistant-delegate-send-temperature")?.addEventListener("change", () => {
      S(v);
    }), v.querySelector("#xb-assistant-delegate-model-pulled")?.addEventListener("change", (u) => {
      const f = u.currentTarget.value;
      if (!f) return;
      const $ = v.querySelector("#xb-assistant-delegate-model");
      $ && ($.value = f), S(v), Ce(v, "delegate"), Ie(v);
    }), Le(v, "#xb-assistant-delegate-toggle-key", "#xb-assistant-delegate-api-key"), v.querySelector("#xb-assistant-reasoning-mode")?.addEventListener("change", () => {
      S(v), Ce(v), Ie(v);
    }), v.querySelector("#xb-assistant-reasoning-effort")?.addEventListener("change", () => {
      S(v);
    }), v.querySelector("#xb-assistant-reasoning-budget")?.addEventListener("input", () => {
      S(v);
    }), v.querySelector("#xb-assistant-tool-mode")?.addEventListener("change", () => {
      S(v);
    }), v.querySelector("#xb-assistant-delegate-reasoning-mode")?.addEventListener("change", () => {
      S(v), Ce(v, "delegate"), Ie(v);
    }), v.querySelector("#xb-assistant-delegate-reasoning-effort")?.addEventListener("change", () => {
      S(v);
    }), v.querySelector("#xb-assistant-delegate-reasoning-budget")?.addEventListener("input", () => {
      S(v);
    }), v.querySelector("#xb-assistant-delegate-tool-mode")?.addEventListener("change", () => {
      S(v);
    }), v.querySelector("#xb-assistant-permission-mode")?.addEventListener("change", () => {
      S(v);
    }), v.querySelector("#xb-assistant-jsapi-permission")?.addEventListener("change", () => {
      S(v);
    }), v.querySelector("#xb-assistant-delegate-preset-select")?.addEventListener("change", (u) => {
      const f = R(u.currentTarget?.value, t.configDraft?.currentPresetName || t.config?.currentPresetName || "默认"), $ = (t.config?.presets || {})[f] || it();
      t.configDraft = {
        ...S(v),
        ...F(f, $)
      }, c(), a?.();
    }), v.querySelectorAll("[data-config-page]").forEach((u) => {
      u.addEventListener("click", (f) => {
        S(v), t.configPage = vn(f.currentTarget?.dataset?.configPage), ge(v), nt(v);
      });
    }), v.querySelector("#xb-assistant-pull-models")?.addEventListener("click", async () => {
      S(v), c();
      const u = U();
      h(u.provider, {
        status: "loading",
        message: "正在拉取模型列表…"
      }), a?.();
      try {
        const f = await o(u);
        T(u.provider, f), h(u.provider, {
          status: "success",
          message: `已拉取 ${f.length} 个模型`
        });
      } catch (f) {
        T(u.provider, []), h(u.provider, {
          status: "error",
          message: d(f)
        });
      }
      c(), a?.();
    }), v.querySelector("#xb-assistant-delegate-pull-models")?.addEventListener("click", async () => {
      S(v), c();
      const u = U({ role: "delegate" });
      h(u.provider, {
        status: "loading",
        message: "正在拉取模型列表…"
      }, "delegate"), a?.();
      try {
        const f = await o(u);
        T(u.provider, f, "delegate"), h(u.provider, {
          status: "success",
          message: `已拉取 ${f.length} 个模型`
        }, "delegate");
      } catch (f) {
        T(u.provider, [], "delegate"), h(u.provider, {
          status: "error",
          message: d(f)
        }, "delegate");
      }
      c(), a?.();
    }), v.querySelector("#xb-assistant-new-preset")?.addEventListener("click", () => {
      ne(v);
    }), v.querySelector("#xb-assistant-rename-preset")?.addEventListener("click", () => {
      Ee(v);
    }), v.querySelector("#xb-assistant-save")?.addEventListener("click", () => {
      W(v);
    }), v.querySelector("#xb-assistant-delegate-save")?.addEventListener("click", () => {
      W(v, {
        requestPrefix: "save-delegate-config",
        configureDelegate: !0
      });
    }), v.querySelector("#xb-assistant-delete-preset")?.addEventListener("click", () => {
      Qe(v);
    }));
  }
  return {
    getActiveProviderConfig: U,
    getActiveProviderConfigFromForm(v, u = {}) {
      return t.configDraft = M(v), U(u);
    },
    syncConfigToForm: nt,
    bindSettingsPanelEvents: qe
  };
}
function Na(e = "") {
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
function Ac(e = {}) {
  const t = String(e?.status || "idle");
  return t === "saving" ? "saving" : t === "success" ? "success" : t === "error" ? "error" : "save";
}
function Mc(e = {}) {
  const t = String(e?.status || "idle");
  return t === "saving" ? {
    className: "xb-assistant-save-button is-saving",
    title: "正在保存配置"
  } : t === "success" ? {
    className: "xb-assistant-save-button is-success",
    title: "配置已保存"
  } : t === "error" ? {
    className: "xb-assistant-save-button is-error",
    title: Na(e?.error || "保存失败")
  } : {
    className: "xb-assistant-save-button",
    title: "保存配置"
  };
}
function Ec(e = {}) {
  const { configSave: t = {}, runtimeText: a = "", inlineToastText: n = "", showInlineToast: l = !0, showAssistantPermissions: i = !0, showDelegateSettings: r = !0, showTavilySettings: o = !0, activePage: d = "main", delegatePresetHint: p = "DelegateRun 分身会使用这里的独立 API 配置；可以和主助手使用不同 Provider、Base URL、模型和 Tool 调用格式。", isBusy: c = !1, canDeletePreset: y = !0, configLoadError: w = "", configExternalChangePending: h = !1 } = e, T = String(w || "").trim(), O = Mc(t), R = Ac(t), F = c || T || String(t?.status || "") === "saving" ? "disabled" : "", q = c || !y ? "disabled" : "", I = d === "delegate" ? "delegate" : "main", A = I === "main", x = I === "delegate", M = i ? `
            <label>
                <span>斜杠命令权限</span>
                <select id="xb-assistant-permission-mode"></select>
            </label>
            <label>
                <span>JavaScript API 权限</span>
                <select id="xb-assistant-jsapi-permission"></select>
            </label>` : "", S = r ? `
            <div class="xb-assistant-config-tabs" role="tablist" aria-label="API 配置分页">
                <button id="xb-assistant-config-tab-main" type="button" class="xb-assistant-config-tab ${A ? "is-active" : ""}" data-config-page="main" role="tab" aria-selected="${A ? "true" : "false"}">主助手 API</button>
                <button id="xb-assistant-config-tab-delegate" type="button" class="xb-assistant-config-tab ${x ? "is-active" : ""}" data-config-page="delegate" role="tab" aria-selected="${x ? "true" : "false"}">分身 API</button>
            </div>` : "", C = r ? `
            <div class="xb-assistant-config-page" data-config-page-panel="delegate" ${x ? "" : "hidden"}>
                <p class="xb-assistant-config-note">${Na(p)}</p>
                <div class="xb-assistant-preset-row">
                    <select id="xb-assistant-delegate-preset-select" class="xb-assistant-preset-field" aria-label="已存预设"></select>
                    <div class="xb-assistant-preset-tools is-single" aria-label="分身 API 预设操作">
                        <button id="xb-assistant-delegate-save" type="button" class="xb-assistant-icon-button ${O.className}" title="${O.title}" aria-label="${O.title}" ${F}>${Oa(R)}</button>
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
                    <button id="xb-assistant-delegate-pull-models" type="button" class="secondary" ${c ? "disabled" : ""}>拉取模型</button>
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
            <div class="xb-assistant-config-alert is-error" data-xb-agent-config-load-error ${T ? "" : "hidden"}>
                <span data-xb-agent-config-load-error-message>${Na(T)}</span>
                <button type="button" data-xb-agent-config-retry>重新读取</button>
            </div>
            <div class="xb-assistant-config-alert is-conflict" data-xb-agent-config-conflict ${T || !h ? "hidden" : ""}>
                <span>共享配置已在其他页面更新。当前未保存编辑仍保留；重新载入会放弃这些编辑。</span>
                <button type="button" data-xb-agent-config-reload>重新载入</button>
            </div>
            <fieldset class="xb-assistant-config-fields" data-xb-agent-config-fields ${T ? "disabled" : ""}>
            ${S}
            <div class="xb-assistant-config-page" data-config-page-panel="main" ${A ? "" : "hidden"}>
            <div class="xb-assistant-preset-row">
                <select id="xb-assistant-preset-select" class="xb-assistant-preset-field" aria-label="已存预设"></select>
                <input id="xb-assistant-preset-name" type="hidden" />
                <div class="xb-assistant-preset-tools" aria-label="API 预设操作">
                    <button id="xb-assistant-new-preset" type="button" class="xb-assistant-icon-button" title="新增预设" aria-label="新增预设" ${c ? "disabled" : ""}>${Oa("add")}</button>
                    <button id="xb-assistant-rename-preset" type="button" class="xb-assistant-icon-button" title="重命名预设" aria-label="重命名预设" ${c ? "disabled" : ""}>${Oa("rename")}</button>
                    <button id="xb-assistant-save" type="button" class="xb-assistant-icon-button ${O.className}" title="${O.title}" aria-label="${O.title}" ${F}>${Oa(R)}</button>
                    <button id="xb-assistant-delete-preset" type="button" class="xb-assistant-icon-button" title="删除预设" aria-label="删除预设" ${q}>${Oa("delete")}</button>
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
                <button id="xb-assistant-pull-models" type="button" class="secondary" ${c ? "disabled" : ""}>拉取模型</button>
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
            ${C}
            <div class="xb-assistant-runtime" id="xb-assistant-runtime">${Na(a)}</div>
            </fieldset>
            ${l ? `<div class="xb-assistant-toast xb-assistant-toast-inline" id="xb-assistant-toast" aria-live="polite">${Na(n)}</div>` : ""}
        </section>
    `;
}
var Ic = { class: "agent-api-app" }, Pc = { class: "agent-api-scroll" }, Oc = { "aria-live": "polite" }, Rc = ["disabled"], Lc = {
  key: 0,
  class: "agent-api-state",
  "aria-live": "polite"
}, Bc = {
  key: 1,
  class: "agent-api-state is-error",
  role: "alert"
}, Nc = {
  class: "agent-api-panel",
  "aria-label": "共享 Agent API 配置"
}, Vl = 13e4, Dc = /* @__PURE__ */ se({
  __name: "AgentApiApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const t = e, a = structuredClone(/* @__PURE__ */ ue(t.initialState)), n = /* @__PURE__ */ K(a), l = /* @__PURE__ */ K(null), i = /* @__PURE__ */ K("idle"), r = /* @__PURE__ */ K("尚未测试。打开页面和保存配置都不会自动连接供应商。");
    let o = () => {
    }, d = null, p = 0;
    const c = /* @__PURE__ */ _t({
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
    }), y = z(() => n.value.status === "ready" && c.config !== null), w = z(() => Object.keys(c.config?.presets || {}).length), h = z(() => i.value === "testing");
    function T(S) {
      const C = S instanceof Error ? S.message : String(S || "unknown_error");
      return C === "host_request_timeout" ? "请求等待超时，请检查网络后重试。" : C === "app_inactive" ? "页面已经关闭。" : C;
    }
    function O() {
      d && clearTimeout(d), d = setTimeout(() => {
        c.configSave = {
          status: "idle",
          requestId: "",
          error: ""
        }, c.inlineToastText = "", A();
      }, 1800);
    }
    async function R(S) {
      const C = S.payload || {};
      c.configSave = {
        status: "saving",
        requestId: "",
        error: ""
      }, c.inlineToastText = "正在保存共享配置…", A();
      try {
        const _ = (await t.bridge.request("agent-api/save", { patch: C }, 35e3)).result;
        if (_.ok !== !0 || !_.config)
          throw _.conflict && (c.configExternalChangePending = !0), new Error(_.error || "共享 Agent API 配置保存失败");
        c.config = En(_.config), c.configDraft = null, c.configDirty = !1, c.configExternalChangePending = !1, c.configFormSyncPending = !0, c.configSave = {
          status: "success",
          requestId: "",
          error: ""
        }, c.inlineToastText = "已保存；小白酒馆、画图、Ebook 与 OS 将读取同一份配置。";
      } catch (_) {
        const G = T(_);
        c.configSave = {
          status: "error",
          requestId: "",
          error: G
        }, c.inlineToastText = G;
      }
      A(), O();
    }
    async function F(S = !1) {
      const C = ++p;
      try {
        const _ = await t.bridge.request("agent-api/reload", {}, 35e3);
        if (C !== p) return;
        if (S && c.configDirty) {
          c.configExternalChangePending = !0, A();
          return;
        }
        x(_.result);
      } catch (_) {
        if (C !== p) return;
        n.value = {
          status: "error",
          config: null,
          message: T(_)
        }, A();
      }
    }
    async function q(S) {
      return (await t.bridge.request("agent-api/pull-models", { providerConfig: S }, Vl)).result.models;
    }
    const I = Tc({
      state: c,
      render: A,
      saveConfig: R,
      reloadConfig: F,
      pullModels: q,
      describeError: T
    });
    function A() {
      const S = l.value;
      !S || !c.config || (S.innerHTML = Ec({
        configSave: c.configSave,
        inlineToastText: c.inlineToastText,
        showAssistantPermissions: !1,
        showDelegateSettings: !1,
        showTavilySettings: !1,
        canDeletePreset: w.value > 1,
        configLoadError: n.value.status === "error" ? n.value.message : "",
        configExternalChangePending: c.configExternalChangePending
      }), I.syncConfigToForm(S), I.bindSettingsPanelEvents(S));
    }
    function x(S) {
      n.value = structuredClone(S), S.status === "ready" && S.config && (c.config = En(S.config), c.configDraft = null, c.configDirty = !1, c.configExternalChangePending = !1, c.configFormSyncPending = !0), nn(A);
    }
    async function M() {
      const S = l.value;
      if (!S || !y.value || h.value) return;
      const C = I.getActiveProviderConfigFromForm(S);
      i.value = "testing", r.value = "正在测试当前表单中的连接…";
      try {
        const _ = (await t.bridge.request("agent-api/test-connection", { providerConfig: structuredClone(/* @__PURE__ */ ue(C)) }, Vl)).result;
        i.value = "success", r.value = `${_.provider || "Provider"} · ${_.model || "当前模型"} · ${_.latencyMs} ms`;
      } catch (_) {
        i.value = "error", r.value = T(_);
      }
    }
    return at(() => {
      o = t.bridge.subscribe((S) => {
        if (S.type === "agent-api/state") {
          x(S.payload.state);
          return;
        }
        S.type === "agent-api/config-changed" && (c.configDirty ? (c.configExternalChangePending = !0, A()) : F(!0));
      }), x(a);
    }), ot(() => {
      p += 1, o(), d && clearTimeout(d);
    }), (S, C) => (g(), b("main", Ic, [C[5] || (C[5] = s("header", { class: "agent-api-header" }, [s("div", null, [
      s("span", null, "System service"),
      s("h1", null, "Agent API"),
      s("p", null, "一份配置，供小白酒馆、画图、Ebook 与 OS 共同使用。")
    ]), s("i", { "aria-hidden": "true" }, [s("b"), re(" API")])], -1)), s("div", Pc, [
      s("section", {
        class: te(["agent-api-connection", `is-${i.value}`]),
        "aria-labelledby": "agent-api-connection-title"
      }, [s("div", null, [
        C[1] || (C[1] = s("small", null, "CONNECTION CHECK", -1)),
        C[2] || (C[2] = s("h2", { id: "agent-api-connection-title" }, "当前连接", -1)),
        s("p", Oc, m(r.value), 1)
      ]), s("button", {
        type: "button",
        disabled: !y.value || h.value,
        onClick: M
      }, m(h.value ? "测试中…" : "测试当前连接"), 9, Rc)], 2),
      n.value.status === "loading" ? (g(), b("section", Lc, [...C[3] || (C[3] = [s("i", { "aria-hidden": "true" }, null, -1), s("div", null, [s("strong", null, "正在读取共享配置"), s("span", null, "页面打开不会连接模型供应商。")], -1)])])) : n.value.status === "error" ? (g(), b("section", Bc, [s("div", null, [C[4] || (C[4] = s("strong", null, "配置暂时无法读取", -1)), s("span", null, m(n.value.message), 1)]), s("button", {
        type: "button",
        onClick: C[0] || (C[0] = (_) => F())
      }, "重新读取")])) : j("", !0),
      Ae(s("section", Nc, [s("div", {
        ref_key: "panelRoot",
        ref: l
      }, null, 512)], 512), [[Fu, y.value]])
    ])]));
  }
}), qc = Dc, Uc = Object.freeze({
  id: "bank",
  name: "银行",
  accent: "#b89a58"
}), Fc = ["aria-labelledby"], jc = ["id"], Hc = { class: "bank-dialog-subject" }, Kc = { key: 0 }, Gc = { key: 1 }, Vc = {
  key: 0,
  class: "bank-dialog-field"
}, zc = { id: "bank-amount-help" }, Wc = {
  key: 1,
  class: "bank-dialog-validation"
}, Yc = {
  key: 2,
  class: "bank-dialog-summary"
}, Xc = {
  key: 3,
  class: "bank-dialog-warning"
}, Jc = {
  key: 4,
  class: "bank-dialog-warning is-loss"
}, Qc = {
  key: 5,
  class: "bank-dialog-error",
  role: "alert"
}, Zc = { class: "bank-dialog-actions" }, ef = ["disabled"], tf = ["disabled"], af = /* @__PURE__ */ se({
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
    const a = e, n = t, l = /* @__PURE__ */ K(a.product ? String(a.product.minAmount) : ""), i = z(() => a.mode === "deposit-open" ? "开立定期存单" : a.mode === "fund-open" ? "申购浮动理财" : "确认提前支取"), r = z(() => /^\d+$/.test(l.value.trim()) ? Number(l.value) : 0), o = z(() => a.mode === "withdraw" ? "" : !a.product || !Number.isSafeInteger(r.value) || r.value <= 0 ? "请输入正整数金额" : r.value < a.product.minAmount || r.value > a.product.maxAmount ? `金额须在 ${a.product.minAmount} 至 ${a.product.maxAmount} 之间` : r.value > a.balance ? "可用余额不足" : ""), d = z(() => a.mode === "deposit-open" ? a.product : null), p = z(() => d.value ? Math.floor(r.value * (1e4 + d.value.interestBps) / 1e4) : 0), c = z(() => !a.busy && (a.mode === "withdraw" || !o.value));
    function y() {
      if (c.value) {
        if (a.mode === "withdraw") {
          n("confirm");
          return;
        }
        n("confirm", r.value);
      }
    }
    return (w, h) => (g(), b("dialog", {
      open: "",
      class: "bank-dialog",
      "aria-labelledby": `bank-dialog-${e.mode}`,
      onClick: h[2] || (h[2] = tt((T) => !e.busy && w.$emit("cancel"), ["self"])),
      onKeydown: h[3] || (h[3] = pr(tt((T) => !e.busy && w.$emit("cancel"), ["stop", "prevent"]), ["esc"]))
    }, [s("form", {
      method: "dialog",
      class: "bank-dialog-card",
      onSubmit: tt(y, ["prevent"])
    }, [
      h[9] || (h[9] = s("span", { class: "bank-dialog-kicker" }, "VAULT AUTHORIZATION", -1)),
      s("h2", { id: `bank-dialog-${e.mode}` }, m(i.value), 9, jc),
      s("div", Hc, [s("span", null, m(e.mode === "withdraw" ? "取" : e.mode === "deposit-open" ? "定" : "理"), 1), s("div", null, [s("strong", null, m(e.position?.name || e.product?.name), 1), e.product ? (g(), b("small", Kc, m(e.product.lockLabel), 1)) : (g(), b("small", Gc, "当前本金 ¤ " + m(e.position?.principal.toLocaleString("zh-CN")), 1))])]),
      e.mode !== "withdraw" ? (g(), b("label", Vc, [
        h[5] || (h[5] = s("span", null, "开户金额", -1)),
        s("div", null, [h[4] || (h[4] = s("i", null, "¤", -1)), Ae(s("input", {
          "onUpdate:modelValue": h[0] || (h[0] = (T) => l.value = T),
          type: "text",
          inputmode: "numeric",
          autocomplete: "off",
          "aria-describedby": "bank-amount-help"
        }, null, 512), [[Be, l.value]])]),
        s("small", zc, "可用 " + m(e.balance.toLocaleString("zh-CN")) + " · 范围 " + m(e.product?.minAmount) + " - " + m(e.product?.maxAmount), 1)
      ])) : j("", !0),
      o.value ? (g(), b("p", Wc, m(o.value), 1)) : j("", !0),
      e.mode === "deposit-open" && d.value && !o.value ? (g(), b("dl", Yc, [s("div", null, [h[6] || (h[6] = s("dt", null, "锁定期限", -1)), s("dd", null, m(d.value.lockLabel), 1)]), s("div", null, [h[7] || (h[7] = s("dt", null, "到期兑付", -1)), s("dd", null, "¤ " + m(p.value.toLocaleString("zh-CN")), 1)])])) : j("", !0),
      e.mode === "fund-open" ? (g(), b("p", Xc, " 实际收益将在开户时封存，锁定期间不可退出，到期后才会揭晓并可领取。 ")) : j("", !0),
      e.mode === "withdraw" && e.position ? (g(), b("p", Jc, [
        h[8] || (h[8] = re(" 将立即收回 ", -1)),
        s("strong", null, m(e.position.earlyWithdrawalAmount.toLocaleString("zh-CN")) + " 小白币", 1),
        re("，相较本金损失 " + m((e.position.principal - e.position.earlyWithdrawalAmount).toLocaleString("zh-CN")) + " 小白币。此操作不可撤销。 ", 1)
      ])) : j("", !0),
      e.error ? (g(), b("p", Qc, m(e.error), 1)) : j("", !0),
      s("div", Zc, [s("button", {
        type: "button",
        disabled: e.busy,
        onClick: h[1] || (h[1] = (T) => w.$emit("cancel"))
      }, "取消", 8, ef), s("button", {
        type: "submit",
        class: "is-primary",
        disabled: !c.value
      }, m(e.busy ? "正在封存…" : e.mode === "withdraw" ? `确认收回 ${e.position?.earlyWithdrawalAmount || 0}` : "确认开户"), 9, tf)])
    ], 32)], 40, Fc));
  }
}), nf = af, sf = { "aria-labelledby": "bank-deposits-title" }, lf = { class: "bank-product-grid" }, rf = { class: "bank-product-index" }, of = { class: "bank-rate-block" }, uf = { class: "bank-product-terms" }, df = [
  "disabled",
  "title",
  "onClick"
], cf = /* @__PURE__ */ se({
  __name: "BankDeposits",
  props: {
    products: {},
    balance: {},
    writeDisabledReason: {}
  },
  emits: ["open"],
  setup(e) {
    return (t, a) => (g(), b("section", sf, [
      a[6] || (a[6] = s("header", { class: "bank-section-heading" }, [s("div", null, [s("span", null, "FIXED CERTIFICATES"), s("h2", { id: "bank-deposits-title" }, "定期存单")]), s("small", null, "到期收益确定")], -1)),
      a[7] || (a[7] = s("p", { class: "bank-section-intro" }, "本金锁定至约定回合。到期前可提前支取，最终到账额会在确认时明确列出。", -1)),
      s("div", lf, [(g(!0), b(Z, null, de(e.products, (n, l) => (g(), b("article", {
        key: n.id,
        class: "bank-product-card bank-deposit-card"
      }, [
        s("header", null, [
          s("span", rf, "0" + m(l + 1), 1),
          s("div", null, [s("small", null, m(n.lockLabel), 1), s("h3", null, m(n.name), 1)]),
          a[0] || (a[0] = s("span", { class: "bank-product-seal" }, "定", -1))
        ]),
        s("div", of, [
          a[1] || (a[1] = s("span", null, "到期收益率", -1)),
          s("strong", null, m(n.interestLabel), 1),
          a[2] || (a[2] = s("small", null, "固定收益", -1))
        ]),
        s("dl", uf, [s("div", null, [a[3] || (a[3] = s("dt", null, "开户范围", -1)), s("dd", null, m(n.amountLabel), 1)]), s("div", null, [a[4] || (a[4] = s("dt", null, "提前支取", -1)), s("dd", null, m(n.earlyPenaltyLabel), 1)])]),
        s("button", {
          type: "button",
          disabled: !!e.writeDisabledReason || e.balance < n.minAmount,
          title: e.writeDisabledReason || (e.balance < n.minAmount ? "可用余额不足最低开户额" : ""),
          onClick: (i) => t.$emit("open", n)
        }, [...a[5] || (a[5] = [re(" 开立存单", -1), s("span", null, "›", -1)])], 8, df)
      ]))), 128))])
    ]));
  }
}), ff = cf, vf = { "aria-labelledby": "bank-funds-title" }, pf = { class: "bank-product-grid" }, gf = { class: "bank-product-index" }, mf = { class: "bank-rate-block" }, bf = { class: "bank-product-terms" }, hf = [
  "disabled",
  "title",
  "onClick"
], yf = /* @__PURE__ */ se({
  __name: "BankFunds",
  props: {
    products: {},
    balance: {},
    writeDisabledReason: {}
  },
  emits: ["open"],
  setup(e) {
    return (t, a) => (g(), b("section", vf, [
      a[4] || (a[4] = s("header", { class: "bank-section-heading" }, [s("div", null, [s("span", null, "MANAGED FUNDS"), s("h2", { id: "bank-funds-title" }, "浮动理财")]), s("small", null, "到期前不揭晓结果")], -1)),
      a[5] || (a[5] = s("p", { class: "bank-section-intro" }, "收益在开户时封存，到期后才会公开。理财锁定期间不可提前退出。", -1)),
      s("div", pf, [(g(!0), b(Z, null, de(e.products, (n, l) => (g(), b("article", {
        key: n.id,
        class: "bank-product-card bank-fund-card"
      }, [
        s("header", null, [
          s("span", gf, "F" + m(l + 1), 1),
          s("div", null, [s("small", null, m(n.lockLabel), 1), s("h3", null, m(n.name), 1)]),
          s("span", { class: te(["bank-risk-badge", `is-${n.riskLevel}`]) }, m(n.riskLabel), 3)
        ]),
        s("p", null, m(n.description), 1),
        s("div", mf, [
          a[0] || (a[0] = s("span", null, "合同收益区间", -1)),
          s("strong", null, m(n.returnLabel), 1),
          a[1] || (a[1] = s("small", null, "实际结果到期可见", -1))
        ]),
        s("dl", bf, [s("div", null, [a[2] || (a[2] = s("dt", null, "开户范围", -1)), s("dd", null, m(n.amountLabel), 1)])]),
        s("button", {
          type: "button",
          disabled: !!e.writeDisabledReason || e.balance < n.minAmount,
          title: e.writeDisabledReason || (e.balance < n.minAmount ? "可用余额不足最低开户额" : ""),
          onClick: (i) => t.$emit("open", n)
        }, [...a[3] || (a[3] = [re(" 申购理财", -1), s("span", null, "›", -1)])], 8, hf)
      ]))), 128))])
    ]));
  }
}), kf = yf, wf = { "aria-labelledby": "bank-positions-title" }, $f = { class: "bank-section-heading" }, xf = ["disabled"], Sf = {
  key: 0,
  class: "bank-empty-state"
}, Cf = {
  key: 1,
  class: "bank-position-group"
}, _f = { class: "bank-position-top" }, Tf = { key: 0 }, Af = { class: "is-loss" }, Mf = [
  "disabled",
  "title",
  "onClick"
], Ef = {
  key: 1,
  class: "bank-due-note"
}, If = {
  key: 2,
  class: "bank-position-group"
}, Pf = { class: "bank-position-top" }, Of = {
  key: 0,
  class: "bank-fund-result"
}, Rf = {
  key: 1,
  class: "bank-sealed-copy"
}, Lf = /* @__PURE__ */ se({
  __name: "BankPositions",
  props: {
    deposits: {},
    investments: {},
    claimableCount: {},
    writeDisabledReason: {}
  },
  emits: ["withdraw", "settle"],
  setup(e) {
    return (t, a) => (g(), b("section", wf, [
      s("header", $f, [a[1] || (a[1] = s("div", null, [s("span", null, "SEALED POSITIONS"), s("h2", { id: "bank-positions-title" }, "我的头寸")], -1)), e.claimableCount ? (g(), b("button", {
        key: 0,
        type: "button",
        class: "bank-small-claim",
        disabled: !!e.writeDisabledReason,
        onClick: a[0] || (a[0] = (n) => t.$emit("settle"))
      }, " 领取全部 " + m(e.claimableCount) + " 笔 ", 9, xf)) : j("", !0)]),
      !e.deposits.length && !e.investments.length ? (g(), b("div", Sf, [...a[2] || (a[2] = [
        s("span", null, "◇", -1),
        s("strong", null, "金库尚无头寸", -1),
        s("p", null, "从定期或理财页面选择一份产品开始配置资产。", -1)
      ])])) : j("", !0),
      e.deposits.length ? (g(), b("div", Cf, [s("header", null, [a[3] || (a[3] = s("h3", null, "定期存单", -1)), s("span", null, m(e.deposits.length), 1)]), (g(!0), b(Z, null, de(e.deposits, (n) => (g(), b("article", {
        key: n.id,
        class: "bank-position-card"
      }, [
        s("div", _f, [
          a[4] || (a[4] = s("span", { class: "bank-position-mark" }, "定", -1)),
          s("div", null, [s("h4", null, m(n.name), 1), s("small", null, "本金 ¤ " + m(n.principal.toLocaleString("zh-CN")), 1)]),
          s("span", { class: te(["bank-position-status", { "is-due": n.claimable }]) }, m(n.statusLabel), 3)
        ]),
        s("dl", null, [s("div", null, [a[5] || (a[5] = s("dt", null, "到期兑付", -1)), s("dd", null, "¤ " + m(n.maturityAmount.toLocaleString("zh-CN")), 1)]), n.claimable ? j("", !0) : (g(), b("div", Tf, [a[6] || (a[6] = s("dt", null, "现在支取", -1)), s("dd", Af, "¤ " + m(n.earlyWithdrawalAmount.toLocaleString("zh-CN")), 1)]))]),
        n.claimable ? (g(), b("span", Ef, "将在“领取全部”时统一兑付")) : (g(), b("button", {
          key: 0,
          type: "button",
          class: "bank-withdraw-button",
          disabled: !!e.writeDisabledReason,
          title: e.writeDisabledReason,
          onClick: (l) => t.$emit("withdraw", n)
        }, " 提前支取 ", 8, Mf))
      ]))), 128))])) : j("", !0),
      e.investments.length ? (g(), b("div", If, [s("header", null, [a[7] || (a[7] = s("h3", null, "浮动理财", -1)), s("span", null, m(e.investments.length), 1)]), (g(!0), b(Z, null, de(e.investments, (n) => (g(), b("article", {
        key: n.id,
        class: "bank-position-card"
      }, [s("div", Pf, [
        a[8] || (a[8] = s("span", { class: "bank-position-mark" }, "理", -1)),
        s("div", null, [s("h4", null, m(n.name), 1), s("small", null, m(n.riskLabel) + " · 本金 ¤ " + m(n.principal.toLocaleString("zh-CN")), 1)]),
        s("span", { class: te(["bank-position-status", { "is-due": n.claimable }]) }, m(n.statusLabel), 3)
      ]), n.claimable ? (g(), b("div", Of, [
        a[9] || (a[9] = s("span", null, "封存结果已揭晓", -1)),
        s("strong", { class: te({ "is-negative": n.resolvedReturnBps < 0 }) }, m(n.returnLabel), 3),
        s("small", null, "可兑付 ¤ " + m(n.settlementAmount.toLocaleString("zh-CN")), 1)
      ])) : (g(), b("p", Rf, "收益结果仍在金库中封存，到期前不会公开。"))]))), 128))])) : j("", !0)
    ]));
  }
}), Bf = Lf, Nf = { "aria-labelledby": "bank-records-title" }, Df = { class: "bank-section-heading" }, qf = {
  key: 0,
  class: "bank-empty-state"
}, Uf = {
  key: 1,
  class: "bank-record-list"
}, Ff = { class: "bank-record-mark" }, jf = { class: "bank-record-main" }, Hf = {
  key: 0,
  class: "bank-inline-error",
  role: "alert"
}, Kf = ["disabled"], Gf = {
  key: 2,
  class: "bank-record-end"
}, Vf = /* @__PURE__ */ se({
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
    return (a, n) => (g(), b("section", Nf, [s("header", Df, [n[1] || (n[1] = s("div", null, [s("span", null, "SETTLEMENT ARCHIVE"), s("h2", { id: "bank-records-title" }, "金融记录")], -1)), s("small", null, m(e.total) + " 笔", 1)]), e.activities.length ? (g(), b("div", Uf, [
      (g(!0), b(Z, null, de(e.activities, (l) => (g(), b("article", {
        key: l.id,
        class: "bank-record-row"
      }, [
        s("span", Ff, m(l.kind === "deposit" ? "定" : "理"), 1),
        s("div", jf, [
          s("header", null, [s("strong", null, m(l.productName), 1), s("span", null, m(l.resultLabel), 1)]),
          s("dl", null, [s("div", null, [n[3] || (n[3] = s("dt", null, "投入", -1)), s("dd", null, "¤ " + m(l.amountIn.toLocaleString("zh-CN")), 1)]), s("div", null, [n[4] || (n[4] = s("dt", null, "兑付", -1)), s("dd", null, "¤ " + m(l.payout.toLocaleString("zh-CN")), 1)])]),
          s("small", null, m(l.turnLabel) + " · " + m(me(t).format(l.createdAt)), 1)
        ]),
        s("strong", { class: te(["bank-record-net", {
          "is-negative": l.net < 0,
          "is-flat": l.net === 0
        }]) }, [re(m(l.net > 0 ? "+" : "") + m(l.net) + " ", 1), s("small", null, m(l.netLabel), 1)], 2)
      ]))), 128)),
      e.error ? (g(), b("p", Hf, m(e.error), 1)) : j("", !0),
      e.hasMore ? (g(), b("button", {
        key: 1,
        type: "button",
        class: "bank-load-more",
        disabled: e.loadingMore,
        onClick: n[0] || (n[0] = (l) => a.$emit("loadMore"))
      }, m(e.loadingMore ? "正在开启下一册…" : "载入更多记录"), 9, Kf)) : (g(), b("p", Gf, "金库档案已全部展开"))
    ])) : (g(), b("div", qf, [...n[2] || (n[2] = [
      s("span", null, "簿", -1),
      s("strong", null, "尚无兑付记录", -1),
      s("p", null, "头寸到期领取或提前支取后，结果会归档在这里。", -1)
    ])]))]));
  }
}), zf = Vf, Wf = {
  class: "bank-vault",
  "aria-labelledby": "bank-vault-title"
}, Yf = { class: "bank-section-heading bank-vault-heading" }, Xf = { class: "bank-balance-panel" }, Jf = { class: "bank-vault-metrics" }, Qf = ["disabled", "title"], Zf = { class: "bank-vault-portals" }, ev = /* @__PURE__ */ se({
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
    return (t, a) => (g(), b("section", Wf, [
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
      s("header", Yf, [a[4] || (a[4] = s("div", null, [s("span", null, "PRIVATE RESERVE"), s("h2", { id: "bank-vault-title" }, "金库总览")], -1)), s("small", null, "第 " + m(e.currentTurn) + " 回合", 1)]),
      s("div", Xf, [
        a[6] || (a[6] = s("span", null, "可用资产", -1)),
        s("strong", null, [a[5] || (a[5] = s("small", null, "¤", -1)), re(m(e.balance.toLocaleString("zh-CN")), 1)]),
        a[7] || (a[7] = s("div", null, [s("span", null, "小白币活期余额"), s("i", null, "AVAILABLE")], -1))
      ]),
      s("div", Jf, [s("article", null, [
        a[8] || (a[8] = s("span", null, "锁定本金", -1)),
        s("strong", null, "¤ " + m(e.lockedAmount.toLocaleString("zh-CN")), 1),
        s("small", null, m(e.depositCount + e.fundCount) + " 笔持仓", 1)
      ]), s("article", { class: te({ "is-claimable": e.claimableCount > 0 }) }, [
        a[9] || (a[9] = s("span", null, "待领取", -1)),
        s("strong", null, m(e.claimableCount), 1),
        s("small", null, m(e.claimableCount ? "已到期，可统一兑付" : "暂无到期头寸"), 1)
      ], 2)]),
      e.claimableCount ? (g(), b("button", {
        key: 0,
        type: "button",
        class: "bank-claim-button",
        disabled: !!e.writeDisabledReason,
        title: e.writeDisabledReason,
        onClick: a[0] || (a[0] = (n) => t.$emit("settle"))
      }, [a[10] || (a[10] = s("span", null, "领取全部到期资产", -1)), s("small", null, m(e.claimableCount) + " 笔一并结算", 1)], 8, Qf)) : j("", !0),
      s("div", Zf, [
        s("button", {
          type: "button",
          onClick: a[1] || (a[1] = (n) => t.$emit("navigate", "deposits"))
        }, [
          a[11] || (a[11] = s("span", { class: "bank-portal-mark" }, "定", -1)),
          a[12] || (a[12] = s("strong", null, "定期存单", -1)),
          s("small", null, m(e.depositCount) + " 笔持有", 1),
          a[13] || (a[13] = s("i", null, "›", -1))
        ]),
        s("button", {
          type: "button",
          onClick: a[2] || (a[2] = (n) => t.$emit("navigate", "funds"))
        }, [
          a[14] || (a[14] = s("span", { class: "bank-portal-mark" }, "理", -1)),
          a[15] || (a[15] = s("strong", null, "浮动理财", -1)),
          s("small", null, m(e.fundCount) + " 笔持有", 1),
          a[16] || (a[16] = s("i", null, "›", -1))
        ]),
        s("button", {
          type: "button",
          onClick: a[3] || (a[3] = (n) => t.$emit("navigate", "records"))
        }, [...a[17] || (a[17] = [
          s("span", { class: "bank-portal-mark" }, "簿", -1),
          s("strong", null, "金融记录", -1),
          s("small", null, "查阅历史兑付", -1),
          s("i", null, "›", -1)
        ])])
      ])
    ]));
  }
}), tv = ev, av = { class: "bank-app" }, nv = { class: "bank-header" }, sv = { class: "bank-header-balance" }, lv = ["disabled"], iv = {
  class: "bank-navigation",
  "aria-label": "银行页面"
}, rv = { key: 0 }, ov = ["disabled"], uv = ["disabled"], dv = { class: "bank-scroll" }, Ra = 35e3, cv = /* @__PURE__ */ se({
  __name: "BankApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const t = e, a = /* @__PURE__ */ K(structuredClone(/* @__PURE__ */ ue(t.initialState))), n = /* @__PURE__ */ K("vault"), l = /* @__PURE__ */ K(null), i = /* @__PURE__ */ K(!1), r = /* @__PURE__ */ K(!1), o = /* @__PURE__ */ K(!1), d = /* @__PURE__ */ K(""), p = /* @__PURE__ */ K(""), c = /* @__PURE__ */ K("");
    let y = null, w = () => {
    }, h = 0;
    const T = z(() => a.value.status === "unconfirmed"), O = z(() => r.value ? "正在处理上一项银行操作" : i.value ? "正在刷新金库状态" : a.value.status !== "ready" ? a.value.message || "金库暂时不可写入" : a.value.generationActive ? "主剧情正在生成，请等待回复完成" : ""), R = z(() => i.value || r.value || T.value);
    function F() {
      return typeof globalThis.crypto?.randomUUID == "function" ? `bank-ui:${globalThis.crypto.randomUUID()}` : `bank-ui:${Date.now()}:${Math.random().toString(36).slice(2, 10)}`;
    }
    function q() {
      return { chatIdentity: a.value.chatIdentity };
    }
    function I(J) {
      a.value = structuredClone(J), i.value = !1, o.value = !1, d.value = "", c.value = "", J.claimableCount === 0 && (y = null);
    }
    function A(J) {
      const U = J instanceof Error ? J.message : String(J);
      return U.includes("economy_insufficient_funds") || U.includes("cannot be overdrawn") ? "可用小白币不足，开户未完成。" : U.includes("bank_amount_out_of_range") ? "开户金额不在该产品允许范围内。" : U.includes("bank_amount_invalid") ? "开户金额必须是正整数。" : U.includes("bank_revision_conflict") || U.includes("bank_event_id_conflict") ? "金库状态已变化，请关闭确认框并刷新后重试。" : U.includes("bank_position_missing") || U.includes("bank_position_state_changed") ? "该头寸状态已经变化，请刷新金库。" : U.includes("bank_no_due_positions") ? "当前没有可领取的到期头寸。" : U === "host_request_timeout" ? "等待保存结果超时，请保留当前页面并重试。" : "银行操作未完成，请稍后重试。";
    }
    async function x() {
      if (R.value) return;
      const J = ++h;
      i.value = !0, d.value = "";
      try {
        const U = await t.bridge.request("bank/refresh", q(), Ra);
        J === h && I(U.result);
      } catch (U) {
        J === h && (d.value = A(U));
      } finally {
        J === h && (i.value = !1);
      }
    }
    async function M() {
      if (i.value || r.value) return;
      const J = ++h;
      i.value = !0, d.value = "";
      try {
        const U = await t.bridge.request("bank/confirm-save", q(), Ra);
        J === h && I(U.result.state);
      } catch (U) {
        J === h && (d.value = A(U));
      } finally {
        J === h && (i.value = !1);
      }
    }
    function S(J, U) {
      O.value || (p.value = "", l.value = {
        mode: U,
        product: J,
        actionId: F()
      });
    }
    function C(J) {
      O.value || (p.value = "", l.value = {
        mode: "withdraw",
        position: J,
        actionId: F()
      });
    }
    function _() {
      r.value || (l.value = null, p.value = "");
    }
    async function G(J) {
      const U = l.value;
      if (!U || r.value) return;
      const le = h;
      r.value = !0, p.value = "";
      const ce = U.mode === "deposit-open" ? "bank/deposit/open" : U.mode === "fund-open" ? "bank/fund/open" : "bank/deposit/withdraw";
      try {
        const oe = await t.bridge.request(ce, {
          ...q(),
          expectedRevision: a.value.revision,
          expectedEventId: a.value.eventId,
          actionId: U.actionId,
          ...U.product ? {
            productId: U.product.id,
            amount: J
          } : {},
          ...U.position ? { positionId: U.position.id } : {}
        }, Ra);
        if (le !== h || l.value !== U) return;
        I(oe.result), l.value = null;
      } catch (oe) {
        le === h && l.value === U && (p.value = A(oe));
      } finally {
        le === h && (r.value = !1);
      }
    }
    async function ee() {
      if (O.value || a.value.claimableCount === 0) return;
      const J = h;
      y ||= F();
      const U = y;
      r.value = !0, d.value = "";
      try {
        const le = await t.bridge.request("bank/settle-due", {
          ...q(),
          expectedRevision: a.value.revision,
          expectedEventId: a.value.eventId,
          actionId: U
        }, Ra);
        if (J !== h) return;
        y = null, I(le.result);
      } catch (le) {
        J === h && (d.value = A(le));
      } finally {
        J === h && (r.value = !1);
      }
    }
    async function X() {
      if (!a.value.activityPage.hasMore || o.value || r.value) return;
      const J = h, U = a.value.activities.length;
      o.value = !0, c.value = "";
      try {
        const le = await t.bridge.request("bank/records/load-more", {
          ...q(),
          offset: U
        }, Ra);
        if (J !== h) return;
        const ce = new Set(a.value.activities.map((oe) => oe.id));
        a.value.activities.push(...le.result.activities.filter((oe) => !ce.has(oe.id))), a.value.activityPage = le.result.activityPage;
      } catch (le) {
        J === h && (c.value = A(le));
      } finally {
        J === h && (o.value = !1);
      }
    }
    return at(() => {
      w = t.bridge.subscribe((J) => {
        J.type === "bank/state" && (r.value || (h += 1), I(J.payload.state)), J.type === "bank/error" && (d.value = A(J.payload?.message || ""));
      });
    }), ot(() => {
      h += 1, w(), l.value = null, y = null;
    }), (J, U) => (g(), b("main", av, [
      s("header", nv, [
        U[10] || (U[10] = s("div", null, [s("span", { class: "bank-header-kicker" }, "JADE RESERVE · 01"), s("h1", null, "白银金库")], -1)),
        s("div", sv, [U[8] || (U[8] = s("small", null, "可用余额", -1)), s("strong", null, "¤ " + m(a.value.balance.toLocaleString("zh-CN")), 1)]),
        s("button", {
          type: "button",
          class: "bank-refresh",
          disabled: R.value,
          title: "重新读取金库",
          onClick: x
        }, [...U[9] || (U[9] = [s("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [s("path", { d: "M20 7v5h-5M4 17v-5h5M18.2 9A7 7 0 0 0 6.1 6.7L4 9m16 6-2.1 2.3A7 7 0 0 1 5.8 15" })], -1), s("span", { class: "bank-sr-only" }, "重新读取金库", -1)])], 8, lv)
      ]),
      s("nav", iv, [
        s("button", {
          type: "button",
          class: te({ "is-active": n.value === "vault" }),
          onClick: U[0] || (U[0] = (le) => n.value = "vault")
        }, [...U[11] || (U[11] = [s("span", null, "总览", -1)])], 2),
        s("button", {
          type: "button",
          class: te({ "is-active": n.value === "deposits" }),
          onClick: U[1] || (U[1] = (le) => n.value = "deposits")
        }, [...U[12] || (U[12] = [s("span", null, "定期", -1)])], 2),
        s("button", {
          type: "button",
          class: te({ "is-active": n.value === "funds" }),
          onClick: U[2] || (U[2] = (le) => n.value = "funds")
        }, [...U[13] || (U[13] = [s("span", null, "理财", -1)])], 2),
        s("button", {
          type: "button",
          class: te({ "is-active": n.value === "positions" }),
          onClick: U[3] || (U[3] = (le) => n.value = "positions")
        }, [U[14] || (U[14] = s("span", null, "头寸", -1)), a.value.claimableCount ? (g(), b("i", rv, m(a.value.claimableCount), 1)) : j("", !0)], 2),
        s("button", {
          type: "button",
          class: te({ "is-active": n.value === "records" }),
          onClick: U[4] || (U[4] = (le) => n.value = "records")
        }, [...U[15] || (U[15] = [s("span", null, "记录", -1)])], 2)
      ]),
      a.value.message || d.value ? (g(), b("aside", {
        key: 0,
        class: te(["bank-notice", `is-${a.value.status}`]),
        role: "status"
      }, [U[16] || (U[16] = s("span", { "aria-hidden": "true" }, "鉴", -1)), s("div", null, [
        s("strong", null, m(d.value && a.value.status === "ready" ? "操作未完成" : a.value.statusLabel), 1),
        s("p", null, m(d.value || a.value.message), 1),
        T.value ? (g(), b("button", {
          key: 0,
          type: "button",
          disabled: i.value,
          onClick: M
        }, m(i.value ? "正在核实…" : "核实保存结果"), 9, ov)) : a.value.status === "blocked" || a.value.status === "conflict" ? (g(), b("button", {
          key: 1,
          type: "button",
          disabled: i.value,
          onClick: x
        }, m(i.value ? "正在读取…" : "重新读取金库"), 9, uv)) : j("", !0)
      ])], 2)) : j("", !0),
      s("div", dv, [n.value === "vault" ? (g(), pe(tv, {
        key: 0,
        balance: a.value.balance,
        "locked-amount": a.value.lockedAmount,
        "current-turn": a.value.currentTurn,
        "deposit-count": a.value.deposits.length,
        "fund-count": a.value.investments.length,
        "claimable-count": a.value.claimableCount,
        "write-disabled-reason": O.value,
        onNavigate: U[5] || (U[5] = (le) => n.value = le),
        onSettle: ee
      }, null, 8, [
        "balance",
        "locked-amount",
        "current-turn",
        "deposit-count",
        "fund-count",
        "claimable-count",
        "write-disabled-reason"
      ])) : n.value === "deposits" ? (g(), pe(ff, {
        key: 1,
        products: a.value.products.deposits,
        balance: a.value.balance,
        "write-disabled-reason": O.value,
        onOpen: U[6] || (U[6] = (le) => S(le, "deposit-open"))
      }, null, 8, [
        "products",
        "balance",
        "write-disabled-reason"
      ])) : n.value === "funds" ? (g(), pe(kf, {
        key: 2,
        products: a.value.products.funds,
        balance: a.value.balance,
        "write-disabled-reason": O.value,
        onOpen: U[7] || (U[7] = (le) => S(le, "fund-open"))
      }, null, 8, [
        "products",
        "balance",
        "write-disabled-reason"
      ])) : n.value === "positions" ? (g(), pe(Bf, {
        key: 3,
        deposits: a.value.deposits,
        investments: a.value.investments,
        "claimable-count": a.value.claimableCount,
        "write-disabled-reason": O.value,
        onWithdraw: C,
        onSettle: ee
      }, null, 8, [
        "deposits",
        "investments",
        "claimable-count",
        "write-disabled-reason"
      ])) : (g(), pe(zf, {
        key: 4,
        activities: a.value.activities,
        total: a.value.activityPage.total,
        "has-more": a.value.activityPage.hasMore,
        "loading-more": o.value,
        error: c.value,
        onLoadMore: X
      }, null, 8, [
        "activities",
        "total",
        "has-more",
        "loading-more",
        "error"
      ]))]),
      l.value ? (g(), pe(nf, {
        key: 1,
        mode: l.value.mode,
        product: l.value.product,
        position: l.value.position,
        balance: a.value.balance,
        busy: r.value,
        error: p.value,
        onCancel: _,
        onConfirm: G
      }, null, 8, [
        "mode",
        "product",
        "position",
        "balance",
        "busy",
        "error"
      ])) : j("", !0)
    ]));
  }
}), fv = cv, vv = Object.freeze({
  id: "game",
  name: "游戏",
  accent: "#c8a35a"
}), pv = { class: "game-dialog-card" }, gv = {
  key: 0,
  class: "game-inline-error",
  role: "status"
}, mv = { class: "game-dialog-actions" }, bv = ["disabled"], hv = ["disabled"], yv = /* @__PURE__ */ se({
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
    return (t, a) => (g(), b("dialog", {
      open: "",
      class: "game-dialog",
      onCancel: a[2] || (a[2] = tt((n) => t.$emit("cancel"), ["prevent"]))
    }, [s("section", pv, [
      a[3] || (a[3] = s("span", { class: "game-eyebrow" }, "FINAL CALL", -1)),
      s("h2", null, m(e.heading), 1),
      s("p", null, m(e.summary), 1),
      e.error ? (g(), b("p", gv, m(e.error), 1)) : j("", !0),
      s("div", mv, [s("button", {
        type: "button",
        disabled: e.busy,
        onClick: a[0] || (a[0] = (n) => t.$emit("cancel"))
      }, "再想想", 8, bv), s("button", {
        type: "button",
        class: te(["is-primary", { "is-danger": e.danger }]),
        disabled: e.busy,
        onClick: a[1] || (a[1] = (n) => t.$emit("confirm"))
      }, m(e.busy ? "正在落账…" : e.confirmLabel), 11, hv)])
    ])], 32));
  }
}), kv = yv, Ar = {
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
}, wv = ["aria-label"], $v = { class: "game-die-stage" }, xv = { class: "game-die-pips" }, Sv = "rotateX(-17deg) rotateY(26deg)", zl = 1100, Cv = /* @__PURE__ */ se({
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
      return `${Sv} rotateX(${w}deg) rotateY(${h}deg)`;
    }
    function i() {
      return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    const r = /* @__PURE__ */ K(null), o = /* @__PURE__ */ K(null);
    let d = null, p = null;
    function c() {
      const [w, h] = n[t.value];
      r.value && (r.value.style.transform = l(w, h));
    }
    function y() {
      const w = r.value;
      if (!w) return;
      if (d?.cancel(), p?.cancel(), d = null, p = null, i() || typeof w.animate != "function") {
        c();
        return;
      }
      const [h, T] = n[t.value], O = 360 * (2 + Math.floor(Math.random() * 2)) + 146, R = 360 * (1 + Math.floor(Math.random() * 2)) + 101;
      d = w.animate([
        {
          transform: l(h - O, T - R),
          easing: "cubic-bezier(.11,.58,.32,1)"
        },
        {
          transform: l(h + 13, T + 9),
          offset: 0.84,
          easing: "cubic-bezier(.36,0,.4,1)"
        },
        { transform: l(h, T) }
      ], {
        duration: zl,
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
        duration: zl,
        delay: t.delay,
        fill: "both"
      }) ?? null;
    }
    return at(y), Sa(() => {
      d?.cancel(), p?.cancel();
    }), et(() => t.value, y), (w, h) => (g(), b("div", {
      ref_key: "shell",
      ref: o,
      class: te(["game-die", { "is-hit": e.highlight }]),
      role: "img",
      "aria-label": `骰子 ${e.value} 点`
    }, [s("div", $v, [s("div", {
      ref_key: "cube",
      ref: r,
      class: "game-die-cube"
    }, [(g(), b(Z, null, de(a, (T) => s("div", {
      key: T.side,
      class: te(["game-die-face", T.side])
    }, [s("div", xv, [(g(!0), b(Z, null, de(me(Ar)[T.face], ([O, R], F) => (g(), b("i", {
      key: F,
      class: "game-die-pip",
      style: Tt({ gridArea: `${O} / ${R}` })
    }, null, 4))), 128))])], 2)), 64))], 512)])], 10, wv));
  }
}), xs = Cv, _v = {
  class: "game-table game-dice-table",
  "aria-labelledby": "game-dice-title"
}, Tv = { class: "game-table-heading" }, Av = { class: "game-dice-cloth" }, Mv = { class: "game-dealer-position" }, Ev = {
  key: 0,
  class: "game-current-bid"
}, Iv = {
  key: 1,
  class: "game-current-bid is-empty"
}, Pv = { class: "game-player-hand" }, Ov = { class: "game-dice-row" }, Rv = {
  key: 0,
  class: "game-bid-builder"
}, Lv = {
  class: "game-bid-count",
  role: "group",
  "aria-label": "叫牌数量"
}, Bv = ["disabled"], Nv = ["disabled"], Dv = {
  class: "game-bid-faces",
  role: "group",
  "aria-label": "叫牌点数"
}, qv = [
  "disabled",
  "aria-pressed",
  "aria-label",
  "onClick"
], Uv = { class: "game-face-pips" }, Fv = { class: "game-dice-controls" }, jv = ["disabled", "title"], Hv = ["disabled", "title"], Kv = ["disabled", "title"], Gv = {
  key: 1,
  class: "game-bid-history",
  "aria-label": "公开叫牌记录"
}, Vv = /* @__PURE__ */ se({
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
    }, r = /* @__PURE__ */ K(i.count), o = /* @__PURE__ */ K(i.face), d = z(() => a.game.bids.at(-1) || null), p = z(() => a.game.legalBids[0] || null), c = z(() => {
      const R = a.game.legalBids.map((F) => F.count);
      return R.length === 0 ? {
        min: 1,
        max: 10
      } : {
        min: Math.min(...R),
        max: Math.max(...R)
      };
    }), y = z(() => a.game.legalBids.find((R) => R.count === r.value && R.face === o.value) || null);
    function w(R) {
      return a.game.legalBids.some((F) => F.face === R);
    }
    function h(R) {
      const F = r.value + R, { min: q, max: I } = c.value;
      F >= q && F <= I && (r.value = F);
    }
    et(() => c.value.min, (R) => {
      r.value < R && (r.value = R);
    });
    function T() {
      y.value && !a.writeDisabledReason && n("bid", {
        count: y.value.count,
        face: y.value.face
      });
    }
    function O() {
      const R = p.value;
      R && !a.writeDisabledReason && (r.value = R.count, o.value = R.face, n("bid", {
        count: R.count,
        face: R.face
      }));
    }
    return (R, F) => (g(), b("section", _v, [
      s("header", Tv, [
        s("button", {
          type: "button",
          class: "game-back",
          onClick: F[0] || (F[0] = (q) => n("lobby"))
        }, "返回大厅"),
        F[4] || (F[4] = s("div", null, [s("span", null, "LIAR'S DICE"), s("h2", { id: "game-dice-title" }, "秘骰对决")], -1)),
        s("strong", null, "托管 ¤ " + m(e.game.bet), 1)
      ]),
      s("div", Av, [
        s("div", Mv, [F[5] || (F[5] = s("span", {
          class: "game-dealer-chip",
          "aria-hidden": "true"
        }, "庄", -1)), s("p", null, m(d.value?.by === "dealer" ? "庄家已经加叫，轮到你决断。" : "庄家静候你的第一口价。"), 1)]),
        d.value ? (g(), b("div", Ev, [
          F[6] || (F[6] = s("small", null, "桌面叫数", -1)),
          s("strong", null, m(d.value.count), 1),
          s("span", null, "枚 " + m(d.value.face) + " 点", 1),
          s("em", null, m(d.value.by === "dealer" ? "庄家" : "你") + "叫牌", 1)
        ])) : (g(), b("div", Iv, [...F[7] || (F[7] = [s("span", null, "等待首轮叫牌", -1)])])),
        s("div", Pv, [
          F[8] || (F[8] = s("span", null, "你的骰子", -1)),
          s("div", Ov, [(g(!0), b(Z, null, de(e.game.playerDice, (q, I) => (g(), pe(xs, {
            key: I,
            value: q,
            delay: I * 85
          }, null, 8, ["value", "delay"]))), 128))]),
          F[9] || (F[9] = s("small", null, "一点可代替任意叫面", -1))
        ])
      ]),
      e.game.legalActions.includes("bid") ? (g(), b("div", Rv, [s("div", Lv, [
        s("button", {
          type: "button",
          disabled: !!e.writeDisabledReason || r.value <= c.value.min,
          "aria-label": "减少数量",
          onClick: F[1] || (F[1] = (q) => h(-1))
        }, " − ", 8, Bv),
        s("strong", null, m(r.value), 1),
        s("button", {
          type: "button",
          disabled: !!e.writeDisabledReason || r.value >= c.value.max,
          "aria-label": "增加数量",
          onClick: F[2] || (F[2] = (q) => h(1))
        }, " + ", 8, Nv),
        F[10] || (F[10] = s("small", null, "枚", -1))
      ]), s("div", Dv, [(g(), b(Z, null, de(l, (q) => s("button", {
        key: q,
        type: "button",
        class: te(["game-face-chip", { "is-active": q === o.value }]),
        disabled: !!e.writeDisabledReason || !w(q),
        "aria-pressed": q === o.value,
        "aria-label": `${q} 点`,
        onClick: (I) => o.value = q
      }, [s("span", Uv, [(g(!0), b(Z, null, de(me(Ar)[q], ([I, A], x) => (g(), b("i", {
        key: x,
        style: Tt({ gridArea: `${I} / ${A}` })
      }, null, 4))), 128))])], 10, qv)), 64))])])) : j("", !0),
      s("div", Fv, [
        e.game.legalActions.includes("bid") && p.value ? (g(), b("button", {
          key: 0,
          type: "button",
          class: "game-table-button game-min-raise",
          disabled: !!e.writeDisabledReason,
          title: e.writeDisabledReason,
          onClick: O
        }, " 最小加叫 " + m(p.value.count) + " × " + m(p.value.face), 9, jv)) : j("", !0),
        e.game.legalActions.includes("bid") ? (g(), b("button", {
          key: 1,
          type: "button",
          class: "game-primary-action",
          disabled: !!e.writeDisabledReason || !y.value,
          title: y.value ? e.writeDisabledReason : "这口叫数不高于桌面叫数",
          onClick: T
        }, " 加叫 " + m(r.value) + " × " + m(o.value), 9, Hv)) : j("", !0),
        e.game.legalActions.includes("challenge") ? (g(), b("button", {
          key: 2,
          type: "button",
          class: "game-danger-action",
          disabled: !!e.writeDisabledReason,
          title: e.writeDisabledReason,
          onClick: F[3] || (F[3] = (q) => n("challenge"))
        }, " 质疑 ", 8, Kv)) : j("", !0)
      ]),
      e.game.bids.length ? (g(), b("ol", Gv, [(g(!0), b(Z, null, de(e.game.bids, (q, I) => (g(), b("li", { key: `${I}:${q.count}:${q.face}` }, [s("span", null, m(q.by === "player" ? "你" : "庄家"), 1), s("strong", null, m(q.count) + " × " + m(q.face) + " 点", 1)]))), 128))])) : j("", !0)
    ]));
  }
}), zv = Vv, Wv = {
  class: "game-table game-dice-reveal",
  "aria-labelledby": "game-reveal-title"
}, Yv = { class: "game-table-heading" }, Xv = { class: "game-reveal-side" }, Jv = { class: "game-dice-row" }, Qv = { class: "game-reveal-side" }, Zv = { class: "game-dice-row" }, ep = {
  key: 0,
  class: "game-reveal-tally"
}, tp = {
  key: 1,
  class: "game-reveal-hint"
}, is = 85, ap = 1500, Wl = 700, np = 620, sp = /* @__PURE__ */ se({
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
    function o(O) {
      return l.indexOf(i.value) >= l.indexOf(O);
    }
    function d() {
      for (; r.length > 0; ) {
        const O = r.pop();
        O !== void 0 && window.clearTimeout(O);
      }
    }
    function p() {
      d(), i.value = "settled";
    }
    function c(O) {
      return O === 1 || O === a.detail.finalBid.face;
    }
    const y = z(() => a.detail.dealerDice.length * is), w = z(() => a.detail.matchingDiceCount >= a.detail.finalBid.count), h = z(() => a.detail.challenger === "player" ? "你" : "庄家"), T = z(() => a.detail.finalBid.by === "player" ? "你" : "庄家");
    return at(() => {
      if (typeof window > "u") {
        i.value = "settled";
        return;
      }
      const O = y.value + ap;
      r.push(window.setTimeout(() => {
        i.value = "counting";
      }, O)), r.push(window.setTimeout(() => {
        i.value = "verdict";
      }, O + Wl)), r.push(window.setTimeout(() => {
        i.value = "settled";
      }, O + Wl + np));
    }), Sa(d), (O, R) => (g(), b("section", Wv, [
      s("header", Yv, [
        R[2] || (R[2] = s("span", { class: "game-reveal-eyebrow" }, "SHOWDOWN", -1)),
        s("div", null, [s("span", null, m(h.value) + "提出质疑", 1), R[1] || (R[1] = s("h2", { id: "game-reveal-title" }, "摊牌", -1))]),
        s("strong", null, m(T.value) + "叫 " + m(e.detail.finalBid.count) + " × " + m(e.detail.finalBid.face) + " 点", 1)
      ]),
      s("div", {
        class: "game-reveal-cloth",
        onClick: p
      }, [
        s("div", Xv, [R[3] || (R[3] = s("span", null, "庄家", -1)), s("div", Jv, [(g(!0), b(Z, null, de(e.detail.dealerDice, (F, q) => (g(), pe(xs, {
          key: `dealer:${q}`,
          value: F,
          delay: q * is,
          highlight: o("counting") && c(F)
        }, null, 8, [
          "value",
          "delay",
          "highlight"
        ]))), 128))])]),
        s("div", Qv, [R[4] || (R[4] = s("span", null, "你", -1)), s("div", Zv, [(g(!0), b(Z, null, de(e.detail.playerDice, (F, q) => (g(), pe(xs, {
          key: `player:${q}`,
          value: F,
          delay: q * is,
          highlight: o("counting") && c(F)
        }, null, 8, [
          "value",
          "delay",
          "highlight"
        ]))), 128))])]),
        o("counting") ? (g(), b("p", ep, [
          s("span", null, m(e.detail.finalBid.face) + " 点合计（1 点通配）", 1),
          s("strong", null, m(e.detail.matchingDiceCount), 1),
          R[5] || (R[5] = s("span", null, "枚", -1))
        ])) : j("", !0),
        o("verdict") ? (g(), b("p", {
          key: 1,
          class: te(["game-reveal-verdict", w.value ? "is-holds" : "is-broken"])
        }, [re(" 实际 " + m(e.detail.matchingDiceCount) + " 枚 " + m(w.value ? "≥" : "<") + " 叫数 " + m(e.detail.finalBid.count) + " 枚 ", 1), s("strong", null, m(w.value ? "叫牌成立，质疑失败" : "叫牌不成立，质疑得手"), 1)], 2)) : j("", !0)
      ]),
      o("settled") ? (g(), b("div", {
        key: 0,
        class: te(["game-reveal-outcome", `is-${e.record.outcomeTone}`])
      }, [
        s("strong", null, m(e.record.outcomeLabel), 1),
        s("em", null, m(e.record.net > 0 ? "+" : "") + m(e.record.net) + " 小白币", 1),
        s("button", {
          type: "button",
          class: "game-primary-action",
          onClick: R[0] || (R[0] = (F) => n("done"))
        }, "回到大厅")
      ], 2)) : (g(), b("p", tp, "点击牌桌跳过"))
    ]));
  }
}), lp = sp, ip = {
  class: "game-table game-ladder-table",
  "aria-labelledby": "game-ladder-title"
}, rp = { class: "game-table-heading" }, op = { class: "game-ladder-stage" }, up = {
  class: "game-ladder-track",
  "aria-label": "五层挑战进度"
}, dp = { key: 0 }, cp = { key: 1 }, fp = { class: "game-ladder-purse" }, vp = {
  key: 1,
  class: "game-ladder-settling",
  role: "status"
}, pp = {
  key: 0,
  class: "game-ladder-choices"
}, gp = [
  "disabled",
  "title",
  "onClick"
], mp = ["disabled", "title"], bp = 720, hp = 620, yp = /* @__PURE__ */ se({
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
    }), i = /* @__PURE__ */ K(a.game.completedFloors), r = /* @__PURE__ */ K(a.game.cashoutAmount), o = /* @__PURE__ */ K(a.game.canCashOut), d = /* @__PURE__ */ K(0), p = /* @__PURE__ */ K(null), c = [];
    function y() {
      return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    function w() {
      for (; c.length > 0; ) {
        const I = c.pop();
        I !== void 0 && window.clearTimeout(I);
      }
    }
    function h(I, A) {
      if (w(), d.value = i.value + 1, p.value = null, y() || typeof window > "u") {
        p.value = I, A();
        return;
      }
      c.push(window.setTimeout(() => {
        p.value = I, A(), I === "rise" && !a.ending && c.push(window.setTimeout(() => {
          d.value = 0, p.value = null;
        }, hp));
      }, bp));
    }
    et(() => a.game.completedFloors, (I, A) => {
      if (I > A) {
        h("rise", () => {
          i.value = I, r.value = a.game.cashoutAmount, o.value = a.game.canCashOut;
        });
        return;
      }
      i.value = I, r.value = a.game.cashoutAmount, o.value = a.game.canCashOut;
    }), et(() => a.ending, (I) => {
      if (!I || I.detail.kind !== "ladder") return;
      const A = I.detail.steps.at(-1);
      A && h(A.success ? "rise" : "fall", () => {
        A.success && (i.value = A.floor, r.value = A.amountAfterStep);
      });
    }, { immediate: !0 });
    const T = z(() => d.value > 0 && p.value === null), O = z(() => !!a.ending && (p.value !== null || d.value === 0)), R = z(() => !!a.writeDisabledReason || !!a.ending || d.value > 0);
    function F(I) {
      return {
        "is-complete": I <= i.value,
        "is-next": I === i.value + 1 && d.value === 0,
        "is-judging": I === d.value && p.value === null,
        "is-risen": I === d.value && p.value === "rise",
        "is-fallen": I === d.value && p.value === "fall"
      };
    }
    function q(I) {
      return `${I / 100}%`;
    }
    return Sa(w), (I, A) => (g(), b("section", ip, [
      s("header", rp, [
        s("button", {
          type: "button",
          class: "game-back",
          onClick: A[0] || (A[0] = (x) => n("lobby"))
        }, "返回大厅"),
        A[3] || (A[3] = s("div", null, [s("span", null, "THE GILDED ASCENT"), s("h2", { id: "game-ladder-title" }, "鎏金阶梯")], -1)),
        s("strong", null, "托管 ¤ " + m(e.game.bet), 1)
      ]),
      s("div", op, [s("div", up, [(g(), b(Z, null, de(5, (x) => s("div", {
        key: x,
        class: te(["game-ladder-floor", F(x)])
      }, [s("span", null, m(x), 1), e.game.steps[x - 1] && x <= i.value ? (g(), b("small", dp, " ¤ " + m(e.game.steps[x - 1]?.amountAfterSuccess), 1)) : (g(), b("small", cp, "第 " + m(x) + " 层", 1))], 2)), 64))]), s("div", fp, [
        s("span", null, m(o.value ? "当前可收手" : "风险起点"), 1),
        s("strong", null, "¤ " + m(r.value), 1),
        s("small", null, "已完成 " + m(i.value) + " / 5 层", 1)
      ])]),
      O.value && e.ending ? (g(), b("div", {
        key: 0,
        class: te(["game-reveal-outcome", `is-${e.ending.outcomeTone}`])
      }, [
        s("strong", null, m(e.ending.outcomeLabel), 1),
        s("em", null, m(e.ending.net > 0 ? "+" : "") + m(e.ending.net) + " 小白币", 1),
        s("button", {
          type: "button",
          class: "game-primary-action",
          onClick: A[1] || (A[1] = (x) => n("finished"))
        }, "回到大厅")
      ], 2)) : T.value ? (g(), b("p", vp, "正在判定第 " + m(d.value) + " 层…", 1)) : e.ending ? j("", !0) : (g(), b(Z, { key: 2 }, [e.game.legalActions.includes("step") ? (g(), b("div", pp, [(g(!0), b(Z, null, de(e.game.nextChoices, (x) => (g(), b("button", {
        key: x.choice,
        type: "button",
        class: te(`is-${x.choice}`),
        disabled: R.value,
        title: e.writeDisabledReason,
        onClick: (M) => n("step", x.choice)
      }, [
        s("span", null, m(me(l)[x.choice].name), 1),
        s("small", null, m(me(l)[x.choice].note), 1),
        s("strong", null, m(q(x.successProbabilityBps)), 1),
        s("em", null, "成功得 ¤ " + m(x.successAmount), 1)
      ], 10, gp))), 128))])) : j("", !0), e.game.legalActions.includes("cash-out") ? (g(), b("button", {
        key: 1,
        type: "button",
        class: "game-ladder-cashout",
        disabled: R.value,
        title: e.writeDisabledReason,
        onClick: A[2] || (A[2] = (x) => n("cashOut"))
      }, " 收手并领取 ¤ " + m(r.value), 9, mp)) : j("", !0)], 64))
    ]));
  }
}), kp = yp, wp = {
  class: "game-lobby",
  "aria-labelledby": "game-lobby-title"
}, $p = {
  key: 0,
  class: "game-continue-card"
}, xp = {
  key: 1,
  class: "game-grid"
}, Sp = { class: "game-card is-dice" }, Cp = { class: "game-bet-field" }, _p = ["disabled", "title"], Tp = {
  key: 0,
  class: "game-card-reason"
}, Ap = { class: "game-card is-push" }, Mp = ["disabled", "title"], Ep = {
  key: 0,
  class: "game-card-reason"
}, Ip = { class: "game-card is-ladder" }, Pp = { class: "game-bet-field" }, Op = ["disabled", "title"], Rp = {
  key: 0,
  class: "game-card-reason"
}, Lp = /* @__PURE__ */ se({
  __name: "GameLobby",
  props: {
    activeGame: {},
    balance: {},
    lockedAmount: {},
    writeDisabledReason: {}
  },
  emits: ["start", "continue"],
  setup(e, { emit: t }) {
    const a = e, n = t, l = /* @__PURE__ */ K(50), i = /* @__PURE__ */ K(30), r = z(() => a.activeGame?.kind === "dice" ? "秘骰对决" : a.activeGame?.kind === "push" ? "翻倍或收手" : a.activeGame?.kind === "ladder" ? "鎏金阶梯" : "");
    function o() {
      return a.writeDisabledReason ? a.writeDisabledReason : !Number.isSafeInteger(l.value) || l.value < 50 || l.value > 500 || l.value % 10 !== 0 ? "下注须为 50 至 500，且为 10 的倍数" : a.balance < l.value ? "余额不足" : "";
    }
    function d() {
      return a.writeDisabledReason ? a.writeDisabledReason : a.balance < 50 ? "余额不足" : "";
    }
    function p() {
      return a.writeDisabledReason ? a.writeDisabledReason : !Number.isSafeInteger(i.value) || i.value < 30 || i.value > 800 || i.value % 10 !== 0 ? "下注须为 30 至 800，且为 10 的倍数" : a.balance < i.value ? "余额不足" : "";
    }
    return (c, y) => (g(), b("section", wp, [y[17] || (y[17] = s("div", { class: "game-lobby-hero" }, [
      s("span", { class: "game-eyebrow" }, "THE GILDED PARLOUR"),
      s("h2", { id: "game-lobby-title" }, "今夜，押注你的判断"),
      s("p", null, "三张独立牌桌，只认明确选择。每一步都会先落账，再揭晓。")
    ], -1)), e.activeGame ? (g(), b("article", $p, [
      y[7] || (y[7] = s("div", {
        class: "game-continue-seal",
        "aria-hidden": "true"
      }, "续", -1)),
      s("div", null, [
        y[6] || (y[6] = s("span", null, "牌桌仍在等候", -1)),
        s("h3", null, m(r.value), 1),
        s("p", null, "已有 ¤ " + m(e.lockedAmount) + " 托管在本局，离开页面不会结束赌局。", 1)
      ]),
      s("button", {
        type: "button",
        onClick: y[0] || (y[0] = (w) => n("continue", e.activeGame.kind))
      }, "继续本局")
    ])) : (g(), b("div", xp, [
      s("article", Sp, [
        y[9] || (y[9] = s("div", {
          class: "game-glyph",
          "aria-hidden": "true"
        }, [s("span", null, "⚄"), s("span", null, "⚂")], -1)),
        y[10] || (y[10] = s("div", { class: "game-copy" }, [
          s("span", { class: "game-card-index" }, "TABLE 01"),
          s("h3", null, "秘骰对决"),
          s("p", null, "五骰藏锋，一点为百搭。抬高叫数，或当场质疑庄家。"),
          s("ul", null, [s("li", null, "下注 50–500"), s("li", null, "胜出返还 1.8 倍")])
        ], -1)),
        s("label", Cp, [y[8] || (y[8] = s("span", null, "下注", -1)), Ae(s("input", {
          "onUpdate:modelValue": y[1] || (y[1] = (w) => l.value = w),
          type: "number",
          min: "50",
          max: "500",
          step: "10"
        }, null, 512), [[
          Be,
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
        }, " 入席 ", 8, _p),
        o() ? (g(), b("small", Tp, m(o()), 1)) : j("", !0)
      ]),
      s("article", Ap, [
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
          disabled: !!d(),
          title: d(),
          onClick: y[3] || (y[3] = (w) => n("start", "push", 50))
        }, " 揭牌 ", 8, Mp),
        d() ? (g(), b("small", Ep, m(d()), 1)) : j("", !0)
      ]),
      s("article", Ip, [
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
        s("label", Pp, [y[14] || (y[14] = s("span", null, "下注", -1)), Ae(s("input", {
          "onUpdate:modelValue": y[4] || (y[4] = (w) => i.value = w),
          type: "number",
          min: "30",
          max: "800",
          step: "10"
        }, null, 512), [[
          Be,
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
        }, " 登阶 ", 8, Op),
        p() ? (g(), b("small", Rp, m(p()), 1)) : j("", !0)
      ])
    ]))]));
  }
}), Bp = Lp, Np = {
  class: "game-table game-push-table",
  "aria-labelledby": "game-push-title"
}, Dp = { class: "game-table-heading" }, qp = { class: "game-push-stage" }, Up = { class: "game-flip-card" }, Fp = {
  class: "game-coin-stack",
  "aria-label": "已翻出的金币"
}, jp = {
  key: 0,
  class: "game-empty-stack"
}, Hp = {
  class: "game-card-fan",
  "aria-hidden": "true"
}, Kp = { class: "game-push-metrics" }, Gp = {
  key: 1,
  class: "game-actions"
}, Vp = ["disabled", "title"], zp = ["disabled", "title"], Wp = 660, Yp = /* @__PURE__ */ se({
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
    }), r = /* @__PURE__ */ K(null), o = /* @__PURE__ */ K(!1), d = /* @__PURE__ */ K(!1);
    let p = 0;
    function c() {
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
    function h(q, I) {
      if (w(), r.value = q, d.value = !1, y() || typeof window > "u") {
        o.value = !0, d.value = !0, I();
        return;
      }
      o.value = !1, window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          o.value = !0;
        });
      }), p = window.setTimeout(() => {
        d.value = !0, I();
      }, Wp);
    }
    et(() => a.game.revealedCoins, (q, I) => {
      if (q > I) {
        h("coin", () => {
          l.value = q, c();
        });
        return;
      }
      l.value = q, c();
    }), et(() => a.ending, (q) => {
      q?.outcome === "busted" && h("bomb", () => {
      });
    }, { immediate: !0 });
    const T = z(() => a.ending?.outcome === "busted"), O = z(() => !!a.ending && (!T.value || d.value)), R = z(() => !!a.writeDisabledReason || !!a.ending);
    function F(q) {
      return `${(q / 100).toFixed(q % 100 === 0 ? 0 : 2)}%`;
    }
    return Sa(w), (q, I) => (g(), b("section", Np, [
      s("header", Dp, [
        s("button", {
          type: "button",
          class: "game-back",
          onClick: I[0] || (I[0] = (A) => n("lobby"))
        }, "返回大厅"),
        I[4] || (I[4] = s("div", null, [s("span", null, "DOUBLE OR HOLD"), s("h2", { id: "game-push-title" }, "翻倍或收手")], -1)),
        s("strong", null, "托管 ¤ " + m(e.game.bet), 1)
      ]),
      s("div", qp, [
        r.value ? (g(), b("div", {
          key: 0,
          class: te(["game-flip-slot", { "is-flipped": o.value }])
        }, [s("div", Up, [I[5] || (I[5] = s("span", {
          class: "game-flip-back",
          "aria-hidden": "true"
        }, null, -1)), s("span", { class: te(["game-flip-front", `is-${r.value}`]) }, m(r.value === "bomb" ? "✸" : "¤"), 3)])], 2)) : j("", !0),
        s("div", Fp, [l.value === 0 && !r.value ? (g(), b("span", jp, "尚未揭牌")) : j("", !0), (g(!0), b(Z, null, de(l.value, (A) => (g(), b("b", {
          key: A,
          class: "game-revealed-coin"
        }, "¤"))), 128))]),
        s("div", Hp, [(g(!0), b(Z, null, de(i.value.remainingCards, (A) => (g(), b("i", {
          key: A,
          style: Tt({ "--card": A })
        }, null, 4))), 128))])
      ]),
      s("div", Kp, [
        s("div", null, [I[6] || (I[6] = s("span", null, "可收手", -1)), s("strong", null, "¤ " + m(i.value.cashoutAmount), 1)]),
        s("div", null, [I[7] || (I[7] = s("span", null, "余牌", -1)), s("strong", null, m(i.value.remainingCards), 1)]),
        s("div", null, [I[8] || (I[8] = s("span", null, "余雷", -1)), s("strong", null, m(i.value.remainingBombs), 1)]),
        s("div", null, [I[9] || (I[9] = s("span", null, "下一张风险", -1)), s("strong", null, m(F(i.value.nextBombProbabilityBps)), 1)])
      ]),
      I[10] || (I[10] = s("p", { class: "game-rule-note" }, "每枚金币增加 ¤ 50；翻到炸弹立即以零返还结束。", -1)),
      O.value && e.ending ? (g(), b("div", {
        key: 0,
        class: te(["game-reveal-outcome", `is-${e.ending.outcomeTone}`])
      }, [
        s("strong", null, m(e.ending.outcomeLabel), 1),
        s("em", null, m(e.ending.net > 0 ? "+" : "") + m(e.ending.net) + " 小白币", 1),
        s("button", {
          type: "button",
          class: "game-primary-action",
          onClick: I[1] || (I[1] = (A) => n("finished"))
        }, "回到大厅")
      ], 2)) : e.ending ? j("", !0) : (g(), b("div", Gp, [e.game.legalActions.includes("draw") ? (g(), b("button", {
        key: 0,
        type: "button",
        class: "game-primary-action",
        disabled: R.value,
        title: e.writeDisabledReason,
        onClick: I[2] || (I[2] = (A) => n("draw"))
      }, " 再翻一张 ", 8, Vp)) : j("", !0), e.game.legalActions.includes("cash-out") ? (g(), b("button", {
        key: 1,
        type: "button",
        class: "game-secondary-action",
        disabled: R.value,
        title: e.writeDisabledReason,
        onClick: I[3] || (I[3] = (A) => n("cashOut"))
      }, " 收手入账 ", 8, zp)) : j("", !0)]))
    ]));
  }
}), Xp = Yp, Jp = {
  class: "game-records",
  "aria-labelledby": "game-records-title"
}, Qp = { class: "game-section-heading" }, Zp = {
  key: 0,
  class: "game-record-list"
}, eg = {
  class: "game-record-mark",
  "aria-hidden": "true"
}, tg = { class: "game-record-main" }, ag = ["datetime"], ng = { class: "game-record-money" }, sg = {
  key: 0,
  class: "game-record-detail"
}, lg = {
  key: 1,
  class: "game-record-detail"
}, ig = {
  key: 2,
  class: "game-record-steps"
}, rg = {
  key: 1,
  class: "game-record-empty"
}, og = {
  key: 2,
  class: "game-inline-error",
  role: "status"
}, ug = ["disabled"], dg = /* @__PURE__ */ se({
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
    return (n, l) => (g(), b("section", Jp, [
      s("header", Qp, [l[1] || (l[1] = s("div", null, [s("span", null, "HOUSE LEDGER"), s("h2", { id: "game-records-title" }, "牌桌记录")], -1)), s("small", null, m(e.total) + " 局", 1)]),
      e.records.length ? (g(), b("div", Zp, [(g(!0), b(Z, null, de(e.records, (i) => (g(), b("article", {
        key: i.id,
        class: te(["game-record", `is-${i.outcomeTone}`])
      }, [s("div", eg, m(i.game === "dice" ? "骰" : i.game === "push" ? "翻" : "阶"), 1), s("div", tg, [
        s("header", null, [s("div", null, [s("span", null, m(i.gameLabel), 1), s("strong", null, m(i.outcomeLabel), 1)]), s("time", { datetime: new Date(i.createdAt).toISOString() }, m(a(i.createdAt)), 9, ag)]),
        s("div", ng, [
          s("span", null, "下注 ¤ " + m(i.amountIn), 1),
          s("span", null, "返还 ¤ " + m(i.payout), 1),
          s("strong", null, m(i.net > 0 ? "+" : "") + m(i.net), 1)
        ]),
        s("details", null, [l[2] || (l[2] = s("summary", null, "查看公开牌局", -1)), i.detail.kind === "dice" ? (g(), b("div", sg, [
          s("p", null, "终局叫数：" + m(i.detail.finalBid.count) + " 枚 " + m(i.detail.finalBid.face) + " 点", 1),
          s("p", null, "实际匹配：" + m(i.detail.matchingDiceCount) + " 枚 · " + m(i.detail.challenger === "player" ? "玩家" : "庄家") + "质疑", 1),
          s("p", null, "你的骰子：" + m(i.detail.playerDice.join(" · ")), 1)
        ])) : i.detail.kind === "push" ? (g(), b("div", lg, [s("p", null, "共翻出 " + m(i.detail.revealedCoins) + " 枚金币", 1)])) : (g(), b("ol", ig, [(g(!0), b(Z, null, de(i.detail.steps, (r) => (g(), b("li", { key: r.floor }, " 第 " + m(r.floor) + " 层 · " + m(me(t)[r.choice]) + " · " + m(r.success ? `成功至 ¤ ${r.amountAfterStep}` : "挑战失败"), 1))), 128))]))])
      ])], 2))), 128))])) : (g(), b("div", rg, [...l[3] || (l[3] = [s("span", { "aria-hidden": "true" }, "◇", -1), s("p", null, "尚无结算记录", -1)])])),
      e.error ? (g(), b("p", og, m(e.error), 1)) : j("", !0),
      e.hasMore ? (g(), b("button", {
        key: 3,
        type: "button",
        class: "game-load-more",
        disabled: e.loadingMore,
        onClick: l[0] || (l[0] = (i) => n.$emit("loadMore"))
      }, m(e.loadingMore ? "正在翻阅…" : "继续翻阅记录"), 9, ug)) : j("", !0)
    ]));
  }
}), cg = dg, fg = { class: "game-app" }, vg = { class: "game-header" }, pg = { class: "game-funds" }, gg = ["disabled"], mg = {
  class: "game-nav",
  "aria-label": "游戏页面"
}, bg = ["disabled"], hg = ["disabled"], yg = {
  key: 1,
  class: "game-action-error",
  role: "status"
}, kg = ["disabled"], wg = { class: "game-scroll" }, pn = 35e3, $g = /* @__PURE__ */ se({
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
    ]), a = e, n = /* @__PURE__ */ K(structuredClone(/* @__PURE__ */ ue(a.initialState))), l = /* @__PURE__ */ K(n.value.activeGame?.kind || "lobby"), i = /* @__PURE__ */ K(!1), r = /* @__PURE__ */ K(!1), o = /* @__PURE__ */ K(!1), d = /* @__PURE__ */ K(""), p = /* @__PURE__ */ K(""), c = /* @__PURE__ */ K(""), y = /* @__PURE__ */ K(null), w = /* @__PURE__ */ K(null), h = /* @__PURE__ */ K(""), T = /* @__PURE__ */ K(null);
    let O = () => {
    }, R = 0, F = 0;
    const q = z(() => n.value.status === "unconfirmed"), I = z(() => r.value ? "正在处理上一项操作" : i.value ? "正在刷新游戏状态" : n.value.status !== "ready" ? n.value.message || "游戏暂时不可写入" : n.value.generationActive ? "主剧情正在生成，请等待回复完成" : ""), A = z(() => i.value || r.value || q.value || n.value.status === "conflict"), x = z(() => n.value.records.find((W) => W.id === h.value) || null), M = z(() => T.value?.kind === "push" ? T.value.game : n.value.activeGame?.kind === "push" ? n.value.activeGame : null), S = z(() => T.value?.kind === "ladder" ? T.value.game : n.value.activeGame?.kind === "ladder" ? n.value.activeGame : null);
    function C() {
      return typeof globalThis.crypto?.randomUUID == "function" ? `game-ui:${globalThis.crypto.randomUUID()}` : (F += 1, `game-ui:${Date.now()}:${F}`);
    }
    function _() {
      return { chatIdentity: n.value.chatIdentity };
    }
    function G(W) {
      const H = W instanceof Error ? W.message : String(W);
      return H.includes("cannot be overdrawn") || H.includes("economy_insufficient_funds") ? "小白币余额不足，未能入局。" : H.includes("game_revision_conflict") || H.includes("game_event_id_conflict") ? "牌局已经变化，请重新读取后再操作。" : H.includes("game_dice_bid_not_higher") ? "叫数必须高于桌面当前叫数。" : H.includes("game_action_invalid") ? "当前牌局不接受这项操作。" : H.includes("game_main_generation_active") ? "主剧情正在生成，请等待回复完成。" : H.includes("game_push_cashout_invalid") || H.includes("game_ladder_cashout_invalid") ? "当前还不能收手。" : H.includes("聊天已切换") ? "聊天已切换，请重新打开游戏。" : H === "host_request_timeout" ? "等待落账结果超时；可用同一操作标识安全重试。" : "游戏操作未完成，请稍后重试。";
    }
    function ee(W, H) {
      return !t.has(H.outcome) && H.detail.kind !== "dice" ? null : W.kind === "dice" && H.detail.kind === "dice" ? {
        kind: "dice",
        record: H,
        detail: H.detail
      } : W.kind === "push" && H.detail.kind === "push" ? {
        kind: "push",
        record: H,
        game: W
      } : W.kind === "ladder" && H.detail.kind === "ladder" ? {
        kind: "ladder",
        record: H,
        game: W
      } : null;
    }
    function X() {
      T.value = null;
    }
    function J(W) {
      X(), l.value = W;
    }
    function U(W) {
      const H = n.value.activeGame;
      if (n.value = structuredClone(W), i.value = !1, o.value = !1, d.value = "", c.value = "", H && !W.activeGame) {
        const ne = W.records.find((Qe) => Qe.gameId === H.id), Ee = ne ? ee(H, ne) : null;
        Ee ? (T.value = Ee, h.value = "", l.value = Ee.kind) : (h.value = ne?.id || "", l.value = "lobby");
      } else W.activeGame && l.value !== "records" && l.value !== "lobby" ? l.value = W.activeGame.kind : !W.activeGame && l.value !== "records" && !T.value && (l.value = "lobby");
    }
    function le(W, H) {
      const ne = {
        ..._(),
        expectedRevision: n.value.revision,
        expectedEventId: n.value.eventId,
        actionId: H
      };
      return W.endpoint === "game/dice/start" || W.endpoint === "game/ladder/start" ? {
        ...ne,
        bet: W.bet
      } : W.endpoint === "game/push/start" ? ne : W.endpoint === "game/dice/bid" ? {
        ...ne,
        gameId: W.gameId,
        bid: {
          count: W.bid.count,
          face: W.bid.face
        }
      } : W.endpoint === "game/ladder/step" ? {
        ...ne,
        gameId: W.gameId,
        choice: W.choice
      } : {
        ...ne,
        gameId: W.gameId
      };
    }
    async function ce(W, H = C()) {
      if (I.value) return !1;
      const ne = R;
      r.value = !0, p.value = "", w.value = null;
      try {
        const Ee = await a.bridge.request(W.endpoint, le(W, H), pn);
        return ne !== R ? !1 : (U(Ee.result), Ee.result.activeGame && (l.value = Ee.result.activeGame.kind), y.value = null, !0);
      } catch (Ee) {
        return ne === R && (p.value = G(Ee), n.value.status === "unconfirmed" ? (y.value = null, w.value = null) : w.value = {
          request: W,
          actionId: H
        }), !1;
      } finally {
        ne === R && (r.value = !1);
      }
    }
    function oe(W, H) {
      if (I.value || n.value.activeGame) return;
      const ne = W === "dice" ? {
        heading: "确认入席秘骰对决",
        summary: `托管 ¤ ${H}，胜出返还下注的 1.8 倍。`,
        confirmLabel: "确认入席"
      } : W === "push" ? {
        heading: "确认揭开第一张牌",
        summary: "托管 ¤ 50。金币可以累积，炸弹会立即结束本局。",
        confirmLabel: "确认揭牌"
      } : {
        heading: "确认踏上鎏金阶梯",
        summary: `托管 ¤ ${H}，首层成功后才可收手。`,
        confirmLabel: "确认登阶"
      };
      y.value = {
        request: W === "dice" ? {
          endpoint: "game/dice/start",
          bet: H
        } : W === "push" ? { endpoint: "game/push/start" } : {
          endpoint: "game/ladder/start",
          bet: H
        },
        actionId: C(),
        ...ne
      }, p.value = "";
    }
    function ge() {
      const W = n.value.activeGame;
      W?.kind !== "dice" || !W.legalActions.includes("challenge") || (y.value = {
        request: {
          endpoint: "game/dice/challenge",
          gameId: W.id
        },
        actionId: C(),
        heading: "确定质疑庄家？",
        summary: "双方骰子将立即核验，本局随结果结算。",
        confirmLabel: "提出质疑",
        danger: !0
      }, p.value = "");
    }
    function Ce(W) {
      const H = n.value.activeGame;
      if (!H || H.kind !== W || !H.legalActions.includes("cash-out")) return;
      const ne = H.cashoutAmount;
      y.value = {
        request: W === "push" ? {
          endpoint: "game/push/cash-out",
          gameId: H.id
        } : {
          endpoint: "game/ladder/cash-out",
          gameId: H.id
        },
        actionId: C(),
        heading: "现在收手？",
        summary: `本局将结束，并返还 ¤ ${ne}。`,
        confirmLabel: "收手入账"
      }, p.value = "";
    }
    async function Ie() {
      const W = y.value;
      W && await ce(W.request, W.actionId);
    }
    function nt() {
      r.value || (y.value = null, p.value = "");
    }
    async function Re() {
      if (A.value) return;
      const W = ++R;
      i.value = !0, d.value = "";
      try {
        const H = await a.bridge.request("game/refresh", _(), pn);
        W === R && U(H.result);
      } catch (H) {
        W === R && (d.value = G(H));
      } finally {
        W === R && (i.value = !1);
      }
    }
    async function Le() {
      if (i.value || r.value) return;
      const W = ++R;
      i.value = !0, d.value = "";
      try {
        const H = await a.bridge.request("game/confirm-save", _(), pn);
        W === R && U(H.result.state);
      } catch (H) {
        W === R && (d.value = G(H));
      } finally {
        W === R && (i.value = !1);
      }
    }
    async function Mt() {
      if (!n.value.hasMore || o.value || r.value) return;
      const W = R;
      o.value = !0, c.value = "";
      try {
        const H = await a.bridge.request("game/records/load-more", {
          ..._(),
          offset: n.value.records.length
        }, pn);
        if (W !== R) return;
        const ne = new Set(n.value.records.map((Ee) => Ee.id));
        n.value.records.push(...H.result.records.filter((Ee) => !ne.has(Ee.id))), n.value.total = H.result.total, n.value.hasMore = H.result.hasMore;
      } catch (H) {
        W === R && (c.value = G(H));
      } finally {
        W === R && (o.value = !1);
      }
    }
    function bt() {
      const W = w.value;
      W && ce(W.request, W.actionId);
    }
    return at(() => {
      O = a.bridge.subscribe((W) => {
        W.type === "game/state" && (r.value || (R += 1), p.value = "", w.value = null, U(W.payload.state)), W.type === "game/error" && (d.value = "游戏状态暂时无法读取，请重新打开。");
      });
    }), ot(() => {
      R += 1, O(), y.value = null, w.value = null;
    }), (W, H) => (g(), b("main", fg, [
      s("header", vg, [
        H[19] || (H[19] = s("div", { class: "game-brand" }, [s("span", null, "GAME CENTER"), s("h1", null, "游戏")], -1)),
        s("div", pg, [s("span", null, [H[16] || (H[16] = s("small", null, "可用", -1)), s("strong", null, "¤ " + m(n.value.balance), 1)]), s("span", null, [H[17] || (H[17] = s("small", null, "托管", -1)), s("strong", null, "¤ " + m(n.value.lockedAmount), 1)])]),
        s("button", {
          type: "button",
          class: "game-refresh",
          disabled: A.value,
          title: "重新读取游戏",
          onClick: Re
        }, [...H[18] || (H[18] = [s("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [s("path", { d: "M20 7v5h-5M4 17v-5h5M18.2 9A7 7 0 0 0 6.1 6.7L4 9m16 6-2.1 2.3A7 7 0 0 1 5.8 15" })], -1), s("span", { class: "game-sr-only" }, "重新读取游戏", -1)])], 8, gg)
      ]),
      s("nav", mg, [
        s("button", {
          type: "button",
          class: te({ "is-active": l.value === "lobby" }),
          onClick: H[0] || (H[0] = (ne) => J("lobby"))
        }, "大厅", 2),
        n.value.activeGame ? (g(), b("button", {
          key: 0,
          type: "button",
          class: te({ "is-active": l.value === n.value.activeGame.kind }),
          onClick: H[1] || (H[1] = (ne) => l.value = n.value.activeGame?.kind || "lobby")
        }, [...H[20] || (H[20] = [re(" 当前牌桌", -1), s("i", null, null, -1)])], 2)) : j("", !0),
        s("button", {
          type: "button",
          class: te({ "is-active": l.value === "records" }),
          onClick: H[2] || (H[2] = (ne) => J("records"))
        }, "记录", 2)
      ]),
      n.value.message || d.value ? (g(), b("aside", {
        key: 0,
        class: te(["game-notice", `is-${n.value.status}`]),
        role: "status"
      }, [H[21] || (H[21] = s("span", { "aria-hidden": "true" }, "!", -1)), s("div", null, [
        s("strong", null, m(n.value.status === "unconfirmed" ? "落账待核实" : n.value.status === "conflict" ? "牌局状态冲突" : "游戏状态"), 1),
        s("p", null, m(d.value || n.value.message), 1),
        q.value ? (g(), b("button", {
          key: 0,
          type: "button",
          disabled: i.value,
          onClick: Le
        }, m(i.value ? "正在核实…" : "核实保存结果"), 9, bg)) : n.value.status === "blocked" ? (g(), b("button", {
          key: 1,
          type: "button",
          disabled: i.value,
          onClick: Re
        }, m(i.value ? "正在读取…" : "重新读取"), 9, hg)) : j("", !0)
      ])], 2)) : j("", !0),
      p.value && !y.value ? (g(), b("aside", yg, [s("span", null, m(p.value), 1), w.value && n.value.status === "ready" ? (g(), b("button", {
        key: 0,
        type: "button",
        disabled: r.value,
        onClick: bt
      }, "重试同一操作", 8, kg)) : j("", !0)])) : j("", !0),
      s("div", wg, [x.value && l.value === "lobby" ? (g(), b("div", {
        key: 0,
        class: te(["game-result-banner", `is-${x.value.outcomeTone}`]),
        role: "status"
      }, [
        s("span", null, m(x.value.gameLabel), 1),
        s("strong", null, m(x.value.outcomeLabel), 1),
        s("em", null, m(x.value.net > 0 ? "+" : "") + m(x.value.net) + " 小白币", 1),
        s("button", {
          type: "button",
          onClick: H[3] || (H[3] = (ne) => h.value = "")
        }, "关闭")
      ], 2)) : j("", !0), l.value === "lobby" ? (g(), pe(Bp, {
        key: 1,
        "active-game": n.value.activeGame,
        balance: n.value.balance,
        "locked-amount": n.value.lockedAmount,
        "write-disabled-reason": I.value,
        onStart: oe,
        onContinue: H[4] || (H[4] = (ne) => l.value = ne)
      }, null, 8, [
        "active-game",
        "balance",
        "locked-amount",
        "write-disabled-reason"
      ])) : l.value === "dice" && n.value.activeGame?.kind === "dice" ? (g(), pe(zv, {
        key: 2,
        game: n.value.activeGame,
        "write-disabled-reason": I.value,
        onBid: H[5] || (H[5] = (ne) => ce({
          endpoint: "game/dice/bid",
          gameId: n.value.activeGame?.id || "",
          bid: ne
        })),
        onChallenge: ge,
        onLobby: H[6] || (H[6] = (ne) => J("lobby"))
      }, null, 8, ["game", "write-disabled-reason"])) : l.value === "dice" && T.value?.kind === "dice" ? (g(), pe(lp, {
        key: 3,
        record: T.value.record,
        detail: T.value.detail,
        onDone: H[7] || (H[7] = (ne) => J("lobby"))
      }, null, 8, ["record", "detail"])) : l.value === "push" && M.value ? (g(), pe(Xp, {
        key: 4,
        game: M.value,
        "write-disabled-reason": I.value,
        ending: T.value?.kind === "push" ? T.value.record : null,
        onDraw: H[8] || (H[8] = (ne) => ce({
          endpoint: "game/push/draw",
          gameId: n.value.activeGame?.id || ""
        })),
        onCashOut: H[9] || (H[9] = (ne) => Ce("push")),
        onLobby: H[10] || (H[10] = (ne) => J("lobby")),
        onFinished: H[11] || (H[11] = (ne) => J("lobby"))
      }, null, 8, [
        "game",
        "write-disabled-reason",
        "ending"
      ])) : l.value === "ladder" && S.value ? (g(), pe(kp, {
        key: 5,
        game: S.value,
        "write-disabled-reason": I.value,
        ending: T.value?.kind === "ladder" ? T.value.record : null,
        onStep: H[12] || (H[12] = (ne) => ce({
          endpoint: "game/ladder/step",
          gameId: n.value.activeGame?.id || "",
          choice: ne
        })),
        onCashOut: H[13] || (H[13] = (ne) => Ce("ladder")),
        onLobby: H[14] || (H[14] = (ne) => J("lobby")),
        onFinished: H[15] || (H[15] = (ne) => J("lobby"))
      }, null, 8, [
        "game",
        "write-disabled-reason",
        "ending"
      ])) : l.value === "records" ? (g(), pe(cg, {
        key: 6,
        records: n.value.records,
        total: n.value.total,
        "has-more": n.value.hasMore,
        "loading-more": o.value,
        error: c.value,
        onLoadMore: Mt
      }, null, 8, [
        "records",
        "total",
        "has-more",
        "loading-more",
        "error"
      ])) : j("", !0)]),
      y.value ? (g(), pe(kv, {
        key: 2,
        heading: y.value.heading,
        summary: y.value.summary,
        "confirm-label": y.value.confirmLabel,
        busy: r.value,
        error: p.value,
        danger: y.value.danger,
        onCancel: nt,
        onConfirm: Ie
      }, null, 8, [
        "heading",
        "summary",
        "confirm-label",
        "busy",
        "error",
        "danger"
      ])) : j("", !0)
    ]));
  }
}), xg = $g, Sg = Object.freeze({
  id: "map",
  name: "地图",
  accent: "#3aa9ff"
}), Cg = { class: "map-viewport" }, _g = ["viewBox", "aria-label"], Tg = {
  class: "map-viewport-controls",
  "aria-label": "地图缩放控制"
}, Ag = /* @__PURE__ */ se({
  __name: "MapViewport",
  props: {
    viewBox: {},
    resetKey: { default: "" },
    label: {}
  },
  setup(e) {
    const t = e, a = /* @__PURE__ */ K(null), n = /* @__PURE__ */ K([...t.viewBox]);
    let l = null, i = [0, 0], r = [0, 0], o = null, d = !1, p = !1, c = null;
    const y = z(() => n.value.join(" "));
    function w() {
      const [x, M, S, C] = t.viewBox;
      n.value = [
        x,
        M,
        Math.max(1, S),
        Math.max(1, C)
      ];
    }
    function h() {
      const x = a.value?.getBoundingClientRect();
      return !x?.width || !x.height ? 1 : Math.max(n.value[2] / x.width, n.value[3] / x.height);
    }
    function T(x, M) {
      const S = a.value?.getBoundingClientRect();
      if (!S?.width || !S.height) return [n.value[0] + n.value[2] / 2, n.value[1] + n.value[3] / 2];
      const C = h(), _ = n.value[2] / C, G = n.value[3] / C, ee = (S.width - _) / 2, X = (S.height - G) / 2;
      return [n.value[0] + (x - S.left - ee) * C, n.value[1] + (M - S.top - X) * C];
    }
    function O(x, M) {
      const S = Math.max(1, t.viewBox[2]), C = Math.min(S * 5, Math.max(S * 0.24, n.value[2] * x)), _ = C / n.value[2], G = n.value[3] * _, ee = M || [n.value[0] + n.value[2] / 2, n.value[1] + n.value[3] / 2], X = (ee[0] - n.value[0]) / n.value[2], J = (ee[1] - n.value[1]) / n.value[3];
      n.value = [
        ee[0] - C * X,
        ee[1] - G * J,
        C,
        G
      ];
    }
    function R(x) {
      O(x.deltaY < 0 ? 0.84 : 1.19, T(x.clientX, x.clientY));
    }
    function F(x) {
      x.button !== 0 || l !== null || (l = x.pointerId, i = [x.clientX, x.clientY], r = [n.value[0], n.value[1]], d = !1, o = x.target instanceof Element ? x.target : a.value, o?.setPointerCapture(x.pointerId));
    }
    function q(x) {
      if (x.pointerId !== l) return;
      const M = x.clientX - i[0], S = x.clientY - i[1];
      Math.abs(M) + Math.abs(S) > 4 && (d = !0);
      const C = h();
      n.value = [
        r[0] - M * C,
        r[1] - S * C,
        n.value[2],
        n.value[3]
      ];
    }
    function I(x) {
      x.pointerId === l && (o?.hasPointerCapture(x.pointerId) && o.releasePointerCapture(x.pointerId), o = null, l = null, d && (p = !0, c && clearTimeout(c), c = setTimeout(() => {
        p = !1;
      }, 0)));
    }
    function A(x) {
      p && (x.preventDefault(), x.stopPropagation());
    }
    return et(() => [
      t.viewBox[0],
      t.viewBox[1],
      t.viewBox[2],
      t.viewBox[3],
      t.resetKey
    ], w, { immediate: !0 }), ot(() => {
      c && clearTimeout(c);
    }), (x, M) => (g(), b("div", Cg, [(g(), b("svg", {
      ref_key: "svg",
      ref: a,
      class: "map-viewport-svg",
      viewBox: y.value,
      preserveAspectRatio: "xMidYMid meet",
      role: "img",
      "aria-label": e.label,
      onWheel: tt(R, ["prevent"]),
      onPointerdown: F,
      onPointermove: q,
      onPointerup: I,
      onPointercancel: I,
      onClickCapture: A
    }, [Cn(x.$slots, "default")], 40, _g)), s("div", Tg, [
      s("button", {
        type: "button",
        title: "放大",
        "aria-label": "放大",
        onClick: M[0] || (M[0] = (S) => O(0.8))
      }, "+"),
      s("button", {
        type: "button",
        title: "缩小",
        "aria-label": "缩小",
        onClick: M[1] || (M[1] = (S) => O(1.25))
      }, "-"),
      s("button", {
        type: "button",
        class: "map-viewport-reset",
        onClick: w
      }, "复位")
    ])]));
  }
}), Mr = Ag, Mg = Object.freeze({
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
}), da = Object.freeze({
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
}), Eg = Object.freeze({
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
}), Ig = Object.freeze({
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
}), Pg = Object.freeze({
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
}), Og = Object.freeze({
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
}), Er = Object.freeze({
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
}), Rg = Object.freeze({
  city: "location_city",
  district: "apartment",
  building: "home_work",
  floor: "stairs",
  room: "meeting_room",
  outdoor: "park"
}), Yl = Object.freeze({
  city: "城市",
  district: "区域",
  building: "建筑",
  floor: "楼层",
  room: "房间",
  outdoor: "户外"
}), Lg = Object.freeze({
  door: "门",
  stairs: "楼梯",
  elevator: "电梯",
  path: "小径",
  road: "道路",
  portal: "传送门",
  passage: "通道"
}), Bg = /* @__PURE__ */ new Set([
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
function Te(e) {
  return Number(e.toFixed(3)).toString();
}
function Pr(e) {
  const t = e.geometry;
  return Array.isArray(t.points) ? t.points : [];
}
function Or(e) {
  return e.shape === "rect" || e.shape === "circle" ? !0 : Pr(e).length >= 3 && (e.closed === !0 || Bg.has(e.category));
}
function Ng(e) {
  const t = Pr(e);
  if (t.length < 2) return "";
  const a = Or(e) ? " Z" : "";
  if (e.shape === "path") return `M ${t.map(([l, i]) => `${Te(l)} ${Te(i)}`).join(" L ")}${a}`;
  const n = [`M ${Te(t[0][0])} ${Te(t[0][1])}`];
  for (let l = 0; l < t.length - 1; l += 1) {
    const i = t[l - 1] || t[l], r = t[l], o = t[l + 1], d = t[l + 2] || o, p = r[0] + (o[0] - i[0]) / 6, c = r[1] + (o[1] - i[1]) / 6, y = o[0] - (d[0] - r[0]) / 6, w = o[1] - (d[1] - r[1]) / 6;
    n.push(`C ${Te(p)} ${Te(c)}, ${Te(y)} ${Te(w)}, ${Te(o[0])} ${Te(o[1])}`);
  }
  return n.join(" ") + a;
}
function Xl(e) {
  const t = e.geometry;
  if (typeof t.x == "number" && typeof t.y == "number")
    return e.shape === "rect" ? [t.x + (t.width || 0) / 2, t.y + (t.height || 0) / 2] : e.shape === "circle" ? [t.x, t.y - (t.radius || 0) - 8] : [t.x, t.y + (e.shape === "icon" ? 18 : 0)];
  const a = t.points || [];
  if (!a.length) return [0, 0];
  const [n, l] = a.reduce((i, r) => [i[0] + r[0], i[1] + r[1]], [0, 0]);
  return [n / a.length, l / a.length];
}
function je(e, t) {
  const a = Mg[e.category], n = Or(e), l = n && e.material ? `url(#${t}-material-${e.material})` : "", i = e.certainty === "inferred" ? "8 6" : e.certainty === "unknown" ? "3 7" : a.dash;
  return {
    ...a,
    fill: n ? l || a.fill || Er[e.material] : "none",
    opacity: e.certainty === "unknown" ? 0.48 : e.certainty === "inferred" ? 0.72 : 1,
    dash: i,
    icon: e.icon ? Pg[e.icon] : e.kind ? Eg[e.kind] : Og[e.category],
    fallback: e.kind ? Ig[e.kind] : da[e.category].slice(0, 1),
    z: Ss[e.category]
  };
}
function Dg(e) {
  return [...e].sort((t, a) => Ss[t.category] - Ss[a.category] || Wt(t.id, a.id));
}
var gn = 156, qg = 66, Jl = 34, Ug = 70;
function rs(e) {
  return [...e].sort((t, a) => Wt(t.parent || "", a.parent || "") || Wt(t.name, a.name) || Wt(t.key, a.key));
}
function Fg(e) {
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
function jg(e) {
  return [
    Math.min(...e.map((t) => t[0])),
    Math.min(...e.map((t) => t[1])),
    Math.max(...e.map((t) => t[0])),
    Math.max(...e.map((t) => t[1]))
  ];
}
function Hg(e, t, a, n) {
  const l = [t.x + t.width / 2, t.y + t.height / 2], i = [a.x + a.width / 2, a.y + a.height / 2], r = i[0] - l[0], o = i[1] - l[1], d = Math.abs(r) >= Math.abs(o), p = d ? [r >= 0 ? t.x + t.width : t.x, l[1]] : [l[0], o >= 0 ? t.y + t.height : t.y], c = d ? [r >= 0 ? a.x : a.x + a.width, i[1]] : [i[0], o >= 0 ? a.y : a.y + a.height], y = (p[0] + c[0]) / 2, w = (p[1] + c[1]) / 2 + n, h = d ? [[y, p[1] + n], [y, c[1] + n]] : [[p[0] + n, w], [c[0] + n, w]];
  return {
    id: e.id,
    from: e.from,
    to: e.to,
    path: `M ${Te(p[0])} ${Te(p[1])} C ${Te(h[0][0])} ${Te(h[0][1])}, ${Te(h[1][0])} ${Te(h[1][1])}, ${Te(c[0])} ${Te(c[1])}`,
    labelX: y,
    labelY: w - 7,
    bounds: jg([
      p,
      c,
      h[0],
      h[1],
      [y, w - 7]
    ])
  };
}
function Kg(e) {
  const t = rs(e.locations), a = new Map(t.map((A) => [A.key, A])), n = Fg(a), l = /* @__PURE__ */ new Map(), i = [];
  t.forEach((A) => {
    const x = A.parent || "";
    if (x && a.has(x) && !n.has(x) && !n.has(A.key)) {
      const M = l.get(x) || [];
      M.push(A), l.set(x, M);
    } else i.push(A);
  }), l.forEach((A, x) => l.set(x, rs(A)));
  const r = /* @__PURE__ */ new Map(), o = (A) => {
    const x = r.get(A.key);
    if (x !== void 0) return x;
    const M = l.get(A.key) || [], S = M.length ? Math.max(gn, M.reduce((C, _, G) => C + o(_) + (G ? Jl : 0), 0)) : gn;
    return r.set(A.key, S), S;
  }, d = [], p = (A, x, M) => {
    const S = o(A);
    d.push({
      key: A.key,
      x: x + (S - gn) / 2,
      y: M * 158,
      width: gn,
      height: qg,
      depth: M
    });
    let C = x;
    (l.get(A.key) || []).forEach((_) => {
      p(_, C, M + 1), C += o(_) + Jl;
    });
  };
  let c = 0;
  rs(i).forEach((A) => {
    p(A, c, 0), c += o(A) + Ug;
  });
  const y = new Map(d.map((A) => [A.key, A])), w = t.flatMap((A) => {
    const x = y.get(A.key), M = A.parent ? y.get(A.parent) : void 0;
    if (!x || !M) return [];
    const S = M.x + M.width / 2, C = M.y + M.height, _ = x.x + x.width / 2, G = x.y, ee = (C + G) / 2;
    return [{
      id: `${M.key}:${x.key}`,
      path: `M ${Te(S)} ${Te(C)} C ${Te(S)} ${Te(ee)}, ${Te(_)} ${Te(ee)}, ${Te(_)} ${Te(G)}`
    }];
  }), h = /* @__PURE__ */ new Map(), T = [...e.links].sort((A, x) => Wt(A.id, x.id)).flatMap((A) => {
    const x = y.get(A.from), M = y.get(A.to);
    if (!x || !M) return [];
    const S = [A.from, A.to].sort(Wt).join(":"), C = h.get(S) || 0;
    return h.set(S, C + 1), [Hg(A, x, M, C === 0 ? 0 : (C % 2 ? 1 : -1) * Math.ceil(C / 2) * 24)];
  });
  if (!d.length) return {
    nodes: d,
    hierarchy: w,
    routes: T,
    viewBox: [
      0,
      0,
      640,
      420
    ]
  };
  const O = T.flatMap((A) => [A.bounds]), R = Math.min(...d.map((A) => A.x), ...O.map((A) => A[0])) - 60, F = Math.min(...d.map((A) => A.y), ...O.map((A) => A[1])) - 60, q = Math.max(...d.map((A) => A.x + A.width), ...O.map((A) => A[2])) + 60, I = Math.max(...d.map((A) => A.y + A.height), ...O.map((A) => A[3])) + 60;
  return {
    nodes: d,
    hierarchy: w,
    routes: T,
    viewBox: [
      R,
      F,
      Math.max(420, q - R),
      Math.max(300, I - F)
    ]
  };
}
function Gg(e, t) {
  return e.filter((a) => a.locationKey === t).sort((a, n) => Wt(a.displayName, n.displayName) || Wt(a.actorKey, n.actorKey));
}
var Vg = [
  "x",
  "y",
  "width",
  "height"
], zg = [
  "x",
  "y",
  "width",
  "height"
], Wg = {
  class: "map-atlas-hierarchy",
  "aria-hidden": "true"
}, Yg = ["d"], Xg = { class: "map-atlas-routes" }, Jg = ["d", "marker-start"], Qg = ["x", "y"], Zg = [
  "role",
  "tabindex",
  "aria-label",
  "onClick",
  "onKeydown"
], em = [
  "x",
  "y",
  "width",
  "height"
], tm = ["d"], am = ["cx", "cy"], nm = ["x", "y"], sm = ["x", "y"], lm = ["x", "y"], im = ["x", "y"], rm = {
  key: 2,
  class: "map-atlas-actors"
}, om = ["transform"], um = {
  key: 0,
  class: "map-material-symbol"
}, dm = {
  key: 1,
  class: "map-symbol-fallback"
}, cm = ["x", "y"], fm = ["transform"], vm = /* @__PURE__ */ se({
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
    const a = e, n = t, l = z(() => Kg(a.atlas)), i = z(() => new Map(a.atlas.locations.map((w) => [w.key, w]))), r = z(() => new Map(a.atlas.links.map((w) => [w.id, w])));
    function o(w) {
      return i.value.get(w.key);
    }
    function d(w) {
      return r.value.get(w);
    }
    function p(w) {
      return Gg(a.atlas.actors, w);
    }
    function c(w) {
      w.sceneKey && n("viewScene", w.key);
    }
    function y(w, h) {
      !h.sceneKey || w.key !== "Enter" && w.key !== " " || (w.preventDefault(), c(h));
    }
    return (w, h) => (g(), pe(Mr, {
      class: "map-atlas-viewport",
      "view-box": l.value.viewBox,
      "reset-key": String(e.revision),
      label: "世界地点关系图"
    }, {
      default: la(() => [
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
        }, null, 8, Vg),
        s("rect", {
          x: l.value.viewBox[0],
          y: l.value.viewBox[1],
          width: l.value.viewBox[2],
          height: l.value.viewBox[3],
          fill: "url(#map-atlas-grid)"
        }, null, 8, zg),
        s("g", Wg, [(g(!0), b(Z, null, de(l.value.hierarchy, (T) => (g(), b("path", {
          key: T.id,
          d: T.path,
          "vector-effect": "non-scaling-stroke"
        }, null, 8, Yg))), 128))]),
        s("g", Xg, [(g(!0), b(Z, null, de(l.value.routes, (T) => (g(), b("g", { key: T.id }, [s("path", {
          d: T.path,
          "marker-start": d(T.id).bidirectional ? "url(#map-atlas-arrow)" : void 0,
          "marker-end": "url(#map-atlas-arrow)",
          "vector-effect": "non-scaling-stroke"
        }, null, 8, Jg), s("text", {
          x: T.labelX,
          y: T.labelY
        }, m(d(T.id).label || me(Lg)[d(T.id).kind]), 9, Qg)]))), 128))]),
        (g(!0), b(Z, null, de(l.value.nodes, (T) => (g(), b("g", {
          key: T.key,
          class: te(["map-atlas-node", {
            "is-current": T.key === e.currentLocationKey,
            "is-selected": T.key === e.selectedLocationKey,
            "is-visited": o(T).status === "visited",
            "is-clickable": !!o(T).sceneKey
          }]),
          role: o(T).sceneKey ? "button" : void 0,
          tabindex: o(T).sceneKey ? 0 : void 0,
          "aria-label": o(T).sceneKey ? `查看 ${o(T).name} 场景` : o(T).name,
          onClick: tt((O) => c(o(T)), ["stop"]),
          onKeydown: (O) => y(O, o(T))
        }, [
          s("rect", {
            x: T.x,
            y: T.y,
            width: T.width,
            height: T.height,
            rx: "9"
          }, null, 8, em),
          s("path", {
            class: "map-atlas-node-cut",
            d: `M ${T.x + T.width - 24} ${T.y} L ${T.x + T.width} ${T.y + 24}`
          }, null, 8, tm),
          s("circle", {
            cx: T.x + 24,
            cy: T.y + 24,
            r: "13",
            class: "map-atlas-node-icon-ring"
          }, null, 8, am),
          e.symbolsReady ? (g(), b("text", {
            key: 0,
            x: T.x + 24,
            y: T.y + 24,
            class: "map-material-symbol"
          }, m(me(Rg)[o(T).scale]), 9, nm)) : (g(), b("text", {
            key: 1,
            x: T.x + 24,
            y: T.y + 24,
            class: "map-symbol-fallback"
          }, m(me(Yl)[o(T).scale].slice(0, 1)), 9, sm)),
          s("text", {
            x: T.x + 45,
            y: T.y + 23,
            class: "map-atlas-node-name"
          }, m(o(T).name), 9, lm),
          s("text", {
            x: T.x + 45,
            y: T.y + 42,
            class: "map-atlas-node-meta"
          }, m(me(Yl)[o(T).scale]) + " · " + m(o(T).status === "visited" ? "已到访" : "仅提及"), 9, im),
          p(T.key).length ? (g(), b("g", rm, [(g(!0), b(Z, null, de(p(T.key).slice(0, 4), (O, R) => (g(), b("g", {
            key: O.actorKey,
            transform: `translate(${T.x + 19 + R * 18} ${T.y + T.height - 2})`,
            class: te({ "is-player": O.actorKey === "player" })
          }, [
            h[0] || (h[0] = s("circle", { r: "7" }, null, -1)),
            e.symbolsReady ? (g(), b("text", um, m(O.actorKey === "player" ? "person_pin_circle" : "person"), 1)) : (g(), b("text", dm, m(O.actorKey === "player" ? "P" : "N"), 1)),
            s("title", null, m(O.displayName), 1)
          ], 10, om))), 128)), p(T.key).length > 4 ? (g(), b("text", {
            key: 0,
            x: T.x + 88,
            y: T.y + T.height + 2,
            class: "map-atlas-actor-overflow"
          }, " +" + m(p(T.key).length - 4), 9, cm)) : j("", !0)])) : j("", !0),
          T.key === e.currentLocationKey ? (g(), b("g", {
            key: 3,
            class: "map-atlas-current-pin",
            transform: `translate(${T.x + T.width - 13} ${T.y + 13})`
          }, [...h[1] || (h[1] = [s("circle", { r: "7" }, null, -1), s("path", { d: "M-3 0l2 2 4-5" }, null, -1)])], 8, fm)) : j("", !0),
          s("title", null, m(o(T).brief || o(T).name), 1)
        ], 42, Zg))), 128))
      ]),
      _: 1
    }, 8, ["view-box", "reset-key"]));
  }
}), pm = vm, Aw = Object.freeze([
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
]), Mw = Object.freeze([
  "rect",
  "circle",
  "path",
  "curve",
  "icon",
  "label"
]), Ew = Object.freeze([
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
]), gm = Object.freeze([
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
]), Iw = Object.freeze([
  "confirmed",
  "inferred",
  "unknown"
]), Pw = Object.freeze([
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
]), Ow = Object.freeze(/* @__PURE__ */ new Set([
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
])), mm = ["id"], bm = ["fill"], hm = {
  key: 0,
  d: "M0 6H24M0 18H24M7 0V6M17 6V18M10 18V24"
}, ym = {
  key: 1,
  d: "M0 8L7 3l8 3 9-4M2 19l8-5 10 4 4-3"
}, km = {
  key: 2,
  d: "M0 8H24M0 16H24M8 0v24m8-24v24"
}, wm = {
  key: 3,
  d: "M-4 6q6-5 12 0t12 0t12 0M-4 17q6-5 12 0t12 0t12 0"
}, $m = {
  key: 4,
  d: "M4 20l2-7 2 7M13 13l2-8 2 8M19 23l2-6 2 6"
}, xm = {
  key: 5,
  d: "M3 5h2m8 3h3m3 10h2M7 19h3"
}, Sm = {
  key: 6,
  cx: "6",
  cy: "7",
  r: "1.1"
}, Cm = {
  key: 7,
  cx: "18",
  cy: "16",
  r: "1"
}, _m = {
  key: 8,
  d: "M12 3v18M4 7l16 10M20 7L4 17"
}, Tm = {
  key: 9,
  d: "M0 4h24M0 20h24"
}, Am = {
  key: 10,
  cx: "5",
  cy: "12",
  r: "1.2"
}, Mm = {
  key: 11,
  cx: "19",
  cy: "12",
  r: "1.2"
}, Em = {
  key: 12,
  d: "M0 4q6 4 12 0t12 0M0 16q6 4 12 0t12 0"
}, Im = {
  key: 13,
  d: "M0 6l7 5 5-8 5 13 7-5M0 22l8-5 6 4 10-8"
}, Pm = {
  key: 14,
  d: "M12 2l4 7 6 3-6 4-4 6-4-6-6-4 6-3zM8 9l8 7m0-7l-8 7"
}, Om = {
  key: 15,
  d: "M12 2v20M2 12h20M5 5l14 14M19 5L5 19"
}, Rm = [
  "x",
  "y",
  "width",
  "height"
], Lm = [
  "x",
  "y",
  "width",
  "height"
], Bm = [
  "cx",
  "cy",
  "rx",
  "ry"
], Nm = ["opacity"], Dm = [
  "x",
  "y",
  "width",
  "height",
  "fill",
  "stroke",
  "stroke-width",
  "stroke-dasharray"
], qm = [
  "cx",
  "cy",
  "r",
  "fill",
  "stroke",
  "stroke-width",
  "stroke-dasharray"
], Um = [
  "d",
  "fill",
  "stroke",
  "stroke-width",
  "stroke-dasharray"
], Fm = ["transform"], jm = ["stroke"], Hm = {
  key: 0,
  class: "map-material-symbol",
  "aria-hidden": "true"
}, Km = {
  key: 1,
  class: "map-symbol-fallback",
  "aria-hidden": "true"
}, Gm = ["x", "y"], Vm = ["x", "y"], zm = /* @__PURE__ */ se({
  __name: "MapScene",
  props: {
    scene: {},
    symbolsReady: { type: Boolean }
  },
  setup(e) {
    let t = 0;
    const a = e, n = `xiaobai-map-scene-${t += 1}`, l = gm, i = z(() => Dg(a.scene.elements)), r = z(() => Ir[a.scene.mood || "neutral"]), o = z(() => ({
      "--map-canvas-bg": r.value.background,
      "--map-canvas-glow": r.value.glow,
      "--map-canvas-accent": r.value.accent
    }));
    function d(y) {
      return y.geometry;
    }
    function p(y) {
      return y.geometry;
    }
    function c(y) {
      return y.geometry;
    }
    return (y, w) => (g(), pe(Mr, {
      class: "map-scene-viewport",
      style: Tt(o.value),
      "view-box": e.scene.viewBox,
      "reset-key": e.scene.key,
      label: `${e.scene.name} 场景地图`
    }, {
      default: la(() => [
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
          (g(!0), b(Z, null, de(me(l), (h) => (g(), b("pattern", {
            id: `${n}-material-${h}`,
            key: h,
            width: "24",
            height: "24",
            patternUnits: "userSpaceOnUse",
            class: te(`map-material-pattern is-${h}`)
          }, [
            s("rect", {
              width: "24",
              height: "24",
              fill: me(Er)[h]
            }, null, 8, bm),
            h === "wood" ? (g(), b("path", hm)) : h === "stone" ? (g(), b("path", ym)) : h === "tile" || h === "marble" ? (g(), b("path", km)) : h === "water" ? (g(), b("path", wm)) : h === "grass" ? (g(), b("path", $m)) : h === "dirt" ? (g(), b("path", xm)) : h === "sand" ? (g(), b("circle", Sm)) : j("", !0),
            h === "sand" ? (g(), b("circle", Cm)) : h === "snow" ? (g(), b("path", _m)) : h === "metal" ? (g(), b("path", Tm)) : j("", !0),
            h === "metal" ? (g(), b("circle", Am)) : j("", !0),
            h === "metal" ? (g(), b("circle", Mm)) : h === "fabric" || h === "carpet" || h === "bed-sheet" || h === "tatami" ? (g(), b("path", Em)) : h === "blood" ? (g(), b("path", Im)) : h === "rune" ? (g(), b("path", Pm)) : h === "warm-light" || h === "cold-light" || h === "shadow" ? (g(), b("path", Om)) : j("", !0)
          ], 10, mm))), 128)),
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
        }, null, 8, Rm),
        s("rect", {
          x: e.scene.viewBox[0],
          y: e.scene.viewBox[1],
          width: e.scene.viewBox[2],
          height: e.scene.viewBox[3],
          fill: "url(#map-scene-major-grid)"
        }, null, 8, Lm),
        s("ellipse", {
          cx: e.scene.viewBox[0] + e.scene.viewBox[2] / 2,
          cy: e.scene.viewBox[1] + e.scene.viewBox[3] / 2,
          rx: e.scene.viewBox[2] * 0.42,
          ry: e.scene.viewBox[3] * 0.42,
          fill: "var(--map-canvas-glow)"
        }, null, 8, Bm),
        (g(!0), b(Z, null, de(i.value, (h) => (g(), b("g", {
          key: h.id,
          class: te(["map-scene-element", [`is-${h.category}`, `is-${h.certainty || "confirmed"}`]]),
          opacity: me(je)(h, n).opacity
        }, [h.shape === "rect" ? (g(), b("rect", {
          key: 0,
          x: d(h).x,
          y: d(h).y,
          width: d(h).width,
          height: d(h).height,
          fill: me(je)(h, n).fill,
          stroke: me(je)(h, n).stroke,
          "stroke-width": me(je)(h, n).width,
          "stroke-dasharray": me(je)(h, n).dash,
          "vector-effect": "non-scaling-stroke"
        }, null, 8, Dm)) : h.shape === "circle" ? (g(), b("circle", {
          key: 1,
          cx: p(h).x,
          cy: p(h).y,
          r: p(h).radius,
          fill: me(je)(h, n).fill,
          stroke: me(je)(h, n).stroke,
          "stroke-width": me(je)(h, n).width,
          "stroke-dasharray": me(je)(h, n).dash,
          "vector-effect": "non-scaling-stroke"
        }, null, 8, qm)) : h.shape === "path" || h.shape === "curve" ? (g(), b("path", {
          key: 2,
          d: me(Ng)(h),
          fill: me(je)(h, n).fill,
          stroke: me(je)(h, n).stroke,
          "stroke-width": me(je)(h, n).width,
          "stroke-dasharray": me(je)(h, n).dash,
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "fill-rule": "evenodd",
          "vector-effect": "non-scaling-stroke"
        }, null, 8, Um)) : h.shape === "icon" ? (g(), b("g", {
          key: 3,
          class: "map-scene-icon",
          transform: `translate(${c(h).x} ${c(h).y})`
        }, [s("circle", {
          r: "11",
          stroke: me(je)(h, n).stroke
        }, null, 8, jm), e.symbolsReady ? (g(), b("text", Hm, m(me(je)(h, n).icon), 1)) : (g(), b("text", Km, m(me(je)(h, n).fallback), 1))], 8, Fm)) : h.shape === "label" ? (g(), b("text", {
          key: 4,
          class: "map-scene-label is-primary",
          x: c(h).x,
          y: c(h).y
        }, m(h.label || ""), 9, Gm)) : j("", !0), h.label && h.shape !== "label" ? (g(), b("text", {
          key: 5,
          class: "map-scene-label",
          x: me(Xl)(h)[0],
          y: me(Xl)(h)[1]
        }, m(h.label), 9, Vm)) : j("", !0)], 10, Nm))), 128))
      ]),
      _: 1
    }, 8, [
      "style",
      "view-box",
      "reset-key",
      "label"
    ]));
  }
}), Wm = zm, Ym = {
  class: "map-settings",
  "aria-labelledby": "map-settings-title"
}, Xm = { class: "map-settings-body" }, Jm = { class: "map-settings-card" }, Qm = { class: "map-setting-row" }, Zm = [
  "aria-checked",
  "aria-label",
  "disabled"
], eb = { class: "map-settings-card" }, tb = ["disabled", "title"], ab = { class: "map-settings-card is-danger-zone" }, nb = { class: "map-settings-action-copy" }, sb = ["disabled", "title"], lb = {
  key: 0,
  class: "map-disabled-reason",
  role: "status"
}, ib = {
  key: 1,
  class: "map-maintenance-message",
  role: "status"
}, rb = /* @__PURE__ */ se({
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
    return (t, a) => (g(), b("aside", Ym, [s("header", null, [a[4] || (a[4] = s("div", null, [s("span", null, "MAP SYSTEM / CONFIG"), s("h2", { id: "map-settings-title" }, "地图设置")], -1)), s("button", {
      type: "button",
      class: "map-icon-button",
      "aria-label": "关闭地图设置",
      onClick: a[0] || (a[0] = (n) => t.$emit("close"))
    }, "×")]), s("div", Xm, [
      s("section", Jm, [s("div", Qm, [a[6] || (a[6] = s("div", null, [s("h3", null, "所有普通聊天自动维护"), s("p", null, "每次发送新的 User 消息后，让地图维护刚被接受的上一轮空间事实。")], -1)), s("button", {
        type: "button",
        class: "map-switch",
        role: "switch",
        "aria-checked": e.autoMaintenance,
        "aria-label": e.autoMaintenance ? "关闭所有普通聊天自动维护" : "开启所有普通聊天自动维护",
        disabled: e.autoToggleBusy,
        onClick: a[1] || (a[1] = (n) => t.$emit("setAutoMaintenance", !e.autoMaintenance))
      }, [...a[5] || (a[5] = [s("span", null, null, -1)])], 8, Zm)]), a[7] || (a[7] = s("div", { class: "map-cost-note" }, [s("strong", null, "API 成本说明"), s("p", null, "自动维护和下方两个手动操作都会调用已配置的 AI 模型，消耗 token / API 额度。切换此开关本身只保存设置，不会立即调用 AI。")], -1))]),
      s("section", eb, [a[8] || (a[8] = s("div", { class: "map-settings-action-copy" }, [s("h3", null, "增量维护"), s("p", null, "读取聊天尾部最新完整的 User 与 Assistant 对话，补充地点、路线、人物位置和场景细节。")], -1)), s("button", {
        type: "button",
        class: "map-action-button",
        disabled: e.busy || !!e.disabledReason || !e.hasMap,
        title: e.hasMap ? e.disabledReason : "请先从当前聊天建立地图",
        onClick: a[2] || (a[2] = (n) => t.$emit("maintainOnce"))
      }, m(e.maintenanceStatus === "maintaining" ? "正在维护…" : "维护一次"), 9, tb)]),
      s("section", ab, [s("div", nb, [s("h3", null, m(e.hasMap ? "重建地图" : "建立地图"), 1), a[9] || (a[9] = s("p", null, "重新读取当前聊天并生成完整地图。已有地图会在保存成功后被新结果替换。", -1))]), s("button", {
        type: "button",
        class: "map-action-button is-strong",
        disabled: e.busy || !!e.disabledReason,
        title: e.disabledReason,
        onClick: a[3] || (a[3] = (n) => t.$emit("requestRebuild"))
      }, m(e.maintenanceStatus === "rebuilding" ? "正在重建…" : "从当前聊天建立/重建地图"), 9, sb)]),
      e.disabledReason ? (g(), b("p", lb, m(e.disabledReason), 1)) : j("", !0),
      e.maintenanceMessage ? (g(), b("p", ib, m(e.maintenanceMessage), 1)) : j("", !0)
    ])]));
  }
}), ob = rb, ub = { class: "map-app" }, db = { class: "map-header" }, cb = { class: "map-header-actions" }, fb = ["disabled"], vb = { class: "map-command-bar" }, pb = {
  class: "map-tabs",
  "aria-label": "地图视图"
}, gb = {
  key: 0,
  class: "map-location-select"
}, mb = ["disabled"], bb = {
  key: 0,
  value: ""
}, hb = ["value"], yb = {
  key: 1,
  class: "map-atlas-summary",
  "aria-label": "世界地图统计"
}, kb = { class: "map-notice-code" }, wb = { key: 0 }, $b = ["disabled"], xb = ["disabled"], Sb = ["disabled"], Cb = {
  key: 0,
  class: "map-empty-state"
}, _b = ["disabled"], Tb = {
  key: 1,
  class: "map-empty-state"
}, Ab = ["disabled"], Mb = {
  key: 2,
  class: "map-empty-state"
}, Eb = ["disabled"], Ib = { class: "map-canvas-heading" }, Pb = {
  class: "map-legend is-scene",
  "aria-label": "场景地图图例"
}, Ob = {
  key: 0,
  class: "map-location-brief"
}, Rb = {
  key: 0,
  class: "map-empty-state"
}, Lb = ["disabled"], Bb = { class: "map-canvas-heading is-atlas" }, Nb = { key: 0 }, Db = {
  key: 2,
  class: "map-loading-scrim",
  role: "status"
}, qb = {
  class: "map-dialog",
  role: "alertdialog",
  "aria-modal": "true",
  "aria-labelledby": "map-rebuild-title"
}, Ub = { id: "map-rebuild-title" }, Fb = {
  key: 0,
  class: "map-dialog-error",
  role: "alert"
}, jb = ["disabled"], Hb = ["disabled", "title"], Ql = 35e3, Kb = 18e4, Gb = 24e4, Vb = "Xiaobai Map Symbols", zb = /* @__PURE__ */ se({
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
        const E = [
          "..",
          "..",
          "..",
          "libs",
          "material-symbols",
          "material-symbols-rounded.woff2"
        ].join("/"), k = new URL(E, import.meta.url).href;
        t = new FontFace(Vb, `url("${k}")`, {
          display: "block",
          style: "normal",
          weight: "400"
        }).load().catch((L) => {
          throw t = null, L;
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
    function i(E) {
      return !E || typeof E != "object" ? l() : structuredClone(/* @__PURE__ */ ue(E));
    }
    function r(E) {
      const k = E.map;
      if (!k) return "";
      const L = new Map(k.atlas.locations.map((V) => [V.key, V]));
      let D = L.get(k.atlas.actors.find((V) => V.actorKey === "player")?.locationKey || "");
      const Y = /* @__PURE__ */ new Set();
      for (; D && !Y.has(D.key); ) {
        if (Y.add(D.key), D.sceneKey && k.scenes[D.sceneKey]) return D.key;
        D = D.parent ? L.get(D.parent) : void 0;
      }
      return k.atlas.locations.find((V) => V.sceneKey && k.scenes[V.sceneKey])?.key || "";
    }
    const o = /* @__PURE__ */ K(i(a.initialState)), d = /* @__PURE__ */ K("scene"), p = /* @__PURE__ */ K(r(o.value)), c = /* @__PURE__ */ K(!1), y = /* @__PURE__ */ K(!1), w = /* @__PURE__ */ K(null), h = /* @__PURE__ */ K(""), T = /* @__PURE__ */ K(""), O = /* @__PURE__ */ K(!1);
    let R = () => {
    }, F = 0, q = 0, I = !1;
    const A = z(() => {
      const E = o.value.map;
      return E ? E.atlas.locations.filter((k) => k.sceneKey && E.scenes[k.sceneKey]) : [];
    }), x = z(() => o.value.map?.atlas.actors.find((E) => E.actorKey === "player") || null), M = z(() => o.value.map?.atlas.locations.find((E) => E.key === x.value?.locationKey) || null), S = z(() => o.value.map?.atlas.locations.find((E) => E.key === p.value) || null), C = z(() => {
      const E = S.value?.sceneKey;
      return E && o.value.map?.scenes[E] || null;
    }), _ = z(() => {
      const E = o.value.map;
      let k = S.value;
      if (!E || !k) return "";
      const L = new Map(E.atlas.locations.map((V) => [V.key, V])), D = [], Y = /* @__PURE__ */ new Set();
      for (; k && !Y.has(k.key); )
        Y.add(k.key), D.unshift(k.name), k = k.parent && L.get(k.parent) || null;
      return D.join(" / ");
    }), G = z(() => o.value.status === "loading" || o.value.status === "saving" || o.value.maintenanceStatus === "maintaining" || o.value.maintenanceStatus === "rebuilding"), ee = z(() => w.value !== null || G.value), X = z(() => o.value.status === "unconfirmed" || o.value.writeState === "unconfirmed"), J = z(() => ee.value || X.value), U = z(() => w.value ? "正在处理上一项地图操作" : o.value.maintenanceStatus === "maintaining" ? "地图正在维护，请等待本次维护完成" : o.value.maintenanceStatus === "rebuilding" ? "地图正在重建，请等待本次重建完成" : o.value.status === "loading" ? "地图状态正在载入" : o.value.status === "saving" ? "地图正在保存" : X.value ? "请先核实上一次保存结果" : o.value.status === "conflict" ? "地图版本发生冲突，请先采用服务端数据" : o.value.status === "blocked" ? o.value.message || "当前地图不可维护" : o.value.status === "error" ? o.value.message || "地图状态异常，请先重新读取" : o.value.chatIdentity ? "" : "当前聊天不可用"), le = Object.freeze({
      ready: "地图就绪",
      loading: "正在载入",
      saving: "正在保存",
      unconfirmed: "保存待核实",
      conflict: "版本冲突",
      blocked: "暂时不可用",
      error: "状态异常"
    }), ce = z(() => o.value.maintenanceStatus === "maintaining" ? "正在维护地图" : o.value.maintenanceStatus === "rebuilding" ? "正在重建地图" : w.value === "refresh" ? "正在重新读取" : w.value === "settings" ? "正在保存设置" : w.value === "confirm" ? "正在核实保存" : w.value === "adopt" ? "正在采用服务端数据" : w.value === "maintain" ? "正在维护地图" : w.value === "rebuild" ? "正在重建地图" : le[o.value.status]), oe = z(() => !!(h.value || o.value.message || o.value.maintenanceMessage || T.value) || ee.value || o.value.status !== "ready" || o.value.maintenanceStatus === "error"), ge = z(() => h.value || [
      "error",
      "blocked",
      "conflict"
    ].includes(o.value.status) || o.value.maintenanceStatus === "error" ? "danger" : X.value ? "warning" : ee.value ? "busy" : "info"), Ce = z(() => X.value ? "保存结果尚未确认" : o.value.status === "conflict" ? "地图版本发生冲突" : o.value.maintenanceStatus === "error" ? "地图维护未完成" : h.value || o.value.status === "error" ? "地图操作未完成" : o.value.status === "blocked" ? "地图暂时不可用" : ce.value), Ie = z(() => h.value || o.value.maintenanceMessage || o.value.message || T.value), nt = z(() => Ir[C.value?.mood || "neutral"]), Re = z(() => ({
      locations: o.value.map?.atlas.locations.length || 0,
      routes: o.value.map?.atlas.links.length || 0,
      actors: o.value.map?.atlas.actors.length || 0
    }));
    function Le(E) {
      return E !== null && typeof E == "object" && !Array.isArray(E);
    }
    function Mt(E) {
      if (!Le(E)) return null;
      const k = E.result, L = Le(k) && Le(k.state) ? k.state : k;
      return Le(L) && typeof L.chatIdentity == "string" && typeof L.status == "string" ? L : null;
    }
    function bt(E, k) {
      const L = E.map;
      if (L) {
        const D = L.atlas.locations.find((Y) => Y.key === k);
        if (D?.sceneKey && L.scenes[D.sceneKey]) return k;
      }
      return r(E);
    }
    function W(E) {
      const k = structuredClone(E);
      p.value = bt(k, k.chatIdentity === o.value.chatIdentity ? p.value : ""), o.value = k, h.value = "", T.value = "";
    }
    function H(E, k) {
      const L = E instanceof Error ? E.message : String(E);
      return L.includes("聊天已切换") ? "聊天已切换，请重新打开地图。" : L.includes("map_revision_conflict") ? "地图已被另一项操作更新，请重新读取后再试。" : L.includes("无法确认小白 OS 设置已经保存") ? "自动维护已按当前选择运行，但服务端保存结果未确认。" : L === "host_request_timeout" ? k === "maintain" || k === "rebuild" ? "等待 AI 处理超时；后台结果仍可能稍后送达，请勿立即重复操作。" : "等待地图服务响应超时，请稍后重试。" : L.includes("已有") && L.includes("维护") ? "已有地图维护正在进行，请等待完成。" : k === "settings" ? "自动维护设置未能保存，请重试。" : k === "refresh" ? "地图状态未能重新读取，请稍后重试。" : k === "confirm" ? "保存结果仍无法确认，请稍后再次核实。" : k === "adopt" ? "暂时无法采用服务端数据，冲突仍保持冻结。" : k === "rebuild" ? "地图建立/重建未完成，请检查模型配置后重试。" : "地图维护未完成，请检查模型配置后重试。";
    }
    async function ne(E, k, L = Ql, D = {}) {
      if (w.value) return null;
      const Y = ++F, V = q, Q = o.value.chatIdentity;
      w.value = k, h.value = "", T.value = "";
      try {
        const ae = await a.bridge.request(E, {
          chatIdentity: Q,
          ...D
        }, L);
        if (!I || Y !== F || o.value.chatIdentity !== Q) return null;
        const ve = q !== V, be = Mt(ae);
        let he = !1;
        return !ve && be?.chatIdentity === Q && (W(be), he = !0), {
          response: ae,
          stateApplied: he,
          newerStateReceived: ve
        };
      } catch (ae) {
        return I && Y === F && (h.value = H(ae, k)), null;
      } finally {
        I && Y === F && (w.value = null);
      }
    }
    async function Ee() {
      J.value || await ne("map/refresh", "refresh") && (T.value = "已读取当前聊天的最新地图状态。");
    }
    async function Qe() {
      ee.value || await ne("map/confirm-save", "confirm") && (T.value = "保存结果已重新核实。");
    }
    async function qe() {
      if (ee.value) return;
      const E = await ne("map/adopt-server-state", "adopt");
      if (!E) return;
      const k = Le(E.response) ? E.response.result : null;
      T.value = (Le(k) ? k.adoption : "") === "adopted" ? "已采用服务端数据，可以继续维护地图。" : "服务端数据仍无法采用，地图继续保持冻结。";
    }
    function v(E) {
      const k = Le(E.response) ? E.response.result : null;
      return Le(k) && typeof k.message == "string" ? k.message : "地图操作已结束。";
    }
    async function u(E) {
      if (w.value) return;
      const k = await ne("map/set-auto-maintenance", "settings", Ql, { enabled: E });
      k && (!k.stateApplied && !k.newerStateReceived && (o.value = {
        ...o.value,
        autoMaintenance: E
      }), T.value = E ? "普通聊天自动维护已开启。" : "普通聊天自动维护已关闭。");
    }
    async function f() {
      if (U.value || !o.value.map) return;
      const E = await ne("map/maintain-once", "maintain", Kb);
      E && (T.value = v(E));
    }
    function $() {
      U.value || (y.value = !0);
    }
    async function P() {
      if (U.value) return;
      const E = await ne("map/rebuild", "rebuild", Gb);
      E && (y.value = !1, T.value = v(E));
    }
    function N(E) {
      const k = o.value.map?.atlas.locations.find((L) => L.key === E);
      !k?.sceneKey || !o.value.map?.scenes[k.sceneKey] || (p.value = E, d.value = "scene");
    }
    function B(E) {
      return E.key === M.value?.key ? `${E.name}（当前位置）` : E.name;
    }
    return at(() => {
      I = !0, R = a.bridge.subscribe((E) => {
        if (E.type === "map/state") {
          const k = E.payload?.state;
          k && (q += 1, W(k));
        }
        E.type === "map/error" && (q += 1, T.value = "", h.value = E.payload?.message || "地图服务报告了一个错误，请重新读取。");
      }), typeof FontFace == "function" && document.fonts?.add && n().then((E) => {
        document.fonts.add(E), I && (O.value = !0);
      }).catch(() => {
        O.value = !1;
      });
    }), ot(() => {
      I = !1, F += 1, R(), y.value = !1;
    }), (E, k) => (g(), b("main", ub, [
      s("header", db, [k[12] || (k[12] = s("div", { class: "map-brand" }, [s("span", {
        class: "map-brand-mark",
        "aria-hidden": "true"
      }, [
        s("i"),
        s("i"),
        s("i")
      ]), s("div", null, [s("small", null, "XIAOBAI CARTOGRAPHY / 01"), s("h1", null, "地图")])], -1)), s("div", cb, [
        s("span", { class: te(["map-status-chip", `is-${ge.value}`]) }, [k[9] || (k[9] = s("i", null, null, -1)), re(m(ce.value), 1)], 2),
        s("button", {
          type: "button",
          class: "map-icon-button",
          disabled: J.value,
          title: "重新读取地图",
          "aria-label": "重新读取地图",
          onClick: Ee
        }, [...k[10] || (k[10] = [s("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [s("path", { d: "M20 7v5h-5M4 17v-5h5M18.2 9A7 7 0 0 0 6.1 6.7L4 9m16 6-2.1 2.3A7 7 0 0 1 5.8 15" })], -1)])], 8, fb),
        s("button", {
          type: "button",
          class: te(["map-icon-button", { "is-active": c.value }]),
          title: "地图设置",
          "aria-label": "地图设置",
          onClick: k[0] || (k[0] = (L) => c.value = !c.value)
        }, [...k[11] || (k[11] = [s("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [s("path", { d: "M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM19 13.5l2-1.5-2-1.5-.5-1.3.4-2.5-2.5-.4L15 4l-2 1h-2L9 4 7.6 6.3l-2.5.4.4 2.5L5 10.5 3 12l2 1.5.5 1.3-.4 2.5 2.5.4L9 20l2-1h2l2 1 1.4-2.3 2.5-.4-.4-2.5z" })], -1)])], 2)
      ])]),
      s("div", vb, [s("nav", pb, [s("button", {
        type: "button",
        class: te({ "is-active": d.value === "scene" }),
        onClick: k[1] || (k[1] = (L) => d.value = "scene")
      }, "场景", 2), s("button", {
        type: "button",
        class: te({ "is-active": d.value === "atlas" }),
        onClick: k[2] || (k[2] = (L) => d.value = "atlas")
      }, "世界", 2)]), d.value === "scene" ? (g(), b("label", gb, [k[13] || (k[13] = s("span", null, "观察地点", -1)), Ae(s("select", {
        "onUpdate:modelValue": k[3] || (k[3] = (L) => p.value = L),
        disabled: A.value.length === 0
      }, [A.value.length === 0 ? (g(), b("option", bb, "暂无可查看场景")) : j("", !0), (g(!0), b(Z, null, de(A.value, (L) => (g(), b("option", {
        key: L.key,
        value: L.key
      }, m(B(L)), 9, hb))), 128))], 8, mb), [[nd, p.value]])])) : (g(), b("div", yb, [
        s("span", null, m(Re.value.locations) + " 地点", 1),
        k[14] || (k[14] = s("i", null, null, -1)),
        s("span", null, m(Re.value.routes) + " 路线", 1),
        k[15] || (k[15] = s("i", null, null, -1)),
        s("span", null, m(Re.value.actors) + " 人物", 1)
      ]))]),
      oe.value ? (g(), b("aside", {
        key: 0,
        class: te(["map-notice", `is-${ge.value}`]),
        role: "status"
      }, [
        s("span", kb, m(ge.value === "danger" ? "!" : ge.value === "warning" ? "?" : "i"), 1),
        s("div", null, [s("strong", null, m(Ce.value), 1), Ie.value ? (g(), b("p", wb, m(Ie.value), 1)) : j("", !0)]),
        X.value ? (g(), b("button", {
          key: 0,
          type: "button",
          disabled: ee.value,
          onClick: Qe
        }, m(w.value === "confirm" ? "正在核实…" : "确认保存结果"), 9, $b)) : o.value.status === "conflict" ? (g(), b("button", {
          key: 1,
          type: "button",
          disabled: ee.value,
          onClick: qe
        }, m(w.value === "adopt" ? "正在采用…" : "采用服务端数据"), 9, xb)) : o.value.status === "blocked" || o.value.status === "error" || h.value ? (g(), b("button", {
          key: 2,
          type: "button",
          disabled: J.value,
          onClick: Ee
        }, m(w.value === "refresh" ? "正在读取…" : "重新读取"), 9, Sb)) : j("", !0)
      ], 2)) : j("", !0),
      s("section", { class: te(["map-workspace", { "has-notice": oe.value }]) }, [d.value === "scene" ? (g(), b(Z, { key: 0 }, [o.value.map ? C.value ? C.value.status === "uninitialized" ? (g(), b("div", Mb, [
        k[24] || (k[24] = s("span", {
          class: "map-empty-radar",
          "aria-hidden": "true"
        }, [s("i")], -1)),
        k[25] || (k[25] = s("small", null, "SCENE PENDING", -1)),
        s("h2", null, m(C.value.name) + " 尚未绘制", 1),
        k[26] || (k[26] = s("p", null, "地点已记录，场景几何仍待地图维护补全。", -1)),
        s("button", {
          type: "button",
          disabled: !!U.value,
          onClick: k[5] || (k[5] = (L) => c.value = !0)
        }, "打开维护设置", 8, Eb)
      ])) : (g(), b(Z, { key: 3 }, [
        Se(Wm, {
          scene: C.value,
          "symbols-ready": O.value
        }, null, 8, ["scene", "symbols-ready"]),
        s("div", Ib, [
          s("small", null, m(_.value || C.value.name), 1),
          s("h2", null, m(C.value.name), 1),
          s("span", null, [s("i", { style: Tt({ background: nt.value.accent }) }, null, 4), re(m(C.value.mood || "neutral"), 1)])
        ]),
        s("aside", Pb, [
          k[32] || (k[32] = s("strong", null, "图例", -1)),
          s("span", null, [k[27] || (k[27] = s("i", { class: "is-wall" }, null, -1)), re(m(me(da).wall), 1)]),
          s("span", null, [k[28] || (k[28] = s("i", { class: "is-road" }, null, -1)), re(m(me(da).road), 1)]),
          s("span", null, [k[29] || (k[29] = s("i", { class: "is-water" }, null, -1)), re(m(me(da).water), 1)]),
          s("span", null, [k[30] || (k[30] = s("i", { class: "is-danger" }, null, -1)), re(m(me(da).danger), 1)]),
          s("span", null, [k[31] || (k[31] = s("i", { class: "is-actor" }, null, -1)), re(m(me(da).actor), 1)]),
          k[33] || (k[33] = s("span", null, [s("i", { class: "is-inferred" }), re("推断")], -1))
        ]),
        S.value?.brief ? (g(), b("div", Ob, m(S.value.brief), 1)) : j("", !0)
      ], 64)) : (g(), b("div", Tb, [
        k[20] || (k[20] = s("span", {
          class: "map-empty-radar",
          "aria-hidden": "true"
        }, [s("i")], -1)),
        k[21] || (k[21] = s("small", null, "SCENE NOT AVAILABLE", -1)),
        k[22] || (k[22] = s("h2", null, "暂无可绘制的场景", -1)),
        k[23] || (k[23] = s("p", null, "世界地点已经存在，但还没有地点具备场景图。可维护一次地图来补充。", -1)),
        s("button", {
          type: "button",
          disabled: !!U.value,
          onClick: k[4] || (k[4] = (L) => c.value = !0)
        }, "打开维护设置", 8, Ab)
      ])) : (g(), b("div", Cb, [
        k[16] || (k[16] = s("span", {
          class: "map-empty-radar",
          "aria-hidden": "true"
        }, [s("i")], -1)),
        k[17] || (k[17] = s("small", null, "NO CARTOGRAPHIC DATA", -1)),
        k[18] || (k[18] = s("h2", null, "当前聊天还没有地图", -1)),
        k[19] || (k[19] = s("p", null, "从当前聊天中识别地点、路线与场景。只有确认后才会开始调用 AI。", -1)),
        s("button", {
          type: "button",
          disabled: !!U.value,
          onClick: $
        }, "从当前聊天建立地图", 8, _b)
      ]))], 64)) : (g(), b(Z, { key: 1 }, [!o.value.map || o.value.map.atlas.locations.length === 0 ? (g(), b("div", Rb, [
        k[34] || (k[34] = s("span", {
          class: "map-empty-radar",
          "aria-hidden": "true"
        }, [s("i")], -1)),
        k[35] || (k[35] = s("small", null, "ATLAS IS EMPTY", -1)),
        k[36] || (k[36] = s("h2", null, "世界地图尚未建立", -1)),
        k[37] || (k[37] = s("p", null, "建立地图后，这里会显示地点层级、通行路线和人物所在位置。", -1)),
        s("button", {
          type: "button",
          disabled: !!U.value,
          onClick: $
        }, "从当前聊天建立地图", 8, Lb)
      ])) : (g(), b(Z, { key: 1 }, [
        Se(pm, {
          atlas: o.value.map.atlas,
          revision: o.value.map.revision,
          "current-location-key": M.value?.key || "",
          "selected-location-key": p.value,
          "symbols-ready": O.value,
          onViewScene: N
        }, null, 8, [
          "atlas",
          "revision",
          "current-location-key",
          "selected-location-key",
          "symbols-ready"
        ]),
        s("div", Bb, [
          k[39] || (k[39] = s("small", null, "DETERMINISTIC WORLD GRAPH", -1)),
          k[40] || (k[40] = s("h2", null, "地点网络", -1)),
          M.value ? (g(), b("span", Nb, [k[38] || (k[38] = s("i", null, null, -1)), re("当前位置 · " + m(M.value.name), 1)])) : j("", !0)
        ]),
        k[41] || (k[41] = hu('<aside class="map-legend is-atlas" aria-label="世界地图图例"><strong>图例</strong><span><i class="is-current"></i>当前位置</span><span><i class="is-visited"></i>已到访</span><span><i class="is-route"></i>通行路线</span><span><i class="is-hierarchy"></i>隶属层级</span><small>点击有场景的地点可查看</small></aside>', 1))
      ], 64))], 64)), o.value.status === "loading" ? (g(), b("div", Db, [...k[42] || (k[42] = [s("span", null, null, -1), s("p", null, "正在校准地图坐标", -1)])])) : j("", !0)], 2),
      Se(cr, { name: "map-panel" }, {
        default: la(() => [c.value ? (g(), pe(ob, {
          key: 0,
          "auto-maintenance": o.value.autoMaintenance,
          busy: ee.value,
          "auto-toggle-busy": w.value !== null,
          "disabled-reason": U.value,
          "has-map": !!o.value.map,
          "maintenance-status": o.value.maintenanceStatus || "idle",
          "maintenance-message": o.value.maintenanceMessage || "",
          onClose: k[6] || (k[6] = (L) => c.value = !1),
          onSetAutoMaintenance: u,
          onMaintainOnce: f,
          onRequestRebuild: $
        }, null, 8, [
          "auto-maintenance",
          "busy",
          "auto-toggle-busy",
          "disabled-reason",
          "has-map",
          "maintenance-status",
          "maintenance-message"
        ])) : j("", !0)]),
        _: 1
      }),
      y.value ? (g(), b("div", {
        key: 1,
        class: "map-dialog-backdrop",
        onClick: k[8] || (k[8] = tt((L) => !ee.value && (y.value = !1), ["self"]))
      }, [s("section", qb, [
        k[43] || (k[43] = s("small", null, "AI CARTOGRAPHY REQUEST", -1)),
        s("h2", Ub, m(o.value.map ? "从当前聊天重建地图？" : "从当前聊天建立地图？"), 1),
        s("p", null, "此操作会调用已配置的 AI 模型并消耗 token / API 额度。" + m(o.value.map ? "现有地图将在新地图成功保存后被替换。" : "模型会读取当前聊天并生成第一版地图。"), 1),
        h.value ? (g(), b("p", Fb, m(h.value), 1)) : j("", !0),
        s("div", null, [s("button", {
          type: "button",
          disabled: ee.value,
          onClick: k[7] || (k[7] = (L) => y.value = !1)
        }, "取消", 8, jb), s("button", {
          type: "button",
          class: "is-confirm",
          disabled: ee.value || !!U.value,
          title: U.value,
          onClick: P
        }, m(w.value === "rebuild" || o.value.maintenanceStatus === "rebuilding" ? "正在建立地图…" : "确认并开始"), 9, Hb)])
      ])])) : j("", !0)
    ]));
  }
}), Wb = zb, Yb = Object.freeze({
  id: "tasks",
  name: "任务",
  accent: "#e8b84a"
}), Xb = { class: "tasks-page tasks-detail-page" }, Jb = { class: "tasks-page-heading" }, Qb = ["data-status"], Zb = {
  key: 0,
  class: "tasks-empty"
}, eh = { class: "tasks-contract-sheet" }, th = { class: "tasks-party-line" }, ah = { key: 0 }, nh = { key: 1 }, sh = { class: "tasks-timeline" }, lh = {
  key: 2,
  class: "tasks-empty"
}, ih = /* @__PURE__ */ se({
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
    return (i, r) => (g(), b("section", Xb, [s("header", Jb, [s("button", {
      type: "button",
      class: "tasks-back",
      onClick: r[0] || (r[0] = (o) => a("back"))
    }, "← 返回"), e.detail ? (g(), b("span", {
      key: 0,
      class: "tasks-detail-status",
      "data-status": e.detail.task.status
    }, m(n[e.detail.task.status]), 9, Qb)) : j("", !0)]), e.loading ? (g(), b("div", Zb, [...r[1] || (r[1] = [s("span", null, "READING CONTRACT", -1), s("h3", null, "正在读取合同", -1)])])) : e.detail ? (g(), b(Z, { key: 1 }, [s("article", eh, [
      s("header", null, [s("div", null, [s("small", null, m(e.detail.task.grade) + " / " + m(e.detail.task.source === "received" ? "WORLD CONTRACT" : "PLAYER CONTRACT"), 1), s("h2", null, m(e.detail.task.title), 1)]), s("strong", null, "¤ " + m(e.detail.task.reward), 1)]),
      s("div", th, [
        s("span", null, [r[2] || (r[2] = re("出资方", -1)), s("strong", null, m(e.detail.task.issuer.displayName), 1)]),
        r[4] || (r[4] = s("i", null, "→", -1)),
        s("span", null, [r[3] || (r[3] = re("执行方", -1)), s("strong", null, m(e.detail.task.assignee?.displayName || "等待指派"), 1)])
      ]),
      s("dl", null, [
        s("div", null, [r[5] || (r[5] = s("dt", null, "唯一完成目标", -1)), s("dd", null, m(e.detail.task.objective), 1)]),
        s("div", null, [r[6] || (r[6] = s("dt", null, "执行约束", -1)), s("dd", null, m(e.detail.task.requirements || "无附加执行约束"), 1)]),
        s("div", null, [r[7] || (r[7] = s("dt", null, "行动地点", -1)), s("dd", null, m(e.detail.task.location), 1)]),
        e.detail.task.timing ? (g(), b("div", ah, [r[8] || (r[8] = s("dt", null, "时机", -1)), s("dd", null, m(e.detail.task.timing), 1)])) : j("", !0),
        s("div", null, [r[9] || (r[9] = s("dt", null, "合同风险", -1)), s("dd", null, m(e.detail.task.risk || "未注明"), 1)]),
        s("div", null, [r[10] || (r[10] = s("dt", null, "累计进展", -1)), s("dd", null, m(e.detail.task.progressSummary || "尚无已确认进展"), 1)]),
        e.detail.task.resultSummary ? (g(), b("div", nh, [r[11] || (r[11] = s("dt", null, "最终结果", -1)), s("dd", null, m(e.detail.task.resultSummary), 1)])) : j("", !0)
      ])
    ]), s("section", sh, [r[13] || (r[13] = s("h3", null, "合同时间线", -1)), s("ol", null, [(g(!0), b(Z, null, de(e.detail.timeline, (o) => (g(), b("li", { key: o.eventId }, [r[12] || (r[12] = s("i", null, null, -1)), s("div", null, [s("small", null, "R" + m(o.taskRevision) + " · " + m(l(o.createdAt)), 1), s("p", null, m(o.summary), 1)])]))), 128))])])], 64)) : (g(), b("div", lh, [...r[14] || (r[14] = [s("span", null, "CONTRACT UNAVAILABLE", -1), s("h3", null, "合同无法读取", -1)])]))]));
  }
}), rh = ih, oh = { class: "tasks-page tasks-publish-page" }, uh = { class: "tasks-page-heading" }, dh = ["disabled"], ch = { class: "tasks-reward-input" }, fh = ["disabled"], vh = ["disabled", "title"], ph = /* @__PURE__ */ se({
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
    return (i, r) => (g(), b("section", oh, [s("header", uh, [s("button", {
      type: "button",
      class: "tasks-back",
      disabled: e.busy,
      onClick: r[0] || (r[0] = (o) => a("cancel"))
    }, "← 返回", 8, dh), r[8] || (r[8] = s("div", null, [s("small", null, "NEW ESCROW CONTRACT"), s("h2", null, "发布任务")], -1))]), s("form", {
      class: "tasks-publish-form",
      onSubmit: tt(l, ["prevent"])
    }, [
      s("aside", null, [
        r[9] || (r[9] = s("small", null, "当前可用余额", -1)),
        s("strong", null, "¤ " + m(e.balance), 1),
        r[10] || (r[10] = s("p", null, "确认发布后，报酬会立即锁入该任务的独立托管账户。招募期间可撤回并全额退款；选定执行者进入 active 后不可撤回。", -1))
      ]),
      s("label", null, [r[11] || (r[11] = s("span", null, [re("任务标题 "), s("b", null, "*")], -1)), Ae(s("input", {
        "onUpdate:modelValue": r[1] || (r[1] = (o) => n.title = o),
        required: "",
        maxlength: "120",
        autocomplete: "off",
        placeholder: "一句清楚的合同名称"
      }, null, 512), [[Be, n.title]])]),
      s("label", null, [r[12] || (r[12] = s("span", null, [re("唯一完成目标 "), s("b", null, "*")], -1)), Ae(s("textarea", {
        "onUpdate:modelValue": r[2] || (r[2] = (o) => n.objective = o),
        required: "",
        maxlength: "8000",
        rows: "4",
        placeholder: "只写一个可以明确判定完成的目标"
      }, null, 512), [[Be, n.objective]])]),
      s("label", null, [r[13] || (r[13] = s("span", null, "执行约束", -1)), Ae(s("textarea", {
        "onUpdate:modelValue": r[3] || (r[3] = (o) => n.requirements = o),
        maxlength: "8000",
        rows: "3",
        placeholder: "可空；只约束执行方式，不增加第二目标"
      }, null, 512), [[Be, n.requirements]])]),
      s("label", null, [r[14] || (r[14] = s("span", null, [re("行动地点 "), s("b", null, "*")], -1)), Ae(s("input", {
        "onUpdate:modelValue": r[4] || (r[4] = (o) => n.location = o),
        required: "",
        maxlength: "600",
        autocomplete: "off",
        placeholder: "目标行动实际发生的位置"
      }, null, 512), [[Be, n.location]])]),
      s("label", null, [r[15] || (r[15] = s("span", null, "已知风险", -1)), Ae(s("textarea", {
        "onUpdate:modelValue": r[5] || (r[5] = (o) => n.risk = o),
        maxlength: "2000",
        rows: "3",
        placeholder: "可空；写明一个具体坏结果"
      }, null, 512), [[Be, n.risk]])]),
      s("label", ch, [
        r[17] || (r[17] = s("span", null, [re("托管报酬 "), s("b", null, "*")], -1)),
        s("div", null, [r[16] || (r[16] = s("i", null, "¤", -1)), Ae(s("input", {
          "onUpdate:modelValue": r[6] || (r[6] = (o) => n.reward = o),
          type: "number",
          required: "",
          min: "1",
          step: "1"
        }, null, 512), [[
          Be,
          n.reward,
          void 0,
          { number: !0 }
        ]])]),
        s("small", { class: te({ "is-danger": n.reward > e.balance }) }, "发布后可用余额：¤ " + m(e.balance - (Number(n.reward) || 0)), 3)
      ]),
      s("footer", null, [s("button", {
        type: "button",
        disabled: e.busy,
        onClick: r[7] || (r[7] = (o) => a("cancel"))
      }, "取消", 8, fh), s("button", {
        type: "submit",
        class: "tasks-primary-button",
        disabled: e.busy || !!e.disabledReason || n.reward > e.balance,
        title: e.disabledReason
      }, m(e.busy ? "正在保存合同…" : "确认托管并发布"), 9, vh)])
    ], 32)]));
  }
}), gh = ph, mh = { class: "tasks-page" }, bh = { class: "tasks-page-heading" }, hh = { class: "tasks-count" }, yh = {
  key: 0,
  class: "tasks-empty"
}, kh = {
  key: 1,
  class: "tasks-record-list"
}, wh = ["onClick"], $h = { class: "tasks-record-grade" }, xh = { class: "tasks-record-main" }, Sh = { class: "tasks-record-aside" }, Ch = /* @__PURE__ */ se({
  __name: "TasksActive",
  props: { records: {} },
  emits: ["detail"],
  setup(e, { emit: t }) {
    const a = t;
    return (n, l) => (g(), b("section", mh, [s("header", bh, [l[0] || (l[0] = s("div", null, [s("small", null, "LIVE CONTRACTS"), s("h2", null, "进行中的任务")], -1)), s("span", hh, m(e.records.length), 1)]), e.records.length ? (g(), b("div", kh, [(g(!0), b(Z, null, de(e.records, (i) => (g(), b("button", {
      key: i.taskId,
      type: "button",
      class: "tasks-record",
      onClick: (r) => a("detail", i.taskId)
    }, [
      s("span", $h, m(i.grade), 1),
      s("span", xh, [
        s("small", null, m(i.source === "received" ? "大厅委托" : "我的委托") + " · " + m(i.location), 1),
        s("strong", null, m(i.title), 1),
        s("em", null, m(i.progressSummary), 1)
      ]),
      s("span", Sh, [s("strong", null, "¤ " + m(i.reward), 1), s("small", null, m(i.assignee?.displayName || "未指派"), 1)])
    ], 8, wh))), 128))])) : (g(), b("div", yh, [...l[1] || (l[1] = [
      s("span", null, "NO ACTIVE CONTRACT", -1),
      s("h3", null, "没有进行中的任务", -1),
      s("p", null, "从大厅接取任务，或为自己发布的委托选择执行者后，会出现在这里。", -1)
    ])]))]));
  }
}), _h = Ch, Th = { class: "tasks-page tasks-board-page" }, Ah = { class: "tasks-page-heading" }, Mh = ["disabled", "title"], Eh = {
  key: 0,
  class: "tasks-empty"
}, Ih = {
  key: 1,
  class: "tasks-board-grid"
}, Ph = ["data-grade"], Oh = { class: "tasks-listing-body" }, Rh = { class: "tasks-hook" }, Lh = { key: 0 }, Bh = { class: "tasks-tags" }, Nh = [
  "disabled",
  "title",
  "onClick"
], Dh = /* @__PURE__ */ se({
  __name: "TasksBoard",
  props: {
    board: {},
    busy: { type: Boolean },
    disabledReason: {}
  },
  emits: ["refresh", "accept"],
  setup(e, { emit: t }) {
    const a = t;
    return (n, l) => (g(), b("section", Th, [s("header", Ah, [l[2] || (l[2] = s("div", null, [s("small", null, "WORLD CONTRACT FEED / 06 CHANNELS"), s("h2", null, "世界任务大厅")], -1)), s("button", {
      type: "button",
      class: "tasks-agent-button",
      disabled: e.busy || !!e.disabledReason,
      title: e.disabledReason,
      onClick: l[0] || (l[0] = (i) => a("refresh"))
    }, [l[1] || (l[1] = s("span", { "aria-hidden": "true" }, "✦", -1)), re(m(e.busy ? "正在刷新…" : "刷新任务（使用 Agent）"), 1)], 8, Mh)]), e.board ? (g(), b("div", Ih, [(g(!0), b(Z, null, de(e.board.listings, (i) => (g(), b("article", {
      key: i.listingId,
      class: te(["tasks-listing", { "is-accepted": i.accepted }])
    }, [s("div", {
      class: "tasks-grade",
      "data-grade": i.grade
    }, [s("strong", null, m(i.grade), 1), s("small", null, m(i.tags[0]), 1)], 8, Ph), s("div", Oh, [
      s("header", null, [s("div", null, [s("span", null, m(i.posture), 1), s("span", null, m(i.timing), 1)]), s("strong", null, "¤ " + m(i.reward), 1)]),
      s("h3", null, m(i.title), 1),
      s("p", Rh, m(i.hook), 1),
      s("dl", null, [
        s("div", null, [l[4] || (l[4] = s("dt", null, "唯一目标", -1)), s("dd", null, m(i.objective), 1)]),
        i.requirements ? (g(), b("div", Lh, [l[5] || (l[5] = s("dt", null, "执行约束", -1)), s("dd", null, m(i.requirements), 1)])) : j("", !0),
        s("div", null, [l[6] || (l[6] = s("dt", null, "地点", -1)), s("dd", null, m(i.location), 1)]),
        s("div", null, [l[7] || (l[7] = s("dt", null, "风险", -1)), s("dd", null, m(i.risk), 1)])
      ]),
      s("footer", null, [s("div", Bh, [(g(!0), b(Z, null, de(i.tags, (r) => (g(), b("span", { key: r }, m(r), 1))), 128))]), s("button", {
        type: "button",
        disabled: i.accepted || e.busy || !!e.disabledReason,
        title: e.disabledReason,
        onClick: (r) => a("accept", e.board.boardId, i.listingId)
      }, m(i.accepted ? "已接取" : "接取任务"), 9, Nh)])
    ])], 2))), 128))])) : (g(), b("div", Eh, [...l[3] || (l[3] = [
      s("span", null, "NO CONTRACT SIGNAL", -1),
      s("h3", null, "大厅暂时没有委托", -1),
      s("p", null, "打开页面不会调用模型。只有点击刷新后，任务终端才读取当前聊天资料生成一组尚未发生的委托。", -1)
    ])]))]));
  }
}), qh = Dh, Uh = { class: "tasks-page" }, Fh = { class: "tasks-page-heading" }, jh = { class: "tasks-count" }, Hh = {
  key: 0,
  class: "tasks-empty"
}, Kh = {
  key: 1,
  class: "tasks-history-list"
}, Gh = ["data-status", "onClick"], Vh = ["disabled"], zh = /* @__PURE__ */ se({
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
    return (l, i) => (g(), b("section", Uh, [s("header", Fh, [i[1] || (i[1] = s("div", null, [s("small", null, "SEALED CONTRACT ARCHIVE"), s("h2", null, "任务历史")], -1)), s("span", jh, m(e.history.items.length), 1)]), e.history.items.length ? (g(), b("div", Kh, [(g(!0), b(Z, null, de(e.history.items, (r) => (g(), b("button", {
      key: r.taskId,
      type: "button",
      class: "tasks-history-row",
      "data-status": r.status,
      onClick: (o) => a("detail", r.taskId)
    }, [
      s("span", null, m(n[r.status]), 1),
      s("strong", null, m(r.title), 1),
      s("em", null, m(r.resultSummary), 1),
      s("b", null, "¤ " + m(r.reward), 1)
    ], 8, Gh))), 128)), e.history.hasMore ? (g(), b("button", {
      key: 0,
      type: "button",
      class: "tasks-load-more",
      disabled: e.loading,
      onClick: i[0] || (i[0] = (r) => a("loadMore"))
    }, m(e.loading ? "正在读取…" : "读取更多档案"), 9, Vh)) : j("", !0)])) : (g(), b("div", Hh, [...i[2] || (i[2] = [
      s("span", null, "ARCHIVE EMPTY", -1),
      s("h3", null, "还没有终态合同", -1),
      s("p", null, "完成、失败或撤回后的任务会按最后更新时间进入档案。", -1)
    ])]))]));
  }
}), Wh = zh, Yh = {
  key: 0,
  class: "tasks-candidates"
}, Xh = [
  "disabled",
  "title",
  "onClick"
], Jh = {
  key: 1,
  class: "tasks-inline-empty"
}, Qh = /* @__PURE__ */ se({
  __name: "TaskCandidateList",
  props: {
    task: {},
    busy: { type: Boolean },
    disabledReason: {}
  },
  emits: ["assign"],
  setup(e, { emit: t }) {
    const a = t;
    return (n, l) => e.task.candidates.length ? (g(), b("div", Yh, [(g(!0), b(Z, null, de(e.task.candidates, (i) => (g(), b("article", {
      key: i.candidateId,
      class: "tasks-candidate"
    }, [
      s("header", null, [s("strong", null, m(i.name), 1), l[0] || (l[0] = s("span", null, "应征者", -1))]),
      s("p", null, m(i.description), 1),
      s("blockquote", null, "“" + m(i.pitch) + "”", 1),
      s("dl", null, [s("div", null, [l[1] || (l[1] = s("dt", null, "能力", -1)), s("dd", null, m(i.capability), 1)]), s("div", null, [l[2] || (l[2] = s("dt", null, "隐患", -1)), s("dd", null, m(i.risk), 1)])]),
      s("button", {
        type: "button",
        class: "tasks-primary-button",
        disabled: e.busy || !!e.disabledReason,
        title: e.disabledReason,
        onClick: (r) => a("assign", e.task, i.candidateId)
      }, " 选择此人 ", 8, Xh)
    ]))), 128))])) : (g(), b("p", Jh, "候选席空置。可以发起一次招募，也可以直接撤回托管。"));
  }
}), Zh = Qh, ey = { class: "tasks-page" }, ty = { class: "tasks-page-heading" }, ay = ["disabled", "title"], ny = {
  key: 0,
  class: "tasks-empty"
}, sy = {
  key: 1,
  class: "tasks-published-list"
}, ly = { key: 0 }, iy = { key: 1 }, ry = { class: "tasks-published-actions" }, oy = ["onClick"], uy = [
  "disabled",
  "title",
  "onClick"
], dy = [
  "disabled",
  "title",
  "onClick"
], cy = /* @__PURE__ */ se({
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
    return (n, l) => (g(), b("section", ey, [s("header", ty, [l[2] || (l[2] = s("div", null, [s("small", null, "PLAYER ESCROW DESK"), s("h2", null, "我发布的任务")], -1)), s("button", {
      type: "button",
      class: "tasks-primary-button",
      disabled: !!e.disabledReason,
      title: e.disabledReason,
      onClick: l[0] || (l[0] = (i) => a("publish"))
    }, "发布新任务", 8, ay)]), e.records.length ? (g(), b("div", sy, [(g(!0), b(Z, null, de(e.records, (i) => (g(), b("article", {
      key: i.taskId,
      class: "tasks-published-card"
    }, [
      s("header", null, [s("div", null, [l[4] || (l[4] = s("small", null, "CUSTOM / ESCROW LOCKED", -1)), s("h3", null, m(i.title), 1)]), s("strong", null, "¤ " + m(i.reward), 1)]),
      s("dl", null, [
        s("div", null, [l[5] || (l[5] = s("dt", null, "唯一目标", -1)), s("dd", null, m(i.objective), 1)]),
        i.requirements ? (g(), b("div", ly, [l[6] || (l[6] = s("dt", null, "执行约束", -1)), s("dd", null, m(i.requirements), 1)])) : j("", !0),
        s("div", null, [l[7] || (l[7] = s("dt", null, "地点", -1)), s("dd", null, m(i.location), 1)]),
        i.risk ? (g(), b("div", iy, [l[8] || (l[8] = s("dt", null, "风险", -1)), s("dd", null, m(i.risk), 1)])) : j("", !0)
      ]),
      s("div", ry, [
        s("button", {
          type: "button",
          onClick: (r) => a("detail", i.taskId)
        }, "查看合同", 8, oy),
        s("button", {
          type: "button",
          class: "tasks-agent-button",
          disabled: e.writeBusy || !!e.candidateBusyTaskId || !!e.disabledReason,
          title: e.disabledReason,
          onClick: (r) => a("recruit", i)
        }, m(e.candidateBusyTaskId === i.taskId ? "正在招募…" : "招募候选人（使用 Agent）"), 9, uy),
        s("button", {
          type: "button",
          class: "is-danger",
          disabled: e.writeBusy || !!e.disabledReason,
          title: e.disabledReason,
          onClick: (r) => a("cancel", i)
        }, "撤回并退款", 8, dy)
      ]),
      Se(Zh, {
        task: i,
        busy: e.writeBusy || !!e.candidateBusyTaskId,
        "disabled-reason": e.disabledReason,
        onAssign: l[1] || (l[1] = (r, o) => a("assign", r, o))
      }, null, 8, [
        "task",
        "busy",
        "disabled-reason"
      ])
    ]))), 128))])) : (g(), b("div", ny, [...l[3] || (l[3] = [
      s("span", null, "NO OPEN RECRUITMENT", -1),
      s("h3", null, "没有正在招募的委托", -1),
      s("p", null, "发布任务会立即从钱包锁定报酬，但不会调用 Agent；招募候选人时才会调用。", -1)
    ])]))]));
  }
}), fy = cy, vy = { class: "tasks-page tasks-settings-page" }, py = { class: "tasks-setting-card" }, gy = { class: "tasks-switch" }, my = ["checked", "disabled"], by = { class: "tasks-setting-card is-manual" }, hy = ["disabled", "title"], yy = /* @__PURE__ */ se({
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
    return (n, l) => (g(), b("section", vy, [
      l[5] || (l[5] = s("header", { class: "tasks-page-heading" }, [s("div", null, [s("small", null, "AUTOMATION POLICY"), s("h2", null, "任务设置")])], -1)),
      s("article", py, [l[3] || (l[3] = s("div", null, [
        s("small", null, "ALL STANDARD CHATS"),
        s("h3", null, "所有普通聊天自动维护"),
        s("p", null, "仅当存在 active 任务，且新接受轮晚于该任务最近状态基线时才会调用 Agent。系统会在下一条 User 消息保存后处理上一轮，不响应 swipe、regenerate、continue 或打开 APP。")
      ], -1)), s("label", gy, [
        s("input", {
          type: "checkbox",
          checked: e.autoMaintenance,
          disabled: e.settingsBusy,
          onChange: l[0] || (l[0] = (i) => a("update", i.target.checked))
        }, null, 40, my),
        l[2] || (l[2] = s("span", null, null, -1)),
        s("em", null, m(e.autoMaintenance ? "开启" : "关闭"), 1)
      ])]),
      s("article", by, [l[4] || (l[4] = s("div", null, [
        s("small", null, "EXPLICIT AGENT RUN"),
        s("h3", null, "维护一次"),
        s("p", null, "读取最新完整接受轮，只检查符合基线条件的 active 任务。没有新任务状态时会在调用模型前短路。")
      ], -1)), s("button", {
        type: "button",
        class: "tasks-agent-button",
        disabled: e.maintenanceBusy || !!e.disabledReason,
        title: e.disabledReason,
        onClick: l[1] || (l[1] = (i) => a("maintain"))
      }, m(e.maintenanceBusy ? "正在维护…" : "维护一次（使用 Agent）"), 9, hy)]),
      l[6] || (l[6] = s("aside", { class: "tasks-settings-note" }, [s("strong", null, "明确的调用边界"), s("p", null, "刷新大厅、招募候选、维护一次和已开启的自动维护会使用 Agent。查看页面、接取、发布、选人、撤回与切换此开关都不会调用。")], -1))
    ]));
  }
}), ky = yy;
function wy(e, t, a, n) {
  if (n !== a.stateVersion || e.nextCursor !== a.cursor) return null;
  const l = new Set(e.items.map((i) => i.taskId));
  return {
    items: [...e.items, ...t.items.filter((i) => !l.has(i.taskId))],
    nextCursor: t.nextCursor,
    hasMore: t.hasMore
  };
}
var $y = { class: "tasks-app" }, xy = { class: "tasks-app-header" }, Sy = { class: "tasks-balance" }, Cy = { class: "tasks-status" }, _y = ["disabled"], Ty = ["disabled"], Ay = { class: "tasks-content" }, My = {
  class: "tasks-nav",
  "aria-label": "任务页面"
}, Ey = { key: 0 }, Iy = { key: 0 }, Py = {
  class: "tasks-dialog",
  role: "alertdialog",
  "aria-modal": "true",
  "aria-labelledby": "tasks-publish-confirm-title"
}, Oy = ["disabled"], Ry = ["disabled", "title"], Ly = 35e3, os = 18e4, By = /* @__PURE__ */ se({
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
    function n(v) {
      return v && typeof v == "object" ? structuredClone(/* @__PURE__ */ ue(v)) : a();
    }
    function l(v) {
      return v !== null && typeof v == "object" && !Array.isArray(v);
    }
    function i(v) {
      return l(v) ? v.result : null;
    }
    const r = /* @__PURE__ */ K(n(t.initialState)), o = /* @__PURE__ */ K("board"), d = /* @__PURE__ */ K("board"), p = /* @__PURE__ */ K(null), c = /* @__PURE__ */ K(null), y = /* @__PURE__ */ K(!1), w = /* @__PURE__ */ K(""), h = /* @__PURE__ */ K(!1), T = /* @__PURE__ */ K(!1), O = /* @__PURE__ */ K(!1), R = /* @__PURE__ */ K(!1), F = /* @__PURE__ */ K(!1), q = /* @__PURE__ */ K(!1), I = /* @__PURE__ */ K(""), A = /* @__PURE__ */ K("");
    let x = 0, M = !1, S = () => {
    };
    const C = z(() => r.value.status === "unconfirmed"), _ = z(() => h.value ? "正在保存上一项合同操作" : r.value.status === "loading" ? "任务数据正在准备" : r.value.status === "saving" ? "任务与资金正在保存" : r.value.status === "unconfirmed" ? "请先核实上一次保存结果" : r.value.status === "conflict" ? "请先采用服务端数据" : r.value.status === "blocked" ? r.value.message || "任务终端暂时不可用" : r.value.generationActive ? "主剧情或任务 Agent 正在生成" : ""), G = z(() => _.value || (T.value ? "任务维护正在运行" : "")), ee = z(() => y.value ? "正在刷新大厅" : w.value ? "正在招募候选" : T.value || r.value.maintenance.state === "running" ? "正在维护任务" : r.value.status === "loading" ? "正在准备终端" : r.value.status === "saving" ? "正在保存" : r.value.status === "unconfirmed" ? "保存待核实" : r.value.status === "conflict" ? "保存冲突" : r.value.status === "blocked" ? "终端受阻" : "合同链路正常");
    function X(v) {
      !v || typeof v.chatIdentity != "string" || (r.value = structuredClone(v), I.value = "");
    }
    function J(v) {
      if (!l(v)) return null;
      const u = l(v.state) ? v.state : v;
      return typeof u.chatIdentity == "string" ? u : null;
    }
    function U(v) {
      const u = v instanceof Error ? v.message : String(v);
      return u === "tasks_insufficient_funds" ? "小白币余额不足，任务没有发布。" : u === "tasks_state_changed" || u === "tasks_listing_already_accepted" ? "任务状态已经变化，请按最新状态重试。" : u === "tasks_terminal" ? "该任务已经结束，不能再次操作。" : u === "tasks_publish_invalid" || u === "tasks_request_invalid" ? "合同内容不完整或超出允许范围。" : u === "tasks_write_blocked" || u === "tasks_generation_active" ? "当前有生成或保存正在进行，请稍后重试。" : u === "tasks_chat_changed" ? "聊天已经切换，请重新打开任务终端。" : u === "host_request_timeout" ? "等待终端响应超时；后台保存或 Agent 请求仍可能稍后完成，请勿立即重复。" : "任务操作未完成，请稍后重试。";
    }
    async function le(v, u = {}, f = Ly) {
      return i(await t.bridge.request(v, {
        chatIdentity: r.value.chatIdentity,
        ...u
      }, f));
    }
    function ce(v, u) {
      if (x !== u) return;
      const f = J(v);
      f?.chatIdentity === r.value.chatIdentity && X(f);
    }
    function oe(v) {
      A.value = v, I.value = "";
    }
    async function ge() {
      if (y.value || G.value) return;
      y.value = !0, I.value = "";
      const v = x;
      try {
        const u = await le("tasks/refresh", {}, os);
        if (!M) return;
        ce(u, v);
        const f = l(u) && l(u.outcome) ? u.outcome : null;
        oe(typeof f?.message == "string" ? f.message : "任务大厅请求已结束");
      } catch (u) {
        M && (I.value = U(u));
      } finally {
        M && (y.value = !1);
      }
    }
    async function Ce(v, u) {
      if (_.value) return;
      h.value = !0;
      const f = x;
      try {
        ce(await le("tasks/board/accept", {
          boardId: v,
          listingId: u
        }), f), oe("任务已接取，报酬已进入托管。");
      } catch ($) {
        I.value = U($);
      } finally {
        h.value = !1;
      }
    }
    async function Ie(v) {
      if (w.value || G.value) return;
      w.value = v.taskId;
      const u = x;
      try {
        const f = await le("tasks/candidates/refresh", {
          taskId: v.taskId,
          expectedTaskRevision: v.taskRevision,
          expectedEventId: v.eventId
        }, os);
        ce(f, u);
        const $ = l(f) && l(f.outcome) ? f.outcome : null;
        oe(typeof $?.message == "string" ? $.message : "招募请求已结束");
      } catch (f) {
        I.value = U(f);
      } finally {
        w.value = "";
      }
    }
    async function nt(v, u) {
      if (_.value) return;
      h.value = !0;
      const f = x;
      try {
        ce(await le("tasks/candidates/assign", {
          taskId: v.taskId,
          expectedTaskRevision: v.taskRevision,
          expectedEventId: v.eventId,
          candidateId: u
        }), f), oe("执行者已确认，任务进入进行中。");
      } catch ($) {
        I.value = U($);
      } finally {
        h.value = !1;
      }
    }
    async function Re(v) {
      if (_.value || !globalThis.confirm(`撤回“${v.title}”并退回 ¤ ${v.reward}？`)) return;
      h.value = !0;
      const u = x;
      try {
        ce(await le("tasks/cancel", {
          taskId: v.taskId,
          expectedTaskRevision: v.taskRevision,
          expectedEventId: v.eventId
        }), u), oe("任务已撤回，托管报酬已退回钱包。");
      } catch (f) {
        I.value = U(f);
      } finally {
        h.value = !1;
      }
    }
    function Le(v) {
      _.value || (c.value = structuredClone(v));
    }
    async function Mt() {
      const v = c.value;
      if (!v || _.value) return;
      h.value = !0;
      const u = x;
      try {
        ce(await le("tasks/publish", { form: v }), u), c.value = null, o.value = "published", oe("任务已发布，报酬已锁入托管。");
      } catch (f) {
        I.value = U(f);
      } finally {
        h.value = !1;
      }
    }
    async function bt(v) {
      if (O.value) return;
      O.value = !0;
      const u = x;
      try {
        ce(await le("tasks/settings/update", { autoMaintenance: v }), u), oe(v ? "普通聊天自动维护已开启。" : "普通聊天自动维护已关闭。");
      } catch (f) {
        I.value = U(f);
      } finally {
        O.value = !1;
      }
    }
    async function W() {
      if (T.value || G.value) return;
      T.value = !0;
      const v = x;
      try {
        const u = await le("tasks/maintenance/run", {}, os);
        ce(u, v), oe(l(u) && typeof u.message == "string" ? u.message : "任务维护已结束");
      } catch (u) {
        I.value = U(u);
      } finally {
        T.value = !1;
      }
    }
    async function H(v) {
      d.value = o.value === "detail" || o.value === "publish" ? "active" : o.value, o.value = "detail", p.value = null, F.value = !0;
      try {
        const u = await le("tasks/detail/read", { taskId: v });
        l(u) && l(u.task) && Array.isArray(u.timeline) && (p.value = structuredClone(u));
      } catch (u) {
        I.value = U(u);
      } finally {
        F.value = !1;
      }
    }
    async function ne() {
      const v = r.value.history.nextCursor;
      if (!v || q.value) return;
      q.value = !0;
      const u = {
        cursor: v,
        stateVersion: x
      };
      try {
        const f = await le("tasks/history/load-more", { cursor: v });
        if (M && l(f) && Array.isArray(f.items)) {
          const $ = f, P = wy(r.value.history, $, u, x);
          P && (r.value.history = P);
        }
      } catch (f) {
        I.value = U(f);
      } finally {
        q.value = !1;
      }
    }
    async function Ee() {
      if (R.value) return;
      R.value = !0;
      const v = x;
      try {
        ce(await le("tasks/save/confirm"), v), oe("保存结果已重新核实。");
      } catch (u) {
        I.value = U(u);
      } finally {
        R.value = !1;
      }
    }
    async function Qe() {
      if (R.value) return;
      R.value = !0;
      const v = x;
      try {
        ce(await le("tasks/save/adopt-server"), v), oe("已采用服务端数据。");
      } catch (u) {
        I.value = U(u);
      } finally {
        R.value = !1;
      }
    }
    function qe(v) {
      v !== "publish" && (d.value = v), o.value = v;
    }
    return et(o, (v) => {
      const u = v === "publish" ? "published" : v;
      t.bridge.post("tasks/activate", {
        chatIdentity: r.value.chatIdentity,
        page: u
      });
    }), at(() => {
      M = !0, S = t.bridge.subscribe((v) => {
        if (v.type === "tasks/state") {
          const u = v.payload?.state;
          u && (x += 1, X(u));
        }
        v.type === "tasks/error" && (I.value = "任务状态暂时无法读取，请重新打开。");
      }), t.bridge.post("tasks/activate", {
        chatIdentity: r.value.chatIdentity,
        page: "board"
      });
    }), ot(() => {
      M = !1, S(), c.value = null;
    }), (v, u) => (g(), b("main", $y, [
      s("header", xy, [
        u[11] || (u[11] = s("div", { class: "tasks-brand" }, [s("span", { "aria-hidden": "true" }, [
          s("i"),
          s("i"),
          s("i")
        ]), s("div", null, [s("small", null, "XIAOBAI FORMAL CONTRACT NETWORK"), s("h1", null, "任务终端")])], -1)),
        s("div", Sy, [u[10] || (u[10] = s("small", null, "可用余额", -1)), s("strong", null, "¤ " + m(r.value.playerBalance), 1)]),
        s("div", Cy, [s("i", { class: te({ "is-alert": r.value.status !== "ready" }) }, null, 2), s("span", null, m(ee.value), 1)])
      ]),
      r.value.message || I.value || A.value ? (g(), b("aside", {
        key: 0,
        class: te(["tasks-notice", {
          "is-error": !!I.value || r.value.status === "conflict" || r.value.status === "blocked",
          "is-warning": C.value
        }]),
        role: "status"
      }, [
        s("span", null, m(I.value ? "!" : C.value ? "?" : "i"), 1),
        s("p", null, m(I.value || r.value.message || A.value), 1),
        C.value ? (g(), b("button", {
          key: 0,
          type: "button",
          disabled: R.value,
          onClick: Ee
        }, m(R.value ? "正在核实…" : "核实保存结果"), 9, _y)) : r.value.status === "conflict" ? (g(), b("button", {
          key: 1,
          type: "button",
          disabled: R.value,
          onClick: Qe
        }, m(R.value ? "正在采用…" : "采用服务端数据"), 9, Ty)) : j("", !0)
      ], 2)) : j("", !0),
      s("div", Ay, [o.value === "board" ? (g(), pe(qh, {
        key: 0,
        board: r.value.board,
        busy: y.value,
        "disabled-reason": G.value,
        onRefresh: ge,
        onAccept: Ce
      }, null, 8, [
        "board",
        "busy",
        "disabled-reason"
      ])) : o.value === "active" ? (g(), pe(_h, {
        key: 1,
        records: r.value.active,
        onDetail: H
      }, null, 8, ["records"])) : o.value === "published" ? (g(), pe(fy, {
        key: 2,
        records: r.value.recruiting,
        "candidate-busy-task-id": w.value,
        "write-busy": h.value,
        "disabled-reason": _.value,
        onRecruit: Ie,
        onAssign: nt,
        onCancel: Re,
        onDetail: H,
        onPublish: u[0] || (u[0] = (f) => qe("publish"))
      }, null, 8, [
        "records",
        "candidate-busy-task-id",
        "write-busy",
        "disabled-reason"
      ])) : o.value === "history" ? (g(), pe(Wh, {
        key: 3,
        history: r.value.history,
        loading: q.value,
        onDetail: H,
        onLoadMore: ne
      }, null, 8, ["history", "loading"])) : o.value === "settings" ? (g(), pe(ky, {
        key: 4,
        "auto-maintenance": r.value.settings.autoMaintenance,
        "settings-busy": O.value,
        "maintenance-busy": T.value || r.value.maintenance.state === "running",
        "disabled-reason": G.value,
        onUpdate: bt,
        onMaintain: W
      }, null, 8, [
        "auto-maintenance",
        "settings-busy",
        "maintenance-busy",
        "disabled-reason"
      ])) : o.value === "publish" ? (g(), pe(gh, {
        key: 5,
        balance: r.value.playerBalance,
        busy: h.value,
        "disabled-reason": _.value,
        onSubmit: Le,
        onCancel: u[1] || (u[1] = (f) => qe("published"))
      }, null, 8, [
        "balance",
        "busy",
        "disabled-reason"
      ])) : (g(), pe(rh, {
        key: 6,
        detail: p.value,
        loading: F.value,
        onBack: u[2] || (u[2] = (f) => qe(d.value))
      }, null, 8, ["detail", "loading"]))]),
      s("nav", My, [
        s("button", {
          type: "button",
          class: te({ "is-active": o.value === "board" }),
          onClick: u[3] || (u[3] = (f) => qe("board"))
        }, [...u[12] || (u[12] = [s("span", null, "⌁", -1), re("大厅", -1)])], 2),
        s("button", {
          type: "button",
          class: te({ "is-active": o.value === "active" }),
          onClick: u[4] || (u[4] = (f) => qe("active"))
        }, [
          u[13] || (u[13] = s("span", null, "▶", -1)),
          u[14] || (u[14] = re("进行中", -1)),
          r.value.active.length ? (g(), b("b", Ey, m(r.value.active.length), 1)) : j("", !0)
        ], 2),
        s("button", {
          type: "button",
          class: te({ "is-active": o.value === "published" || o.value === "publish" }),
          onClick: u[5] || (u[5] = (f) => qe("published"))
        }, [
          u[15] || (u[15] = s("span", null, "◇", -1)),
          u[16] || (u[16] = re("我发布的", -1)),
          r.value.recruiting.length ? (g(), b("b", Iy, m(r.value.recruiting.length), 1)) : j("", !0)
        ], 2),
        s("button", {
          type: "button",
          class: te({ "is-active": o.value === "history" }),
          onClick: u[6] || (u[6] = (f) => qe("history"))
        }, [...u[17] || (u[17] = [s("span", null, "▤", -1), re("历史", -1)])], 2),
        s("button", {
          type: "button",
          class: te({ "is-active": o.value === "settings" }),
          onClick: u[7] || (u[7] = (f) => qe("settings"))
        }, [...u[18] || (u[18] = [s("span", null, "⚙", -1), re("设置", -1)])], 2)
      ]),
      c.value ? (g(), b("div", {
        key: 1,
        class: "tasks-dialog-backdrop",
        onClick: u[9] || (u[9] = tt((f) => !h.value && (c.value = null), ["self"]))
      }, [s("section", Py, [
        u[20] || (u[20] = s("small", null, "ESCROW COMMITMENT", -1)),
        u[21] || (u[21] = s("h2", { id: "tasks-publish-confirm-title" }, "确认发布并托管报酬？", -1)),
        s("p", null, [
          re("“" + m(c.value.title) + "”将立即从钱包锁定 ", 1),
          s("strong", null, "¤ " + m(c.value.reward), 1),
          u[19] || (u[19] = re("。招募期间可以撤回；选定执行者后不能撤回。", -1))
        ]),
        s("div", null, [s("button", {
          type: "button",
          disabled: h.value,
          onClick: u[8] || (u[8] = (f) => c.value = null)
        }, "返回修改", 8, Oy), s("button", {
          type: "button",
          class: "tasks-primary-button",
          disabled: !!_.value,
          title: _.value || void 0,
          onClick: Mt
        }, m(h.value ? "正在保存…" : "确认发布"), 9, Ry)])
      ])])) : j("", !0)
    ]));
  }
}), Ny = By, Dy = Object.freeze({
  id: "fourth-wall",
  name: "四次元壁",
  accent: "#7567d8"
}), qy = ["src"], Uy = {
  key: 1,
  class: "fourth-wall-avatar is-placeholder",
  "aria-hidden": "true"
}, Fy = { class: "fourth-wall-message-stack" }, jy = {
  key: 0,
  class: "fourth-wall-thinking"
}, Hy = { class: "fourth-wall-bubble" }, Ky = {
  key: 0,
  class: "fourth-wall-message-text"
}, Gy = {
  key: 1,
  class: "fourth-wall-image-card"
}, Vy = ["src", "alt"], zy = ["onClick"], Wy = { key: 2 }, Yy = { key: 3 }, Xy = ["onClick"], Jy = { "aria-hidden": "true" }, Qy = { key: 0 }, Zy = { class: "fourth-wall-message-actions" }, e1 = { key: 1 }, t1 = /* @__PURE__ */ se({
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
    let d = () => {
    };
    function p(x) {
      const M = /\[(?:img|图片)\s*:\s*([^\]]+)\]|\[(?:voice|语音)\s*:([^:\]]*):([^\]]+)\]|\[(?:voice|语音)\s*:\s*([^\]]+)\]/gi, S = [];
      let C = 0, _;
      for (; (_ = M.exec(x)) !== null; )
        _.index > C && S.push({
          kind: "text",
          raw: x.slice(C, _.index),
          value: x.slice(C, _.index)
        }), _[1] !== void 0 ? S.push({
          kind: "image",
          raw: _[0],
          value: _[1].trim()
        }) : S.push({
          kind: "voice",
          raw: _[0],
          value: String(_[3] ?? _[4] ?? "").trim(),
          emotion: String(_[2] || "").trim().toLowerCase()
        }), C = M.lastIndex;
      return C < x.length && S.push({
        kind: "text",
        raw: x.slice(C),
        value: x.slice(C)
      }), S.length ? S : [{
        kind: "text",
        raw: x,
        value: x
      }];
    }
    const c = z(() => p(a.message.content)), y = z(() => a.message.ts ? new Intl.DateTimeFormat("zh-CN", {
      hour: "2-digit",
      minute: "2-digit"
    }).format(a.message.ts) : "");
    function w(x, M) {
      return `fw-${x}-${Date.now()}-${a.messageIndex}-${M}-${Math.random().toString(36).slice(2, 7)}`;
    }
    function h(x) {
      return x.result;
    }
    function T(x, M) {
      return o.has(M) && r[x]?.requestId === M;
    }
    async function O(x, M) {
      if (r[M]?.status === "loading" || r[M]?.status === "ready") return;
      if (!a.imageAvailable) {
        r[M] = {
          status: "unavailable",
          message: "画图能力未启用"
        };
        return;
      }
      const S = w("image", M);
      o.add(S), r[M] = {
        status: "loading",
        message: "查询图片缓存",
        requestId: S
      };
      const C = {
        chatIdentity: a.chatIdentity,
        sessionId: a.sessionId
      };
      try {
        const _ = h(await a.bridge.request("fourth-wall/image-check", {
          ...C,
          tags: x.value,
          mediaRequestId: S
        }, 3e4));
        if (!T(M, S)) return;
        if (!_.available) {
          r[M] = {
            status: "unavailable",
            message: "画图能力未启用",
            requestId: S
          };
          return;
        }
        let G = _.cached || "";
        if (!G) {
          r[M] = {
            status: "loading",
            message: "正在生成图片",
            requestId: S
          };
          const ee = h(await a.bridge.request("fourth-wall/image-generate", {
            ...C,
            tags: x.value,
            mediaRequestId: S
          }, 18e4));
          if (!T(M, S)) return;
          G = ee.base64;
        }
        r[M] = {
          status: "ready",
          source: /^(?:data:|blob:|https?:)/i.test(G) ? G : `data:image/png;base64,${G}`
        };
      } catch (_) {
        T(M, S) && (r[M] = {
          status: "error",
          message: _ instanceof Error ? _.message : String(_),
          requestId: S
        });
      } finally {
        o.delete(S);
      }
    }
    async function R(x, M) {
      if (!a.voiceAvailable) {
        r[M] = {
          status: "unavailable",
          message: "TTS 能力未启用"
        };
        return;
      }
      const S = r[M];
      if (S?.status === "loading") return;
      if (S?.status === "playing" && S.requestId) {
        a.bridge.post("fourth-wall/voice-stop", {
          chatIdentity: a.chatIdentity,
          mediaRequestId: S.requestId
        }), r[M] = { status: "idle" };
        return;
      }
      const C = w("voice", M);
      o.add(C), r[M] = {
        status: "loading",
        message: "正在准备语音",
        requestId: C
      };
      try {
        await a.bridge.request("fourth-wall/voice-play", {
          chatIdentity: a.chatIdentity,
          sessionId: a.sessionId,
          mediaRequestId: C,
          text: x.value,
          emotion: x.emotion
        });
      } catch (_) {
        T(M, C) && (r[M] = {
          status: "error",
          message: _ instanceof Error ? _.message : String(_),
          requestId: C
        }), o.delete(C);
      }
    }
    function F() {
      i.value = a.message.content, l.value = !0;
    }
    function q() {
      const x = i.value.trim();
      x && (n("edit", a.messageIndex, x), l.value = !1);
    }
    function I() {
      o.forEach((x) => {
        a.bridge.post("fourth-wall/image-cancel", {
          chatIdentity: a.chatIdentity,
          mediaRequestId: x
        }), a.bridge.post("fourth-wall/voice-stop", {
          chatIdentity: a.chatIdentity,
          mediaRequestId: x
        });
      }), o.clear();
    }
    function A() {
      c.value.forEach((x, M) => {
        x.kind === "image" && O(x, M);
      });
    }
    return at(() => {
      d = a.bridge.subscribe((x) => {
        if (x.type === "fourth-wall/image-progress") {
          const M = x.payload, S = Object.keys(r).map(Number).find((C) => r[C]?.requestId === M.mediaRequestId);
          S !== void 0 && (r[S].message = M.status === "queued" ? `图片队列第 ${M.position || 1} 位` : "正在生成图片");
        }
        if (x.type === "fourth-wall/voice-state") {
          const M = x.payload, S = Object.keys(r).map(Number).find((C) => r[C]?.requestId === M.requestId);
          if (S === void 0) return;
          M.state === "playing" && (r[S].status = "playing"), (M.state === "ended" || M.state === "stopped") && (o.delete(String(M.requestId || "")), r[S] = { status: "idle" }), M.state === "error" && (o.delete(String(M.requestId || "")), r[S] = {
            status: "error",
            message: M.message || "语音播放失败"
          });
        }
      }), A();
    }), et(() => a.message.content, () => {
      I(), Object.keys(r).forEach((x) => delete r[Number(x)]), A();
    }), ot(() => {
      d(), I();
    }), (x, M) => (g(), b("article", { class: te(["fourth-wall-message", e.message.role === "user" ? "is-user" : "is-ai"]) }, [(e.message.role === "user" ? e.userAvatar : e.characterAvatar) ? (g(), b("img", {
      key: 0,
      class: "fourth-wall-avatar",
      src: e.message.role === "user" ? e.userAvatar : e.characterAvatar,
      alt: ""
    }, null, 8, qy)) : (g(), b("span", Uy)), s("div", Fy, [
      e.message.thinking ? (g(), b("details", jy, [M[3] || (M[3] = s("summary", null, "思考过程", -1)), s("div", null, m(e.message.thinking), 1)])) : j("", !0),
      s("div", Hy, [l.value ? Ae((g(), b("textarea", {
        key: 0,
        "onUpdate:modelValue": M[0] || (M[0] = (S) => i.value = S),
        class: "fourth-wall-edit",
        rows: "3"
      }, null, 512)), [[Be, i.value]]) : (g(!0), b(Z, { key: 1 }, de(c.value, (S, C) => (g(), b(Z, { key: `${S.kind}-${C}` }, [S.kind === "text" ? (g(), b("span", Ky, m(S.value), 1)) : S.kind === "image" ? (g(), b("figure", Gy, [r[C]?.status === "ready" ? (g(), b("img", {
        key: 0,
        src: r[C].source,
        alt: S.value
      }, null, 8, Vy)) : r[C]?.status === "error" ? (g(), b("button", {
        key: 1,
        type: "button",
        onClick: (_) => O(S, C)
      }, [re(m(S.raw), 1), s("small", null, m(r[C].message) + "，点此重试", 1)], 8, zy)) : r[C]?.status === "unavailable" ? (g(), b("div", Wy, [re(m(S.raw), 1), s("small", null, m(r[C].message), 1)])) : (g(), b("div", Yy, [re(m(S.raw), 1), s("small", null, m(r[C]?.message || "准备图片"), 1)]))])) : (g(), b("button", {
        key: 2,
        class: "fourth-wall-voice",
        type: "button",
        onClick: (_) => R(S, C)
      }, [
        s("span", Jy, m(r[C]?.status === "playing" ? "■" : "▶"), 1),
        s("span", null, m(S.value), 1),
        r[C]?.message ? (g(), b("small", Qy, m(r[C].message), 1)) : j("", !0)
      ], 8, Xy))], 64))), 128)), s("div", Zy, [l.value ? (g(), b(Z, { key: 0 }, [s("button", {
        type: "button",
        onClick: q
      }, "保存"), s("button", {
        type: "button",
        onClick: M[1] || (M[1] = (S) => l.value = !1)
      }, "取消")], 64)) : (g(), b(Z, { key: 1 }, [s("button", {
        type: "button",
        onClick: F
      }, "编辑"), s("button", {
        type: "button",
        onClick: M[2] || (M[2] = (S) => n("delete", e.messageIndex))
      }, "删除")], 64))])]),
      y.value ? (g(), b("time", e1, m(y.value), 1)) : j("", !0)
    ])], 2));
  }
}), a1 = t1, n1 = {
  key: 1,
  class: "fourth-wall-empty"
}, s1 = {
  key: 2,
  class: "fourth-wall-message is-ai is-streaming"
}, l1 = ["src"], i1 = {
  key: 1,
  class: "fourth-wall-avatar is-placeholder"
}, r1 = { class: "fourth-wall-message-stack" }, o1 = {
  key: 0,
  class: "fourth-wall-thinking",
  open: ""
}, u1 = { class: "fourth-wall-bubble" }, d1 = {
  key: 0,
  class: "fourth-wall-unsaved"
}, c1 = /* @__PURE__ */ se({
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
    const t = e, a = /* @__PURE__ */ K(null), n = /* @__PURE__ */ K(40), l = z(() => Math.max(0, t.history.length - n.value)), i = z(() => t.history.slice(l.value));
    function r() {
      n.value = Math.min(t.history.length, n.value + 40);
    }
    return et(() => t.sessionId, () => {
      n.value = 40;
    }), et(() => [t.history.length, t.generation.text], async () => {
      await nn(), a.value && (a.value.scrollTop = a.value.scrollHeight);
    }, { immediate: !0 }), (o, d) => (g(), b("section", {
      ref_key: "viewport",
      ref: a,
      class: "fourth-wall-conversation",
      "aria-live": "polite"
    }, [
      l.value > 0 ? (g(), b("button", {
        key: 0,
        type: "button",
        class: "fourth-wall-earlier",
        onClick: r
      }, " 显示更早的 " + m(l.value) + " 条记录 ", 1)) : j("", !0),
      e.history.length === 0 && e.generation.status === "idle" ? (g(), b("div", n1, [...d[2] || (d[2] = [
        s("span", null, "IV", -1),
        s("strong", null, "越过故事边界", -1),
        s("p", null, "这里是你与角色扮演者的皮下私聊。", -1)
      ])])) : j("", !0),
      (g(!0), b(Z, null, de(i.value, (p, c) => (g(), pe(a1, {
        key: `${p.ts}-${l.value + c}`,
        message: p,
        "message-index": l.value + c,
        "chat-identity": e.chatIdentity,
        "session-id": e.sessionId,
        "user-avatar": e.userAvatar,
        "character-avatar": e.characterAvatar,
        "image-available": e.imageAvailable,
        "voice-available": e.voiceAvailable,
        bridge: e.bridge,
        onEdit: d[0] || (d[0] = (y, w) => o.$emit("edit", y, w)),
        onDelete: d[1] || (d[1] = (y) => o.$emit("delete", y))
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
      e.generation.status !== "idle" ? (g(), b("article", s1, [e.characterAvatar ? (g(), b("img", {
        key: 0,
        class: "fourth-wall-avatar",
        src: e.characterAvatar,
        alt: ""
      }, null, 8, l1)) : (g(), b("span", i1)), s("div", r1, [e.generation.thinking ? (g(), b("details", o1, [d[3] || (d[3] = s("summary", null, "思考中", -1)), s("div", null, m(e.generation.thinking), 1)])) : j("", !0), s("div", u1, [re(m(e.generation.text || (e.generation.status === "error" ? e.generation.message : "等待回应...")) + " ", 1), e.generation.unsaved ? (g(), b("small", d1, "未保存")) : j("", !0)])])])) : j("", !0)
    ], 512));
  }
}), f1 = c1, v1 = {
  class: "fourth-wall-modal",
  role: "dialog",
  "aria-modal": "true",
  "aria-label": "四次元壁提示词"
}, p1 = { class: "fourth-wall-prompt-fields" }, g1 = /* @__PURE__ */ se({
  __name: "FourthWallPromptEditor",
  props: { templates: {} },
  emits: [
    "close",
    "save",
    "restore"
  ],
  setup(e, { emit: t }) {
    const a = e, n = t, l = /* @__PURE__ */ _t(structuredClone(/* @__PURE__ */ ue(a.templates)));
    function i() {
      n("save", structuredClone(/* @__PURE__ */ ue(l)));
    }
    return (r, o) => (g(), b("div", {
      class: "fourth-wall-modal-backdrop",
      onClick: o[6] || (o[6] = tt((d) => n("close"), ["self"]))
    }, [s("section", v1, [
      s("header", null, [o[7] || (o[7] = s("strong", null, "提示词模板", -1)), s("button", {
        type: "button",
        onClick: o[0] || (o[0] = (d) => n("close"))
      }, "关闭")]),
      s("div", p1, [
        s("label", null, [o[8] || (o[8] = re("Top User", -1)), Ae(s("textarea", {
          "onUpdate:modelValue": o[1] || (o[1] = (d) => l.topuser = d),
          rows: "5"
        }, null, 512), [[Be, l.topuser]])]),
        s("label", null, [o[9] || (o[9] = re("Confirm", -1)), Ae(s("textarea", {
          "onUpdate:modelValue": o[2] || (o[2] = (d) => l.confirm = d),
          rows: "3"
        }, null, 512), [[Be, l.confirm]])]),
        s("label", null, [o[10] || (o[10] = re("Meta Protocol", -1)), Ae(s("textarea", {
          "onUpdate:modelValue": o[3] || (o[3] = (d) => l.metaProtocol = d),
          rows: "12"
        }, null, 512), [[Be, l.metaProtocol]])]),
        s("label", null, [o[11] || (o[11] = re("Bottom", -1)), Ae(s("textarea", {
          "onUpdate:modelValue": o[4] || (o[4] = (d) => l.bottom = d),
          rows: "5"
        }, null, 512), [[Be, l.bottom]])])
      ]),
      s("footer", null, [s("button", {
        type: "button",
        class: "is-danger",
        onClick: o[5] || (o[5] = (d) => n("restore"))
      }, "恢复默认"), s("button", {
        type: "button",
        class: "is-primary",
        onClick: i
      }, "保存")])
    ])]));
  }
}), m1 = g1, b1 = { class: "fourth-wall-settings-section" }, h1 = { class: "fourth-wall-session-row" }, y1 = ["value", "disabled"], k1 = ["value"], w1 = ["disabled"], $1 = ["disabled"], x1 = ["disabled"], S1 = /* @__PURE__ */ se({
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
      const d = window.prompt("重命名记录", o)?.trim();
      d && a("rename", r, d);
    }
    function i(r) {
      window.confirm("确定删除当前记录吗？") && a("delete", r);
    }
    return (r, o) => (g(), b("section", b1, [o[3] || (o[3] = s("h3", null, "聊天记录", -1)), s("div", h1, [
      s("select", {
        value: e.activeSessionId,
        disabled: e.disabled,
        onChange: o[0] || (o[0] = (d) => a("switch", d.target.value))
      }, [(g(!0), b(Z, null, de(e.sessions, (d) => (g(), b("option", {
        key: d.id,
        value: d.id
      }, m(d.name), 9, k1))), 128))], 40, y1),
      s("button", {
        type: "button",
        disabled: e.disabled,
        title: "新建记录",
        onClick: n
      }, "＋", 8, w1),
      s("button", {
        type: "button",
        disabled: e.disabled,
        title: "重命名记录",
        onClick: o[1] || (o[1] = (d) => l(e.activeSessionId, e.sessions.find((p) => p.id === e.activeSessionId)?.name || ""))
      }, " 改 ", 8, $1),
      s("button", {
        type: "button",
        disabled: e.disabled || e.sessions.length <= 1,
        title: "删除记录",
        class: "is-danger",
        onClick: o[2] || (o[2] = (d) => i(e.activeSessionId))
      }, " 删 ", 8, x1)
    ])]));
  }
}), C1 = S1, _1 = {
  class: "fourth-wall-settings",
  "aria-label": "四次元壁设置"
}, T1 = { class: "fourth-wall-settings-scroll" }, A1 = { class: "fourth-wall-settings-section" }, M1 = { class: "is-toggle" }, E1 = { class: "is-toggle" }, I1 = ["disabled"], P1 = { class: "fourth-wall-settings-section" }, O1 = { class: "is-toggle" }, R1 = { class: "is-toggle" }, L1 = { class: "is-toggle" }, B1 = { key: 0 }, N1 = ["disabled"], D1 = { class: "fourth-wall-settings-section is-actions" }, q1 = /* @__PURE__ */ se({
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
    const a = e, n = t, l = /* @__PURE__ */ _t(structuredClone(/* @__PURE__ */ ue(a.chat.settings))), i = /* @__PURE__ */ _t(structuredClone(/* @__PURE__ */ ue(a.global)));
    function r() {
      n("updateChat", structuredClone(/* @__PURE__ */ ue(l)));
    }
    function o() {
      n("updateGlobal", {
        image: structuredClone(/* @__PURE__ */ ue(i.image)),
        voice: structuredClone(/* @__PURE__ */ ue(i.voice)),
        commentary: structuredClone(/* @__PURE__ */ ue(i.commentary))
      });
    }
    return (d, p) => (g(), b("aside", _1, [s("header", null, [p[14] || (p[14] = s("strong", null, "四次元壁设置", -1)), s("button", {
      type: "button",
      onClick: p[0] || (p[0] = (c) => n("close"))
    }, "关闭")]), s("div", T1, [
      Se(C1, {
        sessions: e.chat.sessions,
        "active-session-id": e.chat.activeSessionId,
        disabled: e.busy,
        onSwitch: p[1] || (p[1] = (c) => n("switchSession", c)),
        onAdd: p[2] || (p[2] = (c) => n("addSession", c)),
        onRename: p[3] || (p[3] = (c, y) => n("renameSession", c, y)),
        onDelete: p[4] || (p[4] = (c) => n("deleteSession", c))
      }, null, 8, [
        "sessions",
        "active-session-id",
        "disabled"
      ]),
      s("section", A1, [
        p[19] || (p[19] = s("h3", null, "上下文", -1)),
        s("label", null, [p[15] || (p[15] = re("普通聊天层数", -1)), Ae(s("input", {
          "onUpdate:modelValue": p[5] || (p[5] = (c) => l.maxChatLayers = c),
          type: "number",
          min: "1",
          max: "9999"
        }, null, 512), [[
          Be,
          l.maxChatLayers,
          void 0,
          { number: !0 }
        ]])]),
        s("label", null, [p[16] || (p[16] = re("皮下聊天轮数", -1)), Ae(s("input", {
          "onUpdate:modelValue": p[6] || (p[6] = (c) => l.maxMetaTurns = c),
          type: "number",
          min: "1",
          max: "9999"
        }, null, 512), [[
          Be,
          l.maxMetaTurns,
          void 0,
          { number: !0 }
        ]])]),
        s("label", M1, [p[17] || (p[17] = s("span", null, "流式生成", -1)), Ae(s("input", {
          "onUpdate:modelValue": p[7] || (p[7] = (c) => l.stream = c),
          type: "checkbox"
        }, null, 512), [[Pa, l.stream]])]),
        s("label", E1, [p[18] || (p[18] = s("span", null, "禁用 Assistant Prefill", -1)), Ae(s("input", {
          "onUpdate:modelValue": p[8] || (p[8] = (c) => l.disableAssistantPrefill = c),
          type: "checkbox"
        }, null, 512), [[Pa, l.disableAssistantPrefill]])]),
        s("button", {
          type: "button",
          class: "is-primary",
          disabled: e.busy,
          onClick: r
        }, "保存上下文设置", 8, I1)
      ]),
      s("section", P1, [
        p[23] || (p[23] = s("h3", null, "能力", -1)),
        s("label", O1, [p[20] || (p[20] = s("span", null, "在提示词中允许图片", -1)), Ae(s("input", {
          "onUpdate:modelValue": p[9] || (p[9] = (c) => i.image.enablePrompt = c),
          type: "checkbox"
        }, null, 512), [[Pa, i.image.enablePrompt]])]),
        s("label", R1, [p[21] || (p[21] = s("span", null, "在提示词中允许语音", -1)), Ae(s("input", {
          "onUpdate:modelValue": p[10] || (p[10] = (c) => i.voice.enabled = c),
          type: "checkbox"
        }, null, 512), [[Pa, i.voice.enabled]])]),
        s("label", L1, [p[22] || (p[22] = s("span", null, "实时吐槽", -1)), Ae(s("input", {
          "onUpdate:modelValue": p[11] || (p[11] = (c) => i.commentary.enabled = c),
          type: "checkbox"
        }, null, 512), [[Pa, i.commentary.enabled]])]),
        i.commentary.enabled ? (g(), b("label", B1, [re(" 吐槽概率 " + m(i.commentary.probability) + "% ", 1), Ae(s("input", {
          "onUpdate:modelValue": p[12] || (p[12] = (c) => i.commentary.probability = c),
          type: "range",
          min: "1",
          max: "99"
        }, null, 512), [[
          Be,
          i.commentary.probability,
          void 0,
          { number: !0 }
        ]])])) : j("", !0),
        s("button", {
          type: "button",
          class: "is-primary",
          disabled: e.busy,
          onClick: o
        }, "保存能力设置", 8, N1)
      ]),
      s("section", D1, [s("button", {
        type: "button",
        onClick: p[13] || (p[13] = (c) => n("openPrompts"))
      }, "提示词模板")])
    ])]));
  }
}), U1 = q1, F1 = { class: "fourth-wall-app" }, j1 = { class: "fourth-wall-header" }, H1 = { class: "fourth-wall-heading" }, K1 = { class: "fourth-wall-header-actions" }, G1 = ["disabled"], V1 = ["disabled"], z1 = {
  key: 0,
  class: "fourth-wall-error",
  role: "alert"
}, W1 = { class: "fourth-wall-composer" }, Y1 = ["disabled"], X1 = ["disabled"], J1 = 35e3, Q1 = /* @__PURE__ */ se({
  __name: "FourthWallApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const t = e, a = /* @__PURE__ */ K(structuredClone(/* @__PURE__ */ ue(t.initialState))), n = /* @__PURE__ */ K(""), l = /* @__PURE__ */ K(!1), i = /* @__PURE__ */ K(!1), r = /* @__PURE__ */ K(!1), o = /* @__PURE__ */ K(""), d = /* @__PURE__ */ K(!1), p = /* @__PURE__ */ K({
      status: "idle",
      sessionId: "",
      text: "",
      thinking: "",
      message: "",
      unsaved: !1
    });
    let c = () => {
    };
    const y = z(() => a.value.chat.sessions.find((C) => C.id === a.value.chat.activeSessionId)), w = z(() => p.value.status === "started" || p.value.status === "progress");
    function h(C = y.value.id) {
      return {
        chatIdentity: a.value.chatIdentity,
        sessionId: C
      };
    }
    function T(C) {
      return structuredClone(C.result);
    }
    async function O(C, _) {
      r.value = !0, o.value = "";
      try {
        a.value = T(await t.bridge.request(C, _, J1));
      } catch (G) {
        o.value = G instanceof Error ? G.message : String(G);
      } finally {
        r.value = !1;
      }
    }
    async function R() {
      const C = n.value.trim();
      !C || w.value || r.value || (n.value = "", p.value = {
        status: "started",
        sessionId: y.value.id,
        text: "",
        thinking: "",
        message: "",
        unsaved: !1
      }, await O("fourth-wall/send", {
        ...h(),
        content: C
      }), o.value && (p.value.status = "idle"));
    }
    async function F() {
      w.value || r.value || (p.value = {
        status: "started",
        sessionId: y.value.id,
        text: "",
        thinking: "",
        message: "",
        unsaved: !1
      }, await O("fourth-wall/regenerate", h()), o.value && (p.value.status = "idle"));
    }
    function q() {
      t.bridge.post("fourth-wall/cancel", h());
    }
    function I(C) {
      C.key !== "Enter" || C.shiftKey || d.value || (C.preventDefault(), w.value ? q() : R());
    }
    function A(C) {
      window.confirm("确定删除这条消息吗？") && O("fourth-wall/delete-message", {
        ...h(),
        messageIndex: C
      });
    }
    function x() {
      window.confirm("确定清空当前记录吗？") && O("fourth-wall/clear-history", h());
    }
    function M(C) {
      O("fourth-wall/update-chat-settings", {
        ...h(),
        patch: C
      });
    }
    function S(C) {
      O("fourth-wall/update-global-settings", {
        ...h(),
        patch: C
      });
    }
    return at(() => {
      c = t.bridge.subscribe((C) => {
        if (C.type === "fourth-wall/state" && (a.value = structuredClone(C.payload.state)), C.type !== "fourth-wall/generation") return;
        const _ = C.payload;
        if (!(_.sessionId && _.sessionId !== y.value.id)) {
          if (_.status === "complete" || _.status === "cancelled") {
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
          if (_.status === "error") {
            o.value = _.message || "生成失败", p.value = _.kind === "save" && (_.draft?.text || _.draft?.thinking) ? {
              status: "error",
              sessionId: _.sessionId || y.value.id,
              text: _.draft?.text || "",
              thinking: _.draft?.thinking || "",
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
            status: _.status || "progress",
            sessionId: _.sessionId || y.value.id,
            text: _.text || p.value.text,
            thinking: _.thinking || p.value.thinking,
            message: "",
            unsaved: !1
          };
        }
      });
    }), ot(() => c()), (C, _) => (g(), b("main", F1, [
      s("header", j1, [s("div", H1, [_[17] || (_[17] = s("span", null, "IV", -1)), s("div", null, [_[16] || (_[16] = s("strong", null, "四次元壁", -1)), s("small", null, m(y.value.name), 1)])]), s("div", K1, [
        s("button", {
          type: "button",
          title: "重答",
          disabled: r.value || w.value,
          onClick: F
        }, "↻", 8, G1),
        s("button", {
          type: "button",
          title: "清空当前记录",
          "aria-label": "清空当前记录",
          disabled: r.value,
          onClick: x
        }, [..._[18] || (_[18] = [s("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [s("path", { d: "M4 7h16M9 7V4h6v3m3 0-1 13H7L6 7m4 4v5m4-5v5" })], -1)])], 8, V1),
        s("button", {
          type: "button",
          title: "设置",
          onClick: _[0] || (_[0] = (G) => l.value = !0)
        }, "⚙")
      ])]),
      o.value ? (g(), b("div", z1, [s("span", null, m(o.value), 1), s("button", {
        type: "button",
        onClick: _[1] || (_[1] = (G) => o.value = "")
      }, "×")])) : j("", !0),
      Se(f1, {
        history: y.value.history,
        "session-id": y.value.id,
        "chat-identity": a.value.chatIdentity,
        "user-avatar": a.value.userAvatar,
        "character-avatar": a.value.characterAvatar,
        "image-available": a.value.capabilities.image.available,
        "voice-available": a.value.capabilities.voice.available,
        generation: p.value,
        bridge: e.bridge,
        onEdit: _[2] || (_[2] = (G, ee) => O("fourth-wall/edit-message", {
          ...h(),
          messageIndex: G,
          content: ee
        })),
        onDelete: A
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
      s("footer", W1, [Ae(s("textarea", {
        "onUpdate:modelValue": _[3] || (_[3] = (G) => n.value = G),
        rows: "1",
        placeholder: "聊点什么...",
        disabled: r.value,
        onCompositionstart: _[4] || (_[4] = (G) => d.value = !0),
        onCompositionend: _[5] || (_[5] = (G) => d.value = !1),
        onKeydown: I
      }, null, 40, Y1), [[Be, n.value]]), s("button", {
        type: "button",
        class: te({ "is-stop": w.value }),
        disabled: r.value,
        onClick: _[6] || (_[6] = (G) => w.value ? q() : R())
      }, m(w.value ? "■" : "↑"), 11, X1)]),
      l.value ? (g(), pe(U1, {
        key: 1,
        chat: a.value.chat,
        global: a.value.global,
        busy: r.value || w.value,
        onClose: _[7] || (_[7] = (G) => l.value = !1),
        onUpdateChat: M,
        onUpdateGlobal: S,
        onSwitchSession: _[8] || (_[8] = (G) => O("fourth-wall/switch-session", {
          ...h(),
          targetSessionId: G
        })),
        onAddSession: _[9] || (_[9] = (G) => O("fourth-wall/add-session", {
          ...h(),
          name: G
        })),
        onRenameSession: _[10] || (_[10] = (G, ee) => O("fourth-wall/rename-session", {
          ...h(G),
          name: ee
        })),
        onDeleteSession: _[11] || (_[11] = (G) => O("fourth-wall/delete-session", h(G))),
        onOpenPrompts: _[12] || (_[12] = (G) => i.value = !0)
      }, null, 8, [
        "chat",
        "global",
        "busy"
      ])) : j("", !0),
      i.value ? (g(), pe(m1, {
        key: 2,
        templates: a.value.global.promptTemplates,
        onClose: _[13] || (_[13] = (G) => i.value = !1),
        onSave: _[14] || (_[14] = (G) => {
          S({ promptTemplates: G }), i.value = !1;
        }),
        onRestore: _[15] || (_[15] = () => {
          O("fourth-wall/restore-prompts", h()), i.value = !1;
        })
      }, null, 8, ["templates"])) : j("", !0)
    ]));
  }
}), Z1 = Q1, ek = Object.freeze({
  id: "shop",
  name: "奇物商店",
  accent: "#a83b32"
}), tk = ["aria-labelledby"], ak = ["id"], nk = { class: "shop-dialog-item" }, sk = { "aria-hidden": "true" }, lk = [
  "onUpdate:modelValue",
  "maxlength",
  "placeholder"
], ik = {
  key: 0,
  class: "shop-dialog-error",
  role: "alert"
}, rk = { class: "shop-dialog-actions" }, ok = ["disabled"], uk = ["disabled"], dk = /* @__PURE__ */ se({
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
    const a = e, n = t, l = /* @__PURE__ */ _t({}), i = z(() => a.mode === "purchase" ? "确认购入" : a.mode === "deactivate" ? "关闭效果" : "确认使用"), r = z(() => a.mode === "purchase" ? `将支付 ${a.item.price} 小白币，奇物会先放入背包。` : a.mode === "deactivate" ? "关闭后将从下一次回复起停止影响剧情，已经发生的事实不会消失。" : a.item.duration === "permanent" ? "这件奇物将永久影响后续剧情，使用后无法关闭。" : `使用后从下一次回复起${a.item.durationLabel}。`), o = z(() => a.mode !== "use" || a.item.inputs.every((p) => String(l[p.key] || "").trim().length > 0));
    function d() {
      !a.busy && o.value && n("confirm", { ...l });
    }
    return (p, c) => (g(), b("dialog", {
      open: "",
      class: "shop-dialog",
      "aria-labelledby": `shop-dialog-${e.mode}`,
      onClick: c[1] || (c[1] = tt((y) => !e.busy && p.$emit("cancel"), ["self"])),
      onKeydown: c[2] || (c[2] = pr(tt((y) => !e.busy && p.$emit("cancel"), ["stop", "prevent"]), ["esc"]))
    }, [s("form", {
      method: "dialog",
      class: "shop-dialog-card",
      onSubmit: tt(d, ["prevent"])
    }, [
      c[3] || (c[3] = s("span", { class: "shop-dialog-kicker" }, "SEALED DECISION", -1)),
      s("h2", { id: `shop-dialog-${e.mode}` }, m(i.value), 9, ak),
      s("div", nk, [s("span", sk, m(e.item.name.slice(0, 1)), 1), s("div", null, [s("strong", null, m(e.item.name), 1), s("small", null, m(e.item.durationLabel), 1)])]),
      (g(!0), b(Z, null, de(e.mode === "use" ? e.item.inputs : [], (y) => (g(), b("label", {
        key: y.key,
        class: "shop-dialog-field"
      }, [s("span", null, m(y.label), 1), Ae(s("input", {
        "onUpdate:modelValue": (w) => l[y.key] = w,
        type: "text",
        maxlength: y.maxLength,
        placeholder: y.placeholder,
        autocomplete: "off",
        required: ""
      }, null, 8, lk), [[Be, l[y.key]]])]))), 128)),
      s("p", { class: te(["shop-dialog-warning", { "is-permanent": e.mode === "use" && e.item.duration === "permanent" }]) }, m(r.value), 3),
      e.error ? (g(), b("p", ik, m(e.error), 1)) : j("", !0),
      s("div", rk, [s("button", {
        type: "button",
        disabled: e.busy,
        onClick: c[0] || (c[0] = (y) => p.$emit("cancel"))
      }, "再想想", 8, ok), s("button", {
        type: "submit",
        class: "is-primary",
        disabled: e.busy || !o.value
      }, m(e.busy ? "正在封存…" : e.mode === "purchase" ? "确认支付" : e.mode === "deactivate" ? "确认关闭" : "确认使用"), 9, uk)])
    ], 32)], 40, tk));
  }
}), ck = dk, fk = {
  class: "shop-inventory",
  "aria-labelledby": "shop-inventory-title"
}, vk = { class: "shop-section-heading" }, pk = {
  key: 0,
  class: "shop-write-reason",
  role: "status"
}, gk = {
  class: "shop-inventory-group",
  "aria-labelledby": "shop-active-title"
}, mk = {
  key: 0,
  class: "shop-activation-list"
}, bk = {
  class: "shop-mini-mark",
  "aria-hidden": "true"
}, hk = [
  "disabled",
  "title",
  "onClick"
], yk = {
  key: 1,
  class: "shop-empty-copy"
}, kk = {
  class: "shop-inventory-group",
  "aria-labelledby": "shop-held-title"
}, wk = {
  key: 0,
  class: "shop-held-grid"
}, $k = {
  class: "shop-mini-mark",
  "aria-hidden": "true"
}, xk = [
  "disabled",
  "title",
  "onClick"
], Sk = {
  key: 1,
  class: "shop-empty-copy"
}, Ck = {
  key: 1,
  class: "shop-inventory-group is-exhausted"
}, _k = ["aria-expanded"], Tk = {
  key: 0,
  class: "shop-exhausted-list"
}, Ak = { key: 0 }, Mk = /* @__PURE__ */ se({
  __name: "ShopInventory",
  props: {
    catalog: {},
    activations: {},
    writeDisabledReason: {}
  },
  emits: ["use", "deactivate"],
  setup(e) {
    const t = e, a = /* @__PURE__ */ K(!1), n = z(() => t.activations.filter((o) => o.state === "active")), l = z(() => t.catalog.filter((o) => o.quantity > 0)), i = z(() => t.catalog.filter((o) => o.purchasedCount > 0 && o.quantity === 0)), r = z(() => {
      const o = /* @__PURE__ */ new Map();
      for (const d of t.activations) d.state !== "active" && o.set(d.itemId, (o.get(d.itemId) || 0) + 1);
      return o;
    });
    return (o, d) => (g(), b("section", fk, [
      s("header", vk, [d[1] || (d[1] = s("div", null, [s("span", null, "PRIVATE COLLECTION"), s("h2", { id: "shop-inventory-title" }, "我的奇物")], -1)), s("small", null, m(l.value.reduce((p, c) => p + c.quantity, 0)) + " 件可用", 1)]),
      e.writeDisabledReason ? (g(), b("p", pk, m(e.writeDisabledReason), 1)) : j("", !0),
      s("section", gk, [s("header", null, [d[2] || (d[2] = s("h3", { id: "shop-active-title" }, "生效中", -1)), s("span", null, m(n.value.length), 1)]), n.value.length ? (g(), b("div", mk, [(g(!0), b(Z, null, de(n.value, (p) => (g(), b("article", {
        key: p.activationId,
        class: "shop-activation-card"
      }, [
        s("div", bk, m(p.name.slice(0, 1)), 1),
        s("div", null, [
          s("h4", null, m(p.name), 1),
          (g(!0), b(Z, null, de(p.parameters, (c) => (g(), b("p", { key: c.label }, [s("span", null, m(c.label), 1), re(m(c.value), 1)]))), 128)),
          s("small", null, m(p.stateLabel), 1)
        ]),
        p.canDeactivate ? (g(), b("button", {
          key: 0,
          type: "button",
          disabled: !!e.writeDisabledReason,
          title: e.writeDisabledReason,
          onClick: (c) => o.$emit("deactivate", p)
        }, " 关闭 ", 8, hk)) : j("", !0)
      ]))), 128))])) : (g(), b("p", yk, "尚无正在影响剧情的奇物。"))]),
      s("section", kk, [s("header", null, [d[3] || (d[3] = s("h3", { id: "shop-held-title" }, "持有", -1)), s("span", null, m(l.value.length), 1)]), l.value.length ? (g(), b("div", wk, [(g(!0), b(Z, null, de(l.value, (p) => (g(), b("article", {
        key: p.id,
        class: "shop-held-card"
      }, [
        s("div", $k, m(p.name.slice(0, 1)), 1),
        s("div", null, [s("h4", null, m(p.name), 1), s("p", null, m(p.durationLabel), 1)]),
        s("strong", null, "×" + m(p.quantity), 1),
        s("button", {
          type: "button",
          disabled: !!e.writeDisabledReason,
          title: e.writeDisabledReason,
          onClick: (c) => o.$emit("use", p)
        }, " 使用 ", 8, xk)
      ]))), 128))])) : (g(), b("p", Sk, "背包还是空的，去货架挑一件吧。"))]),
      i.value.length ? (g(), b("section", Ck, [s("button", {
        type: "button",
        class: "shop-collapse-button",
        "aria-expanded": a.value,
        onClick: d[0] || (d[0] = (p) => a.value = !a.value)
      }, [
        d[4] || (d[4] = s("span", null, "已耗尽", -1)),
        s("small", null, m(i.value.length), 1),
        d[5] || (d[5] = s("i", { "aria-hidden": "true" }, "⌄", -1))
      ], 8, _k), a.value ? (g(), b("div", Tk, [(g(!0), b(Z, null, de(i.value, (p) => (g(), b("article", { key: p.id }, [s("span", null, m(p.name), 1), s("small", null, [re("购入 " + m(p.purchasedCount) + " 次", 1), r.value.get(p.id) ? (g(), b("span", Ak, " · 已结束 " + m(r.value.get(p.id)), 1)) : j("", !0)])]))), 128))])) : j("", !0)])) : j("", !0)
    ]));
  }
}), Ek = Mk, Ik = {
  class: "shop-shelf",
  "aria-labelledby": "shop-shelf-title"
}, Pk = { class: "shop-section-heading" }, Ok = {
  class: "shop-category-strip",
  "aria-label": "商品分类"
}, Rk = ["onClick"], Lk = { class: "shop-product-grid" }, Bk = {
  class: "shop-product-mark",
  "aria-hidden": "true"
}, Nk = { class: "shop-product-copy" }, Dk = { class: "shop-product-title" }, qk = { class: "shop-product-footer" }, Uk = { key: 0 }, Fk = [
  "disabled",
  "title",
  "onClick"
], jk = {
  key: 0,
  class: "shop-card-reason"
}, Hk = /* @__PURE__ */ se({
  __name: "ShopShelf",
  props: {
    catalog: {},
    balance: {},
    writeDisabledReason: {}
  },
  emits: ["purchase"],
  setup(e) {
    const t = e, a = /* @__PURE__ */ K("all"), n = z(() => {
      const o = /* @__PURE__ */ new Map();
      for (const d of t.catalog) o.set(d.category, d.categoryLabel);
      return [{
        id: "all",
        label: "全部"
      }, ...Array.from(o, ([d, p]) => ({
        id: d,
        label: p
      }))];
    }), l = z(() => a.value === "all" ? t.catalog : t.catalog.filter((o) => o.category === a.value));
    function i(o) {
      return t.writeDisabledReason ? t.writeDisabledReason : r(o);
    }
    function r(o) {
      return o.purchaseLimit !== null && o.purchasedCount >= o.purchaseLimit ? "此奇物已达购买上限" : t.balance < o.price ? `还差 ${o.price - t.balance} 小白币` : "";
    }
    return (o, d) => (g(), b("section", Ik, [
      s("header", Pk, [d[0] || (d[0] = s("div", null, [s("span", null, "CURIO CABINET"), s("h2", { id: "shop-shelf-title" }, "今日陈列")], -1)), s("small", null, m(l.value.length) + " 件奇物", 1)]),
      s("nav", Ok, [(g(!0), b(Z, null, de(n.value, (p) => (g(), b("button", {
        key: p.id,
        type: "button",
        class: te({ "is-active": a.value === p.id }),
        onClick: (c) => a.value = p.id
      }, m(p.label), 11, Rk))), 128))]),
      s("div", Lk, [(g(!0), b(Z, null, de(l.value, (p) => (g(), b("article", {
        key: p.id,
        class: "shop-product-card"
      }, [s("div", Bk, m(p.name.slice(0, 1)), 1), s("div", Nk, [
        s("div", Dk, [s("h3", null, m(p.name), 1), s("span", null, m(p.categoryLabel), 1)]),
        s("p", null, m(p.description), 1),
        s("small", null, m(p.durationLabel), 1),
        s("div", qk, [
          s("strong", null, [d[1] || (d[1] = s("i", null, "¤", -1)), re(m(p.price), 1)]),
          p.quantity ? (g(), b("span", Uk, "持有 " + m(p.quantity), 1)) : j("", !0),
          s("button", {
            type: "button",
            disabled: !!i(p),
            title: i(p),
            onClick: (c) => o.$emit("purchase", p)
          }, m(p.purchaseLimit !== null && p.purchasedCount >= p.purchaseLimit ? "已购得" : "购入"), 9, Fk)
        ]),
        r(p) ? (g(), b("p", jk, m(r(p)), 1)) : j("", !0)
      ])]))), 128))])
    ]));
  }
}), Kk = Hk, Gk = { class: "shop-app" }, Vk = { class: "shop-header" }, zk = {
  class: "shop-balance",
  "aria-label": "小白币余额"
}, Wk = ["disabled"], Yk = {
  class: "shop-root-tabs",
  "aria-label": "商店页面"
}, Xk = { key: 0 }, Jk = ["disabled"], Qk = ["disabled"], Zk = { class: "shop-scroll" }, us = 35e3, e0 = /* @__PURE__ */ se({
  __name: "ShopApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const t = e, a = /* @__PURE__ */ K(structuredClone(/* @__PURE__ */ ue(t.initialState))), n = /* @__PURE__ */ K("shelf"), l = /* @__PURE__ */ K(null), i = /* @__PURE__ */ K(!1), r = /* @__PURE__ */ K(!1), o = /* @__PURE__ */ K(""), d = /* @__PURE__ */ K("");
    let p = () => {
    }, c = 0;
    const y = z(() => a.value.status === "unconfirmed"), w = z(() => r.value ? "正在处理上一项操作" : i.value ? "正在刷新商店状态" : a.value.status !== "ready" ? a.value.message || "商店暂时不可写入" : a.value.generationActive ? "主剧情正在生成，请等待回复完成" : ""), h = z(() => i.value || r.value || y.value);
    function T() {
      return typeof globalThis.crypto?.randomUUID == "function" ? `shop-ui:${globalThis.crypto.randomUUID()}` : `shop-ui:${Date.now()}:${Math.random().toString(36).slice(2, 10)}`;
    }
    function O() {
      return { chatIdentity: a.value.chatIdentity };
    }
    function R(S) {
      a.value = structuredClone(S), i.value = !1, o.value = "";
    }
    function F(S) {
      const C = S instanceof Error ? S.message : String(S);
      return C.includes("cannot be overdrawn") ? "小白币余额不足，未完成购买。" : C.includes("shop_main_generation_active") ? "主剧情正在生成，请等待回复完成。" : C.includes("shop_revision_conflict") || C.includes("shop_event_id_conflict") ? "商店状态已变化，请关闭确认框后重试。" : C === "host_request_timeout" ? "等待保存结果超时，请使用同一确认框重试。" : "商店操作未完成，请稍后重试。";
    }
    async function q() {
      if (h.value) return;
      const S = ++c;
      i.value = !0, o.value = "";
      try {
        const C = await t.bridge.request("shop/refresh", O(), us);
        S === c && R(C.result);
      } catch (C) {
        S === c && (o.value = F(C));
      } finally {
        S === c && (i.value = !1);
      }
    }
    async function I() {
      if (i.value || r.value) return;
      const S = ++c;
      i.value = !0, o.value = "";
      try {
        const C = await t.bridge.request("shop/confirm-save", O(), us);
        S === c && R(C.result.state);
      } catch (C) {
        S === c && (o.value = F(C));
      } finally {
        S === c && (i.value = !1);
      }
    }
    function A(S, C, _) {
      w.value || (d.value = "", l.value = {
        mode: S,
        item: C,
        activation: _,
        actionId: T()
      });
    }
    function x() {
      r.value || (l.value = null, d.value = "");
    }
    async function M(S) {
      const C = l.value;
      if (!C || r.value) return;
      r.value = !0, d.value = "";
      const _ = c, G = C.mode === "purchase" ? "shop/purchase" : C.mode === "use" ? "shop/activate" : "shop/deactivate";
      try {
        const ee = await t.bridge.request(G, {
          ...O(),
          expectedRevision: a.value.revision,
          expectedEventId: a.value.eventId,
          actionId: C.actionId,
          itemId: C.item.id,
          ...C.mode === "use" ? { parameters: S } : {},
          ...C.activation ? { activationId: C.activation.activationId } : {}
        }, us);
        if (_ !== c || l.value !== C) return;
        R(ee.result), l.value = null;
      } catch (ee) {
        _ === c && l.value === C && (d.value = F(ee));
      } finally {
        _ === c && (r.value = !1);
      }
    }
    return at(() => {
      p = t.bridge.subscribe((S) => {
        S.type === "shop/state" && (r.value || (c += 1), R(S.payload.state)), S.type === "shop/error" && (o.value = F(S.payload?.message || ""));
      });
    }), ot(() => {
      c += 1, p(), l.value = null;
    }), (S, C) => (g(), b("main", Gk, [
      s("header", Vk, [
        C[7] || (C[7] = s("div", null, [s("span", { class: "shop-header-kicker" }, "VERMILION CABINET"), s("h1", null, "奇物商店")], -1)),
        s("div", zk, [C[5] || (C[5] = s("small", null, "余额", -1)), s("strong", null, "¤ " + m(a.value.balance), 1)]),
        s("button", {
          type: "button",
          class: "shop-refresh",
          disabled: h.value,
          title: "重新读取商店",
          onClick: q
        }, [...C[6] || (C[6] = [s("svg", {
          viewBox: "0 0 24 24",
          "aria-hidden": "true"
        }, [s("path", { d: "M20 7v5h-5M4 17v-5h5M18.2 9A7 7 0 0 0 6.1 6.7L4 9m16 6-2.1 2.3A7 7 0 0 1 5.8 15" })], -1), s("span", { class: "shop-sr-only" }, "重新读取商店", -1)])], 8, Wk)
      ]),
      s("nav", Yk, [s("button", {
        type: "button",
        class: te({ "is-active": n.value === "shelf" }),
        onClick: C[0] || (C[0] = (_) => n.value = "shelf")
      }, "货架", 2), s("button", {
        type: "button",
        class: te({ "is-active": n.value === "inventory" }),
        onClick: C[1] || (C[1] = (_) => n.value = "inventory")
      }, [C[8] || (C[8] = re(" 背包", -1)), a.value.catalog.some((_) => _.quantity) ? (g(), b("span", Xk, m(a.value.catalog.reduce((_, G) => _ + G.quantity, 0)), 1)) : j("", !0)], 2)]),
      a.value.message || o.value ? (g(), b("aside", {
        key: 0,
        class: te(["shop-notice", `is-${a.value.status}`]),
        role: "status"
      }, [C[9] || (C[9] = s("span", { "aria-hidden": "true" }, "印", -1)), s("div", null, [
        s("strong", null, m(a.value.status === "unconfirmed" ? "保存待核实" : a.value.status === "conflict" ? "状态冲突" : "商店状态"), 1),
        s("p", null, m(o.value || a.value.message), 1),
        y.value ? (g(), b("button", {
          key: 0,
          type: "button",
          disabled: i.value,
          onClick: I
        }, m(i.value ? "正在核实…" : "核实保存结果"), 9, Jk)) : a.value.status === "blocked" ? (g(), b("button", {
          key: 1,
          type: "button",
          disabled: i.value,
          onClick: q
        }, m(i.value ? "正在读取…" : "重新读取"), 9, Qk)) : j("", !0)
      ])], 2)) : j("", !0),
      s("div", Zk, [n.value === "shelf" ? (g(), pe(Kk, {
        key: 0,
        catalog: a.value.catalog,
        balance: a.value.balance,
        "write-disabled-reason": w.value,
        onPurchase: C[2] || (C[2] = (_) => A("purchase", _))
      }, null, 8, [
        "catalog",
        "balance",
        "write-disabled-reason"
      ])) : (g(), pe(Ek, {
        key: 1,
        catalog: a.value.catalog,
        activations: a.value.activations,
        "write-disabled-reason": w.value,
        onUse: C[3] || (C[3] = (_) => A("use", _)),
        onDeactivate: C[4] || (C[4] = (_) => {
          const G = a.value.catalog.find((ee) => ee.id === _.itemId);
          G && A("deactivate", G, _);
        })
      }, null, 8, [
        "catalog",
        "activations",
        "write-disabled-reason"
      ]))]),
      l.value ? (g(), pe(ck, {
        key: 1,
        mode: l.value.mode,
        item: l.value.item,
        activation: l.value.activation,
        busy: r.value,
        error: d.value,
        onCancel: x,
        onConfirm: M
      }, null, 8, [
        "mode",
        "item",
        "activation",
        "busy",
        "error"
      ])) : j("", !0)
    ]));
  }
}), t0 = e0, a0 = Object.freeze({
  id: "wallet",
  name: "钱包",
  accent: "#a9660f"
}), n0 = { class: "wallet-ui-header" }, s0 = { class: "wallet-ui-header-copy" }, l0 = {
  key: 0,
  class: "wallet-ui-kicker"
}, i0 = { class: "wallet-ui-title" }, r0 = /* @__PURE__ */ se({
  __name: "WalletAppHeader",
  props: {
    kicker: {},
    title: {}
  },
  setup(e) {
    return (t, a) => (g(), b("header", n0, [s("div", s0, [e.kicker ? (g(), b("span", l0, m(e.kicker), 1)) : j("", !0), s("h1", i0, m(e.title), 1)])]));
  }
}), o0 = r0, u0 = {
  class: "wallet-balance wallet-ui-rise",
  "aria-labelledby": "wallet-balance-title"
}, d0 = { class: "wallet-balance-chip" }, c0 = ["aria-label"], f0 = /* @__PURE__ */ se({
  __name: "WalletBalanceCard",
  props: {
    balance: {},
    currency: {},
    status: {}
  },
  setup(e) {
    const t = e, a = z(() => Number(t.balance).toLocaleString("zh-CN")), n = z(() => ({
      ready: "账目就绪",
      loading: "正在开户",
      saving: "正在保存",
      unconfirmed: "保存待确认",
      conflict: "账目已冻结",
      blocked: "暂时不可用"
    })[t.status]);
    return (l, i) => (g(), b("section", u0, [
      s("header", null, [i[0] || (i[0] = s("p", { id: "wallet-balance-title" }, "当前结余", -1)), s("span", d0, [s("i", {
        class: te(`is-${e.status}`),
        "aria-hidden": "true"
      }, null, 2), re(m(n.value), 1)])]),
      s("div", {
        class: "wallet-balance-value",
        "aria-label": `${a.value} ${e.currency}`
      }, [i[1] || (i[1] = s("span", { "aria-hidden": "true" }, "¤", -1)), re(m(a.value), 1)], 8, c0),
      s("footer", null, m(e.currency), 1)
    ]));
  }
}), v0 = f0, p0 = {
  class: "wallet-ui-notice-icon",
  "aria-hidden": "true"
}, g0 = { class: "wallet-ui-notice-copy" }, m0 = { key: 0 }, b0 = /* @__PURE__ */ se({
  __name: "WalletNotice",
  props: {
    title: {},
    message: { default: "" },
    tone: { default: "info" }
  },
  setup(e) {
    return (t, a) => (g(), b("aside", {
      class: te(["wallet-ui-notice", `is-${e.tone}`]),
      role: "status"
    }, [s("span", p0, [Cn(t.$slots, "icon", {}, () => [a[0] || (a[0] = re("!", -1))])]), s("div", g0, [
      s("strong", null, m(e.title), 1),
      e.message ? (g(), b("p", m0, m(e.message), 1)) : j("", !0),
      Cn(t.$slots, "default")
    ])], 2));
  }
}), h0 = b0, y0 = { class: "wallet-ui-empty" }, k0 = {
  key: 0,
  class: "wallet-ui-empty-icon",
  "aria-hidden": "true"
}, w0 = { key: 1 }, $0 = /* @__PURE__ */ se({
  __name: "WalletEmpty",
  props: {
    title: {},
    message: { default: "" }
  },
  setup(e) {
    return (t, a) => (g(), b("div", y0, [
      t.$slots.icon ? (g(), b("span", k0, [Cn(t.$slots, "icon")])) : j("", !0),
      s("strong", null, m(e.title), 1),
      e.message ? (g(), b("p", w0, m(e.message), 1)) : j("", !0)
    ]));
  }
}), x0 = $0, S0 = {
  class: "wallet-row-mark",
  "aria-hidden": "true"
}, C0 = { viewBox: "0 0 24 24" }, _0 = ["d"], T0 = { class: "wallet-row-copy" }, A0 = { key: 0 }, M0 = { class: "wallet-row-amount" }, E0 = /* @__PURE__ */ se({
  __name: "WalletTransactionRow",
  props: { transaction: {} },
  setup(e) {
    const t = {
      income: "M12 5v14m0 0-5.5-5.5M12 19l5.5-5.5",
      expense: "M12 19V5m0 0L6.5 10.5M12 5l5.5 5.5",
      transfer: "M4 9h16m0 0-4-4m4 4-4 4M20 15H4m0 0 4 4m-4-4 4-4"
    }, a = e, n = z(() => t[a.transaction.direction] || t.transfer), l = z(() => {
      const r = a.transaction.amount.toLocaleString("zh-CN");
      return a.transaction.direction === "income" ? `+${r}` : a.transaction.direction === "expense" ? `−${r}` : r;
    }), i = z(() => {
      const r = new Date(a.transaction.createdAt), o = new Intl.DateTimeFormat("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: !1
      }).format(r);
      return a.transaction.sequence === 1 && a.transaction.sourceDomain === "economy" ? `开户 · ${o}` : o;
    });
    return (r, o) => (g(), b("li", { class: te(["wallet-row", `is-${e.transaction.direction}`]) }, [
      s("span", S0, [(g(), b("svg", C0, [s("path", { d: n.value }, null, 8, _0)]))]),
      s("div", T0, [
        s("strong", null, m(e.transaction.title), 1),
        e.transaction.note ? (g(), b("p", A0, m(e.transaction.note), 1)) : j("", !0),
        s("small", null, m(e.transaction.source) + " · " + m(i.value), 1)
      ]),
      s("span", M0, m(l.value), 1)
    ], 2));
  }
}), I0 = E0, P0 = {
  key: 1,
  class: "wallet-ui-list"
}, O0 = {
  key: 2,
  class: "wallet-ledger-foot"
}, R0 = {
  key: 0,
  class: "wallet-load-error",
  role: "alert"
}, L0 = ["disabled"], B0 = {
  key: 2,
  class: "wallet-ledger-end"
}, N0 = /* @__PURE__ */ se({
  __name: "WalletTransactionList",
  props: {
    transactions: {},
    hasMore: { type: Boolean },
    loadingMore: { type: Boolean },
    error: {}
  },
  emits: ["loadMore"],
  setup(e) {
    return (t, a) => (g(), b("div", null, [e.transactions.length === 1 && e.transactions[0]?.sequence === 1 && e.transactions[0]?.sourceDomain === "economy" ? (g(), pe(x0, {
      key: 0,
      title: "新账簿已经启用",
      message: "除了开户赠礼，还没有其他收支。"
    }, {
      icon: la(() => [...a[1] || (a[1] = [s("svg", { viewBox: "0 0 24 24" }, [s("path", { d: "m5 12.5 4.5 4.5L19 7.5" })], -1)])]),
      _: 1
    })) : (g(), b("ol", P0, [(g(!0), b(Z, null, de(e.transactions, (n) => (g(), pe(I0, {
      key: n.id,
      transaction: n
    }, null, 8, ["transaction"]))), 128))])), e.hasMore || e.transactions.length > 1 ? (g(), b("div", O0, [e.error ? (g(), b("p", R0, m(e.error), 1)) : j("", !0), e.hasMore ? (g(), b("button", {
      key: 1,
      type: "button",
      class: "wallet-ui-text-button",
      disabled: e.loadingMore,
      onClick: a[0] || (a[0] = (n) => t.$emit("loadMore"))
    }, m(e.loadingMore ? "正在翻阅…" : "翻阅更早账目"), 9, L0)) : (g(), b("span", B0, "账簿至此"))])) : j("", !0)]));
  }
}), D0 = N0, q0 = { class: "wallet-ui-app wallet-app" }, U0 = { class: "wallet-ui-scroll" }, F0 = ["disabled"], j0 = ["disabled"], H0 = {
  class: "wallet-ledger",
  "aria-labelledby": "wallet-ledger-title"
}, K0 = { class: "wallet-ui-section-title" }, G0 = { class: "wallet-ui-card" }, Zl = 35e3, V0 = /* @__PURE__ */ se({
  __name: "WalletApp",
  props: {
    bridge: {},
    initialState: {}
  },
  setup(e) {
    const t = e, a = /* @__PURE__ */ K(structuredClone(/* @__PURE__ */ ue(t.initialState))), n = /* @__PURE__ */ K(!1), l = /* @__PURE__ */ K(!1), i = /* @__PURE__ */ K(""), r = /* @__PURE__ */ K("");
    let o = () => {
    }, d = 0;
    const p = z(() => a.value.status === "unconfirmed"), c = z(() => n.value || a.value.status === "loading" || a.value.status === "saving"), y = z(() => c.value || p.value || a.value.status === "conflict"), w = z(() => !!(a.value.message || i.value)), h = z(() => i.value || a.value.status === "conflict" || a.value.status === "blocked" ? "danger" : p.value ? "warning" : "info"), T = z(() => a.value.status === "conflict" ? "账本发生冲突" : a.value.status === "blocked" ? "钱包暂时无法读取" : "账本状态");
    function O(x) {
      const M = x instanceof Error ? x.message : String(x);
      return M.includes("聊天已切换") ? "聊天已切换，请重新打开钱包。" : M === "host_request_timeout" ? "读取等待超时，请稍后重新读取。" : "钱包数据暂时无法读取，请稍后重试。";
    }
    function R() {
      return { chatIdentity: a.value.chatIdentity };
    }
    function F(x) {
      a.value = structuredClone(x), n.value = !1, l.value = !1, i.value = "", r.value = "";
    }
    async function q() {
      if (c.value || p.value || a.value.status === "conflict") return;
      const x = ++d;
      n.value = !0, i.value = "";
      try {
        const M = await t.bridge.request("wallet/refresh", R(), Zl);
        x === d && F(M.result);
      } catch (M) {
        x === d && (i.value = O(M));
      } finally {
        x === d && (n.value = !1);
      }
    }
    async function I() {
      if (c.value) return;
      const x = ++d;
      n.value = !0, i.value = "";
      try {
        const M = await t.bridge.request("wallet/confirm-save", R(), Zl);
        x === d && F(M.result.state);
      } catch (M) {
        x === d && (i.value = O(M));
      } finally {
        x === d && (n.value = !1);
      }
    }
    async function A() {
      const x = a.value.nextCursor;
      if (!x || l.value) return;
      const M = d;
      l.value = !0, r.value = "";
      try {
        const S = await t.bridge.request("wallet/load-more", {
          ...R(),
          beforeSequence: x
        });
        if (M !== d) return;
        const C = new Set(a.value.transactions.map((_) => _.id));
        a.value.transactions.push(...S.result.transactions.filter((_) => !C.has(_.id))), a.value.nextCursor = S.result.nextCursor, a.value.hasMore = S.result.hasMore;
      } catch {
        M === d && (r.value = "更多流水暂时无法读取，请稍后重试。");
      } finally {
        M === d && (l.value = !1);
      }
    }
    return at(() => {
      o = t.bridge.subscribe((x) => {
        x.type === "wallet/state" && (d += 1, F(x.payload.state)), x.type === "wallet/error" && (i.value = O(x.payload?.message || ""));
      });
    }), ot(() => {
      d += 1, o();
    }), (x, M) => (g(), b("main", q0, [Se(o0, {
      kicker: "Wallet",
      title: "钱包"
    }), s("div", U0, [
      Se(v0, {
        balance: a.value.balance,
        currency: a.value.currency,
        status: a.value.status
      }, null, 8, [
        "balance",
        "currency",
        "status"
      ]),
      w.value ? (g(), pe(h0, {
        key: 0,
        class: "wallet-notice",
        tone: h.value,
        title: T.value,
        message: i.value || a.value.message
      }, {
        default: la(() => [p.value ? (g(), b("button", {
          key: 0,
          type: "button",
          class: "wallet-ui-text-button",
          disabled: n.value,
          onClick: I
        }, m(n.value ? "正在核实…" : "核实保存结果"), 9, F0)) : a.value.status === "blocked" || i.value ? (g(), b("button", {
          key: 1,
          type: "button",
          class: "wallet-ui-text-button",
          disabled: y.value,
          onClick: q
        }, m(n.value ? "正在读取…" : "重新读取"), 9, j0)) : j("", !0)]),
        _: 1
      }, 8, [
        "tone",
        "title",
        "message"
      ])) : j("", !0),
      s("section", H0, [s("div", K0, [M[0] || (M[0] = s("h2", { id: "wallet-ledger-title" }, "流水明细", -1)), s("small", null, m(a.value.transactionCount) + " 笔", 1)]), s("div", G0, [Se(D0, {
        transactions: a.value.transactions,
        "has-more": a.value.hasMore,
        "loading-more": l.value,
        error: r.value,
        onLoadMore: A
      }, null, 8, [
        "transactions",
        "has-more",
        "loading-more",
        "error"
      ])])])
    ])]));
  }
}), z0 = V0, W0 = Object.freeze([
  {
    ...fd,
    iconPaths: ["M14 11h36a4 4 0 0 1 4 4v34a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4V15a4 4 0 0 1 4-4z", "M19 24h26M19 34h18M19 44h11M45 44h.1"],
    component: qc
  },
  {
    ...Dy,
    iconPaths: ["M13 15h38v29H32l-12 9 3-9H13z", "M22 25h20M22 33h14"],
    component: Z1
  },
  {
    ...a0,
    iconPaths: ["M12 19.5h37a5 5 0 0 1 5 5v24a5 5 0 0 1-5 5H15a5 5 0 0 1-5-5v-30a8 8 0 0 1 8-8h27", "M54 30H42a6 6 0 0 0 0 12h12M43 36h.1"],
    component: z0
  },
  {
    ...ek,
    iconPaths: ["M14 19h36l-3 35H17z", "M11 19h42M19 19V11h26v8M23 29h18M22 38h20M21 47h22"],
    component: t0
  },
  {
    ...Uc,
    iconPaths: ["M9 24h46L32 9z", "M14 52h36M18 24v28M28 24v28M38 24v28M48 24v28"],
    component: fv
  },
  {
    ...vv,
    iconPaths: ["M15 12h34a6 6 0 0 1 6 6v28a6 6 0 0 1-6 6H15a6 6 0 0 1-6-6V18a6 6 0 0 1 6-6z", "M21 23h.1M43 23h.1M32 32h.1M21 41h.1M43 41h.1"],
    component: xg
  },
  {
    ...Sg,
    iconPaths: ["M11 16l13-6 16 6 13-6v38l-13 6-16-6-13 6z", "M24 10v38M40 16v38M18 31l6-3 8 3 8-4 7 3"],
    component: Wb
  },
  {
    ...Yb,
    iconPaths: [
      "M17 12h30a5 5 0 0 1 5 5v35H12V17a5 5 0 0 1 5-5z",
      "M21 23h22M21 32h22M21 41h14",
      "M18 9h28v8H18z"
    ],
    component: Ny
  }
]), Y0 = { class: "xiaobai-os-home" }, X0 = ["src"], J0 = {
  class: "xiaobai-os-app-grid",
  "aria-label": "应用"
}, Q0 = ["onClick"], Z0 = {
  class: "xiaobai-os-app-icon",
  "aria-hidden": "true"
}, ew = { viewBox: "0 0 64 64" }, tw = ["d"], aw = { class: "xiaobai-os-app-name" }, nw = /* @__PURE__ */ se({
  __name: "XiaobaiOsHome",
  props: {
    apps: {},
    characterAvatar: {}
  },
  emits: ["openApp"],
  setup(e) {
    return (t, a) => (g(), b("main", Y0, [
      e.characterAvatar ? (g(), b("img", {
        key: 0,
        class: "xiaobai-os-wallpaper",
        src: e.characterAvatar,
        alt: ""
      }, null, 8, X0)) : j("", !0),
      a[0] || (a[0] = s("div", {
        class: "xiaobai-os-home-wash",
        "aria-hidden": "true"
      }, null, -1)),
      s("section", J0, [(g(!0), b(Z, null, de(e.apps, (n) => (g(), b("button", {
        key: n.id,
        type: "button",
        class: "xiaobai-os-app-tile",
        style: Tt({ "--app-accent": n.accent }),
        onClick: (l) => t.$emit("openApp", n)
      }, [s("span", Z0, [(g(), b("svg", ew, [(g(!0), b(Z, null, de(n.iconPaths, (l) => (g(), b("path", {
        key: l,
        d: l
      }, null, 8, tw))), 128))]))]), s("span", aw, m(n.name), 1)], 12, Q0))), 128))])
    ]));
  }
}), sw = nw, lw = ["disabled"], iw = {
  key: 0,
  "aria-hidden": "true"
}, rw = /* @__PURE__ */ se({
  __name: "XiaobaiOsNavigation",
  props: { isHome: { type: Boolean } },
  emits: [
    "back",
    "home",
    "close"
  ],
  setup(e) {
    return (t, a) => (g(), b("nav", {
      class: te(["xiaobai-os-navigation", { "is-home": e.isHome }]),
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
      }, [s("path", { d: "m14.5 6-6 6 6 6" })], -1)])], 8, lw),
      s("button", {
        type: "button",
        class: "xiaobai-os-nav-button xiaobai-os-home-button",
        "aria-label": "主页",
        onClick: a[1] || (a[1] = (n) => t.$emit("home"))
      }, [a[4] || (a[4] = s("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true"
      }, [s("path", { d: "m4.5 11 7.5-6 7.5 6v8h-5v-5h-5v5h-5z" })], -1)), e.isHome ? (g(), b("i", iw)) : j("", !0)]),
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
}), ow = rw, uw = /* @__PURE__ */ se({
  __name: "XiaobaiOsSystemBar",
  props: { isHome: { type: Boolean } },
  setup(e) {
    return (t, a) => (g(), b("header", {
      class: te(["xiaobai-os-system-bar", { "is-home": e.isHome }]),
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
}), dw = uw, cw = { class: "xiaobai-os-device" }, fw = { class: "xiaobai-os-glass" }, vw = /* @__PURE__ */ se({
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
    const t = e, a = z(() => t.activeApp === null);
    return (n, l) => (g(), b("div", cw, [l[4] || (l[4] = s("span", {
      class: "xiaobai-os-side-key",
      "aria-hidden": "true"
    }, null, -1)), s("div", fw, [
      Se(dw, { "is-home": a.value }, null, 8, ["is-home"]),
      s("div", {
        class: "xiaobai-os-stage",
        style: Tt(e.activeApp ? { "--app-accent": e.activeApp.accent } : null)
      }, [Se(cr, {
        name: "xiaobai-os-route",
        mode: "out-in"
      }, {
        default: la(() => [a.value ? (g(), pe(sw, {
          key: "home",
          apps: e.apps,
          "character-avatar": e.characterAvatar,
          onOpenApp: l[0] || (l[0] = (i) => n.$emit("openApp", i))
        }, null, 8, ["apps", "character-avatar"])) : e.activeApp ? (g(), pe(Fo(e.activeApp.component), {
          key: "app",
          bridge: e.bridge,
          "initial-state": e.activeState
        }, null, 8, ["bridge", "initial-state"])) : j("", !0)]),
        _: 1
      })], 4),
      Se(ow, {
        "is-home": a.value,
        onBack: l[1] || (l[1] = (i) => n.$emit("back")),
        onHome: l[2] || (l[2] = (i) => n.$emit("home")),
        onClose: l[3] || (l[3] = (i) => n.$emit("close"))
      }, null, 8, ["is-home"])
    ])]));
  }
}), pw = vw, gw = "LittleWhiteBox-XiaobaiOS";
function mw() {
  return `xiaobai-os-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function bw() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Set();
  let a = !1;
  function n(c, y = {}, w = "") {
    parent.postMessage({
      source: gw,
      type: c,
      requestId: w,
      payload: y
    }, window.location.origin);
  }
  function l(c) {
    const y = String(c.requestId || "");
    if (!y) return !1;
    const w = e.get(y);
    if (!w) return !1;
    e.delete(y), clearTimeout(w.timer);
    const h = c.payload;
    return h?.ok === !1 ? w.reject(new Error(h.error || "host_request_failed")) : w.resolve(h), !0;
  }
  function i(c) {
    c.origin !== window.location.origin || c.source !== parent || c.data?.source !== "LittleWhiteBox-XiaobaiOS" || typeof c.data.type != "string" || l(c.data) || t.forEach((y) => y(c.data));
  }
  function r() {
    a || (a = !0, window.addEventListener("message", i), n("os/frame-ready"));
  }
  function o(c, y = {}, w = 15e3) {
    const h = mw();
    return new Promise((T, O) => {
      const R = setTimeout(() => {
        e.delete(h), O(/* @__PURE__ */ new Error("host_request_timeout"));
      }, w);
      e.set(h, {
        resolve: T,
        reject: O,
        timer: R
      }), n(c, y, h);
    });
  }
  function d(c) {
    return t.add(c), () => t.delete(c);
  }
  function p() {
    a && window.removeEventListener("message", i), a = !1, t.clear(), e.forEach((c) => {
      clearTimeout(c.timer), c.reject(/* @__PURE__ */ new Error("frame_bridge_disposed"));
    }), e.clear();
  }
  return Object.freeze({
    start: r,
    post: n,
    request: o,
    subscribe: d,
    dispose: p
  });
}
var hw = {
  key: 0,
  class: "xiaobai-os-error",
  role: "alert"
}, yw = {
  key: 1,
  class: "xiaobai-os-loading",
  role: "status"
}, kw = /* @__PURE__ */ se({
  __name: "App",
  setup(e) {
    const t = bw(), a = /* @__PURE__ */ K(null), n = /* @__PURE__ */ K(!1), l = /* @__PURE__ */ K("light"), i = /* @__PURE__ */ K(/* @__PURE__ */ new Set()), r = /* @__PURE__ */ K(""), o = /* @__PURE__ */ K(null), d = /* @__PURE__ */ K(null), p = /* @__PURE__ */ K("");
    let c = null, y = () => {
    }, w = 0, h = null;
    const T = z(() => W0.filter((M) => i.value.has(M.id)));
    function O(M) {
      const S = new Set(M.map((G) => String(G.id))), C = o.value && !S.has(o.value.id), _ = h && !S.has(h.appId);
      i.value = S, !(!C && !_) && (w += 1, h = null, o.value = null, d.value = null);
    }
    function R(M) {
      w += 1, h = null, l.value = M.theme === "dark" ? "dark" : "light", O(M.apps || []), r.value = String(M.chat?.characterAvatar || ""), o.value = null, d.value = null, n.value = !0;
    }
    function F(M) {
      if (M.type === "os/init" && R(M.payload || {}), M.type === "os/theme-changed" && (l.value = M.payload?.theme === "dark" ? "dark" : "light"), M.type === "os/apps-changed") {
        const C = M.payload;
        O(C?.apps || []);
      }
      M.type === "os/error" && (p.value = String(M.payload?.message || "小白 OS 初始化失败"));
      const S = M.payload?.state;
      h && M.type === `${h.appId}/state` && (h.latestState = S), o.value && M.type === `${o.value.id}/state` && (d.value = S);
    }
    async function q(M) {
      const S = ++w, C = { appId: M.id };
      h = C, p.value = "";
      try {
        const _ = await t.request("app/activate", { appId: M.id });
        if (S !== w) return;
        if (_.appId !== M.id) throw new Error("app_activation_mismatch");
        d.value = C.latestState ?? _.state ?? null, o.value = M;
      } catch (_) {
        if (S !== w) return;
        o.value = null, p.value = _ instanceof Error ? _.message : String(_);
      } finally {
        h === C && (h = null);
      }
    }
    function I() {
      w += 1, h = null, t.post("app/deactivate", { appId: o.value?.id || "" }), o.value = null, d.value = null;
    }
    function A() {
      w += 1, h = null, t.post("os/close");
    }
    function x(M) {
      if (M.key === "Escape") {
        M.preventDefault(), o.value ? I() : A();
        return;
      }
      if (M.key !== "Tab" || !a.value) return;
      const S = Array.from(a.value.querySelectorAll('button:not(:disabled), [href], input:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'));
      if (S.length === 0) return;
      const C = S[0], _ = S[S.length - 1];
      M.shiftKey && document.activeElement === C ? (M.preventDefault(), _.focus()) : !M.shiftKey && document.activeElement === _ && (M.preventDefault(), C.focus());
    }
    return at(async () => {
      c = document.activeElement instanceof HTMLElement ? document.activeElement : null, y = t.subscribe(F), t.start(), await nn(), a.value?.focus();
    }), ot(() => {
      w += 1, h = null, y(), t.dispose(), c?.focus();
    }), (M, S) => (g(), b("main", {
      ref_key: "root",
      ref: a,
      class: te(["xiaobai-os-shell", `theme-${l.value}`]),
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "小白 OS",
      tabindex: "-1",
      onKeydown: x,
      onClick: tt(A, ["self"])
    }, [p.value ? (g(), b("div", hw, m(p.value), 1)) : j("", !0), n.value ? (g(), pe(pw, {
      key: 2,
      apps: T.value,
      "active-app": o.value,
      "active-state": d.value,
      bridge: me(t),
      "character-avatar": r.value,
      onOpenApp: q,
      onBack: I,
      onHome: I,
      onClose: A
    }, null, 8, [
      "apps",
      "active-app",
      "active-state",
      "bridge",
      "character-avatar"
    ])) : (g(), b("div", yw, "正在启动小白 OS"))], 34));
  }
}), ww = kw;
ud(ww).mount("#app");
